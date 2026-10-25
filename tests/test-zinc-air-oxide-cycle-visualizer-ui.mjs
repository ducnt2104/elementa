// tests/test-zinc-air-oxide-cycle-visualizer-ui.mjs
// Test Suite 371: UI Verification for Zinc-Zinc Oxide Solar Cycle Visualizer & Codex Integration

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Running Test Suite 371: Zinc-Zinc Oxide (Zn/ZnO) Solar Cycle Visualizer UI Verification...');

// 1. Verify Component File Existence and Content
console.log('  1. Verifying ZincAirOxideCycleVisualizer.tsx source code...');
const visualizerPath = path.join(rootDir, 'src', 'components', 'visualizations', 'ZincAirOxideCycleVisualizer.tsx');
assert(fs.existsSync(visualizerPath), 'ZincAirOxideCycleVisualizer.tsx file must exist');

const visualizerSrc = fs.readFileSync(visualizerPath, 'utf8');

// Check tab definitions
assert(visualizerSrc.includes("'TWO_STEP_SOLAR_REACTIONS'"), 'Visualizer must have TWO_STEP_SOLAR_REACTIONS tab');
assert(visualizerSrc.includes("'SOLAR_TO_HYDROGEN_STH'"), 'Visualizer must have SOLAR_TO_HYDROGEN_STH tab');
assert(visualizerSrc.includes("'GREEN_H2_ECONOMICS'"), 'Visualizer must have GREEN_H2_ECONOMICS tab');

// Check domain engine imports
assert(visualizerSrc.includes('calculateZnZnoCyclePerformance'), 'Visualizer must import calculateZnZnoCyclePerformance');

// Check SVG elements
assert(visualizerSrc.includes('LÒ QUANG NHIỆT'), 'Visualizer SVG must render Solar Cavity Receiver');
assert(visualizerSrc.includes('BÌNH THỦY PHÂN'), 'Visualizer SVG must render Hydrolyzer Reactor');
assert(visualizerSrc.includes('Tập Trung 3500 Suns'), 'Visualizer SVG must indicate solar concentration');
assert(visualizerSrc.includes('KHÍ H₂ NĂNG LƯỢNG XANH'), 'Visualizer SVG must highlight green hydrogen output');
assert(visualizerSrc.includes('Tái Tuần Hoàn Bột ZnO'), 'Visualizer SVG must show closed-loop ZnO recycling');
console.log('  ✓ Visualizer component source, tabs, and SVG architecture verified.');

// 2. Verify PeriodicCodexTab Integration
console.log('  2. Verifying PeriodicCodexTab integration...');
const codexPath = path.join(rootDir, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexSrc = fs.readFileSync(codexPath, 'utf8');

assert(codexSrc.includes("import { ZincAirOxideCycleVisualizer } from './visualizations/ZincAirOxideCycleVisualizer'"),
  'PeriodicCodexTab must import ZincAirOxideCycleVisualizer');

assert(codexSrc.includes("'ZINC_AIR_OXIDE_SOLAR_CYCLE'"),
  'PeriodicCodexTab state union must contain ZINC_AIR_OXIDE_SOLAR_CYCLE');

assert(codexSrc.includes("setActiveMainTab('ZINC_AIR_OXIDE_SOLAR_CYCLE')"),
  'PeriodicCodexTab must contain button to switch to ZINC_AIR_OXIDE_SOLAR_CYCLE');

assert(codexSrc.includes("<ZincAirOxideCycleVisualizer />"),
  'PeriodicCodexTab must render <ZincAirOxideCycleVisualizer />');
console.log('  ✓ PeriodicCodexTab navigation button and conditional render block verified.');

// 3. Verify Vite Configuration Chunking
console.log('  3. Verifying vite.config.ts chunking...');
const vitePath = path.join(rootDir, 'vite.config.ts');
const viteSrc = fs.readFileSync(vitePath, 'utf8');

assert(viteSrc.includes('ZincAirOxide'),
  'vite.config.ts energyKeywords must include ZincAirOxide');
console.log('  ✓ vite.config.ts chunking keyword confirmed for chemistry-visualizers-energy.');

// 4. Verify Interactive Controls and Scientific Accuracy
console.log('  4. Verifying Interactive Controls and Scientific Accuracy...');
assert(visualizerSrc.includes('solarThermalCapacityMWth'), 'Visualizer must have solar thermal power control');
assert(visualizerSrc.includes('hydrolysisTempC'), 'Visualizer must have hydrolysis temperature control');
assert(visualizerSrc.includes('quenchEffectiveness'), 'Visualizer must have quench effectiveness control');
assert(visualizerSrc.includes('ZnO(r) ➔ Zn(hơi) + ½ O₂(k)'), 'Visualizer must show Step 1 reaction equation');
assert(visualizerSrc.includes('Zn(r) + H₂O(hơi) ➔ ZnO(r) + H₂(k)'), 'Visualizer must show Step 2 reaction equation');
console.log('  ✓ Interactive controls, two-step thermochemical physics, and green H2 economics verified.');

console.log('🎉 Test Suite 371 Passed (4/4 assertion groups clean)!');
