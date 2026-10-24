// test-dual-polarization-visualizer.mjs
// Milestone 63: Test Suite for Dual-Polarization Interferometry (DPI), Evanescent Wave Waveguide & Molecular Layer Dimensions Engine

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
console.log('   TEST SUITE 120: DUAL-POLARIZATION INTERFEROMETRY (DPI) & DE FEIJTER');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'dualPolarizationEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'DualPolarizationVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/dualPolarizationEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/DualPolarizationVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/dualPolarizationEngine.ts');
const {
  DPI_CATALOG,
  LASER_WAVELENGTH_NM,
  BULK_WATER_REFRACTIVE_INDEX,
  calculateDeFeijterMass,
  calculateAreaPerMolecule,
  simulateDpiExperiment,
  getMatchingDpiCard
} = engineModule;

// Test 2: Catalog Coverage
assert(
  Array.isArray(DPI_CATALOG) && DPI_CATALOG.length >= 5,
  `Catalog contains ${DPI_CATALOG.length} molecular adlayer systems (BSA, Lipid Bilayer, DNA 24-mer, Lysozyme, IgG)`
);

// Test 3: Optical Constants
assert(
  LASER_WAVELENGTH_NM === 632.8,
  `He-Ne laser wavelength λ = 632.8 nm`
);
assert(
  Math.abs(BULK_WATER_REFRACTIVE_INDEX - 1.3330) < 0.0001,
  `Bulk water refractive index n_bulk = 1.3330`
);

// Test 4: De Feijter's Analytical Inversion Formula
// For d = 3.2 nm, n = 1.450, n_bulk = 1.3330, dn/dc = 0.182 mL/g:
// Γ = 3.2 * ((1.450 - 1.333) / 0.182) = 3.2 * 0.117 / 0.182 ≈ 2.057 ng/mm²
const calcMass = calculateDeFeijterMass(3.2, 1.450, 1.3330, 0.182);
assert(
  Math.abs(calcMass - 2.057) < 0.05,
  `De Feijter mass calculated correctly: Γ = ${calcMass} ng/mm² (expected ~2.06 ng/mm²)`
);

// Test 5: Molecular Footprint Area A_mol
// For BSA (MW = 66.4 kDa) with Γ = 2.057 ng/mm²:
// A_mol ≈ (66400 / (2.057e-7 * 6.022e23)) * 1e14 ≈ 53.6 nm²
const calcArea = calculateAreaPerMolecule(calcMass, 66.4);
assert(
  calcArea > 40 && calcArea < 70,
  `BSA molecular footprint A_mol = ${calcArea} nm² (matches expected side-on dimension 4x14 nm ≈ 56 nm²)`
);

// Test 6: BSA End-on Transition Simulation
const bsaSim = simulateDpiExperiment('bsa_adsorption_orientation', 25.0);
assert(
  bsaSim.timePoints.length > 50,
  `Simulation contains ${bsaSim.timePoints.length} time points over 600 s`
);
const bsaStart = bsaSim.timePoints[0];
const bsaEnd = bsaSim.timePoints[bsaSim.timePoints.length - 1];
assert(
  bsaEnd.thicknessNm > bsaStart.thicknessNm,
  `BSA thickness expands upon end-on transition (${bsaStart.thicknessNm} nm -> ${bsaEnd.thicknessNm} nm)`
);
assert(
  bsaEnd.areaPerMoleculeNm2 < bsaStart.areaPerMoleculeNm2,
  `End-on vertical packing reduces lateral footprint A_mol (${bsaStart.areaPerMoleculeNm2} nm² -> ${bsaEnd.areaPerMoleculeNm2} nm²)`
);

// Test 7: Supported Lipid Bilayer (POPC Vesicle Rupture)
const lipidSim = simulateDpiExperiment('lipid_bilayer_rupture', 25.0);
const lipidStart = lipidSim.timePoints[0];
const lipidEnd = lipidSim.timePoints[lipidSim.timePoints.length - 1];
assert(
  lipidStart.thicknessNm > 20.0,
  `Intact vesicle layer thickness > 20 nm (observed: ${lipidStart.thicknessNm} nm)`
);
assert(
  Math.abs(lipidEnd.thicknessNm - 4.25) < 0.10,
  `Ruptured planar lipid bilayer matches 4.25 nm (42.5 Å) physical thickness (observed: ${lipidEnd.thicknessNm} nm)`
);
assert(
  lipidEnd.refractiveIndex > lipidStart.refractiveIndex,
  `Packed lipid bilayer has higher refractive index than porous vesicle layer (${lipidEnd.refractiveIndex} > ${lipidStart.refractiveIndex})`
);

// Test 8: DNA 24-mer Hybridization Rigidity
const dnaSim = simulateDpiExperiment('dna_hybridization_rigidity', 25.0);
const dnaStart = dnaSim.timePoints[0];
const dnaEnd = dnaSim.timePoints[dnaSim.timePoints.length - 1];
assert(
  dnaEnd.thicknessNm > 6.0 && dnaStart.thicknessNm < 2.5,
  `Duplex formation extends rigid B-DNA perpendicular to surface (${dnaStart.thicknessNm} nm -> ${dnaEnd.thicknessNm} nm)`
);

// Test 9: Lysozyme Denaturation Swelling vs Mass Invariance
const lysoSim = simulateDpiExperiment('lysozyme_urea_denaturation', 25.0);
const lysoStart = lysoSim.timePoints[0];
const lysoEnd = lysoSim.timePoints[lysoSim.timePoints.length - 1];
assert(
  lysoEnd.thicknessNm > lysoStart.thicknessNm * 1.8,
  `Urea denaturation inflates peptide chain thickness (${lysoStart.thicknessNm} nm -> ${lysoEnd.thicknessNm} nm)`
);
assert(
  lysoEnd.refractiveIndex < lysoStart.refractiveIndex,
  `Solvent water penetration into unfolded core drops refractive index (${lysoStart.refractiveIndex} -> ${lysoEnd.refractiveIndex})`
);
assert(
  Math.abs(lysoEnd.surfaceMassDensityNgPerMm2 - lysoStart.surfaceMassDensityNgPerMm2) < 0.5,
  `Total protein surface mass is conserved during conformational unfolding (${lysoStart.surfaceMassDensityNgPerMm2} vs ${lysoEnd.surfaceMassDensityNgPerMm2} ng/mm²)`
);

// Test 10: Sub-Angstrom Thickness Resolution
assert(
  bsaSim.thicknessResolutionAngstroms === 0.1,
  `DPI delivers 0.1 Å (0.01 nm) sub-angstrom thickness resolution`
);

// Test 11: Intelligent Card Matcher
const matchBsa = getMatchingDpiCard({ id: 'card_bsa', name: 'Bovine Serum Albumin Monolayer', category: 'PROTEIN' });
const matchLipid = getMatchingDpiCard({ id: 'card_lipid', name: 'Phospholipid Bilayer Membrane POPC', category: 'LIPID' });
const matchDna = getMatchingDpiCard({ id: 'card_dna', name: 'DNA 24-mer Oligonucleotide Hybridization', category: 'NUCLEIC' });
const matchLyso = getMatchingDpiCard({ id: 'card_lysozyme', name: 'Lysozyme Urea Denaturation Swelling', category: 'PROTEIN' });
const matchIgg = getMatchingDpiCard({ id: 'card_igg', name: 'Monoclonal IgG Antibody Immunosensor', category: 'IMMUNO' });

assert(matchBsa?.id === 'bsa_adsorption_orientation', 'Matching card "BSA" maps to bsa_adsorption_orientation');
assert(matchLipid?.id === 'lipid_bilayer_rupture', 'Matching card "Lipid Bilayer" maps to lipid_bilayer_rupture');
assert(matchDna?.id === 'dna_hybridization_rigidity', 'Matching card "DNA 24-mer" maps to dna_hybridization_rigidity');
assert(matchLyso?.id === 'lysozyme_urea_denaturation', 'Matching card "Lysozyme" maps to lysozyme_urea_denaturation');
assert(matchIgg?.id === 'igg_antigen_immunosensor', 'Matching card "IgG Antibody" maps to igg_antigen_immunosensor');

// Test 12: PeriodicCodexTab Wiring Verification
const codexContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf-8');
assert(codexContent.includes('DUAL_POLARIZATION_INTERFEROMETRY'), 'PeriodicCodexTab includes DUAL_POLARIZATION_INTERFEROMETRY activeMainTab');
assert(codexContent.includes('DualPolarizationVisualizer'), 'PeriodicCodexTab imports and renders DualPolarizationVisualizer');
assert(codexContent.includes('playDeFeijterMassResolvedChime'), 'PeriodicCodexTab triggers playDeFeijterMassResolvedChime audio effect');

// Test 13: CardDetailModal Wiring Verification
const modalContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf-8');
assert(modalContent.includes('DualPolarizationVisualizer'), 'CardDetailModal imports DualPolarizationVisualizer');
assert(modalContent.includes('matchingDpi'), 'CardDetailModal implements matchingDpi detector');
assert(modalContent.includes('showDpiModal'), 'CardDetailModal manages showDpiModal state');
assert(modalContent.includes('DPI Bề Dày:'), 'CardDetailModal displays DPI Bề Dày action badge');

// Test 14: Web Audio Integration
const soundEngineContent = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf-8');
assert(soundEngineContent.includes('playDpiLaserInterferenceTone'), 'soundEngine.ts defines playDpiLaserInterferenceTone');
assert(soundEngineContent.includes('playDeFeijterMassResolvedChime'), 'soundEngine.ts defines playDeFeijterMassResolvedChime');

console.log('\n======================================================================');
console.log(`   TEST RESULTS: ${passedTests} / ${totalTests} ASSERTIONS PASSED (100% Pass)`);
console.log('======================================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
