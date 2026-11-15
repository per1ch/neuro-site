# Summary A: Neurotrauma guide (Trello lists Information, Symptoms, Head/Brain, Lungs, Heart)

Source: Trello board https://trello.com/b/lA0BSokX (fetched 2026-11-15). Card links are stripped; cross-references are given by card name. Cards with "Visible on X" labels are noted as such. Mod cross-check is in the last two sections.

## Information

### Neurotrauma Fork
- Guide page for the Neurotrauma Fork mod (Steam id 3190189044), a fork of the old Neurotrauma with minor additions, bugfixes and QoL changes.
- Feedback and mod development: Discord.

### FAQ *PLEASE READ!!!*
- Missing afflictions/items: scroll right (more categories) or Ctrl+F; otherwise report on Discord.
- Symptoms = afflictions that do nothing on their own and only aid diagnosis. Other afflictions have gameplay effects.
- Corrections: comment on the card or report on Discord.
- Guide moved to Trello because the Steam guide had misinformation and poor layout.

### How Labels Work
- Visible on Health Interface: shown with H key on a patient (mostly symptoms).
- Visible on Scanner: shown by handheld health scanner. Modded scanners also work.
- Visible on Hematology Analyzer: shown on the blood analyzer.
- Not Visible Ingame: on none of the three.
- Essential > Very Important > Important > Niche: item priority (Niche = situational or not the best choice).
- Affliction / Items / Procedure / Mechanic / Information: card type.
- Non-Lethal (never kills, or very slowly); Lethal (kills quickly); Lethality Depends (lethal only above some strength).
- First Aid: buys time, not a full treatment. Surgery: surgical skill replaces medical skill if the Surgery Plus expansion is used.
- Mental Symptom: hidden while unconscious.

### The 5 Commandments of Neurotrauma
1. Use the three Hs of diagnosis (see "How to Diagnose").
2. Keep blood circulating and air moving in and out.
3. Treat underlying causes, not symptoms (ask why the patient is in cardiac arrest).
4. No surgery without a surgery table or Propofol.
5. Surgery order: Sedation, then scalpel, hemostat, skin retractors, then optional steps, then sutures.

### How to Diagnose
- The three Hs: Health interface (surface), Health scanner (internals), Hematology analyzer (blood). Use all three for the most information.

### Order of Treatments
- If the patient is about to die, put them in a stasis bag. It gives 6 minutes of paused afflictions for diagnosis, planning and non-surgical treatment.
- Order of importance:
  1. Stasis bag if deteriorating rapidly.
  2. Diagnose with the three Hs.
  3. Tourniquet on any arterial bleeding.
  4. Suture regular major bleeding, give blood packs as needed. Fix internal or aortic bleeding before transfusing, or blood is wasted. Consider Liquid Oxygenite (LO2) to stabilize for surgery.
  5. Needle if pneumothorax is high.
  6. Prep patient to leave the bag. Drugs as needed:
     - Azathioprine if later organ transplants are needed.
     - Antirad or Stabilozine for radiation sickness (important).
     - Broad-spectrum antibiotics for sepsis.
     - Mannitol for neurotrauma reduction or healing, if blood is stable.
     - Morphine as surgical painkiller.
     - Thiamine for organ damage healing.
     - Then remove from bag and start surgery. Apply LO2 here if used after the bag.
  7. First aid for heartbeat and breathing if arrested or about to arrest. This includes right after leaving the bag, which stops heartbeat and breathing. Skip if massive internal or aortic bleeding must be fixed first.
  8. Fix aortic rupture, internal bleeding and arterial bleeding properly. Give more blood if needed.
  9. Fix heart and breathing problems, including drainage for pneumothorax.
  10. Fix bad burns (high second degree or any third degree):
      - Second degree: antibiotic ointment, or bandages if the limb needs no surgery.
      - Third degree: antibiotic glue. If the limb needs surgery, apply Plastiseal before closing with sutures.
  11. Osteosynthesis implants on head, neck and chest fractures first, then spinal cord implants for spinal cord injury.
  12. Health scanner on body parts, tweezers to remove foreign bodies, heal internal damage and blunt force trauma.
  13. Organ transplant if needed.
  14. Sutures to close surgeries and fix wounds.
  15. Bandages, then gypsum casts on arm and leg fractures.
  16. Hematology analyzer for lingering blood problems. Broad-spectrum antibiotics for sepsis if not already given.
- LO2 option: negates breathing, heartbeat and blood need for 30 seconds. Gives time to fix arterial bleeding or aortic rupture without accruing damage. Causes some organ damage.
- LO2 can also ignore bleeding, breathing and heartbeat for 30 seconds during surgery. Then apply blood packs and restart heartbeat and breathing. For aortic rupture, LO2 plus replacing blood after the fix is a good choice.

### Med Kit Recommendations
- First aid kit (distribute around the sub): bandages, sutures, tourniquet, autopulse (only to stay conscious until a doctor arrives), blood packs (O- or O+ preferred), gypsum, trauma shears, dislocation pills or opium plus a wrench, minor husk sepsis pills. Wrench is needed for dislocations and cannot go in a med kit.
- Doctor's med kit 1: opium, morphine or analgesia pills for surgery; bandages; sutures (or in surgery toolbox); tourniquet; health scanner; hematology analyzer; blood packs (O- or O+); gypsum; trauma shears (or in surgery toolbox). Keep a stasis bag on the hotbar.
- Doctor's med kit 2: surgical drill, surgical saw, ambubag, antiseptic sprayer with antiseptic (or antibiotic ointment), manual defibrillator or AED, Neurotrauma pills or mannitol, minor husk sepsis pills or broad-spectrum antibiotics, major husk pills or calyxanide, Plastiseal or antibiotic glue.
- Surgery kit: scalpel, hemostat, skin retractors, sutures, tweezers, needle, drainage. Carry 4 organ-procurement scalpels, extra needle and drainage. If you don't carry a surgery kit, add a needle to your med kit.

### Language versions (Chinese, Russian, Spanish)
- Links only, no content.

### Talent Changes
- Empty card, updated 2026-04-11. No content in the export.

### How to install Lua for Barotrauma (required by Neurotrauma)
- Install Lua for Barotrauma (Steam id 2559634234) and follow its OS-specific guide.
- Server-side Lua: select Server Executable in the host menu. Check with F3 console command `reloadlua`. Does not work in singleplayer.
- Client-side Lua: needed for singleplayer. Neurotrauma works in multiplayer with only server-side Lua. NT Eyes and NT Cybernetics Enhanced need client-side Lua too for multiplayer. Check each mod's description.
- Check client with F3 then `cl_reloadlua`.

## Symptoms

All symptom cards are non-lethal and cause no other afflictions. Treatment for every symptom is "treat the causes". Visible-on-health-interface is noted per card.

### Vomiting Blood (visible on Health Interface)
- Caused by: internal bleeding at 50%+, liver damage at 100%, anesthesia.

### Pale Skin (visible on Health Interface)
- Caused by: hypotension at 50% or less, blood loss at 40%+.

### Shortness of Breath (visible on Health Interface)
- Caused by: heart attack, lung damage 45%+, pneumothorax 40%+, cardiac tamponade 10%+, hemotransfusion shock 0-70%, hypoxemia 20%+, heart damage 80%+.

### Cough (visible on Health Interface; Mental Symptom)
- Caused by: lung damage 50%+, heart damage 50%+, cardiac tamponade 20%+.

### Nausea (visible on Health Interface)
- Effect: slows character by 10%.
- Caused by: hemotransfusion shock 0-90%, withdrawal 40%+, radiation sickness 80%+, kidney damage 60%+, concussion, infected stomach cavity 5%+, being near uncontained organs.

### Increased Heartrate (visible on Health Interface)
- Non-lethal unless it is slowly increasing, which means fibrillation is underway.
- Caused by: acidosis 20%+, sepsis 20%+, blood loss 40%+, pneumothorax 30%+, alcohol withdrawal 75%+, fibrillation, adrenaline.

### Confusion (visible on Health Interface; Mental Symptom)
- Caused by: acidosis 15%+, sepsis 40%+, hypotension 30% or less, hypoxemia 50%+, alcohol withdrawal 80%+, concussion, anesthesia.

### Lightheadedness (visible on Health Interface; Mental Symptom)
- Caused by: hypotension 60% or less.

### Blurred Vision (visible on Health Interface; Mental Symptom)
- Caused by: hypotension 55% or less, concussion, anesthesia.

### Leg Swelling (visible on Health Interface)
- Cyberlegs do not swell.
- Caused by: liver damage 40%+, kidney damage 60%+, heart damage 80%+.

### Wheezing (visible on Health Interface)
- Caused by: hemotransfusion shock 0-90%.

### Weakness (visible on Health Interface)
- Effect: -80% melee damage.
- Caused by: cardiac tamponade 30%+, blood loss 60%+, acidosis 35%+.

### Fever (visible on Health Interface)
- Updated 2026-06-12.
- Caused by: sepsis 5%+, alcohol withdrawal 90%+, anesthesia, infected stomach cavity 5%+.

### Sweating (visible on Health Interface)
- Caused by: heart attack, withdrawal 30%+.

### Bloating (visible on Health Interface)
- Caused by: liver damage 50%+.

### Inflammation (visible on Health Interface)
- Caused by: infected wounds 10%+, foreign bodies 15%+.

### Jaundice (visible on Health Interface)
- Caused by: liver damage 80%+.

### Abdominal Discomfort (visible on Health Interface; Mental Symptom)
- Updated 2026-06-12.
- Caused by: liver damage 65%+, infected stomach cavity 40%+.

### Headache (visible on Health Interface; Mental Symptom)
- Fuzzy overlay on screen edges.
- Caused by: blood loss 50%+, acidosis 20%+, hypoxemia 40%+, hypotension 60% or less, stroke, alcohol withdrawal 50%+, skull fractures, concussion.
- Treatment: treat causes, plus painkillers (analgesia or anesthesia).

### Craving (visible on Health Interface; Mental Symptom)
- Caused by: withdrawal 20%+.

### Palpitations (visible on Health Interface)
- Caused by: alkalosis 20%+.

### Spasms (visible on Health Interface)
- Patient jerks and flops, making them harder to hold. Spawns small invisible explosions on the limb that only cause knockback.
- Caused by: seizure.

### Abdominal Pain (visible on Health Interface; Mental Symptom)
- Updated 2026-06-12.
- Effect: halves speed for 1 second every 3-6 seconds. Not lethal.
- Caused by: hemotransfusion shock 0-80%, aortic rupture, infected stomach cavity 5%+.
- Treatment: treat causes, plus analgesia (card 51).

### Chest Pain (visible on Health Interface; Mental Symptom)
- Effect: same as abdominal pain (halves speed 1 s every 3-6 s). Not lethal.
- Caused by: hemotransfusion shock 0-60%, rib fractures, aortic rupture.
- Treatment: treat causes, plus analgesia.

### Intense Pain (visible on Health Interface)
- Only occurs after dislocation, fracture or amputation.
- Effect: halves speed 1 s every 3-6 s.
- Caused by: dislocations, fractures, traumatic amputation.
- Treatment: stabilize dislocation with bandage or fracture with plaster cast; painkillers (analgesia or anesthesia); Vicodin.

### Vomiting (visible on Health Interface)
- Usually harmless. Can help by causing alkalosis.
- Effect: slows character by 20%, and causes alkalosis.
- Caused by: hemotransfusion shock 0-40%, alcohol withdrawal 60%+, drunk at 100%, kidney damage 60%+, raptor bane extract.

## Head/Brain

### Neurotrauma (Visible on Scanner; Lethal)
- Updated 2025-11-06.
- Direct damage to vitality. One of the only things that does direct health damage. Builds up very fast. Instant death at 200%.
- Natural healing: 0.1% per second, if config is unchanged and nothing is damaging it.
- Caused by:
  - Stroke.
  - Liver damage 80%+ (outpaces natural regen).
  - Kidney damage 100% (cancels natural kidney regen).
  - Sepsis 25%+ (outpaces regen).
  - Hypoxemia 10%+ (outpaces regen).
  - Tourniquet on the head.
  - Methamphetamine, hyperzine.
  - Traumatic shock: strength / 100 per second. 10%+ outpaces regen.
  - Cyanide poisoning 70%+.
  - Gunshot wound to the head: chance.
- Skull fractures stop natural regen. Net gain or loss depends on the combined strength of all causes. A Desmos calculator by @arceronth models the rate.
- Effects: direct vitality damage; instant death at 200%; respiratory arrest at 100%+; unconsciousness at 100%+.
- Treatment: treat causes, mannitol, and mannitol-plus (Surgery+ expansion).
- Card comments say the tourniquet cause is "arterial bleeding" in the generic card, and that carotid artery bleeding has no separate card.

### Stroke (Visible on Scanner; Lethal)
- Must be treated quickly. Do NOT use streptokinase (anti-clot) on stroke patients, because it thins blood and worsens brain damage.
- Caused by: hypertension at 150%+.
- Effects: neurotrauma, seizure, coma, headache.
- Treatment: open-close surgery.

### Withdrawal (Not Visible Ingame; Non-Lethal)
- Caused by: chemical, alcohol or opiate addiction. Updated 2026-07-23.
- In alcohol, chemical and opiate withdrawal:
  - Craving at 20%+.
  - 10% slower movement at 20%+.
  - Sweating at 30%+.
  - 30% slower movement at 40%+.
  - Nausea at 40%+.
  - 50% slower movement at 80%+.
- Alcohol withdrawal only:
  - Fever at 90%+.
  - Vomiting at 60%+.
  - Headache at 50%+.
  - Confusion at 80%+.
  - Increased heartrate at 75%+.
  - Seizure at 50%+.
  - Hypertension.
- Treatment:
  - Haloperidol: alcohol withdrawal only.
  - Naloxone: opiate withdrawal only.
  - Ambubag containing paint: chemical withdrawal only.
  - Give more of the same substance.
  - Bed rest.

### Opiate Overdose (Visible on Scanner; Lethal)
- Rare. Only from abusing opiates. Very deadly above 50%. Needs emergency care.
- Caused by: opium, morphine, fentanyl, analgesic tank.
- Effects:
  - Respiratory arrest at 60%+.
  - Hypoventilation at 30%+.
  - Seizure.
  - Unconsciousness at 60%+.
  - 50% slower movement at 50%+.
- Treatment: naloxone.

### Seizure (Visible on Health Interface and Scanner; Non-Lethal)
- Full-body seizures; ragdolls the character whenever they trigger.
- Caused by: stroke, acidosis 60%+, alkalosis 60%+, alcohol withdrawal 50%+, opiate overdose 50%+, anesthesia, radiation sickness 50%+.
- Effects: unconsciousness, spasms.
- Treatment: treat causes.

### Unconsciousness (Visible on Health Interface; Non-Lethal)
- Means something very wrong. Treat ASAP.
- Hides Mental Symptom cards.
- Acts as a surgery table: surgery is safe without a table or analgesia/anesthesia while the patient is unconscious.
- Caused by: vitality below 0, hypoxemia 80%+, neurotrauma 100%+, coma 15%+, aortic rupture, seizure, anesthesia 15%+, opiate overdose 60%+, stasis bag.
- Effects: cannot move or speak; oxygen low (if caused by vitality below 0); allows surgery tools; prevents traumatic shock from surgery.
- Treatment: treat causes.

### Coma (Visible on Scanner; Non-Lethal)
- Often follows suffocation. Usually not fatal with proper care. Strap an autopulse on if severe.
- Caused by: stroke, cardiac arrest, acidosis 60%+, morbusine poisoning 20%+, failing a naloxone skill check.
- Effects: cardiac arrest at 40%+; unconsciousness at 15%+.
- Treatment: treat causes and wait. Natural regen goes from 0.2/s to 0.5/s when all of these hold:
  - Acidosis below 20%.
  - Alkalosis below 20%.
  - Heart damage below 30%.
  - Lung damage below 40%.
  - Full oxygen availability (like hypoxemia at 0%).

### Spinal Cord Injury (Visible on Health Interface; Non-Lethal)
- Removes ability to move or speak. Can get you killed indirectly.
- Caused by: neck fractures.
- Effects: cannot move or speak; analgesia.
- Treatment: spinal cord implants must be applied before sutures during osteosynthetic surgery. Fix the neck fracture as well. Treat the spinal cord injury AFTER the neck fracture, or it returns.

### Concussion (Visible on Scanner; Non-Lethal)
- Caused by a severe attack to the head. Periodically causes nausea, blurred vision, headache, confusion. Not lethal.
- Treated as damage, so any item that treats damage works.
- Caused by: internal wounds; deep tissue injury and bite wounds.
- Prevention: wear a helmet.
- Treatment: bed rest, Pomegranate Extract.

### Drunk (Visible on Health Interface and Scanner; Lethal)
- Alcohol effects, worst at high strength:
  - Decreased movement speed at 20%+.
  - Screen distortion at 20%+.
  - Analgesia at 20%+ (and no more than 5%).
  - Alcohol addiction at 20%+.
  - Screen blurring at 40%+.
  - Liver damage at 40%+.
- Caused by: ethanol, rum, beer bottle.
- Treatment: bed rest.
- Card has a Russian comment saying the table has many errors. Contact via Discord given in the comment.

## Lungs

### Respiratory Arrest (Visible on Scanner and Health Interface; Lethal)
- Quickly builds up oxygen low and suffocates. Must be dealt with fast.
- Being near a surgery table, a hospital bed, or wearing an autopulse prevents the negative effects.
- Caused by: lung damage at 100%, traumatic shock 30%+, neurotrauma 100%+, hypoxemia 70%+, opiate overdose 60%+, stasis bag, morbusine poisoning 50%+.
- Effects: oxygen low, acidosis, cannot speak.
- Treatment: treat causes; ambubag with oxygenite tank; stay conscious.
- First aid: be near a surgery table; autopulse.

### Lung Damage (Visible on Scanner; Lethality Depends)
- Not lethal below 100%. Natural healing 0.01% per second, if config is unchanged, nothing is damaging it, and it is below 100%.
- Caused by: broad-spectrum antibiotics; liquid oxygenite; ambubag with welding fuel, incendium fuel or paint; smoking; hemotransfusion shock 0-70%; radiation sickness 28%+ (outpaces regen); sepsis 3%+ (outpaces regen); hypoxemia 4%+ (outpaces regen); blunt force trauma; gunshot wound.
- Effects: cough at 50%+; shortness of breath at 45%+; respiratory arrest at 100%.
- Treatment: time; thiamine; organ transplant surgery.

### Pneumothorax (Non-Lethal; Visible on Scanner)
- Stops hypoxemia from decreasing, in proportion to strength. Not lethal alone, but can easily kill with hypoxemia.
- Negative effects can be temporarily negated with a needle.
- Caused by: rib fractures (if not bandaged), trauma (gunshots, explosions, lacerations, bites, blunt force, internal damage), needle.
- Effects: shortness of breath at 40%+; hyperventilation at 15%+; increased heartrate at 30%+.
- Treatment: drainage during surgery (after skin retractors).
- First aid: needle.

### Hyperventilation (Non-Lethal; Visible on Health Interface)
- Normally harmless. Cancels out with hypoventilation.
- Caused by: hypotension 80% or less, hypoxemia 10%+, pneumothorax 15%+, sepsis 15%+, adrenaline.
- Effects: alkalosis.
- Treatment: treat causes; induce hypoventilation.

### Hypoventilation (Non-Lethal; Visible on Health Interface)
- Normally harmless. Cancels out with hyperventilation.
- Caused by: opiate overdose 30%+, opioids, anesthesia.
- Effects: acidosis.
- Treatment: treat causes; induce hyperventilation.

### Oxygen Low (Lethal; Visible on Scanner)
- Lack of oxygen in the lungs. Hypoxemia is lack of oxygen in the blood. Oxygen low causes hypoxemia, the most common route to neurotrauma.
- Caused by: respiratory arrest; unconsciousness (if caused by vitality below 0); being in water or a room without oxygen; pomegranate extract; body bag; morbusine poisoning 50%+.
- Effects: hypoxemia.
- Treatment: surgery table or hospital bed; CPR; autopulse; breathing oxygenated air; ambubag with oxygen or oxygenite tanks.

## Heart

### Cardiac Arrest (Lethal; Visible on Health Interface and Scanner)
- Blood pressure drops sharply. Must be dealt with fast. Does not heal on its own.
- Caused by: heart damage at 100%; traumatic shock 40%+; coma 40%+; hypoxemia 80%+; irregular heartbeat 20%+; fibrillation; manual defibrillator; stasis bag; morbusine poisoning 50%+.
- Effects: coma; acidosis; hypotension (sets blood pressure to minimum); hypoxemia.
- Treatment: treat causes; CPR; autopulse; adrenaline; manual defibrillator or AED; nitroglycerin pill (NT pharmacy).

### Cardiac Tamponade (Lethal; Visible on Scanner)
- Common in combat missions outside the sub (abandoned outposts, wrecks). Can be temporarily negated with a needle until surgery.
- Caused by: open wounds to the torso.
- Effects: hypotension (scales with strength; halves blood pressure at 100%); weakness at 30%+; cough at 20%+; shortness of breath at 10%+.
- Treatment: drainage during surgery (after skin retractors).
- First aid: needle; saline; Ringer's solution.

### Heart Attack (Lethal; Visible on Scanner)
- Must be treated ASAP to reduce risk of heart failure.
- Caused by: hypertension at 150%+; failing an antibiotic glue skill check.
- Effects: sweating, shortness of breath, heart damage.
- Treatment: treat causes; streptokinase; nitroglycerin pill (NT pharmacy).

### Heart Damage (Lethality Depends; Visible on Scanner)
- Not lethal below 100%. Natural healing 0.01% per second, if config is unchanged, nothing is damaging it, and it is below 100%.
- Caused by: heart attack; broad-spectrum antibiotics; liquid oxygenite; hemotransfusion shock 0-70%; mannitol; radiation sickness 29%+ (outpaces regen); sepsis 3%+ (outpaces regen); hypoxemia 4%+ (outpaces regen); blunt force trauma; gunshot wound; sufforin poisoning 75%+.
- Effects: cough at 50%+; shortness of breath at 80%+; leg swelling at 80%+; cardiac arrest at 100%.
- Treatment: time; thiamine; organ transplant surgery.

### Irregular Heartbeat (Lethal; Visible on Health Interface)
- Heart beats irregularly. Can lead to cardiac arrest.
- Caused by: fibrillation.
- Effects: cardiac arrest at 20%+; hypotension.
- Treatment: treat causes; manual defibrillator or AED; CPR; autopulse.

### Fibrillation (Mechanic; Lethal; Visible on Health Interface)
- Starts as increased heartrate that slowly rises. Once increased heartrate reaches 100%, the victim enters fibrillation and symptoms start.
- Caused by: aortic rupture; acidosis; hypotension; hypoxemia; anesthesia.
- Causes cardiac arrest at 20%+ and hypotension at 100%.
- Treatment: treat causes; adrenaline (slows fibrillation); manual defibrillator or AED.

## Disagreements with mod data

> **Read first:** this cross-check ran against the earlier data extract (the copy in the project's shared `neuro-data/` folder). Commit 14a88b2 on the data branch filled many `treats`/`causes`/`skill` gaps, so several items below are now resolved. See `research/README.md` → *Cross-check status* for the re-checked list. A mismatch here means "worth checking", not "Trello is wrong".


Only mismatches where both the Trello card and the mod value were seen are listed.

- **pneumothorax**: Trello says visible on scanner. Mod data has detectedBy empty and showInScannerThreshold null (no scanner detection).
- **lungdamage**: Trello says visible on scanner. Mod data has detectedBy empty.
- **oxygenlow**: Trello says lethal and visible on scanner. Mod data has detectedBy empty and showInScannerThreshold null.
- **respiratoryarrest**: Trello says visible on scanner and health interface. Mod data has showInScannerThreshold 999 (never shown on scanner) and detectedBy empty. Trello says lethal; mod code type is "Non-Limb Specific, Interrim" with no lethal marker. (The mod's `danger` field is null for all entries, so the lethal label is only checkable against the code type.)
- **hypoventilation**: Trello says normally harmless and can be ignored. Mod code description says it "gradually increases potentially lethal Acidosis".
- **withdrawal (opiatewithdrawal)**: Trello lists nausea at 40%+ among opiate withdrawal effects. Mod symptoms are only [sweating, craving]. Nausea may be applied in code and not in the symptoms field.
- **seizure**: Trello effects are unconsciousness and spasms. Mod symptoms are only [unconsciousness]. Mod code effects list "Unconsciousness, Spasms", so this is minor.
- **fibrillation (Irregular Heartbeat id)**: Trello's Fibrillation mechanic card lists aortic rupture, acidosis, hypotension, hypoxemia and anesthesia as causes. Mod data for id fibrillation has causes []. The same harmful causes appear under increasedheartrate code. Trello's Irregular Heartbeat card links to fibrillation as its cause, which matches mod id fibrillation.
- **stroke / neurotrauma**: Consistent on causes, effects and thresholds that were checked. No mismatch.
- **Checked and matching**: neurotrauma maxStrength 200 and healthscanner detection; mannitol treatment; stroke causes and effects; coma causes and effects; heart attack causes, effects and streptokinase; cardiac tamponade causes and effects; spinal cord injury cause; concussion cause, effects and healthscanner detection; hyperventilation and pneumothorax causes; lung damage causes; increased heartrate causes; cardiac arrest lethal status and defibrillator/AED/CPR/adrenaline treatments.

## Not covered by mod data

- Healing rates: neurotrauma 0.1%/s; lung damage and heart damage 0.01%/s; coma regen 0.2/s to 0.5/s. The mod guide field `naturalRecovery` is null for these.
- Coma regen conditions and thresholds (acidosis, alkalosis, heart damage, lung damage, oxygen).
- Symptom threshold numbers (e.g. sweating at 30%+, shortness of breath at 45%+). The mod data has no threshold list (`guide.thresholds` empty for all checked ids).
- Neurotrauma tourniquet-on-head cause, and gunshot-to-head chance. Mod causes list was truncated in this check.
- Nitroglycerin pill (cardiac arrest, heart attack treatment). Not checked against mod treatments.
- Opiate overdose treatment "naloxone": mod treatment id is antinarc. Mapping to the naloxone item not confirmed in items.json.
- Stroke treatment (open-close surgery): mod stroke has no treatments.
- Spinal cord implant ordering and surgery steps: belong to surgery.json, not checked.
- Items and surgery steps in the Information cards (stasis bag timing, LO2 effects, med kit contents, mannitol/antirad/azathioprine ordering): item data was not checked.
- Symptom visibility labels on the Health Interface and the Hematology Analyzer: no schema field for the health interface.
- Card-level comments (Russian error warning, carotid bleed question): not verified.
- Lethality labels for symptom cards and Withdrawal: mod danger field is null, so not checkable.
- Drunk: mod data has no alcohol threshold data, so the 20%/40%/5% thresholds are unverified.
