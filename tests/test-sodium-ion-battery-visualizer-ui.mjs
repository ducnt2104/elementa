// tests/test-sodium-ion-battery-visualizer-ui.mjs
// Test Suite 249: Sodium-Ion Battery Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'SodiumIonBatteryVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'sodiumIonBatteryEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 249: SodiumIonBatteryVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'SodiumIonBatteryVisualizer.tsx component file must exist');
  console.log('  ✓ SodiumIonBatteryVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'sodiumIonBatteryEngine.ts domain engine file must exist');
  console.log('  ✓ sodiumIonBatteryEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('sodiumIonBatteryEngine') &&
    visContent.includes('compareNaIonVsLiIon') &&
    visContent.includes('generateHardCarbonDischargeCurve') &&
    visContent.includes('NA_ION_CATHODES_CATALOG') &&
    visContent.includes('HARD_CARBON_ANODES_CATALOG'),
    'SodiumIonBatteryVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ SodiumIonBatteryVisualizer must import functions from sodiumIonBatteryEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'SodiumIonBatteryVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ SodiumIonBatteryVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'LATTICE_DUAL_ALUMINUM'") &&
    visContent.includes("'SLOPE_PLATEAU_PROFILE'") &&
    visContent.includes("'LOW_TEMP_ZERO_VOLT_SAFETY'"),
    'SodiumIonBatteryVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ SodiumIonBatteryVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'SodiumIonBatteryVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ SodiumIonBatteryVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('Na-ion'), 'Must reference Na-ion technology');
  assert(visContent.includes('Hard Carbon') || visContent.includes('Carbon Cứng'), 'Must reference Hard Carbon');
  assert(visContent.includes('Prussian Blue') || visContent.includes('PBA'), 'Must reference Prussian Blue Analogues');
  assert(visContent.includes('Nhôm') || visContent.includes('Aluminum'), 'Must reference Aluminum dual current collectors');
  assert(visContent.includes('0V') || visContent.includes('0.0 V') || visContent.includes('0.00 V'), 'Must reference Zero-Volt safety');
  console.log('  ✓ All scientific standards, materials terms and safety mechanisms present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('SodiumIonBatteryVisualizer') &&
    codexContent.includes("'SODIUM_ION_BATTERY'") &&
    codexContent.includes('<SodiumIonBatteryVisualizer />'),
    'PeriodicCodexTab.tsx must mount SodiumIonBatteryVisualizer under SODIUM_ION_BATTERY'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts SodiumIonBatteryVisualizer under SODIUM_ION_BATTERY');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: SodiumIonBatteryVisualizer UI IS VERIFIED! ---');
}

runAudit();
