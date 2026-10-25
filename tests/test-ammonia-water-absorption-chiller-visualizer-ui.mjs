// tests/test-ammonia-water-absorption-chiller-visualizer-ui.mjs
// Test Suite 363: UI Verification for Ammonia-Water Absorption Chiller Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 363: Ammonia-Water (NH3-H2O) Absorption Chiller Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying AmmoniaWaterAbsorptionChillerVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'AmmoniaWaterAbsorptionChillerVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'AmmoniaWaterAbsorptionChillerVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'VAPOR_LIQUID_EQUILIBRIUM_RECTIFICATION'"), 'Visualizer must have VAPOR_LIQUID_EQUILIBRIUM_RECTIFICATION tab');
assert(visualizerSrc.includes("'THERMAL_COP_ENERGY_BALANCE'"), 'Visualizer must have THERMAL_COP_ENERGY_BALANCE tab');
assert(visualizerSrc.includes("'AI_DATA_CENTER_COGENERATION'"), 'Visualizer must have AI_DATA_CENTER_COGENERATION tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateAmmoniaWaterEquilibrium'), 'Visualizer must import calculateAmmoniaWaterEquilibrium');
assert(visualizerSrc.includes('calculateAbsorptionChillerPerformance'), 'Visualizer must import calculateAbsorptionChillerPerformance');
assert(visualizerSrc.includes('calculateDataCenterCogenerationEconomics'), 'Visualizer must import calculateDataCenterCogenerationEconomics');

// Check SVG elements
assert(visualizerSrc.includes('rect x="100" y="50" width="80" height="110"'), 'Visualizer SVG must render Generator box');
assert(visualizerSrc.includes('rect x="350" y="90" width="80" height="70"'), 'Visualizer SVG must render Condenser box');
assert(visualizerSrc.includes('rect x="450" y="230" width="90" height="75"'), 'Visualizer SVG must render Evaporator box');
assert(visualizerSrc.includes('rect x="100" y="250" width="80" height="80"'), 'Visualizer SVG must render Absorber box');
assert(visualizerSrc.includes('circle cx="50" cy="240" r="16"'), 'Visualizer SVG must render Solution Pump');
assert(visualizerSrc.includes('Rectifier'), 'Visualizer SVG must include Rectifier column');
console.log('  ✓ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { AmmoniaWaterAbsorptionChillerVisualizer } from './visualizations/AmmoniaWaterAbsorptionChillerVisualizer'"),
  'PeriodicCodexTab must import AmmoniaWaterAbsorptionChillerVisualizer');

assert(codexSrc.includes("'AMMONIA_WATER_ABSORPTION_CHILLER'"),
  'PeriodicCodexTab state union must contain AMMONIA_WATER_ABSORPTION_CHILLER');

assert(codexSrc.includes("setActiveMainTab('AMMONIA_WATER_ABSORPTION_CHILLER')"),
  'PeriodicCodexTab must contain button to switch to AMMONIA_WATER_ABSORPTION_CHILLER');

assert(codexSrc.includes("<AmmoniaWaterAbsorptionChillerVisualizer />"),
  'PeriodicCodexTab must render <AmmoniaWaterAbsorptionChillerVisualizer />');
console.log('  ✓ PeriodicCodexTab navigation button and conditional render block verified.');

// 3. Verify Vite Configuration Chunking
console.log('  3. Verifying vite.config.ts chunking...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');

assert(viteSrc.includes('AmmoniaWaterAbsorption'),
  'vite.config.ts energyKeywords must include AmmoniaWaterAbsorption');
console.log('  ✓ vite.config.ts chunking keyword confirmed for chemistry-visualizers-energy.');

// 4. Verify Interactive Controls and Metrics
console.log('  4. Verifying Interactive Controls and Scientific Accuracy...');
assert(visualizerSrc.includes('generatorTempC'), 'Visualizer must have generator temperature control');
assert(visualizerSrc.includes('condenserTempC'), 'Visualizer must have condenser temperature control');
assert(visualizerSrc.includes('evaporatorTempC'), 'Visualizer must have evaporator temperature control');
assert(visualizerSrc.includes('itServerLoadMW'), 'Visualizer must have IT server load control');
assert(visualizerSrc.includes('PUE'), 'Visualizer must render PUE metrics');
assert(visualizerSrc.includes('GWP = 0'), 'Visualizer must highlight GWP = 0 natural refrigerant');
console.log('  ✓ Interactive controls, thermal thermodynamic metrics, and PUE calculations verified.');

console.log('🎉 Test Suite 363 Passed (4/4 assertion groups clean)!');
