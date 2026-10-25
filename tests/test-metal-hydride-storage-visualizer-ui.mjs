// tests/test-metal-hydride-storage-visualizer-ui.mjs
// Test Suite 279: Metal Hydride Storage Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 279: MetalHydrideStorageVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MetalHydrideStorageVisualizer.tsx');
const enginePath = path.resolve('src/domain/metalHydrideStorageEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'MetalHydrideStorageVisualizer.tsx component file must exist');
console.log('  ✓ MetalHydrideStorageVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'metalHydrideStorageEngine.ts domain engine file must exist');
console.log('  ✓ metalHydrideStorageEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('METAL_HYDRIDE_CATALOG') &&
  visualizerContent.includes('calculateHydrideStoragePerformance'),
  'MetalHydrideStorageVisualizer must import catalog and calculateHydrideStoragePerformance from metalHydrideStorageEngine'
);
console.log('  ✓ MetalHydrideStorageVisualizer must import functions from metalHydrideStorageEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'MetalHydrideStorageVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ MetalHydrideStorageVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'PCT_ISOTHERMS_AND_VAN_T_HOFF_SIMULATION',
  'SOLID_STATE_TANK_AND_FUEL_CELL_COUPLING',
  'STORAGE_TECH_COMPARISON_AND_SAFETY'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `MetalHydrideStorageVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ MetalHydrideStorageVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets & schematic check
assert(
  visualizerContent.includes('<svg viewBox="0 0 440 280"') &&
  visualizerContent.includes('<svg viewBox="0 0 440 240"') &&
  visualizerContent.includes('THỀM ĐẲNG NHIỆT (PLATEAU') &&
  visualizerContent.includes('ỐNG KHÍ HYDRO BÁN THẤM XỐP KIM LOẠI'),
  'MetalHydrideStorageVisualizer must render interactive SVG diagrams showing PCT isotherms plateau and internal finned heat exchanger bed'
);
console.log('  ✓ MetalHydrideStorageVisualizer must render interactive SVG diagrams');

// 6. Scientific terms & Hydrogen storage benchmarks
assert(
  visualizerContent.includes('plateauEquilibriumPressureBar') &&
  visualizerContent.includes('pemfcCouplingDescription') &&
  visualizerContent.includes('tankVolumeLitersFor50Kg') &&
  visualizerContent.includes('dailyBoilOffLossPct'),
  'MetalHydrideStorageVisualizer must display plateau pressure, PEMFC waste heat coupling, tank volume comparison and zero boil-off metrics'
);
console.log('  ✓ Van \'t Hoff plateau, PEMFC thermal loop, and zero boil-off metrics verified');

// 7. PeriodicCodexTab integration verification
assert(
  codexContent.includes("import { MetalHydrideStorageVisualizer } from './visualizations/MetalHydrideStorageVisualizer';"),
  'PeriodicCodexTab.tsx must import MetalHydrideStorageVisualizer'
);
assert(
  codexContent.includes("'METAL_HYDRIDE_STORAGE'"),
  'PeriodicCodexTab.tsx must include METAL_HYDRIDE_STORAGE in activeMainTab type union'
);
assert(
  codexContent.includes('setActiveMainTab(\'METAL_HYDRIDE_STORAGE\')'),
  'PeriodicCodexTab.tsx must render a tab button for METAL_HYDRIDE_STORAGE'
);
assert(
  codexContent.includes('<MetalHydrideStorageVisualizer />'),
  'PeriodicCodexTab.tsx must render <MetalHydrideStorageVisualizer /> component'
);
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 279: ALL CHECKS PASSED (7/7) ---');
