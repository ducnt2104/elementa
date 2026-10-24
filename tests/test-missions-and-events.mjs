// tests/test-missions-and-events.mjs
// Verification suite for ELEMENTA Missions Engine, Events Engine, and 7-Day Daily Login

import assert from 'assert';
import {
  MissionsEngine,
  CANONICAL_MISSIONS
} from '../src/domain/missionsEngine.ts';
import {
  EventsEngine,
  CANONICAL_TIMED_EVENTS,
  DAILY_LOGIN_CALENDAR
} from '../src/domain/eventsEngine.ts';

// Mock localStorage for Node.js environment
const mockStorage = new Map();
global.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

console.log('--- TEST SUITE: MISSIONS & COMMUNITY EVENTS ENGINE ---');

// Mock profile
let testProfile = {
  id: 'test_user_01',
  name: 'Alchemist Tester',
  level: 5,
  xp: 1200,
  knowledgeTokens: 500,
  elementalShards: 150,
  battlesWon: 12,
  battlesPlayed: 15,
  reactionsTriggered: 25,
  cardCollection: {
    card_elem_1_h: 4,
    card_elem_8_o: 2,
    card_comp_h2o: 1
  }
};

const updateProfile = (updater) => {
  testProfile = updater(testProfile);
};

// 1. Verify Canonical Missions Data Integrity
assert.ok(CANONICAL_MISSIONS.length >= 10, 'Must have at least 10 canonical missions');
const categories = new Set(CANONICAL_MISSIONS.map((m) => m.category));
assert.ok(categories.has('DAILY'), 'Must have DAILY category');
assert.ok(categories.has('WEEKLY'), 'Must have WEEKLY category');
assert.ok(categories.has('CHEMISTRY'), 'Must have CHEMISTRY category');
assert.ok(categories.has('COLLECTION'), 'Must have COLLECTION category');
assert.ok(categories.has('BEGINNER'), 'Must have BEGINNER category');
console.log('✓ Canonical Missions data structure verified across all 5 categories.');

// 2. Evaluate Missions with Profile Progress
const evaluated = MissionsEngine.getEvaluatedMissions(testProfile);
assert.strictEqual(evaluated.length, CANONICAL_MISSIONS.length);
const completedMissions = evaluated.filter((m) => m.progress.isCompleted);
assert.ok(completedMissions.length > 0, 'Test profile with 12 wins and 25 reactions should complete multiple missions');
console.log(`✓ Evaluated missions: ${completedMissions.length}/${evaluated.length} completed.`);

// 3. Test Claim Mission Reward
const claimable = completedMissions.find((m) => !m.progress.isClaimed);
assert.ok(claimable, 'Should have at least 1 claimable completed mission');
const initialTokens = testProfile.knowledgeTokens;
const claimResult = MissionsEngine.claimReward(claimable.definition.id, testProfile, updateProfile);
assert.strictEqual(claimResult.success, true);
assert.ok(testProfile.knowledgeTokens >= initialTokens + claimable.definition.reward.knowledgeTokens);
console.log(`✓ Claimed mission ${claimable.definition.id} successfully: +${claimable.definition.reward.knowledgeTokens} Tokens.`);

// 4. Test Anti-Double-Claim
const doubleClaim = MissionsEngine.claimReward(claimable.definition.id, testProfile, updateProfile);
assert.strictEqual(doubleClaim.success, false, 'Double claim must be rejected');
console.log('✓ Anti-double-claim protection verified.');

// 5. Verify Canonical Timed Events
assert.ok(CANONICAL_TIMED_EVENTS.length >= 2, 'Must have at least 2 canonical timed events');
const evaluatedEvents = EventsEngine.getEvaluatedEvents(testProfile);
assert.strictEqual(evaluatedEvents.length, CANONICAL_TIMED_EVENTS.length);
assert.ok(evaluatedEvents[0].remainingHours > 0, 'Event must have positive remaining hours');
console.log(`✓ Timed Events verified: ${evaluatedEvents.length} active community campaigns.`);

// 6. Test 7-Day Login Calendar
assert.strictEqual(DAILY_LOGIN_CALENDAR.length, 7, 'Must have exactly 7 days in daily login calendar');
const initialLoginState = EventsEngine.getDailyLoginState();
assert.strictEqual(initialLoginState.canClaimToday, true);
assert.strictEqual(initialLoginState.currentDay, 1);

const loginResult = EventsEngine.claimDailyLogin(testProfile, updateProfile);
assert.strictEqual(loginResult.success, true);
assert.ok(loginResult.rewardDay);
assert.strictEqual(loginResult.rewardDay.day, 1);

const postLoginState = EventsEngine.getDailyLoginState();
assert.strictEqual(postLoginState.canClaimToday, false, 'Cannot claim twice on the same day');
assert.strictEqual(postLoginState.currentDay, 2, 'Next day pointer advanced to 2');
console.log('✓ 7-Day Daily Login cycle and day advancement verified.');

console.log('--- ALL MISSION & EVENT TESTS PASSED (100%) ---');
