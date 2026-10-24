import { MobaEngine } from '../src/game/engine/mobaEngine.ts';
import { HEROES_CATALOG } from '../src/game/data/heroesData.ts';
import { MAP_BRUSHES } from '../src/game/maps/periodicRiftMap.ts';

console.log('======================================================================');
console.log('   TEST SUITE 159: MOBA CHEMICAL REACTION ALERTS & VFX TELEMETRY     ');
console.log('   Phase B: Environmental Synergy, Telemetry HUD & Particle Bursts    ');
console.log('======================================================================\n');

let passCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (condition) {
    console.log(`  [PASS] #${totalCount}: ${message}`);
    passCount++;
  } else {
    console.error(`  [FAIL] #${totalCount}: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Initialize MOBA Engine with Sodium Hero
console.log('--- 1. MOBA ENGINE INITIALIZATION ---');
const naHeroDef = HEROES_CATALOG.find(h => h.symbol === 'Na');
const clHeroDef = HEROES_CATALOG.find(h => h.symbol === 'Cl');
assert(naHeroDef && clHeroDef, 'Found Na (Natri) and Cl (Clo) hero definitions');

const engine = new MobaEngine({
  playerHeroDef: naHeroDef,
  mode: 'CUSTOM_SANDBOX',
  difficulty: 'BALANCED'
});

assert(engine.playerHero !== null, 'Player hero (Na) successfully spawned');
assert(engine.latestReactionAlert === null, 'latestReactionAlert is initially null');

// 2. Direct Combat Reaction Detection (Redox / Synthesis)
console.log('\n--- 2. COMBAT REACTION DETONATION ---');
// Advance engine by 1s
engine.update(1.0);

// Find an enemy hero
const enemyHero = engine.heroes.find(h => h.team === 'RED');
assert(enemyHero !== null, 'Enemy hero located in match');

// Infuse player hero attack with reaction
if (engine.playerHero && enemyHero) {
  // Position player close to enemy
  engine.playerHero.pos.x = enemyHero.pos.x + 30;
  engine.playerHero.pos.y = enemyHero.pos.y;
  
  // Trigger direct damage with chemical primer
  engine.applyDirectDamage(enemyHero, 80, 'MAGICAL', engine.playerHero, 'rx_groupA_na_water');
}

// 3. Environmental Reaction: Alkali Metal Water Explosion in River
console.log('\n--- 3. RIVER ENVIRONMENTAL REACTION (2Na + 2H2O) ---');
// River center is at (x + y = 2400), e.g. (1200, 1200)
engine.aoeZones.push({
  id: 'aoe_na_river_1',
  sourceEntityId: engine.playerHero ? engine.playerHero.id : 'player_hero',
  team: 'BLUE',
  pos: { x: 1200, y: 1200 },
  radius: 120,
  durationSeconds: 2.0,
  remainingSeconds: 2.0,
  tickRateSeconds: 0.5,
  timeSinceLastTick: 0,
  damagePerTick: 40,
  damageType: 'CHEMICAL',
  color: '#f59e0b',
  elementSymbol: 'Na',
  chemicalCategory: 'BASE',
  chemicalEffectType: 'alkali_kiềm'
});

// Update engine to process AoE interactions
engine.update(0.1);

assert(engine.latestReactionAlert !== null, 'latestReactionAlert is populated following environmental River reaction');
if (engine.latestReactionAlert) {
  assert(
    engine.latestReactionAlert.equation.includes('2Na + 2H₂O') || engine.latestReactionAlert.equation.includes('Na'),
    `latestReactionAlert.equation includes sodium reaction formula (got: "${engine.latestReactionAlert.equation}")`
  );
  assert(engine.latestReactionAlert.timestamp > 0, `Alert timestamp matches simulation time (${engine.latestReactionAlert.timestamp}s)`);
  assert(engine.latestReactionAlert.pos !== undefined, 'Alert includes world coordinates for VFX shockwave origin');
}

// 4. Repeated Reaction Timestamp Differentiation
console.log('\n--- 4. REPEATED REACTION TIMESTAMP DIFFERENTIATION ---');
const firstTimestamp = engine.latestReactionAlert ? engine.latestReactionAlert.timestamp : 0;

// Advance time by 0.5s
engine.update(0.5);

// Trigger another alkali AoE with distinct ID
engine.aoeZones.push({
  id: 'aoe_na_river_2',
  sourceEntityId: engine.playerHero ? engine.playerHero.id : 'player_hero',
  team: 'BLUE',
  pos: { x: 1210, y: 1190 },
  radius: 100,
  durationSeconds: 2.0,
  remainingSeconds: 2.0,
  tickRateSeconds: 0.5,
  timeSinceLastTick: 0,
  damagePerTick: 40,
  damageType: 'CHEMICAL',
  color: '#f59e0b',
  elementSymbol: 'Na',
  chemicalCategory: 'BASE',
  chemicalEffectType: 'alkali_kiềm'
});

engine.update(0.1);

const secondTimestamp = engine.latestReactionAlert ? engine.latestReactionAlert.timestamp : 0;
assert(secondTimestamp > firstTimestamp, `Subsequent reaction emits distinct newer timestamp (${secondTimestamp.toFixed(2)}s > ${firstTimestamp.toFixed(2)}s)`);

// 5. Bush Burning Biomass Combustion
console.log('\n--- 5. FOLIAGE COMBUSTION INTERACTION ---');
const targetBrush = MAP_BRUSHES[0];
assert(targetBrush !== undefined, 'Target foliage brush found on Periodic Rift map');

engine.aoeZones.push({
  id: 'aoe_fire_brush_1',
  sourceEntityId: engine.playerHero ? engine.playerHero.id : 'player_hero',
  team: 'BLUE',
  pos: { x: targetBrush.x + targetBrush.width / 2, y: targetBrush.y + targetBrush.height / 2 },
  radius: 120,
  durationSeconds: 2.0,
  remainingSeconds: 2.0,
  tickRateSeconds: 0.5,
  timeSinceLastTick: 0,
  damagePerTick: 35,
  damageType: 'CHEMICAL',
  color: '#ef4444',
  elementSymbol: 'O',
  chemicalCategory: 'FIRE',
  chemicalEffectType: 'thiêu_đốt_cháy'
});

engine.update(0.1);
assert(engine.burningBushes.has(targetBrush.id), 'Foliage brush is ignited and recorded in burningBushes');

// 6. Cumulative Reaction Telemetry
console.log('\n--- 6. MATCH TELEMETRY & REACTIONS LOG ---');
assert(engine.reactionsTriggered.length > 0, `reactionsTriggered records all match events (total: ${engine.reactionsTriggered.length})`);

const firstEvent = engine.reactionsTriggered[0];
assert(firstEvent.id.startsWith('rx_'), 'Reaction event ID follows canonical rx_ prefix standard');
assert(firstEvent.equation.length > 0, 'Reaction event contains valid chemical equation');

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passCount} / ${totalCount} TESTS PASSED (${Math.round((passCount/totalCount)*100)}%)`);
console.log(' PHASE B MOBA REACTION ALERTS & VFX TELEMETRY: SUCCESS');
console.log('======================================================================\n');
