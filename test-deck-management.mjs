// test-deck-management.mjs
// Comprehensive test suite for 9-Slot Governed Deck Management Engine

import { DeckManagementService, TOTAL_DECK_SLOTS } from './src/domain/deckManagement.ts';

console.log('============================================================');
console.log('   ELEMENTA: 9-SLOT DECK GOVERNANCE & VALIDATION AUDIT');
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

// --- 1. 9-Slot Initialization & Defaults ---
console.log('--- 1. 9-Slot Initialization & Defaults ---');
const slots = DeckManagementService.loadDeckSlots();

assert(slots.length === TOTAL_DECK_SLOTS, `Deck service contains exactly 9 slots (got ${slots.length})`);
assert(slots[0].isDefault === true, 'Slot 1 is set as default by default');
assert(slots[0].name.includes('Quân Đoàn Nitơ'), `Slot 1 contains Nitro Legion pre-built archetype (got "${slots[0].name}")`);
assert(slots[1].name.includes('Lưu Huỳnh'), `Slot 2 contains Sulfur Forge pre-built archetype (got "${slots[1].name}")`);
assert(slots[2].name.includes('Kiềm'), `Slot 3 contains Alkali-Halogen Core pre-built archetype (got "${slots[2].name}")`);
assert(slots[3].name.includes('Hữu Cơ'), `Slot 4 contains Organic Synthesis pre-built archetype (got "${slots[3].name}")`);
assert(slots[7].mainDeck.length === 0, 'Slot 8 starts empty for custom build');

// --- 2. Deck Validation Rules ---
console.log('\n--- 2. Deck Validation Rules ---');
// Empty deck validation
const emptyValidation = DeckManagementService.validateDeck([]);
assert(!emptyValidation.isValid, 'Empty deck is strictly invalid');
assert(emptyValidation.errors.some(e => e.includes('tối thiểu 30')), 'Empty deck specifies min 30 card error');

// Too many cards validation (> 60)
const oversizeMain = Array(65).fill('card_elem_11_na');
const oversizeValidation = DeckManagementService.validateDeck(oversizeMain);
assert(!oversizeValidation.isValid, 'Deck > 60 cards is invalid');
assert(oversizeValidation.errors.some(e => e.includes('60')), 'Specifies max 60 card limit');

// Too many extra deck cards (> 15)
const oversizeExtra = Array(16).fill('card_comp_h2o');
const valid40 = Array(40).fill(0).map((_, i) => `card_${i % 15}`);
const extraValidation = DeckManagementService.validateDeck(valid40, oversizeExtra);
assert(!extraValidation.isValid, 'Extra deck > 15 cards is invalid');

// > 3 Copies rule
const fourCopies = ['card_elem_11_na', 'card_elem_11_na', 'card_elem_11_na', 'card_elem_11_na', ...Array(36).fill(0).map((_, i) => `card_${i}`)];
const fourCopiesValidation = DeckManagementService.validateDeck(fourCopies);
assert(!fourCopiesValidation.isValid, '4 copies of single card violates 3-copy rule');
assert(fourCopiesValidation.errors.some(e => e.includes('vượt quá giới hạn 3 bản sao')), 'Specifies 3-copy error message');

// Valid pre-built deck passes
const slot1Validation = DeckManagementService.validateDeck(slots[0].mainDeck, slots[0].extraDeck);
assert(slot1Validation.isValid, 'Pre-built Slot 1 (Nitro Legion) passes strict validation');
assert(slot1Validation.mainCount >= 30, `Slot 1 has >= 30 cards (got ${slot1Validation.mainCount})`);

// --- 3. Slot Management: Set Default, Duplicate, Reset ---
console.log('\n--- 3. Slot Management: Set Default, Duplicate, Reset ---');
// Set Default
const defaultSlots = DeckManagementService.setDefaultSlot(2);
assert(defaultSlots[2].isDefault === true, 'Successfully changed default to slot index 2');
const activeDeck = DeckManagementService.getActiveDeck();
assert(activeDeck.slotIndex === 2, `Active deck retrieved is slot index 2 (got ${activeDeck.slotIndex})`);

// Duplicate Slot 0 to Slot 4
const dupSlots = DeckManagementService.duplicateSlot(0, 4);
assert(dupSlots[4].mainDeck.length === slots[0].mainDeck.length, 'Slot 5 received full copy of main deck');
assert(dupSlots[4].name.includes('(Bản Sao)'), 'Slot 5 name reflects copied state');

// Reset Slot 4
const resetSlots = DeckManagementService.resetSlot(4);
assert(resetSlots[4].mainDeck.length === 0, 'Slot 5 main deck is now empty after reset');
assert(!resetSlots[4].isDefault, 'Reset slot is not default');

// --- 4. Out-of-Bounds Slot Safety & Boundary Defense ---
console.log('\n--- 4. Out-of-Bounds Slot Safety & Boundary Defense ---');
const countBeforeOOB = DeckManagementService.loadDeckSlots().length;
let threw = false;
try {
  DeckManagementService.saveSlot(-1, { name: 'Invalid Slot' });
  DeckManagementService.saveSlot(9, { name: 'Invalid Slot' });
  DeckManagementService.duplicateSlot(-1, 0);
  DeckManagementService.duplicateSlot(0, 15);
  DeckManagementService.resetSlot(-5);
  DeckManagementService.resetSlot(100);
} catch (e) {
  threw = true;
}
assert(!threw, 'Out-of-bounds slot operations execute safely without throwing');
const countAfterOOB = DeckManagementService.loadDeckSlots().length;
assert(countAfterOOB === countBeforeOOB, 'Slot count strictly invariant across out-of-bounds calls');

// --- 5. Active Deck Fallback Resolution Cascade ---
console.log('\n--- 5. Active Deck Fallback Resolution Cascade ---');
// If default deck is set to an empty slot (e.g. slot 4)
DeckManagementService.setDefaultSlot(4);
assert(DeckManagementService.loadDeckSlots()[4].isDefault === true, 'Slot 4 marked as default');
// getActiveDeck should fall back to first valid deck (Slot 0 or Slot 1)
const fallbackDeck = DeckManagementService.getActiveDeck();
assert(fallbackDeck.mainDeck.length >= 30, `Active deck falls back to valid deck with >= 30 cards (got ${fallbackDeck.mainDeck.length})`);
assert(fallbackDeck.slotIndex !== 4, 'Active deck does not return invalid empty slot 4');

// --- 6. Tactical Warning Diagnostics (Monster-Ratio Warnings) ---
console.log('\n--- 6. Tactical Warning Diagnostics ---');
// Low monster warning (< 10 monsters out of 30)
const lowMonsterDeck = [
  ...Array(5).fill('card_elem_11_na'), // 5 monsters (element warrior)
  ...Array(25).fill('card_spell_esterification') // 25 spells
];
const lowMonValidation = DeckManagementService.validateDeck(lowMonsterDeck, []);
assert(lowMonValidation.warnings.some(w => w.includes('< 10')), 'Generates warning when monsters < 10');

// High monster warning (> 25 monsters out of 30)
const highMonsterDeck = [
  ...Array(26).fill('card_elem_11_na'), // 26 monsters
  ...Array(4).fill('card_spell_esterification') // 4 spells
];
const highMonValidation = DeckManagementService.validateDeck(highMonsterDeck, []);
assert(highMonValidation.warnings.some(w => w.includes('quá cao')), 'Generates warning when monsters > 25');

// --- 7. Favorite Flag & Metadata Modification ---
console.log('\n--- 7. Favorite Flag & Metadata Modification ---');
const modSlots = DeckManagementService.saveSlot(1, {
  isFavorite: true,
  coverCardId: 'card_elem_16_s',
  name: 'Lò Luyện Lưu Huỳnh VIP'
});
assert(modSlots[1].isFavorite === true, 'Successfully toggled isFavorite to true');
assert(modSlots[1].coverCardId === 'card_elem_16_s', 'Successfully updated cover card ID to Sulfur');
assert(modSlots[1].name === 'Lò Luyện Lưu Huỳnh VIP', 'Successfully renamed deck slot');

// --- 8. Deck Export Serialization & Checksum Integrity ---
console.log('\n--- 8. Deck Export Serialization & Checksum Integrity ---');
const exportCodeSlot0 = DeckManagementService.exportDeckToString(0);
assert(typeof exportCodeSlot0 === 'string', 'Export returns string payload');
assert(exportCodeSlot0.startsWith('ELM-DECK-'), 'Export code adheres to "ELM-DECK-" prefix standard');
assert(exportCodeSlot0.length > 50, `Export code has valid payload length (got ${exportCodeSlot0.length} chars)`);

// --- 9. Deck Import Validation, Checksum Verification & Corruption Defense ---
console.log('\n--- 9. Deck Import Validation & Tamper Defense ---');
// Import into slot 5 (currently empty)
const importRes = DeckManagementService.importDeckFromString(5, exportCodeSlot0);
assert(importRes.success === true, 'Successfully imported deck into slot 5');
assert(importRes.deck.mainDeck.length === slots[0].mainDeck.length, `Imported main deck card count matches original (${importRes.deck.mainDeck.length})`);
assert(importRes.deck.name === slots[0].name, 'Imported deck name correctly restored');

// Invalid prefix test
const invalidPrefixRes = DeckManagementService.importDeckFromString(5, 'INVALID_DECK_CODE_XYZ');
assert(!invalidPrefixRes.success, 'Import rejects codes missing ELM-DECK- prefix');
assert(invalidPrefixRes.error.includes('tiền tố ELM-DECK-'), 'Error identifies missing prefix');

// Checksum tampering test (modify payload data)
const base64Part = exportCodeSlot0.substring('ELM-DECK-'.length);
const decodedJson = Buffer.from(base64Part, 'base64').toString('utf-8');
const tamperedPayload = JSON.parse(decodedJson);
tamperedPayload.main.push('card_cheat_forbidden_nuke'); // Inject card without updating checksum
const tamperedBase64 = Buffer.from(JSON.stringify(tamperedPayload), 'utf-8').toString('base64');
const tamperedCode = `ELM-DECK-${tamperedBase64}`;

const tamperRes = DeckManagementService.importDeckFromString(6, tamperedCode);
assert(!tamperRes.success, 'Import strictly rejects tampered payload with invalid checksum');
assert(tamperRes.error.includes('Checksum không khớp'), 'Error diagnostic identifies checksum mismatch');

// Out of bounds slot index import
const oobImport = DeckManagementService.importDeckFromString(99, exportCodeSlot0);
assert(!oobImport.success, 'Import rejects out-of-bounds slot index');

// --- 10. Bulk Card Removal Operations ---
console.log('\n--- 10. Bulk Card Removal Operations ---');
// In slot 5, let's remove two cards
const initialSlot5Count = DeckManagementService.loadDeckSlots()[5].mainDeck.length;
const cardToRemove = DeckManagementService.loadDeckSlots()[5].mainDeck[0];
const postRemoveSlots = DeckManagementService.removeCardsFromSlot(5, [cardToRemove], 'main');
assert(postRemoveSlots[5].mainDeck.length === initialSlot5Count - 1, `Removed exactly 1 instance of card (from ${initialSlot5Count} to ${postRemoveSlots[5].mainDeck.length})`);

// --- 11. Bulk Card Addition with Strict Capacity & 3-Copy Enforcement ---
console.log('\n--- 11. Bulk Card Addition with Strict Capacity & 3-Copy Enforcement ---');
// Add 1 card safely
const addRes1 = DeckManagementService.addCardsToSlot(5, [cardToRemove], 'main');
assert(addRes1.success === true && addRes1.addedCount === 1, 'Successfully added 1 card back into slot 5');
assert(addRes1.rejectedCards.length === 0, 'No cards rejected on valid addition');

// Attempt to add a 4th copy of an already 3-copy card
// Find a card with 3 copies in slot 5
const counts = {};
DeckManagementService.loadDeckSlots()[5].mainDeck.forEach(c => { counts[c] = (counts[c] || 0) + 1; });
const threeCopyCard = Object.keys(counts).find(c => counts[c] === 3);
if (threeCopyCard) {
  const addOverCopyRes = DeckManagementService.addCardsToSlot(5, [threeCopyCard], 'main');
  assert(addOverCopyRes.addedCount === 0, 'Adding 4th copy strictly prevented');
  assert(addOverCopyRes.rejectedCards.length === 1, 'Rejected list records rejected 4th copy card');
  assert(addOverCopyRes.rejectedCards[0].includes('đã đủ 3 bản sao'), 'Rejection reason states max 3 copies limit');
}

// --- 12. Master Rule 15-Card Side Deck & 1-to-1 Tactical Swapping (Rulebook v10 tr. 6) ---
console.log('\n--- 12. Master Rule 15-Card Side Deck & 1-to-1 Tactical Swapping ---');
const currentSlots = DeckManagementService.loadDeckSlots();
const nitroSlot = currentSlots[0];
assert(Array.isArray(nitroSlot.sideDeck), 'Pre-built slot 0 contains initialized sideDeck array');
assert(nitroSlot.sideDeck.length <= 15, `Pre-built sideDeck respects <= 15 card limit (got ${nitroSlot.sideDeck.length})`);

// 1. Oversize Side Deck (> 15) is rejected
const oversizeSide = Array(16).fill('card_comp_h2o');
const sideOverValidation = DeckManagementService.validateDeck(nitroSlot.mainDeck, nitroSlot.extraDeck, oversizeSide);
assert(!sideOverValidation.isValid, 'Side Deck with 16 cards is strictly invalid');
assert(sideOverValidation.errors.some(e => e.includes('Side Deck vượt quá giới hạn')), 'Specifies max 15 side deck cards error');

// 2. 4th copy across Main + Side Deck combined is rejected
// nitroSlot already has 3x card_elem_7_n in mainDeck. If sideDeck has 1x card_elem_7_n -> total 4 copies!
const crossDeck4CopiesSide = ['card_elem_7_n'];
const crossDeckValidation = DeckManagementService.validateDeck(nitroSlot.mainDeck, nitroSlot.extraDeck, crossDeck4CopiesSide);
assert(!crossDeckValidation.isValid, '3 copies in Main + 1 copy in Side (4 total) violates global 3-copy rule');
assert(crossDeckValidation.errors.some(e => e.includes('vượt quá giới hạn 3 bản sao')), 'Specifies combined 3-copy violation');

// 3. 1-to-1 Side Deck Swap preserves exact deck sizes
const origMainCount = nitroSlot.mainDeck.length;
const origSideCount = nitroSlot.sideDeck.length;
const cardToSwapOut = nitroSlot.mainDeck.find(id => id !== 'card_elem_7_n' && id !== 'card_comp_hno3_acid');
const sideCardToSwapIn = nitroSlot.sideDeck[0];

assert(Boolean(cardToSwapOut), 'Identified suitable Main Deck card for side-deck swap');
assert(Boolean(sideCardToSwapIn), 'Identified suitable Side Deck card for swap');

const swapResult = DeckManagementService.swapCardsWithSideDeck(0, cardToSwapOut, sideCardToSwapIn, 'MAIN');
assert(swapResult.success === true, 'swapCardsWithSideDeck executed successfully');
assert(swapResult.updatedSlot.mainDeck.length === origMainCount, `Main Deck size preserved at exact ${origMainCount}`);
assert(swapResult.updatedSlot.sideDeck.length === origSideCount, `Side Deck size preserved at exact ${origSideCount}`);
assert(swapResult.updatedSlot.mainDeck.includes(sideCardToSwapIn), 'Incoming side card is now in Main Deck');
assert(swapResult.updatedSlot.sideDeck.includes(cardToSwapOut), 'Outgoing main card is now in Side Deck');

// 4. Reject swapping non-existent card
const invalidSwap = DeckManagementService.swapCardsWithSideDeck(0, 'card_fake_ghost_card', sideCardToSwapIn, 'MAIN');
assert(!invalidSwap.success, 'Rejects swapping non-existent original card');

// --- 13. Portable Deck Code Serialization & Versioned Import/Export (v1 & v2 with Side Deck) ---
console.log('\n--- 13. Deck Code Serialization & Versioned Import/Export ---');

// 1. Export slot 0 with side deck
const slot0 = DeckManagementService.loadDeckSlots()[0];
const exportedCode = DeckManagementService.exportDeckToString(0);
assert(typeof exportedCode === 'string', 'exportDeckToString produces string output');
assert(exportedCode.startsWith('ELM-DECK-'), 'Export code starts with canonical ELM-DECK- prefix');

// 2. Decode payload directly to inspect version and integrity
const v2Base64Data = exportedCode.substring('ELM-DECK-'.length);
const v2DecodedJson = JSON.parse(Buffer.from(v2Base64Data, 'base64').toString('utf-8'));
assert(v2DecodedJson.v === 2, 'Exported payload uses schema version 2 (with side deck)');
assert(Array.isArray(v2DecodedJson.side), 'Exported payload includes side array');
assert(v2DecodedJson.side.length === slot0.sideDeck.length, `Exported side deck preserves count (${v2DecodedJson.side.length})`);
assert(typeof v2DecodedJson.checksum === 'number', 'Exported payload contains FNV-1a numeric checksum');

// 3. Import valid v2 code into target slot 8 (which was initially empty or pre-built)
const resetBeforeImport = DeckManagementService.resetSlot(8);
assert(resetBeforeImport[8].mainDeck.length === 0, 'Slot 8 reset to 0 cards before import');

const importResult = DeckManagementService.importDeckFromString(8, exportedCode);
assert(importResult.success === true, 'importDeckFromString succeeds with valid v2 code');
assert(Boolean(importResult.deck), 'importResult returns imported deck object');

const slot8AfterImport = DeckManagementService.loadDeckSlots()[8];
assert(slot8AfterImport.name === slot0.name, `Slot 8 imported correct deck name ("${slot8AfterImport.name}")`);
assert(slot8AfterImport.mainDeck.length === slot0.mainDeck.length, `Slot 8 Main Deck matches original (${slot8AfterImport.mainDeck.length})`);
assert(slot8AfterImport.extraDeck.length === slot0.extraDeck.length, `Slot 8 Extra Deck matches original (${slot8AfterImport.extraDeck.length})`);
assert(slot8AfterImport.sideDeck.length === slot0.sideDeck.length, `Slot 8 Side Deck matches original (${slot8AfterImport.sideDeck.length})`);

// 4. Backwards compatibility: Import legacy v1 code (without side deck field)
// Construct a canonical v1 payload manually
const v1PayloadData = {
  name: 'Bộ Bài Di Sản V1 (Legacy Deck)',
  main: ['card_elem_1_h', 'card_elem_8_o', 'card_comp_h2o'],
  extra: ['card_link_2_ethylene']
};
// Calculate FNV-1a checksum of JSON string
let hash = 2166136261;
const v1JsonStr = JSON.stringify(v1PayloadData);
for (let i = 0; i < v1JsonStr.length; i++) {
  hash ^= v1JsonStr.charCodeAt(i);
  hash = Math.imul(hash, 16777619);
}
const v1Checksum = hash >>> 0;
const v1FullPayload = {
  v: 1,
  name: v1PayloadData.name,
  main: v1PayloadData.main,
  extra: v1PayloadData.extra,
  checksum: v1Checksum
};
const v1Code = `ELM-DECK-${Buffer.from(JSON.stringify(v1FullPayload), 'utf-8').toString('base64')}`;

const v1ImportResult = DeckManagementService.importDeckFromString(7, v1Code);
assert(v1ImportResult.success === true, 'importDeckFromString successfully imports legacy v1 code');
const slot7AfterV1 = DeckManagementService.loadDeckSlots()[7];
assert(slot7AfterV1.name === 'Bộ Bài Di Sản V1 (Legacy Deck)', 'Legacy v1 deck name correctly imported');
assert(slot7AfterV1.mainDeck.length === 3, 'Legacy v1 Main Deck correctly populated');
assert(slot7AfterV1.extraDeck.length === 1, 'Legacy v1 Extra Deck correctly populated');
assert(Array.isArray(slot7AfterV1.sideDeck) && slot7AfterV1.sideDeck.length === 0, 'Legacy v1 gracefully defaults sideDeck to empty array');

// 5. Tamper detection: altered payload checksum mismatch
const v2TamperedPayload = { ...v2DecodedJson, main: [...v2DecodedJson.main, 'card_elem_79_au'] }; // added card without updating checksum
const v2TamperedCode = `ELM-DECK-${Buffer.from(JSON.stringify(v2TamperedPayload), 'utf-8').toString('base64')}`;
const v2TamperedImportResult = DeckManagementService.importDeckFromString(8, v2TamperedCode);
assert(v2TamperedImportResult.success === false, 'Tampered payload with invalid checksum is strictly rejected');
assert(v2TamperedImportResult.error.includes('Checksum không khớp'), 'Error specifically indicates checksum tampering detection');

// 6. Invalid prefix rejection
const badPrefixCode = `INVALID-PREFIX-${v2Base64Data}`;
const badPrefixResult = DeckManagementService.importDeckFromString(8, badPrefixCode);
assert(badPrefixResult.success === false, 'Rejects code without ELM-DECK- prefix');

// 7. Malformed Base64 rejection
const malformedCode = `ELM-DECK-!!NotBase64@@`;
const malformedResult = DeckManagementService.importDeckFromString(8, malformedCode);
assert(malformedResult.success === false, 'Rejects malformed non-Base64 code');

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================\n');

if (failed > 0) {
  process.exit(1);
}
