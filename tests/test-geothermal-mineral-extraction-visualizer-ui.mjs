// tests/test-geothermal-mineral-extraction-visualizer-ui.mjs
// Test Suite 283: Geothermal Mineral Extraction Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 283: GeothermalMineralExtractionVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/GeothermalMineralExtractionVisualizer.tsx');
const enginePath = path.resolve('src/domain/geothermalMineralExtractionEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'GeothermalMineralExtractionVisualizer.tsx component file must exist');
console.log('  ✓ GeothermalMineralExtractionVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'geothermalMineralExtractionEngine.ts domain engine file must exist');
console.log('  ✓ geothermalMineralExtractionEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('GEOTHERMAL_SITES_CATALOG') &&
  visualizerContent.includes('calculateGeothermalPower') &&
  visualizerContent.includes('calculateDirectMineralExtraction') &&
  visualizerContent.includes('calculateGeothermalDesalination') &&
  visualizerContent.includes('evaluateSilicaScalingRisk'),
  'GeothermalMineralExtractionVisualizer must import engine functions and catalogs'
);
console.log('  ✓ GeothermalMineralExtractionVisualizer must import functions from geothermalMineralExtractionEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'GeothermalMineralExtractionVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ GeothermalMineralExtractionVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Tab modes verification
assert(
  visualizerContent.includes('GEOTHERMAL_PLANT_FLOWSHEET') &&
  visualizerContent.includes('DLE_MINERAL_YIELD_SIMULATOR') &&
  visualizerContent.includes('SILICA_SCALING_AND_GREEN_MINING_BENCHMARK'),
  'GeothermalMineralExtractionVisualizer must support 3 distinct interactive modes'
);
console.log('  ✓ GeothermalMineralExtractionVisualizer must support 3 distinct interactive modes');

// 5. SVG Visual diagram verification
assert(
  visualizerContent.includes('<svg viewBox="0 0 840 280"') &&
  visualizerContent.includes('Giếng Khai Thác') &&
  visualizerContent.includes('Trạm DLE Hấp Phụ Ion') &&
  visualizerContent.includes('Giếng Bơm Ép Hoàn Lưu'),
  'GeothermalMineralExtractionVisualizer must render interactive SVG plant flowsheet'
);
console.log('  ✓ GeothermalMineralExtractionVisualizer must render interactive SVG diagrams');

// 6. Scientific metrics verification
assert(
  visualizerContent.includes('dleYield.annualLceMetricTons') &&
  visualizerContent.includes('dleYield.equivalentEvBatteriesCount') &&
  visualizerContent.includes('medDesal.freshwaterDailyM3') &&
  visualizerContent.includes('silicaScaling.silicaSaturationIndex'),
  'Annual LCE tons, EV batteries count, MED water, and silica saturation index must be rendered'
);
console.log('  ✓ LCE yield, EV battery equivalents, and silica saturation calculations verified');

// 7. PeriodicCodexTab integration verification
assert(
  codexContent.includes("import { GeothermalMineralExtractionVisualizer } from './visualizations/GeothermalMineralExtractionVisualizer';"),
  'PeriodicCodexTab must import GeothermalMineralExtractionVisualizer'
);
assert(
  codexContent.includes("'GEOTHERMAL_MINERAL_EXTRACTION'"),
  "PeriodicCodexTab state must support 'GEOTHERMAL_MINERAL_EXTRACTION' tab"
);
assert(
  codexContent.includes("setActiveMainTab('GEOTHERMAL_MINERAL_EXTRACTION')"),
  'PeriodicCodexTab must have button to activate GEOTHERMAL_MINERAL_EXTRACTION tab'
);
assert(
  codexContent.includes("<GeothermalMineralExtractionVisualizer />"),
  'PeriodicCodexTab must render <GeothermalMineralExtractionVisualizer /> when active'
);
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 283: ALL CHECKS PASSED (7/7) ---');
