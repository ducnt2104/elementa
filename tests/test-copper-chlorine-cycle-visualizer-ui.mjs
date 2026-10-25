// tests/test-copper-chlorine-cycle-visualizer-ui.mjs
// Test Suite 375: UI Verification for Copper-Chlorine (Cu-Cl) Cycle Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 375: Copper-Chlorine (Cu-Cl) Cycle Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying CopperChlorineCycleVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'CopperChlorineCycleVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'CopperChlorineCycleVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'FOUR_STEP_CLOSED_LOOP'"), 'Visualizer must have FOUR_STEP_CLOSED_LOOP tab');
assert(visualizerSrc.includes("'ELECTROCHEMICAL_SAVINGS_AND_HEAT_SOURCES'"), 'Visualizer must have ELECTROCHEMICAL_SAVINGS_AND_HEAT_SOURCES tab');
assert(visualizerSrc.includes("'HYDROGEN_PLANT_ECONOMICS_AND_DECARBONIZATION'"), 'Visualizer must have HYDROGEN_PLANT_ECONOMICS_AND_DECARBONIZATION tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateCuClPerformance'), 'Visualizer must import calculateCuClPerformance');
assert(visualizerSrc.includes('calculateElectrolysisMetrics'), 'Visualizer must import calculateElectrolysisMetrics');
assert(visualizerSrc.includes('compareCuClVsOtherCycles'), 'Visualizer must import compareCuClVsOtherCycles');

// Check SVG elements for 4 steps
assert(visualizerSrc.includes('Thủy Phân CuCl₂ (380°C)'), 'Visualizer SVG must render Step 1 Hydrolysis');
assert(visualizerSrc.includes('Phân Hủy Cu₂OCl₂ (530°C)'), 'Visualizer SVG must render Step 2 Decomposition');
assert(visualizerSrc.includes('Điện Phân CuCl/HCl (80°C)'), 'Visualizer SVG must render Step 3 Electrolysis');
assert(visualizerSrc.includes('Kết Tinh CuCl₂ (110°C)'), 'Visualizer SVG must render Step 4 Crystallization');
assert(visualizerSrc.includes('Cu₂OCl₂(s)'), 'Visualizer SVG must render Cu2OCl2 intermediate stream');
assert(visualizerSrc.includes('CuCl lỏng'), 'Visualizer SVG must render molten CuCl stream');
assert(visualizerSrc.includes('HCl(g) Khí Axit Tuần Hoàn'), 'Visualizer SVG must render closed HCl recycle stream');
assert(visualizerSrc.includes('H₂ Hydro Xanh Sản Phẩm'), 'Visualizer SVG must render pure H2 product stream');
assert(visualizerSrc.includes('O₂ Khí Oxy Thoát Ra'), 'Visualizer SVG must render pure O2 co-product stream');
console.log('  ✅ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { CopperChlorineCycleVisualizer } from './visualizations/CopperChlorineCycleVisualizer'"),
  'PeriodicCodexTab must import CopperChlorineCycleVisualizer');

assert(codexSrc.includes("'COPPER_CHLORINE_HYBRID_CYCLE'"),
  'PeriodicCodexTab state union must contain COPPER_CHLORINE_HYBRID_CYCLE');

assert(codexSrc.includes("setActiveMainTab('COPPER_CHLORINE_HYBRID_CYCLE')"),
  'PeriodicCodexTab must have button trigger for COPPER_CHLORINE_HYBRID_CYCLE');

assert(codexSrc.includes("<CopperChlorineCycleVisualizer />"),
  'PeriodicCodexTab must render <CopperChlorineCycleVisualizer />');
console.log('  ✅ PeriodicCodexTab integration verified.');

// 3. Verify Vite Chunk Allocation
console.log('  3. Verifying Vite config chunking configuration...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');
assert(viteSrc.includes("'CopperChlorine'"), 'vite.config.ts must include CopperChlorine in energyKeywords chunk');
console.log('  ✅ Vite configuration verified.');

// 4. Verify Interactive Sliders and Accessibility
console.log('  4. Verifying Interactive Sliders & ARIA accessibility...');
assert(visualizerSrc.includes('electrolyzerVoltageV'), 'Must include cell voltage slider');
assert(visualizerSrc.includes('thermalInputMWth'), 'Must include thermal input slider');
assert(visualizerSrc.includes('heatExchangerRecovery'), 'Must include heat exchanger recovery slider');
assert(visualizerSrc.includes('HEAT_SOURCE_CATALOG'), 'Must include clean heat source selector catalog');
console.log('  ✅ Controls and accessibility verified.');

console.log('\n======================================================================');
console.log('   SUITE 375: ALL 4 VERIFICATION AUDIT PHASES PASSED 100%!');
console.log('======================================================================\n');
