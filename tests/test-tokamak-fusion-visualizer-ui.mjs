// tests/test-tokamak-fusion-visualizer-ui.mjs
// Test Suite 277: Tokamak Fusion Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 277: TokamakFusionVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/TokamakFusionVisualizer.tsx');
const enginePath = path.resolve('src/domain/tokamakFusionEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'TokamakFusionVisualizer.tsx component file must exist');
console.log('  ✓ TokamakFusionVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'tokamakFusionEngine.ts domain engine file must exist');
console.log('  ✓ tokamakFusionEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('FUSION_REACTIONS_CATALOG') &&
  visualizerContent.includes('BLANKET_CATALOG') &&
  visualizerContent.includes('calculateTokamakPerformance'),
  'TokamakFusionVisualizer must import catalogs and calculateTokamakPerformance from tokamakFusionEngine'
);
console.log('  ✓ TokamakFusionVisualizer must import functions from tokamakFusionEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'TokamakFusionVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ TokamakFusionVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'TOKAMAK_CHAMBER_AND_MAGNETIC_CONFINEMENT',
  'TRITIUM_BREEDING_BLANKET_RADIOCHEMISTRY',
  'DIVERTOR_EXHAUST_AND_POWER_GRID_BALANCE'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `TokamakFusionVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ TokamakFusionVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets & schematic check
assert(
  visualizerContent.includes('<svg viewBox="0 0 460 340"') &&
  visualizerContent.includes('CUỘN SOLENOID TRUNG TÂM') &&
  visualizerContent.includes('VÙNG LÕI PLASMA') &&
  visualizerContent.includes('DIVERTOR VONFRAM (W)') &&
  visualizerContent.includes('CUỘN TỪ HÌNH XUYẾN REBCO'),
  'TokamakFusionVisualizer must render interactive SVG diagrams showing Central Solenoid, Plasma Core, Divertor and Toroidal Coils'
);
console.log('  ✓ TokamakFusionVisualizer must render interactive SVG diagrams');

// 6. Scientific terms & Nuclear Fusion benchmarks
assert(
  visualizerContent.includes('lawsonTripleProductKeVsM3') &&
  visualizerContent.includes('tritiumBreedingRatioTBR') &&
  visualizerContent.includes('detachedDivertorHeatFluxMwPerM2') &&
  visualizerContent.includes('activeFuelInventoryInCoreGrams'),
  'TokamakFusionVisualizer must display Lawson triple product, TBR breeding ratio, detached divertor heat flux, and active fuel inventory'
);
console.log('  ✓ Lawson criterion, TBR, and Divertor heat flux metrics verified');

// 7. PeriodicCodexTab integration verification
assert(
  codexContent.includes("import { TokamakFusionVisualizer } from './visualizations/TokamakFusionVisualizer';"),
  'PeriodicCodexTab.tsx must import TokamakFusionVisualizer'
);
assert(
  codexContent.includes("'TOKAMAK_FUSION'"),
  'PeriodicCodexTab.tsx must include TOKAMAK_FUSION in activeMainTab type union'
);
assert(
  codexContent.includes('setActiveMainTab(\'TOKAMAK_FUSION\')'),
  'PeriodicCodexTab.tsx must render a tab button for TOKAMAK_FUSION'
);
assert(
  codexContent.includes('<TokamakFusionVisualizer />'),
  'PeriodicCodexTab.tsx must render <TokamakFusionVisualizer /> component'
);
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 277: ALL CHECKS PASSED (7/7) ---');
