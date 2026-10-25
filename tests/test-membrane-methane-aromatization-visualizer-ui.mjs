// tests/test-membrane-methane-aromatization-visualizer-ui.mjs
// ELEMENTA TEST SUITE 291: Membrane Methane Aromatization Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 291: MembraneMethaneAromatizationVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MembraneMethaneAromatizationVisualizer.tsx');
const enginePath = path.resolve('src/domain/membraneMethaneAromatizationEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'MembraneMethaneAromatizationVisualizer.tsx component file must exist');
console.log('  ✓ MembraneMethaneAromatizationVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'membraneMethaneAromatizationEngine.ts domain engine file must exist');
console.log('  ✓ membraneMethaneAromatizationEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/membraneMethaneAromatizationEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('calculateEquilibriumVsMembrane'), 'Visualizer must use calculateEquilibriumVsMembrane');
assert(visualizerContent.includes('calculateMembraneFlux'), 'Visualizer must use calculateMembraneFlux');
assert(visualizerContent.includes('calculateMdaPlantBalance'), 'Visualizer must use calculateMdaPlantBalance');
assert(visualizerContent.includes('evaluateCatalystCoking'), 'Visualizer must use evaluateCatalystCoking');
console.log('  ✓ MembraneMethaneAromatizationVisualizer must import functions from membraneMethaneAromatizationEngine');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ MembraneMethaneAromatizationVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('LE_CHATELIER_EQUILIBRIUM_AND_REACTOR'), 'Mode 1 must be supported');
assert(visualizerContent.includes('TECHNO_ECONOMIC_MASS_ENERGY_SIMULATOR'), 'Mode 2 must be supported');
assert(visualizerContent.includes('COKING_KINETICS_AND_REGENERATION'), 'Mode 3 must be supported');
console.log('  ✓ MembraneMethaneAromatizationVisualizer must support 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('<svg viewBox="0 0 900 270"'), 'Visualizer must render interactive SVG reactor diagram');
assert(visualizerContent.includes('Ống Màng Gốm Dẫn Proton BZY'), 'SVG must render central BZY protonic membrane tube');
assert(visualizerContent.includes('Lớp Xúc Tác Lưỡng Chức Năng Mo/ZSM-5'), 'SVG must render annular Mo/ZSM-5 catalyst bed');
assert(visualizerContent.includes('HYDRO TINH KHIẾT'), 'SVG must render pure hydrogen permeate outlet');
console.log('  ✓ MembraneMethaneAromatizationVisualizer must render interactive SVG diagrams');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('eqData.conversionEnhancementFactor'), 'Must display Le Chatelier enhancement multiplier');
assert(visualizerContent.includes('plantBalance.benzeneProductionKgPerHour'), 'Must display benzene kg/hr');
assert(visualizerContent.includes('plantBalance.pureHydrogenProducedNm3PerHour'), 'Must display pure hydrogen Nm3/hr');
assert(visualizerContent.includes('cokingData.carbonCokeDepositedWtPct'), 'Must display coking wt%');
console.log('  ✓ Benzene yield, hydrogen output, Le Chatelier multiplier, and coking metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { MembraneMethaneAromatizationVisualizer } from './visualizations/MembraneMethaneAromatizationVisualizer';"), 'PeriodicCodexTab must import MembraneMethaneAromatizationVisualizer');
assert(codexContent.includes("'MEMBRANE_METHANE_AROMATIZATION'"), 'PeriodicCodexTab must include MEMBRANE_METHANE_AROMATIZATION tab state');
assert(codexContent.includes('Lò Phản Ứng Màng MDA (H₂ & C₆H₆)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<MembraneMethaneAromatizationVisualizer />'), 'PeriodicCodexTab must render <MembraneMethaneAromatizationVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 291: ALL CHECKS PASSED (7/7) ---');
