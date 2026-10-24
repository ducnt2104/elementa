// tests/test-halogens-redox-visualizer-ui.mjs
/**
 * ELEMENTA — Test Suite 195: HalogensRedoxVisualizer Component & Integration Audit
 * Verifies component architecture, mode switches, 2-layer extraction SVG, and PeriodicCodexTab mounting.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 195: HalogensRedoxVisualizer Component & Integration Audit ---');

let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

const visualizerPath = path.resolve('src/components/visualizations/HalogensRedoxVisualizer.tsx');
const enginePath = path.resolve('src/domain/halogensRedoxEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

it('HalogensRedoxVisualizer.tsx component file must exist', () => {
  assert.ok(fs.existsSync(visualizerPath), 'HalogensRedoxVisualizer.tsx must exist');
});

it('halogensRedoxEngine.ts domain engine file must exist', () => {
  assert.ok(fs.existsSync(enginePath), 'halogensRedoxEngine.ts must exist');
});

it('PeriodicCodexTab.tsx file must exist', () => {
  assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx must exist');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

it('HalogensRedoxVisualizer must import simulation functions from halogensRedoxEngine', () => {
  assert.ok(visualizerContent.includes('simulateHalogenDisplacement'), 'Must import simulateHalogenDisplacement');
  assert.ok(visualizerContent.includes('HYDROGEN_HALIDES_CATALOG'), 'Must import HYDROGEN_HALIDES_CATALOG');
  assert.ok(visualizerContent.includes('simulateBleachingProduct'), 'Must import simulateBleachingProduct');
  assert.ok(visualizerContent.includes('simulateStarchIodineTest'), 'Must import simulateStarchIodineTest');
});

it('HalogensRedoxVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.ok(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

it('HalogensRedoxVisualizer must support all 3 modes: HALOGEN_DISPLACEMENT_LAB, HYDROGEN_HALIDES_REDOX_LAB, and BLEACHING_JAVEL_AND_IODINE_LAB', () => {
  assert.ok(visualizerContent.includes('HALOGEN_DISPLACEMENT_LAB'), 'Must have HALOGEN_DISPLACEMENT_LAB mode');
  assert.ok(visualizerContent.includes('HYDROGEN_HALIDES_REDOX_LAB'), 'Must have HYDROGEN_HALIDES_REDOX_LAB mode');
  assert.ok(visualizerContent.includes('BLEACHING_JAVEL_AND_IODINE_LAB'), 'Must have BLEACHING_JAVEL_AND_IODINE_LAB mode');
});

it('HalogensRedoxVisualizer must render test tube SVG with 2-layer organic solvent extraction (Hexan)', () => {
  assert.ok(visualizerContent.includes('LỚP HỮU CƠ (HEXAN)'), 'Must render organic layer label');
  assert.ok(visualizerContent.includes('hasOrganicExtraction'), 'Must feature extraction toggle');
  assert.ok(visualizerContent.includes('displacementResult.chemicalEquation'), 'Must render equation');
});

it('HalogensRedoxVisualizer must render Hydrogen Halide bond properties and concentrated H2SO4 redox outcomes', () => {
  assert.ok(visualizerContent.includes('hxAnalysis.bondLengthPm'), 'Must render bond length');
  assert.ok(visualizerContent.includes('hxAnalysis.bondEnergyKjMol'), 'Must render bond energy');
  assert.ok(visualizerContent.includes('reactionWithConcH2SO4'), 'Must render conc H2SO4 outcome');
});

it('HalogensRedoxVisualizer must render Javel water and starch-iodine temperature-reversible test', () => {
  assert.ok(visualizerContent.includes('bleachResult.chemicalEquation'), 'Must render bleach equation');
  assert.ok(visualizerContent.includes('iodineTestTemp'), 'Must have temperature slider');
  assert.ok(visualizerContent.includes('starchResult.colorVi'), 'Must render starch color');
});

const codexContent = fs.readFileSync(codexPath, 'utf8');

it('PeriodicCodexTab must import HalogensRedoxVisualizer', () => {
  assert.ok(codexContent.includes('HalogensRedoxVisualizer'), 'Must import HalogensRedoxVisualizer');
});

it('PeriodicCodexTab must include \'HALOGENS_REDOX\' in navigation tabs', () => {
  assert.ok(codexContent.includes('HALOGENS_REDOX'), 'Must define HALOGENS_REDOX');
});

it('PeriodicCodexTab must mount <HalogensRedoxVisualizer /> when activeMainTab is HALOGENS_REDOX', () => {
  assert.ok(codexContent.includes('<HalogensRedoxVisualizer'), 'Must mount <HalogensRedoxVisualizer />');
});

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 195 PASSED: HalogensRedoxVisualizer fully verified!\n');
}
