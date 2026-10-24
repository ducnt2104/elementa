// tests/test-photocatalytic-energy-visualizer-ui.mjs
// Test Suite 233: PhotocatalyticEnergyVisualizer Component & PeriodicCodexTab Audit
// Standardized against Honda-Fujishima Effect (1972) & Vietnam GDPT 2018 Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 233: PhotocatalyticEnergyVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/PhotocatalyticEnergyVisualizer.tsx');
const enginePath = path.resolve('src/domain/photocatalyticEnergyEngine.ts');
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
test('PhotocatalyticEnergyVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('photocatalyticEnergyEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('PhotocatalyticEnergyVisualizer must import functions from photocatalyticEnergyEngine', () => {
  assert(visualizerContent.includes('PHOTOCATALYST_CATALOG'), 'Must import PHOTOCATALYST_CATALOG');
  assert(visualizerContent.includes('simulateZSchemeWaterSplitting'), 'Must import simulateZSchemeWaterSplitting');
  assert(visualizerContent.includes('calculatePerovskiteTandemEfficiency'), 'Must import calculatePerovskiteTandemEfficiency');
});

test('PhotocatalyticEnergyVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('PhotocatalyticEnergyVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'BAND_ALIGNMENT_SPLITTING'"), 'Must support BAND_ALIGNMENT_SPLITTING');
  assert(visualizerContent.includes("'Z_SCHEME_PHOTOSYNTHESIS'"), 'Must support Z_SCHEME_PHOTOSYNTHESIS');
  assert(visualizerContent.includes("'PEROVSKITE_TANDEM_SOLAR'"), 'Must support PEROVSKITE_TANDEM_SOLAR');
});

// 4. SVG and Interactive Graphics
test('PhotocatalyticEnergyVisualizer must render interactive SVG diagrams', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 600 320"'), 'Must render Band Alignment vs NHE SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 700 250"'), 'Must render Z-Scheme Dual Panel SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 540 260"'), 'Must render Tandem Solar Cell Cross-Section SVG');
});

// 5. Scientific Citations & Energy Feasibility Targets
test('PhotocatalyticEnergyVisualizer must reference Honda-Fujishima, Z-Scheme, and Tandem efficiency', () => {
  assert(visualizerContent.includes('Honda-Fujishima'), 'Must cite Honda-Fujishima 1972');
  assert(visualizerContent.includes('Z-Scheme'), 'Must cite Z-Scheme artificial photosynthesis');
  assert(visualizerContent.includes('Perovskite'), 'Must cite Perovskite');
  assert(visualizerContent.includes('Shockley-Queisser') || visualizerContent.includes('Tandem'), 'Must cite tandem breakthrough');
});

// 6. PeriodicCodexTab integration
const codexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import PhotocatalyticEnergyVisualizer', () => {
  assert(codexContent.includes("import { PhotocatalyticEnergyVisualizer } from './visualizations/PhotocatalyticEnergyVisualizer';"),
    'Must import PhotocatalyticEnergyVisualizer');
});

test('PeriodicCodexTab state union must include PHOTOCATALYTIC_SOLAR_ENERGY', () => {
  assert(codexContent.includes("'PHOTOCATALYTIC_SOLAR_ENERGY'"), 'State union must include PHOTOCATALYTIC_SOLAR_ENERGY');
});

test('PeriodicCodexTab must provide a navigation button for Photocatalytic Energy', () => {
  assert(codexContent.includes("setActiveMainTab('PHOTOCATALYTIC_SOLAR_ENERGY')"), 'Must have button to activate PHOTOCATALYTIC_SOLAR_ENERGY');
  assert(codexContent.includes('Quang Xúc Tác &amp; Pin Tandem') || codexContent.includes('Quang Xúc Tác & Pin Tandem'),
    'Must display tab title');
});

test('PeriodicCodexTab must render PhotocatalyticEnergyVisualizer when active', () => {
  assert(codexContent.includes("<PhotocatalyticEnergyVisualizer />"), 'Must render PhotocatalyticEnergyVisualizer');
});

console.log(`\n======================================================================`);
console.log(`   ALL ${passedCount} TESTS IN SUITE 233 PASSED AUDIT VERIFICATION!   `);
console.log(`======================================================================\n`);
