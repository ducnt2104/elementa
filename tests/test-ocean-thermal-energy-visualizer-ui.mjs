// tests/test-ocean-thermal-energy-visualizer-ui.mjs
// Test Suite 273: Ocean Thermal Energy Conversion (OTEC) Visualizer Component & Integration Audit

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- TEST SUITE 273: OceanThermalEnergyVisualizer Component & Integration Audit ---');

const visualizerPath = path.resolve('src/components/visualizations/OceanThermalEnergyVisualizer.tsx');
const enginePath = path.resolve('src/domain/oceanThermalEnergyEngine.ts');
const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');

// 1. Files existence check
assert(fs.existsSync(visualizerPath), 'OceanThermalEnergyVisualizer.tsx component file must exist');
console.log('  ✓ OceanThermalEnergyVisualizer.tsx component file must exist');

assert(fs.existsSync(enginePath), 'oceanThermalEnergyEngine.ts domain engine file must exist');
console.log('  ✓ oceanThermalEnergyEngine.ts domain engine file must exist');

assert(fs.existsSync(codexPath), 'PeriodicCodexTab.tsx file must exist');
console.log('  ✓ PeriodicCodexTab.tsx file must exist');

const visualizerContent = fs.readFileSync(visualizerPath, 'utf-8');
const codexContent = fs.readFileSync(codexPath, 'utf-8');

// 2. Engine imports verification
assert(
  visualizerContent.includes('OTEC_FLUID_CATALOG') &&
  visualizerContent.includes('VIETNAM_OTEC_RESOURCES') &&
  visualizerContent.includes('calculateOtecPerformance'),
  'OceanThermalEnergyVisualizer must import constants and calculateOtecPerformance from oceanThermalEnergyEngine'
);
console.log('  ✓ OceanThermalEnergyVisualizer must import functions from oceanThermalEnergyEngine');

// 3. Audio UI click integration
assert(
  visualizerContent.includes('sound.playUiClick()'),
  'OceanThermalEnergyVisualizer must trigger sound.playUiClick() on interactive selections'
);
console.log('  ✓ OceanThermalEnergyVisualizer must trigger sound.playUiClick() on interactive selections');

// 4. Mode tabs check
const expectedModes = [
  'RANKINE_CYCLE_AND_AMMONIA_ORC',
  'CWIP_HYDRODYNAMICS_AND_PUMPING',
  'BLUE_ECONOMY_AND_VIETNAM_POTENTIAL'
];

expectedModes.forEach(mode => {
  assert(
    visualizerContent.includes(mode),
    `OceanThermalEnergyVisualizer must support mode: ${mode}`
  );
});
console.log('  ✓ OceanThermalEnergyVisualizer must support 3 distinct interactive modes');

// 5. SVG flowsheets & schematic check
assert(
  visualizerContent.includes('<svg viewBox="0 0 460 300"') &&
  visualizerContent.includes('<svg viewBox="0 0 400 320"') &&
  visualizerContent.includes('Bộ Bay Hơi') &&
  visualizerContent.includes('Bộ Ngưng Tụ') &&
  visualizerContent.includes('Tuabin NH₃') &&
  visualizerContent.includes('TẦNG NHẢY NHIỆT (Thermocline 100-500m)'),
  'OceanThermalEnergyVisualizer must render interactive SVG diagrams showing Rankine cycle and ocean thermocline'
);
console.log('  ✓ OceanThermalEnergyVisualizer must render interactive SVG diagrams');

// 6. Scientific terms & Blue Economy benchmarks
assert(
  visualizerContent.includes('potableWaterProductionM3PerDay') &&
  visualizerContent.includes('deepOceanWaterNutrients') &&
  visualizerContent.includes('swacCoolingCapacityMwTh') &&
  visualizerContent.includes('greenAmmoniaProductionTonsPerDay'),
  'OceanThermalEnergyVisualizer must display co-products: freshwater desalination, deep sea nutrients, SWAC cooling and green ammonia'
);
console.log('  ✓ Blue Economy co-products (freshwater, nutrients, SWAC, green NH3) verified');

// 7. PeriodicCodexTab integration verification
assert(
  codexContent.includes("import { OceanThermalEnergyVisualizer } from './visualizations/OceanThermalEnergyVisualizer';"),
  'PeriodicCodexTab.tsx must import OceanThermalEnergyVisualizer'
);
assert(
  codexContent.includes("'OCEAN_THERMAL_ENERGY'"),
  'PeriodicCodexTab.tsx must include OCEAN_THERMAL_ENERGY in activeMainTab type union'
);
assert(
  codexContent.includes('setActiveMainTab(\'OCEAN_THERMAL_ENERGY\')'),
  'PeriodicCodexTab.tsx must render a tab button for OCEAN_THERMAL_ENERGY'
);
assert(
  codexContent.includes('<OceanThermalEnergyVisualizer />'),
  'PeriodicCodexTab.tsx must render <OceanThermalEnergyVisualizer /> component'
);
console.log('  ✓ PeriodicCodexTab integration verified (import, state, tab button, JSX component)');

console.log('--- TEST SUITE 273: ALL CHECKS PASSED (7/7) ---');
