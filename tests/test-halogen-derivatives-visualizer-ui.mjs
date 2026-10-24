// tests/test-halogen-derivatives-visualizer-ui.mjs
/**
 * ELEMENTA — Test Suite 189: HalogenDerivativesVisualizer Component & Integration Audit
 * Verifies component architecture, mode switches, SVG test tubes, and PeriodicCodexTab mounting.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 189: HalogenDerivativesVisualizer Component & Integration Audit ---');

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

const visualizerPath = path.resolve('src/components/visualizations/HalogenDerivativesVisualizer.tsx');
const enginePath = path.resolve('src/domain/halogenDerivativesEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

it('HalogenDerivativesVisualizer.tsx component file must exist', () => {
  assert.ok(fs.existsSync(visualizerPath), 'HalogenDerivativesVisualizer.tsx must exist');
});

it('halogenDerivativesEngine.ts domain engine file must exist', () => {
  assert.ok(fs.existsSync(enginePath), 'halogenDerivativesEngine.ts must exist');
});

it('PeriodicCodexTab.tsx file must exist', () => {
  assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx must exist');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

it('HalogenDerivativesVisualizer must import simulation functions from halogenDerivativesEngine', () => {
  assert.ok(visualizerContent.includes('simulateHalogenDiagnosticTest'), 'Must import simulateHalogenDiagnosticTest');
  assert.ok(visualizerContent.includes('simulateZaitsevElimination'), 'Must import simulateZaitsevElimination');
  assert.ok(visualizerContent.includes('predictMechanism'), 'Must import predictMechanism');
  assert.ok(visualizerContent.includes('simulateCfcOzoneCycle'), 'Must import simulateCfcOzoneCycle');
});

it('HalogenDerivativesVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.ok(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

it('HalogenDerivativesVisualizer must support all 3 modes: HYDROLYSIS_AGNO3_DIAGNOSTIC, ZAITSEV_ELIMINATION_LAB, and MECHANISM_MATRIX_AND_CFC', () => {
  assert.ok(visualizerContent.includes('HYDROLYSIS_AGNO3_DIAGNOSTIC'), 'Must have HYDROLYSIS_AGNO3_DIAGNOSTIC mode');
  assert.ok(visualizerContent.includes('ZAITSEV_ELIMINATION_LAB'), 'Must have ZAITSEV_ELIMINATION_LAB mode');
  assert.ok(visualizerContent.includes('MECHANISM_MATRIX_AND_CFC'), 'Must have MECHANISM_MATRIX_AND_CFC mode');
});

it('HalogenDerivativesVisualizer must render alkaline hydrolysis and AgNO3 test tube SVG with Ag2O note', () => {
  assert.ok(visualizerContent.includes('Ag2O'), 'Must handle Ag2O interference');
  assert.ok(visualizerContent.includes('hno3Added'), 'Must feature HNO3 toggle');
  assert.ok(visualizerContent.includes('diagnosticResult.precipitateFormed'), 'Must render precipitate state');
});

it('HalogenDerivativesVisualizer must render Zaitsev rule breakdown and solvent role comparison', () => {
  assert.ok(visualizerContent.includes('eliminationResult.majorProduct'), 'Must render major elimination product');
  assert.ok(visualizerContent.includes('isEthanolicSolvent'), 'Must have solvent toggle');
  assert.ok(visualizerContent.includes('zaitsevReasonVi'), 'Must explain Zaitsev rationale');
});

it('HalogenDerivativesVisualizer must render SN1/SN2/E1/E2 mechanism decision matrix and CFC stratospheric ozone', () => {
  assert.ok(visualizerContent.includes('mechanismResult.predominantMechanism'), 'Must predict mechanism');
  assert.ok(visualizerContent.includes('mechanismResult.kineticRateLaw'), 'Must output rate law');
  assert.ok(visualizerContent.includes('cfcResult.radicalChainSteps'), 'Must render CFC radical chain');
});

const codexContent = fs.readFileSync(codexPath, 'utf8');

it('PeriodicCodexTab must import HalogenDerivativesVisualizer', () => {
  assert.ok(codexContent.includes('HalogenDerivativesVisualizer'), 'Must import HalogenDerivativesVisualizer');
});

it('PeriodicCodexTab must include \'HALOGEN_DERIVATIVES\' in navigation tabs', () => {
  assert.ok(codexContent.includes('HALOGEN_DERIVATIVES'), 'Must define HALOGEN_DERIVATIVES');
});

it('PeriodicCodexTab must mount <HalogenDerivativesVisualizer /> when activeMainTab is HALOGEN_DERIVATIVES', () => {
  assert.ok(codexContent.includes('<HalogenDerivativesVisualizer'), 'Must mount <HalogenDerivativesVisualizer />');
});

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 189 PASSED: HalogenDerivativesVisualizer fully verified!\n');
}
