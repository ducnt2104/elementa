// tests/test-thermoelectric-visualizer-ui.mjs
// Test Suite 241: Thermoelectric Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'ThermoelectricVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'thermoelectricEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 241: ThermoelectricVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'ThermoelectricVisualizer.tsx component file must exist');
  console.log('  ✓ ThermoelectricVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'thermoelectricEngine.ts domain engine file must exist');
  console.log('  ✓ thermoelectricEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('thermoelectricEngine') &&
    visContent.includes('calculateThermoelectricZt') &&
    visContent.includes('simulateTegWasteHeatRecovery') &&
    visContent.includes('simulatePeltierCooling'),
    'ThermoelectricVisualizer must import engine simulation functions'
  );
  console.log('  ✓ ThermoelectricVisualizer must import functions from thermoelectricEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'ThermoelectricVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ ThermoelectricVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'ZT_FIGURE_OF_MERIT'") &&
    visContent.includes("'WASTE_HEAT_HARVESTING'") &&
    visContent.includes("'PELTIER_SOLID_COOLING'"),
    'ThermoelectricVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ ThermoelectricVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 1, 'ThermoelectricVisualizer must render interactive SVG diagrams');
  console.log('  ✓ ThermoelectricVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(
    visContent.includes('Seebeck') && visContent.includes('Peltier'),
    'Must reference Seebeck and Peltier effects'
  );
  assert(
    visContent.includes('ZT') && visContent.includes('PGEC'),
    'Must reference figure of merit ZT and PGEC phonon scattering'
  );
  console.log('  ✓ ThermoelectricVisualizer must reference Seebeck, Peltier, ZT, and PGEC');

  // 7. Codex integration
  assert(
    codexContent.includes('ThermoelectricVisualizer'),
    'PeriodicCodexTab must import ThermoelectricVisualizer'
  );
  console.log('  ✓ PeriodicCodexTab must import ThermoelectricVisualizer');

  assert(
    codexContent.includes("'THERMOELECTRIC_ENERGY'"),
    "PeriodicCodexTab state union must include 'THERMOELECTRIC_ENERGY'"
  );
  console.log('  ✓ PeriodicCodexTab state union must include THERMOELECTRIC_ENERGY');

  assert(
    codexContent.includes("setActiveMainTab('THERMOELECTRIC_ENERGY')") &&
    (codexContent.includes('Nhiệt Điện (Seebeck & Peltier)') || codexContent.includes('Nhiệt Điện (Seebeck &amp; Peltier)')),
    'PeriodicCodexTab must provide a navigation button for Thermoelectric Energy'
  );
  console.log('  ✓ PeriodicCodexTab must provide a navigation button for Thermoelectric Energy');

  assert(
    codexContent.includes("activeMainTab === 'THERMOELECTRIC_ENERGY'") &&
    codexContent.includes('<ThermoelectricVisualizer />'),
    'PeriodicCodexTab must render ThermoelectricVisualizer when active'
  );
  console.log('  ✓ PeriodicCodexTab must render ThermoelectricVisualizer when active');

  console.log('\n======================================================================');
  console.log('   ALL 12 TESTS IN SUITE 241 PASSED AUDIT VERIFICATION!   ');
  console.log('======================================================================\n');
}

runAudit();
