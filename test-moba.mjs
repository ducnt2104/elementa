// test-moba.mjs
// Comprehensive MOBA Gameplay & Chemistry Integration Verification Suite

import { HEROES_CATALOG } from './src/game/data/heroesData.ts';
import { CHEMICAL_ITEMS_CATALOG } from './src/game/data/itemsData.ts';
import { MAP_CONFIG, LANE_WAYPOINTS, INITIAL_TURRETS, INITIAL_CORES, INITIAL_NEUTRAL_MONSTERS } from './src/game/maps/periodicRiftMap.ts';
import { MobaEngine } from './src/game/engine/mobaEngine.ts';
import { MobaBotAi } from './src/game/ai/mobaBotAi.ts';
import { COMPENDIUM_REACTIONS } from './src/components/ReactionCompendiumModal.tsx';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('\n============================================================');
console.log('   ELEMENTA: MOBA ARENA & CHEMISTRY INTEGRATION AUDIT');
console.log('============================================================\n');

// 1. Champions Roster Verification
console.log('--- 1. Champions Roster & Chemical Design (12 Heroes) ---');
assert(HEROES_CATALOG.length === 12, `Exactly 12 elemental champions in catalog (got ${HEROES_CATALOG.length})`);

const symbols = HEROES_CATALOG.map(h => h.symbol);
['Na', 'Fe', 'Cl', 'Cu', 'Al', 'O', 'H', 'Ba', 'C', 'S', 'Ca', 'N'].forEach(sym => {
  assert(symbols.includes(sym), `Hero catalog contains elemental hero ${sym}`);
});

HEROES_CATALOG.forEach(hero => {
  assert(hero.baseStats.maxHp >= 500 && hero.baseStats.maxHp <= 980, `${hero.name_vi}: Max HP in reasonable range [500, 980] (got ${hero.baseStats.maxHp})`);
  assert(hero.skills.passive && hero.skills.q && hero.skills.w && hero.skills.e && hero.skills.r, `${hero.name_vi}: Complete 4 skills (Q, W, E, R) + Passive`);
  assert(hero.chemicalFactsVI.length >= 3, `${hero.name_vi}: Has at least 3 authenticated chemical facts`);
});

// 2. Map Configuration & 3-Lane Architecture
console.log('\n--- 2. Periodic Rift 3-Lane Map Architecture ---');
assert(MAP_CONFIG.WIDTH === 2400 && MAP_CONFIG.HEIGHT === 2400, 'Map dimensions standard 2400x2400');
assert(LANE_WAYPOINTS.BLUE.TOP.length > 3, 'Blue Top lane waypoints defined');
assert(LANE_WAYPOINTS.BLUE.MID.length > 3, 'Blue Mid lane waypoints defined');
assert(LANE_WAYPOINTS.BLUE.BOT.length > 3, 'Blue Bot lane waypoints defined');
assert(INITIAL_TURRETS.length === 12, `Exactly 12 turrets (6 Blue, 6 Red) across 3 lanes (got ${INITIAL_TURRETS.length})`);
assert(INITIAL_CORES.BLUE.hp === MAP_CONFIG.CORE_HP, `Blue Core initial HP = ${MAP_CONFIG.CORE_HP}`);
assert(INITIAL_CORES.RED.hp === MAP_CONFIG.CORE_HP, `Red Core initial HP = ${MAP_CONFIG.CORE_HP}`);
assert(INITIAL_NEUTRAL_MONSTERS.some(m => m.type === 'CATALYST_GUARDIAN'), 'Neutral Boss Catalyst Guardian in jungle');

// 3. Chemical Items Catalog
console.log('\n--- 3. MOBA Chemical Items Economy ---');
assert(CHEMICAL_ITEMS_CATALOG.length >= 8, `Item shop has at least 8 chemical items (got ${CHEMICAL_ITEMS_CATALOG.length})`);
CHEMICAL_ITEMS_CATALOG.forEach(item => {
  assert(item.cost >= 800 && item.cost <= 3500, `${item.name_vi}: Cost in balanced bracket [800, 3500] (got ${item.cost})`);
  assert(item.chemicalFormula.length > 0, `${item.name_vi}: Has authentic chemical formula (${item.chemicalFormula})`);
  assert(item.passiveVI.length > 0, `${item.name_vi}: Has gameplay passive description`);
});

// 4. MobaEngine Simulation Loop & Minion Wave Mechanics
console.log('\n--- 4. MobaEngine Simulation & 60Hz Physics Step ---');
const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
assert(engine.heroes.length === 10, `5v5 Match initializes 10 heroes (got ${engine.heroes.length})`);
assert(engine.playerHero.definition.symbol === 'Na', 'Player hero is Sodium (Na)');
assert(engine.playerHero.team === 'BLUE', 'Player hero is on Blue team');

// Advance simulation by 5 seconds (wave spawn trigger)
for (let i = 0; i < 300; i++) {
  engine.update(1 / 60); // 60 Hz step
}

assert(engine.matchTimeSeconds >= 4.9, `Engine progressed match time to ${engine.matchTimeSeconds.toFixed(1)}s`);
assert(engine.minions.length > 0, `Minions spawned on lanes (got ${engine.minions.length} minions)`);

// 5. Chemical Reaction Combat Integration
console.log('\n--- 5. Chemical Reaction In Combat ---');
// Sodium hero casts Water Detonation (Q) in river
const riverPos = { x: 1200, y: 1200 };
assert(engine.isPositionInRiver(riverPos), 'Position (1200, 1200) detected as River H2O');

engine.playerHero.pos = { ...riverPos };
engine.castSkill(engine.playerHero, 'Q', { x: 1300, y: 1200 });
assert(engine.projectiles.length > 0, 'Skillshot line projectile spawned for Water Detonation');

// Apply reaction damage to an enemy
const enemyHero = engine.heroes.find(h => h.team === 'RED' && !h.isDead) || engine.heroes.find(h => h.team === 'RED');
assert(enemyHero !== undefined, 'Target enemy hero exists');
if (enemyHero.isDead) {
  enemyHero.isDead = false;
  enemyHero.hp = enemyHero.maxHp;
}
const initialHp = enemyHero.hp;
engine.applyDirectDamage(enemyHero, 100, 'CHEMICAL', engine.playerHero, 'rx_groupA_na_water');

assert(enemyHero.hp < initialHp, `Enemy hero took damage: ${initialHp} -> ${enemyHero.hp}`);
assert(engine.reactionsTriggered.length > 0, 'ReactionCombatEvent recorded in engine telemetry');
assert(engine.reactionsTriggered.some(r => r.equation.includes('2Na')), 'Reaction equation contains 2Na + 2H2O');

// 6. Win / Loss Condition
console.log('\n--- 6. Core Destruction & Match Debrief ---');
engine.cores.RED.hp = 0;
engine.checkWinLoss();
assert(engine.status === 'VICTORY', 'Destroying Red Core triggers VICTORY status');

const debrief = engine.generateMatchDebrief();
assert(debrief.outcome === 'VICTORY', 'Debrief records VICTORY outcome');
assert(debrief.reactionsTriggered.length > 0, 'Debrief contains reactions triggered during combat');
assert(debrief.xpEarned > 0, `Debrief awards XP (got ${debrief.xpEarned})`);

// 7. Compendium Reactions (Phần I - VI)
console.log('\n--- 7. Chemical Reactions Compendium (Cẩm Nang Phần I - VI) ---');
assert(COMPENDIUM_REACTIONS.length >= 15, `Compendium has at least 15 comprehensive reactions (got ${COMPENDIUM_REACTIONS.length})`);
const parts = new Set(COMPENDIUM_REACTIONS.map(r => r.part));
assert(parts.has('PHAN_I'), 'Compendium contains Phần I: Cơ Chế & Trao Đổi');
assert(parts.has('PHAN_III'), 'Compendium contains Phần III: Phi Kim');
assert(parts.has('PHAN_IV'), 'Compendium contains Phần IV: Kim Loại & Chuyển Tiếp');
assert(parts.has('PHAN_V'), 'Compendium contains Phần V: Nhận Biết');
assert(parts.has('PHAN_VI'), 'Compendium contains Phần VI: Hóa Học Hữu Cơ');

// 8. Fog of War & Brush Concealment Mechanics
console.log('\n--- 8. Fog of War, Brush Concealment & Tactical Vision ---');
const visionEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');

// 8.1 Ally is always visible
assert(visionEngine.isEntityVisibleToTeam({ x: 260, y: 2140 }, 'BLUE', 'BLUE') === true, 'Allied entity is always visible to own team');

// 8.2 Enemy far away in unrevealed area
assert(visionEngine.isEntityVisibleToTeam({ x: 2000, y: 500 }, 'RED', 'BLUE') === false, 'Enemy hero at (2000, 500) outside vision is shrouded in Fog of War');

// 8.3 Enemy within player vision radius (player at 260, 2140)
assert(visionEngine.isEntityVisibleToTeam({ x: 300, y: 2100 }, 'RED', 'BLUE') === true, 'Enemy hero within 650 units of player is visible');

// 8.4 Brush Concealment (brush_river_top at x: 980, y: 1020, w: 120, h: 70)
const brushPos = { x: 1000, y: 1040 };
assert(visionEngine.getBrushAt(brushPos) !== null, 'Brush detected at (1000, 1040)');

// Clear nearby heroes from brush
visionEngine.heroes.forEach(h => {
  if (h.team === 'BLUE') {
    h.pos = { x: 260, y: 2140 }; // Base
  }
});
visionEngine.minions = [];

// Observer is outside brush at distance 260 (would normally have vision, but brush conceals)
visionEngine.playerHero.pos = { x: 1000, y: 1300 };
assert(visionEngine.isEntityVisibleToTeam(brushPos, 'RED', 'BLUE') === false, 'Enemy inside brush is concealed even if observer is 260 units away');

// Observer enters the SAME brush
visionEngine.playerHero.pos = { x: 1010, y: 1045 };
assert(visionEngine.isEntityVisibleToTeam(brushPos, 'RED', 'BLUE') === true, 'Enemy inside brush is revealed when observer enters the same brush');

// Observer within melee proximity (<= 110)
visionEngine.playerHero.pos = { x: 1000, y: 1120 }; // 80 units away outside brush
assert(visionEngine.isEntityVisibleToTeam(brushPos, 'RED', 'BLUE') === true, 'Enemy inside brush is revealed by close melee proximity (<= 110)');

// Turret True Sight reveals brush (distance <= 350)
const testTurret = visionEngine.turrets.find(t => t.team === 'BLUE' && !t.destroyed);
testTurret.pos = { x: 1000, y: 1250 }; // 210 units from brush
visionEngine.playerHero.pos = { x: 260, y: 2140 }; // Player far away
assert(visionEngine.isEntityVisibleToTeam(brushPos, 'RED', 'BLUE') === true, 'Turret True Sight reveals enemy in brush within 350 units');

// 9. Neutral Monster AI, Aggro & Chemical Buffs
console.log('\n--- 9. Neutral Monster Combat, Aggro & Chemical Buffs ---');
const monsterEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
const lizard = monsterEngine.monsters.find(m => m.type === 'ACID_LIZARD');
assert(lizard !== undefined && lizard.isAlive, 'Acid Lizard is alive in blue jungle');
assert(lizard.spawnPos !== undefined, 'Monster has recorded spawn position');

// Move player hero into lizard's aggro perimeter
monsterEngine.playerHero.pos = { x: lizard.pos.x + 50, y: lizard.pos.y };
const initialHeroHp = monsterEngine.playerHero.hp;

// Update monster engine for 1 tick (1/60s)
monsterEngine.updateMonsters(1 / 60);
assert(lizard.targetEntityId === monsterEngine.playerHero.id, 'Acid lizard acquired aggro on nearby hero');

// Fast-forward 1.5 seconds for monster attack execution
for (let i = 0; i < 90; i++) {
  monsterEngine.updateMonsters(1 / 60);
}
assert(monsterEngine.playerHero.hp < initialHeroHp, 'Hero took damage from Acid Lizard');
assert(monsterEngine.playerHero.statusEffects.some(e => e.type === 'ACID_CORROSION'), 'Acid Lizard applied ACID_CORROSION DoT');

// Test Leashing: Drag monster far away (> 450 units)
lizard.pos = { x: lizard.spawnPos.x + 500, y: lizard.spawnPos.y };
lizard.hp = 200;
monsterEngine.updateMonsters(1 / 60);
assert(lizard.targetEntityId === null, 'Monster cleared target on leashing');
assert(lizard.hp > 200, 'Monster regenerates health while leashing back to spawn');

// Test Slaying Boss Catalyst Guardian
const boss = monsterEngine.monsters.find(m => m.type === 'CATALYST_GUARDIAN');
boss.hp = 50;
monsterEngine.applyDirectDamage(boss, 100, 'PHYSICAL', monsterEngine.playerHero);
assert(!boss.isAlive, 'Catalyst Guardian killed');
assert(monsterEngine.playerHero.statusEffects.some(e => e.type === 'CATALYST_BUFF'), 'Player hero received team-wide CATALYST_BUFF');
const blueAllies = monsterEngine.heroes.filter(h => h.team === 'BLUE');
assert(blueAllies.every(h => h.statusEffects.some(e => e.type === 'CATALYST_BUFF')), 'All blue teammates received CATALYST_BUFF');

// 9. All 4 Bot Difficulty Levels Verification (Novice, Standard, Advanced, Challenger)
console.log('\n--- 9. MOBA 4-Tier Bot AI Difficulty Verification ---');
const noviceEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'NOVICE');
assert(noviceEngine.difficulty === 'NOVICE', 'Engine supports NOVICE difficulty');
const standardEng = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
assert(standardEng.difficulty === 'STANDARD', 'Engine supports STANDARD difficulty');
const advancedEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'ADVANCED');
assert(advancedEngine.difficulty === 'ADVANCED', 'Engine supports ADVANCED difficulty');
const challengerEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'CHALLENGER');
assert(challengerEngine.difficulty === 'CHALLENGER', 'Engine supports CHALLENGER difficulty');

// 10. MOBA Bot AI Tactical Intelligence Audit
console.log('\n--- 10. MOBA Bot AI Tactical Intelligence Audit ---');

// 10.1 Low-HP Retreat
const aiEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'CHALLENGER');
const botHero = aiEngine.heroes.find(h => !h.isPlayer && h.team === 'BLUE');
assert(botHero !== undefined, 'Found bot hero for AI retreat test');
botHero.hp = botHero.maxHp * 0.20; // Critical HP (20% < 28%)
botHero.pos = { x: 1200, y: 1200 }; // In middle of river

let castSlot = null;
MobaBotAi.updateBot(
  botHero,
  aiEngine.heroes,
  aiEngine.turrets,
  aiEngine.minions,
  1 / 60,
  'CHALLENGER',
  (b, slot, tpos) => { castSlot = slot; }
);
assert(botHero.targetMovePos !== null, 'Low-HP bot immediately sets retreat movement destination');
assert(botHero.targetMovePos.x < 1200 || botHero.targetMovePos.y > 1200, 'Retreat destination leads back towards Blue base or friendly turret');

// 10.2 Assassin Priority Targeting
const assassinDef = HEROES_CATALOG.find(h => h.role === 'ASSASSIN');
const marksmanDef = HEROES_CATALOG.find(h => h.role === 'MARKSMAN');
const tankDef = HEROES_CATALOG.find(h => h.role === 'TANK');

const testAssassin = {
  id: 'bot_assassin',
  team: 'RED',
  isPlayer: false,
  isDead: false,
  definition: assassinDef,
  pos: { x: 1200, y: 1200 },
  attackRange: assassinDef.baseStats.attackRange,
  attackDamage: assassinDef.baseStats.attackDamage,
  movementSpeed: 340,
  hp: 600,
  maxHp: 600,
  skills: {
    q: { currentCooldown: 0, range: 400 },
    w: { currentCooldown: 0, range: 200 },
    e: { currentCooldown: 0, range: 350 },
    r: { currentCooldown: 0, range: 500 }
  },
  statusEffects: []
};

// Enemy Tank closer (dist 200), Enemy Marksman slightly farther (dist 400)
const enemyTank = {
  id: 'enemy_tank',
  team: 'BLUE',
  isDead: false,
  definition: tankDef,
  pos: { x: 1200, y: 1400 }, // 200 units away
  hp: 1200,
  maxHp: 1200
};
const enemyMarksman = {
  id: 'enemy_marksman',
  team: 'BLUE',
  isDead: false,
  definition: marksmanDef,
  pos: { x: 1200, y: 1600 }, // 400 units away
  hp: 450,
  maxHp: 450
};

MobaBotAi.updateBot(
  testAssassin,
  [testAssassin, enemyTank, enemyMarksman],
  [],
  [],
  1 / 60,
  'CHALLENGER',
  () => {}
);
assert(testAssassin.targetEntityId === 'enemy_marksman', 'Challenger Assassin AI prioritizes squishy Marksman over closer Tank');

// 10.3 Minion Last-Hitting
const farmerHero = {
  id: 'bot_farmer',
  team: 'BLUE',
  isPlayer: false,
  isDead: false,
  definition: marksmanDef,
  pos: { x: 500, y: 500 },
  attackRange: 450,
  attackDamage: 60,
  movementSpeed: 330,
  hp: 500,
  maxHp: 500,
  skills: {
    q: { currentCooldown: 99 },
    w: { currentCooldown: 99 },
    e: { currentCooldown: 99 },
    r: { currentCooldown: 99 }
  },
  statusEffects: []
};
const healthyMinion = {
  id: 'minion_healthy',
  team: 'RED',
  pos: { x: 600, y: 500 }, // 100 units away
  hp: 300,
  maxHp: 300
};
const lowHpMinion = {
  id: 'minion_low',
  team: 'RED',
  pos: { x: 750, y: 500 }, // 250 units away (within 450 range)
  hp: 40, // < 60 * 1.5 = 90
  maxHp: 300
};

MobaBotAi.updateBot(
  farmerHero,
  [farmerHero],
  [],
  [healthyMinion, lowHpMinion],
  1 / 60,
  'STANDARD',
  () => {}
);
assert(farmerHero.targetEntityId === 'minion_low', 'Bot AI prioritizes low-HP minion for last hit over closer full-HP minion');

// 10.4 Chemical Synergy Teamfight Prioritization (Advanced/Challenger)
const synergyHero = {
  id: 'bot_fighter',
  team: 'BLUE',
  isPlayer: false,
  isDead: false,
  definition: tankDef,
  pos: { x: 1200, y: 1200 },
  attackRange: 150,
  attackDamage: 70,
  movementSpeed: 340,
  hp: 900,
  maxHp: 900,
  skills: {
    q: { currentCooldown: 0, range: 300 },
    w: { currentCooldown: 0, range: 250 },
    e: { currentCooldown: 0, range: 250 },
    r: { currentCooldown: 0, range: 350 }
  },
  statusEffects: []
};
const normalEnemy = {
  id: 'enemy_normal',
  team: 'RED',
  isDead: false,
  definition: tankDef,
  pos: { x: 1200, y: 1400 }, // 200 units away
  hp: 900,
  maxHp: 900,
  statusEffects: []
};
const oxidizedEnemy = {
  id: 'enemy_oxidized',
  team: 'RED',
  isDead: false,
  definition: tankDef,
  pos: { x: 1200, y: 1420 }, // 220 units away, but has BURN_OXIDATION
  hp: 900,
  maxHp: 900,
  statusEffects: [{ id: 'burn_1', type: 'BURN_OXIDATION', name_vi: 'Oxi Hóa Nhiệt', durationSeconds: 3, remainingSeconds: 3, potency: 20 }]
};

MobaBotAi.updateBot(
  synergyHero,
  [synergyHero, normalEnemy, oxidizedEnemy],
  [],
  [],
  1 / 60,
  'CHALLENGER',
  () => {}
);
assert(synergyHero.targetEntityId === 'enemy_oxidized', 'Challenger Bot AI prioritizes chemically oxidized enemy for elemental reaction combo synergy');

// 10.5 Turret Sieging with Friendly Minions Tanking
const siegerHero = {
  id: 'bot_sieger',
  team: 'BLUE',
  isPlayer: false,
  isDead: false,
  definition: marksmanDef,
  pos: { x: 600, y: 600 },
  attackRange: 450,
  attackDamage: 65,
  movementSpeed: 330,
  hp: 600,
  maxHp: 600,
  skills: {
    q: { currentCooldown: 99 },
    w: { currentCooldown: 99 },
    e: { currentCooldown: 99 },
    r: { currentCooldown: 99 }
  },
  statusEffects: []
};
const testEnemyTurret = {
  id: 'turret_red_test',
  team: 'RED',
  lane: 'MID',
  tier: 'OUTER',
  pos: { x: 650, y: 650 },
  hp: 2000,
  maxHp: 2000,
  armor: 30,
  attackDamage: 120,
  attackRange: 400,
  attackCooldown: 0,
  targetEntityId: null,
  targetLaserProgress: 0,
  consecutiveShotsOnTarget: 0,
  isVulnerable: true,
  destroyed: false
};
const blueSiegeMinion = {
  id: 'minion_tanking_turret',
  team: 'BLUE',
  lane: 'MID',
  type: 'SIEGE',
  pos: { x: 660, y: 660 }, // Inside turret range tanking it
  targetPos: { x: 650, y: 650 },
  targetEntityId: 'turret_red_test',
  hp: 800,
  maxHp: 800,
  attackDamage: 50,
  attackRange: 320,
  attackCooldown: 0,
  speed: 120,
  radius: 24,
  waypointIndex: 2,
  goldValue: 40,
  xpValue: 60
};

MobaBotAi.updateBot(
  siegerHero,
  [siegerHero],
  [testEnemyTurret],
  [blueSiegeMinion],
  1 / 60,
  'STANDARD',
  () => {}
);
assert(siegerHero.targetEntityId === 'turret_red_test', 'Bot AI sieges enemy turret when friendly minions are tanking');

// 10.6 Neutral Objective Contesting (Catalyst Guardian)
const riverBot = {
  id: 'bot_river',
  team: 'BLUE',
  lane: 'MID',
  isPlayer: false,
  isDead: false,
  definition: marksmanDef,
  pos: { x: 880, y: 920 }, // 40 units away from Guardian pit (880, 880)
  attackRange: 450,
  attackDamage: 65,
  movementSpeed: 330,
  hp: 600,
  maxHp: 600,
  skills: {
    q: { currentCooldown: 99 },
    w: { currentCooldown: 99 },
    e: { currentCooldown: 99 },
    r: { currentCooldown: 99 }
  },
  statusEffects: []
};
const guardianBoss = {
  id: 'monster_catalyst_guardian',
  name_vi: 'Giám Hộ Xúc Tác Bạch Kim Pt',
  type: 'CATALYST_GUARDIAN',
  pos: { x: 880, y: 880 },
  hp: 4200,
  maxHp: 4200,
  attackDamage: 90,
  attackRange: 220,
  attackCooldown: 0,
  respawnTimer: 0,
  isAlive: true,
  buffType: 'REACTION_CATALYST',
  goldValue: 250,
  xpValue: 350
};

MobaBotAi.updateBot(
  riverBot,
  [riverBot],
  [],
  [],
  1 / 60,
  'ADVANCED',
  () => {},
  undefined,
  [guardianBoss]
);
assert(riverBot.targetEntityId === 'monster_catalyst_guardian', 'Advanced/Challenger Bot AI engages Catalyst Guardian when healthy and in pit');

// 9. DCSM In-Match Chemical Reaction & Copper Acid Immunity (TSK-P2-01)
console.log('\n--- 9. DCSM MOBA Combat Reactions & Cu Acid Resistance ---');
const dcsmEngine = new MobaEngine('hero_cu_striker', 'SOLO_AI_5V5', 'STANDARD');
const cuHero = dcsmEngine.playerHero;
const initialCuHp = cuHero.hp;

// Apply acid reaction damage to Copper (Cu)
dcsmEngine.applyDirectDamage(cuHero, 100, 'CHEMICAL', null, 'rx_groupC_fe_acid');
assert(cuHero.hp >= initialCuHp - 25, `Copper resists dilute acid reaction: took <= 25 dmg (actual HP: ${cuHero.hp}/${initialCuHp})`);
assert(dcsmEngine.chemicalTrapsEncountered.length > 0, 'Electrochemical trap recorded in chemicalTrapsEncountered');
assert(!cuHero.statusEffects.some(e => e.type === 'ACID_CORROSION'), 'Copper is immune to ACID_CORROSION status effect');

// Na River Water synergy
const naEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
const enemyTarget = naEngine.heroes.find(h => h.team === 'RED');
const enemyInitHp = enemyTarget.hp;
naEngine.applyDirectDamage(enemyTarget, 80, 'CHEMICAL', naEngine.playerHero, 'rx_groupA_na_water');
assert(naEngine.reactionsTriggered.some(r => r.equation.includes('2Na') && r.equation.includes('NaOH')), 'Sodium in water triggers 2Na + 2H2O reaction in MOBA');
assert(enemyTarget.statusEffects.some(e => e.type === 'SLOW'), 'Water reaction applies SLOW status effect');

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log('============================================================\n');

if (failCount > 0) process.exit(1);
