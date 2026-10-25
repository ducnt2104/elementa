// tests/test-smes-cryogenic-visualizer-ui.mjs
// Test Suite 287: SMES Cryogenic Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 287: SmesCryogenicVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/SmesCryogenicVisualizer.tsx');
const enginePath = path.resolve('src/domain/smesCryogenicEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'SmesCryogenicVisualizer.tsx component file must exist');
console.log('  ✓ SmesCryogenicVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'smesCryogenicEngine.ts domain engine file must exist');
console.log('  ✓ smesCryogenicEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('SUPERCONDUCTOR_CATALOG') &&
  visualizerContent.includes('CRYOGEN_COOLANT_CATALOG') &&
  visualizerContent.includes('calculateSmesPerformance') &&
  visualizerContent.includes('calculateLh2CryoSynergy') &&
  visualizerContent.includes('evaluateQuenchProtection'),
  'SmesCryogenicVisualizer must import engine functions and catalogs'
);
console.log('  ✓ SmesCryogenicVisualizer must import functions from smesCryogenicEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'SmesCryogenicVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ SmesCryogenicVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Tab modes verification
assert(
  visualizerContent.includes('SMES_COIL_AND_MAGNETIC_ENERGY') &&
  visualizerContent.includes('LH2_CRYO_ENERGY_HUB_SYNERGY') &&
  visualizerContent.includes('QUENCH_DYNAMICS_AND_STORAGE_BENCHMARK'),
  'SmesCryogenicVisualizer must support 3 distinct interactive modes'
);
console.log('  ✓ SmesCryogenicVisualizer must support 3 distinct interactive modes');

// 5. SVG Visual diagram verification
assert(
  visualizerContent.includes('<svg viewBox="0 0 840 280"') &&
  visualizerContent.includes('Bình Cryostat Chân Không Cách Nhiệt') &&
  visualizerContent.includes('Vành Đai Sợi Carbon Siêu Bền'),
  'SmesCryogenicVisualizer must render interactive SVG coil and flux diagrams'
);
console.log('  ✓ SmesCryogenicVisualizer must render interactive SVG diagrams');

// 6. Scientific metrics verification
assert(
  visualizerContent.includes('smesPerf.storedEnergyMegaJoules') &&
  visualizerContent.includes('smesPerf.magneticEnergyDensityMjPerM3') &&
  visualizerContent.includes('synergy.cryogenicPowerSavedKw') &&
  visualizerContent.includes('quench.peakDumpVoltageVolts'),
  'Stored energy MJ, magnetic energy density, cryo power saved, and dump voltage must be rendered'
);
console.log('  ✓ Stored energy, energy density, cryo synergy, and quench metrics verified');

// 7. PeriodicCodexTab integration verification
assert(
  codexContent.includes("import { SmesCryogenicVisualizer } from './visualizations/SmesCryogenicVisualizer';"),
  'PeriodicCodexTab must import SmesCryogenicVisualizer'
);
assert(
  codexContent.includes("'SMES_CRYOGENIC_STORAGE'"),
  "PeriodicCodexTab state must support 'SMES_CRYOGENIC_STORAGE' tab"
);
assert(
  codexContent.includes("setActiveMainTab('SMES_CRYOGENIC_STORAGE')"),
  'PeriodicCodexTab must have button to activate SMES_CRYOGENIC_STORAGE tab'
);
assert(
  codexContent.includes("<SmesCryogenicVisualizer />"),
  'PeriodicCodexTab must render <SmesCryogenicVisualizer /> when active'
);
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 287: ALL CHECKS PASSED (7/7) ---');
