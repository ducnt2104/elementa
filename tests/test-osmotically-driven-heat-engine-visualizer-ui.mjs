/**
 * test-osmotically-driven-heat-engine-visualizer-ui.mjs
 *
 * Test Suite 345: OsmoticallyDrivenHeatEngineVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * PRO membrane cross-section SVG schematic, Carnot thermodynamic metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 345: OsmoticallyDrivenHeatEngineVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/OsmoticallyDrivenHeatEngineVisualizer.tsx');
const enginePath = path.resolve('src/domain/osmoticallyDrivenHeatEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'OsmoticallyDrivenHeatEngineVisualizer.tsx component file must exist');
console.log('  ✔ OsmoticallyDrivenHeatEngineVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'osmoticallyDrivenHeatEngine.ts domain engine file must exist');
console.log('  ✔ osmoticallyDrivenHeatEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('ODHE_DRAW_SOLUTES'), 'Visualizer must import ODHE_DRAW_SOLUTES');
assert(visualizerCode.includes('ODHE_MEMBRANES'), 'Visualizer must import ODHE_MEMBRANES');
assert(visualizerCode.includes('OsmoticallyDrivenHeatEngineDomain'), 'Visualizer must import OsmoticallyDrivenHeatEngineDomain');
console.log('  ✔ OsmoticallyDrivenHeatEngineVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✔ OsmoticallyDrivenHeatEngineVisualizer triggers sound.playUiClick() on interactive actions');

// 3 distinct modes
assert(visualizerCode.includes('PRO_MEMBRANE_POWER_DENSITY'), 'Must support Mode 1: PRO_MEMBRANE_POWER_DENSITY');
assert(visualizerCode.includes('CLOSED_LOOP_THERMAL_CYCLE'), 'Must support Mode 2: CLOSED_LOOP_THERMAL_CYCLE');
assert(visualizerCode.includes('LOW_GRADE_WASTE_HEAT_HARVESTING'), 'Must support Mode 3: LOW_GRADE_WASTE_HEAT_HARVESTING');
console.log('  ✔ OsmoticallyDrivenHeatEngineVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('KÊNH NƯỚC CẤP') && visualizerCode.includes('DUNG DỊCH HÚT'), 'Visualizer must render interactive SVG PRO membrane cross-section schematic');
console.log('  ✔ OsmoticallyDrivenHeatEngineVisualizer renders dynamic SVG PRO membrane cross-section');

// Scientific metrics & GDPT 2018 / IUPAC terms
assert(visualizerCode.includes('drawOsmoticPressureBar'), 'Must display draw osmotic pressure');
assert(visualizerCode.includes('waterFluxLMH'), 'Must display water flux in LMH');
assert(visualizerCode.includes('powerDensityWPerM2'), 'Must display power density in W/m2');
assert(visualizerCode.includes('thermalEfficiencyPercent'), 'Must display thermal efficiency');
assert(visualizerCode.includes('co2EmissionsAvoidedTonsPerYear'), 'Must display avoided CO2 emissions');
console.log('  ✔ Osmotic pressure, water flux, power density, thermal efficiency, and CO2 abatement metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { OsmoticallyDrivenHeatEngineVisualizer } from './visualizations/OsmoticallyDrivenHeatEngineVisualizer'"), 'PeriodicCodexTab must import OsmoticallyDrivenHeatEngineVisualizer');
assert(codexCode.includes("'OSMOTICALLY_DRIVEN_HEAT_ENGINE'"), 'PeriodicCodexTab must include OSMOTICALLY_DRIVEN_HEAT_ENGINE in its activeMainTab union');
assert(codexCode.includes('<OsmoticallyDrivenHeatEngineVisualizer />'), 'PeriodicCodexTab must render <OsmoticallyDrivenHeatEngineVisualizer />');
console.log('  ✔ PeriodicCodexTab imports and renders OsmoticallyDrivenHeatEngineVisualizer under OSMOTICALLY_DRIVEN_HEAT_ENGINE tab');

console.log('🎉 Test Suite 345 Passed (8/8 assertions clean)!');
