// test-titration-curve-visualizer.mjs
// Test Suite 74: Acid-Base Titration Curve & Indicator Visualizer
// Verifies Analytical Chemistry & Vietnam GDPT 2018 Grade 11 Curriculum Standards

import assert from 'node:assert';
import {
  calculateTitrationCurve
} from './src/domain/chemicalCalculator.ts';
import {
  TITRATION_SCENARIO_PRESETS
} from './src/components/visualizations/TitrationCurveVisualizer.tsx';

console.log('🧪 ============================================================');
console.log('🧪 TEST SUITE 74: TITRATION CURVE & INDICATOR VISUALIZER       ');
console.log('🧪 ============================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(condition, testName, details = '') {
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
// TEST GROUP 1: Curriculum Scenario Presets
// -------------------------------------------------------------
console.log('--- TEST GROUP 1: Titration Scenario Presets ---');

runTest(
  TITRATION_SCENARIO_PRESETS.length >= 4,
  'Presets: At least 4 curriculum benchmark scenarios defined',
  `Count: ${TITRATION_SCENARIO_PRESETS.length}`
);

const hclScenario = TITRATION_SCENARIO_PRESETS.find(s => s.id === 'hcl_naoh');
runTest(
  hclScenario !== undefined && hclScenario.acidType === 'STRONG' && hclScenario.baseType === 'STRONG',
  'HCl + NaOH scenario is correctly configured as Strong Acid - Strong Base'
);

const aceticScenario = TITRATION_SCENARIO_PRESETS.find(s => s.id === 'ch3cooh_naoh');
runTest(
  aceticScenario !== undefined && aceticScenario.acidType === 'WEAK' && aceticScenario.pKa === 4.76,
  'CH3COOH + NaOH scenario is configured as Weak Acid with pKa = 4.76'
);

const nh3Scenario = TITRATION_SCENARIO_PRESETS.find(s => s.id === 'nh3_hcl');
runTest(
  nh3Scenario !== undefined && nh3Scenario.baseType === 'WEAK' && nh3Scenario.pKb === 4.75,
  'NH3 + HCl scenario is configured as Weak Base with pKb = 4.75'
);

// -------------------------------------------------------------
// TEST GROUP 2: Equivalence Point Calculations
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 2: Equivalence Point Calculations ---');

// 1. Strong Acid vs Strong Base
const strongRes = calculateTitrationCurve({
  acidType: 'STRONG',
  acidMolarity: 0.1,
  acidVolumeMl: 25.0,
  baseMolarity: 0.1
});
runTest(
  strongRes.equivalenceVolumeMl === 25.0,
  'Strong Acid: Equivalence volume Veq = 25.0 mL',
  `Got: ${strongRes.equivalenceVolumeMl}`
);
runTest(
  strongRes.equivalencePH === 7.00,
  'Strong Acid: Equivalence pH = 7.00 (neutral salt NaCl)',
  `Got: ${strongRes.equivalencePH}`
);

// 2. Weak Acid vs Strong Base (CH3COOH)
const weakAcidRes = calculateTitrationCurve({
  acidType: 'WEAK',
  acidMolarity: 0.1,
  acidVolumeMl: 25.0,
  baseMolarity: 0.1,
  pKa: 4.76
});
runTest(
  weakAcidRes.equivalenceVolumeMl === 25.0,
  'Weak Acid: Equivalence volume Veq = 25.0 mL',
  `Got: ${weakAcidRes.equivalenceVolumeMl}`
);
runTest(
  weakAcidRes.equivalencePH >= 8.5 && weakAcidRes.equivalencePH <= 9.0,
  'Weak Acid: Equivalence pH is basic (~8.72) due to CH3COO- salt hydrolysis',
  `Got: ${weakAcidRes.equivalencePH}`
);

// 3. Weak Base vs Strong Acid (NH3)
const weakBaseRes = calculateTitrationCurve({
  baseType: 'WEAK',
  titrationMode: 'BASE_BY_ACID',
  acidMolarity: 0.1,
  baseMolarity: 0.1,
  baseVolumeMl: 25.0,
  pKb: 4.75
});
runTest(
  weakBaseRes.equivalenceVolumeMl === 25.0,
  'Weak Base: Equivalence volume Veq = 25.0 mL',
  `Got: ${weakBaseRes.equivalenceVolumeMl}`
);
runTest(
  weakBaseRes.equivalencePH >= 5.0 && weakBaseRes.equivalencePH <= 5.5,
  'Weak Base: Equivalence pH is acidic (~5.28) due to NH4+ salt hydrolysis',
  `Got: ${weakBaseRes.equivalencePH}`
);

// -------------------------------------------------------------
// TEST GROUP 3: Half-Equivalence & Henderson-Hasselbalch
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 3: Half-Equivalence & Buffer Region ---');

runTest(
  weakAcidRes.halfEquivalencePH === 4.76,
  'Weak Acid: Half-equivalence pH strictly equals pKa (4.76) where [CH3COOH] = [CH3COO-]',
  `Got: ${weakAcidRes.halfEquivalencePH}`
);

runTest(
  weakBaseRes.halfEquivalencePH === 9.25,
  'Weak Base: Half-equivalence pH strictly equals 14 - pKb (14 - 4.75 = 9.25) where [NH3] = [NH4+]',
  `Got: ${weakBaseRes.halfEquivalencePH}`
);

// -------------------------------------------------------------
// TEST GROUP 4: Indicator Suitability Discrimination
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 4: Indicator Suitability Discrimination ---');

// Weak acid CH3COOH: Phenolphthalein is suitable, Methyl Orange rejected
const weakAcidPheno = weakAcidRes.indicators.find(i => i.name === 'Phenolphthalein');
const weakAcidMethyl = weakAcidRes.indicators.find(i => i.name.includes('Methyl Da Cam') || i.name.includes('Methyl Orange'));

runTest(
  weakAcidPheno && weakAcidPheno.isSuitable === true,
  'Weak Acid: Phenolphthalein is SUITABLE (pH range 8.2 - 10.0 covers pH_eq ~ 8.72)'
);
runTest(
  weakAcidMethyl && weakAcidMethyl.isSuitable === false,
  'Weak Acid: Methyl Orange is REJECTED (transition 3.1 - 4.4 ends well before equivalence point)'
);

// Weak base NH3: Methyl Red is suitable, Phenolphthalein rejected
const weakBaseMethylRed = weakBaseRes.indicators.find(i => i.name.includes('Methyl Đỏ') || i.name.includes('Methyl Red'));
const weakBasePheno = weakBaseRes.indicators.find(i => i.name === 'Phenolphthalein');

runTest(
  weakBaseMethylRed && weakBaseMethylRed.isSuitable === true,
  'Weak Base: Methyl Red is SUITABLE (pH range 4.4 - 6.2 covers pH_eq ~ 5.28)'
);
runTest(
  weakBasePheno && weakBasePheno.isSuitable === false,
  'Weak Base: Phenolphthalein is REJECTED (colorless transition occurs far too early in basic buffer)'
);

// Strong acid HCl: Phenolphthalein, Bromothymol blue, and Methyl orange all acceptable
const strongPheno = strongRes.indicators.find(i => i.name === 'Phenolphthalein');
const strongBTB = strongRes.indicators.find(i => i.name.includes('Bromothymol'));
const strongMethyl = strongRes.indicators.find(i => i.name.includes('Methyl'));

runTest(
  strongPheno && strongPheno.isSuitable === true,
  'Strong Acid: Phenolphthalein is suitable (steep jump from 4 to 10)'
);
runTest(
  strongBTB && strongBTB.isSuitable === true,
  'Strong Acid: Bromothymol Blue is suitable (neutral transition around 7.00)'
);
runTest(
  strongMethyl && strongMethyl.isSuitable === true,
  'Strong Acid: Methyl Orange is acceptable due to broad steep jump'
);

// -------------------------------------------------------------
// TEST GROUP 5: Dense SVG Curve Points
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 5: Dense SVG Curve Points & Monotonicity ---');

runTest(
  strongRes.curvePoints && strongRes.curvePoints.length >= 30,
  'Curve: Dense curvePoints array contains at least 30 coordinates for high-def SVG rendering',
  `Length: ${strongRes.curvePoints?.length}`
);

let allPHBounded = true;
let monotonicPreEq = true;
const pts = strongRes.curvePoints || [];
for (let i = 0; i < pts.length; i++) {
  if (pts[i].pH < 0 || pts[i].pH > 14) allPHBounded = false;
  if (i > 0 && pts[i].pH < pts[i - 1].pH) monotonicPreEq = false; // Acid titrated by base must increase in pH
}

runTest(
  allPHBounded === true,
  'Curve: All calculated pH values are strictly bounded in [0.00, 14.00]'
);
runTest(
  monotonicPreEq === true,
  'Curve: Acid-by-base titration curve is strictly monotonically non-decreasing'
);

// -------------------------------------------------------------
// TEST GROUP 6: Safeguards & Error Rejection
// -------------------------------------------------------------
console.log('\n--- TEST GROUP 6: Error Safeguards ---');

let zeroConcRejected = false;
try {
  calculateTitrationCurve({ acidMolarity: 0, baseMolarity: 0.1 });
} catch (e) {
  zeroConcRejected = e.message.includes('lớn hơn 0');
}
runTest(
  zeroConcRejected === true,
  'Safeguard: Zero molarity is rejected with descriptive error'
);

let zeroVolRejected = false;
try {
  calculateTitrationCurve({ acidMolarity: 0.1, baseMolarity: 0.1, acidVolumeMl: 0 });
} catch (e) {
  zeroVolRejected = e.message.includes('lớn hơn 0');
}
runTest(
  zeroVolRejected === true,
  'Safeguard: Zero volume is rejected with descriptive error'
);

// -------------------------------------------------------------
// SUMMARY REPORT
// -------------------------------------------------------------
console.log('\n============================================================');
console.log(`📊 TEST SUITE 74 SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('============================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
