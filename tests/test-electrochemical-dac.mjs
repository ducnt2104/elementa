// tests/test-electrochemical-dac.mjs
// ============================================================================
// TEST SUITE 382: ELECTROCHEMICAL DIRECT AIR CAPTURE (e-DAC) & BPMED AUDIT
// Auditing IUPAC Thermodynamics, Water Dissociation Kinetics,
// Faraday Efficiency, and 100,000 Ton/Year Decarbonization Plant Sizing
// ============================================================================

import assert from 'assert';
import {
  ElectrochemicalDacEngine,
  SEQUESTRATION_PORTFOLIO,
  R_IDEAL_GAS,
  FARADAY_CONST,
  MOLAR_MASS_CO2,
  THERMAL_DAC_ENERGY_GJ_TON
} from '../src/domain/electrochemicalDacEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 382: ELECTROCHEMICAL DIRECT AIR CAPTURE (e-DAC)');
console.log('======================================================================\n');

// 1. Audit IUPAC Thermodynamic Minimum Work
console.log('1. Auditing Thermodynamic Minimum Work for Ambient Air Separation (420 ppm)...');
const thermo = ElectrochemicalDacEngine.calculateThermodynamicMinWork(420, 298.15);
console.log(`   -> Joules/mol: ${thermo.joulesPerMol} J/mol | kWh/ton: ${thermo.kwhPerTon} kWh/ton | GJ/ton: ${thermo.gjPerTon} GJ/ton`);

assert.ok(thermo.joulesPerMol >= 18000 && thermo.joulesPerMol <= 21000,
  `Thermodynamic min work should be 18 - 21 kJ/mol (got ${thermo.joulesPerMol})`);
assert.ok(thermo.kwhPerTon >= 115 && thermo.kwhPerTon <= 135,
  `Theoretical minimum electricity should be 115 - 135 kWh/ton (got ${thermo.kwhPerTon})`);
assert.ok(thermo.gjPerTon >= 0.40 && thermo.gjPerTon <= 0.48,
  `Theoretical minimum energy should be 0.40 - 0.48 GJ/ton (got ${thermo.gjPerTon})`);
console.log('   -> Thermodynamic minimum work strictly adheres to IUPAC physical chemistry.');

// 2. Audit Atmospheric Air Contactor Absorption Mass Balance
console.log('\n2. Auditing Atmospheric Air Contactor Mass Balance & Exhaust Ppm...');
const contactor = ElectrochemicalDacEngine.calculateContactorPerformance(1_000_000, 420, 0.80);
console.log(`   -> Inlet CO2: ${contactor.inletCo2KgH} kg/h | Captured CO2: ${contactor.capturedCo2KgH} kg/h | Exhaust: ${contactor.exhaustPpm} ppm`);

assert.ok(contactor.inletCo2KgH > 700 && contactor.inletCo2KgH < 850,
  `Inlet CO2 should be ~750 kg/h for 1M m³/h air (got ${contactor.inletCo2KgH})`);
assert.ok(contactor.capturedCo2KgH > 550 && contactor.capturedCo2KgH < 680,
  `Captured CO2 at 80% eff should be ~600 kg/h (got ${contactor.capturedCo2KgH})`);
assert.strictEqual(contactor.exhaustPpm, 84.0, 'Exhaust air should contain 420 * (1 - 0.8) = 84.0 ppm');
console.log('   -> Air contactor mass balance verified.');

// 3. Audit BPMED Repeating Cell Unit & Faraday's Law
console.log('\n3. Auditing Bipolar Membrane Electrodialysis (BPMED) Stack Kinetics...');
// Test 10,000 kg CO2/hour stack:
const bpmed = ElectrochemicalDacEngine.calculateBpmedStack(10000, 1.35, 0.91, 1.25);
console.log(`   -> Molar flow: ${bpmed.molarFlowMolS} mol/s CO2 | Total current: ${bpmed.totalCurrentAmperes} A`);
console.log(`   -> Stack Power: ${bpmed.stackElectricPowerKw} kW | Stack Energy: ${bpmed.stackSpecificEnergyKwhPerTon} kWh/ton CO2`);
console.log(`   -> Water Dissociated: ${bpmed.waterDissociatedLitersPerHour} L/h`);

assert.ok(bpmed.stackSpecificEnergyKwhPerTon >= 900 && bpmed.stackSpecificEnergyKwhPerTon <= 1300,
  `Stack specific electricity must be 900 - 1300 kWh/ton (got ${bpmed.stackSpecificEnergyKwhPerTon})`);
assert.ok(bpmed.waterDissociatedLitersPerHour > 5000 && bpmed.waterDissociatedLitersPerHour < 7500,
  `Water dissociated should be ~5000-7500 L/h for 10 tons CO2/h (got ${bpmed.waterDissociatedLitersPerHour})`);
console.log('   -> BPMED stack electrochemistry & water dissociation verified.');

// 4. Audit 100,000 Ton/Year Megaton-Scale e-DAC Plant
console.log('\n4. Auditing 100,000 Ton/Year e-DAC Decarbonization Plant Sizing & Economics...');
const plant = ElectrochemicalDacEngine.simulatePlant({
  annualTargetTonsCo2: 100000,
  operatingHoursPerYear: 8200,
  electricityPricePerKwh: 0.035, // $35/MWh green solar/wind
  capexPerTonYearCapacity: 950   // $950 / (ton/year)
});

console.log(`   -> Captured CO2: ${plant.hourlyCo2CapturedKg} kg/h (${plant.dailyCo2CapturedTons} tons/day)`);
console.log(`   -> Power: Stack = ${plant.bpmedStackPowerMw} MW | Aux = ${plant.auxiliaryPowerMw} MW | Total = ${plant.totalPlantPowerMw} MW`);
console.log(`   -> Specific Energy: ${plant.specificEnergyKwhPerTonCo2} kWh/ton (${plant.specificEnergyGjPerTonCo2} GJ/ton)`);
console.log(`   -> Energy Savings vs Thermal Calcination: ${plant.energySavingsVsThermalCalcinationPercent}%`);
console.log(`   -> Levelized Cost (LCOD): $${plant.lcodDollarsPerTonCo2} / ton CO2`);
console.log(`   -> Solvent Potassium Recycle Rate: ${plant.potassiumSolventRecycleRate}%`);

assert.ok(plant.dailyCo2CapturedTons >= 280 && plant.dailyCo2CapturedTons <= 305,
  `Daily captured CO2 must be 280 - 305 tons/day (got ${plant.dailyCo2CapturedTons})`);
assert.ok(plant.totalPlantPowerMw >= 14 && plant.totalPlantPowerMw <= 20,
  `100k ton plant power should be 14 - 20 MW (got ${plant.totalPlantPowerMw})`);
assert.ok(plant.specificEnergyGjPerTonCo2 >= 4.0 && plant.specificEnergyGjPerTonCo2 <= 5.8,
  `Total specific energy must be 4.0 - 5.8 GJ/ton (got ${plant.specificEnergyGjPerTonCo2})`);
assert.ok(plant.energySavingsVsThermalCalcinationPercent >= 35 && plant.energySavingsVsThermalCalcinationPercent <= 55,
  `Energy savings vs thermal DAC must be 35 - 55% (got ${plant.energySavingsVsThermalCalcinationPercent}%)`);
assert.ok(plant.lcodDollarsPerTonCo2 >= 130 && plant.lcodDollarsPerTonCo2 <= 200,
  `Levelized cost must be $130 - $200/ton CO2 (got $${plant.lcodDollarsPerTonCo2})`);
assert.strictEqual(plant.potassiumSolventRecycleRate, 99.95, 'Potassium solvent must be > 99.9% recycled in closed loop');

// 5. Audit Sequestration Portfolio
console.log('\n5. Auditing Permanent Sequestration & Utilization Portfolio...');
assert.strictEqual(SEQUESTRATION_PORTFOLIO.length, 4, 'Must have 4 sequestration/utilization pathways');
const carbfix = SEQUESTRATION_PORTFOLIO.find(s => s.id === 'mineral_carbonation');
assert.ok(carbfix, 'Must include Basalt In-Situ Mineralization (Carbfix)');
assert.strictEqual(carbfix.permanenceYears, 100000, 'Basalt mineral carbonation permanence must be 100,000+ years');

console.log('\n======================================================================');
console.log('   SUITE 382: ALL ASSERTIONS PASSED WITH ZERO REGRESSIONS!');
console.log('======================================================================\n');
