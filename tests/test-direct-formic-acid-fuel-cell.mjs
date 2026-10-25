/**
 * test-direct-formic-acid-fuel-cell.mjs
 *
 * Test Suite 320: Direct Formic Acid Fuel Cell (DFAFC) Engine
 * Validates bimetallic electrocatalytic dehydrogenation, Donnan crossover exclusion, and portable balance.
 */

import assert from 'assert';
import {
  DFAFC_CATALYST_CATALOG,
  FORMIC_ACID_ENERGY_DENSITY_KWH_L,
  calculateDfafcCellPerformance,
  calculateDfafcPortablePowerBalance
} from '../src/domain/directFormicAcidFuelCellEngine.ts';

console.log('🧪 Running Test Suite 320: Direct Formic Acid Fuel Cell (DFAFC) Engine...');

// 1. Verify Catalysts Catalog & Constants
console.log('  1. Verifying Catalysts Catalog and Liquid Fuel Energy Density...');
assert(DFAFC_CATALYST_CATALOG.PALLADIUM_NANOPARTICLES_PD, 'Pd/C catalyst must exist');
assert(DFAFC_CATALYST_CATALOG.ORDERED_INTERMETALLIC_PT_BI, 'PtBi intermetallic must exist');
assert(DFAFC_CATALYST_CATALOG.ORDERED_INTERMETALLIC_PT_BI.directPathwaySelectivityPct >= 98.0, 'PtBi must exceed 98% direct selectivity');
assert(FORMIC_ACID_ENERGY_DENSITY_KWH_L >= 2.0, 'Liquid energy density must exceed 2.0 kWh/L');
console.log('  ✓ Catalysts and energy densities verified.');

// 2. Verify Cell Electrochemical Performance & Donnan Crossover Suppression
console.log('  2. Verifying Cell Polarization, Donnan Exclusion & Power Density...');
const cellState = calculateDfafcCellPerformance('ORDERED_INTERMETALLIC_PT_BI', 6.0, 50.0, 250.0);
assert(cellState.openCircuitVoltageV >= 1.05 && cellState.openCircuitVoltageV <= 1.25, `OCV should be 1.05-1.25 V, got ${cellState.openCircuitVoltageV} V`);
assert(cellState.operatingCellVoltageV >= 0.55 && cellState.operatingCellVoltageV <= 0.85, `Operating cell voltage should be 0.55-0.85 V at 250 mA/cm2, got ${cellState.operatingCellVoltageV} V`);
assert(cellState.powerDensityMwCm2 >= 130.0 && cellState.powerDensityMwCm2 <= 220.0, `Power density should be 130-220 mW/cm2, got ${cellState.powerDensityMwCm2} mW/cm2`);
assert(cellState.crossoverDonnanExclusionPct >= 80.0, `Donnan exclusion of formate ions should exceed 80%, got ${cellState.crossoverDonnanExclusionPct}%`);
assert(cellState.fuelCrossoverFluxUmolCm2S <= 0.60, `Fuel crossover flux should be suppressed <= 0.60 umol/cm2/s, got ${cellState.fuelCrossoverFluxUmolCm2S}`);
assert(cellState.fuelEfficiencyPct >= 40.0 && cellState.fuelEfficiencyPct <= 60.0, `Fuel efficiency should be 40-60%, got ${cellState.fuelEfficiencyPct}%`);

console.log(`  ✓ Cell Performance: OCV = ${cellState.openCircuitVoltageV} V, V_cell = ${cellState.operatingCellVoltageV} V, Power = ${cellState.powerDensityMwCm2} mW/cm2, Donnan Exclusion = ${cellState.crossoverDonnanExclusionPct}%, Crossover Flux = ${cellState.fuelCrossoverFluxUmolCm2S} umol/cm2/s.`);

// 3. Verify Portable Micro-Power System Balance (100 W / 24h Drone Mission)
console.log('  3. Verifying 100 W Portable Power System Balance for 24h Mission...');
const portable = calculateDfafcPortablePowerBalance(100.0, 24.0, 'ORDERED_INTERMETALLIC_PT_BI');
assert.strictEqual(portable.missionPowerWatts, 100.0, 'Mission power must be 100 W');
assert.strictEqual(portable.missionDurationHours, 24.0, 'Mission duration must be 24 h');
assert(portable.stackCellCount >= 10 && portable.stackCellCount <= 16, `Stack cell count should be 10-16, got ${portable.stackCellCount}`);
assert(portable.formicAcidCartridgeLiters >= 1.8 && portable.formicAcidCartridgeLiters <= 3.0, `Cartridge volume should be 1.8-3.0 liters, got ${portable.formicAcidCartridgeLiters} L`);
assert(portable.totalSystemWeightKg >= 4.0 && portable.totalSystemWeightKg <= 7.0, `Total DFAFC system weight should be 4.0-7.0 kg, got ${portable.totalSystemWeightKg} kg`);
assert(portable.equivalentLiIonWeightKg >= 12.0 && portable.equivalentLiIonWeightKg <= 15.0, `Li-ion battery for 2.4 kWh should weigh 12-15 kg, got ${portable.equivalentLiIonWeightKg} kg`);
assert(portable.weightSavingsPct >= 50.0, `Weight savings vs Li-ion should exceed 50%, got ${portable.weightSavingsPct}%`);

console.log(`  ✓ 100 W / 24h System: Stack = ${portable.stackCellCount} cells, Fuel = ${portable.formicAcidCartridgeLiters} L (${portable.fuelMassKg} kg), Total Weight = ${portable.totalSystemWeightKg} kg vs Li-ion ${portable.equivalentLiIonWeightKg} kg (Saved ${portable.weightSavingsPct}% weight!).`);

console.log('🎉 Test Suite 320 PASSED: Direct Formic Acid Fuel Cell Engine is 100% verified!');
