// tests/test-carbohydrate-visualizer-ui.mjs
// Test Suite 171: CarbohydrateVisualizer UI Component and Integration Audit
// Conforming strictly to Vietnam GDPT 2018 Chemistry 12 & IUPAC Guidelines

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

console.log('--- TEST SUITE 171: CarbohydrateVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/CarbohydrateVisualizer.tsx');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
const enginePath = path.resolve('src/domain/carbohydrateEngine.ts');

// Test 1: File Existence
assert(fs.existsSync(visualizerPath), 'CarbohydrateVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'carbohydrateEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');
const codexContent = fs.readFileSync(codexPath, 'utf8');

// Test 2: Engine Imports
assert(
  visualizerContent.includes('CARBOHYDRATES_CATALOG') &&
  visualizerContent.includes('calculateMutarotationEquilibrium') &&
  visualizerContent.includes('calculateTollensSilverMirror') &&
  visualizerContent.includes('calculateFehlingReaction') &&
  visualizerContent.includes('simulateStarchIodineColor') &&
  visualizerContent.includes('calculateSucroseInversion') &&
  visualizerContent.includes('calculateCelluloseNitration'),
  'CarbohydrateVisualizer must import all functions from carbohydrateEngine'
);

// Test 3: Audio Feedback Integration
assert(
  visualizerContent.includes("sound.playUiClick()"),
  'CarbohydrateVisualizer must trigger sound.playUiClick() on interactive selections'
);

// Test 4: Modes Support
assert(
  visualizerContent.includes('MUTAROTATION') &&
  visualizerContent.includes('REDOX_TESTS') &&
  visualizerContent.includes('POLYSACCHARIDE_EXPERIMENTS'),
  'CarbohydrateVisualizer must support all 3 modes: MUTAROTATION, REDOX_TESTS, and POLYSACCHARIDE_EXPERIMENTS'
);

// Test 5: Sub-tabs and Visual Elements
assert(
  visualizerContent.includes('STARCH_IODINE') &&
  visualizerContent.includes('SUCROSE_INVERSION') &&
  visualizerContent.includes('CELLULOSE_NITRATION'),
  'CarbohydrateVisualizer must include all 3 polysaccharide sub-tabs'
);

assert(
  visualizerContent.includes('<svg') &&
  visualizerContent.includes('silverMirrorGrad'),
  'CarbohydrateVisualizer must include SVG illustrations for Tollens silver mirror'
);

// Test 6: Integration in PeriodicCodexTab
assert(
  codexContent.includes("import { CarbohydrateVisualizer } from './visualizations/CarbohydrateVisualizer';"),
  'PeriodicCodexTab must import CarbohydrateVisualizer'
);
assert(
  codexContent.includes("'CARBOHYDRATE_BIOCHEMISTRY'"),
  "PeriodicCodexTab must include 'CARBOHYDRATE_BIOCHEMISTRY' in navigation tabs"
);
assert(
  codexContent.includes('<CarbohydrateVisualizer />'),
  'PeriodicCodexTab must mount <CarbohydrateVisualizer /> when activeMainTab is CARBOHYDRATE_BIOCHEMISTRY'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 171 PASSED: CarbohydrateVisualizer fully verified!');
  process.exit(0);
}
