// tests/test-liquid-air-energy-storage.mjs
// Test Suite 366: Liquid-Air Energy Storage (LAES) Cryogenic Engine Verification

import assert from 'assert';
import {
  LAES_SCALES,
  calculateLaesCyclePerformance,
  calculateLaesEconomicsAndEmissions
} from '../src/domain/liquidAirEnergyStorageEngine.ts';

console.log('🧪 Running Test Suite 366: Liquid-Air Energy Storage (LAES) Cryogenic Engine...');

// 1. Scale Catalog
console.log('  1. Verifying LAES Scale Catalog...');
assert(LAES_SCALES.COMMUNITY_MICROGRID, 'Community Microgrid scale must exist');
assert(LAES_SCALES.REGIONAL_SUBSTATION, 'Regional Substation scale must exist');
assert(LAES_SCALES.UTILITY_GIGAWATT_HOUR, 'Gigawatt-Hour Utility scale must exist');

const utility = LAES_SCALES.UTILITY_GIGAWATT_HOUR;
assert.strictEqual(utility.nominalDischargePowerMW, 100.0, 'Utility discharge power must be 100 MW');
assert.strictEqual(utility.totalEnergyMWh, 1200.0, 'Utility storage energy must be 1200 MWh (1.2 GWh)');
console.log('  ✓ LAES scale catalog verified (10 MW to 100 MW / 1.2 GWh).');

// 2. Cryogenic Thermodynamic Cycle & Cold Thermal Energy Storage (CTES)
console.log('  2. Verifying Cryogenic Thermodynamic Cycle & Cold Recycling...');
const cyclePerf = calculateLaesCyclePerformance('REGIONAL_SUBSTATION', 0.92, true);
console.log(`  ✓ Regional LAES: Discharge = ${cyclePerf.dischargePowerMW} MW x ${cyclePerf.storageDurationHours} h (500 MWh)`);
console.log(`    RTE = ${cyclePerf.roundTripEfficiencyPercent.toFixed(1)}%, Liquid Air Density = ${cyclePerf.liquidAirDensityKgPerM3} kg/m3`);
console.log(`    Expansion Ratio = ${cyclePerf.expansionRatioLiquidToGas}x, Liquid Production = ${cyclePerf.liquidAirProductionRateKgPerSec.toFixed(1)} kg/s`);

assert(cyclePerf.roundTripEfficiencyPercent >= 55.0 && cyclePerf.roundTripEfficiencyPercent <= 65.0,
  `LAES Round-Trip Efficiency (${cyclePerf.roundTripEfficiencyPercent}%) must be 55 - 65% with recycled cold`);
assert.strictEqual(cyclePerf.liquidAirDensityKgPerM3, 875.0, 'Liquid air density must be 875 kg/m3 at -194°C');
assert(cyclePerf.expansionRatioLiquidToGas >= 700,
  `Liquid to ambient gas expansion ratio (${cyclePerf.expansionRatioLiquidToGas}x) must be >= 700x`);
assert(cyclePerf.turbineInletPressureBar >= 120.0,
  'Expander turbine inlet pressure must be >= 120 bar');
console.log('  ✓ Cryogenic Claude cycle thermodynamics and cold recycle boost verified.');

// 3. Grid Scale Economics, 35-Year Durability & Zero Critical Metals
console.log('  3. Verifying Grid Economics, LCOS & Zero Critical Metals...');
const econ = calculateLaesEconomicsAndEmissions('REGIONAL_SUBSTATION', cyclePerf.roundTripEfficiencyPercent);
console.log(`  ✓ 500 MWh Facility: CapEx = $${econ.capitalCostTotalMillionUSD.toFixed(1)}M ($${econ.capitalCostPerKWhUSD.toFixed(1)}/kWh)`);
console.log(`    LCOS = $${econ.levelizedCostOfStoragePerMWh.toFixed(1)}/MWh, Calendar Life = ${econ.calendarLifeYears} years`);
console.log(`    Avoided CO2 = ${econ.annualAvoidedCO2Tons.toFixed(0)} tons/yr, Critical Materials = ${econ.criticalMaterialsMassKg} kg`);

assert(econ.capitalCostPerKWhUSD <= 150.0,
  `LAES CapEx ($${econ.capitalCostPerKWhUSD}/kWh) must be <= $150/kWh at 10h duration`);
assert(econ.levelizedCostOfStoragePerMWh <= 85.0,
  `LAES LCOS ($${econ.levelizedCostOfStoragePerMWh}/MWh) must be <= $85/MWh`);
assert.strictEqual(econ.calendarLifeYears, 35, 'Calendar life must be 35 years');
assert.strictEqual(econ.criticalMaterialsMassKg, 0.0, 'Critical materials mass (Li, Co, Ni) must strictly be 0.0 kg');
assert(econ.annualAvoidedCO2Tons > 50000.0, 'Avoided CO2 must be > 50,000 tons/year displacing gas peakers');
console.log('  ✓ Economics, 35-year life, and 100% critical metal-free metrics confirmed.');

console.log('🎉 Test Suite 366 Passed (3/3 assertion groups clean)!');
