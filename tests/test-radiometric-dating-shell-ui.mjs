// tests/test-radiometric-dating-shell-ui.mjs
// Test Suite 227: RadiometricDatingShellVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Physics & Chemistry Olympiad & Geochronology Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 227: RadiometricDatingShellVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/RadiometricDatingShellVisualizer.tsx');
const enginePath = path.resolve('src/domain/nuclearShellModelEngine.ts');
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
test('RadiometricDatingShellVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('nuclearShellModelEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('RadiometricDatingShellVisualizer must import functions from nuclearShellModelEngine', () => {
  assert(visualizerContent.includes('NUCLEAR_SHELL_LEVELS'), 'Must import NUCLEAR_SHELL_LEVELS');
  assert(visualizerContent.includes('MAGIC_NUMBERS'), 'Must import MAGIC_NUMBERS');
  assert(visualizerContent.includes('DOUBLY_MAGIC_ISOTOPES'), 'Must import DOUBLY_MAGIC_ISOTOPES');
  assert(visualizerContent.includes('predictNuclearGroundState'), 'Must import predictNuclearGroundState');
  assert(visualizerContent.includes('calculateRadiocarbonAge'), 'Must import calculateRadiocarbonAge');
  assert(visualizerContent.includes('calculateUraniumLeadConcordia'), 'Must import calculateUraniumLeadConcordia');
});

test('RadiometricDatingShellVisualizer must trigger sound.playUiClick() on interactive changes', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('RadiometricDatingShellVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'NUCLEAR_SHELL_JP'"), 'Must support NUCLEAR_SHELL_JP');
  assert(visualizerContent.includes("'RADIOCARBON_14_DATING'"), 'Must support RADIOCARBON_14_DATING');
  assert(visualizerContent.includes("'URANIUM_LEAD_CONCORDIA'"), 'Must support URANIUM_LEAD_CONCORDIA');
});

// 4. SVG and Interactive Graphics
test('RadiometricDatingShellVisualizer must render interactive SVG diagrams', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 680 390"'), 'Must render Shell Model Energy Ladder SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 700 240"'), 'Must render Radiocarbon Decay Curve SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 540 300"'), 'Must render Wetherill Concordia Diagram SVG');
});

// 5. Scientific Citations & Vietnamese Archaeological Context
test('RadiometricDatingShellVisualizer must reference Mayer-Jensen, Dong Son, and Concordia', () => {
  assert(visualizerContent.includes('Mayer-Jensen'), 'Must cite Mayer-Jensen');
  assert(visualizerContent.includes('Đông Sơn'), 'Must cite Đông Sơn archaeological context');
  assert(visualizerContent.includes('Concordia'), 'Must cite Concordia curve');
  assert(visualizerContent.includes('Jack Hills'), 'Must cite Jack Hills zircon standard');
});

// 6. PeriodicCodexTab integration
const codexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import RadiometricDatingShellVisualizer', () => {
  assert(codexContent.includes("import { RadiometricDatingShellVisualizer } from './visualizations/RadiometricDatingShellVisualizer';"),
    'Must import RadiometricDatingShellVisualizer');
});

test('PeriodicCodexTab state union must include RADIOMETRIC_DATING_NUCLEAR', () => {
  assert(codexContent.includes("'RADIOMETRIC_DATING_NUCLEAR'"), 'State union must include RADIOMETRIC_DATING_NUCLEAR');
});

test('PeriodicCodexTab must provide a navigation button for Radiometric Dating', () => {
  assert(codexContent.includes("setActiveMainTab('RADIOMETRIC_DATING_NUCLEAR')"), 'Must have button to activate RADIOMETRIC_DATING_NUCLEAR');
  assert(codexContent.includes('Vỏ Hạt Nhân & Định Tuổi Phóng Xạ'), 'Must display tab title');
});

test('PeriodicCodexTab must render RadiometricDatingShellVisualizer when active', () => {
  assert(codexContent.includes("<RadiometricDatingShellVisualizer />"), 'Must render RadiometricDatingShellVisualizer');
});

console.log(`\n======================================================================`);
console.log(`   ALL ${passedCount} TESTS IN SUITE 227 PASSED AUDIT VERIFICATION!   `);
console.log(`======================================================================\n`);
