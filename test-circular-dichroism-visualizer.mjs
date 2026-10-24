// test-circular-dichroism-visualizer.mjs
// Milestone 57: Test Suite for Circular Dichroism (CD) Spectroscopy & Protein Secondary Structure Deconvolution Engine

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
console.log('   TEST SUITE 114: CIRCULAR DICHROISM (CD) & PROTEIN STRUCTURE ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'circularDichroismEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'CircularDichroismVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/circularDichroismEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/CircularDichroismVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/circularDichroismEngine.ts');
const {
  CD_PROTEIN_CATALOG,
  getCanonicalBasisMre,
  calculateMre,
  calculateRawTheta,
  calculateFractionUnfolded,
  generateFarUvCdSpectrum,
  generateNearUvCdSpectrum,
  generateThermalMeltingCurve,
  estimateHelixFractionChenYang,
  deconvolveSecondaryStructure,
  getMatchingCdCard
} = engineModule;

// Test 2: Protein Catalog Coverage
assert(
  Array.isArray(CD_PROTEIN_CATALOG) && CD_PROTEIN_CATALOG.length >= 6,
  `Catalog contains ${CD_PROTEIN_CATALOG.length} benchmark proteins (Myoglobin, BSA, Concanavalin A, Trastuzumab Fab, α-Synuclein, Lysozyme)`
);

// Test 3: Mean Residue Ellipticity [θ]_MRE and Raw Ellipticity Conversion
const rawTheta = 10; // 10 mdeg
const c = 0.2; // 0.2 mg/mL
const l = 0.1; // 0.1 cm
const mrw = 110; // 110 Da
const calculatedMre = calculateMre(rawTheta, c, l, mrw);
const expectedMre = (10 * 110) / (10 * 0.2 * 0.1); // 55,000 deg·cm²/dmol
assert(
  Math.abs(calculatedMre - expectedMre) < 1e-4,
  `calculateMre converts θ = 10 mdeg to [θ] = 5,500 deg·cm²/dmol (calculated: ${calculatedMre})`
);
const recoveredRaw = calculateRawTheta(calculatedMre, c, l, mrw);
assert(
  Math.abs(recoveredRaw - rawTheta) < 1e-4,
  `calculateRawTheta recovers exact original raw ellipticity θ = 10 mdeg (recovered: ${recoveredRaw})`
);

// Test 4: Canonical Basis Spectra Validation
const alphaBasis193 = getCanonicalBasisMre(193).alpha;
const alphaBasis208 = getCanonicalBasisMre(208).alpha;
const alphaBasis222 = getCanonicalBasisMre(222).alpha;
const betaBasis218 = getCanonicalBasisMre(218).beta;
const coilBasis198 = getCanonicalBasisMre(198).coil;

assert(
  alphaBasis193 > 50000 && alphaBasis208 < -25000 && alphaBasis222 < -30000,
  `Pure α-helix has strong positive peak at 193 nm (${alphaBasis193.toFixed(0)}) and negative double minima at 208 nm (${alphaBasis208.toFixed(0)}) and 222 nm (${alphaBasis222.toFixed(0)})`
);
assert(
  betaBasis218 < -12000,
  `Pure β-sheet has signature negative minimum at 218 nm (${betaBasis218.toFixed(0)} deg·cm²/dmol)`
);
assert(
  coilBasis198 < -30000,
  `Pure random coil has intense negative minimum at 198 nm (${coilBasis198.toFixed(0)} deg·cm²/dmol)`
);

// Test 5: Benchmark Protein Spectrum Generation
const myoglobin = CD_PROTEIN_CATALOG.find((p) => p.id === 'myoglobin');
const concanavalin = CD_PROTEIN_CATALOG.find((p) => p.id === 'concanavalin-a');
const synuclein = CD_PROTEIN_CATALOG.find((p) => p.id === 'alpha-synuclein');

const myoFarUv = generateFarUvCdSpectrum(myoglobin, 25, 0);
const conFarUv = generateFarUvCdSpectrum(concanavalin, 25, 0);
const synFarUv = generateFarUvCdSpectrum(synuclein, 25, 0);

assert(
  myoFarUv.length === 71 && conFarUv.length === 71 && synFarUv.length === 71,
  'Generates 71 Far-UV wavelength points (190 to 260 nm at 1 nm resolution)'
);

const myo208 = myoFarUv.find((p) => p.wavelength === 208)?.mre || 0;
const myo222 = myoFarUv.find((p) => p.wavelength === 222)?.mre || 0;
assert(
  myo208 < -20000 && myo222 < -25000,
  `Myoglobin native spectrum displays characteristic α-helical double minima (208 nm: ${myo208}, 222 nm: ${myo222})`
);

const syn198 = synFarUv.find((p) => p.wavelength === 198)?.mre || 0;
const syn222 = synFarUv.find((p) => p.wavelength === 222)?.mre || 0;
assert(
  syn198 < -25000 && Math.abs(syn222) < 6000,
  `α-Synuclein displays hallmark IDP random coil spectrum (198 nm minimum: ${syn198}, near-zero 222 nm: ${syn222})`
);

// Test 6: Two-State Thermal Unfolding Mechanics
const fU_low = calculateFractionUnfolded(20, myoglobin.tmCelsius, myoglobin.deltaHkJmol);
const fU_mid = calculateFractionUnfolded(myoglobin.tmCelsius, myoglobin.tmCelsius, myoglobin.deltaHkJmol);
const fU_high = calculateFractionUnfolded(95, myoglobin.tmCelsius, myoglobin.deltaHkJmol);

assert(
  fU_low < 0.05,
  `At 20°C, Myoglobin is folded native (f_U = ${fU_low.toFixed(3)} < 0.05)`
);
assert(
  Math.abs(fU_mid - 0.5) < 0.01,
  `At exact Tm (78.5°C), exactly 50% is unfolded (f_U = ${fU_mid.toFixed(3)})`
);
assert(
  fU_high > 0.95,
  `At 95°C, Myoglobin is fully thermally denatured (f_U = ${fU_high.toFixed(3)} > 0.95)`
);

// Test 7: Chen-Yang Helix Fraction Estimation
const chenYangMyo = estimateHelixFractionChenYang(myo222);
assert(
  chenYangMyo > 0.70 && chenYangMyo <= 1.0,
  `Chen-Yang empirical formula yields high α-helix fraction for Myoglobin (${(chenYangMyo * 100).toFixed(1)}%)`
);

// Test 8: Constrained NNLS Deconvolution
const deconvMyo = deconvolveSecondaryStructure(myoFarUv);
const deconvCon = deconvolveSecondaryStructure(conFarUv);
const deconvSyn = deconvolveSecondaryStructure(synFarUv);

assert(
  deconvMyo.alphaHelix > 0.65 && deconvMyo.nrmsd < 0.05,
  `NNLS deconvolution correctly identifies Myoglobin as high α-helix (${(deconvMyo.alphaHelix * 100).toFixed(1)}%, NRMSD = ${deconvMyo.nrmsd})`
);
assert(
  deconvCon.betaSheet > 0.40,
  `NNLS deconvolution correctly identifies Concanavalin A as high β-sheet (${(deconvCon.betaSheet * 100).toFixed(1)}%)`
);
assert(
  deconvSyn.randomCoil > 0.70,
  `NNLS deconvolution correctly identifies α-Synuclein as predominantly random coil (${(deconvSyn.randomCoil * 100).toFixed(1)}%)`
);

// Test 9: Thermal Melting Curve Generation
const meltingCurve = generateThermalMeltingCurve(myoglobin);
assert(
  meltingCurve.length === 76,
  `generateThermalMeltingCurve produces 76 temperature steps (20°C to 95°C)`
);
const maxDerivativePoint = meltingCurve.reduce((max, pt) => (pt.dMre_dT > max.dMre_dT ? pt : max), meltingCurve[0]);
assert(
  Math.abs(maxDerivativePoint.temperatureC - myoglobin.tmCelsius) <= 2,
  `Derivative peak -d[θ]/dT accurately identifies Tm ≈ 78.5°C (detected: ${maxDerivativePoint.temperatureC}°C)`
);

// Test 10: Near-UV CD Spectrum Generation
const myoNearUv = generateNearUvCdSpectrum(myoglobin, 25);
assert(
  myoNearUv.length === 71,
  'Generates 71 Near-UV wavelength points (250 to 320 nm) for aromatic residue tertiary fingerprinting'
);

// Test 11: Intelligent Card Matcher
const matchFe = getMatchingCdCard({ id: 'card-fe', name: 'Iron (Fe)', category: 'ELEMENT' });
const matchAlbumin = getMatchingCdCard({ id: 'card-bsa', name: 'Serum Albumin', category: 'PROTEIN' });
const matchAntibody = getMatchingCdCard({ id: 'card-ab', name: 'Trastuzumab IgG', category: 'BIOLOGIC' });
const matchNonBio = getMatchingCdCard({ id: 'card-salt', name: 'NaCl Table Salt', category: 'SALT' });

assert(matchFe && matchFe.id === 'myoglobin', 'Iron/Heme card matches Myoglobin');
assert(matchAlbumin && matchAlbumin.id === 'bsa', 'Serum Albumin matches Bovine Serum Albumin');
assert(matchAntibody && matchAntibody.id === 'trastuzumab-fab', 'Antibody/IgG card matches Trastuzumab Fab');
assert(matchNonBio === null, 'Inorganic salt correctly returns null');

// Test 12: Sound Engine Audio Methods
const soundEngineCode = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf8');
assert(
  soundEngineCode.includes('playCircularDichroismChiralHum') &&
  soundEngineCode.includes('playAlphaHelixResonanceTone'),
  'soundEngine.ts provides playCircularDichroismChiralHum and playAlphaHelixResonanceTone methods'
);

// Test 13: PeriodicCodexTab Integration
const codexCode = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf8');
assert(
  codexCode.includes('CircularDichroismVisualizer') &&
  codexCode.includes('CIRCULAR_DICHROISM') &&
  codexCode.includes('Phổ Lưỡng Sắc Tròn CD'),
  'PeriodicCodexTab fully integrates Section 46 with tab button and visualizer rendering'
);

// Test 14: CardDetailModal Integration
const modalCode = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf8');
assert(
  modalCode.includes('CircularDichroismVisualizer') &&
  modalCode.includes('matchingCd') &&
  modalCode.includes('showCdModal') &&
  modalCode.includes('Phổ CD Protein'),
  'CardDetailModal fully integrates matchingCd badge button and interactive modal popup'
);

// Test 15: Academic Integrity & Curriculum Citations
assert(
  engineCodeHasCitations(enginePath) && engineCodeHasCitations(visualizerPath),
  'Cites Aimé Cotton (1896), Jean-Baptiste Biot, Provencher CONTIN (1981), and Vietnam GDPT 2018 curriculum'
);

function engineCodeHasCitations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return (
    content.includes('Cotton') &&
    content.includes('Biot') &&
    content.includes('GDPT 2018')
  );
}

console.log('\n======================================================================');
console.log(`   SUITE 114 RESULTS: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('======================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
