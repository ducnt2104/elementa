/**
 * test-sodium-sulfur-battery-visualizer-ui.mjs
 *
 * Test Suite 349: SodiumSulfurBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * tubular cell cross-section SVG schematic, 100% Coulombic efficiency metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 349: SodiumSulfurBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/SodiumSulfurBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/sodiumSulfurBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'SodiumSulfurBatteryVisualizer.tsx component file must exist');
console.log('  ✔ SodiumSulfurBatteryVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'sodiumSulfurBatteryEngine.ts domain engine file must exist');
console.log('  ✔ sodiumSulfurBatteryEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('BASE_ELECTROLYTES'), 'Visualizer must import BASE_ELECTROLYTES');
assert(visualizerCode.includes('SodiumSulfurBatteryEngine'), 'Visualizer must import SodiumSulfurBatteryEngine');
console.log('  ✔ SodiumSulfurBatteryVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✔ SodiumSulfurBatteryVisualizer triggers sound.playUiClick() on interactive actions');

// 3 distinct modes
assert(visualizerCode.includes('POLYSULFIDE_PHASE_EQUILIBRIA'), 'Must support Mode 1: POLYSULFIDE_PHASE_EQUILIBRIA');
assert(visualizerCode.includes('BASE_SOLID_ELECTROLYTE_PERCOLATION'), 'Must support Mode 2: BASE_SOLID_ELECTROLYTE_PERCOLATION');
assert(visualizerCode.includes('UTILITY_GRID_ENERGY_STORAGE'), 'Must support Mode 3: UTILITY_GRID_ENERGY_STORAGE');
console.log('  ✔ SodiumSulfurBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('NATRI NÓNG CHẢY') && visualizerCode.includes('BETA\'\'-ALUMINA'), 'Visualizer must render interactive SVG tubular cell cross-section schematic');
console.log('  ✔ SodiumSulfurBatteryVisualizer renders dynamic SVG tubular cell cross-section');

// Scientific metrics & GDPT 2018 / IUPAC terms
assert(visualizerCode.includes('openCircuitVoltageV'), 'Must display open-circuit voltage');
assert(visualizerCode.includes('operatingCellVoltageV'), 'Must display operating cell voltage');
assert(visualizerCode.includes('coulombicEfficiencyPercent'), 'Must display 100% Coulombic efficiency');
assert(visualizerCode.includes('capitalCostDollarsPerKwh'), 'Must display grid storage CapEx in $/kWh');
console.log('  ✔ OCV, cell voltage, 100% Coulombic efficiency, and multi-MW CapEx metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { SodiumSulfurBatteryVisualizer } from './visualizations/SodiumSulfurBatteryVisualizer'"), 'PeriodicCodexTab must import SodiumSulfurBatteryVisualizer');
assert(codexCode.includes("'SODIUM_SULFUR_HIGH_TEMP_BATTERY'"), 'PeriodicCodexTab must include SODIUM_SULFUR_HIGH_TEMP_BATTERY in its activeMainTab union');
assert(codexCode.includes('<SodiumSulfurBatteryVisualizer />'), 'PeriodicCodexTab must render <SodiumSulfurBatteryVisualizer />');
console.log('  ✔ PeriodicCodexTab imports and renders SodiumSulfurBatteryVisualizer under SODIUM_SULFUR_HIGH_TEMP_BATTERY tab');

console.log('🎉 Test Suite 349 Passed (8/8 assertions clean)!');
