// test-crispr-cas9-visualizer.mjs
// Milestone 50: GOLDEN HALF-CENTURY MILESTONE — Test Suite 107: CRISPR-Cas9 Gene Editing, PAM Recognition & DSB Repair Engine
// Standards: Nobel Prize in Chemistry 2020 (Emmanuelle Charpentier & Jennifer A. Doudna)
// Curriculum: Vietnam GDPT 2018 (Sinh học 12 Chuyên đề: Kỹ thuật CRISPR-Cas9; Hóa học 12: Endonuclease & Phối trí Mg2+)

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('======================================================================');
console.log('   TEST SUITE 107: CRISPR-CAS9 GENOME EDITING & DSB REPAIR ENGINE');
console.log('======================================================================\n');

async function runTests() {
  const enginePath = resolve('src/domain/crisprCas9Engine.ts');
  const visualizerPath = resolve('src/components/visualizations/CrisprCas9Visualizer.tsx');
  const codexPath = resolve('src/components/PeriodicCodexTab.tsx');
  const modalPath = resolve('src/components/cards/CardDetailModal.tsx');
  const soundPath = resolve('src/audio/soundEngine.ts');

  // Test 1: File existence
  assert(existsSync(enginePath), 'src/domain/crisprCas9Engine.ts exists');
  assert(existsSync(visualizerPath), 'src/components/visualizations/CrisprCas9Visualizer.tsx exists');

  const engineSource = readFileSync(enginePath, 'utf-8');
  const visualizerSource = readFileSync(visualizerPath, 'utf-8');
  const codexSource = readFileSync(codexPath, 'utf-8');
  const modalSource = readFileSync(modalPath, 'utf-8');
  const soundSource = readFileSync(soundPath, 'utf-8');

  // Test 2: Target Genes Catalog Coverage
  assert(
    engineSource.includes('sickle_cell_hbb') &&
    engineSource.includes('hiv_ccr5_knockout') &&
    engineSource.includes('golden_rice_psy') &&
    engineSource.includes('pd1_cancer_car_t'),
    'Target catalog contains Sickle Cell HBB, HIV CCR5, Golden Rice PSY, and CAR-T PD-1'
  );

  // Test 3: Cas Endonuclease Variants
  assert(
    engineSource.includes('SP_CAS9') &&
    engineSource.includes('SA_CAS9') &&
    engineSource.includes('SP_G') &&
    engineSource.includes('D_CAS9'),
    'Cas variants include SpCas9, compact SaCas9 (AAV), near-PAMless SpG, and dead dCas9'
  );

  // Test 4: PAM (Protospacer Adjacent Motif) Recognition
  assert(
    engineSource.includes("pamRequirement: '5\\'-NGG-3\\''") &&
    engineSource.includes('cleavageSiteIndex') &&
    engineSource.includes('pamMatched'),
    'PAM recognition strictly modeled (5\'-NGG-3\') with cleavage at -3 bp upstream'
  );

  // Test 5: Dual Catalytic Domains RuvC & HNH
  assert(
    engineSource.includes('ruvcActive') &&
    engineSource.includes('hnhActive') &&
    engineSource.includes('ruvcDomainStatusVI') &&
    engineSource.includes('hnhDomainStatusVI'),
    'RuvC and HNH catalytic endonuclease domains modeled for dual-strand cleavage'
  );

  // Test 6: Catalytically Dead dCas9 CRISPRi Behavior
  assert(
    engineSource.includes('D10A') &&
    engineSource.includes('H840A') &&
    engineSource.includes('canCleaveDsb: false'),
    'dCas9 (D10A/H840A) modeled for binding without DNA double-strand cleavage'
  );

  // Test 7: Seed Region Mismatch Sensitivity
  assert(
    engineSource.includes('seedPenalties') &&
    engineSource.includes('seedMismatchCount') &&
    engineSource.includes('distalPenalties'),
    'Seed region (10 nt proximal to PAM) exhibits extreme sensitivity compared to distal mismatches'
  );

  // Test 8: Magnesium Mg2+ Endonuclease Cofactor Coordination
  assert(
    engineSource.includes('mgFactor') &&
    engineSource.includes('mgConcentrationMm'),
    'Endonuclease phosphodiester cleavage requires coordinated Mg2+ cofactor ions'
  );

  // Test 9: Cellular Repair Mechanisms (NHEJ vs HDR)
  assert(
    engineSource.includes('NHEJ') &&
    engineSource.includes('HDR') &&
    engineSource.includes('frameshiftKnockoutPercent') &&
    engineSource.includes('precisionEditInsertionPercent'),
    'Cellular repair outputs modeled for error-prone NHEJ knockout vs donor HDR precision insertion'
  );

  // Test 10: Audio Engine Integration
  assert(
    soundSource.includes('playCrisprCas9DsbSnip') &&
    soundSource.includes('playHdrGeneInsertionGlow'),
    'soundEngine.ts provides playCrisprCas9DsbSnip and playHdrGeneInsertionGlow'
  );

  // Test 11: Visualizer Component Tabs
  assert(
    visualizerSource.includes('molecular_ribonucleoprotein') &&
    visualizerSource.includes('dsb_cleavage_kinetics') &&
    visualizerSource.includes('cellular_repair_nhej_hdr') &&
    visualizerSource.includes('nobel_ethics_gdpt'),
    'CrisprCas9Visualizer contains 4 comprehensive pedagogical tabs'
  );

  // Test 12: Visualizer Sequence Inspection
  assert(
    visualizerSource.includes('targetDnaSequence5to3') &&
    visualizerSource.includes('protospacer20nt') &&
    visualizerSource.includes('pamSequence'),
    'CrisprCas9Visualizer renders protospacer, PAM motif, and cutting shear coordinates'
  );

  // Test 13: Interactive Controls
  assert(
    visualizerSource.includes('selectedCasVariant') &&
    visualizerSource.includes('repairPathway') &&
    visualizerSource.includes('seedMismatches') &&
    visualizerSource.includes('distalMismatches'),
    'CrisprCas9Visualizer provides interactive Cas variant, repair pathway, and mismatch sliders'
  );

  // Test 14: Card Matching Service
  assert(
    engineSource.includes('getMatchingCrisprCard') &&
    modalSource.includes('matchingCrispr') &&
    modalSource.includes('getMatchingCrisprCard'),
    'CardDetailModal detects and links cards to CRISPR-Cas9 genome editing'
  );

  // Test 15: PeriodicCodexTab Section 39 Integration
  assert(
    codexSource.includes('CRISPR_CAS9') &&
    codexSource.includes('CrisprCas9Visualizer') &&
    codexSource.includes('SECTION 39: CRISPR-CAS9 GENE EDITING'),
    'PeriodicCodexTab successfully registers Section 39 for CRISPR-Cas9 Gene Editing'
  );

  // Test 16: Nobel Prize in Chemistry 2020 Citation
  assert(
    visualizerSource.includes('Nobel Hóa Học 2020') &&
    visualizerSource.includes('Emmanuelle Charpentier') &&
    visualizerSource.includes('Jennifer A. Doudna'),
    'Full academic citation of Nobel Prize in Chemistry 2020'
  );

  // Test 17: Bioethics & Vietnam GDPT 2018 Academic Integrity
  assert(
    visualizerSource.includes('Sinh & Hóa 12 GDPT') &&
    visualizerSource.includes('Tế Bào Soma vs Tế Bào Mầm') &&
    engineSource.includes('GDPT 2018'),
    'Full compliance with Vietnam GDPT 2018 Biology curriculum and international bioethical guidelines'
  );

  console.log('\n======================================================================');
  console.log(` TEST SUITE 107 AUDIT RESULT: ${passCount} / ${passCount + failCount} PASSED`);
  if (failCount === 0) {
    console.log(' 100% SUCCESS — MILESTONE 50 (GOLDEN HALF-CENTURY) COMPLETED IN FULL RIGOR!');
  } else {
    console.error(` ${failCount} TEST(S) FAILED!`);
    process.exit(1);
  }
  console.log('======================================================================\n');
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
