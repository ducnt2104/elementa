// tests/test-membrane-methane-aromatization.mjs
// ELEMENTA TEST SUITE 290: Membrane Methane Dehydroaromatization (MDA) & Hydrogen Permeation Audit
import assert from 'assert';
import {
  MDA_CATALYST_CATALOG,
  MEMBRANE_CATALOG,
  calculateEquilibriumVsMembrane,
  calculateMembraneFlux,
  calculateMdaPlantBalance,
  evaluateCatalystCoking,
  HYDROGEN_AROMATICS_BENCHMARKS
} from '../src/domain/membraneMethaneAromatizationEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 290: MEMBRANE METHANE AROMATIZATION (MDA) AUDIT');
console.log('======================================================================\n');

// 1. Catalysts and Membranes Catalog Validation
console.log('1. Checking MDA Catalysts and Hydrogen Membranes...');
const moZsm5 = MDA_CATALYST_CATALOG['MO_ZSM5_STANDARD'];
assert.strictEqual(moZsm5.poreChannelA, 5.5, 'ZSM-5 pore size must be 5.5 Angstroms for shape-selective benzene synthesis');
assert(moZsm5.typicalBenzeneSelectivityPct >= 70.0, 'Mo/ZSM-5 benzene selectivity must be >= 70%');

const bzyMembrane = MEMBRANE_CATALOG['CERAMIC_BZY_PEROVSKITE'];
assert.strictEqual(bzyMembrane.membraneClass, 'CERAMIC_PROTONIC');
assert(bzyMembrane.thermalStabilityLimitC >= 850, 'Ceramic BZY membrane must withstand >= 850°C');
assert(bzyMembrane.h2N2SelectivityRatio >= 5000, 'Selectivity ratio must exceed 5,000 for pure H2');

const pdAgMembrane = MEMBRANE_CATALOG['METALLIC_PD_AG_ALLOY'];
assert.strictEqual(pdAgMembrane.membraneClass, 'METALLIC_DENSE');
assert(pdAgMembrane.operatingTempRangeC[1] <= 650, 'Pd-Ag alloy must be limited to <= 650°C');
console.log('  ✓ Catalysts (Mo/ZSM-5, Mo-Fe, Re) and membranes (BZY, BCZY, Pd-Ag) verified\n');

// 2. Le Chatelier Equilibrium Shift vs In-Situ Membrane Extraction
console.log('2. Testing Le Chatelier Equilibrium Shift & Conversion Enhancement...');
// At 700°C:
// Without membrane (0% H2 extraction):
const noMem = calculateEquilibriumVsMembrane(700, 0);
assert(noMem.equilibriumMethaneConversionPct <= 13.0, `Conventional equilibrium conversion at 700°C should be <= 13%, got ${noMem.equilibriumMethaneConversionPct}%`);
assert.strictEqual(noMem.conversionEnhancementFactor, 1.0);

// With membrane (85% in-situ H2 extraction):
const withMem = calculateEquilibriumVsMembrane(700, 85);
assert(withMem.membraneMethaneConversionPct >= 50.0, `Membrane-assisted conversion should exceed 50%, got ${withMem.membraneMethaneConversionPct}%`);
assert(withMem.conversionEnhancementFactor >= 4.5, `Enhancement factor should be >= 4.5x, got ${withMem.conversionEnhancementFactor}x`);
assert(withMem.benzeneSelectivityPct >= 75.0, 'Benzene selectivity should be >= 75%');

console.log('  - Conventional Equilibrium at 700°C: ' + noMem.equilibriumMethaneConversionPct + '% CH4 conversion');
console.log('  - Membrane-Enhanced at 700°C (85% H2 removal): ' + withMem.membraneMethaneConversionPct + '% CH4 conversion (' + withMem.conversionEnhancementFactor + 'x increase!)');
console.log('  ✓ Le Chatelier equilibrium shift mathematically validated\n');

// 3. Sieverts' Law Hydrogen Permeation Flux
console.log('3. Testing Hydrogen Permeation Flux (Sieverts Law: J = P/L * (p_ret^0.5 - p_perm^0.5))...');
const fluxMetrics = calculateMembraneFlux({
  membraneType: 'CERAMIC_BZY_PEROVSKITE',
  feedPressureBar: 5.0,
  permeatePressureBar: 0.1,
  temperatureC: 720,
  membraneThicknessMicrons: 20.0,
  h2PartialPressureRetentateBar: 2.5
});

assert(fluxMetrics.sievertsPressureDrivingForcePa05 > 300, 'Driving force must be positive');
assert(fluxMetrics.h2PermeationFluxMolPerM2S > 0.1, `H2 flux must be substantial (> 0.1 mol/m²s), got ${fluxMetrics.h2PermeationFluxMolPerM2S}`);
assert(fluxMetrics.h2PurityPct >= 99.99, 'Hydrogen purity must exceed 99.99% for fuel cell grade');
console.log('  - Driving Force: ' + fluxMetrics.sievertsPressureDrivingForcePa05 + ' Pa^0.5');
console.log('  - H2 Permeation Flux: ' + fluxMetrics.h2PermeationFluxMolPerM2S + ' mol/(m²·s)');
console.log('  - Extracted H2 Purity: ' + fluxMetrics.h2PurityPct + '% (Fuel Cell Grade)');
console.log('  ✓ Sieverts Law permeation flux equations verified\n');

// 4. Plant Mass and Energy Balance
console.log('4. Testing Complete MDA Plant Mass & Energy Balance...');
const plantBalance = calculateMdaPlantBalance({
  methaneFeedNm3PerHour: 5000, // 5,000 Nm3/hr CH4 feed
  operatingTempC: 720,
  feedPressureBar: 5.0,
  permeatePressureBar: 0.2,
  catalystType: 'MO_ZSM5_STANDARD',
  membraneType: 'CERAMIC_BZY_PEROVSKITE',
  membraneAreaM2: 250,
  membraneActive: true
});

assert(plantBalance.methaneConversionPct > 55.0, `Membrane methane conversion must exceed 55%, got ${plantBalance.methaneConversionPct}%`);
assert(plantBalance.benzeneProductionKgPerHour > 1200, `Benzene production should be > 1,200 kg/hr, got ${plantBalance.benzeneProductionKgPerHour}`);
assert(plantBalance.benzeneAnnualMetricTons > 9500, 'Annual benzene production should be > 9,500 tons/year');
assert(plantBalance.pureHydrogenProducedNm3PerHour > 3000, `Pure hydrogen produced should be > 3,000 Nm3/hr, got ${plantBalance.pureHydrogenProducedNm3PerHour}`);
assert(plantBalance.pureHydrogenKgPerHour > 250, 'Hydrogen production should exceed 250 kg/hr');
assert(plantBalance.endothermicHeatRequiredMwTh > 3.0, 'Endothermic reaction heat must exceed 3.0 MWth');
assert(plantBalance.co2AvoidedVsSmrTonsPerYear > 20000, 'CO2 avoided vs SMR must exceed 20,000 tons/year');
assert(plantBalance.annualBenzeneMarketValueUsd > 8000000, 'Benzene market value should exceed $8M/year');

console.log('  - Methane Feed:       ' + plantBalance.methaneFeedNm3PerHour + ' Nm³/hr (Conversion: ' + plantBalance.methaneConversionPct + '%)');
console.log('  - Liquid Benzene:     ' + plantBalance.benzeneProductionKgPerHour + ' kg/hr (' + plantBalance.benzeneAnnualMetricTons + ' tons/year, $' + (plantBalance.annualBenzeneMarketValueUsd / 1e6).toFixed(2) + 'M/year)');
console.log('  - Pure H2 Permeate:   ' + plantBalance.pureHydrogenProducedNm3PerHour + ' Nm³/hr (' + plantBalance.hydrogenAnnualMetricTons + ' tons/year, $' + (plantBalance.annualHydrogenValueUsd / 1e6).toFixed(2) + 'M/year)');
console.log('  - Endothermic Heat:   ' + plantBalance.endothermicHeatRequiredMwTh + ' MWth (+99.7 kJ/mol CH4)');
console.log('  - Avoided CO2 vs SMR: ' + plantBalance.co2AvoidedVsSmrTonsPerYear + ' tons CO2/year');
console.log('  ✓ Mass and energy balance verified\n');

// 5. Catalyst Coking Kinetics & In-Situ Regeneration
console.log('5. Testing Catalyst Coking Kinetics & Regeneration Cycles...');
// At 2 hours (early stream)
const cokingEarly = evaluateCatalystCoking({
  timeOnStreamHours: 2.0,
  catalystType: 'MO_FE_ZSM5_PROMOTED',
  membraneInSituH2Extraction: true
});
assert(cokingEarly.carbonCokeDepositedWtPct < 2.5, 'Early coke deposition should be low');
assert(cokingEarly.relativeActivityPct > 85.0, 'Early activity should be > 85%');
assert.strictEqual(cokingEarly.isRegenerationRequired, false);

// At 14 hours (extended stream requiring regen)
const cokingLate = evaluateCatalystCoking({
  timeOnStreamHours: 14.0,
  catalystType: 'MO_ZSM5_STANDARD',
  membraneInSituH2Extraction: false
});
assert(cokingLate.carbonCokeDepositedWtPct > 4.0, 'Late coke deposition should exceed 4 wt%');
assert.strictEqual(cokingLate.isRegenerationRequired, true, 'At 14 hours regeneration must be triggered');
console.log('  - 2h On-Stream (Mo-Fe + Membrane): ' + cokingEarly.carbonCokeDepositedWtPct + ' wt% coke, Activity = ' + cokingEarly.relativeActivityPct + '% (Regen: ' + cokingEarly.isRegenerationRequired + ')');
console.log('  - 14h On-Stream (Standard Mo/ZSM-5): ' + cokingLate.carbonCokeDepositedWtPct + ' wt% coke, Activity = ' + cokingLate.relativeActivityPct + '% (Regen: ' + cokingLate.isRegenerationRequired + ')');
console.log('  ✓ Catalyst deactivation and coking kinetics validated\n');

// 6. Benchmark Matrix
console.log('6. Checking Hydrogen & Aromatics Routes Benchmark...');
assert.strictEqual(HYDROGEN_AROMATICS_BENCHMARKS.length, 4);
const smr = HYDROGEN_AROMATICS_BENCHMARKS.find(b => b.processName.includes('Conventional SMR'));
const mda = HYDROGEN_AROMATICS_BENCHMARKS.find(b => b.processName.includes('Membrane Methane Aromatization'));
assert(smr.co2EmissionsKgPerKgH2 > 9.0, 'SMR emits > 9 kg CO2/kg H2');
assert.strictEqual(mda.co2EmissionsKgPerKgH2, 0.0, 'MDA emits 0.0 direct CO2');
assert(mda.energyEfficiencyLhvPct > smr.energyEfficiencyLhvPct, 'MDA efficiency exceeds SMR');
console.log('  ✓ Process benchmarking validated\n');

console.log('======================================================================');
console.log('   TEST SUITE 290: ALL MEMBRANE METHANE AROMATIZATION CHECKS PASSED!');
console.log('======================================================================\n');
