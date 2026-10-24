// tests/test-solid-oxide-electrolyzer-visualizer-ui.mjs
// Test Suite 259: Solid Oxide Electrolyzer Visualizer UI & Codex Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const ROOT = process.cwd();
const VISUALIZER_PATH = path.join(ROOT, 'src', 'components', 'visualizations', 'SolidOxideElectrolyzerVisualizer.tsx');
const ENGINE_PATH = path.join(ROOT, 'src', 'domain', 'solidOxideElectrolyzerEngine.ts');
const CODEX_TAB_PATH = path.join(ROOT, 'src', 'components', 'PeriodicCodexTab.tsx');

console.log('--- TEST SUITE 259: SolidOxideElectrolyzerVisualizer Component & Integration Audit ---');

function runAudit() {
  // 1. Files existence
  assert(fs.existsSync(VISUALIZER_PATH), 'SolidOxideElectrolyzerVisualizer.tsx component file must exist');
  console.log('  ✓ SolidOxideElectrolyzerVisualizer.tsx component file must exist');

  assert(fs.existsSync(ENGINE_PATH), 'solidOxideElectrolyzerEngine.ts domain engine file must exist');
  console.log('  ✓ solidOxideElectrolyzerEngine.ts domain engine file must exist');

  assert(fs.existsSync(CODEX_TAB_PATH), 'PeriodicCodexTab.tsx file must exist');
  console.log('  ✓ PeriodicCodexTab.tsx file must exist');

  const visContent = fs.readFileSync(VISUALIZER_PATH, 'utf-8');
  const codexContent = fs.readFileSync(CODEX_TAB_PATH, 'utf-8');

  // 2. Component imports from engine
  assert(
    visContent.includes('solidOxideElectrolyzerEngine') &&
    visContent.includes('SOEC_STANDARD_MATERIALS') &&
    visContent.includes('calculateWaterThermodynamics') &&
    visContent.includes('simulateSOECPolarization') &&
    visContent.includes('simulateSOECCoElectrolysis'),
    'SolidOxideElectrolyzerVisualizer must import engine simulation functions and materials'
  );
  console.log('  ✓ SolidOxideElectrolyzerVisualizer must import functions from solidOxideElectrolyzerEngine');

  // 3. Audio sound effect triggers
  assert(
    visContent.includes('sound.playUiClick()'),
    'SolidOxideElectrolyzerVisualizer must trigger sound.playUiClick() on interactive selections'
  );
  console.log('  ✓ SolidOxideElectrolyzerVisualizer must trigger sound.playUiClick() on interactive selections');

  // 4. Tab modes support
  assert(
    visContent.includes("'CELL_CROSS_SECTION_O2_HOPPING'") &&
    visContent.includes("'THERMODYNAMICS_AND_OVERPOTENTIALS'") &&
    visContent.includes("'CO_ELECTROLYSIS_POWER_TO_X'"),
    'SolidOxideElectrolyzerVisualizer must support 3 distinct interactive modes'
  );
  console.log('  ✓ SolidOxideElectrolyzerVisualizer must support 3 distinct interactive modes');

  // 5. SVG diagrams
  const svgMatches = visContent.match(/<svg/g) || [];
  assert(svgMatches.length >= 2, 'SolidOxideElectrolyzerVisualizer must render at least 2 interactive SVG diagrams');
  console.log('  ✓ SolidOxideElectrolyzerVisualizer must render interactive SVG diagrams');

  // 6. Scientific terms references
  assert(visContent.includes('SOEC') || visContent.includes('Oxit Rắn'), 'Must reference SOEC technology');
  assert(visContent.includes('8YSZ') || visContent.includes('Ni-YSZ'), 'Must reference ceramic electrolyte / cathode materials');
  assert(visContent.includes('e-Kerosene') || visContent.includes('Syngas'), 'Must reference green syngas / e-Kerosene');
  assert(visContent.includes('V_tn') || visContent.includes('nhiệt trung hòa'), 'Must reference thermoneutral voltage');
  assert(visContent.includes('Fischer-Tropsch') || visContent.includes('Power-to-X'), 'Must reference Power-to-X synthesis');
  assert(visContent.includes('O²⁻') || visContent.includes('O2-'), 'Must reference oxygen vacancy hopping ion');
  console.log('  ✓ All scientific standards, high-temp electrochemistry terms and Power-to-X benchmarks present');

  // 7. PeriodicCodexTab integration
  assert(
    codexContent.includes('SolidOxideElectrolyzerVisualizer') &&
    codexContent.includes("'SOLID_OXIDE_ELECTROLYZER'") &&
    codexContent.includes('<SolidOxideElectrolyzerVisualizer />'),
    'PeriodicCodexTab.tsx must mount SolidOxideElectrolyzerVisualizer under SOLID_OXIDE_ELECTROLYZER'
  );
  console.log('  ✓ PeriodicCodexTab.tsx mounts SolidOxideElectrolyzerVisualizer under SOLID_OXIDE_ELECTROLYZER');

  console.log('\n--- ALL 7 AUDIT CHECKS PASSED: SolidOxideElectrolyzerVisualizer UI IS VERIFIED! ---');
}

runAudit();
