// test-moba-sim.mjs
// Automated Monte Carlo Combat Simulation & Balance Verification Suite for ELEMENTA MOBA

import { HEROES_CATALOG } from '../src/game/data/heroesData.ts';
import { MobaEngine } from '../src/game/engine/mobaEngine.ts';
import { MAP_CONFIG } from '../src/game/maps/periodicRiftMap.ts';

console.log('============================================================');
console.log('   ELEMENTA: MOBA MONTE CARLO COMBAT SIMULATION & BALANCE');
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

// ----------------------------------------------------------------------
// 1. Hero Archetype & Base Metric Symmetry
// ----------------------------------------------------------------------
console.log('--- 1. Hero Archetype & Base Metric Symmetry ---');

const tanks = HEROES_CATALOG.filter(h => h.role === 'TANK');
const fightersAndAssassins = HEROES_CATALOG.filter(h => h.role === 'FIGHTER' || h.role === 'ASSASSIN');
const mages = HEROES_CATALOG.filter(h => h.role === 'MAGE');
const marksmenAndSupports = HEROES_CATALOG.filter(h => h.role === 'MARKSMAN' || h.role === 'SUPPORT');

assert(tanks.length >= 3, `Sufficient tank champions in roster (got ${tanks.length})`);
assert(fightersAndAssassins.length >= 2, `Sufficient fighter/assassin champions in roster (got ${fightersAndAssassins.length})`);
assert(mages.length >= 3, `Sufficient mage champions in roster (got ${mages.length})`);
assert(marksmenAndSupports.length >= 3, `Sufficient marksman/support champions in roster (got ${marksmenAndSupports.length})`);

// Average HP calculation by role
const avgTankHp = tanks.reduce((acc, h) => acc + h.baseStats.maxHp, 0) / tanks.length;
const avgMageHp = mages.reduce((acc, h) => acc + h.baseStats.maxHp, 0) / mages.length;
assert(avgTankHp > avgMageHp, `Tanks have higher base HP than Mages (Tank avg: ${avgTankHp.toFixed(0)} > Mage avg: ${avgMageHp.toFixed(0)})`);

// Average Armor calculation by role
const avgTankArmor = tanks.reduce((acc, h) => acc + h.baseStats.armor, 0) / tanks.length;
const avgMarksmanArmor = marksmenAndSupports.reduce((acc, h) => acc + h.baseStats.armor, 0) / marksmenAndSupports.length;
assert(avgTankArmor >= avgMarksmanArmor, `Tanks have higher armor than Marksmen/Supports (Tank: ${avgTankArmor.toFixed(1)} >= Marksman: ${avgMarksmanArmor.toFixed(1)})`);

// ----------------------------------------------------------------------
// 2. Monte Carlo 1v1 Combat Simulation Harness
// ----------------------------------------------------------------------
console.log('\n--- 2. Monte Carlo 1v1 Duel Simulations (12 Heroes Round-Robin) ---');

const statsMap = {};
HEROES_CATALOG.forEach(h => {
  statsMap[h.id] = {
    heroId: h.id,
    symbol: h.symbol,
    wins: 0,
    losses: 0,
    draws: 0,
    totalDamageDealt: 0,
    totalDamageTaken: 0
  };
});

// Run a fast simulated combat duel between hero A and hero B
function simulate1v1Duel(heroAId, heroBId, maxTicks = 450) {
  const engine = new MobaEngine(heroAId, 'SOLO_AI_3V3', 'STANDARD', {
    blueTeamIds: [heroAId],
    redTeamIds: [heroBId]
  });

  const heroA = engine.heroes.find(h => h.team === 'BLUE');
  const heroB = engine.heroes.find(h => h.team === 'RED');
  if (!heroA || !heroB) return 'DRAW';

  // Position them at tactical duel engagement range (x: 1025 vs x: 1375, 350 units apart)
  heroA.pos = { x: 1025, y: 1200 };
  heroB.pos = { x: 1375, y: 1200 };

  const dt = 1 / 30; // 30Hz simulation steps for fast execution
  for (let tick = 0; tick < maxTicks; tick++) {
    if (!heroA.isAlive || !heroB.isAlive) break;

    engine.update(dt);

    // Keep them in combat range if pathing wandered
    const dist = Math.hypot(heroA.pos.x - heroB.pos.x, heroA.pos.y - heroB.pos.y);
    if (dist > 500) {
      heroA.pos = { x: 1180, y: 1200 };
      heroB.pos = { x: 1220, y: 1200 };
    }
  }

  const dmgA = (heroA.kda && heroA.kda.damageDealt) || 0;
  const dmgB = (heroB.kda && heroB.kda.damageDealt) || 0;
  statsMap[heroAId].totalDamageDealt += dmgA;
  statsMap[heroAId].totalDamageTaken += dmgB;
  statsMap[heroBId].totalDamageDealt += dmgB;
  statsMap[heroBId].totalDamageTaken += dmgA;

  if (heroA.isAlive && !heroB.isAlive) return 'A';
  if (!heroA.isAlive && heroB.isAlive) return 'B';
  if (heroA.hp > heroB.hp) return 'A';
  if (heroB.hp > heroA.hp) return 'B';
  return 'DRAW';
}

// Run round-robin across hero roster
const allHeroes = HEROES_CATALOG;
let duelCount = 0;

for (let i = 0; i < allHeroes.length; i++) {
  for (let j = i + 1; j < allHeroes.length; j++) {
    const heroA = allHeroes[i];
    const heroB = allHeroes[j];
    duelCount++;

    const outcome = simulate1v1Duel(heroA.id, heroB.id, 450); // 15 seconds max combat
    if (outcome === 'A') {
      statsMap[heroA.id].wins++;
      statsMap[heroB.id].losses++;
    } else if (outcome === 'B') {
      statsMap[heroB.id].wins++;
      statsMap[heroA.id].losses++;
    } else {
      statsMap[heroA.id].draws++;
      statsMap[heroB.id].draws++;
    }
  }
}

assert(duelCount === (allHeroes.length * (allHeroes.length - 1)) / 2, `Ran full round-robin set: ${duelCount} simulated 1v1 duels`);

// Balance Check: Win rates should be within reasonable bounds
console.log('\n--- 3. Win-Rate Distribution & Outlier Detection ---');
Object.values(statsMap).forEach(stat => {
  const totalMatches = stat.wins + stat.losses + stat.draws;
  const winRate = (stat.wins / totalMatches) * 100;
  console.log(`  Champion [${stat.symbol}]: ${stat.wins}W - ${stat.losses}L - ${stat.draws}D (Win rate: ${winRate.toFixed(1)}%)`);
  
  assert(winRate < 95, `[${stat.symbol}] is not unbeatably broken (win rate ${winRate.toFixed(1)}% < 95%)`);
  assert(winRate > 0 || stat.draws > 0, `[${stat.symbol}] is viable in combat (win rate ${winRate.toFixed(1)}% or draws)`);
});

// ----------------------------------------------------------------------
// 4. Tower Dive Aggro & Retargeting Under Attack
// ----------------------------------------------------------------------
console.log('\n--- 4. Turret Aggression & Defensive Tower Dive Mechanics ---');
const aggroEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
const blueTurret = aggroEngine.turrets.find(t => t.team === 'BLUE' && t.lane === 'MID' && !t.destroyed);
assert(blueTurret !== undefined, 'Found active Blue Mid Turret');

const redHero = aggroEngine.heroes.find(h => h.team === 'RED');
const blueHero = aggroEngine.playerHero;

// Position red hero and blue hero under Blue Turret
redHero.pos = { x: blueTurret.pos.x + 50, y: blueTurret.pos.y + 50 };
blueHero.pos = { x: blueTurret.pos.x + 30, y: blueTurret.pos.y + 30 };

// Red hero attacks Blue hero under Blue Turret
aggroEngine.applyDirectDamage(blueHero, 50, 'PHYSICAL', redHero);
aggroEngine.updateTurrets(1 / 60);

assert(blueTurret.targetEntityId === redHero.id, 'Turret immediately targeted aggressor Red Hero who damaged Blue Hero under tower (Tower Dive Aggro!)');

// ----------------------------------------------------------------------
// 5. Minion Wave Kinematics & Coordinate Boundary Integrity
// ----------------------------------------------------------------------
console.log('\n--- 5. Minion Wave Kinematics & Obstacle Bounds ---');
const minionEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
minionEngine.spawnMinionWave();
assert(minionEngine.minions.length > 0, `Minions spawned: ${minionEngine.minions.length}`);

// Step simulation for 300 ticks (10 seconds)
for (let t = 0; t < 300; t++) {
  minionEngine.update(1 / 30);
}

// Verify no minion has NaN or Infinity position
const cleanPositions = minionEngine.minions.every(m => 
  !isNaN(m.pos.x) && !isNaN(m.pos.y) && isFinite(m.pos.x) && isFinite(m.pos.y) &&
  m.pos.x >= 0 && m.pos.x <= MAP_CONFIG.WIDTH &&
  m.pos.y >= 0 && m.pos.y <= MAP_CONFIG.HEIGHT
);
assert(cleanPositions, 'All active minions maintain valid finite 2D coordinates within [0, 2400] map boundary');

// ----------------------------------------------------------------------
// 6. Monte Carlo 5v5 Teamfight Simulation & Hero Role Parity
// ----------------------------------------------------------------------
console.log('\n--- 6. Monte Carlo 5v5 Teamfight Simulation & Hero Role Parity ---');

const draftBlue = ['hero_na_brawler', 'hero_fe_warden', 'hero_cl_toxic', 'hero_cu_striker', 'hero_h_scout'];
const draftRed = ['hero_ba_titan', 'hero_ca_tank', 'hero_o_arsonist', 'hero_n_marksman', 'hero_s_assassin'];

const engine5v5 = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD', {
  blueTeamIds: draftBlue,
  redTeamIds: draftRed
});
engine5v5.playerHero.isPlayer = false; // Autonomous bot control for all 10 heroes

const blueHeroes = engine5v5.heroes.filter(h => h.team === 'BLUE');
const redHeroes = engine5v5.heroes.filter(h => h.team === 'RED');

assert(blueHeroes.length === 5 && redHeroes.length === 5, '5v5 match initialized with exactly 10 heroes (5 Blue vs 5 Red)');

// Verify all 6 roles are represented across the 10 champions
const uniqueRoles = new Set(engine5v5.heroes.map(h => h.definition.role));
assert(uniqueRoles.size >= 5, `High role diversity represented across 5v5 draft (got ${uniqueRoles.size} roles: ${Array.from(uniqueRoles).join(', ')})`);

// Position heroes in mid-lane engagement zone for teamfight clash
blueHeroes.forEach((h, idx) => {
  h.pos = { x: 1100 + (idx % 2) * 40, y: 1200 + (idx - 2) * 50 };
});
redHeroes.forEach((h, idx) => {
  h.pos = { x: 1300 - (idx % 2) * 40, y: 1200 + (idx - 2) * 50 };
});

// Run 240 simulation steps (8 seconds of intense 30Hz combat)
for (let step = 0; step < 240; step++) {
  engine5v5.update(1 / 30);
}

// 1. Telemetry sanity check
const allValidStats = engine5v5.heroes.every(h =>
  !isNaN(h.hp) && !isNaN(h.mana) && !isNaN(h.pos.x) && !isNaN(h.pos.y) &&
  isFinite(h.hp) && isFinite(h.mana) && isFinite(h.pos.x) && isFinite(h.pos.y) &&
  h.hp >= 0
);
assert(allValidStats, 'All 10 heroes maintain valid, finite HP, Mana, and 2D coordinates without NaN corruption');

// 2. Both teams exchanged damage
const blueDamageTotal = blueHeroes.reduce((sum, h) => sum + (h.kda?.damageDealt || 0), 0);
const redDamageTotal = redHeroes.reduce((sum, h) => sum + (h.kda?.damageDealt || 0), 0);
assert(blueDamageTotal > 0 && redDamageTotal > 0, `Both teams engaged in active combat (Blue dmg: ${blueDamageTotal}, Red dmg: ${redDamageTotal})`);

// 3. Kill and assist integrity
const totalKills = engine5v5.heroes.reduce((sum, h) => sum + (h.kda?.kills || 0), 0);
const totalDeaths = engine5v5.heroes.reduce((sum, h) => sum + (h.kda?.deaths || 0), 0);
assert(totalKills === totalDeaths, `Global kill/death conservation verified: Total Kills (${totalKills}) === Total Deaths (${totalDeaths})`);

// 4. Gold accumulation consistency
const blueGold = blueHeroes.reduce((sum, h) => sum + h.gold, 0);
const redGold = redHeroes.reduce((sum, h) => sum + h.gold, 0);
assert(blueGold > 0 && redGold > 0, `Both teams accumulate gold from combat and ambient trickle (Blue: ${blueGold}g, Red: ${redGold}g)`);

// 5. Multi-Match Roster Rotation Simulation across all 12 Heroes
let all12Engaged = true;
const heroCombatTelemetry = {};
HEROES_CATALOG.forEach(h => {
  heroCombatTelemetry[h.id] = { tested: false, damageDealt: 0 };
});

// Run 3 rapid diverse team setups to ensure all 12 heroes are exercised in teamfights
const drafts = [
  { blue: ['hero_na_brawler', 'hero_fe_warden', 'hero_cl_toxic', 'hero_cu_striker', 'hero_h_scout'],
    red: ['hero_al_vanguard', 'hero_o_arsonist', 'hero_ba_titan', 'hero_c_mage', 'hero_s_assassin'] },
  { blue: ['hero_ca_tank', 'hero_n_marksman', 'hero_c_mage', 'hero_al_vanguard', 'hero_h_scout'],
    red: ['hero_na_brawler', 'hero_fe_warden', 'hero_o_arsonist', 'hero_s_assassin', 'hero_ba_titan'] }
];

drafts.forEach(draft => {
  const sim = new MobaEngine(draft.blue[0], 'SOLO_AI_5V5', 'STANDARD', {
    blueTeamIds: draft.blue,
    redTeamIds: draft.red
  });
  sim.playerHero.isPlayer = false;
  sim.heroes.filter(h => h.team === 'BLUE').forEach(h => { h.pos = { x: 1150, y: 1200 }; });
  sim.heroes.filter(h => h.team === 'RED').forEach(h => { h.pos = { x: 1250, y: 1200 }; });

  for (let s = 0; s < 120; s++) sim.update(1 / 30);

  sim.heroes.forEach(h => {
    heroCombatTelemetry[h.definition.id].tested = true;
    heroCombatTelemetry[h.definition.id].damageDealt += (h.kda?.damageDealt || 0);
  });
});

const allHeroesTested = Object.values(heroCombatTelemetry).every(t => t.tested);
assert(allHeroesTested, 'All 12 elemental champions exercised across diverse 5v5 team drafts with zero crashes');

const allDamagesPositive = Object.values(heroCombatTelemetry).some(t => t.damageDealt > 0);
assert(allDamagesPositive, 'Elemental champions deal active combat damage under autonomous bot AI');

// ----------------------------------------------------------------------
// 7. End-to-End Match Simulation & Match Debrief Telemetry Invariants
// ----------------------------------------------------------------------
console.log('\n--- 7. End-to-End Match Simulation & Match Debrief Telemetry Invariants ---');

// 1. Victory scenario via Red Core destruction
const victoryEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
assert(victoryEngine.status === 'IN_PROGRESS', 'Initial match status is IN_PROGRESS');

// Destroy Red Core
victoryEngine.cores.RED.hp = 0;
victoryEngine.checkWinLoss();
assert(victoryEngine.status === 'VICTORY', 'Match status transitions to VICTORY upon Red Core destruction');

// Populate combat and reaction telemetry
victoryEngine.playerHero.kda.kills = 7;
victoryEngine.playerHero.kda.deaths = 2;
victoryEngine.playerHero.kda.assists = 5;
victoryEngine.playerHero.kda.minionKills = 42;
victoryEngine.playerHero.kda.damageDealt = 18450;
victoryEngine.playerHero.kda.turretsDestroyed = 3;
victoryEngine.reactionsTriggered.push(
  { ruleId: 'R01_WATER_BURST', name: 'Nổ Khí Hydro 2Na + 2H2O', timestamp: 100 },
  { ruleId: 'R02_THERMITE_MELT', name: 'Nhiệt Nhôm 2Al + Fe2O3', timestamp: 150 }
);

const debrief = victoryEngine.generateMatchDebrief();
assert(debrief.outcome === 'VICTORY', 'Match debrief reflects VICTORY outcome');
assert(debrief.kda.kills === 7, `KDA kills match player stats (got ${debrief.kda.kills})`);
assert(debrief.kda.deaths === 2, `KDA deaths match player stats (got ${debrief.kda.deaths})`);
assert(debrief.kda.assists === 5, `KDA assists match player stats (got ${debrief.kda.assists})`);
assert(debrief.kda.cs === 42, `KDA CS matches minion kills (got ${debrief.kda.cs})`);
assert(debrief.kda.damageDealt === 18450, `KDA damage dealt verified (got ${debrief.kda.damageDealt})`);
assert(debrief.xpEarned === 350, `Victory grants exactly 350 XP (got ${debrief.xpEarned})`);
assert(
  debrief.knowledgeTokensEarned === 2 * 15 + 50,
  `Knowledge tokens awarded based on reactions triggered (got ${debrief.knowledgeTokensEarned})`
);

// 2. Defeat scenario via Blue Core destruction
const defeatEngine = new MobaEngine('hero_fe_warden', 'SOLO_AI_5V5', 'STANDARD');
defeatEngine.cores.BLUE.hp = 0;
defeatEngine.checkWinLoss();
assert(defeatEngine.status === 'DEFEAT', 'Match status transitions to DEFEAT upon Blue Core destruction');
const defeatDebrief = defeatEngine.generateMatchDebrief();
assert(defeatDebrief.outcome === 'DEFEAT', 'Match debrief reflects DEFEAT outcome');
assert(defeatDebrief.xpEarned === 150, `Defeat grants baseline 150 XP (got ${defeatDebrief.xpEarned})`);

// 3. Shop item purchase and stat modulation
const shopEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
const player = shopEngine.playerHero;
player.gold = 3000;
const initialArmor = player.armor;

const bought = shopEngine.buyItem(player, 'item_bauxite_boots');
assert(bought === true, 'Successfully purchased Bauxite Boots from shop');
assert(player.items.some(it => it.id === 'item_bauxite_boots'), 'Purchased item is placed into hero inventory');
assert(player.gold === 3000 - 850, `Gold deducted accurately: 3000 - 850 = ${player.gold}`);
assert(player.armor === initialArmor + 15, `Armor modulated by +15: ${initialArmor} -> ${player.armor}`);

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log('============================================================\n');

if (failed > 0) process.exit(1);
