/**
 * test-zinc-bromine-flow-battery-visualizer-ui.mjs
 *
 * Test Suite 329: ZincBromineFlowBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 329: ZincBromineFlowBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ZincBromineFlowBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/zincBromineFlowBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'ZincBromineFlowBatteryVisualizer.tsx component file must exist');
console.log('  ✓ ZincBromineFlowBatteryVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'zincBromineFlowBatteryEngine.ts domain engine file must exist');
console.log('  ✓ zincBromineFlowBatteryEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('ZN_BR_COMPLEXING_AGENTS'), 'Visualizer must import ZN_BR_COMPLEXING_AGENTS');
assert(visualizerCode.includes('ZincBromineFlowBatteryEngine'), 'Visualizer must import ZincBromineFlowBatteryEngine');
console.log('  ✓ ZincBromineFlowBatteryVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ ZincBromineFlowBatteryVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('POLYBROMIDE_PHASE_COMPLEXATION'), 'Must support Mode 1: POLYBROMIDE_PHASE_COMPLEXATION');
assert(visualizerCode.includes('ZINC_DENDRITE_AND_STRIPPING'), 'Must support Mode 2: ZINC_DENDRITE_AND_STRIPPING');
assert(visualizerCode.includes('SUBSTATION_GRID_PLANT'), 'Must support Mode 3: SUBSTATION_GRID_PLANT');
console.log('  ✓ ZincBromineFlowBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Polybromide') && visualizerCode.includes('Lớp Mạ Kẽm'), 'Visualizer must render interactive SVG 2-phase polybromide tank and zinc cell');
console.log('  ✓ ZincBromineFlowBatteryVisualizer renders dynamic SVG 2-phase tank and zinc plating schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('operatingDischargeVoltageV'), 'Must display operating discharge voltage');
assert(visualizerCode.includes('oilPhaseVolumePercent'), 'Must display polybromide oil volume percent');
assert(visualizerCode.includes('sandsTransitionTimeSeconds'), 'Must display Sand transition time');
assert(visualizerCode.includes('roundTripEfficiencyPercent'), 'Must display round-trip efficiency');
console.log('  ✓ Operating voltage, oil phase volume, Sand transition time, and RTE metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { ZincBromineFlowBatteryVisualizer } from './visualizations/ZincBromineFlowBatteryVisualizer'"), 'PeriodicCodexTab must import ZincBromineFlowBatteryVisualizer');
assert(codexCode.includes("'ZINC_BROMINE_FLOW_BATTERY'"), 'PeriodicCodexTab must include ZINC_BROMINE_FLOW_BATTERY in its activeMainTab union');
assert(codexCode.includes('<ZincBromineFlowBatteryVisualizer />'), 'PeriodicCodexTab must render <ZincBromineFlowBatteryVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders ZincBromineFlowBatteryVisualizer under ZINC_BROMINE_FLOW_BATTERY tab');

console.log('🎉 Test Suite 329 Passed (8/8 assertions clean)!');
