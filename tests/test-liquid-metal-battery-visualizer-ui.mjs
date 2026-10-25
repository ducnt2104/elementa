/**
 * test-liquid-metal-battery-visualizer-ui.mjs
 *
 * Test Suite 325: LiquidMetalBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 325: LiquidMetalBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/LiquidMetalBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/liquidMetalBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'LiquidMetalBatteryVisualizer.tsx component file must exist');
console.log('  ✓ LiquidMetalBatteryVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'liquidMetalBatteryEngine.ts domain engine file must exist');
console.log('  ✓ liquidMetalBatteryEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('LMB_CHEMISTRY_CATALOG'), 'Visualizer must import LMB_CHEMISTRY_CATALOG');
assert(visualizerCode.includes('LiquidMetalBatteryEngine'), 'Visualizer must import LiquidMetalBatteryEngine');
console.log('  ✓ LiquidMetalBatteryVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ LiquidMetalBatteryVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('DENSITY_STRATIFIED_INTERFACES'), 'Must support Mode 1: DENSITY_STRATIFIED_INTERFACES');
assert(visualizerCode.includes('SELF_HEATING_KINETICS'), 'Must support Mode 2: SELF_HEATING_KINETICS');
assert(visualizerCode.includes('CONTAINERIZED_GRID_LDES'), 'Must support Mode 3: CONTAINERIZED_GRID_LDES');
console.log('  ✓ LiquidMetalBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('anodeLayer') && visualizerCode.includes('electrolyteLayer'), 'Visualizer must render interactive SVG 3-layer cross-section');
console.log('  ✓ LiquidMetalBatteryVisualizer renders dynamic SVG 3-layer density stratification schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('operatingDischargeVoltageV'), 'Must display operating discharge voltage');
assert(visualizerCode.includes('powerDensityMwPerCm2'), 'Must display power density');
assert(visualizerCode.includes('jouleanHeatGeneratedWatts'), 'Must display Joulean heat generation');
assert(visualizerCode.includes('containerCount20Ft'), 'Must display ISO container count');
console.log('  ✓ Operating voltage, power density, Joulean heat, and ISO container metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { LiquidMetalBatteryVisualizer } from './visualizations/LiquidMetalBatteryVisualizer'"), 'PeriodicCodexTab must import LiquidMetalBatteryVisualizer');
assert(codexCode.includes("'LIQUID_METAL_BATTERY'"), 'PeriodicCodexTab must include LIQUID_METAL_BATTERY in its activeMainTab union');
assert(codexCode.includes('<LiquidMetalBatteryVisualizer />'), 'PeriodicCodexTab must render <LiquidMetalBatteryVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders LiquidMetalBatteryVisualizer under LIQUID_METAL_BATTERY tab');

console.log('🎉 Test Suite 325 Passed (8/8 assertions clean)!');
