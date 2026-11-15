---
title: "Treatment Order"
summary: "The order to work in on a critical patient, and when to reach for the Stasis Bag and Liquid Oxygenite."
description: "The order to work in on a critical patient, and when to reach for the Stasis Bag and Liquid Oxygenite."
order: 11
section: emergencies
level: intermediate
difficulty: intermediate
readingTime: 6
---

A critical patient can get worse while you hunt for the right tool, so the order you work in matters as much as the tools you pick. This lesson gives you a sequence to follow and explains the two emergency options that buy you time.

## In short

- If the patient is getting worse fast, put them in a [Stasis Bag](#/item/stasisbag) first. It pauses the damage while you plan.
- Diagnose with all three tools before you treat: the Health interface, the [Health Scanner](#/item/healthscanner) and the [Hematology Analyzer](#/item/bloodanalyzer).
- Put a [Tourniquet](#/item/tourniquet) on any arterial bleeding, then fix the artery with surgery.
- Fix internal bleeding before you give blood, or the blood is wasted.
- [Liquid Oxygenite](#/item/liquidoxygenite) buys 30 seconds for a hard fix. <!-- source: Assets/Content/XML/Items/Override.xml:1061 --> It can also blow up on you.

## Why the order matters

Neurotrauma patients rarely die from one wound. Blood loss feeds [Hypoxemia](#/affliction/hypoxemia), the low oxygen that drives most of the damage. When blood amount drops below 60, hypoxemia starts to rise on its own. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3459 -->

So work on whatever kills fastest first, and leave slow problems for later.

> [!NOTE]
> The steps below come from the community guide, which is a player guide and not the mod itself. The guide recommends this order. Where this lesson gives a number, it comes from the mod's own files.

## Step 1: Stasis bag if the patient is dying fast

A Stasis Bag goes in the outerwear slot. While it is on, it supplies oxygen and applies the Stasis affliction. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:483 --> <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:486-489 --> The in-game text says it pauses the progress of negative afflictions. <!-- source: Assets/Content/Localization/English/English.xml:852 -->

The bag is a pause, not a cure. It loses 0.25 condition per second, so a new bag (Barotrauma items start at 100 condition unless they set their own, and the bag doesn't) lasts about 400 seconds, roughly 6½ minutes. The community guide's "6 minutes" matches. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:498; Assets/Content/Localization/English/English.xml:852 -->

Check the bag's condition on your Health interface before you rely on it, so you know how much time you have. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:427 -->

The bag also has costs:

- Its description lists Cardiac Arrest, Respiratory Arrest and Unconsciousness as side effects, and says it prevents surgery while it is on. <!-- source: Assets/Content/Localization/English/English.xml:852; Assets/Content/Localization/English/English.xml:853 -->
- The heart does not restart on its own when you take the bag off, because the bag stops Cardiac Arrest from clearing. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:556-557; SharedProject/SharedSource/NT Components/NTStatsData.cs:47-50 --> Be ready with first aid right after you remove it.

> [!WARNING]
> The bag does not fix Respiratory Arrest or Cardiac Arrest. While you wear it, the game blocks both from fading on their own, so a patient who is already in either one stays that way. The bag supplies oxygen while it is worn, but when you take it off, breathing and heartbeat must be restarted. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:122; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:556-557; Assets/Content/XML/Items/OtherEquipment.xml:483 -->

Use the bag early, while you plan. Diagnose and give non-surgical treatments inside it, then take it off when you are ready to act.

## Step 2: Diagnose with the three Hs

Use all three tools before you commit to a plan. Each one shows something the others do not.

| Tool | What it tells you |
|---|---|
| Health interface | The surface view of each body part and its afflictions |
| [Health Scanner](#/item/healthscanner) | The internal damage, such as organs and bones |
| [Hematology Analyzer](#/item/bloodanalyzer) | The blood type, immunity, and blood problems such as Blood Loss, Sepsis and Acidosis |

## Step 3: Tourniquet on arterial bleeding

[Arterial Bleeding](#/affliction/arterialcut) is the fastest killer on a limb. While it is untreated, it adds 1.5 blood loss per second. <!-- source: Assets/Content/XML/Afflictions/Extremities.xml:278-283 --> A tourniquet on that limb stops the bleeding from adding blood loss. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2468-2472 -->

> [!CAUTION]
> A tourniquet cannot be used on [Carotid Artery Bleeding](#/affliction/carotidarterialcut). Only surgery fixes it.

A tourniquet is a stopgap. The limb slowly develops [Gangrene](#/affliction/gangrene), so you need to fix the artery and remove the tourniquet soon after. <!-- source: Assets/Content/Localization/English/English.xml:748; Assets/Content/Localization/English/English.xml:162 --> The permanent fix is a suture after the skin is retracted to 95 or more. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:1461-1463 -->

## Step 4: Suture regular bleeding and give blood

Close regular major bleeding with [Sutures](#/item/suture). Give [Blood Packs](#/item/antibloodloss2) as needed. The O- pack can go to any patient, so it is the safe choice when you do not know the blood type. <!-- source: Assets/Content/Localization/English/English.xml:568 -->

> [!WARNING]
> An incompatible blood pack causes Hemotransfusion Shock. With the default immunity of 100, that is about 94 shock per pack. <!-- source: SharedProject/SharedSource/NT Components/NTItemsData.cs:111-112 --> Check the blood type before you give a pack.

Fix internal or aortic bleeding before you transfuse. Otherwise the blood runs out of the same hole.

### Liquid Oxygenite: buying time

[Liquid Oxygenite](#/item/liquidoxygenite) needs medical skill 50. <!-- source: Assets/Content/XML/Items/Override.xml:1058 --> On success, for 30 seconds it removes Hypoxemia at 100 per second, and adds 0.2 per second each to organ, kidney, heart, lung and liver damage. <!-- source: Assets/Content/XML/Items/Override.xml:1057-1084 -->

Use those 30 seconds to fix arterial bleeding or an aortic rupture without losing the patient. The community guide also suggests using it during surgery, then restarting heartbeat and breathing and giving blood once the fix is in.

> [!CAUTION]
> If the attempt fails, the effect is weaker: for 20 seconds it removes Hypoxemia at only 10 per second and adds 0.5 per second to each organ. It also explodes on impact with a burn of 50. <!-- source: Assets/Content/XML/Items/Override.xml:1057-1084 -->

## Steps 5 to 16 at a glance

Once the bleeding is under control, the community guide works through the rest in roughly this order.

| Step | What to do |
|---|---|
| 5 | Needle a high pneumothorax, using a [Needle](#/item/needle) |
| 6 | Prepare the patient to leave the bag: [Mannitol](#/item/mannitol) for neurotrauma, [Thiamine](#/item/thiamine) for organ healing, [Azathioprine](#/item/immunosuppressant) if a transplant is coming |
| 7 | Restart heartbeat and breathing with a [Defibrillator](#/item/defibrillator), an [AED](#/item/aed), an [AutoPulse](#/item/autocpr) or an [Ambu Bag](#/item/bvm) |
| 8 | Fix aortic rupture, internal bleeding and arterial bleeding properly |
| 9 | Fix heart and breathing problems, including [Drainage](#/item/drainage) for pneumothorax |
| 10 | Treat bad burns with [Antibiotic Ointment](#/item/ointment) if the limb needs no surgery |
| 11 | Install [Osteosynthesis Implants](#/item/osteosynthesisimplants) on head, neck and chest fractures first |
| 12 | Use the Health Scanner on body parts, and [Tweezers](#/item/tweezers) to remove foreign bodies |
| 13 | Transplant an organ if one is needed |
| 14 | Close surgeries and wounds with Sutures |
| 15 | Bandage, then cast arm and leg fractures with [Gypsum](#/item/gypsum) |
| 16 | Check the Hematology Analyzer for lingering blood problems |

## Med kits

The community guide suggests two doctor's kits. Both carry the same core tools, and the stasis bag stays on your hotbar.

- **Doctor's kit 1:** painkillers for surgery, [Bandage](#/item/antibleeding1), [Sutures](#/item/suture), a [Tourniquet](#/item/tourniquet), a [Health Scanner](#/item/healthscanner), a [Hematology Analyzer](#/item/bloodanalyzer), O- or O+ [Blood Packs](#/item/antibloodloss2), [Gypsum](#/item/gypsum), and [Trauma Shears](#/item/traumashears).
- **Doctor's kit 2:** a [Surgical Drill](#/item/surgicaldrill), a [Surgical Saw](#/item/surgerysaw), an [Ambu Bag](#/item/bvm), a [Defibrillator](#/item/defibrillator) or [AED](#/item/aed), [Mannitol](#/item/mannitol), and [Antibiotic Ointment](#/item/ointment).

> [!TIP]
> Fabricating a Stasis Bag needs medical skill 50. <!-- source: Assets/Content/XML/Items/OtherEquipment.xml:432-433 --> Keep a spare in your kit rather than hoping to find one.

## Quick check

1. Why put a patient in a Stasis Bag before you treat them?
<details><summary>Answer</summary>It pauses the progress of negative afflictions while you diagnose and plan. It does not cure anything, and its description lists Cardiac Arrest, Respiratory Arrest and Unconsciousness as side effects while it is on, so you must act quickly once the patient is out of it. <!-- source: Assets/Content/Localization/English/English.xml:852 --></details>

2. A patient has arterial bleeding on an arm. What do you do first, and what do you do next?
<details><summary>Answer</summary>Put a Tourniquet on the arm first to stop the blood loss from the limb. Then fix the artery in surgery: retract the skin far enough, then suture it. Remove the tourniquet once the artery is fixed, because the limb develops gangrene if the tourniquet stays on too long.</details>

3. What is the risk if your Liquid Oxygenite attempt fails?
<details><summary>Answer</summary>It is weaker and dangerous. For 20 seconds it removes Hypoxemia at only 10 per second and adds 0.5 per second to each organ. It also explodes on impact with a burn of 50. <!-- source: Assets/Content/XML/Items/Override.xml:1069-1085 --></details>
