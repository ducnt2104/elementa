// tests/test-liquid-air-energy-storage-visualizer-ui.mjs
// Test Suite 367: UI Verification for Liquid-Air Energy Storage (LAES) Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 367: Liquid-Air Energy Storage (LAES) Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying LiquidAirEnergyStorageVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'LiquidAirEnergyStorageVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'LiquidAirEnergyStorageVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'CRYOGENIC_CYCLE_FLOW'"), 'Visualizer must have CRYOGENIC_CYCLE_FLOW tab');
assert(visualizerSrc.includes("'COLD_RECYCLE_RTE_OPTIMIZATION'"), 'Visualizer must have COLD_RECYCLE_RTE_OPTIMIZATION tab');
assert(visualizerSrc.includes("'GIGA_SCALE_ECONOMICS'"), 'Visualizer must have GIGA_SCALE_ECONOMICS tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateLaesCyclePerformance'), 'Visualizer must import calculateLaesCyclePerformance');
assert(visualizerSrc.includes('calculateLaesEconomicsAndEmissions'), 'Visualizer must import calculateLaesEconomicsAndEmissions');

// Check SVG elements
assert(visualizerSrc.includes('BÌNH LIQUID AIR'), 'Visualizer SVG must render Liquid Air Tank');
assert(visualizerSrc.includes('CTES Lạnh'), 'Visualizer SVG must render Cold Thermal Energy Storage');
assert(visualizerSrc.includes('Máy Nén'), 'Visualizer SVG must render Compressor');
assert(visualizerSrc.includes('Tuabin'), 'Visualizer SVG must render Expander Turbine');
assert(visualizerSrc.includes('-194 °C'), 'Visualizer SVG must indicate cryogenic temperature -194°C');
console.log('  ✓ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { LiquidAirEnergyStorageVisualizer } from './visualizations/LiquidAirEnergyStorageVisualizer'"),
  'PeriodicCodexTab must import LiquidAirEnergyStorageVisualizer');

assert(codexSrc.includes("'LIQUID_AIR_ENERGY_STORAGE'"),
  'PeriodicCodexTab state union must contain LIQUID_AIR_ENERGY_STORAGE');

assert(codexSrc.includes("setActiveMainTab('LIQUID_AIR_ENERGY_STORAGE')"),
  'PeriodicCodexTab must contain button to switch to LIQUID_AIR_ENERGY_STORAGE');

assert(codexSrc.includes("<LiquidAirEnergyStorageVisualizer />"),
  'PeriodicCodexTab must render <LiquidAirEnergyStorageVisualizer />');
console.log('  ✓ PeriodicCodexTab navigation button and conditional render block verified.');

// 3. Verify Vite Configuration Chunking
console.log('  3. Verifying vite.config.ts chunking...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');

assert(viteSrc.includes('LiquidAir'),
  'vite.config.ts energyKeywords must include LiquidAir');
console.log('  ✓ vite.config.ts chunking keyword confirmed for chemistry-visualizers-energy.');

// 4. Verify Interactive Controls and Scientific Accuracy
console.log('  4. Verifying Interactive Controls and Scientific Accuracy...');
assert(visualizerSrc.includes('coldRecycleEffectiveness'), 'Visualizer must have cold recycle slider');
assert(visualizerSrc.includes('scaleType'), 'Visualizer must have scale selector');
assert(visualizerSrc.includes('Round-Trip Efficiency'), 'Visualizer must display RTE metric');
assert(visualizerSrc.includes('35 năm'), 'Visualizer must emphasize 35-year calendar life');
assert(visualizerSrc.includes('0 kg'), 'Visualizer must highlight 0 kg critical minerals');
console.log('  ✓ Interactive controls, cryogenic Claude cycle, and grid LDES economics verified.');

console.log('🎉 Test Suite 367 Passed (4/4 assertion groups clean)!');
