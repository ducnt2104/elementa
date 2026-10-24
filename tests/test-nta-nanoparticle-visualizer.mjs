import assert from 'node:assert';
import {
  NTA_STANDARD_CATALOG,
  BOLTZMANN_CONSTANT_J_PER_K,
  calculateWaterViscosityPaS,
  calculateStokesEinsteinDiffusionCoeff,
  generateBrownianTrajectory,
  simulateNtaExperiment,
  getMatchingNtaCard,
  validateNtaStandardPhysics,
} from '../src/domain/ntaEngine.ts';

console.log('🧪 ========================================================');
console.log('🧪 ELEMENTA TEST SUITE 135: NANOPARTICLE TRACKING ANALYSIS (NTA)');
console.log('🧪 Stokes-Einstein · Brownian Motion · ISO 19430 Single-Particle Sizing');
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
// 1. Boltzmann Constant & Standards Catalog Verification
// -----------------------------------------------------------------------------
runTest('CODATA Boltzmann constant is exact', () => {
  assert.strictEqual(BOLTZMANN_CONSTANT_J_PER_K, 1.380649e-23, 'Boltzmann constant must be 1.380649e-23 J/K');
});

runTest('NTA Catalog contains 5 benchmark particulate systems', () => {
  assert.strictEqual(NTA_STANDARD_CATALOG.length, 5, 'Must contain 5 benchmark standards');
  const ids = NTA_STANDARD_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('nist_100nm_polystyrene_beads'), 'Must include NIST 100nm latex');
  assert.ok(ids.includes('exosome_extracellular_vesicles'), 'Must include Exosomes');
  assert.ok(ids.includes('lipid_nanoparticles_mrna_vaccine'), 'Must include LNP mRNA vaccine');
  assert.ok(ids.includes('adeno_associated_virus_vector'), 'Must include AAV capsid');
  assert.ok(ids.includes('gold_nanoparticles_plasmonic'), 'Must include AuNPs');
});

runTest('NIST 100 nm standard conforms to ISO 19430 monodisperse specifications', () => {
  const std = NTA_STANDARD_CATALOG.find((s) => s.id === 'nist_100nm_polystyrene_beads');
  assert.ok(std, 'NIST standard must exist');
  assert.strictEqual(std.particleType, 'POLYMER_CALIBRANT');
  assert.ok(Math.abs(std.trueMeanDiameterNm - 100.2) < 0.1, 'Mean diameter must be 100.2 nm');
  assert.strictEqual(std.refractiveIndex, 1.59, 'Polystyrene refractive index must be 1.59');
  assert.ok(std.isoStandardRef.includes('19430'), 'Must cite ISO 19430');
  assert.ok(validateNtaStandardPhysics(std), 'Standard physics must validate as true');
});

runTest('Exosome standard reflects biological extracellular vesicle polydispersity', () => {
  const exo = NTA_STANDARD_CATALOG.find((s) => s.id === 'exosome_extracellular_vesicles');
  assert.ok(exo, 'Exosome standard must exist');
  assert.strictEqual(exo.particleType, 'EXTRACELLULAR_VESICLE');
  assert.ok(exo.trueModeDiameterNm >= 70 && exo.trueModeDiameterNm <= 100, 'Mode must be 70-100 nm');
  assert.strictEqual(exo.optimalLaserWavelengthNm, 405, 'Exosomes use 405 nm violet laser');
  assert.ok(validateNtaStandardPhysics(exo), 'Physics must be valid');
});

// -----------------------------------------------------------------------------
// 2. Water Viscosity & Stokes-Einstein Diffusion Physics
// -----------------------------------------------------------------------------
runTest('calculateWaterViscosityPaS predicts temperature-dependent water thinning', () => {
  const eta20 = calculateWaterViscosityPaS(20.0);
  const eta25 = calculateWaterViscosityPaS(25.0);
  const eta37 = calculateWaterViscosityPaS(37.0);

  // At 20°C: ~ 1.00 mPa*s (0.00100 Pa*s)
  assert.ok(eta20 > 0.00095 && eta20 < 0.00105, `eta(20°C) (${eta20}) must be ~ 0.0010 Pa*s`);
  // Viscosity must drop monotonically with increasing temperature
  assert.ok(eta25 < eta20, `eta(25°C) (${eta25}) must be lower than eta(20°C) (${eta20})`);
  assert.ok(eta37 < eta25, `eta(37°C) (${eta37}) must be lower than eta(25°C) (${eta25})`);
});

runTest('calculateStokesEinsteinDiffusionCoeff scales inversely with diameter (Dt ~ 1/dH)', () => {
  const dt100 = calculateStokesEinsteinDiffusionCoeff(100.0, 25.0); // 100 nm
  const dt200 = calculateStokesEinsteinDiffusionCoeff(200.0, 25.0); // 200 nm (2x diameter)

  // Expected ratio: dt100 / dt200 = 2.0 exactly
  const ratio = dt100 / dt200;
  assert.ok(Math.abs(ratio - 2.0) < 1e-4, `Ratio (${ratio}) must be 2.0`);

  // Order of magnitude for 100 nm at 25°C: D_t ~ 4.9e-12 m^2/s
  assert.ok(dt100 > 4.0e-12 && dt100 < 6.0e-12, `dt100 (${dt100}) must be ~ 4.9e-12 m^2/s`);
});

runTest('Higher temperature accelerates Brownian diffusion D_t', () => {
  const dtCold = calculateStokesEinsteinDiffusionCoeff(100.0, 10.0); // 10°C
  const dtHot = calculateStokesEinsteinDiffusionCoeff(100.0, 40.0); // 40°C

  assert.ok(dtHot > dtCold, `Diffusion at 40°C (${dtHot}) must be significantly faster than at 10°C (${dtCold})`);
  // At 40°C vs 10°C, Dt should be roughly ~ 2x higher due to lower viscosity and higher T
  const tempBoostRatio = dtHot / dtCold;
  assert.ok(tempBoostRatio > 1.8 && tempBoostRatio < 2.5, `Temperature boost ratio (${tempBoostRatio}) expected ~2.1`);
});

// -----------------------------------------------------------------------------
// 3. 2D Brownian Motion Trajectory Simulation
// -----------------------------------------------------------------------------
runTest('generateBrownianTrajectory produces continuous 2D coordinate sequence', () => {
  const traj = generateBrownianTrajectory(100.0, 25.0, 30, 0.0333);
  assert.strictEqual(traj.length, 30, 'Trajectory must contain 30 points');
  assert.strictEqual(traj[0].frameIndex, 0, 'First frame index must be 0');
  assert.strictEqual(traj[29].frameIndex, 29, 'Last frame index must be 29');

  // Verify coordinates are numbers and finite
  for (const pt of traj) {
    assert.ok(!Number.isNaN(pt.xMicrons), 'x coordinate must not be NaN');
    assert.ok(!Number.isNaN(pt.yMicrons), 'y coordinate must not be NaN');
    assert.ok(Number.isFinite(pt.xMicrons), 'x coordinate must be finite');
  }
});

// -----------------------------------------------------------------------------
// 4. Particle Size Distribution (PSD) & Percentiles
// -----------------------------------------------------------------------------
runTest('simulateNtaExperiment produces accurate percentiles and mode diameter', () => {
  const std = NTA_STANDARD_CATALOG.find((s) => s.id === 'nist_100nm_polystyrene_beads');
  const sim = simulateNtaExperiment(std);

  assert.strictEqual(sim.standard.id, std.id);
  assert.ok(Math.abs(sim.modeDiameterNm - 99.8) < 1.0, `Mode diameter (${sim.modeDiameterNm}) must be ~99.8 nm`);
  assert.ok(sim.d10Nm < sim.d50Nm, `D10 (${sim.d10Nm}) must be < D50 (${sim.d50Nm})`);
  assert.ok(sim.d50Nm < sim.d90Nm, `D50 (${sim.d50Nm}) must be < D90 (${sim.d90Nm})`);
  assert.ok(sim.spanMetric < 0.25, `NIST monodisperse span (${sim.spanMetric}) must be < 0.25`);

  assert.strictEqual(sim.trackedParticles.length, 8, 'Must track 8 particles for live view');
  assert.ok(sim.distributionCurve.length > 50, 'Must have > 50 distribution points');
});

runTest('simulateNtaExperiment confirms wide polydispersity span for biological exosomes', () => {
  const exo = NTA_STANDARD_CATALOG.find((s) => s.id === 'exosome_extracellular_vesicles');
  const sim = simulateNtaExperiment(exo);

  // Biological exosomes have wider span > 0.40
  assert.ok(sim.spanMetric > 0.40, `Exosome span (${sim.spanMetric}) must exceed 0.40`);
  assert.ok(sim.totalConcentrationParticlesPerMl > 1.0e9, 'Exosome concentration must be > 1e9 particles/mL');
});

// -----------------------------------------------------------------------------
// 5. Card Matching Service
// -----------------------------------------------------------------------------
runTest('getMatchingNtaCard accurately maps nanoparticles, vesicles, and viral vectors', () => {
  const latexCard = { name: 'Latex Polystyrene Nanospheres', chemicalFormula: '[C8H8]n', description: 'NIST calibrant' };
  const matchLatex = getMatchingNtaCard(latexCard);
  assert.ok(matchLatex, 'Must match Polystyrene');
  assert.strictEqual(matchLatex.id, 'nist_100nm_polystyrene_beads');

  const exoCard = { name: 'Bóng Màng Ngoại Bào Exosome Khối U', chemicalFormula: '', description: 'Extracellular vesicle biomarker' };
  const matchExo = getMatchingNtaCard(exoCard);
  assert.ok(matchExo, 'Must match Exosome');
  assert.strictEqual(matchExo.id, 'exosome_extracellular_vesicles');

  const lnpCard = { name: 'Hạt Nano Lipid LNP Vaccine mRNA', chemicalFormula: '', description: 'Lipid nanoparticle delivery system' };
  const matchLnp = getMatchingNtaCard(lnpCard);
  assert.ok(matchLnp, 'Must match LNP');
  assert.strictEqual(matchLnp.id, 'lipid_nanoparticles_mrna_vaccine');

  const aavCard = { name: 'Vector Adeno-Associated Virus (AAV)', chemicalFormula: '', description: 'Capsid vector for gene therapy' };
  const matchAav = getMatchingNtaCard(aavCard);
  assert.ok(matchAav, 'Must match AAV');
  assert.strictEqual(matchAav.id, 'adeno_associated_virus_vector');

  const auCard = { name: 'Hạt Vàng Keo AuNP Tán Xạ Plasmon', chemicalFormula: 'Au', description: 'Colloidal gold nano' };
  const matchAu = getMatchingNtaCard(auCard);
  assert.ok(matchAu, 'Must match AuNP');
  assert.strictEqual(matchAu.id, 'gold_nanoparticles_plasmonic');

  const waterCard = { name: 'Nước Cất Khử Ion', chemicalFormula: 'H2O', description: 'Dung môi tinh khiết' };
  const matchWater = getMatchingNtaCard(waterCard);
  assert.strictEqual(matchWater, null, 'Pure solvent without nanoparticles must return null');
});

// -----------------------------------------------------------------------------
// 6. Physics Validation & Invariant Testing
// -----------------------------------------------------------------------------
runTest('validateNtaStandardPhysics rejects zero diameter or negative concentration', () => {
  const zeroDiameter = { ...NTA_STANDARD_CATALOG[0], trueMeanDiameterNm: 0 };
  assert.strictEqual(validateNtaStandardPhysics(zeroDiameter), false, 'Must reject zero diameter');

  const negativeConc = { ...NTA_STANDARD_CATALOG[0], nominalConcentrationParticlesPerMl: -1e8 };
  assert.strictEqual(validateNtaStandardPhysics(negativeConc), false, 'Must reject negative concentration');

  const zeroIndex = { ...NTA_STANDARD_CATALOG[0], refractiveIndex: 0 };
  assert.strictEqual(validateNtaStandardPhysics(zeroIndex), false, 'Must reject zero refractive index');
});

runTest('All 5 NTA standards simulate cleanly across temperature bounds', () => {
  for (const std of NTA_STANDARD_CATALOG) {
    // Test at cold 10°C
    const simCold = simulateNtaExperiment(std, 10.0);
    assert.ok(!Number.isNaN(simCold.modeDiameterNm), `Mode must be finite for ${std.id}`);
    assert.ok(!Number.isNaN(simCold.diffusionCoeffModeM2S), `Dt must be finite for ${std.id}`);

    // Test at hot 45°C
    const simHot = simulateNtaExperiment(std, 45.0);
    assert.ok(simHot.trackedParticles.length === 8, `Must have 8 tracks for ${std.id}`);
    assert.ok(simHot.distributionCurve.length > 0, `Must have distribution for ${std.id}`);
  }
});

console.log('\n========================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('🎉 Nanoparticle Tracking Analysis (NTA) Engine verified!');
console.log('========================================================\n');
