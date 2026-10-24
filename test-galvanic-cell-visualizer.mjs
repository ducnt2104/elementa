// test-galvanic-cell-visualizer.mjs
// Test Suite 73: Galvanic Electrochemical Cell & Nernst Equation Visualizer
// Verifies IUPAC Physical Chemistry & Vietnam GDPT 2018 Grade 12 Curriculum Standards

import {
  STANDARD_REDUCTION_POTENTIALS,
  GALVANIC_CELL_PRESETS,
  simulateGalvanicCell,
  getCoupleByElementSymbol
} from './src/domain/electrochemistryEngine.ts';

console.log('🧪 ============================================================');
console.log('🧪 TEST SUITE 73: GALVANIC CELL & NERNST EQUATION (GDPT 2018)');
console.log('🧪 ============================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    if (details) console.error(`     Details: ${details}`);
  }
}

// -------------------------------------------------------------
// TEST GROUP 1: Standard Cell Potential (E°_cell = E°_cathode - E°_anode)
// -------------------------------------------------------------
console.log('--- TEST GROUP 1: Standard Potential of Benchmark Galvanic Cells ---');

// 1. Daniell Cell (Zn - Cu)
const daniell = simulateGalvanicCell({ coupleAId: 'Zn2_Zn', coupleBId: 'Cu2_Cu' });
assert(
  daniell.standardCellPotentialE0 === 1.10,
  'Daniell Cell: E°_cell = +0.34 - (-0.76) = 1.10 V',
  `Got: ${daniell.standardCellPotentialE0}`
);
assert(
  daniell.anode.couple.id === 'Zn2_Zn' && daniell.anode.electrodeSign.includes('Âm'),
  'Daniell Cell: Anode is Zn (negative electrode, oxidation)',
  `Anode: ${daniell.anode.couple.id}`
);
assert(
  daniell.cathode.couple.id === 'Cu2_Cu' && daniell.cathode.electrodeSign.includes('Dương'),
  'Daniell Cell: Cathode is Cu (positive electrode, reduction)',
  `Cathode: ${daniell.cathode.couple.id}`
);
assert(
  daniell.electronsTransferred === 2,
  'Daniell Cell: n = 2 electrons transferred',
  `n = ${daniell.electronsTransferred}`
);

// 2. Magnesium - Copper Cell (Mg - Cu)
const mgCu = simulateGalvanicCell({ coupleAId: 'Mg2_Mg', coupleBId: 'Cu2_Cu' });
assert(
  mgCu.standardCellPotentialE0 === 2.71,
  'Mg - Cu Cell: E°_cell = +0.34 - (-2.37) = 2.71 V (High voltage cell)',
  `Got: ${mgCu.standardCellPotentialE0}`
);
assert(
  mgCu.anode.couple.id === 'Mg2_Mg',
  'Mg - Cu Cell: Anode is Mg',
  `Anode: ${mgCu.anode.couple.id}`
);

// 3. Iron - Copper Cell (Fe - Cu)
const feCu = simulateGalvanicCell({ coupleAId: 'Fe2_Fe', coupleBId: 'Cu2_Cu' });
assert(
  feCu.standardCellPotentialE0 === 0.78,
  'Fe - Cu Cell: E°_cell = +0.34 - (-0.44) = 0.78 V (Electrochemical corrosion model)',
  `Got: ${feCu.standardCellPotentialE0}`
);

// 4. Zinc - Silver Cell (Zn - Ag)
const znAg = simulateGalvanicCell({ coupleAId: 'Zn2_Zn', coupleBId: 'Ag_Ag0' });
assert(
  znAg.standardCellPotentialE0 === 1.56,
  'Zn - Ag Cell: E°_cell = +0.80 - (-0.76) = 1.56 V',
  `Got: ${znAg.standardCellPotentialE0}`
);
assert(
  znAg.electronsTransferred === 2,
  'Zn - Ag Cell: n = 2 electrons transferred (LCM of 1 and 2)',
  `n = ${znAg.electronsTransferred}`
);

// 5. Aluminum - Copper Cell (Al - Cu)
const alCu = simulateGalvanicCell({ coupleAId: 'Al3_Al', coupleBId: 'Cu2_Cu' });
assert(
  alCu.standardCellPotentialE0 === 2.00,
  'Al - Cu Cell: E°_cell = +0.34 - (-1.66) = 2.00 V',
  `Got: ${alCu.standardCellPotentialE0}`
);
assert(
  alCu.electronsTransferred === 6,
  'Al - Cu Cell: n = 6 electrons transferred (LCM of 3 and 2 for 2Al + 3Cu2+ -> 2Al3+ + 3Cu)',
  `n = ${alCu.electronsTransferred}`
);

// -------------------------------------------------------------
// TEST GROUP 2: Nernst Equation Concentration Dependence
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 2: Nernst Equation & Concentration Shifts ---');

// Standard condition: Q = 1.0 -> E_cell = E°_cell
assert(
  daniell.nonStandardCellPotentialE === daniell.standardCellPotentialE0,
  'Nernst: At [Zn2+] = 1.0 M and [Cu2+] = 1.0 M, Q = 1.0 and E_cell = E°_cell = 1.100 V',
  `E = ${daniell.nonStandardCellPotentialE}`
);

// Diluted Anode: [Zn2+] = 0.01 M, [Cu2+] = 1.0 M -> Q = 0.01
// E = 1.10 - (0.05916 / 2) * log10(0.01) = 1.10 - (0.02958) * (-2) = 1.10 + 0.0592 = 1.159 V
const daniellDilutedAnode = simulateGalvanicCell({
  coupleAId: 'Zn2_Zn',
  coupleBId: 'Cu2_Cu',
  concentrationA: 0.01,
  concentrationB: 1.0
});
assert(
  daniellDilutedAnode.nonStandardCellPotentialE > daniell.standardCellPotentialE0,
  'Nernst: Diluting Anode solution ([Zn2+] = 0.01 M) increases E_cell above 1.10 V (Overcharge effect)',
  `E = ${daniellDilutedAnode.nonStandardCellPotentialE} V`
);
assert(
  Math.abs(daniellDilutedAnode.nonStandardCellPotentialE - 1.159) <= 0.003,
  'Nernst: Precise calculation E_cell ≈ 1.159 V for [Zn2+] = 0.01 M',
  `Got: ${daniellDilutedAnode.nonStandardCellPotentialE}`
);

// Concentrated Anode, Diluted Cathode: [Zn2+] = 2.0 M, [Cu2+] = 0.1 M -> Q = 20
// E < E° due to concentration polarization
const daniellDepleted = simulateGalvanicCell({
  coupleAId: 'Zn2_Zn',
  coupleBId: 'Cu2_Cu',
  concentrationA: 2.0,
  concentrationB: 0.1
});
assert(
  daniellDepleted.nonStandardCellPotentialE < daniell.standardCellPotentialE0,
  'Nernst: High anode conc and low cathode conc decreases E_cell below 1.10 V',
  `E = ${daniellDepleted.nonStandardCellPotentialE} V`
);

// -------------------------------------------------------------
// TEST GROUP 3: Temperature Dependency (Kelvin)
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 3: Temperature Dependency of Nernst Potential ---');

// At T = 353.15 K (80 °C) with Q = 0.01
const daniellHot = simulateGalvanicCell({
  coupleAId: 'Zn2_Zn',
  coupleBId: 'Cu2_Cu',
  concentrationA: 0.01,
  concentrationB: 1.0,
  temperatureKelvin: 353.15
});
assert(
  daniellHot.nonStandardCellPotentialE > daniellDilutedAnode.nonStandardCellPotentialE,
  'Temperature: Higher temperature (80 °C) magnifies the Nernst concentration shift term (2.303 RT/nF)',
  `E at 80°C = ${daniellHot.nonStandardCellPotentialE} V vs 25°C = ${daniellDilutedAnode.nonStandardCellPotentialE} V`
);
assert(
  daniellHot.temperatureKelvin === 353.15,
  'Temperature: Stored temperatureKelvin is exactly 353.15 K',
  `Got: ${daniellHot.temperatureKelvin}`
);

// -------------------------------------------------------------
// TEST GROUP 4: Thermodynamic Spontaneity & Gibbs Free Energy
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 4: Gibbs Free Energy & Equilibrium Constant ---');

assert(
  daniell.gibbsFreeEnergyDeltaG0Kj === -212.3,
  'Gibbs Free Energy: ΔG° = -n F E° = -2 * 96485 * 1.10 / 1000 = -212.3 kJ/mol',
  `Got: ${daniell.gibbsFreeEnergyDeltaG0Kj}`
);
assert(
  daniell.isSpontaneous === true,
  'Spontaneity: Daniell cell is spontaneous (E° > 0, ΔG° < 0)',
  `isSpontaneous: ${daniell.isSpontaneous}`
);
assert(
  daniell.equilibriumConstantK > 1e30,
  'Equilibrium Constant: K > 10^30 (reaction goes essentially to completion)',
  `K = ${daniell.equilibriumConstantK}`
);

// -------------------------------------------------------------
// TEST GROUP 5: Element Symbol to Couple Resolution
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 5: Element Symbol to Half-Cell Couple Resolution ---');

const znCouple = getCoupleByElementSymbol('Zn');
assert(
  znCouple && znCouple.id === 'Zn2_Zn' && znCouple.standardPotentialE0 === -0.76,
  'Resolution: "Zn" resolves to Zn2+/Zn couple (E° = -0.76 V)',
  `Couple: ${znCouple?.id}`
);

const cuCouple = getCoupleByElementSymbol('Cu');
assert(
  cuCouple && cuCouple.id === 'Cu2_Cu' && cuCouple.standardPotentialE0 === 0.34,
  'Resolution: "Cu" resolves to Cu2+/Cu couple (E° = +0.34 V)',
  `Couple: ${cuCouple?.id}`
);

const agCouple = getCoupleByElementSymbol('Ag');
assert(
  agCouple && agCouple.id === 'Ag_Ag0' && agCouple.standardPotentialE0 === 0.80,
  'Resolution: "Ag" resolves to Ag+/Ag couple (E° = +0.80 V)',
  `Couple: ${agCouple?.id}`
);

const feCouple = getCoupleByElementSymbol('Fe');
assert(
  feCouple && feCouple.id === 'Fe2_Fe' && feCouple.standardPotentialE0 === -0.44,
  'Resolution: "Fe" resolves to Fe2+/Fe couple (E° = -0.44 V)',
  `Couple: ${feCouple?.id}`
);

const unknownCouple = getCoupleByElementSymbol('Kr');
assert(
  unknownCouple === undefined,
  'Resolution: Noble gas "Kr" correctly returns undefined (no galvanic half-cell)',
  `Couple: ${unknownCouple}`
);

// -------------------------------------------------------------
// TEST GROUP 6: Presets Catalog Verification
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 6: Galvanic Cell Presets Integrity ---');

assert(
  GALVANIC_CELL_PRESETS.length >= 6,
  'Presets: At least 6 curriculum benchmark presets defined in GALVANIC_CELL_PRESETS',
  `Count: ${GALVANIC_CELL_PRESETS.length}`
);

let allPresetsValid = true;
GALVANIC_CELL_PRESETS.forEach(preset => {
  const an = STANDARD_REDUCTION_POTENTIALS[preset.anodeCoupleId];
  const cat = STANDARD_REDUCTION_POTENTIALS[preset.cathodeCoupleId];
  if (!an || !cat) {
    allPresetsValid = false;
    console.error(`Invalid couple in preset ${preset.id}`);
  }
  const expectedE0 = Math.round((cat.standardPotentialE0 - an.standardPotentialE0) * 100) / 100;
  if (Math.abs(expectedE0 - preset.standardPotentialE0) > 0.02) {
    allPresetsValid = false;
    console.error(`Preset potential mismatch in ${preset.id}: expected ${expectedE0}, preset ${preset.standardPotentialE0}`);
  }
});
assert(
  allPresetsValid === true,
  'Presets: All benchmark presets reference valid couples and have accurate standard potentials',
  `Valid: ${allPresetsValid}`
);

// -------------------------------------------------------------
// TEST GROUP 7: Edge Cases & Error Rejection
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 7: Defensive Safeguards & Error Rejection ---');

let sameCoupleRejected = false;
try {
  simulateGalvanicCell({ coupleAId: 'Zn2_Zn', coupleBId: 'Zn2_Zn' });
} catch (e) {
  sameCoupleRejected = e.message.includes('khác nhau');
}
assert(
  sameCoupleRejected === true,
  'Safeguard: Identical half-cells are rejected with descriptive error',
  `Rejected: ${sameCoupleRejected}`
);

let zeroConcRejected = false;
try {
  simulateGalvanicCell({ coupleAId: 'Zn2_Zn', coupleBId: 'Cu2_Cu', concentrationA: 0 });
} catch (e) {
  zeroConcRejected = e.message.includes('lớn hơn 0');
}
assert(
  zeroConcRejected === true,
  'Safeguard: Zero concentration is rejected with descriptive error',
  `Rejected: ${zeroConcRejected}`
);

let zeroTempRejected = false;
try {
  simulateGalvanicCell({ coupleAId: 'Zn2_Zn', coupleBId: 'Cu2_Cu', temperatureKelvin: 0 });
} catch (e) {
  zeroTempRejected = e.message.includes('Kelvin');
}
assert(
  zeroTempRejected === true,
  'Safeguard: Zero Kelvin temperature is rejected with descriptive error',
  `Rejected: ${zeroTempRejected}`
);

// -------------------------------------------------------------
// SUMMARY REPORT
// -------------------------------------------------------------
console.log('\n============================================================');
console.log(`📊 TEST SUITE 73 SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
