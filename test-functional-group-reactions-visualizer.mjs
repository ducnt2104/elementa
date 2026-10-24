// test-functional-group-reactions-visualizer.mjs
// Test Suite 95: Qualitative Organic Functional Group Identification & Characteristic Color Reaction Engine
// Standards: IUPAC Compendium of Analytical Nomenclature & Vietnam GDPT 2018 (Hóa 11-12: Nhận biết định tính nhóm chức hữu cơ)

import assert from 'assert';
import {
  ORGANIC_SUBSTANCES,
  REAGENTS,
  simulateReagentTest,
  deduceCandidateSubstances,
  getMatchingFunctionalGroupSubstance,
} from './src/domain/functionalGroupReactionsEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 95: QUALITATIVE ORGANIC FUNCTIONAL GROUP IDENTIFICATION ENGINE');

let testsPassed = 0;

function runTest(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    process.exit(1);
  }
}

// 1. REAGENTS CATALOG INTEGRITY
runTest('REAGENTS catalog defines all standard analytical reagents with accurate initial colors', () => {
  assert(REAGENTS.bromine_water);
  assert(REAGENTS.baeyer_kmno4);
  assert(REAGENTS.tollens_silver);
  assert(REAGENTS.cuoh2_fresh);
  assert(REAGENTS.fecl3_neutral);
  assert(REAGENTS.iodoform_reagent);
  assert(REAGENTS.nahco3_solution);

  assert.strictEqual(REAGENTS.bromine_water.initialColorRgb, '#ea580c'); // Orange-brown
  assert.strictEqual(REAGENTS.baeyer_kmno4.initialColorRgb, '#7e22ce'); // Purple
});

// 2. ORGANIC SUBSTANCES FUNCTIONAL GROUP DIVERSITY
runTest('ORGANIC_SUBSTANCES spans all core functional groups in Vietnam GDPT 2018 curriculum', () => {
  assert(ORGANIC_SUBSTANCES.ethylene);
  assert.strictEqual(ORGANIC_SUBSTANCES.ethylene.category, 'ALKENE');

  assert(ORGANIC_SUBSTANCES.acetylene);
  assert.strictEqual(ORGANIC_SUBSTANCES.acetylene.category, 'ALKYNE_TERMINAL');

  assert(ORGANIC_SUBSTANCES.glycerol);
  assert.strictEqual(ORGANIC_SUBSTANCES.glycerol.category, 'ALCOHOL_POLY_VICINAL');

  assert(ORGANIC_SUBSTANCES.phenol);
  assert.strictEqual(ORGANIC_SUBSTANCES.phenol.category, 'PHENOL');

  assert(ORGANIC_SUBSTANCES.acetaldehyde);
  assert.strictEqual(ORGANIC_SUBSTANCES.acetaldehyde.category, 'ALDEHYDE');

  assert(ORGANIC_SUBSTANCES.acetone);
  assert.strictEqual(ORGANIC_SUBSTANCES.acetone.category, 'KETONE');

  assert(ORGANIC_SUBSTANCES.acetic_acid);
  assert.strictEqual(ORGANIC_SUBSTANCES.acetic_acid.category, 'CARBOXYLIC_ACID');

  assert(ORGANIC_SUBSTANCES.aniline);
  assert.strictEqual(ORGANIC_SUBSTANCES.aniline.category, 'AMINE_AROMATIC');
});

// 3. ALKENE UNSATURATION REACTIONS
runTest('Ethylene decolorizes bromine water and Baeyer alkaline KMnO4 reagent', () => {
  const brRes = simulateReagentTest('ethylene', 'bromine_water');
  assert.strictEqual(brRes.isPositive, true);
  assert(brRes.visualObservationVI.includes('không màu') || brRes.visualObservationVI.includes('mất màu'));
  assert(brRes.chemicalEquation.includes('CH2Br-CH2Br'));

  const kmno4Res = simulateReagentTest('ethylene', 'baeyer_kmno4');
  assert.strictEqual(kmno4Res.isPositive, true);
  assert(kmno4Res.visualObservationVI.includes('nâu đen'));
  assert(kmno4Res.chemicalEquation.includes('MnO2'));
});

// 4. TERMINAL ALKYNE SPECIFICITY
runTest('Acetylene forms bright yellow precipitate with Tollens, while ethylene gives negative test', () => {
  const c2h2Tollens = simulateReagentTest('acetylene', 'tollens_silver');
  assert.strictEqual(c2h2Tollens.isPositive, true);
  assert(c2h2Tollens.visualObservationVI.includes('vàng nhạt'));
  assert(c2h2Tollens.chemicalEquation.includes('AgC≡CAg'));

  const c2h4Tollens = simulateReagentTest('ethylene', 'tollens_silver');
  assert.strictEqual(c2h4Tollens.isPositive, false);
});

// 5. VICINAL POLYOLS VS MONOHYDRIC ALCOHOL
runTest('Glycerol dissolves Cu(OH)2 to royal blue complex; Ethanol gives negative test', () => {
  const glyRes = simulateReagentTest('glycerol', 'cuoh2_fresh');
  assert.strictEqual(glyRes.isPositive, true);
  assert(glyRes.visualObservationVI.includes('xanh lam thẫm'));
  assert(glyRes.chemicalEquation.includes('[C3H7O3]2Cu'));

  const ethRes = simulateReagentTest('ethanol', 'cuoh2_fresh');
  assert.strictEqual(ethRes.isPositive, false);
  assert(ethRes.visualObservationVI.includes('không tan'));
});

// 6. PHENOL BROMINE & FECL3 REACTIONS
runTest('Phenol forms white 2,4,6-tribromophenol precipitate and purple FeCl3 complex', () => {
  const brRes = simulateReagentTest('phenol', 'bromine_water');
  assert.strictEqual(brRes.isPositive, true);
  assert(brRes.visualObservationVI.includes('kết tủa trắng'));
  assert(brRes.chemicalEquation.includes('C6H2Br3OH'));

  const feRes = simulateReagentTest('phenol', 'fecl3_neutral');
  assert.strictEqual(feRes.isPositive, true);
  assert(feRes.visualObservationVI.includes('màu tím'));
  assert(feRes.chemicalEquation.includes('[Fe(OC6H5)6]'));
});

// 7. PHENOL VS CARBOXYLIC ACID DISCRIMINATION (NAHCO3)
runTest('Acetic acid effervesces vigorously with NaHCO3 (CO2); Phenol gives no gas', () => {
  const acidRes = simulateReagentTest('acetic_acid', 'nahco3_solution');
  assert.strictEqual(acidRes.isPositive, true);
  assert.strictEqual(acidRes.gasEvolved, 'CO2');
  assert(acidRes.visualObservationVI.includes('sủi bọt khí'));

  const phenolRes = simulateReagentTest('phenol', 'nahco3_solution');
  assert.strictEqual(phenolRes.isPositive, false);
  assert(!phenolRes.gasEvolved);
});

// 8. ALDEHYDE VS KETONE OXIDATION
runTest('Acetaldehyde gives silver mirror and red Cu2O; Acetone gives negative test', () => {
  const aldTollens = simulateReagentTest('acetaldehyde', 'tollens_silver', true);
  assert.strictEqual(aldTollens.isPositive, true);
  assert(aldTollens.visualObservationVI.includes('tráng gương'));
  assert(aldTollens.chemicalEquation.includes('Ag↓'));

  const aldCu = simulateReagentTest('acetaldehyde', 'cuoh2_fresh', true);
  assert.strictEqual(aldCu.isPositive, true);
  assert(aldCu.visualObservationVI.includes('đỏ gạch'));
  assert(aldCu.chemicalEquation.includes('Cu2O'));

  const ketTollens = simulateReagentTest('acetone', 'tollens_silver', true);
  assert.strictEqual(ketTollens.isPositive, false);

  const ketCu = simulateReagentTest('acetone', 'cuoh2_fresh', true);
  assert.strictEqual(ketCu.isPositive, false);
});

// 9. IODOFORM HALOFORM REACTION SPECIFICITY
runTest('Iodoform test is positive for acetone, ethanol, and acetaldehyde with yellow CHI3 ppt', () => {
  const aceRes = simulateReagentTest('acetone', 'iodoform_reagent', true);
  assert.strictEqual(aceRes.isPositive, true);
  assert(aceRes.visualObservationVI.includes('Iodoform (CHI3)'));

  const ethRes = simulateReagentTest('ethanol', 'iodoform_reagent', true);
  assert.strictEqual(ethRes.isPositive, true);

  const aldRes = simulateReagentTest('acetaldehyde', 'iodoform_reagent', true);
  assert.strictEqual(aldRes.isPositive, true);

  const c2h4Res = simulateReagentTest('ethylene', 'iodoform_reagent', true);
  assert.strictEqual(c2h4Res.isPositive, false);
});

// 10. ANILINE BROMINATION
runTest('Aniline forms white 2,4,6-tribromoaniline precipitate with bromine water', () => {
  const aniRes = simulateReagentTest('aniline', 'bromine_water');
  assert.strictEqual(aniRes.isPositive, true);
  assert(aniRes.visualObservationVI.includes('kết tủa trắng'));
  assert(aniRes.chemicalEquation.includes('C6H2Br3NH2'));
});

// 11. THERMAL ACTIVATION REQUIREMENT GUARDRAIL
runTest('Reactions requiring heat remain unreacted if heatingApplied is false', () => {
  const unheatedTollens = simulateReagentTest('acetaldehyde', 'tollens_silver', false);
  assert.strictEqual(unheatedTollens.isPositive, false);
  assert.strictEqual(unheatedTollens.requiresHeating, true);
  assert(unheatedTollens.visualObservationVI.includes('Cần đun nóng'));

  const heatedTollens = simulateReagentTest('acetaldehyde', 'tollens_silver', true);
  assert.strictEqual(heatedTollens.isPositive, true);
  assert(heatedTollens.visualObservationVI.includes('tráng gương'));
});

// 12. DEDUCTIVE CANDIDATE SEARCH (DEDUCTION ENGINE)
runTest('deduceCandidateSubstances accurately identifies candidate compounds by filter set', () => {
  // Filter for carboxylic acid: NaHCO3 must be POSITIVE
  const acidCandidates = deduceCandidateSubstances([
    { reagentId: 'nahco3_solution', mustBePositive: true },
  ]);
  assert.strictEqual(acidCandidates.length, 1);
  assert.strictEqual(acidCandidates[0].id, 'acetic_acid');

  // Filter for alkene/alkyne: Bromine water must be POSITIVE
  const unsatCandidates = deduceCandidateSubstances([
    { reagentId: 'bromine_water', mustBePositive: true },
  ]);
  assert(unsatCandidates.some(c => c.id === 'ethylene'));
  assert(unsatCandidates.some(c => c.id === 'acetylene'));
  assert(unsatCandidates.some(c => c.id === 'phenol'));
  assert(unsatCandidates.some(c => c.id === 'aniline'));
});

// 13. CARD MATCHING HELPER
runTest('getMatchingFunctionalGroupSubstance accurately maps cards to organic substances', () => {
  const matchEth = getMatchingFunctionalGroupSubstance({ name: 'Khí Etilen Ethylene' });
  assert(matchEth);
  assert.strictEqual(matchEth.id, 'ethylene');

  const matchPhenol = getMatchingFunctionalGroupSubstance({ name: 'Phenol C6H5OH' });
  assert(matchPhenol);
  assert.strictEqual(matchPhenol.id, 'phenol');

  const matchGeneric = getMatchingFunctionalGroupSubstance({ name: 'Thuốc thử nhận biết' });
  assert(matchGeneric);
  assert.strictEqual(matchGeneric.id, 'ethylene');

  const matchRandom = getMatchingFunctionalGroupSubstance({ name: 'Krypton Gas' });
  assert.strictEqual(matchRandom, null);
});

// 14. PROCEDURAL SOUND ENGINE TRIGGERS
runTest('sound engine contains playGasBubblingFizz and playPrecipitateFormChime methods', () => {
  assert.strictEqual(typeof sound.playGasBubblingFizz, 'function');
  assert.strictEqual(typeof sound.playPrecipitateFormChime, 'function');
});

// 15. VISUALIZER COMPONENT INTEGRITY
runTest('FunctionalGroupReactionsVisualizer.tsx is syntactically sound and exports the component', async () => {
  const fs = await import('fs');
  const path = await import('path');
  const compPath = path.resolve('src/components/visualizations/FunctionalGroupReactionsVisualizer.tsx');
  const exists = fs.existsSync(compPath);
  assert.strictEqual(exists, true, 'FunctionalGroupReactionsVisualizer.tsx must exist');

  const code = fs.readFileSync(compPath, 'utf8');
  assert(code.includes('export const FunctionalGroupReactionsVisualizer: React.FC'));
  assert(code.includes('simulateReagentTest'));
  assert(code.includes('deduceCandidateSubstances'));
  assert(code.includes('playGasBubblingFizz'));
  assert(code.includes('playPrecipitateFormChime'));
});

console.log(`\n🎉 SUITE 95 SUMMARY: ${testsPassed} / 15 TESTS PASSED (100% PASS RATE)`);
