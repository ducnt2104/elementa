// test-magnetic-tweezers-visualizer.mjs
// Milestone 66: Test Suite for Magnetic Tweezers, Supercoiling DNA Plectoneme & Topoisomerase Catalytic Engine

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
console.log('   TEST SUITE 123: MAGNETIC TWEEZERS & DNA SUPERCOILING ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'magneticTweezersEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'MagneticTweezersVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/magneticTweezersEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/MagneticTweezersVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/magneticTweezersEngine.ts');
const {
  MAGNETIC_TWEEZERS_CATALOG,
  DNA_BP_PER_TURN,
  DNA_RISE_PER_BP_NM,
  PLECTONEME_CONTRACTION_PER_TURN_NM,
  calculateMagneticForce,
  simulateMagneticTweezers,
  getMatchingMagneticTweezersCard
} = engineModule;

// Test 2: Catalog Coverage
assert(
  Array.isArray(MAGNETIC_TWEEZERS_CATALOG) && MAGNETIC_TWEEZERS_CATALOG.length >= 5,
  `Catalog contains ${MAGNETIC_TWEEZERS_CATALOG.length} single-molecule topological standards (Lambda 0.35 pN, Lambda 3.0 pN, Topo I, DNA Gyrase, Topo IIα)`
);

// Test 3: Fundamental Watson-Crick B-DNA Parameters & White's Theorem Standards
assert(
  DNA_BP_PER_TURN === 10.5,
  'Canonical B-DNA helical repeat pitch = 10.5 bp/turn (IUPAC standard)'
);
assert(
  DNA_RISE_PER_BP_NM === 0.34,
  'Axial rise per base pair = 0.34 nm/bp'
);
assert(
  PLECTONEME_CONTRACTION_PER_TURN_NM === 52.0,
  'Linear extension contraction per plectonemic turn = 52.0 nm/turn'
);

// Test 4: Magnetic Force Distance Decay F(z) = 25.0 * exp(-z / 1.8)
const f18 = calculateMagneticForce(1.8);
assert(
  Math.abs(f18 - 9.20) < 0.1,
  `Constant magnetic pulling force at 1.8 mm = ${f18} pN (expected ~9.20 pN)`
);

const f36 = calculateMagneticForce(3.6);
assert(
  Math.abs(f36 - 3.38) < 0.1,
  `Constant magnetic pulling force at 3.6 mm = ${f36} pN (expected ~3.38 pN)`
);

const f54 = calculateMagneticForce(5.4);
assert(
  Math.abs(f54 - 1.24) < 0.1,
  `Constant magnetic pulling force at 5.4 mm = ${f54} pN (expected ~1.24 pN)`
);

// Test 5: Low-Force Regime (0.35 pN) - Symmetric Plectoneme Buckling Hat Curve
const lowForceSim = simulateMagneticTweezers('lambda_dna_supercoiling_03pn', 7.5);
assert(lowForceSim.specimen.id === 'lambda_dna_supercoiling_03pn', 'Simulates low-force λ-DNA supercoiling');
assert(lowForceSim.actualForcePn < 1.0, `Actual pulling force is low: ${lowForceSim.actualForcePn} pN`);
assert(lowForceSim.rotationCurve.length > 50, `Rotation curve contains ${lowForceSim.rotationCurve.length} data points`);

// Verify symmetric buckling
const pointZero = lowForceSim.rotationCurve.find((p) => p.turns === 0);
const pointPos30 = lowForceSim.rotationCurve.find((p) => p.turns === 30);
const pointNeg30 = lowForceSim.rotationCurve.find((p) => p.turns === -30);

assert(pointZero?.state === 'TWIST_ELASTIC', 'DNA at 0 turns is in TWIST_ELASTIC state');
assert(pointPos30?.state === 'PLECTONEME_BUCKLING', 'DNA at +30 turns is in PLECTONEME_BUCKLING state');
assert(pointNeg30?.state === 'PLECTONEME_BUCKLING', 'DNA at -30 turns is also in PLECTONEME_BUCKLING state (symmetric)');
assert(
  pointPos30 && pointNeg30 && Math.abs(pointPos30.extensionMicrons - pointNeg30.extensionMicrons) < 0.05,
  `Symmetric extension contraction: +30 turns (${pointPos30?.extensionMicrons} µm) ≈ -30 turns (${pointNeg30?.extensionMicrons} µm)`
);

// Test 6: High-Force Regime (3.0 pN) - Asymmetric Denaturation & Bubble Melting
const highForceSim = simulateMagneticTweezers('lambda_dna_supercoiling_30pn', 3.8);
assert(highForceSim.specimen.id === 'lambda_dna_supercoiling_30pn', 'Simulates high-force λ-DNA supercoiling');
assert(highForceSim.actualForcePn >= 2.5, `Actual pulling force is high: ${highForceSim.actualForcePn} pN`);

const highPointNeg30 = highForceSim.rotationCurve.find((p) => p.turns === -30);
assert(
  highPointNeg30?.state === 'MELTED_BUBBLE',
  'Negative turns under high force create MELTED_BUBBLE denaturation state'
);
assert(
  highPointNeg30 && highPointNeg30.extensionMicrons > 5.0,
  `DNA extension remains high under negative untwisting due to bubble melting: ${highPointNeg30?.extensionMicrons} µm`
);

// Test 7: Human Topoisomerase IB Real-time Swiveling Relaxation (ΔLk = +1)
const topoISim = simulateMagneticTweezers('topoisomerase_i_relaxation', 7.0);
assert(topoISim.specimen.id === 'topoisomerase_i_relaxation', 'Simulates human Topo IB');
assert(topoISim.specimen.catalyticStepDeltaLk === 1, 'Topoisomerase I step size: ΔLk = +1');
assert(
  Array.isArray(topoISim.topoisomeraseTrace) && topoISim.topoisomeraseTrace.length > 50,
  `Topoisomerase stepping trace generated with ${topoISim.topoisomeraseTrace?.length} points`
);

// Test 8: Bacterial DNA Gyrase ATP-Driven Negative Supercoiling (ΔLk = -2, Ciprofloxacin)
const gyraseSim = simulateMagneticTweezers('dna_gyrase_negative_supercoiling', 6.8);
assert(gyraseSim.specimen.id === 'dna_gyrase_negative_supercoiling', 'Simulates E. coli DNA Gyrase');
assert(gyraseSim.specimen.catalyticStepDeltaLk === -2, 'DNA Gyrase catalytic step size: ΔLk = -2');
assert(
  gyraseSim.specimen.inhibitorDrug?.includes('Ciprofloxacin'),
  'Gyrase model documents Ciprofloxacin fluoroquinolone inhibition'
);

// Test 9: Human Topoisomerase IIα Decatenation & Etoposide
const topoIISim = simulateMagneticTweezers('topo_ii_alpha_decatenation', 6.5);
assert(topoIISim.specimen.id === 'topo_ii_alpha_decatenation', 'Simulates human Topo IIα');
assert(topoIISim.specimen.catalyticStepDeltaLk === 2, 'Topoisomerase II catalytic step size: ΔLk = +2');
assert(
  topoIISim.specimen.inhibitorDrug?.includes('Etoposide'),
  'Topo II documents chemotherapeutic Etoposide poison'
);

// Test 10: Intelligent Card Matcher
const matchGyrase = getMatchingMagneticTweezersCard({ id: 'card_cipro_antibiotic', name: 'Ciprofloxacin Gyrase Blocker', category: 'ANTIBIOTIC' });
assert(matchGyrase?.id === 'dna_gyrase_negative_supercoiling', 'Card with "gyrase/ciprofloxacin" matches dna_gyrase_negative_supercoiling');

const matchTopoII = getMatchingMagneticTweezersCard({ id: 'card_etoposide_chemo', name: 'Etoposide Topo II Inhibitor', category: 'ONCOLOGY' });
assert(matchTopoII?.id === 'topo_ii_alpha_decatenation', 'Card with "topo ii/etoposide" matches topo_ii_alpha_decatenation');

const matchTopoI = getMatchingMagneticTweezersCard({ id: 'card_topoisomerase_swivel', name: 'Topoisomerase Swivel Relaxer', category: 'ENZYME' });
assert(matchTopoI?.id === 'topoisomerase_i_relaxation', 'Card with "topo/swivel" matches topoisomerase_i_relaxation');

const matchBubble = getMatchingMagneticTweezersCard({ id: 'card_dna_melt', name: 'DNA Bubble Denaturation', category: 'NUCLEIC_ACID' });
assert(matchBubble?.id === 'lambda_dna_supercoiling_30pn', 'Card with "bubble/melt" matches lambda_dna_supercoiling_30pn');

const matchPlectoneme = getMatchingMagneticTweezersCard({ id: 'card_dna_supercoil', name: 'Plectonemic DNA Supercoil', category: 'NUCLEIC_ACID' });
assert(matchPlectoneme?.id === 'lambda_dna_supercoiling_03pn', 'Card with "supercoil/plectoneme" matches lambda_dna_supercoiling_03pn');

const matchFallback = getMatchingMagneticTweezersCard({ id: 'card_magnet_bead', name: 'Superparamagnetic Bead', category: 'INSTRUMENT' });
assert(matchFallback?.id === 'lambda_dna_supercoiling_03pn', 'Card with "magnet/bead" falls back cleanly to primary standard');

const matchNull = getMatchingMagneticTweezersCard({ id: 'card_silver_coin', name: 'Silver Coin', category: 'TREASURE' });
assert(matchNull === null, 'Unrelated card returns null');

// Test 11: PeriodicCodexTab UI Integration
const codexContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf-8');
assert(codexContent.includes('MagneticTweezersVisualizer'), 'PeriodicCodexTab imports MagneticTweezersVisualizer');
assert(codexContent.includes('MAGNETIC_TWEEZERS'), 'PeriodicCodexTab contains MAGNETIC_TWEEZERS tab mode');
assert(codexContent.includes('playMagneticBeadRotationTone'), 'PeriodicCodexTab plays magnetic bead rotation tone');
assert(codexContent.includes('SECTION 55: MAGNETIC TWEEZERS'), 'PeriodicCodexTab integrates SECTION 55 view container');

// Test 12: CardDetailModal UI Integration
const modalContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf-8');
assert(modalContent.includes('getMatchingMagneticTweezersCard'), 'CardDetailModal imports getMatchingMagneticTweezersCard');
assert(modalContent.includes('matchingMagneticTweezers'), 'CardDetailModal computes matchingMagneticTweezers memo');
assert(modalContent.includes('showMagneticTweezersModal'), 'CardDetailModal declares showMagneticTweezersModal state');
assert(modalContent.includes('Bẫy Từ Siêu Xoắn ADN:'), 'CardDetailModal displays Magnetic Tweezers action pill');
assert(modalContent.includes('<MagneticTweezersVisualizer'), 'CardDetailModal renders MagneticTweezersVisualizer in modal');

// Test 13: Web Audio Engine Integration
const soundContent = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf-8');
assert(soundContent.includes('playMagneticBeadRotationTone'), 'soundEngine implements playMagneticBeadRotationTone');
assert(soundContent.includes('playTopoisomeraseCatalyticStepChime'), 'soundEngine implements playTopoisomeraseCatalyticStepChime');

console.log('\n======================================================================');
console.log(`   TEST SUITE 123 SUMMARY: ${passedTests} / ${totalTests} ASSERTIONS PASSED`);
console.log('======================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
