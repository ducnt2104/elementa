// tests/test-metal-air-battery.mjs
// Test Suite 252: Metal-Air Batteries (Zinc-Air & Li-Air) & Gas Diffusion Cathode Engine Audit
// Standards: IUPAC Electrochemistry, Open-Atmosphere Secondary Systems & Vietnam GDPT 2018 (Hóa 10 & 12: Kim loại & Pin hít thở)

import assert from 'node:assert';
import {
  METAL_AIR_CHEMISTRIES_CATALOG,
  getMetalAirChemistries,
  simulateGasDiffusionElectrode,
  simulateMetalAirSystem
} from '../src/domain/metalAirBatteryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 252: METAL-AIR BATTERIES (ZINC-AIR/LI-AIR) AUDIT');
console.log('======================================================================\n');

// 1. Verify Catalogs Integrity
console.log('1. Checking Metal-Air Chemistries Catalog...');
const chemistries = getMetalAirChemistries();
assert(chemistries.length >= 3, 'Must provide at least 3 distinct metal-air chemistries');

const znAir = chemistries.find(b => b.id === 'ZINC_AIR_AQUEOUS');
const liAir = chemistries.find(b => b.id === 'LITHIUM_AIR_APROTIC');
const alAir = chemistries.find(b => b.id === 'ALUMINUM_AIR_PRIMARY');

assert(znAir && liAir && alAir, 'Zinc-Air, Lithium-Air and Aluminum-Air systems must exist');
assert.strictEqual(znAir.anodeMetalVi.includes('Kẽm'), true, 'Zinc-Air must use Zinc anode');
assert.strictEqual(liAir.anodeMetalVi.includes('Lithi'), true, 'Lithium-Air must use Lithium anode');

assert(znAir.theoreticalSpecificEnergyWhKg >= 1000.0, 'Zinc-Air theoretical energy must be >= 1000 Wh/kg');
assert(liAir.theoreticalSpecificEnergyWhKg >= 3000.0, 'Lithium-Air theoretical energy must exceed 3000 Wh/kg (gasoline competitor)');
assert.strictEqual(znAir.rechargeabilityVi, 'ELECTRICALLY_RECHARGEABLE', 'Zinc-Air must support electrical recharging');
console.log(`  ✓ Theoretical Specific Energies: Zn-Air = ${znAir.theoreticalSpecificEnergyWhKg} Wh/kg, Li-Air = ${liAir.theoreticalSpecificEnergyWhKg} Wh/kg\n`);

// 2. Verify Gas Diffusion Electrode (GDE) Polarization & Oxygen Sensitivity
console.log('2. Testing Gas Diffusion Electrode (GDE) Polarization Across O2 Pressures...');
const normalAirGde = simulateGasDiffusionElectrode('ZINC_AIR_AQUEOUS', 0.21);
const pureO2Gde = simulateGasDiffusionElectrode('ZINC_AIR_AQUEOUS', 1.0);
const hypoxicGde = simulateGasDiffusionElectrode('ZINC_AIR_AQUEOUS', 0.05);

assert(normalAirGde.length >= 25, 'GDE polarization curve must have at least 25 data points');

const normalMid = normalAirGde[12];
const pureMid = pureO2Gde[12];
const hypoxicMid = hypoxicGde[12];

console.log(`  - Mid Current Point (J = ${normalMid.currentDensityMaCm2} mA/cm²):`);
console.log(`    * Ambient Air (0.21 bar O2): V_cell = ${normalMid.cellVoltageV} V, Power = ${normalMid.powerDensityMilliWCm2} mW/cm²`);
console.log(`    * Pure Oxygen (1.00 bar O2): V_cell = ${pureMid.cellVoltageV} V, Power = ${pureMid.powerDensityMilliWCm2} mW/cm²`);
console.log(`    * Hypoxic Air (0.05 bar O2): V_cell = ${hypoxicMid.cellVoltageV} V, Power = ${hypoxicMid.powerDensityMilliWCm2} mW/cm²`);

assert(pureMid.cellVoltageV > normalMid.cellVoltageV, 'Pure oxygen must increase cell voltage via Nernst potential');
assert(hypoxicMid.cellVoltageV < normalMid.cellVoltageV, 'Hypoxic low-oxygen air must depress cell voltage and power');
assert.strictEqual(normalAirGde[normalAirGde.length - 1].triphaseBoundaryStateVi, 'GAS_STARVATION', 'High current limit must enter gas starvation regime');
console.log('  ✓ Triple-phase boundary gas diffusion kinetics confirmed\n');

// 3. Verify Open-Breathe System Simulation & Oxygen Consumption
console.log('3. Testing Open-Breathe System Simulation (50g Metal Anode)...');
const znResult = simulateMetalAirSystem('ZINC_AIR_AQUEOUS', 50.0, 500.0);
console.log(`  - 50g Zinc Anode (500 mA discharge):`);
console.log(`    * Delivered Energy: ${znResult.deliveredEnergyWattHours} Wh, Duration: ${znResult.operatingDurationHours} hours`);
console.log(`    * Oxygen Consumed from Atmosphere: ${znResult.oxygenConsumedLiters} Liters O2`);
console.log(`    * Safety Score: ${znResult.safetyScoreOutOf10}/10, Verdict: ${znResult.verdictVi}`);

assert(znResult.deliveredEnergyWattHours >= 20.0, '50g Zinc must deliver >= 20 Wh electrical energy');
assert(znResult.oxygenConsumedLiters >= 8.0, '50g Zinc must breathe >= 8 L of ambient O2');
assert(znResult.safetyScoreOutOf10 >= 9.0, 'Aqueous Zinc-Air must achieve safety score >= 9.0/10');

const liResult = simulateMetalAirSystem('LITHIUM_AIR_APROTIC', 50.0, 500.0);
console.log(`  - 50g Lithium Anode (Pinnacle Benchmark):`);
console.log(`    * Delivered Energy: ${liResult.deliveredEnergyWattHours} Wh (Li-Air), Oxygen: ${liResult.oxygenConsumedLiters} Liters O2`);
assert(liResult.deliveredEnergyWattHours >= 45.0, '50g Lithium must deliver >= 45 Wh energy (>2x Zinc-air)');
console.log('  ✓ Open-atmosphere breathing mechanics and energy delivery verified\n');

console.log('======================================================================');
console.log('   ALL 3 AUDIT CHECKS IN SUITE 252 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
