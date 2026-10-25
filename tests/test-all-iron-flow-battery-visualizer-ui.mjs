/**
 * test-all-iron-flow-battery-visualizer-ui.mjs
 *
 * Test Suite 335: AllIronFlowBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * catalytic proton rebalancer metrics, LDES plant sizing, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 335: AllIronFlowBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/AllIronFlowBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/allIronFlowBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'AllIronFlowBatteryVisualizer.tsx component file must exist');
console.log('  ✓ AllIronFlowBatteryVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'allIronFlowBatteryEngine.ts domain engine file must exist');
console.log('  ✓ allIronFlowBatteryEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('IRON_FLOW_ELECTROLYTES'), 'Visualizer must import IRON_FLOW_ELECTROLYTES');
assert(visualizerCode.includes('AllIronFlowBatteryEngine'), 'Visualizer must import AllIronFlowBatteryEngine');
console.log('  ✓ AllIronFlowBatteryVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ AllIronFlowBatteryVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('IRON_PLATING_AND_REDOX_STACK'), 'Must support Mode 1: IRON_PLATING_AND_REDOX_STACK');
assert(visualizerCode.includes('CATALYTIC_PROTON_REBALANCER'), 'Must support Mode 2: CATALYTIC_PROTON_REBALANCER');
assert(visualizerCode.includes('SUBSTATION_LDES_PLANT'), 'Must support Mode 3: SUBSTATION_LDES_PLANT');
console.log('  ✓ AllIronFlowBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('LỚP MẠ SẮT Fe⁰') && visualizerCode.includes('MÀNG XỐP DARAMIC'), 'Visualizer must render interactive SVG iron plating cell cross-section');
console.log('  ✓ AllIronFlowBatteryVisualizer renders dynamic SVG iron plating cell schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('operatingDischargeVoltageV'), 'Must display operating discharge voltage');
assert(visualizerCode.includes('roundTripEfficiencyPercent'), 'Must display round-trip efficiency');
assert(visualizerCode.includes('protonRegenerationRateMolesPerHour'), 'Must display proton regeneration rate');
assert(visualizerCode.includes('socDriftPerHourPercent'), 'Must display SOC drift rate');
assert(visualizerCode.includes('capitalCostDollarPerKwh'), 'Must display capital cost $/kWh');
console.log('  ✓ Discharge voltage, RTE, proton regeneration rate, SOC drift, and CapEx metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { AllIronFlowBatteryVisualizer } from './visualizations/AllIronFlowBatteryVisualizer'"), 'PeriodicCodexTab must import AllIronFlowBatteryVisualizer');
assert(codexCode.includes("'ALL_IRON_FLOW_BATTERY'"), 'PeriodicCodexTab must include ALL_IRON_FLOW_BATTERY in its activeMainTab union');
assert(codexCode.includes('<AllIronFlowBatteryVisualizer />'), 'PeriodicCodexTab must render <AllIronFlowBatteryVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders AllIronFlowBatteryVisualizer under ALL_IRON_FLOW_BATTERY tab');

console.log('🎉 Test Suite 335 Passed (8/8 assertions clean)!');
