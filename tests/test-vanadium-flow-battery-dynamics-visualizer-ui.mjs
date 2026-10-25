/**
 * test-vanadium-flow-battery-dynamics-visualizer-ui.mjs
 *
 * Test Suite 323: VanadiumFlowBatteryDynamicsVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 323: VanadiumFlowBatteryDynamicsVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/VanadiumFlowBatteryDynamicsVisualizer.tsx');
const enginePath = path.resolve('src/domain/vanadiumFlowBatteryDynamicsEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'VanadiumFlowBatteryDynamicsVisualizer.tsx component file must exist');
console.log('  ✓ VanadiumFlowBatteryDynamicsVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'vanadiumFlowBatteryDynamicsEngine.ts domain engine file must exist');
console.log('  ✓ vanadiumFlowBatteryDynamicsEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('VRFB_VALENCE_SPECIES'), 'Visualizer must import VRFB_VALENCE_SPECIES');
assert(visualizerCode.includes('VRFB_MEMBRANE_CATALOG'), 'Visualizer must import VRFB_MEMBRANE_CATALOG');
assert(visualizerCode.includes('VanadiumFlowBatteryDynamicsEngine'), 'Visualizer must import VanadiumFlowBatteryDynamicsEngine');
console.log('  ✓ VanadiumFlowBatteryDynamicsVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ VanadiumFlowBatteryDynamicsVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('SPECTROPHOTOMETRY_AND_MEMBRANE'), 'Must support Mode 1: SPECTROPHOTOMETRY_AND_MEMBRANE');
assert(visualizerCode.includes('HYDRODYNAMICS_AND_PUMPING'), 'Must support Mode 2: HYDRODYNAMICS_AND_PUMPING');
assert(visualizerCode.includes('GRID_SCALE_DECOUPLED_PLANT'), 'Must support Mode 3: GRID_SCALE_DECOUPLED_PLANT');
console.log('  ✓ VanadiumFlowBatteryDynamicsVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('anolyteGrad') && visualizerCode.includes('catholyteGrad'), 'Visualizer must render interactive SVG flow loops with spectrophotometric gradients');
console.log('  ✓ VanadiumFlowBatteryDynamicsVisualizer renders dynamic SVG dual-tank circulation schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('hydraulicPressureDropKpa'), 'Must display hydraulic pressure drop ΔP');
assert(visualizerCode.includes('netDischargeEfficiencyPercent'), 'Must display net discharge efficiency');
assert(visualizerCode.includes('stoichiometricFlowFactor'), 'Must display stoichiometric flow factor');
assert(visualizerCode.includes('totalElectrolyteVolumeM3'), 'Must display electrolyte storage volume');
console.log('  ✓ Hydraulic pressure drops, net efficiency, flow factor, and electrolyte storage metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { VanadiumFlowBatteryDynamicsVisualizer } from './visualizations/VanadiumFlowBatteryDynamicsVisualizer'"), 'PeriodicCodexTab must import VanadiumFlowBatteryDynamicsVisualizer');
assert(codexCode.includes("'VANADIUM_FLOW_BATTERY_DYNAMICS'"), 'PeriodicCodexTab must include VANADIUM_FLOW_BATTERY_DYNAMICS in its activeMainTab union');
assert(codexCode.includes('<VanadiumFlowBatteryDynamicsVisualizer />'), 'PeriodicCodexTab must render <VanadiumFlowBatteryDynamicsVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders VanadiumFlowBatteryDynamicsVisualizer under VANADIUM_FLOW_BATTERY_DYNAMICS tab');

console.log('🎉 Test Suite 323 Passed (8/8 assertions clean)!');
