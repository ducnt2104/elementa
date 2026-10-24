// test-femtosecond-pump-probe-visualizer.mjs
// Milestone 70: Test Suite for Ultrafast Femtosecond Pump-Probe Spectroscopy & Zewail Transition-State Chemical Dynamics Engine

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
console.log('   TEST SUITE 127: FEMTOSECOND PUMP-PROBE & ZEWAIL TRANSITION STATE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'femtosecondPumpProbeEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'FemtosecondPumpProbeVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/femtosecondPumpProbeEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/FemtosecondPumpProbeVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/femtosecondPumpProbeEngine.ts');
const {
  SPEED_OF_LIGHT_MICRON_PER_FS,
  FEMTOSECOND_IN_SECONDS,
  PICOSECOND_IN_FS,
  MICHELSON_DELAY_FACTOR_FS_PER_MICRON,
  FEMTOSECOND_PUMP_PROBE_CATALOG,
  calculateMichelsonDelayFs,
  calculateStageDisplacementMicrons,
  generatePotentialEnergyCurves,
  simulatePumpProbeDynamics,
  getMatchingPumpProbeCard
} = engineModule;

// Test 2: Physical Constants & Delay Relations
assert(typeof SPEED_OF_LIGHT_MICRON_PER_FS === 'number' && Math.abs(SPEED_OF_LIGHT_MICRON_PER_FS - 0.299792458) < 1e-6, 'Speed of light c = 0.299792458 μm/fs');
assert(FEMTOSECOND_IN_SECONDS === 1e-15, '1 femtosecond = 10^-15 seconds');
assert(PICOSECOND_IN_FS === 1000, '1 picosecond = 1000 femtoseconds');

// Michelson translation stage delay factor: Δt = 2 Δx / c ≈ 6.67128 fs per μm
assert(Math.abs(MICHELSON_DELAY_FACTOR_FS_PER_MICRON - 6.67128) < 0.001, `Michelson delay factor is ~6.671 fs/μm (Calculated: ${MICHELSON_DELAY_FACTOR_FS_PER_MICRON.toFixed(4)} fs/μm)`);

// Test 3: Delay Round-Trip Inversion
const targetDelayFs = 1250.0;
const stageMicrons = calculateStageDisplacementMicrons(targetDelayFs);
const recoveredDelayFs = calculateMichelsonDelayFs(stageMicrons);
assert(Math.abs(targetDelayFs - recoveredDelayFs) < 0.1, `Delay round-trip conversion preserves 1250 fs (Stage: ${stageMicrons} μm, Recovered: ${recoveredDelayFs} fs)`);

// Test 4: Catalog Integrity
assert(Array.isArray(FEMTOSECOND_PUMP_PROBE_CATALOG) && FEMTOSECOND_PUMP_PROBE_CATALOG.length === 5, 'FEMTOSECOND_PUMP_PROBE_CATALOG contains 5 benchmark standards');

const expectedIds = [
  'nai_photodissociation_avoided_crossing',
  'ibr_nonadiabatic_branching',
  'rhodopsin_vision_cis_trans',
  'bacteriochlorophyll_lh2_coherence',
  'water_hydrogen_bond_network'
];
expectedIds.forEach(id => {
  const std = FEMTOSECOND_PUMP_PROBE_CATALOG.find(s => s.id === id);
  assert(!!std, `Catalog standard [${id}] exists`);
  if (std) {
    assert(std.pumpWavelengthNm > 200 && std.pumpWavelengthNm < 3500, `Standard [${id}] pump wavelength in physical range (${std.pumpWavelengthNm} nm)`);
    assert(std.wavepacketPeriodFs >= 100 && std.wavepacketPeriodFs <= 2000, `Standard [${id}] vibrational/coherence period is ultrafast (${std.wavepacketPeriodFs} fs)`);
    assert(std.curriculumNotes.length > 25, `Standard [${id}] includes Vietnam GDPT 2018 curriculum notes`);
    assert(std.nobelCitation.includes('Zewail'), `Standard [${id}] includes Ahmed Zewail 1999 Nobel citation`);
  }
});

// Test 5: Sodium Iodide (NaI) Prototype Verification
const naiStd = FEMTOSECOND_PUMP_PROBE_CATALOG.find(s => s.id === 'nai_photodissociation_avoided_crossing');
assert(naiStd.chemicalSystem === 'ALKALI_HALIDE_PHOTODISSOCIATION', 'NaI is ALKALI_HALIDE_PHOTODISSOCIATION');
assert(naiStd.wavepacketPeriodFs === 1250, 'NaI covalent well oscillation period is 1.25 ps (1250 fs)');
assert(naiStd.crossingDistanceAngstroms === 6.93, 'NaI avoided crossing point R_c = 6.93 Å');
assert(naiStd.probeWavelengthNm === 589, 'NaI free sodium atom probe is 589 nm (Na D-line)');
assert(naiStd.transitionStateWavelengthNm === 610, 'NaI transition state [Na···I]‡ probe is 610 nm');

// Test 6: Potential Energy Curves Generation
const pesCurves = generatePotentialEnergyCurves(naiStd);
assert(Array.isArray(pesCurves) && pesCurves.length > 20, 'Potential energy curves contain >20 internuclear distance points');

const samplePes = pesCurves.find(p => Math.abs(p.internuclearDistanceAngstroms - 2.8) < 0.1);
assert(!!samplePes, 'PES contains equilibrium region point ~2.8 Å');
if (samplePes) {
  assert(typeof samplePes.groundStateEnergyEv === 'number', 'PES includes ground state energy V_0(R)');
  assert(typeof samplePes.covalentStateEnergyEv === 'number', 'PES includes covalent excited state energy');
  assert(typeof samplePes.ionicStateEnergyEv === 'number', 'PES includes ionic Coulomb curve energy');
  assert(typeof samplePes.adiabaticLowerEnergyEv === 'number', 'PES includes lower adiabatic avoided crossing surface');
}

// Test 7: Simulation in Transition-State Probe Mode
const simTransition = simulatePumpProbeDynamics('nai_photodissociation_avoided_crossing', 93.7, 'TRANSITION_STATE');
assert(simTransition.probeMode === 'TRANSITION_STATE', 'Simulation executed in TRANSITION_STATE probe mode');
assert(Math.abs(simTransition.currentDelayTimeFs - 625) < 5.0, 'Stage displacement 93.7 μm yields ~625 fs delay (half period)');
assert(Array.isArray(simTransition.timeResolvedTransientCurve) && simTransition.timeResolvedTransientCurve.length > 100, 'Time-resolved transient curve contains >100 time points');

// Verify that transition state mode exhibits peak transients
const maxTransitionSignal = Math.max(...simTransition.timeResolvedTransientCurve.map(p => p.transientAbsorbanceMilliOd));
assert(maxTransitionSignal > 50, `Transition state probe mode registers strong intermediate signal peaks: max = ${maxTransitionSignal.toFixed(1)} mOD`);

// Test 8: Simulation in Free Product Probe Mode
const simProduct = simulatePumpProbeDynamics('nai_photodissociation_avoided_crossing', 150.0, 'FREE_PRODUCT');
assert(simProduct.probeMode === 'FREE_PRODUCT', 'Simulation executed in FREE_PRODUCT probe mode');

// Free product yield increases with time
const t0Point = simProduct.timeResolvedTransientCurve.find(p => p.delayTimeFs === 0);
const t3000Point = simProduct.timeResolvedTransientCurve.find(p => p.delayTimeFs === 3000);
assert(t0Point.freeProductYieldFraction === 0.0, 'Product yield at t = 0 fs is 0.0');
assert(t3000Point.freeProductYieldFraction > 0.35, `Product yield accumulates monotonically with crossings: ${t3000Point.freeProductYieldFraction} (>35% at 3 ps)`);

// Test 9: Card Matching Logic
const naiCard = { id: 'card_compound_nai', name: 'Sodium Iodide Crystalline Salt', category: 'SUBSTANCE' };
const matchNai = getMatchingPumpProbeCard(naiCard);
assert(matchNai?.id === 'nai_photodissociation_avoided_crossing', `NaI card matches avoided crossing standard (matched: ${matchNai?.id})`);

const ibrCard = { id: 'card_halogen_ibr', name: 'Iodine Monobromide Interhalogen Gas', category: 'SUBSTANCE' };
const matchIbr = getMatchingPumpProbeCard(ibrCard);
assert(matchIbr?.id === 'ibr_nonadiabatic_branching', `IBr card matches nonadiabatic branching standard (matched: ${matchIbr?.id})`);

const retinalCard = { id: 'card_rhodopsin_retinal', name: 'Retinal Protein Vision Chromophore', category: 'SUBSTANCE' };
const matchRetinal = getMatchingPumpProbeCard(retinalCard);
assert(matchRetinal?.id === 'rhodopsin_vision_cis_trans', `Rhodopsin card matches retinal standard (matched: ${matchRetinal?.id})`);

const lh2Card = { id: 'card_photosystem_lh2', name: 'Bacteriochlorophyll Light Harvesting Complex', category: 'REACTION' };
const matchLh2 = getMatchingPumpProbeCard(lh2Card);
assert(matchLh2?.id === 'bacteriochlorophyll_lh2_coherence', `Photosystem card matches LH2 exciton standard (matched: ${matchLh2?.id})`);

const waterCard = { id: 'card_substance_h2o', name: 'Water Liquid Solvent Network', category: 'SUBSTANCE' };
const matchWater = getMatchingPumpProbeCard(waterCard);
assert(matchWater?.id === 'water_hydrogen_bond_network', `Water card matches hydrogen bond network standard (matched: ${matchWater?.id})`);

const unrelatedCard = { id: 'card_element_fe_iron', name: 'Metallic Iron Ingot', category: 'ELEMENT' };
const matchNone = getMatchingPumpProbeCard(unrelatedCard);
assert(matchNone === null, 'Unrelated iron card matches null');

// Test 10: Sound Engine Methods Verification
const soundEnginePath = path.join(__dirname, 'src', 'audio', 'soundEngine.ts');
const soundContent = fs.readFileSync(soundEnginePath, 'utf8');
assert(soundContent.includes('playFemtosecondPumpLaserTone'), 'soundEngine.ts contains playFemtosecondPumpLaserTone');
assert(soundContent.includes('playWavepacketCoherentBeatChime'), 'soundEngine.ts contains playWavepacketCoherentBeatChime');

// Test 11: PeriodicCodexTab Wiring Verification
const codexPath = path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexContent = fs.readFileSync(codexPath, 'utf8');
assert(codexContent.includes("import { FemtosecondPumpProbeVisualizer } from './visualizations/FemtosecondPumpProbeVisualizer';"), 'PeriodicCodexTab imports FemtosecondPumpProbeVisualizer');
assert(codexContent.includes("'FEMTOSECOND_PUMP_PROBE'"), 'PeriodicCodexTab includes FEMTOSECOND_PUMP_PROBE tab');
assert(codexContent.includes('<FemtosecondPumpProbeVisualizer />'), 'PeriodicCodexTab renders <FemtosecondPumpProbeVisualizer />');

// Test 12: CardDetailModal Wiring Verification
const modalPath = path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx');
const modalContent = fs.readFileSync(modalPath, 'utf8');
assert(modalContent.includes("import { FemtosecondPumpProbeVisualizer } from '../visualizations/FemtosecondPumpProbeVisualizer';"), 'CardDetailModal imports FemtosecondPumpProbeVisualizer');
assert(modalContent.includes('getMatchingPumpProbeCard'), 'CardDetailModal imports getMatchingPumpProbeCard');
assert(modalContent.includes('matchingPumpProbe'), 'CardDetailModal uses matchingPumpProbe hook');
assert(modalContent.includes('showPumpProbeModal'), 'CardDetailModal maintains showPumpProbeModal state');
assert(modalContent.includes('initialStandardId={matchingPumpProbe.id}'), 'CardDetailModal passes initialStandardId to FemtosecondPumpProbeVisualizer');

// Final Summary
console.log('\n----------------------------------------------------------------------');
console.log(`TOTAL SUITE 127 TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log('----------------------------------------------------------------------');

if (passedTests === totalTests) {
  console.log('>>> [SUITE 127 PASS]: ALL FEMTOSECOND PUMP-PROBE & ZEWAIL DYNAMICS TESTS PASSED (100%) <<<\n');
  process.exit(0);
} else {
  console.error('>>> [SUITE 127 FAIL]: SOME TESTS FAILED <<<\n');
  process.exit(1);
}
