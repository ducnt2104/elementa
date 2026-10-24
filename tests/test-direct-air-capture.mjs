// tests/test-direct-air-capture.mjs
// Test Suite 262: Direct Air Capture (DAC) & Separation Thermodynamics Audit

import assert from 'node:assert';
import {
  calculateThermodynamicMinimumWork,
  getDacReactionCycle,
  simulateDacProcess,
  compareDacTechnologies
} from '../src/domain/directAirCaptureEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 262: DIRECT AIR CAPTURE (DAC) THERMODYNAMICS');
console.log('======================================================================\n');

// 1. Thermodynamic Minimum Work & Dilution Penalty
console.log('1. Checking Thermodynamic Minimum Work of CO2 Separation...');
const work420ppm = calculateThermodynamicMinimumWork(420, 20);
console.log(`  - Ambient Air (420 ppm, 20°C): W_min = ${work420ppm.wMinKjMol} kJ/mol CO2 (${work420ppm.wMinKwhTon} kWh/ton CO2)`);

assert(
  work420ppm.wMinKjMol >= 20.0 && work420ppm.wMinKjMol <= 23.0,
  `W_min at 420 ppm must be around 21.4 kJ/mol (got ${work420ppm.wMinKjMol})`
);
assert(
  work420ppm.wMinKwhTon >= 125 && work420ppm.wMinKwhTon <= 145,
  `W_min at 420 ppm must be ~135 kWh/ton CO2 (got ${work420ppm.wMinKwhTon})`
);

// Compare with flue gas (e.g. coal/gas power plant flue gas at 12% = 120,000 ppm)
const workFlueGas = calculateThermodynamicMinimumWork(120000, 20);
console.log(`  - Point-Source Flue Gas (12%, 20°C): W_min = ${workFlueGas.wMinKjMol} kJ/mol CO2 (${workFlueGas.wMinKwhTon} kWh/ton CO2)`);
assert(
  work420ppm.wMinKwhTon > workFlueGas.wMinKwhTon * 2.5,
  'Separating dilute CO2 from air (420 ppm) must require > 2.5x higher thermodynamic work than flue gas (12%)'
);
console.log('  ✓ Thermodynamic minimum work and dilution penalty verified');

// 2. Chemical Reaction Cycles (KOH vs Amine)
console.log('\n2. Testing Chemical Reaction Cycles & Thermodynamic Enthalpies...');
const kohCycle = getDacReactionCycle('LIQUID_KOH');
const amineCycle = getDacReactionCycle('SOLID_AMINE_TVSA');

assert.strictEqual(kohCycle.length, 4, 'Liquid KOH cycle must have 4 reaction steps');
assert.strictEqual(amineCycle.length, 3, 'Solid Amine TVSA cycle must have 3 steps');

// Check KOH high-temperature calcination step
const calcinerStep = kohCycle.find(s => s.temperatureC >= 850);
assert(calcinerStep, 'KOH cycle must include calcination at >= 850°C');
assert(calcinerStep.deltaHKjMol > 150, 'CaCO3 calcination must be strongly endothermic (+178 kJ/mol)');
assert.strictEqual(calcinerStep.chemicalEquation.includes('CaCO3'), true, 'Calciner equation must decompose CaCO3');

// Check Amine low-temperature desorption step
const amineDesorbStep = amineCycle.find(s => s.stepNumber === 2);
assert(amineDesorbStep, 'Amine cycle step 2 must be desorption');
assert.strictEqual(amineDesorbStep.temperatureC, 100, 'Amine TVSA must desorb at mild 100°C');
assert.strictEqual(amineDesorbStep.pressureBar, 0.2, 'Amine TVSA must operate under vacuum (0.2 bar)');
console.log(`  - Liquid KOH: 4 steps, Calciner at ${calcinerStep.temperatureC}°C (ΔH = +${calcinerStep.deltaHKjMol} kJ/mol)`);
console.log(`  - Solid Amine: 3 steps, TVSA Desorption at ${amineDesorbStep.temperatureC}°C, ${amineDesorbStep.pressureBar} bar (ΔH = +${amineDesorbStep.deltaHKjMol} kJ/mol)`);
console.log('  ✓ Reaction stoichiometry and temperature regimes validated');

// 3. Process Simulation, Energy Partitioning & PtX Coupling
console.log('\n3. Testing Process Simulation, Energy Balances & PtX Coupling...');
const conditions = {
  airCo2Ppm: 420,
  ambientTempC: 20,
  airFlowRateM3h: 50000,
  captureEfficiency: 0.75,
  heatSource: 'GEOTHERMAL',
  electricityPriceUsdKwh: 0.04,
  thermalEnergyPriceUsdGj: 8.0
};

const simKoh = simulateDacProcess('LIQUID_KOH', conditions);
const simAmine = simulateDacProcess('SOLID_AMINE_TVSA', conditions);

// Check mass flows
assert(simKoh.airMassProcessedKgH > 50000, '50,000 m³/h air must exceed 50,000 kg/h mass');
assert(simKoh.co2CapturedKgH > 20 && simKoh.co2CapturedKgH < 40, 'CO2 captured from 50k m³/h air must be ~28 kg/h');
assert.strictEqual(simKoh.co2CapturedKgH, simAmine.co2CapturedKgH, 'Both processes must capture same CO2 for identical air intake');

// Check energy demands
assert(simKoh.specificThermalEnergyGjTon > simAmine.specificThermalEnergyGjTon, 'KOH high-temp calciner requires more GJ/ton than Amine TVSA');
assert(simKoh.waterConsumptionM3Ton > 0, 'Liquid KOH is a net water consumer due to cooling tower losses');
assert(simAmine.waterConsumptionM3Ton < 0, 'Solid amine TVSA is a net water producer due to atmospheric moisture condensation');

// Check cost calculations
assert(simKoh.costBreakdown.totalCostPerTonCo2 > 150 && simKoh.costBreakdown.totalCostPerTonCo2 < 450, 'Liquid KOH cost must be reasonable ($150 - $450/ton)');
assert(simAmine.costBreakdown.totalCostPerTonCo2 > 150 && simAmine.costBreakdown.totalCostPerTonCo2 < 500, 'Solid amine cost must be reasonable ($150 - $500/ton)');

// Check downstream PtX Coupling
assert(simKoh.couplingPtX.syngasCoOutputNm3H > 0, 'Syngas CO equivalent output must be positive');
assert(simKoh.couplingPtX.greenH2RequiredKgH > 0, 'Green H2 required for e-fuel synthesis must be positive');
assert(simKoh.couplingPtX.eKeroseneProductionLitersDay > 0, 'Daily e-kerosene potential must be calculated');

console.log(`  - Air Mass Processed: ${simKoh.airMassProcessedKgH} kg/h`);
console.log(`  - CO2 Capture Rate: ${simKoh.co2CapturedKgH} kg/h (${simKoh.co2CapturedTonsPerYear} tons/year)`);
console.log(`  - Liquid KOH Total Energy: ${simKoh.totalEnergyKwhTon} kWh/ton (Thermal: ${simKoh.specificThermalEnergyKwhTon} kWh, Elec: ${simKoh.specificElectricalEnergyKwhTon} kWh)`);
console.log(`  - Solid Amine Total Energy: ${simAmine.totalEnergyKwhTon} kWh/ton (Thermal: ${simAmine.specificThermalEnergyKwhTon} kWh, Elec: ${simAmine.specificElectricalEnergyKwhTon} kWh)`);
console.log(`  - Water Balance: KOH consumes ${simKoh.waterConsumptionM3Ton} m³/ton vs Amine produces ${Math.abs(simAmine.waterConsumptionM3Ton)} m³/ton clean water`);
console.log(`  - Net-Zero PtX Coupling: 24h capture provides feedstock for ${simKoh.couplingPtX.eKeroseneProductionLitersDay} Liters/day e-Kerosene with ${simKoh.couplingPtX.greenH2RequiredKgH} kg/h green H2`);
console.log('  ✓ Process kinetics, energy balances, water metrics and PtX coupling verified');

// 4. Technology Comparisons
console.log('\n4. Checking Technology Comparisons Matrix...');
const comparisons = compareDacTechnologies();
assert.strictEqual(comparisons.length, 2, 'Must compare both leading DAC technologies');
const kohComp = comparisons.find(c => c.type === 'LIQUID_KOH');
const amineComp = comparisons.find(c => c.type === 'SOLID_AMINE_TVSA');
assert(kohComp && amineComp, 'Comparison entries must match types');
assert(kohComp.desorptionTempC === 900 && amineComp.desorptionTempC === 100, 'Desorption temperatures must match');
console.log('  ✓ Technology comparison matrix verified');

console.log('\n======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 262 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
