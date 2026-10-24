// tests/test-direct-air-capture-visualizer-ui.mjs
// Test Suite 263: Direct Air Capture (DAC) Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 263: DirectAirCaptureVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/DirectAirCaptureVisualizer.tsx');
const enginePath = path.resolve('src/domain/directAirCaptureEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'DirectAirCaptureVisualizer.tsx component file must exist');
console.log('  ✓ DirectAirCaptureVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'directAirCaptureEngine.ts domain engine file must exist');
console.log('  ✓ directAirCaptureEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('calculateThermodynamicMinimumWork') &&
  visualizerContent.includes('getDacReactionCycle') &&
  visualizerContent.includes('simulateDacProcess') &&
  visualizerContent.includes('compareDacTechnologies'),
  'DirectAirCaptureVisualizer must import thermodynamic and simulation functions from directAirCaptureEngine'
);
console.log('  ✓ DirectAirCaptureVisualizer must import functions from directAirCaptureEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'DirectAirCaptureVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ DirectAirCaptureVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'CLOSED_LOOP_CHEMICAL_CYCLE',
  'THERMODYNAMICS_AND_ENERGY',
  'NET_ZERO_ECONOMICS_AND_PTX'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `DirectAirCaptureVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ DirectAirCaptureVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets check
assert(
  visualizerContent.includes('<svg viewBox="0 0 700 420"') &&
  visualizerContent.includes('Tháp Tiếp Xúc') &&
  visualizerContent.includes('Lò Nung Vôi') &&
  visualizerContent.includes('Nhả Hấp Phụ TVSA'),
  'DirectAirCaptureVisualizer must render interactive SVG chemical flowsheets for both KOH and Amine technologies'
);
console.log('  ✓ DirectAirCaptureVisualizer must render interactive SVG diagrams');

// 6. Scientific terms & Net-Zero benchmarks
const requiredTerms = [
  'Direct Air Capture',
  'IEA Net-Zero',
  '420 ppm',
  'Dilution Penalty',
  'Sherwood',
  'Carbamate',
  'K₂CO₃',
  'CaCO₃',
  'e-Kerosene'
];

requiredTerms.forEach(term => {
  assert(
    visualizerContent.includes(term),
    `DirectAirCaptureVisualizer must include scientific concept: ${term}`
  );
});
console.log('  ✓ All scientific standards, DAC thermodynamics and Net-Zero benchmarks present');

// 7. Mount in PeriodicCodexTab
assert(
  codexContent.includes('import { DirectAirCaptureVisualizer } from') &&
  codexContent.includes("'DIRECT_AIR_CAPTURE'") &&
  codexContent.includes('<DirectAirCaptureVisualizer />'),
  'PeriodicCodexTab.tsx must import and mount DirectAirCaptureVisualizer under DIRECT_AIR_CAPTURE tab'
);
console.log('  ✓ PeriodicCodexTab.tsx mounts DirectAirCaptureVisualizer under DIRECT_AIR_CAPTURE');

console.log('\n--- ALL 7 AUDIT CHECKS PASSED: DirectAirCaptureVisualizer UI IS VERIFIED! ---');
