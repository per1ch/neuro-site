---
title: "Surgery Basics"
summary: "Prepare the patient, open a limb with three tools, close it with suture, and use the Health menu surgery buttons."
description: "Prepare the patient, open a limb with three tools, close it with suture, and use the Health menu surgery buttons."
order: 9
section: mechanics
level: intermediate
difficulty: intermediate
readingTime: 6
---

Surgery fixes the damage a bandage cannot, such as shrapnel inside a limb or a broken bone. Done in the wrong order, or on an awake patient, it can hurt your patient more than the injury did.

## In short

- Surgery only starts when the patient is numbed or unconscious. Otherwise your tools do nothing.
- A placed [Surgery Table](#/item/operatingtable) or a hospital bed keeps a conscious patient from going into shock.
- Open a limb in order: [Scalpel](#/item/advscalpel), then [Hemostat](#/item/advhemostat), then [Skin Retractors](#/item/advretractors). Wait for each step to nearly finish before the next.
- Close any operation with [Suture](#/item/suture). It ends the operation at any step.
- Most steps are skill checks. A failed check hurts the patient.
- A [Surgery Kit](#/item/surgerykit) in your inventory unlocks the surgery buttons in the Health menu.

## Can the patient be operated on?

Before you cut, check the patient. A tool only works if [Analgesia](#/affliction/analgesia) is above 1, or unconsciousness is above 0.1. An awake patient with no painkillers cannot be operated on, and the tool quietly does nothing. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1911-1914; SharedProject/SharedSource/Libraries/HelperFunctions.cs:1253 -->

Painkillers are enough to make the first cut, but not the later steps. An open incision causes [Traumatic Shock](#/affliction/traumaticshock) only while Analgesia and Anesthesia are both 0.5 or lower and the patient is not unconscious. Retracting skin, drilling and sawing still cause Traumatic Shock unless the patient is unconscious or on safe surgery. <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:26-29; Assets/Content/XML/Afflictions/Surgical.xml:81; Assets/Content/XML/Afflictions/Surgical.xml:107; Assets/Content/XML/Afflictions/Surgical.xml:172 -->

Two other routes help:

- [Propofol](#/item/propofol) gives [Anesthesia](#/affliction/anesthesia). Each dose adds 1 Anesthesia, or 15 with the Neurotrauma Surgery Plus talent, while Anesthesia is under 15. Its effects take some time to show up. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:903-913; Assets/Content/Localization/English/English.xml:763 -->
- Anesthesia between 15 and 99 gives +3 safe surgery per second. <!-- source: Assets/Content/XML/Afflictions/Functionality.xml:1121-1124 -->

> [!CAUTION]
> A stasis bag stops all of the basic tools. The scalpel, hemostat, retractors, drill and saw do nothing while the patient is in stasis. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:488; SharedProject/SharedSource/NT Components/NTItemsData.cs:1857; SharedProject/SharedSource/NT Components/NTItemsData.cs:1884; SharedProject/SharedSource/NT Components/NTItemsData.cs:1897; SharedProject/SharedSource/NT Components/NTItemsData.cs:1917; SharedProject/SharedSource/NT Components/NTItemsData.cs:1947 -->

## Safe surgery: the table, the bed and anesthesia

Safe surgery is what stops traumatic shock. You get it from three places.

- A **placed** [Surgery Table](#/item/operatingtable) gives everyone in range a large boost: safe surgery +70 and artificial ventilation +100, once per second. A table sitting in an inventory does nothing. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:1148-1150 -->
- A hospital bed gives nearby characters +2 safe surgery per second. <!-- source: Assets/Content/XML/Items/Override.xml:325-326 -->
- Anesthesia between 15 and 99 gives +3 safe surgery per second, as described above. <!-- source: Assets/Content/XML/Afflictions/Functionality.xml:1121-1124 -->

Safe surgery drops by 30 per second, so it runs out quickly if nothing refills it. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1483-1490 -->

> [!TIP]
> Put the patient on a placed Surgery Table before you start, and keep them there for the whole operation. The table's boost is much bigger than a bed's, so it is the safer choice.

Shock builds up quickly without safe surgery. An open incision adds 2 shock per second while Analgesia and Anesthesia are both 0.5 or lower and the patient is not unconscious. Retracted skin adds 2 per second. Drilled or sawed bone adds 1.5 per second each. Both of those only apply when the patient has no safe surgery and is not unconscious. Shock fades by 0.5 per second, or by 2 per second when the patient is sedated with safe surgery, or has Anesthesia above 15. <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:26-29; Assets/Content/XML/Afflictions/Surgical.xml:80-83; Assets/Content/XML/Afflictions/Surgical.xml:106-109; Assets/Content/XML/Afflictions/Surgical.xml:171-174; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2148-2155 -->

If shock climbs above 30, the patient can stop breathing. Above 40, the patient can go into cardiac arrest. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2161-2179 -->

## Steps 1 to 3: open the limb

Each step must reach 99 before the next one works. Below that, the tool does nothing. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1888; SharedProject/SharedSource/NT Components/NTItemsData.cs:1901 -->

| Step | Tool | Needs first | Skill | What it does |
|---|---|---|---|---|
| 1 | [Scalpel](#/item/advscalpel) | Patient numbed or unconscious, no open incision on that limb | 30 | Makes an incision. Until the bleeding is clamped, the limb bleeds 0.7 per second. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1859; SharedProject/SharedSource/NT Components/NTItemsData.cs:1861-1869; Assets/Content/XML/Afflictions/Surgical.xml:21-24 --> |
| 2 | [Hemostat](#/item/advhemostat) | Incision at 99 or more | None | Clamps the incision's bleeding. There is no skill check. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1886-1890 --> |
| 3 | [Skin Retractors](#/item/advretractors) | Clamped bleeding at 99 or more | 30 | Holds the wound open. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1899-1910 --> |

The waiting matters. The incision grows by 30 per second, the clamp by 20 per second, and retracted skin by 10 per second, each capped at 100. <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:20; Assets/Content/XML/Afflictions/Surgical.xml:58; Assets/Content/XML/Afflictions/Surgical.xml:104 --> When retracted skin reaches 99, the limb is open and ready for the next operation.

## Skill checks and failures

Each skill check passes with a chance of your skill divided by the required skill, capped at 100%. Medical 15 against a skill-30 check is a 50% chance. At 30 or more, it always passes. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1009-1019 -->

> [!NOTE]
> The skill used is Medical. If the Neurotrauma Surgery Plus addon is installed and its surgery skill option is on, the Surgery skill counts instead, or a quarter of your Medical if that is higher. With the vanilla skill check option on, the chance is worked out differently. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:992-1000; SharedProject/SharedSource/Libraries/HelperFunctions.cs:1013-1016 -->

Failures make things worse. This table shows the main ones.

| Tool | Skill | On failure |
|---|---|---|
| Scalpel | 30 | Bleeding 15 and lacerations 10 on that limb. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1873-1874 --> |
| Skin Retractors | 30 | Internal damage 10. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1903-1910 --> |
| Surgical Drill | 45 | Burn 12 and internal damage 10. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1926-1934 --> |
| Surgical Saw | 50 | Bleeding 15, internal damage 6 and lacerations 4. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1956; SharedProject/SharedSource/NT Components/NTItemsData.cs:1965-1967 --> |
| Suture | 30 | Internal damage 6. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1522-1526 --> |

## Step 4: close with suture

[Suture](#/item/suture) ends any operation at any step. Each use uses up one suture. <!-- source: Assets/Content/XML/Items/SurgicalEquipment.xml:39 --> It clears the incision, clamped bleeding, retracted skin and the cavity wash on that limb. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1501-1515 --> If the incision was at 95 or more, it also clears drilled and sawed bone. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1430-1457 --> It also closes ordinary wounds, healing up to 20 each of lacerations, bite wounds, explosion damage and gunshot wounds, and up to 40 of bleeding. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1532-1546 -->

> [!CAUTION]
> If the limb has sawed bone, suturing the limb amputates it. Only suture when you mean to. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1551-1563 -->

## The Health menu and the Surgery Kit

A [Surgery Kit](#/item/surgerykit) holds 4 surgery tools. <!-- source: Assets/Content/XML/Items/SurgicalEquipment.xml:219-221 --> While one is in your inventory, the Health menu shows a Surgery Tools panel with buttons for the Scalpel, Hemostat, Skin Retractors, Surgical Drill, Surgical Saw, Tweezers, [Trauma Shears](#/item/traumashears) and the Organ Scalpel. <!-- source: ClientProject/ClientSource/UI Surgery/ButtonData.cs:127-223; ClientProject/ClientSource/UI Surgery/ButtonFunctionality.cs:152 -->

- The buttons are enabled only while a kit is somewhere in your inventory. <!-- source: ClientProject/ClientSource/UI Surgery/ButtonFunctionality.cs:353-370 -->
- Pressing a button runs that step on the selected limb without consuming the tool item. <!-- source: ClientProject/ClientSource/UI Surgery/ButtonFunctionality.cs:224-275 -->
- A client setting shows or hides the panel. It is on by default. <!-- source: ClientProject/ClientSource/UI Surgery/ButtonFunctionality.cs:83; SharedProject/SharedSource/Config/ConfigData.cs:200-204 -->

> [!TIP]
> Keep a [Surgery Toolbox](#/item/surgerytoolbox) for the rest of the tools. It holds 12 surgery tools. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:156-157 -->

Organ Scalpel options need the right body part selected: the torso for kidneys, liver, lungs and heart, and the head for the brain. <!-- source: ClientProject/ClientSource/UI Surgery/ButtonData.cs:216-220 -->

## Quick check

**1. Why does the scalpel do nothing on an awake patient with no painkillers?**

<details><summary>Answer</summary>

Because analgesia must be above 1, or unconsciousness above 0.1. The tool gives no error, so check the patient first. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1911-1914 -->

</details>

**2. A medic with skill 15 tries a skill-30 check. What are the odds?**

<details><summary>Answer</summary>

50 percent. The chance is skill divided by the required skill. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1009-1019 -->

</details>

**3. What happens if you suture a limb that has sawed bone?**

<details><summary>Answer</summary>

The limb is amputated. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1551-1563 -->

</details>
