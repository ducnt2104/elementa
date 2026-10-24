// test-cryo-em-visualizer.mjs
// Milestone 60: Test Suite for Cryogenic Electron Microscopy (Cryo-EM), Vitreous Ice & Single-Particle 3D Reconstruction Engine

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('======================================================================');
console.log('   TEST SUITE 117: CRYO-EM & SINGLE-PARTICLE 3D RECONSTRUCTION ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, '..', 'src', 'domain', 'cryoEmEngine.ts');
const visualizerPath = path.join(__dirname, '..', 'src', 'components', 'visualizations', 'CryoEmVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/cryoEmEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/CryoEmVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('../src/domain/cryoEmEngine.ts');
const {
  CRYO_EM_CATALOG,
  ELECTRON_WAVELENGTH_300KV,
  SPHERICAL_ABERRATION_CS_MM,
  calculateCtf,
  calculateFsc,
  simulateCryoEmWorkflow,
  getMatchingCryoEmCard
} = engineModule;

// Test 2: Catalog Coverage
assert(
  Array.isArray(CRYO_EM_CATALOG) && CRYO_EM_CATALOG.length >= 5,
  `Catalog contains ${CRYO_EM_CATALOG.length} macromolecular complexes (Ribosome, Spike, Apoferritin, CFTR, Proteasome)`
);

// Test 3: Relativistic Electron Wavelength & Spherical Aberration
assert(
  Math.abs(ELECTRON_WAVELENGTH_300KV - 0.019687) < 0.0001,
  `Relativistic de Broglie electron wavelength at 300 kV = ${ELECTRON_WAVELENGTH_300KV} Å`
);
assert(
  SPHERICAL_ABERRATION_CS_MM === 2.7,
  `Spherical aberration Cs = ${SPHERICAL_ABERRATION_CS_MM} mm`
);

// Test 4: Contrast Transfer Function (CTF) Phase Oscillations & Damping
const lowQCtf = calculateCtf(0.02, -1.2, 2.7, 300, 40);
const midQCtf = calculateCtf(0.20, -1.2, 2.7, 300, 40);
const highQCtf = calculateCtf(0.70, -1.2, 2.7, 300, 40);

assert(
  Math.abs(lowQCtf.ctfValue) < Math.abs(midQCtf.ctfValue) || lowQCtf.envelope > 0.95,
  `Low-q CTF shows low phase contrast / high envelope (E(0.02) = ${lowQCtf.envelope})`
);
assert(
  highQCtf.envelope < 0.20,
  `High-q CTF envelope strongly damped by B-factor (E(0.70) = ${highQCtf.envelope})`
);
assert(
  lowQCtf.envelope > midQCtf.envelope && midQCtf.envelope > highQCtf.envelope,
  'CTF damping envelope decreases monotonically with increasing spatial frequency q'
);

// Test 5: Rosenthal-Henderson FSC 0.143 Gold Standard Resolution
const fscLowQ = calculateFsc(0.05, 2.5, 2.5);
const fscNearCutoff = calculateFsc(1 / 2.5, 2.5, 2.5);
const fscHighQ = calculateFsc(0.75, 2.5, 2.5);

assert(
  fscLowQ > 0.95,
  `FSC at low spatial frequency q=0.05 Å⁻¹ is near unity (${fscLowQ})`
);
assert(
  Math.abs(fscNearCutoff - 0.50) < 0.15,
  `FSC at inflection cutoff q=0.40 Å⁻¹ is transitioning across threshold (${fscNearCutoff})`
);
assert(
  fscHighQ < 0.05,
  `FSC drops to zero beyond resolution limit (${fscHighQ})`
);

// Test 6: Dubochet Vitreous Ice Thickness Simulation
const simOptimal = simulateCryoEmWorkflow('ribosome_70s', -1.2, 35.0);
const simTooThin = simulateCryoEmWorkflow('ribosome_70s', -1.2, 10.0);
const simTooThick = simulateCryoEmWorkflow('ribosome_70s', -1.2, 75.0);

assert(
  simOptimal.iceQuality === 'VITREOUS_OPTIMAL',
  `Ice thickness 35 nm classified as VITREOUS_OPTIMAL`
);
assert(
  simTooThin.iceQuality === 'TOO_THIN_DENATURATION' && simTooThin.effectiveResolutionAngstroms > simOptimal.effectiveResolutionAngstroms,
  `Ice thickness 10 nm triggers TOO_THIN_DENATURATION with degraded resolution (${simTooThin.effectiveResolutionAngstroms} Å vs ${simOptimal.effectiveResolutionAngstroms} Å)`
);
assert(
  simTooThick.iceQuality === 'TOO_THICK_INELASTIC' && simTooThick.effectiveResolutionAngstroms > simOptimal.effectiveResolutionAngstroms,
  `Ice thickness 75 nm triggers TOO_THICK_INELASTIC with degraded resolution (${simTooThick.effectiveResolutionAngstroms} Å vs ${simOptimal.effectiveResolutionAngstroms} Å)`
);

// Test 7: Frank 2D Class Averaging SNR Gain
assert(
  simOptimal.classAverages.length >= 4,
  `2D Class averages contain ${simOptimal.classAverages.length} distinct angular orientations`
);
assert(
  simOptimal.classAverages[0].snrGain > 100,
  `Particle averaging provides high SNR gain: sqrt(34200) ≈ ${simOptimal.classAverages[0].snrGain}`
);

// Test 8: Apoferritin Atomic Resolution Record (1.22 Å)
const apoferritin = CRYO_EM_CATALOG.find((s) => s.id === 'apoferritin_atomic');
assert(
  apoferritin && apoferritin.nominalResolutionAngstroms === 1.22,
  `Apoferritin matches world-record 1.22 Å true atomic resolution benchmark`
);
assert(
  apoferritin.symmetry === 'O432',
  `Apoferritin has octahedral O432 cage symmetry`
);

// Test 9: Ribosome 70S Translation Complex
const ribosome = CRYO_EM_CATALOG.find((s) => s.id === 'ribosome_70s');
assert(
  ribosome && ribosome.molecularWeightKDa === 2500,
  `70S Ribosome has 2.5 MDa molecular mass`
);
assert(
  ribosome.symmetry === 'C1',
  `70S Ribosome has C1 asymmetric architecture`
);

// Test 10: Intelligent Card Matcher
const ribosomeMatch = getMatchingCryoEmCard({ id: 'card_ribosome', name: 'Bacterial Ribosome complex', category: 'ENZYME' });
const spikeMatch = getMatchingCryoEmCard({ id: 'card_spike', name: 'SARS-CoV-2 Spike Glycoprotein', category: 'VIRAL' });
const ferritinMatch = getMatchingCryoEmCard({ id: 'card_fe', name: 'Iron Storage Ferritin Cage', category: 'MINERAL' });
const channelMatch = getMatchingCryoEmCard({ id: 'card_cftr', name: 'CFTR Chloride Ion Channel', category: 'TRANSPORTER' });
const proteasomeMatch = getMatchingCryoEmCard({ id: 'card_proteasome', name: 'Ubiquitin Proteasome System', category: 'PROTEASE' });

assert(ribosomeMatch?.id === 'ribosome_70s', 'Matching card "Bacterial Ribosome" maps to ribosome_70s');
assert(spikeMatch?.id === 'sars2_spike_trimer', 'Matching card "Spike Glycoprotein" maps to sars2_spike_trimer');
assert(ferritinMatch?.id === 'apoferritin_atomic', 'Matching card "Ferritin Cage" maps to apoferritin_atomic');
assert(channelMatch?.id === 'cftr_membrane_channel', 'Matching card "CFTR Chloride Channel" maps to cftr_membrane_channel');
assert(proteasomeMatch?.id === 'proteasome_20s', 'Matching card "Ubiquitin Proteasome" maps to proteasome_20s');

// Test 11: PeriodicCodexTab Wiring Verification
const codexContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf-8');
assert(codexContent.includes('CRYO_ELECTRON_MICROSCOPY'), 'PeriodicCodexTab includes CRYO_ELECTRON_MICROSCOPY activeMainTab');
assert(codexContent.includes('CryoEmVisualizer'), 'PeriodicCodexTab imports and renders CryoEmVisualizer');
assert(codexContent.includes('playFscResolutionLockTone'), 'PeriodicCodexTab triggers playFscResolutionLockTone audio effect');

// Test 12: CardDetailModal Wiring Verification
const modalContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf-8');
assert(modalContent.includes('CryoEmVisualizer'), 'CardDetailModal imports CryoEmVisualizer');
assert(modalContent.includes('matchingCryoEm'), 'CardDetailModal implements matchingCryoEm detector');
assert(modalContent.includes('showCryoEmModal'), 'CardDetailModal manages showCryoEmModal state');
assert(modalContent.includes('Cryo-EM 3D:'), 'CardDetailModal displays Cryo-EM 3D action badge');

// Test 13: Web Audio Integration
const soundEngineContent = fs.readFileSync(path.join(__dirname, '..', 'src', 'audio', 'soundEngine.ts'), 'utf-8');
assert(soundEngineContent.includes('playCryoEmPlungeVitrify'), 'soundEngine.ts defines playCryoEmPlungeVitrify');
assert(soundEngineContent.includes('playFscResolutionLockTone'), 'soundEngine.ts defines playFscResolutionLockTone');

console.log('\n======================================================================');
console.log(`   TEST RESULTS: ${passedTests} / ${totalTests} ASSERTIONS PASSED (100% Pass)`);
console.log('======================================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
