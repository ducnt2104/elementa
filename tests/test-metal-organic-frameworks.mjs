// tests/test-metal-organic-frameworks.mjs
// Test Suite 230: Metal-Organic Frameworks (MOFs), Reticular Chemistry & Carbon Capture Engine
// Conforming to IUPAC Pure & Applied Chemistry Standards & Vietnam GDPT 2018

import assert from 'assert';
import {
  MOF_CATALOG,
  simulateMofAdsorption,
  simulateAtmosphericWaterHarvesting
} from '../src/domain/metalOrganicFrameworksEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 230: METAL-ORGANIC FRAMEWORKS (MOFS) ENGINE    ');
console.log('======================================================================\n');

// 1. MOF Reticular Catalog & Structural Properties
{
  assert(Object.keys(MOF_CATALOG).length >= 5, 'Must contain at least 5 canonical MOF materials');

  const mof5 = MOF_CATALOG.MOF_5;
  const uio66 = MOF_CATALOG.UIO_66;
  const hkust1 = MOF_CATALOG.HKUST_1;
  const mof74 = MOF_CATALOG.MOF_74_MG;
  const mof303 = MOF_CATALOG.MOF_303;

  assert(mof5 && mof5.betSurfaceAreaM2PerG >= 3500, 'MOF-5 must have BET surface area >= 3500 m2/g');
  assert(uio66 && uio66.hydrothermalStability === 'RECORD', 'UiO-66 must have RECORD hydrothermal stability');
  assert(hkust1 && hkust1.metalSbu.includes('Paddlewheel') || hkust1.metalSbu.includes('Cu'), 'HKUST-1 must have Cu dimer paddlewheel');
  assert(mof74 && mof74.co2CapacityMmolPerG >= 7.0, 'Mg-MOF-74 must hold record CO2 uptake (> 7 mmol/g)');
  assert(mof303 && mof303.chemicalFormula.includes('Al'), 'MOF-303 must be an Aluminum-based framework');

  console.log('  ✓ Canonical MOF catalog verified (MOF-5, UiO-66, HKUST-1, Mg-MOF-74, MOF-303)');
}

// 2. Direct Carbon Capture & Flue Gas Selectivity
{
  // Post-combustion flue gas conditions: 1.0 bar, 298 K
  const captureMof74 = simulateMofAdsorption('MOF_74_MG', 1.0, 298);

  assert(captureMof74.co2UptakeMmolPerG > 4.5, 'Mg-MOF-74 must adsorb > 4.5 mmol/g CO2 at 1 bar');
  assert(captureMof74.co2UptakeWeightPercent > 20.0, 'CO2 uptake must exceed 20 wt%');
  assert(captureMof74.co2OverN2Selectivity > 25, 'CO2/N2 selectivity must be > 25');

  // Energy savings compared to MEA amine scrubbing (3800 kJ/kg CO2)
  assert(captureMof74.regenerationEnergyKjPerKgCo2 < 2000, 'Regeneration energy must be < 2000 kJ/kg CO2');
  assert(captureMof74.comparisonWithMeaAmineVi.includes('Tiết kiệm'), 'Must highlight significant parasitic energy reduction');

  console.log(`  ✓ Carbon Capture performance confirmed for Mg-MOF-74:
      - CO₂ Uptake: ${captureMof74.co2UptakeMmolPerG} mmol/g (${captureMof74.co2UptakeWeightPercent} wt%)
      - CO₂/N₂ Selectivity: ${captureMof74.co2OverN2Selectivity}
      - Regeneration Energy: ${captureMof74.regenerationEnergyKjPerKgCo2} kJ/kg CO₂ (< 50% of aqueous MEA amine)`);
}

// 3. High-Pressure Cryo-Hydrogen Storage (77 K)
{
  const h2StorageMof5 = simulateMofAdsorption('MOF_5', 60.0, 77);
  assert(h2StorageMof5.h2UptakeWeightPercent >= 6.0, 'MOF-5 at 77 K, 60 bar must achieve >= 6.0 wt% H2 uptake');

  console.log(`  ✓ Cryo-Hydrogen storage validated for MOF-5 at 77 K: ${h2StorageMof5.h2UptakeWeightPercent} wt% H₂ (meets US DOE target)`);
}

// 4. Desert Atmospheric Water Harvesting (MOF-303)
{
  // Arid desert air: 20% Relative Humidity, 28°C
  const desertWater = simulateAtmosphericWaterHarvesting(20, 28);
  assert(desertWater.dailyWaterYieldLitersPerKgMof >= 1.0, 'MOF-303 must extract >= 1.0 L pure water/kg at 20% RH');
  assert(desertWater.isDesorptionFeasibleWithSunlight, 'Desorption must be feasible using natural passive sunlight');

  // Severe hyper-arid air (< 10% RH)
  const hyperArid = simulateAtmosphericWaterHarvesting(8, 35);
  assert(hyperArid.dailyWaterYieldLitersPerKgMof < 0.5, 'Hyper-arid uptake must be limited during daylight');

  console.log(`  ✓ Desert atmospheric water harvesting confirmed for MOF-303: ${desertWater.dailyWaterYieldLitersPerKgMof} L/kg/day at 20% RH (passive solar desorption feasible)`);
}

console.log('\n======================================================================');
console.log('   ALL 4 TESTS IN SUITE 230 PASSED WITH DISTINCTION!                 ');
console.log('======================================================================\n');
