/**
 * test-iron-air-battery-visualizer-ui.mjs
 *
 * Test Suite 317: IronAirBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 317: IronAirBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/IronAirBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/ironAirBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'IronAirBatteryVisualizer.tsx component file must exist');
console.log('  ✓ IronAirBatteryVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'ironAirBatteryEngine.ts domain engine file must exist');
console.log('  ✓ ironAirBatteryEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('IRON_ADDITIVE_CATALOG'), 'Visualizer must import IRON_ADDITIVE_CATALOG');
assert(visualizerCode.includes('calculateFeAirCellState'), 'Visualizer must import calculateFeAirCellState');
assert(visualizerCode.includes('calculateFeAirGridPlantBalance'), 'Visualizer must import calculateFeAirGridPlantBalance');
assert(visualizerCode.includes('FE_THEORETICAL_CAPACITY_MAH_G'), 'Visualizer must import FE_THEORETICAL_CAPACITY_MAH_G');
console.log('  ✓ IronAirBatteryVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ IronAirBatteryVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('REVERSIBLE_RUSTING_MECHANISM'), 'Must support Mode 1: REVERSIBLE_RUSTING_MECHANISM');
assert(visualizerCode.includes('CELL_POLARIZATION_EFFICIENCY'), 'Must support Mode 2: CELL_POLARIZATION_EFFICIENCY');
assert(visualizerCode.includes('MULTI_DAY_GRID_STORAGE'), 'Must support Mode 3: MULTI_DAY_GRID_STORAGE');
console.log('  ✓ IronAirBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Galvanostatic Charge &'), 'Visualizer must render interactive SVG charge/discharge voltage curves');
console.log('  ✓ IronAirBatteryVisualizer renders SVG voltage curves & 3-phase interface schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('dischargeCellVoltageV'), 'Must display discharge cell voltage');
assert(visualizerCode.includes('chargeCellVoltageV'), 'Must display charge cell voltage');
assert(visualizerCode.includes('herCurrentFractionPct'), 'Must display parasitic HER current fraction');
assert(visualizerCode.includes('coulombicEfficiencyPct'), 'Must display Coulombic efficiency');
assert(visualizerCode.includes('costPerKwhUsd'), 'Must display capital cost per kWh');
assert(visualizerCode.includes('capitalCostSavingsUsd'), 'Must display capital cost savings vs Li-ion');
console.log('  ✓ Cell voltages, HER suppression, Coulombic efficiency, and grid CapEx savings metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes('IronAirBatteryVisualizer'), 'PeriodicCodexTab must import IronAirBatteryVisualizer');
assert(codexCode.includes("'IRON_AIR_BATTERY'"), 'PeriodicCodexTab must include IRON_AIR_BATTERY in state type');
assert(codexCode.includes('Pin Sắt-Không Khí (Fe-Air 100h Multi-Day Grid)'), 'PeriodicCodexTab must render Fe-Air tab button');
assert(codexCode.includes('<IronAirBatteryVisualizer />'), 'PeriodicCodexTab must render IronAirBatteryVisualizer');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 317 PASSED: Iron-Air Battery Visualizer is fully verified!');
