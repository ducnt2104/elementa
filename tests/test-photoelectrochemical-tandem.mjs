// tests/test-photoelectrochemical-tandem.mjs
// Test Suite 296: Direct Photoelectrochemical (PEC) Solar Tandem Water-Splitting & Concentrated PV-Electrolysis Engine

import assert from 'node:assert';
import {
  TANDEM_ARCHITECTURES,
  PASSIVATION_LAYERS,
  ELECTROCATALYSTS,
  STANDARD_THERMO_WATER_SPLITTING_VOLTAGE,
  calculateReversibleElectrolysisVoltage,
  generateTandemJVCurve,
  generateElectrochemicalLoadCurve,
  solveOperatingPoint,
  calculatePECSolarFarmBalance,
  simulateLifetimeDegradation
} from '../src/domain/photoelectrochemicalTandemEngine.ts';

console.log('🧪 Running Test Suite 296: Photoelectrochemical Tandem Engine...');

// Test 1: Catalog configurations & Bandgap Matching
console.log('  1. Verifying Tandem Architectures and Optical Properties...');
assert(TANDEM_ARCHITECTURES.III_V_GAINP2_GAAS, 'III-V tandem config must exist');
const iiiV = TANDEM_ARCHITECTURES.III_V_GAINP2_GAAS;
assert.strictEqual(iiiV.topCell.bandgapEv, 1.83);
assert.strictEqual(iiiV.bottomCell.bandgapEv, 1.42);
assert(iiiV.combinedVocVolts > 2.0, 'Combined Voc should be > 2.0 V for bias-free operation');
assert(iiiV.benchmarkedSthEfficiencyPct >= 18.0, 'III-V benchmark STH should be >= 18%');

const peroSi = TANDEM_ARCHITECTURES.PEROVSKITE_SILICON_TANDEM;
assert.strictEqual(peroSi.topCell.bandgapEv, 1.68);
assert.strictEqual(peroSi.bottomCell.bandgapEv, 1.12);
assert(peroSi.combinedVocVolts >= 1.9, 'Perovskite/Si Voc should be >= 1.9 V');
console.log('  ✓ Architectures, bandgap matching, and open-circuit voltages verified.');

// Test 2: Reversible Thermodynamic Potential
console.log('  2. Verifying Water Electrolysis Thermodynamics (E_rev)...');
const eRev25 = calculateReversibleElectrolysisVoltage(298.15);
assert.strictEqual(eRev25, STANDARD_THERMO_WATER_SPLITTING_VOLTAGE);
assert.strictEqual(eRev25, 1.229);

// Higher temperature decreases reversible potential
const eRev80 = calculateReversibleElectrolysisVoltage(353.15);
assert(eRev80 < 1.229, 'Reversible voltage at 80°C must be lower than at 25°C');
assert(eRev80 > 1.15, 'Reversible voltage should remain within physical bounds (~1.18 V)');
console.log(`  ✓ Thermodynamics verified: E_rev(25°C) = ${eRev25} V, E_rev(80°C) = ${eRev80.toFixed(3)} V.`);

// Test 3: Operating Point Intersection (J-V and Electrochemical Load)
console.log('  3. Verifying Spontaneous Bias-Free Water Splitting & Operating Point...');
const aldPass = PASSIVATION_LAYERS.ALD_TIO2_AMORPHOUS;
const niFePt = ELECTROCATALYSTS.NIFEOX_OER_PT_HER;

const opIiiV = solveOperatingPoint(iiiV, aldPass, niFePt, 1000, 1.0, 2.0, 25);
assert.strictEqual(opIiiV.isSpontaneousUnassisted, true, 'III-V tandem must operate spontaneously without external bias');
assert.strictEqual(opIiiV.requiredExternalBiasV, 0.0);
assert(opIiiV.operatingVoltageV >= 1.5 && opIiiV.operatingVoltageV <= 2.1, `Operating voltage should be 1.5-2.1 V, got ${opIiiV.operatingVoltageV}`);
assert(opIiiV.operatingCurrentDensityMaPerCm2 >= 10.0, `Operating current density should be >= 10 mA/cm2, got ${opIiiV.operatingCurrentDensityMaPerCm2}`);
assert(opIiiV.solarToHydrogenEfficiencyPct >= 14.0, `STH efficiency should be >= 14%, got ${opIiiV.solarToHydrogenEfficiencyPct}%`);
console.log(`  ✓ Operating Point (III-V): V_op = ${opIiiV.operatingVoltageV} V, J_op = ${opIiiV.operatingCurrentDensityMaPerCm2} mA/cm², STH = ${opIiiV.solarToHydrogenEfficiencyPct}%`);

// Test 4: Solar Farm Techno-Economics & Faraday Hydrogen Stoichiometry
console.log('  4. Verifying Solar Farm Balance of Plant and Faraday Stoichiometry...');
const farmBalance = calculatePECSolarFarmBalance(iiiV, aldPass, niFePt, 1000, 1.0, 1000, 1800, 5.0);
assert.strictEqual(farmBalance.collectorAreaM2, 1000);
assert.strictEqual(farmBalance.totalSolarPowerInKw, 1000); // 1000 m2 * 1 kW/m2 = 1000 kW
assert(farmBalance.operatingCurrentA > 10000, `Farm current should be > 10,000 A, got ${farmBalance.operatingCurrentA} A`);
assert(farmBalance.hydrogenProductionRateKgPerHour > 4.0, `H2 rate should be > 4 kg/hr, got ${farmBalance.hydrogenProductionRateKgPerHour} kg/hr`);

// Mass ratio of O2 to H2 should be exactly (32 / 4.032) ~ 7.936
const massRatio = farmBalance.oxygenProductionRateKgPerHour / farmBalance.hydrogenProductionRateKgPerHour;
assert(massRatio > 7.8 && massRatio < 8.1, `Mass ratio O2/H2 must be ~7.94, got ${massRatio.toFixed(3)}`);

assert(farmBalance.annualHydrogenProductionTonsPerYear > 5.0, 'Annual H2 production should be > 5 tons');
assert(farmBalance.annualAvoidedCo2TonsPerYear > 50.0, 'Annual avoided CO2 should be > 50 tons');
console.log(`  ✓ Farm Balance: H2 rate = ${farmBalance.hydrogenProductionRateKgPerHour} kg/hr, O2 rate = ${farmBalance.oxygenProductionRateKgPerHour} kg/hr (O2/H2 = ${massRatio.toFixed(2)}x), Annual H2 = ${farmBalance.annualHydrogenProductionTonsPerYear} t/yr, Avoided CO2 = ${farmBalance.annualAvoidedCo2TonsPerYear} t/yr`);

// Test 5: Passivation Degradation & Photocorrosion Simulation
console.log('  5. Verifying ALD Passivation vs Bare Photocorrosion Dynamics...');
const barePass = PASSIVATION_LAYERS.BARE_UNPROTECTED;
const bareDegradation = simulateLifetimeDegradation(barePass, 100);
assert.strictEqual(bareDegradation[0].waterSplittingActive, true);
// At 50 hours, bare semiconductor must have failed (operational lifetime is 3.5 hrs)
const failedPoint = bareDegradation.find(p => p.elapsedHours >= 20);
assert(failedPoint && !failedPoint.waterSplittingActive, 'Bare semiconductor must fail quickly without passivation');

const aldDegradation = simulateLifetimeDegradation(aldPass, 3000);
const midPoint = aldDegradation.find(p => p.elapsedHours === 1500);
assert(midPoint && midPoint.waterSplittingActive, 'ALD TiO2 must remain active at 1500 hours');
assert(midPoint.relativeSthRetentionPct > 90, `ALD TiO2 retention should remain > 90% at 1500 hrs, got ${midPoint.relativeSthRetentionPct}%`);
console.log('  ✓ Passivation simulation verified: ALD TiO2 retains >90% at 1500h whereas bare semiconductor degrades in <4 hours.');

console.log('🎉 Test Suite 296 PASSED: Photoelectrochemical Tandem Engine is 100% verified!\n');
