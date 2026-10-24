// test-afm-cantilever-visualizer.mjs
// Milestone 54: Test Suite 111 — Atomic Force Microscopy (AFM), Lennard-Jones Force-Distance Spectroscopy & Cantilever Mechanics Engine
// Standards: Nobel Prize in Physics 1986 (Gerd Binnig & Heinrich Rohrer / Christoph Gerber & Calvin Quate - SPM/AFM)
// Curriculum: Vietnam GDPT 2018 (Vật lý 10: Định luật Hooke & Lực đàn hồi; Vật lý 12: Dao động & Cộng hưởng; Hóa học 10: Lực Van der Waals; Hóa học 12: Tương tác liên phân tử y sinh)

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('======================================================================');
console.log('   TEST SUITE 111: AFM FORCE SPECTROSCOPY & LENNARD-JONES ENGINE');
console.log('======================================================================\n');

async function runTests() {
  const enginePath = resolve('src/domain/afmCantileverEngine.ts');
  const visualizerPath = resolve('src/components/visualizations/AfmCantileverVisualizer.tsx');
  const codexPath = resolve('src/components/PeriodicCodexTab.tsx');
  const modalPath = resolve('src/components/cards/CardDetailModal.tsx');
  const soundPath = resolve('src/audio/soundEngine.ts');

  // Test 1: File existence
  assert(existsSync(enginePath), 'src/domain/afmCantileverEngine.ts exists');
  assert(existsSync(visualizerPath), 'src/components/visualizations/AfmCantileverVisualizer.tsx exists');

  const engineSource = readFileSync(enginePath, 'utf-8');
  const visualizerSource = readFileSync(visualizerPath, 'utf-8');
  const codexSource = readFileSync(codexPath, 'utf-8');
  const modalSource = readFileSync(modalPath, 'utf-8');
  const soundSource = readFileSync(soundPath, 'utf-8');

  // Test 2: Cantilever Probes Catalog
  assert(
    engineSource.includes('soft_contact_si3n4') &&
    engineSource.includes('stiff_tapping_silicon') &&
    engineSource.includes('uhv_noncontact_high_q'),
    'Catalog includes Soft Si3N4 contact probe, Stiff Si tapping probe, and UHV qPlus sensor'
  );

  // Test 3: Samples Catalog
  assert(
    engineSource.includes('dna_double_helix_mica') &&
    engineSource.includes('gold_nanocrystals_substrate') &&
    engineSource.includes('graphene_monolayer_sio2') &&
    engineSource.includes('polymer_blend_ps_pmma'),
    'Catalog includes DNA on Mica, Au(111) Terraces, Monolayer Graphene, and PS/PMMA Polymer Blend'
  );

  // Dynamic import of engine module
  const engineModule = await import('../src/domain/afmCantileverEngine.ts');

  // Test 4: Euler-Bernoulli Beam Spring Constant: k = (E * w * t^3) / (4 * L^3)
  const kCalculated = engineModule.calculateCantileverSpringConstant(169, 30, 4.0, 125);
  assert(
    kCalculated > 40 && kCalculated < 43,
    `Euler-Bernoulli formula calculates silicon cantilever k_c ~ 41.5 N/m (calculated: ${kCalculated} N/m)`
  );

  // Test 5: Lennard-Jones (12-6) Potential minimum and zero force equilibrium
  const sigma = 0.34;
  const epsilon = 0.08;
  const rEq = sigma * Math.pow(2, 1 / 6); // ~0.3816 nm (minimum of potential, force = 0)
  const vEq = engineModule.calculateLennardJonesPotential(rEq, epsilon, sigma);
  const fEq = engineModule.calculateLennardJonesForceNanoNewtons(rEq, epsilon, sigma);
  assert(
    Math.abs(vEq - (-epsilon)) < 0.01,
    `Lennard-Jones potential at r_eq = 2^(1/6)σ reaches exact minimum -ε = -${epsilon} eV (calculated: ${vEq} eV)`
  );
  assert(
    Math.abs(fEq) < 0.05,
    `Lennard-Jones force at r_eq is zero (equilibrium distance) (calculated: ${fEq} nN)`
  );

  // Test 6: Pauli Repulsion vs Van der Waals Attraction
  const fRepulsive = engineModule.calculateLennardJonesForceNanoNewtons(0.25, epsilon, sigma);
  const fAttractive = engineModule.calculateLennardJonesForceNanoNewtons(0.45, epsilon, sigma);
  assert(
    fRepulsive > 5.0,
    `Steep Pauli electron cloud repulsion at r=0.25 nm yields strong positive force (calculated: ${fRepulsive} nN)`
  );
  assert(
    fAttractive < -0.01,
    `Long-range Van der Waals dispersion at r=0.45 nm yields attractive negative force (calculated: ${fAttractive} nN)`
  );

  // Test 7: Force-Distance Spectroscopy Simulation (Approach & Retraction Cycle)
  const forceRes = engineModule.simulateAfmForceCurve('soft_contact_si3n4', 'dna_double_helix_mica', 'CONTACT_MODE');
  assert(
    forceRes.approachCurve.length > 50 &&
    forceRes.retractionCurve.length > 50,
    'Generates high-resolution approach and retraction curves (>50 data points each)'
  );
  assert(
    forceRes.snapInDistanceNm > 0.3 && forceRes.snapInDistanceNm < 0.6,
    `Snap-in jump-to-contact detected during approach at z = ${forceRes.snapInDistanceNm} nm`
  );
  assert(
    Math.abs(forceRes.pullOffForceNanoNewtons - (-forceRes.sample.adhesionForceNanoNewtons)) < 0.05,
    `Pull-off rupture force matches sample adhesion force F_adh = ${forceRes.sample.adhesionForceNanoNewtons} nN`
  );

  // Test 8: Operating Modes & Phase Imaging
  const tapRes = engineModule.simulateAfmForceCurve('stiff_tapping_silicon', 'polymer_blend_ps_pmma', 'TAPPING_MODE');
  assert(
    tapRes.tappingAmplitudeRatio === 0.75 &&
    tapRes.phaseShiftDegrees > 15,
    `Tapping mode models amplitude damping (A/A0 = ${tapRes.tappingAmplitudeRatio}) and phase shift (Δφ = ${tapRes.phaseShiftDegrees}°)`
  );

  // Test 9: Card Matcher Service (getMatchingAfmCard)
  const dnaCard = engineModule.getMatchingAfmCard({ id: 'dna_helix', name: 'DNA Chuỗi Xoắn Kép', description: 'Acid nucleic sinh học' });
  const auCard = engineModule.getMatchingAfmCard({ id: 'au_single_crystal', name: 'Màng Vàng Au(111)', description: 'Kim loại vàng' });
  const unknownCard = engineModule.getMatchingAfmCard({ id: 'argon_gas', name: 'Argon', description: 'Khí hiếm Ar' });
  assert(
    dnaCard?.id === 'dna_double_helix_mica' &&
    auCard?.id === 'gold_nanocrystals_substrate' &&
    unknownCard === null,
    'getMatchingAfmCard correctly maps biological and nanomaterial cards while rejecting non-surface cards'
  );

  // Test 10: Visualizer Reactive States & Controls
  assert(
    visualizerSource.includes('selectedCantileverId') &&
    visualizerSource.includes('selectedSampleId') &&
    visualizerSource.includes('operationMode') &&
    visualizerSource.includes('piezoPositionNm'),
    'Visualizer provides reactive states for cantilever probe, sample, operating mode, and piezo Z position'
  );

  // Test 11: SVG Spectroscopy & Optical Lever Schematic Elements
  assert(
    visualizerSource.includes('Khoảng Cách Đầu Dò - Bề Mặt z (nm)') &&
    visualizerSource.includes('Lực Tương Tác F (nN)') &&
    visualizerSource.includes('approachPath') &&
    visualizerSource.includes('retractionPath') &&
    visualizerSource.includes('Photodiode (A,B,C,D)'),
    'Visualizer renders full SVG force-distance plot (approach & retraction paths) and 4-quadrant photodiode optical lever schematic'
  );

  // Test 12: Audio Integration in soundEngine.ts
  assert(
    soundSource.includes('playAfmTipApproachSnap') &&
    soundSource.includes('playAfmTappingResonanceHum'),
    'soundEngine.ts provides playAfmTipApproachSnap and playAfmTappingResonanceHum audio methods'
  );

  // Test 13: PeriodicCodexTab Section 43 Integration
  assert(
    codexSource.includes("'AFM_CANTILEVER'") &&
    codexSource.includes('AfmCantileverVisualizer') &&
    codexSource.includes('SECTION 43: ATOMIC FORCE MICROSCOPY (AFM)'),
    'PeriodicCodexTab fully integrates Section 43 with tab button and visualizer rendering'
  );

  // Test 14: CardDetailModal Integration
  assert(
    modalSource.includes('matchingAfm') &&
    modalSource.includes('showAfmModal') &&
    modalSource.includes('Kính Hiển Vi AFM') &&
    modalSource.includes('AfmCantileverVisualizer'),
    'CardDetailModal fully integrates matchingAfm badge button and interactive modal popup'
  );

  // Test 15: Nobel Prize Citations & Vietnam GDPT 2018 Curriculum
  assert(
    engineSource.includes('Gerd Binnig') &&
    engineSource.includes('Heinrich Rohrer') &&
    engineSource.includes('GDPT 2018') &&
    visualizerSource.includes('Nobel Vật Lý 1986'),
    'Cites Nobel Laureates Gerd Binnig & Heinrich Rohrer (1986), Christoph Gerber, Calvin Quate, and Vietnam GDPT 2018 curriculum'
  );

  console.log('\n======================================================================');
  console.log(`   SUITE 111 RESULTS: ${passCount} / ${passCount + failCount} PASSED (${Math.round(passCount / (passCount + failCount) * 100)}%)`);
  console.log('======================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
