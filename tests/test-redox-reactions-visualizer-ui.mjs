// tests/test-redox-reactions-visualizer-ui.mjs
// Test Suite 197: RedoxReactionsVisualizer Component & Integration Audit
import fs from 'fs';
import assert from 'assert';

console.log('--- TEST SUITE 197: RedoxReactionsVisualizer Component & Integration Audit ---');

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

const visualizerPath = 'src/components/visualizations/RedoxReactionsVisualizer.tsx';
const enginePath = 'src/domain/redoxReactionsEngine.ts';
const periodicTabPath = 'src/components/PeriodicCodexTab.tsx';

test('RedoxReactionsVisualizer.tsx component file must exist', () => {
  assert.strictEqual(fs.existsSync(visualizerPath), true);
});

test('redoxReactionsEngine.ts domain engine file must exist', () => {
  assert.strictEqual(fs.existsSync(enginePath), true);
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert.strictEqual(fs.existsSync(periodicTabPath), true);
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

test('RedoxReactionsVisualizer must import simulation functions from redoxReactionsEngine', () => {
  assert.strictEqual(visualizerContent.includes("from '../../domain/redoxReactionsEngine'"), true);
  assert.strictEqual(visualizerContent.includes('OXIDATION_STATE_CATALOG'), true);
  assert.strictEqual(visualizerContent.includes('REDOX_PRESETS'), true);
  assert.strictEqual(visualizerContent.includes('PERMANGANATE_MEDIA'), true);
  assert.strictEqual(visualizerContent.includes('simulatePermanganateTitration'), true);
  assert.strictEqual(visualizerContent.includes('verifyElectronBalance'), true);
});

test('RedoxReactionsVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.strictEqual(visualizerContent.includes('sound.playUiClick()'), true);
});

test('RedoxReactionsVisualizer must support all 3 modes: OXIDATION_STATES, ELECTRON_BALANCE, and PERMANGANATE_MEDIA_TITRATION', () => {
  assert.strictEqual(visualizerContent.includes("'OXIDATION_STATES'"), true);
  assert.strictEqual(visualizerContent.includes("'ELECTRON_BALANCE'"), true);
  assert.strictEqual(visualizerContent.includes("'PERMANGANATE_MEDIA_TITRATION'"), true);
});

test('RedoxReactionsVisualizer must render chemical formula with overset oxidation states', () => {
  assert.strictEqual(visualizerContent.includes('el.oxidationState > 0 ? `+${el.oxidationState}` : el.oxidationState'), true);
  assert.strictEqual(visualizerContent.includes('el.symbol'), true);
});

test('RedoxReactionsVisualizer must render half reactions with oxidation/reduction electron multipliers', () => {
  assert.strictEqual(visualizerContent.includes('selectedPreset.oxidationHalf.equationVi'), true);
  assert.strictEqual(visualizerContent.includes('selectedPreset.reductionHalf.equationVi'), true);
  assert.strictEqual(visualizerContent.includes('selectedPreset.electronMultiplierOx'), true);
  assert.strictEqual(visualizerContent.includes('selectedPreset.electronMultiplierRed'), true);
});

test('RedoxReactionsVisualizer must render Permanganate medium beaker SVG and titration Erlenmeyer flask SVG', () => {
  assert.strictEqual(visualizerContent.includes('selectedMediumData.colorAfter'), true);
  assert.strictEqual(visualizerContent.includes('titrationState.solutionColor'), true);
  assert.strictEqual(visualizerContent.includes('titrationState.statusVi'), true);
});

const periodicTabContent = fs.readFileSync(periodicTabPath, 'utf8');

test('PeriodicCodexTab must import RedoxReactionsVisualizer', () => {
  assert.strictEqual(periodicTabContent.includes("import { RedoxReactionsVisualizer } from './visualizations/RedoxReactionsVisualizer'"), true);
});

test('PeriodicCodexTab must include \'REDOX_REACTIONS\' in navigation tabs', () => {
  assert.strictEqual(periodicTabContent.includes("'REDOX_REACTIONS'"), true);
});

test('PeriodicCodexTab must mount <RedoxReactionsVisualizer /> when activeMainTab is REDOX_REACTIONS', () => {
  assert.strictEqual(periodicTabContent.includes("<RedoxReactionsVisualizer />"), true);
  assert.strictEqual(periodicTabContent.includes("activeMainTab === 'REDOX_REACTIONS'"), true);
});

console.log(`\nResults: ${passed} passed, 0 failed.`);
console.log('✓ TEST SUITE 197 PASSED: RedoxReactionsVisualizer fully verified!\n');
