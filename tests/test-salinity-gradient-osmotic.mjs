// tests/test-salinity-gradient-osmotic.mjs
// Test Suite 270: Salinity Gradient Energy & Osmotic Power (Blue Energy) Audit

import assert from 'node:assert';
import {
  WATER_SALINITY_PROFILES,
  calculateVanTHoffOsmoticPressure,
  calculateGibbsMixingEnergy,
  simulateOsmoticPowerPlant
} from '../src/domain/salinityGradientOsmoticEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 270: SALINITY GRADIENT (BLUE ENERGY) AUDIT');
console.log('======================================================================\n');

// 1. Van 't Hoff Osmotic Pressures & Equivalent Hydrostatic Head
console.log('1. Checking Van \'t Hoff Osmotic Pressures & Waterfall Equivalence...');
assert(WATER_SALINITY_PROFILES.length >= 4, 'Must catalog at least 4 water salinity profiles');
const river = WATER_SALINITY_PROFILES[0];
const ocean = WATER_SALINITY_PROFILES[1];
const swroBrine = WATER_SALINITY_PROFILES[2];

// Check ocean osmotic pressure (~27 bar)
const oceanPi = calculateVanTHoffOsmoticPressure(ocean.naclConcentrationMolar, 25);
console.log(`  - Seawater (35 g/L, 0.55M): Osmotic Pressure Pi = ${oceanPi} bar`);
assert(oceanPi >= 25.0 && oceanPi <= 29.0, `Seawater Pi must be ~27 bar (got ${oceanPi} bar)`);

// Check mixing energy between river and seawater
const mixing = calculateGibbsMixingEnergy(river.naclConcentrationMolar, ocean.naclConcentrationMolar, 25);
console.log(`  - River-Seawater Interface: Gibbs Energy = ${mixing.gibbsMjM3} MJ/m³ river water`);
console.log(`  - Equivalent Hydrostatic Waterfall Head: ${mixing.equivalentHeadMeters} meters of water!`);

assert(
  mixing.equivalentHeadMeters >= 240 && mixing.equivalentHeadMeters <= 300,
  `Equivalent waterfall head must be ~270 meters (got ${mixing.equivalentHeadMeters} m)`
);
assert(
  mixing.gibbsMjM3 >= 2.0 && mixing.gibbsMjM3 <= 3.2,
  `Gibbs mixing energy must be 2.0 - 3.2 MJ/m³ (got ${mixing.gibbsMjM3} MJ/m³)`
);
console.log('  ✓ Van \'t Hoff equation, Gibbs mixing potential, and 270m waterfall equivalence verified');

// 2. Pressure Retarded Osmosis (PRO) Power Simulation
console.log('\n2. Testing Pressure Retarded Osmosis (PRO) Membrane Power Output...');
const conditions = {
  riverWaterFlowRateM3s: 10,
  seawaterFlowRateM3s: 25,
  operatingTempC: 22,
  membraneAreaM2: 500000, // 500,000 m²
  proHydraulicPressureBar: 13.0, // Near optimal Delta Pi / 2
  internalConcentrationPolarizationS: 350,
  membraneWaterPermeabilityA: 3.2,
  membraneSaltPermeabilityB: 0.2
};

const simPro = simulateOsmoticPowerPlant('PRESSURE_RETARDED_OSMOSIS', river, ocean, conditions);

// Power density check
assert(
  simPro.powerDensityWPerM2 >= 4.0 && simPro.powerDensityWPerM2 <= 9.0,
  `PRO power density must fall in 4.0 - 9.0 W/m² range (got ${simPro.powerDensityWPerM2} W/m²)`
);

// Power output check
assert(simPro.grossPowerOutputMw > 2.0, '500,000 m² membrane must produce > 2 MW gross power');
assert(simPro.netPowerExportMw > 1.5, 'Net power export must exceed 1.5 MW after parasitic pumping');
assert(simPro.annualElectricityGenerationGwh > 10.0, 'Annual generation must exceed 10 GWh');

// Clean baseload check
assert.strictEqual(simPro.environmentalBenefits.co2EmissionsPerMwhKg, 0.0, 'CO2 emissions must be 0 kg/MWh');
assert(simPro.environmentalBenefits.capacityFactorPct >= 90, 'Baseload capacity factor must be >= 90%');

console.log(`  - PRO Power Density: ${simPro.powerDensityWPerM2} W/m²`);
console.log(`  - Gross Power: ${simPro.grossPowerOutputMw} MW (Parasitic Pumping: ${simPro.parasiticPumpingPowerMw} MW)`);
console.log(`  - Net Export Power: ${simPro.netPowerExportMw} MW (${simPro.annualElectricityGenerationGwh} GWh / year)`);
console.log(`  - Baseload Capacity Factor: ${simPro.environmentalBenefits.capacityFactorPct}% (24/7 continuous river discharge)`);
console.log(`  - LCOE: $${simPro.levelizedCostOfElectricityUsdMwh} / MWh`);
console.log('  ✓ PRO power kinetics, hydraulic pressure optimization, and baseload generation verified');

// 3. Reverse Electrodialysis (RED) Solid-State Ion Exchange Simulation
console.log('\n3. Testing Reverse Electrodialysis (RED) Ion Potential Stacks...');
const simRed = simulateOsmoticPowerPlant('REVERSE_ELECTRODIALYSIS', river, ocean, conditions);

assert(simRed.powerDensityWPerM2 >= 2.0, 'RED power density must exceed 2.0 W/m²');
assert.strictEqual(simRed.environmentalBenefits.co2EmissionsPerMwhKg, 0.0, 'RED emissions must be 0 kg/MWh');

// Hypersaline brine boost check
const simProBrine = simulateOsmoticPowerPlant('PRESSURE_RETARDED_OSMOSIS', river, swroBrine, {
  ...conditions,
  proHydraulicPressureBar: 26.0
});
assert(
  simProBrine.powerDensityWPerM2 > simPro.powerDensityWPerM2,
  'SWRO desalination brine (70 g/L) must yield higher power density than standard seawater (35 g/L)'
);

console.log(`  - RED Power Density: ${simRed.powerDensityWPerM2} W/m² (Direct electrical current, zero turbines)`);
console.log(`  - Hypersaline SWRO Brine Boost: ${simProBrine.powerDensityWPerM2} W/m² vs ${simPro.powerDensityWPerM2} W/m² (Standard Seawater)`);
console.log('  ✓ RED ion-stack direct power and hypersaline brine energy recovery verified');

console.log('\n======================================================================');
console.log('   ALL 3 AUDIT CHECKS IN SUITE 270 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
