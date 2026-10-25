/**
 * test-aluminum-air-battery.mjs
 *
 * Test Suite 330: Aluminum-Air (Al-Air) Battery & Alkaline Corrosion Inhibition Engine
 * Validates stannate/zincate corrosion suppression, Bayer seed crystallization, and EV mechanical refuel balance.
 */

import assert from 'assert';
import {
  AL_AIR_INHIBITORS,
  AluminumAirBatteryEngine
} from '../src/domain/aluminumAirBatteryEngine.ts';

console.log('🧪 Running Test Suite 330: Aluminum-Air Battery Engine...');

// 1. Verify Inhibitors Catalog and Specific Energy Constants
console.log('  1. Verifying Alkaline Corrosion Inhibitors & Theoretical Constants...');
assert(AL_AIR_INHIBITORS.STANNATE_TIN, 'Potassium stannate must exist');
assert(AL_AIR_INHIBITORS.ZINCATE_ZINC, 'Potassium zincate must exist');
assert(AL_AIR_INHIBITORS.PEG_ORGANIC_SURFACTANT, 'PEG surfactant must exist');
assert(AL_AIR_INHIBITORS.UNINHIBITED_RAW_AL, 'Uninhibited raw Al baseline must exist');

assert(AluminumAirBatteryEngine.AL_THEORETICAL_CAPACITY_AH_KG >= 2900, 'Al theoretical capacity must be >= 2,900 Ah/kg');
assert(AluminumAirBatteryEngine.AL_THEORETICAL_ENERGY_WH_KG >= 8000, 'Al theoretical energy must be >= 8,000 Wh/kg');

assert(AL_AIR_INHIBITORS.STANNATE_TIN.corrosionInhibitionEfficiencyPercent >= 90.0, 'Stannate must exceed 90% corrosion inhibition');
assert(AL_AIR_INHIBITORS.UNINHIBITED_RAW_AL.openCircuitSelfDischargePercentPerDay > 10.0, 'Uninhibited Al should have >10%/day self-discharge');
console.log('  ✓ Inhibitors catalog and specific energy constants verified.');

// 2. Verify Electrochemical Performance, Mixed Potential & Stannate HER Suppression
console.log('  2. Verifying Mixed Potential OCV, Operating Voltage & HER Suppression...');
const electroInhibited = AluminumAirBatteryEngine.calculateElectrochemicalPerformance({
  inhibitor: 'STANNATE_TIN',
  temperatureC: 25.0,
  currentDensityMaPerCm2: 80.0, // 80 mA/cm2
  kohConcentrationMolar: 6.0,
  aluminateConcentrationMolar: 2.0,
  electrolyteFlowVelocityCmPerS: 8.0,
  cellActiveAreaCm2: 400.0,
  hasSeedCrystallizer: true
});

assert(electroInhibited.openCircuitVoltageV >= 1.70 && electroInhibited.openCircuitVoltageV <= 2.10, `Mixed potential OCV should be 1.70-2.10 V, got ${electroInhibited.openCircuitVoltageV} V`);
assert(electroInhibited.operatingCellVoltageV >= 1.20 && electroInhibited.operatingCellVoltageV <= 1.65, `Operating cell voltage should be 1.20-1.65 V at 80 mA/cm2, got ${electroInhibited.operatingCellVoltageV} V`);
assert(electroInhibited.parasiticCorrosionMetrics.anodeFaradaicEfficiencyPercent >= 90.0, `Inhibited Faradaic efficiency should be >= 90%, got ${electroInhibited.parasiticCorrosionMetrics.anodeFaradaicEfficiencyPercent}%`);
assert(electroInhibited.crystallizerState.gelationRisk === 'SATURATED_CRYSTALLIZING' || electroInhibited.crystallizerState.gelationRisk === 'SAFE_FLUID', 'Crystallizer must prevent gelation');

// Compare against uninhibited baseline
const electroRaw = AluminumAirBatteryEngine.calculateElectrochemicalPerformance({
  inhibitor: 'UNINHIBITED_RAW_AL',
  temperatureC: 25.0,
  currentDensityMaPerCm2: 80.0,
  kohConcentrationMolar: 6.0,
  aluminateConcentrationMolar: 2.0,
  electrolyteFlowVelocityCmPerS: 8.0,
  cellActiveAreaCm2: 400.0,
  hasSeedCrystallizer: false
});
assert(
  electroInhibited.parasiticCorrosionMetrics.hydrogenGasEvolutionRateMlPerMinPerCell <
  electroRaw.parasiticCorrosionMetrics.hydrogenGasEvolutionRateMlPerMinPerCell,
  'Inhibited Al must produce much less parasitic H2 gas than raw Al'
);

console.log(`  ✓ Performance: Inhibited OCV = ${electroInhibited.openCircuitVoltageV} V, V_cell = ${electroInhibited.operatingCellVoltageV} V, Power = ${electroInhibited.powerDensityMwPerCm2} mW/cm2, Faradaic Eff = ${electroInhibited.parasiticCorrosionMetrics.anodeFaradaicEfficiencyPercent}% (H₂ gas: ${electroInhibited.parasiticCorrosionMetrics.hydrogenGasEvolutionRateMlPerMinPerCell} ml/min vs Raw ${electroRaw.parasiticCorrosionMetrics.hydrogenGasEvolutionRateMlPerMinPerCell} ml/min).`);

// 3. Verify EV Ultra-Long Range Battery Pack (100 kWh > 1,500 km range)
console.log('  3. Verifying 100 kWh EV Battery Pack & Weight Savings vs Li-Ion...');
const evPack = AluminumAirBatteryEngine.designElectricVehicleBatteryPack(100.0, 'PEG_ORGANIC_SURFACTANT');
assert.strictEqual(evPack.totalUsableEnergyKwh, 100.0, 'Pack energy must be 100 kWh');
assert(evPack.aluminumAnodePlateWeightKg >= 20.0 && evPack.aluminumAnodePlateWeightKg <= 40.0, `Al plate mass should be 20-40 kg, got ${evPack.aluminumAnodePlateWeightKg} kg`);
assert(evPack.totalBatterySystemWeightKg >= 60.0 && evPack.totalBatterySystemWeightKg <= 110.0, `Total Al-Air pack weight should be 60-110 kg, got ${evPack.totalBatterySystemWeightKg} kg`);
assert(evPack.equivalentLiIonBatteryWeightKg >= 500.0, `100 kWh Li-ion pack must weigh >= 500 kg, got ${evPack.equivalentLiIonBatteryWeightKg} kg`);
assert(evPack.weightSavingsPercent >= 75.0, `Weight savings vs Li-ion should exceed 75%, got ${evPack.weightSavingsPercent}%`);
assert.strictEqual(evPack.mechanicalRefuelTimeMinutes, 3.0, 'Mechanical refuel must be under 3 minutes');
assert(evPack.recycledAluminumEfficiencyPercent >= 95.0, `Recycled Al recovery must be >= 95%, got ${evPack.recycledAluminumEfficiencyPercent}%`);

console.log(`  ✓ 100 kWh EV Pack: Al Mass = ${evPack.aluminumAnodePlateWeightKg} kg, Total Pack = ${evPack.totalBatterySystemWeightKg} kg vs Li-Ion ${evPack.equivalentLiIonBatteryWeightKg} kg (Saved ${evPack.weightSavingsPercent}% weight!), Mechanical Refuel = ${evPack.mechanicalRefuelTimeMinutes} min, Driving Range = ${evPack.vehicleRangeKm} km.`);
console.log('🎉 Test Suite 330 Passed (3/3 assertion groups clean)!');
