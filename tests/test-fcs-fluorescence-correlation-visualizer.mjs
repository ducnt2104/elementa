import assert from 'assert';
import {
  FCS_STANDARD_CATALOG,
  calculateFcsConfocalVolumeFemtoliters,
  calculateFcsDiffusionCoeffM2PerS,
  calculateFcsDiffusionTimeMicrosec,
  simulateFcsExperiment,
  getMatchingFcsCard,
  validateFcsStandardPhysics,
  BOLTZMANN_CONSTANT,
  AVOGADRO_CONSTANT,
} from '../src/domain/fcsEngine.ts';

console.log('🧪 RUNNING TEST SUITE 145: Fluorescence Correlation Spectroscopy (FCS) & Single-Molecule Visualizer...\n');

let passedTests = 0;

// Test 1: Standard Catalog Integrity
try {
  assert.ok(Array.isArray(FCS_STANDARD_CATALOG), 'FCS_STANDARD_CATALOG must be an array');
  assert.strictEqual(FCS_STANDARD_CATALOG.length, 5, 'Catalog must contain 5 benchmark systems');

  const categories = FCS_STANDARD_CATALOG.map((s) => s.applicationCategory);
  assert.ok(categories.includes('PRIMARY_CALIBRANT'), 'Must contain PRIMARY_CALIBRANT');
  assert.ok(categories.includes('FLUORESCENT_PROTEIN'), 'Must contain FLUORESCENT_PROTEIN');
  assert.ok(categories.includes('DNA_HYBRIDIZATION'), 'Must contain DNA_HYBRIDIZATION');
  assert.ok(categories.includes('RECEPTOR_DIMER'), 'Must contain RECEPTOR_DIMER');
  assert.ok(categories.includes('QUANTUM_DOT'), 'Must contain QUANTUM_DOT');

  console.log('✅ Test 1 Passed: FCS benchmark catalog contains 5 comprehensive biophysical systems.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 1 Failed:', err);
  process.exit(1);
}

// Test 2: Standard Physical Validity
try {
  for (const std of FCS_STANDARD_CATALOG) {
    const isValid = validateFcsStandardPhysics(std);
    assert.strictEqual(isValid, true, `Standard ${std.id} must pass physical validation`);
    assert.ok(std.confocalWaistNm >= 180 && std.confocalWaistNm <= 300, 'Confocal waist w0 must be 180-300 nm');
    assert.ok(std.confocalAxialRadiusNm > std.confocalWaistNm, 'Axial elongation z0 must exceed waist w0');
    assert.ok(std.tripletFraction >= 0 && std.tripletFraction < 0.5, 'Triplet fraction must be < 0.5');
  }

  console.log('✅ Test 2 Passed: All 5 FCS systems pass optical diffraction and laser excitation limits.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 2 Failed:', err);
  process.exit(1);
}

// Test 3: Confocal Volume Calculation & Femtoliter Scaling
try {
  const vEff = calculateFcsConfocalVolumeFemtoliters(220.0, 1100.0);
  
  // Theoretical V_eff = pi^(1.5) * (220e-9)^2 * (1100e-9) m^3 = 5.568 * 4.84e-14 * 1.1e-6 = 2.96e-19 m^3 = 0.296 fL
  assert.ok(vEff > 0.25 && vEff < 0.35, `Confocal volume must be ~0.297 fL, got ${vEff}`);

  console.log('✅ Test 3 Passed: Confocal observation volume strictly evaluated in the sub-femtoliter regime.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 3 Failed:', err);
  process.exit(1);
}

// Test 4: Diffusion Time tau_D & Stokes-Einstein Scaling
try {
  const waistNm = 220.0;
  const tauR6G = calculateFcsDiffusionTimeMicrosec(waistNm, 4.26e-10); // R6G
  const tauEGFP = calculateFcsDiffusionTimeMicrosec(waistNm, 8.70e-11); // eGFP

  assert.ok(tauR6G > 25.0 && tauR6G < 32.0, `R6G tau_D must be ~28.4 us, got ${tauR6G}`);
  assert.ok(tauEGFP > 130.0 && tauEGFP < 150.0, `eGFP tau_D must be ~139 us, got ${tauEGFP}`);
  assert.ok(tauEGFP > tauR6G, 'eGFP must have strictly longer residence time than small molecule R6G');

  console.log('✅ Test 4 Passed: Characteristic confocal diffusion residence times (tau_D) verified.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 4 Failed:', err);
  process.exit(1);
}

// Test 5: Auto-Correlation Function G(tau) & Triplet Blinking
try {
  const r6gStd = FCS_STANDARD_CATALOG[0];
  const sim = simulateFcsExperiment(r6gStd, 100);

  assert.strictEqual(sim.standard.id, 'rhodamine_6g_primary_calibrant');
  assert.strictEqual(sim.correlationCurvePoints.length, 100, 'Must return 100 correlation points');
  assert.ok(sim.meanParticleNumberN > 0, 'Mean particle number must be positive');
  assert.ok(sim.absoluteConcentrationNanomolar > 0, 'Absolute concentration must be positive');

  // G(0) with triplet must be higher than pure diffusion G
  const firstPt = sim.correlationCurvePoints[0];
  assert.ok(firstPt.correlationG > firstPt.tripletFreeCorrelationG, 'Early lag time G(tau) must exhibit triplet enhancement');

  // Long lag time should decay toward zero
  const lastPt = sim.correlationCurvePoints[sim.correlationCurvePoints.length - 1];
  assert.ok(lastPt.correlationG < 0.01, `Long lag time G(1s) must decay to ~0, got ${lastPt.correlationG}`);

  console.log('✅ Test 5 Passed: Full FCS G(tau) auto-correlation curve simulated with microsecond triplet shelf.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 5 Failed:', err);
  process.exit(1);
}

// Test 6: Molecular Brightness & Dimer Stoichiometry
try {
  const egfrStd = FCS_STANDARD_CATALOG.find((s) => s.id === 'cy5_egf_receptor_dimerization');
  const monomer = egfrStd.speciesList[0];
  const dimer = egfrStd.speciesList[1];

  // Dimer brightness must be exactly 2x monomer brightness
  assert.strictEqual(dimer.molecularBrightnessKhz, monomer.molecularBrightnessKhz * 2.0);

  // Quantum dot brightness check
  const qdStd = FCS_STANDARD_CATALOG.find((s) => s.id === 'quantum_dot_qd655_nanocrystal');
  assert.ok(qdStd.speciesList[0].molecularBrightnessKhz > 150.0, 'Quantum dot brightness must exceed 150 kHz/molecule');

  console.log('✅ Test 6 Passed: Molecular brightness doubling upon receptor dimerization verified.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 6 Failed:', err);
  process.exit(1);
}

// Test 7: Card Matching Service Integration
try {
  const qdCard = { name: 'CdSe Quantum Dot', description: 'Chấm lượng tử Nobel 2023 Bawendi' };
  const egfpCard = { name: 'Enhanced GFP', description: 'Protein huỳnh quang lục Nobel 2008' };
  const dnaCard = { name: 'ssDNA Alexa488 Hybridization', description: 'Lai hóa chuỗi kép' };
  const egfrCard = { name: 'EGFR Receptor Dimerization', description: 'Kích hoạt tyrosine kinase' };
  const r6gCard = { name: 'Rhodamine 6G', description: 'Chất chuẩn confocal R6G' };
  const nullCard = { name: 'Khí Argon', description: 'Khí hiếm đơn nguyên tử' };

  assert.strictEqual(getMatchingFcsCard(qdCard)?.id, 'quantum_dot_qd655_nanocrystal');
  assert.strictEqual(getMatchingFcsCard(egfpCard)?.id, 'egfp_fluorescent_protein_standard');
  assert.strictEqual(getMatchingFcsCard(dnaCard)?.id, 'dna_hybridization_alexa488');
  assert.strictEqual(getMatchingFcsCard(egfrCard)?.id, 'cy5_egf_receptor_dimerization');
  assert.strictEqual(getMatchingFcsCard(r6gCard)?.id, 'rhodamine_6g_primary_calibrant');
  assert.strictEqual(getMatchingFcsCard(nullCard), null);

  console.log('✅ Test 7 Passed: Card matching domain logic routes fluorescent and confocal cards correctly.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 7 Failed:', err);
  process.exit(1);
}

// Test 8: Nobel Prize Citations & Vietnam GDPT 2018 Academic Integrity
try {
  for (const std of FCS_STANDARD_CATALOG) {
    assert.ok(std.isoStandardRef.length > 10, `Standard ${std.id} must cite ISO or Nobel citations`);
    assert.ok(std.curriculumNotes.length > 15, `Standard ${std.id} must include GDPT 2018 curriculum notes`);
  }

  const egfp = FCS_STANDARD_CATALOG[1];
  assert.ok(egfp.isoStandardRef.includes('Nobel'), 'Must cite Nobel Prize 2008 for GFP');

  const qd = FCS_STANDARD_CATALOG[4];
  assert.ok(qd.isoStandardRef.includes('Nobel'), 'Must cite Nobel Prize 2023 for Quantum Dots');
  assert.ok(qd.curriculumNotes.includes('Vật lý 12'), 'Must connect to Vật lý 12 quantum physics');

  console.log('✅ Test 8 Passed: Nobel Prize citations (2008 & 2023) and Vietnam GDPT 2018 curriculum validated.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 8 Failed:', err);
  process.exit(1);
}

console.log(`\n🎉 ALL ${passedTests} / 8 TESTS PASSED FOR MILESTONE 88 (FCS SINGLE-MOLECULE VISUALIZER)!\n`);
