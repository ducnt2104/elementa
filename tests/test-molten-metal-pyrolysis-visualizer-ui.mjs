// tests/test-molten-metal-pyrolysis-visualizer-ui.mjs
// ELEMENTA TEST SUITE 313: Molten Metal Pyrolysis Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 313: MoltenMetalPyrolysisVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MoltenMetalPyrolysisVisualizer.tsx');
const enginePath = path.resolve('src/domain/moltenMetalMethanePyrolysisEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'MoltenMetalPyrolysisVisualizer.tsx component file must exist');
console.log('  ✓ MoltenMetalPyrolysisVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'moltenMetalMethanePyrolysisEngine.ts domain engine file must exist');
console.log('  ✓ moltenMetalMethanePyrolysisEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/moltenMetalMethanePyrolysisEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculatePyrolysisKinetics'), 'Visualizer must use calculatePyrolysisKinetics');
assert(visualizerContent.includes('calculatePyrolysisPlantBalance'), 'Visualizer must use calculatePyrolysisPlantBalance');
assert(visualizerContent.includes('MOLTEN_CATALYST_CATALOG'), 'Visualizer must import MOLTEN_CATALYST_CATALOG');
console.log('  ✓ MoltenMetalPyrolysisVisualizer imports domain engine functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ MoltenMetalPyrolysisVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('BUBBLE_COLUMN_AND_BUOYANCY'), 'Mode 1 (BUBBLE_COLUMN_AND_BUOYANCY) must be supported');
assert(visualizerContent.includes('ARRHENIUS_KINETICS_EQUILIBRIUM'), 'Mode 2 (ARRHENIUS_KINETICS_EQUILIBRIUM) must be supported');
assert(visualizerContent.includes('COMMERCIAL_PLANT_MASS_BALANCE'), 'Mode 3 (COMMERCIAL_PLANT_MASS_BALANCE) must be supported');
console.log('  ✓ MoltenMetalPyrolysisVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 500 240"'), 'Visualizer must render interactive SVG conversion chart');
assert(visualizerContent.includes('Methane Conversion (%)'), 'SVG legend must mark Methane Conversion curve');
assert(visualizerContent.includes('90% Target Benchmark'), 'SVG legend must mark 90% benchmark line');
console.log('  ✓ MoltenMetalPyrolysisVisualizer renders SVG conversion curve');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('kinetics.methaneConversionPct'), 'Must display Methane Conversion %');
assert(visualizerContent.includes('kinetics.hydrogenPurityBeforePsaPct'), 'Must display H2 Purity Before PSA %');
assert(visualizerContent.includes('kinetics.carbonBuoyancyTerminalVelocityCmS'), 'Must display Carbon Float Velocity cm/s');
assert(visualizerContent.includes('plantBalance.hourlyHydrogenProductionKg'), 'Must display Hourly H2 Production kg/hr');
assert(visualizerContent.includes('plantBalance.hourlyCarbonBlackProductionKg'), 'Must display Hourly Carbon Black Production kg/hr');
assert(visualizerContent.includes('plantBalance.avoidedSmrCarbonDioxideTonsPerYear'), 'Must display Avoided SMR CO2 tons/yr');
console.log('  ✓ Conversion, H2 purity, float velocity, H2/Carbon outputs, and avoided CO2 metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { MoltenMetalPyrolysisVisualizer } from './visualizations/MoltenMetalPyrolysisVisualizer';"), 'PeriodicCodexTab must import MoltenMetalPyrolysisVisualizer');
assert(codexContent.includes("'MOLTEN_METAL_PYROLYSIS'"), 'PeriodicCodexTab must include MOLTEN_METAL_PYROLYSIS tab state');
assert(codexContent.includes('Nhiệt Phân Methane Kim Loại Lỏng (Turquoise H₂)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<MoltenMetalPyrolysisVisualizer />'), 'PeriodicCodexTab must render <MoltenMetalPyrolysisVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 313 PASSED: Molten Metal Pyrolysis Visualizer is fully verified!\n');
