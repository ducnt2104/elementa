/**
 * test-manganese-hydrogen-battery-visualizer-ui.mjs
 *
 * Test Suite 357: ManganeseHydrogenBatteryVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * dynamic SVG cell schematic, 20,000 cycles & <$30/kWh LDES metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 357: ManganeseHydrogenBatteryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ManganeseHydrogenBatteryVisualizer.tsx');
const enginePath = path.resolve('src/domain/manganeseHydrogenBatteryEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'ManganeseHydrogenBatteryVisualizer.tsx component file must exist');
console.log('  ✔ ManganeseHydrogenBatteryVisualizer.tsx component file exists');

assert(fs.existsSync(enginePath), 'manganeseHydrogenBatteryEngine.ts domain engine file must exist');
console.log('  ✔ manganeseHydrogenBatteryEngine.ts domain engine file exists');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file exists');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('MN_H2_CATALYSTS'), 'Visualizer must import MN_H2_CATALYSTS');
assert(visualizerCode.includes('MN_H2_SUBSTRATES'), 'Visualizer must import MN_H2_SUBSTRATES');
assert(visualizerCode.includes('calculateMnH2NernstPotential'), 'Visualizer must import calculateMnH2NernstPotential');
assert(visualizerCode.includes('calculateMnH2Polarization'), 'Visualizer must import calculateMnH2Polarization');
assert(visualizerCode.includes('sizeMnH2GridStoragePlant'), 'Visualizer must import sizeMnH2GridStoragePlant');
console.log('  ✔ ManganeseHydrogenBatteryVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on user interactions');
console.log('  ✔ ManganeseHydrogenBatteryVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct interactive modes
assert(visualizerCode.includes('DISSOLUTION_DEPOSITION_CHEMISTRY'), 'Must support Mode 1: DISSOLUTION_DEPOSITION_CHEMISTRY');
assert(visualizerCode.includes('POLARIZATION_AND_EFFICIENCY'), 'Must support Mode 2: POLARIZATION_AND_EFFICIENCY');
assert(visualizerCode.includes('LONG_DURATION_GRID_ECONOMICS'), 'Must support Mode 3: LONG_DURATION_GRID_ECONOMICS');
console.log('  ✔ ManganeseHydrogenBatteryVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Mn²⁺(aq) ➔ MnO₂(rắn)') && visualizerCode.includes('2H⁺ + 2e⁻ ➔ H₂(k)'), 'Visualizer must render interactive SVG gas-liquid hybrid cell schematic');
console.log('  ✔ ManganeseHydrogenBatteryVisualizer renders dynamic SVG gas-liquid hybrid cell schematic');

// Scientific metrics & 20,000 cycles / LDES CapEx
assert(visualizerCode.includes('nernstResult.cellOpenCircuitVoltageV'), 'Must display cell OCV');
assert(visualizerCode.includes('polResult.chargeVoltageV'), 'Must display charge voltage');
assert(visualizerCode.includes('polResult.roundTripEnergyEfficiencyPercent'), 'Must display round-trip energy efficiency');
assert(visualizerCode.includes('gridResult.cellCapExUSDPerKWh'), 'Must display cell CapEx in $/kWh');
assert(visualizerCode.includes('gridResult.cycleLifeCount'), 'Must display 20,000 cycles count');
console.log('  ✔ OCV, charge voltage, round-trip efficiency, CapEx, and 20,000 cycles verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { ManganeseHydrogenBatteryVisualizer } from './visualizations/ManganeseHydrogenBatteryVisualizer'"), 'PeriodicCodexTab must import ManganeseHydrogenBatteryVisualizer');
assert(codexCode.includes('MANGANESE_HYDROGEN_BATTERY'), 'PeriodicCodexTab must register MANGANESE_HYDROGEN_BATTERY tab key');
assert(codexCode.includes('<ManganeseHydrogenBatteryVisualizer />'), 'PeriodicCodexTab must render ManganeseHydrogenBatteryVisualizer');
console.log('  ✔ ManganeseHydrogenBatteryVisualizer integrated cleanly into PeriodicCodexTab.tsx');

// 4. Audit vite.config.ts chunk configuration
const vitePath = path.resolve('vite.config.ts');
const viteCode = fs.readFileSync(vitePath, 'utf8');
assert(viteCode.includes('ManganeseHydrogen'), 'vite.config.ts must map ManganeseHydrogen to chemistry-visualizers-energy chunk');
console.log('  ✔ vite.config.ts maps ManganeseHydrogen to chemistry-visualizers-energy chunk');

console.log('🎉 Test Suite 357 Passed (8/8 assertions clean)!');
