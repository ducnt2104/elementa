// test-duel-engine.mjs
// Automated Verification Suite for ELEMENTA Yu-Gi-Oh! Inspired Duel Engine

import { DuelEngine } from '../src/domain/duelEngine.ts';
import { PLAYABLE_CARDS, DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS } from '../src/data/playableCardsData.ts';

console.log('============================================================');
console.log('   ELEMENTA: YU-GI-OH! TACTICAL DUEL ENGINE AUDIT');
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

// --- 1. Initialization & Life Points ---
console.log('--- 1. Initialization, Life Points & Zones ---');
const engine = new DuelEngine();
assert(engine.player.lp === 8000, `Player starts with 8,000 LP (got ${engine.player.lp})`);
assert(engine.opponent.lp === 8000, `Opponent starts with 8,000 LP (got ${engine.opponent.lp})`);
assert(engine.player.monsterZones.length === 5, 'Player has exactly 5 Monster Zones');
assert(engine.player.spellTrapZones.length === 5, 'Player has exactly 5 Spell/Trap Zones');
assert(engine.opponent.monsterZones.length === 5, 'Opponent has exactly 5 Monster Zones');
assert(engine.opponent.spellTrapZones.length === 5, 'Opponent has exactly 5 Spell/Trap Zones');
assert(engine.player.hand.length === 6, `Player has 5 opening cards + 1 turn draw = 6 cards (got ${engine.player.hand.length})`);
assert(engine.currentPhase === 'MAIN_PHASE_1', `Turn 1 proceeds to MAIN_PHASE_1 (got ${engine.currentPhase})`);

// --- 2. Normal Summoning (Level 4 Sodium) ---
console.log('\n--- 2. Normal Summoning & Mana Allocation ---');
// Inject a known card into player hand for deterministic testing
const sodiumCard = engine.player.deck.find(c => c.def.id === 'card_elem_11_na');
if (sodiumCard) engine.player.hand.push(sodiumCard);

// Give sufficient mana for test
engine.player.mana = 5;
const targetHandUid = engine.player.hand.find(c => c.def.id === 'card_elem_11_na')?.uid;

const summonRes = engine.normalSummon('player', targetHandUid, 'FACE_UP_ATTACK');
assert(summonRes.success === true, `Normal summon Sodium Na (Level 4): ${summonRes.message}`);
assert(engine.player.monsterZones[0] !== null, 'Monster placed in Monster Zone slot 0');
assert(engine.player.monsterZones[0]?.card?.def.chemicalFormula === 'Na', 'Slot 0 contains Sodium Na');
assert(engine.player.normalSummonsRemaining === 0, 'Normal summon count consumed');

// --- 3. Tribute Summoning (Level 6 Potassium) ---
console.log('\n--- 3. Tribute Summoning Mechanics ---');
const potassiumCard = engine.player.deck.find(c => c.def.id === 'card_elem_19_k');
if (potassiumCard) engine.player.hand.push(potassiumCard);
engine.player.mana = 6;
engine.player.normalSummonsRemaining = 1;

// Try to summon Level 6 without tributes -> should fail
const potUid = engine.player.hand.find(c => c.def.id === 'card_elem_19_k')?.uid;
const failTributeRes = engine.normalSummon('player', potUid, 'FACE_UP_ATTACK', []);
assert(failTributeRes.success === false, 'Level 6 Tribute summon without tributes is rejected');

// Tribute slot 0 (Sodium) to summon Potassium
const successTributeRes = engine.normalSummon('player', potUid, 'FACE_UP_ATTACK', [0]);
assert(successTributeRes.success === true, `Tribute summon Potassium K using Slot 0: ${successTributeRes.message}`);
assert(engine.player.monsterZones[0]?.card?.def.chemicalFormula === 'K', 'Slot 0 now has Potassium K');
assert(engine.player.graveyard.some(c => c.def.chemicalFormula === 'Na'), 'Tributed Sodium Na is in Graveyard');

// --- 4. Compound Synthesis Summoning (H2O = 2 H + 1 O) ---
console.log('\n--- 4. Compound Synthesis Summoning (Stoichiometry Check) ---');
// Give materials in hand: 2 distinct Hydrogen + 1 Oxygen
const h1 = engine.player.deck.find(c => c.def.id === 'card_elem_1_h');
const h2 = engine.player.deck.find(c => c.def.id === 'card_elem_1_h' && c.uid !== h1?.uid);
const o1 = engine.player.deck.find(c => c.def.id === 'card_elem_8_o');
engine.player.deck = engine.player.deck.filter(c => c.uid !== h1?.uid && c.uid !== h2?.uid && c.uid !== o1?.uid);
if (h1) engine.player.hand.push(h1);
if (h2) engine.player.hand.push(h2);
if (o1) engine.player.hand.push(o1);

const waterCard = engine.player.extraDeck.find(c => c.def.id === 'card_comp_h2o');
assert(waterCard !== undefined, 'H2O card found in Extra Deck');

engine.player.mana = 8;
const hCards = engine.player.hand.filter(c => c.def.chemicalFormula === 'H');
const oCards = engine.player.hand.filter(c => c.def.chemicalFormula === 'O');

const synthesisRes = engine.compoundSynthesisSummon('player', waterCard.uid, [
  { location: 'HAND', idOrSlot: hCards[0].uid },
  { location: 'HAND', idOrSlot: hCards[1].uid },
  { location: 'HAND', idOrSlot: oCards[0].uid }
]);
assert(synthesisRes.success === true, `Compound synthesis 2H + O -> H2O: ${synthesisRes.message}`);
assert(engine.player.monsterZones[1]?.card?.def.chemicalFormula === 'H2O', 'H2O summoned to Monster Zone slot 1');
assert(engine.player.graveyard.filter(c => c.def.chemicalFormula === 'H').length >= 2, 'Reactants consumed to Graveyard');

// --- 5. Battle Phase & Damage Calculation ---
console.log('\n--- 5. Battle Phase & Combat Calculation ---');
// Set up Opponent with a weaker monster in Attack position (e.g. Hydrogen H, ATK 800)
let oppWeakMonster = engine.opponent.deck.find(c => c.def.id === 'card_elem_1_h') ||
                     engine.opponent.hand.find(c => c.def.id === 'card_elem_1_h');

// If not in deck or hand, locate from card catalog and create instance
if (!oppWeakMonster) {
  const hDef = PLAYABLE_CARDS.find(c => c.id === 'card_elem_1_h');
  if (hDef) {
    oppWeakMonster = {
      uid: 'opp_test_h_1',
      def: hDef,
      owner: 'opponent'
    };
  }
}

assert(oppWeakMonster !== undefined, 'Found opponent monster for combat test');
if (oppWeakMonster) {
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: oppWeakMonster,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
}

engine.advancePhase(); // Advance to BATTLE_PHASE
assert(engine.currentPhase === 'BATTLE_PHASE', 'Successfully transitioned to BATTLE_PHASE');

// Attack with Potassium K (ATK 2300 + 300 boost + 400 burn) against Hydrogen H (ATK 800)
// Expected damage: 400 effect burn + (2600 - 800) combat = 2200 LP damage to Opponent
const initialOppLp = engine.opponent.lp;
const atkResult = engine.declareAttack(0, 0);

assert(atkResult.success === true, 'Attack declaration succeeded');
assert(atkResult.targetDestroyed === true, 'Weaker defender Hydrogen H was destroyed');
assert(engine.opponent.lp === initialOppLp - 2200, `Opponent took 2200 damage: ${initialOppLp} -> ${engine.opponent.lp}`);
assert(engine.opponent.monsterZones[0] === null, 'Opponent slot 0 cleared after monster destruction');

// Direct Attack with H2O (ATK 2400) since opponent has 0 monsters left!
const directLpBefore = engine.opponent.lp;
const directAtkResult = engine.declareAttack(1, 'DIRECT');
assert(directAtkResult.success === true, 'Direct attack succeeded with clear field');
assert(directAtkResult.directAttack === true, 'Flagged as direct attack');
assert(engine.opponent.lp === directLpBefore - 2400, `Opponent took 2400 direct damage: ${directLpBefore} -> ${engine.opponent.lp}`);

// --- 6. Chain / Reaction Stack & Traps ---
console.log('\n--- 6. Chain / Reaction Stack (LIFO Resolution) ---');
engine.player.lp = 5000;
engine.player.mana = 5;
const neutralSpell = engine.player.deck.find(c => c.def.id === 'card_spell_neutralization');
if (neutralSpell) engine.player.hand.push(neutralSpell);

const nUid = engine.player.hand.find(c => c.def.id === 'card_spell_neutralization')?.uid;
const spellRes = engine.activateSpellFromHand('player', nUid);
assert(spellRes.success === true, 'Activated Acid-Base Neutralization Quick-Play Spell');
assert(engine.player.lp === 5700, `Neutralization resolved: +700 LP (got ${engine.player.lp})`);

// --- 7. Win Condition & AI Execution ---
console.log('\n--- 7. Win Condition & AI Opponent Execution ---');

// Test autonomous AI turn execution
const aiEngine = new DuelEngine(undefined, undefined, 'ADEPT');
assert(aiEngine.currentTurn === 1, 'AI match starts on turn 1');

// Pass turn 1 to AI (turn 2)
aiEngine.advancePhase(); // BATTLE
aiEngine.advancePhase(); // MAIN_2
aiEngine.advancePhase(); // END -> starts Turn 2 (opponent's turn)

assert(aiEngine.activePlayerId === 'opponent' || aiEngine.currentTurn >= 2, 'AI turn took place and processed');
assert(aiEngine.logs.some(l => l.actor.includes('Chiến Binh') || l.actor === aiEngine.opponent.name), 'AI logged actions during its automated turn');

// Reduce opponent LP to 0 and verify game outcome
engine.opponent.lp = 0;
// Test victory check via direct attack
engine.player.monsterZones[0].hasAttackedThisTurn = false;
engine.declareAttack(0, 'DIRECT');
assert(engine.outcome === 'PLAYER_VICTORY', `Game outcome evaluated to PLAYER_VICTORY (got ${engine.outcome})`);

// --- 8. Link Summoning Mechanics ---
console.log('\n--- 8. Link Summoning Mechanics (Valence Bonds) ---');
const testLinkEngine = new DuelEngine();
testLinkEngine.player.mana = 6;
// Normal summon a Level 1 monster to use as Link material
const linkMatUid = testLinkEngine.player.hand.find(c => c.def.id === 'card_elem_1_h')?.uid;
if (linkMatUid) {
  testLinkEngine.normalSummon('player', linkMatUid, 'FACE_UP_ATTACK');
} else {
  // Setup slot 0 directly
  const hCard = testLinkEngine.player.deck.find(c => c.def.id === 'card_elem_1_h');
  testLinkEngine.player.monsterZones[0] = {
    slotIndex: 0,
    card: hCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
}

const linkCard = testLinkEngine.player.extraDeck.find(c => c.def.id === 'card_link_1_h_bond');
assert(linkCard !== undefined, 'Found Link-1 monster in Extra Deck');
const linkRes = testLinkEngine.linkSummon('player', linkCard.uid, [0]);
assert(linkRes.success === true, `Link-1 Summoned successfully: ${linkRes.message}`);
assert(testLinkEngine.player.monsterZones[0]?.card?.def.cardType === 'LINK_MONSTER', 'Slot 0 is now occupied by Link Monster');
// Verify Link monster cannot change to defense position
const posRes = testLinkEngine.changeMonsterPosition('player', 0);
assert(posRes.success === false, 'Link monster cannot be switched to Defense position');

// --- 9. Mana Manipulation & Freeze ---
console.log('\n--- 9. Mana Manipulation & Freezing ---');
const manaEngine = new DuelEngine();
manaEngine.player.mana = 2;
const capSpell = manaEngine.player.deck.find(c => c.def.id === 'card_spell_lithium_capacitor') ||
                 manaEngine.player.hand.find(c => c.def.id === 'card_spell_lithium_capacitor');
if (!manaEngine.player.hand.includes(capSpell)) manaEngine.player.hand.push(capSpell);
const capRes = manaEngine.activateSpellFromHand('player', capSpell.uid);
assert(capRes.success === true, 'Activated Lithium Supercapacitor');
assert(manaEngine.player.mana === 3, `Mana surged by +2 after 1 cost (2 - 1 + 2 = 3, got ${manaEngine.player.mana})`);

// Freeze opponent mana
const freezeSpell = manaEngine.player.deck.find(c => c.def.id === 'card_spell_endothermic_freeze') ||
                   manaEngine.player.hand.find(c => c.def.id === 'card_spell_endothermic_freeze');
manaEngine.player.mana = 5;
if (!manaEngine.player.hand.includes(freezeSpell)) manaEngine.player.hand.push(freezeSpell);
manaEngine.activateSpellFromHand('player', freezeSpell.uid);
assert(manaEngine.opponent.frozenMana === 2, 'Opponent has 2 frozen mana recorded');

// --- 10. Graveyard Reanimation & Banished Zone ("Chết Hơn Chết") ---
console.log('\n--- 10. Graveyard Reborn & Banished Zone ("Chết Hơn Chết") ---');
const graveEngine = new DuelEngine();
// Put a metal monster into player graveyard
const feCard = graveEngine.player.deck.find(c => c.def.id === 'card_elem_26_fe') ||
               graveEngine.player.hand.find(c => c.def.id === 'card_elem_26_fe');
graveEngine.player.graveyard.push(feCard);
graveEngine.player.mana = 6;

const rebornSpell = graveEngine.player.deck.find(c => c.def.id === 'card_spell_cathode_rebirth') ||
                    graveEngine.player.hand.find(c => c.def.id === 'card_spell_cathode_rebirth');
if (!graveEngine.player.hand.includes(rebornSpell)) graveEngine.player.hand.push(rebornSpell);
const rebornRes = graveEngine.activateSpellFromHand('player', rebornSpell.uid);
assert(rebornRes.success === true, 'Cathodic Electro-Rebirth activated');
assert(graveEngine.player.monsterZones.some(s => s && s.card?.def.chemicalFormula === 'Fe'), 'Iron Fe reanimated from Graveyard to battlefield');

// Banishing an opponent monster
const banishEngine = new DuelEngine();
const oppTargetCard = banishEngine.opponent.deck.find(c => c.def.id === 'card_elem_11_na') ||
                      banishEngine.opponent.hand.find(c => c.def.id === 'card_elem_11_na');
banishEngine.opponent.monsterZones[0] = {
  slotIndex: 0,
  card: oppTargetCard,
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};

banishEngine.player.mana = 6;
const decaySpell = banishEngine.player.deck.find(c => c.def.id === 'card_spell_nuclear_decay') ||
                   banishEngine.player.hand.find(c => c.def.id === 'card_spell_nuclear_decay');
if (!banishEngine.player.hand.includes(decaySpell)) banishEngine.player.hand.push(decaySpell);
banishEngine.activateSpellFromHand('player', decaySpell.uid);
assert(banishEngine.opponent.monsterZones[0] === null, 'Opponent monster removed from battlefield');
assert(banishEngine.opponent.banished.some(c => c.def.chemicalFormula === 'Na'), 'Opponent monster banished to Banished Zone (not Graveyard!)');
assert(banishEngine.opponent.graveyard.length === 0, 'Opponent Graveyard remains 0 (Banished prevents Graveyard recovery)');

// --- 11. Turbo Draw Engine ---
console.log('\n--- 11. Turbo Draw Engine (Gas Chromatography) ---');
const drawEngine = new DuelEngine();
const initialHandCount = drawEngine.player.hand.length;
drawEngine.player.mana = 5;
const gcSpell = drawEngine.player.deck.find(c => c.def.id === 'card_spell_gas_chromatography') ||
                drawEngine.player.hand.find(c => c.def.id === 'card_spell_gas_chromatography');
if (!drawEngine.player.hand.includes(gcSpell)) drawEngine.player.hand.push(gcSpell);
drawEngine.activateSpellFromHand('player', gcSpell.uid);
assert(drawEngine.player.hand.length >= initialHandCount + 1, 'Gas Chromatography drew multiple cards to hand');

// --- 12. Exclusive Reaction Combo: Thermite Melt ---
console.log('\n--- 12. Exclusive Reaction Combo: Thermite Melt ---');
const thermiteEngine = new DuelEngine();
const oppDefenseCard = thermiteEngine.opponent.deck.find(c => c.def.id === 'card_elem_2_he') ||
  thermiteEngine.opponent.hand.find(c => c.def.id === 'card_elem_2_he') ||
  thermiteEngine['instantiateCard']('card_elem_2_he', 'opponent');
thermiteEngine.opponent.monsterZones[0] = {
  slotIndex: 0,
  card: oppDefenseCard,
  position: 'FACE_UP_DEFENSE',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};
const oppTrapCard = thermiteEngine.opponent.deck.find(c => c.def.id === 'card_trap_noble_gas_shield') ||
  thermiteEngine.opponent.hand.find(c => c.def.id === 'card_trap_noble_gas_shield') ||
  thermiteEngine['instantiateCard']('card_trap_noble_gas_shield', 'opponent');
thermiteEngine.opponent.spellTrapZones[0] = {
  slotIndex: 0,
  card: oppTrapCard,
  isFaceUp: false,
  turnSet: 1
};

// Supply Aluminum and Fe2O3 for Thermite synthesis
const al1 = thermiteEngine.player.deck.find(c => c.def.id === 'card_elem_13_al') || thermiteEngine['instantiateCard']('card_elem_13_al', 'player');
const al2 = thermiteEngine.player.deck.find(c => c.def.id === 'card_elem_13_al' && c.uid !== al1.uid) || thermiteEngine['instantiateCard']('card_elem_13_al', 'player');
const fe2o3 = thermiteEngine.player.extraDeck.find(c => c.def.id === 'card_comp_fe2o3') || thermiteEngine['instantiateCard']('card_comp_fe2o3', 'player');
assert(fe2o3 !== undefined, 'Found Fe2O3 material in Extra Deck');
thermiteEngine.player.hand.push(al1, al2, fe2o3);
thermiteEngine.player.mana = 10;

const thermiteBoss = thermiteEngine.player.extraDeck.find(c => c.def.id === 'card_comp_thermite');
assert(thermiteBoss !== undefined, 'Found Thermite Incinerator Titan in Extra Deck');
const thermiteRes = thermiteEngine.compoundSynthesisSummon('player', thermiteBoss.uid, [
  { location: 'HAND', idOrSlot: al1.uid },
  { location: 'HAND', idOrSlot: al2.uid },
  { location: 'HAND', idOrSlot: fe2o3.uid }
]);
assert(thermiteRes.success === true, `Thermite Reaction 3000°C executed: ${thermiteRes.message}`);
assert(thermiteEngine.opponent.monsterZones[0] === null, 'Opponent defense monster melted away by 3000°C wave');
assert(thermiteEngine.opponent.spellTrapZones[0] === null, 'Opponent set trap incinerated by Thermite wave');

// --- 13. Drag-to-Combine / Field Fusion ---
console.log('\n--- 13. Field Fusion & Link-2 Drag Synthesis ---');
const fuseEngine = new DuelEngine();
const naFieldCard = fuseEngine.player.deck.find(c => c.def.id === 'card_elem_11_na') || fuseEngine.player.hand.find(c => c.def.id === 'card_elem_11_na');
const clFieldCard = fuseEngine.player.deck.find(c => c.def.id === 'card_elem_17_cl') || fuseEngine.player.hand.find(c => c.def.id === 'card_elem_17_cl');
fuseEngine.player.monsterZones[0] = {
  slotIndex: 0,
  card: naFieldCard,
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};
fuseEngine.player.monsterZones[1] = {
  slotIndex: 1,
  card: clFieldCard,
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};

fuseEngine.player.mana = 6;
const naclCard = fuseEngine.player.extraDeck.find(c => c.def.id === 'card_comp_nacl');
assert(naclCard !== undefined, 'Found NaCl in Extra Deck');
const naclRes = fuseEngine.compoundSynthesisSummon('player', naclCard.uid, [
  { location: 'FIELD', idOrSlot: 0 },
  { location: 'FIELD', idOrSlot: 1 }
]);
assert(naclRes.success === true, 'Field monsters Na + Cl synthesized into NaCl');
assert(fuseEngine.player.monsterZones.some(s => s && s.card?.def.chemicalFormula === 'NaCl'), 'NaCl placed on field');

// --- 14. Field-Activated Spells & Traps ---
console.log('\n--- 14. Field Spell/Trap Activation Engine ---');
const stEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
stEngine.player.mana = 6;
stEngine.currentPhase = 'MAIN_PHASE_1';

// Set a Trap card in slot 0
const trapDef = PLAYABLE_CARDS.find(c => c.id === 'card_trap_ammonium_smoke');
assert(trapDef !== undefined, 'Found Ammonium Smoke Trap in catalog');
const trapCard = { uid: 'uid_test_trap_field', def: trapDef, ownerId: 'player' };
stEngine.player.hand.push(trapCard);
const setRes = stEngine.setSpellTrap('player', trapCard.uid);
assert(setRes.success === true, 'Trap successfully set face-down in Spell/Trap zone');
assert(stEngine.player.spellTrapZones[0] !== null, 'Trap resides in slot 0');
assert(stEngine.player.spellTrapZones[0].isFaceUp === false, 'Trap is face-down');

// Activating trap on the same turn it was set must fail
const earlyActRes = stEngine.activateSpellTrapFromField('player', 0);
assert(earlyActRes.success === false, 'Activating trap on the same turn it was set is strictly rejected');

// Advance turn to allow trap activation
stEngine.currentTurn = 2;
const validTrapActRes = stEngine.activateSpellTrapFromField('player', 0);
assert(validTrapActRes.success === true, 'Trap successfully activated from field on subsequent turn');

// --- 15. ELEMENTA Custom Tribute Summon Rule (>5 Stars Star-Sum Rule) ---
console.log('\n--- 15. Custom Tribute Star-Sum Rule (Level 7 Ostwald Emperor) ---');
const tribEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
tribEngine.player.mana = 10;
tribEngine.currentPhase = 'MAIN_PHASE_1';

// Prepare a Level 7 monster in hand (Ostwald HNO3 Emperor or Thermite)
const hno3Def = {
  id: 'card_comp_hno3_test',
  name: 'Hoàng Đế Axit Nitric',
  name_en: 'Emperor Nitric Acid',
  cardType: 'COMPOUND_MONSTER',
  rarity: 'SECRET_RARE',
  attribute: 'ACID_DARK',
  manaCost: 7,
  level: 7,
  atk: 2700,
  def: 2100,
  effectCode: 'COMP_HNO3_SUPER_OXIDIZE',
  effectText: 'Level 7 Boss',
  scientificLore: 'Test lore'
};
const hno3Card = { uid: 'uid_hno3_test', def: hno3Def, ownerId: 'player' };
tribEngine.player.hand.push(hno3Card);

// Put a Level 4 monster in slot 0 and a Level 3 monster in slot 1 (Sum = 7 >= 7)
tribEngine.player.monsterZones[0] = {
  slotIndex: 0,
  card: { uid: 'uid_m4', def: { id: 'm4', name: 'Mon 4-star', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'PYRO', manaCost: 2, level: 4, atk: 1200, def: 1000, effectCode: 'NONE', effectText: '', scientificLore: '' }, ownerId: 'player' },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};
tribEngine.player.monsterZones[1] = {
  slotIndex: 1,
  card: { uid: 'uid_m3', def: { id: 'm3', name: 'Mon 3-star', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'AQUA', manaCost: 2, level: 3, atk: 1000, def: 800, effectCode: 'NONE', effectText: '', scientificLore: '' }, ownerId: 'player' },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};

// 1. Tributing only Level 4 (Sum = 4 < 7) must fail
const failSumRes = tribEngine.normalSummon('player', hno3Card.uid, 'FACE_UP_ATTACK', [0]);
assert(failSumRes.success === false, 'Tribute with star sum < 7 is rejected');

// 2. Put a Level 7 monster in slot 2 to test "cannot sacrifice monster with stars >= target"
tribEngine.player.monsterZones[2] = {
  slotIndex: 2,
  card: { uid: 'uid_m7', def: { id: 'm7', name: 'Mon 7-star', cardType: 'ELEMENT_MONSTER', rarity: 'RARE', attribute: 'PYRO', manaCost: 5, level: 7, atk: 2500, def: 2000, effectCode: 'NONE', effectText: '', scientificLore: '' }, ownerId: 'player' },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};
const failEqualRes = tribEngine.normalSummon('player', hno3Card.uid, 'FACE_UP_ATTACK', [2]);
assert(failEqualRes.success === false, 'Tribute with star >= target is strictly rejected by ELEMENTA rule');

// 3. Tributing Level 4 + Level 3 (Sum = 7 >= 7, each < 7) must succeed!
const successSumRes = tribEngine.normalSummon('player', hno3Card.uid, 'FACE_UP_ATTACK', [0, 1]);
assert(successSumRes.success === true, `Level 7 summon with 4-star + 3-star succeeds: ${successSumRes.message}`);
assert(tribEngine.player.monsterZones[0]?.card?.uid === hno3Card.uid, 'Level 7 monster placed on field');

// --- 16. Multi-Cost Strategic Draw Engine ---
console.log('\n--- 16. Multi-Cost Strategic Draw Engine ---');
const multiDrawEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
const initHandCount = multiDrawEngine.player.hand.length;

// A. Life Point Draw (1000 LP -> 2 cards)
const initLp = multiDrawEngine.player.lp;
const lpDrawRes = multiDrawEngine.lifePointDraw('player', 1000, 2);
assert(lpDrawRes.success === true, 'Life Point Draw succeeded');
assert(multiDrawEngine.player.lp === initLp - 1000, `LP deducted by 1000: ${initLp} -> ${multiDrawEngine.player.lp}`);
assert(multiDrawEngine.player.hand.length === initHandCount + 2, '2 cards added to hand from LP draw');

// B. Tribute Draw (Sacrifice monster -> 2 cards)
multiDrawEngine.player.monsterZones[0] = {
  slotIndex: 0,
  card: { uid: 'uid_sac_test', def: { id: 'sac', name: 'Vật Tế Thí Nghiệm', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'TERRA', manaCost: 1, level: 2, atk: 500, def: 500, effectCode: 'NONE', effectText: '', scientificLore: '' }, ownerId: 'player' },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};
const tribDrawRes = multiDrawEngine.tributeToDraw('player', 0, 2);
assert(tribDrawRes.success === true, 'Tribute Draw succeeded');
assert(multiDrawEngine.player.monsterZones[0] === null, 'Tributed monster removed from field');
assert(multiDrawEngine.player.graveyard.some(c => c.uid === 'uid_sac_test'), 'Tributed monster is in Graveyard');
assert(multiDrawEngine.player.hand.length === initHandCount + 4, 'Hand increased by 2 from Tribute Draw');

// C. Graveyard Consume Draw (Banish 2 from GY -> 2 cards)
multiDrawEngine.player.graveyard.push(
  { uid: 'uid_gy1', def: { id: 'gy1', name: 'Tro Tàn 1', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'PYRO', manaCost: 1, level: 1, effectCode: 'NONE', effectText: '', scientificLore: '' }, ownerId: 'player' },
  { uid: 'uid_gy2', def: { id: 'gy2', name: 'Tro Tàn 2', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'PYRO', manaCost: 1, level: 1, effectCode: 'NONE', effectText: '', scientificLore: '' }, ownerId: 'player' }
);
const gyCards = ['uid_gy1', 'uid_gy2'];
const gyDrawRes = multiDrawEngine.graveyardConsumeDraw('player', gyCards, 2);
assert(gyDrawRes.success === true, 'Graveyard Consume Draw succeeded');
assert(multiDrawEngine.player.banished.length >= 2, '2 cards moved from Graveyard to Banished Zone');

// --- 17. Separate Banished Zone vs Graveyard Retrieval ---
console.log('\n--- 17. Strict Banished Zone vs Graveyard Segregation ---');
const sepEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
const testCard = sepEngine.player.deck[0];

// Put card in Banished zone directly
sepEngine.player.banished.push(testCard);
// Attempt to revive from Graveyard -> MUST FAIL
const failReviveRes = sepEngine.reviveFromGraveyard('player', testCard.uid, 0);
assert(failReviveRes.success === false, 'Cannot revive banished card using Graveyard revival');

// Retrieve from Banished Zone directly -> MUST SUCCEED
const successBanishSummon = sepEngine.summonFromBanished('player', testCard.uid, 0);
assert(successBanishSummon.success === true, 'Successfully summoned card from Banished Zone');
assert(sepEngine.player.monsterZones[0]?.card?.uid === testCard.uid, 'Card placed in Monster Zone from Banished');

// --- 18. Nitro & Sulfur Field Effects ---
console.log('\n--- 18. Nitro & Sulfur Field Combat Synergy ---');
const synEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
synEngine.player.mana = 10;
const haberCard = { uid: 'uid_haber', def: { id: 'card_spell_haber_synthesis', name: 'Buồng Haber', cardType: 'FIELD_ENVIRONMENT', rarity: 'RARE', attribute: 'AERO', manaCost: 3, effectCode: 'FIELD_HABER_BOSCH', effectText: '', scientificLore: '' }, ownerId: 'player' };
synEngine.player.hand.push(haberCard);
synEngine.activateSpellFromHand('player', haberCard.uid);
assert(synEngine.environment.pressure === 200.0, 'Haber-Bosch set chamber pressure to 200 atm');
assert(synEngine.environment.temperature === 723.15, 'Haber-Bosch set temperature to 450°C');
assert(synEngine.environment.activeCatalysts.includes('Fe'), 'Iron catalyst Fe activated');

// --- 19. 4-Tier Duel Opponent AI Verification ---
console.log('\n--- 19. 4-Tier Duel Opponent AI Verification ---');
const engNovice = new DuelEngine(undefined, undefined, 'NOVICE');
assert(engNovice.opponent.name === 'Học Viên Giả Kim Alpha', 'Novice AI duelist initialized with Alpha archetype');
const engAdept = new DuelEngine(undefined, undefined, 'ADEPT');
assert(engAdept.opponent.name === 'Chiến Binh Phản Ứng Beta', 'Adept AI duelist initialized with Beta archetype');
const engExpert = new DuelEngine(undefined, undefined, 'EXPERT');
assert(engExpert.opponent.name === 'Bậc Thầy Phản Ứng Gamma', 'Expert AI duelist initialized with Gamma archetype');
assert(engExpert.opponent.deck.length + engExpert.opponent.hand.length >= 30, 'Expert AI main deck contains >= 30 cards');
const engMendeleev = new DuelEngine(undefined, undefined, 'MENDELEEV');
assert(engMendeleev.opponent.name === 'Đại Sư Hóa Học Mendeleev', 'Mendeleev AI duelist initialized with Grandmaster archetype');
const mendeleevTotalCards = [...engMendeleev.opponent.deck, ...engMendeleev.opponent.hand];
assert(mendeleevTotalCards.some(c => c.def.id === 'card_spell_haber_synthesis'), 'Mendeleev AI deck contains Haber-Bosch synthesis engine');

// --- 20. AI Tactical Battle Position Intelligence ---
console.log('\n--- 20. AI Tactical Battle Position Intelligence ---');
const aiTacticsEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'EXPERT');
aiTacticsEngine.activePlayerId = 'opponent';
aiTacticsEngine.currentPhase = 'MAIN_PHASE_1';
aiTacticsEngine.opponent.mana = 10;
aiTacticsEngine.opponent.normalSummonsRemaining = 1;

// Put Helium (ATK 100, DEF 2000, INERT_SHIELD) in AI's hand
const heCard = {
  uid: 'uid_he_tactical',
  def: {
    id: 'card_he_shield',
    name: 'Khí Hiếm Heli',
    cardType: 'ELEMENT_MONSTER',
    rarity: 'RARE',
    attribute: 'NOBLE_VOID',
    manaCost: 1,
    level: 1,
    atk: 100,
    def: 2000,
    effectCode: 'ELEM_HE_INERT_SHIELD',
    effectText: 'Khiên trơ',
    scientificLore: ''
  },
  ownerId: 'opponent'
};
aiTacticsEngine.opponent.hand = [heCard];
aiTacticsEngine.runAiTurn();

// Check slot 0 of opponent
const summonedSlot = aiTacticsEngine.opponent.monsterZones.find(s => s && s.card?.uid === 'uid_he_tactical');
assert(summonedSlot !== undefined, 'Expert AI successfully summoned Helium');
assert(summonedSlot.position === 'FACE_UP_DEFENSE', `Expert AI tactically summoned Helium in Defense position (got ${summonedSlot?.position})`);

// Position optimization test on subsequent turn
aiTacticsEngine.currentTurn = 2;
aiTacticsEngine.activePlayerId = 'opponent';
aiTacticsEngine.currentPhase = 'MAIN_PHASE_1';
// Set up an attack monster stuck in defense from turn 1
aiTacticsEngine.opponent.monsterZones[1] = {
  slotIndex: 1,
  card: {
    uid: 'uid_iron_attacker',
    def: { id: 'fe', name: 'Sắt Chiến', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'TERRA', manaCost: 2, level: 4, atk: 1900, def: 800, effectCode: 'NONE', effectText: '', scientificLore: '' },
    ownerId: 'opponent'
  },
  position: 'FACE_UP_DEFENSE',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};
aiTacticsEngine.opponent.hand = [];
aiTacticsEngine.runAiTurn();

const switchedSlot = aiTacticsEngine.opponent.monsterZones[1];
assert(switchedSlot.position === 'FACE_UP_ATTACK', `Expert AI tactically switched Iron from Defense to Attack position (got ${switchedSlot.position})`);

// --- 21. Turn Timer Timeout, Auto-Pass & Forfeiture Resilience ---
console.log('\n--- 21. Turn Timer Timeout, Auto-Pass & Forfeiture Resilience ---');
const timerEngine = new DuelEngine();
assert(timerEngine.activePlayerId === 'player', 'Initial active player is player');
assert(timerEngine.currentTurn === 1, 'Initial turn is 1');
assert(timerEngine.currentPhase === 'MAIN_PHASE_1', 'Initial phase is MAIN_PHASE_1');

// Test 1: Calling autoPassTurn for inactive duelist does nothing
timerEngine.autoPassTurn('opponent');
assert(timerEngine.activePlayerId === 'player', 'Calling autoPassTurn for inactive duelist does not switch active player');
assert(timerEngine.currentTurn === 1, 'Turn remains 1 when inactive duelist is passed');

// Test 2: Active player first timeout increments counter and auto-passes turn
timerEngine.handleTurnTimeout('player', 2);
assert(timerEngine.consecutiveTimeouts['player'] === 1, `Player timeout counter is 1 (got ${timerEngine.consecutiveTimeouts['player']})`);
assert(timerEngine.outcome === 'IN_PROGRESS', 'Game remains IN_PROGRESS after 1st timeout');
assert(timerEngine.activePlayerId === 'player', 'Turn returned to player after AI completed turn');
assert(timerEngine.currentTurn >= 2, `Current turn advanced past turn 1 (got ${timerEngine.currentTurn})`);

// Test 3: Action activity resets timeout counter
timerEngine.resetTimeoutCounter('player');
assert(timerEngine.consecutiveTimeouts['player'] === 0, 'Player timeout counter reset to 0 after taking action');

// Test 4: Two consecutive timeouts trigger forfeit
const forfeitEngine = new DuelEngine();
assert(forfeitEngine.outcome === 'IN_PROGRESS', 'Forfeit test engine is IN_PROGRESS');
forfeitEngine.handleTurnTimeout('player', 2); // 1st timeout
assert(forfeitEngine.consecutiveTimeouts['player'] === 1, 'Player timeout count is 1 after 1st timeout');
assert(forfeitEngine.outcome === 'IN_PROGRESS', 'Game still IN_PROGRESS after 1st timeout');

// Player times out again on their subsequent turn
forfeitEngine.handleTurnTimeout('player', 2); // 2nd consecutive timeout -> FORFEIT
assert(forfeitEngine.consecutiveTimeouts['player'] === 2, 'Player timeout count reached 2');
assert(forfeitEngine.outcome === 'OPPONENT_VICTORY', `Player forfeited after 2 consecutive timeouts: ${forfeitEngine.outcome}`);

// --- 22. Monster Battle Position Switching Invariants & Constraints ---
console.log('\n--- 22. Monster Battle Position Switching Invariants ---');
const posEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
posEngine.player.mana = 10;

// Setup monster in slot 0 summoned on Turn 1
posEngine.player.monsterZones[0] = {
  slotIndex: 0,
  card: {
    uid: 'test_pos_monster_1',
    def: { id: 'test_fe', name: 'Chiến Binh Fe', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'TERRA', manaCost: 2, level: 4, atk: 1800, def: 1200, effectCode: 'NONE', effectText: '', scientificLore: '' },
    ownerId: 'player'
  },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1, // Summoned on current turn 1
  tempAtkBoost: 0,
  tempDefBoost: 0
};

// Rule 1: Cannot change position on the same turn summoned
const failSameTurnPos = posEngine.changeMonsterPosition('player', 0);
assert(failSameTurnPos.success === false, 'Cannot change battle position on the turn monster was summoned');
assert(failSameTurnPos.message.includes('vừa được triệu hồi'), 'Message explains summon turn constraint');

// Rule 2: Cannot change position outside Main Phase
posEngine.currentTurn = 3; // Advance turn so turnSummoned is past
posEngine.currentPhase = 'BATTLE_PHASE';
const failBattlePhasePos = posEngine.changeMonsterPosition('player', 0);
assert(failBattlePhasePos.success === false, 'Cannot change battle position during Battle Phase');

// Rule 3: Switching in Main Phase succeeds
posEngine.currentPhase = 'MAIN_PHASE_1';
const successPosChange = posEngine.changeMonsterPosition('player', 0);
assert(successPosChange.success === true, 'Successfully switched battle position in Main Phase');
assert(posEngine.player.monsterZones[0].position === 'FACE_UP_DEFENSE', 'Monster transitioned to FACE_UP_DEFENSE');

// Rule 4: Cannot change position twice in the same turn
const failDoublePos = posEngine.changeMonsterPosition('player', 0);
assert(failDoublePos.success === false, 'Cannot change battle position twice in the same turn');
assert(failDoublePos.message.includes('đã đổi tư thế'), 'Message explains single position change limit');

// Rule 5: Link Monster can NEVER be switched to Defense position
posEngine.player.monsterZones[1] = {
  slotIndex: 1,
  card: {
    uid: 'test_pos_link_1',
    def: { id: 'test_link', name: 'Tiên Phong Link H-H', cardType: 'LINK_MONSTER', rarity: 'SUPER_RARE', attribute: 'AERO', manaCost: 3, level: 1, atk: 1400, def: 0, effectCode: 'LINK_H_BOND_DRAW', effectText: '', scientificLore: '' },
    ownerId: 'player'
  },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};
const failLinkPos = posEngine.changeMonsterPosition('player', 1);
assert(failLinkPos.success === false, 'Link Monster cannot change position to Defense');
assert(failLinkPos.message.includes('không có chỉ số DEF'), 'Message explains Link monsters lack DEF');

// --- 23. Direct Attack Invariant Verification ---
console.log('\n--- 23. Direct Attack Field Protection Invariant ---');
const directAtkEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
directAtkEngine.currentPhase = 'BATTLE_PHASE';

// Place attacker in player slot 0
directAtkEngine.player.monsterZones[0] = {
  slotIndex: 0,
  card: {
    uid: 'direct_atk_monster',
    def: { id: 'fe_atk', name: 'Sắt Chiến', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'TERRA', manaCost: 2, level: 4, atk: 2000, def: 1000, effectCode: 'NONE', effectText: '', scientificLore: '' },
    ownerId: 'player'
  },
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};

// Place defender in opponent slot 0
directAtkEngine.opponent.monsterZones[0] = {
  slotIndex: 0,
  card: {
    uid: 'opp_def_monster',
    def: { id: 'he_def', name: 'Heli Trơ', cardType: 'ELEMENT_MONSTER', rarity: 'COMMON', attribute: 'NOBLE_VOID', manaCost: 1, level: 1, atk: 200, def: 1500, effectCode: 'NONE', effectText: '', scientificLore: '' },
    ownerId: 'opponent'
  },
  position: 'FACE_UP_DEFENSE',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};

// Direct attack should fail because opponent has defender
const failDirectAtk = directAtkEngine.declareAttack(0, 'DIRECT');
assert(failDirectAtk.success === false, 'Direct attack rejected while opponent controls monsters');
assert(failDirectAtk.message.includes('còn quái thú'), 'Message confirms monsters must be attacked first');

// Clear opponent field -> direct attack should succeed
directAtkEngine.opponent.monsterZones[0] = null;
const successDirectAtk = directAtkEngine.declareAttack(0, 'DIRECT');
assert(successDirectAtk.success === true, 'Direct attack succeeds once opponent field is cleared');
assert(successDirectAtk.directAttack === true, 'Flagged as direct attack');
assert(successDirectAtk.damageDealt === 2000, `Dealt exact 2000 LP direct damage (got ${successDirectAtk.damageDealt})`);

// --- 24. Marathon Duel Turn Cycles & Combat Telemetry ---
console.log('\n--- 24. Marathon Duel Multi-Turn Cycles & Telemetry ---');
const marathonEngine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'ADEPT');
assert(marathonEngine.currentTurn === 1, 'Marathon starts at turn 1');

for (let i = 0; i < 8; i++) {
  if (marathonEngine.outcome !== 'IN_PROGRESS') break;
  // Advance through player phases to end of turn
  marathonEngine.advancePhase(); // -> BATTLE_PHASE
  marathonEngine.advancePhase(); // -> MAIN_PHASE_2
  marathonEngine.advancePhase(); // -> END_PHASE -> executes AI turn -> Turn N+2 MAIN_PHASE_1
}

assert(marathonEngine.currentTurn >= 5, `Marathon advanced across multiple full cycles to Turn ${marathonEngine.currentTurn}`);
assert(['IN_PROGRESS', 'PLAYER_VICTORY', 'OPPONENT_VICTORY'].includes(marathonEngine.outcome), `Valid match outcome: ${marathonEngine.outcome}`);
assert(marathonEngine.logs.length >= 25, `Marathon generated ${marathonEngine.logs.length} comprehensive logs`);

// Verify log structure schema across all entries
const sampleLog = marathonEngine.logs[0];
assert(typeof sampleLog.id === 'string', 'Log has valid string id');
assert(typeof sampleLog.turn === 'number', 'Log has valid turn number');
assert(typeof sampleLog.phase === 'string', 'Log has valid phase');
assert(typeof sampleLog.actor === 'string', 'Log has valid actor string');
assert(typeof sampleLog.message === 'string', 'Log has valid message string');
assert(typeof sampleLog.type === 'string', 'Log has valid type enum');


console.log(`\n============================================================`);
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log(`============================================================`);

if (failed > 0) process.exit(1);
