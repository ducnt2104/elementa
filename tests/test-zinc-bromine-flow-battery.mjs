/**
 * test-zinc-bromine-flow-battery.mjs
 *
 * Test Suite 328: Zinc-Bromine Flow Battery (Zn-Br) Two-Phase Polybromide Complexation Engine
 * Validates Q-Br complexation equilibrium, Sand's transition time dendrite safety, and substation plant design.
 */

import assert from 'assert';
import {
  ZN_BR_COMPLEXING_AGENTS,
  ZincBromineFlowBatteryEngine
} from '../src/domain/zincBromineFlowBatteryEngine.ts';

console.log('🧪 Running Test Suite 328: Zinc-Bromine Flow Battery (Zn-Br) Engine...');

// 1. Verify Complexing Agents Catalog (MEP-Br, MEM-Br, DMMP-Br)
console.log('  1. Verifying Quaternary Ammonium Complexing Agents (MEP-Br, MEM-Br, DMMP-Br)...');
assert(ZN_BR_COMPLEXING_AGENTS.MEP_BROMIDE, 'MEP-Br must exist');
assert(ZN_BR_COMPLEXING_AGENTS.MEM_BROMIDE, 'MEM-Br must exist');
assert(ZN_BR_COMPLEXING_AGENTS.DMMP_BROMIDE, 'DMMP-Br must exist');

assert(ZN_BR_COMPLEXING_AGENTS.MEP_BROMIDE.complexationEfficiencyPercent >= 98.0, 'MEP-Br complexation must exceed 98%');
assert(ZN_BR_COMPLEXING_AGENTS.MEP_BROMIDE.polybromideOilDensityGPerCm3 > 2.0, 'Polybromide oil density must exceed 2.0 g/cm3 to sink');
assert(ZN_BR_COMPLEXING_AGENTS.MEP_BROMIDE.aqueousFreeBr2Ppm < 150, 'Aqueous free Br2 must be buffered below 150 ppm');
console.log('  ✓ Complexing agents catalog and phase properties verified.');

// 2. Verify Electrochemical Performance, High Cell Voltage (1.84V) & Polybromide Separation
console.log('  2. Verifying Cell Polarization, Overpotentials & Polybromide Phase Separation...');
const electroNormal = ZincBromineFlowBatteryEngine.calculateElectrochemicalPerformance({
  complexingAgent: 'MEP_BROMIDE',
  stateOfCharge: 0.60,
  temperatureC: 25.0,
  currentDensityMaPerCm2: 45.0, // 45 mA/cm2
  electrolyteFlowRateLMin: 3.5,
  znBr2SaltConcentrationMolar: 2.5,
  electrodeAreaCm2: 1000.0,
  membraneTypeVi: 'Daramic Microporous Polyolefin'
});

assert(electroNormal.openCircuitVoltageV >= 1.80 && electroNormal.openCircuitVoltageV <= 1.88, `Nominal OCV should be 1.80-1.88 V, got ${electroNormal.openCircuitVoltageV} V`);
assert(electroNormal.operatingDischargeVoltageV >= 1.45 && electroNormal.operatingDischargeVoltageV <= 1.75, `Operating discharge voltage should be 1.45-1.75 V, got ${electroNormal.operatingDischargeVoltageV} V`);
assert(electroNormal.operatingChargeVoltageV >= 1.95 && electroNormal.operatingChargeVoltageV <= 2.25, `Operating charge voltage should be 1.95-2.25 V, got ${electroNormal.operatingChargeVoltageV} V`);
assert(electroNormal.polybromidePhaseSeparation.oilPhaseVolumePercent >= 8.0, `Polybromide oil phase should be >= 8% at 60% SOC, got ${electroNormal.polybromidePhaseSeparation.oilPhaseVolumePercent}%`);
assert(electroNormal.polybromidePhaseSeparation.aqueousFreeBromineConcentrationPpm <= 120, `Free Br2 in water must be <= 120 ppm, got ${electroNormal.polybromidePhaseSeparation.aqueousFreeBromineConcentrationPpm} ppm`);
assert(electroNormal.zincMorphologyAndDendriteSafety.dendriteGrowthRisk === 'SAFE_FLAT_PLATING', 'At 45 mA/cm2 zinc plating must be safe and flat');

console.log(`  ✓ Performance: OCV = ${electroNormal.openCircuitVoltageV} V, V_dis = ${electroNormal.operatingDischargeVoltageV} V, V_chg = ${electroNormal.operatingChargeVoltageV} V, Oil Volume = ${electroNormal.polybromidePhaseSeparation.oilPhaseVolumePercent}%, Free Br₂ = ${electroNormal.polybromidePhaseSeparation.aqueousFreeBromineConcentrationPpm} ppm, Dendrite Safety = ${electroNormal.zincMorphologyAndDendriteSafety.dendriteGrowthRisk}.`);

// 3. Verify Sand's Transition Time & High Current Dendrite Threshold
console.log('  3. Verifying Sand\'s Transition Time & High Current Dendrite Alert...');
const electroHighCurrent = ZincBromineFlowBatteryEngine.calculateElectrochemicalPerformance({
  complexingAgent: 'MEP_BROMIDE',
  stateOfCharge: 0.60,
  temperatureC: 25.0,
  currentDensityMaPerCm2: 210.0, // High current density near limit
  electrolyteFlowRateLMin: 3.5,
  znBr2SaltConcentrationMolar: 2.5,
  electrodeAreaCm2: 1000.0,
  membraneTypeVi: 'Daramic Microporous Polyolefin'
});
assert.strictEqual(
  electroHighCurrent.zincMorphologyAndDendriteSafety.dendriteGrowthRisk,
  'DENDRITE_SHORT_CIRCUIT_RISK',
  'At 210 mA/cm2 dendrite risk must be triggered'
);
assert(electroHighCurrent.zincMorphologyAndDendriteSafety.sandsTransitionTimeSeconds > 0, 'Sand time must be positive');
console.log(`  ✓ Dendrite Safety: Sand's Transition Time = ${electroHighCurrent.zincMorphologyAndDendriteSafety.sandsTransitionTimeSeconds} s, Alert = ${electroHighCurrent.zincMorphologyAndDendriteSafety.dendriteGrowthRisk}.`);

// 4. Verify 500 kW / 2 MWh Substation Unit Plant Design
console.log('  4. Verifying 500 kW / 2 MWh Commercial Substation Plant Design...');
const plant = ZincBromineFlowBatteryEngine.designSubstationStoragePlant(500.0, 4.0, 'MEP_BROMIDE');
assert.strictEqual(plant.ratedPowerKw, 500.0, 'Rated power must be 500 kW');
assert.strictEqual(plant.storageDurationHours, 4.0, 'Storage duration must be 4 h');
assert.strictEqual(plant.totalCapacityKwh, 2000.0, 'Total capacity must be 2,000 kWh');
assert(plant.totalZincInventoryKg >= 1500 && plant.totalZincInventoryKg <= 4000, `Zinc inventory should be 1,500-4,000 kg, got ${plant.totalZincInventoryKg} kg`);
assert(plant.totalBromineInventoryKg >= 4000 && plant.totalBromineInventoryKg <= 10000, `Bromine inventory should be 4,000-10,000 kg, got ${plant.totalBromineInventoryKg} kg`);
assert(plant.capitalCostPerKwhUsd <= 230, `Capital cost must be <= $230/kWh, got $${plant.capitalCostPerKwhUsd}/kWh`);
assert(plant.cycleLifeWithStrippingLimit >= 10000, 'Cycle life with stripping must be >= 10,000 cycles');
assert(plant.avoidedPeakerCo2TonsPerYear >= 400, `Avoided peaker CO2 must be >= 400 tons/yr, got ${plant.avoidedPeakerCo2TonsPerYear} tons/yr`);

console.log(`  ✓ Substation Unit: 500 kW / 2 MWh, ${plant.stackModuleCount} Stack Modules (${plant.totalCellCount} Cells), Zinc = ${plant.totalZincInventoryKg} kg, Bromine = ${plant.totalBromineInventoryKg} kg, Polybromide Reservoir = ${plant.polybromideOilReservoirLiters} L, CapEx = $${plant.totalCapExUsd} ($${plant.capitalCostPerKwhUsd}/kWh), Avoided CO₂ = ${plant.avoidedPeakerCo2TonsPerYear} t/yr.`);
console.log('🎉 Test Suite 328 Passed (4/4 assertion groups clean)!');
