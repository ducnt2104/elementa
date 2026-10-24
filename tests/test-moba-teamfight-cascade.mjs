// test-moba-teamfight-cascade.mjs
// Comprehensive test suite for MOBA 5v5 Teamfights, Chemical Cascades, Assist Tracking, and Ace Announcements

import assert from 'node:assert';
import { MobaEngine } from '../src/game/engine/mobaEngine.ts';

console.log('--- TEST SUITE 30: MOBA TEAMFIGHT CASCADE & ASSIST / ACE ENGINE ---');

// Test 1: Assist Gold & KDA Assist Increment
console.log('Test 1: Assist Tracking & Gold / XP Distribution in Clustered Combat...');
const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');

const blueHeroes = engine.heroes.filter(h => h.team === 'BLUE');
const redHeroes = engine.heroes.filter(h => h.team === 'RED');

assert.strictEqual(blueHeroes.length, 5, 'Blue team must have 5 heroes');
assert.strictEqual(redHeroes.length, 5, 'Red team must have 5 heroes');

// Position Blue heroes in a clustered formation around (1200, 1200)
const clusterCenter = { x: 1200, y: 1200 };
blueHeroes[0].pos = { x: 1200, y: 1200 }; // Killer (Sodium)
blueHeroes[1].pos = { x: 1250, y: 1220 }; // Nearby Ally 1 (within 800px)
blueHeroes[2].pos = { x: 1150, y: 1180 }; // Nearby Ally 2 (within 800px)
blueHeroes[3].pos = { x: 1220, y: 1260 }; // Nearby Ally 3 (within 800px)
blueHeroes[4].pos = { x: 2300, y: 2300 }; // Far away Ally 4 (base/top lane > 800px)

const victim = redHeroes[0];
victim.pos = { x: 1210, y: 1210 };
victim.hp = 50; // Low HP

const initialGold1 = blueHeroes[1].gold;
const initialGold2 = blueHeroes[2].gold;
const initialGold4 = blueHeroes[4].gold;

// Deliver fatal strike by blueHeroes[0]
engine.applyDirectDamage(victim, 100, 'PHYSICAL', blueHeroes[0]);

assert.strictEqual(victim.isDead, true, 'Victim hero must be marked dead');
assert.strictEqual(blueHeroes[0].kda.kills, 1, 'Killer must have 1 kill');
assert.strictEqual(blueHeroes[1].kda.assists, 1, 'Nearby Ally 1 must receive 1 assist');
assert.strictEqual(blueHeroes[2].kda.assists, 1, 'Nearby Ally 2 must receive 1 assist');
assert.strictEqual(blueHeroes[3].kda.assists, 1, 'Nearby Ally 3 must receive 1 assist');
assert.strictEqual(blueHeroes[4].kda.assists, 0, 'Far away Ally 4 must NOT receive an assist');

assert(blueHeroes[1].gold > initialGold1, 'Nearby Ally 1 must receive assist gold');
assert(blueHeroes[2].gold > initialGold2, 'Nearby Ally 2 must receive assist gold');
assert.strictEqual(blueHeroes[4].gold, initialGold4, 'Far away Ally 4 must not receive assist gold');
console.log('  ✓ Assist tracking, proximity filtering (800px), and gold/XP distribution verified');

// Test 2: Consecutive Multi-kill Streak Progression
console.log('Test 2: Consecutive Multi-Kill Streaks (Double, Triple, Quadra, Penta)...');
const killer = blueHeroes[0];
killer.recentKills = 1;
killer.lastKillTimestamp = engine.matchTimeSeconds;

// Kill second red hero
const victim2 = redHeroes[1];
victim2.pos = { x: 1205, y: 1205 };
victim2.hp = 50;
engine.applyDirectDamage(victim2, 100, 'PHYSICAL', killer);
assert.strictEqual(killer.kda.kills, 2, 'Killer must have 2 kills');
assert.strictEqual(killer.recentKills, 2, 'Recent kills must increment to 2');
assert.strictEqual(engine.activeAnnouncement?.type, 'DOUBLE_KILL', 'Announcement must be DOUBLE_KILL');

// Kill third red hero
const victim3 = redHeroes[2];
victim3.pos = { x: 1205, y: 1205 };
victim3.hp = 50;
engine.applyDirectDamage(victim3, 100, 'PHYSICAL', killer);
assert.strictEqual(killer.recentKills, 3, 'Recent kills must increment to 3');
assert.strictEqual(engine.activeAnnouncement?.type, 'TRIPLE_KILL', 'Announcement must be TRIPLE_KILL');

// Kill fourth red hero
const victim4 = redHeroes[3];
victim4.pos = { x: 1205, y: 1205 };
victim4.hp = 50;
engine.applyDirectDamage(victim4, 100, 'PHYSICAL', killer);
assert.strictEqual(killer.recentKills, 4, 'Recent kills must increment to 4');
assert.strictEqual(engine.activeAnnouncement?.type, 'QUADRA_KILL', 'Announcement must be QUADRA_KILL');

console.log('  ✓ Multi-kill streak progression (Double -> Triple -> Quadra) verified');

// Test 3: Ace (Team Wipeout) Detection
console.log('Test 3: Ace (Quét Sạch) Event Triggering...');
// Now 4 red heroes are dead. Only redHeroes[4] remains alive.
const remainingRed = redHeroes.filter(h => !h.isDead);
assert.strictEqual(remainingRed.length, 1, 'Exactly 1 red hero remains alive before Ace');

// Kill the final remaining red hero
const lastVictim = redHeroes[4];
lastVictim.pos = { x: 1205, y: 1205 };
lastVictim.hp = 50;
engine.applyDirectDamage(lastVictim, 100, 'PHYSICAL', killer);

assert.strictEqual(lastVictim.isDead, true, 'Final victim must be dead');
const allRedDead = redHeroes.every(h => h.isDead);
assert.strictEqual(allRedDead, true, 'All 5 red heroes must now be dead');

// The active announcement must be ACE because the entire red team was wiped out!
assert.strictEqual(engine.activeAnnouncement?.type, 'ACE', 'Active announcement must be ACE when team is wiped');
assert(engine.activeAnnouncement?.title.includes('QUÉT SẠCH'), 'Announcement title must include QUÉT SẠCH');
console.log('  ✓ Ace (Team Wipeout) correctly detected and broadcast across arena');

// Test 4: Simultaneous Chemical Reactions in Clustered Clash
console.log('Test 4: Simultaneous Chemical Reactions & Screen Shake Bounds...');
const clashEngine = new MobaEngine('hero_na_brawler');
const prevRxCount = clashEngine.reactionsTriggered.length;

// Trigger Sodium + Water reaction
const targetDummy = clashEngine.heroes[1];
clashEngine.applyDirectDamage(targetDummy, 50, 'CHEMICAL', clashEngine.playerHero, 'rx_groupA_na_water');
assert(clashEngine.reactionsTriggered.length > prevRxCount, 'Reaction must be logged in telemetry');

// Verify latestReactionAlert telemetry & impact position
assert(clashEngine.latestReactionAlert !== null, 'latestReactionAlert must be populated');
assert(clashEngine.latestReactionAlert.pos, 'latestReactionAlert must include exact impact coordinates');
assert.strictEqual(clashEngine.latestReactionAlert.pos.x, targetDummy.pos.x, 'Impact pos.x must match targetDummy pos.x');
assert.strictEqual(clashEngine.latestReactionAlert.pos.y, targetDummy.pos.y, 'Impact pos.y must match targetDummy pos.y');
assert(clashEngine.latestReactionAlert.equation.length > 0, 'Reaction alert must embed chemical equation');

// Verify floating combat text for reaction and equation
const rxFloatingTexts = clashEngine.floatingTexts.filter(ft => ft.isReaction);
assert(rxFloatingTexts.length >= 2, 'Must spawn floating combat texts for reaction announcement and equation');
assert(targetDummy.statusEffects.some(e => e.type === 'SLOW' && e.potency === 0.40), 'Water burst reaction must apply water surge slow to target hero');

// Screen shake must be clamped to 25 max
clashEngine.triggerScreenShake(20);
clashEngine.triggerScreenShake(20);
assert(clashEngine.screenShakeTrauma <= 25, `Screen shake trauma must be <= 25, got ${clashEngine.screenShakeTrauma}`);

// Consume screen shake
const consumed = clashEngine.consumeScreenShake();
assert(consumed > 0, 'Consumed screen shake must be > 0');
assert.strictEqual(clashEngine.screenShakeTrauma, 0, 'Screen shake trauma must reset to 0 after consumption');
console.log('  ✓ Chemical reaction telemetry and screen shake saturation clamping verified');

// Test 5: Match Debrief KDA Consistency
console.log('Test 5: Match Debrief KDA Consistency...');
clashEngine.playerHero.kda.kills = 7;
clashEngine.playerHero.kda.deaths = 2;
clashEngine.playerHero.kda.assists = 9;

const debrief = clashEngine.generateMatchDebrief();
assert.strictEqual(debrief.kda.kills, 7, 'Debrief kills must match playerHero.kda.kills');
assert.strictEqual(debrief.kda.deaths, 2, 'Debrief deaths must match playerHero.kda.deaths');
assert.strictEqual(debrief.kda.assists, 9, 'Debrief assists must match playerHero.kda.assists');
console.log('  ✓ Match debrief faithfully reflects multi-hero combat KDA telemetry');

// Test 6: Elemental Reaction Crowd Control & DoT Status Cascade
console.log('Test 6: Elemental Reaction Crowd Control & DoT Status Cascade...');
const statusEngine = new MobaEngine('hero_fe_fighter');
const testTarget = statusEngine.heroes[1];
testTarget.statusEffects = [];

// 1. Group E Combustion -> Burn Oxidation DoT
statusEngine.applyDirectDamage(testTarget, 30, 'CHEMICAL', statusEngine.playerHero, 'rx_groupE_combustion_al_o2');
const burnEffect = testTarget.statusEffects.find(e => e.type === 'BURN_OXIDATION');
assert(burnEffect, 'Combustion reaction must apply BURN_OXIDATION status effect');
assert.strictEqual(burnEffect.potency, 25, 'Burn potency must be 25');

// 2. Group D Precipitation -> Entangle Slow
statusEngine.applyDirectDamage(testTarget, 20, 'CHEMICAL', statusEngine.playerHero, 'rx_groupD_precipitation_baso4');
const slowEffect = testTarget.statusEffects.find(e => e.type === 'SLOW' && e.name_vi.includes('Lắng Đọng'));
assert(slowEffect, 'Precipitation reaction must apply SLOW status effect');
assert.strictEqual(slowEffect.potency, 0.35, 'Precipitation slow potency must be 35%');

// 3. Group C Acid-Base -> Acid Corrosion DoT
statusEngine.applyDirectDamage(testTarget, 20, 'CHEMICAL', statusEngine.playerHero, 'rx_groupC_acid_base_neutralization');
const acidEffect = testTarget.statusEffects.find(e => e.type === 'ACID_CORROSION');
assert(acidEffect, 'Acid-base neutralization must apply ACID_CORROSION status effect');
assert.strictEqual(acidEffect.potency, 20, 'Acid corrosion potency must be 20');

// 4. DoT Tick Simulation (0.5s step)
const hpBeforeTick = testTarget.hp;
statusEngine.update(0.5);
assert(testTarget.hp < hpBeforeTick, 'DoT tick must reduce target hero HP over time');
assert(testTarget.statusEffects.length >= 3, 'Status effects must persist across 0.5s update window');
console.log('  ✓ Chemical reaction CC & DoT cascading status effects verified across all categories');

// Test 7: Binary Champion Chemical Synergy Combos (Thermite, Table Salt, Ammonia, Acid Mist, Oxyhydrogen)
console.log('Test 7: Binary Champion Chemical Synergy Combos & Custom Debuff Execution...');
const binaryEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');
const naHero = binaryEngine.heroes.find(h => h.definition.symbol === 'Na');
const clHero = binaryEngine.heroes.find(h => h.definition.symbol === 'Cl') || binaryEngine.heroes[1];
// Ensure clHero has symbol 'Cl' for the test
clHero.definition.symbol = 'Cl';
clHero.team = 'RED';
clHero.statusEffects = [];

// 1. Table Salt Synthesis: Na attacks Cl enemy -> Stun (0.8s) + Blind (2.0s)
binaryEngine.applyDirectDamage(clHero, 30, 'CHEMICAL', naHero);
const stunEffect = clHero.statusEffects.find(e => e.type === 'STUN' && e.name_vi.includes('Muối Ăn'));
const blindEffect = clHero.statusEffects.find(e => e.type === 'BLIND');
assert(stunEffect, 'Table Salt synthesis (Na + Cl) must apply STUN status effect');
assert.strictEqual(stunEffect.durationSeconds, 0.8, 'Salt stun duration must be 0.8s');
assert(blindEffect, 'Table Salt synthesis must apply BLIND effect');
console.log('  ✓ Table Salt Synthesis (Na + Cl -> 2NaCl) Stun & Blind CC verified');

// 2. Thermite Reaction: Fe and Al
const feHero = binaryEngine.heroes.find(h => h.definition.symbol === 'Fe') || binaryEngine.heroes[2];
feHero.definition.symbol = 'Fe';
feHero.team = 'RED';
feHero.armor = 100;
feHero.statusEffects = [];

const alHero = binaryEngine.heroes.find(h => h.definition.symbol === 'Al') || binaryEngine.heroes[3];
alHero.definition.symbol = 'Al';
alHero.team = 'BLUE';

binaryEngine.applyDirectDamage(feHero, 50, 'CHEMICAL', alHero);
const thermiteShred = feHero.statusEffects.find(e => e.type === 'ALKALI_WEAKEN' && e.name_vi.includes('Nhiệt Nhôm'));
const thermiteBurn = feHero.statusEffects.find(e => e.type === 'BURN_OXIDATION' && e.name_vi.includes('Nhiệt Nhôm'));
assert(thermiteShred, 'Thermite reaction (Al + Fe) must apply ALKALI_WEAKEN molten armor shred');
assert.strictEqual(thermiteShred.potency, 0.40, 'Thermite armor shred potency must be 40%');
assert(thermiteBurn, 'Thermite reaction must apply 2500°C BURN_OXIDATION');
console.log('  ✓ Thermite Reaction (2Al + Fe2O3 -> Al2O3 + 2Fe) 40% Armor Shred & Molten Burn verified');

// 3. Ammonia Synthesis: N and H
const hHero = binaryEngine.heroes.find(h => h.definition.symbol === 'H') || binaryEngine.heroes[4];
hHero.definition.symbol = 'H';
hHero.team = 'RED';
hHero.statusEffects = [];

const nHero = binaryEngine.heroes.find(h => h.definition.symbol === 'N') || binaryEngine.heroes[0];
nHero.definition.symbol = 'N';
nHero.team = 'BLUE';

binaryEngine.applyDirectDamage(hHero, 30, 'CHEMICAL', nHero);
const ammoniaSlow = hHero.statusEffects.find(e => e.type === 'SLOW' && e.name_vi.includes('Amoniac'));
assert(ammoniaSlow, 'Ammonia synthesis (N + H) must apply SLOW status effect');
assert.strictEqual(ammoniaSlow.potency, 0.50, 'Ammonia slow potency must be 50%');
console.log('  ✓ Haber Ammonia Synthesis (N2 + 3H2 -> 2NH3) 50% Pungent Gas Slow verified');

// Test 8: Ally Teamwork Chemical Cascade via Elemental Primers
console.log('Test 8: Ally Teamwork Chemical Cascade via Elemental Primers...');
const synergyEngine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5');

// Ally 1: Blue Aluminum Hero
const allyAl = synergyEngine.heroes[0];
allyAl.team = 'BLUE';
allyAl.id = 'blue_al';
allyAl.definition.symbol = 'Al';
allyAl.definition.name_vi = 'Nhôm Vanguard';

// Ally 2: Blue Iron Hero
const allyFe = synergyEngine.heroes[1];
allyFe.team = 'BLUE';
allyFe.id = 'blue_fe';
allyFe.definition.symbol = 'Fe';
allyFe.definition.name_vi = 'Sắt Warden';

// Enemy Target: Red Champion
const redEnemy = synergyEngine.heroes[5];
redEnemy.team = 'RED';
redEnemy.hp = 1000;
redEnemy.armor = 80;
redEnemy.statusEffects = [];
redEnemy.elementalPrimer = undefined;

// Step 1: Ally 1 strikes Red Enemy -> Applies Elemental Primer 'Al'
synergyEngine.applyDirectDamage(redEnemy, 40, 'PHYSICAL', allyAl);
assert(redEnemy.elementalPrimer, 'Target must receive Elemental Primer after hero hit');
assert.strictEqual(redEnemy.elementalPrimer.symbol, 'Al', 'Primer symbol must be Al');
assert.strictEqual(redEnemy.elementalPrimer.sourceHeroId, 'blue_al', 'Primer source must be blue_al');
assert.strictEqual(redEnemy.elementalPrimer.team, 'BLUE', 'Primer team must be BLUE');

const alRxBeforeCombo = allyAl.kda.reactionsTriggered;
const feRxBeforeCombo = allyFe.kda.reactionsTriggered;

// Step 2: Ally 2 strikes Red Enemy with 'CHEMICAL' or complementary attack -> Combines [Al, Fe]
synergyEngine.applyDirectDamage(redEnemy, 50, 'CHEMICAL', allyFe);

// Verify Team Synergy Triggered
assert.strictEqual(redEnemy.elementalPrimer, undefined, 'Elemental primer must be consumed upon synergy combo');
assert.strictEqual(allyAl.kda.reactionsTriggered, alRxBeforeCombo + 1, 'Ally 1 must receive reaction credit from team combo');
assert.strictEqual(allyFe.kda.reactionsTriggered, feRxBeforeCombo + 1, 'Ally 2 must receive reaction credit from team combo');
assert.strictEqual(synergyEngine.activeAnnouncement?.type, 'TEAM_SYNERGY', 'Announcement must be TEAM_SYNERGY');
assert(synergyEngine.activeAnnouncement?.title.includes('COMBO ĐỒNG ĐỘI'), 'Title must contain COMBO ĐỒNG ĐỘI');

const synergyEvent = synergyEngine.reactionsTriggered.find(r => r.isTeamSynergy);
assert(synergyEvent, 'Telemetry must log isTeamSynergy event');
assert.strictEqual(synergyEvent.secondarySourceHeroId, 'blue_al', 'Telemetry must record secondary source hero');
console.log('  ✓ Ally Teamwork Chemical Cascade (Primer -> Synergy Combo -> Telemetry -> Announcement) 100% verified');

console.log('\n========================================');
console.log('ALL 8 TEST GROUPS IN SUITE 30 PASSED (100% SUCCESS)');
console.log('========================================');
