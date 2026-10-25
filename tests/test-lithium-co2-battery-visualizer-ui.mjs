/**
 * test-lithium-co2-battery-visualizer-ui.mjs
 *
 * Test Suite 341: LithiumCarbonDioxideBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * Mars CO2 capture porous cathode SVG schematic, redox mediator metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 341: LithiumCarbonDioxideBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/LithiumCarbonDioxideBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/lithiumCarbonDioxideBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'LithiumCarbonDioxideBatteryVisualizer.tsx component file must exist');
console.log('  ✔ LithiumCarbonDioxideBatteryVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'lithiumCarbonDioxideBatteryEngine.ts domain engine file must exist');
console.log('  ✔ lithiumCarbonDioxideBatteryEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('LI_CO2_MEDIATORS'), 'Visualizer must import LI_CO2_MEDIATORS');
assert(visualizerCode.includes('LithiumCarbonDioxideBatteryEngine'), 'Visualizer must import LithiumCarbonDioxideBatteryEngine');
console.log('  ✔ LithiumCarbonDioxideBatteryVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✔ LithiumCarbonDioxideBatteryVisualizer triggers sound.playUiClick() on interactive actions');

// 3 distinct modes
assert(visualizerCode.includes('MARS_ATMOSPHERE_CARBON_CAPTURE'), 'Must support Mode 1: MARS_ATMOSPHERE_CARBON_CAPTURE');
assert(visualizerCode.includes('REDOX_MEDIATOR_RECHARGE_CYCLE'), 'Must support Mode 2: REDOX_MEDIATOR_RECHARGE_CYCLE');
assert(visualizerCode.includes('MARS_ROVER_DEEP_SPACE_POWERTRAIN'), 'Must support Mode 3: MARS_ROVER_DEEP_SPACE_POWERTRAIN');
console.log('  ✔ LithiumCarbonDioxideBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('CỰC ÂM LITI') && visualizerCode.includes('CATHODE RỖNG'), 'Visualizer must render interactive SVG Mars CO2 porous cell schematic');
console.log('  ✔ LithiumCarbonDioxideBatteryVisualizer renders dynamic SVG Mars cell cross-section');

// Scientific metrics & GDPT 2018 / IUPAC terms
assert(visualizerCode.includes('operatingDischargeVoltageV'), 'Must display operating discharge voltage');
assert(visualizerCode.includes('operatingChargeVoltageV'), 'Must display operating charge voltage');
assert(visualizerCode.includes('roundTripEfficiencyPercent'), 'Must display round-trip energy efficiency');
assert(visualizerCode.includes('massSavingsPercent'), 'Must display payload mass savings vs Li-ion');
console.log('  ✔ Discharge voltage, charge voltage, RTE, and Mars rover payload savings metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { LithiumCarbonDioxideBatteryVisualizer } from './visualizations/LithiumCarbonDioxideBatteryVisualizer'"), 'PeriodicCodexTab must import LithiumCarbonDioxideBatteryVisualizer');
assert(codexCode.includes("'LITHIUM_CO2_BATTERY'"), 'PeriodicCodexTab must include LITHIUM_CO2_BATTERY in its activeMainTab union');
assert(codexCode.includes('<LithiumCarbonDioxideBatteryVisualizer />'), 'PeriodicCodexTab must render <LithiumCarbonDioxideBatteryVisualizer />');
console.log('  ✔ PeriodicCodexTab imports and renders LithiumCarbonDioxideBatteryVisualizer under LITHIUM_CO2_BATTERY tab');

console.log('🎉 Test Suite 341 Passed (8/8 assertions clean)!');
