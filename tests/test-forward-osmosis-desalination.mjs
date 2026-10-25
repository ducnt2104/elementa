// tests/test-forward-osmosis-desalination.mjs
// ELEMENTA TEST SUITE 310: Forward Osmosis (FO) Desalination & PRO Energy Engine
import assert from 'assert';
import {
  FO_MEMBRANE_CATALOG,
  DRAW_SOLUTION_CATALOG,
  FEED_WATER_CATALOG,
  calculateFoFlux,
  calculateProPowerDensity,
  calculateCommercialZldPlantBalance
} from '../src/domain/forwardOsmosisDesalinationEngine.ts';

console.log('🧪 Running Test Suite 310: Forward Osmosis Desalination & PRO Energy Engine...');

// 1. Catalogs Verification
console.log('  1. Verifying FO Membranes, Draw Solutions, and Feed Waters...');
const tfcNanofiber = FO_MEMBRANE_CATALOG.TFC_POLYAMIDE_ELECTROSPUN_NANOFIBER;
const cta = FO_MEMBRANE_CATALOG.CELLULOSE_TRIACETATE_CTA_WOVEN;
const nh4bicarb = DRAW_SOLUTION_CATALOG.THERMOLYTIC_AMMONIUM_BICARBONATE;
const roBrine = FEED_WATER_CATALOG.RO_DESALINATION_BRINE_70_PPT;
const seawater = FEED_WATER_CATALOG.STANDARD_SEAWATER_35_PPT;

assert(tfcNanofiber.structuralParameterS < cta.structuralParameterS, 'TFC nanofiber must have lower S parameter than CTA to mitigate ICP');
assert(nh4bicarb.regenerationTempCelsius === 60.0, 'Thermolytic draw solution must decompose at 60°C waste heat');
assert(roBrine.totalDissolvedSolidsGPerL === 70.0, 'RO reject brine must have 70 g/L TDS');
console.log('  ✓ Catalogs verified.');

// 2. Forward Osmosis Flux & ICP Dynamics
console.log('  2. Verifying Water Flux, Internal Concentration Polarization (ICP), and Reverse Salt Flux...');
const foNanofiber = calculateFoFlux(tfcNanofiber, nh4bicarb, seawater, 2.5);
const foCta = calculateFoFlux(cta, nh4bicarb, seawater, 2.5);

assert(foNanofiber.waterFluxLmh > foCta.waterFluxLmh, 'TFC nanofiber membrane must achieve higher water flux than CTA due to lower ICP');
assert(foNanofiber.waterFluxLmh >= 20.0, `TFC nanofiber flux should exceed 20 LMH, got ${foNanofiber.waterFluxLmh} LMH`);
assert(foNanofiber.specificReverseSoluteFluxGPerL <= 0.20, `Specific reverse salt flux should be <= 0.20 g/L, got ${foNanofiber.specificReverseSoluteFluxGPerL} g/L`);
assert(foNanofiber.internalConcentrationPolarizationModulus > 0.30, 'ICP modulus should be maintained > 0.30');
console.log(`  ✓ FO Flux: Nanofiber = ${foNanofiber.waterFluxLmh} LMH, CTA = ${foCta.waterFluxLmh} LMH, Js/Jw = ${foNanofiber.specificReverseSoluteFluxGPerL} g/L.`);

// 3. Pressure Retarded Osmosis (PRO) Power Density
console.log('  3. Verifying Pressure Retarded Osmosis (PRO) Salinity Gradient Power Density...');
const proNanofiber = calculateProPowerDensity(tfcNanofiber, nh4bicarb, seawater, 2.5, 0.50);

assert(proNanofiber.appliedHydraulicPressureBar > 10.0, 'Applied hydraulic pressure should exceed 10 bar');
assert(proNanofiber.powerDensityWPerM2 >= 5.0, `PRO power density must meet commercial threshold >= 5.0 W/m2, got ${proNanofiber.powerDensityWPerM2} W/m2`);
assert(proNanofiber.isCommerciallyViable, 'High-performance TFC membrane must be marked as commercially viable in PRO');
console.log(`  ✓ PRO Power Density: ${proNanofiber.powerDensityWPerM2} W/m2, Net Annual = ${proNanofiber.annualNetEnergyMwhPer1000M2} MWh / 1000 m2.`);

// 4. Commercial Zero Liquid Discharge (ZLD) Mass Balance
console.log('  4. Verifying Commercial ZLD Plant Balance & Decarbonization...');
const zldBalance = calculateCommercialZldPlantBalance(foNanofiber, 5000.0, roBrine);

assert(zldBalance.dailyPureWaterPermeateM3 >= 2000.0, `5,000 m2 plant must yield >= 2,000 m3/day pure permeate, got ${zldBalance.dailyPureWaterPermeateM3} m3/day`);
assert(zldBalance.specificEnergyConsumptionKwhPerM3 <= 1.5, 'Specific electrical energy must be <= 1.5 kWh/m3');
assert(zldBalance.avoidedThermalCrystallizerCo2TonsPerYear >= 5000.0, `Avoided CO2 should exceed 5,000 tons/yr, got ${zldBalance.avoidedThermalCrystallizerCo2TonsPerYear} tons/yr`);
console.log(`  ✓ ZLD Balance: Daily Permeate = ${zldBalance.dailyPureWaterPermeateM3} m3/day, Avoided CO2 = ${zldBalance.avoidedThermalCrystallizerCo2TonsPerYear} t/yr, SEC = ${zldBalance.specificEnergyConsumptionKwhPerM3} kWh/m3.`);

console.log('🎉 Test Suite 310 PASSED: Forward Osmosis Desalination & PRO Energy Engine is 100% verified!\n');
