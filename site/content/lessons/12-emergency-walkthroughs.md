---
title: "Emergency Walkthroughs"
summary: "Six step-by-step plans for the emergencies you will meet most, with the reason behind every step."
description: "Six step-by-step plans for the emergencies you will meet most, with the reason behind every step."
order: 12
section: emergencies
level: intermediate
difficulty: intermediate
readingTime: 8
---

Emergencies rarely come one at a time, and the first minute decides a lot. These six walkthroughs show what to do, in what order, and why.

## In short

- Stop the fastest killer first: a [Tourniquet](#/item/tourniquet) on an arm or leg with [Arterial Bleeding](#/affliction/arterialcut), then a bandage for the rest.
- Keep oxygen moving. Ventilate when breathing stops, and restart the heart when it stops.
- Pick the defibrillator by medical skill: the [AED](#/item/aed) below 80, the [Manual Defibrillator](#/item/defibrillator) above 80. <!-- source: Assets/Content/Localization/English/English.xml:778; Assets/Content/Localization/English/English.xml:782 -->
- [Saline](#/item/antibloodloss1) and [Ringer's Solution](#/item/ringerssolution) raise blood pressure. They do not replace lost blood. Blood packs do.
- Treat an opiate overdose by ventilating first, then giving [Naloxone](#/item/antinarc).

Most chances and speeds in the mod are multiplied by server settings, and the default multiplier is 1 <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:24-28 -->. Your server may be easier or harder than these numbers suggest. Most item uses also depend on a skill check. If your medical skill is half the level the item asks for, you have a 50% chance <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:965-975 -->.

## Walkthrough 1: Gunshot with arterial bleeding

A bullet to a limb can leave a [Foreign Body](#/affliction/foreignbody) behind. A foreign body of 20 or more can cut an artery <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2910-2916 -->, and the cut is the fast killer. Arterial bleeding adds 1.5 blood loss every second and gets stronger by 1 per second <!-- source: Assets/Content/XML/Afflictions/Extremities.xml:278-283 -->. It only grows while the limb has no tourniquet <!-- source: Assets/Content/XML/Afflictions/Extremities.xml:278-283 -->.

1. **Apply a [Tourniquet](#/item/tourniquet) to that limb.** This is the first step because it stops the blood loss from that limb. The check needs medical 30. On failure the tourniquet is not used up, but the limb takes 6 blunt trauma <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:770-774 -->. It works on arms and legs only, and it does not work on the carotid artery <!-- source: Assets/Content/Localization/English/English.xml:748 -->.
2. **Bandage the wound.** Use a [Bandage](#/item/antibleeding1). It needs medical 10 and reduces the limb's bleeding by 18, or more on a successful check <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1319-1333 -->. Bandaging keeps the ordinary bleeding under control while the artery waits for surgery.
3. **Give blood.** A compatible [Blood Pack](#/item/antibloodloss2) takes away 30 blood loss and adds 30 blood pressure <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:99-104 -->. If you do not know the donor type, use the O- pack, which is safe for any patient <!-- source: Assets/Content/Localization/English/English.xml:568 -->.
4. **Pull out the shrapnel.** The [Tweezers](#/item/tweezers) can remove 3 to 10 foreign body through an open gunshot wound. This field use gives a little [Traumatic Shock](#/affliction/traumaticshock) <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1979-2049 -->. Do this early. A foreign body above 20 keeps rolling for new artery cuts, and bleeding above 80 on a limb with a foreign body always cuts one <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2910-2916 -->.
5. **Fix the artery in surgery.** Work through the surgery tools in order: [Scalpel](#/item/advscalpel) (surgery 30), then [Hemostat](#/item/advhemostat) (the incision must reach 99), then [Skin Retractors](#/item/advretractors) (clamped bleeding must reach 99), then [Suture](#/item/suture) <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1854-1911 -->. A suture on the retracted limb closes the arterial cut and removes the tourniquet <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1461-1489 -->.

> [!CAUTION]
> Never put a tourniquet on the head. It sets Oxygen Low to 200 and adds 15 Neurotrauma <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:780-784 -->.

Surgery tools need the patient to have analgesia, or to be unconscious <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1911-1913 -->.

## Walkthrough 2: A crew member fell and broke both legs

A hard fall adds blunt trauma to each limb it hits, and a fall can break a leg. An untreated fracture grows by 2 per second until it reaches 100 <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2534 -->, so speed matters.

1. **Check for an open fracture.** A fall that breaks a leg also has a further chance to cut an artery <!-- source: SharedProject/SharedSource/MP+SP Serverside/FallDamage.cs:292-296 -->. If [Arterial Bleeding](#/affliction/arterialcut) shows on a leg, follow walkthrough 1 for that leg first.
2. **Bandage each broken leg.** The [Gypsum](#/item/gypsum) can only go on an arm or leg that is already bandaged, has no cast and no surgical incision, and only when the patient is not in stasis <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:805-817 -->.
3. **Apply the Gypsum.** It needs medical 40. On success it removes the bandage, makes a [Plaster Cast](#/affliction/plastercast) at 100, and takes 20 off the fracture right away <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:819-825 -->. On failure the Gypsum is used up and you get no cast <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:827-828 -->.
4. **Let the cast do its job.** A cast heals the fracture by 100/300 per second, so a full 100 takes about 300 seconds <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2627 -->. While it is on, it also stops the fracture from growing <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2534 -->. A cast on a leg slows movement to 0.8 of normal speed <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2620-2624 -->.
5. **Do not leave the leg untreated.** An untreated fracture adds internal damage to that limb at 0.1 per second, and a bandage does not stop that on arms or legs <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2545-2550 -->. Casting early is the real protection.
6. **Remove the cast after healing.** Use [Trauma Shears](#/item/traumashears), which need medical 10 <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2384-2402 -->.

> [!NOTE]
> A broken leg stays locked in place unless it has a cast or adrenaline is in the blood <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1976-1990 -->. A locked leg without adrenaline also halves the patient's speed <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:158-164 -->.

## Walkthrough 3: Unconscious and not breathing

Not breathing is [Respiratory Arrest](#/affliction/respiratoryarrest). No new oxygen reaches the blood, so [Hypoxemia](#/affliction/hypoxemia) climbs. Ventilation buys you time while you fix the cause.

1. **Check the heart too.** Run the [Health Scanner](#/item/healthscanner) on the chest. If [Cardiac Arrest](#/affliction/cardiacarrest) shows, go to walkthrough 4 as well. Respiratory arrest adds oxygen low at 15 per second, so the problem gets worse every second you wait <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:25-28 -->.
2. **Ventilate at once.** An [Ambu Bag](#/item/bvm) with an oxygen tank lowers oxygen low by 90 per use, with a 1 second cooldown <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:726 -->. Each use costs the tank 2 condition <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:739-743 -->. A [Surgery Table](#/item/operatingtable) gives everyone within range 200 artificial ventilation of 100 every second <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:1147-1151 -->.
3. **Use an oxygenite tank if you have one.** With an oxygenite tank, the Ambu Bag also takes away 100 respiratory arrest <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:745-750 -->. Without it, the bag only lowers oxygen low.
4. **Remove the causes.** Respiratory arrest only wears off when none of these is too high: opiate overdose above 60, traumatic shock above 30, hypoxemia above 70, neurotrauma above 100, or lung damage above 99 <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:117-149 -->. It wears off faster, at 50 per second instead of 5, once the patient is no longer unconscious <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:117-149 -->.
5. **Keep hypoxemia under 80.** Above 80 the patient is unconscious and gets a 1% chance per update of cardiac arrest <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3512-3519 -->. That is why ventilating is never optional.

## Walkthrough 4: Cardiac arrest

The heart has stopped, so no blood pressure builds and no oxygen moves. Act immediately.

1. **Start CPR.** Each successful CPR gives a short buff <!-- source: SharedProject/SharedSource/MP+SP Serverside/Cpr.cs:30-32 --> that takes 2 off cardiac arrest per second. It lasts about 4 seconds <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1136-1163 -->.
2. **Shock with the right defibrillator.** Both need a charged battery and have a 5 second cooldown <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:934-937; SharedProject/SharedSource/NT Components/NTItemsData.cs:986-989 -->. Use the table to choose.

| | AED | Manual Defibrillator |
|---|---|---|
| Use for cardiac arrest when medical is | below 80 <!-- source: Assets/Content/Localization/English/English.xml:778 --> | above 80 <!-- source: Assets/Content/Localization/English/English.xml:782 --> |
| Chance to clear cardiac arrest | 20% at medical 40 or below, up to 40% at medical 80 or above <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1021 --> | (medical / 100) to the fourth power, per shock <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:958-959 --> |
| Battery per shock | 20, or 10 with a fulgurium cell <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1010-1017 --> | 20, or 10 with a fulgurium cell <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:939-954 --> |

The AED only fires when there is something to shock: cardiac arrest above 0, fibrillation above 1, or increased heartrate above 5. Otherwise it stays silent and uses no battery <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:997-1006 -->. Once it fires, it always clears fibrillation and increased heartrate <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1025-1034 -->.

3. **Put on an [AutoPulse](#/item/autocpr) if you have one.** It cannot be used on a patient in water <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1038-1083 -->. While it works, it takes 1.5 off cardiac arrest per second <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1173-1201 -->. It needs no skill check.
4. **Consider [Adrenaline](#/item/adrenaline) with care.** It takes 100 off cardiac arrest, but it also adds 20 fibrillation <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1373-1386 -->. That is why a shock should follow it.
5. **Remove what keeps the heart stopped.** Cardiac arrest is held in place only while one of these is true: hypoxemia above 80, coma above 40, fibrillation above 20, traumatic shock above 40, heart damage above 99, a removed heart or brain, or stasis <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:556-567 -->. Ventilate and treat the blood loss, and check the readout after each step.

> [!NOTE]
> The in-game text says the heart must be restarted with a defibrillator, adrenaline or AutoPulse <!-- source: Assets/Content/Localization/English/English.xml:242 -->. Reading the code, arrest can also clear by itself when none of the conditions in step 5 holds <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:556-567 -->, and the text does not mention this. Keep checking the scanner until the arrest is gone.

## Walkthrough 5: Massive blood loss after a monster attack

Monsters open many wounds at once. Your number to watch is blood amount, which is 100 minus blood loss <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:42-45 -->.

1. **Find the sources.** Arterial bleeding on a limb gets the tourniquet from walkthrough 1. Plain bleeding gets a bandage. A bite to the torso causes internal bleeding <!-- source: SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:400-403 -->.
2. **Stop internal bleeding.** A [Gel Coolant Pack](#/item/gelipack) on the torso takes 0.2 off internal bleeding per second while the patient is chilled <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2810-2814 -->. Internal bleeding adds blood loss at its strength divided by 40 per second, so it is worth stopping early <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2251 -->.
3. **Replace blood with the right type.** A compatible pack takes away 30 blood loss. An incompatible pack takes away only 20 and adds shock, typically about 94 <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:99-113 -->. That shock leads to [Hemotransfusion Shock](#/affliction/hemotransfusionshock), which fades by 0.5 per second <!-- source: Assets/Content/XML/Afflictions/Blood.xml:95 -->.

> [!TIP]
> A [Hematology Analyzer](#/item/bloodanalyzer) scan costs 1 blood loss if its medical 30 check succeeds, and 3 if it fails <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:281-285 -->. Do it only if you need the donor type. Otherwise give the O- pack.

4. **Use [Deusizine](#/item/deusizine) if you have medical 72.** For 20 seconds it takes 2.5 blood loss off per second, about 50 in total. On failure, half that <!-- source: Assets/Content/XML/Items/Override.xml:1139-1163 -->.
5. **Do not expect saline to replace blood.** [Saline](#/item/antibloodloss1) (medical 10) raises blood pressure by up to 30, and it does not reduce blood loss <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3350 --> <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1931-1956 -->. The dose is 50 on a successful check and 30 on failure, given over 10 seconds <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1305-1312 -->.
6. **Watch oxygen as blood drops.** Blood amount below 60 adds hypoxemia <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3459 -->. Blood pressure below 70 adds hypoxemia as well <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3458 -->. Ventilate if breathing slows.

## Walkthrough 6: Opiate overdose

Opiates ease pain but also slow breathing. An overdose above 60 stops it. Ventilate first, then reverse the drug.

1. **Confirm with the [Hematology Analyzer](#/item/bloodanalyzer).** It shows opioids in the blood <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:256-274 -->.
2. **Ventilate.** Above 60, the overdose adds respiratory arrest of 200 every update and makes the patient unconscious <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:231-259 -->. Use the Ambu Bag or a surgery table, as in walkthrough 3.
3. **Give [Naloxone](#/item/antinarc).** It needs medical 39. On success, for 30 seconds, it takes 2 off overdose, withdrawal, addiction, analgesia and opioids each second, about 60 off overdose in total <!-- source: Assets/Content/XML/Items/Override.xml:805-823 -->. On failure each drops by 1 per second, and there is a 50% chance of a short coma <!-- source: Assets/Content/XML/Items/Override.xml:805-823 --> <!-- source: Assets/Content/Localization/English/English.xml:996 -->.
4. **Do not add more opioids.** A [Morphine](#/item/antidama1) success adds 1 overdose per second for 20 seconds <!-- source: Assets/Content/XML/Items/Override.xml:638-667 -->. [Fentanyl](#/item/antidama2) adds 5 overdose per second for 5 seconds on success, and requires medical 72 <!-- source: Assets/Content/XML/Items/Override.xml:722-755 -->.
5. **Expect a slow fall.** Overdose drops 0.4 per second below 50, and only 0.1 per second from 50 to 100 <!-- source: Assets/Content/XML/Afflictions/Overrides.xml:718-750 -->. Keep ventilating while it is above 60, and watch for a seizure, which has a chance of strength ÷ 500 per update <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:251 -->.

## Quick check

1. A limb has arterial bleeding. Which item do you apply first, and why is a bandage not enough?

<details>
<summary>Answer</summary>

Apply a Tourniquet to the limb first. Arterial bleeding adds 1.5 blood loss per second and does not heal alone, and the tourniquet is what stops the blood loss from that limb. Bandages treat ordinary bleeding, so they cannot replace it.

</details>

2. You are a medic with medical 85 and someone is in cardiac arrest. Which defibrillator do you use, and why?

<details>
<summary>Answer</summary>

Use the Manual Defibrillator. The in-game text says to use the AED for cardiac arrest below 80 and the manual defibrillator above 80.

</details>

3. Why do you ventilate before you give Naloxone to someone with an overdose of 70?

<details>
<summary>Answer</summary>

Above 60, an opiate overdose adds respiratory arrest every update and makes the patient unconscious. Naloxone takes away only 2 overdose per second over 30 seconds, so the patient needs oxygen while it works.

</details>
