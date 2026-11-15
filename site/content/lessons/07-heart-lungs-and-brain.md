---
title: "Heart, Lungs and Brain"
summary: "How the oxygen chain breaks, and how to restart a heart or keep a patient breathing."
description: "How the oxygen chain breaks, and how to restart a heart or keep a patient breathing."
order: 7
section: mechanics
level: intermediate
difficulty: intermediate
readingTime: 8
---

Most patients in Neurotrauma die because the oxygen chain breaks: the heart stops pumping, the lungs stop loading air, or the brain is damaged past recovery. Learn how each link fails and you will know which tool to reach for first.

## In short

- Low oxygen in the blood, called [Hypoxemia](#/affliction/hypoxemia), is the first thing to check. <!-- source: Assets/Content/Localization/English/English.xml:76 -->
- No heartbeat means no oxygen moves at all. Treat [Cardiac Arrest](#/affliction/cardiacarrest) with a defibrillator, an [AED](#/item/aed) or an [AutoPulse](#/item/autocpr). CPR only buys you time.
- [Respiratory Arrest](#/affliction/respiratoryarrest) means the patient is not breathing. Remove the cause, then ventilate with an [Ambu Bag](#/item/bvm) and oxygen.
- Brain damage ([Neurotrauma](#/affliction/neurotrauma)) heals very slowly and becomes lethal near its maximum. Stop its sources early.
- [Irregular Heartbeat](#/affliction/fibrillation) is the warning before arrest. Fix the things driving it: low blood pressure, hypoxemia and acidosis.

## The oxygen chain

Your patient needs three things to work together. The lungs take in air, the blood carries oxygen, and the heart pushes that blood round the body. Break one link and the others cannot save the patient.

The oxygen in the blood is set to **zero** when [Cardiac Arrest](#/affliction/cardiacarrest) is above 1, when lung damage reaches 100, or when the lungs are removed. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:65-73 --> No amount of other treatment fixes that until the broken link is repaired.

Hypoxemia rises when the available oxygen is below 50, and also when blood pressure is below 70 or blood volume is below 60. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3441-3463 --> These checks run once per update, about every 2 seconds by default. <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:1339-1345; SharedProject/SharedSource/MP+SP Serverside/HumanUpdate.cs:128-129 -->

| Hypoxemia strength | What happens |
|---|---|
| Above 10 | Fast breathing ([Hyperventilation](#/affliction/hyperventilation)) <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3465-3524 --> |
| Above 20 | Shortness of breath <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3465-3524 --> |
| Above 50 | Confusion <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3465-3524 --> |
| Above 70 | 5% chance per update of [Respiratory Arrest](#/affliction/respiratoryarrest) <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3465-3524 --> |
| Above 80 | Unconsciousness, plus 1% chance per update of [Cardiac Arrest](#/affliction/cardiacarrest) <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3465-3524 --> |

> [!TIP]
> Hypoxemia is the number to watch. It feeds brain damage, heart rhythm problems and breathing failure, so a falling oxygen level is a sign to act now.

## Heart

A heart problem usually starts as [Increased Heartrate](#/affliction/increasedheartrate). It fills to 100 and then becomes [Irregular Heartbeat](#/affliction/fibrillation). <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:446-514 --> Fibrillation is the warning sign. Once it is above 20, each update gives a chance of cardiac arrest. At fibrillation 50 that chance is 6.25% per update, and at 100 it is certain. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:537-540 -->

[Cardiac Arrest](#/affliction/cardiacarrest) adds acidosis and can push the patient into a coma. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:572-580 --> The arrest is kept going only while at least one of these is true: fibrillation above 20, hypoxemia above 80, coma above 40, traumatic shock above 40, heart damage above 99, or the heart or brain removed. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:556-567 -->

> [!NOTE]
> The code can clear cardiac arrest on its own when none of those conditions holds. The in-game description says the heart must be restarted with a defibrillator, adrenaline or an AutoPulse. The code and the in-game text disagree here, so do not count on an arrest going away by itself. <!-- source: Assets/Content/Localization/English/English.xml:241 -->

[Heart Attack](#/affliction/heartattack) is a clot in the heart. It grows by 1 per second and damages the heart by up to 0.5 per second until treated. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:647-672 -->

[Heart Damage](#/affliction/heartdamage) is the other long-term problem. Above 50 it causes coughing, and above 80 leg swelling and shortness of breath. Above 99 it gives a 30% chance per update of cardiac arrest, and it stops healing. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:682-724; SharedProject/SharedSource/Libraries/HelperFunctions.cs:2002-2005 -->

## Lungs

[Respiratory Arrest](#/affliction/respiratoryarrest) means no breathing: while it lasts, Oxygen Low rises by 15 per second. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:21-28 --> It fades by 5 per second, or by 50 per second if the patient is conscious. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:117-149 --> Lung damage above 99 gives an 80% chance per update of respiratory arrest. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:269-303 -->

[Pneumothorax](#/affliction/pneumothorax) is a collapsed lung. It grows by 0.5 per second up to 100. A needle slows it, but only above 15. Above 40 it causes shortness of breath. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:940-968 -->

You can give breaths in two ways:

| Method | Effect on oxygen low | Notes |
|---|---|---|
| Surgery table or hospital bed | -100 per second <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1507 --> | Works while the patient lies in range. |
| [Ambu Bag](#/item/bvm) with no tank | -10 per use <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:729-736 --> | Needs a tank to do anything more. |
| [Ambu Bag](#/item/bvm) with an oxygen tank | -90 per use <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:739-743 --> | The tank loses 2 condition per use. |
| [Ambu Bag](#/item/bvm) with an oxygenite tank | -90 per use, and respiratory arrest -100 <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:745-750 --> | The only way to clear respiratory arrest with a bag. |

> [!WARNING]
> A welding fuel tank in the Ambu Bag does the opposite. It raises oxygen low by 110 and adds 10 lung damage. Never use one on a patient. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:777-804 -->

## Brain

[Neurotrauma](#/affliction/neurotrauma) has a maximum of 200. At normal healing it recovers by 0.25 per second, but it does not recover at all while the skull is fractured. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1752-1785 --> Above 100 the patient is unconscious, and each update has a 5% chance of respiratory arrest. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1752-1785 --> Near 200 the damage kills, so do not treat it as a background problem. <!-- source: Assets/Content/XML/Afflictions/Brain.xml:22-59 -->

[Stroke](#/affliction/stroke) is a clot in the brain. High blood pressure above 150 can cause it. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3418-3421 --> Above 1 it causes headache, and each update carries a 5% chance of [Coma](#/affliction/coma) and a 5% chance of [Seizure](#/affliction/seizure). <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1710-1741 -->

> [!CAUTION]
> Do not give Streptokinase to a patient who already has a stroke. It adds stroke +5 and neurotrauma +10. Keep blood pressure at or below 150 and wait instead. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:892-896 -->

A [Coma](#/affliction/coma) fades by 0.5 per second in good conditions, and by 0.2 per second otherwise. Above 15 the patient is unconscious, and above 40 each update has a 3% chance of cardiac arrest. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1826-1860 -->

## Liver, kidneys, sepsis and acidosis

Damaged organs make the problem worse. [Liver Damage](#/affliction/liverdamage) at 99 or more gives a 5% chance per update of vomiting blood and internal bleeding. [Kidney Damage](#/affliction/kidneydamage) above 80 adds acidosis. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:844-904; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:764-817 --> Thiamine heals organs about five times faster. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:17-20 -->

[Sepsis](#/affliction/sepsis) is a blood infection. Once above 0.1 it grows by 0.05 per second, and it adds brain damage. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3705-3757 --> Broad-spectrum antibiotics reduce it by 1 per second while they last. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2103-2106 -->

[Acidosis](#/affliction/acidosis) fades by 0.03 per second. Above 60 it gives a chance of coma. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3579-3634 --> Cardiac arrest adds 0.18 per second, and respiratory arrest adds the same unless artificial ventilation is running. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:572-574; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:139-144 --> [Ringer's Solution](#/item/ringerssolution) adds alkalosis, which cancels acidosis one for one. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1940-1956; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3546-3551 -->

## CPR, defibrillators and AutoPulse

Each tool does a different job. Compare them before you pick one.

| Tool | What it does | Notes |
|---|---|---|
| CPR (by hand) | Each success cuts cardiac arrest by 2 per second and fibrillation by 1 per second, for about 4 seconds. <!-- source: SharedProject/SharedSource/MP+SP Serverside/Cpr.cs:30-33; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1136-1163 --> | Failure can crack ribs, and the chance is lower with more medical skill. <!-- source: SharedProject/SharedSource/MP+SP Serverside/Cpr.cs:41-70 --> |
| [Manual Defibrillator](#/item/defibrillator) | Clears fibrillation with a chance of (skill / 100) squared, and cardiac arrest with a chance of (skill / 100) to the fourth. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:956-976 --> | Fires without a rhythm check, as long as the battery has charge. At medical 50 that is 25% and 6.25%. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:928-945; SharedProject/SharedSource/NT Components/NTItemsData.cs:958-959 --> |
| [AED](#/item/aed) | Only fires if there is a rhythm problem, and then always clears fibrillation. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:997-1034 --> | Clears cardiac arrest with a chance of 20% at medical 40 or less, up to 40% at 80 or more. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1021 --> |
| [AutoPulse](#/item/autocpr) | Worn in the outerwear slot. Cuts cardiac arrest by 1.5 per second and fibrillation by 1 per second, and raises blood pressure by 5 per second. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:849-858; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1173-1201 --> | Needs a living patient and a battery. It cannot be used in water. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1040 --> |

The AED uses 20 battery per shock, or 10 with a fulgurium cell, and waits 5 seconds between shocks. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:982-1017 --> The Manual Defibrillator stuns the patient for 2 seconds after it lands. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:956-976 -->

> [!NOTE]
> The defibrillator description says a failed shock causes cardiac arrest, but the code does not do this in this version. The code and the in-game text disagree here. <!-- source: Assets/Content/Localization/English/English.xml:778; SharedProject/SharedSource/NT Components/NTItemsData.cs:960-976 -->

Most chances and speeds in this lesson are multiplied by server settings. The default is 1, and the host can change fibrillation speed, stroke chance, heart attack chance and neurotrauma gain. <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:123; SharedProject/SharedSource/Config/ConfigData.cs:57; SharedProject/SharedSource/Config/ConfigData.cs:68; SharedProject/SharedSource/Config/ConfigData.cs:145 -->

## Quick check

1. What happens to the oxygen in the blood when cardiac arrest goes above 1?
<details><summary>Answer</summary>It is set to zero, so nothing else fixes the chain until the heart is restarted or the arrest clears. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:65-73 --></details>

2. A patient has fibrillation at 50. What is the chance of cardiac arrest on each update?
<details><summary>Answer</summary>6.25% per update. At fibrillation 100 it is certain. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:537-540 --></details>

3. Why should you avoid a Streptokinase shot on a stroke patient?
<details><summary>Answer</summary>It adds stroke +5 and neurotrauma +10, which makes the brain damage worse. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:892-896 --></details>
