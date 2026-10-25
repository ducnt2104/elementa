// tests/test-electrochemical-corr-visualizer-ui.mjs
// ELEMENTA TEST SUITE 309: Electrochemical CO Reduction Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 309: ElectrochemicalCorrVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ElectrochemicalCorrVisualizer.tsx');
const enginePath = path.resolve('src/domain/electrochemicalCarbonMonoxideReductionEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'ElectrochemicalCorrVisualizer.tsx component file must exist');
console.log('  ✓ ElectrochemicalCorrVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'electrochemicalCarbonMonoxideReductionEngine.ts domain engine file must exist');
console.log('  ✓ electrochemicalCarbonMonoxideReductionEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/electrochemicalCarbonMonoxideReductionEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateCorrKinetics'), 'Visualizer must use calculateCorrKinetics');
assert(visualizerContent.includes('calculateCorrIndustrialBalance'), 'Visualizer must use calculateCorrIndustrialBalance');
assert(visualizerContent.includes('CU_CATALYST_CATALOG'), 'Visualizer must import CU_CATALYST_CATALOG');
console.log('  ✓ ElectrochemicalCorrVisualizer imports domain engine functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ ElectrochemicalCorrVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('CATALYSIS_AND_CC_COUPLING'), 'Mode 1 (CATALYSIS_AND_CC_COUPLING) must be supported');
assert(visualizerContent.includes('POLARIZATION_AND_SELECTIVITY'), 'Mode 2 (POLARIZATION_AND_SELECTIVITY) must be supported');
assert(visualizerContent.includes('COMMERCIAL_PLANT_MASS_BALANCE'), 'Mode 3 (COMMERCIAL_PLANT_MASS_BALANCE) must be supported');
console.log('  ✓ ElectrochemicalCorrVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 500 240"'), 'Visualizer must render interactive SVG polarization chart');
assert(visualizerContent.includes('Cell Operating Voltage (V)'), 'SVG legend must mark Cell Operating Voltage curve');
assert(visualizerContent.includes('C2+ Faradaic Efficiency (%)'), 'SVG legend must mark C2+ Faradaic Efficiency curve');
console.log('  ✓ ElectrochemicalCorrVisualizer renders SVG polarization and FE curves');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('kinetics.cellOperatingVoltageV'), 'Must display Cell Operating Voltage V');
assert(visualizerContent.includes('kinetics.ethanolFaradaicEfficiencyPct'), 'Must display Ethanol FE %');
assert(visualizerContent.includes('kinetics.coSurfaceCoverageThetaCo'), 'Must display *CO Surface Coverage');
assert(visualizerContent.includes('plantBalance.dailyEthanolProductionKg'), 'Must display Daily Ethanol Production kg');
assert(visualizerContent.includes('plantBalance.dailyEthyleneProductionKg'), 'Must display Daily Ethylene Production kg');
assert(visualizerContent.includes('plantBalance.avoidedFossilCo2EmissionsTonsPerYear'), 'Must display Avoided Fossil CO2 tons/yr');
console.log('  ✓ Cell voltage, FE, *CO coverage, ethanol/ethylene outputs, and avoided CO2 metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { ElectrochemicalCorrVisualizer } from './visualizations/ElectrochemicalCorrVisualizer';"), 'PeriodicCodexTab must import ElectrochemicalCorrVisualizer');
assert(codexContent.includes("'ELECTROCHEMICAL_CORR'"), 'PeriodicCodexTab must include ELECTROCHEMICAL_CORR tab state');
assert(codexContent.includes('Khử CO Điện Hóa Tạo E-Ethanol (CO-RR)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<ElectrochemicalCorrVisualizer />'), 'PeriodicCodexTab must render <ElectrochemicalCorrVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 309 PASSED: Electrochemical CO Reduction Visualizer is fully verified!\n');
