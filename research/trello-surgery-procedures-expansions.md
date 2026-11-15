# Neurotrauma Guide: Surgery, Procedures, Expansions, Mechanics (summary D)

Source: exported Trello cards, "Neurotrauma and Medical Guide" board. Links are reduced to their names. Skill numbers are as written on the cards.

## Surgery

### Traumatic Shock
Labels: Affliction, Lethal, Surgery, Mechanic.

Can become fatal quickly. Usually unintended.

- Decreases 4x as fast while the patient is under Anesthesia, or has Analgesia while near a Surgery Table.
- Character with Retracted Skin when the round ends (e.g. docking) gains 5 minutes of Traumatic Shock immunity next round.

Caused by:
- Unsafe surgery:
  - Surgery Incision without Analgesia.
  - Any later surgical step after Clamped Bleeding without sedation (no Surgery Table nearby, no Anesthesia).
- Tweezers on gunshot wounds or deep tissue injuries (minor shock unless overused).

Effects:
- Hypotension (lots).
- Cardiac Arrest at 40% or more.
- Respiratory Arrest at 30% or more.
- Neurotrauma at strength/100 per second. From 10% it outpaces natural regeneration.
- Psychosis at strength/100 per second.

Treatments:
1. Terminate the surgery and wait.
2. Move the patient next to a Surgery Table and make sure they are sedated.

Prevention:
1. Confirm the surgery is safe before going past Retracted Skin.
2. Make sure Analgesia or other sedation does not run out mid-surgery.

Note: the card calls Clamped Bleeding "clamped bleeders" in one place.

### Surgery Incision
The second step of all surgical procedures.

- Unclamped incision: 0.7% Blood Loss per second per incision.
- Incision without Analgesia or other sedation (Unconsciousness or Anesthesia): 2% Traumatic Shock per second per incision.
- If a bot on the player's team has this affliction, it is stunned until surgery finishes. This stops it walking away and lets the player make it lie on a Surgery Table to use its filters.

### Clamped Bleeding
The third step of most procedures.

- Prevents Blood Loss from the Surgery Incision.
- Required before Retractors (the next step).

### Retracted Skin
The fourth step of most procedures. Osteosynthetic and Organ Transplant surgery both branch from this step.

- Without a Surgery Table nearby: 2% Traumatic Shock per second per instance.

### Drilled Bones
The fifth step of Osteosynthetic Surgery.

- Without a Surgery Table nearby: 1.5% Traumatic Shock per second per instance.

### Sawed Bones
The fifth step of Amputation Surgery.

- Without a Surgery Table nearby: 1.5% Traumatic Shock per second per instance.

### Cleaning Cavity
The fifth step of Infected Stomach Cavity Surgery.

- Differs from other steps: it decreases in strength and disappears shortly after.
- Suturing before this step is complete aborts it.

## Procedures

### Open & Close Surgery
Steps:
1. Anesthetic of your choice (Analgesia or Anesthesia).
2. Scalpel.
3. Hemostat.
4. Skin Retractors.
5. Sutures.

### Osteosynthetic Surgery
Steps:
1. Anesthetic of your choice (Analgesia or Anesthesia).
2. Scalpel.
3. Hemostat.
4. Skin Retractors.
5. Surgical Drill.
6. Osteosynthesis Implants.
7. Sutures.

Must be done on every body part to treat Bone Death.

### Aortic Rupture Surgery
Only used if "Hardmode Aortic Rupture" is enabled in the config.

Steps:
1. Anesthetic of your choice (Analgesia or Anesthesia).
2. Scalpel.
3. Endovascular Balloon.
4. Medical Stent.
5. Sutures.

Cures Aortic Rupture.

### Amputation Surgery
Steps:
1. Anesthetic of your choice (Analgesia or Anesthesia).
2. Scalpel.
3. Hemostat.
4. Skin Retractors.
5. Surgical Saw.
6. (Optional) Install a replacement matching Arm Bionic Severed or Leg Bionic Severed.
7. Sutures.
8. (Optional, needs NT Cybernetics addon) Cybernetic Arm or Leg can be installed on the amputated limb without being opened again.

Notes:
- Will not yield the limb if the limb has more than 15% Gangrene.
- Causes an affliction unless step 6 was installed.
- Card comment (unresolved, from the board): "Steps were duplicated".

### Organ Transplant Surgery
Requires Organ Rejection enabled in config: take Azathioprine before placing the organ, and make sure the patient's immunity is 10% or lower. If organ damage is 100% after placement, the organ was rejected.

Steps (all on the torso):
1. Anesthetic of your choice (Analgesia or Anesthesia).
2. Scalpel.
3. Hemostat.
4. Skin Retractors.
5. Multipurpose Scalpel in adaptive organ extraction mode (read item description for instructions).
6. Either the respective organ transplant item (trades organ), or the Multipurpose Scalpel again (removes the organ).
7. Sutures.

### Infected Stomach Cavity Surgery
Steps:
1. Anesthetic of your choice (Analgesia or Anesthesia).
2. Scalpel.
3. Hemostat.
4. Skin Retractors.
5. Antiseptic Sprayer with Saline.
6. After the cavity-cleaning affliction is gone, Sutures.

## Expansions

These are separate mods, not part of base Neurotrauma. Each needs its own Workshop subscription.

### List of working expansions
Neurotrauma Fork is the base compatibility target. Listed compatible addons include NT Informative Descriptions, NT Cybernetics Enhanced, Curly's NT Surgery Plus Ultra, NT Pharmacy (fork), NT Blood Work, NT Eyes, NT Lobotomy, NT Infections, Crimson's NT Expansion, Mercy Hospital Tutorial Map, NT Bio Printer, NT Surgery Plus, NT Symbiote, NT Thermal, and NT Emergency Medicine.
Comments: Where is Symbiote; NT Bio Printer.

### Cybernetic Arm
Separate: Cybernetics Expansion.
- Attaches to an amputated arm socket (do Amputation Surgery first). Removed with a Crowbar.
- Advantages: faster melee and swim speed; good against sustained gunfire, creature attacks, and bleeding; less likely to be forcefully amputated when maintained; does not fracture or dislocate (fix those first or they stay permanent).
- Disadvantages: breaks over time in water unless worn under a suit (Waterproof Cyberarm avoids this); needs maintenance; costly; violently detaches if critically damaged by material loss.
- Application skill: Mechanical 70.
  - Success: attaches and heals internal damage from past failures.
  - Failure: 15% to 50% Bleeding on the limb. Does not delete the cyberlimb.

### Cybernetic Leg
Separate: Cybernetics Expansion. Same as the arm, with these differences:
- Attaches to an amputated leg socket.
- Advantage: faster running speed.
- Does not heal naturally; needs repair when damaged.
- Application skill: Mechanical 70. Success and failure effects match the arm.

### Damaged Electronics (affliction)
Separate: Cybernetics Expansion. Main downside of cyberlimbs.
- Each damage type has a chance to convert to cyberlimb damage.
- Gained amount scales with Material Loss, up to x3 at 100% material loss.
- Causes:
  1. Being in water without a diving suit.
  2. Burns: 75% chance, 200% of damage converted.
  3. Gunshot wounds: 85% chance, 75%.
  4. Bite wounds: 50% chance, 25%.
  5. Deep tissue damage: 50% chance, 50%.
  6. Blunt force trauma: 50% chance, 100%.
  7. Internal Damage: 75% chance, 100%.
  8. Foreign Bodies: 75% chance, 75%.
- Effects: limb occasionally stops working, frequency scales with strength; limb unusable at 99% or more.
- Treatment: FPGA Circuit.

### Bent Metal (affliction)
Separate: Cybernetics Expansion.
- Causes:
  1. Burns: 85% chance, 25% of damage.
  2. Lacerations: 50% chance, 25%.
  3. Bite wounds: 50% chance, 50%.
  4. Deep tissue injury: 85% chance, 100%.
  5. Blunt force trauma: 75% chance, 200%.
- Effects: slows you if on a cyberleg (scales with strength); limb unusable at 99% or more.
- Treatment: Welding Tool (needs welding fuel).

### Loose Screws (affliction)
Separate: Cybernetics Expansion.
- Causes:
  1. Moving with loose screws at 30% or more (self-sustaining).
  2. Lacerations: 75% chance, 25%.
  3. Deep tissue damage: 80% chance, 100%.
  4. Blunt force trauma: 50% chance, 50%.
  5. Internal Damage: 75% chance, 100%.
  6. Bite wounds: 50% chance, 50%.
  7. Foreign Bodies: 75% chance, 75%.
- Effects: loose screws and Material Loss while moving at 30% or more.
- Treatment: Screwdriver.

### Material Loss (affliction)
Separate: Cybernetics Expansion.
- Scales with Loose Screws, up to x3 at 100%.
- Causes:
  1. Loose screws while moving at 30% or more.
  2. Lacerations: 75% chance, 25%.
  3. Gunshot wounds: 80% chance, 80%.
  4. Bite wounds: 75% chance, 60%.
  5. Deep tissue injury: 100% chance, 100%.
  6. Foreign Bodies: 80% chance, 50%.
- Effects: loss of cyberlimb and Traumatic Amputation at 99% or more.
- Treatment: Steel Bar.

### FPGA Circuit (item)
Separate: Cybernetics Expansion. Repairs Damaged Electronics.
- Electrical skill check: 40.
- Success: -50% Damaged Electronics. Failure: -20%.

### Welding Tool (item)
Separate: Cybernetics Expansion. Repairs Bent Metal.
- Mechanical skill check: 50.
- Success: -20%. Failure: -5%.

### Screwdriver (item)
Separate: Cybernetics Expansion. Repairs Loose Screws.
- Mechanical skill check: 40.
- Success: -20%. Failure: -5%.

### Steel Bar (item)
Separate: Cybernetics Expansion. Repairs Material Loss.
- Mechanical skill check: 60.
- Success: -50%. Failure: -20%.

### Crowbar (item)
Separate: Cybernetics Expansion. Removes a cyberlimb. Works only if the cyberlimb is under 20% damaged, so repair first. Returns the cyberlimb item.

### Cyberbrain Implant (item)
Separate: Cybernetics Expansion. Cyber-augmented Brain Implant (cheaper) or Cyberbrain Positronic Implant (twice as effective).
- Advantages: boosts all skills by 5 (10 for Positronic); permanent mild Analgesia for easier surgery; improves Neurotrauma recovery (doubles Mannitol effects; doubles natural healing once causes are addressed); mild Neurotrauma resistance.
- Disadvantage: periodic Cyberpsychosis fits, avoidable by lowering immunity (e.g. Immunosuppressant Inhaler).
- How to add: open the head as in Retracted Skin, but do NOT remove the brain; place the Implant on top.
  - Electrical skill 60, Medical/Surgical skill 80.
  - Success: installs, heals some Neurotrauma and some organ damage.
  - Failure (Mechanical): as success, but causes 20% Neurotrauma.
  - Failure (Medical): as success, but causes Internal Bleeding.
- How to remove: Organ Transplant Surgery once returns the implant. A second use of the Organ Procurement Scalpel removes the patient's brain (they probably need it).

### Cyberlung (item)
Separate: Cybernetics Expansion. Cyber-augmented Lung (from a procured lung) or fully synthetic Cyberlung.
- Advantages: Partial Pressure Protection (briefly grants protection every 30 seconds, roughly doubling non-lethal time in pressure without a suit); improves melee and movement speed; resistant to Lung Damage and Pneumothorax.
- Disadvantage: periodic Cyberpsychosis; avoid by lowering immunity.
- How to add: do Organ Transplant Surgery with the Cyberlung in place of a meat lung. Optional: refrigerate the procured meat to upgrade later.
  - Mechanical 60, Medical/Surgical 70.
  - Success: installs, heals the organ and some organ damage.
  - Failure (Mechanical): 20% Lung Damage. Failure (Medical): Internal Bleeding.
- How to remove: Organ Transplant Surgery removes it and returns the cybernetic organ.

### Cyberheart (item)
Separate: Cybernetics Expansion. Cyber-augmented Heart or fully synthetic Cyberheart.
- Advantages: improves melee and movement speed; +20% max health; doubles natural rate at which Blood Pressure returns to match Blood Amount; resistant to Heart Damage.
- Disadvantage: periodic Cyberpsychosis.
- How to add: Organ Transplant Surgery with Cyberheart. Mechanical 60, Medical/Surgical 70.
  - Success: installs, heals organ damage and some organ damage.
  - Failure (Mechanical): 20% Heart Damage. Failure (Medical): Internal Bleeding.
- How to remove: Organ Transplant Surgery.

### Cyberkidney (item)
Separate: Cybernetics Expansion. Cyber-augmented Kidney or fully synthetic Cyberkidney.
- Advantages: only one needed; resistance to Blood Loss and Bleeding; switches blood type to C+ (accepts any blood without Hemotransfusion Shock); resistance to Kidney Damage.
- Disadvantages: C+ blood causes Hemotransfusion Shock if given to anyone without cybernetic blood; periodic Cyberpsychosis.
- How to add: Organ Transplant Surgery with Cyberkidney. Mechanical 60, Medical/Surgical 70.
  - Failure (Mechanical): 20% Kidney Damage. Failure (Medical): Internal Bleeding.
- How to remove: Organ Transplant Surgery.

### Cyberliver (item)
Separate: Cybernetics Expansion. Cyber-augmented Liver or fully synthetic Cyberliver.
- Advantages: resistant to poisons, toxins and Nausea; resistant to Liver Damage.
- Disadvantage: periodic Cyberpsychosis.
- How to add: Organ Transplant Surgery with Cyberliver. Mechanical 60, Medical/Surgical 70.
  - Failure (Mechanical): 20% Liver Damage. Failure (Medical): Internal Bleeding.
- How to remove: Organ Transplant Surgery.

### Surgical Infection (mechanic)
Separate: Surgery Plus Expansion. Causes Sepsis based on sterility.

Raises sterility:
- Patient wears Surgical Drapes (+100 base).
- Nearby characters wear Surgical Mask and Surgeon Clothes (scales with distance).
- Surgery skill: sterility = 10 + surgery skill / 5.
- Ointmented incision (+50).

Lowers sterility:
- Patient has no Surgical Drapes or Ointmented (sets sterility to minimum).
- Nearby characters without Surgical Mask or Surgeon Clothes (scales with distance).

At minimum sterility: 10% chance every 2 seconds to acquire Sepsis.

### Surgical Drapes (item)
Separate: Surgery Plus Expansion. +100 base sterility. -50% Traumatic Shock gain while worn.

### Surgical Mask (item)
Separate: Surgery Plus Expansion. Increases sterility when worn. -10% Lacerations. -20% Bleeding.

### Surgeon Clothes (item)
Separate: Surgery Plus Expansion. Increases sterility when worn. -10% Blunt force trauma, -10% Lacerations, -10% Bite wounds.

### Mannitol Plus (item)
Separate: Surgery Plus Expansion. Talent item. On use, treats 30% Neurotrauma over 10 seconds even if the patient is unstable, and applies Mannitol without organ damage.

### Experimental Treatment (item)
Separate: Surgery Plus Expansion. Surgeon-class talent item. Random effects, mostly positive, with a theoretical chance of unlimited effects (each positive roll gives another).

Possible positive effects:
- Vigor, Hyperactivity, Psychosis Resistance, Husk Infection Resistance: 200-400% strength.
- Paralysis Resistance: 300-600%.
- Analgesia: 20-100%.
- Anesthesia: 1-100%.
- Ointmented: 20-100%.
- Combat Stimulant, Pressure Stabilized: 30-100%.
- Full heal: treats 20-100% of Wounds, Vanilla Organ Damage, Neurotrauma and Blood Loss, and fully cures Sepsis.

Possible negative effects:
- Wounds (5-20%).
- Bleeding (30-80%).
- Stun for 2-15 seconds.

### Triage Card (item)
Separate: Surgery Plus Expansion. Marks patients by severity.
- Manual card: legs = green (minimal, likely to survive); arms = yellow (injured, dies if treatment is delayed long); torso = red (critical, needs immediate help); head = black (dead or nearly).
- Automatic card: rates health from afflictions and vitality as green, yellow, red or black.

### Brain Jar (item)
Separate: Surgery Plus Expansion. Surgeon talent item. Holds a brain indefinitely and repairs it at 1% per 10 seconds. Refrigeration only delays decay.

### Artificial Brain (item)
Separate: Surgery Plus Expansion. Replaces a removed brain. Prevents Neurotrauma from having no brain. Does nothing else.

### Medical Misconduct (item)
Separate: Surgery Plus Expansion. Read to gain skills.
- With surgical skill enabled: +8 Surgical, +2 Medical.
- With surgical skill disabled: +8 Medical.

## Other Expansions

### NT Pharmacy Guide
Separate: NT Pharmacy addon. Link to a Trello guide board only; not included.

### NT Eyes 2.0 Guide
Separate: NT Eyes addon. Link to a Trello guide board only; not included.

## Mechanics

The source list is empty in this export. No cards to summarize.

---

## Disagreements with mod data

> **Read first:** this cross-check ran against the earlier data extract (the copy in the project's shared `neuro-data/` folder). Commit 14a88b2 on the data branch filled many `treats`/`causes`/`skill` gaps, so several items below are now resolved. See `research/README.md` → *Cross-check status* for the re-checked list. A mismatch here means "worth checking", not "Trello is wrong".


Checked against the base-mod `afflictions.json` and `items.json` (commit 722122a). Only cases where both values were seen are listed.

1. **Tweezers cause Traumatic Shock.** Trello (Traumatic Shock card) says tweezers used on gunshot wounds or deep tissue injuries cause minor shock. Mod `items.json` `tweezers`: `causes: []`. Mod data may be incomplete here, so verify in the XML before publishing.

Other claims are consistent, but the mod gives no numbers for them: Surgery Incision (`surgeryincision`: Blood Loss, Traumatic Shock), Clamped Bleeding (`clampedbleeding`: prevents incision blood loss), Retracted Skin (`retractedskin`: applies Traumatic Shock), Drilled Bones (`drilledbones`), Sawed Bones (`sawedbones`), Traumatic Shock (`traumaticshock`: leads to cardiac arrest, respiratory arrest, neurotrauma, blood pressure, psychosis), Anesthesia (`anesthesia`: applies Analgesia), Analgesia (`analgesia`: allows surgery), Brain Removed (`brainremoved`), Ballooned Aorta (`balloonedaorta`: Endovascular Balloon), Cleaning cavity (`caviclean`: Antiseptic Sprayer + Saline). Two naming differences: Trello says "Organ Procurement Scalpel" and the mod code says "Organ Removal Scalpel action 2x" for brain removal. Trello's cavity card says "Cleaning Cavity"; the mod calls it "Cavity Cleaning". These are names, not values.

## Not covered by mod data

- All numeric rates: 4x shock reduction, 0.7% blood loss per incision, 2% and 1.5% shock per second, 40% and 30% arrest thresholds, 15% gangrene limit on amputation, 10% immunity limit for transplants, 10-min immunity and sterility formula.
- Procedure step orders and the Procedures list (Open & Close, Osteosynthetic, Aortic Rupture, Amputation, Organ Transplant, Infected Stomach Cavity). `items.json` has `usage`/`onFailure`/`skill` set to null for the surgical tools (scalpel, hemostat, skin retractors, suture, surgical drill, surgical saw, osteosynthesis implants, multipurpose scalpel, tweezers, antiseptic sprayer, surgery kit, needle), so step tools cannot be confirmed from mod data.
- Skill requirements and failure outcomes for surgical steps.
- Cybernetics Expansion, Surgery Plus Expansion, and Other Expansions content. These are separate mods, so this is expected.
- Surgical Infection and Sepsis mechanics, sterility sources, and the Experimental Treatment effect list.
- Cyberpsychosis mechanics, Damaged Electronics/Bent Metal/Loose Screws/Material Loss causes and thresholds.
- Mechanics list: empty in the export.
