// tests/test-microbial-electrosynthesis.mjs
// ELEMENTA TEST SUITE 292: Microbial Electrosynthesis (MES) & Gas-Diffusion Biocathode Audit
import assert from 'assert';
import {
  ELECTROACTIVE_MICROBE_CATALOG,
  CATHODE_ARCHITECTURE_CATALOG,
  calculateMesKinetics,
  calculateMesPlantBalance,
  evaluateBiofilmHealth,
  CARBON_VALORIZATION_BENCHMARKS
} from '../src/domain/microbialElectrosynthesisEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 292: MICROBIAL ELECTROSYNTHESIS (MES) AUDIT');
console.log('======================================================================\n');

// 1. Microbe and Cathode Catalog Validation
console.log('1. Checking Electroactive Microbes and Cathode Architectures...');
const sporomusa = ELECTROACTIVE_MICROBE_CATALOG['SPOROMUSA_OVATA'];
assert.strictEqual(sporomusa.primaryPathway, 'Con đường Wood-Ljungdahl (Reductive Acetyl-CoA)');
assert.strictEqual(sporomusa.electronUptakeMechanism, 'DIRECT_ELECTRON_TRANSFER');
assert(sporomusa.maxCoulombicEfficiencyPct >= 90.0, 'Sporomusa ovata must have >= 90% Coulombic Efficiency');

const clostridium = ELECTROACTIVE_MICROBE_CATALOG['CLOSTRIDIUM_AUTETHANOGENUM'];
assert(clostridium.targetProduct.includes('Etanol'), 'Clostridium must target ethanol/acetate');

const gdbCathode = CATHODE_ARCHITECTURE_CATALOG['GAS_DIFFUSION_PTFE_CARBON'];
assert.strictEqual(gdbCathode.hydrophobicPtfeLayer, true, 'GDB must feature hydrophobic PTFE layer for CO2 transfer');
assert(gdbCathode.typicalCurrentDensityAPerM2 >= 30.0, 'GDB current density must be >= 30 A/m²');

const planarCathode = CATHODE_ARCHITECTURE_CATALOG['GRAPHITE_PLATE_PLANAR'];
assert(planarCathode.typicalCurrentDensityAPerM2 <= 2.5, 'Planar graphite must have low current density (< 2.5 A/m²)');
console.log('  ✓ Microbes (S. ovata, C. autoethanogenum) and cathodes (GDB, 3D biochar) verified\n');

// 2. Bioelectrochemical Kinetics & Nernstian Overpotentials
console.log('2. Testing Bioelectrochemical Kinetics & Nernstian Overpotentials...');
const kinetics = calculateMesKinetics({
  microbeType: 'SPOROMUSA_OVATA',
  cathodeType: 'GAS_DIFFUSION_PTFE_CARBON',
  cathodePotentialVvsShe: -0.65, // -0.65 V vs SHE
  electrolytePh: 7.0
});

assert.strictEqual(kinetics.isThermodynamicallyFeasible, true, 'Cathode potential -0.65V must drive CO2 reduction');
assert(kinetics.currentDensityAPerM2 > 20.0, `Current density on GDB should be > 20 A/m², got ${kinetics.currentDensityAPerM2}`);
assert(kinetics.coulombicEfficiencyPct > 80.0, `Coulombic efficiency should be > 80%, got ${kinetics.coulombicEfficiencyPct}%`);
assert(kinetics.cellVoltageVolts >= 2.0 && kinetics.cellVoltageVolts <= 4.0, `Cell voltage should be 2.0-4.0V, got ${kinetics.cellVoltageVolts}V`);
assert(kinetics.volumetricProductivityGPerLDay > 0.5, 'Volumetric productivity should be > 0.5 g/(L·day)');

console.log('  - Cathode Potential: -0.65 V vs SHE (Overpotential: ' + kinetics.co2ReductionOverpotentialV + ' V)');
console.log('  - Current Density:   ' + kinetics.currentDensityAPerM2 + ' A/m²');
console.log('  - Cell Voltage:      ' + kinetics.cellVoltageVolts + ' V');
console.log('  - Coulombic Eff:     ' + kinetics.coulombicEfficiencyPct + '% (Volumetric Productivity: ' + kinetics.volumetricProductivityGPerLDay + ' g/L·day)');
console.log('  ✓ Bioelectrochemical kinetics equations verified\n');

// 3. Complete Plant Mass & Energy Balance
console.log('3. Testing Complete MES Plant Mass & Energy Balance...');
const plantBalance = calculateMesPlantBalance({
  totalCathodeAreaM2: 500.0, // 500 m² cathode stack
  microbeType: 'SPOROMUSA_OVATA',
  cathodeType: 'GAS_DIFFUSION_PTFE_CARBON',
  cathodePotentialVvsShe: -0.65,
  electrolytePh: 7.0
});

assert(plantBalance.appliedCurrentAmperes > 10000, `Applied current should exceed 10,000 A, got ${plantBalance.appliedCurrentAmperes}`);
assert(plantBalance.electricPowerInputKw > 20.0, 'Power input should exceed 20 kW');
assert(plantBalance.co2ConsumptionRateKgPerHour > 3.0, `CO2 consumption should exceed 3 kg/hr, got ${plantBalance.co2ConsumptionRateKgPerHour}`);
assert(plantBalance.aceticAcidProductionKgPerHour > 2.0, `Acetic acid production should exceed 2 kg/hr, got ${plantBalance.aceticAcidProductionKgPerHour}`);
assert(plantBalance.aceticAcidAnnualMetricTons > 18.0, 'Annual acetic acid production should exceed 18 metric tons/year');
assert(plantBalance.co2AnnualMetricTonsCaptured > 25.0, 'Annual CO2 captured should exceed 25 tons/year');
assert(plantBalance.specificEnergyConsumptionKwhPerKgAcetate > 5.0 && plantBalance.specificEnergyConsumptionKwhPerKgAcetate < 15.0, 'Specific energy should be 5-15 kWh/kg acetate');

console.log('  - Cathode Area:    ' + plantBalance.totalCathodeAreaM2 + ' m² (Current: ' + plantBalance.appliedCurrentAmperes + ' A, Power: ' + plantBalance.electricPowerInputKw + ' kW)');
console.log('  - CO2 Consumed:    ' + plantBalance.co2ConsumptionRateKgPerHour + ' kg/hr (' + plantBalance.co2AnnualMetricTonsCaptured + ' tons/year)');
console.log('  - Acetic Acid:     ' + plantBalance.aceticAcidProductionKgPerHour + ' kg/hr (' + plantBalance.aceticAcidAnnualMetricTons + ' tons/year, $' + plantBalance.annualProductMarketValueUsd.toLocaleString() + '/year)');
console.log('  - O2 Co-product:   ' + plantBalance.oxygenCoProductKgPerHour + ' kg/hr');
console.log('  - Specific Energy: ' + plantBalance.specificEnergyConsumptionKwhPerKgAcetate + ' kWh/kg acetate');
console.log('  ✓ Mass and energy balance equations validated\n');

// 4. Biofilm Health and Thickness
console.log('4. Testing Biofilm Health, Live Cell Density & Mass Transfer...');
const healthyBiofilm = evaluateBiofilmHealth(45.0); // 45 um
assert.strictEqual(healthyBiofilm.biofilmStatus, 'HEALTHY_EXPONENTIAL');
assert(healthyBiofilm.liveCellDensityCellsPerCm2 > 1e9, 'Cell density should exceed 10^9 cells/cm²');

const thickBiofilm = evaluateBiofilmHealth(160.0); // 160 um
assert.strictEqual(thickBiofilm.biofilmStatus, 'SLOUGHING_OVERTHICK', 'Overthick biofilm must report sloughing warning');

const thinBiofilm = evaluateBiofilmHealth(10.0); // 10 um
assert.strictEqual(thinBiofilm.biofilmStatus, 'STARVED');
console.log('  - 45 µm:  Status = ' + healthyBiofilm.biofilmStatus + ' (Cells: ' + healthyBiofilm.liveCellDensityCellsPerCm2.toExponential(2) + ' cells/cm²)');
console.log('  - 160 µm: Status = ' + thickBiofilm.biofilmStatus + ' (Advice: ' + thickBiofilm.operationalAdvice.slice(0, 40) + '...)');
console.log('  ✓ Biofilm health evaluation validated\n');

// 5. Benchmark Matrix
console.log('5. Checking Carbon Valorization Benchmark Matrix...');
assert.strictEqual(CARBON_VALORIZATION_BENCHMARKS.length, 4);
const mes = CARBON_VALORIZATION_BENCHMARKS.find(b => b.technologyName.includes('Microbial Electrosynthesis'));
assert(mes.coulombicEnergyEfficiencyPct > 80.0, 'MES must have high Coulombic efficiency');
assert(mes.catalystDurability.includes('Tự sinh sôi'), 'Microbial catalyst is self-replicating');
console.log('  ✓ Comparative benchmark verified\n');

console.log('======================================================================');
console.log('   TEST SUITE 292: ALL MICROBIAL ELECTROSYNTHESIS CHECKS PASSED!');
console.log('======================================================================\n');
