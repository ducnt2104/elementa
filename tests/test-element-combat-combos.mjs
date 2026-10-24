// test-element-combat-combos.mjs
// Suite 34: Element Monster Combat Special Effects & Multi-Element Reaction Combos

import { DuelEngine } from '../src/domain/duelEngine.ts';
import { PLAYABLE_CARDS, DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS } from '../src/data/playableCardsData.ts';

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ PASS: ${message}`);
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 34: ELEMENT COMBAT EFFECTS & FIELD COMBOS AUDIT   ');
console.log('======================================================================\n');

// Helper to create card instance
function createInstance(cardId, ownerId, uid) {
  const def = PLAYABLE_CARDS.find(c => c.id === cardId);
  if (!def) throw new Error(`Card not found: ${cardId}`);
  return { uid, def, ownerId };
}

// --- 1. Potassium K Super Burst & Sulfur S Burn ---
console.log('--- 1. Potassium K Super Burst & Sulfur S Burn ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.mana = 10;
  engine.advancePhase(); // -> BATTLE_PHASE

  // Place Potassium K in player slot 0
  const kCard = createInstance('card_elem_19_k', 'player', 'test_k_1');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: kCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const oppLpBefore = engine.opponent.lp;
  const atkRes = engine.declareAttack(0, 'DIRECT');
  assert(atkRes.success === true, 'Potassium attack declared successfully');
  // K burns 400 LP before attack damage, then deals (2300 + 300) = 2600 direct damage
  // Total damage = 400 + 2600 = 3000
  assert(engine.opponent.lp === oppLpBefore - 3000, `Potassium burned 400 LP + dealt 2600 direct attack damage (Expected: ${oppLpBefore - 3000}, got ${engine.opponent.lp})`);

  // Place Sulfur S in player slot 1
  const sCard = createInstance('card_elem_16_s', 'player', 'test_s_1');
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: sCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const oppLpBeforeS = engine.opponent.lp;
  const sAtkRes = engine.declareAttack(1, 'DIRECT');
  assert(sAtkRes.success === true, 'Sulfur attack declared successfully');
  // S deals 1550 ATK direct damage + 300 bonus LP burn = 1850 damage
  assert(engine.opponent.lp === oppLpBeforeS - 1850, `Sulfur dealt 1550 direct damage + 300 burn damage (Expected: ${oppLpBeforeS - 1850}, got ${engine.opponent.lp})`);
}

// --- 2. Fluorine Direct Attack & Neon Blinding Glow ---
console.log('\n--- 2. Fluorine Absolute Electronegativity & Neon Blinding Glow ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.mana = 10;
  engine.advancePhase(); // -> BATTLE_PHASE

  // Place Fluorine F in player slot 0
  const fCard = createInstance('card_elem_9_f', 'player', 'test_f_1');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: fCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Place Neon Ne in opponent slot 0 in DEFENSE position
  const neCard = createInstance('card_elem_10_ne', 'opponent', 'test_ne_1');
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: neCard,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Fluorine should be able to direct attack because opponent has only defense monsters!
  const oppLpBeforeF = engine.opponent.lp;
  const fDirectRes = engine.declareAttack(0, 'DIRECT');
  assert(fDirectRes.success === true, 'Fluorine bypasses defense-only field to declare direct attack');
  assert(engine.opponent.lp === oppLpBeforeF - 2400, 'Direct attack dealt full 2400 LP damage to opponent');

  // Now test attacking Neon: attacker ATK is reduced by 500
  const ironCard = createInstance('card_elem_26_fe', 'player', 'test_fe_1');
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: ironCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  engine.declareAttack(1, 0); // Fe attacks Ne
  assert(engine.player.monsterZones[1].tempAtkBoost === -500, 'Neon blinded attacker reducing attacker ATK by 500');
}

// --- 3. Aluminum Passivation & Helium Inert Octet Shields ---
console.log('\n--- 3. Aluminum Passivation & Helium Inert Octet Shields ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.mana = 10;
  engine.advancePhase(); // -> BATTLE_PHASE

  // Place Al in opponent slot 0 (ATK 1700, DEF 2000)
  const alCard = createInstance('card_elem_13_al', 'opponent', 'test_al_1');
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: alCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Player has strong attacker (e.g. Gold Au ATK 2500)
  const auCard = createInstance('card_elem_79_au', 'player', 'test_au_1');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: auCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const firstAtk = engine.declareAttack(0, 0);
  assert(firstAtk.success === true, 'Attack on Aluminum resolved');
  assert(engine.opponent.monsterZones[0] !== null, 'Aluminum was NOT destroyed due to Passivation shield Al2O3');
  assert(engine.opponent.monsterZones[0].passivationShieldUsed === true, 'Passivation shield recorded as consumed for this turn');

  // Place Helium He in opponent slot 1 in DEFENSE position (DEF 2100)
  const heCard = createInstance('card_elem_2_he', 'opponent', 'test_he_1');
  engine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: heCard,
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Player has another strong attacker in slot 1 (ATK 2400)
  const fCard = createInstance('card_elem_9_f', 'player', 'test_f_2');
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: fCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const heAtk = engine.declareAttack(1, 1);
  assert(heAtk.success === true, 'Attack on Helium resolved');
  assert(engine.opponent.monsterZones[1] !== null, 'Helium was NOT destroyed due to 1s2 Inert Octet shield');
  assert(engine.opponent.monsterZones[1].inertShieldUsed === true, 'Inert shield recorded as consumed for this turn');
}

// --- 4. Chlorine Oxidation & Lithium Battery Mana Recharge ---
console.log('\n--- 4. Chlorine Oxidation & Lithium Battery Mana Recharge ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.mana = 10;
  engine.advancePhase(); // -> BATTLE_PHASE

  // Player has Chlorine Cl (ATK 1750)
  const clCard = createInstance('card_elem_17_cl', 'player', 'test_cl_1');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: clCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Opponent has Lithium Li (ATK 1400) in slot 0, and Sodium Na in slot 1
  const liCard = createInstance('card_elem_3_li', 'opponent', 'test_li_1');
  engine.opponent.monsterZones[0] = {
    slotIndex: 0,
    card: liCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const naCard = createInstance('card_elem_11_na', 'opponent', 'test_na_1');
  engine.opponent.monsterZones[1] = {
    slotIndex: 1,
    card: naCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Cl attacks and destroys Li
  const clAtk = engine.declareAttack(0, 0);
  assert(clAtk.targetDestroyed === true, 'Lithium was destroyed by Chlorine');
  assert(engine.opponent.monsterZones[1].tempAtkBoost === -400, 'Chlorine oxidized remaining enemy monster reducing ATK by 400');
  assert(engine.opponent.bonusManaNextTurn === 1, 'Lithium battery recorded +1 bonus Mana for opponent on next turn');
}

// --- 5. Barium Trap Lock & Iron Redox Valence Swap ---
console.log('\n--- 5. Barium Trap Lock & Iron Redox Valence Swap ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.mana = 10;

  // Normal summon Barium
  const baCard = createInstance('card_elem_56_ba', 'player', 'test_ba_1');
  engine.player.hand.push(baCard);

  // Provide a tribute in slot 0
  const hCard = createInstance('card_elem_1_h', 'player', 'test_h_trib');
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: hCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Place tribute
  const sumRes = engine.normalSummon('player', baCard.uid, 'FACE_UP_ATTACK', [0]);
  assert(sumRes.success === true, 'Barium summoned with tribute');
  assert(engine.opponent.trapsLockedTurn === engine.currentTurn, 'Opponent traps locked for this turn by BaSO4 precipitation');

  // Test Iron ATK/DEF swap
  const feCard = createInstance('card_elem_26_fe', 'player', 'test_fe_swap');
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: feCard,
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  assert(feCard.def.atk === 1900 && feCard.def.def === 1800, 'Iron initial ATK is 1900 and DEF is 1800');
  const swapRes = engine.swapMonsterAtkDef('player', 1);
  assert(swapRes.success === true, 'Iron ATK/DEF swapped successfully');
  assert(feCard.def.atk === 1800 && feCard.def.def === 1900, 'Iron new ATK is 1800 and DEF is 1900');
}

// --- 6. Multi-Element Reaction Field Combos Engine ---
console.log('\n--- 6. Multi-Element Reaction Field Combos Engine ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.maxMana = 10;
  engine.player.mana = 5;

  // Place O and S on player's field
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: createInstance('card_elem_8_o', 'player', 'f_o_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: createInstance('card_elem_16_s', 'player', 'f_s_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const combo1 = engine.evaluateFieldChemicalCombos('player');
  assert(combo1.triggered === true, 'Field chemical combos triggered');
  assert(combo1.combos.includes('COMBUSTION_SO2'), 'Triggered COMBUSTION_SO2 (S + O2 -> SO2)');

  // Now place Na and Cl on field
  engine.player.monsterZones[2] = {
    slotIndex: 2,
    card: createInstance('card_elem_11_na', 'player', 'f_na_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[3] = {
    slotIndex: 3,
    card: createInstance('card_elem_17_cl', 'player', 'f_cl_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const combo2 = engine.evaluateFieldChemicalCombos('player');
  assert(combo2.combos.includes('SALT_NACL'), 'Triggered SALT_NACL (2Na + Cl2 -> 2NaCl)');

  // Now place H on field (along with existing O)
  engine.player.monsterZones[4] = {
    slotIndex: 4,
    card: createInstance('card_elem_1_h', 'player', 'f_h_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const manaBefore = engine.player.mana;
  const combo3 = engine.evaluateFieldChemicalCombos('player');
  assert(combo3.combos.includes('WATER_SYNTHESIS'), 'Triggered WATER_SYNTHESIS (2H2 + O2 -> 2H2O)');
  assert(engine.player.mana === manaBefore + 1, 'Clean Hydrogen fuel cell awarded +1 Mana');
}

// --- 7. Thermite & Haber-Bosch Field Combos ---
console.log('\n--- 7. Thermite & Haber-Bosch Field Combos ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.mana = 5;
  engine.player.lp = 6000;

  // Place Al and Fe on player's field
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: createInstance('card_elem_13_al', 'player', 'f_al_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: createInstance('card_elem_26_fe', 'player', 'f_fe_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const oppLpBefore = engine.opponent.lp;
  const thermiteRes = engine.evaluateFieldChemicalCombos('player');
  assert(thermiteRes.combos.includes('THERMITE_SYNERGY'), 'Triggered THERMITE_SYNERGY (2Al + Fe2O3 -> Al2O3 + 2Fe)');
  assert(engine.opponent.lp === oppLpBefore - 400, 'Thermite reaction burned 400 LP from opponent');

  // Place N2 and H on field
  engine.player.monsterZones[2] = {
    slotIndex: 2,
    card: createInstance('card_elem_7_n', 'player', 'f_n_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[3] = {
    slotIndex: 3,
    card: createInstance('card_elem_1_h', 'player', 'f_h_2'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const playerLpBefore = engine.player.lp;
  const haberRes = engine.evaluateFieldChemicalCombos('player');
  assert(haberRes.combos.includes('HABER_BOSCH_AMMONIA'), 'Triggered HABER_BOSCH_AMMONIA (N2 + 3H2 ⇌ 2NH3)');
  assert(engine.player.lp === playerLpBefore + 200, `Haber-Bosch recovered 200 LP for player (Expected: ${playerLpBefore + 200}, got ${engine.player.lp})`);
  assert(engine.player.monsterZones[0].tempAtkBoost >= 150, 'Allied monsters received Haber-Bosch +150 ATK boost');
}

// --- 8. Hydrocarbon Flame & Galvanic Daniell Voltage Combos ---
console.log('\n--- 8. Hydrocarbon Flame & Galvanic Daniell Voltage Combos ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.maxMana = 10;
  engine.player.mana = 2;

  // Place C, H, O on player's field
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: createInstance('card_elem_6_c', 'player', 'f_c_1'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: createInstance('card_elem_1_h', 'player', 'f_h_3'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[2] = {
    slotIndex: 2,
    card: createInstance('card_elem_8_o', 'player', 'f_o_2'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const oppLpBefore = engine.opponent.lp;
  const manaBefore = engine.player.mana;
  const combustionRes = engine.evaluateFieldChemicalCombos('player');
  assert(combustionRes.combos.includes('HYDROCARBON_COMBUSTION'), 'Triggered HYDROCARBON_COMBUSTION (C + H + O -> CO2 + H2O)');
  assert(combustionRes.combos.includes('WATER_SYNTHESIS'), 'Simultaneously triggered WATER_SYNTHESIS from H + O');
  assert(engine.opponent.lp === oppLpBefore - 450, 'Hydrocarbon combustion burned 450 LP from opponent');
  assert(engine.player.mana === manaBefore + 2, 'Gained +2 Mana total (+1 from fuel cell, +1 from hydrocarbon flame)');

  // Now test Galvanic Couple Fe + Cu
  const engine2 = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine2.player.monsterZones[0] = {
    slotIndex: 0,
    card: createInstance('card_elem_26_fe', 'player', 'f_fe_galv'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine2.player.monsterZones[1] = {
    slotIndex: 1,
    card: createInstance('card_elem_29_cu', 'player', 'f_cu_galv'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const handCountBefore = engine2.player.hand.length;
  const galvRes = engine2.evaluateFieldChemicalCombos('player');
  assert(galvRes.combos.includes('GALVANIC_EMF_VOLTAGE'), 'Triggered GALVANIC_EMF_VOLTAGE (Fe + Cu²⁺ -> Fe²⁺ + Cu)');
  assert(engine2.player.hand.length === handCountBefore + 1, 'Galvanic cell EMF drew 1 extra card from deck');
  assert(engine2.player.monsterZones[0].tempDefBoost === 150, 'Iron gained +150 DEF passivation barrier');
  assert(engine2.player.monsterZones[1].tempDefBoost === 150, 'Copper gained +150 DEF cathode plating');
}

// --- 9. Organic Fischer Esterification Equilibrium Combo ---
console.log('\n--- 9. Organic Fischer Esterification Equilibrium Combo ---');
{
  const engine = new DuelEngine(DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, 'NOVICE');
  engine.player.lp = 5000;

  // Place CH3COOH and C2H5OH on field
  engine.player.monsterZones[0] = {
    slotIndex: 0,
    card: createInstance('card_comp_ch3cooh', 'player', 'f_acetic'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  engine.player.monsterZones[1] = {
    slotIndex: 1,
    card: createInstance('card_comp_c2h5oh', 'player', 'f_ethanol'),
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const lpBefore = engine.player.lp;
  const esterRes = engine.evaluateFieldChemicalCombos('player');
  assert(esterRes.combos.includes('ORGANIC_FISCHER_ESTERIFICATION'), 'Triggered ORGANIC_FISCHER_ESTERIFICATION (CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O)');
  assert(engine.player.lp === lpBefore + 600, 'Fischer esterification aroma recovered 600 LP');
}

console.log('\n======================================================================');
console.log(' AUDIT RESULT: ALL 40 / 40 ASSERTIONS PASSED (100% SUCCESS)           ');
console.log('======================================================================\n');
