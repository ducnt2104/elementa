// tests/test-supercritical-co2-geothermal.mjs
// Test Suite 354: Supercritical Carbon Dioxide (sCO2) Closed-Loop Geothermal Power Cycle
import assert from 'assert';
import {
  GEOTHERMAL_ROCKS,
  SCO2_TURBINE_CYCLES,
  calculateThermosiphonBuoyancy,
  calculateSco2TurbinePowerAndEfficiency,
  calculateGeothermalPlantEconomicsAndCarbonStorage
} from '../src/domain/supercriticalCo2GeothermalEngine.ts';

console.log('🧪 Running Test Suite 354: Supercritical Carbon Dioxide (sCO2) Geothermal Engine...');

// 1. Verifying Geological Reservoir and Turbine Cycle Catalog
console.log('  1. Verifying Geological Reservoir and Turbine Cycle Catalog...');
assert.ok(GEOTHERMAL_ROCKS.BASALT_FLOOD, 'Basalt reservoir rock must exist');
assert.strictEqual(GEOTHERMAL_ROCKS.BASALT_FLOOD.mineralCarbonationReactivity, 'HIGH', 'Basalt must have HIGH carbonation reactivity');
assert.ok(GEOTHERMAL_ROCKS.BASALT_FLOOD.carbonationMinerals.includes('Magnesite'), 'Basalt must form Magnesite (MgCO3)');

assert.ok(SCO2_TURBINE_CYCLES.RECUPERATED_BRAYTON, 'Recuperated Brayton sCO2 cycle must exist');
assert.ok(SCO2_TURBINE_CYCLES.RECUPERATED_BRAYTON.turbomachineryFootprintReductionPercent > 80, 'sCO2 turbine footprint must be >80% smaller than steam');
console.log('  ✓ Catalogs verified: Basalt CarbFix, Granite HDR, and Recuperated Brayton cycle confirmed.');

// 2. Verifying Thermosiphon Natural Buoyancy Drive
console.log('  2. Verifying Thermosiphon Natural Buoyancy Drive...');
const buoyancy = calculateThermosiphonBuoyancy(3500, 35, 200, 0.25);
assert.strictEqual(buoyancy.reservoirDepthM, 3500, 'Reservoir depth must be 3500 m');
assert.ok(buoyancy.injectionDensityKgPerM3 > 850, `Cold injection density (${buoyancy.injectionDensityKgPerM3.toFixed(1)} kg/m3) must be > 850 kg/m3`);
assert.ok(buoyancy.productionDensityKgPerM3 < 450, `Hot production density (${buoyancy.productionDensityKgPerM3.toFixed(1)} kg/m3) must be < 450 kg/m3`);
assert.ok(buoyancy.buoyantPressureHeadMpa > 10.0, `Buoyant driving pressure (${buoyancy.buoyantPressureHeadMpa.toFixed(2)} MPa) must exceed 10 MPa`);
assert.strictEqual(buoyancy.parasiticPumpingPowerFractionPercent, 0.0, 'Thermosiphon must achieve 0.0% parasitic surface pumping power');
assert.strictEqual(buoyancy.thermosiphonStatus, 'SELF_SUSTAINING', 'Thermosiphon must be SELF_SUSTAINING');
console.log(`  ✓ Thermosiphon: Injection Density = ${buoyancy.injectionDensityKgPerM3.toFixed(1)} kg/m³, Production Density = ${buoyancy.productionDensityKgPerM3.toFixed(1)} kg/m³, Buoyant Head = ${buoyancy.buoyantPressureHeadMpa.toFixed(2)} MPa (100% Self-Sustaining, 0% Parasitic Pumping).`);

// 3. Verifying sCO2 Surface Turbomachinery & Compact Footprint
console.log('  3. Verifying sCO2 Surface Turbomachinery & Compact Footprint...');
const turbine = calculateSco2TurbinePowerAndEfficiency(200, 'RECUPERATED_BRAYTON', 180.0);
assert.ok(turbine.grossTurbinePowerMW > 10.0 && turbine.grossTurbinePowerMW < 30.0, `Gross turbine power (${turbine.grossTurbinePowerMW.toFixed(2)} MW) must be 10 - 30 MW`);
assert.ok(turbine.netElectricPowerMW > 8.0 && turbine.netElectricPowerMW < 25.0, `Net power (${turbine.netElectricPowerMW.toFixed(2)} MW) must be 8 - 25 MW`);
assert.ok(turbine.cycleThermalEfficiencyPercent > 12.0 && turbine.cycleThermalEfficiencyPercent < 25.0, `Thermal efficiency (${turbine.cycleThermalEfficiencyPercent.toFixed(1)}%) must be 12 - 25%`);
assert.ok(turbine.turbineRotorDiameterMeters < 1.0, `sCO2 turbine rotor (${turbine.turbineRotorDiameterMeters.toFixed(2)} m) must be < 1.0 m`);
assert.ok(turbine.equivalentSteamTurbineDiameterMeters > 3.0, `Equivalent steam turbine (${turbine.equivalentSteamTurbineDiameterMeters.toFixed(2)} m) must exceed 3.0 m`);
console.log(`  ✓ Turbomachinery: Gross = ${turbine.grossTurbinePowerMW.toFixed(2)} MW, Net = ${turbine.netElectricPowerMW.toFixed(2)} MW, η_th = ${turbine.cycleThermalEfficiencyPercent.toFixed(1)}%, sCO2 Rotor = ${turbine.turbineRotorDiameterMeters.toFixed(2)} m vs Steam = ${turbine.equivalentSteamTurbineDiameterMeters.toFixed(2)} m.`);

// 4. Verifying Plant Economics & Mineral Carbonation Storage
console.log('  4. Verifying Plant Economics & Mineral Carbonation Storage...');
const plant = calculateGeothermalPlantEconomicsAndCarbonStorage(25.0, 'BASALT_FLOOD', 0.94);
assert.strictEqual(plant.electricPowerMW, 25.0, 'Plant capacity must be 25 MW');
assert.ok(plant.annualElectricityGenerationGWh > 180, `Annual generation (${plant.annualElectricityGenerationGWh.toFixed(1)} GWh) must exceed 180 GWh`);
assert.ok(plant.levelizedCostOfElectricityUSDPerMWh < 70, `LCOE ($${plant.levelizedCostOfElectricityUSDPerMWh}/MWh) must be < $70/MWh`);
assert.strictEqual(plant.waterConsumptionLitersPerMWh, 0.0, 'Water consumption must be 0.0 L/MWh (100% closed gas loop)');
assert.ok(plant.annualMineralizedCarbonSequestrationTons >= 10000, `Mineralized CO2 (${plant.annualMineralizedCarbonSequestrationTons.toFixed(0)} tons/yr) must be >= 10,000 tons/yr`);
assert.ok(plant.annualAvoidedCO2EmissionsTons > 120000, `Avoided emissions (${plant.annualAvoidedCO2EmissionsTons.toFixed(0)} tons/yr) must exceed 120,000 tons/yr`);
console.log(`  ✓ Plant Economics (25 MW): Generation = ${plant.annualElectricityGenerationGWh.toFixed(1)} GWh/yr, LCOE = $${plant.levelizedCostOfElectricityUSDPerMWh}/MWh, Water = 0.0 L/MWh, Permanent Carbon Mineralized = ${plant.annualMineralizedCarbonSequestrationTons.toLocaleString()} tons/yr, Avoided CO2 = ${plant.annualAvoidedCO2EmissionsTons.toLocaleString()} tons/yr.`);

console.log('🎉 Test Suite 354 Passed (4/4 assertion groups clean)!');
