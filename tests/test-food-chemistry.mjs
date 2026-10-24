// tests/test-food-chemistry.mjs
// Test Suite 210: Food Chemistry, Maillard Reaction, Lipid Rancidity & Safety Testing
// Standardized against Vietnam GDPT 2018 Chemistry & FAO/WHO Codex Standards

import assert from 'assert';
import {
  simulateMaillardReaction,
  simulateLipidAutoOxidation,
  performBoraxCurcuminTest,
  PRESERVATIVE_CATALOG
} from '../src/domain/foodChemistryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 210: FOOD CHEMISTRY & FOOD SAFETY ENGINE      ');
console.log('======================================================================\n');

// 1. Maillard Reaction Kinetics & Browning
{
  const lowTemp = simulateMaillardReaction(60, 20);
  assert(lowTemp.browningIntensityPercent < 15, 'Low temp (60°C) should have minimal browning');
  assert.strictEqual(lowTemp.browningColorHex, '#fef3c7', 'Should remain pale');
  console.log('  ✓ Low temperature (60°C) produces minimal non-enzymatic browning');

  const bakingToast = simulateMaillardReaction(160, 25, 'D-Glucose', 'L-Lysine');
  assert(bakingToast.browningIntensityPercent > 50, '160°C for 25 min must yield rich browning');
  assert(bakingToast.melanoidinYieldMmol > 5, 'Melanoidins must form in significant amounts');
  assert(bakingToast.dominantAromaNotesVi.length > 0, 'Must produce roasted aroma notes');
  console.log('  ✓ Baking temperature (160°C) yields golden/chestnut brown Melanoidins with roasted aroma');

  // Asparagine high heat acrylamide hazard
  const acrylamideRun = simulateMaillardReaction(200, 30, 'D-Glucose', 'L-Asparagine');
  assert(acrylamideRun.acrylamideConcentrationPpb > 500, 'High heat Asparagine must generate Acrylamide');
  assert.notStrictEqual(acrylamideRun.acrylamideRiskLevel, 'NONE', 'Must flag Acrylamide risk');
  console.log('  ✓ High heat frying (200°C) with L-Asparagine triggers Acrylamide health risk warnings');
}

// 2. Lipid Auto-Oxidation & Rancidity
{
  // Fresh olive oil: high oleic acid (low PUFA)
  const oliveOil = simulateLipidAutoOxidation('OLIVE_OIL', 5, false, false, true, 20);
  assert.strictEqual(oliveOil.freshnessGradeVi, 'DẦU_TƯƠI_MỚI', 'Protected olive oil must remain fresh');
  assert(oliveOil.peroxideValuePovMeqPerKg <= 5.0, 'POV must be low in fresh oil');
  console.log('  ✓ Fresh olive oil stored in dark with antioxidant maintains low Peroxide Value (POV ≤ 5.0)');

  // Degraded sunflower oil: high PUFA with light and heat
  const spoiledOil = simulateLipidAutoOxidation('SUNFLOWER_OIL', 45, true, true, false, 35);
  assert.strictEqual(spoiledOil.freshnessGradeVi, 'ÔI_THIU_NGUY_HẠI', 'Exposed sunflower oil must become rancid');
  assert(spoiledOil.peroxideValuePovMeqPerKg > 10.0, 'POV must exceed rancidity threshold');
  assert(spoiledOil.rancidOdorNotesVi.some(n => n.includes('Hexanal')), 'Must report volatile aldehyde odor');
  console.log('  ✓ High PUFA oil exposed to light and air auto-oxidizes to rancidity with hexanal/MDA odors');
}

// 3. Food Safety Testing: Borax Detection via Curcumin
{
  const adulterated = performBoraxCurcuminTest('ADULTERATED_BORAX_SAUSAGE');
  assert.strictEqual(adulterated.boraxPresent, true, 'Must detect presence of Borax');
  assert.strictEqual(adulterated.isLegalForFoodConsumption, false, 'Borax sausage is illegal');
  assert.strictEqual(adulterated.acidExtractColorHex, '#dc2626', 'Acid extract forms red-orange Rosocyanine');
  assert.strictEqual(adulterated.alkaliConfirmationColorHex, '#022c22', 'Alkali confirmation turns dark green-black');
  console.log('  ✓ Borax in pork sausage reacts with curcumin forming red Rosocyanine and dark green alkaline shift');

  const pure = performBoraxCurcuminTest('PURE_PORK_SAUSAGE');
  assert.strictEqual(pure.boraxPresent, false, 'Pure sausage has no Borax');
  assert.strictEqual(pure.isLegalForFoodConsumption, true, 'Pure sausage is legal');
  assert.strictEqual(pure.acidExtractColorHex, '#eab308', 'Retains natural yellow curcumin color');
  console.log('  ✓ Authentic sausage remains yellow with negative Borax test result');
}

// 4. Preservative Catalog
{
  assert(PRESERVATIVE_CATALOG.length >= 3, 'Must contain core regulated preservatives');
  const benzoate = PRESERVATIVE_CATALOG.find(p => p.id === 'SODIUM_BENZOATE');
  assert(benzoate, 'Sodium Benzoate must be listed');
  assert(benzoate.optimalPhRange.includes('pH 2.5 - 4.0'), 'Benzoate requires acidic medium');

  const nitrite = PRESERVATIVE_CATALOG.find(p => p.id === 'SODIUM_NITRITE');
  assert(nitrite, 'Sodium Nitrite must be listed');
  assert(nitrite.mechanismVi.includes('botulinum'), 'Nitrite inhibits Clostridium botulinum');
  console.log('  ✓ Preservative catalog validates pH boundaries for Benzoate and Botulinum inhibition for Nitrite');
}

console.log('\n======================================================================');
console.log(' AUDIT SUMMARY: ALL TEST CRITERIA MET');
console.log(' TEST SUITE 210 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
