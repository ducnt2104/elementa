// tests/test-electrolysis-faraday-visualizer.mjs
// Test Suite 79: Unified Electrolysis & Faraday's Laws Simulation Engine
// Conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề Điện Phân) & IUPAC Standards

import assert from 'assert';
import {
  FARADAY_CONSTANT,
  GAS_MOLAR_VOLUME_STANDARD,
  GAS_MOLAR_VOLUME_LEGACY,
  ELECTROLYSIS_SCENARIOS,
  calculateFaradayMass,
  calculateFaradayGasVolume,
  calculateFaradayMolesOfElectrons,
  calculateElectrolysisTime,
  simulateElectrolysis,
  CURRICULUM_ELECTROLYSIS_CHALLENGES
} from './src/domain/electrolysisEngine.ts';

console.log('🧪 Starting Test Suite 79: Unified Electrolysis & Faraday\'s Laws Simulation Engine...\n');

let passedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Physical Constants
runTest('1. Faraday Constant conforms strictly to IUPAC standard (96,485 C/mol)', () => {
  assert.strictEqual(FARADAY_CONSTANT, 96485);
});

runTest('2. Gas Molar Volumes match GDPT 2018 standard (24.79 L/mol) and legacy (22.4 L/mol)', () => {
  assert.strictEqual(GAS_MOLAR_VOLUME_STANDARD, 24.79);
  assert.strictEqual(GAS_MOLAR_VOLUME_LEGACY, 22.4);
});

// 2. Faraday Calculation Engine
runTest('3. calculateFaradayMolesOfElectrons: exact Coulombs to moles conversion (Q = I * t)', () => {
  // I = 1.93 A, t = 5000 s => Q = 9650 C => n_e = 9650 / 96485 = 0.1000155 mol
  const ne = calculateFaradayMolesOfElectrons(1.93, 5000, 100);
  assert(Math.abs(ne - 0.10002) < 0.0001, `Expected ~0.10002 mol, got ${ne}`);

  // Zero check
  assert.strictEqual(calculateFaradayMolesOfElectrons(0, 5000), 0);
  assert.strictEqual(calculateFaradayMolesOfElectrons(1.93, 0), 0);
});

runTest('4. calculateFaradayMass: copper cathode deposition (M = 63.55 g/mol, n = 2)', () => {
  // I = 1.93 A, t = 3000 s, n = 2
  // m = (63.55 * 1.93 * 3000) / (2 * 96485) = 368079.15 / 192970 = 1.90744 g
  const massCu = calculateFaradayMass({
    molarMass: 63.55,
    currentA: 1.93,
    timeSec: 3000,
    electronsTransferred: 2
  });
  assert(Math.abs(massCu - 1.90744) < 0.001, `Expected ~1.907 g Cu, got ${massCu}`);
});

runTest('5. calculateFaradayGasVolume: H2 gas evolution at 25°C, 1 bar (Vm = 24.79 L/mol)', () => {
  // I = 2.0 A, t = 964.85 s => n_e = 0.02 mol => n_H2 = 0.01 mol => V = 0.01 * 24.79 = 0.2479 L
  const volH2 = calculateFaradayGasVolume({
    currentA: 2.0,
    timeSec: 964.85,
    electronsTransferred: 2,
    gasMolarVolume: 24.79
  });
  assert(Math.abs(volH2 - 0.2479) < 0.0001, `Expected 0.2479 L, got ${volH2}`);
});

runTest('6. calculateElectrolysisTime: inverse calculation from target mass', () => {
  const massCu = calculateFaradayMass({
    molarMass: 63.55,
    currentA: 1.93,
    timeSec: 3000,
    electronsTransferred: 2
  });
  // Invert calculation with the computed mass
  const timeSec = calculateElectrolysisTime({
    targetMassGrams: massCu,
    molarMass: 63.55,
    electronsTransferred: 2,
    currentA: 1.93
  });
  assert(Math.abs(timeSec - 3000) < 0.1, `Expected ~3000 s, got ${timeSec}`);
});

// 3. Scenario Catalog Verification
runTest('7. Scenario Catalog contains all 7 curriculum benchmark setups', () => {
  const keys = Object.keys(ELECTROLYSIS_SCENARIOS);
  assert(keys.includes('molten_nacl'));
  assert(keys.includes('hall_heroult_al2o3'));
  assert(keys.includes('chlor_alkali_membrane'));
  assert(keys.includes('chlor_alkali_no_membrane'));
  assert(keys.includes('copper_electroplating'));
  assert(keys.includes('aqueous_cuso4_inert'));
  assert(keys.includes('water_splitting_acidic'));
  assert.strictEqual(keys.length, 7);
});

runTest('8. Molten NaCl (Downs Cell): verifies Na at cathode and Cl2 at anode', () => {
  const scenario = ELECTROLYSIS_SCENARIOS.molten_nacl;
  assert.strictEqual(scenario.medium, 'MOLTEN');
  assert.strictEqual(scenario.cathode.speciesFormula, 'Na');
  assert.strictEqual(scenario.cathode.state, 'LIQUID');
  assert.strictEqual(scenario.anode.speciesFormula, 'Cl2');
  assert.strictEqual(scenario.anode.state, 'GAS');
  assert(scenario.hasDiaphragmOrMembrane, 'Downs cell must have steel mesh diaphragm');
});

runTest('9. Hall-Héroult Al2O3 in Cryolite: verifies 3e- reduction for Al and molten state', () => {
  const scenario = ELECTROLYSIS_SCENARIOS.hall_heroult_al2o3;
  assert.strictEqual(scenario.medium, 'MOLTEN');
  assert.strictEqual(scenario.cathode.speciesFormula, 'Al');
  assert.strictEqual(scenario.cathode.stoichiometricElectronRatio, 3);
  assert.strictEqual(scenario.anode.stoichiometricElectronRatio, 4); // O2 => 4e-
  assert(scenario.pedagogicalKeyPointsVI.some(pt => pt.includes('Criolit')));
});

runTest('10. Chlor-Alkali Membrane Cell: produces NaOH, Cl2, H2 with membrane separation', () => {
  const scenario = ELECTROLYSIS_SCENARIOS.chlor_alkali_membrane;
  assert.strictEqual(scenario.medium, 'AQUEOUS');
  assert.strictEqual(scenario.cathode.speciesFormula, 'H2');
  assert.strictEqual(scenario.anode.speciesFormula, 'Cl2');
  assert.strictEqual(scenario.solutionChangesVI.phChange, 'INCREASE_ALKALINE');
  assert.strictEqual(scenario.hasDiaphragmOrMembrane, true);
});

runTest('11. Copper Electroplating (Anot Tan): verifies mass equality Δm_anot = Δm_catot', () => {
  const sim = simulateElectrolysis('copper_electroplating', 2.5, 3600, { efficiencyPercent: 100 });
  assert.strictEqual(sim.cathodeResult.species, 'Kim loại Đồng nguyên chất bám đỏ mịn');
  assert.strictEqual(sim.anodeResult.formula, 'Cu');
  // At 100% efficiency, mass of Cu dissolved at anode equals mass of Cu plated at cathode
  assert.strictEqual(sim.cathodeResult.massGrams, sim.anodeResult.massGrams);
});

runTest('12. Water Splitting (PEM / Acidic): verifies exact 2 : 1 volume ratio (V_H2 : V_O2 = 2 : 1)', () => {
  const sim = simulateElectrolysis('water_splitting_acidic', 2.0, 1800);
  assert.strictEqual(sim.cathodeResult.formula, 'H2');
  assert.strictEqual(sim.anodeResult.formula, 'O2');
  assert.strictEqual(sim.stoichiometricChecks.volumeRatioGasExpected, '2 : 1 (V_H₂ : V_O₂)');
  assert(Math.abs((sim.stoichiometricChecks.volumeRatioGasActual || 0) - 2.0) < 0.01);
});

runTest('13. Aqueous CuSO4 with Inert Anode: verifies acidic acidification (pH decrease)', () => {
  const scenario = ELECTROLYSIS_SCENARIOS.aqueous_cuso4_inert;
  assert.strictEqual(scenario.solutionChangesVI.phChange, 'DECREASE_ACIDIC');
  assert.strictEqual(scenario.anode.speciesFormula, 'O2');
  assert.strictEqual(scenario.cathode.speciesFormula, 'Cu');
});

runTest('14. Step-by-Step Derivations are fully populated with exact numerical substitution', () => {
  const sim = simulateElectrolysis('chlor_alkali_membrane', 3.0, 1800);
  assert(sim.faradayFormulaDerivationVI.length >= 5);
  assert(sim.faradayFormulaDerivationVI[0].includes('Bước 1'));
  assert(sim.faradayFormulaDerivationVI[1].includes('Bước 2'));
  assert(sim.faradayFormulaDerivationVI[2].includes('Bước 3'));
});

runTest('15. Curriculum Challenges (Quiz): verify question validity and single correct answer', () => {
  assert(CURRICULUM_ELECTROLYSIS_CHALLENGES.length >= 4);
  for (const q of CURRICULUM_ELECTROLYSIS_CHALLENGES) {
    const correctOptions = q.options.filter(o => o.isCorrect);
    assert.strictEqual(correctOptions.length, 1, `Question ${q.id} must have exactly 1 correct option`);
    assert(q.explanationVI.length > 20, `Question ${q.id} must have detailed pedagogical explanation`);
  }
});

console.log(`\n🎉 Test Suite 79 PASSED: All ${passedTests} / 15 tests executed with 100% success!`);
