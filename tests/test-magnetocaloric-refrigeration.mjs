// tests/test-magnetocaloric-refrigeration.mjs
// Test Suite 358: Magnetocaloric Refrigeration & Magnetic Heat Pump (MCE)
import assert from 'assert';
import {
  MCE_MATERIALS,
  MCE_FLUIDS,
  calculateMceThermodynamicProperties,
  calculateAmrCyclePerformance,
  calculateEnvironmentalSavings
} from '../src/domain/magnetocaloricRefrigerationEngine.ts';

console.log('🧪 Running Test Suite 358: Magnetocaloric Refrigeration (MCE) Engine...');

// 1. Verifying Material and Fluid Catalogs
console.log('  1. Verifying Material and Fluid Catalogs...');
assert.ok(MCE_MATERIALS.LA_FE_SI_HYDRIDE, 'La(Fe,Si)13Hy material must exist');
assert.strictEqual(MCE_MATERIALS.LA_FE_SI_HYDRIDE.transitionType, 'FOMT_FIRST_ORDER', 'La(Fe,Si)13Hy must be First-Order FOMT');
assert.ok(MCE_MATERIALS.LA_FE_SI_HYDRIDE.adiabaticTempChangeDeltaTKAt1_5T >= 5.0, 'Adiabatic Delta_T must be >= 5.0 K at 1.5 T');

assert.ok(MCE_MATERIALS.MN_FE_P_SI_EARTH_ABUNDANT, 'Earth-abundant MnFe(P,Si) must exist');
assert.ok(MCE_FLUIDS.PURE_WATER, 'Pure water fluid must exist');
assert.strictEqual(MCE_FLUIDS.PURE_WATER.globalWarmingPotentialGWP, 0.0, 'Pure water must have GWP = 0.0');
console.log('  ✓ Catalogs verified: Giant MCE La(Fe,Si)13Hy and 100% Zero-GWP Water confirmed.');

// 2. Verifying Magnetocaloric Thermodynamic Properties
console.log('  2. Verifying Magnetocaloric Thermodynamic Properties...');
const mceAtCurie = calculateMceThermodynamicProperties('LA_FE_SI_HYDRIDE', 1.5, 22.0);
assert.ok(mceAtCurie.isothermalEntropyChangeJPerKgK > 18.0, `Entropy change (${mceAtCurie.isothermalEntropyChangeJPerKgK.toFixed(1)} J/kg*K) must exceed 18 J/kg*K at T_C`);
assert.ok(mceAtCurie.adiabaticTemperatureChangeDeltaTK > 4.5, `Delta_T_ad (${mceAtCurie.adiabaticTemperatureChangeDeltaTK.toFixed(1)} K) must exceed 4.5 K at T_C`);

// Off-Curie attenuation:
const mceOffCurie = calculateMceThermodynamicProperties('LA_FE_SI_HYDRIDE', 1.5, 35.0);
assert.ok(mceOffCurie.isothermalEntropyChangeJPerKgK < mceAtCurie.isothermalEntropyChangeJPerKgK, 'Entropy change must attenuate off Curie temperature');
console.log(`  ✓ MCE Properties @ 1.5 T: Delta_S_mag = ${mceAtCurie.isothermalEntropyChangeJPerKgK.toFixed(1)} J/(kg·K), Delta_T_ad = ${mceAtCurie.adiabaticTemperatureChangeDeltaTK.toFixed(1)} K (at T_C = 22°C).`);

// 3. Verifying Active Magnetic Regenerator (AMR) Cycle Performance
console.log('  3. Verifying Active Magnetic Regenerator (AMR) Cycle Performance...');
const amr = calculateAmrCyclePerformance('LA_FE_SI_HYDRIDE', 'PURE_WATER', 1.5, 32.0, 18.0, 8.0, 2.0);
assert.strictEqual(amr.temperatureSpanK, 14.0, 'Temperature span must be 14.0 K (32°C - 18°C)');
assert.ok(amr.coolingCapacityWatts > 1000.0, `Cooling capacity (${amr.coolingCapacityWatts.toFixed(0)} W) must exceed 1,000 W`);
assert.ok(amr.copCooling > 3.0 && amr.copCooling < 6.5, `COP (${amr.copCooling.toFixed(2)}) must be in 3.0 - 6.5`);
assert.ok(amr.secondLawEfficiencyPercent > 10.0 && amr.secondLawEfficiencyPercent < 80.0, `Second-Law Efficiency (${amr.secondLawEfficiencyPercent.toFixed(1)}%) must be 10 - 80% of Carnot`);
console.log(`  ✓ AMR Cycle: Cooling = ${amr.coolingCapacityWatts.toFixed(0)} W, Electric Power = ${amr.totalElectricPowerWatts.toFixed(0)} W, COP = ${amr.copCooling.toFixed(2)} (Carnot = ${amr.carnotCop.toFixed(2)}, η_II = ${amr.secondLawEfficiencyPercent.toFixed(1)}%).`);

// 4. Verifying Environmental Zero-GWP and Energy Savings
console.log('  4. Verifying Environmental Zero-GWP and Energy Savings...');
const env = calculateEnvironmentalSavings(3.5, 2500);
assert.strictEqual(env.coolingCapacityKW, 3.5);
assert.ok(env.annualElectricitySavedKWh > 800, `Annual electricity saved (${env.annualElectricitySavedKWh.toFixed(0)} kWh) must exceed 800 kWh`);
assert.ok(env.avoidedDirectGwpTonsCO2e > 0.15, `Avoided direct GWP (${env.avoidedDirectGwpTonsCO2e.toFixed(2)} tons) must exceed 0.15 tons CO2e`);
assert.ok(env.totalAnnualAvoidedCO2eTons > 0.5, `Total avoided emissions (${env.totalAnnualAvoidedCO2eTons.toFixed(2)} tons) must exceed 0.5 tons CO2e`);
console.log(`  ✓ Environmental Savings (3.5 kW AC): Avoided Refrigerant = ${env.refrigerantMassKgSaved.toFixed(1)} kg R410A, Electricity Saved = ${env.annualElectricitySavedKWh.toFixed(0)} kWh/yr, Total CO2e Avoided = ${env.totalAnnualAvoidedCO2eTons.toFixed(2)} tons/yr.`);

console.log('🎉 Test Suite 358 Passed (4/4 assertion groups clean)!');
