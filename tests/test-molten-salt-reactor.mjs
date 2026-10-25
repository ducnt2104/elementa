// tests/test-molten-salt-reactor.mjs
// Test Suite 274: Molten Salt Nuclear Reactor (MSR) & Thorium Fuel Cycle Audit

import assert from 'node:assert';
import {
  MOLTEN_SALT_CATALOG,
  calculateMsrPerformance
} from '../src/domain/moltenSaltReactorEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 274: MOLTEN SALT REACTOR (MSR) & THORIUM AUDIT');
console.log('======================================================================\n');

// 1. Molten Salt Catalog & Physical Chemistry
console.log('1. Checking Molten Halide Salts Physical Chemistry Catalog...');
assert(Object.keys(MOLTEN_SALT_CATALOG).length >= 4, 'Must catalog at least 4 molten salts');

const flibe = MOLTEN_SALT_CATALOG.FLIBE_LI2BEF4;
const thFuel = MOLTEN_SALT_CATALOG.THORIUM_FLUORIDE_FUEL;
const flinak = MOLTEN_SALT_CATALOG.FLINAK_LI_NA_KF;
const chloride = MOLTEN_SALT_CATALOG.CHLORIDE_NACL_MGCL2;

console.log(`  - FLiBe (LiF-BeF2): Tm = ${flibe.meltingPointC}°C, Tb = ${flibe.boilingPointC}°C, Cp = ${flibe.heatCapacityJPerG_K} J/(g K)`);
console.log(`  - Thorium Fuel Salt: Density = ${thFuel.densityGPerCm3At700C} g/cm³, Boiling Point = ${thFuel.boilingPointC}°C`);
console.log(`  - FLiNaK Coolant: Tm = ${flinak.meltingPointC}°C, Tb = ${flinak.boilingPointC}°C (Beryllium-free)`);
console.log(`  - Chloride Fast Salt: Tm = ${chloride.meltingPointC}°C (Actinide burner)`);

assert(flibe.meltingPointC <= 460 && flibe.boilingPointC >= 1400, 'FLiBe must have > 900°C liquid range');
assert(thFuel.vaporPressureAt700CBar < 0.01, 'Molten fluoride vapor pressure must be near zero at 700°C');
console.log('  ✓ Molten fluoride & chloride thermophysical properties validated');

// 2. 500 MWth LFTR Core Performance & Safety Margins
console.log('\n2. Testing 500 MWth Liquid Fluoride Thorium Reactor (LFTR) Operation...');
const lftrParams = {
  fuelSaltType: 'THORIUM_FLUORIDE_FUEL',
  coolantSaltType: 'FLINAK_LI_NA_KF',
  thermalPowerMwTh: 500,
  coreInletTemperatureC: 620,
  coreOutletTemperatureC: 720,
  powerCycle: 'SUPERCRITICAL_CO2_BRAYTON',
  heliumSpargingFlowM3PerH: 15.0,
  bismuthExtractionRateKgPerH: 180.0,
  freezePlugActiveCoolingKw: 15.0
};

const result = calculateMsrPerformance(lftrParams);

console.log(`  - Thermal Power: ${result.thermalPowerMwTh} MWth (Delta T = ${result.coreTemperatureDeltaC}°C)`);
console.log(`  - Operating Pressure: ${result.operatingPressureBar} bar (vs 155 bar in PWR!)`);
console.log(`  - Safety Margin to Boiling: ${result.safetyMarginToBoilingC}°C`);
console.log(`  - Fissile Inventory (U-233): ${result.neutronicsAndBreeding.fissileInventoryKg} kg`);
console.log(`  - Fertile Inventory (Th-232): ${result.neutronicsAndBreeding.thoriumFertileInventoryTons} tons`);
console.log(`  - Breeding Ratio (BR): ${result.neutronicsAndBreeding.breedingRatio}`);

assert(result.operatingPressureBar < 3.0, 'MSR operates at near-atmospheric pressure, eliminating steam explosion risk');
assert(result.safetyMarginToBoilingC > 700, 'Must have immense > 700°C safety margin before fuel boils');
assert(result.neutronicsAndBreeding.breedingRatio >= 1.04, 'LFTR breeding ratio must exceed 1.04 for thermal self-sustainability');
console.log('  ✓ Low pressure operation and thermal thorium breeding verified');

// 3. Online Radiochemistry: Helium Gas Bubbling & Xenon Stripping
console.log('\n3. Verifying Online Radiochemistry & Xenon-135 Stripping...');
const xenonReduction = result.neutronicsAndBreeding.xenon135PoisoningReductionPct;
const tempCoeff = result.neutronicsAndBreeding.temperatureCoefficientOfReactivityPcmPerC;

console.log(`  - Online Helium Sparging Xe-135 Reduction: ${xenonReduction}%`);
console.log(`  - Reactivity Temperature Coefficient (Doppler + Expansion): ${tempCoeff} pcm/°C`);

assert(xenonReduction >= 98.0, 'Helium gas bubbling must remove > 98% of volatile Xenon-135');
assert(tempCoeff < -2.0, 'Reactivity feedback must be strongly negative to self-throttle runaway power');
console.log('  ✓ In-situ helium bubbling and negative reactivity self-throttling validated');

// 4. Passive Freeze Plug & Gravity Drain Under SBO (Station Blackout)
console.log('\n4. Testing Passive Freeze Plug Safety & Total Station Blackout Simulation...');
const normalPlug = result.passiveSafetyMetrics.freezePlugStatus;
assert.strictEqual(normalPlug, 'SOLID_OPERATIONAL');

// Simulate Total Station Blackout (Zero active cooling):
const sboResult = calculateMsrPerformance({
  ...lftrParams,
  freezePlugActiveCoolingKw: 0.0 // Blower stops
});

console.log(`  - Normal Operation: Freeze plug is ${normalPlug}`);
console.log(`  - Station Blackout (SBO): Freeze plug status = ${sboResult.passiveSafetyMetrics.freezePlugStatus}`);
console.log(`  - Passive Melt Time: ${sboResult.passiveSafetyMetrics.freezePlugMeltTimeMinutes} minutes`);
console.log(`  - Subcritical Gravity Drain: ${sboResult.passiveSafetyMetrics.subcriticalGravityDrainSuccess ? 'SUCCESS' : 'FAILED'}`);
console.log(`  - Passive Air Decay Heat Cooling: ${sboResult.passiveSafetyMetrics.decayHeatPassiveAirCoolingMwTh} MWth`);

assert.strictEqual(sboResult.passiveSafetyMetrics.freezePlugStatus, 'PASSIVELY_MELTING');
assert(sboResult.passiveSafetyMetrics.freezePlugMeltTimeMinutes <= 6.0, 'Freeze plug must melt within 6 mins under decay heat');
assert(sboResult.passiveSafetyMetrics.subcriticalGravityDrainSuccess, 'Gravity drain into subcritical tanks must succeed');
console.log('  ✓ Passive freeze plug melting and subcritical gravity drain verified');

// 5. Supercritical CO2 (sCO2) Brayton Power Cycle Performance
console.log('\n5. Verifying Supercritical CO2 Recompression Brayton Cycle...');
const power = result.powerCyclePerformance;
console.log(`  - Cycle: ${power.cycleName}`);
console.log(`  - Gross Thermal Efficiency: ${power.grossThermalEfficiencyPct}% (at 720°C)`);
console.log(`  - Electric Power Output: ${power.electricPowerOutputMw} MWe`);
console.log(`  - Annual Generation (95% CF): ${power.annualElectricityOutputGwh} GWh`);
console.log(`  - Co-generation Industrial Heat (600°C+): ${power.highTemperatureHeatCoGenerationMwTh} MWth`);

assert(power.grossThermalEfficiencyPct >= 48.0, 'sCO2 Brayton at 720°C must achieve > 48% thermal efficiency');
assert(power.electricPowerOutputMw >= 240, 'Electric output should be ~250 MWe from 500 MWth');
assert(power.highTemperatureHeatCoGenerationMwTh > 150, 'High-temp co-gen heat should exceed 150 MWth');
console.log('  ✓ High-efficiency sCO2 power conversion and high-temp co-gen validated');

// 6. Nuclear Waste Minimization & Thorium Energy Density
console.log('\n6. Checking Nuclear Waste Elimination & Thorium Energy Density...');
const waste = result.environmentalAndWasteAdvantages;
console.log(`  - Transuranic Actinide Waste Reduction: ${waste.transuranicWasteReductionPct}%`);
console.log(`  - Waste Radiotoxicity Decay Time: ${waste.wasteRadiotoxicityDecayYears} years (vs 300,000 yrs for PWR!)`);
console.log(`  - Thorium Energy Density: ${(waste.thoriumEnergyDensityKwhPerKg / 1e6).toFixed(1)} million kWh/kg Th`);
console.log(`  - Annual CO2 Avoided: ${waste.annualCo2DisplacedTons.toLocaleString()} tons`);

assert(waste.transuranicWasteReductionPct > 99.0, 'Thorium cycle must eliminate > 99% of transuranic waste');
assert(waste.wasteRadiotoxicityDecayYears <= 500, 'Waste must decay to natural ore radiotoxicity within 500 years');
assert(waste.thoriumEnergyDensityKwhPerKg >= 20000000, 'Thorium energy density must exceed 20M kWh/kg');
console.log('  ✓ Transuranic waste elimination and 300-year decay horizon validated');

console.log('\n======================================================================');
console.log('   TEST SUITE 274: ALL MOLTEN SALT REACTOR CHECKS PASSED!');
console.log('======================================================================\n');
