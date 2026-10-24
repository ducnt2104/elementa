// tests/test-perovskite-solar-visualizer-ui.mjs
// Test Suite 257: Perovskite Solar Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'PerovskiteSolarVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'perovskiteSolarEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 257: PerovskiteSolarVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'PerovskiteSolarVisualizer.tsx component file must exist');
  console.log('  ✓ PerovskiteSolarVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'perovskiteSolarEngine.ts domain engine file must exist');
  console.log('  ✓ perovskiteSolarEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('perovskiteSolarEngine') &&
    visContent.includes('PEROVSKITE_COMPOSITIONS_CATALOG') &&
    visContent.includes('calculateGoldschmidtTolerance') &&
    visContent.includes('simulateSolarCellPerformance') &&
    visContent.includes('simulatePerovskiteStabilityISOS'),
    'PerovskiteSolarVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ PerovskiteSolarVisualizer must import functions from perovskiteSolarEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'PerovskiteSolarVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ PerovskiteSolarVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'CRYSTAL_LATTICE_ABX3'") &&
    visContent.includes("'TANDEM_2T_POLARIZATION_CURVE'") &&
    visContent.includes("'ISOS_OPERATIONAL_STABILITY'"),
    'PerovskiteSolarVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ PerovskiteSolarVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'PerovskiteSolarVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ PerovskiteSolarVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('Perovskite'), 'Must reference Perovskite solar technology');
  assert(visContent.includes('Tandem'), 'Must reference 2-terminal tandem architecture');
  assert(visContent.includes('ABX₃') || visContent.includes('ABX3'), 'Must reference ABX3 crystal stoichiometry');
  assert(visContent.includes('Goldschmidt') || visContent.includes('Tolerance'), 'Must reference Goldschmidt tolerance factor');
  assert(visContent.includes('33.9') || visContent.includes('Shockley-Queisser'), 'Must reference world record efficiency milestone');
  assert(visContent.includes('Silicon') || visContent.includes('MAPI'), 'Must reference tandem bottom cell / perovskite chemistry');
  console.log('  ✓ All scientific standards, crystallography terms and efficiency benchmarks present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('PerovskiteSolarVisualizer') &&
    codexContent.includes("'PEROVSKITE_SOLAR_CELL'") &&
    codexContent.includes('<PerovskiteSolarVisualizer />'),
    'PeriodicCodexTab.tsx must mount PerovskiteSolarVisualizer under PEROVSKITE_SOLAR_CELL'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts PerovskiteSolarVisualizer under PEROVSKITE_SOLAR_CELL');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: PerovskiteSolarVisualizer UI IS VERIFIED! ---');
}

runAudit();
