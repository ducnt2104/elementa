// tests/test-chemical-energetics.mjs
/**
 * ELEMENTA — Test Suite 190: Chemical Energetics & Hess's Law Domain Engine
 * Conforms to GDPT 2018 Chemistry Grade 10 (Chủ đề 5: Năng lượng hóa học) & IUPAC Standards
 */

import assert from 'assert';
import {
  SUBSTANCE_ENTHALPY_CATALOG,
  BOND_ENERGY_CATALOG,
  calculateEnthalpyFromFormation,
  calculateEnthalpyFromBondEnergies,
  simulateCalorimeterTemperature,
  simulateHessLawCycle
} from '../src/domain/chemicalEnergeticsEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 190: CHEMICAL ENERGETICS DOMAIN ENGINE');
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

// 1. Substance Enthalpy Catalog & Standard States
test('Catalog contains elements in standard reference state with Δf H°298 ≡ 0', () => {
  const o2 = SUBSTANCE_ENTHALPY_CATALOG['O2(g)'];
  const n2 = SUBSTANCE_ENTHALPY_CATALOG['N2(g)'];
  const h2 = SUBSTANCE_ENTHALPY_CATALOG['H2(g)'];
  const cGraphite = SUBSTANCE_ENTHALPY_CATALOG['C(graphite)'];
  const fe = SUBSTANCE_ENTHALPY_CATALOG['Fe(s)'];
  const br2Liq = SUBSTANCE_ENTHALPY_CATALOG['Br2(l)'];

  assert.strictEqual(o2.deltaHf298KjMol, 0);
  assert.strictEqual(n2.deltaHf298KjMol, 0);
  assert.strictEqual(h2.deltaHf298KjMol, 0);
  assert.strictEqual(cGraphite.deltaHf298KjMol, 0);
  assert.strictEqual(fe.deltaHf298KjMol, 0);
  assert.strictEqual(br2Liq.deltaHf298KjMol, 0);
});

test('Non-reference allotropes have non-zero standard formation enthalpies', () => {
  const diamond = SUBSTANCE_ENTHALPY_CATALOG['C(diamond)'];
  const ozone = SUBSTANCE_ENTHALPY_CATALOG['O3(g)'];
  assert.strictEqual(diamond.deltaHf298KjMol, 1.9);
  assert.strictEqual(ozone.deltaHf298KjMol, 142.7);
});

// 2. Reaction Enthalpy from Standard Formation Enthalpies
test('Methane combustion Δr H°298 is calculated accurately as -890.3 kJ (Exothermic)', () => {
  const res = calculateEnthalpyFromFormation(
    [{ key: 'CH4(g)', coeff: 1 }, { key: 'O2(g)', coeff: 2 }],
    [{ key: 'CO2(g)', coeff: 1 }, { key: 'H2O(l)', coeff: 2 }],
    'Đốt cháy hoàn toàn khí metan',
    'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)'
  );
  // Δr H = [-393.5 + 2*(-285.8)] - [-74.8 + 2*(0)] = -965.1 - (-74.8) = -890.3 kJ
  assert.strictEqual(res.deltaRH298Kj, -890.3);
  assert.strictEqual(res.isExothermic, true);
  assert.ok(res.thermodynamicNatureVi.includes('tỏa nhiệt'));
  assert.strictEqual(res.calculationMethod, 'FORMATION_ENTHALPIES');
});

test('Limestone thermal decomposition Δr H°298 is calculated as +178.3 kJ (Endothermic)', () => {
  const res = calculateEnthalpyFromFormation(
    [{ key: 'CaCO3(s)', coeff: 1 }],
    [{ key: 'CaO(s)', coeff: 1 }, { key: 'CO2(g)', coeff: 1 }],
    'Nhiệt phân đá vôi',
    'CaCO3(s) -> CaO(s) + CO2(g)'
  );
  // Δr H = [-635.1 + (-393.5)] - [-1206.9] = -1028.6 - (-1206.9) = +178.3 kJ
  assert.strictEqual(res.deltaRH298Kj, 178.3);
  assert.strictEqual(res.isExothermic, false);
  assert.ok(res.thermodynamicNatureVi.includes('thu nhiệt'));
});

// 3. Reaction Enthalpy from Bond Dissociation Energies
test('H2 + Cl2 -> 2HCl reaction enthalpy from bond energies is -183.0 kJ', () => {
  const res = calculateEnthalpyFromBondEnergies(
    [{ bondKey: 'H-H', count: 1 }, { bondKey: 'Cl-Cl', count: 1 }],
    [{ bondKey: 'H-Cl', count: 2 }],
    'Phản ứng tổng hợp khí hiđro clorua',
    'H2(g) + Cl2(g) -> 2HCl(g)'
  );
  // Broken = 436 + 243 = 679 kJ
  // Formed = 2 * 431 = 862 kJ
  // Δr H = 679 - 862 = -183 kJ
  assert.strictEqual(res.deltaRH298Kj, -183.0);
  assert.strictEqual(res.isExothermic, true);
  assert.ok(res.stepByStepBreakdownVi.includes('679 - 862 = -183 kJ'));
});

test('Bond energy calculation is restricted to gas phase reactions per IUPAC', () => {
  const res = calculateEnthalpyFromBondEnergies(
    [{ bondKey: 'H-H', count: 1 }, { bondKey: 'Cl-Cl', count: 1 }],
    [{ bondKey: 'H-Cl', count: 2 }],
    'Test gas phase constraint',
    'H2(g) + Cl2(g) -> 2HCl(g)'
  );
  assert.ok(res.safetyOrRealWorldApplicationVi.includes('thể khí (gas)'));
});

// 4. Calorimeter Simulation (q = mcΔT)
test('Exothermic reaction in calorimeter raises water temperature (ΔT > 0)', () => {
  const sim = simulateCalorimeterTemperature(-890.3, 0.01, 100.0, 25.0);
  assert.strictEqual(sim.isHeating, true);
  assert.ok(sim.deltaTempC > 20.0); // ~21.28°C
  assert.ok(sim.finalTempC > 45.0); // ~46.28°C
  assert.ok(sim.explanationVi.includes('tăng'));
});

test('Endothermic reaction in calorimeter lowers water temperature (ΔT < 0)', () => {
  const sim = simulateCalorimeterTemperature(178.3, 0.02, 100.0, 25.0);
  assert.strictEqual(sim.isHeating, false);
  assert.ok(sim.deltaTempC < 0);
  assert.ok(sim.finalTempC < 25.0);
  assert.ok(sim.explanationVi.includes('hạ'));
});

// 5. Hess\'s Law Thermochemical Cycle
test('CO synthesis Hess cycle accurately combines C combustion and CO oxidation (-110.5 kJ/mol)', () => {
  const hess = simulateHessLawCycle('CO_SYNTHESIS');
  assert.strictEqual(hess.calculatedDeltaRH298Kj, -110.5);
  assert.strictEqual(hess.steps.length, 2);
  const step2 = hess.steps.find(s => s.isReversed);
  assert.ok(step2);
  assert.strictEqual(step2.deltaHKj, 283.0);
  assert.ok(hess.pathIndependenceNoteVi.includes('không phụ thuộc vào con đường'));
});

test('NO2 synthesis Hess cycle accurately sums 2-step oxidation (+33.2 kJ/mol)', () => {
  const hess = simulateHessLawCycle('NO2_SYNTHESIS');
  assert.strictEqual(hess.calculatedDeltaRH298Kj, 33.2);
  assert.strictEqual(hess.steps.length, 2);
  assert.strictEqual(hess.steps[0].deltaHKj, 90.3);
  assert.strictEqual(hess.steps[1].deltaHKj, -57.1);
});

test('C2H2 hydrogenation Hess cycle sums acetylene and ethylene steps (-312.1 kJ/mol)', () => {
  const hess = simulateHessLawCycle('C2H2_HYDROGENATION');
  assert.strictEqual(hess.calculatedDeltaRH298Kj, -312.1);
  assert.strictEqual(hess.steps[0].deltaHKj, -175.0);
  assert.strictEqual(hess.steps[1].deltaHKj, -137.1);
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / 11 TESTS PASSED`);
console.log(' TEST SUITE 190 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
