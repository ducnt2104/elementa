import assert from 'node:assert';
import {
  ESI_STANDARD_CATALOG,
  PROTON_MASS_DA,
  calculateTheoreticalMz,
  deconvoluteAdjacentChargeState,
  calculateRayleighChargeLimitFemtocoulombs,
  simulateEsiMassSpectrum,
  getMatchingEsiCard,
  validateEsiStandardPhysics
} from './src/domain/esiMassSpecEngine.ts';

console.log('🧪 ========================================================');
console.log('🧪 ELEMENTA TEST SUITE 133: ESI-MS & MULTIPLE CHARGING ENGINE');
console.log('🧪 John B. Fenn (Nobel 2002) · Taylor Cone · Rayleigh Fission');
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
runTest('ESI-MS Catalog contains 5 benchmark macromolecules', () => {
  assert.strictEqual(ESI_STANDARD_CATALOG.length, 5, 'Must contain exactly 5 international standards');
  const ids = ESI_STANDARD_CATALOG.map(s => s.id);
  assert.ok(ids.includes('horse_heart_cytochrome_c'), 'Must include Cytochrome c');
  assert.ok(ids.includes('human_recombinant_insulin'), 'Must include Human Recombinant Insulin');
  assert.ok(ids.includes('bovine_serum_albumin_bsa'), 'Must include Bovine Serum Albumin');
  assert.ok(ids.includes('monoclonal_antibody_igg1'), 'Must include Monoclonal Antibody IgG1');
  assert.ok(ids.includes('synthetic_rna_oligonucleotide'), 'Must include Synthetic RNA Oligonucleotide');
});

runTest('Cytochrome c standard complies with Fenn 1989 / Nobel 2002 data', () => {
  const cyt = ESI_STANDARD_CATALOG.find(s => s.id === 'horse_heart_cytochrome_c');
  assert.ok(cyt, 'Cytochrome c must exist');
  assert.ok(Math.abs(cyt.trueNeutralMolecularWeightDa - 12360.1) < 0.2, 'Molecular weight must be ~12,360 Da');
  assert.strictEqual(cyt.polarityMode, 'POSITIVE_ION', 'Must be positive ion mode');
  assert.strictEqual(cyt.minimumChargeZ, 8, 'Min charge must be +8');
  assert.strictEqual(cyt.maximumChargeZ, 18, 'Max charge must be +18');
  assert.strictEqual(cyt.mostAbundantChargeZ, 13, 'Most abundant charge state must be +13');
  assert.ok(cyt.nobelCitation.includes('2002'), 'Must cite Nobel 2002');
  assert.ok(validateEsiStandardPhysics(cyt), 'Standard physics must validate as true');
});

runTest('Insulin recombinant standard reflects biopharmaceutical quality specifications', () => {
  const ins = ESI_STANDARD_CATALOG.find(s => s.id === 'human_recombinant_insulin');
  assert.ok(ins, 'Insulin must exist');
  assert.ok(Math.abs(ins.trueNeutralMolecularWeightDa - 5807.6) < 0.2, 'Insulin MW ~ 5,807.6 Da');
  assert.strictEqual(ins.minimumChargeZ, 3, 'Min charge 3+');
  assert.strictEqual(ins.maximumChargeZ, 6, 'Max charge 6+');
  assert.strictEqual(ins.mostAbundantChargeZ, 4, 'Base peak 4+');
  assert.ok(validateEsiStandardPhysics(ins), 'Physics must be valid');
});

runTest('BSA standard demonstrates high-charge envelope compression into quadrupole range', () => {
  const bsa = ESI_STANDARD_CATALOG.find(s => s.id === 'bovine_serum_albumin_bsa');
  assert.ok(bsa, 'BSA must exist');
  assert.ok(bsa.trueNeutralMolecularWeightDa > 66000, 'BSA MW > 66 kDa');
  assert.strictEqual(bsa.minimumChargeZ, 32, 'Charge range from 32+');
  assert.strictEqual(bsa.maximumChargeZ, 62, 'Up to 62+');
  assert.strictEqual(bsa.mostAbundantChargeZ, 45, 'Dominant peak 45+');
  // At z = 45, m/z = (66430.3 + 45 * 1.007276) / 45 = 1477.2 Th
  const mz45 = calculateTheoreticalMz(bsa.trueNeutralMolecularWeightDa, 45, 'POSITIVE_ION');
  assert.ok(mz45 > 1470 && mz45 < 1485, `m/z at z=45 must be ~1477 Th (was ${mz45.toFixed(2)})`);
});

runTest('Synthetic RNA Oligonucleotide standard operates in negative ion mode [M - zH]z-', () => {
  const rna = ESI_STANDARD_CATALOG.find(s => s.id === 'synthetic_rna_oligonucleotide');
  assert.ok(rna, 'RNA standard must exist');
  assert.strictEqual(rna.polarityMode, 'NEGATIVE_ION', 'Must be negative ion polarity');
  assert.strictEqual(rna.minimumChargeZ, -10, 'Min charge -10');
  assert.strictEqual(rna.maximumChargeZ, -4, 'Max charge -4');
  assert.strictEqual(rna.mostAbundantChargeZ, -7, 'Dominant peak -7');
  assert.ok(validateEsiStandardPhysics(rna), 'Physics must be valid');
});

// -----------------------------------------------------------------------------
// 2. Rayleigh Droplet Charge Limit Physics
// -----------------------------------------------------------------------------
runTest('Rayleigh charge limit q_R scales with R^(3/2) according to electrohydrodynamics', () => {
  // q_R = 8 * pi * sqrt(epsilon_0 * gamma * R^3)
  const q1 = calculateRayleighChargeLimitFemtocoulombs(1.0); // 1.0 micrometer
  const q8 = calculateRayleighChargeLimitFemtocoulombs(8.0); // 8.0 micrometers (8x larger radius)

  assert.ok(q1 > 15 && q1 < 25, `Rayleigh limit for 1 um droplet must be ~20.1 fC (was ${q1.toFixed(2)} fC)`);
  assert.ok(q8 > q1, 'Larger droplet must hold more charge before Coulomb fission');

  // Ratio should be 8^1.5 = 22.6274
  const expectedRatio = Math.pow(8, 1.5);
  const actualRatio = q8 / q1;
  assert.ok(Math.abs(actualRatio - expectedRatio) < 1e-3, `Ratio ${actualRatio} must equal ${expectedRatio}`);

  // In terms of elementary charges e = 1.602e-19 C:
  // 20.14 fC = 20.14e-15 / 1.602e-19 ~ 1.25e5 charges
  const eCoulomb = 1.602176634e-19;
  const zLimit = (q1 * 1e-15) / eCoulomb;
  assert.ok(zLimit > 110000 && zLimit < 140000, `Charges at Rayleigh limit must be ~125,000 (was ${Math.round(zLimit)})`);
});

// -----------------------------------------------------------------------------
// 3. Theoretical m/z & Ion Charging Mechanics
// -----------------------------------------------------------------------------
runTest('calculateTheoreticalMz accurately evaluates positive and negative charge states', () => {
  const mw = 12360.1; // Cytochrome c
  // Positive: [M + 13H]13+ -> (12360.1 + 13 * 1.007276) / 13 = 951.784 Th
  const mzPos13 = calculateTheoreticalMz(mw, 13, 'POSITIVE_ION');
  const expectedPos13 = (mw + 13 * PROTON_MASS_DA) / 13;
  assert.ok(Math.abs(mzPos13 - expectedPos13) < 1e-6, 'Positive m/z formula exactness');
  assert.ok(mzPos13 > 951 && mzPos13 < 953, `mzPos13 ~ 951.8 Th (was ${mzPos13.toFixed(3)})`);

  // Negative: [M - 7H]7- -> (7652.8 - 7 * 1.007276) / 7 = 1092.25 Th
  const rnaMw = 7652.8;
  const mzNeg7 = calculateTheoreticalMz(rnaMw, 7, 'NEGATIVE_ION');
  const expectedNeg7 = (rnaMw - 7 * PROTON_MASS_DA) / 7;
  assert.ok(Math.abs(mzNeg7 - expectedNeg7) < 1e-6, 'Negative m/z formula exactness');
  assert.ok(mzNeg7 > 1091 && mzNeg7 < 1093, `mzNeg7 ~ 1092.3 Th (was ${mzNeg7.toFixed(3)})`);
});

runTest('Higher charge states compress m/z monotonically', () => {
  const mw = 66430.3; // BSA
  const mz35 = calculateTheoreticalMz(mw, 35, 'POSITIVE_ION');
  const mz45 = calculateTheoreticalMz(mw, 45, 'POSITIVE_ION');
  const mz55 = calculateTheoreticalMz(mw, 55, 'POSITIVE_ION');

  assert.ok(mz35 > mz45, 'm/z at 35+ must exceed 45+');
  assert.ok(mz45 > mz55, 'm/z at 45+ must exceed 55+');
});

// -----------------------------------------------------------------------------
// 4. Spectrum Simulation & Ion Envelope
// -----------------------------------------------------------------------------
runTest('simulateEsiMassSpectrum generates full charge envelope and base peak', () => {
  const cyt = ESI_STANDARD_CATALOG.find(s => s.id === 'horse_heart_cytochrome_c');
  const sim = simulateEsiMassSpectrum(cyt);

  assert.strictEqual(sim.standard.id, cyt.id);
  assert.ok(sim.chargeEnvelopePeaks.length >= 11, `Expected at least 11 peaks (got ${sim.chargeEnvelopePeaks.length})`);
  assert.strictEqual(sim.standard.mostAbundantChargeZ, 13, 'Base peak charge must be +13');
  assert.ok(sim.spectrumCurve.length > 200, 'Spectrum curve must have >200 data points');
  assert.ok(sim.rayleighDropletChargeLimitFc > 0, 'Must record Rayleigh limit');
});

runTest('simulateEsiMassSpectrum calculates mass accuracy within acceptable ppm range', () => {
  const ins = ESI_STANDARD_CATALOG.find(s => s.id === 'human_recombinant_insulin');
  const sim = simulateEsiMassSpectrum(ins);

  assert.ok(sim.massAccuracyPpm < 50.0, `PPM error must be small (got ${sim.massAccuracyPpm})`);
  assert.ok(sim.calculatedNeutralMassDa > 5800 && sim.calculatedNeutralMassDa < 5820, 'Average mass must be close to 5807.6 Da');
});

// -----------------------------------------------------------------------------
// 5. Macromolecular Charge State Deconvolution
// -----------------------------------------------------------------------------
runTest('deconvoluteAdjacentChargeState reconstructs exact molecular weight and charge state', () => {
  const trueMw = 12360.1;
  // Let z1 = 12 (higher m/z mz1), z2 = 13 (lower m/z mz2)
  const mz1 = calculateTheoreticalMz(trueMw, 12, 'POSITIVE_ION');
  const mz2 = calculateTheoreticalMz(trueMw, 13, 'POSITIVE_ION');

  const deconv = deconvoluteAdjacentChargeState(mz1, mz2, 'POSITIVE_ION');
  assert.strictEqual(deconv.roundedZ1, 12, 'Calculated rounded charge state z1 must be 12');
  assert.ok(Math.abs(deconv.calculatedZ1 - 12.0) < 0.01, `Calculated z1 (${deconv.calculatedZ1.toFixed(3)}) must be ~12`);

  const deltaM = Math.abs(deconv.deconvolutedMassDa - trueMw);
  assert.ok(deltaM < 0.1, `Deconvoluted mass error (${deltaM.toFixed(3)} Da) must be < 0.1 Da`);
});

runTest('deconvoluteAdjacentChargeState works symmetrically for negative ion mode', () => {
  const trueMw = 7652.8;
  // In negative mode: z1 = 6 (mz1), z2 = 7 (mz2)
  const mz1 = calculateTheoreticalMz(trueMw, 6, 'NEGATIVE_ION');
  const mz2 = calculateTheoreticalMz(trueMw, 7, 'NEGATIVE_ION');

  const deconv = deconvoluteAdjacentChargeState(mz1, mz2, 'NEGATIVE_ION');
  assert.strictEqual(deconv.roundedZ1, 6, 'Calculated rounded charge state z1 must be 6');

  const deltaM = Math.abs(deconv.deconvolutedMassDa - trueMw);
  assert.ok(deltaM < 0.1, `Deconvoluted negative ion mass error (${deltaM.toFixed(3)} Da) must be < 0.1 Da`);
});

// -----------------------------------------------------------------------------
// 6. Card Matching Service
// -----------------------------------------------------------------------------
runTest('getMatchingEsiCard detects protein, peptide, antibody, and RNA cards', () => {
  const cytCard = { name: 'Cytochrome C Respiratory Enzyme', formula: 'C535H858N148O151S4Fe' };
  const matchCyt = getMatchingEsiCard(cytCard);
  assert.ok(matchCyt, 'Must match Cytochrome c');
  assert.strictEqual(matchCyt.id, 'horse_heart_cytochrome_c');

  const insCard = { name: 'Recombinant Insulin Injection', formula: 'C257H383N65O77S6' };
  const matchIns = getMatchingEsiCard(insCard);
  assert.ok(matchIns, 'Must match Insulin');
  assert.strictEqual(matchIns.id, 'human_recombinant_insulin');

  const bsaCard = { name: 'Albumin Huyết Thanh Bò (BSA)', formula: 'C2934H4615N781O897S39' };
  const matchBsa = getMatchingEsiCard(bsaCard);
  assert.ok(matchBsa, 'Must match BSA');
  assert.strictEqual(matchBsa.id, 'bovine_serum_albumin_bsa');

  const mabCard = { name: 'Kháng Thể Đơn Dòng Điều Trị Trastuzumab (IgG1)', formula: '' };
  const matchMab = getMatchingEsiCard(mabCard);
  assert.ok(matchMab, 'Must match IgG1 mAb');
  assert.strictEqual(matchMab.id, 'monoclonal_antibody_igg1');

  const rnaCard = { name: 'Guide RNA Oligonucleotide Synthetic', formula: '' };
  const matchRna = getMatchingEsiCard(rnaCard);
  assert.ok(matchRna, 'Must match RNA');
  assert.strictEqual(matchRna.id, 'synthetic_rna_oligonucleotide');

  const simpleSaltCard = { name: 'Natri Clorua Tinh Khiết', formula: 'NaCl' };
  const matchSalt = getMatchingEsiCard(simpleSaltCard);
  assert.strictEqual(matchSalt, null, 'Simple salts must not trigger macromolecular ESI-MS');
});

// -----------------------------------------------------------------------------
// 7. Physics Invariants & Negative Boundary Testing
// -----------------------------------------------------------------------------
runTest('validateEsiStandardPhysics rejects unphysical standards', () => {
  const badMass = { ...ESI_STANDARD_CATALOG[0], trueNeutralMolecularWeightDa: 400 };
  assert.strictEqual(validateEsiStandardPhysics(badMass), false, 'Must reject sub-500 Da mass');

  const zeroZ = { ...ESI_STANDARD_CATALOG[0], minimumChargeZ: 0 };
  assert.strictEqual(validateEsiStandardPhysics(zeroZ), false, 'Must reject zero charge state');

  const invertedZ = { ...ESI_STANDARD_CATALOG[0], minimumChargeZ: 20, maximumChargeZ: 10 };
  assert.strictEqual(validateEsiStandardPhysics(invertedZ), false, 'Must reject inverted min/max charge');

  const zeroVolt = { ...ESI_STANDARD_CATALOG[0], capillaryVoltageKv: 0 };
  assert.strictEqual(validateEsiStandardPhysics(zeroVolt), false, 'Must reject 0 kV voltage');
});

runTest('Peak spacing between adjacent charge states matches theoretical M/(z*(z+1))', () => {
  const cyt = ESI_STANDARD_CATALOG.find(s => s.id === 'horse_heart_cytochrome_c');
  const z = 13;
  const mz13 = calculateTheoreticalMz(cyt.trueNeutralMolecularWeightDa, 13, 'POSITIVE_ION');
  const mz14 = calculateTheoreticalMz(cyt.trueNeutralMolecularWeightDa, 14, 'POSITIVE_ION');
  const spacing = mz13 - mz14;

  const theoreticalSpacing = cyt.trueNeutralMolecularWeightDa / (13 * 14);
  assert.ok(Math.abs(spacing - theoreticalSpacing) < 0.2, `Spacing ${spacing.toFixed(3)} must match M/(z(z+1)) ${theoreticalSpacing.toFixed(3)}`);
});

runTest('deconvoluteAdjacentChargeState handles degenerate zero or inverted peak delta', () => {
  const deconv = deconvoluteAdjacentChargeState(1000, 1000, 'POSITIVE_ION');
  assert.strictEqual(deconv.calculatedZ1, 0, 'Must return 0 for zero delta');
  assert.strictEqual(deconv.deconvolutedMassDa, 0, 'Must return 0 mass for zero delta');
});

runTest('All 5 standards simulate without NaN or infinity', () => {
  for (const std of ESI_STANDARD_CATALOG) {
    const sim = simulateEsiMassSpectrum(std);
    assert.ok(!Number.isNaN(sim.calculatedNeutralMassDa), `MW must not be NaN for ${std.id}`);
    assert.ok(Number.isFinite(sim.calculatedNeutralMassDa), `MW must be finite for ${std.id}`);
    assert.ok(sim.chargeEnvelopePeaks.length > 0, `Peaks must exist for ${std.id}`);
    for (const p of sim.chargeEnvelopePeaks) {
      assert.ok(!Number.isNaN(p.massToChargeMz), `m/z must not be NaN`);
      assert.ok(!Number.isNaN(p.intensityPercent), `Intensity must not be NaN`);
    }
  }
});

console.log('\n========================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round(passedTests/totalTests*100)}%)`);
console.log('🎉 ESI-MS & Multiple Charging Engine successfully verified!');
console.log('========================================================\n');
