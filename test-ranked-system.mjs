// test-ranked-system.mjs
// Comprehensive test suite for Ranked Ladder, Seasons & Curriculum Quests

import { RankedSystem, RANKED_TIERS } from './src/domain/rankedSystem.ts';

console.log('============================================================');
console.log('   ELEMENTA: RANKED LADDER & CURRICULUM QUESTS AUDIT');
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

// Mock localStorage for Node environment
const store = {};
globalThis.localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, val) => { store[key] = String(val); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { for (const k in store) delete store[k]; }
};

// --- 1. Tier Configuration & Initial Profile ---
console.log('--- 1. Tier Configuration & Initial Profile ---');
const ranked = new RankedSystem();
const profile = ranked.getProfile();

assert(RANKED_TIERS.length === 6, `Ranked system has exactly 6 tiers (got ${RANKED_TIERS.length})`);
assert(profile.mmr >= 1000, `Default profile starts at initial MMR >= 1000 (got ${profile.mmr})`);
assert(profile.quests.length >= 7, `Profile initialized with >= 7 quests (got ${profile.quests.length})`);

// --- 2. Tier Calculation & Divisions ---
console.log('\n--- 2. Tier Calculation & Divisions ---');
const bronze = ranked.calculateTier(500);
assert(bronze.tier.id === 'BRONZE', '500 MMR is Bronze tier');

const gold = ranked.calculateTier(1750);
assert(gold.tier.id === 'GOLD', '1750 MMR is Gold tier');
assert(gold.division === 2 || gold.division === 3, `1750 MMR is division 2 or 3 in Gold (got ${gold.division})`);

const master = ranked.calculateTier(3500);
assert(master.tier.id === 'MASTER', '3500 MMR is Grand Master tier');

// --- 3. Match Recording & MMR Deltas ---
console.log('\n--- 3. Match Recording & MMR Deltas ---');
const initialMmr = profile.mmr;
const winResult = ranked.recordDuelResult({
  opponentName: 'AI Alchemist',
  outcome: 'VICTORY',
  playerLpRemaining: 7000,
  opponentLpRemaining: 0,
  turns: 5,
  reactionsTriggered: 3,
  tributesUsed: 1
});

assert(winResult.mmrDelta > 30, `Victory grants high MMR with bonuses (got +${winResult.mmrDelta})`);
assert(winResult.newMmr === initialMmr + winResult.mmrDelta, 'New MMR matches initial + delta');
const updatedProfile = ranked.getProfile();
assert(updatedProfile.wins === 1, 'Wins incremented to 1');
assert(updatedProfile.currentWinStreak === 1, 'Current win streak is 1');
assert(updatedProfile.matchHistory.length === 1, 'Match history contains 1 record');
assert(updatedProfile.matchHistory[0].reactionsTriggered === 3, 'Recorded 3 reactions triggered');

// --- 4. Quests Progress & Completion ---
console.log('\n--- 4. Quests Progress & Completion ---');
// Victory and reactions should have automatically updated quests
const winQuest = updatedProfile.quests.find(q => q.actionKey === 'WIN_DUEL');
assert(winQuest && winQuest.isCompleted, 'Daily Win Duel quest is completed');

const reactQuest = updatedProfile.quests.find(q => q.actionKey === 'TRIGGER_REACTION');
assert(reactQuest && reactQuest.currentProgress === 3 && reactQuest.isCompleted, 'Reaction quest completed with 3 reactions');

// Progress curriculum Haber-Bosch quest
ranked.progressQuest('HABER_BOSCH', 1);
const haberQuest = ranked.getProfile().quests.find(q => q.actionKey === 'HABER_BOSCH');
assert(haberQuest && haberQuest.isCompleted, 'Haber-Bosch curriculum quest reached completion');

// --- 5. Reward Claiming & Protection against Double Claiming ---
console.log('\n--- 5. Reward Claiming & Protection ---');
const claimRes = ranked.claimQuest(winQuest.id);
assert(claimRes.success === true, 'Successfully claimed reward for Win Duel quest');
assert(claimRes.xp === winQuest.rewardXp, `Claimed exact XP reward (+${claimRes.xp} XP)`);

const doubleClaimRes = ranked.claimQuest(winQuest.id);
assert(doubleClaimRes.success === false, 'Double claiming same quest is strictly prevented');

// --- 6. Bronze Tier Defeat Protection ---
console.log('\n--- 6. Bronze Tier Defeat Protection ---');
{
  const bronzeSystem = new RankedSystem();
  // Force profile to Bronze
  const p = bronzeSystem.getProfile();
  p.mmr = 600;
  p.currentTierId = 'BRONZE';
  globalThis.localStorage.setItem('elementa_ranked_profile_v2', JSON.stringify(p));

  const bronzeReloaded = new RankedSystem();
  assert(bronzeReloaded.getProfile().currentTierId === 'BRONZE', 'Loaded Bronze profile');

  const defeatRes = bronzeReloaded.recordDuelResult({
    opponentName: 'AI Mentor',
    outcome: 'DEFEAT',
    playerLpRemaining: 0,
    opponentLpRemaining: 4000,
    turns: 8
  });

  assert(defeatRes.mmrDelta === 0, 'Bronze defeat applies zero MMR penalty (got ' + defeatRes.mmrDelta + ')');
  assert(defeatRes.newMmr === 600, 'MMR remains protected at 600 in Bronze tier');
  assert(bronzeReloaded.getProfile().losses === 1, 'Loss count incremented');
}

// --- 7. Swift Victory & Triple Tactical Bonus Scaling ---
console.log('\n--- 7. Swift Victory & Triple Tactical Bonus Scaling ---');
{
  const testSys = new RankedSystem();
  const initMmr = testSys.getProfile().mmr;

  // Maximum bonuses: >=6000 LP (+5), <=6 turns (+5), >=2 reactions (+5) -> Base 30 + 15 = +45 MMR
  const tripleBonusRes = testSys.recordDuelResult({
    opponentName: 'AI Chemist',
    outcome: 'VICTORY',
    playerLpRemaining: 8000,
    opponentLpRemaining: 0,
    turns: 4,
    reactionsTriggered: 2
  });

  assert(tripleBonusRes.mmrDelta === 45, `Triple tactical bonus yields exactly +45 MMR (got +${tripleBonusRes.mmrDelta})`);
  assert(tripleBonusRes.newMmr === initMmr + 45, 'New MMR strictly reflects +45 increment');
}

// --- 8. Match History Capping (Max 20 Invariant) ---
console.log('\n--- 8. Match History Capping (Max 20 Invariant) ---');
{
  const histSys = new RankedSystem();
  for (let i = 0; i < 25; i++) {
    histSys.recordDuelResult({
      opponentName: `Opponent ${i}`,
      outcome: i % 2 === 0 ? 'VICTORY' : 'DEFEAT',
      playerLpRemaining: 3000,
      opponentLpRemaining: 0,
      turns: 7
    });
  }

  const histProfile = histSys.getProfile();
  assert(histProfile.matchHistory.length === 20, `Match history strictly capped at 20 items (got ${histProfile.matchHistory.length})`);
  assert(histProfile.matchHistory[0].opponentName === 'Opponent 24', 'Latest match is at index 0 (unshift)');
}

// --- 9. Division Progression Invariants across Silver Tier ---
console.log('\n--- 9. Division Progression Invariants across Silver Tier ---');
{
  const divSys = new RankedSystem();
  // Silver spans 1000 - 1499 (span = 499)
  const d4 = divSys.calculateTier(1050);
  assert(d4.tier.id === 'SILVER' && d4.division === 4, '1050 MMR is Silver IV');

  const d3 = divSys.calculateTier(1150);
  assert(d3.tier.id === 'SILVER' && d3.division === 3, '1150 MMR is Silver III');

  const d2 = divSys.calculateTier(1300);
  assert(d2.tier.id === 'SILVER' && d2.division === 2, '1300 MMR is Silver II');

  const d1 = divSys.calculateTier(1450);
  assert(d1.tier.id === 'SILVER' && d1.division === 1, '1450 MMR is Silver I');
}

// --- 10. Win Streak Tracking & Reset Invariants ---
console.log('\n--- 10. Win Streak Tracking & Reset Invariants ---');
{
  const streakSys = new RankedSystem();
  // Clear profile
  const p = streakSys.getProfile();
  p.currentWinStreak = 0;
  p.longestWinStreak = 0;
  globalThis.localStorage.setItem('elementa_ranked_profile_v2', JSON.stringify(p));

  const s = new RankedSystem();
  // Win 3 times
  s.recordDuelResult({ opponentName: 'AI 1', outcome: 'VICTORY', playerLpRemaining: 5000, opponentLpRemaining: 0, turns: 6 });
  s.recordDuelResult({ opponentName: 'AI 2', outcome: 'VICTORY', playerLpRemaining: 5000, opponentLpRemaining: 0, turns: 6 });
  s.recordDuelResult({ opponentName: 'AI 3', outcome: 'VICTORY', playerLpRemaining: 5000, opponentLpRemaining: 0, turns: 6 });

  assert(s.getProfile().currentWinStreak === 3, 'Current win streak is 3 after 3 wins');
  assert(s.getProfile().longestWinStreak === 3, 'Longest win streak is 3');

  // Defeat resets current win streak to 0 but preserves longest streak
  s.recordDuelResult({ opponentName: 'AI 4', outcome: 'DEFEAT', playerLpRemaining: 0, opponentLpRemaining: 2000, turns: 10 });
  assert(s.getProfile().currentWinStreak === 0, 'Defeat resets current win streak to 0');
  assert(s.getProfile().longestWinStreak === 3, 'Longest win streak is preserved at 3');
}

// --- 11. Tier Up Promotion Detection ---
console.log('\n--- 11. Tier Up Promotion Detection ---');
{
  const promoSys = new RankedSystem();
  const p = promoSys.getProfile();
  p.mmr = 1490; // Near Silver -> Gold threshold (1500)
  p.currentTierId = 'SILVER';
  globalThis.localStorage.setItem('elementa_ranked_profile_v2', JSON.stringify(p));

  const s = new RankedSystem();
  const promoRes = s.recordDuelResult({
    opponentName: 'Promotion Gatekeeper',
    outcome: 'VICTORY',
    playerLpRemaining: 7000,
    opponentLpRemaining: 0,
    turns: 5
  });

  assert(promoRes.newMmr >= 1500, `New MMR crossed 1500 threshold (got ${promoRes.newMmr})`);
  assert(promoRes.tierUp === true, 'tierUp flag is true on promotion');
  assert(s.getProfile().currentTierId === 'GOLD', 'Profile tier updated to GOLD');
  assert(s.getDemotionShield() === 3, 'Tier promotion awards exactly 3 demotion shield matches');
}

// --- 12. Season-End MMR Soft Reset Invariants ---
console.log('\n--- 12. Season-End MMR Soft Reset Invariants ---');
{
  const seasonSys = new RankedSystem();
  const p = seasonSys.getProfile();
  p.mmr = 2600; // Diamond tier (min 2500, max 2999)
  p.currentTierId = 'DIAMOND';
  p.wins = 45;
  p.losses = 20;
  p.currentWinStreak = 4;
  p.longestWinStreak = 7;
  p.quests.forEach(q => { q.isCompleted = true; q.isClaimed = true; });
  globalThis.localStorage.setItem('elementa_ranked_profile_v2', JSON.stringify(p));

  const loadedSys = new RankedSystem();
  // Execute seasonal soft reset
  const resetData = loadedSys.resetSeason('SEASON_2_COVALENT_FUSION');

  // Formula: 1000 + (2600 - 1000) * 0.5 = 1000 + 800 = 1800 MMR
  assert(resetData.oldMmr === 2600, 'Original MMR correctly captured as 2600');
  assert(resetData.newMmr === 1800, `Soft reset calculates exact MMR 1800 (got ${resetData.newMmr})`);
  assert(resetData.previousTier.id === 'DIAMOND', 'Captured previous season tier as DIAMOND');
  assert(resetData.seasonReward.xp === 800 && resetData.seasonReward.packCount === 5, 'Diamond seasonal reward packs awarded (5 packs, 800 XP)');

  const refreshedProfile = loadedSys.getProfile();
  assert(refreshedProfile.seasonId === 'SEASON_2_COVALENT_FUSION', 'Season ID successfully migrated');
  assert(refreshedProfile.wins === 0, 'Win counter reset to 0');
  assert(refreshedProfile.losses === 0, 'Loss counter reset to 0');
  assert(refreshedProfile.currentWinStreak === 0, 'Current streak reset to 0');
  assert(refreshedProfile.currentTierId === 'GOLD', `1800 MMR maps to Gold tier (got ${refreshedProfile.currentTierId})`);
  assert(refreshedProfile.demotionShield === 3, 'Fresh season grants 3-match safety shield');

  // Verify daily quests are refreshed for the new season
  const dailyQuests = refreshedProfile.quests.filter(q => q.category === 'DAILY');
  const allDailyFresh = dailyQuests.every(q => !q.isCompleted && !q.isClaimed && q.currentProgress === 0);
  assert(allDailyFresh, 'All daily quests refreshed and ready to complete');
}

// --- 13. Demotion Protection Buffer across Tier Gates ---
console.log('\n--- 13. Demotion Protection Buffer across Tier Gates ---');
{
  const shieldSys = new RankedSystem();
  const p = shieldSys.getProfile();
  p.mmr = 1508; // Just promoted to Gold (min 1500)
  p.currentTierId = 'GOLD';
  p.demotionShield = 3;
  globalThis.localStorage.setItem('elementa_ranked_profile_v2', JSON.stringify(p));

  const s = new RankedSystem();

  // Defeat 1: Delta would be -18 (1508 - 18 = 1490 < 1500).
  // Shield clamps delta to -8, MMR becomes 1500, shield decrements to 2.
  const loss1 = s.recordDuelResult({
    opponentName: 'Gold Challenger 1',
    outcome: 'DEFEAT',
    playerLpRemaining: 0,
    opponentLpRemaining: 3000,
    turns: 6
  });
  assert(loss1.newMmr === 1500, `Shield match 1 clamps MMR to tier floor 1500 (got ${loss1.newMmr})`);
  assert(s.getProfile().currentTierId === 'GOLD', 'Player preserved in GOLD tier');
  assert(s.getDemotionShield() === 2, `Shield decremented to 2 (got ${s.getDemotionShield()})`);

  // Defeat 2: MMR at 1500, loss would drop to 1482. Clamped to 1500, shield to 1.
  const loss2 = s.recordDuelResult({
    opponentName: 'Gold Challenger 2',
    outcome: 'DEFEAT',
    playerLpRemaining: 0,
    opponentLpRemaining: 4000,
    turns: 5
  });
  assert(loss2.newMmr === 1500, `Shield match 2 absorbs defeat at tier floor (got ${loss2.newMmr})`);
  assert(s.getProfile().currentTierId === 'GOLD', 'Player preserved in GOLD tier');
  assert(s.getDemotionShield() === 1, `Shield decremented to 1 (got ${s.getDemotionShield()})`);

  // Defeat 3: MMR at 1500, shield to 0.
  const loss3 = s.recordDuelResult({
    opponentName: 'Gold Challenger 3',
    outcome: 'DEFEAT',
    playerLpRemaining: 0,
    opponentLpRemaining: 2500,
    turns: 7
  });
  assert(loss3.newMmr === 1500, `Shield match 3 absorbs final protected defeat (got ${loss3.newMmr})`);
  assert(s.getDemotionShield() === 0, `Shield exhausted to 0 (got ${s.getDemotionShield()})`);

  // Defeat 4: Shield is 0, normal demotion occurs: 1500 - 18 = 1482 -> SILVER
  const loss4 = s.recordDuelResult({
    opponentName: 'Gold Challenger 4',
    outcome: 'DEFEAT',
    playerLpRemaining: 0,
    opponentLpRemaining: 3200,
    turns: 8
  });
  assert(loss4.newMmr === 1482, `Unshielded defeat reduces MMR to 1482 (got ${loss4.newMmr})`);
  assert(s.getProfile().currentTierId === 'SILVER', `Player demoted to SILVER tier (got ${s.getProfile().currentTierId})`);
}

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================');

if (failed > 0) {
  process.exit(1);
}
