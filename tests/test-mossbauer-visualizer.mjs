// test-mossbauer-visualizer.mjs
// Milestone 72: Test Suite for Mössbauer Spectroscopy, Recoilless Nuclear Gamma Resonance & Hyperfine Interactions Engine

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
console.log('   TEST SUITE 129: MÖSSBAUER NUCLEAR GAMMA RESONANCE ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, '..', 'src', 'domain', 'mossbauerEngine.ts');
const visualizerPath = path.join(__dirname, '..', 'src', 'components', 'visualizations', 'MossbauerVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/mossbauerEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/MossbauerVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('../src/domain/mossbauerEngine.ts');
const {
  GAMMA_ENERGY_EV,
  HEISENBERG_NATURAL_LINEWIDTH_EV,
  NATURAL_LINEWIDTH_MM_PER_SEC,
  RECOIL_ENERGY_FREE_ATOM_MEV,
  MOSSBAUER_SPECIMEN_CATALOG,
  calculateDopplerEnergyShiftNanoEv,
  simulateMossbauerSpectrum,
  getMatchingMossbauerCard
} = engineModule;

// Test 2: Fundamental Physics Constants & Recoilless Resonance
assert(GAMMA_ENERGY_EV === 14412.5, '57Fe nuclear gamma transition energy E_gamma = 14412.5 eV (14.4125 keV)');
assert(Math.abs(HEISENBERG_NATURAL_LINEWIDTH_EV - 4.665e-9) < 1e-12, 'Heisenberg natural linewidth Gamma_0 = 4.665 neV');
assert(NATURAL_LINEWIDTH_MM_PER_SEC === 0.194, 'Natural linewidth in velocity units = 0.194 mm/s');
assert(RECOIL_ENERGY_FREE_ATOM_MEV === 1.956, 'Free atom recoil energy E_R = 1.956 meV');

// Recoil energy is > 400,000 times larger than natural linewidth:
const recoilRatio = (RECOIL_ENERGY_FREE_ATOM_MEV * 1e-3) / HEISENBERG_NATURAL_LINEWIDTH_EV;
assert(recoilRatio > 400000, `Recoil energy exceeds natural linewidth by ${recoilRatio.toFixed(0)}x (demonstrating why Mössbauer recoilless lattice is essential)`);

// Test 3: Doppler Energy Shift Inversion (1 mm/s ~ 48.075 neV)
const shift1MmPerSec = calculateDopplerEnergyShiftNanoEv(1.0);
assert(Math.abs(shift1MmPerSec - 48.075) < 0.05, `Doppler energy shift for 1 mm/s is ~48.075 neV (Calculated: ${shift1MmPerSec} neV)`);

// Test 4: Specimen Catalog Standards Integrity
assert(Array.isArray(MOSSBAUER_SPECIMEN_CATALOG) && MOSSBAUER_SPECIMEN_CATALOG.length === 5, 'MOSSBAUER_SPECIMEN_CATALOG contains 5 benchmark standards');

const expectedIds = [
  'alpha_iron_metal_foil',
  'deoxy_hemoglobin_high_spin',
  'magnetite_verwey_charge_ordering',
  'ferrocene_organometallic_sandwich',
  'mars_jarosite_mimos_ii'
];
expectedIds.forEach(id => {
  const std = MOSSBAUER_SPECIMEN_CATALOG.find(s => s.id === id);
  assert(!!std, `Catalog standard [${id}] exists`);
  if (std) {
    assert(std.recoillessFractionPercent >= 55.0 && std.recoillessFractionPercent <= 85.0, `Standard [${id}] Lamb-Mössbauer factor f in 55-85% range (${std.recoillessFractionPercent}%)`);
    assert(std.debyeTemperatureKelvin >= 250 && std.debyeTemperatureKelvin <= 550, `Standard [${id}] Debye temperature in realistic range (${std.debyeTemperatureKelvin} K)`);
    assert(std.subspectra.length >= 1, `Standard [${id}] contains at least 1 hyperfine subspectrum`);
    assert(std.curriculumNotes.length > 25, `Standard [${id}] includes Vietnam GDPT 2018 curriculum notes`);
    assert(std.nobelCitation.includes('Mössbauer'), `Standard [${id}] includes Rudolf Mössbauer 1961 Nobel citation`);
  }
});

// Test 5: Alpha-Iron Primary Calibration Sextet
const feStd = MOSSBAUER_SPECIMEN_CATALOG.find(s => s.id === 'alpha_iron_metal_foil');
assert(feStd.ironChemicalSystem === 'METALLIC_FERROMAGNET', 'Alpha-iron is METALLIC_FERROMAGNET');
assert(feStd.ironOxidationState === 'Fe(0)', 'Iron oxidation state is Fe(0)');
assert(feStd.subspectra[0].isomerShiftDeltaMmPerSec === 0.0, 'Alpha-iron defines zero isomer shift (delta = 0.0 mm/s)');
assert(feStd.subspectra[0].quadrupoleSplittingDeltaEqMmPerSec === 0.0, 'Cubic symmetry produces zero quadrupole splitting (Delta E_Q = 0.0 mm/s)');
assert(feStd.subspectra[0].magneticHyperfineFieldTesla === 33.0, 'Internal magnetic hyperfine field B_hf = 33.0 Tesla');
assert(feStd.subspectra[0].resonancePeaks.length === 6, 'Alpha-iron displays exactly 6 magnetic hyperfine lines (sextet)');

// Verify peak positions of outer and inner lines
const outerPeakNegative = feStd.subspectra[0].resonancePeaks.find(p => Math.abs(p.velocityMmPerSec - (-5.328)) < 0.01);
const outerPeakPositive = feStd.subspectra[0].resonancePeaks.find(p => Math.abs(p.velocityMmPerSec - 5.328) < 0.01);
assert(!!outerPeakNegative && !!outerPeakPositive, 'Alpha-iron outer peaks at +/- 5.33 mm/s');

// Test 6: Deoxy-Hemoglobin Bioinorganic Active Center
const hbStd = MOSSBAUER_SPECIMEN_CATALOG.find(s => s.id === 'deoxy_hemoglobin_high_spin');
assert(hbStd.ironChemicalSystem === 'BIOINORGANIC_HEME', 'Hemoglobin is BIOINORGANIC_HEME');
assert(hbStd.ironOxidationState === 'Fe(II)', 'Iron is in Fe(II) state');
assert(hbStd.spinState === 'HIGH_SPIN_S_2', 'Iron has high-spin S=2 configuration');
assert(hbStd.subspectra[0].isomerShiftDeltaMmPerSec === 0.92, 'Large isomer shift delta = 0.92 mm/s due to reduced s-electron density');
assert(hbStd.subspectra[0].quadrupoleSplittingDeltaEqMmPerSec === 2.40, 'Giant quadrupole splitting Delta E_Q = 2.40 mm/s from asymmetric d-shell');
assert(hbStd.subspectra[0].resonancePeaks.length === 2, 'Deoxy-Hb displays quadrupole doublet (2 peaks)');

// Test 7: Magnetite Inverse Spinel & Verwey Transition
const magStd = MOSSBAUER_SPECIMEN_CATALOG.find(s => s.id === 'magnetite_verwey_charge_ordering');
assert(magStd.ironChemicalSystem === 'MIXED_VALENCE_OXIDE', 'Magnetite is MIXED_VALENCE_OXIDE');
assert(magStd.subspectra.length === 2, 'Magnetite contains 2 subspectra (Tetrahedral A-site and Octahedral B-site)');
const aSite = magStd.subspectra.find(s => s.label.includes('Tetrahedral'));
const bSite = magStd.subspectra.find(s => s.label.includes('Octahedral'));
assert(aSite?.fractionPercent === 33.3 && bSite?.fractionPercent === 66.7, 'Tetrahedral to Octahedral area ratio is 1 : 2 (33.3% vs 66.7%)');

// Test 8: Ferrocene Organometallic Sandwich
const fcStd = MOSSBAUER_SPECIMEN_CATALOG.find(s => s.id === 'ferrocene_organometallic_sandwich');
assert(fcStd.ironChemicalSystem === 'ORGANOMETALLIC_SANDWICH', 'Ferrocene is ORGANOMETALLIC_SANDWICH');
assert(fcStd.spinState === 'LOW_SPIN_S_0', 'Ferrocene Fe(II) is diamagnetic low-spin S=0');
assert(fcStd.subspectra[0].quadrupoleSplittingDeltaEqMmPerSec === 2.37, 'Ferrocene quadrupole splitting Delta E_Q = 2.37 mm/s');

// Test 9: Mars Exploration Rover Jarosite MIMOS II
const jarStd = MOSSBAUER_SPECIMEN_CATALOG.find(s => s.id === 'mars_jarosite_mimos_ii');
assert(jarStd.ironChemicalSystem === 'PLANETARY_MINERAL', 'Jarosite is PLANETARY_MINERAL');
assert(jarStd.description.includes('Opportunity'), 'Jarosite description references Mars Rover Opportunity discovery');

// Test 10: Simulation Engine Verification
const simResult = simulateMossbauerSpectrum('alpha_iron_metal_foil', 5.33);
assert(simResult.currentDopplerVelocityMmPerSec === 5.33, 'Simulation sets Doppler velocity to 5.33 mm/s');
assert(Array.isArray(simResult.spectrumCurve) && simResult.spectrumCurve.length === 201, 'Spectrum curve spans 201 velocity points (-10 to +10 mm/s in 0.1 mm/s steps)');
assert(simResult.isResonanceAchieved === true, 'Doppler velocity at 5.33 mm/s achieves resonance (outer sextet line)');
assert(simResult.closestPeakDistanceMmPerSec < 0.05, 'Closest peak distance is <0.05 mm/s');

// Baseline transmission off-resonance (e.g. at 0.0 mm/s for alpha-iron)
const simOff = simulateMossbauerSpectrum('alpha_iron_metal_foil', 0.0);
assert(simOff.isResonanceAchieved === false, 'Velocity at 0.0 mm/s for alpha-iron is off-resonance (flat baseline between sextet peaks)');
assert(simOff.currentSpectrumPoint.relativeTransmissionPercent > 98.0, 'Off-resonance transmission is >98%');

// Test 11: Card Matching Service Tests
const alphaFeCard = { id: 'card_element_fe', name: 'Alpha-Iron Pure Metal Ingot', category: 'ELEMENT' };
const matchFe = getMatchingMossbauerCard(alphaFeCard);
assert(matchFe?.id === 'alpha_iron_metal_foil', `Alpha-iron card matches metallic iron standard (matched: ${matchFe?.id})`);

const hemeCard = { id: 'card_hemoglobin_heme', name: 'Deoxy-Hemoglobin Blood Protein', category: 'SUBSTANCE' };
const matchHb = getMatchingMossbauerCard(hemeCard);
assert(matchHb?.id === 'deoxy_hemoglobin_high_spin', `Hemoglobin card matches bioinorganic standard (matched: ${matchHb?.id})`);

const magCard = { id: 'card_magnetite_lodestone', name: 'Magnetite Fe3O4 Natural Mineral', category: 'SUBSTANCE' };
const matchMag = getMatchingMossbauerCard(magCard);
assert(matchMag?.id === 'magnetite_verwey_charge_ordering', `Magnetite card matches mixed-valence standard (matched: ${matchMag?.id})`);

const fcCard = { id: 'card_ferrocene_sandwich', name: 'Ferrocene Organometallic Complex', category: 'SUBSTANCE' };
const matchFc = getMatchingMossbauerCard(fcCard);
assert(matchFc?.id === 'ferrocene_organometallic_sandwich', `Ferrocene card matches sandwich standard (matched: ${matchFc?.id})`);

const jarCard = { id: 'card_mars_jarosite', name: 'Martian Jarosite Sulfate Hydrate', category: 'SUBSTANCE' };
const matchJar = getMatchingMossbauerCard(jarCard);
assert(matchJar?.id === 'mars_jarosite_mimos_ii', `Jarosite card matches planetary mineral standard (matched: ${matchJar?.id})`);

const unrelatedCard = { id: 'card_pure_helium', name: 'Helium Noble Gas', category: 'ELEMENT' };
const matchNone = getMatchingMossbauerCard(unrelatedCard);
assert(matchNone === null, 'Unrelated helium card matches null');

// Test 12: Sound Engine Methods Verification
const soundEnginePath = path.join(__dirname, '..', 'src', 'audio', 'soundEngine.ts');
const soundContent = fs.readFileSync(soundEnginePath, 'utf8');
assert(soundContent.includes('playMossbauerDopplerDriveHum'), 'soundEngine.ts contains playMossbauerDopplerDriveHum');
assert(soundContent.includes('playMossbauerResonantAbsorptionDipChime'), 'soundEngine.ts contains playMossbauerResonantAbsorptionDipChime');

// Test 13: PeriodicCodexTab Wiring Verification
const codexPath = path.join(__dirname, '..', 'src', 'components', 'PeriodicCodexTab.tsx');
const codexContent = fs.readFileSync(codexPath, 'utf8');
assert(codexContent.includes("import { MossbauerVisualizer } from './visualizations/MossbauerVisualizer';"), 'PeriodicCodexTab imports MossbauerVisualizer');
assert(codexContent.includes("'MOSSBAUER_SPECTROSCOPY'"), 'PeriodicCodexTab includes MOSSBAUER_SPECTROSCOPY tab');
assert(codexContent.includes('<MossbauerVisualizer />'), 'PeriodicCodexTab renders <MossbauerVisualizer />');

// Test 14: CardDetailModal Wiring Verification
const modalPath = path.join(__dirname, '..', 'src', 'components', 'cards', 'CardDetailModal.tsx');
const modalContent = fs.readFileSync(modalPath, 'utf8');
assert(modalContent.includes("import { MossbauerVisualizer } from '../visualizations/MossbauerVisualizer';"), 'CardDetailModal imports MossbauerVisualizer');
assert(modalContent.includes('getMatchingMossbauerCard'), 'CardDetailModal imports getMatchingMossbauerCard');
assert(modalContent.includes('matchingMossbauer'), 'CardDetailModal uses matchingMossbauer hook');
assert(modalContent.includes('showMossbauerModal'), 'CardDetailModal maintains showMossbauerModal state');
assert(modalContent.includes('initialStandardId={matchingMossbauer.id}'), 'CardDetailModal passes initialStandardId to MossbauerVisualizer');

// Final Summary
console.log('\n----------------------------------------------------------------------');
console.log(`TOTAL SUITE 129 TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log('----------------------------------------------------------------------');

if (passedTests === totalTests) {
  console.log('>>> [SUITE 129 PASS]: ALL MÖSSBAUER SPECTROSCOPY TESTS PASSED (100%) <<<\n');
  process.exit(0);
} else {
  console.error('>>> [SUITE 129 FAIL]: SOME TESTS FAILED <<<\n');
  process.exit(1);
}
