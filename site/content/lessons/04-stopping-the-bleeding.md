---
title: "Stopping the Bleeding"
summary: "How each kind of bleeding starts, how fast it drains a patient, and what stops it."
description: "How each kind of bleeding starts, how fast it drains a patient, and what stops it."
order: 4
section: mechanics
level: beginner
difficulty: beginner
readingTime: 5
---

Bleeding drains a patient's blood, and the kind of bleeding decides which tool you reach for first. Get that choice right and the rest of the treatment is much calmer.

## In short

- Limb bleeding drains blood slowly and clots a little on its own. A [Bandage](#/item/antibleeding1) slows it a lot.
- [Arterial Bleeding](#/affliction/arterialcut) is the fast one. Put a [Tourniquet](#/item/tourniquet) on the limb first, then fix the artery with surgery.
- The in-game text says a Tourniquet cannot be used on [Carotid Artery Bleeding](#/affliction/carotidarterialcut). Only surgery fixes it.
- [Internal Bleeding](#/affliction/internalbleeding) and [Aortic Rupture](#/affliction/aorticrupture) happen inside the torso, so they need surgery to fix properly.
- A Tourniquet causes [Gangrene](#/affliction/gangrene) over time. Remove it once the artery is fixed.

## Bleeding on a limb

Each bleeding limb turns bleeding into blood loss. The rate is the bleeding value divided by 60 per second, so [Bleeding](#/affliction/bleeding) at 60 on one limb costs 1 blood loss per second. Armor on that limb reduces this. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2471 -->

Bleeding does not hurt the patient's vitality directly. Its danger is the blood it drains. <!-- source: Assets/Content/XML/Afflictions/Overrides.xml:1653-1656 -->

Left alone, bleeding slows down by itself, but only a little. It drops by about 0.1 per second for a healthy patient, and liver damage slows that down. A clean bandage adds 0.5 per second on top of that, and a dirty bandage adds 0.25 per second. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2476-2479; SharedProject/SharedSource/NT Components/NTStatsData.cs:34-40 -->

Your main tools for a limb are:

| Tool | What it does | Source |
|---|---|---|
| [Bandage](#/item/antibleeding1) | Reduces bleeding by 18 and gives a clean bandage. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1319-1330 --> | Medical skill raises the effect. |
| [Plastiseal](#/item/antibleeding2) | Reduces bleeding by 24, more on a successful use. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1337-1366 --> | Also treats burns. |
| [Suture](#/item/suture) | Reduces bleeding by 40 on that limb. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1518-1546 --> | Needs surgery skill 30, or it adds 6 internal damage on failure. |
| [Antibiotic Glue](#/item/antibleeding3) | Reduces bleeding by 30 on success, and by 20 on failure. <!-- source: Assets/Content/XML/Items/Override.xml:1221-1237 --> | Needs medical skill 55. |

> [!WARNING]
> Antibiotic Glue can fail badly. On failure, a limb that was bleeding has a 50% chance of a heart attack. Use it only when you are sure of your medical skill. <!-- source: Assets/Content/XML/Items/Override.xml:1221-1237 -->

Bandages wear out faster when the limb keeps bleeding. A bandage loses strength at 0.1 per second, plus up to 0.4 more depending on the total wounds, plus bleeding divided by 20 per second. Bleeding of 40 adds 2 per second to that drain. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2690-2703 --> Once a bandage is at 0.5 or lower, it becomes a [Dirty Bandage](#/affliction/bandageddirty). <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2708-2718 -->

> [!TIP]
> Check the bandage on a bleeding limb often. Replace a dirty bandage with a fresh one rather than waiting for the limb to get worse.

## Arterial Bleeding

An artery can be cut in several ways. A fall that breaks a bone on a limb can open an artery. A foreign body of 20 or more on a limb can cut one, with a chance that rises fast as the foreign body grows. Bleeding above 80 on a limb with a foreign body also cuts one. A traumatic amputation always does it. <!-- source: SharedProject/SharedSource/MP+SP Serverside/FallDamage.cs:292-296 --> <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2910-2916 --> <!-- source: Assets/Content/XML/Afflictions/Functionality.xml:428 -->

Arterial Bleeding drains blood loss at 1.5 per second while no tourniquet is on the limb. Its strength also grows by 1 each second, and nothing heals it on its own. <!-- source: Assets/Content/XML/Afflictions/Extremities.xml:278-283 -->

The fix has three steps:

1. **Apply a Tourniquet.** It stops the blood loss from that limb. It needs medical skill 30. On failure it adds 6 blunt trauma, and the tourniquet is not used up. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:770-779 -->
2. **Fix the artery.** Make the incision with a [Scalpel](#/item/advscalpel), clamp it with a [Hemostat](#/item/advhemostat), hold the skin open with [Skin Retractors](#/item/advretractors), then close it with a [Suture](#/item/suture) on the same limb. The suture sets arterial cut to 0. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1461-1463; SharedProject/SharedSource/NT Components/NTItemsData.cs:1602 -->
3. **Remove the tourniquet.** The suture step does this. [Trauma Shears](#/item/traumashears) at medical skill 10 also work. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1487-1489; SharedProject/SharedSource/NT Components/NTItemsData.cs:2380-2399 -->

Most surgery steps need the patient to have pain relief or be unconscious. Plan for this before you start. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1911-1913 -->

## Carotid Artery Bleeding

This is a cut artery in the neck. Every 1 to 3 seconds it adds 8 internal bleeding and 4 blood loss, and its strength grows each second. <!-- source: Assets/Content/XML/Afflictions/Head.xml:46-58 -->

The in-game text says you cannot tourniquet the carotid, so it has to be fixed with surgery: scalpel, hemostat, skin retractors, then suture. <!-- source: Assets/Content/Localization/English/English.xml:228; SharedProject/SharedSource/NT Components/NTItemsData.cs:1465-1467 -->

## Internal Bleeding

Internal bleeding happens inside the torso. A gunshot to the torso can cause it, at a strength of 0.3 to 0.6 times the wound strength. Explosions, bites and lacerations on the torso cause it too, at 0.2 to 0.5 times. The torso hit must be at least 5 strength. <!-- source: SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:226-229; SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:306-309; SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:400-403; SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:477-480 -->

Internal bleeding drains blood loss at its strength divided by 40 per second. A strength of 40 costs 1 blood loss per second. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2251 --> Above strength 50 the patient starts [Vomiting Blood](#/affliction/vomitingblood). <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2254-2257 -->

It heals on its own, but very slowly. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2240-2243 -->

To treat it:

1. Put a [Gel Coolant Pack](#/item/gelipack) on the torso. While the chill lasts, it removes 0.2 internal bleeding per second. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2810-2814; SharedProject/SharedSource/NT Components/NTItemsData.cs:795-796 -->
2. For a permanent fix, use surgery: make an incision with a [Scalpel](#/item/advscalpel), hold the skin open with [Skin Retractors](#/item/advretractors), then close it with a [Suture](#/item/suture). The suture sets internal bleeding to 0. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1491-1493; SharedProject/SharedSource/NT Components/NTItemsData.cs:1602 -->

## Aortic Rupture

Aortic Rupture is the most dangerous bleeding in this lesson. Every 1 to 3 seconds it adds 8 internal bleeding and 4 blood loss, unless the aorta is already ballooned. <!-- source: Assets/Content/XML/Afflictions/Torso.xml:20-30 -->

The fix is a two-step surgery:

1. Make an incision, then install an [Endovascular Balloon](#/item/endovascballoon) on the torso. This sets the ballooned aorta to 100 and internal bleeding to 0. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2494-2503 --> The balloon is a clog, so it causes [Gangrene](#/affliction/gangrene) over time. <!-- source: Assets/Content/Localization/English/English.xml:936 -->
2. Install a [Medical Stent](#/item/medstent). It is used after the balloon and removes the rupture. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2520-2530 -->

> [!NOTE]
> The code and the in-game text disagree here. The in-game config text says the balloon and stent are the only method when hardmode is on. In the code, with the default setting, both are marked unavailable and the suture fix needs hardmode on. Check which items you have before you plan around this fix. <!-- source: Assets/Content/Localization/English/English.xml:1707 --> <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:2106-2110 --> <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:1286-1290 -->

## Tourniquet risks

A tourniquet is a short-term tool. It has three risks you need to know.

- **Gangrene.** Each update, a tourniquet has a 10% chance of adding gangrene to its limb. The gangrene speed is a server setting, and it is 1 by default. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2600; SharedProject/SharedSource/Config/ConfigData.cs:160 --> Gangrene above 15% means the limb must be replaced. <!-- source: Assets/Content/Localization/English/English.xml:875 -->
- **Torso.** A tourniquet on the torso does nothing, but it is still used up. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:776-787 -->
- **Head.** A tourniquet on the head is very harmful. It sets oxygen low to 200 and adds 15 neurotrauma. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:780-784 -->

> [!CAUTION]
> Never put a Tourniquet on the head. Use it only on an arm or a leg.

## Quick check

**1. A crew member has Arterial Bleeding in one leg. What do you do first, and why?**

<details><summary>Answer</summary>Apply a Tourniquet to that leg first. It stops the 1.5 blood loss per second from that limb, so you have time to plan the artery fix with surgery. <!-- source: Assets/Content/XML/Afflictions/Extremities.xml:278-283 --></details>

**2. Can you use a Tourniquet on Carotid Artery Bleeding?**

<details><summary>Answer</summary>No. The in-game text says the carotid artery cannot be tourniqueted. It has to be fixed with surgery: scalpel, hemostat, skin retractors, then suture. <!-- source: Assets/Content/Localization/English/English.xml:228 --></details>

**3. Why should you remove a Tourniquet after the artery is fixed?**

<details><summary>Answer</summary>A tourniqueted limb can develop gangrene, and gangrene above 15% means the limb must be replaced. <!-- source: Assets/Content/Localization/English/English.xml:875 --> The suture step removes the tourniquet, or you can cut it off with Trauma Shears.</details>
