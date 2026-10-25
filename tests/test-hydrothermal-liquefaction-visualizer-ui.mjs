// tests/test-hydrothermal-liquefaction-visualizer-ui.mjs
// Test Suite 381: UI Verification for Hydrothermal Liquefaction (HTL) Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 381: Hydrothermal Liquefaction (HTL) Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying HydrothermalLiquefactionVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'HydrothermalLiquefactionVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'HydrothermalLiquefactionVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'SUBCRITICAL_REACTOR_AND_PHASE_PARTITIONING'"), 'Visualizer must have SUBCRITICAL_REACTOR_AND_PHASE_PARTITIONING tab');
assert(visualizerSrc.includes("'SOLVATION_PHYSICS_AND_DIELECTRIC_METER'"), 'Visualizer must have SOLVATION_PHYSICS_AND_DIELECTRIC_METER tab');
assert(visualizerSrc.includes("'BIOCRUDE_SAF_REFINING_AND_CIRCULAR_ECONOMY'"), 'Visualizer must have BIOCRUDE_SAF_REFINING_AND_CIRCULAR_ECONOMY tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateSubcriticalWaterProperties'), 'Visualizer must import calculateSubcriticalWaterProperties');
assert(visualizerSrc.includes('calculateHtlPerformance'), 'Visualizer must import calculateHtlPerformance');
assert(visualizerSrc.includes('BIOMASS_FEEDSTOCK_CATALOG'), 'Visualizer must import BIOMASS_FEEDSTOCK_CATALOG');

// Check SVG elements
assert(visualizerSrc.includes('Bùn Thải Ẩm'), 'Visualizer SVG must render wet slurry feed pump');
assert(visualizerSrc.includes('LÒ PHẢN ỨNG HTL'), 'Visualizer SVG must render subcritical HTL reactor');
assert(visualizerSrc.includes('BÌNH PHÂN TÁCH 4 PHA'), 'Visualizer SVG must render 4-phase separator');
assert(visualizerSrc.includes('1. Khí Sinh Học (CO₂ + CH₄)'), 'Visualizer SVG must render Phase 1 gas');
assert(visualizerSrc.includes('2. Dầu Biocrude (SAF Feed)'), 'Visualizer SVG must render Phase 2 biocrude');
assert(visualizerSrc.includes('3. Pha Nước Khoáng N & P'), 'Visualizer SVG must render Phase 3 aqueous nutrients');
assert(visualizerSrc.includes('4. Than Hydrochar Rắn'), 'Visualizer SVG must render Phase 4 solid hydrochar');
console.log('  ✅ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { HydrothermalLiquefactionVisualizer } from './visualizations/HydrothermalLiquefactionVisualizer'"),
  'PeriodicCodexTab must import HydrothermalLiquefactionVisualizer');

assert(codexSrc.includes("'HYDROTHERMAL_LIQUEFACTION'"),
  'PeriodicCodexTab state union must contain HYDROTHERMAL_LIQUEFACTION');

assert(codexSrc.includes("setActiveMainTab('HYDROTHERMAL_LIQUEFACTION')"),
  'PeriodicCodexTab must have button trigger for HYDROTHERMAL_LIQUEFACTION');

assert(codexSrc.includes("<HydrothermalLiquefactionVisualizer />"),
  'PeriodicCodexTab must render <HydrothermalLiquefactionVisualizer />');
console.log('  ✅ PeriodicCodexTab integration verified.');

// 3. Verify Vite Chunk Allocation
console.log('  3. Verifying Vite config chunking configuration...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');
assert(viteSrc.includes("'HydrothermalLiquefaction'"), 'vite.config.ts must include HydrothermalLiquefaction in energyKeywords chunk');
console.log('  ✅ Vite configuration verified.');

// 4. Verify Interactive Controls
console.log('  4. Verifying Interactive Sliders & Controls...');
assert(visualizerSrc.includes('temperatureC'), 'Must include temperature slider');
assert(visualizerSrc.includes('pressureMPa'), 'Must include pressure slider');
assert(visualizerSrc.includes('residenceTimeMin'), 'Must include residence time slider');
assert(visualizerSrc.includes('feedstockType'), 'Must include feedstock selector');
console.log('  ✅ Controls verified.');

console.log('\n======================================================================');
console.log('   SUITE 381: ALL 4 VERIFICATION AUDIT PHASES PASSED 100%!');
console.log('======================================================================\n');
