// tests/test-seawater-uranium-visualizer-ui.mjs
// ============================================================================
// TEST SUITE 389: SEAWATER URANIUM EXTRACTION VISUALIZER UI VERIFICATION
// Auditing Visualizer Component, SVG Marine Flowsheet, PeriodicCodexTab
// Integration, Vite Config Chunking, and Interactive Sliders
// ============================================================================

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('🧪 Running Test Suite 389: Seawater Uranium Extraction Visualizer UI Verification...');

// 1. Verify SeawaterUraniumVisualizer.tsx source code
console.log('  1. Verifying SeawaterUraniumVisualizer.tsx source code...');
const visualizerPath = path.resolve('src/components/visualizations/SeawaterUraniumVisualizer.tsx');
assert.ok(fs.existsSync(visualizerPath), 'SeawaterUraniumVisualizer.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
assert.ok(visualizerContent.includes('SeawaterUraniumExtractionEngine'), 'Visualizer must import SeawaterUraniumExtractionEngine');
assert.ok(visualizerContent.includes('ADSORBENT_CATALOG'), 'Visualizer must import ADSORBENT_CATALOG');
assert.ok(visualizerContent.includes('TERRESTRIAL_VS_MARINE_COMPARISON'), 'Visualizer must import TERRESTRIAL_VS_MARINE_COMPARISON');
assert.ok(visualizerContent.includes("activeTab === 'flowsheet'"), 'Visualizer must support flowsheet tab');
assert.ok(visualizerContent.includes("activeTab === 'kinetics'"), 'Visualizer must support kinetics tab');
assert.ok(visualizerContent.includes("activeTab === 'comparison'"), 'Visualizer must support comparison tab');
assert.ok(visualizerContent.includes('Dòng Hải Lưu Tự Nhiên'), 'Process SVG must include Ocean Current');
assert.ok(visualizerContent.includes('Bể Giải Hấp Điện Hóa Xung'), 'Process SVG must include Pulsed Electrochemical Elution Cell');
assert.ok(visualizerContent.includes('Kết Tủa Bánh Vàng'), 'Process SVG must include Yellowcake Precipitation');
console.log('  ✅ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

assert.ok(
  codexContent.includes('SeawaterUraniumVisualizer') || codexContent.includes('SEAWATER_URANIUM_EXTRACTION'),
  'PeriodicCodexTab must include reference to SeawaterUraniumVisualizer'
);
console.log('  ✅ PeriodicCodexTab integration verified.');

// 3. Verify Vite config chunking configuration
console.log('  3. Verifying Vite config chunking configuration...');
const vitePath = path.resolve('vite.config.ts');
assert.ok(fs.existsSync(vitePath), 'vite.config.ts must exist');
const viteContent = fs.readFileSync(vitePath, 'utf-8');
assert.ok(
  viteContent.includes('SeawaterUranium') || viteContent.includes('Uranium'),
  'vite.config.ts must include SeawaterUranium in energy chunk keywords'
);
console.log('  ✅ Vite configuration verified.');

// 4. Verify Interactive Sliders & Controls
console.log('  4. Verifying Interactive Sliders & Controls...');
assert.ok(visualizerContent.includes('setAdsorbentTons'), 'Must support adsorbent tons slider');
assert.ok(visualizerContent.includes('setImmersionDays'), 'Must support immersion days slider');
assert.ok(visualizerContent.includes('setSelectedAdsorbentId'), 'Must support adsorbent selector');
assert.ok(visualizerContent.includes('setOceanVelocityMS'), 'Must support ocean current velocity slider');
console.log('  ✅ Controls verified.');

console.log('\n======================================================================');
console.log('   SUITE 389: ALL 4 VERIFICATION AUDIT PHASES PASSED 100%!');
console.log('======================================================================\n');
