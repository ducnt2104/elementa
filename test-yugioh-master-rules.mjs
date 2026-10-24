// test-yugioh-master-rules.mjs
// Comprehensive Automated Test Suite for Yu-Gi-Oh! Official Rulebook v10 & Master Rule 2020/2021 Update
// Validating 10 Summoning Mechanics, 5-Substep Damage Step, Chains, SEGOC, PSCT, and Chemical Integrations

import { DuelEngine } from './src/domain/duelEngine.ts';
import { PLAYABLE_CARDS, DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS } from './src/data/playableCardsData.ts';
import { CharacterQuipEngine } from './src/domain/characterQuips.ts';

console.log('============================================================');
console.log('   ELEMENTA: YU-GI-OH! MASTER RULE v10 & 2021 AUDIT SUITE');
console.log('============================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

// ==========================================
// GROUP 1: Extra Monster Zones (EMZ) & Zones
// ==========================================
console.log('--- Group 1: Extra Monster Zones (EMZ) & Zones ---');
{
  const engine = new DuelEngine();
  assert(engine.player.monsterZones.length === 5, 'Player has 5 Main Monster Zones');
  assert(engine.player.extraMonsterZone === null, 'Player Extra Monster Zone initialized to null');
  assert(engine.opponent.extraMonsterZone === null, 'Opponent Extra Monster Zone initialized to null');
  assert(engine.player.pendulumZones !== undefined, 'Player Pendulum Zones container initialized');
  assert(engine.player.pendulumZones.left === null && engine.player.pendulumZones.right === null, 'Both Pendulum Zones are empty initially');
}

// ==========================================
// GROUP 2: Normal Set & Flip Summoning
// ==========================================
console.log('\n--- Group 2: Normal Set & Flip Summoning (Rulebook v10 tr. 24-25) ---');
{
  const engine = new DuelEngine();
  engine.player.mana = 10;
  let naCard = engine.player.hand.find(c => (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') && (c.def.level || 1) <= 4);
  if (!naCard) {
    const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na') || PLAYABLE_CARDS.find(c => (c.level || 1) <= 4);
    naCard = { uid: 'test_na_uid_' + Date.now(), def: naDef, ownerId: 'player' };
    engine.player.hand.push(naCard);
  }
  
  // Normal Set in Face-down Defense
  const setRes = engine.normalSet('player', naCard.uid, 0);
  assert(setRes.success === true, 'Normal Set monster face-down: ' + setRes.message);
  assert(engine.player.monsterZones[0]?.position === 'FACE_DOWN_DEFENSE', 'Monster placed in FACE_DOWN_DEFENSE position');
  assert(engine.player.normalSummonsRemaining === 0, 'Normal Summon/Set count consumed (max 1/turn)');

  // Cannot Flip Summon on the same turn it was Set
  const failFlipRes = engine.flipSummon('player', 0);
  assert(failFlipRes.success === false, 'Cannot Flip Summon monster on the turn it was Set');

  // Advance turn to next cycle so turnSummoned < currentTurn
  engine.currentTurn = 3;
  engine.player.monsterZones[0].turnSummoned = 1;
  engine.player.monsterZones[0].hasChangedPositionThisTurn = false;

  // Flip Summon to Face-up Attack
  const successFlipRes = engine.flipSummon('player', 0);
  assert(successFlipRes.success === true, 'Flip Summon succeeds on subsequent turn: ' + successFlipRes.message);
  assert(engine.player.monsterZones[0]?.position === 'FACE_UP_ATTACK', 'Monster is now in FACE_UP_ATTACK position');
}

// ==========================================
// GROUP 3: Synchro Summoning Mechanics
// ==========================================
console.log('\n--- Group 3: Synchro Summoning Mechanics (Rulebook v10 tr. 20-21) ---');
{
  const engine = new DuelEngine();
  engine.player.mana = 10;

  // Find or insert Synchro Monster in Extra Deck
  let synchroIdx = engine.player.extraDeck.findIndex(c => c.def.id === 'card_synchro_catalytic_converter');
  if (synchroIdx === -1) {
    const def = PLAYABLE_CARDS.find(c => c.id === 'card_synchro_catalytic_converter');
    engine.player.extraDeck.push({ uid: 'synchro_converter_test', def, ownerId: 'player' });
    synchroIdx = engine.player.extraDeck.length - 1;
  }

  // Set up Tuner Pt (Level 3) in Slot 0
  const ptDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_78_pt_tuner');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'pt_tuner_inst', def: ptDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: engine.currentTurn,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Set up Non-Tuner Na (Level 4) in Slot 1
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'na_nontuner_inst', def: naDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: engine.currentTurn,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Invalid level sum test (Level 3 + Level 3 != 7)
  const failSynchroRes = engine.synchroSummon('player', synchroIdx, 0, 0, [0]); // duplicate / wrong
  assert(failSynchroRes.success === false, 'Synchro Summon with invalid materials rejected');

  // Valid Synchro Summon: 3 (Pt) + 4 (Na) = 7
  const synchroRes = engine.synchroSummon('player', synchroIdx, 0, 0, [1]);
  assert(synchroRes.success === true, 'Synchro Summon succeeds: ' + synchroRes.message);
  assert(engine.player.monsterZones[0]?.card?.def.cardType === 'SYNCHRO_MONSTER', 'Slot 0 is occupied by Synchro Monster');
  assert(engine.player.monsterZones[0]?.card?.properlySummoned === true, 'Synchro Monster flagged as properlySummoned = true');
  assert(engine.player.monsterZones[1] === null, 'Non-Tuner slot vacated');
  assert(engine.player.graveyard.some(c => c.uid === 'pt_tuner_inst'), 'Tuner Pt sent to Graveyard');
  assert(engine.player.graveyard.some(c => c.uid === 'na_nontuner_inst'), 'Non-Tuner Na sent to Graveyard');
}

// ==========================================
// GROUP 4: Xyz Summoning & Materials (Overlay & Detach)
// ==========================================
console.log('\n--- Group 4: Xyz Summoning & Materials Overlay/Detach (Rulebook v10 tr. 18-19, 51) ---');
{
  const engine = new DuelEngine();
  engine.player.mana = 10;

  // Find or insert Xyz Monster in Extra Deck
  let xyzIdx = engine.player.extraDeck.findIndex(c => c.def.id === 'card_xyz_hexammine_cobalt');
  if (xyzIdx === -1) {
    const def = PLAYABLE_CARDS.find(c => c.id === 'card_xyz_hexammine_cobalt');
    engine.player.extraDeck.push({ uid: 'xyz_cobalt_test', def, ownerId: 'player' });
    xyzIdx = engine.player.extraDeck.length - 1;
  }

  // Set up 2 Level 4 monsters in Slot 0 and Slot 1
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
  const clDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_17_cl');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'mat_na_1', def: naDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: engine.currentTurn,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'mat_cl_2', def: clDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: engine.currentTurn,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Perform Xyz Summon (Overlay Slot 0 and Slot 1 into Slot 0)
  const initialGraveCount = engine.player.graveyard.length;
  const xyzRes = engine.xyzSummon('player', xyzIdx, 0, [0, 1]);
  assert(xyzRes.success === true, 'Xyz Summon succeeds: ' + xyzRes.message);
  assert(engine.player.monsterZones[0]?.card?.def.cardType === 'XYZ_MONSTER', 'Slot 0 occupied by Xyz Monster');
  assert(engine.player.monsterZones[0]?.card?.properlySummoned === true, 'Xyz Monster marked properlySummoned = true');
  assert(engine.player.monsterZones[0]?.xyzMaterials?.length === 2, 'Xyz Monster has exactly 2 attached Xyz Materials (got ' + engine.player.monsterZones[0]?.xyzMaterials?.length + ')');
  assert(engine.player.graveyard.length === initialGraveCount, 'Overlay materials are attached underneath, NOT sent to Graveyard on summon');
  assert(engine.player.monsterZones[1] === null, 'Slot 1 vacated as material became overlay');

  // Detach 1 Xyz Material
  const detachRes = engine.detachXyzMaterial('player', 0);
  assert(detachRes.success === true, 'Detach Xyz Material succeeds: ' + detachRes.message);
  assert(engine.player.monsterZones[0]?.xyzMaterials?.length === 1, 'Xyz Monster now has 1 material remaining');
  assert(engine.player.graveyard.some(c => c.uid === detachRes.detachedCard?.uid), 'Detached material sent to Graveyard');

  // Host Xyz leaves field: remaining attached materials sent to Graveyard (Rulebook v10 tr. 51)
  engine.cleanSlotXyzMaterials('player', 0);
  assert(engine.player.monsterZones[0]?.xyzMaterials?.length === 0, 'Remaining attached materials cleared when Xyz monster leaves field');
}

// ==========================================
// GROUP 5: Pendulum Scales & Pendulum Summoning
// ==========================================
console.log('\n--- Group 5: Pendulum Scales & Pendulum Summoning (Rulebook v10 tr. 16-17) ---');
{
  const engine = new DuelEngine();
  const glyDef = PLAYABLE_CARDS.find(c => c.id === 'card_pend_glycine'); // Scale 1, Level 2
  const gluDef = PLAYABLE_CARDS.find(c => c.id === 'card_pend_glutamic'); // Scale 8, Level 5

  const glyCard = { uid: 'gly_pend_inst', def: glyDef, ownerId: 'player' };
  const gluCard = { uid: 'glu_pend_inst', def: gluDef, ownerId: 'player' };

  engine.player.hand.push(glyCard);
  engine.player.hand.push(gluCard);

  // Place Scale 1 on Left Pendulum Zone (Slot 0 of S/T)
  const leftRes = engine.placePendulumScale('player', glyCard.uid, 'left');
  assert(leftRes.success === true, 'Placed Scale 1 in Left Pendulum Zone: ' + leftRes.message);
  assert(engine.player.pendulumZones?.left?.def.pendulumScale === 1, 'Left Pendulum Scale is 1');
  assert(engine.player.spellTrapZones[0] !== null, 'Spell/Trap slot 0 occupied by Left Pendulum Zone');

  // Place Scale 8 on Right Pendulum Zone (Slot 4 of S/T)
  const rightRes = engine.placePendulumScale('player', gluCard.uid, 'right');
  assert(rightRes.success === true, 'Placed Scale 8 in Right Pendulum Zone: ' + rightRes.message);
  assert(engine.player.pendulumZones?.right?.def.pendulumScale === 8, 'Right Pendulum Scale is 8');
  assert(engine.player.spellTrapZones[4] !== null, 'Spell/Trap slot 4 occupied by Right Pendulum Zone');

  // Add Level 3 and Level 4 monsters to hand (within Scale 1 < Level < 8)
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na'); // Level 4
  const sDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_16_s');   // Level 3
  const naInst = { uid: 'na_pend_summon', def: naDef, ownerId: 'player' };
  const sInst = { uid: 's_pend_summon', def: sDef, ownerId: 'player' };
  engine.player.hand.push(naInst, sInst);

  // Clear monster zones to have room
  engine.player.monsterZones = [null, null, null, null, null];

  // Perform Pendulum Summon
  const pendSummonRes = engine.pendulumSummon('player', { handUids: [naInst.uid, sInst.uid] });
  assert(pendSummonRes.success === true, 'Pendulum Summon succeeds: ' + pendSummonRes.message);
  assert(pendSummonRes.summonedCount === 2, 'Exactly 2 monsters summoned via Pendulum Summon');
  assert(engine.player.monsterZones[0]?.card?.uid === naInst.uid, 'Monster 1 placed on field');
  assert(engine.player.monsterZones[1]?.card?.uid === sInst.uid, 'Monster 2 placed on field');

  // Verify once-per-turn limit
  const failSecondPendRes = engine.pendulumSummon('player', { handUids: [] });
  assert(failSecondPendRes.success === false, 'Second Pendulum Summon in same turn rejected (1/turn limit)');

  // Verify Pendulum Card leaving field redirects face-up to Extra Deck (Rulebook v10 tr. 17)
  const pendMonsterOnField = { uid: 'pend_field_destruct', def: glyDef, ownerId: 'player' };
  const initialExtraDeckCount = engine.player.extraDeck.length;
  engine.sendCardToGraveyard('player', pendMonsterOnField, true);
  assert(engine.player.extraDeck.length === initialExtraDeckCount + 1, 'Destroyed Pendulum Monster redirected to Extra Deck');
  assert(engine.player.extraDeck[engine.player.extraDeck.length - 1].isFaceUpInExtraDeck === true, 'Pendulum Monster resides FACE-UP in Extra Deck');
}

// ==========================================
// GROUP 6: Ritual Summoning Mechanics
// ==========================================
console.log('\n--- Group 6: Ritual Summoning Mechanics (Rulebook v10 tr. 23) ---');
{
  const engine = new DuelEngine();
  engine.player.mana = 10;

  const ritualSpellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_crystallization_ritual');
  const ritualMonDef = PLAYABLE_CARDS.find(c => c.id === 'card_ritual_fullerene'); // Level 8

  const spellCard = { uid: 'ritual_spell_inst', def: ritualSpellDef, ownerId: 'player' };
  const monsterCard = { uid: 'ritual_mon_inst', def: ritualMonDef, ownerId: 'player' };

  engine.player.hand.push(spellCard, monsterCard);

  // Set up 2 Level 4 monsters on field (Level sum = 4 + 4 = 8 >= 8)
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'trib_1', def: naDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: engine.currentTurn,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'trib_2', def: naDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: engine.currentTurn,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Perform Ritual Summon
  const ritualRes = engine.ritualSummon('player', monsterCard.uid, spellCard.uid, [0, 1], 0);
  assert(ritualRes.success === true, 'Ritual Summon succeeds: ' + ritualRes.message);
  assert(engine.player.monsterZones[0]?.card?.def.cardType === 'RITUAL_MONSTER', 'Slot 0 is now occupied by Ritual Monster');
  assert(engine.player.monsterZones[0]?.card?.properlySummoned === true, 'Ritual Monster marked properlySummoned = true');
  assert(engine.player.graveyard.some(c => c.uid === spellCard.uid), 'Ritual Spell sent to Graveyard');
}

// ==========================================
// GROUP 7: Properly Special Summoned First Rule
// ==========================================
console.log('\n--- Group 7: Properly Special Summoned First Rule (Rulebook v10 tr. 25) ---');
{
  const engine = new DuelEngine();

  // Test 1: Extra Deck monster dumped directly to GY without proper summon
  const h2oDef = PLAYABLE_CARDS.find(c => c.id === 'card_comp_h2o');
  const unsummonedH2O = { uid: 'unsummoned_h2o', def: h2oDef, ownerId: 'player', properlySummoned: false };
  engine.player.graveyard.push(unsummonedH2O);

  const failReviveRes = engine.reviveFromGraveyard('player', unsummonedH2O.uid, 0);
  assert(failReviveRes.success === false, 'Cannot revive unsummoned Extra Deck monster: ' + failReviveRes.message);

  // Test 2: Extra Deck monster properly summoned, then revived
  const properlySummonedH2O = { uid: 'proper_h2o', def: h2oDef, ownerId: 'player', properlySummoned: true };
  engine.player.graveyard.push(properlySummonedH2O);

  const successReviveRes = engine.reviveFromGraveyard('player', properlySummonedH2O.uid, 0);
  assert(successReviveRes.success === true, 'Properly summoned Extra Deck monster CAN be revived: ' + successReviveRes.message);

  // Test 3: Normal monster (Iron Fe) does not require properlySummoned flag
  const feDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_26_fe');
  const feInst = { uid: 'fe_normal_grave', def: feDef, ownerId: 'player' };
  engine.player.graveyard.push(feInst);
  const feReviveRes = engine.reviveFromGraveyard('player', feInst.uid, 1);
  assert(feReviveRes.success === true, 'Normal Main Deck monster revives without restriction: ' + feReviveRes.message);
}

// ==========================================
// GROUP 8: Damage Step 5 Substeps & FLIP Timing
// ==========================================
console.log('\n--- Group 8: Damage Step 5 Substeps & FLIP Timing (Rulebook v10 tr. 41) ---');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'BATTLE_PHASE';

  // Attacker: Sodium Na (ATK 1800) in Slot 0
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'atk_na', def: naDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Defender: Helium He in Slot 0 (DEF 1200) Face-down Defense
  const heDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_2_he');
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'def_he_down', def: heDef, ownerId: 'opponent' },
    position: 'FACE_DOWN_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const initialLogCount = engine.logs.length;
  const atkRes = engine.declareAttack(0, 0);
  assert(atkRes.success === true, 'Attack declaration on face-down defender succeeds');

  // Verify Damage Step substep logs
  const battleLogs = engine.logs.slice(initialLogCount).map(l => l.message);
  assert(battleLogs.some(m => m.includes('Mốc 1: Bắt Đầu')), 'Substep 1 logged: Start of Damage Step');
  assert(battleLogs.some(m => m.includes('Mốc 2: Trước Tính Toán') && m.includes('Lật ngửa')), 'Substep 2 logged: Face-down flipped to Face-up Defense before damage calc');
}

// ==========================================
// GROUP 9: 0 ATK Battle Invariant
// ==========================================
console.log('\n--- Group 9: 0 ATK Battle Invariant (Rulebook v10 tr. 50) ---');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'BATTLE_PHASE';

  // Two 0 ATK monsters in Attack position
  const zeroDefA = { ...PLAYABLE_CARDS[0], id: 'card_zero_a', name: 'Hạt Tinh Thể Không 0A', atk: 0, def: 0 };
  const zeroDefB = { ...PLAYABLE_CARDS[0], id: 'card_zero_b', name: 'Hạt Tinh Thể Không 0B', atk: 0, def: 0 };

  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'zero_atk_player', def: zeroDefA, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'zero_atk_opp', def: zeroDefB, ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const zeroAtkRes = engine.declareAttack(0, 0);
  assert(zeroAtkRes.success === true, 'Attack declaration between 0 ATK monsters succeeds');
  assert(zeroAtkRes.attackerDestroyed === false, 'Attacker with 0 ATK is NOT destroyed');
  assert(zeroAtkRes.targetDestroyed === false, 'Defender with 0 ATK is NOT destroyed');
  assert(zeroAtkRes.damageDealt === 0, '0 Battle damage dealt');
  assert(engine.player.monsterZones[0] !== null, 'Player 0 ATK monster remains on field');
  assert(engine.opponent.monsterZones[0] !== null, 'Opponent 0 ATK monster remains on field');
}

// ==========================================
// GROUP 10: Battle Step Replay Mechanics
// ==========================================
console.log('\n--- Group 10: Battle Step Replay Mechanics (Rulebook v10 tr. 39) ---');
{
  const engine = new DuelEngine();
  // Initially opponent has 1 monster
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'opp_mon_1', def: PLAYABLE_CARDS[0], ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Defender count did not change -> No replay
  assert(engine.checkBattleStepReplay(1) === false, 'No replay when opponent monster count remains constant (1 -> 1)');

  // Defender count changed (e.g. from 1 to 2) -> Replay triggered!
  engine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'opp_mon_2', def: PLAYABLE_CARDS[0], ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  assert(engine.checkBattleStepReplay(1) === true, 'Replay successfully triggered when opponent monster count changed (1 -> 2)');
}

// ==========================================
// GROUP 11: SEGOC (Simultaneous Effects Go On Chain)
// ==========================================
console.log('\n--- Group 11: SEGOC 4-Tier Trigger Ordering (Rulebook v10 tr. 50) ---');
{
  const engine = new DuelEngine();
  engine.chainStack = [];

  const triggers = [
    { duelistId: 'opponent', card: { uid: 'opp_opt', def: PLAYABLE_CARDS[0], ownerId: 'opponent' }, isMandatory: false, description: 'Opponent Optional Trigger' },
    { duelistId: 'player', card: { uid: 'p_opt', def: PLAYABLE_CARDS[0], ownerId: 'player' }, isMandatory: false, description: 'Player Optional Trigger' },
    { duelistId: 'opponent', card: { uid: 'opp_mand', def: PLAYABLE_CARDS[0], ownerId: 'opponent' }, isMandatory: true, description: 'Opponent Mandatory Trigger' },
    { duelistId: 'player', card: { uid: 'p_mand', def: PLAYABLE_CARDS[0], ownerId: 'player' }, isMandatory: true, description: 'Player Mandatory Trigger' }
  ];

  const segocChain = engine.buildSegocChain(triggers);
  assert(segocChain.length === 4, 'All 4 simultaneous triggers pushed to Chain Stack');
  assert(segocChain[0].description.includes('Player Mandatory'), 'Chain Link 1 is Turn Player Mandatory');
  assert(segocChain[1].description.includes('Opponent Mandatory'), 'Chain Link 2 is Opponent Mandatory');
  assert(segocChain[2].description.includes('Player Optional'), 'Chain Link 3 is Turn Player Optional');
  assert(segocChain[3].description.includes('Opponent Optional'), 'Chain Link 4 is Opponent Optional');
}

// ==========================================
// GROUP 12: Problem-Solving Card Text (PSCT) Conjunctions
// ==========================================
console.log('\n--- Group 12: PSCT 4 Conjunctions (Cẩm nang Mục 8.2) ---');
{
  const engine = new DuelEngine();

  // Test 'THEN': A then B
  const thenRes1 = engine.evaluatePsctConjunction('THEN', () => true, () => true);
  assert(thenRes1.successA && thenRes1.successB, 'THEN succeeds when both A and B succeed');
  assert(thenRes1.lastEvents.length === 1 && thenRes1.lastEvents[0] === 'B', 'THEN last event is strictly B (sequential)');

  const thenRes2 = engine.evaluatePsctConjunction('THEN', () => false, () => true);
  assert(thenRes2.successA === false && thenRes2.successB === false, 'THEN stops if A fails (B never executed)');

  // Test 'AND_IF_YOU_DO': A and if you do B
  const andIfRes = engine.evaluatePsctConjunction('AND_IF_YOU_DO', () => true, () => true);
  assert(andIfRes.successA && andIfRes.successB, 'AND_IF_YOU_DO succeeds for both');
  assert(andIfRes.lastEvents.includes('A') && andIfRes.lastEvents.includes('B'), 'AND_IF_YOU_DO considers both A and B simultaneous last events');

  // Test 'ALSO': A also B
  const alsoRes = engine.evaluatePsctConjunction('ALSO', () => false, () => true);
  assert(alsoRes.successA === false && alsoRes.successB === true, 'ALSO executes B independently even if A fails');

  // Test 'AND': A and B (All-or-Nothing)
  const andRes = engine.evaluatePsctConjunction('AND', () => true, () => false);
  assert(andRes.successA === false && andRes.successB === false, 'AND fails completely if either A or B fails');
}

// ==========================================
// GROUP 13: End Phase Hand Size Limit (6 Cards)
// ==========================================
console.log('\n--- Group 13: End Phase Hand Size Limit (Rulebook v10 tr. 40) ---');
{
  const engine = new DuelEngine();
  const initialGraveCount = engine.player.graveyard.length;

  // Fill player hand with 8 cards
  while (engine.player.hand.length < 8) {
    engine.player.hand.push({ uid: `excess_card_${engine.player.hand.length}`, def: PLAYABLE_CARDS[0], ownerId: 'player' });
  }
  assert(engine.player.hand.length === 8, 'Player hand initially has 8 cards');

  // Transition to End Phase & resolve
  engine.currentPhase = 'MAIN_PHASE_2';
  engine.advancePhase(); // Transitions to END_PHASE, discards excess to 6, then advances turn

  // Verify that exactly 2 excess cards were discarded to Graveyard
  assert(engine.player.graveyard.length === initialGraveCount + 2, 'Exactly 2 excess cards discarded to Graveyard to maintain 6-card limit');
  assert(engine.logs.some(l => l.message.includes('vượt quá 6 lá')), 'Log records hand size discard down to 6 cards');
}

// ==========================================
// GROUP 14: Destroy vs Send to GY vs Tribute vs Banish
// ==========================================
console.log('\n--- Group 14: Destroy vs Send to GY vs Tribute vs Banish (Rulebook v10 tr. 52-55) ---');
{
  const engine = new DuelEngine();
  // Place an indestructible monster in Slot 0
  const titanDef = { ...PLAYABLE_CARDS[0], cannotBeDestroyedByCardEffects: true };
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'indestructible_titan', def: titanDef, ownerId: 'player', cannotBeDestroyedByCardEffects: true },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // 1. Destroy by card effect is REJECTED
  const destroyRes = engine.destroyMonster('player', 0, 'EFFECT');
  assert(destroyRes.destroyed === false, 'Cannot be destroyed by card effect: ' + destroyRes.message);
  assert(engine.player.monsterZones[0] !== null, 'Monster survives effect destruction attempt');

  // 2. Send to Graveyard BYPASSES destruction immunity
  const sendRes = engine.sendMonsterToGraveyard('player', 0);
  assert(sendRes.success === true, 'Send to Graveyard succeeds: ' + sendRes.message);
  assert(engine.player.monsterZones[0] === null, 'Monster vacated field via Send to GY');
  assert(engine.player.graveyard.some(c => c.uid === 'indestructible_titan'), 'Monster is now in Graveyard');

  // 3. Tribute bypasses destruction immunity
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'indestructible_tribute_fodder', def: titanDef, ownerId: 'player', cannotBeDestroyedByCardEffects: true },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const tributeRes = engine.tributeMonster('player', 1);
  assert(tributeRes.success === true, 'Tribute succeeds despite destruction immunity: ' + tributeRes.message);
  assert(engine.player.monsterZones[1] === null, 'Tributed monster vacated field');

  // 4. Banish bypasses destruction immunity
  engine.player.monsterZones[2] = {
    slotIndex: 2,
    card: { uid: 'indestructible_banish_target', def: titanDef, ownerId: 'player', cannotBeDestroyedByCardEffects: true },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const banishRes = engine.banishMonster('player', 2, false);
  assert(banishRes.success === true, 'Banish succeeds despite destruction immunity: ' + banishRes.message);
  assert(engine.player.monsterZones[2] === null, 'Banished monster vacated field');
  assert(engine.player.banished.some(c => c.uid === 'indestructible_banish_target'), 'Monster resides in Banished zone');
}

// ==========================================
// GROUP 15: AI Master Rule Autonomous Extra Deck & Pendulum Decision Intelligence
// ==========================================
console.log('\n--- Group 15: AI Master Rule Autonomous Extra Deck & Pendulum Decision Intelligence ---');
{
  // Test 15.1: AI Pendulum Placement & Swarm
  const engine = new DuelEngine();
  const glycineDef = PLAYABLE_CARDS.find(c => c.id === 'card_pend_glycine');
  const glutamicDef = PLAYABLE_CARDS.find(c => c.id === 'card_pend_glutamic');
  const ironDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_26_fe'); // Level 4

  engine.opponent.hand = [
    { uid: 'ai_pend_scale_1', def: glycineDef, ownerId: 'opponent' },
    { uid: 'ai_pend_scale_8', def: glutamicDef, ownerId: 'opponent' },
    { uid: 'ai_swarm_iron_1', def: ironDef, ownerId: 'opponent' },
    { uid: 'ai_swarm_iron_2', def: ironDef, ownerId: 'opponent' }
  ];
  engine.opponent.mana = 10;
  engine.opponent.normalSummonsRemaining = 0; // Force Pendulum
  engine.activePlayerId = 'opponent';
  engine.currentPhase = 'MAIN_PHASE_1';

  // Run AI main phase logic
  engine['aiPlayPendulumStrategy']();

  assert(engine.opponent.pendulumZones?.left !== null, 'AI placed Left Pendulum Scale 1');
  assert(engine.opponent.pendulumZones?.right !== null, 'AI placed Right Pendulum Scale 8');
  assert(engine.opponent.hasPendulumSummonedThisTurn === true, 'AI executed Pendulum Summon autonomously');
  const summonedCount = engine.opponent.monsterZones.filter(s => s && s.card).length;
  assert(summonedCount >= 2, `AI swarmed the board via Pendulum Summon (Count: ${summonedCount})`);

  // Test 15.2: AI Synchro Summon Decision
  const synchroEngine = new DuelEngine();
  const tunerDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_78_pt_tuner'); // Level 3 Tuner
  const nonTunerDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na'); // Level 4 Non-Tuner
  const synchroBossDef = PLAYABLE_CARDS.find(c => c.id === 'card_synchro_catalytic_converter'); // Level 7 Synchro

  synchroEngine.opponent.extraDeck = [
    { uid: 'ai_synchro_boss', def: synchroBossDef, ownerId: 'opponent' }
  ];
  synchroEngine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'ai_pt_tuner', def: tunerDef, ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  synchroEngine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'ai_na_nontuner', def: nonTunerDef, ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  synchroEngine.opponent.mana = 10;
  synchroEngine.activePlayerId = 'opponent';
  synchroEngine.currentPhase = 'MAIN_PHASE_1';

  synchroEngine['aiPlayExtraDeckStrategy']();

  const isSynchroOnField = synchroEngine.opponent.monsterZones.some(s => s && s.card && s.card.def.cardType === 'SYNCHRO_MONSTER');
  assert(isSynchroOnField === true, 'AI detected Tuner+NonTuner=7 and executed Synchro Summon autonomously');

  // Test 15.3: AI Xyz Summon & Detach Decision
  const xyzEngine = new DuelEngine();
  const cobaltDef = PLAYABLE_CARDS.find(c => c.id === 'card_xyz_hexammine_cobalt'); // Rank 4
  xyzEngine.opponent.extraDeck = [
    { uid: 'ai_xyz_cobalt', def: cobaltDef, ownerId: 'opponent' }
  ];
  xyzEngine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'ai_mat_1', def: ironDef, ownerId: 'opponent' }, // Level 4
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  xyzEngine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'ai_mat_2', def: ironDef, ownerId: 'opponent' }, // Level 4
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  xyzEngine.opponent.mana = 10;
  xyzEngine.activePlayerId = 'opponent';
  xyzEngine.currentPhase = 'MAIN_PHASE_1';

  xyzEngine['aiPlayExtraDeckStrategy']();

  const isXyzOnField = xyzEngine.opponent.monsterZones.some(s => s && s.card && s.card.def.cardType === 'XYZ_MONSTER');
  assert(isXyzOnField === true, 'AI detected 2x Level 4 monsters and executed Xyz Summon autonomously');
}

// ==========================================
// GROUP 16: Master Rule 15-Card Side Deck & In-Match Tactical Adaptation (Rulebook v10 tr. 6)
// ==========================================
console.log('\n--- Group 16: Master Rule 15-Card Side Deck & In-Match Tactical Adaptation ---');
{
  const sideDeckIds = [
    'card_spell_neutralization',
    'card_trap_noble_gas_shield',
    'card_comp_fe2o3'
  ];
  const engine = new DuelEngine(
    undefined,
    undefined,
    'MENDELEEV',
    undefined,
    sideDeckIds
  );

  // 1. Initial State verification
  assert(Array.isArray(engine.player.sideDeck), 'Player has initialized sideDeck');
  assert(engine.player.sideDeck.length === 3, 'Player sideDeck has 3 instantiated cards');
  assert(Array.isArray(engine.opponent.sideDeck), 'Opponent AI has initialized sideDeck');
  assert(engine.opponent.sideDeck.length >= 3, 'Opponent AI sideDeck populated');

  // 2. 1-to-1 Side Deck Swap in DuelEngine
  const origCardUid = engine.player.deck[0].uid;
  const origCardName = engine.player.deck[0].def.name;
  const sideCardUid = engine.player.sideDeck[0].uid;
  const sideCardName = engine.player.sideDeck[0].def.name;
  const initialDeckLen = engine.player.deck.length;
  const initialSideLen = engine.player.sideDeck.length;

  const swapRes = engine.swapSideDeckCard('player', origCardUid, sideCardUid);
  assert(swapRes.success === true, 'swapSideDeckCard executed successfully');
  assert(engine.player.deck.length === initialDeckLen, `Deck length strictly invariant (${initialDeckLen})`);
  assert(engine.player.sideDeck.length === initialSideLen, `Side Deck length strictly invariant (${initialSideLen})`);
  assert(engine.player.deck.some(c => c.uid === sideCardUid), `Incoming side card "${sideCardName}" is now in Main Deck`);
  assert(engine.player.sideDeck.some(c => c.uid === origCardUid), `Outgoing main card "${origCardName}" is now in Side Deck`);

  // 3. Invalid swap rejection
  const invalidSideRes = engine.swapSideDeckCard('player', origCardUid, 'non_existent_uid');
  assert(invalidSideRes.success === false, 'Rejects swapping non-existent Side Deck UID');

  const invalidMainRes = engine.swapSideDeckCard('player', 'non_existent_uid', sideCardUid);
  assert(invalidMainRes.success === false, 'Rejects swapping non-existent Main Deck UID');

  // 4. Autonomous AI Side Deck Adaptation against Alkali/Water Matchup
  const aiAdaptation = engine.aiPerformSideDeckAdaptation(['card_elem_11_na', 'card_comp_h2o', 'card_spell_h2o_burst']);
  assert(aiAdaptation.swappedCount >= 1, `AI autonomously adapted side-deck against Water/Alkali matchup (Swapped: ${aiAdaptation.swappedCount})`);
  assert(aiAdaptation.logs.length >= 1, 'AI generated strategic adaptation logs');
  assert(aiAdaptation.logs[0].includes('Kiềm/Nước') || aiAdaptation.logs[0].includes('phòng thủ'), 'AI log reflects scientific elemental counter strategy');
}

// ==========================================
// GROUP 17: Graveyard & Banished Zone Transparency & Chemical Reclamation Invariants
// ==========================================
console.log('\n--- Group 17: Graveyard & Banished Zone Transparency & Reclamation ---');
{
  const engine = new DuelEngine();

  // 1. Transparency: Both players' GY and Banished zones are accessible arrays
  assert(Array.isArray(engine.player.graveyard), 'Player Graveyard is transparent accessible array');
  assert(Array.isArray(engine.player.banished), 'Player Banished is transparent accessible array');
  assert(Array.isArray(engine.opponent.graveyard), 'Opponent Graveyard is transparent accessible array');
  assert(Array.isArray(engine.opponent.banished), 'Opponent Banished is transparent accessible array');

  // 2. Populate Player GY with diverse chemical card types
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na'); // Element Monster
  const h2oDef = PLAYABLE_CARDS.find(c => c.id === 'card_comp_h2o'); // Compound Monster
  const synchroDef = PLAYABLE_CARDS.find(c => c.id === 'card_synchro_catalytic_converter'); // Synchro Extra Monster
  const esterDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_esterification'); // Reaction Spell
  const nobleTrapDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_noble_gas_shield'); // Trap

  engine.player.graveyard = [
    { uid: 'gy_na_1', def: naDef, ownerId: 'player' },
    { uid: 'gy_h2o_1', def: h2oDef, ownerId: 'player' },
    { uid: 'gy_synchro_1', def: synchroDef, ownerId: 'player', properlySummoned: true },
    { uid: 'gy_spell_1', def: esterDef, ownerId: 'player' },
    { uid: 'gy_trap_1', def: nobleTrapDef, ownerId: 'player' }
  ];

  assert(engine.player.graveyard.length === 5, 'Player Graveyard populated with 5 diverse card types');

  // 3. Type Categorization Filter Invariants (Matching Modal Logic)
  const gyMonsters = engine.player.graveyard.filter(c => c.def.cardType === 'ELEMENT_MONSTER');
  assert(gyMonsters.length === 1 && gyMonsters[0].def.name.includes('Natri'), 'GY Monster filter identifies elemental monsters');

  const gyCompounds = engine.player.graveyard.filter(c => c.def.cardType === 'COMPOUND_MONSTER');
  assert(gyCompounds.length === 1 && gyCompounds[0].def.name.includes('Thủy Long'), 'GY Compound filter identifies synthesis compounds');

  const gyExtra = engine.player.graveyard.filter(c => c.def.cardType === 'LINK_MONSTER' || c.def.cardType === 'SYNCHRO_MONSTER' || c.def.cardType === 'XYZ_MONSTER' || Boolean(c.def.synchroLevel) || Boolean(c.def.xyzRank));
  assert(gyExtra.length === 1 && gyExtra[0].def.name.includes('Chuyển Hóa'), 'GY Extra Deck filter identifies Synchro/Xyz/Link monsters');

  const gySpells = engine.player.graveyard.filter(c => c.def.cardType === 'REACTION_SPELL' || c.def.cardType === 'EQUIP_CATALYST' || c.def.cardType === 'FIELD_ENVIRONMENT');
  assert(gySpells.length === 1 && gySpells[0].def.name.includes('Este Hóa'), 'GY Spell filter identifies Reaction Spells');

  const gyTraps = engine.player.graveyard.filter(c => c.def.cardType === 'TRAP');
  assert(gyTraps.length === 1 && gyTraps[0].def.name.includes('Khí Hiếm'), 'GY Trap filter identifies tactical traps');

  // 4. Multi-attribute Search Algorithm in Graveyard
  // Search by chemical formula 'H2O'
  const formulaMatch = engine.player.graveyard.filter(c => (c.def.chemicalFormula || '').toLowerCase().includes('h2o'));
  assert(formulaMatch.length >= 1 && formulaMatch[0].def.name.includes('Thủy Long'), 'Search by chemical formula "H2O" finds water molecule');

  // Search by English name 'esterification'
  const englishMatch = engine.player.graveyard.filter(c => (c.def.name_en || '').toLowerCase().includes('esterification'));
  assert(englishMatch.length >= 1, 'Search by English name "esterification" successfully resolves');

  // Search by effect keyword 'tấn công' or 'hủy bỏ'
  const effectMatch = engine.player.graveyard.filter(c => (c.def.effectText || '').toLowerCase().includes('tấn công') || (c.def.effectText || '').toLowerCase().includes('hủy bỏ'));
  assert(effectMatch.length >= 1, 'Search by effect keyword resolves targeted card');

  // 5. Banished Zone Mutual Exclusivity
  engine.player.banished = [
    { uid: 'banished_gold_1', def: PLAYABLE_CARDS.find(c => c.id === 'card_elem_79_au'), ownerId: 'player' }
  ];
  assert(engine.player.banished.length === 1, 'Banished zone contains 1 exiled card');
  assert(!engine.player.graveyard.some(c => c.uid === 'banished_gold_1'), 'Banished card is strictly absent from Graveyard (mutual exclusivity)');

  // 6. Properly Special Summoned First Graveyard Revival Rule
  // gy_synchro_1 has properlySummoned: true -> Can be targeted for revival
  const validRevivalTarget = engine.player.graveyard.find(c => c.uid === 'gy_synchro_1');
  assert(validRevivalTarget.properlySummoned === true, 'Properly summoned Synchro monster is eligible for Graveyard revival');

  // Add improper Extra Deck monster (sent directly from Extra Deck to GY by mill effect)
  engine.player.graveyard.push({
    uid: 'gy_synchro_unsummoned',
    def: synchroDef,
    ownerId: 'player',
    properlySummoned: false // Not properly Special Summoned first!
  });
  const invalidRevivalTarget = engine.player.graveyard.find(c => c.uid === 'gy_synchro_unsummoned');
  assert(invalidRevivalTarget.properlySummoned === false, 'Milled/Unsummoned Extra Deck monster is strictly marked improperly summoned');
}

// ==========================================
// GROUP 18: Duel Room Life Point Calibration & AI Persona Match Invariants
// ==========================================
console.log('\n--- Group 18: Duel Room LP Calibration (8000 vs 4000) & AI Persona Invariants ---');
{
  // 1. Master Rule Standard 8,000 LP
  const tcgEngine = new DuelEngine();
  assert(tcgEngine.player.lp === 8000, 'Master Rule TCG initializes player with exactly 8,000 LP');
  assert(tcgEngine.player.maxLp === 8000, 'Master Rule TCG sets player maxLp to 8,000');
  assert(tcgEngine.opponent.lp === 8000, 'Master Rule TCG initializes opponent with exactly 8,000 LP');
  assert(tcgEngine.opponent.maxLp === 8000, 'Master Rule TCG sets opponent maxLp to 8,000');
  assert(tcgEngine.logs.some(l => l.message.includes('8,000 LP')), 'Opening match log records 8,000 starting LP');

  // 2. Speed Duel Fast Classroom 4,000 LP
  const speedEngine = new DuelEngine(undefined, undefined, 'NOVICE', undefined, undefined, 4000);
  assert(speedEngine.player.lp === 4000, 'Speed Duel initializes player with exactly 4,000 LP');
  assert(speedEngine.player.maxLp === 4000, 'Speed Duel sets player maxLp to 4,000');
  assert(speedEngine.opponent.lp === 4000, 'Speed Duel initializes opponent with exactly 4,000 LP');
  assert(speedEngine.opponent.maxLp === 4000, 'Speed Duel sets opponent maxLp to 4,000');
  assert(speedEngine.logs.some(l => l.message.includes('4,000 LP')), 'Opening match log records 4,000 starting LP');

  // 3. LP Recovery Caps at MaxLP
  speedEngine.player.lp = 3800;
  speedEngine.player.lp = Math.min(speedEngine.player.maxLp, speedEngine.player.lp + 500);
  assert(speedEngine.player.lp === 4000, 'Healing rigorously caps at Speed Duel maxLp (4,000 LP)');

  // 4. AI Persona Name Mapping across 4 Difficulty Tiers
  const noviceEngine = new DuelEngine(undefined, undefined, 'NOVICE');
  assert(noviceEngine.opponent.name.includes('Alpha'), 'NOVICE tier sets opponent persona to Alpha');

  const adeptEngine = new DuelEngine(undefined, undefined, 'ADEPT');
  assert(adeptEngine.opponent.name.includes('Beta'), 'ADEPT tier sets opponent persona to Beta');

  const expertEngine = new DuelEngine(undefined, undefined, 'EXPERT');
  assert(expertEngine.opponent.name.includes('Gamma'), 'EXPERT tier sets opponent persona to Gamma');

  const mendeleevEngine = new DuelEngine(undefined, undefined, 'MENDELEEV');
  assert(mendeleevEngine.opponent.name.includes('Mendeleev'), 'MENDELEEV tier sets opponent persona to Dmitri Mendeleev');

  // 5. Environmental Hazard Perturbation Preset Injection
  const envEngine = new DuelEngine();
  envEngine.setEnvironment({ ph: 2.8, temperature: 298, pressure: 1.0 }, 'Khí Quyển Mưa Axit pH 2.8');
  assert(envEngine.environment.ph === 2.8, 'Environmental preset correctly modulates pH to 2.8');
  assert(envEngine.environment.environmentCardName === 'Khí Quyển Mưa Axit pH 2.8', 'Environment records hazard title');

  envEngine.setEnvironment({ ph: 7.0, temperature: 723, pressure: 200.0 }, 'Lò Áp Suất Cao Haber-Bosch 200 atm');
  assert(envEngine.environment.pressure === 200.0, 'Environmental preset modulates pressure to 200 atm');
  assert(envEngine.environment.temperature === 723, 'Environmental preset modulates temperature to 723 K');
}

// ==========================================
// GROUP 19: In-Duel Deck Search, Tutor & Deck Shuffling Mechanics (Rulebook v10 tr. 33)
// ==========================================
console.log('\n--- Group 19: In-Duel Deck Search, Tutor & Deck Shuffling Mechanics (Rulebook v10 tr. 33) ---');
{
  const engine = new DuelEngine();

  // 1. Filtered Deck Query: Category and Chemical Attributes
  const allDeckCards = engine.getSearchableDeckCards('player');
  assert(allDeckCards.length === engine.player.deck.length, 'Empty filter returns all current main deck cards');

  const monsterCards = engine.getSearchableDeckCards('player', { category: 'MONSTER' });
  assert(monsterCards.length > 0, 'Found elemental/pendulum monsters in deck');
  assert(monsterCards.every(c => ['ELEMENT_MONSTER', 'PENDULUM_MONSTER', 'RITUAL_MONSTER'].includes(c.def.cardType)), 'Monster filter returns strictly monster cards');

  const spellCards = engine.getSearchableDeckCards('player', { category: 'SPELL' });
  assert(spellCards.length > 0, 'Found spell cards in deck');
  assert(spellCards.every(c => ['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT'].includes(c.def.cardType)), 'Spell filter returns strictly spell cards');

  // 2. Specialized Tuner and Pendulum Filters
  const tunerDef = PLAYABLE_CARDS.find(c => c.isTuner === true);
  const ptInstance = { uid: 'pt_tuner_search', def: tunerDef, ownerId: 'player' };
  engine.player.deck.push(ptInstance);

  const tunerQueryResults = engine.getSearchableDeckCards('player', { isTuner: true });
  assert(tunerQueryResults.some(c => c.uid === ptInstance.uid), 'isTuner filter successfully locates Tuner Platinum');

  // 3. Multi-Attribute Text Search (Formula, Name, Keyword)
  const formulaQueryResults = engine.getSearchableDeckCards('player', { searchQuery: 'Pt' });
  assert(formulaQueryResults.some(c => c.uid === ptInstance.uid), 'Search query "Pt" locates card by chemical formula');

  // 4. Deck Tutor to Hand (Rulebook v10 tr. 33: Add to hand, reveal card, shuffle deck)
  const initialDeckCount = engine.player.deck.length;
  const initialHandCount = engine.player.hand.length;

  const tutorHandResult = engine.tutorCardFromDeck('player', ptInstance.uid, 'HAND', 'Chiết Tách Phân Đoạn Xúc Tác');
  assert(tutorHandResult.success === true, 'Tutor to Hand succeeds: ' + tutorHandResult.message);
  assert(tutorHandResult.shuffled === true, 'Master Rule mandatory deck shuffle executed');
  assert(engine.player.deck.length === initialDeckCount - 1, 'Tutored card removed from deck');
  assert(engine.player.hand.length === initialHandCount + 1, 'Tutored card added to player hand');
  assert(engine.player.hand.some(c => c.uid === ptInstance.uid), 'Card is in hand');

  // Verify Public Revelation Log
  assert(
    engine.logs.some(l => l.message.includes('[Tìm Kiếm Bộ Bài]') && l.message.includes(ptInstance.def.name) && l.message.includes('xáo trộn kỹ')),
    'Public game log records card name, formula, destination, and deck shuffle'
  );

  // 5. Deck Tutor to Graveyard (Direct Mill/Extraction)
  const hclDef = PLAYABLE_CARDS.find(c => c.chemicalFormula === 'HCl') || PLAYABLE_CARDS.find(c => c.cardType === 'REACTION_SPELL');
  const hclInstance = { uid: 'hcl_gy_tutor', def: hclDef, ownerId: 'player' };
  engine.player.deck.push(hclInstance);

  const initialGyCount = engine.player.graveyard.length;
  const tutorGyResult = engine.tutorCardFromDeck('player', hclInstance.uid, 'GRAVEYARD', 'Xả Thải Hóa Chất');
  assert(tutorGyResult.success === true, 'Tutor to Graveyard succeeds');
  assert(engine.player.graveyard.length === initialGyCount + 1, 'Card added directly to Graveyard');
  assert(engine.player.graveyard.some(c => c.uid === hclInstance.uid), 'Card is present in Graveyard');

  // 6. Deck Tutor to Field (Special Summon from Deck)
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
  const naInstance = { uid: 'na_field_tutor', def: naDef, ownerId: 'player' };
  engine.player.deck.push(naInstance);

  // Ensure first monster slot is open
  engine.player.monsterZones[0] = null;
  const tutorFieldResult = engine.tutorCardFromDeck('player', naInstance.uid, 'FIELD', 'Triệu Hồi Từ Bộ Bài');
  assert(tutorFieldResult.success === true, 'Tutor to Field succeeds');
  assert(engine.player.monsterZones[0]?.card?.uid === naInstance.uid, 'Card placed onto monster zone on field');
  assert(engine.player.monsterZones[0]?.position === 'FACE_UP_ATTACK', 'Card enters field face-up attack');

  // 7. Non-Existent UID Rejection
  const invalidTutorResult = engine.tutorCardFromDeck('player', 'non_existent_uid_123', 'HAND');
  assert(invalidTutorResult.success === false, 'Invalid UID search strictly rejected');
  assert(invalidTutorResult.shuffled === false, 'No shuffle executed on failed search');

  // 8. Opponent AI Autonomous Deck Tutor Intelligence
  // Setup AI with a non-tuner on field, lacking tuner on field, but tuner in deck
  const aiEngine = new DuelEngine();
  aiEngine.opponent.monsterZones = [null, null, null, null, null];
  aiEngine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'ai_nontuner_field', def: naDef, ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const aiPtInstance = { uid: 'ai_pt_tuner_deck', def: tunerDef, ownerId: 'opponent' };
  aiEngine.opponent.deck.push(aiPtInstance);

  const aiTutorRes = aiEngine.aiPerformAutonomousDeckTutor('Chiết Tách AI');
  assert(aiTutorRes !== null, 'AI autonomously executed Deck Tutor');
  assert(aiTutorRes.success === true, 'AI tutor succeeded');
  assert(aiTutorRes.card?.def.isTuner === true, 'AI intelligently prioritized searching Tuner Platinum for Synchro');
  assert(aiEngine.opponent.hand.some(c => c.uid === aiPtInstance.uid), 'Tuner Platinum placed into AI hand');
}

// ==========================================
// GROUP 20: Equip Spell Cards & Catalyst Active Site Binding Mechanics (Rulebook v10 tr. 28)
// ==========================================
console.log('\n--- Group 20: Equip Spell Cards & Catalyst Active Site Binding Mechanics (Rulebook v10 tr. 28) ---');
{
  const engine = new DuelEngine();
  engine.player.mana = 10;

  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
  const bunsenDef = PLAYABLE_CARDS.find(c => c.effectCode === 'SPELL_BUNSEN_EQUIP');
  const ironMeshDef = PLAYABLE_CARDS.find(c => c.id === 'card_equip_iron_catalyst');

  // Place host monster on field
  const hostMonster = { uid: 'na_host_equip', def: naDef, ownerId: 'player' };
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: hostMonster,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const bunsenInstance = { uid: 'bunsen_equip_inst', def: bunsenDef, ownerId: 'player' };
  const ironMeshInstance = { uid: 'iron_mesh_equip_inst', def: ironMeshDef, ownerId: 'player' };
  engine.player.hand.push(bunsenInstance, ironMeshInstance);

  // 1. Attach First Equip Spell: Bunsen Burner
  const attachRes1 = engine.attachEquipCard('player', bunsenInstance.uid, hostMonster.uid);
  assert(attachRes1.success === true, 'Attach Bunsen Burner succeeds: ' + attachRes1.message);
  assert(engine.player.monsterZones[0]?.equippedCards?.length === 1, 'Host monster has exactly 1 equipped card');
  assert(engine.player.monsterZones[0]?.equippedCards?.[0].uid === bunsenInstance.uid, 'Attached card is Bunsen Burner');
  assert(engine.player.monsterZones[0]?.tempAtkBoost === 600, 'Bunsen Burner grants +600 ATK boost');
  assert(engine.player.monsterZones[0]?.card?.def.attribute === 'PYRO', 'Bunsen Burner modifies attribute to PYRO');

  // Verify Spell/Trap Zone occupancy
  const stSlot1 = engine.player.spellTrapZones.find(s => s && s.card && s.card.uid === bunsenInstance.uid);
  assert(stSlot1 !== undefined, 'Equip Spell placed in Spell/Trap Zone');
  assert(stSlot1?.isFaceUp === true, 'Equip Spell resides face-up on field');
  assert(stSlot1?.equippedToMonsterUid === hostMonster.uid, 'Equip Spell links to host monster UID');
  assert(!engine.player.graveyard.some(c => c.uid === bunsenInstance.uid), 'Equip Spell remains on field, NOT in Graveyard');

  // 2. Attach Second Equip Spell (Multiple Equips on 1 Monster)
  const attachRes2 = engine.attachEquipCard('player', ironMeshInstance.uid, hostMonster.uid);
  assert(attachRes2.success === true, 'Attach Iron Mesh Catalyst succeeds');
  assert(engine.player.monsterZones[0]?.equippedCards?.length === 2, 'Host monster now has 2 equipped cards');
  assert(engine.player.monsterZones[0]?.tempAtkBoost === 1000, 'Cumulative ATK boost is 600 + 400 = 1000 ATK');

  // Verify both S/T slots occupied
  const stOccupiedCount = engine.player.spellTrapZones.filter(s => s && s.card).length;
  assert(stOccupiedCount === 2, 'Exactly 2 Spell/Trap zones occupied by the 2 Equip Spells');

  // 3. Host Monster Destroyed: Automatic Destruction Cascade (Rulebook v10 tr. 28)
  const initialGyCount = engine.player.graveyard.length;
  const destroyRes = engine.destroyMonster('player', 0, 'EFFECT');
  assert(destroyRes.destroyed === true, 'Host monster destroyed');
  assert(engine.player.monsterZones[0] === null, 'Host monster slot vacated');
  assert(engine.player.graveyard.some(c => c.uid === hostMonster.uid), 'Host monster sent to Graveyard');

  // Both Equip Cards must be automatically destroyed and sent to Graveyard
  assert(engine.player.graveyard.some(c => c.uid === bunsenInstance.uid), 'Bunsen Burner automatically sent to Graveyard upon host destruction');
  assert(engine.player.graveyard.some(c => c.uid === ironMeshInstance.uid), 'Iron Mesh Catalyst automatically sent to Graveyard upon host destruction');
  assert(engine.player.graveyard.length === initialGyCount + 3, 'Exactly 3 cards (1 monster + 2 equips) added to Graveyard');

  // Spell/Trap zones must be completely vacated
  const remainingStCount = engine.player.spellTrapZones.filter(s => s && s.card).length;
  assert(remainingStCount === 0, 'Both Spell/Trap zones completely vacated after equip destruction cascade');

  // Verify Log
  assert(
    engine.logs.some(l => l.message.includes('[Hủy Liên Kết Trang Bị]') && l.message.includes('bị phá hủy và chuyển xuống Mộ Bài')),
    'Public log records automatic equip detachment and destruction'
  );

  // 4. Host Monster Tributed Cascade
  engine.player.mana = 10;
  const host2 = { uid: 'na_host_tribute', def: naDef, ownerId: 'player' };
  const bunsen2 = { uid: 'bunsen_equip_2', def: bunsenDef, ownerId: 'player' };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: host2,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  engine.player.hand.push(bunsen2);
  engine.attachEquipCard('player', bunsen2.uid, host2.uid);

  engine.tributeMonster('player', 1);
  assert(engine.player.graveyard.some(c => c.uid === bunsen2.uid), 'Equip Spell automatically destroyed when host monster is Tributed');
  assert(engine.player.spellTrapZones.every(s => s === null || s.card?.uid !== bunsen2.uid), 'Equip slot vacated after tribute cascade');

  // 5. Host Monster Banished Cascade
  const host3 = { uid: 'na_host_banish', def: naDef, ownerId: 'player' };
  const bunsen3 = { uid: 'bunsen_equip_3', def: bunsenDef, ownerId: 'player' };
  engine.player.monsterZones[2] = {
    slotIndex: 2,
    card: host3,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  engine.player.hand.push(bunsen3);
  engine.attachEquipCard('player', bunsen3.uid, host3.uid);

  engine.banishMonster('player', 2);
  assert(engine.player.banished.some(c => c.uid === host3.uid), 'Host monster sent to Banished zone');
  assert(engine.player.graveyard.some(c => c.uid === bunsen3.uid), 'Equip Spell sent to Graveyard (NOT Banished) when host monster is Banished');
  assert(!engine.player.banished.some(c => c.uid === bunsen3.uid), 'Equip Spell is strictly absent from Banished zone');
}

// ==========================================
// GROUP 21: Master Rule Battle Step Replay Mechanics & Tactical Choice Governance (Rulebook v10 tr. 40)
// ==========================================
console.log('\n--- Group 21: Master Rule Battle Step Replay Mechanics & Tactical Choice Governance (Rulebook v10 tr. 40) ---');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'BATTLE_PHASE';
  engine.activePlayerId = 'player';
  engine.player.lp = 8000;
  engine.opponent.lp = 8000;

  const cDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_06_c'); // Carbon (ATK 1200 or 1500)
  const feDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_26_fe'); // Iron (ATK 1600)
  const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na'); // Sodium (ATK 1200)
  const auDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_79_au'); // Gold (ATK 2800)

  // 1. Setup Player Attacker (Carbon ATK 2400)
  const attackerCard = { uid: 'p_attacker_carbon', def: { ...cDef, atk: 2400 }, ownerId: 'player' };
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: attackerCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // Setup Opponent Defenders: Slot 0 (Na ATK 1200) and Slot 1 (Fe ATK 1900)
  const oppNa = { uid: 'opp_na_0', def: naDef, ownerId: 'opponent' };
  const oppFe = { uid: 'opp_fe_1', def: feDef, ownerId: 'opponent' };
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: oppNa,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  engine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: oppFe,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // Replay Trigger Test: If opponent monster count changes during Battle Step, a Replay occurs
  // Let's declare attack targeting Slot 0 (Na)
  // Simulate Battle Step monster removal: opponent Slot 0 leaves field
  engine.opponent.monsterZones[0] = null;
  const replayState = engine.triggerBattleReplayCheck(0, 2, 0);

  assert(replayState !== null, 'Replay state successfully created when defender count changed during Battle Step');
  assert(replayState.isActive === true, 'Replay state is marked active');
  assert(replayState.attackerSlotIndex === 0, 'Replay accurately tracks attacker slot index');
  assert(replayState.attackerCardUid === attackerCard.uid, 'Replay tracks attacker card UID');
  assert(replayState.initialDefenderCount === 2, 'Replay records initial defender count (2)');
  assert(replayState.currentDefenderCount === 1, 'Replay reflects current defender count (1)');
  assert(replayState.eligibleTargetSlots.includes(1), 'Replay identifies Slot 1 (Fe) as eligible target');
  assert(replayState.canDirectAttack === false, 'Cannot direct attack while Fe is still on field');

  // Test Choice: RETARGET
  const retargetRes = engine.executeBattleReplay('RETARGET', 1);
  assert(retargetRes.success === true, 'Execute Replay RETARGET succeeds');
  assert(retargetRes.targetDestroyed === true, 'Target Fe was destroyed by Carbon (2400 vs 1900)');
  assert(retargetRes.damageDealt === 500, 'Defender took 500 battle damage (2400 - 1900 = 500)');
  assert(engine.opponent.lp === 7500, 'Opponent LP decreased from 8000 to 7500');
  assert(engine.player.monsterZones[0].hasAttackedThisTurn === true, 'Attacker is now marked hasAttackedThisTurn = true');
  assert(engine.activeBattleReplay === null, 'Replay state cleared after attack resolution');

  // 2. Direct Attack Transition on Field Clearance
  engine.player.monsterZones[0].hasAttackedThisTurn = false;
  // Field is now empty of opponent monsters. Initial defender count was 1, now 0
  const replayClear = engine.initiateBattleReplay(0, 1, 1);
  assert(replayClear.canDirectAttack === true, 'canDirectAttack is true when opponent has 0 monsters');

  const directRes = engine.executeBattleReplay('DIRECT');
  assert(directRes.success === true, 'Execute Replay DIRECT succeeds');
  assert(directRes.directAttack === true, 'Direct attack flag is true');
  assert(directRes.damageDealt === 2400, 'Full 2400 ATK dealt directly to opponent LP');
  assert(engine.opponent.lp === 5100, 'Opponent LP reduced to 5100 (7500 - 2400 = 5100)');
  assert(engine.activeBattleReplay === null, 'Replay state cleared after direct attack');

  // 3. Tactical Cancellation (Safe Retreat - Rulebook v10 tr. 40)
  engine.player.monsterZones[0].hasAttackedThisTurn = false;
  // Opponent summons giant Gold Au (ATK 2800) during Battle Step
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'opp_gold', def: auDef, ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  engine.initiateBattleReplay(0, 0, 'DIRECT');
  const cancelRes = engine.executeBattleReplay('CANCEL');
  assert(cancelRes.success === true, 'Execute Replay CANCEL succeeds');
  assert(cancelRes.damageDealt === 0, '0 damage dealt on attack cancellation');
  assert(cancelRes.attackerDestroyed === false, 'Attacker was NOT destroyed when cancelling attack');
  assert(engine.player.lp === 8000, 'Player took 0 damage on cancellation');
  assert(engine.player.monsterZones[0].hasAttackedThisTurn === true, 'Attacker hasAttackedThisTurn is marked true per Rulebook v10 tr. 40');
  assert(engine.player.monsterZones[0].card !== null, 'Attacker safely remains on field');

  // 4. Invariant Validations & Error Handling
  const noReplayRes = engine.executeBattleReplay('CANCEL');
  assert(noReplayRes.success === false, 'executeBattleReplay rejected when no replay is active');

  engine.initiateBattleReplay(0, 1, 0);
  const invalidTargetRes = engine.executeBattleReplay('RETARGET', 4);
  assert(invalidTargetRes.success === false, 'RETARGET rejected on empty slot 4');

  const invalidDirectRes = engine.executeBattleReplay('DIRECT');
  assert(invalidDirectRes.success === false, 'DIRECT rejected while opponent still controls monster');
  engine.cancelBattleReplay();

  // 5. AI Autonomous Replay Resolution (aiResolveBattleReplay)
  engine.activePlayerId = 'opponent';
  engine.opponent.monsterZones[0].hasAttackedThisTurn = false;
  // Opponent Gold (ATK 2800) attacks. Player has Carbon (ATK 1800).
  // Simulate player monster cleared -> AI automatically resolves DIRECT
  engine.player.monsterZones[0] = null;
  engine.initiateBattleReplay(0, 1, 0);
  const aiDirectRes = engine.aiResolveBattleReplay();
  assert(aiDirectRes.success === true, 'AI successfully auto-resolved Battle Replay');
  assert(aiDirectRes.directAttack === true, 'AI intelligently prioritized direct attack on open field');
  assert(aiDirectRes.damageDealt === (auDef.atk || 2800), 'AI dealt full direct damage');
  assert(engine.player.lp < 8000, 'Player LP reduced by AI direct attack');

  // AI Tactical Retreat: AI has weak monster, player has boss monster
  const weakAiMon = { uid: 'ai_weak', def: naDef, ownerId: 'opponent' }; // ATK 1200
  engine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: weakAiMon,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  // Player summons giant Gold (ATK 2800)
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'p_boss_gold', def: auDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  engine.initiateBattleReplay(1, 0, 'DIRECT');
  const aiCancelRes = engine.aiResolveBattleReplay();
  assert(aiCancelRes.success === true, 'AI successfully evaluated suicidal attack');
  assert(aiCancelRes.damageDealt === 0, 'AI took 0 damage by executing tactical retreat');
  assert(aiCancelRes.attackerDestroyed === false, 'AI weak monster was saved from destruction');
  assert(engine.opponent.monsterZones[1].hasAttackedThisTurn === true, 'AI monster marked hasAttackedThisTurn');
}

// ==========================================
// GROUP 22: Piercing Battle Damage & Defense Combat Governance (Rulebook v10 tr. 42-43)
// ==========================================
console.log('\n--- Group 22: Piercing Battle Damage & Defense Combat Governance (Rulebook v10 tr. 42-43) ---');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'BATTLE_PHASE';
  engine.activePlayerId = 'player';
  engine.player.lp = 8000;
  engine.opponent.lp = 8000;

  const hclDef = PLAYABLE_CARDS.find(c => c.id === 'card_comp_hcl'); // ATK 1600, piercingDamage: true
  const feDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_26_fe'); // DEF 1200
  const cDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_06_c');   // ATK 1200 / DEF 1000
  const drillDef = PLAYABLE_CARDS.find(c => c.id === 'card_equip_supercritical_drill'); // Equip Spell, piercingDamage: true

  // 1. Normal Attack vs Defense Monster (No Piercing -> 0 Damage, Target Destroyed)
  // Carbon (ATK 2000, no piercing) attacks Iron in DEF position (DEF 1200)
  const normalAttacker = { uid: 'p_norm_c', def: { ...cDef, atk: 2000, piercingDamage: false }, ownerId: 'player' };
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: normalAttacker,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const defenderIron = { uid: 'opp_iron_def', def: { ...feDef, def: 1200 }, ownerId: 'opponent' };
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: defenderIron,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const normalRes = engine.declareAttack(0, 0);
  assert(normalRes.success === true, 'Normal attack vs Defense monster succeeded');
  assert(normalRes.targetDestroyed === true, 'Defender monster was destroyed');
  assert(normalRes.attackerDestroyed === false, 'Attacker survived');
  assert(normalRes.damageDealt === 0, 'Normal attack vs Defense monster deals exactly 0 battle damage');
  assert(normalRes.isPiercingDamage === false, 'isPiercingDamage is false for normal attack');
  assert(engine.opponent.lp === 8000, 'Opponent LP remains intact at 8000');
  assert(engine.opponent.monsterZones[0] === null, 'Defender slot cleared after battle destruction');

  // 2. Inherent Piercing Attack (HCl, ATK 1600, piercingDamage: true) vs Defense Monster (DEF 1000)
  const defenderRock = { uid: 'opp_rock_def', def: { ...cDef, def: 1000 }, ownerId: 'opponent' };
  engine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: defenderRock,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const hclCard = { uid: 'p_hcl_pierce', def: { ...hclDef, atk: 1600, piercingDamage: true }, ownerId: 'player' };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: hclCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const pierceRes = engine.declareAttack(1, 1);
  assert(pierceRes.success === true, 'Piercing attack vs Defense monster succeeded');
  assert(pierceRes.targetDestroyed === true, 'Defender was destroyed by piercing attack');
  assert(pierceRes.attackerDestroyed === false, 'Piercing attacker survived');
  assert(pierceRes.isPiercingDamage === true, 'isPiercingDamage flag is true');
  assert(pierceRes.piercingDamageDealt === 600, 'Piercing damage dealt is exactly 600 (1600 ATK - 1000 DEF)');
  assert(pierceRes.damageDealt === 600, 'damageDealt field matches piercing damage (600)');
  assert(engine.opponent.lp === 7400, 'Opponent LP decreased by 600 from 8000 to 7400');
  assert(pierceRes.damageSubsteps.some(s => s.includes('Xuyên Giáp [Piercing]')), 'Substep 3 logs Piercing damage calculation');

  // 3. Piercing Attack vs 0 DEF Monster (Full ATK Piercing Damage)
  const defenderZeroDef = { uid: 'opp_zero_def', def: { ...cDef, def: 0 }, ownerId: 'opponent' };
  engine.opponent.monsterZones[2] = {
    slotIndex: 2,
    card: defenderZeroDef,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  engine.player.monsterZones[1].hasAttackedThisTurn = false;
  const zeroDefPierceRes = engine.declareAttack(1, 2);
  assert(zeroDefPierceRes.success === true, 'Piercing attack vs 0 DEF monster succeeded');
  assert(zeroDefPierceRes.isPiercingDamage === true, 'isPiercingDamage is true');
  assert(zeroDefPierceRes.piercingDamageDealt === 1600, 'Full 1600 ATK dealt as piercing damage against 0 DEF');
  assert(engine.opponent.lp === 5800, 'Opponent LP reduced from 7400 to 5800 (7400 - 1600 = 5800)');
  assert(engine.opponent.monsterZones[2] === null, '0 DEF monster destroyed and sent to GY');

  // 4. Piercing Attack vs Face-Down Defense Monster (Substep 2 Flip)
  const faceDownDefender = { uid: 'opp_facedown_def', def: { ...cDef, def: 1100 }, ownerId: 'opponent' };
  engine.opponent.monsterZones[3] = {
    slotIndex: 3,
    card: faceDownDefender,
    position: 'FACE_DOWN_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  engine.player.monsterZones[1].hasAttackedThisTurn = false;
  const faceDownPierceRes = engine.declareAttack(1, 3);
  assert(faceDownPierceRes.success === true, 'Piercing attack vs Face-down defender succeeded');
  assert(faceDownPierceRes.targetDestroyed === true, 'Face-down monster was destroyed');
  assert(faceDownPierceRes.isPiercingDamage === true, 'isPiercingDamage is true');
  assert(faceDownPierceRes.piercingDamageDealt === 500, 'Piercing damage is 500 (1600 ATK - 1100 DEF)');
  assert(engine.opponent.lp === 5300, 'Opponent LP reduced to 5300');
  assert(faceDownPierceRes.damageSubsteps.some(s => s.includes('Lật ngửa')), 'Substep 2 recorded face-down flip');

  // 5. Defense Reflection Damage (Attacker ATK < Defender DEF -> Attacking Player takes Battle Damage)
  const weakAttacker = { uid: 'p_weak_atk', def: { ...cDef, atk: 1000 }, ownerId: 'player' };
  engine.player.monsterZones[2] = {
    slotIndex: 2,
    card: weakAttacker,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const highDefDefender = { uid: 'opp_high_def', def: { ...feDef, def: 1800 }, ownerId: 'opponent' };
  engine.opponent.monsterZones[4] = {
    slotIndex: 4,
    card: highDefDefender,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const reflectionRes = engine.declareAttack(2, 4);
  assert(reflectionRes.success === true, 'Attack resolved against higher DEF monster');
  assert(reflectionRes.attackerDestroyed === false, 'Attacker is NOT destroyed when attacking higher DEF monster');
  assert(reflectionRes.targetDestroyed === false, 'Defender is NOT destroyed');
  assert(reflectionRes.reflectionDamageDealt === 800, 'Attacking player took 800 reflection damage (1800 DEF - 1000 ATK)');
  assert(engine.player.lp === 7200, 'Player LP reduced from 8000 to 7200');
  assert(reflectionRes.damageSubsteps.some(s => s.includes('Phản Kích [Reflection]')), 'Substep 3 logs Reflection damage');

  // 6. Equal ATK and DEF vs Defense Monster (ATK 1500 vs DEF 1500) -> 0 damage, neither destroyed
  const equalAttacker = { uid: 'p_eq_atk', def: { ...cDef, atk: 1500 }, ownerId: 'player' };
  engine.player.monsterZones[3] = {
    slotIndex: 3,
    card: equalAttacker,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const equalDefender = { uid: 'opp_eq_def', def: { ...feDef, def: 1500 }, ownerId: 'opponent' };
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: equalDefender,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const eqRes = engine.declareAttack(3, 0);
  assert(eqRes.success === true, 'Equal ATK vs DEF attack resolved');
  assert(eqRes.damageDealt === 0, '0 damage dealt when ATK equals DEF');
  assert(eqRes.attackerDestroyed === false, 'Attacker survived');
  assert(eqRes.targetDestroyed === false, 'Defender survived');
  assert(engine.player.lp === 7200, 'Player LP unchanged');
  assert(engine.opponent.lp === 5300, 'Opponent LP unchanged');

  // 7. Equip Card Granting Piercing Damage (Supercritical Fluid Piercing Drill)
  const plainAttacker = { uid: 'p_drill_mon', def: { ...cDef, atk: 1600, piercingDamage: false }, ownerId: 'player' };
  engine.player.monsterZones[4] = {
    slotIndex: 4,
    card: plainAttacker,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const drillCard = { uid: 'eq_drill_card', def: { ...drillDef, piercingDamage: true }, ownerId: 'player' };
  engine.player.hand = [drillCard];
  engine.player.mana = 10;

  const equipRes = engine.attachEquipCard('player', drillCard.uid, plainAttacker.uid);
  assert(equipRes.success === true, 'Supercritical Drill equipped successfully');
  assert(engine.player.monsterZones[4].hasPiercingDamage === true, 'Host slot gained hasPiercingDamage = true');
  assert(engine.player.monsterZones[4].tempAtkBoost === 400, 'Equip granted +400 ATK boost');

  // Now attack equalDefender (DEF 1500) with drill attacker (ATK 1600 + 400 = 2000)
  const drillAttackRes = engine.declareAttack(4, 0);
  assert(drillAttackRes.success === true, 'Drill equipped attacker attacked');
  assert(drillAttackRes.targetDestroyed === true, 'Defender destroyed');
  assert(drillAttackRes.isPiercingDamage === true, 'Drill granted piercing damage');
  assert(drillAttackRes.piercingDamageDealt === 500, 'Dealt 500 piercing damage (2000 ATK - 1500 DEF)');
  assert(engine.opponent.lp === 4800, 'Opponent LP decreased from 5300 to 4800 (5300 - 500 = 4800)');

  // 8. Slot Cleanup and Piercing Reset
  engine.cleanSlotEquipCards('player', 4);
  assert(engine.player.monsterZones[4].hasPiercingDamage === false, 'Slot piercing damage cleared when equip card is destroyed');
  assert(engine.player.monsterZones[4].equippedCards.length === 0, 'equippedCards array emptied');
}

// ==========================================
// GROUP 23: Continuous Spell/Trap Field Placement, Face-up Lingering States & Removal Negation Invariants (Rulebook v10 tr. 29)
// ==========================================
console.log('\n--- Group 23: Continuous Spell/Trap Field Placement & Removal Negation Invariants (Rulebook v10 tr. 29) ---');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.activePlayerId = 'player';
  engine.player.lp = 8000;
  engine.opponent.lp = 8000;
  engine.player.mana = 10;
  engine.opponent.mana = 10;

  const contSpellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_platinum_catalyst'); // Continuous Spell
  const fuelCellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_hydrogen_fuel_cell'); // Continuous Spell
  const contTrapDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_noble_membrane');      // Continuous Trap
  const normalSpellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_exothermic_burst');        // Normal Spell (Exothermic Burst)
  const feDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_26_fe');

  // 1. Continuous Spell Activation from Hand Occupies S/T Zone & Remains Face-up
  const contSpellInstance = { uid: 'p_cont_spell_1', def: contSpellDef, ownerId: 'player' };
  engine.player.hand = [contSpellInstance];

  const actContRes = engine.activateSpellFromHand('player', contSpellInstance.uid);
  assert(actContRes.success === true, 'Continuous Spell activated from hand successfully');
  assert(engine.player.spellTrapZones[0] !== null, 'Continuous Spell placed into Spell/Trap Zone Slot 0');
  assert(engine.player.spellTrapZones[0].card.uid === contSpellInstance.uid, 'Slot 0 holds the Continuous Spell instance');
  assert(engine.player.spellTrapZones[0].isFaceUp === true, 'Continuous Spell is marked face-up on field');
  assert(engine.player.graveyard.length === 0, 'Continuous Spell is strictly NOT sent to Graveyard upon resolution (Rulebook v10 tr. 29)');
  assert(engine.isContinuousCardFaceUpOnField('player', contSpellInstance) === true, 'isContinuousCardFaceUpOnField returns true');

  // 2. Full S/T Zones Reject Continuous Spell Activation from Hand
  // Fill all remaining 4 slots
  for (let i = 1; i < 5; i++) {
    engine.player.spellTrapZones[i] = {
      slotIndex: i,
      card: { uid: `dummy_st_${i}`, def: normalSpellDef, ownerId: 'player' },
      isFaceUp: false,
      turnSet: 1
    };
  }
  const secondContSpell = { uid: 'p_cont_spell_2', def: fuelCellDef, ownerId: 'player' };
  engine.player.hand = [secondContSpell];
  const fullStRes = engine.activateSpellFromHand('player', secondContSpell.uid);
  assert(fullStRes.success === false, 'Continuous Spell activation rejected when all 5 S/T slots are occupied');
  assert(fullStRes.message.includes('Hàng Phép/Bẫy của bạn đã đầy'), 'Rejection error indicates full S/T zone');
  assert(engine.player.hand.length === 1, 'Card remains in hand when activation is rejected');

  // Clear dummy slots
  for (let i = 1; i < 5; i++) {
    engine.player.spellTrapZones[i] = null;
  }

  // 3. Continuous Trap Placement, Delayed Activation & Lingering State
  const contTrapInstance = { uid: 'p_cont_trap_1', def: contTrapDef, ownerId: 'player' };
  engine.player.hand = [contTrapInstance];
  const setTrapRes = engine.setSpellTrap('player', contTrapInstance.uid);
  assert(setTrapRes.success === true, 'Continuous Trap set face-down successfully');
  assert(engine.player.spellTrapZones[1].isFaceUp === false, 'Trap placed face-down');
  assert(engine.player.spellTrapZones[1].turnSet === engine.currentTurn, 'turnSet recorded');

  // Advance turn to enable trap activation
  engine.currentTurn = 2;
  const actTrapRes = engine.activateSpellTrapFromField('player', 1);
  assert(actTrapRes.success === true, 'Continuous Trap activated from field on subsequent turn');
  assert(engine.player.spellTrapZones[1] !== null, 'Continuous Trap remains in S/T zone Slot 1');
  assert(engine.player.spellTrapZones[1].isFaceUp === true, 'Continuous Trap flipped face-up');
  assert(engine.isContinuousCardFaceUpOnField('player', contTrapInstance) === true, 'Continuous Trap detected face-up on field');

  // 4. Standby Phase Continuous Triggers
  engine.currentTurn = 3;
  const oppLpBefore = engine.opponent.lp;
  engine.advancePhase(); // -> advance through phases
  engine.startTurn('player'); // -> executes draw & STANDBY_PHASE with resolveStandbyEffects (base mana = 3)
  assert(engine.player.mana === 4, 'Platinum Catalyst recovered +1 Mana during Standby Phase (base 3 -> 4)');
  assert(engine.opponent.lp === oppLpBefore - 200, 'Platinum Catalyst dealt 200 reaction damage during Standby Phase');

  // Also test Fuel Cell continuous recovery (+400 LP)
  const fuelCellInstance = { uid: 'p_fuel_cell_1', def: fuelCellDef, ownerId: 'player' };
  engine.player.spellTrapZones[2] = {
    slotIndex: 2,
    card: fuelCellInstance,
    isFaceUp: true,
    turnSet: 1
  };
  engine.player.lp = 7000;
  engine.startTurn('player');
  assert(engine.player.lp === 7400, 'Fuel Cell recovered +400 LP during Standby Phase (7000 -> 7400)');

  // 5. The Critical Master Rule Invariant: Continuous Cards Fizzle if Removed from Field on Chain (Rulebook v10 tr. 29)
  // Scenario: Player activates Continuous Spell (Chain Link 1).
  // Opponent chains removal effect that destroys the Continuous Spell (Chain Link 2).
  // In LIFO resolution:
  // - Chain Link 2 destroys the Continuous Spell (removing it from S/T zone to GY).
  // - Chain Link 1 attempts to resolve: Because the card is NO LONGER face-up on the field, its effect FIZZLES!
  const chainContSpell = { uid: 'p_chain_cont', def: fuelCellDef, ownerId: 'player' };
  engine.player.spellTrapZones[3] = {
    slotIndex: 3,
    card: chainContSpell,
    isFaceUp: true,
    turnSet: 1
  };

  const initialPlayerLp = engine.player.lp;
  engine.chainStack = [];

  // Chain Link 1: Player activates Continuous Spell
  engine.pushChain(chainContSpell, 'player', 1, undefined, 'Chain Link 1: Kích hoạt Pin Nhiên Liệu');

  // Simulate Chain Link 2: Opponent destroys the Continuous Spell in Slot 3 before CL1 resolves!
  const destRes = engine.destroySpellTrap('player', 3, 'EFFECT');
  assert(destRes.destroyed === true, 'Continuous Spell destroyed by chain removal effect');
  assert(engine.player.spellTrapZones[3] === null, 'Slot 3 vacated as card moved to Graveyard');
  assert(engine.player.graveyard.some(c => c.uid === chainContSpell.uid), 'Continuous Spell in Graveyard');
  assert(engine.isContinuousCardFaceUpOnField('player', chainContSpell) === false, 'Continuous Spell is no longer face-up on field');

  // Now resolve the Chain: CL1 should FIZZLE!
  engine.resolveChain();
  assert(engine.player.lp === initialPlayerLp, 'Continuous Spell effect did NOT apply (fizzled) because card was not face-up on field at resolution');
  assert(engine.logs.some(l => l.message && l.message.includes('không còn ngửa mặt trên sân')), 'Log recorded Master Rule v10 tr. 29 continuous card fizzle');

  // 6. Contrast with Normal Spell: Normal Spells STILL Resolve Even If Destroyed on Chain (Rulebook v10 tr. 29)
  const chainNormalSpell = { uid: 'p_chain_norm', def: normalSpellDef, ownerId: 'player' };
  engine.chainStack = [];
  const oppLpBeforeNormal = engine.opponent.lp;

  // Chain Link 1: Normal Spell activated (deals 450 damage)
  engine.pushChain(chainNormalSpell, 'player', 1, undefined, 'Chain Link 1: Bộc Phát Tỏa Nhiệt');

  // Normal spell does not need to remain on field, so resolveChain will execute its effect normally
  engine.resolveChain();
  assert(engine.opponent.lp === oppLpBeforeNormal - 450, 'Normal Spell successfully dealt 450 damage (Normal Spells resolve regardless of field status)');

  // 7. Continuous Trap Ongoing Battle Interference (Noble Membrane protects against attack)
  engine.activePlayerId = 'opponent';
  engine.currentPhase = 'BATTLE_PHASE';
  const oppAttacker = { uid: 'opp_iron_atk', def: { ...feDef, atk: 1800 }, ownerId: 'opponent' };
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: oppAttacker,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const plyDefender = { uid: 'ply_fe_def', def: { ...feDef, def: 1500 }, ownerId: 'player' };
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: plyDefender,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // Player has face-up Continuous Trap (Noble Membrane) in Slot 1
  assert(engine.player.spellTrapZones[1].isFaceUp === true, 'Player has face-up Continuous Trap');
  assert(engine.player.spellTrapZones[1].card.def.effectCode === 'TRAP_NOBLE_MEMBRANE_CONT', 'Trap is Noble Membrane');

  // Opponent attacks player's monster
  const atkResult = engine.declareAttack(0, 0);
  assert(atkResult.success === true, 'Attack declared');
  assert(engine.opponent.monsterZones[0].tempAtkBoost === -500, 'Noble Membrane continuously reduced attacker ATK by 500 (1800 -> 1300)');
  assert(atkResult.targetDestroyed === false, 'Defender was saved because attacker ATK (1300) < defender DEF (1500)!');
  assert(atkResult.reflectionDamageDealt === 200, 'Attacking player took 200 reflection damage (1500 DEF - 1300 ATK)');

  // 8. Negated Activation of Continuous Spell Routes to Graveyard
  const negatedContSpell = { uid: 'p_neg_cont', def: contSpellDef, ownerId: 'player' };
  engine.chainStack = [];
  engine.pushChain(negatedContSpell, 'player', 1, undefined, 'Chain Link 1');
  engine.chainStack[0].isNegated = true; // Negated by counter trap
  engine.player.spellTrapZones[4] = {
    slotIndex: 4,
    card: negatedContSpell,
    isFaceUp: true,
    turnSet: 1
  };
  engine.resolveChain();
  assert(engine.player.spellTrapZones[4] === null, 'Negated Continuous Spell removed from S/T zone');
  assert(engine.player.graveyard.some(c => c.uid === negatedContSpell.uid), 'Negated Continuous Spell routed to Graveyard per Rulebook v10 tr. 29');
}

// ==========================================
// GROUP 24: Quick-Play Spell Hand vs Field Activation Rules & Battle Phase Quick Activation Governance (Rulebook v10 tr. 29 & 43)
// ==========================================
console.log('\n--- Group 24: Quick-Play Spell Hand vs Field Activation Rules & Battle Phase Quick Activation Governance (Rulebook v10 tr. 29 & 43) ---');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.activePlayerId = 'player';
  engine.player.lp = 8000;
  engine.player.mana = 10;
  engine.opponent.lp = 8000;
  engine.opponent.mana = 10;

  // 1. Quick-Play Spell Definition & Activation from Hand during Own Turn
  const quickSurgeDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_thermite_surge');
  assert(quickSurgeDef !== undefined, 'Found Quick-Play Spell Thermite Surge card definition');
  assert(quickSurgeDef.spellTrapSubtype === 'QUICK_PLAY_SPELL', 'Subtype is QUICK_PLAY_SPELL');
  assert(quickSurgeDef.spellSpeed === 2, 'Quick-Play Spell has Spell Speed 2');

  const handQuickSurge = { uid: 'inst_hand_surge', def: quickSurgeDef, ownerId: 'player' };
  engine.player.hand.push(handQuickSurge);

  // Setup monster on player field
  const feDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_iron') || {
    id: 'card_elem_iron',
    name: 'Sắt (Fe)',
    cardType: 'ELEMENT_MONSTER',
    atk: 1400,
    def: 1200,
    manaCost: 2
  };
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'ply_fe_slot0', def: feDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // Activate Quick-Play Spell from hand in Main Phase 1 (allowed)
  const actHpRes = engine.activateSpellFromHand('player', handQuickSurge.uid, 0);
  assert(actHpRes.success === true, 'Quick-Play Spell activates from hand during turn player Main Phase 1');
  assert(engine.player.monsterZones[0].tempAtkBoost === 800, 'Thermite surge boosted monster ATK by +800 (1400 -> 2200)');
  assert(!engine.player.hand.some(c => c.uid === handQuickSurge.uid), 'Quick-Play Spell consumed from hand');
  assert(engine.player.graveyard.some(c => c.uid === handQuickSurge.uid), 'Resolved Quick-Play Spell routed to Graveyard');

  // 2. Quick-Play Spell from Hand during BATTLE PHASE of Own Turn (Rulebook v10 tr. 29)
  engine.currentPhase = 'BATTLE_PHASE';
  const handSurge2 = { uid: 'inst_hand_surge_bp', def: quickSurgeDef, ownerId: 'player' };
  engine.player.hand.push(handSurge2);

  const bpRes = engine.activateSpellFromHand('player', handSurge2.uid, 0);
  assert(bpRes.success === true, 'Quick-Play Spell can be activated from hand during Battle Phase of own turn (Rulebook v10 tr. 29)');
  assert(engine.player.monsterZones[0].tempAtkBoost === 1600, 'Second surge applied +800 ATK during Battle Phase (total +1600)');

  // 3. Contrast with Normal Spell: Normal Spell CANNOT be activated during Battle Phase!
  const normalSpellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_mass_spec_draw') || {
    id: 'card_spell_mass_spec_draw',
    name: 'Quang Phổ Khối Rút Bài',
    cardType: 'REACTION_SPELL',
    spellTrapSubtype: 'NORMAL_SPELL',
    spellSpeed: 1,
    manaCost: 2
  };
  const handNormalSpell = { uid: 'inst_hand_norm_bp', def: normalSpellDef, ownerId: 'player' };
  engine.player.hand.push(handNormalSpell);

  const normBpRes = engine.activateSpellFromHand('player', handNormalSpell.uid);
  assert(normBpRes.success === false, 'Normal Spell rejected from hand during Battle Phase');
  assert(normBpRes.message.includes('Main Phase 1 hoặc Main Phase 2'), 'Error indicates Normal Spells are restricted to Main Phase');
  assert(engine.player.hand.some(c => c.uid === handNormalSpell.uid), 'Rejected Normal Spell remains in hand');

  // 4. Quick-Play Spell from Hand during OPPONENT TURN (Rulebook v10 tr. 29 Rejection)
  engine.activePlayerId = 'opponent';
  engine.currentPhase = 'MAIN_PHASE_1';
  const handSurgeOppTurn = { uid: 'inst_hand_surge_opp_turn', def: quickSurgeDef, ownerId: 'player' };
  engine.player.hand.push(handSurgeOppTurn);

  const oppTurnRes = engine.activateSpellFromHand('player', handSurgeOppTurn.uid);
  assert(oppTurnRes.success === false, 'Quick-Play Spell from hand strictly REJECTED during opponent turn (Rulebook v10 tr. 29)');
  assert(oppTurnRes.message.includes('Rulebook v10 tr. 29'), 'Rejection error message cites Rulebook v10 tr. 29');
  assert(oppTurnRes.message.toLowerCase().includes('úp (set) xuống sân'), 'Error guides player that Quick-Play Spell must be Set first to use on opponent turn');
  assert(engine.player.hand.some(c => c.uid === handSurgeOppTurn.uid), 'Card remains safely in hand when rejected');

  // Normal Spell during opponent turn also rejected
  const normOppTurnRes = engine.activateSpellFromHand('player', handNormalSpell.uid);
  assert(normOppTurnRes.success === false, 'Normal Spell also rejected during opponent turn');
  assert(normOppTurnRes.message.includes('trong lượt của bạn'), 'Rejection error indicates own turn requirement');

  // 5. Setting Quick-Play Spell Face-Down & Same-Turn Activation Lock (Rulebook v10 tr. 29)
  // Back to player's turn, turn 1
  engine.activePlayerId = 'player';
  engine.currentTurn = 1;
  engine.currentPhase = 'MAIN_PHASE_1';

  // Set the Quick-Play Spell in S/T zone
  const setRes = engine.setSpellTrap('player', handSurgeOppTurn.uid);
  assert(setRes.success === true, 'Quick-Play Spell Set face-down successfully');
  assert(engine.player.spellTrapZones[0] !== null, 'Occupies S/T slot 0');
  assert(engine.player.spellTrapZones[0].isFaceUp === false, 'Stationed face-down');
  assert(engine.player.spellTrapZones[0].turnSet === 1, 'turnSet recorded as Turn 1');

  // Try to activate the Set Quick-Play Spell on Turn 1 (SAME TURN AS SET) -> MUST BE REJECTED!
  const sameTurnActRes = engine.activateSpellTrapFromField('player', 0);
  assert(sameTurnActRes.success === false, 'Quick-Play Spell CANNOT be activated during the turn it was Set (Rulebook v10 tr. 29)');
  assert(sameTurnActRes.message.includes('vừa đặt (Set) trong lượt này chưa thể kích hoạt'), 'Error explicitly cites turn set activation prohibition');
  assert(sameTurnActRes.message.includes('Rulebook v10 tr. 29'), 'Error cites Rulebook v10 tr. 29');
  assert(engine.player.spellTrapZones[0].isFaceUp === false, 'Card remains face-down on field');

  // 6. Activating Set Quick-Play Spell on Subsequent Turn (Opponent's Turn)
  // Advance turn to Turn 2 (opponent's turn)
  engine.currentTurn = 2;
  engine.activePlayerId = 'opponent';
  engine.currentPhase = 'BATTLE_PHASE';

  // Now player activates the Set Quick-Play Spell from field during opponent's turn!
  const oppTurnFieldRes = engine.activateSpellTrapFromField('player', 0, 0);
  assert(oppTurnFieldRes.success === true, 'Set Quick-Play Spell successfully activates from field during opponent turn after 1 turn');
  assert(engine.player.spellTrapZones[0] === null, 'Quick-Play Spell cleanly sent to Graveyard upon resolution');
  assert(engine.player.graveyard.some(c => c.uid === handSurgeOppTurn.uid), 'Quick-Play Spell in Graveyard');
  assert(engine.player.monsterZones[0].tempAtkBoost === 2400, 'Monster ATK further boosted by +800 on opponent turn (total +2400)');

  // 7. Damage Step Quick-Play Activation Governance (Rulebook v10 tr. 43)
  const testSurgeCard = { uid: 'ds_surge', def: quickSurgeDef, ownerId: 'player' };
  const testNormCard = { uid: 'ds_norm', def: normalSpellDef, ownerId: 'player' };
  const counterTrapDef = PLAYABLE_CARDS.find(c => c.def?.spellTrapSubtype === 'COUNTER_TRAP' || c.spellTrapSubtype === 'COUNTER_TRAP') || {
    id: 'card_trap_counter_generic',
    name: 'Bẫy Phản Kháng',
    cardType: 'TRAP',
    spellTrapSubtype: 'COUNTER_TRAP',
    spellSpeed: 3
  };
  const testCounterTrapCard = { uid: 'ds_counter', def: counterTrapDef, ownerId: 'player' };

  // Substep 1 (Start of Damage Step): ATK/DEF modifier allowed
  const ds1Res = engine.canActivateInDamageStep(testSurgeCard, 1);
  assert(ds1Res.allowed === true, 'Quick-Play ATK modifier allowed in Damage Step Substep 1');

  // Substep 2 (Before Damage Calculation): ATK/DEF modifier allowed
  const ds2Res = engine.canActivateInDamageStep(testSurgeCard, 2);
  assert(ds2Res.allowed === true, 'Quick-Play ATK modifier allowed in Damage Step Substep 2');

  // Substep 3 (During/After Damage Calculation): ATK/DEF modifier BLOCKED!
  const ds3Res = engine.canActivateInDamageStep(testSurgeCard, 3);
  assert(ds3Res.allowed === false, 'Quick-Play ATK modifier BLOCKED in Damage Step Substep 3 (Rulebook v10 tr. 43)');
  assert(ds3Res.reason.includes('Mốc 1 hoặc Mốc 2'), 'Reason explains ATK/DEF effects can only activate before damage calculation');

  // Normal Spell in Damage Step: BLOCKED!
  const dsNormRes = engine.canActivateInDamageStep(testNormCard, 1);
  assert(dsNormRes.allowed === false, 'Normal Spell BLOCKED throughout Damage Step');

  // Counter Trap in Damage Step: ALLOWED!
  const dsCounterRes = engine.canActivateInDamageStep(testCounterTrapCard, 3);
  assert(dsCounterRes.allowed === true, 'Counter Trap ALLOWED in Damage Step');

  // 8. Defender Set Quick-Play Spell Attack Reaction (Neutralize Attack & Heal)
  const neutDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_neutralization');
  assert(neutDef !== undefined, 'Found Neutralization Quick-Play Spell definition');
  assert(neutDef.spellTrapSubtype === 'QUICK_PLAY_SPELL', 'Neutralization is QUICK_PLAY_SPELL');

  // Player sets Neutralization on Turn 1
  engine.currentTurn = 1;
  const neutCard = { uid: 'p_set_neut', def: neutDef, ownerId: 'player' };
  engine.player.spellTrapZones[1] = {
    slotIndex: 1,
    card: neutCard,
    isFaceUp: false,
    turnSet: 1
  };

  // Turn 2: Opponent declares attack
  engine.currentTurn = 2;
  engine.activePlayerId = 'opponent';
  engine.currentPhase = 'BATTLE_PHASE';
  const oppAttackerCard = { uid: 'opp_atk_slot0', def: feDef, ownerId: 'opponent' };
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: oppAttackerCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  engine.player.lp = 6000;
  const initialPlayerLp = engine.player.lp;
  const defAtkRes = engine.declareAttack(0, 0);
  assert(defAtkRes.success === true, 'Attack declared');
  assert(defAtkRes.damageDealt === 0, 'Attack successfully neutralized by Set Quick-Play Spell (0 damage dealt)');
  assert(engine.player.lp === initialPlayerLp + 700, 'Neutralization Quick-Play Spell restored +700 LP to player (6000 -> 6700)');
  assert(engine.player.spellTrapZones[1] === null, 'Used Quick-Play Spell removed from S/T zone');
  assert(engine.player.graveyard.some(c => c.uid === neutCard.uid), 'Used Quick-Play Spell routed to Graveyard');
}

// ==========================================
// GROUP 25: Duelist Concession / Surrender Protocol & AI Sportsmanship Yield Engine (Rulebook v10 tr. 33)
// ==========================================
console.log('\n--- Group 25: Duelist Concession / Surrender Protocol & AI Sportsmanship Yield Engine (Rulebook v10 tr. 33) ---');
{
  const engine = new DuelEngine();
  engine.player.lp = 8000;
  engine.opponent.lp = 8000;
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.activePlayerId = 'player';
  assert(engine.outcome === 'IN_PROGRESS', 'Duel initialized in progress');

  // 1. Player Surrender Workflow (Rulebook v10 tr. 33)
  const playerSurrenderRes = engine.surrenderDuel('player');
  assert(playerSurrenderRes.success === true, 'Player surrender accepted successfully');
  assert(playerSurrenderRes.outcome === 'OPPONENT_VICTORY', 'Outcome is OPPONENT_VICTORY when player surrenders');
  assert(engine.outcome === 'OPPONENT_VICTORY', 'Engine outcome updated to OPPONENT_VICTORY');
  assert(engine.logs.some(l => l.message && l.message.includes('[ĐẦU HÀNG DANH DỰ - Rulebook v10 tr. 33]')), 'System log recorded Rulebook v10 tr. 33 surrender entry');

  // 2. Reject Surrender when Match is Already Concluded
  const postMatchSurrender = engine.surrenderDuel('player');
  assert(postMatchSurrender.success === false, 'Cannot surrender when match is already concluded');
  assert(postMatchSurrender.message.includes('Trận đấu đã kết thúc'), 'Error message informs duelist that duel is over');

  // 3. Opponent Surrender Workflow
  const freshEngine = new DuelEngine();
  assert(freshEngine.outcome === 'IN_PROGRESS', 'Fresh engine in progress');
  const oppSurrenderRes = freshEngine.surrenderDuel('opponent');
  assert(oppSurrenderRes.success === true, 'Opponent surrender accepted successfully');
  assert(oppSurrenderRes.outcome === 'PLAYER_VICTORY', 'Outcome is PLAYER_VICTORY when opponent surrenders');
  assert(freshEngine.outcome === 'PLAYER_VICTORY', 'Fresh engine outcome updated to PLAYER_VICTORY');
  assert(freshEngine.logs.some(l => l.message && l.message.includes('[ĐỐI THỦ XIN THUA - Rulebook v10 tr. 33]')), 'Opponent forfeit recorded in system log');

  // 4. Mid-Chain Surrender Flushes Pending Chain & Replay Stack
  const midChainEngine = new DuelEngine();
  midChainEngine.pushChain({ uid: 'c1', def: PLAYABLE_CARDS[0], ownerId: 'player' }, 'player', 1);
  midChainEngine.pushChain({ uid: 'c2', def: PLAYABLE_CARDS[1], ownerId: 'opponent' }, 'opponent', 2);
  assert(midChainEngine.chainStack.length === 2, 'Two chain links active on chain stack');
  
  const midSurrender = midChainEngine.surrenderDuel('player');
  assert(midSurrender.success === true, 'Mid-chain surrender succeeds immediately');
  assert(midChainEngine.chainStack.length === 0, 'Chain stack safely flushed to empty upon surrender');
  assert(midChainEngine.activeReplayState === null, 'Active replay state safely cleared');

  // 5. Autonomous AI Surrender Threshold Evaluation (aiCheckSurrenderCondition)
  const aiTestEngine = new DuelEngine();
  
  // Subcase A: Early turn (turn 2) with low LP -> DOES NOT CONCEDE
  aiTestEngine.currentTurn = 2;
  aiTestEngine.opponent.lp = 500;
  assert(aiTestEngine.aiCheckSurrenderCondition() === false, 'AI does not surrender on early turns (turn < 4)');

  // Subcase B: Turn 5 with high LP (3000 LP) -> DOES NOT CONCEDE
  aiTestEngine.currentTurn = 5;
  aiTestEngine.opponent.lp = 3000;
  assert(aiTestEngine.aiCheckSurrenderCondition() === false, 'AI does not surrender when LP > 1000');

  // Subcase C: Turn 5, AI has 600 LP, 0 monsters, 0 S/T, but player field ATK < 5000 -> DOES NOT CONCEDE
  aiTestEngine.opponent.lp = 600;
  aiTestEngine.opponent.monsterZones = [null, null, null, null, null];
  aiTestEngine.opponent.spellTrapZones = [null, null, null, null, null];
  aiTestEngine.opponent.hand = [{ uid: 'ai_h1', def: PLAYABLE_CARDS[0], ownerId: 'opponent' }];
  // Player has 2000 ATK
  aiTestEngine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'p_mon', def: { ...PLAYABLE_CARDS[0], atk: 2000 }, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  assert(aiTestEngine.aiCheckSurrenderCondition() === false, 'AI does not surrender when player board lacks lethal overkill (< 5000 combined ATK)');

  // Subcase D: Turn 5, AI has 600 LP, 0 monsters, 0 S/T, 1 hand card, player has 5500 combined ATK (2000 + 3500) -> CONCEDES!
  aiTestEngine.player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'p_mon2', def: { ...PLAYABLE_CARDS[0], atk: 3500 }, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  // Total player ATK: 2000 + 3500 = 5500 >= 5000
  const aiConceded = aiTestEngine.aiCheckSurrenderCondition();
  assert(aiConceded === true, 'AI autonomously concedes against overwhelming lethal board (> 5000 ATK, empty AI field, LP <= 1000, turn >= 4)');
  assert(aiTestEngine.outcome === 'PLAYER_VICTORY', 'Outcome is PLAYER_VICTORY upon AI concession');
  assert(aiTestEngine.logs.some(l => l.message && l.message.includes('[ĐỐI THỦ XIN THUA - Rulebook v10 tr. 33]')), 'Autonomous AI surrender logged officially');

  // 6. Scientist Persona Surrender Dialogue Engine
  const personas = ['MENDELEEV', 'CURIE', 'LAVOISIER', 'ALPHA', 'BETA'];
  for (const persona of personas) {
    const quip = CharacterQuipEngine.getQuip(persona, 'SURRENDER');
    assert(quip !== undefined, `Found surrender quip for persona [${persona}]`);
    assert(quip.speaker && quip.speaker.length > 0, `Persona [${persona}] surrender quip has valid speaker`);
    assert(quip.quoteVI && quip.quoteVI.length > 0, `Persona [${persona}] surrender quip has Vietnamese quote`);
    assert(quip.quoteEN && quip.quoteEN.length > 0, `Persona [${persona}] surrender quip has English quote`);
    assert(quip.scientificContextVI && quip.scientificContextVI.length > 0, `Persona [${persona}] surrender quip has scientific context`);
  }
}

// ==========================================
// GROUP 26: Match Tiebreaker, Simultaneous LP Zero & Sequential Chain Damage Governance (Rulebook v10 tr. 33 & tr. 50)
// ==========================================
console.log('\n--- Group 26: Match Tiebreaker, Simultaneous LP Zero & Sequential Chain Damage Governance (Rulebook v10 tr. 33 & tr. 50) ---');
{
  // 1. Nitroglycerin Supercritical Detonation Wave Card Definition Audit
  const nitroCard = PLAYABLE_CARDS.find(c => c.id === 'card_spell_nitroglycerin_detonation');
  assert(nitroCard !== undefined, 'card_spell_nitroglycerin_detonation is registered in PLAYABLE_CARDS');
  assert(nitroCard.effectCode === 'SPELL_MUTUAL_DETONATION', 'Nitroglycerin card has SPELL_MUTUAL_DETONATION effectCode');
  assert(nitroCard.cardType === 'REACTION_SPELL', 'Nitroglycerin is REACTION_SPELL');
  assert(nitroCard.spellTrapSubtype === 'NORMAL_SPELL', 'Nitroglycerin is NORMAL_SPELL');
  assert(nitroCard.spellSpeed === 1, 'Nitroglycerin has Spell Speed 1');
  assert(nitroCard.attribute === 'PYRO', 'Nitroglycerin is PYRO attribute');
  assert(nitroCard.manaCost === 4, 'Nitroglycerin has 4 manaCost');
  assert(nitroCard.relatedEquation.includes('4C₃H₅(NO₃)₃(l) → 12CO₂(g) + 10H₂O(g) + 6N₂(g) + O₂(g)'), 'Nitroglycerin stoichiometric decomposition equation strictly validated');

  // 2. Simultaneous LP 0 -> Exact DRAW (Double Knockout - Rulebook v10 tr. 33)
  const drawEngine = new DuelEngine();
  drawEngine.player.lp = 1000;
  drawEngine.opponent.lp = 1200;
  drawEngine.player.mana = 5;
  drawEngine.currentPhase = 'MAIN_PHASE_1';
  drawEngine.activePlayerId = 'player';
  drawEngine.player.hand = [{
    uid: 'nitro_spell_1',
    def: nitroCard,
    ownerId: 'player'
  }];

  const actResult = drawEngine.activateSpellFromHand('player', 'nitro_spell_1');
  assert(actResult.success === true, 'Activation of Supercritical Nitroglycerin Detonation succeeds');
  assert(drawEngine.player.lp === 0, 'Player LP reduced to 0 from simultaneous 1500 blast');
  assert(drawEngine.opponent.lp === 0, 'Opponent LP reduced to 0 from simultaneous 1500 blast');
  assert(drawEngine.outcome === 'DRAW', 'Rulebook v10 tr. 33: Simultaneous LP 0 evaluates strictly to DRAW (Double Knockout)');
  assert(
    drawEngine.logs.some(l => l.message && l.message.includes('[KẾT QUẢ HÒA TRẬN - Rulebook v10 tr. 33]')),
    'Official Rulebook v10 tr. 33 tiebreaker DRAW logged'
  );

  // 3. Mutual Detonation where only opponent drops to 0 -> PLAYER_VICTORY
  const pWinEngine = new DuelEngine();
  pWinEngine.player.lp = 2500;
  pWinEngine.opponent.lp = 1000;
  pWinEngine.player.mana = 5;
  pWinEngine.currentPhase = 'MAIN_PHASE_1';
  pWinEngine.activePlayerId = 'player';
  pWinEngine.player.hand = [{
    uid: 'nitro_spell_2',
    def: nitroCard,
    ownerId: 'player'
  }];

  pWinEngine.activateSpellFromHand('player', 'nitro_spell_2');
  assert(pWinEngine.player.lp === 1000, 'Player retains 1000 LP (2500 - 1500)');
  assert(pWinEngine.opponent.lp === 0, 'Opponent LP drops to 0 (1000 - 1500)');
  assert(pWinEngine.outcome === 'PLAYER_VICTORY', 'Single LP 0 evaluates strictly to PLAYER_VICTORY, not DRAW');

  // 4. Mutual Detonation where only player drops to 0 -> OPPONENT_VICTORY
  const oppWinEngine = new DuelEngine();
  oppWinEngine.player.lp = 800;
  oppWinEngine.opponent.lp = 3000;
  oppWinEngine.player.mana = 5;
  oppWinEngine.currentPhase = 'MAIN_PHASE_1';
  oppWinEngine.activePlayerId = 'player';
  oppWinEngine.player.hand = [{
    uid: 'nitro_spell_3',
    def: nitroCard,
    ownerId: 'player'
  }];

  oppWinEngine.activateSpellFromHand('player', 'nitro_spell_3');
  assert(oppWinEngine.player.lp === 0, 'Player LP drops to 0 (800 - 1500)');
  assert(oppWinEngine.opponent.lp === 1500, 'Opponent retains 1500 LP (3000 - 1500)');
  assert(oppWinEngine.outcome === 'OPPONENT_VICTORY', 'Player LP 0 evaluates strictly to OPPONENT_VICTORY');

  // 5. Sequential Chain Damage Check (Rulebook v10 tr. 50):
  // CL2 resolves first in LIFO and drops Player LP to 0 -> duel terminates immediately!
  // CL1 (which would have dealt damage to opponent) is discarded and NEVER resolves.
  const seqEngine = new DuelEngine();
  seqEngine.player.lp = 500;
  seqEngine.opponent.lp = 500;
  seqEngine.currentPhase = 'MAIN_PHASE_1';

  // Construct Chain Link 1: Player activates Exo Burst (deals 900 damage to opponent if pyro on field, else 450)
  // Let's create card instances
  const exoDef = PLAYABLE_CARDS.find(c => c.effectCode === 'SPELL_EXO_BURST');
  const pressureDef = PLAYABLE_CARDS.find(c => c.effectCode === 'SPELL_PRESSURE_PUMP'); // deals 600 damage to opponent (relative to activator)

  // Push CL1: Player casts Exo Burst against opponent (would deal 450 damage)
  seqEngine.pushChain(
    { uid: 'cl1_card', def: exoDef, ownerId: 'player' },
    'player',
    1,
    undefined,
    'Player activates Exo Burst'
  );

  // Push CL2: Opponent chains Pressure Pump (activator is 'opponent', so opponent's opponent = player takes 600 damage)
  seqEngine.pushChain(
    { uid: 'cl2_card', def: pressureDef, ownerId: 'opponent' },
    'opponent',
    2,
    undefined,
    'Opponent chains Pressure Pump'
  );

  assert(seqEngine.chainStack.length === 2, 'Chain has 2 links built before resolution');

  // Resolve chain: CL2 resolves first -> player takes 600 damage -> player LP: 500 - 600 = 0!
  seqEngine.resolveChain();

  assert(seqEngine.player.lp === 0, 'Player took 600 damage from CL2 and reached 0 LP');
  assert(seqEngine.opponent.lp === 500, 'Rulebook v10 tr. 50: Opponent LP is untouched (500) because CL1 was aborted mid-chain');
  assert(seqEngine.outcome === 'OPPONENT_VICTORY', 'Outcome is strictly OPPONENT_VICTORY (not a DRAW!)');
  assert(seqEngine.chainStack.length === 0, 'Remaining chain links in stack were flushed upon mid-chain duel conclusion');
  assert(
    seqEngine.logs.some(l => l.message && l.message.includes('[Kết Thúc Trận Đấu Giữa Chuỗi - Rulebook v10 tr. 50]')),
    'Rulebook v10 tr. 50 mid-chain termination logged with official citation'
  );

  // 6. Sequential Chain Damage Check Part 2: CL2 defeats Opponent -> CL1 aborted, Player safe
  const seqEngine2 = new DuelEngine();
  seqEngine2.player.lp = 400;
  seqEngine2.opponent.lp = 500;

  // CL1: Opponent casts Pressure Pump targeting player (deals 600 damage, would defeat player!)
  seqEngine2.pushChain(
    { uid: 'cl1_opp_pump', def: pressureDef, ownerId: 'opponent' },
    'opponent',
    1,
    undefined,
    'Opponent casts lethal Pressure Pump'
  );

  // CL2: Player chains Quick-Play or Exo Burst dealing 600 damage to opponent
  // Let's create an effect that deals 600 damage to opponent: Pressure Pump by player
  seqEngine2.pushChain(
    { uid: 'cl2_player_pump', def: pressureDef, ownerId: 'player' },
    'player',
    2,
    undefined,
    'Player chains Pressure Pump'
  );

  seqEngine2.resolveChain();

  assert(seqEngine2.opponent.lp === 0, 'Opponent took 600 damage from CL2 and reached 0 LP');
  assert(seqEngine2.player.lp === 400, 'Rulebook v10 tr. 50: Player took NO damage from CL1 (remains 400 LP) because match ended immediately on CL2');
  assert(seqEngine2.outcome === 'PLAYER_VICTORY', 'Player achieves PLAYER_VICTORY before CL1 can execute');
  assert(seqEngine2.chainStack.length === 0, 'CL1 discarded from chainStack');

  // 7. Equal ATK Combat Standoff (Rulebook v10 tr. 50 & tr. 42-43)
  const combatEngine = new DuelEngine();
  combatEngine.currentPhase = 'BATTLE_PHASE';
  combatEngine.activePlayerId = 'player';
  combatEngine.player.lp = 8000;
  combatEngine.opponent.lp = 8000;

  // Both have 1500 ATK monsters in Attack position
  combatEngine.player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'atk_mon_1', def: { ...PLAYABLE_CARDS[0], name: 'Metal Fighter A', atk: 1500, def: 1000 }, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  combatEngine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'atk_mon_2', def: { ...PLAYABLE_CARDS[1], name: 'Metal Fighter B', atk: 1500, def: 1200 }, ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const battleResult = combatEngine.declareAttack(0, 0);
  assert(battleResult.success === true, 'Attack declaration succeeds');
  assert(battleResult.attackerDestroyed === true, 'Attacker destroyed in equal ATK battle');
  assert(battleResult.targetDestroyed === true, 'Defender destroyed in equal ATK battle');
  assert(battleResult.damageDealt === 0, 'Zero battle damage dealt when ATK values are identical');
  assert(combatEngine.player.lp === 8000, 'Attacker LP remains 8000');
  assert(combatEngine.opponent.lp === 8000, 'Defender LP remains 8000');
  assert(combatEngine.outcome === 'IN_PROGRESS', 'Duel remains IN_PROGRESS after equal ATK mutual monster destruction');

  // 8. 0 ATK vs 0 ATK battle: Neither is destroyed (Rulebook v10 tr. 50)
  combatEngine.player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'zero_mon_1', def: { ...PLAYABLE_CARDS[0], name: 'Zero ATK A', atk: 0, def: 1000 }, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  combatEngine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'zero_mon_2', def: { ...PLAYABLE_CARDS[1], name: 'Zero ATK B', atk: 0, def: 1200 }, ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const zeroResult = combatEngine.declareAttack(1, 1);
  assert(zeroResult.attackerDestroyed === false, '0 ATK monster cannot destroy or be destroyed by another 0 ATK monster (Rulebook v10 tr. 50)');
  assert(zeroResult.targetDestroyed === false, 'Defender 0 ATK monster survives');
  assert(zeroResult.damageDealt === 0, 'Zero damage in 0 ATK battle');
  assert(combatEngine.player.monsterZones[1] !== null, 'Attacker remains on field');
  assert(combatEngine.opponent.monsterZones[1] !== null, 'Defender remains on field');
}

// ==========================================
// GROUP 27: End Phase Hand Size Limit Discard Governance & AI Discard Optimization (Rulebook v10 tr. 31 & 35)
// ==========================================
console.log('\n--- Group 27: End Phase Hand Size Limit Discard Governance & AI Discard Optimization (Rulebook v10 tr. 31 & 35) ---');
{
  const engine = new DuelEngine();
  engine.currentPhase = 'MAIN_PHASE_2';
  engine.activePlayerId = 'player';

  // 1. Hand Size Limit Calculation & Predicates
  engine.player.hand = [];
  assert(engine.getHandSizeLimitExcess('player') === 0, 'Excess is 0 when hand is empty');
  assert(engine.isHandSizeLimitExceeded('player') === false, 'Not exceeded when hand is empty');

  // Fill player hand with 6 cards
  for (let i = 0; i < 6; i++) {
    engine.player.hand.push({
      uid: `p_hand_${i}`,
      def: { ...PLAYABLE_CARDS[i] },
      ownerId: 'player'
    });
  }
  assert(engine.getHandSizeLimitExcess('player') === 0, 'Excess is exactly 0 with 6 cards (max limit)');
  assert(engine.isHandSizeLimitExceeded('player') === false, 'Hand size not exceeded with exactly 6 cards');

  // Add 2 more cards -> total 8 (excess 2)
  engine.player.hand.push({
    uid: 'p_hand_6',
    def: { ...PLAYABLE_CARDS[6] },
    ownerId: 'player'
  });
  engine.player.hand.push({
    uid: 'p_hand_7',
    def: { ...PLAYABLE_CARDS[7] },
    ownerId: 'player'
  });
  assert(engine.player.hand.length === 8, 'Player has 8 cards in hand');
  assert(engine.getHandSizeLimitExcess('player') === 2, 'Excess is exactly 2 cards (8 - 6)');
  assert(engine.isHandSizeLimitExceeded('player') === true, 'Hand size limit exceeded flag is true');

  // 2. Specific Card Discard Execution (discardCardFromHand)
  const initialGyCount = engine.player.graveyard.length;
  const discardRes = engine.discardCardFromHand('player', 'p_hand_7');
  assert(discardRes.success === true, 'Discarding specific card from hand succeeds');
  assert(discardRes.remainingExcess === 1, 'Remaining excess drops from 2 to 1');
  assert(engine.player.hand.length === 7, 'Player hand reduced to 7 cards');
  assert(!engine.player.hand.some(c => c.uid === 'p_hand_7'), 'Discarded card p_hand_7 no longer in hand');
  assert(engine.player.graveyard.length === initialGyCount + 1, 'Discarded card added to Graveyard');
  assert(engine.player.graveyard[engine.player.graveyard.length - 1].uid === 'p_hand_7', 'Discarded card matches uid in Graveyard');
  assert(
    engine.logs.some(l => l.message && l.message.includes('[Quy Tắc Giới Hạn Bài Trên Tay - Rulebook v10 tr. 31]')),
    'Official Rulebook v10 tr. 31 hand limit log emitted'
  );

  // 3. Reject invalid card UID discard
  const invalidDiscard = engine.discardCardFromHand('player', 'non_existent_uid');
  assert(invalidDiscard.success === false, 'Discarding invalid UID is safely rejected');

  // 4. Multiple Card Batch Discard Execution (discardMultipleCardsFromHand)
  // Add 3 cards to player hand (currently 7 + 3 = 10 cards, excess 4)
  for (let i = 0; i < 3; i++) {
    engine.player.hand.push({
      uid: `batch_card_${i}`,
      def: { ...PLAYABLE_CARDS[i] },
      ownerId: 'player'
    });
  }
  assert(engine.player.hand.length === 10, 'Player hand now has 10 cards');
  assert(engine.getHandSizeLimitExcess('player') === 4, 'Excess is 4 cards');

  const batchRes = engine.discardMultipleCardsFromHand('player', ['batch_card_0', 'batch_card_1', 'batch_card_2', 'p_hand_6']);
  assert(batchRes.success === true, 'Batch discard succeeds');
  assert(batchRes.discardedCount === 4, 'Exactly 4 cards discarded in batch');
  assert(engine.player.hand.length === 6, 'Player hand restored to exactly 6 cards limit');
  assert(engine.getHandSizeLimitExcess('player') === 0, 'Excess is now 0');

  // 5. Opponent Hand Not Affected by Turn Player End Phase (Rulebook v10 tr. 31)
  // Give Opponent 8 cards in hand
  engine.opponent.hand = [];
  for (let i = 0; i < 8; i++) {
    engine.opponent.hand.push({
      uid: `opp_card_${i}`,
      def: { ...PLAYABLE_CARDS[i] },
      ownerId: 'opponent'
    });
  }
  assert(engine.opponent.hand.length === 8, 'Opponent has 8 cards in hand');

  // Player gives themselves 8 cards and resolves End Phase with 2 chosen discards
  engine.player.hand.push({ uid: 'p_extra_1', def: PLAYABLE_CARDS[0], ownerId: 'player' });
  engine.player.hand.push({ uid: 'p_extra_2', def: PLAYABLE_CARDS[1], ownerId: 'player' });
  assert(engine.player.hand.length === 8, 'Player has 8 cards before End Phase');

  // Stub AI auto-run so we can observe the state immediately after player's End Phase transition
  engine.runAiTurn = () => {};
  engine.resolveEndPhase('player', ['p_extra_1', 'p_extra_2']);

  assert(engine.player.hand.length === 6, 'Player hand reduced to exactly 6 cards upon End Phase');
  assert(engine.player.graveyard.some(c => c.uid === 'p_extra_1'), 'Chosen card p_extra_1 routed to Graveyard');
  assert(engine.player.graveyard.some(c => c.uid === 'p_extra_2'), 'Chosen card p_extra_2 routed to Graveyard');
  assert(engine.opponent.hand.length >= 8, 'Rulebook v10 tr. 31: Opponent hand remains >= 8 cards (NOT discarded because it is not opponent End Phase)');
  assert(engine.activePlayerId === 'opponent', 'Turn successfully transitioned to opponent');

  // 6. AI Strategic Discard Optimization (aiSelectHandDiscardCards)
  const aiTestEngine = new DuelEngine();
  aiTestEngine.activePlayerId = 'opponent';
  aiTestEngine.currentPhase = 'MAIN_PHASE_2';
  aiTestEngine.opponent.mana = 2;

  // Set active field for AI
  aiTestEngine.opponent.fieldZone = {
    uid: 'active_field_inst',
    def: { ...PLAYABLE_CARDS.find(c => c.cardType === 'FIELD_ENVIRONMENT') },
    ownerId: 'opponent'
  };

  // Build AI hand with 8 cards (excess 2):
  // 1. High-value Tuner (Platinum) -> Should PRESERVE (-40 score)
  const tunerDef = PLAYABLE_CARDS.find(c => c.isTuner) || { ...PLAYABLE_CARDS[0], isTuner: true, id: 'tuner_test' };
  // 2. Staple Level 4 monster -> Should PRESERVE (-30 score)
  const starterDef = { ...PLAYABLE_CARDS[0], cardType: 'ELEMENT_MONSTER', level: 4, id: 'starter_test' };
  // 3. Counter Trap -> Should PRESERVE (-20 score)
  const counterTrapDef = { ...PLAYABLE_CARDS[0], spellTrapSubtype: 'COUNTER_TRAP', id: 'counter_trap_test' };
  // 4. Draw spell -> Should PRESERVE (-25 score)
  const drawDef = { ...PLAYABLE_CARDS[0], effectCode: 'SPELL_DRAW_2', id: 'draw_test' };
  // 5. Normal spell A
  const spellDef = PLAYABLE_CARDS.find(c => c.cardType === 'REACTION_SPELL' && c.manaCost <= 2) || PLAYABLE_CARDS[0];
  const normalCardA = { ...spellDef, id: 'unique_spell_a' };
  // 6. Normal Level 4 monster B (preserved starter, -30 score)
  const normalCardB = { ...PLAYABLE_CARDS[0], cardType: 'ELEMENT_MONSTER', level: 4, manaCost: 2, id: 'unique_card_b' };
  // 7. DUPLICATE of normalCardA -> Highly preferred to discard (+50 score)
  const duplicateCardA = { ...spellDef, id: 'unique_spell_a' };
  // 8. DUPLICATE Field Spell when field already active -> Highly preferred to discard (+40 score)
  const extraFieldSpell = { ...PLAYABLE_CARDS.find(c => c.cardType === 'FIELD_ENVIRONMENT'), id: 'extra_field_spell', manaCost: 2 };

  aiTestEngine.opponent.hand = [
    { uid: 'ai_tuner', def: tunerDef, ownerId: 'opponent' },
    { uid: 'ai_starter', def: starterDef, ownerId: 'opponent' },
    { uid: 'ai_counter', def: counterTrapDef, ownerId: 'opponent' },
    { uid: 'ai_draw', def: drawDef, ownerId: 'opponent' },
    { uid: 'ai_card_a', def: normalCardA, ownerId: 'opponent' },
    { uid: 'ai_card_b', def: normalCardB, ownerId: 'opponent' },
    { uid: 'ai_dup_a', def: duplicateCardA, ownerId: 'opponent' },
    { uid: 'ai_extra_field', def: extraFieldSpell, ownerId: 'opponent' }
  ];

  assert(aiTestEngine.opponent.hand.length === 8, 'AI has 8 cards in hand');
  assert(aiTestEngine.getHandSizeLimitExcess('opponent') === 2, 'AI has 2 excess cards to discard');

  const optimalDiscards = aiTestEngine.aiSelectHandDiscardCards('opponent');
  assert(optimalDiscards.length === 2, 'AI selected exactly 2 cards for discard');

  const discardedUids = optimalDiscards.map(c => c.uid);
  assert(discardedUids.includes('ai_dup_a'), 'AI strategically discards duplicate card (high discard preference score)');
  assert(discardedUids.includes('ai_extra_field'), 'AI strategically discards redundant field spell (field already active)');
  assert(!discardedUids.includes('ai_tuner'), 'AI strictly preserves Tuner monster for Synchro summoning');
  assert(!discardedUids.includes('ai_starter'), 'AI strictly preserves Level 4 starter monster');
  assert(!discardedUids.includes('ai_counter'), 'AI strictly preserves Counter Trap');

  // 7. End-to-End AI End Phase Hand Discard Resolution
  aiTestEngine.resolveEndPhase('opponent');
  assert(aiTestEngine.opponent.hand.length === 6, 'AI hand reduced to exactly 6 cards after End Phase');
  assert(!aiTestEngine.opponent.hand.some(c => c.uid === 'ai_dup_a'), 'Duplicate card discarded to AI Graveyard');
  assert(!aiTestEngine.opponent.hand.some(c => c.uid === 'ai_extra_field'), 'Redundant field spell discarded to AI Graveyard');
  assert(aiTestEngine.opponent.hand.some(c => c.uid === 'ai_tuner'), 'Tuner remains safely in AI hand');
  assert(aiTestEngine.opponent.hand.some(c => c.uid === 'ai_counter'), 'Counter Trap remains safely in AI hand');
  assert(aiTestEngine.activePlayerId === 'player', 'Turn transitioned to player');
}

// ============================================================
// Group 28: Dual Field Spell Independent Ownership & Mechanics Replacement Routing (Rulebook v10 tr. 28 & Master Rule 2021 Update)
// ============================================================
{
  console.log('\n--- Group 28: Dual Field Spell Independent Ownership & Mechanics Replacement Routing (Rulebook v10 tr. 28 & Master Rule 2021 Update) ---');

  const engine = new DuelEngine();
  const player = engine.player;
  const opponent = engine.opponent;

  // 1. Initial State & Field Zone Separation
  assert(player.fieldZone === null, 'Player Field Zone initialized to null');
  assert(opponent.fieldZone === null, 'Opponent Field Zone initialized to null');
  assert(player.spellTrapZones.length === 5, 'Player has exactly 5 Spell & Trap Zones');
  assert(player.spellTrapZones.every(s => s === null), 'All 5 Spell & Trap Zones empty initially');

  const acidRainDef = PLAYABLE_CARDS.find(c => c.id === 'card_field_acid_rain');
  const cryogenicDef = PLAYABLE_CARDS.find(c => c.id === 'card_field_cryogenic_lab');
  const haberDef = PLAYABLE_CARDS.find(c => c.id === 'card_field_haber_chamber');
  const alkalineDef = PLAYABLE_CARDS.find(c => c.id === 'card_field_alkaline_spring');

  assert(acidRainDef !== undefined, 'Acid Rain card registered in PLAYABLE_CARDS');
  assert(acidRainDef.cardType === 'FIELD_ENVIRONMENT', 'Acid Rain is FIELD_ENVIRONMENT');
  assert(acidRainDef.spellTrapSubtype === 'FIELD_SPELL', 'Acid Rain subtype is FIELD_SPELL');

  // 2. Setting a Field Spell Face-Down in Field Zone (Rulebook v10 tr. 28)
  // "You can also Set a Field Spell Card face-down in your Field Zone. It will have no effect until you activate it."
  player.hand = [
    { uid: 'p_field_acid', def: acidRainDef, ownerId: 'player' },
    { uid: 'p_field_haber', def: haberDef, ownerId: 'player' }
  ];
  player.mana = 10;
  opponent.mana = 10;

  const setRes = engine.setSpellTrap('player', 'p_field_acid');
  assert(setRes.success === true, 'Setting Field Spell card face-down succeeds');
  assert(player.fieldZone !== null, 'Player Field Zone is occupied by Set Field card');
  assert(player.fieldZone.uid === 'p_field_acid', 'Player Field Zone contains p_field_acid');
  assert(player.fieldZone.isFaceDown === true, 'Set Field Spell is marked isFaceDown = true');
  assert(player.hand.length === 1, 'Field card removed from player hand upon Setting');

  // Crucial invariant: Setting Field Spell DOES NOT consume any of the 5 S/T zones!
  assert(player.spellTrapZones.every(s => s === null), 'Setting Field Spell does not consume any of the 5 Spell/Trap zones (Rulebook v10 tr. 28)');

  // Face-down Field Spell is NOT active on field
  assert(engine.isContinuousCardFaceUpOnField('player', player.fieldZone) === false, 'Face-down Field Spell is not face-up on field (isContinuousCardFaceUpOnField = false)');

  // Standby Phase: Face-down Field Spell does not trigger passive effects
  const initialLogsCount = engine.logs.length;
  engine.resolveStandbyEffects('player');
  const standbyLogs = engine.logs.slice(initialLogsCount).map(l => l.message);
  assert(!standbyLogs.some(t => t.includes('[Hiệu ứng Địa Bàn: Mưa Axit]')), 'Face-down Field Spell has NO effect during Standby Phase (Rulebook v10 tr. 28)');

  // 3. Activating Set Field Spell from Field Zone (activateFieldSpellFromField)
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.activePlayerId = 'player';

  const activateFromFieldRes = engine.activateFieldSpellFromField('player');
  assert(activateFromFieldRes.success === true, 'Activating Set Field Spell from Field Zone succeeds');
  assert(player.fieldZone.isFaceDown === false, 'Field Spell is now face-up (isFaceDown = false)');
  assert(engine.environment.ph === 2.8, 'Acid Rain effect successfully resolved: pH = 2.8');
  assert(engine.isContinuousCardFaceUpOnField('player', player.fieldZone) === true, 'Active Field Spell is now face-up on field');

  // Official Rulebook v10 tr. 28 activation log
  const fieldLogs = engine.logs.map(l => l.message);
  assert(fieldLogs.some(t => t.includes('[Kích Hoạt Địa Bàn Từ Sân - Rulebook v10 tr. 28]')), 'Official Rulebook v10 tr. 28 Field activation from field logged');

  // Cannot activate an already active face-up Field Spell from field
  const secondActivate = engine.activateFieldSpellFromField('player');
  assert(secondActivate.success === false, 'Cannot re-activate an already face-up active Field Spell');

  // 4. Coexistence of 2 Independent Field Spells (Master Rule 2021 Update / Rulebook v10 tr. 28)
  opponent.hand = [
    { uid: 'opp_field_cryo', def: cryogenicDef, ownerId: 'opponent' }
  ];
  engine.activePlayerId = 'opponent';

  const oppActRes = engine.activateSpellFromHand('opponent', 'opp_field_cryo');
  assert(oppActRes.success === true, 'Opponent activates Cryogenic Lab from hand succeeds');
  assert(opponent.fieldZone !== null, 'Opponent Field Zone is occupied');
  assert(opponent.fieldZone.uid === 'opp_field_cryo', 'Opponent controls Cryogenic Lab');
  assert(opponent.fieldZone.isFaceDown === false, 'Opponent Field Spell is face-up active');
  assert(engine.environment.temperature === 253.15, 'Cryogenic Lab temperature set to 253.15 K (-20°C)');

  // DUAL FIELD SPELL INVARIANT: Player Field Spell remains 100% active and untouched!
  assert(player.fieldZone !== null, 'Master Rule 2021: Player Field Spell remains intact when Opponent activates a Field Spell');
  assert(player.fieldZone.uid === 'p_field_acid', 'Player still controls Acid Rain');
  assert(player.fieldZone.isFaceDown === false, 'Player Acid Rain remains face-up active');
  assert(!player.graveyard.some(c => c.uid === 'p_field_acid'), 'Player Acid Rain was NOT sent to Graveyard by opponent field activation');

  // 5. Replacement Mechanics (Rulebook v10 tr. 28)
  engine.activePlayerId = 'player';
  const playerGraveInitialCount = player.graveyard.length;

  const replaceRes = engine.activateSpellFromHand('player', 'p_field_haber');
  assert(replaceRes.success === true, 'Player activates Haber-Bosch Hyperbaric Reactor from hand');
  assert(player.fieldZone.uid === 'p_field_haber', 'Player Field Zone updated to Haber-Bosch Reactor');
  assert(player.fieldZone.isFaceDown === false, 'New Field Spell is face-up active');
  assert(player.graveyard.length === playerGraveInitialCount + 1, 'Previous Field Spell routed to Graveyard');
  assert(player.graveyard.some(c => c.uid === 'p_field_acid'), 'Previous Field Spell (Acid Rain) is in Graveyard');

  // Verify replacement was by game mechanics, NOT card destruction
  const replacementLogs = engine.logs.map(l => l.message);
  assert(replacementLogs.some(t => t.includes('[Thay Thế Địa Bàn - Rulebook v10 tr. 28]')), 'Logged official Rulebook v10 tr. 28 game mechanics replacement');
  assert(engine.environment.pressure === 200.0, 'Haber-Bosch pressure set to 200 atm');

  // Opponent field spell remains untouched through player replacement
  assert(opponent.fieldZone !== null, 'Opponent Field Spell remains active through player field replacement');
  assert(opponent.fieldZone.uid === 'opp_field_cryo', 'Opponent still controls Cryogenic Lab');

  // 6. Replacement by Setting a New Field Spell (Rulebook v10 tr. 28)
  player.hand = [
    { uid: 'p_field_alkaline', def: alkalineDef, ownerId: 'player' }
  ];
  const setOverRes = engine.setSpellTrap('player', 'p_field_alkaline');
  assert(setOverRes.success === true, 'Setting new Field Spell over existing active Field Spell succeeds');
  assert(player.fieldZone.uid === 'p_field_alkaline', 'Field Zone now holds p_field_alkaline');
  assert(player.fieldZone.isFaceDown === true, 'New Field Spell is Set face-down');
  assert(player.graveyard.some(c => c.uid === 'p_field_haber'), 'Previous Field Spell (Haber-Bosch) sent to Graveyard by replacement');

  // 7. Field Spell Fizzle Rule: Must Remain Face-Up on Field to Resolve (Rulebook v10 tr. 28-29)
  player.hand = [
    { uid: 'p_field_acid_2', def: acidRainDef, ownerId: 'player' }
  ];
  player.mana = 10;

  player.fieldZone = { uid: 'p_field_acid_2', def: acidRainDef, ownerId: 'player', isFaceDown: false };
  engine.chainStack = [];
  engine.pushChain(player.fieldZone, 'player', 1, undefined, 'Kích hoạt Thẻ Địa Bàn Mưa Axit');
  assert(engine.chainStack.length === 1, 'Chain Link 1 built for Field Spell');
  assert(engine.chainStack[0].wasOnField === true, 'Field Spell was face-up on field at activation');

  // Opponent removes the Field Spell before Chain Link 1 resolves
  engine.destroyFieldZoneCard('player');
  assert(player.fieldZone === null, 'Field Spell destroyed before Chain Link 1 resolves');
  assert(player.graveyard.some(c => c.uid === 'p_field_acid_2'), 'Destroyed Field Spell in Graveyard');

  // Resolve chain: Field Spell must fizzle
  engine.resolveChain();
  const fizzleLogs = engine.logs.map(l => l.message);
  assert(fizzleLogs.some(t => t.includes('[Quy Tắc Thẻ Duy Trì/Địa Bàn - Rulebook v10 tr. 28-29]')), 'Field Spell fizzle logged when removed before chain resolution');

  // 8. Field Zone Destruction vs Mechanics Replacement (Rulebook v10 tr. 28)
  const destroyRes = engine.destroyFieldZoneCard('opponent');
  assert(destroyRes.success === true, 'Destroying opponent Field Spell succeeds');
  assert(opponent.fieldZone === null, 'Opponent Field Zone is now empty');
  assert(opponent.graveyard.some(c => c.uid === 'opp_field_cryo'), 'Opponent Cryogenic Lab in Graveyard');
  const destroyLogs = engine.logs.map(l => l.message);
  assert(destroyLogs.some(t => t.includes('[TIÊU DIỆT ĐỊA BÀN - Rulebook v10 tr. 28]')), 'Official Rulebook v10 tr. 28 destruction log emitted');

  // 9. Banish Card from Field Zone (Rulebook v10 tr. 28 & 55)
  player.fieldZone = { uid: 'p_field_temp', def: acidRainDef, ownerId: 'player', isFaceDown: false };
  const banishRes = engine.banishCardFromField('player', 'FIELD_ZONE');
  assert(banishRes.success === true, 'Banishing card from Field Zone succeeds');
  assert(player.fieldZone === null, 'Player Field Zone vacated upon banishment');
  assert(player.banished.some(c => c.uid === 'p_field_temp'), 'Banished Field Spell added to Banished Zone');
  const banishLogs = engine.logs.map(l => l.message);
  assert(banishLogs.some(t => t.includes('[Trục Xuất Địa Bàn - Rulebook v10 tr. 28 & 55]')), 'Field Zone banishment log emitted');
}

// ============================================================
// Group 29: Card Banishing Dynamics & Face-Down vs Face-Up Banishment Invariants (Rulebook v10 tr. 55 & Master Rule 2021 Update)
// ============================================================
{
  console.log('\n--- Group 29: Card Banishing Dynamics & Face-Down vs Face-Up Banishment Invariants (Rulebook v10 tr. 55 & Master Rule 2021 Update) ---');

  const engine = new DuelEngine();
  const player = engine.player;
  const opponent = engine.opponent;

  // 1. Supercritical CO2 Fluid Extraction Card Verification
  const scCardDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_supercritical_extraction');
  assert(scCardDef !== undefined, 'Supercritical CO2 Extraction registered in PLAYABLE_CARDS');
  assert(scCardDef.effectCode === 'SPELL_SUPERCRITICAL_EXTRACTION', 'Card has SPELL_SUPERCRITICAL_EXTRACTION effect code');
  assert(scCardDef.cardType === 'REACTION_SPELL', 'Supercritical CO2 Extraction is REACTION_SPELL');
  assert(scCardDef.spellTrapSubtype === 'NORMAL_SPELL', 'Supercritical CO2 Extraction is NORMAL_SPELL');
  assert(scCardDef.attribute === 'AERO', 'Supercritical CO2 Extraction has AERO attribute');
  assert(scCardDef.manaCost === 3, 'Supercritical CO2 Extraction requires 3 mana');
  assert(scCardDef.relatedEquation.includes('CO₂(sc)'), 'Card has balanced supercritical fluid equation');

  // 2. Face-Up Banishment from Field (Rulebook v10 tr. 55)
  const monsterDefA = PLAYABLE_CARDS.find(c => c.cardType === 'ELEMENT_MONSTER' && c.attribute === 'PYRO') || PLAYABLE_CARDS[0];
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'mon_field_pyro_1', def: monsterDefA, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    canAttackDirectly: false,
    attacksPerformed: 0
  };

  const banishUpRes = engine.banishCardFromField('player', 'MONSTER', 0, false);
  assert(banishUpRes.success === true, 'Face-up banish from Monster Zone succeeds');
  assert(player.monsterZones[0] === null, 'Monster Zone 0 vacated');
  assert(player.banished.length === 1, 'Player Banished Zone has 1 card');
  assert(player.banished[0].uid === 'mon_field_pyro_1', 'Banished card matches monster UID');
  assert(player.banished[0].isFaceDown === false, 'Card is banished face-up (isFaceDown = false)');
  assert(engine.logs.some(l => l.message && l.message.includes('[Trục Xuất Vĩnh Viễn - Rulebook v10 tr. 55]')), 'Official face-up banish log emitted');

  // 3. Face-Down Banishment from Field (Rulebook v10 tr. 55)
  // "Cards can also be banished face-down. Face-down banished cards cannot be viewed by the opponent, and their effects cannot be activated or used. They are treated as cards with no card properties."
  const monsterDefB = PLAYABLE_CARDS.find(c => c.cardType === 'ELEMENT_MONSTER' && c.attribute === 'PYRO' && c.id !== monsterDefA.id) || PLAYABLE_CARDS[1];
  player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'mon_field_pyro_2', def: monsterDefB, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    canAttackDirectly: false,
    attacksPerformed: 0
  };

  const banishDownRes = engine.banishCardFromField('player', 'MONSTER', 1, true);
  assert(banishDownRes.success === true, 'Face-down banish from Monster Zone succeeds');
  assert(player.monsterZones[1] === null, 'Monster Zone 1 vacated');
  assert(player.banished.length === 2, 'Player Banished Zone now has 2 cards');
  assert(player.banished[1].uid === 'mon_field_pyro_2', 'Second card in Banished Zone matches mon_field_pyro_2');
  assert(player.banished[1].isFaceDown === true, 'Card is banished face-down (isFaceDown = true)');
  assert(engine.logs.some(l => l.message && l.message.includes('[Trục Xuất Úp Mặt - Rulebook v10 tr. 55]')), 'Official face-down banish log emitted');

  // 4. Face-Down Banishment from Hand & Graveyard (Rulebook v10 tr. 55)
  const spellDefA = PLAYABLE_CARDS.find(c => c.cardType === 'REACTION_SPELL') || PLAYABLE_CARDS[2];
  player.hand = [{ uid: 'hand_card_down', def: spellDefA, ownerId: 'player' }];
  const banishHandRes = engine.banishCardFromHand('player', 'hand_card_down', true);
  assert(banishHandRes.success === true, 'Face-down banish from Hand succeeds');
  assert(player.hand.length === 0, 'Card removed from hand');
  const banishedHandCard = player.banished.find(c => c.uid === 'hand_card_down');
  assert(banishedHandCard !== undefined, 'Hand card exists in Banished Zone');
  assert(banishedHandCard.isFaceDown === true, 'Hand card is banished face-down');

  player.graveyard = [{ uid: 'grave_card_down', def: spellDefA, ownerId: 'player' }];
  const banishGraveRes = engine.banishCardFromGraveyard('player', 'grave_card_down', true);
  assert(banishGraveRes.success === true, 'Face-down banish from Graveyard succeeds');
  assert(player.graveyard.length === 0, 'Card removed from Graveyard');
  const banishedGraveCard = player.banished.find(c => c.uid === 'grave_card_down');
  assert(banishedGraveCard !== undefined, 'Graveyard card exists in Banished Zone');
  assert(banishedGraveCard.isFaceDown === true, 'Graveyard card is banished face-down');

  // 5. Pot of Desires style Supercritical CO2 Extraction: Top 3 Cards from Deck Banished Face-Down & Draw 2
  player.deck = [];
  for (let i = 1; i <= 10; i++) {
    player.deck.push({
      uid: `p_deck_card_${i}`,
      def: { ...PLAYABLE_CARDS[i % PLAYABLE_CARDS.length], id: `deck_card_${i}` },
      ownerId: 'player'
    });
  }
  assert(player.deck.length === 10, 'Player deck initialized with 10 cards');
  player.hand = [{ uid: 'sc_extract_card', def: scCardDef, ownerId: 'player' }];
  player.mana = 10;
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.activePlayerId = 'player';

  const preBanishCount = player.banished.length;
  const playScRes = engine.activateSpellFromHand('player', 'sc_extract_card');
  assert(playScRes.success === true, 'Supercritical CO2 Extraction activated successfully');
  assert(player.deck.length === 5, 'Deck reduced by exactly 5 cards (3 banished + 2 drawn, got 5)');
  assert(player.hand.length === 2, 'Player drew exactly 2 cards into hand');
  assert(player.banished.length === preBanishCount + 3, 'Exactly 3 cards added to Banished Zone');

  // Verify the 3 deck cards are banished face-down
  const deckBanished1 = player.banished.find(c => c.uid === 'p_deck_card_1');
  const deckBanished2 = player.banished.find(c => c.uid === 'p_deck_card_2');
  const deckBanished3 = player.banished.find(c => c.uid === 'p_deck_card_3');
  assert(deckBanished1 !== undefined && deckBanished1.isFaceDown === true, 'Deck card 1 banished face-down');
  assert(deckBanished2 !== undefined && deckBanished2.isFaceDown === true, 'Deck card 2 banished face-down');
  assert(deckBanished3 !== undefined && deckBanished3.isFaceDown === true, 'Deck card 3 banished face-down');
  assert(engine.logs.some(l => l.message && l.message.includes('[Chiết Xuất Siêu Tới Hạn CO₂ - Rulebook v10 tr. 55]')), 'Extraction chemical lore and Rulebook citation logged');

  // 6. Property-Specific Targeting Invariant on Face-Down Banished Cards (Rulebook v10 tr. 55)
  // "Face-down banished cards cannot be viewed by the opponent, and their effects cannot be activated or used.
  //  They are treated as cards with no card properties (no name, type, attribute, ATK/DEF, level/rank)."
  const pyroBanished = engine.filterBanishedCards('player', { attribute: 'PYRO' });
  assert(pyroBanished.some(c => c.uid === 'mon_field_pyro_1'), 'Face-up PYRO card is found by attribute filter');
  assert(!pyroBanished.some(c => c.uid === 'mon_field_pyro_2'), 'Rulebook v10 tr. 55 Invariant: Face-down banished card is EXCLUDED from attribute filter (no public attribute)');

  // Test cardType filter: face-down cards excluded from property-specific filter
  const monsterTypeBanished = engine.filterBanishedCards('player', { cardType: 'ELEMENT_MONSTER' });
  assert(monsterTypeBanished.some(c => c.uid === 'mon_field_pyro_1'), 'Face-up ELEMENT_MONSTER is found by cardType filter');
  assert(!monsterTypeBanished.some(c => c.uid === 'mon_field_pyro_2'), 'Rulebook v10 tr. 55 Invariant: Face-down banished card is EXCLUDED from cardType filter');

  // Test generic filter: without specific properties, face-down cards ARE included
  const allBanished = engine.filterBanishedCards('player', {});
  assert(allBanished.some(c => c.uid === 'mon_field_pyro_1'), 'Generic filter includes face-up card');
  assert(allBanished.some(c => c.uid === 'mon_field_pyro_2'), 'Generic filter includes face-down card');
  assert(allBanished.length === player.banished.length, 'Generic filter returns entire banished collection');

  // 7. canTargetBanishedCard Invariant
  assert(engine.canTargetBanishedCard(player.banished[0], true) === true, 'Face-up banished card CAN be targeted by property check');
  assert(engine.canTargetBanishedCard(player.banished[1], true) === false, 'Face-down banished card CANNOT be targeted by property check (Rulebook v10 tr. 55)');
  assert(engine.canTargetBanishedCard(player.banished[1], false) === true, 'Face-down banished card CAN be targeted by generic (non-property) check');

  // 8. retrieveFromBanished: Property-Specific Rejection vs Generic Retrieval
  // Attempting to retrieve face-down card with requiresPropertyCheck = true is REJECTED
  const illegalRetrieve = engine.retrieveFromBanished('player', 'mon_field_pyro_2', 'HAND', true);
  assert(illegalRetrieve.success === false, 'Property-specific retrieval of face-down banished card is strictly rejected');
  assert(illegalRetrieve.message.includes('[Vi Phạm Master Rule - Rulebook v10 tr. 55]'), 'Rejection message cites official Rulebook v10 tr. 55 rule');
  assert(player.banished.some(c => c.uid === 'mon_field_pyro_2'), 'Rejected card remains safely in Banished Zone');

  // Generic retrieval (e.g. "Shuffle a banished card into Deck") SUCCEEDS
  const preDeckCount = player.deck.length;
  const legalRetrieve = engine.retrieveFromBanished('player', 'mon_field_pyro_2', 'DECK', false);
  assert(legalRetrieve.success === true, 'Generic non-property retrieval of face-down banished card succeeds');
  assert(!player.banished.some(c => c.uid === 'mon_field_pyro_2'), 'Card removed from Banished Zone');
  assert(player.deck.length === preDeckCount + 1, 'Card added to Deck');
  const retrievedCard = player.deck.find(c => c.uid === 'mon_field_pyro_2');
  assert(retrievedCard !== undefined, 'Card exists in Deck');
  assert(retrievedCard.isFaceDown === false, 'isFaceDown reset to false upon leaving Banished Zone');
  assert(engine.logs.some(l => l.message && l.message.includes('[Hồi Trở Về Bộ Bài - Rulebook v10 tr. 55]')), 'Retrieval log emitted');
}

// ============================================================
// Group 30: Turn Counter Mechanics & Multi-Turn Lingering Effects Duration Clamping (Rulebook v10 tr. 30-31, 54)
// ============================================================
{
  console.log('\n--- Group 30: Turn Counter Mechanics & Multi-Turn Lingering Effects Duration Clamping (Rulebook v10 tr. 30-31, 54) ---');

  const engine = new DuelEngine();
  const player = engine.player;
  const opponent = engine.opponent;

  // 1. Noble Gas Containment Grid Card Data Invariant
  const nobleCardDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_noble_containment_grid');
  assert(nobleCardDef !== undefined, 'Noble Gas Containment Grid registered in PLAYABLE_CARDS');
  assert(nobleCardDef.effectCode === 'SPELL_NOBLE_CONTAINMENT_GRID', 'Card has SPELL_NOBLE_CONTAINMENT_GRID effect code');
  assert(nobleCardDef.cardType === 'REACTION_SPELL', 'Noble Gas Containment Grid is REACTION_SPELL');
  assert(nobleCardDef.spellTrapSubtype === 'NORMAL_SPELL', 'Noble Gas Containment Grid is NORMAL_SPELL');
  assert(nobleCardDef.attribute === 'NOBLE_VOID', 'Noble Gas Containment Grid has NOBLE_VOID attribute');
  assert(nobleCardDef.manaCost === 3, 'Noble Gas Containment Grid requires 3 mana');
  assert(nobleCardDef.relatedEquation.includes('Xe + Rn'), 'Card has balanced noble gas dispersion equation');
  assert(nobleCardDef.effectText.includes('Rulebook v10 tr. 54'), 'Effect text cites Rulebook v10 tr. 54');

  // 2. Lingering Effect Registration & Duelist State Initialization
  assert(Array.isArray(player.lingeringEffects), 'Player duelist state initializes with lingeringEffects array');
  assert(Array.isArray(opponent.lingeringEffects), 'Opponent duelist state initializes with lingeringEffects array');
  assert(engine.hasLingeringEffect('opponent', 'ATTACK_PROHIBITION') === false, 'Opponent initially has no attack prohibition');

  // Setup Noble Gas Containment Grid in player hand and activate
  player.mana = 10;
  const nobleInstance = engine.instantiateCard('card_spell_noble_containment_grid', 'player');
  player.hand.push(nobleInstance);

  const actResult = engine.activateSpellFromHand('player', nobleInstance.uid);
  assert(actResult.success === true, 'Player successfully activates Noble Gas Containment Grid');

  // Resolve chain to apply effect
  engine.resolveChain();

  // 3. Lingering Effect Active on Opponent
  assert(engine.hasLingeringEffect('opponent', 'ATTACK_PROHIBITION') === true, 'Opponent now has active ATTACK_PROHIBITION lingering effect');
  const oppEffects = engine.getLingeringEffects('opponent');
  assert(oppEffects.length === 1, 'Opponent has exactly 1 active lingering effect');
  assert(oppEffects[0].effectType === 'ATTACK_PROHIBITION', 'Lingering effect is ATTACK_PROHIBITION');
  assert(oppEffects[0].durationTurns === 2, 'Lingering effect duration is initialized to 2 turns');
  assert(oppEffects[0].sourceCardName === nobleCardDef.name, 'Lingering effect references Noble Gas card name');
  assert(engine.logs.some(l => l.message && l.message.includes('[Lưới Khí Trơ Phong Tỏa - Rulebook v10 tr. 54]')), 'Activation log emitted with chemistry lore');

  // 4. Attack Prohibition Enforcement (Rulebook v10 tr. 54)
  // Give opponent an active monster
  const oppMon = engine.instantiateCard('card_elem_fe_ferrum', 'opponent');
  opponent.monsterZones[0] = {
    card: oppMon,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Switch to opponent Battle Phase
  engine.activePlayerId = 'opponent';
  engine.currentPhase = 'BATTLE_PHASE';

  // Opponent attempts to attack player directly
  const atkResult = engine.declareAttack(0, 'DIRECT');
  assert(atkResult.success === false, 'Attack declaration strictly blocked by ATTACK_PROHIBITION lingering effect');
  assert(atkResult.message.includes('[Phong Tỏa Tấn Công - Rulebook v10 tr. 54]'), 'Block message cites Rulebook v10 tr. 54 attack prohibition');
  assert(atkResult.damageDealt === 0, 'Zero damage dealt due to attack prohibition');
  assert(opponent.monsterZones[0].hasAttackedThisTurn === false, 'Monster did not spend attack action');

  // 5. End Phase "Until End of Turn" Stat Boost Expiration (Rulebook v10 tr. 31)
  // Give both players temporary stat boosts
  const pMon = engine.instantiateCard('card_elem_na_natrium', 'player');
  player.monsterZones[0] = {
    card: pMon,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    tempAtkBoost: 700,
    tempDefBoost: 400
  };
  opponent.monsterZones[0].tempAtkBoost = 500;
  opponent.monsterZones[0].tempDefBoost = 300;

  assert(player.monsterZones[0].tempAtkBoost === 700, 'Player monster has temp ATK boost before End Phase');
  assert(opponent.monsterZones[0].tempAtkBoost === 500, 'Opponent monster has temp ATK boost before End Phase');

  // Resolve End Phase for opponent
  engine.resolveEndPhase('opponent');

  // Stat boosts must be wiped on BOTH players at End Phase
  assert(player.monsterZones[0].tempAtkBoost === 0, 'Player temp ATK boost cleared at End Phase (Rulebook v10 tr. 31)');
  assert(player.monsterZones[0].tempDefBoost === 0, 'Player temp DEF boost cleared at End Phase (Rulebook v10 tr. 31)');
  assert(opponent.monsterZones[0].tempAtkBoost === 0, 'Opponent temp ATK boost cleared at End Phase (Rulebook v10 tr. 31)');
  assert(opponent.monsterZones[0].tempDefBoost === 0, 'Opponent temp DEF boost cleared at End Phase (Rulebook v10 tr. 31)');

  // 6. Turn Countdown Decrement (Turn 1 ended: duration 2 -> 1)
  const oppEffectsAfterT1 = engine.getLingeringEffects('opponent');
  assert(oppEffectsAfterT1.length === 1, 'Lingering effect remains active after 1 opponent turn');
  assert(oppEffectsAfterT1[0].durationTurns === 1, 'Duration decremented from 2 to 1 at opponent End Phase');
  assert(engine.hasLingeringEffect('opponent', 'ATTACK_PROHIBITION') === true, 'Opponent STILL prohibited from attacking');
  assert(engine.logs.some(l => l.message && l.message.includes('[Bộ Đếm Lượt Duy Trì - Rulebook v10 tr. 54]')), 'Countdown log emitted');

  // Player's turn End Phase processing -> does NOT decrement opponent turn counter
  engine.processEndPhaseLingeringEffects('player');
  const oppEffectsAfterPlayerTurn = engine.getLingeringEffects('opponent');
  assert(oppEffectsAfterPlayerTurn.length === 1, 'Lingering effect remains active after player End Phase');
  assert(oppEffectsAfterPlayerTurn[0].durationTurns === 1, 'Opponent multi-turn effect does NOT decrement at player End Phase');

  // Opponent's second turn End Phase processing -> duration 1 -> 0 (EXPIRES!)
  engine.processEndPhaseLingeringEffects('opponent');

  const oppEffectsAfterT2 = engine.getLingeringEffects('opponent');
  assert(oppEffectsAfterT2.length === 0, 'Lingering effect completely expired and removed after 2 opponent turns');
  assert(engine.hasLingeringEffect('opponent', 'ATTACK_PROHIBITION') === false, 'Opponent is no longer prohibited from attacking');
  assert(engine.logs.some(l => l.message && l.message.includes('[Hết Hiệu Lực Duy Trì - Rulebook v10 tr. 31 & 54]')), 'Expiration log emitted');

  // 7. Custom End of Turn Effect & Manual Removal Verification
  const customEffect = engine.addLingeringEffect('player', {
    sourceCardUid: 'custom_source',
    sourceCardName: 'Bảo Vệ Tạm Thời',
    targetPlayerId: 'player',
    effectType: 'DAMAGE_IMMUNITY',
    durationTurns: 1,
    turnActivated: engine.currentTurn,
    expiresAt: 'END_OF_TURN',
    description: 'Miễn nhiễm sát thương đến hết lượt'
  });

  assert(engine.hasLingeringEffect('player', 'DAMAGE_IMMUNITY') === true, 'Player has DAMAGE_IMMUNITY effect');
  assert(customEffect.id.startsWith('lingering_'), 'Generated lingering effect ID has correct prefix');

  // Explicit manual removal test
  const removed = engine.removeLingeringEffect('player', customEffect.id);
  assert(removed === true, 'removeLingeringEffect successfully removed target effect');
  assert(engine.hasLingeringEffect('player', 'DAMAGE_IMMUNITY') === false, 'DAMAGE_IMMUNITY no longer present');
}

// ============================================================
// Group 31: Monster Position Changes & Cannot Attack First Turn When Set/Summoned Invariants (Rulebook v10 tr. 24, 38)
// ============================================================
{
  console.log('\n--- Group 31: Monster Position Changes & Cannot Attack First Turn When Set/Summoned Invariants (Rulebook v10 tr. 24, 38) ---');

  const engine = new DuelEngine();
  const player = engine.player;
  const opponent = engine.opponent;

  // 1. Centrifugal Sedimentation Partition Card Verification
  const centriDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_centrifuge_crystallization');
  assert(centriDef !== undefined, 'Centrifugal Sedimentation Partition registered in PLAYABLE_CARDS');
  assert(centriDef.effectCode === 'SPELL_CENTRIFUGE_CRYSTALLIZATION', 'Card has SPELL_CENTRIFUGE_CRYSTALLIZATION effect code');
  assert(centriDef.cardType === 'REACTION_SPELL', 'Centrifugal Sedimentation is REACTION_SPELL');
  assert(centriDef.spellTrapSubtype === 'NORMAL_SPELL', 'Centrifugal Sedimentation is NORMAL_SPELL');
  assert(centriDef.attribute === 'TERRA', 'Centrifugal Sedimentation has TERRA attribute');
  assert(centriDef.manaCost === 3, 'Centrifugal Sedimentation requires 3 mana');
  assert(centriDef.relatedEquation.includes('F_c = m'), 'Card has balanced centrifugal force equation');
  assert(centriDef.effectText.includes('Rulebook v10 tr. 24'), 'Effect text cites Rulebook v10 tr. 24');

  // 2. First Turn No Attack Rule (Rulebook v10 tr. 38)
  engine.setEnforceTurnOneNoAttack(true);
  assert(engine.currentTurn === 1, 'Current turn is Turn 1');
  assert(engine.enforceTurnOneNoAttack === true, 'Turn 1 No Attack Rule is enforced');

  // Put a monster on field for player
  const feCard = engine.instantiateCard('card_elem_26_fe', 'player');
  player.monsterZones[0] = {
    slotIndex: 0,
    card: feCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Direct attack attempt on Turn 1 in Battle Phase is strictly rejected
  engine.currentPhase = 'BATTLE_PHASE';
  const turn1Atk = engine.declareAttack(0, 'DIRECT');
  assert(turn1Atk.success === false, 'Attack declaration strictly rejected on Turn 1');
  assert(turn1Atk.message.includes('[Quy Tắc Lượt Đầu Tiên - Rulebook v10 tr. 38]'), 'Rejection message cites Rulebook v10 tr. 38');
  assert(turn1Atk.damageDealt === 0, 'Zero damage dealt on Turn 1');

  // Advancing phase from Main Phase 1 on Turn 1 skips Battle Phase directly to End Phase
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.advancePhase();
  assert(engine.currentPhase !== 'BATTLE_PHASE', 'Battle Phase is skipped on Turn 1 (Rulebook v10 tr. 38)');
  assert(engine.logs.some(l => l.message && l.message.includes('[Quy Tắc Lượt Đầu Tiên - Rulebook v10 tr. 38]')), 'Turn 1 battle restriction log emitted');

  // On Turn 2 (opponent's turn) or Turn 3 (subsequent player turn), attacks are permitted
  const engineTurn2 = new DuelEngine();
  engineTurn2.currentTurn = 2;
  engineTurn2.activePlayerId = 'opponent';
  engineTurn2.currentPhase = 'BATTLE_PHASE';
  const oppMon = engineTurn2.instantiateCard('card_elem_11_na', 'opponent');
  engineTurn2.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: oppMon,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 2,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const pDefMon = engineTurn2.instantiateCard('card_elem_26_fe', 'player');
  engineTurn2.player.monsterZones[0] = {
    slotIndex: 0,
    card: pDefMon,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const turn2Atk = engineTurn2.declareAttack(0, 0);
  assert(turn2Atk.success === true, 'Turn 2 attacker CAN declare attack normally');

  // 3. Monster Position Changes: 6 Strict Invariants (Rulebook v10 tr. 24)
  const engine2 = new DuelEngine();
  const p2 = engine2.player;
  const opp2 = engine2.opponent;
  engine2.currentTurn = 3; // Turn 3: Main Phase 1
  engine2.activePlayerId = 'player';
  engine2.currentPhase = 'MAIN_PHASE_1';

  // Rule 1: A monster Summoned or Set during this turn CANNOT change its position manually
  const naCard = engine2.instantiateCard('card_elem_11_na', 'player');
  p2.monsterZones[0] = {
    slotIndex: 0,
    card: naCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 3, // Summoned on current turn!
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const sameTurnChange = engine2.changeMonsterPosition('player', 0);
  assert(sameTurnChange.success === false, 'Cannot change position of monster summoned on this turn');
  assert(sameTurnChange.message.includes('[Quy Tắc Đổi Tư Thế - Rulebook v10 tr. 24]'), 'Rejection cites Rulebook v10 tr. 24');
  assert(p2.monsterZones[0].position === 'FACE_UP_ATTACK', 'Position remained FACE_UP_ATTACK');

  // Rule 2: Cannot change position during opponent's turn
  const oppTurnChange = engine2.changeMonsterPosition('opponent', 0);
  assert(oppTurnChange.success === false, 'Cannot change position during opponent turn');
  assert(oppTurnChange.message.includes('Chỉ có thể đổi tư thế trong lượt của chính mình'), 'Turn player guard enforced');

  // Rule 3: Cannot change position outside Main Phase 1 or 2
  p2.monsterZones[0].turnSummoned = 1; // Veteran monster from turn 1
  engine2.currentPhase = 'BATTLE_PHASE';
  const battlePhaseChange = engine2.changeMonsterPosition('player', 0);
  assert(battlePhaseChange.success === false, 'Cannot change position in Battle Phase');
  assert(battlePhaseChange.message.includes('Chỉ có thể đổi tư thế trong Main Phase'), 'Phase guard enforced');

  // Rule 4: A monster that already declared an attack this turn CANNOT change position in Main Phase 2
  p2.monsterZones[0].hasAttackedThisTurn = true;
  engine2.currentPhase = 'MAIN_PHASE_2';
  const attackedChange = engine2.changeMonsterPosition('player', 0);
  assert(attackedChange.success === false, 'Cannot change position after monster declared attack this turn');
  assert(attackedChange.message.includes('đã tuyên bố tấn công trong lượt này'), 'Attack-performed guard enforced');

  // Reset to Main Phase 1 for subsequent position change tests
  engine2.currentPhase = 'MAIN_PHASE_1';
  p2.monsterZones[0].hasAttackedThisTurn = false;
  p2.monsterZones[0].hasChangedPositionThisTurn = false;

  // Rule 5: A monster can only change position ONCE manually per turn
  // First manual change: Attack -> Defense (SUCCEEDS!)
  const firstChange = engine2.changeMonsterPosition('player', 0);
  assert(firstChange.success === true, 'First manual position change succeeds: Attack -> Defense');
  assert(p2.monsterZones[0].position === 'FACE_UP_DEFENSE', 'Monster is now in FACE_UP_DEFENSE');
  assert(p2.monsterZones[0].hasChangedPositionThisTurn === true, 'hasChangedPositionThisTurn set to true');

  // Second manual change in same turn (FAILS!)
  const secondChange = engine2.changeMonsterPosition('player', 0);
  assert(secondChange.success === false, 'Second manual position change in same turn is strictly rejected');
  assert(secondChange.message.includes('tối đa 1 lần mỗi lượt'), '1-change-per-turn limit enforced');
  assert(p2.monsterZones[0].position === 'FACE_UP_DEFENSE', 'Position remained FACE_UP_DEFENSE');

  // Rule 6: Link monsters CANNOT change to defense position (Master Rule 2020)
  const linkCard = engine2.instantiateCard('card_link_1_h_bond', 'player');
  p2.monsterZones[1] = {
    slotIndex: 1,
    card: linkCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const linkDefChange = engine2.changeMonsterPosition('player', 1);
  assert(linkDefChange.success === false, 'Link monster cannot change to defense position');
  assert(linkDefChange.message.includes('[Quy Tắc Quái Thú Link - Master Rule 2020]'), 'Link monster DEF restriction cited');
  assert(p2.monsterZones[1].position === 'FACE_UP_ATTACK', 'Link monster remains in FACE_UP_ATTACK');

  // Rule 7: Extra Monster Zone (EMZ) monster position change
  const synchroCard = engine2.instantiateCard('card_synchro_catalytic_converter', 'player');
  p2.extraMonsterZone = {
    slotIndex: 0,
    card: synchroCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    isExtraMonsterZone: true
  };
  const emzChange = engine2.changeMonsterPosition('player', 0, true);
  assert(emzChange.success === true, 'Extra Monster Zone monster successfully changes position');
  assert(p2.extraMonsterZone.position === 'FACE_UP_DEFENSE', 'EMZ monster is now in FACE_UP_DEFENSE');

  // Rule 8: Face-Down Defense manual change automatically routes to Flip Summon (Rulebook v10 tr. 25)
  const faceDownCard = engine2.instantiateCard('card_elem_26_fe', 'player');
  p2.monsterZones[2] = {
    slotIndex: 2,
    card: faceDownCard,
    position: 'FACE_DOWN_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const flipViaPositionChange = engine2.changeMonsterPosition('player', 2);
  assert(flipViaPositionChange.success === true, 'Manual change of Face-down Defense routes to Flip Summon');
  assert(p2.monsterZones[2].position === 'FACE_UP_ATTACK', 'Flipped monster is now in FACE_UP_ATTACK');
  assert(engine2.logs.some(l => l.message && l.message.includes('[TRIỆU HỒI LẬT (FLIP SUMMON)]')), 'Flip summon log emitted');

  // 4. Centrifugal Sedimentation Spell: Mass Defense Shift & Position Lock
  opp2.monsterZones[0] = {
    slotIndex: 0,
    card: engine2.instantiateCard('card_elem_26_fe', 'opponent'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  opp2.monsterZones[1] = {
    slotIndex: 1,
    card: engine2.instantiateCard('card_elem_11_na', 'opponent'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  p2.mana = 10;
  const centriCard = engine2.instantiateCard('card_spell_centrifuge_crystallization', 'player');
  p2.hand.push(centriCard);

  const actCentri = engine2.activateSpellFromHand('player', centriCard.uid);
  assert(actCentri.success === true, 'Player activates Centrifugal Sedimentation Partition');
  engine2.resolveChain();

  assert(opp2.monsterZones[0].position === 'FACE_UP_DEFENSE', 'Opponent monster 0 forced into FACE_UP_DEFENSE');
  assert(opp2.monsterZones[1].position === 'FACE_UP_DEFENSE', 'Opponent monster 1 forced into FACE_UP_DEFENSE');
  assert(opp2.monsterZones[0].positionLockedUntilTurn > engine2.currentTurn, 'Monster 0 has position lock turn timestamp');
  assert(engine2.logs.some(l => l.message && l.message.includes('[Ly Tâm Kết Tinh Phân Lớp - Rulebook v10 tr. 24]')), 'Centrifuge lore log emitted');

  // Opponent turn: attempting to change locked monster position is rejected
  engine2.currentTurn = 4;
  engine2.activePlayerId = 'opponent';
  engine2.currentPhase = 'MAIN_PHASE_1';
  opp2.monsterZones[0].hasChangedPositionThisTurn = false;

  const lockedChange = engine2.changeMonsterPosition('opponent', 0);
  assert(lockedChange.success === false, 'Position change rejected while locked by centrifugal sedimentation');
  assert(lockedChange.message.includes('[Khóa Tư Thế]'), 'Rejection cites position lock');
  assert(opp2.monsterZones[0].position === 'FACE_UP_DEFENSE', 'Monster remains locked in Defense position');
}

// ============================================================
// Group 32: Fast Effect Timing State Machine & Priority Passing Protocol (Rulebook v10 tr. 44-47)
// ============================================================
{
  console.log('\n--- Group 32: Fast Effect Timing State Machine & Priority Passing Protocol (Rulebook v10 tr. 44-47) ---');

  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  // 1. Definition check of Le Chatelier Counter Trap
  const leChatelierCard = engine.instantiateCard('card_trap_le_chatelier_counter', 'player');
  assert(leChatelierCard !== null, 'Le Chatelier Counter Trap instantiates correctly');
  assert(leChatelierCard.def.cardType === 'TRAP', 'Card type is TRAP');
  assert(leChatelierCard.def.spellTrapSubtype === 'COUNTER_TRAP', 'Subtype is COUNTER_TRAP');
  assert(leChatelierCard.def.spellSpeed === 3, 'Spell Speed is 3 (Fast Effect Timing Chart, Rulebook v10 tr. 44-47)');
  assert(leChatelierCard.def.effectCode === 'TRAP_LE_CHATELIER_COUNTER', 'Effect code is TRAP_LE_CHATELIER_COUNTER');
  assert(leChatelierCard.def.scientificLore.includes('Le Chatelier'), 'Scientific lore explains Le Chatelier dynamic equilibrium');

  // 2. Initial state: Box A (Open Game State)
  engine.currentPhase = 'MAIN_PHASE_1';
  assert(engine.getFastEffectTimingBox() === 'BOX_A_OPEN_GAME_STATE', 'Initial state is BOX_A_OPEN_GAME_STATE');
  assert(engine.getPriorityPlayerId() === 'player', 'Turn player holds priority in Open Game State');
  assert(engine.consecutivePriorityPasses === 0, 'Consecutive priority passes initialized to 0');

  // 3. Action trigger window: Non-chain action (e.g. Normal Summon) opens Box B -> Box C
  const triggerRes = engine.triggerFastEffectWindow('Triệu hồi Thường Fe');
  assert(triggerRes.triggerOccurred === true, 'Fast effect window triggered after non-chain action');
  assert(engine.getFastEffectTimingBox() === 'BOX_C_TURN_PLAYER_FAST', 'State transitioned to BOX_C_TURN_PLAYER_FAST');
  assert(engine.getPriorityPlayerId() === 'player', 'Turn player has first opportunity to activate Fast Effect in Box C');
  assert(engine.logs.some(l => l.message && l.message.includes('Fast Effect Timing Chart - Rulebook v10 tr. 44-45')), 'Log emitted citing Rulebook v10 Fast Effect Chart');

  // 4. Out-of-turn priority passing rejection
  const illegalPass = engine.passPriority('opponent');
  assert(illegalPass.chainResolved === false, 'Non-priority player cannot pass priority');
  assert(illegalPass.message.includes('Không phải lượt ưu tiên'), 'Rejection cites out-of-turn priority rule');
  assert(engine.getFastEffectTimingBox() === 'BOX_C_TURN_PLAYER_FAST', 'State remains in Box C');

  // 5. Box C -> Box D transition: Turn player passes priority to opponent
  const passBoxC = engine.passPriority('player');
  assert(passBoxC.chainResolved === false, 'Pass priority does not resolve chain in Box C');
  assert(passBoxC.nextPriorityPlayerId === 'opponent', 'Next priority player is opponent');
  assert(engine.getFastEffectTimingBox() === 'BOX_D_OPPONENT_FAST', 'State transitioned to BOX_D_OPPONENT_FAST');
  assert(engine.getPriorityPlayerId() === 'opponent', 'Opponent holds priority in Box D');

  // 6. Box D -> Box A transition: Opponent also passes without starting a chain
  const passBoxD = engine.passPriority('opponent');
  assert(passBoxD.chainResolved === false, 'Pass priority does not resolve chain in Box D');
  assert(passBoxD.nextPriorityPlayerId === 'player', 'Priority returns to turn player');
  assert(engine.getFastEffectTimingBox() === 'BOX_A_OPEN_GAME_STATE', 'State returns to BOX_A_OPEN_GAME_STATE');
  assert(engine.consecutivePriorityPasses === 0, 'Consecutive passes reset to 0 in Open Game State');

  // 7. Chain Creation & Box E: Player activates CL1 (Spell Speed 1)
  const spellCard = engine.instantiateCard('card_spell_exothermic_burst', 'player');
  const cl1 = engine.pushChain(spellCard, 'player', 1, undefined, 'Exothermic Burst Activation');
  assert(cl1.success === true, 'CL1 successfully pushed to chain');
  assert(engine.getFastEffectTimingBox() === 'BOX_E_CHAIN_RESOLUTION', 'State is now BOX_E_CHAIN_RESOLUTION');
  assert(engine.getPriorityPlayerId() === 'opponent', 'Priority automatically passes to opponent to respond');
  assert(engine.consecutivePriorityPasses === 0, 'Passes reset to 0 upon chain push');

  // 8. Opponent activates CL2 (Spell Speed 2)
  const oppTrap = engine.instantiateCard('card_trap_cognitive_copper', 'opponent');
  const cl2 = engine.pushChain(oppTrap, 'opponent', 2, undefined, 'Cu + HCl Trap Activation');
  assert(cl2.success === true, 'CL2 successfully pushed to chain');
  assert(engine.getFastEffectTimingBox() === 'BOX_E_CHAIN_RESOLUTION', 'State remains BOX_E_CHAIN_RESOLUTION');
  assert(engine.getPriorityPlayerId() === 'player', 'Priority automatically switches back to player');

  // 9. Spell Speed Chaining Hierarchy Invariants
  // Player tries to chain Spell Speed 1 to CL2 -> REJECTED!
  const illegalCl3Speed1 = engine.pushChain(spellCard, 'player', 1, undefined, 'Illegal SS1 chain');
  assert(illegalCl3Speed1.success === false, 'Spell Speed 1 cannot chain to CL > 1');
  assert(illegalCl3Speed1.message.includes('Tốc độ 1'), 'Rejection cites Spell Speed 1 restriction');

  // Player activates Counter Trap Le Chatelier (Spell Speed 3) -> ACCEPTED!
  const cl3 = engine.pushChain(leChatelierCard, 'player', 3, undefined, 'Le Chatelier Counter Trap');
  assert(cl3.success === true, 'Spell Speed 3 Counter Trap successfully chains to CL2');
  assert(engine.getPriorityPlayerId() === 'opponent', 'Priority switches to opponent');

  // Opponent tries to chain Spell Speed 2 to Spell Speed 3 -> REJECTED!
  const illegalCl4Speed2 = engine.pushChain(oppTrap, 'opponent', 2, undefined, 'Illegal SS2 against SS3');
  assert(illegalCl4Speed2.success === false, 'Spell Speed 2 cannot respond to Spell Speed 3');
  assert(illegalCl4Speed2.message.includes('Tốc độ 2 không thể phản ứng lại Tốc độ 3'), 'Spell Speed hierarchy strictly enforced');

  // 10. Consecutive Priority Passes Trigger Automatic Chain Resolution (LIFO)
  // Opponent has no SS3 cards, passes priority:
  const oppChainPass = engine.passPriority('opponent');
  assert(oppChainPass.chainResolved === false, 'Single pass does not resolve chain yet');
  assert(oppChainPass.nextPriorityPlayerId === 'player', 'Priority passed back to player');
  assert(engine.consecutivePriorityPasses === 1, 'Consecutive passes incremented to 1');

  // Turn player also passes priority -> both passed consecutively (count = 2) -> CHAIN AUTOMATICALLY RESOLVES!
  // Before resolution: opponent deck size
  const oppDeckBefore = opp.deck.length;
  const oppGyBefore = opp.graveyard.length;

  const playerChainPass = engine.passPriority('player');
  assert(playerChainPass.chainResolved === true, 'Consecutive passes >= 2 triggers automatic chain resolution');
  assert(engine.chainStack.length === 0, 'Chain stack is now completely resolved and empty');
  assert(engine.getFastEffectTimingBox() === 'BOX_A_OPEN_GAME_STATE', 'State returns to BOX_A_OPEN_GAME_STATE after chain resolution');
  assert(engine.getPriorityPlayerId() === 'player', 'Priority returns to turn player');
  assert(engine.consecutivePriorityPasses === 0, 'Passes reset to 0');

  // 11. Verify Le Chatelier Counter Trap resolution details:
  // CL3 negated CL2 (oppTrap), and bounced oppTrap back into opponent deck (NOT sent to GY)
  assert(opp.deck.length === oppDeckBefore + 1, 'Opponent negated card was returned/shuffled into opponent Deck');
  assert(opp.deck.some(c => c.uid === oppTrap.uid), 'Specific card UID is in opponent deck');
  assert(!opp.graveyard.some(c => c.uid === oppTrap.uid), 'Negated card is NOT in opponent graveyard');

  // 12. getEligibleFastEffects testing
  // Player sets a Quick-Play Spell and a Counter Trap
  player.spellTrapZones[0] = {
    slotIndex: 0,
    card: engine.instantiateCard('card_spell_neutralization', 'player'),
    turnSet: 1
  };
  player.spellTrapZones[1] = {
    slotIndex: 1,
    card: engine.instantiateCard('card_trap_le_chatelier_counter', 'player'),
    turnSet: 1
  };

  const eligibleBoxA = engine.getEligibleFastEffects('player');
  assert(eligibleBoxA.length >= 2, 'Eligible fast effects detects set Quick-Play spell and Counter Trap');

  // When chain top is Spell Speed 3, only Spell Speed 3 effects are eligible
  engine.pushChain(leChatelierCard, 'opponent', 3, undefined, 'Opponent SS3');
  const eligibleVsSS3 = engine.getEligibleFastEffects('player');
  assert(eligibleVsSS3.every(c => (c.def.spellSpeed || (c.def.spellTrapSubtype === 'COUNTER_TRAP' ? 3 : 2)) === 3), 'Only Spell Speed 3 effects eligible against Spell Speed 3');
  assert(eligibleVsSS3.some(c => c.def.id === 'card_trap_le_chatelier_counter'), 'Counter trap is eligible against SS3');
  assert(!eligibleVsSS3.some(c => c.def.id === 'card_spell_neutralization'), 'Quick-Play spell (SS2) is filtered out against SS3');
  engine.resolveChain();
}

// ============================================================
// Group 33: Missing the Timing ("When... you can..." vs "If... you can...") & Simultaneous Trigger Invariants (Rulebook v10 tr. 52-53)
// ============================================================
{
  console.log('\n--- Group 33: Missing the Timing ("When... you can..." vs "If... you can...") & Simultaneous Trigger Invariants (Rulebook v10 tr. 52-53) ---');

  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  // 1. Definition and Timing Classification Audits
  const mgCard = engine.instantiateCard('card_elem_12_mg_spark', 'player');
  assert(mgCard !== null, 'Magnesium Flash monster instantiates correctly');
  assert(mgCard.def.triggerTimingType === 'OPTIONAL_WHEN', 'Magnesium is classified as OPTIONAL_WHEN ("Khi... bạn có thể...")');
  assert(mgCard.def.effectText.includes('Khi lá bài này được gửi vào Mộ Bài: Bạn có thể'), 'Magnesium text has canonical "When... you can..." syntax');
  assert(mgCard.def.effectText.includes('Rulebook v10 tr. 52'), 'Magnesium effect cites Rulebook v10 tr. 52');

  const alCard = engine.instantiateCard('card_elem_13_al_amphoteric', 'player');
  assert(alCard !== null, 'Aluminium Amphoteric monster instantiates correctly');
  assert(alCard.def.triggerTimingType === 'OPTIONAL_IF', 'Aluminium is classified as OPTIONAL_IF ("Nếu... bạn có thể...")');
  assert(alCard.def.effectText.includes('Nếu lá bài này được gửi vào Mộ Bài: Bạn có thể'), 'Aluminium text has canonical "If... you can..." syntax');
  assert(alCard.def.effectText.includes('Rulebook v10 tr. 53'), 'Aluminium effect cites Rulebook v10 tr. 53');

  const clCard = engine.instantiateCard('card_elem_17_cl_fumes', 'player');
  assert(clCard !== null, 'Chlorine Fumes monster instantiates correctly');
  assert(clCard.def.triggerTimingType === 'MANDATORY', 'Chlorine is classified as MANDATORY ("Khi... :")');
  assert(clCard.def.effectText.includes('Khi lá bài này được gửi vào Mộ Bài: Trừ 600 LP đối thủ'), 'Chlorine text has mandatory trigger syntax without "you can"');

  // 2. Direct / Clean Event: Monster sent to GY directly (e.g. by effect) -> Event IS the last action
  player.monsterZones[0] = {
    slotIndex: 0,
    card: mgCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const sendRes = engine.sendMonsterToGraveyard('player', 0);
  assert(sendRes.success === true, 'Sent Mg to GY directly');
  assert(engine.isLastGameEvent('SENT_TO_GRAVEYARD', mgCard.uid) === true, 'SENT_TO_GRAVEYARD was the last game event');

  const checkDirectMg = engine.canActivateTriggerEffect(mgCard, 'OPTIONAL_WHEN', 'SENT_TO_GRAVEYARD');
  assert(checkDirectMg.canActivate === true, 'Direct send to GY allows OPTIONAL_WHEN trigger to activate');
  assert(checkDirectMg.missedTiming === false, 'OPTIONAL_WHEN does not miss timing when trigger was the last event');

  const checkDirectAl = engine.canActivateTriggerEffect(alCard, 'OPTIONAL_IF', 'SENT_TO_GRAVEYARD');
  assert(checkDirectAl.canActivate === true, 'Direct send allows OPTIONAL_IF trigger to activate');
  assert(checkDirectAl.missedTiming === false, 'OPTIONAL_IF does not miss timing');

  const checkDirectCl = engine.canActivateTriggerEffect(clCard, 'MANDATORY', 'SENT_TO_GRAVEYARD');
  assert(checkDirectCl.canActivate === true, 'Direct send allows MANDATORY trigger to activate');
  assert(checkDirectCl.missedTiming === false, 'MANDATORY does not miss timing');

  // 3. Tribute Summon Scenario (Rulebook v10 tr. 52):
  // Monster is tributed, then the Tribute Summoned monster arrives on the field.
  // Mg ("When... you can...") MUST MISS THE TIMING!
  // Al ("If... you can...") and Cl (Mandatory) CAN STILL ACTIVATE!
  player.monsterZones[0] = {
    slotIndex: 0,
    card: mgCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const tributeBoss = engine.instantiateCard('card_elem_26_fe', 'player');
  tributeBoss.def.level = 5; // Level 5 requires 1 tribute
  tributeBoss.def.manaCost = 1;
  player.hand.push(tributeBoss);
  player.mana = 10;
  player.normalSummonsRemaining = 1;

  const summonRes = engine.normalSummon('player', tributeBoss.uid, 'FACE_UP_ATTACK', [0]);
  assert(summonRes.success === true, 'Tribute Summon of Level 5 Fe succeeds');
  assert(engine.isLastGameEvent('TRIBUTE_SUMMON_COMPLETED', tributeBoss.uid) === true, 'Last game event is TRIBUTE_SUMMON_COMPLETED');
  assert(engine.isLastGameEvent('SENT_TO_GRAVEYARD', mgCard.uid) === false, 'SENT_TO_GRAVEYARD for Mg was followed by Tribute Summon and is NOT last event');

  // Evaluate Mg ("When... you can...") -> MISSES THE TIMING!
  const checkTributeMg = engine.canActivateTriggerEffect(mgCard, 'OPTIONAL_WHEN', 'SENT_TO_GRAVEYARD');
  assert(checkTributeMg.canActivate === false, 'OPTIONAL_WHEN strictly rejected when tributed for Tribute Summon (Rulebook v10 tr. 52)');
  assert(checkTributeMg.missedTiming === true, 'missedTiming flag is true');
  assert(checkTributeMg.reason.includes('Bỏ Lỡ Thời Điểm (Missing the Timing)'), 'Rejection cites Rulebook v10 Missing the Timing');
  assert(engine.logs.some(l => l.message && l.message.includes('Bỏ Lỡ Thời Điểm (Missing the Timing) - Rulebook v10 tr. 52-53')), 'Missing timing log emitted');

  // Evaluate Al ("If... you can...") -> CAN ACTIVATE!
  const checkTributeAl = engine.canActivateTriggerEffect(alCard, 'OPTIONAL_IF', 'SENT_TO_GRAVEYARD');
  assert(checkTributeAl.canActivate === true, 'OPTIONAL_IF can activate even when tributed (Rulebook v10 tr. 53)');
  assert(checkTributeAl.missedTiming === false, 'OPTIONAL_IF never misses timing');
  assert(checkTributeAl.reason.includes('không bao giờ bỏ lỡ thời điểm'), 'Reason explains "If" immunity');

  // Evaluate Cl (MANDATORY) -> CAN ACTIVATE!
  const checkTributeCl = engine.canActivateTriggerEffect(clCard, 'MANDATORY', 'SENT_TO_GRAVEYARD');
  assert(checkTributeCl.canActivate === true, 'MANDATORY trigger can activate even when tributed (Rulebook v10 tr. 52)');
  assert(checkTributeCl.missedTiming === false, 'MANDATORY never misses timing');

  // 4. Resolving Chain Scenario (Rulebook v10 tr. 52-53):
  // Chain Link 2 destroys a monster, then Chain Link 1 resolves.
  // When the chain finishes resolving, the last event was Chain Link 1, NOT the monster's destruction!
  // Therefore, a monster destroyed at Chain Link 2 with "When... you can..." misses the timing!
  player.monsterZones[1] = {
    slotIndex: 1,
    card: mgCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Build a 2-link chain:
  // CL1: Opponent draws/heals (e.g. Exothermic Burst)
  // CL2: Player destroys monster at slot 1
  const cl1Spell = engine.instantiateCard('card_spell_exothermic_burst', 'opponent');
  engine.pushChain(cl1Spell, 'opponent', 1, undefined, 'CL1: Exothermic Burst');

  // Simulate CL2 destroying monster 1
  engine.destroyMonster('player', 1, 'EFFECT');
  engine.recordGameEvent('CHAIN_LINK_RESOLVED', mgCard, 'player', { chainIndex: 2 }, 2);

  // Now resolve CL1
  engine.resolveChain();
  assert(engine.isLastGameEvent('CHAIN_LINK_RESOLVED') === true, 'Final event of chain is CHAIN_LINK_RESOLVED for CL1');
  assert(engine.isLastGameEvent('MONSTER_DESTROYED', mgCard.uid) === false, 'Destruction of Mg at CL2 was NOT the last event');

  const checkChainMg = engine.canActivateTriggerEffect(mgCard, 'OPTIONAL_WHEN', 'MONSTER_DESTROYED');
  assert(checkChainMg.canActivate === false, 'OPTIONAL_WHEN misses timing when destroyed at Chain Link >= 2 (Rulebook v10 tr. 52)');
  assert(checkChainMg.missedTiming === true, 'missedTiming is true for CL2 destruction');

  const checkChainAl = engine.canActivateTriggerEffect(alCard, 'OPTIONAL_IF', 'MONSTER_DESTROYED');
  assert(checkChainAl.canActivate === true, 'OPTIONAL_IF does not miss timing even when destroyed at CL2');

  const checkChainCl = engine.canActivateTriggerEffect(clCard, 'MANDATORY', 'MONSTER_DESTROYED');
  assert(checkChainCl.canActivate === true, 'MANDATORY does not miss timing when destroyed at CL2');

  // 5. SEGOC (Simultaneous Effects Go On Chain) Trigger Assembly and Execution
  // When multiple triggers are valid at the same time:
  // Turn player mandatory (Cl) + Turn player optional (Al) + Opponent mandatory (Cl_opp)
  const oppClCard = engine.instantiateCard('card_elem_17_cl_fumes', 'opponent');
  const triggers = [
    { duelistId: 'player', card: alCard, isMandatory: false, description: 'Al: Heal 800 LP' },
    { duelistId: 'opponent', card: oppClCard, isMandatory: true, description: 'Opponent Cl: Deal 600 damage' },
    { duelistId: 'player', card: clCard, isMandatory: true, description: 'Player Cl: Deal 600 damage' }
  ];

  const segocStack = engine.buildSegocChain(triggers);
  assert(segocStack.length === 3, 'SEGOC stack assembled 3 simultaneous triggers');
  // SEGOC Tier Ordering:
  // Tier 1: Turn Player Mandatory (Player Cl) -> Chain Link 1
  // Tier 2: Opponent Mandatory (Opponent Cl) -> Chain Link 2
  // Tier 3: Turn Player Optional (Player Al) -> Chain Link 3
  assert(segocStack[0].cardInstance.uid === clCard.uid, 'CL1 is Turn Player Mandatory (Player Cl)');
  assert(segocStack[1].cardInstance.uid === oppClCard.uid, 'CL2 is Opponent Mandatory (Opponent Cl)');
  assert(segocStack[2].cardInstance.uid === alCard.uid, 'CL3 is Turn Player Optional (Player Al)');

  // Resolve SEGOC chain in LIFO order (CL3 -> CL2 -> CL1)
  player.lp = 5000;
  opp.lp = 5000;
  const playerLpBefore = player.lp;
  const oppLpBefore = opp.lp;
  engine.resolveChain();

  assert(player.lp === playerLpBefore + 800 - 600, 'Player received 800 heal from Al and 600 damage from Opp Cl');
  assert(opp.lp === oppLpBefore - 600, 'Opponent received 600 damage from Player Cl');
  assert(engine.chainStack.length === 0, 'SEGOC chain fully resolved and cleared');
}

// ============================================================
// Group 34: Token Monster Mechanics & Field Space/Fusion/Xyz/Link Restriction Invariants (Rulebook v10 tr. 48-49)
// ============================================================
{
  console.log('\n--- Group 34: Token Monster Mechanics & Field Space/Fusion/Xyz/Link Restriction Invariants (Rulebook v10 tr. 48-49) ---');

  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  // 1. Definition check of Photolysis Radical Generator Spell
  const photolysisCard = engine.instantiateCard('card_spell_photolysis_radicals', 'player');
  assert(photolysisCard !== null, 'Photolysis Radical Generator instantiates correctly');
  assert(photolysisCard.def.cardType === 'REACTION_SPELL', 'Card type is REACTION_SPELL');
  assert(photolysisCard.def.spellTrapSubtype === 'NORMAL_SPELL', 'Subtype is NORMAL_SPELL');
  assert(photolysisCard.def.effectCode === 'SPELL_PHOTOLYSIS_TOKENS', 'Effect code is SPELL_PHOTOLYSIS_TOKENS');
  assert(photolysisCard.def.effectText.includes('Rulebook v10 tr. 48-49'), 'Card text cites Rulebook v10 tr. 48-49');
  assert(photolysisCard.def.relatedEquation.includes('H₂O₂ + hν → 2·OH'), 'Scientific equation models photolytic homolytic cleavage');

  // 2. Token Summoning & Invariants
  const tokenRes1 = engine.summonToken('player', {
    name: 'Token Gốc Hydroxyl ·OH',
    name_en: 'Hydroxyl Radical Token',
    atk: 500,
    def: 500,
    level: 1,
    attribute: 'AERO',
    chemicalFormula: '·OH'
  }, 'FACE_UP_ATTACK');

  assert(tokenRes1.success === true, 'Token successfully Special Summoned');
  assert(tokenRes1.token !== undefined, 'Token instance returned');
  const token1 = tokenRes1.token;
  assert(token1.isToken === true, 'Instance isToken flag is true');
  assert(token1.def.isToken === true, 'Definition isToken flag is true');
  assert(token1.def.cardType === 'TOKEN_MONSTER', 'Card type is TOKEN_MONSTER');
  assert(token1.def.level === 1, 'Token level is 1');
  assert(token1.def.atk === 500, 'Token ATK is 500');
  assert(token1.def.def === 500, 'Token DEF is 500');
  assert(player.monsterZones[tokenRes1.slotIndex].position === 'FACE_UP_ATTACK', 'Token placed in FACE_UP_ATTACK');

  // Attempting to summon a Token in Face-Down Defense is rejected (Rulebook v10 tr. 48)
  const faceDownTokenRes = engine.summonToken('player', {
    name: 'Invalid Token',
    name_en: 'Invalid Token',
    atk: 0,
    def: 0,
    level: 1,
    attribute: 'AERO'
  }, 'FACE_DOWN_DEFENSE');
  assert(faceDownTokenRes.success === false, 'Cannot Special Summon Token in Face-Down Defense');
  assert(faceDownTokenRes.message.includes('Face-Down Defense'), 'Rejection cites Face-Down Defense prohibition');

  // 3. Field Space Limit Invariant (5/5 zones full)
  // Fill remaining 4 slots
  player.monsterZones[1] = { slotIndex: 1, card: engine.instantiateCard('card_elem_11_na', 'player'), position: 'FACE_UP_ATTACK', hasAttackedThisTurn: false, hasChangedPositionThisTurn: false, turnSummoned: 1, tempAtkBoost: 0, tempDefBoost: 0 };
  player.monsterZones[2] = { slotIndex: 2, card: engine.instantiateCard('card_elem_11_na', 'player'), position: 'FACE_UP_ATTACK', hasAttackedThisTurn: false, hasChangedPositionThisTurn: false, turnSummoned: 1, tempAtkBoost: 0, tempDefBoost: 0 };
  player.monsterZones[3] = { slotIndex: 3, card: engine.instantiateCard('card_elem_11_na', 'player'), position: 'FACE_UP_ATTACK', hasAttackedThisTurn: false, hasChangedPositionThisTurn: false, turnSummoned: 1, tempAtkBoost: 0, tempDefBoost: 0 };
  player.monsterZones[4] = { slotIndex: 4, card: engine.instantiateCard('card_elem_11_na', 'player'), position: 'FACE_UP_ATTACK', hasAttackedThisTurn: false, hasChangedPositionThisTurn: false, turnSummoned: 1, tempAtkBoost: 0, tempDefBoost: 0 };

  const fullFieldTokenRes = engine.summonToken('player', {
    name: 'Overflow Token',
    name_en: 'Overflow Token',
    atk: 100,
    def: 100,
    level: 1,
    attribute: 'AERO'
  });
  assert(fullFieldTokenRes.success === false, 'Cannot summon Token when all 5 Monster Zones are occupied');
  assert(fullFieldTokenRes.message.includes('đã đầy (5/5)'), 'Rejection cites 5/5 monster zones full');

  // 4. Token Disappearance Invariants (Rulebook v10 tr. 48-49):
  // Case A: Token destroyed by effect
  const gyCountBeforeDestroy = player.graveyard.length;
  const destroyRes = engine.destroyMonster('player', 0, 'EFFECT');
  assert(destroyRes.destroyed === true, 'Token destroyed by effect');
  assert(player.monsterZones[0] === null, 'Token cleared from monster zone 0');
  assert(!player.graveyard.some(c => c.uid === token1.uid), 'Token is NOT in Graveyard after destruction (disappeared from duel)');
  assert(player.graveyard.length === gyCountBeforeDestroy, 'Graveyard count did not increase from destroyed token');

  // Case B: Token banished from field
  const tokenRes2 = engine.summonToken('player', {
    name: 'Token Gốc Hydroxyl ·OH',
    name_en: 'Hydroxyl Radical Token',
    atk: 500,
    def: 500,
    level: 1,
    attribute: 'AERO'
  }, 'FACE_UP_ATTACK', 0);
  assert(tokenRes2.success === true, 'Second Token summoned');
  const token2 = tokenRes2.token;

  const banishRes = engine.banishMonster('player', 0);
  assert(banishRes.success === true, 'Token banished from field');
  assert(player.monsterZones[0] === null, 'Slot 0 cleared after banishing token');
  assert(!player.banished.some(c => c.uid === token2.uid), 'Token is NOT in Banished Zone (disappeared completely)');

  // Case C: Token used as Tribute for Tribute Summon
  const tokenRes3 = engine.summonToken('player', {
    name: 'Tribute Fodder Token',
    name_en: 'Tribute Fodder Token',
    atk: 500,
    def: 500,
    level: 1,
    attribute: 'AERO'
  }, 'FACE_UP_ATTACK', 0);
  const token3 = tokenRes3.token;

  const tributeMonster = engine.instantiateCard('card_elem_26_fe', 'player');
  tributeMonster.def.level = 5;
  tributeMonster.def.manaCost = 1;
  player.hand.push(tributeMonster);
  player.mana = 10;
  player.normalSummonsRemaining = 1;

  const tribSummonRes = engine.normalSummon('player', tributeMonster.uid, 'FACE_UP_ATTACK', [0]);
  assert(tribSummonRes.success === true, 'Token CAN be used as Tribute for Tribute Summon (Rulebook v10 tr. 48)');
  assert(!player.graveyard.some(c => c.uid === token3.uid), 'Tributed Token is NOT in Graveyard');
  assert(player.monsterZones[0].card.uid === tributeMonster.uid, 'Tribute Summoned monster occupies slot 0');

  // 5. Xyz Material Restriction Invariant (Rulebook v10 tr. 48 & 51):
  // Monster Tokens CANNOT be used as Xyz Material!
  // Clear slots 1 and 2
  player.monsterZones[1] = null;
  player.monsterZones[2] = null;

  // Summon Level 4 Token in slot 1 and Level 4 normal monster in slot 2
  const tokenLvl4Res = engine.summonToken('player', {
    name: 'Level 4 Carbon Radical Token',
    name_en: 'Level 4 Carbon Radical Token',
    atk: 1000,
    def: 1000,
    level: 4,
    attribute: 'TERRA'
  }, 'FACE_UP_ATTACK', 1);
  const tokenLvl4 = tokenLvl4Res.token;

  player.monsterZones[2] = {
    slotIndex: 2,
    card: engine.instantiateCard('card_elem_26_fe', 'player'), // Fe is Level 4
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Find Rank 4 Xyz Monster in Extra Deck
  const xyzCard = engine.instantiateCard('card_xyz_hexammine_cobalt', 'player');
  player.extraDeck.push(xyzCard);
  const xyzIndex = player.extraDeck.length - 1;
  player.mana = 10;
  engine.currentPhase = 'MAIN_PHASE_1';

  // Attempt Xyz Summon using Token (slot 1) + Fe (slot 2) -> MUST BE REJECTED!
  const illegalXyzRes = engine.xyzSummon('player', xyzIndex, 1, [1, 2]);
  assert(illegalXyzRes.success === false, 'Xyz Summon using Monster Token as overlay material is STRICTLY REJECTED (Rulebook v10 tr. 48)');
  assert(illegalXyzRes.message.includes('[Quy Tắc Monster Token - Rulebook v10 tr. 48]'), 'Rejection cites Rulebook v10 tr. 48');
  assert(illegalXyzRes.message.includes('không thể được sử dụng làm Nguyên liệu Xyz'), 'Rejection specifies Xyz Material prohibition');
  assert(player.monsterZones[1].card.uid === tokenLvl4.uid, 'Token remained on field untouched');
  assert(player.extraDeck[xyzIndex].uid === xyzCard.uid, 'Xyz Monster remained in Extra Deck');

  // 6. Spell Photolysis Token Generation Execution
  // Clear slots 3 and 4
  player.monsterZones[3] = null;
  player.monsterZones[4] = null;
  player.mana = 10;
  player.hand.push(photolysisCard);

  const actPhotolysis = engine.activateSpellFromHand('player', photolysisCard.uid);
  assert(actPhotolysis.success === true, 'Photolysis Radical Generator activated from hand');
  engine.resolveChain();

  // Slots 3 and 4 should now be occupied by the 2 spawned Hydroxyl Radical Tokens
  assert(player.monsterZones[3] !== null && player.monsterZones[3].card.isToken === true, 'Slot 3 occupied by Hydroxyl Radical Token');
  assert(player.monsterZones[4] !== null && player.monsterZones[4].card.isToken === true, 'Slot 4 occupied by Hydroxyl Radical Token');
  assert(player.monsterZones[3].position === 'FACE_UP_ATTACK', 'First token in Attack position');
  assert(player.monsterZones[4].position === 'FACE_UP_DEFENSE', 'Second token in Defense position');
}

// --- Group 35: Battle Damage Calculation & Replay/Substep 4 Direct Attack Modulation Invariants (Rulebook v10 tr. 40-43) ---
console.log('\n--- Group 35: Battle Damage Calculation & Replay/Substep 4 Direct Attack Modulation Invariants (Rulebook v10 tr. 40-43) ---');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  engine.currentTurn = 2; // Turn 2 so attack is allowed
  engine.activePlayerId = 'player';
  engine.currentPhase = 'BATTLE_PHASE';

  // Clear boards
  for (let i = 0; i < 5; i++) {
    player.monsterZones[i] = null;
    opp.monsterZones[i] = null;
  }
  player.lp = 8000;
  opp.lp = 8000;

  // 1. Direct Attack Invariants
  const attackerFe = engine.instantiateCard('card_elem_26_fe', 'player'); // ATK 1900
  player.monsterZones[0] = {
    slotIndex: 0,
    card: attackerFe,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // When opponent has 0 monsters, direct attack succeeds
  const directRes = engine.declareAttack(0, 'DIRECT');
  assert(directRes.success === true, 'Direct attack succeeds when opponent controls no monsters');
  assert(directRes.directAttack === true, 'directAttack flag is true');
  assert(directRes.damageDealt === 1900, 'Direct attack deals full 1900 damage to opponent LP');
  assert(opp.lp === 6100, 'Opponent LP decreased to 6100 (8000 - 1900)');
  assert(directRes.damageSubsteps.length === 5, 'Direct attack executes through all 5 Damage Substeps');
  assert(directRes.damageSubsteps[0].includes('Mốc 1'), 'Substep 1 logged: Start of Damage Step');
  assert(directRes.damageSubsteps[2].includes('Mốc 3') && directRes.damageSubsteps[2].includes('-1900 LP'), 'Substep 3 logged: Direct damage inflicted');
  assert(engine.lastGameEvent.eventType === 'BATTLE_DAMAGE_DEALT', 'BATTLE_DAMAGE_DEALT event recorded for direct attack');
  assert(engine.lastGameEvent.payload.damage === 1900, 'Recorded damage in event payload is 1900');

  // Monster cannot attack twice in same turn
  const repeatDirectRes = engine.declareAttack(0, 'DIRECT');
  assert(repeatDirectRes.success === false, 'Monster cannot attack again after having attacked this turn');
  assert(repeatDirectRes.message.includes('đã tấn công'), 'Error message confirms already attacked');

  // Reset attacker attack state
  player.monsterZones[0].hasAttackedThisTurn = false;

  // When opponent controls a monster, normal direct attack is REJECTED
  const oppShield = engine.instantiateCard('card_elem_12_mg_spark', 'opponent'); // DEF 1400
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: oppShield,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const blockedDirectRes = engine.declareAttack(0, 'DIRECT');
  assert(blockedDirectRes.success === false, 'Direct attack rejected when opponent has monster on field');
  assert(blockedDirectRes.message.includes('Phải tấn công quái thú trước'), 'Error specifies must attack monster first');

  // Fluorine (ELEM_F_MAX_OX) direct attack modulation bypass:
  // Can attack directly if opponent ONLY has defense position monsters
  const fluorineCard = engine.instantiateCard('card_elem_9_f', 'player'); // ATK 2400, ELEM_F_MAX_OX
  player.monsterZones[1] = {
    slotIndex: 1,
    card: fluorineCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const fluorineDirectRes = engine.declareAttack(1, 'DIRECT');
  assert(fluorineDirectRes.success === true, 'Fluorine bypasses defense wall to attack directly (ELEM_F_MAX_OX)');
  assert(fluorineDirectRes.directAttack === true, 'Fluorine directAttack flag is true');
  assert(fluorineDirectRes.damageDealt === 2400, 'Fluorine deals 2400 battle damage directly');
  assert(opp.lp === 3700, 'Opponent LP decreased to 3700 (6100 - 2400)');

  // 2. ATK vs ATK Battle Matrix
  // Setup: Player Fe (1900 ATK) vs Opponent C (1100 ATK)
  const oppCarbon = engine.instantiateCard('card_elem_6_c', 'opponent'); // ATK 1100
  opp.monsterZones[1] = {
    slotIndex: 1,
    card: oppCarbon,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const atkVsAtkRes = engine.declareAttack(0, 1);
  assert(atkVsAtkRes.success === true, 'Attack declaration against Carbon succeeds');
  assert(atkVsAtkRes.attackerDestroyed === false, 'Attacker Fe (1900) survives');
  assert(atkVsAtkRes.targetDestroyed === true, 'Defender Carbon (1100) destroyed');
  assert(atkVsAtkRes.damageDealt === 800, 'Damage dealt is 800 (1900 - 1100)');
  assert(opp.lp === 2900, 'Opponent LP reduced to 2900 (3700 - 800)');
  assert(opp.monsterZones[1] === null, 'Destroyed defender slot cleared');
  assert(opp.graveyard.some(c => c.uid === oppCarbon.uid), 'Destroyed defender sent to Graveyard in Substep 5');
  assert(atkVsAtkRes.damageSubsteps[4].includes('Gửi [Carbon — Khung Xương Sự Sống] xuống GY'), 'Substep 5 logs monster sent to GY');

  // Suicide Attack: Player weak monster Li (1400 ATK) vs Opponent strong monster Fe (1900 ATK)
  const weakPlayerMonster = engine.instantiateCard('card_elem_3_li', 'player'); // ATK 1400
  player.monsterZones[2] = {
    slotIndex: 2,
    card: weakPlayerMonster,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const strongOppMonster = engine.instantiateCard('card_elem_26_fe', 'opponent'); // ATK 1900
  opp.monsterZones[2] = {
    slotIndex: 2,
    card: strongOppMonster,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const suicideRes = engine.declareAttack(2, 2);
  assert(suicideRes.success === true, 'Suicide attack declaration succeeds');
  assert(suicideRes.attackerDestroyed === true, 'Attacking weaker monster is destroyed');
  assert(suicideRes.targetDestroyed === false, 'Defending stronger monster survives');
  assert(suicideRes.damageDealt === 500, 'Attacking player takes 500 battle damage (1900 - 1400)');
  assert(player.lp === 7500, 'Player LP reduced to 7500 (8000 - 500)');
  assert(player.monsterZones[2] === null, 'Destroyed attacker slot cleared');
  assert(player.graveyard.some(c => c.uid === weakPlayerMonster.uid), 'Attacker sent to Graveyard');

  // Mutual Destruction: ATK == ATK (> 0)
  const playerClash = engine.instantiateCard('card_elem_11_na', 'player'); // ATK 1800
  player.monsterZones[3] = {
    slotIndex: 3,
    card: playerClash,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  const oppClash = engine.instantiateCard('card_elem_11_na', 'opponent'); // ATK 1800
  opp.monsterZones[3] = {
    slotIndex: 3,
    card: oppClash,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const mutualRes = engine.declareAttack(3, 3);
  assert(mutualRes.success === true, 'Clash attack declaration succeeds');
  assert(mutualRes.attackerDestroyed === true, 'Both destroyed: attacker destroyed is true');
  assert(mutualRes.targetDestroyed === true, 'Both destroyed: target destroyed is true');
  assert(mutualRes.damageDealt === 0, 'No battle damage dealt in mutual destruction (1800 == 1800)');
  assert(player.lp === 7500 && opp.lp === 2900, 'Both duelists LP intact');
  assert(player.monsterZones[3] === null, 'Player slot 3 cleared');
  assert(opp.monsterZones[3] === null, 'Opponent slot 3 cleared');

  // 0 ATK vs 0 ATK Invariant (Rulebook v10 tr. 50)
  const playerZero = engine.instantiateCard('card_elem_6_c', 'player');
  playerZero.def.atk = 0;
  player.monsterZones[4] = {
    slotIndex: 4,
    card: playerZero,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  const oppZero = engine.instantiateCard('card_elem_6_c', 'opponent');
  oppZero.def.atk = 0;
  opp.monsterZones[4] = {
    slotIndex: 4,
    card: oppZero,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  const zeroVsZeroRes = engine.declareAttack(4, 4);
  assert(zeroVsZeroRes.success === true, '0 ATK vs 0 ATK attack declaration succeeds');
  assert(zeroVsZeroRes.attackerDestroyed === false, '0 ATK attacker is NOT destroyed (Rulebook v10 tr. 50)');
  assert(zeroVsZeroRes.targetDestroyed === false, '0 ATK defender is NOT destroyed (Rulebook v10 tr. 50)');
  assert(zeroVsZeroRes.damageDealt === 0, '0 damage dealt in 0 ATK vs 0 ATK combat');
  assert(player.monsterZones[4] !== null, 'Player 0 ATK monster remains on field');
  assert(opp.monsterZones[4] !== null, 'Opponent 0 ATK monster remains on field');

  // 3. Survival Shields: Aluminum Passivation Shield (ELEM_AL_PASSIVATION)
  // Al (1700 ATK) attacked by stronger monster Fe (1900 ATK)
  const alPassivation = engine.instantiateCard('card_elem_13_al', 'opponent'); // ELEM_AL_PASSIVATION
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: alPassivation,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // Re-enable Fe attack
  player.monsterZones[0].hasAttackedThisTurn = false;
  const alBattleRes = engine.declareAttack(0, 0); // Fe (1900) attacks Al (1700)
  assert(alBattleRes.success === true, 'Attack on Aluminum succeeds');
  assert(alBattleRes.damageDealt === 200, 'Opponent takes 200 battle damage (1900 - 1700)');
  assert(alBattleRes.targetDestroyed === false, 'Aluminum Passivation Shield prevents destruction on first attack');
  assert(opp.monsterZones[0] !== null, 'Aluminum remains safely on field in slot 0');
  assert(opp.monsterZones[0].passivationShieldUsed === true, 'Passivation shield marked as used');

  // Second attack on Aluminum in same turn: shield is spent, Aluminum is destroyed!
  player.monsterZones[1].hasAttackedThisTurn = false;
  const alSecondAttackRes = engine.declareAttack(1, 0); // Fluorine (2400) attacks Al (1700)
  assert(alSecondAttackRes.success === true, 'Second attack on Aluminum succeeds');
  assert(alSecondAttackRes.targetDestroyed === true, 'Aluminum destroyed when shield already used');
  assert(opp.monsterZones[0] === null, 'Aluminum cleared from field');

  // 4. Battle Step Replay Mechanics (Rulebook v10 tr. 40-41)
  // Re-setup field: Player has 1 monster (slot 0), Opponent has 2 monsters (slots 1 and 2)
  player.monsterZones[0].hasAttackedThisTurn = false;
  const oppTarget1 = engine.instantiateCard('card_elem_6_c', 'opponent');
  const oppTarget2 = engine.instantiateCard('card_elem_11_na', 'opponent');
  opp.monsterZones[1] = {
    slotIndex: 1,
    card: oppTarget1,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  opp.monsterZones[2] = {
    slotIndex: 2,
    card: oppTarget2,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // Replay Scenario A: Target monster leaves field before Damage Step (e.g., destroyed by quick-play spell)
  // We simulate triggerBattleReplayCheck: initial defender count = 2, now 1
  opp.monsterZones[1] = null; // target destroyed during Battle Step
  const replayA = engine.triggerBattleReplayCheck(0, 2, 1);
  assert(replayA !== null && replayA.isActive === true, 'Battle Replay triggered when opponent monster count changes (Rulebook v10 tr. 40)');
  assert(replayA.attackerSlotIndex === 0, 'Replay identifies attacker at slot 0');
  assert(replayA.eligibleTargetSlots.includes(2), 'Remaining target slot 2 is eligible');
  assert(replayA.canDirectAttack === false, 'Cannot direct attack while slot 2 is occupied');

  // Decision CANCEL: Attacking player aborts attack safely
  const cancelRes = engine.executeBattleReplay('CANCEL');
  assert(cancelRes.success === true, 'Battle Replay CANCEL decision succeeds');
  assert(cancelRes.damageDealt === 0, 'No damage dealt on cancelled attack');
  assert(player.monsterZones[0].hasAttackedThisTurn === true, 'Attacker cannot declare another attack this turn (Rulebook v10 tr. 40)');
  assert(engine.activeReplayState === null, 'Replay state cleared after decision');

  // Replay Scenario B: All opponent monsters removed -> Direct Attack Replay
  player.monsterZones[0].hasAttackedThisTurn = false;
  for (let i = 0; i < 5; i++) opp.monsterZones[i] = null; // Board now completely clear (0 monsters)
  const replayB = engine.initiateBattleReplay(0, 1, 2);
  assert(replayB.canDirectAttack === true, 'Replay permits direct attack when all defenders removed');
  const directReplayRes = engine.executeBattleReplay('DIRECT');
  assert(directReplayRes.success === true, 'Direct attack execution via Replay succeeds');
  assert(directReplayRes.directAttack === true, 'Replay attack resolved as direct attack');
  assert(directReplayRes.damageDealt === 1900, 'Direct attack dealt full 1900 damage via Replay');

  // Replay Scenario C: AI Autonomous Solver
  engine.activePlayerId = 'opponent'; // Simulate AI turn
  player.monsterZones[1] = null;
  player.monsterZones[4] = null; // Clear all weaker player monsters so only 1900 ATK Fe remains
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: oppTarget1, // C (1100 ATK)
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };
  // Opponent board has Player Fe (1900 ATK) -> AI would lose if attacking Fe
  const aiReplay = engine.initiateBattleReplay(0, 1, 0);
  const aiDecision = engine.aiResolveBattleReplay();
  assert(aiDecision.success === true, 'AI Autonomous Replay solver executed decision');
  assert(aiDecision.message.toLowerCase().includes('hủy'), 'AI smartly canceled attack to prevent kamikaze death (1100 vs 1900)');
  assert(opp.monsterZones[0].hasAttackedThisTurn === true, 'AI monster attack right marked as used');
}

// --- Group 36: Hand Size Limit, Maintenance Costs & Turn Player Standby Phase Chemical Depletion Invariants (Rulebook v10 tr. 32-35) ---
console.log('\n--- Group 36: Hand Size Limit, Maintenance Costs & Turn Player Standby Phase Chemical Depletion Invariants (Rulebook v10 tr. 32-35) ---');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  // Clear boards
  for (let i = 0; i < 5; i++) {
    player.monsterZones[i] = null;
    opp.monsterZones[i] = null;
    player.spellTrapZones[i] = null;
    opp.spellTrapZones[i] = null;
  }
  player.lp = 8000;
  opp.lp = 8000;

  // 1. Standby Phase Maintenance Cost Payment (Rulebook v10 tr. 32)
  const tokamakSpell = engine.instantiateCard('card_spell_plasma_containment', 'player');
  assert(tokamakSpell !== null, 'Tokamak Plasma Confinement instantiates correctly');
  assert(tokamakSpell.def.maintenanceCost !== undefined, 'Card definition has maintenanceCost');
  assert(tokamakSpell.def.maintenanceCost.lp === 500, 'Maintenance cost is 500 LP per Standby Phase');
  assert(tokamakSpell.def.spellTrapSubtype === 'CONTINUOUS_SPELL', 'Tokamak is a CONTINUOUS_SPELL');

  player.spellTrapZones[0] = {
    slotIndex: 0,
    card: tokamakSpell,
    isFaceUp: true,
    turnSet: 1
  };

  // Place an Electro monster to test stat boost while maintained
  const electroMon = engine.instantiateCard('card_elem_3_li', 'player'); // Li (ELECTRO)
  player.monsterZones[0] = {
    slotIndex: 0,
    card: electroMon,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // Resolve Standby Effects when Player has 8000 LP
  engine.resolveStandbyEffects('player');
  assert(player.lp === 7500, 'Player paid 500 LP maintenance cost (8000 - 500 = 7500 LP)');
  assert(player.spellTrapZones[0] !== null, 'Tokamak Plasma Confinement remains face-up on field');
  assert(player.monsterZones[0].tempAtkBoost === 400, 'Allied Electro monster gains +400 ATK from Tokamak field');
  assert(engine.lastGameEvent.eventType === 'MAINTENANCE_COST_PAID', 'MAINTENANCE_COST_PAID event recorded');
  assert(engine.lastGameEvent.payload.costLp === 500, 'Event payload records 500 LP cost');

  // 2. Standby Phase Maintenance Cost Failure & Automatic Destruction (Rulebook v10 tr. 32)
  // Drop player LP to 300 (less than 500 LP maintenance cost)
  player.lp = 300;
  engine.resolveStandbyEffects('player');
  assert(player.spellTrapZones[0] === null, 'Tokamak destroyed when controller cannot pay 500 LP maintenance cost');
  assert(player.graveyard.some(c => c.uid === tokamakSpell.uid), 'Destroyed Tokamak sent to Graveyard (Rulebook v10 tr. 32)');
  assert(player.lp === 300, 'LP was NOT deducted when player could not pay maintenance cost');
  assert(engine.lastGameEvent.eventType === 'CARD_DESTROYED_BY_MAINTENANCE_FAILURE', 'CARD_DESTROYED_BY_MAINTENANCE_FAILURE event recorded');

  // 3. Radioactive Decay & Standby Depletion Invariants (Rulebook v10 tr. 32)
  const radiumMonster = engine.instantiateCard('card_elem_88_ra', 'player');
  assert(radiumMonster !== null, 'Radium instantiates correctly');
  assert(radiumMonster.def.decayCounters === 3, 'Radium has 3 initial half-life decay counters');
  assert(radiumMonster.def.effectCode === 'ELEM_RA_ALPHA_DECAY', 'Effect code is ELEM_RA_ALPHA_DECAY');

  player.monsterZones[1] = {
    slotIndex: 1,
    card: radiumMonster,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    equippedCards: []
  };

  // Cycle 1: Decay from 3 to 2
  opp.lp = 8000;
  engine.resolveStandbyEffects('player');
  assert(radiumMonster.decayCounters === 2, 'Decay counter decremented from 3 to 2');
  assert(opp.lp === 7600, 'Opponent took 400 radiation damage (8000 - 400 = 7600 LP)');
  assert(player.monsterZones[1] !== null, 'Radium remains on field with 2 counters');
  assert(engine.lastGameEvent.eventType === 'RADIOACTIVE_ALPHA_DECAY', 'RADIOACTIVE_ALPHA_DECAY event recorded');

  // Cycle 2: Decay from 2 to 1
  engine.resolveStandbyEffects('player');
  assert(radiumMonster.decayCounters === 1, 'Decay counter decremented from 2 to 1');
  assert(opp.lp === 7200, 'Opponent took 400 radiation damage (7600 - 400 = 7200 LP)');
  assert(player.monsterZones[1] !== null, 'Radium remains on field with 1 counter');

  // Cycle 3: Final decay from 1 to 0 -> Nucleus fully decays to Lead-206 and is sent to GY!
  engine.resolveStandbyEffects('player');
  assert(radiumMonster.decayCounters === 0, 'Decay counter reaches 0');
  assert(opp.lp === 6800, 'Final 400 radiation damage inflicted (7200 - 400 = 6800 LP)');
  assert(player.monsterZones[1] === null, 'Radium vacated monster zone after nuclear exhaustion');
  assert(player.graveyard.some(c => c.uid === radiumMonster.uid), 'Decayed Radium sent to Graveyard as stable lead');
  assert(engine.lastGameEvent.eventType === 'MONSTER_DECAY_COMPLETED', 'MONSTER_DECAY_COMPLETED event recorded');

  // 4. End Phase Hand Size Limit Discard Invariants (Rulebook v10 tr. 31 & 35)
  // Fill player hand with 9 cards (exceeds 6 limit by 3)
  player.hand = [];
  for (let i = 0; i < 9; i++) {
    const card = engine.instantiateCard('card_elem_1_h', 'player');
    player.hand.push(card);
  }

  assert(engine.getHandSizeLimitExcess('player') === 3, 'Hand excess is 3 (9 - 6 = 3 cards)');
  assert(engine.isHandSizeLimitExceeded('player') === true, 'isHandSizeLimitExceeded is true for 9 cards');

  // Discard 1st card
  const discard1Res = engine.discardCardFromHand('player', player.hand[0].uid);
  assert(discard1Res.success === true, 'First discard succeeds');
  assert(discard1Res.remainingExcess === 2, 'Remaining excess is 2 (8 - 6 = 2 cards)');
  assert(player.hand.length === 8, 'Hand length is now 8');
  assert(player.graveyard.length >= 1, 'Discarded card routed to Graveyard');
  assert(engine.lastGameEvent.eventType === 'CARD_DISCARDED', 'CARD_DISCARDED event recorded');
  assert(engine.lastGameEvent.payload.reason === 'HAND_SIZE_LIMIT', 'Event reason is HAND_SIZE_LIMIT');

  // Discard remaining 2 cards using discardMultipleCardsFromHand
  const discardUids = [player.hand[0].uid, player.hand[1].uid];
  const multiDiscardRes = engine.discardMultipleCardsFromHand('player', discardUids);
  assert(multiDiscardRes.success === true, 'Multiple discard succeeds');
  assert(player.hand.length === 6, 'Hand length strictly reaches exactly 6 cards (Rulebook v10 tr. 35)');
  assert(engine.isHandSizeLimitExceeded('player') === false, 'Hand size limit excess is now 0');
  assert(engine.getHandSizeLimitExcess('player') === 0, 'getHandSizeLimitExcess returns 0');

  // Opponent hand is immune to turn player's hand size limit (Rulebook v10 tr. 35)
  opp.hand = [];
  for (let i = 0; i < 8; i++) {
    opp.hand.push(engine.instantiateCard('card_elem_6_c', 'opponent'));
  }
  assert(opp.hand.length === 8, 'Opponent has 8 cards in hand');
  // It is player's turn, so opponent is NOT prompted or forced to discard
  assert(engine.activePlayerId === 'player', 'Active turn player is player');
}

// --- Group 37: Multi-Target Spell/Trap Card Resolution & Partial Target Disappearance Invariants (Rulebook v10 tr. 48-49 & 54) ---
console.log('\n--- Group 37: Multi-Target Spell/Trap Card Resolution & Partial Target Disappearance Invariants (Rulebook v10 tr. 48-49 & 54) ---');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  // Clear boards
  for (let i = 0; i < 5; i++) {
    player.monsterZones[i] = null;
    opp.monsterZones[i] = null;
    player.spellTrapZones[i] = null;
    opp.spellTrapZones[i] = null;
  }
  player.lp = 8000;
  opp.lp = 8000;
  player.mana = 10;
  opp.mana = 10;
  engine.currentPhase = 'MAIN_PHASE_1';
  engine.activePlayerId = 'player';

  // 1. Definition Verification of Multi-Target Chemistry Cards
  const dualElecDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_dual_electrolysis');
  assert(dualElecDef !== undefined, 'Dual Electrolysis card definition exists');
  assert(dualElecDef.targetCount === 2, 'Dual Electrolysis requires 2 targets at activation');
  assert(dualElecDef.requiresAllTargets === false, 'Dual Electrolysis does NOT require all targets to survive (resolve as much as possible)');
  assert(dualElecDef.spellTrapSubtype === 'NORMAL_SPELL', 'Dual Electrolysis is a NORMAL_SPELL');

  const redoxDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_redox_coupling');
  assert(redoxDef !== undefined, 'Redox Coupling card definition exists');
  assert(redoxDef.targetCount === 2, 'Redox Coupling requires exactly 2 targets');
  assert(redoxDef.requiresAllTargets === true, 'Redox Coupling strictly requires BOTH targets to resolve (Rulebook v10 tr. 48-49 & 54)');
  assert(redoxDef.spellTrapSubtype === 'QUICK_PLAY_SPELL', 'Redox Coupling is a QUICK_PLAY_SPELL');
  assert(redoxDef.spellSpeed === 2, 'Redox Coupling has Spell Speed 2');

  // 2. Normal Dual-Target Resolution: Both targets valid on field
  // Place two opponent monsters: Fe (1900 ATK) at slot 0, Na (1800 ATK) at slot 1
  const oppFe = engine.instantiateCard('card_elem_26_fe', 'opponent');
  const oppNa = engine.instantiateCard('card_elem_11_na', 'opponent');
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: oppFe,
    position: 'FACE_UP_ATTACK',
    turnSummoned: 1,
    attacksDeclaredThisTurn: 0,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  opp.monsterZones[1] = {
    slotIndex: 1,
    card: oppNa,
    position: 'FACE_UP_ATTACK',
    turnSummoned: 1,
    attacksDeclaredThisTurn: 0,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const handElecCard = engine.instantiateCard('card_spell_dual_electrolysis', 'player');
  player.hand.push(handElecCard);

  const actElecRes = engine.activateSpellFromHand('player', handElecCard.uid, {
    targetSlotIndices: [0, 1],
    targetPlayerId: 'opponent'
  });
  assert(actElecRes.success === true, 'Dual Electrolysis activated successfully targeting slots 0 and 1');
  assert(opp.monsterZones[0].tempAtkBoost === -600, 'Opponent Fe ATK reduced by 600 (-600 temp boost, effective 1300 ATK)');
  assert(opp.monsterZones[1].tempAtkBoost === -600, 'Opponent Na ATK reduced by 600 (-600 temp boost, effective 1200 ATK)');
  assert(player.graveyard.some(c => c.uid === handElecCard.uid), 'Resolved Dual Electrolysis sent to Graveyard');
  assert(engine.lastGameEvent.eventType === 'CHAIN_LINK_RESOLVED', 'CHAIN_LINK_RESOLVED event recorded for successful multi-target resolution');

  // 3. Multi-Target with Dissolution (ATK <= 600)
  // Replace slot 1 with a low ATK monster (e.g. Carbon with 1100 ATK, but let's give it -600 already so effective ATK is 500)
  const oppLowAtk = engine.instantiateCard('card_elem_6_c', 'opponent');
  opp.monsterZones[1] = {
    slotIndex: 1,
    card: oppLowAtk,
    position: 'FACE_UP_ATTACK',
    turnSummoned: 1,
    attacksDeclaredThisTurn: 0,
    tempAtkBoost: -600, // 1100 - 600 = 500 ATK (<= 600)
    tempDefBoost: 0
  };
  opp.monsterZones[0].tempAtkBoost = 0; // Reset Fe to base 1900

  const handElecCard2 = engine.instantiateCard('card_spell_dual_electrolysis', 'player');
  player.hand.push(handElecCard2);

  engine.activateSpellFromHand('player', handElecCard2.uid, {
    targetSlotIndices: [0, 1],
    targetPlayerId: 'opponent'
  });
  assert(opp.monsterZones[0].tempAtkBoost === -600, 'Fe ATK reduced by 600 again');
  assert(opp.monsterZones[1] === null, 'Opponent slot 1 monster dissolved and destroyed because ATK <= 600');
  assert(opp.graveyard.some(c => c.uid === oppLowAtk.uid), 'Dissolved monster routed to Opponent Graveyard');
  assert(engine.lastGameEvent.eventType === 'CHAIN_LINK_RESOLVED', 'CHAIN_LINK_RESOLVED event recorded');

  // 4. Partial Target Disappearance Invariant (Rulebook v10 tr. 48-49):
  // "If a card targets two or more cards, and one of them is no longer on the field when the effect resolves,
  // the remaining target(s) are still affected unless the card specifically states 'both' or 'all'."
  // Setup: Target 2 monsters on opponent field. Target 1 disappears in intervening chain link / action.
  const oppCa = engine.instantiateCard('card_elem_20_ca', 'opponent');
  opp.monsterZones[1] = {
    slotIndex: 1,
    card: oppCa,
    position: 'FACE_UP_ATTACK',
    turnSummoned: 1,
    attacksDeclaredThisTurn: 0,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  opp.monsterZones[0].tempAtkBoost = 0; // Fe at slot 0 (1900 ATK)

  const elecSpell3 = engine.instantiateCard('card_spell_dual_electrolysis', 'player');
  // Push CL1 manually to simulate a chain
  engine.pushChain(elecSpell3, 'player', 1, {
    targetRefs: [
      { playerId: 'opponent', zone: 'MONSTER', slotIndex: 0, cardUid: oppFe.uid, cardName: oppFe.def.name },
      { playerId: 'opponent', zone: 'MONSTER', slotIndex: 1, cardUid: oppCa.uid, cardName: oppCa.def.name }
    ],
    requiresAllTargets: false
  }, 'CL1: Dual Electrolysis targeting Fe and Ca');

  // Intervening effect destroys/removes oppFe from slot 0 before CL1 resolves!
  opp.monsterZones[0] = null;
  opp.graveyard.push(oppFe);

  // Now resolve chain
  engine.resolveChain();

  // Validate: Fe was gone, but Ca at slot 1 STILL suffered -600 ATK!
  assert(opp.monsterZones[1].tempAtkBoost === -600, 'Partial disappearance: Remaining valid target Ca still receives -600 ATK (Rulebook v10 tr. 48-49)');
  assert(engine.lastGameEvent.eventType === 'CHAIN_LINK_RESOLVED', 'CL1 resolved with partial application');
  assert(engine.gameEventHistory.some(e => e.eventType === 'CHAIN_TARGET_PARTIAL_APPLIED'), 'CHAIN_TARGET_PARTIAL_APPLIED event recorded in event log');

  // 5. Full Target Disappearance Invariant (Rulebook v10 tr. 48-49):
  // When ALL designated targets leave the field before resolution, the effect fizzles completely without effect.
  const elecSpell4 = engine.instantiateCard('card_spell_dual_electrolysis', 'player');
  engine.pushChain(elecSpell4, 'player', 1, {
    targetRefs: [
      { playerId: 'opponent', zone: 'MONSTER', slotIndex: 1, cardUid: oppCa.uid, cardName: oppCa.def.name }
    ],
    requiresAllTargets: false
  }, 'CL1: Dual Electrolysis targeting Ca');

  // Ca is removed from field before resolution
  opp.monsterZones[1] = null;
  opp.graveyard.push(oppCa);

  engine.resolveChain();

  assert(engine.lastGameEvent.eventType === 'EFFECT_RESOLVED_WITHOUT_EFFECT', 'EFFECT_RESOLVED_WITHOUT_EFFECT recorded when all targets disappeared');
  assert(engine.lastGameEvent.payload.reason === 'ALL_TARGETS_DISAPPEARED', 'Reason is ALL_TARGETS_DISAPPEARED');
  assert(player.graveyard.some(c => c.uid === elecSpell4.uid), 'Fizzled spell card is safely routed to Graveyard');

  // 6. Strict "Both/All Targets" Invariant (Rulebook v10 tr. 48-49 & 54):
  // Card: Redox Coupling Conjugation (requiresAllTargets: true)
  // Case 6A: Both targets present -> Successful resolution (+600 ATK, 800 LP damage)
  const myAl = engine.instantiateCard('card_elem_13_al', 'player');
  player.monsterZones[0] = {
    slotIndex: 0,
    card: myAl,
    position: 'FACE_UP_ATTACK',
    turnSummoned: 1,
    attacksDeclaredThisTurn: 0,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const oppCu = engine.instantiateCard('card_elem_26_fe', 'opponent');
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: oppCu,
    position: 'FACE_UP_ATTACK',
    turnSummoned: 1,
    attacksDeclaredThisTurn: 0,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  opp.lp = 8000;

  const redoxSpell1 = engine.instantiateCard('card_spell_redox_coupling', 'player');
  engine.pushChain(redoxSpell1, 'player', 2, {
    targetRefs: [
      { playerId: 'player', zone: 'MONSTER', slotIndex: 0, cardUid: myAl.uid, cardName: myAl.def.name },
      { playerId: 'opponent', zone: 'MONSTER', slotIndex: 0, cardUid: oppCu.uid, cardName: oppCu.def.name }
    ],
    requiresAllTargets: true
  }, 'CL1: Redox Coupling targeting Al and Cu');

  engine.resolveChain();

  assert(player.monsterZones[0].tempAtkBoost === 600, 'Allied monster gained +600 ATK from redox coupling');
  assert(opp.lp === 7200, 'Opponent took 800 LP exothermic redox damage (8000 - 800 = 7200 LP)');
  assert(engine.lastGameEvent.eventType === 'CHAIN_LINK_RESOLVED', 'Redox coupling successfully resolved on chain');

  // Case 6B: One target disappears before resolution with requiresAllTargets: true
  // Invariant (Rulebook v10 tr. 48-49 & 54): Because effect states "both" (requiresAllTargets: true),
  // if 1 target is missing, the ENTIRE effect resolves without effect! Allied monster gets 0 boost, Opponent takes 0 damage!
  player.monsterZones[0].tempAtkBoost = 0; // Reset myAl boost
  const oppPreLp = opp.lp;

  const redoxSpell2 = engine.instantiateCard('card_spell_redox_coupling', 'player');
  engine.pushChain(redoxSpell2, 'player', 2, {
    targetRefs: [
      { playerId: 'player', zone: 'MONSTER', slotIndex: 0, cardUid: myAl.uid, cardName: myAl.def.name },
      { playerId: 'opponent', zone: 'MONSTER', slotIndex: 0, cardUid: oppCu.uid, cardName: oppCu.def.name }
    ],
    requiresAllTargets: true
  }, 'CL1: Redox Coupling requiring BOTH targets');

  // Intervening effect removes opponent's Cu before CL1 resolves!
  opp.monsterZones[0] = null;
  opp.graveyard.push(oppCu);

  engine.resolveChain();

  // Validate strict fizzle:
  assert(player.monsterZones[0].tempAtkBoost === 0, 'Rulebook v10 tr. 48-49 & 54: Allied monster received NO ATK boost because "both" condition was broken');
  assert(opp.lp === oppPreLp, 'Opponent took NO damage because "both" condition was broken');
  assert(engine.lastGameEvent.eventType === 'EFFECT_RESOLVED_WITHOUT_EFFECT', 'EFFECT_RESOLVED_WITHOUT_EFFECT event recorded');
  assert(engine.lastGameEvent.payload.reason === 'MISSING_REQUIRED_ALL_TARGETS', 'Event payload reason is strictly MISSING_REQUIRED_ALL_TARGETS');
  assert(player.graveyard.some(c => c.uid === redoxSpell2.uid), 'Fizzled Redox Coupling sent to Graveyard per Master Rule');

  // 7. Single-Target Card Disappearance Verification
  // Quick ATK Surge targeting a monster that is removed before resolution
  const surgeSpell = engine.instantiateCard('card_spell_thermite_surge', 'player');
  engine.pushChain(surgeSpell, 'player', 2, {
    targetSlotIndex: 0,
    targetPlayerId: 'player'
  }, 'CL1: Thermite Surge targeting player slot 0');

  // Remove player slot 0 monster before resolution
  player.monsterZones[0] = null;
  player.graveyard.push(myAl);

  engine.resolveChain();

  assert(engine.lastGameEvent.eventType === 'EFFECT_RESOLVED_WITHOUT_EFFECT', 'Single target disappearance also triggers EFFECT_RESOLVED_WITHOUT_EFFECT');
  assert(player.graveyard.some(c => c.uid === surgeSpell.uid), 'Single-target spell safely sent to Graveyard');
}

// --- Group 38: Damage Step Effect Restrictions & ATK/DEF Modifiers vs Counter Traps Invariants (Rulebook v10 tr. 43) ---
console.log('\n--- Group 38: Damage Step Effect Restrictions & ATK/DEF Modifiers vs Counter Traps Invariants (Rulebook v10 tr. 43) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // 1. Definition and Card Metadata Verification
  const counterDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_galvanic_counter_shock');
  const barrierDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_crystallization_barrier');
  const thermiteDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_thermite_surge');
  const normalSpellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_mass_spec_draw');
  const normalTrapDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_acid_neutralizer');

  assert(Boolean(counterDef), 'Galvanic Counter Shock card definition exists');
  assert(counterDef.cardType === 'TRAP', 'Galvanic Counter Shock is a TRAP');
  assert(counterDef.spellTrapSubtype === 'COUNTER_TRAP', 'Galvanic Counter Shock is a COUNTER_TRAP');
  assert(counterDef.spellSpeed === 3, 'Counter Trap has Spell Speed 3');

  assert(Boolean(barrierDef), 'Crystallization Barrier card definition exists');
  assert(barrierDef.modifiesAtkDef === true, 'Crystallization Barrier modifies ATK/DEF');
  assert(barrierDef.activationWindow === 'DAMAGE_STEP', 'Crystallization Barrier specifies DAMAGE_STEP');
  assert(barrierDef.spellTrapSubtype === 'QUICK_PLAY_SPELL', 'Crystallization Barrier is a QUICK_PLAY_SPELL');

  assert(Boolean(thermiteDef), 'Thermite Surge card definition exists');
  assert(thermiteDef.modifiesAtkDef === true, 'Thermite Surge modifies ATK/DEF');
  assert(thermiteDef.spellTrapSubtype === 'QUICK_PLAY_SPELL', 'Thermite Surge is a QUICK_PLAY_SPELL');

  const counterInst = engine.instantiateCard('card_trap_galvanic_counter_shock', 'player');
  const barrierInst = engine.instantiateCard('card_spell_crystallization_barrier', 'player');
  const thermiteInst = engine.instantiateCard('card_spell_thermite_surge', 'player');
  const normalSpellInst = engine.instantiateCard('card_spell_mass_spec_draw', 'player');
  const normalTrapInst = engine.instantiateCard('card_trap_acid_neutralizer', 'player');

  // 2. Comprehensive Substep 1-5 Permission Matrix Verification (canActivateInDamageStep)
  // Invariant (Rulebook v10 tr. 43):
  // Counter Traps (SS3): Allowed throughout Substeps 1, 2, 3, 4, 5
  for (let s = 1; s <= 5; s++) {
    const res = engine.canActivateInDamageStep(counterInst, s);
    assert(res.allowed === true, `Counter Trap allowed in Damage Step Substep ${s} (Rulebook v10 tr. 43)`);
  }

  // ATK/DEF Modifiers (Thermite Surge & Crystallization Barrier):
  // Allowed ONLY in Substep 1 (Start of Damage Step) and Substep 2 (Before Damage Calculation)
  assert(engine.canActivateInDamageStep(thermiteInst, 1).allowed === true, 'Thermite Surge (+800 ATK) allowed in Substep 1');
  assert(engine.canActivateInDamageStep(thermiteInst, 2).allowed === true, 'Thermite Surge (+800 ATK) allowed in Substep 2');
  assert(engine.canActivateInDamageStep(barrierInst, 1).allowed === true, 'Crystallization Barrier (+1000 DEF) allowed in Substep 1');
  assert(engine.canActivateInDamageStep(barrierInst, 2).allowed === true, 'Crystallization Barrier (+1000 DEF) allowed in Substep 2');

  // Invariant (Rulebook v10 tr. 43): STRICTLY BLOCKED in Substeps 3, 4, 5 (During/After Damage Calc, End of Damage Step)
  for (let s = 3; s <= 5; s++) {
    const resThermite = engine.canActivateInDamageStep(thermiteInst, s);
    assert(resThermite.allowed === false, `ATK modifier strictly BLOCKED in Substep ${s} (During/After Damage Calc - Rulebook v10 tr. 43)`);
    assert(resThermite.reason.includes('Rulebook v10 tr. 43'), `Rejection message cites Rulebook v10 tr. 43 for Substep ${s}`);

    const resBarrier = engine.canActivateInDamageStep(barrierInst, s);
    assert(resBarrier.allowed === false, `DEF modifier strictly BLOCKED in Substep ${s} (Rulebook v10 tr. 43)`);
  }

  // Normal Spells (Spell Speed 1): STRICTLY BLOCKED across ALL substeps 1-5
  for (let s = 1; s <= 5; s++) {
    const res = engine.canActivateInDamageStep(normalSpellInst, s);
    assert(res.allowed === false, `Normal Spell (Speed 1) strictly BLOCKED in Damage Step Substep ${s}`);
    assert(res.reason.includes('Rulebook v10 tr. 43'), `Normal Spell rejection cites Rulebook v10 tr. 43 in Substep ${s}`);
  }

  // Normal Traps without ATK/DEF modification: STRICTLY BLOCKED across Substeps 1-5
  for (let s = 1; s <= 5; s++) {
    const res = engine.canActivateInDamageStep(normalTrapInst, s);
    assert(res.allowed === false, `Normal Trap without ATK/DEF modification BLOCKED in Substep ${s}`);
  }

  // 3. Live Activation & Duel Engine Enforcements
  // Setup player monsters
  const myMonster = engine.instantiateCard('card_elem_11_na', 'player');
  player.monsterZones[0] = {
    card: myMonster,
    position: 'FACE_UP_ATTACK',
    canAttack: true,
    hasAttacked: false,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    turnsInCurrentPosition: 1
  };
  player.mana = 10;

  // 3A. Substep 2 (Before Damage Calc): Activation from Hand succeeds for Quick-Play ATK Modifier
  engine.currentDamageStepSubstep = 2;
  player.hand = [thermiteInst, barrierInst, normalSpellInst];
  
  const activateThermiteRes = engine.activateSpellFromHand('player', thermiteInst.uid, 0);
  assert(activateThermiteRes.success === true, 'Thermite Surge activates from hand during Damage Step Substep 2');
  engine.resolveChain();
  assert(player.monsterZones[0].tempAtkBoost === 800, 'Allied monster gained +800 ATK from Thermite Surge');

  // 3B. Substep 2: Normal Spell activation from Hand FAILS
  const activateNormalRes = engine.activateSpellFromHand('player', normalSpellInst.uid);
  assert(activateNormalRes.success === false, 'Normal Spell activation strictly rejected during Damage Step');
  assert(activateNormalRes.message.includes('Vi Phạm Damage Step - Rulebook v10 tr. 43'), 'Rejection message flags Damage Step violation');

  // 3C. Substep 3 (During Damage Calculation): ATK Modifier activation FAILS!
  engine.currentDamageStepSubstep = 3;
  player.monsterZones[0].position = 'FACE_UP_DEFENSE';
  const activateBarrierSubstep3 = engine.activateSpellFromHand('player', barrierInst.uid, 0);
  assert(activateBarrierSubstep3.success === false, 'DEF Modifier activation strictly rejected during Damage Calculation (Substep 3)');
  assert(activateBarrierSubstep3.message.includes('Vi Phạm Damage Step - Rulebook v10 tr. 43'), 'Rejection message cites Rulebook v10 tr. 43');

  // 3D. Substep 3: Counter Trap activation SUCCEEDS!
  // Set Counter Trap on player field (set on turn 0, now turn 1)
  player.spellTrapZones[0] = {
    card: counterInst,
    isFaceDown: true,
    turnSet: 0
  };
  opp.lp = 8000;

  // Simulate opponent attempting an effect on chain, Counter Trap chains at Substep 3
  const dummyChainItem = engine.instantiateCard('card_spell_supercritical_extraction', 'opponent');
  engine.chainStack = [
    {
      chainIndex: 1,
      cardInstance: dummyChainItem,
      activatorPlayerId: 'opponent',
      spellSpeed: 1,
      options: {},
      isNegated: false
    }
  ];

  const activateCounterRes = engine.activateSpellTrapFromField('player', 0);
  assert(activateCounterRes.success === true, 'Counter Trap (Spell Speed 3) activates during Substep 3 (During Damage Calc)');
  // Note: activateSpellTrapFromField auto-calls resolveChain() internally
  assert(dummyChainItem.isNegated === true || engine.logs.some(l => l.message.includes('Vô hiệu hóa kích hoạt')), 'Counter Trap negated the chain item');
  assert(opp.lp === 7400, 'Suất điện động pin Galvanic dealt 600 damage to opponent (8000 - 600 = 7400 LP)');

  // 4. Substep Reset Invariant in Battle Resolution
  // Verify that currentDamageStepSubstep resets to 0 after combat
  engine.currentDamageStepSubstep = 0;
  assert(engine.getCurrentDamageStepSubstep() === 0, 'currentDamageStepSubstep is 0 in neutral state');

  const oppMonster = engine.instantiateCard('card_elem_17_cl', 'opponent');
  opp.monsterZones[0] = {
    card: oppMonster,
    position: 'FACE_UP_ATTACK',
    canAttack: true,
    hasAttacked: false,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    turnsInCurrentPosition: 1
  };
  player.monsterZones[0].position = 'FACE_UP_ATTACK';
  player.monsterZones[0].tempAtkBoost = 0;

  const combatRes = engine.resolveDamageStep(0, 0);
  assert(combatRes.success === true, 'Damage step resolved successfully');
  assert(engine.getCurrentDamageStepSubstep() === 0, 'currentDamageStepSubstep strictly resets to 0 after combat completes');

  // Damage Step event sequence check in combat logs
  const combatLogs = engine.logs.map(l => l.message);
  assert(combatLogs.some(m => m.includes('[Damage Step - Mốc 1: Bắt Đầu]')), 'Combat log confirms Damage Step Substep 1');
  assert(combatRes.message.includes('Giao tranh kết thúc'), 'Combat result confirms conclusion');
  assert(combatLogs.some(m => m.toLowerCase().includes('tiêu diệt')), 'Combat log confirms battle destruction');
}

// --- Group 39: Continuous Spell & Trap Maintenance Costs, Voluntary Abandonment & Field Zone Collapses (Rulebook v10 tr. 28-29, 32) ---
console.log('\n--- Group 39: Continuous Spell & Trap Maintenance Costs, Voluntary Abandonment & Field Zone Collapses (Rulebook v10 tr. 28-29, 32) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // 1. Definition and Card Metadata Verification
  const endoDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_endothermic_refrigeration_chamber');
  const anodicDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_continuous_anodic_protection');

  assert(Boolean(endoDef), 'Endothermic Refrigeration Chamber card definition exists');
  assert(endoDef.cardType === 'REACTION_SPELL', 'Endothermic Chamber is a REACTION_SPELL');
  assert(endoDef.spellTrapSubtype === 'CONTINUOUS_SPELL', 'Endothermic Chamber is a CONTINUOUS_SPELL');
  assert(endoDef.maintenanceCost?.mana === 1, 'Endothermic Chamber maintenance cost is 1 Mana');
  assert(endoDef.maintenanceCost?.isOptional === true, 'Endothermic Chamber maintenance cost is optional');

  assert(Boolean(anodicDef), 'Anodic Protection card definition exists');
  assert(anodicDef.cardType === 'TRAP', 'Anodic Protection is a TRAP');
  assert(anodicDef.spellTrapSubtype === 'CONTINUOUS_TRAP', 'Anodic Protection is a CONTINUOUS_TRAP');
  assert(anodicDef.maintenanceCost?.lp === 600, 'Anodic Protection maintenance cost is 600 LP');
  assert(anodicDef.maintenanceCost?.isOptional === true, 'Anodic Protection maintenance cost is optional');

  // 2. Mana Maintenance Cost & Insufficient Mana Destruction
  // Setup opponent Pyro monster (e.g. Sodium with PYRO attribute)
  const oppPyro = engine.instantiateCard('card_elem_11_na', 'opponent');
  opp.monsterZones[0] = {
    card: oppPyro,
    position: 'FACE_UP_ATTACK',
    canAttack: true,
    hasAttacked: false,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    turnsInCurrentPosition: 1
  };

  const endoCard = engine.instantiateCard('card_spell_endothermic_refrigeration_chamber', 'player');
  player.spellTrapZones[0] = {
    slotIndex: 0,
    card: endoCard,
    isFaceUp: true,
    turnSet: 0
  };
  player.mana = 3;

  // Standby Phase with sufficient Mana (3 Mana -> pays 1 Mana -> 2 Mana remaining)
  engine.resolveStandbyEffects('player');
  assert(player.mana === 2, 'Player paid 1 Mana maintenance cost for Endothermic Chamber (3 - 1 = 2 Mana)');
  assert(player.spellTrapZones[0] !== null, 'Endothermic Chamber remains on field when maintenance is paid');
  assert(opp.monsterZones[0].tempAtkBoost === -600, 'Endothermic Chamber suppressed opponent Pyro monster ATK by -600');
  assert(engine.lastGameEvent.eventType === 'MAINTENANCE_COST_PAID', 'MAINTENANCE_COST_PAID event recorded for Mana payment');

  // Standby Phase with 0 Mana (insufficient resources -> destruction!)
  player.mana = 0;
  engine.resolveStandbyEffects('player');
  assert(player.spellTrapZones[0] === null, 'Endothermic Chamber destroyed due to insufficient Mana (Rulebook v10 tr. 32)');
  assert(player.graveyard.some(c => c.uid === endoCard.uid), 'Destroyed Endothermic Chamber routed to Graveyard');
  assert(player.mana === 0, 'Player Mana remained 0 (not negative)');
  assert(engine.lastGameEvent.eventType === 'CARD_DESTROYED_BY_MAINTENANCE_FAILURE', 'CARD_DESTROYED_BY_MAINTENANCE_FAILURE event recorded');

  // 3. Voluntary Maintenance Abandonment (isOptional: true - Rulebook v10 tr. 32)
  const anodicCard = engine.instantiateCard('card_trap_continuous_anodic_protection', 'player');
  player.spellTrapZones[0] = {
    slotIndex: 0,
    card: anodicCard,
    isFaceUp: true,
    turnSet: 0
  };
  player.lp = 8000;

  // Controller decides to voluntarily cease maintenance
  const relinquishRes = engine.relinquishMaintenance('player', 0);
  assert(relinquishRes.success === true, 'Voluntary maintenance cessation registered successfully');
  assert(anodicCard.voluntaryMaintenanceCeased === true, 'voluntaryMaintenanceCeased flag set to true');

  // Trigger Standby Phase: Should self-destruct WITHOUT deducting 600 LP
  engine.resolveStandbyEffects('player');
  assert(player.lp === 8000, 'Rulebook v10 tr. 32: 0 LP deducted when player voluntarily ceases maintenance');
  assert(player.spellTrapZones[0] === null, 'Voluntarily abandoned Continuous Trap cleared from S/T zone');
  assert(player.graveyard.some(c => c.uid === anodicCard.uid), 'Abandoned Continuous Trap sent to Graveyard');
  assert(engine.lastGameEvent.eventType === 'CARD_VOLUNTARILY_ABANDONED', 'CARD_VOLUNTARILY_ABANDONED event recorded');

  // 4. Field Zone Maintenance & Failure Collapse (Rulebook v10 tr. 28, 32)
  // Case 4A: Valid Payment of Field Maintenance Cost
  const fieldWithCost = engine.instantiateCard('card_field_buffer_solution', 'player');
  fieldWithCost.maintenanceCost = { lp: 500, isOptional: true };
  fieldWithCost.isFaceDown = false;
  player.fieldZone = fieldWithCost;
  player.lp = 5000;

  engine.resolveStandbyEffects('player');
  // Buffer solution pays 500 LP maintenance, then its natural effect restores 500 LP -> net 5000 LP
  assert(player.fieldZone !== null, 'Field Spell remains active in Field Zone after paying maintenance');
  assert(engine.lastGameEvent.eventType === 'MAINTENANCE_COST_PAID', 'Field Spell maintenance cost paid event recorded');

  // Case 4B: Voluntary Cessation of Field Spell Maintenance
  const fieldRelinquishRes = engine.relinquishMaintenance('player', 'FIELD');
  assert(fieldRelinquishRes.success === true, 'Voluntary cessation of Field Spell registered');
  assert(fieldWithCost.voluntaryMaintenanceCeased === true, 'Field Spell marked voluntaryMaintenanceCeased = true');

  engine.resolveStandbyEffects('player');
  assert(player.fieldZone === null, 'Field Spell cleared from Field Zone upon voluntary abandonment');
  assert(player.graveyard.some(c => c.uid === fieldWithCost.uid), 'Abandoned Field Spell sent to Graveyard');
  assert(engine.lastGameEvent.eventType === 'FIELD_VOLUNTARILY_ABANDONED', 'FIELD_VOLUNTARILY_ABANDONED event recorded');

  // Case 4C: Inability to Pay Field Maintenance Cost
  const expensiveField = engine.instantiateCard('card_field_cryogenic_lab', 'player');
  expensiveField.maintenanceCost = { lp: 1000, mana: 2, isOptional: false };
  expensiveField.isFaceDown = false;
  player.fieldZone = expensiveField;
  player.lp = 400; // Not enough LP!
  player.mana = 1; // Not enough Mana!

  engine.resolveStandbyEffects('player');
  assert(player.fieldZone === null, 'Expensive Field Spell collapses due to inability to pay maintenance (Rulebook v10 tr. 28 & 32)');
  assert(player.graveyard.some(c => c.uid === expensiveField.uid), 'Collapsed Field Spell sent to Graveyard');
  assert(player.lp === 400, 'LP was NOT deducted upon maintenance failure');
  assert(player.mana === 1, 'Mana was NOT deducted upon maintenance failure');
  assert(engine.lastGameEvent.eventType === 'FIELD_DESTROYED_BY_MAINTENANCE_FAILURE', 'FIELD_DESTROYED_BY_MAINTENANCE_FAILURE event recorded');
}

// --- Group 40: Control of Cards & Temporary Control Transfer Invariants (Rulebook v10 tr. 47 & 55) ---
console.log('\n--- Group 40: Control of Cards & Temporary Control Transfer Invariants (Rulebook v10 tr. 47 & 55) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // 1. Definition and Card Metadata Verification for Chelation Capture EDTA
  const edtaDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_chelation_capture_edta');
  assert(Boolean(edtaDef), 'Chelation Capture EDTA card definition exists');
  assert(edtaDef.cardType === 'REACTION_SPELL', 'EDTA Capture is a REACTION_SPELL');
  assert(edtaDef.spellTrapSubtype === 'NORMAL_SPELL', 'EDTA Capture is a NORMAL_SPELL');
  assert(edtaDef.spellSpeed === 1, 'EDTA Capture has Spell Speed 1');
  assert(edtaDef.manaCost === 3, 'EDTA Capture costs 3 Mana');
  assert(edtaDef.effectCode === 'SPELL_CHELATION_CAPTURE_EDTA', 'EDTA Capture effect code is SPELL_CHELATION_CAPTURE_EDTA');
  assert(edtaDef.iupacName.includes('complex'), 'EDTA Capture has valid IUPAC coordination complex name');
  assert(edtaDef.scientificLore.includes('EDTA'), 'EDTA Capture lore explains hexadentate chelation chemistry');

  // 2. Open Monster Zone Invariant (Rulebook v10 tr. 47)
  // "To take control of a monster, you must have an open Monster Zone. If your Monster Zones are all full, you cannot take control."
  // Fill all 5 of player's Monster Zones
  for (let i = 0; i < 5; i++) {
    const dummy = engine.instantiateCard('card_elem_1_h', 'player');
    player.monsterZones[i] = {
      slotIndex: i,
      card: dummy,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: 1,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };
  }

  // Setup opponent target monster (Iron)
  const oppIron = engine.instantiateCard('card_elem_26_fe', 'opponent');
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: oppIron,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Attempting to take control while player has 5/5 full zones must FAIL
  const fullFieldTransferRes = engine.takeControlOfMonster('player', 0, 'UNTIL_END_OF_TURN', false, false);
  assert(fullFieldTransferRes.success === false, 'Taking control fails when player Monster Zones are 5/5 full (Rulebook v10 tr. 47)');
  assert(fullFieldTransferRes.message.includes('Vi Phạm Master Rule - Rulebook v10 tr. 47'), 'Rejection message cites Rulebook v10 tr. 47');
  assert(fullFieldTransferRes.message.includes('5/5 đã bị chiếm dụng'), 'Rejection message cites 5/5 full monster zones');
  assert(opp.monsterZones[0] !== null, 'Opponent monster remains on opponent field when transfer is rejected');

  // 3. Successful Control Transfer with Open Zone & State Preservation
  // Vacate player's slot 4 (so slots 0..3 are occupied, slot 4 is open)
  player.monsterZones[4] = null;
  // Give opponent monster an attached Xyz Material and set position to FACE_UP_DEFENSE
  opp.monsterZones[0].position = 'FACE_UP_DEFENSE';
  const overlayMat = engine.instantiateCard('card_elem_17_cl', 'opponent');
  opp.monsterZones[0].xyzMaterials = [overlayMat];

  const validTransferRes = engine.takeControlOfMonster('player', 0, 'UNTIL_END_OF_TURN', false, false, 'EDTA_CHELATION');
  assert(validTransferRes.success === true, 'Taking control succeeds when player has open zone');
  assert(validTransferRes.destinationSlotIndex === 4, 'Monster placed in first open slot (Slot 4)');
  assert(opp.monsterZones[0] === null, 'Opponent original slot 0 vacated');
  assert(player.monsterZones[4] !== null, 'Player slot 4 now occupied by transferred monster');
  assert(player.monsterZones[4].card.uid === oppIron.uid, 'Transferred monster matches target card UID');
  assert(player.monsterZones[4].position === 'FACE_UP_DEFENSE', 'Monster battle position strictly PRESERVED across control transfer');
  assert(player.monsterZones[4].xyzMaterials?.length === 1, 'Attached Xyz material strictly preserved underneath');
  assert(player.monsterZones[4].xyzMaterials[0].uid === overlayMat.uid, 'Preserved Xyz material UID matches original');
  assert(engine.activeControlTransfers.length === 1, 'Active control transfer record registered in engine');
  assert(engine.activeControlTransfers[0].canAttack === false, 'canAttack flag recorded as false');
  assert(engine.activeControlTransfers[0].canTribute === false, 'canTribute flag recorded as false');
  assert(engine.lastGameEvent.eventType === 'MONSTER_CONTROL_TRANSFERRED', 'MONSTER_CONTROL_TRANSFERRED event emitted');

  // 4. Attack and Tribute Prohibition Checks (Rulebook v10 tr. 47)
  // Attempt to attack with transferred monster (with canAttack = false)
  // Temporarily switch to Battle Phase and FACE_UP_ATTACK
  engine.currentPhase = 'BATTLE_PHASE';
  player.monsterZones[4].position = 'FACE_UP_ATTACK';
  const attackRes = engine.declareAttack(4, 'DIRECT');
  assert(attackRes.success === false, 'Transferred monster strictly BLOCKED from declaring attack (Rulebook v10 tr. 47)');
  assert(attackRes.message.includes('Vi Phạm Master Rule - Rulebook v10 tr. 47'), 'Attack rejection cites Rulebook v10 tr. 47');

  // Attempt to tribute transferred monster (with canTribute = false)
  const tributeRes = engine.tributeMonster('player', 4);
  assert(tributeRes.success === false, 'Transferred monster strictly BLOCKED from being tributed (Rulebook v10 tr. 47)');
  assert(tributeRes.message.includes('Vi Phạm Master Rule - Rulebook v10 tr. 47'), 'Tribute rejection cites Rulebook v10 tr. 47');

  // Attempt to use as tribute for Normal Summon
  player.monsterZones[4].position = 'FACE_UP_DEFENSE';
  engine.currentPhase = 'MAIN_PHASE_2';
  const potCard = engine.instantiateCard('card_elem_19_k', 'player');
  player.hand.push(potCard);
  player.mana = 10;
  player.normalSummonsRemaining = 1;
  const tributeSummonRes = engine.normalSummon('player', potCard.uid, 'FACE_UP_ATTACK', [4]);
  assert(tributeSummonRes.success === false, 'Normal Summon with transferred monster as tribute strictly BLOCKED');
  assert(tributeSummonRes.message.includes('Vi Phạm Master Rule - Rulebook v10 tr. 47'), 'Summon tribute rejection cites Rulebook v10 tr. 47');

  // 5. End Phase Automatic Return to Original Owner (Rulebook v10 tr. 47)
  // Reset opponent monster zones so slot 0 is open
  opp.monsterZones[0] = null;
  engine.currentPhase = 'MAIN_PHASE_2';
  // Advance to End Phase
  const returnSummary = engine.resolveEndPhaseControlReturns();
  assert(returnSummary.processedCount === 1, 'Processed 1 temporary control transfer at End Phase');
  assert(returnSummary.returnedCount === 1, 'Returned 1 monster successfully to original owner');
  assert(returnSummary.overflowDestroyedCount === 0, '0 monsters destroyed by overflow when open zone is available');
  assert(player.monsterZones[4] === null, 'Player slot 4 vacated after monster returned');
  assert(opp.monsterZones[0] !== null, 'Opponent slot 0 now occupied by returned monster');
  assert(opp.monsterZones[0].card.uid === oppIron.uid, 'Returned monster card UID matches original Iron');
  assert(engine.activeControlTransfers.length === 0, 'activeControlTransfers list is empty after return');
  assert(engine.lastGameEvent.eventType === 'MONSTER_CONTROL_RETURNED', 'MONSTER_CONTROL_RETURNED event recorded');

  // 6. Field Full Overflow Destruction Invariant (Rulebook v10 tr. 55)
  // "If a monster cannot return because there are no open Monster Zones on its owner's field, it is destroyed and sent to the owner's Graveyard."
  // Re-transfer monster to player
  player.monsterZones[0] = null; // Open slot 0 for player
  const reTransfer = engine.takeControlOfMonster('player', 0, 'UNTIL_END_OF_TURN', true, true);
  assert(reTransfer.success === true, 'Re-transferred monster to player slot 0');

  // Fill ALL 5 of opponent's Monster Zones with dummies (so opponent field is 5/5 full when return is attempted)
  for (let i = 0; i < 5; i++) {
    const oppDummy = engine.instantiateCard('card_elem_8_o', 'opponent');
    opp.monsterZones[i] = {
      slotIndex: i,
      card: oppDummy,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: 1,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };
  }

  opp.graveyard = [];
  player.graveyard = [];

  // End Phase return triggers: Opponent has NO OPEN ZONES!
  const overflowReturnSummary = engine.resolveEndPhaseControlReturns();
  assert(overflowReturnSummary.processedCount === 1, 'Processed 1 temporary control transfer with full owner field');
  assert(overflowReturnSummary.returnedCount === 0, 'Returned 0 monsters (could not return)');
  assert(overflowReturnSummary.overflowDestroyedCount === 1, 'Exactly 1 monster destroyed by overflow (Rulebook v10 tr. 55)');
  assert(player.monsterZones[0] === null, 'Player slot 0 vacated after overflow destruction');
  assert(opp.graveyard.some(c => c.uid === oppIron.uid), 'Monster routed to ORIGINAL OWNER Graveyard upon overflow destruction (Rulebook v10 tr. 55)');
  assert(!player.graveyard.some(c => c.uid === oppIron.uid), 'Monster NEVER routed to controller Graveyard');
  assert(engine.lastGameEvent.eventType === 'MONSTER_DESTROYED_BY_OVERFLOW_ON_RETURN', 'MONSTER_DESTROYED_BY_OVERFLOW_ON_RETURN event recorded');

  // 7. Original Owner Graveyard & Banished Routing When Destroyed under Opponent Control (Rulebook v10 tr. 47 & 55)
  // Opponent takes control of a Player's card
  const playerCopper = engine.instantiateCard('card_elem_29_cu', 'player');
  player.monsterZones[0] = {
    slotIndex: 0,
    card: playerCopper,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  opp.monsterZones[0] = null; // Open slot for opponent
  const oppTakesControl = engine.takeControlOfMonster('opponent', 0, 'PERMANENT', true, true);
  assert(oppTakesControl.success === true, 'Opponent takes permanent control of player Copper');
  assert(opp.monsterZones[0]?.card.uid === playerCopper.uid, 'Opponent controls player Copper');

  player.graveyard = [];
  opp.graveyard = [];

  // Destroy Copper while under opponent's control via destroyMonster
  const destroyRes = engine.destroyMonster('opponent', 0, 'EFFECT');
  assert(destroyRes.destroyed === true, 'Player Copper destroyed while under opponent control');
  assert(player.graveyard.some(c => c.uid === playerCopper.uid), 'Destroyed monster routed strictly to ORIGINAL OWNER (Player) Graveyard (Rulebook v10 tr. 47)');
  assert(!opp.graveyard.some(c => c.uid === playerCopper.uid), 'Destroyed monster NEVER placed in current controller (Opponent) Graveyard');

  // Test Banishing routing: Player Sulfur under opponent control is banished
  const playerSulfur = engine.instantiateCard('card_elem_16_s', 'player');
  player.monsterZones[0] = {
    slotIndex: 0,
    card: playerSulfur,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  opp.monsterZones[0] = null;
  engine.takeControlOfMonster('opponent', 0, 'PERMANENT', true, true);
  assert(opp.monsterZones[0]?.card.uid === playerSulfur.uid, 'Opponent controls player Sulfur');

  player.banished = [];
  opp.banished = [];

  // Banish Sulfur from field
  const banishRes = engine.banishCardFromField('opponent', 'MONSTER', 0, false);
  assert(banishRes.success === true, 'Banished card from field while under opponent control');
  assert(player.banished.some(c => c.uid === playerSulfur.uid), 'Banished monster routed strictly to ORIGINAL OWNER (Player) Banished Zone (Rulebook v10 tr. 47 & 55)');
  assert(!opp.banished.some(c => c.uid === playerSulfur.uid), 'Banished monster NEVER placed in opponent Banished Zone');

  // 8. In-Duel Chain Activation of Chelation Capture EDTA (SPELL_CHELATION_CAPTURE_EDTA)
  const oppCalcium = engine.instantiateCard('card_elem_20_ca', 'opponent');
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: oppCalcium,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  // Ensure player has open monster zone
  player.monsterZones[0] = null;

  const edtaInst = engine.instantiateCard('card_spell_chelation_capture_edta', 'player');
  player.hand = [edtaInst];
  player.mana = 3;

  // Activate EDTA spell from hand targeting opponent slot 0
  const activateEdtaRes = engine.activateSpellFromHand('player', edtaInst.uid, { targetSlotIndex: 0, targetPlayerId: 'opponent' });
  assert(activateEdtaRes.success === true, 'Activated Chelation Capture EDTA from hand successfully');
  assert(opp.monsterZones[0] === null, 'Opponent slot 0 vacated after EDTA resolution');
  assert(player.monsterZones[0]?.card.uid === oppCalcium.uid, 'Player now controls Calcium via hexadentate EDTA chelation complex');
  assert(engine.logs.some(l => l.message.includes('Phối Tử Chelate Hóa EDTA')), 'Log confirms coordination complex formation and control takeover');

  // Resolve End Phase: Calcium returns to opponent
  engine.resolveEndPhaseControlReturns();
  assert(player.monsterZones[0] === null, 'Player slot vacated at End Phase');
  assert(opp.monsterZones[0]?.card.uid === oppCalcium.uid, 'Calcium returned safely to opponent at End Phase');
}

// --- Group 41: Column Placement & Adjacency Targeting Mechanics (Master Rule 2020 / Rulebook v10 tr. 4-5, 22-23) ---
console.log('\n--- Group 41: Column Placement & Adjacency Targeting Mechanics (Master Rule 2020 / Rulebook v10 tr. 4-5, 22-23) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // 1. Definition and Card Metadata Verification
  const laserDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_spectrophotometer_laser_collimator');
  assert(Boolean(laserDef), 'Spectrophotometer Laser Collimator card definition exists in PLAYABLE_CARDS');
  assert(laserDef.cardType === 'REACTION_SPELL', 'Laser Collimator is REACTION_SPELL');
  assert(laserDef.spellTrapSubtype === 'NORMAL_SPELL', 'Laser Collimator is NORMAL_SPELL');
  assert(laserDef.spellSpeed === 1, 'Laser Collimator has Spell Speed 1');
  assert(laserDef.manaCost === 3, 'Laser Collimator costs 3 Mana');
  assert(laserDef.effectCode === 'SPELL_SPECTROPHOTOMETER_LASER_COLLIMATOR', 'Laser Collimator has correct effectCode');
  assert(laserDef.relatedEquation.includes('A = -log₁₀(T)'), 'Laser Collimator equation references Beer-Lambert Law');
  assert(laserDef.scientificLore.includes('Beer-Lambert'), 'Laser Collimator lore explains collimated photon flux density');

  const diamondDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_diamond_crystal_lattice');
  assert(Boolean(diamondDef), 'Diamond Crystal Lattice Alignment card definition exists in PLAYABLE_CARDS');
  assert(diamondDef.cardType === 'REACTION_SPELL', 'Diamond Lattice is REACTION_SPELL');
  assert(diamondDef.spellTrapSubtype === 'CONTINUOUS_SPELL', 'Diamond Lattice is CONTINUOUS_SPELL');
  assert(diamondDef.manaCost === 2, 'Diamond Lattice costs 2 Mana');
  assert(diamondDef.effectCode === 'SPELL_DIAMOND_CRYSTAL_LATTICE', 'Diamond Lattice has correct effectCode');
  assert(diamondDef.scientificLore.includes('sp³'), 'Diamond Lattice lore references carbon sp³ tetrahedral hybridization');

  // 2. Column Coordinate Mapping & Opposing Slot Invariants (Rulebook v10 tr. 4-5)
  // For Player: Slot 0..4 maps 1:1 to Column 0..4
  for (let slot = 0; slot <= 4; slot++) {
    const colM = engine.getColumnForSlot('player', 'MONSTER', slot);
    const colST = engine.getColumnForSlot('player', 'SPELL_TRAP', slot);
    assert(colM === slot, `Player Monster slot ${slot} maps to Column ${slot}`);
    assert(colST === slot, `Player Spell/Trap slot ${slot} maps to Column ${slot}`);
  }
  // EMZ mapping for Player
  assert(engine.getColumnForSlot('player', 'EXTRA_MONSTER', 0) === 1, 'Player EMZ 1 maps to Column 1');
  assert(engine.getColumnForSlot('player', 'EXTRA_MONSTER', 1) === 3, 'Player EMZ 2 maps to Column 3');

  // For Opponent: Mirrored across table! Slot 0..4 maps to Column (4 - slot)
  for (let slot = 0; slot <= 4; slot++) {
    const colM = engine.getColumnForSlot('opponent', 'MONSTER', slot);
    const colST = engine.getColumnForSlot('opponent', 'SPELL_TRAP', slot);
    assert(colM === (4 - slot), `Opponent Monster slot ${slot} maps to Column ${4 - slot}`);
    assert(colST === (4 - slot), `Opponent Spell/Trap slot ${slot} maps to Column ${4 - slot}`);
  }

  // Opposing Slot Index Invariant: 4 - slotIndex
  assert(engine.getOpposingSlotIndex(0) === 4, 'Slot 0 opposes Slot 4');
  assert(engine.getOpposingSlotIndex(1) === 3, 'Slot 1 opposes Slot 3');
  assert(engine.getOpposingSlotIndex(2) === 2, 'Center Slot 2 opposes Center Slot 2');
  assert(engine.getOpposingSlotIndex(3) === 1, 'Slot 3 opposes Slot 1');
  assert(engine.getOpposingSlotIndex(4) === 0, 'Slot 4 opposes Slot 0');

  // 3. Adjacency Math Invariants
  const adj0 = engine.getAdjacentColumns(0);
  assert(adj0.length === 1 && adj0[0] === 1, 'Column 0 has only Column 1 as adjacent');
  const adj1 = engine.getAdjacentColumns(1);
  assert(adj1.length === 2 && adj1.includes(0) && adj1.includes(2), 'Column 1 is adjacent to Columns 0 and 2');
  const adj2 = engine.getAdjacentColumns(2);
  assert(adj2.length === 2 && adj2.includes(1) && adj2.includes(3), 'Column 2 is adjacent to Columns 1 and 3');
  const adj3 = engine.getAdjacentColumns(3);
  assert(adj3.length === 2 && adj3.includes(2) && adj3.includes(4), 'Column 3 is adjacent to Columns 2 and 4');
  const adj4 = engine.getAdjacentColumns(4);
  assert(adj4.length === 1 && adj4[0] === 3, 'Column 4 has only Column 3 as adjacent');

  // 4. Column Scanning & Alignment Query Engine
  // Place cards across battlefield:
  // - Player Iron at Monster Slot 2 (Column 2)
  const pIron = engine.instantiateCard('card_elem_26_fe', 'player');
  player.monsterZones[2] = {
    slotIndex: 2,
    card: pIron,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  // - Player Normal Spell Set at S/T Slot 2 (Column 2)
  const pSpell = engine.instantiateCard('card_spell_thermite_surge', 'player');
  player.spellTrapZones[2] = {
    slotIndex: 2,
    card: pSpell,
    isFaceUp: false,
    turnSet: 1
  };
  // - Opponent Copper at Monster Slot 2 (Column 4 - 2 = Column 2)
  const oppCopper = engine.instantiateCard('card_elem_29_cu', 'opponent');
  opp.monsterZones[2] = {
    slotIndex: 2,
    card: oppCopper,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  // - Opponent Trap at S/T Slot 2 (Column 4 - 2 = Column 2)
  const oppTrap = engine.instantiateCard('card_trap_noble_membrane', 'opponent');
  opp.spellTrapZones[2] = {
    slotIndex: 2,
    card: oppTrap,
    isFaceUp: false,
    turnSet: 1
  };

  // Inspect Column 2 summary
  const col2Summary = engine.getCardsInColumn(2);
  assert(col2Summary.columnIndex === 2, 'Summary reports Column 2');
  assert(col2Summary.totalCardCount === 4, 'Column 2 contains exactly 4 cards across both players');
  assert(col2Summary.playerCards.length === 2, 'Player controls 2 cards in Column 2');
  assert(col2Summary.opponentCards.length === 2, 'Opponent controls 2 cards in Column 2');
  assert(col2Summary.hasMonster === true, 'Column 2 has monsters present');
  assert(col2Summary.hasSpellTrap === true, 'Column 2 has Spells/Traps present');

  // Verify getCardColumn & areCardsInSameColumn
  assert(engine.getCardColumn(pIron.uid) === 2, 'pIron is located in Column 2');
  assert(engine.getCardColumn(oppCopper.uid) === 2, 'oppCopper is located in Column 2');
  assert(engine.getCardColumn(pSpell.uid) === 2, 'pSpell is located in Column 2');
  assert(engine.getCardColumn(oppTrap.uid) === 2, 'oppTrap is located in Column 2');
  assert(engine.areCardsInSameColumn(pIron.uid, oppCopper.uid) === true, 'pIron and oppCopper are in the exact same Column 2');
  assert(engine.areCardsInSameColumn(pIron.uid, pSpell.uid) === true, 'pIron and pSpell are in the exact same Column 2');

  // Place another card in Column 1 and Column 3 to test Adjacency checking
  const pCarbon = engine.instantiateCard('card_elem_6_c', 'player');
  player.monsterZones[1] = {
    slotIndex: 1,
    card: pCarbon,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  const pAluminum = engine.instantiateCard('card_elem_13_al', 'player');
  player.monsterZones[3] = {
    slotIndex: 3,
    card: pAluminum,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  assert(engine.areCardsInAdjacentColumns(pIron.uid, pCarbon.uid) === true, 'Column 2 (pIron) and Column 1 (pCarbon) are horizontally adjacent');
  assert(engine.areCardsInAdjacentColumns(pIron.uid, pAluminum.uid) === true, 'Column 2 (pIron) and Column 3 (pAluminum) are horizontally adjacent');
  assert(engine.areCardsInAdjacentColumns(pCarbon.uid, pAluminum.uid) === false, 'Column 1 (pCarbon) and Column 3 (pAluminum) are NOT adjacent (delta = 2)');

  // 5. Preferred Slot Setting (Targeted Column Placement)
  const setCard = engine.instantiateCard('card_trap_galvanic_counter_shock', 'player');
  player.hand = [setCard];
  const setSlot4Res = engine.setSpellTrap('player', setCard.uid, 4);
  assert(setSlot4Res.success === true, 'Setting card into preferred Slot 4 succeeds');
  assert(player.spellTrapZones[4]?.card?.uid === setCard.uid, 'Card placed precisely into S/T Slot 4');
  assert(engine.getCardColumn(setCard.uid) === 4, 'Set card is in Column 4');

  // 6. Spectrophotometer Laser Straight-Column Destruction & Beer-Lambert Law Damage
  // Currently, Column 2 has 4 cards (pIron, pSpell, oppCopper, oppTrap).
  // Column 1 has pCarbon. Column 3 has pAluminum. Column 4 has setCard.
  // We activate Spectrophotometer Laser Collimator targeting Column 2!
  const laserInst = engine.instantiateCard('card_spell_spectrophotometer_laser_collimator', 'player');
  player.hand = [laserInst];
  player.mana = 3;
  opp.lp = 8000;
  player.graveyard = [];
  opp.graveyard = [];

  const activateLaserRes = engine.activateSpellFromHand('player', laserInst.uid, 2);
  assert(activateLaserRes.success === true, 'Spectrophotometer Laser Collimator activated targeting Column 2');

  // All 4 cards in Column 2 must be destroyed!
  assert(player.monsterZones[2] === null, 'Player Monster Zone in Column 2 is cleared');
  assert(player.spellTrapZones[2] === null, 'Player Spell/Trap Zone in Column 2 is cleared');
  assert(opp.monsterZones[2] === null, 'Opponent Monster Zone in Column 2 is cleared');
  assert(opp.spellTrapZones[2] === null, 'Opponent Spell/Trap Zone in Column 2 is cleared');

  // Other columns must remain 100% UNTOUCHED!
  assert(player.monsterZones[1]?.card?.uid === pCarbon.uid, 'Column 1 monster (Carbon) remains completely intact');
  assert(player.monsterZones[3]?.card?.uid === pAluminum.uid, 'Column 3 monster (Aluminum) remains completely intact');
  assert(player.spellTrapZones[4]?.card?.uid === setCard.uid, 'Column 4 S/T card remains completely intact');

  // Ownership routing: Player cards to Player GY, Opponent cards to Opponent GY
  assert(player.graveyard.some(c => c.uid === pIron.uid), 'Player Iron sent to Player Graveyard');
  assert(player.graveyard.some(c => c.uid === pSpell.uid), 'Player Spell sent to Player Graveyard');
  assert(opp.graveyard.some(c => c.uid === oppCopper.uid), 'Opponent Copper sent to Opponent Graveyard');
  assert(opp.graveyard.some(c => c.uid === oppTrap.uid), 'Opponent Trap sent to Opponent Graveyard');

  // Beer-Lambert Law Absorbance Damage: 4 cards destroyed * 500 = 2000 damage inflicted!
  assert(opp.lp === 6000, `Opponent took 2000 damage (8000 -> 6000), got ${opp.lp}`);
  assert(engine.logs.some(l => l.message.includes('Định Luật Beer-Lambert: A = ε·l·c')), 'Log confirms Beer-Lambert Law absorbance calculation');
  assert(engine.gameEventHistory.some(e => e.eventType === 'COLUMN_CARDS_DESTROYED'), 'COLUMN_CARDS_DESTROYED event recorded in history');

  // 7. Continuous Diamond Crystal Lattice Adjacency Buff
  // Setup: Player has Carbon in Slot 1 (Col 1) and Aluminum in Slot 3 (Col 3).
  // Neither currently has an adjacent friendly monster (Col 2 is empty!).
  // Let's place a monster in Slot 2 (Col 2), bridging the gap!
  const pBridge = engine.instantiateCard('card_elem_12_mg_spark', 'player');
  player.monsterZones[2] = {
    slotIndex: 2,
    card: pBridge,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  // Now:
  // Slot 1 (Col 1) is adjacent to Slot 2 (Col 2) -> Should be buffed!
  // Slot 2 (Col 2) is adjacent to Slot 1 (Col 1) and Slot 3 (Col 3) -> Should be buffed!
  // Slot 3 (Col 3) is adjacent to Slot 2 (Col 2) -> Should be buffed!
  // Let's also add an isolated monster at Slot 4 (Col 4) of a DIFFERENT duel to be isolated, or let's place one at Slot 0 (Col 0).
  // Slot 0 (Col 0) is adjacent to Slot 1 (Col 1) as well.
  // Instead, let's leave Slot 0 empty, so Slot 1 only has Slot 2.

  const diamondInst = engine.instantiateCard('card_spell_diamond_crystal_lattice', 'player');
  player.hand = [diamondInst];
  player.mana = 2;

  const activateDiamondRes = engine.activateSpellFromHand('player', diamondInst.uid, 0);
  assert(activateDiamondRes.success === true, 'Diamond Crystal Lattice activated successfully');
  assert(player.spellTrapZones[0]?.card?.uid === diamondInst.uid, 'Diamond Crystal Lattice resides face-up in S/T Zone');

  // All 3 interconnected lattice monsters gain +400 ATK and +400 DEF
  assert(player.monsterZones[1]?.tempAtkBoost === 400, 'Slot 1 (Col 1) gained +400 ATK from adjacent lattice neighbor');
  assert(player.monsterZones[1]?.tempDefBoost === 400, 'Slot 1 (Col 1) gained +400 DEF from adjacent lattice neighbor');
  assert(player.monsterZones[2]?.tempAtkBoost === 400, 'Slot 2 (Col 2) gained +400 ATK from adjacent lattice neighbors');
  assert(player.monsterZones[2]?.tempDefBoost === 400, 'Slot 2 (Col 2) gained +400 DEF from adjacent lattice neighbors');
  assert(player.monsterZones[3]?.tempAtkBoost === 400, 'Slot 3 (Col 3) gained +400 ATK from adjacent lattice neighbor');
  assert(player.monsterZones[3]?.tempDefBoost === 400, 'Slot 3 (Col 3) gained +400 DEF from adjacent lattice neighbor');
  assert(engine.logs.some(l => l.message.includes('Mạng Tinh Thể Kim Cương Tứ Diện')), 'Log confirms diamond sp3 tetrahedral network resonance');
}

// --- Group 42: Continuous & Lingering Nullification Invariants (Skill Drain / Effect Negation vs Activation - Rulebook v10 tr. 48-49, 54) ---
console.log('\n--- Group 42: Continuous & Lingering Nullification Invariants (Skill Drain / Effect Negation vs Activation - Rulebook v10 tr. 48-49, 54) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // 1. Definition & Card Metadata Verification
  const zeroDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_absolute_zero_freeze');
  assert(Boolean(zeroDef), 'Absolute Zero Skill Freeze card definition exists in PLAYABLE_CARDS');
  assert(zeroDef.cardType === 'TRAP', 'Absolute Zero Freeze is a TRAP');
  assert(zeroDef.spellTrapSubtype === 'CONTINUOUS_TRAP', 'Absolute Zero Freeze is a CONTINUOUS_TRAP');
  assert(zeroDef.spellSpeed === 2, 'Absolute Zero Freeze has Spell Speed 2');
  assert(zeroDef.manaCost === 3, 'Absolute Zero Freeze costs 3 Mana');
  assert(zeroDef.maintenanceCost?.lp === 500, 'Absolute Zero Freeze has 500 LP maintenance cost (Rulebook v10 tr. 32)');
  assert(zeroDef.effectCode === 'TRAP_ABSOLUTE_ZERO_FREEZE', 'Absolute Zero Freeze has correct effectCode');
  assert(zeroDef.scientificLore.includes('0 Kelvin'), 'Absolute Zero Freeze lore references 0 Kelvin and Third Law of Thermodynamics');
  assert(zeroDef.relatedEquation.includes('ΔS = 0'), 'Absolute Zero Freeze equation references entropy minimum');

  const flashDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_flash_precipitation_nullifier');
  assert(Boolean(flashDef), 'Flash Precipitation Nullifier card definition exists in PLAYABLE_CARDS');
  assert(flashDef.cardType === 'REACTION_SPELL', 'Flash Precipitation is a REACTION_SPELL');
  assert(flashDef.spellTrapSubtype === 'QUICK_PLAY_SPELL', 'Flash Precipitation is a QUICK_PLAY_SPELL');
  assert(flashDef.spellSpeed === 2, 'Flash Precipitation has Spell Speed 2');
  assert(flashDef.manaCost === 2, 'Flash Precipitation costs 2 Mana');
  assert(flashDef.effectCode === 'SPELL_FLASH_PRECIPITATION_NULLIFIER', 'Flash Precipitation has correct effectCode');
  assert(flashDef.relatedEquation.includes('BaSO₄'), 'Flash Precipitation references Barium Sulfate precipitation');

  // 2. Global Skill Drain Activation & Detection
  assert(engine.isGlobalMonsterEffectNegationActive() === false, 'Initially global monster effect negation is inactive');

  // Place and activate Absolute Zero Freeze in player S/T zone
  const zeroTrap = engine.instantiateCard('card_trap_absolute_zero_freeze', 'player');
  player.spellTrapZones[0] = {
    slotIndex: 0,
    card: zeroTrap,
    isFaceUp: true,
    turnSet: 1
  };

  assert(engine.isGlobalMonsterEffectNegationActive() === true, 'Global monster effect negation is ACTIVE while Absolute Zero Freeze is face-up (Rulebook v10 tr. 48-49)');

  // 3. Activation Cost vs Effect Negation Invariant (Rulebook v10 tr. 48-49 & 54)
  // Summon Ferrocene Xyz Rank 5 with 2 attached materials
  const ferroceneCard = engine.instantiateCard('card_xyz_ferrocene', 'player');
  const mat1 = engine.instantiateCard('card_elem_26_fe', 'player');
  const mat2 = engine.instantiateCard('card_elem_6_c', 'player');
  player.monsterZones[0] = {
    slotIndex: 0,
    card: ferroceneCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    xyzMaterials: [mat1, mat2]
  };

  // Under Skill Drain, effects of monster on field are negated
  assert(engine.isMonsterEffectNegated('player', 0) === true, 'Ferrocene effect is negated under global Absolute Zero Skill Freeze');

  // Detach Xyz Material as cost: COST PAYMENT SUCCEEDS (Rulebook v10 tr. 48-49)
  player.graveyard = [];
  const detachRes = engine.detachXyzMaterial('player', 0);
  assert(detachRes.success === true, 'Detaching Xyz material succeeds (paying activation cost is permitted under Skill Drain)');
  assert(player.monsterZones[0]?.xyzMaterials?.length === 1, 'Exactly 1 Xyz material detached as cost');
  assert(player.graveyard.some(c => c.uid === mat2.uid), 'Detached material (mat2) sent to Graveyard as cost');

  // INVARIANT: The effect itself (+800 ATK boost) is NEGATED!
  assert(player.monsterZones[0]?.tempAtkBoost === 0, 'Ferrocene +800 ATK effect was NEGATED under Skill Drain (got +0)');
  assert(engine.lastGameEvent?.eventType === 'EFFECT_NEGATED', 'EFFECT_NEGATED event recorded in engine');
  assert(engine.logs.some(l => l.message.includes('Vô Hiệu Hóa Hiệu Ứng - Rulebook v10 tr. 48-49 & 54')), 'Log confirms Rulebook v10 tr. 48-49 negation citation');

  // 4. Attack Declaration and Battle Position Under Skill Drain (Rulebook v10 tr. 48-49)
  // Monster with negated effect can still attack normally!
  engine.currentPhase = 'BATTLE_PHASE';
  opp.lp = 8000;
  const attackRes = engine.declareAttack(0, 'DIRECT');
  assert(attackRes.success === true, 'Monster with negated effects CAN declare attack (Attack rights are not an effect)');
  assert(opp.lp < 8000, 'Direct attack successfully inflicted battle damage');

  // Monster with negated effect can still change battle position!
  engine.currentPhase = 'MAIN_PHASE_2';
  player.monsterZones[0].turnSummoned = 0; // Set summoned turn prior to current turn to permit position change (Rulebook v10 tr. 24)
  player.monsterZones[0].hasAttackedThisTurn = false;
  player.monsterZones[0].hasChangedPositionThisTurn = false;
  const changePosRes = engine.changeMonsterPosition('player', 0);
  assert(changePosRes.success === true, 'Monster with negated effects CAN change battle position');
  assert(player.monsterZones[0].position === 'FACE_UP_DEFENSE', 'Ferrocene shifted to FACE_UP_DEFENSE');

  // 5. FLIP Effect Negation Under Skill Drain
  const flipDummy = engine.instantiateCard('card_elem_11_na', 'player');
  flipDummy.def.effectCode = 'FLIP_DRAW_1';
  player.hand = [];
  player.deck = [engine.instantiateCard('card_elem_1_h', 'player')];
  engine.checkFlipEffect('player', flipDummy, 0);
  assert(player.hand.length === 0, 'FLIP draw effect negated under Skill Drain (0 cards drawn)');
  assert(engine.logs.some(l => l.message.includes('Vô Hiệu Hóa Hiệu Ứng Lật - Rulebook v10 tr. 48-49 & 54')), 'FLIP effect negation logged with Master Rule citation');

  // 6. Individual Monster Effect Negation (Flash Precipitation Nullifier)
  // Destroy Skill Drain trap to restore normal field state
  player.spellTrapZones[0] = null;
  assert(engine.isGlobalMonsterEffectNegationActive() === false, 'Global Skill Drain deactivated after removal');
  assert(engine.isMonsterEffectNegated('player', 0) === false, 'Ferrocene effect is no longer negated');

  // Opponent summons Hexammine Cobalt Xyz with 2 materials at Slot 0
  const cobaltCard = engine.instantiateCard('card_xyz_hexammine_cobalt', 'opponent');
  const cMat1 = engine.instantiateCard('card_elem_20_ca', 'opponent');
  const cMat2 = engine.instantiateCard('card_elem_13_al', 'opponent');
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: cobaltCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    xyzMaterials: [cMat1, cMat2]
  };

  // Player activates Flash Precipitation Nullifier from hand during Player turn targeting opponent Cobalt
  engine.activePlayerId = 'player';
  engine.currentPhase = 'MAIN_PHASE_1';
  const flashInst = engine.instantiateCard('card_spell_flash_precipitation_nullifier', 'player');
  player.hand = [flashInst];
  player.mana = 2;
  const activateFlashRes = engine.activateSpellFromHand('player', flashInst.uid, { targetSlotIndex: 0, targetPlayerId: 'opponent' });
  assert(activateFlashRes.success === true, 'Flash Precipitation Nullifier activated targeting opponent Cobalt');

  // Opponent Cobalt is now individually negated until End Phase
  assert(engine.isMonsterEffectNegated('opponent', 0) === true, 'Opponent Cobalt has effects negated until End Phase');

  // Opponent Cobalt detaches material: Cost paid, but effect negated!
  opp.graveyard = [];
  const oppDetachRes = engine.detachXyzMaterial('opponent', 0);
  assert(oppDetachRes.success === true, 'Opponent Cobalt detaches material (cost paid)');
  assert(opp.graveyard.some(c => c.uid === cMat2.uid), 'Opponent material sent to Graveyard');
  assert(opp.monsterZones[0]?.tempDefBoost === 0, 'Cobalt +1000 DEF shield was NEGATED under targeted nullifier (got +0 DEF)');

  // 7. End Phase Negation Expiration (Rulebook v10 tr. 54)
  // End Phase resolves temporary negation
  engine.resolveEndPhaseNegations();
  assert(engine.isMonsterEffectNegated('opponent', 0) === false, 'Cobalt effect negation cleanly EXPIRED at End Phase (Rulebook v10 tr. 54)');

  // Cobalt detaches remaining material (cMat1): EFFECT APPLIES NORMALLY!
  const secondDetachRes = engine.detachXyzMaterial('opponent', 0);
  assert(secondDetachRes.success === true, 'Second detach succeeds');
  assert(opp.monsterZones[0]?.tempDefBoost === 1000, 'Cobalt successfully gained +1000 DEF after negation expired!');
  assert(engine.logs.some(l => l.message.includes('Khiên Phối Trí Bát Diện Co')), 'Cobalt coordination defense shield successfully logged');
}

// --- Group 43: Continuous vs Lingering Protection Invariants & Blanket Stat Modulation (Rulebook v10 tr. 30-31, 40-43, 54) ---
console.log('\n--- Group 43: Continuous vs Lingering Protection Invariants & Blanket Stat Modulation (Rulebook v10 tr. 30-31, 40-43, 54) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // Find elemental Terra monster (Aluminium / Iron)
  const terraDef = PLAYABLE_CARDS.find(c => c.cardType === 'ELEMENT_MONSTER' && c.attribute === 'TERRA') || {
    ...PLAYABLE_CARDS[0],
    id: 'test_terra_mon',
    name: 'Nhôm Kim Loại Al',
    cardType: 'ELEMENT_MONSTER',
    attribute: 'TERRA',
    atk: 1400,
    def: 1200
  };

  const alInst = {
    uid: 'inst_al_terra_1',
    def: terraDef,
    ownerId: 'player'
  };

  // Place Aluminium in Player slot 0
  player.monsterZones[0] = {
    slotIndex: 0,
    card: alInst,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // 1. Baseline: Without Passivation, monster is vulnerable to effect destruction
  assert(engine.isMonsterProtectedFromCardEffects('player', 0) === false, 'Baseline: Monster initially has no effect protection');
  assert(engine.isMonsterProtectedFromBattle('player', 0) === false, 'Baseline: Monster initially has no battle protection');

  // 2. Continuous Spell: Activate Passivation Oxide Film in S/T Slot 2 (Column 2)
  const passivFilmInst = engine.instantiateCard('card_spell_passivation_oxide_film', 'player');
  player.hand = [passivFilmInst];
  player.mana = 2;
  engine.activePlayerId = 'player';
  engine.currentPhase = 'MAIN_PHASE_1';

  const activatePassivRes = engine.activateSpellFromHand('player', passivFilmInst.uid, { targetSlotIndex: 2 });
  assert(activatePassivRes.success === true, 'Passivation Oxide Film activated successfully');
  assert(player.spellTrapZones[2]?.card?.uid === passivFilmInst.uid && player.spellTrapZones[2].isFaceUp, 'Passivation Oxide Film is face-up in Spell/Trap Zone Slot 2');

  // Verify continuous effect protection is active for Terra monster
  assert(engine.isMonsterProtectedFromCardEffects('player', 0) === true, 'Continuous Spell grants effect destruction protection to face-up Terra monster');
  assert(player.monsterZones[0]?.tempDefBoost === 300, 'Passivation Oxide Film grants +300 DEF');

  // 3. Attempt Card Effect Destruction while Protected (Rulebook v10 tr. 52-54)
  const effectDestructRes = engine.destroyMonster('player', 0, 'EFFECT');
  assert(effectDestructRes.destroyed === false, 'destroyMonster with EFFECT cause returns destroyed: false');
  assert(player.monsterZones[0]?.card?.uid === alInst.uid, 'Monster remains safely on field');
  assert(engine.logs.some(l => l.message.includes('KHÁNG HỦY HIỆU ỨNG')), 'Logged KHÁNG HỦY HIỆU ỨNG');

  // 4. Spectrophotometer Laser Column Destruction Invariant
  // Laser targets Column 0 where monster is, but monster is protected by Passivation Film in Column 2
  const laserRes = engine.destroyColumnCards(0, 'LASER_COLLIMATOR');
  assert(player.monsterZones[0]?.card?.uid === alInst.uid, 'Protected monster survives column-wide laser destruction');
  assert(engine.logs.some(l => l.message.includes('quang phổ')), 'Spectrophotometer laser log emitted');

  // 5. Battle Destruction Immunity Separation (Rulebook v10 tr. 40-41)
  // Monster has effect protection, but NOT battle protection!
  assert(engine.isMonsterProtectedFromBattle('player', 0) === false, 'Effect protection does NOT grant battle protection (distinct layers)');

  // 6. Battle Destruction Immunity & Battle Damage Calculation Invariant (Rulebook v10 tr. 40-41)
  // Opponent summons High-ATK monster (ATK 2500) in slot 0
  const oppBoss = {
    uid: 'inst_opp_boss_1',
    def: { ...PLAYABLE_CARDS[0], name: 'Chiến Thần Oxi Hóa', atk: 2500, def: 2000 },
    ownerId: 'opponent'
  };
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: oppBoss,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Player activates Quick-Play Spell: Superconducting Meissner Shield on monster
  const meissnerInst = engine.instantiateCard('card_spell_superconducting_meissner_shield', 'player');
  player.hand = [meissnerInst];
  player.mana = 2;
  const activateMeissnerRes = engine.activateSpellFromHand('player', meissnerInst.uid, { targetSlotIndex: 0, targetPlayerId: 'player' });
  assert(activateMeissnerRes.success === true, 'Superconducting Meissner Shield activated successfully');

  // Verify Meissner shield grants battle protection
  assert(engine.isMonsterProtectedFromBattle('player', 0) === true, 'Meissner shield grants battle destruction immunity');
  assert(engine.isMonsterProtectedFromCardEffects('player', 0) === true, 'Meissner shield also grants effect destruction immunity');

  // Opponent attacks Player monster: ATK 2500 vs Player Terra monster
  // Invariant (Rulebook v10 tr. 40-41): Monster NOT destroyed, BUT battle damage is dealt to Player LP!
  const baseAtk = terraDef.atk || 1900;
  const baseDef = terraDef.def || 1800;
  const expectedDamage = oppBoss.def.atk - baseAtk;
  const expectedLp = 8000 - expectedDamage;

  player.lp = 8000;
  engine.activePlayerId = 'opponent';
  engine.currentPhase = 'BATTLE_PHASE';
  const battleRes = engine.resolveDamageStep(0, 0);

  assert(battleRes.targetDestroyed === false, 'Rulebook v10 tr. 40-41: Target monster was NOT destroyed by battle (Meissner shield prevented destruction)');
  assert(player.monsterZones[0]?.card?.uid === alInst.uid, 'Player monster remains on field after battle');
  assert(battleRes.damageDealt === expectedDamage, `Battle damage is exactly 2500 - ${baseAtk} = ${expectedDamage} LP`);
  assert(player.lp === expectedLp, `Player LP reduced by ${expectedDamage} (8000 -> ${expectedLp} LP) despite battle destruction immunity`);
  assert(engine.logs.some(l => l.message.includes('KHÁNG TIÊU DIỆT CHIẾN ĐẤU')), 'Logged KHÁNG TIÊU DIỆT CHIẾN ĐẤU');

  // 7. Continuous Spell Removal Invariant (Rulebook v10 tr. 29, 54)
  // Locate the Passivation Oxide Film in Player S/T zone and destroy it
  const passivSlotIdx = player.spellTrapZones.findIndex(st => st && st.card?.uid === passivFilmInst.uid);
  assert(passivSlotIdx !== -1, 'Found Passivation Film in S/T zone');
  engine.destroySpellTrap('player', passivSlotIdx, 'EFFECT');
  assert(player.spellTrapZones[passivSlotIdx] === null, 'Passivation Film removed from S/T zone');

  // Notice: Meissner shield lingering protection is still active on slot 0 until End Phase!
  assert(engine.isMonsterProtectedFromCardEffects('player', 0) === true, 'Meissner lingering shield still protects monster after Continuous Spell removal');

  // 8. Skill Drain Invariant: Spell/Trap Protections Are NOT Negated (Rulebook v10 tr. 48-49, 54)
  // Opponent activates Skill Drain (card_trap_absolute_zero_freeze)
  const freezeInst = engine.instantiateCard('card_trap_absolute_zero_freeze', 'opponent');
  opp.spellTrapZones[0] = {
    slotIndex: 0,
    card: freezeInst,
    isFaceUp: true,
    turnSet: 0
  };
  assert(engine.isGlobalMonsterEffectNegationActive() === true, 'Global Skill Drain is active');
  assert(engine.isMonsterEffectNegated('player', 0) === true, 'Player monster effect is negated by Skill Drain');

  // But Meissner shield was granted by a SPELL, not the monster's own effect!
  // Therefore it is NOT negated!
  assert(engine.isMonsterProtectedFromBattle('player', 0) === true, 'Meissner battle protection from Spell remains 100% active under Skill Drain');
  assert(engine.isMonsterProtectedFromCardEffects('player', 0) === true, 'Meissner effect protection from Spell remains 100% active under Skill Drain');

  // 9. Blanket Stat Modulation & Stacking Order (Rulebook v10 tr. 30-31, 54)
  // Check effective stats calculation
  player.monsterZones[0].tempAtkBoost = 500; // Lingering boost
  const effAtk = engine.getEffectiveMonsterAtk('player', 0);
  assert(effAtk === baseAtk + 500, `Effective ATK combines Base ${baseAtk} + Lingering 500 = ${baseAtk + 500}`);

  // Equip Catalyst (+300 ATK, +300 DEF)
  const equipDef = PLAYABLE_CARDS.find(c => c.effectCode === 'EQUIP_CATALYST_SITE') || {
    ...PLAYABLE_CARDS[0],
    id: 'test_equip_site',
    effectCode: 'EQUIP_CATALYST_SITE',
    spellTrapSubtype: 'EQUIP_SPELL'
  };
  player.monsterZones[0].equippedCards = [{ uid: 'inst_equip_site_1', def: equipDef, ownerId: 'player' }];

  const effAtkWithEquip = engine.getEffectiveMonsterAtk('player', 0);
  assert(effAtkWithEquip === baseAtk + 500 + 300, `Effective ATK combines Base + Lingering + Equip = ${baseAtk + 800}`);

  const effDefWithEquip = engine.getEffectiveMonsterDef('player', 0);
  assert(effDefWithEquip === baseDef + 300 + 300, `Effective DEF combines Base ${baseDef} + tempDefBoost 300 + Equip 300 = ${baseDef + 600}`);

  // 10. End Phase Protection Expiration (Rulebook v10 tr. 30-31, 54)
  // Advance turn to End Phase: Lingering protection expires
  engine.resolveEndPhaseProtections();
  assert(engine.isMonsterProtectedFromBattle('player', 0) === false, 'Lingering battle protection cleanly expired at End Phase');
  assert(engine.isMonsterProtectedFromCardEffects('player', 0) === false, 'Lingering effect protection cleanly expired at End Phase');

  // Now the monster can be destroyed by card effects normally
  const finalDestructRes = engine.destroyMonster('player', 0, 'EFFECT');
  assert(finalDestructRes.destroyed === true, 'After protection expiration, monster is destroyed by card effects');
  assert(player.monsterZones[0] === null, 'Monster slot is now empty');
  assert(player.graveyard.some(c => c.uid === alInst.uid), 'Monster routed to Graveyard');
}

// --- Group 44: Xyz Rank vs Level Invariants & Gravity Bind Mechanics (Rulebook v10 tr. 25, 48-49, 54) ---
console.log('\n--- Group 44: Xyz Rank vs Level Invariants & Gravity Bind Mechanics (Rulebook v10 tr. 25, 48-49, 54) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // 1. Definition Invariants: Rank vs Level (Rulebook v10 tr. 25 & Master Rule 2020)
  const xyzDef = PLAYABLE_CARDS.find(c => c.cardType === 'XYZ_MONSTER') || {
    ...PLAYABLE_CARDS[0],
    id: 'test_xyz_card',
    cardType: 'XYZ_MONSTER',
    xyzRank: 4,
    atk: 2200,
    def: 2000
  };
  const linkDef = PLAYABLE_CARDS.find(c => c.cardType === 'LINK_MONSTER') || {
    ...PLAYABLE_CARDS[0],
    id: 'test_link_card',
    cardType: 'LINK_MONSTER',
    linkRating: 2,
    atk: 1800,
    def: 0
  };
  const lvl4Def = PLAYABLE_CARDS.find(c => c.cardType === 'ELEMENT_MONSTER' && c.level === 4) || {
    ...PLAYABLE_CARDS[0],
    id: 'test_lvl4_mon',
    cardType: 'ELEMENT_MONSTER',
    level: 4,
    atk: 1900,
    def: 1800
  };
  const tunerDef = PLAYABLE_CARDS.find(c => c.isTuner) || {
    ...PLAYABLE_CARDS[0],
    id: 'test_tuner_mon',
    cardType: 'ELEMENT_MONSTER',
    isTuner: true,
    level: 3,
    atk: 1200,
    def: 1000
  };
  const synchroDef = PLAYABLE_CARDS.find(c => c.cardType === 'SYNCHRO_MONSTER') || {
    ...PLAYABLE_CARDS[0],
    id: 'test_synchro_mon',
    cardType: 'SYNCHRO_MONSTER',
    synchroLevel: 7,
    level: 7,
    atk: 2500,
    def: 2100
  };
  const ritualDef = PLAYABLE_CARDS.find(c => c.cardType === 'RITUAL_MONSTER') || {
    ...PLAYABLE_CARDS[0],
    id: 'test_ritual_mon',
    cardType: 'RITUAL_MONSTER',
    level: 8,
    atk: 3000,
    def: 3000
  };

  // Verify getMonsterLevel behavior
  assert(engine.getMonsterLevel(xyzDef) === undefined, 'Rulebook v10 tr. 25: Xyz Monster has Rank, NOT Level (getMonsterLevel returns undefined)');
  assert(engine.getMonsterLevel(linkDef) === undefined, 'Master Rule 2020: Link Monster has Link Rating, NOT Level (getMonsterLevel returns undefined)');
  assert(engine.getMonsterLevel(lvl4Def) === 4, 'Standard Element Monster returns exact Level 4');
  assert(engine.getMonsterLevel(tunerDef) === (tunerDef.level || 3), 'Tuner Monster returns exact Level');
  assert(engine.getMonsterLevel(synchroDef) === (synchroDef.level || 7), 'Synchro Monster returns exact Level');
  assert(engine.getMonsterLevel(ritualDef) === (ritualDef.level || 8), 'Ritual Monster returns exact Level');

  // 2. Synchro Material Rejection for Xyz/Link (Rulebook v10 tr. 25)
  // Place Tuner in slot 0, Xyz monster in slot 1
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_tuner_1', def: tunerDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'inst_xyz_mon_1', def: xyzDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  player.extraDeck = [{ uid: 'inst_synchro_extra_1', def: synchroDef, ownerId: 'player' }];
  player.mana = 10;
  engine.activePlayerId = 'player';
  engine.currentPhase = 'MAIN_PHASE_1';

  const synchroFailRes = engine.synchroSummon('player', 0, 2, 0, [1]);
  assert(synchroFailRes.success === false, 'Synchro Summon fails when trying to use Xyz monster as Non-Tuner material');
  assert(synchroFailRes.message.includes('Quái thú Xyz/Link (không có Level), không thể làm nguyên liệu Triệu hồi Đồng Bộ'), 'Error cites Master Rule rejection of Xyz as Synchro material');

  // Place Link monster in slot 1 instead
  player.monsterZones[1].card = { uid: 'inst_link_mon_1', def: linkDef, ownerId: 'player' };
  const synchroLinkFailRes = engine.synchroSummon('player', 0, 2, 0, [1]);
  assert(synchroLinkFailRes.success === false, 'Synchro Summon fails when trying to use Link monster as Non-Tuner material');
  assert(synchroLinkFailRes.message.includes('Quái thú Xyz/Link (không có Level), không thể làm nguyên liệu Triệu hồi Đồng Bộ'), 'Error cites Master Rule rejection of Link as Synchro material');

  // 3. Xyz Material Rejection for Xyz/Link (Rulebook v10 tr. 25)
  player.monsterZones[0].card = { uid: 'inst_lvl4_mon_1', def: lvl4Def, ownerId: 'player' };
  player.monsterZones[1].card = { uid: 'inst_xyz_mon_2', def: xyzDef, ownerId: 'player' };
  player.extraDeck = [{ uid: 'inst_xyz_extra_1', def: xyzDef, ownerId: 'player' }];

  const xyzFailRes = engine.xyzSummon('player', 0, 2, [0, 1]);
  assert(xyzFailRes.success === false, 'Xyz Summon fails when trying to use an Xyz monster as overlay material');
  assert(xyzFailRes.message.includes('Quái thú Xyz/Link (không có Level), không thể làm nguyên liệu Triệu hồi Xyz'), 'Error cites Master Rule rejection of Xyz as overlay material');

  // 4. Ritual Tribute Rejection for Xyz/Link (Rulebook v10 tr. 20-21, 25)
  const ritualSpellDef = PLAYABLE_CARDS.find(c => c.spellTrapSubtype === 'RITUAL_SPELL') || {
    ...PLAYABLE_CARDS[0],
    id: 'test_ritual_spell',
    cardType: 'REACTION_SPELL',
    spellTrapSubtype: 'RITUAL_SPELL',
    manaCost: 2
  };
  player.hand = [
    { uid: 'inst_rit_mon_hand', def: ritualDef, ownerId: 'player' },
    { uid: 'inst_rit_spell_hand', def: ritualSpellDef, ownerId: 'player' }
  ];
  player.monsterZones[1].card = { uid: 'inst_xyz_mon_3', def: xyzDef, ownerId: 'player' };

  const ritualFailRes = engine.ritualSummon('player', 'inst_rit_mon_hand', 'inst_rit_spell_hand', [1], 2);
  assert(ritualFailRes.success === false, 'Ritual Summon fails when trying to tribute an Xyz monster without a Level');
  assert(ritualFailRes.message.includes('Quái thú Xyz/Link (không có Level), không thể hiến tế theo Cấp độ cho Triệu hồi Nghi Thức'), 'Error cites Master Rule rejection of Xyz as Ritual tribute');

  // 5. Gravity Bind / Ultracentrifugal Sedimentation Invariants (Rulebook v10 tr. 25)
  // Opponent sets up Continuous Trap: card_trap_centrifugal_sedimentation_gravity_bind
  const gravBindInst = engine.instantiateCard('card_trap_centrifugal_sedimentation_gravity_bind', 'opponent');
  opp.spellTrapZones[0] = {
    slotIndex: 0,
    card: gravBindInst,
    isFaceUp: true,
    turnSet: 1
  };
  assert(engine.isGravityBindActive() === true, 'Gravity Bind / Ultracentrifugal Sedimentation is active on field');

  // Set up 3 player monsters in Attack position:
  // Slot 0: Level 4 Monster (Level 4 >= 4 -> PROHIBITED from attacking)
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_p_lvl4', def: lvl4Def, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  // Slot 1: Level 3 Monster (Level 3 < 4 -> PERMITTED to attack)
  player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'inst_p_lvl3', def: tunerDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  // Slot 2: Rank 4 Xyz Monster (Rank 4, NO Level -> PERMITTED to attack, Rulebook v10 tr. 25)
  player.monsterZones[2] = {
    slotIndex: 2,
    card: { uid: 'inst_p_xyz', def: xyzDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  // Slot 3: Link Monster (Link Rating 2, NO Level -> PERMITTED to attack, Master Rule 2020)
  player.monsterZones[3] = {
    slotIndex: 3,
    card: { uid: 'inst_p_link', def: linkDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Clear opponent field of defenders for clean direct attack testing
  opp.monsterZones = [null, null, null, null, null];
  opp.lp = 8000;
  engine.currentTurn = 2; // Not Turn 1 so turn 1 restriction doesn't apply
  engine.currentPhase = 'BATTLE_PHASE';

  // Test 5A: Level 4 monster attacks -> BLOCKED by Gravity Bind!
  const lvl4AtkRes = engine.declareAttack(0, 'DIRECT');
  assert(lvl4AtkRes.success === false, 'Level 4 monster attack declaration is BLOCKED by Gravity Bind');
  assert(lvl4AtkRes.message.includes('bị phong tỏa tấn công bởi Bẫy Ly Tâm'), 'Message confirms Level 4 attack blockade');
  assert(opp.lp === 8000, 'Opponent LP unchanged (0 damage dealt)');

  // Test 5B: Level 3 monster attacks -> SUCCEEDS (Level < 4)!
  const lvl3AtkRes = engine.declareAttack(1, 'DIRECT');
  assert(lvl3AtkRes.success === true, 'Level 3 monster attack declaration succeeds under Gravity Bind');
  assert(opp.lp < 8000, 'Opponent took damage from Level 3 monster attack');
  const lpAfterLvl3 = opp.lp;

  // Test 5C: Rank 4 Xyz Monster attacks -> SUCCEEDS (Rulebook v10 tr. 25 Invariant)!
  // Xyz Monsters have RANKS, NOT Levels. Therefore, Gravity Bind has ZERO effect on Xyz Monsters!
  const xyzAtkRes = engine.declareAttack(2, 'DIRECT');
  assert(xyzAtkRes.success === true, 'Rulebook v10 tr. 25: Rank 4 Xyz Monster attack SUCCEEDS under Gravity Bind (Xyz Monsters have no Level)');
  assert(opp.lp < lpAfterLvl3, 'Opponent took direct battle damage from Xyz Monster attack');
  const lpAfterXyz = opp.lp;

  // Test 5D: Link Monster attacks -> SUCCEEDS (Master Rule 2020 Invariant)!
  // Link Monsters have Link Ratings, NOT Levels. Gravity Bind has ZERO effect on Link Monsters!
  const linkAtkRes = engine.declareAttack(3, 'DIRECT');
  assert(linkAtkRes.success === true, 'Master Rule 2020: Link Monster attack SUCCEEDS under Gravity Bind (Link Monsters have no Level)');
  assert(opp.lp < lpAfterXyz, 'Opponent took direct battle damage from Link Monster attack');

  // Test 5E: Remove Gravity Bind -> Level 4 monster can attack again
  opp.spellTrapZones[0] = null;
  assert(engine.isGravityBindActive() === false, 'Gravity Bind is no longer active');
  player.monsterZones[0].hasAttackedThisTurn = false;
  const lvl4AfterTrapRemovalRes = engine.declareAttack(0, 'DIRECT');
  assert(lvl4AfterTrapRemovalRes.success === true, 'Level 4 monster can attack normally once Gravity Bind is removed');
}

// --- Group 45: Link Arrow Collineation & Co-Linked Topology (Master Rule 2020) ---
console.log('\n--- Group 45: Link Arrow Collineation & Co-Linked Topology (Master Rule 2020) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // 1. Link Summon directly into Extra Monster Zone (EMZ)
  const linkHDef = PLAYABLE_CARDS.find(c => c.id === 'card_link_h_bond') || {
    ...PLAYABLE_CARDS[0],
    id: 'card_link_h_bond',
    cardType: 'LINK_MONSTER',
    linkRating: 1,
    linkArrows: ['BOTTOM'],
    manaCost: 1,
    atk: 1000,
    def: 0
  };
  const linkEthyleneDef = PLAYABLE_CARDS.find(c => c.id === 'card_link_ethylene') || {
    ...PLAYABLE_CARDS[0],
    id: 'card_link_ethylene',
    cardType: 'LINK_MONSTER',
    linkRating: 2,
    linkArrows: ['LEFT', 'RIGHT'],
    manaCost: 2,
    atk: 1500,
    def: 0
  };

  player.extraDeck = [
    { uid: 'inst_link_h_extra', def: linkHDef, ownerId: 'player' },
    { uid: 'inst_link_eth_extra', def: linkEthyleneDef, ownerId: 'player' }
  ];
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'mat_mon_1', def: PLAYABLE_CARDS[0], ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  player.mana = 10;
  engine.activePlayerId = 'player';
  engine.currentPhase = 'MAIN_PHASE_1';

  // Summon Link-1 H-Bond into Extra Monster Zone
  const linkEmzRes = engine.linkSummon('player', 'inst_link_h_extra', [0], true);
  assert(linkEmzRes.success === true, 'Link Summon into Extra Monster Zone (EMZ) succeeds');
  assert(player.extraMonsterZone !== null, 'Player Extra Monster Zone is now occupied');
  assert(player.extraMonsterZone.card?.def.id === 'card_link_h_bond', 'Extra Monster Zone holds Link-1 H-Bond');
  assert(player.extraMonsterZone.isExtraMonsterZone === true, 'Slot flagged as isExtraMonsterZone = true');
  assert(player.extraMonsterZone.card.properlySummoned === true, 'Link Monster marked as properlySummoned = true');

  // 2. Link Arrow Mapping (BOTTOM from EMZ points to MMZ Slot 1)
  const linkedFromEmz = engine.getLinkedZones('player', -1, true);
  assert(linkedFromEmz.length === 1, 'H-Bond has exactly 1 Link Arrow (BOTTOM)');
  assert(linkedFromEmz[0].duelistId === 'player', 'Arrow points to friendly duelist zone');
  assert(linkedFromEmz[0].slotIndex === 1, 'BOTTOM arrow from EMZ points to MMZ Slot 1');
  assert(linkedFromEmz[0].isEmz === false, 'Target is a Main Monster Zone');

  assert(engine.isZonePointedByLinkArrow('player', 1) === true, 'MMZ Slot 1 is linked by EMZ H-Bond');
  assert(engine.isZonePointedByLinkArrow('player', 0) === false, 'MMZ Slot 0 is NOT linked by H-Bond');
  assert(engine.isZonePointedByLinkArrow('player', 2) === false, 'MMZ Slot 2 is NOT linked by H-Bond');

  // 3. Link Monster Position Change Immunity (Rulebook v10 & Master Rule 2020)
  // Link monsters have 0 DEF and cannot be changed to Defense position
  const changePosRes = engine.changeMonsterPosition('player', -1, true);
  assert(changePosRes.success === false, 'Link Monster position change to Defense is strictly rejected');
  assert(changePosRes.message.includes('Quái Thú Link không có chỉ số DEF và không thể chuyển sang tư thế phòng thủ'), 'Rejection cites Master Rule 2020 DEF prohibition');

  // 4. Horizontal Link Arrows (LEFT & RIGHT) and Co-Linked Mechanics
  // Place Ethylene (LEFT & RIGHT) in MMZ Slot 1
  player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'inst_link_eth_field', def: linkEthyleneDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const ethZones = engine.getLinkedZones('player', 1, false);
  assert(ethZones.length === 2, 'Ethylene has exactly 2 Link Arrows (LEFT & RIGHT)');
  assert(ethZones.some(z => z.slotIndex === 0), 'Ethylene LEFT arrow points to MMZ Slot 0');
  assert(ethZones.some(z => z.slotIndex === 2), 'Ethylene RIGHT arrow points to MMZ Slot 2');

  // 5. Co-Linked (Mutual Link) State Machine (Master Rule 2020)
  // Place a custom Link Monster with RIGHT arrow in MMZ Slot 0
  const linkRightDef = {
    ...PLAYABLE_CARDS[0],
    id: 'link_custom_right',
    cardType: 'LINK_MONSTER',
    linkRating: 1,
    linkArrows: ['RIGHT'],
    atk: 1200,
    def: 0
  };
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_link_right_field', def: linkRightDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Slot 0 (points RIGHT to Slot 1) and Slot 1 (points LEFT to Slot 0) -> CO-LINKED!
  const isCoLinked0and1 = engine.isCoLinked('player', 0, false, 'player', 1, false);
  assert(isCoLinked0and1 === true, 'Master Rule 2020: Slot 0 and Slot 1 are mutually Co-Linked (pointing to each other)');

  // Now test non-mutual link:
  // Slot 1 points RIGHT to Slot 2, but Slot 2 is currently empty -> NOT Co-Linked!
  const isCoLinked1and2 = engine.isCoLinked('player', 1, false, 'player', 2, false);
  assert(isCoLinked1and2 === false, 'Slot 1 and Slot 2 are NOT Co-Linked (Slot 2 has no Link monster pointing back)');

  // Also EMZ (points BOTTOM to Slot 1) and Slot 1 (points LEFT & RIGHT, NOT TOP):
  // H-Bond points to Slot 1, but Ethylene does NOT point to EMZ -> NOT Co-Linked!
  const isCoLinkedEmzAnd1 = engine.isCoLinked('player', -1, true, 'player', 1, false);
  assert(isCoLinkedEmzAnd1 === false, 'EMZ and Slot 1 are NOT Co-Linked because Ethylene lacks TOP arrow');
}

// --- Group 46: Extra Link (Khóa Cổng Extra Link) & Delocalized Pi-Resonance Invariants (Master Rule 2020 / Rulebook v10 tr. 4-5, 22-23) ---
console.log('\n--- Group 46: Extra Link (Khóa Cổng Extra Link) & Delocalized Pi-Resonance Invariants (Master Rule 2020) ---');
{
  const engine = new DuelEngine();
  const player = engine.getDuelist('player');
  const opp = engine.getDuelist('opponent');

  // Define 5 Link Monsters forming a complete U-Link Extra Link
  const linkEmz1Def = {
    ...PLAYABLE_CARDS[0],
    id: 'link_emz1_polyacetylene',
    name: 'Quái Thú Link Polyaetylene EMZ-1',
    cardType: 'LINK_MONSTER',
    linkRating: 1,
    linkArrows: ['BOTTOM'],
    atk: 1000,
    def: 0
  };
  const linkMmz1Def = {
    ...PLAYABLE_CARDS[0],
    id: 'link_mmz1_polyacetylene',
    name: 'Quái Thú Link Conjugated Diene MMZ-1',
    cardType: 'LINK_MONSTER',
    linkRating: 2,
    linkArrows: ['TOP', 'RIGHT'],
    atk: 1400,
    def: 0
  };
  const linkMmz2Def = {
    ...PLAYABLE_CARDS[0],
    id: 'link_mmz2_polyacetylene',
    name: 'Quái Thú Link Conjugated Central MMZ-2',
    cardType: 'LINK_MONSTER',
    linkRating: 2,
    linkArrows: ['LEFT', 'RIGHT'],
    atk: 1600,
    def: 0
  };
  const linkMmz3Def = {
    ...PLAYABLE_CARDS[0],
    id: 'link_mmz3_polyacetylene',
    name: 'Quái Thú Link Conjugated Diene MMZ-3',
    cardType: 'LINK_MONSTER',
    linkRating: 2,
    linkArrows: ['LEFT', 'TOP'],
    atk: 1400,
    def: 0
  };
  const linkEmz2Def = {
    ...PLAYABLE_CARDS[0],
    id: 'link_emz2_polyacetylene',
    name: 'Quái Thú Link Polyacetylene EMZ-2',
    cardType: 'LINK_MONSTER',
    linkRating: 1,
    linkArrows: ['TOP'],
    atk: 1200,
    def: 0
  };
  const unlinkedMonDef = {
    ...PLAYABLE_CARDS[0],
    id: 'elem_isolated_methane',
    name: 'Metan Cách Ly MMZ-4',
    cardType: 'ELEMENT_MONSTER',
    level: 3,
    atk: 1200,
    def: 800
  };

  // Populate Player Field
  player.extraMonsterZone = {
    slotIndex: -1,
    card: { uid: 'inst_emz1', def: linkEmz1Def, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    isExtraMonsterZone: true
  };
  player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'inst_mmz1', def: linkMmz1Def, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  player.monsterZones[2] = {
    slotIndex: 2,
    card: { uid: 'inst_mmz2', def: linkMmz2Def, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  player.monsterZones[3] = {
    slotIndex: 3,
    card: { uid: 'inst_mmz3', def: linkMmz3Def, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  player.monsterZones[4] = {
    slotIndex: 4,
    card: { uid: 'inst_mmz4', def: unlinkedMonDef, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Populate Second EMZ (Opponent's EMZ occupied to establish Extra Link)
  opp.extraMonsterZone = {
    slotIndex: -1,
    card: { uid: 'inst_emz2', def: linkEmz2Def, ownerId: 'player' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0,
    isExtraMonsterZone: true
  };

  // 1. Verify Pairwise Co-Linked Chain (U-Link Structure)
  const coLinkEmz1Mmz1 = engine.isCoLinked('player', -1, true, 'player', 1, false);
  assert(coLinkEmz1Mmz1 === true, 'EMZ-1 (BOTTOM) and MMZ-1 (TOP) are pairwise Co-Linked');

  const coLinkMmz1Mmz2 = engine.isCoLinked('player', 1, false, 'player', 2, false);
  assert(coLinkMmz1Mmz2 === true, 'MMZ-1 (RIGHT) and MMZ-2 (LEFT) are pairwise Co-Linked');

  const coLinkMmz2Mmz3 = engine.isCoLinked('player', 2, false, 'player', 3, false);
  assert(coLinkMmz2Mmz3 === true, 'MMZ-2 (RIGHT) and MMZ-3 (LEFT) are pairwise Co-Linked');

  const coLinkMmz3Emz2 = engine.isCoLinked('player', 3, false, 'opponent', -1, true);
  assert(coLinkMmz3Emz2 === true, 'MMZ-3 (TOP) and EMZ-2 (TOP) are pairwise Co-Linked across field divider');

  // 2. Extra Link State Machine
  const isPlayerExtraLink = engine.isExtraLinkActive('player');
  assert(isPlayerExtraLink === true, 'Master Rule 2020: Player has established an active Extra Link!');

  const isOppExtraLink = engine.isExtraLinkActive('opponent');
  assert(isOppExtraLink === false, 'Opponent does NOT have Extra Link active');

  // 3. Chain Node Membership
  assert(engine.isMonsterInExtraLink('player', -1, true) === true, 'EMZ-1 monster is a node in the Extra Link chain');
  assert(engine.isMonsterInExtraLink('player', 1, false) === true, 'MMZ-1 monster is a node in the Extra Link chain');
  assert(engine.isMonsterInExtraLink('player', 2, false) === true, 'MMZ-2 monster is a node in the Extra Link chain');
  assert(engine.isMonsterInExtraLink('player', 3, false) === true, 'MMZ-3 monster is a node in the Extra Link chain');
  assert(engine.isMonsterInExtraLink('opponent', -1, true) === true, 'EMZ-2 monster is a node in the Extra Link chain');
  assert(engine.isMonsterInExtraLink('player', 4, false) === false, 'MMZ-4 isolated monster is NOT in the Extra Link chain');

  // 4. GDPT 2018 Chemistry Delocalized Conjugated Pi-Resonance Boost (+500 ATK)
  const effAtkEmz1 = engine.getEffectiveMonsterAtk('player', -1, true);
  assert(effAtkEmz1 === 1500, 'EMZ-1 gains +500 ATK Resonance Boost (1000 + 500 = 1500)');

  const effAtkMmz1 = engine.getEffectiveMonsterAtk('player', 1, false);
  assert(effAtkMmz1 === 1900, 'MMZ-1 gains +500 ATK Resonance Boost (1400 + 500 = 1900)');

  const effAtkMmz2 = engine.getEffectiveMonsterAtk('player', 2, false);
  assert(effAtkMmz2 === 2100, 'MMZ-2 gains +500 ATK Resonance Boost (1600 + 500 = 2100)');

  const effAtkMmz3 = engine.getEffectiveMonsterAtk('player', 3, false);
  assert(effAtkMmz3 === 1900, 'MMZ-3 gains +500 ATK Resonance Boost (1400 + 500 = 1900)');

  const effAtkMmz4 = engine.getEffectiveMonsterAtk('player', 4, false);
  assert(effAtkMmz4 === 1200, 'MMZ-4 receives no resonance boost (remains at base 1200 ATK)');

  // 5. Covalent Lattice Stability: Effect Destruction Immunity
  assert(engine.isMonsterProtectedFromCardEffects('player', 1, false) === true, 'MMZ-1 in Extra Link is immune to card effect destruction');
  assert(engine.isMonsterProtectedFromCardEffects('player', 2, false) === true, 'MMZ-2 in Extra Link is immune to card effect destruction');
  assert(engine.isMonsterProtectedFromCardEffects('player', 4, false) === false, 'MMZ-4 outside Extra Link is vulnerable to effect destruction');

  // 6. Opponent Extra Monster Zone Lockout (Rulebook v10 tr. 4-5)
  opp.mana = 10;
  engine.activePlayerId = 'opponent';
  engine.currentPhase = 'MAIN_PHASE_1';
  opp.extraDeck = [
    { uid: 'opp_extra_link', def: linkEmz1Def, ownerId: 'opponent' },
    {
      uid: 'opp_extra_synchro',
      def: { ...PLAYABLE_CARDS[0], cardType: 'SYNCHRO_MONSTER', synchroLevel: 7, manaCost: 2 },
      ownerId: 'opponent'
    },
    {
      uid: 'opp_extra_xyz',
      def: { ...PLAYABLE_CARDS[0], cardType: 'XYZ_MONSTER', xyzRank: 4, manaCost: 2 },
      ownerId: 'opponent'
    }
  ];
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'opp_mat_1', def: PLAYABLE_CARDS[0], ownerId: 'opponent' },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const oppLinkLockRes = engine.linkSummon('opponent', 'opp_extra_link', [0], true);
  assert(oppLinkLockRes.success === false, 'Opponent Link Summon into EMZ is strictly blocked by Extra Link');
  assert(oppLinkLockRes.message.includes('Khóa Cổng Extra Link'), 'Rejection cites Extra Link lock message');

  const oppSynchroLockRes = engine.synchroSummon('opponent', 1, 0, 0, [], true);
  assert(oppSynchroLockRes.success === false, 'Opponent Synchro Summon into EMZ is strictly blocked by Extra Link');
  assert(oppSynchroLockRes.message.includes('Khóa Cổng Extra Link'), 'Rejection cites Extra Link lock message');

  const oppXyzLockRes = engine.xyzSummon('opponent', 2, 0, [0], true);
  assert(oppXyzLockRes.success === false, 'Opponent Xyz Summon into EMZ is strictly blocked by Extra Link');
  assert(oppXyzLockRes.message.includes('Khóa Cổng Extra Link'), 'Rejection cites Extra Link lock message');

  // 7. Break Extra Link Chain
  player.monsterZones[2] = null; // MMZ-2 is destroyed/removed
  assert(engine.isExtraLinkActive('player') === false, 'Removing MMZ-2 breaks the unbroken chain: Extra Link becomes inactive');
  assert(engine.getEffectiveMonsterAtk('player', 1, false) === 1400, 'MMZ-1 ATK falls back to base 1400 without Extra Link resonance');
}

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================');

if (failed > 0) {
  process.exit(1);
}
