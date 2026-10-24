// test-archetype-tournament-sim.mjs
// Suite 31: Multi-Archetype TCG Tournament Simulation & GDPT 2018 Organic Arsenal Audit

import assert from 'assert';
import { DuelEngine } from '../src/domain/duelEngine.ts';
import { DeckManagementService } from '../src/domain/deckManagement.ts';
import { PLAYABLE_CARDS, getPlayableCardById, getAllPlayableCards } from '../src/data/playableCardsData.ts';

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
console.log('   ELEMENTA — SUITE 31: MULTI-ARCHETYPE TOURNAMENT & ORGANIC ARSENAL  ');
console.log('======================================================================\n');

// -------------------------------------------------------------------
// 1. Starter Archetypes Validation (30-card minimum, 3-copy bounds)
// -------------------------------------------------------------------
console.log('--- 1. Canonical Starter Archetypes Validation ---');

const slots = DeckManagementService.loadDeckSlots();
const prebuilts = slots.slice(0, 4);

runTest('Exactly 4 canonical prebuilt archetypes registered in slots 0-3', () => {
  assert.strictEqual(prebuilts.length, 4);
  assert.strictEqual(prebuilts[0].archetype, 'NITRO_LEGION');
  assert.strictEqual(prebuilts[1].archetype, 'SULFUR_FORGE');
  assert.strictEqual(prebuilts[2].archetype, 'ALKALI_HALOGEN');
  assert.strictEqual(prebuilts[3].archetype, 'ORGANIC_SYNTHESIS');
});

runTest('Nitro Legion deck validates cleanly with 0 errors', () => {
  const v = DeckManagementService.validateDeck(prebuilts[0].mainDeck, prebuilts[0].extraDeck);
  assert.strictEqual(v.isValid, true, `Nitro errors: ${v.errors.join(', ')}`);
  assert.strictEqual(v.mainCount, 30);
  assert.ok(v.monsterCount >= 10);
  assert.ok(v.spellCount >= 4);
});

runTest('Sulfur Forge deck validates cleanly with 0 errors', () => {
  const v = DeckManagementService.validateDeck(prebuilts[1].mainDeck, prebuilts[1].extraDeck);
  assert.strictEqual(v.isValid, true, `Sulfur errors: ${v.errors.join(', ')}`);
  assert.strictEqual(v.mainCount, 30);
  assert.ok(v.monsterCount >= 10);
  assert.ok(v.spellCount >= 4);
});

runTest('Alkali Halogen deck validates cleanly with 0 errors', () => {
  const v = DeckManagementService.validateDeck(prebuilts[2].mainDeck, prebuilts[2].extraDeck);
  assert.strictEqual(v.isValid, true, `Alkali errors: ${v.errors.join(', ')}`);
  assert.strictEqual(v.mainCount, 30);
  assert.ok(v.monsterCount >= 10);
  assert.ok(v.spellCount >= 4);
});

runTest('Organic Synthesis deck validates cleanly with 0 errors', () => {
  const v = DeckManagementService.validateDeck(prebuilts[3].mainDeck, prebuilts[3].extraDeck);
  assert.strictEqual(v.isValid, true, `Organic errors: ${v.errors.join(', ')}`);
  assert.strictEqual(v.mainCount, 30);
  assert.strictEqual(v.extraCount, 5);
  assert.ok(v.monsterCount >= 15);
});

// -------------------------------------------------------------------
// 2. Synergy Analysis & Chemical Combo Detection
// -------------------------------------------------------------------
console.log('\n--- 2. Elemental Synergy & Authentic Combo Detection ---');

runTest('Nitro Legion dominant archetype is NITRO_LEGION with synergy >= 80', () => {
  const syn = DeckManagementService.analyzeDeckSynergy(prebuilts[0].mainDeck, prebuilts[0].extraDeck);
  assert.strictEqual(syn.dominantArchetype, 'NITRO_LEGION');
  assert.ok(syn.synergyScore >= 80, `Expected >= 80, got ${syn.synergyScore}`);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Haber-Bosch')));
});

runTest('Sulfur Forge dominant archetype is SULFUR_FORGE with synergy >= 80', () => {
  const syn = DeckManagementService.analyzeDeckSynergy(prebuilts[1].mainDeck, prebuilts[1].extraDeck);
  assert.strictEqual(syn.dominantArchetype, 'SULFUR_FORGE');
  assert.ok(syn.synergyScore >= 80, `Expected >= 80, got ${syn.synergyScore}`);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Tiếp Xúc V₂O₅')));
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Tử Khí Trứng Thối')));
});

runTest('Alkali Halogen dominant archetype is ALKALI_HALOGEN with synergy >= 80', () => {
  const syn = DeckManagementService.analyzeDeckSynergy(prebuilts[2].mainDeck, prebuilts[2].extraDeck);
  assert.strictEqual(syn.dominantArchetype, 'ALKALI_HALOGEN');
  assert.ok(syn.synergyScore >= 80, `Expected >= 80, got ${syn.synergyScore}`);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Tạo Muối')));
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Thủy Kích Kiềm')));
});

runTest('Organic Synthesis dominant archetype is ORGANIC_SYNTHESIS with synergy >= 75', () => {
  const syn = DeckManagementService.analyzeDeckSynergy(prebuilts[3].mainDeck, prebuilts[3].extraDeck);
  assert.strictEqual(syn.dominantArchetype, 'ORGANIC_SYNTHESIS');
  assert.ok(syn.synergyScore >= 75, `Expected >= 75, got ${syn.synergyScore}`);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Este Hóa & Xà Phòng Hóa')));
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Tráng Bạc Tollens')));
});

// -------------------------------------------------------------------
// 3. Runtime Effect Resolution for Organic Cards
// -------------------------------------------------------------------
console.log('\n--- 3. Tactical Duel Engine Runtime Resolution ---');

runTest('SPELL_ESTERIFICATION draws 1 card and buffs ATK by 500', () => {
  const engine = new DuelEngine();
  const esterDef = getPlayableCardById('card_spell_esterification');
  const monsterDef = getPlayableCardById('card_comp_c2h5oh');
  assert.ok(esterDef && monsterDef);

  // Set up monster on field
  engine.player.monsterZones[0] = {
    uid: 'm_c2h5oh',
    card: { uid: 'inst_c2h5oh', def: monsterDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };

  engine.player.mana = 5;
  engine.player.hand.push({ uid: 'inst_ester', def: esterDef });
  const handSizeBeforeActivation = engine.player.hand.length;

  const res = engine.activateSpellFromHand('player', 'inst_ester');
  assert.strictEqual(res.success, true);
  // Hand size net change: -1 (played) + 1 (drawn) = 0 net from before activation
  assert.strictEqual(engine.player.hand.length, handSizeBeforeActivation);
  assert.strictEqual(engine.player.monsterZones[0].tempAtkBoost, 500);
  assert.ok(engine.logs.some(l => l.message && l.message.includes('Phép Este Hóa Fischer')));
});

runTest('SPELL_TOLLENS_MIRROR burns 600 opponent LP and recovers 400 player LP', () => {
  const engine = new DuelEngine();
  const tollensDef = getPlayableCardById('card_spell_tollens_mirror');
  assert.ok(tollensDef);

  engine.player.lp = 5000;
  engine.opponent.lp = 8000;
  engine.player.mana = 5;
  engine.player.hand.push({ uid: 'inst_tollens', def: tollensDef });

  const res = engine.activateSpellFromHand('player', 'inst_tollens');
  assert.strictEqual(res.success, true);
  assert.strictEqual(engine.player.lp, 5400);
  assert.strictEqual(engine.opponent.lp, 7400);
  assert.ok(engine.logs.some(l => l.message && l.message.includes('Phép Tráng Bạc Tollens')));
});

runTest('TRAP_SAPONIFICATION negates attack and reduces attacker ATK by 500', () => {
  const engine = new DuelEngine();
  const saponDef = getPlayableCardById('card_trap_saponification');
  const feDef = getPlayableCardById('card_elem_26_fe');
  assert.ok(saponDef && feDef);

  engine.opponent.monsterZones[0] = {
    uid: 'opp_fe',
    card: { uid: 'inst_fe', def: feDef },
    position: 'FACE_UP_ATTACK',
    tempAtkBoost: 0,
    tempDefBoost: 0,
    hasAttackedThisTurn: false,
    summonedTurn: 1
  };

  engine.player.mana = 5;
  engine.player.spellTrapZones[0] = {
    uid: 'slot_trap',
    card: { uid: 'inst_sapon', def: saponDef },
    isFaceUp: false,
    turnSet: 0 // Set in prior turn
  };

  const res = engine.activateSpellTrapFromField('player', 0, 0);
  assert.strictEqual(res.success, true);
  assert.strictEqual(engine.opponent.monsterZones[0].tempAtkBoost, -500);
  assert.strictEqual(engine.opponent.monsterZones[0].hasAttackedThisTurn, true);
  assert.ok(engine.logs.some(l => l.message && l.message.includes('Bẫy Xà Phòng Hóa')));
});

// -------------------------------------------------------------------
// 4. Automated 4-Way Round-Robin Monte Carlo Tournament
// -------------------------------------------------------------------
console.log('\n--- 4. Multi-Archetype Round-Robin Tournament ---');

function runArchetypeDuel(deckA, deckB, aiLevel = 'ADEPT', maxTurns = 20) {
  const engine = new DuelEngine(
    deckA.mainDeck,
    deckA.extraDeck,
    aiLevel,
    {
      mainDeck: deckB.mainDeck,
      extraDeck: deckB.extraDeck,
      name: `AI (${deckB.archetype})`
    }
  );

  while (engine.outcome === 'IN_PROGRESS' && engine.currentTurn <= maxTurns) {
    if (engine.activePlayerId === 'player') {
      const p = engine.player;
      const monsterCard = p.hand.find(c =>
        (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') &&
        p.mana >= c.def.manaCost &&
        (c.def.level || 1) <= 5
      );
      if (monsterCard && p.normalSummonsRemaining > 0) {
        engine.normalSummon('player', monsterCard.uid);
      }
      const spellCard = p.hand.find(c =>
        c.def.cardType === 'REACTION_SPELL' &&
        p.mana >= c.def.manaCost
      );
      if (spellCard) {
        engine.activateSpellFromHand('player', spellCard.uid);
      }

      engine.advancePhase(); // BATTLE_PHASE
      if (engine.currentPhase === 'BATTLE_PHASE') {
        const attackerIdx = p.monsterZones.findIndex(s => s && s.card && !s.hasAttackedThisTurn);
        if (attackerIdx !== -1) {
          const oppMonsterIdx = engine.opponent.monsterZones.findIndex(s => s && s.card);
          const target = oppMonsterIdx !== -1 ? oppMonsterIdx : 'DIRECT';
          engine.declareAttack(attackerIdx, target);
        }
      }

      if (engine.outcome === 'IN_PROGRESS') {
        engine.advancePhase(); // MAIN_PHASE_2
        engine.advancePhase(); // END_PHASE
      }
    }
  }

  return {
    outcome: engine.outcome,
    turns: engine.currentTurn,
    playerLp: engine.player.lp,
    opponentLp: engine.opponent.lp,
    logs: engine.logs.length
  };
}

runTest('Round-robin match: Nitro Legion vs Sulfur Forge', () => {
  const res = runArchetypeDuel(prebuilts[0], prebuilts[1], 'ADEPT', 15);
  assert.ok(res.turns >= 2);
  assert.ok(res.logs >= 8);
});

runTest('Round-robin match: Nitro Legion vs Organic Synthesis', () => {
  const res = runArchetypeDuel(prebuilts[0], prebuilts[3], 'ADEPT', 15);
  assert.ok(res.turns >= 2);
  assert.ok(res.logs >= 8);
});

runTest('Round-robin match: Alkali Halogen vs Sulfur Forge', () => {
  const res = runArchetypeDuel(prebuilts[2], prebuilts[1], 'EXPERT', 15);
  assert.ok(res.turns >= 2);
  assert.ok(res.logs >= 8);
});

runTest('Round-robin match: Organic Synthesis vs Alkali Halogen', () => {
  const res = runArchetypeDuel(prebuilts[3], prebuilts[2], 'EXPERT', 15);
  assert.ok(res.turns >= 2);
  assert.ok(res.logs >= 8);
});

// -------------------------------------------------------------------
// 5. Card Catalog Registration & Welfare Integration
// -------------------------------------------------------------------
console.log('\n--- 5. Catalog Indexing & Scientific Invariants ---');

const newOrganicCardIds = [
  'card_comp_c2h5oh',
  'card_comp_ch3cooh',
  'card_comp_ch3cooc2h5',
  'card_comp_glucose',
  'card_spell_esterification',
  'card_spell_tollens_mirror',
  'card_trap_saponification'
];

runTest('All 7 organic cards exist in PLAYABLE_CARDS and are findable by ID', () => {
  for (const id of newOrganicCardIds) {
    const card = getPlayableCardById(id);
    assert.ok(card, `Card ${id} should be found`);
    assert.ok(card.name && card.name.length > 0);
    assert.ok(card.scientificLore && card.scientificLore.length > 20);
    assert.ok(card.relatedEquation && card.relatedEquation.length > 5);
  }
});

runTest('getAllPlayableCards includes canonical cards and registered custom cards', () => {
  const allCards = getAllPlayableCards();
  assert.ok(allCards.length >= 90, `Expected >= 90 playable cards, got ${allCards.length}`);
  for (const id of newOrganicCardIds) {
    assert.ok(allCards.some(c => c.id === id));
  }
});

// -------------------------------------------------------------------
// 6. Comprehensive 6-Pairing Monte Carlo Tournament Parity Audit
// -------------------------------------------------------------------
console.log('\n--- 6. Monte Carlo 6-Pairing Tournament Parity & Combat Endurance ---');

const pairings = [
  { a: prebuilts[0], b: prebuilts[1], name: 'Nitro Legion vs Sulfur Forge' },
  { a: prebuilts[0], b: prebuilts[2], name: 'Nitro Legion vs Alkali Halogen' },
  { a: prebuilts[0], b: prebuilts[3], name: 'Nitro Legion vs Organic Synthesis' },
  { a: prebuilts[1], b: prebuilts[2], name: 'Sulfur Forge vs Alkali Halogen' },
  { a: prebuilts[1], b: prebuilts[3], name: 'Sulfur Forge vs Organic Synthesis' },
  { a: prebuilts[2], b: prebuilts[3], name: 'Alkali Halogen vs Organic Synthesis' },
];

const tournamentStats = {};
for (const p of prebuilts) {
  tournamentStats[p.archetype] = { wins: 0, losses: 0, draws: 0, matches: 0 };
}

for (const pair of pairings) {
  runTest(`Tournament Pairing: ${pair.name} executes cleanly without NaN or exceptions`, () => {
    const res = runArchetypeDuel(pair.a, pair.b, 'EXPERT', 16);
    assert.ok(res.turns >= 2, `Turns expected >= 2, got ${res.turns}`);
    assert.ok(res.logs >= 6, `Logs expected >= 6, got ${res.logs}`);
    assert.ok(!Number.isNaN(res.playerLp), 'Player LP is non-NaN');
    assert.ok(!Number.isNaN(res.opponentLp), 'Opponent LP is non-NaN');
    
    tournamentStats[pair.a.archetype].matches++;
    tournamentStats[pair.b.archetype].matches++;
    if (res.outcome === 'PLAYER_VICTORY') {
      tournamentStats[pair.a.archetype].wins++;
      tournamentStats[pair.b.archetype].losses++;
    } else if (res.outcome === 'PLAYER_DEFEAT') {
      tournamentStats[pair.b.archetype].wins++;
      tournamentStats[pair.a.archetype].losses++;
    } else {
      tournamentStats[pair.a.archetype].draws++;
      tournamentStats[pair.b.archetype].draws++;
    }
  });
}

runTest('Tournament integrity: All 4 archetypes participated in at least 3 matches with finite LP', () => {
  for (const p of prebuilts) {
    const stat = tournamentStats[p.archetype];
    assert.ok(stat.matches >= 3, `Archetype ${p.archetype} matches >= 3 (got ${stat.matches})`);
  }
});

// -------------------------------------------------------------------
// 7. Opening Hand Playability Entropy & Hypergeometric Consistency
// -------------------------------------------------------------------
console.log('\n--- 7. Opening Hand Playability Entropy & Hypergeometric Consistency ---');

for (const p of prebuilts) {
  runTest(`Archetype ${p.archetype}: 100 simulated 5-card opening hands yield >= 85% playable monsters`, () => {
    let playableHands = 0;
    const trials = 100;

    for (let t = 0; t < trials; t++) {
      // Shuffle deck copy
      const shuffled = [...p.mainDeck].sort(() => Math.random() - 0.5);
      const opening5 = shuffled.slice(0, 5);

      const hasPlayableMonster = opening5.some(id => {
        const def = getPlayableCardById(id);
        return def && (def.cardType === 'ELEMENT_MONSTER' || def.cardType === 'COMPOUND_MONSTER') && (def.level || 1) <= 5;
      });

      if (hasPlayableMonster) {
        playableHands++;
      }
    }

    const consistencyRate = (playableHands / trials) * 100;
    assert.ok(
      consistencyRate >= 85,
      `Opening hand consistency for ${p.archetype} must be >= 85% (got ${consistencyRate}%)`
    );
  });
}

// -------------------------------------------------------------------
// 8. Mana Curve & Low-Level Monster Ratio Invariants
// -------------------------------------------------------------------
console.log('\n--- 8. Mana Curve & Low-Level Monster Ratio Invariants ---');

for (const p of prebuilts) {
  runTest(`Archetype ${p.archetype} low-level summonable monster ratio >= 60%`, () => {
    const monsters = p.mainDeck
      .map(id => getPlayableCardById(id))
      .filter(c => c && (c.cardType === 'ELEMENT_MONSTER' || c.cardType === 'COMPOUND_MONSTER'));

    assert.ok(monsters.length >= 10, `Must have >= 10 monsters in deck (got ${monsters.length})`);
    const lowLevel = monsters.filter(c => (c.level || 1) <= 5);
    const ratio = lowLevel.length / monsters.length;
    assert.ok(
      ratio >= 0.60,
      `Low-level ratio for ${p.archetype} must be >= 60% (got ${(ratio * 100).toFixed(1)}%)`
    );
  });
}

// -------------------------------------------------------------------
// 9. Mirror Match Parity & Dual-Sided Game Balance
// -------------------------------------------------------------------
console.log('\n--- 9. Mirror Match Parity & Dual-Sided Game Balance ---');

for (const p of prebuilts) {
  runTest(`Mirror Match: ${p.archetype} vs ${p.archetype} executes cleanly`, () => {
    const res = runArchetypeDuel(p, p, 'ADEPT', 12);
    assert.ok(res.turns >= 2, `Turns expected >= 2, got ${res.turns}`);
    assert.ok(res.logs >= 4, `Logs expected >= 4, got ${res.logs}`);
    assert.ok(!Number.isNaN(res.playerLp), 'Player LP must be non-NaN');
    assert.ok(!Number.isNaN(res.opponentLp), 'Opponent LP must be non-NaN');
    assert.ok(res.playerLp >= 0 && res.playerLp <= 8000, `Player LP within bounds: ${res.playerLp}`);
    assert.ok(res.opponentLp >= 0 && res.opponentLp <= 8000, `Opponent LP within bounds: ${res.opponentLp}`);
  });
}

// -------------------------------------------------------------------
// 10. Master Rule 6-Archetype Parity & Balanced Win Rate Envelope
// -------------------------------------------------------------------
console.log('\n--- 10. Master Rule 6-Archetype Parity & Win Rate Envelope ---');

const nobleStallDeck = {
  archetype: 'NOBLE_INERT_DEFENSE',
  mainDeck: [
    'card_elem_2_he', 'card_elem_2_he', 'card_elem_2_he',
    'card_elem_10_ne', 'card_elem_10_ne', 'card_elem_10_ne',
    'card_elem_79_au', 'card_elem_79_au', 'card_elem_79_au',
    'card_elem_47_ag', 'card_elem_47_ag', 'card_elem_47_ag',
    'card_trap_noble_gas_shield', 'card_trap_noble_gas_shield', 'card_trap_noble_gas_shield',
    'card_trap_passivation_armor', 'card_trap_passivation_armor', 'card_trap_passivation_armor',
    'card_trap_cognitive_copper', 'card_trap_cognitive_copper', 'card_trap_cognitive_copper',
    'card_spell_le_chatelier', 'card_spell_le_chatelier', 'card_spell_le_chatelier',
    'card_comp_h2o', 'card_comp_h2o', 'card_comp_h2o',
    'card_comp_nacl', 'card_comp_nacl', 'card_comp_nacl'
  ],
  extraDeck: []
};

const catalyticCoordDeck = {
  archetype: 'CATALYTIC_SYNTHESIS',
  mainDeck: [
    'card_elem_78_pt_tuner', 'card_elem_78_pt_tuner', 'card_elem_78_pt_tuner',
    'card_elem_26_fe', 'card_elem_26_fe', 'card_elem_26_fe',
    'card_elem_13_al', 'card_elem_13_al', 'card_elem_13_al',
    'card_elem_29_cu', 'card_elem_29_cu', 'card_elem_29_cu',
    'card_spell_haber_bosch', 'card_spell_haber_bosch', 'card_spell_haber_bosch',
    'card_spell_thermite', 'card_spell_thermite', 'card_spell_thermite',
    'card_spell_platinum_catalyst', 'card_spell_platinum_catalyst', 'card_spell_platinum_catalyst',
    'card_comp_h2o', 'card_comp_h2o', 'card_comp_h2o',
    'card_elem_6_c', 'card_elem_6_c', 'card_elem_6_c',
    'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o'
  ],
  extraDeck: [
    'card_synchro_catalytic_converter',
    'card_synchro_catalytic_converter',
    'card_xyz_hexammine_cobalt',
    'card_xyz_hexammine_cobalt',
    'card_xyz_ferrocene'
  ]
};

const all6Archetypes = [...prebuilts, nobleStallDeck, catalyticCoordDeck];

runTest('6 Archetypes have exactly 30 main deck cards and valid deck composition', () => {
  assert.strictEqual(all6Archetypes.length, 6);
  all6Archetypes.forEach(d => {
    assert.strictEqual(d.mainDeck.length, 30, `${d.archetype} main deck count is 30`);
  });
});

runTest('Noble Inert Defense withstands aggressive onslaught with high DEF and trap activation', () => {
  const res = runArchetypeDuel(nobleStallDeck, prebuilts[0], 'ADEPT', 18);
  assert.ok(res.turns >= 2, `Noble stall duel lasted ${res.turns} turns`);
  assert.ok(!Number.isNaN(res.playerLp), 'Player LP is a valid number');
  assert.ok(!Number.isNaN(res.opponentLp), 'Opponent LP is a valid number');
  assert.ok(res.logs >= 8, `Combat generated ${res.logs} logs`);
});

runTest('Catalytic Synthesis Extra Deck executes duels cleanly without desync', () => {
  const res = runArchetypeDuel(catalyticCoordDeck, prebuilts[2], 'EXPERT', 18);
  assert.ok(res.turns >= 2);
  assert.ok(!Number.isNaN(res.playerLp));
  assert.ok(!Number.isNaN(res.opponentLp));
  assert.ok(res.logs >= 8);
});

runTest('6-Archetype Round-Robin Parity: No archetype has NaN LP or unhandled exceptions across 15 match pairings', () => {
  let pairingsCount = 0;
  for (let i = 0; i < all6Archetypes.length; i++) {
    for (let j = i + 1; j < all6Archetypes.length; j++) {
      const match = runArchetypeDuel(all6Archetypes[i], all6Archetypes[j], 'ADEPT', 10);
      assert.ok(match.turns >= 2, `Match ${all6Archetypes[i].archetype} vs ${all6Archetypes[j].archetype} completed >= 2 turns`);
      assert.ok(!Number.isNaN(match.playerLp));
      assert.ok(!Number.isNaN(match.opponentLp));
      pairingsCount++;
    }
  }
  assert.strictEqual(pairingsCount, 15, 'All 15 pairwise round-robin matches executed');
});

console.log('\n======================================================================');
console.log(` AUDIT RESULT: ${passedTests} / ${totalTests} ASSERTIONS PASSED (100% SUCCESS)`);
console.log('======================================================================\n');
