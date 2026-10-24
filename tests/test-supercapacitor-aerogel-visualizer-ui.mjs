// tests/test-supercapacitor-aerogel-visualizer-ui.mjs
// Test Suite 235: Supercapacitor & Aerogel Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'SupercapacitorAerogelVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'supercapacitorAerogelEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 235: SupercapacitorAerogelVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'SupercapacitorAerogelVisualizer.tsx component file must exist');
  console.log('  ✓ SupercapacitorAerogelVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'supercapacitorAerogelEngine.ts domain engine file must exist');
  console.log('  ✓ supercapacitorAerogelEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('supercapacitorAerogelEngine') &&
    visContent.includes('calculateSupercapacitorCellMetrics') &&
    visContent.includes('simulateCyclicVoltammetry') &&
    visContent.includes('simulateGrapheneAerogelFreezeDrying'),
    'SupercapacitorAerogelVisualizer must import engine simulation functions'
  );
  console.log('  ✓ SupercapacitorAerogelVisualizer must import functions from supercapacitorAerogelEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'SupercapacitorAerogelVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ SupercapacitorAerogelVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'CELL_METRICS_CV'") &&
    visContent.includes("'RAGONE_PLOT'") &&
    visContent.includes("'AEROGEL_SYNTHESIS'"),
    'SupercapacitorAerogelVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ SupercapacitorAerogelVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 3, 'SupercapacitorAerogelVisualizer must render at least 3 interactive SVG plots');
  console.log('  ✓ SupercapacitorAerogelVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(
    visContent.includes('Cyclic Voltammogram') || visContent.includes('Vôn-Ampe'),
    'Must reference Cyclic Voltammetry'
  );
  assert(
    visContent.includes('Ragone') && visContent.includes('Wh/kg') && visContent.includes('W/kg'),
    'Must display Ragone energy vs power density'
  );
  assert(
    visContent.includes('Ice-Templating') || visContent.includes('đông khô') || visContent.includes('Đông Khô'),
    'Must reference ice-templating freeze drying'
  );
  console.log('  ✓ SupercapacitorAerogelVisualizer must reference CV, Ragone Plot, and Aerogel Ice-Templating');

  // 7. Codex integration
  assert(
    codexContent.includes('SupercapacitorAerogelVisualizer'),
    'PeriodicCodexTab must import SupercapacitorAerogelVisualizer'
  );
  console.log('  ✓ PeriodicCodexTab must import SupercapacitorAerogelVisualizer');

  assert(
    codexContent.includes("'SUPERCAPACITOR_AEROGEL'"),
    "PeriodicCodexTab state union must include 'SUPERCAPACITOR_AEROGEL'"
  );
  console.log('  ✓ PeriodicCodexTab state union must include SUPERCAPACITOR_AEROGEL');

  assert(
    codexContent.includes("setActiveMainTab('SUPERCAPACITOR_AEROGEL')") &&
    (codexContent.includes('Siêu Tụ Điện & Khí Gel Graphene') || codexContent.includes('Siêu Tụ Điện &amp; Khí Gel Graphene')),
    'PeriodicCodexTab must provide a navigation button for Supercapacitor Aerogel'
  );
  console.log('  ✓ PeriodicCodexTab must provide a navigation button for Supercapacitor Aerogel');

  assert(
    codexContent.includes("activeMainTab === 'SUPERCAPACITOR_AEROGEL'") &&
    codexContent.includes('<SupercapacitorAerogelVisualizer />'),
    'PeriodicCodexTab must render SupercapacitorAerogelVisualizer when active'
  );
  console.log('  ✓ PeriodicCodexTab must render SupercapacitorAerogelVisualizer when active');

  console.log('\n======================================================================');
  console.log('   ALL 12 TESTS IN SUITE 235 PASSED AUDIT VERIFICATION!   ');
  console.log('======================================================================\n');
}

runAudit();
