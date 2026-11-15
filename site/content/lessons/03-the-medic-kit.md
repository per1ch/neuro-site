---
title: "The Medic Kit"
summary: "The core items a medic should carry, what each one needs from your skill, and what it is for."
description: "The core items a medic should carry, what each one needs from your skill, and what it is for."
order: 3
section: getting-started
level: beginner
difficulty: beginner
readingTime: 6
---

A round is often decided in the first minute, by what you pull out of your bag. Knowing which item fixes which problem, and how likely it is to work at your skill, is the fastest way to become a useful medic.

## In short

- [Bandage](#/item/antibleeding1) reduces bleeding and stabilizes fractures. It needs only medical 10. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1321 -->
- [Tourniquet](#/item/tourniquet) stops arterial bleeding on an arm or leg. Never put one on the head. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:776-780 -->
- [Gypsum](#/item/gypsum) makes a plaster cast, needs medical 40, and is used up if the attempt fails. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:819-828 -->
- [Saline](#/item/antibloodloss1) and [Ringer's Solution](#/item/ringerssolution) raise blood pressure. They do not stop bleeding. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3350-3351; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1931-1938 -->
- [Blood Pack O-](#/item/antibloodloss2) fits any patient and needs no skill check. <!-- source: Assets/Content/Localization/English/English.xml:568; SharedProject/SharedSource/NT Components/NTItemsData.cs:74-113 -->
- The heart and breathing kit ([Manual Defibrillator](#/item/defibrillator), [AED](#/item/aed), [AutoPulse](#/item/autocpr), [Ambu Bag](#/item/bvm)) is what keeps a patient alive once they stop.

## How skill checks work

Most items below have a "medical N" check. Your chance of success is your medical skill divided by N, capped at 100%. At or above N you always succeed. At half of N you have about a 50% chance. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:965-975 -->

Keep this in mind when you read the table. A Gypsum check at medical 40 is a coin flip for a medic with skill 20, and a failed Gypsum is lost entirely. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:819-828; SharedProject/SharedSource/Libraries/HelperFunctions.cs:965-975 -->

## The core kit

| Item | Skill needed | What it is for |
| --- | --- | --- |
| [Bandage](#/item/antibleeding1) | Medical 10 | Reduces bleeding, stabilizes fractures and dislocations. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1321; SharedProject/SharedSource/NT Components/NTItemsData.cs:1330; Assets/Content/Localization/English/English.xml:981 --> |
| [Tourniquet](#/item/tourniquet) | Medical 30 | Stops blood loss from arterial bleeding on an arm or leg. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:770-779; Assets/Content/Localization/English/English.xml:748 --> |
| [Gypsum](#/item/gypsum) | Medical 40 | Makes a plaster cast on a bandaged limb. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:819-825 --> |
| [Opium](#/item/opium) | Medical 40 | Painkiller. Gives analgesia for 25 seconds. <!-- source: Assets/Content/XML/Items/Override.xml:562-592 --> |
| [Saline](#/item/antibloodloss1) | Medical 10 for the full dose | Raises target blood pressure. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1305-1312 --> |
| [Ringer's Solution](#/item/ringerssolution) | Medical 20 for the full dose | Raises target blood pressure. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:832-839 --> |
| [Blood Pack](#/item/antibloodloss2) | None | Reduces blood loss and raises blood pressure. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:99-113; SharedProject/SharedSource/NT Components/NTItemsData.cs:418-433 --> |
| [Manual Defibrillator](#/item/defibrillator) | Medical skill, see below | Shocks the heart out of fibrillation or tachycardia. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:956-976 --> |
| [AED](#/item/aed) | Medical skill, see below | Restarts a stopped heart in some cases. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1021 --> |
| [AutoPulse](#/item/autocpr) | None | Worn on the patient, works over time. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:849-858 --> |
| [Ambu Bag](#/item/bvm) | None, needs a tank | Gives oxygen from a tank. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:726-743 --> |

## Bleeding and limbs

Start with the [Bandage](#/item/antibleeding1). Applied to a limb, it adds bandaged strength and reduces bleeding by 18 points. On a successful check it reduces bleeding by 24 points, or 30 points if you also have the medical expertise talent. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1322; SharedProject/SharedSource/NT Components/NTItemsData.cs:1329-1330 --> A Bandage is also the first step before a cast.

For [Arterial Bleeding](#/affliction/arterialcut), a Bandage is not enough. Put a [Tourniquet](#/item/tourniquet) on the limb. It stops the bleeding, but the limb slowly develops [Gangrene](#/affliction/gangrene) if the tourniquet stays on, and the item description says surgery is needed to remove it. <!-- source: Assets/Content/Localization/English/English.xml:748; Assets/Content/Localization/English/English.xml:162 --> Once Gangrene goes above 15%, the limb cannot be saved and must be amputated. <!-- source: Assets/Content/Localization/English/English.xml:170 -->

> [!CAUTION]
> Never put a Tourniquet on the head. It sets Oxygen Low to 200 and adds Neurotrauma +15. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:780-784 -->

> [!NOTE]
> A failed Tourniquet check still adds Blunt Trauma to the limb, but the Tourniquet is not used up. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:770-774 -->

## Fractures and the cast

[Gypsum](#/item/gypsum) only works if the limb is already bandaged, has no cast yet, has no surgical incision, is an arm or leg, and the patient is not in stasis. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:805-817 --> On a successful medical 40 check, the bandage is removed, the cast is set to 100, and the fracture is reduced by 20. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:819-825 -->

> [!WARNING]
> On a failed check, the Gypsum is used up and you get no cast. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:828; Assets/Content/Localization/English/English.xml:768 -->

## Pain

[Opium](#/item/opium) is a painkiller. On success it gives analgesia and opioids at 1.1 per second for 25 seconds. On failure it gives less analgesia, but more overdose. <!-- source: Assets/Content/XML/Items/Override.xml:562-592 --> Opium also builds addiction. Use it for pain, not as a habit, and keep [Naloxone](#/item/antinarc) ready for overdose. <!-- source: Assets/Content/XML/Items/Override.xml:805-823 -->

## Blood

[Saline](#/item/antibloodloss1) and [Ringer's Solution](#/item/ringerssolution) raise the target blood pressure, by up to 30 each. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3350-3351 --> They do **not** reduce blood loss. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1931-1956 -->

Blood packs are the item that actually replaces blood. A compatible pack reduces blood loss by 30 and raises blood pressure by 30. An incompatible pack reduces blood loss by only 20 and causes [Hemotransfusion Shock](#/affliction/hemotransfusionshock). <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:99-113 --> Carry several [Blood Pack O-](#/item/antibloodloss2) when you do not know the patient's type. <!-- source: Assets/Content/Localization/English/English.xml:568 -->

## Heart and breathing

The [Manual Defibrillator](#/item/defibrillator) has a chance based on your skill S. For [Irregular Heartbeat](#/affliction/fibrillation) it is (S/100) squared. For [Cardiac Arrest](#/affliction/cardiacarrest) it is (S/100) to the power of four. At medical 50 that is 25% for fibrillation and 6.25% for arrest. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:956-976; SharedProject/SharedSource/NT Components/NTItemsData.cs:958-959 --> Use the [AED](#/item/aed) for cardiac arrest if your medical skill is under 80. <!-- source: Assets/Content/Localization/English/English.xml:778 --> The AED always clears fibrillation, but its chance to clear cardiac arrest is only 20% at medical 40 or below, rising to 40% at medical 80 or more. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1021; SharedProject/SharedSource/NT Components/NTItemsData.cs:1025-1034 -->

The [AutoPulse](#/item/autocpr) is worn in the outerwear slot. It needs a mobile battery inside it to work. Over time it cures cardiac arrest and fibrillation and raises blood pressure. You cannot apply it in water, and you remove it with a Wrench on the torso. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:849-858; Assets/Content/Localization/English/English.xml:790; SharedProject/SharedSource/NT Components/NTItemsData.cs:1040 -->

The [Ambu Bag](#/item/bvm) needs a tank. An oxygen tank reduces Oxygen Low by 90 and loses 2 condition per use. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:739-743 -->

> [!CAUTION]
> Welding fuel, incendium and paint in an Ambu Bag harm the patient. Use an oxygen tank instead. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:777-804 -->

## The Surgery Kit and the Medical Starter Crate

The [Surgery Kit](#/item/surgerykit) enables all basic Neurotrauma tools in the Health menu. Without it, the surgery buttons in the Health menu are disabled. <!-- source: Assets/Content/Localization/English/English.xml:927; Assets/Content/Localization/English/English.xml:1261 -->

The [Medical Starter Crate](#/item/medstartercrate) has a base price of 700 and is sold by the medical merchant, whose multiplier is 0.9. The NT item price setting for it defaults to 1. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:329-331; SharedProject/SharedSource/Config/ConfigData.cs:877-883 --> Once you have it, it spawns a [Hematology Analyzer](#/item/bloodanalyzer), a [Health Scanner](#/item/healthscanner) with a battery, two Medical Containers, and the items inside them: a Defibrillator, an AutoPulse, two Tourniquets, two Ringer's Solution, a Bandage, Gypsum, Opium, Antibiotics, and Antibiotic Ointment. <!-- source: SharedProject/SharedSource/MP+SP Serverside/LootCrates.cs:24-48; SharedProject/SharedSource/MP+SP Serverside/LootCrates.cs:53-86 -->

## Common mistakes

- Using Saline or Ringer's to stop bleeding. They only raise blood pressure.
- Trusting a Gypsum without checking your skill. A failed check wastes it.
- Leaving a Tourniquet on too long. Gangrene follows.
- Putting an Ambu Bag on a tank you have not checked.

## Quick check

**1. Which item stops arterial bleeding on an arm, and what happens if you leave it on too long?**

<details><summary>Answer</summary>A Tourniquet. The limb slowly develops Gangrene, and surgery is needed to remove it.</details>

**2. You have medical 20 and try Gypsum, which needs medical 40. What is your chance?**

<details><summary>Answer</summary>About 50%, because your skill divided by the requirement is 20 / 40. A failure uses up the Gypsum with no cast. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:965-975; SharedProject/SharedSource/NT Components/NTItemsData.cs:819-828 --></details>

**3. Which item fits a patient of unknown blood type, and does Saline stop bleeding?**

<details><summary>Answer</summary>Blood Pack O-, which fits any patient. Saline does not stop bleeding. It only raises blood pressure.</details>
