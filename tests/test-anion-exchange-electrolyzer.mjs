// tests/test-anion-exchange-electrolyzer.mjs
// Test Suite 260: Anion Exchange Membrane Water Electrolysis (AEMWE), PGM-Free Catalysts & Terawatt Hydrogen Audit

import assert from 'node:assert';
import {
  ELECTROLYZER_TECHNOLOGIES_CATALOG,
  simulateElectrolyzerPolarization,
  simulateAEMWEPerformance
} from '../src/domain/anionExchangeElectrolyzerEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 260: ANION EXCHANGE ELECTROLYZER (AEMWE) AUDIT');
console.log('======================================================================\n');

// 1. Technologies Catalog & PGM-Free Verification
console.log('1. Checking Electrolyzer Technologies & PGM-Free Criteria...');
assert(ELECTROLYZER_TECHNOLOGIES_CATALOG.length >= 3, 'Must catalog at least 3 technologies');

const aemwe = ELECTROLYZER_TECHNOLOGIES_CATALOG.find(t => t.technology === 'AEMWE_PGM_FREE');
const pemwe = ELECTROLYZER_TECHNOLOGIES_CATALOG.find(t => t.technology === 'PEMWE_PRECIOUS_METALS');
const ael = ELECTROLYZER_TECHNOLOGIES_CATALOG.find(t => t.technology === 'AEL_TRADITIONAL_ALKALINE');

assert(aemwe && pemwe && ael, 'All 3 major water electrolysis architectures must be cataloged');
assert.strictEqual(aemwe.isPgmFree, true, 'AEMWE must be 100% PGM-Free (No Platinum, No Iridium)');
assert.strictEqual(aemwe.iridiumLoadingGramsPerKw, 0.0, 'AEMWE must require 0.0 g Iridium per kW');
assert(pemwe.iridiumLoadingGramsPerKw > 0.3, 'PEMWE must require scarce Iridium catalyst (> 0.3 g/kW)');
assert(
  aemwe.stackCostUsdPerKw < pemwe.stackCostUsdPerKw * 0.4,
  'AEMWE stack cost ($280/kW) must be less than 40% of PEMWE stack cost ($950/kW)'
);
console.log(`  - AEMWE Stack: Membrane = ${aemwe.membraneName.split(' ')[0]}, OER = ${aemwe.anodeOerCatalyst.split(' ')[0]}, Cost = $${aemwe.stackCostUsdPerKw}/kW, Ir = ${aemwe.iridiumLoadingGramsPerKw} g/kW`);
console.log(`  - PEMWE Stack: Membrane = ${pemwe.membraneName.split(' ')[0]}, OER = ${pemwe.anodeOerCatalyst.split(' ')[0]}, Cost = $${pemwe.stackCostUsdPerKw}/kW, Ir = ${pemwe.iridiumLoadingGramsPerKw} g/kW`);
console.log('  ✓ 100% PGM-Free catalyst configuration and low capital cost confirmed');

// 2. Polarization Overpotential Analysis
console.log('\n2. Testing AEMWE Polarization Curve & Overpotential Breakdown...');
const aemPolPoints = simulateElectrolyzerPolarization('AEMWE_PIPERION_NIFE', 65, 30);
assert.strictEqual(aemPolPoints.length, 26, 'Must generate exactly 26 polarization sample points');

const pt0 = aemPolPoints[0];
const pt1 = aemPolPoints[12]; // ~0.96 A/cm²
const pt2 = aemPolPoints[25]; // 2.0 A/cm²

console.log(`  - J = 0 A/cm²:    V_cell = ${pt0.cellVoltageVolts} V (Reversible OCV)`);
console.log(`  - J = ${pt1.currentDensityAcm2} A/cm²: V_cell = ${pt1.cellVoltageVolts} V (Ohmic = ${pt1.ohmicOverpotentialVolts} V, OER = ${pt1.anodeOerOverpotentialVolts} V, HER = ${pt1.cathodeHerOverpotentialVolts} V)`);
console.log(`  - J = ${pt2.currentDensityAcm2} A/cm²: V_cell = ${pt2.cellVoltageVolts} V (P = ${pt2.powerDensityWcm2} W/cm²)`);

assert(pt0.cellVoltageVolts > 1.15 && pt0.cellVoltageVolts < 1.35, 'Reversible OCV must be ~1.2 V');
assert(pt1.cellVoltageVolts > 1.65 && pt1.cellVoltageVolts < 2.10, 'AEMWE cell voltage at ~1 A/cm² must fall in 1.65 - 2.10 V');
assert(pt1.anodeOerOverpotentialVolts > 0 && pt1.cathodeHerOverpotentialVolts > 0, 'Activation overpotentials must be positive');
console.log('  ✓ Polarization kinetics and overpotential partitioning verified');

// 3. Hydrogen Production & LCOH Economics Simulation
console.log('\n3. Testing AEMWE Hydrogen Generation & LCOH Economics...');
const aemPerf = simulateAEMWEPerformance('AEMWE_PIPERION_NIFE', 65, 30, 1.2, 5.0, 0.03);

console.log(`  - AEMWE Performance at J = 1.2 A/cm² (5 m² stack, 30 bar, $0.03/kWh power):`);
console.log(`    * Cell Voltage: ${aemPerf.cellVoltageVolts} V`);
console.log(`    * H₂ Production: ${aemPerf.h2ProductionRateKgPerHour} kg/h (${aemPerf.h2ProductionRateNm3PerHour} Nm³/h)`);
console.log(`    * O₂ By-product: ${aemPerf.o2ProductionRateNm3PerHour} Nm³/h`);
console.log(`    * Specific Energy Consumption: ${aemPerf.specificEnergyConsumptionKwhPerKg} kWh/kg H₂ (${aemPerf.specificEnergyConsumptionKwhPerNm3} kWh/Nm³)`);
console.log(`    * Stack Efficiency (LHV): ${aemPerf.stackEfficiencyLhvPercent}%`);
console.log(`    * Levelized Cost of Hydrogen (LCOH): $${aemPerf.levelizedCostOfHydrogenUsdPerKg} / kg H₂`);
console.log(`    * Terawatt Scalability: ${aemPerf.terawattScalabilityBottleneckVerdict}`);

assert(aemPerf.h2ProductionRateKgPerHour > 0, 'H2 production rate must be strictly positive');
assert(
  Math.abs(aemPerf.o2ProductionRateNm3PerHour - aemPerf.h2ProductionRateNm3PerHour / 2) < 0.01,
  'O2 volume production must equal exactly half of H2 volume (2 H2O -> 2 H2 + O2)'
);
assert(
  aemPerf.specificEnergyConsumptionKwhPerKg > 45.0 && aemPerf.specificEnergyConsumptionKwhPerKg < 55.0,
  'Specific energy consumption must fall in realistic 45 - 55 kWh/kg H2 range'
);
assert(
  aemPerf.levelizedCostOfHydrogenUsdPerKg < 2.50,
  'AEMWE LCOH must be under $2.50/kg with $0.03/kWh renewable electricity'
);
assert(
  aemPerf.terawattScalabilityBottleneckVerdict.includes('KHÔNG BỊ NGHẼN NGUYÊN LIỆU'),
  'Must verify Terawatt scalability without material bottlenecks'
);
console.log('  ✓ Production rates, Faraday stoichiometry, and LCOH verified');

console.log('\n======================================================================');
console.log('   ALL 3 AUDIT CHECKS IN SUITE 260 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
