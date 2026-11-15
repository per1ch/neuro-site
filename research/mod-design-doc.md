# Summary E: Neurotrauma Additions & Implementation (developer design doc)

Source: Google Doc "Neurotrauma Additions & Implementation" (https://docs.google.com/document/d/1AJDsnBTOf8GZjzLwk0Dm6FDzZSp3U4sCgUFjvv2a_uo, linked from the Neurotrauma-CS README; plain-text export fetched 2026-11-15) (about 3380 lines). Mostly a developer doc for the Lua-to-C# rework. Player-facing numbers are few; most content is affliction XML listings, the Lua/C# addon guides, and the helper-function list.

## Document structure

- Intro: rework goals, comment colours, Who-Does-What assignments (Lukako, GreenBean, Cookie, Walter, Finka)
- To-Do list for future content (Steam-page and todo.md origins)
- Known Issues/Bugs with the Port
- [OUTDATED] Lua Addon Migration Guide (old-to-new affliction IDs, symptom renames)
- Lua Addon Guide (init.lua, humanupdate.lua, ondamaged.lua, items.lua, stats)
- [OUTDATED] C# Addon Guide (Afflictions.cs, Stats.cs, Items.cs, OnDamaged.cs, HumanUpdate.cs, NTLua.cs)
- Post Beta Plans (roadmap; DONE items marked)
- HU 2.0 and Refactoring Plans (Parts 1-4)
- Helper function list ("NT." / "HF." prefixed, with [Finished in C#] / [DEPRECATED] tags)
- Affliction XML catalogue, by file: AnyBodypart, Blood, BloodTypes, Bones, Brain, Extremities, Functionality, Head, Heart, ItemDerived, Kidneys, Liver, Lungs, Surgical, Symptoms, Torso
- Torso item category lists (medical items, surgery tools, equipment; mostly "todo"/"DONE" notes)

## Mechanics

### Human update and affliction timing
- Lua afflictions all update on a 2-second interval by default.
- Update priorities (Lua recreation): LOW = 6*60 (6 s, mechanical), MEDIUM = 4*60 (4 s, buffs), HIGH = 2*60 (2 s, default).
- Any affliction that changes character speed should be HIGH, or speed flickers.
- Constant afflictions (`const`, default true) always run; `const = false` runs only while applied. Default strength for constants is the 4th constructor parameter (default 0).
- `legacy = true` keeps the update in the file but skips it. `real = false` (requires const = true) skips the XML prefab, so the affliction exists only in Lua. `delay = N` skips the first N human updates.
- Human update steps: Pre Human Updates (hooks), Fetch Afflictions, Update Afflictions, Set Afflictions, Post Human Updates.
- Affliction table fields: min (default 0), max (default 100), default (detection threshold, default 0), ignorestasis (limb afflictions only, default false), update, apply, lateupdate.
- Non-limb afflictions update on the torso only; limb afflictions update on all limbs. Blood afflictions are non-limb under the hood.

### Helper-function thresholds (code-level)
- HasAffliction / HasAfflictionLimb / HasAfflictionExtremity: returns true when strength > MinAmount, and the default MinAmount is 0.5.
- LimbIsDislocated: MinAmount 100 for arms (locks the arm), 1 for other limbs.
- LimbIsArterialCut: MinAmount 1 (does not lock the limb).
- LimbIsTraumaticallyAmputated / LimbIsSurgicallyAmputated: MinAmount 0.1.
- SurgicallyAmputateLimbAndGenerateItem requires Gangrene below 15% (HasAfflictionLimb check).
- BreakLimb with a negative value heals instead. With FracturesRemoveCasts enabled, a break also removes casts on that limb.
- Fibrillate: if the total fibrillation (CardiacArrest + Fibrillation + Increased Heartrate strength) goes above 120, the function applies CardiacArrest; it then sets Tachycardia and Fibrillation to the new values. Does not apply when already in cardiac arrest.
- ApplySymptom: strength 0 when the symptom is off; 100 when HasSymptom is true.
- AddAffliction: values below 0 do not regenerate; AddAfflictionLimb with a negative value calls ReduceAfflictionOnLimb.
- SetAfflictionLimb: strength is scaled by character max vitality and the affliction's resistance on that limb. Resistance of 100% cancels the application.
- Helper functions that edit affliction strength must not be called inside an update function (doc warning: unstable results).

### Skills
- GiveSkillScaled: amount = healed_vitality * 0.001 / max(1, current skill level). Higher skill gains less per action.
- GiveSurgerySkill: if the Surgery skill config is disabled, grants 1/4 of Medical skill instead.
- CanPerformSurgeryOn: needs more than 1 Analgesia, or Unconscious.

### Blood loss and blood pressure
- To-do: rework bloodloss to a 400 scale and rebalance everything to it, so regular and internal bleeding are never as dangerous as arterial bleeding. Status: planned, not done.
- Blood Pressure (bloodpressure): max 200, torso, buff, scanner threshold 0, UI icon hidden. Handled by one vital-mechanic system.
- Hypoxemia: max 100, scanner threshold 5.
- Hemotransfusion Shock: max 100, scanner threshold 10.
- Acidosis / Alkalosis: max 100, scanner hidden (999). Pressure drugs are a resistance-type drug.
- Doc notes Cardiac Arrest causes include Hypoxemia, Traumatic Shock, Coma, Fibrillation, Heart Removed, Heart Damage, Brain Removed, Stasis.

### Organs
- Heart: Heart Damage (scanner 20), Heart Removed (UI 50), Heart Replacement (UI 50), Cardiac Tamponade (scanner 10, from torso wounds; decreases blood pressure, causes weakness/cough/shortness of breath; interacts with Needle), Heart Attack (scanner 0), Cardiac Arrest (max 10 in the doc, scanner 0), Fibrillation (scanner 999), Increased Heartrate (scanner 999, UI 1).
- Lungs: Lung Damage (scanner 20), Pneumothorax (scanner 0, max 100), Respiratory Arrest (max 2), Hyperventilation and Hypoventilation (max 2), Shortness of Breath (max 2), Removed Lungs (UI 50), Swapping Lungs (UI 50).
- Kidneys: Kidney Damage (scanner 10, max 100), Kidneys Removed and Kidney Swap (UI 50).
- Liver: Liver Damage (scanner 20), Liver Removed and Liver Swap (UI 50).
- Brain: Stroke (scanner 0), Neurotrauma (max 200, scanner 10), Seizure (scanner 0, UI 0), Coma (max 100, scanner 10), Brain Removed (scanner 50, UI 50), Brain Swap (UI 50).
- Head: Spinal Cord Injury (formerly t_paralysis), Carotid Artery Bleeding (scanner 0, max 100).
- Luabotomy: max 15, UI 14, scanner 999. Luabotomy Purger: max 2.
- Tshocktimeout (Traumatic Shock Timeout): max 15, scanner 999.

### Bones and fractures
- Bone Damage: scanner 20, max 100.
- Fractured Extremity (listed as "Fractured Limb" in mod data; folds ra/la/rl/ll fractures): max 100, scanner 5, UI icon 90, healable in clinic (130 mks base cost).
- Fractured Ribs, Fractured Neck, Fractured Skull: max 100, scanner 5, UI 90.
- Dislocation (folds dislocation1-4): max 100, scanner 5, UI 30, healable in clinic (80 mks base cost).
- Stimulated Bone Growth: resistance type, max 100, UI 0.

### Limbs
- Arterial Cut / Arterial Bleeding (folds ra/la/rl/ll arterial cuts): max 100, scanner 0, UI 0, clinic-healable (210 mks base cost).
- Aortic Rupture (formerly t_arterialcut): max 100, scanner 0, UI 999.
- Gangrene: max 100, scanner 0, UI 15.
- Traumatic Amputation (tra/tla/trl/tll/th): max 1 each, scanner 0.
- Surgical Amputation (sra/sla/srl/sll/sh): max 1 each.
- Tourniquet (tourniqueted, shown as "Clamped Bleeding"): max 100, scanner 999.
- Plaster Cast: resistance type, max 100, scanner 999. Renamed from gypsumcast.
- First, second, third degree burns: max 100, scanner 999.

### Infection and wounds
- Infected Wound: max 100, scanner 20, clinic-healable (80 mks base cost).
- Foreign Body: max 100, scanner 0.
- Bandaged: resistance type, max 100, buff.
- Bandaged Dirty (formerly dirtybandage): max 100, scanner 999.
- Sepsis: max 100, scanner 999.
- Immunity: max 100, buff.
- Iced: resistance type, max 100. Ointmented: resistance type, max 100.

### Blood types
- Eight blood types (o/a/b/ab, positive/negative), each max 1, bloodtype kind, buff.

### Pain and consciousness
- Pain (type "pain"): max 2, scanner 999.
- Chest Pain (pain_chest), Abdominal Pain: max 10.
- Intense Pain: max 100, scanner 999, limb-specific.
- Shock Pain: max 2. Acute Severe Pain and Lite: max 2.
- Analgesia: resistance type, max 200. Anesthesia: resistance type, max 100, UI 15.
- Unconsciousness: max 2. Give In (paralysis type): max 1.
- Headache (pain type): max 2. Confusion, Blurred Vision, Lightheadedness, Weakness, Wheezing, Vomiting, Vomiting Blood, Sweating, Palpitations, Nausea, Craving, Cough, Pale Skin, Fever, Bloating, Jaundice, Leg Swelling, Abdominal Discomfort: all max 2 symptoms, scanner 999 (Cough is listed as max 2 in the doc).
- Inflammation and Spasm: limb-specific symptoms, max 2.

### Drugs (item-derived afflictions, all resistance type unless noted)
- Adrenaline (afadrenaline): max 100.
- Needle (needlec), Saline (afsaline), Ringer's Solution (afringerssolution), Mannitol (afmannitol), Thiamine (afthiamine), Broad-Spectrum Antibiotics (afantibiotics): max 100.
- Immunosuppressant (afimmunosuppressant), Pressure Drugs (afpressuredrug), Streptokinase (afstreptokinase): max 100. Immunosuppressant and Streptokinase are not buffs.
- Opioid Conditions (afopioid): buff, max 100. Anaesthetic Conditions (afanaesthetic): buff, max 100.
- Alcohol Addiction and Alcohol Withdrawal: poison type, max 100, scanner 999.
- Safe Surgery (safesurgery, formerly "table"): resistance type, max 100.
- Artificial Ventilation (artificialventilation, formerly "alv"): max 100, buff.

### Stasis, bags, stretchers
- Stasis: max 3, ambulance type, buff. Stretchers: max 100, ambulance type, buff.
- Body Bag Overlay, Stasis Bag Overlay: max 2, overlay type.
- Locked Hands: max 100, Slowdown: max 100.

### Misc
- On Fire: limb-specific, max 2, UI 1.
- Screaming: max 2. CPR buff: max 2. AutoCPR buff: max 2. CPR Fracture Immunity: max 2.
- Forced Prone: max 2. Wheelchair Animation (onwheelchair): max 2.
- Stop Creature Abuse: max 2. ModConflict: max 1.
- Respiratory Arrest and Hyperventilation: max 2.

## Items & treatments

The doc lists item categories, with DONE/todo tags. It has few behaviour details.

- Medical treatment items are grouped under "Present in this category" blocks:
  - Blood: Hematology Analyzer (DONE), Bloodpacks (todo), Empty Blood Pack (DONE), Blood Type Cards (DONE; add to Health UI is an open question). Organ transplant items (liver, lung, kidney, heart, brain, limbs, bionic limbs, head amputations) are listed.
  - Drugs/treatments: Antibiotic Ointment (DONE), Azathioprine (DONE), Tourniquet (DONE), Gel Ice Pack (todo), Gypsum (DONE), Ringer's Solution (todo), Mannitol (todo), Thiamine (todo), Streptokinase (DONE), Propofol (DONE).
  - Equipment: Refrigerated Crate/Container, Medical Container, Surgery Toolbox (and kit variants, one marked deprecated), Medical Starter Crate, Body Bag, Stasis Bag, Analgesic Tank, Toxin Filter, Dialyzer, Manual Defibrillator, AED, Ambubag, AutoPulse, Wheelchair, Blue Shark, Surgery Table.
  - Consumables: Health Scanner (DONE), Alien Blood (DONE), Saline, 0- Blood Pack, Bandage, Plastiseal, Opium, Morphine, Fentanyl, Naloxone, Broad-Spectrum Antibiotics, Adrenaline, Liquid Oxygenite, Deusizine, Antibiotic Glue, Meth, Hyperzine, Haloperidol, Anaparalyzant, Tonic Liquid, Nitroglycerin, Repair Pack, Handcuffs, Cigar, Captain's Pipe, Diving Knife.
  - Surgical tools: Sutures, Drainage, Needle, Osteosynthesis Implants, Spinal Cord Implants, Hemostat, Skin Retractors, Surgical Drill, Surgical Saw, Tweezers, Trauma Shears, Scalpel, Multi-Purpose Scalpel, Organ Scalpels.
  - Vascular: Endovascular Balloon, Medical Stent, Antiseptic Sprayer, Antiseptic, Sodium Nitroprusside.
- Item notes in the doc: Autocpr should be removed when defibrillators improve; defibrillator and AED must be aimed at the patient to apply the effect (planned); Hyperzine effect is a status effect on failure (planned check); bodybags and stasis bags are planned for an expensive container slot.
- Items should not have a condition if they are consumable and stack above one; tools are the exception when condition is a cooldown.
- Items should have at least one unique use and should not fully invalidate another without reason.

## Developer-only / implementation notes

- Language split: Items, Characters and Afflictions are defined in XML (unchanged). Behaviour is Lua today, moving to C#. Stats are C# classes (DoubleStats, BoolStats) in the rework.
- Lua addon API: AddHumanUpdateHook becomes AddPostHumanUpdateHook; GetSymptom becomes HasSymptom; GetSymptomFalse becomes HasSymptomFalse; GetSpeedMultiplier becomes GetSpeed. Symptom ids no longer use the sym_ prefix.
- Renames: TraumamputateLimbMinusItem becomes TraumamputateLimb; TraumamputateLimb becomes TraumamputateLimbAndGenerateItem. Old affliction ids map to new ones (listed in the doc, e.g. t_fracture to fracturedribs, h_fracture to fracturedskull, n_fracture to fracturedneck, bonecut to sawedbones, bonegrowth to stimulatedbonegrowth, t_paralysis to spinalcordinjury, cerebralhypoxia to neurotrauma, clampedarteries to tourniqueted, clampedbleeders to clampedbleeding, gypsumcast to plastercast, tachycardia to increasedheartrate, t_arterialcut to aorticrupture, h_arterialcut to carotidarterialcut, alv to artificialventilation, table to safesurgery, chestpain to pain_chest, dirtybandage to bandageddirty, burn_deg1/2/3 to firstdegreeburn/seconddegreeburn/thirddegreeburn, la/ra/ll/rl_fracture to fracturedextremity, la/ra/ll/rl_arterialcut to arterialbleeding).
- Doc also says arterialbleeding is the new id for the four limb arterial cuts. The data file uses arterialcut (see disagreements).
- Deprecated helpers (HF.Lerp, Round, Clamp, Minimum, Maximum, DistanceBetween, StartsWith, SplitString, ApplyEndocrineBoost, RandomRange, Magnitude, Clone, TableContains, TableSize, CombineArrays, Distance, GiveItemAtCondition, MakeAggressive). Most math/string helpers exist in .NET.
- Helper status: most are "[Finished in C#]"; those with "?" may be unstable. ReplaceItemIdentifier is not implemented. DynamicUnavailableItems is not implemented (needs config).
- Addon structure: AddonInit.cs, ConfigData.cs (localised via TextManager and English.xml), Afflictions.cs (AddAfflictions, AddLimbAfflictions, AddBloodAfflictions, AddSymptoms, AddLimbSymptoms), Stats.cs, Items.cs (DefineAllItems, RegisterItemUseFunction), OnDamaged.cs. Build.props and ModConfig.xml name the mod.
- Human update in C#: NTHuman is the data wrapper. Affliction updates are batched; optimisation note is a placeholder ("Blah blah blah") in the doc.
- NTLua: Lua hook system callable from C# (Hook.Add style). Used to sync Lua addons.
- Known bugs (port): backroom bullets (hits can land on a different character or limb); null instance with stats setting affliction strength; brains act weird on removal and replacement; revive command does not revive properly; stutter on human updates; crawling broken; mod not disposed properly (fixed?); stun can get stuck; addons may fail to fetch modded config; sutures flicker twice on consume.
- Planned/not done (Post Beta roadmap): multithreaded human update; bot medic support; autopsy report; preset difficulties; chronic illnesses (maybe); visual symptoms; integrated gene splicers; NT heal command; allow speaking while neck fractured or unconscious (toggle); UpdateInterval config option; clamped bleeding/hemostat cures vanilla bleeding; finish NT XML components; Lua patches to Harmony patches; more polish and optimisation; PseudoC# afflictions; C# afflictions reading modded Lua afflictions; "Register" naming convention for stats and afflictions; re-sprite assets; Lua Addon Patcher 2.0; HF library as separate DLL.
- Done (Post Beta roadmap): Lua addons override C# afflictions; deconstructable blood packs; deconstructable ID card; wheelchair nerf.
- Future content: NT events at stations (diagnosing patients, curing a dying person); NT missions (patient transport, organ delivery, drug refining).
- HU 2.0 refactor (Parts 1-4): builder-based affliction creation, modular builder, one merged affliction type with external extension, separate data and human-data parts, updating-afflictions part (still outline only).
- Per-character team notes (Who-Does-What): Lukako: item and affliction XML prep, Items.lua to C#. GreenBean: helper functions, affliction system, human update in C#, Lua-to-C# affliction system (maybe). Cookie: writing afflictions in C#, stat types, priority. Walter: add-on compatibility guide. Finka: dynamic items to C#.
- Affliction XML template fields: identifier, healableinmedicalclinic, targets, limbspecific, type, isbuff, treatmentthreshold, showinhealthscannerthreshold, showiconthreshold, maxstrength; icon sheet at AfflictionIcons.png.
- Doc notes that the XML "Blood Type" naming is an exception to convention, kept for readability. TODO: integrate a donor-card mod.
- Other TODOs: fold the amputation afflictions (a note says this will change in the Autumn update); move plastercast to an Item-derived type.

## Disagreements with mod data

> **Read first:** this cross-check ran against the earlier data extract (the copy in the project's shared `neuro-data/` folder). Commit 14a88b2 on the data branch filled many `treats`/`causes`/`skill` gaps, so several items below are now resolved. See `research/README.md` → *Cross-check status* for the re-checked list. A mismatch here means "worth checking", not "Trello is wrong".


Compared against /mnt/project-files/neuro-data/afflictions.json (mod commit 722122a). Only listed where both values were read.

- cardiacarrest (Cardiac Arrest): doc says maxStrength 10 (Heart.xml). Mod data says maxStrength 100.
- cough (Cough): doc says maxStrength 2 (Symptoms.xml). Mod data says maxStrength 100.
- fracturedextremity: doc name "Fractured Extremity"; mod name "Fractured Limb". Thresholds match (scanner 5).
- arterialcut: doc uses id arterialcut and name "Arterial Bleeding | Arterial Cut", and the migration list says the four limb arterial cuts map to arterialbleeding. Mod data only has arterialcut, and no arterialbleeding entry was checked. Treat the id as a naming disagreement; scanner 0 and max 100 match.
- intensepain: doc lists this id twice. Under Torso.xml "Internal Bleeding" it has scanner 0 and UI 999. Under Symptoms "Intense Pain" it has scanner 999. Mod data has scanner 999, max 100. This matches the "Intense Pain" entry but not the "Internal Bleeding" entry. Doc has an id collision, so the mod value cannot be checked against both.
- sawedbones: doc name "Sawed Bones"; mod name "Bones Sawed". Numbers match.
- Not a mismatch, mod value is null: kidneydamage (doc scanner 10, max 100), liverdamage (doc scanner 20), lungdamage (doc scanner 20), pneumothorax (doc scanner 0, max 100), traumaticshock (doc scanner 5, UI 5, max 100). Mod data has null maxStrength/scanner for these, so the doc values are unconfirmed.
- Not checked against mod data: the 120 threshold in Fibrillate (CardiacArrest from total fibrillation). The mod affliction code header for Fibrillation says only "Cardiac Arrest" and has no threshold, so it is unconfirmed. Also unchecked: the 0.5 default MinAmount, the 15% gangrene cutoff, the 0.001 skill scaling, and the 400 bloodloss rework (these are code-level and not in the data file).
- Numbers that match: bloodpressure max 200 (scanner 0); hypoxemia scanner 5; hemotransfusionshock scanner 10; sepsis scanner 999; neurotrauma max 200 and scanner 10; coma scanner 10; dislocation scanner 5; aorticrupture scanner 0; carotidarterialcut scanner 0; fibrillation scanner 999; increasedheartrate scanner 999; heartattack scanner 0; tamponade scanner 10; plastercast max 100; tourniqueted scanner 999; stimulatedbonegrowth max 100; pain max 2; analgesia max 200; anesthesia max 100; luabotomy max 15; infectedwound scanner 20; gangrene scanner 0; foreignbody scanner 0; tra_amputation max 1 and scanner 0; alcoholaddiction scanner 999; firstdegreeburn scanner 999; bandageddirty scanner 999; drilledbones scanner 999.
