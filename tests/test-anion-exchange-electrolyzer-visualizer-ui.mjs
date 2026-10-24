// tests/test-anion-exchange-electrolyzer-visualizer-ui.mjs
// Test Suite 261: Anion Exchange Electrolyzer Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'AnionExchangeElectrolyzerVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'anionExchangeElectrolyzerEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 261: AnionExchangeElectrolyzerVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'AnionExchangeElectrolyzerVisualizer.tsx component file must exist');
  console.log('  ✓ AnionExchangeElectrolyzerVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'anionExchangeElectrolyzerEngine.ts domain engine file must exist');
  console.log('  ✓ anionExchangeElectrolyzerEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('anionExchangeElectrolyzerEngine') &&
    visContent.includes('ELECTROLYZER_TECHNOLOGIES_CATALOG') &&
    visContent.includes('simulateElectrolyzerPolarization') &&
    visContent.includes('simulateAEMWEPerformance'),
    'AnionExchangeElectrolyzerVisualizer must import engine simulation functions and catalogs'
  );
  console.log('  ✓ AnionExchangeElectrolyzerVisualizer must import functions from anionExchangeElectrolyzerEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'AnionExchangeElectrolyzerVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ AnionExchangeElectrolyzerVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'AEM_CELL_CROSS_SECTION_OH_HOPPING'") &&
    visContent.includes("'POLARIZATION_OVERPOTENTIALS'") &&
    visContent.includes("'TERAWATT_SCALING_AND_LCOH'"),
    'AnionExchangeElectrolyzerVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ AnionExchangeElectrolyzerVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'AnionExchangeElectrolyzerVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ AnionExchangeElectrolyzerVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('AEMWE') || visContent.includes('Màng Trao Đổi Anion'), 'Must reference AEMWE technology');
  assert(visContent.includes('PGM-Free') || visContent.includes('NiFe-LDH'), 'Must reference PGM-Free NiFe catalysts');
  assert(visContent.includes('OH⁻') || visContent.includes('OH-'), 'Must reference hydroxide ion hopping');
  assert(visContent.includes('LCOH') || visContent.includes('Chi Phí Quy Dẫn'), 'Must reference LCOH economics');
  assert(visContent.includes('PiperION') || visContent.includes('Sustainion'), 'Must reference commercial AEM membranes');
  assert(visContent.includes('Terawatt'), 'Must reference Terawatt scalability');
  console.log('  ✓ All scientific standards, AEM electrochemistry terms and green hydrogen benchmarks present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('AnionExchangeElectrolyzerVisualizer') &&
    codexContent.includes("'ANION_EXCHANGE_ELECTROLYZER'") &&
    codexContent.includes('<AnionExchangeElectrolyzerVisualizer />'),
    'PeriodicCodexTab.tsx must mount AnionExchangeElectrolyzerVisualizer under ANION_EXCHANGE_ELECTROLYZER'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts AnionExchangeElectrolyzerVisualizer under ANION_EXCHANGE_ELECTROLYZER');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: AnionExchangeElectrolyzerVisualizer UI IS VERIFIED! ---');
}

runAudit();
