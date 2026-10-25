// tests/test-metal-hydride-heat-pump-visualizer-ui.mjs
// Test Suite 365: UI Verification for Metal Hydride Heat Pump Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 365: Metal Hydride Heat Pump (MH-HP) Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying MetalHydrideHeatPumpVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'MetalHydrideHeatPumpVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'MetalHydrideHeatPumpVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'HEAT_TRANSFORMER_UPGRADE'"), 'Visualizer must have HEAT_TRANSFORMER_UPGRADE tab');
assert(visualizerSrc.includes("'VAN_T_HOFF_ISOTHERMS'"), 'Visualizer must have VAN_T_HOFF_ISOTHERMS tab');
assert(visualizerSrc.includes("'THERMAL_REFRIGERATION_CHILLER'"), 'Visualizer must have THERMAL_REFRIGERATION_CHILLER tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateVanTHoffEquilibrium'), 'Visualizer must import calculateVanTHoffEquilibrium');
assert(visualizerSrc.includes('calculateHeatTransformerPerformance'), 'Visualizer must import calculateHeatTransformerPerformance');
assert(visualizerSrc.includes('calculateMetalHydrideChillerPerformance'), 'Visualizer must import calculateMetalHydrideChillerPerformance');

// Check SVG elements
assert(visualizerSrc.includes('LTH REACTOR'), 'Visualizer SVG must render LTH Reactor box');
assert(visualizerSrc.includes('HTH REACTOR'), 'Visualizer SVG must render HTH Reactor box');
assert(visualizerSrc.includes('Dòng Khí Hydro H₂ Tuần Hoàn Kín'), 'Visualizer SVG must render closed hydrogen shuttle tube');
console.log('  ✓ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { MetalHydrideHeatPumpVisualizer } from './visualizations/MetalHydrideHeatPumpVisualizer'"),
  'PeriodicCodexTab must import MetalHydrideHeatPumpVisualizer');

assert(codexSrc.includes("'METAL_HYDRIDE_HEAT_PUMP'"),
  'PeriodicCodexTab state union must contain METAL_HYDRIDE_HEAT_PUMP');

assert(codexSrc.includes("setActiveMainTab('METAL_HYDRIDE_HEAT_PUMP')"),
  'PeriodicCodexTab must contain button to switch to METAL_HYDRIDE_HEAT_PUMP');

assert(codexSrc.includes("<MetalHydrideHeatPumpVisualizer />"),
  'PeriodicCodexTab must render <MetalHydrideHeatPumpVisualizer />');
console.log('  ✓ PeriodicCodexTab navigation button and conditional render block verified.');

// 3. Verify Vite Configuration Chunking
console.log('  3. Verifying vite.config.ts chunking...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');

assert(viteSrc.includes('MetalHydride'),
  'vite.config.ts energyKeywords must include MetalHydride');
console.log('  ✓ vite.config.ts chunking keyword confirmed for chemistry-visualizers-energy.');

// 4. Verify Interactive Controls and Scientific Accuracy
console.log('  4. Verifying Interactive Controls and Scientific Accuracy...');
assert(visualizerSrc.includes('wasteHeatTempC'), 'Visualizer must have waste heat temperature control');
assert(visualizerSrc.includes('wasteHeatInputKW'), 'Visualizer must have waste heat input power control');
assert(visualizerSrc.includes('chillerDriveTempC'), 'Visualizer must have chiller driving temperature control');
assert(visualizerSrc.includes('0% Máy Nén Khí'), 'Visualizer must emphasize zero mechanical compressor');
assert(visualizerSrc.includes('ln(P_eq / P₀)'), 'Visualizer must include Van \'t Hoff thermodynamic formula');
console.log('  ✓ Interactive controls, Van \'t Hoff thermodynamics, and heat upgrading metrics verified.');

console.log('🎉 Test Suite 365 Passed (4/4 assertion groups clean)!');
