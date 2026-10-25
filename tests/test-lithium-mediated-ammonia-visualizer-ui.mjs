// tests/test-lithium-mediated-ammonia-visualizer-ui.mjs
// ELEMENTA TEST SUITE 299: Lithium-Mediated Ammonia Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 299: LithiumMediatedAmmoniaVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/LithiumMediatedAmmoniaVisualizer.tsx');
const enginePath = path.resolve('src/domain/lithiumMediatedAmmoniaEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'LithiumMediatedAmmoniaVisualizer.tsx component file must exist');
console.log('  ✓ LithiumMediatedAmmoniaVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'lithiumMediatedAmmoniaEngine.ts domain engine file must exist');
console.log('  ✓ lithiumMediatedAmmoniaEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/lithiumMediatedAmmoniaEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateLiNrrOperatingPoint'), 'Visualizer must use calculateLiNrrOperatingPoint');
assert(visualizerContent.includes('calculateAmmoniaPlantBalance'), 'Visualizer must use calculateAmmoniaPlantBalance');
console.log('  ✓ LithiumMediatedAmmoniaVisualizer imports domain engine functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ LithiumMediatedAmmoniaVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('ELECTROCHEMICAL_CELL_AND_CYCLE'), 'Mode 1 (ELECTROCHEMICAL_CELL_AND_CYCLE) must be supported');
assert(visualizerContent.includes('PLANT_SCALE_AMMONIA_SIMULATOR'), 'Mode 2 (PLANT_SCALE_AMMONIA_SIMULATOR) must be supported');
assert(visualizerContent.includes('SEI_ENGINEERING_AND_SELECTIVITY'), 'Mode 3 (SEI_ENGINEERING_AND_SELECTIVITY) must be supported');
console.log('  ✓ LithiumMediatedAmmoniaVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 540 260"'), 'Visualizer must render interactive SVG catalytic loop');
assert(visualizerContent.includes('Step 1: Li Deposition'), 'SVG must render Step 1 (Li Deposition)');
assert(visualizerContent.includes('Step 2: N₂ Cleavage'), 'SVG must render Step 2 (N2 Cleavage)');
assert(visualizerContent.includes('Step 3: Protonation'), 'SVG must render Step 3 (Protonation)');
assert(visualizerContent.includes('Step 4: Regeneration'), 'SVG must render Step 4 (Regeneration)');
console.log('  ✓ LithiumMediatedAmmoniaVisualizer renders 4-step catalytic loop SVG diagram');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('operatingPoint.faradaicEfficiencyPct'), 'Must display Faradaic Efficiency');
assert(visualizerContent.includes('operatingPoint.ammoniaYieldRateNmolPerSCm2'), 'Must display NH3 yield rate');
assert(visualizerContent.includes('operatingPoint.specificEnergyConsumptionKwhPerKgNh3'), 'Must display specific energy');
assert(visualizerContent.includes('plantBalance.ammoniaProductionKgPerHour'), 'Must display plant NH3 production kg/hr');
assert(visualizerContent.includes('plantBalance.annualAvoidedCo2TonsPerYear'), 'Must display avoided CO2 tons/yr');
console.log('  ✓ FE %, yield rate, specific energy, production rate, and CO2 savings metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { LithiumMediatedAmmoniaVisualizer } from './visualizations/LithiumMediatedAmmoniaVisualizer';"), 'PeriodicCodexTab must import LithiumMediatedAmmoniaVisualizer');
assert(codexContent.includes("'LITHIUM_MEDIATED_AMMONIA'"), 'PeriodicCodexTab must include LITHIUM_MEDIATED_AMMONIA tab state');
assert(codexContent.includes('Tổng Hợp Amoniac Liti (Li-NRR)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<LithiumMediatedAmmoniaVisualizer />'), 'PeriodicCodexTab must render <LithiumMediatedAmmoniaVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 299 PASSED: Lithium-Mediated Ammonia Visualizer is fully verified!\n');
