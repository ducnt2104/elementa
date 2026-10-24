// tests/test-polymer-kinetics-visualizer.mjs
// Test Suite 81: Polymerization, Macromolecules & Condensation Kinetics
// Conforming to Vietnam GDPT 2018 Chemistry 12 (Chương 4: Polime và Vật liệu Polime) & IUPAC Standards

import assert from 'assert';
import {
  CURRICULUM_POLYMERS,
  calculateDegreeOfPolymerization,
  calculateElementPercentage,
  calculateChainLengthNanometers
} from '../src/domain/polymerEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('🧪 Starting Test Suite 81: Polymerization, Macromolecules & Condensation Kinetics...\n');

let passedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Catalog Integrity
runTest('1. CURRICULUM_POLYMERS catalog integrity: contains 10 required curriculum polymers', () => {
  const polymerIds = Object.keys(CURRICULUM_POLYMERS);
  assert.strictEqual(polymerIds.length, 10);
  assert(polymerIds.includes('polyethylene'));
  assert(polymerIds.includes('polyvinyl_chloride'));
  assert(polymerIds.includes('teflon_ptfe'));
  assert(polymerIds.includes('pmma_plexiglas'));
  assert(polymerIds.includes('nylon_66'));
  assert(polymerIds.includes('terylene_lapsan'));
  assert(polymerIds.includes('buna_rubber'));
  assert(polymerIds.includes('vulcanized_rubber'));
  assert(polymerIds.includes('nitron_olon'));
  assert(polymerIds.includes('bakelite_rezit'));
});

// 2. Addition Polymerization Classification
runTest('2. Addition Polymerization verification: PE, PVC, Teflon, PMMA, Buna rubber, Nitron', () => {
  const additionPolymers = ['polyethylene', 'polyvinyl_chloride', 'teflon_ptfe', 'pmma_plexiglas', 'buna_rubber', 'nitron_olon'];
  for (const id of additionPolymers) {
    const p = CURRICULUM_POLYMERS[id];
    assert.strictEqual(p.polymerizationType, 'ADDITION', `${id} must be ADDITION`);
    assert.strictEqual(p.smallMoleculeByproduct, undefined, `${id} should have no byproduct`);
  }
});

// 3. Condensation Polymerization Classification & Byproducts
runTest('3. Condensation Polymerization verification: Nylon-6,6, Terylene/PET, Bakelite release H2O', () => {
  const condensationPolymers = ['nylon_66', 'terylene_lapsan', 'bakelite_rezit'];
  for (const id of condensationPolymers) {
    const p = CURRICULUM_POLYMERS[id];
    assert.strictEqual(p.polymerizationType, 'CONDENSATION', `${id} must be CONDENSATION`);
    assert.strictEqual(p.smallMoleculeByproduct, 'H2O', `${id} byproduct must be H2O`);
  }
});

// 4. Spatial Structure Classification
runTest('4. Spatial Structure verification: Linear vs 3D Network', () => {
  const linearPolymers = ['polyethylene', 'polyvinyl_chloride', 'teflon_ptfe', 'pmma_plexiglas', 'nylon_66', 'terylene_lapsan', 'buna_rubber', 'nitron_olon'];
  for (const id of linearPolymers) {
    assert.strictEqual(CURRICULUM_POLYMERS[id].spatialStructure, 'LINEAR', `${id} must be LINEAR`);
  }
  assert.strictEqual(CURRICULUM_POLYMERS.vulcanized_rubber.spatialStructure, 'NETWORK_3D', 'Vulcanized rubber must be NETWORK_3D');
  assert.strictEqual(CURRICULUM_POLYMERS.bakelite_rezit.spatialStructure, 'NETWORK_3D', 'Bakelite must be NETWORK_3D');
});

// 5. Application Categories
runTest('5. Application Category verification: PLASTIC, FIBER_TEXTILE, RUBBER', () => {
  assert.strictEqual(CURRICULUM_POLYMERS.polyethylene.applicationCategory, 'PLASTIC');
  assert.strictEqual(CURRICULUM_POLYMERS.polyvinyl_chloride.applicationCategory, 'PLASTIC');
  assert.strictEqual(CURRICULUM_POLYMERS.teflon_ptfe.applicationCategory, 'PLASTIC');
  assert.strictEqual(CURRICULUM_POLYMERS.pmma_plexiglas.applicationCategory, 'PLASTIC');
  assert.strictEqual(CURRICULUM_POLYMERS.bakelite_rezit.applicationCategory, 'PLASTIC');

  assert.strictEqual(CURRICULUM_POLYMERS.nylon_66.applicationCategory, 'FIBER_TEXTILE');
  assert.strictEqual(CURRICULUM_POLYMERS.terylene_lapsan.applicationCategory, 'FIBER_TEXTILE');
  assert.strictEqual(CURRICULUM_POLYMERS.nitron_olon.applicationCategory, 'FIBER_TEXTILE');

  assert.strictEqual(CURRICULUM_POLYMERS.buna_rubber.applicationCategory, 'RUBBER');
  assert.strictEqual(CURRICULUM_POLYMERS.vulcanized_rubber.applicationCategory, 'RUBBER');
});

// 6. Polymer Origins: Synthetic vs Semi-synthetic
runTest('6. Origin verification: Vulcanized rubber is SEMI_SYNTHETIC, others are SYNTHETIC', () => {
  assert.strictEqual(CURRICULUM_POLYMERS.vulcanized_rubber.origin, 'SEMI_SYNTHETIC');
  assert.strictEqual(CURRICULUM_POLYMERS.polyethylene.origin, 'SYNTHETIC');
  assert.strictEqual(CURRICULUM_POLYMERS.nylon_66.origin, 'SYNTHETIC');
});

// 7. Degree of Polymerization Calculation (n = M_polymer / M_monomer)
runTest('7. calculateDegreeOfPolymerization: correctly computes degree n', () => {
  // PE: M_monomer = 28.05 g/mol, M_polymer = 28,050 g/mol -> n = 1000
  const nPE = calculateDegreeOfPolymerization(28050, 28.05);
  assert.strictEqual(nPE, 1000);

  // PVC: M_monomer = 62.5 g/mol, M_polymer = 125,000 g/mol -> n = 2000
  const nPVC = calculateDegreeOfPolymerization(125000, 62.5);
  assert.strictEqual(nPVC, 2000);

  // Edge cases
  assert.strictEqual(calculateDegreeOfPolymerization(0, 28.05), 0);
  assert.strictEqual(calculateDegreeOfPolymerization(-100, 28.05), 0);
  assert.strictEqual(calculateDegreeOfPolymerization(28050, 0), 0);
});

// 8. Element Mass Percentage Calculations
runTest('8. calculateElementPercentage: verifies %Cl in PVC, %F in Teflon, %N in Nitron', () => {
  // PVC: Cl = 35.5, M = 62.5 -> 35.5 / 62.5 * 100 = 56.8%
  const pctCl = calculateElementPercentage(35.5, 1, 62.5);
  assert.strictEqual(pctCl, 56.8);

  // Teflon: 4 * F(19.0) = 76.0, M = 100.02 -> 76 / 100.02 * 100 = 75.98%
  const pctF = calculateElementPercentage(19.0, 4, 100.02);
  assert.strictEqual(pctF, 75.98);

  // Nitron (PAN): N = 14.01, M = 53.06 -> 14.01 / 53.06 * 100 = 26.4%
  const pctN = calculateElementPercentage(14.01, 1, 53.06);
  assert.strictEqual(pctN, 26.4);

  // Edge cases
  assert.strictEqual(calculateElementPercentage(35.5, 1, 0), 0);
});

// 9. Chain Length in Nanometers Calculation
runTest('9. calculateChainLengthNanometers: computes extended chain length', () => {
  // n = 100, 2 carbon bonds per unit -> 200 bonds * 0.126 nm = 25.2 nm
  const len100 = calculateChainLengthNanometers(100, 2);
  assert.strictEqual(len100, 25.2);

  // n = 1000, 2 carbon bonds per unit -> 2000 bonds * 0.126 nm = 252.0 nm
  const len1000 = calculateChainLengthNanometers(1000, 2);
  assert.strictEqual(len1000, 252);

  // Edge cases
  assert.strictEqual(calculateChainLengthNanometers(0), 0);
  assert.strictEqual(calculateChainLengthNanometers(-50), 0);
});

// 10. Nylon-6,6 Monomers & Stoichiometry
runTest('10. Nylon-6,6: monomers have 6 carbons each (1,6-diaminohexane & adipic acid)', () => {
  const nylon = CURRICULUM_POLYMERS.nylon_66;
  assert.strictEqual(nylon.monomers.length, 2);
  assert(nylon.monomers[0].formula.includes('(CH2)6'));
  assert(nylon.monomers[1].formula.includes('(CH2)4'));
  assert.strictEqual(nylon.repeatingUnitFormula, '[-NH-(CH2)6-NH-CO-(CH2)4-CO-]');
});

// 11. Terylene / Lapsan (PET) Polyester Linkages
runTest('11. Terylene / Lapsan (PET): ester linkage formed between terephthalic acid and ethylene glycol', () => {
  const lapsan = CURRICULUM_POLYMERS.terylene_lapsan;
  assert.strictEqual(lapsan.monomers.length, 2);
  assert(lapsan.monomers[0].formula.includes('C6H4'));
  assert(lapsan.monomers[1].formula.includes('HO-CH2-CH2-OH'));
  assert(lapsan.repeatingUnitFormula.includes('-OC-C6H4-CO-O-'));
});

// 12. PMMA Plexiglas Optical Transparency
runTest('12. PMMA Plexiglas: methyl methacrylate ester gives high optical transparency (>92%)', () => {
  const pmma = CURRICULUM_POLYMERS.pmma_plexiglas;
  assert(pmma.monomers[0].nameVI.includes('Metyl metacrylat'));
  assert(pmma.keyPhysicalPropertiesVI[0].includes('92-93%'));
});

// 13. Buna Rubber 1,4-Addition & Residual Double Bond
runTest('13. Buna Rubber: 1,4-addition retains active internal C=C bond for vulcanization', () => {
  const buna = CURRICULUM_POLYMERS.buna_rubber;
  assert(buna.repeatingUnitFormula.includes('-CH2-CH=CH-CH2-'));
  assert(buna.keyPhysicalPropertiesVI[1].includes('liên kết đôi C=C chưa phản ứng'));
});

// 14. Bakelite Thermoset 3D Network
runTest('14. Bakelite / Rezit: thermoset resin with methylene bridges, does not melt upon heating', () => {
  const bakelite = CURRICULUM_POLYMERS.bakelite_rezit;
  assert.strictEqual(bakelite.spatialStructure, 'NETWORK_3D');
  assert(bakelite.keyPhysicalPropertiesVI[0].includes('chất dẻo nhiệt rắn'));
  assert(bakelite.keyPhysicalPropertiesVI[0].includes('không nóng chảy'));
});

// 15. Sound Engine Integration
runTest('15. Sound Engine: playPolymerChainLink and playVulcanizationSizzle are callable', () => {
  assert.strictEqual(typeof sound.playPolymerChainLink, 'function');
  assert.strictEqual(typeof sound.playVulcanizationSizzle, 'function');
  // Safe test without web audio throwing error in Node environment
  sound.playPolymerChainLink();
  sound.playVulcanizationSizzle();
});

console.log(`\n🎉 All ${passedTests} / 15 tests passed successfully in Test Suite 81!\n`);
