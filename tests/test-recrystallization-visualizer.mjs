// test-recrystallization-visualizer.mjs
// Test Suite 94: Recrystallization, Solubility Curves & Melting Point Purity Determination
// Standards: IUPAC Physical Organic Chemistry & Vietnam GDPT 2018 (Hóa 11: Phương pháp tách biệt và tinh chế hợp chất hữu cơ - Phương pháp kết tinh)

import assert from 'assert';
import {
  RECRYSTALLIZATION_SUBSTANCES,
  RECRYSTALLIZATION_SOLVENTS,
  interpolateSolubility,
  calculateRecrystallizationYield,
  calculateMeltingPointDepression,
  calculateMixedMeltingPoint,
  getMatchingRecrystallizationSubstance,
} from '../src/domain/recrystallizationEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 94: RECRYSTALLIZATION & MELTING POINT PURITY ENGINE');

let testsPassed = 0;

function runTest(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    process.exit(1);
  }
}

// 1. RECRYSTALLIZATION SOLVENTS CATALOG
runTest('RECRYSTALLIZATION_SOLVENTS defines standard green and organic solvents with accurate physical constants', () => {
  const water = RECRYSTALLIZATION_SOLVENTS.water;
  assert(water);
  assert.strictEqual(water.boilingPointC, 100.0);
  assert.strictEqual(water.freezingPointC, 0.0);
  assert.strictEqual(water.polarityCategory, 'POLAR_PROTIC');

  const ethanol = RECRYSTALLIZATION_SOLVENTS.ethanol;
  assert(ethanol);
  assert.strictEqual(ethanol.boilingPointC, 78.4);

  const etoac = RECRYSTALLIZATION_SOLVENTS.ethyl_acetate;
  assert(etoac);
  assert.strictEqual(etoac.polarityCategory, 'POLAR_APROTIC');
});

// 2. BENCHMARK SUBSTANCES & LITERATURE MELTING POINTS
runTest('RECRYSTALLIZATION_SUBSTANCES contains benzoic acid, acetanilide, aspirin, and KNO3 with exact melting points', () => {
  const benzoic = RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;
  assert(benzoic);
  assert.strictEqual(benzoic.meltingPointPureMinC, 122.0);
  assert.strictEqual(benzoic.meltingPointPureMaxC, 122.5);
  assert(benzoic.meltingPointPureMaxC - benzoic.meltingPointPureMinC <= 0.5, 'Pure range <= 0.5 °C');

  const acetanilide = RECRYSTALLIZATION_SUBSTANCES.acetanilide;
  assert(acetanilide);
  assert.strictEqual(acetanilide.meltingPointPureMinC, 113.5);
  assert.strictEqual(acetanilide.meltingPointPureMaxC, 114.5);

  const aspirin = RECRYSTALLIZATION_SUBSTANCES.aspirin;
  assert(aspirin);
  assert.strictEqual(aspirin.meltingPointPureMinC, 135.0);
  assert.strictEqual(aspirin.meltingPointPureMaxC, 136.0);

  const kno3 = RECRYSTALLIZATION_SUBSTANCES.potassium_nitrate;
  assert(kno3);
  assert.strictEqual(kno3.meltingPointPureMinC, 334.0);
});

// 3. PIECEWISE LINEAR INTERPOLATION OF SOLUBILITY
runTest('interpolateSolubility accurately handles boundary knot points and intermediate temperatures', () => {
  const benzoic = RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;

  // Exact knot point checks
  assert.strictEqual(interpolateSolubility(benzoic, 0), 0.17);
  assert.strictEqual(interpolateSolubility(benzoic, 25), 0.34);
  assert.strictEqual(interpolateSolubility(benzoic, 95), 6.80);

  // Intermediate point check: 50 °C (midpoint between 40 °C: 0.55 and 60 °C: 1.15)
  // Expected = 0.55 + 0.5 * (1.15 - 0.55) = 0.55 + 0.30 = 0.85
  const s50 = interpolateSolubility(benzoic, 50);
  assert.strictEqual(s50, 0.85);

  // Extrapolation guardrails
  assert.strictEqual(interpolateSolubility(benzoic, -10), 0.17);
  assert.strictEqual(interpolateSolubility(benzoic, 120), 6.80);
});

// 4. SOLUBILITY TEMPERATURE GRADIENT INVARIANT
runTest('Benzoic acid solubility in water increases by at least 15-fold from 25 °C to 95 °C', () => {
  const benzoic = RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;
  const sCold = interpolateSolubility(benzoic, 25);
  const sHot = interpolateSolubility(benzoic, 95);

  const foldIncrease = sHot / sCold;
  console.log(`    Benzoic acid solubility: S(25°C) = ${sCold} g vs S(95°C) = ${sHot} g (Fold = ${foldIncrease.toFixed(1)}x)`);
  assert(foldIncrease >= 15.0, 'Must have steep solubility gradient for efficient recrystallization');
});

// 5. THEORETICAL RECRYSTALLIZATION YIELD CALCULATION
runTest('calculateRecrystallizationYield calculates mass recovery and theoretical percentage', () => {
  // 5.0 g crude benzoic acid (90% purity -> 4.5g pure, 0.5g impurity) in 100 mL water at 95 °C, cooled to 4 °C
  // S(95) = 6.80 g/100mL (can dissolve up to 6.80g pure substance) -> all 4.5g dissolved
  // S(4) ~ 0.186 g/100mL -> 0.186g remains in cold mother liquor
  // Theoretical pure recovery ~ 4.5 - 0.186 = 4.314 g
  const res = calculateRecrystallizationYield({
    substanceId: 'benzoic_acid',
    solventId: 'water',
    crudeMassG: 5.0,
    initialPurityPercent: 90.0,
    solventVolumeMl: 100,
    dissolutionTempC: 95,
    crystallizationTempC: 4,
    coolingMode: 'SLOW_CONTROLLED',
    useActivatedCharcoal: false,
  });

  assert.strictEqual(res.pureSubstanceInitialG, 4.5);
  assert.strictEqual(res.impurityInitialG, 0.5);
  assert(res.recoveredCrystalsMassG > 4.2 && res.recoveredCrystalsMassG < 4.4);
  assert(res.theoreticalRecoveryPercent > 94.0);
  assert(res.actualYieldPercent > 84.0);
  assert(res.purifiedPurityPercent >= 99.0);
  assert.strictEqual(res.isPureSharp, true);
});

// 6. COOLING RATE EFFECT: SLOW VS SHOCK COOLING
runTest('Slow controlled cooling yields high purity & sharp mp; Shock cooling traps impurity', () => {
  const slowRes = calculateRecrystallizationYield({
    substanceId: 'benzoic_acid',
    solventId: 'water',
    crudeMassG: 5.0,
    initialPurityPercent: 85.0,
    solventVolumeMl: 100,
    dissolutionTempC: 95,
    crystallizationTempC: 4,
    coolingMode: 'SLOW_CONTROLLED',
    useActivatedCharcoal: false,
  });

  const shockRes = calculateRecrystallizationYield({
    substanceId: 'benzoic_acid',
    solventId: 'water',
    crudeMassG: 5.0,
    initialPurityPercent: 85.0,
    solventVolumeMl: 100,
    dissolutionTempC: 95,
    crystallizationTempC: 4,
    coolingMode: 'SHOCK_ICE_BATH',
    useActivatedCharcoal: false,
  });

  console.log(`    Slow purity: ${slowRes.purifiedPurityPercent}% (range ${slowRes.meltingRangeC}°C) vs Shock purity: ${shockRes.purifiedPurityPercent}% (range ${shockRes.meltingRangeC}°C)`);
  assert(slowRes.purifiedPurityPercent > shockRes.purifiedPurityPercent, 'Slow cooling must produce purer crystals');
  assert(slowRes.meltingRangeC < shockRes.meltingRangeC, 'Slow cooling must have narrower melting range');
  assert.strictEqual(slowRes.isPureSharp, true);
  assert.strictEqual(shockRes.isPureSharp, false);
});

// 7. ACTIVATED CHARCOAL EFFECT
runTest('Activated charcoal option accounts for slight adsorption loss while documenting decolorization', () => {
  const withCarbon = calculateRecrystallizationYield({
    substanceId: 'acetanilide',
    solventId: 'water',
    crudeMassG: 5.0,
    initialPurityPercent: 90.0,
    solventVolumeMl: 100,
    dissolutionTempC: 100,
    crystallizationTempC: 4,
    coolingMode: 'SLOW_CONTROLLED',
    useActivatedCharcoal: true,
  });

  const withoutCarbon = calculateRecrystallizationYield({
    substanceId: 'acetanilide',
    solventId: 'water',
    crudeMassG: 5.0,
    initialPurityPercent: 90.0,
    solventVolumeMl: 100,
    dissolutionTempC: 100,
    crystallizationTempC: 4,
    coolingMode: 'SLOW_CONTROLLED',
    useActivatedCharcoal: false,
  });

  assert(withCarbon.recoveredCrystalsMassG < withoutCarbon.recoveredCrystalsMassG, 'Carbon incurs small mechanical loss');
  assert(withCarbon.operationalStepsVI.some(s => s.includes('than hoạt tính')));
});

// 8. SOLVENT VOLUME INSUFFICIENCY CAP
runTest('Inadequate solvent volume limits dissolution of pure substance', () => {
  // At 95 °C, S = 6.80 g/100 mL -> in 20 mL water, max dissolved = 1.36 g
  // Crude sample has 4.5 g pure benzoic acid.
  const res = calculateRecrystallizationYield({
    substanceId: 'benzoic_acid',
    solventId: 'water',
    crudeMassG: 5.0,
    initialPurityPercent: 90.0,
    solventVolumeMl: 20, // Too small!
    dissolutionTempC: 95,
    crystallizationTempC: 4,
    coolingMode: 'SLOW_CONTROLLED',
    useActivatedCharcoal: false,
  });

  assert.strictEqual(res.massDissolvedAtHotG, 1.36);
  assert(res.recoveredCrystalsMassG <= 1.36);
});

// 9. MELTING POINT DEPRESSION CALCULATION
runTest('calculateMeltingPointDepression models depression and range widening as purity decreases', () => {
  const benzoic = RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;

  const pureMp = calculateMeltingPointDepression(benzoic, 100.0, 'SLOW_CONTROLLED');
  assert.strictEqual(pureMp.onsetC, 122.0);
  assert.strictEqual(pureMp.clearC, 122.5);
  assert.strictEqual(pureMp.rangeC, 0.5);
  assert.strictEqual(pureMp.isPureSharp, true);

  const impureMp = calculateMeltingPointDepression(benzoic, 92.0, 'SLOW_CONTROLLED');
  assert(impureMp.onsetC < 122.0, 'Impure sample must have lower onset melting temperature');
  assert(impureMp.rangeC > 2.0, 'Impure sample must have widened melting range');
  assert.strictEqual(impureMp.isPureSharp, false);
});

// 10. MIXED MELTING POINT PURITY IDENTIFICATION
runTest('calculateMixedMeltingPoint reliably distinguishes identical substances from different substances', () => {
  // Case A: Identical (Benzoic acid + Benzoic acid standard)
  const same = calculateMixedMeltingPoint('benzoic_acid', 'benzoic_acid', 0.5);
  assert.strictEqual(same.areIdentical, true);
  assert.strictEqual(same.depressionC, 0.0);
  assert.strictEqual(same.expectedMeltingPointC, 122.0);
  assert(same.verdictVI.includes('Hai mẫu đồng nhất'));

  // Case B: Different (Benzoic acid + Acetanilide)
  const diff = calculateMixedMeltingPoint('benzoic_acid', 'acetanilide', 0.5);
  assert.strictEqual(diff.areIdentical, false);
  assert(diff.depressionC >= 10.0, 'Different substances exhibit severe eutectic depression');
  assert(diff.meltingRangeC >= 8.0, 'Different substances exhibit broad melting range');
  assert(diff.verdictVI.includes('Hai chất khác nhau'));
});

// 11. OPERATIONAL PROTOCOL STEPS AUDIT
runTest('Recrystallization protocol generates comprehensive 6-step laboratory procedure', () => {
  const res = calculateRecrystallizationYield({
    substanceId: 'benzoic_acid',
    solventId: 'water',
    crudeMassG: 5.0,
    initialPurityPercent: 90.0,
    solventVolumeMl: 80,
    dissolutionTempC: 95,
    crystallizationTempC: 4,
    coolingMode: 'SLOW_CONTROLLED',
    useActivatedCharcoal: true,
  });

  assert.strictEqual(res.operationalStepsVI.length, 6);
  assert(res.operationalStepsVI[0].includes('Cân chính xác'));
  assert(res.operationalStepsVI[1].includes('Hòa tan nóng'));
  assert(res.operationalStepsVI[2].includes('than hoạt tính'));
  assert(res.operationalStepsVI[3].includes('nguội') || res.operationalStepsVI[3].includes('Làm lạnh'));
  assert(res.operationalStepsVI[4].includes('Lọc hút chân không'));
  assert(res.operationalStepsVI[5].includes('Thu hồi'));
});

// 12. ZERO & BOUNDARY PARAMETERS
runTest('calculateRecrystallizationYield safely handles zero or minimum mass', () => {
  const res = calculateRecrystallizationYield({
    substanceId: 'benzoic_acid',
    solventId: 'water',
    crudeMassG: 0,
    initialPurityPercent: 50.0,
    solventVolumeMl: 5,
    dissolutionTempC: 95,
    crystallizationTempC: 4,
    coolingMode: 'SLOW_CONTROLLED',
    useActivatedCharcoal: false,
  });

  assert(res.recoveredCrystalsMassG >= 0);
  assert(res.theoreticalRecoveryPercent >= 0);
});

// 13. CARD MATCHING HELPER
runTest('getMatchingRecrystallizationSubstance accurately maps cards to benchmark substances', () => {
  const matchBenzoic = getMatchingRecrystallizationSubstance({ name: 'Axit Benzoic C6H5COOH' });
  assert(matchBenzoic);
  assert.strictEqual(matchBenzoic.id, 'benzoic_acid');

  const matchAcetanilide = getMatchingRecrystallizationSubstance({ name: 'Acetanilide Axetanilit' });
  assert(matchAcetanilide);
  assert.strictEqual(matchAcetanilide.id, 'acetanilide');

  const matchGeneric = getMatchingRecrystallizationSubstance({ name: 'Kỹ thuật kết tinh lại' });
  assert(matchGeneric);
  assert.strictEqual(matchGeneric.id, 'benzoic_acid');

  const matchRandom = getMatchingRecrystallizationSubstance({ name: 'Argon Gas' });
  assert.strictEqual(matchRandom, null);
});

// 14. PROCEDURAL SOUND ENGINE TRIGGERS
runTest('sound engine contains playCrystalGrowthChime and playMeltingPointThawSizzle', () => {
  assert.strictEqual(typeof sound.playCrystalGrowthChime, 'function');
  assert.strictEqual(typeof sound.playMeltingPointThawSizzle, 'function');
});

// 15. VISUALIZER COMPONENT INTEGRITY
runTest('RecrystallizationVisualizer.tsx is syntactically sound and exports the component', async () => {
  const fs = await import('fs');
  const path = await import('path');
  const compPath = path.resolve('src/components/visualizations/RecrystallizationVisualizer.tsx');
  const exists = fs.existsSync(compPath);
  assert.strictEqual(exists, true, 'RecrystallizationVisualizer.tsx must exist');

  const code = fs.readFileSync(compPath, 'utf8');
  assert(code.includes('export const RecrystallizationVisualizer: React.FC'));
  assert(code.includes('calculateRecrystallizationYield'));
  assert(code.includes('calculateMixedMeltingPoint'));
  assert(code.includes('playCrystalGrowthChime'));
});

console.log(`\n🎉 SUITE 94 SUMMARY: ${testsPassed} / 15 TESTS PASSED (100% PASS RATE)`);
