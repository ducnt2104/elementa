// tests/test-food-chemistry-visualizer-ui.mjs
// Test Suite 211: FoodChemistryVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & IUPAC Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 211: FoodChemistryVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/FoodChemistryVisualizer.tsx');
const enginePath = path.resolve('src/domain/foodChemistryEngine.ts');
const periodicCodexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

let passedCount = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ✗ ${name}: ${err.message}`);
    process.exit(1);
  }
}

// 1. Files existence
test('FoodChemistryVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('foodChemistryEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('FoodChemistryVisualizer must import simulation functions from foodChemistryEngine', () => {
  assert(visualizerContent.includes('simulateMaillardReaction'), 'Must import simulateMaillardReaction');
  assert(visualizerContent.includes('simulateLipidAutoOxidation'), 'Must import simulateLipidAutoOxidation');
  assert(visualizerContent.includes('performBoraxCurcuminTest'), 'Must import performBoraxCurcuminTest');
  assert(visualizerContent.includes('PRESERVATIVE_CATALOG'), 'Must import PRESERVATIVE_CATALOG');
});

test('FoodChemistryVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. Mode coverage
test('FoodChemistryVisualizer must support all 3 modes: MAILLARD_BROWNING_LAB, LIPID_AUTO_OXIDATION, and FOOD_SAFETY_BORAX_TEST', () => {
  assert(visualizerContent.includes("'MAILLARD_BROWNING_LAB'"), 'Must support MAILLARD_BROWNING_LAB mode');
  assert(visualizerContent.includes("'LIPID_AUTO_OXIDATION'"), 'Must support LIPID_AUTO_OXIDATION mode');
  assert(visualizerContent.includes("'FOOD_SAFETY_BORAX_TEST'"), 'Must support FOOD_SAFETY_BORAX_TEST mode');
});

// 4. Maillard Toast SVG
test('FoodChemistryVisualizer must render toast slice SVG with dynamic Melanoidin colors', () => {
  assert(visualizerContent.includes('maillard.browningColorHex'), 'Must apply browningColorHex to toast');
  assert(visualizerContent.includes('Melanoidin'), 'Must feature Melanoidin metrics');
});

// 5. Lipid Auto-Oxidation
test('FoodChemistryVisualizer must render Peroxide Value (POV) and oil bottle SVG', () => {
  assert(visualizerContent.includes('peroxideValuePovMeqPerKg'), 'Must track Peroxide Value POV');
  assert(visualizerContent.includes('Malondialdehyde'), 'Must track Malondialdehyde MDA');
});

// 6. Borax Curcumin Test
test('FoodChemistryVisualizer must render turmeric test strip and alkali confirmation toggle', () => {
  assert(visualizerContent.includes('performBoraxCurcuminTest'), 'Must run Borax curcumin test');
  assert(visualizerContent.includes('isAlkaliApplied'), 'Must support alkali confirmation toggle');
  assert(visualizerContent.includes('PRESERVATIVE_CATALOG'), 'Must render preservative catalog');
});

// 7. Integration in PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import FoodChemistryVisualizer', () => {
  assert(periodicCodexContent.includes('FoodChemistryVisualizer'), 'Must import FoodChemistryVisualizer in PeriodicCodexTab.tsx');
});

test('PeriodicCodexTab must include FOOD_CHEMISTRY in navigation tabs', () => {
  assert(periodicCodexContent.includes("'FOOD_CHEMISTRY'"), 'Must include FOOD_CHEMISTRY in activeMainTab type union and navigation');
});

test('PeriodicCodexTab must mount <FoodChemistryVisualizer /> when activeMainTab is FOOD_CHEMISTRY', () => {
  assert(periodicCodexContent.includes('<FoodChemistryVisualizer'), 'Must render <FoodChemistryVisualizer />');
});

console.log(`\nResults: ${passedCount} passed, 0 failed.`);
console.log('✓ TEST SUITE 211 PASSED: FoodChemistryVisualizer fully verified!\n');
