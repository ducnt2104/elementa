// test-crystal-field-theory-visualizer.mjs
// Test Suite 99: Transition Metal Crystal Field Theory (CFT), Octahedral/Tetrahedral Splitting, High-Spin/Low-Spin & Spectrochemical Series Engine
// Standards: IUPAC Compendium of Chemical Terminology (Gold Book), Tanabe-Sugano Diagrams & Vietnam GDPT 2018 (Hóa 12 Chuyên đề: Phức chất & Phổ hấp thụ d-d)

import assert from 'assert';
import {
  SPECTROCHEMICAL_LIGANDS,
  TRANSITION_METAL_CATIONS,
  calculateCrystalFieldSplitting,
  getComplementaryColor,
  getMatchingCoordinationCard,
} from './src/domain/crystalFieldTheoryEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🔮 RUNNING TEST SUITE 99: TRANSITION METAL CRYSTAL FIELD THEORY (CFT) ENGINE');

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

// 1. SPECTROCHEMICAL SERIES CATALOG MONOTONICITY
runTest('SPECTROCHEMICAL_LIGANDS catalog strictly adheres to IUPAC splitting factor ordering', () => {
  const ligandsInOrder = [
    'iodide',
    'chloride',
    'fluoride',
    'hydroxide',
    'water',
    'ammonia',
    'ethylenediamine',
    'nitrite',
    'cyanide',
    'carbon_monoxide',
  ];

  let prevFactor = 0;
  for (const ligId of ligandsInOrder) {
    const lig = SPECTROCHEMICAL_LIGANDS[ligId];
    assert(lig, `Missing ligand: ${ligId}`);
    assert(lig.splittingFactor > prevFactor, `Ligand ${ligId} splitting factor (${lig.splittingFactor}) must exceed previous (${prevFactor})`);
    prevFactor = lig.splittingFactor;
  }
});

// 2. TRANSITION METAL CATIONS CATALOG INTEGRITY
runTest('TRANSITION_METAL_CATIONS catalog defines d1 to d10 configurations with base Delta_o and P', () => {
  const cationKeys = ['ti3', 'v3', 'cr3', 'cr2', 'fe3', 'fe2', 'co3', 'co2', 'ni2', 'cu2', 'zn2'];

  for (const key of cationKeys) {
    const m = TRANSITION_METAL_CATIONS[key];
    assert(m, `Missing cation: ${key}`);
    assert(m.dElectronCount >= 1 && m.dElectronCount <= 10, `Invalid d count for ${key}`);
    assert(m.baseDeltaOCmInv >= 0, `Delta_o must be non-negative for ${key}`);
  }
});

// 3. OCTAHEDRAL SPLITTING ENERGY CONSERVATION & BARYCENTER
runTest('Octahedral splitting separates d-orbitals into t2g (-0.4) and eg (+0.6) around barycenter', () => {
  const res = calculateCrystalFieldSplitting('cr3', 'water', 'OCTAHEDRAL');
  assert.strictEqual(res.geometry, 'OCTAHEDRAL');
  assert.strictEqual(res.coordinationNumber, 6);
  assert.strictEqual(res.dElectronCount, 3);
  assert.strictEqual(res.t2gElectrons, 3);
  assert.strictEqual(res.egElectrons, 0);

  // CFSE = 3 * (-0.4) + 0 * (+0.6) = -1.2 Delta_o
  assert.strictEqual(res.cfseDeltaUnits, -1.2);
});

// 4. TETRAHEDRAL SPLITTING INVERSION & RATIO INVARIANT Delta_t = 4/9 Delta_o
runTest('Tetrahedral splitting inverts orbital levels and scales by 4/9 relative to octahedral', () => {
  const resOct = calculateCrystalFieldSplitting('co2', 'water', 'OCTAHEDRAL');
  const resTet = calculateCrystalFieldSplitting('co2', 'water', 'TETRAHEDRAL');

  assert.strictEqual(resTet.coordinationNumber, 4);
  const expectedDeltaT = Math.round(resOct.deltaEnergyCmInv * (4 / 9));
  assert(Math.abs(resTet.deltaEnergyCmInv - expectedDeltaT) <= 2, `Delta_t should be ~4/9 Delta_o (${expectedDeltaT}), got ${resTet.deltaEnergyCmInv}`);
  assert.strictEqual(resTet.spinState, 'HIGH_SPIN', 'Tetrahedral complexes are virtually always High-Spin');
});

// 5. SQUARE PLANAR GEOMETRY AND d8 COMPLEX DIAMAGNETISM
runTest('Square planar geometry for Ni(II) with CN- produces diamagnetic (n = 0) complex', () => {
  const res = calculateCrystalFieldSplitting('ni2', 'cyanide', 'SQUARE_PLANAR');
  assert.strictEqual(res.geometry, 'SQUARE_PLANAR');
  assert.strictEqual(res.unpairedElectronsCount, 0, 'd8 square planar Ni(II) with CN- must be diamagnetic');
  assert.strictEqual(res.magneticBehavior, 'DIAMAGNETIC');
  assert.strictEqual(res.spinOnlyMagneticMomentBM, 0.0);
});

// 6. HIGH-SPIN VS LOW-SPIN DIVERGENCE FOR d6 IRON(II)
runTest('d6 Fe(II) branches into High-Spin with H2O (n=4) and Low-Spin with CN- (n=0)', () => {
  // [Fe(H2O)6]2+: Weak-field H2O -> High-Spin (t2g^4 eg^2)
  const feH2O = calculateCrystalFieldSplitting('fe2', 'water', 'OCTAHEDRAL');
  assert.strictEqual(feH2O.spinState, 'HIGH_SPIN');
  assert.strictEqual(feH2O.t2gElectrons, 4);
  assert.strictEqual(feH2O.egElectrons, 2);
  assert.strictEqual(feH2O.unpairedElectronsCount, 4);
  assert.strictEqual(feH2O.magneticBehavior, 'PARAMAGNETIC');
  assert.strictEqual(feH2O.cfseDeltaUnits, -0.4); // (-0.4 * 4 + 0.6 * 2) = -0.4

  // [Fe(CN)6]4-: Strong-field CN- -> Low-Spin (t2g^6 eg^0)
  const feCN = calculateCrystalFieldSplitting('fe2', 'cyanide', 'OCTAHEDRAL');
  assert.strictEqual(feCN.spinState, 'LOW_SPIN');
  assert.strictEqual(feCN.t2gElectrons, 6);
  assert.strictEqual(feCN.egElectrons, 0);
  assert.strictEqual(feCN.unpairedElectronsCount, 0);
  assert.strictEqual(feCN.magneticBehavior, 'DIAMAGNETIC');
  assert.strictEqual(feCN.cfseDeltaUnits, -2.4); // (-0.4 * 6) = -2.4
});

// 7. SPIN-ONLY MAGNETIC MOMENT FORMULA VERIFICATION
runTest('Spin-only magnetic moment strictly adheres to mu_s = sqrt(n(n+2)) Bohr Magnetons', () => {
  // n = 1: sqrt(3) ≈ 1.73
  const ti3 = calculateCrystalFieldSplitting('ti3', 'water', 'OCTAHEDRAL');
  assert.strictEqual(ti3.unpairedElectronsCount, 1);
  assert(Math.abs(ti3.spinOnlyMagneticMomentBM - 1.73) < 0.02);

  // n = 5: sqrt(35) ≈ 5.92 ([Fe(H2O)6]3+)
  const fe3H2O = calculateCrystalFieldSplitting('fe3', 'water', 'OCTAHEDRAL');
  assert.strictEqual(fe3H2O.unpairedElectronsCount, 5);
  assert(Math.abs(fe3H2O.spinOnlyMagneticMomentBM - 5.92) < 0.02);
});

// 8. CHROMIUM(III) d3 NON-DIVERGENCE INVARIANT
runTest('Chromium(III) d3 configuration t2g^3 eg^0 is invariant to ligand field strength', () => {
  const crWeak = calculateCrystalFieldSplitting('cr3', 'iodide', 'OCTAHEDRAL');
  const crStrong = calculateCrystalFieldSplitting('cr3', 'cyanide', 'OCTAHEDRAL');

  assert.strictEqual(crWeak.t2gElectrons, 3);
  assert.strictEqual(crWeak.egElectrons, 0);
  assert.strictEqual(crStrong.t2gElectrons, 3);
  assert.strictEqual(crStrong.egElectrons, 0);
  assert.strictEqual(crWeak.unpairedElectronsCount, 3);
  assert.strictEqual(crStrong.unpairedElectronsCount, 3);
});

// 9. ZINC(II) d10 COLORLESS DIAMAGNETIC INVARIANT
runTest('Zinc(II) d10 configuration t2g^6 eg^4 has CFSE = 0 and produces colorless diamagnetic complexes', () => {
  const zn = calculateCrystalFieldSplitting('zn2', 'water', 'OCTAHEDRAL');
  assert.strictEqual(zn.dElectronCount, 10);
  assert.strictEqual(zn.t2gElectrons, 6);
  assert.strictEqual(zn.egElectrons, 4);
  assert.strictEqual(zn.unpairedElectronsCount, 0);
  assert.strictEqual(zn.magneticBehavior, 'DIAMAGNETIC');
  assert.strictEqual(zn.cfseDeltaUnits, 0.0);
});

// 10. TITANIUM(III) d1 OPTICAL ABSORPTION & COLOR
runTest('[Ti(H2O)6]3+ absorbs blue-green light (~493 nm) transmitting characteristic purple color', () => {
  const ti = calculateCrystalFieldSplitting('ti3', 'water', 'OCTAHEDRAL');
  // Delta_o = 20,300 cm^-1 -> lambda = 10^7 / 20300 ≈ 493 nm
  assert(Math.abs(ti.absorptionWavelengthNm - 493) < 10, `Absorption wavelength should be ~493 nm, got ${ti.absorptionWavelengthNm}`);
  assert(ti.transmittedComplementaryColorNameVI.includes('Đỏ') || ti.transmittedComplementaryColorNameVI.includes('Cam') || ti.transmittedComplementaryColorNameVI.includes('Tím'), 'Transmitted color matches spectrum');
});

// 11. JAHN-TELLER DISTORTION IN COPPER(II) d9
runTest('Copper(II) d9 configuration t2g^6 eg^3 triggers strong tetragonal elongation Jahn-Teller distortion', () => {
  const cu = calculateCrystalFieldSplitting('cu2', 'water', 'OCTAHEDRAL');
  assert.strictEqual(cu.jahnTellerType, 'STRONG_ELONGATION', 'd9 Cu(II) must exhibit STRONG_ELONGATION');
  assert(cu.jahnTellerExplanationVI.includes('Jahn-Teller'), 'Explanation mentions Jahn-Teller effect');
  assert(cu.jahnTellerExplanationVI.includes('trục z'), 'Explanation mentions z-axis elongation');
});

// 12. COBALT(II) OCTAHEDRAL VS TETRAHEDRAL COLOR COMPARISON
runTest('Cobalt(II) tetrahedral complex [CoCl4]2- has distinct coordination number and splitting from octahedral', () => {
  const coOct = calculateCrystalFieldSplitting('co2', 'water', 'OCTAHEDRAL');
  const coTet = calculateCrystalFieldSplitting('co2', 'chloride', 'TETRAHEDRAL');

  assert.strictEqual(coOct.coordinationNumber, 6);
  assert.strictEqual(coTet.coordinationNumber, 4);
  assert(coTet.deltaEnergyCmInv < coOct.deltaEnergyCmInv, 'Tetrahedral splitting must be significantly smaller than octahedral');
});

// 13. COBALT(III) d6 STRONG FIELD AMMINE COMPLEX
runTest('[Co(NH3)6]3+ forms diamagnetic low-spin complex with Delta_o exceeding pairing energy', () => {
  const co3NH3 = calculateCrystalFieldSplitting('co3', 'ammonia', 'OCTAHEDRAL');
  assert.strictEqual(co3NH3.spinState, 'LOW_SPIN');
  assert.strictEqual(co3NH3.unpairedElectronsCount, 0);
  assert.strictEqual(co3NH3.magneticBehavior, 'DIAMAGNETIC');
});

// 14. CARD MATCHING FOR COORDINATION COMPLEXES
runTest('getMatchingCoordinationCard accurately identifies coordination cards for Cu, Fe, and Co', () => {
  const cardCu = { id: 'card_cu_tetraammine', name: 'Phức Đồng Tứ Amoniac [Cu(NH3)4]2+' };
  const matchCu = getMatchingCoordinationCard(cardCu);
  assert(matchCu, 'Failed to match Cu complex card');
  assert.strictEqual(matchCu.metal.id, 'cu2');
  assert.strictEqual(matchCu.ligand.id, 'ammonia');

  const cardFe = { id: 'card_iron_cyanide', name: 'Kali Feroayanua K4[Fe(CN)6]' };
  const matchFe = getMatchingCoordinationCard(cardFe);
  assert(matchFe, 'Failed to match Fe complex card');
  assert.strictEqual(matchFe.metal.id, 'fe2');
  assert.strictEqual(matchFe.ligand.id, 'cyanide');

  const cardNonCoord = { id: 'card_methane', name: 'Khí Metan CH4' };
  const matchNon = getMatchingCoordinationCard(cardNonCoord);
  assert.strictEqual(matchNon, null, 'Non-coordination card should return null');
});

// 15. AUDIO HOOKS INTEGRATION
runTest('SoundEngine includes playCoordinationColorShiftChime and playLigandExchangeDrip effects', () => {
  assert(typeof sound.playCoordinationColorShiftChime === 'function', 'playCoordinationColorShiftChime exists');
  assert(typeof sound.playLigandExchangeDrip === 'function', 'playLigandExchangeDrip exists');

  // Safely trigger
  sound.playCoordinationColorShiftChime();
  sound.playLigandExchangeDrip();
});

console.log(`\n🎉 TEST SUITE 99 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
