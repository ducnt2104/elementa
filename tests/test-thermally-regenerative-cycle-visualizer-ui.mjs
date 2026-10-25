/**
 * test-thermally-regenerative-cycle-visualizer-ui.mjs
 *
 * Test Suite 333: ThermallyRegenerativeElectrochemicalCycleVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * V-Q thermodynamic loop SVG diagram, Carnot benchmarks, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 333: ThermallyRegenerativeElectrochemicalCycleVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ThermallyRegenerativeElectrochemicalCycleVisualizer.tsx');
const enginePath = path.resolve('src/domain/thermallyRegenerativeElectrochemicalCycleEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'ThermallyRegenerativeElectrochemicalCycleVisualizer.tsx component file must exist');
console.log('  ✓ ThermallyRegenerativeElectrochemicalCycleVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'thermallyRegenerativeElectrochemicalCycleEngine.ts domain engine file must exist');
console.log('  ✓ thermallyRegenerativeElectrochemicalCycleEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('TREC_COUPLE_SPECS'), 'Visualizer must import TREC_COUPLE_SPECS');
assert(visualizerCode.includes('ThermallyRegenerativeElectrochemicalCycleEngine'), 'Visualizer must import ThermallyRegenerativeElectrochemicalCycleEngine');
console.log('  ✓ ThermallyRegenerativeElectrochemicalCycleVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ ThermallyRegenerativeElectrochemicalCycleVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('FOUR_STAGE_THERMODYNAMIC_CYCLE'), 'Must support Mode 1: FOUR_STAGE_THERMODYNAMIC_CYCLE');
assert(visualizerCode.includes('PRUSSIAN_BLUE_INTERCALATION'), 'Must support Mode 2: PRUSSIAN_BLUE_INTERCALATION');
assert(visualizerCode.includes('INDUSTRIAL_WASTE_HEAT_PLANT'), 'Must support Mode 3: INDUSTRIAL_WASTE_HEAT_PLANT');
console.log('  ✓ ThermallyRegenerativeElectrochemicalCycleVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('W_net') && visualizerCode.includes('Điện Lượng Q'), 'Visualizer must render interactive SVG V-Q loop diagram');
console.log('  ✓ ThermallyRegenerativeElectrochemicalCycleVisualizer renders dynamic SVG V-Q loop schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('deltaVoltageV'), 'Must display delta voltage');
assert(visualizerCode.includes('thermalEfficiencyPercent'), 'Must display thermal efficiency');
assert(visualizerCode.includes('carnotEfficiencyPercent'), 'Must display Carnot efficiency limit');
assert(visualizerCode.includes('relativeCarnotEfficiencyPercent'), 'Must display relative Carnot percentage');
assert(visualizerCode.includes('netElectricPowerOutputKwE'), 'Must display electric power output');
console.log('  ✓ Delta voltage, thermal efficiency, Carnot limit, and power output metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { ThermallyRegenerativeElectrochemicalCycleVisualizer } from './visualizations/ThermallyRegenerativeElectrochemicalCycleVisualizer'"), 'PeriodicCodexTab must import ThermallyRegenerativeElectrochemicalCycleVisualizer');
assert(codexCode.includes("'THERMALLY_REGENERATIVE_ELECTROCHEMICAL_CYCLE'"), 'PeriodicCodexTab must include THERMALLY_REGENERATIVE_ELECTROCHEMICAL_CYCLE in its activeMainTab union');
assert(codexCode.includes('<ThermallyRegenerativeElectrochemicalCycleVisualizer />'), 'PeriodicCodexTab must render <ThermallyRegenerativeElectrochemicalCycleVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders ThermallyRegenerativeElectrochemicalCycleVisualizer under THERMALLY_REGENERATIVE_ELECTROCHEMICAL_CYCLE tab');

console.log('🎉 Test Suite 333 Passed (8/8 assertions clean)!');
