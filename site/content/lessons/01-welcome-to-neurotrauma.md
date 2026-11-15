---
title: "Welcome to Neurotrauma"
summary: "What Neurotrauma changes about health, and how this guide will get you ready for your first round as a medic."
description: "What Neurotrauma changes about health, and how this guide will get you ready for your first round as a medic."
order: 1
section: getting-started
level: beginner
difficulty: beginner
readingTime: 5
---

Your crew is going to get hurt, and in Neurotrauma (NT) a small cut can turn into a dead patient if nobody notices it in time. This lesson shows you how injuries work in NT and what to expect from your first round as a medic.

## In short

- Injuries are tracked **per limb**. A bullet in the left arm does not just reduce one health number.
- Bleeding happens **per limb**, and it slowly turns into **blood loss**, which is what actually kills people.
- Oxygen is a chain: heart, lungs and brain all have to work, or the patient dies.
- Conditions **progress over time**. Waiting for a problem to go away is usually a mistake.
- Bots **do not treat anyone by default**. You are the medic.
- Skill checks pass with a chance that depends on how skilled you are.

## What is different from vanilla

In vanilla Barotrauma, health is mostly one bar per limb with a few conditions on top. NT replaces that with a lot more detail:

- **Injuries add up in a limb.** Gunshots, explosions, bites and blunt hits can break bones, tear arteries, push out organs and leave foreign bodies behind.
- **Bleeding is not instant damage.** A bleeding limb adds blood loss at a steady rate. Bleeding on its own does no direct vitality loss in NT, so the danger comes later, through blood loss. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2471; Assets/Content/XML/Afflictions/Overrides.xml:1637-1656 -->
- **Blood loss is measured as blood amount.** Your blood amount is 100 minus your blood loss, so at 40 blood loss the patient has 60 blood left. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:42-45 -->
- **Conditions escalate.** Low blood amount and low blood pressure add to **Hypoxemia** (low oxygen in the blood). <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3459 -->

> [!NOTE]
> Bleeding does not kill directly in NT. It adds blood loss, and blood loss adds hypoxemia. Think of bleeding as a timer, not a health bar.

## The oxygen chain

Almost every death in NT comes down to oxygen. Oxygen has to be taken in by the lungs, pumped by the heart and carried to the brain and organs. If one link breaks, the others stop helping.

- **Respiratory arrest** means the patient is not breathing. While it lasts, Oxygen Low rises by 15 per second. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:25-28 -->
- **Hypoxemia above 80** makes the patient unconscious, and each update also has a 1% chance of cardiac arrest. <!-- source: SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:3512-3519 -->
- **Cardiac arrest** means the heart is not beating, so no oxygen reaches the blood at all.

You will learn each link in detail in the organ lessons. For now, remember that a patient who is unconscious, not breathing and has no pulse is in a chain reaction, and you need to fix the most urgent link first.

## Conditions take time

NT updates each injured human every **2 seconds** by default. Many effects are rolled as chances on each update, so a problem that looks small can get worse before your next check. <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:1339-1345; SharedProject/SharedSource/MP+SP Serverside/HumanUpdate.cs:128-129 -->

Here is what that means in practice:

- A cut with no bandage keeps bleeding for a long time, because bleeding only falls by about 0.1 per second without treatment. <!-- source: SharedProject/SharedSource/NT Components/NTStatsData.cs:34-40; SharedProject/SharedSource/NT Components/NTAfflictionsData.cs:2476-2479 -->
- Blood loss also heals slowly on its own, at 0.1 per second. That is not fast enough to save someone who is losing blood quickly. <!-- source: Assets/Content/XML/Afflictions/Overrides.xml:38-44 -->

## Skill checks are chances

Many medical items and surgery steps require a skill. The rule is simple: a check passes with a chance equal to your medical skill divided by the required skill, capped at 100%. If you already meet the requirement, it always passes. If you are at half the required skill, you have a 50% chance. <!-- source: SharedProject/SharedSource/Libraries/HelperFunctions.cs:965-975 -->

> [!TIP]
> Train your medical skill before you try risky surgery. A failed surgery check can cause more damage, not just waste an item.

## Bots do not treat by default

Neurotrauma turns off the basegame bot treatment loop by default, so bots will not pick anyone to treat, including for vanilla afflictions. <!-- source: SharedProject/SharedSource/NT Bot Support/AIObjectiveOverrides.cs:30-50; SharedProject/SharedSource/Config/ConfigData.cs:233-236 -->

> [!WARNING]
> Do not assume a bot will bandage the bleeding crew member next to it. Check your crew yourself, every round.

## Config changes the numbers

Many injury chances and speeds in NT (fractures, dislocations, infections, fall damage and more) are multiplied by server config settings. The default multiplier is 1, and the bundled presets set these to 0.5 ("Easier"), 1 ("Intended") or 1.5 ("Harder"). Numbers in these lessons are the default values unless we say otherwise. <!-- source: SharedProject/SharedSource/Config/ConfigData.cs:13-22; Assets/Content/DefaultPresets/Easier Config Preset.json:2; Assets/Content/DefaultPresets/Intended Config Preset.json:2; Assets/Content/DefaultPresets/Harder Config Preset.json:2 -->

## What is next

This guide follows a medic's round in order:

1. **Reading your patient**: the Health Scanner, the Hematology Analyzer and how to triage.
2. **The medic kit**: what to carry and why.
3. **Stopping the bleeding**: bandages, tourniquets and arterial bleeding.
4. **Blood loss and transfusions**: thresholds, blood types and blood packs.
5. **Fractures and limbs**: breaks, casts and amputations.
6. **Heart, lungs and brain**: the oxygen chain in detail.
7. **Pain, shock and drugs**: what each medicine is for.
8. **Surgery basics**: preparing the patient and the open-and-close sequence.
9. **Surgery procedures**: step-by-step operations.
10. **Treatment order**: what to fix first on a critical patient.
11. **Emergency walkthroughs**: step-by-step rescues.
12. **Mistakes, settings and tips**.

Start with the next lesson. The Health Scanner is the first tool you will need, and it does not show everything. You will see why in a moment.

## Quick check

1. Does a bleeding limb directly reduce the patient's vitality in NT?
<details><summary>Answer</summary>No. Bleeding adds blood loss over time, and the danger comes from blood loss and the hypoxemia it causes.</details>

2. A medic with 30 medical skill tries a check that requires 60. What is the chance it passes?
<details><summary>Answer</summary>50%. The chance is skill divided by requirement, so 30 / 60 = 0.5.</details>

3. Your crew has a bleeding member and a bot is nearby. What should you do?
<details><summary>Answer</summary>Treat the patient yourself. By default, bots do not treat anyone, so do not count on them.</details>
