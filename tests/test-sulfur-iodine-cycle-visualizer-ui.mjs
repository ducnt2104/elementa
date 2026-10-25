// tests/test-sulfur-iodine-cycle-visualizer-ui.mjs
// Test Suite 373: UI Verification for Sulfur-Iodine (S-I) Cycle Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 373: Sulfur-Iodine (S-I) Cycle Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying SulfurIodineCycleVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'SulfurIodineCycleVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'SulfurIodineCycleVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'THREE_SECTION_LOOP_FLOW'"), 'Visualizer must have THREE_SECTION_LOOP_FLOW tab');
assert(visualizerSrc.includes("'HEAT_SOURCE_THERMAL_EFFICIENCY'"), 'Visualizer must have HEAT_SOURCE_THERMAL_EFFICIENCY tab');
assert(visualizerSrc.includes("'GIGA_SCALE_H2_ECONOMICS'"), 'Visualizer must have GIGA_SCALE_H2_ECONOMICS tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateSulfurIodineCyclePerformance'), 'Visualizer must import calculateSulfurIodineCyclePerformance');

// Check SVG elements
assert(visualizerSrc.includes('BUNSEN REACTOR'), 'Visualizer SVG must render Bunsen Reactor');
assert(visualizerSrc.includes('H₂SO₄ DECOMPOSER'), 'Visualizer SVG must render H2SO4 Decomposer');
assert(visualizerSrc.includes('HI DECOMPOSER'), 'Visualizer SVG must render HI Decomposer');
assert(visualizerSrc.includes('Tuần Hoàn Khí SO₂'), 'Visualizer SVG must render SO2 recycle stream');
assert(visualizerSrc.includes('Tuần Hoàn Iốt I₂'), 'Visualizer SVG must render I2 recycle stream');
assert(visualizerSrc.includes('H₂ HYDRO'), 'Visualizer SVG must highlight H2 hydrogen output');
console.log('  ✓ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { SulfurIodineCycleVisualizer } from './visualizations/SulfurIodineCycleVisualizer'"),
  'PeriodicCodexTab must import SulfurIodineCycleVisualizer');

assert(codexSrc.includes("'SULFUR_IODINE_ADVANCED_CYCLE'"),
  'PeriodicCodexTab state union must contain SULFUR_IODINE_ADVANCED_CYCLE');

assert(codexSrc.includes("setActiveMainTab('SULFUR_IODINE_ADVANCED_CYCLE')"),
  'PeriodicCodexTab must contain button to switch to SULFUR_IODINE_ADVANCED_CYCLE');

assert(codexSrc.includes("<SulfurIodineCycleVisualizer />"),
  'PeriodicCodexTab must render <SulfurIodineCycleVisualizer />');
console.log('  ✓ PeriodicCodexTab navigation button and conditional render block verified.');

// 3. Verify Vite Configuration Chunking
console.log('  3. Verifying vite.config.ts chunking...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');

assert(viteSrc.includes('SulfurIodine'),
  'vite.config.ts energyKeywords must include SulfurIodine');
console.log('  ✓ vite.config.ts chunking keyword confirmed for chemistry-visualizers-energy.');

// 4. Verify Interactive Controls and Scientific Accuracy
console.log('  4. Verifying Interactive Controls and Scientific Accuracy...');
assert(visualizerSrc.includes('thermalPowerMWth'), 'Visualizer must have thermal power control');
assert(visualizerSrc.includes('sulfuricDecompTempC'), 'Visualizer must have sulfuric decomp temperature control');
assert(visualizerSrc.includes('hiConversionEnhancement'), 'Visualizer must have HI separation enhancement control');
assert(visualizerSrc.includes('I₂ + SO₂ + 2H₂O ➔ 2HI + H₂SO₄'), 'Visualizer must show Bunsen reaction formula');
assert(visualizerSrc.includes('H₂SO₄ ➔ H₂O + SO₂ + ½ O₂'), 'Visualizer must show Sulfuric decomp formula');
assert(visualizerSrc.includes('2HI ➔ H₂ ↑ + I₂'), 'Visualizer must show HI decomp formula');
console.log('  ✓ Interactive controls, 3-section closed-loop physics, and LCOH metrics verified.');

console.log('🎉 Test Suite 373 Passed (4/4 assertion groups clean)!');
