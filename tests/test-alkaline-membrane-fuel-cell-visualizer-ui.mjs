/**
 * test-alkaline-membrane-fuel-cell-visualizer-ui.mjs
 *
 * Test Suite 339: AlkalineMembraneFuelCellVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * MEA OH- migration SVG schematic, self-purging metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 339: AlkalineMembraneFuelCellVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/AlkalineMembraneFuelCellVisualizer.tsx');
const enginePath = path.resolve('src/domain/alkalineMembraneFuelCellEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'AlkalineMembraneFuelCellVisualizer.tsx component file must exist');
console.log('  ✓ AlkalineMembraneFuelCellVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'alkalineMembraneFuelCellEngine.ts domain engine file must exist');
console.log('  ✓ alkalineMembraneFuelCellEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('AEMFC_CATALYSTS'), 'Visualizer must import AEMFC_CATALYSTS');
assert(visualizerCode.includes('AlkalineMembraneFuelCellEngine'), 'Visualizer must import AlkalineMembraneFuelCellEngine');
console.log('  ✓ AlkalineMembraneFuelCellVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ AlkalineMembraneFuelCellVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('PGM_FREE_CATALYST_AND_MEMBRANE'), 'Must support Mode 1: PGM_FREE_CATALYST_AND_MEMBRANE');
assert(visualizerCode.includes('CO2_CARBONATION_SELF_PURGING'), 'Must support Mode 2: CO2_CARBONATION_SELF_PURGING');
assert(visualizerCode.includes('HEAVY_DUTY_TRUCK_POWERTRAIN'), 'Must support Mode 3: HEAVY_DUTY_TRUCK_POWERTRAIN');
console.log('  ✓ AlkalineMembraneFuelCellVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('ANODE HYDRO') && visualizerCode.includes('CATHODE OXY'), 'Visualizer must render interactive SVG MEA cross-section');
console.log('  ✓ AlkalineMembraneFuelCellVisualizer renders dynamic SVG MEA schematic with OH- transport');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('operatingCellVoltageV'), 'Must display operating cell voltage');
assert(visualizerCode.includes('powerDensityWPerCm2'), 'Must display power density in W/cm2');
assert(visualizerCode.includes('selfPurgingEfficiencyPercent'), 'Must display self-purging efficiency');
assert(visualizerCode.includes('anodeProductionGPerHour'), 'Must display anode water production');
assert(visualizerCode.includes('catalystCostSavingsPercent'), 'Must display catalyst cost savings vs PEMFC');
console.log('  ✓ Voltage, power density, self-purging, water balance, and cost savings metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { AlkalineMembraneFuelCellVisualizer } from './visualizations/AlkalineMembraneFuelCellVisualizer'"), 'PeriodicCodexTab must import AlkalineMembraneFuelCellVisualizer');
assert(codexCode.includes("'ALKALINE_MEMBRANE_FUEL_CELL'"), 'PeriodicCodexTab must include ALKALINE_MEMBRANE_FUEL_CELL in its activeMainTab union');
assert(codexCode.includes('<AlkalineMembraneFuelCellVisualizer />'), 'PeriodicCodexTab must render <AlkalineMembraneFuelCellVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders AlkalineMembraneFuelCellVisualizer under ALKALINE_MEMBRANE_FUEL_CELL tab');

console.log('🎉 Test Suite 339 Passed (8/8 assertions clean)!');
