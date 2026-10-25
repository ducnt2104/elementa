// tests/test-zinc-air-oxide-cycle.mjs
// Test Suite 370: Solar Thermochemical Zinc-Zinc Oxide (Zn/ZnO) Cycle Engine Verification

import assert from 'assert';
import {
  SOLAR_RECEIVERS,
  calculateZnZnoCyclePerformance
} from '../src/domain/zincAirOxideCycleEngine.ts';

console.log('🧪 Running Test Suite 370: Solar Thermochemical Zinc-Zinc Oxide (Zn/ZnO) Cycle Engine...');

// 1. Solar Receiver Catalog
console.log('  1. Verifying Concentrated Solar Receiver Catalog...');
assert(SOLAR_RECEIVERS.BEAM_DOWN_ROTATING_CAVITY, 'Beam-down rotating cavity receiver must exist');
assert(SOLAR_RECEIVERS.SOLAR_TOWER_AEROSOL_FLUIDIZED, 'Solar tower aerosol fluidized receiver must exist');
assert(SOLAR_RECEIVERS.PARABOLIC_DISH_VACUUM, 'Parabolic dish vacuum receiver must exist');

const beamDown = SOLAR_RECEIVERS.BEAM_DOWN_ROTATING_CAVITY;
assert(beamDown.solarConcentrationRatios >= 2000, 'Solar concentration ratio must be >= 2000 suns');
assert(beamDown.receiverOperatingTempK >= 1800, 'Operating temperature must be >= 1800 K for thermal dissociation');
console.log('  ✓ Solar receiver catalog and high-temperature specs verified.');

// 2. Two-Step Thermochemical Reactions & Enthalpies
console.log('  2. Verifying Two-Step Reaction Thermodynamics...');
const perf = calculateZnZnoCyclePerformance('BEAM_DOWN_ROTATING_CAVITY', 10.0, 400.0, 0.94);
console.log(`  ✓ Step 1 Solar Reduction @ ${perf.step1ReductionTempK} K: ΔH = +${perf.step1EnthalpyKJPerMol} kJ/mol, P_Zn = ${perf.zincDissociationPressureBar.toFixed(2)} bar`);
console.log(`  ✓ Step 2 Water Hydrolysis @ ${perf.step2HydrolysisTempK} K: ΔH = ${perf.step2EnthalpyKJPerMol} kJ/mol`);

assert.strictEqual(perf.step1EnthalpyKJPerMol, 460.0, 'Step 1 ZnO dissociation enthalpy must be +460 kJ/mol');
assert.strictEqual(perf.step2EnthalpyKJPerMol, -105.0, 'Step 2 Zn hydrolysis enthalpy must be -105 kJ/mol');
assert(perf.quenchCoolingRateKelvinPerSec >= 100000.0, 'Quench cooling rate must be >= 10^5 K/s to prevent recomb');
console.log('  ✓ Thermochemical reaction enthalpies and rapid quench dynamics verified.');

// 3. Solar-to-Hydrogen (STH) Efficiency & Production Rate
console.log('  3. Verifying Solar-to-Hydrogen (STH) Efficiency and Production...');
console.log(`  ✓ 10 MWth Plant: STH Efficiency = ${perf.solarToHydrogenEfficiencyPercent.toFixed(1)}%`);
console.log(`    Hourly H2 Production = ${perf.hourlyHydrogenProductionKg.toFixed(1)} kg/h, Daily H2 = ${perf.dailyHydrogenProductionTons.toFixed(2)} tons/day`);
console.log(`    LCOH = $${perf.levelizedCostOfHydrogenUSDPerKg.toFixed(2)}/kg, Avoided CO2 = ${perf.avoidedAnnualCO2Tons.toFixed(0)} tons/yr`);

assert(perf.solarToHydrogenEfficiencyPercent >= 32.0 && perf.solarToHydrogenEfficiencyPercent <= 45.0,
  `Solar-to-Hydrogen efficiency (${perf.solarToHydrogenEfficiencyPercent}%) must be in 32 - 45% range`);
assert(perf.hourlyHydrogenProductionKg >= 70.0 && perf.hourlyHydrogenProductionKg <= 130.0,
  `Hourly H2 production (${perf.hourlyHydrogenProductionKg} kg/h) must be 70 - 130 kg/h for 10 MWth`);
assert(perf.levelizedCostOfHydrogenUSDPerKg >= 2.40 && perf.levelizedCostOfHydrogenUSDPerKg <= 3.80,
  `LCOH ($${perf.levelizedCostOfHydrogenUSDPerKg}/kg) must be $2.40 - $3.80/kg H2`);
assert(perf.avoidedAnnualCO2Tons > 1500.0, 'Avoided annual CO2 must be > 1500 tons/yr');
console.log('  ✓ STH efficiency, green hydrogen output, and low LCOH verified.');

console.log('🎉 Test Suite 370 Passed (3/3 assertion groups clean)!');
