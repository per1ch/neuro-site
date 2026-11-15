---
title: "Reading Your Patient"
summary: "Use the Health Scanner and Hematology Analyzer to read symptoms, then check the patient in a fixed order."
description: "Use the Health Scanner and Hematology Analyzer to read symptoms, then check the patient in a fixed order."
order: 2
section: getting-started
level: beginner
difficulty: beginner
readingTime: 6
---

Before you bandage anything, you need to know what is wrong. A patient can look fine and still be bleeding inside or not breathing, so a quick, correct read saves rounds.

## In short

- The [Health Scanner](#/item/healthscanner) shows the afflictions on one limb. Keep it charged.
- Only the [Hematology Analyzer](#/item/bloodanalyzer) shows blood type, immunity, sepsis, acidosis and alkalosis. <!-- source: Assets/Content/Localization/English/English.xml:552 -->
- Symptoms are hints. Group them by what they point to, then find the cause.
- Check the vital afflictions first, then breathing, then blood, then everything else.

## Health Scanner

The Health Scanner is battery-powered. Use it from the Health menu to see the afflictions on one body part. Each scan drains the battery by 5 condition, and the scanner does nothing without a battery that still has condition above 0. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1107-1116; SharedProject/SharedSource/NT Components/NTItemsData.cs:1154; Assets/Content/XML/Items/Override.xml:60 -->

Every scan also adds a small dose of Radiation Sickness to both the patient and you: 1 to the patient and 0.6 to the user, scaled by max vitality. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1156-1157 -->

The readout arrives as a chat message about 2 seconds after the scan. It starts with "Affliction readout for" the patient and the limb you chose, then one line per affliction in the form `Name: X%`. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1263-1277; SharedProject/SharedSource/NT Components/NTItemsData.cs:1160-1172; SharedProject/SharedSource/NT Components/NTItemsData.cs:1205 -->

It only lists afflictions on the limb you selected. Whole-body problems such as neurotrauma appear on their indicator limb, which is the Head. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1180-1197; Assets/Content/XML/Afflictions/Brain.xml:31 -->

If nothing is listed, the scanner says "No afflictions! Good work!" <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1257-1260 -->

### Reading the colours

With the colour option on (the default), each percentage is coloured by its strength:

| Colour | Strength | Meaning |
|---|---|---|
| Green | below 25 | Low. Watch it. |
| Yellow | 25 up to 65 | Medium. Act soon. |
| Red | 65 and up | High. Act now. |
| Bright red | any, for vital afflictions | Vital list. Treat first. |
| Cyan | any, for removal afflictions | Organ or limb is already removed. |

<!-- source: SharedProject/SharedSource/Config/ConfigData.cs:303; SharedProject/SharedSource/Config/ConfigData.cs:313 -->
<!-- source: SharedProject/SharedSource/Config/ConfigData.cs:349-386; SharedProject/SharedSource/Config/ConfigData.cs:388-399; SharedProject/SharedSource/Config/ConfigData.cs:401-412 -->

Blood pressure is special. Above 130 or below 70, it uses the red colour; anything in between uses green. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1223-1233 -->

> [!TIP]
> The scanner's thresholds (25 and 65) are server settings. If your server has changed them, the colours will look different from this lesson. <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:303; SharedProject/SharedSource/Config/ConfigData.cs:313 -->

## Hematology Analyzer

The Hematology Analyzer shows blood type and immunity, plus sepsis, acidosis, alkalosis and drugs in the blood. <!-- source: Assets/Content/Localization/English/English.xml:552; SharedProject/SharedSource/NT Components/NTItemsData.cs:348 --> Its readout starts with the blood type, then the affliction list. Entries with a strength of 2 or less are hidden. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:343-349; SharedProject/SharedSource/NT Components/NTItemsData.cs:369 -->

Each use draws blood, so it is not free. A medical 30 check decides how much. On success the patient gains 1 Blood Loss, and on failure they gain 3. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:281-285 --> The check works like every other skill check: at half the required skill you have about a 50% chance. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:965-975 -->

Each use drops the analyzer's condition to 0, and it is restored about 5 seconds later. The analyzer does nothing while its condition is below 50, so expect a short wait between scans. <!-- source: Assets/Content/XML/Items/Blood.xml:36-37; SharedProject/SharedSource/NT Components/NTItemsData.cs:280 -->

If you insert a [Blank Donor Card](#/item/bloodcollector), the analyzer imprints the blood type onto a card for the patient's ID slot. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:288-312 -->

## Reading symptoms

Symptoms are hints. A single symptom rarely tells you the cause, so group them by the body system they point to. The table below lists common ones and their usual causes, using the thresholds in the mod's code.

| What you see | Points to | Typical cause |
|---|---|---|
| Shortness of Breath, Cough | Lungs or heart | [Pneumothorax](#/affliction/pneumothorax), [Heart Attack](#/affliction/heartattack), or heart damage <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:966; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:667; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:715 --> |
| Hyperventilation | Breathing too fast | Hypoxemia above 10, or pneumothorax above 15 <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:961; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3480 --> |
| Hypoventilation | Breathing too slowly | Opiate overdose above 30 <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:240 --> |
| Pale Skin | Blood loss | Blood Pressure below 50 <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3395 --> |
| Lightheadedness, Headache | Low blood pressure | Blood Pressure below 60 <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3380; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3381 --> |
| Palpitations | Heart rhythm | [Alkalosis](#/affliction/alkalosis) above 20, when there is no [Cardiac Arrest](#/affliction/cardiacarrest) <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3559 --> |
| Sweating | Heart | [Heart Attack](#/affliction/heartattack) <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:662 --> |
| Chest Pain | Ribs or heart | [Fractured Ribs](#/affliction/fracturedribs) above 0 <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:171 --> |
| Vomiting Blood | Internal bleeding | [Internal Bleeding](#/affliction/internalbleeding) above 50 <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2256 --> |
| Headache, Confusion | Head or brain | Headache: fractured skull, [Stroke](#/affliction/stroke), or [Hypoxemia](#/affliction/hypoxemia). Confusion: also [Hypoxemia](#/affliction/hypoxemia) and low blood pressure <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:215; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1733; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3494; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3502; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3402 --> |

If a symptom makes no sense, check the blood with the Hematology Analyzer.

## Triage order

When several patients or several problems compete for your time, check them in this order:

1. **Vital afflictions.** These are the bright red items on the scanner: [Cardiac Arrest](#/affliction/cardiacarrest), [Arterial Bleeding](#/affliction/arterialcut), [Carotid Artery Bleeding](#/affliction/carotidarterialcut), [Aortic Rupture](#/affliction/aorticrupture), and traumatic amputations. <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:427-440 -->
2. **Breathing.** [Respiratory Arrest](#/affliction/respiratoryarrest) is described as a lethal status that stops oxygen reaching the blood. <!-- source: Assets/Content/Localization/English/English.xml (afflictiondescription.respiratoryarrest) -->
3. **Blood.** Check blood pressure and blood loss. A [Tourniquet](#/item/tourniquet) stops bleeding from a limb's artery, but never use one on the head. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:776-784; Assets/Content/Localization/English/English.xml:162 -->
4. **Head.** Neurotrauma is measured up to 200. Near 200 it is lethal. <!-- source: Assets/Content/XML/Afflictions/Brain.xml:22-59 -->
5. **Everything else.** A [Bandage](#/item/antibleeding1) helps with Bleeding and stabilizes Fractures and Dislocations, so bandage them early. <!-- source: Assets/Content/Localization/English/English.xml:981 -->

> [!WARNING]
> Never put a Tourniquet on the head. It raises Neurotrauma by 15 and sets Oxygen Low to 200. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:776-784 -->

## Quick check

1. Which tool shows blood type?
<details><summary>Answer</summary>
Only the Hematology Analyzer. The Health Scanner does not show blood type, immunity, sepsis, acidosis or alkalosis. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:348; Assets/Content/XML/Afflictions/Blood.xml:55 -->
</details>

2. The scanner shows a bright red line for Cardiac Arrest. What do you do first?
<details><summary>Answer</summary>
Treat it first. Bright red marks the vital list, and Cardiac Arrest is the ultimate result of fibrillation if left untreated. <!-- source: Assets/Content/Localization/English/English.xml:242 -->
</details>

3. You take a Hematology Analyzer scan and fail the medical 30 check. How much Blood Loss does the patient gain?
<details><summary>Answer</summary>
3. A success adds 1 and a failure adds 3.
</details>
