// tests/test-thermophotovoltaic-grid-storage.mjs
// Test Suite 300: Thermophotovoltaic (TPV) Ultra-High Temperature Grid Energy Storage Engine

import assert from 'node:assert';
import {
  TPV_CELL_CATALOG,
  STORAGE_CORE_CATALOG,
  SELECTIVE_EMITTER_CATALOG,
  calculatePlanckSpectralRadiance,
  generatePlanckSpectrum,
  solveTpvCellOperatingPoint,
  calculateTpvGridStorageSystemBalance
} from '../src/domain/thermophotovoltaicGridStorageEngine.ts';

console.log('🧪 Running Test Suite 300: Thermophotovoltaic (TPV) Grid Storage Engine...');

// Test 1: Catalogs & Properties
console.log('  1. Verifying TPV Cell Architectures and Storage Core Specs...');
assert(TPV_CELL_CATALOG.DUAL_JUNCTION_GAASSB_INGAAS, 'MIT/NREL GaAsSb/InGaAs cell must exist');
const mitCell = TPV_CELL_CATALOG.DUAL_JUNCTION_GAASSB_INGAAS;
assert.strictEqual(mitCell.topBandgapEv, 1.20);
assert.strictEqual(mitCell.bottomBandgapEv, 0.95);
assert(mitCell.subBandgapReflectivityPct >= 98.0, 'Sub-bandgap BSR reflectivity must be >= 98%');
assert(mitCell.benchmarkedEfficiencyAt2400KPct >= 40.0, 'Benchmark efficiency must be >= 40%');

assert(STORAGE_CORE_CATALOG.HIGH_PURITY_ISOSTATIC_GRAPHITE, 'Isostatic graphite core must exist');
const graphite = STORAGE_CORE_CATALOG.HIGH_PURITY_ISOSTATIC_GRAPHITE;
assert.strictEqual(graphite.maxOperatingTempC, 2400);
assert(graphite.volumetricHeatCapacityKwhThPerM3 > 1000);

assert(SELECTIVE_EMITTER_CATALOG.TUNGSTEN_1D_PHOTONIC_CRYSTAL, '1D Photonic crystal emitter must exist');
console.log('  ✓ Catalogs, bandgaps, and thermal storage properties verified.');

// Test 2: Planck Radiation Spectrum & Wien's Displacement Law
console.log('  2. Verifying Planck Spectral Radiance & Wien Displacement Law...');
const tKelvin = 2400; // 2127°C
const peakWavelengthUm = 1.20; // 2898 / 2400 ~ 1.207 μm
const radianceAtPeak = calculatePlanckSpectralRadiance(peakWavelengthUm, tKelvin, 0.88);
const radianceAt4Um = calculatePlanckSpectralRadiance(4.0, tKelvin, 0.88);

assert(radianceAtPeak > 1e5, `Peak radiance should be > 100,000 W/(m2 μm), got ${radianceAtPeak}`);
assert(radianceAtPeak > radianceAt4Um * 3, 'Peak near 1.2 μm must be much higher than tail at 4.0 μm');

const spectrum = generatePlanckSpectrum(tKelvin, mitCell.bottomBandgapEv, 0.88);
assert(spectrum.length > 50, 'Spectrum points should cover broad infrared range');
const supraBandgapCount = spectrum.filter(p => p.isAboveBandgap).length;
assert(supraBandgapCount > 15, 'Must have sufficient supra-bandgap points for photon absorption');
console.log(`  ✓ Planck Physics verified: Peak radiance at 1.2 μm = ${(radianceAtPeak / 1000).toFixed(1)} kW/(m²·μm) (>> ${(radianceAt4Um / 1000).toFixed(1)} kW at 4.0 μm).`);

// Test 3: High-Power TPV Operating Point & Photon Recycling
console.log('  3. Verifying TPV Cell Operating Point & Sub-Bandgap Photon Recycling...');
const op = solveTpvCellOperatingPoint(mitCell, 2200, 0.88, 30);
assert(op.blackbodyTotalRadiationWPerCm2 > 100.0, `Total thermal radiation should be > 100 W/cm2 at 2200°C, got ${op.blackbodyTotalRadiationWPerCm2}`);
assert(op.cellElectricalEfficiencyPct >= 40.0, `Cell electrical efficiency should be >= 40%, got ${op.cellElectricalEfficiencyPct}%`);
assert(op.generatedElectricalPowerWPerCm2 > 5.0, `Generated electric power density should be > 5 W/cm2, got ${op.generatedElectricalPowerWPerCm2} W/cm2`);
assert(op.totalRoundTripEfficiencyPct >= 38.0, `Grid storage RTE should be >= 38%, got ${op.totalRoundTripEfficiencyPct}%`);
console.log(`  ✓ TPV Operating Point: Emitter = ${op.emitterTemperatureC}°C, Total Flux = ${op.blackbodyTotalRadiationWPerCm2} W/cm², Power Density = ${op.generatedElectricalPowerWPerCm2} W/cm² (~150x Solar PV), Cell Efficiency = ${op.cellElectricalEfficiencyPct}%, Grid RTE = ${op.totalRoundTripEfficiencyPct}%.`);

// Test 4: Grid-Scale 100 MWh Thermal Battery Balance & LCOS
console.log('  4. Verifying 100 MWh-e Grid Storage Balance and Techno-Economics...');
const balance = calculateTpvGridStorageSystemBalance(mitCell, graphite, 100, 2200, 10);
assert.strictEqual(balance.storageCapacityMwhElectric, 100);
assert.strictEqual(balance.dischargeDurationHours, 10);
assert.strictEqual(balance.dischargeElectricalPowerMw, 10); // 100 MWh / 10h = 10 MW

// Graphite mass: ~240 MWh-th / 0.640 MWh/ton ~ 375 tons
assert(balance.graphiteCoreMassTons > 300 && balance.graphiteCoreMassTons < 500, `Graphite mass should be 300-500 tons, got ${balance.graphiteCoreMassTons}`);

// Receiver area: 10 MW / (~37 W/cm2 = 373 kW/m2) ~ 25-50 m2
assert(balance.tpvCellActiveAreaM2 > 15 && balance.tpvCellActiveAreaM2 < 100, `TPV receiver area should be 15-100 m2, got ${balance.tpvCellActiveAreaM2}`);

// CAPEX should be drastically cheaper than Lithium-ion (~$150/kWh)
assert(balance.capexUsdPerKwhStorageCapacity < 45.0, `TPV storage CAPEX should be < $45/kWh, got $${balance.capexUsdPerKwhStorageCapacity}/kWh`);
assert(balance.annualAvoidedCo2TonsPerYear > 8000, 'Avoided CO2 should be > 8,000 tons/year replacing gas peakers');
console.log(`  ✓ Grid Balance: 100 MWh-e / 10 MW Plant -> Graphite Core = ${balance.graphiteCoreMassTons} tons (${balance.graphiteCoreVolumeM3} m³), TPV Receiver = ${balance.tpvCellActiveAreaM2} m², CAPEX = $${balance.capexUsdPerKwhStorageCapacity}/kWh-e (vs $150/kWh Li-ion), Avoided CO2 = ${balance.annualAvoidedCo2TonsPerYear} tons/year.`);

console.log('🎉 Test Suite 300 PASSED: Thermophotovoltaic Grid Storage Engine is 100% verified!\n');
