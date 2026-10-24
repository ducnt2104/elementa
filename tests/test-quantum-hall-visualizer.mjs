// test-quantum-hall-visualizer.mjs
// Milestone 44: Quantum Hall Effect, Topological Matter & Berry Phase Engine
// Standards: 2019 SI Metrology (von Klitzing constant R_K = h/e^2), Nobel Prize Physics 1985 (von Klitzing), 1998 (Laughlin), 2016 (Thouless)
// Curriculum: Vietnam GDPT 2018 (Vật lí 12 Chuyên đề & Hóa học 12)

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  TWO_DEE_MATERIALS,
  SI_VON_KLITZING_RK,
  SI_CONDUCTANCE_QUANTUM_G0,
  calculateQuantumHallEffect,
  getMatchingQuantumHallCard,
} from '../src/domain/quantumHallEngine.ts';

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] Test ${totalTests}: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] Test ${totalTests}: ${testName}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 101: QUANTUM HALL EFFECT & TOPOLOGICAL MATTER');
console.log('======================================================================');

// Test 1: 2D Materials Benchmark Catalog Integrity
runTest('2D material catalog contains key semiconductor and Dirac benchmarks', () => {
  const required = ['gaas_algaas', 'graphene_monolayer', 'silicon_mosfet', 'inas_quantum_well'];
  for (const id of required) {
    const mat = TWO_DEE_MATERIALS[id];
    assert.ok(mat, `Missing material: ${id}`);
    assert.ok(mat.effectiveMassRatio > 0, `Mass ratio must be positive for ${id}`);
    assert.ok(mat.typicalSheetDensityM2 > 0, `Sheet density must be positive for ${id}`);
    assert.ok(mat.nameVI.length > 5, `Vietnamese description required for ${id}`);
  }
});

// Test 2: Exact SI Fundamental Physical Constants
runTest('Exact SI 2019 redefinition constants for von Klitzing constant and conductance quantum', () => {
  // R_K = h / e^2 = 25812.807459... Ohm
  assert.ok(Math.abs(SI_VON_KLITZING_RK - 25812.807459) < 0.001, `R_K mismatch: ${SI_VON_KLITZING_RK}`);

  // G_0 = 2e^2 / h ~= 7.74809e-5 S
  assert.ok(Math.abs(SI_CONDUCTANCE_QUANTUM_G0 - 7.74809e-5) < 1e-8, `G_0 mismatch: ${SI_CONDUCTANCE_QUANTUM_G0}`);
});

// Test 3: Cyclotron Frequency and Energy Scaling with B
runTest('Cyclotron frequency omega_c = e*B / m* scales linearly with magnetic field', () => {
  const resB1 = calculateQuantumHallEffect('gaas_algaas', 1.0, 3e15, 1.5);
  const resB2 = calculateQuantumHallEffect('gaas_algaas', 2.0, 3e15, 1.5);

  const ratio = resB2.cyclotronFrequencyRadPerS / resB1.cyclotronFrequencyRadPerS;
  assert.ok(Math.abs(ratio - 2.0) < 0.01, `Cyclotron frequency must double when B doubles: ${ratio}`);

  // GaAs cyclotron energy at 1 T is approx 1.73 meV
  assert.ok(Math.abs(resB1.cyclotronEnergyEv * 1000 - 1.73) < 0.15, `Cyclotron energy mismatch: ${resB1.cyclotronEnergyEv * 1000} meV`);
});

// Test 4: Magnetic Length l_B = sqrt(hbar / (e * B))
runTest('Magnetic length scales as 1/sqrt(B) and evaluates to ~25.66 nm at 1 Tesla', () => {
  const resB1 = calculateQuantumHallEffect('gaas_algaas', 1.0, 3e15, 1.5);
  const resB4 = calculateQuantumHallEffect('gaas_algaas', 4.0, 3e15, 1.5);

  assert.ok(Math.abs(resB1.magneticLengthNm - 25.66) < 0.2, `Magnetic length at 1T should be ~25.66 nm, got ${resB1.magneticLengthNm}`);
  assert.ok(Math.abs(resB4.magneticLengthNm - resB1.magneticLengthNm / 2) < 0.2, 'l_B must halve when B quadruples');
});

// Test 5: Filling Factor nu = (h * n_s) / (e * B)
runTest('Filling factor inversely scales with magnetic field B', () => {
  const ns = 3.0e15;
  const resLowB = calculateQuantumHallEffect('gaas_algaas', 2.0, ns, 1.5);
  const resHighB = calculateQuantumHallEffect('gaas_algaas', 4.0, ns, 1.5);

  assert.ok(resLowB.fillingFactorNu > resHighB.fillingFactorNu, 'Filling factor must decrease as B increases');
  assert.ok(Math.abs(resLowB.fillingFactorNu / resHighB.fillingFactorNu - 2.0) < 0.02);
});

// Test 6: Quantized Hall Resistance on Plateaus nu = 1, 2, 3, 4
runTest('Quantized Hall resistance locks to R_K / nu exactly on integer plateaus', () => {
  // Tune B such that nu exactly equals 1.0: B = (h * n_s) / e = (6.626e-34 * 3e15) / 1.602e-19 ~= 12.408 T
  const bNu1 = (6.62607015e-34 * 3.0e15) / 1.602176634e-19;
  const res1 = calculateQuantumHallEffect('gaas_algaas', bNu1, 3.0e15, 1.5);
  assert.strictEqual(res1.integerPlateauIndex, 1);
  assert.strictEqual(res1.isAtPlateau, true);
  assert.ok(Math.abs(res1.hallResistanceRxyOhm - 25812.807) < 0.05, `R_xy at nu=1: ${res1.hallResistanceRxyOhm}`);

  // Tune B for nu = 2.0: B = bNu1 / 2 ~= 6.204 T
  const res2 = calculateQuantumHallEffect('gaas_algaas', bNu1 / 2, 3.0e15, 1.5);
  assert.strictEqual(res2.integerPlateauIndex, 2);
  assert.strictEqual(res2.isAtPlateau, true);
  assert.ok(Math.abs(res2.hallResistanceRxyOhm - 12906.404) < 0.05, `R_xy at nu=2: ${res2.hallResistanceRxyOhm}`);

  // Tune B for nu = 4.0: B = bNu1 / 4 ~= 3.102 T
  const res4 = calculateQuantumHallEffect('gaas_algaas', bNu1 / 4, 3.0e15, 1.5);
  assert.strictEqual(res4.integerPlateauIndex, 4);
  assert.strictEqual(res4.isAtPlateau, true);
  assert.ok(Math.abs(res4.hallResistanceRxyOhm - 6453.202) < 0.05, `R_xy at nu=4: ${res4.hallResistanceRxyOhm}`);
});

// Test 7: Longitudinal Resistance R_xx Vanishing at Plateau vs Peak at Transition
runTest('Longitudinal resistance R_xx vanishes on plateau (dissipationless) and peaks at transitions', () => {
  const bNu1 = (6.62607015e-34 * 3.0e15) / 1.602176634e-19; // ~12.408 T (plateau)
  const resPlateau = calculateQuantumHallEffect('gaas_algaas', bNu1, 3.0e15, 1.5);
  assert.ok(resPlateau.longitudinalResistanceRxxOhm < 2.0, `R_xx must be suppressed on plateau: ${resPlateau.longitudinalResistanceRxxOhm}`);

  // Transition point: nu = 1.5 -> B = bNu1 / 1.5
  const resTransition = calculateQuantumHallEffect('gaas_algaas', bNu1 / 1.5, 3.0e15, 1.5);
  assert.strictEqual(resTransition.isAtPlateau, false);
  assert.ok(resTransition.longitudinalResistanceRxxOhm > 500, `R_xx must peak at transition: ${resTransition.longitudinalResistanceRxxOhm}`);
});

// Test 8: Topological TKNN Chern Invariant & Bulk-Boundary Edge States
runTest('Chern number C equals filling factor nu and matches count of chiral edge states', () => {
  const bNu2 = (6.62607015e-34 * 3.0e15) / (1.602176634e-19 * 2);
  const res = calculateQuantumHallEffect('gaas_algaas', bNu2, 3.0e15, 1.5);
  
  assert.strictEqual(res.chernNumber, 2);
  assert.strictEqual(res.chiralEdgeStatesCount, 2);
});

// Test 9: Relativistic Graphene Dirac Fermions & Berry Phase pi
runTest('Graphene monolayer exhibits Dirac dispersion and Berry Phase = pi', () => {
  const res = calculateQuantumHallEffect('graphene_monolayer', 6.0, 4.0e15, 1.5);
  assert.strictEqual(res.material.isDiracMaterial, true);
  assert.ok(Math.abs(res.berryPhaseRadians - Math.PI) < 0.001, 'Berry phase must equal pi');

  // Check n = 0 Landau level energy at Dirac point is 0
  const level0 = res.landauLevels.find(l => l.levelIndexN === 0);
  assert.ok(level0, 'Must contain level n=0');
  assert.strictEqual(level0.energyEv, 0, 'Zero-mode Landau level in Graphene must have E = 0');
});

// Test 10: InAs Quantum Well Giant Zeeman Spin Splitting
runTest('InAs Quantum Well exhibits giant negative g-factor and strong Zeeman splitting', () => {
  const res = calculateQuantumHallEffect('inas_quantum_well', 6.0, 2.5e15, 1.5);
  assert.strictEqual(res.material.gFactor, -14.9);

  // Check spin-up vs spin-down splitting
  const level1 = res.landauLevels.find(l => l.levelIndexN === 1);
  assert.ok(level1);
  assert.ok(level1.energyEvSpinUp > level1.energyEvSpinDown);
  const splittingEv = level1.energyEvSpinUp - level1.energyEvSpinDown;
  assert.ok(splittingEv > 0.004, `Zeeman splitting must be prominent (>4 meV): ${splittingEv * 1000} meV`);
});

// Test 11: Card Matching for 2D Materials & Topological Systems
runTest('getMatchingQuantumHallCard accurately maps cards to topological presets', () => {
  const graphCard = { id: 'card_graphene_sheet', name: 'Graphene Đơn Lớp Carbon 2D' };
  assert.strictEqual(getMatchingQuantumHallCard(graphCard)?.id, 'graphene_monolayer');

  const gaasCard = { id: 'card_gaas_hemt', name: 'Dị Thể Bán Dẫn GaAs 2DEG' };
  assert.strictEqual(getMatchingQuantumHallCard(gaasCard)?.id, 'gaas_algaas');

  const mosfetCard = { id: 'card_si_mosfet', name: 'Transistor Lớp Đảo Silicon MOSFET' };
  assert.strictEqual(getMatchingQuantumHallCard(mosfetCard)?.id, 'silicon_mosfet');

  const inasCard = { id: 'card_inas_majorana', name: 'Giếng Lượng Tử InAs & Trạng Thái Majorana' };
  assert.strictEqual(getMatchingQuantumHallCard(inasCard)?.id, 'inas_quantum_well');

  const nonMatch = { id: 'card_water', name: 'Phân Tử Nước H2O' };
  assert.strictEqual(getMatchingQuantumHallCard(nonMatch), null);
});

// Test 12: SoundEngine Audio Integration
runTest('SoundEngine includes playQuantumHallPlateauLockBeep and playChiralEdgeCurrentWhoosh', () => {
  const soundEngineFile = path.resolve('src/audio/soundEngine.ts');
  const content = fs.readFileSync(soundEngineFile, 'utf8');
  assert.ok(content.includes('playQuantumHallPlateauLockBeep'), 'Must contain playQuantumHallPlateauLockBeep');
  assert.ok(content.includes('playChiralEdgeCurrentWhoosh'), 'Must contain playChiralEdgeCurrentWhoosh');
});

// Test 13: QuantumHallVisualizer Component Rendering Integrity
runTest('QuantumHallVisualizer.tsx component exists and includes required visualizer tabs', () => {
  const compFile = path.resolve('src/components/visualizations/QuantumHallVisualizer.tsx');
  assert.ok(fs.existsSync(compFile), 'Component file must exist');
  const content = fs.readFileSync(compFile, 'utf8');
  assert.ok(content.includes('plateaus_transport'), 'Must include plateaus transport tab');
  assert.ok(content.includes('landau_levels'), 'Must include landau levels tab');
  assert.ok(content.includes('chiral_edge_states'), 'Must include chiral edge states tab');
  assert.ok(content.includes('graphene_dirac'), 'Must include graphene dirac tab');
});

// Test 14: PeriodicCodexTab Section 33 Integration
runTest('PeriodicCodexTab integrates Section 33 and QUANTUM_HALL subtab', () => {
  const codexFile = path.resolve('src/components/PeriodicCodexTab.tsx');
  const content = fs.readFileSync(codexFile, 'utf8');
  assert.ok(content.includes('QUANTUM_HALL'), 'PeriodicCodexTab must handle QUANTUM_HALL tab');
  assert.ok(content.includes('QuantumHallVisualizer'), 'PeriodicCodexTab must render QuantumHallVisualizer');
  assert.ok(content.includes('SECTION 33: QUANTUM HALL EFFECT'), 'Must contain Section 33 header');
});

// Test 15: CardDetailModal Integration
runTest('CardDetailModal provides quick access to Quantum Hall Visualizer for matching cards', () => {
  const modalFile = path.resolve('src/components/cards/CardDetailModal.tsx');
  const content = fs.readFileSync(modalFile, 'utf8');
  assert.ok(content.includes('showQuantumHallModal'), 'CardDetailModal must declare showQuantumHallModal');
  assert.ok(content.includes('matchingQuantumHallMaterial'), 'CardDetailModal must compute matchingQuantumHallMaterial');
  assert.ok(content.includes('QuantumHallVisualizer'), 'CardDetailModal must render QuantumHallVisualizer modal');
});

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log(' MILESTONE 44: TEST SUITE 101 COMPLETED IN 100% HARMONY!');
console.log('======================================================================');
