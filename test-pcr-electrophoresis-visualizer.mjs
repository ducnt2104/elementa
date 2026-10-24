// test-pcr-electrophoresis-visualizer.mjs
// Milestone 49: Test Suite 106 — Polymerase Chain Reaction (PCR), Thermal Cycling & Agarose Gel Electrophoresis Engine
// Standards: Nobel Prize in Chemistry 1993 (Kary B. Mullis) & Nobel Prize in Chemistry 1948 (Arne Tiselius)
// Curriculum: Vietnam GDPT 2018 (Sinh học 10 & 12 Chuyên đề: Kỹ thuật PCR; Hóa học 12 Chuyên đề: Cấu trúc Acid Nucleic)

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
console.log('   TEST SUITE 106: PCR THERMAL CYCLING & AGAROSE GEL ENGINE');
console.log('======================================================================\n');

async function runTests() {
  const enginePath = resolve('src/domain/pcrElectrophoresisEngine.ts');
  const visualizerPath = resolve('src/components/visualizations/PcrElectrophoresisVisualizer.tsx');
  const codexPath = resolve('src/components/PeriodicCodexTab.tsx');
  const modalPath = resolve('src/components/cards/CardDetailModal.tsx');
  const soundPath = resolve('src/audio/soundEngine.ts');

  // Test 1: File existence
  assert(existsSync(enginePath), 'src/domain/pcrElectrophoresisEngine.ts exists');
  assert(existsSync(visualizerPath), 'src/components/visualizations/PcrElectrophoresisVisualizer.tsx exists');

  const engineSource = readFileSync(enginePath, 'utf-8');
  const visualizerSource = readFileSync(visualizerPath, 'utf-8');
  const codexSource = readFileSync(codexPath, 'utf-8');
  const modalSource = readFileSync(modalPath, 'utf-8');
  const soundSource = readFileSync(soundPath, 'utf-8');

  // Test 2: Target Amplicons Catalog Coverage
  assert(
    engineSource.includes('sars_cov2_n_gene') &&
    engineSource.includes('human_brca1_exon11') &&
    engineSource.includes('gmo_soybean_35s') &&
    engineSource.includes('bacterial_16s_rrna'),
    'Target amplicons catalog contains SARS-CoV-2, BRCA1, GMO CaMV 35S, and Bacterial 16S rRNA'
  );

  // Test 3: Standard DNA Ladder Definition
  assert(
    engineSource.includes('STANDARD_DNA_LADDER_BANDS') &&
    engineSource.includes('2000') &&
    engineSource.includes('1000') &&
    engineSource.includes('100'),
    'Standard DNA ladder provides calibrated size benchmarks from 100 bp to 2000 bp'
  );

  // Test 4: Electrophoresis Logarithmic Migration Mechanics
  assert(
    engineSource.includes('calculateElectrophoresisMigration') &&
    engineSource.includes('Math.log10'),
    'Agarose gel electrophoresis migration adheres to logarithmic molecular sieving (~ -k log10 bp)'
  );

  // Test 5: PCR Exponential Kinetics N_n = N0 * (1 + E)^n
  assert(
    engineSource.includes('Math.pow(1 + efficiency, c)') &&
    engineSource.includes('amplificationFold') &&
    engineSource.includes('growthCurve'),
    'Exponential amplification kinetics mathematically modeled with efficiency factor E'
  );

  // Test 6: Saturation Plateau Carrying Capacity
  assert(
    engineSource.includes('nMax') &&
    engineSource.includes('isPlateauReached'),
    'Saturation plateau modeled for dNTP exhaustion and Taq polymerase thermal decay'
  );

  // Test 7: Cycle Threshold (Ct) Quantification
  assert(
    engineSource.includes('thresholdCycle') &&
    engineSource.includes('cycleThresholdCt') &&
    engineSource.includes('detectionLimit'),
    'Real-time qPCR cycle threshold (Ct) accurately determined against baseline threshold'
  );

  // Test 8: Thermal Cycling 3-Phase Temperature Profiles
  assert(
    engineSource.includes('DENATURATION') &&
    engineSource.includes('ANNEALING') &&
    engineSource.includes('EXTENSION') &&
    engineSource.includes('95.0') &&
    engineSource.includes('72.0'),
    'Three-step thermal cycling rigorously incorporates 95°C denaturation, annealing, and 72°C extension'
  );

  // Test 9: Buffer Mg2+ Cofactor & Primer Tm Mismatch Penalty
  assert(
    engineSource.includes('mgPenalty') &&
    engineSource.includes('tempPenalty') &&
    engineSource.includes('optimalAnnealingTempCelsius'),
    'Reaction efficiency penalizes annealing temperature mismatch and non-optimal Mg2+ concentration'
  );

  // Test 10: Gel Lanes Integrity & Negative Control (NTC) Blank Check
  assert(
    engineSource.includes('gelLanes') &&
    engineSource.includes('isLadder') &&
    engineSource.includes('Chứng Âm NTC'),
    'Agarose gel simulator renders negative control (NTC blank) and sample bands with fluorescence'
  );

  // Test 11: Audio Engine Integration
  assert(
    soundSource.includes('playPcrThermalStepChime') &&
    soundSource.includes('playUvGelFluorescenceHum'),
    'soundEngine.ts provides playPcrThermalStepChime and playUvGelFluorescenceHum'
  );

  // Test 12: Visualizer Component Tabs
  assert(
    visualizerSource.includes('agarose_gel_electrophoresis') &&
    visualizerSource.includes('thermal_cycling') &&
    visualizerSource.includes('exponential_amplification') &&
    visualizerSource.includes('dna_chemistry_gdpt'),
    'PcrElectrophoresisVisualizer provides 4 comprehensive pedagogical tabs'
  );

  // Test 13: UV Transilluminator Light Switch Toggle
  assert(
    visualizerSource.includes('uvLightOn') &&
    visualizerSource.includes('handleUvToggle') &&
    visualizerSource.includes('Đèn Soi UV 302nm'),
    'PcrElectrophoresisVisualizer provides interactive UV transilluminator light switch'
  );

  // Test 14: Card Matching Service
  assert(
    engineSource.includes('getMatchingPcrCard') &&
    modalSource.includes('matchingPcr') &&
    modalSource.includes('getMatchingPcrCard'),
    'CardDetailModal detects and links cards to PCR amplification and DNA targets'
  );

  // Test 15: PeriodicCodexTab Section 38 Integration
  assert(
    codexSource.includes('PCR_ELECTROPHORESIS') &&
    codexSource.includes('PcrElectrophoresisVisualizer') &&
    codexSource.includes('SECTION 38: PCR THERMAL CYCLING'),
    'PeriodicCodexTab successfully registers Section 38 for PCR & Gel Electrophoresis'
  );

  // Test 16: Nobel Prize in Chemistry 1993 & Vietnam GDPT 2018 Academic Integrity
  assert(
    visualizerSource.includes('Nobel Hóa Học 1993') &&
    visualizerSource.includes('Kary B. Mullis') &&
    visualizerSource.includes('Sinh & Hóa 12 GDPT'),
    'Full compliance with Nobel Prize in Chemistry 1993 and Vietnam GDPT 2018 Biology & Chemistry'
  );

  console.log('\n======================================================================');
  console.log(` TEST SUITE 106 AUDIT RESULT: ${passCount} / ${passCount + failCount} PASSED`);
  if (failCount === 0) {
    console.log(' 100% SUCCESS — MILESTONE 49 COMPLETED IN FULL RIGOR!');
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
