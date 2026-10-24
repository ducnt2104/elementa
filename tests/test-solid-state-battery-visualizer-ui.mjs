// tests/test-solid-state-battery-visualizer-ui.mjs
// Test Suite 237: Solid-State Battery Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'SolidStateBatteryVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'solidStateBatteryEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 237: SolidStateBatteryVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'SolidStateBatteryVisualizer.tsx component file must exist');
  console.log('  ✓ SolidStateBatteryVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'solidStateBatteryEngine.ts domain engine file must exist');
  console.log('  ✓ solidStateBatteryEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('solidStateBatteryEngine') &&
    visContent.includes('calculateArrheniusConductivity') &&
    visContent.includes('evaluateLithiumDendriteRisk') &&
    visContent.includes('simulateSolidStateBatteryCell'),
    'SolidStateBatteryVisualizer must import engine simulation functions'
  );
  console.log('  ✓ SolidStateBatteryVisualizer must import functions from solidStateBatteryEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'SolidStateBatteryVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ SolidStateBatteryVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'IONIC_CONDUCTION_ARRHENIUS'") &&
    visContent.includes("'DENDRITE_PREVENTION'") &&
    visContent.includes("'ASSB_CELL_PERFORMANCE'"),
    'SolidStateBatteryVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ SolidStateBatteryVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'SolidStateBatteryVisualizer must render interactive SVG plots');
  console.log('  ✓ SolidStateBatteryVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(
    visContent.includes('Monroe-Newman') || visContent.includes('Tiêu chuẩn Monroe-Newman'),
    'Must reference Monroe-Newman criterion'
  );
  assert(
    visContent.includes('Arrhenius') && visContent.includes('E_a'),
    'Must reference Arrhenius ionic conduction'
  );
  assert(
    visContent.includes('CCD') || visContent.includes('Dòng tới hạn'),
    'Must display Critical Current Density'
  );
  console.log('  ✓ SolidStateBatteryVisualizer must reference Monroe-Newman, Arrhenius, and CCD');

  // 7. Codex integration
  assert(
    codexContent.includes('SolidStateBatteryVisualizer'),
    'PeriodicCodexTab must import SolidStateBatteryVisualizer'
  );
  console.log('  ✓ PeriodicCodexTab must import SolidStateBatteryVisualizer');

  assert(
    codexContent.includes("'SOLID_STATE_BATTERY'"),
    "PeriodicCodexTab state union must include 'SOLID_STATE_BATTERY'"
  );
  console.log('  ✓ PeriodicCodexTab state union must include SOLID_STATE_BATTERY');

  assert(
    codexContent.includes("setActiveMainTab('SOLID_STATE_BATTERY')") &&
    codexContent.includes('Pin Toàn Rắn (ASSB)'),
    'PeriodicCodexTab must provide a navigation button for Solid State Battery'
  );
  console.log('  ✓ PeriodicCodexTab must provide a navigation button for Solid State Battery');

  assert(
    codexContent.includes("activeMainTab === 'SOLID_STATE_BATTERY'") &&
    codexContent.includes('<SolidStateBatteryVisualizer />'),
    'PeriodicCodexTab must render SolidStateBatteryVisualizer when active'
  );
  console.log('  ✓ PeriodicCodexTab must render SolidStateBatteryVisualizer when active');

  console.log('\n======================================================================');
  console.log('   ALL 12 TESTS IN SUITE 237 PASSED AUDIT VERIFICATION!   ');
  console.log('======================================================================\n');
}

runAudit();
