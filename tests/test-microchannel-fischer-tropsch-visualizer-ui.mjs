// tests/test-microchannel-fischer-tropsch-visualizer-ui.mjs
// ELEMENTA TEST SUITE 289: Microchannel Fischer-Tropsch Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 289: MicrochannelFischerTropschVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MicrochannelFischerTropschVisualizer.tsx');
const enginePath = path.resolve('src/domain/microchannelFischerTropschEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'MicrochannelFischerTropschVisualizer.tsx component file must exist');
console.log('  ✓ MicrochannelFischerTropschVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'microchannelFischerTropschEngine.ts domain engine file must exist');
console.log('  ✓ microchannelFischerTropschEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/microchannelFischerTropschEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateAsfDistribution'), 'Visualizer must use calculateAsfDistribution');
assert(visualizerContent.includes('calculateMicrochannelHeatTransfer'), 'Visualizer must use calculateMicrochannelHeatTransfer');
assert(visualizerContent.includes('calculatePlantMassEnergyBalance'), 'Visualizer must use calculatePlantMassEnergyBalance');
assert(visualizerContent.includes('evaluateAstmD7566Compliance'), 'Visualizer must use evaluateAstmD7566Compliance');
console.log('  ✓ MicrochannelFischerTropschVisualizer must import functions from microchannelFischerTropschEngine');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ MicrochannelFischerTropschVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('ASF_DISTRIBUTION_AND_REACTOR_FLOW'), 'Mode 1 must be supported');
assert(visualizerContent.includes('PLANT_MASS_ENERGY_SIMULATOR'), 'Mode 2 must be supported');
assert(visualizerContent.includes('ASTM_D7566_SAF_CERTIFICATION_AND_BENCHMARK'), 'Mode 3 must be supported');
console.log('  ✓ MicrochannelFischerTropschVisualizer must support 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('<svg viewBox="0 0 900 280"'), 'Visualizer must render interactive SVG reactor flowsheet');
assert(visualizerContent.includes('Lõi Lò Phản Ứng Vi Kênh'), 'SVG must render microchannel reactor core');
assert(visualizerContent.includes('Bộ Tách 3 Pha'), 'SVG must render 3-phase separator');
assert(visualizerContent.includes('Cracking Sáp'), 'SVG must render wax hydrocracking skid');
console.log('  ✓ MicrochannelFischerTropschVisualizer must render interactive SVG diagrams');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('plantBalance.syncrudeProductionKgPerHour'), 'Must display syncrude kg/hr');
assert(visualizerContent.includes('plantBalance.totalSafWithHydrocrackingKgPerHour'), 'Must display SAF kg/hr');
assert(visualizerContent.includes('plantBalance.flightsPoweredPerYear'), 'Must display flights powered');
assert(visualizerContent.includes('compliance.freezingPointDegC'), 'Must display ASTM D7566 freezing point');
console.log('  ✓ Syncrude, SAF yield, flight equivalents, and freezing point metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { MicrochannelFischerTropschVisualizer } from './visualizations/MicrochannelFischerTropschVisualizer';"), 'PeriodicCodexTab must import MicrochannelFischerTropschVisualizer');
assert(codexContent.includes("'MICROCHANNEL_FISCHER_TROPSCH'"), 'PeriodicCodexTab must include MICROCHANNEL_FISCHER_TROPSCH tab state');
assert(codexContent.includes('Fischer-Tropsch Vi Kênh (SAF)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<MicrochannelFischerTropschVisualizer />'), 'PeriodicCodexTab must render <MicrochannelFischerTropschVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 289: ALL CHECKS PASSED (7/7) ---');
