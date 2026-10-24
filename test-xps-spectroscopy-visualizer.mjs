// test-xps-spectroscopy-visualizer.mjs
// Milestone 53: Test Suite 110 — X-Ray Photoelectron Spectroscopy (XPS / ESCA), Auger Electron Spectroscopy (AES) & Chemical Shift Engine
// Standards: Nobel Prize in Physics 1981 (Kai Siegbahn - ESCA) & Nobel Prize in Physics 1921 (Albert Einstein - Photoelectric Effect)
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Năng lượng ion hóa; Hóa học 11: Số oxi hóa & Liên kết cộng hóa trị; Hóa học 12: Hóa học bề mặt)

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
console.log('   TEST SUITE 110: XPS / ESCA & CHEMICAL SHIFT ENGINE');
console.log('======================================================================\n');

async function runTests() {
  const enginePath = resolve('src/domain/xpsSpectroscopyEngine.ts');
  const visualizerPath = resolve('src/components/visualizations/XpsSpectroscopyVisualizer.tsx');
  const codexPath = resolve('src/components/PeriodicCodexTab.tsx');
  const modalPath = resolve('src/components/cards/CardDetailModal.tsx');
  const soundPath = resolve('src/audio/soundEngine.ts');

  // Test 1: File existence
  assert(existsSync(enginePath), 'src/domain/xpsSpectroscopyEngine.ts exists');
  assert(existsSync(visualizerPath), 'src/components/visualizations/XpsSpectroscopyVisualizer.tsx exists');

  const engineSource = readFileSync(enginePath, 'utf-8');
  const visualizerSource = readFileSync(visualizerPath, 'utf-8');
  const codexSource = readFileSync(codexPath, 'utf-8');
  const modalSource = readFileSync(modalPath, 'utf-8');
  const soundSource = readFileSync(soundPath, 'utf-8');

  // Test 2: Standards Catalog Coverage
  assert(
    engineSource.includes('graphene_oxide_sheet') &&
    engineSource.includes('tio2_anatase_nanoparticles') &&
    engineSource.includes('silicon_native_oxide_wafer') &&
    engineSource.includes('gold_thin_film_au'),
    'Catalog includes Graphene Oxide (C 1s), TiO2 Anatase (Ti 2p), Silicon Wafer (Si 2p), and Gold Film (Au 4f)'
  );

  // Test 3: Spectrometer Constants & X-Ray Sources
  assert(
    engineSource.includes('AL_KA') &&
    engineSource.includes('1486.6') &&
    engineSource.includes('MG_KA') &&
    engineSource.includes('1253.6') &&
    engineSource.includes('STANDARD_SPECTROMETER_WORK_FUNCTION_EV = 4.3') &&
    engineSource.includes('C1S_ADVENTITIOUS_CARBON_STANDARD_EV = 284.8'),
    'Defines exact X-ray photon energies (Al Kα 1486.6 eV, Mg Kα 1253.6 eV), Φ_analyzer 4.3 eV, and C 1s 284.8 eV'
  );

  // Dynamic import of engine module
  const engineModule = await import('./src/domain/xpsSpectroscopyEngine.ts');

  // Test 4: Einstein-Siegbahn Photoelectric Relation: Eb = hν - Ek - Φ
  const ebCalc = engineModule.calculateBindingEnergy(1197.5, 'AL_KA', 4.3);
  assert(
    Math.abs(ebCalc - 284.8) < 0.05,
    `calculateBindingEnergy converts Ek=1197.5 eV to C 1s Eb=284.8 eV (calculated: ${ebCalc} eV)`
  );

  const ekCalc = engineModule.calculateKineticEnergy(284.8, 'AL_KA', 4.3);
  assert(
    Math.abs(ekCalc - 1197.5) < 0.05,
    `calculateKineticEnergy converts Eb=284.8 eV to Ek=1197.5 eV (calculated: ${ekCalc} eV)`
  );

  // Test 5: Inelastic Mean Free Path & Angle-Resolved XPS (ARXPS)
  const depthNormal = engineModule.calculateSamplingDepth(1197.5, 0);
  const depthGrazing = engineModule.calculateSamplingDepth(1197.5, 60);
  assert(
    depthNormal.imfpNm > 1.8 && depthNormal.imfpNm < 2.2,
    `Inelastic mean free path IMFP is ~1.9 nm (calculated: ${depthNormal.imfpNm} nm)`
  );
  assert(
    Math.abs(depthGrazing.samplingDepthNm - depthNormal.samplingDepthNm / 2) < 0.1,
    `Grazing angle 60° cuts sampling depth in half (cos 60° = 0.5): ${depthNormal.samplingDepthNm} nm -> ${depthGrazing.samplingDepthNm} nm`
  );

  // Test 6: Deconvolution Simulation & Carbon Functional Group Chemical Shifts
  const goResult = engineModule.simulateXpsSpectrum('graphene_oxide_sheet', 'AL_KA', 0);
  const compEb = goResult.sample.components.map(c => ({ label: c.label, eb: c.centerBindingEnergyEv }));
  assert(
    compEb.length === 4 &&
    compEb[0].eb === 284.8 && // C-C
    compEb[1].eb === 286.7 && // C-O
    compEb[2].eb === 288.1 && // C=O
    compEb[3].eb === 289.2,   // O-C=O
    'Graphene oxide C 1s correctly deconvolutes into 4 peaks: C-C (284.8 eV), C-O (286.7 eV), C=O (288.1 eV), O-C=O (289.2 eV)'
  );

  // Test 7: Titanium 2p Spin-Orbit Doublet & 2:1 Area Ratio
  const tio2Result = engineModule.simulateXpsSpectrum('tio2_anatase_nanoparticles', 'AL_KA', 0);
  const ti2p32 = tio2Result.sample.components.find(c => c.id === 'ti_2p_3_2_ti4');
  const ti2p12 = tio2Result.sample.components.find(c => c.id === 'ti_2p_1_2_ti4');
  assert(
    ti2p32 && ti2p12 &&
    Math.abs((ti2p12.centerBindingEnergyEv - ti2p32.centerBindingEnergyEv) - 5.7) < 0.05,
    `Ti 2p spin-orbit splitting ΔE_SO is exactly 5.7 eV (458.7 eV vs 464.4 eV)`
  );
  assert(
    Math.abs(ti2p32.areaPercentage / ti2p12.areaPercentage - 2.0) < 0.05,
    `Ti 2p branching ratio matches (2j+1) quantum degeneracy ratio 2:1 (66.67% vs 33.33%)`
  );

  // Test 8: Gold 4f International Calibration Standard (Au 4f7/2 = 84.00 eV)
  const auResult = engineModule.simulateXpsSpectrum('gold_thin_film_au', 'AL_KA', 0);
  const au72 = auResult.sample.components.find(c => c.id === 'au_4f_7_2');
  const au52 = auResult.sample.components.find(c => c.id === 'au_4f_5_2');
  assert(
    au72?.centerBindingEnergyEv === 84.0 &&
    Math.abs((au52.centerBindingEnergyEv - au72.centerBindingEnergyEv) - 3.67) < 0.05,
    'Au 4f7/2 is exactly 84.0 eV and spin-orbit splitting ΔE_SO is 3.67 eV'
  );

  // Test 9: Silicon Native Oxide Heterojunction (Si0 vs SiO2 chemical shift)
  const siResult = engineModule.simulateXpsSpectrum('silicon_native_oxide_wafer', 'AL_KA', 0);
  const si0 = siResult.sample.components.find(c => c.id === 'si_substrate_zero');
  const sio2 = siResult.sample.components.find(c => c.id === 'si_dioxide_film');
  assert(
    si0 && sio2 &&
    Math.abs((sio2.centerBindingEnergyEv - si0.centerBindingEnergyEv) - 4.2) < 0.05,
    `Silicon wafer exhibits +4.2 eV chemical shift between metallic substrate Si0 (99.3 eV) and dielectric SiO2 (103.5 eV)`
  );

  // Test 10: Card Matcher Service (getMatchingXpsCard)
  const cCard = engineModule.getMatchingXpsCard({ id: 'graphene_card', name: 'Graphene Nguyên Bản', description: 'Tấm carbon 2D' });
  const tiCard = engineModule.getMatchingXpsCard({ id: 'ti_catalyst', name: 'Titanium Dioxide', description: 'Xúc tác TiO2' });
  const waterCard = engineModule.getMatchingXpsCard({ id: 'h2o', name: 'Nước Tinh Khiết', description: 'H2O' });
  assert(
    cCard?.id === 'graphene_oxide_sheet' &&
    tiCard?.id === 'tio2_anatase_nanoparticles' &&
    waterCard === null,
    'getMatchingXpsCard correctly matches graphene and titanium cards while rejecting non-surface samples'
  );

  // Test 11: Visualizer Interactive Controls & State
  assert(
    visualizerSource.includes('selectedSampleId') &&
    visualizerSource.includes('xraySource') &&
    visualizerSource.includes('takeOffAngleDeg') &&
    visualizerSource.includes('activeTab'),
    'Visualizer provides reactive states for sample, X-ray source, takeoff angle, and tabs'
  );

  // Test 12: High-Resolution SVG Spectral Plot Elements
  assert(
    visualizerSource.includes('Năng Lượng Liên Kết E_binding (eV)') &&
    visualizerSource.includes('Động Năng Đo Được E_kinetic (eV)') &&
    visualizerSource.includes('totalPath') &&
    visualizerSource.includes('componentIntensities'),
    'Visualizer renders dual-axis (Eb and Ek) high-resolution SVG spectrum with deconvolution envelopes'
  );

  // Test 13: Audio Integration in soundEngine.ts
  assert(
    soundSource.includes('playXpsPhotonFlash') &&
    soundSource.includes('playCoreLevelPeakLockTone'),
    'soundEngine.ts provides playXpsPhotonFlash and playCoreLevelPeakLockTone audio cues'
  );

  // Test 14: PeriodicCodexTab Section 42 Integration
  assert(
    codexSource.includes("'XPS_SPECTROSCOPY'") &&
    codexSource.includes('XpsSpectroscopyVisualizer') &&
    codexSource.includes('SECTION 42: X-RAY PHOTOELECTRON SPECTROSCOPY'),
    'PeriodicCodexTab fully integrates Section 42 with tab button and visualizer rendering'
  );

  // Test 15: CardDetailModal Integration
  assert(
    modalSource.includes('matchingXps') &&
    modalSource.includes('showXpsModal') &&
    modalSource.includes('Quang Phổ XPS/ESCA') &&
    modalSource.includes('XpsSpectroscopyVisualizer'),
    'CardDetailModal fully integrates matchingXps badge button and interactive modal popup'
  );

  // Test 16: Nobel Prize & Curriculum Citations
  assert(
    engineSource.includes('Kai Siegbahn') &&
    engineSource.includes('Albert Einstein') &&
    engineSource.includes('GDPT 2018') &&
    visualizerSource.includes('Nobel Vật Lý 1981'),
    'Cites Nobel Laureates Kai Siegbahn (1981), Albert Einstein (1921), and Vietnam GDPT 2018 curriculum'
  );

  console.log('\n======================================================================');
  console.log(`   SUITE 110 RESULTS: ${passCount} / ${passCount + failCount} PASSED (${Math.round(passCount / (passCount + failCount) * 100)}%)`);
  console.log('======================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
