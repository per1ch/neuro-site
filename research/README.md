# Research: community guide and mod design doc

Fetched 2026-11-15. These are summaries for writing lessons and shaping the site. They are not generated data: `site/data/` stays the source of truth for numbers that come from the mod code.

| File | What it covers |
|---|---|
| [trello-card-index.md](trello-card-index.md) | All 219 open cards: list, title, the board's own labels (lethality, importance, where it's visible in game), image count, last update |
| [trello-info-symptoms-head-lungs-heart.md](trello-info-symptoms-head-lungs-heart.md) | Information (FAQ, labels, 5 Commandments, diagnosis, 16-step treatment order, med kit loadouts, Lua install), Symptoms, Head/Brain, Lungs, Heart |
| [trello-torso-limbs-bones-blood.md](trello-torso-limbs-bones-blood.md) | Torso, Extremities, Bones, Any bodypart, Blood |
| [trello-items.md](trello-items.md) | 74 item cards grouped by use, plus a coverage diff against items.json |
| [trello-surgery-procedures-expansions.md](trello-surgery-procedures-expansions.md) | Surgery steps, the 6 procedures as numbered step lists, the Cybernetics / Surgery Plus / other expansion mods |
| [mod-design-doc.md](mod-design-doc.md) | The developer Google Doc from the Neurotrauma-CS README |
| [tools/trello_dump.py](tools/trello_dump.py) | Turns the board JSON into per-list Markdown: `curl -sL https://trello.com/b/lA0BSokX.json -o b.json && python3 tools/trello_dump.py b.json outdir/` |

## Sources

- **Trello board "Neurotrauma and Medical Guide"** (https://trello.com/b/lA0BSokX), public, read through the board's `.json`. 18 lists and 219 open cards. Card updates run from 2024-10 to 2026-10-24; the median is 2025-12. It carries 234 image attachments that were not downloaded, and some mechanics (organ rejection chance, foreign body scaling) are explained only in those images. The "Mechanics" list is empty. Translated boards exist (Chinese, Russian, Spanish) and are linked from the Information list.
- **Google Doc "Neurotrauma Additions & Implementation"**, linked from the Neurotrauma-CS README. It is a **developer doc** for the Lua to C# port: team roles, to-do lists, addon API guides (two sections marked OUTDATED by its authors), the helper function list and an affliction XML catalogue. It has little player-facing content, so it is useful mainly for system structure and for some numbers.
- The summaries were written by fast model passes over the full text. Spot checks against the mod source are below; the rest has not been checked line by line.

## Key findings for the site

1. **The board already has a curriculum.** The Information list gives a teaching spine:
   - The **5 Commandments**: diagnose with the three Hs; keep blood circulating and air moving; treat causes, not symptoms; no surgery without a table or Propofol; surgery order is sedation, scalpel, hemostat, retractors, optional steps, sutures.
   - **How to Diagnose**: the "three Hs" are the Health interface (surface), the Health scanner (internals) and the Hematology analyzer (blood).
   - A 16-step **Order of Treatments**: stasis bag (6 min), then diagnose, tourniquet arterial bleeds, fix bleeding before transfusing, needle a high pneumothorax, give drugs, restart heart and breathing, fix aortic and internal bleeding, burns, bones, foreign bodies, transplants, sutures, casts, and a final blood check. Liquid Oxygenite (LO2) can buy 30 seconds.
   - **Med kit loadouts**: a first-aid kit, two doctor kits and a surgery kit.
2. **The labels are ready-made UI metadata.** The board tags each card with:
   - lethality: Lethal, Non-Lethal or Lethality Depends;
   - importance: Essential, Very Important, Important or Niche;
   - visibility: Health Interface, Scanner, Hematology Analyzer or Not Visible Ingame, plus Mental Symptom, which is hidden while unconscious;
   - type: Affliction, Item, Procedure, Mechanic, First Aid or Surgery.

   These map directly onto badges and filters. The mod data has no "danger" or "visible on health interface" field, so the labels are the only source for these. `trello-card-index.md` has them per card.
3. **Symptoms are a diagnostic layer.** The board says symptoms do nothing by themselves and only help diagnosis. This suits a symptom-checker interaction: pick symptoms, see the likely conditions.
4. **Procedures are written as ordered steps.** These are Open & Close, Osteosynthesis, Aortic Rupture, Amputation, Organ Transplant and Infected Stomach Cavity, each with tools, preconditions and failure results. They are good candidates for step-by-step simulators. `site/data/surgery.json` (from code) should be the authority for the gates.
5. **Expansions are separate mods.** Cybernetics, Surgery Plus and others have their own lists. With Surgery Plus, surgery skill replaces medical skill for surgery. Keep them out of beginner lessons.
6. **Prerequisite**: Neurotrauma needs Lua for Barotrauma. Singleplayer needs client-side Lua, and multiplayer needs only server-side Lua.

## Cross-check status (Trello / doc vs mod)

The fast passes compared against the older shared-folder extract. I re-checked their item mismatches against `site/data/` at 14a88b2 and spot-checked the mod source (Neurotrauma-CS @ 722122a).

**Resolved by the newer data or confirmed in code, where Trello is right:** bandage, plastiseal and antibiotic glue reduce bleeding and burns (`NTItemsData.cs`: plastiseal bleeding −24 −24 on success, which matches Trello's −48). Also resolved: tweezers cause traumatic shock (code adds 5); streptokinase treats hemotransfusion shock; meth and hyperzine cause neurotrauma and psychosis; azathioprine can cause sepsis; Blåhaj treats psychosis; haloperidol treats alcohol withdrawal; drainage treats pneumothorax and tamponade; trauma shears remove casts; gypsum makes casts; the gel pack chills.

**Real disagreements:**
- **Surgical saw skill**: Trello 45, code 50 (`GetSurgerySkillRequirementMet(…, 50f)`).
- **Morphine and LO2 skill**: Trello 30 and 72, data 50 (XML RequiredSkill). Not traced further in code. Note that skill checks are probabilistic (chance = skill / required), so Trello's numbers may be "safe" thresholds rather than the requirement.
- **The Google Doc is stale on max strengths**: cardiac arrest is 10 in the doc and 100 in `Heart.xml`; cough is 2 in the doc and 100 in `Symptoms.xml`. Prefer code for numbers.
- **Aortic rupture**: Trello treats it with Open-Close Surgery (or Aortic Rupture Surgery on hardmode); the mod data lists the stent only. This is unverified either way.
- Trello describes **dislocations** as wrench plus bandage or plastiseal; the mod also accepts a repair pack.

**Still unconfirmed by the data. These are probably extractor gaps, not wrong guide entries, because the effects likely live in per-tick code:** the AutoPulse effect on low oxygen and fibrillation; thiamine on organ damage; antibiotics' organ side effects; tourniquets causing gangrene; propofol causing hypotension; anaparalyzant on paralysis; the analgesic tank; the dialysis and toxin filters; Ringer's solution and saline on acidosis and alkalosis; the needle on tamponade.

**Scanner thresholds (fixed in the extractor, 3030c5c):** the earlier extract had no scanner threshold for pneumothorax, lung damage, kidney damage or burns. The data now has pneumothorax 0, lung damage 20 and kidney damage 10, which match the doc. Burns have no mod threshold, so the vanilla default applies. Trello's "Visible on Scanner" labels for these now agree with the data. The `guide` field is null for all 206 afflictions, so Trello's thresholds and rates (heal speeds, symptom onset %) are the only source for those until the code analysis fills them in.

**Outdated on the board, according to card comments:** Sodium Nitroprusside was removed from hypo/hypertension and the Endovascular Balloon from gangrene. Organ rejection is off by default. Cards last touched in 2024 to early 2025 (bone death, bone damage, plaster cast, burns) should be checked before their numbers are quoted.
