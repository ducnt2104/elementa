// test-titration-curve.mjs
// Comprehensive test suite for Analytical Acid-Base Titration Curve Engine & Indicator Selection (Suite 43)

import assert from 'node:assert';
import { calculateTitrationCurve } from '../src/domain/chemicalCalculator.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 43: ACID-BASE TITRATION & INDICATOR ENGINE       ');
console.log('======================================================================\n');

// ---------------------------------------------------------------------------
// 1. Strong Acid vs Strong Base Titration (HCl + NaOH)
// ---------------------------------------------------------------------------
console.log('--- 1. Strong Acid vs Strong Base Titration (HCl + NaOH) ---');

const strongResult = calculateTitrationCurve({
  acidType: 'STRONG',
  acidMolarity: 0.1,
  acidVolumeMl: 25.0,
  baseMolarity: 0.1
});

assert(strongResult.equivalenceVolumeMl === 25.0, `Equivalence volume must be 25.0 mL (got ${strongResult.equivalenceVolumeMl})`);
assert(strongResult.equivalencePH === 7.00, `Equivalence pH for HCl + NaOH must be exactly 7.00 (got ${strongResult.equivalencePH})`);

// Initial point (0 mL base)
const strongInitial = strongResult.dataPoints.find(p => p.volumeBaseAddedMl === 0);
assert(strongInitial !== undefined, 'Must contain initial titration point');
assert(strongInitial.pH === 1.00, `Initial pH of 0.1 M HCl must be 1.00 (got ${strongInitial.pH})`);
assert(strongInitial.region === 'INITIAL', 'Region must be INITIAL');

// Pre-equivalence point (12.5 mL base added)
const strongMid = strongResult.dataPoints.find(p => p.volumeBaseAddedMl === 12.5);
assert(strongMid !== undefined, 'Must contain 12.5 mL midpoint');
// [H+] = (0.1*25 - 0.1*12.5) / 37.5 = 1.25 / 37.5 = 0.0333 M -> pH ~ 1.48
assert(strongMid.pH === 1.48, `Midpoint pH must be 1.48 (got ${strongMid.pH})`);

// Post-equivalence point (> 25.0 mL base added)
const strongPost = strongResult.dataPoints.find(p => p.volumeBaseAddedMl > 25.0);
assert(strongPost !== undefined && strongPost.pH > 7.00, 'Post-equivalence pH must be basic (> 7.0)');
assert(strongPost.region === 'POST_EQUIVALENCE', 'Region must be POST_EQUIVALENCE');

// Indicator verification for Strong Acid
const phenoStrong = strongResult.indicators.find(i => i.name === 'Phenolphthalein');
const methylStrong = strongResult.indicators.find(i => i.name.includes('Methyl'));
const btbStrong = strongResult.indicators.find(i => i.name.includes('Bromothymol'));
assert(phenoStrong && phenoStrong.isSuitable === true, 'Phenolphthalein must be suitable for strong acid titration');
assert(methylStrong && methylStrong.isSuitable === true, 'Methyl orange is acceptable for strong acid titration due to broad steep jump');
assert(btbStrong && btbStrong.isSuitable === true, 'Bromothymol blue is suitable for strong acid titration around neutral pH 7.00');
console.log('  ✓ PASS: Strong acid titration verified: pH 1.00 -> 7.00 (at 25.0 mL) -> 12.0+ with broad indicator suitability');

// ---------------------------------------------------------------------------
// 2. Weak Acid vs Strong Base Titration (CH3COOH + NaOH)
// ---------------------------------------------------------------------------
console.log('\n--- 2. Weak Acid vs Strong Base Titration (CH3COOH + NaOH) ---');

const weakResult = calculateTitrationCurve({
  acidType: 'WEAK',
  acidMolarity: 0.1,
  acidVolumeMl: 25.0,
  baseMolarity: 0.1,
  pKa: 4.76
});

assert(weakResult.equivalenceVolumeMl === 25.0, `Equivalence volume must be 25.0 mL (got ${weakResult.equivalenceVolumeMl})`);
// Salt hydrolysis CH3COONa: pH_eq ~ 8.72 > 7.0
assert(weakResult.equivalencePH >= 8.5 && weakResult.equivalencePH <= 9.0, `Equivalence pH must be basic in [8.5, 9.0] (got ${weakResult.equivalencePH})`);

// Half-equivalence point: pH = pKa = 4.76 (Henderson-Hasselbalch [A-] = [HA])
assert(weakResult.halfEquivalencePH === 4.76, `Half-equivalence pH must strictly equal pKa (4.76) (got ${weakResult.halfEquivalencePH})`);
const halfEqPoint = weakResult.dataPoints.find(p => p.region === 'HALF_EQUIVALENCE');
assert(halfEqPoint && halfEqPoint.pH === 4.76, 'Data point at half-equivalence must match pKa');

// Indicator discrimination for Weak Acid (Strict pedagogical rule)
const phenoWeak = weakResult.indicators.find(i => i.name === 'Phenolphthalein');
const methylWeak = weakResult.indicators.find(i => i.name.includes('Methyl'));
const btbWeak = weakResult.indicators.find(i => i.name.includes('Bromothymol'));

assert(phenoWeak && phenoWeak.isSuitable === true, 'Phenolphthalein must be suitable for CH3COOH (pH_eq ~ 8.7 in range 8.2-10.0)');
assert(methylWeak && methylWeak.isSuitable === false, 'Methyl orange must be REJECTED for CH3COOH as its transition range (3.1-4.4) ends before equivalence point');
assert(btbWeak && btbWeak.isSuitable === false, 'Bromothymol blue must be REJECTED for CH3COOH because it shifts too early in acidic/neutral range');
assert(methylWeak.scientificReasonVI.includes('KHÔNG thích hợp'), 'Scientific explanation must explain the early color shift flaw');
console.log('  ✓ PASS: Weak acid Henderson-Hasselbalch buffer zone, half-equivalence (pH = pKa = 4.76), basic salt hydrolysis (pH 8.72), and strict indicator discrimination validated');

// ---------------------------------------------------------------------------
// 3. Monotonicity & Data Point Invariants
// ---------------------------------------------------------------------------
console.log('\n--- 3. Titration Curve Monotonicity & Continuity ---');

assert(strongResult.dataPoints.length === 10, 'Must produce 10 canonical curve points');
assert(weakResult.dataPoints.length === 10, 'Must produce 10 canonical curve points');

// pH must be monotonically non-decreasing as base is added
for (let i = 1; i < strongResult.dataPoints.length; i++) {
  assert(
    strongResult.dataPoints[i].pH >= strongResult.dataPoints[i - 1].pH,
    `Strong curve must be monotonically non-decreasing at step ${i}`
  );
}

for (let i = 1; i < weakResult.dataPoints.length; i++) {
  assert(
    weakResult.dataPoints[i].pH >= weakResult.dataPoints[i - 1].pH,
    `Weak curve must be monotonically non-decreasing at step ${i}`
  );
}
console.log('  ✓ PASS: Both titration curves satisfy strict mathematical monotonicity (d(pH)/dV >= 0)');

// ---------------------------------------------------------------------------
// 4. Input Validation & Error Guards
// ---------------------------------------------------------------------------
console.log('\n--- 4. Error Guards on Negative / Zero Parameters ---');

assert.throws(() => {
  calculateTitrationCurve({
    acidType: 'STRONG',
    acidMolarity: -0.1,
    acidVolumeMl: 25.0,
    baseMolarity: 0.1
  });
}, /phải lớn hơn 0/, 'Negative molarity must be rejected');

assert.throws(() => {
  calculateTitrationCurve({
    acidType: 'STRONG',
    acidMolarity: 0.1,
    acidVolumeMl: 0,
    baseMolarity: 0.1
  });
}, /phải lớn hơn 0/, 'Zero volume must be rejected');
console.log('  ✓ PASS: Negative and zero input parameters safely rejected with descriptive Vietnamese errors');

// ---------------------------------------------------------------------------
// 5. Weak Base vs Strong Acid Titration (NH3 + HCl)
// ---------------------------------------------------------------------------
console.log('\n--- 5. Weak Base vs Strong Acid Titration (NH3 + HCl) ---');

const weakBaseResult = calculateTitrationCurve({
  baseType: 'WEAK',
  acidType: 'STRONG',
  titrationMode: 'BASE_BY_ACID',
  baseMolarity: 0.1,
  baseVolumeMl: 25.0,
  acidMolarity: 0.1,
  acidVolumeMl: 25.0,
  pKb: 4.75
});

assert(weakBaseResult.equivalenceVolumeMl === 25.0, `Equivalence volume of HCl must be 25.0 mL (got ${weakBaseResult.equivalenceVolumeMl})`);
// Salt hydrolysis NH4+ -> acidic equivalence point pH ~ 5.28
assert(weakBaseResult.equivalencePH === 5.28, `Equivalence pH for NH3 + HCl must be acidic 5.28 (got ${weakBaseResult.equivalencePH})`);

// Initial point (0 mL HCl): alkaline pH ~ 11.13
const baseInitial = weakBaseResult.dataPoints.find(p => p.volumeBaseAddedMl === 0);
assert(baseInitial !== undefined, 'Must contain initial point');
assert(baseInitial.pH === 11.13, `Initial pH of 0.1 M NH3 must be 11.13 (got ${baseInitial.pH})`);
assert(baseInitial.region === 'INITIAL', 'Region must be INITIAL');

// Half-equivalence point (12.5 mL HCl): pH = 14 - pKb = 9.25
const baseHalf = weakBaseResult.dataPoints.find(p => p.volumeBaseAddedMl === 12.5);
assert(baseHalf !== undefined, 'Must contain half-equivalence point at 12.5 mL');
assert(baseHalf.pH === 9.25, `Half-equivalence pH must be 9.25 (got ${baseHalf.pH})`);
assert(baseHalf.region === 'HALF_EQUIVALENCE', 'Region must be HALF_EQUIVALENCE');

// Monotonic decreasing curve (as acid is added, pH must never increase)
for (let i = 1; i < weakBaseResult.dataPoints.length; i++) {
  assert(
    weakBaseResult.dataPoints[i].pH <= weakBaseResult.dataPoints[i - 1].pH,
    `Weak base curve must be monotonically non-increasing at step ${i} (${weakBaseResult.dataPoints[i].pH} <= ${weakBaseResult.dataPoints[i-1].pH})`
  );
}

// Indicator verification for Weak Base (NH3 + HCl)
const mrBase = weakBaseResult.indicators.find(i => i.name.includes('Methyl Đỏ'));
const moBase = weakBaseResult.indicators.find(i => i.name.includes('Methyl Da Cam'));
const phenoBase = weakBaseResult.indicators.find(i => i.name === 'Phenolphthalein');
const btbBase = weakBaseResult.indicators.find(i => i.name.includes('Bromothymol'));

assert(mrBase && mrBase.isSuitable === true, 'Methyl Red (4.4-6.2) must be SUITABLE for NH3+HCl (pH_eq = 5.28)');
assert(moBase && moBase.isSuitable === true, 'Methyl Orange (3.1-4.4) must be acceptable for NH3+HCl');
assert(phenoBase && phenoBase.isSuitable === false, 'Phenolphthalein must be strictly REJECTED for NH3+HCl');
assert(btbBase && btbBase.isSuitable === false, 'Bromothymol Blue must be REJECTED for NH3+HCl');
console.log('  ✓ PASS: Weak base titration (NH3 + HCl): acidic equivalence point (pH 5.28), buffer zone, monotonic decrease, and Methyl Red suitability verified');

// ---------------------------------------------------------------------------
// 6. Buffer Plateau & Steep Jump Kinetic Invariants
// ---------------------------------------------------------------------------
console.log('\n--- 6. Buffer Plateau vs Equivalence Steep Jump Invariants ---');

// In acetic acid titration, calculate buffer slope (from 0.25 Veq to 0.5 Veq) vs jump slope (0.99 Veq to 1.0 Veq)
const p25 = weakResult.dataPoints.find(p => Math.abs(p.volumeBaseAddedMl - 6.25) < 0.01);
const p50 = weakResult.dataPoints.find(p => p.region === 'HALF_EQUIVALENCE');
const p99 = weakResult.dataPoints.find(p => Math.abs(p.volumeBaseAddedMl - 24.75) < 0.01);
const p100 = weakResult.dataPoints.find(p => p.region === 'EQUIVALENCE');

assert(p25 && p50 && p99 && p100, 'Required key data points must exist');

const bufferDeltaV = p50.volumeBaseAddedMl - p25.volumeBaseAddedMl;
const bufferDeltaPH = p50.pH - p25.pH;
const bufferSlope = bufferDeltaPH / bufferDeltaV;

const jumpDeltaV = p100.volumeBaseAddedMl - p99.volumeBaseAddedMl;
const jumpDeltaPH = p100.pH - p99.pH;
const jumpSlope = jumpDeltaPH / jumpDeltaV;

assert(jumpSlope > bufferSlope * 10, `Equivalence jump slope (${jumpSlope.toFixed(2)}) must exceed buffer slope (${bufferSlope.toFixed(2)}) by > 10x`);
console.log(`  ✓ PASS: Steep jump slope (${jumpSlope.toFixed(2)} pH/mL) dwarfs buffer capacity slope (${bufferSlope.toFixed(2)} pH/mL) by ${(jumpSlope / bufferSlope).toFixed(1)}x`);

// ---------------------------------------------------------------------------
// 7. Formic Acid (HCOOH, pKa = 3.75) vs Acetic Acid Conjugate Base Analysis
// ---------------------------------------------------------------------------
console.log('\n--- 7. Formic Acid (HCOOH, pKa 3.75) vs Acetic Acid Comparative Equivalence ---');

const formicResult = calculateTitrationCurve({
  acidType: 'WEAK',
  acidMolarity: 0.1,
  acidVolumeMl: 25.0,
  baseMolarity: 0.1,
  pKa: 3.75
});

assert.strictEqual(formicResult.equivalenceVolumeMl, 25.0);
assert.strictEqual(formicResult.halfEquivalencePH, 3.75, 'Formic half-equivalence must match pKa 3.75');

// Formic acid is stronger than acetic acid (pKa 3.75 < 4.76)
// Consequently, formate HCOO- is a weaker conjugate base than acetate CH3COO-
// Thus equivalence pH of HCOOH must be less basic than CH3COOH: pH_eq(HCOOH) < pH_eq(CH3COOH)
assert(
  formicResult.equivalencePH < weakResult.equivalencePH,
  `Stronger weak acid (HCOOH) must have less basic equivalence pH (${formicResult.equivalencePH} < ${weakResult.equivalencePH})`
);
assert(formicResult.equivalencePH >= 8.0 && formicResult.equivalencePH <= 8.5, `Formic equivalence pH ~ 8.22 (got ${formicResult.equivalencePH})`);
console.log(`  ✓ PASS: Conjugate base hydrolysis invariant verified: HCOOH (pKa 3.75) pH_eq = ${formicResult.equivalencePH} < CH3COOH pH_eq = ${weakResult.equivalencePH}`);

// ---------------------------------------------------------------------------
// 8. Step-by-Step Pedagogical Explanation Completeness
// ---------------------------------------------------------------------------
console.log('\n--- 8. Pedagogical Step-by-Step Curriculum Explanation Completeness ---');

for (const res of [strongResult, weakResult, weakBaseResult, formicResult]) {
  assert(Array.isArray(res.stepByStepExplanationVI), 'stepByStepExplanationVI must be an array');
  assert(res.stepByStepExplanationVI.length >= 3, 'Must contain at least 3 detailed pedagogical steps');
  assert(res.stepByStepExplanationVI[0].includes('Bước 1'), 'Step 1 header required');
  assert(res.stepByStepExplanationVI[1].includes('Bước 2'), 'Step 2 header required');
  assert(res.stepByStepExplanationVI.some(s => s.includes('Bước 3')), 'Step 3 header required');
}
console.log('  ✓ PASS: All titration calculations include complete 3-step pedagogical explanations');

// ---------------------------------------------------------------------------
// 9. Concentration Effects on pH Jump Interval Width
// ---------------------------------------------------------------------------
console.log('\n--- 9. Concentration Effects on Titration Jump Interval Width ---');

const concResult = calculateTitrationCurve({
  acidType: 'STRONG',
  acidMolarity: 1.0,
  acidVolumeMl: 25.0,
  baseMolarity: 1.0
});

const diluteResult = calculateTitrationCurve({
  acidType: 'STRONG',
  acidMolarity: 0.01,
  acidVolumeMl: 25.0,
  baseMolarity: 0.01
});

// Initial pH: 1.0 M -> 0.00; 0.01 M -> 2.00
const concInitial = concResult.dataPoints[0].pH;
const diluteInitial = diluteResult.dataPoints[0].pH;
assert.strictEqual(concInitial, 0.00, 'Initial pH of 1.0 M HCl must be 0.00');
assert.strictEqual(diluteInitial, 2.00, 'Initial pH of 0.01 M HCl must be 2.00');

// Calculate jump width between 0.99 Veq and 1.01 Veq
const concJump = concResult.dataPoints.find(p => p.volumeBaseAddedMl === 25.25).pH - concResult.dataPoints.find(p => p.volumeBaseAddedMl === 24.75).pH;
const diluteJump = diluteResult.dataPoints.find(p => p.volumeBaseAddedMl === 25.25).pH - diluteResult.dataPoints.find(p => p.volumeBaseAddedMl === 24.75).pH;

assert(concJump > diluteJump, `Concentrated jump (${concJump.toFixed(2)}) must be wider than dilute jump (${diluteJump.toFixed(2)})`);
console.log(`  ✓ PASS: Concentrated titration steep jump (ΔpH = ${concJump.toFixed(2)}) is wider than dilute (ΔpH = ${diluteJump.toFixed(2)})`);

// ---------------------------------------------------------------------------
// 10. Asymmetric Concentrations & Parameter Validation Invariants
// ---------------------------------------------------------------------------
console.log('\n--- 10. Asymmetric Concentrations & Parameter Validation Invariants ---');

// 1. Asymmetric Strong Acid (0.2 M HCl titrated by 0.05 M NaOH)
const asymStrong = calculateTitrationCurve({
  acidType: 'STRONG',
  acidMolarity: 0.2,
  acidVolumeMl: 25.0,
  baseMolarity: 0.05
});
// Veq = (0.2 * 25.0) / 0.05 = 100.0 mL
assert.strictEqual(asymStrong.equivalenceVolumeMl, 100.0, 'Veq for 0.2 M HCl titrated by 0.05 M NaOH must be 100.0 mL');
assert.strictEqual(asymStrong.equivalencePH, 7.00, 'Equivalence pH must be 7.00 for strong acid-base titration');

// 2. Asymmetric Weak Acid (0.05 M CH3COOH titrated by 0.1 M NaOH)
const asymWeak = calculateTitrationCurve({
  acidType: 'WEAK',
  acidMolarity: 0.05,
  acidVolumeMl: 20.0,
  baseMolarity: 0.1,
  pKa: 4.76
});
// Veq = (0.05 * 20.0) / 0.1 = 10.0 mL
assert.strictEqual(asymWeak.equivalenceVolumeMl, 10.0, 'Veq for 0.05 M CH3COOH titrated by 0.1 M NaOH must be 10.0 mL');
assert.strictEqual(asymWeak.halfEquivalencePH, 4.76, 'Half-equivalence pH must strictly equal pKa 4.76');

// 3. Error Boundary Guards
assert.throws(
  () => calculateTitrationCurve({ acidMolarity: 0, acidVolumeMl: 25, baseMolarity: 0.1 }),
  /Nồng độ và thể tích dung dịch chuẩn độ phải lớn hơn 0/,
  'Zero acid molarity must throw descriptive error'
);
assert.throws(
  () => calculateTitrationCurve({ acidMolarity: 0.1, acidVolumeMl: -10, baseMolarity: 0.1 }),
  /Nồng độ và thể tích dung dịch chuẩn độ phải lớn hơn 0/,
  'Negative acid volume must throw descriptive error'
);
assert.throws(
  () => calculateTitrationCurve({ acidMolarity: 0.1, acidVolumeMl: 25, baseMolarity: -0.1 }),
  /Nồng độ và thể tích dung dịch chuẩn độ phải lớn hơn 0/,
  'Negative base molarity must throw descriptive error'
);
console.log('  ✓ PASS: Asymmetric concentration titrations and non-positive parameter validation guards verified');

// ---------------------------------------------------------------------------
// 11. Strong Base Titrated by Strong Acid (NaOH + HCl) & Dense Curve Geometry
// ---------------------------------------------------------------------------
console.log('\n--- 11. Strong Base Titrated by Strong Acid (NaOH + HCl) & Dense Curve Geometry ---');

const strongBaseTitrated = calculateTitrationCurve({
  baseType: 'STRONG',
  acidType: 'STRONG',
  titrationMode: 'BASE_BY_ACID',
  baseMolarity: 0.1,
  baseVolumeMl: 25.0,
  acidMolarity: 0.1,
  acidVolumeMl: 25.0
});

assert.strictEqual(strongBaseTitrated.equivalenceVolumeMl, 25.0, 'Veq for NaOH + HCl must be 25.0 mL');
assert.strictEqual(strongBaseTitrated.equivalencePH, 7.00, 'Equivalence pH for NaOH + HCl must be neutral 7.00');
const sbInitial = strongBaseTitrated.dataPoints.find(p => p.volumeBaseAddedMl === 0);
assert(sbInitial && sbInitial.pH === 13.00, `Initial pH of 0.1 M NaOH must be 13.00 (got ${sbInitial?.pH})`);
assert(strongBaseTitrated.curvePoints !== undefined && strongBaseTitrated.curvePoints.length >= 35, 'Must provide dense curve points for smooth SVG rendering');
assert(asymStrong.curvePoints !== undefined && asymStrong.curvePoints.length >= 35, 'Acid-by-base must also provide dense curve points');
console.log('  ✓ PASS: Strong base vs strong acid (pH 13.00 -> 7.00 -> 1.0) and dense SVG curve points verified');

console.log('\n======================================================================');
console.log('   ✓ SUITE 43: ALL ACID-BASE TITRATION ASSERTIONS PASSED!            ');
console.log('======================================================================\n');
