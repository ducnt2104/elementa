// test-chemical-equilibrium-lechatelier.mjs
// Automated Verification Suite for Chemical Equilibrium & Le Chatelier's Principle Engine
// Conforming to Vietnam GDPT 2018 Grade 11 Chemistry & IUPAC Physical Chemistry

import assert from 'assert';
import {
  EquilibriumEngine,
  CURRICULUM_EQUILIBRIUM_REACTIONS
} from '../src/domain/equilibriumEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 67: CHEMICAL EQUILIBRIUM & LE CHATELIER AUDIT    ');
console.log('======================================================================\n');

let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(err);
    failed++;
  }
}

// --- 1. Reaction Quotient (Qc) Calculation & Heterogeneous Phase Invariance ---
console.log('--- 1. Reaction Quotient (Qc) & IUPAC Heterogeneous Phase Invariant ---');

it('Calculates Qc accurately for Haber-Bosch: Qc = [NH3]^2 / ([N2] * [H2]^3)', () => {
  const haber = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_haber_bosch');
  assert.ok(haber !== undefined);

  // [N2] = 2.0, [H2] = 1.0, [NH3] = 4.0
  // Qc = 4^2 / (2 * 1^3) = 16 / 2 = 8.0
  const Qc = EquilibriumEngine.calculateReactionQuotient(haber, {
    'N2': 2.0,
    'H2': 1.0,
    'NH3': 4.0
  });

  assert.strictEqual(Qc, 8.0);
});

it('Excludes solids (phase s) from Qc expression (e.g. CaCO3 -> CaO + CO2)', () => {
  const caco3 = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_caco3_calcination');
  assert.ok(caco3 !== undefined);

  // Even if user provides arbitrary amounts of solid CaCO3 and CaO, Qc must depend ONLY on [CO2]!
  const Qc = EquilibriumEngine.calculateReactionQuotient(caco3, {
    'CaCO3': 500.0,
    'CaO': 250.0,
    'CO2': 0.05
  });

  assert.strictEqual(Qc, 0.05);
});

// --- 2. Van \'t Hoff Temperature Adjustment on Equilibrium Constant Kc ---
console.log('\n--- 2. Van \'t Hoff Temperature Adjustment on Kc ---');

it('Decreases Kc with increasing temperature for Exothermic reactions (DeltaH < 0)', () => {
  const no2 = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_no2_dimerization');
  assert.ok(no2 !== undefined);
  assert.strictEqual(no2.isExothermic, true);

  const kc_298 = no2.standardKc; // 170 at 298 K
  // Heat up to 373.15 K (100 °C)
  const kc_373 = EquilibriumEngine.calculateKcAtTemperature(kc_298, no2.delta_r_H298_kJ, 373.15);

  assert.ok(kc_373 < kc_298, 'Kc must decrease as temperature rises for exothermic reaction');
});

it('Increases Kc with increasing temperature for Endothermic reactions (DeltaH > 0)', () => {
  const caco3 = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_caco3_calcination');
  assert.ok(caco3 !== undefined);
  assert.strictEqual(caco3.isExothermic, false);

  const kc_298 = caco3.standardKc;
  // Heat up to 1200 K (~927 °C industrial lime kiln)
  const kc_1200 = EquilibriumEngine.calculateKcAtTemperature(kc_298, caco3.delta_r_H298_kJ, 1200);

  assert.ok(kc_1200 > kc_298, 'Kc must drastically increase at 1200 K for lime calcination');
  assert.ok(kc_1200 > 0.1, 'At 1200 K, CO2 decomposition pressure must be substantial');
});

// --- 3. Le Chatelier Concentration Perturbation ---
console.log('\n--- 3. Le Chatelier Concentration Perturbation ---');

it('Shifts equilibrium FORWARD when adding reactant (e.g. adding N2 or H2)', () => {
  const haber = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_haber_bosch');
  const res = EquilibriumEngine.simulatePerturbation(haber, {
    type: 'CONCENTRATION',
    species: 'N2',
    deltaConcentration: 2.0
  });

  assert.strictEqual(res.shiftDirection, 'FORWARD');
  assert.strictEqual(res.kcChanged, false);
  assert.ok(res.explanationVI.includes('chiều thuận'));
});

it('Shifts equilibrium FORWARD when removing product (e.g. condensing NH3 or removing ester)', () => {
  const haber = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_haber_bosch');
  const res = EquilibriumEngine.simulatePerturbation(haber, {
    type: 'CONCENTRATION',
    species: 'NH3',
    deltaConcentration: -1.5
  });

  assert.strictEqual(res.shiftDirection, 'FORWARD');
  assert.strictEqual(res.kcChanged, false);
});

it('Shifts equilibrium REVERSE when adding product (e.g. adding N2O4)', () => {
  const no2 = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_no2_dimerization');
  const res = EquilibriumEngine.simulatePerturbation(no2, {
    type: 'CONCENTRATION',
    species: 'N2O4',
    deltaConcentration: 1.0
  });

  assert.strictEqual(res.shiftDirection, 'REVERSE');
  assert.strictEqual(res.kcChanged, false);
});

// --- 4. Le Chatelier Pressure & Volume Perturbation ---
console.log('\n--- 4. Le Chatelier Pressure & Gas Mole Delta (Delta_n_g) ---');

it('Shifts FORWARD when pressure increases for Delta_n_g < 0 (Haber-Bosch: 4 mol gas -> 2 mol gas)', () => {
  const haber = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_haber_bosch');
  assert.strictEqual(haber.delta_n_gas, -2);

  const res = EquilibriumEngine.simulatePerturbation(haber, {
    type: 'PRESSURE',
    deltaPressureAtm: 100.0 // 100 atm industrial pressure
  });

  assert.strictEqual(res.shiftDirection, 'FORWARD');
  assert.strictEqual(res.kcChanged, false);
  assert.ok(res.explanationVI.includes('số mol khí ít hơn'), 'Must explain shift toward fewer gas moles');
});

it('Does NOT shift equilibrium when pressure changes for Delta_n_g = 0 (HI synthesis: H2 + I2 -> 2HI)', () => {
  const hi = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_hi_synthesis');
  assert.strictEqual(hi.delta_n_gas, 0);

  const res = EquilibriumEngine.simulatePerturbation(hi, {
    type: 'PRESSURE',
    deltaPressureAtm: 50.0
  });

  assert.strictEqual(res.shiftDirection, 'EQUILIBRIUM');
  assert.strictEqual(res.shiftDirectionVI, 'KHÔNG CHUYỂN DỊCH');
  assert.strictEqual(res.kcChanged, false);
});

// --- 5. Catalyst Invariance Principle (GDPT 2018 Core Concept) ---
console.log('\n--- 5. Catalyst Invariance Principle ---');

it('Preserves equilibrium and Kc unchanged when catalyst is added (speeds up both rates equally)', () => {
  const contact = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_contact_so3');
  const res = EquilibriumEngine.simulatePerturbation(contact, {
    type: 'CATALYST'
  });

  assert.strictEqual(res.shiftDirection, 'EQUILIBRIUM');
  assert.strictEqual(res.kcChanged, false);
  assert.ok(res.explanationVI.includes('KHÔNG làm chuyển dịch'));
});

// --- 6. End-to-End State Evaluation & Gameplay Buff Integration ---
console.log('\n--- 6. End-to-End Evaluation & Tactical Gameplay Modifiers ---');

it('Evaluates NO2/N2O4 color equilibrium and awards tactical forward surge when cooling down', () => {
  const no2 = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_no2_dimerization');
  // At 273.15 K (0 °C ice water bath), Kc increases, Qc is lower than Kc -> forward shift
  const evalState = EquilibriumEngine.evaluateEquilibriumState(
    no2,
    { 'NO2': 1.0, 'N2O4': 50.0 }, // Qc = 50 / 1^2 = 50
    273.15, // 0 °C
    1.0
  );

  assert.strictEqual(evalState.shiftDirection, 'FORWARD');
  assert.strictEqual(evalState.gameplayModifier.statusEffect, 'EQUILIBRIUM_FORWARD_SURGE');
  assert.ok(evalState.gameplayModifier.manaRegenDeltaPct > 0);
  assert.ok(evalState.leChatelierAnalysisVI.some(l => l.includes('Hạ nhiệt độ')));
});

console.log('\n======================================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('======================================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
