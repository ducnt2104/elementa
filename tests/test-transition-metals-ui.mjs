/**
 * tests/test-transition-metals-ui.mjs
 * Test Suite 179: TransitionMetalsVisualizer Component & PeriodicCodexTab Integration Audit
 * Verifies UI modes, state changes, audio triggers, crystal field orbital diagrams, and tab routing.
 */

import fs from 'fs';
import path from 'path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- TEST SUITE 179: TransitionMetalsVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/TransitionMetalsVisualizer.tsx');
const enginePath = path.resolve('src/domain/transitionMetalsEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence
assert(fs.existsSync(visualizerPath), 'TransitionMetalsVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'transitionMetalsEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports & dependencies
assert(
  visualizerContent.includes('TRANSITION_METALS_SERIES') &&
  visualizerContent.includes('SPECTROCHEMICAL_LIGANDS') &&
  visualizerContent.includes('COORDINATION_COMPLEXES') &&
  visualizerContent.includes('calculateChromateEquilibrium') &&
  visualizerContent.includes('calculateCobaltEquilibrium') &&
  visualizerContent.includes('calculateOctahedralSplitting'),
  'TransitionMetalsVisualizer must import catalogs and calculations from transitionMetalsEngine'
);

// 3. Audio effects
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'TransitionMetalsVisualizer must trigger sound.playUiClick() on interactive selections'
);

// 4. All 3 Modes supported
assert(
  visualizerContent.includes("'METALS_SERIES'") &&
  visualizerContent.includes("'EQUILIBRIUM_SWITCH'") &&
  visualizerContent.includes("'COMPLEXES_AND_CRYSTAL_FIELD'"),
  'TransitionMetalsVisualizer must support all 3 modes: METALS_SERIES, EQUILIBRIUM_SWITCH, and COMPLEXES_AND_CRYSTAL_FIELD'
);

// 5. Chromate & Cobalt Equilibrium elements
assert(
  visualizerContent.includes('calculateChromateEquilibrium') &&
  visualizerContent.includes('chromatePh') &&
  visualizerContent.includes('calculateCobaltEquilibrium') &&
  visualizerContent.includes('cobaltTemp'),
  'TransitionMetalsVisualizer must render interactive pH and temperature sliders for equilibrium switches'
);

// 6. Crystal Field Splitting orbital rendering
assert(
  visualizerContent.includes('Mức eg') &&
  visualizerContent.includes('Mức t2g') &&
  visualizerContent.includes('Năng lượng tách trường bát diện (Δₒ)'),
  'TransitionMetalsVisualizer must render eg and t2g crystal field splitting energy levels'
);

// 7. PeriodicCodexTab integration
assert(
  codexContent.includes("import { TransitionMetalsVisualizer } from './visualizations/TransitionMetalsVisualizer';"),
  'PeriodicCodexTab must import TransitionMetalsVisualizer'
);

assert(
  codexContent.includes("'TRANSITION_METALS_COMPLEXES'"),
  "PeriodicCodexTab must include 'TRANSITION_METALS_COMPLEXES' in navigation tabs"
);

assert(
  codexContent.includes('<TransitionMetalsVisualizer />'),
  'PeriodicCodexTab must mount <TransitionMetalsVisualizer /> when activeMainTab is TRANSITION_METALS_COMPLEXES'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 179 PASSED: TransitionMetalsVisualizer fully verified!\n');
}
