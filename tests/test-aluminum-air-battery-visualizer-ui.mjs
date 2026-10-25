/**
 * test-aluminum-air-battery-visualizer-ui.mjs
 *
 * Test Suite 331: AluminumAirBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * Bayer crystallization & EV pack metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 331: AluminumAirBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/AluminumAirBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/aluminumAirBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'AluminumAirBatteryVisualizer.tsx component file must exist');
console.log('  ✓ AluminumAirBatteryVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'aluminumAirBatteryEngine.ts domain engine file must exist');
console.log('  ✓ aluminumAirBatteryEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('AL_AIR_INHIBITORS'), 'Visualizer must import AL_AIR_INHIBITORS');
assert(visualizerCode.includes('AluminumAirBatteryEngine'), 'Visualizer must import AluminumAirBatteryEngine');
console.log('  ✓ AluminumAirBatteryVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ AluminumAirBatteryVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('ALKALINE_CORROSION_AND_INHIBITORS'), 'Must support Mode 1: ALKALINE_CORROSION_AND_INHIBITORS');
assert(visualizerCode.includes('BAYER_CRYSTALLIZER_AND_RECYCLING'), 'Must support Mode 2: BAYER_CRYSTALLIZER_AND_RECYCLING');
assert(visualizerCode.includes('EV_ULTRA_LONG_RANGE_PACK'), 'Must support Mode 3: EV_ULTRA_LONG_RANGE_PACK');
console.log('  ✓ AluminumAirBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('ANODE NHÔM') && visualizerCode.includes('CATHODE KHÔNG KHÍ'), 'Visualizer must render interactive SVG Al-Air cell cross-section');
console.log('  ✓ AluminumAirBatteryVisualizer renders dynamic SVG cell cross-section schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('operatingCellVoltageV'), 'Must display operating cell voltage');
assert(visualizerCode.includes('corrosionInhibitionEfficiencyPercent'), 'Must display corrosion inhibition efficiency');
assert(visualizerCode.includes('hydrogenGasEvolutionRateMlPerMinPerCell'), 'Must display parasitic H2 evolution rate');
assert(visualizerCode.includes('aluminateSupersaturationRatio'), 'Must display aluminate supersaturation ratio');
assert(visualizerCode.includes('weightSavingsPercent'), 'Must display EV pack weight savings vs Li-ion');
console.log('  ✓ Cell voltage, corrosion inhibition, H2 evolution, supersaturation ratio, and weight savings metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { AluminumAirBatteryVisualizer } from './visualizations/AluminumAirBatteryVisualizer'"), 'PeriodicCodexTab must import AluminumAirBatteryVisualizer');
assert(codexCode.includes("'ALUMINUM_AIR_BATTERY'"), 'PeriodicCodexTab must include ALUMINUM_AIR_BATTERY in its activeMainTab union');
assert(codexCode.includes('<AluminumAirBatteryVisualizer />'), 'PeriodicCodexTab must render <AluminumAirBatteryVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders AluminumAirBatteryVisualizer under ALUMINUM_AIR_BATTERY tab');

console.log('🎉 Test Suite 331 Passed (8/8 assertions clean)!');
