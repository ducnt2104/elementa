// tests/test-thermoelectric-engine.mjs
// Test Suite 240: Thermoelectric Seebeck & Peltier Modules Engine Audit
// Standards: IUPAC Physical Chemistry, PGEC (Slack 1995) & Vietnam GDPT 2018 (Vật lý Nhiệt điện & Bán dẫn)

import assert from 'node:assert';
import {
  THERMOELECTRIC_MATERIALS_CATALOG,
  getThermoelectricMaterials,
  calculateThermoelectricZt,
  simulateTegWasteHeatRecovery,
  simulatePeltierCooling
} from '../src/domain/thermoelectricEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 240: THERMOELECTRIC SEEBECK & PELTIER AUDIT   ');
console.log('======================================================================\n');

// 1. Verify Catalogs Integrity
console.log('1. Checking Thermoelectric Materials Catalog...');
const materials = getThermoelectricMaterials();
assert(materials.length >= 5, 'Must provide at least 5 specialized thermoelectric materials');

const bi2te3 = materials.find(m => m.id === 'BI2TE3_ROOM_TEMP');
const snse = materials.find(m => m.id === 'SNSE_SINGLE_CRYSTAL');
const skutterudite = materials.find(m => m.id === 'FILLED_SKUTTERUDITE');
const sige = materials.find(m => m.id === 'SIGE_NASA_VOYAGER');
const pedot = materials.find(m => m.id === 'PEDOT_PSS_POLYMER');

assert(bi2te3 && snse && skutterudite && sige && pedot, 'All core thermoelectric materials must exist');
assert.strictEqual(snse.pgecPhononRattling, true, 'SnSe must leverage lattice anharmonicity / PGEC phonon suppression');
assert.strictEqual(snse.leadFreeEcoCompliant, true, 'SnSe must be completely lead-free');
assert(snse.peakZtValue >= 2.5, 'SnSe must hold world record ZT >= 2.5');
assert(bi2te3.seebeckCoefficientMicroVK > 200, 'Bi2Te3 Seebeck coefficient must exceed 200 µV/K');
console.log('  ✓ Catalogs verified: Bi2Te3, SnSe (Record ZT 2.65), Skutterudite, SiGe (NASA), PEDOT:PSS\n');

// 2. Verify ZT Figure of Merit Calculation & Temperature Optimization
console.log('2. Testing ZT Calculation & World Record Tier...');
const snseZt = calculateThermoelectricZt('SNSE_SINGLE_CRYSTAL', 650);
console.log(`  - SnSe at 650°C (923K): ZT = ${snseZt.figureOfMeritZt}, Tier: ${snseZt.performanceTierVi}`);
console.log(`  - Power Factor: ${snseZt.powerFactorMicroWmK2} µW/cm·K², Carnot Limit: ${snseZt.carnotEfficiencyLimitPercent}%`);

assert(snseZt.figureOfMeritZt >= 2.2, 'SnSe at 650°C must achieve record ZT >= 2.2');
assert.strictEqual(snseZt.performanceTierVi, 'KỶ LỤC THẾ GIỚI (ZT > 2.5)');
assert(snseZt.thermoelectricEfficiencyPercent > 10.0, 'Record ZT material must achieve > 10% thermal-to-electric efficiency');
console.log('  ✓ ZT figure of merit and efficiency limits confirmed\n');

// 3. Verify Industrial Waste Heat Recovery (Automotive Exhaust TEG)
console.log('3. Testing Automotive Exhaust Waste Heat Recovery (ΔT = 300K)...');
const tegOut = simulateTegWasteHeatRecovery('SNSE_SINGLE_CRYSTAL', 350, 50, 127);
console.log(`  - 127-Couple Module: Open Circuit V_oc = ${tegOut.openCircuitVoltageV} V, R_int = ${tegOut.internalResistanceOhms} Ω`);
console.log(`  - Max Electric Power: ${tegOut.maximumElectricPowerOutputWatts} W, Fuel Saving: ${tegOut.automotiveFuelSavingPercent}%`);

assert(tegOut.openCircuitVoltageV > 15.0, '127-couple module at ΔT=300K must produce open circuit voltage > 15V');
assert(tegOut.maximumElectricPowerOutputWatts >= 15.0, 'Must generate >= 15W auxiliary electric power from vehicle exhaust pipe');
assert(tegOut.automotiveFuelSavingPercent > 1.0, 'Must deliver > 1% automotive fuel efficiency improvement');
console.log('  ✓ Industrial waste heat harvesting validated\n');

// 4. Verify Peltier Solid-State Cooling Effect
console.log('4. Testing Peltier Solid-State Solid Refrigeration...');
const peltierOut = simulatePeltierCooling('BI2TE3_ROOM_TEMP', 3.5, 30, 10.0);
console.log(`  - Bi2Te3 Peltier (I = 3.5A, T_amb = 30°C): Cold Side T_c = ${peltierOut.coldSideTemperatureCelsius}°C (ΔT Drop = ${peltierOut.temperatureDropDeltaTCelsius}°C)`);
console.log(`  - Cooling Feasible: ${peltierOut.isCoolingFeasible}, COP = ${peltierOut.coefficientOfPerformanceCop}`);

assert(peltierOut.coldSideTemperatureCelsius < 30.0, 'Cold side temperature must be strictly below ambient 30°C');
assert(peltierOut.temperatureDropDeltaTCelsius > 5.0, 'Active Peltier pumping must drop temperature by > 5°C');
assert.strictEqual(peltierOut.isCoolingFeasible, true, 'Solid-state cooling must be feasible without CFC compressor');
console.log('  ✓ Peltier solid-state heat pumping validated\n');

console.log('======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 240 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
