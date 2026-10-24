import assert from 'assert';
import {
  FLIM_STANDARD_CATALOG,
  calculateFlimFretEfficiencyPercent,
  calculateFlimIntermolecularDistanceNm,
  calculateFlimPhasorCoordinates,
  simulateFlimExperiment,
  getMatchingFlimCard,
  validateFlimStandardPhysics,
} from './src/domain/flimEngine.ts';

console.log('🧪 RUNNING TEST SUITE 146: Fluorescence Lifetime Imaging (FLIM) & TCSPC Visualizer...\n');

let passedTests = 0;

// Test 1: Standard Catalog Integrity
try {
  assert.ok(Array.isArray(FLIM_STANDARD_CATALOG), 'FLIM_STANDARD_CATALOG must be an array');
  assert.strictEqual(FLIM_STANDARD_CATALOG.length, 5, 'Catalog must contain 5 benchmark systems');

  const categories = FLIM_STANDARD_CATALOG.map((s) => s.applicationCategory);
  assert.ok(categories.includes('PRIMARY_CALIBRANT'), 'Must contain PRIMARY_CALIBRANT');
  assert.ok(categories.includes('FLIM_FRET'), 'Must contain FLIM_FRET');
  assert.ok(categories.includes('PH_BIOSENSOR'), 'Must contain PH_BIOSENSOR');
  assert.ok(categories.includes('MEMBRANE_VISCOSITY'), 'Must contain MEMBRANE_VISCOSITY');
  assert.ok(categories.includes('METABOLIC_NADH'), 'Must contain METABOLIC_NADH');

  console.log('✅ Test 1 Passed: FLIM benchmark catalog contains 5 comprehensive physical systems.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 1 Failed:', err);
  process.exit(1);
}

// Test 2: Standard Physical Validity
try {
  for (const std of FLIM_STANDARD_CATALOG) {
    const isValid = validateFlimStandardPhysics(std);
    assert.strictEqual(isValid, true, `Standard ${std.id} must pass physical validation`);
    assert.ok(std.laserRepetitionRateMhz >= 20 && std.laserRepetitionRateMhz <= 80, 'Laser repetition rate must be 20-80 MHz');
    assert.ok(std.irfFwhmPicoseconds >= 50 && std.irfFwhmPicoseconds <= 300, 'IRF width must be 50-300 ps');
  }

  console.log('✅ Test 2 Passed: All 5 FLIM systems pass laser repetition and component amplitude bounds.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 2 Failed:', err);
  process.exit(1);
}

// Test 3: FLIM-FRET Efficiency & Nanometer Molecular Ruler Distance
try {
  const tauD = 2.68; // ns (CFP alone)
  const tauDA = 1.45; // ns (CFP quenched by YFP)
  const r0 = 4.92; // nm

  const fretEff = calculateFlimFretEfficiencyPercent(tauD, tauDA);
  assert.ok(Math.abs(fretEff - 45.9) < 0.2, `FRET efficiency must be ~45.9%, got ${fretEff}`);

  const distanceNm = calculateFlimIntermolecularDistanceNm(fretEff, r0);
  assert.ok(distanceNm > 4.9 && distanceNm < 5.3, `Distance r must be ~5.1 nm, got ${distanceNm}`);

  console.log('✅ Test 3 Passed: FLIM-FRET donor lifetime quenching and nanometer ruler distance verified.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 3 Failed:', err);
  process.exit(1);
}

// Test 4: Phasor Plot Universal Semicircle Geometry
try {
  // Test mono-exponential Fluorescein (tau = 4.05 ns, rep rate = 40 MHz)
  const fitcStd = FLIM_STANDARD_CATALOG[0];
  const phasorFitc = calculateFlimPhasorCoordinates(fitcStd.components, fitcStd.laserRepetitionRateMhz);

  // Universal Semicircle equation: (g - 0.5)^2 + s^2 = 0.25
  const circleDist = Math.pow(phasorFitc.g - 0.5, 2) + Math.pow(phasorFitc.s, 2);
  assert.ok(Math.abs(circleDist - 0.25) < 0.005, `Mono-exponential decay must lie exactly on Universal Semicircle (0.25), got ${circleDist}`);

  // Test multi-component system (NADH free vs bound)
  const nadhStd = FLIM_STANDARD_CATALOG.find((s) => s.id === 'nadh_metabolic_coenzyme_glycolysis');
  const phasorNadh = calculateFlimPhasorCoordinates(nadhStd.components, nadhStd.laserRepetitionRateMhz);
  const circleDistNadh = Math.pow(phasorNadh.g - 0.5, 2) + Math.pow(phasorNadh.s, 2);
  assert.ok(circleDistNadh < 0.25, `Multi-exponential decay must lie strictly INSIDE the semicircle (< 0.25), got ${circleDistNadh}`);

  console.log('✅ Test 4 Passed: Phasor Plot frequency-domain Universal Semicircle geometry validated.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 4 Failed:', err);
  process.exit(1);
}

// Test 5: Full TCSPC Decay Curve Simulation
try {
  const snarfStd = FLIM_STANDARD_CATALOG.find((s) => s.id === 'snarf5f_lysosomal_ph_biosensor');
  const sim = simulateFlimExperiment(snarfStd, 120);

  assert.strictEqual(sim.standard.id, 'snarf5f_lysosomal_ph_biosensor');
  assert.strictEqual(sim.decayPoints.length, 120, 'Must return 120 time bins');
  assert.strictEqual(sim.laserPeriodNanoseconds, 25.0, '40 MHz laser period must be 25.0 ns');

  // Peak counts should be around 10,000 counts
  const maxCounts = Math.max(...sim.decayPoints.map((p) => p.intensityCounts));
  assert.ok(maxCounts > 5000 && maxCounts <= 10000, `Peak TCSPC counts must be near 10,000, got ${maxCounts}`);

  // Amplitude-weighted lifetime calculation: 0.65 * 1.15 + 0.35 * 3.80 = 0.7475 + 1.33 = 2.0775 ns
  assert.ok(Math.abs(sim.amplitudeWeightedLifetimeNs - 2.08) < 0.05, `Weighted lifetime must be ~2.08 ns, got ${sim.amplitudeWeightedLifetimeNs}`);

  console.log('✅ Test 5 Passed: Full TCSPC multi-exponential photon histogramming simulated cleanly.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 5 Failed:', err);
  process.exit(1);
}

// Test 6: Membrane Viscosity Molecular Rotor State
try {
  const bodipyStd = FLIM_STANDARD_CATALOG.find((s) => s.id === 'bodipy_c12_membrane_viscosity_rotor');
  const sim = simulateFlimExperiment(bodipyStd, 100);

  const rigidComponent = bodipyStd.components[0];
  const fluidComponent = bodipyStd.components[1];

  assert.ok(rigidComponent.lifetimeNanoseconds > fluidComponent.lifetimeNanoseconds, 'Rigid lipid raft must significantly prolong molecular rotor lifetime');

  console.log('✅ Test 6 Passed: BODIPY molecular rotor membrane lipid raft viscosity sensing verified.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 6 Failed:', err);
  process.exit(1);
}

// Test 7: Card Matching Service Integration
try {
  const fretCard = { name: 'CFP-YFP Biosensor', description: 'Cảm biến FRET đo tương tác phân tử' };
  const nadhCard = { name: 'NADH Coenzyme', description: 'Chuyển hóa năng lượng tế bào hiệu ứng Warburg' };
  const bodipyCard = { name: 'BODIPY Lipid Rotor', description: 'Đo độ nhớt màng tế bào' };
  const snarfCard = { name: 'SNARF-5F Probe', description: 'Đo pH tiêu thể lysosome' };
  const fitcCard = { name: 'Fluorescein FITC', description: 'Chuẩn thời gian sống TCSPC 4.05 ns' };
  const nullCard = { name: 'Kim Cương Carbon', description: 'Tinh thể cộng hóa trị bền vững' };

  assert.strictEqual(getMatchingFlimCard(fretCard)?.id, 'cfp_yfp_biosensor_flim_fret');
  assert.strictEqual(getMatchingFlimCard(nadhCard)?.id, 'nadh_metabolic_coenzyme_glycolysis');
  assert.strictEqual(getMatchingFlimCard(bodipyCard)?.id, 'bodipy_c12_membrane_viscosity_rotor');
  assert.strictEqual(getMatchingFlimCard(snarfCard)?.id, 'snarf5f_lysosomal_ph_biosensor');
  assert.strictEqual(getMatchingFlimCard(fitcCard)?.id, 'fluorescein_basic_primary_calibrant');
  assert.strictEqual(getMatchingFlimCard(nullCard), null);

  console.log('✅ Test 7 Passed: Card matching domain logic routes FRET, metabolic, and rotor cards correctly.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 7 Failed:', err);
  process.exit(1);
}

// Test 8: Historical Nobel Citations & Vietnam GDPT 2018 Academic Integrity
try {
  for (const std of FLIM_STANDARD_CATALOG) {
    assert.ok(std.isoStandardRef.length > 10, `Standard ${std.id} must cite ISO, IUPAC, or Nobel benchmarks`);
    assert.ok(std.curriculumNotes.length > 15, `Standard ${std.id} must include GDPT 2018 curriculum notes`);
  }

  const nadh = FLIM_STANDARD_CATALOG[4];
  assert.ok(nadh.isoStandardRef.includes('Warburg'), 'Must cite Otto Warburg Nobel historical discovery');
  assert.ok(nadh.curriculumNotes.includes('Sinh học 10 & 11'), 'Must connect to Sinh học 10 & 11 cellular respiration');

  const fitc = FLIM_STANDARD_CATALOG[0];
  assert.ok(fitc.curriculumNotes.includes('Vật lý 12'), 'Must connect to Vật lý 12 quantum excitation lifetimes');

  console.log('✅ Test 8 Passed: Nobel citations and Vietnam GDPT 2018 curriculum integration validated.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 8 Failed:', err);
  process.exit(1);
}

console.log(`\n🎉 ALL ${passedTests} / 8 TESTS PASSED FOR MILESTONE 89 (FLIM / TCSPC VISUALIZER)!\n`);
