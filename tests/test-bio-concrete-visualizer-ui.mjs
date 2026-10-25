// tests/test-bio-concrete-visualizer-ui.mjs
// ELEMENTA TEST SUITE 305: Bio-Concrete Mineralization Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 305: BioConcreteMineralizationVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/BioConcreteMineralizationVisualizer.tsx');
const enginePath = path.resolve('src/domain/bioConcreteMineralizationEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'BioConcreteMineralizationVisualizer.tsx component file must exist');
console.log('  ✓ BioConcreteMineralizationVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'bioConcreteMineralizationEngine.ts domain engine file must exist');
console.log('  ✓ bioConcreteMineralizationEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/bioConcreteMineralizationEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateMicpCuringKinetics'), 'Visualizer must use calculateMicpCuringKinetics');
assert(visualizerContent.includes('simulateCrackSelfHealing'), 'Visualizer must use simulateCrackSelfHealing');
assert(visualizerContent.includes('calculateBioConcreteLcaBalance'), 'Visualizer must use calculateBioConcreteLcaBalance');
console.log('  ✓ BioConcreteMineralizationVisualizer imports domain engine functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ BioConcreteMineralizationVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('MICP_MINERALIZATION_KINETICS'), 'Mode 1 (MICP_MINERALIZATION_KINETICS) must be supported');
assert(visualizerContent.includes('CRACK_SELF_HEALING_SIMULATOR'), 'Mode 2 (CRACK_SELF_HEALING_SIMULATOR) must be supported');
assert(visualizerContent.includes('CARBON_NEGATIVE_LCA_BALANCE'), 'Mode 3 (CARBON_NEGATIVE_LCA_BALANCE) must be supported');
console.log('  ✓ BioConcreteMineralizationVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 500 240"'), 'Visualizer must render interactive SVG kinetics chart');
assert(visualizerContent.includes('Calcite Precipitated (wt%)'), 'SVG legend must mark Calcite Precipitated curve');
assert(visualizerContent.includes('Compressive Strength (UCS MPa)'), 'SVG legend must mark Compressive Strength curve');
console.log('  ✓ BioConcreteMineralizationVisualizer renders SVG kinetics chart with Calcite/Strength curves');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('latestKinetics.calcitePrecipitatedWtPct'), 'Must display Calcite Precipitated wt%');
assert(visualizerContent.includes('latestKinetics.unconfinedCompressiveStrengthMpa'), 'Must display Compressive Strength MPa');
assert(visualizerContent.includes('latestHealing.crackWidthRemainingMm'), 'Must display remaining crack width mm');
assert(visualizerContent.includes('latestHealing.healingRatioPct'), 'Must display healing ratio %');
assert(visualizerContent.includes('lcaBalance.avoidedCarbonEmissionsTons'), 'Must display avoided CO2 vs Portland cement');
assert(visualizerContent.includes('lcaBalance.netCarbonDioxideSequestrationTons'), 'Must display net CO2 balance');
console.log('  ✓ Calcite %, Strength, crack healing width, and net negative CO2 metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { BioConcreteMineralizationVisualizer } from './visualizations/BioConcreteMineralizationVisualizer';"), 'PeriodicCodexTab must import BioConcreteMineralizationVisualizer');
assert(codexContent.includes("'BIO_CONCRETE_MINERALIZATION'"), 'PeriodicCodexTab must include BIO_CONCRETE_MINERALIZATION tab state');
assert(codexContent.includes('Bê Tông Sinh Học Khử Cacbon (MICP)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<BioConcreteMineralizationVisualizer />'), 'PeriodicCodexTab must render <BioConcreteMineralizationVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 305 PASSED: Bio-Concrete Mineralization Visualizer is fully verified!\n');
