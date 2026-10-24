/**
 * tests/test-carbonyl-carboxylic-reactions.mjs
 * Test Suite 182: Carbonyl Compounds & Carboxylic Acids Domain Engine
 * Conforms strictly to Vietnam GDPT 2018 Chemistry 11 (Chủ đề 6: Carbonyl - Axit cacboxylic) & IUPAC Standards.
 */

import {
  CURRICULUM_CARBONYLS,
  CURRICULUM_CARBOXYLIC_ACIDS,
  evaluateTollensTest,
  evaluateFehlingTest,
  evaluateIodoformTest,
  evaluateAcidReaction
} from '../src/domain/carbonylCarboxylicEngine.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 182: CARBONYL COMPOUNDS & CARBOXYLIC ACIDS');
console.log('======================================================================');

// 1. Catalogs
assert(CURRICULUM_CARBONYLS.length >= 6, 'Catalog contains at least 6 core carbonyl compounds');
assert(CURRICULUM_CARBOXYLIC_ACIDS.length >= 7, 'Catalog contains at least 7 core carboxylic acids');

// 2. Formaldehyde 1 -> 4 Ag Special Tollens Reaction (GDPT 2018 Trap)
const hchoTollens = evaluateTollensTest('formaldehyde', 0.01);
assert(hchoTollens.isPositive === true, 'Formaldehyde tráng bạc dương tính');
assert(hchoTollens.silverEquivalentsPerMole === 4, 'Formaldehyde has 4 silver equivalents per mole (1 mol HCHO -> 4 mol Ag)');
assert(hchoTollens.isPedagogicalTrap === true, 'Formaldehyde is flagged as pedagogical exam trap');
assert(hchoTollens.silverMassG > 4.3 && hchoTollens.silverMassG < 4.33, '0.01 mol HCHO yields ~4.315 g Ag (4 * 0.01 * 107.87)');

// 3. Acetaldehyde & Benzaldehyde Tollens Reaction (1 -> 2 Ag)
const ch3choTollens = evaluateTollensTest('acetaldehyde', 0.01);
assert(ch3choTollens.isPositive === true, 'Acetaldehyde tráng bạc dương tính');
assert(ch3choTollens.silverEquivalentsPerMole === 2, 'Acetaldehyde has 2 silver equivalents per mole (1 mol CH3CHO -> 2 mol Ag)');
assert(ch3choTollens.silverMassG > 2.15 && ch3choTollens.silverMassG < 2.17, '0.01 mol CH3CHO yields ~2.157 g Ag (2 * 0.01 * 107.87)');

const benzaldehydeTollens = evaluateTollensTest('benzaldehyde', 0.01);
assert(benzaldehydeTollens.isPositive === true, 'Benzaldehyde tráng bạc dương tính (2 Ag)');

// 4. Ketones Inactive to Tollens
const acetoneTollens = evaluateTollensTest('acetone', 0.01);
assert(acetoneTollens.isPositive === false, 'Acetone ketone is inert to Tollens reagent');
assert(acetoneTollens.silverMassG === 0, 'No silver produced from acetone');

// 5. Formic Acid Special Tollens Reaction
const hcoohTollens = evaluateTollensTest('formic-acid', 0.01);
assert(hcoohTollens.isPositive === true, 'Formic acid (HCOOH) is the ONLY carboxylic acid that undergoes Tollens silver mirror');
assert(hcoohTollens.silverEquivalentsPerMole === 2, 'Formic acid yields 2 silver equivalents');
assert(hcoohTollens.isPedagogicalTrap === true, 'Formic acid is flagged as pedagogical trap');

const ch3coohTollens = evaluateTollensTest('acetic-acid', 0.01);
assert(ch3coohTollens.isPositive === false, 'Acetic acid (CH3COOH) does not undergo silver mirror reaction');

// 6. Fehling / Cu(OH)2 Alkaline Oxidation Test
const fehlingHcho = evaluateFehlingTest('formaldehyde');
assert(fehlingHcho.isPositive === true, 'HCHO reduces Cu(OH)2 to red-brick Cu2O');
assert(fehlingHcho.cu2oColorVi.includes('đỏ gạch'), 'Forms red-brick precipitate');

const fehlingAcetone = evaluateFehlingTest('acetone');
assert(fehlingAcetone.isPositive === false, 'Acetone cannot reduce Cu(OH)2');

const fehlingHcooh = evaluateFehlingTest('formic-acid');
assert(fehlingHcooh.isPositive === true, 'Formic acid reduces Cu(OH)2 to red-brick Cu2O due to its aldehyde group');

// 7. Iodoform / Haloform Test (CH3-C=O)
const iodoformAcetone = evaluateIodoformTest('acetone', 0.01);
assert(iodoformAcetone.isPositive === true, 'Acetone gives positive iodoform test (has CH3-C=O)');
assert(iodoformAcetone.precipitateNameVi.includes('CHI₃') || iodoformAcetone.precipitateNameVi.includes('Iođofom'), 'Precipitate is iodoform CHI3');
assert(iodoformAcetone.precipitateColorHex === '#FACC15', 'Iodoform precipitate has bright yellow color');
assert(iodoformAcetone.precipitateMassG > 3.9 && iodoformAcetone.precipitateMassG < 4.0, '0.01 mol acetone yields ~3.937 g CHI3 (393.7 g/mol)');

const iodoformAcetaldehyde = evaluateIodoformTest('acetaldehyde', 0.01);
assert(iodoformAcetaldehyde.isPositive === true, 'Acetaldehyde gives positive iodoform test');

const iodoformHcho = evaluateIodoformTest('formaldehyde', 0.01);
assert(iodoformHcho.isPositive === false, 'Formaldehyde has no CH3 group, negative to iodoform test');

const iodoformBenzaldehyde = evaluateIodoformTest('benzaldehyde', 0.01);
assert(iodoformBenzaldehyde.isPositive === false, 'Benzaldehyde has no CH3 group, negative to iodoform test');

// 8. Carboxylic Acid Reactions & Effervescence
const rxnNa = evaluateAcidReaction('acetic-acid', 'NA');
assert(rxnNa.gasEvolved.includes('H₂'), 'Acetic acid reacts with Na releasing H2 gas');

const rxnNa2CO3 = evaluateAcidReaction('acetic-acid', 'NA2CO3');
assert(rxnNa2CO3.gasEvolved.includes('CO₂'), 'Acetic acid reacts with Na2CO3 effervescing CO2 gas');
assert(rxnNa2CO3.explanationVi.includes('phân biệt'), 'Highlights CO2 bubbling distinguishes carboxylic acids from alcohols and phenols');

const rxnCuO = evaluateAcidReaction('acetic-acid', 'CUO');
assert(rxnCuO.solutionColorChangeVi.includes('xanh lam'), 'Black CuO dissolves into characteristic blue Cu2+ solution');

// 9. Acidity Scale Verification (-I Inductive Effect)
const tca = CURRICULUM_CARBOXYLIC_ACIDS.find(a => a.id === 'trichloroacetic-acid');
const mca = CURRICULUM_CARBOXYLIC_ACIDS.find(a => a.id === 'chloroacetic-acid');
const fa = CURRICULUM_CARBOXYLIC_ACIDS.find(a => a.id === 'formic-acid');
const aa = CURRICULUM_CARBOXYLIC_ACIDS.find(a => a.id === 'acetic-acid');

assert(tca.pKa < mca.pKa, 'Trichloroacetic acid is stronger than chloroacetic acid');
assert(mca.pKa < fa.pKa, 'Chloroacetic acid is stronger than formic acid due to -I effect of Cl');
assert(fa.pKa < aa.pKa, 'Formic acid is stronger than acetic acid (+I alkyl weakens acetic acid)');

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed + failed} TESTS PASSED`);
if (failed === 0) {
  console.log(' TEST SUITE 182 COMPLETED IN 100% HARMONY!');
} else {
  console.error(` TEST SUITE 182 FAILED WITH ${failed} DEFECTS!`);
  process.exit(1);
}
console.log('======================================================================');
