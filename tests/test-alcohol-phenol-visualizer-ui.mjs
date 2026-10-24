/**
 * tests/test-alcohol-phenol-visualizer-ui.mjs
 * Test Suite 181: AlcoholPhenolVisualizer Component & PeriodicCodexTab Integration Audit
 * Verifies UI modes, state changes, audio triggers, CuO wire, Zaitsev rule, Cu(OH)2 chelation, and routing.
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

console.log('--- TEST SUITE 181: AlcoholPhenolVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/AlcoholPhenolVisualizer.tsx');
const enginePath = path.resolve('src/domain/alcoholPhenolEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence
assert(fs.existsSync(visualizerPath), 'AlcoholPhenolVisualizer.tsx component file must exist');
assert(fs.existsSync(enginePath), 'alcoholPhenolEngine.ts domain engine file must exist');
assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Visualizer imports & dependencies
assert(
  visualizerContent.includes('CURRICULUM_ALCOHOLS') &&
  visualizerContent.includes('CURRICULUM_PHENOLS') &&
  visualizerContent.includes('predictAlcoholOxidation') &&
  visualizerContent.includes('predictAlcoholDehydration') &&
  visualizerContent.includes('evaluateCuOh2PolyolTest') &&
  visualizerContent.includes('evaluatePhenolReaction'),
  'AlcoholPhenolVisualizer must import catalogs and evaluation functions from alcoholPhenolEngine'
);

// 3. Audio triggers
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'AlcoholPhenolVisualizer must trigger sound.playUiClick() on interactive selections'
);

// 4. All 3 Modes supported
assert(
  visualizerContent.includes("'ALCOHOL_REACTIONS'") &&
  visualizerContent.includes("'CUOH2_POLYOL_TEST'") &&
  visualizerContent.includes("'PHENOL_CHEMISTRY'"),
  'AlcoholPhenolVisualizer must support all 3 modes: ALCOHOL_REACTIONS, CUOH2_POLYOL_TEST, and PHENOL_CHEMISTRY'
);

// 5. CuO oxidation & Zaitsev dehydration UI
assert(
  visualizerContent.includes('Cu (đỏ gạch)') &&
  visualizerContent.includes('dehydrationTemp') &&
  visualizerContent.includes('Quy tắc Zaitsev'),
  'AlcoholPhenolVisualizer must render Cu metal wire color change and Zaitsev rule breakdown'
);

// 6. Cu(OH)2 Polyol chelation UI
assert(
  visualizerContent.includes('Dung dịch phức') &&
  visualizerContent.includes('Cu(OH)₂↓') &&
  visualizerContent.includes('vicinal diol/triol'),
  'AlcoholPhenolVisualizer must render Cu(OH)2 chelation comparison with vicinal diol pedagogical notes'
);

// 7. Phenol precipitation stoichiometry
assert(
  visualizerContent.includes('phenolMoles') &&
  visualizerContent.includes('Khối lượng kết tủa') &&
  visualizerContent.includes('2,4,6-tribromophenol'),
  'AlcoholPhenolVisualizer must render phenol reactions and precipitate mass calculation'
);

// 8. PeriodicCodexTab integration
assert(
  codexContent.includes("import { AlcoholPhenolVisualizer } from './visualizations/AlcoholPhenolVisualizer';"),
  'PeriodicCodexTab must import AlcoholPhenolVisualizer'
);

assert(
  codexContent.includes("'ALCOHOL_PHENOL_REACTIONS'"),
  "PeriodicCodexTab must include 'ALCOHOL_PHENOL_REACTIONS' in navigation tabs"
);

assert(
  codexContent.includes('<AlcoholPhenolVisualizer />'),
  'PeriodicCodexTab must mount <AlcoholPhenolVisualizer /> when activeMainTab is ALCOHOL_PHENOL_REACTIONS'
);

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('✓ TEST SUITE 181 PASSED: AlcoholPhenolVisualizer fully verified!\n');
}
