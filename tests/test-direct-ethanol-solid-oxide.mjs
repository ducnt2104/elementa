// tests/test-direct-ethanol-solid-oxide.mjs
// Test Suite 350: Direct Ethanol Solid Oxide Fuel Cell (DE-SOFC) Carbon-Neutral Biofuel Co-Generation
import assert from 'assert';
import {
  DE_SOFC_ELECTROLYTES,
  DE_SOFC_ANODES,
  calculateEthanolReformingEquilibrium,
  calculateElectrolyteASR,
  generateDESOFCPolarizationCurve,
  calculateDESOFCOperatingPerformance,
  sizeRuralAgriculturalMicrogrid
} from '../src/domain/directEthanolSolidOxideEngine.ts';

console.log('🧪 Running Test Suite 350: Direct Ethanol Solid Oxide Fuel Cell (DE-SOFC) Engine...');

// 1. Verifying Electrolyte and Coking-Resistant Anode Catalog
console.log('  1. Verifying Electrolyte and Coking-Resistant Anode Catalog...');
assert.ok(DE_SOFC_ELECTROLYTES.BZCY_PROTONIC, 'BZCY protonic electrolyte must exist');
assert.strictEqual(DE_SOFC_ELECTROLYTES.BZCY_PROTONIC.chargeCarrier, 'H+', 'BZCY must conduct protons');
assert.strictEqual(DE_SOFC_ELECTROLYTES.BZCY_PROTONIC.waterFormationSide, 'CATHODE', 'BZCY must form water at cathode');

assert.ok(DE_SOFC_ANODES.SFMO_DOUBLE_PEROVSKITE, 'SFMO double perovskite anode must exist');
assert.strictEqual(DE_SOFC_ANODES.SFMO_DOUBLE_PEROVSKITE.cokingResistanceRating, 'ULTRA_HIGH');
assert.ok(DE_SOFC_ANODES.SFMO_DOUBLE_PEROVSKITE.minSafeSteamCarbonRatio <= 1.0, 'SFMO must tolerate low S/C <= 1.0');
assert.ok(DE_SOFC_ANODES.STANDARD_NI_YSZ.minSafeSteamCarbonRatio >= 3.0, 'Standard Ni-YSZ requires S/C >= 3.0');
console.log('  ✓ Catalogs verified: BZCY Protonic & SFMO Double Perovskite confirmed.');

// 2. Verifying Bio-Ethanol Reforming Equilibrium & Coking Resistance
console.log('  2. Verifying Bio-Ethanol Reforming Equilibrium & Coking Resistance...');
const sfmoReforming = calculateEthanolReformingEquilibrium({
  temperatureC: 650,
  steamToCarbonRatio: 1.5,
  anodeType: 'SFMO_DOUBLE_PEROVSKITE',
  ethanolFeedLph: 5.0
});

assert.ok(sfmoReforming.equilibriumH2Percent > 55, `H2 percent (${sfmoReforming.equilibriumH2Percent.toFixed(1)}%) must exceed 55%`);
assert.ok(sfmoReforming.cokingResistancePercent > 80, `SFMO coking resistance (${sfmoReforming.cokingResistancePercent.toFixed(1)}%) must be > 80%`);
assert.strictEqual(sfmoReforming.carbonDepositionRisk, 'VERY_LOW', 'SFMO at S/C=1.5 should have VERY_LOW carbon deposition risk');
assert.ok(sfmoReforming.reformingEnthalpyKJPerMolEthanol > 150, 'Endothermic reforming enthalpy should be > 150 kJ/mol');

// Compare with Standard Ni-YSZ at low S/C
const niReformingLowSC = calculateEthanolReformingEquilibrium({
  temperatureC: 650,
  steamToCarbonRatio: 1.0,
  anodeType: 'STANDARD_NI_YSZ',
  ethanolFeedLph: 5.0
});
assert.ok(niReformingLowSC.cokingResistancePercent < 40, `Standard Ni-YSZ at S/C=1.0 should have low resistance (${niReformingLowSC.cokingResistancePercent.toFixed(1)}%)`);
assert.ok(niReformingLowSC.carbonDepositionRisk === 'CRITICAL' || niReformingLowSC.carbonDepositionRisk === 'HIGH', 'Standard Ni must flag HIGH or CRITICAL coking risk at S/C=1.0');
console.log(`  ✓ Reforming: H2 = ${sfmoReforming.equilibriumH2Percent.toFixed(1)}%, CO = ${sfmoReforming.equilibriumCOPercent.toFixed(1)}%, SFMO coking resistance = ${sfmoReforming.cokingResistancePercent.toFixed(1)}% vs Standard Ni = ${niReformingLowSC.cokingResistancePercent.toFixed(1)}%.`);

// 3. Verifying Electrochemical Polarization and Ohmic Resistance
console.log('  3. Verifying Electrochemical Polarization and Ohmic Resistance...');
const asrBzcy = calculateElectrolyteASR('BZCY_PROTONIC', 650, 15);
assert.ok(asrBzcy > 0.03 && asrBzcy < 0.25, `BZCY ASR (${asrBzcy.toFixed(3)} Ohm*cm2) must be in 0.03 - 0.25 Ohm*cm2`);

const polCurve = generateDESOFCPolarizationCurve(
  {
    cellCount: 60,
    cellActiveAreaCm2: 100,
    electrolyteType: 'BZCY_PROTONIC',
    anodeType: 'SFMO_DOUBLE_PEROVSKITE'
  },
  {
    temperatureC: 650,
    steamToCarbonRatio: 1.5,
    anodeType: 'SFMO_DOUBLE_PEROVSKITE',
    ethanolFeedLph: 5.0
  },
  20
);

assert.strictEqual(polCurve.length, 21, 'Must return 21 polarization points');
const ocv = polCurve[0].cellVoltageV;
assert.ok(ocv > 1.00 && ocv < 1.15, `OCV (${ocv.toFixed(3)} V) must be between 1.00 and 1.15 V`);

const midPoint = polCurve.find(p => p.currentDensityAcm2 >= 0.7 && p.currentDensityAcm2 <= 0.9);
assert.ok(midPoint, 'Mid current density point must exist');
assert.ok(midPoint.cellVoltageV > 0.65 && midPoint.cellVoltageV < 0.90, `Cell voltage at ~0.8 A/cm2 (${midPoint.cellVoltageV.toFixed(3)} V) must be 0.65 - 0.90 V`);
assert.ok(midPoint.powerDensityWcm2 > 0.45, `Power density (${midPoint.powerDensityWcm2.toFixed(3)} W/cm2) must exceed 0.45 W/cm2`);
console.log(`  ✓ Polarization: OCV = ${ocv.toFixed(3)} V, V_cell(0.8 A/cm2) = ${midPoint.cellVoltageV.toFixed(3)} V, P_density = ${midPoint.powerDensityWcm2.toFixed(3)} W/cm2.`);

// 4. Verifying Combined Heat & Power (CHP) and Rural Agricultural Microgrid Sizing
console.log('  4. Verifying Combined Heat & Power (CHP) and Rural Agricultural Microgrid Sizing...');
const stackPerf = calculateDESOFCOperatingPerformance(
  {
    cellCount: 60,
    cellActiveAreaCm2: 120,
    electrolyteType: 'BZCY_PROTONIC',
    anodeType: 'SFMO_DOUBLE_PEROVSKITE'
  },
  {
    temperatureC: 650,
    steamToCarbonRatio: 1.5,
    anodeType: 'SFMO_DOUBLE_PEROVSKITE',
    ethanolFeedLph: 5.0
  },
  0.8
);

assert.ok(stackPerf.stackElectricPowerKW > 3.0 && stackPerf.stackElectricPowerKW < 10.0, `Stack electric power (${stackPerf.stackElectricPowerKW.toFixed(2)} kW) must be 3 - 10 kW`);
assert.ok(stackPerf.chpTotalEfficiencyPercent > 80.0, `CHP total efficiency (${stackPerf.chpTotalEfficiencyPercent.toFixed(1)}%) must exceed 80%`);
assert.strictEqual(stackPerf.netLifecycleCO2EmissionsKgPerYear, 0.0, 'Net lifecycle emissions must be 0.0 kg (closed biomass cycle)');
assert.ok(stackPerf.avoidedCO2EmissionsTonsPerYear > 20.0, `Avoided emissions (${stackPerf.avoidedCO2EmissionsTonsPerYear.toFixed(1)} tons) must exceed 20 tons/year`);

const microgrid = sizeRuralAgriculturalMicrogrid(25, 'BZCY_PROTONIC', 'SFMO_DOUBLE_PEROVSKITE');
assert.ok(microgrid.stackCount >= 3 && microgrid.stackCount <= 8, `Stack count (${microgrid.stackCount}) for 25 kW must be 3-8`);
assert.ok(microgrid.dailyElectricOutputKWh >= 500, `Daily electric output (${microgrid.dailyElectricOutputKWh.toFixed(0)} kWh) must exceed 500 kWh`);
assert.ok(microgrid.annualAvoidedDieselCostUSD > 50000, `Annual avoided diesel cost ($${microgrid.annualAvoidedDieselCostUSD.toFixed(0)}) must exceed $50,000`);
assert.ok(microgrid.agriculturalWasteFeedstockTonsPerYear > 40, `Feedstock requirement (${microgrid.agriculturalWasteFeedstockTonsPerYear.toFixed(1)} tons/year) must be > 40 tons`);
console.log(`  ✓ Microgrid 25 kW Sizing: Stacks = ${microgrid.stackCount} (${microgrid.totalCells} cells), Daily Ethanol = ${microgrid.dailyBioEthanolConsumptionLiters.toFixed(1)} L, Annual Diesel Saved = $${microgrid.annualAvoidedDieselCostUSD.toFixed(0)}, Avoided CO2 = ${microgrid.annualAvoidedCO2Tons.toFixed(1)} tons/yr.`);

console.log('🎉 Test Suite 350 Passed (4/4 assertion groups clean)!');
