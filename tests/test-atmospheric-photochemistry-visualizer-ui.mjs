// tests/test-atmospheric-photochemistry-visualizer-ui.mjs
// Test Suite 225: AtmosphericPhotochemistryVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & QCVN 19 Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 225: AtmosphericPhotochemistryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/AtmosphericPhotochemistryVisualizer.tsx');
const enginePath = path.resolve('src/domain/atmosphericPhotochemistryEngine.ts');
const periodicCodexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

let passedCount = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    process.exit(1);
  }
}

// 1. Files existence
test('AtmosphericPhotochemistryVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('atmosphericPhotochemistryEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('AtmosphericPhotochemistryVisualizer must import simulation functions from engine', () => {
  assert(visualizerContent.includes('CHAPMAN_CYCLE_STEPS'), 'Must import CHAPMAN_CYCLE_STEPS');
  assert(visualizerContent.includes('CFC_CATALYTIC_MECHANISM'), 'Must import CFC_CATALYTIC_MECHANISM');
  assert(visualizerContent.includes('simulateStratosphericOzone'), 'Must import simulateStratosphericOzone');
  assert(visualizerContent.includes('generatePhotochemicalSmogDiurnalProfile'), 'Must import generatePhotochemicalSmogDiurnalProfile');
  assert(visualizerContent.includes('evaluateAcidRainImpact'), 'Must import evaluateAcidRainImpact');
  assert(visualizerContent.includes('simulateFlueGasDesulfurization'), 'Must import simulateFlueGasDesulfurization');
});

test('AtmosphericPhotochemistryVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('AtmosphericPhotochemistryVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'STRATOSPHERIC_OZONE_CHAPMAN'"), 'Must support STRATOSPHERIC_OZONE_CHAPMAN');
  assert(visualizerContent.includes("'PHOTOCHEMICAL_SMOG_DIURNAL'"), 'Must support PHOTOCHEMICAL_SMOG_DIURNAL');
  assert(visualizerContent.includes("'ACID_RAIN_FGD_SCRUBBER'"), 'Must support ACID_RAIN_FGD_SCRUBBER');
});

// 4. SVG and Interactive Graphics
test('AtmosphericPhotochemistryVisualizer must render interactive SVG diagrams', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 700 380"'), 'Must render Stratosphere atmosphere SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 750 260"'), 'Must render Photochemical Smog skyline SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 500 240"'), 'Must render FGD Scrubber & Monument SVGs');
});

// 5. Educational and Standards Citations
test('AtmosphericPhotochemistryVisualizer must reference GDPT 2018, Montreal Protocol and QCVN standards', () => {
  assert(visualizerContent.includes('GDPT 2018'), 'Must cite GDPT 2018');
  assert(visualizerContent.includes('Montreal'), 'Must cite Montreal Protocol');
  assert(visualizerContent.includes('QCVN 19:2009/BTNMT'), 'Must cite QCVN 19 standard');
  assert(visualizerContent.includes('QCVN 05:2023/BTNMT'), 'Must cite QCVN 05 AQI standard');
});

// 6. PeriodicCodexTab integration
const codexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import AtmosphericPhotochemistryVisualizer', () => {
  assert(codexContent.includes("import { AtmosphericPhotochemistryVisualizer } from './visualizations/AtmosphericPhotochemistryVisualizer';"),
    'Must import AtmosphericPhotochemistryVisualizer');
});

test('PeriodicCodexTab state union must include ATMOSPHERIC_PHOTOCHEMISTRY', () => {
  assert(codexContent.includes("'ATMOSPHERIC_PHOTOCHEMISTRY'"), 'State union must include ATMOSPHERIC_PHOTOCHEMISTRY');
});

test('PeriodicCodexTab must provide a navigation button for Atmospheric Photochemistry', () => {
  assert(codexContent.includes("setActiveMainTab('ATMOSPHERIC_PHOTOCHEMISTRY')"), 'Must have button to activate ATMOSPHERIC_PHOTOCHEMISTRY');
  assert(codexContent.includes('Quang Hóa Khí Quyển & Môi Trường'), 'Must display tab title');
});

test('PeriodicCodexTab must render AtmosphericPhotochemistryVisualizer when active', () => {
  assert(codexContent.includes("<AtmosphericPhotochemistryVisualizer />"), 'Must render AtmosphericPhotochemistryVisualizer');
});

console.log(`\n======================================================================`);
console.log(`   ALL ${passedCount} TESTS IN SUITE 225 PASSED AUDIT VERIFICATION!   `);
console.log(`======================================================================\n`);
