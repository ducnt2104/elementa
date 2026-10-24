// tests/test-betavoltaic-nuclear-battery.mjs
// Test Suite 254: Betavoltaic Nuclear Batteries, Radioisotope Kinetics & Wide-Bandgap Semiconductor Transducers Audit

import assert from 'node:assert';
import {
  RADIOISOTOPES_CATALOG,
  SEMICONDUCTORS_CATALOG,
  simulateRadioactiveDecay,
  simulateBetavoltaicIVCurve,
  simulateLongevityCurve
} from '../src/domain/betavoltaicNuclearBatteryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 254: BETAVOLTAIC NUCLEAR BATTERIES AUDIT       ');
console.log('======================================================================\n');

// 1. Catalog Verification
console.log('1. Checking Radioisotopes & Wide-Bandgap Semiconductors Catalogs...');
assert(RADIOISOTOPES_CATALOG.length >= 4, 'Must catalog at least 4 radioisotopes');
const tritium = RADIOISOTOPES_CATALOG.find(i => i.id === 'TRITIUM_H3');
const ni63 = RADIOISOTOPES_CATALOG.find(i => i.id === 'NICKEL_63');
const c14 = RADIOISOTOPES_CATALOG.find(i => i.id === 'CARBON_14');
const pm147 = RADIOISOTOPES_CATALOG.find(i => i.id === 'PROMETHIUM_147');

assert(tritium && ni63 && c14 && pm147, 'All core isotopes must be defined');
assert.strictEqual(tritium.halfLifeYears, 12.32, 'Tritium half-life must be 12.32 years');
assert.strictEqual(ni63.halfLifeYears, 100.1, 'Ni-63 half-life must be 100.1 years');
assert.strictEqual(c14.halfLifeYears, 5730, 'C-14 half-life must be 5730 years');

assert(SEMICONDUCTORS_CATALOG.length >= 4, 'Must catalog at least 4 semiconductors');
const diamond = SEMICONDUCTORS_CATALOG.find(s => s.id === 'DIAMOND');
const sic = SEMICONDUCTORS_CATALOG.find(s => s.id === 'SILICON_CARBIDE_4H');
const silicon = SEMICONDUCTORS_CATALOG.find(s => s.id === 'SILICON_BASE');

assert(diamond && sic && silicon, 'Diamond, SiC, and Silicon must be cataloged');
assert.strictEqual(diamond.bandgapEv, 5.47, 'Diamond bandgap must be 5.47 eV');
assert.strictEqual(diamond.radiationDamageThresholdEv, 43.0, 'Diamond radiation damage threshold must be 43 eV');
console.log('  ✓ Catalogs verified: Tritium (12.32y), Ni-63 (100.1y), C-14 (5730y), Diamond (5.47 eV Eg)');

// 2. Radioactive Decay Kinetics
console.log('\n2. Testing Radioactive Decay Kinetics Across Half-Lives...');
const triDecay1HalfLife = simulateRadioactiveDecay('TRITIUM_H3', 10.0, 12.32);
assert(
  Math.abs(triDecay1HalfLife.activityRetentionRatio - 0.5) < 0.01,
  'Tritium activity after 1 half-life (12.32y) must be 50%'
);
assert(triDecay1HalfLife.emittedThermalPowerMicroWatt > 0, 'Emitted thermal power must be strictly positive');
console.log(`  - Tritium 10 Ci initial -> at 12.32y: ${triDecay1HalfLife.remainingActivityCi.toFixed(2)} Ci (Retention: ${(triDecay1HalfLife.activityRetentionRatio*100).toFixed(1)}%), P_thermal = ${triDecay1HalfLife.emittedThermalPowerMicroWatt.toFixed(1)} µW`);

const ni63Decay = simulateRadioactiveDecay('NICKEL_63', 5.0, 100.1);
assert(
  Math.abs(ni63Decay.activityRetentionRatio - 0.5) < 0.01,
  'Ni-63 activity after 100.1 years must be 50%'
);
console.log(`  - Ni-63 5 Ci initial -> at 100.1y: ${ni63Decay.remainingActivityCi.toFixed(2)} Ci (Retention: ${(ni63Decay.activityRetentionRatio*100).toFixed(1)}%)`);

const c14Decay = simulateRadioactiveDecay('CARBON_14', 1.0, 5730);
assert(
  Math.abs(c14Decay.activityRetentionRatio - 0.5) < 0.01,
  'Carbon-14 activity after 5730 years must be 50%'
);
console.log(`  - C-14 1 Ci initial -> at 5730y: ${c14Decay.remainingActivityCi.toFixed(2)} Ci (Retention: ${(c14Decay.activityRetentionRatio*100).toFixed(1)}%)`);
console.log('  ✓ Radioactive exponential decay laws verified');

// 3. Betavoltaic IV Polarization & Transducer Comparison
console.log('\n3. Testing Betavoltaic Transducer IV Curves & Bandgap Effect...');
// Test 1 Curie Ni-63 with Diamond vs Silicon
const diamondResult = simulateBetavoltaicIVCurve('NICKEL_63', 'DIAMOND', 2.0);
const siliconResult = simulateBetavoltaicIVCurve('NICKEL_63', 'SILICON_BASE', 2.0);

console.log(`  - Ni-63 on Diamond Transducer: Voc = ${diamondResult.systemResult.openCircuitVoltageVolts} V, P_max = ${diamondResult.systemResult.maxElectricalPowerMicroWatt} µW, Eff = ${diamondResult.systemResult.electricalConversionEfficiencyPercent}%`);
console.log(`  - Ni-63 on Silicon Transducer: Voc = ${siliconResult.systemResult.openCircuitVoltageVolts} V, P_max = ${siliconResult.systemResult.maxElectricalPowerMicroWatt} µW, Eff = ${siliconResult.systemResult.electricalConversionEfficiencyPercent}%`);

assert(
  diamondResult.systemResult.openCircuitVoltageVolts > 1.8,
  'Diamond wide bandgap must yield Voc > 1.8 V'
);
assert(
  diamondResult.systemResult.openCircuitVoltageVolts > siliconResult.systemResult.openCircuitVoltageVolts * 2.0,
  'Diamond Voc must be more than 2x higher than Silicon Voc'
);
assert(
  diamondResult.systemResult.electricalConversionEfficiencyPercent > 5.0 &&
  diamondResult.systemResult.electricalConversionEfficiencyPercent < 30.0,
  'Diamond betavoltaic efficiency must fall in realistic 5% - 30% range'
);
assert.strictEqual(diamondResult.ivPoints.length, 26, 'Must generate exactly 26 IV sample points');
assert(diamondResult.ivPoints[0].voltageVolts === 0, 'First IV point must be at V = 0');
assert(diamondResult.ivPoints[0].currentDensityMicroAmpPerCm2 > 0, 'Short circuit current density must be positive');
console.log('  ✓ Wide-bandgap voltage amplification and IV curve verified');

// 4. Multi-Decade Longevity Audit (Nuclear vs Chemical Li-Ion)
console.log('\n4. Testing Multi-Decade Longevity (Nuclear vs Chemical Li-Ion)...');
const longevityNi63Diamond = simulateLongevityCurve('NICKEL_63', 'DIAMOND', 2.0, 100);
assert(longevityNi63Diamond.length >= 10, 'Must have at least 10 longevity sample points');

const point0y = longevityNi63Diamond.find(p => p.years === 0);
const point20y = longevityNi63Diamond.find(p => p.years === 20);
const point50y = longevityNi63Diamond.find(p => p.years === 50);
const point100y = longevityNi63Diamond.find(p => p.years === 100);

console.log(`  - Year 0: Nuclear = ${point0y.electricalPowerMicroWatt} µW, Chemical Li-Ion = ${point0y.chemicalLiIonBaselineMicroWatt} µW`);
console.log(`  - Year 20: Nuclear = ${point20y.electricalPowerMicroWatt} µW, Chemical Li-Ion = ${point20y.chemicalLiIonBaselineMicroWatt} µW`);
console.log(`  - Year 50: Nuclear = ${point50y.electricalPowerMicroWatt} µW, Chemical Li-Ion = ${point50y.chemicalLiIonBaselineMicroWatt} µW`);
console.log(`  - Year 100: Nuclear = ${point100y.electricalPowerMicroWatt} µW, Chemical Li-Ion = ${point100y.chemicalLiIonBaselineMicroWatt} µW`);

assert.strictEqual(point20y.chemicalLiIonBaselineMicroWatt, 0, 'Chemical Li-ion must be completely dead at 20 years');
assert(
  point20y.electricalPowerMicroWatt > point0y.electricalPowerMicroWatt * 0.80,
  'Ni-63 nuclear battery must retain > 80% power at 20 years'
);
assert(
  point50y.electricalPowerMicroWatt > point0y.electricalPowerMicroWatt * 0.65,
  'Ni-63 nuclear battery must retain > 65% power at 50 years'
);
assert(
  point100y.electricalPowerMicroWatt > point0y.electricalPowerMicroWatt * 0.45,
  'Ni-63 nuclear battery must retain > 45% power even at 100 years'
);
console.log('  ✓ Nuclear 100-year endurance vs Chemical battery death confirmed');

console.log('\n======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 254 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
