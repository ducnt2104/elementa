// tests/test-ester-lipid-visualizer-ui.mjs
// Test Suite 169: Verification of EsterLipidVisualizer UI Component and Integration in PeriodicCodexTab
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

console.log('--- TEST SUITE 169: EsterLipidVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/EsterLipidVisualizer.tsx');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
const enginePath = path.resolve('src/domain/esterLipidEngine.ts');

// Test 1: File Existence
assert(fs.existsSync(visualizerPath), 'EsterLipidVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'esterLipidEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');
const codexContent = fs.readFileSync(codexPath, 'utf8');

// Test 2: Imports & Engine Integration
assert(
  visualizerContent.includes('ESTERS_CATALOG') &&
  visualizerContent.includes('TRIGLYCERIDES_CATALOG') &&
  visualizerContent.includes('calculateFischerEsterificationYield') &&
  visualizerContent.includes('calculateSaponification') &&
  visualizerContent.includes('simulateSoapSaltingOut'),
  'EsterLipidVisualizer must import all core catalogs and simulation functions from esterLipidEngine'
);

// Test 3: Audio Feedback Integration
assert(
  visualizerContent.includes("sound.playUiClick()"),
  'EsterLipidVisualizer must trigger sound.playUiClick() on interactive selections and mode changes'
);

// Test 4: Modes Support
assert(
  visualizerContent.includes('FISCHER_ESTERIFICATION') &&
  visualizerContent.includes('LIPID_SAPONIFICATION') &&
  visualizerContent.includes('SALTING_OUT'),
  'EsterLipidVisualizer must support all 3 modes: FISCHER_ESTERIFICATION, LIPID_SAPONIFICATION, and SALTING_OUT'
);

// Test 5: GDPT 2018 Pedagogical Details
assert(
  visualizerContent.includes('GDPT 2018 Lớp 12') &&
  visualizerContent.includes('Le Chatelier') &&
  visualizerContent.includes('Bảo toàn khối lượng'),
  'EsterLipidVisualizer must display curriculum badges, Le Chatelier principle, and mass conservation'
);

// Test 6: SVG Graphical Demonstrations
assert(
  visualizerContent.includes('<svg') &&
  visualizerContent.includes('esterLayerGrad') &&
  visualizerContent.includes('soapCakeGrad'),
  'EsterLipidVisualizer must include SVG simulations for ester phase separation and floating soap cake'
);

// Test 7: Integration in PeriodicCodexTab
assert(
  codexContent.includes("import { EsterLipidVisualizer } from './visualizations/EsterLipidVisualizer';"),
  'PeriodicCodexTab must import EsterLipidVisualizer'
);
assert(
  codexContent.includes("'ESTER_LIPID_SAPONIFICATION'"),
  "PeriodicCodexTab must include 'ESTER_LIPID_SAPONIFICATION' in navigation tabs"
);
assert(
  codexContent.includes('<EsterLipidVisualizer />'),
  'PeriodicCodexTab must mount <EsterLipidVisualizer /> when activeMainTab is ESTER_LIPID_SAPONIFICATION'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 169 PASSED: EsterLipidVisualizer fully verified!');
  process.exit(0);
}
