// tests/test-metallurgy-corrosion-visualizer-ui.mjs
// Test Suite 175: MetallurgyCorrosionVisualizer UI Component and Integration Audit
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

console.log('--- TEST SUITE 175: MetallurgyCorrosionVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MetallurgyCorrosionVisualizer.tsx');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
const enginePath = path.resolve('src/domain/metallurgyCorrosionEngine.ts');

// Test 1: File Existence
assert(fs.existsSync(visualizerPath), 'MetallurgyCorrosionVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'metallurgyCorrosionEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');
const codexContent = fs.readFileSync(codexPath, 'utf8');

// Test 2: Engine Imports
assert(
  visualizerContent.includes('ELECTROCHEMICAL_SERIES') &&
  visualizerContent.includes('predictAlphaRuleRedox') &&
  visualizerContent.includes('simulateCorrosionMechanism'),
  'MetallurgyCorrosionVisualizer must import series and simulation functions from metallurgyCorrosionEngine'
);

// Test 3: Audio Feedback Integration
assert(
  visualizerContent.includes("sound.playUiClick()"),
  'MetallurgyCorrosionVisualizer must trigger sound.playUiClick() on interactive selections'
);

// Test 4: Modes Support
assert(
  visualizerContent.includes('ALPHA_RULE') &&
  visualizerContent.includes('METALLURGY_METHODS') &&
  visualizerContent.includes('CORROSION_SIMULATION'),
  'MetallurgyCorrosionVisualizer must support all 3 modes: ALPHA_RULE, METALLURGY_METHODS, and CORROSION_SIMULATION'
);

// Test 5: Visual Elements and SVG
assert(
  visualizerContent.includes('<svg') &&
  visualizerContent.includes('Suất Điện Động Chuẩn'),
  'MetallurgyCorrosionVisualizer must render SVG alpha rule diagram and standard cell emf'
);

assert(
  visualizerContent.includes('BẢO VỆ CATOT THÀNH CÔNG') || visualizerContent.includes('Bảo vệ Catot hy sinh'),
  'MetallurgyCorrosionVisualizer must display sacrificial anode cathodic protection status'
);

// Test 6: Integration in PeriodicCodexTab
assert(
  codexContent.includes("import { MetallurgyCorrosionVisualizer } from './visualizations/MetallurgyCorrosionVisualizer';"),
  'PeriodicCodexTab must import MetallurgyCorrosionVisualizer'
);
assert(
  codexContent.includes("'METALLURGY_CORROSION'"),
  "PeriodicCodexTab must include 'METALLURGY_CORROSION' in navigation tabs"
);
assert(
  codexContent.includes('<MetallurgyCorrosionVisualizer />'),
  'PeriodicCodexTab must mount <MetallurgyCorrosionVisualizer /> when activeMainTab is METALLURGY_CORROSION'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 175 PASSED: MetallurgyCorrosionVisualizer fully verified!');
  process.exit(0);
}
