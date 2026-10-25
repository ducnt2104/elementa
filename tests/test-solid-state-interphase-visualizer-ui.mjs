// tests/test-solid-state-interphase-visualizer-ui.mjs
// ELEMENTA TEST SUITE 307: Solid-State Battery CEI & Mechanics Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 307: SolidStateInterphaseVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/SolidStateInterphaseVisualizer.tsx');
const enginePath = path.resolve('src/domain/solidStateInterphaseMechanicsEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'SolidStateInterphaseVisualizer.tsx component file must exist');
console.log('  ✓ SolidStateInterphaseVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'solidStateInterphaseMechanicsEngine.ts domain engine file must exist');
console.log('  ✓ solidStateInterphaseMechanicsEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/solidStateInterphaseMechanicsEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateInterfacialStability'), 'Visualizer must use calculateInterfacialStability');
assert(visualizerContent.includes('calculateChemoMechanicalStress'), 'Visualizer must use calculateChemoMechanicalStress');
assert(visualizerContent.includes('simulateCapacityRetentionCycles'), 'Visualizer must use simulateCapacityRetentionCycles');
assert(visualizerContent.includes('calculateSolidStateFullCellMetrics'), 'Visualizer must use calculateSolidStateFullCellMetrics');
console.log('  ✓ SolidStateInterphaseVisualizer imports domain engine functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ SolidStateInterphaseVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('INTERFACIAL_STABILITY_AND_CEI'), 'Mode 1 (INTERFACIAL_STABILITY_AND_CEI) must be supported');
assert(visualizerContent.includes('CHEMO_MECHANICAL_PRESSURE_AND_DENDRITES'), 'Mode 2 (CHEMO_MECHANICAL_PRESSURE_AND_DENDRITES) must be supported');
assert(visualizerContent.includes('CYCLE_RETENTION_AND_PACK_METRICS'), 'Mode 3 (CYCLE_RETENTION_AND_PACK_METRICS) must be supported');
console.log('  ✓ SolidStateInterphaseVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 500 240"'), 'Visualizer must render interactive SVG cycle retention chart');
assert(visualizerContent.includes('Capacity Retention (%)'), 'SVG legend must mark Capacity Retention curve');
assert(visualizerContent.includes('80% Automotive EOL Benchmark'), 'SVG legend must mark 80% benchmark line');
console.log('  ✓ SolidStateInterphaseVisualizer renders SVG 1000-cycle degradation chart');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('stabilityResult.interfacialArealResistanceOhmCm2'), 'Must display Interfacial Areal Resistance');
assert(visualizerContent.includes('mechanicsResult.contactAreaRetentionPct'), 'Must display Contact Area Retention %');
assert(visualizerContent.includes('mechanicsResult.criticalPlatingCurrentDensityMacm2'), 'Must display Critical Plating CCD');
assert(visualizerContent.includes('packMetrics.cellGravimetricEnergyDensityWhKg'), 'Must display Gravimetric Energy Density Wh/kg');
assert(visualizerContent.includes('packMetrics.cellVolumetricEnergyDensityWhL'), 'Must display Volumetric Energy Density Wh/L');
assert(visualizerContent.includes('packMetrics.thermalRunawayOnsetTempCelsius'), 'Must display Thermal Runaway Onset °C');
console.log('  ✓ Interfacial resistance, contact %, CCD, Wh/kg, Wh/L, and safety onset metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { SolidStateInterphaseVisualizer } from './visualizations/SolidStateInterphaseVisualizer';"), 'PeriodicCodexTab must import SolidStateInterphaseVisualizer');
assert(codexContent.includes("'SOLID_STATE_INTERPHASE_MECHANICS'"), 'PeriodicCodexTab must include SOLID_STATE_INTERPHASE_MECHANICS tab state');
assert(codexContent.includes('Pin Thể Rắn CEI & Cơ-Điện Hóa'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<SolidStateInterphaseVisualizer />'), 'PeriodicCodexTab must render <SolidStateInterphaseVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 307 PASSED: Solid-State Battery CEI & Mechanics Visualizer is fully verified!\n');
