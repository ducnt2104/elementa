// tests/test-industrial-electrochemical-visualizer-ui.mjs
// Test Suite 217: IndustrialElectrochemicalVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & IUPAC Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 217: IndustrialElectrochemicalVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/IndustrialElectrochemicalVisualizer.tsx');
const enginePath = path.resolve('src/domain/industrialElectrochemicalRefiningEngine.ts');
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
test('IndustrialElectrochemicalVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('industrialElectrochemicalRefiningEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('IndustrialElectrochemicalVisualizer must import simulation functions from engine', () => {
  assert(visualizerContent.includes('simulateChlorAlkaliMembraneCell'), 'Must import simulateChlorAlkaliMembraneCell');
  assert(visualizerContent.includes('BLISTER_COPPER_TYPICAL_COMPOSITION'), 'Must import BLISTER_COPPER_TYPICAL_COMPOSITION');
  assert(visualizerContent.includes('simulateCopperAnodicRefining'), 'Must import simulateCopperAnodicRefining');
  assert(visualizerContent.includes('ELECTROLYZER_TECHNOLOGIES'), 'Must import ELECTROLYZER_TECHNOLOGIES');
});

test('IndustrialElectrochemicalVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('IndustrialElectrochemicalVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'MEMBRANE_CHLOR_ALKALI'"), 'Must support MEMBRANE_CHLOR_ALKALI');
  assert(visualizerContent.includes("'COPPER_ANODIC_REFINING'"), 'Must support COPPER_ANODIC_REFINING');
  assert(visualizerContent.includes("'GREEN_HYDROGEN_PEM'"), 'Must support GREEN_HYDROGEN_PEM');
});

// 4. SVG Visualizations
test('IndustrialElectrochemicalVisualizer must include dynamic SVG Chlor-Alkali cell with Nafion membrane', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 540 220"'), 'Must contain 540x220 cell chamber SVG');
  assert(visualizerContent.includes('MÀNG NAFION'), 'Must label central Nafion membrane');
  assert(visualizerContent.includes('Anot Titan DSA'), 'Must label DSA anode');
  assert(visualizerContent.includes('Catot Niken Xốp'), 'Must label Nickel cathode');
});

test('IndustrialElectrochemicalVisualizer must include Blister copper refining tank and precious metals valuation', () => {
  assert(visualizerContent.includes('Cu-ETP') || visualizerContent.includes('Bùn Anot (Au, Ag, Pt'), 'Must visualize anode slime');
  assert(visualizerContent.includes('preciousMetalsEconomicValueUsd'), 'Must compute precious metals economic value');
});

// 5. Integration into PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import IndustrialElectrochemicalVisualizer', () => {
  assert(periodicCodexContent.includes("import { IndustrialElectrochemicalVisualizer } from './visualizations/IndustrialElectrochemicalVisualizer';"), 'Import missing');
});

test('PeriodicCodexTab must include INDUSTRIAL_ELECTROCHEMICAL_REFINING in activeMainTab type union', () => {
  assert(periodicCodexContent.includes("'INDUSTRIAL_ELECTROCHEMICAL_REFINING'"), 'Tab type missing');
});

test('PeriodicCodexTab must render IndustrialElectrochemicalVisualizer when activeMainTab is INDUSTRIAL_ELECTROCHEMICAL_REFINING', () => {
  assert(periodicCodexContent.includes("<IndustrialElectrochemicalVisualizer />"), 'Component JSX call missing');
});

test('PeriodicCodexTab must contain the navigation button for Điện Phân Xút - Clo & Luyện Đồng', () => {
  assert(periodicCodexContent.includes('Điện Phân Xút - Clo & Luyện Đồng'), 'Navigation label missing');
  assert(periodicCodexContent.includes("setActiveMainTab('INDUSTRIAL_ELECTROCHEMICAL_REFINING')"), 'Click handler missing');
});

console.log(`\n======================================================================`);
console.log(`   TEST SUITE 217: ALL ${passedCount}/12 TESTS PASSED PERFECTLY       `);
console.log(`======================================================================\n`);
