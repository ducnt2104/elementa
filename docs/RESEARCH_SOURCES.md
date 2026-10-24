# ELEMENTA — Research Sources, Scientific Data & Mechanics Mapping
**Project:** ELEMENTA — Chemistry Trading Card Game & Interactive Learning Platform  
**Document Code:** RESEARCH-SOURCES-v1.0  
**Generated Date:** 2026-10-21  

---

## 1. Scientific Standards & Curated Databases

### 1.1. Periodic Table & Elemental Properties
All 118 elemental metrics in ELEMENTA are calibrated directly against official standards from:
- **IUPAC Periodic Table of the Elements (2022 Release):** Standard atomic weights, standard state temperatures, and symbol definitions.
- **NIST Chemistry WebBook (SRD 69):** First ionization energies (\(I_1\)), electron affinities, and standard enthalpy of formation (\(\Delta H_f^\circ\)).
- **Pauling Electronegativity Scale (\(\chi\)):** Electronegativity values for all p-block and non-metal elements used to calculate chemical attack power (\(ATK_{ox}\)).

### 1.2. Reaction Kinetics & Industrial Syntheses
- **Haber-Bosch Nitrogen Fixation:**
  \[
  N_2(g) + 3H_2(g) \rightleftharpoons 2NH_3(g) \quad (\Delta H = -92.4\text{ kJ/mol}, \quad 450^\circ\text{C}, \quad 200\text{ atm}, \quad Fe\text{ catalyst})
  \]
  Directly implemented in `card_spell_haber_synthesis` and `chemicalEnvironment.ts` with pressure and temperature modifiers.
- **Contact Process (Sulfuric Acid Production):**
  \[
  2SO_2 + O_2 \xrightarrow{V_2O_5, 450^\circ\text{C}} 2SO_3; \quad SO_3 + H_2SO_4 \rightarrow H_2S_2O_7; \quad H_2S_2O_7 + H_2O \rightarrow 2H_2SO_4
  \]
  Implemented in `card_spell_contact_process` and `card_comp_h2so4_oleum`.
- **Thermite Redox Reaction:**
  \[
  Fe_2O_3 + 2Al \rightarrow Al_2O_3 + 2Fe \quad (\Delta H = -851.5\text{ kJ/mol}, \quad T > 2500^\circ\text{C})
  \]
  Implemented in `card_comp_thermite` causing instantaneous destruction of opponent defense monsters.

---

## 2. Tactical TCG Mechanics Mapping (Yu-Gi-Oh! Inspiring Principles)

| Classical TCG Concept | Yu-Gi-Oh! Counterpart | ELEMENTA Chemical Adaptation |
| :--- | :--- | :--- |
| **Normal Summon** | Level 1-4 Monster | Element Monster (Z=1 to 20, e.g., Na, Cl, Fe, Al) |
| **Tribute Summon** | Level 5+ Tribute | Star-Sum Tribute: Sum of sacrificed monster stars must meet/exceed target star level, each individual sacrifice having stars < target. |
| **Fusion / Contact Fusion** | Fusion Summon | Compound Synthesis: Combining elemental reactants according to stoichiometric ratios (e.g., \(2H + O \rightarrow H_2O\)). |
| **Link Summoning** | Link Monster / Arrows | Covalent Valence Links: Link rating represents number of shared electron pairs (e.g., \(H-H\) Link 1, \(C=C\) Link 2, \(N\equiv N\) Link 3). |
| **Field Spells** | Field Magic | Chemical Environments: Changes \(pH\), temperature (\(T\)), pressure (\(P\)), and activates catalysts that buff specific reaction families. |
| **Spell Speed 2 / Quick-Play** | Quick-Play Spell | Acid-Base Neutralization, Le Chatelier Shifts, Redox Overdrive. Resolves on a Last-In First-Out (LIFO) chain stack. |
| **Graveyard** | Graveyard (GY) | Oxidation/Reduction Recovery Zone: Matter in the graveyard can be recycled through electro-reduction. |
| **Banished Zone** | Removed from Play | Consumed Matter Zone ("Chết Hơn Chết"): Irreversible thermodynamic dissipation. Cannot be revived by standard graveyard spells. |

---

## 3. Licenses & Attribution
- Educational data and chemical facts are public domain under international scientific dissemination norms.
- Original card art concepts, vector SVG shaders, game engine code, and sound effects are licensed under the MIT License for educational open-source use.
