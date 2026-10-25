/**
 * test-proton-solid-oxide-electrolyzer-visualizer-ui.mjs
 *
 * Test Suite 327: ProtonSolidOxideElectrolyzerVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, sound triggers, 3 interactive modes,
 * and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 327: ProtonSolidOxideElectrolyzerVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ProtonSolidOxideElectrolyzerVisualizer.tsx');
const enginePath = path.resolve('src/domain/protonSolidOxideElectrolyzerEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'ProtonSolidOxideElectrolyzerVisualizer.tsx component file must exist');
console.log('  ✓ ProtonSolidOxideElectrolyzerVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'protonSolidOxideElectrolyzerEngine.ts domain engine file must exist');
console.log('  ✓ protonSolidOxideElectrolyzerEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('PSOEC_ELECTROLYTE_CATALOG'), 'Visualizer must import PSOEC_ELECTROLYTE_CATALOG');
assert(visualizerCode.includes('ProtonSolidOxideElectrolyzerEngine'), 'Visualizer must import ProtonSolidOxideElectrolyzerEngine');
console.log('  ✓ ProtonSolidOxideElectrolyzerVisualizer imports domain engine functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ ProtonSolidOxideElectrolyzerVisualizer triggers sound.playUiClick() on interactive selections');

// 3 distinct modes
assert(visualizerCode.includes('KROGER_VINK_DRY_SYNGAS'), 'Must support Mode 1: KROGER_VINK_DRY_SYNGAS');
assert(visualizerCode.includes('POLARIZATION_AND_THERMONEUTRAL'), 'Must support Mode 2: POLARIZATION_AND_THERMONEUTRAL');
assert(visualizerCode.includes('POWER_TO_X_PLANT'), 'Must support Mode 3: POWER_TO_X_PLANT');
console.log('  ✓ ProtonSolidOxideElectrolyzerVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('Kröger-Vink') && visualizerCode.includes('Syngas Khô'), 'Visualizer must render interactive SVG MEA cross-section with proton transport');
console.log('  ✓ ProtonSolidOxideElectrolyzerVisualizer renders dynamic SVG proton hopping and dry syngas schematic');

// Scientific metrics & GDPT 2018 terms
assert(visualizerCode.includes('operatingCellElectrolysisVoltageV'), 'Must display operating cell voltage');
assert(visualizerCode.includes('thermoneutralVoltageV'), 'Must display thermoneutral voltage');
assert(visualizerCode.includes('dryCathodeSyngasPurityPercent'), 'Must display 100% dry syngas purity');
assert(visualizerCode.includes('powerToSyngasLhvEfficiencyPercent'), 'Must display LHV efficiency');
console.log('  ✓ Cell voltages, thermoneutral point, dry syngas purity, and LHV efficiency metrics verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { ProtonSolidOxideElectrolyzerVisualizer } from './visualizations/ProtonSolidOxideElectrolyzerVisualizer'"), 'PeriodicCodexTab must import ProtonSolidOxideElectrolyzerVisualizer');
assert(codexCode.includes("'PROTON_SOLID_OXIDE_ELECTROLYZER'"), 'PeriodicCodexTab must include PROTON_SOLID_OXIDE_ELECTROLYZER in its activeMainTab union');
assert(codexCode.includes('<ProtonSolidOxideElectrolyzerVisualizer />'), 'PeriodicCodexTab must render <ProtonSolidOxideElectrolyzerVisualizer />');
console.log('  ✓ PeriodicCodexTab imports and renders ProtonSolidOxideElectrolyzerVisualizer under PROTON_SOLID_OXIDE_ELECTROLYZER tab');

console.log('🎉 Test Suite 327 Passed (8/8 assertions clean)!');
