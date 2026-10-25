// tests/test-metal-hydride-heat-pump.mjs
// Test Suite 364: Solid-State Thermochemical Metal Hydride Heat Pump Engine Verification

import assert from 'assert';
import {
  METAL_HYDRIDE_ALLOYS,
  calculateVanTHoffEquilibrium,
  calculateHeatTransformerPerformance,
  calculateMetalHydrideChillerPerformance
} from '../src/domain/metalHydrideHeatPumpEngine.ts';

console.log('🧪 Running Test Suite 364: Metal Hydride Heat Pump & Heat Transformer (MH-HP) Engine...');

// 1. Alloy Catalog & Thermodynamic Constants
console.log('  1. Verifying Metal Hydride Alloy Catalog...');
assert(METAL_HYDRIDE_ALLOYS.LANI5_STANDARD, 'LaNi5 standard alloy must exist');
assert(METAL_HYDRIDE_ALLOYS.MM_NI_AL_MISCHMETAL, 'Mischmetal MmNi4.5Al0.5 alloy must exist');
assert(METAL_HYDRIDE_ALLOYS.TIFE_MN_TITANIUM_IRON, 'TiFe0.85Mn0.15 alloy must exist');
assert(METAL_HYDRIDE_ALLOYS.ZR_TI_CR_FE_LAVES, 'Zr-Ti-Cr-Fe Laves phase alloy must exist');

const laNi5 = METAL_HYDRIDE_ALLOYS.LANI5_STANDARD;
assert(laNi5.enthalpyAbsorptionKJPerMolH2 < -25.0 && laNi5.enthalpyAbsorptionKJPerMolH2 > -35.0,
  `LaNi5 Delta_H (${laNi5.enthalpyAbsorptionKJPerMolH2}) must be between -25 and -35 kJ/mol H2`);
assert(laNi5.hydrogenStorageCapacityWtPercent >= 1.2 && laNi5.hydrogenStorageCapacityWtPercent <= 2.0,
  `LaNi5 storage capacity (${laNi5.hydrogenStorageCapacityWtPercent} wt%) must be 1.2 - 2.0 wt%`);
console.log('  ✓ Alloy catalog and thermodynamic constants verified.');

// 2. Van 't Hoff Equilibrium Pressures
console.log('  2. Verifying Van \'t Hoff Equilibrium Calculations...');
const roomTempPoint = calculateVanTHoffEquilibrium('LANI5_STANDARD', 25.0);
console.log(`  ✓ LaNi5 @ 25°C: P_abs = ${roomTempPoint.equilibriumPressureBarAbs.toFixed(2)} bar, P_des = ${roomTempPoint.equilibriumPressureBarDes.toFixed(2)} bar`);
assert(roomTempPoint.equilibriumPressureBarAbs > 1.2 && roomTempPoint.equilibriumPressureBarAbs < 4.0,
  `LaNi5 P_abs @ 25°C (${roomTempPoint.equilibriumPressureBarAbs} bar) must be 1.2 - 4.0 bar`);
assert(roomTempPoint.equilibriumPressureBarAbs > roomTempPoint.equilibriumPressureBarDes,
  'Absorption pressure must exceed desorption pressure due to hysteresis');

const hotTempPoint = calculateVanTHoffEquilibrium('LANI5_STANDARD', 80.0);
assert(hotTempPoint.equilibriumPressureBarAbs > roomTempPoint.equilibriumPressureBarAbs,
  'Equilibrium hydrogen pressure must increase with temperature');
console.log('  ✓ Van \'t Hoff equilibrium and hysteresis validated across temperatures.');

// 3. Heat Transformer Waste Heat Upgrading (95°C -> 140-170°C)
console.log('  3. Verifying Heat Transformer Waste Heat Upgrading...');
const transformerResult = calculateHeatTransformerPerformance(95.0, 25.0, 500.0);
console.log(`  ✓ Heat Transformer: Waste Heat = 95°C -> Upgraded Output = ${transformerResult.upgradedOutputTempC.toFixed(1)}°C (Lift = +${transformerResult.temperatureLiftK.toFixed(1)} K)`);
console.log(`    Thermal COP = ${transformerResult.thermalCop.toFixed(2)}, Upgraded Power = ${transformerResult.upgradedThermalPowerKW.toFixed(0)} kW`);
console.log(`    Annual Savings = $${transformerResult.annualFuelSavingsUSD.toFixed(0)}/year, Avoided CO2 = ${transformerResult.annualAvoidedCO2Tons.toFixed(0)} tons/yr`);

assert(transformerResult.upgradedOutputTempC >= 130.0 && transformerResult.upgradedOutputTempC <= 180.0,
  `Upgraded output temperature (${transformerResult.upgradedOutputTempC}°C) must be 130 - 180°C`);
assert(transformerResult.temperatureLiftK >= 35.0,
  `Temperature lift (+${transformerResult.temperatureLiftK} K) must be at least +35 K`);
assert(transformerResult.thermalCop >= 0.35 && transformerResult.thermalCop <= 0.48,
  `Thermal COP (${transformerResult.thermalCop}) must be in realistic range 0.35 - 0.48`);
assert(transformerResult.upgradedThermalPowerKW > 150.0,
  'Upgraded heat power must be > 150 kW for 500 kW waste heat input');
console.log('  ✓ Heat Transformer waste heat upgrading verified.');

// 4. Thermally Driven Refrigeration Mode
console.log('  4. Verifying Thermally Driven Refrigeration Mode...');
const chillerResult = calculateMetalHydrideChillerPerformance(130.0, 32.0, 5.0, 300.0);
console.log(`  ✓ Chiller Mode: Drive = 130°C -> Chilled Water = 5°C, Cooling = ${chillerResult.coolingCapacityKW.toFixed(0)} kW, COP_cool = ${chillerResult.coolingThermalCop.toFixed(2)}`);
assert(chillerResult.coolingCapacityKW >= 80.0 && chillerResult.coolingCapacityKW <= 180.0,
  `Cooling capacity (${chillerResult.coolingCapacityKW} kW) must be 80 - 180 kW for 300 kW heat input`);
assert(chillerResult.coolingThermalCop >= 0.30 && chillerResult.coolingThermalCop <= 0.55,
  `Cooling thermal COP (${chillerResult.coolingThermalCop}) must be 0.30 - 0.55`);
assert(chillerResult.effectiveElectricCopEquivalent > 50.0,
  'Effective electric COP equivalent must exceed 50 due to zero compressor work');
console.log('  ✓ Thermally driven refrigeration validated.');

console.log('🎉 Test Suite 364 Passed (4/4 assertion groups clean)!');
