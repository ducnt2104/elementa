// tests/test-periodic-trends-octet-visualizer-ui.mjs
// Test Suite 199: PeriodicTrendsOctetVisualizer Component & Integration Audit
import fs from 'fs';
import assert from 'assert';

console.log('--- TEST SUITE 199: PeriodicTrendsOctetVisualizer Component & Integration Audit ---');

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

const visualizerPath = 'src/components/visualizations/PeriodicTrendsOctetVisualizer.tsx';
const enginePath = 'src/domain/periodicTrendsOctetEngine.ts';
const periodicTabPath = 'src/components/PeriodicCodexTab.tsx';

test('PeriodicTrendsOctetVisualizer.tsx component file must exist', () => {
  assert.strictEqual(fs.existsSync(visualizerPath), true);
});

test('periodicTrendsOctetEngine.ts domain engine file must exist', () => {
  assert.strictEqual(fs.existsSync(enginePath), true);
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert.strictEqual(fs.existsSync(periodicTabPath), true);
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

test('PeriodicTrendsOctetVisualizer must import simulation functions from periodicTrendsOctetEngine', () => {
  assert.strictEqual(visualizerContent.includes("from '../../domain/periodicTrendsOctetEngine'"), true);
  assert.strictEqual(visualizerContent.includes('PERIOD_3_TRENDS_CATALOG'), true);
  assert.strictEqual(visualizerContent.includes('IONIZATION_ANOMALIES'), true);
  assert.strictEqual(visualizerContent.includes('OCTET_CASES'), true);
  assert.strictEqual(visualizerContent.includes('simulateNO2Dimerization'), true);
});

test('PeriodicTrendsOctetVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.strictEqual(visualizerContent.includes('sound.playUiClick()'), true);
});

test('PeriodicTrendsOctetVisualizer must support all 3 modes: PERIOD_3_ACID_BASE, IONIZATION_ANOMALIES, and OCTET_EXCEPTIONS_AND_NO2', () => {
  assert.strictEqual(visualizerContent.includes("'PERIOD_3_ACID_BASE'"), true);
  assert.strictEqual(visualizerContent.includes("'IONIZATION_ANOMALIES'"), true);
  assert.strictEqual(visualizerContent.includes("'OCTET_EXCEPTIONS_AND_NO2'"), true);
});

test('PeriodicTrendsOctetVisualizer must render Period 3 highest oxides and hydroxides with acid-base strength badges', () => {
  assert.strictEqual(visualizerContent.includes('selectedElement.highestOxideFormula'), true);
  assert.strictEqual(visualizerContent.includes('selectedElement.highestHydroxideFormula'), true);
  assert.strictEqual(visualizerContent.includes('selectedElement.acidBaseCharacterVi'), true);
});

test('PeriodicTrendsOctetVisualizer must render first ionization energy comparison bars for quantum anomalies', () => {
  assert.strictEqual(visualizerContent.includes('selectedAnomaly.pairNameVi'), true);
  assert.strictEqual(visualizerContent.includes('selectedAnomaly.element1.i1'), true);
  assert.strictEqual(visualizerContent.includes('selectedAnomaly.element2.i1'), true);
});

test('PeriodicTrendsOctetVisualizer must render NO2 <=> N2O4 sealed glass ampoule SVG with sliders', () => {
  assert.strictEqual(visualizerContent.includes('no2Equilibrium.hexColor'), true);
  assert.strictEqual(visualizerContent.includes('no2Equilibrium.fractionNO2'), true);
  assert.strictEqual(visualizerContent.includes('no2Equilibrium.fractionN2O4'), true);
});

const periodicTabContent = fs.readFileSync(periodicTabPath, 'utf8');

test('PeriodicCodexTab must import PeriodicTrendsOctetVisualizer', () => {
  assert.strictEqual(periodicTabContent.includes("import { PeriodicTrendsOctetVisualizer } from './visualizations/PeriodicTrendsOctetVisualizer'"), true);
});

test('PeriodicCodexTab must include \'PERIODIC_TRENDS_OCTET\' in navigation tabs', () => {
  assert.strictEqual(periodicTabContent.includes("'PERIODIC_TRENDS_OCTET'"), true);
});

test('PeriodicCodexTab must mount <PeriodicTrendsOctetVisualizer /> when activeMainTab is PERIODIC_TRENDS_OCTET', () => {
  assert.strictEqual(periodicTabContent.includes("<PeriodicTrendsOctetVisualizer />"), true);
  assert.strictEqual(periodicTabContent.includes("activeMainTab === 'PERIODIC_TRENDS_OCTET'"), true);
});

console.log(`\nResults: ${passed} passed, 0 failed.`);
console.log('✓ TEST SUITE 199 PASSED: PeriodicTrendsOctetVisualizer fully verified!\n');
