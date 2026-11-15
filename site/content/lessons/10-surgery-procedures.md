---
title: "Surgery Procedures"
summary: "Step-by-step recipes for every operation: bones, spine, shrapnel, amputation, reattachment, organs and the brain."
description: "Step-by-step recipes for every operation: bones, spine, shrapnel, amputation, reattachment, organs and the brain."
order: 10
section: mechanics
level: advanced
difficulty: advanced
readingTime: 9
---

Surgery is how you fix what bandages cannot: broken bones, a damaged spine, lost limbs and failing organs. A botched operation can cost more blood and more time than the injury it was meant to fix, so learn each recipe before you pick up a tool.

## In short

- Almost every operation starts the same way: [Scalpel](#/item/advscalpel), then [Hemostat](#/item/advhemostat), then [Skin Retractors](#/item/advretractors). Each step must reach 99 before the next tool works. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1888, 1901, 1920, 1950 -->
- Make the patient safe first, on a placed [Surgery Table](#/item/operatingtable) or under anesthesia. Otherwise retracting, drilling and sawing cause [Traumatic Shock](#/affliction/traumaticshock).
- Every operation ends with [Suture](#/item/suture). It closes the work at any step.
- Sawing a limb and then suturing it amputates it.
- Reattaching a limb uses the same saw step as amputating it. The difference is that you apply the limb item before you suture.

## Before every recipe

Most surgical tools do nothing unless the patient is painkilled or unconscious. The check is analgesia above 1, or unconsciousness above 0.1. An awake patient with no painkillers is not a valid target, and the tool silently fails to work. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1911-1914 -->

Painkillers are not enough for the later steps. Retracted skin adds 2 traumatic shock per second. Drilled and sawed bone each add 1.5 per second. This happens unless the patient is unconscious or on safe surgery. <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:80-83, 106-109, 171-174 -->

Safe surgery comes from a placed [Surgery Table](#/item/operatingtable). Everyone in range gets 70 safe surgery each second. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:1148-1150 -->

> [!NOTE]
> The in-game text says a hospital bed is enough. The bed gives only 2 safe surgery per second, while safe surgery decays by 30 per second, and this was not tested in game. For long steps, use the table. <!-- source: Assets/Content/XML/Items/Override.xml:325-326; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:1483-1490 -->

Skill checks pass with a chance of skill divided by the requirement, capped at 100%. A medical skill of 15 against a requirement of 30 gives a 50% chance. At 30 or more, it always passes. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1009-1020 -->

Some values are set by server config, such as implant uses and organ rejection. The numbers here are the defaults.

## Timing each step

Each new step starts at strength 1 plus half your medical skill. A skill-100 medic starts every step at 51. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1865, 1890, 1905, 1928, 1960 -->

The step then grows on its own. Wait for it before the next tool.

| Step | Tool | Skill | Grows by per second | Next tool needs |
|---|---|---|---|---|
| Incision | [Scalpel](#/item/advscalpel) | 30 | 30 | 99 incision for the hemostat <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:20; SharedProject/SharedSource/NT Components/NTItemsData.cs:1888 --> |
| Clamp | [Hemostat](#/item/advhemostat) | none | 20 | 99 clamp for the retractors <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:58; SharedProject/SharedSource/NT Components/NTItemsData.cs:1901 --> |
| Retraction | [Skin Retractors](#/item/advretractors) | 30 | 10 | 99 retraction for the drill or saw <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:104; SharedProject/SharedSource/NT Components/NTItemsData.cs:1920, 1950 --> |
| Drilled bone | [Surgical Drill](#/item/surgicaldrill) | 45 | 15 | 99 drilled for the implants <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:78; SharedProject/SharedSource/NT Components/NTItemsData.cs:1702 --> |
| Sawed bone | [Surgical Saw](#/item/surgerysaw) | 50 | 10 | 99 sawed to reattach a limb <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:170; SharedProject/SharedSource/NT Components/NTItemsData.cs:216 --> |

## Recipe A: open a limb

This is the start of almost every operation. It is the base for the recipes that follow.

1. Use the [Scalpel](#/item/advscalpel) on the limb. It needs a skill of 30, and it does nothing if the limb already has an incision. On failure it adds bleeding 15 and lacerations 10. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1859, 1861-1874 -->
2. While the incision is open and its bleeding is not yet clamped (clamped bleeding at 0.5 or less), the patient loses 0.7 blood per second. Wait for the incision to reach 99, then use the [Hemostat](#/item/advhemostat). It has no skill check and no failure case. <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:21-24; SharedProject/SharedSource/NT Components/NTItemsData.cs:1888-1890 -->
3. Wait for the clamp to reach 99, then use the [Skin Retractors](#/item/advretractors). They need a skill of 30. On failure they add internal damage 10. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1901-1910 -->
4. Wait for retraction to reach 99. The limb is now open. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1920; Assets/Content/XML/Afflictions/Surgical.xml:104 -->

## Recipe B: close an operation

1. Use [Suture](#/item/suture) on the same limb. It needs a skill of 30. On failure it adds internal damage 6 and does nothing else. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1522-1526 -->
2. Each suture is used up after one application. <!-- source: Assets/Content/XML/Items/SurgicalEquipment.xml:39 -->

> [!CAUTION]
> If the limb has sawed bone, the suture amputates it after a short timer. Check before you close. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1551-1563 -->

## Recipe C: fix a broken bone

1. Open the limb with Recipe A. Use the head for a skull or neck fracture, and the torso for ribs. <!-- source: Assets/Content/XML/Afflictions/Bones.xml:69, 108, 155 -->
2. Use the [Surgical Drill](#/item/surgicaldrill). It needs a skill of 45. On failure it adds burn 12 and internal damage 10. Wait for drilled bone to reach 99. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1926-1934 -->
3. Use [Osteosynthesis Implants](#/item/osteosynthesisimplants). They also need a skill of 45. On success they clear the fracture and add stimulated bone growth 100 to that limb. Each pack has 4 uses by default. On failure they add bleeding 5 and internal damage 5. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1745-1783, 1795-1796; SharedProject/SharedSource/Config/ConfigData.cs:1264-1272 -->
4. Close with Recipe B.

## Recipe D: fix a spinal cord injury

1. Open the limb with Recipe A, with retraction at 99. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1810-1815 -->
2. Use [Spinal Cord Implants](#/item/spinalimplant). They need a skill of 45. On success they set [Spinal Cord Injury](#/affliction/spinalcordinjury) to 0. The default is 1 use. On failure they add bleeding 5 and internal damage 5. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1810-1843; SharedProject/SharedSource/Config/ConfigData.cs:1275-1284 -->
3. The in-game text warns that the spinal cord is injured again unless the neck is repaired. Repair the neck with Recipe C on the head. <!-- source: Assets/Content/Localization/English/English.xml:891 -->
4. Close with Recipe B.

## Recipe E: remove shrapnel

1. Open the limb with Recipe A.
2. Use [Tweezers](#/item/tweezers). They need a skill of 30. Each success removes 3 to 10 [Foreign Body](#/affliction/foreignbody) and adds lacerations 5. On failure they add internal damage 6. Repeat as needed. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2001-2048 -->
3. Close with Recipe B. Each suture can heal up to 20 lacerations. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1532-1546 -->

With a gunshot wound or explosion damage, you can use the tweezers without opening the limb. This adds traumatic shock 5. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1993-2008 -->

## Recipe F: amputate a limb

1. Open the limb with Recipe A. The saw does nothing on the torso, so this recipe is for arms, legs and the head. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1958 -->
2. Use the [Surgical Saw](#/item/surgerysaw). It needs a skill of 50. Wait for sawed bone to reach 99. On failure it adds bleeding 15, internal damage 6 and lacerations 4. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1956-1967 -->
3. Close with Recipe B. The limb comes off. You get the limb item if the limb had less than 15 [Gangrene](#/affliction/gangrene) and was not already amputated. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1551-1563; SharedProject/SharedSource/Libraries/HelperFunctions.cs:1854-1885 -->

## Recipe G: reattach a limb

1. Open the stump with Recipe A.
2. Saw the stump with Recipe F, step 2, until sawed bone reaches 99. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:216 -->
3. Apply the matching limb item, such as [Right Arm](#/item/rarm), or a prosthesis to the same side. The wrong side does nothing. The item is used up. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:182-222 -->
4. Close with Recipe B. The sawed bone is already cleared, so the suture will not amputate it again. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:218, 1551 -->

## Organs: transplant and harvest

To put a new organ in, you first have to take the old one out or prepare it. The organ scalpels are the tools for this, and each one is set to its organ, such as the [Organ Procurement Scalpel: Brain](#/item/organscalpel_brain).

### Recipe H: replace an organ (heart, liver, lungs or kidneys)

1. Open the torso with Recipe A. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2085-2086 -->
2. If organ rejection is on, give [Azathioprine](#/item/immunosuppressant) first. Its medical requirement is 10. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:743-762 -->
3. Use the organ scalpel for that organ once. It needs a skill of 40. The old organ is now marked as being replaced, but it still works. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2091-2099 -->
4. Apply the new transplant item, such as the [Heart Transplant](#/item/hearttransplant). The torso must be retracted to 99, and the organ must be marked as replaced. The skill check is 40. If it fails, the new organ loses 40 condition. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:492-498, 557-574 -->
5. The old organ comes back as an item if its damage was under 90. Heart: you are now in cardiac arrest, so defibrillate. Lungs: you are now in respiratory arrest. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:563, 611 -->
6. Close with Recipe B.

Rejection is off by default. When it is on, the chance is (immunity minus 10) divided by 150. At immunity 100 that is 60%. A rejected liver, heart or lung drops to 100 damage after the transplant. <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:249-255; SharedProject/SharedSource/NT Components/NTItemsData.cs:529-531 -->

### Recipe I: harvest an organ

1. Open the torso with Recipe A. For the brain, open the head instead. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2297-2298 -->
2. Use the organ scalpel once. It needs a skill of 40. If the organ is already at 100 damage, it is removed at once. If the first use fails, it adds bleeding 15 and extra organ damage. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2091-2104 -->
3. Use the scalpel again to take the organ out. You get the organ item if its damage was under 90. Kidneys need two removals. The liver's second use needs a skill of 50. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2108-2125, 2272-2287, 2112 -->
4. Removing the lungs causes respiratory arrest. Removing the heart causes cardiac arrest. Both are set to 100. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2166, 2220 -->
5. Close with Recipe B.

> [!NOTE]
> The in-game text says the [Multipurpose Scalpel](#/item/multiscalpel) on the Head extracts the brain. The code appears to pass the torso to the brain scalpel, so this probably does nothing. Use the Organ Procurement Scalpel: Brain on the head. <!-- source: SharedProject/SharedSource/MP+SP Serverside/MultiScalpel.cs:221-222; SharedProject/SharedSource/NT Components/NTItemsData.cs:2297 -->

### Recipe J: brain transplant

1. Open the head with Recipe A.
2. Use the brain organ scalpel twice, with a skill of 40 for the first use. The second use gives you a [Brain Transplant](#/item/braintransplant). The brain also gains neurotrauma 100. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2292-2377 -->
3. Apply the Brain Transplant to the head while the patient is [Brain Removed](#/affliction/brainremoved). The check is 100, and a failure costs 40 condition. It lowers neurotrauma by the item's working condition. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:690-709 -->
4. Close with Recipe B.

> [!WARNING]
> While the brain is removed, the patient has cardiac and respiratory arrest, is unconscious, and gains neurotrauma 2.4 per update with more than 0.5 mannitol, or 4.0 per update with 0.5 mannitol or less. Plan the reinsertion before you remove the brain. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:348-372 -->

## Quick check

1. Do painkillers alone protect the patient when you drill, saw or retract?

<details><summary>Answer</summary>

No. Painkillers alone are not enough. Use a placed Surgery Table or anesthesia, or the patient gets traumatic shock.

</details>

2. You sawed an arm and then closed it with suture. What happens?

<details><summary>Answer</summary>

The suture amputates the arm. You get the arm item only if its gangrene was under 15 and it was not already amputated. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1551-1563; SharedProject/SharedSource/Libraries/HelperFunctions.cs:1854-1885 -->

</details>

3. What skill does the Surgical Saw need, and what must sawed bone reach before you fit a new limb?

<details><summary>Answer</summary>

The saw needs a skill of 50. Sawed bone must reach 99 before the limb item can be fitted. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1956; SharedProject/SharedSource/NT Components/NTItemsData.cs:216 -->

</details>
