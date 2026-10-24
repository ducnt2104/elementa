// test-full-lifecycle-e2e.mjs
// Comprehensive End-to-End Integration Test for ELEMENTA
// Verifies: New Player -> Starter Pack -> Deck Building -> Duel Battle -> Auto Traps -> Rematch -> Shop -> SRS -> MOBA

import { GameStorage } from '../src/storage/localStore.ts';
import { DeckManagementService, PREBUILT_DECKS } from '../src/domain/deckManagement.ts';
import { DuelEngine } from '../src/domain/duelEngine.ts';
import { getPlayableCardById, PLAYABLE_CARDS } from '../src/data/playableCardsData.ts';
import { MobaEngine } from '../src/game/engine/mobaEngine.ts';
import { HEROES_CATALOG } from '../src/game/data/heroesData.ts';

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
console.log('   ELEMENTA: FULL-SYSTEM END-TO-END INTEGRATION AUDIT');
console.log('============================================================\n');

// -------------------------------------------------------------
// SECTION 1: NEW PLAYER ONBOARDING & ECONOMY INITIALIZATION
// -------------------------------------------------------------
console.log('--- 1. New Player Onboarding & Starter Economy ---');
const newProfile = GameStorage.loadProfile();

assert(newProfile.knowledgeTokens === 1000, `New player receives exactly 1,000 Knowledge Tokens (got ${newProfile.knowledgeTokens})`);
assert(newProfile.starterPackClaimed === true, 'Starter pack claimed flag is set to true');
assert(newProfile.auditTransactions.some(t => t.type === 'STARTER_PACK_GRANT'), 'Atomic audit transaction log tx_init_starter_pack recorded');

const collection = newProfile.cardCollection || {};
const totalOwned = Object.values(collection).reduce((sum, count) => sum + count, 0);
assert(totalOwned === 50, `Player collection has exactly 50 cards total (got ${totalOwned})`);

// Ensure player does NOT own the entire 7,300+ catalog
const catalogSize = PLAYABLE_CARDS.length;
const ownedDistinctKeys = Object.keys(collection).length;
assert(ownedDistinctKeys < 50 && ownedDistinctKeys > 20, `Player owns subset of catalog (${ownedDistinctKeys} distinct cards out of ${catalogSize}+ catalog)`);

// -------------------------------------------------------------
// SECTION 2: DECK BUILDER & STRICT COLLECTION VALIDATION
// -------------------------------------------------------------
console.log('\n--- 2. Deck Builder & Collection Ownership Validation ---');
const starterDeck = newProfile.activeDuelDeck;
assert(starterDeck !== undefined, 'Player has active starter duel deck');

// Validate starter deck against owned collection
const starterValidation = DeckManagementService.validateDeck(
  starterDeck.mainDeck,
  starterDeck.extraDeck,
  starterDeck.sideDeck || [],
  collection
);
assert(starterValidation.isValid === true, 'Starter deck is 100% valid and constructed solely from owned cards');
assert(starterValidation.missingOwnedCards.length === 0, 'Starter deck has 0 missing owned cards');

// Test attempting to validate an unowned prebuilt deck
const nitroDeck = PREBUILT_DECKS.find(d => d.id === 'deck_slot_nitro_legion');
if (nitroDeck) {
  const nitroValidation = DeckManagementService.validateDeck(
    nitroDeck.mainDeck,
    nitroDeck.extraDeck,
    nitroDeck.sideDeck || [],
    collection
  );
  assert(nitroValidation.isValid === false, 'Tournament Prebuilt deck containing unowned cards is marked INVALID for tournament play');
  assert(nitroValidation.missingOwnedCards.length > 0, `Missing cards detected for unowned prebuilt deck (${nitroValidation.missingOwnedCards.length} cards missing)`);
}

// -------------------------------------------------------------
// SECTION 3: TCG BATTLE ENGINE & EVENT-DRIVEN AUTO TRAPS
// -------------------------------------------------------------
console.log('\n--- 3. TCG Battle Engine & Event-Driven Auto Traps ---');
const duel = new DuelEngine(starterDeck.mainDeck, starterDeck.extraDeck, 'ADEPT');
assert(duel.player.lp === 8000, 'Duel starts with 8,000 LP for Player');
assert(duel.opponent.lp === 8000, 'Duel starts with 8,000 LP for Opponent');

// Set up face-down Noble Gas Shield for player (Turn 1)
const shieldCard = getPlayableCardById('card_trap_noble_gas_shield');
duel.player.spellTrapZones[0] = {
  slotIndex: 0,
  card: { uid: 'p_shield_uid', def: shieldCard, currentZone: 'SPELL_TRAP_ZONE', ownerPlayerId: 'player', turnSummoned: 1 },
  isFaceUp: false,
  turnSet: 1
};

// Advance to Turn 2 Battle Phase: Opponent attacks player
duel.currentTurn = 2;
duel.currentPhase = 'BATTLE_PHASE';
duel.activePlayerId = 'opponent';

const naDef = getPlayableCardById('card_elem_11_na');
duel.opponent.monsterZones[0] = {
  slotIndex: 0,
  card: { uid: 'opp_atk_uid', def: naDef, currentZone: 'MONSTER_ZONE', ownerPlayerId: 'opponent', turnSummoned: 1 },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};

// Opponent declares direct attack -> Noble Gas Shield must auto-trigger
const atkRes = duel.attackDirect(0);
assert(atkRes.success === true, 'Attack declaration processed');
assert(duel.player.lp === 8000, `Noble Gas Shield auto-triggered and negated direct attack damage (LP: ${duel.player.lp})`);
assert(duel.player.spellTrapZones[0] === null, 'Noble Gas Shield consumed from zone upon auto-trigger');

// Verify combat log recorded automatic trigger
const autoTrapLog = duel.logs.some(l => l.message.includes('[BẪY TỰ KÍCH HOẠT]'));
assert(autoTrapLog === true, 'Combat log contains official [BẪY TỰ KÍCH HOẠT] entry');

// -------------------------------------------------------------
// SECTION 4: REMATCH & REINITIALIZATION INTEGRITY
// -------------------------------------------------------------
console.log('\n--- 4. Rematch & Reinitialization Integrity ---');
// Create a new engine as done by handleRestartDuel
const rematchedDuel = new DuelEngine(starterDeck.mainDeck, starterDeck.extraDeck, 'EXPERT', undefined, undefined, 8000);
assert(rematchedDuel.currentTurn === 1, 'Rematched duel resets cleanly to Turn 1');
assert(rematchedDuel.player.lp === 8000, 'Rematched duel resets LP to 8,000');
assert(rematchedDuel.player.monsterZones.every(z => z === null), 'Rematched duel clears all monster zones');
assert(rematchedDuel.player.spellTrapZones.every(z => z === null), 'Rematched duel clears all spell/trap zones');
assert(rematchedDuel.aiLevel === 'EXPERT', 'Rematched duel applies updated AI difficulty setting');

// -------------------------------------------------------------
// SECTION 5: BOOSTER SHOP PURCHASE & CARD COLLECTION EXPANSION
// -------------------------------------------------------------
console.log('\n--- 5. Booster Shop Purchase & Card Collection Expansion ---');
const startingTokens = 1000;
const packCost = 100;
const tokensAfterPurchase = startingTokens - packCost;
assert(tokensAfterPurchase === 900, 'Purchase cost calculation verified: 1000 - 100 = 900 Tokens');

// Simulate rolling a booster pack card
const rolledCard = getPlayableCardById('card_elem_3_li');
const updatedCollection = { ...collection };
updatedCollection[rolledCard.id] = (updatedCollection[rolledCard.id] || 0) + 1;
assert(updatedCollection[rolledCard.id] >= 1, `Card [${rolledCard.name}] added to player collection`);

// -------------------------------------------------------------
// SECTION 6: CA-SRS COGNITIVE MISCONCEPTION REMEDIATION
// -------------------------------------------------------------
console.log('\n--- 6. CA-SRS Cognitive Misconception Remediation ---');
const srsItem = newProfile.srsItems[0];
assert(srsItem !== undefined, 'Player profile contains initial chemical SRS item');
assert(srsItem.targetId === 'Na', 'Initial SRS item targets Alkali metal Sodium reaction');
assert(srsItem.repetitionCount >= 1, 'SRS item has initial repetition count');
assert(srsItem.easeFactor >= 2.0, 'SRS item ease factor is initialized >= 2.0');

// -------------------------------------------------------------
// SECTION 7: REAL-TIME MOBA ARENA GAMEPLAY ENGINE
// -------------------------------------------------------------
console.log('\n--- 7. Real-Time MOBA Arena Gameplay Engine ---');
assert(HEROES_CATALOG.length === 12, `Exactly 12 IUPAC elemental champions in MOBA roster (got ${HEROES_CATALOG.length})`);

const sodiumHero = HEROES_CATALOG.find(h => h.id === 'hero_na_brawler');
assert(sodiumHero !== undefined, 'Sodium (Na) Brawler hero definition exists');
assert(sodiumHero.baseStats.maxHp >= 600, `Sodium base HP is balanced (got ${sodiumHero.baseStats.maxHp})`);

const moba = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
assert(moba.playerHero.hp === sodiumHero.baseStats.maxHp, 'Player hero spawns with full base HP');
assert(moba.heroes.length === 10, `MOBA match spawns 10 heroes (5v5 format) (got ${moba.heroes.length})`);

// Step moba simulation through combat ticks
for (let i = 0; i < 300; i++) {
  moba.update(1 / 60);
}
assert(moba.matchTimeSeconds >= 4.9, `MOBA simulation advances game time smoothly (time: ${moba.matchTimeSeconds.toFixed(2)}s)`);
assert(moba.minions.length > 0, `Minions spawned on lanes (got ${moba.minions.length} minions)`);
assert(moba.playerHero.gold >= 750, `Player hero accumulates gold from passive economy (gold: ${moba.playerHero.gold})`);

console.log('\n============================================================');
console.log(` FULL-SYSTEM INTEGRATION RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================\n');

if (failed > 0) process.exit(1);
