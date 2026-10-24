// tests/test-quantum-dots-visualizer-ui.mjs
// Test Suite 229: QuantumDotsVisualizer Component & PeriodicCodexTab Audit
// Standardized against Nobel Prize in Chemistry 2023 & Vietnam GDPT 2018 Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 229: QuantumDotsVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/QuantumDotsVisualizer.tsx');
const enginePath = path.resolve('src/domain/quantumDotsEngine.ts');
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
test('QuantumDotsVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('quantumDotsEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('QuantumDotsVisualizer must import functions from quantumDotsEngine', () => {
  assert(visualizerContent.includes('QUANTUM_DOT_CATALOG'), 'Must import QUANTUM_DOT_CATALOG');
  assert(visualizerContent.includes('calculateBrusBandgap'), 'Must import calculateBrusBandgap');
  assert(visualizerContent.includes('CORE_SHELL_PROFILES'), 'Must import CORE_SHELL_PROFILES');
});

test('QuantumDotsVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('QuantumDotsVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'BRUS_CONFINEMENT_COLOR'"), 'Must support BRUS_CONFINEMENT_COLOR');
  assert(visualizerContent.includes("'QLED_DISPLAY_PIXELS'"), 'Must support QLED_DISPLAY_PIXELS');
  assert(visualizerContent.includes("'CORE_SHELL_PASSIVATION'"), 'Must support CORE_SHELL_PASSIVATION');
});

// 4. SVG and Interactive Graphics
test('QuantumDotsVisualizer must render interactive SVG diagrams', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 600 300"'), 'Must render Glowing QD Nanocrystal SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 700 240"'), 'Must render QLED TV Subpixels SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 540 260"'), 'Must render Core-Shell Band Alignment SVG');
});

// 5. Scientific Citations & Industrial Context
test('QuantumDotsVisualizer must reference Nobel 2023, Brus equation, and QLED TV', () => {
  assert(visualizerContent.includes('Nobel'), 'Must cite Nobel 2023');
  assert(visualizerContent.includes('Brus'), 'Must cite Brus equation');
  assert(visualizerContent.includes('QLED'), 'Must cite QLED TV display');
  assert(visualizerContent.includes('RoHS'), 'Must cite RoHS eco-compliance');
});

// 6. PeriodicCodexTab integration
const codexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import QuantumDotsVisualizer', () => {
  assert(codexContent.includes("import { QuantumDotsVisualizer } from './visualizations/QuantumDotsVisualizer';"),
    'Must import QuantumDotsVisualizer');
});

test('PeriodicCodexTab state union must include QUANTUM_DOTS_NANOTECH', () => {
  assert(codexContent.includes("'QUANTUM_DOTS_NANOTECH'"), 'State union must include QUANTUM_DOTS_NANOTECH');
});

test('PeriodicCodexTab must provide a navigation button for Quantum Dots', () => {
  assert(codexContent.includes("setActiveMainTab('QUANTUM_DOTS_NANOTECH')"), 'Must have button to activate QUANTUM_DOTS_NANOTECH');
  assert(codexContent.includes('Chấm Lượng Tử &amp; Màn Hình QLED') || codexContent.includes('Chấm Lượng Tử & Màn Hình QLED'),
    'Must display tab title');
});

test('PeriodicCodexTab must render QuantumDotsVisualizer when active', () => {
  assert(codexContent.includes("<QuantumDotsVisualizer />"), 'Must render QuantumDotsVisualizer');
});

console.log(`\n======================================================================`);
console.log(`   ALL ${passedCount} TESTS IN SUITE 229 PASSED AUDIT VERIFICATION!   `);
console.log(`======================================================================\n`);
