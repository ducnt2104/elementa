// tests/test-salt-hydrolysis-visualizer-ui.mjs
// Test Suite 205: SaltHydrolysisVisualizer Component & Integration Audit
import fs from 'fs';
import assert from 'assert';

console.log('--- TEST SUITE 205: SaltHydrolysisVisualizer Component & Integration Audit ---');

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

const visualizerPath = 'src/components/visualizations/SaltHydrolysisVisualizer.tsx';
const enginePath = 'src/domain/saltHydrolysisEngine.ts';
const periodicTabPath = 'src/components/PeriodicCodexTab.tsx';

test('SaltHydrolysisVisualizer.tsx component file must exist', () => {
  assert.strictEqual(fs.existsSync(visualizerPath), true);
});

test('saltHydrolysisEngine.ts domain engine file must exist', () => {
  assert.strictEqual(fs.existsSync(enginePath), true);
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert.strictEqual(fs.existsSync(periodicTabPath), true);
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

test('SaltHydrolysisVisualizer must import simulation functions from saltHydrolysisEngine', () => {
  assert.strictEqual(visualizerContent.includes("from '../../domain/saltHydrolysisEngine'"), true);
  assert.strictEqual(visualizerContent.includes('SALT_HYDROLYSIS_CATALOG'), true);
  assert.strictEqual(visualizerContent.includes('simulateAlumClarification'), true);
});

test('SaltHydrolysisVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.strictEqual(visualizerContent.includes('sound.playUiClick()'), true);
});

test('SaltHydrolysisVisualizer must support all 3 modes: SALT_CATALOG_PH, INDICATOR_LAB, and ALUM_WATER_CLARIFICATION', () => {
  assert.strictEqual(visualizerContent.includes("'SALT_CATALOG_PH'"), true);
  assert.strictEqual(visualizerContent.includes("'INDICATOR_LAB'"), true);
  assert.strictEqual(visualizerContent.includes("'ALUM_WATER_CLARIFICATION'"), true);
});

test('SaltHydrolysisVisualizer must render nominal pH values and acid-base classifications', () => {
  assert.strictEqual(visualizerContent.includes('selectedSalt.nominalPh01M.toFixed(2)'), true);
  assert.strictEqual(visualizerContent.includes('pH Dung Dịch'), true);
  assert.strictEqual(visualizerContent.includes('selectedSalt.hydrolysisEquationVi'), true);
});

test('SaltHydrolysisVisualizer must render 3 indicator test tubes (Litmus, Phenolphthalein, Methyl Orange)', () => {
  assert.strictEqual(visualizerContent.includes('1. Quỳ Tím (Litmus)'), true);
  assert.strictEqual(visualizerContent.includes('2. Phenolphthalein'), true);
  assert.strictEqual(visualizerContent.includes('3. Methyl Da Cam'), true);
});

test('SaltHydrolysisVisualizer must render alum clarification glass cylinder SVG with turbidity sliders', () => {
  assert.strictEqual(visualizerContent.includes('alumSimulation.waterHexColor'), true);
  assert.strictEqual(visualizerContent.includes('alumSimulation.finalTurbidityNtu'), true);
  assert.strictEqual(visualizerContent.includes('alumSimulation.sedimentRemovedPercent'), true);
});

const periodicTabContent = fs.readFileSync(periodicTabPath, 'utf8');

test('PeriodicCodexTab must import SaltHydrolysisVisualizer', () => {
  assert.strictEqual(periodicTabContent.includes("import { SaltHydrolysisVisualizer } from './visualizations/SaltHydrolysisVisualizer'"), true);
});

test('PeriodicCodexTab must include \'SALT_HYDROLYSIS\' in navigation tabs', () => {
  assert.strictEqual(periodicTabContent.includes("'SALT_HYDROLYSIS'"), true);
});

test('PeriodicCodexTab must mount <SaltHydrolysisVisualizer /> when activeMainTab is SALT_HYDROLYSIS', () => {
  assert.strictEqual(periodicTabContent.includes("<SaltHydrolysisVisualizer />"), true);
  assert.strictEqual(periodicTabContent.includes("activeMainTab === 'SALT_HYDROLYSIS'"), true);
});

console.log(`\nResults: ${passed} passed, 0 failed.`);
console.log('✓ TEST SUITE 205 PASSED: SaltHydrolysisVisualizer fully verified!\n');
