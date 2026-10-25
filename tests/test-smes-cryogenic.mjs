/**
 * ELEMENTA - TEST SUITE 286: SUPERCONDUCTING MAGNETIC ENERGY STORAGE (SMES) AUDIT
 *
 * Verifies:
 * 1. Superconductor Materials Catalog (REBCO, MgB2, BSCCO, Nb3Sn) & Critical Parameters
 * 2. Cryogen Coolant Synergy (Liquid Hydrogen 20.3 K vs LN2 77 K vs LHe 4.2 K)
 * 3. Magnetic Stored Energy, Volumetric Energy Density & Hoop Stress Calculations
 * 4. Synergistic LH2 Cooling Duty & Hybrid Chemical/Electrical Hub Integration
 * 5. Quench Detection & Fast Emergency Dump Protection Dynamics (tau = L / R_dump)
 * 6. Grid Energy Storage Technology Comparison Benchmark
 */

import assert from 'assert';
import {
  SUPERCONDUCTOR_CATALOG,
  CRYOGEN_COOLANT_CATALOG,
  calculateSmesPerformance,
  calculateLh2CryoSynergy,
  evaluateQuenchProtection,
  ENERGY_STORAGE_BENCHMARKS
} from '../src/domain/smesCryogenicEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 286: SMES & CRYOGENIC HYDROGEN AUDIT');
console.log('======================================================================\n');

// 1. Check Superconductor & Coolant Catalogs
console.log('1. Checking Superconductor Materials & Cryogen Coolants...');
const rebco = SUPERCONDUCTOR_CATALOG['REBCO_2G_YBCO'];
assert(rebco, 'REBCO 2G tape must exist');
assert.strictEqual(rebco.criticalTemperatureTcK, 93.0, 'REBCO Tc must be 93 K');
assert(rebco.criticalMagneticFieldAt20KTesla > 80.0, 'REBCO Bc2(20K) must be > 80 T');
assert(rebco.criticalCurrentDensityAt20KAcm2 > 2e6, 'REBCO Jc must be > 2 MA/cm² at 20K');

const mgb2 = SUPERCONDUCTOR_CATALOG['MGB2_DIBORIDE'];
assert(mgb2, 'MgB2 tape must exist');
assert.strictEqual(mgb2.criticalTemperatureTcK, 39.0, 'MgB2 Tc must be 39 K');
assert.strictEqual(mgb2.costPerMeterUsd, 12.0, 'MgB2 must be economical ($12/m)');

const lh2 = CRYOGEN_COOLANT_CATALOG['LIQUID_HYDROGEN_LH2_20K'];
assert(lh2, 'Liquid hydrogen must exist');
assert.strictEqual(lh2.boilingPointK, 20.3, 'LH2 boiling point must be 20.3 K');
assert.strictEqual(lh2.dualRoleAsFuel, true, 'LH2 must serve dual role as fuel and coolant');

console.log(`  - REBCO (YBCO): Tc = ${rebco.criticalTemperatureTcK} K, Bc2(20K) = ${rebco.criticalMagneticFieldAt20KTesla} T, Jc = ${(rebco.criticalCurrentDensityAt20KAcm2 / 1e6).toFixed(1)} MA/cm²`);
console.log(`  - MgB2:         Tc = ${mgb2.criticalTemperatureTcK} K, Cost = $${mgb2.costPerMeterUsd}/m`);
console.log(`  - Coolant LH2:  T_boil = ${lh2.boilingPointK} K, Latent Heat = ${lh2.latentHeatOfVaporizationKjPerKg} kJ/kg, Dual Fuel: ${lh2.dualRoleAsFuel}`);
console.log('  ✓ Superconductor catalog and cryogen properties verified\n');

// 2. Testing Stored Energy, Energy Density & Hoop Stress
console.log('2. Testing SMES Stored Energy, Energy Density & Hoop Stress...');
// L = 0.5 H, I = 2,000 A, B = 8.0 T
const smesPerf = calculateSmesPerformance({
  inductanceHenries: 0.5,
  operatingCurrentAmperes: 2000,
  peakMagneticFieldTesla: 8.0,
  coilRadiusMeters: 0.6,
  coilHeightMeters: 1.0,
  superconductorType: 'REBCO_2G_YBCO',
  coolantType: 'LIQUID_HYDROGEN_LH2_20K'
});

assert.strictEqual(smesPerf.storedEnergyMegaJoules, 1.0, 'E = 0.5 * 0.5 * 2000^2 = 1.0 MJ');
assert(Math.abs(smesPerf.storedEnergyKwh - 0.28) < 0.02, 'Stored energy should be ~0.28 kWh');
assert(smesPerf.magneticEnergyDensityMjPerM3 > 25.0, 'Energy density at 8T should be ~25.5 MJ/m³');
assert(smesPerf.hoopStressMpa > 25.0, 'Hoop stress should be ~25.5 MPa');
assert(smesPerf.burstProtectionFactor > 10.0, 'Burst protection margin must be ample');
assert.strictEqual(smesPerf.roundTripEfficiencyPct, 96.5, 'RTE must be 96.5%');
assert.strictEqual(smesPerf.peakDischargePowerMw, 0.1, '10s discharge of 1.0 MJ = 0.1 MW');
assert(smesPerf.responseDelayMilliseconds < 5.0, 'Response time must be sub-5ms');

console.log(`  - Stored Energy: ${smesPerf.storedEnergyMegaJoules} MJ (${smesPerf.storedEnergyKwh} kWh)`);
console.log(`  - Volumetric Energy Density: ${smesPerf.magneticEnergyDensityMjPerM3} MJ/m³`);
console.log(`  - Lorentz Hoop Stress: ${smesPerf.hoopStressMpa} MPa (Burst Safety Factor = ${smesPerf.burstProtectionFactor}x)`);
console.log(`  - Round-Trip Efficiency: ${smesPerf.roundTripEfficiencyPct}%`);
console.log(`  - Response Latency: ${smesPerf.responseDelayMilliseconds} ms`);
console.log('  ✓ Stored energy and electromagnetic physics verified\n');

// 3. Testing Liquid Hydrogen Cryogenic Synergy
console.log('3. Testing Liquid Hydrogen Cryo-Energy Hub Synergy...');
// SMES coil stored energy 0.01 MWh, 250 W thermal heat leak, 100 kg/h LH2 flow
const synergy = calculateLh2CryoSynergy(0.01, 250, 100.0);
assert(synergy.cryogenicPowerSavedKw >= 10.0, 'Cryogenic power saved must be >= 10 kW');
assert(synergy.hybridChemicalEnergyMwhLhv > 3.0, 'Chemical energy in LH2 stream must be > 3.0 MWh');
assert(synergy.totalHybridSystemEnergyMwh > 3.0, 'Total energy capacity must be > 3.0 MWh');
assert(synergy.annualRefrigerationCostSavedUsd > 10000, 'Annual savings must exceed $10,000/year');

console.log(`  - SMES Heat Leak: 250 W @ 20.3 K`);
console.log(`  - Cryogenic Refrigeration Power Saved: ${synergy.cryogenicPowerSavedKw} kW (avoids bulky helium cryocooler)`);
console.log(`  - LH2 Chemical Energy Stream: ${synergy.hybridChemicalEnergyMwhLhv} MWh LHV`);
console.log(`  - Total Hybrid Hub Capacity: ${synergy.totalHybridSystemEnergyMwh} MWh`);
console.log(`  - Annual Refrigeration Power Bill Saved: $${synergy.annualRefrigerationCostSavedUsd.toLocaleString()}/year`);
console.log('  ✓ LH2 cryo-energy synergy equations validated\n');

// 4. Testing Quench Detection & Fast Emergency Dump Dynamics
console.log('4. Testing Quench Protection Dynamics (V_dump = I * R_dump)...');
// L = 0.5 H, I = 2,000 A, R_dump = 0.5 Ohm
const quench = evaluateQuenchProtection(0.5, 2000, 0.5);
assert.strictEqual(quench.peakDumpVoltageVolts, 1000.0, 'Peak voltage must be 2000 * 0.5 = 1000 V');
assert.strictEqual(quench.quenchDischargeTimeConstantSec, 1.0, 'Tau must be 0.5 / 0.5 = 1.0 s');
assert.strictEqual(quench.isSafeQuench, true, 'Quench must be safe (V < 2500 V, T < 200 K)');
assert(quench.hotSpotTemperatureK < 100.0, 'Hot spot temp must be < 100 K');

console.log(`  - Operating Current: 2,000 A, Inductance: 0.5 H, Dump Resistor: 0.5 Ω`);
console.log(`  - Peak Voltage across Terminals: ${quench.peakDumpVoltageVolts} V (< 2,500 V insulation limit)`);
console.log(`  - Decay Time Constant (tau): ${quench.quenchDischargeTimeConstantSec} seconds`);
console.log(`  - Hot-Spot Adiabatic Temperature: ${quench.hotSpotTemperatureK} K`);
console.log(`  - Safety Status: ${quench.isSafeQuench ? 'SAFE' : 'HAZARDOUS'}`);
console.log('  ✓ Quench protection dynamics verified\n');

// 5. Checking Grid Energy Storage Technology Comparison Benchmark
console.log('5. Checking Grid Energy Storage Benchmarks Comparison...');
assert.strictEqual(ENERGY_STORAGE_BENCHMARKS.length, 4, 'Must benchmark 4 storage technologies');

const smesBenchmark = ENERGY_STORAGE_BENCHMARKS.find(b => b.technologyName.includes('SMES'));
assert(smesBenchmark, 'SMES benchmark must exist');
assert.strictEqual(smesBenchmark.roundTripEfficiencyPct, 96.5, 'SMES RTE must be 96.5%');
assert.strictEqual(smesBenchmark.degradationPerYearPct, 0.0, 'SMES annual degradation must be 0.0%');

const liIonBenchmark = ENERGY_STORAGE_BENCHMARKS.find(b => b.technologyName.includes('Lithium-Ion'));
assert(liIonBenchmark, 'Li-ion benchmark must exist');
assert(liIonBenchmark.degradationPerYearPct > 1.0, 'Li-ion must experience capacity degradation');

console.log(`  - SMES:        RTE = ${smesBenchmark.roundTripEfficiencyPct}%, Speed = ${smesBenchmark.responseSpeed}, Degradation = ${smesBenchmark.degradationPerYearPct}%/year`);
console.log(`  - Lithium-Ion: RTE = ${liIonBenchmark.roundTripEfficiencyPct}%, Speed = ${liIonBenchmark.responseSpeed}, Degradation = ${liIonBenchmark.degradationPerYearPct}%/year`);
console.log('  ✓ Multi-technology comparative benchmark validated\n');

console.log('======================================================================');
console.log('   TEST SUITE 286: ALL SMES & CRYO-HYDROGEN CHECKS PASSED!');
console.log('======================================================================');
