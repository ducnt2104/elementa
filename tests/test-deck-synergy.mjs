// test-deck-synergy.mjs
// Automated Test Suite for Deck Management Synergy Engine & Pedagogical Recommendations

import assert from 'node:assert';
import { DeckManagementService } from '../src/domain/deckManagement.ts';

console.log('============================================================');
console.log('   ELEMENTA: 9-SLOT DECK SYNERGY & COMBOS AUDIT SUITE');
console.log('============================================================\n');

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    -> ${err.message}`);
    failed++;
  }
}

// Global in-memory localStorage mock for node
const store = {};
globalThis.localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, val) => { store[key] = String(val); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { for (const k in store) delete store[k]; }
};

const slots = DeckManagementService.loadDeckSlots();

// -------------------------------------------------------------
// 1. Pre-built Nitro Legion Archetype Synergy
// -------------------------------------------------------------
console.log('--- 1. Nitro Legion Archetype Synergy ---');

runTest('Slot 1 (Nitro Legion) yields NITRO_LEGION archetype with Haber-Bosch combo', () => {
  const slot1 = slots[0];
  const syn = DeckManagementService.analyzeDeckSynergy(slot1.mainDeck, slot1.extraDeck);

  assert.equal(syn.dominantArchetype, 'NITRO_LEGION', 'Identifies dominant archetype as NITRO_LEGION');
  assert.ok(syn.elementalGroups.pnictogen >= 5, `Pnictogen group count >= 5 (got ${syn.elementalGroups.pnictogen})`);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Haber-Bosch')), 'Detects Haber-Bosch combo in deck');
  assert.ok(syn.synergyScore >= 70, `Synergy score is high >= 70 (got ${syn.synergyScore})`);
  assert.ok(syn.redoxBalance.isBalanced, 'Redox balance is maintained');
});

// -------------------------------------------------------------
// 2. Pre-built Sulfur Forge Archetype Synergy
// -------------------------------------------------------------
console.log('\n--- 2. Sulfur Forge Archetype Synergy ---');

runTest('Slot 2 (Sulfur Forge) yields SULFUR_FORGE archetype with high chalcogen concentration', () => {
  const slot2 = slots[1];
  const syn = DeckManagementService.analyzeDeckSynergy(slot2.mainDeck, slot2.extraDeck);

  assert.equal(syn.dominantArchetype, 'SULFUR_FORGE', 'Identifies dominant archetype as SULFUR_FORGE');
  assert.ok(syn.elementalGroups.chalcogen >= 6, `Chalcogen count >= 6 (got ${syn.elementalGroups.chalcogen})`);
  assert.ok(syn.synergyScore >= 70, `Synergy score >= 70 (got ${syn.synergyScore})`);
});

// -------------------------------------------------------------
// 3. Pre-built Alkali-Halogen Core Archetype Synergy
// -------------------------------------------------------------
console.log('\n--- 3. Alkali-Halogen Core Archetype Synergy ---');

runTest('Slot 3 (Alkali-Halogen Core) yields ALKALI_HALOGEN archetype with Salt formation & Water explosion', () => {
  const slot3 = slots[2];
  const syn = DeckManagementService.analyzeDeckSynergy(slot3.mainDeck, slot3.extraDeck);

  assert.equal(syn.dominantArchetype, 'ALKALI_HALOGEN', 'Identifies dominant archetype as ALKALI_HALOGEN');
  assert.ok(syn.elementalGroups.alkali >= 3, `Alkali count >= 3 (got ${syn.elementalGroups.alkali})`);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Tạo Muối') || c.includes('Thủy Kích')), 'Detects ionic salt or water detonation combos');
  assert.ok(syn.synergyScore >= 70, `Synergy score >= 70 (got ${syn.synergyScore})`);
});

// -------------------------------------------------------------
// 4. Custom & Pre-built Organic Synthesis Deck Synergy
// -------------------------------------------------------------
console.log('\n--- 4. Organic Synthesis Archetype Synergy ---');

runTest('Organic synthesis custom deck detects esterification/saponification combos', () => {
  const organicDeck = [
    'card_elem_6_c', 'card_elem_6_c', 'card_elem_6_c',
    'card_elem_1_h', 'card_elem_1_h', 'card_elem_1_h',
    'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o',
    'card_spell_ester_synth', 'card_spell_ester_synth',
    'card_spell_saponification', 'card_spell_saponification'
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(organicDeck, []);
  assert.ok(syn.elementalGroups.organic >= 3, `Identifies organic species (got ${syn.elementalGroups.organic})`);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Este Hóa')), 'Detects organic esterification combo');
});

runTest('Slot 4 (Pre-built Organic Synthesis) yields ORGANIC_SYNTHESIS archetype with high synergy', () => {
  const slot4 = slots[3];
  assert.ok(slot4, 'Slot 4 must exist in pre-built slots');
  const syn = DeckManagementService.analyzeDeckSynergy(slot4.mainDeck, slot4.extraDeck);

  assert.strictEqual(syn.dominantArchetype, 'ORGANIC_SYNTHESIS', 'Dominant archetype must be ORGANIC_SYNTHESIS');
  assert.ok(syn.elementalGroups.organic >= 5, `Organic group count >= 5 (got ${syn.elementalGroups.organic})`);
  assert.ok(syn.synergyScore >= 70, `Synergy score >= 70 (got ${syn.synergyScore})`);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Este Hóa')), 'Contains organic synthesis combo');
});

// -------------------------------------------------------------
// 5. Thermite & Contact Process Specific Combo Detection
// -------------------------------------------------------------
console.log('\n--- 5. Thermite & Special Chemical Combos ---');

runTest('Deck with Aluminum and Iron Oxide detects Thermite 3000°C combo', () => {
  const thermiteDeck = [
    'card_elem_13_al', 'card_elem_13_al',
    'card_comp_fe2o3', 'card_comp_fe2o3',
    ...Array(26).fill('card_elem_6_c')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(thermiteDeck, []);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Nhiệt Nhôm')), 'Detects Thermite 3000°C combo');
});

// -------------------------------------------------------------
// 6. Redox Balance & Imbalance Detection
// -------------------------------------------------------------
console.log('\n--- 6. Redox Balance Evaluation ---');

runTest('Heavily oxidizing deck triggers imbalance warning and recommendation to add reductants', () => {
  // Pure halogens (strong oxidants)
  const oxidantDeck = [
    ...Array(10).fill('card_elem_9_f'),
    ...Array(10).fill('card_elem_17_cl'),
    ...Array(10).fill('card_elem_35_br')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(oxidantDeck, []);
  assert.strictEqual(syn.redoxBalance.isBalanced, false, 'Oxidant-heavy deck must be flagged as unbalanced');
  assert.ok(syn.redoxBalance.oxidants > syn.redoxBalance.reductants, 'Oxidants must exceed reductants');
  assert.ok(syn.recommendations.some(r => r.includes('khử') || r.includes('kim loại')), 'Recommends adding reducing metals');
});

runTest('Balanced deck satisfies isBalanced with healthy redox ratio', () => {
  // 50% alkali reductants + 50% halogen oxidants
  const balancedDeck = [
    ...Array(15).fill('card_elem_11_na'),
    ...Array(15).fill('card_elem_17_cl')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(balancedDeck, []);
  assert.strictEqual(syn.redoxBalance.isBalanced, true, 'Equimolar Na and Cl deck is redox balanced');
});

// -------------------------------------------------------------
// 7. Mixed Hybrid Archetype Detection
// -------------------------------------------------------------
console.log('\n--- 7. Mixed Hybrid Archetype Detection ---');

runTest('Dispersed deck with no group reaching 5 yields MIXED_HYBRID archetype', () => {
  const dispersedDeck = [
    'card_elem_11_na', 'card_elem_11_na', // 2 alkali
    'card_elem_17_cl', 'card_elem_17_cl', // 2 halogen
    'card_elem_7_n', 'card_elem_7_n',     // 2 pnictogen
    'card_elem_8_o', 'card_elem_8_o',     // 2 chalcogen
    'card_elem_26_fe', 'card_elem_26_fe'  // 2 transition
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(dispersedDeck, []);
  assert.strictEqual(syn.dominantArchetype, 'MIXED_HYBRID', 'Dispersed deck must classify as MIXED_HYBRID');
});

// -------------------------------------------------------------
// 8. Synergy Score Bounds Invariant [0, 100]
// -------------------------------------------------------------
console.log('\n--- 8. Mathematical Synergy Score Bounds [0, 100] ---');

runTest('Synergy score is strictly clamped in [0, 100] for all decks', () => {
  const testDecks = [
    [],
    ['card_elem_11_na'],
    slots[0].mainDeck,
    slots[1].mainDeck,
    slots[2].mainDeck,
    slots[3].mainDeck
  ];

  for (const d of testDecks) {
    const syn = DeckManagementService.analyzeDeckSynergy(d, []);
    assert.ok(syn.synergyScore >= 0, `Synergy score must be >= 0 (got ${syn.synergyScore})`);
    assert.ok(syn.synergyScore <= 100, `Synergy score must be <= 100 (got ${syn.synergyScore})`);
  }
});

// -------------------------------------------------------------
// 9. Edge Case: Empty & Low Synergy Deck Recommendations
// -------------------------------------------------------------
console.log('\n--- 9. Edge Case: Recommendations on Incomplete Decks ---');

runTest('Empty deck provides constructive recommendations for student deck building', () => {
  const emptySyn = DeckManagementService.analyzeDeckSynergy([], []);
  assert.equal(emptySyn.chemicalCombosAvailable.length, 0, 'No combos available in empty deck');
  assert.ok(emptySyn.recommendations.length >= 2, 'Generates multiple recommendations for empty deck');
  assert.ok(emptySyn.recommendations.some(r => r.includes('30 lá')), 'Recommends minimum 30 cards');
});

// -------------------------------------------------------------
// 10. Acid-Base Neutralization Combo Detection
// -------------------------------------------------------------
console.log('\n--- 10. Acid-Base Neutralization & Titration Combos ---');

runTest('Deck with HCl and NaOH detects Neutralization Titration combo', () => {
  const neutralizationDeck = [
    'card_comp_hcl', 'card_elem_11_na',
    ...Array(28).fill('card_elem_6_c')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(neutralizationDeck, []);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Chuẩn Độ Trung Hòa')), 'Detects Neutralization Titration combo');
});

// -------------------------------------------------------------
// 11. Industrial Contact Process & Sulfuric Acid Cascade
// -------------------------------------------------------------
console.log('\n--- 11. Industrial Contact Process & Sulfuric Acid Cascade ---');

runTest('Deck with SO2 and O2 detects V2O5 Contact Process combo', () => {
  const contactDeck = [
    'card_comp_so2_gas', 'card_elem_8_o', 'card_comp_h2so4',
    ...Array(27).fill('card_elem_6_c')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(contactDeck, []);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Quy Trình Tiếp Xúc V₂O₅')), 'Detects V2O5 Contact Process combo');
});

// -------------------------------------------------------------
// 12. Tollens Silver Mirror Reaction Detection
// -------------------------------------------------------------
console.log('\n--- 12. Tollens Silver Mirror Reaction Detection ---');

runTest('Deck with Glucose C6H12O6 detects Tollens Silver Mirror combo', () => {
  const mirrorDeck = [
    'card_comp_glucose', 'card_elem_47_ag',
    ...Array(28).fill('card_elem_6_c')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(mirrorDeck, []);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Tráng Bạc Tollens')), 'Detects Tollens Silver Mirror combo');
});

// -------------------------------------------------------------
// 13. Hydrogen Sulfide Corrosion Combo Detection
// -------------------------------------------------------------
console.log('\n--- 13. Hydrogen Sulfide Corrosion Detection ---');

runTest('Deck with H2S rotten egg gas detects iron corrosion combo', () => {
  const h2sDeck = [
    'card_comp_h2s_rotten', 'card_elem_26_fe',
    ...Array(28).fill('card_elem_6_c')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(h2sDeck, []);
  assert.ok(syn.chemicalCombosAvailable.some(c => c.includes('Tử Khí Trứng Thối')), 'Detects H2S FeS corrosion combo');
});

// -------------------------------------------------------------
// 14. Extra Deck Tactical Bonus (+5 Score) Invariant
// -------------------------------------------------------------
console.log('\n--- 14. Extra Deck Tactical Bonus (+5 Score) Invariant ---');

runTest('Adding >= 2 Extra Deck cards awards +5 synergy score bonus', () => {
  const baseDeck = Array(30).fill('card_elem_6_c');
  const synWithoutExtra = DeckManagementService.analyzeDeckSynergy(baseDeck, []);
  const synWithExtra = DeckManagementService.analyzeDeckSynergy(baseDeck, ['card_comp_h2o', 'card_comp_nacl']);

  assert.strictEqual(synWithExtra.synergyScore, synWithoutExtra.synergyScore + 5, 'Extra Deck >= 2 provides exactly +5 synergy score');
});

// -------------------------------------------------------------
// 15. Qualitative Pedagogical Recommendations for Reductants & Oxidants
// -------------------------------------------------------------
console.log('\n--- 15. Qualitative Pedagogical Recommendations ---');

runTest('Deck lacking metal reductants explicitly prompts student to add reducing metals', () => {
  const noReductantDeck = [
    ...Array(15).fill('card_elem_9_f'),
    ...Array(15).fill('card_elem_17_cl')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(noReductantDeck, []);
  assert.ok(syn.recommendations.some(r => r.includes('Thiếu chất khử kim loại')), 'Properly prompts missing reductants advice');
});

runTest('Deck lacking oxidants explicitly prompts student to add oxidants / halogens / acids', () => {
  const noOxidantDeck = [
    ...Array(15).fill('card_elem_11_na'),
    ...Array(15).fill('card_elem_19_k')
  ];

  const syn = DeckManagementService.analyzeDeckSynergy(noOxidantDeck, []);
  assert.ok(syn.recommendations.some(r => r.includes('Thiếu chất oxi hóa')), 'Properly prompts missing oxidants advice');
});

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
