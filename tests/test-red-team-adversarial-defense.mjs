// test-red-team-adversarial-defense.mjs
// Test Suite 71: Red Team Adversarial Defense & Scientific Board Evaluation
// Formatted under 'critical-project-reviewer' & 'competition-strategy-submission-expert' guidelines
// Rigorous verification of edge cases, boundary conditions, malicious payloads, and physical limits.

import assert from 'node:assert';
import { DuelEngine } from '../src/domain/duelEngine.ts';
import {
  ChemicalEnvironmentEngine
} from '../src/domain/chemicalEnvironment.ts';
import {
  EquilibriumEngine,
  CURRICULUM_EQUILIBRIUM_REACTIONS
} from '../src/domain/equilibriumEngine.ts';
import {
  ReactionEngine,
  normalizeFormulaKey,
  parseChemicalEquation
} from '../src/domain/reactionEngine.ts';
import {
  normalizeChemicalFormula,
  parseFormulaAtoms
} from '../src/domain/equationBalancer.ts';

console.log('======================================================================');
console.log('   TEST SUITE 71: RED TEAM ADVERSARIAL DEFENSE & DEFENSE SIMULATION   ');
console.log('   Academic Integrity: IUPAC Physical Chemistry & Vietnam GDPT 2018    ');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  [PASS] #${totalTests}: ${name}`);
  } catch (err) {
    console.error(`  [FAIL] #${totalTests}: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ----------------------------------------------------------------------
// 1. THERMOCHEMICAL REVERSIBILITY & BOUNDARY SINGULARITIES (IUPAC Physical Chem)
// ----------------------------------------------------------------------
console.log('--- 1. THERMOCHEMICAL REVERSIBILITY & BOUNDARY SINGULARITIES ---');

runTest('EquilibriumEngine rejects temperature <= 0 K with descriptive error', () => {
  assert.throws(() => {
    EquilibriumEngine.calculateKcAtTemperature(100, -50, 0);
  }, /Nhiệt độ Kelvin phải lớn hơn 0 K/);

  assert.throws(() => {
    EquilibriumEngine.calculateKcAtTemperature(100, -50, -273.15);
  }, /Nhiệt độ Kelvin phải lớn hơn 0 K/);
});

runTest('EquilibriumEngine exponent clamping prevents NaN or crash at extreme T', () => {
  // Extreme high temp (50,000 K)
  const kcExtHigh = EquilibriumEngine.calculateKcAtTemperature(1.0, -200, 50000);
  assert.ok(Number.isFinite(kcExtHigh) && kcExtHigh > 0, 'Kc at 50,000 K must be positive finite');

  // Extreme cryogenic temp (1 K)
  const kcExtCryo = EquilibriumEngine.calculateKcAtTemperature(1.0, 200, 1.0);
  assert.ok(Number.isFinite(kcExtCryo) && kcExtCryo > 0, 'Kc at 1 K must be positive finite');
});

runTest('EquilibriumEngine Reaction Quotient Qc handles zero reactants as Infinity safely', () => {
  const haberReaction = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_haber_bosch');
  assert.ok(haberReaction, 'Haber-Bosch reaction must exist');

  // Reactants absent (N2 = 0, H2 = 0), Products present (NH3 = 2.0)
  const qcInfinite = EquilibriumEngine.calculateReactionQuotient(haberReaction, { NH3: 2.0, N2: 0, H2: 0 });
  assert.strictEqual(qcInfinite, Number.POSITIVE_INFINITY, 'Qc must be +Infinity when reactants are zero');

  // Both absent
  const qcZero = EquilibriumEngine.calculateReactionQuotient(haberReaction, {});
  assert.strictEqual(qcZero, 1.0, 'Qc must return 1.0 when both products and reactants are zero');
});

runTest('Heterogeneous Equilibrium ignores solid phases per IUPAC convention', () => {
  const limeReaction = CURRICULUM_EQUILIBRIUM_REACTIONS.find(r => r.id === 'eq_caco3_calcination');
  assert.ok(limeReaction, 'CaCO3 calcination reaction must exist');

  // CaCO3 and CaO are solids (phase = 's'), only CO2(g) participates in Qc
  const qc1 = EquilibriumEngine.calculateReactionQuotient(limeReaction, {
    CaCO3: 1000.0, // massive solid mass
    CaO: 500.0,    // massive solid mass
    CO2: 0.05
  });
  const qc2 = EquilibriumEngine.calculateReactionQuotient(limeReaction, {
    CaCO3: 1.0,
    CaO: 0.1,
    CO2: 0.05
  });

  assert.strictEqual(qc1, 0.05, 'Qc must strictly equal [CO2] activity');
  assert.strictEqual(qc2, 0.05, 'Solid amounts must not alter heterogeneous Qc');
});

// ----------------------------------------------------------------------
// 2. CONFLICTING FIELD SPELLS & HENDERSON-HASSELBALCH BUFFER DEFENSE
// ----------------------------------------------------------------------
console.log('\n--- 2. CONFLICTING FIELD SPELLS & BUFFER DEFENSE ---');

runTest('Henderson-Hasselbalch buffer solution absorbs 75% of severe pH shift', () => {
  const env = ChemicalEnvironmentEngine.createDefaultEnvironment();
  env.ph = 7.4;
  env.bufferType = 'BICARBONATE_PHYSIO';
  env.bufferCapacity = 4;

  // Acid attack: deltaPh = -4.0
  const step1 = ChemicalEnvironmentEngine.applyPhShift(env, -4.0);
  assert.strictEqual(step1.buffered, true, 'Acid shock must be absorbed by buffer');
  assert.strictEqual(step1.newEnv.bufferCapacity, 3, 'Buffer capacity must decrement by 1');
  // 4.0 * 0.25 = 1.0 drop -> 7.4 - 1.0 = 6.4
  assert.strictEqual(step1.newEnv.ph, 6.4, 'pH must only drop 1.0 instead of 4.0');
});

runTest('Buffer capacity exhaustion leads to unprotected direct acidification', () => {
  let env = ChemicalEnvironmentEngine.createDefaultEnvironment();
  env.ph = 7.0;
  env.bufferType = 'ACIDIC_ACETATE';
  env.bufferCapacity = 1;

  // First shock consumes remaining capacity
  const res1 = ChemicalEnvironmentEngine.applyPhShift(env, -2.0);
  assert.strictEqual(res1.buffered, true);
  assert.strictEqual(res1.newEnv.bufferCapacity, 0);
  env = res1.newEnv;

  // Second shock has no buffer left
  const res2 = ChemicalEnvironmentEngine.applyPhShift(env, -2.0);
  assert.strictEqual(res2.buffered, false, 'Unbuffered environment must not absorb shock');
  assert.strictEqual(res2.newEnv.ph, Number((env.ph - 2.0).toFixed(2)));
});

// ----------------------------------------------------------------------
// 3. CATALYST POISONING & HEAVY METAL ENZYME INACTIVATION
// ----------------------------------------------------------------------
console.log('\n--- 3. CATALYST POISONING & HEAVY METAL INACTIVATION ---');

runTest('Active catalysts provide combat ATK boost', () => {
  const env = ChemicalEnvironmentEngine.createDefaultEnvironment();
  ChemicalEnvironmentEngine.addCatalyst(env, 'Fe');
  ChemicalEnvironmentEngine.addCatalyst(env, 'Pt');
  assert.strictEqual(env.activeCatalysts.length, 2);

  const mods = ChemicalEnvironmentEngine.calculateCombatModifiers(env, 'MONSTER', 'PYRO');
  assert.strictEqual(mods.atkBoost, 300, 'Two active catalysts must provide +300 ATK');
});

runTest('Inhibitor H2S irreversibly poisons Iron catalyst (Haber-Bosch poisoning)', () => {
  const env = ChemicalEnvironmentEngine.createDefaultEnvironment();
  env.activeCatalysts = ['Fe', 'Pt'];

  const poisonResult = ChemicalEnvironmentEngine.addInhibitor(env, 'H2S');
  assert.deepStrictEqual(poisonResult.poisonedCatalysts, ['Fe'], 'H2S must poison Fe catalyst');
  assert.strictEqual(env.activeCatalysts.includes('Fe'), false, 'Fe must be removed from active catalysts');
  assert.strictEqual(env.activeCatalysts.includes('Pt'), true, 'Pt must remain unpoisoned by H2S');
  assert.ok(poisonResult.messageVI.includes('Ngộ Độc Chất Xúc Tác'));
});

runTest('Inhibitor Lead (Pb) poisons Platinum (Pt) and prevents re-activation', () => {
  const env = ChemicalEnvironmentEngine.createDefaultEnvironment();
  env.activeCatalysts = ['Pt'];

  const res1 = ChemicalEnvironmentEngine.addInhibitor(env, 'Pb');
  assert.deepStrictEqual(res1.poisonedCatalysts, ['Pt']);
  assert.strictEqual(env.activeCatalysts.length, 0);

  // Attempt to re-activate Pt while Pb is present
  const reAdd = ChemicalEnvironmentEngine.addCatalyst(env, 'Pt');
  assert.strictEqual(reAdd.success, false, 'Pt must fail to activate in presence of Pb poison');
  assert.strictEqual(reAdd.poisoned, true);
  assert.strictEqual(env.activeCatalysts.includes('Pt'), false);
});

// ----------------------------------------------------------------------
// 4. EXTREME MULTI-UNIT STOICHIOMETRIC CASCADES (10,000+ Units)
// ----------------------------------------------------------------------
console.log('\n--- 4. EXTREME MULTI-UNIT STOICHIOMETRIC CASCADES ---');

runTest('ReactionEngine computes 10,000 units of Water synthesis without loop degradation', () => {
  const engine = new ReactionEngine();
  const startTime = performance.now();

  const inventory = {
    'H2': 10000,
    'O2': 5000
  };

  const cascade = engine.evaluateReactionCascade(inventory, ['SPARK']);
  const elapsedMs = performance.now() - startTime;

  assert.strictEqual(cascade.steps.length >= 1, true, 'At least 1 reaction step must trigger');
  const step1 = cascade.steps[0];
  assert.strictEqual(step1.reaction.maxYieldUnits, 5000, 'Yield units must equal 5,000');
  assert.strictEqual(step1.inventoryAfter['H2O'], 10000, 'Produced H2O must equal exactly 10,000');
  assert.strictEqual(step1.inventoryAfter['H2'] || 0, 0, 'Reactant H2 must be completely consumed');
  assert.strictEqual(step1.inventoryAfter['O2'] || 0, 0, 'Reactant O2 must be completely consumed');
  assert.ok(elapsedMs < 15.0, `Cascade must execute in under 15ms (actual: ${elapsedMs.toFixed(2)}ms)`);
});

runTest('Large reactant excess calculates limiting reagent with mathematical precision', () => {
  const engine = new ReactionEngine();
  // Excess O2: 1,000 H2 + 1,000 O2 -> limiting reactant is H2 (needs 2 H2 per 1 O2)
  const inventory = { 'H2': 1000, 'O2': 1000 };
  const cascade = engine.evaluateReactionCascade(inventory, ['SPARK']);

  const step1 = cascade.steps[0];
  assert.strictEqual(step1.reaction.limitingReactant, 'H2');
  assert.strictEqual(step1.inventoryAfter['H2O'], 1000);
  assert.strictEqual(step1.inventoryAfter['O2'], 500, '500 units of excess O2 must remain unreacted');
});

// ----------------------------------------------------------------------
// 5. MASSIVE DECK-OUT EXHAUSTION WITH ZERO CRASH
// ----------------------------------------------------------------------
console.log('\n--- 5. MASSIVE DECK-OUT EXHAUSTION WITH ZERO CRASH ---');

runTest('Deck-Out on draw triggers game over under Rulebook v10 tr. 33', () => {
  const duel = new DuelEngine();
  duel.player.deck = []; // Empty deck
  duel.outcome = 'IN_PROGRESS';

  const drawn = duel.drawCard('player');
  assert.strictEqual(drawn, null, 'Drawing from empty deck must return null');
  assert.strictEqual(duel.outcome, 'OPPONENT_VICTORY', 'Player drawing on empty deck must lose immediately (Deck Out)');
  assert.ok(duel.logs.some(l => l.message.includes('Deck Out')), 'Deck out log must be emitted');
});

runTest('AI Deck-Out grants Player victory cleanly without throwing', () => {
  const duel = new DuelEngine();
  duel.opponent.deck = [];
  duel.outcome = 'IN_PROGRESS';

  const drawn = duel.drawCard('opponent');
  assert.strictEqual(drawn, null);
  assert.strictEqual(duel.outcome, 'PLAYER_VICTORY', 'Opponent Deck Out must grant Player victory');
});

// ----------------------------------------------------------------------
// 6. SIMULTANEOUS LP DOUBLE KNOCKOUT TIE-BREAKER (Rulebook v10 tr. 33)
// ----------------------------------------------------------------------
console.log('\n--- 6. SIMULTANEOUS LP DOUBLE KNOCKOUT TIE-BREAKER ---');

runTest('Simultaneous reduction to 0 LP yields official DRAW state', () => {
  const duel = new DuelEngine();
  duel.outcome = 'IN_PROGRESS';
  duel.player.lp = 0;
  duel.opponent.lp = 0;

  duel.checkWinConditions();
  assert.strictEqual(duel.outcome, 'DRAW', 'Double knockout must result in a DRAW');
  assert.ok(duel.logs.some(l => l.message.includes('HÒA TRẬN') || l.message.includes('Double Knockout')));
});

// ----------------------------------------------------------------------
// 7. MALICIOUS UNICODE FORMULA INJECTION & HOMOGLYPH DEFENSE
// ----------------------------------------------------------------------
console.log('\n--- 7. MALICIOUS UNICODE FORMULA INJECTION & HOMOGLYPH DEFENSE ---');

runTest('normalizeFormulaKey strips zero-width spaces and non-breaking spaces', () => {
  const injected = 'H\u200B2\u200CO\uFEFF';
  const clean = normalizeFormulaKey(injected);
  assert.strictEqual(clean, 'H2O', 'Invisible zero-width characters must be stripped');

  const nbSpaced = 'Ca\u00A0(OH)\u00A02';
  const cleanNb = normalizeFormulaKey(nbSpaced);
  assert.strictEqual(cleanNb, 'Ca(OH)2', 'Non-breaking spaces must be normalized');
});

runTest('normalizeFormulaKey canonicalizes Cyrillic homoglyphs to Latin ASCII', () => {
  // Cyrillic 'С' (U+0421) and 'О' (U+041E) look identical to Latin 'C' and 'O'
  const cyrillicCO2 = '\u0421\u041E2';
  const cleanCO2 = normalizeFormulaKey(cyrillicCO2);
  assert.strictEqual(cleanCO2, 'CO2', 'Cyrillic homoglyphs must canonicalize to Latin CO2');

  // Cyrillic 'Н' (U+041D) and 'О' (U+041E) -> 'H' and 'O'
  const cyrillicH2O = '\u041D2\u041E';
  const cleanH2O = normalizeFormulaKey(cyrillicH2O);
  assert.strictEqual(cleanH2O, 'H2O', 'Cyrillic homoglyphs must canonicalize to Latin H2O');
});

runTest('normalizeChemicalFormula handles Unicode subscripts and brackets', () => {
  const subWater = 'H₂O';
  assert.strictEqual(normalizeChemicalFormula(subWater), 'H2O');

  const subSulfate = 'Al₂(SO₄)₃';
  assert.strictEqual(normalizeChemicalFormula(subSulfate), 'Al2(SO4)3');

  const parsed = parseFormulaAtoms('Al₂(SO₄)₃');
  assert.deepStrictEqual(parsed, { Al: 2, S: 3, O: 12 });
});

runTest('parseChemicalEquation accepts Unicode arrow variants (->, →, ⟶, =>, ⇌)', () => {
  const eqAscii = parseChemicalEquation('2H2 + O2 -> 2H2O');
  assert.ok(eqAscii, 'ASCII -> must parse');

  const eqUnicodeArrow = parseChemicalEquation('2H2 + O2 → 2H2O');
  assert.ok(eqUnicodeArrow, 'Unicode → must parse');
  assert.deepStrictEqual(eqUnicodeArrow.reactants, { H2: 2, O2: 1 });
  assert.strictEqual(eqUnicodeArrow.products[0].formula, 'H2O');
  assert.strictEqual(eqUnicodeArrow.products[0].count, 2);

  const eqLongArrow = parseChemicalEquation('N2 + 3H2 ⟶ 2NH3');
  assert.ok(eqLongArrow, 'Unicode ⟶ must parse');

  const eqEquilibrium = parseChemicalEquation('2NO2 ⇌ N2O4');
  assert.ok(eqEquilibrium, 'Equilibrium symbol ⇌ must parse');
  assert.deepStrictEqual(eqEquilibrium.reactants, { NO2: 2 });
});

// ----------------------------------------------------------------------
// 8. CIRCULAR CHEMICAL REACTION DEADLOCK PREVENTION
// ----------------------------------------------------------------------
console.log('\n--- 8. CIRCULAR CHEMICAL REACTION DEADLOCK PREVENTION ---');

runTest('ReactionEngine bounds multi-step cascades within maxSteps limit (zero deadlock)', () => {
  const engine = new ReactionEngine();
  const initialInv = { 'S': 5, 'O2': 10, 'H2O': 10 };

  // Industrial Contact Process cascade: S -> SO2 -> SO3 -> H2SO4
  const t0 = performance.now();
  const cascade = engine.evaluateReactionCascade(initialInv, ['HIGH_TEMP', 'SPARK', 'CATALYST_V2O5'], 8);
  const duration = performance.now() - t0;

  assert.ok(cascade.steps.length <= 8, 'Cascade steps must never exceed maxSteps');
  assert.ok(cascade.steps.length >= 2, 'Multi-stage contact process must chain at least 2 steps');
  assert.ok(duration < 50.0, `Cascade evaluation must remain lightning-fast (actual: ${duration.toFixed(2)}ms)`);
});

// ----------------------------------------------------------------------
// 9. HEAVY METAL WASTEWATER PRECIPITATION STOICHIOMETRY (GDPT 2018 Chemistry)
// ----------------------------------------------------------------------
console.log('\n--- 9. HEAVY METAL WASTEWATER PRECIPITATION STOICHIOMETRY ---');

runTest('Copper(II) hydroxide precipitation stoichiometry (CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4)', () => {
  const parsed = parseChemicalEquation('CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4');
  assert.ok(parsed);
  assert.deepStrictEqual(parsed.reactants, { 'CuSO4': 1, 'NaOH': 2 });
  assert.strictEqual(parsed.products.find(p => p.formula === 'Cu(OH)2')?.count, 1);
  assert.strictEqual(parsed.products.find(p => p.formula === 'Na2SO4')?.count, 1);

  // Mass conservation / atom conservation check
  const reactantAtoms = {};
  for (const [f, count] of Object.entries(parsed.reactants)) {
    const atoms = parseFormulaAtoms(f);
    for (const [el, num] of Object.entries(atoms)) {
      reactantAtoms[el] = (reactantAtoms[el] || 0) + num * count;
    }
  }

  const productAtoms = {};
  for (const p of parsed.products) {
    const atoms = parseFormulaAtoms(p.formula);
    for (const [el, num] of Object.entries(atoms)) {
      productAtoms[el] = (productAtoms[el] || 0) + num * p.count;
    }
  }

  assert.deepStrictEqual(reactantAtoms, productAtoms, 'Atoms must balance perfectly across precipitation reaction');
  assert.strictEqual(reactantAtoms['Cu'], 1);
  assert.strictEqual(reactantAtoms['Na'], 2);
  assert.strictEqual(reactantAtoms['S'], 1);
  assert.strictEqual(reactantAtoms['O'], 6);
  assert.strictEqual(reactantAtoms['H'], 2);
});

runTest('Iron(III) hydroxide precipitation stoichiometry (FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl)', () => {
  const parsed = parseChemicalEquation('FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl');
  assert.ok(parsed);
  assert.deepStrictEqual(parsed.reactants, { 'FeCl3': 1, 'NaOH': 3 });

  const reactantAtoms = {};
  for (const [f, count] of Object.entries(parsed.reactants)) {
    const atoms = parseFormulaAtoms(f);
    for (const [el, num] of Object.entries(atoms)) {
      reactantAtoms[el] = (reactantAtoms[el] || 0) + num * count;
    }
  }

  const productAtoms = {};
  for (const p of parsed.products) {
    const atoms = parseFormulaAtoms(p.formula);
    for (const [el, num] of Object.entries(atoms)) {
      productAtoms[el] = (productAtoms[el] || 0) + num * p.count;
    }
  }

  assert.deepStrictEqual(reactantAtoms, productAtoms, 'FeCl3 + 3NaOH must be fully balanced');
  assert.strictEqual(reactantAtoms['Fe'], 1);
  assert.strictEqual(reactantAtoms['Cl'], 3);
  assert.strictEqual(reactantAtoms['Na'], 3);
  assert.strictEqual(reactantAtoms['O'], 3);
  assert.strictEqual(reactantAtoms['H'], 3);
});

// ----------------------------------------------------------------------
// 10. ORGANIC SAPONIFICATION STOICHIOMETRIC BALANCE (GDPT 2018 Grade 12)
// ----------------------------------------------------------------------
console.log('\n--- 10. ORGANIC SAPONIFICATION STOICHIOMETRIC BALANCE ---');

runTest('Tristearin fat saponification produces 3 soap molecules + 1 glycerol molecule', () => {
  const eq = '(C17H35COO)3C3H5 + 3NaOH -> 3C17H35COONa + C3H5(OH)3';
  const parsed = parseChemicalEquation(eq);
  assert.ok(parsed, 'Tristearin saponification equation must parse');

  assert.deepStrictEqual(parsed.reactants, { '(C17H35COO)3C3H5': 1, 'NaOH': 3 });
  assert.strictEqual(parsed.products.find(p => p.formula === 'C17H35COONa')?.count, 3);
  assert.strictEqual(parsed.products.find(p => p.formula === 'C3H5(OH)3')?.count, 1);

  // Atom balance verification: (C17H35COO)3C3H5 = C57 H110 O6
  // + 3 NaOH = Na3 O3 H3
  // Total Reactants: C = 57, H = 113, O = 9, Na = 3
  const reactantAtoms = {};
  for (const [f, count] of Object.entries(parsed.reactants)) {
    const atoms = parseFormulaAtoms(f);
    for (const [el, num] of Object.entries(atoms)) {
      reactantAtoms[el] = (reactantAtoms[el] || 0) + num * count;
    }
  }

  const productAtoms = {};
  for (const p of parsed.products) {
    const atoms = parseFormulaAtoms(p.formula);
    for (const [el, num] of Object.entries(atoms)) {
      productAtoms[el] = (productAtoms[el] || 0) + num * p.count;
    }
  }

  assert.strictEqual(reactantAtoms['C'], 57, 'Total Carbon must be 57');
  assert.strictEqual(reactantAtoms['H'], 113, 'Total Hydrogen must be 113');
  assert.strictEqual(reactantAtoms['O'], 9, 'Total Oxygen must be 9');
  assert.strictEqual(reactantAtoms['Na'], 3, 'Total Sodium must be 3');

  assert.deepStrictEqual(reactantAtoms, productAtoms, 'Saponification mass and atom balance must hold 100%');
});

// ----------------------------------------------------------------------
// AUDIT SUMMARY
// ----------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log(' RED TEAM ADVERSARIAL DEFENSE AUDIT: COMPLETE & VERIFIED');
console.log('======================================================================\n');
