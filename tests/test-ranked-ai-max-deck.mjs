// test-ranked-ai-max-deck.mjs
// Verification of Dynamic Ranked AI 60-Card Max Deck Generation from Entire 7,300+ Catalog

import { generateRankedAiMaxDeck, DuelEngine } from '../src/domain/duelEngine.ts';
import { getPlayableCardById, PLAYABLE_CARDS } from '../src/data/playableCardsData.ts';
import { GameStorage } from '../src/storage/localStore.ts';

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

console.log('============================================================');
console.log('   ELEMENTA: RANKED VS AI 60-CARD BOT DECK GENERATION AUDIT');
console.log('============================================================\n');

// 1. Verify Deck Size
const deckResult = generateRankedAiMaxDeck(12345);
assert(deckResult.mainDeck.length === 60, `Ranked AI Main Deck contains EXACTLY 60 cards (got ${deckResult.mainDeck.length})`);
assert(deckResult.extraDeck.length === 15, `Ranked AI Extra Deck contains EXACTLY 15 cards (got ${deckResult.extraDeck.length})`);
assert(deckResult.metadata.seed === 12345, `Metadata tracks seed correctly (got ${deckResult.metadata.seed})`);

// 2. Verify all cards exist in canonical catalog
let allExist = true;
let invalidCard = '';
for (const cid of [...deckResult.mainDeck, ...deckResult.extraDeck]) {
  const c = getPlayableCardById(cid);
  if (!c) {
    allExist = false;
    invalidCard = cid;
    break;
  }
}
assert(allExist, `All 75 cards exist in PLAYABLE_CARDS catalog (first invalid: ${invalidCard || 'none'})`);

// 3. Verify maximum 3 copies rule in Main Deck
const counts = {};
for (const cid of deckResult.mainDeck) {
  counts[cid] = (counts[cid] || 0) + 1;
}
const maxCopies = Math.max(...Object.values(counts));
assert(maxCopies <= 3, `No card in Main Deck exceeds maximum 3 copies limit (max copies: ${maxCopies})`);

// 4. Verify archetype balance (Monsters, Spells, Traps)
let monsters = 0;
let spells = 0;
let traps = 0;
for (const cid of deckResult.mainDeck) {
  const c = getPlayableCardById(cid);
  if (['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT', 'SPELL'].includes(c.cardType)) {
    spells++;
  } else if (c.cardType === 'TRAP') {
    traps++;
  } else {
    monsters++;
  }
}
assert(monsters >= 25 && monsters <= 40, `Healthy monster ratio in 60-card deck (actual: ${monsters} monsters)`);
assert(spells >= 12 && spells <= 22, `Healthy spell ratio in 60-card deck (actual: ${spells} spells)`);
assert(traps >= 8 && traps <= 18, `Healthy trap ratio in 60-card deck (actual: ${traps} traps)`);

// 5. Verify Randomization Across Distinct Matches
const deckMatch1 = generateRankedAiMaxDeck(111);
const deckMatch2 = generateRankedAiMaxDeck(999);
const match1First5 = deckMatch1.mainDeck.slice(0, 10).join(',');
const match2First5 = deckMatch2.mainDeck.slice(0, 10).join(',');
assert(match1First5 !== match2First5, `Different seeds produce dynamically different decks across matches`);

// 6. Verify DuelEngine integration with RANKED_AI level
const engine = new DuelEngine(undefined, undefined, 'RANKED_AI');
assert(engine.opponent.name.includes('AI Hạng'), `Opponent name reflects Ranked AI (actual: "${engine.opponent.name}")`);
// Opponent starts with 5 cards drawn from 60 deck = 55 in deck + 5 in hand = 60
const totalOpponentCards = engine.opponent.deck.length + engine.opponent.hand.length;
assert(totalOpponentCards === 60, `DuelEngine opponent deck + hand initialized to 60 cards total (actual: ${totalOpponentCards})`);
assert(engine.opponent.extraDeck.length === 15, `DuelEngine opponent Extra Deck initialized to 15 cards (actual: ${engine.opponent.extraDeck.length})`);

// 7. Verify Zero Alteration to Player Profile
const profileBefore = GameStorage.loadProfile();
const cardsBefore = Object.values(profileBefore.cardCollection || {}).reduce((s, c) => s + c, 0);
generateRankedAiMaxDeck();
const profileAfter = GameStorage.loadProfile();
const cardsAfter = Object.values(profileAfter.cardCollection || {}).reduce((s, c) => s + c, 0);
assert(cardsBefore === cardsAfter, `Bot deck generation leaves player collection completely untouched (count: ${cardsAfter})`);

console.log('\n============================================================');
console.log(` RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================');

if (failed > 0) process.exit(1);
