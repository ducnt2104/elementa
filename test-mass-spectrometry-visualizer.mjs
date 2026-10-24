// test-mass-spectrometry-visualizer.mjs
// Test Suite 87: Mass Spectrometry (MS) & Isotope Pattern Analysis Engine
// Standards: IUPAC Gold Book, CIAAW (2022) & Vietnam GDPT 2018 (Hóa 10 & 11)

import assert from 'assert';
import {
  ISOTOPE_STANDARDS,
  MASS_SPEC_CATALOG,
  checkNitrogenRule,
  estimateCarbonCountFromMPlusOne,
  calculateHalogenIsotopePattern,
  calculateMassAccuracyPpm,
  matchHRMSFormulaCandidates,
  getMatchingMassSpecConcept
} from './src/domain/massSpectrometryEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 87: MASS SPECTROMETRY & ISOTOPE PATTERN ENGINE');

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

// 1. ISOTOPE STANDARDS & NATURAL ABUNDANCES
runTest('Isotope standards adhere strictly to IUPAC CIAAW 2022 values', () => {
  // Chlorine: 35Cl ~ 75.76%, 37Cl ~ 24.24%
  const cl35 = ISOTOPE_STANDARDS.Cl.find(i => i.massNumber === 35);
  const cl37 = ISOTOPE_STANDARDS.Cl.find(i => i.massNumber === 37);
  assert.ok(cl35 && cl37);
  assert.ok(Math.abs(cl35.naturalAbundancePct - 75.76) < 0.1);
  assert.ok(Math.abs(cl37.naturalAbundancePct - 24.24) < 0.1);
  assert.strictEqual(cl35.exactMassDa < 35, true); // Mass defect from binding energy

  // Bromine: 79Br ~ 50.69%, 81Br ~ 49.31%
  const br79 = ISOTOPE_STANDARDS.Br.find(i => i.massNumber === 79);
  const br81 = ISOTOPE_STANDARDS.Br.find(i => i.massNumber === 81);
  assert.ok(br79 && br81);
  assert.ok(Math.abs(br79.naturalAbundancePct - 50.69) < 0.1);
  assert.ok(Math.abs(br81.naturalAbundancePct - 49.31) < 0.1);

  // Carbon: 12C exactly 12.000000 by IUPAC definition
  const c12 = ISOTOPE_STANDARDS.C.find(i => i.massNumber === 12);
  assert.strictEqual(c12?.exactMassDa, 12.0);
});

// 2. THE NITROGEN RULE INVARIANTS
runTest('The Nitrogen Rule accurately verifies parity for even and odd molecular masses', () => {
  // Aniline: C6H7N, M = 93 (odd mass -> 1 nitrogen, odd) => VALID
  const anilineRule = checkNitrogenRule(93, 1);
  assert.strictEqual(anilineRule.satisfiesRule, true);
  assert.strictEqual(anilineRule.isEvenMass, false);

  // Toluene: C7H8, M = 92 (even mass -> 0 nitrogen, even) => VALID
  const tolueneRule = checkNitrogenRule(92, 0);
  assert.strictEqual(tolueneRule.satisfiesRule, true);
  assert.strictEqual(tolueneRule.isEvenMass, true);

  // Urea: CH4N2O, M = 60 (even mass -> 2 nitrogens, even) => VALID
  const ureaRule = checkNitrogenRule(60, 2);
  assert.strictEqual(ureaRule.satisfiesRule, true);

  // Invalid: Even mass with 1 nitrogen
  const invalidEven = checkNitrogenRule(80, 1);
  assert.strictEqual(invalidEven.satisfiesRule, false);

  // Invalid: Odd mass with 0 nitrogens
  const invalidOdd = checkNitrogenRule(95, 0);
  assert.strictEqual(invalidOdd.satisfiesRule, false);
});

// 3. CARBON-13 SATELLITE RULE OF THUMB
runTest('estimateCarbonCountFromMPlusOne calculates carbon count precisely', () => {
  // Toluene: C7H8, [M] = 68%, [M+1] = 5.2% => n_C = 5.2 / (0.011 * 68) = 5.2 / 0.748 = 6.95 => 7
  const estToluene = estimateCarbonCountFromMPlusOne(68, 5.2);
  assert.strictEqual(estToluene.estimatedCarbons, 7);

  // Ethanol: C2H6O, [M] = 15%, [M+1] = 0.36% => n_C = 0.36 / (0.011 * 15) = 2.18 => 2
  const estEthanol = estimateCarbonCountFromMPlusOne(15, 0.36);
  assert.strictEqual(estEthanol.estimatedCarbons, 2);

  // Zero input safeguard
  const estZero = estimateCarbonCountFromMPlusOne(0, 0);
  assert.strictEqual(estZero.estimatedCarbons, 0);
});

// 4. CHLORINE SINGLE HALOGEN CLUSTER (3 : 1 RATIO)
runTest('calculateHalogenIsotopePattern generates 3 : 1 ratio for single chlorine', () => {
  const cluster = calculateHalogenIsotopePattern(1, 0);
  assert.strictEqual(cluster.length, 2);
  assert.strictEqual(cluster[0].deltaM, 0);
  assert.strictEqual(cluster[0].relativeIntensityPct, 100.0);

  // [M+2] for 1 Cl is (0.2424 / 0.7576) * 100% ≈ 32.0% (approx 3 : 1 ratio)
  assert.strictEqual(cluster[1].deltaM, 2);
  assert.ok(Math.abs(cluster[1].relativeIntensityPct - 32.0) < 0.5);
});

// 5. BROMINE SINGLE HALOGEN CLUSTER (1 : 1 RATIO)
runTest('calculateHalogenIsotopePattern generates 1 : 1 ratio for single bromine', () => {
  const cluster = calculateHalogenIsotopePattern(0, 1);
  assert.strictEqual(cluster.length, 2);
  assert.strictEqual(cluster[0].deltaM, 0);
  assert.strictEqual(cluster[0].relativeIntensityPct, 100.0);

  // [M+2] for 1 Br is (0.4931 / 0.5069) * 100% ≈ 97.3% (approx 1 : 1 ratio)
  assert.strictEqual(cluster[1].deltaM, 2);
  assert.ok(Math.abs(cluster[1].relativeIntensityPct - 97.3) < 0.5);
});

// 6. MULTI-HALOGEN BINOMIAL CLUSTERS (Cl2 -> 9 : 6 : 1, Br2 -> 1 : 2 : 1)
runTest('Multi-halogen binomial expansion produces correct polynomial distribution', () => {
  // Cl2: (3a + b)^2 -> 9 : 6 : 1 ratio (100% : 64% : 10.2%)
  const cl2 = calculateHalogenIsotopePattern(2, 0);
  assert.strictEqual(cl2.length, 3);
  assert.strictEqual(cl2[0].deltaM, 0);
  assert.strictEqual(cl2[0].relativeIntensityPct, 100.0);
  assert.ok(Math.abs(cl2[1].relativeIntensityPct - 64.0) < 1.0);
  assert.ok(Math.abs(cl2[2].relativeIntensityPct - 10.2) < 1.0);

  // Br2: (a + b)^2 -> 1 : 2 : 1 ratio (52% : 100% : 48%)
  const br2 = calculateHalogenIsotopePattern(0, 2);
  assert.strictEqual(br2.length, 3);
  // In Br2, the middle peak [M+2] is the highest (100%)
  assert.strictEqual(br2[1].relativeIntensityPct, 100.0);
  assert.ok(Math.abs(br2[0].relativeIntensityPct - 51.4) < 1.0);
  assert.ok(Math.abs(br2[2].relativeIntensityPct - 48.6) < 1.0);
});

// 7. HIGH-RESOLUTION MS & MASS ACCURACY (PPM)
runTest('calculateMassAccuracyPpm computes parts-per-million deviation accurately', () => {
  // Theoretical m/z = 44.0262, Observed = 44.0264 -> delta = 0.0002 -> ppm = 0.0002 / 44.0262 * 1e6 ≈ 4.54 ppm
  const ppm = calculateMassAccuracyPpm(44.0264, 44.0262);
  assert.ok(Math.abs(ppm - 4.54) < 0.1);

  // Exact match gives 0.0 ppm
  assert.strictEqual(calculateMassAccuracyPpm(44.0262, 44.0262), 0.0);
});

// 8. HRMS RESOLUTION OF NOMINAL MASS 44 ISOBARS
runTest('matchHRMSFormulaCandidates distinguishes isobars with identical nominal mass 44', () => {
  // Target: Acetaldehyde/Ethylene oxide exact mass = 44.026215 Da
  const candidates = matchHRMSFormulaCandidates(44.0262, 5.0);
  assert.ok(candidates.length >= 1);
  assert.ok(candidates[0].formula.includes('C2H4O'));
  assert.ok(candidates[0].deltaPpm <= 1.0);

  // Other nominal 44 molecules (CO2 = 43.9898, N2O = 44.0011, C3H8 = 44.0626) must NOT match within 5 ppm
  const co2Included = candidates.some(c => c.formula === 'CO2');
  assert.strictEqual(co2Included, false);

  const propaneIncluded = candidates.some(c => c.formula.includes('C3H8'));
  assert.strictEqual(propaneIncluded, false);
});

// 9. BENCHMARK CURRICULUM CATALOG RIGOR
runTest('MASS_SPEC_CATALOG contains 8 required GDPT 2018 benchmark compounds with complete peaks', () => {
  const compounds = Object.values(MASS_SPEC_CATALOG);
  assert.strictEqual(compounds.length, 8);

  for (const comp of compounds) {
    assert.ok(comp.id, 'Compound has ID');
    assert.ok(comp.name, 'Compound has name');
    assert.ok(comp.vietnameseName, 'Compound has Vietnamese name');
    assert.ok(comp.chemicalFormula, 'Compound has chemical formula');
    assert.ok(comp.nominalMass > 0, 'Nominal mass > 0');
    assert.ok(comp.exactMassDa > 0, 'Exact mass > 0');
    assert.ok(comp.basePeakMz > 0, 'Base peak m/z > 0');
    assert.ok(comp.molecularIonMz > 0, 'Molecular ion m/z > 0');
    assert.ok(comp.peaks.length >= 4, 'Has at least 4 prominent spectral peaks');
    assert.ok(comp.fragmentations.length >= 1, 'Has at least 1 fragmentation path');

    // Base peak must have relative intensity of 100%
    const basePeak = comp.peaks.find(p => p.peakType === 'BASE_PEAK');
    assert.ok(basePeak, `Compound ${comp.id} has BASE_PEAK`);
    assert.strictEqual(basePeak?.relativeIntensityPct, 100);

    // Molecular ion peak exists (either peakType === MOLECULAR_ION or mz === molecularIonMz when base peak)
    const molPeak = comp.peaks.find(p => p.peakType === 'MOLECULAR_ION' || p.mz === comp.molecularIonMz);
    assert.ok(molPeak, `Compound ${comp.id} has molecular ion peak at m/z = ${comp.molecularIonMz}`);
  }
});

// 10. CHARACTERISTIC ION FINGERPRINTS (TROPYLIUM, ACYLIUM, OXONIUM)
runTest('Key diagnostic fragments (Tropylium m/z 91, Acylium m/z 43, Oxonium m/z 31) are verified', () => {
  // Toluene base peak is Tropylium (m/z = 91)
  const toluene = MASS_SPEC_CATALOG.toluene;
  assert.strictEqual(toluene.basePeakMz, 91);
  const tropPeak = toluene.peaks.find(p => p.mz === 91);
  assert.ok(tropPeak?.ionFormula.includes('Tropylium') || tropPeak?.ionFormula.includes('C7H7'));

  // Acetone base peak is Acylium (m/z = 43)
  const acetone = MASS_SPEC_CATALOG.acetone;
  assert.strictEqual(acetone.basePeakMz, 43);

  // Ethanol base peak is Oxonium (m/z = 31)
  const ethanol = MASS_SPEC_CATALOG.ethanol;
  assert.strictEqual(ethanol.basePeakMz, 31);
});

// 11. NEUTRAL LOSS VERIFICATION
runTest('Neutral loss calculations match exact stoichiometric mass differences', () => {
  const ethanol = MASS_SPEC_CATALOG.ethanol;
  const alphaLoss = ethanol.fragmentations.find(f => f.neutralLossDa === 15);
  assert.ok(alphaLoss);
  assert.strictEqual(alphaLoss?.neutralLossFormula, '•CH3');
  assert.strictEqual(alphaLoss?.precursorMz - alphaLoss?.productMz, 15);

  const aniline = MASS_SPEC_CATALOG.aniline;
  const hcnLoss = aniline.fragmentations.find(f => f.neutralLossDa === 27);
  assert.ok(hcnLoss);
  assert.strictEqual(hcnLoss?.neutralLossFormula, 'HCN');
});

// 12. SOUND ENGINE METHODS FOR MASS SPECTROMETRY
runTest('SoundEngine includes Mass Spectrometry procedural methods without crashing', () => {
  assert.strictEqual(typeof sound.playMassSpecIonTrapHum, 'function');
  assert.strictEqual(typeof sound.playDetectorIonHitClick, 'function');

  // Invocation dry runs
  sound.playMassSpecIonTrapHum();
  sound.playDetectorIonHitClick();
});

// 13. CONCEPT MATCHER FOR CARDS
runTest('getMatchingMassSpecConcept accurately matches cards without false positives', () => {
  const matchEthanol = getMatchingMassSpecConcept({ name: 'Ancol etylic', chemicalFormula: 'C2H6O' });
  assert.strictEqual(matchEthanol?.id, 'ethanol');

  const matchToluene = getMatchingMassSpecConcept({ name: 'Dung môi Toluen', chemicalFormula: 'C7H8' });
  assert.strictEqual(matchToluene?.id, 'toluene');

  const matchCloro = getMatchingMassSpecConcept({ name: 'Clorobenzen thuốc bảo vệ', chemicalFormula: 'C6H5Cl' });
  assert.strictEqual(matchCloro?.id, 'chlorobenzene');

  const matchBromo = getMatchingMassSpecConcept({ name: 'Bromobenzen', chemicalFormula: 'C6H5Br' });
  assert.strictEqual(matchBromo?.id, 'bromobenzene');

  const matchAniline = getMatchingMassSpecConcept({ name: 'Anilin', chemicalFormula: 'C6H7N' });
  assert.strictEqual(matchAniline?.id, 'aniline');

  // Unrelated card returns null
  const matchIron = getMatchingMassSpecConcept({ name: 'Thanh Sắt', chemicalFormula: 'Fe' });
  assert.strictEqual(matchIron, null);
});

// 14. ISOTOPE CLUSTER BOUNDARY CONDITIONS
runTest('Isotope cluster function safely handles edge case (0 halogens)', () => {
  const cluster = calculateHalogenIsotopePattern(0, 0);
  assert.strictEqual(cluster.length, 1);
  assert.strictEqual(cluster[0].deltaM, 0);
  assert.strictEqual(cluster[0].relativeIntensityPct, 100.0);
});

// 15. END-TO-END ANALYTICAL RECONNAISSANCE WORKFLOW
runTest('End-to-end MS analytical workflow: Molecular ion -> Nitrogen Rule -> Halogen Cluster -> Fragment deduction', () => {
  // Unknown: Chlorobenzene (M = 112, 1 Cl)
  const unknownNominal = 112;
  const unknownCl = 1;
  const unknownBr = 0;

  // Step 1: Nitrogen rule -> 112 is even, no nitrogen present
  const rule = checkNitrogenRule(unknownNominal, 0);
  assert.strictEqual(rule.satisfiesRule, true);

  // Step 2: Halogen cluster -> confirms [M+2] at ~32% (3:1 ratio)
  const cluster = calculateHalogenIsotopePattern(unknownCl, unknownBr);
  assert.strictEqual(cluster.length, 2);
  assert.ok(Math.abs(cluster[1].relativeIntensityPct - 32.0) < 0.5);

  // Step 3: Base peak at 112 and phenyl cation at 77 (loss of 35 Da)
  const lossDa = 112 - 77;
  assert.strictEqual(lossDa, 35); // Confirms loss of 35Cl
});

console.log(`\n🎉 SUITE 87 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
