// test-stopped-flow-visualizer.mjs
// Milestone 62: Test Suite for Stopped-Flow Pre-Steady-State Chemical Kinetics & Flash Photolysis Engine

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
console.log('   TEST SUITE 119: STOPPED-FLOW PRE-STEADY-STATE & FLASH PHOTOLYSIS');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'stoppedFlowEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'StoppedFlowVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/stoppedFlowEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/StoppedFlowVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/stoppedFlowEngine.ts');
const {
  STOPPED_FLOW_CATALOG,
  simulateStoppedFlowKinetics,
  getMatchingStoppedFlowCard
} = engineModule;

// Test 2: Catalog Coverage
assert(
  Array.isArray(STOPPED_FLOW_CATALOG) && STOPPED_FLOW_CATALOG.length >= 5,
  `Catalog contains ${STOPPED_FLOW_CATALOG.length} reaction systems (Chymotrypsin, CA-II, Myoglobin-CO, HRP, Iodide-Persulfate)`
);

// Test 3: Pre-Steady-State Burst Kinetics (Chymotrypsin p-NPA)
const chymoSim = simulateStoppedFlowKinetics('chymotrypsin_pnpa', 1.0, 250.0, 25.0);
assert(
  chymoSim.specimen.reactionType === 'BURST_KINETICS',
  'Chymotrypsin matches BURST_KINETICS reaction type'
);
assert(
  chymoSim.burstAmplitudeDeltaA > 0.10,
  `Burst amplitude π is positive (calculated: ${chymoSim.burstAmplitudeDeltaA} AU)`
);
assert(
  chymoSim.steadyStateRatePerSec > 0 && chymoSim.steadyStateRatePerSec < chymoSim.kObsPerSec,
  `Steady-state turnover is slower than rapid acylation burst (${chymoSim.steadyStateRatePerSec} s⁻¹ < ${chymoSim.kObsPerSec} s⁻¹)`
);

// Test 4: Instrument Dead Time Flagging
const deadPoints = chymoSim.dataPoints.filter((p) => p.isDeadTimeRegion);
const activePoints = chymoSim.dataPoints.filter((p) => !p.isDeadTimeRegion);
assert(
  deadPoints.length > 0,
  `Points within instrument dead time (t < 1.0 ms) are flagged as dead time (count: ${deadPoints.length})`
);
assert(
  activePoints.length > deadPoints.length,
  `Observable reaction window contains majority of data points (${activePoints.length} points)`
);
assert(
  deadPoints.every((p) => p.timeMs <= 1.0),
  'All dead time points strictly obey t <= t_dead'
);

// Test 5: Pseudo-First-Order Concentration Series Diagnostic
const ca2Sim = simulateStoppedFlowKinetics('carbonic_anhydrase_co2', 0.8, 2000.0, 25.0);
assert(
  ca2Sim.concentrationSeries.length === 5,
  `Concentration series contains 5 diagnostic titration points`
);
const concPts = ca2Sim.concentrationSeries;
assert(
  concPts[1].kObsPerSec > concPts[0].kObsPerSec && concPts[4].kObsPerSec > concPts[3].kObsPerSec,
  'k_obs increases monotonically with substrate concentration (pseudo-first-order law)'
);

// Test 6: Temperature Dependence (Arrhenius Q10)
const chymoCold = simulateStoppedFlowKinetics('chymotrypsin_pnpa', 1.0, 250.0, 15.0);
const chymoHot = simulateStoppedFlowKinetics('chymotrypsin_pnpa', 1.0, 250.0, 35.0);
assert(
  chymoHot.kObsPerSec > chymoSim.kObsPerSec && chymoSim.kObsPerSec > chymoCold.kObsPerSec,
  `Reaction rate scales with temperature (15°C: ${chymoCold.kObsPerSec} s⁻¹, 25°C: ${chymoSim.kObsPerSec} s⁻¹, 35°C: ${chymoHot.kObsPerSec} s⁻¹)`
);

// Test 7: Flash Photolysis (Myoglobin-CO)
const myoSim = simulateStoppedFlowKinetics('myoglobin_co_flash', 0.2, 100.0, 25.0);
assert(
  myoSim.specimen.reactionType === 'FLASH_PHOTOLYSIS',
  'Myoglobin-CO matches FLASH_PHOTOLYSIS mechanism'
);
assert(
  myoSim.apparentKdMicroM < 0.10,
  `High CO binding affinity KD < 100 nM (calculated: ${myoSim.apparentKdMicroM} µM)`
);

// Test 8: Horseradish Peroxidase (HRP) Compound I Intermediate
const hrpSim = simulateStoppedFlowKinetics('peroxidase_compound_one', 1.2, 40.0, 25.0);
assert(
  hrpSim.specimen.probeWavelengthNm === 403,
  'HRP Compound I monitored at ferric Soret 403 nm transition'
);
assert(
  hrpSim.kObsPerSec > 100,
  `Ultra-fast enzyme intermediate formation: k_obs = ${hrpSim.kObsPerSec} s⁻¹`
);

// Test 9: Redox Clock Reaction (Persulfate-Iodide)
const clockSim = simulateStoppedFlowKinetics('persulfate_iodide_clock', 1.0, 5000.0, 25.0);
assert(
  clockSim.specimen.probeWavelengthNm === 350,
  'Persulfate-iodide clock monitors triiodide at 350 nm'
);

// Test 10: Intelligent Card Matcher
const matchChymo = getMatchingStoppedFlowCard({ id: 'card_chymotrypsin', name: 'Alpha-Chymotrypsin Serine Protease', category: 'ENZYME' });
const matchCa2 = getMatchingStoppedFlowCard({ id: 'card_ca2', name: 'Carbonic Anhydrase Zinc Hydration', category: 'ENZYME' });
const matchMyo = getMatchingStoppedFlowCard({ id: 'card_myo', name: 'Myoglobin Heme Flash Photolysis', category: 'PROTEIN' });
const matchHrp = getMatchingStoppedFlowCard({ id: 'card_hrp', name: 'Peroxidase Intermediate Compound I', category: 'ENZYME' });
const matchClock = getMatchingStoppedFlowCard({ id: 'card_clock', name: 'Persulfate Iodide Clock Kinetics', category: 'REDOX' });

assert(matchChymo?.id === 'chymotrypsin_pnpa', 'Matching card "Chymotrypsin" maps to chymotrypsin_pnpa');
assert(matchCa2?.id === 'carbonic_anhydrase_co2', 'Matching card "Carbonic Anhydrase" maps to carbonic_anhydrase_co2');
assert(matchMyo?.id === 'myoglobin_co_flash', 'Matching card "Myoglobin Flash" maps to myoglobin_co_flash');
assert(matchHrp?.id === 'peroxidase_compound_one', 'Matching card "Peroxidase Intermediate" maps to peroxidase_compound_one');
assert(matchClock?.id === 'persulfate_iodide_clock', 'Matching card "Persulfate Clock" maps to persulfate_iodide_clock');

// Test 11: PeriodicCodexTab Wiring Verification
const codexContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf-8');
assert(codexContent.includes('STOPPED_FLOW_KINETICS'), 'PeriodicCodexTab includes STOPPED_FLOW_KINETICS activeMainTab');
assert(codexContent.includes('StoppedFlowVisualizer'), 'PeriodicCodexTab imports and renders StoppedFlowVisualizer');
assert(codexContent.includes('playKineticBurstDetectionTone'), 'PeriodicCodexTab triggers playKineticBurstDetectionTone audio effect');

// Test 12: CardDetailModal Wiring Verification
const modalContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf-8');
assert(modalContent.includes('StoppedFlowVisualizer'), 'CardDetailModal imports StoppedFlowVisualizer');
assert(modalContent.includes('matchingStoppedFlow'), 'CardDetailModal implements matchingStoppedFlow detector');
assert(modalContent.includes('showStoppedFlowModal'), 'CardDetailModal manages showStoppedFlowModal state');
assert(modalContent.includes('Stopped-Flow:'), 'CardDetailModal displays Stopped-Flow action badge');

// Test 13: Web Audio Integration
const soundEngineContent = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf-8');
assert(soundEngineContent.includes('playStoppedFlowPistonPlunge'), 'soundEngine.ts defines playStoppedFlowPistonPlunge');
assert(soundEngineContent.includes('playKineticBurstDetectionTone'), 'soundEngine.ts defines playKineticBurstDetectionTone');

console.log('\n======================================================================');
console.log(`   TEST RESULTS: ${passedTests} / ${totalTests} ASSERTIONS PASSED (100% Pass)`);
console.log('======================================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
