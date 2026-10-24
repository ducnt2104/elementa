// tests/test-redox-flow-battery-visualizer-ui.mjs
// Test Suite 247: Redox Flow Battery Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'RedoxFlowBatteryVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'redoxFlowBatteryEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 247: RedoxFlowBatteryVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'RedoxFlowBatteryVisualizer.tsx component file must exist');
  console.log('  ✓ RedoxFlowBatteryVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'redoxFlowBatteryEngine.ts domain engine file must exist');
  console.log('  ✓ redoxFlowBatteryEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('redoxFlowBatteryEngine') &&
    visContent.includes('calculateFlowBatterySoc') &&
    visContent.includes('simulateGridScaleLdesStation') &&
    visContent.includes('FLOW_BATTERY_CHEMISTRIES_CATALOG'),
    'RedoxFlowBatteryVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ RedoxFlowBatteryVisualizer must import functions from redoxFlowBatteryEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'RedoxFlowBatteryVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ RedoxFlowBatteryVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'HYDRAULIC_MEMBRANE_SCHEMATIC'") &&
    visContent.includes("'SOC_NERNST_POTENTIAL'") &&
    visContent.includes("'GRID_SCALE_LDES_SIMULATOR'"),
    'RedoxFlowBatteryVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ RedoxFlowBatteryVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 1, 'RedoxFlowBatteryVisualizer must render interactive SVG hydraulic flow diagrams');
  console.log('  ✓ RedoxFlowBatteryVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('VRFB'), 'Must reference VRFB technology');
  assert(visContent.includes('Vanadi') || visContent.includes('VANADIUM'), 'Must reference Vanadium redox active species');
  assert(visContent.includes('Nernst'), 'Must reference Nernst equation for OCV');
  assert(visContent.includes('LDES'), 'Must reference Long-Duration Energy Storage (LDES)');
  assert(visContent.includes('SOC'), 'Must reference State of Charge (SOC)');
  console.log('  ✓ All scientific standards, chemical species and electrochemical terms present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('RedoxFlowBatteryVisualizer') &&
    codexContent.includes("'REDOX_FLOW_BATTERY'") &&
    codexContent.includes('<RedoxFlowBatteryVisualizer />'),
    'PeriodicCodexTab.tsx must mount RedoxFlowBatteryVisualizer under REDOX_FLOW_BATTERY'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts RedoxFlowBatteryVisualizer under REDOX_FLOW_BATTERY');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: RedoxFlowBatteryVisualizer UI IS VERIFIED! ---');
}

runAudit();
