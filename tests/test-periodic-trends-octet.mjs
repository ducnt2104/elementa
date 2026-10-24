// tests/test-periodic-trends-octet.mjs
// Test Suite 198: Periodic Trends, Period 3 Acid-Base Progression, Ionization Anomalies & Octet Exceptions
import assert from 'assert';
import {
  PERIOD_3_TRENDS_CATALOG,
  IONIZATION_ANOMALIES,
  OCTET_CASES,
  simulateNO2Dimerization
} from '../src/domain/periodicTrendsOctetEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 198: PERIODIC TRENDS & OCTET EXCEPTIONS');
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

// 1. Period 3 Elements Catalog & Trends Tests
test('Period 3 catalog contains all 8 elements from Na (Z=11) to Ar (Z=18)', () => {
  assert.strictEqual(PERIOD_3_TRENDS_CATALOG.length, 8);
  assert.strictEqual(PERIOD_3_TRENDS_CATALOG[0].symbol, 'Na');
  assert.strictEqual(PERIOD_3_TRENDS_CATALOG[7].symbol, 'Ar');
});

test('Atomic radius decreases across Period 3 (Na -> Cl)', () => {
  const elements = PERIOD_3_TRENDS_CATALOG.slice(0, 7); // Na to Cl
  for (let i = 0; i < elements.length - 1; i++) {
    assert.strictEqual(
      elements[i].atomicRadiusPm > elements[i + 1].atomicRadiusPm,
      true,
      `Radius should decrease: ${elements[i].symbol} (${elements[i].atomicRadiusPm}) > ${elements[i + 1].symbol} (${elements[i + 1].atomicRadiusPm})`
    );
  }
});

test('Electronegativity increases across Period 3 (Na -> Cl)', () => {
  const elements = PERIOD_3_TRENDS_CATALOG.slice(0, 7); // Na to Cl
  for (let i = 0; i < elements.length - 1; i++) {
    assert.strictEqual(
      elements[i].electronegativity < elements[i + 1].electronegativity,
      true,
      `Electronegativity should increase: ${elements[i].symbol} < ${elements[i + 1].symbol}`
    );
  }
});

test('Highest hydroxide acid-base progression conforms to GDPT 2018 across Period 3', () => {
  const na = PERIOD_3_TRENDS_CATALOG.find(e => e.symbol === 'Na');
  const al = PERIOD_3_TRENDS_CATALOG.find(e => e.symbol === 'Al');
  const s = PERIOD_3_TRENDS_CATALOG.find(e => e.symbol === 'S');
  const cl = PERIOD_3_TRENDS_CATALOG.find(e => e.symbol === 'Cl');

  assert.strictEqual(na.acidBaseCategory, 'STRONG_BASE');
  assert.strictEqual(na.highestHydroxideFormula, 'NaOH');

  assert.strictEqual(al.acidBaseCategory, 'AMPHOTERIC');
  assert.strictEqual(al.highestHydroxideFormula, 'Al(OH)3');

  assert.strictEqual(s.acidBaseCategory, 'STRONG_ACID');
  assert.strictEqual(s.highestHydroxideFormula, 'H2SO4');

  assert.strictEqual(cl.acidBaseCategory, 'VERY_STRONG_ACID');
  assert.strictEqual(cl.highestHydroxideFormula, 'HClO4');
});

// 2. Ionization Energy Anomalies Tests
test('Ionization energy anomalies catalog contains Be/B, N/O, Mg/Al, and P/S pairs', () => {
  assert.strictEqual(IONIZATION_ANOMALIES.length, 4);
  const pairs = IONIZATION_ANOMALIES.map(a => `${a.element1.symbol}/${a.element2.symbol}`);
  assert.ok(pairs.includes('Be/B'));
  assert.ok(pairs.includes('N/O'));
  assert.ok(pairs.includes('Mg/Al'));
  assert.ok(pairs.includes('P/S'));
});

test('Beryllium has higher I1 than Boron (899 > 801 kJ/mol) despite smaller Z', () => {
  const beb = IONIZATION_ANOMALIES.find(a => a.element1.symbol === 'Be');
  assert.ok(beb);
  assert.strictEqual(beb.element1.i1 > beb.element2.i1, true);
  assert.ok(beb.explanationVi.includes('2s²'));
});

test('Nitrogen has higher I1 than Oxygen (1402 > 1314 kJ/mol) due to half-filled 2p3 stability', () => {
  const no = IONIZATION_ANOMALIES.find(a => a.element1.symbol === 'N');
  assert.ok(no);
  assert.strictEqual(no.element1.i1 > no.element2.i1, true);
  assert.ok(no.quantumPrincipleVi.includes('bán bão hòa'));
});

test('Magnesium and Phosphorus demonstrate identical subshell anomalies in Period 3', () => {
  const mgal = IONIZATION_ANOMALIES.find(a => a.element1.symbol === 'Mg');
  assert.ok(mgal);
  assert.strictEqual(mgal.element1.i1 > mgal.element2.i1, true);

  const ps = IONIZATION_ANOMALIES.find(a => a.element1.symbol === 'P');
  assert.ok(ps);
  assert.strictEqual(ps.element1.i1 > ps.element2.i1, true);
});

// 3. Octet Rule & Exceptions Tests
test('Octet cases catalog includes all 4 categories', () => {
  const categories = new Set(OCTET_CASES.map(c => c.category));
  assert.ok(categories.has('REGULAR_OCTET'));
  assert.ok(categories.has('INCOMPLETE_OCTET'));
  assert.ok(categories.has('EXPANDED_OCTET'));
  assert.ok(categories.has('ODD_ELECTRON_RADICAL'));
});

test('BF3 has incomplete octet with 6 electrons around B and acts as Lewis acid', () => {
  const bf3 = OCTET_CASES.find(c => c.formula === 'BF3');
  assert.ok(bf3);
  assert.strictEqual(bf3.valenceElectronsAroundCentral, 6);
  assert.strictEqual(bf3.category, 'INCOMPLETE_OCTET');
  assert.ok(bf3.reactivitySignificanceVi.includes('Acid Lewis'));
});

test('SF6 has expanded octet with 12 electrons around S and octahedral geometry', () => {
  const sf6 = OCTET_CASES.find(c => c.formula === 'SF6');
  assert.ok(sf6);
  assert.strictEqual(sf6.valenceElectronsAroundCentral, 12);
  assert.strictEqual(sf6.category, 'EXPANDED_OCTET');
  assert.ok(sf6.geometryVi.includes('Bát diện đều'));
});

test('NO2 is an odd-electron radical with 17 valence electrons and brown paramagnetic character', () => {
  const no2 = OCTET_CASES.find(c => c.formula === 'NO2');
  assert.ok(no2);
  assert.strictEqual(no2.category, 'ODD_ELECTRON_RADICAL');
  assert.strictEqual(no2.valenceElectronsAroundCentral, 7);
  assert.ok(no2.reactivitySignificanceVi.includes('thuận từ'));
});

// 4. NO2 Dimerization & Le Chatelier Simulation Tests
test('Heating NO2 shifts equilibrium towards brown monomer NO2 (delta H < 0)', () => {
  const cold = simulateNO2Dimerization(0, 1.0);
  const hot = simulateNO2Dimerization(80, 1.0);
  assert.strictEqual(hot.fractionNO2 > cold.fractionNO2, true);
  assert.ok(hot.dominantSpeciesVi.includes('NO2'));
});

test('Cooling to ice temperature shifts equilibrium towards colorless N2O4', () => {
  const ice = simulateNO2Dimerization(-5, 1.0);
  assert.strictEqual(ice.fractionN2O4 > 0.8, true);
  assert.ok(ice.dominantSpeciesVi.includes('N2O4'));
});

test('Increasing pressure shifts equilibrium towards fewer moles of gas (N2O4)', () => {
  const p1 = simulateNO2Dimerization(25, 1.0);
  const p5 = simulateNO2Dimerization(25, 5.0);
  assert.strictEqual(p5.fractionN2O4 > p1.fractionN2O4, true);
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed} TESTS PASSED`);
console.log(' TEST SUITE 198 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
