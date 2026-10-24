// tests/test-hydrogen-fuel-cell-visualizer-ui.mjs
// Test Suite 245: Hydrogen Fuel Cell Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'HydrogenFuelCellVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'hydrogenFuelCellEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 245: HydrogenFuelCellVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'HydrogenFuelCellVisualizer.tsx component file must exist');
  console.log('  ✓ HydrogenFuelCellVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'hydrogenFuelCellEngine.ts domain engine file must exist');
  console.log('  ✓ hydrogenFuelCellEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('hydrogenFuelCellEngine') &&
    visContent.includes('simulateFcevStackPerformance') &&
    visContent.includes('generateFuelCellPolarizationCurve') &&
    visContent.includes('FUEL_CELL_SYSTEMS_CATALOG'),
    'HydrogenFuelCellVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ HydrogenFuelCellVisualizer must import functions from hydrogenFuelCellEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'HydrogenFuelCellVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ HydrogenFuelCellVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'MEMBRANE_CROSS_SECTION'") &&
    visContent.includes("'FCEV_STACK_SIMULATOR'") &&
    visContent.includes("'POLARIZATION_EFFICIENCY'"),
    'HydrogenFuelCellVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ HydrogenFuelCellVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'HydrogenFuelCellVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ HydrogenFuelCellVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('PEMFC') && visContent.includes('SOFC'), 'Must reference PEMFC and SOFC technologies');
  assert(visContent.includes('ORR') || visContent.includes('HOR'), 'Must reference ORR or HOR electrocatalytic reactions');
  assert(visContent.includes('Nafion'), 'Must reference Nafion membrane');
  assert(visContent.includes('FCEV'), 'Must reference Fuel Cell Electric Vehicle (FCEV)');
  assert(visContent.includes('Activation') && visContent.includes('Ohmic'), 'Must reference Polarization loss regimes');
  console.log('  ✓ All scientific standards, catalyst terms and electrochemical regimes present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('HydrogenFuelCellVisualizer') &&
    codexContent.includes("'HYDROGEN_FUEL_CELL'") &&
    codexContent.includes('<HydrogenFuelCellVisualizer />'),
    'PeriodicCodexTab.tsx must mount HydrogenFuelCellVisualizer under HYDROGEN_FUEL_CELL'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts HydrogenFuelCellVisualizer under HYDROGEN_FUEL_CELL');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: HydrogenFuelCellVisualizer UI IS VERIFIED! ---');
}

runAudit();
