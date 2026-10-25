// tests/test-allam-cycle-visualizer-ui.mjs
// ============================================================================
// TEST SUITE 387: SUPERCRITICAL CO2 ALLAM CYCLE VISUALIZER UI VERIFICATION
// Auditing Visualizer Component, SVG Process Flowsheet, PeriodicCodexTab
// Integration, Vite Config Chunking, and Benchmark Technology Comparison
// ============================================================================

import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('🧪 Running Test Suite 387: Allam Cycle sCO2 Visualizer UI Verification...');

// 1. Verify AllamCycleVisualizer.tsx source code
console.log('  1. Verifying AllamCycleVisualizer.tsx source code...');
const visualizerPath = path.resolve('src/components/visualizations/AllamCycleVisualizer.tsx');
assert.ok(fs.existsSync(visualizerPath), 'AllamCycleVisualizer.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
assert.ok(visualizerContent.includes('AllamCycleEngine'), 'Visualizer must import AllamCycleEngine');
assert.ok(visualizerContent.includes('BENCHMARK_POWER_PLANTS'), 'Visualizer must import BENCHMARK_POWER_PLANTS');
assert.ok(visualizerContent.includes("activeTab === 'flowsheet'"), 'Visualizer must support flowsheet tab');
assert.ok(visualizerContent.includes("activeTab === 'thermodynamics'"), 'Visualizer must support thermodynamics tab');
assert.ok(visualizerContent.includes("activeTab === 'benchmarks'"), 'Visualizer must support benchmarks tab');
assert.ok(visualizerContent.includes('Buồng Đốt Oxy'), 'Process SVG must include Oxy-Combustor');
assert.ok(visualizerContent.includes('Tua Bin sCO₂'), 'Process SVG must include sCO2 Turbine');
assert.ok(visualizerContent.includes('Bộ Hồi Nhiệt PCHE'), 'Process SVG must include PCHE Recuperator');
assert.ok(visualizerContent.includes('Xuất CO₂ Đường Ống'), 'Process SVG must include Inherent Pipeline CO2 Export');
console.log('  ✅ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

assert.ok(
  codexContent.includes('AllamCycleVisualizer') || codexContent.includes('ALLAM_CYCLE_SCO2'),
  'PeriodicCodexTab must include reference to AllamCycleVisualizer'
);
console.log('  ✅ PeriodicCodexTab integration verified.');

// 3. Verify Vite config chunking configuration
console.log('  3. Verifying Vite config chunking configuration...');
const vitePath = path.resolve('vite.config.ts');
assert.ok(fs.existsSync(vitePath), 'vite.config.ts must exist');
const viteContent = fs.readFileSync(vitePath, 'utf-8');
assert.ok(
  viteContent.includes('AllamCycle') || viteContent.includes('Allam'),
  'vite.config.ts must include AllamCycle in energy chunk keywords'
);
console.log('  ✅ Vite configuration verified.');

// 4. Verify Interactive Sliders & Controls
console.log('  4. Verifying Interactive Sliders & Controls...');
assert.ok(visualizerContent.includes('setNaturalGasHeatInputMw'), 'Must support fuel heat input slider');
assert.ok(visualizerContent.includes('setTurbineInletPressureBar'), 'Must support turbine inlet pressure slider');
assert.ok(visualizerContent.includes('setTurbineInletTempC'), 'Must support turbine inlet temperature slider');
assert.ok(visualizerContent.includes('setPcheEffectiveness'), 'Must support PCHE recuperator effectiveness slider');
console.log('  ✅ Controls verified.');

console.log('\n======================================================================');
console.log('   SUITE 387: ALL 4 VERIFICATION AUDIT PHASES PASSED 100%!');
console.log('======================================================================\n');
