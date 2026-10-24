// test-capillary-electrophoresis-visualizer.mjs
// Milestone 67: Test Suite for Capillary Electrophoresis (CE), Electroosmotic Flow (EOF) & Chiral Resolution Engine

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
console.log('   TEST SUITE 124: CAPILLARY ELECTROPHORESIS & CHIRAL CE ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'capillaryElectrophoresisEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'CapillaryElectrophoresisVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/capillaryElectrophoresisEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/CapillaryElectrophoresisVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/capillaryElectrophoresisEngine.ts');
const {
  CAPILLARY_ELECTROPHORESIS_CATALOG,
  EPSILON_0_VACUUM,
  WATER_DIELECTRIC_CONSTANT,
  WATER_VISCOSITY_PA_S,
  calculateHelmholtzSmoluchowskiEof,
  simulateCapillaryElectrophoresis,
  getMatchingCapillaryElectrophoresisCard
} = engineModule;

// Test 2: Catalog Coverage
assert(
  Array.isArray(CAPILLARY_ELECTROPHORESIS_CATALOG) && CAPILLARY_ELECTROPHORESIS_CATALOG.length >= 5,
  `Catalog contains ${CAPILLARY_ELECTROPHORESIS_CATALOG.length} capillary electrophoresis standards (Chiral D/L, Sanger DNA, mAb Purity, Inorganic Cations, Organic Food Acids)`
);

// Test 3: Fundamental Physical Constants
assert(
  Math.abs(EPSILON_0_VACUUM - 8.854e-12) < 1e-14,
  'Vacuum permittivity ε₀ = 8.854e-12 F/m (CODATA standard)'
);
assert(
  WATER_DIELECTRIC_CONSTANT === 78.4,
  'Relative dielectric permittivity of water ε_r = 78.4 at 25°C'
);
assert(
  WATER_VISCOSITY_PA_S === 0.00089,
  'Dynamic viscosity of water η = 0.00089 Pa·s at 25°C'
);

// Test 4: Helmholtz-Smoluchowski EOF Mobility Calculation
// µ_EOF = (ε_r * ε_0 * |ζ|) / η. For |ζ| = 38 mV = 0.038 V:
// (78.4 * 8.854188e-12 * 0.038) / 0.00089 * 1e4 * 1e5 ≈ 29.65 × 10⁻⁵ cm²/(V·s)
const calcEof = calculateHelmholtzSmoluchowskiEof(-38.0);
assert(
  Math.abs(calcEof - 29.65) < 0.2,
  `Helmholtz-Smoluchowski EOF mobility at ζ = -38 mV is ${calcEof} × 10⁻⁵ cm²/(V·s) (expected ~29.65)`
);

// Test 5: Chiral Enantiomeric Resolution of D- and L-Phenylalanine (Sulfated β-CD)
const chiralSim = simulateCapillaryElectrophoresis('chiral_amino_acid_dl_cd', 20.0, 3.2);
assert(chiralSim.specimen.id === 'chiral_amino_acid_dl_cd', 'Simulates chiral amino acid resolution');
assert(chiralSim.appliedVoltageKv === 20.0, 'Applied separation voltage: 20 kV');
assert(chiralSim.peaks.length === 3, 'Detected 3 peaks (Neutral marker, D-Phe, L-Phe)');

// Verify chiral baseline resolution
assert(
  chiralSim.enantiomerResolutionRs !== undefined && chiralSim.enantiomerResolutionRs >= 1.5,
  `Baseline chiral enantiomer resolution achieved: R_s = ${chiralSim.enantiomerResolutionRs} (IUPAC baseline criterion R_s ≥ 1.5)`
);

// Verify migration order: Neutral marker first, then D-Phe, then L-Phe
const neutralPeak = chiralSim.peaks.find((p) => p.id === 'neutral_marker_dms');
const dPhePeak = chiralSim.peaks.find((p) => p.id === 'd_phenylalanine');
const lPhePeak = chiralSim.peaks.find((p) => p.id === 'l_phenylalanine');
assert(
  neutralPeak && dPhePeak && lPhePeak &&
  dPhePeak.migrationTimeMinutes < lPhePeak.migrationTimeMinutes &&
  lPhePeak.migrationTimeMinutes < neutralPeak.migrationTimeMinutes,
  `Correct chiral migration order: Cation D-Phe (${dPhePeak?.migrationTimeMinutes}m) < Cation L-Phe (${lPhePeak?.migrationTimeMinutes}m) < Neutral Marker (${neutralPeak?.migrationTimeMinutes}m)`
);

// Test 6: Sanger DNA Sequencing Capillary Array (1-bp Resolution)
const sangerSim = simulateCapillaryElectrophoresis('sanger_dna_sequencing_cge', 15.0, 8.3);
assert(sangerSim.specimen.id === 'sanger_dna_sequencing_cge', 'Simulates Sanger DNA sequencing array');
assert(sangerSim.maxPeakPlatesN > 50000, `High capillary gel efficiency: N = ${sangerSim.maxPeakPlatesN} plates`);
assert(sangerSim.peaks.length === 3, 'Resolves 50-nt, 51-nt and 52-nt fragments with 1-nt step resolution');

// Test 7: Therapeutic Monoclonal Antibody (IgG1 mAb) Purity Testing (CE-SDS)
const mabSim = simulateCapillaryElectrophoresis('mab_purity_ce_sds', 15.0, 6.8);
assert(mabSim.specimen.id === 'mab_purity_ce_sds', 'Simulates IgG1 monoclonal antibody purity');
const lcPeak = mabSim.peaks.find((p) => p.id === 'light_chain_mab');
const hcPeak = mabSim.peaks.find((p) => p.id === 'heavy_chain_mab');
assert(lcPeak && hcPeak, 'Identifies both Light Chain (25 kDa) and Heavy Chain (50 kDa)');
assert(
  lcPeak && hcPeak && lcPeak.migrationTimeMinutes < hcPeak.migrationTimeMinutes,
  'Light chain migrates faster than heavy chain through SDS sieving matrix'
);

// Test 8: Inorganic Metal Cation Stokes Radius Separation
const cationSim = simulateCapillaryElectrophoresis('inorganic_cation_separation', 25.0, 4.5);
assert(cationSim.specimen.id === 'inorganic_cation_separation', 'Simulates alkali and alkaline earth cations');
const peakK = cationSim.peaks.find((p) => p.id === 'cation_k');
const peakNa = cationSim.peaks.find((p) => p.id === 'cation_na');
const peakLi = cationSim.peaks.find((p) => p.id === 'cation_li');
assert(
  peakK && peakNa && peakLi &&
  peakK.migrationTimeMinutes < peakNa.migrationTimeMinutes &&
  peakNa.migrationTimeMinutes < peakLi.migrationTimeMinutes,
  `Stokes hydrated radius hierarchy: K⁺ (${peakK?.migrationTimeMinutes}m) < Na⁺ (${peakNa?.migrationTimeMinutes}m) < Li⁺ (${peakLi?.migrationTimeMinutes}m)`
);

// Test 9: Organic Acid Anions EOF Reversal with CTAB
const acidSim = simulateCapillaryElectrophoresis('organic_acid_anions_czc', -20.0, 5.6);
assert(acidSim.specimen.id === 'organic_acid_anions_czc', 'Simulates organic food acid anions');
assert(acidSim.appliedVoltageKv === -20.0, 'Reversed negative polarity applied (-20 kV)');
assert(acidSim.peaks.length === 5, 'Resolves 5 food acid anions (Oxalate, Formate, Tartrate, Lactate, Acetate)');

// Test 10: Electropherogram Profile Points
assert(
  chiralSim.electropherogram.length > 100,
  `Electropherogram contains ${chiralSim.electropherogram.length} temporal absorbance data points`
);

// Test 11: Intelligent Card Matcher
const matchSanger = getMatchingCapillaryElectrophoresisCard({ id: 'card_sanger_seq', name: 'Sanger Sequencing Matrix', category: 'GENOMICS' });
assert(matchSanger?.id === 'sanger_dna_sequencing_cge', 'Card with "sanger/sequencing" matches sanger_dna_sequencing_cge');

const matchChiral = getMatchingCapillaryElectrophoresisCard({ id: 'card_chiral_amino', name: 'D-Alanine Chiral Mirror', category: 'AMINO_ACID' });
assert(matchChiral?.id === 'chiral_amino_acid_dl_cd', 'Card with "chiral/d-" matches chiral_amino_acid_dl_cd');

const matchMab = getMatchingCapillaryElectrophoresisCard({ id: 'card_mab_igg', name: 'Monoclonal IgG Antibody Purity', category: 'BIOLOGIC' });
assert(matchMab?.id === 'mab_purity_ce_sds', 'Card with "mab/antibody/purity" matches mab_purity_ce_sds');

const matchCation = getMatchingCapillaryElectrophoresisCard({ id: 'card_potassium_ion', name: 'Potassium Electrolyte Cation', category: 'MINERAL' });
assert(matchCation?.id === 'inorganic_cation_separation', 'Card with "cation/potassium" matches inorganic_cation_separation');

const matchAcid = getMatchingCapillaryElectrophoresisCard({ id: 'card_oxalate_beverage', name: 'Oxalate Beverage Acid', category: 'ACID' });
assert(matchAcid?.id === 'organic_acid_anions_czc', 'Card with "acid/oxalate" matches organic_acid_anions_czc');

const matchFallback = getMatchingCapillaryElectrophoresisCard({ id: 'card_capillary_tube', name: 'Capillary Electrophoresis Buffer', category: 'INSTRUMENT' });
assert(matchFallback?.id === 'chiral_amino_acid_dl_cd', 'Card with "capillary/electrophoresis" falls back cleanly to primary standard');

const matchNull = getMatchingCapillaryElectrophoresisCard({ id: 'card_gold_ring', name: 'Gold Ring', category: 'JEWELRY' });
assert(matchNull === null, 'Unrelated card returns null');

// Test 12: PeriodicCodexTab UI Integration
const codexContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf-8');
assert(codexContent.includes('CapillaryElectrophoresisVisualizer'), 'PeriodicCodexTab imports CapillaryElectrophoresisVisualizer');
assert(codexContent.includes('CAPILLARY_ELECTROPHORESIS'), 'PeriodicCodexTab contains CAPILLARY_ELECTROPHORESIS tab mode');
assert(codexContent.includes('playCapillaryHighVoltageHum'), 'PeriodicCodexTab plays capillary high voltage hum');
assert(codexContent.includes('SECTION 56: CAPILLARY ELECTROPHORESIS'), 'PeriodicCodexTab integrates SECTION 56 view container');

// Test 13: CardDetailModal UI Integration
const modalContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf-8');
assert(modalContent.includes('getMatchingCapillaryElectrophoresisCard'), 'CardDetailModal imports getMatchingCapillaryElectrophoresisCard');
assert(modalContent.includes('matchingCapillaryElectrophoresis'), 'CardDetailModal computes matchingCapillaryElectrophoresis memo');
assert(modalContent.includes('showCapillaryElectrophoresisModal'), 'CardDetailModal declares showCapillaryElectrophoresisModal state');
assert(modalContent.includes('Điện Di Mao Quản CE:'), 'CardDetailModal displays Capillary Electrophoresis action pill');
assert(modalContent.includes('<CapillaryElectrophoresisVisualizer'), 'CardDetailModal renders CapillaryElectrophoresisVisualizer in modal');

// Test 14: Web Audio Engine Integration
const soundContent = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf-8');
assert(soundContent.includes('playCapillaryHighVoltageHum'), 'soundEngine implements playCapillaryHighVoltageHum');
assert(soundContent.includes('playElectrophoresisPeakDetectionChime'), 'soundEngine implements playElectrophoresisPeakDetectionChime');

console.log('\n======================================================================');
console.log(`   TEST SUITE 124 SUMMARY: ${passedTests} / ${totalTests} ASSERTIONS PASSED`);
console.log('======================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
