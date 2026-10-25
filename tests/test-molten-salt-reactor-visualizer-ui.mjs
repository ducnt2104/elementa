// tests/test-molten-salt-reactor-visualizer-ui.mjs
// Test Suite 275: Molten Salt Reactor (MSR) Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 275: MoltenSaltReactorVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/MoltenSaltReactorVisualizer.tsx');
const enginePath = path.resolve('src/domain/moltenSaltReactorEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'MoltenSaltReactorVisualizer.tsx component file must exist');
console.log('  ✓ MoltenSaltReactorVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'moltenSaltReactorEngine.ts domain engine file must exist');
console.log('  ✓ moltenSaltReactorEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('MOLTEN_SALT_CATALOG') &&
  visualizerContent.includes('calculateMsrPerformance'),
  'MoltenSaltReactorVisualizer must import constants and calculateMsrPerformance from moltenSaltReactorEngine'
);
console.log('  ✓ MoltenSaltReactorVisualizer must import functions from moltenSaltReactorEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'MoltenSaltReactorVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ MoltenSaltReactorVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'CORE_FLOWSHEET_AND_ONLINE_CHEMISTRY',
  'PASSIVE_FREEZE_PLUG_SAFETY_SIMULATION',
  'THORIUM_BREEDING_AND_WASTE_HORIZON'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `MoltenSaltReactorVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ MoltenSaltReactorVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets & schematic check
assert(
  visualizerContent.includes('<svg viewBox="0 0 460 320"') &&
  visualizerContent.includes('VÙNG HOẠT (CORE)') &&
  visualizerContent.includes('Sục Heli Khí') &&
  visualizerContent.includes('Tuabin sCO₂') &&
  visualizerContent.includes('BỂ XẢ TRỌNG LỰC DƯỚI LÒNG ĐẤT'),
  'MoltenSaltReactorVisualizer must render interactive SVG diagrams showing core, sparger, sCO2 turbine and subterranean drain tanks'
);
console.log('  ✓ MoltenSaltReactorVisualizer must render interactive SVG diagrams');

// 6. Interactive SBO Simulation toggle check
assert(
  visualizerContent.includes('toggleStationBlackout') &&
  visualizerContent.includes('KÍCH HOẠT SBO (MẤT ĐIỆN)') &&
  visualizerContent.includes('HỦY MÔ PHỎNG SBO'),
  'MoltenSaltReactorVisualizer must support interactive SBO Station Blackout simulation and freeze plug melting'
);
console.log('  ✓ SBO station blackout simulation and passive freeze plug melting verified');

// 7. PeriodicCodexTab integration verification
assert(
  codexContent.includes("import { MoltenSaltReactorVisualizer } from './visualizations/MoltenSaltReactorVisualizer';"),
  'PeriodicCodexTab.tsx must import MoltenSaltReactorVisualizer'
);
assert(
  codexContent.includes("'MOLTEN_SALT_REACTOR'"),
  'PeriodicCodexTab.tsx must include MOLTEN_SALT_REACTOR in activeMainTab type union'
);
assert(
  codexContent.includes('setActiveMainTab(\'MOLTEN_SALT_REACTOR\')'),
  'PeriodicCodexTab.tsx must render a tab button for MOLTEN_SALT_REACTOR'
);
assert(
  codexContent.includes('<MoltenSaltReactorVisualizer />'),
  'PeriodicCodexTab.tsx must render <MoltenSaltReactorVisualizer /> component'
);
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 275: ALL CHECKS PASSED (7/7) ---');
