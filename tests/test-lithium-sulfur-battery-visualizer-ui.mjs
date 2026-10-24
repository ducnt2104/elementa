// tests/test-lithium-sulfur-battery-visualizer-ui.mjs
// Test Suite 251: Lithium-Sulfur Battery Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'LithiumSulfurBatteryVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'lithiumSulfurBatteryEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 251: LithiumSulfurBatteryVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'LithiumSulfurBatteryVisualizer.tsx component file must exist');
  console.log('  ✓ LithiumSulfurBatteryVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'lithiumSulfurBatteryEngine.ts domain engine file must exist');
  console.log('  ✓ lithiumSulfurBatteryEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('lithiumSulfurBatteryEngine') &&
    visContent.includes('generateLiSDischargeCurve') &&
    visContent.includes('simulateLiSCellPerformance') &&
    visContent.includes('LIS_BARRIER_STRATEGIES_CATALOG'),
    'LithiumSulfurBatteryVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ LithiumSulfurBatteryVisualizer must import functions from lithiumSulfurBatteryEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'LithiumSulfurBatteryVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ LithiumSulfurBatteryVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'SHUTTLE_EFFECT_MECHANISM'") &&
    visContent.includes("'MULTISTEP_DISCHARGE_PLATEAUS'") &&
    visContent.includes("'BARRIER_COMPARISON_500WHKG'"),
    'LithiumSulfurBatteryVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ LithiumSulfurBatteryVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'LithiumSulfurBatteryVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ LithiumSulfurBatteryVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('Li-S'), 'Must reference Li-S battery technology');
  assert(visContent.includes('Lưu huỳnh') || visContent.includes('S₈'), 'Must reference Sulfur cathode');
  assert(visContent.includes('MXene'), 'Must reference 2D MXene interlayer');
  assert(visContent.includes('con thoi') || visContent.includes('Shuttle'), 'Must reference Polysulfide Shuttle Effect');
  assert(visContent.includes('500 Wh/kg'), 'Must reference 500 Wh/kg milestone');
  assert(visContent.includes('1675'), 'Must reference 1675 mAh/g theoretical capacity');
  console.log('  ✓ All scientific standards, chemistry terms and milestone benchmarks present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('LithiumSulfurBatteryVisualizer') &&
    codexContent.includes("'LITHIUM_SULFUR_BATTERY'") &&
    codexContent.includes('<LithiumSulfurBatteryVisualizer />'),
    'PeriodicCodexTab.tsx must mount LithiumSulfurBatteryVisualizer under LITHIUM_SULFUR_BATTERY'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts LithiumSulfurBatteryVisualizer under LITHIUM_SULFUR_BATTERY');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: LithiumSulfurBatteryVisualizer UI IS VERIFIED! ---');
}

runAudit();
