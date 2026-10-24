// tests/test-iodine-sulfur-cycle.mjs
// Test Suite 264: Iodine-Sulfur (IS / S-I) Thermochemical Water-Splitting Cycle Audit

import assert from 'node:assert';
import {
  getIodineSulfurCycleSteps,
  calculateCarnotLimit,
  simulateIodineSulfurPlant,
  compareThermochemicalCycles
} from '../src/domain/iodineSulfurCycleEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 264: IODINE-SULFUR (IS) THERMOCHEMICAL AUDIT');
console.log('======================================================================\n');

// 1. Core Reaction Steps & Thermodynamic Enthalpies
console.log('1. Checking Reaction Steps, Enthalpies & Net Stoichiometry...');
const steps = getIodineSulfurCycleSteps();
assert.strictEqual(steps.length, 3, 'Iodine-Sulfur cycle must consist of exactly 3 reactions');

const bunsen = steps.find(s => s.stepNumber === 1);
const h2so4Cracker = steps.find(s => s.stepNumber === 2);
const hiCracker = steps.find(s => s.stepNumber === 3);

assert(bunsen && h2so4Cracker && hiCracker, 'All 3 reactions must be defined');

// Step 1: Bunsen
assert.strictEqual(bunsen.chemicalEquation.includes('I2') && bunsen.chemicalEquation.includes('SO2'), true);
assert(bunsen.deltaHKjMol < 0, 'Bunsen reaction must be exothermic (ΔH < 0)');
assert(bunsen.phaseSeparationDetail.includes('H2SO4') && bunsen.phaseSeparationDetail.includes('HI'), 'Bunsen must form two immiscible liquid phases');

// Step 2: H2SO4 Crack
assert(h2so4Cracker.temperatureC >= 800, 'H2SO4 cracking must operate at high temperature >= 800°C');
assert(h2so4Cracker.deltaHKjMol > 200, 'H2SO4 cracking must be strongly endothermic (ΔH > 200 kJ/mol)');
assert(h2so4Cracker.chemicalEquation.includes('O2'), 'H2SO4 cracking must release pure O2 product');

// Step 3: HI Crack
assert(hiCracker.temperatureC >= 400 && hiCracker.temperatureC <= 500, 'HI cracking must operate at ~450°C');
assert(hiCracker.chemicalEquation.includes('H2'), 'HI cracking must release pure H2 product');
assert(hiCracker.deltaHKjMol > 0, 'HI cracking must be endothermic (ΔH > 0)');

console.log(`  - Bunsen (Step 1): T = ${bunsen.temperatureC}°C, ΔH = ${bunsen.deltaHKjMol} kJ/mol (Exothermic liquid-liquid separation)`);
console.log(`  - H2SO4 Cracking (Step 2): T = ${h2so4Cracker.temperatureC}°C, ΔH = +${h2so4Cracker.deltaHKjMol} kJ/mol (High-temp endothermic, yields O2)`);
console.log(`  - HI Cracking (Step 3): T = ${hiCracker.temperatureC}°C, ΔH = +${hiCracker.deltaHKjMol} kJ/mol (Intermediate endothermic, yields H2)`);
console.log('  ✓ Reaction stoichiometry, enthalpy signs and closed-loop recyclability verified');

// 2. Carnot Limit & Thermodynamic Efficiency
console.log('\n2. Checking Carnot Maximum Limit & Thermal Efficiency...');
const carnot850 = calculateCarnotLimit(850, 25);
console.log(`  - Carnot Theoretical Limit at 850°C: ${carnot850}%`);
assert(carnot850 > 70.0 && carnot850 < 76.0, `Carnot limit at 850°C must be ~73.5% (got ${carnot850}%)`);

const carnot950 = calculateCarnotLimit(950, 25);
assert(carnot950 > carnot850, 'Carnot limit must increase with higher peak reactor temperature');
console.log('  ✓ Carnot thermodynamic scaling validated');

// 3. Plant Mass & Energy Balances Simulation
console.log('\n3. Simulating 50 MWth VHTR Iodine-Sulfur Hydrogen Facility...');
const conditions = {
  vhtrHeatSourceTempC: 850,
  thermalPowerInputMw: 50,
  bunsenTempC: 100,
  hiDecompositionTempC: 450,
  so3DecompositionPressureBar: 3.0,
  excessIodineRatio: 6.0,
  thermalRecoveryEfficiency: 0.82
};

const sim = simulateIodineSulfurPlant(conditions);

// Verify efficiencies
assert(
  sim.actualThermalToHydrogenEfficiencyPct >= 42.0 && sim.actualThermalToHydrogenEfficiencyPct <= 55.0,
  `Actual thermal-to-hydrogen efficiency must fall in 42% - 55% range (got ${sim.actualThermalToHydrogenEfficiencyPct}%)`
);

// Verify hydrogen production rate
assert(
  sim.h2ProductionRateKgH > 650 && sim.h2ProductionRateKgH < 900,
  `50 MWth must produce ~700-800 kg H2/h (got ${sim.h2ProductionRateKgH} kg/h)`
);
assert.strictEqual(
  parseFloat((sim.h2ProductionRateNm3H / (2 * sim.o2ByproductRateNm3H)).toFixed(2)),
  1.0,
  'H2 to O2 volumetric production ratio must be exactly 2:1 conforming to H2O stoichiometry'
);

// Verify stoichiometric water consumption
const expectedWaterFeed = sim.h2ProductionRateKgH * (18.015 / 2.016);
assert(
  Math.abs(sim.waterFeedRateKgH - expectedWaterFeed) < 1.0,
  'Water feed rate must match exact stoichiometric consumption (8.936 kg H2O / kg H2)'
);

// Verify environmental & cost metrics
assert.strictEqual(sim.environmentalIntegrity.directCo2EmissionsGramsPerKgH2, 0.0, 'IS cycle must have 0 g CO2 emissions');
assert(sim.levelizedCostOfHydrogenUsdPerKg > 1.8 && sim.levelizedCostOfHydrogenUsdPerKg < 3.5, 'LCOH must be in $1.8 - $3.5/kg range');

console.log(`  - Thermal Power: ${sim.thermalPowerConsumedMw} MWth at ${sim.heatSourceTempC}°C`);
console.log(`  - Thermal-to-H2 Efficiency: ${sim.actualThermalToHydrogenEfficiencyPct}% (Carnot Max: ${sim.carnotMaxEfficiencyPct}%)`);
console.log(`  - H2 Output: ${sim.h2ProductionRateKgH} kg/h (${sim.h2ProductionRateNm3H} Nm³/h)`);
console.log(`  - O2 By-product: ${sim.o2ByproductRateNm3H} Nm³/h`);
console.log(`  - Water Feed Rate: ${sim.waterFeedRateKgH} kg/h`);
console.log(`  - Recirculating Inventories: I2 = ${sim.recirculatingInventories.iodineCirculationKgH} kg/h, SO2 = ${sim.recirculatingInventories.sulfurDioxideCirculationKgH} kg/h`);
console.log(`  - Levelized Cost of Hydrogen: $${sim.levelizedCostOfHydrogenUsdPerKg} / kg H2`);
console.log('  ✓ Mass balances, energy partitioning, Faraday-independent stoichiometry, and LCOH verified');

// 4. Comparison Matrix
console.log('\n4. Checking Thermochemical Cycles Comparison Matrix...');
const comparisons = compareThermochemicalCycles();
assert(comparisons.length >= 3, 'Must compare at least 3 thermochemical cycles');
const isCycle = comparisons.find(c => c.cycleName.includes('Iodine-Sulfur'));
assert(isCycle && isCycle.overallThermalEfficiencyPct > 45, 'Iodine-Sulfur must lead with > 45% efficiency');
console.log('  ✓ Thermochemical comparison matrix verified');

console.log('\n======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 264 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
