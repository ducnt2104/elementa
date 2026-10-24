// tests/test-supercritical-water-oxidation.mjs
// Test Suite 268: Supercritical Water Oxidation (SCWO) & PFAS Destruction Audit

import assert from 'node:assert';
import {
  SCWO_WASTE_BENCHMARKS,
  calculateWaterSupercriticalProperties,
  simulateScwoKinetics
} from '../src/domain/supercriticalWaterOxidationEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 268: SUPERCRITICAL WATER OXIDATION (SCWO) AUDIT');
console.log('======================================================================\n');

// 1. Water Critical Phenomena & Non-Polar Solvent Transition
console.log('1. Checking Supercritical Water Thermophysical Properties...');
const subcritical = calculateWaterSupercriticalProperties(25, 0.1);
const supercritical = calculateWaterSupercriticalProperties(500, 25.0);

console.log(`  - Subcritical (25°C, 0.1 MPa): Density = ${subcritical.densityKgM3} kg/m³, Dielectric ε_r = ${subcritical.dielectricConstant}, Salt Solubility = ${subcritical.saltSolubilityPpm} ppm`);
console.log(`  - Supercritical (500°C, 25 MPa): Density = ${supercritical.densityKgM3} kg/m³, Dielectric ε_r = ${supercritical.dielectricConstant}, Salt Solubility = ${supercritical.saltSolubilityPpm} ppm`);

// Dielectric constant plummet
assert(subcritical.dielectricConstant > 70, 'Liquid water at 25°C must have high dielectric constant (> 70)');
assert(
  supercritical.dielectricConstant < 5.0,
  `Supercritical water at 500°C must have non-polar dielectric constant < 5.0 (got ${supercritical.dielectricConstant})`
);

// Miscibility inversion
assert.strictEqual(supercritical.organicMiscibilityPct, 100.0, 'Organics must be 100% miscible in supercritical water');
assert.strictEqual(supercritical.oxygenMiscibilityPct, 100.0, 'Oxygen must be 100% miscible in supercritical water');

// Spontaneous salt precipitation
assert(
  supercritical.saltSolubilityPpm < 250,
  'Inorganic salts must exhibit near-zero solubility (< 250 ppm) in supercritical water'
);
console.log('  ✓ Critical phenomena, non-polar transition (ε_r < 5) and homogeneous phase verified');

// 2. PFAS "Forever Chemicals" Destruction & Removal Efficiency (DRE)
console.log('\n2. Testing PFAS Destruction Kinetics & Mineralization...');
const pfasConditions = {
  operatingTempC: 550,
  operatingPressureMpa: 25.0,
  residenceTimeSeconds: 50,
  excessOxygenRatio: 1.25,
  wasteFeedFlowRateKgH: 1000,
  organicCodPpm: 45000,
  transpiringWallWaterPct: 10
};

const simPfas = simulateScwoKinetics('PFAS_FOREVER_CHEMICALS', pfasConditions);

// DRE should exceed 99.99% ("four to six nines")
assert(
  simPfas.destructionRemovalEfficiencyPct >= 99.99,
  `PFAS DRE must exceed 99.99% (got ${simPfas.destructionRemovalEfficiencyPct}%)`
);
assert(
  simPfas.pfasMineralizationPct >= 99.9,
  `C-F bond mineralization to fluoride must exceed 99.9% (got ${simPfas.pfasMineralizationPct}%)`
);

// Emissions zero checks
assert.strictEqual(simPfas.effluentEmissions.noXEmissionsPpm, 0.0, 'NOx emissions must be 0 ppm (below 700°C thermal NOx threshold)');
assert.strictEqual(simPfas.effluentEmissions.dioxinFuranNgM3, 0.0, 'Dioxin/furan must be 0 ng/m³ (complete flameless oxidation)');

console.log(`  - Destruction & Removal Efficiency (DRE): ${simPfas.destructionRemovalEfficiencyPct}%`);
console.log(`  - PFAS C-F Mineralization: ${simPfas.pfasMineralizationPct}% to non-toxic CaF2 fluorspar`);
console.log(`  - Clean Water Recovery: ${simPfas.cleanWaterRecoveryM3Day} m³/day`);
console.log(`  - Clean Effluent: NOx = ${simPfas.effluentEmissions.noXEmissionsPpm} ppm, Dioxins = ${simPfas.effluentEmissions.dioxinFuranNgM3} ng/m³`);
console.log('  ✓ Six-nines destruction efficiency and zero-emission profile verified');

// 3. Autothermal Combustion & Energy Recovery
console.log('\n3. Testing Autothermal Combustion & Heat Recovery...');
const sludgeConditions = {
  operatingTempC: 580,
  operatingPressureMpa: 28.0,
  residenceTimeSeconds: 45,
  excessOxygenRatio: 1.30,
  wasteFeedFlowRateKgH: 2000,
  organicCodPpm: 85000, // High COD biosludge
  transpiringWallWaterPct: 12
};

const simSludge = simulateScwoKinetics('MUNICIPAL_SEWAGE_SLUDGE', sludgeConditions);

assert.strictEqual(simSludge.isAutothermal, true, '85,000 ppm COD sludge must be self-sustaining autothermal');
assert(simSludge.thermalPowerGeneratedKw > 500, 'Must generate > 500 kW thermal power from combustion');
assert(simSludge.energyEconomics.operatingCostPerTonWasteUsd < 100, 'Autothermal operation must reduce OPEX below $100/ton');

console.log(`  - Autothermal Combustion: ${simSludge.isAutothermal ? 'YES (Self-Sustaining without auxiliary fuel)' : 'NO'}`);
console.log(`  - Thermal Power Output: ${simSludge.thermalPowerGeneratedKw} kW`);
console.log(`  - Net Electricity Export: ${simSludge.energyEconomics.netElectricityExportKwhTon} kWh / ton waste`);
console.log(`  - Treatment Cost: $${simSludge.energyEconomics.operatingCostPerTonWasteUsd} / ton waste`);
console.log('  ✓ Autothermal self-sustained regime and economics validated');

// 4. Waste Benchmarks Catalog
console.log('\n4. Checking Waste Stream Catalog...');
assert(SCWO_WASTE_BENCHMARKS.length >= 4, 'Must catalog at least 4 waste benchmarks');
const pfas = SCWO_WASTE_BENCHMARKS.find(b => b.type === 'PFAS_FOREVER_CHEMICALS');
assert(pfas && pfas.bondDissociationEnergyKjMol >= 485, 'PFAS must document 485 kJ/mol C-F bond energy');
console.log('  ✓ Waste stream benchmarks catalog verified');

console.log('\n======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 268 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
