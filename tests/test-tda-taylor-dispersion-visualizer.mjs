import assert from 'assert';
import {
  TDA_STANDARD_CATALOG,
  calculateTdaStokesEinsteinD,
  calculateTdaRadiusFromD,
  calculateTdaPeakVarianceSec2,
  extractTdaDiffusionFromDualWindows,
  simulateTdaExperiment,
  getMatchingTdaCard,
  validateTdaStandardPhysics,
  BOLTZMANN_CONSTANT,
  WATER_VISCOSITY_20C_PA_S,
} from '../src/domain/tdaEngine.ts';

console.log('🧪 RUNNING TEST SUITE 144: Taylor Dispersion Analysis (TDA) & Sizing Visualizer...\n');

let passedTests = 0;

// Test 1: Standard Catalog Integrity
try {
  assert.ok(Array.isArray(TDA_STANDARD_CATALOG), 'TDA_STANDARD_CATALOG must be an array');
  assert.strictEqual(TDA_STANDARD_CATALOG.length, 5, 'Catalog must contain 5 benchmark systems');

  const categories = TDA_STANDARD_CATALOG.map((s) => s.applicationCategory);
  assert.ok(categories.includes('SMALL_MOLECULE'), 'Must contain SMALL_MOLECULE');
  assert.ok(categories.includes('PEPTIDE_HORMONE'), 'Must contain PEPTIDE_HORMONE');
  assert.ok(categories.includes('ANTIBODY_BIOLOGIC'), 'Must contain ANTIBODY_BIOLOGIC');
  assert.ok(categories.includes('NUCLEIC_APTAMER'), 'Must contain NUCLEIC_APTAMER');
  assert.ok(categories.includes('VIRAL_CAPSID'), 'Must contain VIRAL_CAPSID');

  console.log('✅ Test 1 Passed: TDA benchmark catalog contains 5 comprehensive physical systems.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 1 Failed:', err);
  process.exit(1);
}

// Test 2: Standard Physical Validity
try {
  for (const std of TDA_STANDARD_CATALOG) {
    const isValid = validateTdaStandardPhysics(std);
    assert.strictEqual(isValid, true, `Standard ${std.id} must pass physical validation`);
    assert.ok(std.capillaryRadiusMicrons >= 10 && std.capillaryRadiusMicrons <= 100, 'Capillary radius must be 10-100 um');
    assert.ok(std.capillaryLengthWindow2Cm > std.capillaryLengthWindow1Cm, 'Window 2 must be downstream from Window 1');
    assert.ok(std.drivePressureMbar > 0, 'Drive pressure must be positive');
  }

  console.log('✅ Test 2 Passed: All 5 TDA systems pass physical boundary criteria.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 2 Failed:', err);
  process.exit(1);
}

// Test 3: Stokes-Einstein Diffusion & Radius Inversion Physics
try {
  const rCaffeine = 0.48; // nm
  const dCaffeine = calculateTdaStokesEinsteinD(rCaffeine, 20.0);
  
  // Theoretical D for 0.48 nm in water at 20°C: ~4.47e-10 m^2/s
  assert.ok(dCaffeine > 4.3e-10 && dCaffeine < 4.6e-10, `D(caffeine) must be ~4.47e-10 m^2/s, got ${dCaffeine}`);

  const recoveredR = calculateTdaRadiusFromD(dCaffeine, 20.0);
  assert.ok(Math.abs(recoveredR - rCaffeine) < 1e-6, `Recovered radius must match 0.48 nm, got ${recoveredR}`);

  const rIgG = 5.38; // nm
  const dIgG = calculateTdaStokesEinsteinD(rIgG, 20.0);
  assert.ok(dCaffeine > dIgG, 'Small molecule D must be significantly greater than antibody biologic D');

  console.log('✅ Test 3 Passed: Stokes-Einstein bidirectional diffusion and radius calculations verified.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 3 Failed:', err);
  process.exit(1);
}

// Test 4: Taylor-Aris Peak Variance & Dual-Window Exact Inversion
try {
  const rUm = 25.0; // 25 um capillary radius
  const t1 = 45.0; // seconds to window 1
  const t2 = 75.0; // seconds to window 2
  const trueD = 4.45e-10; // m^2/s

  const sig1Sq = calculateTdaPeakVarianceSec2(rUm, t1, trueD);
  const sig2Sq = calculateTdaPeakVarianceSec2(rUm, t2, trueD);

  assert.ok(sig2Sq > sig1Sq, 'Window 2 peak variance must be strictly greater than Window 1 (axial dispersion)');

  // Extract D using dual-window variance difference
  const extractedD = extractTdaDiffusionFromDualWindows(rUm, t1, t2, sig1Sq, sig2Sq);
  assert.ok(Math.abs(extractedD - trueD) / trueD < 1e-6, `Dual-window difference formula must recover exact D, error < 1e-6`);

  console.log('✅ Test 4 Passed: Taylor-Aris dual-window subtraction yields exact calibration-free diffusion coefficient.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 4 Failed:', err);
  process.exit(1);
}

// Test 5: Full Taylorgram Simulation
try {
  const caffeineStd = TDA_STANDARD_CATALOG[0];
  const sim = simulateTdaExperiment(caffeineStd, 140);

  assert.strictEqual(sim.standard.id, 'caffeine_paracetamol_small_molecule');
  assert.strictEqual(sim.taylorgramPoints.length, 140, 'Simulation must return 140 points');
  assert.ok(sim.window2TransitTimeSec > sim.window1TransitTimeSec, 'Window 2 transit time must exceed Window 1');
  assert.ok(sim.pecletNumber > 50, `Péclet number must be >> 1 for Taylor dispersion regime, got ${sim.pecletNumber}`);

  // Max peak height of window 1 must be higher than window 2 (dispersion conservation of mass)
  const maxW1 = Math.max(...sim.taylorgramPoints.map((p) => p.window1AbsorbanceUv));
  const maxW2 = Math.max(...sim.taylorgramPoints.map((p) => p.window2AbsorbanceUv));
  assert.ok(maxW1 > maxW2, `Window 1 peak (${maxW1}) must be sharper and higher than dispersed Window 2 peak (${maxW2})`);

  // Extracted radius should match nominal caffeine radius (0.48 nm)
  assert.ok(Math.abs(sim.extractedHydrodynamicRadiusNm - 0.48) < 0.05, `Extracted radius must match 0.48 nm, got ${sim.extractedHydrodynamicRadiusNm}`);

  console.log('✅ Test 5 Passed: Full dual-window Taylorgram simulated with dispersion peak flattening and exact size recovery.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 5 Failed:', err);
  process.exit(1);
}

// Test 6: Macromolecular Sizing (NISTmAb Monoclonal Antibody)
try {
  const mabStd = TDA_STANDARD_CATALOG.find((s) => s.id === 'nistmab_therapeutic_monoclonal_antibody');
  const simMab = simulateTdaExperiment(mabStd, 140);

  assert.ok(simMab.extractedHydrodynamicRadiusNm > 5.0 && simMab.extractedHydrodynamicRadiusNm < 5.8, 'NISTmAb extracted radius must be ~5.38 nm');
  assert.ok(simMab.extractedDiffusionCoeffM2PerS < 5.0e-11, 'NISTmAb diffusion coefficient must be in 4e-11 m^2/s range');

  console.log('✅ Test 6 Passed: NISTmAb RM 8671 therapeutic antibody sizing verified in simulated excipient buffer.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 6 Failed:', err);
  process.exit(1);
}

// Test 7: Card Matching Service Integration
try {
  const caffeineCard = { name: 'Caffeine Alkaloid', description: 'Phân tử nhỏ chuẩn độ tán xạ Viscosizer' };
  const insulinCard = { name: 'Human Insulin', description: 'Hormone peptide lục phân kẽm' };
  const mabCard = { name: 'NISTmAb RM 8671', description: 'Kháng thể đơn dòng IgG1' };
  const aptamerCard = { name: 'Thrombin Aptamer', description: 'Cấu trúc G-quadruplex' };
  const aavCard = { name: 'AAV8 Capsid Vector', description: 'Hạt virus trị liệu gen' };
  const nullCard = { name: 'Muối ăn NaCl', description: 'Tinh thể ion natri clorua' };

  assert.strictEqual(getMatchingTdaCard(caffeineCard)?.id, 'caffeine_paracetamol_small_molecule');
  assert.strictEqual(getMatchingTdaCard(insulinCard)?.id, 'human_insulin_monomer_hexamer');
  assert.strictEqual(getMatchingTdaCard(mabCard)?.id, 'nistmab_therapeutic_monoclonal_antibody');
  assert.strictEqual(getMatchingTdaCard(aptamerCard)?.id, 'thrombin_binding_aptamer_dna');
  assert.strictEqual(getMatchingTdaCard(aavCard)?.id, 'adeno_associated_virus_aav8_capsid');
  assert.strictEqual(getMatchingTdaCard(nullCard), null);

  console.log('✅ Test 7 Passed: Card matching domain logic correctly routes peptide, antibody, and virus cards.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 7 Failed:', err);
  process.exit(1);
}

// Test 8: ISO Standards & Vietnam GDPT 2018 Academic Integrity
try {
  for (const std of TDA_STANDARD_CATALOG) {
    assert.ok(std.isoStandardRef.length > 10, `Standard ${std.id} must cite ASTM, ISO, or USP guidelines`);
    assert.ok(std.curriculumNotes.length > 15, `Standard ${std.id} must include GDPT 2018 curriculum notes`);
  }

  const caffeine = TDA_STANDARD_CATALOG[0];
  assert.ok(caffeine.curriculumNotes.includes('Vật lý 10'), 'Must connect to Vật lý 10 Poiseuille flow');

  const insulin = TDA_STANDARD_CATALOG[1];
  assert.ok(insulin.curriculumNotes.includes('Hóa học 12'), 'Must connect to Hóa học 12 peptides & zinc coordination');

  console.log('✅ Test 8 Passed: International ASTM/ISO standards and Vietnam GDPT 2018 curriculum integration validated.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 8 Failed:', err);
  process.exit(1);
}

console.log(`\n🎉 ALL ${passedTests} / 8 TESTS PASSED FOR MILESTONE 87 (TDA TAYLOR DISPERSION VISUALIZER)!\n`);
