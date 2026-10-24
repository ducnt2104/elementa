// test-starter-pack-50-cards.mjs
// Verification of Starter 50-Card Collection, Exact Ratios & 1,000 Knowledge Tokens

import { generateControlledStarterCollection, STARTER_COLLECTION, GameStorage } from './src/storage/localStore.ts';
import { getPlayableCardById } from './src/data/playableCardsData.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('=== VERIFYING STARTER 50-CARD PACK & 1,000 KNOWLEDGE TOKENS ===\n');

// 1. Verify Starter Generation
const starterData = generateControlledStarterCollection();
const collection = starterData.collection;
const totalCards = Object.values(collection).reduce((sum, count) => sum + count, 0);

assert(totalCards === 50, `Starter collection contains exactly 50 cards (Actual: ${totalCards})`);

// 2. Count archetypes
let monsterCount = 0;
let spellCount = 0;
let trapCount = 0;
let extraDeckMonsterCount = 0;

for (const [cardId, count] of Object.entries(collection)) {
  const card = getPlayableCardById(cardId);
  assert(card !== undefined, `Card [${cardId}] exists in canonical database`);
  assert(count <= 3, `Card [${cardId}] does not exceed 3 copies limit (Count: ${count})`);
  
  if (card) {
    if (card.cardType === 'ELEMENT_MONSTER' || card.cardType === 'COMPOUND_MONSTER' || card.cardType === 'LINK_MONSTER' || card.cardType === 'SYNCHRO_MONSTER' || card.cardType === 'XYZ_MONSTER') {
      monsterCount += count;
      if (card.cardType === 'COMPOUND_MONSTER' || card.cardType === 'LINK_MONSTER' || card.cardType === 'SYNCHRO_MONSTER' || card.cardType === 'XYZ_MONSTER') {
        extraDeckMonsterCount += count;
      }
    } else if (card.cardType === 'REACTION_SPELL' || card.cardType === 'EQUIP_CATALYST' || card.cardType === 'FIELD_ENVIRONMENT') {
      spellCount += count;
    } else if (card.cardType === 'TRAP') {
      trapCount += count;
    }
  }
}

assert(monsterCount === 28, `Monsters total exactly 28 (Actual: ${monsterCount})`);
assert(extraDeckMonsterCount === 4, `Extra Deck monsters total exactly 4 (Actual: ${extraDeckMonsterCount})`);
assert(spellCount === 14, `Spells total exactly 14 (Actual: ${spellCount})`);
assert(trapCount === 8, `Traps total exactly 8 (Actual: ${trapCount})`);

// 3. Verify Starter Deck construction
const mainDeck = starterData.mainDeck;
const extraDeck = starterData.extraDeck;

assert(mainDeck.length === 46, `Starter main deck contains exactly 46 cards (Actual: ${mainDeck.length})`);
assert(extraDeck.length === 4, `Starter extra deck contains exactly 4 cards (Actual: ${extraDeck.length})`);

// Verify all deck cards are strictly in collection with valid counts
const mainDeckCounts = {};
for (const id of mainDeck) {
  mainDeckCounts[id] = (mainDeckCounts[id] || 0) + 1;
}
for (const [id, count] of Object.entries(mainDeckCounts)) {
  assert((collection[id] || 0) >= count, `Main deck card [${id}] (x${count}) is fully owned in collection (owned: ${collection[id]})`);
}

// 4. Verify GameStorage default profile
const defaultProfile = GameStorage.loadProfile();
assert(defaultProfile.knowledgeTokens === 1000, `Default profile starts with 1,000 Knowledge Tokens (Actual: ${defaultProfile.knowledgeTokens})`);
assert(defaultProfile.starterPackClaimed === true, `Starter pack claimed flag is true`);
assert(defaultProfile.auditTransactions && defaultProfile.auditTransactions.length > 0, `Initial audit transaction log is recorded`);

const profileCollectionTotal = Object.values(defaultProfile.cardCollection || {}).reduce((s, c) => s + c, 0);
assert(profileCollectionTotal === 50, `PlayerProfile.cardCollection has exactly 50 cards total (Actual: ${profileCollectionTotal})`);

console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
