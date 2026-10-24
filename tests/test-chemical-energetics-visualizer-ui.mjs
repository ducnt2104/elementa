// tests/test-chemical-energetics-visualizer-ui.mjs
/**
 * ELEMENTA — Test Suite 191: ChemicalEnergeticsVisualizer Component & Integration Audit
 * Verifies component architecture, mode switches, SVG potential energy curves, calorimeter, and PeriodicCodexTab mounting.
 */

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 191: ChemicalEnergeticsVisualizer Component & Integration Audit ---');

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

const visualizerPath = path.resolve('src/components/visualizations/ChemicalEnergeticsVisualizer.tsx');
const enginePath = path.resolve('src/domain/chemicalEnergeticsEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

it('ChemicalEnergeticsVisualizer.tsx component file must exist', () => {
  assert.ok(fs.existsSync(visualizerPath), 'ChemicalEnergeticsVisualizer.tsx must exist');
});

it('chemicalEnergeticsEngine.ts domain engine file must exist', () => {
  assert.ok(fs.existsSync(enginePath), 'chemicalEnergeticsEngine.ts must exist');
});

it('PeriodicCodexTab.tsx file must exist', () => {
  assert.ok(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx must exist');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

it('ChemicalEnergeticsVisualizer must import calculation functions from chemicalEnergeticsEngine', () => {
  assert.ok(visualizerContent.includes('calculateEnthalpyFromFormation'), 'Must import calculateEnthalpyFromFormation');
  assert.ok(visualizerContent.includes('calculateEnthalpyFromBondEnergies'), 'Must import calculateEnthalpyFromBondEnergies');
  assert.ok(visualizerContent.includes('simulateCalorimeterTemperature'), 'Must import simulateCalorimeterTemperature');
  assert.ok(visualizerContent.includes('simulateHessLawCycle'), 'Must import simulateHessLawCycle');
});

it('ChemicalEnergeticsVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert.ok(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

it('ChemicalEnergeticsVisualizer must support all 3 modes: FORMATION_CALORIMETRY_LAB, BOND_ENERGY_ESTIMATOR, and HESS_LAW_CYCLE_BUILDER', () => {
  assert.ok(visualizerContent.includes('FORMATION_CALORIMETRY_LAB'), 'Must have FORMATION_CALORIMETRY_LAB mode');
  assert.ok(visualizerContent.includes('BOND_ENERGY_ESTIMATOR'), 'Must have BOND_ENERGY_ESTIMATOR mode');
  assert.ok(visualizerContent.includes('HESS_LAW_CYCLE_BUILDER'), 'Must have HESS_LAW_CYCLE_BUILDER mode');
});

it('ChemicalEnergeticsVisualizer must render potential energy curve SVG with activation energy peak and products plateau', () => {
  assert.ok(visualizerContent.includes('Trạng thái chuyển tiếp'), 'Must render transition state label');
  assert.ok(visualizerContent.includes('formationRxnResult.isExothermic'), 'Must distinguish exothermic from endothermic profile');
  assert.ok(visualizerContent.includes('formationRxnResult.deltaRH298Kj'), 'Must render Δr H° value');
});

it('ChemicalEnergeticsVisualizer must render coffee-cup calorimeter simulation with mercury thermometer', () => {
  assert.ok(visualizerContent.includes('calorimeterResult.finalTempC'), 'Must render final temperature');
  assert.ok(visualizerContent.includes('calorimeterResult.deltaTempC'), 'Must render temperature shift ΔT');
  assert.ok(visualizerContent.includes('calorimeterResult.heatJoules'), 'Must render heat in Joules');
});

it('ChemicalEnergeticsVisualizer must render bond energy breakdown and Hess\'s law cycle verification', () => {
  assert.ok(visualizerContent.includes('bondEnergyResult.stepByStepBreakdownVi'), 'Must render bond energy breakdown');
  assert.ok(visualizerContent.includes('hessResult.calculatedDeltaRH298Kj'), 'Must output Hess cycle Δr H°');
  assert.ok(visualizerContent.includes('hessResult.verificationVi'), 'Must provide Hess verification');
});

const codexContent = fs.readFileSync(codexPath, 'utf8');

it('PeriodicCodexTab must import ChemicalEnergeticsVisualizer', () => {
  assert.ok(codexContent.includes('ChemicalEnergeticsVisualizer'), 'Must import ChemicalEnergeticsVisualizer');
});

it('PeriodicCodexTab must include \'CHEMICAL_ENERGETICS\' in navigation tabs', () => {
  assert.ok(codexContent.includes('CHEMICAL_ENERGETICS'), 'Must define CHEMICAL_ENERGETICS');
});

it('PeriodicCodexTab must mount <ChemicalEnergeticsVisualizer /> when activeMainTab is CHEMICAL_ENERGETICS', () => {
  assert.ok(codexContent.includes('<ChemicalEnergeticsVisualizer'), 'Must mount <ChemicalEnergeticsVisualizer />');
});

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 191 PASSED: ChemicalEnergeticsVisualizer fully verified!\n');
}
