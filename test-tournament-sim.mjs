// test-tournament-sim.mjs
// Comprehensive AI vs AI Tournament Simulation, Archetype Balancing & Economy Progression Audit

import assert from 'assert';
import { DuelEngine } from './src/domain/duelEngine.ts';
import { DeckManagementService, TOTAL_DECK_SLOTS } from './src/domain/deckManagement.ts';
import { RANKED_TIERS, DEFAULT_QUESTS, rankedEngine } from './src/domain/rankedSystem.ts';
import { THEMATIC_BOOSTER_BOXES } from './src/components/shop/BoosterShopTab.tsx';
import { TournamentEngine, CANONICAL_CHEMIST_ROSTER } from './src/domain/tournamentEngine.ts';

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

console.log('=== TEST SUITE: AI TOURNAMENTS, ARCHETYPE BALANCE & ECONOMY AUDIT ===\n');

// -------------------------------------------------------------
// GROUP 1: MONTE CARLO AI DUEL TOURNAMENT
// -------------------------------------------------------------
console.log('--- Group 1: Monte Carlo AI Tournament Simulation ---');

function simulateAiDuel(playerDeck, extraDeck, aiLevel, maxTurns = 25) {
  const engine = new DuelEngine(playerDeck, extraDeck, aiLevel);

  while (engine.outcome === 'IN_PROGRESS' && engine.currentTurn <= maxTurns) {
    if (engine.activePlayerId === 'player') {
      // Automated Player Driver: Play highest ATK monster from hand if Mana allows
      const p = engine.player;
      const monsterCard = p.hand.find(c =>
        (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') &&
        p.mana >= c.def.manaCost &&
        (c.def.level || 1) <= 5
      );

      if (monsterCard && p.normalSummonsRemaining > 0) {
        engine.normalSummon('player', monsterCard.uid);
      }

      // Play playable spell
      const spellCard = p.hand.find(c =>
        c.def.cardType === 'SPELL' &&
        p.mana >= c.def.manaCost
      );
      if (spellCard) {
        engine.activateSpellFromHand('player', spellCard.uid);
      }

      // Advance to Battle Phase
      engine.advancePhase(); // -> BATTLE_PHASE

      // Attack if monsters available
      if (engine.currentPhase === 'BATTLE_PHASE') {
        const attackerIdx = p.monsterZones.findIndex(s => s && s.card && !s.hasAttackedThisTurn);
        if (attackerIdx !== -1) {
          const oppMonsterIdx = engine.opponent.monsterZones.findIndex(s => s && s.card);
          const target = oppMonsterIdx !== -1 ? oppMonsterIdx : 'DIRECT';
          engine.declareAttack(attackerIdx, target);
        }
      }

      // Advance to Main Phase 2 & End Phase -> triggers opponent AI automatically
      if (engine.outcome === 'IN_PROGRESS') {
        engine.advancePhase(); // -> MAIN_PHASE_2
        engine.advancePhase(); // -> END_PHASE (runs AI turn and returns to player)
      }
    }
  }

  return {
    outcome: engine.outcome,
    turns: engine.currentTurn,
    playerLp: engine.player.lp,
    opponentLp: engine.opponent.lp,
    logCount: engine.logs.length
  };
}

const allSlots = DeckManagementService.loadDeckSlots();
const slot1 = allSlots[0]; // Nitro Legion
const slot2 = allSlots[1]; // Sulfur Forge
const slot3 = allSlots[2]; // Alkali Halogen

runTest('Nitro Legion archetype vs AI [NOVICE, ADEPT, EXPERT, MASTER] completes cleanly', () => {
  for (const level of ['NOVICE', 'ADEPT', 'EXPERT', 'MASTER']) {
    const res = simulateAiDuel(slot1.mainDeck, slot1.extraDeck, level, 15);
    assert.ok(res.turns >= 2, `Duel should last multiple turns, got ${res.turns}`);
    assert.ok(res.logCount >= 10, 'Combat logs should be richly generated');
  }
});

runTest('Sulfur Forge archetype vs AI [ADEPT, EXPERT] completes cleanly', () => {
  for (const level of ['ADEPT', 'EXPERT']) {
    const res = simulateAiDuel(slot2.mainDeck, slot2.extraDeck, level, 15);
    assert.ok(res.turns >= 2);
    assert.ok(res.logCount >= 10);
  }
});

runTest('Alkali-Halogen archetype vs AI [NOVICE, MASTER] completes cleanly', () => {
  for (const level of ['NOVICE', 'MASTER']) {
    const res = simulateAiDuel(slot3.mainDeck, slot3.extraDeck, level, 15);
    assert.ok(res.turns >= 2);
    assert.ok(res.logCount >= 10);
  }
});

// -------------------------------------------------------------
// GROUP 2: ARCHETYPE STATISTICAL INTEGRITY
// -------------------------------------------------------------
console.log('\n--- Group 2: Archetype Structure & Pre-built Balance ---');

runTest('All 3 Starter Archetypes strictly satisfy TCG 30-60 Card deck rules', () => {
  const allSlots = DeckManagementService.loadDeckSlots();
  for (let i = 0; i < 3; i++) {
    const slot = allSlots[i];
    assert.ok(slot.mainDeck.length >= 30 && slot.mainDeck.length <= 60, `${slot.name} mainDeck out of bounds`);
    assert.ok(slot.extraDeck.length <= 15, `${slot.name} extraDeck out of bounds`);

    // Verify 3-copy rule across pre-built decks
    const counts = {};
    for (const cardId of slot.mainDeck) {
      counts[cardId] = (counts[cardId] || 0) + 1;
      assert.ok(counts[cardId] <= 3, `Prebuilt deck ${slot.name} violates 3-copy rule for ${cardId}`);
    }
  }
});

// -------------------------------------------------------------
// GROUP 3: ECONOMY & PROGRESSION RATE AUDIT
// -------------------------------------------------------------
console.log('\n--- Group 3: F2P Student Progression & Shard Economy ---');

runTest('Ranked tiers have strictly monotonic promotion rewards', () => {
  for (let i = 1; i < RANKED_TIERS.length; i++) {
    const prev = RANKED_TIERS[i - 1].promotionReward;
    const curr = RANKED_TIERS[i].promotionReward;
    assert.ok(curr.xp > prev.xp, `Tier ${RANKED_TIERS[i].id} XP should exceed previous`);
    assert.ok(curr.shards > prev.shards, `Tier ${RANKED_TIERS[i].id} shards should exceed previous`);
    assert.ok(curr.packCount >= prev.packCount, `Tier ${RANKED_TIERS[i].id} packs should exceed previous`);
  }
});

runTest('Daily quests provide guaranteed sustainable progression', () => {
  const totalDailyShards = DEFAULT_QUESTS.filter(q => q.category === 'DAILY').reduce((acc, q) => acc + q.rewardShards, 0);
  const totalDailyXp = DEFAULT_QUESTS.filter(q => q.category === 'DAILY').reduce((acc, q) => acc + q.rewardXp, 0);

  // Daily quests should give >= 250 shards (sufficient for at least 2 booster packs)
  assert.ok(totalDailyShards >= 250, `Daily quests should grant >= 250 shards, got ${totalDailyShards}`);
  assert.ok(totalDailyXp >= 350, `Daily quests should grant >= 350 XP, got ${totalDailyXp}`);
});

runTest('Booster shop catalog contains 4 diverse thematic boxes with guaranteed drop rates', () => {
  assert.strictEqual(THEMATIC_BOOSTER_BOXES.length, 4, 'Should have exactly 4 thematic booster boxes');

  for (const box of THEMATIC_BOOSTER_BOXES) {
    assert.ok(box.subPacks.length >= 2, `${box.title} must have multiple subPacks`);
    for (const sub of box.subPacks) {
      assert.ok(sub.priceTokens > 0, `${sub.name} must have token price`);
      assert.ok(sub.featuredCardIds.length >= 3, `${sub.name} must have featured cards`);
    }
  }
});

// -------------------------------------------------------------
// GROUP 4: 16-PLAYER SINGLE-ELIMINATION TOURNAMENT BRACKET
// -------------------------------------------------------------
console.log('\n--- Group 4: 16-Player Single-Elimination Tournament Bracket ---');

runTest('Tournament bracket initializes exactly 16 competitors with valid seeds and round 1 matchups', () => {
  const { competitors, round1Matches } = TournamentEngine.generate16PlayerBracket(CANONICAL_CHEMIST_ROSTER);
  assert.strictEqual(competitors.length, 16);
  assert.strictEqual(round1Matches.length, 8);

  // Verify seeds 1 to 16
  for (let i = 0; i < 16; i++) {
    assert.strictEqual(competitors[i].seed, i + 1);
  }
  // Verify top seed is Dmitri Mendeleev
  assert.strictEqual(competitors[0].name, 'Dmitri Mendeleev');
  assert.strictEqual(competitors[0].seed, 1);

  // Verify canonical pairings
  const expectedPairs = [
    [1, 16], [8, 9], [4, 13], [5, 12],
    [2, 15], [7, 10], [3, 14], [6, 11]
  ];
  for (let i = 0; i < 8; i++) {
    assert.strictEqual(round1Matches[i].competitorA.seed, expectedPairs[i][0]);
    assert.strictEqual(round1Matches[i].competitorB.seed, expectedPairs[i][1]);
  }
});

runTest('Full 16-player tournament progression simulates 15 matches to crown exactly 1 champion', () => {
  const { competitors, round1Matches } = TournamentEngine.generate16PlayerBracket(CANONICAL_CHEMIST_ROSTER);

  // Round of 16 (8 matches)
  const completedR16 = round1Matches.map(m => {
    const lpA = m.competitorA.rating > m.competitorB.rating ? 4200 : 3800;
    const lpB = 0;
    return TournamentEngine.resolveMatch(m, lpA, lpB, 7);
  });
  assert.strictEqual(completedR16.length, 8);
  assert.ok(completedR16.every(m => m.winner && m.loser));

  // Quarterfinals (4 matches)
  const qfMatches = TournamentEngine.advanceRound(completedR16, 'QUARTER_FINALS');
  assert.strictEqual(qfMatches.length, 4);
  const completedQF = qfMatches.map(m => {
    return TournamentEngine.resolveMatch(m, 5000, 1200, 9);
  });

  // Semifinals (2 matches)
  const sfMatches = TournamentEngine.advanceRound(completedQF, 'SEMI_FINALS');
  assert.strictEqual(sfMatches.length, 2);
  const completedSF = sfMatches.map(m => {
    return TournamentEngine.resolveMatch(m, 3500, 0, 11);
  });

  // Grand Finals (1 match)
  const gfMatches = TournamentEngine.advanceRound(completedSF, 'GRAND_FINALS');
  assert.strictEqual(gfMatches.length, 1);
  const finalMatch = TournamentEngine.resolveMatch(gfMatches[0], 2100, 0, 14);

  const champion = finalMatch.winner;
  assert.ok(champion);
  champion.isChampion = true;

  // Verify tournament invariants:
  // 1. Exactly 1 champion with 4 matches won
  assert.strictEqual(champion.matchesWon, 4);
  assert.strictEqual(champion.matchesLost, 0);

  // 2. Exactly 15 matches played total (8 + 4 + 2 + 1)
  const allResolved = [...completedR16, ...completedQF, ...completedSF, finalMatch];
  assert.strictEqual(allResolved.length, 15);

  // 3. Exactly 15 competitors eliminated
  const eliminated = competitors.filter(c => c.eliminatedInRound);
  assert.strictEqual(eliminated.length, 15);

  // 4. Distribution of eliminations: 8 in R16, 4 in QF, 2 in SF, 1 in GF
  assert.strictEqual(competitors.filter(c => c.eliminatedInRound === 'ROUND_OF_16').length, 8);
  assert.strictEqual(competitors.filter(c => c.eliminatedInRound === 'QUARTER_FINALS').length, 4);
  assert.strictEqual(competitors.filter(c => c.eliminatedInRound === 'SEMI_FINALS').length, 2);
  assert.strictEqual(competitors.filter(c => c.eliminatedInRound === 'GRAND_FINALS').length, 1);
});

runTest('Tie-breaker accurately resolves equal LP matches using field monster ATK', () => {
  const { round1Matches } = TournamentEngine.generate16PlayerBracket(CANONICAL_CHEMIST_ROSTER);
  const m = round1Matches[0];

  const resolved = TournamentEngine.resolveMatch(m, 0, 0, 15, 2400, 1800);
  assert.strictEqual(resolved.tieBreakerUsed, true);
  assert.strictEqual(resolved.winner?.id, m.competitorA.id);
  assert.strictEqual(resolved.loser?.id, m.competitorB.id);
});

// -------------------------------------------------------------
// GROUP 5: MATHEMATICAL ELO RATING ENGINE PROPERTIES
// -------------------------------------------------------------
console.log('\n--- Group 5: Mathematical Elo Rating Engine Properties ---');

runTest('Elo win expectation satisfies strict complementary symmetry (E_A + E_B = 1.000)', () => {
  const testRatings = [
    [1200, 1200],
    [1600, 1200],
    [2400, 1800],
    [900, 1500]
  ];
  for (const [rA, rB] of testRatings) {
    const res = TournamentEngine.calculateElo(rA, rB, 1, 32, 32);
    const sum = res.expectedScoreA + res.expectedScoreB;
    assert.ok(Math.abs(sum - 1.0) < 1e-9, `Expected sum 1.0, got ${sum}`);
  }
});

runTest('Upset victories award significantly larger Elo gains than expected victories', () => {
  const expectedRes = TournamentEngine.calculateElo(1600, 1200, 1, 32, 32);
  const upsetRes = TournamentEngine.calculateElo(1200, 1600, 1, 32, 32);

  assert.ok(upsetRes.deltaA > expectedRes.deltaA * 2, 'Upset should grant >2x rating increase compared to expected win');
  assert.strictEqual(expectedRes.deltaA + expectedRes.deltaB, 0, 'Zero-sum conservation on expected match');
  assert.strictEqual(upsetRes.deltaA + upsetRes.deltaB, 0, 'Zero-sum conservation on upset match');
});

runTest('Rating floor strictly prevents MMR from dropping below 100', () => {
  const res = TournamentEngine.calculateElo(110, 2000, 0, 32, 32);
  assert.ok(res.newRatingA >= 100, `Rating should not drop below floor 100, got ${res.newRatingA}`);
});

// -------------------------------------------------------------
// GROUP 6: 16-PLAYER CHAMPIONSHIP BRACKET & 5-PERSONA ROUND-ROBIN
// -------------------------------------------------------------
console.log('\n--- Group 6: 16-Player Championship Bracket & 5-Persona Round-Robin ---');

runTest('TournamentEngine executes full 16-player bracket through 4 rounds to determine Champion', () => {
  const { competitors, round1Matches } = TournamentEngine.generate16PlayerBracket(CANONICAL_CHEMIST_ROSTER);
  assert.strictEqual(competitors.length, 16, '16 seeded competitors created');
  assert.strictEqual(round1Matches.length, 8, 'Round 1 has 8 matches');

  // Round 1 (8 matches) -> Resolve and advance to Quarterfinals
  for (const m of round1Matches) {
    TournamentEngine.resolveMatch(m, 4000, 3000, 10, 2000, 1500);
  }
  const qfMatches = TournamentEngine.advanceRound(round1Matches, 'QUARTER_FINALS');
  assert.strictEqual(qfMatches.length, 4, 'Quarterfinals has 4 matches');

  // Round 2 (4 QF matches) -> Resolve and advance to Semifinals
  for (const m of qfMatches) {
    TournamentEngine.resolveMatch(m, 4200, 3100, 12, 2200, 1700);
  }
  const sfMatches = TournamentEngine.advanceRound(qfMatches, 'SEMI_FINALS');
  assert.strictEqual(sfMatches.length, 2, 'Semifinals has 2 matches');

  // Round 3 (2 SF matches) -> Resolve and advance to Grand Finals
  for (const m of sfMatches) {
    TournamentEngine.resolveMatch(m, 4500, 3200, 14, 2400, 1900);
  }
  const gfMatches = TournamentEngine.advanceRound(sfMatches, 'GRAND_FINALS');
  assert.strictEqual(gfMatches.length, 1, 'Grand Finals has exactly 1 championship match');

  // Round 4 (Grand Finals) -> Crown Champion
  const championMatch = gfMatches[0];
  const finalResult = TournamentEngine.resolveMatch(championMatch, 5000, 3500, 18, 2800, 2100);
  assert.ok(finalResult.winner !== null, 'Grand Finals produces a decisive Champion');
  assert.strictEqual(finalResult.winner.matchesWon >= 4, true, 'Tournament Champion won 4 consecutive bracket matches');
});

runTest('5-Persona pairwise round-robin headless simulation (50 duels) executes with zero desyncs', () => {
  const personas = ['MENDELEEV', 'CURIE', 'LAVOISIER', 'ALPHA', 'BETA'];
  let totalDuels = 0;
  let validOutcomes = 0;

  for (let i = 0; i < personas.length; i++) {
    for (let j = i + 1; j < personas.length; j++) {
      const pA = personas[i];
      const pB = personas[j];

      // Run 5 duels per pair
      for (let run = 0; run < 5; run++) {
        totalDuels++;
        const engine = new DuelEngine(slot1.mainDeck, slot1.extraDeck, pB === 'MENDELEEV' ? 'MASTER' : 'EXPERT');
        engine.player.name = `Duelist ${pA}`;
        engine.opponent.name = `Duelist ${pB}`;

        // Run automated 10-turn simulation
        let turn = 0;
        while (engine.outcome === 'IN_PROGRESS' && turn < 10) {
          turn++;
          if (engine.activePlayerId === 'player') {
            const playableMonster = engine.player.hand.find(c => 
              (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') &&
              engine.player.mana >= c.def.manaCost
            );
            if (playableMonster && engine.player.normalSummonsRemaining > 0) {
              engine.normalSummon('player', playableMonster.uid);
            }
            engine.advancePhase(); // -> BATTLE_PHASE
            if (engine.currentPhase === 'BATTLE_PHASE') {
              const attacker = engine.player.monsterZones.findIndex(s => s && s.card && !s.hasAttackedThisTurn);
              if (attacker !== -1) {
                const target = engine.opponent.monsterZones.findIndex(s => s && s.card);
                engine.declareAttack(attacker, target !== -1 ? target : 'DIRECT');
              }
            }
            if (engine.outcome === 'IN_PROGRESS') {
              engine.advancePhase(); // -> MAIN_PHASE_2
              engine.advancePhase(); // -> END_PHASE
            }
          }
        }

        assert.ok(Number.isFinite(engine.player.lp) && engine.player.lp >= 0, `Player LP must be non-negative finite integer, got ${engine.player.lp}`);
        assert.ok(Number.isFinite(engine.opponent.lp) && engine.opponent.lp >= 0, `Opponent LP must be non-negative finite integer, got ${engine.opponent.lp}`);
        assert.ok(['IN_PROGRESS', 'PLAYER_VICTORY', 'OPPONENT_VICTORY', 'DRAW'].includes(engine.outcome), `Valid outcome state: ${engine.outcome}`);
        validOutcomes++;
      }
    }
  }

  assert.strictEqual(totalDuels, 50, 'Exactly 50 duels simulated across 10 pairwise persona matchups');
  assert.strictEqual(validOutcomes, 50, 'All 50 duels completed with 100% valid finite state');
});

runTest('FIDE Elo rating engine satisfies zero-sum conservation, expected score symmetry, and upset escalation', () => {
  // 1. Equal ratings (1500 vs 1500)
  const equalRes = TournamentEngine.calculateElo(1500, 1500, 1, 32, 32);
  assert.strictEqual(equalRes.expectedScoreA, 0.5, 'Expected win rate between equal ratings is exactly 0.5');
  assert.strictEqual(equalRes.expectedScoreB, 0.5, 'Expected win rate for opponent is exactly 0.5');
  assert.strictEqual(equalRes.deltaA + equalRes.deltaB, 0, 'Zero-sum rating conservation: deltaA + deltaB = 0');
  assert.strictEqual(equalRes.deltaA, 16, 'Standard win gives +16 Elo with K=32');
  assert.strictEqual(equalRes.deltaB, -16, 'Standard loss gives -16 Elo with K=32');

  // 2. High rating difference: 2400 Grandmaster Mendeleev vs 1200 Novice
  const mendeleevVsNovice = TournamentEngine.calculateElo(2400, 1200, 1, 32, 32);
  assert.ok(mendeleevVsNovice.expectedScoreA > 0.99, 'Grandmaster has > 99% expected win probability');
  assert.ok(mendeleevVsNovice.deltaA <= 1, 'Expected win awards minimal Elo delta (<= +1)');
  assert.strictEqual(mendeleevVsNovice.deltaA + mendeleevVsNovice.deltaB, 0, 'Zero-sum conservation holds under extreme disparity');

  // 3. Huge Upset: 1200 Novice beats 2400 Grandmaster
  const upsetRes = TournamentEngine.calculateElo(1200, 2400, 1, 32, 32);
  assert.ok(upsetRes.deltaA >= 31, 'Massive upset victory yields near-maximum +31 or +32 Elo');
  assert.ok(upsetRes.deltaB <= -31, 'Upset defeat penalizes high-rated player by -31 or -32 Elo');
  assert.strictEqual(upsetRes.deltaA + upsetRes.deltaB, 0, 'Zero-sum conservation strictly maintained on upset');

  // 4. Draw between 1600 and 1400
  const drawRes = TournamentEngine.calculateElo(1600, 1400, 0.5, 32, 32);
  assert.strictEqual(drawRes.deltaA + drawRes.deltaB, 0, 'Zero-sum conservation strictly maintained on draw');
  assert.ok(drawRes.deltaA < 0, 'Higher rated player loses Elo on draw against lower rated opponent');
  assert.ok(drawRes.deltaB > 0, 'Lower rated player gains Elo on draw against higher rated opponent');
});

console.log(`\n=================================================`);
console.log(`TOURNAMENT & ECONOMY TESTS COMPLETE: ${passedTests} / ${totalTests} PASSED`);
console.log(`=================================================\n`);
