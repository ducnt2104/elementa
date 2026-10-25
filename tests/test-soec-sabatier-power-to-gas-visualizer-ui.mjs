// tests/test-soec-sabatier-power-to-gas-visualizer-ui.mjs
// Test Suite 377: UI Verification for SOEC-Sabatier Power-to-Gas (PtG) Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 377: SOEC-Sabatier Power-to-Gas Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying SoecSabatierPowerToGasVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'SoecSabatierPowerToGasVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'SoecSabatierPowerToGasVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'SOEC_SABATIER_THERMAL_COUPLING_FLOW'"), 'Visualizer must have SOEC_SABATIER_THERMAL_COUPLING_FLOW tab');
assert(visualizerSrc.includes("'ENERGY_EFFICIENCY_AND_HEAT_INTEGRATION'"), 'Visualizer must have ENERGY_EFFICIENCY_AND_HEAT_INTEGRATION tab');
assert(visualizerSrc.includes("'CARBON_CIRCULARITY_AND_GRID_INJECTION'"), 'Visualizer must have CARBON_CIRCULARITY_AND_GRID_INJECTION tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateSoecStackMetrics'), 'Visualizer must import calculateSoecStackMetrics');
assert(visualizerSrc.includes('calculatePtGPlantPerformance'), 'Visualizer must import calculatePtGPlantPerformance');
assert(visualizerSrc.includes('getPtGTechnologyComparisons'), 'Visualizer must import getPtGTechnologyComparisons');
assert(visualizerSrc.includes('CO2_SOURCE_CATALOG'), 'Visualizer must import CO2_SOURCE_CATALOG');

// Check SVG elements
assert(visualizerSrc.includes('Điện Phân SOEC'), 'Visualizer SVG must render SOEC Electrolyzer unit');
assert(visualizerSrc.includes('Phản Ứng Sabatier'), 'Visualizer SVG must render Sabatier catalytic reactor');
assert(visualizerSrc.includes('Bộ Thu Hồi Nhiệt Sabatier'), 'Visualizer SVG must render heat recuperator');
assert(visualizerSrc.includes('Nhiệt tỏa (-165 kJ/mol)'), 'Visualizer SVG must render exothermic return loop');
assert(visualizerSrc.includes('Hơi Nước Quá Nhiệt (Feed)'), 'Visualizer SVG must render steam feed return');
assert(visualizerSrc.includes('e-Metan Bơm Lưới (CH₄)'), 'Visualizer SVG must render e-methane grid output');
console.log('  ✅ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { SoecSabatierPowerToGasVisualizer } from './visualizations/SoecSabatierPowerToGasVisualizer'"),
  'PeriodicCodexTab must import SoecSabatierPowerToGasVisualizer');

assert(codexSrc.includes("'SOEC_SABATIER_POWER_TO_GAS'"),
  'PeriodicCodexTab state union must contain SOEC_SABATIER_POWER_TO_GAS');

assert(codexSrc.includes("setActiveMainTab('SOEC_SABATIER_POWER_TO_GAS')"),
  'PeriodicCodexTab must have button trigger for SOEC_SABATIER_POWER_TO_GAS');

assert(codexSrc.includes("<SoecSabatierPowerToGasVisualizer />"),
  'PeriodicCodexTab must render <SoecSabatierPowerToGasVisualizer />');
console.log('  ✅ PeriodicCodexTab integration verified.');

// 3. Verify Vite Chunk Allocation
console.log('  3. Verifying Vite config chunking configuration...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');
assert(viteSrc.includes("'SoecSabatier'"), 'vite.config.ts must include SoecSabatier in energyKeywords chunk');
console.log('  ✅ Vite configuration verified.');

// 4. Verify Interactive Controls
console.log('  4. Verifying Interactive Sliders & Controls...');
assert(visualizerSrc.includes('electricalInputMWe'), 'Must include electrical input slider');
assert(visualizerSrc.includes('soecTemperatureC'), 'Must include SOEC temperature slider');
assert(visualizerSrc.includes('CO2_SOURCE_CATALOG'), 'Must include CO2 capture source selector');
console.log('  ✅ Controls verified.');

console.log('\n======================================================================');
console.log('   SUITE 377: ALL 4 VERIFICATION AUDIT PHASES PASSED 100%!');
console.log('======================================================================\n');
