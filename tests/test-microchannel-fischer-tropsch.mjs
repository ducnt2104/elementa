// tests/test-microchannel-fischer-tropsch.mjs
// ELEMENTA TEST SUITE 288: Microchannel Fischer-Tropsch Catalytic Synthesis & Sustainable Aviation Fuel (SAF) Audit
import assert from 'assert';
import {
  FT_CATALYST_CATALOG,
  REACTOR_ARCHITECTURE_CATALOG,
  calculateAsfDistribution,
  calculateMicrochannelHeatTransfer,
  calculatePlantMassEnergyBalance,
  evaluateAstmD7566Compliance,
  AVIATION_FUEL_BENCHMARKS
} from '../src/domain/microchannelFischerTropschEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 288: MICROCHANNEL FISCHER-TROPSCH & SAF AUDIT');
console.log('======================================================================\n');

// 1. Catalyst & Reactor Catalog Validation
console.log('1. Checking Fischer-Tropsch Catalyst & Reactor Catalogs...');
const cobaltCat = FT_CATALYST_CATALOG['COBALT_RE_AL2O3'];
assert.strictEqual(cobaltCat.id, 'COBALT_RE_AL2O3');
assert.strictEqual(cobaltCat.waterGasShiftActivity, 'NEGLIGIBLE', 'Cobalt must have negligible WGS activity to preserve green H2');
assert(cobaltCat.typicalAlpha >= 0.88, 'Cobalt typical alpha must be high (>= 0.88)');

const ironCat = FT_CATALYST_CATALOG['IRON_CU_K_SIO2'];
assert.strictEqual(ironCat.waterGasShiftActivity, 'HIGH', 'Iron catalyst must have high WGS for bio-syngas');

const microReactor = REACTOR_ARCHITECTURE_CATALOG['MICROCHANNEL_MODULAR'];
assert.strictEqual(microReactor.hydraulicDiameterMm, 1.5, 'Microchannel hydraulic diameter must be millimeter scale');
assert(microReactor.heatTransferCoefficientWPerM2K >= 5000, 'Microchannel U must exceed 5,000 W/(m²K)');
assert.strictEqual(microReactor.hotspotRisk, 'NEGLIGIBLE');
assert(microReactor.skidFootprintReductionPct > 80, 'Skid footprint reduction must be > 80%');

const fixedBedReactor = REACTOR_ARCHITECTURE_CATALOG['MULTI_TUBULAR_FIXED_BED'];
assert.strictEqual(fixedBedReactor.hotspotRisk, 'CRITICAL', 'Multi-tubular fixed bed has critical hot-spot risk');
console.log('  ✓ Catalysts (Co, Fe, Ru) and reactor architectures verified\n');

// 2. Anderson-Schulz-Flory (ASF) Polymerization Distribution
console.log('2. Testing Anderson-Schulz-Flory (ASF) Chain Growth Distribution...');
// For alpha = 0.90 (typical Cobalt jet fuel condition)
const asf90 = calculateAsfDistribution(0.90);
assert(asf90.alpha === 0.90);
assert(asf90.c1MethaneSelectivityPct < 8.0, `Methane selectivity at alpha=0.90 should be low (< 8%), got ${asf90.c1MethaneSelectivityPct}%`);
assert(asf90.c9C16KeroseneSafPct > 20.0, `Jet fuel kerosene cut should be > 20%, got ${asf90.c9C16KeroseneSafPct}%`);
assert(asf90.c23PlusWaxPct > 30.0, `Heavy wax fraction should be > 30% at alpha=0.90, got ${asf90.c23PlusWaxPct}%`);
assert(asf90.totalC5PlusSelectivityPct > 80.0, `C5+ selectivity must exceed 80%, got ${asf90.totalC5PlusSelectivityPct}%`);

// Verify sum of all weight fractions approaches 100%
const totalFractionPct = asf90.fractions.reduce((acc, f) => acc + f.weightFractionPct, 0);
assert(Math.abs(totalFractionPct - 100) < 1.0, `Total ASF fractions must sum to ~100%, got ${totalFractionPct}%`);

// For low alpha = 0.70 (gasoline/LPG skewed)
const asf70 = calculateAsfDistribution(0.70);
assert(asf70.c1MethaneSelectivityPct > asf90.c1MethaneSelectivityPct, 'Lower alpha must yield higher methane fraction');
assert(asf70.c23PlusWaxPct < 5.0, 'Low alpha must yield negligible wax');
console.log('  - Alpha = 0.90 -> C1 = ' + asf90.c1MethaneSelectivityPct + '%, C9-C16 SAF = ' + asf90.c9C16KeroseneSafPct + '%, C23+ Wax = ' + asf90.c23PlusWaxPct + '%, C5+ = ' + asf90.totalC5PlusSelectivityPct + '%');
console.log('  ✓ Anderson-Schulz-Flory mathematical distribution verified\n');

// 3. Reactor Heat Transfer & Thermal Intensification
console.log('3. Testing Reactor Microchannel Heat Transfer & Hot-Spot Prevention...');
const microHt = calculateMicrochannelHeatTransfer('MICROCHANNEL_MODULAR', 1.2);
assert(microHt.heatTransferCoefficientWPerM2K > 7000, 'Heat transfer coefficient must be > 7,000 W/m²K');
assert(microHt.radialDeltaTMaxDegC < 2.0, `Radial delta T must be < 2°C, got ${microHt.radialDeltaTMaxDegC}°C`);
assert.strictEqual(microHt.runawayHotspotRisk, 'NEGLIGIBLE');

const fixedBedHt = calculateMicrochannelHeatTransfer('MULTI_TUBULAR_FIXED_BED');
assert(fixedBedHt.heatTransferCoefficientWPerM2K < 1000);
assert(fixedBedHt.radialDeltaTMaxDegC > 10.0, 'Fixed bed must have large radial thermal gradient');
assert.strictEqual(fixedBedHt.runawayHotspotRisk, 'CRITICAL');
console.log('  - Microchannel: U = ' + microHt.heatTransferCoefficientWPerM2K + ' W/(m²K), Delta T = ' + microHt.radialDeltaTMaxDegC + '°C (Risk: ' + microHt.runawayHotspotRisk + ')');
console.log('  - Fixed Bed:    U = ' + fixedBedHt.heatTransferCoefficientWPerM2K + ' W/(m²K), Delta T = ' + fixedBedHt.radialDeltaTMaxDegC + '°C (Risk: ' + fixedBedHt.runawayHotspotRisk + ')');
console.log('  ✓ Process intensification & heat transfer physics verified\n');

// 4. Plant Mass & Energy Balance
console.log('4. Testing Plant Mass and Energy Balance (PtL SAF Plant)...');
const balance = calculatePlantMassEnergyBalance({
  syngasFeedNm3PerHour: 10000, // 10,000 Nm3/hr syngas feed
  h2CoRatio: 2.1,
  operatingTempC: 220,
  alpha: 0.90,
  catalystType: 'COBALT_RE_AL2O3',
  reactorType: 'MICROCHANNEL_MODULAR',
  hydrocrackingWaxToSaf: true
});

assert(balance.molarCoInletKmolPerHour > 140, 'Molar CO feed rate should be > 140 kmol/hr');
assert(balance.coConversionPct === 85.0, 'Microchannel single-pass CO conversion must be 85%');
assert(balance.syncrudeProductionKgPerHour > 1500, `Syncrude production should be > 1,500 kg/hr, got ${balance.syncrudeProductionKgPerHour}`);
assert(balance.syncrudeProductionBpd > 300, `Syncrude production should be > 300 BPD, got ${balance.syncrudeProductionBpd}`);
assert(balance.safAviationFuelProductionKgPerHour > 400, 'Direct SAF production should be > 400 kg/hr');
assert(balance.additionalSafFromWaxHydrocrackingKgPerHour > 400, 'Wax hydrocracking should contribute > 400 kg/hr additional SAF');
assert(balance.totalSafWithHydrocrackingKgPerHour > 900, 'Total SAF with hydrocracking should be > 900 kg/hr');
assert(balance.totalSafAnnualMetricTons > 7000, 'Annual SAF production should be > 7,000 metric tons/year');
assert(balance.reactionHeatGeneratedMwTh > 5.0, 'Exothermic reaction heat must exceed 5.0 MWth');
assert(balance.mediumPressureSteamGeneratedTonsPerHour > 7.0, 'Steam generation must exceed 7.0 tons/hr');
assert(balance.co2EquivalentAvoidedTonsPerYear > 20000, 'CO2 avoided should exceed 20,000 tons/year');
assert(balance.flightsPoweredPerYear > 2500, 'Should power > 2,500 domestic A321 flights/year');

console.log('  - Syngas Feed:     ' + balance.syngasFeedNm3PerHour + ' Nm³/hr (H2/CO = ' + balance.h2CoRatio + ')');
console.log('  - Syncrude:        ' + balance.syncrudeProductionKgPerHour + ' kg/hr (' + balance.syncrudeProductionBpd + ' Barrels/day)');
console.log('  - Total SAF:       ' + balance.totalSafWithHydrocrackingKgPerHour + ' kg/hr (' + balance.totalSafAnnualMetricTons + ' tons/year)');
console.log('  - Reaction Heat:   ' + balance.reactionHeatGeneratedMwTh + ' MWth (Generates ' + balance.mediumPressureSteamGeneratedTonsPerHour + ' tons/hr steam)');
console.log('  - Avoided CO2:     ' + balance.co2EquivalentAvoidedTonsPerYear + ' tons/year (Powers ' + balance.flightsPoweredPerYear + ' domestic flights)');
console.log('  ✓ Mass and energy balance equations validated\n');

// 5. ASTM D7566 Annex A2 Compliance & Aviation Fuel Benchmark
console.log('5. Testing ASTM D7566 Annex A2 Compliance & Fuel Benchmarks...');
// Compliant case: high isomerization
const safPass = evaluateAstmD7566Compliance({
  isomerizationIsoToNormalRatio: 3.8,
  greenHydrogenSource: true,
  dacCarbonSource: true
});
assert.strictEqual(safPass.isCompliant, true, 'High isomerization must pass ASTM D7566');
assert(safPass.freezingPointDegC <= -47.0, `Freezing point must be <= -47°C, got ${safPass.freezingPointDegC}°C`);
assert(safPass.ghgLifeCycleSavingsPct > 90.0, 'Green H2 + DAC CO2 must yield > 90% GHG savings');
assert.strictEqual(safPass.blendRatioMaxPct, 50.0);
assert(safPass.energyDensityMjPerKg > 43.5, 'FT-SPK energy density must be > 43.5 MJ/kg');

// Non-compliant case: insufficient isomerization
const safFail = evaluateAstmD7566Compliance({
  isomerizationIsoToNormalRatio: 1.5,
  greenHydrogenSource: false,
  dacCarbonSource: false
});
assert.strictEqual(safFail.isCompliant, false, 'Low isomerization should fail Jet A-1 freezing point');
assert(safFail.freezingPointDegC > -47.0);

// Benchmarks
assert.strictEqual(AVIATION_FUEL_BENCHMARKS.length, 4);
const fossilJet = AVIATION_FUEL_BENCHMARKS.find(b => b.fuelTypeName.includes('Conventional Jet A-1'));
const ftSpk = AVIATION_FUEL_BENCHMARKS.find(b => b.fuelTypeName.includes('FT-SPK'));
assert(ftSpk.energyDensityMjPerKg > fossilJet.energyDensityMjPerKg, 'FT-SPK must have higher energy density than Jet A-1');
assert(ftSpk.sootParticulateReductionPct >= 90.0, 'FT-SPK must reduce soot particulates by >= 90%');
console.log('  - ASTM D7566 Compliance: PASS (Freezing: ' + safPass.freezingPointDegC + '°C, Energy: ' + safPass.energyDensityMjPerKg + ' MJ/kg, GHG: -' + safPass.ghgLifeCycleSavingsPct + '%)');
console.log('  - Low Isomerization:     FAIL (Freezing: ' + safFail.freezingPointDegC + '°C > -47.0°C limit)');
console.log('  ✓ ASTM D7566 Annex A2 standards and fuel benchmark validated\n');

console.log('======================================================================');
console.log('   TEST SUITE 288: ALL MICROCHANNEL FT & SAF CHECKS PASSED!');
console.log('======================================================================\n');
