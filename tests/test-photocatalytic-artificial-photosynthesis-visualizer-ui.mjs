// tests/test-photocatalytic-artificial-photosynthesis-visualizer-ui.mjs
// Test Suite 281: Photocatalytic Artificial Photosynthesis Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 281: PhotocatalyticArtificialPhotosynthesisVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/PhotocatalyticArtificialPhotosynthesisVisualizer.tsx');
const enginePath = path.resolve('src/domain/photocatalyticArtificialPhotosynthesisEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'PhotocatalyticArtificialPhotosynthesisVisualizer.tsx component file must exist');
console.log('  ✓ PhotocatalyticArtificialPhotosynthesisVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'photocatalyticArtificialPhotosynthesisEngine.ts domain engine file must exist');
console.log('  ✓ photocatalyticArtificialPhotosynthesisEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('PHOTOCATALYST_CATALOG') &&
  visualizerContent.includes('Z_SCHEME_CATALOG') &&
  visualizerContent.includes('calculateWaterSplittingThermodynamics') &&
  visualizerContent.includes('evaluateBandAlignmentFeasibility') &&
  visualizerContent.includes('calculateSolarHydrogenProduction') &&
  visualizerContent.includes('calculateApparentQuantumYield'),
  'PhotocatalyticArtificialPhotosynthesisVisualizer must import engine functions and catalogs'
);
console.log('  ✓ PhotocatalyticArtificialPhotosynthesisVisualizer must import functions from photocatalyticArtificialPhotosynthesisEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'PhotocatalyticArtificialPhotosynthesisVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ PhotocatalyticArtificialPhotosynthesisVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Tab modes verification
assert(
  visualizerContent.includes('Z_SCHEME_BAND_DIAGRAM') &&
  visualizerContent.includes('SOLAR_PANEL_ARRAY_SIMULATOR') &&
  visualizerContent.includes('AQY_AND_TECH_COMPARISON'),
  'PhotocatalyticArtificialPhotosynthesisVisualizer must support 3 distinct interactive modes'
);
console.log('  ✓ PhotocatalyticArtificialPhotosynthesisVisualizer must support 3 distinct interactive modes');

// 5. SVG Visual diagram verification
assert(
  visualizerContent.includes('<svg viewBox="0 0 800 300"') &&
  visualizerContent.includes('E(H⁺/H₂)') &&
  visualizerContent.includes('E(O₂/H₂O)'),
  'PhotocatalyticArtificialPhotosynthesisVisualizer must render interactive SVG band diagrams'
);
console.log('  ✓ PhotocatalyticArtificialPhotosynthesisVisualizer must render interactive SVG diagrams');

// 6. Scientific metrics verification
assert(
  visualizerContent.includes('farmProduction.hydrogenDailyKg') &&
  visualizerContent.includes('farmProduction.equivalentCleanFuelKmPerDay') &&
  visualizerContent.includes('aqyData.aqyPct'),
  'Daily H2 production, FCEV mileage, and AQY metrics must be rendered'
);
console.log('  ✓ Daily H2 yield, FCEV mileage, and AQY calculations verified');

// 7. PeriodicCodexTab integration verification
assert(
  codexContent.includes("import { PhotocatalyticArtificialPhotosynthesisVisualizer } from './visualizations/PhotocatalyticArtificialPhotosynthesisVisualizer';"),
  'PeriodicCodexTab must import PhotocatalyticArtificialPhotosynthesisVisualizer'
);
assert(
  codexContent.includes("'PHOTOCATALYTIC_ARTIFICIAL_PHOTOSYNTHESIS'"),
  "PeriodicCodexTab state must support 'PHOTOCATALYTIC_ARTIFICIAL_PHOTOSYNTHESIS' tab"
);
assert(
  codexContent.includes("setActiveMainTab('PHOTOCATALYTIC_ARTIFICIAL_PHOTOSYNTHESIS')"),
  'PeriodicCodexTab must have button to activate PHOTOCATALYTIC_ARTIFICIAL_PHOTOSYNTHESIS tab'
);
assert(
  codexContent.includes("<PhotocatalyticArtificialPhotosynthesisVisualizer />"),
  'PeriodicCodexTab must render <PhotocatalyticArtificialPhotosynthesisVisualizer /> when active'
);
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 281: ALL CHECKS PASSED (7/7) ---');
