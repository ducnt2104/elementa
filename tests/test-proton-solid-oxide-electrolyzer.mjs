/**
 * test-proton-solid-oxide-electrolyzer.mjs
 *
 * Test Suite 326: Proton-Conducting Solid Oxide Electrolysis Cells (P-SOEC) Engine
 * Validates Kröger-Vink hydration defect equilibrium, pure dry cathode syngas generation, and power-to-syngas efficiency.
 */

import assert from 'assert';
import {
  PSOEC_ELECTROLYTE_CATALOG,
  ProtonSolidOxideElectrolyzerEngine
} from '../src/domain/protonSolidOxideElectrolyzerEngine.ts';

console.log('🧪 Running Test Suite 326: Proton Solid Oxide Electrolyzer (P-SOEC) Engine...');

// 1. Verify Electrolyte Perovskite Catalog
console.log('  1. Verifying Perovskite Electrolyte Catalog (BZCYYb, BZY20, BCZY)...');
assert(PSOEC_ELECTROLYTE_CATALOG.BZCYYB_PEROVSKITE, 'BZCYYb electrolyte must exist');
assert(PSOEC_ELECTROLYTE_CATALOG.BZY20_YTTRIUM, 'BZY20 electrolyte must exist');
assert(PSOEC_ELECTROLYTE_CATALOG.BCZY_CERIUM, 'BCZY electrolyte must exist');

assert(PSOEC_ELECTROLYTE_CATALOG.BZCYYB_PEROVSKITE.protonConductivitySPerCm >= 0.020, 'BZCYYb proton conductivity should be >= 0.020 S/cm');
assert(PSOEC_ELECTROLYTE_CATALOG.BZY20_YTTRIUM.areaSpecificResistanceOhmCm2 < 0.15, 'BZY20 thin film ASR should be < 0.15 Ohm*cm2');
console.log('  ✓ Perovskite catalog and proton transport properties verified.');

// 2. Verify Kröger-Vink Hydration & Electrochemical Performance
console.log('  2. Verifying Kröger-Vink Hydration Equilibrium & Dry Cathode Product Generation...');
const electroNormal = ProtonSolidOxideElectrolyzerEngine.calculateElectrochemicalPerformance({
  electrolyte: 'BZCYYB_PEROVSKITE',
  temperatureC: 550.0,
  currentDensityA: 1.0, // 1 A/cm2
  steamPartialPressureBar: 0.8,
  co2CathodeFeedRatio: 0.5,
  operatingPressureBar: 1.0,
  cellActiveAreaCm2: 550.0,
  targetSyngasH2ToCoRatio: 2.0
});

assert(electroNormal.thermodynamicNernstReversiblePotentialV >= 0.95 && electroNormal.thermodynamicNernstReversiblePotentialV <= 1.15, `Reversible potential should be 0.95-1.15 V, got ${electroNormal.thermodynamicNernstReversiblePotentialV} V`);
assert(electroNormal.thermoneutralVoltageV >= 1.25 && electroNormal.thermoneutralVoltageV <= 1.35, `Thermoneutral voltage should be 1.25-1.35 V, got ${electroNormal.thermoneutralVoltageV} V`);
assert(electroNormal.operatingCellElectrolysisVoltageV >= 1.15 && electroNormal.operatingCellElectrolysisVoltageV <= 1.55, `Electrolysis cell voltage should be 1.15-1.55 V at 1.0 A/cm2, got ${electroNormal.operatingCellElectrolysisVoltageV} V`);
assert(electroNormal.protonHydrationMetrics.hydrationExtentPercent >= 50.0, `Hydration extent should exceed 50%, got ${electroNormal.protonHydrationMetrics.hydrationExtentPercent}%`);
assert.strictEqual(electroNormal.protonHydrationMetrics.dryCathodeSyngasPurityPercent, 100.0, 'P-SOEC cathode must produce 100% dry syngas un-diluted with steam');
assert(electroNormal.faradaicEfficiencies.totalFaradaicPercent >= 95.0, `Total Faradaic efficiency should be >= 95%, got ${electroNormal.faradaicEfficiencies.totalFaradaicPercent}%`);

console.log(`  ✓ Performance: E_rev = ${electroNormal.thermodynamicNernstReversiblePotentialV} V, V_cell = ${electroNormal.operatingCellElectrolysisVoltageV} V, Power = ${electroNormal.electricalPowerDensityWPerCm2} W/cm2, Hydration = ${electroNormal.protonHydrationMetrics.hydrationExtentPercent}%, Dry Syngas = ${electroNormal.protonHydrationMetrics.dryCathodeSyngasPurityPercent}%.`);

// 3. Verify Power-to-Syngas Industrial Modular Plant Design (10 MW)
console.log('  3. Verifying 10 MW Power-to-Syngas Plant & E-Methanol Downstream Synthesis...');
const plant = ProtonSolidOxideElectrolyzerEngine.designPowerToSyngasPlant(10.0, {
  electrolyte: 'BZCYYB_PEROVSKITE',
  temperatureC: 550.0,
  currentDensityA: 1.2,
  steamPartialPressureBar: 0.8,
  co2CathodeFeedRatio: 0.55,
  operatingPressureBar: 5.0,
  cellActiveAreaCm2: 550.0,
  targetSyngasH2ToCoRatio: 2.0
});

assert.strictEqual(plant.plantElectricalPowerMw, 10.0, 'Plant electrical power must be 10 MW');
assert(plant.h2ProductionKgPerHour >= 120 && plant.h2ProductionKgPerHour <= 350, `H2 production should be 120-350 kg/h, got ${plant.h2ProductionKgPerHour} kg/h`);
assert(plant.coProductionKgPerHour >= 700 && plant.coProductionKgPerHour <= 2500, `CO production should be 700-2500 kg/h, got ${plant.coProductionKgPerHour} kg/h`);
assert(plant.syngasVolumeNm3PerHour >= 2000 && plant.syngasVolumeNm3PerHour <= 4500, `Syngas volume should be 2,000-4,500 Nm3/h, got ${plant.syngasVolumeNm3PerHour} Nm3/h`);
assert(plant.powerToSyngasLhvEfficiencyPercent >= 70.0 && plant.powerToSyngasLhvEfficiencyPercent <= 92.0, `LHV efficiency should be 70-92%, got ${plant.powerToSyngasLhvEfficiencyPercent}%`);
assert(plant.annualCo2UtilizedTons >= 8000, `Annual CO2 utilized should be >= 8,000 tons/yr, got ${plant.annualCo2UtilizedTons} tons/yr`);

console.log(`  ✓ 10 MW Plant: ${plant.stackCellCount} cells, ${plant.h2ProductionKgPerHour} kg H₂/h, ${plant.coProductionKgPerHour} kg CO/h (${plant.syngasVolumeNm3PerHour} Nm³/h Syngas, H₂:CO = ${plant.actualSyngasH2ToCoRatio}), LHV Eff = ${plant.powerToSyngasLhvEfficiencyPercent}%, Annual CO₂ Utilized = ${plant.annualCo2UtilizedTons} t/yr.`);
console.log('🎉 Test Suite 326 Passed (3/3 assertion groups clean)!');
