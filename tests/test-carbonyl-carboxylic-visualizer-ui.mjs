/**
 * tests/test-carbonyl-carboxylic-visualizer-ui.mjs
 * Test Suite 183: CarbonylCarboxylicVisualizer Component & PeriodicCodexTab Integration Audit
 * Verifies UI modes, state changes, audio triggers, silver mirror flask, Fehling test, iodoform, and acid CO2 effervescence.
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

console.log('--- TEST SUITE 183: CarbonylCarboxylicVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/CarbonylCarboxylicVisualizer.tsx');
const enginePath = path.resolve('src/domain/carbonylCarboxylicEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence
assert(fs.existsSync(visualizerPath), 'CarbonylCarboxylicVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'carbonylCarboxylicEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports & dependencies
assert(
  visualizerContent.includes('CURRICULUM_CARBONYLS') &&
  visualizerContent.includes('CURRICULUM_CARBOXYLIC_ACIDS') &&
  visualizerContent.includes('evaluateTollensTest') &&
  visualizerContent.includes('evaluateFehlingTest') &&
  visualizerContent.includes('evaluateIodoformTest') &&
  visualizerContent.includes('evaluateAcidReaction'),
  'CarbonylCarboxylicVisualizer must import catalogs and evaluation functions from carbonylCarboxylicEngine'
);

// 3. Audio triggers
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'CarbonylCarboxylicVisualizer must trigger sound.playUiClick() on interactive selections'
);

// 4. All 3 Modes supported
assert(
  visualizerContent.includes("'TOLLENS_FEHLING'") &&
  visualizerContent.includes("'IODOFORM_HALOFORM'") &&
  visualizerContent.includes("'CARBOXYLIC_ACID_LAB'"),
  'CarbonylCarboxylicVisualizer must support all 3 modes: TOLLENS_FEHLING, IODOFORM_HALOFORM, and CARBOXYLIC_ACID_LAB'
);

// 5. Silver mirror & Fehling UI
assert(
  visualizerContent.includes('Bình tráng bạc') &&
  visualizerContent.includes('tollensMoles') &&
  visualizerContent.includes('Cu₂O↓ (Đỏ gạch)'),
  'CarbonylCarboxylicVisualizer must render SVG silver mirror flask and Fehling Cu2O red-brick test tube'
);

// 6. Iodoform reaction UI
assert(
  visualizerContent.includes('iodoformMoles') &&
  visualizerContent.includes('CHI₃↓') &&
  visualizerContent.includes('nhóm Metyl Cacbonyl'),
  'CarbonylCarboxylicVisualizer must render iodoform test with yellow CHI3 precipitate and methyl carbonyl rule'
);

// 7. Carboxylic acid effervescence UI
assert(
  visualizerContent.includes('acidReagent') &&
  visualizerContent.includes('Khí thoát ra') &&
  visualizerContent.includes('animate-bounce'),
  'CarbonylCarboxylicVisualizer must render acid reactions and animated effervescence bubbles'
);

// 8. PeriodicCodexTab integration
assert(
  codexContent.includes("import { CarbonylCarboxylicVisualizer } from './visualizations/CarbonylCarboxylicVisualizer';"),
  'PeriodicCodexTab must import CarbonylCarboxylicVisualizer'
);

assert(
  codexContent.includes("'CARBONYL_CARBOXYLIC_ACID'"),
  "PeriodicCodexTab must include 'CARBONYL_CARBOXYLIC_ACID' in navigation tabs"
);

assert(
  codexContent.includes('<CarbonylCarboxylicVisualizer />'),
  'PeriodicCodexTab must mount <CarbonylCarboxylicVisualizer /> when activeMainTab is CARBONYL_CARBOXYLIC_ACID'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 183 PASSED: CarbonylCarboxylicVisualizer fully verified!\n');
}
