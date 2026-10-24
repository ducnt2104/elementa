// tests/test-hydrocarbon-reactions.mjs
/**
 * ELEMENTA — Test Suite 186: Hydrocarbons Domain Engine
 * Covers GDPT 2018 Chemistry Grade 11 (Chủ đề 4: Hydrocarbon) & IUPAC Standards
 */

import assert from 'assert';
import {
  HYDROCARBON_CATALOG,
  simulateMarkovnikovAddition,
  simulateTerminalAlkyneSilverTest,
  simulateAlkaneHalogenation,
  simulateAromaticReaction
} from '../src/domain/hydrocarbonEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 186: HYDROCARBONS DOMAIN ENGINE');
console.log('======================================================================\n');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    process.exit(1);
  }
}

// 1. Hydrocarbon Catalog
test('Catalog contains at least 11 comprehensive hydrocarbon compounds', () => {
  assert.ok(HYDROCARBON_CATALOG.length >= 11, `Expected >= 11, got ${HYDROCARBON_CATALOG.length}`);
});

test('Catalog contains all 4 fundamental hydrocarbon classes', () => {
  const classes = new Set(HYDROCARBON_CATALOG.map(c => c.class));
  assert.ok(classes.has('ALKANE'));
  assert.ok(classes.has('ALKENE'));
  assert.ok(classes.has('ALKYNE'));
  assert.ok(classes.has('ARENE'));
});

test('Methane is sp3 hybridized with tetrahedral geometry', () => {
  const ch4 = HYDROCARBON_CATALOG.find(c => c.id === 'methane');
  assert.strictEqual(ch4.carbonHybridization, 'sp3');
  assert.ok(ch4.molecularGeometry.includes('109.5°'));
});

test('Ethene is sp2 hybridized planar molecule', () => {
  const c2h4 = HYDROCARBON_CATALOG.find(c => c.id === 'ethene');
  assert.strictEqual(c2h4.carbonHybridization, 'sp2');
  assert.ok(c2h4.molecularGeometry.includes('120°'));
});

test('Ethyne is sp hybridized linear molecule with terminal flag', () => {
  const c2h2 = HYDROCARBON_CATALOG.find(c => c.id === 'ethyne');
  assert.strictEqual(c2h2.carbonHybridization, 'sp');
  assert.ok(c2h2.molecularGeometry.includes('180°'));
  assert.strictEqual(c2h2.isTerminal, true);
});

test('But-2-yne is identified as non-terminal alkyne', () => {
  const but2yne = HYDROCARBON_CATALOG.find(c => c.id === 'but-2-yne');
  assert.strictEqual(but2yne.isTerminal, false);
});

// 2. Markovnikov Addition & Bayer KMnO4 Test
test('Ethene symmetric addition produces 100% single product', () => {
  const res = simulateMarkovnikovAddition('ethene', 'HBr');
  assert.strictEqual(res.majorProduct.percentage, 100);
  assert.strictEqual(res.majorProduct.nameIupac, 'Bromoethane');
  assert.strictEqual(res.minorProduct, undefined);
});

test('Propene normal Markovnikov addition favors 2-bromopropane as major product', () => {
  const res = simulateMarkovnikovAddition('propene', 'HBr', false);
  assert.strictEqual(res.majorProduct.nameIupac, '2-Bromopropane');
  assert.ok(res.majorProduct.percentage >= 80);
  assert.strictEqual(res.minorProduct.nameIupac, '1-Bromopropane');
  assert.ok(res.ruleAppliedVi.includes('Markovnikov'));
});

test('Propene with HBr and peroxide triggers Kharasch effect (Anti-Markovnikov)', () => {
  const res = simulateMarkovnikovAddition('propene', 'HBr', true);
  assert.strictEqual(res.majorProduct.nameIupac, '1-Bromopropane');
  assert.strictEqual(res.hasPeroxide, true);
  assert.ok(res.ruleAppliedVi.includes('Anti-Markovnikov') || res.ruleAppliedVi.includes('Peoxit'));
});

test('Bayer KMnO4 test causes purple decolorization and MnO2 precipitate for alkenes', () => {
  const res = simulateMarkovnikovAddition('ethene', 'HCl');
  assert.strictEqual(res.bayerDecolorization.occurs, true);
  assert.ok(res.bayerDecolorization.colorChange.includes('mất màu'));
  assert.ok(res.bayerDecolorization.precipitate.includes('MnO2'));
});

// 3. Terminal Alkynes & Tollens Reagent (AgNO3/NH3)
test('Ethyne reacts with AgNO3/NH3 in 1:2 ratio producing silver acetylide', () => {
  const res = simulateTerminalAlkyneSilverTest('ethyne', 0.05);
  assert.strictEqual(res.reactsWithAgNO3NH3, true);
  assert.ok(res.precipitateFormula.includes('Ag-C≡C-Ag') || res.precipitateFormula.includes('Ag2C2'));
  assert.ok(res.precipitateColor.includes('Vàng nhạt'));
  assert.ok(res.diagnosticNoteVi.includes('1 mol C2H2 thế 2 mol Ag'));
  assert.strictEqual(res.calculatedPrecipitateMassG, 11.988); // 0.05 * 239.76
});

test('Propyne reacts with AgNO3/NH3 in 1:1 ratio forming yellow precipitate', () => {
  const res = simulateTerminalAlkyneSilverTest('propyne', 0.05);
  assert.strictEqual(res.reactsWithAgNO3NH3, true);
  assert.strictEqual(res.precipitateFormula, 'CH3-C≡C-Ag↓');
  assert.ok(res.calculatedPrecipitateMassG > 0);
});

test('But-2-yne is completely inert towards AgNO3/NH3 (no precipitate)', () => {
  const res = simulateTerminalAlkyneSilverTest('but-2-yne', 0.05);
  assert.strictEqual(res.reactsWithAgNO3NH3, false);
  assert.strictEqual(res.calculatedPrecipitateMassG, 0);
  assert.ok(res.diagnosticNoteVi.includes('BẪY THI ĐẠI HỌC KINH ĐIỂN'));
});

test('Kucherov hydration of ethyne forms acetaldehyde', () => {
  const res = simulateTerminalAlkyneSilverTest('ethyne');
  assert.ok(res.polymerizationOrHydrationInfo.kucherovEquation.includes('CH3-CHO'));
  assert.ok(res.polymerizationOrHydrationInfo.kucherovProductVi.includes('Andehit axetic'));
});

// 4. Alkane Halogenation & Free-Radical Stability
test('Halogenation fails in darkness without UV light', () => {
  const res = simulateAlkaneHalogenation('propane', 'Cl2', false);
  assert.strictEqual(res.reactionOccurs, false);
  assert.strictEqual(res.products.length, 0);
  assert.ok(res.selectivityExplanationVi.includes('Không có ánh sáng'));
});

test('Propane chlorination produces both 2-chloropropane (major) and 1-chloropropane (minor)', () => {
  const res = simulateAlkaneHalogenation('propane', 'Cl2', true);
  assert.strictEqual(res.reactionOccurs, true);
  assert.strictEqual(res.products.length, 2);
  const major = res.products.find(p => p.isMajor);
  assert.ok(major.productNameVi.includes('2-Clopropan'));
});

test('Propane bromination exhibits ultra-high selectivity (>95% 2-bromopropane)', () => {
  const res = simulateAlkaneHalogenation('propane', 'Br2', true);
  const major = res.products.find(p => p.isMajor);
  assert.ok(major.yieldPercentage >= 95);
  assert.ok(major.productNameVi.includes('2-Bromopropan'));
  assert.ok(res.selectivityExplanationVi.includes('82:1'));
});

test('Isobutane bromination predominantly yields 2-bromo-2-methylpropane (3° carbon)', () => {
  const res = simulateAlkaneHalogenation('isobutane', 'Br2', true);
  const tertiaryProd = res.products.find(p => p.carbonDegree === '3°');
  assert.ok(tertiaryProd.yieldPercentage >= 98);
  assert.strictEqual(tertiaryProd.isMajor, true);
});

// 5. Aromatic Substitution & Side-chain Reactions
test('Benzene is completely inert to KMnO4 even when heated to 100°C', () => {
  const res = simulateAromaticReaction('benzene', 'KMNO4_HEAT');
  assert.strictEqual(res.reactionOccurs, false);
  assert.ok(res.productsSummaryVi.includes('giữ nguyên màu tím'));
  assert.ok(res.ringActivationVi.includes('150 kJ/mol'));
});

test('Toluene oxidizes with KMnO4 when heated, yielding benzoic acid white crystals', () => {
  const res = simulateAromaticReaction('toluene', 'KMNO4_HEAT');
  assert.strictEqual(res.reactionOccurs, true);
  assert.ok(res.productsSummaryVi.includes('axit benzoic'));
  assert.ok(res.benzoicAcidYield.isFormed);
  assert.ok(res.benzoicAcidYield.whiteCrystalsFormula.includes('C6H5COOH'));
});

test('Neither benzene nor toluene reacts with aqueous bromine water at room temperature', () => {
  const benzRes = simulateAromaticReaction('benzene', 'BROMINE_WATER');
  const toluRes = simulateAromaticReaction('toluene', 'BROMINE_WATER');
  assert.strictEqual(benzRes.reactionOccurs, false);
  assert.strictEqual(toluRes.reactionOccurs, false);
});

test('Benzene bromination with FeBr3 catalyst forms bromobenzene and HBr', () => {
  const res = simulateAromaticReaction('benzene', 'BROMINATION_FEBR3');
  assert.strictEqual(res.reactionOccurs, true);
  assert.ok(res.chemicalEquation.includes('C6H5Br + HBr'));
});

test('Toluene nitration with conc HNO3/H2SO4 selectively synthesizes TNT (2,4,6-trinitrotoluene)', () => {
  const res = simulateAromaticReaction('toluene', 'NITRATION_HNO3_H2SO4');
  assert.strictEqual(res.reactionOccurs, true);
  assert.ok(res.tntFormation.isFormed);
  assert.ok(res.tntFormation.tntFormula.includes('2,4,6-Trinitrotoluen'));
  assert.ok(res.directingEffectVi.includes('Ortho và Para'));
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / 23 TESTS PASSED`);
console.log(' TEST SUITE 186 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
