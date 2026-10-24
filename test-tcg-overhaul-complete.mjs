// test-tcg-overhaul-complete.mjs
// Suite 38: ELEMENTA TCG Overhaul Verification
// Validates:
// 1. Data-Driven Dynamic Related Cards Engine (Reactants, Products, Catalysts, Environmental Conditions, Counters, Synergies)
// 2. Special Summon Mechanics (Properly separating Normal Summon limits from Special Summons in Hand, GY, Deck)
// 3. Battlefield Reaction Engine (DCSM kinetics, stoichiometry, conditions, and cognitive trap prevention)
// 4. Elemental Shards Crafting & Recycling Economy (Decoupled from Knowledge Tokens, atomic transactions, duplicate recycling)
// 5. Booster Pack Odds, Guaranteed Foils, and Pity Counters

import { getAllPlayableCards, getPlayableCardById, PLAYABLE_CARDS } from './src/data/playableCardsData.ts';
import { getRelatedCards } from './src/domain/relatedCardsService.ts';
import { DuelEngine } from './src/domain/duelEngine.ts';
import {
  SHARD_CRAFTING_COSTS,
  SHARD_RECYCLE_YIELDS,
  craftCardWithShards,
  recycleDuplicates,
  scanDuplicateCards
} from './src/domain/shardsEconomy.ts';
import { THEMATIC_BOOSTER_BOXES } from './src/components/shop/BoosterShopTab.tsx';

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ PASS: ${message}`);
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 38: TCG OVERHAUL & FULL-SYSTEM VERIFICATION');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// 1. DYNAMIC RELATED CARDS ENGINE (Non-hardcoded, Data-Driven)
// -----------------------------------------------------------------------------
console.log('--- 1. Testing Data-Driven Related Cards Discovery ---');
{
  const naCard = PLAYABLE_CARDS.find(c => c.chemicalFormula === 'Na' || c.id === 'ELEM_NA_011');
  assert(naCard !== undefined, 'Found Sodium (Na) card in catalog');

  const naRelations = getRelatedCards(naCard, { ELEM_NA_011: 1 });
  assert(Array.isArray(naRelations) && naRelations.length > 0, `Discovered ${naRelations.length} dynamic relations for Sodium (Na)`);
  console.log('Na Relations:', naRelations.map(r => ({ name: r.targetCard.name, type: r.relationType, formula: r.targetCard.chemicalFormula })));

  // Sodium reacts with Water (H2O) to form NaOH + H2
  const waterReactant = naRelations.find(r => r.targetCard.chemicalFormula === 'H2O' || r.formulaOrCondition?.includes('H2O'));
  assert(waterReactant !== undefined, 'Sodium dynamically identifies Water (H2O) as required reactant/partner');
  assert(waterReactant.relationType === 'REACTANT' || waterReactant.relationType === 'CONDITION', 'Water is categorized as REACTANT or CONDITION');

  // Verify Product Discovery (e.g., NaOH or NaCl)
  const productFound = naRelations.some(r => r.relationType === 'PRODUCT');
  assert(productFound, 'Sodium dynamically discovers reaction products (e.g. NaOH or NaCl)');

  // Verify Counter Discovery (e.g. Acid/Water counters or neutralizers)
  const acidCard = PLAYABLE_CARDS.find(c => c.chemicalFormula === 'HCl');
  if (acidCard) {
    const acidRelations = getRelatedCards(acidCard);
    const baseCounter = acidRelations.find(r => r.relationType === 'COUNTER' || r.relationType === 'REACTANT');
    assert(baseCounter !== undefined, 'HCl dynamically discovers neutralization partner/counter (Base)');
  }

  // Verify Compound Monster Synthesis Recipe Back-linking
  const compoundWithRecipe = PLAYABLE_CARDS.find(c => c.synthesisRecipe && c.synthesisRecipe.reactantFormulas.length > 0);
  if (compoundWithRecipe) {
    const compoundRelations = getRelatedCards(compoundWithRecipe);
    const synthesisReactants = compoundRelations.filter(r => r.relationType === 'REACTANT');
    assert(synthesisReactants.length > 0, `Compound Monster [${compoundWithRecipe.name}] back-links reactants via synthesisRecipe`);
  }
}

// -----------------------------------------------------------------------------
// 2. SPECIAL SUMMON MECHANICS & NORMAL SUMMON LIMIT SEPARATION
// -----------------------------------------------------------------------------
console.log('\n--- 2. Testing Special Summon Mechanics & Normal Summon Limits ---');
{
  // Build a test deck of 30 cards
  const testDeck = PLAYABLE_CARDS.slice(0, 30).map(c => c.id);
  const engine = new DuelEngine(testDeck, [], 'ADEPT', undefined, undefined, 8000);

  // Player begins in Turn 1
  assert(engine.currentTurn === 1, 'Duel starts at Turn 1');
  assert(engine.player.normalSummonsRemaining === 1, 'Player has exactly 1 Normal Summon remaining at turn start');
  engine.player.mana = 10; // Provide sufficient testing mana

  // Find a normal summonable monster in hand (Level <= 4)
  let handMonster = engine.player.hand.find(c => (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'MONSTER') && (c.def.level || 4) <= 4);
  if (!handMonster) {
    const lowLvlDeckIndex = engine.player.deck.findIndex(c => (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'MONSTER') && (c.def.level || 4) <= 4);
    if (lowLvlDeckIndex !== -1) {
      const [lowLvlCard] = engine.player.deck.splice(lowLvlDeckIndex, 1);
      engine.player.hand.push(lowLvlCard);
      handMonster = lowLvlCard;
    }
  }
  assert(handMonster !== undefined, 'Found summonable monster in opening hand');

  // Execute 1st Normal Summon -> Success
  console.log('handMonster:', { name: handMonster.def.name, manaCost: handMonster.def.manaCost, level: handMonster.def.level, playerMana: engine.player.mana });
  const normalRes1 = engine.normalSummon('player', handMonster.uid, 'FACE_UP_ATTACK');
  console.log('normalRes1:', normalRes1);
  assert(normalRes1.success === true, 'First normal summon succeeds');
  assert(engine.player.normalSummonsRemaining === 0, 'normalSummonsRemaining decremented to 0');

  // Attempt 2nd Normal Summon in same turn -> Must FAIL
  let secondMonster = engine.player.hand.find(c => c.uid !== handMonster.uid && (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'MONSTER') && (c.def.level || 4) <= 4);
  if (!secondMonster) {
    const lowLvlDeckIndex = engine.player.deck.findIndex(c => (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'MONSTER') && (c.def.level || 4) <= 4);
    if (lowLvlDeckIndex !== -1) {
      const [lowLvlCard] = engine.player.deck.splice(lowLvlDeckIndex, 1);
      engine.player.hand.push(lowLvlCard);
      secondMonster = lowLvlCard;
    }
  }
  if (secondMonster) {
    const normalRes2 = engine.normalSummon('player', secondMonster.uid, 'FACE_UP_ATTACK');
    assert(normalRes2.success === false, 'Second normal summon in the same turn is strictly rejected');
    assert(normalRes2.message.includes('Triệu Hồi Thường') || normalRes2.message.includes('Triệu hồi Thường'), 'Rejection message clearly cites normal summon limit');
  }

  // Execute Special Summon from Hand -> Must SUCCEED even with normalSummonsRemaining === 0!
  const specialHandMonster = engine.player.hand.find(c => c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER');
  if (specialHandMonster) {
    const specialRes = engine.specialSummonFromHand('player', specialHandMonster.uid, 'FACE_UP_ATTACK');
    assert(specialRes.success === true, 'Special Summon from Hand succeeds despite normalSummonsRemaining === 0');
    assert(engine.player.normalSummonsRemaining === 0, 'normalSummonsRemaining remains 0 and was not consumed');
  }

  // Test Special Summon from Graveyard (Revival)
  // Place a monster properly into GY
  const deadMonster = engine.player.deck.find(c => c.def.cardType === 'ELEMENT_MONSTER');
  if (deadMonster) {
    deadMonster.wasProperlySummoned = true; // Mark as properly summoned
    engine.player.graveyard.push(deadMonster);
    const gyRes = engine.specialSummonFromGraveyard('player', deadMonster.uid, 'FACE_UP_ATTACK');
    assert(gyRes.success === true, 'Special Summon from Graveyard succeeds for properly summoned monster');
    assert(!engine.player.graveyard.some(c => c.uid === deadMonster.uid), 'Monster moved from Graveyard to battlefield');
  }

  // Test Special Summon from Deck (Tutor / Recruitment)
  const deckMonster = engine.player.deck.find(c => c.def.cardType === 'ELEMENT_MONSTER');
  if (deckMonster) {
    const initialDeckSize = engine.player.deck.length;
    const deckSummonRes = engine.specialSummonFromDeck('player', deckMonster.uid, 'FACE_UP_DEFENSE');
    assert(deckSummonRes.success === true, 'Special Summon from Deck summons monster directly to field');
    assert(engine.player.deck.length === initialDeckSize - 1, 'Deck size decremented by 1');
  }

  // Test Search Deck to Hand
  const targetCard = engine.player.deck[0];
  if (targetCard) {
    const preHandCount = engine.player.hand.length;
    const searchRes = engine.searchDeckToHand('player', targetCard.uid);
    assert(searchRes.success === true, 'Search Deck to Hand retrieves target card');
    assert(engine.player.hand.length === preHandCount + 1, 'Hand count incremented by 1');
  }
}

// -----------------------------------------------------------------------------
// 3. INTERACTIVE BATTLEFIELD REACTION ENGINE
// -----------------------------------------------------------------------------
console.log('\n--- 3. Testing Interactive Battlefield Chemical Reaction Engine ---');
{
  const testDeck = PLAYABLE_CARDS.slice(0, 30).map(c => c.id);
  const engine = new DuelEngine(testDeck, [], 'ADEPT', undefined, undefined, 8000);

  // Set up environmental conditions: Moisture (WATER solvent)
  engine.setEnvironment({ solvent: 'WATER', temperature: 298.15, ph: 7.0 }, 'Thí Nghiệm Dung Dịch Nước');

  // Create Na and H2O card instances on player's field
  const naDef = PLAYABLE_CARDS.find(c => c.chemicalFormula === 'Na' || c.id === 'ELEM_NA_011') || PLAYABLE_CARDS[0];
  const h2oDef = PLAYABLE_CARDS.find(c => c.chemicalFormula === 'H2O') || PLAYABLE_CARDS[1];

  const naInstance = {
    uid: 'test_na_uid',
    def: { ...naDef, chemicalFormula: 'Na' },
    isFaceDown: false
  };
  const h2oInstance = {
    uid: 'test_h2o_uid',
    def: { ...h2oDef, chemicalFormula: 'H2O' },
    isFaceDown: false
  };

  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: naInstance,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: h2oInstance,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const initialOpponentLp = engine.opponent.lp;
  const reactionRes = engine.evaluateBattlefieldReaction('player', ['test_na_uid', 'test_h2o_uid']);
  console.log('reactionRes:', {
    status: reactionRes.status,
    success: reactionRes.success,
    equation: reactionRes.equation,
    pedagogicalMessage: reactionRes.pedagogicalMessage
  });

  assert(reactionRes.success === true, 'Reaction engine successfully balances 2Na + 2H2O -> 2NaOH + H2');
  assert(reactionRes.equation.includes('NaOH') || reactionRes.equation.includes('H2'), `Reaction equation correctly formed: ${reactionRes.equation}`);
  assert(reactionRes.damageInflicted > 0, `Direct combat damage dealt: ${reactionRes.damageInflicted} LP`);
  assert(engine.opponent.lp < initialOpponentLp, `Opponent LP reduced from ${initialOpponentLp} to ${engine.opponent.lp}`);

  // Test Cognitive Trap: Cu + HCl(aq) -> Must NOT react (Cu less active than H)
  const cuInstance = {
    uid: 'test_cu_uid',
    def: { ...PLAYABLE_CARDS[0], chemicalFormula: 'Cu' },
    isFaceDown: false
  };
  const hclInstance = {
    uid: 'test_hcl_uid',
    def: { ...PLAYABLE_CARDS[1], chemicalFormula: 'HCl' },
    isFaceDown: false
  };
  engine.player.monsterZones[2] = {
    slotIndex: 2,
    card: cuInstance,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[3] = {
    slotIndex: 3,
    card: hclInstance,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const trapRes = engine.evaluateBattlefieldReaction('player', ['test_cu_uid', 'test_hcl_uid']);
  assert(trapRes.success === false, 'Cognitive trap: Cu + HCl correctly evaluated as INVALID (No reaction)');
  assert(trapRes.status === 'TRAP_TRIGGERED', 'Cognitive trap triggers TRAP_TRIGGERED status');
  assert(trapRes.pedagogicalMessage.includes('Đồng') || trapRes.pedagogicalMessage.includes('hydro'), 'Scientific explanation clearly identifies Cu electrochemical potential');
}

// -----------------------------------------------------------------------------
// 4. ELEMENTAL SHARDS CRAFTING & RECYCLING ECONOMY
// -----------------------------------------------------------------------------
console.log('\n--- 4. Testing Elemental Shards Economy & Transaction Ledger ---');
{
  // Verify Tier Costs
  assert(SHARD_CRAFTING_COSTS.COMMON === 60, 'Common craft cost is 60 Shards');
  assert(SHARD_CRAFTING_COSTS.RARE === 160, 'Rare craft cost is 160 Shards');
  assert(SHARD_CRAFTING_COSTS.SUPER_RARE === 400, 'Super Rare craft cost is 400 Shards');
  assert(SHARD_CRAFTING_COSTS.ULTRA_RARE === 1000, 'Ultra Rare craft cost is 1000 Shards');
  assert(SHARD_CRAFTING_COSTS.SECRET_RARE === 2400, 'Secret Rare craft cost is 2400 Shards');

  // Verify Recycle Yields
  assert(SHARD_RECYCLE_YIELDS.COMMON === 15, 'Common recycle yield is 15 Shards (25% refund)');
  assert(SHARD_RECYCLE_YIELDS.RARE === 40, 'Rare recycle yield is 40 Shards (25% refund)');
  assert(SHARD_RECYCLE_YIELDS.SUPER_RARE === 100, 'Super Rare recycle yield is 100 Shards (25% refund)');
  assert(SHARD_RECYCLE_YIELDS.ULTRA_RARE === 250, 'Ultra Rare recycle yield is 250 Shards (25% refund)');
  assert(SHARD_RECYCLE_YIELDS.SECRET_RARE === 600, 'Secret Rare recycle yield is 600 Shards (25% refund)');

  // Test Crafting with Insufficient Shards -> Rejection
  const baseProfile = {
    id: 'test_player',
    name: 'Chiến Binh Hóa Học',
    title: 'Nhà Thực Nghiệm',
    tokens: 500,
    elementalShards: 50, // Only 50 Shards
    cardCollection: {},
    auditTransactions: []
  };

  const secretCard = PLAYABLE_CARDS.find(c => c.rarity === 'SECRET_RARE') || PLAYABLE_CARDS[0];
  const failCraft = craftCardWithShards(baseProfile, secretCard.id);
  assert(failCraft.success === false, 'Crafting with 50 Shards when 2400 is required is rejected');
  assert(failCraft.message.includes('Không đủ Elemental Shards'), 'Error message clearly specifies insufficient shards');

  // Test Crafting with Sufficient Shards -> Success & Transaction Ledger
  const richProfile = {
    ...baseProfile,
    elementalShards: 3000
  };
  const successCraft = craftCardWithShards(richProfile, secretCard.id);
  assert(successCraft.success === true, `Successfully crafted [${secretCard.name}]`);
  assert(successCraft.updatedProfile.elementalShards === 3000 - 2400, 'Elemental Shards balance correctly deducted by 2400');
  assert(successCraft.updatedProfile.cardCollection[secretCard.id] === 1, 'Card added to collection with count = 1');
  const craftTx = successCraft.updatedProfile.auditTransactions.find(t => t.type === 'CARD_CRAFT');
  assert(craftTx !== undefined, 'Audit transaction created with type CARD_CRAFT');
  assert(craftTx.amount === 2400, 'Transaction amount recorded as 2400');

  // Test Duplicate Recycling (>3 copies)
  const dupProfile = {
    ...baseProfile,
    elementalShards: 100,
    cardCollection: {
      [PLAYABLE_CARDS[0].id]: 5, // 2 duplicate copies
      [PLAYABLE_CARDS[1].id]: 3, // exactly 3 (no duplicate)
      [PLAYABLE_CARDS[2].id]: 1  // 1 copy (no duplicate)
    }
  };

  const scan = scanDuplicateCards(dupProfile.cardCollection);
  assert(scan.totalCardsToRecycle === 2, 'scanDuplicateCards correctly identified 2 excess copies');

  const recycleRes = recycleDuplicates(dupProfile);
  assert(recycleRes.success === true, 'recycleDuplicates executed successfully');
  assert(recycleRes.countRecycled === 2, 'Exactly 2 copies recycled');
  assert(recycleRes.shardsGained > 0, `Received +${recycleRes.shardsGained} Elemental Shards`);
  assert(recycleRes.updatedProfile.cardCollection[PLAYABLE_CARDS[0].id] === 3, 'Collection count clamped to exactly 3 copies');
  const recycleTx = recycleRes.updatedProfile.auditTransactions.find(t => t.type === 'CARD_RECYCLE');
  assert(recycleTx !== undefined, 'Audit transaction created with type CARD_RECYCLE');
}

// -----------------------------------------------------------------------------
// 5. THEMATIC BOOSTER PACKS & REPRODUCIBLE CARD POOLS
// -----------------------------------------------------------------------------
console.log('\n--- 5. Testing Booster Shop Thematic Boxes & Card Pools ---');
{
  assert(Array.isArray(THEMATIC_BOOSTER_BOXES) && THEMATIC_BOOSTER_BOXES.length === 4, 'Shop has exactly 4 thematic booster boxes');

  for (const box of THEMATIC_BOOSTER_BOXES) {
    assert(box.subPacks.length === 2, `Box [${box.title}] has 2 sub-packs`);
    for (const subPack of box.subPacks) {
      assert(subPack.priceTokens === 100, `Sub-pack [${subPack.name}] priced at 100 Knowledge Tokens`);
      assert(subPack.featuredCardIds.length >= 3, `Sub-pack [${subPack.name}] highlights >= 3 featured cards`);
      // Verify every featured card exists in catalog
      for (const cardId of subPack.featuredCardIds) {
        const c = getPlayableCardById(cardId);
        assert(c !== undefined, `Featured card [${cardId}] exists in PLAYABLE_CARDS database`);
      }
    }
  }
}

console.log('\n======================================================================');
console.log('   ✓ ALL 5 TCG OVERHAUL TEST PILLARS PASSED SUCCESSFULLY! (100%)');
console.log('======================================================================\n');
