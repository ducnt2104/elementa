/**
 * test-all-iron-flow-battery.mjs
 *
 * Test Suite 334: All-Iron Redox Flow Battery (IFB) Engine Audit
 * Validates earth-abundant iron redox couples (Fe2+/Fe0 & Fe3+/Fe2+),
 * overpotential deconstruction, catalytic proton rebalancer, and 12-hour LDES plant design.
 */

import assert from 'assert';
import {
  IRON_FLOW_ELECTROLYTES,
  AllIronFlowBatteryEngine
} from '../src/domain/allIronFlowBatteryEngine.ts';

console.log('🧪 Running Test Suite 334: All-Iron Flow Battery Engine...');

// 1. Verify Electrolyte Systems & Constants
console.log('  1. Verifying Iron Flow Electrolytes & Catalytic Rebalancer Constants...');
const electrolytes = Object.keys(IRON_FLOW_ELECTROLYTES);
assert.strictEqual(electrolytes.length, 3, 'Must define exactly 3 All-Iron flow electrolyte systems');

electrolytes.forEach((id) => {
  const spec = IRON_FLOW_ELECTROLYTES[id];
  assert(spec.nameVi && spec.chemicalFormulas.negative && spec.chemicalFormulas.positive, `${id} must contain full chemical formulas`);
  assert(spec.phOperatingRange[0] >= 1.5 && spec.phOperatingRange[1] <= 4.0, `${id} pH range must be between 1.5 and 4.0`);
  assert(spec.ironPlatingCoulombicEfficiencyPercent >= 93.0 && spec.ironPlatingCoulombicEfficiencyPercent <= 99.5, `${id} CE must be 93-99.5%`);
  assert(spec.herOverpotentialShiftMv >= 100, `${id} HER overpotential shift must be at least 100 mV`);
});
console.log('  ✓ Iron flow electrolyte catalog and chemical formulas verified.');

// 2. Verify Electrochemical Performance & Rebalancer Kinetics
console.log('  2. Verifying Operating Voltages, Overpotentials & Proton Rebalancing...');
const conditionsBalanced = {
  electrolyteType: 'ALL_CHLORIDE_SLURRY',
  stateOfCharge: 0.50,
  temperatureC: 40.0,
  currentDensityMaCm2: 45.0,
  flowRateLMin: 4.0,
  hasProtonRebalancer: true,
  electrodeAreaCm2: 1000.0,
  membraneTypeVi: 'Daramic Hydrophilic Microporous'
};

const resBalanced = AllIronFlowBatteryEngine.calculateElectrochemicalPerformance(conditionsBalanced);

assert(resBalanced.openCircuitVoltageV >= 1.15 && resBalanced.openCircuitVoltageV <= 1.28, `OCV (${resBalanced.openCircuitVoltageV} V) must be 1.15-1.28 V`);
assert(resBalanced.operatingChargeVoltageV >= 1.25 && resBalanced.operatingChargeVoltageV <= 1.48, `Charge voltage (${resBalanced.operatingChargeVoltageV} V) must be 1.25-1.48 V`);
assert(resBalanced.operatingDischargeVoltageV >= 0.95 && resBalanced.operatingDischargeVoltageV <= 1.18, `Discharge voltage (${resBalanced.operatingDischargeVoltageV} V) must be 0.95-1.18 V`);
assert(resBalanced.roundTripEfficiencyPercent >= 68.0 && resBalanced.roundTripEfficiencyPercent <= 86.0, `RTE (${resBalanced.roundTripEfficiencyPercent}%) must be 68-86%`);

// Proton rebalancer verification
assert.strictEqual(resBalanced.rebalancerMetrics.isStateOfChargeBalanced, true, 'Rebalancer must balance SOC');
assert(resBalanced.rebalancerMetrics.protonRegenerationRateMolesPerHour > 0, 'Must regenerate protons via catalytic H2 oxidation');
assert(resBalanced.rebalancerMetrics.socDriftPerHourPercent <= 0.05, 'SOC drift must be negligible with rebalancer');

// Unbalanced case
const conditionsUnbalanced = { ...conditionsBalanced, hasProtonRebalancer: false };
const resUnbalanced = AllIronFlowBatteryEngine.calculateElectrochemicalPerformance(conditionsUnbalanced);
assert.strictEqual(resUnbalanced.rebalancerMetrics.isStateOfChargeBalanced, false, 'Unbalanced flag must be false');
assert(resUnbalanced.rebalancerMetrics.socDriftPerHourPercent > 0.30, 'SOC drift must be noticeable without rebalancer');

console.log(`  ✓ Performance: OCV = ${resBalanced.openCircuitVoltageV} V, V_chg = ${resBalanced.operatingChargeVoltageV} V, V_dis = ${resBalanced.operatingDischargeVoltageV} V, RTE = ${resBalanced.roundTripEfficiencyPercent}%, Rebalancer rate = ${resBalanced.rebalancerMetrics.protonRegenerationRateMolesPerHour} mol H+/hr.`);

// 3. Verify Grid Storage Plant (500 kW / 6 MWh - 12h LDES)
console.log('  3. Verifying Grid Storage Plant Design (500 kW / 6 MWh - 12h LDES)...');
const plant = AllIronFlowBatteryEngine.designGridStoragePlant(500.0, 12.0, 'ALL_CHLORIDE_SLURRY');

assert.strictEqual(plant.plantPowerKw, 500.0, 'Plant power must be 500 kW');
assert.strictEqual(plant.storageDurationHours, 12.0, 'Storage duration must be 12 hours');
assert.strictEqual(plant.totalStorageCapacityKwh, 6000.0, 'Capacity must be 6,000 kWh');
assert.strictEqual(plant.totalStacksCount, 10, 'Must use 10 modular 50 kW stacks');
assert(plant.capitalCostDollarPerKwh <= 200.0, `CapEx (${plant.capitalCostDollarPerKwh} $/kWh) must be <= $200/kWh for 12h`);
assert(plant.annualElectricityDischargedMwh >= 1200.0, `Annual discharge (${plant.annualElectricityDischargedMwh} MWh) must exceed 1,200 MWh`);
assert(plant.avoidedGridCo2TonsPerYear >= 600.0, `Avoided CO2 (${plant.avoidedGridCo2TonsPerYear} tons) must exceed 600 tons`);
assert.strictEqual(plant.unlimitedCycleLifeGuaranteed, true, 'Must guarantee unlimited cycle life with zero chemical degradation');

console.log(`  ✓ Grid Plant: 500 kW / 6 MWh (10 stacks), CapEx = $${plant.capitalCostDollarPerKwh}/kWh ($${plant.totalCapExDollar}), Annual = ${plant.annualElectricityDischargedMwh} MWh, Avoided CO2 = ${plant.avoidedGridCo2TonsPerYear} tons/yr.`);

console.log('🎉 Test Suite 334 Passed (3/3 assertion groups clean)!');
