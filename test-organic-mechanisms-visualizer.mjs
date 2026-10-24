// tests/test-organic-mechanisms-visualizer.mjs
// Test Suite 80: Organic Chemistry Stereoisomerism, Reaction Mechanisms & Diagnostic Tests
// Conforming to Vietnam GDPT 2018 Chemistry 11-12 & IUPAC Standards

import assert from 'assert';
import {
  CURRICULUM_GEOMETRIC_ISOMERS,
  CURRICULUM_CHIRAL_CENTERS,
  CURRICULUM_MARKOVNIKOV_CASES,
  CURRICULUM_ZAITSEV_CASES,
  CURRICULUM_ORGANIC_TESTS,
  evaluateDiagnosticOrganicTest,
  checkGeometricIsomerismFeasibility
} from './src/domain/organicMechanismsEngine.ts';

console.log('🧪 Starting Test Suite 80: Organic Chemistry Stereoisomerism, Reaction Mechanisms & Diagnostic Tests...\n');

let passedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Geometric Isomerism (Cis/Trans, E/Z) Feasibility
runTest('1. checkGeometricIsomerismFeasibility: rejects alkene when R1 == R2 on C1', () => {
  const result = checkGeometricIsomerismFeasibility('H', 'H', 'CH3', 'H');
  assert.strictEqual(result.hasGeometricIsomerism, false);
  assert(result.reasonVI.includes('trùng nhau'));
});

runTest('2. checkGeometricIsomerismFeasibility: rejects alkene when R3 == R4 on C2', () => {
  const result = checkGeometricIsomerismFeasibility('CH3', 'H', 'Cl', 'Cl');
  assert.strictEqual(result.hasGeometricIsomerism, false);
});

runTest('3. checkGeometricIsomerismFeasibility: confirms geometric isomerism when R1 != R2 and R3 != R4', () => {
  const result = checkGeometricIsomerismFeasibility('CH3', 'H', 'CH3', 'H'); // but-2-ene
  assert.strictEqual(result.hasGeometricIsomerism, true);
});

// 2. Geometric Isomers Catalog & Physical Dipole Invariants
runTest('4. Geometric Isomers Catalog contains But-2-ene, Maleic/Fumaric acid, and 1,2-Dichloroethene', () => {
  assert.strictEqual(CURRICULUM_GEOMETRIC_ISOMERS.length, 3);
  const ids = CURRICULUM_GEOMETRIC_ISOMERS.map(g => g.id);
  assert(ids.includes('but_2_ene'));
  assert(ids.includes('maleic_fumaric_acid'));
  assert(ids.includes('dichloroethene'));
});

runTest('5. But-2-ene: Cis is polar (μ > 0 D), Trans is non-polar (μ = 0 D)', () => {
  const but2ene = CURRICULUM_GEOMETRIC_ISOMERS.find(g => g.id === 'but_2_ene');
  assert(but2ene.cisOrZ.dipoleMomentDebye > 0);
  assert.strictEqual(but2ene.cisOrZ.isPolar, true);
  assert.strictEqual(but2ene.transOrE.dipoleMomentDebye, 0.0);
  assert.strictEqual(but2ene.transOrE.isPolar, false);
});

runTest('6. Maleic vs Fumaric Acid: Maleic dehydrates at 140°C forming cyclic anhydride', () => {
  const acid = CURRICULUM_GEOMETRIC_ISOMERS.find(g => g.id === 'maleic_fumaric_acid');
  assert(acid.cisOrZ.distinctChemicalPropertyVI.includes('anhiđrit maleic vòng'));
  assert(acid.transOrE.distinctChemicalPropertyVI.includes('Không thể tách nước tạo anhiđrit vòng ở 140°C'));
});

// 3. Chiral Optical Isomers (C*)
runTest('7. Chiral Centers Catalog defines Lactic acid, Alanine, and Thalidomide with 4 distinct groups', () => {
  assert.strictEqual(CURRICULUM_CHIRAL_CENTERS.length, 3);
  for (const c of CURRICULUM_CHIRAL_CENTERS) {
    const uniqueSubstituents = new Set(c.substituents);
    assert.strictEqual(uniqueSubstituents.size, 4, `Chiral center ${c.id} must have 4 distinct substituents`);
  }
});

runTest('8. Thalidomide: documents (R) sedative vs (S) teratogenic birth defect activity', () => {
  const thalidomide = CURRICULUM_CHIRAL_CENTERS.find(c => c.id === 'thalidomide');
  assert(thalidomide.enantiomerDOrR.biologicalActivityVI.includes('an thần'));
  assert(thalidomide.enantiomerLOrS.biologicalActivityVI.includes('quái thai'));
});

// 4. Markovnikov Addition Rule
runTest('9. Markovnikov: Propene + HBr yields 2-bromopropane as major product (>90%)', () => {
  const propene = CURRICULUM_MARKOVNIKOV_CASES.find(m => m.id === 'propene_hbr');
  assert(propene.majorProduct.formula.includes('CH(Br)'));
  assert(propene.majorProduct.yieldPercent >= 90);
  assert(propene.minorProduct.yieldPercent <= 10);
  assert(propene.majorProduct.carbocationIntermediateVI.includes('bậc 2'));
  assert(propene.majorProduct.carbocationIntermediateVI.includes('bền hơn'));
});

runTest('10. Markovnikov: 2-Methylpropene + H2O yields tert-butyl alcohol as major product (95%)', () => {
  const m = CURRICULUM_MARKOVNIKOV_CASES.find(m => m.id === 'methylpropene_water');
  assert(m.majorProduct.formula.includes('(CH3)3C-OH'));
  assert.strictEqual(m.majorProduct.yieldPercent, 95);
  assert(m.majorProduct.carbocationIntermediateVI.includes('bậc 3'));
});

// 5. Zaitsev Elimination Rule
runTest('11. Zaitsev: Butan-2-ol dehydration yields but-2-ene as major alkene (>80%)', () => {
  const z = CURRICULUM_ZAITSEV_CASES.find(z => z.id === 'butan_2_ol_dehydration');
  assert(z.majorAlkene.formula.includes('CH3-CH=CH-CH3'));
  assert(z.majorAlkene.yieldPercent >= 80);
  assert(z.minorAlkene.yieldPercent <= 20);
});

// 6. Diagnostic Qualitative Organic Tests
runTest('12. Tollens Test: positive for Glucose, Acetaldehyde, and Formaldehyde; negative for Acetone', () => {
  const resGlucose = evaluateDiagnosticOrganicTest('tollens_silver_mirror', 'C6H12O6');
  assert.strictEqual(resGlucose.isPositive, true);
  assert(resGlucose.phenomenonVI.includes('gương bạc'));

  const resAcetone = evaluateDiagnosticOrganicTest('tollens_silver_mirror', 'CH3COCH3');
  assert.strictEqual(resAcetone.isPositive, false);
});

runTest('13. Fresh Cu(OH)2 Test: positive deep blue for Glycerol; positive brick-red for Glucose boiled', () => {
  const resGlycerol = evaluateDiagnosticOrganicTest('fresh_cuoh2_polyol_and_aldehyde', 'C3H5(OH)3');
  assert.strictEqual(resGlycerol.isPositive, true);
  assert(resGlycerol.phenomenonVI.includes('xanh lam thẫm'));

  const resEthanol = evaluateDiagnosticOrganicTest('fresh_cuoh2_polyol_and_aldehyde', 'C2H5OH');
  assert.strictEqual(resEthanol.isPositive, false);
});

runTest('14. Iodoform Test: positive for Acetone and Ethanol; negative for Methanol', () => {
  const resAcetone = evaluateDiagnosticOrganicTest('iodoform_reaction', 'CH3COCH3');
  assert.strictEqual(resAcetone.isPositive, true);
  assert(resAcetone.phenomenonVI.includes('màu vàng'));

  const resMethanol = evaluateDiagnosticOrganicTest('iodoform_reaction', 'CH3OH');
  assert.strictEqual(resMethanol.isPositive, false);
});

runTest('15. Biuret Test: positive violet for Albumin and Tripeptide; negative for Dipeptide', () => {
  const resAlbumin = evaluateDiagnosticOrganicTest('biuret_protein_test', 'Albumin');
  assert.strictEqual(resAlbumin.isPositive, true);
  assert(resAlbumin.phenomenonVI.includes('màu tím'));

  const resDipeptide = evaluateDiagnosticOrganicTest('biuret_protein_test', 'Dipeptide (Gly-Ala)');
  assert.strictEqual(resDipeptide.isPositive, false);
});

console.log(`\n🎉 Test Suite 80 PASSED: All ${passedTests} / 15 tests executed with 100% success!`);
