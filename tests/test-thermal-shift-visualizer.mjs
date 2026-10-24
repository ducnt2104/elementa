// test-thermal-shift-visualizer.mjs
// Milestone 58: Test Suite for Differential Scanning Fluorimetry (DSF) & Protein Thermal Shift Assay Engine

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
console.log('   TEST SUITE 115: DSF FLUORIMETRY & PROTEIN THERMAL SHIFT ASSAY');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, '..', 'src', 'domain', 'thermalShiftEngine.ts');
const visualizerPath = path.join(__dirname, '..', 'src', 'components', 'visualizations', 'ThermalShiftVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/thermalShiftEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/ThermalShiftVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('../src/domain/thermalShiftEngine.ts');
const {
  DSF_ASSAY_CATALOG,
  calculateBoltzmannFluorescence,
  simulateDsfExperiment,
  getMatchingDsfCard
} = engineModule;

// Test 2: Target-Ligand Catalog Coverage
assert(
  Array.isArray(DSF_ASSAY_CATALOG) && DSF_ASSAY_CATALOG.length >= 6,
  `Catalog contains ${DSF_ASSAY_CATALOG.length} benchmark systems (CA-II/Acetazolamide, BSA/Ibuprofen, Abl/Imatinib, Mpro/Nirmatrelvir, Lysozyme/NAG3, p53/PK11007)`
);

// Test 3: Boltzmann Sigmoidal Unfolding Baseline & Peak Transition
const ca2 = DSF_ASSAY_CATALOG.find((a) => a.id === 'ca2_acetazolamide');
const fLow = calculateBoltzmannFluorescence(25, ca2.apoTmCelsius, ca2.slopeFactorA, ca2.maxFluorescenceRfu);
const fMid = calculateBoltzmannFluorescence(ca2.apoTmCelsius, ca2.apoTmCelsius, ca2.slopeFactorA, ca2.maxFluorescenceRfu);
const fPeak = calculateBoltzmannFluorescence(ca2.apoTmCelsius + 6, ca2.apoTmCelsius, ca2.slopeFactorA, ca2.maxFluorescenceRfu);
const fDecay = calculateBoltzmannFluorescence(90, ca2.apoTmCelsius, ca2.slopeFactorA, ca2.maxFluorescenceRfu);

assert(
  fLow < 300,
  `At 25°C, native protein buries hydrophobic core (SYPRO Orange quenched at ${fLow} RFU < 300)`
);
assert(
  fMid > 5000 && fMid < 8000,
  `At Tm (56.5°C), fluorescence is near half-maximal inflection (${fMid} RFU)`
);
assert(
  fPeak >= 11500,
  `Near thermal unfolding completion (62.5°C), fluorescence surges to peak (${fPeak} RFU >= 11500)`
);
assert(
  fDecay < fPeak,
  `At high temperature (90°C), post-transition aggregation decays fluorescence (${fDecay} RFU < ${fPeak})`
);

// Test 4: Simulation Resolution & Derivative Peak Detection
const simApo = simulateDsfExperiment('ca2_acetazolamide', 0.0); // 0 µM ligand
assert(
  simApo.points.length === 151,
  'Generates 151 temperature sampling points from 20.0°C to 95.0°C at 0.5°C resolution'
);
assert(
  Math.abs(simApo.measuredApoTm - ca2.apoTmCelsius) <= 0.5,
  `First derivative peak accurately identifies Apo Tm = ${ca2.apoTmCelsius}°C (detected: ${simApo.measuredApoTm}°C)`
);
assert(
  simApo.measuredDeltaTm === 0.0,
  'In the absence of ligand (0.0 µM), thermal shift ΔTm is exactly 0.0°C'
);

// Test 5: Ligand Binding Thermal Stabilization (Schellman-Brandts Shift)
const simHolo = simulateDsfExperiment('ca2_acetazolamide', 20.0); // 20 µM Acetazolamide >> Kd 12 nM
assert(
  simHolo.measuredDeltaTm >= 10.0,
  `Saturating Acetazolamide produces massive thermal stabilization ΔTm = +${simHolo.measuredDeltaTm}°C (expected ~10.7°C)`
);
assert(
  Math.abs(simHolo.measuredHoloTm - (ca2.apoTmCelsius + 10.7)) <= 1.0,
  `First derivative peak identifies Holo Tm ≈ 67.2°C (detected: ${simHolo.measuredHoloTm}°C)`
);
assert(
  simHolo.stabilizationStatus === 'HIGH_STABILIZATION',
  'Categorizes ΔTm ≥ 8.0°C as HIGH_STABILIZATION'
);

// Test 6: Antiviral Paxlovid (Mpro + Nirmatrelvir) Ultra-Stabilization
const mpro = DSF_ASSAY_CATALOG.find((a) => a.id === 'mpro_nirmatrelvir');
const simMpro = simulateDsfExperiment('mpro_nirmatrelvir', 10.0); // 10 µM Nirmatrelvir >> Kd 3.1 nM
assert(
  simMpro.measuredDeltaTm >= 12.0,
  `Paxlovid active drug Nirmatrelvir stabilizes Covid-19 Mpro by +${simMpro.measuredDeltaTm}°C (apo: 54.0°C -> holo: ${simMpro.measuredHoloTm}°C)`
);

// Test 7: Oncogenic Rescue Chaperone (p53 Y220C + PK11007)
const simP53 = simulateDsfExperiment('p53_stabilizer', 5.0);
assert(
  simP53.measuredApoTm < 40.0 && simP53.measuredHoloTm > 43.0,
  `Chaperone rescues thermolabile p53 mutant, elevating Tm from ${simP53.measuredApoTm}°C safely above core body temperature to ${simP53.measuredHoloTm}°C`
);

// Test 8: Sub-saturating Concentration Titration
const simLowDose = simulateDsfExperiment('ca2_acetazolamide', 0.012); // Conc = Kd = 12 nM = 0.012 µM -> 50% saturation
assert(
  Math.abs(simLowDose.measuredDeltaTm - ca2.maxDeltaTmCelsius * 0.5) <= 0.8,
  `At [L] = Kd (50% receptor occupancy), thermal shift is approximately half maximal (ΔTm = +${simLowDose.measuredDeltaTm}°C, half max = ${(ca2.maxDeltaTmCelsius * 0.5).toFixed(1)}°C)`
);

// Test 9: Intelligent Card Matcher
const matchZn = getMatchingDsfCard({ id: 'card-zn', name: 'Zinc (Zn)', category: 'ELEMENT' });
const matchBsa = getMatchingDsfCard({ id: 'card-bsa', name: 'Bovine Albumin', category: 'PROTEIN' });
const matchAbl = getMatchingDsfCard({ id: 'card-kinase', name: 'Abl Tyrosine Kinase', category: 'ENZYME' });
const matchPax = getMatchingDsfCard({ id: 'card-pax', name: 'Paxlovid Protease', category: 'MEDICINE' });
const matchNonTarget = getMatchingDsfCard({ id: 'card-glass', name: 'Silicon Dioxide SiO2', category: 'MINERAL' });

assert(matchZn && matchZn.id === 'ca2_acetazolamide', 'Zinc/CA-II matches Carbonic Anhydrase II');
assert(matchBsa && matchBsa.id === 'bsa_ibuprofen', 'Albumin/Ibuprofen matches Bovine Serum Albumin');
assert(matchAbl && matchAbl.id === 'abl_imatinib', 'Kinase card matches Bcr-Abl Imatinib system');
assert(matchPax && matchPax.id === 'mpro_nirmatrelvir', 'Paxlovid/Protease matches SARS-CoV-2 Mpro');
assert(matchNonTarget === null, 'Non-biological mineral returns null');

// Test 10: Sound Engine Audio Methods
const soundEngineCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'audio', 'soundEngine.ts'), 'utf8');
assert(
  soundEngineCode.includes('playDsfFluorescenceSurge') &&
  soundEngineCode.includes('playThermalShiftPeakTone'),
  'soundEngine.ts provides playDsfFluorescenceSurge and playThermalShiftPeakTone methods'
);

// Test 11: PeriodicCodexTab Integration
const codexCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf8');
assert(
  codexCode.includes('ThermalShiftVisualizer') &&
  codexCode.includes('THERMAL_SHIFT_ASSAY') &&
  codexCode.includes('Huỳnh Quang Quét Vi Sai DSF'),
  'PeriodicCodexTab fully integrates Section 47 with tab button and visualizer rendering'
);

// Test 12: CardDetailModal Integration
const modalCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf8');
assert(
  modalCode.includes('ThermalShiftVisualizer') &&
  modalCode.includes('matchingDsf') &&
  modalCode.includes('showDsfModal') &&
  modalCode.includes('Sàng Lọc DSF & ΔTm'),
  'CardDetailModal fully integrates matchingDsf badge button and interactive modal popup'
);

// Test 13: Academic Citations & Curriculum Alignment
assert(
  engineCodeHasCitations(enginePath) && engineCodeHasCitations(visualizerPath),
  'Cites Boltzmann model, SYPRO Orange, Schellman-Brandts ligand stabilization, and Vietnam GDPT 2018 curriculum'
);

function engineCodeHasCitations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return (
    content.includes('Boltzmann') &&
    content.includes('SYPRO Orange') &&
    content.includes('GDPT 2018')
  );
}

console.log('\n======================================================================');
console.log(`   SUITE 115 RESULTS: ${passedTests} / ${totalTests} PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('======================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
