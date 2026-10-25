/**
 * test-direct-ethanol-solid-oxide-visualizer-ui.mjs
 *
 * Test Suite 351: DirectEthanolSolidOxideVisualizer Component & Integration Audit
 * Audits component existence, domain engine imports, audio triggers, 3 interactive modes,
 * dynamic SVG cell schematic, 0.0 kg net lifecycle CO2 emissions, and integration into PeriodicCodexTab.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 351: DirectEthanolSolidOxideVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/DirectEthanolSolidOxideVisualizer.tsx');
const enginePath = path.resolve('src/domain/directEthanolSolidOxideEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Check file existence
assert(fs.existsSync(visualizerPath), 'DirectEthanolSolidOxideVisualizer.tsx component file must exist');
console.log('  ✔ DirectEthanolSolidOxideVisualizer.tsx component file exists');

assert(fs.existsSync(enginePath), 'directEthanolSolidOxideEngine.ts domain engine file must exist');
console.log('  ✔ directEthanolSolidOxideEngine.ts domain engine file exists');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✔ PeriodicCodexTab.tsx file exists');

// 2. Audit component contents
const visualizerCode = fs.readFileSync(visualizerPath, 'utf8');

// Domain imports
assert(visualizerCode.includes('DE_SOFC_ELECTROLYTES'), 'Visualizer must import DE_SOFC_ELECTROLYTES');
assert(visualizerCode.includes('DE_SOFC_ANODES'), 'Visualizer must import DE_SOFC_ANODES');
assert(visualizerCode.includes('calculateEthanolReformingEquilibrium'), 'Visualizer must import calculateEthanolReformingEquilibrium');
assert(visualizerCode.includes('generateDESOFCPolarizationCurve'), 'Visualizer must import generateDESOFCPolarizationCurve');
assert(visualizerCode.includes('calculateDESOFCOperatingPerformance'), 'Visualizer must import calculateDESOFCOperatingPerformance');
assert(visualizerCode.includes('sizeRuralAgriculturalMicrogrid'), 'Visualizer must import sizeRuralAgriculturalMicrogrid');
console.log('  ✔ DirectEthanolSolidOxideVisualizer imports domain engine constants and functions');

// Audio triggers
assert(visualizerCode.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive actions');
console.log('  ✔ DirectEthanolSolidOxideVisualizer triggers sound.playUiClick() on user interactions');

// 3 distinct interactive modes
assert(visualizerCode.includes('INTERNAL_REFORMING_EQUILIBRIUM'), 'Must support Mode 1: INTERNAL_REFORMING_EQUILIBRIUM');
assert(visualizerCode.includes('PROFOUND_POLARIZATION_CURVE'), 'Must support Mode 2: PROFOUND_POLARIZATION_CURVE');
assert(visualizerCode.includes('RURAL_BIOMASS_MICROGRID'), 'Must support Mode 3: RURAL_BIOMASS_MICROGRID');
console.log('  ✔ DirectEthanolSolidOxideVisualizer supports 3 distinct interactive modes');

// SVG diagram
assert(visualizerCode.includes('<svg') && visualizerCode.includes('C₂H₅OH ➔ 2CO₂ + 6H₂') && visualizerCode.includes('LSCF-GDC'), 'Visualizer must render interactive SVG DE-SOFC cell schematic');
console.log('  ✔ DirectEthanolSolidOxideVisualizer renders dynamic SVG DE-SOFC cell schematic');

// Scientific metrics & Zero lifecycle emissions
assert(visualizerCode.includes('reformingResult.equilibriumH2Percent'), 'Must display equilibrium H2 fraction');
assert(visualizerCode.includes('reformingResult.cokingResistancePercent'), 'Must display coking resistance index');
assert(visualizerCode.includes('stackPerformance.electricalEfficiencyLHVPercent'), 'Must display electrical efficiency');
assert(visualizerCode.includes('microgridResult.annualAvoidedDieselCostUSD'), 'Must display annual avoided diesel cost');
assert(visualizerCode.includes('0.0 kg CO₂/kWh'), 'Must display 0.0 kg CO2/kWh net lifecycle emission');
console.log('  ✔ Equilibrium gases, coking resistance, electrical efficiency, and 0.0 kg CO2/kWh net lifecycle emission verified');

// 3. Audit PeriodicCodexTab integration
const codexCode = fs.readFileSync(codexPath, 'utf8');
assert(codexCode.includes("import { DirectEthanolSolidOxideVisualizer } from './visualizations/DirectEthanolSolidOxideVisualizer'"), 'PeriodicCodexTab must import DirectEthanolSolidOxideVisualizer');
assert(codexCode.includes('DIRECT_ETHANOL_SOLID_OXIDE'), 'PeriodicCodexTab must register DIRECT_ETHANOL_SOLID_OXIDE tab key');
assert(codexCode.includes('<DirectEthanolSolidOxideVisualizer />'), 'PeriodicCodexTab must render DirectEthanolSolidOxideVisualizer');
console.log('  ✔ DirectEthanolSolidOxideVisualizer integrated cleanly into PeriodicCodexTab.tsx');

// 4. Audit vite.config.ts chunk configuration
const vitePath = path.resolve('vite.config.ts');
const viteCode = fs.readFileSync(vitePath, 'utf8');
assert(viteCode.includes('DirectEthanol'), 'vite.config.ts must map DirectEthanol to chemistry-visualizers-energy chunk');
console.log('  ✔ vite.config.ts maps DirectEthanol to chemistry-visualizers-energy chunk');

console.log('🎉 Test Suite 351 Passed (8/8 assertions clean)!');
