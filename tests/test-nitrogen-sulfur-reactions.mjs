/**
 * tests/test-nitrogen-sulfur-reactions.mjs
 * Test Suite 184: Nitrogen & Sulfur Domain Engine
 * Conforms strictly to Vietnam GDPT 2018 Chemistry 11 (Chủ đề 2: Nitrogen và Sulfur) & IUPAC Standards.
 */

import {
  NITROGEN_SPECIES_CATALOG,
  SULFUR_SPECIES_CATALOG,
  simulateAmmoniaFountain,
  predictHno3Redox,
  simulateAquaRegia,
  simulateSugarDehydration,
  evaluateEutrophication
} from '../src/domain/nitrogenSulfurEngine.ts';

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
console.log('   ELEMENTA TEST SUITE 184: NITROGEN & SULFUR DOMAIN ENGINE');
console.log('======================================================================');

// 1. Catalogs
assert(NITROGEN_SPECIES_CATALOG.length >= 6, 'Catalog contains at least 6 core nitrogen species');
assert(SULFUR_SPECIES_CATALOG.length >= 4, 'Catalog contains at least 4 core sulfur species');

const n2 = NITROGEN_SPECIES_CATALOG.find(n => n.id === 'n2');
assert(n2 && n2.descriptionVi.includes('946 kJ/mol'), 'N2 description mentions 946 kJ/mol bond energy');

const no2 = NITROGEN_SPECIES_CATALOG.find(n => n.id === 'no2');
assert(no2 && no2.colorVi.includes('Nâu đỏ'), 'NO2 is characteristic red-brown gas');

const so2 = SULFUR_SPECIES_CATALOG.find(s => s.id === 'so2');
assert(so2 && so2.descriptionVi.includes('mưa axit'), 'SO2 is noted as major acid rain agent');

// 2. Ammonia Fountain Experiment
const fountain = simulateAmmoniaFountain(1.0);
assert(fountain.dissolutionRatio === 800, 'NH3 dissolves ~800 liters per 1 liter H2O');
assert(fountain.pressureDropAtm > 0.9, 'Pressure drop is > 0.9 atm creating strong siphon');
assert(fountain.indicatorColor.includes('Hồng cánh sen'), 'Phenolphthalein turns brilliant pink due to OH-');
assert(fountain.fountainHeightCm > 50, 'Fountain height is > 50 cm');

// 3. Nitric Acid Passivation (Fe, Al, Cr in Cold Conc HNO3)
const passivatedFe = predictHno3Redox('Fe', 'ĐẶC', true);
assert(passivatedFe.isPassivated === true, 'Iron (Fe) is passivated in cold concentrated HNO3');
assert(passivatedFe.reductionProductVi.includes('thụ động hóa'), 'Reduction product notes passivation');

const passivatedAl = predictHno3Redox('Al', 'ĐẶC', true);
assert(passivatedAl.isPassivated === true, 'Aluminum (Al) is passivated in cold concentrated HNO3');

// 4. Hot Conc HNO3 vs Dilute HNO3 with Copper
const hotCu = predictHno3Redox('Cu', 'ĐẶC', false);
assert(hotCu.isPassivated === false, 'Cu is not passivated in hot concentrated HNO3');
assert(hotCu.reductionProductFormula === 'NO₂', 'Cu + conc HNO3 produces NO2 gas');
assert(hotCu.gasColorVi.includes('nâu đỏ'), 'NO2 gas is brown-red');

const diluteCu = predictHno3Redox('Cu', 'LOÃNG', false);
assert(diluteCu.reductionProductFormula === 'NO', 'Cu + dilute HNO3 produces NO gas');
assert(diluteCu.reductionProductVi.includes('hóa nâu') || diluteCu.gasColorVi.includes('hóa nâu'), 'NO oxidizes to brown NO2 in air');

// 5. Very Dilute HNO3 with Active Metal (Mg/Zn)
const diluteMg = predictHno3Redox('Mg', 'RẤT_LOÃNG', false);
assert(diluteMg.reductionProductFormula === 'NH₄NO₃', 'Mg + very dilute HNO3 produces NH4NO3 (no gas)');
assert(diluteMg.gasColorVi.includes('Không có khí'), 'Correctly flags no gaseous bubbles produced');

// 6. Aqua Regia (Nước Cường Toan) Gold Dissolution
const aquaRegia = simulateAquaRegia('Au', 0.02);
assert(aquaRegia.complexAcidFormed.includes('H[AuCl₄]'), 'Aqua regia dissolves gold to chloroauric acid H[AuCl4]');
assert(aquaRegia.hno3MolarRatio === 1 && aquaRegia.hclMolarRatio === 3, 'Volume/molar ratio is 1 HNO3 : 3 HCl');

// 7. Sulfuric Acid Sugar Dehydration (Charcoal Snake)
const sugarDehyd = simulateSugarDehydration(30);
assert(sugarDehyd.carbonMassGrams > 12.0, '30g sucrose produces ~12.6g carbon sponge');
assert(sugarDehyd.so2VolumeLiters > 0, 'Produces SO2 gas pushing the column up');
assert(sugarDehyd.safetyWarningVi.includes('tủ hút'), 'Safety warning highlights toxic SO2 gas and fume hood');

// 8. Eutrophication Ecosystem Model
const normalWater = evaluateEutrophication(1.0, 0.05);
assert(normalWater.statusVi === 'BÌNH_THƯỜNG', 'Low N and P results in normal ecological status');
assert(normalWater.dissolvedOxygenMgL > 7.0, 'Normal dissolved oxygen is > 7.0 mg/L');

const eutrophicWater = evaluateEutrophication(15.0, 1.2);
assert(eutrophicWater.statusVi === 'PHÚ_DƯỠNG_NGHIÊM_TRỌNG', 'High N and P triggers severe eutrophication');
assert(eutrophicWater.dissolvedOxygenMgL <= 3.0, 'Dissolved oxygen drops dangerously below 3.0 mg/L (anoxia)');
assert(eutrophicWater.fishSurvivalProbability <= 20, 'Fish survival rate plummets below 20%');

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed + failed} TESTS PASSED`);
if (failed === 0) {
  console.log(' TEST SUITE 184 COMPLETED IN 100% HARMONY!');
} else {
  console.error(` TEST SUITE 184 FAILED WITH ${failed} DEFECTS!`);
  process.exit(1);
}
console.log('======================================================================');
