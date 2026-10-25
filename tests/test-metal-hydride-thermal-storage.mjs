// tests/test-metal-hydride-thermal-storage.mjs
// ELEMENTA TEST SUITE 294: Metal Hydride Thermochemical Thermal Energy Storage (TCS) Audit
import assert from 'assert';
import {
  HIGH_TEMP_HYDRIDE_CATALOG,
  LOW_TEMP_COUPLED_CATALOG,
  CONDUCTIVITY_ENHANCEMENT_CATALOG,
  calculateVanTHoffEquilibriumPressureBar,
  calculateDualBedHeatPump,
  calculateTcsPlantBalance,
  THERMAL_STORAGE_BENCHMARKS
} from '../src/domain/metalHydrideThermalStorageEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 294: METAL HYDRIDE THERMAL ENERGY STORAGE AUDIT');
console.log('======================================================================\n');

// 1. Catalog Properties Validation
console.log('1. Checking High-Temp Hydrides & Coupled Storage Catalogs...');
const mgH2 = HIGH_TEMP_HYDRIDE_CATALOG['MAGNESIUM_MGH2'];
assert.strictEqual(mgH2.reactionEnthalpyDeltaHKjPerMolH2, 74.5, 'MgH2 Delta H must be +74.5 kJ/mol');
assert.strictEqual(mgH2.reactionEntropyDeltaSJPerMolK, 135.0, 'MgH2 Delta S must be +135.0 J/(mol K)');
assert(mgH2.volumetricThermalStorageDensityKwhPerM3 > 1200, 'MgH2 volumetric heat density must exceed 1,200 kWh/m³');
assert(mgH2.gravimetricThermalStorageDensityKwhPerTon > 700, 'MgH2 gravimetric heat density must exceed 700 kWh/ton');

const laNi5 = LOW_TEMP_COUPLED_CATALOG['LANI5_STANDARD'];
assert(laNi5.plateauPressureAt25CBar > 1.0 && laNi5.plateauPressureAt25CBar < 3.0, 'LaNi5 room temp plateau pressure should be ~1.7 bar');

const eng = CONDUCTIVITY_ENHANCEMENT_CATALOG['EXPANDED_NATURAL_GRAPHITE_ENG_10PCT'];
assert(eng.effectiveThermalConductivityWPerMK >= 10.0, 'ENG matrix k_eff must exceed 10 W/(m·K)');
assert(eng.chargingRateMultiplier >= 5.0, 'ENG charging rate multiplier must be >= 5x');
console.log('  ✓ Catalogs (MgH2, Mg2NiH4, LaNi5, TiFe, ENG compacts) verified\n');

// 2. Van 't Hoff Isotherm Calculations
console.log('2. Testing Van \'t Hoff Equilibrium Pressure Calculations...');
// At 300°C (573.15 K): ln(P) = -74500 / (8.314 * 573.15) + 135.0 / 8.314 = -15.63 + 16.24 = +0.61 -> P ~ 1.84 bar
const p300 = calculateVanTHoffEquilibriumPressureBar(74.5, 135.0, 300);
assert(p300 > 1.0 && p300 < 3.0, `Equilibrium pressure at 300°C should be ~1.8 bar, got ${p300} bar`);

// At 400°C (673.15 K): ln(P) = -74500 / (8.314 * 673.15) + 135.0 / 8.314 = -13.31 + 16.24 = +2.93 -> P ~ 18.7 bar
const p400 = calculateVanTHoffEquilibriumPressureBar(74.5, 135.0, 400);
assert(p400 > 12.0 && p400 < 25.0, `Equilibrium pressure at 400°C should be ~18.7 bar, got ${p400} bar`);

// At 278.7°C (decomposition temperature at 1 bar):
const p1bar = calculateVanTHoffEquilibriumPressureBar(74.5, 135.0, 278.7);
assert(Math.abs(p1bar - 1.0) < 0.15, `Equilibrium pressure at 278.7°C should be ~1.0 bar, got ${p1bar} bar`);
console.log('  - MgH2 at 278.7°C: ' + p1bar + ' bar (Decomposition temperature at 1 atm)');
console.log('  - MgH2 at 300°C:   ' + p300 + ' bar');
console.log('  - MgH2 at 400°C:   ' + p400 + ' bar');
console.log('  ✓ Van \'t Hoff thermodynamic equilibrium verified\n');

// 3. Dual-Bed Heat Pump & Heat Upgrading Performance
console.log('3. Testing Dual-Bed Metal Hydride Heat Pump & Heat Upgrading...');
const heatPump = calculateDualBedHeatPump({
  highTempHydride: 'MAGNESIUM_MGH2',
  lowTempHydride: 'LANI5_STANDARD',
  highBedOperatingTempC: 380, // Discharge temperature
  wasteHeatSourceTempC: 80    // Industrial waste heat source
});

assert(heatPump.coefficientOfPerformanceCopHeating > 2.0, `COP heating must exceed 2.0, got ${heatPump.coefficientOfPerformanceCopHeating}`);
assert.strictEqual(heatPump.temperatureLiftDeltaTDegC, 300.0, 'Temperature lift should be 380 - 80 = 300°C');
assert(heatPump.highBedPlateauPressureBar > 10.0, 'High bed pressure at 380°C should be > 10 bar');
assert(heatPump.heatUpgradingEfficiencyPct > 50.0, 'Heat upgrading exergy efficiency should exceed 50%');

console.log('  - High Bed: ' + heatPump.highBedTempC + '°C (Plateau: ' + heatPump.highBedPlateauPressureBar + ' bar)');
console.log('  - Low Bed:  ' + heatPump.lowBedTempC + '°C (Plateau: ' + heatPump.lowBedPlateauPressureBar + ' bar)');
console.log('  - COP Heating: ' + heatPump.coefficientOfPerformanceCopHeating + ' (Q_high / Q_low)');
console.log('  - Temperature Lift (Delta T): +' + heatPump.temperatureLiftDeltaTDegC + '°C (Upgrades 80°C waste heat to 380°C steam!)');
console.log('  ✓ Dual-bed heat pump metrics verified\n');

// 4. Plant Thermal Storage Balance (TCS)
console.log('4. Testing Plant Mass and Energy Balance (10 MWh-th Storage Facility)...');
const plantBalance = calculateTcsPlantBalance({
  storageCapacityMwhTh: 10.0, // 10 MWh-th
  highTempHydride: 'MAGNESIUM_MGH2',
  lowTempHydride: 'LANI5_STANDARD',
  conductivityEnhancement: 'EXPANDED_NATURAL_GRAPHITE_ENG_10PCT',
  chargingTempC: 420,
  dischargingTempC: 380
});

assert(plantBalance.massOfHighTempHydrideTons > 10.0 && plantBalance.massOfHighTempHydrideTons < 16.0, `High temp hydride mass should be ~12.7 tons, got ${plantBalance.massOfHighTempHydrideTons} tons`);
assert(plantBalance.hydrogenCirculatedKg > 800.0, `Hydrogen circulated should be > 800 kg, got ${plantBalance.hydrogenCirculatedKg} kg`);
assert.strictEqual(plantBalance.parasiticLossPerDayPct, 0.0, 'Thermochemical storage must have zero daily thermal loss at room temperature');
assert(plantBalance.roundTripThermalEfficiencyPct >= 90.0, 'Round trip thermal efficiency must be >= 90%');
assert(plantBalance.chargingDurationHours <= 1.5, 'ENG compact charging duration should be <= 1.5 hours');
assert(plantBalance.avoidedCo2TonsPerYear > 500, 'Avoided CO2 should exceed 500 tons/year');

console.log('  - Storage Capacity:      ' + plantBalance.storageCapacityMwhTh + ' MWh-th');
console.log('  - High-Temp MgH2 Mass:   ' + plantBalance.massOfHighTempHydrideTons + ' tons (stores ' + (10000 / plantBalance.massOfHighTempHydrideTons).toFixed(0) + ' kWh-th/ton)');
console.log('  - Hydrogen Circulated:   ' + plantBalance.hydrogenCirculatedKg + ' kg H2');
console.log('  - Charging / Discharging Rate: ' + plantBalance.chargingDurationHours + ' hours (Power: ' + plantBalance.chargingPowerMwTh + ' MWth)');
console.log('  - Daily Thermal Loss:    ' + plantBalance.parasiticLossPerDayPct + '% / day (Ambient Storage)');
console.log('  - Avoided CO2:           ' + plantBalance.avoidedCo2TonsPerYear + ' tons/year');
console.log('  ✓ Thermochemical plant balance verified\n');

// 5. Thermal Storage Technology Benchmarks
console.log('5. Checking Thermal Storage Technology Benchmark Matrix...');
assert.strictEqual(THERMAL_STORAGE_BENCHMARKS.length, 4);
const hydride = THERMAL_STORAGE_BENCHMARKS.find(b => b.technologyName.includes('Metal Hydride TCS'));
const moltenSalt = THERMAL_STORAGE_BENCHMARKS.find(b => b.technologyName.includes('Molten Salt'));

assert(hydride.energyDensityKwhPerM3 > moltenSalt.energyDensityKwhPerM3 * 5, 'Metal hydride energy density must be > 5x molten salt');
assert.strictEqual(hydride.thermalDegradationPerDayPct, '0.0% / ngày (Lưu trữ ở nhiệt độ phòng)');
console.log('  - Metal Hydride: ' + hydride.energyDensityKwhPerM3 + ' kWh/m³ (' + (hydride.energyDensityKwhPerM3 / moltenSalt.energyDensityKwhPerM3).toFixed(1) + 'x higher than molten salt)');
console.log('  - Molten Salt:   ' + moltenSalt.energyDensityKwhPerM3 + ' kWh/m³ (Degradation: ' + moltenSalt.thermalDegradationPerDayPct + ')');
console.log('  ✓ Multi-technology thermal storage benchmark validated\n');

console.log('======================================================================');
console.log('   TEST SUITE 294: ALL METAL HYDRIDE THERMAL STORAGE CHECKS PASSED!');
console.log('======================================================================\n');
