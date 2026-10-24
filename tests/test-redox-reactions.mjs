// tests/test-redox-reactions.mjs
// Test Suite 196: Redox Reactions, Oxidation States, Electron Balancing & Permanganate Mediums
import assert from 'assert';
import {
  OXIDATION_STATE_CATALOG,
  REDOX_PRESETS,
  PERMANGANATE_MEDIA,
  simulatePermanganateTitration,
  verifyElectronBalance
} from '../src/domain/redoxReactionsEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 196: REDOX REACTIONS & ELECTRON BALANCING');
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

// 1. Oxidation State Catalog Tests
test('Catalog contains 10 key compounds and polyatomic ions', () => {
  assert.strictEqual(OXIDATION_STATE_CATALOG.length >= 10, true);
});

test('KMnO4 has Mn in +7 maximum oxidation state', () => {
  const kmno4 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'KMnO4');
  assert.ok(kmno4);
  const mn = kmno4.elements.find(e => e.symbol === 'Mn');
  assert.strictEqual(mn.oxidationState, 7);
});

test('K2Cr2O7 has Cr in +6 oxidation state with orange color notes', () => {
  const k2cr2o7 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'K2Cr2O7');
  assert.ok(k2cr2o7);
  const cr = k2cr2o7.elements.find(e => e.symbol === 'Cr');
  assert.strictEqual(cr.oxidationState, 6);
});

test('Hydrogen peroxide H2O2 has Oxygen in unusual -1 oxidation state', () => {
  const h2o2 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'H2O2');
  assert.ok(h2o2);
  const o = h2o2.elements.find(e => e.symbol === 'O');
  assert.strictEqual(o.oxidationState, -1);
});

test('Oxygen difluoride OF2 has Oxygen in positive +2 state due to F electronegativity', () => {
  const of2 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'OF2');
  assert.ok(of2);
  const o = of2.elements.find(e => e.symbol === 'O');
  assert.strictEqual(o.oxidationState, 2);
  const f = of2.elements.find(e => e.symbol === 'F');
  assert.strictEqual(f.oxidationState, -1);
});

test('Sodium hydride NaH has Hydrogen in negative -1 state', () => {
  const nah = OXIDATION_STATE_CATALOG.find(c => c.formula === 'NaH');
  assert.ok(nah);
  const h = nah.elements.find(e => e.symbol === 'H');
  assert.strictEqual(h.oxidationState, -1);
});

test('Fe3O4 has fractional average oxidation state +8/3', () => {
  const fe3o4 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'Fe3O4');
  assert.ok(fe3o4);
  const fe = fe3o4.elements.find(e => e.symbol === 'Fe');
  assert.strictEqual(Number(fe.oxidationState.toFixed(2)), 2.67);
});

test('Iron pyrite FeS2 has sulfur in -1 state in disulfide anion', () => {
  const fes2 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'FeS2');
  assert.ok(fes2);
  const s = fes2.elements.find(e => e.symbol === 'S');
  assert.strictEqual(s.oxidationState, -1);
});

test('Polyatomic ions (MnO4-, Cr2O7^2-, NH4+) sum to ion charges', () => {
  const mno4 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'MnO4-');
  assert.strictEqual(mno4.charge, -1);
  const sumMno4 = mno4.elements.reduce((acc, el) => acc + el.oxidationState * el.count, 0);
  assert.strictEqual(sumMno4, -1);

  const cr2o7 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'Cr2O7^2-');
  assert.strictEqual(cr2o7.charge, -2);
  const sumCr2o7 = cr2o7.elements.reduce((acc, el) => acc + el.oxidationState * el.count, 0);
  assert.strictEqual(sumCr2o7, -2);

  const nh4 = OXIDATION_STATE_CATALOG.find(c => c.formula === 'NH4+');
  assert.strictEqual(nh4.charge, 1);
  const sumNh4 = nh4.elements.reduce((acc, el) => acc + el.oxidationState * el.count, 0);
  assert.strictEqual(sumNh4, 1);
});

// 2. Redox Presets and Classification Tests
test('Redox presets contain all 4 GDPT 2018 classification types', () => {
  const types = new Set(REDOX_PRESETS.map(p => p.type));
  assert.ok(types.has('INTERMOLECULAR'));
  assert.ok(types.has('INTRAMOLECULAR'));
  assert.ok(types.has('DISPROPORTIONATION'));
  assert.ok(types.has('COMPROPORTIONATION'));
});

test('Every redox preset satisfies strict electron conservation (donated == accepted)', () => {
  for (const preset of REDOX_PRESETS) {
    const res = verifyElectronBalance(preset);
    assert.strictEqual(res.isBalanced, true, `Preset ${preset.id} failed electron balance`);
    assert.strictEqual(res.totalDonated, res.totalAccepted);
    assert.strictEqual(res.totalDonated, preset.totalElectronsTransferred);
  }
});

test('Thermal decomposition of KMnO4 is intramolecular redox producing O2', () => {
  const thermal = REDOX_PRESETS.find(p => p.id === 'KMNO4_DECOMPOSITION_INTRAMOLECULAR');
  assert.ok(thermal);
  assert.strictEqual(thermal.type, 'INTRAMOLECULAR');
  assert.strictEqual(thermal.oxidationHalf.speciesFinal, 'O2(0)');
  assert.strictEqual(thermal.totalElectronsTransferred, 4);
});

test('Chlorine in NaOH is disproportionation producing Javel water (NaCl + NaClO)', () => {
  const cl2 = REDOX_PRESETS.find(p => p.id === 'CL2_NAOH_DISPROPORTIONATION');
  assert.ok(cl2);
  assert.strictEqual(cl2.type, 'DISPROPORTIONATION');
  assert.strictEqual(cl2.oxidationHalf.finalOxidationState, 1);
  assert.strictEqual(cl2.reductionHalf.finalOxidationState, -1);
});

test('H2S + SO2 is comproportionation producing elemental sulfur', () => {
  const claus = REDOX_PRESETS.find(p => p.id === 'H2S_SO2_COMPROPORTIONATION');
  assert.ok(claus);
  assert.strictEqual(claus.type, 'COMPROPORTIONATION');
  assert.strictEqual(claus.oxidationHalf.finalOxidationState, 0);
  assert.strictEqual(claus.reductionHalf.finalOxidationState, 0);
});

// 3. Medium-Dependent Permanganate Tests
test('Permanganate reduction changes depending on Acidic, Neutral, and Basic media', () => {
  assert.strictEqual(PERMANGANATE_MEDIA.length, 3);
  
  const acidic = PERMANGANATE_MEDIA.find(m => m.medium === 'ACIDIC');
  assert.strictEqual(acidic.electronsReceived, 5);
  assert.strictEqual(acidic.finalSpecies, 'Mn^2+');
  assert.strictEqual(acidic.finalOxidationState, 2);

  const neutral = PERMANGANATE_MEDIA.find(m => m.medium === 'NEUTRAL');
  assert.strictEqual(neutral.electronsReceived, 3);
  assert.strictEqual(neutral.finalSpecies, 'MnO2 (rắn)');
  assert.strictEqual(neutral.finalOxidationState, 4);

  const basic = PERMANGANATE_MEDIA.find(m => m.medium === 'BASIC');
  assert.strictEqual(basic.electronsReceived, 1);
  assert.strictEqual(basic.finalSpecies, 'MnO4^2- (ion manganate)');
  assert.strictEqual(basic.finalOxidationState, 6);
});

// 4. Permanganate Redox Titration Tests
test('KMnO4 vs FeSO4 titration calculates equivalence volume correctly (20.0 mL)', () => {
  // cFe = 0.1 M, vFe = 20 mL, cKMnO4 = 0.02 M
  // V_eq = (0.1 * 20) / (5 * 0.02) = 2.0 / 0.1 = 20.0 mL
  const pre = simulatePermanganateTitration(0.10, 20.0, 0.02, 0.0);
  assert.strictEqual(pre.equivalenceVolume, 20.0);
  assert.strictEqual(pre.isEquivalenceReached, false);
  assert.strictEqual(pre.fe2RemainingMoles, 0.002);

  const half = simulatePermanganateTitration(0.10, 20.0, 0.02, 10.0);
  assert.strictEqual(half.isEquivalenceReached, false);
  assert.strictEqual(half.fe2RemainingMoles, 0.001);

  const eq = simulatePermanganateTitration(0.10, 20.0, 0.02, 20.0);
  assert.strictEqual(eq.isEquivalenceReached, true);
  assert.strictEqual(eq.fe2RemainingMoles, 0);
  assert.ok(eq.statusVi.includes('ĐẠT ĐIỂM TƯƠNG ĐƯƠNG'));

  const over = simulatePermanganateTitration(0.10, 20.0, 0.02, 21.0);
  assert.strictEqual(over.isOverTitrated, true);
  assert.ok(over.excessKMnO4Moles > 0);
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed} TESTS PASSED`);
console.log(' TEST SUITE 196 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
