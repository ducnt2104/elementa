import assert from 'node:assert';
import {
  SEC_MALS_CATALOG,
  LASER_WAVELENGTH_NM,
  WATER_REFRACTIVE_INDEX,
  PROTEIN_STANDARD_DN_DC_ML_G,
  calculateOpticalConstantKStar,
  simulateSecMalsExperiment,
  getMatchingSecMalsCard,
  validateSecMalsStandardPhysics,
} from './src/domain/secMalsEngine.ts';

console.log('🧪 ====================================================================');
console.log('🧪 ELEMENTA TEST SUITE 141: SEC-MALS MULTI-ANGLE LIGHT SCATTERING');
console.log('🧪 Absolute Molar Mass Mw · Zimm Plot · Oligomer Ladder & PDI');
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
runTest('SEC-MALS Catalog contains 5 international benchmark macromolecular systems', () => {
  assert.strictEqual(SEC_MALS_CATALOG.length, 5, 'Must contain 5 benchmark standards');
  const ids = SEC_MALS_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('bsa_oligomeric_ladder'), 'Must include BSA Oligomers');
  assert.ok(ids.includes('mab_igg1_aggregate_profiling'), 'Must include mAb Aggregates');
  assert.ok(ids.includes('aav_gene_therapy_capsid'), 'Must include AAV Capsid');
  assert.ok(ids.includes('dextran_polysaccharide_random_coil'), 'Must include Dextran');
  assert.ok(ids.includes('nist_mab_8671_reference'), 'Must include NISTmAb RM 8671');
});

runTest('BSA standard correctly resolves Monomer, Dimer, and Trimer stoichiometry', () => {
  const bsa = SEC_MALS_CATALOG.find((s) => s.id === 'bsa_oligomeric_ladder');
  assert.ok(bsa, 'BSA standard must exist');
  assert.strictEqual(bsa.speciesList.length, 3, 'Must contain 3 oligomeric species');

  const monomer = bsa.speciesList[0];
  const dimer = bsa.speciesList[1];
  const trimer = bsa.speciesList[2];

  assert.strictEqual(monomer.nominalMwDa, 66430, 'Monomer Mw = 66.4 kDa');
  assert.strictEqual(dimer.nominalMwDa, 132860, 'Dimer Mw = 2 * Monomer');
  assert.strictEqual(trimer.nominalMwDa, 199290, 'Trimer Mw = 3 * Monomer');

  // Retention volume ordering in SEC: larger molecules elute earlier!
  assert.ok(trimer.elutionVolumeMl < dimer.elutionVolumeMl, 'Trimer elutes before Dimer');
  assert.ok(dimer.elutionVolumeMl < monomer.elutionVolumeMl, 'Dimer elutes before Monomer');
  assert.ok(validateSecMalsStandardPhysics(bsa), 'BSA physics must validate');
});

runTest('AAV gene therapy standard distinguishes empty vs full capsid mass by ~1.5 MDa', () => {
  const aav = SEC_MALS_CATALOG.find((s) => s.id === 'aav_gene_therapy_capsid');
  assert.ok(aav, 'AAV standard must exist');
  assert.strictEqual(aav.speciesList.length, 2, 'Must contain Empty and Full capsids');

  const empty = aav.speciesList[0];
  const full = aav.speciesList[1];

  assert.strictEqual(empty.nominalMwDa, 3750000, 'Empty capsid must be 3.75 MDa');
  assert.strictEqual(full.nominalMwDa, 5250000, 'Full capsid must be 5.25 MDa');
  assert.strictEqual(full.nominalMwDa - empty.nominalMwDa, 1500000, 'Mass difference is 1.5 MDa (ssDNA genome)');
});

// -----------------------------------------------------------------------------
// 2. Optical Constant K* & Physical Parameters
// -----------------------------------------------------------------------------
runTest('Optical constant K* conforms to Rayleigh-Gans-Debye formulation', () => {
  assert.strictEqual(LASER_WAVELENGTH_NM, 658.0, 'Laser wavelength must be 658 nm');
  assert.strictEqual(WATER_REFRACTIVE_INDEX, 1.331, 'Water refractive index at 658 nm');
  assert.strictEqual(PROTEIN_STANDARD_DN_DC_ML_G, 0.185, 'Protein dn/dc is 0.185 mL/g');

  const KStar = calculateOpticalConstantKStar(PROTEIN_STANDARD_DN_DC_ML_G);
  // K* should be in the order of 10^-7 to 10^-6 mol*cm^2/g^2
  assert.ok(KStar > 1e-7 && KStar < 1e-6, `K* = ${KStar} must be physically accurate`);
});

// -----------------------------------------------------------------------------
// 3. SEC-MALS Simulation & Zimm Plot
// -----------------------------------------------------------------------------
runTest('simulateSecMalsExperiment calculates slice Mw, PDI, and 7-angle Zimm plot', () => {
  const bsa = SEC_MALS_CATALOG.find((s) => s.id === 'bsa_oligomeric_ladder');
  const sim = simulateSecMalsExperiment(bsa, 100);

  assert.ok(sim, 'Simulation result must exist');
  assert.strictEqual(sim.slices.length, 100, 'Must produce requested number of SEC slices');
  assert.strictEqual(sim.zimmPlotPoints.length, 7, 'Must produce 7 multi-angle detector points');

  // Verify weight-average molecular weight is reasonable (predominantly monomer ~66 kDa, weighted slightly higher by dimer)
  assert.ok(sim.measuredWeightAverageMwDa > 66430 && sim.measuredWeightAverageMwDa < 90000, 'Mw must be near BSA monomer weighted by dimer');
  assert.ok(sim.overallPdi >= 1.000, 'PDI must be >= 1.000');

  // Verify Zimm plot intercept yields inverse Mw
  const firstZimm = sim.zimmPlotPoints[0];
  const extrapolatedMw = 1.0 / firstZimm.kcOverRTheta;
  assert.ok(Math.abs(extrapolatedMw - bsa.speciesList[0].nominalMwDa) / bsa.speciesList[0].nominalMwDa < 0.1, 'Extrapolated Mw must be within 10% of monomer Mw');
});

runTest('NISTmAb standard conforms to certified absolute molar mass 148.2 kDa', () => {
  const nist = SEC_MALS_CATALOG.find((s) => s.id === 'nist_mab_8671_reference');
  assert.ok(nist, 'NISTmAb standard must exist');
  assert.strictEqual(nist.speciesList[0].nominalMwDa, 148200, 'NISTmAb certified Mw is 148.2 kDa');
  assert.strictEqual(nist.speciesList[0].polydispersityIndexPdi, 1.001, 'NISTmAb certified PDI must be 1.001');
  assert.ok(validateSecMalsStandardPhysics(nist), 'NIST standard physics must validate');
});

runTest('Light scattering 90° intensity scales with both concentration and molar mass', () => {
  const bsa = SEC_MALS_CATALOG.find((s) => s.id === 'bsa_oligomeric_ladder');
  const sim = simulateSecMalsExperiment(bsa, 120);

  // Find peak slice for Monomer (~8.8 mL) and Dimer (~7.9 mL)
  const monomerSlice = sim.slices.reduce((prev, curr) =>
    Math.abs(curr.elutionVolumeMl - 8.8) < Math.abs(prev.elutionVolumeMl - 8.8) ? curr : prev
  );
  const dimerSlice = sim.slices.reduce((prev, curr) =>
    Math.abs(curr.elutionVolumeMl - 7.9) < Math.abs(prev.elutionVolumeMl - 7.9) ? curr : prev
  );

  assert.ok(monomerSlice.calculatedMwDa > 50000, 'Monomer slice must have calculated Mw > 50 kDa');
  assert.ok(dimerSlice.calculatedMwDa > 100000, 'Dimer slice must have calculated Mw > 100 kDa');
  // Dimer has 2x higher molar mass than monomer, enhancing its LS-to-UV ratio:
  const dimerLsRatio = dimerSlice.lightScattering90Deg / Math.max(0.01, dimerSlice.uvAbsorbance280);
  const monomerLsRatio = monomerSlice.lightScattering90Deg / Math.max(0.01, monomerSlice.uvAbsorbance280);
  assert.ok(dimerLsRatio > monomerLsRatio, 'Dimer must have higher LS-to-UV ratio than monomer due to Mw scaling');
});

// -----------------------------------------------------------------------------
// 4. Card Matching Heuristic
// -----------------------------------------------------------------------------
runTest('getMatchingSecMalsCard maps relevant cards to SEC-MALS standards', () => {
  const bsaCard = { name: 'Chuẩn BSA đa đơn vị', description: 'Monomer dimer trimer kiểm định SEC MALS' };
  const match1 = getMatchingSecMalsCard(bsaCard);
  assert.ok(match1, 'Must match BSA card');
  assert.strictEqual(match1.id, 'bsa_oligomeric_ladder');

  const mabCard = { name: 'Kháng thể đơn dòng IgG1', description: 'Hạt kết tụ hòa tan HMW USP 129' };
  const match2 = getMatchingSecMalsCard(mabCard);
  assert.ok(match2, 'Must match mAb card');
  assert.strictEqual(match2.id, 'mab_igg1_aggregate_profiling');

  const aavCard = { name: 'Vector virus AAV', description: 'Trị liệu gen capsid rỗng và đầy' };
  const match3 = getMatchingSecMalsCard(aavCard);
  assert.ok(match3, 'Must match AAV card');
  assert.strictEqual(match3.id, 'aav_gene_therapy_capsid');

  const dextranCard = { name: 'Polymer Dextran', description: 'Cấu trúc cuộn ngẫu nhiên random coil' };
  const match4 = getMatchingSecMalsCard(dextranCard);
  assert.ok(match4, 'Must match Dextran card');
  assert.strictEqual(match4.id, 'dextran_polysaccharide_random_coil');

  const nistCard = { name: 'NISTmAb RM 8671', description: 'Chuẩn đối chiếu quốc tế 148.2 kDa' };
  const match5 = getMatchingSecMalsCard(nistCard);
  assert.ok(match5, 'Must match NIST card');
  assert.strictEqual(match5.id, 'nist_mab_8671_reference');

  const unrelated = { name: 'Ethanol C2H5OH', description: 'Dung môi hữu cơ phân cực' };
  assert.strictEqual(getMatchingSecMalsCard(unrelated), null, 'Unrelated card must return null');
});

console.log('\n====================================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (100% Pass)`);
console.log('====================================================================\n');
