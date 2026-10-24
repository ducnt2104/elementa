// test-deck-presets-gdpt.mjs
// Verification of GDPT 2018 Tournament Prebuilt Decks & Golden Ratio Deck Balance (TSK-P2-03)

import {
  PREBUILT_DECKS,
  DeckManagementService
} from '../src/domain/deckManagement.ts';
import { getPlayableCardById } from '../src/data/playableCardsData.ts';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('=== TEST SUITE: GDPT 2018 TOURNAMENT DECK PRESETS (TSK-P2-03) ===\n');

// 1. Total Prebuilt Decks Count
console.log('--- 1. Prebuilt Decks Inventory ---');
assert(PREBUILT_DECKS.length >= 7, `At least 7 prebuilt tournament decks available (got ${PREBUILT_DECKS.length})`);

// 2. Specific GDPT 2018 Grade-Level Decks Exist
console.log('\n--- 2. GDPT 2018 Grade-Level Decks ---');
const khtn8Deck = PREBUILT_DECKS.find(d => d.id === 'deck_slot_khtn_8');
const khtn9Deck = PREBUILT_DECKS.find(d => d.id === 'deck_slot_khtn_9');
const hoa10Deck = PREBUILT_DECKS.find(d => d.id === 'deck_slot_hoa_10');

assert(khtn8Deck !== undefined, 'KHTN 8 Prebuilt Deck exists');
assert(khtn9Deck !== undefined, 'KHTN 9 Prebuilt Deck exists');
assert(hoa10Deck !== undefined, 'Hóa 10 Prebuilt Deck exists');

// 3. Card Existence & Rule Compliance for Every Prebuilt Deck
console.log('\n--- 3. Strict Card Verification & 3-Copy Rule ---');
PREBUILT_DECKS.forEach(deck => {
  const allCards = [...deck.mainDeck, ...deck.extraDeck, ...(deck.sideDeck || [])];
  
  // Verify all card IDs exist in catalog
  const missingCards = allCards.filter(id => !getPlayableCardById(id));
  assert(missingCards.length === 0, `${deck.name}: All cards exist in catalog (missing: ${missingCards.join(', ') || 'none'})`);

  // Verify 3-copy rule
  const counts = {};
  for (const id of allCards) {
    counts[id] = (counts[id] || 0) + 1;
  }
  const overThree = Object.keys(counts).filter(id => counts[id] > 3);
  assert(overThree.length === 0, `${deck.name}: Adheres to max 3 copies limit (violations: ${overThree.join(', ') || 'none'})`);

  // Verify Main Deck sizing
  assert(deck.mainDeck.length >= 30 && deck.mainDeck.length <= 60, `${deck.name}: Main Deck size in [30, 60] (got ${deck.mainDeck.length})`);
  assert(deck.extraDeck.length <= 15, `${deck.name}: Extra Deck size <= 15 (got ${deck.extraDeck.length})`);

  // Verify Golden Ratio synergy analysis runs smoothly
  const synergy = DeckManagementService.analyzeDeckSynergy(deck.mainDeck, deck.extraDeck);
  assert(synergy.goldenRatio !== undefined, `${deck.name}: Golden Ratio analysis calculated`);
  assert(synergy.goldenRatio.attackCount > 0, `${deck.name}: Has offensive attack ratio (${synergy.goldenRatio.actualRatio})`);
});

console.log(`\n========================================`);
console.log(`TOTAL PASSED: ${passCount}`);
console.log(`TOTAL FAILED: ${failCount}`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('ALL GDPT 2018 TOURNAMENT DECK PRESET TESTS PASSED 100%!');
}
