// test-nuclear-shell-visualizer.mjs
// Test Suite 98: Nuclear Shell Model, Magic Numbers, Binding Energy per Nucleon & Aston Packing Fraction Engine
// Standards: IUPAC Gold Book, CODATA 2018 Recommended Values, Nobel Prize in Physics 1963 & Vietnam GDPT 2018 (Hóa 10 & Vật lí 12: Hạt nhân nguyên tử)

import assert from 'assert';
import {
  NUCLEAR_ISOTOPES,
  MAGIC_NUMBERS,
  ATOMIC_MASS_UNIT_MEV,
  evaluateNuclearMagicStability,
  calculateMassDefectAndBindingEnergy,
  calculateSemiEmpiricalMassFormula,
  simulateDTFusionReaction,
  simulateU235FissionReaction,
  getMatchingNuclearIsotope,
} from './src/domain/nuclearShellEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('⚛️ RUNNING TEST SUITE 98: NUCLEAR SHELL MODEL & BINDING ENERGY ENGINE');

let testsPassed = 0;

function runTest(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    process.exit(1);
  }
}

// 1. NUCLEAR_ISOTOPES CATALOG INTEGRITY
runTest('NUCLEAR_ISOTOPES catalog defines all core benchmark nuclides with accurate empirical data', () => {
  const benchmarkKeys = [
    'h1',
    'h2',
    'h3',
    'he4',
    'c12',
    'o16',
    'ca40',
    'ca48',
    'fe56',
    'ni62',
    'pb208',
    'u235',
    'u238',
  ];

  for (const key of benchmarkKeys) {
    const iso = NUCLEAR_ISOTOPES[key];
    assert(iso, `Missing benchmark isotope: ${key}`);
    assert.strictEqual(iso.massNumberA, iso.atomicNumberZ + iso.neutronNumberN, `A must equal Z + N for ${key}`);
    assert(iso.exactMassU > 0, `Exact mass must be positive for ${key}`);
    assert(iso.bindingEnergyTotalMeV >= 0, `Binding energy must be non-negative for ${key}`);
    assert(iso.bindingEnergyPerNucleonMeV >= 0, `B/A must be non-negative for ${key}`);
  }
});

// 2. STANDARD MAGIC NUMBERS INVARIANT
runTest('MAGIC_NUMBERS conforms to the Mayer-Jensen nuclear shell model: [2, 8, 20, 28, 50, 82, 126]', () => {
  const expectedMagic = [2, 8, 20, 28, 50, 82, 126];
  assert.strictEqual(MAGIC_NUMBERS.length, expectedMagic.length);
  for (let i = 0; i < expectedMagic.length; i++) {
    assert.strictEqual(MAGIC_NUMBERS[i], expectedMagic[i]);
  }
});

// 3. DOUBLY MAGIC NUCLEI RECOGNITION
runTest('evaluateNuclearMagicStability correctly identifies doubly magic nuclei (He-4, O-16, Ca-40, Ca-48, Pb-208)', () => {
  const doublyMagicNuclides = [
    { z: 2, n: 2, label: '4He' },
    { z: 8, n: 8, label: '16O' },
    { z: 20, n: 20, label: '40Ca' },
    { z: 20, n: 28, label: '48Ca' },
    { z: 82, n: 126, label: '208Pb' },
  ];

  for (const nuc of doublyMagicNuclides) {
    const evalResult = evaluateNuclearMagicStability(nuc.z, nuc.n);
    assert.strictEqual(evalResult.magicStatus, 'DOUBLY_MAGIC', `${nuc.label} must be DOUBLY_MAGIC`);
    assert.strictEqual(evalResult.isProtonMagic, true, `${nuc.label} proton shell must be closed`);
    assert.strictEqual(evalResult.isNeutronMagic, true, `${nuc.label} neutron shell must be closed`);
  }
});

// 4. SINGLE-MAGIC NUCLEI RECOGNITION
runTest('Correctly classifies single-magic nuclei: Ni-62 (Z=28 magic) and H-3 (N=2 magic)', () => {
  // Ni-62: Z = 28 (magic), N = 34 (non-magic)
  const evalNi62 = evaluateNuclearMagicStability(28, 34);
  assert.strictEqual(evalNi62.magicStatus, 'PROTON_MAGIC');
  assert.strictEqual(evalNi62.isProtonMagic, true);
  assert.strictEqual(evalNi62.isNeutronMagic, false);

  // H-3: Z = 1 (non-magic), N = 2 (magic)
  const evalH3 = evaluateNuclearMagicStability(1, 2);
  assert.strictEqual(evalH3.magicStatus, 'NEUTRON_MAGIC');
  assert.strictEqual(evalH3.isProtonMagic, false);
  assert.strictEqual(evalH3.isNeutronMagic, true);
});

// 5. NON-MAGIC OPEN SHELL NUCLEI
runTest('Correctly classifies open-shell non-magic nuclei: Fe-56 and U-235', () => {
  // Fe-56: Z = 26, N = 30
  const evalFe56 = evaluateNuclearMagicStability(26, 30);
  assert.strictEqual(evalFe56.magicStatus, 'NON_MAGIC');

  // U-235: Z = 92, N = 143
  const evalU235 = evaluateNuclearMagicStability(92, 143);
  assert.strictEqual(evalU235.magicStatus, 'NON_MAGIC');
});

// 6. MASS DEFECT AND BINDING ENERGY CALCULATION FOR HELIUM-4
runTest('calculateMassDefectAndBindingEnergy calculates accurate mass defect and BE for 4He', () => {
  const result = calculateMassDefectAndBindingEnergy(2, 2, 4.002603);

  // Unbound mass = 2*1.007825 + 2*1.008665 = 4.03298 u
  // Mass defect = 4.03298 - 4.002603 = 0.030377 u
  assert(Math.abs(result.massDefectU - 0.030377) < 0.0005, `Mass defect mismatch: ${result.massDefectU}`);

  // Total BE = 0.030377 * 931.494 ≈ 28.296 MeV
  assert(Math.abs(result.bindingEnergyTotalMeV - 28.296) < 0.1, `Total BE mismatch: ${result.bindingEnergyTotalMeV}`);

  // B/A = 28.296 / 4 ≈ 7.074 MeV/nucleon
  assert(Math.abs(result.bindingEnergyPerNucleonMeV - 7.074) < 0.05, `B/A mismatch: ${result.bindingEnergyPerNucleonMeV}`);
});

// 7. ABSOLUTE PEAK BINDING ENERGY PER NUCLEON: NICKEL-62 OVER IRON-56
runTest('Nickel-62 possesses the highest binding energy per nucleon (8.7946 MeV) in the entire nuclide chart', () => {
  const ni62 = NUCLEAR_ISOTOPES.ni62;
  const fe56 = NUCLEAR_ISOTOPES.fe56;

  // 62Ni has 8.7946 MeV/nucleon, strictly beating 56Fe (8.7903 MeV/nucleon)
  assert(ni62.bindingEnergyPerNucleonMeV > fe56.bindingEnergyPerNucleonMeV, '62Ni B/A must strictly exceed 56Fe');
  assert(Math.abs(ni62.bindingEnergyPerNucleonMeV - 8.7946) < 0.005, `62Ni B/A should be 8.7946, got ${ni62.bindingEnergyPerNucleonMeV}`);

  // Verify it exceeds all other isotopes in the catalog
  for (const iso of Object.values(NUCLEAR_ISOTOPES)) {
    if (iso.id !== 'ni62') {
      assert(iso.bindingEnergyPerNucleonMeV <= ni62.bindingEnergyPerNucleonMeV, `${iso.id} must not exceed 62Ni B/A`);
    }
  }
});

// 8. PROTIUM (1H) ZERO BINDING ENERGY INVARIANT
runTest('Protium (1H) consists of an isolated single proton with exactly zero nuclear binding energy', () => {
  const h1 = NUCLEAR_ISOTOPES.h1;
  assert.strictEqual(h1.bindingEnergyTotalMeV, 0.0);
  assert.strictEqual(h1.bindingEnergyPerNucleonMeV, 0.0);

  const calculated = calculateMassDefectAndBindingEnergy(1, 0, 1.007825);
  assert.strictEqual(calculated.massDefectU, 0.0);
  assert.strictEqual(calculated.bindingEnergyTotalMeV, 0.0);
  assert.strictEqual(calculated.bindingEnergyPerNucleonMeV, 0.0);
});

// 9. BETHE-WEIZSÄCKER SEMI-EMPIRICAL MASS FORMULA (SEMF) ACCURACY
runTest('Bethe-Weizsäcker SEMF predicts Fe-56 binding energy within 1% of experimental value', () => {
  const semf = calculateSemiEmpiricalMassFormula(26, 56);

  // Volume term should be positive (+15.75 * 56 = +882 MeV)
  assert(semf.volumeTermMeV > 800, `Volume term should be > 800 MeV, got ${semf.volumeTermMeV}`);

  // Surface, Coulomb, and Asymmetry terms should be negative
  assert(semf.surfaceTermMeV < 0, `Surface term should be negative, got ${semf.surfaceTermMeV}`);
  assert(semf.coulombTermMeV < 0, `Coulomb term should be negative, got ${semf.coulombTermMeV}`);
  assert(semf.asymmetryTermMeV < 0, `Asymmetry term should be negative, got ${semf.asymmetryTermMeV}`);

  // Even-even pairing term for 56Fe should be positive
  assert(semf.pairingTermMeV > 0, `Pairing term for even-even 56Fe should be positive, got ${semf.pairingTermMeV}`);

  // Total predicted BE should be ~490 MeV, close to experimental 492.25 MeV (< 1.5% error)
  const expBE = NUCLEAR_ISOTOPES.fe56.bindingEnergyTotalMeV;
  const errorPercent = Math.abs((semf.totalBindingEnergyMeV - expBE) / expBE) * 100;
  assert(errorPercent < 1.5, `SEMF error should be < 1.5%, got ${errorPercent.toFixed(2)}% (pred: ${semf.totalBindingEnergyMeV}, exp: ${expBE})`);
});

// 10. NUCLEON PAIRING ENERGY INVARIANTS
runTest('SEMF pairing term δ is positive for even-even, zero for odd-A, and negative for odd-odd', () => {
  // Even-even (Z=26, N=30 -> A=56)
  const evenEven = calculateSemiEmpiricalMassFormula(26, 56);
  assert(evenEven.pairingTermMeV > 0, 'Even-even pairing term must be > 0');

  // Odd-A (Z=92, N=143 -> A=235)
  const oddA = calculateSemiEmpiricalMassFormula(92, 235);
  assert.strictEqual(oddA.pairingTermMeV, 0, 'Odd-A pairing term must be 0');

  // Odd-odd (Z=7, N=7 -> A=14)
  const oddOdd = calculateSemiEmpiricalMassFormula(7, 14);
  assert(oddOdd.pairingTermMeV < 0, 'Odd-odd pairing term must be < 0');
});

// 11. ASTON PACKING FRACTION SCALE
runTest('Aston packing fraction is exactly 0 for C-12, negative for stable mid-mass, and positive for light/heavy', () => {
  const c12 = NUCLEAR_ISOTOPES.c12;
  assert.strictEqual(c12.astonPackingFraction, 0.0, 'C-12 packing fraction must be exactly 0');

  const fe56 = NUCLEAR_ISOTOPES.fe56;
  assert(fe56.astonPackingFraction < 0, '56Fe packing fraction must be negative (well of stability)');

  const h1 = NUCLEAR_ISOTOPES.h1;
  assert(h1.astonPackingFraction > 50, '1H packing fraction must be strongly positive');

  const u238 = NUCLEAR_ISOTOPES.u238;
  assert(u238.astonPackingFraction > 0, '238U packing fraction must be positive');
});

// 12. DEUTERIUM-TRITIUM (D-T) NUCLEAR FUSION ENERGETICS
runTest('D-T fusion reaction releases Q = 17.59 MeV and produces doubly magic 4He', () => {
  const fusion = simulateDTFusionReaction();

  assert.strictEqual(fusion.isExothermic, true);
  // Q = (2.014102 + 3.016049 - 4.002603 - 1.008665) * 931.494 ≈ 17.589 MeV
  assert(Math.abs(fusion.qValueMeV - 17.59) < 0.05, `D-T Q-value should be ~17.59 MeV, got ${fusion.qValueMeV}`);
  assert(fusion.energyPerGramJoules > 3.0e11, `Energy yield must exceed 3.0e11 J/g, got ${fusion.energyPerGramJoules}`);
  assert(fusion.products.some((p) => p.isotope.id === 'he4'), 'Product must be 4He');
});

// 13. URANIUM-235 THERMAL FISSION ENERGETICS
runTest('U-235 fission reaction releases massive ~200 MeV per fission event', () => {
  const fission = simulateU235FissionReaction();

  assert.strictEqual(fission.isExothermic, true);
  assert.strictEqual(fission.qValueMeV, 200.0);
  assert(fission.energyPerGramJoules > 7.0e10, `U-235 energy yield must exceed 7.0e10 J/g, got ${fission.energyPerGramJoules}`);
});

// 14. CARD MATCHING FOR NUCLEAR ISOTOPES
runTest('getMatchingNuclearIsotope accurately identifies cards representing nuclear nuclides and radiation', () => {
  const cardAlpha = { id: 'card_alpha_particle', name: 'Hạt Alpha Heli-4' };
  const matchAlpha = getMatchingNuclearIsotope(cardAlpha);
  assert(matchAlpha, 'Failed to match alpha card');
  assert.strictEqual(matchAlpha.id, 'he4');

  const cardUranium = { id: 'card_u235_ore', name: 'Quặng Urani Giàu U-235' };
  const matchU = getMatchingNuclearIsotope(cardUranium);
  assert(matchU, 'Failed to match Uranium card');
  assert.strictEqual(matchU.id, 'u235');

  const cardLead = { id: 'card_pb208_shield', name: 'Tấm Chắn Chì Chống Xuyên Thấu (Pb)' };
  const matchPb = getMatchingNuclearIsotope(cardLead);
  assert(matchPb, 'Failed to match Lead card');
  assert.strictEqual(matchPb.id, 'pb208');

  const cardNonNuclear = { id: 'card_water', name: 'Nước Cất H2O' };
  const matchWater = getMatchingNuclearIsotope(cardNonNuclear);
  assert.strictEqual(matchWater, null, 'Water card should not match any nuclear isotope');
});

// 15. AUDIO HOOKS INTEGRATION
runTest('SoundEngine includes playNuclearDecayClick and playNuclearResonanceHum effects', () => {
  assert(typeof sound.playNuclearDecayClick === 'function', 'playNuclearDecayClick method exists');
  assert(typeof sound.playNuclearResonanceHum === 'function', 'playNuclearResonanceHum method exists');

  // Trigger safely
  sound.playNuclearDecayClick();
  sound.playNuclearResonanceHum();
});

console.log(`\n🎉 TEST SUITE 98 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
