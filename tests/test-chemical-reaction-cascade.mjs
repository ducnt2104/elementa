// test-chemical-reaction-cascade.mjs
// Automated Verification Suite for ELEMENTA Sequential Reaction Cascade Engine
// Conforming to Vietnam GDPT 2018 Chemistry Standards & IUPAC Physical Chemistry

import assert from 'assert';
import { defaultReactionEngine, ReactionEngine } from '../src/domain/reactionEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 44: SEQUENTIAL CHEMICAL REACTION CASCADE AUDIT    ');
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

const engine = new ReactionEngine();

// --- 1. Two-Step Alkaline Neutralization Cascade ---
console.log('--- 1. Two-Step Alkali Metal & Acid Neutralization Cascade (KHTN 8/9) ---');

it('Executes 2-step cascade: 2Na + 2H2O -> 2NaOH + H2, then NaOH + HCl -> NaCl + H2O', () => {
  // Initial inventory: 2 Na, 2 H2O, 2 HCl
  const initial = { 'Na': 2, 'H2O': 2, 'HCl': 2 };
  const cascade = engine.evaluateReactionCascade(initial, ['MOISTURE_H2O', 'ACID_DILUTE']);

  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.strictEqual(cascade.totalReactionsTriggered, 2);
  assert.strictEqual(cascade.steps.length, 2);

  // Step 1: Na + H2O -> NaOH + H2
  const step1 = cascade.steps[0];
  assert.strictEqual(step1.stepIndex, 1);
  assert.strictEqual(step1.reaction.ruleCode, 'R01_NA');
  assert.strictEqual(step1.producedDelta.some(p => p.formula === 'NaOH' && p.count === 2), true);
  assert.strictEqual(step1.producedDelta.some(p => p.formula === 'H2' && p.count === 1), true);

  // Step 2: NaOH + HCl -> NaCl + H2O
  const step2 = cascade.steps[1];
  assert.strictEqual(step2.stepIndex, 2);
  assert.ok(step2.reaction.ruleCode === 'R03_NEUTRALIZE' || step2.reaction.ruleCode === 'R04_HCL_NAOH');
  assert.strictEqual(step2.producedDelta.some(p => p.formula === 'NaCl' && p.count === 2), true);

  // Final inventory must contain produced NaCl (2) and H2 (1)
  assert.strictEqual(cascade.finalInventory['NaCl'], 2);
  assert.strictEqual(cascade.finalInventory['H2'], 1);
  // All elemental Na was consumed
  assert.strictEqual(cascade.finalInventory['Na'] || 0, 0);
  assert.ok(cascade.summaryVI.includes('2 bước thành công'));
});

// --- 2. Industrial Haber-Bosch to Ammonium Chloride Smoke Cascade ---
console.log('\n--- 2. Haber-Bosch to Ammonium Salt White Smoke Cascade (Hóa 11) ---');

it('Executes Haber synthesis followed by white smoke acid-base addition: N2 + 3H2 -> 2NH3, then NH3 + HCl -> NH4Cl', () => {
  // Initial: 1 N2, 3 H2, 2 HCl with high temp for Haber synthesis
  const initial = { 'N2': 1, 'H2': 3, 'HCl': 2 };
  const cascade = engine.evaluateReactionCascade(initial, ['HIGH_TEMP', 'ACID_DILUTE']);

  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.strictEqual(cascade.totalReactionsTriggered, 2);

  // Check that 2 units of NH4Cl were produced
  const nh4cl = cascade.netProductsProduced.find(p => p.formula === 'NH4Cl');
  assert.ok(nh4cl !== undefined, 'NH4Cl must be in net products');
  assert.strictEqual(nh4cl.count, 2, 'Must yield exactly 2 NH4Cl');

  // Reactants N2 and H2 fully consumed
  assert.strictEqual(cascade.finalInventory['N2'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['H2'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['HCl'] || 0, 0);
});

// --- 3. Industrial Sulfuric Acid Cascade ---
console.log('\n--- 3. Industrial Contact Process Cascade (S -> SO2 -> SO3 -> H2SO4) (Hóa 10) ---');

it('Executes 3-stage Sulfuric Acid manufacture cascade: S -> SO2 -> SO3 -> H2SO4', () => {
  // Stage 1: 2 S + 2 O2 -> 2 SO2
  // Stage 2: 2 SO2 + 1 O2 -> 2 SO3
  // Stage 3: 2 SO3 + 2 H2O -> 2 H2SO4
  // Total initial needed: 2 S, 3 O2, 2 H2O
  const initial = { 'S': 2, 'O2': 3, 'H2O': 2 };
  const cascade = engine.evaluateReactionCascade(initial, ['OXYGEN_GAS', 'HIGH_TEMP', 'MOISTURE_H2O']);

  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.strictEqual(cascade.totalReactionsTriggered, 3);

  // Final inventory must yield 2 units of H2SO4
  assert.strictEqual(cascade.finalInventory['H2SO4'], 2);
  assert.strictEqual(cascade.finalInventory['S'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['O2'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['H2O'] || 0, 0);
});

// --- 4. Cognitive Trap Interruption Guardrail ---
console.log('\n--- 4. Cognitive Trap Interruption & Pedagogical Safety ---');

it('Halts cascade immediately if unfeasible cognitive trap pair is encountered', () => {
  // Initial contains Cu and dilute HCl (Standard GDPT 2018 Cognitive Trap: E° = +0.34V > 0)
  const initial = { 'Cu': 1, 'HCl': 2 };
  const cascade = engine.evaluateReactionCascade(initial, ['ACID_DILUTE']);

  assert.strictEqual(cascade.hasTrapsEncountered, true);
  assert.ok(cascade.trapDetails !== undefined);
  assert.ok(cascade.trapDetails.ruleCode.includes('TRAP') || cascade.trapDetails.ruleCode === 'R06_TRAP_CU_ACID');
  assert.strictEqual(cascade.steps.length, 0, 'Zero steps should execute past the trap');
  assert.ok(cascade.trapDetails.message.includes('BẪY') || cascade.trapDetails.message.includes('Cu'));
});

// --- 5. Partial Cascade & Unconsumed Remainder ---
console.log('\n--- 5. Incomplete Reactant Remainder & Partial Cascade ---');

it('Correctly preserves unconsumed reactants when intermediate step lacks second reactant', () => {
  // 2 Na + 2 H2O -> 2 NaOH + H2, but only 1 HCl is provided (insufficient for 2 NaOH)
  const initial = { 'Na': 2, 'H2O': 2, 'HCl': 1 };
  const cascade = engine.evaluateReactionCascade(initial, ['MOISTURE_H2O', 'ACID_DILUTE']);

  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.strictEqual(cascade.totalReactionsTriggered, 2);

  // Step 2 can only neutralize 1 unit of NaOH
  assert.strictEqual(cascade.finalInventory['NaCl'], 1);
  assert.strictEqual(cascade.finalInventory['NaOH'], 1); // 1 unneutralized NaOH remains
  assert.strictEqual(cascade.finalInventory['HCl'] || 0, 0); // HCl completely consumed
});

// --- 6. Empty / Inactive Inventory Boundary ---
console.log('\n--- 6. Empty or Inert Inventory Boundaries ---');

it('Returns graceful zero-reaction result when given empty inventory', () => {
  const cascade = engine.evaluateReactionCascade({});
  assert.strictEqual(cascade.totalReactionsTriggered, 0);
  assert.strictEqual(cascade.steps.length, 0);
  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.ok(cascade.summaryVI.includes('Không có chuỗi'));
});

// --- 7. Thermite to Metal Chloride Cascade ---
console.log('\n--- 7. Thermite Pyrometallurgy & Halogenation Cascade (Hóa 10/12) ---');

it('Executes Thermite reduction followed by halogenation: 2Al + Fe2O3 -> Al2O3 + 2Fe, then 2Fe + 3Cl2 -> 2FeCl3', () => {
  // Initial: 2 Al, 1 Fe2O3, 3 Cl2
  const initial = { 'Al': 2, 'Fe2O3': 1, 'Cl2': 3 };
  const cascade = engine.evaluateReactionCascade(initial, ['HIGH_TEMP']);

  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.strictEqual(cascade.totalReactionsTriggered, 2);

  // Check step 1 (Thermite) and step 2 (Fe + Cl2)
  assert.strictEqual(cascade.finalInventory['Al2O3'], 1);
  assert.strictEqual(cascade.finalInventory['FeCl3'], 2);
  assert.strictEqual(cascade.finalInventory['Al'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['Fe2O3'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['Cl2'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['Fe'] || 0, 0); // Fe generated in step 1 was fully chlorinated
});

// --- 8. Organic Synthesis to Saponification Cycle ---
console.log('\n--- 8. Organic Ester Saponification to Alkene Cascade (Hóa 12) ---');

it('Executes Ester Saponification followed by ethanol dehydration: CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH, then C2H5OH -> C2H4 + H2O', () => {
  // Initial: 1 CH3COOC2H5, 1 NaOH
  const initial = { 'CH3COOC2H5': 1, 'NaOH': 1 };
  const cascade = engine.evaluateReactionCascade(initial, ['BASE_ALKALINE', 'HIGH_TEMP']);

  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.strictEqual(cascade.totalReactionsTriggered, 2);

  // Products: CH3COONa (1), C2H4 (1), H2O (1)
  assert.strictEqual(cascade.finalInventory['CH3COONa'], 1);
  assert.strictEqual(cascade.finalInventory['C2H4'], 1);
  assert.strictEqual(cascade.finalInventory['H2O'], 1);
  assert.strictEqual(cascade.finalInventory['CH3COOC2H5'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['NaOH'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['C2H5OH'] || 0, 0);
});

// --- 9. Glucose Fermentation to Ethylene Alkene Cascade ---
console.log('\n--- 9. Biomass Fermentation to Industrial Alkene Cascade (Hóa 11/12) ---');

it('Executes Glucose fermentation followed by ethanol dehydration: C6H12O6 -> 2C2H5OH + 2CO2, then 2C2H5OH -> 2C2H4 + 2H2O', () => {
  // Initial: 1 Glucose C6H12O6
  const initial = { 'C6H12O6': 1 };
  const cascade = engine.evaluateReactionCascade(initial, ['MOISTURE_H2O', 'HIGH_TEMP']);

  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.strictEqual(cascade.totalReactionsTriggered, 2);

  // Final inventory: 2 C2H4 (ethylene), 2 CO2, 2 H2O
  assert.strictEqual(cascade.finalInventory['C2H4'], 2);
  assert.strictEqual(cascade.finalInventory['CO2'], 2);
  assert.strictEqual(cascade.finalInventory['H2O'], 2);
  assert.strictEqual(cascade.finalInventory['C6H12O6'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['C2H5OH'] || 0, 0);
});

// --- 10. Multi-Yield Batch Scaling & Conservation of Mass Invariant ---
console.log('\n--- 10. High-Yield Stoichiometric Batch Scaling ---');

it('Scales multi-reaction cascade accurately for 10x industrial batch scale', () => {
  // 10x batch: 20 Na + 20 H2O + 20 HCl
  const initial = { 'Na': 20, 'H2O': 20, 'HCl': 20 };
  const cascade = engine.evaluateReactionCascade(initial, ['MOISTURE_H2O', 'ACID_DILUTE']);

  assert.strictEqual(cascade.hasTrapsEncountered, false);
  assert.strictEqual(cascade.totalReactionsTriggered, 2);
  assert.strictEqual(cascade.finalInventory['NaCl'], 20);
  assert.strictEqual(cascade.finalInventory['H2'], 10);
  assert.strictEqual(cascade.finalInventory['Na'] || 0, 0);
  assert.strictEqual(cascade.finalInventory['HCl'] || 0, 0);
});

// --- Summary ---
console.log('\n======================================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('======================================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
