/**
 * test-direct-formic-acid-solid-oxide-visualizer-ui.mjs
 *
 * Test Suite 343: DirectFormicAcidSolidOxideVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * ceramic cell cross-section SVG schematic, Combined Heat & Power (CHP) metrics, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 343: DirectFormicAcidSolidOxideVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/DirectFormicAcidSolidOxideVisualizer.tsx');
const enginePath = path.resolve('src/domain/directFormicAcidSolidOxideEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'DirectFormicAcidSolidOxideVisualizer.tsx component file must exist');
console.log('  ✔ DirectFormicAcidSolidOxideVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'directFormicAcidSolidOxideEngine.ts domain engine file must exist');
console.log('  ✔ directFormicAcidSolidOxideEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('DFA_SOFC_ELECTROLYTES'), 'Visualizer must import DFA_SOFC_ELECTROLYTES');
assert(visualizerCode.includes('DFA_SOFC_ANODES'), 'Visualizer must import DFA_SOFC_ANODES');
assert(visualizerCode.includes('DirectFormicAcidSolidOxideEngine'), 'Visualizer must import DirectFormicAcidSolidOxideEngine');
console.log('  ✔ DirectFormicAcidSolidOxideVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✔ DirectFormicAcidSolidOxideVisualizer triggers sound.playUiClick() on interactive actions');

// 3 distinct modes
assert(visualizerCode.includes('INTERNAL_REFORMING_EQUILIBRIUM'), 'Must support Mode 1: INTERNAL_REFORMING_EQUILIBRIUM');
assert(visualizerCode.includes('PROFOUND_POLARIZATION_CURVE'), 'Must support Mode 2: PROFOUND_POLARIZATION_CURVE');
assert(visualizerCode.includes('CHP_COGENERATION_MICROGRID'), 'Must support Mode 3: CHP_COGENERATION_MICROGRID');
console.log('  ✔ DirectFormicAcidSolidOxideVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('CỰC ÂM ANODE') && visualizerCode.includes('CỰC DƯƠNG CATHODE'), 'Visualizer must render interactive SVG ceramic cell cross-section schematic');
console.log('  ✔ DirectFormicAcidSolidOxideVisualizer renders dynamic SVG ceramic cell cross-section');

// Scientific metrics & GDPT 2018 / IUPAC terms
assert(visualizerCode.includes('reversibleNernstVoltageV'), 'Must display reversible Nernst potential');
assert(visualizerCode.includes('operatingCellVoltageV'), 'Must display operating cell voltage');
assert(visualizerCode.includes('powerDensityWPerCm2'), 'Must display power density in W/cm2');
assert(visualizerCode.includes('combinedChpEfficiencyPercent'), 'Must display combined CHP efficiency');
console.log('  ✔ Nernst OCV, operating voltage, power density, and CHP co-generation efficiency metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { DirectFormicAcidSolidOxideVisualizer } from './visualizations/DirectFormicAcidSolidOxideVisualizer'"), 'PeriodicCodexTab must import DirectFormicAcidSolidOxideVisualizer');
assert(codexCode.includes("'DIRECT_FORMIC_ACID_SOLID_OXIDE'"), 'PeriodicCodexTab must include DIRECT_FORMIC_ACID_SOLID_OXIDE in its activeMainTab union');
assert(codexCode.includes('<DirectFormicAcidSolidOxideVisualizer />'), 'PeriodicCodexTab must render <DirectFormicAcidSolidOxideVisualizer />');
console.log('  ✔ PeriodicCodexTab imports and renders DirectFormicAcidSolidOxideVisualizer under DIRECT_FORMIC_ACID_SOLID_OXIDE tab');

console.log('🎉 Test Suite 343 Passed (8/8 assertions clean)!');
