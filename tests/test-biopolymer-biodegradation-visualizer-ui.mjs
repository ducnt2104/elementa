// tests/test-biopolymer-biodegradation-visualizer-ui.mjs
// Test Suite 215: BiopolymerBiodegradationVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & ISO 14855 Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 215: BiopolymerBiodegradationVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/BiopolymerBiodegradationVisualizer.tsx');
const enginePath = path.resolve('src/domain/biopolymerBiodegradationEngine.ts');
const periodicCodexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

let passedCount = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    process.exit(1);
  }
}

// 1. Files existence
test('BiopolymerBiodegradationVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('biopolymerBiodegradationEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('BiopolymerBiodegradationVisualizer must import simulation functions from biopolymerBiodegradationEngine', () => {
  assert(visualizerContent.includes('BIOPOLYMERS_CATALOG'), 'Must import BIOPOLYMERS_CATALOG');
  assert(visualizerContent.includes('DEGRADATION_ENVIRONMENTS'), 'Must import DEGRADATION_ENVIRONMENTS');
  assert(visualizerContent.includes('simulateBiodegradation'), 'Must import simulateBiodegradation');
  assert(visualizerContent.includes('ESTERASE_CATALYTIC_MECHANISM_STEPS'), 'Must import ESTERASE_CATALYTIC_MECHANISM_STEPS');
  assert(visualizerContent.includes('getBiopolymerRadarMetrics'), 'Must import getBiopolymerRadarMetrics');
});

test('BiopolymerBiodegradationVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('BiopolymerBiodegradationVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'KINETIC_SIMULATOR'"), 'Must support KINETIC_SIMULATOR');
  assert(visualizerContent.includes("'CATALYTIC_MECHANISM'"), 'Must support CATALYTIC_MECHANISM');
  assert(visualizerContent.includes("'CIRCULAR_ECONOMY_RADAR'"), 'Must support CIRCULAR_ECONOMY_RADAR');
});

// 4. SVG Visualizations
test('BiopolymerBiodegradationVisualizer must include dynamic SVG sample erosion chamber', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 500 200"'), 'Must contain 500x200 sample chamber SVG');
  assert(visualizerContent.includes('currentSnapshot.remainingMassPercent'), 'Must scale coupon with remaining mass');
  assert(visualizerContent.includes('microplasticFragmentCount'), 'Must display microplastic fragment count');
});

test('BiopolymerBiodegradationVisualizer must include Catalytic Triad Ser-His-Asp active site schematic', () => {
  assert(visualizerContent.includes('Asp187'), 'Must show Aspartate residue');
  assert(visualizerContent.includes('His224'), 'Must show Histidine residue');
  assert(visualizerContent.includes('Ser105'), 'Must show Serine residue');
});

// 5. Integration into PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import BiopolymerBiodegradationVisualizer', () => {
  assert(periodicCodexContent.includes("import { BiopolymerBiodegradationVisualizer } from './visualizations/BiopolymerBiodegradationVisualizer';"), 'Import missing');
});

test('PeriodicCodexTab must include BIOPOLYMERS_BIODEGRADATION in activeMainTab type union', () => {
  assert(periodicCodexContent.includes("'BIOPOLYMERS_BIODEGRADATION'"), 'Tab type missing');
});

test('PeriodicCodexTab must render BiopolymerBiodegradationVisualizer when activeMainTab is BIOPOLYMERS_BIODEGRADATION', () => {
  assert(periodicCodexContent.includes("<BiopolymerBiodegradationVisualizer />"), 'Component JSX call missing');
});

test('PeriodicCodexTab must contain the navigation button for Biopolymer & Phân Hủy Sinh Học', () => {
  assert(periodicCodexContent.includes('Biopolymer & Phân Hủy Sinh Học'), 'Navigation label missing');
  assert(periodicCodexContent.includes("setActiveMainTab('BIOPOLYMERS_BIODEGRADATION')"), 'Click handler missing');
});

console.log(`\n======================================================================`);
console.log(`   TEST SUITE 215: ALL ${passedCount}/12 TESTS PASSED PERFECTLY       `);
console.log(`======================================================================\n`);
