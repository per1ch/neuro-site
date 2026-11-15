# Neurotrauma Trello guide: summary (lists Torso, Extremities, Bones, Any bodypart, Blood)

Source: exported cards of "Neurotrauma and Medical Guide" (parts/B). Percentages are affliction strength unless noted. "Outpaces natural regeneration" means the damage stops healing on its own past that point.

## Torso

### Aortic Rupture
- Lethal torso artery rupture. Needs immediate care; victim loses a lot of blood.
- Caused by: Bleeding at 80%+ on torso; Foreign Bodies at 20%+ on torso.
- Effects: Blood Loss 4%/s; Internal Bleeding 8%/s; Unconsciousness; Fibrillation; Abdominal Pain; Chest Pain.
- Treatment: Open-Close Surgery (Normal). Aortic Rupture Surgery (Hardmode).
- First aid: Stasis Bag.
- Card is labelled Lethal, Visible on Scanner.

### Internal Bleeding
- Drains blood quickly; emergency in most cases.
- Caused by: Open Wounds; Liver Damage at 100%; Aortic Rupture.
- Effects: Blood Loss; Vomiting Blood at 50%+.
- Treatment: Gel Ice Pack; Open-Close Surgery; Combat Stimulant.
- Card is labelled Lethal, Visible on Scanner.

### Radiation Sickness
- Low levels are easy to treat. High levels kill organs; lungs take the most damage. Shows on health scanner at 25%+.
- Sources: Health Scanner (0.5%/s to the scanned person, 0.3%/s to the scanner, 1% when used as a treatment like a bandage); Radiotoxin; nuclear explosions; standing near a Volatile Fulgurium Fuel Rod; swallowing Plutonium.
- Effects (each outpaces natural regen at the listed point): Liver Damage 29%+; Heart Damage 29%+; Kidney Damage 33%+ (29% if one kidney dead); Lung Damage 28%+; Bone Damage 31%+; Nausea 80%+; Seizure 50%+.
- Treatment: Antirad.
- Tip: Antirad is the only listed cure; the card does not say how to recover once past the regen points.

### Kidney Damage
- Usually survivable; slow death even at kidney failure.
- Past 50% it stops healing once one kidney dies.
- Natural heal: 0.01%/s with one kidney alive, 0.02%/s with both alive (config unchanged, nothing damaging them).
- Caused by: Broad-Spectrum Antibiotics; Liquid Oxygenite; Hemotransfusion Shock (0-70%); Mannitol; Radiation Sickness (33%+, 29% if one kidney dead); Hypertension (184%+, 152% if one kidney dead); Sepsis (6%+, 3% if one kidney dead); Hypoxemia (8%+, 4% if one kidney dead); Sufforin Poisoning (75%+); Blunt force trauma; Gunshot wound.
- Effects: Leg Swelling 60%+; Acidosis 80%+; Hypertension; Bone Damage 72%+ (outpaces regen); Vomiting 60%+; Neurotrauma (at 100% it stops natural regen completely); Nausea 60%+.
- Treatment: Time; Thiamine; Organ Transplant Surgery.

### Liver Damage
- Liver failure is fatal and can cause massive internal bleeding.
- Natural heal: 0.01%/s (config unchanged, nothing damaging it, below 100%).
- Caused by: Broad-Spectrum Antibiotics; Liquid Oxygenite; Hemotransfusion Shock (0-70%); Radiation Sickness (29%+); Sepsis (3%+); Hypoxemia (4%+); Drunk (over 40%); Sufforin Poisoning (75%+); Blunt force trauma; Gunshot wound.
- Effects: Leg Swelling 40%+; Internal Bleeding at 100%; Vomiting Blood at 100%; Hypertension; Neurotrauma 80%+ (outpaces regen); Abdominal Discomfort 65%+; Jaundice 80%+; Bloating 50%+. At 100% it stops bleeding from healing.
- Treatment: Time; Thiamine; Organ Transplant Surgery.

### Infected Stomach Cavity
- Often from firefights. Treat fast; risk of Sepsis rises with time.
- Caused by: gunshots that damage liver or kidneys always cause it.
- Effects: Nausea 5%+; Fever 5%+; Abdominal Pain 5%+; Abdominal Discomfort 40%+; Sepsis 70%+.
- First aid: Combat Stimulant.
- Treatment: Broad-Spectrum Antibiotics; Cleaning Cavity (Cleaning Cavity surgery).

### Morbusine Poisoning
- Niche, lethal poison.
- Caused by: Morbusine.
- Effects: screen distortion, slower movement, chromatic aberration; Oxygen Low 10-40%; Respiratory Arrest 40%+; Cardiac Arrest 60%+; Stun at 75-99% when under 75% vitality, at 99-100% when under 90% vitality, or randomly at 100%.
- Treatment: Morbusine Antidote; Toxin Filter.
- First aid: Stabilozine.

### Cyanide Poisoning
- Niche, lethal poison.
- Caused by: Cyanide.
- Effects: screen distortion and blur; skin turns blue; slower movement; reduces Husk Infection 10%+; Hypoxemia 10%+; Stun at 50-75% when under 75% vitality, or 75-100% when under 90% vitality.
- Treatment: Cyanide Antidote; Toxin Filter.
- First aid: Stabilozine.

### Sufforin Poisoning
- Niche, lethal poison.
- Caused by: Sufforin.
- Effects (75%+): Liver Damage; Kidney Damage; Heart Damage; Vanilla Organ Damage; Stun (when under 90% vitality). Reduces Husk Infection 10%+.
- Treatment: Sufforin Antidote; Toxin Filter.
- First aid: Stabilozine.

### Vanilla Organ Damage
- Side effect of some medicines; also from failed medical skill checks on those medicines.
- Not "Damage" type for Neurotrauma; cannot be treated by damage-healing sources.
- Caused by: Alien Blood (+3.75 or 7.5%); Broad-Spectrum Antibiotics (+20 or 12% over the duration); Chloral Hydrate (+2.5%); Liquid Oxygenite (+6 or 10%); Mannitol (+5 or 10%); Methamphetamine (+15 or 30%); Sufforin Poisoning (75%+); Blunt force trauma; Gunshot wound.
- Treatment: Time; Deusizine; Organ Transplant Surgery (heals some with fresh organs); Thiamine.

### Analgesia
- First step of all surgery. Prevents traumatic shock during surgery; relieves pain.
- Surgery without a table still causes traumatic shock.
- Caused by: Opioids; Adrenaline (max 4.5% analgesia); Spinal Cord Injury; Drunk (20%+, max 5%); Anesthesia (max 5%).
- Effects at 20%+: Hypoventilation; 25% damage resistance; 25% stun resistance; removes wobbly aim when arms damaged; stops extremity fractures and dislocations causing internal damage; lowers the Wrench skill check from 60 to 30 medical; allows surgery tools.
- Treatment: Naloxone.

### Anesthesia
- Prevents traumatic shock during surgery, and does not need a surgery table.
- Immediately wears off at 100% strength. Slows you by 50%.
- Caused by: Propofol.
- Effects: Hypoventilation 40%+; Unconsciousness 15%+; Analgesia (max 5%); 50% slower movement. Possible side effects: Hypotension, Confusion, Blurred Vision, Fever, Fibrillation, Seizure, Vomiting Blood, Psychosis.
- Treatment: Anaparalyzant; time.

## Extremities

### Arterial Bleeding
- Emergency. Apply a Tourniquet to buy time. Never on the head.
- Arteries that rupture: carotid (head), brachial (arms), femoral (legs). Torso rupture = Aortic Rupture.
- Caused by: Bleeding 80%+; Traumatic Amputation; Foreign Bodies 20%+; chance when breaking a bone.
- Effect: 1.5%/s Blood Loss (capped at 99.5%).
- Treatment: Open-Close Surgery. First aid: Tourniquet (not carotid).

### Traumatic Amputation
- Non-surgical amputation. Acts like a Surgical Amputation, but you start with Arterial Bleeding on amputation. Limb must be fractured first.
- Caused by: Blunt force trauma; Open Wounds; Material Loss 99%+; Deep Tissue Injury 75%+ (head only).
- Effects: arterial bleeding and intense pain.
- Leg: 1 leg halves speed; 2 legs force prone.
- Arm: 1 arm disables that arm (no two-handed items); 2 arms prevent interaction with doors, ladders, buttons.
- Head: instant death.
- Treatment: Amputation Surgery. Use severed limb before Sutures.

### Surgical Amputation
- Possible on arms, legs, head. Head cannot be reattached.
- No arterial bleeding on first acquire.
- Caused by: Amputation Surgery.
- Leg 2 amputations: ragdolls you and removes speech (other effects as Traumatic).
- Head: instant death.
- Treatment: none (it is the result). Use severed limb before Sutures on reattach.

### Gangrene
- Rare. Only from a neglected Tourniquet or Sepsis.
- Irreversible at 15%. The limb must be amputated.
- Caused by: tourniquet left on too long; Sepsis 5%+.
- Effect: Sepsis at 15%+.
- Treatment: Amputation Surgery; time below 15%.
- Note: card has a comment "Removed Endovascular Balloon information", so the Endovascular Balloon detail is intentionally gone.

### Plaster Cast
- Treats limb fractures. Getting a fracture on a casted limb breaks the cast (config unchanged).
- Applied with Gypsum to a bandaged limb. Removed with Trauma Shears.
- Effects: heals limb fracture 0.33%/s; slows you 20% per cast.

### Clamped Arteries
- Caused by a Tourniquet on an extremity (not head) with Arterial Bleeding.
- Prevents arterial bleeding from causing blood loss, but after a while causes Gangrene.
- Removed by Open-Close Surgery on the affected limb.

## Bones

### Bone Death
- Usually not lethal, but can kill if you lack Osteosynthesis Implants. Expensive to cure.
- Caused by: Bone Damage 90%+.
- Effect: Fractures.
- Treatment: Osteosynthetic Surgery on every body part.
- Shows on scanner as 100% Bone Damage (not "Bone Death").

### Bone Damage
- Not lethal; ignore until it becomes Bone Death.
- Caused by: Kidney Damage 72%+ (outpaces regen); Radiation Sickness 31%+; Sepsis 50%+ (outpaces regen); Hypoxemia (cancels regen at 100%).
- Effect: Bone Death 90%+.
- Treatment: Time; Osteosynthetic Surgery.

### Fractures
- Common, not lethal, treat last in an emergency. Required for a traumatic amputation (except the head).
- Cyberlimbs cannot fracture.
- Caused by: Internal Wounds; Open Wounds; Bone Death; failing the Wrench skill check when treating Dislocations.
- Leg: 1 halves speed; 2 force prone; Intense Pain; Internal Damage unless bandaged, in a Plaster Cast, or sedated.
- Arm: 1 disables that arm; 2 blocks interaction; arm locking only at 100%, or when using a melee or ranged weapon (which adds 70% bleeding); Intense Pain; Internal Damage (same exceptions as leg).
- Skull: stops Neurotrauma from naturally decreasing; Headache.
- Neck: Spinal Cord Injury randomly at 100% (unless bandaged); Internal Damage unless bandaged.
- Ribs: Pneumothorax (unless bandaged); Chest Pain.
- Treatment: Plaster Cast (arm and leg fractures only); Osteosynthetic Surgery (all fractures).
- First aid: Bandages.
- Tip: Adrenaline stops the locking and slowdown, but causes heavy bleeding.

### Dislocations
- Common, not lethal, treat last. Can be both dislocated and fractured. Cyberlimbs cannot dislocate.
- Caused by: trauma (explosions, blunt force, internal damage).
- Leg: 1 halves speed; 2 force crawl; Intense Pain; Internal Damage unless bandaged or sedated.
- Arm: 1 disables arm; 2 blocks interaction; Intense Pain; Internal Damage unless bandaged or sedated.
- Treatment: Wrench, used in the health interface like a bandage. Skill check is 60 medical without Analgesia, 30 with.
- First aid: Bandages or Plastiseal.
- Tip: Adrenaline prevents slowdown and locking.

## Any bodypart

### Burns
- First degree: 1-20% strength; second: 21-50%; third: 51%+. Acid and normal burns combine toward the degree.
- Second degree and higher need medical care to avoid infection.
- Never shown on the health scanner (unlike other traumatic afflictions).
- Effects: direct vitality damage; dirties bandages (speed scales with severity); Infected Wounds (scales with severity).
- Treatment: Bandages or Plastiseal (first and second degree only); Open-Close Surgery (apply Plastiseal before Sutures, any degree); Antibiotic Ointment (first and second only); Antibiotic Glue (any); Combat Stimulant (any).

### Open Wounds
- Two groups of damage: open wounds and Internal Wounds.
- All open wounds cause Infected Wounds in proportion to severity. Usually come with bleeding.
- Treatment is Sutures.

Lacerations (sharp weapons, spalling, misusing Tweezers on foreign bodies/internal wounds):
- Vitality loss; Infected Wounds; arm and leg fractures after 5+ damage; skull fracture >15 damage at 70%+; rib fracture >10; Pneumothorax >5; Cardiac Tamponade >5; Internal Bleeding >5 (0.2-0.5 of damage); Traumatic Amputation >1 with a limb fracture.
- Treatment: Time (unless over 50 strength); Bandaged (unless over 50); Sutures; Pomegrenade Extract; Combat Stimulant.

Deep tissue injury (explosions, e.g. frag grenade):
- Like lacerations, but arm and leg fracture after 1+ damage; neck fracture >15; Foreign Bodies 75% (half of damage); Concussion >15 at 70%; Dislocation >1 at 35%.
- Treatment: same as lacerations.

Gunshot wound (revolver):
- Arm and leg fracture after 1+; skull fracture >15 at 70%; rib fracture >1 (max 30%); Lung Damage >1; Heart Damage >5; Kidney or Liver Damage >2; Vanilla Organ Damage >1 (a fourth of damage); Pneumothorax >1; Cardiac Tamponade >5; Internal Bleeding >5 (0.2-0.6); Traumatic Amputation; Foreign Bodies; Neurotrauma >5 at 70% (0.1-0.4 of damage).
- Only one organ per gunshot.
- Treatment: same as lacerations.

Bite wounds (creatures, husk ovipositor):
- Arm and leg fracture after 5+; head fracture >15 at 70%; rib >10; Pneumothorax >5; Internal Bleeding >5; Traumatic Amputation >5 with limb fracture; Concussion >15 at 70%.
- Treatment: Time (unless over 100); Bandaged (unless over 100); Sutures; Pomegrenade Extract; Combat Stimulant.

### Internal Wounds
- Do not cause Infected Wounds. Do not regenerate past 100 strength.
- Blunt force trauma (falls, crushed by sub, crowbar): dislocation after 2+; arm and leg fracture >2; skull and neck fracture >15 (70% for skull); rib fracture; organ or vanilla organ damage (random 0 to damage taken); Pneumothorax >5; Concussion >15 at 70%; Traumatic Amputation >15 with limb fracture.
- Treatment: Time (unless over 100); Bandaged (unless over 100); Gel Ice Pack (unless over 100); Tweezers before Sutures in Open-Close Surgery; Combat Stimulant; Pomegrenade Extract.
- Internal damage: does NOT show in the health UI. Causes: Dislocations not bandaged; Fractures without a Plaster Cast; failing skill checks using Tweezers, Sutures, Skin Retractors, Surgical Drill, Surgical Saw, Spinal Cord Implants, Osteosynthesis Implants.
- Effects: vitality loss; dislocations; arm and leg fractures after 5+; skull fracture >15 (70%); neck fracture >15; rib fracture >5; organ or vanilla organ damage (random 0 to damage); Pneumothorax >5; Concussion >15 (70%); Traumatic Amputation >10 with limb fracture.
- Treatment: Time; Tweezers before Sutures in Open-Close Surgery; Combat Stimulant; Pomegrenade Extract.

### Infected Wounds
- Caused by open wounds (lacerations, gunshot, bite, deep tissue) festering, and by burns. Dirty bandages speed it up a lot.
- Clean it to avoid Sepsis.
- Effects: Sepsis 50%+; Inflammation 10%+; decreased immunity.
- Treatment: Antibiotic Ointment; Antibiotic Glue.
- First aid: Bandages or Plastiseal.

### Foreign Bodies
- From explosions and gunshots (gunshots that break a bone always cause them). Remove fast.
- Each Tweezers use removes 3-10%.
- Effects: Arterial Bleeding 20%+; Aortic Rupture 20%+ (torso only); Sepsis 20%+; Inflammation 15%+.
- Treatment: Open-Close Surgery (use Tweezers before Sutures); Tweezers on an open gunshot wound or deep tissue injury.
- The card has a scaling graph; not transcribed.

### Bleeding
- Caused by sharp weapons, hostile fauna, and failing some skill checks.
- Effects: Arterial Bleeding 80%+; Aortic Rupture 80%+ (torso); Blood Loss.
- Treatment: Antibiotic Glue; Bandages; Plastiseal; Sutures.

### Ointmented
- Protects wounds from infection; good for burns. Prevents surgical infection if applied to the operated limb.
- Caused by Antibiotic Ointment.
- Effect: -1.5%/s Infected Wounds below 60% strength.

### Chilled
- From Gel Ice Pack. Speeds natural healing of blunt force trauma (unless over 100).
- Effects: slows you 5% per iced limb; makes Infected Wounds worsen faster; -0.2%/s Internal Bleeding.

### Bandaged
- Versatile; carry some always. Bandages get dirty on wounds; bleeding dirties faster.
- Removed with Trauma Shears or Diving Knife.
- Effects: prevents dislocations from causing internal damage or intense pain (dirty bandages too); prevents pneumothorax from rib fractures; prevents neck fracture spinal injury; caps arm fractures below 100%; removes dislocation slowdown and arm locking; slows you 10% per bandage; speeds healing of wounds and burns; protects against infected wounds.

### Burning
- Caused by fire and Incendium Grenade. Gains Burns over time.
- Screams (unless painless) and visibly on fire.
- Treatment: Time; Fire Extinguisher; being in water; wearing a Diving Suit or pressure-resistant items.
- Not visible in game (no icon).

## Blood

### Hypoxemia
- Lethal. Needs immediate care. Pneumothorax slows its drop, proportional to strength.
- Caused by: Cardiac Arrest; Oxygen Low; Blood Loss 40%+; Hypotension 70% or less; Cyanide Poisoning 10%+.
- Effects: Fibrillation; Liver Damage, Heart Damage, Lung Damage (4%+, outpaces regen); Kidney Damage 8%+ (4% if one kidney dead); Hyperventilation 10%+; Neurotrauma 10%+ (outpaces regen); Shortness of Breath 20%+; Headache 40%+; Confusion 50%+; Respiratory Arrest 70%+; Cardiac Arrest 80%+; Unconsciousness 80%+; Bone Damage (cancels bone regen at 100%).
- Treatment: treat the causes; Liquid Oxygenite.
- Card comment: Cyanide Poisoning was cited twice; the duplicate was removed.

### Sepsis
- Lethal. Caused by letting Infected Wounds fester. Only one other affliction gives Fever, so it is easy to spot.
- Caused by: failing Azathioprine skill check; blood packs from a septic donor; Surgical Infection; Gangrene 15%+; Foreign Bodies 20%+; Infected Wounds 50%+; Dialysis Filter (0.1%/s); Toxin Filter (0.1%/s); Infected Stomach Cavity 70%+.
- Effects (outpaces regen where marked): Liver Damage 3%+ (outpaces); Heart Damage 3%+ (outpaces); Lung Damage 3%+ (outpaces); Gangrene 5%+; Fever 5%+; Kidney Damage 6%+ (outpaces; 3% if one dead); Hyperventilation 15%+; Increased Heart Rate 20%+; Neurotrauma 25%+ (outpaces); Confusion 40%+; Bone Damage 50%+ (outpaces).
- Treatment: Broad-Spectrum Antibiotics.

### Hemotransfusion Shock
- Only when giving incompatible blood (e.g. O+ to A+). Lethal.
- Caused by: incompatible blood packs (100% strength); Alien Blood (99% over time).
- Effects: Vomiting 0-40%; Chest Pain 0-60%; Blood Loss, Liver, Heart, Kidney, Lung Damage, Shortness of Breath 0-70%; Abdominal Pain 0-80%; Wheezing 0-90%.
- Treatment: Streptokinase; time.
- Tip: Immunity 6% or lower lets you use incompatible blood without triggering this.

### Blood Loss
- Ignore at 30% or less. Severe loss is resource-intensive.
- Caused by: Internal Bleeding; using an empty blood pack; Bleeding; Arterial Bleeding (max 99.5%); Aortic Rupture; Surgery Incision (unless Clamped Bleeding); Hematology Analyzer; Hemotransfusion Shock 0-70%.
- Effects: Hypotension (scales); Hypoxemia 40%+; Increased Heart Rate 40%+; Pale Skin 40%+; Headache 50%+; Weakness 60%+.
- Treatment: Blood packs; Deusizine; time; Combat Stimulant.

### Hypotension
- Low blood pressure. Lethal if severe. Lower % = lower pressure.
- Caused by: Blood Loss (scales); Traumatic Shock; Anesthesia; Irregular Heartbeat; Nitroglycerin (-45%); Cardiac Arrest (sets to minimum); Cardiac Tamponade (halves).
- Effects: Fibrillation; Confusion 30% or less; Pale Skin 50% or less; Blurred Vision 55% or less; Headache 60% or less; Lightheadedness 60% or less; Hypoxemia 70% or less; Hyperventilation 80% or less.
- Treatment: treat causes; Blood Packs; Saline; Ringer's Solution; Autopulse; Adrenaline; Deusizine; CPR.
- Note: card comment says Sodium Nitroprusside mentions were removed.

### Hypertension
- High blood pressure. May become lethal over 150%.
- Caused by: Kidney Damage; Liver Damage; Blood Packs; Saline; Ringer's Solution; Autopulse; Deusizine; alcohol withdrawal; Adrenaline; CPR.
- Effects: Stroke 150%+; Kidney Damage 184%+ (152% if one dead); Heart Attack 150%+.
- Treatment: treat causes; induce blood loss (Surgery Incision or empty blood pack preferred); Nitroglycerin.
- Note: card comment says Sodium Nitroprusside mentions were removed.

### Acidosis
- Usually ignorable at low to medium. Cancels with Alkalosis.
- Caused by: Hypoventilation; Respiratory Arrest; Cardiac Arrest; Kidney Damage 80%+; blood packs from a donor with acidosis (donor level / 5); Saline.
- Effects: Seizure 60%+; Coma 60%+; Increased Heart Rate 20%+; Fibrillation; Headache 20%+; Confusion 15%+; Weakness 35%+.
- Treatment: treat causes; induce Alkalosis (preferably with Vomiting); transfuse neutral blood packs (unless 0% blood loss); Dialysis Filter.

### Alkalosis
- Usually ignorable at low to medium. Cancels with Acidosis.
- Caused by: Hyperventilation; Vomiting; blood packs from a donor with alkalosis (donor level / 5).
- Effects: Seizure 60%+; Palpitations 20%+.
- Treatment: treat causes; induce Acidosis (preferably with Saline); transfuse neutral blood packs (unless 0% blood loss); Dialysis Filter.

### Immunity
- Fights infected wounds and speeds healing. At 6% or lower, you can use incompatible blood without Hemotransfusion Shock.
- Must be below 10% to transplant organs (only if Organ Rejection is on in the config).
- Reduced by: Azathioprine; fighting Infected Wounds; slowing Infected Stomach Cavity.
- Helps heal Burns and Wounds.

### Organ Rejection
- Off by default. Toggle in the mod config (ESC menu while the mod is enabled).
- Can happen when transplanting while Immunity is above 10%. The organ immediately gets 100% damage.
- Chance at 100% immunity is 60%. The formula is an image, not transcribed.
- Lower immunity mainly with Azathioprine.

### Opioids
- Gives Analgesia at the same rate; same decay rate.
- Caused by: Opium; Morphine; Fentanyl; Analgesic Tank.
- Effect: Hypoventilation.
- Treatment: time.

## Disagreements with mod data

> **Read first:** this cross-check ran against the earlier data extract (the copy in the project's shared `neuro-data/` folder). Commit 14a88b2 on the data branch filled many `treats`/`causes`/`skill` gaps, so several items below are now resolved. See `research/README.md` → *Cross-check status* for the re-checked list. A mismatch here means "worth checking", not "Trello is wrong".


Compared against /mnt/project-files/neuro-data (afflictions.json, code and causes/treatments fields). Only conflicts where both values were seen are listed.

- **aorticrupture** (Aortic Rupture), treatments: Trello lists Open-Close Surgery (Normal) and Aortic Rupture Surgery (Hardmode). Mod treatments = [medstent] only. Open-Close Surgery is not in the mod list.
- **aorticrupture**, effects: Trello lists Fibrillation. Mod code effects = "Blood Loss, Internal Bleeding, Chest Pain, Abdominal Pain, Unconsciousness." Fibrillation is missing from the mod.
- **hypoxemia** (Hypoxemia), causes: Trello lists Cyanide Poisoning 10%+, Hypotension 70% or less, Cardiac Arrest, Oxygen Low, Blood Loss 40%+. Mod causes = bloodloss, oxygenlow, plus text "Oxygen Low, Blood Loss." Cyanide, Hypotension and Cardiac Arrest are missing.
- **hypoxemia**, treatments: Trello lists only Liquid Oxygenite. Mod = [liquidoxygenite, deusizine]. Trello omits Deusizine.
- **sepsis** (Sepsis), causes: Trello lists Infected Stomach Cavity 70%+. Mod causes text = "Blood Pack Items, Gangrene, Foreign Bodies, Infected Wounds, Azathioprine failed skillcheck." Infected Stomach Cavity (infectedcavity) is missing. Trello's Surgical Infection, Dialysis Filter and Toxin Filter are also missing from the mod text.
- **bloodloss** (Blood Loss), treatments: Trello lists Blood Packs, Deusizine, time, Combat Stimulant. Mod = [antibloodloss2] only. Deusizine and Combat Stimulant are missing from the mod.
- **arterialcut** (Arterial Bleeding), treatments: Trello lists Open-Close Surgery (plus Tourniquet as first aid). Mod = [tourniquet] only. Open-Close Surgery is missing from the mod.
- **dislocation** (Dislocation), treatments: Trello lists Wrench (plus Bandages or Plastiseal as first aid). Mod = [wrench, repairpack]. Mod lists Repair Pack, which Trello does not mention; Trello's bandages/plastiseal are absent from the mod treatments.

## Not covered by mod data

Trello facts the mod data could not confirm, mostly because the mod's treatments or guide fields are empty for these afflictions (the mod `guide` field is null for every affliction checked, so thresholds could not be compared).

- Trello lists treatments the mod has no entry for (treatments = []): Radiation Sickness (Antirad); Liver Damage (Time, Thiamine, Organ Transplant Surgery); Kidney Damage (Thiamine, Organ Transplant Surgery); Hemotransfusion Shock (Streptokinase); Gangrene (Amputation Surgery); Infected Stomach Cavity (Broad-Spectrum Antibiotics, Cleaning Cavity); Analgesia (Naloxone); Anesthesia (Anaparalyzant); Acidosis (inducing Alkalosis, transfusion, Dialysis Filter); Internal Bleeding (Gel Ice Pack, Open-Close Surgery, Combat Stimulant).
- Trello threshold numbers: all percentage thresholds (e.g. Kidney 50% heal cutoff, Sepsis 3%/5%/50% triggers, Hypoxemia effect points, Hypertension 150%/184%) are not in the mod `guide` (null) or `code` fields, so they could not be checked.
- Trello rates: Liver/Kidney natural heal (0.01%/s, 0.02%/s), Plaster Cast heal (0.33%/s), Ointmented (-1.5%/s), Chilled (-0.2%/s Internal Bleeding), Arterial Bleeding (1.5%/s), Aortic Rupture (4%/s, 8%/s), Radiation Sickness sources (0.5%/s, 0.3%/s, 1%) are not in the mod data.
- Trello mechanics: Organ Rejection chance formula (image only, not transcribed), Foreign Bodies scaling graph (image only), Anesthesia 50% slowdown, Immunity 6% and 10% thresholds, Burns degree bands (1-20, 21-50, 51+%), Bone Death and Neurotrauma interactions.
- Burns, Bandaged, Ointmented, Chilled and Infected Wounds were only name-matched; their treatment lists were not compared in detail.

## Outdated or flagged cards

- Gangrene: card comment "Removed Endovascular Balloon information."
- Hypotension and Hypertension: card comments "Removed Sodium Nitroprusside mentions." Sodium Nitroprusside is no longer a listed treatment.
- Hypoxemia: card comment "Cited Cyanide Poisoning as a cause twice" (duplicate removed; the single cause remains).
- Organ Rejection: off by default, config-dependent.
- Several cards are older (last updated 2024-10 to 2025-07: Bone Death, Bone Damage, Plaster Cast, Burning, Chilled, Bleeding, Burns-related). Check the mod before relying on the numbers.
