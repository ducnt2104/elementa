// tests/test-allam-cycle.mjs
// ============================================================================
// TEST SUITE 386: SUPERCRITICAL CO2 (sCO2) ALLAM CYCLE AUDIT
// Auditing High-Pressure Oxy-Combustion, Inherent 100% Carbon Capture,
// Net Efficiency > 58% LHV, and Zero Thermal NOx Emissions
// ============================================================================

import assert from 'assert';
import {
  AllamCycleEngine,
  BENCHMARK_POWER_PLANTS,
  CRITICAL_PRESSURE_CO2_BAR,
  CRITICAL_TEMP_CO2_C,
  LHV_METHANE_MJ_KG,
  CO2_PRODUCED_KG_PER_KG_CH4,
  WATER_PRODUCED_KG_PER_KG_CH4
} from '../src/domain/allamCycleEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 386: SUPERCRITICAL CO2 ALLAM CYCLE AUDIT');
console.log('======================================================================\n');

// 1. Audit Critical Thermodynamics & Stoichiometry
console.log('1. Auditing CO2 Critical Constants & Oxy-Combustion Stoichiometry...');
console.log(`   -> CO2 Critical Pressure: ${CRITICAL_PRESSURE_CO2_BAR} bar | Critical Temp: ${CRITICAL_TEMP_CO2_C}°C`);
assert.strictEqual(CRITICAL_PRESSURE_CO2_BAR, 73.8, 'CO2 critical pressure must be 73.8 bar');
assert.strictEqual(CRITICAL_TEMP_CO2_C, 31.04, 'CO2 critical temperature must be 31.04°C');
assert.strictEqual(LHV_METHANE_MJ_KG, 50.0, 'Methane LHV must be 50.0 MJ/kg');
assert.strictEqual(CO2_PRODUCED_KG_PER_KG_CH4, 2.744, 'CO2 yield must be 2.744 kg/kg CH4');
assert.strictEqual(WATER_PRODUCED_KG_PER_KG_CH4, 2.245, 'Water yield must be 2.245 kg/kg CH4');
console.log('   -> Thermodynamic and stoichiometry constants strictly verified.');

// 2. Audit 500 MWth Allam-Fetvedt Plant Simulation
console.log('\n2. Auditing 500 MWth Commercial Allam Cycle Performance...');
const plant = AllamCycleEngine.simulateCycle({
  turbineInletPressureBar: 300,
  turbineInletTemperatureC: 1150,
  turbineOutletPressureBar: 30,
  turbineOutletTemperatureC: 750,
  naturalGasHeatInputMwLhv: 500,
  oxygenPurityPercent: 99.5,
  co2RecycleRatio: 28,
  pcheRecuperatorEffectiveness: 0.96
});

console.log(`   -> Gross Turbine Output: ${plant.grossTurbineOutputMw} MW`);
console.log(`   -> Parasitic Loads: ASU = ${plant.asuElectricDutyMw} MW | sCO2 Pump = ${plant.co2CompressorDutyMw} MW`);
console.log(`   -> Net Electric Output: ${plant.netElectricOutputMw} MW`);
console.log(`   -> Net Thermal Efficiency: ${plant.netThermalEfficiencyLhvPercent}% LHV`);
console.log(`   -> Pipeline CO2 Captured: ${plant.pipelineCo2CapturedKgH} kg/h (${plant.co2CaptureRatePercent}% inherent)`);
console.log(`   -> Water Byproduct: ${plant.waterCogenerationKgH} kg/h`);
console.log(`   -> NOx / SOx Emissions: ${plant.noxEmissionsPpm} ppm / ${plant.soxEmissionsPpm} ppm`);
console.log(`   -> Levelized Cost (LCOE): $${plant.lcoeDollarMwh}/MWh`);

// Assert Net Efficiency
assert.ok(plant.netThermalEfficiencyLhvPercent >= 57.0 && plant.netThermalEfficiencyLhvPercent <= 61.0,
  `Net efficiency must be 57 - 61% LHV (got ${plant.netThermalEfficiencyLhvPercent}%)`);

// Assert Inherent 100% Capture
assert.strictEqual(plant.co2CaptureRatePercent, 100.0, 'Inherent carbon capture rate must be exactly 100.0%');
assert.ok(plant.pipelineCo2CapturedKgH >= 90000 && plant.pipelineCo2CapturedKgH <= 110000,
  `Captured CO2 must be ~98,000 kg/h for 500 MWth gas (got ${plant.pipelineCo2CapturedKgH})`);

// Assert zero criteria pollutants
assert.strictEqual(plant.noxEmissionsPpm, 0.0, 'Thermal NOx must be 0.0 ppm due to absence of N2 in oxy-combustor');
assert.strictEqual(plant.soxEmissionsPpm, 0.0, 'SOx must be 0.0 ppm');

// Assert net water generation
assert.ok(plant.waterCogenerationKgH > 75000, 'Plant must co-produce > 75,000 kg/h pure condensed water');

// 3. Audit Comparison Benchmarking vs Amine CCS
console.log('\n3. Auditing Benchmark Power Generation Technologies...');
assert.strictEqual(BENCHMARK_POWER_PLANTS.length, 4, 'Must benchmark 4 generation types');
const allam = BENCHMARK_POWER_PLANTS.find(p => p.type === 'Allam_Cycle_sCO2');
const ccgtAmine = BENCHMARK_POWER_PLANTS.find(p => p.type === 'CCGT_Amine_CCS');
assert.ok(allam && ccgtAmine, 'Must include Allam Cycle and CCGT with Amine scrubbing');

// Verify Allam cycle avoids the ~9% efficiency penalty of post-combustion amine capture
const efficiencyAdvantage = allam.efficiencyPercent - ccgtAmine.efficiencyPercent;
console.log(`   -> Allam Cycle Efficiency Advantage over CCGT+Amine: +${efficiencyAdvantage.toFixed(1)}%`);
assert.ok(efficiencyAdvantage >= 6.0, 'Allam cycle must have >= 6.0% higher efficiency than CCGT+Amine');

console.log('\n======================================================================');
console.log('   SUITE 386: ALL ASSERTIONS PASSED WITH ZERO REGRESSIONS!');
console.log('======================================================================\n');
