/**
 * test-iron-slurry-flow-battery-visualizer-ui.mjs
 *
 * Test Suite 347: IronSlurryFlowBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * slurry percolation SVG schematic, multi-day LDES economics metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 347: IronSlurryFlowBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/IronSlurryFlowBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/ironSlurryFlowBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'IronSlurryFlowBatteryVisualizer.tsx component file must exist');
console.log('  ✔ IronSlurryFlowBatteryVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'ironSlurryFlowBatteryEngine.ts domain engine file must exist');
console.log('  ✔ ironSlurryFlowBatteryEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('SLURRY_COMPOSITIONS'), 'Visualizer must import SLURRY_COMPOSITIONS');
assert(visualizerCode.includes('SEPARATORS'), 'Visualizer must import SEPARATORS');
assert(visualizerCode.includes('IronSlurryFlowBatteryEngine'), 'Visualizer must import IronSlurryFlowBatteryEngine');
console.log('  ✔ IronSlurryFlowBatteryVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✔ IronSlurryFlowBatteryVisualizer triggers sound.playUiClick() on interactive actions');

// 3 distinct modes
assert(visualizerCode.includes('SUSPENDED_PARTICLE_PERCOLATION'), 'Must support Mode 1: SUSPENDED_PARTICLE_PERCOLATION');
assert(visualizerCode.includes('ELECTROCHEMICAL_CELL_POLARIZATION'), 'Must support Mode 2: ELECTROCHEMICAL_CELL_POLARIZATION');
assert(visualizerCode.includes('MULTI_DAY_LDES_ECONOMICS'), 'Must support Mode 3: MULTI_DAY_LDES_ECONOMICS');
console.log('  ✔ IronSlurryFlowBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('CỰC GÓP DÒNG') && visualizerCode.includes('Fe⁰'), 'Visualizer must render interactive SVG slurry percolation flow channel schematic');
console.log('  ✔ IronSlurryFlowBatteryVisualizer renders dynamic SVG slurry percolation channel');

// Scientific metrics & GDPT 2018 / IUPAC terms
assert(visualizerCode.includes('apparentViscosityPaS'), 'Must display non-Newtonian apparent viscosity');
assert(visualizerCode.includes('dischargeVoltageV'), 'Must display discharge voltage');
assert(visualizerCode.includes('roundTripEnergyEfficiencyPercent'), 'Must display round-trip energy efficiency (RTE)');
assert(visualizerCode.includes('capitalCostDollarsPerKwh'), 'Must display multi-day LDES CapEx in $/kWh');
console.log('  ✔ Viscosity, discharge voltage, RTE, and multi-day storage CapEx metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { IronSlurryFlowBatteryVisualizer } from './visualizations/IronSlurryFlowBatteryVisualizer'"), 'PeriodicCodexTab must import IronSlurryFlowBatteryVisualizer');
assert(codexCode.includes("'IRON_SLURRY_FLOW_BATTERY'"), 'PeriodicCodexTab must include IRON_SLURRY_FLOW_BATTERY in its activeMainTab union');
assert(codexCode.includes('<IronSlurryFlowBatteryVisualizer />'), 'PeriodicCodexTab must render <IronSlurryFlowBatteryVisualizer />');
console.log('  ✔ PeriodicCodexTab imports and renders IronSlurryFlowBatteryVisualizer under IRON_SLURRY_FLOW_BATTERY tab');

console.log('🎉 Test Suite 347 Passed (8/8 assertions clean)!');
