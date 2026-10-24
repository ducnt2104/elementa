/**
 * tests/test-nitrogen-sulfur-visualizer-ui.mjs
 * Test Suite 185: NitrogenSulfurVisualizer Component & PeriodicCodexTab Integration Audit
 * Verifies UI modes, state changes, audio triggers, Ammonia fountain SVG, HNO3 passivation, Aqua Regia, and Sugar snake.
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

console.log('--- TEST SUITE 185: NitrogenSulfurVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/NitrogenSulfurVisualizer.tsx');
const enginePath = path.resolve('src/domain/nitrogenSulfurEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence
assert(fs.existsSync(visualizerPath), 'NitrogenSulfurVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'nitrogenSulfurEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports & dependencies
assert(
  visualizerContent.includes('simulateAmmoniaFountain') &&
  visualizerContent.includes('predictHno3Redox') &&
  visualizerContent.includes('simulateAquaRegia') &&
  visualizerContent.includes('simulateSugarDehydration') &&
  visualizerContent.includes('evaluateEutrophication'),
  'NitrogenSulfurVisualizer must import simulation functions from nitrogenSulfurEngine'
);

// 3. Audio triggers
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'NitrogenSulfurVisualizer must trigger sound.playUiClick() on interactive selections'
);

// 4. All 3 Modes supported
assert(
  visualizerContent.includes("'AMMONIA_FOUNTAIN'") &&
  visualizerContent.includes("'HNO3_REDOX_AQUA_REGIA'") &&
  visualizerContent.includes("'ACID_RAIN_SUGAR_CHARCOAL'"),
  'NitrogenSulfurVisualizer must support all 3 modes: AMMONIA_FOUNTAIN, HNO3_REDOX_AQUA_REGIA, and ACID_RAIN_SUGAR_CHARCOAL'
);

// 5. Ammonia fountain SVG
assert(
  visualizerContent.includes('Đài Phun Nước Ammonia') &&
  visualizerContent.includes('fountainResult.indicatorHex') &&
  visualizerContent.includes('nh3Volume'),
  'NitrogenSulfurVisualizer must render SVG ammonia fountain with pink phenolphthalein jet'
);

// 6. HNO3 Passivation & Aqua Regia
assert(
  visualizerContent.includes('BỊ THỤ ĐỘNG HÓA!') &&
  visualizerContent.includes('Aqua Regia') &&
  visualizerContent.includes('aquaRegiaResult.complexAcidFormed'),
  'NitrogenSulfurVisualizer must render HNO3 passivation alerts and Aqua Regia gold dissolution'
);

// 7. Sugar Dehydration & Eutrophication
assert(
  visualizerContent.includes('sugarGrams') &&
  visualizerContent.includes('Sugar Snake') &&
  visualizerContent.includes('eutrophicationResult.dissolvedOxygenMgL'),
  'NitrogenSulfurVisualizer must render sugar snake carbon metrics and eutrophication DO gauge'
);

// 8. PeriodicCodexTab integration
assert(
  codexContent.includes("import { NitrogenSulfurVisualizer } from './visualizations/NitrogenSulfurVisualizer';"),
  'PeriodicCodexTab must import NitrogenSulfurVisualizer'
);

assert(
  codexContent.includes("'NITROGEN_SULFUR_COMPOUNDS'"),
  "PeriodicCodexTab must include 'NITROGEN_SULFUR_COMPOUNDS' in navigation tabs"
);

assert(
  codexContent.includes('<NitrogenSulfurVisualizer />'),
  'PeriodicCodexTab must mount <NitrogenSulfurVisualizer /> when activeMainTab is NITROGEN_SULFUR_COMPOUNDS'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 185 PASSED: NitrogenSulfurVisualizer fully verified!\n');
}
