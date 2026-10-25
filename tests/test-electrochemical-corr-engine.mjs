// tests/test-electrochemical-corr-engine.mjs
// ELEMENTA TEST SUITE 308: Electrochemical Carbon Monoxide Reduction (CO-RR) Engine
import assert from 'assert';
import {
  CU_CATALYST_CATALOG,
  TARGET_PRODUCT_CATALOG,
  calculateCorrKinetics,
  calculateCorrIndustrialBalance
} from '../src/domain/electrochemicalCarbonMonoxideReductionEngine.ts';

console.log('🧪 Running Test Suite 308: Electrochemical CO Reduction (CO-RR) Engine...');

// 1. Verifying Catalogs
console.log('  1. Verifying Cu Catalysts and C2+ Target Product Catalogs...');
const odCu = CU_CATALYST_CATALOG.OXIDE_DERIVED_COPPER_OD_CU;
const bCu = CU_CATALYST_CATALOG.BORON_DOPED_COPPER_B_CU;
const ethanol = TARGET_PRODUCT_CATALOG.ETHANOL_C2H5OH;
const ethylene = TARGET_PRODUCT_CATALOG.ETHYLENE_C2H4;

assert(odCu.c2PlusFaradaicEfficiencyPct >= 70.0, 'Oxide-derived Cu must deliver >= 70% C2+ Faradaic efficiency');
assert(bCu.ccCouplingKineticBarrierEv <= 0.60, 'Boron-doped Cu must have low C-C coupling barrier <= 0.60 eV');
assert(ethanol.electronsTransferred === 8, 'Ethanol formation from CO must involve 8 electrons');
assert(ethylene.molecularWeightGmol === 28.05, 'Ethylene molecular weight must be 28.05 g/mol');
console.log('  ✓ Catalysts and product specifications verified.');

// 2. Verifying Kinetics, Cell Voltage & *CO Coverage
console.log('  2. Verifying Electrocatalytic Polarization & *CO Coverage...');
const kinetics400 = calculateCorrKinetics(odCu, 'PURE_WATER_AEM_ZERO_GAP', 400.0, 5.0);

assert(kinetics400.cellOperatingVoltageV >= 2.0 && kinetics400.cellOperatingVoltageV <= 3.6, `Cell operating voltage should be 2.0-3.6 V, got ${kinetics400.cellOperatingVoltageV}`);
assert(kinetics400.coSurfaceCoverageThetaCo >= 0.70, `Theta *CO coverage under 5 bar should exceed 0.70, got ${kinetics400.coSurfaceCoverageThetaCo}`);
assert(kinetics400.c2PlusOverallFaradaicEfficiencyPct >= 65.0, `C2+ Faradaic efficiency should exceed 65%, got ${kinetics400.c2PlusOverallFaradaicEfficiencyPct}%`);
assert(kinetics400.ethanolFaradaicEfficiencyPct >= 40.0, `Ethanol Faradaic efficiency should exceed 40%, got ${kinetics400.ethanolFaradaicEfficiencyPct}%`);
assert(kinetics400.hydrogenEvolutionFePct < 35.0, 'Parasitic HER should be suppressed below 35%');
console.log(`  ✓ Kinetics: Cell V = ${kinetics400.cellOperatingVoltageV} V, *CO Coverage = ${kinetics400.coSurfaceCoverageThetaCo}, C2+ FE = ${kinetics400.c2PlusOverallFaradaicEfficiencyPct}%, Ethanol FE = ${kinetics400.ethanolFaradaicEfficiencyPct}%.`);

// 3. Verifying Industrial Mass Balance & Climate Abatement
console.log('  3. Verifying Commercial Stack Balance & Carbon Abatement...');
const balance250m2 = calculateCorrIndustrialBalance(kinetics400, 250.0);

assert(balance250m2.dailyEthanolProductionKg >= 2000, `250 m2 stack should produce >= 2,000 kg/day ethanol, got ${balance250m2.dailyEthanolProductionKg}`);
assert(balance250m2.dailyCoFeedMassKg >= 3000, `Daily CO feed should exceed 3,000 kg/day, got ${balance250m2.dailyCoFeedMassKg}`);
assert(balance250m2.avoidedFossilCo2EmissionsTonsPerYear >= 1500, `Avoided fossil CO2 should exceed 1,500 tons/yr, got ${balance250m2.avoidedFossilCo2EmissionsTonsPerYear}`);
assert(balance250m2.annualNetRevenueUsd >= 800000, `Annual revenue should exceed $800,000, got $${balance250m2.annualNetRevenueUsd}`);
console.log(`  ✓ Industrial Balance: Daily Ethanol = ${balance250m2.dailyEthanolProductionKg} kg/day, Avoided CO2 = ${balance250m2.avoidedFossilCo2EmissionsTonsPerYear} t/yr, Revenue = $${balance250m2.annualNetRevenueUsd}/yr.`);

console.log('🎉 Test Suite 308 PASSED: Electrochemical CO Reduction Engine is 100% verified!\n');
