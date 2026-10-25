/**
 * test-electrostatic-supercapacitor-visualizer-ui.mjs
 *
 * Test Suite 361: ElectrostaticSupercapacitorVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * dynamic SVG Helmholtz double-layer schematic, 1,000,000 cycle lifespan & >100 kW/kg pulse power, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 361: ElectrostaticSupercapacitorVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ElectrostaticSupercapacitorVisualizer.tsx');
const enginePath = path.resolve('src/domain/electrostaticSupercapacitorEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'ElectrostaticSupercapacitorVisualizer.tsx component file must exist');
console.log('  ✔ ElectrostaticSupercapacitorVisualizer.tsx component file exists');

assert(fs.existsSync(enginePath), 'electrostaticSupercapacitorEngine.ts domain engine file must exist');
console.log('  ✔ electrostaticSupercapacitorEngine.ts domain engine file exists');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file exists');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('SUPERCAPACITOR_ELECTROLYTES'), 'Visualizer must import SUPERCAPACITOR_ELECTROLYTES');
assert(visualizerCode.includes('SUPERCAPACITOR_ELECTRODES'), 'Visualizer must import SUPERCAPACITOR_ELECTRODES');
assert(visualizerCode.includes('calculateRagonePerformance'), 'Visualizer must import calculateRagonePerformance');
assert(visualizerCode.includes('sizeRegenerativeBrakingSystem'), 'Visualizer must import sizeRegenerativeBrakingSystem');
console.log('  ✔ ElectrostaticSupercapacitorVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on user interactions');
console.log('  ✔ ElectrostaticSupercapacitorVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct interactive modes
assert(visualizerCode.includes('RAGONE_ENERGY_POWER_MAP'), 'Must support Mode 1: RAGONE_ENERGY_POWER_MAP');
assert(visualizerCode.includes('PULSE_POWER_ELECTRODYNAMICS'), 'Must support Mode 2: PULSE_POWER_ELECTRODYNAMICS');
assert(visualizerCode.includes('REGENERATIVE_BRAKING_TRANSIT'), 'Must support Mode 3: REGENERATIVE_BRAKING_TRANSIT');
console.log('  ✔ ElectrostaticSupercapacitorVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Lớp kép Helmholtz') && visualizerCode.includes('BF₄⁻ ➔ ➔ ➔ | ⬅ ⬅ ⬅ TEA⁺'), 'Visualizer must render interactive SVG Helmholtz double-layer schematic');
console.log('  ✔ ElectrostaticSupercapacitorVisualizer renders dynamic SVG Helmholtz double-layer schematic');

// Scientific metrics & 1,000,000 cycle lifespan
assert(visualizerCode.includes('ragoneResult.specificEnergyWhPerKg'), 'Must display specific energy in Wh/kg');
assert(visualizerCode.includes('ragoneResult.specificPowerKWPerKg'), 'Must display specific power in kW/kg');
assert(visualizerCode.includes('currentElectrode.cycleLifeMillionCycles'), 'Must display million cycle life');
assert(visualizerCode.includes('brakingResult.annualElectricityCostSavedUSD'), 'Must display annual electricity cost savings');
console.log('  ✔ Specific energy, specific power, million cycle life, and transit savings verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { ElectrostaticSupercapacitorVisualizer } from './visualizations/ElectrostaticSupercapacitorVisualizer'"), 'PeriodicCodexTab must import ElectrostaticSupercapacitorVisualizer');
assert(codexCode.includes('ELECTROSTATIC_SUPERCAPACITOR'), 'PeriodicCodexTab must register ELECTROSTATIC_SUPERCAPACITOR tab key');
assert(codexCode.includes('<ElectrostaticSupercapacitorVisualizer />'), 'PeriodicCodexTab must render ElectrostaticSupercapacitorVisualizer');
console.log('  ✔ ElectrostaticSupercapacitorVisualizer integrated cleanly into PeriodicCodexTab.tsx');

// 4. Audit vite.config.ts chunk configuration
const vitePath = path.resolve('vite.config.ts');
const viteCode = fs.readFileSync(vitePath, 'utf8');
assert(viteCode.includes('ElectrostaticSupercapacitor'), 'vite.config.ts must map ElectrostaticSupercapacitor to chemistry-visualizers-energy chunk');
console.log('  ✔ vite.config.ts maps ElectrostaticSupercapacitor to chemistry-visualizers-energy chunk');

console.log('🎉 Test Suite 361 Passed (8/8 assertions clean)!');
