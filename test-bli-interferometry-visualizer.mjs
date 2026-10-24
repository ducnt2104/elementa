import assert from 'node:assert';
import {
  BLI_STANDARD_CATALOG,
  calculateBliSensorgram,
  simulateBliExperiment,
  formatBliKdString,
  getMatchingBliCard,
  validateBliStandardPhysics,
} from './src/domain/bliEngine.ts';

console.log('🧪 ========================================================');
console.log('🧪 ELEMENTA TEST SUITE 137: BIO-LAYER INTERFEROMETRY (BLI)');
console.log('🧪 Dip and Read · Real-Time kon/koff Kinetics · Optical Shift');
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
// 1. Standards Catalog Verification
// -----------------------------------------------------------------------------
runTest('BLI Catalog contains 5 benchmark label-free optical biosensor systems', () => {
  assert.strictEqual(BLI_STANDARD_CATALOG.length, 5, 'Must contain 5 benchmark standards');
  const ids = BLI_STANDARD_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('protein_a_human_igg1'), 'Must include Protein A / IgG1');
  assert.ok(ids.includes('streptavidin_biotin_dna_hybridization'), 'Must include Streptavidin / DNA');
  assert.ok(ids.includes('anti_his_kinase_inhibitor'), 'Must include Anti-His / Kinase');
  assert.ok(ids.includes('anti_murine_epitope_binning_sandwich'), 'Must include Epitope Binning Sandwich');
  assert.ok(ids.includes('lipid_membrane_caps_viral_fusion'), 'Must include Lipid Membrane Fusion');
});

runTest('Protein A standard conforms to biomanufacturing harvest titer specifications', () => {
  const std = BLI_STANDARD_CATALOG.find((s) => s.id === 'protein_a_human_igg1');
  assert.ok(std, 'Protein A standard must exist');
  assert.strictEqual(std.biosensorType, 'PROTEIN_A_FC_CAPTURE');
  assert.strictEqual(std.trueKonMolarInvSecInv, 1.2e5, 'kon must be 1.2e5 M^-1 s^-1');
  assert.strictEqual(std.trueKoffSecInv, 2.4e-4, 'koff must be 2.4e-4 s^-1');
  // Kd = koff / kon = 2.4e-4 / 1.2e5 = 2.0e-9 M (2.0 nM)
  const calcKd = std.trueKoffSecInv / std.trueKonMolarInvSecInv;
  assert.ok(Math.abs(calcKd - std.trueKdMolar) < 1e-15, 'Kd must match koff / kon');
  assert.strictEqual(std.trueKdMolar, 2.0e-9, 'Kd must be 2.0 nM');
  assert.ok(validateBliStandardPhysics(std), 'Standard physics must validate as true');
});

runTest('Anti-His standard exhibits fast-off kinetics for fragment drug discovery', () => {
  const his = BLI_STANDARD_CATALOG.find((s) => s.id === 'anti_his_kinase_inhibitor');
  assert.ok(his, 'Anti-His standard must exist');
  assert.strictEqual(his.biosensorType, 'ANTI_HIS_TAG');
  assert.ok(his.trueKoffSecInv > 1e-2, 'koff must be > 0.01 s^-1 (fast off-rate)');
  assert.ok(his.theoreticalRmaxNm < 0.5, 'Small molecule Rmax must be < 0.5 nm');
  assert.ok(validateBliStandardPhysics(his), 'Physics must be valid');
});

// -----------------------------------------------------------------------------
// 2. Langmuir 1:1 Real-Time Binding Kinetics & Optical Shift
// -----------------------------------------------------------------------------
runTest('calculateBliSensorgram models Baseline, Association, and Dissociation phases', () => {
  const std = BLI_STANDARD_CATALOG.find((s) => s.id === 'protein_a_human_igg1');
  const trace = calculateBliSensorgram(std, 50e-9); // 50 nM IgG

  assert.ok(trace.length > 200, 'Trace must contain > 200 time points');

  // Baseline at 30s: shift should be ~ 0 nm
  const pBase = trace.find((p) => p.timeSeconds === 30.0);
  assert.strictEqual(pBase?.phase, 'BASELINE');
  assert.ok(pBase.wavelengthShiftNm < 0.02, `Baseline shift (${pBase.wavelengthShiftNm} nm) must be ~0 nm`);

  // Association at 200s: shift must rise toward Req
  const pAssoc = trace.find((p) => p.timeSeconds === 200.0);
  assert.strictEqual(pAssoc?.phase, 'ASSOCIATION');
  assert.ok(pAssoc.wavelengthShiftNm > 0.5, `Association shift (${pAssoc.wavelengthShiftNm} nm) must rise`);

  // Dissociation at 400s: shift must decay exponentially from association peak
  const pDissoc = trace.find((p) => p.timeSeconds === 400.0);
  assert.strictEqual(pDissoc?.phase, 'DISSOCIATION');
  const pEndOfAssoc = trace.find((p) => p.timeSeconds === 240.0);
  assert.ok(
    pDissoc.wavelengthShiftNm < pEndOfAssoc.wavelengthShiftNm,
    'Dissociation must decay below end-of-association level'
  );
});

runTest('Higher analyte concentration accelerates k_obs and increases steady-state Req', () => {
  const std = BLI_STANDARD_CATALOG.find((s) => s.id === 'protein_a_human_igg1');
  const traceLow = calculateBliSensorgram(std, 12.5e-9); // 12.5 nM
  const traceHigh = calculateBliSensorgram(std, 100e-9); // 100 nM (8x concentration)

  const pLowEndAssoc = traceLow.find((p) => p.timeSeconds === 238.0);
  const pHighEndAssoc = traceHigh.find((p) => p.timeSeconds === 238.0);

  assert.ok(
    pHighEndAssoc.wavelengthShiftNm > pLowEndAssoc.wavelengthShiftNm,
    `High conc shift (${pHighEndAssoc.wavelengthShiftNm} nm) must exceed low conc (${pLowEndAssoc.wavelengthShiftNm} nm)`
  );
});

// -----------------------------------------------------------------------------
// 3. Multi-Concentration Simulation & Goodness-of-Fit
// -----------------------------------------------------------------------------
runTest('simulateBliExperiment generates complete 5-concentration sensorgram overlay', () => {
  const std = BLI_STANDARD_CATALOG.find((s) => s.id === 'streptavidin_biotin_dna_hybridization');
  const sim = simulateBliExperiment(std);

  assert.strictEqual(sim.sensorgramSeries.length, 5, 'Must generate 5 concentration curves');
  assert.strictEqual(sim.fittedKdMolar, std.trueKdMolar, 'Fitted Kd must match true Kd');
  assert.ok(sim.rSquaredMetric >= 0.99, 'R^2 metric must be >= 0.99');
  assert.ok(sim.chiSquaredMetric <= 0.05, 'Chi^2 metric must be <= 0.05');
  assert.ok(sim.totalExperimentTimeSec === 540, 'Total time must be 60 + 180 + 300 = 540 s');
});

runTest('formatBliKdString produces standard unit prefixes', () => {
  assert.strictEqual(formatBliKdString(100e-12), '100.0 pM');
  assert.strictEqual(formatBliKdString(2.0e-9), '2.00 nM');
  assert.strictEqual(formatBliKdString(247e-9), '247.00 nM');
  assert.strictEqual(formatBliKdString(1.37e-8), '13.70 nM');
  assert.strictEqual(formatBliKdString(1.5e-6), '1.50 μM');
});

// -----------------------------------------------------------------------------
// 4. Card Matching Service
// -----------------------------------------------------------------------------
runTest('getMatchingBliCard accurately maps monoclonal antibodies and biosensor targets', () => {
  const iggCard = { name: 'Human Monoclonal IgG1 Antibody', description: 'Protein A Fc domain binding' };
  const matchIgg = getMatchingBliCard(iggCard);
  assert.ok(matchIgg, 'Must match Protein A');
  assert.strictEqual(matchIgg.id, 'protein_a_human_igg1');

  const dnaCard = { name: 'Biotinylated DNA Sensor', description: 'Streptavidin capture with complementary lai dna' };
  const matchDna = getMatchingBliCard(dnaCard);
  assert.ok(matchDna, 'Must match Streptavidin');
  assert.strictEqual(matchDna.id, 'streptavidin_biotin_dna_hybridization');

  const hisCard = { name: 'His-Tagged Tyrosine Kinase', description: 'Recombinant polyhistidine enzyme inhibitor screen' };
  const matchHis = getMatchingBliCard(hisCard);
  assert.ok(matchHis, 'Must match Anti-His');
  assert.strictEqual(matchHis.id, 'anti_his_kinase_inhibitor');

  const binCard = { name: 'Epitope Binning Antibody Panel', description: 'Sandwich cross-blocking cross competition' };
  const matchBin = getMatchingBliCard(binCard);
  assert.ok(matchBin, 'Must match Epitope Binning');
  assert.strictEqual(matchBin.id, 'anti_murine_epitope_binning_sandwich');

  const lipoCard = { name: 'POPC Liposome Bilayer Capsule', description: 'Màng lipid hợp màng viral fusion' };
  const matchLipo = getMatchingBliCard(lipoCard);
  assert.ok(matchLipo, 'Must match Liposome');
  assert.strictEqual(matchLipo.id, 'lipid_membrane_caps_viral_fusion');

  const saltCard = { name: 'Sodium Chloride Buffer', description: 'Pure saline' };
  const matchNone = getMatchingBliCard(saltCard);
  assert.strictEqual(matchNone, null, 'Simple salts must return null for BLI');
});

// -----------------------------------------------------------------------------
// 5. Physics Validation & Invariant Testing
// -----------------------------------------------------------------------------
runTest('validateBliStandardPhysics rejects non-positive kinetic rates', () => {
  const zeroKon = { ...BLI_STANDARD_CATALOG[0], trueKonMolarInvSecInv: 0 };
  assert.strictEqual(validateBliStandardPhysics(zeroKon), false, 'Must reject zero kon');

  const zeroKoff = { ...BLI_STANDARD_CATALOG[0], trueKoffSecInv: 0 };
  assert.strictEqual(validateBliStandardPhysics(zeroKoff), false, 'Must reject zero koff');

  const zeroRmax = { ...BLI_STANDARD_CATALOG[0], theoreticalRmaxNm: 0 };
  assert.strictEqual(validateBliStandardPhysics(zeroRmax), false, 'Must reject zero Rmax');
});

runTest('All 5 BLI standards simulate without NaN or infinity', () => {
  for (const std of BLI_STANDARD_CATALOG) {
    const sim = simulateBliExperiment(std);
    assert.ok(!Number.isNaN(sim.fittedKdMolar), `Kd must be finite for ${std.id}`);
    assert.strictEqual(sim.sensorgramSeries.length, std.defaultConcentrationsMolar.length);
    for (const curve of sim.sensorgramSeries) {
      assert.ok(!Number.isNaN(curve.steadyStateReqNm), `Req must be finite for ${std.id}`);
      assert.ok(curve.trace.length > 50, `Trace must have points for ${std.id}`);
    }
  }
});

console.log('\n========================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('🎉 Bio-Layer Interferometry (BLI) Engine verified!');
console.log('========================================================\n');
