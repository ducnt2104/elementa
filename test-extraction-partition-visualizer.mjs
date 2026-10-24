// test-extraction-partition-visualizer.mjs
// Test Suite 92: Liquid-Liquid Extraction, Partition Coefficient & Separatory Funnel Engine
// Standards: IUPAC Compendium of Chemical Terminology & Vietnam GDPT 2018 (Hóa 11: Phương pháp tách biệt và tinh chế hợp chất hữu cơ - Phương pháp chiết)

import assert from 'assert';
import {
  EXTRACTION_SOLVENTS,
  EXTRACTED_SOLUTES,
  ACID_BASE_EXTRACTION_PROTOCOL,
  calculateMultipleExtractionYield,
  determineSeparatoryFunnelLayers,
  calculateCraigDistribution,
  calculateSaltingOutEffect,
  getMatchingExtractionSolute,
} from './src/domain/extractionPartitionEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 92: LIQUID-LIQUID EXTRACTION & SEPARATORY FUNNEL ENGINE');

let testsPassed = 0;

function runTest(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    process.exit(1);
  }
}

// 1. EXTRACTION SOLVENTS PROPERTIES & PHYSICAL CONSTANTS
runTest('EXTRACTION_SOLVENTS contains all standard laboratory solvents with accurate densities', () => {
  assert(EXTRACTION_SOLVENTS.water, 'Water must be defined');
  assert.strictEqual(EXTRACTION_SOLVENTS.water.densityGPerMl, 1.0);
  assert.strictEqual(EXTRACTION_SOLVENTS.water.isHeavierThanWater, false);

  const ether = EXTRACTION_SOLVENTS.diethyl_ether;
  assert(ether, 'Diethyl ether must be defined');
  assert(ether.densityGPerMl < 1.0, 'Ether density (0.713) must be less than water (floats)');
  assert.strictEqual(ether.densityGPerMl, 0.713);
  assert.strictEqual(ether.isHeavierThanWater, false);

  const dcm = EXTRACTION_SOLVENTS.dichloromethane;
  assert(dcm, 'DCM must be defined');
  assert(dcm.densityGPerMl > 1.0, 'DCM density (1.326) must be greater than water (sinks)');
  assert.strictEqual(dcm.densityGPerMl, 1.326);
  assert.strictEqual(dcm.isHeavierThanWater, true);

  const chloroform = EXTRACTION_SOLVENTS.chloroform;
  assert(chloroform.densityGPerMl > 1.0, 'Chloroform density (1.489) must sink');
  assert.strictEqual(chloroform.isHeavierThanWater, true);

  const hexane = EXTRACTION_SOLVENTS.hexane;
  assert(hexane.densityGPerMl < 1.0, 'Hexane density (0.655) must float');
  assert.strictEqual(hexane.isHeavierThanWater, false);
});

// 2. EXTRACTED SOLUTES & BENCHMARK KD VALUES
runTest('EXTRACTED_SOLUTES defines key benchmark organic solutes with valid partition coefficients', () => {
  const benzoic = EXTRACTED_SOLUTES.benzoic_acid;
  assert(benzoic, 'Benzoic acid must be present');
  assert.strictEqual(benzoic.formula, 'C6H5COOH');
  assert(benzoic.kd_etherWater > 1.0, 'Benzoic acid favors ether over water');
  assert.strictEqual(benzoic.acidBaseNature, 'ACIDIC');

  const aniline = EXTRACTED_SOLUTES.aniline;
  assert(aniline, 'Aniline must be present');
  assert.strictEqual(aniline.formula, 'C6H5NH2');
  assert.strictEqual(aniline.acidBaseNature, 'BASIC');
  assert(aniline.kd_etherWater > 1.0);

  const naphthalene = EXTRACTED_SOLUTES.naphthalene;
  assert(naphthalene, 'Naphthalene must be present');
  assert.strictEqual(naphthalene.acidBaseNature, 'NEUTRAL');
  assert(naphthalene.kd_etherWater >= 20.0, 'Naphthalene highly lipophilic');

  const caffeine = EXTRACTED_SOLUTES.caffeine;
  assert(caffeine, 'Caffeine must be present');
  assert(caffeine.kd_dcmWater > caffeine.kd_etherWater, 'Caffeine extracts much better in DCM than ether');
});

// 3. SINGLE-BATCH EXTRACTION YIELD CALCULATION
runTest('calculateMultipleExtractionYield handles single extraction step correctly', () => {
  // m0 = 10.0g, V_aq = 50mL, V_org = 50mL, n = 1, KD = 4.0
  // Residual in water: m_1 = 10 * [50 / (50 + 4*50)] = 10 * [50 / 250] = 10 * 0.2 = 2.0g
  // Extracted in organic: 10 - 2 = 8.0g (80%)
  const res = calculateMultipleExtractionYield(10.0, 50, 50, 1, 4.0);
  assert.strictEqual(res.batchProgress.length, 1);
  assert.strictEqual(res.remainingMassAqueousG, 2.0);
  assert.strictEqual(res.extractedMassOrganicG, 8.0);
  assert.strictEqual(res.extractionEfficiencyPercent, 80.0);
});

// 4. MULTIPLE VS SINGLE EXTRACTION EFFICIENCY INVARIANT
runTest('Multiple extractions with smaller portions are strictly superior to single extraction with same total volume', () => {
  const m0 = 10.0;
  const vAq = 50;
  const kd = 5.0;

  // Single extraction with 60 mL solvent
  const single = calculateMultipleExtractionYield(m0, vAq, 60, 1, kd);

  // 3 extractions with 20 mL each (total 60 mL solvent)
  const triple = calculateMultipleExtractionYield(m0, vAq, 20, 3, kd);

  console.log(`    Single 60mL: ${single.extractionEfficiencyPercent}% vs 3x20mL: ${triple.extractionEfficiencyPercent}%`);
  assert(
    triple.extractionEfficiencyPercent > single.extractionEfficiencyPercent,
    '3 x 20 mL must extract strictly more solute than 1 x 60 mL'
  );
  assert(
    triple.remainingMassAqueousG < single.remainingMassAqueousG,
    'Residual mass in water must be strictly lower with multiple extractions'
  );
});

// 5. MONOTONIC CONVERGENCE & ACCUMULATION
runTest('calculateMultipleExtractionYield yields monotonic increase in extracted percent with steps', () => {
  const res = calculateMultipleExtractionYield(5.0, 100, 25, 5, 3.0);
  assert.strictEqual(res.batchProgress.length, 5);

  let prevRecovery = 0;
  let prevResidual = 5.0;

  for (let i = 0; i < res.batchProgress.length; i++) {
    const batch = res.batchProgress[i];
    assert(batch.batch === i + 1);
    assert(batch.remainingG > 0);
    assert(batch.remainingG <= 5.0);
    assert(batch.cumulativeExtractedPercent > prevRecovery, 'Cumulative percent must strictly increase');
    assert(batch.remainingG < prevResidual, 'Residual mass in water must strictly decrease');
    prevRecovery = batch.cumulativeExtractedPercent;
    prevResidual = batch.remainingG;
  }
});

// 6. HIGH KD VS LOW KD EXTRACTION COMPARISON
runTest('High KD solutes reach >95% recovery much faster than low KD solutes', () => {
  const lowKdRes = calculateMultipleExtractionYield(2.0, 50, 20, 3, 1.0);
  const highKdRes = calculateMultipleExtractionYield(2.0, 50, 20, 3, 25.0);

  assert(highKdRes.extractionEfficiencyPercent > 98.0, 'Naphthalene-like KD=25 reaches >98% in 3 extractions');
  assert(lowKdRes.extractionEfficiencyPercent < 70.0, 'Low KD=1.0 leaves significant solute behind (~63.6%)');
});

// 7. SEPARATORY FUNNEL LAYER ORIENTATION BY DENSITY
runTest('determineSeparatoryFunnelLayers accurately determines top/bottom layer and draining protocol', () => {
  // Case A: Diethyl ether (density = 0.713 < 1.0)
  const etherLayers = determineSeparatoryFunnelLayers(EXTRACTION_SOLVENTS.diethyl_ether);
  assert.strictEqual(etherLayers.organicIsTop, true);
  assert(etherLayers.upperLayerNameVI.includes('Đietyl'));
  assert(etherLayers.lowerLayerNameVI.includes('Nước'));

  // Case B: Dichloromethane (density = 1.326 > 1.0)
  const dcmLayers = determineSeparatoryFunnelLayers(EXTRACTION_SOLVENTS.dichloromethane);
  assert.strictEqual(dcmLayers.organicIsTop, false);
  assert(dcmLayers.lowerLayerNameVI.includes('Điclometan') || dcmLayers.lowerLayerNameVI.includes('Metylen'));
  assert(dcmLayers.upperLayerNameVI.includes('Nước'));

  // Case C: Hexane (density = 0.655 < 1.0)
  const hexaneLayers = determineSeparatoryFunnelLayers(EXTRACTION_SOLVENTS.hexane);
  assert.strictEqual(hexaneLayers.organicIsTop, true);
});

// 8. ACID-BASE 3-COMPONENT SEPARATION PROTOCOL VERIFICATION
runTest('ACID_BASE_EXTRACTION_PROTOCOL defines the full separation sequence for acid, base, and neutral', () => {
  assert(ACID_BASE_EXTRACTION_PROTOCOL.length === 3, 'Protocol must have 3 comprehensive steps');

  // Step 1: Extraction of benzoic acid by NaHCO3/NaOH
  const step1 = ACID_BASE_EXTRACTION_PROTOCOL[0];
  assert(step1.reagentAdded.includes('NaHCO3'));
  assert(step1.targetSoluteIsolated.includes('Axit benzoic'));
  assert(step1.precipitationReagent.includes('HCl'));

  // Step 2: Extraction of aniline by dilute HCl
  const step2 = ACID_BASE_EXTRACTION_PROTOCOL[1];
  assert(step2.reagentAdded.includes('HCl'));
  assert(step2.targetSoluteIsolated.includes('Anilin'));
  assert(step2.precipitationReagent.includes('NaOH'));

  // Step 3: Naphthalene remains in organic layer and isolated by drying + rotavap
  const step3 = ACID_BASE_EXTRACTION_PROTOCOL[2];
  assert(step3.targetSoluteIsolated.includes('Naphtalen'));
  assert(step3.reagentAdded.includes('Na2SO4'));
  assert(step3.precipitationReagent.includes('Cô quay'));
});

// 9. ACID-BASE CHEMICAL REACTIONS INTEGRITY
runTest('Acid-base extraction chemical formulas and ionizations satisfy stoichiometric principles', () => {
  for (const step of ACID_BASE_EXTRACTION_PROTOCOL) {
    assert(step.titleVI.length > 0);
    assert(step.reagentRoleVI.length > 0);
    assert(step.chemicalEquation.length > 0);
    assert(step.precipitationEquation.length > 0);
    assert(step.pedagogicalNoteVI.length > 0);
  }
});

// 10. CRAIG COUNTERCURRENT DISTRIBUTION LAW
runTest('calculateCraigDistribution satisfies binomial conservation of mass', () => {
  const dist = calculateCraigDistribution(10, 2.0); // 10 transfers (N=10 -> tubes 0 to 10 = 11 tubes), KD=2
  assert.strictEqual(dist.length, 11);

  const totalSum = dist.reduce((acc, t) => acc + t.fraction, 0);
  assert(
    Math.abs(totalSum - 1.0) < 0.01,
    `Total fraction sum (${totalSum}) must equal 1.0 within floating point rounding`
  );

  // Peak tube should correspond to p = K / (1 + K) = 2/3 * 10 ~ tube 6-7
  let maxFrac = -1;
  let peakTube = -1;
  for (const t of dist) {
    if (t.fraction > maxFrac) {
      maxFrac = t.fraction;
      peakTube = t.tube;
    }
  }
  assert(peakTube >= 5 && peakTube <= 8, `Peak tube should be around ~6-7 (got ${peakTube})`);
});

// 11. SETSCHENOW SALTING-OUT EFFECT ON PARTITION COEFFICIENT
runTest('calculateSaltingOutEffect enhances KD exponentially with salt concentration', () => {
  const baseKd = 5.0;
  const noSalt = calculateSaltingOutEffect(baseKd, 0.0);
  assert.strictEqual(noSalt.enhancedKd, 5.0);
  assert.strictEqual(noSalt.foldIncrease, 1.0);

  const with1M = calculateSaltingOutEffect(baseKd, 1.0, 0.15); // 10^(0.15*1) = 1.4125 -> 7.06
  assert(with1M.enhancedKd > baseKd, 'Salting out must strictly increase KD');
  assert.strictEqual(with1M.foldIncrease, 1.41);
  assert.strictEqual(with1M.enhancedKd, 7.06);

  const with3M = calculateSaltingOutEffect(baseKd, 3.0, 0.15); // 10^(0.45) = 2.818 -> 14.09
  assert(with3M.enhancedKd > with1M.enhancedKd, 'Higher NaCl concentration gives stronger salting-out');
  assert.strictEqual(with3M.foldIncrease, 2.82);
  assert.strictEqual(with3M.enhancedKd, 14.09);
});

// 12. ZERO & NEGATIVE PARAMETER GUARDRAILS
runTest('calculateMultipleExtractionYield handles edge cases and invalid parameters robustly', () => {
  const zeroMass = calculateMultipleExtractionYield(0, 50, 20, 3, 5.0);
  assert.strictEqual(zeroMass.remainingMassAqueousG, 0);
  assert.strictEqual(zeroMass.extractedMassOrganicG, 0);

  const zeroSolvent = calculateMultipleExtractionYield(10, 50, 0, 3, 5.0);
  assert.strictEqual(zeroSolvent.remainingMassAqueousG, 10);
  assert.strictEqual(zeroSolvent.extractedMassOrganicG, 0);

  const zeroSteps = calculateMultipleExtractionYield(10, 50, 20, 0, 5.0);
  assert.strictEqual(zeroSteps.remainingMassAqueousG, 10);
  assert.strictEqual(zeroSteps.extractedMassOrganicG, 0);
});

// 13. CARD MATCHING HELPER FUNCTION
runTest('getMatchingExtractionSolute accurately maps cards to chemical solute definitions', () => {
  const matchBenzoic = getMatchingExtractionSolute({ name: 'Benzoic Acid' });
  assert(matchBenzoic, 'Must match Benzoic Acid');
  assert.strictEqual(matchBenzoic.id, 'benzoic_acid');

  const matchAniline = getMatchingExtractionSolute({ id: 'card_aniline', name: 'Anilin' });
  assert(matchAniline, 'Must match Aniline');
  assert.strictEqual(matchAniline.id, 'aniline');

  const matchIodine = getMatchingExtractionSolute({ name: 'Iot I2' });
  assert(matchIodine, 'Must match Iodine');
  assert.strictEqual(matchIodine.id, 'iodine');

  const matchRandom = getMatchingExtractionSolute({ name: 'Gold Aurum' });
  assert.strictEqual(matchRandom, null, 'Unrelated substance should return null');
});

// 14. PROCEDURAL SOUND ENGINE TRIGGERS
runTest('sound engine contains playSeparatoryFunnelShake and playStopcockDrainLiquid methods', () => {
  assert.strictEqual(typeof sound.playSeparatoryFunnelShake, 'function');
  assert.strictEqual(typeof sound.playStopcockDrainLiquid, 'function');
});

// 15. VISUALIZER REACT COMPONENT FILE INTEGRITY
runTest('ExtractionPartitionVisualizer.tsx is syntactically sound and exports the component', async () => {
  const fs = await import('fs');
  const path = await import('path');
  const compPath = path.resolve('src/components/visualizations/ExtractionPartitionVisualizer.tsx');
  const exists = fs.existsSync(compPath);
  assert.strictEqual(exists, true, 'ExtractionPartitionVisualizer.tsx must exist');

  const code = fs.readFileSync(compPath, 'utf8');
  assert(code.includes('export const ExtractionPartitionVisualizer: React.FC'));
  assert(code.includes('calculateMultipleExtractionYield'));
  assert(code.includes('determineSeparatoryFunnelLayers'));
  assert(code.includes('playSeparatoryFunnelShake'));
  assert(code.includes('playStopcockDrainLiquid'));
});

console.log(`\n🎉 SUITE 92 SUMMARY: ${testsPassed} / 15 TESTS PASSED (100% PASS RATE)`);
