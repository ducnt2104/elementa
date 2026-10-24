/**
 * tests/test-alcohol-phenol-reactions.mjs
 * Test Suite 180: Alcohols, Phenols & Reaction Specificity Domain Engine
 * Conforms strictly to Vietnam GDPT 2018 Chemistry 11 (Chủ đề 5: Dẫn xuất halogen - Ancol - Phenol) & IUPAC Standards.
 */

import {
  CURRICULUM_ALCOHOLS,
  CURRICULUM_PHENOLS,
  predictAlcoholOxidation,
  predictAlcoholDehydration,
  evaluateCuOh2PolyolTest,
  evaluatePhenolReaction
} from '../src/domain/alcoholPhenolEngine.ts';

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
console.log('   ELEMENTA TEST SUITE 180: ALCOHOLS, PHENOLS & REACTION SPECIFICITY');
console.log('======================================================================');

// 1. Alcohols Catalog & Physical Properties
assert(CURRICULUM_ALCOHOLS.length >= 7, 'Catalog contains at least 7 core curriculum alcohols');

const ethanol = CURRICULUM_ALCOHOLS.find(a => a.id === 'ethanol');
assert(ethanol && ethanol.boilingPointC > 78.0, 'Ethanol boiling point is ~78.3°C due to intermolecular hydrogen bonding');
assert(ethanol.waterSolubility === 'TAN_VÔ_HẠN', 'Ethanol is infinitely soluble in water');

const glycerol = CURRICULUM_ALCOHOLS.find(a => a.id === 'glycerol');
assert(glycerol && glycerol.hydroxylCount === 3, 'Glycerol has 3 hydroxyl groups (C3H5(OH)3)');
assert(glycerol.isVicinalPolyol === true, 'Glycerol is flagged as vicinal polyol');

// 2. Controlled CuO Oxidation (1° -> Aldehyde, 2° -> Ketone, 3° -> Inert)
const oxMethanol = predictAlcoholOxidation('methanol');
assert(oxMethanol.productType === 'ANĐEHIT', 'Methanol (1°) oxidizes to aldehyde (HCHO)');
assert(oxMethanol.isRedOxidized === true, 'CuO black turns to Cu red');

const oxPropan2ol = predictAlcoholOxidation('propan-2-ol');
assert(oxPropan2ol.productType === 'XETON', 'Propan-2-ol (2°) oxidizes to acetone ketone (CH3COCH3)');
assert(oxPropan2ol.productFormula.includes('CH₃COCH₃'), 'Acetone formula matches');

const oxTertButyl = predictAlcoholOxidation('2-methylpropan-2-ol');
assert(oxTertButyl.productType === 'KHÔNG_PHẢN_ỨNG', 'tert-Butyl alcohol (3°) is inert to mild CuO oxidation');
assert(oxTertButyl.isRedOxidized === false, 'No red Cu metal produced for 3° alcohol');

// 3. Dehydration Kinetics & Zaitsev Rule (140°C vs 170°C)
const etherEthanol = predictAlcoholDehydration('ethanol', 140);
assert(etherEthanol.reactionType === 'TẠO_ETE_140C', 'Ethanol at 140°C undergoes intermolecular etherification');
assert(etherEthanol.mainProductFormula.includes('C₂H₅-O-C₂H₅'), 'Forms diethyl ether (C2H5-O-C2H5)');

const alkeneEthanol = predictAlcoholDehydration('ethanol', 170);
assert(alkeneEthanol.reactionType === 'TÁCH_NƯỚC_ANKEN_170C', 'Ethanol at 170°C undergoes intramolecular alkene elimination');
assert(alkeneEthanol.mainProductFormula.includes('CH₂=CH₂'), 'Forms ethylene (CH2=CH2)');

const zaitsevButan2ol = predictAlcoholDehydration('butan-2-ol', 170);
assert(zaitsevButan2ol.followsZaitsev === true, 'Butan-2-ol elimination follows Zaitsev rule');
assert(zaitsevButan2ol.majorAlkene.includes('But-2-en'), 'Major alkene is But-2-en (more substituted)');

const methanolDehyd = predictAlcoholDehydration('methanol', 170);
assert(methanolDehyd.reactionType === 'KHÔNG_PHÙ_HỢP', 'Methanol cannot form an alkene at 170°C (only 1C)');

// 4. Cu(OH)2 Polyol Chelation Test
const cuGlycerol = evaluateCuOh2PolyolTest('glycerol');
assert(cuGlycerol.dissolvesCuOh2 === true, 'Glycerol dissolves Cu(OH)2');
assert(cuGlycerol.solutionColorVi.includes('xanh lam thẫm') || cuGlycerol.solutionColorVi.includes('Royal Blue'), 'Forms deep royal blue solution');

const cuEthyleneGlycol = evaluateCuOh2PolyolTest('ethylene-glycol');
assert(cuEthyleneGlycol.dissolvesCuOh2 === true, 'Ethylene glycol dissolves Cu(OH)2');

const cuEthanol = evaluateCuOh2PolyolTest('ethanol');
assert(cuEthanol.dissolvesCuOh2 === false, 'Monohydric alcohol (ethanol) cannot dissolve Cu(OH)2 at room temp');
assert(cuEthanol.colorHex === '#7DD3FC', 'Keeps light blue Cu(OH)2 precipitate');

// 5. Phenols Catalog & Acidity
assert(CURRICULUM_PHENOLS.length >= 3, 'Catalog contains core phenols');
const phenol = CURRICULUM_PHENOLS.find(p => p.id === 'phenol');
assert(phenol && phenol.pKa > 9.5 && phenol.pKa < 10.5, 'Phenol pKa is ~9.95 (weak acid)');

// 6. Phenol Characteristic Reactions
const rxnNaOH = evaluatePhenolReaction('NAOH');
assert(rxnNaOH.reactionOccurs === true, 'Phenol reacts with NaOH to form sodium phenolate');
assert(rxnNaOH.precipitateFormed === false, 'Sodium phenolate solution is clear and soluble');

const rxnCO2 = evaluatePhenolReaction('CO2_H2O', 0.02);
assert(rxnCO2.reactionOccurs === true, 'CO2 + H2O displaces phenol from sodium phenolate');
assert(rxnCO2.precipitateFormed === true, 'Phenol precipitates as white turbidity');
assert(rxnCO2.chemicalEquation.includes('NaHCO₃'), 'Product is NaHCO3 (carbonic acid stronger than phenol)');

const rxnBr2 = evaluatePhenolReaction('BR2_WATER', 0.01);
assert(rxnBr2.precipitateFormed === true, 'Phenol forms white precipitate with bromine water');
assert(rxnBr2.precipitateNameVi.includes('2,4,6-Tribromophenol'), 'Precipitate is 2,4,6-tribromophenol');
assert(rxnBr2.precipitateMassG > 3.0 && rxnBr2.precipitateMassG < 3.5, 'Mass of precipitate for 0.01 mol is ~3.31 g (330.8 g/mol)');

const rxnHNO3 = evaluatePhenolReaction('HNO3_CONC', 0.01);
assert(rxnHNO3.precipitateFormed === true, 'Phenol forms yellow precipitate with conc HNO3');
assert(rxnHNO3.precipitateNameVi.includes('Axit Picric'), 'Precipitate is Picric acid (2,4,6-trinitrophenol)');
assert(rxnHNO3.precipitateHex === '#FACC15', 'Picric acid has bright yellow color');

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed + failed} TESTS PASSED`);
if (failed === 0) {
  console.log(' TEST SUITE 180 COMPLETED IN 100% HARMONY!');
} else {
  console.error(` TEST SUITE 180 FAILED WITH ${failed} DEFECTS!`);
  process.exit(1);
}
console.log('======================================================================');
