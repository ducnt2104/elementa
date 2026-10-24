// tests/test-halogen-derivatives.mjs
/**
 * ELEMENTA — Test Suite 188: Halogen Derivatives Domain Engine
 * Conforms to GDPT 2018 Chemistry Grade 11 (Chủ đề 5: Dẫn xuất Halogen) & IUPAC Standards
 */

import assert from 'assert';
import {
  HALOGEN_DERIVATIVE_CATALOG,
  simulateHalogenDiagnosticTest,
  simulateZaitsevElimination,
  predictMechanism,
  simulateCfcOzoneCycle
} from '../src/domain/halogenDerivativesEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 188: HALOGEN DERIVATIVES DOMAIN ENGINE');
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

// 1. Catalog of Halogen Derivatives
test('Catalog contains at least 8 representative halogen derivative compounds', () => {
  assert.ok(HALOGEN_DERIVATIVE_CATALOG.length >= 8);
});

test('Catalog contains alkyl, allylic, benzylic, vinylic, aryl, and polyhalogen classes', () => {
  const classes = new Set(HALOGEN_DERIVATIVE_CATALOG.map(c => c.halogenClass));
  assert.ok(classes.has('ALKYL'));
  assert.ok(classes.has('ALLYLIC'));
  assert.ok(classes.has('BENZYLIC'));
  assert.ok(classes.has('VINYLIC'));
  assert.ok(classes.has('ARYL'));
  assert.ok(classes.has('POLYHALOGEN'));
});

test('Chlorobenzene and Vinyl chloride are identified as inert under standard hydrolysis', () => {
  const c6h5cl = HALOGEN_DERIVATIVE_CATALOG.find(c => c.id === 'chlorobenzene');
  const c2h3cl = HALOGEN_DERIVATIVE_CATALOG.find(c => c.id === 'vinyl-chloride');
  assert.strictEqual(c6h5cl.hydrolysisReactivity, 'INERT_UNDER_STANDARD');
  assert.strictEqual(c2h3cl.hydrolysisReactivity, 'INERT_UNDER_STANDARD');
});

test('Allyl chloride and Benzyl chloride exhibit VERY_HIGH hydrolysis reactivity', () => {
  const allyl = HALOGEN_DERIVATIVE_CATALOG.find(c => c.id === 'allyl-chloride');
  const benzyl = HALOGEN_DERIVATIVE_CATALOG.find(c => c.id === 'benzyl-chloride');
  assert.strictEqual(allyl.hydrolysisReactivity, 'VERY_HIGH');
  assert.strictEqual(benzyl.hydrolysisReactivity, 'VERY_HIGH');
});

// 2. Hydrolysis & Halogen Diagnostic Test (AgNO3 / HNO3)
test('Chlorobenzene fails to hydrolyze and yields NO precipitate with AgNO3', () => {
  const res = simulateHalogenDiagnosticTest('chlorobenzene');
  assert.strictEqual(res.hydrolyzesUnderStandard, false);
  assert.strictEqual(res.precipitateFormed, false);
  assert.ok(res.examTrapAlertVi.includes('BẪY THI CỰC KỲ QUAN TRỌNG'));
});

test('Vinyl chloride fails to hydrolyze and yields NO precipitate with AgNO3', () => {
  const res = simulateHalogenDiagnosticTest('vinyl-chloride');
  assert.strictEqual(res.hydrolyzesUnderStandard, false);
  assert.strictEqual(res.precipitateFormed, false);
});

test('Ethyl chloride hydrolyzes and requires HNO3 neutralization before AgNO3 test', () => {
  const res = simulateHalogenDiagnosticTest('ethyl-chloride');
  assert.strictEqual(res.hydrolyzesUnderStandard, true);
  assert.strictEqual(res.hno3NeutralizationRequired, true);
  assert.ok(res.hno3RoleExplanationVi.includes('Ag2O'));
  assert.strictEqual(res.precipitateFormed, true);
  assert.strictEqual(res.precipitateColor, 'Trắng');
  assert.strictEqual(res.precipitateFormula, 'AgCl↓');
  assert.ok(res.ammoniaSolubilityVi.includes('[Ag(NH3)2]+'));
});

test('Isopropyl bromide yields pale yellow AgBr precipitate with AgNO3', () => {
  const res = simulateHalogenDiagnosticTest('isopropyl-bromide');
  assert.strictEqual(res.precipitateColor, 'Vàng nhạt');
  assert.strictEqual(res.precipitateFormula, 'AgBr↓');
  assert.ok(res.ammoniaSolubilityVi.includes('Tan ít'));
});

// 3. Ethanolic Dehydrohalogenation (Zaitsev Elimination)
test('2-Bromobutane follows Zaitsev rule producing But-2-ene as major product (>80%)', () => {
  const res = simulateZaitsevElimination('2-bromobutane');
  assert.strictEqual(res.reactionOccurs, true);
  assert.ok(res.majorProduct.nameIupac.includes('But-2-ene'));
  assert.ok(res.majorProduct.percentage >= 80);
  assert.ok(res.minorProduct.nameIupac.includes('But-1-ene'));
  assert.ok(res.ruleAppliedVi.includes('Zaitsev'));
});

test('Solvent role distinguishes elimination (KOH/ethanol) from substitution (KOH/water)', () => {
  const res = simulateZaitsevElimination('2-bromobutane');
  assert.ok(res.solventRoleVi.includes('C2H5OH') || res.solventRoleVi.includes('etanol'));
  assert.ok(res.solventRoleVi.includes('butan-2-ol'));
});

test('tert-Butyl chloride undergoes quantitative E2 elimination yielding isobutylene', () => {
  const res = simulateZaitsevElimination('tert-butyl-chloride');
  assert.strictEqual(res.majorProduct.percentage, 100);
  assert.ok(res.majorProduct.nameIupac.includes('2-Methylpropene'));
});

// 4. Mechanism Decision Matrix (SN1, SN2, E1, E2)
test('Primary halide with unhindered strong nucleophile executes SN2 with Walden inversion', () => {
  const res = predictMechanism('1°', 'STRONG', 'WEAK', 'POLAR_APROTIC');
  assert.strictEqual(res.predominantMechanism, 'SN2');
  assert.ok(res.stereochemicalOutcomeVi.includes('Walden'));
  assert.strictEqual(res.carbocationIntermediateFormed, false);
});

test('Primary halide with bulky strong base executes E2 elimination', () => {
  const res = predictMechanism('1°', 'WEAK', 'STRONG', 'POLAR_APROTIC');
  assert.strictEqual(res.predominantMechanism, 'E2');
  assert.strictEqual(res.carbocationIntermediateFormed, false);
});

test('Tertiary halide with weak nucleophile/base in polar protic solvent executes SN1 with racemization', () => {
  const res = predictMechanism('3°', 'WEAK', 'WEAK', 'POLAR_PROTIC');
  assert.strictEqual(res.predominantMechanism, 'SN1');
  assert.strictEqual(res.carbocationIntermediateFormed, true);
  assert.ok(res.stereochemicalOutcomeVi.includes('Racemic'));
  assert.ok(res.kineticRateLaw.includes('v = k[RX]'));
});

test('Tertiary halide with strong base undergoes E2 elimination', () => {
  const res = predictMechanism('3°', 'STRONG', 'STRONG', 'POLAR_PROTIC');
  assert.strictEqual(res.predominantMechanism, 'E2');
  assert.strictEqual(res.carbocationIntermediateFormed, false);
});

test('Secondary halide with strong nucleophile in polar aprotic solvent favors SN2', () => {
  const res = predictMechanism('2°', 'STRONG', 'WEAK', 'POLAR_APROTIC');
  assert.strictEqual(res.predominantMechanism, 'SN2');
});

// 5. CFC Photolysis & Stratospheric Ozone Depletion
test('CFC-12 ozone depletion model includes UV photolysis and catalytic chain steps', () => {
  const res = simulateCfcOzoneCycle();
  assert.strictEqual(res.ozoneDepletionPotential, 1.0);
  assert.strictEqual(res.radicalChainSteps.length, 3);
  assert.ok(res.catalyticEfficiency.includes('100,000'));
  assert.ok(res.montrealProtocolReplacementVi.includes('Montreal'));
  assert.ok(res.montrealProtocolReplacementVi.includes('HFC'));
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / 17 TESTS PASSED`);
console.log(' TEST SUITE 188 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
