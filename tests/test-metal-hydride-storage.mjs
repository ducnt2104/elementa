// tests/test-metal-hydride-storage.mjs
// Test Suite 278: Metal-Hydride Solid-State Hydrogen Storage Engine Audit

import assert from 'node:assert';
import {
  METAL_HYDRIDE_CATALOG,
  calculateVanTHoffEquilibriumPressure,
  calculateHydrideStoragePerformance
} from '../src/domain/metalHydrideStorageEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 278: METAL HYDRIDE SOLID-STATE H2 AUDIT');
console.log('======================================================================\n');

// 1. Metal Hydride Catalog & Volumetric Density Super-dense Physics
console.log('1. Checking Metal Hydrides Catalog & Volumetric Density Physics...');
assert(Object.keys(METAL_HYDRIDE_CATALOG).length >= 5, 'Must catalog at least 5 metal hydride alloys');

const lani5 = METAL_HYDRIDE_CATALOG.AB5_INTERMETALLIC_LANI5;
const mgh2 = METAL_HYDRIDE_CATALOG.MAGNESIUM_HYDRIDE_MGH2;
const libh4 = METAL_HYDRIDE_CATALOG.COMPLEX_BOROHYDRIDE_LIBH4;

console.log(`  - LaNi5: Volumetric Density = ${lani5.volumetricDensityKgH2PerM3} kg H2/m³ (Liquid H2 is only 71 kg/m³!)`);
console.log(`  - MgH2: Gravimetric Capacity = ${mgh2.gravimetricCapacityWtPct} wt%, Delta H = ${mgh2.enthalpyOfFormationKjPerMolH2} kJ/mol`);
console.log(`  - LiBH4: Gravimetric Record = ${libh4.gravimetricCapacityWtPct} wt%, Volumetric = ${libh4.volumetricDensityKgH2PerM3} kg/m³`);

assert(lani5.volumetricDensityKgH2PerM3 > 71.0, 'LaNi5 solid hydride must be denser than liquid hydrogen at 20K');
assert(mgh2.gravimetricCapacityWtPct >= 7.0, 'MgH2 must store >= 7.0 wt% H2');
assert(libh4.gravimetricCapacityWtPct >= 18.0, 'LiBH4 must store >= 18.0 wt% H2');
console.log('  ✓ Volumetric hydrogen packing and gravimetric records validated');

// 2. Van 't Hoff Isotherm Equilibrium Pressure Calculation
console.log('\n2. Testing Van \'t Hoff Equilibrium Pressure Thermodynamics...');
const p_lani5_25 = calculateVanTHoffEquilibriumPressure(
  lani5.enthalpyOfFormationKjPerMolH2,
  lani5.entropyOfFormationJPerMolK,
  25.0
);
console.log(`  - LaNi5 Equilibrium Plateau Pressure at 25°C: ${p_lani5_25.toFixed(2)} bar`);
assert(p_lani5_25 >= 1.5 && p_lani5_25 <= 2.2, `LaNi5 P_eq at 25°C should be ~1.76 bar (got ${p_lani5_25})`);

const p_mgh2_280 = calculateVanTHoffEquilibriumPressure(
  mgh2.enthalpyOfFormationKjPerMolH2,
  mgh2.entropyOfFormationJPerMolK,
  280.0
);
console.log(`  - MgH2 Equilibrium Plateau Pressure at 280°C: ${p_mgh2_280.toFixed(2)} bar`);
assert(p_mgh2_280 >= 0.9 && p_mgh2_280 <= 1.3, `MgH2 P_eq at 280°C should be ~1.0 bar (got ${p_mgh2_280})`);
console.log('  ✓ Van \'t Hoff equilibrium pressure formulas validated');

// 3. 50 kg H2 Microgrid Solid-State Tank Simulation (LaNi5)
console.log('\n3. Testing 50 kg H2 Microgrid Storage System (LaNi5 + PEMFC Coupling)...');
const lani5Conditions = {
  alloyType: 'AB5_INTERMETALLIC_LANI5',
  storageTargetH2Kg: 50.0,
  operatingTemperatureC: 25.0,
  appliedSupplyPressureBar: 10.0,
  coolingWaterSupplyTempC: 20.0,
  wasteHeatSourceTempC: 75.0 // PEMFC waste heat available
};

const lani5Result = calculateHydrideStoragePerformance(lani5Conditions);
console.log(`  - Alloy Mass Required: ${lani5Result.alloyMassRequiredKg} kg`);
console.log(`  - Solid Bed Volume: ${lani5Result.tankBedVolumeM3} m³ (${(lani5Result.tankBedVolumeM3 * 1000).toFixed(0)} Liters)`);
console.log(`  - Driving Pressure Gradient: ${lani5Result.thermodynamics.drivingPressureGradientBar} bar`);
console.log(`  - Total Enthalpy Released During Charge: ${lani5Result.thermalManagement.totalEnthalpyReleasedDuringChargeKj} kJ`);
console.log(`  - PEMFC Thermal Coupling: ${lani5Result.thermalManagement.pemfcThermalCouplingFeasibility}`);

assert(lani5Result.thermodynamics.isThermodynamicallyFeasibleToCharge, 'Must be chargeable at 10 bar supply');
assert(lani5Result.thermodynamics.isThermodynamicallyFeasibleToDischarge, 'Must be dischargeable with 75°C PEMFC heat');
assert.strictEqual(lani5Result.thermalManagement.pemfcThermalCouplingFeasibility, 'PERFECT_MATCH_AUTOTHERMAL');
console.log('  ✓ LaNi5 autothermal waste heat coupling with PEMFC validated');

// 4. High-Temperature MgH2 Hydrogen Storage
console.log('\n4. Testing High-Temperature MgH2 Storage with Industrial Waste Heat...');
const mgh2Conditions = {
  alloyType: 'MAGNESIUM_HYDRIDE_MGH2',
  storageTargetH2Kg: 50.0,
  operatingTemperatureC: 300.0,
  appliedSupplyPressureBar: 15.0,
  coolingWaterSupplyTempC: 80.0,
  wasteHeatSourceTempC: 320.0 // MSR / Industrial waste heat
};

const mgh2Result = calculateHydrideStoragePerformance(mgh2Conditions);
console.log(`  - MgH2 Alloy Mass: ${mgh2Result.alloyMassRequiredKg} kg (vs 3355 kg for LaNi5 due to 7.6 wt%!)`);
console.log(`  - Desorption Temperature at 1 bar: ${mgh2Result.thermodynamics.desorptionTemperatureAt1BarC}°C`);
console.log(`  - Coupling: ${mgh2Result.thermalManagement.pemfcThermalCouplingFeasibility}`);

assert(mgh2Result.alloyMassRequiredKg < 700, 'MgH2 alloy mass must be under 700 kg for 50 kg H2');
assert.strictEqual(mgh2Result.thermalManagement.pemfcThermalCouplingFeasibility, 'HIGH_TEMPERATURE_COUPLING_ONLY');
console.log('  ✓ High-temperature lightweight hydride storage validated');

// 5. Multi-technology Storage Comparison (Solid vs 700 bar vs 20K Liquid)
console.log('\n5. Checking Multi-Technology Hydrogen Storage Comparison...');
const comp = lani5Result.storageTechnologyComparison;
console.log(`  - Solid Hydride Tank: Pressure = ${comp.solidHydrideTank.storagePressureBar} bar, Boil-off = ${comp.solidHydrideTank.dailyBoilOffLossPct}%/day, Penalty = ${comp.solidHydrideTank.compressorEnergyPenaltyPct}%`);
console.log(`  - 700 Bar Compressed Gas: Pressure = ${comp.compressedGas700Bar.storagePressureBar} bar, Penalty = ${comp.compressedGas700Bar.compressorEnergyPenaltyPct}%, Volume = ${comp.compressedGas700Bar.tankVolumeLitersFor50Kg} L`);
console.log(`  - 20K Cryogenic Liquid: Pressure = ${comp.cryogenicLiquid20K.storagePressureBar} bar, Boil-off = ${comp.cryogenicLiquid20K.dailyBoilOffLossPct}%/day, Penalty = ${comp.cryogenicLiquid20K.compressorEnergyPenaltyPct}%`);

assert(comp.solidHydrideTank.storagePressureBar < 10.0, 'Solid hydride operates at benign pressure < 10 bar');
assert.strictEqual(comp.solidHydrideTank.dailyBoilOffLossPct, 0.0, 'Solid hydride has zero boil-off loss');
assert(comp.solidHydrideTank.compressorEnergyPenaltyPct < 3.0, 'Solid hydride compressor penalty must be < 3%');
assert(comp.compressedGas700Bar.compressorEnergyPenaltyPct > 12.0, '700 bar compression costs > 12% energy');
assert(comp.cryogenicLiquid20K.compressorEnergyPenaltyPct > 25.0, 'Cryogenic liquefaction costs > 25% energy');
console.log('  ✓ Benchmark comparison (Solid vs 700 bar vs 20K) validated');

console.log('\n======================================================================');
console.log('   TEST SUITE 278: ALL METAL HYDRIDE STORAGE CHECKS PASSED!');
console.log('======================================================================\n');
