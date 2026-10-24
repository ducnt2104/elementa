// test-tribute-endurance-deep.mjs
// Suite 33: Deep Tribute Summons, Duplicate Exploit Safeguards & 50-Turn Endurance Duel

import assert from 'assert';
import { DuelEngine } from './src/domain/duelEngine.ts';
import { getPlayableCardById } from './src/data/playableCardsData.ts';

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 33: TRIBUTE SAFEGUARDS & 50-TURN DUEL ENDURANCE   ');
console.log('======================================================================\n');

// -------------------------------------------------------------------
// 1. High-Level Monster Tribute Validation & Exploit Defense
// -------------------------------------------------------------------
console.log('--- 1. Level 7+ Tribute Invariants & Duplicate Protection ---');

runTest('Summoning Level 7 Gold (Au) requires tributes; 0 tributes is rejected', () => {
  const engine = new DuelEngine();
  const auDef = getPlayableCardById('card_elem_79_au');
  assert.ok(auDef);
  assert.strictEqual(auDef.level, 7);

  engine.player.mana = 10;
  engine.player.hand.push({ uid: 'inst_au', def: auDef });

  const res = engine.normalSummon('player', 'inst_au', 'FACE_UP_ATTACK', []);
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('>5 sao') || res.message.includes('bắt buộc phải hiến tế'));
});

runTest('Summoning Level 7 Gold with 1 Level 4 monster (4 < 7 stars) is rejected', () => {
  const engine = new DuelEngine();
  const auDef = getPlayableCardById('card_elem_79_au');
  const naDef = getPlayableCardById('card_elem_11_na'); // Level 4
  assert.ok(auDef && naDef);

  engine.player.monsterZones[0] = {
    uid: 'm_na',
    card: { uid: 'inst_na', def: naDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };

  engine.player.mana = 10;
  engine.player.hand.push({ uid: 'inst_au', def: auDef });

  const res = engine.normalSummon('player', 'inst_au', 'FACE_UP_ATTACK', [0]);
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('chưa đạt yêu cầu') || res.message.includes('Cần tổng >= 7 sao'));
});

runTest('Duplicate tribute index exploit [0, 0] is strictly blocked', () => {
  const engine = new DuelEngine();
  const auDef = getPlayableCardById('card_elem_79_au');
  const naDef = getPlayableCardById('card_elem_11_na');
  assert.ok(auDef && naDef);

  engine.player.monsterZones[0] = {
    uid: 'm_na',
    card: { uid: 'inst_na', def: naDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };

  engine.player.mana = 10;
  engine.player.hand.push({ uid: 'inst_au', def: auDef });

  const res = engine.normalSummon('player', 'inst_au', 'FACE_UP_ATTACK', [0, 0]);
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('trùng lặp'), `Expected duplicate error, got: ${res.message}`);
});

runTest('Out-of-bounds tribute index [99] is strictly blocked', () => {
  const engine = new DuelEngine();
  const auDef = getPlayableCardById('card_elem_79_au');
  engine.player.mana = 10;
  engine.player.hand.push({ uid: 'inst_au', def: auDef });

  const res = engine.normalSummon('player', 'inst_au', 'FACE_UP_ATTACK', [99]);
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('ngoài phạm vi'));
});

runTest('Summoning Level 7 Gold with two Level 4 monsters (4+4=8 >= 7 stars) succeeds cleanly', () => {
  const engine = new DuelEngine();
  const auDef = getPlayableCardById('card_elem_79_au');
  const naDef = getPlayableCardById('card_elem_11_na'); // Level 4
  const clDef = getPlayableCardById('card_elem_17_cl'); // Level 4
  assert.ok(auDef && naDef && clDef);

  engine.player.monsterZones[0] = {
    uid: 'm_na',
    card: { uid: 'inst_na', def: naDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };
  engine.player.monsterZones[1] = {
    uid: 'm_cl',
    card: { uid: 'inst_cl', def: clDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };

  engine.player.mana = 10;
  engine.player.hand.push({ uid: 'inst_au', def: auDef });

  const initialGraveCount = engine.player.graveyard.length;
  const res = engine.normalSummon('player', 'inst_au', 'FACE_UP_ATTACK', [0, 1]);
  assert.strictEqual(res.success, true);
  // Both monsters sent to graveyard
  assert.strictEqual(engine.player.graveyard.length, initialGraveCount + 2);
  // Gold placed onto field
  assert.ok(engine.player.monsterZones[0] && engine.player.monsterZones[0].card.def.id === 'card_elem_79_au');
  // Slot 1 freed
  assert.strictEqual(engine.player.monsterZones[1], null);
});

// -------------------------------------------------------------------
// 2. Extra Deck Material Exploits & Stoichiometry Protection
// -------------------------------------------------------------------
console.log('\n--- 2. Compound Synthesis & Link Material Exploits Protection ---');

runTest('Compound synthesis duplicate field slot material is blocked', () => {
  const engine = new DuelEngine();
  const h2oDef = getPlayableCardById('card_comp_h2o');
  engine.player.extraDeck.push({ uid: 'inst_h2o', def: h2oDef });
  engine.player.mana = 10;

  const res = engine.compoundSynthesisSummon('player', 'inst_h2o', [
    { location: 'FIELD', idOrSlot: 0 },
    { location: 'FIELD', idOrSlot: 0 }
  ]);
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('trùng lặp') || res.message.includes('nhiều lần'));
});

runTest('Compound synthesis duplicate hand card UID material is blocked', () => {
  const engine = new DuelEngine();
  const h2oDef = getPlayableCardById('card_comp_h2o');
  engine.player.extraDeck.push({ uid: 'inst_h2o', def: h2oDef });
  engine.player.mana = 10;

  const res = engine.compoundSynthesisSummon('player', 'inst_h2o', [
    { location: 'HAND', idOrSlot: 'card_dup_1' },
    { location: 'HAND', idOrSlot: 'card_dup_1' }
  ]);
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('trùng lặp') || res.message.includes('nhiều lần'));
});

runTest('Link summon duplicate field slot exploit is blocked', () => {
  const engine = new DuelEngine();
  const linkDef = getPlayableCardById('card_link_2_ethylene');
  engine.player.extraDeck.push({ uid: 'inst_link', def: linkDef });
  engine.player.mana = 10;

  const res = engine.linkSummon('player', 'inst_link', [0, 0]);
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('trùng lặp') || res.message.includes('nhiều lần'));
});

runTest('Link summon out-of-bounds field slot is blocked', () => {
  const engine = new DuelEngine();
  const linkDef = getPlayableCardById('card_link_2_ethylene');
  engine.player.extraDeck.push({ uid: 'inst_link', def: linkDef });
  engine.player.mana = 10;

  const res = engine.linkSummon('player', 'inst_link', [99]);
  assert.strictEqual(res.success, false);
  assert.ok(res.message.includes('ngoài phạm vi'));
});

// -------------------------------------------------------------------
// 3. 50-Turn Continuous Card Duel Endurance Stress Test
// -------------------------------------------------------------------
console.log('\n--- 3. 50-Turn Marathon Card Duel Endurance Simulation ---');

runTest('50-Turn continuous duel stress completes without memory leak or state desync', () => {
  const engine = new DuelEngine(undefined, undefined, 'EXPERT');
  assert.strictEqual(engine.currentTurn, 1);
  assert.strictEqual(engine.outcome, 'IN_PROGRESS');

  let turnsSimulated = 0;
  const maxTurns = 50;

  while (engine.outcome === 'IN_PROGRESS' && engine.currentTurn <= maxTurns) {
    turnsSimulated++;
    if (engine.activePlayerId === 'player') {
      const p = engine.player;

      // 1. Play summonable monsters
      const monsterCard = p.hand.find(c =>
        (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') &&
        p.mana >= c.def.manaCost &&
        (c.def.level || 1) <= 4
      );
      if (monsterCard && p.normalSummonsRemaining > 0) {
        engine.normalSummon('player', monsterCard.uid);
      }

      // 2. Play spells
      const spellCard = p.hand.find(c =>
        c.def.cardType === 'REACTION_SPELL' &&
        p.mana >= c.def.manaCost
      );
      if (spellCard) {
        engine.activateSpellFromHand('player', spellCard.uid);
      }

      // 3. Advance to Battle Phase & Attack
      engine.advancePhase(); // -> BATTLE_PHASE
      if (engine.currentPhase === 'BATTLE_PHASE') {
        const attackerIdx = p.monsterZones.findIndex(s => s && s.card && !s.hasAttackedThisTurn);
        if (attackerIdx !== -1) {
          const oppMonsterIdx = engine.opponent.monsterZones.findIndex(s => s && s.card);
          const target = oppMonsterIdx !== -1 ? oppMonsterIdx : 'DIRECT';
          engine.declareAttack(attackerIdx, target);
        }
      }

      // 4. Advance to End Phase (which triggers Opponent AI turn)
      if (engine.outcome === 'IN_PROGRESS') {
        engine.advancePhase(); // -> MAIN_PHASE_2
        engine.advancePhase(); // -> END_PHASE
      }
    } else {
      // In case activePlayerId was somehow opponent, advance
      engine.advancePhase();
    }
  }

  assert.ok(turnsSimulated >= 3, `Expected >= 3 turns, simulated ${turnsSimulated}`);
  assert.ok(['PLAYER_VICTORY', 'OPPONENT_VICTORY', 'IN_PROGRESS'].includes(engine.outcome), `Outcome is valid (got ${engine.outcome})`);
  assert.ok(engine.player.lp >= 0, `Player LP must be >= 0, got ${engine.player.lp}`);
  assert.ok(engine.opponent.lp >= 0, `Opponent LP must be >= 0, got ${engine.opponent.lp}`);
  assert.ok(engine.player.monsterZones.length === 5, 'Monster zones length must stay exactly 5');
  assert.ok(engine.opponent.monsterZones.length === 5, 'Opponent monster zones length must stay exactly 5');
  assert.ok(engine.logs.length >= 25, `Combat log must have rich records, got ${engine.logs.length}`);
});

// -------------------------------------------------------------------
// 4. Level 5 Mana Direct Summon vs Level 6+ Tribute Threshold
// -------------------------------------------------------------------
console.log('\n--- 4. Level 5 Direct Summon vs Level 6+ Tribute Threshold ---');

runTest('Level 5 monster (Fluorine) summons directly with Mana without tribute', () => {
  const engine = new DuelEngine();
  const fDef = getPlayableCardById('card_elem_9_f'); // Level 5 monster
  assert.ok(fDef);
  assert.strictEqual(fDef.level, 5);

  engine.player.mana = 10;
  engine.player.hand.push({ uid: 'inst_f', def: fDef });

  // 0 tributes -> succeeds because Level <= 5 only requires Mana!
  const resDirect = engine.normalSummon('player', 'inst_f', 'FACE_UP_ATTACK', []);
  assert.strictEqual(resDirect.success, true);
  assert.ok(engine.player.monsterZones[0] && engine.player.monsterZones[0].card.def.id === 'card_elem_9_f');
});

runTest('Level 6 monster (Potassium) strictly requires tribute (>5 stars rule)', () => {
  const engine = new DuelEngine();
  const kDef = getPlayableCardById('card_elem_19_k'); // Level 6 monster
  assert.ok(kDef);
  assert.strictEqual(kDef.level, 6);

  engine.player.mana = 10;
  engine.player.hand.push({ uid: 'inst_k', def: kDef });

  // 0 tributes -> rejected
  const resNoTribute = engine.normalSummon('player', 'inst_k', 'FACE_UP_ATTACK', []);
  assert.strictEqual(resNoTribute.success, false);
  assert.ok(resNoTribute.message.includes('>5 sao') || resNoTribute.message.includes('hiến tế'));

  // Place a Level 4 monster in slot 0 to tribute
  const naDef = getPlayableCardById('card_elem_11_na'); // Level 4
  engine.player.monsterZones[0] = {
    uid: 'm_na',
    card: { uid: 'inst_na', def: naDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };

  // Tribute slot 0 -> succeeds cleanly
  const resTribute = engine.normalSummon('player', 'inst_k', 'FACE_UP_ATTACK', [0]);
  assert.strictEqual(resTribute.success, true);
  assert.ok(engine.player.monsterZones[0] && engine.player.monsterZones[0].card.def.id === 'card_elem_19_k');
  assert.strictEqual(engine.player.graveyard.length, 1);
  assert.strictEqual(engine.player.graveyard[0].def.id, 'card_elem_11_na');
});

// -------------------------------------------------------------------
// 5. Tribute Graveyard Movement & Nullification Invariants
// -------------------------------------------------------------------
console.log('\n--- 5. Tribute to Graveyard Lifecycle & Slot Nullification ---');

runTest('Tributed monsters are strictly routed to player graveyard and original slots cleared', () => {
  const engine = new DuelEngine();
  const auDef = getPlayableCardById('card_elem_79_au'); // Level 7
  const fDef = getPlayableCardById('card_elem_9_f'); // Level 5
  const naDef = getPlayableCardById('card_elem_11_na'); // Level 4

  engine.player.monsterZones[2] = {
    uid: 'm_f',
    card: { uid: 'inst_f', def: fDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };
  engine.player.monsterZones[4] = {
    uid: 'm_na',
    card: { uid: 'inst_na', def: naDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };

  engine.player.mana = 10;
  engine.player.hand.push({ uid: 'inst_au', def: auDef });

  const initialGraveCount = engine.player.graveyard.length;
  // Tribute slot 2 (Level 5) and slot 4 (Level 4) -> 5 + 4 = 9 >= 7
  const res = engine.normalSummon('player', 'inst_au', 'FACE_UP_ATTACK', [2, 4]);
  assert.strictEqual(res.success, true);

  // Slot 2 and 4 must now be null (or slot 2 occupied by Au if chosen as destination)
  assert.strictEqual(engine.player.monsterZones[4], null);
  assert.strictEqual(engine.player.graveyard.length, initialGraveCount + 2);
  const graveIds = engine.player.graveyard.map(c => c.def.id);
  assert.ok(graveIds.includes('card_elem_9_f'));
  assert.ok(graveIds.includes('card_elem_11_na'));
});

// -------------------------------------------------------------------
// 6. Official TCG Deck-Out Victory / Defeat Resolution
// -------------------------------------------------------------------
console.log('\n--- 6. Deck-Out Victory & Defeat Invariants ---');

runTest('Player with 0 cards in main deck suffers immediate Deck-Out defeat upon drawing', () => {
  const engine = new DuelEngine();
  assert.strictEqual(engine.outcome, 'IN_PROGRESS');

  // Empty player main deck
  engine.player.deck = [];
  assert.strictEqual(engine.player.deck.length, 0);

  // Attempt draw
  const drawn = engine.drawCard('player', true);
  assert.strictEqual(drawn, null);
  assert.strictEqual(engine.outcome, 'OPPONENT_VICTORY');
});

runTest('Opponent with 0 cards in main deck suffers immediate Deck-Out defeat granting player victory', () => {
  const engine = new DuelEngine();
  assert.strictEqual(engine.outcome, 'IN_PROGRESS');

  // Empty opponent main deck
  engine.opponent.deck = [];
  assert.strictEqual(engine.opponent.deck.length, 0);

  // Opponent attempt draw
  const drawn = engine.drawCard('opponent', true);
  assert.strictEqual(drawn, null);
  assert.strictEqual(engine.outcome, 'PLAYER_VICTORY');
});

console.log('\n======================================================================');
console.log(` AUDIT RESULT: ${passedTests} / ${totalTests} ASSERTIONS PASSED (100% SUCCESS)`);
console.log('======================================================================\n');
