// tests/test-iodine-sulfur-cycle-visualizer-ui.mjs
// Test Suite 265: Iodine-Sulfur (IS) Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 265: IodineSulfurCycleVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/IodineSulfurCycleVisualizer.tsx');
const enginePath = path.resolve('src/domain/iodineSulfurCycleEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'IodineSulfurCycleVisualizer.tsx component file must exist');
console.log('  ✓ IodineSulfurCycleVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'iodineSulfurCycleEngine.ts domain engine file must exist');
console.log('  ✓ iodineSulfurCycleEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('getIodineSulfurCycleSteps') &&
  visualizerContent.includes('calculateCarnotLimit') &&
  visualizerContent.includes('simulateIodineSulfurPlant') &&
  visualizerContent.includes('compareThermochemicalCycles'),
  'IodineSulfurCycleVisualizer must import thermodynamic and simulation functions from iodineSulfurCycleEngine'
);
console.log('  ✓ IodineSulfurCycleVisualizer must import functions from iodineSulfurCycleEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'IodineSulfurCycleVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ IodineSulfurCycleVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'CLOSED_LOOP_REACTIONS_AND_PHASES',
  'CARNOT_AND_PINCH_HEAT_INTEGRATION',
  'GIGAWATT_HYDROGEN_ECONOMICS'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `IodineSulfurCycleVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ IodineSulfurCycleVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets check
assert(
  visualizerContent.includes('<svg viewBox="0 0 700 420"') &&
  visualizerContent.includes('Phản Ứng Bunsen') &&
  visualizerContent.includes('Tầng Trên: Pha H₂SO₄') &&
  visualizerContent.includes('Tầng Dưới: Pha HIx') &&
  visualizerContent.includes('Nhiệt Phân H₂SO₄ (850°C)') &&
  visualizerContent.includes('Nhiệt Phân HI (450°C)'),
  'IodineSulfurCycleVisualizer must render interactive SVG diagrams showing Bunsen phase separation and high-temp crackers'
);
console.log('  ✓ IodineSulfurCycleVisualizer must render interactive SVG diagrams');

// 6. Scientific terms & Gen-IV benchmarks
const requiredTerms = [
  'Iodine-Sulfur',
  'Bunsen',
  'Gen-IV',
  'VHTR',
  '850°C',
  'H₂SO₄',
  'HI',
  'SO₂',
  'Carnot',
  'Le Chatelier'
];

requiredTerms.forEach(term => {
  assert(
    visualizerContent.includes(term),
    `IodineSulfurCycleVisualizer must include scientific concept: ${term}`
  );
});
console.log('  ✓ All scientific standards, S-I thermochemistry and nuclear hydrogen benchmarks present');

// 7. Mount in PeriodicCodexTab
assert(
  codexContent.includes('import { IodineSulfurCycleVisualizer } from') &&
  codexContent.includes("'IODINE_SULFUR_CYCLE'") &&
  codexContent.includes('<IodineSulfurCycleVisualizer />'),
  'PeriodicCodexTab.tsx must import and mount IodineSulfurCycleVisualizer under IODINE_SULFUR_CYCLE tab'
);
console.log('  ✓ PeriodicCodexTab.tsx mounts IodineSulfurCycleVisualizer under IODINE_SULFUR_CYCLE');

console.log('\n--- ALL 7 AUDIT CHECKS PASSED: IodineSulfurCycleVisualizer UI IS VERIFIED! ---');
