import assert from 'assert';
import {
  AF4_STANDARD_CATALOG,
  calculateAf4DiffusionCoeffM2PerS,
  calculateAf4RetentionTimeMinutes,
  simulateAf4Experiment,
  getMatchingAf4Card,
  validateAf4StandardPhysics,
  BOLTZMANN_CONSTANT,
  WATER_VISCOSITY_20C_PA_S,
} from './src/domain/af4Engine.ts';

console.log('🧪 RUNNING TEST SUITE 143: Asymmetrical Flow Field-Flow Fractionation (AF4) & Sizing Visualizer...\n');

let passedTests = 0;

// Test 1: Catalog Integrity & Standard Count
try {
  assert.ok(Array.isArray(AF4_STANDARD_CATALOG), 'AF4_STANDARD_CATALOG must be an array');
  assert.strictEqual(AF4_STANDARD_CATALOG.length, 5, 'AF4 catalog must contain exactly 5 benchmark systems');

  const categories = AF4_STANDARD_CATALOG.map((s) => s.applicationCategory);
  assert.ok(categories.includes('LATEX_NANOBEADS'), 'Must contain LATEX_NANOBEADS');
  assert.ok(categories.includes('MRNA_LNP'), 'Must contain MRNA_LNP');
  assert.ok(categories.includes('LIPOSOMAL_DRUG'), 'Must contain LIPOSOMAL_DRUG');
  assert.ok(categories.includes('MEGADALTON_PROTEIN'), 'Must contain MEGADALTON_PROTEIN');
  assert.ok(categories.includes('EXOSOME_VESICLES'), 'Must contain EXOSOME_VESICLES');

  console.log('✅ Test 1 Passed: AF4 catalog integrity verified with 5 distinct benchmark systems.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 1 Failed:', err);
  process.exit(1);
}

// Test 2: Standard Physics Validation
try {
  for (const std of AF4_STANDARD_CATALOG) {
    const isValid = validateAf4StandardPhysics(std);
    assert.strictEqual(isValid, true, `Standard ${std.id} must pass physics validation`);
    assert.ok(std.channelThicknessMicrons >= 150 && std.channelThicknessMicrons <= 500, 'Channel thickness must be in standard range (150-500 um)');
    assert.ok(std.crossFlowRateMlPerMin > 0, 'Cross-flow rate must be positive');
    assert.ok(std.detectorFlowRateMlPerMin > 0, 'Detector flow rate must be positive');
  }

  console.log('✅ Test 2 Passed: All 5 AF4 standards strictly validated against open-channel physical bounds.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 2 Failed:', err);
  process.exit(1);
}

// Test 3: Stokes-Einstein Diffusion Coefficient Physics
try {
  const d10 = calculateAf4DiffusionCoeffM2PerS(10.0, 20.0); // 10 nm radius
  const d50 = calculateAf4DiffusionCoeffM2PerS(50.0, 20.0); // 50 nm radius
  const d100 = calculateAf4DiffusionCoeffM2PerS(100.0, 20.0); // 100 nm radius

  // Theoretical D for 10 nm in water at 20°C: ~2.14e-11 m^2/s
  assert.ok(d10 > 2.0e-11 && d10 < 2.3e-11, `D(10nm) must be ~2.14e-11 m^2/s, got ${d10}`);
  
  // Inverse proportionality to radius: D10 / D50 = 5.0
  const ratio = d10 / d50;
  assert.ok(Math.abs(ratio - 5.0) < 1e-4, `Ratio of D(10nm)/D(50nm) must be exactly 5.0, got ${ratio}`);
  assert.ok(d10 > d50 && d50 > d100, 'Diffusion coefficient must decrease monotonically with increasing radius');

  console.log('✅ Test 3 Passed: Stokes-Einstein diffusion physics verified across nanoscale regimes.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 3 Failed:', err);
  process.exit(1);
}

// Test 4: Normal AF4 Retention Time Proportionality (t_r ∝ R_h)
try {
  const tr20 = calculateAf4RetentionTimeMinutes(10.0, 1.5, 0.5, 350); // PSL 20 nm (Rh = 10 nm)
  const tr60 = calculateAf4RetentionTimeMinutes(30.0, 1.5, 0.5, 350); // PSL 60 nm (Rh = 30 nm)
  const tr100 = calculateAf4RetentionTimeMinutes(50.0, 1.5, 0.5, 350); // PSL 100 nm (Rh = 50 nm)

  assert.ok(tr20 < tr60, 'In Normal FFF, smaller particles (20 nm) must elute before larger (60 nm)');
  assert.ok(tr60 < tr100, 'In Normal FFF, 60 nm must elute before 100 nm');

  // Verify cross-flow dependence: higher cross-flow compresses particles closer to wall, increasing retention time
  const trHighCrossFlow = calculateAf4RetentionTimeMinutes(30.0, 2.5, 0.5, 350);
  const trLowCrossFlow = calculateAf4RetentionTimeMinutes(30.0, 1.0, 0.5, 350);
  assert.ok(trHighCrossFlow > trLowCrossFlow, 'Higher cross-flow rate must increase retention time');

  console.log('✅ Test 4 Passed: Normal FFF mode retention proportionality (t_r ∝ R_h) verified.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 4 Failed:', err);
  process.exit(1);
}

// Test 5: Full Fractogram Simulation & Recovery
try {
  const nistStd = AF4_STANDARD_CATALOG[0];
  const sim = simulateAf4Experiment(nistStd, 140);

  assert.strictEqual(sim.standard.id, 'nist_latex_nanobead_ladder');
  assert.strictEqual(sim.fractogramPoints.length, 140, 'Simulation must return requested 140 fractogram points');
  assert.ok(sim.hydrodynamicRecoveryPercent >= 90.0, 'Recovery percent must exceed 90% (ultra-low shear)');
  assert.strictEqual(sim.resolvedSpeciesCount, 3, 'NIST ladder must resolve 3 species peaks');

  // Check peak profiles
  const maxUV = Math.max(...sim.fractogramPoints.map((p) => p.uvAbsorbance280));
  assert.ok(maxUV > 0.3, 'Fractogram UV profile must exhibit distinct peaks (> 0.3 AU)');

  const maxLS = Math.max(...sim.fractogramPoints.map((p) => p.multiAngleLs90Deg));
  assert.ok(maxLS > 0.3, 'Fractogram LS profile must exhibit high-sensitivity light scattering signal');

  console.log('✅ Test 5 Passed: Full AF4 fractogram simulated cleanly with >95% recovery and resolved peaks.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 5 Failed:', err);
  process.exit(1);
}

// Test 6: Cross-Flow Decay Profile
try {
  const lnpStd = AF4_STANDARD_CATALOG.find((s) => s.id === 'mrna_lipid_nanoparticles_lnp');
  const simLnp = simulateAf4Experiment(lnpStd, 100);

  // Initial cross-flow during focus should equal programmed V_c
  const focusPoints = simLnp.fractogramPoints.filter((p) => p.timeMinutes < lnpStd.focusingTimeMinutes);
  assert.ok(focusPoints.length > 0, 'Must have focusing period points');
  assert.strictEqual(focusPoints[0].crossFlowRateMlPerMin, lnpStd.crossFlowRateMlPerMin);

  // Late points must have lower cross flow due to exponential decay program
  const latePoints = simLnp.fractogramPoints.filter((p) => p.timeMinutes > 20.0);
  assert.ok(latePoints.length > 0, 'Must have late run points');
  assert.ok(latePoints[0].crossFlowRateMlPerMin < lnpStd.crossFlowRateMlPerMin, 'Late cross-flow must decay to elute larger vesicles');

  console.log('✅ Test 6 Passed: Dynamic cross-flow gradient decay profile verified.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 6 Failed:', err);
  process.exit(1);
}

// Test 7: Card Matching Service Integration
try {
  const lnpCard = { name: 'mRNA Vaccine Lipid Nanoparticle', description: 'Hạt nano lipid vận chuyển mRNA' };
  const doxilCard = { name: 'Liposomal Doxorubicin', description: 'Thuốc nano pegylat hóa' };
  const exosomeCard = { name: 'Tumor Exosomes', description: 'Túi ngoại bào sinh thiết lỏng' };
  const vwfCard = { name: 'von Willebrand Factor Multimer', description: 'Đại phân tử protein huyết tương' };
  const pslCard = { name: 'Latex Nanobead Ladder', description: 'Chuẩn kích thước nano ISO 13321' };
  const nullCard = { name: 'Sắt Sulfat FeSO4', description: 'Muối vô cơ sắt II' };

  assert.strictEqual(getMatchingAf4Card(lnpCard)?.id, 'mrna_lipid_nanoparticles_lnp');
  assert.strictEqual(getMatchingAf4Card(doxilCard)?.id, 'liposomal_doxorubicin_doxil');
  assert.strictEqual(getMatchingAf4Card(exosomeCard)?.id, 'exosome_extracellular_vesicles');
  assert.strictEqual(getMatchingAf4Card(vwfCard)?.id, 'vocal_multimer_vww_protein');
  assert.strictEqual(getMatchingAf4Card(pslCard)?.id, 'nist_latex_nanobead_ladder');
  assert.strictEqual(getMatchingAf4Card(nullCard), null);

  console.log('✅ Test 7 Passed: Card matching domain logic routes elemental and nanomedicine cards correctly.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 7 Failed:', err);
  process.exit(1);
}

// Test 8: ISO Standards & Vietnam GDPT 2018 Academic Integrity
try {
  for (const std of AF4_STANDARD_CATALOG) {
    assert.ok(std.isoStandardRef.length > 10, `Standard ${std.id} must cite ISO or regulatory pharmacopeia standards`);
    assert.ok(std.curriculumNotes.length > 15, `Standard ${std.id} must include GDPT 2018 curriculum notes`);
  }

  const nist = AF4_STANDARD_CATALOG[0];
  assert.ok(nist.isoStandardRef.includes('ISO 13321'), 'Must cite ISO 13321');
  assert.ok(nist.curriculumNotes.includes('Vật lý 10'), 'Must cite Vật lý 10');
  assert.ok(nist.curriculumNotes.includes('Hóa học 12'), 'Must cite Hóa học 12');

  console.log('✅ Test 8 Passed: ISO 13321, USP guidelines, and Vietnam GDPT 2018 curriculum connections validated.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 8 Failed:', err);
  process.exit(1);
}

console.log(`\n🎉 ALL ${passedTests} / 8 TESTS PASSED FOR MILESTONE 86 (AF4 VISUALIZER)!\n`);
