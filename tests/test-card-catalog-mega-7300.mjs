// test-card-catalog-mega-7300.mjs
// Comprehensive Verification Suite for ELEMENTA 7,300+ Mega Card Catalog
// Validates Data Integrity, Schema Conformity, Master Rule Invariants & Zero-Duplication

import * as fs from 'fs';
import * as path from 'path';
import { PLAYABLE_CARDS, getAllPlayableCards, getPlayableCardById } from '../src/data/playableCardsData.ts';
import { validateCardCatalog, VALID_CARD_TYPES, VALID_ATTRIBUTES, VALID_RARITIES, VALID_EFFECT_OPCODES } from '../src/data/cards/schemas/cardSchema.ts';

console.log('============================================================');
console.log('   ELEMENTA: 7,300+ MEGA CARD CATALOG INTEGRITY AUDIT');
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
  assert(totalCards >= 7000, `Total playable cards >= 7000 (actual: ${totalCards} cards)`);
  assert(totalCards === 7330, `Exact total matches Core 130 + 7,200 Batch Cards = 7330 (got ${totalCards})`);

  // Manifest audit
  const manifestPath = path.resolve('src/data/cards/manifest.json');
  assert(fs.existsSync(manifestPath), 'manifest.json exists on disk');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  assert(manifest.manifestVersion === '3.0.0', 'Manifest version is 3.0.0');
  assert(manifest.batches.length === 49, 'Manifest tracks exactly 49 batches');
  assert(manifest.status === 'VALIDATED', 'Manifest status is marked VALIDATED');

  const sumBatchCards = manifest.batches.reduce((acc, b) => acc + b.actualCount, 0);
  assert(sumBatchCards === 7200, `Sum of batch card counts in manifest is exactly 7200 (got ${sumBatchCards})`);
}

// ==========================================
// GROUP 2: Zero Duplication Invariant (IDs & Names)
// ==========================================
console.log('\n--- Group 2: Zero Duplication Invariant (IDs & Names) ---');
{
  const catalogValidation = validateCardCatalog(PLAYABLE_CARDS);
  assert(catalogValidation.duplicateIds.length === 0, `Zero duplicate card IDs across entire catalog (duplicates: ${catalogValidation.duplicateIds.join(', ') || 'none'})`);
  assert(catalogValidation.duplicateNames.length === 0, `Zero duplicate card names across entire catalog (duplicates: ${catalogValidation.duplicateNames.slice(0, 5).join(', ') || 'none'})`);
  assert(catalogValidation.invalidCards === 0, `Zero schema validation errors (invalid: ${catalogValidation.invalidCards})`);
}

// ==========================================
// GROUP 3: Category Distribution Adherence
// ==========================================
console.log('\n--- Group 3: Category Distribution Adherence ---');
{
  const totalMonsters = PLAYABLE_CARDS.filter(c =>
    ['ELEMENT_MONSTER', 'COMPOUND_MONSTER', 'PENDULUM_MONSTER', 'RITUAL_MONSTER', 'SYNCHRO_MONSTER', 'XYZ_MONSTER', 'LINK_MONSTER'].includes(c.cardType)
  );
  const elementMonsters = PLAYABLE_CARDS.filter(c => c.cardType === 'ELEMENT_MONSTER');
  const compoundAndExtra = PLAYABLE_CARDS.filter(c =>
    ['COMPOUND_MONSTER', 'SYNCHRO_MONSTER', 'XYZ_MONSTER', 'LINK_MONSTER'].includes(c.cardType)
  );
  const spellCards = PLAYABLE_CARDS.filter(c =>
    ['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT'].includes(c.cardType)
  );
  const trapCards = PLAYABLE_CARDS.filter(c => c.cardType === 'TRAP');

  assert(totalMonsters.length >= 4000, `Total Monsters >= 4000 (actual: ${totalMonsters.length})`);
  assert(elementMonsters.length >= 1500, `Element Monsters >= 1500 (actual: ${elementMonsters.length})`);
  assert(compoundAndExtra.length >= 2000, `Compound & Extra Monsters >= 2000 (actual: ${compoundAndExtra.length})`);
  assert(spellCards.length >= 1500, `Spell Cards >= 1500 (actual: ${spellCards.length})`);
  assert(trapCards.length >= 1000, `Trap Cards >= 1000 (actual: ${trapCards.length})`);
}

// ==========================================
// GROUP 4: Performance Lookup Benchmark
// ==========================================
console.log('\n--- Group 4: Performance Lookup Benchmark (7,329 Cards) ---');
{
  const t0 = performance.now();
  for (let i = 0; i < 1000; i++) {
    const randomCard = PLAYABLE_CARDS[Math.floor(Math.random() * PLAYABLE_CARDS.length)];
    const retrieved = getPlayableCardById(randomCard.id);
    if (!retrieved) throw new Error(`Failed to retrieve card ${randomCard.id}`);
  }
  const elapsed = performance.now() - t0;
  assert(elapsed < 50, `1,000 Random Card Lookups under 50ms (actual: ${elapsed.toFixed(2)}ms)`);
}

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log('============================================================');

if (totalFailed > 0) {
  process.exit(1);
}
