# Possible bugs in Neurotrauma-CS seen while extracting (not tested in game)

Found by reading the code at mod commit 722122a. Each one needs an in-game check before anyone calls it a bug.

- **Blood type check:** `InfuseBloodpack` (NTItemsData.cs ~L74-100) tests `targettype.Contains("a")`. Every "*_negative" type contains an "a", so Rh-negative patients (O-, B-) count as having antigen A and can take A packs without hemotransfusion shock.
- **Liver transplant:** when the old liver was removed (damage 100), the code subtracts liver damage twice.
- **Transplants:** liver, heart and lung transplants used as a swap are not consumed if the old organ was 90% damaged or more.
- **Bone regrowth:** the regrowth check counts `bonegrowth`, not `stimulatedbonegrowth`.
- **`afpressuredrug`:** it lowers the blood pressure target, but its comment says it raises it.
- **Pressure meds:** the C# effect may stack with the XML effect, giving a double dose. Not confirmed.
- **Multiscalpel:** the "speedflex" mode on the head seems to do nothing.
- **Infected cavity:** never adds sepsis directly. Sepsis is only rolled on limbs that have a foreign body.
