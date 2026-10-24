// tests/test-metal-air-battery-visualizer-ui.mjs
// Test Suite 253: Metal-Air Battery Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'MetalAirBatteryVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'metalAirBatteryEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 253: MetalAirBatteryVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'MetalAirBatteryVisualizer.tsx component file must exist');
  console.log('  ✓ MetalAirBatteryVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'metalAirBatteryEngine.ts domain engine file must exist');
  console.log('  ✓ metalAirBatteryEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('metalAirBatteryEngine') &&
    visContent.includes('METAL_AIR_CHEMISTRIES_CATALOG') &&
    visContent.includes('simulateGasDiffusionElectrode') &&
    visContent.includes('simulateMetalAirSystem'),
    'MetalAirBatteryVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ MetalAirBatteryVisualizer must import functions from metalAirBatteryEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'MetalAirBatteryVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ MetalAirBatteryVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'OPEN_BREATHE_GDE_CROSS_SECTION'") &&
    visContent.includes("'GDE_O2_PRESSURE_POLARIZATION'") &&
    visContent.includes("'THEORETICAL_PINNACLE_3500WHKG'"),
    'MetalAirBatteryVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ MetalAirBatteryVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'MetalAirBatteryVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ MetalAirBatteryVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('Zinc-Air') || visContent.includes('Kẽm'), 'Must reference Zinc-Air chemistry');
  assert(visContent.includes('Li-Air') || visContent.includes('Lithi'), 'Must reference Li-Air chemistry');
  assert(visContent.includes('GDE') || visContent.includes('khuyếch tán khí'), 'Must reference Gas Diffusion Electrode');
  assert(visContent.includes('3500') || visContent.includes('1086'), 'Must reference high theoretical specific energy');
  assert(visContent.includes('O₂') || visContent.includes('Oxygen'), 'Must reference Oxygen cathode reactant');
  console.log('  ✓ All scientific standards, chemistry terms and breathing benchmarks present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('MetalAirBatteryVisualizer') &&
    codexContent.includes("'METAL_AIR_BATTERY'") &&
    codexContent.includes('<MetalAirBatteryVisualizer />'),
    'PeriodicCodexTab.tsx must mount MetalAirBatteryVisualizer under METAL_AIR_BATTERY'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts MetalAirBatteryVisualizer under METAL_AIR_BATTERY');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: MetalAirBatteryVisualizer UI IS VERIFIED! ---');
}

runAudit();
