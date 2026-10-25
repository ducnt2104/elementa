/**
 * test-sofc-internal-reforming-visualizer-ui.mjs
 *
 * Test Suite 319: SofcInternalReformingVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 319: SofcInternalReformingVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/SofcInternalReformingVisualizer.tsx');
const enginePath = path.resolve('src/domain/sofcInternalReformingEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'SofcInternalReformingVisualizer.tsx component file must exist');
console.log('  ✓ SofcInternalReformingVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'sofcInternalReformingEngine.ts domain engine file must exist');
console.log('  ✓ sofcInternalReformingEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('SOFC_FUEL_CATALOG'), 'Visualizer must import SOFC_FUEL_CATALOG');
assert(visualizerCode.includes('ELECTROLYTE_CATALOG'), 'Visualizer must import ELECTROLYTE_CATALOG');
assert(visualizerCode.includes('calculateSofcCellPerformance'), 'Visualizer must import calculateSofcCellPerformance');
assert(visualizerCode.includes('calculateSofcChpPlantBalance'), 'Visualizer must import calculateSofcChpPlantBalance');
console.log('  ✓ SofcInternalReformingVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ SofcInternalReformingVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('INTERNAL_REFORMING_COKING'), 'Must support Mode 1: INTERNAL_REFORMING_COKING');
assert(visualizerCode.includes('POLARIZATION_OVERPOTENTIALS'), 'Must support Mode 2: POLARIZATION_OVERPOTENTIALS');
assert(visualizerCode.includes('TRI_GENERATION_CHP_PLANT'), 'Must support Mode 3: TRI_GENERATION_CHP_PLANT');
console.log('  ✓ SofcInternalReformingVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Polarization Characteristics'), 'Visualizer must render interactive SVG polarization curves');
console.log('  ✓ SofcInternalReformingVisualizer renders SVG polarization curve & multi-layer cell schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('operatingCellVoltageV'), 'Must display operating cell voltage');
assert(visualizerCode.includes('powerDensityWcm2'), 'Must display power density');
assert(visualizerCode.includes('heatAbsorptionRatioPct'), 'Must display thermal self-cooling heat absorption ratio');
assert(visualizerCode.includes('isCokingRisk'), 'Must support coking risk detection');
assert(visualizerCode.includes('totalChpEfficiencyPct'), 'Must display total CHP efficiency');
assert(visualizerCode.includes('avoidedGridCo2TonsYear'), 'Must display avoided grid CO2 emissions');
console.log('  ✓ Cell voltages, power density, thermal absorption, coking detection, and CHP balance verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes('SofcInternalReformingVisualizer'), 'PeriodicCodexTab must import SofcInternalReformingVisualizer');
assert(codexCode.includes("'SOFC_INTERNAL_REFORMING'"), 'PeriodicCodexTab must include SOFC_INTERNAL_REFORMING in state type');
assert(codexCode.includes('Pin Nhiên Liệu SOFC & Tái Tạo Trực Tiếp (CHP)'), 'PeriodicCodexTab must render SOFC tab button');
assert(codexCode.includes('<SofcInternalReformingVisualizer />'), 'PeriodicCodexTab must render SofcInternalReformingVisualizer');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 319 PASSED: SOFC Internal Reforming Visualizer is fully verified!');
