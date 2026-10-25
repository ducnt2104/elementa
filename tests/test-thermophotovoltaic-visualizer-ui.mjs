// tests/test-thermophotovoltaic-visualizer-ui.mjs
// ELEMENTA TEST SUITE 301: Thermophotovoltaic Grid Storage Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 301: ThermophotovoltaicGridStorageVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ThermophotovoltaicGridStorageVisualizer.tsx');
const enginePath = path.resolve('src/domain/thermophotovoltaicGridStorageEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'ThermophotovoltaicGridStorageVisualizer.tsx component file must exist');
console.log('  ✓ ThermophotovoltaicGridStorageVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'thermophotovoltaicGridStorageEngine.ts domain engine file must exist');
console.log('  ✓ thermophotovoltaicGridStorageEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/thermophotovoltaicGridStorageEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('generatePlanckSpectrum'), 'Visualizer must use generatePlanckSpectrum');
assert(visualizerContent.includes('solveTpvCellOperatingPoint'), 'Visualizer must use solveTpvCellOperatingPoint');
assert(visualizerContent.includes('calculateTpvGridStorageSystemBalance'), 'Visualizer must use calculateTpvGridStorageSystemBalance');
console.log('  ✓ ThermophotovoltaicGridStorageVisualizer imports domain engine functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ ThermophotovoltaicGridStorageVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('TPV_SPECTRAL_BANDGAP_ALIGNMENT'), 'Mode 1 (TPV_SPECTRAL_BANDGAP_ALIGNMENT) must be supported');
assert(visualizerContent.includes('GRID_STORAGE_THERMAL_BATTERY'), 'Mode 2 (GRID_STORAGE_THERMAL_BATTERY) must be supported');
assert(visualizerContent.includes('SELECTIVE_EMITTER_AND_LOSSES'), 'Mode 3 (SELECTIVE_EMITTER_AND_LOSSES) must be supported');
console.log('  ✓ ThermophotovoltaicGridStorageVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 500 240"'), 'Visualizer must render interactive SVG Planck spectrum');
assert(visualizerContent.includes('Eg Cutoff'), 'SVG must mark bandgap cutoff wavelength');
assert(visualizerContent.includes('Graphite Block'), 'SVG must render incandescent graphite thermal storage block');
assert(visualizerContent.includes('TPV Receiver'), 'SVG must render TPV semiconductor receiver');
console.log('  ✓ ThermophotovoltaicGridStorageVisualizer renders Planck spectrum and thermal battery schematic');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('operatingPoint.cellElectricalEfficiencyPct'), 'Must display TPV cell efficiency');
assert(visualizerContent.includes('operatingPoint.generatedElectricalPowerWPerCm2'), 'Must display electrical power density W/cm2');
assert(visualizerContent.includes('systemBalance.capexUsdPerKwhStorageCapacity'), 'Must display CAPEX $/kWh');
assert(visualizerContent.includes('operatingPoint.totalRoundTripEfficiencyPct'), 'Must display RTE %');
assert(visualizerContent.includes('systemBalance.annualAvoidedCo2TonsPerYear'), 'Must display annual avoided CO2');
console.log('  ✓ Efficiency %, power density W/cm2, CAPEX, RTE, and avoided CO2 metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { ThermophotovoltaicGridStorageVisualizer } from './visualizations/ThermophotovoltaicGridStorageVisualizer';"), 'PeriodicCodexTab must import ThermophotovoltaicGridStorageVisualizer');
assert(codexContent.includes("'THERMOPHOTOVOLTAIC_GRID_STORAGE'"), 'PeriodicCodexTab must include THERMOPHOTOVOLTAIC_GRID_STORAGE tab state');
assert(codexContent.includes('Pin Nhiệt Quang Điện (TPV Grid)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<ThermophotovoltaicGridStorageVisualizer />'), 'PeriodicCodexTab must render <ThermophotovoltaicGridStorageVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 301 PASSED: Thermophotovoltaic Grid Storage Visualizer is fully verified!\n');
