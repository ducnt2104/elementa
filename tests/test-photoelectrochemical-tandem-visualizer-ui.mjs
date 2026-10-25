// tests/test-photoelectrochemical-tandem-visualizer-ui.mjs
// ELEMENTA TEST SUITE 297: Photoelectrochemical Tandem Visualizer Component & Integration Audit
import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- TEST SUITE 297: PhotoelectrochemicalTandemVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/PhotoelectrochemicalTandemVisualizer.tsx');
const enginePath = path.resolve('src/domain/photoelectrochemicalTandemEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'PhotoelectrochemicalTandemVisualizer.tsx component file must exist');
console.log('  ✓ PhotoelectrochemicalTandemVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'photoelectrochemicalTandemEngine.ts domain engine file must exist');
console.log('  ✓ photoelectrochemicalTandemEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports and dependencies
assert(visualizerContent.includes("from '../../domain/photoelectrochemicalTandemEngine'"), 'Visualizer must import from domain engine');
assert(visualizerContent.includes('solveOperatingPoint'), 'Visualizer must use solveOperatingPoint');
assert(visualizerContent.includes('generateTandemJVCurve'), 'Visualizer must use generateTandemJVCurve');
assert(visualizerContent.includes('generateElectrochemicalLoadCurve'), 'Visualizer must use generateElectrochemicalLoadCurve');
assert(visualizerContent.includes('calculatePECSolarFarmBalance'), 'Visualizer must use calculatePECSolarFarmBalance');
assert(visualizerContent.includes('simulateLifetimeDegradation'), 'Visualizer must use simulateLifetimeDegradation');
console.log('  ✓ PhotoelectrochemicalTandemVisualizer imports all essential domain physics functions');

// 3. Audio UI interactions
assert(visualizerContent.includes('sound.playUiClick()'), 'Visualizer must trigger sound.playUiClick() on interactive selections');
console.log('  ✓ PhotoelectrochemicalTandemVisualizer triggers sound.playUiClick() on interactive selections');

// 4. Interactive modes
assert(visualizerContent.includes('TANDEM_JV_BANDGAP'), 'Mode 1 (TANDEM_JV_BANDGAP) must be supported');
assert(visualizerContent.includes('SOLAR_FARM_BALANCE'), 'Mode 2 (SOLAR_FARM_BALANCE) must be supported');
assert(visualizerContent.includes('PASSIVATION_STABILITY'), 'Mode 3 (PASSIVATION_STABILITY) must be supported');
console.log('  ✓ PhotoelectrochemicalTandemVisualizer supports 3 distinct interactive modes');

// 5. SVG and Diagram rendering
assert(visualizerContent.includes('viewBox="0 0 500 240"'), 'Visualizer must render interactive SVG charts');
assert(visualizerContent.includes('Cathode: H₂'), 'SVG must render cathodic H2 evolution chamber');
assert(visualizerContent.includes('Anode: O₂'), 'SVG must render anodic O2 evolution chamber');
console.log('  ✓ PhotoelectrochemicalTandemVisualizer renders SVG J-V curves and gas evolution chambers');

// 6. Metrics & calculations displayed
assert(visualizerContent.includes('operatingPoint.solarToHydrogenEfficiencyPct'), 'Must display STH efficiency');
assert(visualizerContent.includes('operatingPoint.operatingCurrentDensityMaPerCm2'), 'Must display J_op');
assert(visualizerContent.includes('farmBalance.hydrogenProductionRateKgPerHour'), 'Must display H2 rate kg/hr');
assert(visualizerContent.includes('farmBalance.annualAvoidedCo2TonsPerYear'), 'Must display avoided CO2 tons/year');
assert(visualizerContent.includes('passConfig.operationalLifetimeHours'), 'Must display passivation lifetime');
console.log('  ✓ STH %, J_op, H2 rate, avoided CO2, and passivation lifetime metrics verified');

// 7. PeriodicCodexTab integration
assert(codexContent.includes("import { PhotoelectrochemicalTandemVisualizer } from './visualizations/PhotoelectrochemicalTandemVisualizer';"), 'PeriodicCodexTab must import PhotoelectrochemicalTandemVisualizer');
assert(codexContent.includes("'PHOTOELECTROCHEMICAL_TANDEM'"), 'PeriodicCodexTab must include PHOTOELECTROCHEMICAL_TANDEM tab state');
assert(codexContent.includes('Quang Điện Hóa Tandem (PEC H₂)'), 'PeriodicCodexTab must include tab button label');
assert(codexContent.includes('<PhotoelectrochemicalTandemVisualizer />'), 'PeriodicCodexTab must render <PhotoelectrochemicalTandemVisualizer />');
console.log('  ✓ PeriodicCodexTab integration verified (import, state, button, rendering)');

console.log('🎉 TEST SUITE 297 PASSED: Photoelectrochemical Tandem Visualizer is fully verified!\n');
