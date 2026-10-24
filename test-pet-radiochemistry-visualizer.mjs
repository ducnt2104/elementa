// test-pet-radiochemistry-visualizer.mjs
// Milestone 68: Test Suite for Positron Emission Tomography (PET) Radiochemistry & β⁺ Annihilation Coincidence Engine

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
console.log('   TEST SUITE 125: PET RADIOCHEMISTRY & 511 keV ANNIHILATION ENGINE');
console.log('======================================================================\n');

// Test 1: File Existence
const enginePath = path.join(__dirname, 'src', 'domain', 'petRadiochemistryEngine.ts');
const visualizerPath = path.join(__dirname, 'src', 'components', 'visualizations', 'PetRadiochemistryVisualizer.tsx');
assert(fs.existsSync(enginePath), 'src/domain/petRadiochemistryEngine.ts exists');
assert(fs.existsSync(visualizerPath), 'src/components/visualizations/PetRadiochemistryVisualizer.tsx exists');

// Dynamic import of domain engine
const engineModule = await import('./src/domain/petRadiochemistryEngine.ts');
const {
  PET_RADIOCHEMISTRY_CATALOG,
  ELECTRON_REST_MASS_ENERGY_KEV,
  SPEED_OF_LIGHT_CM_PER_NS,
  calculateRadioactiveDecayFraction,
  simulatePetRadiochemistry,
  getMatchingPetCard
} = engineModule;

// Test 2: Catalog Coverage
assert(
  Array.isArray(PET_RADIOCHEMISTRY_CATALOG) && PET_RADIOCHEMISTRY_CATALOG.length >= 5,
  `Catalog contains ${PET_RADIOCHEMISTRY_CATALOG.length} international PET radiotracer standards ([¹⁸F]FDG, [⁶⁸Ga]DOTATATE, [¹¹C]PiB, [¹³N]NH₃, [¹⁸F]Fallypride)`
);

// Test 3: Fundamental Physical Constants & Annihilation Energy
assert(
  ELECTRON_REST_MASS_ENERGY_KEV === 511.0,
  'Electron rest mass energy m_e·c² = 511.0 keV per annihilation gamma photon (CODATA)'
);
assert(
  SPEED_OF_LIGHT_CM_PER_NS === 29.979,
  'Speed of light c = 29.979 cm/ns for Time-of-Flight (TOF) localization'
);

// Test 4: Radioactive Decay Law A(t) = A_0 * (1/2)^(t / t_1/2)
// For 18F (t_1/2 = 109.8 min):
const frac0 = calculateRadioactiveDecayFraction(0, 109.8);
assert(frac0 === 1.0, 'Residual activity at t = 0 min is 100% (1.0)');

const frac1Half = calculateRadioactiveDecayFraction(109.8, 109.8);
assert(frac1Half === 0.5, 'Residual activity at 1 half-life (109.8 min) is 50.0% (0.5000)');

const frac2Half = calculateRadioactiveDecayFraction(219.6, 109.8);
assert(frac2Half === 0.25, 'Residual activity at 2 half-lives (219.6 min) is 25.0% (0.2500)');

// For 11C (t_1/2 = 20.4 min):
const frac11C = calculateRadioactiveDecayFraction(20.4, 20.4);
assert(frac11C === 0.5, 'Residual activity of 11C at 20.4 min is 50.0% (0.5000)');

// Test 5: [¹⁸F]FDG Oncology Warburg Glycolytic Trapping Simulation
const fdgSim = simulatePetRadiochemistry('f18_fdg_oncology_warburg', 60.0);
assert(fdgSim.specimen.id === 'f18_fdg_oncology_warburg', 'Simulates [¹⁸F]FDG Warburg metabolic trapping');
assert(fdgSim.specimen.radionuclide === 'F_18', 'Radionuclide is Fluorine-18 (β⁺ emitter)');
assert(fdgSim.specimen.halfLifeMinutes === 109.8, 'Half-life t_1/2 = 109.8 minutes');
assert(fdgSim.suvMax >= 10.0, `Tumor lesion SUV_max reaches malignant hypermetabolic threshold: ${fdgSim.suvMax} (expected > 10)`);
assert(fdgSim.coincidenceEvents.length === 80, 'Generated 80 collinear 511 keV coincidence events');

// Verify collinearity and 511 keV photon energies
const all511 = fdgSim.coincidenceEvents.every((e) => e.photonEnergyKev === 511.0);
assert(all511, 'All coincidence photons have rest energy E_γ = 511.0 keV');

// Test 6: [⁶⁸Ga]DOTATATE Neuroendocrine SSTR2 Theranostic Standard
const dotatateSim = simulatePetRadiochemistry('ga68_dotatate_neuroendocrine', 50.0);
assert(dotatateSim.specimen.id === 'ga68_dotatate_neuroendocrine', 'Simulates [⁶⁸Ga]DOTATATE peptide receptor tracer');
assert(dotatateSim.specimen.halfLifeMinutes === 67.7, 'Gallium-68 half-life t_1/2 = 67.7 minutes');
assert(dotatateSim.suvMax >= 25.0, `Extreme neuroendocrine tumor contrast: SUV_max = ${dotatateSim.suvMax}`);
assert(dotatateSim.specimen.meanPositronRangeMm === 2.4, 'High positron endpoint energy results in 2.4 mm mean range');

// Test 7: [¹¹C]PiB Pittsburgh Compound B Alzheimer Amyloid-β Standard
const pibSim = simulatePetRadiochemistry('c11_pib_alzheimer_amyloid', 40.0);
assert(pibSim.specimen.id === 'c11_pib_alzheimer_amyloid', 'Simulates [¹¹C]PiB Alzheimer amyloid imaging');
const plaqueComp = pibSim.specimen.compartments.find((c) => c.name.includes('Plaque'));
const cerebComp = pibSim.specimen.compartments.find((c) => c.name.includes('Cerebellar'));
assert(plaqueComp && cerebComp, 'Identifies frontal cortex plaque zone and cerebellar reference');
assert(
  plaqueComp && cerebComp && plaqueComp.suvValue > cerebComp.suvValue * 2,
  `Plaque cortex SUV (${plaqueComp?.suvValue}) is >2× higher than cerebellar reference (${cerebComp?.suvValue})`
);

// Test 8: [¹³N]Ammonia Myocardial Blood Flow Perfusion
const ammoniaSim = simulatePetRadiochemistry('n13_ammonia_myocardial_perfusion', 10.0);
assert(ammoniaSim.specimen.id === 'n13_ammonia_myocardial_perfusion', 'Simulates [¹³N]Ammonia myocardial perfusion');
const ischemicComp = ammoniaSim.specimen.compartments.find((c) => c.metabolicStatus === 'LOW_UPTAKE');
const normalComp = ammoniaSim.specimen.compartments.find((c) => c.name.includes('Inferior'));
assert(
  ischemicComp && normalComp && ischemicComp.suvValue < normalComp.suvValue * 0.5,
  'Ischemic myocardial wall exhibits marked perfusion deficit (<50% of normal wall)'
);

// Test 9: [¹⁸F]Fallypride Striatal Dopamine D2/D3 Receptor Mapping
const fallyprideSim = simulatePetRadiochemistry('f18_fallypride_dopamine_d2', 90.0);
assert(fallyprideSim.specimen.id === 'f18_fallypride_dopamine_d2', 'Simulates [¹⁸F]Fallypride dopamine receptor mapping');
const striatumComp = fallyprideSim.specimen.compartments.find((c) => c.name.includes('Putamen'));
assert(striatumComp && striatumComp.suvValue > 15.0, `Dense striatal D2 receptor binding: ${striatumComp?.suvValue} SUV`);

// Test 10: Intelligent Card Matcher
const matchFdg = getMatchingPetCard({ id: 'card_fdg_tracer', name: 'Fluorodeoxyglucose FDG Tracer', category: 'RADIOCHEMISTRY' });
assert(matchFdg?.id === 'f18_fdg_oncology_warburg', 'Card with "FDG/glucose/tracer" matches f18_fdg_oncology_warburg');

const matchGa = getMatchingPetCard({ id: 'card_dotatate_net', name: 'DOTATATE Gallium-68 Peptide', category: 'ONCOLOGY' });
assert(matchGa?.id === 'ga68_dotatate_neuroendocrine', 'Card with "dotatate/gallium" matches ga68_dotatate_neuroendocrine');

const matchPib = getMatchingPetCard({ id: 'card_pib_amyloid', name: 'Pittsburgh Compound B Amyloid', category: 'NEUROLOGY' });
assert(matchPib?.id === 'c11_pib_alzheimer_amyloid', 'Card with "pib/amyloid" matches c11_pib_alzheimer_amyloid');

const matchAmmonia = getMatchingPetCard({ id: 'card_n13_ammonia', name: 'Nitrogen-13 Ammonia Myocardium', category: 'CARDIOLOGY' });
assert(matchAmmonia?.id === 'n13_ammonia_myocardial_perfusion', 'Card with "ammonia/n-13" matches n13_ammonia_myocardial_perfusion');

const matchDopamine = getMatchingPetCard({ id: 'card_fallypride_d2', name: 'Fallypride Dopamine Receptor', category: 'NEUROLOGY' });
assert(matchDopamine?.id === 'f18_fallypride_dopamine_d2', 'Card with "fallypride/dopamine" matches f18_fallypride_dopamine_d2');

const matchFallback = getMatchingPetCard({ id: 'card_positron_scanner', name: 'Positron Annihilation Gantry', category: 'PHYSICS' });
assert(matchFallback?.id === 'f18_fdg_oncology_warburg', 'Card with "positron/annihilation" falls back cleanly to primary standard');

const matchNull = getMatchingPetCard({ id: 'card_copper_wire', name: 'Copper Wire', category: 'MATERIAL' });
assert(matchNull === null, 'Unrelated card returns null');

// Test 11: PeriodicCodexTab UI Integration
const codexContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'PeriodicCodexTab.tsx'), 'utf-8');
assert(codexContent.includes('PetRadiochemistryVisualizer'), 'PeriodicCodexTab imports PetRadiochemistryVisualizer');
assert(codexContent.includes('PET_RADIOCHEMISTRY'), 'PeriodicCodexTab contains PET_RADIOCHEMISTRY tab mode');
assert(codexContent.includes('playPetPositronAnnihilationPing'), 'PeriodicCodexTab plays PET annihilation audio tone');
assert(codexContent.includes('SECTION 57: POSITRON EMISSION TOMOGRAPHY'), 'PeriodicCodexTab integrates SECTION 57 view container');

// Test 12: CardDetailModal UI Integration
const modalContent = fs.readFileSync(path.join(__dirname, 'src', 'components', 'cards', 'CardDetailModal.tsx'), 'utf-8');
assert(modalContent.includes('getMatchingPetCard'), 'CardDetailModal imports getMatchingPetCard');
assert(modalContent.includes('matchingPet'), 'CardDetailModal computes matchingPet memo');
assert(modalContent.includes('showPetModal'), 'CardDetailModal declares showPetModal state');
assert(modalContent.includes('Hóa Phóng Xạ PET:'), 'CardDetailModal displays PET action pill');
assert(modalContent.includes('<PetRadiochemistryVisualizer'), 'CardDetailModal renders PetRadiochemistryVisualizer in modal');

// Test 13: Web Audio Engine Integration
const soundContent = fs.readFileSync(path.join(__dirname, 'src', 'audio', 'soundEngine.ts'), 'utf-8');
assert(soundContent.includes('playPetPositronAnnihilationPing'), 'soundEngine implements playPetPositronAnnihilationPing');
assert(soundContent.includes('playCyclotronRadioisotopeSurgeTone'), 'soundEngine implements playCyclotronRadioisotopeSurgeTone');

console.log('\n======================================================================');
console.log(`   TEST SUITE 125 SUMMARY: ${passedTests} / ${totalTests} ASSERTIONS PASSED`);
console.log('======================================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
