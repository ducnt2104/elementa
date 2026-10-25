// tests/test-thermoelectric-generator.mjs
// Test Suite 368: Solid-State Thermoelectric Generator (TEG) Engine Verification

import assert from 'assert';
import {
  THERMOELECTRIC_MATERIALS,
  calculateFigureOfMeritZT,
  calculateThermoelectricGeneratorPerformance,
  calculateAutomotiveExhaustTegEconomics
} from '../src/domain/thermoelectricGeneratorEngine.ts';

console.log('🧪 Running Test Suite 368: Solid-State Thermoelectric Generator & Peltier Engine...');

// 1. Material Catalog & Transport Properties
console.log('  1. Verifying Thermoelectric Material Catalog...');
assert(THERMOELECTRIC_MATERIALS.BISMUTH_TELLURIDE_ROOM_TEMP, 'Bismuth telluride material must exist');
assert(THERMOELECTRIC_MATERIALS.SKUTTERUDITE_FILLED_MID_TEMP, 'Filled skutterudite material must exist');
assert(THERMOELECTRIC_MATERIALS.SILICON_GERMANIUM_SPACE_RTG, 'Silicon-Germanium RTG material must exist');
assert(THERMOELECTRIC_MATERIALS.OXIDE_CERAMIC_HIGH_TEMP, 'Oxide ceramic material must exist');

const bi2te3 = THERMOELECTRIC_MATERIALS.BISMUTH_TELLURIDE_ROOM_TEMP;
assert(bi2te3.seebeckCoefficientMicroVPerK >= 180.0 && bi2te3.seebeckCoefficientMicroVPerK <= 260.0,
  `Bi2Te3 Seebeck (${bi2te3.seebeckCoefficientMicroVPerK} uV/K) must be 180 - 260 uV/K`);
assert(bi2te3.thermalConductivityWPerMK <= 2.0,
  `Bi2Te3 thermal conductivity (${bi2te3.thermalConductivityWPerMK} W/(m*K)) must be <= 2.0`);
console.log('  ✓ Thermoelectric material catalog and properties verified.');

// 2. Fundamental Figure of Merit (zT)
console.log('  2. Verifying Dimensionless Figure of Merit (zT)...');
const ztCalculated = calculateFigureOfMeritZT(220.0, 1150.0, 1.25, 300.0);
console.log(`  ✓ Bi2Te3 at 300 K: zT = ${ztCalculated.toFixed(2)}`);
assert(ztCalculated >= 1.0 && ztCalculated <= 1.8,
  `Calculated zT (${ztCalculated}) must be in realistic range 1.0 - 1.8`);
console.log('  ✓ Transport property power factor and zT equations confirmed.');

// 3. Thermoelectric Power Conversion Efficiency
console.log('  3. Verifying Power Conversion Efficiency...');
const tegResult = calculateThermoelectricGeneratorPerformance(
  'SKUTTERUDITE_FILLED_MID_TEMP',
  450.0, // Th = 450°C
  50.0,  // Tc = 50°C
  256,
  5000.0 // 5 kW heat input
);
console.log(`  ✓ Skutterudite TEG: Th = 450°C, Tc = 50°C (Delta_T = 400 K)`);
console.log(`    Carnot Max = ${tegResult.carnotMaxEfficiencyPercent.toFixed(1)}%, Actual Efficiency = ${tegResult.actualConversionEfficiencyPercent.toFixed(2)}%`);
console.log(`    Power Output = ${tegResult.electricalPowerOutputWatts.toFixed(0)} W, Voc = ${tegResult.openCircuitVoltageVolts.toFixed(1)} V`);

assert(tegResult.actualConversionEfficiencyPercent >= 7.0 && tegResult.actualConversionEfficiencyPercent <= 18.0,
  `TEG conversion efficiency (${tegResult.actualConversionEfficiencyPercent}%) must be 7 - 18%`);
assert(tegResult.electricalPowerOutputWatts >= 350.0,
  'Electrical power output must be >= 350 W for 5 kW heat input');
assert(tegResult.openCircuitVoltageVolts > 20.0,
  'Open circuit Seebeck voltage must be > 20 V for 256 thermocouple pairs');
console.log('  ✓ Power conversion efficiency, Seebeck voltage, and power output verified.');

// 4. Automotive Exhaust Waste Heat Harvesting (TEG)
console.log('  4. Verifying Automotive Exhaust Waste Heat Recovery...');
const autoEcon = calculateAutomotiveExhaustTegEconomics(150.0, 380.0, 65.0);
console.log(`  ✓ 150 kW Truck Engine: Recovered Power = ${autoEcon.recoveredElectricPowerWatts.toFixed(0)} W`);
console.log(`    Alternator Unload = ${autoEcon.alternatorUnloadPercent.toFixed(1)}%, Fuel Economy Boost = +${autoEcon.fuelEconomyImprovementPercent.toFixed(2)}%`);
console.log(`    Annual Fuel Saved = ${autoEcon.annualFuelSavedLiters.toFixed(0)} L/yr, Avoided CO2 = ${autoEcon.annualAvoidedCO2Kg.toFixed(0)} kg/yr`);

assert(autoEcon.recoveredElectricPowerWatts >= 600.0 && autoEcon.recoveredElectricPowerWatts <= 1800.0,
  `Recovered TEG electric power (${autoEcon.recoveredElectricPowerWatts} W) must be 600 - 1800 W`);
assert(autoEcon.fuelEconomyImprovementPercent >= 0.8 && autoEcon.fuelEconomyImprovementPercent <= 3.5,
  `Fuel economy boost (+${autoEcon.fuelEconomyImprovementPercent}%) must be 0.8 - 3.5%`);
assert(autoEcon.annualFuelSavedLiters > 250.0, 'Annual fuel saved must be > 250 Liters');
console.log('  ✓ Automotive exhaust waste heat recovery verified.');

console.log('🎉 Test Suite 368 Passed (4/4 assertion groups clean)!');
