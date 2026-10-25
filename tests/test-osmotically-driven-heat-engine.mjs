/**
 * test-osmotically-driven-heat-engine.mjs
 *
 * Test Suite 344: Osmotically Driven Heat Engine (ODHE) Closed-Loop Domain Engine Verification
 * Verifies thermolytic draw solute specs, PRO membrane transport with ICP,
 * hydraulic pressure optimization, and low-temperature heat-to-electricity thermodynamic cycles.
 */

import assert from 'assert';
import {
  ODHE_DRAW_SOLUTES,
  ODHE_MEMBRANES,
  OsmoticallyDrivenHeatEngineDomain
} from '../src/domain/osmoticallyDrivenHeatEngine.ts';

console.log('🧪 Running Test Suite 344: Osmotically Driven Heat Engine (ODHE) Domain Engine...');

// =========================================================================
// 1. Solute and Membrane Specifications
// =========================================================================
console.log('  1. Verifying Solute & Membrane Specifications...');
const nh4hco3 = ODHE_DRAW_SOLUTES.AMMONIUM_BICARBONATE;
assert.strictEqual(nh4hco3.vantHoffFactor, 2.0, 'NH4HCO3 must dissociate into 2 ions (NH4+ and HCO3-)');
assert(nh4hco3.decompositionTempC <= 60, 'NH4HCO3 must decompose at <= 60°C');
assert(nh4hco3.decompositionEnthalpyKjPerMol > 50, 'Decomposition enthalpy must exceed 50 kJ/mol');

const goMembrane = ODHE_MEMBRANES.GRAPHENE_OXIDE;
assert(goMembrane.waterPermeabilityA_L_m2_h_bar >= 8.0, 'GO membrane water permeability A must be >= 8.0 LMH/bar');
assert(goMembrane.saltRejectionPercent >= 99.0, 'GO membrane salt rejection must be >= 99%');
console.log('  ✓ Draw solute and PRO membrane catalogs verified.');

// =========================================================================
// 2. Osmotic Pressure Calculations
// =========================================================================
console.log('  2. Verifying van \'t Hoff Osmotic Pressures...');
const piDraw2M = OsmoticallyDrivenHeatEngineDomain.calculateOsmoticPressureBar(nh4hco3, 2.0, 25);
assert(piDraw2M >= 90.0 && piDraw2M <= 105.0, `2.0 M NH4HCO3 osmotic pressure (${piDraw2M.toFixed(1)} bar) must be 90-105 bar`);

const piDraw1M = OsmoticallyDrivenHeatEngineDomain.calculateOsmoticPressureBar(nh4hco3, 1.0, 25);
assert(Math.abs(piDraw2M / piDraw1M - 2.0) < 0.05, 'Osmotic pressure must scale linearly with concentration');
console.log(`  ✓ Osmotic pressure: 1.0 M = ${piDraw1M.toFixed(1)} bar, 2.0 M = ${piDraw2M.toFixed(1)} bar.`);

// =========================================================================
// 3. PRO Water Flux, ICP & Power Density Optimization
// =========================================================================
console.log('  3. Verifying Water Permeation with ICP & Power Density Curve...');
const osmoticResult = OsmoticallyDrivenHeatEngineDomain.calculateOsmoticPower({
  soluteType: 'AMMONIUM_BICARBONATE',
  membraneType: 'GRAPHENE_OXIDE',
  drawConcentrationMolar: 2.0,
  feedSalinityGPerL: 0.5,
  wasteHeatTempC: 60,
  coolingTempC: 25,
  appliedHydraulicPressureBar: 25.0
});

assert(osmoticResult.waterFluxLMH > 15.0, `Water flux (${osmoticResult.waterFluxLMH.toFixed(1)} LMH) must be > 15.0 LMH`);
assert(osmoticResult.dilutiveIcpFactor < 1.0 && osmoticResult.dilutiveIcpFactor > 0.3, 'Dilutive ICP factor must be between 0.3 and 1.0');
assert(osmoticResult.powerDensityWPerM2 >= 10.0, `Power density (${osmoticResult.powerDensityWPerM2.toFixed(1)} W/m2) must be >= 10.0 W/m2`);
assert(osmoticResult.maxPowerDensityWPerM2 >= osmoticResult.powerDensityWPerM2, 'Max power density must be >= operating power density');
console.log(`  ✓ PRO at 25 bar: J_w = ${osmoticResult.waterFluxLMH.toFixed(1)} LMH, ICP = ${(osmoticResult.dilutiveIcpFactor * 100).toFixed(1)}%, W = ${osmoticResult.powerDensityWPerM2.toFixed(1)} W/m2, W_max = ${osmoticResult.maxPowerDensityWPerM2.toFixed(1)} W/m2 at P_opt = ${osmoticResult.optimalHydraulicPressureBar.toFixed(1)} bar.`);

// =========================================================================
// 4. Closed-Loop Thermodynamic System Performance
// =========================================================================
console.log('  4. Verifying Closed-Loop Heat-to-Electricity Performance...');
const systemResult = OsmoticallyDrivenHeatEngineDomain.calculateSystemThermodynamics({
  soluteType: 'AMMONIUM_BICARBONATE',
  membraneType: 'GRAPHENE_OXIDE',
  drawConcentrationMolar: 2.0,
  feedSalinityGPerL: 0.5,
  wasteHeatTempC: 65,
  coolingTempC: 20,
  appliedHydraulicPressureBar: 25.0
}, 1000.0); // 1,000 m2 membrane plant

assert(systemResult.netElectricalPowerKw >= 10.0 && systemResult.netElectricalPowerKw <= 45.0, `Net power (${systemResult.netElectricalPowerKw.toFixed(1)} kW) must be 10-45 kW`);
assert(systemResult.carnotEfficiencyPercent >= 12.0 && systemResult.carnotEfficiencyPercent <= 15.0, 'Carnot efficiency at 65°C/20°C must be 12-15%');
assert(systemResult.percentOfCarnotLimit >= 10.0 && systemResult.percentOfCarnotLimit <= 35.0, `Percent of Carnot (${systemResult.percentOfCarnotLimit.toFixed(1)}%) must be 10-35%`);
assert(systemResult.co2EmissionsAvoidedTonsPerYear > 50.0, 'Annual avoided CO2 must exceed 50 tons/year');
console.log(`  ✓ 1,000 m2 ODHE Plant: Net Electricity = ${systemResult.netElectricalPowerKw.toFixed(1)} kW_e, Q_th = ${systemResult.thermalHeatInputKw.toFixed(1)} kW_th, η_th = ${systemResult.thermalEfficiencyPercent.toFixed(2)}% (${systemResult.percentOfCarnotLimit.toFixed(1)}% of Carnot limit), Water recycled = ${systemResult.closedLoopWaterCirculationM3PerHour.toFixed(1)} m3/h, Avoided CO2 = ${systemResult.co2EmissionsAvoidedTonsPerYear.toFixed(1)} tons/yr.`);

console.log('🎉 Test Suite 344 Passed (4/4 assertion groups clean)!');
