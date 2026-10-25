// tests/test-solid-state-interphase-mechanics.mjs
// ELEMENTA TEST SUITE 306: Solid-State Battery Cathode Electrolyte Interphase (CEI) & Chemo-Mechanics
import assert from 'assert';
import {
  SOLID_ELECTROLYTE_CATALOG,
  CATHODE_MATERIAL_CATALOG,
  CEI_LAYER_CATALOG,
  calculateInterfacialStability,
  calculateChemoMechanicalStress,
  simulateCapacityRetentionCycles,
  calculateSolidStateFullCellMetrics
} from '../src/domain/solidStateInterphaseMechanicsEngine.ts';

console.log('🧪 Running Test Suite 306: Solid-State Interphase Mechanics Engine...');

// 1. Verifying Catalogs
console.log('  1. Verifying Solid Electrolytes, Cathodes, and CEI Coating Catalogs...');
const lgps = SOLID_ELECTROLYTE_CATALOG.LGPS_SULFIDE;
const halide = SOLID_ELECTROLYTE_CATALOG.HALIDE_LI3INCL6;
const llzo = SOLID_ELECTROLYTE_CATALOG.LLZO_GARNET_OXIDE;
const nmc811 = CATHODE_MATERIAL_CATALOG.NMC_811;
const linbo3 = CEI_LAYER_CATALOG.LITHIUM_NIOBATE_LINBO3;
const bare = CEI_LAYER_CATALOG.BARE_UNCOATED;

assert(lgps.roomTempIonicConductivityMscm >= 10.0, 'LGPS must possess high ionic conductivity >= 10 mS/cm');
assert(halide.electrochemicalStabilityWindowMaxV >= 4.5, 'Halide LIC must possess wide oxidation limit >= 4.5 V');
assert(llzo.shearModulusGpa >= 50.0, 'LLZO garnet must have high shear modulus >= 50 GPa');
assert(nmc811.specificCapacityMahG >= 200.0, 'NMC-811 must deliver >= 200 mAh/g capacity');
assert(linbo3.interfacialDecompositionSuppressionPct >= 90.0, 'LiNbO3 ALD must provide >= 90% decomposition suppression');
console.log('  ✓ Solid electrolytes, cathodes, and CEI catalogs verified.');

// 2. Verifying Interfacial Stability & Space-Charge Decomposition
console.log('  2. Verifying High-Voltage Interfacial Stability & Decomposition Suppression...');
const bareStability = calculateInterfacialStability(lgps, nmc811, bare, 4.30);
const coatedStability = calculateInterfacialStability(lgps, nmc811, linbo3, 4.30);
const halideStability = calculateInterfacialStability(halide, nmc811, bare, 4.30);

assert(!bareStability.isThermodynamicallyStable, 'LGPS at 4.3 V must be thermodynamically unstable vs Li');
assert(bareStability.overpotentialDecompositionV > 1.5, 'LGPS overpotential at 4.3 V should be > 1.5 V');
assert(bareStability.interfacialArealResistanceOhmCm2 > 100, 'Bare LGPS interface must have high resistance > 100 Ohm*cm2');
assert(bareStability.dominantDecompositionProducts.includes('Sulfur (S⁰)'), 'Bare sulfide interface must produce oxidized sulfur');

assert(coatedStability.interfacialArealResistanceOhmCm2 < 40, 'LiNbO3-coated LGPS must suppress resistance < 40 Ohm*cm2');
assert(coatedStability.spaceChargeLayerThicknessNm < bareStability.spaceChargeLayerThicknessNm, 'LiNbO3 must thin space-charge layer');

assert(halideStability.isThermodynamicallyStable, 'Halide solid electrolyte must be thermodynamically stable at 4.3 V');
assert(halideStability.overpotentialDecompositionV === 0, 'Halide overpotential should be 0 V at 4.3 V');
console.log('  ✓ Interfacial stability, space-charge mitigation, and chemical passivations verified.');

// 3. Verifying Chemo-Mechanical Stress, Contact Retention & Dendrites
console.log('  3. Verifying Chemo-Mechanical Stress & External Stack Pressure...');
const lowPressureMechanics = calculateChemoMechanicalStress(lgps, nmc811, 0.5);
const highPressureMechanics = calculateChemoMechanicalStress(lgps, nmc811, 5.0);

assert(lowPressureMechanics.contactAreaRetentionPct < 85.0, 'Low stack pressure must exhibit contact loss < 85%');
assert(lowPressureMechanics.dendriteSuppressionStatus === 'HIGH_VOID_DELAMINATION', 'Low pressure must signal void delamination risk');

assert(highPressureMechanics.contactAreaRetentionPct >= 98.0, '5 MPa stack pressure must maintain >= 98% contact area');
assert(highPressureMechanics.criticalPlatingCurrentDensityMacm2 > lowPressureMechanics.criticalPlatingCurrentDensityMacm2, 'Higher stack pressure must elevate critical plating current density (CCD)');
console.log('  ✓ Chemo-mechanical stress, void suppression, and CCD scaling verified.');

// 4. Verifying Long-Term Cycle Retention & Full-Cell Energy Metrics
console.log('  4. Verifying Cycle Retention (1,000 Cycles) & Full-Cell Energy Density...');
const cycleData = simulateCapacityRetentionCycles(coatedStability, highPressureMechanics, 1000);
const finalCycle = cycleData[cycleData.length - 1];

assert(cycleData.length > 10, 'Simulation must produce discrete cycle progression data points');
assert(finalCycle.capacityRetentionPct >= 80.0, 'Protected cell with 5 MPa stack pressure should maintain >= 80% capacity over 1,000 cycles');
assert(finalCycle.coulombicEfficiencyPct >= 99.8, 'Coulombic efficiency must remain high >= 99.8%');

const fullCellMetrics = calculateSolidStateFullCellMetrics(lgps, nmc811, 4.0);
assert(fullCellMetrics.cellGravimetricEnergyDensityWhKg >= 380, `Energy density must exceed 380 Wh/kg, got ${fullCellMetrics.cellGravimetricEnergyDensityWhKg}`);
assert(fullCellMetrics.cellVolumetricEnergyDensityWhL >= 800, `Volumetric density must exceed 800 Wh/L, got ${fullCellMetrics.cellVolumetricEnergyDensityWhL}`);
assert(fullCellMetrics.thermalRunawayOnsetTempCelsius >= 350, 'Thermal runaway onset should exceed 350°C');
assert(fullCellMetrics.avoidedToxicSolventsGPerKwh >= 400, 'Must displace volatile carbonate solvents');
console.log(`  ✓ Solid-State Pack Metrics: ${fullCellMetrics.cellGravimetricEnergyDensityWhKg} Wh/kg, ${fullCellMetrics.cellVolumetricEnergyDensityWhL} Wh/L, Onset: ${fullCellMetrics.thermalRunawayOnsetTempCelsius}°C.`);

console.log('🎉 Test Suite 306 PASSED: Solid-State Interphase Mechanics Engine is 100% verified!\n');
