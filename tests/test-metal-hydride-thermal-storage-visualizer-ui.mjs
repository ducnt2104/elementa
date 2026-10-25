// tests/test-metal-hydride-thermal-storage-visualizer-ui.mjs
// ELEMENTA TEST SUITE 295: Metal Hydride Thermal Storage Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 295: MetalHydrideThermalStorageVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MetalHydrideThermalStorageVisualizer.tsx');
const enginePath = path.resolve('src/domain/metalHydrideThermalStorageEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'MetalHydrideThermalStorageVisualizer.tsx component file must exist');
console.log('  ✓ MetalHydrideThermalStorageVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'metalHydrideThermalStorageEngine.ts domain engine file must exist');
console.log('  ✓ metalHydrideThermalStorageEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/metalHydrideThermalStorageEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateVanTHoffEquilibriumPressureBar'), 'Visualizer must use calculateVanTHoffEquilibriumPressureBar');
assert(visualizerContent.includes('calculateDualBedHeatPump'), 'Visualizer must use calculateDualBedHeatPump');
assert(visualizerContent.includes('calculateTcsPlantBalance'), 'Visualizer must use calculateTcsPlantBalance');
console.log('  ✓ MetalHydrideThermalStorageVisualizer must import functions from metalHydrideThermalStorageEngine');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ MetalHydrideThermalStorageVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('DUAL_BED_HEAT_PUMP_AND_FLOW'), 'Mode 1 must be supported');
assert(visualizerContent.includes('PLANT_SCALE_TCS_SIMULATOR'), 'Mode 2 must be supported');
assert(visualizerContent.includes('VAN_T_HOFF_ISOTHERM_AND_BENCHMARK'), 'Mode 3 must be supported');
console.log('  ✓ MetalHydrideThermalStorageVisualizer must support 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('<svg viewBox="0 0 900 280"'), 'Visualizer must render interactive SVG dual-bed flowsheet');
assert(visualizerContent.includes('Bình Phản Ứng Nhiệt Độ Cao'), 'SVG must render high-temperature bed');
assert(visualizerContent.includes('Bình Đệm Nhiệt Thấp'), 'SVG must render low-temperature bed');
assert(visualizerContent.includes('Van Điều Tiết Khí Hydro'), 'SVG must render central hydrogen regulation valve');
console.log('  ✓ MetalHydrideThermalStorageVisualizer must render interactive SVG diagrams');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('heatPump.coefficientOfPerformanceCopHeating'), 'Must display COP heating');
assert(visualizerContent.includes('heatPump.temperatureLiftDeltaTDegC'), 'Must display temperature lift');
assert(visualizerContent.includes('plantBalance.massOfHighTempHydrideTons'), 'Must display high-temp hydride mass');
assert(visualizerContent.includes('plantBalance.avoidedCo2TonsPerYear'), 'Must display avoided CO2 tons/year');
console.log('  ✓ COP heating, temperature lift, hydride mass, and CO2 savings metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { MetalHydrideThermalStorageVisualizer } from './visualizations/MetalHydrideThermalStorageVisualizer';"), 'PeriodicCodexTab must import MetalHydrideThermalStorageVisualizer');
assert(codexContent.includes("'METAL_HYDRIDE_THERMAL_STORAGE'"), 'PeriodicCodexTab must include METAL_HYDRIDE_THERMAL_STORAGE tab state');
assert(codexContent.includes('Lưu Trữ Nhiệt Hydrit (TCS & MgH₂)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<MetalHydrideThermalStorageVisualizer />'), 'PeriodicCodexTab must render <MetalHydrideThermalStorageVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 295: ALL CHECKS PASSED (7/7) ---');
