// test-cards-effects-completion.mjs
// Verification of complete runtime execution for Le Chatelier, Platinum Matrix, Passivation, and Precipitation cards in DuelEngine

import assert from 'node:assert';
import { DuelEngine } from './src/domain/duelEngine.ts';
import { getPlayableCardById, getAllPlayableCards } from './src/data/playableCardsData.ts';

console.log('--- TEST SUITE 27: TACTICAL CARD EFFECTS 100% RUNTIME COMPLETION ---');

// Test 1: SPELL_LE_CHATELIER (Revert Debuffs & Draw 1)
console.log('Test 1: SPELL_LE_CHATELIER restores debuffed stats & draws card...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const cardNa = getPlayableCardById('card_elem_11_na');
  assert(cardNa, 'cardNa must exist');

  // Place Na on field with negative debuffs
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_na_1', def: cardNa, ownerId: player.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: -500,
    tempDefBoost: -300
  };

  const initialHandCount = player.hand.length;
  const leChatelierCard = getPlayableCardById('card_spell_le_chatelier');
  assert(leChatelierCard, 'leChatelierCard must exist');

  // Trigger effect directly via chain resolution
  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_lc_1', def: leChatelierCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 2,
    description: 'Le Chatelier Shift'
  };

  // Add to chain stack and resolve
  engine.chainStack.push(chainItem);
  engine.resolveChain();

  // Verify debuffs reset to 0
  const slot = player.monsterZones[0];
  assert.strictEqual(slot.tempAtkBoost, 0, 'Le Chatelier must reset negative ATK debuff to 0');
  assert.strictEqual(slot.tempDefBoost, 0, 'Le Chatelier must reset negative DEF debuff to 0');
  assert.strictEqual(player.hand.length, initialHandCount + 1, 'Le Chatelier must draw 1 card');
  console.log('  ✓ PASS: Le Chatelier restores stats to 0 and draws 1 card');
}

// Test 2: SPELL_PLATINUM_MATRIX (Mana Refund & Reaction Surge Damage)
console.log('Test 2: SPELL_PLATINUM_MATRIX refunds 1 mana & deals 300 damage...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;
  player.mana = 3;
  const initialOppLp = opp.lp;

  const ptCard = getPlayableCardById('card_spell_platinum_catalyst');
  assert(ptCard, 'ptCard must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_pt_1', def: ptCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Platinum Catalyst Matrix'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(player.mana, 4, 'Platinum Catalyst must refund +1 Mana');
  assert.strictEqual(opp.lp, initialOppLp - 300, 'Platinum Catalyst must deal 300 LP surge damage');
  console.log('  ✓ PASS: Platinum Catalyst matrix refunds 1 Mana and deals 300 LP damage');
}

// Test 3: TRAP_PASSIVATION (Corundum Shield Armor +1200 DEF)
console.log('Test 3: TRAP_PASSIVATION provides +1200 DEF passivation armor...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const cardAl = getPlayableCardById('card_elem_13_al');
  assert(cardAl, 'cardAl must exist');

  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_al_1', def: cardAl, ownerId: player.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const passCard = getPlayableCardById('card_trap_passivation_armor');
  assert(passCard, 'passCard must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_pass_1', def: passCard, ownerId: player.id },
    activatorPlayerId: player.id,
    targetSlotIndex: 0,
    spellSpeed: 2,
    description: 'Passivation Armor'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  const slot = player.monsterZones[0];
  assert.strictEqual(slot.tempDefBoost, 1200, 'Passivation armor must grant +1200 DEF');
  console.log('  ✓ PASS: Passivation armor shields monster with +1200 DEF');
}

// Test 4: TRAP_PRECIPITATION (BaSO4 Stun into Face-down Defense)
console.log('Test 4: TRAP_PRECIPITATION stuns attacking monster into Face-down Defense...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;
  const cardFe = getPlayableCardById('card_elem_26_fe');
  assert(cardFe, 'cardFe must exist');

  // Opponent has Iron in Attack position
  opp.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'inst_fe_opp', def: cardFe, ownerId: opp.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const precipCard = getPlayableCardById('card_trap_precipitation_trap');
  assert(precipCard, 'precipCard must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_precip_1', def: precipCard, ownerId: player.id },
    activatorPlayerId: player.id,
    targetSlotIndex: 1,
    spellSpeed: 2,
    description: 'Precipitation Trap'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  const oppSlot = opp.monsterZones[1];
  assert.strictEqual(oppSlot.position, 'FACE_DOWN_DEFENSE', 'Precipitation trap must flip monster to FACE_DOWN_DEFENSE');
  assert.strictEqual(oppSlot.hasAttackedThisTurn, true, 'Precipitation trap must lock attack action');
  console.log('  ✓ PASS: Precipitation trap successfully stuns target into FACE_DOWN_DEFENSE');
}

// Test 5: SPELL_ESTERIFICATION (Draw 1 & +500 ATK Buff)
console.log('Test 5: SPELL_ESTERIFICATION draws 1 card and grants +500 ATK boost...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const cardEthanol = getPlayableCardById('card_comp_c2h5oh');
  assert(cardEthanol, 'cardEthanol must exist');

  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_c2h5oh', def: cardEthanol, ownerId: player.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const initialHand = player.hand.length;
  const esterCard = getPlayableCardById('card_spell_esterification');
  assert(esterCard, 'esterCard must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_ester_1', def: esterCard, ownerId: player.id },
    activatorPlayerId: player.id,
    targetSlotIndex: 0,
    spellSpeed: 1,
    description: 'Esterification Fischer'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(player.hand.length, initialHand + 1, 'Esterification must draw 1 card');
  assert.strictEqual(player.monsterZones[0].tempAtkBoost, 500, 'Esterification must buff ATK by +500');
  console.log('  ✓ PASS: Fischer esterification draws 1 card and buffs ATK by +500');
}

// Test 6: SPELL_TOLLENS_MIRROR (Burn 600 LP Opponent & Recover 400 LP Player)
console.log('Test 6: SPELL_TOLLENS_MIRROR deals 600 burn damage and heals 400 LP...');
{
  const engine = new DuelEngine();
  engine.player.lp = 5000;
  engine.opponent.lp = 8000;

  const tollensCard = getPlayableCardById('card_spell_tollens_mirror');
  assert(tollensCard, 'tollensCard must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_tollens_1', def: tollensCard, ownerId: engine.player.id },
    activatorPlayerId: engine.player.id,
    spellSpeed: 1,
    description: 'Tollens Silver Mirror'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(engine.player.lp, 5400, 'Tollens mirror must restore +400 LP to player');
  assert.strictEqual(engine.opponent.lp, 7400, 'Tollens mirror must deal 600 burn damage to opponent');
  console.log('  ✓ PASS: Tollens silver mirror restores 400 LP and burns 600 opponent LP');
}

// Test 7: TRAP_SAPONIFICATION (Attack Negation & -500 ATK Debuff)
console.log('Test 7: TRAP_SAPONIFICATION negates attack and reduces attacker ATK by 500...');
{
  const engine = new DuelEngine();
  const opp = engine.opponent;
  const cardFe = getPlayableCardById('card_elem_26_fe');
  assert(cardFe, 'cardFe must exist');

  opp.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_fe_atk', def: cardFe, ownerId: opp.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const saponCard = getPlayableCardById('card_trap_saponification');
  assert(saponCard, 'saponCard must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_sapon_1', def: saponCard, ownerId: engine.player.id },
    activatorPlayerId: engine.player.id,
    targetSlotIndex: 0,
    spellSpeed: 2,
    description: 'Saponification Trap'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(opp.monsterZones[0].tempAtkBoost, -500, 'Saponification must reduce attacker ATK by 500');
  assert.strictEqual(opp.monsterZones[0].hasAttackedThisTurn, true, 'Saponification must mark attack as used');
  console.log('  ✓ PASS: Saponification trap negates attack and applies -500 ATK debuff');
}

// Test 8: SPELL_EXO_BURST (Exothermic Supernova 900 LP with Pyro / 450 LP without)
console.log('Test 8: SPELL_EXO_BURST deals 900 LP with Pyro monster on field...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;
  const initialOppLp = opp.lp;

  // Place Sodium (PYRO) on player field
  const cardNa = getPlayableCardById('card_elem_11_na');
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_na_pyro', def: cardNa, ownerId: player.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const exoCard = getPlayableCardById('card_spell_exothermic_burst');
  assert(exoCard, 'card_spell_exothermic_burst must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_exo_1', def: exoCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Exothermic Burst'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(opp.lp, initialOppLp - 900, 'Exothermic burst with Pyro must deal 900 LP damage');
  console.log('  ✓ PASS: Exothermic burst deals 900 LP damage when controlling Pyro');
}

// Test 9: SPELL_AQUA_REGIA_BANISH (Selects highest DEF monster & banishes)
console.log('Test 9: SPELL_AQUA_REGIA_BANISH dissolves highest DEF target and banishes...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  // Opponent has 2 monsters: Slot 0 (DEF 1200), Slot 1 (DEF 2800)
  const cardNa = getPlayableCardById('card_elem_11_na'); // DEF 1200
  const cardAu = getPlayableCardById('card_elem_79_au'); // DEF 2800
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_na_opp', def: cardNa, ownerId: opp.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };
  opp.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'inst_au_opp', def: cardAu, ownerId: opp.id },
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const aquaCard = getPlayableCardById('card_spell_aqua_regia');
  assert(aquaCard, 'card_spell_aqua_regia must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_aqua_1', def: aquaCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Aqua Regia Dissolution'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  // Slot 1 (Au with 2800 DEF) must be removed and placed in banished
  assert.strictEqual(opp.monsterZones[1], null, 'Highest DEF slot 1 must be dissolved');
  assert.ok(opp.monsterZones[0] !== null, 'Slot 0 (lower DEF) must remain intact');
  assert.strictEqual(opp.banished.length, 1, 'Opponent banished count must be 1');
  assert.strictEqual(opp.banished[0].def.id, 'card_elem_79_au', 'Banished card must be Gold (highest DEF)');
  console.log('  ✓ PASS: Aqua Regia dissolves and banishes highest DEF enemy monster');
}

// Test 10: SPELL_RADIOACTIVE_BANISH (Alpha Decay Banish)
console.log('Test 10: SPELL_RADIOACTIVE_BANISH nuclear alpha decay banishment...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  const cardFe = getPlayableCardById('card_elem_26_fe');
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'inst_fe_target', def: cardFe, ownerId: opp.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const decayCard = getPlayableCardById('card_spell_nuclear_decay');
  assert(decayCard, 'card_spell_nuclear_decay must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_decay_1', def: decayCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Nuclear Alpha Decay'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(opp.monsterZones[0], null, 'Target monster slot must be cleared');
  assert.strictEqual(opp.banished.length, 1, 'Target moved to banished zone');
  assert.strictEqual(opp.banished[0].def.id, 'card_elem_26_fe');
  console.log('  ✓ PASS: Nuclear alpha decay successfully banishes enemy target');
}

// Test 11: SPELL_CHROMATOGRAPHY_DRAW (Gas Chromatography High-Speed Draw)
console.log('Test 11: SPELL_CHROMATOGRAPHY_DRAW draws 2 + 1 bonus card when Aero/Gas drawn...');
{
  const engine = new DuelEngine();
  const player = engine.player;

  // Rig top of player deck with an AERO card and a normal card
  const cardCl = getPlayableCardById('card_elem_17_cl'); // AERO
  const cardNa = getPlayableCardById('card_elem_11_na'); // PYRO
  const cardFe = getPlayableCardById('card_elem_26_fe'); // TERRA

  player.deck.unshift(
    { uid: 'top_1', def: cardCl, ownerId: player.id },
    { uid: 'top_2', def: cardNa, ownerId: player.id },
    { uid: 'top_3', def: cardFe, ownerId: player.id }
  );

  const initialHand = player.hand.length;
  const chromCard = getPlayableCardById('card_spell_gas_chromatography');
  assert(chromCard, 'card_spell_gas_chromatography must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_chrom_1', def: chromCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Gas Chromatography Draw'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  // Since cardCl is AERO, bonus is triggered -> 3 cards drawn
  assert.strictEqual(player.hand.length, initialHand + 3, 'Chromatography with Aero must draw exactly 3 cards');
  console.log('  ✓ PASS: Gas Chromatography draws 3 cards on Aero/Gas component separation');
}

// Test 12: SPELL_AAS_SEARCH (Atomic Absorption Metal Monster Searcher)
console.log('Test 12: SPELL_AAS_SEARCH searches metal monster from deck directly into hand...');
{
  const engine = new DuelEngine();
  const player = engine.player;

  // Ensure deck contains a TERRA metal monster
  const cardFe = getPlayableCardById('card_elem_26_fe');
  player.deck.push({ uid: 'searchable_fe', def: cardFe, ownerId: player.id });

  const initialHand = player.hand.length;
  const aasCard = getPlayableCardById('card_spell_atomic_absorption');
  assert(aasCard, 'card_spell_atomic_absorption must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_aas_1', def: aasCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Atomic Absorption Spectroscopy'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(player.hand.length, initialHand + 1, 'AAS must search 1 metal card to hand');
  const addedCard = player.hand[player.hand.length - 1];
  assert.ok(['TERRA', 'ELECTRO', 'PYRO'].includes(addedCard.def.attribute), 'Searched card must be a metal attribute');
  console.log('  ✓ PASS: Atomic Absorption spectroscopy searches metal monster from deck to hand');
}

// Test 13: SPELL_FUEL_CELL_PERMA (Proton Exchange Clean Energy Fuel Cell)
console.log('Test 13: SPELL_FUEL_CELL_PERMA expands max mana, current mana, and restores LP...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  player.maxMana = 5;
  player.mana = 2;
  player.lp = 7000;

  const fuelCard = getPlayableCardById('card_spell_hydrogen_fuel_cell');
  assert(fuelCard, 'card_spell_hydrogen_fuel_cell must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_fuel_1', def: fuelCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Proton Exchange Hydrogen Fuel Cell'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(player.maxMana, 6, 'Fuel cell must permanently expand maxMana to 6');
  assert.strictEqual(player.mana, 3, 'Fuel cell must provide +1 current mana');
  assert.strictEqual(player.lp, 7400, 'Fuel cell must heal 400 LP');
  console.log('  ✓ PASS: Hydrogen Fuel Cell permanently ramps max mana (+1) and heals 400 LP');
}

// Test 14: SPELL_MANA_BURN (Plasma Discharge Electrical Arc Burn)
console.log('Test 14: SPELL_MANA_BURN burns opponent mana & inflicts scaling LP damage...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;
  opp.mana = 3;
  opp.lp = 8000;

  const plasmaCard = getPlayableCardById('card_spell_plasma_discharge');
  assert(plasmaCard, 'card_spell_plasma_discharge must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_plasma_1', def: plasmaCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Plasma Arc Discharge'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(opp.mana, 1, 'Plasma arc must burn exactly 2 mana from opponent');
  assert.strictEqual(opp.lp, 7200, 'Plasma arc must inflict 2 x 400 = 800 LP damage');
  console.log('  ✓ PASS: Plasma Discharge burns 2 enemy Mana and deals 800 direct LP damage');
}

// Test 15: SPELL_GRAVEYARD_REBORN (Cathodic Electro-Rebirth Metal Reconstitution)
console.log('Test 15: SPELL_GRAVEYARD_REBORN revives metallic monster from Graveyard to field...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  player.monsterZones[0] = null;

  const cardFe = getPlayableCardById('card_elem_26_fe');
  assert(cardFe, 'card_elem_26_fe must exist');
  player.graveyard.push({ uid: 'graveyard_fe', def: cardFe, ownerId: player.id });

  const rebornCard = getPlayableCardById('card_spell_cathode_rebirth');
  assert(rebornCard, 'card_spell_cathode_rebirth must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_reborn_1', def: rebornCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Cathodic Electro-Rebirth'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert(player.monsterZones[0] !== null, 'Empty slot must now be occupied by revived monster');
  assert.strictEqual(player.monsterZones[0].card.def.id, 'card_elem_26_fe');
  assert.strictEqual(player.graveyard.some(c => c.def.id === 'card_elem_26_fe'), false, 'Revived Fe monster must no longer be in Graveyard');
  assert.strictEqual(player.graveyard[player.graveyard.length - 1].def.id, 'card_spell_cathode_rebirth', 'Used spell card routes to Graveyard on resolution');
  console.log('  ✓ PASS: Cathodic Rebirth recovers metallic Fe from Graveyard onto battlefield');
}

// Test 16: FIELD_HABER_CHAMBER (High-Pressure Catalytic Environment)
console.log('Test 16: FIELD_HABER_CHAMBER sets 200 atm, 450°C, and injects Fe catalyst...');
{
  const engine = new DuelEngine();
  const player = engine.player;

  const haberCard = getPlayableCardById('card_field_haber_chamber');
  assert(haberCard, 'card_field_haber_chamber must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_haber_1', def: haberCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 1,
    description: 'Haber-Bosch Hyperbaric Reactor'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(engine.environment.pressure, 200.0, 'Pressure must reach 200 atm');
  assert.strictEqual(engine.environment.temperature, 723.15, 'Temperature must reach 450°C (723.15 K)');
  assert(engine.environment.activeCatalysts.includes('Fe'), 'Must activate Fe heterogeneous catalyst');
  assert.strictEqual(engine.environment.activeEnvironmentCardId, 'card_field_haber_chamber');
  console.log('  ✓ PASS: Haber-Bosch reactor establishes 200 atm, 450°C, and Fe catalyst field');
}

// Test 17: TRAP_NOBLE_SHIELD (Noble Octet Barrier Ends Battle Phase)
console.log('Test 17: TRAP_NOBLE_SHIELD terminates Battle Phase into MAIN_PHASE_2...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  engine.currentPhase = 'BATTLE_PHASE';

  const shieldCard = getPlayableCardById('card_trap_noble_gas_shield');
  assert(shieldCard, 'card_trap_noble_gas_shield must exist');

  const chainItem = {
    chainIndex: 1,
    cardInstance: { uid: 'inst_shield_1', def: shieldCard, ownerId: player.id },
    activatorPlayerId: player.id,
    spellSpeed: 2,
    description: 'Noble Gas Inert Barrier'
  };

  engine.chainStack.push(chainItem);
  engine.resolveChain();

  assert.strictEqual(engine.currentPhase, 'MAIN_PHASE_2', 'Battle phase must immediately terminate to Main Phase 2');
  console.log('  ✓ PASS: Noble Shield negates assault and transitions immediately to Main Phase 2');
}

// Test 18: Strategic Draw Systems (Tribute-for-Draw & LP-for-Draw)
console.log('Test 18: Strategic Draw Systems (tributeToDraw & lifePointDraw)...');
{
  const engine = new DuelEngine();
  const player = engine.player;

  // 18.1: tributeToDraw
  const cardNa = getPlayableCardById('card_elem_11_na');
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'tribute_na', def: cardNa, ownerId: player.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const handBeforeTribute = player.hand.length;
  const tribRes = engine.tributeToDraw(player.id, 0, 2);
  assert.strictEqual(tribRes.success, true);
  assert.strictEqual(player.monsterZones[0], null, 'Tributed monster must vacate field');
  assert.strictEqual(player.graveyard.length, 1, 'Tributed monster must enter Graveyard');
  assert.strictEqual(player.hand.length, handBeforeTribute + 2, 'Must draw exactly 2 cards');

  // 18.2: lifePointDraw success
  player.lp = 8000;
  const handBeforeLp = player.hand.length;
  const lpRes = engine.lifePointDraw(player.id, 1000, 2);
  assert.strictEqual(lpRes.success, true);
  assert.strictEqual(player.lp, 7000, 'Must deduct 1000 LP');
  assert.strictEqual(player.hand.length, handBeforeLp + 2, 'Must draw 2 cards on LP payment');

  // 18.3: lifePointDraw failure protection on critical low LP
  player.lp = 800;
  const failedLpRes = engine.lifePointDraw(player.id, 1000, 2);
  assert.strictEqual(failedLpRes.success, false, 'Must reject draw when LP <= cost');
  assert(failedLpRes.message.includes('Không đủ Điểm Sinh Mệnh'), 'Descriptive error message required');
  assert.strictEqual(player.lp, 800, 'LP must remain unmodified on rejected draw');
  console.log('  ✓ PASS: Tribute draw and Life Point draw operate with strict cost guards');
}

// Test 19: Spell Speed Mechanics & Counter Trap Priority Rules
console.log('Test 19: Spell Speed Mechanics & Counter Trap Priority Rules...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;

  const cardLeChatelier = getPlayableCardById('card_spell_le_chatelier'); // Spell Speed 2
  const cardPt = getPlayableCardById('card_spell_platinum_catalyst'); // Spell Speed 1
  const cardCounter = getPlayableCardById('card_trap_cognitive_copper'); // Spell Speed 3 Counter Trap

  assert(cardLeChatelier && cardPt && cardCounter);

  // Link 1: Spell Speed 2 activated
  const res1 = engine.pushChain(
    { uid: 'c1', def: cardLeChatelier, ownerId: player.id },
    player.id,
    2,
    undefined,
    'Chain Link 1'
  );
  assert.strictEqual(res1.success, true);
  assert.strictEqual(res1.chainIndex, 1);

  // Attempt to chain Spell Speed 1 onto existing Chain Link 1 -> Strictly Rejected
  const resInvalid = engine.pushChain(
    { uid: 'c_invalid', def: cardPt, ownerId: opp.id },
    opp.id,
    1,
    undefined,
    'Invalid SS1 response'
  );
  assert.strictEqual(resInvalid.success, false);
  assert(resInvalid.message && resInvalid.message.includes('không thể kích hoạt để phản ứng lại một chuỗi'), 'Must reject SS1 in chain');

  // Link 2: Opponent responds with Counter Trap (Spell Speed 3)
  const res2 = engine.pushChain(
    { uid: 'c2', def: cardCounter, ownerId: opp.id },
    opp.id,
    3,
    undefined,
    'Chain Link 2: Counter Trap'
  );
  assert.strictEqual(res2.success, true);
  assert.strictEqual(res2.chainIndex, 2);

  // Attempt to respond to Counter Trap (SS3) with Quick-Play/Normal Trap (SS2) -> Strictly Rejected
  const resInvalidSS2 = engine.pushChain(
    { uid: 'c_invalid_ss2', def: cardLeChatelier, ownerId: player.id },
    player.id,
    2,
    undefined,
    'Invalid SS2 response to SS3'
  );
  assert.strictEqual(resInvalidSS2.success, false);
  assert(resInvalidSS2.message && resInvalidSS2.message.includes('không thể phản ứng lại Tốc độ 3'), 'Must reject SS2 against SS3');

  // Link 3: Player responds to Counter Trap with another Counter Trap (Spell Speed 3) -> Allowed!
  const res3 = engine.pushChain(
    { uid: 'c3', def: cardCounter, ownerId: player.id },
    player.id,
    3,
    undefined,
    'Chain Link 3: Counter-Counter Trap'
  );
  assert.strictEqual(res3.success, true);
  assert.strictEqual(res3.chainIndex, 3);

  // LIFO Resolution
  engine.resolveChain();
  assert.strictEqual(engine.chainStack.length, 0, 'Chain stack must be empty after resolution');
  console.log('  ✓ PASS: Spell Speed 1 rejection, SS2 vs SS3 rejection, and SS3 cascade verified');
}

// Test 20: Direct Attack Verification & Fluorine Defensive Override
console.log('Test 20: Direct Attack Verification & Fluorine Defense Penetration...');
{
  const engine = new DuelEngine();
  const player = engine.player;
  const opp = engine.opponent;
  engine.currentPhase = 'BATTLE_PHASE';
  engine.activePlayerId = player.id;

  const cardNa = getPlayableCardById('card_elem_11_na'); // Normal attacker ATK 1100
  const cardF = getPlayableCardById('card_elem_9_f');   // Fluorine with ELEM_F_MAX_OX
  const cardAl = getPlayableCardById('card_elem_13_al'); // Defender

  assert(cardNa && cardF && cardAl);

  // Put Na on player zone 0
  player.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'att_na', def: cardNa, ownerId: player.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  // Case 20.1: Opponent has defense monster on field -> Direct attack rejected for Na
  opp.monsterZones[0] = {
    slotIndex: 0,
    card: { uid: 'def_al', def: cardAl, ownerId: opp.id },
    position: 'FACE_UP_DEFENSE',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const directBlocked = engine.declareAttack(0, 'DIRECT');
  assert.strictEqual(directBlocked.success, false);
  assert(directBlocked.message.includes('Đối phương vẫn còn quái thú phòng thủ trên sân'));

  // Case 20.2: Fluorine (F) in player zone 1 bypasses defense-position monsters to attack directly!
  player.monsterZones[1] = {
    slotIndex: 1,
    card: { uid: 'att_f', def: cardF, ownerId: player.id },
    position: 'FACE_UP_ATTACK',
    hasAttackedThisTurn: false,
    hasChangedPositionThisTurn: false,
    turnSummoned: 1,
    tempAtkBoost: 0,
    tempDefBoost: 0
  };

  const initialOppLp = opp.lp;
  const fDirectRes = engine.declareAttack(1, 'DIRECT');
  assert.strictEqual(fDirectRes.success, true);
  assert.strictEqual(fDirectRes.directAttack, true);
  assert(opp.lp < initialOppLp, 'Opponent must take direct damage from Fluorine');

  // Case 20.3: Empty opponent field allows any attacker to attack directly
  opp.monsterZones[0] = null;
  const naEmptyDirect = engine.declareAttack(0, 'DIRECT');
  assert.strictEqual(naEmptyDirect.success, true);
  assert.strictEqual(naEmptyDirect.directAttack, true);
  assert.strictEqual(player.monsterZones[0].hasAttackedThisTurn, true);

  // Attempting to attack again with same Na monster is rejected
  const repeatAttack = engine.declareAttack(0, 'DIRECT');
  assert.strictEqual(repeatAttack.success, false);
  assert(repeatAttack.message.includes('Quái thú này đã tấn công trong lượt này'));
  console.log('  ✓ PASS: Direct attack barriers, Fluorine penetration override, and turn-exhaustion verified');
}

// Test 21: Tactical Collection Compendium & Multi-Dimensional Search Filtering
console.log('Test 21: Tactical Collection Compendium & Multi-Dimensional Search Filtering...');
{
  const allCards = getAllPlayableCards();
  assert(allCards.length >= 70, `Card database must contain comprehensive cards (found ${allCards.length})`);

  // Helper matching function replicating TacticalCollectionTab search algorithm
  const searchFilter = (query) => {
    const q = query.toLowerCase().trim();
    return allCards.filter(card => {
      const matchesName = card.name.toLowerCase().includes(q) || card.name_en.toLowerCase().includes(q);
      const matchesFormula = card.chemicalFormula?.toLowerCase().includes(q);
      const matchesIupac = card.iupacName?.toLowerCase().includes(q);
      const matchesEffect = card.effectCode?.toLowerCase().includes(q) || card.effectText?.toLowerCase().includes(q);
      const matchesLore = card.scientificLore?.toLowerCase().includes(q);
      const matchesArchetype = card.archetype?.toLowerCase().includes(q);

      let matchesZ = false;
      if (card.atomicNumber !== undefined) {
        if (q === card.atomicNumber.toString()) {
          matchesZ = true;
        } else if (q.startsWith('z=') || q.startsWith('z:')) {
          const zVal = parseInt(q.slice(2).trim(), 10);
          if (!isNaN(zVal) && card.atomicNumber === zVal) matchesZ = true;
        } else if (q.startsWith('z') && !isNaN(parseInt(q.slice(1).trim(), 10))) {
          const zVal = parseInt(q.slice(1).trim(), 10);
          if (card.atomicNumber === zVal) matchesZ = true;
        }
      }

      let matchesKeyword = false;
      if (q === 'tuner' && card.isTuner) matchesKeyword = true;
      if (q === 'synchro' && (card.cardType === 'SYNCHRO_MONSTER' || !!card.synchroLevel || card.isTuner)) matchesKeyword = true;
      if (q === 'xyz' && (card.cardType === 'XYZ_MONSTER' || !!card.xyzRank)) matchesKeyword = true;
      if (q === 'pendulum' && (card.cardType === 'PENDULUM_MONSTER' || card.pendulumScale !== undefined)) matchesKeyword = true;
      if (q === 'scale' && card.pendulumScale !== undefined) matchesKeyword = true;
      if (q === 'ritual' && (card.cardType === 'RITUAL_MONSTER' || card.isRitualMonster || card.spellTrapSubtype === 'RITUAL_SPELL')) matchesKeyword = true;
      if (q === 'link' && (card.cardType === 'LINK_MONSTER' || !!card.linkRating)) matchesKeyword = true;
      if (q === 'trap' && card.cardType === 'TRAP') matchesKeyword = true;
      if (q === 'spell' && (card.cardType === 'REACTION_SPELL' || card.cardType === 'EQUIP_CATALYST' || card.cardType === 'FIELD_ENVIRONMENT')) matchesKeyword = true;

      return matchesName || matchesFormula || matchesIupac || matchesEffect || matchesLore || matchesArchetype || matchesZ || matchesKeyword;
    });
  };

  // Case 21.1: Direct atomic number integer & prefix queries
  const z26Cards = searchFilter('26');
  assert(z26Cards.some(c => c.atomicNumber === 26), 'Query "26" must find Iron (Fe, Z=26)');
  const z11Cards = searchFilter('z=11');
  assert(z11Cards.some(c => c.atomicNumber === 11), 'Query "z=11" must find Sodium (Na, Z=11)');
  const z8Cards = searchFilter('z:8');
  assert(z8Cards.some(c => c.atomicNumber === 8), 'Query "z:8" must find Oxygen (O, Z=8)');

  // Case 21.2: Chemical formula searches
  const h2oCards = searchFilter('H2O');
  assert(h2oCards.some(c => c.chemicalFormula === 'H2O'), 'Query "H2O" must find Water molecule cards');
  const naclCards = searchFilter('NaCl');
  assert(naclCards.some(c => c.chemicalFormula === 'NaCl'), 'Query "NaCl" must find Halite table salt cards');

  // Case 21.3: Yu-Gi-Oh! MR mechanic keywords
  const tunerCards = searchFilter('tuner');
  assert(tunerCards.length > 0 && tunerCards.some(c => c.isTuner), 'Query "tuner" must return Tuner monsters');
  const linkCards = searchFilter('link');
  assert(linkCards.length > 0 && linkCards.some(c => c.cardType === 'LINK_MONSTER'), 'Query "link" must return Link monsters');

  console.log('  ✓ PASS: Multi-dimensional search (Atomic Z, formulas, lore, summoning mechanics) verified');
}

// Test 22: Attribute, Rarity, and Level/Rank/Link Sorting Verification
console.log('Test 22: Attribute, Rarity, and Level/Rank/Link Sorting Verification...');
{
  const allCards = getAllPlayableCards();
  const attributes = ['PYRO', 'AQUA', 'TERRA', 'AERO', 'ELECTRO', 'ACID_DARK', 'NOBLE_VOID'];

  for (const attr of attributes) {
    const attrCards = allCards.filter(c => c.attribute === attr);
    assert(attrCards.length > 0, `Database must contain cards for attribute ${attr}`);
  }

  // Level/Rank/Link sort
  const sortedByLevel = [...allCards].sort((a, b) => {
    const rankA = a.level || a.synchroLevel || a.xyzRank || a.linkRating || 0;
    const rankB = b.level || b.synchroLevel || b.xyzRank || b.linkRating || 0;
    return rankB - rankA;
  });

  const maxLevel = sortedByLevel[0].level || sortedByLevel[0].synchroLevel || sortedByLevel[0].xyzRank || sortedByLevel[0].linkRating || 0;
  const minLevel = sortedByLevel[sortedByLevel.length - 1].level || sortedByLevel[sortedByLevel.length - 1].synchroLevel || sortedByLevel[sortedByLevel.length - 1].xyzRank || sortedByLevel[sortedByLevel.length - 1].linkRating || 0;
  assert(maxLevel >= 8, `Top sorted card must have high level/rank/link (got ${maxLevel})`);
  assert(minLevel === 0, 'Spells/traps without level must sort to bottom with rank 0');

  console.log('  ✓ PASS: All 7 attributes populated and Level/Rank/Link sorting validated');
}

console.log('--- ALL 22/22 CARD EFFECT & COMPENDIUM RUNTIME VERIFICATIONS PASSED ---');
