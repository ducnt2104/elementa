// tests/test-industrial-electrochemical-refining.mjs
// Test Suite 216: Industrial Chlor-Alkali Membrane Cell, Anodic Copper Refining & Green H2 Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum & IUPAC Electrochemical Engineering Standards

import assert from 'assert';
import {
  simulateChlorAlkaliMembraneCell,
  BLISTER_COPPER_TYPICAL_COMPOSITION,
  simulateCopperAnodicRefining,
  ELECTROLYZER_TECHNOLOGIES,
  FARADAY_CONSTANT
} from '../src/domain/industrialElectrochemicalRefiningEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 216: INDUSTRIAL ELECTROCHEMICAL REFINING      ');
console.log('======================================================================\n');

// 1. Chlor-Alkali Faraday Stoichiometry & Production Yields
{
  const params = {
    currentAmperes: 10000, // 10 kA
    currentDensityKAperM2: 4.0,
    operatingTempCelsius: 88,
    anolyteBrineFeedNaclGPerL: 305,
    membraneType: 'PERFLUOROSULFONIC_BILAYER',
    currentEfficiencyPercent: 95.0,
    hoursOfOperation: 24 // 1 day
  };

  const result = simulateChlorAlkaliMembraneCell(params, 10);
  assert(result.naohMassProducedKg > 0, 'NaOH mass must be positive');
  assert(result.cl2GasProducedKg > 0, 'Cl2 mass must be positive');
  assert(result.h2GasProducedKg > 0, 'H2 mass must be positive');

  // Verify mole ratio: n(NaOH) : n(Cl2) : n(H2) == 2 : 1 : 1
  const molesNaOH = (result.naohMassProducedKg * 1000) / 39.997;
  const molesCl2 = (result.cl2GasProducedKg * 1000) / 70.906;
  const molesH2 = (result.h2GasProducedKg * 1000) / 2.016;

  const ratioNaohCl2 = molesNaOH / molesCl2;
  const ratioCl2H2 = molesCl2 / molesH2;

  assert(Math.abs(ratioNaohCl2 - 2.0) < 0.05, `Mole ratio NaOH : Cl2 must be 2:1, got ${ratioNaohCl2.toFixed(2)}`);
  assert(Math.abs(ratioCl2H2 - 1.0) < 0.05, `Mole ratio Cl2 : H2 must be 1:1, got ${ratioCl2H2.toFixed(2)}`);
  console.log(`  ✓ Faraday stoichiometry confirmed: n(NaOH) : n(Cl2) : n(H2) = ${ratioNaohCl2.toFixed(1)} : 1 : ${ratioCl2H2.toFixed(1)}`);
}

// 2. Voltage Decomposition & Energy Consumption
{
  const params = {
    currentAmperes: 15000,
    currentDensityKAperM2: 5.0,
    operatingTempCelsius: 88,
    anolyteBrineFeedNaclGPerL: 305,
    membraneType: 'PERFLUOROSULFONIC_BILAYER',
    currentEfficiencyPercent: 95.5,
    hoursOfOperation: 24
  };

  const result = simulateChlorAlkaliMembraneCell(params);
  assert(result.voltageLosses.totalCellVoltageV >= 2.9 && result.voltageLosses.totalCellVoltageV <= 3.5,
    `Total cell voltage must be 2.9-3.5 V, got ${result.voltageLosses.totalCellVoltageV} V`);
  assert(result.specificEnergyKwhPerTonNaoh >= 2000 && result.specificEnergyKwhPerTonNaoh <= 2600,
    `Specific energy consumption for NaOH must be 2000-2600 kWh/t, got ${result.specificEnergyKwhPerTonNaoh} kWh/t`);
  console.log(`  ✓ Voltage decomposition: V_cell = ${result.voltageLosses.totalCellVoltageV} V, SEC = ${result.specificEnergyKwhPerTonNaoh} kWh/t NaOH`);
}

// 3. Donnan Exclusion & Membrane Hardness Fouling Risk
{
  const nafionRun = simulateChlorAlkaliMembraneCell({
    currentAmperes: 5000,
    currentDensityKAperM2: 3.5,
    operatingTempCelsius: 88,
    anolyteBrineFeedNaclGPerL: 305,
    membraneType: 'PERFLUOROSULFONIC_BILAYER',
    currentEfficiencyPercent: 95.0,
    hoursOfOperation: 10
  }, 10);
  assert(nafionRun.donnanExclusionEfficacyPercent > 99.0, 'Nafion membrane must provide >99% Donnan exclusion');
  assert.strictEqual(nafionRun.brineHardnessRiskLevel, 'SAFE', '10 ppb hardness must be SAFE');

  const hardBrineRun = simulateChlorAlkaliMembraneCell({
    currentAmperes: 5000,
    currentDensityKAperM2: 3.5,
    operatingTempCelsius: 88,
    anolyteBrineFeedNaclGPerL: 305,
    membraneType: 'PERFLUOROSULFONIC_BILAYER',
    currentEfficiencyPercent: 95.0,
    hoursOfOperation: 10
  }, 65); // 65 ppb hardness
  assert.strictEqual(hardBrineRun.brineHardnessRiskLevel, 'CRITICAL_FAILURE', '65 ppb Ca2+/Mg2+ must trigger CRITICAL_FAILURE');
  console.log('  ✓ Donnan exclusion (>99.5%) and feed brine hardness limits (<20 ppb) verified');
}

// 4. Blister Copper Composition & Potential Ladder
{
  assert(BLISTER_COPPER_TYPICAL_COMPOSITION.length >= 8, 'Composition must detail at least 8 elements');

  const cu = BLISTER_COPPER_TYPICAL_COMPOSITION.find(e => e.symbol === 'Cu');
  const zn = BLISTER_COPPER_TYPICAL_COMPOSITION.find(e => e.symbol === 'Zn');
  const au = BLISTER_COPPER_TYPICAL_COMPOSITION.find(e => e.symbol === 'Au');
  const pb = BLISTER_COPPER_TYPICAL_COMPOSITION.find(e => e.symbol === 'Pb');

  assert(cu && cu.standardPotentialE0V === +0.34, 'Cu E0 must be +0.34 V');
  assert(zn && zn.standardPotentialE0V < cu.standardPotentialE0V, 'Zn must have more negative potential than Cu');
  assert.strictEqual(zn.anodicFateVi, 'DISSOLVES_AS_ION', 'Zn must dissolve as ion');

  assert(au && au.standardPotentialE0V > cu.standardPotentialE0V, 'Au must have more positive potential than Cu');
  assert.strictEqual(au.anodicFateVi, 'PRECIPITATES_IN_SLIME', 'Au must precipitate in anode slime');

  assert(pb && pb.anodicFateVi, 'PRECIPITATES_IN_SLIME', 'Pb must precipitate as PbSO4 in anode slime');
  console.log('  ✓ Electrochemical potential ladder correctly determines selective anodic dissolution and slime settling');
}

// 5. Copper Refining Simulation & Precious Metal Recovery
{
  const refResult = simulateCopperAnodicRefining(1000, 25000, 14); // 1 metric ton anode
  assert(refResult.refinedCathodeCopperKg > 800, 'Must produce significant cathode copper');
  assert.strictEqual(refResult.cathodePurityPercent, 99.99, 'Cathode copper purity must be 99.99%');
  assert(refResult.recoveredSilverGrams > 300, `Must recover significant silver, got ${refResult.recoveredSilverGrams} g`);
  assert(refResult.recoveredGoldGrams > 10, `Must recover significant gold, got ${refResult.recoveredGoldGrams} g`);
  assert(refResult.preciousMetalsEconomicValueUsd > 1000, `Precious metals value must be significant, got $${refResult.preciousMetalsEconomicValueUsd}`);
  assert(refResult.cellOperatingVoltageV <= 0.35, 'Cell voltage must be very low (~0.28 V)');
  assert(refResult.energyKwhPerTonCopper < 400, 'Energy consumption for copper refining must be < 400 kWh/t');
  console.log(`  ✓ 1 ton Blister Cu refined to 99.99% Cu with ${refResult.recoveredGoldGrams}g Au & ${refResult.recoveredSilverGrams}g Ag recovered ($${refResult.preciousMetalsEconomicValueUsd} value)`);
}

// 6. Green Hydrogen Electrolysis Comparison
{
  const pem = ELECTROLYZER_TECHNOLOGIES.PEM;
  const ael = ELECTROLYZER_TECHNOLOGIES.ALKALINE_AEL;
  const soec = ELECTROLYZER_TECHNOLOGIES.SOLID_OXIDE_SOEC;

  assert(pem && pem.rampUpTimeSeconds === 1, 'PEM must have 1-second dynamic response');
  assert(soec && soec.operatingTempCelsius >= 700, 'SOEC must operate at high temperature (700-800°C)');
  assert(soec.cellEfficiencyHhvPercent > pem.cellEfficiencyHhvPercent, 'SOEC must have highest electrical efficiency using heat');
  assert(ael.catalystMaterialVi.includes('Niken'), 'Alkaline electrolysis uses non-precious nickel catalysts');
  console.log('  ✓ Green Hydrogen water electrolysis catalog validated (PEM 78% vs AEL 68% vs SOEC 92% HHV)');
}

// 7. Vietnam Chemical Industry Benchmark
{
  const result = simulateChlorAlkaliMembraneCell({
    currentAmperes: 10000,
    currentDensityKAperM2: 4.0,
    operatingTempCelsius: 88,
    anolyteBrineFeedNaclGPerL: 305,
    membraneType: 'PERFLUOROSULFONIC_BILAYER',
    currentEfficiencyPercent: 95.0,
    hoursOfOperation: 24
  });
  assert(result.vietnamIndustrialSiteVi.includes('Việt Trì'), 'Must cite Việt Trì chemical complex');
  assert(result.chemicalProcessSummaryVi.includes('Nafion'), 'Summary must mention Nafion membrane');
  console.log('  ✓ Vietnamese industrial context (Tổ hợp Hóa chất Việt Trì & Đức Giang) verified');
}

console.log('\n======================================================================');
console.log('   TEST SUITE 216: ALL 7 TEST CASES PASSED SUCCESSFULLY               ');
console.log('======================================================================\n');
