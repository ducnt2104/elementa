// test-structural-elucidation-visualizer.mjs
// Test Suite 90: Multi-Spectroscopic Structural Identification & Constitutional Isomer Discrimination Engine
// Standards: IUPAC Gold Book & Vietnam GDPT 2018 (Hóa 11: Phương pháp tách biệt, tinh chế và xác định cấu trúc phân tử hợp chất hữu cơ)

import assert from 'assert';
import {
  ATOMIC_MASSES,
  ISOMER_CHALLENGE_SETS,
  calculateIHD,
  parseFormulaAndCalculateIHD,
  calculateElementalPercentComposition,
  calculateEmpiricalFormula,
  executeStepwiseElucidation,
} from '../src/domain/structuralElucidationEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 90: MULTI-SPECTROSCOPIC STRUCTURAL ELUCIDATION & ISOMER DISCRIMINATION');

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

// 1. IHD / DEGREE OF UNSATURATION FORMULA SATISFACTION
runTest('calculateIHD strictly enforces IUPAC formula IHD = C - H/2 + N/2 - X/2 + 1', () => {
  // Methane CH4: 1 - 2 + 1 = 0
  assert.strictEqual(calculateIHD({ carbon: 1, hydrogen: 4 }), 0);

  // Ethene C2H4: 2 - 2 + 1 = 1
  assert.strictEqual(calculateIHD({ carbon: 2, hydrogen: 4 }), 1);

  // Ethyne C2H2: 2 - 1 + 1 = 2
  assert.strictEqual(calculateIHD({ carbon: 2, hydrogen: 2 }), 2);

  // Pyridine C5H5N: 5 - 2.5 + 0.5 + 1 = 4
  assert.strictEqual(calculateIHD({ carbon: 5, hydrogen: 5, nitrogen: 1 }), 4);

  // Chloroethane C2H5Cl: 2 - 2.5 - 0.5 + 1 = 0
  assert.strictEqual(calculateIHD({ carbon: 2, hydrogen: 5, halogen: 1 }), 0);

  // Zero carbon safeguard
  assert.strictEqual(calculateIHD({ carbon: 0, hydrogen: 2 }), 0);
});

// 2. FORMULA PARSER FOR SATURATED HYDROCARBONS (IHD = 0)
runTest('parseFormulaAndCalculateIHD identifies saturated acyclic compounds (IHD = 0)', () => {
  const p1 = parseFormulaAndCalculateIHD('C3H8'); // Propane
  assert.strictEqual(p1.carbon, 3);
  assert.strictEqual(p1.hydrogen, 8);
  assert.strictEqual(p1.ihd, 0);

  const p2 = parseFormulaAndCalculateIHD('C2H6O'); // Ethanol or Dimethyl ether
  assert.strictEqual(p2.carbon, 2);
  assert.strictEqual(p2.hydrogen, 6);
  assert.strictEqual(p2.oxygen, 1);
  assert.strictEqual(p2.ihd, 0);
});

// 3. FORMULA PARSER FOR MONOUNSATURATED CARBONYLS (IHD = 1)
runTest('parseFormulaAndCalculateIHD calculates IHD = 1 for C3H6O and C2H4O2', () => {
  const p1 = parseFormulaAndCalculateIHD('C3H6O');
  assert.strictEqual(p1.carbon, 3);
  assert.strictEqual(p1.hydrogen, 6);
  assert.strictEqual(p1.oxygen, 1);
  assert.strictEqual(p1.ihd, 1);
  assert.ok(Math.abs(p1.molecularWeight - 58.08) < 0.2);

  const p2 = parseFormulaAndCalculateIHD('C2H4O2');
  assert.strictEqual(p2.carbon, 2);
  assert.strictEqual(p2.hydrogen, 4);
  assert.strictEqual(p2.oxygen, 2);
  assert.strictEqual(p2.ihd, 1);
  assert.ok(Math.abs(p2.molecularWeight - 60.05) < 0.2);
});

// 4. FORMULA PARSER FOR AROMATIC HYDROCARBONS (IHD = 4)
runTest('parseFormulaAndCalculateIHD accurately identifies benzene ring unsaturation (IHD = 4)', () => {
  const pBenzene = parseFormulaAndCalculateIHD('C6H6');
  assert.strictEqual(pBenzene.ihd, 4);

  const pToluene = parseFormulaAndCalculateIHD('C7H8');
  assert.strictEqual(pToluene.ihd, 4);

  const pXylene = parseFormulaAndCalculateIHD('C8H10');
  assert.strictEqual(pXylene.ihd, 4);
});

// 5. HALOGENATED & NITROGENOUS MOLECULES IHD
runTest('parseFormulaAndCalculateIHD correctly accounts for Halogens (decrease H) and Nitrogen (increase H)', () => {
  // 1,2-Dichloroethane C2H4Cl2: C=2, H=4, Cl=2 -> 2 - 2 - 1 + 1 = 0
  const pDCE = parseFormulaAndCalculateIHD('C2H4Cl2');
  assert.strictEqual(pDCE.halogen, 2);
  assert.strictEqual(pDCE.ihd, 0);

  // Aniline C6H7N: C=6, H=7, N=1 -> 6 - 3.5 + 0.5 + 1 = 4
  const pAniline = parseFormulaAndCalculateIHD('C6H7N');
  assert.strictEqual(pAniline.nitrogen, 1);
  assert.strictEqual(pAniline.ihd, 4);
});

// 6. ELEMENTAL PERCENT COMPOSITION CALCULATOR
runTest('calculateElementalPercentComposition computes accurate mass percentages summing to 100%', () => {
  const compEthanol = calculateElementalPercentComposition('C2H6O');
  assert.ok(compEthanol.percentC > 52.0 && compEthanol.percentC < 52.3); // ~52.14%
  assert.ok(compEthanol.percentH > 13.0 && compEthanol.percentH < 13.3); // ~13.13%
  assert.ok(compEthanol.percentO > 34.6 && compEthanol.percentO < 34.9); // ~34.73%

  const sum = compEthanol.percentC + compEthanol.percentH + (compEthanol.percentO || 0);
  assert.ok(Math.abs(sum - 100.0) < 0.1, `Sum should be ~100%, got ${sum}`);
});

// 7. EMPIRICAL FORMULA DERIVATION FROM MASS FRACTIONS
runTest('calculateEmpiricalFormula accurately deduces simplest integer atomic ratios', () => {
  // Ethanol percentages: C ~ 52.14%, H ~ 13.13%, O ~ 34.73%
  const resEth = calculateEmpiricalFormula({
    percentC: 52.14,
    percentH: 13.13,
    percentO: 34.73,
  });
  assert.strictEqual(resEth.ratios.C, 2);
  assert.strictEqual(resEth.ratios.H, 6);
  assert.strictEqual(resEth.ratios.O, 1);
  assert.strictEqual(resEth.empiricalFormula, 'C2H6O');

  // Acetone percentages: C ~ 62.04%, H ~ 10.41%, O ~ 27.55%
  const resAct = calculateEmpiricalFormula({
    percentC: 62.04,
    percentH: 10.41,
    percentO: 27.55,
  });
  assert.strictEqual(resAct.ratios.C, 3);
  assert.strictEqual(resAct.ratios.H, 6);
  assert.strictEqual(resAct.ratios.O, 1);
  assert.strictEqual(resAct.empiricalFormula, 'C3H6O');
});

// 8. STEPWISE DEDUCTIVE REASONING CHAIN GENERATION
runTest('executeStepwiseElucidation generates a complete 6-step analytical proof', () => {
  const res = executeStepwiseElucidation({
    composition: { percentC: 62.04, percentH: 10.41, percentO: 27.55 },
    molecularIonMz: 58,
    irKeyWaveNumbers: [1715],
    nmr1HSignalsCount: 1,
  });

  assert.ok(res.step1Empirical.includes('C3H6O'));
  assert.ok(res.step2MolecularFormula.includes('m/z = 58'));
  assert.strictEqual(res.step3IHD, 1);
  assert.ok(res.step4IRFunctionalGroupsVI.some(g => g.includes('Cacbonyl C=O')));
  assert.ok(res.step5NMRSymmetryInterpretationVI.includes('đối xứng'));
  assert.ok(res.step6IdentifiedCompoundVI.includes('Axeton'));
});

// 9. ISOMER SET A (C3H6O) DISCRIMINATION
runTest('ISOMER_CHALLENGE_SETS.set_C3H6O accurately discriminates 3 constitutional isomers', () => {
  const setA = ISOMER_CHALLENGE_SETS.set_C3H6O;
  assert.strictEqual(setA.isomers.length, 3);

  const acetone = setA.isomers.find(i => i.id === 'acetone');
  const propanal = setA.isomers.find(i => i.id === 'propanal');
  const allyl = setA.isomers.find(i => i.id === 'allyl_alcohol');

  assert.ok(acetone && propanal && allyl);

  // Acetone: 1 1H NMR signal (6H singlet), base peak m/z = 43
  assert.strictEqual(acetone?.nmr1HFingerprint.signalCount, 1);
  assert.strictEqual(acetone?.msFingerprint.basePeakMz, 43);
  assert.strictEqual(acetone?.irFingerprint.hasCarbonyl, true);

  // Propanal: 3 1H NMR signals, base peak m/z = 29
  assert.strictEqual(propanal?.nmr1HFingerprint.signalCount, 3);
  assert.strictEqual(propanal?.msFingerprint.basePeakMz, 29);
  assert.strictEqual(propanal?.irFingerprint.hasCarbonyl, true);

  // Allyl alcohol: no carbonyl, has alcohol OH and C=C
  assert.strictEqual(allyl?.irFingerprint.hasCarbonyl, false);
  assert.strictEqual(allyl?.irFingerprint.hasAlcoholOH, true);
  assert.strictEqual(allyl?.nmr1HFingerprint.signalCount, 4);
});

// 10. ISOMER SET B (C2H4O2) DISCRIMINATION
runTest('ISOMER_CHALLENGE_SETS.set_C2H4O2 discriminates Acetic Acid from Methyl Formate', () => {
  const setB = ISOMER_CHALLENGE_SETS.set_C2H4O2;
  assert.strictEqual(setB.isomers.length, 2);

  const acid = setB.isomers.find(i => i.id === 'acetic_acid');
  const ester = setB.isomers.find(i => i.id === 'methyl_formate');

  assert.ok(acid && ester);

  // Acetic acid: has acid OH (broad 2500-3300 cm-1) and peak at 11.85 ppm
  assert.strictEqual(acid?.irFingerprint.hasAcidOH, true);
  assert.ok(acid?.nmr1HFingerprint.signals.some(s => s.deltaPpm > 11.0));

  // Methyl formate: no acid OH, has ester C=O at 1740 cm-1, formyl proton at 8.05 ppm
  assert.strictEqual(ester?.irFingerprint.hasAcidOH, false);
  assert.ok(ester?.nmr1HFingerprint.signals.some(s => s.deltaPpm > 7.5 && s.deltaPpm < 9.0));
});

// 11. ISOMER SET C (C8H10) DISCRIMINATION
runTest('ISOMER_CHALLENGE_SETS.set_C8H10 discriminates p-Xylene from Ethylbenzene via 13C symmetry', () => {
  const setC = ISOMER_CHALLENGE_SETS.set_C8H10;
  const pXylene = setC.isomers.find(i => i.id === 'para_xylene');
  const ethylbenzene = setC.isomers.find(i => i.id === 'ethylbenzene');

  assert.ok(pXylene && ethylbenzene);

  // p-Xylene: D2h inversion center collapses 13C signals to 2!
  assert.strictEqual(pXylene?.nmr13CFingerprint.signalCount, 2);
  assert.strictEqual(pXylene?.nmr1HFingerprint.signalCount, 2);

  // Ethylbenzene: 6 13C signals!
  assert.strictEqual(ethylbenzene?.nmr13CFingerprint.signalCount, 6);
  assert.strictEqual(ethylbenzene?.nmr1HFingerprint.signalCount, 3);
});

// 12. CATALOG VALIDATION & NON-EMPTY PROOFS
runTest('All ISOMER_CHALLENGE_SETS contain non-empty four-pillar spectroscopic fingerprints', () => {
  const sets = Object.values(ISOMER_CHALLENGE_SETS);
  assert.ok(sets.length >= 3);

  for (const s of sets) {
    assert.ok(s.setId, 'Has set ID');
    assert.ok(s.titleVI, 'Has Vietnamese title');
    assert.ok(s.molecularFormula, 'Has molecular formula');
    assert.ok(s.molecularWeight > 0, 'MW > 0');
    assert.ok(s.discriminationGuideVI.length >= 2, 'Has discrimination guide');

    for (const iso of s.isomers) {
      assert.ok(iso.id, 'Has isomer ID');
      assert.ok(iso.name, 'Has English name');
      assert.ok(iso.vietnameseName, 'Has Vietnamese name');
      assert.ok(iso.msFingerprint.molecularIonMz > 0, 'MS [M]+ > 0');
      assert.ok(iso.irFingerprint.keyBandsCm.length > 0, 'IR bands > 0');
      assert.ok(iso.nmr1HFingerprint.signals.length > 0, '1H NMR signals > 0');
      assert.ok(iso.nmr13CFingerprint.signals.length > 0, '13C NMR signals > 0');
    }
  }
});

// 13. SOUND ENGINE PROCEDURAL METHODS
runTest('SoundEngine includes analytical deduction success and isomer compare swoosh triggers', () => {
  assert.strictEqual(typeof sound.playAnalyticalDeductionSuccess, 'function');
  assert.strictEqual(typeof sound.playIsomerCompareSwoosh, 'function');

  sound.playAnalyticalDeductionSuccess();
  sound.playIsomerCompareSwoosh();
});

// 14. EDGE CASE SAFEGUARDS
runTest('parseFormulaAndCalculateIHD and calculateEmpiricalFormula handle empty or malformed inputs safely', () => {
  const pEmpty = parseFormulaAndCalculateIHD('');
  assert.strictEqual(pEmpty.carbon, 0);
  assert.strictEqual(pEmpty.ihd, 0);

  const empEmpty = calculateEmpiricalFormula({ percentC: 0, percentH: 0 });
  assert.strictEqual(empEmpty.empiricalWeight, 0);
});

// 15. END-TO-END ANALYTICAL STRUCTURE ELUCIDATION
runTest('End-to-End Problem Solving: successfully deduces Propanal vs Acetone from raw spectral facts', () => {
  // Fact set 1: %C=62.04%, %H=10.41%, %O=27.55%, MS=58, IR=1730, 2720, 2820 cm-1, 1H NMR=3 signals with CHO peak
  const sol1 = executeStepwiseElucidation({
    composition: { percentC: 62.04, percentH: 10.41, percentO: 27.55 },
    molecularIonMz: 58,
    irKeyWaveNumbers: [1730, 2720, 2820],
    nmr1HSignalsCount: 3,
    hasAldehydePeak1H: true,
  });
  assert.ok(sol1.step6IdentifiedCompoundVI.includes('Propanal'));

  // Fact set 2: Same composition, but IR=1715 cm-1 (no Fermi), 1H NMR=1 signal (singlet 6H)
  const sol2 = executeStepwiseElucidation({
    composition: { percentC: 62.04, percentH: 10.41, percentO: 27.55 },
    molecularIonMz: 58,
    irKeyWaveNumbers: [1715],
    nmr1HSignalsCount: 1,
    hasAldehydePeak1H: false,
  });
  assert.ok(sol2.step6IdentifiedCompoundVI.includes('Axeton'));
});

console.log(`\n🎉 SUITE 90 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
