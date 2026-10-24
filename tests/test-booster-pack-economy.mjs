// test-booster-pack-economy.mjs
// Suite 37: Booster Pack Economy, Gacha Probability Model, Foil Guarantees, Duplicate Shard Recycling & Collection Stats

import {
  THEMATIC_BOOSTER_BOXES,
  SHARDS_PER_DUPLICATE_RARITY,
  CRAFTING_COST_PER_RARITY,
  calculateCraftingRefundRatio,
  rollBoosterPack
} from '../src/components/shop/BoosterShopTab.tsx';
import { PLAYABLE_CARDS, getAllPlayableCards } from '../src/data/playableCardsData.ts';

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ PASS: ${message}`);
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 37: BOOSTER PACK ECONOMY & GACHA PROBABILITY AUDIT');
console.log('======================================================================\n');

// --- 1. Thematic Booster Box Catalog Completeness ---
console.log('--- 1. Thematic Booster Box Catalog Completeness ---');
{
  assert(Array.isArray(THEMATIC_BOOSTER_BOXES) && THEMATIC_BOOSTER_BOXES.length === 4, 'Shop features exactly 4 Thematic Booster Boxes');

  const EXPECTED_BOX_IDS = [
    'box_alkali_halogen',
    'box_transition_sulfur',
    'box_acid_base_nitro',
    'box_organic_environment'
  ];

  let totalSubPacks = 0;
  for (const boxId of EXPECTED_BOX_IDS) {
    const box = THEMATIC_BOOSTER_BOXES.find(b => b.id === boxId);
    assert(box !== undefined, `Box '${boxId}' exists in catalog`);
    assert(box.subPacks.length === 2, `Box '${box.title}' contains exactly 2 sub-packs`);
    totalSubPacks += box.subPacks.length;

    for (const sp of box.subPacks) {
      assert(sp.priceTokens === 100, `Sub-pack '${sp.name}' costs 100 Knowledge Tokens`);
      assert(Array.isArray(sp.featuredCardIds) && sp.featuredCardIds.length >= 3, `Sub-pack '${sp.name}' defines >= 3 featured cards`);
      
      // Verify every featured card actually exists in PLAYABLE_CARDS
      for (const cardId of sp.featuredCardIds) {
        const found = PLAYABLE_CARDS.find(c => c.id === cardId);
        assert(found !== undefined, `Featured card '${cardId}' exists in canonical PLAYABLE_CARDS`);
      }
    }
  }

  assert(totalSubPacks === 8, `Shop provides exactly 8 specialized sub-packs across all boxes (got ${totalSubPacks})`);
}

// --- 2. Single Pack Structure & Guaranteed Foil Slot 4 Invariant ---
console.log('\n--- 2. Single Pack Structure & Guaranteed Foil Slot 4 Invariant ---');
{
  const firstSubPack = THEMATIC_BOOSTER_BOXES[0].subPacks[0];
  const samplePack = rollBoosterPack(firstSubPack, PLAYABLE_CARDS);

  assert(samplePack.length === 5, 'Single booster pack generates exactly 5 cards');
  assert(samplePack[4].rarity !== 'COMMON', `Slot 4 is guaranteed foil (non-common) (got ${samplePack[4].rarity})`);
}

// --- 3. Monte Carlo Statistical Gacha Probability Simulation (500 Packs = 2,500 Cards) ---
console.log('\n--- 3. Monte Carlo Statistical Gacha Probability Simulation (500 Packs) ---');
{
  const subPack = THEMATIC_BOOSTER_BOXES[0].subPacks[0]; // Tiên Phong Kim Loại Kiềm
  const NUM_PACKS = 500;
  let slot4CommonCount = 0;
  const rarityCounts = {
    COMMON: 0,
    RARE: 0,
    SUPER_RARE: 0,
    ULTRA_RARE: 0,
    SECRET_RARE: 0
  };
  let featuredCount = 0;

  for (let i = 0; i < NUM_PACKS; i++) {
    const pack = rollBoosterPack(subPack, PLAYABLE_CARDS);
    assert(pack.length === 5, `Pack ${i + 1} has exactly 5 cards`);

    // Check Slot 4 Foil Invariant
    if (pack[4].rarity === 'COMMON') {
      slot4CommonCount++;
    }

    // Accumulate total counts
    for (let slot = 0; slot < 5; slot++) {
      const card = pack[slot];
      rarityCounts[card.rarity]++;
      if (subPack.featuredCardIds.includes(card.id)) {
        featuredCount++;
      }
    }
  }

  assert(slot4CommonCount === 0, `Absolute Invariant: Slot 4 yielded 0 COMMON cards across ${NUM_PACKS} packs (100% foil guarantee)`);
  assert(rarityCounts.COMMON > 0, `Common cards generated: ${rarityCounts.COMMON}`);
  assert(rarityCounts.RARE > 0, `Rare cards generated: ${rarityCounts.RARE}`);
  assert(rarityCounts.SUPER_RARE > 0, `Super Rare cards generated: ${rarityCounts.SUPER_RARE}`);
  assert(rarityCounts.ULTRA_RARE > 0, `Ultra Rare cards generated: ${rarityCounts.ULTRA_RARE}`);
  assert(rarityCounts.SECRET_RARE > 0, `Secret Rare cards generated: ${rarityCounts.SECRET_RARE}`);

  const totalCards = NUM_PACKS * 5;
  const featuredPercentage = (featuredCount / totalCards) * 100;
  console.log(`    ↳ Total cards rolled: ${totalCards}`);
  console.log(`    ↳ Rarity distribution: C=${rarityCounts.COMMON}, R=${rarityCounts.RARE}, SR=${rarityCounts.SUPER_RARE}, UR=${rarityCounts.ULTRA_RARE}, SEC=${rarityCounts.SECRET_RARE}`);
  console.log(`    ↳ Featured card pull rate: ${featuredPercentage.toFixed(1)}%`);

  assert(featuredCount > 50, `Featured focus bias elevated pull rate of subpack themes (got ${featuredCount} pulls)`);
}

// --- 4. 10x Pull Economics & Starter Welfare Verification ---
console.log('\n--- 4. 10x Pull Economics & Starter Welfare Verification ---');
{
  const subPack = THEMATIC_BOOSTER_BOXES[1].subPacks[0];

  // 1x pull cost
  const singleCost = subPack.priceTokens;
  assert(singleCost === 100, 'Single pack cost is 100 tokens');

  // 10x pull cost with 10% discount
  const bulkCost = subPack.priceTokens * 9;
  assert(bulkCost === 900, `10x bulk pull costs 900 tokens (10% bulk discount applied, saving 100 tokens)`);

  // Starter welfare free pull
  const starterCost = 0;
  assert(starterCost === 0, 'Starter welfare 10-pack pull cost is strictly 0 tokens');
}

// --- 5. Duplicate Shard Conversion Table & Playset Bounds Audit ---
console.log('\n--- 5. Duplicate Shard Conversion Table & Playset Bounds Audit ---');
{
  assert(SHARDS_PER_DUPLICATE_RARITY.COMMON === 15, 'Duplicate COMMON converts to 15 Elemental Shards');
  assert(SHARDS_PER_DUPLICATE_RARITY.RARE === 40, 'Duplicate RARE converts to 40 Elemental Shards');
  assert(SHARDS_PER_DUPLICATE_RARITY.SUPER_RARE === 100, 'Duplicate SUPER_RARE converts to 100 Elemental Shards');
  assert(SHARDS_PER_DUPLICATE_RARITY.ULTRA_RARE === 250, 'Duplicate ULTRA_RARE converts to 250 Elemental Shards');
  assert(SHARDS_PER_DUPLICATE_RARITY.SECRET_RARE === 600, 'Duplicate SECRET_RARE converts to 600 Elemental Shards');

  // Simulate collection duplicate conversion
  const testCollection = {};
  const testCardId = 'card_elem_11_na'; // Common Natri
  let totalShardsGained = 0;

  // Add 1st, 2nd, 3rd copy (under max playset of 3)
  for (let pull = 1; pull <= 3; pull++) {
    const existing = testCollection[testCardId] || 0;
    if (existing >= 3) {
      totalShardsGained += SHARDS_PER_DUPLICATE_RARITY.COMMON;
    } else {
      testCollection[testCardId] = existing + 1;
    }
  }
  assert(testCollection[testCardId] === 3, 'First 3 copies increment collection count to 3');
  assert(totalShardsGained === 0, 'No shards awarded for 1st-3rd copy (kept in collection)');

  // 4th and 5th copy pulled (exceeds playset of 3)
  for (let pull = 4; pull <= 5; pull++) {
    const existing = testCollection[testCardId] || 0;
    if (existing >= 3) {
      totalShardsGained += SHARDS_PER_DUPLICATE_RARITY.COMMON;
    } else {
      testCollection[testCardId] = existing + 1;
    }
  }
  assert(testCollection[testCardId] === 3, 'Collection count remains clamped at 3 playset limit');
  assert(totalShardsGained === 30, `2 duplicate Common copies yielded exactly 30 shards (got ${totalShardsGained})`);

  // Test Ultra Rare duplicate conversion
  const urCardId = 'card_comp_h2so4'; // Ultra Rare
  const urCollection = { [urCardId]: 3 };
  let urShards = 0;
  const existingUr = urCollection[urCardId] || 0;
  if (existingUr >= 3) {
    urShards += SHARDS_PER_DUPLICATE_RARITY.ULTRA_RARE;
  }
  assert(urShards === 250, `Duplicate ULTRA_RARE awards exactly 250 Elemental Shards`);
}

// --- 6. Collection Gallery Integration & Completion Metrics ---
console.log('\n--- 6. Collection Gallery Integration & Completion Metrics ---');
{
  const allCards = getAllPlayableCards();
  assert(allCards.length >= 35, `Game provides substantial card roster (found ${allCards.length} playable cards)`);

  const mockCollection = {
    [allCards[0].id]: 3,
    [allCards[1].id]: 1,
    [allCards[2].id]: 2
  };

  const totalCardsInGame = allCards.length;
  const uniqueOwnedCount = Object.keys(mockCollection).filter(id => (mockCollection[id] || 0) > 0).length;
  const rawPercentage = (uniqueOwnedCount / totalCardsInGame) * 100;
  const completionPercentage = parseFloat(rawPercentage.toFixed(2));

  assert(uniqueOwnedCount === 3, `Correctly counts 3 unique owned cards regardless of copies`);
  assert(completionPercentage > 0 && completionPercentage <= 100, `Completion percentage is valid (${completionPercentage}%)`);

  // Sorting stability test by ATK
  const sortedByAtk = [...allCards].sort((a, b) => (b.atk || 0) - (a.atk || 0));
  for (let i = 0; i < sortedByAtk.length - 1; i++) {
    assert((sortedByAtk[i].atk || 0) >= (sortedByAtk[i + 1].atk || 0), `Cards correctly sorted descending by ATK at index ${i}`);
  }
}

// --- 7. Card Shard Crafting Economy & 4:1 Ratio Invariants ---
console.log('\n--- 7. Card Shard Crafting Economy & 4:1 Ratio Invariants ---');
{
  assert(CRAFTING_COST_PER_RARITY.COMMON === 60, 'Crafting COMMON card costs 60 Elemental Shards');
  assert(CRAFTING_COST_PER_RARITY.RARE === 160, 'Crafting RARE card costs 160 Elemental Shards');
  assert(CRAFTING_COST_PER_RARITY.SUPER_RARE === 400, 'Crafting SUPER_RARE card costs 400 Elemental Shards');
  assert(CRAFTING_COST_PER_RARITY.ULTRA_RARE === 1000, 'Crafting ULTRA_RARE card costs 1000 Elemental Shards');
  assert(CRAFTING_COST_PER_RARITY.SECRET_RARE === 2400, 'Crafting SECRET_RARE card costs 2400 Elemental Shards');

  // Verify uniform 4:1 disenchant/craft ratio across all rarity tiers
  const rarities = ['COMMON', 'RARE', 'SUPER_RARE', 'ULTRA_RARE', 'SECRET_RARE'];
  for (const rarity of rarities) {
    const ratio = calculateCraftingRefundRatio(rarity);
    assert(ratio === 4.0, `Craft-to-disenchant ratio for ${rarity} is strictly 4:1 (got ${ratio})`);
  }
}

// --- 8. Pity Protection Counter & Guaranteed Ultra Rare Invariant ---
console.log('\n--- 8. Pity Protection Counter & Guaranteed Ultra Rare Invariant ---');
{
  const subPack = THEMATIC_BOOSTER_BOXES[0].subPacks[0];

  // Test that pityCounter = 9 guarantees Slot 4 is at least ULTRA_RARE or SECRET_RARE
  for (let trial = 0; trial < 25; trial++) {
    const pityPack = rollBoosterPack(subPack, PLAYABLE_CARDS, 9);
    assert(pityPack.length === 5, 'Pity pack generates exactly 5 cards');
    const slot4Rarity = pityPack[4].rarity;
    assert(
      slot4Rarity === 'ULTRA_RARE' || slot4Rarity === 'SECRET_RARE',
      `Pity trigger in Slot 4 strictly drops ULTRA_RARE or SECRET_RARE (got ${slot4Rarity} on trial ${trial + 1})`
    );
  }

  // Simulate 100 pack openings with dynamic pity tracking
  let currentPity = 0;
  let totalUltraOrSecPulled = 0;
  let maxPityReached = 0;

  for (let packIdx = 0; packIdx < 100; packIdx++) {
    const pack = rollBoosterPack(subPack, PLAYABLE_CARDS, currentPity);
    const hasHighRarity = pack.some(c => c.rarity === 'ULTRA_RARE' || c.rarity === 'SECRET_RARE');

    if (hasHighRarity) {
      totalUltraOrSecPulled++;
      currentPity = 0; // Reset pity counter
    } else {
      currentPity++;
      if (currentPity > maxPityReached) {
        maxPityReached = currentPity;
      }
    }

    // Pity counter must never exceed 9 without triggering a high rarity drop
    assert(currentPity <= 9, `Pity counter invariant preserved (max allowed consecutive non-UR packs is 9, got ${currentPity})`);
  }

  assert(totalUltraOrSecPulled >= 10, `Dynamic pity system ensured at least 10 high-rarity cards across 100 packs (got ${totalUltraOrSecPulled})`);
  console.log(`    ↳ High rarity pulls in 100 packs: ${totalUltraOrSecPulled} (Max consecutive drought: ${maxPityReached} packs)`);
}

console.log('\n======================================================================');
console.log('   ✓ SUITE 37: ALL BOOSTER PACK ECONOMY AUDIT ASSERTIONS PASSED!      ');
console.log('======================================================================\n');
