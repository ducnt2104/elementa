/**
 * test-iron-air-battery.mjs
 *
 * Test Suite 316: Iron-Air Long-Duration Energy Storage Battery (Fe-Air) Engine
 * Validates reversible rusting electrochemistry, additive HER suppression, and 100-hour grid balance.
 */

import assert from 'assert';
import {
  IRON_ADDITIVE_CATALOG,
  FE_THEORETICAL_CAPACITY_MAH_G,
  calculateFeAirCellState,
  calculateFeAirGridPlantBalance
} from '../src/domain/ironAirBatteryEngine.ts';

console.log('🧪 Running Test Suite 316: Iron-Air Long-Duration Energy Storage Battery Engine...');

// 1. Verify Additives Catalog and Constants
console.log('  1. Verifying Iron Additives Catalog and Theoretical Capacities...');
assert(FE_THEORETICAL_CAPACITY_MAH_G >= 950 && FE_THEORETICAL_CAPACITY_MAH_G <= 970, `Fe theoretical capacity should be ~ 960 mAh/g, got ${FE_THEORETICAL_CAPACITY_MAH_G}`);
assert(IRON_ADDITIVE_CATALOG.BISMUTH_OXIDE, 'Bismuth oxide additive must exist');
assert(IRON_ADDITIVE_CATALOG.TIN_OXIDE_SULFIDE, 'Tin oxide sulfide additive must exist');
assert(IRON_ADDITIVE_CATALOG.BISMUTH_OXIDE.herOverpotentialBoostMv >= 200, 'Bi2O3 must boost HER overpotential by >= 200 mV');
console.log('  ✓ Catalogs and constants verified.');

// 2. Verify Electrochemical Cell State and HER Suppression
console.log('  2. Verifying Electrochemical Cell State & HER Suppression...');
const stateBi = calculateFeAirCellState(75.0, 20.0, 25.0, 'BISMUTH_OXIDE');
assert(stateBi.cellOpenCircuitVoltageV >= 1.25 && stateBi.cellOpenCircuitVoltageV <= 1.30, `OCV should be ~ 1.28 V, got ${stateBi.cellOpenCircuitVoltageV}`);
assert(stateBi.dischargeCellVoltageV >= 0.85 && stateBi.dischargeCellVoltageV <= 1.05, `Discharge voltage under 20 mA/cm2 should be 0.85-1.05 V, got ${stateBi.dischargeCellVoltageV}`);
assert(stateBi.chargeCellVoltageV >= 1.55 && stateBi.chargeCellVoltageV <= 1.85, `Charge voltage should be 1.55-1.85 V, got ${stateBi.chargeCellVoltageV}`);
assert(stateBi.herCurrentFractionPct < 10.0, `HER fraction with Bi2O3 should be suppressed < 10%, got ${stateBi.herCurrentFractionPct}%`);
assert(stateBi.coulombicEfficiencyPct >= 90.0, `Coulombic efficiency should be >= 90%, got ${stateBi.coulombicEfficiencyPct}%`);
assert(stateBi.roundTripEnergyEfficiencyPct >= 45.0 && stateBi.roundTripEnergyEfficiencyPct <= 60.0, `Round trip efficiency should be 45-60%, got ${stateBi.roundTripEnergyEfficiencyPct}%`);
assert(stateBi.activeFeUtilizationPct >= 80.0, `Active Fe utilization should be >= 80%, got ${stateBi.activeFeUtilizationPct}%`);

console.log(`  ✓ Cell State: V_dis = ${stateBi.dischargeCellVoltageV} V, V_chg = ${stateBi.chargeCellVoltageV} V, HER = ${stateBi.herCurrentFractionPct}%, CE = ${stateBi.coulombicEfficiencyPct}%, RTE = ${stateBi.roundTripEnergyEfficiencyPct}%.`);

// 3. Verify Multi-Day 100-Hour Grid Scale Plant Balance
console.log('  3. Verifying 100-Hour Multi-Day Grid Storage Plant Balance...');
const plant = calculateFeAirGridPlantBalance(10.0, 100.0, 'BISMUTH_OXIDE'); // 10 MW / 1,000 MWh
assert.strictEqual(plant.totalStorageCapacityMwh, 1000, 'Total storage capacity must be 1,000 MWh');
assert(plant.costPerKwhUsd <= 30.0, `Cost per kWh must be <= $30/kWh, got $${plant.costPerKwhUsd}`);
assert(plant.installedCapitalCostUsd <= 30000000, `Installed capital cost must be <= $30M, got $${plant.installedCapitalCostUsd}`);
assert(plant.capitalCostSavingsUsd >= 200000000, `Capital savings vs Li-ion ($250M) should exceed $200M, got $${plant.capitalCostSavingsUsd}`);
assert(plant.requiredIronMassTons >= 1200 && plant.requiredIronMassTons <= 2500, `Iron mass for 1 GWh should be 1,200-2,500 tons, got ${plant.requiredIronMassTons} tons`);
assert(plant.annualAvoidedCo2Tons >= 20000, `Avoided CO2 from peaker displacement should exceed 20,000 t/yr, got ${plant.annualAvoidedCo2Tons} t/yr`);
assert.strictEqual(plant.calendarLifeYears, 30, 'Calendar life should be 30 years');

console.log(`  ✓ Grid Plant: 10 MW / 1,000 MWh at $${plant.costPerKwhUsd}/kWh (Total: $${plant.installedCapitalCostUsd.toLocaleString()}), Saving $${plant.capitalCostSavingsUsd.toLocaleString()} vs Li-ion, Avoided CO2 = ${plant.annualAvoidedCo2Tons.toLocaleString()} t/yr.`);

console.log('🎉 Test Suite 316 PASSED: Iron-Air Long-Duration Energy Storage Battery Engine is 100% verified!');
