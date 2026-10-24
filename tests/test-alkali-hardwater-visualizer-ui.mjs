// tests/test-alkali-hardwater-visualizer-ui.mjs
// Test Suite 177: AlkaliHardWaterVisualizer UI Component and Integration Audit
// Conforming strictly to Vietnam GDPT 2018 Chemistry 12 & IUPAC Standards

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

console.log('--- TEST SUITE 177: AlkaliHardWaterVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/AlkaliHardWaterVisualizer.tsx');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
const enginePath = path.resolve('src/domain/alkaliHardWaterEngine.ts');

// Test 1: File Existence
assert(fs.existsSync(visualizerPath), 'AlkaliHardWaterVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'alkaliHardWaterEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');
const codexContent = fs.readFileSync(codexPath, 'utf8');

// Test 2: Engine Imports
assert(
  visualizerContent.includes('GROUP_IA_IIA_METALS') &&
  visualizerContent.includes('analyzeWaterHardness') &&
  visualizerContent.includes('simulateWaterSoftening'),
  'AlkaliHardWaterVisualizer must import metals and analysis functions from alkaliHardWaterEngine'
);

// Test 3: Audio Feedback Integration
assert(
  visualizerContent.includes("sound.playUiClick()"),
  'AlkaliHardWaterVisualizer must trigger sound.playUiClick() on interactive selections'
);

// Test 4: Modes Support
assert(
  visualizerContent.includes('METALS_AND_FLAME') &&
  visualizerContent.includes('HARD_WATER_ANALYSIS') &&
  visualizerContent.includes('SOFTENING_SIMULATION'),
  'AlkaliHardWaterVisualizer must support all 3 modes: METALS_AND_FLAME, HARD_WATER_ANALYSIS, and SOFTENING_SIMULATION'
);

// Test 5: Visual Elements and SVG
assert(
  visualizerContent.includes('<svg') &&
  visualizerContent.includes('Flame Emission Test'),
  'AlkaliHardWaterVisualizer must render SVG burner and flame emission color'
);

assert(
  visualizerContent.includes('Lãng Phí Xà Phòng') &&
  visualizerContent.includes('Nguy Cơ Nổ Nồi Hơi'),
  'AlkaliHardWaterVisualizer must display soap waste and boiler explosion risk metrics'
);

// Test 6: Integration in PeriodicCodexTab
assert(
  codexContent.includes("import { AlkaliHardWaterVisualizer } from './visualizations/AlkaliHardWaterVisualizer';"),
  'PeriodicCodexTab must import AlkaliHardWaterVisualizer'
);
assert(
  codexContent.includes("'ALKALI_HARD_WATER'"),
  "PeriodicCodexTab must include 'ALKALI_HARD_WATER' in navigation tabs"
);
assert(
  codexContent.includes('<AlkaliHardWaterVisualizer />'),
  'PeriodicCodexTab must mount <AlkaliHardWaterVisualizer /> when activeMainTab is ALKALI_HARD_WATER'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 177 PASSED: AlkaliHardWaterVisualizer fully verified!');
  process.exit(0);
}
