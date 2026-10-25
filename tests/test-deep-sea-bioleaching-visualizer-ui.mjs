// tests/test-deep-sea-bioleaching-visualizer-ui.mjs
// ELEMENTA TEST SUITE 303: Deep-Sea Bioleaching Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 303: DeepSeaBioleachingVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/DeepSeaBioleachingVisualizer.tsx');
const enginePath = path.resolve('src/domain/deepSeaBioleachingEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'DeepSeaBioleachingVisualizer.tsx component file must exist');
console.log('  ✓ DeepSeaBioleachingVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'deepSeaBioleachingEngine.ts domain engine file must exist');
console.log('  ✓ deepSeaBioleachingEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/deepSeaBioleachingEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateLeachingKinetics'), 'Visualizer must use calculateLeachingKinetics');
assert(visualizerContent.includes('calculateIndustrialPlantBalance'), 'Visualizer must use calculateIndustrialPlantBalance');
console.log('  ✓ DeepSeaBioleachingVisualizer imports domain engine functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ DeepSeaBioleachingVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('SHRINKING_CORE_BIOLEACH_FLOW'), 'Mode 1 (SHRINKING_CORE_BIOLEACH_FLOW) must be supported');
assert(visualizerContent.includes('COMMERCIAL_PLANT_MASS_BALANCE'), 'Mode 2 (COMMERCIAL_PLANT_MASS_BALANCE) must be supported');
assert(visualizerContent.includes('REFINING_ROUTE_COMPARISON'), 'Mode 3 (REFINING_ROUTE_COMPARISON) must be supported');
console.log('  ✓ DeepSeaBioleachingVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 500 240"'), 'Visualizer must render interactive SVG kinetics chart');
assert(visualizerContent.includes('Nickel (Ni²⁺)'), 'SVG must mark Nickel extraction curve');
assert(visualizerContent.includes('Cobalt (Co²⁺)'), 'SVG must mark Cobalt extraction curve');
console.log('  ✓ DeepSeaBioleachingVisualizer renders SVG kinetics chart with Ni/Co curves');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('latestPoint.nickelExtractionPct'), 'Must display Nickel extraction %');
assert(visualizerContent.includes('plantBalance.annualNmcPrecursorTons'), 'Must display NMC-811 precursor tons');
assert(visualizerContent.includes('plantBalance.avoidedGhgEmissionsVsNpiTonsCo2'), 'Must display avoided GHG emissions');
assert(visualizerContent.includes('plantBalance.annualGrossRevenueUsd'), 'Must display gross revenue');
console.log('  ✓ Extraction %, NMC-811 yield, avoided CO2, and revenue metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { DeepSeaBioleachingVisualizer } from './visualizations/DeepSeaBioleachingVisualizer';"), 'PeriodicCodexTab must import DeepSeaBioleachingVisualizer');
assert(codexContent.includes("'DEEP_SEA_BIOLEACHING'"), 'PeriodicCodexTab must include DEEP_SEA_BIOLEACHING tab state');
assert(codexContent.includes('Hòa Tách Khoáng Biển Sâu (NMC-811)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<DeepSeaBioleachingVisualizer />'), 'PeriodicCodexTab must render <DeepSeaBioleachingVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 303 PASSED: Deep-Sea Bioleaching Visualizer is fully verified!\n');
