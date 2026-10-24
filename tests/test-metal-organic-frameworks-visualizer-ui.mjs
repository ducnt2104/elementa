// tests/test-metal-organic-frameworks-visualizer-ui.mjs
// Test Suite 231: MetalOrganicFrameworksVisualizer Component & PeriodicCodexTab Audit
// Standardized against IUPAC Reticular Chemistry & Vietnam GDPT 2018 Standards

import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- TEST SUITE 231: MetalOrganicFrameworksVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MetalOrganicFrameworksVisualizer.tsx');
const enginePath = path.resolve('src/domain/metalOrganicFrameworksEngine.ts');
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
test('MetalOrganicFrameworksVisualizer.tsx component file must exist', () => {
  assert(fs.existsSync(visualizerPath), 'Component file missing');
});

test('metalOrganicFrameworksEngine.ts domain engine file must exist', () => {
  assert(fs.existsSync(enginePath), 'Engine file missing');
});

test('PeriodicCodexTab.tsx file must exist', () => {
  assert(fs.existsSync(periodicCodexPath), 'PeriodicCodexTab file missing');
});

const visualizerContent = fs.readFileSync(visualizerPath, 'utf8');

// 2. Engine imports & Sound triggers
test('MetalOrganicFrameworksVisualizer must import functions from metalOrganicFrameworksEngine', () => {
  assert(visualizerContent.includes('MOF_CATALOG'), 'Must import MOF_CATALOG');
  assert(visualizerContent.includes('simulateMofAdsorption'), 'Must import simulateMofAdsorption');
  assert(visualizerContent.includes('simulateAtmosphericWaterHarvesting'), 'Must import simulateAtmosphericWaterHarvesting');
});

test('MetalOrganicFrameworksVisualizer must trigger sound.playUiClick() on interactive selections', () => {
  assert(visualizerContent.includes('sound.playUiClick()'), 'Must call sound.playUiClick()');
});

// 3. UI Tab Modes
test('MetalOrganicFrameworksVisualizer must support 3 distinct interactive modes', () => {
  assert(visualizerContent.includes("'PORE_LATTICE_ADSORPTION'"), 'Must support PORE_LATTICE_ADSORPTION');
  assert(visualizerContent.includes("'INDUSTRIAL_CARBON_CAPTURE'"), 'Must support INDUSTRIAL_CARBON_CAPTURE');
  assert(visualizerContent.includes("'DESERT_WATER_HARVESTER'"), 'Must support DESERT_WATER_HARVESTER');
});

// 4. SVG and Interactive Graphics
test('MetalOrganicFrameworksVisualizer must render interactive SVG diagrams', () => {
  assert(visualizerContent.includes('<svg viewBox="0 0 600 300"'), 'Must render Porous Cage SVG');
  assert(visualizerContent.includes('<svg viewBox="0 0 540 280"'), 'Must render Desert Water Harvester Device SVG');
});

// 5. Scientific Citations & Industrial Metrics
test('MetalOrganicFrameworksVisualizer must reference Reticular Chemistry, BET area, and MEA amine', () => {
  assert(visualizerContent.includes('Reticular'), 'Must cite Reticular chemistry');
  assert(visualizerContent.includes('BET'), 'Must cite BET surface area');
  assert(visualizerContent.includes('MEA'), 'Must cite MEA amine comparison');
  assert(visualizerContent.includes('MOF-303'), 'Must cite MOF-303');
});

// 6. PeriodicCodexTab integration
const codexContent = fs.readFileSync(periodicCodexPath, 'utf8');

test('PeriodicCodexTab must import MetalOrganicFrameworksVisualizer', () => {
  assert(codexContent.includes("import { MetalOrganicFrameworksVisualizer } from './visualizations/MetalOrganicFrameworksVisualizer';"),
    'Must import MetalOrganicFrameworksVisualizer');
});

test('PeriodicCodexTab state union must include MOF_CARBON_CAPTURE', () => {
  assert(codexContent.includes("'MOF_CARBON_CAPTURE'"), 'State union must include MOF_CARBON_CAPTURE');
});

test('PeriodicCodexTab must provide a navigation button for MOFs', () => {
  assert(codexContent.includes("setActiveMainTab('MOF_CARBON_CAPTURE')"), 'Must have button to activate MOF_CARBON_CAPTURE');
  assert(codexContent.includes('Khung Kim Loại - Hữu Cơ (MOFs)'), 'Must display tab title');
});

test('PeriodicCodexTab must render MetalOrganicFrameworksVisualizer when active', () => {
  assert(codexContent.includes("<MetalOrganicFrameworksVisualizer />"), 'Must render MetalOrganicFrameworksVisualizer');
});

console.log(`\n======================================================================`);
console.log(`   ALL ${passedCount} TESTS IN SUITE 231 PASSED AUDIT VERIFICATION!   `);
console.log(`======================================================================\n`);
