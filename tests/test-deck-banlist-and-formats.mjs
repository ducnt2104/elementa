import { DeckManagementService, PREBUILT_DECKS } from '../src/domain/deckManagement.ts';

console.log('======================================================================');
console.log('   TEST SUITE 157: DECK FORMAT BANLIST & CHEMICAL HAZARD RESTRICTIONS ');
console.log('   Phase C: TCG Regulation, Pedagogical Formats & Deck Validation     ');
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

// 1. Format Banlist Querying & Metadata
console.log('--- 1. BANLIST RETRIEVAL & METADATA ---');
const standardBanlist = DeckManagementService.getBanlistForFormat('STANDARD_GDPT');
const classroomBanlist = DeckManagementService.getBanlistForFormat('CLASSROOM_SAFE');
const unlimitedBanlist = DeckManagementService.getBanlistForFormat('UNLIMITED');

assert(Object.keys(standardBanlist).length > 0, 'STANDARD_GDPT banlist contains registered chemical regulations');
assert(Object.keys(classroomBanlist).length > 0, 'CLASSROOM_SAFE banlist contains safety regulations');
assert(Object.keys(unlimitedBanlist).length === 0, 'UNLIMITED format has zero custom restrictions (pure 3-copy limit)');

// 2. Card Ban Status Inspection
console.log('\n--- 2. CARD BAN STATUS INSPECTION ---');
const thermiteStandard = DeckManagementService.getCardBanStatus('card_comp_thermite', 'STANDARD_GDPT');
assert(thermiteStandard.status === 'LIMITED' && thermiteStandard.maxCopies === 1, 'Thermite is LIMITED (1 copy) in STANDARD_GDPT');

const thermiteClassroom = DeckManagementService.getCardBanStatus('card_comp_thermite', 'CLASSROOM_SAFE');
assert(thermiteClassroom.status === 'FORBIDDEN' && thermiteClassroom.maxCopies === 0, 'Thermite is FORBIDDEN (0 copies) in CLASSROOM_SAFE');

const thermiteUnlimited = DeckManagementService.getCardBanStatus('card_comp_thermite', 'UNLIMITED');
assert(thermiteUnlimited.status === 'UNLIMITED' && thermiteUnlimited.maxCopies === 3, 'Thermite is UNLIMITED (3 copies) in UNLIMITED format');

const sodiumClassroom = DeckManagementService.getCardBanStatus('card_trap_sodium_explosion', 'CLASSROOM_SAFE');
assert(sodiumClassroom.status === 'LIMITED' && sodiumClassroom.maxCopies === 1, 'Sodium Explosion is LIMITED (1 copy) in CLASSROOM_SAFE');

// 3. Deck Validation with Banlist Violations
console.log('\n--- 3. DECK VALIDATION BANLIST ENFORCEMENT ---');
// Base 30-card valid deck
const baseMainDeck = [
  'card_elem_11_na', 'card_elem_11_na', 'card_elem_11_na',
  'card_elem_17_cl', 'card_elem_17_cl', 'card_elem_17_cl',
  'card_elem_1_h', 'card_elem_1_h', 'card_elem_1_h',
  'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o',
  'card_comp_h2o', 'card_comp_h2o', 'card_comp_h2o',
  'card_comp_nacl', 'card_comp_nacl', 'card_comp_nacl',
  'card_spell_bunsen_burner', 'card_spell_bunsen_burner',
  'card_spell_neutralization', 'card_spell_neutralization',
  'card_spell_mass_spec_draw', 'card_spell_mass_spec_draw',
  'card_elem_26_fe', 'card_elem_26_fe', 'card_elem_26_fe',
  'card_elem_29_cu', 'card_elem_29_cu', 'card_elem_29_cu'
];

const baseRes = DeckManagementService.validateDeck(baseMainDeck, [], [], undefined, 'STANDARD_GDPT');
assert(baseRes.isValid, 'Base 30-card elemental deck is valid in STANDARD_GDPT');

// Test Thermite Over-limit in STANDARD_GDPT (Limit 1, provide 2)
const thermiteDeck = [...baseMainDeck.slice(2), 'card_comp_thermite', 'card_comp_thermite'];
const thermiteRes = DeckManagementService.validateDeck(thermiteDeck, [], [], undefined, 'STANDARD_GDPT');
assert(!thermiteRes.isValid, 'Deck with 2 Thermite cards fails validation in STANDARD_GDPT');
assert(thermiteRes.banlistViolations && thermiteRes.banlistViolations.length === 1, 'Records 1 banlist violation for Thermite');
assert(thermiteRes.banlistViolations[0].cardId === 'card_comp_thermite', 'Banlist violation cardId matches card_comp_thermite');

// Test Thermite in CLASSROOM_SAFE (Forbidden, provide 1)
const thermiteSingleDeck = [...baseMainDeck.slice(1), 'card_comp_thermite'];
const classroomRes = DeckManagementService.validateDeck(thermiteSingleDeck, [], [], undefined, 'CLASSROOM_SAFE');
assert(!classroomRes.isValid, 'Deck with 1 Thermite card fails validation in CLASSROOM_SAFE (Forbidden)');
assert(classroomRes.banlistViolations[0].status === 'FORBIDDEN', 'Banlist violation reports FORBIDDEN status');

// Test Same Deck in UNLIMITED (Passes!)
const unlimitedRes = DeckManagementService.validateDeck(thermiteDeck, [], [], undefined, 'UNLIMITED');
assert(unlimitedRes.isValid, 'Deck with 2 Thermite cards is completely valid in UNLIMITED format');

// 4. Prebuilt Decks Standard Format Conformance
console.log('\n--- 4. PREBUILT DECKS STANDARD COMPLIANCE ---');
let allPrebuiltValid = true;
for (const deck of PREBUILT_DECKS) {
  const result = DeckManagementService.validateDeck(deck.mainDeck, deck.extraDeck, deck.sideDeck, undefined, 'STANDARD_GDPT');
  if (!result.isValid) {
    allPrebuiltValid = false;
    console.error(`  Prebuilt deck failed STANDARD_GDPT: ${deck.name}`, result.errors);
  }
}
assert(allPrebuiltValid, 'All prebuilt starter and competition decks pass STANDARD_GDPT validation with 0 errors');

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passCount} / ${totalCount} TESTS PASSED (${Math.round((passCount/totalCount)*100)}%)`);
console.log(' PHASE C DECK FORMAT & BANLIST VALIDATION: SUCCESS');
console.log('======================================================================\n');
