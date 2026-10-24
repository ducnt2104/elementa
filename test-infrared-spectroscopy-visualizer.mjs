// test-infrared-spectroscopy-visualizer.mjs
// Test Suite 88: Infrared Spectroscopy (IR) & Molecular Vibration Engine
// Standards: IUPAC Gold Book & Vietnam GDPT 2018 (Hóa 11: Phổ hồng ngoại xác định nhóm chức)

import assert from 'assert';
import {
  IR_BENCHMARK_CATALOG,
  IR_DIAGNOSTIC_REGIONS,
  calculateHarmonicWaveNumber,
  calculateVibrationalDegreesOfFreedom,
  calculateIsotopeVibrationShift,
  identifyFunctionalGroupsFromPeaks,
  getMatchingIRConcept
} from './src/domain/infraredSpectroscopyEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 88: INFRARED SPECTROSCOPY & MOLECULAR VIBRATION ENGINE');

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

// 1. HOOKE'S LAW HARMONIC OSCILLATOR & BOND ORDER INVARIANTS
runTest("Hooke's Law calculates wave numbers strictly following bond order: C≡C > C=C > C-C", () => {
  // Carbon-Carbon bonds: m1 = 12, m2 = 12
  const wnSingle = calculateHarmonicWaveNumber(12, 12, 1); // C-C
  const wnDouble = calculateHarmonicWaveNumber(12, 12, 2); // C=C
  const wnTriple = calculateHarmonicWaveNumber(12, 12, 3); // C≡C

  assert.ok(wnSingle >= 1150 && wnSingle <= 1250, `C-C single bond (~1200 cm-1), got ${wnSingle}`);
  assert.ok(wnDouble >= 1620 && wnDouble <= 1750, `C=C double bond (~1680 cm-1), got ${wnDouble}`);
  assert.ok(wnTriple >= 2000 && wnTriple <= 2150, `C≡C triple bond (~2060 cm-1), got ${wnTriple}`);

  assert.ok(wnTriple > wnDouble, 'Triple bond vibrates faster than double bond');
  assert.ok(wnDouble > wnSingle, 'Double bond vibrates faster than single bond');
});

// 2. HOOKE'S LAW REDUCED MASS INVARIANTS
runTest("Hooke's Law calculates wave numbers strictly following reduced mass: C-H > C-C > C-Cl", () => {
  // m1 = 12 (Carbon)
  const wnCH = calculateHarmonicWaveNumber(12, 1, 1); // C-H: light hydrogen (μ ~ 0.92)
  const wnCC = calculateHarmonicWaveNumber(12, 12, 1); // C-C: carbon (μ = 6.0)
  const wnCCl = calculateHarmonicWaveNumber(12, 35, 1); // C-Cl: heavy chlorine (μ ~ 8.94)
  const wnCClRelaxed = calculateHarmonicWaveNumber(12, 35, 1, 2.75e5); // C-Cl with realistic lower force constant

  assert.ok(wnCH >= 2950 && wnCH <= 3100, `C-H bond (~3030 cm-1), got ${wnCH}`);
  assert.ok(wnCC >= 1150 && wnCC <= 1250, `C-C bond (~1200 cm-1), got ${wnCC}`);
  assert.ok(wnCCl >= 900 && wnCCl <= 1020, `C-Cl bond idealized Hooke single bond (~975 cm-1), got ${wnCCl}`);
  assert.ok(wnCClRelaxed >= 680 && wnCClRelaxed <= 760, `C-Cl bond realistic weakened force constant (~725 cm-1), got ${wnCClRelaxed}`);

  assert.ok(wnCH > wnCC, 'Light C-H vibrates at much higher wave number than C-C');
  assert.ok(wnCC > wnCCl, 'C-C vibrates at higher wave number than heavy C-Cl');
});

// 3. ISOTOPIC SUBSTITUTION SHIFT (C-H TO C-D RED SHIFT)
runTest('calculateIsotopeVibrationShift demonstrates diagnostic C-D red-shift factor ~1.36', () => {
  const baseWnCH = 3032;
  const muCH = (12 * 1) / 13; // 0.923 amu
  const muCD = (12 * 2) / 14; // 1.714 amu

  const shift = calculateIsotopeVibrationShift(baseWnCH, muCH, muCD);
  assert.ok(shift.shiftedWaveNumberCm >= 2180 && shift.shiftedWaveNumberCm <= 2260, `C-D (~2220 cm-1), got ${shift.shiftedWaveNumberCm}`);
  assert.ok(Math.abs(shift.shiftRatio - 0.734) < 0.05, `Shift ratio should be ~0.734 (1 / 1.36)`);
});

// 4. VIBRATIONAL DEGREES OF FREEDOM INVARIANTS
runTest('calculateVibrationalDegreesOfFreedom strictly enforces 3N - 6 (non-linear) and 3N - 5 (linear)', () => {
  // H2O: 3 atoms, non-linear -> 3(3) - 6 = 3 modes
  assert.strictEqual(calculateVibrationalDegreesOfFreedom(3, false), 3);

  // CO2: 3 atoms, linear -> 3(3) - 5 = 4 modes
  assert.strictEqual(calculateVibrationalDegreesOfFreedom(3, true), 4);

  // Methane CH4: 5 atoms, non-linear -> 3(5) - 6 = 9 modes
  assert.strictEqual(calculateVibrationalDegreesOfFreedom(5, false), 9);

  // Acetylene C2H2: 4 atoms, linear -> 3(4) - 5 = 7 modes
  assert.strictEqual(calculateVibrationalDegreesOfFreedom(4, true), 7);

  // Ethanol C2H5OH: 9 atoms, non-linear -> 3(9) - 6 = 21 modes
  assert.strictEqual(calculateVibrationalDegreesOfFreedom(9, false), 21);
});

// 5. 4 DIAGNOSTIC REGIONS COMPLETENESS
runTest('IR_DIAGNOSTIC_REGIONS contains all 4 standard regions covering 4000 to 400 cm⁻¹', () => {
  assert.strictEqual(IR_DIAGNOSTIC_REGIONS.length, 4);

  const region1 = IR_DIAGNOSTIC_REGIONS[0];
  assert.strictEqual(region1.minWaveNumberCm, 2500);
  assert.strictEqual(region1.maxWaveNumberCm, 4000);
  assert.ok(region1.primaryBonds.includes('O-H'));

  const region2 = IR_DIAGNOSTIC_REGIONS[1];
  assert.strictEqual(region2.minWaveNumberCm, 2000);
  assert.strictEqual(region2.maxWaveNumberCm, 2500);
  assert.ok(region2.primaryBonds.includes('C≡C'));

  const region3 = IR_DIAGNOSTIC_REGIONS[2];
  assert.strictEqual(region3.minWaveNumberCm, 1500);
  assert.strictEqual(region3.maxWaveNumberCm, 2000);
  assert.ok(region3.primaryBonds.includes('C=O'));

  const region4 = IR_DIAGNOSTIC_REGIONS[3];
  assert.strictEqual(region4.minWaveNumberCm, 400);
  assert.strictEqual(region4.maxWaveNumberCm, 1500);
  assert.ok(region4.primaryBonds.includes('C-O'));
});

// 6. FUNCTIONAL GROUP DETECTOR ACCURACY
runTest('identifyFunctionalGroupsFromPeaks detects Carbonyl, Alcohol, Carboxylic Acid, Amine, and Alkyne', () => {
  // Test 1: Ketone peak at 1715 cm-1
  const ketoneRes = identifyFunctionalGroupsFromPeaks([1715]);
  assert.strictEqual(ketoneRes.hasCarbonyl, true);
  assert.strictEqual(ketoneRes.hasAlcohol, false);
  assert.strictEqual(ketoneRes.hasAcid, false);

  // Test 2: Alcohol peak at 3350 cm-1
  const alcoholRes = identifyFunctionalGroupsFromPeaks([3350]);
  assert.strictEqual(alcoholRes.hasAlcohol, true);
  assert.strictEqual(alcoholRes.hasCarbonyl, false);
  assert.strictEqual(alcoholRes.hasAcid, false);

  // Test 3: Carboxylic acid with both C=O (1710) and O-H (3000)
  const acidRes = identifyFunctionalGroupsFromPeaks([1710, 3000]);
  assert.strictEqual(acidRes.hasCarbonyl, true);
  assert.strictEqual(acidRes.hasAlcohol, true);
  assert.strictEqual(acidRes.hasAcid, true);

  // Test 4: Primary Amine peak at 3360 cm-1
  const amineRes = identifyFunctionalGroupsFromPeaks([3360]);
  assert.strictEqual(amineRes.hasAmine, true);

  // Test 5: Terminal Alkyne peaks at 3310 cm-1 and 2120 cm-1
  const alkyneRes = identifyFunctionalGroupsFromPeaks([3310, 2120]);
  assert.strictEqual(alkyneRes.hasAlkyne, true);
});

// 7. BENCHMARK CURRICULUM CATALOG INTEGRITY
runTest('IR_BENCHMARK_CATALOG contains 8 required GDPT 2018 compounds with accurate peak signatures', () => {
  const compounds = Object.values(IR_BENCHMARK_CATALOG);
  assert.strictEqual(compounds.length, 8);

  for (const comp of compounds) {
    assert.ok(comp.id, 'Compound has ID');
    assert.ok(comp.name, 'Compound has English name');
    assert.ok(comp.vietnameseName, 'Compound has Vietnamese name');
    assert.ok(comp.chemicalFormula, 'Compound has formula');
    assert.ok(comp.functionalGroupVI, 'Compound has functional group');
    assert.ok(comp.atomCount > 0, 'Atom count > 0');
    assert.ok(comp.diagnosticPeaks.length >= 2, 'Has at least 2 diagnostic IR peaks');
    assert.ok(comp.practicalApplications.length >= 2, 'Has at least 2 applications');
  }
});

// 8. ETHANOL IR FINGERPRINT INTEGRITY
runTest('Ethanol features broad O-H (3350 cm-1) and lacks Carbonyl C=O peak', () => {
  const ethanol = IR_BENCHMARK_CATALOG.ethanol;
  const ohPeak = ethanol.diagnosticPeaks.find(p => p.bond === 'O-H');
  assert.ok(ohPeak, 'Ethanol has O-H peak');
  assert.strictEqual(ohPeak?.intensity, 'BROAD_STRONG');
  assert.strictEqual(ohPeak?.waveNumberCm, 3350);

  // Must not have C=O peak
  const coPeak = ethanol.diagnosticPeaks.find(p => p.bond.includes('C=O'));
  assert.strictEqual(coPeak, undefined);
});

// 9. ACETONE IR FINGERPRINT INTEGRITY
runTest('Acetone features sharp intense C=O (1715 cm-1) and lacks broad O-H band', () => {
  const acetone = IR_BENCHMARK_CATALOG.acetone;
  const coPeak = acetone.diagnosticPeaks.find(p => p.bond === 'C=O');
  assert.ok(coPeak, 'Acetone has C=O peak');
  assert.strictEqual(coPeak?.intensity, 'VERY_STRONG');
  assert.strictEqual(coPeak?.waveNumberCm, 1715);

  // Must not have O-H peak
  const ohPeak = acetone.diagnosticPeaks.find(p => p.bond.includes('O-H'));
  assert.strictEqual(ohPeak, undefined);
});

// 10. ACETIC ACID DIME DIALECTIC
runTest('Acetic acid features giant broad O-H mountain (2500-3300 cm-1) and C=O at 1710 cm-1', () => {
  const acid = IR_BENCHMARK_CATALOG.acetic_acid;
  const ohPeak = acid.diagnosticPeaks.find(p => p.bond.includes('O-H'));
  assert.ok(ohPeak, 'Acetic acid has broad O-H peak');
  assert.strictEqual(ohPeak?.minWaveNumberCm, 2500);
  assert.strictEqual(ohPeak?.maxWaveNumberCm, 3300);

  const coPeak = acid.diagnosticPeaks.find(p => p.bond === 'C=O');
  assert.ok(coPeak);
  assert.strictEqual(coPeak?.waveNumberCm, 1710);
});

// 11. ACETALDEHYDE FERMI DOUBLET
runTest('Acetaldehyde features distinct Fermi doublet at 2720 and 2820 cm-1', () => {
  const aldehyde = IR_BENCHMARK_CATALOG.acetaldehyde;
  const fermi1 = aldehyde.diagnosticPeaks.find(p => p.waveNumberCm === 2720);
  const fermi2 = aldehyde.diagnosticPeaks.find(p => p.waveNumberCm === 2820);
  assert.ok(fermi1, 'Acetaldehyde has Fermi peak at 2720 cm-1');
  assert.ok(fermi2, 'Acetaldehyde has Fermi peak at 2820 cm-1');
  assert.ok(fermi1?.bond.includes('anđehit'));
});

// 12. SOUND ENGINE INTEGRATION
runTest('SoundEngine includes Infrared procedural methods without crashing', () => {
  assert.strictEqual(typeof sound.playInfraredLaserChirp, 'function');
  assert.strictEqual(typeof sound.playMolecularVibrationHarmonic, 'function');

  // Invocations
  sound.playInfraredLaserChirp();
  sound.playMolecularVibrationHarmonic();
});

// 13. CARD MATCHER SERVICE ACCURACY
runTest('getMatchingIRConcept matches cards accurately without false positives', () => {
  const matchEthanol = getMatchingIRConcept({ name: 'Ancol Etylic', chemicalFormula: 'C2H5OH' });
  assert.strictEqual(matchEthanol?.id, 'ethanol');

  const matchAcetone = getMatchingIRConcept({ name: 'Dung môi Axeton', chemicalFormula: 'CH3COCH3' });
  assert.strictEqual(matchAcetone?.id, 'acetone');

  const matchAcid = getMatchingIRConcept({ name: 'Giấm ăn Axit Axetic', chemicalFormula: 'CH3COOH' });
  assert.strictEqual(matchAcid?.id, 'acetic_acid');

  const matchEster = getMatchingIRConcept({ name: 'Etyl axetat mùi chuối chín', chemicalFormula: 'CH3COOC2H5' });
  assert.strictEqual(matchEster?.id, 'ethyl_acetate');

  const matchAmine = getMatchingIRConcept({ name: 'Etylamin khí', chemicalFormula: 'C2H5NH2' });
  assert.strictEqual(matchAmine?.id, 'ethylamine');

  // Generic card returns null
  const matchSalt = getMatchingIRConcept({ name: 'Muối ăn', chemicalFormula: 'NaCl' });
  assert.strictEqual(matchSalt, null);
});

// 14. HOOKE'S LAW EDGE CASE SAFEGUARDS
runTest('Harmonic wave number calculator handles zero or negative masses safely', () => {
  assert.strictEqual(calculateHarmonicWaveNumber(0, 12, 1), 0);
  assert.strictEqual(calculateHarmonicWaveNumber(12, -1, 1), 0);
  assert.strictEqual(calculateVibrationalDegreesOfFreedom(1, false), 0);
});

// 15. END-TO-END FUNCTIONAL GROUP DISCRIMINATION
runTest('End-to-end IR analytical workflow: successfully distinguishes 4 carbonyl isomers/congeners', () => {
  // Acetone: C=O at 1715, no O-H, no Fermi
  const acetonePks = [1715];
  const rAcetone = identifyFunctionalGroupsFromPeaks(acetonePks);
  assert.strictEqual(rAcetone.hasCarbonyl, true);
  assert.strictEqual(rAcetone.hasAlcohol, false);

  // Acetic acid: C=O at 1710, broad O-H at 3000
  const acidPks = [1710, 3000];
  const rAcid = identifyFunctionalGroupsFromPeaks(acidPks);
  assert.strictEqual(rAcid.hasAcid, true);

  // Acetaldehyde: C=O at 1730, Fermi peaks at 2720, 2820
  const aldehydePks = [1730, 2720, 2820];
  const rAldehyde = identifyFunctionalGroupsFromPeaks(aldehydePks);
  assert.strictEqual(rAldehyde.hasCarbonyl, true);

  // Ethanol: O-H at 3350, no C=O
  const ethanolPks = [3350];
  const rEthanol = identifyFunctionalGroupsFromPeaks(ethanolPks);
  assert.strictEqual(rEthanol.hasAlcohol, true);
  assert.strictEqual(rEthanol.hasCarbonyl, false);
});

console.log(`\n🎉 SUITE 88 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
