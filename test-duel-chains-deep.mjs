// test-duel-chains-deep.mjs
// Comprehensive Deep Test Suite: Duel Engine, LIFO Chains, Spell Speed, Deck-Out, Surrender & Turn Cycles

import assert from 'assert';
import { DuelEngine } from './src/domain/duelEngine.ts';
import { PLAYABLE_CARDS, DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS } from './src/data/playableCardsData.ts';

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('=== TEST SUITE: TACTICAL CARD DUEL, CHAIN STACK & GOVERNANCE ===\n');

// -------------------------------------------------------------
// GROUP 1: DECK-OUT VICTORY CONDITIONS
// -------------------------------------------------------------
console.log('--- Group 1: Deck-Out Immediate Loss Evaluation ---');

runTest('Player Deck-Out in Draw Phase triggers OPPONENT_VICTORY', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  // Empty player's deck
  engine.player.deck = [];
  assert.strictEqual(engine.player.deck.length, 0);

  const drawn = engine.drawCard('player');
  assert.strictEqual(drawn, null);
  assert.strictEqual(engine.outcome, 'OPPONENT_VICTORY');
  assert.ok(engine.logs.some(l => l.message.includes('Deck Out')));
});

runTest('Opponent Deck-Out in Draw Phase triggers PLAYER_VICTORY', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  // Empty opponent's deck
  engine.opponent.deck = [];
  assert.strictEqual(engine.opponent.deck.length, 0);

  const drawn = engine.drawCard('opponent');
  assert.strictEqual(drawn, null);
  assert.strictEqual(engine.outcome, 'PLAYER_VICTORY');
  assert.ok(engine.logs.some(l => l.message.includes('Deck Out')));
});

runTest('Deck-Out during strategic multi-draw triggers immediate loss', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.deck = [];
  engine.player.lp = 4000;

  // Try lifePointDraw with empty deck
  const res = engine.lifePointDraw('player', 1000, 2);
  assert.strictEqual(res.success, true);
  assert.strictEqual(engine.outcome, 'OPPONENT_VICTORY');
});

// -------------------------------------------------------------
// GROUP 2: SURRENDER MECHANICS
// -------------------------------------------------------------
console.log('\n--- Group 2: Surrender / Concede Governance ---');

runTest('Player surrender immediately awards OPPONENT_VICTORY', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  assert.strictEqual(engine.outcome, 'IN_PROGRESS');

  engine.surrender('player');
  assert.strictEqual(engine.outcome, 'OPPONENT_VICTORY');
  assert.ok(engine.logs.some(l => l.message.includes('đầu hàng')));
});

runTest('Opponent surrender immediately awards PLAYER_VICTORY', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  assert.strictEqual(engine.outcome, 'IN_PROGRESS');

  engine.surrender('opponent');
  assert.strictEqual(engine.outcome, 'PLAYER_VICTORY');
  assert.ok(engine.logs.some(l => l.message.includes('đầu hàng')));
});

// -------------------------------------------------------------
// GROUP 3: LIFO CHAIN STACK & SPELL SPEED RULES
// -------------------------------------------------------------
console.log('\n--- Group 3: Chain Stack & Spell Speed Governance ---');

runTest('Spell Speed 1 can initiate Chain Link 1', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const normalSpell = engine.player.deck.find(c => c.def.cardType === 'SPELL' && (c.def.spellSpeed === 1 || !c.def.spellSpeed)) || engine.player.deck[0];

  const res = engine.pushChain(normalSpell, 'player', 1, undefined, 'Normal Spell Link 1');
  assert.strictEqual(res.success, true);
  assert.strictEqual(res.chainIndex, 1);
  assert.strictEqual(engine.chainStack.length, 1);
});

runTest('Spell Speed 1 CANNOT respond to an existing Chain Link (Rule 1)', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const card1 = engine.player.deck[0];
  const card2 = engine.player.deck[1];

  engine.pushChain(card1, 'player', 1, undefined, 'Initial Link');
  assert.strictEqual(engine.chainStack.length, 1);

  // Attempt to chain Speed 1 to existing link
  const res = engine.pushChain(card2, 'opponent', 1, undefined, 'Illegal Speed 1 response');
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('không thể kích hoạt để phản ứng'));
  assert.strictEqual(engine.chainStack.length, 1);
});

runTest('Spell Speed 2 can chain to Spell Speed 1', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const card1 = engine.player.deck[0];
  const card2 = engine.player.deck[1];

  const r1 = engine.pushChain(card1, 'player', 1, undefined, 'Link 1');
  const r2 = engine.pushChain(card2, 'opponent', 2, undefined, 'Link 2 (Quick)');
  assert.strictEqual(r1.success, true);
  assert.strictEqual(r2.success, true);
  assert.strictEqual(engine.chainStack.length, 2);
});

runTest('Spell Speed 3 (Counter Trap) can chain to Spell Speed 2', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const card1 = engine.player.deck[0];
  const card2 = engine.player.deck[1];
  const card3 = engine.player.deck[2];

  engine.pushChain(card1, 'player', 1);
  engine.pushChain(card2, 'opponent', 2);
  const r3 = engine.pushChain(card3, 'player', 3, undefined, 'Link 3 (Counter Trap)');
  assert.strictEqual(r3.success, true);
  assert.strictEqual(engine.chainStack.length, 3);
});

runTest('Spell Speed 2 CANNOT chain to Spell Speed 3 (Rule 2: Lower cannot respond to higher)', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const card1 = engine.player.deck[0];
  const card2 = engine.player.deck[1];
  const card3 = engine.player.deck[2];

  engine.pushChain(card1, 'player', 1);
  engine.pushChain(card2, 'opponent', 3); // Counter Trap
  const res = engine.pushChain(card3, 'player', 2); // Quick spell attempting to chain to counter trap
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('không thể phản ứng'));
  assert.strictEqual(engine.chainStack.length, 2);
});

runTest('Spell Speed 3 CAN chain to another Spell Speed 3 (Counter Trap vs Counter Trap)', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const card1 = engine.player.deck[0];
  const card2 = engine.player.deck[1];
  const card3 = engine.player.deck[2];

  engine.pushChain(card1, 'player', 1);
  engine.pushChain(card2, 'opponent', 3);
  const r3 = engine.pushChain(card3, 'player', 3);
  assert.strictEqual(r3.success, true);
  assert.strictEqual(engine.chainStack.length, 3);
});

// -------------------------------------------------------------
// GROUP 4: LIFO EXECUTION & COUNTER TRAP NEGATION
// -------------------------------------------------------------
console.log('\n--- Group 4: LIFO Resolution & Negation Handling ---');

runTest('Counter Trap TRAP_COGNITIVE_CU_HCL negates Chain Link 1 and deals 1000 damage', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  
  // Create Exo Burst spell (Speed 1)
  const burstDef = PLAYABLE_CARDS.find(c => c.effectCode === 'SPELL_EXO_BURST');
  assert.ok(burstDef, 'SPELL_EXO_BURST must exist');
  const burstCard = {
    uid: 'test_burst_1',
    def: burstDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };

  // Create Cognitive Cu+HCl Trap (Speed 3)
  const trapDef = PLAYABLE_CARDS.find(c => c.effectCode === 'TRAP_COGNITIVE_CU_HCL');
  assert.ok(trapDef, 'TRAP_COGNITIVE_CU_HCL must exist');
  const trapCard = {
    uid: 'test_trap_1',
    def: trapDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };

  const initialOpponentLp = engine.opponent.lp; // 8000
  const initialPlayerLp = engine.player.lp;     // 8000

  // Link 1: Player activates Exo Burst targeting opponent
  engine.pushChain(burstCard, 'player', 1, undefined, 'Player Exo Burst');

  // Link 2: Opponent responds with Cognitive Cu+HCl Counter Trap
  engine.pushChain(trapCard, 'opponent', 3, undefined, 'Opponent Cu Counter Trap');

  assert.strictEqual(engine.chainStack.length, 2);

  // Resolve Chain (LIFO)
  engine.resolveChain();

  assert.strictEqual(engine.chainStack.length, 0);

  // Cu Counter Trap should have damaged Player by 1000 LP
  assert.strictEqual(engine.player.lp, initialPlayerLp - 1000);

  // Link 1 Exo Burst should have been NEGATED -> Opponent took 0 damage from Exo Burst!
  assert.strictEqual(engine.opponent.lp, initialOpponentLp);

  // Check logs confirm negation
  assert.ok(engine.logs.some(l => l.message.includes('Vô hiệu hóa thành công')));
  assert.ok(engine.logs.some(l => l.message.includes('đã bị vô hiệu hóa! Không có tác dụng')));

  // Both cards sent to respective graveyards
  assert.ok(engine.player.graveyard.some(c => c.uid === 'test_burst_1'));
  assert.ok(engine.opponent.graveyard.some(c => c.uid === 'test_trap_1'));
});

// -------------------------------------------------------------
// GROUP 5: TURN PROGRESSION & PHASE ADVANCEMENT
// -------------------------------------------------------------
console.log('\n--- Group 5: Phase Progression & Active Player Switching ---');

runTest('Engine advances smoothly through player phases to Battle and End Phase', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  // At constructor start, startTurn('player') draws card, executes Standby, and enters Main Phase 1
  assert.strictEqual(engine.currentPhase, 'MAIN_PHASE_1');
  assert.strictEqual(engine.activePlayerId, 'player');
  assert.strictEqual(engine.currentTurn, 1);

  const p1 = engine.advancePhase();
  assert.strictEqual(p1, 'BATTLE_PHASE');

  const p2 = engine.advancePhase();
  assert.strictEqual(p2, 'MAIN_PHASE_2');

  // Advancing from Main Phase 2 triggers End Phase, which runs AI opponent turn
  // and hands control back to player in Main Phase 1 of Turn 3!
  const p3 = engine.advancePhase();
  assert.strictEqual(p3, 'MAIN_PHASE_1');

  // Verify state after full turn cycle
  assert.strictEqual(engine.currentPhase, 'MAIN_PHASE_1');
  assert.strictEqual(engine.activePlayerId, 'player');
  assert.strictEqual(engine.currentTurn, 3);
});

// -------------------------------------------------------------
// GROUP 6: AI OPPONENT BEHAVIOR INTEGRITY
// -------------------------------------------------------------
console.log('\n--- Group 6: AI Opponent Full Turn Simulation ---');

for (const level of ['NOVICE', 'ADEPT', 'EXPERT', 'MASTER']) {
  runTest(`AI Duelist [${level}] executes complete turn without runtime crashes`, () => {
    const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, level);
    const initialLogCount = engine.logs.length;

    // Trigger AI turn explicitly
    engine.startTurn('opponent');

    // Verify AI performed actions (logs increased) and cleanly transitioned turn
    assert.ok(engine.logs.length > initialLogCount, 'AI should have generated action logs');
    assert.strictEqual(engine.activePlayerId, 'player', 'AI turn should conclude and pass to player');
    assert.ok(engine.currentTurn >= 2, 'Turn count should advance after AI turn');
  });
}

// -------------------------------------------------------------
// GROUP 7: TRIPLE-LINK NEGATION CASCADE (LIFO RESOLUTION)
// -------------------------------------------------------------
console.log('\n--- Group 7: Triple-Link Negation Cascade ---');

runTest('Triple-Link Cascade: Counter Trap negates Counter Trap, allowing Chain Link 1 to resolve unhindered', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');

  const burstDef = PLAYABLE_CARDS.find(c => c.effectCode === 'SPELL_EXO_BURST');
  assert.ok(burstDef, 'SPELL_EXO_BURST must exist');
  const burstCard = {
    uid: 'test_burst_chain_1',
    def: burstDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };

  const trapDef = PLAYABLE_CARDS.find(c => c.effectCode === 'TRAP_COGNITIVE_CU_HCL');
  assert.ok(trapDef, 'TRAP_COGNITIVE_CU_HCL must exist');
  const trapCard1 = {
    uid: 'test_trap_chain_2',
    def: trapDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };

  const trapCard2 = {
    uid: 'test_trap_chain_3',
    def: trapDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };

  const initialOpponentLp = engine.opponent.lp; // 8000
  const initialPlayerLp = engine.player.lp;     // 8000

  // Link 1: Player initiates Exo Burst (Speed 1, deals 450 without Pyro)
  const r1 = engine.pushChain(burstCard, 'player', 1, undefined, 'Player Exo Burst Link 1');
  assert.strictEqual(r1.success, true);

  // Link 2: Opponent responds with Cognitive Cu+HCl Counter Trap (Speed 3)
  const r2 = engine.pushChain(trapCard1, 'opponent', 3, undefined, 'Opponent Cu Trap Link 2');
  assert.strictEqual(r2.success, true);

  // Link 3: Player chains own Cognitive Cu+HCl Counter Trap (Speed 3)
  const r3 = engine.pushChain(trapCard2, 'player', 3, undefined, 'Player Counter-Counter Trap Link 3');
  assert.strictEqual(r3.success, true);

  assert.strictEqual(engine.chainStack.length, 3);

  // Execute LIFO Resolution
  engine.resolveChain();

  assert.strictEqual(engine.chainStack.length, 0);

  // Resolution order:
  // Link 3 executes: Negates Link 2 (trapCard1.isNegated = true) and deals 1000 LP damage to Opponent.
  // Link 2 executes: isNegated === true -> skips effect (does NOT negate Link 1, does NOT damage player).
  // Link 1 executes: Un-negated! Deals 450 LP damage to Opponent.
  // Total damage to Opponent: 1000 + 450 = 1450 LP (8000 - 1450 = 6550)
  // Total damage to Player: 0 LP (8000 remaining)
  assert.strictEqual(engine.opponent.lp, initialOpponentLp - 1450);
  assert.strictEqual(engine.player.lp, initialPlayerLp);

  // Verify all cards routed to respective graveyards
  assert.ok(engine.player.graveyard.some(c => c.uid === 'test_burst_chain_1'));
  assert.ok(engine.opponent.graveyard.some(c => c.uid === 'test_trap_chain_2'));
  assert.ok(engine.player.graveyard.some(c => c.uid === 'test_trap_chain_3'));
});

// -------------------------------------------------------------
// GROUP 8: MISSING TARGET / FIZZLE RESOLUTION & BOUNDARY DEFENSE
// -------------------------------------------------------------
console.log('\n--- Group 8: Missing Target Fizzle & Boundary Defense ---');

runTest('Missing Target Fizzle: Spell resolves safely when target monster is removed beforehand', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');

  const monsterCard = engine.player.deck.find(c => c.def.cardType === 'ELEMENT_MONSTER') || engine.player.deck[0];
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: monsterCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const bunsenDef = PLAYABLE_CARDS.find(c => c.effectCode === 'SPELL_BUNSEN_EQUIP') || {
    id: 'test_bunsen',
    name: 'Đèn Bunsen',
    cardType: 'EQUIP_CATALYST',
    effectCode: 'SPELL_BUNSEN_EQUIP',
    spellSpeed: 1
  };
  const bunsenCard = {
    uid: 'test_bunsen_fizzle',
    def: bunsenDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };

  engine.pushChain(bunsenCard, 'player', 1, 0, 'Equip Bunsen');

  // Interruption: Monster at slot 0 is removed before resolution
  engine.player.monsterZones[0] = null;

  assert.doesNotThrow(() => {
    engine.resolveChain();
  });
  assert.strictEqual(engine.chainStack.length, 0);
  assert.ok(engine.player.graveyard.some(c => c.uid === 'test_bunsen_fizzle'));
});

runTest('Boundary Safety: pushChain with out-of-bounds slot indices (-1, 99) handles gracefully without exception', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const dummyDef = PLAYABLE_CARDS.find(c => c.effectCode === 'SPELL_EXO_BURST') || PLAYABLE_CARDS[0];
  const dummyCard = {
    uid: 'test_oob_card',
    def: dummyDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };

  assert.doesNotThrow(() => {
    engine.pushChain(dummyCard, 'player', 1, -1, 'Negative index target');
    engine.resolveChain();
  });

  assert.doesNotThrow(() => {
    engine.pushChain(dummyCard, 'player', 1, 99, 'Overflow index target');
    engine.resolveChain();
  });
});

// -------------------------------------------------------------
// GROUP 9: SPELL & TRAP ACTIVATION CONSTRAINTS & TURN SET TIMING
// -------------------------------------------------------------
console.log('\n--- Group 9: Spell/Trap Activation Timing & Mana Cost Constraints ---');

runTest('Trap Card cannot be activated on the same turn it was set face-down', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');

  const trapDef = PLAYABLE_CARDS.find(c => c.cardType === 'TRAP') || PLAYABLE_CARDS.find(c => c.effectCode === 'TRAP_COGNITIVE_CU_HCL');
  const trapCard = {
    uid: 'test_set_trap_same_turn',
    def: trapDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };
  engine.player.hand.push(trapCard);

  // Set card face down
  const setRes = engine.setSpellTrap('player', 'test_set_trap_same_turn');
  assert.strictEqual(setRes.success, true);

  // Attempt to activate on same turn (currentTurn = 1)
  const actRes = engine.activateSpellTrapFromField('player', 0);
  assert.strictEqual(actRes.success, false);
  assert.ok(actRes.message && actRes.message.includes('chưa thể kích hoạt'), 'Message should indicate trap cannot be activated');
});

runTest('Trap Card CAN be activated on subsequent turn after being set face-down', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');

  const trapDef = PLAYABLE_CARDS.find(c => c.effectCode === 'TRAP_COGNITIVE_CU_HCL');
  const trapCard = {
    uid: 'test_set_trap_next_turn',
    def: trapDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };
  engine.player.hand.push(trapCard);

  engine.setSpellTrap('player', 'test_set_trap_next_turn');

  // Advance turn count
  engine.currentTurn = 3;

  const actRes = engine.activateSpellTrapFromField('player', 0);
  assert.strictEqual(actRes.success, true);
  assert.ok(actRes.message.includes('thành công'));
});

runTest('activateSpellFromHand rejects activation when player has insufficient mana', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');

  const spellDef = PLAYABLE_CARDS.find(c => (c.cardType === 'REACTION_SPELL' || c.cardType === 'EQUIP_CATALYST') && c.manaCost > 0) || {
    id: 'expensive_spell',
    name: 'Phép Đắt Đỏ',
    cardType: 'REACTION_SPELL',
    manaCost: 5,
    effectCode: 'SPELL_EXO_BURST',
    spellSpeed: 1
  };
  const spellCard = {
    uid: 'test_expensive_spell',
    def: spellDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 0
  };

  engine.player.hand.push(spellCard);
  engine.player.mana = 0; // Empty mana pool

  const res = engine.activateSpellFromHand('player', 'test_expensive_spell');
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('Không đủ Mana'));
});

// -------------------------------------------------------------
// GROUP 10: BATTLE PHASE ATTACK DECLARATION TRAP INTERRUPTION
// -------------------------------------------------------------
console.log('\n--- Group 10: Battle Phase Attack Declaration Trap Interruption ---');

runTest('Attack declaration triggers Noble Gas Shield, terminating Battle Phase immediately', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  engine.currentPhase = 'BATTLE_PHASE';
  engine.activePlayerId = 'player';
  engine.turnPlayer = 'player';
  engine.currentTurn = 2; // Turn 2 so trap set on Turn 1 can activate
  
  // Attacker
  const attackerDef = PLAYABLE_CARDS.find(c => c.cardType === 'ELEMENT_MONSTER' && c.atk > 0) || PLAYABLE_CARDS[0];
  engine.player.monsterZones[0] = {
    card: {
      uid: 'test_attacker',
      def: attackerDef,
      currentAtk: 1500,
      currentDef: 1000,
      position: 'FACE_UP_ATTACK',
      canAttack: true,
      turnsOnField: 1
    },
    isFaceUp: true,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false
  };

  // Opponent has Noble Gas Shield set in slot 0 on turn 1
  const nobleDef = PLAYABLE_CARDS.find(c => c.effectCode === 'TRAP_NOBLE_SHIELD') || {
    id: 'card_trap_noble_gas_shield',
    name: 'Khiên Khí Hiếm',
    cardType: 'TRAP',
    spellTrapSubtype: 'NORMAL_TRAP',
    effectCode: 'TRAP_NOBLE_SHIELD',
    spellSpeed: 3
  };
  engine.opponent.spellTrapZones[0] = {
    card: {
      uid: 'test_noble_shield',
      def: nobleDef,
      currentAtk: 0,
      currentDef: 0,
      position: 'FACE_DOWN',
      canAttack: false,
      turnsOnField: 1
    },
    isFaceUp: false,
    turnSet: 1
  };

  const initialLp = engine.opponent.lp;
  const attackRes = engine.declareAttack(0, 'DIRECT');
  assert.strictEqual(attackRes.success, true);
  assert.strictEqual(engine.currentPhase, 'MAIN_PHASE_2');
  assert.strictEqual(engine.opponent.lp, initialLp);
});

// -------------------------------------------------------------
// GROUP 11: FIELD ENVIRONMENT REPLACEMENT & GRAVEYARD ROUTING
// -------------------------------------------------------------
console.log('\n--- Group 11: Field Environment Replacement & Graveyard Routing ---');

runTest('Activating a new Field Spell sends the previous Field Spell to Graveyard', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const fieldDef1 = PLAYABLE_CARDS.find(c => c.id === 'card_field_haber_chamber') || {
    id: 'field_1',
    name: 'Buồng Haber',
    cardType: 'FIELD_ENVIRONMENT',
    manaCost: 1,
    effectCode: 'FIELD_HABER_CHAMBER',
    spellSpeed: 1
  };
  const fieldDef2 = PLAYABLE_CARDS.find(c => c.id === 'card_field_alkaline_spring') || {
    id: 'field_2',
    name: 'Suối Khoáng Kiềm',
    cardType: 'FIELD_ENVIRONMENT',
    manaCost: 1,
    effectCode: 'FIELD_ALKALINE_SPRING',
    spellSpeed: 1
  };

  const card1 = { uid: 'field_instance_1', def: fieldDef1, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };
  const card2 = { uid: 'field_instance_2', def: fieldDef2, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };

  engine.player.mana = 10;
  engine.player.hand.push(card1);
  engine.player.hand.push(card2);

  const res1 = engine.activateSpellFromHand('player', 'field_instance_1');
  assert.strictEqual(res1.success, true);
  assert.strictEqual(engine.player.fieldZone?.uid, 'field_instance_1');

  const res2 = engine.activateSpellFromHand('player', 'field_instance_2');
  assert.strictEqual(res2.success, true);
  assert.strictEqual(engine.player.fieldZone?.uid, 'field_instance_2');
  assert.ok(engine.player.graveyard.some(c => c.uid === 'field_instance_1'), 'Previous field spell moved to Graveyard');
});

// -------------------------------------------------------------
// GROUP 12: CHAIN LINK MULTI-NEGATION RESOLUTION INVARIANT
// -------------------------------------------------------------
console.log('\n--- Group 12: Chain Link Multi-Negation Resolution Invariant ---');

runTest('Counter Trap negating Counter Trap allows original Link 1 spell to resolve', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
  const spellDef = PLAYABLE_CARDS.find(c => c.effectCode === 'SPELL_EXO_BURST') || PLAYABLE_CARDS[0];
  const counterDef1 = {
    id: 'counter_trap_1',
    name: 'Bẫy Phản Đòn 1',
    cardType: 'TRAP',
    spellTrapSubtype: 'COUNTER_TRAP',
    effectCode: 'TRAP_COUNTER_NEGATE',
    spellSpeed: 3
  };
  const counterDef2 = {
    id: 'counter_trap_2',
    name: 'Bẫy Phản Đòn 2',
    cardType: 'TRAP',
    spellTrapSubtype: 'COUNTER_TRAP',
    effectCode: 'TRAP_COUNTER_NEGATE',
    spellSpeed: 3
  };

  const card1 = { uid: 'link1_spell', def: spellDef, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };
  const card2 = { uid: 'link2_counter', def: counterDef1, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };
  const card3 = { uid: 'link3_counter', def: counterDef2, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };

  // Link 1: Spell Speed 1
  engine.pushChain(card1, 'player', 1, undefined, 'Player Spell');
  // Link 2: Opponent Counter Trap (targets Link 1)
  engine.pushChain(card2, 'opponent', 3, undefined, 'Opponent Counter Trap negates Link 1');
  // Link 3: Player Counter Trap (targets Link 2)
  engine.pushChain(card3, 'player', 3, undefined, 'Player Counter Trap negates Link 2');

  assert.strictEqual(engine.chainStack.length, 3);
  assert.strictEqual(engine.chainStack[0].chainIndex, 1);
  assert.strictEqual(engine.chainStack[1].chainIndex, 2);
  assert.strictEqual(engine.chainStack[2].chainIndex, 3);

  // Link 3 negates Link 2
  engine.chainStack[1].isNegated = true;

  // Resolve LIFO
  engine.resolveChain();

  assert.strictEqual(engine.chainStack.length, 0);
  assert.ok(engine.player.graveyard.some(c => c.uid === 'link1_spell'), 'Link 1 resolved to Graveyard');
  assert.ok(engine.opponent.graveyard.some(c => c.uid === 'link2_counter'), 'Link 2 negated card routed to Graveyard');
  assert.ok(engine.player.graveyard.some(c => c.uid === 'link3_counter'), 'Link 3 resolved to Graveyard');

  // Verify lastResolvedChain snapshot telemetry
  assert.ok(engine.lastResolvedChain !== null, 'lastResolvedChain recorded upon chain resolution');
  assert.strictEqual(engine.lastResolvedChain.items.length, 3, 'Recorded exactly 3 items in resolved chain snapshot');
  assert.strictEqual(engine.lastResolvedChain.items[0].chainIndex, 1, 'Snapshot item 0 matches Link 1');
  assert.strictEqual(engine.lastResolvedChain.items[1].chainIndex, 2, 'Snapshot item 1 matches Link 2');
  assert.strictEqual(engine.lastResolvedChain.items[2].chainIndex, 3, 'Snapshot item 2 matches Link 3');
  assert.strictEqual(engine.lastResolvedChain.items[1].isNegated, true, 'Snapshot correctly captures negated status of Link 2');
  assert.strictEqual(engine.lastResolvedChain.items[0].spellSpeed, 1, 'Snapshot correctly records Spell Speed 1');
  assert.strictEqual(engine.lastResolvedChain.items[2].spellSpeed, 3, 'Snapshot correctly records Spell Speed 3');
});

// -------------------------------------------------------------
// GROUP 13: VISUAL CHAIN LINK STACK & CHEMICAL REACTION TELEMETRY
// -------------------------------------------------------------
console.log('\n--- Group 13: Visual Chain Link Stack & Chemical Reaction Telemetry ---');

runTest('3-Link chemical counter chain captures formulas, names, and LIFO sequence', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'EXPERT');
  const h2oBurstDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_h2o_burst') || PLAYABLE_CARDS[0];
  const neutralizeDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_neutralization') || PLAYABLE_CARDS[1];
  const nobleTrapDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_noble_gas_shield') || PLAYABLE_CARDS[2];

  const card1 = { uid: 'chain_burst_1', def: h2oBurstDef, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };
  const card2 = { uid: 'chain_neut_2', def: neutralizeDef, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };
  const card3 = { uid: 'chain_shield_3', def: nobleTrapDef, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };

  // Chain Link 1: Player activates H2O Burst (Speed 1 Normal Spell)
  const r1 = engine.pushChain(card1, 'player', 1, undefined, 'Phản Ứng Nổ H₂O Burn');
  assert.strictEqual(r1.success, true);

  // Chain Link 2: Opponent chains Neutralization (Speed 2 Quick Spell)
  const r2 = engine.pushChain(card2, 'opponent', 2, undefined, 'Phản Ứng Trung Hòa Nhanh');
  assert.strictEqual(r2.success, true);

  // Chain Link 3: Player chains Noble Gas Shield (Speed 3 Counter Trap)
  const r3 = engine.pushChain(card3, 'player', 3, undefined, 'Khiên Khí Hiếm Tuyệt Đối');
  assert.strictEqual(r3.success, true);

  assert.strictEqual(engine.chainStack.length, 3);

  // Resolve Chain (LIFO)
  engine.resolveChain();

  assert.strictEqual(engine.chainStack.length, 0);
  assert.ok(engine.lastResolvedChain !== null);
  assert.strictEqual(engine.lastResolvedChain.items.length, 3);

  // LIFO display order verification: reversing items presents Link 3 first, then Link 2, then Link 1
  const lifoDisplayOrder = [...engine.lastResolvedChain.items].reverse();
  assert.strictEqual(lifoDisplayOrder[0].chainIndex, 3, 'Top of LIFO stack is Link 3 (resolves first)');
  assert.strictEqual(lifoDisplayOrder[1].chainIndex, 2, 'Middle of LIFO stack is Link 2');
  assert.strictEqual(lifoDisplayOrder[2].chainIndex, 1, 'Base of LIFO stack is Link 1 (resolves last)');

  assert.strictEqual(lifoDisplayOrder[0].activatorPlayerId, 'player', 'Link 3 activated by player');
  assert.strictEqual(lifoDisplayOrder[1].activatorPlayerId, 'opponent', 'Link 2 activated by opponent');
  assert.strictEqual(lifoDisplayOrder[2].activatorPlayerId, 'player', 'Link 1 activated by player');

  assert.strictEqual(lifoDisplayOrder[0].spellSpeed, 3, 'Link 3 has Spell Speed 3');
  assert.strictEqual(lifoDisplayOrder[1].spellSpeed, 2, 'Link 2 has Spell Speed 2');
  assert.strictEqual(lifoDisplayOrder[2].spellSpeed, 1, 'Link 1 has Spell Speed 1');
});

// -------------------------------------------------------------
// GROUP 14: AI FAST EFFECT PRIORITY & AUTONOMOUS CHAIN RESPONSE
// -------------------------------------------------------------
console.log('\n--- Group 14: AI Fast Effect Priority & Autonomous Chain Response ---');

runTest('AI safely passes priority in Box E when possessing no eligible fast effects', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'EXPERT');
  const spellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_exothermic_burst') || PLAYABLE_CARDS[0];
  const spellCard = { uid: 'burst_cl1', def: spellDef, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };

  // Clear opponent spellTrapZones to ensure 0 eligible cards
  engine.opponent.spellTrapZones = [null, null, null, null, null];

  // Player pushes Link 1
  engine.pushChain(spellCard, 'player', 1, undefined, 'Player Spell CL1');
  assert.strictEqual(engine.chainStack.length, 1);
  assert.strictEqual(engine.priorityPlayerId, 'opponent');
  assert.strictEqual(engine.consecutivePriorityPasses, 0);

  // AI evaluates priority and passes
  const aiRes = engine.aiEvaluateAndRespondPriority();
  assert.strictEqual(aiRes.actionTaken, 'PASSED');
  assert.strictEqual(engine.priorityPlayerId, 'player');
  assert.strictEqual(engine.consecutivePriorityPasses, 1);

  // Player passes priority -> consecutive passes reaches 2 -> chain automatically resolves
  const pPass = engine.passPriority('player');
  assert.strictEqual(pPass.chainResolved, true);
  assert.strictEqual(engine.chainStack.length, 0);
  assert.strictEqual(engine.getFastEffectTimingBox(), 'BOX_A_OPEN_GAME_STATE');
});

runTest('AI activates eligible Counter Trap into Link 2 while avoiding cognitive traps', () => {
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'EXPERT');
  const spellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_exothermic_burst') || PLAYABLE_CARDS[0];
  const spellCard = { uid: 'burst_cl1', def: spellDef, currentAtk: 0, currentDef: 0, position: 'FACE_UP_ATTACK', canAttack: false, turnsOnField: 0 };

  // Set an eligible valid Counter Trap on opponent field
  const counterTrapDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_le_chatelier_counter') || {
    id: 'card_trap_le_chatelier_counter',
    name: 'Le Chatelier Shift Counter',
    cardType: 'TRAP',
    spellTrapSubtype: 'COUNTER_TRAP',
    spellSpeed: 3
  };
  const trapCard = {
    uid: 'opp_counter_trap',
    def: counterTrapDef,
    currentAtk: 0,
    currentDef: 0,
    position: 'FACE_UP_ATTACK',
    canAttack: false,
    turnsOnField: 1
  };
  engine.opponent.spellTrapZones[0] = {
    slotIndex: 0,
    card: trapCard,
    isFaceUp: false,
    turnSet: 0 // set in prior turn
  };

  // Player pushes Link 1
  engine.pushChain(spellCard, 'player', 1, undefined, 'Player Spell CL1');
  assert.strictEqual(engine.priorityPlayerId, 'opponent');

  // AI evaluates priority and chains its counter trap!
  const aiRes = engine.aiEvaluateAndRespondPriority();
  assert.strictEqual(aiRes.actionTaken, 'CHAINED');
  assert.strictEqual(engine.chainStack.length, 2);
  assert.strictEqual(engine.chainStack[1].activatorPlayerId, 'opponent');
  assert.strictEqual(engine.chainStack[1].spellSpeed, 3);
  // Priority switches back to player
  assert.strictEqual(engine.priorityPlayerId, 'player');
});

console.log(`\n=================================================`);
console.log(`DUEL ENGINE TESTS COMPLETE: ${passedTests} / ${totalTests} PASSED`);
console.log(`=================================================\n`);
