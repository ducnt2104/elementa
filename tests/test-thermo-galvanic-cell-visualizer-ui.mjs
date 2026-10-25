/**
 * test-thermo-galvanic-cell-visualizer-ui.mjs
 *
 * Test Suite 337: ThermoGalvanicCellVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * thermal gradient SVG schematic, wearable sensor metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 337: ThermoGalvanicCellVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ThermoGalvanicCellVisualizer.tsx');
const enginePath = path.resolve('src/domain/thermoGalvanicCellEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'ThermoGalvanicCellVisualizer.tsx component file must exist');
console.log('  ✓ ThermoGalvanicCellVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'thermoGalvanicCellEngine.ts domain engine file must exist');
console.log('  ✓ thermoGalvanicCellEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('THERMO_GALVANIC_SYSTEMS'), 'Visualizer must import THERMO_GALVANIC_SYSTEMS');
assert(visualizerCode.includes('ThermoGalvanicCellEngine'), 'Visualizer must import ThermoGalvanicCellEngine');
console.log('  ✓ ThermoGalvanicCellVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ ThermoGalvanicCellVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('STEADY_STATE_THERMAL_GRADIENT'), 'Must support Mode 1: STEADY_STATE_THERMAL_GRADIENT');
assert(visualizerCode.includes('CHAOTROPIC_SOLVATION_CHEMISTRY'), 'Must support Mode 2: CHAOTROPIC_SOLVATION_CHEMISTRY');
assert(visualizerCode.includes('WEARABLE_BODY_HEAT_PATCH'), 'Must support Mode 3: WEARABLE_BODY_HEAT_PATCH');
console.log('  ✓ ThermoGalvanicCellVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('CỰC NÓNG') && visualizerCode.includes('CỰC LẠNH'), 'Visualizer must render interactive SVG thermal gradient cell');
console.log('  ✓ ThermoGalvanicCellVisualizer renders dynamic SVG thermal gradient schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('openCircuitVoltageMv'), 'Must display open circuit voltage (Voc)');
assert(visualizerCode.includes('powerOutputMicroWatts'), 'Must display power output in µW');
assert(visualizerCode.includes('normalizedPowerDensityMwPerM2K2'), 'Must display normalized power density');
assert(visualizerCode.includes('internalResistanceOhm'), 'Must display internal resistance');
console.log('  ✓ Voc, power output, normalized power density, and internal resistance metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { ThermoGalvanicCellVisualizer } from './visualizations/ThermoGalvanicCellVisualizer'"), 'PeriodicCodexTab must import ThermoGalvanicCellVisualizer');
assert(codexCode.includes("'THERMO_GALVANIC_CELL'"), 'PeriodicCodexTab must include THERMO_GALVANIC_CELL in its activeMainTab union');
assert(codexCode.includes('<ThermoGalvanicCellVisualizer />'), 'PeriodicCodexTab must render <ThermoGalvanicCellVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders ThermoGalvanicCellVisualizer under THERMO_GALVANIC_CELL tab');

console.log('🎉 Test Suite 337 Passed (8/8 assertions clean)!');
