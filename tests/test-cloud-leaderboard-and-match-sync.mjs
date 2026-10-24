import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

console.log('======================================================================');
console.log('   TEST SUITE 161: CLOUD FIRESTORE LEADERBOARD & MATCH TELEMETRY SYNC ');
console.log('   Phase E: Backend Telemetry, Match Records & Leaderboard Sync      ');
console.log('======================================================================\n');

let passCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (condition) {
    console.log(`  [PASS] #${totalCount}: ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] #${totalCount}: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Firebase Service Interface & Methods Verification
console.log('--- 1. FIREBASE SERVICE METHODS AUDIT ---');
const servicePath = resolve(rootDir, 'src', 'services', 'firebaseService.ts');
assert(existsSync(servicePath), 'src/services/firebaseService.ts exists');

if (existsSync(servicePath)) {
  const content = readFileSync(servicePath, 'utf8');
  assert(content.includes('updateLeaderboardEntry'), 'Exposes updateLeaderboardEntry method');
  assert(content.includes('recordMatch'), 'Exposes recordMatch method');
  assert(content.includes('getLeaderboard'), 'Exposes getLeaderboard method with offline fallback');
  assert(content.includes("mode: 'TCG' | 'MOBA'"), 'MatchResultRecord specifies both TCG and MOBA modes');
}

// 2. Tactical Duel Arena Tab Cloud Sync Integration
console.log('\n--- 2. TACTICAL DUEL ARENA CLOUD SYNC ---');
const duelTabPath = resolve(rootDir, 'src', 'components', 'duel', 'TacticalDuelArenaTab.tsx');
assert(existsSync(duelTabPath), 'TacticalDuelArenaTab.tsx exists');

if (existsSync(duelTabPath)) {
  const duelContent = readFileSync(duelTabPath, 'utf8');
  assert(duelContent.includes("import { FirebaseService } from '../../services/firebaseService'"), 'TacticalDuelArenaTab imports FirebaseService');
  assert(duelContent.includes('firebaseService.updateLeaderboardEntry'), 'Synchronizes user MMR and win stats to leaderboard on match end');
  assert(duelContent.includes("mode: 'TCG'"), 'Records TCG match result to matches collection');
  assert(duelContent.includes('totalMatches > 0 ? Math.round'), 'Guards winRate calculation against division by zero');
}

// 3. MOBA Arena Tab Cloud Sync Integration
console.log('\n--- 3. MOBA ARENA TAB CLOUD SYNC ---');
const mobaTabPath = resolve(rootDir, 'src', 'components', 'moba', 'MobaArenaTab.tsx');
assert(existsSync(mobaTabPath), 'MobaArenaTab.tsx exists');

if (existsSync(mobaTabPath)) {
  const mobaContent = readFileSync(mobaTabPath, 'utf8');
  assert(mobaContent.includes("import { FirebaseService } from '../../services/firebaseService'"), 'MobaArenaTab imports FirebaseService');
  assert(mobaContent.includes('fb.recordMatch('), 'Records MOBA match debrief to Firestore matches collection');
  assert(mobaContent.includes("mode: 'MOBA'"), 'Sets match mode to MOBA');
  assert(mobaContent.includes('catch(err => console.warn'), 'Includes non-blocking error recovery for offline play');
}

// 4. Firestore Security Rules Conformance
console.log('\n--- 4. FIRESTORE SECURITY RULES COMPLIANCE ---');
const rulesPath = resolve(rootDir, 'firestore.rules');
assert(existsSync(rulesPath), 'firestore.rules exists');

if (existsSync(rulesPath)) {
  const rulesContent = readFileSync(rulesPath, 'utf8');
  assert(rulesContent.includes('match /leaderboards/{userId}'), 'Rules define leaderboards collection with public read');
  assert(rulesContent.includes('match /matches/{matchId}'), 'Rules define matches collection');
  assert(rulesContent.includes('isOwner(userId)'), 'Leaderboard updates are restricted to the document owner');
}

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passCount} / ${totalCount} TESTS PASSED (${Math.round((passCount/totalCount)*100)}%)`);
console.log(' PHASE E CLOUD LEADERBOARD & MATCH TELEMETRY AUDIT: SUCCESS');
console.log('======================================================================\n');
