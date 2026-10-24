// test-stm-visualizer.mjs
// Milestone 69: Test Suite for Scanning Tunneling Microscopy (STM), Quantum Tunneling & Tersoff-Hamann LDOS Engine

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
console.log('   TEST SUITE 126: SCANNING TUNNELING MICROSCOPY (STM) & LDOS ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'stmEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'StmVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/stmEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/StmVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/stmEngine.ts');
const {
  PLANCK_H_BAR,
  ELECTRON_MASS_KG,
  ELECTRON_CHARGE_COULOMB,
  STM_SPECIMEN_CATALOG,
  calculateTunnelingDecayConstant,
  calculateTunnelingCurrent,
  simulateStmExperiment,
  getMatchingStmCard
} = engineModule;

// Test 2: Fundamental Physics Constants & Dimensions
assert(typeof PLANCK_H_BAR === 'number' && Math.abs(PLANCK_H_BAR - 1.054571817e-34) < 1e-40, 'Reduced Planck constant h-bar = 1.054571817e-34 J·s');
assert(typeof ELECTRON_MASS_KG === 'number' && Math.abs(ELECTRON_MASS_KG - 9.1093837e-31) < 1e-35, 'Electron rest mass m_e = 9.1093837e-31 kg');
assert(typeof ELECTRON_CHARGE_COULOMB === 'number' && Math.abs(ELECTRON_CHARGE_COULOMB - 1.602176634e-19) < 1e-25, 'Elementary charge e = 1.602176634e-19 C');

// Test 3: Quantum Tunneling Decay Constant kappa = sqrt(2 m Phi) / hbar
// For Phi = 4.6 eV: kappa = sqrt(2 * 9.109e-31 * 4.6 * 1.602e-19) / 1.054e-34 * 1e-10 m/A ~= 1.098 A^-1
const kappa46 = calculateTunnelingDecayConstant(4.6);
assert(kappa46 > 1.05 && kappa46 < 1.15, `Tunneling decay constant for 4.6 eV is ~1.1 A^-1 (Calculated: ${kappa46.toFixed(3)} A^-1)`);

// Test 4: Exponential Attenuation & Tenfold Drop per Angstrom
// I_t(d) = I_0 * exp(-2 * kappa * d)
const currentAt5A = calculateTunnelingCurrent(1.0, 5.0, 4.6);
const currentAt6A = calculateTunnelingCurrent(1.0, 6.0, 4.6);
const dropRatio = currentAt5A / currentAt6A;
assert(dropRatio > 7.5 && dropRatio < 12.0, `Current drops tenfold per 1 Angstrom tip retraction: dropRatio = ${dropRatio.toFixed(2)}x (Expected ~9x)`);

// Test 5: Specimen Catalog Integrity
assert(Array.isArray(STM_SPECIMEN_CATALOG) && STM_SPECIMEN_CATALOG.length === 5, 'STM_SPECIMEN_CATALOG contains 5 historical atomic standards');

const expectedIds = [
  'si111_7x7_reconstruction',
  'hopg_graphite_honeycomb',
  'au111_herringbone_reconstruction',
  'swcnt_van_hove_singularities',
  'quantum_corral_fe_cu111'
];
expectedIds.forEach(id => {
  const spec = STM_SPECIMEN_CATALOG.find(s => s.id === id);
  assert(!!spec, `Catalog specimen [${id}] exists`);
  if (spec) {
    assert(spec.workFunctionEv >= 4.0 && spec.workFunctionEv <= 5.5, `Specimen [${id}] work function in realistic 4.0-5.5 eV range (${spec.workFunctionEv} eV)`);
    assert(spec.gridSizeAngstroms >= 15 && spec.gridSizeAngstroms <= 150, `Specimen [${id}] scan window is nano-scale (${spec.gridSizeAngstroms} A)`);
    assert(spec.curriculumNotes.length > 20, `Specimen [${id}] has Vietnamese GDPT 2018 curriculum notes`);
  }
});

// Test 6: Silicon Si(111)-7x7 DAS Reconstruction
const siSpec = STM_SPECIMEN_CATALOG.find(s => s.id === 'si111_7x7_reconstruction');
assert(siSpec.materialType === 'SEMICONDUCTOR_SURFACE', 'Silicon standard is categorized as SEMICONDUCTOR_SURFACE');
assert(siSpec.bandGapEv === 1.12, 'Silicon band gap is 1.12 eV');

// Test 7: HOPG Graphite Sublattice Asymmetry
const hopgSpec = STM_SPECIMEN_CATALOG.find(s => s.id === 'hopg_graphite_honeycomb');
assert(hopgSpec.materialType === '2D_HONEYCOMB_GRAPHITE', 'HOPG is categorized as 2D_HONEYCOMB_GRAPHITE');
assert(hopgSpec.atomicFeaturesDescription.toLowerCase().includes('site'), 'HOPG highlights beta-site electronic contrast due to interlayer coupling');

// Test 8: Au(111) Herringbone Reconstruction
const auSpec = STM_SPECIMEN_CATALOG.find(s => s.id === 'au111_herringbone_reconstruction');
assert(auSpec.materialType === 'NOBLE_METAL_RECONSTRUCTION', 'Gold (111) standard is categorized as NOBLE_METAL_RECONSTRUCTION');
assert(auSpec.workFunctionEv === 5.3, 'Gold (111) work function is 5.3 eV');

// Test 9: Crommie 1993 Quantum Corral
const corralSpec = STM_SPECIMEN_CATALOG.find(s => s.id === 'quantum_corral_fe_cu111');
assert(corralSpec.materialType === 'QUANTUM_CORRAL', 'Crommie 1993 Fe on Cu(111) is categorized as QUANTUM_CORRAL');
assert(corralSpec.gridSizeAngstroms === 140.0, 'Corral diameter scan size is 140 A');

// Test 10: Simulation Output Matrix Verification
const simResult = simulateStmExperiment('si111_7x7_reconstruction', 5.0, 1.2);
assert(simResult.tipSampleDistanceAngstroms === 5.0, 'Simulation preserves tip distance 5.0 A');
assert(simResult.decayConstantKappaAngstromInv > 1.0, 'Simulation calculates decay constant kappa');
assert(simResult.tunnelingCurrentNanoAmps > 0.0, `Simulation computes positive tunneling current: ${simResult.tunnelingCurrentNanoAmps.toFixed(3)} nA`);
assert(Array.isArray(simResult.topographyGrid) && simResult.topographyGrid.length === 24, 'Topography grid has 24 rows');
assert(simResult.topographyGrid[0].length === 24, 'Topography grid has 24 columns (24x24 matrix)');

// Test 11: Topography Grid Point Properties
const samplePt = simResult.topographyGrid[12][12];
assert(typeof samplePt.xAngstroms === 'number' && typeof samplePt.yAngstroms === 'number', 'Grid point has physical coordinates in Angstroms');
assert(typeof samplePt.apparentHeightAngstroms === 'number', 'Grid point provides apparent height in Angstroms');
assert(typeof samplePt.localDosValue === 'number' && samplePt.localDosValue >= 0, 'Grid point provides non-negative localDosValue');

// Test 12: Scanning Tunneling Spectroscopy (STS) Curve
assert(Array.isArray(simResult.spectroscopyCurve) && simResult.spectroscopyCurve.length >= 80 && simResult.spectroscopyCurve.length <= 82, `STS spectroscopy curve spans ~80 bias points (-2.0V to +2.0V in 0.05V steps, length: ${simResult.spectroscopyCurve.length})`);

const zeroBiasPoint = simResult.spectroscopyCurve.find(p => Math.abs(p.biasVoltageVolts) < 0.01);
assert(!!zeroBiasPoint, 'STS curve contains 0.0 V bias point');
if (zeroBiasPoint) {
  assert(zeroBiasPoint.isBandGapRegion === true, 'Silicon Si(111) STS at 0.0 V is in band gap region');
  assert(zeroBiasPoint.differentialConductanceDiDv < 0.05, 'Silicon differential conductance dI/dV near Fermi level is minimal');
}

const highBiasPoint = simResult.spectroscopyCurve.find(p => Math.abs(p.biasVoltageVolts - 1.5) < 0.01);
assert(!!highBiasPoint && highBiasPoint.differentialConductanceDiDv > 0.2, 'STS conduction band conductance increases at +1.5 V');

// Test 13: Card Matching Service Tests
const siliconCard = { id: 'card_element_si', name: 'Silicon Crystalline Wafer', category: 'ELEMENT' };
const matchSi = getMatchingStmCard(siliconCard);
assert(matchSi?.id === 'si111_7x7_reconstruction', `Silicon card matches Si(111)-7x7 standard (matched: ${matchSi?.id})`);

const carbonCard = { id: 'card_substance_c_graphite', name: 'Graphite Hexagonal Lattice', category: 'SUBSTANCE' };
const matchHopg = getMatchingStmCard(carbonCard);
assert(matchHopg?.id === 'hopg_graphite_honeycomb', `Graphite card matches HOPG standard (matched: ${matchHopg?.id})`);

const goldCard = { id: 'card_element_au', name: 'Gold Specimen Au(111)', category: 'ELEMENT' };
const matchAu = getMatchingStmCard(goldCard);
assert(matchAu?.id === 'au111_herringbone_reconstruction', `Gold card matches Au(111) standard (matched: ${matchAu?.id})`);

const nanotubeCard = { id: 'card_carbon_nanotube', name: 'Single-Walled Carbon Nanotube SWCNT', category: 'SUBSTANCE' };
const matchSwcnt = getMatchingStmCard(nanotubeCard);
assert(matchSwcnt?.id === 'swcnt_van_hove_singularities', `Carbon Nanotube matches SWCNT standard (matched: ${matchSwcnt?.id})`);

const ironCorralCard = { id: 'card_fe_corral', name: 'Iron Atoms Quantum Corral Resonator', category: 'REACTION' };
const matchCorral = getMatchingStmCard(ironCorralCard);
assert(matchCorral?.id === 'quantum_corral_fe_cu111', `Iron quantum wave resonator matches Crommie Quantum Corral (matched: ${matchCorral?.id})`);

const unrelatedCard = { id: 'card_salt_nacl', name: 'Sodium Chloride Bulk Crystal', category: 'SUBSTANCE' };
const matchNone = getMatchingStmCard(unrelatedCard);
assert(matchNone === null, 'Unrelated salt card matches null');

// Test 14: Sound Engine Methods Verification
const soundEnginePath = path.join(__dirname, 'src', 'audio', 'soundEngine.ts');
const soundContent = fs.readFileSync(soundEnginePath, 'utf8');
assert(soundContent.includes('playStmQuantumTunnelingHum'), 'soundEngine.ts contains playStmQuantumTunnelingHum');
assert(soundContent.includes('playStsBandGapEdgePing'), 'soundEngine.ts contains playStsBandGapEdgePing');

// Test 15: PeriodicCodexTab Wiring Verification
const codexPath = path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx');
const codexContent = fs.readFileSync(codexPath, 'utf8');
assert(codexContent.includes("import { StmVisualizer } from './visualizations/StmVisualizer';"), 'PeriodicCodexTab imports StmVisualizer');
assert(codexContent.includes("'SCANNING_TUNNELING_MICROSCOPY'"), 'PeriodicCodexTab includes SCANNING_TUNNELING_MICROSCOPY tab');
assert(codexContent.includes('<StmVisualizer />'), 'PeriodicCodexTab renders <StmVisualizer />');

// Test 16: CardDetailModal Wiring Verification
const modalPath = path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx');
const modalContent = fs.readFileSync(modalPath, 'utf8');
assert(modalContent.includes("import { StmVisualizer } from '../visualizations/StmVisualizer';"), 'CardDetailModal imports StmVisualizer');
assert(modalContent.includes('getMatchingStmCard'), 'CardDetailModal imports getMatchingStmCard');
assert(modalContent.includes('matchingStm'), 'CardDetailModal uses matchingStm hook');
assert(modalContent.includes('showStmModal'), 'CardDetailModal maintains showStmModal state');
assert(modalContent.includes('initialSpecimenId={matchingStm.id}'), 'CardDetailModal passes initialSpecimenId to StmVisualizer');

// Final Summary
console.log('\n----------------------------------------------------------------------');
console.log(`TOTAL SUITE 126 TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${totalTests - passedTests}`);
console.log('----------------------------------------------------------------------');

if (passedTests === totalTests) {
  console.log('>>> [SUITE 126 PASS]: ALL STM & TERSOFF-HAMANN LDOS TESTS PASSED (100%) <<<\n');
  process.exit(0);
} else {
  console.error('>>> [SUITE 126 FAIL]: SOME TESTS FAILED <<<\n');
  process.exit(1);
}
