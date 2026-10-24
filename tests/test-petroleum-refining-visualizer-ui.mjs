// tests/test-petroleum-refining-visualizer-ui.mjs
// Test Suite 223: PetroleumRefiningVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & TCVN 7716 Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 223: PetroleumRefiningVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/PetroleumRefiningVisualizer.tsx');
const enginePath = path.resolve('src/domain/petroleumRefiningEngine.ts');
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
test('PetroleumRefiningVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('petroleumRefiningEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('PetroleumRefiningVisualizer must import simulation functions from engine', () => {
  assert(visualizerContent.includes('PETROLEUM_FRACTIONS_CATALOG'), 'Must import PETROLEUM_FRACTIONS_CATALOG');
  assert(visualizerContent.includes('VIETNAM_CRUDE_OILS'), 'Must import VIETNAM_CRUDE_OILS');
  assert(visualizerContent.includes('FCC_MECHANISM_STEPS'), 'Must import FCC_MECHANISM_STEPS');
  assert(visualizerContent.includes('calculateGasolineBlendOctane'), 'Must import calculateGasolineBlendOctane');
});

test('PetroleumRefiningVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('PetroleumRefiningVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'DISTILLATION_COLUMN'"), 'Must support DISTILLATION_COLUMN');
  assert(visualizerContent.includes("'CATALYTIC_CRACKING_FCC'"), 'Must support CATALYTIC_CRACKING_FCC');
  assert(visualizerContent.includes("'OCTANE_RATING_BIOFUEL'"), 'Must support OCTANE_RATING_BIOFUEL');
});

// 4. SVG Visualizations
test('PetroleumRefiningVisualizer must include dynamic SVG distillation column with bubble cap trays', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 540 280"'), 'Must contain 540x280 distillation column SVG');
  assert(visualizerContent.includes('Dầu thô nung 360°C'), 'Must label crude inlet');
  assert(visualizerContent.includes('Nhà máy Lọc dầu Dung Quất'), 'Must cite Dung Quất refinery');
});

test('PetroleumRefiningVisualizer must include bio-gasoline octane gauges and TCVN standard', () => {
  assert(visualizerContent.includes('resultingBlendRon'), 'Must display resulting blend RON');
  assert(visualizerContent.includes('antiKnockIndexAki'), 'Must display AKI');
  assert(visualizerContent.includes('TCVN 7716'), 'Must display TCVN 7716 standard');
});

// 5. Integration into PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import PetroleumRefiningVisualizer', () => {
  assert(periodicCodexContent.includes("import { PetroleumRefiningVisualizer } from './visualizations/PetroleumRefiningVisualizer';"), 'Import missing');
});

test('PeriodicCodexTab must include PETROLEUM_REFINING_OCTANE in activeMainTab type union', () => {
  assert(periodicCodexContent.includes("'PETROLEUM_REFINING_OCTANE'"), 'Tab type missing');
});

test('PeriodicCodexTab must render PetroleumRefiningVisualizer when activeMainTab is PETROLEUM_REFINING_OCTANE', () => {
  assert(periodicCodexContent.includes("<PetroleumRefiningVisualizer />"), 'Component JSX call missing');
});

test('PeriodicCodexTab must contain the navigation button for Lọc Dầu, Cracking & Xăng E5', () => {
  assert(periodicCodexContent.includes('Lọc Dầu, Cracking & Xăng E5'), 'Navigation label missing');
  assert(periodicCodexContent.includes("setActiveMainTab('PETROLEUM_REFINING_OCTANE')"), 'Click handler missing');
});

console.log(`\n======================================================================`);
console.log(`   TEST SUITE 223: ALL ${passedCount}/12 TESTS PASSED PERFECTLY       `);
console.log(`======================================================================\n`);
