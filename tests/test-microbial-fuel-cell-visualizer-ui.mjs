// tests/test-microbial-fuel-cell-visualizer-ui.mjs
// Test Suite 243: Microbial Fuel Cell Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'MicrobialFuelCellVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'microbialFuelCellEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 243: MicrobialFuelCellVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'MicrobialFuelCellVisualizer.tsx component file must exist');
  console.log('  ✓ MicrobialFuelCellVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'microbialFuelCellEngine.ts domain engine file must exist');
  console.log('  ✓ microbialFuelCellEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('microbialFuelCellEngine') &&
    visContent.includes('simulateWastewaterMfc') &&
    visContent.includes('generateMfcPolarizationCurve') &&
    visContent.includes('EXOELECTROGENS_CATALOG'),
    'MicrobialFuelCellVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ MicrobialFuelCellVisualizer must import functions from microbialFuelCellEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'MicrobialFuelCellVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ MicrobialFuelCellVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'EET_MECHANISMS'") &&
    visContent.includes("'WASTEWATER_REMEDIATION'") &&
    visContent.includes("'POLARIZATION_CURVES'"),
    'MicrobialFuelCellVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ MicrobialFuelCellVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'MicrobialFuelCellVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ MicrobialFuelCellVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('QCVN 40:2011/BTNMT'), 'Must reference QCVN 40:2011/BTNMT wastewater discharge standards');
  assert(visContent.includes('Geobacter') || visContent.includes('GEOBACTER'), 'Must reference Geobacter species');
  assert(visContent.includes('Shewanella') || visContent.includes('SHEWANELLA'), 'Must reference Shewanella species');
  assert(visContent.includes('COD'), 'Must reference Chemical Oxygen Demand (COD)');
  assert(visContent.includes('Coulombic'), 'Must reference Coulombic Efficiency');
  assert(visContent.includes('Activation') && visContent.includes('Ohmic'), 'Must reference Polarization loss regimes');
  console.log('  ✓ All scientific standards, species and electrochemical terms present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('MicrobialFuelCellVisualizer') &&
    codexContent.includes("'MICROBIAL_FUEL_CELL'") &&
    codexContent.includes('<MicrobialFuelCellVisualizer />'),
    'PeriodicCodexTab.tsx must mount MicrobialFuelCellVisualizer under MICROBIAL_FUEL_CELL'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts MicrobialFuelCellVisualizer under MICROBIAL_FUEL_CELL');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: MicrobialFuelCellVisualizer UI IS VERIFIED! ---');
}

runAudit();
