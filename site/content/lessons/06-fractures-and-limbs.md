---
title: "Fractures and Limbs"
summary: "How arms, legs, ribs, skulls and necks break, what each break does to your patient, and how to treat them."
description: "How arms, legs, ribs, skulls and necks break, what each break does to your patient, and how to treat them."
order: 6
section: mechanics
level: beginner
difficulty: beginner
readingTime: 6
---

Broken limbs are the most common injury you will see after a bad fight or a fall. Left alone, a fracture slowly makes a limb useless, and a broken neck can paralyse a patient for the rest of the round.

## In short

- A hard hit or fall can break a limb, ribs, the skull or the neck. The harder the hit, the more likely the break.
- Bandage a broken arm or leg first, then put [Gypsum](#/item/gypsum) on it to make a [Plaster Cast](#/affliction/plastercast).
- A broken arm locks up once its fracture reaches 100. A broken leg locks at any amount, unless the patient has adrenaline.
<!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1976-1990 -->
- A broken neck that goes unbandaged can end in [Spinal Cord Injury](#/affliction/spinalcordinjury). Bandage the head straight away.
<!-- source: Assets/Content/XML/Afflictions/Bones.xml:127-141 -->
- Ribs, skulls and necks cannot be fixed with a cast. They need bone surgery.

## How bones break

Most fractures come from one of three sources. Each one uses the strength of the hit and the resistance of the limb it lands on.

- **Gunshots** break a limb with a chance of Strength/60. A limb that is already fractured can be torn off instead. Gunshot fractures ignore the server multipliers.
- **Explosions** break limbs with a chance of Strength/60 and dislocate a limb with a flat 35% chance.
- **Falls** replace vanilla fall damage. A limb needs a fall strength above 15 before it can fracture at all. A neck fracture from a fall needs a strength of 55 or more.

<!-- source: SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:255-259 -->
<!-- source: SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:250-253 -->
<!-- source: SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:366-369 -->
<!-- source: SharedProject/SharedSource/MP+SP Serverside/FallDamage.cs:284-291 -->
<!-- source: SharedProject/SharedSource/MP+SP Serverside/FallDamage.cs:266-274 -->

> [!NOTE]
> Most fracture and dislocation chances are multiplied by server config settings. Each one defaults to 1, so you get the base chance unless the server changed it.
<!-- source: SharedProject/SharedSource/Config/ConfigData.cs:13-17 -->
<!-- source: SharedProject/SharedSource/Config/ConfigData.cs:24-28 -->

## Limb fractures

A [Fractured Limb](#/affliction/fracturedextremity) grows by 2 strength per second until it reaches 100. A [Plaster Cast](#/affliction/plastercast) stops that growth.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2534 -->

While a broken arm sits between 90 and 100, a bandage holds it there. Bandage it early and the arm stays out of the locked range.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2527 -->

A fracture with no cast also gives the patient Intense Pain, and internal damage at 0.1 per second on that limb, unless the patient is sedated. A bandage does not stop this.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2545-2550 -->

A limb is locked, meaning it cannot be used, when:

| Limb | Locks when |
|---|---|
| Arm | Fracture or dislocation reaches 100 and the patient has no adrenaline. A dislocated arm also needs no bandage |
| Leg | Any fracture, or an unbandaged dislocation, unless the patient has adrenaline |

<!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1976-1990 -->
<!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1682-1710 -->

A single locked leg cuts movement speed to half. If both legs are locked, the patient is forced to crawl. If all four limbs are locked, the patient cannot move at all.

<!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:158-171 -->
<!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:173-176 -->

## Ribs, skull and neck

**Broken ribs** ([Fractured Ribs](#/affliction/fracturedribs)) grow by 4 per second and cause chest pain while the patient is awake. If the chest has no bandage, every 60 to 120 seconds there is a 30% chance of a pneumothorax (a collapsed lung), which adds 5 strength to that affliction. Bandage the torso to stop those rolls.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:162-165 -->
<!-- source: Assets/Content/XML/Afflictions/Bones.xml:88-94 -->

**A broken skull** ([Fractured Skull](#/affliction/fracturedskull)) also grows by 4 per second and gives a headache. While it is at 1 or more, neurotrauma does not heal on its own.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:204-209 -->
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1761-1764 -->

**A broken neck** ([Fractured Neck](#/affliction/fracturedneck)) also grows by 4 per second. If the head has no bandage, it takes internal damage at 0.1 per second. If the neck reaches 100 and the head has no bandage, every 20 to 50 seconds the spinal cord takes 5 more injury.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:185-190 -->
<!-- source: Assets/Content/XML/Afflictions/Bones.xml:127-141 -->

> [!WARNING]
> A neck fracture can paralyse the patient. Bandage the head as soon as you see the break, then fix the bone with osteosynthesis surgery.

## Plaster casts

[Gypsum](#/item/gypsum) can only be used on an arm or leg. The limb must have a clean [Bandage](#/item/antibleeding1) on it, no cast already, and no surgical incision. You need a medical skill of 40. On success the bandage is removed, the cast becomes 100, and the fracture drops by 20 at once. On failure the gypsum is still used up.

<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:805-817 -->
<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:819-827 -->

A cast heals the fracture at about 0.33 per second. A full 100 takes about 300 seconds. A cast never wears off by itself. To remove it, use [Trauma Shears](#/item/traumashears) with a medical skill of 10. Failure causes bleeding +15 and lacerations +10.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2627 -->
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2611-2629 -->
<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2384-2402 -->

A cast on a leg cuts its speed to 0.8 times normal.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2620-2624 -->

> [!TIP]
> Always bandage first. Gypsum only works on a limb that is already bandaged.

> [!NOTE]
> This looks like a bug in the mod. The leg-lock check looks for a cast id that the Plaster Cast does not use, so a cast does not unlock a broken leg. Expect the leg to stay locked until its fracture has healed or the patient has adrenaline.

<!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1987 -->

## Dislocations and the wrench

A [Dislocation](#/affliction/dislocation) pops a joint out of place. Without a bandage, it gives internal damage and Intense Pain. A bandage stops that. Then use a wrench on the limb. You need a medical skill of 60, or 30 if the patient has painkillers (analgesia) or adrenaline at 0.5 or more.

<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:29-35 -->
<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:39 -->
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2570-2581 -->

If the wrench fails, the limb fractures. Without painkillers, the patient also gets 5 more severe pain.

<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:42-45 -->
<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:47-50 -->

## Amputation and gangrene

In a fight, a limb can be torn off only if it is already fractured. The severed limb drops as an item, and the patient gets a traumatic amputation. A [Tourniqueted](#/affliction/tourniqueted) limb slowly builds [Gangrene](#/affliction/gangrene). Once gangrene reaches 15, the limb must be cut off, because gangrene above 15 does not heal. Remove the tourniquet early.

<!-- source: Assets/Content/XML/Afflictions/Functionality.xml:423-430 -->
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2600 -->
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2667-2670 -->
<!-- source: Assets/Content/Localization/English/English.xml:170 -->

To reattach a limb, saw the stump until the bones are at 99 or more, then use the severed limb or a bionic prosthesis on it. Do this before you suture, because suturing a limb with sawed bones takes it off.

<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:182-227 -->
<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1551-1562 -->

> [!CAUTION]
> Suturing a limb with sawed bones amputates it. Attach the new limb first.

## Burns, wounds and foreign bodies

**Burns** range from 0 to 200. Up to 20 is first degree, 20 to 50 is second degree, and above 50 is third degree. Burns heal naturally only below 50. [Antibiotic Ointment](#/item/ointment) (medical skill 10) reduces the burn when it is under 50.

<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2989-2995 -->
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2977-2983 -->
<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:725-739 -->

**Open wounds** bleed less once you bandage the limb. A [Bandage](#/item/antibleeding1) cuts bleeding by 24 with a medical skill of 10, and by 18 without it. Later, [Suture](#/item/suture) (surgery skill 30) closes up to 20 of each wound type and 40 bleeding on that limb.

<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1319-1333 -->
<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1539-1544 -->

**Foreign bodies** are shrapnel or bullet fragments stuck in a limb. Outside surgery, [Tweezers](#/item/tweezers) (surgery skill 30) can pull some of them out through an open gunshot or explosion wound. This costs 5 traumatic shock. Foreign bodies heal only below 15. At 20 or more they can cut an artery by chance.

<!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1979-2049 -->
<!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2904-2916 -->

## Quick check

1. **What must you do before putting gypsum on a broken arm?**
<details><summary>Answer</summary>Bandage the limb with a clean bandage. Gypsum needs a clean bandage, no existing cast, and no surgical incision on that limb.</details>

2. **At what strength does a broken arm lock?**
<details><summary>Answer</summary>When its fracture reaches 100. For legs, any fracture locks the leg unless the patient has adrenaline.</details>
<!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1976-1990 -->

3. **Why do you bandage the head straight away after a neck fracture?**
<details><summary>Answer</summary>An unbandaged neck fracture causes internal damage to the head, and once the neck reaches 100 it can cause spinal cord injury, which paralyses the patient.</details>
