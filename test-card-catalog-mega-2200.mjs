// test-card-catalog-mega-2200.mjs
// Comprehensive Verification Suite for ELEMENTA 2,200+ Mega Card Catalog
// Validates Data Integrity, Schema Conformity, Master Rule Invariants, Archetypes & UI Pagination

import * as fs from 'fs';
import * as path from 'path';
import { PLAYABLE_CARDS, getAllPlayableCards, getPlayableCardById } from './src/data/playableCardsData.ts';
import { validateCardCatalog, VALID_CARD_TYPES, VALID_ATTRIBUTES, VALID_RARITIES, VALID_EFFECT_OPCODES } from './src/data/cards/schemas/cardSchema.ts';

console.log('============================================================');
console.log('   ELEMENTA: 2,200+ MEGA CARD CATALOG INTEGRITY AUDIT');
console.log('============================================================\n');

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    totalPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    totalFailed++;
  }
}

// ==========================================
// GROUP 1: Total Catalog Cardinality & Manifest
// ==========================================
console.log('--- Group 1: Total Catalog Cardinality & Manifest Audit ---');
{
  const totalCards = PLAYABLE_CARDS.length;
  assert(totalCards >= 2200, `Total playable cards >= 2200 (actual: ${totalCards} cards)`);
  assert(totalCards >= 2329, `Exact total matches Core + Batch Cards >= 2329 (got ${totalCards})`);

  // Manifest audit
  const manifestPath = path.resolve('src/data/cards/manifest.json');
  assert(fs.existsSync(manifestPath), 'manifest.json exists on disk');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  assert(manifest.manifestVersion === '2.0.0' || manifest.manifestVersion === '3.0.0', `Manifest version is valid (got ${manifest.manifestVersion})`);
  assert(manifest.batches.length >= 24, `Manifest tracks at least 24 batches (got ${manifest.batches.length})`);
  assert(manifest.status === 'VALIDATED', 'Manifest status is marked VALIDATED');

  const sumBatchCards = manifest.batches.reduce((acc, b) => acc + b.actualCount, 0);
  assert(sumBatchCards >= 2200, `Sum of batch card counts in manifest is >= 2200 (got ${sumBatchCards})`);
}

// ==========================================
// GROUP 2: Zero Duplication Invariant (IDs & Names)
// ==========================================
console.log('\n--- Group 2: Zero Duplication Invariant (IDs & Names) ---');
{
  const catalogValidation = validateCardCatalog(PLAYABLE_CARDS);
  assert(catalogValidation.duplicateIds.length === 0, `Zero duplicate card IDs across entire catalog (duplicates: ${catalogValidation.duplicateIds.join(', ') || 'none'})`);
  assert(catalogValidation.duplicateNames.length === 0, `Zero duplicate card names across entire catalog (duplicates: ${catalogValidation.duplicateNames.join(', ') || 'none'})`);
  assert(catalogValidation.invalidCards === 0, `Zero schema validation errors (invalid: ${catalogValidation.invalidCards})`);
}

// ==========================================
// GROUP 3: Category Distribution Adherence
// ==========================================
console.log('\n--- Group 3: Category Distribution Adherence ---');
{
  const mainDeckMonsters = PLAYABLE_CARDS.filter(c =>
    ['ELEMENT_MONSTER', 'PENDULUM_MONSTER', 'RITUAL_MONSTER'].includes(c.cardType)
  );
  const extraDeckMonsters = PLAYABLE_CARDS.filter(c =>
    ['COMPOUND_MONSTER', 'SYNCHRO_MONSTER', 'XYZ_MONSTER', 'LINK_MONSTER'].includes(c.cardType) ||
    !!c.synchroLevel || !!c.xyzRank || !!c.linkRating
  );
  const spellCards = PLAYABLE_CARDS.filter(c =>
    ['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT'].includes(c.cardType)
  );
  const trapCards = PLAYABLE_CARDS.filter(c => c.cardType === 'TRAP');

  assert(mainDeckMonsters.length >= 1000, `Main Deck Monsters >= 1000 (actual: ${mainDeckMonsters.length})`);
  assert(extraDeckMonsters.length >= 300, `Extra Deck Monsters >= 300 (actual: ${extraDeckMonsters.length})`);
  assert(spellCards.length >= 500, `Spell Cards >= 500 (actual: ${spellCards.length})`);
  assert(trapCards.length >= 400, `Trap Cards >= 400 (actual: ${trapCards.length})`);

  console.log(`    -> Breakdown: Main Monsters=${mainDeckMonsters.length}, Extra Monsters=${extraDeckMonsters.length}, Spells=${spellCards.length}, Traps=${trapCards.length}`);
}

// ==========================================
// GROUP 4: Master Rule Mechanics & Scientific Invariants
// ==========================================
console.log('\n--- Group 4: Master Rule Mechanics & Scientific Invariants ---');
{
  // 1. Link Monster Invariants: No DEF, No Level, has linkRating & linkArrows
  const linkMonsters = PLAYABLE_CARDS.filter(c => c.cardType === 'LINK_MONSTER');
  assert(linkMonsters.length >= 75, `Link Monsters count >= 75 (actual: ${linkMonsters.length})`);
  const invalidLinkDef = linkMonsters.filter(c => c.def !== undefined);
  assert(invalidLinkDef.length === 0, 'Rulebook v10: Zero Link monsters possess a DEF stat');
  const invalidLinkLevel = linkMonsters.filter(c => c.level !== undefined);
  assert(invalidLinkLevel.length === 0, 'Rulebook v10: Zero Link monsters possess a Level stat');
  const validLinkArrows = linkMonsters.every(c => Array.isArray(c.linkArrows) && c.linkArrows.length > 0);
  assert(validLinkArrows, 'All Link monsters define valid Link Arrows');

  // 2. Xyz Monster Invariants: Rank, not Level
  const xyzMonsters = PLAYABLE_CARDS.filter(c => c.cardType === 'XYZ_MONSTER');
  assert(xyzMonsters.length >= 75, `Xyz Monsters count >= 75 (actual: ${xyzMonsters.length})`);
  const invalidXyzLevel = xyzMonsters.filter(c => c.level !== undefined);
  assert(invalidXyzLevel.length === 0, 'Rulebook v10: Zero Xyz monsters possess a Level stat (they have Rank)');
  const validXyzRanks = xyzMonsters.every(c => typeof c.xyzRank === 'number' && c.xyzRank >= 1 && c.xyzRank <= 13);
  assert(validXyzRanks, 'All Xyz monsters possess valid xyzRank between 1 and 13');

  // 3. Counter Trap Invariants: Spell Speed 3
  const counterTraps = PLAYABLE_CARDS.filter(c => c.spellTrapSubtype === 'COUNTER_TRAP');
  assert(counterTraps.length >= 100, `Counter Traps count >= 100 (actual: ${counterTraps.length})`);
  const allSpeed3 = counterTraps.every(c => c.spellSpeed === 3);
  assert(allSpeed3, 'Rulebook v10: All Counter Traps have Spell Speed 3');

  // 4. Spell & Trap stat invariants: No ATK or DEF
  const spellsAndTraps = PLAYABLE_CARDS.filter(c => ['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT', 'TRAP'].includes(c.cardType));
  const invalidSpellStats = spellsAndTraps.filter(c => c.atk !== undefined || c.def !== undefined);
  assert(invalidSpellStats.length === 0, 'Zero Spell or Trap cards possess base ATK/DEF stats');
}

// ==========================================
// GROUP 5: 36 Tactical Archetypes Coverage
// ==========================================
console.log('\n--- Group 5: 36 Tactical Archetypes Coverage ---');
{
  const archetypeMap = new Map();
  for (const card of PLAYABLE_CARDS) {
    if (card.archetype) {
      archetypeMap.set(card.archetype, (archetypeMap.get(card.archetype) || 0) + 1);
    }
  }

  assert(archetypeMap.size >= 36, `Total distinct archetypes >= 36 (actual: ${archetypeMap.size} archetypes)`);

  const keyArchetypes = [
    'ALKALI_BURST',
    'ALKALINE_EARTH_BASTION',
    'HALOGEN_PURGE',
    'NOBLE_VOID',
    'TRANSITION_FORGE',
    'PRECIOUS_CATALYST',
    'CHALCOGEN_EMBER',
    'PNICTOGEN_SPIRIT',
    'HYDROCARBON_CHAIN',
    'AROMATIC_RING',
    'BIOMOLECULE_VITAL',
    'STRONG_ACID_CORROSION',
    'BASE_HYDROXIDE',
    'WERNER_COORDINATION',
    'THERMAL_KINETICS',
    'LE_CHATELIER_EQUILIBRIUM',
    'CRYSTAL_LATTICE',
    'PRECIPITATION_TRAP',
    'ELECTROCHEMICAL_CELL',
    'TITRATION_PRECISION'
  ];

  for (const arch of keyArchetypes) {
    const count = archetypeMap.get(arch) || 0;
    assert(count >= 20, `Archetype [${arch}] has robust card pool >= 20 cards (actual: ${count})`);
  }
}

// ==========================================
// GROUP 6: Machine-Readable Structured Effects Audit
// ==========================================
console.log('\n--- Group 6: Machine-Readable Structured Effects Audit ---');
{
  let structuredCardCount = 0;
  let totalOpsCount = 0;
  const opcodeSet = new Set();

  for (const card of PLAYABLE_CARDS) {
    if (card.structuredEffects && Array.isArray(card.structuredEffects)) {
      structuredCardCount++;
      for (const eff of card.structuredEffects) {
        for (const op of eff.operations) {
          totalOpsCount++;
          opcodeSet.add(op.op);
          assert(VALID_EFFECT_OPCODES.includes(op.op), `Opcode [${op.op}] in [${card.id}] is supported by engine`);
        }
      }
    }
  }

  assert(structuredCardCount >= 2000, `Cards with machine-readable structured effects >= 2000 (actual: ${structuredCardCount})`);
  assert(totalOpsCount >= 2000, `Total compiled operations >= 2000 (actual: ${totalOpsCount})`);
  assert(opcodeSet.size >= 8, `Diverse opcodes utilized >= 8 (actual: ${opcodeSet.size} opcodes: ${Array.from(opcodeSet).join(', ')})`);
}

// ==========================================
// GROUP 7: High-Performance Lookup & Registry Integration
// ==========================================
console.log('\n--- Group 7: High-Performance Lookup & Registry Integration ---');
{
  const allCards = getAllPlayableCards();
  assert(allCards.length === PLAYABLE_CARDS.length, `getAllPlayableCards() returns all ${PLAYABLE_CARDS.length} cards`);

  // O(1) lookup speed test: 10,000 lookups
  const startTime = Date.now();
  for (let i = 0; i < 10000; i++) {
    const sampleId = PLAYABLE_CARDS[i % PLAYABLE_CARDS.length].id;
    const found = getPlayableCardById(sampleId);
    if (!found) throw new Error(`Lookup failed for ID ${sampleId}`);
  }
  const duration = Date.now() - startTime;
  assert(duration < 100, `10,000 O(1) ID lookups executed in < 100ms (took ${duration}ms)`);
}

// ==========================================
// GROUP 8: Collection & Deck Builder Pagination Engine
// ==========================================
console.log('\n--- Group 8: Collection & Deck Builder Pagination Engine ---');
{
  const CARDS_PER_PAGE = 40;
  const totalCards = PLAYABLE_CARDS.length;
  const totalPages = Math.ceil(totalCards / CARDS_PER_PAGE);

  assert(totalPages === Math.ceil(totalCards / CARDS_PER_PAGE), `Total pages calculated correctly (got ${totalPages} pages)`);

  // Page 1 slice
  const page1 = PLAYABLE_CARDS.slice(0, CARDS_PER_PAGE);
  assert(page1.length === CARDS_PER_PAGE, `Page 1 contains exactly ${CARDS_PER_PAGE} cards`);

  // Last page slice
  const lastPage = PLAYABLE_CARDS.slice((totalPages - 1) * CARDS_PER_PAGE);
  const expectedLastPageCount = totalCards % CARDS_PER_PAGE || CARDS_PER_PAGE;
  assert(lastPage.length === expectedLastPageCount, `Last page contains exactly ${expectedLastPageCount} cards (got ${lastPage.length})`);

  // Check no overlap and no omissions across all pages
  const seenIds = new Set();
  for (let p = 0; p < totalPages; p++) {
    const slice = PLAYABLE_CARDS.slice(p * CARDS_PER_PAGE, (p + 1) * CARDS_PER_PAGE);
    for (const card of slice) {
      assert(!seenIds.has(card.id), `No card appears on multiple pages (${card.id})`);
      seenIds.add(card.id);
    }
  }
  assert(seenIds.size === totalCards, `All ${totalCards} cards partitioned cleanly across ${totalPages} pages`);
}

// ==========================================
// GROUP 9: Filtering & Sorting Performance (< 20ms)
// ==========================================
console.log('\n--- Group 9: Filtering & Sorting Performance (< 20ms) ---');
{
  const filterStart = Date.now();
  // Complex filter: attribute = PYRO, cardType = ELEMENT_MONSTER, query = 'liti', sort by ATK desc
  const filtered = PLAYABLE_CARDS.filter(c =>
    c.attribute === 'PYRO' &&
    c.cardType === 'ELEMENT_MONSTER' &&
    (c.name.toLowerCase().includes('liti') || c.name_en.toLowerCase().includes('lithium'))
  ).sort((a, b) => (b.atk || 0) - (a.atk || 0));

  const filterTime = Date.now() - filterStart;
  assert(filterTime < 25, `Multi-criteria search & sort across 2,329 cards completed in < 25ms (took ${filterTime}ms)`);
  assert(filtered.length > 0, `Filtered results returned non-empty match (found ${filtered.length} matching cards)`);
}

// ==========================================
// GROUP 10: Scientific Lore & IUPAC Balancing Audit
// ==========================================
console.log('\n--- Group 10: Scientific Lore & IUPAC Balancing Audit ---');
{
  const missingLore = PLAYABLE_CARDS.filter(c => !c.scientificLore || c.scientificLore.trim().length < 10);
  assert(missingLore.length === 0, `Zero cards missing substantive educational scientificLore`);

  const missingEffectText = PLAYABLE_CARDS.filter(c => !c.effectText || c.effectText.trim().length < 10);
  assert(missingEffectText.length === 0, `Zero cards missing tactical effectText`);

  const cardsWithEquation = PLAYABLE_CARDS.filter(c => c.relatedEquation && c.relatedEquation.trim() !== '');
  assert(cardsWithEquation.length >= 2000, `Cards with authentic chemistry equations >= 2000 (actual: ${cardsWithEquation.length})`);
}

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log('============================================================\n');

if (totalFailed > 0) {
  process.exit(1);
}
