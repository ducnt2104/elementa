// test-sims-visualizer.mjs
// Milestone 71: Test Suite for Secondary Ion Mass Spectrometry (SIMS), Sputtering Cascades & Depth Profiling Isotopic Engine

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
console.log('   TEST SUITE 128: SECONDARY ION MASS SPECTROMETRY (SIMS) ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'simsEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'SimsVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/simsEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/SimsVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/simsEngine.ts');
const {
  AVOGADRO_CONSTANT,
  ELEMENTARY_CHARGE_COULOMB,
  SIMS_SPECIMEN_CATALOG,
  calculateSputterErosionRate,
  simulateSimsAnalysis,
  getMatchingSimsCard
} = engineModule;

// Test 2: Physical Constants & Sputtering Yield Physics
assert(typeof AVOGADRO_CONSTANT === 'number' && Math.abs(AVOGADRO_CONSTANT - 6.02214076e23) < 1e16, 'Avogadro constant N_A = 6.02214076e23 mol^-1');
assert(typeof ELEMENTARY_CHARGE_COULOMB === 'number' && Math.abs(ELEMENTARY_CHARGE_COULOMB - 1.602176634e-19) < 1e-25, 'Elementary charge e = 1.602176634e-19 C');

// Test Sigmund sputter erosion rate calculation:
// 15 nA O2+, 75 um raster crater, Y = 0.45 atoms/ion in Si -> ~0.1 - 0.2 nm/s
const erosionRate = calculateSputterErosionRate(15.0, 75, 0.45, 2.33, 28.085);
assert(erosionRate > 0.08 && erosionRate < 0.25, `Sigmund sputter erosion rate in Si is realistic: ${erosionRate.toFixed(3)} nm/s (Expected ~0.1-0.2 nm/s)`);

// Test 3: Catalog Standards Integrity
assert(Array.isArray(SIMS_SPECIMEN_CATALOG) && SIMS_SPECIMEN_CATALOG.length === 5, 'SIMS_SPECIMEN_CATALOG contains 5 historical standards');

const expectedIds = [
  'semiconductor_boron_delta_doping',
  'tof_sims_lipid_membrane',
  'geological_lead_uranium_zircon',
  'battery_solid_electrolyte_interphase_sei',
  'corrosion_hydrogen_embrittlement'
];
expectedIds.forEach(id => {
  const std = SIMS_SPECIMEN_CATALOG.find(s => s.id === id);
  assert(!!std, `Catalog standard [${id}] exists`);
  if (std) {
    assert(std.primaryBeamEnergyKev >= 0.5 && std.primaryBeamEnergyKev <= 30.0, `Standard [${id}] beam energy in 0.5-30 keV range (${std.primaryBeamEnergyKev} keV)`);
    assert(std.maximumDepthNm >= 5.0 && std.maximumDepthNm <= 100.0, `Standard [${id}] maximum depth in 5-100 nm range (${std.maximumDepthNm} nm)`);
    assert(std.monitoredSpecies.length >= 3, `Standard [${id}] monitors at least 3 distinct ionic species`);
    assert(std.curriculumNotes.length > 25, `Standard [${id}] contains Vietnam GDPT 2018 curriculum notes`);
    assert(std.scientificCitation.length > 20, `Standard [${id}] includes peer-reviewed scientific citation`);
  }
});

// Test 4: Semiconductor Boron Delta-Doped Superlattice
const bStd = SIMS_SPECIMEN_CATALOG.find(s => s.id === 'semiconductor_boron_delta_doping');
assert(bStd.simsMode === 'DYNAMIC_DEPTH_PROFILING', 'Boron delta standard is DYNAMIC_DEPTH_PROFILING');
assert(bStd.primaryIonSpecies === 'O2_PLUS', 'Primary ion is O2_PLUS (oxygen matrix enhancement)');
assert(bStd.primaryBeamEnergyKev === 0.5, 'Primary beam energy is 0.5 keV ultra-low energy');

const b11Species = bStd.monitoredSpecies.find(s => s.label === '11B+');
const b10Species = bStd.monitoredSpecies.find(s => s.label === '10B+');
assert(!!b11Species && !!b10Species, 'Monitors both 11B+ and 10B+ stable isotopes');
if (b11Species && b10Species) {
  // Isotopic ratio 11B / 10B in nature is 80.1% / 19.9% ~= 4.02
  const ratio = b11Species.peakCountsPerSecond / b10Species.peakCountsPerSecond;
  assert(ratio > 3.5 && ratio < 4.5, `Natural boron isotopic abundance ratio 11B/10B ~ 4.0 (Calculated: ${ratio.toFixed(2)})`);
}

// Test 5: DPPC Phospholipid Membrane Molecular ToF-SIMS
const lipidStd = SIMS_SPECIMEN_CATALOG.find(s => s.id === 'tof_sims_lipid_membrane');
assert(lipidStd.simsMode === 'STATIC_SURFACE_SPECTROMETRY', 'Lipid bilayer is STATIC_SURFACE_SPECTROMETRY');
assert(lipidStd.primaryIonSpecies === 'BI3_PLUS', 'Primary ion is BI3_PLUS bismuth cluster');
assert(lipidStd.monitoredSpecies.some(s => s.massOverChargeDa === 184.1), 'Monitors phosphocholine headgroup ion at m/z = 184.1 Da');
assert(lipidStd.monitoredSpecies.some(s => s.massOverChargeDa === 734.6), 'Monitors intact molecular ion [M+H]+ at m/z = 734.6 Da');

// Test 6: Jack Hills Zircon U-Pb Geochronology
const zirconStd = SIMS_SPECIMEN_CATALOG.find(s => s.id === 'geological_lead_uranium_zircon');
assert(zirconStd.simsMode === 'HIGH_PRECISION_ISOTOPE_RATIO', 'Zircon standard is HIGH_PRECISION_ISOTOPE_RATIO');
assert(zirconStd.monitoredSpecies.some(s => s.label.includes('206Pb+')), 'Monitors radiogenic 206Pb+ daughter');
assert(zirconStd.monitoredSpecies.some(s => s.label.includes('207Pb+')), 'Monitors radiogenic 207Pb+ daughter');

// Test 7: Battery Solid Electrolyte Interphase (SEI) Cryo-ToF-SIMS
const seiStd = SIMS_SPECIMEN_CATALOG.find(s => s.id === 'battery_solid_electrolyte_interphase_sei');
assert(seiStd.primaryIonSpecies === 'CS_PLUS', 'Primary ion is CS_PLUS for negative secondary ions');
assert(seiStd.monitoredSpecies.every(s => s.polarity === 'NEGATIVE'), 'All SEI species are negative secondary ions (LiF-, Li2O-, C2HO-)');

// Test 8: Simulation Engine Verification
const simResult = simulateSimsAnalysis('semiconductor_boron_delta_doping', 12.5);
assert(simResult.currentDepthNm === 12.5, 'Simulation preserves target depth 12.5 nm');
assert(simResult.currentSputterTimeSeconds > 50, 'Calculates non-zero sputter erosion time');
assert(Array.isArray(simResult.depthProfileData) && simResult.depthProfileData.length === 101, 'Depth profile spans 101 points (0 to 50 nm in 0.5 nm steps)');

// Verify that Boron delta peak is detected at 12.5 nm
const peakPoint = simResult.depthProfileData.find(p => p.depthNanometers === 12.5);
assert(!!peakPoint, 'Profile contains peak point at 12.5 nm');
if (peakPoint) {
  assert(peakPoint.speciesCounts['11B+'] > 50000, `Delta-1 layer exhibits massive 11B+ count: ${peakPoint.speciesCounts['11B+']} c/s`);
  assert(peakPoint.layerPhaseDescription.includes('Delta'), 'Layer phase identifies Boron delta plane');
}

// Background between delta peaks (e.g. at 18.0 nm)
const backgroundPoint = simResult.depthProfileData.find(p => p.depthNanometers === 18.0);
assert(backgroundPoint.speciesCounts['11B+'] < 2000, `Inter-layer region exhibits low background 11B+ count: ${backgroundPoint.speciesCounts['11B+']} c/s`);

// Test 9: Static Limit Evaluation
const staticSim = simulateSimsAnalysis('tof_sims_lipid_membrane', 2.0);
assert(typeof staticSim.totalIonDoseIonsCm2 === 'number', 'Calculates primary ion dose in ions/cm2');
assert(typeof staticSim.isStaticLimitExceeded === 'boolean', 'Evaluates whether static SIMS limit (10^12 ions/cm2) is exceeded');

// Test 10: Card Matching Service Tests
const boronCard = { id: 'card_element_b_boron', name: 'Boron Delta Dopant Superlattice', category: 'ELEMENT' };
const matchBoron = getMatchingSimsCard(boronCard);
assert(matchBoron?.id === 'semiconductor_boron_delta_doping', `Boron card matches semiconductor standard (matched: ${matchBoron?.id})`);

const lipidCard = { id: 'card_lipid_membrane', name: 'Phospholipid Bilayer Membrane DPPC', category: 'SUBSTANCE' };
const matchLipid = getMatchingSimsCard(lipidCard);
assert(matchLipid?.id === 'tof_sims_lipid_membrane', `Lipid card matches ToF-SIMS standard (matched: ${matchLipid?.id})`);

const zirconCard = { id: 'card_zircon_geochronology', name: 'Ancient Zircon U-Pb Mineral Crystal', category: 'SUBSTANCE' };
const matchZircon = getMatchingSimsCard(zirconCard);
assert(matchZircon?.id === 'geological_lead_uranium_zircon', `Zircon card matches geochronology standard (matched: ${matchZircon?.id})`);

const seiCard = { id: 'card_battery_sei', name: 'Lithium Battery Solid Electrolyte Interphase SEI', category: 'REACTION' };
const matchSei = getMatchingSimsCard(seiCard);
assert(matchSei?.id === 'battery_solid_electrolyte_interphase_sei', `Battery SEI card matches SEI standard (matched: ${matchSei?.id})`);

const tiCard = { id: 'card_alloy_titanium', name: 'Titanium Aerospace Alloy Hydrogen Embrittlement', category: 'SUBSTANCE' };
const matchTi = getMatchingSimsCard(tiCard);
assert(matchTi?.id === 'corrosion_hydrogen_embrittlement', `Titanium card matches embrittlement standard (matched: ${matchTi?.id})`);

const unrelatedCard = { id: 'card_pure_argon', name: 'Noble Gas Argon', category: 'ELEMENT' };
const matchNone = getMatchingSimsCard(unrelatedCard);
assert(matchNone === null, 'Unrelated noble gas card matches null');

// Test 11: Sound Engine Methods Verification
const soundEnginePath = path.join(__dirname, 'src', 'audio', 'soundEngine.ts');
const soundContent = fs.readFileSync(soundEnginePath, 'utf8');
assert(soundContent.includes('playSimsPrimaryIonSputterTone'), 'soundEngine.ts contains playSimsPrimaryIonSputterTone');
assert(soundContent.includes('playSimsSecondaryIonDetectorChime'), 'soundEngine.ts contains playSimsSecondaryIonDetectorChime');

// Test 12: PeriodicCodexTab Wiring Verification
const codexPath = path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexContent = fs.readFileSync(codexPath, 'utf8');
assert(codexContent.includes("import { SimsVisualizer } from './visualizations/SimsVisualizer';"), 'PeriodicCodexTab imports SimsVisualizer');
assert(codexContent.includes("'SECONDARY_ION_MASS_SPECTROMETRY'"), 'PeriodicCodexTab includes SECONDARY_ION_MASS_SPECTROMETRY tab');
assert(codexContent.includes('<SimsVisualizer />'), 'PeriodicCodexTab renders <SimsVisualizer />');

// Test 13: CardDetailModal Wiring Verification
const modalPath = path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx');
const modalContent = fs.readFileSync(modalPath, 'utf8');
assert(modalContent.includes("import { SimsVisualizer } from '../visualizations/SimsVisualizer';"), 'CardDetailModal imports SimsVisualizer');
assert(modalContent.includes('getMatchingSimsCard'), 'CardDetailModal imports getMatchingSimsCard');
assert(modalContent.includes('matchingSims'), 'CardDetailModal uses matchingSims hook');
assert(modalContent.includes('showSimsModal'), 'CardDetailModal maintains showSimsModal state');
assert(modalContent.includes('initialStandardId={matchingSims.id}'), 'CardDetailModal passes initialStandardId to SimsVisualizer');

// Final Summary
console.log('\n----------------------------------------------------------------------');
console.log(`TOTAL SUITE 128 TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log('----------------------------------------------------------------------');

if (passedTests === totalTests) {
  console.log('>>> [SUITE 128 PASS]: ALL SECONDARY ION MASS SPECTROMETRY (SIMS) TESTS PASSED (100%) <<<\n');
  process.exit(0);
} else {
  console.error('>>> [SUITE 128 FAIL]: SOME TESTS FAILED <<<\n');
  process.exit(1);
}
