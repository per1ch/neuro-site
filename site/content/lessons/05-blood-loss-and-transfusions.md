---
title: "Blood Loss and Transfusions"
summary: "Blood loss, blood pressure, fluids, blood types, and how to give or draw blood safely."
description: "Blood loss, blood pressure, fluids, blood types, and how to give or draw blood safely."
order: 5
section: mechanics
level: beginner
difficulty: beginner
readingTime: 5
---

A patient can look fine on the surface and still be running out of blood. Blood loss is slow, quiet, and deadly, so knowing its thresholds tells you when to act.

## In short

- Blood amount is 100 minus [Blood Loss](#/affliction/bloodloss). Fix the cause of the bleeding first. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:44 -->
- [Blood Pressure](#/affliction/bloodpressure) follows blood amount. Low pressure usually comes from blood loss.
- [Saline](#/item/antibloodloss1) and [Ringer's Solution](#/item/ringerssolution) raise blood pressure. They do not reduce blood loss.
- [Blood Pack O-](#/item/antibloodloss2) can go into any patient. When you can, match the blood type.
- An incompatible transfusion causes [Hemotransfusion Shock](#/affliction/hemotransfusionshock), a harmful reaction that lasts minutes.
- Drawing blood adds blood loss to the donor. Only draw from a healthy patient.

## Blood loss and blood amount

[Blood Loss](#/affliction/bloodloss) is the blood your patient has lost. Their blood amount is 100 minus blood loss, so a patient with 40 blood loss has 60 blood left. Blood loss can climb as high as 200, but blood amount stops at 0 once blood loss reaches 100. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:42-45; Assets/Content/XML/Afflictions/Overrides.xml:35 -->

The body recovers on its own, but very slowly: about 0.1 blood loss per second. <!-- source: Assets/Content/XML/Afflictions/Overrides.xml:38-44 --> That is far too slow for a serious bleed, so stop the source first.

Blood amount is what matters for the next thresholds:

| Blood amount | What happens | Source |
| --- | --- | --- |
| Below 60 (blood loss above 40) | The heart rate rises. Low oxygen starts to build at (60 minus blood amount) divided by 4 per second. At blood loss 60, that is 5 per second. | <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:463-470; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3459 --> |
| Below 50 | The body's own recovery from low oxygen slows as blood amount falls, and stops at 0. | <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3450 --> |
| Low oxygen above 80 | The patient falls unconscious, and each update has a 1% chance of cardiac arrest. | <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3512-3519 --> |

> [!NOTE]
> Low oxygen is covered in the heart, lungs, and brain lesson. For now, remember that blood loss is what drives it.

## Blood pressure

[Blood Pressure](#/affliction/bloodpressure) starts at 100 and can range from 5 to 200. It is a target that follows blood amount: at blood loss 30, blood amount is 70 and the pressure aims for 70. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3334-3336; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3344-3359; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3369 -->

Pressure moves toward that target gradually. When it falls, it closes 20% of the gap each update. When it rises, it closes about 6.7% of the gap each update. Updates happen about every 2 seconds, so a drop is fast and recovery is slow. Server config settings can also scale these speeds, and the default is 1. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3361-3369; SharedProject/SharedSource/MP+SP Serverside/HumanUpdate.cs:8; SharedProject/SharedSource/Config/ConfigData.cs:1339-1345 -->

Low pressure causes these symptoms:

| Blood pressure | Symptom | Source |
| --- | --- | --- |
| Below 60 | Lightheadedness and headache, if the patient is conscious | <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3376-3382 --> |
| Below 55 | Blurred vision | <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3385-3390 --> |
| Below 50 | Pale skin | <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3393-3395 --> |
| Below 30 | Confusion | <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3398-3403 --> |

## Saline and Ringer's Solution

[Saline](#/item/antibloodloss1) raises the blood pressure target by up to 30. A medic with Medical 10 or higher adds 50 saline; otherwise it adds 30. It is delivered over 10 seconds. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1305-1312; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3350-3351 --> [Ringer's Solution](#/item/ringerssolution) works the same way, but needs Medical 20 for the 50 dose. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:832-839 -->

Both fade by 0.25 per second. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1931-1935 --> Saline adds acidosis at 0.1 per second and Ringer's adds alkalosis at 0.1 per second. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1935; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1956 -->

> [!NOTE]
> Saline and Ringer's do not reduce blood loss. They only hold up blood pressure while you fix the bleeding. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1305-1316; SharedProject/SharedSource/NT Components/NTItemsData.cs:832-843; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3350-3351 -->

## Blood types and compatibility

Every patient has one of eight blood types. For a new character, the most common are O+ (37 in 100) and A+ (36 in 100), and the rarest is AB- (1 in 100). <!-- source: SharedProject/SharedSource/NT Components/Blood.cs:7-14; SharedProject/SharedSource/NT Components/Blood.cs:35-46 -->

Blood packs are compatible with specific types. Use this table to choose:

| Pack | Safe for patients with | Source |
| --- | --- | --- |
| [Blood Pack O-](#/item/antibloodloss2) | Any type | <!-- source: Assets/Content/Localization/English/English.xml:568 --> |
| [Blood Pack O+](#/item/bloodpacko_positive) | O+, A+, B+, AB+ | <!-- source: Assets/Content/Localization/English/English.xml:563 --> |
| [Blood Pack A-](#/item/bloodpacka_negative) | A-, A+, AB-, AB+ | <!-- source: Assets/Content/Localization/English/English.xml:575 --> |
| [Blood Pack A+](#/item/bloodpacka_positive) | A+, AB+ | <!-- source: Assets/Content/Localization/English/English.xml:571 --> |
| [Blood Pack B-](#/item/bloodpackb_negative) | B-, B+, AB-, AB+ | <!-- source: Assets/Content/Localization/English/English.xml:583 --> |
| [Blood Pack B+](#/item/bloodpackb_positive) | B+, AB+ | <!-- source: Assets/Content/Localization/English/English.xml:579 --> |
| [Blood Pack AB-](#/item/bloodpackab_negative) | AB-, AB+ | <!-- source: Assets/Content/Localization/English/English.xml:591 --> |
| [Blood Pack AB+](#/item/bloodpackab_positive) | AB+ only | <!-- source: Assets/Content/Localization/English/English.xml:587 --> |

If you do not know the patient's type, check it with the [Hematology Analyzer](#/item/bloodanalyzer). Each use costs 1 blood loss with Medical 30 or higher, or 3 without. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:281-285 -->

> [!WARNING]
> The code and the in-game text disagree for O- and B- patients. The code treats an A- pack as safe for O- and B- patients, and an AB- pack as safe for B- patients. The pack descriptions do not list them, so follow the table, and check the type with the analyzer when it matters. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:74-92; SharedProject/SharedSource/NT Components/Blood.cs:10-13 -->

## Giving a blood pack

Transfusion has no skill check. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:74-145 --> Use the steps below:

1. Check the patient's blood type with the Hematology Analyzer, or use O- if you cannot check.
2. Pick a pack that matches the type from the table.
3. Use the pack on the patient.
4. Keep the empty pack. You get an [Empty Blood Pack](#/item/emptybloodpack) back. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:143 -->

A compatible pack removes 30 blood loss and adds 30 blood pressure. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:99-104 --> An incompatible pack removes only 20 blood loss, still adds 30 blood pressure, and adds hemotransfusion shock. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:105-113 -->

## Hemotransfusion Shock

An incompatible pack gives about 94 shock, because the shock equals the patient's immunity minus 6, and immunity starts at 100. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:105-113; SharedProject/SharedSource/NT Components/Blood.cs:118-121 --> Shock falls by 0.5 per second, so it takes about three minutes to reach zero. <!-- source: Assets/Content/XML/Afflictions/Blood.xml:95 -->

While shock is between 15 and 70, every 1 to 3 seconds the patient gets 1 extra blood loss and 0.25 extra organ, liver, kidney, heart and lung damage. Below 15, the damage is 0.5 per type. <!-- source: Assets/Content/XML/Afflictions/Blood.xml:97-117 -->

Symptoms begin as shock falls: wheezing below 90, abdominal pain below 80, shortness of breath below 70, chest pain below 60, and vomiting below 40. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3652-3690 -->

The cure is [Streptokinase](#/item/streptokinase), which removes 100 shock. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:886-890 --> It also stops clotting while it lasts, so bleeding will not heal by itself. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:38 -->

> [!NOTE]
> In the code, the damage and symptoms only start when shock is low. That may be intended, but it has not been verified. Plan for a reaction that lasts about three minutes.

## Drawing blood

An [Empty Blood Pack](#/item/emptybloodpack) draws blood from a patient. It is refused if the donor's blood loss is 31 or higher. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:438-444 --> It adds 30 blood loss with Medical 30 or higher, or 40 without. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:446-458 --> The pack takes on the donor's type. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:460-478 -->

> [!CAUTION]
> The game says a failed draw can take a potentially lethal amount of blood. Only draw a single pack from a patient who is healthy. <!-- source: Assets/Content/Localization/English/English.xml:560 -->

## Quick check

1. A patient has 45 blood loss. What is their blood amount, and what happens next?
<details><summary>Answer</summary>Their blood amount is 55. That is below 60, so the heart rate rises and low oxygen starts to build.<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:463-470; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3459 --></details>

2. You cannot check a patient's blood type. Which pack do you use?
<details><summary>Answer</summary>[Blood Pack O-](#/item/antibloodloss2). The game says it can be used on any patient.<!-- source: Assets/Content/Localization/English/English.xml:568 --></details>

3. Does giving saline reduce blood loss?
<details><summary>Answer</summary>No. Saline and Ringer's raise the blood pressure target only. Stop the bleeding to reduce blood loss.<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1931-1956 --></details>
