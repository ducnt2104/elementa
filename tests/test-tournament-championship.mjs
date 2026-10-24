// tests/test-tournament-championship.mjs
// Test Suite 202: 16-Player Chemistry Championship & Autonomous Tournament Simulation
import assert from 'assert';
import {
  TournamentEngine,
  CANONICAL_CHEMIST_ROSTER
} from '../src/domain/tournamentEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 202: 16-PLAYER TOURNAMENT CHAMPIONSHIP ENGINE');
console.log('======================================================================\n');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    process.exit(1);
  }
}

// 1. Roster and Bracket Generation Tests
test('Canonical chemist roster contains exactly 16 historical scientist personas', () => {
  assert.strictEqual(CANONICAL_CHEMIST_ROSTER.length, 16);
  const names = CANONICAL_CHEMIST_ROSTER.map(c => c.name);
  assert.ok(names.includes('Dmitri Mendeleev'));
  assert.ok(names.includes('Antoine Lavoisier'));
  assert.ok(names.includes('Marie Curie'));
  assert.ok(names.includes('Niels Bohr'));
});

test('Bracket generation seeds 16 players into 8 round 1 matches with proper seed pairing', () => {
  const { competitors, round1Matches } = TournamentEngine.generate16PlayerBracket(CANONICAL_CHEMIST_ROSTER);
  assert.strictEqual(competitors.length, 16);
  assert.strictEqual(round1Matches.length, 8);

  // Check top seed pair: 1 vs 16
  assert.strictEqual(round1Matches[0].competitorA.seed, 1);
  assert.strictEqual(round1Matches[0].competitorB.seed, 16);

  // Check seed pair 4 vs 13
  assert.strictEqual(round1Matches[2].competitorA.seed, 4);
  assert.strictEqual(round1Matches[2].competitorB.seed, 13);
});

// 2. Dynamic Match Simulation Tests
test('simulateMatchOutcome incorporates archetype advantages and updates Elo', () => {
  const { round1Matches } = TournamentEngine.generate16PlayerBracket(CANONICAL_CHEMIST_ROSTER);
  const match = round1Matches[0];
  const initialEloA = match.competitorA.rating;
  const initialEloB = match.competitorB.rating;

  const resolved = TournamentEngine.simulateMatchOutcome(match, 0.2); // seed 0.2
  assert.ok(resolved.winner);
  assert.ok(resolved.loser);
  assert.strictEqual(resolved.turns >= 5, true);
  assert.notStrictEqual(resolved.competitorA.rating, initialEloA);
  assert.notStrictEqual(resolved.competitorB.rating, initialEloB);
});

// 3. Full Championship Simulation Tests
test('simulateFullChampionship executes all 4 rounds and crowns a single champion', () => {
  const tourney = TournamentEngine.simulateFullChampionship();

  assert.strictEqual(tourney.competitors.length, 16);
  assert.strictEqual(tourney.r16Matches.length, 8);
  assert.strictEqual(tourney.qfMatches.length, 4);
  assert.strictEqual(tourney.sfMatches.length, 2);
  assert.strictEqual(tourney.gfMatches.length, 1);

  // Total matches = 15
  const totalMatches = tourney.r16Matches.length + tourney.qfMatches.length + tourney.sfMatches.length + tourney.gfMatches.length;
  assert.strictEqual(totalMatches, 15);

  // Champion verification
  assert.ok(tourney.champion);
  assert.strictEqual(tourney.champion.isChampion, true);
  assert.strictEqual(tourney.champion.matchesWon, 4); // Won R16, QF, SF, GF
  assert.strictEqual(tourney.champion.matchesLost, 0);
  assert.strictEqual(tourney.champion.eliminatedInRound, undefined);
});

test('Every non-champion competitor is eliminated in exactly one round', () => {
  const tourney = TournamentEngine.simulateFullChampionship();
  const losers = tourney.competitors.filter(c => !c.isChampion);
  assert.strictEqual(losers.length, 15);

  for (const loser of losers) {
    assert.ok(loser.eliminatedInRound, `Competitor ${loser.name} should have eliminatedInRound`);
    assert.strictEqual(loser.matchesLost, 1); // Single elimination: exactly 1 loss
  }
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed} TESTS PASSED`);
console.log(' TEST SUITE 202 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
