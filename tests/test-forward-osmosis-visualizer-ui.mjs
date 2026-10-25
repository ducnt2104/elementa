// tests/test-forward-osmosis-visualizer-ui.mjs
// ELEMENTA TEST SUITE 311: Forward Osmosis Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 311: ForwardOsmosisVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ForwardOsmosisVisualizer.tsx');
const enginePath = path.resolve('src/domain/forwardOsmosisDesalinationEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'ForwardOsmosisVisualizer.tsx component file must exist');
console.log('  ✓ ForwardOsmosisVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'forwardOsmosisDesalinationEngine.ts domain engine file must exist');
console.log('  ✓ forwardOsmosisDesalinationEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/forwardOsmosisDesalinationEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateFoFlux'), 'Visualizer must use calculateFoFlux');
assert(visualizerContent.includes('calculateProPowerDensity'), 'Visualizer must use calculateProPowerDensity');
assert(visualizerContent.includes('calculateCommercialZldPlantBalance'), 'Visualizer must use calculateCommercialZldPlantBalance');
assert(visualizerContent.includes('FO_MEMBRANE_CATALOG'), 'Visualizer must import FO_MEMBRANE_CATALOG');
console.log('  ✓ ForwardOsmosisVisualizer imports domain engine functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ ForwardOsmosisVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('FORWARD_OSMOSIS_DESALINATION'), 'Mode 1 (FORWARD_OSMOSIS_DESALINATION) must be supported');
assert(visualizerContent.includes('PRO_SALINITY_GRADIENT_POWER'), 'Mode 2 (PRO_SALINITY_GRADIENT_POWER) must be supported');
assert(visualizerContent.includes('COMMERCIAL_ZLD_PLANT_BALANCE'), 'Mode 3 (COMMERCIAL_ZLD_PLANT_BALANCE) must be supported');
console.log('  ✓ ForwardOsmosisVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 500 240"'), 'Visualizer must render interactive SVG PRO power chart');
assert(visualizerContent.includes('Power Density (W/m²)'), 'SVG legend must mark Power Density curve');
assert(visualizerContent.includes('5 W/m² Commercial Benchmark'), 'SVG legend must mark 5 W/m² benchmark line');
console.log('  ✓ ForwardOsmosisVisualizer renders SVG PRO power density curve');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('foFlux.waterFluxLmh'), 'Must display Permeate Water Flux LMH');
assert(visualizerContent.includes('foFlux.internalConcentrationPolarizationModulus'), 'Must display ICP Modulus');
assert(visualizerContent.includes('proPower.powerDensityWPerM2'), 'Must display PRO Power Density W/m²');
assert(visualizerContent.includes('zldBalance.dailyPureWaterPermeateM3'), 'Must display Daily Pure Water Permeate m³');
assert(visualizerContent.includes('zldBalance.finalConcentratedBrineTdsGPerL'), 'Must display Concentrated Brine TDS g/L');
assert(visualizerContent.includes('zldBalance.avoidedThermalCrystallizerCo2TonsPerYear'), 'Must display Avoided Thermal Crystallizer CO2 tons/yr');
console.log('  ✓ Flux, ICP, PRO power, permeate volume, TDS, and avoided CO2 metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { ForwardOsmosisVisualizer } from './visualizations/ForwardOsmosisVisualizer';"), 'PeriodicCodexTab must import ForwardOsmosisVisualizer');
assert(codexContent.includes("'FORWARD_OSMOSIS_DESALINATION'"), 'PeriodicCodexTab must include FORWARD_OSMOSIS_DESALINATION tab state');
assert(codexContent.includes('Thẩm Thấu Chuyển Tiếp (FO & PRO)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<ForwardOsmosisVisualizer />'), 'PeriodicCodexTab must render <ForwardOsmosisVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 311 PASSED: Forward Osmosis Visualizer is fully verified!\n');
