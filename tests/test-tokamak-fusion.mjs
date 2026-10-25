// tests/test-tokamak-fusion.mjs
// Test Suite 276: Tokamak Magnetic Confinement Fusion & Plasma Chemistry Engine Audit

import assert from 'node:assert';
import {
  FUSION_REACTIONS_CATALOG,
  BLANKET_CATALOG,
  calculateTokamakPerformance
} from '../src/domain/tokamakFusionEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 276: TOKAMAK NUCLEAR FUSION & PLASMA AUDIT');
console.log('======================================================================\n');

// 1. Fusion Reactions & Physical Chemistry Catalog
console.log('1. Checking Fusion Reactions Catalog & Mass-Energy Equivalence...');
assert(Object.keys(FUSION_REACTIONS_CATALOG).length >= 4, 'Must catalog at least 4 fusion reactions');

const dt = FUSION_REACTIONS_CATALOG.DEUTERIUM_TRITIUM;
const dd = FUSION_REACTIONS_CATALOG.DEUTERIUM_DEUTERIUM;
const dHe3 = FUSION_REACTIONS_CATALOG.DEUTERIUM_HELIUM3;
const pB11 = FUSION_REACTIONS_CATALOG.PROTON_BORON11;

console.log(`  - D-T Reaction: ${dt.chemicalFormula}`);
console.log(`    Total Energy = ${dt.totalEnergyReleaseMev} MeV (Alpha: ${dt.chargedParticleEnergyMev} MeV, Neutron: ${dt.neutronEnergyMev} MeV)`);
console.log(`  - D-D Reaction: ${dd.chemicalFormula}`);
console.log(`  - D-³He Aneutronic: ${dHe3.chemicalFormula}`);
console.log(`  - p-¹¹B Aneutronic: ${pB11.chemicalFormula}`);

assert.strictEqual(dt.totalEnergyReleaseMev, 17.58, 'D-T total Q-value must be exactly 17.58 MeV');
assert.strictEqual(dt.chargedParticleEnergyMev, 3.52, 'Alpha particle carries 3.52 MeV (20%)');
assert.strictEqual(dt.neutronEnergyMev, 14.06, 'Neutron carries 14.06 MeV (80%)');
console.log('  ✓ Nuclear mass defect and Q-values validated');

// 2. Lawson Triple Product & Confinement Criteria
console.log('\n2. Testing Lawson Triple Product Criterion & Plasma Temperature...');
const iterBaselineParams = {
  majorRadiusM: 6.2,
  minorRadiusM: 2.0,
  toroidalMagneticFieldTesla: 5.3,
  plasmaCurrentMA: 15.0,
  electronDensity10e19M3: 10.5,
  ionTemperatureKeV: 15.0, // 15 keV ~ 174 million °C
  energyConfinementTimeS: 3.8,
  auxiliaryHeatingPowerMw: 50.0,
  fuelReaction: 'DEUTERIUM_TRITIUM',
  blanketType: 'LIQUID_PB16LI_EUTECTIC',
  magnetTechnology: 'NBSN_LOW_TEMP_SUPERCONDUCTOR'
};

const iterResult = calculateTokamakPerformance(iterBaselineParams);

console.log(`  - Plasma Temperature: ${iterResult.plasmaState.temperatureMillionCelsius}°C (${iterResult.plasmaState.temperatureKeV} keV)`);
console.log(`  - Lawson Triple Product: ${iterResult.plasmaState.lawsonTripleProductKeVsM3.toExponential(3)} keV·s/m³`);
console.log(`  - Lawson Ignition Threshold: ${iterResult.plasmaState.lawsonIgnitionThresholdKeVsM3.toExponential(3)} keV·s/m³`);
console.log(`  - Triple Product Margin: ${iterResult.plasmaState.tripleProductMarginFactor}x`);
console.log(`  - Ignition Condition Met: ${iterResult.plasmaState.isLawsonIgnitionMet}`);

assert(iterResult.plasmaState.temperatureMillionCelsius > 150, 'Plasma temp at 15 keV must exceed 150 million °C');
assert(iterResult.plasmaState.isLawsonIgnitionMet, 'Lawson ignition criterion must be satisfied for high-performance plasma');
assert(iterResult.plasmaState.tripleProductMarginFactor >= 1.0, 'Triple product margin factor must be >= 1.0');
console.log('  ✓ Lawson criterion and 174 million °C plasma confinement verified');

// 3. Fusion Power & Energy Gain Factor Q
console.log('\n3. Verifying Fusion Power Output & Energy Gain Factor Q...');
console.log(`  - Fusion Thermal Power: ${iterResult.nuclearReactionsAndHeating.fusionPowerThermalMw} MW`);
console.log(`  - Alpha Self-Heating: ${iterResult.nuclearReactionsAndHeating.alphaSelfHeatingPowerMw} MW`);
console.log(`  - Neutron Power: ${iterResult.nuclearReactionsAndHeating.neutronPowerMw} MW`);
console.log(`  - Auxiliary Heating: ${iterResult.nuclearReactionsAndHeating.auxiliaryHeatingPowerMw} MW`);
console.log(`  - Energy Gain Factor Q: ${iterResult.nuclearReactionsAndHeating.energyGainFactorQ}`);
console.log(`  - Plasma Regime: ${iterResult.nuclearReactionsAndHeating.fusionRegime}`);

assert(iterResult.nuclearReactionsAndHeating.fusionPowerThermalMw >= 450, 'ITER baseline should achieve ~500 MW thermal fusion power');
assert(iterResult.nuclearReactionsAndHeating.energyGainFactorQ >= 9.0, 'Energy gain factor Q should be ~10 for ITER reference');
assert.strictEqual(iterResult.nuclearReactionsAndHeating.fusionRegime, 'ENERGY_PRODUCING_Q10');
console.log('  ✓ Energy Gain Factor Q >= 10 burning plasma validated');

// 4. In-situ Tritium Breeding Blanket Radiochemistry
console.log('\n4. Verifying Lithium Blanket Tritium Breeding (TBR)...');
const breeding = iterResult.tritiumBreedingCycle;
console.log(`  - Blanket Material: ${breeding.blanketInfo.name}`);
console.log(`  - Tritium Breeding Ratio (TBR): ${breeding.tritiumBreedingRatioTBR}`);
console.log(`  - Daily Tritium Consumption: ${breeding.tritiumConsumptionGramsPerDay} g/day`);
console.log(`  - Daily Tritium Production: ${breeding.tritiumProductionGramsPerDay} g/day`);
console.log(`  - Net Annual Surplus: ${breeding.netTritiumSurplusKgPerYear} kg/year`);

assert(breeding.tritiumBreedingRatioTBR >= 1.10, 'TBR must exceed 1.10 for full fuel self-sufficiency');
assert(breeding.isSelfSufficient, 'Reactor must be tritium self-sufficient');
assert(breeding.netTritiumSurplusKgPerYear > 0, 'Must produce net positive surplus tritium for future reactors');
console.log('  ✓ In-situ tritium breeding and self-sufficiency validated');

// 5. High-Field REBCO Magnet Simulation (Compact Commercial Power Plant)
console.log('\n5. Testing High-Field REBCO Superconducting Magnet Reactor (ARC Scale)...');
const rebcoParams = {
  majorRadiusM: 3.3,
  minorRadiusM: 1.1,
  toroidalMagneticFieldTesla: 12.0, // High magnetic field 12T enabled by REBCO HTS tape!
  plasmaCurrentMA: 12.0,
  electronDensity10e19M3: 14.5,
  ionTemperatureKeV: 16.0,
  energyConfinementTimeS: 2.5,
  auxiliaryHeatingPowerMw: 30.0,
  fuelReaction: 'DEUTERIUM_TRITIUM',
  blanketType: 'FLIBE_MOLTEN_SALT',
  magnetTechnology: 'REBCO_HIGH_TEMP_SUPERCONDUCTOR'
};

const rebcoResult = calculateTokamakPerformance(rebcoParams);
console.log(`  - Model: ${rebcoResult.reactorModelName}`);
console.log(`  - Toroidal Field: 12.0 Tesla (REBCO at 20K)`);
console.log(`  - Fusion Thermal Power: ${rebcoResult.nuclearReactionsAndHeating.fusionPowerThermalMw} MW`);
console.log(`  - Gross Electric Power: ${rebcoResult.powerPlantEnergyBalance.grossElectricPowerMw} MWe`);
console.log(`  - Net Export Electric Power: ${rebcoResult.powerPlantEnergyBalance.netElectricPowerExportMw} MWe`);
console.log(`  - Annual Clean Generation: ${rebcoResult.powerPlantEnergyBalance.annualCleanElectricityGwh} GWh`);

assert(rebcoResult.nuclearReactionsAndHeating.fusionPowerThermalMw > 300, 'High field compact reactor must achieve substantial power');
assert(rebcoResult.powerPlantEnergyBalance.netElectricPowerExportMw > 150, 'Net export electricity should exceed 150 MWe');
console.log('  ✓ High-field REBCO compact fusion power plant validated');

// 6. Divertor Heat Flux & Intrinsic Nuclear Safety
console.log('\n6. Checking Divertor Heat Detachment & Intrinsic Safety Profile...');
const divertor = iterResult.divertorAndWallSafety;
const safety = iterResult.environmentalSafetyCheck;

console.log(`  - Peak Divertor Heat Flux (Unmitigated): ${divertor.peakDivertorHeatFluxMwPerM2} MW/m²`);
console.log(`  - Detached Divertor Heat Flux (Mitigated): ${divertor.detachedDivertorHeatFluxMwPerM2} MW/m²`);
console.log(`  - Active Core Fuel Inventory: ${safety.activeFuelInventoryInCoreGrams} grams`);

assert(divertor.detachedDivertorHeatFluxMwPerM2 < 10.0, 'Detached divertor heat flux must be kept under 10 MW/m² (tungsten limit)');
assert(safety.activeFuelInventoryInCoreGrams < 5.0, 'Active fuel in plasma must be < 5 grams, eliminating runaway explosion risks');
console.log('  ✓ Divertor heat mitigation and passive safety profile validated');

console.log('\n======================================================================');
console.log('   TEST SUITE 276: ALL TOKAMAK FUSION PHYSICS CHECKS PASSED!');
console.log('======================================================================\n');
