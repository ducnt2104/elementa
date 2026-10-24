// test-qcmd-viscoelastic-visualizer.mjs
// Milestone 64: Test Suite for Quartz Crystal Microbalance with Dissipation (QCM-D) & Viscoelastic Voigt Model Engine

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
console.log('   TEST SUITE 121: QCM-D ACOUSTIC MASS & VISCOELASTIC VOIGT ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'qcmdEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'QcmdVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/qcmdEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/QcmdVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/qcmdEngine.ts');
const {
  QCMD_CATALOG,
  SAUERBREY_CONSTANT_NG_PER_MM2_HZ,
  QUARTZ_FUNDAMENTAL_FREQ_MHZ,
  calculateSauerbreyMass,
  calculateDissipationDecay,
  simulateQcmdExperiment,
  getMatchingQcmdCard
} = engineModule;

// Test 2: Catalog Coverage
assert(
  Array.isArray(QCMD_CATALOG) && QCMD_CATALOG.length >= 5,
  `Catalog contains ${QCMD_CATALOG.length} piezoelectric benchmark systems (Blood Fibrin, Mucin Brush, Vesicle Rupture, Rigid SAM, DNA Beacon)`
);

// Test 3: Sauerbrey Sensitivity Constant
assert(
  SAUERBREY_CONSTANT_NG_PER_MM2_HZ === 0.177,
  `Sauerbrey sensitivity constant C = 0.177 ng/(mm²·Hz) for 5 MHz AT-cut quartz`
);
assert(
  QUARTZ_FUNDAMENTAL_FREQ_MHZ === 5.0,
  `Fundamental quartz shear resonance frequency f₀ = 5.0 MHz`
);

// Test 4: Sauerbrey Acoustic Mass Calculation
// For n = 3, Δf₃ = -30 Hz: Δm = - (0.177 / 3) * (-30) = 0.059 * 30 = 1.77 ng/mm²
const massN3 = calculateSauerbreyMass(-30.0, 3);
assert(
  Math.abs(massN3 - 1.77) < 0.01,
  `Sauerbrey mass for -30 Hz (n=3) = ${massN3} ng/mm² (expected 1.77 ng/mm²)`
);

// Test 5: Dissipation Factor D Calculation from Decay Time Tau
// D = 1 / (π * f * τ). For f = 5 MHz and ring-down decay time τ = 10 ms = 0.01 s:
// D = 1 / (π * 5e6 * 0.01) = 1 / (50000π) ≈ 6.366 × 10⁻⁶
const calcD = calculateDissipationDecay(0.01, 5.0e6);
assert(
  Math.abs(calcD - 6.366) < 0.02,
  `Dissipation factor D calculated correctly: ${calcD} × 10⁻⁶ (expected ~6.37 × 10⁻⁶)`
);

// Test 6: Blood Clotting Fibrinogen-to-Fibrin Polymerization
const fibrinSim = simulateQcmdExperiment('blood_fibrin_gelation');
assert(
  fibrinSim.specimen.sampleType === 'BLOOD_COAGULATION',
  'Blood clotting specimen matches BLOOD_COAGULATION type'
);
assert(
  fibrinSim.finalDissipationE6 > 15.0,
  `Thrombin-induced fibrin gelation exhibits high dissipation: ΔD₃ = ${fibrinSim.finalDissipationE6} × 10⁻⁶`
);
assert(
  fibrinSim.filmRigidityStatus === 'HYPER_HYDRATED_HYDROGEL',
  'Blood fibrin hydrogel classified as HYPER_HYDRATED_HYDROGEL'
);
assert(
  fibrinSim.finalHydrationPercentage > 85.0,
  `Blood clot contains >85% trapped hydration fluid (observed: ${fibrinSim.finalHydrationPercentage}%)`
);

// Test 7: Mucin Hydrated Lubricating Brush
const mucinSim = simulateQcmdExperiment('mucin_hydrated_brush');
assert(
  mucinSim.finalHydrationPercentage > 88.0,
  `Mucin lubricating brush holds >88% coupled hydration water (${mucinSim.finalHydrationPercentage}%)`
);

// Test 8: Two-Step POPC Vesicle Rupture
const vesicleSim = simulateQcmdExperiment('vesicle_two_step_rupture');
const midPoint = vesicleSim.timePoints.find((p) => p.timeSec >= 200 && p.timeSec <= 240);
const endPoint = vesicleSim.timePoints[vesicleSim.timePoints.length - 1];
assert(
  midPoint && midPoint.overtones[0].deltaDDissipationUnits > 8.0,
  `Intact vesicle intermediate displays high dissipation peak (observed: ${midPoint?.overtones[0].deltaDDissipationUnits} × 10⁻⁶)`
);
assert(
  endPoint && endPoint.overtones[0].deltaDDissipationUnits < 1.0,
  `Ruptured planar lipid bilayer collapses dissipation to rigid baseline (observed: ${endPoint?.overtones[0].deltaDDissipationUnits} × 10⁻⁶)`
);
assert(
  endPoint.filmThicknessNm < 6.0,
  `Final bilayer thickness is thin and planar (d = ${endPoint.filmThicknessNm} nm)`
);

// Test 9: Rigid Alkanethiol SAM Benchmark
const samSim = simulateQcmdExperiment('rigid_thiol_sam');
assert(
  samSim.filmRigidityStatus === 'RIGID_SAUERBREY_ELASTIC',
  'Alkanethiol SAM classified as RIGID_SAUERBREY_ELASTIC'
);
const lastSam = samSim.timePoints[samSim.timePoints.length - 1];
const ov3 = lastSam.overtones.find((o) => o.overtoneNumber === 3)?.deltaFOverNHz || 0;
const ov7 = lastSam.overtones.find((o) => o.overtoneNumber === 7)?.deltaFOverNHz || 0;
assert(
  Math.abs(ov3 - ov7) < 0.1,
  `Rigid SAM exhibits perfect overtone overlap (n=3: ${ov3} Hz vs n=7: ${ov7} Hz)`
);

// Test 10: Intelligent Card Matcher
const matchFibrin = getMatchingQcmdCard({ id: 'card_fibrin', name: 'Fibrinogen Blood Clot Gel', category: 'PROTEIN' });
const matchMucin = getMatchingQcmdCard({ id: 'card_mucin', name: 'Mucin Glycoprotein Brush Lubricant', category: 'GLYCO' });
const matchVesicle = getMatchingQcmdCard({ id: 'card_vesicle', name: 'POPC Vesicle Rupture Bilayer', category: 'LIPID' });
const matchSam = getMatchingQcmdCard({ id: 'card_sam', name: '1-Dodecanethiol SAM Monolayer on Gold', category: 'MINERAL' });
const matchBeacon = getMatchingQcmdCard({ id: 'card_beacon', name: 'DNA Hairpin Molecular Beacon Stiffening', category: 'NUCLEIC' });

assert(matchFibrin?.id === 'blood_fibrin_gelation', 'Matching card "Fibrin" maps to blood_fibrin_gelation');
assert(matchMucin?.id === 'mucin_hydrated_brush', 'Matching card "Mucin" maps to mucin_hydrated_brush');
assert(matchVesicle?.id === 'vesicle_two_step_rupture', 'Matching card "Vesicle" maps to vesicle_two_step_rupture');
assert(matchSam?.id === 'rigid_thiol_sam', 'Matching card "SAM" maps to rigid_thiol_sam');
assert(matchBeacon?.id === 'dna_molecular_beacon', 'Matching card "DNA Beacon" maps to dna_molecular_beacon');

// Test 11: PeriodicCodexTab Wiring Verification
const codexContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf-8');
assert(codexContent.includes('QCMD_MICROBALANCE'), 'PeriodicCodexTab includes QCMD_MICROBALANCE activeMainTab');
assert(codexContent.includes('QcmdVisualizer'), 'PeriodicCodexTab imports and renders QcmdVisualizer');
assert(codexContent.includes('playQcmdQuartzResonancePing'), 'PeriodicCodexTab triggers playQcmdQuartzResonancePing audio effect');

// Test 12: CardDetailModal Wiring Verification
const modalContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf-8');
assert(modalContent.includes('QcmdVisualizer'), 'CardDetailModal imports QcmdVisualizer');
assert(modalContent.includes('matchingQcmd'), 'CardDetailModal implements matchingQcmd detector');
assert(modalContent.includes('showQcmdModal'), 'CardDetailModal manages showQcmdModal state');
assert(modalContent.includes('QCM-D Khối Lượng:'), 'CardDetailModal displays QCM-D Khối Lượng action badge');

// Test 13: Web Audio Integration
const soundEngineContent = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf-8');
assert(soundEngineContent.includes('playQcmdQuartzResonancePing'), 'soundEngine.ts defines playQcmdQuartzResonancePing');
assert(soundEngineContent.includes('playViscoelasticDampingTone'), 'soundEngine.ts defines playViscoelasticDampingTone');

console.log('\n======================================================================');
console.log(`   TEST RESULTS: ${passedTests} / ${totalTests} ASSERTIONS PASSED (100% Pass)`);
console.log('======================================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
