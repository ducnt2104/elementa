// tests/test-nanogenerator-energy-visualizer-ui.mjs
// Test Suite 239: Nanogenerator Energy Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'NanogeneratorEnergyVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'nanogeneratorEnergyEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 239: NanogeneratorEnergyVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'NanogeneratorEnergyVisualizer.tsx component file must exist');
  console.log('  ✓ NanogeneratorEnergyVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'nanogeneratorEnergyEngine.ts domain engine file must exist');
  console.log('  ✓ nanogeneratorEnergyEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('nanogeneratorEnergyEngine') &&
    visContent.includes('calculatePengOutput') &&
    visContent.includes('calculateTengOutput') &&
    visContent.includes('simulatePmuStorageCharging'),
    'NanogeneratorEnergyVisualizer must import engine simulation functions'
  );
  console.log('  ✓ NanogeneratorEnergyVisualizer must import functions from nanogeneratorEnergyEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'NanogeneratorEnergyVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ NanogeneratorEnergyVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'PENG_PIEZOELECTRIC'") &&
    visContent.includes("'TENG_TRIBOELECTRIC'") &&
    visContent.includes("'PMU_IOT_SELF_POWERED'"),
    'NanogeneratorEnergyVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ NanogeneratorEnergyVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 3, 'NanogeneratorEnergyVisualizer must render interactive SVG plots');
  console.log('  ✓ NanogeneratorEnergyVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(
    visContent.includes('d₃₃') || visContent.includes('d33'),
    'Must reference piezoelectric coefficient d33'
  );
  assert(
    visContent.includes('Maxwell') || visContent.includes('dòng dịch chuyển'),
    'Must reference Maxwell displacement current'
  );
  assert(
    visContent.includes('BLE') || visContent.includes('IoT'),
    'Must display self-powered IoT BLE sensor node'
  );
  console.log('  ✓ NanogeneratorEnergyVisualizer must reference d33, Maxwell displacement current, and BLE IoT');

  // 7. Codex integration
  assert(
    codexContent.includes('NanogeneratorEnergyVisualizer'),
    'PeriodicCodexTab must import NanogeneratorEnergyVisualizer'
  );
  console.log('  ✓ PeriodicCodexTab must import NanogeneratorEnergyVisualizer');

  assert(
    codexContent.includes("'NANOGENERATOR_PENG_TENG'"),
    "PeriodicCodexTab state union must include 'NANOGENERATOR_PENG_TENG'"
  );
  console.log('  ✓ PeriodicCodexTab state union must include NANOGENERATOR_PENG_TENG');

  assert(
    codexContent.includes("setActiveMainTab('NANOGENERATOR_PENG_TENG')") &&
    (codexContent.includes('Máy Phát Điện Nano (PENG & TENG)') || codexContent.includes('Máy Phát Điện Nano (PENG &amp; TENG)')),
    'PeriodicCodexTab must provide a navigation button for Nanogenerators'
  );
  console.log('  ✓ PeriodicCodexTab must provide a navigation button for Nanogenerators');

  assert(
    codexContent.includes("activeMainTab === 'NANOGENERATOR_PENG_TENG'") &&
    codexContent.includes('<NanogeneratorEnergyVisualizer />'),
    'PeriodicCodexTab must render NanogeneratorEnergyVisualizer when active'
  );
  console.log('  ✓ PeriodicCodexTab must render NanogeneratorEnergyVisualizer when active');

  console.log('\n======================================================================');
  console.log('   ALL 12 TESTS IN SUITE 239 PASSED AUDIT VERIFICATION!   ');
  console.log('======================================================================\n');
}

runAudit();
