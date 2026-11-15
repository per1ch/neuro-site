---
title: "Pain, Shock and Drugs"
summary: "How pain, traumatic shock, anesthesia and opiates work in Neurotrauma, and what each medicine is for."
description: "How pain, traumatic shock, anesthesia and opiates work in Neurotrauma, and what each medicine is for."
order: 8
section: mechanics
level: intermediate
difficulty: intermediate
readingTime: 7
---

A painkiller can keep a patient still enough to treat, and the same painkiller can slow their breathing until it stops. Surgery can save a limb and also send the patient into shock. Knowing what each of these does to the body is what keeps your patient alive.

## In short

- Pain is reduced by [Analgesia](#/affliction/analgesia). At high levels it removes pain completely.
- Cutting into an awake patient causes [Traumatic Shock](#/affliction/traumaticshock), which can stop the heart or the breathing.
- [Anesthesia](#/affliction/anesthesia) puts the patient under and makes surgery safe.
- Opioids relieve pain but slow breathing. An overdose can stop it.
- Medicines with a skill requirement can fail, so check your skill before you dose.

## How the numbers work

Most medicine checks use one rule: the chance of success is your medical skill divided by the skill required, capped at 100%. At half the skill you have a 50% chance.
<!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:965-975 -->

> [!NOTE]
> Many effects are checked once per update, not once per second. By default an update runs every 2 seconds, so a 5% chance per update is a 5% chance every 2 seconds.
<!-- source: SharedProject/SharedSource/Config/ConfigData.cs:1339-1345 -->
<!-- source: SharedProject/SharedSource/MP+SP Serverside/HumanUpdate.cs:128-129 -->

## Pain and analgesia

Pain fades slowly on its own. Every 3 to 6 seconds it briefly halves your movement speed for one second. <!-- source: Assets/Content/XML/Afflictions/Functionality.xml:942-945 -->

Analgesia is the painkiller effect. It fades by itself, and its strength decides how much pain it removes:

| Analgesia | What it does |
|---|---|
| 0 to 5 | Removes a little pain, and gives up to 2.5% damage resistance. <!-- source: Assets/Content/XML/Afflictions/Functionality.xml:1031-1093 --> |
| 5 to 20 | Removes more pain, and gives 2.5% to 25% damage resistance. <!-- source: Assets/Content/XML/Afflictions/Functionality.xml:1031-1093 --> |
| 20 and up | Removes all pain, and gives 25% damage and stun resistance. <!-- source: Assets/Content/XML/Afflictions/Functionality.xml:1076-1091 --> |

Analgesia at 20 or above is the level where a patient feels no pain at all. Surgery is easier at that level too.

## Traumatic shock

Traumatic shock is caused by surgery on a patient who is awake and not in safe surgery conditions. Each surgery step adds shock every second while it lasts:

| Surgery step | Shock added per second |
|---|---|
| Incision, when analgesia and anesthesia are both 0.5 or less and the patient is awake | 2 <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:26-29 --> |
| Drilled bones | 1.5 <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:80-83 --> |
| Retracted skin | 2 <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:106-109 --> |
| Sawed bones | 1.5 <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:171-174 --> |

Shock causes its own problems as it rises:

- Above 5 while the patient is awake, shock adds shock pain and psychosis. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2138-2180 -->
- Above 30, each update has a 20% chance of respiratory arrest. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2138-2180 -->
- Above 40, each update has a 10% chance of cardiac arrest. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2138-2180 -->
- At 50, the blood pressure target drops to zero. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3356 -->

Shock fades by 0.5 per second. It fades much faster, at 2.0 per second, when the patient is sedated and the surgery is safe, or when anesthesia is above 15. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2149-2155 --> A patient counts as sedated if they have any analgesia, anesthesia above 10, are drunk above 20, or are in stasis. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:52-58 -->

> [!WARNING]
> Do not wait for shock to fade. Prevent it. Before you cut, make sure anesthesia is above 15, or the patient is sedated and on a surgery table or hospital bed, or the patient is unconscious.
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2149-2155; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1478-1490; Assets/Content/XML/Afflictions/Surgical.xml:81 -->

## Anesthesia and unconsciousness

Anesthesia rises by itself, and its level tells you what state the patient is in:

1. From 0 to 15, it keeps analgesia at 5 or more.
2. From 15 to 99, it gives safe surgery and removes all pain.
3. At 99, it removes itself, and the patient wakes up.

<!-- source: Assets/Content/XML/Afflictions/Functionality.xml:1099-1137 -->

Anesthesia has a price. Each update there is a 6% chance of one random side effect: vomiting blood, blurred vision, confusion, fever, a seizure, an irregular heartbeat (fibrillation) of 5 to 35, or psychosis. It also halves movement speed and lowers the blood pressure target by up to 15. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1653-1697 --> <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:81 --> <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3348 -->

While the unconsciousness symptom is active, or anesthesia is above 15, or the patient has a spinal cord injury, the stun is kept at 5 or more. The patient stays down until that ends. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2338-2346 -->

## Opiates and overdose

[Opioids](#/affliction/afopioid) fade by themselves. Once they are above 1, they cause hypoventilation (breathing too slowly), which pushes the blood toward acidosis. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1436-1449 -->

An opiate overdose gets worse in steps:

| Overdose level | What happens |
|---|---|
| Above 30 | Hypoventilation, so breathing slows. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:231-259 --> |
| Above 50 | Movement drops to half speed. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:82 --> |
| Above 60 | Respiratory arrest on every update, unconsciousness, and a seizure chance on every update. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:242-255 --> |

The overdose wears off at 0.4 per second below 50, but only at 0.1 per second from 50 to 100. Once it is high, it lingers. <!-- source: Assets/Content/XML/Afflictions/Overrides.xml:718-750 -->

> [!CAUTION]
> At an overdose above 60 the patient stops breathing on every update. Give [Naloxone](#/item/antinarc) and ventilate them at the same time.
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:242-255 -->

## Medicine table

Skill numbers are the medical skill required. Rates are per second, as the mod's files give them.

| Medicine | Skill | What it does | Watch out for |
|---|---|---|---|
| [Morphine](#/item/antidama1) | 50 | Analgesia and opioids 2.8 per second for 20 seconds. Failure gives less. <!-- source: Assets/Content/XML/Items/Override.xml:638-667 --> | Adds addiction and overdose. <!-- source: Assets/Content/XML/Items/Override.xml:638-667 --> |
| [Fentanyl](#/item/antidama2) | 72 | Strong: analgesia and opioids 15 per second for 5 seconds. <!-- source: Assets/Content/XML/Items/Override.xml:722-755 --> | Overdose 5 per second, and 8 on failure. Use with care. <!-- source: Assets/Content/XML/Items/Override.xml:722-755 --> |
| [Opium](#/item/opium) | 40 | Gentle: analgesia and opioids 1.1 per second for 25 seconds. <!-- source: Assets/Content/XML/Items/Override.xml:562-592 --> | Still adds overdose, more on failure. <!-- source: Assets/Content/XML/Items/Override.xml:562-592 --> |
| [Naloxone](#/item/antinarc) | 39 | Reduces overdose, withdrawal, addiction, analgesia and opioids by 2 per second for 30 seconds. <!-- source: Assets/Content/XML/Items/Override.xml:805-823 --> | On failure, half the effect and a 50% chance of a coma. <!-- source: Assets/Content/XML/Items/Override.xml:805-823 --> |
| [Propofol](#/item/propofol) | None | Puts the patient under anesthesia, which climbs until it removes itself at 99. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:903-924 --> | Causes hypoventilation, and so acidosis, unless the patient is on artificial ventilation. Random side effects. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1460-1472 --> <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3585-3588 --> |
| [Anaparalyzant](#/item/antiparalysis) | 64 | Ends anesthesia, and gives paralysis resistance. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1390-1409 --> | On failure, adds 45 psychosis over 60 seconds. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1390-1409 --> |
| [Adrenaline](#/item/adrenaline) | None | Raises blood pressure and slows fibrillation. Stops a cardiac arrest. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1373-1386 --> <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3349 --> <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:484-487 --> | When it stops a cardiac arrest, it adds 20 fibrillation, so the heart may still need a shock. Causes hyperventilation while strong. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1373-1386 --> <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1893-1906 --> |
| [Ringer's Solution](#/item/ringerssolution) | 20 | Raises blood pressure by up to 30. Failure gives less. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:832-843 --> <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3351 --> | Adds alkalosis while it lasts. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1946-1956 --> |
| [Haloperidol](#/item/antipsychosis) | 37 | Removes psychosis, hallucinations and alcohol withdrawal. Failure removes less. <!-- source: Assets/Content/XML/Items/Override.xml:1509-1517 --> | No side effects listed. |
| [Methamphetamine](#/item/meth) | 35 | Reduces stun, and adds psychosis, organ damage and neurotrauma each second for 30 seconds. <!-- source: Assets/Content/XML/Items/Override.xml:1283-1303 --> | Failure doubles the organ and neurotrauma damage. Do not use. <!-- source: Assets/Content/XML/Items/Override.xml:1283-1303 --> |

> [!NOTE]
> The mod's files give these as per-second amounts. The game's own rule for applying status effects over time was not checked here, so treat the totals over a duration as approximate.
<!-- source: Assets/Content/XML/Items/Override.xml:638-667 -->


## Quick check

1. You need to cut into an awake patient. What must be true before you start, to avoid traumatic shock?

<details><summary>Answer</summary>Anesthesia must be above 15, or the patient must be sedated and on a surgery table or hospital bed, or the patient must be unconscious.</details>

2. An opiate overdose is at 65. What do you give, and what else do you do?

<details><summary>Answer</summary>Give Naloxone, and ventilate the patient at the same time. At this level the patient stops breathing on every update.</details>

3. You have just stopped a cardiac arrest with Adrenaline. Why should you keep an eye on the heart?

<details><summary>Answer</summary>Adrenaline adds 20 fibrillation when it stops a cardiac arrest, so the heart may still need a shock.</details>
