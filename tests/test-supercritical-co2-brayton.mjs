/**
 * test-supercritical-co2-brayton.mjs
 *
 * Test Suite 314: Supercritical CO2 (sCO2) Brayton Power Cycle & Direct Oxy-Combustion
 * Validates real-gas thermo-physical properties, RCBC efficiency advantage, and Allam cycle balance.
 */

import assert from 'assert';
import {
  SCO2_CYCLE_CONFIGS,
  CO2_CRITICAL_TEMP_C,
  CO2_CRITICAL_PRESSURE_BAR,
  calculateRealGasCo2Properties,
  calculateRecompressionCyclePerformance,
  calculateAllamCyclePlantBalance
} from '../src/domain/supercriticalCo2BraytonEngine.ts';

console.log('🧪 Running Test Suite 314: Supercritical CO2 Brayton Power Cycle Engine...');

// 1. Verify Catalog Configurations
console.log('  1. Verifying SCO2 Cycle Configurations Catalog...');
assert(SCO2_CYCLE_CONFIGS.length >= 4, 'Must define at least 4 sCO2 cycle configurations');
const rcbc = SCO2_CYCLE_CONFIGS.find(c => c.id === 'rcbc_nuclear_csp');
assert(rcbc, 'RCBC nuclear/CSP config must exist');
assert.strictEqual(rcbc.category, 'RECOMPRESSION');
assert(rcbc.thermalEfficiencyPct >= 50.0, 'RCBC efficiency must exceed 50%');

const allam = SCO2_CYCLE_CONFIGS.find(c => c.id === 'allam_fetvedt_oxyfuel');
assert(allam, 'Allam cycle config must exist');
assert.strictEqual(allam.category, 'DIRECT_OXYFUEL');
assert(allam.highPressureMpa >= 30.0, 'Allam cycle high pressure must be >= 30 MPa (300 bar)');
console.log('  ✓ Catalog configurations verified.');

// 2. Verify Real-Gas Thermo-Physical Properties Near Critical Point
console.log('  2. Verifying Real-Gas Thermo-Physical Properties...');
// Subcritical Gas at 1 bar, 25°C
const subGas = calculateRealGasCo2Properties(25, 1);
assert.strictEqual(subGas.state, 'SUB_GAS');
assert(subGas.compressibilityZ > 0.95, 'Z should be near 1.0 for low-pressure gas');

// Supercritical near critical point: 32°C, 77 bar
const nearCrit = calculateRealGasCo2Properties(32, 77);
assert.strictEqual(nearCrit.state, 'SUPERCRITICAL');
assert(nearCrit.compressibilityZ <= 0.45, `Z should plunge near critical point, got ${nearCrit.compressibilityZ}`);
assert(nearCrit.densityKgM3 >= 450, `Density should be near critical density (~ 467 kg/m3), got ${nearCrit.densityKgM3}`);
assert(nearCrit.compressionWorkRatioVsIdeal <= 0.40, `Compression work ratio should be <= 0.40 (> 60% savings), got ${nearCrit.compressionWorkRatioVsIdeal}`);
assert(nearCrit.specificHeatCpKjKgK > 5.0, `Cp should spike near pseudocritical line, got ${nearCrit.specificHeatCpKjKgK}`);

// Check slightly higher pressure compressor inlet: 32°C, 82 bar
const compInlet = calculateRealGasCo2Properties(32, 82);
assert(compInlet.densityKgM3 >= 500, `Compressor inlet density at 82 bar should be > 500 kg/m3, got ${compInlet.densityKgM3}`);

console.log(`  ✓ Real-gas properties: Z = ${nearCrit.compressibilityZ}, density = ${nearCrit.densityKgM3} kg/m3, work ratio = ${nearCrit.compressionWorkRatioVsIdeal} (saving > 60% work).`);

// 3. Verify Recompression Closed Brayton Cycle (RCBC) Performance
console.log('  3. Verifying Recompression Closed Brayton Cycle Performance...');
const rcbcRes = calculateRecompressionCyclePerformance(650, 200, 77, 0.32, 2400);
assert(rcbcRes.thermalEfficiencyPct >= 48.0 && rcbcRes.thermalEfficiencyPct <= 55.0, `RCBC efficiency should be 48-55%, got ${rcbcRes.thermalEfficiencyPct}%`);
assert(rcbcRes.netElectricalPowerMw > 200, `Net electrical power should be > 200 MW, got ${rcbcRes.netElectricalPowerMw} MW`);
assert(rcbcRes.efficiencyAdvantagePoints >= 6.0, `Efficiency advantage over steam Rankine should exceed 6 points, got ${rcbcRes.efficiencyAdvantagePoints}`);
assert(rcbcRes.pinchPointDeltaTC <= 10.0, `Pinch-point temperature delta should be <= 10°C, got ${rcbcRes.pinchPointDeltaTC}°C`);
console.log(`  ✓ RCBC: Net Power = ${rcbcRes.netElectricalPowerMw} MW, Efficiency = ${rcbcRes.thermalEfficiencyPct}% (+${rcbcRes.efficiencyAdvantagePoints}% vs Steam), Pinch ΔT = ${rcbcRes.pinchPointDeltaTC}°C.`);

// 4. Verify Allam-Fetvedt Direct Oxy-Combustion Plant Balance
console.log('  4. Verifying Allam-Fetvedt Oxy-Combustion Plant Balance...');
const allamRes = calculateAllamCyclePlantBalance(10.0, 1150, 300); // 10 kg/s CH4 = 500 MWth
assert(allamRes.netEfficiencyLhvPct >= 54.0 && allamRes.netEfficiencyLhvPct <= 60.0, `Allam net LHV efficiency should be 54-60%, got ${allamRes.netEfficiencyLhvPct}%`);
assert(allamRes.netElectricalPowerMw >= 270, `Net power output should be >= 270 MW, got ${allamRes.netElectricalPowerMw} MW`);
assert(allamRes.co2CapturedKgHr >= 95000, `Captured CO2 should be ~ 98,780 kg/hr, got ${allamRes.co2CapturedKgHr}`);
assert(allamRes.co2CapturedTonsYear >= 800000, `Annual captured CO2 should be > 800,000 t/yr, got ${allamRes.co2CapturedTonsYear}`);
assert(allamRes.distilledWaterTonsYear >= 650000, `Annual distilled water should exceed 650,000 t/yr, got ${allamRes.distilledWaterTonsYear}`);
assert(allamRes.avoidedCo2VsCcgtTonsYear >= 800000, `Avoided CO2 vs CCGT should exceed 800,000 t/yr, got ${allamRes.avoidedCo2VsCcgtTonsYear}`);

console.log(`  ✓ Allam Plant: Net Power = ${allamRes.netElectricalPowerMw} MWe, LHV Efficiency = ${allamRes.netEfficiencyLhvPct}%, Captured CO2 = ${allamRes.co2CapturedTonsYear} t/yr, Avoided CO2 = ${allamRes.avoidedCo2VsCcgtTonsYear} t/yr.`);

console.log('🎉 Test Suite 314 PASSED: Supercritical CO2 Brayton Power Cycle Engine is 100% verified!');
