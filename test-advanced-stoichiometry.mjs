// test-advanced-stoichiometry.mjs
// Suite 39: Advanced Solution Dilution (C1*V1 = C2*V2), Two Solutions Mixing, Density Conversion & Ideal Gas Clapeyron-Mendeleev

import {
  calculateSolutionDilution,
  calculateTwoSolutionsMixing,
  convertDensityAndConcentration,
  calculateIdealGas,
  getMolarMass,
  calculateBackTitration,
  calculateReactionYield,
  calculateReactionStoichiometry
} from './src/domain/chemicalCalculator.ts';

function assert(condition, message) {
  if (!condition) {
    console.error(`  ✗ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  ✓ PASS: ${message}`);
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 39: ADVANCED STOICHIOMETRY & SOLUTION DILUTION    ');
console.log('======================================================================\n');

// --- 1. Solution Dilution Engine (C1*V1 = C2*V2) ---
console.log('--- 1. Solution Dilution Engine (C1*V1 = C2*V2) ---');
{
  // Dilute 0.1 L of 2.0 M HCl down to 0.5 M
  const res1 = calculateSolutionDilution({
    initialConcentration: 2.0,
    initialVolumeLiters: 0.1,
    targetConcentration: 0.5
  });

  assert(res1.c1 === 2.0, 'Initial concentration is 2.0 M');
  assert(res1.v1Liters === 0.1, 'Initial volume is 0.1 L (100 mL)');
  assert(res1.c2 === 0.5, 'Target concentration is 0.5 M');
  assert(res1.v2Liters === 0.4, `Final volume calculates to exactly 0.4 L (got ${res1.v2Liters} L)`);
  assert(res1.waterAddedLiters === 0.3, `Water added calculates to exactly 0.3 L (300 mL) (got ${res1.waterAddedLiters} L)`);
  assert(res1.stepByStepExplanationVI.length === 4, 'Provides 4 step-by-step pedagogical explanation steps');

  // Dilute 0.2 L of 5.0 M H2SO4 to final volume 1.0 L
  const res2 = calculateSolutionDilution({
    initialConcentration: 5.0,
    initialVolumeLiters: 0.2,
    targetVolumeLiters: 1.0
  });

  assert(res2.c2 === 1.0, `Resulting concentration calculates to 1.0 M (got ${res2.c2} M)`);
  assert(res2.waterAddedLiters === 0.8, `Water added is 0.8 L (800 mL) (got ${res2.waterAddedLiters} L)`);

  // Error case: C2 > C1 (cannot concentrate solution through pure dilution)
  let failed = false;
  try {
    calculateSolutionDilution({ initialConcentration: 1.0, initialVolumeLiters: 0.5, targetConcentration: 3.0 });
  } catch (e) {
    failed = true;
  }
  assert(failed, 'Properly rejects impossible dilution where C2 > C1');
}

// --- 2. Two Solutions Mixing Engine ---
console.log('\n--- 2. Two Solutions Mixing Engine ---');
{
  // Mix 0.2 L of 1.0 M NaOH with 0.3 L of 2.0 M NaOH
  // Expected C_mix = (1.0*0.2 + 2.0*0.3) / 0.5 = (0.2 + 0.6) / 0.5 = 1.6 M
  const mixMolarity = calculateTwoSolutionsMixing({
    c1: 1.0,
    amount1: 0.2,
    c2: 2.0,
    amount2: 0.3,
    mode: 'MOLARITY'
  });

  assert(mixMolarity.resultConcentration === 1.6, `Mixture molarity calculates to 1.6 M (got ${mixMolarity.resultConcentration} M)`);
  assert(mixMolarity.totalVolumeOrMass === 0.5, `Total volume is 0.5 L (got ${mixMolarity.totalVolumeOrMass} L)`);

  // Mix 200g of 10% NaCl with 300g of 20% NaCl
  // Expected C%_mix = (10*200 + 20*300) / 500 = (2000 + 6000) / 500 = 16.0%
  const mixMassPct = calculateTwoSolutionsMixing({
    c1: 10,
    amount1: 200,
    c2: 20,
    amount2: 300,
    mode: 'MASS_PERCENT'
  });

  assert(mixMassPct.resultConcentration === 16.0, `Mixture mass percent calculates to 16.0% (got ${mixMassPct.resultConcentration}%)`);
  assert(mixMassPct.totalVolumeOrMass === 500, `Total mass is 500 g (got ${mixMassPct.totalVolumeOrMass} g)`);
}

// --- 3. Density to Concentration Shortcut: C_M = (10 * C% * d) / M ---
console.log('\n--- 3. Density to Concentration Shortcut: C_M = (10 * C% * d) / M ---');
{
  // Concentrated H2SO4: 98% with density d = 1.84 g/mL, M = 98.079 g/mol
  // C_M = (10 * 98 * 1.84) / 98.079 ~ 18.385 M
  const h2so4Conv = convertDensityAndConcentration({
    formula: 'H2SO4',
    densityGramsPerMl: 1.84,
    massPercentageC: 98
  });

  assert(h2so4Conv.molarityCM >= 18.35 && h2so4Conv.molarityCM <= 18.42, `Concentrated H2SO4 (98%, d=1.84) ~ 18.38 M (got ${h2so4Conv.molarityCM} M)`);
  assert(h2so4Conv.molarMass >= 98.0 && h2so4Conv.molarMass <= 98.1, `Molar mass of H2SO4 is ~98.08 (got ${h2so4Conv.molarMass})`);

  // Concentrated HCl: 37% with density d = 1.19 g/mL, M = 36.46 g/mol
  // C_M = (10 * 37 * 1.19) / 36.46 ~ 12.076 M
  const hclConv = convertDensityAndConcentration({
    formula: 'HCl',
    densityGramsPerMl: 1.19,
    massPercentageC: 37
  });

  assert(hclConv.molarityCM >= 12.05 && hclConv.molarityCM <= 12.10, `Concentrated HCl (37%, d=1.19) ~ 12.08 M (got ${hclConv.molarityCM} M)`);

  // Reverse conversion: Given C_M = 12.076 M and d = 1.19 g/mL, recovers C% ~ 37%
  const hclRev = convertDensityAndConcentration({
    formula: 'HCl',
    densityGramsPerMl: 1.19,
    molarityCM: hclConv.molarityCM
  });

  assert(Math.abs(hclRev.massPercentageC - 37) < 0.1, `Reverse conversion recovers C% = 37% (got ${hclRev.massPercentageC}%)`);
}

// --- 4. Universal Ideal Gas Law: P * V = n * R * T (Clapeyron-Mendeleev) ---
console.log('\n--- 4. Universal Ideal Gas Law: P * V = n * R * T ---');
{
  // 1 mol gas at 25°C (298.15 K) and 1 atm:
  // V = (1 * 0.08206 * 298.15) / 1 ~ 24.466 L
  const gasV = calculateIdealGas({
    moles: 1.0,
    temperatureCelsius: 25,
    pressureAtm: 1.0
  });

  assert(gasV.calculatedVariable === 'V', 'Correctly identified volume V as calculated variable');
  assert(Math.abs(gasV.volumeLiters - 24.466) < 0.05, `1 mol gas at 25°C, 1 atm occupies ~24.47 L (got ${gasV.volumeLiters} L)`);
  assert(gasV.temperatureKelvin === 298.15, 'Absolute temperature is 298.15 K');

  // Solve for pressure P: 2.0 mol in 10 L autoclave at 100°C (373.15 K)
  // P = (2.0 * 0.08206 * 373.15) / 10 = 6.124 atm
  const gasP = calculateIdealGas({
    moles: 2.0,
    volumeLiters: 10.0,
    temperatureCelsius: 100
  });

  assert(gasP.calculatedVariable === 'P', 'Correctly identified pressure P as calculated variable');
  assert(Math.abs(gasP.pressureAtm - 6.124) < 0.02, `Pressure calculates to ~6.12 atm (got ${gasP.pressureAtm} atm)`);

  // Solve for moles n: Haber-Bosch reactor at 200 atm, 50 L, 450°C (723.15 K)
  // n = (200 * 50) / (0.08206 * 723.15) ~ 168.5 mol
  const gasN = calculateIdealGas({
    pressureAtm: 200.0,
    volumeLiters: 50.0,
    temperatureCelsius: 450
  });

  assert(gasN.calculatedVariable === 'n', 'Correctly identified moles n as calculated variable');
  assert(Math.abs(gasN.moles - 168.5) < 1.0, `Haber reactor holds ~168.5 mol gas (got ${gasN.moles} mol)`);

  // Solve for temperature T: 1.0 mol in 22.4 L at 1.0 atm -> ~0°C (273.15 K)
  const gasT = calculateIdealGas({
    moles: 1.0,
    volumeLiters: 22.414,
    pressureAtm: 1.0
  });

  assert(gasT.calculatedVariable === 'T', 'Correctly identified temperature T as calculated variable');
  assert(Math.abs(gasT.temperatureCelsius) < 1.0, `Classical STP temperature is ~0°C (got ${gasT.temperatureCelsius}°C)`);
}

// --- 5. Multi-Step Back-Titration Engine (Analytical Chemistry) ---
console.log('\n--- 5. Multi-Step Back-Titration Engine (Analytical Chemistry) ---');
{
  // Limestone analysis: 1.25g sample dissolved in 50 mL 0.50 M HCl.
  // Excess HCl back-titrated with 25.0 mL 0.20 M NaOH.
  // CaCO3 + 2HCl -> CaCl2 + CO2 + H2O (reagent1ToAnalyteRatio = 2)
  // NaOH + HCl -> NaCl + H2O (titrant2ToReagent1Ratio = 1)
  const limestoneRes = calculateBackTitration({
    analyteFormula: 'CaCO3',
    sampleMassGrams: 1.25,
    reagent1Molarity: 0.50,
    reagent1VolumeMl: 50.0,
    titrant2Molarity: 0.20,
    titrant2VolumeMl: 25.0,
    reagent1ToAnalyteRatio: 2.0,
    titrant2ToReagent1Ratio: 1.0
  });

  assert(limestoneRes.initialReagentMoles === 0.025, `Initial HCl added is 0.025 mol (got ${limestoneRes.initialReagentMoles})`);
  assert(limestoneRes.excessReagentMoles === 0.005, `Excess unreacted HCl is 0.005 mol (got ${limestoneRes.excessReagentMoles})`);
  assert(limestoneRes.consumedReagentMoles === 0.02, `HCl consumed by CaCO3 is 0.02 mol (got ${limestoneRes.consumedReagentMoles})`);
  assert(limestoneRes.analyteMoles === 0.01, `CaCO3 moles is 0.01 mol (got ${limestoneRes.analyteMoles})`);
  assert(Math.abs(limestoneRes.analyteMassGrams - 1.0009) < 0.002, `CaCO3 pure mass is ~1.001 g (got ${limestoneRes.analyteMassGrams} g)`);
  assert(limestoneRes.purityPercentage !== undefined && Math.abs(limestoneRes.purityPercentage - 80.07) < 0.1, `Limestone CaCO3 purity is ~80.07% (got ${limestoneRes.purityPercentage}%)`);
  assert(limestoneRes.stepByStepExplanationVI.length === 6, 'Provides 6 pedagogical step-by-step analytical explanation steps');

  // Aspirin Tablet Analysis: 0.50g tablet, saponified with 30 mL 0.20 M NaOH (ratio = 2: 1 mole aspirin reacts with 2 moles NaOH).
  // Excess NaOH back-titrated with 15.0 mL 0.10 M HCl.
  // Initial NaOH: 30 mL * 0.20 M = 0.006 mol
  // Excess NaOH: 15 mL * 0.10 M = 0.0015 mol
  // Consumed NaOH: 0.006 - 0.0015 = 0.0045 mol
  // Aspirin moles: 0.0045 / 2 = 0.00225 mol
  // Aspirin mass: 0.00225 * 180.159 = 0.4054 g
  // Purity: 0.4054 / 0.50 * 100% = 81.07%
  const aspirinRes = calculateBackTitration({
    analyteFormula: 'C9H8O4',
    sampleMassGrams: 0.50,
    reagent1Molarity: 0.20,
    reagent1VolumeMl: 30.0,
    titrant2Molarity: 0.10,
    titrant2VolumeMl: 15.0,
    reagent1ToAnalyteRatio: 2.0,
    titrant2ToReagent1Ratio: 1.0
  });

  assert(aspirinRes.analyteMoles === 0.00225, `Aspirin moles is 0.00225 mol (got ${aspirinRes.analyteMoles})`);
  assert(Math.abs(aspirinRes.analyteMassGrams - 0.4054) < 0.002, `Aspirin active ingredient mass is ~0.405 g (got ${aspirinRes.analyteMassGrams} g)`);
  assert(aspirinRes.purityPercentage !== undefined && Math.abs(aspirinRes.purityPercentage - 81.07) < 0.1, `Aspirin tablet purity is ~81.07% (got ${aspirinRes.purityPercentage}%)`);

  // Error case: impossible back titration where excess reagent calculated > initial added
  let backTitrationError = false;
  try {
    calculateBackTitration({
      analyteFormula: 'CaCO3',
      reagent1Molarity: 0.1,
      reagent1VolumeMl: 10,
      titrant2Molarity: 1.0,
      titrant2VolumeMl: 50
    });
  } catch (e) {
    backTitrationError = true;
  }
  assert(backTitrationError, 'Properly rejects impossible back-titration where excess exceeds initial reagent');
}

// --- 6. Chemical Reaction Percentage Yield Engine ---
console.log('\n--- 6. Chemical Reaction Percentage Yield Engine ---');
{
  // High Yield Organic Synthesis: Theoretical 10.0g, Actual 9.2g -> 92.0%
  const yieldHigh = calculateReactionYield({
    productFormula: 'C6H12O6',
    theoreticalMassGrams: 10.0,
    actualMassGrams: 9.2
  });
  assert(yieldHigh.percentageYield === 92.0, `High yield calculated to 92.0% (got ${yieldHigh.percentageYield}%)`);
  assert(yieldHigh.evaluationVI.includes('Tuyệt vời'), 'Yield >= 90% receives "Tuyệt vời" classification');

  // Moderate Yield Equilibrium Synthesis: Theoretical 20.0g, Actual 13.0g -> 65.0%
  const yieldMed = calculateReactionYield({
    productFormula: 'CH3COOC2H5',
    theoreticalMassGrams: 20.0,
    actualMassGrams: 13.0
  });
  assert(yieldMed.percentageYield === 65.0, `Esterification yield calculated to 65.0% (got ${yieldMed.percentageYield}%)`);
  assert(yieldMed.evaluationVI.includes('Trung bình'), 'Yield 40%-69% receives "Trung bình" classification');

  // Hydrated / Impure Warning (>100% yield)
  const yieldOver = calculateReactionYield({
    productFormula: 'CuSO4',
    theoreticalMassGrams: 10.0,
    actualMassGrams: 10.5
  });
  assert(yieldOver.percentageYield === 105.0, `Over-yield calculated to 105.0% (got ${yieldOver.percentageYield}%)`);
  assert(yieldOver.evaluationVI.includes('Cảnh báo'), 'Yield > 100% flags hydration / unpurified solvent warning');

  // Error case: non-positive theoretical yield
  let yieldError = false;
  try {
    calculateReactionYield({
      productFormula: 'NaCl',
      theoreticalMassGrams: 0,
      actualMassGrams: 5.0
    });
  } catch (e) {
    yieldError = true;
  }
  assert(yieldError, 'Properly rejects theoretical mass <= 0');
}

// --- 7. Limiting & Excess Stoichiometry Engine (Haber-Bosch Reaction) ---
console.log('\n--- 7. Limiting & Excess Stoichiometry Engine ---');
{
  // N2 + 3H2 -> 2NH3 with 2.0 mol N2 and 5.0 mol H2
  // N2 ratio: 2.0 / 1 = 2.0
  // H2 ratio: 5.0 / 3 = 1.667 -> H2 is limiting!
  // N2 consumed: 1.667 * 1 = 1.667 mol -> N2 excess remaining: 2.0 - 1.667 = 0.333 mol
  // NH3 produced: 1.667 * 2 = 3.333 mol
  const haberRes = calculateReactionStoichiometry(
    [
      { formula: 'N2', coefficient: 1, givenMoles: 2.0 },
      { formula: 'H2', coefficient: 3, givenMoles: 5.0 }
    ],
    [
      { formula: 'NH3', coefficient: 2 }
    ]
  );

  assert(haberRes.limitingReactant === 'H2', `H2 is identified as limiting reactant (got ${haberRes.limitingReactant})`);
  assert(haberRes.excessReactant === 'N2', `N2 is identified as excess reactant (got ${haberRes.excessReactant})`);
  assert(Math.abs(haberRes.excessMolesRemaining - 0.333) < 0.01, `Excess N2 remaining is ~0.333 mol (got ${haberRes.excessMolesRemaining} mol)`);
  assert(haberRes.productsFormed.length === 1, 'Produces 1 product item');
  assert(haberRes.productsFormed[0].formula === 'NH3', 'Product is NH3');
  assert(Math.abs(haberRes.productsFormed[0].moles - 3.333) < 0.01, `NH3 theoretical moles is ~3.333 mol (got ${haberRes.productsFormed[0].moles} mol)`);
  assert(haberRes.productsFormed[0].massGrams > 56.0 && haberRes.productsFormed[0].massGrams < 57.5, `NH3 mass is ~56.77 g (got ${haberRes.productsFormed[0].massGrams} g)`);
}

console.log('\n======================================================================');
console.log('   ✓ SUITE 39: ALL ADVANCED STOICHIOMETRY ASSERTIONS PASSED!          ');
console.log('======================================================================\n');
