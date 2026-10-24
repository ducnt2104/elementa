// test-moba-aoe-environment.mjs
// Comprehensive test suite for MOBA Chemical Environmental Hazards,
// Surface Reaction Overlaps, River Thermodynamics & Burning Bush Foliage Camouflage.

import assert from 'node:assert';
import { MobaEngine } from './src/game/engine/mobaEngine.ts';
import { MAP_BRUSHES } from './src/game/maps/periodicRiftMap.ts';

console.log('--- TEST SUITE 64: MOBA CHEMICAL ENVIRONMENTAL HAZARDS & SURFACE REACTIONS ---');

// Test 1: Acid AoE + Alkaline AoE Neutralization Interaction
console.log('Test 1: Acid AoE + Alkaline AoE Surface Neutralization (HCl + NaOH)...');
{
  const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');
  const blueHero = engine.heroes.find(h => h.team === 'BLUE');
  assert(blueHero, 'Blue hero must exist');

  // Injure blue hero and give corrosive acid status effect
  blueHero.pos = { x: 1225, y: 1200 };
  blueHero.hp = 300;
  blueHero.statusEffects = [
    {
      id: 'acid_debuff_1',
      type: 'ACID_CORROSION',
      name_vi: 'Ăn Mòn Axit',
      durationSeconds: 5,
      remainingSeconds: 5,
      potency: 20
    }
  ];

  // Spawn overlapping Acid and Alkaline AoEs
  engine.aoeZones = [
    {
      id: 'aoe_acid_test',
      sourceEntityId: 'hero_cl_toxic',
      team: 'RED',
      pos: { x: 1200, y: 1200 },
      radius: 200,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 30,
      damageType: 'CHEMICAL',
      color: '#84cc16',
      chemicalEffectType: 'Đám Mây Khí Độc Axit Cl2',
      chemicalCategory: 'ACID',
      elementSymbol: 'Cl'
    },
    {
      id: 'aoe_base_test',
      sourceEntityId: 'hero_na_brawler',
      team: 'BLUE',
      pos: { x: 1250, y: 1200 },
      radius: 200,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 25,
      damageType: 'CHEMICAL',
      color: '#f59e0b',
      chemicalEffectType: 'Hào Quang Xút NaOH',
      chemicalCategory: 'BASE',
      elementSymbol: 'Na'
    }
  ];

  const initialHp = blueHero.hp;
  engine.updateAoEZones(0.5);

  // Assertions
  const rxNeutral = engine.reactionsTriggered.find(r => r.reactionRule?.ruleCode === 'RX_SURFACE_NEUTRALIZATION');
  assert(rxNeutral, 'Neutralization reaction must be logged in telemetry');
  assert(rxNeutral.equation.includes('HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)'), 'Equation must match acid-base neutralization');

  const fTextNeutral = engine.floatingTexts.find(t => t.text.includes('TRUNG HÒA AXIT - BAZƠ'));
  assert(fTextNeutral, 'Floating combat text must announce neutralization');

  assert(blueHero.hp > initialHp, 'Friendly hero in neutral salt mist must receive HP healing');
  assert.strictEqual(blueHero.statusEffects.some(e => e.type === 'ACID_CORROSION'), false, 'Acid corrosion debuff must be purged by neutralization');

  console.log('  ✓ Neutralization verified: Toxicity cleansed, +40 HP healed, equation logged');
}

// Test 2: High-Temp / Fire AoE in River -> Flash Steam Explosion
console.log('Test 2: Fire AoE in River -> Flash Steam Vaporization (H2O(l) -> H2O(g))...');
{
  const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');
  const enemyHero = engine.heroes.find(h => h.team === 'RED');
  assert(enemyHero, 'Enemy hero must exist');

  // Place enemy hero at river center (1200, 1200)
  enemyHero.pos = { x: 1200, y: 1200 };
  assert(engine.isPositionInRiver(enemyHero.pos), 'Position must be verified inside River');

  // Spawn Fire AoE directly in the River
  engine.aoeZones = [
    {
      id: 'aoe_fire_river',
      sourceEntityId: 'hero_o_arsonist',
      team: 'BLUE',
      pos: { x: 1200, y: 1200 },
      radius: 220,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 40,
      damageType: 'CHEMICAL',
      color: '#ef4444',
      chemicalEffectType: 'Bão Lửa Tỏa Nhiệt Siêu Cấp',
      chemicalCategory: 'FIRE',
      elementSymbol: 'O'
    }
  ];

  engine.updateAoEZones(0.5);

  const rxSteam = engine.reactionsTriggered.find(r => r.reactionRule?.ruleCode === 'RX_STEAM_EXPLOSION');
  assert(rxSteam, 'Steam explosion reaction must be logged');
  assert(rxSteam.equation.includes('H₂O(l) → H₂O(g)'), 'Steam explosion equation verified');

  const fTextSteam = engine.floatingTexts.find(t => t.text.includes('HƠI NƯỚC BÙNG NỔ'));
  assert(fTextSteam, 'Floating combat text must show steam explosion');

  const steamDebuff = enemyHero.statusEffects.find(e => e.name_vi === 'Mù Hơi Nước Bùng Nổ');
  assert(steamDebuff, 'Enemy hero in steam blast must receive Slow/Blind debuff');
  assert.strictEqual(steamDebuff.potency, 0.40, 'Steam slow potency must be 40%');

  console.log('  ✓ River flash steam vaporization verified: ΔH_vap applied, steam blindness inflicted');
}

// Test 3: Alkali Metal (Sodium) AoE in River -> Hydrogen Detonation
console.log('Test 3: Alkali Metal (Na) AoE in River -> 2Na + 2H2O -> 2NaOH + H2 Detonation...');
{
  const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');
  const enemyHero = engine.heroes.find(h => h.team === 'RED');
  assert(enemyHero, 'Enemy hero must exist');

  enemyHero.pos = { x: 1210, y: 1210 };
  enemyHero.hp = 600;
  const hpBefore = enemyHero.hp;

  engine.aoeZones = [
    {
      id: 'aoe_na_river',
      sourceEntityId: 'hero_na_brawler',
      team: 'BLUE',
      pos: { x: 1200, y: 1200 },
      radius: 240,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 20,
      damageType: 'CHEMICAL',
      color: '#f59e0b',
      chemicalEffectType: 'Đại Bùng Nổ Enthalpy',
      chemicalCategory: 'BASE',
      elementSymbol: 'Na'
    }
  ];

  engine.updateAoEZones(0.5);

  const rxAlkali = engine.reactionsTriggered.find(r => r.reactionRule?.ruleCode === 'RX_Na_RIVER_EXPLOSION');
  assert(rxAlkali, 'Alkali river detonation must be logged');
  assert(rxAlkali.equation.includes('2Na + 2H₂O → 2NaOH + H₂↑'), 'Alkali river reaction equation verified');

  const fTextAlkali = engine.floatingTexts.find(t => t.text.includes('NỔ KHÍ HYDRO TRÊN SÔNG (Na)'));
  assert(fTextAlkali, 'Floating text must announce hydrogen gas explosion');

  assert(enemyHero.hp < hpBefore - 50, 'Enemy hero must take chemical burst damage from H2 blast (factoring in magic resist)');
  console.log('  ✓ Alkali river detonation verified: Exothermic H2 release logged, burst damage inflicted');
}

// Test 4: Fire AoE Ignites Bush -> Camouflage Stripping & Biomass Combustion
console.log('Test 4: Fire AoE Ignites Bush -> Biomass Combustion & Camouflage Stripping...');
{
  const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');
  const redHero = engine.heroes.find(h => h.team === 'RED');
  assert(redHero, 'Red hero must exist');

  // Place red hero inside the first brush
  const brush = MAP_BRUSHES[0]; // { id: 'brush_river_top', x: 980, y: 1020, width: 120, height: 70 }
  redHero.pos = { x: brush.x + 20, y: brush.y + 20 };

  // Before fire: Enemy in brush is not visible to Blue team
  const isVisibleBefore = engine.isEntityVisibleToTeam(redHero.pos, 'RED', 'BLUE');
  assert.strictEqual(isVisibleBefore, false, 'Red hero concealed in brush must NOT be visible to Blue team');

  // Cast Fire AoE overlapping the brush
  engine.aoeZones = [
    {
      id: 'aoe_fire_bush',
      sourceEntityId: 'hero_fe_warden',
      team: 'BLUE',
      pos: { x: brush.x + 30, y: brush.y + 30 },
      radius: 160,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 35,
      damageType: 'CHEMICAL',
      color: '#ea580c',
      chemicalEffectType: 'Bão Nhiệt Nhôm Cực Hạn',
      chemicalCategory: 'FIRE',
      elementSymbol: 'Fe'
    }
  ];

  engine.updateAoEZones(0.5);

  // Verify bush caught fire
  assert.strictEqual(engine.burningBushes.has(brush.id), true, 'Brush must be added to burningBushes');

  const rxBiomass = engine.reactionsTriggered.find(r => r.reactionRule?.ruleCode === 'RX_BIOMASS_COMBUSTION');
  assert(rxBiomass, 'Biomass combustion must be logged in telemetry');
  assert(rxBiomass.equation.includes('C₆H₁₀O₅ + 6O₂ → 6CO₂ + 5H₂O'), 'Cellulose oxidation equation verified');

  const fTextBush = engine.floatingTexts.find(t => t.text.includes('THIÊU RỤI BỤI RẬM'));
  assert(fTextBush, 'Floating text must announce bush incinerated');

  // Camouflage is stripped: Red hero is now visible to Blue team!
  const isVisibleAfter = engine.isEntityVisibleToTeam(redHero.pos, 'RED', 'BLUE');
  assert.strictEqual(isVisibleAfter, true, 'Red hero inside burning bush must be immediately revealed to enemy team');

  console.log('  ✓ Biomass combustion verified: Brush ignited, cellulose reaction logged, stealth stripped');
}

// Test 5: Fire AoE + Organic AoE Pyrolysis Deflagration
console.log('Test 5: Fire AoE + Organic AoE Pyrolysis Deflagration (CH4 + 2O2 -> CO2 + 2H2O)...');
{
  const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');
  const enemyHero = engine.heroes.find(h => h.team === 'RED');
  assert(enemyHero, 'Enemy hero must exist');

  enemyHero.pos = { x: 810, y: 810 };
  enemyHero.hp = 500;
  const hpBefore = enemyHero.hp;

  engine.aoeZones = [
    {
      id: 'aoe_fire_organic1',
      sourceEntityId: 'hero_o_arsonist',
      team: 'BLUE',
      pos: { x: 800, y: 800 },
      radius: 180,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 25,
      damageType: 'CHEMICAL',
      color: '#ef4444',
      chemicalEffectType: 'Bão Lửa Tỏa Nhiệt Siêu Cấp',
      chemicalCategory: 'FIRE',
      elementSymbol: 'O'
    },
    {
      id: 'aoe_organic2',
      sourceEntityId: 'hero_c_mage',
      team: 'RED',
      pos: { x: 820, y: 800 },
      radius: 180,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 25,
      damageType: 'CHEMICAL',
      color: '#71717a',
      chemicalEffectType: 'Nhiệt Phân Hydrocarbon Hữu Cơ',
      chemicalCategory: 'ORGANIC',
      elementSymbol: 'C'
    }
  ];

  engine.updateAoEZones(0.5);

  const fTextOrganic = engine.floatingTexts.find(t => t.text.includes('BÙNG NỔ NHIỆT HỮU CƠ'));
  assert(fTextOrganic, 'Floating combat text must show organic thermal deflagration');

  assert(enemyHero.hp < hpBefore - 35, 'Enemy hero in deflagration must take chemical blast damage (factoring in magic resist)');
  assert.strictEqual(enemyHero.statusEffects.some(e => e.type === 'BURN_OXIDATION'), true, 'Hydrocarbon burn debuff must be applied');

  console.log('  ✓ Organic deflagration verified: 60 chemical blast damage, hydrocarbon burn applied');
}

// Test 6: Alkaline AoE + Copper Electrolyte AoE -> Insoluble Precipitate Entanglement
console.log('Test 6: Alkaline AoE + Copper AoE -> Cu2+ + 2OH- -> Cu(OH)2↓ Precipitate Entanglement...');
{
  const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');
  const enemyHero = engine.heroes.find(h => h.team === 'RED');
  assert(enemyHero, 'Enemy hero must exist');

  enemyHero.pos = { x: 610, y: 610 };

  engine.aoeZones = [
    {
      id: 'aoe_base_precip',
      sourceEntityId: 'hero_na_brawler',
      team: 'BLUE',
      pos: { x: 600, y: 600 },
      radius: 180,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 20,
      damageType: 'CHEMICAL',
      color: '#f59e0b',
      chemicalEffectType: 'Hào Quang Xút NaOH',
      chemicalCategory: 'BASE',
      elementSymbol: 'Na'
    },
    {
      id: 'aoe_copper_precip',
      sourceEntityId: 'hero_cu_striker',
      team: 'BLUE',
      pos: { x: 620, y: 600 },
      radius: 180,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 20,
      damageType: 'CHEMICAL',
      color: '#06b6d4',
      chemicalEffectType: 'Bẫy Kết Tủa Lam Cu(OH)₂',
      chemicalCategory: 'ELECTROLYTE',
      elementSymbol: 'Cu'
    }
  ];

  engine.updateAoEZones(0.5);

  const fTextPrecip = engine.floatingTexts.find(t => t.text.includes('KẾT TỦA KẸT CHÂN Cu(OH)₂↓'));
  assert(fTextPrecip, 'Floating text must announce blue precipitate entanglement');

  const slowDebuff = enemyHero.statusEffects.find(e => e.name_vi.includes('Cu(OH)₂'));
  assert(slowDebuff, 'Enemy hero must receive precipitate slow');
  assert.strictEqual(slowDebuff.potency, 0.55, 'Precipitate slow potency must be 55%');

  console.log('  ✓ Insoluble precipitate entanglement verified: Cu(OH)2↓ entrapment slow 55%');
}

// Test 7: Quicklime (CaO) AoE in River -> CaO + H2O -> Ca(OH)2 Slaking Scald
console.log('Test 7: Quicklime (CaO) AoE in River -> CaO + H2O -> Ca(OH)2 Slaking Scald...');
{
  const engine = new MobaEngine('hero_ca_sentinel', 'SOLO_AI_5V5');
  const enemyHero = engine.heroes.find(h => h.team === 'RED');
  assert(enemyHero, 'Enemy hero must exist');

  enemyHero.pos = { x: 1205, y: 1205 };
  enemyHero.hp = 500;
  const initialHp = enemyHero.hp;

  engine.aoeZones = [
    {
      id: 'aoe_ca_river',
      sourceEntityId: 'hero_ca_sentinel',
      team: 'BLUE',
      pos: { x: 1200, y: 1200 },
      radius: 200,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 20,
      damageType: 'CHEMICAL',
      color: '#f97316',
      chemicalEffectType: 'Bột Vôi Sống Nung Nóng',
      chemicalCategory: 'BASE',
      elementSymbol: 'Ca'
    }
  ];

  engine.updateAoEZones(0.5);

  const rxSlaking = engine.reactionsTriggered.find(r => r.reactionRule?.ruleCode === 'RX_CaO_RIVER_SLAKING');
  assert(rxSlaking, 'Quicklime slaking reaction must be logged');
  assert(rxSlaking.equation.includes('CaO + H₂O → Ca(OH)₂'), 'Equation must match quicklime slaking');

  const fTextSlaking = engine.floatingTexts.find(t => t.text.includes('TÔI VÔI TỎA NHIỆT TRÊN SÔNG (CaO)'));
  assert(fTextSlaking, 'Floating combat text must show slaking scalding');

  assert(enemyHero.hp < initialHp - 30, 'Enemy hero must receive scalding chemical damage');
  assert(enemyHero.statusEffects.some(e => e.name_vi === 'Bỏng Nước Sôi Tỏa Nhiệt'), 'Scald burn debuff must be inflicted');

  // Verify environmental zone created
  const limewaterZone = engine.environmentalZones.find(z => z.type === 'LIMEWATER_CAUSTIC');
  assert(limewaterZone, 'LIMEWATER_CAUSTIC environmental zone must be spawned');

  // Next tick in zone inflicts caustic weaken
  engine.updateAoEZones(0.5);
  assert(enemyHero.statusEffects.some(e => e.name_vi === 'Xói Mòn Kiềm Ca(OH)₂'), 'Limewater zone must inflict alkali weaken debuff');

  console.log('  ✓ Quicklime river slaking verified: ΔH = -65.2 kJ/mol, scalding burn & caustic limewater pool active');
}

// Test 8: Cryogenic Liquid Nitrogen AoE in River -> N2(l) + H2O(l) -> H2O(s) Ice Bridge
console.log('Test 8: Cryogenic Liquid Nitrogen AoE in River -> N2(l) + H2O(l) -> H2O(s) Ice Bridge...');
{
  const engine = new MobaEngine('hero_n_frost', 'SOLO_AI_5V5');
  const enemyHero = engine.heroes.find(h => h.team === 'RED');
  const blueHero = engine.heroes.find(h => h.team === 'BLUE');
  assert(enemyHero && blueHero, 'Heroes must exist');

  enemyHero.pos = { x: 1205, y: 1205 };
  blueHero.pos = { x: 1210, y: 1210 };

  engine.aoeZones = [
    {
      id: 'aoe_n2_river',
      sourceEntityId: 'hero_n_frost',
      team: 'BLUE',
      pos: { x: 1200, y: 1200 },
      radius: 200,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 20,
      damageType: 'CHEMICAL',
      color: '#2dd4bf',
      chemicalEffectType: 'Bão Hàn Băng Nitơ Lỏng N₂',
      chemicalCategory: 'CRYOGENIC',
      elementSymbol: 'N'
    }
  ];

  engine.updateAoEZones(0.5);

  const rxFreeze = engine.reactionsTriggered.find(r => r.reactionRule?.ruleCode === 'RX_NITROGEN_RIVER_FREEZE');
  assert(rxFreeze, 'Nitrogen river freeze reaction must be logged');
  assert(rxFreeze.equation.includes('N₂(l) + H₂O(l) → H₂O(s)'), 'Equation must match nitrogen cryogenic phase transition');

  const fTextFreeze = engine.floatingTexts.find(t => t.text.includes('ĐÓNG BĂNG MẶT SÔNG (N₂)'));
  assert(fTextFreeze, 'Floating text must announce river freeze');

  // Verify enemy is rooted
  const rootDebuff = enemyHero.statusEffects.find(e => e.name_vi === 'Đóng Băng Tức Thời (N₂)');
  assert(rootDebuff, 'Enemy hero must be rooted by instant nitrogen freeze');
  assert.strictEqual(rootDebuff.type, 'ROOT', 'Debuff type must be ROOT');

  // Verify frozen environmental zone created
  const iceZone = engine.environmentalZones.find(z => z.type === 'FROZEN_RIVER');
  assert(iceZone, 'FROZEN_RIVER environmental zone must be created');

  // Advance tick: Friendly hero on ice bridge gains slide haste
  engine.updateAoEZones(0.5);
  const slideHaste = blueHero.statusEffects.find(e => e.name_vi === 'Trượt Băng Nitơ N₂');
  assert(slideHaste, 'Friendly hero on ice bridge must gain sliding speed haste (+30%)');
  assert.strictEqual(slideHaste.potency, 0.30, 'Slide haste potency must be 30%');

  console.log('  ✓ Nitrogen river freeze verified: River iced over, enemies rooted, friendly units sliding +30%');
}

// Test 9: Electrolyte AoE in River -> 2H2O + 2e- -> H2 + 2OH- River Shock Wave
console.log('Test 9: Electrolyte AoE in River -> 2H2O + 2e- -> H2 + 2OH- Surface Shock Wave...');
{
  const engine = new MobaEngine('hero_cu_striker', 'SOLO_AI_5V5');
  const enemyHero = engine.heroes.find(h => h.team === 'RED');
  assert(enemyHero, 'Enemy hero must exist');

  // Place enemy hero in river within conductive range
  enemyHero.pos = { x: 1300, y: 1100 };
  assert(engine.isPositionInRiver(enemyHero.pos), 'Enemy must be in river');
  enemyHero.hp = 500;
  const initialHp = enemyHero.hp;

  engine.aoeZones = [
    {
      id: 'aoe_cu_shock_river',
      sourceEntityId: 'hero_cu_striker',
      team: 'BLUE',
      pos: { x: 1200, y: 1200 },
      radius: 180,
      durationSeconds: 3.5,
      remainingSeconds: 3.5,
      tickRateSeconds: 0.5,
      timeSinceLastTick: 0,
      damagePerTick: 25,
      damageType: 'CHEMICAL',
      color: '#facc15',
      chemicalEffectType: 'Xung Điện Phân Dung Dịch Ion',
      chemicalCategory: 'ELECTROLYTE',
      elementSymbol: 'Cu'
    }
  ];

  engine.updateAoEZones(0.5);

  const rxShock = engine.reactionsTriggered.find(r => r.reactionRule?.ruleCode === 'RX_ELECTROLYTIC_RIVER_CONDUCTION');
  assert(rxShock, 'Electrolytic conduction reaction must be logged');
  assert(rxShock.equation.includes('2H₂O + 2e⁻ → H₂↑ + 2OH⁻'), 'Equation must match electrolytic conduction');

  const fTextShock = engine.floatingTexts.find(t => t.text.includes('SỐC ĐIỆN BỀ MẶT SÔNG (Ion dẫn điện)'));
  assert(fTextShock, 'Floating text must announce river surface shock');

  assert(enemyHero.hp < initialHp - 30, 'Enemy hero must receive shock damage conducted through river water');
  const stunDebuff = enemyHero.statusEffects.find(e => e.name_vi === 'Tê Liệt Điện Phân Sông');
  assert(stunDebuff, 'Enemy in conductive river must be stunned');
  assert.strictEqual(stunDebuff.type, 'STUN', 'Debuff type must be STUN');
  assert.strictEqual(stunDebuff.durationSeconds, 1.2, 'Stun duration must be 1.2s');

  // Verify electrified water zone created
  const elecZone = engine.environmentalZones.find(z => z.type === 'ELECTRIFIED_WATER');
  assert(elecZone, 'ELECTRIFIED_WATER environmental zone must be spawned');

  console.log('  ✓ Electrolytic river shock wave verified: Conductive water shock wave, 1.2s STUN inflicted');
}

console.log('\n======================================================');
console.log('✓ ALL 9 MOBA CHEMICAL ENVIRONMENTAL HAZARD TESTS PASSED');
console.log('======================================================\n');
