import assert from 'node:assert';
import {
  MST_STANDARD_CATALOG,
  GAS_CONSTANT_R,
  calculateSoretDepletionRatio,
  calculateMstBoundFraction,
  generateMstCapillaryTrace,
  simulateMstExperiment,
  formatKdString,
  getMatchingMstCard,
  validateMstStandardPhysics,
} from '../src/domain/mstEngine.ts';

console.log('🧪 ========================================================');
console.log('🧪 ELEMENTA TEST SUITE 136: MICROSCALE THERMOPHORESIS (MST)');
console.log('🧪 Ludwig-Soret Effect · In-Solution Kd Affinity · Capillary Traces');
console.log('🧪 ========================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
    throw err;
  }
}

// -----------------------------------------------------------------------------
// 1. Physical Constants & Standards Catalog Verification
// -----------------------------------------------------------------------------
runTest('IUPAC Ideal Gas Constant R is exact', () => {
  assert.strictEqual(GAS_CONSTANT_R, 8.314462618, 'Gas constant R must be 8.314462618 J/(mol*K)');
});

runTest('MST Catalog contains 5 benchmark molecular affinity systems', () => {
  assert.strictEqual(MST_STANDARD_CATALOG.length, 5, 'Must contain 5 benchmark standards');
  const ids = MST_STANDARD_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('carbonic_anhydrase_furosemide'), 'Must include Carbonic Anhydrase calibrant');
  assert.ok(ids.includes('p53_core_domain_dna_target'), 'Must include p53-DNA system');
  assert.ok(ids.includes('sars_cov2_spike_rbd_human_ace2'), 'Must include Spike RBD/ACE2');
  assert.ok(ids.includes('calmodulin_calcium_cooperative'), 'Must include Calmodulin cooperativity');
  assert.ok(ids.includes('rna_aptamer_theophylline_selectivity'), 'Must include RNA Aptamer selectivity');
});

runTest('Carbonic Anhydrase calibrant complies with global MST reference specifications', () => {
  const std = MST_STANDARD_CATALOG.find((s) => s.id === 'carbonic_anhydrase_furosemide');
  assert.ok(std, 'Carbonic anhydrase standard must exist');
  assert.strictEqual(std.trueKdMolar, 1.3e-6, 'Kd must be 1.3 μM');
  assert.strictEqual(std.hillCoefficient, 1.0, 'Hill coefficient must be 1.0 (non-cooperative)');
  assert.ok(std.boundSoretCoeffPerKelvin > std.unboundSoretCoeffPerKelvin, 'Bound complex must have higher Soret coefficient');
  assert.ok(validateMstStandardPhysics(std), 'Standard physics must validate as true');
});

runTest('Calmodulin standard models allosteric positive cooperativity (Hill n = 2.1)', () => {
  const cal = MST_STANDARD_CATALOG.find((s) => s.id === 'calmodulin_calcium_cooperative');
  assert.ok(cal, 'Calmodulin standard must exist');
  assert.strictEqual(cal.hillCoefficient, 2.1, 'Hill coefficient must be 2.1');
  assert.strictEqual(cal.trueKdMolar, 2.5e-6, 'Kd must be 2.5 μM');
  assert.ok(validateMstStandardPhysics(cal), 'Physics must be valid');
});

// -----------------------------------------------------------------------------
// 2. Ludwig-Soret Thermophoretic Depletion Equation
// -----------------------------------------------------------------------------
runTest('calculateSoretDepletionRatio models steady-state exponential thermal depletion', () => {
  // c_hot / c_cold = exp(-S_T * delta T)
  const st = 0.020; // 0.020 K^-1
  const deltaT = 4.0; // 4.0 K
  const ratio = calculateSoretDepletionRatio(st, deltaT);

  const expected = Math.exp(-0.020 * 4.0);
  assert.ok(Math.abs(ratio - expected) < 1e-6, `Ratio (${ratio}) must match exp(-0.08) (${expected})`);
  assert.ok(ratio < 1.0, 'Positive Soret effect must cause depletion in hot region (ratio < 1)');

  // Higher delta T produces greater depletion
  const ratioHot = calculateSoretDepletionRatio(st, 6.0);
  assert.ok(ratioHot < ratio, 'Larger delta T must deplete more molecules');
});

// -----------------------------------------------------------------------------
// 3. Law of Mass Action & Hill Binding Isotherm
// -----------------------------------------------------------------------------
runTest('calculateMstBoundFraction yields exactly 0.5 (50% bound) at [L] = Kd', () => {
  const kd = 18e-9; // 18 nM (p53)
  const thetaHalf = calculateMstBoundFraction(kd, kd, 1.0);
  assert.strictEqual(thetaHalf, 0.5, 'At [L] = Kd, fraction bound must be exactly 0.5');

  // At zero ligand, fraction bound must be 0
  const thetaZero = calculateMstBoundFraction(0, kd, 1.0);
  assert.strictEqual(thetaZero, 0.0, 'At [L] = 0, fraction bound must be 0.0');

  // At saturating ligand [L] = 100 * Kd, fraction bound > 0.99
  const thetaSat = calculateMstBoundFraction(kd * 100, kd, 1.0);
  assert.ok(thetaSat > 0.99, 'At 100*Kd, fraction bound must be > 99%');
});

runTest('Hill cooperativity n = 2.1 produces steeper sigmoidal transition than n = 1.0', () => {
  const kd = 2.5e-6; // Calmodulin
  // At 2x Kd:
  // For n = 1: theta = 2 / 3 = 0.667
  // For n = 2.1: theta = 2^2.1 / (2^2.1 + 1) = 4.287 / 5.287 = 0.811
  const thetaNonCoop = calculateMstBoundFraction(kd * 2.0, kd, 1.0);
  const thetaCoop = calculateMstBoundFraction(kd * 2.0, kd, 2.1);

  assert.ok(thetaCoop > thetaNonCoop, `Cooperative binding (${thetaCoop}) must be steeper than non-cooperative (${thetaNonCoop})`);
});

// -----------------------------------------------------------------------------
// 4. Capillary Fluorescence Trace Mechanics (30 Seconds)
// -----------------------------------------------------------------------------
runTest('generateMstCapillaryTrace resolves all 4 photophysical phases', () => {
  const trace = generateMstCapillaryTrace(0.5, 960.0, 910.0);
  assert.ok(trace.length >= 60, 'Trace must have at least 60 time points');

  const pCold = trace.find((t) => t.timeSeconds === 2.0);
  assert.strictEqual(pCold?.phase, 'COLD_INITIAL', '2s must be COLD_INITIAL');

  const pTjump = trace.find((t) => t.timeSeconds === 5.5);
  assert.strictEqual(pTjump?.phase, 'T_JUMP', '5.5s must be T_JUMP');

  const pThermo = trace.find((t) => t.timeSeconds === 15.0);
  assert.strictEqual(pThermo?.phase, 'THERMOPHORESIS', '15s must be THERMOPHORESIS');

  const pBack = trace.find((t) => t.timeSeconds === 25.0);
  assert.strictEqual(pBack?.phase, 'BACK_DIFFUSION', '25s must be BACK_DIFFUSION');

  // Thermophoresis fluorescence at 15s must be lower than cold initial at 2s
  assert.ok(
    pThermo.fluorescenceArbitraryUnits < pCold.fluorescenceArbitraryUnits,
    'Fluorescence must deplete during thermophoresis'
  );
});

// -----------------------------------------------------------------------------
// 5. Experiment Simulation & Thermodynamic Quantities
// -----------------------------------------------------------------------------
runTest('simulateMstExperiment calculates exact Gibbs free energy delta G°', () => {
  const std = MST_STANDARD_CATALOG.find((s) => s.id === 'sars_cov2_spike_rbd_human_ace2');
  const sim = simulateMstExperiment(std);

  // delta G° = R * T * ln(Kd)
  // At 25°C (298.15 K) for Kd = 14.7 nM:
  // ln(14.7e-9) = -18.035
  // delta G° = 8.314 * 298.15 * -18.035 = -44,705 J/mol = -10.68 kcal/mol
  assert.ok(sim.deltaGKcalPerMol < -9.5 && sim.deltaGKcalPerMol > -12.0, `delta G° (${sim.deltaGKcalPerMol} kcal/mol) expected ~ -10.7`);
  assert.strictEqual(sim.titrationPoints.length, 16, 'Must generate 16 titration points');
  assert.ok(sim.signalToNoiseRatio >= 10.0, 'Signal to noise must be high for spike RBD');
});

runTest('formatKdString outputs appropriate unit prefixes across dynamic range', () => {
  assert.strictEqual(formatKdString(250e-12), '250.0 pM');
  assert.strictEqual(formatKdString(18e-9), '18.0 nM');
  assert.strictEqual(formatKdString(1.3e-6), '1.3 μM');
  assert.strictEqual(formatKdString(2.5e-3), '2.5 mM');
});

// -----------------------------------------------------------------------------
// 6. Card Matching Service
// -----------------------------------------------------------------------------
runTest('getMatchingMstCard accurately maps target-ligand pairs', () => {
  const caCard = { name: 'Carbonic Anhydrase II Lyophilized', description: 'Zinc metalloenzyme inhibitor screen with furosemide' };
  const matchCa = getMatchingMstCard(caCard);
  assert.ok(matchCa, 'Must match Carbonic Anhydrase');
  assert.strictEqual(matchCa.id, 'carbonic_anhydrase_furosemide');

  const p53Card = { name: 'p53 Core Domain Tetramer', description: 'Tumor suppressor DNA response element binding' };
  const matchP53 = getMatchingMstCard(p53Card);
  assert.ok(matchP53, 'Must match p53');
  assert.strictEqual(matchP53.id, 'p53_core_domain_dna_target');

  const spikeCard = { name: 'SARS-CoV-2 Spike RBD Antigen', description: 'Receptor binding domain ACE2 affinity' };
  const matchSpike = getMatchingMstCard(spikeCard);
  assert.ok(matchSpike, 'Must match Spike');
  assert.strictEqual(matchSpike.id, 'sars_cov2_spike_rbd_human_ace2');

  const calCard = { name: 'Calmodulin Canxi Protein', description: 'EF-hand calcium binding allosteric cooperativity' };
  const matchCal = getMatchingMstCard(calCard);
  assert.ok(matchCal, 'Must match Calmodulin');
  assert.strictEqual(matchCal.id, 'calmodulin_calcium_cooperative');

  const aptCard = { name: 'RNA Aptamer Sensor', description: 'Theophylline vs caffeine discriminator' };
  const matchApt = getMatchingMstCard(aptCard);
  assert.ok(matchApt, 'Must match Aptamer');
  assert.strictEqual(matchApt.id, 'rna_aptamer_theophylline_selectivity');

  const inertCard = { name: 'Argon Gas Shield', description: 'Noble inert gas' };
  const matchNone = getMatchingMstCard(inertCard);
  assert.strictEqual(matchNone, null, 'Inert elements must return null for MST');
});

// -----------------------------------------------------------------------------
// 7. Physics Validation & Invariant Testing
// -----------------------------------------------------------------------------
runTest('validateMstStandardPhysics rejects zero Kd or invalid parameters', () => {
  const zeroKd = { ...MST_STANDARD_CATALOG[0], trueKdMolar: 0 };
  assert.strictEqual(validateMstStandardPhysics(zeroKd), false, 'Must reject zero Kd');

  const zeroHill = { ...MST_STANDARD_CATALOG[0], hillCoefficient: 0 };
  assert.strictEqual(validateMstStandardPhysics(zeroHill), false, 'Must reject zero Hill coefficient');

  const zeroSoret = { ...MST_STANDARD_CATALOG[0], unboundSoretCoeffPerKelvin: 0 };
  assert.strictEqual(validateMstStandardPhysics(zeroSoret), false, 'Must reject zero Soret coefficient');
});

runTest('All 5 MST standards simulate cleanly across laser powers and temperatures', () => {
  for (const std of MST_STANDARD_CATALOG) {
    const sim20 = simulateMstExperiment(std, 20, 15);
    assert.ok(!Number.isNaN(sim20.deltaGJoulesPerMol), `delta G must be finite for ${std.id}`);
    assert.ok(sim20.titrationPoints.length === 16, `Must have 16 points for ${std.id}`);

    const sim80 = simulateMstExperiment(std, 80, 37);
    assert.ok(!Number.isNaN(sim80.laserDeltaTKelvin), `laser delta T must be finite for ${std.id}`);
    assert.ok(sim80.deltaFnormPerMil > 0, `delta F_norm must be positive for ${std.id}`);
  }
});

console.log('\n========================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('🎉 Microscale Thermophoresis (MST) Engine verified!');
console.log('========================================================\n');
