// tests/test-amines-aminoacids-peptides.mjs
// Test Suite 172: Amines Basicity, Amino Acids Isoelectric Point & Electrophoresis, Aniline Bromination & Biuret Test
// Conforming strictly to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 3: Hợp chất chứa Nitơ) & IUPAC Standards

import {
  AMINES_CATALOG,
  AMINO_ACIDS_CATALOG,
  calculateElectrophoresisMigration,
  calculateAnilineBromineReaction,
  evaluateBiuretTest,
  evaluateXanthoproteicTest
} from '../src/domain/amineAminoAcidPeptideEngine.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 172: AMINES, AMINO ACIDS, PEPTIDES & PROTEIN   ');
console.log('======================================================================');

// Test 1: Amines Basicity Hierarchy
assert(AMINES_CATALOG.length === 4, 'Catalog contains 4 core amines');
const dma = AMINES_CATALOG.find(a => a.id === 'dimethylamine');
const ma = AMINES_CATALOG.find(a => a.id === 'methylamine');
const nh3 = AMINES_CATALOG.find(a => a.id === 'ammonia');
const ani = AMINES_CATALOG.find(a => a.id === 'aniline');

assert(dma && dma.relativeBasicityRank === 1, 'Dimethylamine is the strongest base (rank 1)');
assert(ma && ma.relativeBasicityRank === 2, 'Methylamine is rank 2');
assert(nh3 && nh3.relativeBasicityRank === 3, 'Ammonia is rank 3');
assert(ani && ani.relativeBasicityRank === 4, 'Aniline is the weakest base (rank 4)');
assert(ani.litmusReactionVI.includes('KHÔNG làm đổi màu quỳ tím'), 'Aniline does NOT turn litmus blue due to phenyl ring electron withdrawal');

// Test 2: Amino Acids Catalog & Litmus Test (GDPT 2018 Standard)
assert(AMINO_ACIDS_CATALOG.length === 5, 'Catalog contains 5 core amino acids');
const gly = AMINO_ACIDS_CATALOG.find(a => a.id === 'glycine');
const ala = AMINO_ACIDS_CATALOG.find(a => a.id === 'alanine');
const val = AMINO_ACIDS_CATALOG.find(a => a.id === 'valine');
const glu = AMINO_ACIDS_CATALOG.find(a => a.id === 'glutamic_acid');
const lys = AMINO_ACIDS_CATALOG.find(a => a.id === 'lysine');

assert(gly.litmusColorVI === 'KHONG_DOI_MAU', 'Glycine does not change litmus color (neutral)');
assert(ala.litmusColorVI === 'KHONG_DOI_MAU', 'Alanine does not change litmus color');
assert(val.litmusColorVI === 'KHONG_DOI_MAU', 'Valine does not change litmus color');
assert(glu.litmusColorVI === 'DO', 'Glutamic acid has 2 COOH, 1 NH2 -> turns litmus red!');
assert(glu.isoelectricPointPI < 4.0, `Glutamic acid pI is acidic: ${glu.isoelectricPointPI}`);
assert(lys.litmusColorVI === 'XANH', 'Lysine has 2 NH2, 1 COOH -> turns litmus blue!');
assert(lys.isoelectricPointPI > 9.0, `Lysine pI is basic: ${lys.isoelectricPointPI}`);

// Test 3: Electrophoresis Migration Model
// At pH = pI -> Zwitterion, stays stationary
const glyAtPI = calculateElectrophoresisMigration({ aminoAcidId: 'glycine', solutionPH: 5.97 });
assert(glyAtPI.dominantFormVI === 'ZWITTERION_LUONG_CUC', 'Glycine at pI forms zwitterion');
assert(glyAtPI.migrationDirectionVI === 'DUNG_YEN_KHONG_DICH_CHUYEN', 'Glycine at pI does not migrate');

// At pH = 1.5 < pI -> Cation (+), moves to Cathode (-)
const glyAtAcid = calculateElectrophoresisMigration({ aminoAcidId: 'glycine', solutionPH: 1.5 });
assert(glyAtAcid.dominantFormVI === 'CATION_DUONG', 'Glycine at pH 1.5 is a cation');
assert(glyAtAcid.migrationDirectionVI === 'VE_CUC_AM_CATOT', 'Glycine cation migrates to Cathode (-)');

// At pH = 11.0 > pI -> Anion (-), moves to Anode (+)
const glyAtBase = calculateElectrophoresisMigration({ aminoAcidId: 'glycine', solutionPH: 11.0 });
assert(glyAtBase.dominantFormVI === 'ANION_AM', 'Glycine at pH 11 is an anion');
assert(glyAtBase.migrationDirectionVI === 'VE_CUC_DUONG_ANOT', 'Glycine anion migrates to Anode (+)');

// Test 4: Aniline Bromination (White Precipitate)
const anilineReaction = calculateAnilineBromineReaction({ anilineMassGrams: 9.313 });
assert(anilineReaction.stoichiometricRatioAnilineToBr2 === 3, '1 mol aniline reacts with 3 mol Br2');
// 9.313 g aniline = 0.1 mol -> 0.1 mol 2,4,6-tribromoaniline = 32.98 g
assert(Math.abs(anilineReaction.theoreticalPrecipitateGrams - 32.98) < 0.1, `Precipitate yield: ${anilineReaction.theoreticalPrecipitateGrams}g (expected ~32.98g)`);
assert(anilineReaction.precipitateFormula === 'C6H2Br3NH2', 'Precipitate is 2,4,6-tribromoaniline C6H2Br3NH2');

// Test 5: Biuret Peptide Test (Core Rule: Requires >= 2 peptide bonds)
// Dipeptide: Gly-Ala (1 bond) -> FAILS Biuret test
const dipeptideTest = evaluateBiuretTest(['Gly', 'Ala']);
assert(dipeptideTest.canGiveBiuretTest === false, 'Dipeptide must NOT give Biuret test (only 1 peptide bond)');
assert(dipeptideTest.observedColorHex === '#38bdf8', 'Dipeptide retains light blue color of unreacted Cu(OH)2');

// Tripeptide: Gly-Ala-Val (2 bonds) -> PASSES Biuret test
const tripeptideTest = evaluateBiuretTest(['Gly', 'Ala', 'Val']);
assert(tripeptideTest.canGiveBiuretTest === true, 'Tripeptide gives positive Biuret test (2 peptide bonds)');
assert(tripeptideTest.observedColorHex === '#8b5cf6', 'Tripeptide gives characteristic violet color');

// Protein: 12 amino acids -> PASSES Biuret test
const proteinTest = evaluateBiuretTest(['Gly', 'Ala', 'Val', 'Leu', 'Ile', 'Pro', 'Phe', 'Tyr', 'Trp', 'Lys', 'Arg', 'His']);
assert(proteinTest.canGiveBiuretTest === true, 'Protein gives positive Biuret test');
assert(proteinTest.peptide.classificationVI === 'PROTEIN', 'Classified as protein');

// Test 6: Xanthoproteic Test
const aromaticProtein = evaluateXanthoproteicTest({
  sampleNameVI: 'Lòng trắng trứng (Albumin)',
  hasAromaticResidues: true
});
assert(aromaticProtein.containsAromaticRings === true, 'Albumin contains aromatic amino acids');
assert(aromaticProtein.nitricAcidReactionPhenomenonVI.includes('màu vàng'), 'Albumin gives yellow precipitate with HNO3');
assert(aromaticProtein.ammoniaNeutralizationPhenomenonVI.includes('màu da cam'), 'Yellow precipitate turns orange with ammonia');

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed + failed} TESTS PASSED`);
if (failed > 0) {
  console.log(` FAILURE: ${failed} tests failed!`);
  process.exit(1);
} else {
  console.log(' TEST SUITE 172 COMPLETED IN 100% HARMONY!');
  console.log('======================================================================');
  process.exit(0);
}
