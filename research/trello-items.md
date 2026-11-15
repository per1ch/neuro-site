# Items: summary (Trello "Items" list, 74 cards)

Source: exported cards of the public "Neurotrauma and Medical Guide" Trello board. Percent values are as written on the cards: "-X% affliction" means strength reduced by X percentage points, "+X% affliction" means added. Skill checks are the Medical skill needed for a successful application. A failed application uses the "failure" numbers.

## Diagnostics and monitoring

### Health Scanner
- Shows all afflictions visible to the scanner once charged with batteries.
- Costs the scanned patient 0.5% radiation sickness per second and the scanner 0.3% per second.
- Can be used on yourself or others from the health interface like a bandage, adding 1% radiation sickness; scanning individual limbs reveals foreign bodies.
- Tip: scan limbs individually to find foreign bodies before tweezers or surgery.

### Hematology Analyzer
- Skill check 30. Success gives -1% blood loss; failure gives +3% blood loss. Either way it shows the patient's blood afflictions (sepsis, acidosis, alkalosis).
- Shows blood type to avoid hemotransfusion shock. Put a donor card in and use it to print the blood type onto the card; the card then works from the ID slot.
- Put a blood pack in to see its type and any afflictions it carries.
- Tip: check blood type before any transfusion.

### Blue Shark
- Niche novelty item, no skill check.
- On application (health UI only): treats 2% psychosis and squeaks.

## Bandaging and wounds

### Bandages
- Skill check 10. Covers wounds to prevent infected wounds; also stabilises dislocations (prevents internal damage) and fractures (prevents internal damage for rib fractures, neurotrauma for skull fractures).
- Success: +50% bandaged, -24% bleeding. Failure: +36% bandaged, -18% bleeding.
- Card note: the page only links to the Bandaged affliction and has no further detail.

### Plastiseal
- Skill check 22. An improved bandage.
- Success: +100% bandaged, -48% bleeding, -24% burns. Failure: +50% bandaged, -24% bleeding, -12% burns.
- Replaces dirty bandages on the limb. Can be used after retracted skin to treat third-degree burns.

### Antibiotic Glue
- Skill check 55. Seals bleeding wounds and treats burns and infected wounds on one limb.
- Success: -60% bleeding, -15% burns, -100% infected wounds.
- Failure: -40% bleeding, -10% burns, -100% infected wounds, and a 50% chance of heart attack if the patient is bleeding.
- Tip: the heart-attack risk on failure makes it a last resort on bleeding patients.

### Antibiotic Ointment
- Skill check 10. Treats infected wounds and prevents them for some time. Craftable at a medical fabricator or buyable from a medical merchant.
- Success: -72% infected wounds, +120% Ointmented (protection), -12% burns.
- Failure: -24% infected wounds, +60% Ointmented, -7.2% burns.

### Antiseptic
- Niche. Only usable if enabled in config under "Item Availability".
- Its only use is loading the Antiseptic Sprayer; each spray uses 10% condition.

### Antiseptic Sprayer
- Skill check not stated.
- Antiseptic mode: sprays antiseptic on infected wounds, treating 100% infected wounds, giving +20% Ointmented, and using 10% of the antiseptic.
- Saline mode: sprays saline into an infected stomach cavity, treating 100% of it during the infected stomach cavity surgery, using the whole saline tank.

### Gel Coolant Pack
- Skill check 40. Reusable cold pack that helps heal blunt force trauma and treats internal bleeding.
- Success: +100% Chilled, -35% pack condition. Failure: +75% Chilled, -35% pack condition.
- Condition falls when used or left unrefrigerated; refrigeration restores it, even from 0%.

### Gypsum
- Skill check 40. Powder that turns an applied bandage into a plaster cast, which slowly heals arm and leg fractures.
- Requires bandages or plastiseal first. Does nothing for skull, rib or neck fractures.
- Each cast gives a 20% movement speed debuff per cast. Remove with trauma shears.
- Failure: the gypsum is lost and nothing happens.

### Diving Knife
- Skill check 30. Knife that also removes bandages on the limb.
- Success removes bandages. Failure: +15% bleeding, +10% lacerations.

### Sutures
- Skill check 30. Final step of all surgery; also cures most wounds and bleeding.
- Success: -20% wounds (except blunt force trauma), -40% bleeding, and removes all surgery afflictions.
- Failure: +6% internal damage.

### Tourniquet
- Skill check 30. Restricts blood flow to stop blood loss from arterial bleeding.
- Success: prevents blood loss from arterial bleeding and slowly treats bleeding, but causes gangrene if left on too long.
- Failure: +6% blunt force trauma; not consumed.
- Removed with trauma shears, and automatically after open-close surgery.
- On the head: 15% neurotrauma and 200% oxygen low; does not clamp carotid arterial bleeding.

### Wrench
- Skill check 60 (30 if the patient has analgesia). Treats dislocations: drag onto the limb in the health UI and use it like a bandage.
- Success cures the dislocation. Failure causes fractures on that limb. No effect on a limb without a dislocation.
- Also removes an autopulse or body bag from a torso (not while unconscious); the item goes to the wrench user's inventory.

### Trauma Shears
- Skill check 10. Removes plaster casts, bandaged and triage cards from the used limb.
- Failure: +15% bleeding, +10% lacerations.
- Craftable at a medical fabricator or buyable from a merchant.


## Drugs: analgesia, opiates and anaesthesia

### Adrenaline
- Main use is cardiac arrest, but it has many effects. Each dose lasts 55 seconds, no skill check.
- Effects: +8% adrenaline rush (does not keep the patient conscious below 0 vitality), +30% blood pressure, analgesia up to 4.5%, increased heart rate, hyperventilation, +20% melee damage, halves fibrillation gain speed, halves the potency of slowing effects (such as plaster casts), prevents dislocations and fractures from locking hands or slowing the character. Fracture effect: causes bleeding if the character uses a weapon held in a fractured arm, and causes bleeding over time with fractured legs.

### Analgesic Tank
- Refillable, craftable or buyable, quality adds 5% max condition per level.
- In a surgery table: up to 14% analgesia to the patient lying on the table; condition drops 0.7% per second.
- In an ambubag: condition drops 25%. Normal patient: +56% analgesia, +40% opiate addiction, +30% opiate overdose, -75% opiate withdrawal. Patient above 30% drunk: +106% analgesia, +40% addiction, +60% overdose, -75% withdrawal.
- Only works for the patient lying on the table (or the one on the ambubag).

### Anaparalyzant
- Skill check 64. Cures paralysis resistance and treats paralysis; also quickly lowers anaesthesia and wakes the patient.
- Success: instantly cures anaesthesia, +5% psychosis, +800% paralysis resistance.
- Failure: -3% anaesthesia per second for 60 s, +6.5% paralysis resistance per second for 60 s, +0.75% psychosis per second for 60 s.

### Broad-spectrum Antibiotics
- Skill check 25. The only treatment for sepsis. Still gives the vanilla husk-infection resistance and reduces husk infection over time.
- Success: 50% strength, decaying 0.5%/s over 100 s, treats sepsis 0.95%/s for 100 s. Side effect: vanilla organ damage 0.2%/s, kidney and liver damage 0.175%/s, heart and lung damage 0.1%/s, all over 100 s (totals 20% organ damage, 17.5% kidney/liver, 10% heart/lung).
- Failure: 30% strength for 60 s, same treat rate and same side-effect rates, lower totals (12% organ, 10.5% kidney/liver, 6% heart/lung).
- Tip: side effects are real even on success, so do not use it on already-damaged kidneys/liver without need.

### Combat Stimulant
- Skill check 35. A stimulant that also works as a first aid item, with extra afflictions treated.
- Success: +20% chem addiction and +75% Combat Stimulant (strength 11% to 100%). Treats burns, blood loss, bleeding, internal bleeding, internal wounds, open wounds, stitched wounds and concussion at 2%/s each; treats chem withdrawal at 2%/s. Grants 45% to 50% stun resistance. Between 1% and 10% strength, treatment is halved and stun resistance 0% to 45%.
- Failure: +40% chem addiction and +75% Combat Stimulant.

### Deusizine
- Skill check 72. Special drug treating several life-threatening afflictions over 20 seconds, with a moderate Vigor buff.
- Success: -20% internal damage, -50% blood loss, -50% bleeding, -100% hypoxaemia, -20% vanilla organ damage, -6% stun, +4% burns, +40% blood pressure, +200% Vigor.
- Failure: -10% internal damage, -25% blood loss, -10% bleeding, -40% hypoxaemia, -10% organ damage, +20% burns, +20% blood pressure, +200% Vigor.

### Fentanyl
- Skill check 72. Powerful opiate for analgesia. Cannot be fired as a projectile (no syringe gun exploit).
- Success: +75% analgesia, +15% opiate addiction, +22.5% opiate overdose, -100% opiate withdrawal. Drunk above 30%: +150% analgesia, +37.5% overdose.
- Failure: +50% analgesia, +40% addiction, +30% overdose, -100% withdrawal. Drunk above 30%: +100% analgesia, +60% overdose.

### Haloperidol
- Skill check 37. Antipsychotic, also treats alcohol withdrawal.
- Success: -100% psychosis, -100% alcohol withdrawal. Failure: -25% each.

### Hyperzine
- Skill check 50. Powerful stimulant.
- Success: -12% internal damage, +18% chem addiction, +18% neurotrauma, +15% psychosis, +400% Haste, +400% Vigor, -54% stun, -90% chem withdrawal.
- Failure: -6% internal damage, +36% chem addiction, +36% neurotrauma, +30% psychosis, +400% Haste, +400% Vigor, -27% stun, -90% chem withdrawal.
- Haste and Vigor are instant; the other effects last 60 s.

### Mannitol
- Skill check 60. Treats neurotrauma and halves its gain, but damages organs.
- Works only if blood pressure is above 70% and hypoxaemia below 30%.
- Success: +50% mannitol (treats up to 100% neurotrauma), +5% organ damage, +10% heart damage, +10% kidney damage. Failure: +30% mannitol (treats up to 60%), +10% organ damage, +20% heart and kidney damage. All over 10 s.

### Methamphetamine
- Skill check 35. A stimulant.
- Success: +70% hyperactivity (instant), +15% organ damage, +15% neurotrauma, +15% chem addiction, +30% psychosis, -22.5% stun, -90% chem withdrawal. Failure: +50% hyperactivity, +30% organ damage, +30% neurotrauma, +30% chem addiction, +45% psychosis.
- Other effects over 30 s.

### Morphine
- Skill check 30. Moderately powerful opiate for analgesia. Cannot be fired as a projectile.
- Success: +50% analgesia, +10% addiction, +10% overdose, -30% withdrawal. Drunk above 30%: +100% analgesia, +20% overdose.
- Failure: +30% analgesia, +25% addiction, +20% overdose, -30% withdrawal. Drunk above 30%: +60% analgesia, +40% overdose.

### Naloxone
- Skill check 39. Reverses opiate effects.
- Success: -60% opiate withdrawal, -60% overdose, -60% addiction, -60% analgesia, -60% opioids.
- Failure: -30% withdrawal, -30% overdose, -30% addiction, -60% analgesia, -60% opioids, and +15% coma (50% chance).

### Nitroglycerin
- Skill check 35. Volatile vasodilator, explodes on impact or heat. While active, fibrillation caused by hypotension is reduced.
- Success: -45% blood pressure for 400 s. Failure: -45% blood pressure for 200 s.

### Opium
- Skill check 40. Weak opiate for analgesia.
- Success: +20% analgesia, +5% addiction, +8.75% overdose, -15% withdrawal. Drunk above 30%: +40% analgesia, +18.75% overdose.
- Failure: +10% analgesia, +20% addiction, +15% overdose, -15% withdrawal. Drunk above 30%: +20% analgesia, +30% overdose.

### Propofol
- No longer craftable. Induces controlled unconsciousness to prevent traumatic shock.
- Gives anaesthesia at 0.3% per second. 1 to 15% anaesthesia gives 5% analgesia; above 15% the patient is unconscious; at 100% the effect ends.
- Anaparalyzant reduces anaesthesia to 0%.
- Side effects: hypotension, confusion, blurred vision, fever, fibrillation, seizure, vomiting blood, psychosis.

### Raptor Bane Extract
- Niche first aid item. Treats acidosis by inducing vomiting, which gives alkalosis.
- No skill check or numbers on the card.

### Ringer's Solution
- Skill check 20. Isotonic solution to replace lost fluids or treat acidosis.
- Success: +30% blood pressure, +0.07% alkalosis per second for 200 s. Failure: same, for 120 s.

### Saline
- Skill check 10. Isotonic solution to replace fluids, treat alkalosis, or clean the cavity during cavity cleaning.
- Success: +30% blood pressure, +0.07% acidosis per second for 200 s. Failure: same, for 120 s.
- Also fills the antiseptic sprayer for stomach cavity cleaning.

### Sodium Nitroprusside
- Only usable if enabled in config under "Item Availability". Skill check 10.
- Same as nitroglycerin: -45% blood pressure, for 200 s on success or 120 s on failure. Reduces fibrillation caused by hypotension.

### Streptokinase
- Blood thinner. Stops natural bleeding regeneration and raises stroke risk if blood pressure is above 150%.
- On application: fully treats heart attack and hemotransfusion shock.

### Azathioprine
- Skill check 10. Immunosuppressant used in organ transplants when organ rejection is enabled in config. Lowers immunity over time; safe to place an organ once immunity is below 10%.
- Failure also causes sepsis.

### Liquid Oxygenite
- Skill check 72. Liquid alien material that injects oxygen into the bloodstream, treating hypoxaemia.
- Success (over 30 s): -3000% hypoxaemia (effectively immune for 30 s), +6% organ, lung, liver, heart and kidney damage each.
- Failure (over 20 s): -200% hypoxaemia, +10% each organ damage.
- Card comment says it behaves the same as the vanilla drug.

### Thiamine
- Skill check 10. Vitamin B1 pills for organ healing. Cannot revive dead organs (100% damage).
- Success: -8% lung, heart, kidney, liver and vanilla organ damage, plus +50% Thiamine that treats that organ damage over 200 s.
- Failure: -4.8% on each, plus +30% Thiamine over 120 s.
- Card note: a comment asks for the heart-attack text to be fixed; not confirmed.

## Blood

### Blood Packs
- Made by using an empty blood pack on a human below 31% blood loss. Must match the recipient's blood type (on the description).
- Compatible: -30% blood loss, +30% blood pressure.
- Incompatible: -20% blood loss, +30% blood pressure, +100% hemotransfusion shock.
- Donor afflictions: if the donor has acidosis, alkalosis or sepsis, those carry over (acidosis/alkalosis at 1/10 donor strength).
- Recipient with acidosis or alkalosis: neutral blood multiplies it by 0.9, unless recipient has 0% blood loss.
- Check contents with a hematology analyzer.

### Empty Blood Pack
- Skill check 30. Used to collect blood packs. Only works on humans under 31% blood loss.
- Success: +30% blood loss. Failure: +40% blood loss.
- Donor acidosis, alkalosis and sepsis carry into the pack at donor level divided by 5. Using it multiplies the patient's acidosis or alkalosis by 0.9.

### Alien Blood
- Skill check 55. Substitute for normal blood; extremely dangerous, only for dire situations.
- Application (success or failure): -20% blood loss, +60% psychosis, +100% hemotransfusion shock.

## Cardiac and respiratory devices

### Automated External Defibrillator (AED)
- Charged with batteries, it can reset fibrillation or cure cardiac arrest.
- Chances depend on medical skill (X axis): below 80 skill, the manual defibrillator is worse in all regards; at 100 the manual defibrillator is better in all regards.
- Tip: use the AED below skill 80, and the manual defibrillator at 100.

### Manual Defibrillator
- Very Important. Charged with batteries; can reset fibrillation, cause cardiac arrest, or cure cardiac arrest, with chances depending on skill.
- Stuns the patient for 1 s on any use.
- At skill 100 it is perfectly safe and always cures cardiac arrest and fibrillation.
- Below skill 80 the AED is better in all regards.

### AutoPulse
- Worn in the diving suit slot, with batteries. Cures cardiac arrest and slightly treats oxygen low and fibrillation; raises blood pressure.
- Overuse pushes blood pressure into hypertension.
- Forcibly removable with a wrench on the torso of a wearer who is not unconscious (goes to the wrench user).

### Ambubag
- Supplementary oxygen for a patient who is not breathing enough.
- Regular oxygen tank: treats 90% oxygen low, uses 2% of the tank.
- Oxygenite tank: treats 90% oxygen low, cures respiratory arrest, uses 2%.
- Welding fuel tank: causes 110% oxygen low, 10% lung damage, uses 5% of the fuel.
- Incendium tank: causes 110% oxygen low, 20% lung damage, 10% burns, uses 5%.
- Paint: causes 50% oxygen low, 3% lung damage, 5% chemical addiction; treats 20% chem withdrawal, uses 5%.
- Analgesic tank: gives analgesia, opiate addiction, opiate overdose and opiate withdrawal; amount depends on whether the patient is drunk.

### Medical Stent
- Hardmode aortic rupture only. Fourth step in aortic rupture surgery.
- Needs the endovascular balloon first. Cures aortic rupture and removes the balloon.

### Endovascular Balloon
- Hardmode aortic rupture only. Third step in aortic rupture surgery.
- Needs 100% surgery incision. Blocks the aorta, preventing aortic-rupture blood loss and treating normal bleeding, but causes gangrene.

### Dialysis Filter
- Placed in a surgery table to reduce acidosis or alkalosis for the patient lying on it.
- Reduces each by 0.8/s; filter condition falls 1/s; 0.1% chance per second of sepsis. No effect if neither affliction is present.
- Can be crafted but not bought. Quality adds 5% max condition per level.

### Toxin Filter
- Placed in a surgery table to remove poisons from the patient lying on it. Only poisons added by vanilla are valid.
- Filter condition drops 0.8/s per poison; 0.1% chance per second of sepsis; no effect on an unpoisoned patient.
- Morbusine: -1.8%/s (0 to 50% strength), -2.3%/s (above 50%).
- Cyanide: -2.8/s (0 to 30%), -5.5/s (above 30%).
- Sufforin: -1/s (0 to 50%), -1.8/s (above 50%).
- Deliriumine: -1.6/s (0 to 50%), -2.3%/s (above 50%).

### Drainage
- One-time use. Treats pneumothorax and cardiac tamponade. Used after retracted skin.
- Does nothing and is not consumed if the patient has neither.

### Needle
- Skill check 20. Consumable needle that reduces pneumothorax to 15% and cardiac tamponade to 5%; does not treat them.
- If the patient has no pneumothorax, it causes pneumothorax instead.
- Success: effects persist until the needle affliction wears off. Failure: +10% organ damage, +10% bleeding.

## Surgical tools

### Scalpel
- Skill check 30. Second step in all surgery; needs analgesia or unconsciousness.
- Success: gives surgery incision on the limb and removes plaster casts and bandages. Failure: +15% bleeding, +10% lacerations.
- Not craftable; comes from the "Surgery toolbox (kit)".

### Multipurpose Scalpel
- Craftable at a regular fabricator. Combines the scalpel, organ procurement scalpels and trauma shears, and can injure the patient.
- Mode selected by equipping and choosing a UI button:
  - Surgery incision: works like a scalpel.
  - Bandages, casts, malpractice: works like trauma shears if the patient has a bandage or cast; otherwise stabs the patient (risk of fractures, neurotrauma or organ damage).
  - Adaptive organ extraction: required for organ transplant surgery. Organ depends on retracted skin location and limb used: torso with left arm = kidney; torso with torso = liver; torso with right arm = heart; torso with left leg = lung; head with head = brain.

### Skin Retractors
- Skill check 30. Fourth step in most surgery; needs 100% clamped bleeding.
- Success: gives retracted skin on the limb. Failure: +10% internal damage.
- Not craftable; comes from the "Surgery toolbox (kit)".

### Hemostat
- Third step in most surgery. Needs 100% surgery incision. No skill check.
- Success: gives clamped bleeding on the limb.
- Not craftable; comes from the "Surgery toolbox (kit)".

### Surgical Drill
- Skill check 45. Fifth step in osteosynthesis surgery; needs 100% retracted skin.
- Success: gives drilled bones on the limb. Failure: +12% burns, +10% internal damage.
- Not craftable; comes from the "Surgery toolbox (kit)".

### Surgical Saw
- Skill check 45. Fifth step in amputation surgery; needs 100% retracted skin.
- Success: gives sawed bones. Failure: +15% bleeding, +6% internal damage, +4% lacerations.
- Not craftable; comes from the "Surgery toolbox (kit)".

### Tweezers
- Skill check 30. Removes damaged tissue or bullets.
- Surgery use (with retracted skin, gunshot wound or deep tissue injury): success gives -3% to -10% internal damage, -3% to -10% blunt force trauma, -3% to -10% foreign bodies, +5% lacerations; failure +6% internal damage.
- Without retracted skin, gunshot wounds or deep tissue injuries work only on foreign bodies, not blunt trauma. Each use through a wound gives 5% traumatic shock. Pulling foreign bodies has a 5% chance of scrap.
- Non-surgery use: minor bleeding, minor lacerations and intense pain.
- Using tweezers where they do nothing pinches the patient (worse on the head).

### Osteosynthesis Implants
- Skill check 45. Sixth step in osteosynthesis surgery; needs 100% drilled bones.
- Success: cures all fractures on the limb, uses 25% of the implants. Failure: +5% bleeding, +5% internal damage.

### Spinal Cord Implants
- Skill check 45. Treats spinal cord injury; needs 50% or higher retracted skin.
- Success: -100% spinal cord injury. If a neck fracture is untreated, the spine is injured again.
- Failure: +5% bleeding, +5% internal damage.

### Surgery Table
- Bought at a station or crafted, placed down. Patient must be near it, not on it.
- Provides artificial ventilation to nearby characters and prevents traumatic shock for patients under analgesia; also lowers oxygen low and prevents respiratory arrest and hypoventilation-driven acidosis. Hospital bed gives the same, but only to the patient lying on it.
- Holds an analgesic tank, a dialysis or toxin filter, and a refrigerated crate (the tank and filters only act on the patient lying on it).
- Wiring pins output blood pressure, acidosis, heart rate and breathing rate.
- Forcing an unconscious patient onto the table: grab them and use Select (left click). Hold right click then left click to place.

## Organs and limbs

### Heart Transplant
- Skill check 40. Heart-related afflictions (heart damage, etc.) are linked to it. Removed or transplanted in organ transplant surgery on the torso.
- Removal causes immediate cardiac arrest, 100% heart damage, and up to 20% organ damage (inverse to heart damage before removal). Removes cardiac tamponade and heart attack while removed.
- Transplant back treats heart damage and up to 20% organ damage, but not cardiac arrest.
- May cause organ rejection if immunity is above 10% (mod config toggle).
- Decays unless refrigerated; refrigerated organs regain condition only above 90%. Destroyed if dropped from height.

### Kidney Transplant
- Skill check 40. Two kidneys, each damaged separately. At 50% kidney damage one kidney has failed; healthy with one kidney.
- Removal of both removes 100% kidney damage and up to 20% organ damage each, inverse to damage before removal.
- Example: removal at 25% kidney damage gives one kidney at 100% and one at 50%.
- Transplant back treats up to 50% kidney damage and up to 10% organ damage per kidney.
- Organ rejection same rules as heart. Decay and refrigeration same rules.

### Liver Transplant
- Skill check 40. Liver damage linked to it.
- Removal: 100% liver damage and up to 20% organ damage, inverse to damage. Transplant treats both.
- Organ rejection same rules as heart. Decay and refrigeration same rules.

### Lung Transplant
- Skill check 40. Lung-related afflictions linked to it.
- Removal causes immediate respiratory arrest, 100% lung damage, up to 20% organ damage; removes pneumothorax; causes oxygen low even with artificial ventilation or autopulse.
- Transplant treats lung damage and up to 20% organ damage, but not respiratory arrest.
- Organ rejection and decay: same as heart.

### Brain Transplant
- Skill check 100. Consciousness and neurotrauma are linked to it. Usually not transplanted.
- Removal causes immediate unconsciousness, cardiac arrest, respiratory arrest, loss of control (freecam), 100% neurotrauma, and rapid neurotrauma gain while removed.
- Removal at 100% or more neurotrauma kills the patient instantly (200%).
- Transplant back restores control but cardiac and respiratory arrest still must be treated. Transplanted into another patient, the donor takes control of that patient.
- Always decays rapidly unless in a brain jar. Destroyed if it or its container touches the ground (brain jar excepted).

### Arm (Bionic / Severed)
- Attaches to a matching surgically amputated and prepared arm socket.
- Severed arms need refrigeration or they expire. Bionic arms need no refrigeration.
- Treats gangrene and missing arm (traumatic or surgical amputation).
- Added by performing amputation surgery and using the limb after 100% sawed bones.

### Leg (Bionic / Severed)
- Same rules as the arm, for legs.
- Treats gangrene and missing leg (traumatic or surgical amputation).

### Refrigerated Container
- Six slots, any small item. Main use: organ transplants (except brain), severed limbs and gel ice packs.
- Stops natural condition loss. Organs regain condition if above 90%, limbs above 95%, gel ice packs at any condition.
- Organs can be destroyed if the container is dropped from height.
- Refrigerates heart, kidney, liver, lung and severed limbs (also gel ice packs).

### Refrigerated Crate
- Twelve slots. Same function as the container, with the same refrigeration list and drop rules.
- Also serves as an item slot on the surgery table.

## Other

### Body Bag
- Worn in the diving suit slot. Used to carry bodies faster than dragging.
- Suffocates a living human placed inside.
- Forcibly removed with a wrench on the torso, if the wearer is not unconscious.

### Stasis Bag
- Worn in the diving suit slot. Keeps the body in stasis for transport.
- Drains its own condition 0.25%/s (about 400 s total). Protects the wearer down to 7000 m, allows dragging at full speed, and stops the negative effects of cardiac arrest, respiratory arrest, heart attack, neurotrauma, kidney/liver/heart/lung damage, bone damage, sepsis, hypoxaemia, hypotension, hypertension, acidosis, alkalosis, internal bleeding, stroke, seizure, coma, infected wounds and bleeding.
- Reduces the wearer's (suit) condition by 0.15/s while below 100%.
- Patients in a stasis bag cannot receive surgery, and wait 3 s after removal. They can still receive drugs.
- On removal, cardiac arrest, respiratory arrest and unconsciousness must be treated.


## Disagreements with mod data

> **Read first:** this cross-check ran against the earlier data extract (the copy in the project's shared `neuro-data/` folder). Commit 14a88b2 on the data branch filled many `treats`/`causes`/`skill` gaps, so several items below are now resolved. See `research/README.md` → *Cross-check status* for the re-checked list. A mismatch here means "worth checking", not "Trello is wrong".


Mod data = items.json / afflictions.json (ids in brackets). Only concrete mismatches where both values were seen.

- Morphine [antidama1]: Trello skill check 30; mod skillHint 50.
- Liquid Oxygenite [liquidoxygenite]: Trello skill check 72; mod skillHint 50.
- Surgical Saw [surgerysaw]: Trello skill check 45; mod skillHint 50.
- AutoPulse [autocpr]: Trello says it slightly treats oxygen low and fibrillation; mod treats (items.json) is only respiratoryarrest and cardiacarrest, and oxygenlow/fibrillation list bvm/aed/defibrillator only. Mod lists respiratoryarrest, which the card does not mention.
- Deusizine [deusizine]: Trello lists many effects (internal damage, blood loss, bleeding, organ damage, burns, stun, blood pressure, Vigor); mod treats only [hypoxemia].
- Streptokinase [streptokinase]: Trello says it fully treats heart attack and hemotransfusion shock; mod treats only [heartattack], and hemotransfusionshock has no treatments.
- Thiamine [thiamine]: Trello says it treats organ damage over 200 s (50%); mod treats []; organdamage has no treatments.
- Antibiotic Glue [antibleeding3]: Trello treats bleeding, burns and infected wounds; mod treats [] and infectedwound treatments omit it.
- Plastiseal [antibleeding2]: Trello says it reduces burns (-24%) and bleeding (-48%); mod treats [infectedwound, bandageddirty] only.
- Bandage [antibleeding1]: Trello says it applies bandaged and reduces bleeding; mod treats [], and bandaged/bleeding treatments do not list it.
- Broad-spectrum Antibiotics [antibiotics]: Trello says it causes organ, kidney, liver, heart and lung damage as side effects; mod causes [].
- Tourniquet [tourniquet]: Trello says it causes gangrene if left on too long; mod causes [], and gangrene causes only sepsis.
- Methamphetamine [meth] and Hyperzine [hyperzine]: Trello says both cause neurotrauma, psychosis, chem addiction and organ damage (meth also hyperactivity); mod causes [] for both. Trello says both reduce chem withdrawal by 90%; chemwithdrawal treatments [] omits them.
- Azathioprine [immunosuppressant]: Trello says failure causes sepsis; mod causes [] and sepsis causes do not list it.
- Propofol [propofol]: Trello lists side effects (hypotension, confusion, fibrillation, seizure, vomiting blood, psychosis) and anaesthesia; mod causes [].
- Blue Shark [blahaj]: Trello says it treats 2% psychosis; mod treats [] and psychosis treatments list only antipsychosis.
- Anaparalyzant [antiparalysis]: Trello says it cures anaesthesia and treats paralysis; mod treats [] and anesthesia treatments [].
- Analgesic Tank [analgesictank]: Trello says it provides analgesia (up to 14% on table, and via ambubag); mod treats [] and analgesia treatments [].
- Dialysis Filter [dialyzer]: Trello says it reduces acidosis and alkalosis; mod treats []; acidosis and alkalosis treatments [].
- Toxin Filter [toxfilter]: Trello says it treats morbusine, cyanide, sufforin and deliriumine poisoning; mod treats []; morbusinepoisoning, cyanidepoisoning and sufforinpoisoning treatments [].
- Ringer's Solution [ringerssolution]: Trello says it treats acidosis; mod treats []; acidosis treatments [].
- Saline [antibloodloss1]: Trello says it treats alkalosis; mod treats []; alkalosis treatments [].
- Needle [needle] and Drainage [drainage]: Trello says Needle reduces pneumothorax and tamponade, and Drainage treats both; mod treats [] for both, and pneumothorax and tamponade have no treatments.
- Antiseptic Sprayer [antisepticspray]: Trello's saline mode treats infected stomach cavity; mod infectedcavity has no treatments (the spray treats infectedwound, which matches).
- Haloperidol [antipsychosis]: Trello says it also treats alcohol withdrawal; mod treats [psychosis] only, and alcoholwithdrawal has no treatments.
- Tweezers [tweezers]: Trello says they reduce internal damage, blunt force trauma and foreign bodies; mod treats []; foreignbody and internaldamage treatments [].
- Trauma Shears [traumashears]: Trello says they remove plaster casts; mod treats [bandageddirty, bandaged] only, and plastercast has no treatments.
- Gel Coolant Pack [gelipack]: Trello says it gives chilled (+100%); mod treats [blunttrauma] only, and iced has no treatments.
- Gypsum [gypsum]: Trello says it makes plaster casts; mod treats [] and plastercast has no treatments.

## Trello items missing from mod data

- Combat Stimulant: Trello card with item use and numbers. items.json has no item entry; afflictions.json has combatstimulant (hidden).
- Raptor Bane Extract: Trello card (acidosis to alkalosis by vomiting). No item or affliction entry found.
- Brain jar: mentioned on the Brain Transplant and refrigeration cards as the only way to keep a brain safe. No item entry found in items.json.

## Mod items with no Trello card

Non-hidden, non-internal items with no dedicated card. Blood Pack variants (bloodpacka_positive etc.) are covered by the generic Blood Packs card.

- Donor cards: a_negativecard, a_positivecard, ab_negativecard, ab_positivecard, b_negativecard, b_positivecard, o_negativecard, o_positivecard (blood)
- Blank Donor Card: bloodcollector
- Captain's Pipe: captainspipe
- Cigar: cigar
- Tonic Liquid: tonicliquid
- Medical Starter Crate: medstartercrate
- Medical Container: medtoolbox
- Wheelchair: nt_wheelchair
- Surgery Toolbox: surgerytoolbox, surgerytoolboxset
- Surgery Kit: surgerykit (the Trello cards refer to the "Surgery toolbox (kit)" but there is no card for the kit itself)
- Organ Procurement Scalpels: organscalpel_brain, organscalpel_heart, organscalpel_kidneys, organscalpel_liver, organscalpel_lungs (only mentioned inside the Multipurpose Scalpel card)
- Repair Pack: repairpack (treats dislocation in mod; Trello wrench card does not mention it)
- Amputated Head: headsa
- Head Remains: headta
- Non-working Arm: armlock
