// tests/test-chiral-stereochemistry-visualizer-ui.mjs
// Test Suite 213: ChiralStereochemistryVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & IUPAC Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 213: ChiralStereochemistryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/ChiralStereochemistryVisualizer.tsx');
const enginePath = path.resolve('src/domain/chiralStereochemistryEngine.ts');
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
test('ChiralStereochemistryVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('chiralStereochemistryEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('ChiralStereochemistryVisualizer must import simulation functions from chiralStereochemistryEngine', () => {
  assert(visualizerContent.includes('CHIRAL_MOLECULES_CATALOG'), 'Must import CHIRAL_MOLECULES_CATALOG');
  assert(visualizerContent.includes('calculatePolarimeterRotation'), 'Must import calculatePolarimeterRotation');
});

test('ChiralStereochemistryVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. Mode coverage
test('ChiralStereochemistryVisualizer must support all 3 modes: CIP_RULES_3D_WEDGE, BIOT_POLARIMETER_LAB, and THALIDOMIDE_TRAGEDY_MESO', () => {
  assert(visualizerContent.includes("'CIP_RULES_3D_WEDGE'"), 'Must support CIP_RULES_3D_WEDGE mode');
  assert(visualizerContent.includes("'BIOT_POLARIMETER_LAB'"), 'Must support BIOT_POLARIMETER_LAB mode');
  assert(visualizerContent.includes("'THALIDOMIDE_TRAGEDY_MESO'"), 'Must support THALIDOMIDE_TRAGEDY_MESO mode');
});

// 4. CIP 3D Wedge-Dash
test('ChiralStereochemistryVisualizer must render 3D tetrahedral wedge-dash SVG and CIP priorities', () => {
  assert(visualizerContent.includes('polygon points="208,128 280,185 270,195"'), 'Must render wedge bond');
  assert(visualizerContent.includes('strokeDasharray="3 3"'), 'Must render dashed bond pointing back');
  assert(visualizerContent.includes('substituents'), 'Must list substituents');
});

// 5. Polarimeter Biot's Law
test('ChiralStereochemistryVisualizer must render polarimeter optical bench and Biot formula', () => {
  assert(visualizerContent.includes('Định luật Biot'), 'Must feature Biot Law');
  assert(visualizerContent.includes('tubeLengthDm'), 'Must have tube length slider');
  assert(visualizerContent.includes('concentrationGPerMl'), 'Must have concentration slider');
});

// 6. Thalidomide & Meso Symmetry
test('ChiralStereochemistryVisualizer must render Thalidomide racemization and Meso internal plane of symmetry', () => {
  assert(visualizerContent.includes('Thalidomide'), 'Must feature Thalidomide case study');
  assert(visualizerContent.includes('Mặt phẳng đối xứng'), 'Must feature Meso mirror plane');
});

// 7. Integration in PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import ChiralStereochemistryVisualizer', () => {
  assert(periodicCodexContent.includes('ChiralStereochemistryVisualizer'), 'Must import ChiralStereochemistryVisualizer in PeriodicCodexTab.tsx');
});

test('PeriodicCodexTab must include CHIRAL_STEREOCHEMISTRY in navigation tabs', () => {
  assert(periodicCodexContent.includes("'CHIRAL_STEREOCHEMISTRY'"), 'Must include CHIRAL_STEREOCHEMISTRY in activeMainTab type union and navigation');
});

test('PeriodicCodexTab must mount <ChiralStereochemistryVisualizer /> when activeMainTab is CHIRAL_STEREOCHEMISTRY', () => {
  assert(periodicCodexContent.includes('<ChiralStereochemistryVisualizer'), 'Must render <ChiralStereochemistryVisualizer />');
});

console.log(`\nResults: ${passedCount} passed, 0 failed.`);
console.log('✓ TEST SUITE 213 PASSED: ChiralStereochemistryVisualizer fully verified!\n');
