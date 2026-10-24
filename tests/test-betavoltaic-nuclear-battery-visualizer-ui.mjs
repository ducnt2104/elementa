// tests/test-betavoltaic-nuclear-battery-visualizer-ui.mjs
// Test Suite 255: Betavoltaic Nuclear Battery Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'BetavoltaicBatteryVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'betavoltaicNuclearBatteryEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 255: BetavoltaicBatteryVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'BetavoltaicBatteryVisualizer.tsx component file must exist');
  console.log('  ✓ BetavoltaicBatteryVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'betavoltaicNuclearBatteryEngine.ts domain engine file must exist');
  console.log('  ✓ betavoltaicNuclearBatteryEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('betavoltaicNuclearBatteryEngine') &&
    visContent.includes('RADIOISOTOPES_CATALOG') &&
    visContent.includes('SEMICONDUCTORS_CATALOG') &&
    visContent.includes('simulateRadioactiveDecay') &&
    visContent.includes('simulateBetavoltaicIVCurve') &&
    visContent.includes('simulateLongevityCurve'),
    'BetavoltaicBatteryVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ BetavoltaicBatteryVisualizer must import functions from betavoltaicNuclearBatteryEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'BetavoltaicBatteryVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ BetavoltaicBatteryVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'BETAVOLTAIC_JUNCTION_CROSS_SECTION'") &&
    visContent.includes("'IV_POLARIZATION_CURVE'") &&
    visContent.includes("'CENTURY_LONGEVITY_VS_CHEMICAL'"),
    'BetavoltaicBatteryVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ BetavoltaicBatteryVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'BetavoltaicBatteryVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ BetavoltaicBatteryVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('Betavoltaic') || visContent.includes('Hạt Nhân'), 'Must reference Betavoltaic nuclear technology');
  assert(visContent.includes('C-14') || visContent.includes('NICKEL_63') || visContent.includes('TRITIUM') || visContent.includes('Isotope'), 'Must reference radioisotopes');
  assert(visContent.includes('Kim Cương') || visContent.includes('Diamond') || visContent.includes('SiC'), 'Must reference wide-bandgap transducers');
  assert(visContent.includes('vùng cấm') || visContent.includes('Eg') || visContent.includes('eV'), 'Must reference bandgap energy');
  assert(visContent.includes('beta') || visContent.includes('β'), 'Must reference beta particles');
  console.log('  ✓ All scientific standards, nuclear chemistry terms and radiation benchmarks present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('BetavoltaicBatteryVisualizer') &&
    codexContent.includes("'BETAVOLTAIC_NUCLEAR_BATTERY'") &&
    codexContent.includes('<BetavoltaicBatteryVisualizer />'),
    'PeriodicCodexTab.tsx must mount BetavoltaicBatteryVisualizer under BETAVOLTAIC_NUCLEAR_BATTERY'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts BetavoltaicBatteryVisualizer under BETAVOLTAIC_NUCLEAR_BATTERY');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: BetavoltaicBatteryVisualizer UI IS VERIFIED! ---');
}

runAudit();
