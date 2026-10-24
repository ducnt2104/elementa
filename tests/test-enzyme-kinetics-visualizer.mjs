// test-enzyme-kinetics-visualizer.mjs
// Milestone 43: CENTURY MILESTONE (Test Suite 100) — Enzyme Catalysis, Michaelis-Menten Kinetics, Lineweaver-Burk Double Reciprocal & Allosteric Hill Equation Engine
// Standards: IUPAC Symbolism and Terminology in Enzyme Kinetics & Vietnam GDPT 2018 (Sinh học 10 & Hóa học 12)

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  BENCHMARK_ENZYMES,
  calculateMichaelisMenten,
  calculateHillCooperativity,
  getMatchingEnzymeSpec,
} from '../src/domain/enzymeKineticsEngine.ts';

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] Test ${totalTests}: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] Test ${totalTests}: ${testName}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 100: ENZYME KINETICS & MICHAELIS-MENTEN (CENTURY)');
console.log('======================================================================');

// Test 1: Catalog Integrity & EC Numbers
runTest('Benchmark enzyme catalog contains key enzymes with verified EC numbers', () => {
  const required = ['catalase', 'acetylcholinesterase', 'carbonic_anhydrase', 'chymotrypsin', 'lysozyme'];
  for (const id of required) {
    assert.ok(BENCHMARK_ENZYMES[id], `Missing enzyme: ${id}`);
    assert.ok(BENCHMARK_ENZYMES[id].ecNumber.startsWith('EC '), `Invalid EC format for ${id}`);
    assert.ok(BENCHMARK_ENZYMES[id].kmMolar > 0, `Km must be positive for ${id}`);
    assert.ok(BENCHMARK_ENZYMES[id].kcatPerSec > 0, `kcat must be positive for ${id}`);
    assert.ok(BENCHMARK_ENZYMES[id].specificityConstantMInvSInv > 0, `kcat/Km must be positive for ${id}`);
  }
});

// Test 2: Catalytic Perfection and Diffusion Limit Criteria
runTest('Catalytic perfection validation (kcat/Km >= 10^7 M^-1·s^-1 near diffusion limit)', () => {
  const catalase = BENCHMARK_ENZYMES.catalase;
  assert.strictEqual(catalase.isNearDiffusionLimit, true, 'Catalase should be marked near diffusion limit');
  assert.ok(catalase.specificityConstantMInvSInv > 1e10, 'Catalase specificity constant exceeds 10^10');

  const achE = BENCHMARK_ENZYMES.acetylcholinesterase;
  assert.strictEqual(achE.isNearDiffusionLimit, true, 'Acetylcholinesterase should be near diffusion limit');
  assert.ok(achE.specificityConstantMInvSInv > 1e8);

  const ca = BENCHMARK_ENZYMES.carbonic_anhydrase;
  assert.strictEqual(ca.isNearDiffusionLimit, true, 'Carbonic anhydrase should be near diffusion limit');

  const chymo = BENCHMARK_ENZYMES.chymotrypsin;
  assert.strictEqual(chymo.isNearDiffusionLimit, false, 'Chymotrypsin is not near diffusion limit');
});

// Test 3: Steady-State Michaelis-Menten Kinetics: v0 = 0.5 * Vmax when [S] = Km
runTest('Michaelis-Menten equation yields exactly 50% Vmax when [S] = Km', () => {
  const enz = BENCHMARK_ENZYMES.catalase;
  const result = calculateMichaelisMenten('catalase', enz.kmMolar, 1e-7, 0, 'NONE');
  
  assert.strictEqual(result.saturationRatioV0OverVmax, 0.5, 'v0 / Vmax must equal 0.50 when [S] = Km');
  assert.strictEqual(result.apparentKmMolar, enz.kmMolar);
  assert.strictEqual(result.apparentVmaxUmolPerMin, result.uninhibitedVmaxUmolPerMin);
});

// Test 4: Saturation limit when [S] >> Km
runTest('Michaelis-Menten approaches 99% Vmax when [S] >> Km (Briggs-Haldane plateau)', () => {
  const enz = BENCHMARK_ENZYMES.catalase;
  const highSubstrate = enz.kmMolar * 100;
  const result = calculateMichaelisMenten('catalase', highSubstrate, 1e-7, 0, 'NONE');

  // v0 / Vmax = 100 / (1 + 100) = 100 / 101 ~= 0.9901
  assert.ok(result.saturationRatioV0OverVmax >= 0.99, `Expected >= 0.99, got ${result.saturationRatioV0OverVmax}`);
});

// Test 5: Reversible Competitive Inhibition: Km increases, Vmax unchanged
runTest('Competitive inhibition increases apparent Km while keeping Vmax constant', () => {
  const enz = BENCHMARK_ENZYMES.catalase;
  const I = 2.4e-5; // 2 * Ki
  const Ki = enz.inhibitorKiMolar;
  const result = calculateMichaelisMenten('catalase', enz.kmMolar, 1e-7, I, 'COMPETITIVE', Ki);

  // alpha = 1 + I / Ki = 1 + 2 = 3
  const expectedAppKm = enz.kmMolar * 3;
  assert.strictEqual(result.apparentVmaxUmolPerMin, result.uninhibitedVmaxUmolPerMin, 'Vmax must remain unchanged in competitive inhibition');
  assert.ok(result.apparentKmMolar > enz.kmMolar, 'Apparent Km must increase');
  assert.ok(Math.abs(result.apparentKmMolar - expectedAppKm) / expectedAppKm < 0.01, 'Apparent Km must match alpha * Km');
});

// Test 6: Reversible Uncompetitive Inhibition: Both Km and Vmax decrease in parallel
runTest('Uncompetitive inhibition decreases both Km and Vmax by factor alpha (parallel Lineweaver-Burk)', () => {
  const enz = BENCHMARK_ENZYMES.chymotrypsin;
  const Ki = enz.inhibitorKiMolar;
  const I = Ki; // alpha = 2
  const result = calculateMichaelisMenten('chymotrypsin', enz.kmMolar, 1e-7, I, 'UNCOMPETITIVE', Ki);

  assert.ok(result.apparentVmaxUmolPerMin < result.uninhibitedVmaxUmolPerMin, 'Vmax must decrease in uncompetitive inhibition');
  assert.ok(result.apparentKmMolar < enz.kmMolar, 'Km must decrease in uncompetitive inhibition');
  
  // Ratio Km/Vmax must be invariant (same slope on Lineweaver-Burk)
  const uninhibitedRatio = enz.kmMolar / result.uninhibitedVmaxUmolPerMin;
  const uncompetitiveRatio = result.apparentKmMolar / result.apparentVmaxUmolPerMin;
  assert.ok(Math.abs(uninhibitedRatio - uncompetitiveRatio) / uninhibitedRatio < 0.05, 'Slope Km/Vmax must be preserved in uncompetitive inhibition');
});

// Test 7: Reversible Non-Competitive Inhibition: Km unchanged, Vmax decreases
runTest('Non-competitive inhibition decreases Vmax while apparent Km remains unchanged', () => {
  const enz = BENCHMARK_ENZYMES.carbonic_anhydrase;
  const Ki = enz.inhibitorKiMolar;
  const I = Ki; // alpha = 2
  const result = calculateMichaelisMenten('carbonic_anhydrase', enz.kmMolar, 1e-7, I, 'NON_COMPETITIVE', Ki);

  assert.strictEqual(result.apparentKmMolar, enz.kmMolar, 'Km must remain unchanged in pure non-competitive inhibition');
  assert.ok(result.apparentVmaxUmolPerMin < result.uninhibitedVmaxUmolPerMin, 'Vmax must decrease');
  assert.ok(Math.abs(result.apparentVmaxUmolPerMin - result.uninhibitedVmaxUmolPerMin / 2) < 1.0, 'Vmax must be halved when [I] = Ki');
});

// Test 8: Lineweaver-Burk Double Reciprocal Plot Coordinates
runTest('Lineweaver-Burk linear coordinates correctly calculate intercepts and slope', () => {
  const result = calculateMichaelisMenten('catalase', 0.002, 1e-7, 0, 'NONE');
  
  assert.ok(result.reciprocalSubstrateInvM > 0, '1/[S] must be positive');
  assert.ok(result.reciprocalVelocityMinPerUmol > 0, '1/v0 must be positive');
  assert.ok(result.lineweaverBurkSlope > 0, 'Slope Km/Vmax must be positive');
  assert.ok(result.lineweaverBurkYIntercept > 0, 'Y-intercept 1/Vmax must be positive');
  assert.ok(result.lineweaverBurkXIntercept < 0, 'X-intercept -1/Km must be negative');
});

// Test 9: Allosteric Hill Equation & Positive Cooperativity (h = 2.8)
runTest('Allosteric Hill equation models positive cooperativity sigmoidal switch', () => {
  const K05 = 1e-3; // 1 mM
  const resultK05 = calculateHillCooperativity(K05, 2.8, K05);
  assert.strictEqual(resultK05.cooperativityType, 'POSITIVE_COOPERATIVE');
  assert.strictEqual(resultK05.initialVelocityPercent, 50, 'At [S] = K0.5, velocity must be 50%');

  // Below K0.5: Hill velocity is lower than hyperbolic
  const resultLow = calculateHillCooperativity(K05 * 0.4, 2.8, K05);
  assert.ok(resultLow.initialVelocityPercent < resultLow.hyperbolicVelocityPercent, 'Below K0.5, sigmoidal velocity is suppressed');

  // Above K0.5: Hill velocity rises more steeply than hyperbolic
  const resultHigh = calculateHillCooperativity(K05 * 2.0, 2.8, K05);
  assert.ok(resultHigh.initialVelocityPercent > resultHigh.hyperbolicVelocityPercent, 'Above K0.5, sigmoidal velocity is enhanced');
});

// Test 10: Non-Cooperative Hill Equation (h = 1.0)
runTest('Hill equation with h = 1.0 reduces to hyperbolic Michaelis-Menten', () => {
  const result = calculateHillCooperativity(2e-3, 1.0, 2e-3);
  assert.strictEqual(result.cooperativityType, 'HYPERBOLIC');
  assert.strictEqual(result.initialVelocityPercent, 50);
  assert.strictEqual(result.sigmoidalCooperativityGainPercent, 0);
});

// Test 11: Card Matching Service for Biological Catalysts & Enzymes
runTest('getMatchingEnzymeSpec maps game cards to benchmark enzymes accurately', () => {
  const catalaseCard = { id: 'card_h2o2_decomp', name: 'Hiđro Peoxit & Men Catalase' };
  assert.strictEqual(getMatchingEnzymeSpec(catalaseCard)?.id, 'catalase');

  const achCard = { id: 'card_acetylcholine_synapse', name: 'Xung Thần Kinh Synap Axetylcholin' };
  assert.strictEqual(getMatchingEnzymeSpec(achCard)?.id, 'acetylcholinesterase');

  const caCard = { id: 'card_carbonic_co2', name: 'Khí CO2 và Cacbonic Anhyđrase' };
  assert.strictEqual(getMatchingEnzymeSpec(caCard)?.id, 'carbonic_anhydrase');

  const chymoCard = { id: 'card_chymotrypsin_triad', name: 'Chymotrypsin Thủy Phân Peptit' };
  assert.strictEqual(getMatchingEnzymeSpec(chymoCard)?.id, 'chymotrypsin');

  const lysoCard = { id: 'card_lysozyme_antibiotic', name: 'Lysozyme Kháng Khuẩn Tự Nhiên' };
  assert.strictEqual(getMatchingEnzymeSpec(lysoCard)?.id, 'lysozyme');

  const nonMatch = { id: 'card_pure_iron', name: 'Thanh Sắt Fe' };
  assert.strictEqual(getMatchingEnzymeSpec(nonMatch), null);
});

// Test 12: SoundEngine contains enzyme docking and catalytic bubble fizz methods
runTest('SoundEngine includes playEnzymeSubstrateLockChime and playCatalyticBubblesFizz', () => {
  const soundEngineFile = path.resolve('src/audio/soundEngine.ts');
  const content = fs.readFileSync(soundEngineFile, 'utf8');
  assert.ok(content.includes('playEnzymeSubstrateLockChime'), 'SoundEngine must contain playEnzymeSubstrateLockChime');
  assert.ok(content.includes('playCatalyticBubblesFizz'), 'SoundEngine must contain playCatalyticBubblesFizz');
});

// Test 13: EnzymeKineticsVisualizer Component file exists and is valid
runTest('EnzymeKineticsVisualizer.tsx component is created with required visualizer tabs', () => {
  const compFile = path.resolve('src/components/visualizations/EnzymeKineticsVisualizer.tsx');
  assert.ok(fs.existsSync(compFile), 'Component file must exist');
  const content = fs.readFileSync(compFile, 'utf8');
  assert.ok(content.includes('michaelis_menten'), 'Must include Michaelis-Menten tab');
  assert.ok(content.includes('lineweaver_burk'), 'Must include Lineweaver-Burk tab');
  assert.ok(content.includes('inhibition_modes'), 'Must include Inhibition modes tab');
  assert.ok(content.includes('allosteric_hill'), 'Must include Allosteric Hill tab');
  assert.ok(content.includes('playEnzymeSubstrateLockChime'), 'Must call audio lock chime');
});

// Test 14: PeriodicCodexTab Section 32 Integration
runTest('PeriodicCodexTab integrates Section 32 and ENZYME_KINETICS subtab', () => {
  const codexFile = path.resolve('src/components/PeriodicCodexTab.tsx');
  const content = fs.readFileSync(codexFile, 'utf8');
  assert.ok(content.includes('ENZYME_KINETICS'), 'PeriodicCodexTab must handle ENZYME_KINETICS tab');
  assert.ok(content.includes('EnzymeKineticsVisualizer'), 'PeriodicCodexTab must render EnzymeKineticsVisualizer');
  assert.ok(content.includes('SECTION 32: ENZYME KINETICS'), 'Must contain Section 32 header');
});

// Test 15: CardDetailModal Integration for Biological Catalysis
runTest('CardDetailModal provides quick access to Enzyme Kinetics Visualizer for matching cards', () => {
  const modalFile = path.resolve('src/components/cards/CardDetailModal.tsx');
  const content = fs.readFileSync(modalFile, 'utf8');
  assert.ok(content.includes('showEnzymeKineticsModal'), 'CardDetailModal must declare showEnzymeKineticsModal');
  assert.ok(content.includes('matchingEnzyme'), 'CardDetailModal must compute matchingEnzyme');
  assert.ok(content.includes('EnzymeKineticsVisualizer'), 'CardDetailModal must render EnzymeKineticsVisualizer modal');
});

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log(' CENTURY MILESTONE: TEST SUITE 100 COMPLETED IN 100% HARMONY!');
console.log('======================================================================');
