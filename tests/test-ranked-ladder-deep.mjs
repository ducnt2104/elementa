// test-ranked-ladder-deep.mjs
// Suite 38: Deep Ranked Ladder, ELO / MMR Progression, Division Quartiles, Win Streak Resilience & 100-Match Season Simulation

import { RankedSystem, RANKED_TIERS, DEFAULT_QUESTS } from '../src/domain/rankedSystem.ts';

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ PASS: ${message}`);
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 38: DEEP RANKED LADDER & MMR SIMULATION AUDIT     ');
console.log('======================================================================\n');

// Mock localStorage for headless Node environment
const memoryStore = {};
globalThis.localStorage = {
  getItem: (key) => memoryStore[key] || null,
  setItem: (key, val) => { memoryStore[key] = String(val); },
  removeItem: (key) => { delete memoryStore[key]; },
  clear: () => { for (const k in memoryStore) delete memoryStore[k]; }
};

// --- 1. Tier Boundaries & Division Quartiles Mapping ---
console.log('--- 1. Tier Boundaries & Division Quartiles Mapping ---');
{
  const ranked = new RankedSystem();

  assert(RANKED_TIERS.length === 6, 'Ladder features exactly 6 competitive tiers');

  const EXPECTED_TIERS = [
    { id: 'BRONZE', min: 0, max: 999 },
    { id: 'SILVER', min: 1000, max: 1499 },
    { id: 'GOLD', min: 1500, max: 1999 },
    { id: 'PLATINUM', min: 2000, max: 2499 },
    { id: 'DIAMOND', min: 2500, max: 2999 },
    { id: 'MASTER', min: 3000, max: 99999 }
  ];

  for (const exp of EXPECTED_TIERS) {
    const tier = RANKED_TIERS.find(t => t.id === exp.id);
    assert(tier !== undefined, `Tier ${exp.id} exists`);
    assert(tier.minMmr === exp.min, `Tier ${exp.id} minMmr is ${exp.min}`);
    assert(tier.maxMmr === exp.max, `Tier ${exp.id} maxMmr is ${exp.max}`);
  }

  // Division Quartile Calculation Tests
  // In Silver (1000 to 1499, span = 499):
  // 1000 -> Div 4 (progress 0.00)
  // 1125 -> Div 3 (progress 0.25)
  // 1250 -> Div 2 (progress 0.50)
  // 1375 -> Div 1 (progress 0.75)
  assert(ranked.calculateTier(1000).division === 4, 'Silver MMR 1000 maps to Division IV');
  assert(ranked.calculateTier(1130).division === 3, 'Silver MMR 1130 maps to Division III');
  assert(ranked.calculateTier(1260).division === 2, 'Silver MMR 1260 maps to Division II');
  assert(ranked.calculateTier(1400).division === 1, 'Silver MMR 1400 maps to Division I');

  // Master Tier: min 3000
  const masterCalc = ranked.calculateTier(3200);
  assert(masterCalc.tier.id === 'MASTER', 'MMR 3200 maps to Master Tier');
}

// --- 2. Dynamic MMR Delta Formula & Bonus Invariants ---
console.log('\n--- 2. Dynamic MMR Delta Formula & Bonus Invariants ---');
{
  globalThis.localStorage.clear();
  const ranked = new RankedSystem();

  // Test standard victory without bonuses
  const stdWin = ranked.recordDuelResult({
    opponentName: 'Test AI',
    outcome: 'VICTORY',
    playerLpRemaining: 4000, // < 6000 (no LP bonus)
    opponentLpRemaining: 0,
    turns: 8,               // > 6 (no turn bonus)
    reactionsTriggered: 1   // < 2 (no reaction bonus)
  });
  assert(stdWin.mmrDelta === 30, `Standard victory awards exactly +30 MMR (got +${stdWin.mmrDelta})`);

  // Test full bonus victory (+30 base + 5 LP + 5 swift + 5 reaction = +45 MMR)
  const maxWin = ranked.recordDuelResult({
    opponentName: 'Test AI',
    outcome: 'VICTORY',
    playerLpRemaining: 7500, // >= 6000 (+5)
    opponentLpRemaining: 0,
    turns: 4,               // <= 6 (+5)
    reactionsTriggered: 3   // >= 2 (+5)
  });
  assert(maxWin.mmrDelta === 45, `Maximum performance victory awards +45 MMR (got +${maxWin.mmrDelta})`);

  // Test standard defeat in Silver (-18 MMR)
  const stdLoss = ranked.recordDuelResult({
    opponentName: 'Test AI',
    outcome: 'DEFEAT',
    playerLpRemaining: 0,
    opponentLpRemaining: 5000,
    turns: 6
  });
  assert(stdLoss.mmrDelta === -18, `Standard defeat reduces MMR by -18 (got ${stdLoss.mmrDelta})`);
}

// --- 3. Bronze Tier Floor Protection Invariant ---
console.log('\n--- 3. Bronze Tier Floor Protection Invariant ---');
{
  globalThis.localStorage.clear();
  // Force profile to Bronze tier (e.g. MMR = 200)
  const ranked = new RankedSystem();
  ranked['profile'].mmr = 200;
  ranked['profile'].currentTierId = 'BRONZE';

  const bronzeLoss = ranked.recordDuelResult({
    opponentName: 'Test AI',
    outcome: 'DEFEAT',
    playerLpRemaining: 0,
    opponentLpRemaining: 8000,
    turns: 4
  });

  assert(bronzeLoss.mmrDelta === 0, `Bronze protection invariant: Defeat in Bronze yields 0 MMR delta (got ${bronzeLoss.mmrDelta})`);
  assert(bronzeLoss.newMmr === 200, 'Bronze MMR remains protected against loss decay');
}

// --- 4. Win Streak Escalation & Reset ---
console.log('\n--- 4. Win Streak Escalation & Reset ---');
{
  globalThis.localStorage.clear();
  const ranked = new RankedSystem();

  // 3 consecutive wins
  for (let i = 1; i <= 3; i++) {
    ranked.recordDuelResult({
      opponentName: 'AI Opponent',
      outcome: 'VICTORY',
      playerLpRemaining: 5000,
      opponentLpRemaining: 0,
      turns: 7
    });
    assert(ranked.getProfile().currentWinStreak === i, `Win streak is ${i} after ${i} wins`);
  }
  assert(ranked.getProfile().longestWinStreak === 3, 'Longest win streak is 3');

  // Defeat resets streak
  ranked.recordDuelResult({
    opponentName: 'AI Opponent',
    outcome: 'DEFEAT',
    playerLpRemaining: 0,
    opponentLpRemaining: 2000,
    turns: 7
  });

  assert(ranked.getProfile().currentWinStreak === 0, 'Win streak immediately resets to 0 on defeat');
  assert(ranked.getProfile().longestWinStreak === 3, 'Longest win streak remains preserved at 3');
}

// --- 5. Match History 20-Record Ring Buffer Eviction ---
console.log('\n--- 5. Match History 20-Record Ring Buffer Eviction ---');
{
  globalThis.localStorage.clear();
  const ranked = new RankedSystem();

  // Play 25 matches
  for (let m = 1; m <= 25; m++) {
    ranked.recordDuelResult({
      opponentName: `Opponent #${m}`,
      outcome: m % 2 === 0 ? 'VICTORY' : 'DEFEAT',
      playerLpRemaining: m % 2 === 0 ? 5000 : 0,
      opponentLpRemaining: m % 2 === 0 ? 0 : 5000,
      turns: 6
    });
  }

  const history = ranked.getProfile().matchHistory;
  assert(history.length === 20, `Match history strictly clamped at 20 records (got ${history.length})`);
  assert(history[0].opponentName === 'Opponent #25', 'Latest match is at index 0 (unshifted)');
}

// --- 6. 100-Match Competitive Season Monte Carlo Simulation ---
console.log('\n--- 6. 100-Match Competitive Season Monte Carlo Simulation ---');
{
  globalThis.localStorage.clear();
  const ranked = new RankedSystem();
  const initialMmr = ranked.getProfile().mmr; // 1200
  let wins = 0;
  let losses = 0;

  for (let m = 0; m < 100; m++) {
    // 60% win-rate student simulation
    const isWin = Math.random() < 0.60;
    if (isWin) wins++; else losses++;

    const res = ranked.recordDuelResult({
      opponentName: `Challenger_${m + 1}`,
      outcome: isWin ? 'VICTORY' : 'DEFEAT',
      playerLpRemaining: isWin ? Math.floor(Math.random() * 5000) + 3000 : 0,
      opponentLpRemaining: isWin ? 0 : Math.floor(Math.random() * 5000) + 1000,
      turns: Math.floor(Math.random() * 8) + 3,
      reactionsTriggered: Math.floor(Math.random() * 4),
      tributesUsed: Math.floor(Math.random() * 2)
    });

    assert(res.newMmr >= 0, `MMR never drops below 0 (match ${m + 1}: MMR=${res.newMmr})`);
  }

  const finalProfile = ranked.getProfile();
  assert(finalProfile.wins === wins, `Final profile records ${wins} wins (got ${finalProfile.wins})`);
  assert(finalProfile.losses === losses, `Final profile records ${losses} losses (got ${finalProfile.losses})`);
  assert(finalProfile.peakMmr >= initialMmr, `Peak MMR (${finalProfile.peakMmr}) tracks highest achievement`);
  assert(finalProfile.peakMmr >= finalProfile.mmr, `Peak MMR >= current MMR (${finalProfile.mmr})`);

  console.log(`    ↳ Season complete: ${wins}W - ${losses}L (${Math.round(wins / 100 * 100)}% Win Rate)`);
  console.log(`    ↳ Initial MMR: ${initialMmr} → Final MMR: ${finalProfile.mmr} (Peak: ${finalProfile.peakMmr})`);
  console.log(`    ↳ Final Tier: ${finalProfile.currentTierId} (Division ${finalProfile.division})`);
}

// --- 7. Curriculum Quests Progress & Multi-Claim Protection ---
console.log('\n--- 7. Curriculum Quests Progress & Multi-Claim Protection ---');
{
  globalThis.localStorage.clear();
  const ranked = new RankedSystem();

  // Progress BaSO4 quest
  ranked.progressQuest('PRECIPITATE_BASO4', 1);
  const baso4Quest = ranked.getProfile().quests.find(q => q.actionKey === 'PRECIPITATE_BASO4');
  assert(baso4Quest !== undefined, 'Found BaSO4 quest');
  assert(baso4Quest.isCompleted === true, 'BaSO4 quest completed');
  assert(baso4Quest.isClaimed === false, 'BaSO4 quest not yet claimed');

  // Claim once
  const claim1 = ranked.claimQuest(baso4Quest.id);
  assert(claim1.success === true, 'First claim succeeded');
  assert(claim1.shards === 100, 'Claim awarded +100 Elemental Shards');

  // Claim again (must fail)
  const claim2 = ranked.claimQuest(baso4Quest.id);
  assert(claim2.success === false, 'Second claim rejected (anti-farming protection)');
}

console.log('\n======================================================================');
console.log('   ✓ SUITE 38: ALL DEEP RANKED LADDER ASSERTIONS PASSED!              ');
console.log('======================================================================\n');
