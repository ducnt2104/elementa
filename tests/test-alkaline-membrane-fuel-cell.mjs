/**
 * test-alkaline-membrane-fuel-cell.mjs
 *
 * Test Suite 338: Alkaline Anion Exchange Membrane Fuel Cell (AEMFC) Engine Audit
 * Validates 100% PGM-free silver/nickel-molybdenum catalysts, overpotential deconstruction,
 * electrochemical CO2 self-purging kinetics, and 150 kW heavy truck powertrain sizing.
 */

import assert from 'assert';
import {
  AEMFC_CATALYSTS,
  AlkalineMembraneFuelCellEngine
} from '../src/domain/alkalineMembraneFuelCellEngine.ts';

console.log('🧪 Running Test Suite 338: Alkaline Membrane Fuel Cell (AEMFC) Engine...');

// 1. Verify Catalyst Configurations & PGM-Free Economics
console.log('  1. Verifying AEMFC Catalyst Systems & PGM-Free Economics...');
const catalysts = Object.keys(AEMFC_CATALYSTS);
assert.strictEqual(catalysts.length, 3, 'Must define exactly 3 AEMFC catalyst systems');

// PGM-free verification
const pgmFreeAg = AEMFC_CATALYSTS['PGM_FREE_AG_NIMO'];
assert.strictEqual(pgmFreeAg.pgmLoadingMgPerCm2, 0.0, 'Ag/Ni-Mo system must contain 0.0 mg PGM');
assert(pgmFreeAg.costPerKwDollar <= 15.0, 'PGM-free catalyst cost must be <= $15/kW');

const pgmFreeCo = AEMFC_CATALYSTS['CO3O4_SPINEL_NICU'];
assert.strictEqual(pgmFreeCo.pgmLoadingMgPerCm2, 0.0, 'Co3O4 spinel system must contain 0.0 mg PGM');
assert(pgmFreeCo.costPerKwDollar <= 10.0, 'Co3O4 catalyst cost must be <= $10/kW');

const ptBenchmark = AEMFC_CATALYSTS['LOW_PGM_BENCHMARK_PT_RU'];
assert(ptBenchmark.pgmLoadingMgPerCm2 > 0, 'Pt reference must contain PGM');
assert(ptBenchmark.costPerKwDollar >= 40.0, 'Pt benchmark cost must exceed $40/kW');

console.log('  ✓ AEMFC catalyst configurations and PGM-free standards verified.');

// 2. Verify Performance, Overpotentials & CO2 Self-Purging
console.log('  2. Verifying Operating Cell Voltages, Polarization & CO2 Self-Purging...');
const conditions = {
  catalystType: 'PGM_FREE_AG_NIMO',
  temperatureC: 75.0,
  pressureBar: 1.5,
  currentDensityAcm2: 1.20,
  co2InletPpm: 420.0, // Ambient air CO2 concentration
  membraneThicknessMicrons: 15.0, // PiperION 15 um
  relativeHumidityCathodePercent: 90.0,
  relativeHumidityAnodePercent: 85.0,
  cellActiveAreaCm2: 350.0
};

const perf = AlkalineMembraneFuelCellEngine.calculatePerformance(conditions);

assert(perf.openCircuitVoltageV >= 1.00 && perf.openCircuitVoltageV <= 1.08, `OCV (${perf.openCircuitVoltageV} V) must be 1.00-1.08 V`);
assert(perf.operatingCellVoltageV >= 0.60 && perf.operatingCellVoltageV <= 0.82, `Operating voltage (${perf.operatingCellVoltageV} V) must be 0.60-0.82 V at 1.2 A/cm2`);
assert(perf.powerDensityWPerCm2 >= 0.70 && perf.powerDensityWPerCm2 <= 1.20, `Power density (${perf.powerDensityWPerCm2} W/cm2) must be 0.70-1.20 W/cm2`);

// Overpotential breakdown check
assert(perf.overpotentials.cathodeOrrActivationV > 0.10, 'ORR activation overpotential must be significant');
assert(perf.overpotentials.ohmicMembraneAndIonomerV > 0.03, 'Ohmic overpotential must be positive');
assert(perf.overpotentials.carbonationOverpotentialV > 0, 'Carbonation overpotential must be positive when CO2 is present');

// CO2 self-purging verification
assert.strictEqual(perf.carbonationState.isOperatingInSelfPurgingRegime, true, 'At 1.2 A/cm2 cell must operate in self-purging regime');
assert(perf.carbonationState.selfPurgingEfficiencyPercent >= 70.0, 'Self-purging efficiency must exceed 70%');
assert(perf.carbonationState.anodeCo2PurgeRateMlPerMinPerCell > 0, 'Anode must purge CO2 gas');

// Water management check
assert(perf.waterManagement.anodeProductionGPerHour > perf.waterManagement.cathodeConsumptionGPerHour, 'Anode water production must exceed cathode consumption');
assert(perf.waterManagement.backDiffusionSufficiencyRatio >= 1.0, 'Back-diffusion must maintain cathode hydration');

console.log(`  ✓ Performance: V_cell = ${perf.operatingCellVoltageV} V at 1.2 A/cm2, Power = ${perf.powerDensityWPerCm2} W/cm2, Self-purging = ${perf.carbonationState.selfPurgingEfficiencyPercent}%, Anode water = ${perf.waterManagement.anodeProductionGPerHour} g/h.`);

// 3. Verify Heavy-Duty Truck System Design (150 kW Net Power)
console.log('  3. Verifying 150 kW Heavy-Duty Fuel Cell Truck System Design...');
const truck = AlkalineMembraneFuelCellEngine.designHeavyTruckPowerSystem(150.0, 'PGM_FREE_AG_NIMO');

assert.strictEqual(truck.netStackPowerKw, 150.0, 'Net power must be 150 kW');
assert.strictEqual(truck.totalPgmWeightGrams, 0.0, 'PGM weight must be 0.0 grams for Ag/Ni-Mo');
assert(truck.totalCatalystCostDollar <= 2000.0, `Catalyst cost ($${truck.totalCatalystCostDollar}) must be <= $2000 for 150 kW`);
assert(truck.catalystCostSavingsPercent >= 75.0, `Cost savings (${truck.catalystCostSavingsPercent}%) must exceed 75% vs PEMFC`);
assert(truck.drivingRangeKmOn50KgH2 >= 600, `Driving range (${truck.drivingRangeKmOn50KgH2} km) must exceed 600 km`);
assert(truck.avoidedDieselCo2TonsPerYear >= 90.0, `Avoided CO2 (${truck.avoidedDieselCo2TonsPerYear} tons) must exceed 90 tons/year`);

console.log(`  ✓ 150 kW Truck: Catalyst Cost = $${truck.totalCatalystCostDollar} (Saved ${truck.catalystCostSavingsPercent}% vs PEMFC $${truck.equivalentPemfcCatalystCostDollar}!), 0g PGM, Range = ${truck.drivingRangeKmOn50KgH2} km, Refuel = ${truck.refuelTimeMinutes} min, Avoided CO2 = ${truck.avoidedDieselCo2TonsPerYear} tons/yr.`);

console.log('🎉 Test Suite 338 Passed (3/3 assertion groups clean)!');
