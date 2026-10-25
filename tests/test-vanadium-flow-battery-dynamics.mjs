/**
 * test-vanadium-flow-battery-dynamics.mjs
 *
 * Test Suite 322: Vanadium Redox Flow Battery (VRFB) Dual-Membrane Dynamics Engine
 * Validates 4-valence state spectrophotometry, Darcy-Forchheimer pressure drops, thermal precipitation, and grid plant economics.
 */

import assert from 'assert';
import {
  VRFB_VALENCE_SPECIES,
  VRFB_MEMBRANE_CATALOG,
  VanadiumFlowBatteryDynamicsEngine
} from '../src/domain/vanadiumFlowBatteryDynamicsEngine.ts';

console.log('🧪 Running Test Suite 322: Vanadium Redox Flow Battery Dynamics Engine...');

// 1. Verify 4 Valence States Catalog and Membrane Database
console.log('  1. Verifying 4 Valence States Catalog and Membrane Database...');
assert(VRFB_VALENCE_SPECIES.V2, 'V2+ species must exist');
assert(VRFB_VALENCE_SPECIES.V3, 'V3+ species must exist');
assert(VRFB_VALENCE_SPECIES.VO2_PLUS, 'VO^2+ species must exist');
assert(VRFB_VALENCE_SPECIES.VO2_PLUS_V, 'VO2^+ species must exist');

assert.strictEqual(VRFB_VALENCE_SPECIES.V2.valence, 2, 'V2 must have valence 2');
assert.strictEqual(VRFB_VALENCE_SPECIES.VO2_PLUS_V.valence, 5, 'VO2+ must have valence 5');

assert(VRFB_MEMBRANE_CATALOG.CEM_NAFION, 'Nafion CEM must exist');
assert(VRFB_MEMBRANE_CATALOG.AEM_FUMASEP, 'Fumasep AEM must exist');
assert(VRFB_MEMBRANE_CATALOG.SPEEK_HYDROCARBON, 'sPEEK hydrocarbon must exist');
assert(VRFB_MEMBRANE_CATALOG.AEM_FUMASEP.capacityRetentionPerCyclePercent > 99.9, 'AEM should have >99.9% capacity retention');
assert(VRFB_MEMBRANE_CATALOG.AEM_FUMASEP.vanadiumPermeabilityCm2PerMin < VRFB_MEMBRANE_CATALOG.CEM_NAFION.vanadiumPermeabilityCm2PerMin, 'AEM should have lower vanadium crossover than CEM');
console.log('  ✓ Catalogs and membrane specifications verified.');

// 2. Verify Electrochemical Performance & Optical Color Blending
console.log('  2. Verifying Electrochemical Nernst OCV, Overpotentials & Spectrophotometric Color Blending...');
const electroNormal = VanadiumFlowBatteryDynamicsEngine.calculateElectrochemicalPerformance({
  stateOfCharge: 0.50,
  temperatureC: 25.0,
  vanadiumConcentrationMolar: 1.8,
  sulfuricAcidConcentrationMolar: 2.5,
  currentDensityMaPerCm2: 120.0,
  flowRateLitersPerMin: 2.5,
  membrane: 'AEM_FUMASEP',
  hasStabilizingAdditive: true
});

assert(electroNormal.openCircuitVoltageV >= 1.30 && electroNormal.openCircuitVoltageV <= 1.55, `Nominal OCV at 50% SOC should be 1.30-1.55 V, got ${electroNormal.openCircuitVoltageV} V`);
assert(electroNormal.operatingCellVoltageDischargeV >= 1.10 && electroNormal.operatingCellVoltageDischargeV <= 1.45, `Discharge voltage should be 1.10-1.45 V, got ${electroNormal.operatingCellVoltageDischargeV} V`);
assert(electroNormal.operatingCellVoltageChargeV >= 1.35 && electroNormal.operatingCellVoltageChargeV <= 1.70, `Charge voltage should be 1.35-1.70 V, got ${electroNormal.operatingCellVoltageChargeV} V`);
assert(electroNormal.powerDensityDischargeMwPerCm2 >= 100.0 && electroNormal.powerDensityDischargeMwPerCm2 <= 250.0, `Discharge power density should be 100-250 mW/cm2, got ${electroNormal.powerDensityDischargeMwPerCm2} mW/cm2`);
assert(electroNormal.anolyteColor.colorHex.startsWith('#'), 'Anolyte color must be valid hex');
assert(electroNormal.catholyteColor.colorHex.startsWith('#'), 'Catholyte color must be valid hex');

// Test High SOC Nernst Shift
const electroHighSoc = VanadiumFlowBatteryDynamicsEngine.calculateElectrochemicalPerformance({
  stateOfCharge: 0.90,
  temperatureC: 25.0,
  vanadiumConcentrationMolar: 1.8,
  sulfuricAcidConcentrationMolar: 2.5,
  currentDensityMaPerCm2: 120.0,
  flowRateLitersPerMin: 2.5,
  membrane: 'AEM_FUMASEP',
  hasStabilizingAdditive: true
});
assert(electroHighSoc.openCircuitVoltageV > electroNormal.openCircuitVoltageV, 'High SOC should have higher OCV than 50% SOC');
console.log(`  ✓ Electrochemistry: 50% SOC OCV = ${electroNormal.openCircuitVoltageV} V, V_dis = ${electroNormal.operatingCellVoltageDischargeV} V, Power = ${electroNormal.powerDensityDischargeMwPerCm2} mW/cm2; 90% SOC OCV = ${electroHighSoc.openCircuitVoltageV} V.`);

// 3. Verify Darcy-Forchheimer Hydrodynamics, Pressure Drop & Pumping Power
console.log('  3. Verifying Darcy-Forchheimer Porous Media Hydrodynamics & Parasitic Pumping Power...');
const hydroResult = VanadiumFlowBatteryDynamicsEngine.calculateHydrodynamicsAndPumping({
  stateOfCharge: 0.50,
  temperatureC: 25.0,
  vanadiumConcentrationMolar: 1.8,
  sulfuricAcidConcentrationMolar: 2.5,
  currentDensityMaPerCm2: 120.0,
  flowRateLitersPerMin: 2.5,
  membrane: 'AEM_FUMASEP',
  hasStabilizingAdditive: true
}, 1000);

assert(hydroResult.catholyteViscosityMpaS >= 2.0 && hydroResult.catholyteViscosityMpaS <= 10.0, `Catholyte viscosity should be 2.0-10.0 mPa.s, got ${hydroResult.catholyteViscosityMpaS} mPa.s`);
assert(hydroResult.hydraulicPressureDropKpa >= 5.0 && hydroResult.hydraulicPressureDropKpa <= 80.0, `Pressure drop should be 5-80 kPa, got ${hydroResult.hydraulicPressureDropKpa} kPa`);
assert(hydroResult.pumpingPowerPerCellWatts >= 0.1 && hydroResult.pumpingPowerPerCellWatts <= 15.0, `Pumping power should be 0.1-15 W/cell, got ${hydroResult.pumpingPowerPerCellWatts} W`);
assert(hydroResult.stoichiometricFlowFactor >= 1.5, `Stoichiometric flow factor lambda should be >= 1.5, got ${hydroResult.stoichiometricFlowFactor}`);
assert(hydroResult.netDischargeEfficiencyPercent >= 65.0 && hydroResult.netDischargeEfficiencyPercent <= 85.0, `Net efficiency should be 65-85%, got ${hydroResult.netDischargeEfficiencyPercent}%`);
console.log(`  ✓ Hydrodynamics: Viscosity = ${hydroResult.catholyteViscosityMpaS} mPa.s, ΔP = ${hydroResult.hydraulicPressureDropKpa} kPa, Pump Power = ${hydroResult.pumpingPowerPerCellWatts} W/cell, Net Efficiency = ${hydroResult.netDischargeEfficiencyPercent}%.`);

// 4. Verify Thermal Precipitation Safety Window & V2O5 Kinetics
console.log('  4. Verifying Thermal Stability and Precipitation Kinetics (V2O5 vs VSO4)...');
const safeThermal = VanadiumFlowBatteryDynamicsEngine.evaluateThermalStability({
  stateOfCharge: 0.60,
  temperatureC: 28.0,
  vanadiumConcentrationMolar: 1.8,
  sulfuricAcidConcentrationMolar: 2.5,
  currentDensityMaPerCm2: 120.0,
  flowRateLitersPerMin: 2.5,
  membrane: 'AEM_FUMASEP',
  hasStabilizingAdditive: true
});
assert.strictEqual(safeThermal.catholyteV2O5PrecipitationRisk, 'SAFE', 'Moderate conditions must be safe from V2O5 precipitation');

const criticalThermal = VanadiumFlowBatteryDynamicsEngine.evaluateThermalStability({
  stateOfCharge: 0.90,
  temperatureC: 52.0,
  vanadiumConcentrationMolar: 2.0,
  sulfuricAcidConcentrationMolar: 2.5,
  currentDensityMaPerCm2: 120.0,
  flowRateLitersPerMin: 2.5,
  membrane: 'CEM_NAFION',
  hasStabilizingAdditive: false
});
assert.strictEqual(criticalThermal.catholyteV2O5PrecipitationRisk, 'CRITICAL_PRECIPITATION', 'High temperature and high SOC without additive must trigger critical precipitation risk');
console.log(`  ✓ Thermal Stability: 28°C Safe (${safeThermal.catholyteV2O5PrecipitationRisk}); 52°C / 90% SOC Critical Alert (${criticalThermal.catholyteV2O5PrecipitationRisk}, Induction time = ${criticalThermal.inductionTimeHours} h).`);

// 5. Verify 10 MW / 40 MWh Grid Scale LDES Plant Design
console.log('  5. Verifying 10 MW / 40 MWh Grid Scale LDES Plant Design & Decoupled Economics...');
const plant = VanadiumFlowBatteryDynamicsEngine.designGridScaleStoragePlant(10.0, 4.0, 'AEM_FUMASEP');
assert.strictEqual(plant.ratedPowerMw, 10.0, 'Rated power must be 10 MW');
assert.strictEqual(plant.storageDurationHours, 4.0, 'Storage duration must be 4 h');
assert.strictEqual(plant.totalCapacityMwh, 40.0, 'Total capacity must be 40 MWh');
assert(plant.totalElectrolyteVolumeM3 >= 1200 && plant.totalElectrolyteVolumeM3 <= 1800, `Electrolyte volume should be 1,200-1,800 m3, got ${plant.totalElectrolyteVolumeM3} m3`);
assert(plant.vanadiumPentoxideEquivalentTons >= 180 && plant.vanadiumPentoxideEquivalentTons <= 280, `V2O5 equivalent should be 180-280 tons, got ${plant.vanadiumPentoxideEquivalentTons} tons`);
assert(plant.capitalCostPerKwhUsd >= 180 && plant.capitalCostPerKwhUsd <= 320, `Capital cost should be $180-$320/kWh, got $${plant.capitalCostPerKwhUsd}/kWh`);
assert(plant.systemRoundTripEfficiencyPercent >= 70.0 && plant.systemRoundTripEfficiencyPercent <= 82.0, `System RTE should be 70-82%, got ${plant.systemRoundTripEfficiencyPercent}%`);
assert(plant.avoidedPeakerCo2TonsPerYear >= 5000, `Avoided peaker CO2 should be >= 5,000 tons/year, got ${plant.avoidedPeakerCo2TonsPerYear} tons/year`);

console.log(`  ✓ Grid Plant: 10 MW / 40 MWh, ${plant.stackCount} Stacks, ${plant.totalElectrolyteVolumeM3} m³ Electrolyte (${plant.vanadiumPentoxideEquivalentTons} t V₂O₅), Total CapEx = $${plant.totalCapExMillionUsd}M ($${plant.capitalCostPerKwhUsd}/kWh), RTE = ${plant.systemRoundTripEfficiencyPercent}%, Avoided CO₂ = ${plant.avoidedPeakerCo2TonsPerYear} t/yr.`);
console.log('🎉 Test Suite 322 Passed (5/5 assertions groups clean)!');
