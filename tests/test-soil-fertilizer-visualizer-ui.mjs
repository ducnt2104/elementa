// tests/test-soil-fertilizer-visualizer-ui.mjs
// Test Suite 219: SoilFertilizerVisualizer Component & PeriodicCodexTab Audit
// Standardized against Vietnam GDPT 2018 Chemistry Curriculum & WHO Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 219: SoilFertilizerVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/SoilFertilizerVisualizer.tsx');
const enginePath = path.resolve('src/domain/soilFertilizerEngine.ts');
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
test('SoilFertilizerVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('soilFertilizerEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('SoilFertilizerVisualizer must import simulation functions from engine', () => {
  assert(visualizerContent.includes('FERTILIZERS_CATALOG'), 'Must import FERTILIZERS_CATALOG');
  assert(visualizerContent.includes('VIETNAM_SOILS_DATA'), 'Must import VIETNAM_SOILS_DATA');
  assert(visualizerContent.includes('calculateLimingRequirement'), 'Must import calculateLimingRequirement');
  assert(visualizerContent.includes('simulateNitrogenTransformation'), 'Must import simulateNitrogenTransformation');
});

test('SoilFertilizerVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('SoilFertilizerVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'NITROGEN_LEACHING'"), 'Must support NITROGEN_LEACHING');
  assert(visualizerContent.includes("'ACID_SOIL_LIMING'"), 'Must support ACID_SOIL_LIMING');
  assert(visualizerContent.includes("'FERTILIZER_CATALOG'"), 'Must support FERTILIZER_CATALOG');
});

// 4. SVG Visualizations
test('SoilFertilizerVisualizer must include dynamic SVG soil cross-section with water table and root', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 540 240"'), 'Must contain 540x240 soil profile SVG');
  assert(visualizerContent.includes('TẦNG CHỨA NƯỚC NGẦM'), 'Must label groundwater table');
  assert(visualizerContent.includes('NH₄⁺'), 'Must visualize NH4+ cation adsorption');
  assert(visualizerContent.includes('NO₃⁻'), 'Must visualize NO3- anion leaching');
});

test('SoilFertilizerVisualizer must include acid soil liming remediation beaker with Al(OH)3 precipitate', () => {
  assert(visualizerContent.includes('Al(OH)₃'), 'Must visualize Al(OH)3 neutralization');
  assert(visualizerContent.includes('limeRequirementKgCaoPerHa'), 'Must calculate lime requirement');
});

// 5. Integration into PeriodicCodexTab
const periodicCodexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import SoilFertilizerVisualizer', () => {
  assert(periodicCodexContent.includes("import { SoilFertilizerVisualizer } from './visualizations/SoilFertilizerVisualizer';"), 'Import missing');
});

test('PeriodicCodexTab must include SOIL_FERTILIZER_CHEMISTRY in activeMainTab type union', () => {
  assert(periodicCodexContent.includes("'SOIL_FERTILIZER_CHEMISTRY'"), 'Tab type missing');
});

test('PeriodicCodexTab must render SoilFertilizerVisualizer when activeMainTab is SOIL_FERTILIZER_CHEMISTRY', () => {
  assert(periodicCodexContent.includes("<SoilFertilizerVisualizer />"), 'Component JSX call missing');
});

test('PeriodicCodexTab must contain the navigation button for Hóa Học Đất & Phân Bón', () => {
  assert(periodicCodexContent.includes('Hóa Học Đất & Phân Bón'), 'Navigation label missing');
  assert(periodicCodexContent.includes("setActiveMainTab('SOIL_FERTILIZER_CHEMISTRY')"), 'Click handler missing');
});

console.log(`\n======================================================================`);
console.log(`   TEST SUITE 219: ALL ${passedCount}/12 TESTS PASSED PERFECTLY       `);
console.log(`======================================================================\n`);
