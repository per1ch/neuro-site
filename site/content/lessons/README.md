# Lessons

Thirteen Markdown lessons that teach a new player to be a Neurotrauma medic. `index.json` lists them in reading order.

## Format

- Front matter: `title`, `summary`/`description` (same text), `order`, `section` (getting-started, mechanics, emergencies, tips), `level`/`difficulty` (beginner, intermediate, advanced), `readingTime` (minutes).
- Body: plain Markdown plus GitHub callouts (`> [!TIP]`, `> [!NOTE]`, `> [!WARNING]`, `> [!CAUTION]`) and `<details>` blocks for the quiz answers at the end of each lesson.
- Links: `#/item/<modId>` and `#/affliction/<modId>`, using identifiers from the mod XML.
- Sources: every number from the mod is followed by `<!-- source: path:line -->`, a repo-relative path in [Neurotrauma-CS](https://github.com/LukakoE00/Neurotrauma-CS) at commit `722122a` (2026-11-10). They are hidden when rendered and let anyone re-check a number when the mod updates.

## How the numbers were checked

1. Facts were extracted from the mod's C#, XML and English text, with a file:line for each.
2. Lessons were drafted only from those facts.
3. A second pass re-opened every cited line in the mod, fixed wrong numbers and removed any it couldn't confirm.
4. A script confirmed every cited file and line exists, and every link id exists in the mod. A sample of claims was re-read by hand.

The community guide (the "Neurotrauma and Medical Guide" Trello board) shaped lesson 11's treatment order and kit advice; where it is used, the lesson says so. Where the in-game text and the code disagree, the lessons follow the code and say so in a NOTE.

Numbers assume default server settings. Many injury chances and speeds are server multipliers (default 1).
