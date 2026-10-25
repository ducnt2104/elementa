// tests/test-methane-pyrolysis-molten-metal-visualizer-ui.mjs
// ============================================================================
// TEST SUITE 385: METHANE PYROLYSIS MOLTEN METAL VISUALIZER UI VERIFICATION
// Auditing Visualizer Component, SVG Bubble Process Flowsheet,
// PeriodicCodexTab Integration, Vite Config Chunking, and Interactive Sliders
// ============================================================================

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('🧪 Running Test Suite 385: Methane Pyrolysis Molten Metal Visualizer UI Verification...');

// 1. Verify MethanePyrolysisMoltenMetalVisualizer.tsx source code
console.log('  1. Verifying MethanePyrolysisMoltenMetalVisualizer.tsx source code...');
const visualizerPath = path.resolve('src/components/visualizations/MethanePyrolysisMoltenMetalVisualizer.tsx');
assert.ok(fs.existsSync(visualizerPath), 'MethanePyrolysisMoltenMetalVisualizer.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
assert.ok(visualizerContent.includes('MethanePyrolysisMoltenMetalEngine'), 'Visualizer must import MethanePyrolysisMoltenMetalEngine');
assert.ok(visualizerContent.includes('MOLTEN_ALLOYS'), 'Visualizer must import MOLTEN_ALLOYS');
assert.ok(visualizerContent.includes('CARBON_MARKET_GRADES'), 'Visualizer must import CARBON_MARKET_GRADES');
assert.ok(visualizerContent.includes("activeTab === 'flowsheet'"), 'Visualizer must support flowsheet tab');
assert.ok(visualizerContent.includes("activeTab === 'kinetics'"), 'Visualizer must support kinetics tab');
assert.ok(visualizerContent.includes("activeTab === 'economics'"), 'Visualizer must support economics tab');
assert.ok(visualizerContent.includes('Lò Phản Ứng Cột Bọt Kim Loại Lỏng'), 'Process SVG must include Molten Metal Bubble Column');
assert.ok(visualizerContent.includes('Thu Hồi Carbon Rắn'), 'Process SVG must include Carbon Skimmer / Extractor');
assert.ok(visualizerContent.includes('Khí Hydro Màu Lam'), 'Process SVG must include Turquoise Hydrogen Exit');
console.log('  ✅ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

assert.ok(
  codexContent.includes('MethanePyrolysisMoltenMetalVisualizer') || codexContent.includes('METHANE_PYROLYSIS_MOLTEN_METAL'),
  'PeriodicCodexTab must include reference to MethanePyrolysisMoltenMetalVisualizer'
);
console.log('  ✅ PeriodicCodexTab integration verified.');

// 3. Verify Vite config chunking configuration
console.log('  3. Verifying Vite config chunking configuration...');
const vitePath = path.resolve('vite.config.ts');
assert.ok(fs.existsSync(vitePath), 'vite.config.ts must exist');
const viteContent = fs.readFileSync(vitePath, 'utf-8');
assert.ok(
  viteContent.includes('MethanePyrolysis') || viteContent.includes('MoltenMetal') || viteContent.includes('TurquoiseHydrogen'),
  'vite.config.ts must include MethanePyrolysis in energy chunk keywords'
);
console.log('  ✅ Vite configuration verified.');

// 4. Verify Interactive Sliders & Controls
console.log('  4. Verifying Interactive Sliders & Controls...');
assert.ok(visualizerContent.includes('setMethaneFeedRateNm3H'), 'Must support methane feed rate slider');
assert.ok(visualizerContent.includes('setLiquidColumnHeightM'), 'Must support liquid column height slider');
assert.ok(visualizerContent.includes('setSelectedAlloyId'), 'Must support molten alloy selector');
assert.ok(visualizerContent.includes('setCarbonProductType'), 'Must support carbon product grade selector');
console.log('  ✅ Controls verified.');

console.log('\n======================================================================');
console.log('   SUITE 385: ALL 4 VERIFICATION AUDIT PHASES PASSED 100%!');
console.log('======================================================================\n');
