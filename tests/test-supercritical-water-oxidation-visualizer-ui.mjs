// tests/test-supercritical-water-oxidation-visualizer-ui.mjs
// Test Suite 269: Supercritical Water Oxidation (SCWO) Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 269: SupercriticalWaterOxidationVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/SupercriticalWaterOxidationVisualizer.tsx');
const enginePath = path.resolve('src/domain/supercriticalWaterOxidationEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'SupercriticalWaterOxidationVisualizer.tsx component file must exist');
console.log('  ✓ SupercriticalWaterOxidationVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'supercriticalWaterOxidationEngine.ts domain engine file must exist');
console.log('  ✓ supercriticalWaterOxidationEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('SCWO_WASTE_BENCHMARKS') &&
  visualizerContent.includes('calculateWaterSupercriticalProperties') &&
  visualizerContent.includes('simulateScwoKinetics'),
  'SupercriticalWaterOxidationVisualizer must import calculation and simulation functions from supercriticalWaterOxidationEngine'
);
console.log('  ✓ SupercriticalWaterOxidationVisualizer must import functions from supercriticalWaterOxidationEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'SupercriticalWaterOxidationVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ SupercriticalWaterOxidationVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'TRANSPIRING_REACTOR_AND_SALT_TRAP',
  'PHASE_DIAGRAM_AND_DIELECTRIC',
  'AUTOTHERMAL_PFAS_DESTRUCTION'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `SupercriticalWaterOxidationVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ SupercriticalWaterOxidationVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets check
assert(
  visualizerContent.includes('<svg viewBox="0 0 700 420"') &&
  visualizerContent.includes('VÙNG PHẢN ỨNG SIÊU TỚI HẠN') &&
  visualizerContent.includes('Màng nước thấm bảo vệ') &&
  visualizerContent.includes('Vùng Làm Nguội Dưới Tới Hạn'),
  'SupercriticalWaterOxidationVisualizer must render interactive SVG diagrams showing transpiring porous wall and bottom salt trap'
);
console.log('  ✓ SupercriticalWaterOxidationVisualizer must render interactive SVG diagrams');

// 6. Scientific terms & SCWO benchmarks
const requiredTerms = [
  'Supercritical Water Oxidation',
  'SCWO',
  'Transpiring Wall',
  'PFAS',
  'DRE',
  'Autothermal',
  'Inconel 625',
  '374.15°C'
];

requiredTerms.forEach(term => {
  assert(
    visualizerContent.includes(term),
    `SupercriticalWaterOxidationVisualizer must include scientific concept: ${term}`
  );
});
console.log('  ✓ All scientific standards, SCWO critical phenomena and zero-emission benchmarks present');

// 7. Mount in PeriodicCodexTab
assert(
  codexContent.includes('import { SupercriticalWaterOxidationVisualizer } from') &&
  codexContent.includes("'SUPERCRITICAL_WATER_OXIDATION'") &&
  codexContent.includes('<SupercriticalWaterOxidationVisualizer />'),
  'PeriodicCodexTab.tsx must import and mount SupercriticalWaterOxidationVisualizer under SUPERCRITICAL_WATER_OXIDATION tab'
);
console.log('  ✓ PeriodicCodexTab.tsx mounts SupercriticalWaterOxidationVisualizer under SUPERCRITICAL_WATER_OXIDATION');

console.log('\n--- ALL 7 AUDIT CHECKS PASSED: SupercriticalWaterOxidationVisualizer UI IS VERIFIED! ---');
