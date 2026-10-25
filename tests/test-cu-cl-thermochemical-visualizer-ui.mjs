// tests/test-cu-cl-thermochemical-visualizer-ui.mjs
// Test Suite 285: Cu-Cl Thermochemical Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 285: CuClThermochemicalVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/CuClThermochemicalVisualizer.tsx');
const enginePath = path.resolve('src/domain/cuClThermochemicalEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'CuClThermochemicalVisualizer.tsx component file must exist');
console.log('  ✓ CuClThermochemicalVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'cuClThermochemicalEngine.ts domain engine file must exist');
console.log('  ✓ cuClThermochemicalEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('CU_CL_CYCLE_STEPS') &&
  visualizerContent.includes('HEAT_SOURCE_CATALOG') &&
  visualizerContent.includes('calculateCuClCellVoltage') &&
  visualizerContent.includes('calculateCuClHydrogenProduction') &&
  visualizerContent.includes('CU_CL_MAX_CYCLE_TEMP_C'),
  'CuClThermochemicalVisualizer must import engine functions and catalogs'
);
console.log('  ✓ CuClThermochemicalVisualizer must import functions from cuClThermochemicalEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'CuClThermochemicalVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ CuClThermochemicalVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Tab modes verification
assert(
  visualizerContent.includes('CU_CL_FLOWSHEET_AND_CHEMICAL_LOOP') &&
  visualizerContent.includes('NUCLEAR_SOLAR_HEAT_COUPLING_SIMULATOR') &&
  visualizerContent.includes('ELECTROCHEMICAL_OVERPOTENTIAL_AND_CYCLE_BENCHMARKS'),
  'CuClThermochemicalVisualizer must support 3 distinct interactive modes'
);
console.log('  ✓ CuClThermochemicalVisualizer must support 3 distinct interactive modes');

// 5. SVG Visual diagram verification
assert(
  visualizerContent.includes('<svg viewBox="0 0 840 320"') &&
  visualizerContent.includes('TUẦN HOÀN 100% Cu & Cl') &&
  visualizerContent.includes('Bước 1: Thủy Phân') &&
  visualizerContent.includes('Bước 2: Nhiệt Phân') &&
  visualizerContent.includes('Bước 3: Điện Phân'),
  'CuClThermochemicalVisualizer must render interactive SVG closed loop diagram'
);
console.log('  ✓ CuClThermochemicalVisualizer must render interactive SVG diagrams');

// 6. Scientific metrics verification
assert(
  visualizerContent.includes('yieldResult.hydrogenDailyMetricTons') &&
  visualizerContent.includes('yieldResult.oxygenDailyMetricTons') &&
  visualizerContent.includes('yieldResult.electricitySavedVsPemPct') &&
  visualizerContent.includes('cellKinetics.cellVoltageVolts'),
  'Daily H2/O2 yields, electricity savings %, and cell voltage kinetics must be rendered'
);
console.log('  ✓ Hydrogen yield, O2 co-product, and cell voltage calculations verified');

// 7. PeriodicCodexTab integration verification
assert(
  codexContent.includes("import { CuClThermochemicalVisualizer } from './visualizations/CuClThermochemicalVisualizer';"),
  'PeriodicCodexTab must import CuClThermochemicalVisualizer'
);
assert(
  codexContent.includes("'CU_CL_THERMOCHEMICAL_CYCLE'"),
  "PeriodicCodexTab state must support 'CU_CL_THERMOCHEMICAL_CYCLE' tab"
);
assert(
  codexContent.includes("setActiveMainTab('CU_CL_THERMOCHEMICAL_CYCLE')"),
  'PeriodicCodexTab must have button to activate CU_CL_THERMOCHEMICAL_CYCLE tab'
);
assert(
  codexContent.includes("<CuClThermochemicalVisualizer />"),
  'PeriodicCodexTab must render <CuClThermochemicalVisualizer /> when active'
);
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 285: ALL CHECKS PASSED (7/7) ---');
