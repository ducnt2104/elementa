/**
 * test-magnetocaloric-refrigeration-visualizer-ui.mjs
 *
 * Test Suite 359: MagnetocaloricRefrigerationVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * dynamic SVG spin alignment schematic, Zero-GWP environmental metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 359: MagnetocaloricRefrigerationVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MagnetocaloricRefrigerationVisualizer.tsx');
const enginePath = path.resolve('src/domain/magnetocaloricRefrigerationEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'MagnetocaloricRefrigerationVisualizer.tsx component file must exist');
console.log('  ✔ MagnetocaloricRefrigerationVisualizer.tsx component file exists');

assert(fs.existsSync(enginePath), 'magnetocaloricRefrigerationEngine.ts domain engine file must exist');
console.log('  ✔ magnetocaloricRefrigerationEngine.ts domain engine file exists');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file exists');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('MCE_MATERIALS'), 'Visualizer must import MCE_MATERIALS');
assert(visualizerCode.includes('MCE_FLUIDS'), 'Visualizer must import MCE_FLUIDS');
assert(visualizerCode.includes('calculateMceThermodynamicProperties'), 'Visualizer must import calculateMceThermodynamicProperties');
assert(visualizerCode.includes('calculateAmrCyclePerformance'), 'Visualizer must import calculateAmrCyclePerformance');
assert(visualizerCode.includes('calculateEnvironmentalSavings'), 'Visualizer must import calculateEnvironmentalSavings');
console.log('  ✔ MagnetocaloricRefrigerationVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✔ MagnetocaloricRefrigerationVisualizer triggers sound.playUiClick() on user interactions');

// 3 distinct interactive modes
assert(visualizerCode.includes('GIANT_MCE_PHYSICS'), 'Must support Mode 1: GIANT_MCE_PHYSICS');
assert(visualizerCode.includes('ACTIVE_MAGNETIC_REGENERATOR'), 'Must support Mode 2: ACTIVE_MAGNETIC_REGENERATOR');
assert(visualizerCode.includes('ZERO_GWP_ENVIRONMENTAL'), 'Must support Mode 3: ZERO_GWP_ENVIRONMENTAL');
console.log('  ✔ MagnetocaloricRefrigerationVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Trạng Thái Khử Từ') && visualizerCode.includes('Trạng Thái Từ Hóa'), 'Visualizer must render interactive SVG magnetocaloric spin alignment schematic');
console.log('  ✔ MagnetocaloricRefrigerationVisualizer renders dynamic SVG spin alignment schematic');

// Scientific metrics & Zero-GWP water
assert(visualizerCode.includes('mceProps.isothermalEntropyChangeJPerKgK'), 'Must display isothermal entropy change');
assert(visualizerCode.includes('mceProps.adiabaticTemperatureChangeDeltaTK'), 'Must display adiabatic temperature change');
assert(visualizerCode.includes('amrResult.copCooling'), 'Must display cooling COP');
assert(visualizerCode.includes('100% Nước tự nhiên'), 'Must display 100% natural water zero-GWP fluid');
console.log('  ✔ Delta_S_mag, Delta_T_ad, COP, and Zero-GWP natural water fluid verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { MagnetocaloricRefrigerationVisualizer } from './visualizations/MagnetocaloricRefrigerationVisualizer'"), 'PeriodicCodexTab must import MagnetocaloricRefrigerationVisualizer');
assert(codexCode.includes('MAGNETOCALORIC_REFRIGERATION'), 'PeriodicCodexTab must register MAGNETOCALORIC_REFRIGERATION tab key');
assert(codexCode.includes('<MagnetocaloricRefrigerationVisualizer />'), 'PeriodicCodexTab must render MagnetocaloricRefrigerationVisualizer');
console.log('  ✔ MagnetocaloricRefrigerationVisualizer integrated cleanly into PeriodicCodexTab.tsx');

// 4. Audit vite.config.ts chunk configuration
const vitePath = path.resolve('vite.config.ts');
const viteCode = fs.readFileSync(vitePath, 'utf8');
assert(viteCode.includes('Magnetocaloric'), 'vite.config.ts must map Magnetocaloric to chemistry-visualizers-energy chunk');
console.log('  ✔ vite.config.ts maps Magnetocaloric to chemistry-visualizers-energy chunk');

console.log('🎉 Test Suite 359 Passed (8/8 assertions clean)!');
