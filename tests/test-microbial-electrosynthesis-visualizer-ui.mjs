// tests/test-microbial-electrosynthesis-visualizer-ui.mjs
// ELEMENTA TEST SUITE 293: Microbial Electrosynthesis Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 293: MicrobialElectrosynthesisVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MicrobialElectrosynthesisVisualizer.tsx');
const enginePath = path.resolve('src/domain/microbialElectrosynthesisEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'MicrobialElectrosynthesisVisualizer.tsx component file must exist');
console.log('  ✓ MicrobialElectrosynthesisVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'microbialElectrosynthesisEngine.ts domain engine file must exist');
console.log('  ✓ microbialElectrosynthesisEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/microbialElectrosynthesisEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateMesKinetics'), 'Visualizer must use calculateMesKinetics');
assert(visualizerContent.includes('calculateMesPlantBalance'), 'Visualizer must use calculateMesPlantBalance');
assert(visualizerContent.includes('evaluateBiofilmHealth'), 'Visualizer must use evaluateBiofilmHealth');
console.log('  ✓ MicrobialElectrosynthesisVisualizer must import functions from microbialElectrosynthesisEngine');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ MicrobialElectrosynthesisVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('BIOELECTROCHEMICAL_CELL_AND_GDB'), 'Mode 1 must be supported');
assert(visualizerContent.includes('PLANT_MASS_ENERGY_SIMULATOR'), 'Mode 2 must be supported');
assert(visualizerContent.includes('BIOFILM_HEALTH_AND_BENCHMARK'), 'Mode 3 must be supported');
console.log('  ✓ MicrobialElectrosynthesisVisualizer must support 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('<svg viewBox="0 0 900 270"'), 'Visualizer must render interactive SVG bioelectrochemical cell');
assert(visualizerContent.includes('Ngăn Cực Dương Anot (OER)'), 'SVG must render anode chamber');
assert(visualizerContent.includes('Ngăn Biocathode Vi Sinh'), 'SVG must render biocathode chamber');
assert(visualizerContent.includes('Lớp PTFE Kỵ Nước'), 'SVG must render hydrophobic PTFE GDB layer');
assert(visualizerContent.includes('Màng PEM / AEM'), 'SVG must render separator membrane');
console.log('  ✓ MicrobialElectrosynthesisVisualizer must render interactive SVG diagrams');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('kinetics.currentDensityAPerM2'), 'Must display current density A/m²');
assert(visualizerContent.includes('plantBalance.co2ConsumptionRateKgPerHour'), 'Must display CO2 consumption rate');
assert(visualizerContent.includes('plantBalance.aceticAcidProductionKgPerHour'), 'Must display acetic acid kg/hr');
assert(visualizerContent.includes('biofilmHealth.biofilmThicknessMicrons'), 'Must display biofilm thickness');
console.log('  ✓ Current density, CO2 rate, acetic acid yield, and biofilm metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { MicrobialElectrosynthesisVisualizer } from './visualizations/MicrobialElectrosynthesisVisualizer';"), 'PeriodicCodexTab must import MicrobialElectrosynthesisVisualizer');
assert(codexContent.includes("'MICROBIAL_ELECTROSYNTHESIS_MES'"), 'PeriodicCodexTab must include MICROBIAL_ELECTROSYNTHESIS_MES tab state');
assert(codexContent.includes('Điện Hóa Sinh Học MES (CO₂ → Axetat)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<MicrobialElectrosynthesisVisualizer />'), 'PeriodicCodexTab must render <MicrobialElectrosynthesisVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 293: ALL CHECKS PASSED (7/7) ---');
