# ELEMENTA — MOBA Systems & Real-Time Arena Specification
**Project:** ELEMENTA — Tactical Chemistry Trading Card Game & Interactive Learning Platform  
**Document Code:** MOBA-SYS-v2.0  
**Generated Date:** 2026-10-21  

---

## 1. High-Level Concept
The MOBA mode in ELEMENTA is a 60 FPS real-time top-down elemental battlefield. Two teams of elemental champions compete to control 3 lanes, destroy enemy turrets, and overload the opposing team's core chemical reactor.

---

## 2. Champion Roster (12 Elemental Heroes)

| Hero Symbol | Hero Name | Class / Role | Primary Chemical Mechanic | Signature Ability |
| :--- | :--- | :--- | :--- | :--- |
| **Na** | Sodium — Hiệp Sĩ Kiềm | Fighter / Initiator | Water Explosion | *Alkali Burst:* High AoE damage when stepping into river zones. |
| **Cl** | Chlorine — Hắc Xà Ăn Mòn | Mage / Assassin | Oxidation & Toxic Gas | *Chlorine Cloud:* Lingering AoE that reduces armor and blinds enemies. |
| **Fe** | Iron — Hiệp Sĩ Đa Hóa Trị | Tank | Multivalent Stance Shift | *Redox Aegis:* Swaps between Fe²⁺ high DEF and Fe³⁺ aggressive ATK. |
| **Cu** | Copper — Dẫn Điện Thần Tốc | Marksman | Electrical Conductivity | *Conduit Spark:* Chained lightning attacks between nearby enemies. |
| **Al** | Aluminum — Khiên Thụ Động | Tank / Fighter | Oxide Passivation | *Alumina Shield:* Temporary invulnerability after taking heavy damage. |
| **O** | Oxygen — Hơi Thở Thiêu Đốt | Support / Mage | Combustion Catalyst | *Hyper-Oxidation:* Amplifies Pyro skill damage by 40%. |
| **H** | Hydrogen — Khởi Nguyên Vũ Trụ | Support | Mobile Reagent | *Hydron Surge:* Rapid burst heal and steam explosion with Oxygen. |
| **Ba** | Barium — Trầm Tích Hoàng Thổ | Vanguard Tank | Insoluble Precipitation | *Sulfate Bulwark:* Creates impassable terrain walls. |
| **C** | Carbon — Khung Xương Sự Sống | Bruiser / Fighter | Allotropic Polymorphism | *Diamond Edge:* True damage attacks ignoring enemy armor. |
| **S** | Sulfur — Hỏa Thần Núi Lửa | Mage | Acid Corrosion & Smoke | *Contact V2O5:* Summons acidic geysers with stacking burn DoT. |
| **Ca** | Calcium — Thần Vệ Xương Cốt | Support Tank | Mineral Fortification | *Bone Citadel:* Grants team-wide defense aura. |
| **He** | Helium — Bát Tử Bất Hoại | Specialist | Closed Octet Ward | *Absolute Inertia:* Complete immunity to chemical debuffs and crowd control. |

---

## 3. Map Architecture & Simulation Loop

### 3.1. Field Geometry & Lanes
- **Top Lane:** The Mountain Pass (Terra / Mineral buffs).
- **River / Mid Lane:** The Aqueous Trench (Water reaction zone: triggers Na explosion, freezes with cryogenic skills).
- **Bot Lane:** The Combustion Trail (Pyro / Volcanic vents).
- **Core Reactors:** 10,000 HP structures guarded by inner and outer defensive turrets.

### 3.2. Minion Waves & Jungle Boss
- **Minion Spawners:** Release wave pairs (Melee Proton Warriors & Caster Electron Mages) every 25 seconds.
- **Catalyst Boss (Platinum Giant Pt):** Neutral objective located in the upper river. Defeating the boss grants a global 20% cooldown reduction and accelerated mana regeneration.

### 3.3. Bot AI Architecture (4 Difficulty Tiers)
- `NOVICE`: Passive lane holding, basic attack targeting nearest enemy.
- `STANDARD`: Rotates to team fights, casts basic skill combos when enemies are in range.
- `ADVANCED`: Uses defensive kiting, targets low-HP squishy mages/marksmen, retreats to turret when HP < 30%.
- `CHALLENGER`: Frame-perfect skill-shot prediction, lead-factor velocity compensation, active item usage, and objective stealing.
