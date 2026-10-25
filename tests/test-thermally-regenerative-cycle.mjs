/**
 * test-thermally-regenerative-cycle.mjs
 *
 * Test Suite 332: Thermally Regenerative Electrochemical Cycle (TREC) Engine Audit
 * Validates temperature coefficients (dE/dT), Prussian blue analogues, 4-stage cycle thermodynamics,
 * Carnot efficiency benchmarks, and industrial waste heat harvesting plant sizing.
 */

import assert from 'assert';
import {
  TREC_COUPLE_SPECS,
  ThermallyRegenerativeElectrochemicalCycleEngine
} from '../src/domain/thermallyRegenerativeElectrochemicalCycleEngine.ts';

console.log('🧪 Running Test Suite 332: Thermally Regenerative Electrochemical Cycle (TREC) Engine...');

// 1. Verify Couple Catalog & Temperature Coefficients
console.log('  1. Verifying TREC Couple Catalog & Temperature Coefficients...');
const couples = Object.keys(TREC_COUPLE_SPECS);
assert.strictEqual(couples.length, 4, 'Must define exactly 4 TREC redox couple systems');

couples.forEach((id) => {
  const spec = TREC_COUPLE_SPECS[id];
  assert(spec.nameVi && spec.cathodeMaterial && spec.anodeMaterial, `${id} must contain full material names`);
  assert(spec.tempCoefficientMvPerK < -1.0 && spec.tempCoefficientMvPerK > -2.5, `${id} alpha must be between -1.0 and -2.5 mV/K`);
  assert(spec.reversibleEntropyJPerMolK < -90 && spec.reversibleEntropyJPerMolK > -220, `${id} Delta S must be negative and realistic`);
  assert(spec.maxSpecificCapacityMahPerG >= 40 && spec.maxSpecificCapacityMahPerG <= 100, `${id} capacity must be 40-100 mAh/g`);
});
console.log('  ✓ TREC couple catalog and entropy coefficients verified.');

// 2. Verify Cycle Thermodynamics (T_H = 60°C, T_L = 20°C, Delta T = 40 K)
console.log('  2. Verifying 4-Stage Thermodynamic Cycle & Efficiency Calculations...');
const conditions = {
  coupleType: 'KNiHCF_AG_AGCL',
  tempHighC: 60.0,
  tempLowC: 20.0,
  chargeCurrentDensityMaCm2: 4.0,
  dischargeCurrentDensityMaCm2: 4.0,
  activeMassGramPerCell: 50.0,
  heatExchangerEffectivenessPercent: 75.0
};

const cycle = ThermallyRegenerativeElectrochemicalCycleEngine.calculateCycleThermodynamics(conditions);

assert.strictEqual(cycle.deltaTemperatureK, 40.0, 'Delta T must equal 40 K');
assert(cycle.deltaVoltageV > 0.015 && cycle.deltaVoltageV < 0.070, `Delta V net (${cycle.deltaVoltageV} V) must be between 15 and 70 mV`);
assert(cycle.netWorkOutputJoules > 100, `Net work output (${cycle.netWorkOutputJoules} J) must be positive and substantial`);
assert(cycle.netSpecificEnergyWhPerKg > 0.5 && cycle.netSpecificEnergyWhPerKg < 4.0, `Specific energy (${cycle.netSpecificEnergyWhPerKg} Wh/kg) must be realistic`);

// Heat input & Carnot metrics
assert(cycle.heatInputHighTempJoules.electrochemicalEntropyHeatJoules > 0, 'Entropy heat input must be positive');
assert(cycle.heatInputHighTempJoules.sensibleHeatingJoules > 0, 'Sensible heat input must be positive');
assert(cycle.efficiencies.carnotEfficiencyPercent > 10.0 && cycle.efficiencies.carnotEfficiencyPercent < 15.0, `Carnot limit (${cycle.efficiencies.carnotEfficiencyPercent}%) must be 10-15%`);
assert(cycle.efficiencies.thermalEfficiencyPercent > 1.5 && cycle.efficiencies.thermalEfficiencyPercent < 7.0, `Thermal efficiency (${cycle.efficiencies.thermalEfficiencyPercent}%) must be 1.5-7%`);
assert(cycle.efficiencies.relativeCarnotEfficiencyPercent > 15.0 && cycle.efficiencies.relativeCarnotEfficiencyPercent < 55.0, `Relative Carnot efficiency (${cycle.efficiencies.relativeCarnotEfficiencyPercent}%) must be 15-55%`);

console.log(`  ✓ Cycle: Delta V = ${(cycle.deltaVoltageV * 1000).toFixed(1)} mV, W_net = ${cycle.netWorkOutputJoules} J, eta_th = ${cycle.efficiencies.thermalEfficiencyPercent}%, eta_carnot = ${cycle.efficiencies.carnotEfficiencyPercent}%, Rel Carnot = ${cycle.efficiencies.relativeCarnotEfficiencyPercent}%.`);

// 3. Verify Industrial Waste Heat Harvesting Plant (100 kW_th)
console.log('  3. Verifying Industrial Waste Heat Harvesting Plant Design (100 kW_th)...');
const plant = ThermallyRegenerativeElectrochemicalCycleEngine.designIndustrialHarvestingPlant(100.0, conditions);

assert.strictEqual(plant.wasteHeatSourceKwTh, 100.0, 'Waste heat must be 100 kW_th');
assert(plant.netElectricPowerOutputKwE >= 1.5 && plant.netElectricPowerOutputKwE <= 6.5, `Electric power (${plant.netElectricPowerOutputKwE} kW_e) must be 1.5-6.5 kW`);
assert(plant.annualElectricityGeneratedMwh >= 12.0, `Annual electricity (${plant.annualElectricityGeneratedMwh} MWh) must exceed 12 MWh`);
assert(plant.avoidedGridCo2TonsPerYear >= 6.0, `Avoided CO2 (${plant.avoidedGridCo2TonsPerYear} tons) must exceed 6 tons`);
assert(plant.simplePaybackPeriodYears >= 1.0 && plant.simplePaybackPeriodYears <= 8.0, `Payback period (${plant.simplePaybackPeriodYears} yrs) must be 1-8 yrs`);

console.log(`  ✓ Plant: Waste Heat = 100 kW_th -> P_electric = ${plant.netElectricPowerOutputKwE} kW_e, Annual = ${plant.annualElectricityGeneratedMwh} MWh, Avoided CO2 = ${plant.avoidedGridCo2TonsPerYear} tons/yr, Payback = ${plant.simplePaybackPeriodYears} yrs.`);

console.log('🎉 Test Suite 332 Passed (3/3 assertion groups clean)!');
