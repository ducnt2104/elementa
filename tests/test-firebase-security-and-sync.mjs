// tests/test-firebase-security-and-sync.mjs
// Verifies Cloud Firestore Security Rules integrity, collection schemas, and client SDK contracts

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('--- TEST: Firebase Security Rules & Service Contract Audit ---');

// 1. Audit firestore.rules
console.log('1. Auditing firestore.rules security posture...');
const rulesPath = path.join(rootDir, 'firestore.rules');
assert.ok(fs.existsSync(rulesPath), 'firestore.rules must exist');

const rulesContent = fs.readFileSync(rulesPath, 'utf-8');

// A. Must use rules_version = '2'
assert.ok(rulesContent.includes("rules_version = '2'"), 'Must enforce rules_version 2');

// B. Must enforce default deny
assert.ok(
  rulesContent.includes('match /{document=**}') && rulesContent.includes('allow read, write: if false'),
  'Must enforce default deny for all unmatched paths'
);

// C. Must isolate user profiles: request.auth.uid == userId
assert.ok(
  rulesContent.includes('request.auth.uid == userId') || rulesContent.includes('isOwner(userId)'),
  'Must enforce owner isolation for users/{userId}'
);

// D. Must enforce deck constraints (e.g. mainDeck size between 30 and 60)
assert.ok(
  rulesContent.includes('mainDeck') && (rulesContent.includes('30') || rulesContent.includes('size()')),
  'Must enforce Master Rule deck size constraints'
);

// E. Must protect shop transactions against update/delete (tamper-proof ledger)
assert.ok(
  rulesContent.includes('shop_transactions') && rulesContent.includes('allow update, delete: if false'),
  'Shop transactions must be append-only (tamper-proof financial ledger)'
);

// F. No wildcard insecure rules allowed
assert.ok(!rulesContent.includes('allow read, write: if true'), 'INSECURE RULE DETECTED: allow read, write: if true is forbidden');

console.log('   ✓ firestore.rules enforces Default Deny, Owner Isolation, Deck validation, and Append-Only ledger');

// 2. Audit firestore.indexes.json
console.log('2. Auditing firestore.indexes.json...');
const indexesPath = path.join(rootDir, 'firestore.indexes.json');
assert.ok(fs.existsSync(indexesPath), 'firestore.indexes.json must exist');

const indexesJson = JSON.parse(fs.readFileSync(indexesPath, 'utf-8'));
assert.ok(Array.isArray(indexesJson.indexes), 'Indexes must be an array');
const collectionGroups = indexesJson.indexes.map(idx => idx.collectionGroup);
assert.ok(collectionGroups.includes('decks'), 'Indexes must include decks');
assert.ok(collectionGroups.includes('matches'), 'Indexes must include matches');
console.log(`   ✓ firestore.indexes.json contains ${indexesJson.indexes.length} composite indexes`);

// 3. Audit firebaseConfig.ts and firebaseService.ts
console.log('3. Auditing Firebase client SDK services...');
const fbConfigPath = path.join(rootDir, 'src', 'services', 'firebaseConfig.ts');
const fbServicePath = path.join(rootDir, 'src', 'services', 'firebaseService.ts');
assert.ok(fs.existsSync(fbConfigPath), 'firebaseConfig.ts must exist');
assert.ok(fs.existsSync(fbServicePath), 'firebaseService.ts must exist');

const fbServiceContent = fs.readFileSync(fbServicePath, 'utf-8');
assert.ok(fbServiceContent.includes('signInAsGuest'), 'firebaseService must implement signInAsGuest');
assert.ok(fbServiceContent.includes('loginWithEmail'), 'firebaseService must implement loginWithEmail');
assert.ok(fbServiceContent.includes('registerWithEmail'), 'firebaseService must implement registerWithEmail');
assert.ok(fbServiceContent.includes('saveProfile'), 'firebaseService must implement saveProfile');
assert.ok(fbServiceContent.includes('loadProfile'), 'firebaseService must implement loadProfile');
assert.ok(fbServiceContent.includes('saveDecks'), 'firebaseService must implement saveDecks');
assert.ok(fbServiceContent.includes('saveCollection'), 'firebaseService must implement saveCollection');
assert.ok(fbServiceContent.includes('recordMatch'), 'firebaseService must implement recordMatch');
console.log('   ✓ firebaseService implements all required cloud persistence and auth methods');

console.log('\n>>> ALL FIREBASE SECURITY & CONTRACT AUDITS PASSED! <<<');
