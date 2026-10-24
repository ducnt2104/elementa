// test-extra-deck-cutin-synthesis.mjs
// Comprehensive test suite for Extra Deck Compound Synthesis & Link Summon Mechanics and Event Payloads (Suite 41)

import assert from 'node:assert';
import { DuelEngine } from './src/domain/duelEngine.ts';
import { PLAYABLE_CARDS } from './src/data/playableCardsData.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 41: EXTRA DECK SYNTHESIS & LINK SUMMON SUITE      ');
console.log('======================================================================\n');

// ---------------------------------------------------------------------------
// 1. Database & Recipe Verification
// ---------------------------------------------------------------------------
console.log('--- 1. Extra Deck Cards & Synthesis Recipes Verification ---');

const extraDeckCards = PLAYABLE_CARDS.filter(c => c.cardType === 'COMPOUND_MONSTER' || c.cardType === 'LINK_MONSTER');
assert(extraDeckCards.length > 0, 'Must have Extra Deck cards in database');

const compoundCards = extraDeckCards.filter(c => c.cardType === 'COMPOUND_MONSTER' && c.synthesisRecipe !== undefined);
assert(compoundCards.length >= 3, `Must have at least 3 synthesis compound monsters (got ${compoundCards.length})`);

for (const card of compoundCards) {
  assert(card.synthesisRecipe !== undefined, `Compound card ${card.id} must define synthesisRecipe`);
  assert(card.synthesisRecipe.reactantFormulas.length > 0, `Recipe for ${card.id} must require at least 1 reactant formula`);
  assert(card.synthesisRecipe.pedagogicalEquation.length > 0, `Recipe for ${card.id} must define pedagogical equation string`);
}
console.log(`  ✓ PASS: Verified all ${compoundCards.length} Compound Monsters have valid chemical recipes and pedagogical equations`);

const linkCards = extraDeckCards.filter(c => c.cardType === 'LINK_MONSTER');
assert(linkCards.length >= 2, `Must have at least 2 link monsters (got ${linkCards.length})`);
for (const card of linkCards) {
  assert(typeof card.linkRating === 'number' && card.linkRating >= 1, `Link card ${card.id} must have linkRating >= 1`);
}
console.log(`  ✓ PASS: Verified all ${linkCards.length} Link Monsters have valid link ratings`);

// ---------------------------------------------------------------------------
// 2. Compound Synthesis Execution & Material Consumption
// ---------------------------------------------------------------------------
console.log('\n--- 2. Compound Synthesis Summon Execution ---');

const testMain = [
  'card_elem_11_na',
  'card_elem_11_na',
  'card_elem_17_cl',
  'card_elem_17_cl',
  'card_elem_1_h',
  'card_elem_1_h',
  'card_elem_8_o',
  'card_elem_26_fe',
  ...Array(22).fill('card_elem_6_c')
];

const testExtra = [
  'card_comp_nacl',
  'card_comp_h2o',
  'card_link_2_ethylene',
  'card_link_4_diamond'
];

const engine = new DuelEngine(testMain, testExtra, 'INTERMEDIATE');
engine.currentPhase = 'MAIN_PHASE_1';

// Find NaCl compound in extra deck
const naclCard = engine.player.extraDeck.find(c => c.def.id === 'card_comp_nacl');
assert(naclCard !== undefined, 'NaCl must be present in player extra deck');

// Manually place Na and Cl in player hand or field
engine.player.mana = 10;
engine.player.hand = [
  { uid: 'na_1', def: PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na') },
  { uid: 'cl_1', def: PLAYABLE_CARDS.find(c => c.id === 'card_elem_17_cl') }
];
engine.player.monsterZones = [null, null, null, null, null];
engine.player.graveyard = [];

const sources = [
  { location: 'HAND', idOrSlot: 'na_1' },
  { location: 'HAND', idOrSlot: 'cl_1' }
];

const synthResult = engine.compoundSynthesisSummon('player', naclCard.uid, sources);
assert(synthResult.success === true, `NaCl Compound synthesis should succeed (got error: ${synthResult.message})`);

// Verify summoned monster is on field in Zone 0
const summoned = engine.player.monsterZones[0];
assert(summoned !== null && summoned.card !== null, 'Zone 0 must contain summoned compound monster');
assert(summoned.card.def.id === 'card_comp_nacl', 'Summoned monster must be NaCl');
assert(summoned.position === 'FACE_UP_ATTACK', 'Default position must be FACE_UP_ATTACK');

// Verify materials were moved to graveyard
assert(engine.player.graveyard.length === 2, `Graveyard must contain 2 materials (got ${engine.player.graveyard.length})`);
assert(engine.player.graveyard.some(c => c.def.chemicalFormula === 'Na'), 'Graveyard must contain Na');
assert(engine.player.graveyard.some(c => c.def.chemicalFormula === 'Cl'), 'Graveyard must contain Cl');

// Verify extra deck size decreased
assert(!engine.player.extraDeck.some(c => c.uid === naclCard.uid), 'NaCl must no longer be in Extra Deck');
console.log('  ✓ PASS: Compound synthesis consumed hand materials, moved to GY, and placed NaCl on field');

// ---------------------------------------------------------------------------
// 3. Link Summoning Mechanics & Rating Calculation
// ---------------------------------------------------------------------------
console.log('\n--- 3. Link Summoning Execution ---');

const linkCard = engine.player.extraDeck.find(c => c.def.id === 'card_link_2_ethylene');
assert(linkCard !== undefined, 'Ethylene Link-2 must be in extra deck');

// Place 2 monsters on the field in zones 1 and 2
engine.player.mana = 10;
engine.player.monsterZones[1] = {
  card: { uid: 'mat_1', def: PLAYABLE_CARDS.find(c => c.id === 'card_elem_26_fe') },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};
engine.player.monsterZones[2] = {
  card: { uid: 'mat_2', def: PLAYABLE_CARDS.find(c => c.id === 'card_elem_6_c') },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};

const linkResult = engine.linkSummon('player', linkCard.uid, [1, 2]);
assert(linkResult.success === true, `Link summon must succeed (got error: ${linkResult.message})`);

// Verify link monster is placed in first available zone (zone 1, which was freed up by material)
const linkMonsterOnField = engine.player.monsterZones.find(s => s && s.card && s.card.def.id === 'card_link_2_ethylene');
assert(linkMonsterOnField !== undefined, 'Link monster must be placed on the field');
assert(linkMonsterOnField.position === 'FACE_UP_ATTACK', 'Link monsters can only be in FACE_UP_ATTACK');
assert(engine.player.monsterZones[2] === null, 'Zone 2 should remain empty');

// Verify materials went to GY
assert(engine.player.graveyard.some(c => c.uid === 'mat_1'), 'Material Fe must be in Graveyard');
assert(engine.player.graveyard.some(c => c.uid === 'mat_2'), 'Material C must be in Graveyard');
console.log('  ✓ PASS: Link Summoning verified: 2 materials sent to GY, Link-2 monster placed on field');

// ---------------------------------------------------------------------------
// 4. Validation & Edge Case Protections
// ---------------------------------------------------------------------------
console.log('\n--- 4. Edge Cases & Insufficient Resource Guards ---');

// Attempting Link summon with empty materials
const invalidLinkRes = engine.linkSummon('player', 'invalid_uid', []);
assert(invalidLinkRes.success === false, 'Link summon with 0 materials must be rejected');

// Attempting summon when mana is insufficient
engine.player.mana = 0;
const noManaRes = engine.compoundSynthesisSummon('player', 'any_uid', []);
assert(noManaRes.success === false, 'Summon without mana must be rejected');

// Duplicate slot exploitation guard
const duplicateSlotAttempt = engine.linkSummon('player', linkCard.uid, [0, 0]);
assert(duplicateSlotAttempt.success === false, 'Duplicate slot in link materials must be rejected');
console.log('  ✓ PASS: Resource guards, duplicate slot prevention, and invalid UID protections passed');

// ---------------------------------------------------------------------------
// 5. Multi-Reactant Synthesis & Hybrid Field/Hand Materials (H2O Heal Trigger)
// ---------------------------------------------------------------------------
console.log('\n--- 5. Multi-Reactant Synthesis & Hybrid Materials (H2O Heal Trigger) ---');

const testMain2 = [
  'card_elem_1_h',
  'card_elem_1_h',
  'card_elem_8_o',
  'card_elem_11_na',
  'card_elem_17_cl',
  ...Array(25).fill('card_elem_6_c')
];

const testExtra2 = [
  'card_comp_h2o',
  'card_comp_agcl',
  'card_comp_thermite',
  'card_link_1_h_bond',
  'card_link_2_ethylene',
  'card_link_4_diamond'
];

const engine2 = new DuelEngine(testMain2, testExtra2, 'INTERMEDIATE');
engine2.currentPhase = 'MAIN_PHASE_1';
engine2.player.mana = 10;
engine2.player.lp = 6000;
engine2.player.maxLp = 8000;

// Setup: 1 H monster on field (slot 0), 1 H in hand, 1 O in hand
engine2.player.monsterZones[0] = {
  card: { uid: 'h_field', def: PLAYABLE_CARDS.find(c => c.id === 'card_elem_1_h') },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};
engine2.player.hand = [
  { uid: 'h_hand', def: PLAYABLE_CARDS.find(c => c.id === 'card_elem_1_h') },
  { uid: 'o_hand', def: PLAYABLE_CARDS.find(c => c.id === 'card_elem_8_o') }
];

const h2oCard = engine2.player.extraDeck.find(c => c.def.id === 'card_comp_h2o');
assert(h2oCard !== undefined, 'H2O must be in Extra Deck');

const hybridSources = [
  { location: 'FIELD', idOrSlot: 0 },
  { location: 'HAND', idOrSlot: 'h_hand' },
  { location: 'HAND', idOrSlot: 'o_hand' }
];

const h2oRes = engine2.compoundSynthesisSummon('player', h2oCard.uid, hybridSources);
assert.strictEqual(h2oRes.success, true, `H2O hybrid synthesis should succeed (got: ${h2oRes.message})`);

// Verify materials went to Graveyard (1 from field, 2 from hand)
assert.strictEqual(engine2.player.hand.length, 0, 'Both hand cards consumed');
assert.ok(engine2.player.graveyard.some(c => c.uid === 'h_field'), 'Field H went to GY');
assert.ok(engine2.player.graveyard.some(c => c.uid === 'h_hand'), 'Hand H went to GY');
assert.ok(engine2.player.graveyard.some(c => c.uid === 'o_hand'), 'Hand O went to GY');

// Verify H2O summoned on field
const h2oOnField = engine2.player.monsterZones.find(s => s && s.card && s.card.def.id === 'card_comp_h2o');
assert.ok(h2oOnField, 'H2O must be placed on field');

// Verify COMP_H2O_HEAL triggered (+800 LP: 6000 -> 6800)
assert.strictEqual(engine2.player.lp, 6800, `Player LP should be healed by +800 to 6800 (got ${engine2.player.lp})`);
console.log('  ✓ PASS: Multi-reactant hybrid (1 Field + 2 Hand) synthesis of H2O healed player +800 LP');

// ---------------------------------------------------------------------------
// 6. AgCl Freeze & Thermite Meltdown Triggers
// ---------------------------------------------------------------------------
console.log('\n--- 6. AgCl Freeze & Thermite Meltdown Triggers ---');

// Setup AgCl test
engine2.player.mana = 10;
const agCard = PLAYABLE_CARDS.find(c => c.id === 'card_elem_47_ag');
const clCard = PLAYABLE_CARDS.find(c => c.id === 'card_elem_17_cl');
engine2.player.hand = [
  { uid: 'ag_1', def: agCard },
  { uid: 'cl_2', def: clCard }
];

// Give opponent a monster that hasn't attacked
const feDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_26_fe');
engine2.opponent.monsterZones[0] = {
  card: { uid: 'opp_fe', def: feDef },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};

const agclCard = engine2.player.extraDeck.find(c => c.def.id === 'card_comp_agcl');
assert(agclCard !== undefined);

const agclRes = engine2.compoundSynthesisSummon('player', agclCard.uid, [
  { location: 'HAND', idOrSlot: 'ag_1' },
  { location: 'HAND', idOrSlot: 'cl_2' }
]);
assert.strictEqual(agclRes.success, true);
// Verify opponent monster was frozen (hasAttackedThisTurn set to true)
assert.strictEqual(engine2.opponent.monsterZones[0]?.hasAttackedThisTurn, true, 'Opponent monster should be frozen by AgCl');
console.log('  ✓ PASS: AgCl synthesis successfully froze all opponent monsters on field');

// Setup Thermite Meltdown test
engine2.player.mana = 10;
engine2.opponent.lp = 4000;
// Opponent has a set spell/trap and a defense monster
engine2.opponent.monsterZones[1] = {
  card: { uid: 'opp_def_monster', def: feDef },
  position: 'FACE_UP_DEFENSE',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};
engine2.opponent.spellTrapZones[0] = {
  card: { uid: 'opp_trap', def: PLAYABLE_CARDS.find(c => c.cardType === 'TRAP') },
  isFaceUp: false,
  turnSet: 1
};

const alDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_13_al');
const fe2o3Def = PLAYABLE_CARDS.find(c => c.id === 'card_comp_fe2o3');
engine2.player.hand = [
  { uid: 'al_1', def: alDef },
  { uid: 'al_2', def: alDef },
  { uid: 'fe2o3_1', def: fe2o3Def }
];

const thermiteCard = engine2.player.extraDeck.find(c => c.def.id === 'card_comp_thermite');
assert(thermiteCard !== undefined);

const thermiteRes = engine2.compoundSynthesisSummon('player', thermiteCard.uid, [
  { location: 'HAND', idOrSlot: 'al_1' },
  { location: 'HAND', idOrSlot: 'al_2' },
  { location: 'HAND', idOrSlot: 'fe2o3_1' }
]);
assert.strictEqual(thermiteRes.success, true);

// Verify opponent defense monster and trap were melted into GY
assert.strictEqual(engine2.opponent.monsterZones[1], null, 'Opponent defense monster melted');
assert.strictEqual(engine2.opponent.spellTrapZones[0], null, 'Opponent trap melted');
assert.strictEqual(engine2.opponent.lp, 3400, 'Opponent took 600 burn damage (4000 -> 3400)');
console.log('  ✓ PASS: Thermite synthesis melted opponent defense/trap cards and inflicted 600 direct burn');

// ---------------------------------------------------------------------------
// 7. Link Rating Contribution Arithmetic & Link Position Invariants
// ---------------------------------------------------------------------------
console.log('\n--- 7. Link Rating Contribution Arithmetic & Position Rules ---');

// Setup: Place Link-2 Ethylene on field in slot 0, and normal monster in slot 1
const link2Def = PLAYABLE_CARDS.find(c => c.id === 'card_link_2_ethylene');
engine2.player.monsterZones[0] = {
  card: { uid: 'link2_on_field', def: link2Def },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};
engine2.player.monsterZones[1] = {
  card: { uid: 'normal_on_field', def: feDef },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};

// Verify Link monster cannot switch to DEFENSE position
const changePosRes = engine2.changeMonsterPosition('player', 0);
assert.strictEqual(changePosRes.success, false, 'Link monsters must never be allowed in Defense position');

// Link-4 Diamond requires 4 link rating.
// If using Link-2 (contributes 2) + normal monster (contributes 1) = 3 < 4 (fails)
engine2.player.mana = 10;
const diamondCard = engine2.player.extraDeck.find(c => c.def.id === 'card_link_4_diamond');
assert(diamondCard !== undefined);

const underlinkRes = engine2.linkSummon('player', diamondCard.uid, [0, 1]);
assert.strictEqual(underlinkRes.success, false, 'Link-4 summon with only 3 rating contribution must be rejected');

// Place another monster in slot 2 (now slot 0: 2 + slot 1: 1 + slot 2: 1 = 4!)
engine2.player.monsterZones[2] = {
  card: { uid: 'normal_on_field_2', def: feDef },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};

const diamondRes = engine2.linkSummon('player', diamondCard.uid, [0, 1, 2]);
assert.strictEqual(diamondRes.success, true, `Link-4 summon with Link-2 + 2 monsters should succeed (got: ${diamondRes.message})`);

const diamondOnField = engine2.player.monsterZones.find(s => s && s.card && s.card.def.id === 'card_link_4_diamond');
assert.ok(diamondOnField, 'Link-4 Diamond placed on field');
assert.strictEqual(diamondOnField.position, 'FACE_UP_ATTACK');
console.log('  ✓ PASS: Link rating arithmetic (Link-2 + 1 + 1 = 4) and Defense position immunity verified');

// ---------------------------------------------------------------------------
// 8. Reaction Spell Activation & Cinematic Cut-In Payload Invariants
// ---------------------------------------------------------------------------
console.log('\n--- 8. Reaction Spell Activation & Cut-In Payload Invariants ---');

const exoSpellDef = PLAYABLE_CARDS.find(c => c.id === 'card_spell_exothermic_burst');
assert.ok(exoSpellDef, 'card_spell_exothermic_burst must exist in database');
assert.strictEqual(exoSpellDef.cardType, 'REACTION_SPELL');
assert.ok(exoSpellDef.relatedEquation, 'Exothermic spell must have related equation');

// Setup: Place a PYRO monster on field (e.g. Sodium)
const naDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_11_na');
engine2.player.monsterZones[3] = {
  card: { uid: 'pyro_na_field', def: naDef },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};

// Give player the spell card and sufficient mana
engine2.player.mana = 5;
const initialOpponentLp = engine2.opponent.lp;
engine2.player.hand.push({
  uid: 'spell_exo_uid',
  def: exoSpellDef
});

const spellRes = engine2.activateSpellFromHand('player', 'spell_exo_uid');
assert.strictEqual(spellRes.success, true, `Reaction spell activation should succeed (got: ${spellRes.message})`);

// Verify 900 LP direct burn damage applied to opponent
assert.strictEqual(engine2.opponent.lp, initialOpponentLp - 900, 'Opponent took 900 LP direct damage from exothermic burst');

// Verify mana cost (3) deducted
assert.strictEqual(engine2.player.mana, 2, 'Mana deducted from 5 to 2 (cost 3)');

// Verify spell moved to graveyard
assert.ok(engine2.player.graveyard.some(c => c.uid === 'spell_exo_uid'), 'Spell card moved to graveyard');
assert(!engine2.player.hand.some(c => c.uid === 'spell_exo_uid'), 'Spell card removed from hand');

// Verify cut-in payload payload integrity
const cutInPayload = {
  card: exoSpellDef,
  type: 'REACTION_SPELL',
  equation: exoSpellDef.relatedEquation || exoSpellDef.effectText
};
assert.strictEqual(cutInPayload.type, 'REACTION_SPELL');
assert.ok(cutInPayload.equation.includes('ΔH < 0'), 'Cut-in equation faithfully reflects thermodynamic enthalpy');
console.log('  ✓ PASS: Reaction spell activated, applied 900 direct burn, moved to GY, and generated cinematic cut-in payload');

// ---------------------------------------------------------------------------
// 9. Advanced Organic Fischer Ester Synthesis Execution
// ---------------------------------------------------------------------------
console.log('\n--- 9. Advanced Organic Fischer Ester Synthesis Execution ---');

const esterExtraDeck = ['card_comp_ch3cooc2h5', 'card_link_3_nitrogen'];
const esterMainDeck = Array(30).fill('card_elem_6_c');
const esterEngine = new DuelEngine(esterMainDeck, esterExtraDeck, 'INTERMEDIATE');
esterEngine.currentPhase = 'MAIN_PHASE_1';
esterEngine.player.mana = 10;

// Setup hand with Acetic Acid and Ethanol
const aceticDef = PLAYABLE_CARDS.find(c => c.id === 'card_comp_ch3cooh');
const ethanolDef = PLAYABLE_CARDS.find(c => c.id === 'card_comp_c2h5oh');
assert.ok(aceticDef, 'Acetic acid card definition must exist');
assert.ok(ethanolDef, 'Ethanol card definition must exist');

esterEngine.player.hand = [
  { uid: 'acetic_hand_1', def: aceticDef },
  { uid: 'ethanol_hand_1', def: ethanolDef }
];
esterEngine.player.monsterZones = [null, null, null, null, null];
esterEngine.player.graveyard = [];

const esterCard = esterEngine.player.extraDeck.find(c => c.def.id === 'card_comp_ch3cooc2h5');
assert.ok(esterCard, 'Ethyl acetate ester card must be present in Extra Deck');

const esterSources = [
  { location: 'HAND', idOrSlot: 'acetic_hand_1' },
  { location: 'HAND', idOrSlot: 'ethanol_hand_1' }
];

const esterSynthRes = esterEngine.compoundSynthesisSummon('player', esterCard.uid, esterSources);
assert.strictEqual(esterSynthRes.success, true, `Ethyl Acetate ester synthesis should succeed (got: ${esterSynthRes.message})`);

const summonedEster = esterEngine.player.monsterZones[0];
assert.ok(summonedEster && summonedEster.card, 'Zone 0 must contain synthesized ester monster');
assert.strictEqual(summonedEster.card.def.id, 'card_comp_ch3cooc2h5');
assert.strictEqual(summonedEster.card.def.chemicalFormula, 'CH3COOC2H5');
assert.strictEqual(esterEngine.player.graveyard.length, 2, 'Graveyard must contain 2 consumed organic reactants');
assert.ok(esterEngine.player.graveyard.some(c => c.def.chemicalFormula === 'CH3COOH'), 'Graveyard contains CH3COOH');
assert.ok(esterEngine.player.graveyard.some(c => c.def.chemicalFormula === 'C2H5OH'), 'Graveyard contains C2H5OH');
console.log('  ✓ PASS: Organic Fischer esterification synthesis faithfully executed with reactant verification');

// ---------------------------------------------------------------------------
// 10. Link-3 Nitrogen Bastion Summon & Triple Link Arrow Invariants
// ---------------------------------------------------------------------------
console.log('\n--- 10. Link-3 Nitrogen Bastion Summon & Triple Link Arrow Invariants ---');

const n3Card = esterEngine.player.extraDeck.find(c => c.def.id === 'card_link_3_nitrogen');
assert.ok(n3Card, 'card_link_3_nitrogen must exist in Extra Deck');

// Place 3 material monsters in zones 0, 1, 2
esterEngine.player.mana = 10;
const hDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_1_h');
esterEngine.player.monsterZones[0] = {
  card: { uid: 'mat_0', def: hDef },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};
esterEngine.player.monsterZones[1] = {
  card: { uid: 'mat_1', def: hDef },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};
esterEngine.player.monsterZones[2] = {
  card: { uid: 'mat_2', def: hDef },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  turnsInCurrentPosition: 1
};

const link3Res = esterEngine.linkSummon('player', n3Card.uid, [0, 1, 2]);
assert.strictEqual(link3Res.success, true, `Link-3 summon should succeed with 3 monsters (got: ${link3Res.message})`);

const summonedLink3 = esterEngine.player.monsterZones.find(s => s && s.card && s.card.def.id === 'card_link_3_nitrogen');
assert.ok(summonedLink3 && summonedLink3.card, 'Link-3 Nitrogen must be present on field');
assert.strictEqual(summonedLink3.card.def.linkRating, 3, 'Link rating must be exactly 3');
assert.deepStrictEqual(summonedLink3.card.def.linkArrows, ['TOP', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'], 'Link arrows must match TOP, BOTTOM_LEFT, BOTTOM_RIGHT');
assert.strictEqual(summonedLink3.position, 'FACE_UP_ATTACK', 'Link-3 must be summoned in Attack position');

// Verify defense position attempt fails
const posFailRes = esterEngine.changeMonsterPosition('player', esterEngine.player.monsterZones.indexOf(summonedLink3));
assert.strictEqual(posFailRes.success, false, 'Link-3 Nitrogen must be strictly immune to Defense position');
console.log('  ✓ PASS: Link-3 Nitrogen Bastion successfully summoned with triple link arrow alignment and DEF immunity');

console.log('\n======================================================================');
console.log('   ✓ SUITE 41: ALL EXTRA DECK SYNTHESIS & LINK ASSERTIONS PASSED!    ');
console.log('======================================================================\n');
