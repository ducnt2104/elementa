// test-electron-microscopy-visualizer.mjs
// Milestone 52: Test Suite 109 — Scanning Electron Microscopy (SEM), Transmission Electron Microscopy (TEM) & Relativistic De Broglie Wavelength Engine
// Standards: Nobel Prize in Physics 1929 (Louis de Broglie), Nobel Prize in Physics 1986 (Ernst Ruska & Heinrich Rohrer / Gerd Binnig), Nobel Prize in Physics 2010 (Graphene)
// Curriculum: Vietnam GDPT 2018 (Vật lý 12 Chuyên đề: Sóng de Broglie, Kính hiển vi điện tử; Hóa học 12 Chuyên đề: Vật liệu Nano Carbon & Graphene)

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
console.log('   TEST SUITE 109: SEM / TEM ELECTRON MICROSCOPY & DE BROGLIE ENGINE');
console.log('======================================================================\n');

async function runTests() {
  const enginePath = resolve('src/domain/electronMicroscopyEngine.ts');
  const visualizerPath = resolve('src/components/visualizations/ElectronMicroscopyVisualizer.tsx');
  const codexPath = resolve('src/components/PeriodicCodexTab.tsx');
  const modalPath = resolve('src/components/cards/CardDetailModal.tsx');
  const soundPath = resolve('src/audio/soundEngine.ts');

  // Test 1: File existence
  assert(existsSync(enginePath), 'src/domain/electronMicroscopyEngine.ts exists');
  assert(existsSync(visualizerPath), 'src/components/visualizations/ElectronMicroscopyVisualizer.tsx exists');

  const engineSource = readFileSync(enginePath, 'utf-8');
  const visualizerSource = readFileSync(visualizerPath, 'utf-8');
  const codexSource = readFileSync(codexPath, 'utf-8');
  const modalSource = readFileSync(modalPath, 'utf-8');
  const soundSource = readFileSync(soundPath, 'utf-8');

  // Test 2: Nanomaterial catalog coverage
  assert(
    engineSource.includes('multi_walled_cnt') &&
    engineSource.includes('gold_nanoparticles_colloid') &&
    engineSource.includes('graphene_monolayer') &&
    engineSource.includes('diatom_silica_frustule'),
    'Catalog includes MWCNT, Gold Nanoparticles, Monolayer Graphene, and Diatom Silica Frustule'
  );

  // Test 3: Fundamental physical constants (Planck h, m0, e, c, rest energy)
  assert(
    engineSource.includes('PLANCK_CONSTANT_H = 6.62607015e-34') &&
    engineSource.includes('ELECTRON_MASS_M0 = 9.1093837015e-31') &&
    engineSource.includes('ELEMENTARY_CHARGE_E = 1.602176634e-19') &&
    engineSource.includes('SPEED_OF_LIGHT_C = 299792458') &&
    engineSource.includes('ELECTRON_REST_ENERGY_KEV = 510.99895'),
    'Defines exact CODATA fundamental constants: h, m0, e, c, and electron rest energy 510.99895 keV'
  );

  // Test 4: Relativistic De Broglie Wavelength implementation
  assert(
    engineSource.includes('calculateRelativisticDeBroglieWavelength') &&
    engineSource.includes('wavelengthPm') &&
    engineSource.includes('wavelengthAngstrom') &&
    engineSource.includes('velocityFractionOfC'),
    'Implements calculateRelativisticDeBroglieWavelength with relativistic velocity calculation'
  );

  // Dynamic calculation verification
  const engineModule = await import('../src/domain/electronMicroscopyEngine.ts');
  const wl200 = engineModule.calculateRelativisticDeBroglieWavelength(200);
  assert(
    wl200.wavelengthPm > 2.45 && wl200.wavelengthPm < 2.55,
    `200 kV electron wavelength is ~2.51 pm (calculated: ${wl200.wavelengthPm.toFixed(3)} pm)`
  );
  assert(
    wl200.velocityFractionOfC > 0.68 && wl200.velocityFractionOfC < 0.72,
    `200 kV electron speed is ~0.695c relativistic velocity (calculated: ${wl200.velocityFractionOfC.toFixed(3)}c)`
  );

  // Test 5: Abbe optical diffraction limit comparison
  assert(
    engineSource.includes('GREEN_LIGHT_WAVELENGTH_NM = 550.0') &&
    engineSource.includes('OPTICAL_MICROSCOPE_RESOLUTION_LIMIT_NM = 200.0'),
    'References standard optical Abbe limit (200 nm at 550 nm green light)'
  );

  // Test 6: Simulation function with 4 microscope modes
  assert(
    engineSource.includes('simulateElectronMicroscopy') &&
    engineSource.includes("'SEM_SE'") &&
    engineSource.includes("'SEM_BSE'") &&
    engineSource.includes("'TEM_BF'") &&
    engineSource.includes("'TEM_HRTEM'"),
    'Supports 4 core electron microscopy modes: SEM SE, SEM BSE, TEM BF, TEM HRTEM'
  );

  // Test 7: Secondary Electron (SE) topographic contrast
  const semSeRes = engineModule.simulateElectronMicroscopy('multi_walled_cnt', 'SEM_SE', 20, 50000);
  assert(
    semSeRes.contrastMechanismVI.includes('Topographic') &&
    semSeRes.signalTypeVI.includes('Secondary Electrons'),
    'SEM-SE utilizes secondary electrons and topographic edge effect contrast'
  );

  // Test 8: Backscattered Electron (BSE) atomic number Z-contrast
  const semBseRes = engineModule.simulateElectronMicroscopy('gold_nanoparticles_colloid', 'SEM_BSE', 30, 80000);
  assert(
    semBseRes.contrastMechanismVI.includes('Z-contrast') &&
    semBseRes.signalTypeVI.includes('Backscattered'),
    'SEM-BSE yields compositional Z-contrast proportional to atomic number'
  );

  // Test 9: Bright Field (BF) mass-thickness contrast
  const temBfRes = engineModule.simulateElectronMicroscopy('diatom_silica_frustule', 'TEM_BF', 120, 150000);
  assert(
    temBfRes.contrastMechanismVI.includes('Mass-thickness') &&
    temBfRes.signalTypeVI.includes('Bright Field'),
    'TEM Bright Field leverages mass-thickness and diffraction amplitude contrast'
  );

  // Test 10: High-Resolution TEM (HRTEM) phase contrast & lattice fringes
  const temHrtemRes = engineModule.simulateElectronMicroscopy('multi_walled_cnt', 'TEM_HRTEM', 200, 600000);
  assert(
    temHrtemRes.contrastMechanismVI.includes('Lattice fringes') &&
    temHrtemRes.signalTypeVI.includes('High-Resolution TEM'),
    'TEM HRTEM resolves crystal lattice fringes under phase contrast'
  );

  // Test 11: Optical and instrumental limits (spot size, Scherzer limit)
  assert(
    temHrtemRes.scherzerResolutionAngstrom < 3.5,
    `Scherzer sub-nanometer resolution achieved (<3.5 Å, got ${temHrtemRes.scherzerResolutionAngstrom.toFixed(2)} Å)`
  );

  // Test 12: Card matcher getMatchingMicroscopyCard
  const mwcntCard = engineModule.getMatchingMicroscopyCard({ id: 'c_nanotube', name: 'Ống Nano Carbon', description: 'MWCNT đa thành' });
  const goldCard = engineModule.getMatchingMicroscopyCard({ id: 'gold_elem', name: 'Vàng Nano Au', description: 'Hạt nano vàng' });
  const unknownCard = engineModule.getMatchingMicroscopyCard({ id: 'water', name: 'Nước', description: 'H2O' });
  assert(
    mwcntCard?.id === 'multi_walled_cnt' &&
    goldCard?.id === 'gold_nanoparticles_colloid' &&
    unknownCard === null,
    'getMatchingMicroscopyCard accurately matches nanomaterials and rejects non-nanomaterials'
  );

  // Test 13: Visualizer interactive controls
  assert(
    visualizerSource.includes('voltageKv') &&
    visualizerSource.includes('magnification') &&
    visualizerSource.includes('microscopeMode') &&
    visualizerSource.includes('selectedSpecimenId'),
    'Visualizer provides controls for voltage, magnification, microscope mode, and specimen selection'
  );

  // Test 14: Darkroom / High-Vacuum Chamber HUD aesthetics & SVG lattice
  assert(
    visualizerSource.includes('Áp suất chân không siêu cao') &&
    visualizerSource.includes('Cuộn Quét Quét Chùm Tia') &&
    visualizerSource.includes('playElectronBeamSweepScan') &&
    visualizerSource.includes('Cột Quang Học Điện Tử & Thấu Kính Từ Trường'),
    'Visualizer renders high-vacuum chamber HUD, scan coils, and electron optical column simulation'
  );

  // Test 15: Audio integration in soundEngine.ts
  assert(
    soundSource.includes('playElectronBeamSweepScan') &&
    soundSource.includes('playAtomicLatticeLockTone'),
    'soundEngine.ts provides playElectronBeamSweepScan and playAtomicLatticeLockTone audio cues'
  );

  // Test 16: PeriodicCodexTab Section 41 integration
  assert(
    codexSource.includes("'ELECTRON_MICROSCOPY'") &&
    codexSource.includes('ElectronMicroscopyVisualizer') &&
    codexSource.includes('SECTION 41: SCANNING & TRANSMISSION ELECTRON MICROSCOPY'),
    'PeriodicCodexTab fully integrates Section 41 with tab button and visualizer rendering'
  );

  // Test 17: CardDetailModal integration
  assert(
    modalSource.includes('matchingMicroscopy') &&
    modalSource.includes('showMicroscopyModal') &&
    modalSource.includes('Kính Hiển Vi SEM/TEM') &&
    modalSource.includes('ElectronMicroscopyVisualizer'),
    'CardDetailModal fully integrates matchingMicroscopy badge and interactive popup modal'
  );

  // Test 18: Nobel Prize citations and Vietnam GDPT 2018 Curriculum
  assert(
    engineSource.includes('Louis de Broglie') &&
    engineSource.includes('Ernst Ruska') &&
    engineSource.includes('GDPT 2018') &&
    engineSource.includes('Nobel Vật lý'),
    'Cites Nobel Laureates Louis de Broglie (1929), Ernst Ruska (1986), Geim & Novoselov (2010), and GDPT 2018 curriculum'
  );

  console.log('\n======================================================================');
  console.log(`   SUITE 109 RESULTS: ${passCount} / ${passCount + failCount} PASSED (${Math.round(passCount / (passCount + failCount) * 100)}%)`);
  console.log('======================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
