// test-nmr-spectroscopy-visualizer.mjs
// Test Suite 89: Nuclear Magnetic Resonance (¹H & ¹³C NMR) Spectroscopy Engine
// Standards: IUPAC Recommendations & Vietnam GDPT 2018 (Hóa 11: Xác định cấu trúc phân tử hợp chất hữu cơ)

import assert from 'assert';
import {
  GYROMAGNETIC_RATIOS,
  NUCLEAR_SPIN_CATALOG,
  PROTON_DIAGNOSTIC_REGIONS,
  CARBON_DIAGNOSTIC_REGIONS,
  NMR_BENCHMARK_CATALOG,
  calculateLarmorFrequencyMHz,
  calculateChemicalShiftPpm,
  calculateFreqOffsetHz,
  calculatePascalTriangleRatios,
  getMultiplicityFromNeighborCount,
  calculateMultipletPeakOffsetsPpm,
  classifyChemicalShiftRegion,
  deduceMolecularMotifsFromNMR,
  getMatchingNMRConcept,
} from './src/domain/nmrSpectroscopyEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 89: NUCLEAR MAGNETIC RESONANCE (¹H & ¹³C NMR) ENGINE');

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

// 1. NUCLEAR SPIN QUANTUM NUMBERS & NMR ACTIVITY
runTest('NUCLEAR_SPIN_CATALOG enforces spin I = 1/2 for 1H, 13C, 19F, 31P and NMR-inactivity for 12C, 16O', () => {
  assert.strictEqual(NUCLEAR_SPIN_CATALOG['1H'].spinQuantumNumber, 0.5);
  assert.strictEqual(NUCLEAR_SPIN_CATALOG['1H'].isNMRActive, true);

  assert.strictEqual(NUCLEAR_SPIN_CATALOG['13C'].spinQuantumNumber, 0.5);
  assert.strictEqual(NUCLEAR_SPIN_CATALOG['13C'].isNMRActive, true);

  assert.strictEqual(NUCLEAR_SPIN_CATALOG['12C'].spinQuantumNumber, 0.0);
  assert.strictEqual(NUCLEAR_SPIN_CATALOG['12C'].isNMRActive, false);

  assert.strictEqual(NUCLEAR_SPIN_CATALOG['16O'].spinQuantumNumber, 0.0);
  assert.strictEqual(NUCLEAR_SPIN_CATALOG['16O'].isNMRActive, false);

  assert.strictEqual(NUCLEAR_SPIN_CATALOG['19F'].spinQuantumNumber, 0.5);
  assert.strictEqual(NUCLEAR_SPIN_CATALOG['31P'].spinQuantumNumber, 0.5);
});

// 2. LARMOR PRECESSION FREQUENCY (ν0 = γ·B0 / 2π)
runTest('calculateLarmorFrequencyMHz accurately calculates resonance frequencies at standard magnetic fields', () => {
  // Proton at 7.05 T -> ~300 MHz
  const freqH_300 = calculateLarmorFrequencyMHz('1H', 7.046);
  assert.ok(Math.abs(freqH_300 - 300.0) < 1.0, `Expected ~300 MHz, got ${freqH_300}`);

  // Proton at 11.74 T -> ~500 MHz
  const freqH_500 = calculateLarmorFrequencyMHz('1H', 11.744);
  assert.ok(Math.abs(freqH_500 - 500.0) < 1.0, `Expected ~500 MHz, got ${freqH_500}`);

  // Carbon-13 at 11.74 T -> ~125.7 MHz (γ_H / γ_C ~ 3.976)
  const freqC_500 = calculateLarmorFrequencyMHz('13C', 11.744);
  assert.ok(Math.abs(freqC_500 - 125.7) < 1.0, `Expected ~125.7 MHz for 13C, got ${freqC_500}`);

  // Zero field yields 0
  assert.strictEqual(calculateLarmorFrequencyMHz('1H', 0), 0);
});

// 3. CHEMICAL SHIFT BIDIRECTIONAL CONVERSION (ppm <-> Hz)
runTest('Chemical shift conversion strictly satisfies δ = Δν / ν0 and Δν = δ · ν0', () => {
  const spectrometerFreqMHz = 500.0; // 500 MHz spectrometer
  const deltaFreqHz = 1845.0; // 1845 Hz from TMS

  const ppm = calculateChemicalShiftPpm(deltaFreqHz, spectrometerFreqMHz);
  assert.strictEqual(ppm, 3.69); // e.g., -CH2- of ethanol

  const backToHz = calculateFreqOffsetHz(ppm, spectrometerFreqMHz);
  assert.strictEqual(backToHz, 1845.0);

  // Safeguard: zero spectrometer frequency
  assert.strictEqual(calculateChemicalShiftPpm(500, 0), 0);
});

// 4. PASCAL'S TRIANGLE MULTIPLET SPLITTING RATIOS
runTest('calculatePascalTriangleRatios strictly yields binomial coefficients (n+1 rule)', () => {
  assert.deepStrictEqual(calculatePascalTriangleRatios(0), [1]); // Singlet
  assert.deepStrictEqual(calculatePascalTriangleRatios(1), [1, 1]); // Doublet
  assert.deepStrictEqual(calculatePascalTriangleRatios(2), [1, 2, 1]); // Triplet
  assert.deepStrictEqual(calculatePascalTriangleRatios(3), [1, 3, 3, 1]); // Quartet
  assert.deepStrictEqual(calculatePascalTriangleRatios(4), [1, 4, 6, 4, 1]); // Quintet
  assert.deepStrictEqual(calculatePascalTriangleRatios(5), [1, 5, 10, 10, 5, 1]); // Sextet
  assert.deepStrictEqual(calculatePascalTriangleRatios(6), [1, 6, 15, 20, 15, 6, 1]); // Septet
});

// 5. MULTIPLICITY DERIVATION FROM NEIGHBOR PROTON COUNT
runTest('getMultiplicityFromNeighborCount correctly assigns labels and line counts', () => {
  const s = getMultiplicityFromNeighborCount(0);
  assert.strictEqual(s.type, 's');
  assert.strictEqual(s.lines, 1);

  const d = getMultiplicityFromNeighborCount(1);
  assert.strictEqual(d.type, 'd');
  assert.strictEqual(d.lines, 2);

  const t = getMultiplicityFromNeighborCount(2);
  assert.strictEqual(t.type, 't');
  assert.strictEqual(t.lines, 3);

  const q = getMultiplicityFromNeighborCount(3);
  assert.strictEqual(q.type, 'q');
  assert.strictEqual(q.lines, 4);

  const sept = getMultiplicityFromNeighborCount(6);
  assert.strictEqual(sept.type, 'sept');
  assert.strictEqual(sept.lines, 7);
});

// 6. MULTIPLET PEAK OFFSETS IN PPM WITH COUPLING CONSTANT J
runTest('calculateMultipletPeakOffsetsPpm symmetrically spaces multiplet lines around center ppm', () => {
  const centerPpm = 1.25;
  const J = 7.0; // 7.0 Hz
  const spectrometerFreq = 500.0; // 500 MHz -> spacing = 7.0 / 500 = 0.014 ppm
  const neighborCount = 2; // Triplet: 3 lines

  const lines = calculateMultipletPeakOffsetsPpm(centerPpm, neighborCount, J, spectrometerFreq);
  assert.strictEqual(lines.length, 3);

  // Line 1: 1.25 + 0.014 = 1.264
  // Line 2: 1.250
  // Line 3: 1.25 - 0.014 = 1.236
  assert.strictEqual(lines[1].ppm, 1.25);
  assert.strictEqual(lines[0].ppm, 1.264);
  assert.strictEqual(lines[2].ppm, 1.236);

  // Normalized heights for triplet: 0.5, 1.0, 0.5
  assert.strictEqual(lines[0].relativeHeight, 0.5);
  assert.strictEqual(lines[1].relativeHeight, 1.0);
  assert.strictEqual(lines[2].relativeHeight, 0.5);
});

// 7. DIAGNOSTIC REGIONS COMPLETENESS
runTest('PROTON_DIAGNOSTIC_REGIONS and CARBON_DIAGNOSTIC_REGIONS span standard analytical scales', () => {
  assert.ok(PROTON_DIAGNOSTIC_REGIONS.length >= 6);
  assert.ok(CARBON_DIAGNOSTIC_REGIONS.length >= 5);

  // 1H checks: covers aliphatic, aromatic, aldehyde, carboxylic acid
  const hasAromatic1H = PROTON_DIAGNOSTIC_REGIONS.some(r => r.name.includes('Aromatic'));
  const hasAldehyde1H = PROTON_DIAGNOSTIC_REGIONS.some(r => r.name.includes('Aldehyde'));
  const hasAcid1H = PROTON_DIAGNOSTIC_REGIONS.some(r => r.name.includes('Carboxylic Acid'));
  assert.ok(hasAromatic1H && hasAldehyde1H && hasAcid1H);

  // 13C checks: covers aliphatic, aromatic, carbonyl
  const hasAliphatic13C = CARBON_DIAGNOSTIC_REGIONS.some(r => r.name.includes('Aliphatic'));
  const hasCarbonyl13C = CARBON_DIAGNOSTIC_REGIONS.some(r => r.name.includes('Carbonyl'));
  assert.ok(hasAliphatic13C && hasCarbonyl13C);
});

// 8. CHEMICAL SHIFT REGION CLASSIFIER
runTest('classifyChemicalShiftRegion accurately maps shifts to diagnostic regions', () => {
  // 1H tests
  const regAlkyl = classifyChemicalShiftRegion('1H', 1.2);
  assert.strictEqual(regAlkyl?.name, 'Saturated Aliphatic Region');

  const regArom = classifyChemicalShiftRegion('1H', 7.27);
  assert.strictEqual(regArom?.name, 'Aromatic Ring Current Region');

  const regAld = classifyChemicalShiftRegion('1H', 9.8);
  assert.strictEqual(regAld?.name, 'Aldehyde Formyl Region');

  const regAcid = classifyChemicalShiftRegion('1H', 11.5);
  assert.strictEqual(regAcid?.name, 'Carboxylic Acid Region');

  // 13C tests
  const regC_Aliphatic = classifyChemicalShiftRegion('13C', 30.0);
  assert.strictEqual(regC_Aliphatic?.name, 'Aliphatic sp³ Carbons');

  const regC_Ketone = classifyChemicalShiftRegion('13C', 205.0);
  assert.strictEqual(regC_Ketone?.name, 'Aldehyde & Ketone Carbonyls');
});

// 9. BENCHMARK CATALOG INTEGRITY
runTest('NMR_BENCHMARK_CATALOG contains 8 required GDPT 2018 compounds with rigorous peak assignments', () => {
  const compounds = Object.values(NMR_BENCHMARK_CATALOG);
  assert.strictEqual(compounds.length, 8);

  for (const c of compounds) {
    assert.ok(c.id, 'Has ID');
    assert.ok(c.name, 'Has English name');
    assert.ok(c.vietnameseName, 'Has Vietnamese name');
    assert.ok(c.chemicalFormula, 'Has formula');
    assert.ok(c.molecularWeight > 0, 'Molecular weight > 0');
    assert.ok(c.protonSignals.length > 0, 'Has 1H signals');
    assert.ok(c.carbonSignals.length > 0, 'Has 13C signals');
    assert.ok(c.symmetryDescriptionVI.length > 0, 'Has symmetry description');
    assert.ok(c.practicalApplicationsVI.length >= 2, 'Has applications');
  }
});

// 10. ETHANOL NMR SIGNATURE (TRIPLET + QUARTET + SINGLET)
runTest('Ethanol exhibits canonical ethyl pattern: CH3 triplet (3H) and CH2 quartet (2H)', () => {
  const eth = NMR_BENCHMARK_CATALOG.ethanol;
  assert.strictEqual(eth.uniqueProtonEnvironments, 3);
  assert.strictEqual(eth.uniqueCarbonEnvironments, 2);

  const ch3 = eth.protonSignals.find(s => s.deltaPpm < 1.5);
  assert.ok(ch3);
  assert.strictEqual(ch3?.multiplicity, 't');
  assert.strictEqual(ch3?.integrationProtons, 3);

  const ch2 = eth.protonSignals.find(s => s.deltaPpm > 3.0 && s.deltaPpm < 4.0);
  assert.ok(ch2);
  assert.strictEqual(ch2?.multiplicity, 'q');
  assert.strictEqual(ch2?.integrationProtons, 2);

  const oh = eth.protonSignals.find(s => s.deltaPpm > 2.0 && s.deltaPpm < 3.0);
  assert.ok(oh);
  assert.strictEqual(oh?.multiplicity, 's');
  assert.strictEqual(oh?.integrationProtons, 1);
});

// 11. ACETONE MOLECULAR SYMMETRY (6H SINGLET & 2 CARBON SIGNALS)
runTest('Acetone C2v symmetry collapses 6 protons into 1 singlet and 3 carbons into 2 signals', () => {
  const act = NMR_BENCHMARK_CATALOG.acetone;
  assert.strictEqual(act.totalProtons, 6);
  assert.strictEqual(act.uniqueProtonEnvironments, 1);
  assert.strictEqual(act.protonSignals.length, 1);

  const singlePeak = act.protonSignals[0];
  assert.strictEqual(singlePeak.multiplicity, 's');
  assert.strictEqual(singlePeak.integrationProtons, 6);
  assert.strictEqual(singlePeak.deltaPpm, 2.17);

  // 13C signals: 2 signals (carbonyl at 206.3 and 2xCH3 at 30.7)
  assert.strictEqual(act.uniqueCarbonEnvironments, 2);
  assert.strictEqual(act.carbonSignals.length, 2);
  assert.ok(act.carbonSignals.some(s => s.deltaPpm > 200.0));
});

// 12. 1,2-DICHLOROETHANE CHEMICAL EQUIVALENCE
runTest('1,2-Dichloroethane features complete magnetic equivalence: 4H singlet at 3.78 ppm', () => {
  const dce = NMR_BENCHMARK_CATALOG.dichloroethane_1_2;
  assert.strictEqual(dce.totalProtons, 4);
  assert.strictEqual(dce.uniqueProtonEnvironments, 1);
  assert.strictEqual(dce.protonSignals.length, 1);

  const peak = dce.protonSignals[0];
  assert.strictEqual(peak.multiplicity, 's');
  assert.strictEqual(peak.integrationProtons, 4);
  assert.strictEqual(peak.deltaPpm, 3.78);

  // 13C NMR has only 1 signal for both carbons
  assert.strictEqual(dce.uniqueCarbonEnvironments, 1);
  assert.strictEqual(dce.carbonSignals.length, 1);
});

// 13. ACETALDEHYDE VICINAL CROSS-CARBONYL COUPLING
runTest('Acetaldehyde features formyl quartet at 9.80 ppm coupled with methyl doublet at 2.20 ppm', () => {
  const ald = NMR_BENCHMARK_CATALOG.acetaldehyde;
  const cho = ald.protonSignals.find(s => s.deltaPpm > 9.0);
  assert.ok(cho);
  assert.strictEqual(cho?.multiplicity, 'q');
  assert.strictEqual(cho?.integrationProtons, 1);
  assert.strictEqual(cho?.couplingConstantHz, 2.9);

  const ch3 = ald.protonSignals.find(s => s.deltaPpm < 3.0);
  assert.ok(ch3);
  assert.strictEqual(ch3?.multiplicity, 'd');
  assert.strictEqual(ch3?.integrationProtons, 3);
  assert.strictEqual(ch3?.couplingConstantHz, 2.9);
});

// 14. SOUND ENGINE PROCEDURAL AUDIO INTEGRATION
runTest('SoundEngine includes NMR RF pulse and FID decay audio triggers without errors', () => {
  assert.strictEqual(typeof sound.playNmrRfPulseBip, 'function');
  assert.strictEqual(typeof sound.playNmrFidDecayChime, 'function');

  // Direct invocations in node environment
  sound.playNmrRfPulseBip();
  sound.playNmrFidDecayChime();
});

// 15. CARD MATCHER & STRUCTURE ELUCIDATION SOLVER
runTest('Card matcher and AI NMR solver deduce chemical motifs with zero false positives', () => {
  // Matcher
  const ethMatch = getMatchingNMRConcept({ name: 'Ancol Etylic', chemicalFormula: 'C2H5OH' });
  assert.strictEqual(ethMatch?.id, 'ethanol');

  const actMatch = getMatchingNMRConcept({ name: 'Axeton dung môi', chemicalFormula: 'CH3COCH3' });
  assert.strictEqual(actMatch?.id, 'acetone');

  const tolMatch = getMatchingNMRConcept({ name: 'Toluen thơm', chemicalFormula: 'C6H5CH3' });
  assert.strictEqual(tolMatch?.id, 'toluene');

  const dceMatch = getMatchingNMRConcept({ name: '1,2-Đicloetan', chemicalFormula: 'ClCH2CH2Cl' });
  assert.strictEqual(dceMatch?.id, 'dichloroethane_1_2');

  const nullMatch = getMatchingNMRConcept({ name: 'Muối ăn', chemicalFormula: 'NaCl' });
  assert.strictEqual(nullMatch, null);

  // AI Structure Solver: input ethanol signals
  const solverRes = deduceMolecularMotifsFromNMR([
    { deltaPpm: 1.25, multiplicity: 't', integration: 3 },
    { deltaPpm: 3.69, multiplicity: 'q', integration: 2 },
  ]);
  assert.strictEqual(solverRes.hasEthylGroup, true);
  assert.strictEqual(solverRes.hasAromaticRing, false);

  // Input aromatic + aldehyde signals
  const solverArom = deduceMolecularMotifsFromNMR([
    { deltaPpm: 7.25, multiplicity: 'm', integration: 5 },
    { deltaPpm: 9.95, multiplicity: 's', integration: 1 },
  ]);
  assert.strictEqual(solverArom.hasAromaticRing, true);
  assert.strictEqual(solverArom.hasAldehyde, true);
});

console.log(`\n🎉 SUITE 89 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
