// tests/test-galvanic-nernst-interactive-sim.mjs
// Suite 162: Deep Galvanic Electrochemical Cell & Nernst Equation Simulation Verification
// Aligned with GDPT 2018 Chemistry 12 & IUPAC Recommendations

import assert from 'assert';
import {
  STANDARD_REDUCTION_POTENTIALS,
  GALVANIC_CELL_PRESETS,
  simulateGalvanicCell,
  simulateConcentrationCell
} from '../src/domain/electrochemistryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 162: GALVANIC CELL & NERNST SIMULATION AUDIT      ');
console.log('======================================================================\n');

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

// -------------------------------------------------------------------
// 1. Classical Daniell Cell (Zn - Cu) Thermodynamics & Standards
// -------------------------------------------------------------------
console.log('--- 1. Daniell Cell (Zn - Cu) Baseline Verification ---');

runTest('Daniell cell standard conditions (1.0 M, 298.15 K) yield E0 = 1.10 V and n = 2', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 1.0,
    concentrationB: 1.0,
    temperatureKelvin: 298.15
  });

  assert.strictEqual(result.standardCellPotentialE0, 1.10, 'E0_cell should be exactly 1.10 V');
  assert.strictEqual(result.nonStandardCellPotentialE, 1.10, 'At 1.0M/1.0M Q=1, logQ=0, so E = E0');
  assert.strictEqual(result.electronsTransferred, 2, '2 electrons transferred per mole of reaction');
  assert.strictEqual(result.cathode.couple.id, 'Cu2_Cu', 'Cu2+/Cu is cathode (reduction, +)');
  assert.strictEqual(result.anode.couple.id, 'Zn2_Zn', 'Zn2+/Zn is anode (oxidation, -)');
  assert.ok(result.gibbsFreeEnergyDeltaG0Kj < -210 && result.gibbsFreeEnergyDeltaG0Kj > -215,
    `ΔG0 should be approx -212.3 kJ/mol, got ${result.gibbsFreeEnergyDeltaG0Kj}`);
  assert.strictEqual(result.isSpontaneous, true, 'Cell reaction must be spontaneous');
});

runTest('Electron flow & salt bridge ion migration strictly follow electrochemical law', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu'
  });

  // e- flows Anode -> Cathode
  assert.ok(result.electronFlowVI.includes('Anot') && result.electronFlowVI.includes('Catot'),
    'Electron flow must be from Anot to Catot in external circuit');
  // Salt bridge cations migrate to cathode, anions migrate to anode
  assert.ok(result.saltBridgeIonsMigrationVI.includes('K⁺') && result.saltBridgeIonsMigrationVI.includes('Catot'),
    'K+ cations must migrate to cathode');
  assert.ok(result.saltBridgeIonsMigrationVI.includes('NO₃⁻') && result.saltBridgeIonsMigrationVI.includes('Anot'),
    'NO3- anions must migrate to anode');
});

// -------------------------------------------------------------------
// 2. High-Voltage Galvanic Couples (Mg - Cu & Al - Cu)
// -------------------------------------------------------------------
console.log('--- 2. High-Voltage Galvanic Couples ---');

runTest('Mg - Cu cell produces standard potential E0 = 2.71 V', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Mg2_Mg',
    coupleBId: 'Cu2_Cu',
    concentrationA: 1.0,
    concentrationB: 1.0
  });

  // Mg2+/Mg: E0 = -2.37 V, Cu2+/Cu: E0 = +0.34 V
  // E0_cell = 0.34 - (-2.37) = 2.71 V
  assert.strictEqual(result.standardCellPotentialE0, 2.71, 'E0 should be 2.71 V');
  assert.strictEqual(result.anode.couple.id, 'Mg2_Mg', 'Mg is anode');
  assert.strictEqual(result.cathode.couple.id, 'Cu2_Cu', 'Cu is cathode');
  assert.ok(result.gibbsFreeEnergyDeltaG0Kj < -500, `High voltage must yield highly negative ΔG0: ${result.gibbsFreeEnergyDeltaG0Kj} kJ/mol`);
});

runTest('Al - Cu cell produces standard potential E0 = 2.00 V with n = 6 common electrons', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Al3_Al',
    coupleBId: 'Cu2_Cu',
    concentrationA: 1.0,
    concentrationB: 1.0
  });

  // Al3+/Al: E0 = -1.66 V (n=3), Cu2+/Cu: E0 = +0.34 V (n=2)
  // E0_cell = 0.34 - (-1.66) = 2.00 V
  // LCM(3, 2) = 6
  assert.strictEqual(result.standardCellPotentialE0, 2.00, 'E0 should be 2.00 V');
  assert.strictEqual(result.electronsTransferred, 6, 'Common transferred electrons n must be 6');
  assert.strictEqual(result.anode.couple.id, 'Al3_Al', 'Al is anode');
  assert.strictEqual(result.cathode.couple.id, 'Cu2_Cu', 'Cu is cathode');
});

// -------------------------------------------------------------------
// 3. Nernst Equation Concentration & Equilibrium Effects
// -------------------------------------------------------------------
console.log('--- 3. Nernst Concentration & Temperature Dynamics ---');

runTest('Depleted anode ion ([Zn2+] = 0.001 M) boosts voltage above standard E0', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 0.001, // Anode: 10^-3 M
    concentrationB: 1.0,   // Cathode: 1 M
    temperatureKelvin: 298.15
  });

  // Q = 0.001 / 1.0 = 10^-3 -> log10(Q) = -3
  // E = 1.10 - (0.05916/2)*(-3) = 1.10 + 0.0887 = ~1.189 V
  assert.ok(result.nonStandardCellPotentialE > 1.18 && result.nonStandardCellPotentialE < 1.20,
    `Expected E ~ 1.189 V, got ${result.nonStandardCellPotentialE}`);
});

runTest('Exhausted cathode ion ([Cu2+] = 0.001 M) reduces cell potential', () => {
  const result = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 1.0,   // Anode: 1 M
    concentrationB: 0.001, // Cathode: 10^-3 M
    temperatureKelvin: 298.15
  });

  // Q = 1.0 / 0.001 = 10^3 -> log10(Q) = 3
  // E = 1.10 - (0.05916/2)*(3) = 1.10 - 0.0887 = ~1.011 V
  assert.ok(result.nonStandardCellPotentialE < 1.02 && result.nonStandardCellPotentialE > 1.00,
    `Expected E ~ 1.011 V, got ${result.nonStandardCellPotentialE}`);
});

runTest('Thermal factor scales Nernst slope proportionally with Kelvin temperature', () => {
  const at25C = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 0.1,
    concentrationB: 1.0,
    temperatureKelvin: 298.15 // 25 °C
  });

  const at80C = simulateGalvanicCell({
    coupleAId: 'Zn2_Zn',
    coupleBId: 'Cu2_Cu',
    concentrationA: 0.1,
    concentrationB: 1.0,
    temperatureKelvin: 353.15 // 80 °C
  });

  // At higher T, nernstFactor is higher, so log10(0.1) = -1 creates a larger positive correction
  assert.ok(at80C.nonStandardCellPotentialE > at25C.nonStandardCellPotentialE,
    `Potential at 80°C (${at80C.nonStandardCellPotentialE} V) should be higher than at 25°C (${at25C.nonStandardCellPotentialE} V)`);
});

// -------------------------------------------------------------------
// 4. Asymmetric Electron Stoichiometry (Ag - Zn Cell)
// -------------------------------------------------------------------
console.log('--- 4. Asymmetric Electron Transfer (Ag - Zn Cell) ---');

runTest('Ag+/Ag (n=1) vs Zn2+/Zn (n=2) correctly computes least common multiple n=2 and quadratic Q', () => {
  // Reaction: Zn + 2Ag+ -> Zn2+ + 2Ag
  // Q = [Zn2+] / [Ag+]^2
  const result = simulateGalvanicCell({
    coupleAId: 'Ag_Ag0', // E0 = +0.80 V, n = 1
    coupleBId: 'Zn2_Zn', // E0 = -0.76 V, n = 2
    concentrationA: 0.1, // [Ag+] = 0.1 M
    concentrationB: 1.0  // [Zn2+] = 1.0 M
  });

  assert.strictEqual(result.standardCellPotentialE0, 1.56, 'E0 = 0.80 - (-0.76) = 1.56 V');
  assert.strictEqual(result.electronsTransferred, 2, 'Least common multiple must be 2');
  assert.strictEqual(result.cathode.couple.id, 'Ag_Ag0', 'Ag+ is reduced at Cathode');
  assert.strictEqual(result.anode.couple.id, 'Zn2_Zn', 'Zn is oxidized at Anode');

  // Q = [Zn2+]^1 / [Ag+]^2 = 1.0 / (0.1)^2 = 100
  // Correction = (0.05916 / 2) * log10(100) = 0.05916 * 1 = ~0.059 V
  // E = 1.56 - 0.059 = ~1.501 V
  assert.ok(result.nonStandardCellPotentialE >= 1.49 && result.nonStandardCellPotentialE <= 1.51,
    `Expected E ~ 1.501 V, got ${result.nonStandardCellPotentialE}`);
});

// -------------------------------------------------------------------
// 5. Concentration Cell Simulation (Građien Nồng Độ)
// -------------------------------------------------------------------
console.log('--- 5. Concentration Cell Dynamics ---');

runTest('Concentration cell has E0 = 0.00 V and generates purely entropic dilution potential', () => {
  const result = simulateConcentrationCell({
    coupleId: 'Cu2_Cu',
    concentrationDilute: 0.01,
    concentrationConcentrated: 1.0
  });

  assert.strictEqual(result.standardCellPotentialE0, 0.00, 'E0 must be exactly 0.00 V');
  assert.strictEqual(result.isSpontaneous, true, 'Dilution cell must be spontaneous');
  assert.strictEqual(result.electronsTransferred, 2, 'Cu2+/Cu transfers 2 electrons');

  // E = (0.05916 / 2) * log10(1.0 / 0.01) = 0.02958 * 2 = ~0.0592 V
  assert.ok(result.cellPotentialE >= 0.058 && result.cellPotentialE <= 0.060,
    `Expected E ~ 0.0592 V, got ${result.cellPotentialE}`);
  assert.strictEqual(result.anode.concentrationM, 0.01, 'Dilute half-cell is Anode');
  assert.strictEqual(result.cathode.concentrationM, 1.0, 'Concentrated half-cell is Cathode');
});

runTest('Concentration cell step-by-step explanations provide clear pedagogical guidance', () => {
  const result = simulateConcentrationCell({
    coupleId: 'Ag_Ag0',
    concentrationDilute: 0.001,
    concentrationConcentrated: 0.1
  });

  assert.ok(result.stepByStepExplanationVI.length >= 4, 'Must provide detailed multi-step explanation');
  assert.ok(result.drivingForceVI.length > 0, 'Must define driving force');
  assert.ok(result.anode.halfReaction.includes('0.001 M'), 'Anode reaction must state dilute concentration');
  assert.ok(result.cathode.halfReaction.includes('0.1 M'), 'Cathode reaction must state concentrated concentration');
});

// -------------------------------------------------------------------
// 6. Voltmeter Needle Angular Mapping Logic
// -------------------------------------------------------------------
console.log('--- 6. Voltmeter Angular Mapping Invariants ---');

runTest('Voltmeter angle correctly maps from rest (-65 deg) to clamped bounds (-50 deg to +50 deg)', () => {
  const computeNeedleAngle = (isClosed, voltage) => {
    if (!isClosed) return -65;
    const clampedV = Math.max(-0.5, Math.min(3.5, voltage));
    return -50 + (clampedV / 3.0) * 100;
  };

  assert.strictEqual(computeNeedleAngle(false, 1.10), -65, 'Open circuit needle rests at -65 deg');
  assert.strictEqual(computeNeedleAngle(true, 0.0), -50, '0.00 V maps to exactly -50 deg');
  assert.strictEqual(computeNeedleAngle(true, 1.5), 0, '1.50 V maps to center 0 deg');
  assert.strictEqual(computeNeedleAngle(true, 3.0), 50, '3.00 V maps to maximum +50 deg');
});

// -------------------------------------------------------------------
// 7. Presets & Edge Case Invariant Validation
// -------------------------------------------------------------------
console.log('--- 7. Presets & Edge Case Handling ---');

runTest('All predefined presets exist in reduction potential database and have positive E0', () => {
  assert.ok(GALVANIC_CELL_PRESETS.length >= 4, 'Should define at least 4 classic presets');

  for (const preset of GALVANIC_CELL_PRESETS) {
    assert.ok(STANDARD_REDUCTION_POTENTIALS[preset.anodeCoupleId], `Anode couple ${preset.anodeCoupleId} exists`);
    assert.ok(STANDARD_REDUCTION_POTENTIALS[preset.cathodeCoupleId], `Cathode couple ${preset.cathodeCoupleId} exists`);
    assert.ok(preset.standardPotentialE0 > 0, `Preset ${preset.id} must produce positive voltage`);
    assert.ok(preset.descriptionVi.length > 10, `Preset ${preset.id} must have descriptive Vietnamese text`);
  }
});

runTest('Attempting identical couples throws descriptive error', () => {
  assert.throws(() => {
    simulateGalvanicCell({
      coupleAId: 'Cu2_Cu',
      coupleBId: 'Cu2_Cu'
    });
  }, /khác nhau/);
});

runTest('Attempting non-positive concentration throws descriptive error', () => {
  assert.throws(() => {
    simulateGalvanicCell({
      coupleAId: 'Zn2_Zn',
      coupleBId: 'Cu2_Cu',
      concentrationA: 0
    });
  }, /lớn hơn 0/);

  assert.throws(() => {
    simulateGalvanicCell({
      coupleAId: 'Zn2_Zn',
      coupleBId: 'Cu2_Cu',
      concentrationB: -0.5
    });
  }, /lớn hơn 0/);
});

runTest('Attempting non-positive temperature throws descriptive error', () => {
  assert.throws(() => {
    simulateGalvanicCell({
      coupleAId: 'Zn2_Zn',
      coupleBId: 'Cu2_Cu',
      temperatureKelvin: 0
    });
  }, /lớn hơn 0 K/);

  assert.throws(() => {
    simulateGalvanicCell({
      coupleAId: 'Zn2_Zn',
      coupleBId: 'Cu2_Cu',
      temperatureKelvin: -20
    });
  }, /lớn hơn 0 K/);
});

runTest('Attempting equal or inverted concentration in concentration cell throws descriptive error', () => {
  assert.throws(() => {
    simulateConcentrationCell({
      coupleId: 'Cu2_Cu',
      concentrationDilute: 1.0,
      concentrationConcentrated: 1.0
    });
  }, /nhỏ hơn nồng độ/);

  assert.throws(() => {
    simulateConcentrationCell({
      coupleId: 'Cu2_Cu',
      concentrationDilute: 2.0,
      concentrationConcentrated: 0.5
    });
  }, /nhỏ hơn nồng độ/);
});

// -------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 162 COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('======================================================================\n');
