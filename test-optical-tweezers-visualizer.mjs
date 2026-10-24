// test-optical-tweezers-visualizer.mjs
// Milestone 65: Test Suite for Optical Tweezers, Photonic Momentum & Single-Molecule Force Spectroscopy Engine

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
console.log('   TEST SUITE 122: OPTICAL TWEEZERS & SINGLE-MOLECULE FORCE ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'opticalTweezersEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'OpticalTweezersVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/opticalTweezersEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/OpticalTweezersVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/opticalTweezersEngine.ts');
const {
  OPTICAL_TWEEZERS_CATALOG,
  BOLTZMANN_KT_PN_NM,
  LASER_TRAP_WAVELENGTH_NM,
  calculateMarkoSiggiaForce,
  calculateTrapStiffness,
  simulateOpticalTweezers,
  getMatchingOpticalTweezersCard
} = engineModule;

// Test 2: Catalog Coverage
assert(
  Array.isArray(OPTICAL_TWEEZERS_CATALOG) && OPTICAL_TWEEZERS_CATALOG.length >= 5,
  `Catalog contains ${OPTICAL_TWEEZERS_CATALOG.length} biophysical single-molecule standards (Lambda DNA, Kinesin, Titin Ig27, RNA Pseudoknot, Flagellar Motor)`
);

// Test 3: Fundamental Physical Constants & Ashkin Laser Standard
assert(
  BOLTZMANN_KT_PN_NM === 4.114,
  `Thermal energy k_B·T = 4.114 pN·nm at room temperature 298.15 K (CODATA)`
);
assert(
  LASER_TRAP_WAVELENGTH_NM === 1064.0,
  `Infrared optical trapping laser wavelength λ = 1064.0 nm (Nd:YAG/Fiber)`
);

// Test 4: Marko-Siggia Worm-Like Chain (WLC) Force Model Calculation
// Zero extension gives 0 force
const fZero = calculateMarkoSiggiaForce(0, 1000, 50.0);
assert(fZero === 0, 'Marko-Siggia force at extension 0 nm is 0 pN');

// Negative extension returns 0 force
const fNeg = calculateMarkoSiggiaForce(-10, 1000, 50.0);
assert(fNeg === 0, 'Marko-Siggia force at negative extension is 0 pN');

// Normal entropic extension: x = 500 nm on L0 = 1000 nm (z = 0.5)
// F = (4.114 / 50) * [ 1/(4*(1-0.5)^2) - 0.25 + 0.5 ] = 0.08228 * [ 1 - 0.25 + 0.5 ] = 0.08228 * 1.25 ≈ 0.10 pN
const fHalf = calculateMarkoSiggiaForce(500, 1000, 50.0);
assert(
  fHalf > 0.05 && fHalf < 0.2,
  `Entropic WLC spring force at 50% contour extension = ${fHalf} pN (expected ~0.10 pN)`
);

// Near full extension: x = 900 nm on L0 = 1000 nm (z = 0.9)
// 1/(4*(0.1)^2) = 25 -> sharp non-linear force divergence
const fHigh = calculateMarkoSiggiaForce(900, 1000, 50.0);
assert(
  fHigh > 1.5,
  `Non-linear entropic divergence at 90% contour extension = ${fHigh} pN (expected > 1.5 pN)`
);

// Test 5: Laser Trap Stiffness κ_trap Scaling
const kappa100 = calculateTrapStiffness(100);
assert(
  kappa100 === 0.25,
  `Optical trap stiffness at 100 mW laser power = ${kappa100} pN/nm (expected 0.25 pN/nm)`
);

const kappa200 = calculateTrapStiffness(200);
assert(
  kappa200 === 0.5,
  `Optical trap stiffness at 200 mW laser power = ${kappa200} pN/nm (expected 0.50 pN/nm)`
);

// Test 6: Bacteriophage λ-DNA Stretching & 65 pN Overstretching Plateau
const dnaSim = simulateOpticalTweezers('lambda_dna_wlc', 100);
assert(dnaSim.specimen.id === 'lambda_dna_wlc', 'Simulates λ-DNA elasticity');
assert(dnaSim.specimen.experimentType === 'WLC_DNA_ELASTICITY', 'Experiment type is WLC_DNA_ELASTICITY');
assert(dnaSim.dataPoints.length > 100, `Generated ${dnaSim.dataPoints.length} force-extension coordinates`);
assert(dnaSim.isStalledOrOverstretched === true, 'Successfully triggers 65 pN overstretching cooperative transition');
assert(
  dnaSim.maxForcePn >= 65.0,
  `Maximum tensile force reaches overstretched S-DNA regime: ${dnaSim.maxForcePn} pN`
);

// Verify plateau data points near 65 pN
const plateauPoints = dnaSim.dataPoints.filter((p) => p.forcePicoNewtons >= 62 && p.forcePicoNewtons <= 72);
assert(
  plateauPoints.length >= 10,
  `Detected ${plateauPoints.length} discrete data points along the B-to-S cooperative plateau (62-72 pN)`
);

// Test 7: Kinesin-1 Molecular Motor 8.2 nm Stepping Trace
const kinesinSim = simulateOpticalTweezers('kinesin_microtubule_steps', 80);
assert(kinesinSim.specimen.id === 'kinesin_microtubule_steps', 'Simulates Kinesin-1 processive motor');
assert(kinesinSim.specimen.stepSizeNm === 8.2, 'Step size matches tubulin repeat: 8.2 nm');
assert(kinesinSim.specimen.stallForcePn === 6.0, 'Stall force under load: 6.0 pN');
assert(
  Array.isArray(kinesinSim.steppingTrace) && kinesinSim.steppingTrace.length > 50,
  `Stepping trace generated with ${kinesinSim.steppingTrace?.length} temporal time points`
);

// Test 8: Titin Ig27 Octamer Saw-Tooth Mechanical Unfolding
const titinSim = simulateOpticalTweezers('titin_ig27_octamer', 120);
assert(titinSim.specimen.id === 'titin_ig27_octamer', 'Simulates Titin Ig27 muscle polyprotein');
assert(titinSim.specimen.unfoldingForcePn === 200.0, 'Unfolding force threshold: 200 pN');
assert(
  titinSim.maxForcePn >= 180.0,
  `Titin saw-tooth peak force exceeds 180 pN: ${titinSim.maxForcePn} pN`
);

// Test 9: RNA Pseudoknot & Flagellar Motor Catalog Elements
const rnaSim = simulateOpticalTweezers('rna_pseudoknot_unzip', 100);
assert(rnaSim.specimen.unfoldingForcePn === 14.5, 'RNA pseudoknot unzipping barrier: 14.5 pN');

const flagellaSim = simulateOpticalTweezers('flagellar_motor_torque', 100);
assert(flagellaSim.specimen.stallForcePn === 4.5, 'Flagellar motor stall force: 4.5 pN');

// Test 10: Intelligent Card Matcher
const matchDna = getMatchingOpticalTweezersCard({ id: 'card_dna_helix', name: 'DNA Double Helix', category: 'NUCLEIC_ACID' });
assert(matchDna?.id === 'lambda_dna_wlc', 'Card with "DNA" matches lambda_dna_wlc');

const matchKinesin = getMatchingOpticalTweezersCard({ id: 'card_kinesin_motor', name: 'Kinesin Microtubule Motor', category: 'PROTEIN' });
assert(matchKinesin?.id === 'kinesin_microtubule_steps', 'Card with "motor/microtubule" matches kinesin_microtubule_steps');

const matchTitin = getMatchingOpticalTweezersCard({ id: 'card_titin_muscle', name: 'Titin Muscle Fiber', category: 'PROTEIN' });
assert(matchTitin?.id === 'titin_ig27_octamer', 'Card with "titin/muscle" matches titin_ig27_octamer');

const matchRna = getMatchingOpticalTweezersCard({ id: 'card_viral_pseudoknot', name: 'RNA Pseudoknot Hairpin', category: 'VIRAL' });
assert(matchRna?.id === 'rna_pseudoknot_unzip', 'Card with "pseudoknot/unzip" matches rna_pseudoknot_unzip');

const matchFlagellar = getMatchingOpticalTweezersCard({ id: 'card_bacterial_flagella', name: 'Bacterial Rotary Flagellum', category: 'CELL' });
assert(matchFlagellar?.id === 'flagellar_motor_torque', 'Card with "flagellar/rotary" matches flagellar_motor_torque');

const matchLaserFallback = getMatchingOpticalTweezersCard({ id: 'card_laser_pico', name: 'Picosecond Laser Trap', category: 'PHYSICS' });
assert(matchLaserFallback?.id === 'lambda_dna_wlc', 'Card with "laser/pico" falls back cleanly to primary standard');

const matchNull = getMatchingOpticalTweezersCard({ id: 'card_iron_ingot', name: 'Iron Ingot', category: 'MINERAL' });
assert(matchNull === null, 'Unrelated card returns null');

// Test 11: PeriodicCodexTab UI Integration
const codexContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf-8');
assert(codexContent.includes('OpticalTweezersVisualizer'), 'PeriodicCodexTab imports OpticalTweezersVisualizer');
assert(codexContent.includes('OPTICAL_TWEEZERS'), 'PeriodicCodexTab contains OPTICAL_TWEEZERS tab mode');
assert(codexContent.includes('playOpticalTrapCaptureTone'), 'PeriodicCodexTab plays optical trap audio tone');
assert(codexContent.includes('SECTION 54: OPTICAL TWEEZERS'), 'PeriodicCodexTab integrates SECTION 54 view container');

// Test 12: CardDetailModal UI Integration
const modalContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf-8');
assert(modalContent.includes('getMatchingOpticalTweezersCard'), 'CardDetailModal imports getMatchingOpticalTweezersCard');
assert(modalContent.includes('matchingOpticalTweezers'), 'CardDetailModal computes matchingOpticalTweezers memo');
assert(modalContent.includes('showOpticalTweezersModal'), 'CardDetailModal declares showOpticalTweezersModal state');
assert(modalContent.includes('Bẫy Quang Học Laser:'), 'CardDetailModal displays Optical Tweezers action pill');
assert(modalContent.includes('<OpticalTweezersVisualizer'), 'CardDetailModal renders OpticalTweezersVisualizer in modal');

// Test 13: Web Audio Engine Integration
const soundContent = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf-8');
assert(soundContent.includes('playOpticalTrapCaptureTone'), 'soundEngine implements playOpticalTrapCaptureTone');
assert(soundContent.includes('playDnaOverstretchingSnapTone'), 'soundEngine implements playDnaOverstretchingSnapTone');

console.log('\n======================================================================');
console.log(`   TEST SUITE 122 SUMMARY: ${passedTests} / ${totalTests} ASSERTIONS PASSED`);
console.log('======================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
