/**
 * test-thermo-galvanic-cell.mjs
 *
 * Test Suite 336: Thermoelectrochemical (Thermo-Galvanic) Cell Engine Audit
 * Validates Seebeck coefficients (Se = dV/dT), chaotropic guanidinium solvation enhancement,
 * maximum power transfer theorem, and wearable skin-heat energy harvesting patch design.
 */

import assert from 'assert';
import {
  THERMO_GALVANIC_SYSTEMS,
  ThermoGalvanicCellEngine
} from '../src/domain/thermoGalvanicCellEngine.ts';

console.log('🧪 Running Test Suite 336: Thermo-Galvanic Cell Engine...');

// 1. Verify Catalog & Seebeck Coefficients
console.log('  1. Verifying Thermo-Galvanic Electrolyte Systems & Seebeck Coefficients...');
const systems = Object.keys(THERMO_GALVANIC_SYSTEMS);
assert.strictEqual(systems.length, 4, 'Must define exactly 4 thermo-galvanic redox systems');

systems.forEach((id) => {
  const spec = THERMO_GALVANIC_SYSTEMS[id];
  assert(spec.nameVi && spec.redoxCouple && spec.electrolyteMedium, `${id} must contain full system description`);
  assert(spec.ionicConductivitySPerM >= 5.0 && spec.ionicConductivitySPerM <= 25.0, `${id} conductivity must be 5-25 S/m`);
  assert(spec.thermalConductivityWPerMK >= 0.15 && spec.thermalConductivityWPerMK <= 0.80, `${id} thermal conductivity must be 0.15-0.80 W/(m*K)`);
});

// Guanidinium enhancement check
const guanidinium = THERMO_GALVANIC_SYSTEMS['GUANIDINIUM_ENHANCED_HYDROGEL'];
assert(guanidinium.seebeckCoefficientMvPerK <= -3.5, 'Guanidinium hydrogel Seebeck coefficient must reach at least -3.5 mV/K');
assert(guanidinium.figureOfMeritZtTimes1000 >= 5.0, 'Guanidinium hydrogel ZT*1000 must exceed 5.0');

// Iodide positive Seebeck check
const iodide = THERMO_GALVANIC_SYSTEMS['IODIDE_TRIIODIDE_NONAQUEOUS'];
assert(iodide.seebeckCoefficientMvPerK > 0.5, 'Iodide/triiodide must have a positive Seebeck coefficient (p-type)');

console.log('  ✓ Thermo-galvanic system catalog and Seebeck coefficients verified.');

// 2. Verify Steady-State Performance (Delta T = 10 K)
console.log('  2. Verifying Steady-State Voltage, Internal Resistance & Maximum Power Transfer...');
const conditions = {
  systemType: 'GUANIDINIUM_ENHANCED_HYDROGEL',
  hotTempC: 35.0,
  coldTempC: 25.0,
  cellAreaCm2: 25.0,
  cellThicknessMm: 3.5
};

const perf = ThermoGalvanicCellEngine.calculatePerformance(conditions);

assert.strictEqual(perf.deltaTemperatureK, 10.0, 'Delta T must be exactly 10 K');
assert.strictEqual(perf.openCircuitVoltageMv, -38.5, 'Voc must equal -38.5 mV for Delta T = 10 K at -3.85 mV/K');
assert(perf.internalResistanceOhm >= 0.5 && perf.internalResistanceOhm <= 3.0, `R_int (${perf.internalResistanceOhm} Ohm) must be 0.5-3.0 Ohm`);
assert(perf.operatingVoltageMv >= 18.0 && perf.operatingVoltageMv <= 20.0, `Operating voltage (${perf.operatingVoltageMv} mV) at matched load must be ~Voc/2`);
assert(perf.powerOutputMicroWatts >= 200.0, `Power output (${perf.powerOutputMicroWatts} µW) must exceed 200 µW`);
assert(perf.normalizedPowerDensityMwPerM2K2 >= 0.5, `Normalized power density (${perf.normalizedPowerDensityMwPerM2K2}) must be realistic`);

console.log(`  ✓ Performance: Voc = ${perf.openCircuitVoltageMv} mV, R_int = ${perf.internalResistanceOhm} Ohm, V_op = ${perf.operatingVoltageMv} mV, P_max = ${perf.powerOutputMicroWatts} µW, Normalized = ${perf.normalizedPowerDensityMwPerM2K2} mW/(m²·K²).`);

// 3. Verify Wearable Skin-Heat Harvesting Patch Design
console.log('  3. Verifying Wearable Skin-Heat Energy Harvesting Patch Design...');
const wearable = ThermoGalvanicCellEngine.designWearablePatch(25.0, 'GUANIDINIUM_ENHANCED_HYDROGEL', 34.0, 24.0);

assert.strictEqual(wearable.patchAreaCm2, 25.0, 'Patch area must be 25 cm2');
assert.strictEqual(wearable.skinTempC, 34.0, 'Skin temp must be 34°C');
assert(wearable.netHarvestedPowerMicroWatts >= 200.0, `Harvested power (${wearable.netHarvestedPowerMicroWatts} µW) must exceed 200 µW`);

// Check wearable device support
const cgm = wearable.supportedDevices.find(d => d.deviceNameVi.includes('Đường Huyết'));
assert(cgm && cgm.canOperateContinuously, 'Must continuously power Continuous Glucose Monitor (CGM)');

const ble = wearable.supportedDevices.find(d => d.deviceNameVi.includes('Bluetooth'));
assert(ble && ble.canOperateContinuously, 'Must continuously power Bluetooth Low Energy (BLE) beacon');

assert(wearable.batteryEliminatedPerDecade >= 5, `Must eliminate at least 5 coin cell batteries per decade (${wearable.batteryEliminatedPerDecade} eliminated)`);

console.log(`  ✓ Wearable Patch: P_harvest = ${wearable.netHarvestedPowerMicroWatts} µW on human skin (Delta T = 10 K), powers CGM & BLE continuously, saves ${wearable.batteryEliminatedPerDecade} coin batteries/decade.`);

console.log('🎉 Test Suite 336 Passed (3/3 assertion groups clean)!');
