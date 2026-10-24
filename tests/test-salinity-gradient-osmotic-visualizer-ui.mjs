// tests/test-salinity-gradient-osmotic-visualizer-ui.mjs
// Test Suite 271: Salinity Gradient Osmotic Power Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 271: SalinityGradientOsmoticVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/SalinityGradientOsmoticVisualizer.tsx');
const enginePath = path.resolve('src/domain/salinityGradientOsmoticEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'SalinityGradientOsmoticVisualizer.tsx component file must exist');
console.log('  ✓ SalinityGradientOsmoticVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'salinityGradientOsmoticEngine.ts domain engine file must exist');
console.log('  ✓ salinityGradientOsmoticEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('WATER_SALINITY_PROFILES') &&
  visualizerContent.includes('calculateVanTHoffOsmoticPressure') &&
  visualizerContent.includes('calculateGibbsMixingEnergy') &&
  visualizerContent.includes('simulateOsmoticPowerPlant'),
  'SalinityGradientOsmoticVisualizer must import calculation and simulation functions from salinityGradientOsmoticEngine'
);
console.log('  ✓ SalinityGradientOsmoticVisualizer must import functions from salinityGradientOsmoticEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'SalinityGradientOsmoticVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ SalinityGradientOsmoticVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'PRO_MEMBRANE_AND_TURBINE',
  'RED_ION_EXCHANGE_STACK',
  'WATERFALL_HEAD_AND_ECONOMICS'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `SalinityGradientOsmoticVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ SalinityGradientOsmoticVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets check
assert(
  visualizerContent.includes('<svg viewBox="0 0 700 420"') &&
  visualizerContent.includes('Màng Bán Thấm TFC') &&
  visualizerContent.includes('Tua-bin Thủy Lực Pelton') &&
  visualizerContent.includes('CEM (Na⁺)') &&
  visualizerContent.includes('AEM (Cl⁻)'),
  'SalinityGradientOsmoticVisualizer must render interactive SVG diagrams showing PRO membrane, Pelton turbine and RED ion stacks'
);
console.log('  ✓ SalinityGradientOsmoticVisualizer must render interactive SVG diagrams');

// 6. Scientific terms & Blue Energy benchmarks
const requiredTerms = [
  'Van \'t Hoff',
  'Pressure Retarded Osmosis',
  'Reverse Electrodialysis',
  'Blue Energy',
  'Δπ',
  '270',
  'Baseload'
];

requiredTerms.forEach(term => {
  assert(
    visualizerContent.includes(term),
    `SalinityGradientOsmoticVisualizer must include scientific concept: ${term}`
  );
});
console.log('  ✓ All scientific standards, Van \'t Hoff thermodynamics and Blue Energy benchmarks present');

// 7. Mount in PeriodicCodexTab
assert(
  codexContent.includes('import { SalinityGradientOsmoticVisualizer } from') &&
  codexContent.includes("'SALINITY_GRADIENT_OSMOTIC'") &&
  codexContent.includes('<SalinityGradientOsmoticVisualizer />'),
  'PeriodicCodexTab.tsx must import and mount SalinityGradientOsmoticVisualizer under SALINITY_GRADIENT_OSMOTIC tab'
);
console.log('  ✓ PeriodicCodexTab.tsx mounts SalinityGradientOsmoticVisualizer under SALINITY_GRADIENT_OSMOTIC');

console.log('\n--- ALL 7 AUDIT CHECKS PASSED: SalinityGradientOsmoticVisualizer UI IS VERIFIED! ---');
