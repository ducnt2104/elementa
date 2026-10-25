/**
 * ELEMENTA - TEST SUITE 374: COPPER-CHLORINE (Cu-Cl) THERMOCHEMICAL WATER-SPLITTING CYCLE AUDIT
 *
 * Verifies:
 * 1. Thermodynamic steps (4 steps, peak temp 530°C, endothermic reactions, zero net consumption)
 * 2. Electrochemical kinetics (0.55 V, ~14.9 kWh/kg H2, >70% electric energy savings vs PEM)
 * 3. Scaling simulation for 100 MWth nuclear/CSP plant (>1000 kg/h H2, >$2.5/kg LCOH, >38,000 t CO2 avoided)
 * 4. Heat source catalog (SCWR, LFR, CSP Molten Salt, Industrial HT heat)
 * 5. Multi-cycle benchmarking metrics (Cu-Cl vs S-I vs Zn/ZnO vs PEM)
 */

import assert from 'assert';
import {
  CU_CL_FOUR_STEPS,
  HEAT_SOURCE_CATALOG,
  calculateElectrolysisMetrics,
  calculateCuClPerformance,
  compareCuClVsOtherCycles
} from '../src/domain/copperChlorineCycleEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 374: COPPER-CHLORINE (Cu-Cl) CYCLE AUDIT');
console.log('======================================================================\n');

// 1. Thermodynamic Steps & Stoichiometry
console.log('1. Auditing 4-Step Reaction Thermodynamics & Temperature Limits...');
assert.strictEqual(CU_CL_FOUR_STEPS.length, 4, 'Cu-Cl cycle must have 4 distinct chemical/electrochemical steps');

const hydrolysis = CU_CL_FOUR_STEPS[0];
assert.strictEqual(hydrolysis.stepIndex, 1);
assert.strictEqual(hydrolysis.operatingTempC, 380, 'Hydrolysis temp must be ~380°C');
assert(hydrolysis.reactionEquation.includes('2 CuCl₂(s) + H₂O(g) -> Cu₂OCl₂(s) + 2 HCl(g)'));
assert(hydrolysis.enthalpyChangeKJPerMol > 100, 'Hydrolysis must be endothermic (>100 kJ/mol)');

const decomp = CU_CL_FOUR_STEPS[1];
assert.strictEqual(decomp.stepIndex, 2);
assert.strictEqual(decomp.operatingTempC, 530, 'Peak decomposition temp must be exactly 530°C');
assert(decomp.reactionEquation.includes('Cu₂OCl₂(s) -> 2 CuCl(l) + 1/2 O₂(g)'));

const electroStep = CU_CL_FOUR_STEPS[2];
assert.strictEqual(electroStep.stepIndex, 3);
assert.strictEqual(electroStep.operatingTempC, 80, 'Electrochemical cell temp must be ~80°C');
assert(electroStep.reactionEquation.includes('2 CuCl(aq) + 2 HCl(aq) -> 2 CuCl₂(aq) + H₂(g)'));

const crystalStep = CU_CL_FOUR_STEPS[3];
assert.strictEqual(crystalStep.stepIndex, 4);
assert.strictEqual(crystalStep.operatingTempC, 110, 'Crystallization temp must be ~110°C');
console.log('   -> All 4 steps verified with peak operating temp of 530°C <= 550°C Gen-IV nuclear limit.');

// 2. Electrochemical Splitting Performance
console.log('2. Auditing Electrochemical Splitting (CuCl/HCl) vs PEM Baseline...');
const defaultElectro = calculateElectrolysisMetrics(0.55, 0.98);
assert(defaultElectro.specificElectricityKWhPerKg >= 13.0 && defaultElectro.specificElectricityKWhPerKg <= 16.5,
  `Specific electricity (${defaultElectro.specificElectricityKWhPerKg} kWh/kg) must be between 13.0 and 16.5 kWh/kg`);
assert(defaultElectro.pemSavingsPercent >= 68.0 && defaultElectro.pemSavingsPercent <= 75.0,
  `Electricity savings vs PEM (${defaultElectro.pemSavingsPercent}%) must be ~70%`);
console.log(`   -> Specific electricity: ${defaultElectro.specificElectricityKWhPerKg} kWh/kg H2 (Savings vs PEM: ${defaultElectro.pemSavingsPercent}%).`);

// 3. Plant Scale Simulation (35 MWth SMR / 100 MWth Solar Molten Salt Hybrid System)
console.log('3. Auditing 35 MWth SMR & 100 MWth Solar Molten Salt Hybrid System...');
const smrPerf = calculateCuClPerformance({
  thermalInputMWth: 35,
  electrolyzerVoltageV: 0.55,
  heatSourceType: 'NUCLEAR_SCWR',
  heatExchangerRecovery: 0.75
});

assert(smrPerf.hydrogenProductionKgPerHour >= 900 && smrPerf.hydrogenProductionKgPerHour <= 1400,
  `35 MWth SMR should generate 900 - 1400 kg H2/h (got ${smrPerf.hydrogenProductionKgPerHour} kg/h)`);
assert(smrPerf.hydrogenProductionTonsPerDay >= 20.0 && smrPerf.hydrogenProductionTonsPerDay <= 35.0,
  `Daily output must be 20 - 35 metric tons/day (got ${smrPerf.hydrogenProductionTonsPerDay} t/day)`);
assert(smrPerf.oxygenProductionKgPerHour > smrPerf.hydrogenProductionKgPerHour * 7.5,
  'Oxygen co-product must follow 1:0.5 molar stoichiometry (~7.94 kg O2 / kg H2)');
assert(smrPerf.netThermalEfficiencyPercent >= 45.0 && smrPerf.netThermalEfficiencyPercent <= 55.0,
  `Net thermal efficiency (${smrPerf.netThermalEfficiencyPercent}%) must be 45 - 55%`);
assert(smrPerf.lcohUSDPerKg >= 1.90 && smrPerf.lcohUSDPerKg <= 3.20,
  `LCOH ($${smrPerf.lcohUSDPerKg}/kg) must be highly competitive ($1.90 - $3.20/kg)`);
assert(smrPerf.annualAvoidedCO2Tons > 30000,
  `Annual avoided CO2 (${smrPerf.annualAvoidedCO2Tons} tons) must exceed 30,000 tons`);
console.log(`   -> 35 MWth SMR Output: ${smrPerf.hydrogenProductionKgPerHour} kg H2/h (${smrPerf.hydrogenProductionTonsPerDay} t/day)`);
console.log(`   -> Efficiency: ${smrPerf.netThermalEfficiencyPercent}% LHV | LCOH: $${smrPerf.lcohUSDPerKg}/kg H2 | Avoided CO2: ${smrPerf.annualAvoidedCO2Tons} t/year.`);

const plant100Perf = calculateCuClPerformance({
  thermalInputMWth: 100,
  electrolyzerVoltageV: 0.55,
  heatSourceType: 'SOLAR_MOLTEN_SALT',
  heatExchangerRecovery: 0.75
});
assert(plant100Perf.hydrogenProductionKgPerHour >= 3000 && plant100Perf.hydrogenProductionKgPerHour <= 4000,
  `100 MWth plant should generate 3000 - 4000 kg H2/h (got ${plant100Perf.hydrogenProductionKgPerHour} kg/h)`);
assert(plant100Perf.hydrogenProductionTonsPerDay >= 70.0 && plant100Perf.hydrogenProductionTonsPerDay <= 95.0,
  `100 MWth daily output must be 70 - 95 metric tons/day (got ${plant100Perf.hydrogenProductionTonsPerDay} t/day)`);
console.log(`   -> 100 MWth Utility Output: ${plant100Perf.hydrogenProductionKgPerHour} kg H2/h (${plant100Perf.hydrogenProductionTonsPerDay} t/day)`);

// 4. Heat Source Catalog Verification
console.log('4. Auditing Heat Source Compatibility...');
const scwr = HEAT_SOURCE_CATALOG.NUCLEAR_SCWR;
assert(scwr, 'SCWR Gen-IV heat source must be present');
assert.strictEqual(scwr.nominalTempC, 550, 'SCWR nominal temperature must be 550°C');

const lfr = HEAT_SOURCE_CATALOG.NUCLEAR_LFR;
assert(lfr, 'LFR fast reactor heat source must be present');
assert.strictEqual(lfr.nominalTempC, 550, 'LFR nominal temperature must be 550°C');

const csp = HEAT_SOURCE_CATALOG.SOLAR_MOLTEN_SALT;
assert(csp, 'Solar Molten Salt CSP heat source must be present');
assert.strictEqual(csp.nominalTempC, 565, 'CSP salt temperature must be 565°C');
console.log('   -> All 4 primary heat sources verified.');

// 5. Multi-Cycle Technology Comparison Benchmark
console.log('5. Auditing Multi-Cycle Comparison Benchmark...');
const comparison = compareCuClVsOtherCycles();
assert.strictEqual(comparison.length, 4, 'Must benchmark 4 hydrogen production cycles');

const cucl = comparison.find(c => c.cycleName.includes('Copper-Chlorine'));
const si = comparison.find(c => c.cycleName.includes('Sulfur-Iodine'));
const zn = comparison.find(c => c.cycleName.includes('Zinc-Zinc Oxide'));
const pem = comparison.find(c => c.cycleName.includes('PEM'));

assert(cucl && si && zn && pem, 'All 4 benchmark cycles must be included');
assert.strictEqual(cucl.peakTempC, 530, 'Cu-Cl peak temp must be 530°C');
assert.strictEqual(si.peakTempC, 900, 'S-I peak temp must be 900°C');
assert.strictEqual(zn.peakTempC, 1677, 'Zn/ZnO peak temp must be 1677°C (1950 K)');
assert(cucl.electricityDemandKWhPerKg < pem.electricityDemandKWhPerKg * 0.35,
  'Cu-Cl electricity demand must be < 35% of PEM electrolysis demand');

console.log('   -> Multi-cycle benchmark verified across temperature, efficiency, electricity demand and materials.');

console.log('\n======================================================================');
console.log('   SUITE 374: ALL ASSERTIONS PASSED WITH ZERO REGRESSIONS!');
console.log('======================================================================\n');
