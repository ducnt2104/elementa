// tests/test-ammonia-water-absorption-chiller.mjs
// Test Suite 362: Closed-Loop Thermochemical Ammonia-Water (NH3-H2O) Absorption Chiller
import assert from 'assert';
import {
  WASTE_HEAT_SOURCES,
  ABSORPTION_CYCLES,
  calculateAmmoniaWaterEquilibrium,
  calculateAbsorptionChillerPerformance,
  calculateDataCenterCogenerationEconomics
} from '../src/domain/ammoniaWaterAbsorptionChillerEngine.ts';

console.log('🧪 Running Test Suite 362: Ammonia-Water (NH3-H2O) Absorption Chiller Engine...');

// 1. Verifying Waste Heat Source and Cycle Catalogs
console.log('  1. Verifying Waste Heat Source and Cycle Catalogs...');
assert.ok(WASTE_HEAT_SOURCES.AI_DATA_CENTER_EXHAUST, 'AI Data center exhaust source must exist');
assert.ok(WASTE_HEAT_SOURCES.INDUSTRIAL_FLUE_GAS, 'Industrial flue gas source must exist');
assert.ok(ABSORPTION_CYCLES.SINGLE_EFFECT_STANDARD, 'Single-effect absorption cycle must exist');
assert.strictEqual(ABSORPTION_CYCLES.SINGLE_EFFECT_STANDARD.nominalThermalCop, 0.72);
assert.ok(ABSORPTION_CYCLES.DOUBLE_EFFECT_REGENERATIVE.nominalThermalCop > 1.20, 'Double-effect COP must exceed 1.20');
assert.strictEqual(ABSORPTION_CYCLES.DIFFUSION_ABSORPTION_NO_PUMP.electricalConsumptionFractionPercent, 0.0, 'Diffusion cycle must have 0% electricity');
console.log('  ✓ Catalogs verified: AI Data Center GPU waste heat and Single/Double-Effect cycles confirmed.');

// 2. Verifying Binary NH3-H2O Phase Equilibria & Vapor Purity
console.log('  2. Verifying Binary NH3-H2O Phase Equilibria & Vapor Purity...');
const eq = calculateAmmoniaWaterEquilibrium(100.0, 18.0);
assert.ok(eq.strongSolutionMassFractionPercent > 45.0, `Strong solution (${eq.strongSolutionMassFractionPercent.toFixed(1)}%) must exceed 45%`);
assert.ok(eq.weakSolutionMassFractionPercent < 36.0, `Weak solution (${eq.weakSolutionMassFractionPercent.toFixed(1)}%) must be < 36%`);
assert.ok(eq.strongSolutionMassFractionPercent > eq.weakSolutionMassFractionPercent, 'Strong solution must have higher ammonia concentration than weak solution');
assert.ok(eq.ammoniaVaporPurityPercent >= 99.8, 'Vapor purity from rectifier must exceed 99.8%');
assert.ok(eq.circulationRatio > 2.0 && eq.circulationRatio < 8.0, `Circulation ratio (${eq.circulationRatio.toFixed(2)}) must be in 2.0 - 8.0`);
console.log(`  ✓ Phase Equilibria @ 100°C/18 bar: x_strong = ${eq.strongSolutionMassFractionPercent.toFixed(1)}%, x_weak = ${eq.weakSolutionMassFractionPercent.toFixed(1)}%, Purity = ${eq.ammoniaVaporPurityPercent.toFixed(2)}%, Circulation Ratio = ${eq.circulationRatio.toFixed(2)}.`);

// 3. Verifying Thermal COP and Effective Electrical COP
console.log('  3. Verifying Thermal COP and Effective Electrical COP...');
const perf = calculateAbsorptionChillerPerformance(1000.0, 105.0, 35.0, 5.0, 'SINGLE_EFFECT_STANDARD');
assert.strictEqual(perf.thermalHeatInputKW, 1000.0);
assert.ok(perf.coolingCapacityKW > 650.0 && perf.coolingCapacityKW < 850.0, `Cooling capacity (${perf.coolingCapacityKW.toFixed(0)} kW) must be 650 - 850 kW`);
assert.ok(perf.thermalCop > 0.65 && perf.thermalCop < 0.85, `Thermal COP (${perf.thermalCop.toFixed(2)}) must be 0.65 - 0.85`);
assert.ok(perf.effectiveElectricCop > 40.0, `Effective electric COP (${perf.effectiveElectricCop.toFixed(1)}) must exceed 40`);
assert.ok(perf.chilledWaterFlowRateLpmAt7C > 1500, `Chilled water flow rate (${perf.chilledWaterFlowRateLpmAt7C.toFixed(0)} L/min) must exceed 1,500 L/min`);
console.log(`  ✓ Performance: Q_cooling = ${perf.coolingCapacityKW.toFixed(0)} kW, Thermal COP = ${perf.thermalCop.toFixed(2)}, Solution Pump = ${perf.pumpElectricPowerKW.toFixed(1)} kW (Effective Electric COP = ${perf.effectiveElectricCop.toFixed(1)}!), Chilled Water = ${perf.chilledWaterFlowRateLpmAt7C.toFixed(0)} L/min.`);

// 4. Verifying AI Data Center Waste Heat Cogeneration (10 MW IT Load)
console.log('  4. Verifying AI Data Center Waste Heat Cogeneration (10 MW IT Load)...');
const dc = calculateDataCenterCogenerationEconomics(10.0, 0.85);
assert.strictEqual(dc.itServerLoadMW, 10.0);
assert.ok(dc.coolingProducedMW > 5.0, `Cooling produced (${dc.coolingProducedMW.toFixed(2)} MW) must exceed 5.0 MW`);
assert.ok(dc.cogenerationPue < 1.15, `Cogeneration PUE (${dc.cogenerationPue.toFixed(3)}) must drop below 1.15 from 1.35`);
assert.ok(dc.annualElectricitySavedMWh > 10000, `Electricity saved (${dc.annualElectricitySavedMWh.toFixed(0)} MWh) must exceed 10,000 MWh/year`);
assert.ok(dc.annualElectricityCostSavedUSD > 1000000, `Cost savings ($${dc.annualElectricityCostSavedUSD.toFixed(0)}) must exceed $1,000,000/year`);
assert.ok(dc.flurocarbonRefrigerantEliminatedKg > 800, `Refrigerant eliminated (${dc.flurocarbonRefrigerantEliminatedKg.toFixed(0)} kg) must exceed 800 kg`);
console.log(`  ✓ 10 MW AI Data Center Cogeneration: Cooling = ${dc.coolingProducedMW.toFixed(2)} MW, PUE = 1.35 ➔ ${dc.cogenerationPue.toFixed(2)}, Annual Electricity Saved = ${dc.annualElectricitySavedMWh.toFixed(0)} MWh ($${dc.annualElectricityCostSavedUSD.toLocaleString('en-US', { maximumFractionDigits: 0 })}/year), Avoided CO2 = ${dc.annualAvoidedCO2Tons.toFixed(0)} tons/yr, Eliminated HFC = ${dc.flurocarbonRefrigerantEliminatedKg.toFixed(0)} kg.`);

console.log('🎉 Test Suite 362 Passed (4/4 assertion groups clean)!');
