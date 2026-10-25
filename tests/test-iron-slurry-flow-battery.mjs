/**
 * test-iron-slurry-flow-battery.mjs
 *
 * Test Suite 346: Iron-Slurry Semi-Solid Flow Battery (SS-IFB) Domain Engine Verification
 * Verifies high-density suspended iron particulate slurries, Herschel-Bulkley non-Newtonian rheology,
 * electrochemical cell polarization, and ultra-low cost multi-day (48-100h) LDES grid economics.
 */

import assert from 'assert';
import {
  SLURRY_COMPOSITIONS,
  SEPARATORS,
  IronSlurryFlowBatteryEngine
} from '../src/domain/ironSlurryFlowBatteryEngine.ts';

console.log('🧪 Running Test Suite 346: Iron-Slurry Semi-Solid Flow Battery (SS-IFB) Domain Engine...');

// =========================================================================
// 1. Slurry & Separator Specifications
// =========================================================================
console.log('  1. Verifying Slurry & Separator Catalogs...');
const micronFe = SLURRY_COMPOSITIONS.MICRON_FE_KETJENBLACK;
assert(micronFe.volumetricCapacityAhPerL >= 150.0, 'Micron Fe volumetric capacity must be >= 150 Ah/L');
assert(micronFe.flowBehaviorIndexN < 1.0, 'Slurry must exhibit shear-thinning pseudoplastic behavior (n < 1)');
assert(micronFe.electronicConductivitySPerM >= 1.0, 'Slurry electronic conductivity must be >= 1.0 S/m');

const polyolefin = SEPARATORS.MICROPOROUS_POLYOLEFIN;
assert(polyolefin.costDollarsPerM2 <= 5.0, 'Microporous polyolefin cost must be <= $5/m2');
assert(polyolefin.porosityPercent >= 50, 'Porosity must be >= 50%');
console.log('  ✓ Slurry composition and separator specifications verified.');

// =========================================================================
// 2. Herschel-Bulkley Rheology & Shear-Thinning Viscosity
// =========================================================================
console.log('  2. Verifying Non-Newtonian Rheology & Viscosity...');
const muLowFlow = IronSlurryFlowBatteryEngine.calculateApparentViscosity(micronFe, 20.0, 25);
const muHighFlow = IronSlurryFlowBatteryEngine.calculateApparentViscosity(micronFe, 150.0, 25);
assert(muHighFlow < muLowFlow, 'Apparent viscosity must decrease as flow rate increases (shear thinning)');
assert(muHighFlow > 0.01 && muLowFlow < 2.5, 'Viscosity must remain within pumpable fluid limits (0.01 - 2.5 Pa·s)');
console.log(`  ✓ Shear-thinning rheology: Viscosity at 20 mL/min = ${muLowFlow.toFixed(3)} Pa·s ➔ at 150 mL/min = ${muHighFlow.toFixed(3)} Pa·s.`);

// =========================================================================
// 3. Electrochemical Polarization & Energy Density
// =========================================================================
console.log('  3. Verifying Electrochemical Polarization & High Energy Density...');
const perfResult = IronSlurryFlowBatteryEngine.calculateSlurryPerformance({
  slurryType: 'MICRON_FE_KETJENBLACK',
  separatorType: 'MICROPOROUS_POLYOLEFIN',
  stateOfChargePercent: 50,
  flowRateMillilitersPerMinute: 60,
  temperatureC: 25,
  currentDensityMaPerCm2: 50
});

assert(perfResult.openCircuitVoltageV >= 1.15 && perfResult.openCircuitVoltageV <= 1.25, `OCV (${perfResult.openCircuitVoltageV.toFixed(3)} V) must be 1.15 - 1.25 V`);
assert(perfResult.dischargeVoltageV >= 0.85 && perfResult.dischargeVoltageV <= 1.15, `Discharge voltage (${perfResult.dischargeVoltageV.toFixed(3)} V) must be 0.85 - 1.15 V`);
assert(perfResult.roundTripEnergyEfficiencyPercent >= 65.0 && perfResult.roundTripEnergyEfficiencyPercent <= 88.0, `RTE (${perfResult.roundTripEnergyEfficiencyPercent.toFixed(1)}%) must be 65 - 88%`);
assert(perfResult.volumetricEnergyDensityWhPerL >= 140.0, `Volumetric energy density (${perfResult.volumetricEnergyDensityWhPerL.toFixed(1)} Wh/L) must be >= 140 Wh/L`);
console.log(`  ✓ Performance at 50 mA/cm2: V_dis = ${perfResult.dischargeVoltageV.toFixed(3)} V, RTE = ${perfResult.roundTripEnergyEfficiencyPercent.toFixed(1)}%, Energy Density = ${perfResult.volumetricEnergyDensityWhPerL.toFixed(1)} Wh/L (4x conventional aqueous VRFB).`);

// =========================================================================
// 4. Multi-Day (48h - 100h) LDES System Economics
// =========================================================================
console.log('  4. Verifying Multi-Day LDES Grid Economics (<$60/kWh)...');
const ldesResult = IronSlurryFlowBatteryEngine.calculateLdesEconomics({
  slurryType: 'MICRON_FE_KETJENBLACK',
  separatorType: 'MICROPOROUS_POLYOLEFIN',
  stateOfChargePercent: 50,
  flowRateMillilitersPerMinute: 60,
  temperatureC: 25,
  currentDensityMaPerCm2: 50
}, 500.0, 48.0); // 500 kW / 24,000 kWh (48-hour storage)

assert(ldesResult.totalStoredEnergyKwh === 24000.0, 'Total stored energy must be 24,000 kWh');
assert(ldesResult.capitalCostDollarsPerKwh < 55.0, `CapEx (${ldesResult.capitalCostDollarsPerKwh.toFixed(1)} $/kWh) must be < $55/kWh for 48h storage`);
assert(ldesResult.rawIronMassTons > 100.0 && ldesResult.rawIronMassTons < 300.0, 'Raw iron mass must be 100-300 tons');
assert(ldesResult.cyclesLifetimeGuaranteed >= 20000, 'Lifetime must exceed 20,000 cycles');
console.log(`  ✓ 48h LDES Substation (500 kW / 24 MWh): CapEx = $${ldesResult.capitalCostDollarsPerKwh.toFixed(1)}/kWh (Total $${(ldesResult.totalSystemCapExDollars / 1e6).toFixed(2)}M), Tank = ${ldesResult.slurryTankVolumeM3.toFixed(1)} m3, Iron = ${ldesResult.rawIronMassTons.toFixed(1)} tons, Guaranteed Lifetime = ${ldesResult.cyclesLifetimeGuaranteed} cycles.`);

console.log('🎉 Test Suite 346 Passed (4/4 assertion groups clean)!');
