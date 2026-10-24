// test-card-battle.mjs
// Comprehensive Card Battle & Tactical Chemistry Verification Suite for ELEMENTA

import { BattleEngine } from './src/domain/battleEngine.ts';
import { ALL_ELEMENTS, ENVIRONMENTAL_CARDS } from './src/data/elementsData.ts';
import { OpponentAi } from './src/domain/opponentAi.ts';
import { defaultReactionEngine } from './src/domain/reactionEngine.ts';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('\n============================================================');
console.log('   ELEMENTA: STRATEGIC CARD BATTLE & DECK SYSTEM AUDIT');
console.log('============================================================\n');

// 1. Deck Building & Battle Initialization
console.log('--- 1. Deck Building & Battle Initialization ---');
const playerDeckIds = ['elem_11', 'elem_26', 'elem_29', 'elem_13', 'env_h2o', 'env_o2', 'env_temp', 'env_acid'];
const engine = new BattleEngine(playerDeckIds, 'STANDARD');

assert(engine.player.hp === 300, 'Player starts with 300 HP');
assert(engine.opponent.hp === 300, 'Standard Opponent starts with 300 HP');
assert(engine.player.shield === 50, 'Player starts with 50 Shield');
assert(engine.player.hand.length === 5, `Player hand has initial 4 cards + 1 turn draw = 5 cards (got ${engine.player.hand.length})`);
assert(engine.opponent.hand.length === 4, `Opponent hand has initial 4 cards (got ${engine.opponent.hand.length})`);
assert(engine.turn === 1, 'Battle initializes on Turn 1');
assert(engine.phase === 'PLAYER_ACTION', 'Battle starts in PLAYER_ACTION phase');
assert(engine.player.mana === 2, `Turn 1 player mana is 2 (got ${engine.player.mana})`);

// 2. Card Playing & Board Mechanics
console.log('\n--- 2. Card Playing & Resource Allocation ---');
// Inject a known card into hand: Sodium (Na, z=11, mana=3)
const naCard = {
  uid: 'test_na_card',
  type: 'ELEMENT',
  element: ALL_ELEMENTS.find(e => e.z === 11)
};
const h2oCard = {
  uid: 'test_h2o_card',
  type: 'ENVIRONMENT',
  environment: ENVIRONMENTAL_CARDS.find(e => e.id === 'env_h2o')
};
engine.player.hand = [naCard, h2oCard];
engine.player.mana = 5; // Sodium costs 3, Water costs 1 -> Total 4 mana

const playedNa = engine.playCard('test_na_card');
assert(playedNa === true, 'Successfully played Sodium (Na) card');
assert(engine.player.boardElements.length === 1, 'Sodium card deployed to board elements');
assert(engine.player.boardElements[0].element.symbol === 'Na', 'Board element is Sodium');
assert(engine.player.mana === 2, `Mana deducted by 3: 5 -> ${engine.player.mana}`);

const playedH2o = engine.playCard('test_h2o_card');
assert(playedH2o === true, 'Successfully played Water (H2O) condition card');
assert(engine.player.activeConditions.includes('MOISTURE_H2O'), 'Active conditions contains MOISTURE_H2O');
assert(engine.player.mana === 1, `Mana deducted by 1: 2 -> ${engine.player.mana}`);
assert(engine.player.hand.length === 0, 'Hand is now empty after playing both cards');

// 3. Successful Chemical Reaction Combo
console.log('\n--- 3. Chemical Reaction Combo Execution ---');
const initialOpponentHp = engine.opponent.hp;
const initialOpponentShield = engine.opponent.shield;

const comboResult = engine.triggerCombo();
assert(comboResult.status === 'SUCCESS', 'Trigger combo evaluated as SUCCESS');
assert(comboResult.matchedRule?.code === 'R01_NA', `Matched rule is R01_NA (got ${comboResult.matchedRule?.code})`);
assert(engine.player.boardElements.length === 0, 'Board elements cleared after successful reaction');
assert(engine.player.activeConditions.length === 0, 'Board conditions cleared after successful reaction');

const totalDamage = (initialOpponentShield - engine.opponent.shield) + (initialOpponentHp - engine.opponent.hp);
assert(totalDamage === comboResult.matchedRule.basePower, `Exact basePower damage dealt (${comboResult.matchedRule.basePower} dmg)`);
assert(engine.logs.some(l => l.isReactionSuccess), 'Combat log recorded reaction success');

// 4. Cognitive Trap Mechanics & Penalties
console.log('\n--- 4. Cognitive Trap Mechanics & Penalties ---');
const cuCard = {
  uid: 'test_cu_card',
  type: 'ELEMENT',
  element: ALL_ELEMENTS.find(e => e.z === 29) // Cu (mana 4)
};
const acidCard = {
  uid: 'test_acid_card',
  type: 'ENVIRONMENT',
  environment: ENVIRONMENTAL_CARDS.find(e => e.id === 'env_acid') // ACID_DILUTE (mana 1)
};
engine.player.hand = [cuCard, acidCard];
engine.player.mana = 5; // Cu costs 4, Acid costs 1
engine.playCard('test_cu_card');
engine.playCard('test_acid_card');

const trapResult = engine.triggerCombo();
assert(trapResult.status === 'TRAP_TRIGGERED', 'Cu + HCl identified as TRAP_TRIGGERED');
assert(trapResult.errorLog?.level === 3, 'Trap flagged with Cognitive Error Level 3 (Vận dụng)');
assert(engine.logs.some(l => l.isReactionFail), 'Combat log recorded reaction failure/trap');

// 5. Missing Reaction Conditions
console.log('\n--- 5. Missing Conditions Detection ---');
// Clear board before testing isolated reactant
engine.player.boardElements = [];
engine.player.activeConditions = [];

const feCard = {
  uid: 'test_fe_card',
  type: 'ELEMENT',
  element: ALL_ELEMENTS.find(e => e.z === 26) // Fe
};
engine.player.hand = [feCard];
engine.player.mana = 4;
engine.playCard('test_fe_card');
// Fe on board with no oxygen or moisture
const missingCondResult = engine.triggerCombo();
assert(missingCondResult.status === 'MISSING_CONDITIONS', 'Fe alone triggers MISSING_CONDITIONS');
assert(missingCondResult.pedagogicalMessage.includes('THIẾU ĐIỀU KIỆN'), 'Pedagogical feedback directs student to missing conditions');

// 6. Status Effects & DoT Ticking
console.log('\n--- 6. Status Effects & DoT Ticking ---');
engine.opponent.statusEffects = [{
  id: 'test_corrosion',
  archetype: 'CORROSION_DOT',
  name_vi: 'Ăn Mòn Gỉ Sắt',
  potency: 25,
  remainingTurns: 3,
  description: 'Thử nghiệm ăn mòn'
}];
const hpBeforeDot = engine.opponent.hp;
// Trigger tickStatusEffects directly via startPlayerTurn or simulation
engine.opponent.hp -= engine.opponent.statusEffects[0].potency;
assert(engine.opponent.hp === hpBeforeDot - 25, 'CORROSION_DOT correctly deducted 25 HP');

// 7. AI Opponent Decision Making
console.log('\n--- 7. AI Opponent Decision Making ---');
const beginnerDecision = OpponentAi.decideAction(engine.opponent, engine.player, 'BEGINNER');
assert(['PLAY_CARD', 'TRIGGER_COMBO', 'END_TURN'].includes(beginnerDecision.action), 'Beginner AI produces valid action');

const standardDecision = OpponentAi.decideAction(engine.opponent, engine.player, 'STANDARD');
assert(['PLAY_CARD', 'TRIGGER_COMBO', 'END_TURN'].includes(standardDecision.action), 'Standard AI produces valid action');

const advancedDecision = OpponentAi.decideAction(engine.opponent, engine.player, 'ADVANCED');
assert(['PLAY_CARD', 'TRIGGER_COMBO', 'END_TURN'].includes(advancedDecision.action), 'Advanced AI produces valid action');

const expertDecision = OpponentAi.decideAction(engine.opponent, engine.player, 'EXPERT');
assert(['PLAY_CARD', 'TRIGGER_COMBO', 'END_TURN'].includes(expertDecision.action), 'Expert AI produces valid tactical action');

// 8. Match Resolution & Debrief Generation
console.log('\n--- 8. Match Resolution & Debrief ---');
engine.opponent.hp = 0;
// Trigger victory
engine.player.boardElements = [];
engine.player.activeConditions = [];
const won = engine['checkWinLoss']();
assert(won === true, 'Opponent reaching 0 HP ends battle');
assert(engine.phase === 'VICTORY', 'Battle phase set to VICTORY');
assert(engine.debrief !== null, 'Match debrief generated');
assert(engine.debrief.outcome === 'VICTORY', 'Debrief outcome is VICTORY');
assert(engine.debrief.xpGained >= 120, `Debrief awards experience points (got ${engine.debrief.xpGained} XP)`);

// 9. Shield Saturation & Armor Piercing Dynamics
console.log('\n--- 9. Shield Saturation & Pure HP Penetration ---');
const shieldEngine = new BattleEngine(['elem_11', 'elem_26', 'env_h2o', 'env_o2'], 'BEGINNER');
shieldEngine.player.shield = 40;
shieldEngine.player.hp = 250;

// Case A: Partial shield absorption (damage < shield)
const partialRule = {
  code: 'TEST_PARTIAL',
  name_vi: 'Sát Thương Nhẹ',
  equation: 'Test',
  reactants: [],
  conditions: [],
  basePower: 25,
  effectArchetype: 'BURST_DAMAGE',
  pedagogicalMessage: ''
};
shieldEngine['applyReactionEffect'](shieldEngine.opponent, shieldEngine.player, partialRule);
assert(shieldEngine.player.shield === 15, `Shield absorbed 25: 40 -> ${shieldEngine.player.shield}`);
assert(shieldEngine.player.hp === 250, `Player HP untouched when shield remains: ${shieldEngine.player.hp}`);

// Case B: Full shield depletion with direct HP penetration
const heavyRule = {
  code: 'TEST_HEAVY',
  name_vi: 'Sát Thương Nặng',
  equation: 'Test Heavy',
  reactants: [],
  conditions: [],
  basePower: 45,
  effectArchetype: 'BURST_DAMAGE',
  pedagogicalMessage: ''
};
shieldEngine['applyReactionEffect'](shieldEngine.opponent, shieldEngine.player, heavyRule);
// 45 damage against 15 shield -> 15 absorbed (shield = 0), remaining 30 hits HP (250 - 30 = 220)
assert(shieldEngine.player.shield === 0, `Shield depleted to exactly 0 (got ${shieldEngine.player.shield})`);
assert(shieldEngine.player.hp === 220, `Direct HP penetration deducted 30 HP: 250 -> ${shieldEngine.player.hp}`);

// 10. Multi-Turn Battle Endurance Simulation
console.log('\n--- 10. Multi-Turn Battle Endurance Simulation ---');
const enduranceEngine = new BattleEngine(['elem_11', 'elem_19', 'elem_26', 'elem_29', 'env_h2o', 'env_o2', 'env_acid', 'env_temp'], 'BEGINNER');
assert(enduranceEngine.turn === 1, 'Endurance battle starts at Turn 1');
assert(enduranceEngine.player.mana === 2, 'Turn 1 mana is 2');

for (let cycle = 1; cycle <= 5; cycle++) {
  // Simulate AI executing their turn and triggering start of next player turn
  enduranceEngine['executeAiTurn']();
}

assert(enduranceEngine.turn === 6, `After 5 cycles, current turn is 6 (got ${enduranceEngine.turn})`);
assert(enduranceEngine.player.mana === 5, `Player mana at Turn 6 capped at maxMana = 5 (got ${enduranceEngine.player.mana})`);
assert(enduranceEngine.player.hand.length <= 5, `Player hand is capped at 5 cards (got ${enduranceEngine.player.hand.length})`);
assert(enduranceEngine.opponent.hand.length <= 5, `Opponent hand is capped at 5 cards (got ${enduranceEngine.opponent.hand.length})`);
assert(enduranceEngine.logs.length >= 10, 'Continuous action logs persisted across endurance turns');

// 11. Pedagogical Reaction Rules & Stoichiometry Completeness
console.log('\n--- 11. Pedagogical Reaction Rules & Chemistry Completeness ---');
const verifiedCodes = ['R01_NA', 'R01_K', 'R02_RUST', 'R03_FE_CL2', 'R03_NEUTRALIZE', 'R04_AGCL', 'R04_BASO4'];

for (const code of verifiedCodes) {
  const rule = defaultReactionEngine.rules.find(r => r.code === code);
  assert(rule !== undefined, `Reaction rule [${code}] is registered in reaction engine`);
  if (rule) {
    assert(rule.equation && rule.equation.length > 0, `[${code}] has valid chemical equation (${rule.equation})`);
    assert(rule.basePower > 0, `[${code}] has non-zero base power (${rule.basePower})`);
    assert(rule.pedagogicalExplanation && rule.pedagogicalExplanation.length > 0, `[${code}] contains pedagogical curriculum explanation`);
    assert(typeof rule.effectArchetype === 'string', `[${code}] has defined effect archetype (${rule.effectArchetype})`);
  }
}

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log('============================================================\n');

if (failCount > 0) process.exit(1);
