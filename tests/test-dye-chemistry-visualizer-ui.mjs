// tests/test-dye-chemistry-visualizer-ui.mjs
// Test Suite 221: DyeChemistryVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & QCVN 13-MT:2015/BTNMT Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 221: DyeChemistryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/DyeChemistryVisualizer.tsx');
const enginePath = path.resolve('src/domain/dyeChemistryEngine.ts');
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
test('DyeChemistryVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('dyeChemistryEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('DyeChemistryVisualizer must import simulation functions from engine', () => {
  assert(visualizerContent.includes('DYES_CATALOG'), 'Must import DYES_CATALOG');
  assert(visualizerContent.includes('simulateDiazotizationReaction'), 'Must import simulateDiazotizationReaction');
  assert(visualizerContent.includes('simulateAzoCoupling'), 'Must import simulateAzoCoupling');
  assert(visualizerContent.includes('simulateFentonDecolorization'), 'Must import simulateFentonDecolorization');
});

test('DyeChemistryVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('DyeChemistryVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'DIAZOTIZATION_AZO_LAB'"), 'Must support DIAZOTIZATION_AZO_LAB');
  assert(visualizerContent.includes("'CHROMOPHORE_HOMO_LUMO'"), 'Must support CHROMOPHORE_HOMO_LUMO');
  assert(visualizerContent.includes("'FENTON_WASTEWATER'"), 'Must support FENTON_WASTEWATER');
});

// 4. SVG Visualizations
test('DyeChemistryVisualizer must include dynamic SVG synthesis bench with ice bath and coupling flask', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 540 220"'), 'Must contain 540x220 synthesis bench SVG');
  assert(visualizerContent.includes('Chậu nước đá'), 'Must label ice bath');
  assert(visualizerContent.includes('Bình 1: Muối Điazoni'), 'Must label flask 1');
  assert(visualizerContent.includes('Bình 2: Bể Ghép Đôi'), 'Must label flask 2');
});

test('DyeChemistryVisualizer must include Fenton wastewater treatment tank with hydroxyl radical visualization', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 540 200"'), 'Must contain 540x200 treatment tank SVG');
  assert(visualizerContent.includes('•OH'), 'Must visualize hydroxyl radicals');
  assert(visualizerContent.includes('QCVN 13-MT:2015/BTNMT'), 'Must reference Vietnamese discharge standard');
});

// 5. Integration into PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import DyeChemistryVisualizer', () => {
  assert(periodicCodexContent.includes("import { DyeChemistryVisualizer } from './visualizations/DyeChemistryVisualizer';"), 'Import missing');
});

test('PeriodicCodexTab must include DYES_AZO_CHEMISTRY in activeMainTab type union', () => {
  assert(periodicCodexContent.includes("'DYES_AZO_CHEMISTRY'"), 'Tab type missing');
});

test('PeriodicCodexTab must render DyeChemistryVisualizer when activeMainTab is DYES_AZO_CHEMISTRY', () => {
  assert(periodicCodexContent.includes("<DyeChemistryVisualizer />"), 'Component JSX call missing');
});

test('PeriodicCodexTab must contain the navigation button for Phẩm Nhuộm & Ghép Đôi Azo', () => {
  assert(periodicCodexContent.includes('Phẩm Nhuộm & Ghép Đôi Azo'), 'Navigation label missing');
  assert(periodicCodexContent.includes("setActiveMainTab('DYES_AZO_CHEMISTRY')"), 'Click handler missing');
});

console.log(`\n======================================================================`);
console.log(`   TEST SUITE 221: ALL ${passedCount}/12 TESTS PASSED PERFECTLY       `);
console.log(`======================================================================\n`);
