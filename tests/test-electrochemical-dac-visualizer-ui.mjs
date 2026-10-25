// tests/test-electrochemical-dac-visualizer-ui.mjs
// ============================================================================
// TEST SUITE 383: ELECTROCHEMICAL DAC (BPMED) VISUALIZER UI VERIFICATION
// Auditing Visualizer Component, SVG Process Flowsheet, PeriodicCodexTab
// Integration, Vite Config Chunking, and Interactive Sliders
// ============================================================================

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('🧪 Running Test Suite 383: Electrochemical DAC (BPMED) Visualizer UI Verification...');

// 1. Verify ElectrochemicalDacVisualizer.tsx source code
console.log('  1. Verifying ElectrochemicalDacVisualizer.tsx source code...');
const visualizerPath = path.resolve('src/components/visualizations/ElectrochemicalDacVisualizer.tsx');
assert.ok(fs.existsSync(visualizerPath), 'ElectrochemicalDacVisualizer.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
assert.ok(visualizerContent.includes('ElectrochemicalDacEngine'), 'Visualizer must import ElectrochemicalDacEngine');
assert.ok(visualizerContent.includes('SEQUESTRATION_PORTFOLIO'), 'Visualizer must import SEQUESTRATION_PORTFOLIO');
assert.ok(visualizerContent.includes("activeTab === 'flowsheet'"), 'Visualizer must support flowsheet tab');
assert.ok(visualizerContent.includes("activeTab === 'kinetics'"), 'Visualizer must support kinetics tab');
assert.ok(visualizerContent.includes("activeTab === 'economics'"), 'Visualizer must support economics tab');
assert.ok(visualizerContent.includes('Tháp Tiếp Xúc Khí'), 'Process SVG must include Air Contactor');
assert.ok(visualizerContent.includes('Cụm Màng Điện Phân Lưỡng Cực'), 'Process SVG must include BPMED Stack');
assert.ok(visualizerContent.includes('Bình Tách Khí'), 'Process SVG must include Gas Degasser');
assert.ok(visualizerContent.includes('Carbfix'), 'Must include Carbfix Basalt Mineralization');
console.log('  ✅ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

assert.ok(
  codexContent.includes('ElectrochemicalDacVisualizer') || codexContent.includes('ELECTROCHEMICAL_DAC_BPMED'),
  'PeriodicCodexTab must include reference to ElectrochemicalDacVisualizer'
);
console.log('  ✅ PeriodicCodexTab integration verified.');

// 3. Verify Vite config chunking configuration
console.log('  3. Verifying Vite config chunking configuration...');
const vitePath = path.resolve('vite.config.ts');
assert.ok(fs.existsSync(vitePath), 'vite.config.ts must exist');
const viteContent = fs.readFileSync(vitePath, 'utf-8');
assert.ok(
  viteContent.includes('ElectrochemicalDac') || viteContent.includes('BPMED') || viteContent.includes('DAC'),
  'vite.config.ts must include ElectrochemicalDac in energy chunk keywords'
);
console.log('  ✅ Vite configuration verified.');

// 4. Verify Interactive Sliders & Controls
console.log('  4. Verifying Interactive Sliders & Controls...');
assert.ok(visualizerContent.includes('setAnnualCapacityTons'), 'Must support annual capacity slider');
assert.ok(visualizerContent.includes('setAmbientCo2Ppm'), 'Must support ambient CO2 ppm slider');
assert.ok(visualizerContent.includes('setCellVoltageV'), 'Must support cell voltage slider');
assert.ok(visualizerContent.includes('setSelectedSequestrationId'), 'Must support sequestration selector');
console.log('  ✅ Controls verified.');

console.log('\n======================================================================');
console.log('   SUITE 383: ALL 4 VERIFICATION AUDIT PHASES PASSED 100%!');
console.log('======================================================================\n');
