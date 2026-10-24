import assert from 'node:assert';
import {
  AUC_STANDARD_CATALOG,
  SVEDBERG_UNIT_SECONDS,
  GAS_CONSTANT_R,
  WATER_DENSITY_20C,
  calculateRelativeCentrifugalFieldG,
  calculateMolarMassFromSvedbergEquation,
  simulateAucExperiment,
  getMatchingAucCard,
  validateAucStandardPhysics,
} from './src/domain/aucEngine.ts';

console.log('🧪 ====================================================================');
console.log('🧪 ELEMENTA TEST SUITE 142: ANALYTICAL ULTRACENTRIFUGATION (AUC)');
console.log('🧪 Svedberg Equation · Lamm Boundary · Ribosome 70S & AAV Capsids');
console.log('🧪 ====================================================================\n');

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
runTest('AUC Catalog contains 5 international benchmark ultracentrifugation systems', () => {
  assert.strictEqual(AUC_STANDARD_CATALOG.length, 5, 'Must contain 5 benchmark standards');
  const ids = AUC_STANDARD_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('lysozyme_hewl_monomer_calibrant'), 'Must include Lysozyme Monomer');
  assert.ok(ids.includes('bsa_oligomer_ladder_auc'), 'Must include BSA Ladder');
  assert.ok(ids.includes('therapeutic_mab_igg1_subvisible_auc'), 'Must include mAb IgG1');
  assert.ok(ids.includes('ribosome_70s_complex_dissociation'), 'Must include Ribosome 70S');
  assert.ok(ids.includes('aav_capsid_empty_vs_full_auc'), 'Must include AAV Capsid');
});

runTest('Bacterial ribosome 70S correctly models dissociation into 50S and 30S subunits', () => {
  const ribo = AUC_STANDARD_CATALOG.find((s) => s.id === 'ribosome_70s_complex_dissociation');
  assert.ok(ribo, 'Ribosome standard must exist');
  assert.strictEqual(ribo.speciesList.length, 3, 'Must contain 30S, 50S, and 70S species');

  const s30 = ribo.speciesList.find((s) => s.name.includes('30S'));
  const s50 = ribo.speciesList.find((s) => s.name.includes('50S'));
  const s70 = ribo.speciesList.find((s) => s.name.includes('70S'));

  assert.ok(s30 && s50 && s70, 'All three ribosome species must exist');
  assert.strictEqual(s30.sedimentationCoeffSvedberg, 30.0, 'Small subunit is 30 S');
  assert.strictEqual(s50.sedimentationCoeffSvedberg, 50.0, 'Large subunit is 50 S');
  assert.strictEqual(s70.sedimentationCoeffSvedberg, 70.0, 'Intact ribosome is 70 S');
  assert.ok(validateAucStandardPhysics(ribo), 'Ribosome physics must validate');
});

runTest('AAV gene therapy standard distinguishes empty (60.5 S) vs full (91.2 S) capsids', () => {
  const aav = AUC_STANDARD_CATALOG.find((s) => s.id === 'aav_capsid_empty_vs_full_auc');
  assert.ok(aav, 'AAV standard must exist');
  assert.strictEqual(aav.speciesList.length, 2, 'Must contain empty and full species');

  const empty = aav.speciesList[0];
  const full = aav.speciesList[1];

  assert.strictEqual(empty.sedimentationCoeffSvedberg, 60.5, 'Empty capsid is 60.5 S');
  assert.strictEqual(full.sedimentationCoeffSvedberg, 91.2, 'Full capsid with genome is 91.2 S');
  assert.ok(full.sedimentationCoeffSvedberg > empty.sedimentationCoeffSvedberg * 1.4, 'Full capsid sediments >40% faster due to high DNA density');
});

// -----------------------------------------------------------------------------
// 2. Physical Constants & Svedberg Equations
// -----------------------------------------------------------------------------
runTest('Frictional ratio f/f0 accurately distinguishes globular from extended macromolecules', () => {
  const lysozyme = AUC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hewl_monomer_calibrant');
  const mab = AUC_STANDARD_CATALOG.find((s) => s.id === 'therapeutic_mab_igg1_subvisible_auc');

  assert.ok(lysozyme.speciesList[0].frictionalRatioFOverF0 < 1.25, 'Lysozyme must have low f/f0 ~ 1.21 (compact globular)');
  assert.ok(mab.speciesList[0].frictionalRatioFOverF0 > 1.40, 'IgG1 mAb must have high f/f0 ~ 1.48 (extended Y-shape)');
});

runTest('Angular velocity and meniscus geometry scale according to cell sector design', () => {
  const lysozyme = AUC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hewl_monomer_calibrant');
  const sim = simulateAucExperiment(lysozyme);

  // omega = (60000 * 2 * pi) / 60 = 2000 * pi ~ 6283 rad/s
  assert.ok(Math.abs(sim.angularVelocityRadPerSec - 6283) < 10, 'Angular velocity at 60,000 RPM must be ~6283 rad/s');
  assert.strictEqual(sim.meniscusRadiusCm, 5.9, 'Standard meniscus must be 5.9 cm');
  assert.strictEqual(sim.bottomRadiusCm, 7.2, 'Standard cell bottom must be 7.2 cm');
});

runTest('Svedberg equation accurately reconstructs molecular mass from s and D', () => {
  const s = 1.91; // Svedberg S
  const D = 1.11e-6; // cm^2/s (Lysozyme diffusion coefficient)
  const vBar = 0.703; // cm^3/g
  const temp = 20.0; // °C

  const calculatedMw = calculateMolarMassFromSvedbergEquation(s, D, vBar, temp);
  // Lysozyme true Mw = 14,300 Da
  assert.ok(Math.abs(calculatedMw - 14300) < 500, `Calculated Mw (${calculatedMw} Da) must be within 500 Da of 14.3 kDa`);
});

// -----------------------------------------------------------------------------
// 3. AUC Simulation & Radial Scans
// -----------------------------------------------------------------------------
runTest('simulateAucExperiment generates radial scans and continuous c(s) distribution', () => {
  const bsa = AUC_STANDARD_CATALOG.find((s) => s.id === 'bsa_oligomer_ladder_auc');
  const sim = simulateAucExperiment(bsa, 5, 80);

  assert.ok(sim, 'Simulation result must exist');
  assert.strictEqual(sim.radialScans.length, 5, 'Must generate 5 time scan points');
  assert.strictEqual(sim.radialScans[0].points.length, 80, 'Each scan must have 80 radial points');
  assert.ok(sim.distributionCsPoints.length > 50, 'c(s) distribution must have fine density points');

  // Verify boundary moves outward with time:
  // At 15 min, concentration at r = 6.2 cm is higher than at 240 min (where boundary has passed r = 6.2)
  const earlyScan = sim.radialScans[0];
  const lateScan = sim.radialScans[4];
  const earlyAbs = earlyScan.points.find((p) => p.radiusCm >= 6.3).concentrationAbs;
  const lateAbs = lateScan.points.find((p) => p.radiusCm >= 6.3).concentrationAbs;
  assert.ok(earlyAbs >= lateAbs, 'Radial concentration boundary must move toward the bottom with elapsed time');
});

// -----------------------------------------------------------------------------
// 4. Card Matching Heuristic
// -----------------------------------------------------------------------------
runTest('getMatchingAucCard maps relevant cards to AUC standards', () => {
  const riboCard = { name: 'Phức hệ Ribosome 70S', description: 'Tiểu phần 50S và 30S dịch mã' };
  const match1 = getMatchingAucCard(riboCard);
  assert.ok(match1, 'Must match Ribosome card');
  assert.strictEqual(match1.id, 'ribosome_70s_complex_dissociation');

  const aavCard = { name: 'Hạt virus AAV capsid rỗng', description: 'Đo tỷ lệ capsid rỗng 60S và đầy 90S' };
  const match2 = getMatchingAucCard(aavCard);
  assert.ok(match2, 'Must match AAV card');
  assert.strictEqual(match2.id, 'aav_capsid_empty_vs_full_auc');

  const lysozymeCard = { name: 'Enzyme Lysozyme 1.91 S', description: 'Chuẩn sa lắng đơn phân tử Svedberg' };
  const match3 = getMatchingAucCard(lysozymeCard);
  assert.ok(match3, 'Must match Lysozyme card');
  assert.strictEqual(match3.id, 'lysozyme_hewl_monomer_calibrant');

  const bsaCard = { name: 'Thang sa lắng BSA 4.3 S', description: 'Phân tích oligomer monomer dimer' };
  const match4 = getMatchingAucCard(bsaCard);
  assert.ok(match4, 'Must match BSA card');
  assert.strictEqual(match4.id, 'bsa_oligomer_ladder_auc');

  const mabCard = { name: 'Kháng thể đơn dòng IgG1 6.6 S', description: 'Siêu ly tâm phân tích thuốc sinh học' };
  const match5 = getMatchingAucCard(mabCard);
  assert.ok(match5, 'Must match mAb card');
  assert.strictEqual(match5.id, 'therapeutic_mab_igg1_subvisible_auc');

  const unrelated = { name: 'Khí Argon Ar', description: 'Khí trơ nhóm VIIIA' };
  assert.strictEqual(getMatchingAucCard(unrelated), null, 'Unrelated card must return null');
});

console.log('\n====================================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (100% Pass)`);
console.log('====================================================================\n');
