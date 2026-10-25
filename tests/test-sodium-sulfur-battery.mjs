/**
 * test-sodium-sulfur-battery.mjs
 *
 * Test Suite 348: High-Temperature Solid-State Sodium-Sulfur (Na-S) Battery Domain Engine Verification
 * Verifies Sodium Beta''-Alumina Solid Electrolyte (BASE), polysulfide phase equilibria,
 * 100% Coulombic efficiency, thermal self-sustenance, and 10 MW / 60 MWh grid-scale plant economics.
 */

import assert from 'assert';
import {
  BASE_ELECTROLYTES,
  SodiumSulfurBatteryEngine
} from '../src/domain/sodiumSulfurBatteryEngine.ts';

console.log('🧪 Running Test Suite 348: High-Temperature Solid-State Sodium-Sulfur (Na-S) Battery Engine...');

// =========================================================================
// 1. BASE Solid Electrolyte Specifications & Ionic Conductivity
// =========================================================================
console.log('  1. Verifying BASE Solid Electrolyte Specifications...');
const tubular = BASE_ELECTROLYTES.BASE_TUBULAR_STANDARD;
assert.strictEqual(tubular.geometry, 'TUBULAR', 'Standard BASE must be tubular');
assert(tubular.ionicConductivity320CSPerCm >= 0.25, 'BASE ionic conductivity at 320°C must be >= 0.25 S/cm');
assert(tubular.mechanicalStrengthMpa >= 200, 'Mechanical burst strength must be >= 200 MPa');

const sigma300 = SodiumSulfurBatteryEngine.calculateBaseConductivity(tubular, 300);
const sigma350 = SodiumSulfurBatteryEngine.calculateBaseConductivity(tubular, 350);
assert(sigma350 > sigma300, 'Conductivity must follow Arrhenius temperature increase');
console.log(`  ✓ BASE electrolyte: sigma(300°C) = ${sigma300.toFixed(3)} S/cm ➔ sigma(350°C) = ${sigma350.toFixed(3)} S/cm.`);

// =========================================================================
// 2. Polysulfide Phase Equilibria & OCV Profile
// =========================================================================
console.log('  2. Verifying Polysulfide Phase Equilibria & Voltage Plateau...');
// Two-phase region: 80% SOC
const ocvTwoPhase = SodiumSulfurBatteryEngine.calculateCellOcv(80.0, 320);
assert.strictEqual(ocvTwoPhase.phase, 'TWO_PHASE_S_NA2S5', '80% SOC must be in two-phase region');
assert(Math.abs(ocvTwoPhase.ocvV - 2.076) < 0.005, `Two-phase OCV (${ocvTwoPhase.ocvV.toFixed(3)} V) must be ~2.076 V`);

// Single-phase region: 25% SOC
const ocvSinglePhase = SodiumSulfurBatteryEngine.calculateCellOcv(25.0, 320);
assert.strictEqual(ocvSinglePhase.phase, 'SINGLE_PHASE_POLYSULFIDES', '25% SOC must be single-phase polysulfides');
assert(ocvSinglePhase.ocvV < 2.05 && ocvSinglePhase.ocvV > 1.80, `Single-phase OCV (${ocvSinglePhase.ocvV.toFixed(3)} V) must be 1.80-2.05 V`);

// Discharge cutoff: 0% SOC (Na2S3)
const ocvCutoff = SodiumSulfurBatteryEngine.calculateCellOcv(0.0, 320);
assert(Math.abs(ocvCutoff.ocvV - 1.780) < 0.005, `Cutoff OCV (${ocvCutoff.ocvV.toFixed(3)} V) must be ~1.780 V`);
console.log(`  ✓ Phase equilibria: 80% SOC = ${ocvTwoPhase.ocvV.toFixed(3)} V (${ocvTwoPhase.formula}), 25% SOC = ${ocvSinglePhase.ocvV.toFixed(3)} V (${ocvSinglePhase.formula}), 0% SOC = ${ocvCutoff.ocvV.toFixed(3)} V.`);

// =========================================================================
// 3. Electrochemical Performance & 100% Coulombic Efficiency
// =========================================================================
console.log('  3. Verifying Electrochemical Polarization & Thermal Balance...');
const perfResult = SodiumSulfurBatteryEngine.calculateCellPerformance({
  electrolyteType: 'BASE_TUBULAR_STANDARD',
  operatingTempC: 320,
  stateOfChargePercent: 70,
  currentDensityMaPerCm2: 120,
  dischargeMode: 'DISCHARGE',
  ambientTempC: 25
});

assert.strictEqual(perfResult.coulombicEfficiencyPercent, 100.0, 'Coulombic efficiency must be exactly 100.0% due to solid BASE');
assert(perfResult.operatingCellVoltageV >= 1.85 && perfResult.operatingCellVoltageV <= 2.05, `Discharge voltage (${perfResult.operatingCellVoltageV.toFixed(3)} V) must be 1.85-2.05 V`);
assert(perfResult.roundTripEnergyEfficiencyPercent >= 80.0 && perfResult.roundTripEnergyEfficiencyPercent <= 92.0, `RTE (${perfResult.roundTripEnergyEfficiencyPercent.toFixed(1)}%) must be 80-92%`);
assert(perfResult.cellSpecificEnergyWhPerKg >= 200.0, `Specific energy (${perfResult.cellSpecificEnergyWhPerKg.toFixed(1)} Wh/kg) must be >= 200 Wh/kg`);
assert(perfResult.thermalSelfSustaining === true, 'Operating at 120 mA/cm2 must be thermally self-sustaining (Joule heat >= heat loss)');
console.log(`  ✓ Performance at 120 mA/cm2 & 320°C: V_cell = ${perfResult.operatingCellVoltageV.toFixed(3)} V, CE = 100%, RTE = ${perfResult.roundTripEnergyEfficiencyPercent.toFixed(1)}%, Specific Energy = ${perfResult.cellSpecificEnergyWhPerKg.toFixed(1)} Wh/kg, Joule Heat = ${perfResult.jouleHeatGenerationWattsPerCell.toFixed(2)} W vs Loss = ${perfResult.heatLossRateWattsPerCell.toFixed(2)} W (Thermally Self-Sustaining).`);

// =========================================================================
// 4. Utility Grid Plant (10 MW / 60 MWh System)
// =========================================================================
console.log('  4. Verifying Utility-Scale (10 MW / 60 MWh) Grid Sizing...');
const plantResult = SodiumSulfurBatteryEngine.calculateUtilityPlant(10.0, 6.0);

assert.strictEqual(plantResult.totalEnergyMwh, 60.0, 'Total stored energy must be 60.0 MWh');
assert(plantResult.totalCellCount >= 70000 && plantResult.totalCellCount <= 85000, `Cell count (${plantResult.totalCellCount}) must be 70k-85k`);
assert(plantResult.totalMoltenSodiumTons >= 20.0 && plantResult.totalMoltenSodiumTons <= 26.0, 'Sodium mass must be 20-26 tons');
assert(plantResult.totalSulfurTons >= 40.0 && plantResult.totalSulfurTons <= 55.0, 'Sulfur mass must be 40-55 tons');
assert(plantResult.capitalCostDollarsPerKwh < 260.0, 'CapEx must be < $260/kWh');
assert.strictEqual(plantResult.calendarLifeYearsGuaranteed, 15, 'Guaranteed calendar life must be 15 years');
console.log(`  ✓ 10 MW / 60 MWh Grid Plant: Cells = ${plantResult.totalCellCount}, Molten Na = ${plantResult.totalMoltenSodiumTons.toFixed(1)} tons, Sulfur = ${plantResult.totalSulfurTons.toFixed(1)} tons, CapEx = $${plantResult.capitalCostDollarsPerKwh}/kWh ($${plantResult.totalCapExMillionDollars.toFixed(1)}M), Lifetime = ${plantResult.calendarLifeYearsGuaranteed} years (5,475-7,300 cycles).`);

console.log('🎉 Test Suite 348 Passed (4/4 assertion groups clean)!');
