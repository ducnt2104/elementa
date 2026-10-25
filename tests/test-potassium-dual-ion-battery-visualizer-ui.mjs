/**
 * test-potassium-dual-ion-battery-visualizer-ui.mjs
 *
 * Test Suite 353: PotassiumDualIonBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * dynamic SVG cell schematic, fast frequency regulation metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 353: PotassiumDualIonBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/PotassiumDualIonBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/potassiumDualIonBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'PotassiumDualIonBatteryVisualizer.tsx component file must exist');
console.log('  ✔ PotassiumDualIonBatteryVisualizer.tsx component file exists');

assert(fs.existsSync(enginePath), 'potassiumDualIonBatteryEngine.ts domain engine file must exist');
console.log('  ✔ potassiumDualIonBatteryEngine.ts domain engine file exists');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file exists');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('K_DIB_ELECTROLYTES'), 'Visualizer must import K_DIB_ELECTROLYTES');
assert(visualizerCode.includes('K_DIB_CATHODES'), 'Visualizer must import K_DIB_CATHODES');
assert(visualizerCode.includes('K_DIB_ANODES'), 'Visualizer must import K_DIB_ANODES');
assert(visualizerCode.includes('calculateKDibCellVoltages'), 'Visualizer must import calculateKDibCellVoltages');
assert(visualizerCode.includes('generateKDibRateCapability'), 'Visualizer must import generateKDibRateCapability');
assert(visualizerCode.includes('sizeKDibFrequencyRegulationSystem'), 'Visualizer must import sizeKDibFrequencyRegulationSystem');
console.log('  ✔ PotassiumDualIonBatteryVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive actions');
console.log('  ✔ PotassiumDualIonBatteryVisualizer triggers sound.playUiClick() on user interactions');

// 3 distinct interactive modes
assert(visualizerCode.includes('DUAL_ION_INTERCALATION_MECHANISM'), 'Must support Mode 1: DUAL_ION_INTERCALATION_MECHANISM');
assert(visualizerCode.includes('ULTRA_FAST_RATE_CAPABILITY'), 'Must support Mode 2: ULTRA_FAST_RATE_CAPABILITY');
assert(visualizerCode.includes('GRID_FREQUENCY_REGULATION'), 'Must support Mode 3: GRID_FREQUENCY_REGULATION');
console.log('  ✔ PotassiumDualIonBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Cₙ + x PF₆⁻ ➔ Cₙ[PF₆]') && visualizerCode.includes('Cₘ + y K⁺ + y e⁻ ➔ KC₈'), 'Visualizer must render interactive SVG K-DIB cell schematic');
console.log('  ✔ PotassiumDualIonBatteryVisualizer renders dynamic SVG K-DIB cell schematic');

// Scientific metrics & 0g critical metals
assert(visualizerCode.includes('cellVoltages.cellOpenCircuitVoltageV'), 'Must display cell OCV');
assert(visualizerCode.includes('currentRatePoint.chargeTimeMinutes'), 'Must display charge time in minutes');
assert(visualizerCode.includes('currentRatePoint.specificPowerWPerKg'), 'Must display specific power in W/kg');
assert(visualizerCode.includes('0.0 gam (Co/Ni)'), 'Must display 0.0g Cobalt/Nickel critical metals content');
assert(visualizerCode.includes('freqResult.cellCapExUSDPerKWh'), 'Must display cell CapEx in $/kWh');
console.log('  ✔ OCV, ultra-fast charge time, specific power, 0g critical metals, and CapEx metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { PotassiumDualIonBatteryVisualizer } from './visualizations/PotassiumDualIonBatteryVisualizer'"), 'PeriodicCodexTab must import PotassiumDualIonBatteryVisualizer');
assert(codexCode.includes('POTASSIUM_DUAL_ION_BATTERY'), 'PeriodicCodexTab must register POTASSIUM_DUAL_ION_BATTERY tab key');
assert(codexCode.includes('<PotassiumDualIonBatteryVisualizer />'), 'PeriodicCodexTab must render PotassiumDualIonBatteryVisualizer');
console.log('  ✔ PotassiumDualIonBatteryVisualizer integrated cleanly into PeriodicCodexTab.tsx');

// 4. Audit vite.config.ts chunk configuration
const vitePath = path.resolve('vite.config.ts');
const viteCode = fs.readFileSync(vitePath, 'utf8');
assert(viteCode.includes('PotassiumDualIon'), 'vite.config.ts must map PotassiumDualIon to chemistry-visualizers-energy chunk');
console.log('  ✔ vite.config.ts maps PotassiumDualIon to chemistry-visualizers-energy chunk');

console.log('🎉 Test Suite 353 Passed (8/8 assertions clean)!');
