// tests/test-perovskite-solar-cells.mjs
// Test Suite 256: Perovskite Solar Cells, ABX3 Crystal Lattices & 2-Terminal Tandem Record Audit

import assert from 'node:assert';
import {
  calculateGoldschmidtTolerance,
  PEROVSKITE_COMPOSITIONS_CATALOG,
  simulateSolarCellPerformance,
  simulatePerovskiteStabilityISOS
} from '../src/domain/perovskiteSolarEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 256: PEROVSKITE SOLAR CELLS & TANDEM AUDIT     ');
console.log('======================================================================\n');

// 1. Goldschmidt Tolerance Factor & Compositions
console.log('1. Checking Perovskite Compositions & Goldschmidt Tolerance Formula...');
assert(PEROVSKITE_COMPOSITIONS_CATALOG.length >= 4, 'Must catalog at least 4 compositions');

const mapi = PEROVSKITE_COMPOSITIONS_CATALOG.find(c => c.id === 'MAPI_PURE');
const fapi = PEROVSKITE_COMPOSITIONS_CATALOG.find(c => c.id === 'FAPI_STABILIZED_CS');
const wideGap = PEROVSKITE_COMPOSITIONS_CATALOG.find(c => c.id === 'MIXED_HALIDE_WIDE_GAP');
const tinLeadFree = PEROVSKITE_COMPOSITIONS_CATALOG.find(c => c.id === 'TIN_HALIDE_LEAD_FREE');

assert(mapi && fapi && wideGap && tinLeadFree, 'All 4 key compositions must exist');
assert.strictEqual(tinLeadFree.isLeadFree, true, 'MASnI3 must be marked lead-free');

// Test formula t = (rA + rX) / (sqrt(2) * (rB + rX))
const calcMapi = calculateGoldschmidtTolerance(mapi.aRadiusAngstrom, mapi.bRadiusAngstrom, mapi.xRadiusAngstrom);
assert(
  Math.abs(calcMapi.toleranceFactor - mapi.goldschmidtToleranceFactor) < 0.01,
  'Calculated Goldschmidt tolerance factor must match formula'
);
assert(calcMapi.toleranceFactor > 0.88 && calcMapi.toleranceFactor < 1.02, 'MAPI must fall into ideal cubic alpha phase');
console.log(`  - MAPI: t = ${calcMapi.toleranceFactor}, mu = ${calcMapi.octahedralFactor} -> ${calcMapi.crystalVerdict}`);
console.log(`  - FAPI (Cs-stabilized): t = ${fapi.goldschmidtToleranceFactor}, Eg = ${fapi.bandgapEv} eV`);
console.log(`  - Tandem Top-Cell Wide-Gap: t = ${wideGap.goldschmidtToleranceFactor}, Eg = ${wideGap.bandgapEv} eV`);
console.log(`  - Lead-Free MASnI3: t = ${tinLeadFree.goldschmidtToleranceFactor}, Eg = ${tinLeadFree.bandgapEv} eV`);
console.log('  ✓ Goldschmidt crystal stability & composition metrics confirmed');

// 2. Photovoltaic Simulation & Single-Junction vs 2T Tandem Comparison
console.log('\n2. Testing Single-Junction vs 2-Terminal Tandem Photovoltaic Performance...');
const singlePerovskite = simulateSolarCellPerformance('SINGLE_JUNCTION_PEROVSKITE', 'FAPI_STABILIZED_CS', 1.0, 25);
const singleSilicon = simulateSolarCellPerformance('SINGLE_JUNCTION_SILICON', 'FAPI_STABILIZED_CS', 1.0, 25);
const tandem2T = simulateSolarCellPerformance('TANDEM_PEROVSKITE_SILICON_2T', 'MIXED_HALIDE_WIDE_GAP', 1.0, 25);

console.log(`  - Single-Junction Perovskite: Voc = ${singlePerovskite.performance.openCircuitVoltageVocVolts} V, Jsc = ${singlePerovskite.performance.shortCircuitCurrentJscMaPerCm2} mA/cm², PCE = ${singlePerovskite.performance.powerConversionEfficiencyPercent}%`);
console.log(`  - Single-Junction Silicon:    Voc = ${singleSilicon.performance.openCircuitVoltageVocVolts} V, Jsc = ${singleSilicon.performance.shortCircuitCurrentJscMaPerCm2} mA/cm², PCE = ${singleSilicon.performance.powerConversionEfficiencyPercent}%`);
console.log(`  - 2-Terminal Tandem:          Voc = ${tandem2T.performance.openCircuitVoltageVocVolts} V, Jsc = ${tandem2T.performance.shortCircuitCurrentJscMaPerCm2} mA/cm², PCE = ${tandem2T.performance.powerConversionEfficiencyPercent}%`);

// Single junction checks
assert(
  singlePerovskite.performance.powerConversionEfficiencyPercent >= 22.0 &&
  singlePerovskite.performance.powerConversionEfficiencyPercent <= 27.5,
  'Perovskite single-junction PCE must be in 22% - 27.5% range'
);
assert(
  singleSilicon.performance.openCircuitVoltageVocVolts < 0.80,
  'Silicon single-junction Voc must be < 0.80 V'
);

// Tandem 2T checks:
assert(
  tandem2T.performance.openCircuitVoltageVocVolts > 1.90,
  '2-Terminal Tandem Voc must exceed 1.90 V (series sum of top and bottom subcells)'
);
assert(
  tandem2T.performance.powerConversionEfficiencyPercent > 32.5,
  '2-Terminal Tandem PCE must exceed 32.5% to break single-junction limit'
);
assert.strictEqual(tandem2T.performance.exceedsSingleJunctionLimit, true, 'exceedsSingleJunctionLimit must be true');
assert(tandem2T.performance.currentMatchingStatus.includes('Khớp dòng'), 'Current matching status must be reported');
console.log('  ✓ 2-Terminal Tandem efficiency breakthrough confirmed (> 32.5% PCE, Voc ~ 1.99 V)');

// 3. IV Polarization Curve Points
console.log('\n3. Testing IV Polarization Curve Samples...');
assert.strictEqual(tandem2T.ivPoints.length, 26, 'Must generate exactly 26 IV sample points');
assert.strictEqual(tandem2T.ivPoints[0].voltageVolts, 0, 'First IV point must be at V = 0');
assert(tandem2T.ivPoints[0].currentDensityMaPerCm2 > 0, 'Short circuit current density must be positive');
assert(
  tandem2T.ivPoints[25].currentDensityMaPerCm2 < tandem2T.ivPoints[0].currentDensityMaPerCm2 * 0.1,
  'Current at Voc must drop near 0'
);
console.log('  ✓ Photovoltaic IV curve characteristics verified');

// 4. ISOS Stability & Degradation Protocol
console.log('\n4. Testing ISOS Long-Term Operational Stability Simulation...');
const stabilityPoints = simulatePerovskiteStabilityISOS(2000);
assert(stabilityPoints.length >= 8, 'Must return at least 8 stability time samples');

const h0 = stabilityPoints.find(p => p.hoursIllumination === 0);
const h300 = stabilityPoints.find(p => p.hoursIllumination === 300);
const h1000 = stabilityPoints.find(p => p.hoursIllumination === 1000);

console.log(`  - 0 Hours:    Unpassivated = ${h0.standardUnpassivatedPcePercent}%, 2D/3D Passivated = ${h0.passivated2d3dEncapsulatedPcePercent}%, Silicon = ${h0.siliconBaselinePcePercent}%`);
console.log(`  - 300 Hours:  Unpassivated = ${h300.standardUnpassivatedPcePercent}%, 2D/3D Passivated = ${h300.passivated2d3dEncapsulatedPcePercent}%, Silicon = ${h300.siliconBaselinePcePercent}%`);
console.log(`  - 1000 Hours: Unpassivated = ${h1000.standardUnpassivatedPcePercent}%, 2D/3D Passivated = ${h1000.passivated2d3dEncapsulatedPcePercent}%, Silicon = ${h1000.siliconBaselinePcePercent}%`);

assert(
  h300.standardUnpassivatedPcePercent < h0.standardUnpassivatedPcePercent * 0.5,
  'Unpassivated MAPI must degrade > 50% after 300h due to moisture'
);
assert(
  h1000.passivated2d3dEncapsulatedPcePercent > h0.passivated2d3dEncapsulatedPcePercent * 0.90,
  'Passivated 2D/3D cell must retain > 90% PCE after 1000h (ISOS-L-1)'
);
console.log('  ✓ Hydrolysis degradation and 2D/3D passivation longevity verified');

console.log('\n======================================================================');
console.log('   ALL 4 AUDIT CHECKS IN SUITE 256 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
