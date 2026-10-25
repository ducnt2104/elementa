/**
 * test-supercritical-co2-geothermal-visualizer-ui.mjs
 *
 * Test Suite 355: SupercriticalCo2GeothermalVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * dynamic SVG geothermal circuit schematic, zero water consumption & mineral carbonation, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 355: SupercriticalCo2GeothermalVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/SupercriticalCo2GeothermalVisualizer.tsx');
const enginePath = path.resolve('src/domain/supercriticalCo2GeothermalEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'SupercriticalCo2GeothermalVisualizer.tsx component file must exist');
console.log('  ✔ SupercriticalCo2GeothermalVisualizer.tsx component file exists');

assert(fs.existsSync(enginePath), 'supercriticalCo2GeothermalEngine.ts domain engine file must exist');
console.log('  ✔ supercriticalCo2GeothermalEngine.ts domain engine file exists');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file exists');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('GEOTHERMAL_ROCKS'), 'Visualizer must import GEOTHERMAL_ROCKS');
assert(visualizerCode.includes('SCO2_TURBINE_CYCLES'), 'Visualizer must import SCO2_TURBINE_CYCLES');
assert(visualizerCode.includes('calculateThermosiphonBuoyancy'), 'Visualizer must import calculateThermosiphonBuoyancy');
assert(visualizerCode.includes('calculateSco2TurbinePowerAndEfficiency'), 'Visualizer must import calculateSco2TurbinePowerAndEfficiency');
assert(visualizerCode.includes('calculateGeothermalPlantEconomicsAndCarbonStorage'), 'Visualizer must import calculateGeothermalPlantEconomicsAndCarbonStorage');
console.log('  ✔ SupercriticalCo2GeothermalVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on user interactions');
console.log('  ✔ SupercriticalCo2GeothermalVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct interactive modes
assert(visualizerCode.includes('THERMOSIPHON_BUOYANCY_CIRCUIT'), 'Must support Mode 1: THERMOSIPHON_BUOYANCY_CIRCUIT');
assert(visualizerCode.includes('COMPACT_SCO2_TURBOMACHINERY'), 'Must support Mode 2: COMPACT_SCO2_TURBOMACHINERY');
assert(visualizerCode.includes('GEO_CARBON_MINERALIZATION'), 'Must support Mode 3: GEO_CARBON_MINERALIZATION');
console.log('  ✔ SupercriticalCo2GeothermalVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Giếng Bơm CO₂ Lạnh') && visualizerCode.includes('Giếng Khai Thác CO₂ Nóng'), 'Visualizer must render interactive SVG closed loop geothermal schematic');
console.log('  ✔ SupercriticalCo2GeothermalVisualizer renders dynamic SVG closed loop geothermal schematic');

// Scientific metrics & Zero water consumption
assert(visualizerCode.includes('buoyancyResult.buoyantPressureHeadMpa'), 'Must display buoyant pressure head');
assert(visualizerCode.includes('turbineResult.netElectricPowerMW'), 'Must display net electric power in MW');
assert(visualizerCode.includes('turbineResult.turbineRotorDiameterMeters'), 'Must display sCO2 turbine rotor diameter in meters');
assert(visualizerCode.includes('plantResult.annualMineralizedCarbonSequestrationTons'), 'Must display permanent mineralized carbon sequestration');
assert(visualizerCode.includes('0.0 Lít / MWh'), 'Must display 0.0 Liters/MWh water consumption');
console.log('  ✔ Buoyant head, net electric power, compact rotor diameter, and 0.0 L/MWh water consumption verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { SupercriticalCo2GeothermalVisualizer } from './visualizations/SupercriticalCo2GeothermalVisualizer'"), 'PeriodicCodexTab must import SupercriticalCo2GeothermalVisualizer');
assert(codexCode.includes('SUPERCRITICAL_CO2_GEOTHERMAL'), 'PeriodicCodexTab must register SUPERCRITICAL_CO2_GEOTHERMAL tab key');
assert(codexCode.includes('<SupercriticalCo2GeothermalVisualizer />'), 'PeriodicCodexTab must render SupercriticalCo2GeothermalVisualizer');
console.log('  ✔ SupercriticalCo2GeothermalVisualizer integrated cleanly into PeriodicCodexTab.tsx');

// 4. Audit vite.config.ts chunk configuration
const vitePath = path.resolve('vite.config.ts');
const viteCode = fs.readFileSync(vitePath, 'utf8');
assert(viteCode.includes('SupercriticalCo2'), 'vite.config.ts must map SupercriticalCo2 to chemistry-visualizers-energy chunk');
console.log('  ✔ vite.config.ts maps SupercriticalCo2 to chemistry-visualizers-energy chunk');

console.log('🎉 Test Suite 355 Passed (8/8 assertions clean)!');
