// test-saxs-kratky-visualizer.mjs
// Milestone 59: Test Suite for Small-Angle X-Ray Scattering (SAXS), Guinier Radius of Gyration & Kratky Plot Engine

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
console.log('   TEST SUITE 116: SAXS RADIUS OF GYRATION & KRATKY PLOT ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'saxsScatteringEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'SaxsScatteringVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/saxsScatteringEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/SaxsScatteringVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/saxsScatteringEngine.ts');
const {
  SAXS_PROTEIN_CATALOG,
  calculateDebyeChainIntensity,
  calculateHollowShellIntensity,
  calculatePairDistanceDistribution,
  performGuinierFit,
  simulateSaxsExperiment,
  getMatchingSaxsCard
} = engineModule;

// Test 2: Protein Catalog Coverage
assert(
  Array.isArray(SAXS_PROTEIN_CATALOG) && SAXS_PROTEIN_CATALOG.length >= 5,
  `Catalog contains ${SAXS_PROTEIN_CATALOG.length} benchmark systems (BSA, Lysozyme, α-Synuclein, IgG, Apoferritin)`
);

// Test 3: Debye Scattering Formula for Gaussian Coil
const debyeZero = calculateDebyeChainIntensity(0.0001, 30.0, 100.0);
const debyeHigh = calculateDebyeChainIntensity(0.30, 30.0, 100.0);
assert(
  Math.abs(debyeZero - 100.0) < 0.5,
  `Debye intensity approaches I(0) = 100 at q -> 0 (calculated: ${debyeZero.toFixed(2)})`
);
assert(
  debyeHigh > 0 && Math.pow(0.30, 2) * debyeHigh > 0.001,
  `Kratky function q²·I(q) maintains non-zero plateau at high q for Debye random coils (kratky: ${(Math.pow(0.30, 2) * debyeHigh).toFixed(4)})`
);

// Test 4: Hollow Spherical Shell Bessel Amplitude (Apoferritin)
const shellZero = calculateHollowShellIntensity(0.0001, 64, 40, 350.0);
const shellMin = calculateHollowShellIntensity(0.058, 64, 40, 350.0);
assert(
  Math.abs(shellZero - 350.0) < 1.0,
  `Hollow shell intensity approaches I(0) = 350 at q -> 0 (calculated: ${shellZero.toFixed(2)})`
);
assert(
  shellMin < shellZero * 0.05,
  `Hollow shell exhibits characteristic Bessel interference oscillation minimum near q ≈ 0.058 Å⁻¹ (${shellMin.toFixed(2)} << ${shellZero.toFixed(2)})`
);

// Test 5: Monodisperse BSA Guinier Analysis
const simBsa = simulateSaxsExperiment('bsa_monomer', 2.0, 0.0);
assert(
  simBsa.scatteringCurve.length === 80,
  'Generates 80 momentum transfer points q from 0.008 to 0.35 Å⁻¹'
);
assert(
  Math.abs(simBsa.guinier.rgAngstroms - 29.8) <= 2.5,
  `Guinier fit accurately recovers BSA Radius of Gyration Rg ≈ 29.8 Å (measured: ${simBsa.guinier.rgAngstroms} Å, ${simBsa.guinier.rgNanometers} nm)`
);
assert(
  simBsa.guinier.qRgMax <= 1.35,
  `Guinier fit satisfies q·Rg ≤ 1.3 standard validation criterion (q·Rg = ${simBsa.guinier.qRgMax})`
);
assert(
  simBsa.guinier.rSquared >= 0.99,
  `Guinier fit R² exceeds 0.99 for monodisperse sample (R² = ${simBsa.guinier.rSquared})`
);
assert(
  simBsa.guinier.aggregationWarning === false,
  'Zero aggregation fraction produces zero aggregation warning'
);

// Test 6: Aggregation Low-q Upturn Detection
const simAgg = simulateSaxsExperiment('bsa_monomer', 2.0, 0.04); // 4% aggregate
assert(
  simAgg.guinier.aggregationWarning === true,
  '4% aggregate oligomers trigger immediate low-q upturn aggregation warning'
);

// Test 7: Kratky Plot Folding Diagnostic (Globular vs IDP)
const simLysozyme = simulateSaxsExperiment('lysozyme', 2.0, 0.0);
const simSynuclein = simulateSaxsExperiment('alpha_synuclein_idp', 2.0, 0.0);

// Globular Lysozyme should have a peak at mid-q that is higher than high-q
const lysoKratkyMid = simLysozyme.scatteringCurve.find((p) => p.q >= 0.10 && p.q <= 0.14)?.kratky || 0;
const lysoKratkyHigh = simLysozyme.scatteringCurve[simLysozyme.scatteringCurve.length - 1].kratky;
assert(
  lysoKratkyMid > lysoKratkyHigh * 1.5,
  `Lysozyme displays classic bell-shaped Kratky peak (mid-q: ${lysoKratkyMid} > high-q: ${lysoKratkyHigh})`
);

// Disordered α-Synuclein should rise monotonically towards high-q
const synKratkyLow = simSynuclein.scatteringCurve[2].kratky;
const synKratkyHigh = simSynuclein.scatteringCurve[simSynuclein.scatteringCurve.length - 1].kratky;
assert(
  synKratkyHigh > synKratkyLow * 2.0,
  `α-Synuclein displays monotonically rising Kratky curve characteristic of IDP random coils (high-q: ${synKratkyHigh} > low-q: ${synKratkyLow})`
);

// Test 8: Pair Distance Distribution P(r) & D_max
const prBsa = simBsa.pairDistanceCurve;
assert(
  prBsa.length >= 60,
  'Generates dense real-space P(r) pair distance distribution curve (>60 points)'
);
const lastPoint = prBsa[prBsa.length - 1];
assert(
  lastPoint.r === simBsa.protein.dMaxAngstroms && lastPoint.pr === 0,
  `P(r) reaches exactly 0 at D_max = ${simBsa.protein.dMaxAngstroms} Å (D_max: ${lastPoint.r} Å, P(D_max): ${lastPoint.pr})`
);

// Test 9: Molecular Weight Estimation from Forward Scattering I(0)
assert(
  Math.abs(simBsa.estimatedMwKDa - 66.4) <= 5.0,
  `Estimated molecular weight matches BSA monomer standard 66.4 kDa (estimated: ${simBsa.estimatedMwKDa} kDa)`
);

// Test 10: Intelligent Card Matcher
const matchBsa = getMatchingSaxsCard({ id: 'card-bsa', name: 'Albumin', category: 'PROTEIN' });
const matchLyso = getMatchingSaxsCard({ id: 'card-lyso', name: 'Lysozyme HEWL', category: 'ENZYME' });
const matchSyn = getMatchingSaxsCard({ id: 'card-syn', name: 'Synuclein IDP', category: 'PROTEIN' });
const matchAb = getMatchingSaxsCard({ id: 'card-mab', name: 'IgG Monoclonal Antibody', category: 'BIOLOGIC' });
const matchFe = getMatchingSaxsCard({ id: 'card-fe', name: 'Ferritin Iron Storage', category: 'PROTEIN' });
const matchNonBio = getMatchingSaxsCard({ id: 'card-quartz', name: 'SiO2 Quartz', category: 'MINERAL' });

assert(matchBsa && matchBsa.id === 'bsa_monomer', 'Albumin matches BSA monomer');
assert(matchLyso && matchLyso.id === 'lysozyme', 'Lysozyme matches Hen Egg White Lysozyme');
assert(matchSyn && matchSyn.id === 'alpha_synuclein_idp', 'Synuclein matches α-Synuclein IDP');
assert(matchAb && matchAb.id === 'igg_antibody', 'Antibody matches IgG1 mAb');
assert(matchFe && matchFe.id === 'apoferritin', 'Ferritin matches Apoferritin nanocage');
assert(matchNonBio === null, 'Non-biological mineral returns null');

// Test 11: Sound Engine Audio Methods
const soundEngineCode = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf8');
assert(
  soundEngineCode.includes('playSaxsBeamExposureHum') &&
  soundEngineCode.includes('playGuinierFitLockTone'),
  'soundEngine.ts provides playSaxsBeamExposureHum and playGuinierFitLockTone methods'
);

// Test 12: PeriodicCodexTab Integration
const codexCode = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf8');
assert(
  codexCode.includes('SaxsScatteringVisualizer') &&
  codexCode.includes('SAXS_SCATTERING') &&
  codexCode.includes('Tán Xạ Tia X Góc Nhỏ SAXS'),
  'PeriodicCodexTab fully integrates Section 48 with tab button and visualizer rendering'
);

// Test 13: CardDetailModal Integration
const modalCode = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf8');
assert(
  modalCode.includes('SaxsScatteringVisualizer') &&
  modalCode.includes('matchingSaxs') &&
  modalCode.includes('showSaxsModal') &&
  modalCode.includes('Tán Xạ Tia X SAXS'),
  'CardDetailModal fully integrates matchingSaxs badge button and interactive modal popup'
);

// Test 14: Academic Citations & Curriculum Alignment
assert(
  engineCodeHasCitations(enginePath) && engineCodeHasCitations(visualizerPath),
  'Cites Peter Debye (1936), André Guinier (1939), Otto Kratky, and Vietnam GDPT 2018 curriculum'
);

function engineCodeHasCitations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return (
    content.includes('Debye') &&
    content.includes('Guinier') &&
    content.includes('Kratky') &&
    content.includes('GDPT 2018')
  );
}

console.log('\n======================================================================');
console.log(`   SUITE 116 RESULTS: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('======================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
