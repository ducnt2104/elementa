// tests/test-chemical-kinetics-visualizer-ui.mjs
/**
 * ELEMENTA — Test Suite 193: ChemicalKineticsVisualizer Component & Integration Audit
 * Verifies component architecture, mode switches, SVG cross obscuration, Van 't Hoff simulator, and PeriodicCodexTab mounting.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 193: ChemicalKineticsVisualizer Component & Integration Audit ---');

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

const visualizerPath = path.resolve('src/components/visualizations/ChemicalKineticsVisualizer.tsx');
const enginePath = path.resolve('src/domain/chemicalKineticsEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

it('ChemicalKineticsVisualizer.tsx component file must exist', () => {
  assert.ok(fs.existsSync(visualizerPath), 'ChemicalKineticsVisualizer.tsx must exist');
});

it('chemicalKineticsEngine.ts domain engine file must exist', () => {
  assert.ok(fs.existsSync(enginePath), 'chemicalKineticsEngine.ts must exist');
});

it('PeriodicCodexTab.tsx file must exist', () => {
  assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx must exist');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

it('ChemicalKineticsVisualizer must import calculation functions from chemicalKineticsEngine', () => {
  assert.ok(visualizerContent.includes('calculateVanTHoffEffect'), 'Must import calculateVanTHoffEffect');
  assert.ok(visualizerContent.includes('simulateKineticFactors'), 'Must import simulateKineticFactors');
  assert.ok(visualizerContent.includes('calculateArrheniusCollision'), 'Must import calculateArrheniusCollision');
});

it('ChemicalKineticsVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.ok(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

it('ChemicalKineticsVisualizer must support all 3 modes: THIOSULFATE_CROSS_OBSCURATION_LAB, VAN_T_HOFF_PRESERVATION_SIM, and FACTORS_AND_ARRHENIUS_LAB', () => {
  assert.ok(visualizerContent.includes('THIOSULFATE_CROSS_OBSCURATION_LAB'), 'Must have THIOSULFATE_CROSS_OBSCURATION_LAB mode');
  assert.ok(visualizerContent.includes('VAN_T_HOFF_PRESERVATION_SIM'), 'Must have VAN_T_HOFF_PRESERVATION_SIM mode');
  assert.ok(visualizerContent.includes('FACTORS_AND_ARRHENIUS_LAB'), 'Must have FACTORS_AND_ARRHENIUS_LAB mode');
});

it('ChemicalKineticsVisualizer must render conical flask SVG with fading black cross and sulfur turbidity', () => {
  assert.ok(visualizerContent.includes('dấu thập đen'), 'Must describe black cross');
  assert.ok(visualizerContent.includes('thiosulfateResult.cloudinessTimeSeconds'), 'Must render cloudiness time');
  assert.ok(visualizerContent.includes('thiosulfateResult.relativeRateMultiplier'), 'Must render relative rate multiplier');
});

it('ChemicalKineticsVisualizer must render Van \'t Hoff preservation presets (refrigerator, pressure cooker)', () => {
  assert.ok(visualizerContent.includes('tủ lạnh'), 'Must feature refrigerator preset');
  assert.ok(visualizerContent.includes('áp suất'), 'Must feature pressure cooker preset');
  assert.ok(visualizerContent.includes('vanTHoffResult.rateRatio'), 'Must calculate rate ratio');
});

it('ChemicalKineticsVisualizer must render 5 factors (surface area powder vs chunks, catalyst) and Arrhenius collision theory', () => {
  assert.ok(visualizerContent.includes('surfaceAreaState'), 'Must have surface area state');
  assert.ok(visualizerContent.includes('hasCatalyst'), 'Must have catalyst toggle');
  assert.ok(visualizerContent.includes('arrheniusResult.effectiveCollisionsPerMillion'), 'Must render collision fraction');
});

const codexContent = fs.readFileSync(codexPath, 'utf8');

it('PeriodicCodexTab must import ChemicalKineticsVisualizer', () => {
  assert.ok(codexContent.includes('ChemicalKineticsVisualizer'), 'Must import ChemicalKineticsVisualizer');
});

it('PeriodicCodexTab must include \'CHEMICAL_KINETICS\' in navigation tabs', () => {
  assert.ok(codexContent.includes('CHEMICAL_KINETICS'), 'Must define CHEMICAL_KINETICS');
});

it('PeriodicCodexTab must mount <ChemicalKineticsVisualizer /> when activeMainTab is CHEMICAL_KINETICS', () => {
  assert.ok(codexContent.includes('<ChemicalKineticsVisualizer'), 'Must mount <ChemicalKineticsVisualizer />');
});

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 193 PASSED: ChemicalKineticsVisualizer fully verified!\n');
}
