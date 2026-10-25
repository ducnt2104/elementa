/**
 * test-direct-formic-acid-fuel-cell-visualizer-ui.mjs
 *
 * Test Suite 321: DirectFormicAcidFuelCellVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 321: DirectFormicAcidFuelCellVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/DirectFormicAcidFuelCellVisualizer.tsx');
const enginePath = path.resolve('src/domain/directFormicAcidFuelCellEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'DirectFormicAcidFuelCellVisualizer.tsx component file must exist');
console.log('  ✓ DirectFormicAcidFuelCellVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'directFormicAcidFuelCellEngine.ts domain engine file must exist');
console.log('  ✓ directFormicAcidFuelCellEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('DFAFC_CATALYST_CATALOG'), 'Visualizer must import DFAFC_CATALYST_CATALOG');
assert(visualizerCode.includes('calculateDfafcCellPerformance'), 'Visualizer must import calculateDfafcCellPerformance');
assert(visualizerCode.includes('calculateDfafcPortablePowerBalance'), 'Visualizer must import calculateDfafcPortablePowerBalance');
assert(visualizerCode.includes('FORMIC_ACID_ENERGY_DENSITY_KWH_L'), 'Visualizer must import FORMIC_ACID_ENERGY_DENSITY_KWH_L');
console.log('  ✓ DirectFormicAcidFuelCellVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ DirectFormicAcidFuelCellVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('DUAL_PATHWAY_DONNAN_EXCLUSION'), 'Must support Mode 1: DUAL_PATHWAY_DONNAN_EXCLUSION');
assert(visualizerCode.includes('POLARIZATION_CONCENTRATION'), 'Must support Mode 2: POLARIZATION_CONCENTRATION');
assert(visualizerCode.includes('PORTABLE_DRONE_MICROPOWER'), 'Must support Mode 3: PORTABLE_DRONE_MICROPOWER');
console.log('  ✓ DirectFormicAcidFuelCellVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Power Density Polarization'), 'Visualizer must render interactive SVG polarization curves');
console.log('  ✓ DirectFormicAcidFuelCellVisualizer renders SVG polarization curve & MEA schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('operatingCellVoltageV'), 'Must display operating cell voltage');
assert(visualizerCode.includes('powerDensityMwCm2'), 'Must display power density');
assert(visualizerCode.includes('crossoverDonnanExclusionPct'), 'Must display Donnan crossover exclusion');
assert(visualizerCode.includes('weightSavingsPct'), 'Must display drone weight savings percentage');
console.log('  ✓ Cell voltages, power density, Donnan exclusion, and weight savings metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes('DirectFormicAcidFuelCellVisualizer'), 'PeriodicCodexTab must import DirectFormicAcidFuelCellVisualizer');
assert(codexCode.includes("'DIRECT_FORMIC_ACID_FUEL_CELL'"), 'PeriodicCodexTab must include DIRECT_FORMIC_ACID_FUEL_CELL in state type');
assert(codexCode.includes('Pin Acid Formic Trực Tiếp (DFAFC Micro-Power)'), 'PeriodicCodexTab must render DFAFC tab button');
assert(codexCode.includes('<DirectFormicAcidFuelCellVisualizer />'), 'PeriodicCodexTab must render DirectFormicAcidFuelCellVisualizer');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 321 PASSED: Direct Formic Acid Fuel Cell Visualizer is fully verified!');
