// tests/test-salt-hydrolysis.mjs
// Test Suite 204: Salt Hydrolysis, Solution pH, Indicators & Alum Water Clarification
import assert from 'assert';
import {
  SALT_HYDROLYSIS_CATALOG,
  simulateAlumClarification
} from '../src/domain/saltHydrolysisEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 204: SALT HYDROLYSIS & WATER CLARIFICATION');
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

// 1. Salt Hydrolysis Catalog Tests
test('Catalog contains 7 representative salts across all 4 hydrolysis types', () => {
  assert.strictEqual(SALT_HYDROLYSIS_CATALOG.length, 7);
  const types = new Set(SALT_HYDROLYSIS_CATALOG.map(s => s.hydrolysisType));
  assert.ok(types.has('NEUTRAL_NO_HYDROLYSIS'));
  assert.ok(types.has('BASIC_ANION_HYDROLYSIS'));
  assert.ok(types.has('ACIDIC_CATION_HYDROLYSIS'));
  assert.ok(types.has('DUAL_HYDROLYSIS'));
});

test('NaCl is neutral (pH = 7.00) with no litmus color change', () => {
  const nacl = SALT_HYDROLYSIS_CATALOG.find(s => s.formula === 'NaCl');
  assert.ok(nacl);
  assert.strictEqual(nacl.nominalPh01M, 7.0);
  assert.strictEqual(nacl.hydrolysisType, 'NEUTRAL_NO_HYDROLYSIS');
  assert.ok(nacl.litmusColorVi.includes('Màu tím'));
  assert.ok(nacl.phenolphthaleinColorVi.includes('Không màu'));
});

test('Na2CO3 and CH3COONa are basic (pH > 7) due to anion hydrolysis', () => {
  const na2co3 = SALT_HYDROLYSIS_CATALOG.find(s => s.formula === 'Na2CO3');
  assert.ok(na2co3);
  assert.strictEqual(na2co3.nominalPh01M > 11.0, true);
  assert.ok(na2co3.phenolphthaleinColorVi.includes('Màu đỏ tía'));
  assert.ok(na2co3.litmusColorVi.includes('xanh'));

  const ch3coona = SALT_HYDROLYSIS_CATALOG.find(s => s.formula === 'CH3COONa');
  assert.ok(ch3coona);
  assert.strictEqual(ch3coona.nominalPh01M > 8.0, true);
});

test('NH4Cl, Al2(SO4)3, and FeCl3 are acidic (pH < 7) due to cation hydrolysis', () => {
  const nh4cl = SALT_HYDROLYSIS_CATALOG.find(s => s.formula === 'NH4Cl');
  assert.ok(nh4cl);
  assert.strictEqual(nh4cl.nominalPh01M < 6.0, true);
  assert.ok(nh4cl.litmusColorVi.includes('đỏ'));

  const al = SALT_HYDROLYSIS_CATALOG.find(s => s.formula === 'Al2(SO4)3');
  assert.ok(al);
  assert.strictEqual(al.nominalPh01M < 4.0, true);
  assert.ok(al.litmusColorVi.includes('đỏ'));

  const fe = SALT_HYDROLYSIS_CATALOG.find(s => s.formula === 'FeCl3');
  assert.ok(fe);
  assert.strictEqual(fe.nominalPh01M < 3.0, true);
});

test('CH3COONH4 has dual hydrolysis yielding neutral pH due to equal Ka and Kb', () => {
  const salt = SALT_HYDROLYSIS_CATALOG.find(s => s.formula === 'CH3COONH4');
  assert.ok(salt);
  assert.strictEqual(salt.hydrolysisType, 'DUAL_HYDROLYSIS');
  assert.strictEqual(salt.nominalPh01M, 7.0);
  assert.ok(salt.litmusColorVi.includes('tím'));
});

// 2. Alum Water Clarification Tests
test('Zero alum dose leaves flood water muddy and turbid (0% removed)', () => {
  const zero = simulateAlumClarification(250, 0);
  assert.strictEqual(zero.sedimentRemovedPercent, 0);
  assert.strictEqual(zero.finalTurbidityNtu, 250);
  assert.ok(zero.waterAppearanceVi.includes('đục ngầu'));
});

test('Optimal alum dose (50 mg/L) removes > 85% sediment and clarifies water', () => {
  const optimal = simulateAlumClarification(250, 50);
  assert.strictEqual(optimal.sedimentRemovedPercent > 85, true);
  assert.strictEqual(optimal.finalTurbidityNtu < 40, true);
  assert.ok(optimal.waterAppearanceVi.includes('trong'));
  assert.strictEqual(optimal.equilibriumPh < 7.4, true); // acidic shift
});

test('Alum hydrolysis releases H+ dropping solution pH', () => {
  const low = simulateAlumClarification(250, 20);
  const high = simulateAlumClarification(250, 80);
  assert.strictEqual(high.equilibriumPh < low.equilibriumPh, true);
  assert.ok(high.scientificMechanismVi.includes('Al(OH)₃'));
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed} TESTS PASSED`);
console.log(' TEST SUITE 204 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
