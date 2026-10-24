// tests/test-alkali-and-hard-water.mjs
// Test Suite 176: Group IA Alkali Metals, Group IIA Alkaline Earth Metals & Hard Water Softening Engine
// Conforming strictly to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 7: Nhóm IA & IIA) & IUPAC Standards

import {
  GROUP_IA_IIA_METALS,
  analyzeWaterHardness,
  simulateWaterSoftening
} from '../src/domain/alkaliHardWaterEngine.ts';

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
console.log('   ELEMENTA TEST SUITE 176: ALKALI & ALKALINE EARTH METALS, HARD WATER');
console.log('======================================================================');

// Test 1: Group IA Alkali Metals
assert(GROUP_IA_IIA_METALS.length >= 7, 'Catalog contains at least 7 metals');
const li = GROUP_IA_IIA_METALS.find(m => m.symbol === 'Li');
const na = GROUP_IA_IIA_METALS.find(m => m.symbol === 'Na');
const k = GROUP_IA_IIA_METALS.find(m => m.symbol === 'K');

assert(li && li.group === 'GROUP_IA_ALKALI' && li.valenceElectronConfig === '2s¹', 'Li is 2s1 alkali metal');
assert(li.flameTestColorVI.includes('Đỏ tươi'), 'Li gives carmine red flame');
assert(na && na.flameTestColorVI.includes('Vàng tươi'), 'Na gives golden yellow flame');
assert(k && k.flameTestColorVI.includes('Tím nhạt'), 'K gives lilac violet flame');
assert(na.densityGcm3 < 1.0, 'Na is lighter than water (floats on water while reacting)');

// Test 2: Group IIA Alkaline Earth Metals & Water Reactivity
const be = GROUP_IA_IIA_METALS.find(m => m.symbol === 'Be');
const mg = GROUP_IA_IIA_METALS.find(m => m.symbol === 'Mg');
const ca = GROUP_IA_IIA_METALS.find(m => m.symbol === 'Ca');
const ba = GROUP_IA_IIA_METALS.find(m => m.symbol === 'Ba');

assert(be && be.waterReactivityScore === 0, 'Be does NOT react with water at any temperature (amphoteric/inert)');
assert(mg && mg.waterReactionEquationVI.includes('sôi'), 'Mg reacts only with hot water / steam');
assert(ca && ca.waterReactivityScore > 50, 'Ca reacts with water at room temperature');
assert(ba && ba.flameTestColorVI.includes('Xanh lục táo'), 'Ba gives apple green flame');

// Test 3: Water Hardness Analysis - Temporary Hard Water
const tempSample = {
  ca2PlusMmolPerL: 1.5,
  mg2PlusMmolPerL: 0.5,
  hco3MinusMmolPerL: 4.0, // Exactly 2 * 2.0 = 4.0
  clMinusMmolPerL: 0.0,
  so42MinusMmolPerL: 0.0
};
const tempAnalysis = analyzeWaterHardness(tempSample);
assert(tempAnalysis.hardnessType === 'NUOC_CUNG_TAM_THOI', 'Sample with only HCO3- is classified as NUOC_CUNG_TAM_THOI');
assert(tempAnalysis.temporaryHardnessMgPerL > 0 && tempAnalysis.permanentHardnessMgPerL === 0, 'Temporary hardness > 0 and permanent = 0');
assert(tempAnalysis.waterCategoryVI === 'NƯỚC RẤT CỨNG', 'Total hardness ~200 mg/L is NUOC RAT CUNG');

// Test 4: Water Hardness Analysis - Permanent Hard Water
const permSample = {
  ca2PlusMmolPerL: 1.0,
  mg2PlusMmolPerL: 1.0,
  hco3MinusMmolPerL: 0.0, // No HCO3-
  clMinusMmolPerL: 2.0,
  so42MinusMmolPerL: 1.0
};
const permAnalysis = analyzeWaterHardness(permSample);
assert(permAnalysis.hardnessType === 'NUOC_CUNG_VINH_CUU', 'Sample with no HCO3- is classified as NUOC_CUNG_VINH_CUU');
assert(permAnalysis.temporaryHardnessMgPerL === 0 && permAnalysis.permanentHardnessMgPerL > 0, 'Temporary = 0 and permanent > 0');

// Test 5: Water Hardness Analysis - Total Hard Water (Both)
const totalSample = {
  ca2PlusMmolPerL: 1.5,
  mg2PlusMmolPerL: 1.0, // 2.5 mmol/L total (~250 mg/L CaCO3)
  hco3MinusMmolPerL: 2.0, // 1.0 mmol/L temp
  clMinusMmolPerL: 2.0,
  so42MinusMmolPerL: 0.5
};
const totalAnalysis = analyzeWaterHardness(totalSample);
assert(totalAnalysis.hardnessType === 'NUOC_CUNG_TOAN_PHAN', 'Sample with both is classified as NUOC_CUNG_TOAN_PHAN');
assert(totalAnalysis.temporaryHardnessMgPerL > 0 && totalAnalysis.permanentHardnessMgPerL > 0, 'Both temp and perm hardness exist');

// Test 6: Softening by Boiling: ONLY Temporary Hardness is Removed!
const boilTemp = simulateWaterSoftening({ sample: tempSample, method: 'BOILING_NUNG_NONG' });
assert(boilTemp.residualHardnessMgPerL === 0, 'Boiling completely removes 100% of temporary hardness');
assert(boilTemp.softeningEfficiencyPercent === 100, 'Boiling efficiency is 100% on temporary hard water');

const boilPerm = simulateWaterSoftening({ sample: permSample, method: 'BOILING_NUNG_NONG' });
assert(boilPerm.residualHardnessMgPerL === permAnalysis.totalHardnessCaco3MgPerL, 'Boiling CANNOT remove permanent hardness!');
assert(boilPerm.softeningEfficiencyPercent === 0, 'Boiling efficiency is 0% on permanent hard water');
assert(boilPerm.curriculumWarningVI.includes('BẪY THI ĐẠI HỌC'), 'Displays classic GDPT 2018 exam warning');

// Test 7: Softening by Soda Ash (Na2CO3) & Phosphate (Na3PO4): Universal Softeners!
const sodaSoftening = simulateWaterSoftening({ sample: totalSample, method: 'SODA_NA2CO3' });
assert(sodaSoftening.softeningEfficiencyPercent >= 90, `Soda ash removes >90% of total hardness (achieved ${sodaSoftening.softeningEfficiencyPercent}%)`);
assert(sodaSoftening.curriculumWarningVI.includes('vạn năng') || sodaSoftening.curriculumWarningVI.includes('kinh điển'), 'Notes Na2CO3 as universal softener');

const phosphateSoftening = simulateWaterSoftening({ sample: totalSample, method: 'PHOSPHATE_NA3PO4' });
assert(phosphateSoftening.softeningEfficiencyPercent >= 95, 'Na3PO4 removes >95% hardness');
assert(phosphateSoftening.precipitateFormula === 'Ca3(PO4)2', 'Forms insoluble calcium phosphate Ca3(PO4)2');

// Test 8: Softening by Ion-Exchange Resin (Modern industrial/home method)
const resinSoftening = simulateWaterSoftening({ sample: totalSample, method: 'ION_EXCHANGE_RESIN' });
assert(resinSoftening.softeningEfficiencyPercent >= 98, 'Ion exchange resin achieves >98% softening');
assert(resinSoftening.residualHardnessMgPerL < 10, 'Residual hardness is < 10 mg/L');

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed + failed} TESTS PASSED`);
if (failed > 0) {
  console.log(` FAILURE: ${failed} tests failed!`);
  process.exit(1);
} else {
  console.log(' TEST SUITE 176 COMPLETED IN 100% HARMONY!');
  console.log('======================================================================');
  process.exit(0);
}
