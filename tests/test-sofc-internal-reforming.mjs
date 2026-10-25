/**
 * test-sofc-internal-reforming.mjs
 *
 * Test Suite 318: High-Temperature Solid Oxide Fuel Cell (SOFC) Engine
 * Validates direct internal reforming, O2- ionic conduction, and CHP energy balance.
 */

import assert from 'assert';
import {
  SOFC_FUEL_CATALOG,
  ELECTROLYTE_CATALOG,
  calculateSofcCellPerformance,
  calculateSofcChpPlantBalance
} from '../src/domain/sofcInternalReformingEngine.ts';

console.log('🧪 Running Test Suite 318: Solid Oxide Fuel Cell (SOFC) Engine...');

// 1. Verify Fuels & Electrolytes Catalogs
console.log('  1. Verifying Fuel Feedstocks and Solid Oxide Electrolytes...');
assert(SOFC_FUEL_CATALOG.NATURAL_GAS_METHANE, 'Methane fuel config must exist');
assert(SOFC_FUEL_CATALOG.BIO_METHANOL, 'Bio-methanol fuel config must exist');
assert(ELECTROLYTE_CATALOG.YSZ_OXYGEN_ION, 'YSZ electrolyte must exist');
assert(ELECTROLYTE_CATALOG.PROTONIC_CERAMIC_PCFC, 'Protonic ceramic PCFC must exist');
assert.strictEqual(ELECTROLYTE_CATALOG.YSZ_OXYGEN_ION.conductingIon, 'O2-');
assert.strictEqual(ELECTROLYTE_CATALOG.PROTONIC_CERAMIC_PCFC.conductingIon, 'H+');
console.log('  ✓ Catalogs and ionic species verified.');

// 2. Verify Electrochemical Cell Performance & Internal Reforming
console.log('  2. Verifying Cell Polarization, Ohmic/Activation Overpotentials & Reforming...');
const cellMethane = calculateSofcCellPerformance('NATURAL_GAS_METHANE', 'YSZ_OXYGEN_ION', 750.0, 500.0, 2.5);
assert(cellMethane.openCircuitVoltageV >= 0.95 && cellMethane.openCircuitVoltageV <= 1.15, `OCV should be 0.95-1.15 V, got ${cellMethane.openCircuitVoltageV} V`);
assert(cellMethane.operatingCellVoltageV >= 0.65 && cellMethane.operatingCellVoltageV <= 0.85, `Operating voltage should be 0.65-0.85 V at 500 mA/cm2, got ${cellMethane.operatingCellVoltageV} V`);
assert(cellMethane.powerDensityWcm2 >= 0.30 && cellMethane.powerDensityWcm2 <= 0.50, `Power density should be 0.3-0.5 W/cm2, got ${cellMethane.powerDensityWcm2} W/cm2`);
assert(cellMethane.electricalEfficiencyLhvPct >= 45.0 && cellMethane.electricalEfficiencyLhvPct <= 65.0, `LHV electrical efficiency should be 45-65%, got ${cellMethane.electricalEfficiencyLhvPct}%`);
assert(cellMethane.internalReformingExtentPct >= 80.0, `SMR extent at 750°C should exceed 80%, got ${cellMethane.internalReformingExtentPct}%`);
assert(cellMethane.heatAbsorptionRatioPct >= 60.0, `Endothermic reforming should absorb >= 60% of cell waste heat, got ${cellMethane.heatAbsorptionRatioPct}%`);
assert.strictEqual(cellMethane.isCokingRisk, false, 'S/C = 2.5 must not exhibit coking risk');

// Check coking risk detection with low S/C = 1.0 (< 2.0 minimum)
const cokingTest = calculateSofcCellPerformance('NATURAL_GAS_METHANE', 'YSZ_OXYGEN_ION', 750.0, 500.0, 1.0);
assert.strictEqual(cokingTest.isCokingRisk, true, 'S/C = 1.0 must trigger coking warning');

console.log(`  ✓ Cell Performance: OCV = ${cellMethane.openCircuitVoltageV} V, V_cell = ${cellMethane.operatingCellVoltageV} V, Power = ${cellMethane.powerDensityWcm2} W/cm2, Eff = ${cellMethane.electricalEfficiencyLhvPct}%, Reforming = ${cellMethane.internalReformingExtentPct}%.`);

// 3. Verify Combined Heat & Power (CHP) Multi-Cell Plant Balance
console.log('  3. Verifying 500 kWe SOFC Tri-Generation CHP Plant Balance...');
const plant = calculateSofcChpPlantBalance(500.0, 'NATURAL_GAS_METHANE', 750.0);
assert.strictEqual(plant.netElectricalPowerKw, 500.0, 'Rated electrical output must be 500 kW');
assert(plant.cellCount >= 3000 && plant.cellCount <= 6000, `Cell count should be 3,000-6,000, got ${plant.cellCount}`);
assert(plant.totalChpEfficiencyPct >= 80.0 && plant.totalChpEfficiencyPct <= 92.0, `Total CHP efficiency should be 80-92%, got ${plant.totalChpEfficiencyPct}%`);
assert(plant.recoverableHighGradeHeatKw >= 180.0 && plant.recoverableHighGradeHeatKw <= 350.0, `Recoverable heat should be 180-350 kW, got ${plant.recoverableHighGradeHeatKw} kW`);
assert(plant.avoidedGridCo2TonsYear >= 500, `Avoided grid CO2 should exceed 500 t/yr, got ${plant.avoidedGridCo2TonsYear} t/yr`);

console.log(`  ✓ 500 kWe CHP Plant: Cell Count = ${plant.cellCount}, Net Elec = ${plant.netElectricalPowerKw} kWe, Heat = ${plant.recoverableHighGradeHeatKw} kWth, Total CHP Eff = ${plant.totalChpEfficiencyPct}%, Avoided CO2 = ${plant.avoidedGridCo2TonsYear} t/yr.`);

console.log('🎉 Test Suite 318 PASSED: Solid Oxide Fuel Cell (SOFC) Engine is 100% verified!');
