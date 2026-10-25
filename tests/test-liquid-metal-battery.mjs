/**
 * test-liquid-metal-battery.mjs
 *
 * Test Suite 324: Liquid Metal Battery (LMB) High-Temperature Density-Stratified Engine
 * Validates 3-liquid density stratification, liquid-liquid alloying kinetics, self-heating balance, and containerized LDES.
 */

import assert from 'assert';
import {
  LMB_CHEMISTRY_CATALOG,
  LiquidMetalBatteryEngine
} from '../src/domain/liquidMetalBatteryEngine.ts';

console.log('🧪 Running Test Suite 324: Liquid Metal Battery (LMB) Engine...');

// 1. Verify Chemistry Catalog and 3-Layer Density Hierarchy
console.log('  1. Verifying 3-Layer Density Stratification (Anode < Salt < Cathode)...');
assert(LMB_CHEMISTRY_CATALOG.MG_SB, 'Mg-Sb chemistry must exist');
assert(LMB_CHEMISTRY_CATALOG.LI_BI, 'Li-Bi chemistry must exist');
assert(LMB_CHEMISTRY_CATALOG.CA_SB, 'Ca-Sb chemistry must exist');

for (const key of Object.keys(LMB_CHEMISTRY_CATALOG)) {
  const spec = LMB_CHEMISTRY_CATALOG[key];
  assert(
    spec.anodeLayer.densityGPerCm3 < spec.electrolyteLayer.densityGPerCm3,
    `${key}: Anode must float on top of electrolyte (${spec.anodeLayer.densityGPerCm3} < ${spec.electrolyteLayer.densityGPerCm3})`
  );
  assert(
    spec.electrolyteLayer.densityGPerCm3 < spec.cathodeLayer.densityGPerCm3,
    `${key}: Electrolyte must float on top of cathode (${spec.electrolyteLayer.densityGPerCm3} < ${spec.cathodeLayer.densityGPerCm3})`
  );
  assert(spec.cycleLifeLimit >= 15000, `${key}: Cycle life must exceed 15,000 cycles`);
}
console.log('  ✓ 3-Layer density hierarchy verified across all 3 chemistries.');

// 2. Verify Electrochemical Performance, Fast Liquid Kinetics & Low Activation Overpotential
console.log('  2. Verifying Cell Alloying OCV, Overpotentials & High Current Density...');
const electroNormal = LiquidMetalBatteryEngine.calculateElectrochemicalPerformance({
  chemistry: 'CA_SB',
  temperatureC: 500.0,
  depthOfDischarge: 0.50,
  currentDensityMaPerCm2: 250.0,
  cellActiveAreaCm2: 400.0,
  ambientTemperatureC: 25.0,
  thermalInsulationConductivityWPerMK: 0.035
});

assert(electroNormal.openCircuitVoltageV >= 0.90 && electroNormal.openCircuitVoltageV <= 1.30, `OCV should be 0.90-1.30 V, got ${electroNormal.openCircuitVoltageV} V`);
assert(electroNormal.operatingDischargeVoltageV >= 0.80 && electroNormal.operatingDischargeVoltageV <= 1.15, `Discharge voltage should be 0.80-1.15 V, got ${electroNormal.operatingDischargeVoltageV} V`);
assert(electroNormal.overpotentials.activationV <= 0.010, `Liquid metal activation overpotential must be < 10 mV, got ${electroNormal.overpotentials.activationV} V`);
assert(electroNormal.powerDensityMwPerCm2 >= 180.0 && electroNormal.powerDensityMwPerCm2 <= 350.0, `Power density should be 180-350 mW/cm2, got ${electroNormal.powerDensityMwPerCm2} mW/cm2`);
assert(electroNormal.liquidInterfacesStability.densityGradientMaintained, 'Density gradient must be maintained');
assert.strictEqual(electroNormal.liquidInterfacesStability.marangoniConvectionRisk, 'STABLE', '250 mA/cm2 should be stable from Marangoni rupture');

console.log(`  ✓ Performance: OCV = ${electroNormal.openCircuitVoltageV} V, V_dis = ${electroNormal.operatingDischargeVoltageV} V, Activation η = ${electroNormal.overpotentials.activationV} V (liquid-fast!), Power = ${electroNormal.powerDensityMwPerCm2} mW/cm2.`);

// 3. Verify Self-Heating Thermal Maintenance Balance (Joulean Heat vs Ambient Loss)
console.log('  3. Verifying Self-Heating Thermal Balance (I^2*R vs Q_loss)...');
assert(electroNormal.selfHeatingThermalBalance.jouleanHeatGeneratedWatts > 0, 'Joule heat must be positive');
assert(electroNormal.selfHeatingThermalBalance.heatLossToAmbientWatts > 0, 'Heat loss must be positive');

// At high current density (400 mA/cm2), Joulian heat exceeds heat loss (Thermal Self-Sustaining)
const electroHighCurrent = LiquidMetalBatteryEngine.calculateElectrochemicalPerformance({
  chemistry: 'CA_SB',
  temperatureC: 500.0,
  depthOfDischarge: 0.50,
  currentDensityMaPerCm2: 450.0,
  cellActiveAreaCm2: 400.0,
  ambientTemperatureC: 25.0,
  thermalInsulationConductivityWPerMK: 0.035
});
assert.strictEqual(electroHighCurrent.selfHeatingThermalBalance.thermalSelfSustaining, true, 'At 450 mA/cm2 cell must be thermally self-sustaining');
console.log(`  ✓ Self-Heating: P_joule = ${electroHighCurrent.selfHeatingThermalBalance.jouleanHeatGeneratedWatts} W vs Q_loss = ${electroHighCurrent.selfHeatingThermalBalance.heatLossToAmbientWatts} W => Self-Sustaining without external heaters!`);

// 4. Verify 20-Foot ISO Containerized Grid Energy Storage System (1 MW / 4 MWh)
console.log('  4. Verifying 1 MW / 4 MWh ISO Containerized Grid System Design...');
const containerSystem = LiquidMetalBatteryEngine.designContainerizedGridSystem(1.0, 4.0, 'CA_SB');
assert.strictEqual(containerSystem.ratedPowerMw, 1.0, 'Rated power must be 1.0 MW');
assert.strictEqual(containerSystem.dischargeDurationHours, 4.0, 'Discharge duration must be 4 h');
assert.strictEqual(containerSystem.totalStorageCapacityMwh, 4.0, 'Total storage capacity must be 4 MWh');
assert(containerSystem.containerCount20Ft >= 3 && containerSystem.containerCount20Ft <= 6, `Container count should be 3-6, got ${containerSystem.containerCount20Ft}`);
assert(containerSystem.capitalCostPerKwhUsd <= 220, `Capital cost must be <= $220/kWh, got $${containerSystem.capitalCostPerKwhUsd}/kWh`);
assert(containerSystem.roundTripEfficiencyPercent >= 75.0, `RTE must be >= 75%, got ${containerSystem.roundTripEfficiencyPercent}%`);
assert(containerSystem.twentyYearCalendarDegradationPercent < 1.0, `20-year degradation must be < 1.0%, got ${containerSystem.twentyYearCalendarDegradationPercent}%`);
assert(containerSystem.avoidedPeakerCo2TonsPerYear >= 800, `Avoided peaker CO2 must be >= 800 tons/yr, got ${containerSystem.avoidedPeakerCo2TonsPerYear} tons/yr`);

console.log(`  ✓ Containerized Plant: 1 MW / 4 MWh, ${containerSystem.containerCount20Ft} ISO Containers, Total Weight = ${containerSystem.totalSystemWeightTons} t, CapEx = $${containerSystem.totalCapExMillionUsd}M ($${containerSystem.capitalCostPerKwhUsd}/kWh), 20-Year Degradation = ${containerSystem.twentyYearCalendarDegradationPercent}%, Avoided CO₂ = ${containerSystem.avoidedPeakerCo2TonsPerYear} t/yr.`);
console.log('🎉 Test Suite 324 Passed (4/4 assertion groups clean)!');
