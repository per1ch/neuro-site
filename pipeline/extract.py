#!/usr/bin/env python3
"""Extract Neurotrauma (C#) game data into JSON for the guide site.

Usage: python3 pipeline/extract.py <path-to-Neurotrauma-CS> [out_dir]

Reads the mod's XML (afflictions, items), the English localization and the
structured comment headers in NTAfflictionsData.cs, then writes
afflictions.json, items.json and meta.json into out_dir (default site/data).
If pipeline/mechanics/*.json exist (code analysis produced separately), they
are merged in as `guide` / `skill` / `surgery` / `systems` data.
"""
import json
import re
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = Path(sys.argv[1]).resolve()
OUT = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else HERE.parent / "site" / "data"
CONTENT = SRC / "Assets" / "Content"

COLOR_TAG = re.compile(r"‖color:[^‖]*‖|‖end‖")


def clean(text):
    if text is None:
        return None
    text = COLOR_TAG.sub("", text).replace("\\n", "\n").strip()
    return re.sub(r"[ \t]+", " ", text) or None


# ---------------------------------------------------------------- localization
def load_localization():
    raw = (CONTENT / "Localization" / "English" / "English.xml").read_text(encoding="utf-8")
    raw = re.sub(r"<!--.*?-->", "", raw, flags=re.S)
    loc = {}
    for m in re.finditer(r"<([a-zA-Z_]+)\.([^>\s]+)>(.*?)</\1\.\2>", raw, re.S):
        loc[(m.group(1).lower(), m.group(2).lower())] = clean(m.group(3))
    return loc


# Names of vanilla Barotrauma entities that Neurotrauma overrides but does not
# rename. Recalled from the base game, not read from this repo.
VANILLA_ITEM_NAMES = {
    "antibleeding1": "Bandage", "antibleeding2": "Plastiseal", "antibleeding3": "Antibiotic Glue",
    "antibloodloss1": "Saline", "antidama1": "Morphine", "antidama2": "Fentanyl",
    "antinarc": "Naloxone", "antibiotics": "Broad-Spectrum Antibiotics", "adrenaline": "Adrenaline",
    "opium": "Opium", "alienblood": "Alien Blood", "liquidoxygenite": "Liquid Oxygenite",
    "deusizine": "Deusizine", "meth": "Methamphetamine", "steroids": "Steroids",
    "hyperzine": "Hyperzine", "antipsychosis": "Haloperidol", "antiparalysis": "Anaparalyzant",
    "tonicliquid": "Tonic Liquid", "nitroglycerin": "Nitroglycerin",
    "pomegrenadeextract": "Pomegrenade Extract", "combatstimulantsyringe": "Combat Stimulant Syringe",
    "ethanol": "Ethanol", "rum": "Rum", "divingknife": "Diving Knife",
    "raptorbaneextract": "Raptor Bane Extract", "proteinbar": "Protein Bar",
    "stabilozine": "Stabilozine", "hallucinogenicbufotoxin": "Hallucinogenic Bufotoxin",
    "cyanide": "Cyanide", "europabrew": "Europabrew", "sufforin": "Sufforin", "antirad": "Anti-Rad",
    "calyxanide": "Calyxanide", "extinguisher": "Fire Extinguisher", "divingsuit": "Diving Suit",
    "repairpack": "Repair Pack", "wrench": "Wrench", "syringegun": "Syringe Gun",
    "advancedsyringegun": "Advanced Syringe Gun", "captainspipe": "Captain's Pipe", "cigar": "Cigar",
    "healthscanner": "Health Scanner",
}
VANILLA_AFFLICTION_NAMES = {
    "bloodloss": "Blood Loss", "bleeding": "Bleeding", "internaldamage": "Internal Damage",
    "blunttrauma": "Blunt Force Trauma", "lacerations": "Lacerations", "gunshotwound": "Gunshot Wound",
    "bitewounds": "Bite Wounds", "explosiondamage": "Explosion Damage", "burn": "Burn",
    "acidburn": "Acid Burn", "oxygenlow": "Oxygen Low", "opiateoverdose": "Opiate Overdose",
    "opiateaddiction": "Opiate Addiction", "opiatewithdrawal": "Opiate Withdrawal",
    "chemaddiction": "Chem Addiction", "chemwithdrawal": "Chem Withdrawal",
    "psychosis": "Psychosis", "radiationsickness": "Radiation Sickness", "drunk": "Drunk",
    "stun": "Stun", "pain": "Pain", "organdamage": "Organ Damage", "paralysis": "Paralysis",
    "huskinfection": "Husk Infection", "nausea": "Nausea", "concussion": "Concussion",
    "alcoholaddiction": "Alcohol Addiction", "alcoholwithdrawal": "Alcohol Withdrawal",
    "severepain": "Severe Pain", "combatstimulant": "Combat Stimulant",
}

# ---------------------------------------------------------------- C# comment headers
def load_code_headers():
    path = SRC / "SharedProject" / "SharedSource" / "NT Components" / "NTAfflictionsData.cs"
    lines = path.read_text(encoding="utf-8").split("\n")
    headers = {}
    for i, line in enumerate(lines):
        m = re.search(r'builder\.New\("([^"]+)"\)', line)
        if not m:
            continue
        j, block = i - 1, []
        while j >= 0:
            s = lines[j].strip()
            if s.startswith("//"):
                block.insert(0, s.lstrip("/").strip())
            elif s and "AfflictionsToAdd.Add(" not in s:
                break
            j -= 1
        # keep only the last header group (some blocks carry neighbours' comments)
        starts = [k for k, b in enumerate(block)
                  if k + 1 < len(block) and re.match(r"(Not constant|Constant|Type:)", block[k + 1], re.I)
                  and not re.match(r"(Not constant|Constant|Type:|Caused|Effects|Harm)", b, re.I)]
        if starts:
            block = block[starts[-1]:]
        h = {"title": None, "type": None, "causedBy": None, "effects": None, "notes": []}
        for b in block:
            if not b or b.startswith("="):
                continue
            low = b.lower()
            if low.startswith("type:"):
                h["type"] = b[5:].strip()
            elif low.startswith("caused by:"):
                h["causedBy"] = b[10:].strip()
            elif low.startswith(("harmless causes:", "harmful causes:")):
                h["causedBy"] = ((h["causedBy"] + "; ") if h["causedBy"] else "") + b
            elif low.startswith("effects:"):
                h["effects"] = b[8:].strip()
            elif h["title"] is None:
                h["title"] = b
            elif not re.match(r"(not constant|constant)", low):
                h["notes"].append(b)
        headers.setdefault(m.group(1), h)
    return headers


# ---------------------------------------------------------------- helpers
def parse_xml(path):
    return ET.parse(path).getroot()


def rect(el, sheet_attr="texture"):
    if el is None:
        return None
    tex, sr = el.get(sheet_attr) or "", el.get("sourcerect")
    if "%ModDir%" not in tex or not sr:
        return None  # vanilla texture: not shipped with the mod
    x, y, w, h = [int(float(v)) for v in sr.split(",")]
    color = el.get("color")
    hexcolor = None
    if color:
        parts = [int(float(c)) for c in color.split(",")[:3]]
        hexcolor = "#" + "".join(f"{c:02x}" for c in parts)
    return {"sheet": Path(tex.replace("%ModDir%/", "")).name, "x": x, "y": y, "w": w, "h": h,
            "color": hexcolor}


def num(v):
    try:
        f = float(v)
        return int(f) if f.is_integer() else f
    except (TypeError, ValueError):
        return None


def attr(el, name):
    """Case-insensitive attribute lookup."""
    for k, v in el.attrib.items():
        if k.lower() == name.lower():
            return v
    return None


LIMB_MAP = {"head": "head", "torso": "torso", "leftarm": "leftarm", "rightarm": "rightarm",
            "leftleg": "leftleg", "rightleg": "rightleg", "lefthand": "leftarm",
            "righthand": "rightarm", "leftfoot": "leftleg", "rightfoot": "rightleg"}

CATEGORY_BY_FILE = {
    "AnyBodypart": "wounds", "Blood": "blood", "BloodTypes": "bloodtypes", "Bones": "bones",
    "Brain": "brain", "Extremities": "limbs", "Functionality": "functionality", "Head": "head",
    "Heart": "heart", "ItemDerived": "drugs", "Kidneys": "kidneys", "Liver": "liver",
    "Lungs": "lungs", "Overrides": "vanilla", "Surgical": "surgical", "Symptoms": "symptom",
    "Torso": "torso",
}
VITALS = {"bloodpressure", "bloodloss", "hypoxemia", "acidosis", "alkalosis", "immunity", "sepsis",
          "oxygenlow"}


def kind_for(aid, category, header):
    t = (header or {}).get("type") or ""
    if aid in VITALS:
        return "vital"
    if category == "symptom" or "Symptom" in t:
        return "symptom"
    if category == "surgical" or "Surgical" in t or "Surgery" in t:
        return "surgical"
    if aid.startswith("af"):
        return "drug-in-blood"
    if category == "bloodtypes":
        return "bloodtype"
    if "Indicator" in t:
        return "indicator"
    if category == "functionality" or "Functionality" in t:
        return "utility"
    return "condition"


# ---------------------------------------------------------------- afflictions
def extract_afflictions(loc, headers):
    out = {}
    for path in sorted((CONTENT / "XML" / "Afflictions").glob("*.xml")):
        category = CATEGORY_BY_FILE.get(path.stem, path.stem.lower())
        root = parse_xml(path)
        for el in root.iter():
            if el.tag not in ("Affliction",) and not el.tag.startswith("Affliction"):
                continue
            aid = (attr(el, "identifier") or "").lower()
            if not aid or el.tag not in ("Affliction", "AfflictionBleeding", "AfflictionHusk",
                                         "AfflictionPsychosis", "AfflictionSpaceHerpes"):
                continue
            if aid in out:
                continue
            name = loc.get(("afflictionname", aid)) or clean(attr(el, "name")) \
                or VANILLA_AFFLICTION_NAMES.get(aid)
            desc = loc.get(("afflictiondescription", aid)) or clean(attr(el, "description"))
            if not desc:
                descs = [clean(d.get("text") or d.text) for d in el.findall("Description")]
                descs = [d for d in descs if d]
                desc = descs[0] if descs else None
            limbspecific = (attr(el, "limbspecific") or "false").lower() == "true"
            ind = (attr(el, "indicatorlimb") or "").lower()
            body = ["any"] if limbspecific else ([LIMB_MAP[ind]] if ind in LIMB_MAP else [])
            hs = num(attr(el, "showinhealthscannerthreshold"))
            hdr = headers.get(aid)
            out[aid] = {
                "id": aid,
                "name": name,
                "description": desc,
                "category": category,
                "kind": kind_for(aid, category, hdr),
                "bodyParts": body,
                "limbSpecific": limbspecific,
                "isBuff": (attr(el, "isbuff") or "false").lower() == "true",
                "maxStrength": num(attr(el, "maxstrength")),
                "showInScannerThreshold": hs,
                "detectedBy": (["healthscanner"] if hs is not None and hs < 999 else []),
                "icon": rect(el.find("icon") if el.find("icon") is not None else el.find("Icon")),
                "causeOfDeath": loc.get(("afflictioncauseofdeath", aid)),
                "code": hdr,
                "symptoms": [], "symptomOf": [], "causes": [], "leadsTo": [], "treatments": [],
                "danger": None, "guide": None, "hidden": name is None,
                "source": f"Assets/Content/XML/Afflictions/{path.name}",
            }
    # afflictions defined only in code
    for aid, hdr in headers.items():
        if aid not in out:
            name = loc.get(("afflictionname", aid)) or VANILLA_AFFLICTION_NAMES.get(aid)
            out[aid] = {
                "id": aid, "name": name, "description": loc.get(("afflictiondescription", aid)),
                "category": "vanilla", "kind": kind_for(aid, "vanilla", hdr), "bodyParts": [],
                "limbSpecific": False, "isBuff": False, "maxStrength": None,
                "showInScannerThreshold": None, "detectedBy": [], "icon": None, "causeOfDeath": None,
                "code": hdr, "symptoms": [], "symptomOf": [], "causes": [], "leadsTo": [],
                "treatments": [], "danger": None, "guide": None, "hidden": name is None,
                "source": "SharedProject/SharedSource/NT Components/NTAfflictionsData.cs",
            }
    for a in out.values():
        if a["id"].startswith(("gate_", "luabotomy", "lock", "triggersym_", "cpr_")) or \
                a["id"].endswith("overlay") or a["kind"] == "utility" and not a["description"]:
            a["hidden"] = True
    return out


# ---------------------------------------------------------------- items
ITEM_CATEGORY_BY_FILE = {
    "Blood": "blood", "BodyParts": "bodyparts", "Consumables": "consumable",
    "OtherEquipment": "equipment", "Override": "vanilla-override", "SurgicalEquipment": "surgical",
    "Toggleable": "equipment", "Unused": "unused", "SFX": "internal", "VFX": "internal",
}


def extract_items(loc):
    out = {}
    for path in sorted((CONTENT / "XML" / "Items").glob("*.xml")):
        category = ITEM_CATEGORY_BY_FILE.get(path.stem, path.stem.lower())
        for el in parse_xml(path).iter("Item"):
            iid = (attr(el, "identifier") or "").lower()
            if not iid or iid in out or el.find("Body") is None and el.find("Sprite") is None \
                    and el.find("InventoryIcon") is None and category != "internal":
                if iid and iid not in out and attr(el, "category") is None:
                    continue
            if not iid or iid in out:
                continue
            name = loc.get(("entityname", iid)) or clean(attr(el, "name")) or VANILLA_ITEM_NAMES.get(iid)
            price = el.find("Price")
            fab = el.find("Fabricate")
            fabricate = None
            if fab is not None:
                fabricate = {
                    "fabricator": fab.get("suitablefabricators"),
                    "time": num(fab.get("requiredtime")),
                    "amount": num(fab.get("amount")) or 1,
                    "skills": [{"skill": s.get("identifier"), "level": num(s.get("level"))}
                               for s in fab.findall("RequiredSkill")],
                    "ingredients": [{"item": (r.get("identifier") or r.get("tag")),
                                     "amount": num(r.get("amount")) or 1}
                                    for r in fab.findall("RequiredItem")],
                }
            suit = [{"affliction": s.get("identifier", "").lower(), "suitability": num(s.get("suitability"))}
                    for s in el.findall("SuitableTreatment")]
            hint = el.find("SkillRequirementHint")
            icon = rect(el.find("InventoryIcon")) or rect(el.find("Sprite"))
            internal = category in ("internal",) or iid.startswith(("ntsfx_", "ntvfx_"))
            out[iid] = {
                "id": iid,
                "name": name,
                "description": loc.get(("entitydescription", iid)) or clean(attr(el, "description")),
                "category": category,
                "gameCategory": attr(el, "category"),
                "tags": [t.strip() for t in (attr(el, "tags") or "").split(",") if t.strip()],
                "icon": icon,
                "price": num(price.get("baseprice")) if price is not None else None,
                "fabricate": fabricate,
                "suitableTreatments": [s for s in suit if s["affliction"]],
                "skillHint": ({"skill": hint.get("identifier"), "level": num(hint.get("level"))}
                              if hint is not None else None),
                "useInHealthInterface": (attr(el, "useinhealthinterface") or "").lower() == "true",
                "treats": [], "causes": [], "treatsDetail": [], "causesDetail": [],
                "usage": None, "skill": None, "onFailure": None, "summary": None,
                "hidden": internal or name is None,
                "source": f"Assets/Content/XML/Items/{path.name}",
            }
    return out


# ---------------------------------------------------------------- linking
def build_name_index(afflictions):
    idx = {}
    for a in afflictions.values():
        if a["name"] and not a["hidden"]:
            idx.setdefault(a["name"].lower(), a["id"])
    aliases = {
        "hypotension": "bloodpressure", "hypertension": "bloodpressure", "blood loss": "bloodloss",
        "infection": "infectedwound", "infections": "infectedwound", "infected wounds": "infectedwound",
        "fractures": "fracturedextremity", "fracture": "fracturedextremity",
        "skull fracture": "fracturedskull", "neck fracture": "fracturedneck",
        "rib fracture": "fracturedribs", "fractured ribs": "fracturedribs",
        "dislocations": "dislocation", "concussion": "concussion", "stroke": "stroke",
        "heart damage": "heartdamage", "liver damage": "liverdamage", "kidney damage": "kidneydamage",
        "lung damage": "lungdamage", "liver-": "liverdamage", "lung-": "lungdamage",
        "opiate overdose": "opiateoverdose", "radiation sickness": "radiationsickness",
        "drug withdrawal": "opiatewithdrawal", "withdrawal": "opiatewithdrawal",
        "alcohol consumption": "drunk", "aortic rupture": "aorticrupture",
        "infected stomach cavity": "infectedcavity", "foreign bodies": "foreignbody",
        "severe internal bleeding": "internalbleeding", "hemotransfusion shock": "hemotransfusionshock",
        "cardiac tamponade": "tamponade", "a heart attack": "heartattack", "heart attack": "heartattack",
        "bleeding": "bleeding", "burns": "burn", "fibrillation": "fibrillation",
        "oxygen low": "oxygenlow", "traumatic shock": "traumaticshock", "analgesia": "analgesia",
        "anesthesia": "anesthesia", "lacerations": "lacerations", "internal damage": "internaldamage",
        "blunt force trauma": "blunttrauma", "gunshot wounds": "gunshotwound",
        "sepsis": "sepsis", "hypoxemia": "hypoxemia", "acidosis": "acidosis", "alkalosis": "alkalosis",
        "pneumothorax": "pneumothorax", "neurotrauma": "neurotrauma", "cardiac arrest": "cardiacarrest",
        "respiratory arrest": "respiratoryarrest", "gangrene": "gangrene", "seizure": "seizure",
        "coma": "coma", "psychosis": "psychosis", "husk infection": "huskinfection",
    }
    for k, v in aliases.items():
        if v in afflictions:
            idx.setdefault(k, v)
    return idx


def find_mentions(text, idx, afflictions):
    if not text:
        return []
    low = text.lower()
    found = []
    for name in sorted(idx, key=len, reverse=True):
        if re.search(r"(?<![a-z])" + re.escape(name) + r"(?![a-z])", low):
            aid = idx[name]
            if aid not in found:
                found.append(aid)
            low = re.sub(r"(?<![a-z])" + re.escape(name) + r"(?![a-z])", " ", low)
    return found


def link(afflictions, items):
    idx = build_name_index(afflictions)
    # symptoms: "Usually caused by X, Y or Z."
    for a in afflictions.values():
        if a["kind"] != "symptom" or not a["description"]:
            continue
        m = re.search(r"(?:usually )?caused by (.+?)(?:\.|$)", a["description"], re.I)
        if m:
            for cause in find_mentions(m.group(1), idx, afflictions):
                if cause != a["id"]:
                    a["symptomOf"].append(cause)
                    if a["id"] not in afflictions[cause]["symptoms"]:
                        afflictions[cause]["symptoms"].append(a["id"])
    # code headers: Caused By / Effects
    for a in afflictions.values():
        h = a["code"] or {}
        for cid in find_mentions(h.get("causedBy"), idx, afflictions):
            if cid != a["id"]:
                a["causes"].append({"type": "affliction", "id": cid, "text": None})
        if h.get("causedBy"):
            a["causes"].append({"type": "text", "id": None, "text": h["causedBy"]})
        for eid in find_mentions(h.get("effects"), idx, afflictions):
            if eid != a["id"] and eid not in a["leadsTo"]:
                a["leadsTo"].append(eid)
                if afflictions[eid]["kind"] == "symptom" and eid not in a["symptoms"]:
                    a["symptoms"].append(eid)
                    afflictions[eid]["symptomOf"].append(a["id"])
    # item treatments: SuitableTreatment (from XML) + description mentions
    for it in items.values():
        if it["hidden"]:
            continue
        for s in it["suitableTreatments"]:
            aid = s["affliction"]
            if aid in afflictions and (s["suitability"] or 0) > 0:
                if aid not in it["treats"]:
                    it["treats"].append(aid)
                    it["treatsDetail"].append({"affliction": aid, "amount": None,
                                               "notes": f"AI suitability {s['suitability']}",
                                               "source": "SuitableTreatment"})
    for it in items.values():
        for aid in it["treats"]:
            afflictions[aid]["treatments"].append({"item": it["id"], "note": None})
    for a in afflictions.values():
        a["symptomOf"] = sorted(set(a["symptomOf"]))


# ---------------------------------------------------------------- mechanics merge
def merge_mechanics(afflictions, items):
    mech = HERE / "mechanics"
    extra = {}
    am = mech / "afflictions_mechanics.json"
    if am.exists():
        data = json.loads(am.read_text())
        for g in data.get("afflictions", []):
            a = afflictions.get(g.get("id"))
            if not a:
                continue
            a["danger"] = g.get("danger")
            a["guide"] = {k: g.get(k) for k in ("howYouGetIt", "whatItDoes", "treatment",
                                                  "naturalRecovery", "progression", "thresholds")}
            a["guide"]["source"] = g.get("source")
            for cid in g.get("causedBy") or []:
                if cid in afflictions and cid != a["id"] and \
                        not any(c.get("id") == cid for c in a["causes"]):
                    a["causes"].append({"type": "affliction", "id": cid, "text": None})
                elif cid.startswith("item:"):
                    a["causes"].append({"type": "item", "id": cid[5:], "text": None})
                elif cid.startswith("damage:"):
                    a["causes"].append({"type": "event", "id": cid, "text": cid[7:]})
            for lid in g.get("leadsTo") or []:
                if lid in afflictions and lid not in a["leadsTo"] and lid != a["id"]:
                    a["leadsTo"].append(lid)
        extra["systems"] = data.get("systems", [])
    im = mech / "items_mechanics.json"
    if im.exists():
        data = json.loads(im.read_text())
        for g in data.get("items", []):
            it = items.get(g.get("id"))
            if not it:
                continue
            for k in ("usage", "skill", "onFailure", "summary"):
                if g.get(k):
                    it[k] = g[k]
            for t in g.get("treats") or []:
                aid = t.get("affliction")
                if aid in afflictions:
                    it["treatsDetail"] = [d for d in it["treatsDetail"] if d["affliction"] != aid]
                    it["treatsDetail"].append({**t, "source": g.get("source")})
                    if aid not in it["treats"]:
                        it["treats"].append(aid)
                        afflictions[aid]["treatments"].append({"item": it["id"], "note": t.get("notes")})
            for c in g.get("causes") or []:
                aid = c.get("affliction")
                if aid in afflictions:
                    it["causesDetail"].append({**c, "source": g.get("source")})
                    if aid not in it["causes"]:
                        it["causes"].append(aid)
            it["mechanicsSource"] = g.get("source")
        extra["surgery"] = data.get("surgeryProcedures", [])
        extra["itemNotes"] = data.get("notes")
    return extra


# ---------------------------------------------------------------- main
def main():
    loc = load_localization()
    headers = load_code_headers()
    afflictions = extract_afflictions(loc, headers)
    items = extract_items(loc)
    link(afflictions, items)
    extra = merge_mechanics(afflictions, items)

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "images").mkdir(exist_ok=True)
    sheets = {a["icon"]["sheet"] for a in afflictions.values() if a["icon"]} | \
             {i["icon"]["sheet"] for i in items.values() if i["icon"]}
    for sheet in sorted(sheets):
        for cand in (CONTENT / "Images").rglob(sheet):
            shutil.copy2(cand, OUT / "images" / sheet)
            break

    def dump(name, obj):
        (OUT / name).write_text(json.dumps(obj, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    dump("afflictions.json", sorted(afflictions.values(), key=lambda a: a["id"]))
    dump("items.json", sorted(items.values(), key=lambda i: i["id"]))
    if extra.get("surgery") is not None:
        dump("surgery.json", extra["surgery"])
    if extra.get("systems") is not None:
        dump("systems.json", extra["systems"])
    try:
        commit = subprocess.run(["git", "-C", str(SRC), "rev-parse", "HEAD"], capture_output=True,
                                text=True, check=True).stdout.strip()
    except Exception:
        commit = None
    dump("meta.json", {
        "modRepo": "https://github.com/LukakoE00/Neurotrauma-CS",
        "modCommit": commit,
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "counts": {"afflictions": len(afflictions),
                   "afflictionsVisible": sum(not a["hidden"] for a in afflictions.values()),
                   "items": len(items), "itemsVisible": sum(not i["hidden"] for i in items.values()),
                   "surgery": len(extra.get("surgery") or []),
                   "systems": len(extra.get("systems") or [])},
        "schemaVersion": 1,
    })
    print(json.dumps(json.loads((OUT / "meta.json").read_text())["counts"]))


if __name__ == "__main__":
    main()
