// tests/test-molten-metal-pyrolysis.mjs
// ELEMENTA TEST SUITE 312: Molten Metal Methane Pyrolysis & Turquoise Hydrogen Engine
import assert from 'assert';
import {
  MOLTEN_CATALYST_CATALOG,
  CARBON_MORPHOLOGY_CATALOG,
  calculatePyrolysisKinetics,
  calculatePyrolysisPlantBalance
} from '../src/domain/moltenMetalMethanePyrolysisEngine.ts';

console.log('🧪 Running Test Suite 312: Molten Metal Methane Pyrolysis Engine...');

// 1. Catalogs Verification
console.log('  1. Verifying Molten Metal Catalysts and Carbon Product Catalogs...');
const niBi = MOLTEN_CATALYST_CATALOG.NICKEL_BISMUTH_ALLOY_NI_BI;
const tin = MOLTEN_CATALYST_CATALOG.PURE_MOLTEN_TIN_SN;
const batteryCarbon = CARBON_MORPHOLOGY_CATALOG.BATTERY_GRADE_CONDUCTIVE_CARBON;
const carbonTubes = CARBON_MORPHOLOGY_CATALOG.CARBON_NANOTUBES_CNT;

assert(niBi.liquidDensityGcm3 > 9.0, 'Ni-Bi molten alloy must possess ultra-high liquid density > 9 g/cm3 for rapid carbon floatation');
assert(niBi.activationEnergyKjMol <= 170.0, 'Ni-Bi must have low activation barrier <= 170 kJ/mol');
assert(batteryCarbon.electricalConductivityScm >= 40.0, 'Battery-grade conductive carbon must have high electrical conductivity >= 40 S/cm');
assert(carbonTubes.marketPriceUsdPerKg >= 15.0, 'Carbon nanotubes must command premium market price >= $15/kg');
console.log('  ✓ Catalysts and carbon morphologies verified.');

// 2. Pyrolysis Kinetics, Conversion & Carbon Floatation
console.log('  2. Verifying Methane Pyrolysis Kinetics, Equilibrium, and Buoyancy Separation...');
const kinetics1050 = calculatePyrolysisKinetics(niBi, 1050.0, 2.5);

assert(kinetics1050.methaneConversionPct >= 85.0, `Methane conversion at 1050°C should exceed 85%, got ${kinetics1050.methaneConversionPct}%`);
assert(kinetics1050.hydrogenPurityBeforePsaPct >= 90.0, `H2 purity in offgas should exceed 90 mol%, got ${kinetics1050.hydrogenPurityBeforePsaPct}%`);
assert(kinetics1050.carbonBuoyancyTerminalVelocityCmS >= 20.0, `Carbon floatation velocity should exceed 20 cm/s, got ${kinetics1050.carbonBuoyancyTerminalVelocityCmS} cm/s`);
assert(kinetics1050.reactionEquilibriumConstantKp > 1.0, 'Reaction equilibrium constant Kp must be > 1 at 1050°C');
console.log(`  ✓ Kinetics: Conversion = ${kinetics1050.methaneConversionPct}%, H2 Purity = ${kinetics1050.hydrogenPurityBeforePsaPct}%, Floatation = ${kinetics1050.carbonBuoyancyTerminalVelocityCmS} cm/s.`);

// 3. Commercial Plant Balance & SMR Decarbonization
console.log('  3. Verifying Commercial Pyrolysis Plant Balance & SMR Decarbonization...');
const plantBalance = calculatePyrolysisPlantBalance(kinetics1050, 1000.0, batteryCarbon);

assert(plantBalance.hourlyHydrogenProductionKg >= 200.0, `1,000 kg/hr methane feed must produce >= 200 kg/hr H2, got ${plantBalance.hourlyHydrogenProductionKg} kg/hr`);
assert(plantBalance.hourlyCarbonBlackProductionKg >= 650.0, `Hourly carbon black production must exceed 650 kg/hr, got ${plantBalance.hourlyCarbonBlackProductionKg} kg/hr`);
assert(plantBalance.specificEnergyConsumptionKwhPerKgH2 <= 20.0, `Specific energy consumption must be <= 20 kWh/kg H2, got ${plantBalance.specificEnergyConsumptionKwhPerKgH2} kWh/kg`);
assert(plantBalance.avoidedSmrCarbonDioxideTonsPerYear >= 15000.0, `Avoided SMR CO2 emissions must exceed 15,000 tons/yr, got ${plantBalance.avoidedSmrCarbonDioxideTonsPerYear} tons/yr`);
assert(plantBalance.annualGrossProductRevenueUsd >= 20000000, `Annual revenue should exceed $20M, got $${plantBalance.annualGrossProductRevenueUsd}`);
console.log(`  ✓ Plant Balance: H2 = ${plantBalance.hourlyHydrogenProductionKg} kg/hr (${plantBalance.annualHydrogenProductionTons} t/yr), Carbon = ${plantBalance.hourlyCarbonBlackProductionKg} kg/hr, Avoided CO2 = ${plantBalance.avoidedSmrCarbonDioxideTonsPerYear} t/yr, Revenue = $${plantBalance.annualGrossProductRevenueUsd}/yr.`);

console.log('🎉 Test Suite 312 PASSED: Molten Metal Methane Pyrolysis Engine is 100% verified!\n');
