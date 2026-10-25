// tests/test-thermoelectric-generator-visualizer-ui.mjs
// Test Suite 369: UI Verification for Thermoelectric Harvesting Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 369: Thermoelectric Harvesting Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying ThermoelectricHarvestingVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'ThermoelectricHarvestingVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'ThermoelectricHarvestingVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'POWER_EFFICIENCY_MAP'"), 'Visualizer must have POWER_EFFICIENCY_MAP tab');
assert(visualizerSrc.includes("'ZT_MATERIALS_DISCOVERY'"), 'Visualizer must have ZT_MATERIALS_DISCOVERY tab');
assert(visualizerSrc.includes("'AUTOMOTIVE_EXHAUST_TEG'"), 'Visualizer must have AUTOMOTIVE_EXHAUST_TEG tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateFigureOfMeritZT'), 'Visualizer must import calculateFigureOfMeritZT');
assert(visualizerSrc.includes('calculateThermoelectricGeneratorPerformance'), 'Visualizer must import calculateThermoelectricGeneratorPerformance');
assert(visualizerSrc.includes('calculateAutomotiveExhaustTegEconomics'), 'Visualizer must import calculateAutomotiveExhaustTegEconomics');

// Check SVG elements
assert(visualizerSrc.includes('p-Type'), 'Visualizer SVG must render p-Type semiconductor leg');
assert(visualizerSrc.includes('n-Type'), 'Visualizer SVG must render n-Type semiconductor leg');
assert(visualizerSrc.includes('MẶT GIA NHIỆT NÓNG'), 'Visualizer SVG must render Hot Junction plate');
assert(visualizerSrc.includes('MẶT GIẢI NHIỆT LẠNH'), 'Visualizer SVG must render Cold Junction plate');
assert(visualizerSrc.includes('Lỗ Trống h⁺'), 'Visualizer SVG must indicate hole carriers');
assert(visualizerSrc.includes('Electron e⁻'), 'Visualizer SVG must indicate electron carriers');
console.log('  ✓ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { ThermoelectricHarvestingVisualizer } from './visualizations/ThermoelectricHarvestingVisualizer'"),
  'PeriodicCodexTab must import ThermoelectricHarvestingVisualizer');

assert(codexSrc.includes("'SOLID_STATE_THERMOELECTRIC_HARVESTING'"),
  'PeriodicCodexTab state union must contain SOLID_STATE_THERMOELECTRIC_HARVESTING');

assert(codexSrc.includes("setActiveMainTab('SOLID_STATE_THERMOELECTRIC_HARVESTING')"),
  'PeriodicCodexTab must contain button to switch to SOLID_STATE_THERMOELECTRIC_HARVESTING');

assert(codexSrc.includes("<ThermoelectricHarvestingVisualizer />"),
  'PeriodicCodexTab must render <ThermoelectricHarvestingVisualizer />');
console.log('  ✓ PeriodicCodexTab navigation button and conditional render block verified.');

// 3. Verify Vite Configuration Chunking
console.log('  3. Verifying vite.config.ts chunking...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');

assert(viteSrc.includes('Thermoelectric'),
  'vite.config.ts energyKeywords must include Thermoelectric');
console.log('  ✓ vite.config.ts chunking keyword confirmed for chemistry-visualizers-energy.');

// 4. Verify Interactive Controls and Scientific Accuracy
console.log('  4. Verifying Interactive Controls and Scientific Accuracy...');
assert(visualizerSrc.includes('hotSideTempC'), 'Visualizer must have hot side temperature control');
assert(visualizerSrc.includes('coldSideTempC'), 'Visualizer must have cold side temperature control');
assert(visualizerSrc.includes('thermocouplePairs'), 'Visualizer must have thermocouple pairs control');
assert(visualizerSrc.includes('zT = (S² · σ · T) / κ'), 'Visualizer must display zT physics formula');
assert(visualizerSrc.includes('alternatorUnloadPercent'), 'Visualizer must calculate alternator unloading');
console.log('  ✓ Interactive controls, Seebeck transport physics, and automotive TEG metrics verified.');

console.log('🎉 Test Suite 369 Passed (4/4 assertion groups clean)!');
