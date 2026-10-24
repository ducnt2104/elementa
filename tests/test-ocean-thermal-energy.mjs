// tests/test-ocean-thermal-energy.mjs
// Test Suite 272: Ocean Thermal Energy Conversion (OTEC) & Deep-Sea Ammonia Engine Audit

import assert from 'node:assert';
import {
  OTEC_FLUID_CATALOG,
  VIETNAM_OTEC_RESOURCES,
  calculateAmmoniaSaturationPressureBar,
  calculateOtecPerformance
} from '../src/domain/oceanThermalEnergyEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 272: OCEAN THERMAL ENERGY CONVERSION (OTEC) AUDIT');
console.log('======================================================================\n');

// 1. Fluid Catalog & Ammonia Vapor Pressure Thermodynamics
console.log('1. Checking OTEC Working Fluids Catalog & Ammonia Antoine Equation...');
assert(Object.keys(OTEC_FLUID_CATALOG).length >= 4, 'Must catalog at least 4 working fluids');
const ammonia = OTEC_FLUID_CATALOG.ANHYDROUS_AMMONIA_NH3;
assert.strictEqual(ammonia.chemicalFormula, 'NH3');
assert(ammonia.latentHeatVaporizationKjKg > 1000, 'NH3 must have huge latent heat > 1000 kJ/kg');

// Verify Ammonia saturation pressures at 26°C and 8°C
const P_evap_26 = calculateAmmoniaSaturationPressureBar(26);
const P_cond_8 = calculateAmmoniaSaturationPressureBar(8);
console.log(`  - NH3 Saturation Pressure at 26°C: ${P_evap_26.toFixed(2)} bar`);
console.log(`  - NH3 Saturation Pressure at 8°C: ${P_cond_8.toFixed(2)} bar`);
console.log(`  - Expansion Pressure Ratio: ${(P_evap_26 / P_cond_8).toFixed(2)}`);

assert(P_evap_26 >= 9.8 && P_evap_26 <= 11.0, `P_evap at 26°C should be ~10.3 bar (got ${P_evap_26})`);
assert(P_cond_8 >= 5.3 && P_cond_8 <= 6.2, `P_cond at 8°C should be ~5.7 bar (got ${P_cond_8})`);
assert(P_evap_26 / P_cond_8 >= 1.7 && P_evap_26 / P_cond_8 <= 1.95, 'Expansion ratio must be ~1.8');
console.log('  ✓ Ammonia physical chemistry and Antoine vapor-liquid equilibria validated');

// 2. Closed-Cycle Ammonia Rankine Performance Simulation
console.log('\n2. Testing Closed-Cycle Ammonia ORC Performance (10 MW Class Plant)...');
const ccParams = {
  technology: 'CLOSED_CYCLE_AMMONIA',
  workingFluid: 'ANHYDROUS_AMMONIA_NH3',
  warmSurfaceWaterTempC: 28.5,
  coldDeepWaterTempC: 4.5,
  coldWaterPipeDepthM: 1000,
  coldWaterPipeDiameterM: 2.8,
  warmWaterFlowRateM3s: 25.0,
  coldWaterFlowRateM3s: 15.0,
  evaporatorPinchPointDeltaC: 2.0,
  condenserPinchPointDeltaC: 2.0,
  turbineIsentropicEfficiencyPct: 85.0,
  pumpEfficiencyPct: 82.0
};

const ccResult = calculateOtecPerformance(ccParams);
console.log(`  - Delta T: ${ccResult.thermalGradientDeltaC}°C`);
console.log(`  - Carnot Efficiency: ${ccResult.carnotEfficiencyPct}%`);
console.log(`  - Rankine Gross Efficiency: ${ccResult.rankineGrossEfficiencyPct}%`);
console.log(`  - Net Cycle Efficiency: ${ccResult.netCycleEfficiencyPct}%`);
console.log(`  - Gross Power: ${ccResult.grossGeneratorPowerMw} MW`);
console.log(`  - Parasitic Pumping Power: ${ccResult.parasiticLosses.totalParasiticPowerMw} MW (${ccResult.parasiticLosses.parasiticShareOfGrossPct}%)`);
console.log(`  - Net Export Power: ${ccResult.netExportPowerMw} MW`);
console.log(`  - Annual Generation: ${ccResult.annualNetGenerationGwh} GWh (Capacity Factor: ${ccResult.capacityFactorPct}%)`);

assert(ccResult.thermalGradientDeltaC >= 23.0 && ccResult.thermalGradientDeltaC <= 25.0, 'Delta T must be ~24°C');
assert(ccResult.carnotEfficiencyPct >= 7.5 && ccResult.carnotEfficiencyPct <= 8.5, 'Carnot efficiency should be ~8%');
assert(ccResult.rankineGrossEfficiencyPct >= 3.2 && ccResult.rankineGrossEfficiencyPct <= 4.5, 'Gross efficiency should be ~3.8%');
assert(ccResult.netExportPowerMw > 5.0 && ccResult.netExportPowerMw < 15.0, 'Net export should be around 7-12 MW');
assert(ccResult.parasiticLosses.parasiticShareOfGrossPct >= 20.0 && ccResult.parasiticLosses.parasiticShareOfGrossPct <= 40.0, 'Parasitic share should be ~25-35%');
console.log('  ✓ Closed-cycle low-delta T thermodynamics and net power export validated');

// 3. Cold Water Pipe (CWIP) Hydrodynamics & Head Loss
console.log('\n3. Verifying Deep-Sea Cold Water Pipe (CWIP) Hydrodynamics & Head Losses...');
const hydro = ccResult.coldWaterPipeHydrodynamics;
console.log(`  - Flow Velocity in CWIP (D = 2.8m): ${hydro.flowVelocityMPerS} m/s`);
console.log(`  - Darcy-Weisbach Friction Head Loss (L = 1000m): ${hydro.darcyFrictionalHeadLossM} m`);
console.log(`  - Density Difference Head Loss: ${hydro.densityDifferenceHeadM} m`);
console.log(`  - Total Dynamic Head (TDH): ${hydro.totalDynamicHeadM} m`);

assert(hydro.flowVelocityMPerS >= 2.0 && hydro.flowVelocityMPerS <= 2.8, 'CWIP velocity should be optimal 2.0 - 2.8 m/s');
assert(hydro.darcyFrictionalHeadLossM > 0.5 && hydro.darcyFrictionalHeadLossM < 5.0, 'Frictional head loss must be realistic');
assert(hydro.densityDifferenceHeadM >= 4.0 && hydro.densityDifferenceHeadM <= 6.0, 'Density head must reflect cold vs warm seawater column');
assert(hydro.totalDynamicHeadM >= 6.0 && hydro.totalDynamicHeadM <= 12.0, 'TDH should be ~7 - 11 m');
console.log('  ✓ Darcy-Weisbach hydrodynamics and cold seawater pumping losses validated');

// 4. Byproducts, SWAC & Blue Economy Potentials
console.log('\n4. Verifying Co-Products, SWAC Air Conditioning & Deep-Sea Nutrients...');
const coProd = ccResult.byproductsAndBlueEconomy;
console.log(`  - SWAC Thermal Cooling Capacity: ${coProd.swacCoolingCapacityMwTh} MWth`);
console.log(`  - Chiller Electricity Saved: ${coProd.swacElectricitySavedMw} MW`);
console.log(`  - Nitrate (NO3-) Concentration: ${coProd.deepOceanWaterNutrients.nitrateConcentrationUmolL} µmol/L`);
console.log(`  - Aquaculture Growth Factor: ${coProd.deepOceanWaterNutrients.aquacultureYieldBoostFactor}x`);
console.log(`  - Green H2 Potential: ${coProd.greenHydrogenProductionKgPerDay} kg H2/day`);
console.log(`  - Green Ammonia Potential: ${coProd.greenAmmoniaProductionTonsPerDay} tons NH3/day`);

assert(coProd.swacCoolingCapacityMwTh > 100, 'SWAC thermal cooling capacity should be > 100 MWth');
assert(coProd.swacElectricitySavedMw > 20, 'SWAC electricity saved should be > 20 MW');
assert(coProd.deepOceanWaterNutrients.nitrateConcentrationUmolL > 25, 'Nutrient NO3- should be high in deep ocean water');
assert(coProd.greenHydrogenProductionKgPerDay > 2000, 'Daily green H2 potential should be > 2,000 kg');
console.log('  ✓ SWAC energy savings, deep water nutrient enrichment, and green NH3 potential validated');

// 5. Open-Cycle & Hybrid Freshwater Production
console.log('\n5. Testing Open-Cycle (Claude) & Hybrid Potable Water Production...');
const openResult = calculateOtecPerformance({
  ...ccParams,
  technology: 'OPEN_CYCLE_FLASH_STEAM',
  workingFluid: 'PURE_WATER_STEAM'
});

console.log(`  - Open-Cycle Freshwater Production: ${openResult.byproductsAndBlueEconomy.potableWaterProductionM3PerDay} m³/day`);
assert(openResult.byproductsAndBlueEconomy.potableWaterProductionM3PerDay > 5000, 'Open-cycle must produce substantial freshwater (> 5,000 m³/day)');
console.log('  ✓ Open-cycle vacuum flash desalination validated');

// 6. Vietnam Oceanic Resources Benchmark Sites
console.log('\n6. Checking Vietnam OTEC Resource Sites...');
assert(VIETNAM_OTEC_RESOURCES.length >= 5, 'Must have at least 5 key Vietnam resource sites');
const caNa = VIETNAM_OTEC_RESOURCES.find(s => s.siteId === 'NINH_THUAN_CA_NA');
const truongSa = VIETNAM_OTEC_RESOURCES.find(s => s.siteId === 'HOANG_SA_TRUONG_SA');
assert(caNa, 'Cà Ná Ninh Thuận must exist');
assert(truongSa, 'Trường Sa must exist');
assert(caNa.deltaTC >= 23.5, 'Cà Ná Delta T must exceed 23°C');
assert(truongSa.distanceTo1000mDepthKm <= 10, 'Trường Sa atolls have steep 1000m drops near shore');
console.log(`  - Cà Ná (Ninh Thuận): Delta T = ${caNa.deltaTC}°C, Trench Distance = ${caNa.distanceTo1000mDepthKm} km`);
console.log(`  - Trường Sa (Biển Đông): Delta T = ${truongSa.deltaTC}°C, Trench Distance = ${truongSa.distanceTo1000mDepthKm} km, Potential = ${truongSa.theoreticalBaseloadPotentialMw} MW`);
console.log('  ✓ Vietnam coastal and maritime OTEC potential verified');

console.log('\n======================================================================');
console.log('   TEST SUITE 272: ALL OTEC THERMODYNAMICS & HYDRODYNAMICS PASSED!');
console.log('======================================================================\n');
