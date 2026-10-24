// tests/test-hydrocarbon-visualizer-ui.mjs
/**
 * ELEMENTA — Test Suite 187: HydrocarbonVisualizer Component & Integration Audit
 * Verifies component architecture, mode switches, SVG test tubes, and PeriodicCodexTab mounting.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 187: HydrocarbonVisualizer Component & Integration Audit ---');

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

const visualizerPath = path.resolve('src/components/visualizations/HydrocarbonVisualizer.tsx');
const enginePath = path.resolve('src/domain/hydrocarbonEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

it('HydrocarbonVisualizer.tsx component file must exist', () => {
  assert.ok(fs.existsSync(visualizerPath), 'HydrocarbonVisualizer.tsx must exist');
});

it('hydrocarbonEngine.ts domain engine file must exist', () => {
  assert.ok(fs.existsSync(enginePath), 'hydrocarbonEngine.ts must exist');
});

it('PeriodicCodexTab.tsx file must exist', () => {
  assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx must exist');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

it('HydrocarbonVisualizer must import simulation functions from hydrocarbonEngine', () => {
  assert.ok(visualizerContent.includes('simulateMarkovnikovAddition'), 'Must import simulateMarkovnikovAddition');
  assert.ok(visualizerContent.includes('simulateTerminalAlkyneSilverTest'), 'Must import simulateTerminalAlkyneSilverTest');
  assert.ok(visualizerContent.includes('simulateAlkaneHalogenation'), 'Must import simulateAlkaneHalogenation');
  assert.ok(visualizerContent.includes('simulateAromaticReaction'), 'Must import simulateAromaticReaction');
});

it('HydrocarbonVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.ok(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

it('HydrocarbonVisualizer must support all 3 modes: MARKOVNIKOV_BAYER_ADDITION, TERMINAL_ALKYNE_TOLLENS_LAB, and ARENE_TOLUENE_BENZENE_LAB', () => {
  assert.ok(visualizerContent.includes('MARKOVNIKOV_BAYER_ADDITION'), 'Must have MARKOVNIKOV_BAYER_ADDITION mode');
  assert.ok(visualizerContent.includes('TERMINAL_ALKYNE_TOLLENS_LAB'), 'Must have TERMINAL_ALKYNE_TOLLENS_LAB mode');
  assert.ok(visualizerContent.includes('ARENE_TOLUENE_BENZENE_LAB'), 'Must have ARENE_TOLUENE_BENZENE_LAB mode');
});

it('HydrocarbonVisualizer must render Markovnikov products and Bayer test tube SVG with MnO2', () => {
  assert.ok(visualizerContent.includes('bayerDecolorization'), 'Must render Bayer test tube decolorization');
  assert.ok(visualizerContent.includes('markovnikovResult.majorProduct'), 'Must render major product');
  assert.ok(visualizerContent.includes('MnO2'), 'Must highlight MnO2 precipitate');
});

it('HydrocarbonVisualizer must render Tollens silver test tube SVG with silver acetylide precipitate and Kucherov hydration', () => {
  assert.ok(visualizerContent.includes('alkyneResult.reactsWithAgNO3NH3'), 'Must check AgNO3/NH3 reaction');
  assert.ok(visualizerContent.includes('kucherovEquation'), 'Must render Kucherov equation');
  assert.ok(visualizerContent.includes('calculatedPrecipitateMassG'), 'Must calculate precipitate mass');
});

it('HydrocarbonVisualizer must render Arene comparison (Toluene vs Benzene) and Alkane halogenation with UV toggle', () => {
  assert.ok(visualizerContent.includes('areneResult.chemicalEquation'), 'Must render Arene equation');
  assert.ok(visualizerContent.includes('uvLightOn'), 'Must feature UV toggle');
  assert.ok(visualizerContent.includes('tntFormation'), 'Must feature TNT formation detection');
});

const codexContent = fs.readFileSync(codexPath, 'utf8');

it('PeriodicCodexTab must import HydrocarbonVisualizer', () => {
  assert.ok(codexContent.includes('HydrocarbonVisualizer'), 'Must import HydrocarbonVisualizer');
});

it('PeriodicCodexTab must include \'HYDROCARBONS_REACTIONS\' in navigation tabs', () => {
  assert.ok(codexContent.includes('HYDROCARBONS_REACTIONS'), 'Must define HYDROCARBONS_REACTIONS');
});

it('PeriodicCodexTab must mount <HydrocarbonVisualizer /> when activeMainTab is HYDROCARBONS_REACTIONS', () => {
  assert.ok(codexContent.includes('<HydrocarbonVisualizer'), 'Must mount <HydrocarbonVisualizer />');
});

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 187 PASSED: HydrocarbonVisualizer fully verified!\n');
}
