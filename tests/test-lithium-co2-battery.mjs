/**
 * test-lithium-co2-battery.mjs
 *
 * Test Suite 340: Lithium-Carbon Dioxide (Li-CO2) Battery Engine Audit
 * Validates deep space Mars atmosphere energy storage (P_CO2 ~ 7 mbar),
 * soluble redox mediator (I-/I3-) overpotential reduction, and 10 kWh Mars Rover battery pack sizing.
 */

import assert from 'assert';
import {
  LI_CO2_MEDIATORS,
  LithiumCarbonDioxideBatteryEngine
} from '../src/domain/lithiumCarbonDioxideBatteryEngine.ts';

console.log('🧪 Running Test Suite 340: Lithium-Carbon Dioxide (Li-CO2) Battery Engine...');

// 1. Verify Mediator Catalog & Charging Overpotential Reduction
console.log('  1. Verifying Li-CO2 Redox Mediators & Voltage Plateaus...');
const mediators = Object.keys(LI_CO2_MEDIATORS);
assert.strictEqual(mediators.length, 4, 'Must define exactly 4 Li-CO2 mediator/catalyst systems');

// Iodine mediator check
const iodine = LI_CO2_MEDIATORS['IODINE_REDOX_MEDIATOR'];
assert(iodine.chargeVoltagePlateauV <= 3.70, `Iodine mediator charge plateau (${iodine.chargeVoltagePlateauV} V) must be <= 3.70 V`);
assert(iodine.roundTripEfficiencyPercent >= 72.0, 'Iodine mediator RTE must be >= 72%');

// Unmediated CNT check (high overpotential)
const unmediated = LI_CO2_MEDIATORS['UNMEDIATED_PRISTINE_CNT'];
assert(unmediated.chargeVoltagePlateauV >= 4.35, `Unmediated charge plateau (${unmediated.chargeVoltagePlateauV} V) must be >= 4.35 V`);
assert(unmediated.roundTripEfficiencyPercent <= 62.0, 'Unmediated RTE must be <= 62%');

console.log('  ✓ Li-CO2 mediator catalog and voltage plateau overpotential reduction verified.');

// 2. Verify Performance in Martian Surface Atmosphere (P_CO2 = 0.007 bar)
console.log('  2. Verifying Electrochemical Performance & Carbon Capture in Martian Atmosphere...');
const marsConditions = {
  mediatorType: 'IODINE_REDOX_MEDIATOR',
  environmentType: 'MARS_SURFACE_ATMOSPHERE',
  temperatureC: -10.0, // Martian surface diurnal temp
  co2PartialPressureBar: 0.007, // ~7 mbar Mars atmospheric pressure
  currentDensityMaCm2: 0.20,
  cellActiveAreaCm2: 250.0,
  arealCapacityMahCm2: 4.0
};

const perf = LithiumCarbonDioxideBatteryEngine.calculatePerformance(marsConditions);

assert(perf.openCircuitVoltageV >= 2.60 && perf.openCircuitVoltageV <= 2.76, `Martian OCV (${perf.openCircuitVoltageV} V) must be 2.60-2.76 V`);
assert(perf.operatingDischargeVoltageV >= 2.45 && perf.operatingDischargeVoltageV <= 2.75, `Discharge voltage (${perf.operatingDischargeVoltageV} V) must be 2.45-2.75 V`);
assert(perf.operatingChargeVoltageV >= 3.60 && perf.operatingChargeVoltageV <= 3.85, `Charge voltage (${perf.operatingChargeVoltageV} V) must be 3.60-3.85 V`);
assert(perf.roundTripEfficiencyPercent >= 68.0, `RTE (${perf.roundTripEfficiencyPercent}%) must be >= 68%`);

// Carbon capture verification: 4Li + 3CO2 -> 2Li2CO3 + C
assert(perf.carbonCaptureMetrics.co2CapturedPerCycleGrams > 0.5, 'Must capture CO2 gas into solid deposit');
assert(perf.carbonCaptureMetrics.solidLi2Co3DepositedGrams > 0.5, 'Must deposit solid Li2CO3');
assert(perf.carbonCaptureMetrics.carbonPorousDepositGrams > 0.05, 'Must deposit elemental carbon');
assert(perf.specificEnergyWhPerKgCathode >= 900, `Cathode specific energy (${perf.specificEnergyWhPerKgCathode} Wh/kg) must exceed 900 Wh/kg`);

console.log(`  ✓ Performance on Mars: OCV = ${perf.openCircuitVoltageV} V, V_dis = ${perf.operatingDischargeVoltageV} V, V_chg = ${perf.operatingChargeVoltageV} V, RTE = ${perf.roundTripEfficiencyPercent}%, CO2 captured = ${perf.carbonCaptureMetrics.co2CapturedPerCycleGrams} g/cycle.`);

// 3. Verify Mars Rover Battery Pack Design (10 kWh)
console.log('  3. Verifying Mars Rover Battery Pack Design (10 kWh System)...');
const roverPack = LithiumCarbonDioxideBatteryEngine.designMarsRoverBatteryPack(10.0, 'IODINE_REDOX_MEDIATOR');

assert.strictEqual(roverPack.totalPackCapacityKwh, 10.0, 'Total pack capacity must be 10 kWh');
assert(roverPack.liCo2BatteryPackWeightKg <= 25.0, `Li-CO2 pack weight (${roverPack.liCo2BatteryPackWeightKg} kg) must be <= 25 kg`);
assert(roverPack.equivalentLiIonPackWeightKg >= 65.0, `Space Li-Ion pack weight (${roverPack.equivalentLiIonPackWeightKg} kg) must be >= 65 kg`);
assert(roverPack.massSavingsPercent >= 70.0, `Mass savings (${roverPack.massSavingsPercent}%) must exceed 70%`);
assert(roverPack.drivingRangeSols >= 1.5, `Autonomous range (${roverPack.drivingRangeSols} Sols) must exceed 1.5 Sols`);
assert(roverPack.co2GasHarvestedFromMarsPerMissionKg >= 800, `Mission CO2 harvested (${roverPack.co2GasHarvestedFromMarsPerMissionKg} kg) must exceed 800 kg`);

console.log(`  ✓ Mars Rover: 10 kWh Pack = ${roverPack.liCo2BatteryPackWeightKg} kg vs Space Li-Ion ${roverPack.equivalentLiIonPackWeightKg} kg (Saved ${roverPack.massSavingsKg} kg / ${roverPack.massSavingsPercent}%), Range = ${roverPack.drivingRangeSols} Sols, Mission CO2 = ${roverPack.co2GasHarvestedFromMarsPerMissionKg} kg.`);

console.log('🎉 Test Suite 340 Passed (3/3 assertion groups clean)!');
