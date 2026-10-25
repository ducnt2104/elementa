// tests/test-electrostatic-supercapacitor.mjs
// Test Suite 360: Electrostatic Supercapacitor Energy Storage with Graphene Hybrid Electrodes
import assert from 'assert';
import {
  SUPERCAPACITOR_ELECTROLYTES,
  SUPERCAPACITOR_ELECTRODES,
  calculateRagonePerformance,
  sizeRegenerativeBrakingSystem
} from '../src/domain/electrostaticSupercapacitorEngine.ts';

console.log('🧪 Running Test Suite 360: Electrostatic Supercapacitor Engine...');

// 1. Verifying Electrolyte and Electrode Catalog
console.log('  1. Verifying Electrolyte and Electrode Catalog...');
assert.ok(SUPERCAPACITOR_ELECTROLYTES.ORGANIC_ACN_TEABF4, 'Acetonitrile organic electrolyte must exist');
assert.ok(SUPERCAPACITOR_ELECTROLYTES.ORGANIC_ACN_TEABF4.nominalCellVoltageV >= 2.8, 'Organic cell voltage must be >= 2.8 V');
assert.ok(SUPERCAPACITOR_ELECTROLYTES.IONIC_LIQUID_EMIM_TFSI.nominalCellVoltageV >= 3.8, 'Ionic liquid voltage must reach 3.8 V');

assert.ok(SUPERCAPACITOR_ELECTRODES.HIERARCHICAL_GRAPHENE, 'Hierarchical graphene electrode must exist');
assert.ok(SUPERCAPACITOR_ELECTRODES.HIERARCHICAL_GRAPHENE.betSurfaceAreaM2PerG >= 2500, 'Graphene BET surface area must be >= 2,500 m2/g');
assert.ok(SUPERCAPACITOR_ELECTRODES.HIERARCHICAL_GRAPHENE.cycleLifeMillionCycles >= 1.0, 'Cycle life must reach >= 1.0 million cycles');
console.log('  ✓ Catalogs verified: High-voltage electrolytes (3.8V) and Hierarchical 3D Graphene confirmed.');

// 2. Verifying Ragone Performance & Specific Power
console.log('  2. Verifying Ragone Performance & Specific Power...');
const pt5s = calculateRagonePerformance('HIERARCHICAL_GRAPHENE', 'ORGANIC_ACN_TEABF4', 5.0);
const pt0_5s = calculateRagonePerformance('HIERARCHICAL_GRAPHENE', 'ORGANIC_ACN_TEABF4', 0.5);

assert.ok(pt5s.specificEnergyWhPerKg > 15.0 && pt5s.specificEnergyWhPerKg < 45.0, `Specific energy (${pt5s.specificEnergyWhPerKg.toFixed(1)} Wh/kg) must be 15 - 45 Wh/kg`);
assert.ok(pt5s.specificPowerKWPerKg > 10.0, `Specific power at 5s (${pt5s.specificPowerKWPerKg.toFixed(1)} kW/kg) must exceed 10 kW/kg`);
assert.ok(pt0_5s.specificPowerKWPerKg > 100.0, `Specific power at 0.5s (${pt0_5s.specificPowerKWPerKg.toFixed(1)} kW/kg) must exceed 100 kW/kg`);
assert.ok(pt5s.roundTripEnergyEfficiencyPercent > 90.0, `RTE (${pt5s.roundTripEnergyEfficiencyPercent.toFixed(1)}%) must exceed 90%`);
console.log(`  ✓ Ragone Performance: E_spec(5s) = ${pt5s.specificEnergyWhPerKg.toFixed(1)} Wh/kg, P_spec(5s) = ${pt5s.specificPowerKWPerKg.toFixed(1)} kW/kg, Pulse Power(0.5s) = ${pt0_5s.specificPowerKWPerKg.toFixed(1)} kW/kg, Max Matched Power = ${pt5s.maxMatchedImpedancePowerKWPerKg.toFixed(0)} kW/kg.`);

// 3. Verifying Transit Regenerative Braking Sizing (220-ton Metro Train)
console.log('  3. Verifying Transit Regenerative Braking Sizing (220-ton Metro Train)...');
const metro = sizeRegenerativeBrakingSystem('METRO_TRAIN', 'HIERARCHICAL_GRAPHENE', 'ORGANIC_ACN_TEABF4');
assert.strictEqual(metro.vehicleMassTons, 220.0);
assert.strictEqual(metro.initialSpeedKmh, 80.0);
assert.ok(metro.kineticEnergyKWh > 12.0 && metro.kineticEnergyKWh < 20.0, `Kinetic energy (${metro.kineticEnergyKWh.toFixed(1)} kWh) must be 12 - 20 kWh`);
assert.ok(metro.peakBrakingPowerKW > 2500, `Peak braking power (${metro.peakBrakingPowerKW.toFixed(0)} kW) must exceed 2,500 kW`);
assert.ok(metro.supercapacitorBankCapacitanceF > 150.0, `Bank capacitance (${metro.supercapacitorBankCapacitanceF.toFixed(1)} F) must exceed 150 F at 750 V`);
assert.ok(metro.annualElectricitySavedKWh > 800000, `Annual electricity saved (${metro.annualElectricitySavedKWh.toFixed(0)} kWh) must exceed 800,000 kWh`);
assert.ok(metro.annualElectricityCostSavedUSD > 100000, `Annual electricity cost saved ($${metro.annualElectricityCostSavedUSD.toFixed(0)}) must exceed $100,000`);
console.log(`  ✓ Metro Train Regenerative Braking: Kinetic Energy = ${metro.kineticEnergyKWh.toFixed(1)} kWh, Peak Power = ${metro.peakBrakingPowerKW.toFixed(0)} kW, Bank = ${metro.supercapacitorBankCapacitanceF.toFixed(1)} F (${metro.supercapacitorBankMassKg.toFixed(0)} kg), Annual Savings = $${metro.annualElectricityCostSavedUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}/year, Avoided CO2 = ${metro.annualAvoidedCO2Tons.toFixed(1)} tons/yr.`);

console.log('🎉 Test Suite 360 Passed (3/3 assertion groups clean)!');
