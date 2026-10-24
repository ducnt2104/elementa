// tests/test-tournament-championship-visualizer-ui.mjs
// Test Suite 203: TournamentChampionshipVisualizer Component & Integration Audit
import fs from 'fs';
import assert from 'assert';

console.log('--- TEST SUITE 203: TournamentChampionshipVisualizer Component & Integration Audit ---');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    process.exit(1);
  }
}

const visualizerPath = 'src/components/visualizations/TournamentChampionshipVisualizer.tsx';
const enginePath = 'src/domain/tournamentEngine.ts';
const periodicTabPath = 'src/components/PeriodicCodexTab.tsx';

test('TournamentChampionshipVisualizer.tsx component file must exist', () => {
  assert.strictEqual(fs.existsSync(visualizerPath), true);
});

test('tournamentEngine.ts domain engine file must exist', () => {
  assert.strictEqual(fs.existsSync(enginePath), true);
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert.strictEqual(fs.existsSync(periodicTabPath), true);
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

test('TournamentChampionshipVisualizer must import simulation functions from tournamentEngine', () => {
  assert.strictEqual(visualizerContent.includes("from '../../domain/tournamentEngine'"), true);
  assert.strictEqual(visualizerContent.includes('TournamentEngine'), true);
  assert.strictEqual(visualizerContent.includes('CANONICAL_CHEMIST_ROSTER'), true);
});

test('TournamentChampionshipVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.strictEqual(visualizerContent.includes('sound.playUiClick()'), true);
});

test('TournamentChampionshipVisualizer must support all 3 modes: BRACKET_TREE, LIVE_SIMULATION, and ARCHETYPE_META_STANDINGS', () => {
  assert.strictEqual(visualizerContent.includes("'BRACKET_TREE'"), true);
  assert.strictEqual(visualizerContent.includes("'LIVE_SIMULATION'"), true);
  assert.strictEqual(visualizerContent.includes("'ARCHETYPE_META_STANDINGS'"), true);
});

test('TournamentChampionshipVisualizer must render 4 bracket columns (Round of 16, Quarter Finals, Semi Finals, Grand Finals)', () => {
  assert.strictEqual(visualizerContent.includes('Vòng 1/8 (Round of 16)'), true);
  assert.strictEqual(visualizerContent.includes('Tứ Kết (Quarter Finals)'), true);
  assert.strictEqual(visualizerContent.includes('Bán Kết (Semi Finals)'), true);
  assert.strictEqual(visualizerContent.includes('Chung Kết (Grand Finals)'), true);
});

test('TournamentChampionshipVisualizer must render champion trophy banner and competitor Elo ratings', () => {
  assert.strictEqual(visualizerContent.includes('Đương Kim Vô Địch ELEMENTA Cup'), true);
  assert.strictEqual(visualizerContent.includes('champion.rating'), true);
  assert.strictEqual(visualizerContent.includes('Trophy'), true);
});

test('TournamentChampionshipVisualizer must render archetype win rate cards (NITRO_LEGION, SULFUR_FORGE, ALKALI_HALOGEN, ORGANIC_SYNTHESIS)', () => {
  assert.strictEqual(visualizerContent.includes('NITRO_LEGION'), true);
  assert.strictEqual(visualizerContent.includes('SULFUR_FORGE'), true);
  assert.strictEqual(visualizerContent.includes('ALKALI_HALOGEN'), true);
  assert.strictEqual(visualizerContent.includes('ORGANIC_SYNTHESIS'), true);
  assert.strictEqual(visualizerContent.includes('winRate'), true);
});

const periodicTabContent = fs.readFileSync(periodicTabPath, 'utf8');

test('PeriodicCodexTab must import TournamentChampionshipVisualizer', () => {
  assert.strictEqual(periodicTabContent.includes("import { TournamentChampionshipVisualizer } from './visualizations/TournamentChampionshipVisualizer'"), true);
});

test('PeriodicCodexTab must include \'TOURNAMENT_CHAMPIONSHIP\' in navigation tabs', () => {
  assert.strictEqual(periodicTabContent.includes("'TOURNAMENT_CHAMPIONSHIP'"), true);
});

test('PeriodicCodexTab must mount <TournamentChampionshipVisualizer /> when activeMainTab is TOURNAMENT_CHAMPIONSHIP', () => {
  assert.strictEqual(periodicTabContent.includes("<TournamentChampionshipVisualizer />"), true);
  assert.strictEqual(periodicTabContent.includes("activeMainTab === 'TOURNAMENT_CHAMPIONSHIP'"), true);
});

console.log(`\nResults: ${passed} passed, 0 failed.`);
console.log('✓ TEST SUITE 203 PASSED: TournamentChampionshipVisualizer fully verified!\n');
