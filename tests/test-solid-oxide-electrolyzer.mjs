// tests/test-solid-oxide-electrolyzer.mjs
// Test Suite 258: Solid Oxide Electrolyzer Cells (SOEC), High-Temp Thermodynamics & Green Syngas Audit

import assert from 'node:assert';
import {
  calculateWaterThermodynamics,
  SOEC_STANDARD_MATERIALS,
  simulateSOECPolarization,
  simulateSOECCoElectrolysis
} from '../src/domain/solidOxideElectrolyzerEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 258: SOLID OXIDE ELECTROLYZER (SOEC) AUDIT    ');
console.log('======================================================================\n');

// 1. High-Temperature Thermodynamics Verification
console.log('1. Checking High-Temperature H2O Splitting Thermodynamics (800°C)...');
const thermo800 = calculateWaterThermodynamics(800);
const thermo25 = calculateWaterThermodynamics(25);

console.log(`  - Room Temp (25°C):  E_rev = ${thermo25.reversibleVoltageV} V, V_tn = ${thermo25.thermoneutralVoltageV} V, ΔG = ${(thermo25.deltaGJoulesPerMol/1000).toFixed(1)} kJ/mol`);
console.log(`  - High Temp (800°C): E_rev = ${thermo800.reversibleVoltageV} V, V_tn = ${thermo800.thermoneutralVoltageV} V, ΔG = ${(thermo800.deltaGJoulesPerMol/1000).toFixed(1)} kJ/mol`);

assert(
  thermo800.reversibleVoltageV < 1.0,
  'At 800°C, reversible voltage must drop below 1.0 V due to thermal energy contribution (T*Delta S)'
);
assert(
  thermo800.reversibleVoltageV < thermo25.reversibleVoltageV - 0.2,
  'Reversible voltage at 800°C must be at least 0.2 V lower than at 25°C'
);
assert(
  Math.abs(thermo800.thermoneutralVoltageV - 1.285) < 0.05,
  'Thermoneutral voltage at 800°C must be close to 1.285 V'
);
console.log('  ✓ Thermal energy assistance and reversible voltage reduction verified');

// 2. Materials & Polarization Overpotentials
console.log('\n2. Testing SOEC Materials & Polarization Overpotentials...');
assert(SOEC_STANDARD_MATERIALS.electrolyte.includes('8YSZ'), 'Electrolyte must be 8YSZ ceramic');
assert(SOEC_STANDARD_MATERIALS.fuelCathode.includes('Ni-YSZ'), 'Cathode must be porous Ni-YSZ cermet');

const polCurve800 = simulateSOECPolarization(800, 1.0, 0.65);
assert.strictEqual(polCurve800.length, 26, 'Must generate exactly 26 polarization points');

const p0 = polCurve800[0];
const pMid = polCurve800[12]; // J ~ 0.96 A/cm²
const pMax = polCurve800[25]; // J = 2.0 A/cm²

console.log(`  - J = 0 A/cm²:    V_cell = ${p0.cellVoltageVolts} V (Reversible OCV)`);
console.log(`  - J = ${pMid.currentDensityAcm2} A/cm²: V_cell = ${pMid.cellVoltageVolts} V (Ohmic = ${pMid.ohmicOverpotentialVolts} V, Act = ${pMid.activationOverpotentialVolts} V, Conc = ${pMid.concentrationOverpotentialVolts} V)`);
console.log(`  - J = ${pMax.currentDensityAcm2} A/cm²: V_cell = ${pMax.cellVoltageVolts} V (P = ${pMax.powerDensityWcm2} W/cm²)`);

assert.strictEqual(p0.cellVoltageVolts, thermo800.reversibleVoltageV, 'At J=0, cell voltage must equal E_rev');
assert(pMid.cellVoltageVolts > p0.cellVoltageVolts, 'Cell voltage must increase with current density in electrolysis mode');
assert(pMid.ohmicOverpotentialVolts > 0 && pMid.activationOverpotentialVolts > 0, 'Overpotentials must be positive');
console.log('  ✓ Polarization curve and overpotential partitioning verified');

// 3. Co-Electrolysis of H2O + CO2 for Fischer-Tropsch Syngas
console.log('\n3. Testing H2O/CO2 Co-Electrolysis for Fischer-Tropsch Green Syngas...');
// 67% steam, 33% CO2 -> 2:1 H2:CO ratio for e-Kerosene
const coElecResult = simulateSOECCoElectrolysis(800, 1.0, 67, 1.0, 10.0);

console.log(`  - Feed: 67% Steam (H₂O) / 33% CO₂ at 800°C, J = 1.0 A/cm² (10 m² stack):`);
console.log(`    * Cell Voltage: ${coElecResult.cellVoltageVolts} V (Mode: ${coElecResult.operatingMode})`);
console.log(`    * H₂ Production: ${coElecResult.h2ProductionRateNm3PerHour} Nm³/h`);
console.log(`    * CO Production: ${coElecResult.coProductionRateNm3PerHour} Nm³/h`);
console.log(`    * O₂ By-product: ${coElecResult.o2ProductionRateNm3PerHour} Nm³/h`);
console.log(`    * Syngas H₂/CO Ratio: ${coElecResult.syngasH2ToCoRatio}`);
console.log(`    * Electrical Efficiency (LHV): ${coElecResult.electricalEfficiencyLhvPercent}%`);
console.log(`    * Power-to-X Suitability: ${coElecResult.downstreamSuitability}`);

assert(
  Math.abs(coElecResult.syngasH2ToCoRatio - 2.03) < 0.1,
  'Syngas H2/CO ratio must match 2:1 stoichiometric feed for Fischer-Tropsch'
);
assert(
  Math.abs(coElecResult.o2ProductionRateNm3PerHour - (coElecResult.h2ProductionRateNm3PerHour + coElecResult.coProductionRateNm3PerHour) / 2) < 0.1,
  'Oxygen production must equal exactly half of total syngas moles (conservation of atoms)'
);
assert(
  coElecResult.electricalEfficiencyLhvPercent > 80.0,
  'High-temperature SOEC electrical efficiency must exceed 80% LHV'
);
assert(
  coElecResult.downstreamSuitability.includes('e-Kerosene'),
  'Must verify suitability for Fischer-Tropsch e-Kerosene jet fuel synthesis'
);
console.log('  ✓ Co-electrolysis stoichiometry and Power-to-X syngas matching confirmed');

console.log('\n======================================================================');
console.log('   ALL 3 AUDIT CHECKS IN SUITE 258 PASSED WITH DISTINCTION!           ');
console.log('======================================================================\n');
