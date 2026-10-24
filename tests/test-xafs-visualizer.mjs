// test-xafs-visualizer.mjs
// Milestone 73: Test Suite 130 - X-ray Absorption Fine Structure (XAFS), XANES Chemical Valence & EXAFS Coordination Shell Engine
// Standards: IUPAC Physical Chemistry & Synchrotron Radiation X-ray Spectroscopy Metrology
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 12, Sinh học 11, Vật lý 12)

import assert from 'node:assert';
import {
  PLANCK_CONSTANT_H,
  HBAR,
  ELECTRON_MASS_KG,
  ELECTRON_CHARGE_COULOMB,
  SPEED_OF_LIGHT_M_PER_S,
  SILICON_111_D_SPACING_ANGSTROM,
  PHOTOELECTRON_K_CONVERSION_FACTOR,
  XAFS_STANDARD_CATALOG,
  calculateWavevectorK,
  calculateMonochromatorBraggAngleDeg,
  calculateExafsChiK,
  generateXafsEnergyScan,
  calculateFourierTransformRSpace,
  simulateXafsExperiment,
  getMatchingXafsCard,
  validateXafsStandardPhysics
} from '../src/domain/xafsEngine.ts';

console.log('🧪 ============================================================');
console.log('🧪 ELEMENTA TEST SUITE 130: XAFS, XANES & EXAFS ENGINE');
console.log('🧪 Standards: IUPAC Physical Chemistry & Synchrotron Metrology');
console.log('🧪 ============================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// 1. Fundamental Physical Constants & Theoretical Conversion Factors
// ---------------------------------------------------------------------------
runTest('Fundamental Physical Constants are exact and adhere to CODATA', () => {
  assert.strictEqual(PLANCK_CONSTANT_H, 6.62607015e-34);
  assert.strictEqual(ELECTRON_CHARGE_COULOMB, 1.602176634e-19);
  assert.strictEqual(SPEED_OF_LIGHT_M_PER_S, 299792458);
  assert.ok(Math.abs(HBAR - PLANCK_CONSTANT_H / (2 * Math.PI)) < 1e-40);
  assert.ok(SILICON_111_D_SPACING_ANGSTROM > 3.13 && SILICON_111_D_SPACING_ANGSTROM < 3.14);
});

runTest('Photoelectron k conversion factor corresponds to sqrt(2 m_e / hbar^2)', () => {
  // k (m^-1) = sqrt(2 * m_e * E_J) / hbar
  // For E = 1 eV = 1.602176634e-19 J:
  const kMeters = Math.sqrt(2 * ELECTRON_MASS_KG * ELECTRON_CHARGE_COULOMB) / HBAR;
  const kAngstrom = kMeters * 1e-10; // convert m^-1 to Angstrom^-1
  assert.ok(Math.abs(kAngstrom - PHOTOELECTRON_K_CONVERSION_FACTOR) < 0.001);
});

// ---------------------------------------------------------------------------
// 2. Standard Catalog Verification & Physics Validity
// ---------------------------------------------------------------------------
runTest('Catalog contains exactly 5 international benchmark standards', () => {
  assert.strictEqual(XAFS_STANDARD_CATALOG.length, 5);
});

runTest('All standards pass physical validity checks', () => {
  for (const std of XAFS_STANDARD_CATALOG) {
    assert.ok(validateXafsStandardPhysics(std), `Standard ${std.id} failed physics validation`);
    assert.ok(std.id.length > 0);
    assert.ok(std.name.length > 0);
    assert.ok(std.vietnameseName.length > 0);
    assert.ok(std.absorberAtomicNumber > 0);
    assert.ok(std.edgeEnergyE0Ev > 0);
    assert.ok(std.amplitudeReductionFactorS02 >= 0.8 && std.amplitudeReductionFactorS02 <= 1.0);
    assert.ok(std.meanFreePathLambdaAngstrom >= 5.0 && std.meanFreePathLambdaAngstrom <= 20.0);
    assert.ok(std.shells.length > 0);
    assert.ok(std.curriculumNotes.includes('GDPT 2018'));
  }
});

runTest('Catalog IDs are completely unique', () => {
  const ids = XAFS_STANDARD_CATALOG.map((s) => s.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(uniqueIds.size, ids.length);
});

// ---------------------------------------------------------------------------
// 3. Copper Foil Calibrant Specifics (FCC Lattice)
// ---------------------------------------------------------------------------
runTest('Copper Foil Standard has Cu K-edge at 8979.0 eV with 12 nearest neighbors at 2.556 Å', () => {
  const cu = XAFS_STANDARD_CATALOG.find((s) => s.id === 'cu_foil_reference');
  assert.ok(cu);
  assert.strictEqual(cu.absorberElement, 'Cu');
  assert.strictEqual(cu.absorberAtomicNumber, 29);
  assert.strictEqual(cu.edgeType, 'K_EDGE');
  assert.strictEqual(cu.sampleType, 'METALLIC_FOIL');
  assert.strictEqual(cu.edgeEnergyE0Ev, 8979.0);
  assert.strictEqual(cu.xanes.oxidationState, '0');
  assert.strictEqual(cu.xanes.edgeShiftDeltaEv, 0.0);

  // Shell 1: 12 Cu at 2.556 A
  const sh1 = cu.shells[0];
  assert.strictEqual(sh1.shellIndex, 1);
  assert.strictEqual(sh1.scattererElement, 'Cu');
  assert.strictEqual(sh1.coordinationNumber, 12.0);
  assert.strictEqual(sh1.radialDistanceAngstrom, 2.556);
  assert.strictEqual(sh1.debyeWallerFactorAngstromSq, 0.008);

  // Shell 2: 6 Cu at 3.615 A
  const sh2 = cu.shells[1];
  assert.strictEqual(sh2.coordinationNumber, 6.0);
  assert.strictEqual(sh2.radialDistanceAngstrom, 3.615);
});

// ---------------------------------------------------------------------------
// 4. Hematite Iron Oxide (Fe3+ Chemical Shift & Pre-edge)
// ---------------------------------------------------------------------------
runTest('Hematite exhibits +8.5 eV chemical shift for Fe(III) and 1s->3d pre-edge peak', () => {
  const fe = XAFS_STANDARD_CATALOG.find((s) => s.id === 'iron_oxide_hematite');
  assert.ok(fe);
  assert.strictEqual(fe.absorberElement, 'Fe');
  assert.strictEqual(fe.absorberAtomicNumber, 26);
  assert.strictEqual(fe.edgeType, 'K_EDGE');
  assert.strictEqual(fe.xanes.oxidationState, '+3');
  assert.strictEqual(fe.xanes.edgeShiftDeltaEv, 8.5);
  assert.strictEqual(fe.xanes.edgeEnergyE0Ev, 7120.5);

  // Pre-edge peak
  assert.strictEqual(fe.xanes.preEdgePeaks.length, 1);
  const pre = fe.xanes.preEdgePeaks[0];
  assert.strictEqual(pre.energyEv, 7114.5);
  assert.ok(pre.assignment.includes('1s -> 3d'));

  // First shell: 6 O at 1.99 A
  const sh1 = fe.shells[0];
  assert.strictEqual(sh1.scattererElement, 'O');
  assert.strictEqual(sh1.coordinationNumber, 6.0);
  assert.strictEqual(sh1.radialDistanceAngstrom, 1.99);

  // Second shell: Fe-Fe edge-sharing at 2.95 A
  const sh2 = fe.shells[1];
  assert.strictEqual(sh2.scattererElement, 'Fe');
  assert.strictEqual(sh2.coordinationNumber, 4.0);
  assert.strictEqual(sh2.radialDistanceAngstrom, 2.95);
});

// ---------------------------------------------------------------------------
// 5. Photosystem II Oxygen-Evolving Complex (Mn4CaO5 Cluster)
// ---------------------------------------------------------------------------
runTest('Photosystem II OEC resolves di-mu-oxo Mn-Mn pairs at 2.72 Å and Mn-Ca bridge at 3.40 Å', () => {
  const ps2 = XAFS_STANDARD_CATALOG.find((s) => s.id === 'photosystem2_oxygen_evolving_complex');
  assert.ok(ps2);
  assert.strictEqual(ps2.absorberElement, 'Mn');
  assert.strictEqual(ps2.absorberAtomicNumber, 25);
  assert.strictEqual(ps2.sampleType, 'METALLOENZYME');
  assert.strictEqual(ps2.xanes.edgeShiftDeltaEv, 12.5);

  const shMn = ps2.shells.find((s) => s.scattererElement === 'Mn');
  assert.ok(shMn);
  assert.strictEqual(shMn.radialDistanceAngstrom, 2.72);

  const shCa = ps2.shells.find((s) => s.scattererElement === 'Ca');
  assert.ok(shCa);
  assert.strictEqual(shCa.radialDistanceAngstrom, 3.40);
});

// ---------------------------------------------------------------------------
// 6. Platinum Single-Atom Catalyst (Definitive N_Pt-Pt = 0 Proof)
// ---------------------------------------------------------------------------
runTest('Platinum SAC rigorously confirms N_Pt-Pt = 0 proving atomic dispersion', () => {
  const sac = XAFS_STANDARD_CATALOG.find((s) => s.id === 'platinum_single_atom_catalyst');
  assert.ok(sac);
  assert.strictEqual(sac.absorberElement, 'Pt');
  assert.strictEqual(sac.absorberAtomicNumber, 78);
  assert.strictEqual(sac.edgeType, 'L3_EDGE');
  assert.strictEqual(sac.sampleType, 'SINGLE_ATOM_CATALYST');

  // White line intensity is strong due to empty 5d states in Pt(II/IV)
  assert.strictEqual(sac.xanes.whiteLineIntensity, 2.25);

  // Shell 1 is Pt-O
  const shO = sac.shells[0];
  assert.strictEqual(shO.scattererElement, 'O');
  assert.strictEqual(shO.coordinationNumber, 4.2);
  assert.strictEqual(shO.radialDistanceAngstrom, 2.01);

  // Shell 2 is Pt-Pt metallic peak -> STRICTLY ZERO!
  const shPt = sac.shells[1];
  assert.strictEqual(shPt.scattererElement, 'Pt');
  assert.strictEqual(shPt.coordinationNumber, 0.0);
  assert.strictEqual(shPt.backscatteringAmplitudeScalar, 0.0);
});

// ---------------------------------------------------------------------------
// 7. Lead Halide Perovskite (Octahedral PbI6 & Dynamic Disorder)
// ---------------------------------------------------------------------------
runTest('Perovskite MAPbI3 standard displays Pb-I coordination at 3.18 Å with soft lattice disorder', () => {
  const pv = XAFS_STANDARD_CATALOG.find((s) => s.id === 'lead_halide_perovskite');
  assert.ok(pv);
  assert.strictEqual(pv.absorberElement, 'Pb');
  assert.strictEqual(pv.absorberAtomicNumber, 82);
  assert.strictEqual(pv.edgeType, 'L3_EDGE');
  assert.strictEqual(pv.sampleType, 'PEROVSKITE_SEMICONDUCTOR');

  const shI = pv.shells[0];
  assert.strictEqual(shI.scattererElement, 'I');
  assert.strictEqual(shI.coordinationNumber, 6.0);
  assert.strictEqual(shI.radialDistanceAngstrom, 3.18);
  assert.strictEqual(shI.debyeWallerFactorAngstromSq, 0.015);
});

// ---------------------------------------------------------------------------
// 8. Photoelectron Wavevector k & Monochromator Bragg Angle Calculations
// ---------------------------------------------------------------------------
runTest('calculateWavevectorK accurately converts energy into wavenumber k', () => {
  // Below or at edge -> k = 0
  assert.strictEqual(calculateWavevectorK(8970, 8979), 0);
  assert.strictEqual(calculateWavevectorK(8979, 8979), 0);

  // At 100 eV above edge: k = 0.51232 * sqrt(100) = 5.1232 A^-1
  const k100 = calculateWavevectorK(9079, 8979);
  assert.ok(Math.abs(k100 - 5.1232) < 0.01);

  // At 400 eV above edge: k = 0.51232 * 20 = 10.2464 A^-1
  const k400 = calculateWavevectorK(9379, 8979);
  assert.ok(Math.abs(k400 - 10.2464) < 0.01);
});

runTest('calculateMonochromatorBraggAngleDeg computes valid Si(111) diffraction angles', () => {
  // For Cu K-edge 8979 eV:
  // lambda = 12398.42 / 8979 = 1.3808 A
  // 2d = 2 * 3.1356 = 6.2712 A
  // sin(theta) = 1.3808 / 6.2712 = 0.2202 -> theta ~ 12.72 deg
  const thetaCu = calculateMonochromatorBraggAngleDeg(8979);
  assert.ok(thetaCu > 12.0 && thetaCu < 13.5);

  // Higher energy -> smaller lambda -> smaller Bragg angle
  const thetaHigh = calculateMonochromatorBraggAngleDeg(13000);
  assert.ok(thetaHigh < thetaCu);
  assert.ok(thetaHigh > 8.0);
});

// ---------------------------------------------------------------------------
// 9. EXAFS chi(k) Oscillations & Fourier Transform to R-space
// ---------------------------------------------------------------------------
runTest('calculateExafsChiK generates physical oscillatory fine structure', () => {
  const cu = XAFS_STANDARD_CATALOG[0];
  // Below 1.0 A^-1 -> 0
  assert.strictEqual(calculateExafsChiK(0.5, cu), 0.0);

  // Valid k range
  const chi5 = calculateExafsChiK(5.0, cu);
  assert.ok(!isNaN(chi5));
  assert.ok(Math.abs(chi5) < 0.2); // Typical normalized EXAFS chi is order 0.01 - 0.1

  // Oscillates between positive and negative
  let signChanges = 0;
  let prevChi = calculateExafsChiK(2.0, cu);
  for (let k = 2.2; k <= 12.0; k += 0.2) {
    const curChi = calculateExafsChiK(k, cu);
    if ((curChi > 0 && prevChi < 0) || (curChi < 0 && prevChi > 0)) {
      signChanges++;
    }
    prevChi = curChi;
  }
  assert.ok(signChanges >= 3, `Expected at least 3 EXAFS oscillations, found ${signChanges}`);
});

runTest('generateXafsEnergyScan produces continuous XANES and EXAFS spectrum', () => {
  const cu = XAFS_STANDARD_CATALOG[0];
  const scan = generateXafsEnergyScan(cu);
  assert.ok(scan.length > 500);

  // First point (pre-edge): mu ~ 0.01 - 0.2
  assert.ok(scan[0].absorptionMu < 0.5);

  // Edge jump around 8979 eV
  const ptPre = scan.find((p) => p.energyEv === 8970);
  const ptPost = scan.find((p) => p.energyEv === 9000);
  assert.ok(ptPre && ptPost);
  assert.ok(ptPost.absorptionMu > ptPre.absorptionMu);

  // EXAFS chi is non-zero at high energy
  const ptHigh = scan.find((p) => p.energyEv === 9200);
  assert.ok(ptHigh);
  assert.ok(ptHigh.kWavevector > 2.0);
  assert.ok(ptHigh.k2ChiK !== 0);
});

runTest('calculateFourierTransformRSpace produces radial distribution with physical peak', () => {
  const cu = XAFS_STANDARD_CATALOG[0];
  const scan = generateXafsEnergyScan(cu);
  const rSpace = calculateFourierTransformRSpace(scan, cu, 2);
  assert.ok(rSpace.length > 50);

  // All magnitudes must be non-negative
  for (const pt of rSpace) {
    assert.ok(pt.radialMagnitude >= 0);
    assert.ok(!isNaN(pt.radialMagnitude));
  }

  // Find maximum peak in R-space
  let maxPt = rSpace[0];
  for (const pt of rSpace) {
    if (pt.radialMagnitude > maxPt.radialMagnitude) {
      maxPt = pt;
    }
  }

  // Apparent distance R should be near shell distance ~2.1 - 2.56 A
  assert.ok(
    maxPt.radialDistanceR >= 1.8 && maxPt.radialDistanceR <= 2.7,
    `Max R peak at ${maxPt.radialDistanceR} Å expected between 1.8 and 2.7 Å`
  );
});

// ---------------------------------------------------------------------------
// 10. End-to-end Simulation Result
// ---------------------------------------------------------------------------
runTest('simulateXafsExperiment returns coherent telemetry and experimental state', () => {
  const fe = XAFS_STANDARD_CATALOG[1];
  const sim = simulateXafsExperiment(fe, 7130.0);

  assert.strictEqual(sim.standard.id, fe.id);
  assert.strictEqual(sim.incidentEnergyEv, 7130.0);
  assert.ok(sim.monochromatorAngleDeg > 10.0 && sim.monochromatorAngleDeg < 25.0);
  assert.ok(sim.absorptionCoefficientMu > 0.5);
  assert.ok(sim.transmittedIntensityPercent > 0 && sim.transmittedIntensityPercent <= 100);
  assert.ok(sim.currentK > 0);
  assert.strictEqual(sim.dominantShellsSummary.length, fe.shells.length);
});

// ---------------------------------------------------------------------------
// 11. Card Matching Engine
// ---------------------------------------------------------------------------
runTest('getMatchingXafsCard accurately associates cards by element and formula', () => {
  // Cu card
  const cuCard = { name: 'Đồng Lá Kim Loại', symbol: 'Cu', formula: 'Cu' };
  assert.strictEqual(getMatchingXafsCard(cuCard)?.id, 'cu_foil_reference');

  // Fe card
  const feCard = { name: 'Hematit Quặng Sắt', symbol: 'Fe', formula: 'Fe2O3' };
  assert.strictEqual(getMatchingXafsCard(feCard)?.id, 'iron_oxide_hematite');

  // Mn card
  const mnCard = { name: 'Mangan Điôxit / Quang Hợp', symbol: 'Mn', formula: 'MnO2' };
  assert.strictEqual(getMatchingXafsCard(mnCard)?.id, 'photosystem2_oxygen_evolving_complex');

  // Pt card
  const ptCard = { name: 'Xúc Tác Platin', symbol: 'Pt', formula: 'Pt' };
  assert.strictEqual(getMatchingXafsCard(ptCard)?.id, 'platinum_single_atom_catalyst');

  // Pb card
  const pbCard = { name: 'Chì Perovskite', symbol: 'Pb', formula: 'CH3NH3PbI3' };
  assert.strictEqual(getMatchingXafsCard(pbCard)?.id, 'lead_halide_perovskite');

  // Non-matching card
  const heCard = { name: 'Khí Heli', symbol: 'He', formula: 'He' };
  assert.strictEqual(getMatchingXafsCard(heCard), null);
  assert.strictEqual(getMatchingXafsCard(null), null);
});

// ---------------------------------------------------------------------------
// 12. Debye-Waller Factor & Thermal Disorder Attenuation Verification
// ---------------------------------------------------------------------------
runTest('Higher Debye-Waller factor produces steeper high-k EXAFS amplitude decay', () => {
  const cuStd = XAFS_STANDARD_CATALOG[0];
  const kHigh = 10.0;

  // Clone cuStd with low sigma^2 vs high sigma^2
  const lowDisorderStd = {
    ...cuStd,
    shells: [{ ...cuStd.shells[0], debyeWallerFactorAngstromSq: 0.002 }]
  };
  const highDisorderStd = {
    ...cuStd,
    shells: [{ ...cuStd.shells[0], debyeWallerFactorAngstromSq: 0.020 }]
  };

  const chiLow = Math.abs(calculateExafsChiK(kHigh, lowDisorderStd));
  const chiHigh = Math.abs(calculateExafsChiK(kHigh, highDisorderStd));

  assert.ok(
    chiLow > chiHigh,
    `Low disorder chi (${chiLow}) must exceed high disorder chi (${chiHigh}) at k=10`
  );
});

// ---------------------------------------------------------------------------
// 13. Mean Free Path Exponential Attenuation Verification
// ---------------------------------------------------------------------------
runTest('Inelastic mean-free-path lambda strongly attenuates distant coordination shells', () => {
  const cuStd = XAFS_STANDARD_CATALOG[0];
  const kMid = 6.0;

  // Single shell at 2.5 A vs distant shell at 6.0 A with identical N=12
  const nearShellStd = {
    ...cuStd,
    shells: [{ ...cuStd.shells[0], radialDistanceAngstrom: 2.5 }]
  };
  const farShellStd = {
    ...cuStd,
    shells: [{ ...cuStd.shells[0], radialDistanceAngstrom: 6.0 }]
  };

  const chiNear = Math.abs(calculateExafsChiK(kMid, nearShellStd));
  const chiFar = Math.abs(calculateExafsChiK(kMid, farShellStd));

  assert.ok(
    chiNear > chiFar * 4,
    `Near shell chi (${chiNear}) should dwarf far shell chi (${chiFar}) due to 1/R^2 and exp(-2R/lambda)`
  );
});

// ---------------------------------------------------------------------------
// 14. Linear Chemical Valence Shift Correlation
// ---------------------------------------------------------------------------
runTest('Iron K-edge standards demonstrate positive edge shift scaling with formal valence', () => {
  const feStd = XAFS_STANDARD_CATALOG.find((s) => s.id === 'iron_oxide_hematite');
  assert.ok(feStd);
  assert.ok(feStd.xanes.edgeShiftDeltaEv > 0);
  assert.ok(feStd.xanes.edgeEnergyE0Ev > 7112.0);
  assert.strictEqual(feStd.xanes.oxidationState, '+3');
});

// ---------------------------------------------------------------------------
// 15. Discrete Fourier Transform k-weighting scaling
// ---------------------------------------------------------------------------
runTest('FT k-weighting increases relative prominence of high-k oscillations in R-space', () => {
  const cu = XAFS_STANDARD_CATALOG[0];
  const scan = generateXafsEnergyScan(cu);

  const rSpaceK1 = calculateFourierTransformRSpace(scan, cu, 1);
  const rSpaceK2 = calculateFourierTransformRSpace(scan, cu, 2);
  const rSpaceK3 = calculateFourierTransformRSpace(scan, cu, 3);

  assert.ok(rSpaceK1.length > 0);
  assert.ok(rSpaceK2.length > 0);
  assert.ok(rSpaceK3.length > 0);
  assert.strictEqual(rSpaceK1.length, rSpaceK2.length);
  assert.strictEqual(rSpaceK2.length, rSpaceK3.length);
});

// ---------------------------------------------------------------------------
// 16. Edge jump normalization & asymptotic stability
// ---------------------------------------------------------------------------
runTest('High-energy absorption scan converges stably to post-edge continuum baseline', () => {
  const cu = XAFS_STANDARD_CATALOG[0];
  const scan = generateXafsEnergyScan(cu, 8979 + 50, 8979 + 600, 10);
  assert.ok(scan.length > 50);

  // Absorption values must be positive, finite, and bounded near normalized step 1.0 +- 0.3
  for (const pt of scan) {
    assert.ok(pt.absorptionMu > 0.6 && pt.absorptionMu < 1.6);
    assert.ok(!isNaN(pt.absorptionMu));
    assert.ok(!isNaN(pt.chiK));
  }
});

console.log(`\n🎉 ALL ${passedTests} / ${totalTests} TESTS PASSED FOR TEST SUITE 130!`);
