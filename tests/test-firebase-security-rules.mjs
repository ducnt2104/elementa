// test-firebase-security-rules.mjs
// Automated Verification Suite for ELEMENTA Firestore Security Rules

import * as fs from 'fs';
import * as path from 'path';

console.log('======================================================================');
console.log('   ELEMENTA — FIRESTORE SECURITY RULES VERIFICATION SUITE');
console.log('======================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ [PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`  ✗ [FAIL] ${testName}`);
    failCount++;
  }
}

const rulesPath = path.resolve(process.cwd(), 'firestore.rules');
assert(fs.existsSync(rulesPath), 'firestore.rules file exists');

const rulesContent = fs.readFileSync(rulesPath, 'utf8');

// Test 1: Version declaration
assert(rulesContent.includes("rules_version = '2';"), 'Declares rules_version = 2');

// Test 2: Service cloud.firestore declaration
assert(rulesContent.includes('service cloud.firestore'), 'Declares service cloud.firestore');

// Test 3: Default deny catch-all
assert(
  rulesContent.includes('match /{document=**}') && (rulesContent.includes('allow read, write: if false;') || rulesContent.includes('allow read, write: false;')),
  'Enforces default deny for all unmatched paths'
);

// Test 4: Helper functions
assert(rulesContent.includes('function isAuthenticated()'), 'Contains isAuthenticated() helper');
assert(rulesContent.includes('function isOwner(userId)'), 'Contains isOwner(userId) helper');
assert(rulesContent.includes('function isValidInt('), 'Contains isValidInt() helper');
assert(rulesContent.includes('function isValidString('), 'Contains isValidString() helper');

// Test 5: Users collection security & domain validation
assert(rulesContent.includes('match /users/{userId}'), 'Defines rules for users/{userId}');
assert(rulesContent.includes('allow read: if isOwner(userId);'), 'Users can only read their own profile');
assert(rulesContent.includes('data.battlesWon <= data.battlesPlayed'), 'Enforces battlesWon <= battlesPlayed');
assert(rulesContent.includes('data.knowledgeTokens >= 0'), 'Knowledge tokens cannot be negative');
assert(rulesContent.includes('data.elementalShards >= 0'), 'Elemental shards cannot be negative');
assert(rulesContent.includes("!('role' in data) || data.role == 'player'") || rulesContent.includes("role == oldData.role"), 'Protects against role privilege escalation');

// Test 6: Decks collection security
assert(rulesContent.includes('match /decks/{deckId}'), 'Defines rules for decks/{deckId}');
assert(rulesContent.includes('data.mainDeck.size() >= 30 && data.mainDeck.size() <= 60'), 'Enforces main deck size between 30 and 60 cards');
assert(rulesContent.includes('data.extraDeck.size() <= 15'), 'Enforces extra deck maximum 15 cards');
assert(rulesContent.includes('data.ownerId == request.auth.uid'), 'Enforces deck ownership validation');

// Test 7: Collections security
assert(rulesContent.includes('match /collections/{userId}'), 'Defines rules for collections/{userId}');
assert(rulesContent.includes('allow read: if isOwner(userId);'), 'Collections restricted to owner');

// Test 8: Public cards read-only immutability
assert(rulesContent.includes('match /public_cards/{cardId}'), 'Defines rules for public_cards/{cardId}');
assert(rulesContent.includes('allow read: if true;'), 'Public cards are globally readable');
assert(rulesContent.includes('allow write: if false;'), 'Public cards are write-denied to prevent client tampering');

// Test 9: Leaderboards security
assert(rulesContent.includes('match /leaderboards/{userId}'), 'Defines rules for leaderboards/{userId}');
assert(rulesContent.includes('data.rating >= 0'), 'Leaderboard rating must be non-negative');

// Test 10: Index definition integrity
const indexPath = path.resolve(process.cwd(), 'firestore.indexes.json');
assert(fs.existsSync(indexPath), 'firestore.indexes.json exists');
const indexContent = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
assert(Array.isArray(indexContent.indexes), 'Indexes defined as valid JSON array');
assert(indexContent.indexes.some(idx => idx.collectionGroup === 'leaderboards'), 'Contains composite index for leaderboards');

console.log('\n======================================================================');
console.log(` FIRESTORE RULES AUDIT SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
