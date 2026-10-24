# ELEMENTA — Chemistry Data Architecture & Reaction Library
**Project:** ELEMENTA — Tactical Chemistry Trading Card Game & Interactive Learning Platform  
**Document Code:** CHEM-DATA-v1.0  
**Generated Date:** 2026-10-21  

---

## 1. 118 Elements Periodic Table Schema

Every element in `src/data/chemicalData.ts` conforms to the strict `ElementData` schema:
```typescript
export interface ElementData {
  atomicNumber: number;        // Z (1 to 118)
  symbol: string;              // e.g. "Na", "Fe", "Og"
  name_vi: string;             // Vietnamese chemical nomenclature
  name_en: string;             // English / IUPAC standard name
  atomicMass: number;          // Standard atomic weight (g/mol)
  category: ElementCategory;   // Alkali, Alkaline Earth, Halogen, Noble Gas, etc.
  period: number;              // 1 to 7
  group: number;               // 1 to 18
  electronConfig: string;      // e.g. "[Ne] 3s¹"
  electronegativity: number | null; // Pauling scale χ
  firstIonizationEnergy: number;    // I₁ in kJ/mol
  oxidationStates: number[];   // Allowed oxidation numbers
  colorToken: string;          // Element theme hex/rgb
  lore: string;                // Scientific significance and discovery
  atk_ox: number;              // Calculated oxidation attack stat [0-100]
  atk_red: number;             // Calculated reduction attack stat [0-100]
  def_stab: number;            // Calculated stability defense stat [0-100]
}
```

### Mathematical Stat Mapping Formulas
1. **Oxidation Attack Power (\(ATK_{ox}\)):**
   \[
   ATK_{ox} = \begin{cases} 
   5 & \text{if Noble Gas (Group 18)} \\
   \min\left(100, \max\left(10, \operatorname{round}\left(10 + \frac{\chi - 0.7}{3.98 - 0.7} \times 90\right)\right)\right) & \text{otherwise}
   \end{cases}
   \]
2. **Reduction Attack Power (\(ATK_{red}\)):**
   \[
   ATK_{red} = \min\left(100, \max\left(5, \operatorname{round}\left(100 - \frac{I_1 - 375}{2372 - 375} \times 95\right)\right)\right)
   \]
3. **Stability Defense Power (\(DEF_{stab}\)):**
   \[
   DEF_{stab} = \operatorname{round}\left(0.4 \times (100 - ATK_{ox}) + 0.6 \times (100 - ATK_{red}) + \beta_{inert}\right)
   \]

---

## 2. Curated Reaction Library & Stoichiometric Verification

### 2.1. Alkali Reactions with Water
\[
2Na + 2H_2O \rightarrow 2NaOH + H_2 \uparrow \quad (\Delta H < 0)
\]
- **Game Effect:** Water Burst dealing 500 direct LP damage when triggered on Aqua fields.

### 2.2. Redox Displacement Series
\[
Fe + CuSO_4 \rightarrow FeSO_4 + Cu \downarrow \quad (E^\circ_{Cu^{2+}/Cu} = +0.34\text{ V} > E^\circ_{Fe^{2+}/Fe} = -0.44\text{ V})
\]
- **Game Effect:** Stronger reducing metal destroys opponent monster with lower standard potential.

### 2.3. Industrial Synthesis Engines
- **Haber-Bosch Nitrogen Fixation:**
  \[
  N_2(g) + 3H_2(g) \xrightleftharpoons[450^\circ\text{C}, 200\text{ atm}]{Fe} 2NH_3(g)
  \]
- **Contact Process (V₂O₅ Catalyst):**
  \[
  2SO_2 + O_2 \xrightleftharpoons[450^\circ\text{C}]{V_2O_5} 2SO_3
  \]
- **Thermite Incineration:**
  \[
  2Al + Fe_2O_3 \xrightarrow{\Delta} Al_2O_3 + 2Fe \quad (T > 2500^\circ\text{C})
  \]

---

## 3. Equation Parser & Conservation Checker
The parser in `chemicalValidator.ts` uses an iterative stack to handle arbitrarily nested chemical formulas (e.g. \(Al_2(SO_4)_3\), \(Ca(OH)_2\), \(K_4[Fe(CN)_6]\)), verifying:
1. Atom count conservation between reactants and products.
2. Net charge balance for ionic equations.
3. Thermodynamic feasibility against standard reduction potentials.
