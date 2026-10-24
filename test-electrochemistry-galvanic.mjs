// test-electrochemistry-galvanic.mjs
// Suite 44: Standard Reduction Potentials, Galvanic Cells (Daniell & Nernst), and Faraday Electrolysis Engine Audit
// Aligned with GDPT 2018 Chemistry 12 & IUPAC Physical Electrochemistry Standards

import assert from 'assert';
import {
  STANDARD_REDUCTION_POTENTIALS,
  simulateGalvanicCell,
  simulateConcentrationCell,
  calculateElectrolysis
} from './src/domain/electrochemistryEngine.ts';

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 44: ELECTROCHEMISTRY & FARADAY ENGINE AUDIT       ');
console.log('======================================================================\n');

// -------------------------------------------------------------------
// 1. Standard Reduction Potentials Database Completeness & Invariants
// -------------------------------------------------------------------
console.log('--- 1. Standard Reduction Potentials Database Integrity ---');

runTest('Database contains all key curriculum redox couples from F2 to Li', () => {
  const couples = Object.values(STANDARD_REDUCTION_POTENTIALS);
  assert.ok(couples.length >= 25, `Expected >= 25 redox couples, got ${couples.length}`);

  // Fluorine is strongest oxidizing agent (highest E0)
  assert.strictEqual(STANDARD_REDUCTION_POTENTIALS.F2_F.standardPotentialE0, 2.87);

  // Lithium is strongest reducing agent (lowest E0)
  assert.strictEqual(STANDARD_REDUCTION_POTENTIALS.Li_Li0.standardPotentialE0, -3.04);

  // Standard Hydrogen Electrode (SHE) is strictly 0.00 V
  assert.strictEqual(STANDARD_REDUCTION_POTENTIALS.H_H2.standardPotentialE0, 0.00);
});

runTest('Electrochemical series order strictly obeys thermodynamic reduction hierarchy', () => {
  const E0_Au = 1.50; // Reference
  const E0_Ag = STANDARD_REDUCTION_POTENTIALS.Ag_Ag0.standardPotentialE0; // +0.80
  const E0_Cu = STANDARD_REDUCTION_POTENTIALS.Cu2_Cu.standardPotentialE0; // +0.34
  const E0_H = STANDARD_REDUCTION_POTENTIALS.H_H2.standardPotentialE0;   // 0.00
  const E0_Pb = STANDARD_REDUCTION_POTENTIALS.Pb2_Pb.standardPotentialE0; // -0.13
  const E0_Fe = STANDARD_REDUCTION_POTENTIALS.Fe2_Fe.standardPotentialE0; // -0.44
  const E0_Zn = STANDARD_REDUCTION_POTENTIALS.Zn2_Zn.standardPotentialE0; // -0.76
  const E0_Al = STANDARD_REDUCTION_POTENTIALS.Al3_Al.standardPotentialE0; // -1.66
  const E0_Mg = STANDARD_REDUCTION_POTENTIALS.Mg2_Mg.standardPotentialE0; // -2.37
  const E0_Na = STANDARD_REDUCTION_POTENTIALS.Na_Na0.standardPotentialE0; // -2.71
  const E0_K  = STANDARD_REDUCTION_POTENTIALS.K_K0.standardPotentialE0;   // -2.93

  assert.ok(E0_Ag > E0_Cu, 'Ag+ must be a stronger oxidizer than Cu2+');
  assert.ok(E0_Cu > E0_H, 'Cu2+ must have positive reduction potential vs SHE');
  assert.ok(E0_H > E0_Pb, 'H+ must have higher potential than Pb2+');
  assert.ok(E0_Pb > E0_Fe, 'Pb2+ must have higher potential than Fe2+');
  assert.ok(E0_Fe > E0_Zn, 'Fe2+ must have higher potential than Zn2+');
  assert.ok(E0_Zn > E0_Al, 'Zn2+ must have higher potential than Al3+');
  assert.ok(E0_Al > E0_Mg, 'Al3+ must have higher potential than Mg2+');
  assert.ok(E0_Mg > E0_Na, 'Mg2+ must have higher potential than Na+');
  assert.ok(E0_Na > E0_K, 'Na+ must have higher potential than K+');
});

// -------------------------------------------------------------------
// 2. Galvanic Cells: Daniell Cell (Zn - Cu) Calibration
// -------------------------------------------------------------------
console.log('\n--- 2. Daniell Galvanic Cell Simulation (Zn - Cu) ---');

runTest('Daniell Cell calculates exact standard potential E° = +1.10 V and spontaneous ΔG°', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu'
  });

  // E°_cell = 0.34 - (-0.76) = 1.10 V
  assert.strictEqual(result.standardCellPotentialE0, 1.10);
  assert.strictEqual(result.isSpontaneous, true);

  // Cathode is Cu (+), Anode is Zn (-)
  assert.strictEqual(result.cathode.couple.id, 'Cu2_Cu');
  assert.strictEqual(result.cathode.electrodeSign, '+ (Dương)');
  assert.strictEqual(result.anode.couple.id, 'Zn2_Zn');
  assert.strictEqual(result.anode.electrodeSign, '- (Âm)');

  // 2 electrons transferred
  assert.strictEqual(result.electronsTransferred, 2);

  // ΔG° = -n * F * E° = -2 * 96485 * 1.10 = -212267 J/mol = -212.3 kJ/mol
  assert.strictEqual(result.gibbsFreeEnergyDeltaG0Kj, -212.3);

  // Equilibrium constant K should be enormous (> 10^30)
  assert.ok(result.equilibriumConstantK > 1e30, 'Daniell cell K must be > 1e30');

  // Electron flow & Salt bridge descriptions
  assert.ok(result.electronFlowVI.includes('Anot (-)'), 'Electron flows from anode');
  assert.ok(result.electronFlowVI.includes('Catot (+)'), 'Electron flows to cathode');
  assert.ok(result.saltBridgeIonsMigrationVI.includes('K⁺'), 'K+ migrates to cathode');
  assert.ok(result.saltBridgeIonsMigrationVI.includes('NO₃⁻'), 'NO3- migrates to anode');
});

runTest('Nernst equation correctly predicts non-standard potential E_cell at unequal concentrations', () => {
  // [Zn2+] = 0.01 M (anode), [Cu2+] = 1.0 M (cathode)
  // Q = 0.01 / 1.0 = 0.01 -> log10(Q) = -2
  // E = 1.10 - (0.0592 / 2) * (-2) = 1.10 + 0.0592 = 1.1592 V (~1.159 V)
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 0.01, // Zn2+
    concentrationB: 1.0   // Cu2+
  });

  assert.strictEqual(result.standardCellPotentialE0, 1.10);
  assert.ok(
    Math.abs(result.nonStandardCellPotentialE - 1.159) < 0.005,
    `Expected E ~ 1.159 V, got ${result.nonStandardCellPotentialE}`
  );
  assert.ok(
    result.nonStandardCellPotentialE > result.standardCellPotentialE0,
    'Diluting product Zn2+ must increase cell voltage via Le Chatelier / Nernst'
  );
});

// -------------------------------------------------------------------
// 3. Galvanic Cells: Silver-Copper Cell (Cu - Ag) Calibration
// -------------------------------------------------------------------
console.log('\n--- 3. Silver-Copper Galvanic Cell Simulation (Cu - Ag) ---');

runTest('Cu - Ag Cell correctly balances 1e- and 2e- half-reactions (n = 2)', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Ag_Ag0', // Ag+ + 1e -> Ag (0.80 V)
    coupleBId: 'Cu2_Cu'  // Cu2+ + 2e -> Cu (0.34 V)
  });

  // Cathode is Ag (0.80 V), Anode is Cu (0.34 V)
  assert.strictEqual(result.cathode.couple.id, 'Ag_Ag0');
  assert.strictEqual(result.anode.couple.id, 'Cu2_Cu');

  // E°_cell = 0.80 - 0.34 = 0.46 V
  assert.strictEqual(result.standardCellPotentialE0, 0.46);

  // LCM of 1 and 2 is 2
  assert.strictEqual(result.electronsTransferred, 2);

  // ΔG° = -2 * 96485 * 0.46 / 1000 = -88.8 kJ/mol
  assert.strictEqual(result.gibbsFreeEnergyDeltaG0Kj, -88.8);
});

runTest('Zinc - Silver Oxide Cell (Zn - Ag) exhibits high potential E° = 1.56 V and spontaneous ΔG°', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn', // -0.76 V
    coupleBId: 'Ag_Ag0'  // +0.80 V
  });

  // Cathode is Ag (+) reduction, Anode is Zn (-) oxidation
  assert.strictEqual(result.cathode.couple.id, 'Ag_Ag0');
  assert.strictEqual(result.anode.couple.id, 'Zn2_Zn');

  // E°_cell = 0.80 - (-0.76) = 1.56 V
  assert.strictEqual(result.standardCellPotentialE0, 1.56);
  assert.strictEqual(result.isSpontaneous, true);
  assert.strictEqual(result.electronsTransferred, 2);

  // ΔG° = -2 * 96485 * 1.56 / 1000 = -301.0 kJ/mol
  assert.strictEqual(result.gibbsFreeEnergyDeltaG0Kj, -301.0);
});

runTest('Iron - Copper Galvanic Cell (Fe - Cu) models spontaneous electrochemical pipe corrosion', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Fe2_Fe', // -0.44 V
    coupleBId: 'Cu2_Cu'  // +0.34 V
  });

  // Fe is sacrificial anode (-), Cu is cathode (+)
  assert.strictEqual(result.cathode.couple.id, 'Cu2_Cu');
  assert.strictEqual(result.anode.couple.id, 'Fe2_Fe');

  // E°_cell = 0.34 - (-0.44) = 0.78 V
  assert.strictEqual(result.standardCellPotentialE0, 0.78);
  assert.strictEqual(result.isSpontaneous, true);

  // ΔG° = -2 * 96485 * 0.78 / 1000 = -150.5 kJ/mol
  assert.strictEqual(result.gibbsFreeEnergyDeltaG0Kj, -150.5);
});

// -------------------------------------------------------------------
// 4. Faraday Electrolysis Engine Calibration
// -------------------------------------------------------------------
console.log('\n--- 4. Faraday Electrolysis Engine Calibration ---');

runTest('Aqueous CuSO4 electrolysis yields copper at cathode and oxygen gas at anode with pH drop', () => {
  // I = 2.0 A, t = 1930 s
  // Q = 2.0 * 1930 = 3860 C
  // n_e = 3860 / 96485 = 0.04 mol e-
  // Moles Cu = 0.04 / 2 = 0.02 mol -> Mass Cu = 0.02 * 63.546 = 1.271 g
  // Moles O2 = 0.04 / 4 = 0.01 mol -> Vol O2 = 0.01 * 24.79 = 0.248 L
  const result = calculateElectrolysis({
    scenario: 'CUSO4_AQUEOUS',
    currentAmperes: 2.0,
    timeSeconds: 1930
  });

  assert.strictEqual(result.totalChargeCoulombs, 3860);
  assert.strictEqual(result.electronsTransferredMoles, 0.04);

  // Cathode copper mass
  assert.ok(
    Math.abs((result.cathodeProduct.massGrams || 0) - 1.271) < 0.005,
    `Expected ~1.271 g Cu, got ${result.cathodeProduct.massGrams}`
  );

  // Anode oxygen volume
  assert.ok(
    Math.abs((result.anodeProduct.volumeLiters || 0) - 0.248) < 0.005,
    `Expected ~0.248 L O2, got ${result.anodeProduct.volumeLiters}`
  );

  // Acid generation (2H2SO4) drops pH
  assert.strictEqual(result.solutionPhTrend, 'DECREASES (Axit hóa)');
});

runTest('Aqueous NaCl with diaphragm produces H2, Cl2, and alkaline NaOH solution', () => {
  // I = 5.0 A, t = 964.85 s
  // Q = 4824.25 C -> n_e = 4824.25 / 96485 = 0.05 mol e-
  // Moles H2 = 0.05 / 2 = 0.025 mol -> Vol H2 = 0.025 * 24.79 = 0.62 L
  // Moles Cl2 = 0.05 / 2 = 0.025 mol -> Vol Cl2 = 0.025 * 24.79 = 0.62 L
  const result = calculateElectrolysis({
    scenario: 'NACL_AQUEOUS_DIAPHRAGM',
    currentAmperes: 5.0,
    timeSeconds: 964.85
  });

  assert.strictEqual(result.electronsTransferredMoles, 0.05);
  assert.ok(
    Math.abs((result.cathodeProduct.volumeLiters || 0) - 0.62) < 0.01,
    `Expected ~0.62 L H2, got ${result.cathodeProduct.volumeLiters}`
  );
  assert.ok(
    Math.abs((result.anodeProduct.volumeLiters || 0) - 0.62) < 0.01,
    `Expected ~0.62 L Cl2, got ${result.anodeProduct.volumeLiters}`
  );
  assert.strictEqual(result.solutionPhTrend, 'INCREASES (Kiềm hóa)');
});

runTest('Molten NaCl produces liquid Sodium metal at cathode and Chlorine gas at anode', () => {
  const result = calculateElectrolysis({
    scenario: 'NACL_MOLTEN',
    currentAmperes: 10.0,
    timeSeconds: 964.85
  });

  // n_e = 0.1 mol e- -> 0.1 mol Na = 2.299 g
  assert.strictEqual(result.electronsTransferredMoles, 0.1);
  assert.ok(
    Math.abs((result.cathodeProduct.massGrams || 0) - 2.299) < 0.01,
    `Expected ~2.299 g Na, got ${result.cathodeProduct.massGrams}`
  );
  assert.strictEqual(result.solutionPhTrend, 'CONSTANT (Không đổi)');
});

runTest('Molten Al2O3 Hall-Heroult industrial process produces aluminum metal', () => {
  // n = 3 electrons for Al3+ + 3e -> Al
  const result = calculateElectrolysis({
    scenario: 'AL2O3_MOLTEN_CRYOLITE',
    currentAmperes: 30.0,
    timeSeconds: 964.85
  });

  // Q = 28945.5 C -> n_e = 0.3 mol e-
  // Moles Al = 0.3 / 3 = 0.1 mol -> Mass Al = 0.1 * 26.982 = 2.698 g
  assert.strictEqual(result.electronsTransferredMoles, 0.3);
  assert.ok(
    Math.abs((result.cathodeProduct.massGrams || 0) - 2.698) < 0.01,
    `Expected ~2.698 g Al, got ${result.cathodeProduct.massGrams}`
  );
});

runTest('Aqueous AgNO3 electroplating produces metallic silver at cathode and nitric acid in solution', () => {
  // I = 5.0 A, t = 1930 s
  // Q = 5.0 * 1930 = 9650 C
  // n_e = 9650 / 96485 = 0.1 mol e-
  // Cathode: Ag+ + 1e -> Ag (M=107.868) -> Mass = 0.1 * 107.868 = 10.787 g
  // Anode: 2H2O -> O2 + 4H+ + 4e -> Moles O2 = 0.1 / 4 = 0.025 mol -> Vol = 0.025 * 24.79 = 0.620 L
  const result = calculateElectrolysis({
    scenario: 'AGNO3_AQUEOUS',
    currentAmperes: 5.0,
    timeSeconds: 1930
  });

  assert.strictEqual(result.electronsTransferredMoles, 0.1);
  assert.ok(
    Math.abs((result.cathodeProduct.massGrams || 0) - 10.787) < 0.01,
    `Expected ~10.787 g Ag, got ${result.cathodeProduct.massGrams}`
  );
  assert.ok(
    Math.abs((result.anodeProduct.volumeLiters || 0) - 0.620) < 0.01,
    `Expected ~0.620 L O2, got ${result.anodeProduct.volumeLiters}`
  );
  assert.strictEqual(result.solutionPhTrend, 'DECREASES (Axit hóa)');
});

runTest('Aqueous NaCl without diaphragm produces Javel bleach (NaClO) with alkaline pH increase', () => {
  const result = calculateElectrolysis({
    scenario: 'NACL_AQUEOUS_NO_DIAPHRAGM',
    currentAmperes: 4.0,
    timeSeconds: 1930
  });

  // Q = 7720 C -> n_e = 7720 / 96485 = 0.08 mol e-
  assert.strictEqual(result.electronsTransferredMoles, 0.08);
  assert.ok(result.overallEquationVI.includes('NaClO'), 'Overall equation describes Javel water formation');
  assert.strictEqual(result.solutionPhTrend, 'INCREASES (Kiềm hóa)');
});

// -------------------------------------------------------------------
// 5. Error Guardrails & Boundary Handling
// -------------------------------------------------------------------
console.log('\n--- 5. Error Handling & Invariant Guards ---');

runTest('Identical couples in galvanic cell throws descriptive error', () => {
  assert.throws(() => {
    simulateGalvanicCell({
      coupleAId: 'Cu2_Cu',
      coupleBId: 'Cu2_Cu'
    });
  }, /phải là hai cặp oxi hóa - khử khác nhau/);
});

runTest('Negative or zero ion concentration throws descriptive error', () => {
  assert.throws(() => {
    simulateGalvanicCell({
      coupleAId: 'Zn2_Zn',
      coupleBId: 'Cu2_Cu',
      concentrationA: -0.5
    });
  }, /phải lớn hơn 0/);
});

runTest('Negative or zero current or time in electrolysis throws descriptive error', () => {
  assert.throws(() => {
    calculateElectrolysis({
      scenario: 'CUSO4_AQUEOUS',
      currentAmperes: -2.0,
      timeSeconds: 100
    });
  }, /phải lớn hơn 0/);

  assert.throws(() => {
    calculateElectrolysis({
      scenario: 'CUSO4_AQUEOUS',
      currentAmperes: 2.0,
      timeSeconds: 0
    });
  }, /phải lớn hơn 0/);
});

// -------------------------------------------------------------------
// 6. Equilibrium Constant K & Extreme Thermodynamic Driving Force
// -------------------------------------------------------------------
console.log('\n--- 6. Thermodynamic Equilibrium Constant K & Driving Force ---');

runTest('Daniell cell equilibrium constant K exceeds 10^35, proving practically irreversible completion', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu'
  });

  // K = 10^(2 * 1.10 / 0.0592) = 10^37.16 > 10^35
  assert.ok(result.equilibriumConstantK > 1e35, `Expected K > 1e35, got ${result.equilibriumConstantK}`);
  assert.strictEqual(result.isSpontaneous, true);
  assert.ok(result.gibbsFreeEnergyDeltaG0Kj < -200, `Expected ΔG° < -200 kJ/mol, got ${result.gibbsFreeEnergyDeltaG0Kj}`);
});

// -------------------------------------------------------------------
// 7. Le Chatelier Principle & Nernst Concentration Modulation
// -------------------------------------------------------------------
console.log('\n--- 7. Le Chatelier Principle & Nernst Concentration Modulation ---');

runTest('Nernst potential rigorously responds to Q changes according to Le Chatelier principle', () => {
  // Scenario A: High reactant [Cu2+] = 2.0 M, Low product [Zn2+] = 0.05 M -> Q = 0.025 -> E > E°
  const shiftedForward = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 0.05, // [Zn2+] anode product
    concentrationB: 2.0   // [Cu2+] cathode reactant
  });

  // Scenario B: Standard 1.0 M each -> Q = 1.0 -> E = E°
  const standard = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 1.0,
    concentrationB: 1.0
  });

  // Scenario C: High product [Zn2+] = 2.0 M, Low reactant [Cu2+] = 0.05 M -> Q = 40 -> E < E°
  const shiftedBackward = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 2.0,   // [Zn2+] anode product
    concentrationB: 0.05   // [Cu2+] cathode reactant
  });

  assert.ok(
    shiftedForward.nonStandardCellPotentialE > standard.standardCellPotentialE0,
    `Shifted forward E (${shiftedForward.nonStandardCellPotentialE}) must exceed E0 (${standard.standardCellPotentialE0})`
  );
  assert.strictEqual(standard.nonStandardCellPotentialE, standard.standardCellPotentialE0);
  assert.ok(
    shiftedBackward.nonStandardCellPotentialE < standard.standardCellPotentialE0,
    `Shifted backward E (${shiftedBackward.nonStandardCellPotentialE}) must be below E0 (${standard.standardCellPotentialE0})`
  );
});

// -------------------------------------------------------------------
// 8. Circuit Telemetry & Salt Bridge Ion Migration Invariants
// -------------------------------------------------------------------
console.log('\n--- 8. Circuit Telemetry & Salt Bridge Ion Migration ---');

runTest('Electron flow and salt bridge migration adhere to electrodynamic laws', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu'
  });

  assert.ok(result.electronFlowVI.includes('Anot (-)'), 'Electron flow must originate from Anode');
  assert.ok(result.electronFlowVI.includes('Catot (+)'), 'Electron flow must terminate at Cathode');
  assert.ok(result.saltBridgeIonsMigrationVI.includes('Cation (K⁺)'), 'Cations must migrate toward Cathode');
  assert.ok(result.saltBridgeIonsMigrationVI.includes('Anion'), 'Anions must migrate toward Anode');
});

// -------------------------------------------------------------------
// 9. Pedagogical Step-by-Step Curriculum Invariants
// -------------------------------------------------------------------
console.log('\n--- 9. Pedagogical Step-by-Step Curriculum Invariants ---');

runTest('All galvanic cell simulations emit comprehensive 5-step curriculum derivations', () => {
  const cells = [
    simulateGalvanicCell({ coupleAId: 'Zn2_Zn', coupleBId: 'Cu2_Cu' }),
    simulateGalvanicCell({ coupleAId: 'Fe2_Fe', coupleBId: 'Cu2_Cu' }),
    simulateGalvanicCell({ coupleAId: 'Zn2_Zn', coupleBId: 'Ag_Ag0' })
  ];

  for (const cell of cells) {
    assert.strictEqual(cell.stepByStepExplanationVI.length, 7, 'Must provide full 7-line detailed derivation');
    assert.ok(cell.stepByStepExplanationVI.some(l => l.includes('Bước 1')), 'Step 1 must be present');
    assert.ok(cell.stepByStepExplanationVI.some(l => l.includes('Bước 2')), 'Step 2 must be present');
    assert.ok(cell.stepByStepExplanationVI.some(l => l.includes('Bước 3')), 'Step 3 must be present');
    assert.ok(cell.stepByStepExplanationVI.some(l => l.includes('Bước 4')), 'Step 4 must be present');
    assert.ok(cell.stepByStepExplanationVI.some(l => l.includes('Bước 5')), 'Step 5 must be present');
  }
});

// -------------------------------------------------------------------
// 10. Concentration Cell Simulation Engine (Pin Nồng Độ)
// -------------------------------------------------------------------
console.log('\n--- 10. Concentration Cell Simulation Engine (Pin Nồng Độ) ---');

runTest('Silver concentration cell calculates E = +0.1183 V from 100-fold concentration gradient', () => {
  // Ag | Ag+(0.01 M) || Ag+(1.0 M) | Ag
  const cell = simulateConcentrationCell({
    coupleId: 'Ag_Ag0',
    concentrationDilute: 0.01,
    concentrationConcentrated: 1.0
  });

  assert.strictEqual(cell.standardCellPotentialE0, 0.00, 'Concentration cell strictly has E° = 0.00 V');
  assert.strictEqual(cell.electronsTransferred, 1);
  assert.strictEqual(cell.cellPotentialE, 0.1183, `Expected E = 0.1183 V, got ${cell.cellPotentialE}`);
  assert.strictEqual(cell.isSpontaneous, true);
  assert.strictEqual(cell.anode.concentrationM, 0.01);
  assert.strictEqual(cell.cathode.concentrationM, 1.0);
  assert.strictEqual(cell.stepByStepExplanationVI.length, 6);
});

runTest('Copper concentration cell calculates E = +0.0592 V from 100-fold gradient (n = 2)', () => {
  // Cu | Cu2+(0.001 M) || Cu2+(0.1 M) | Cu
  const cell = simulateConcentrationCell({
    coupleId: 'Cu2_Cu',
    concentrationDilute: 0.001,
    concentrationConcentrated: 0.1
  });

  assert.strictEqual(cell.standardCellPotentialE0, 0.00);
  assert.strictEqual(cell.electronsTransferred, 2);
  assert.strictEqual(cell.cellPotentialE, 0.0592, `Expected E = 0.0592 V, got ${cell.cellPotentialE}`);
  assert.strictEqual(cell.isSpontaneous, true);
});

runTest('Concentration cell safely throws descriptive errors on inverted or negative concentrations', () => {
  // Inverted: C_dilute >= C_conc
  assert.throws(
    () => simulateConcentrationCell({ coupleId: 'Ag_Ag0', concentrationDilute: 1.0, concentrationConcentrated: 0.1 }),
    /nhỏ hơn nồng độ dung dịch đặc/
  );

  // Equal concentrations
  assert.throws(
    () => simulateConcentrationCell({ coupleId: 'Ag_Ag0', concentrationDilute: 1.0, concentrationConcentrated: 1.0 }),
    /nhỏ hơn nồng độ dung dịch đặc/
  );

  // Negative concentration
  assert.throws(
    () => simulateConcentrationCell({ coupleId: 'Ag_Ag0', concentrationDilute: -0.1, concentrationConcentrated: 1.0 }),
    /phải lớn hơn 0/
  );
});

console.log('\n======================================================================');
console.log(`   ✓ SUITE 44: ALL ${passedTests} / ${totalTests} ELECTROCHEMISTRY ASSERTIONS PASSED!       `);
console.log('======================================================================\n');
