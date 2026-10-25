// tests/test-lithium-mediated-ammonia.mjs
// Test Suite 298: Lithium-Mediated Electrochemical Nitrogen Reduction (Li-NRR) & Green Ammonia Synthesis Engine

import assert from 'node:assert';
import {
  SOLVENT_CATALOG,
  PROTON_SHUTTLE_CATALOG,
  SEI_ADDITIVE_CATALOG,
  calculateLiNrrOperatingPoint,
  calculateAmmoniaPlantBalance
} from '../src/domain/lithiumMediatedAmmoniaEngine.ts';

console.log('🧪 Running Test Suite 298: Lithium-Mediated Ammonia Engine...');

// Test 1: Catalogs & Properties
console.log('  1. Verifying Non-Aqueous Solvents & SEI Additives...');
assert(SOLVENT_CATALOG.TETRAHYDROFURAN_THF, 'THF must exist in catalog');
assert(SOLVENT_CATALOG.CYCLOPENTYL_METHYL_ETHER_CPME, 'CPME must exist in catalog');
assert.strictEqual(SOLVENT_CATALOG.CYCLOPENTYL_METHYL_ETHER_CPME.n2SolubilityMolPerM3, 5.4);

assert(PROTON_SHUTTLE_CATALOG.ETHANOL_ETOH, 'Ethanol must exist in catalog');
assert(PROTON_SHUTTLE_CATALOG.ONE_BUTANOL_BUOH, '1-Butanol must exist in catalog');

assert(SEI_ADDITIVE_CATALOG.OXYGEN_GAS_DOPING_1VOL, 'O2 doping additive must exist');
assert(SEI_ADDITIVE_CATALOG.PRISTINE_NO_ADDITIVE, 'Pristine electrolyte must exist');
console.log('  ✓ Catalog properties and chemical parameters verified.');

// Test 2: Operating Point & Faradaic Efficiency with O2 Doping
console.log('  2. Verifying Operating Point, Faradaic Efficiency & Selectivity...');
const cpme = SOLVENT_CATALOG.CYCLOPENTYL_METHYL_ETHER_CPME;
const etoh = PROTON_SHUTTLE_CATALOG.ETHANOL_ETOH;
const o2Doping = SEI_ADDITIVE_CATALOG.OXYGEN_GAS_DOPING_1VOL;

const opOptimized = calculateLiNrrOperatingPoint(cpme, etoh, o2Doping, 3.8, 20.0, 0.8, 25);
assert(opOptimized.faradaicEfficiencyPct >= 60.0, `Optimized FE should be >= 60%, got ${opOptimized.faradaicEfficiencyPct}%`);
assert(opOptimized.currentDensityMaPerCm2 >= 15.0, `Current density should be >= 15 mA/cm2, got ${opOptimized.currentDensityMaPerCm2}`);
assert(opOptimized.ammoniaYieldRateNmolPerSCm2 > 10.0, `NH3 yield rate should be > 10 nmol/(s cm2), got ${opOptimized.ammoniaYieldRateNmolPerSCm2}`);
assert.strictEqual(opOptimized.isContinuousOperationStable, true);
assert.strictEqual(opOptimized.limitingMechanism, 'OPTIMAL_BALANCED');
console.log(`  ✓ Optimized Li-NRR: FE = ${opOptimized.faradaicEfficiencyPct}%, J = ${opOptimized.currentDensityMaPerCm2} mA/cm², Rate = ${opOptimized.ammoniaYieldRateNmolPerSCm2} nmol/(s·cm²), Energy = ${opOptimized.specificEnergyConsumptionKwhPerKgNh3} kWh/kg`);

// Test 3: Limiting Mechanisms (Low N2 Pressure & Pristine Electrolyte)
console.log('  3. Verifying Transport Limitations & SEI Degradation...');
const opLowPressure = calculateLiNrrOperatingPoint(cpme, etoh, o2Doping, 3.8, 2.0, 0.8, 25);
assert.strictEqual(opLowPressure.limitingMechanism, 'N2_DIFFUSION');

const pristine = SEI_ADDITIVE_CATALOG.PRISTINE_NO_ADDITIVE;
const opPristine = calculateLiNrrOperatingPoint(cpme, etoh, pristine, 3.8, 20.0, 0.8, 25);
assert(opPristine.faradaicEfficiencyPct < opOptimized.faradaicEfficiencyPct, 'Pristine electrolyte without SEI additive must have lower FE');
assert.strictEqual(opPristine.limitingMechanism, 'SEI_BREAKDOWN');
console.log(`  ✓ Limitations verified: Low pressure triggers N2_DIFFUSION; Pristine triggers SEI_BREAKDOWN (FE = ${opPristine.faradaicEfficiencyPct}%).`);

// Test 4: Ammonia Plant Mass & Energy Balance
console.log('  4. Verifying Plant Balance of Plant & Decarbonization Metrics...');
const plantBalance = calculateAmmoniaPlantBalance(opOptimized, 200, 8000, 800);
assert.strictEqual(plantBalance.stackAreaM2, 200);
assert(plantBalance.operatingCurrentA > 50000, `Stack current should be > 50,000 A, got ${plantBalance.operatingCurrentA}`);
assert(plantBalance.ammoniaProductionKgPerHour > 5.0, `NH3 production should be > 5 kg/hr, got ${plantBalance.ammoniaProductionKgPerHour}`);

// Check stoichiometric N2 to NH3 mass ratio: N2 (28) / (2 * NH3 (17)) = 28 / 34 = 0.8235
const n2ToNh3Ratio = plantBalance.nitrogenFeedRateKgPerHour / plantBalance.ammoniaProductionKgPerHour;
assert(n2ToNh3Ratio > 0.81 && n2ToNh3Ratio < 0.84, `N2/NH3 stoichiometric mass ratio should be ~0.824, got ${n2ToNh3Ratio.toFixed(3)}`);

assert(plantBalance.annualAmmoniaProductionTonsPerYear > 50.0, 'Annual NH3 should be > 50 tons/year');
assert(plantBalance.annualAvoidedCo2TonsPerYear > 90.0, 'Annual avoided CO2 should be > 90 tons/year');
console.log(`  ✓ Plant Balance: NH3 output = ${plantBalance.ammoniaProductionKgPerHour} kg/hr, N2 feed = ${plantBalance.nitrogenFeedRateKgPerHour} kg/hr (ratio = ${n2ToNh3Ratio.toFixed(3)}), Annual NH3 = ${plantBalance.annualAmmoniaProductionTonsPerYear} t/yr, Avoided CO2 = ${plantBalance.annualAvoidedCo2TonsPerYear} t/yr`);

console.log('🎉 Test Suite 298 PASSED: Lithium-Mediated Ammonia Engine is 100% verified!\n');
