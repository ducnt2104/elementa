// test-auto-trap-triggers.mjs
// Verification of Event-Driven Automatic Trap Detection and Triggering Engine

import { DuelEngine } from './src/domain/duelEngine.ts';
import { getPlayableCardById } from './src/data/playableCardsData.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('=== VERIFYING EVENT-DRIVEN AUTOMATIC TRAP ENGINE ===\n');

// ---------------------------------------------------------
// TEST 1: Noble Gas Shield automatically triggers on ATTACK_DECLARED
// ---------------------------------------------------------
console.log('[TEST 1] Noble Gas Shield Auto-Trigger on Attack:');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'BATTLE_PHASE';
  engine.currentTurn = 2; // Armed: turnSet = 1 < currentTurn = 2
  engine.activePlayerId = 'opponent'; // Opponent attacks player

  // Setup opponent attacker: Natri at slot 0 (ATK 1800)
  const naDef = getPlayableCardById('card_elem_11_na');
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'opp_na_1', def: naDef, currentZone: 'MONSTER_ZONE', ownerPlayerId: 'opponent', turnSummoned: 1 },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Setup player face-down Noble Gas Shield in S/T zone 0 set on Turn 1
  const shieldDef = getPlayableCardById('card_trap_noble_gas_shield');
  engine.player.spellTrapZones[0] = {
    slotIndex: 0,
    card: { uid: 'player_trap_1', def: shieldDef, currentZone: 'SPELL_TRAP_ZONE', ownerPlayerId: 'player', turnSummoned: 1 },
    isFaceUp: false,
    turnSet: 1
  };

  const initialPlayerLp = engine.player.lp;

  // Opponent declares attack against player
  const result = engine.declareAttack(0, 'DIRECT');

  assert(result.success === true, 'Attack declaration executed');
  assert(engine.player.lp === initialPlayerLp, `Player LP took 0 damage (LP: ${engine.player.lp})`);
  assert(engine.player.spellTrapZones[0] === null, 'Noble Gas Shield was consumed from S/T zone');
  
  // Verify combat log recorded automatic trigger
  const logHasAutoTrigger = engine.logs.some(l => l.message.includes('[BẪY TỰ KÍCH HOẠT]') && l.message.includes('Bức Tường Khí Hiếm') || l.message.includes('Noble Gas Shield') || l.message.includes('Khí Hiếm'));
  assert(logHasAutoTrigger, 'Combat log contains [BẪY TỰ KÍCH HOẠT] message');
}

// ---------------------------------------------------------
// TEST 2: Precipitation Trap automatically triggers on ATTACK_DECLARED
// ---------------------------------------------------------
console.log('\n[TEST 2] Precipitation Trap Auto-Trigger on Attack:');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'BATTLE_PHASE';
  engine.currentTurn = 2;
  engine.activePlayerId = 'opponent';

  const clDef = getPlayableCardById('card_elem_17_cl');
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'opp_cl_1', def: clDef, currentZone: 'MONSTER_ZONE', ownerPlayerId: 'opponent', turnSummoned: 1 },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const precipDef = getPlayableCardById('card_trap_precipitation_trap');
  engine.player.spellTrapZones[0] = {
    slotIndex: 0,
    card: { uid: 'player_precip_1', def: precipDef, currentZone: 'SPELL_TRAP_ZONE', ownerPlayerId: 'player', turnSummoned: 1 },
    isFaceUp: false,
    turnSet: 1
  };

  const result = engine.declareAttack(0, 'DIRECT');
  assert(result.success === true, 'Attack declaration resolved');
  assert(engine.opponent.monsterZones[0].position === 'FACE_DOWN_DEFENSE', 'Attacking monster forced into FACE_DOWN_DEFENSE by BaSO4 precipitate');
  assert(engine.player.spellTrapZones[0] === null, 'Precipitation Trap consumed from S/T zone');
}

// ---------------------------------------------------------
// TEST 3: Cognitive Copper Trap automatically triggers and inflicts 1000 LP
// ---------------------------------------------------------
console.log('\n[TEST 3] Cognitive Copper Trap Auto-Trigger on Attack:');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'BATTLE_PHASE';
  engine.currentTurn = 2;
  engine.activePlayerId = 'opponent';

  const feDef = getPlayableCardById('card_elem_26_fe');
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'opp_fe_1', def: feDef, currentZone: 'MONSTER_ZONE', ownerPlayerId: 'opponent', turnSummoned: 1 },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const cuTrapDef = getPlayableCardById('card_trap_cognitive_copper');
  engine.player.spellTrapZones[0] = {
    slotIndex: 0,
    card: { uid: 'player_cu_trap_1', def: cuTrapDef, currentZone: 'SPELL_TRAP_ZONE', ownerPlayerId: 'player', turnSummoned: 1 },
    isFaceUp: false,
    turnSet: 1
  };

  const oppLpBefore = engine.opponent.lp;
  const result = engine.declareAttack(0, 'DIRECT');

  assert(result.success === true, 'Attack declaration resolved');
  assert(engine.opponent.lp === oppLpBefore - 1000, `Opponent lost 1000 LP from Cu + HCl misconception (Expected ${oppLpBefore - 1000}, Actual ${engine.opponent.lp})`);
  assert(engine.player.spellTrapZones[0] === null, 'Cognitive Trap consumed from S/T zone');
}

// ---------------------------------------------------------
// TEST 4: Ammonium Smoke automatically triggers on MONSTER_SUMMONED
// ---------------------------------------------------------
console.log('\n[TEST 4] Ammonium Smoke Auto-Trigger on Monster Summon:');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.currentTurn = 2;
  engine.activePlayerId = 'opponent';

  // Player has armed Ammonium Smoke trap
  const smokeDef = getPlayableCardById('card_trap_ammonium_smoke');
  engine.player.spellTrapZones[0] = {
    slotIndex: 0,
    card: { uid: 'player_smoke_1', def: smokeDef, currentZone: 'SPELL_TRAP_ZONE', ownerPlayerId: 'player', turnSummoned: 1 },
    isFaceUp: false,
    turnSet: 1
  };

  // Opponent normal summons Na (ATK 1800)
  const naDef = getPlayableCardById('card_elem_11_na');
  engine.opponent.hand.push({
    uid: 'opp_na_hand_1',
    def: naDef,
    currentZone: 'HAND',
    ownerPlayerId: 'opponent',
    turnSummoned: 2
  });
  engine.opponent.mana = 10;

  const summonRes = engine.normalSummon('opponent', 'opp_na_hand_1', 'FACE_UP_ATTACK', [], 0);

  assert(summonRes.success === true, 'Opponent summoned Na successfully');
  assert(engine.player.spellTrapZones[0] === null, 'Ammonium Smoke was auto-triggered and consumed');
  
  // Verify NH4Cl smoke debuffed the monster ATK by 600
  const summonedSlot = engine.opponent.monsterZones[0];
  assert(summonedSlot !== null && summonedSlot.tempAtkBoost <= -600, `Summoned monster debuffed with -600 ATK (tempAtkBoost: ${summonedSlot?.tempAtkBoost})`);
}

// ---------------------------------------------------------
// TEST 5: Le Chatelier Counter Trap automatically triggers on SPELL_ACTIVATED
// ---------------------------------------------------------
console.log('\n[TEST 5] Le Chatelier Counter Trap Auto-Trigger on Spell Cast:');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.currentTurn = 2;
  engine.activePlayerId = 'opponent';

  // Player has armed Le Chatelier Counter Trap (Speed 3)
  const counterDef = getPlayableCardById('card_trap_le_chatelier_counter');
  engine.player.spellTrapZones[0] = {
    slotIndex: 0,
    card: { uid: 'player_counter_1', def: counterDef, currentZone: 'SPELL_TRAP_ZONE', ownerPlayerId: 'player', turnSummoned: 1 },
    isFaceUp: false,
    turnSet: 1
  };

  // Opponent attempts to activate Mass Spec Draw spell
  const spellDef = getPlayableCardById('card_spell_mass_spec_draw');
  engine.opponent.hand.push({
    uid: 'opp_spell_1',
    def: spellDef,
    currentZone: 'HAND',
    ownerPlayerId: 'opponent',
    turnSummoned: 2
  });
  engine.opponent.mana = 10;

  const handCountBefore = engine.opponent.hand.length;
  const spellRes = engine.activateSpellFromHand('opponent', 'opp_spell_1');

  assert(spellRes.success === true, 'Spell activation processed into chain');
  assert(engine.player.spellTrapZones[0] === null, 'Le Chatelier Counter was auto-triggered and consumed');
  
  // The spell was negated by Le Chatelier counter, so opponent did not draw cards
  // (handCount went down by 1 because spell was consumed from hand)
  assert(engine.opponent.hand.length === handCountBefore - 1, 'Spell effect was negated and drew 0 additional cards');
}

// ---------------------------------------------------------
// TEST 6: Traps set in CURRENT turn cannot auto-trigger (Rulebook v10 tr. 32)
// ---------------------------------------------------------
console.log('\n[TEST 6] Traps set in Current Turn CANNOT Auto-Trigger:');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'BATTLE_PHASE';
  engine.currentTurn = 2;
  engine.activePlayerId = 'opponent';

  // Player set trap on Turn 2 (current turn)
  const shieldDef = getPlayableCardById('card_trap_noble_gas_shield');
  engine.player.spellTrapZones[0] = {
    slotIndex: 0,
    card: { uid: 'player_trap_fresh', def: shieldDef, currentZone: 'SPELL_TRAP_ZONE', ownerPlayerId: 'player', turnSummoned: 2 },
    isFaceUp: false,
    turnSet: 2 // Same turn!
  };

  const naDef = getPlayableCardById('card_elem_11_na');
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'opp_na_fresh', def: naDef, currentZone: 'MONSTER_ZONE', ownerPlayerId: 'opponent', turnSummoned: 1 },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  engine.declareAttack(0, 'DIRECT');
  assert(engine.player.spellTrapZones[0] !== null, 'Trap set in current turn remains face-down (cannot trigger on same turn set)');
}

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
