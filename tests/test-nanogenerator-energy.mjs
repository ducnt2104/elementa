// tests/test-nanogenerator-energy.mjs
// Test Suite 238: Piezoelectric & Triboelectric Nanogenerators (PENG & TENG) Engine
// Standards: IUPAC Advanced Materials, Maxwell's Displacement Current (Wang 2006, 2012) & Vietnam GDPT 2018 (Vật lý & Hóa học Năng lượng Tự cấp nguồn)

import assert from 'node:assert';
import {
  PIEZOELECTRIC_MATERIALS_CATALOG,
  TRIBOELECTRIC_PAIRS_CATALOG,
  getPiezoelectricMaterials,
  getTriboelectricPairs,
  calculatePengOutput,
  calculateTengOutput,
  simulatePmuStorageCharging
} from '../src/domain/nanogeneratorEnergyEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 238: NANOGENERATOR ENERGY ENGINE AUDIT (PENG/TENG) ');
console.log('======================================================================\n');

// 1. Verify Catalogs Integrity
console.log('1. Checking PENG & TENG Materials Catalogs...');
const piezoList = getPiezoelectricMaterials();
assert(piezoList.length >= 4, 'Must provide at least 4 piezoelectric materials');

const pvdf = piezoList.find(p => p.id === 'PVDF_BETA_POLYMER');
const zno = piezoList.find(p => p.id === 'ZNO_NANOWIRES');
const knn = piezoList.find(p => p.id === 'KNN_LEAD_FREE_CERAMIC');
const pzt = piezoList.find(p => p.id === 'PZT_PIEZOCERAMIC');

assert(pvdf && zno && knn && pzt, 'Core materials (PVDF, ZnO, KNN, PZT) must all exist');
assert.strictEqual(pvdf.leadFreeEcoCompliant, true, 'PVDF polymer must be lead-free and biocompatible');
assert.strictEqual(knn.leadFreeEcoCompliant, true, 'KNN ceramic must be lead-free compliant');
assert.strictEqual(pzt.leadFreeEcoCompliant, false, 'PZT contains lead and is not RoHS compliant');
assert(Math.abs(pvdf.g33VoltageCoefficientVmN) > 300, 'PVDF must exhibit high voltage coefficient g33 > 300 mV·m/N');

const triboList = getTriboelectricPairs();
assert(triboList.length >= 4, 'Must provide at least 4 triboelectric pairs covering 4 fundamental modes');
const ptfe = triboList.find(t => t.id === 'PTFE_ALUMINUM_CONTACT');
const ocean = triboList.find(t => t.id === 'OCEAN_BLUE_ENERGY_SPHERE');

assert(ptfe && ocean, 'PTFE/Al contact mode and Ocean freestanding mode must exist');
assert.strictEqual(ptfe.preferredWorkingMode, 'VERTICAL_CONTACT_SEPARATION');
assert.strictEqual(ocean.preferredWorkingMode, 'FREE_STANDING');
console.log('  ✓ Materials catalogs confirmed with full crystallography and piezoelectric metrics\n');

// 2. Verify Piezoelectric Nanogenerator (PENG) Performance
console.log('2. Testing Piezoelectric Nanogenerator (PENG) Kinetics...');
const pengPvdf = calculatePengOutput('PVDF_BETA_POLYMER', 30.0, 5.0, 50.0, 10.0);
console.log(`  - PVDF-β PENG (F = 30N, f = 5Hz): V_oc = ${pengPvdf.peakOpenCircuitVoltageV} V, I_sc = ${pengPvdf.peakShortCircuitCurrentMicroA} μA`);
console.log(`  - Instantaneous Power: ${pengPvdf.instantaneousPowerMilliW} mW, Energy per cycle: ${pengPvdf.energyPerCycleMicroJ} μJ`);

assert(pengPvdf.peakOpenCircuitVoltageV > 10.0, 'PENG must generate open circuit voltage > 10V under 30N impact');
assert(pengPvdf.peakShortCircuitCurrentMicroA > 0.05, 'Short circuit current must be positive');
assert(pengPvdf.instantaneousPowerMilliW > 0, 'Instantaneous power must be positive');
console.log('  ✓ PENG mechanical-to-electrical energy conversion verified\n');

// 3. Verify Triboelectric Nanogenerator (TENG) & Impedance Matching
console.log('3. Testing Triboelectric Nanogenerator (TENG) & Impedance Matching...');
const tengOut = calculateTengOutput('PTFE_ALUMINUM_CONTACT', 4.0, 2.0, 25.0);
console.log(`  - PTFE/Al TENG: Transferred Charge Q = ${tengOut.transferredChargeNanocoulombs} nC`);
console.log(`  - Optimal Load Resistance: ${tengOut.optimalLoadResistanceMegaOhms} MΩ`);
console.log(`  - Peak Matched Power: ${tengOut.matchedPeakPowerMilliW} mW`);

assert(tengOut.transferredChargeNanocoulombs > 100.0, 'Transferred charge must exceed 100 nC for 25 cm² PTFE/Al');
assert(tengOut.optimalLoadResistanceMegaOhms >= 1.0, 'TENG source impedance must naturally fall in Mega-Ohm range (high voltage, low current)');
assert(tengOut.matchedPeakPowerMilliW > 0.5, 'TENG instantaneous power must exceed 0.5 mW');
console.log('  ✓ TENG displacement current and impedance matching validated\n');

// 4. Verify Power Management Unit (PMU) & Energy Storage
console.log('4. Testing PMU Rectifier & Capacitor Storage Charging...');
const pmuTeng = simulatePmuStorageCharging('TRIBOELECTRIC_TENG', 'PTFE_ALUMINUM_CONTACT', 30.0, 100.0);
console.log(`  - 30s TENG Charging (C = 100 μF): Voltage V_cap = ${pmuTeng.accumulatedVoltageV} V, Stored Energy = ${pmuTeng.storedEnergyMilliJoules} mJ`);
console.log(`  - Can Power IoT BLE Sensor: ${pmuTeng.canPowerIotSensorNode}`);

assert(pmuTeng.accumulatedVoltageV >= 3.0, '30s of TENG harvesting must charge capacitor to >= 3.0V');
assert(pmuTeng.storedEnergyMilliJoules >= 1.2, 'Accumulated energy must exceed 1.2 mJ IoT BLE transmission threshold');
assert.strictEqual(pmuTeng.canPowerIotSensorNode, true, 'Self-powered IoT BLE transmission must be successfully validated');
console.log('  ✓ PMU energy accumulation and autonomous sensor power verified\n');

console.log('======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 238 PASSED WITH DISTINCTION!           ');
console.log('======================================================================');
