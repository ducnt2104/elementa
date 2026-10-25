// tests/test-potassium-dual-ion-battery.mjs
// Test Suite 352: Dual-Ion Potassium-Graphite Battery (K-DIB) Ultra-Fast Grid Balancing
import assert from 'assert';
import {
  K_DIB_ELECTROLYTES,
  K_DIB_CATHODES,
  K_DIB_ANODES,
  calculateKDibCellVoltages,
  generateKDibRateCapability,
  sizeKDibFrequencyRegulationSystem
} from '../src/domain/potassiumDualIonBatteryEngine.ts';

console.log('🧪 Running Test Suite 352: Dual-Ion Potassium-Graphite Battery (K-DIB) Engine...');

// 1. Verifying Electrolyte, Cathode and Anode Catalogs
console.log('  1. Verifying Electrolyte, Cathode and Anode Catalogs...');
assert.ok(K_DIB_ELECTROLYTES.FLUORINATED_CARBONATE, 'Fluorinated carbonate electrolyte must exist');
assert.ok(K_DIB_ELECTROLYTES.FLUORINATED_CARBONATE.electrochemicalStabilityWindowV >= 5.0, 'Stability window must reach >= 5.0 V');
assert.ok(K_DIB_ELECTROLYTES.SUPERCONCENTRATED_ETHER.flammability === 'NON_FLAMMABLE', 'Superconcentrated ether must be NON_FLAMMABLE');

assert.ok(K_DIB_CATHODES.EXPANDED_GRAPHITE, 'Expanded graphite cathode must exist');
assert.ok(K_DIB_CATHODES.EXPANDED_GRAPHITE.maxChargeRateC >= 50, 'Expanded graphite must support >= 50C fast charge');
assert.ok(K_DIB_ANODES.HARD_CARBON, 'Hard carbon anode must exist');
assert.ok(K_DIB_ANODES.NATURAL_GRAPHITE.potassiumIntercalationCompound.includes('KC8'), 'Graphite anode must form KC8');
console.log('  ✓ Catalogs verified: High-voltage electrolytes, Expanded Graphite, and Hard Carbon confirmed.');

// 2. Verifying Dual-Ion Intercalation Staging & Cell Voltages
console.log('  2. Verifying Dual-Ion Intercalation Staging & Cell Voltages...');
const v100 = calculateKDibCellVoltages(100, 'FLUORINATED_CARBONATE', 'EXPANDED_GRAPHITE', 'HARD_CARBON');
const v50 = calculateKDibCellVoltages(50, 'FLUORINATED_CARBONATE', 'EXPANDED_GRAPHITE', 'HARD_CARBON');
const v0 = calculateKDibCellVoltages(0, 'FLUORINATED_CARBONATE', 'EXPANDED_GRAPHITE', 'HARD_CARBON');

assert.ok(v100.cellOpenCircuitVoltageV > 4.4 && v100.cellOpenCircuitVoltageV <= 5.0, `Cell OCV at 100% SOC (${v100.cellOpenCircuitVoltageV.toFixed(3)} V) must be in 4.4 - 5.0 V`);
assert.ok(v50.cellOpenCircuitVoltageV > 3.8 && v50.cellOpenCircuitVoltageV < 4.5, `Cell OCV at 50% SOC (${v50.cellOpenCircuitVoltageV.toFixed(3)} V) must be in 3.8 - 4.5 V`);
assert.ok(v0.cellOpenCircuitVoltageV >= 3.0 && v0.cellOpenCircuitVoltageV < 3.8, `Cell OCV at 0% SOC (${v0.cellOpenCircuitVoltageV.toFixed(3)} V) must be in 3.0 - 3.8 V`);

// Verify electrolyte salt depletion:
assert.ok(v100.residualElectrolyteConcentrationM < v0.residualElectrolyteConcentrationM, 'Salt must deplete during charge (100% SOC concentration < 0% SOC)');
assert.strictEqual(v100.residualElectrolyteConcentrationM, 0.65, '1.0 M salt should deplete to 0.65 M at 100% SOC');
assert.ok(v100.intercalationStage.includes('Stage 1'), '100% SOC must be Stage 1 intercalation');
console.log(`  ✓ Cell Voltages: 100% SOC = ${v100.cellOpenCircuitVoltageV.toFixed(3)} V (Stage 1), 50% SOC = ${v50.cellOpenCircuitVoltageV.toFixed(3)} V, Salt Depletion: 1.0 M ➔ ${v100.residualElectrolyteConcentrationM.toFixed(2)} M.`);

// 3. Verifying Ultra-Fast Rate Capability (1C to 60C)
console.log('  3. Verifying Ultra-Fast Rate Capability (1C to 60C)...');
const rateCurve = generateKDibRateCapability('FLUORINATED_CARBONATE', 'EXPANDED_GRAPHITE', [1, 10, 30, 60]);
assert.strictEqual(rateCurve.length, 4, 'Must return 4 rate capability points');

const pt1C = rateCurve[0];
const pt60C = rateCurve[3];

assert.ok(pt1C.capacityRetentionPercent >= 98.0, '1C retention must be >= 98%');
assert.strictEqual(pt60C.chargeTimeMinutes, 1.0, '60C must charge in 1.0 minute');
assert.ok(pt60C.capacityRetentionPercent >= 60.0, `60C retention (${pt60C.capacityRetentionPercent.toFixed(1)}%) must be >= 60%`);
assert.ok(pt60C.specificPowerWPerKg > 10000, `60C specific power (${pt60C.specificPowerWPerKg.toFixed(0)} W/kg) must exceed 10,000 W/kg`);
console.log(`  ✓ Rate Capability: 1C = ${pt1C.capacityRetentionPercent.toFixed(1)}%, 60C = ${pt60C.capacityRetentionPercent.toFixed(1)}% (1-minute ultra-fast charge, P_spec = ${pt60C.specificPowerWPerKg.toFixed(0)} W/kg).`);

// 4. Verifying Grid Frequency Regulation System Sizing
console.log('  4. Verifying Grid Frequency Regulation System Sizing...');
const regSystem = sizeKDibFrequencyRegulationSystem(20.0, 15.0, 'FLUORINATED_CARBONATE', 'EXPANDED_GRAPHITE');
assert.strictEqual(regSystem.targetGridPowerMW, 20.0, 'Grid power must be 20 MW');
assert.strictEqual(regSystem.packEnergyMWh, 5.0, '20 MW for 15 min must be 5.0 MWh');
assert.ok(regSystem.systemResponseTimeMs < 50.0, `Response time (${regSystem.systemResponseTimeMs} ms) must be < 50 ms for PJM RegD`);
assert.strictEqual(regSystem.criticalMetalsContentGrams, 0.0, 'Critical metals content must be 0.0 g (Cobalt-free & Nickel-free)');
assert.ok(regSystem.cellCapExUSDPerKWh <= 75.0, `Cell CapEx ($${regSystem.cellCapExUSDPerKWh}/kWh) must be <= $75/kWh`);
assert.ok(regSystem.annualGridAncillaryRevenueUSD > 3000000, `Ancillary revenue ($${regSystem.annualGridAncillaryRevenueUSD.toFixed(0)}) must exceed $3M/year`);
console.log(`  ✓ Frequency Regulation (20 MW / 5 MWh): Response Time = ${regSystem.systemResponseTimeMs} ms, Critical Metals = 0g, CapEx = $${regSystem.cellCapExUSDPerKWh}/kWh, Annual Revenue = $${regSystem.annualGridAncillaryRevenueUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}.`);

console.log('🎉 Test Suite 352 Passed (4/4 assertion groups clean)!');
