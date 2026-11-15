---
title: "Mistakes, Settings and Tips"
summary: "The common beginner mistakes, the server settings that change difficulty, what bots do, and where the game text and real behaviour disagree."
description: "The common beginner mistakes, the server settings that change difficulty, what bots do, and where the game text and real behaviour disagree."
order: 13
section: tips
level: beginner
difficulty: beginner
readingTime: 6
---

Most lost patients in Neurotrauma are lost to a few avoidable mistakes, not bad luck. Learn these before your first round and you will save more of your crew.

## In short

- Put a [Tourniquet](#/item/tourniquet) only on an arm or a leg, never on a head.
- [Saline](#/item/antibloodloss1) and [Ringer's Solution](#/item/ringerssolution) raise blood pressure. They do not stop blood loss.
- Check the blood type with a [Hematology Analyzer](#/item/bloodanalyzer) before any transfusion.
- Surgery needs the patient on painkillers or unconscious. Check your server settings before the round.
- Bots do not treat anyone by default. You are the medic.

## Mistakes that cost lives

### Tourniquets in the wrong place

A [Tourniquet](#/item/tourniquet) stops blood loss from [Arterial Bleeding](#/affliction/arterialcut) on an arm or a leg. On the head it makes things worse. It sets oxygen low to 200 and adds 15 [Neurotrauma](#/affliction/neurotrauma). <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:780-784 -->

A tourniquet cannot be used on [Carotid Artery Bleeding](#/affliction/carotidarterialcut). That bleeding must be surgically fixed. <!-- source: Assets/Content/Localization/English/English.xml:228 -->

Leaving a tourniquet on too long is the other trap. A tourniqueted limb develops [Gangrene](#/affliction/gangrene) over time. Above 15, the limb cannot be saved and must be amputated. <!-- source: Assets/Content/Localization/English/English.xml:170 --> Remove the tourniquet early with [Trauma Shears](#/item/traumashears), which need Medical 10. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:2393 -->

### Blood pressure is not blood loss

New medics often reach for saline when a patient is bleeding out. Saline and Ringer's do not reduce blood loss. They only raise target blood pressure, by at most 30 each. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3350-3351 --> Stop the bleeding and the blood loss first, because blood pressure follows blood amount. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3344-3359 -->

### Transfusing without checking

A compatible blood pack gives 30 less blood loss. An incompatible pack gives 20 less blood loss, but it also brings a large dose of [Hemotransfusion Shock](#/affliction/hemotransfusionshock). With no immunity recorded, that shock is about 94 (immunity of 100 minus 6). <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:99-113; SharedProject/SharedSource/NT Components/NTItemsData.cs:111-112 -->

Checking first is cheap. Each use of the Hematology Analyzer costs 1 blood loss on a successful Medical 30 check, or 3 on a failure. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:281-285 -->

### Skipping the cheap steps

- Plaster [Gypsum](#/item/gypsum) only works on a limb that already has a clean bandage. Without one, nothing happens. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:805-817 --> On failure the gypsum is used up and no cast forms. The check is Medical 40. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:819-827 -->
- A [Wrench](#/item/wrench) fixes a dislocation. It needs Medical 60, or Medical 30 if the patient has painkillers or adrenaline. A failed wrench breaks the limb. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:29-37; SharedProject/SharedSource/NT Components/NTItemsData.cs:42-45 -->
- Give painkillers before the wrench, not after. Without them, the wrench also adds 5 severe pain. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:47-50 -->

### Operating on an awake patient

Surgery tools need the patient to have analgesia above 1 or to be unconscious. If not, the tool silently does nothing. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:1911-1914; SharedProject/SharedSource/NT Components/NTItemsData.cs:1701 -->

Painkillers alone are not enough for the later steps. Retracting, drilling and sawing still add [Traumatic Shock](#/affliction/traumaticshock) unless the patient is unconscious or on a [Surgery Table](#/item/operatingtable). The table gives safe surgery 70 each second. <!-- source: Assets/Content/XML/Afflictions/Surgical.xml:80-83; Assets/Content/XML/Afflictions/Surgical.xml:106-109; Assets/Content/XML/Afflictions/Surgical.xml:173; Assets/Content/XML/Items/OtherEquipment.xml:1148-1150 -->

### Skill is a chance, not a guarantee

Every skill check is a chance. Your skill divided by the requirement is your odds. At Medical 30 against a requirement of 60, you have a 50% chance. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:965-975 -->

## Pro tips

- Scan before you touch. The [Health Scanner](#/item/healthscanner) only lists afflictions on the limb you have selected. Colours are green below 25, yellow from 25 to under 65, and red from 65 up. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:318-320; SharedProject/SharedSource/NT Components/NTItemsData.cs:391-393; SharedProject/SharedSource/Config/ConfigData.cs:303-321; SharedProject/SharedSource/Config/ConfigData.cs:349-378 -->
- A broken rib needs a bandage on the torso. Without one, every 60 to 120 seconds there is a 30% chance of [Pneumothorax](#/affliction/pneumothorax). <!-- source: Assets/Content/XML/Afflictions/Bones.xml:88-94 -->
- Use an [AED](#/item/aed) for cardiac arrest if your Medical skill is below 80. <!-- source: Assets/Content/Localization/English/English.xml:778 -->
- Feed the [Ambu Bag](#/item/bvm) an oxygen tank. Welding fuel, incendium and paint harm the patient. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:777-804 -->
- A [Gel Coolant Pack](#/item/gelipack) can be used up to thrice. It slows internal bleeding on the torso while it is iced. <!-- source: Assets/Content/Localization/English/English.xml:772; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2810-2814 -->

## Server settings and difficulty

Open the pause menu with Esc and choose the Neurotrauma Config button. Only the host, the owner, or players with the ManageSettings permission can change server settings. <!-- source: ClientProject/ClientSource/ConfigGUI.cs:852-862 -->

Presets set the difficulty in one step. Easier sets the chance and speed multipliers, such as fracture, dislocation, infection and fall damage, to 0.5. Intended sets them to 1, and it is the default. Harder sets them to 1.5. <!-- source: SharedProject/SharedSource/Config/Config.cs:55; Assets/Content/DefaultPresets/Easier Config Preset.json:3; Assets/Content/DefaultPresets/Easier Config Preset.json:17; Assets/Content/DefaultPresets/Intended Config Preset.json:3; Assets/Content/DefaultPresets/Harder Config Preset.json:3; Assets/Content/DefaultPresets/Harder Config Preset.json:17 -->

Most chances and speeds are multiplied by these settings, and the default is 1. A value of 0.5 means 50% less, and 1.5 means 50% more. Some settings turn an injury off completely at 0:

| Setting | At 0 |
|---|---|
| Fracture chance multiplier | no fractures <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:24-28; SharedProject/SharedSource/MP+SP Serverside/FallDamage.cs:225; SharedProject/SharedSource/MP+SP Serverside/OnDamaged.cs:294 --> |
| Infection rate multiplier | no infected wounds <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:79-83; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2874 --> |
| Falldamage multiplier | fall damage is off <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:178-182; SharedProject/SharedSource/MP+SP Serverside/FallDamage.cs:169 --> |

Two defaults matter for planning. Organ rejection is off, so transplants are not rejected unless you turn it on. <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:249-255 --> Bot treatment is also switched off by default, as the next section explains.

## Bots and NPC medics

Bots do not treat patients by default. The option "Disable bot treatment algorithms" is on, and it stops bots from rescuing anyone, including from normal Barotrauma injuries. <!-- source: SharedProject/SharedSource/NT Bot Support/AIObjectiveOverrides.cs:26-50; SharedProject/SharedSource/Config/ConfigData.cs:233-239 --> Turn it off if you want the vanilla rescue behaviour back.

NPCs and bots do report symptoms over the radio. Broken ribs, a broken skull, broken extremities and dislocations are only announced once their strength is above 10, and the same message repeats at most every 600 seconds. <!-- source: SharedProject/SharedSource/MP+SP Serverside/LoveBots.cs:48-51; SharedProject/SharedSource/MP+SP Serverside/LoveBots.cs:113 -->

## Where the game and the mod disagree

Some in-game text describes things the current version does not do exactly as written. Keep these in mind when a treatment seems to fail.

> [!NOTE]
> The code and the in-game text disagree here. The defibrillator description says a failed shock causes Cardiac Arrest. In this version, a failed shock seems to do nothing extra. The code works out a failure chance but never uses it. <!-- source: Assets/Content/Localization/English/English.xml:778; SharedProject/SharedSource/NT Components/NTItemsData.cs:960; SharedProject/SharedSource/NT Components/NTItemsData.cs:962-976 -->

> [!NOTE]
> The code and the in-game text disagree here. The Gypsum description says the cast lets a fracture heal. In the code, a broken leg stays locked unless adrenaline is in the blood, because the lock check looks for a gypsumcast affliction. The Gypsum item sets a [Plaster Cast](#/affliction/plastercast) instead. <!-- source: Assets/Content/Localization/English/English.xml:768; SharedProject/SharedSource/Libraries/HelperFunctions.cs:1976-1990; SharedProject/SharedSource/Libraries/HelperFunctions.cs:1987-1989; SharedProject/SharedSource/NT Components/NTItemsData.cs:822; Assets/Content/XML/Afflictions/Extremities.xml:247 -->

> [!WARNING]
> With default settings the [Endovascular Balloon](#/item/endovascballoon) and [Medical Stent](#/item/medstent) are unavailable, because the hardmode aortic rupture option is off. Treat [Aortic Rupture](#/affliction/aorticrupture) as very dangerous. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:2106-2110; SharedProject/SharedSource/Config/ConfigData.cs:1286-1292 -->

## Quick check

**1. What happens if you put a tourniquet on a patient's head?**

<details><summary>Answer</summary>

It sets oxygen low to 200 and adds 15 Neurotrauma. Only use tourniquets on arms and legs. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:780-784 -->

</details>

**2. Does saline stop blood loss?**

<details><summary>Answer</summary>

No. Saline and Ringer's only raise target blood pressure, by at most 30 each. Stop the bleeding first. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3350-3351 -->

</details>

**3. Why give painkillers before using a wrench on a dislocated limb?**

<details><summary>Answer</summary>

With analgesia above 0.5, the wrench check drops from Medical 60 to Medical 30. A failed wrench breaks the limb. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:29-37 -->

</details>
