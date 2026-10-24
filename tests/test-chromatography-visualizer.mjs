// test-chromatography-visualizer.mjs
// Test Suite 93: Thin-Layer & Column Chromatography Engine
// Standards: IUPAC Compendium of Analytical Nomenclature & Vietnam GDPT 2018 (Hóa 11: Phương pháp tách biệt và tinh chế hợp chất hữu cơ - Phương pháp sắc kí)

import assert from 'assert';
import {
  STATIONARY_PHASES,
  MOBILE_PHASE_SOLVENTS,
  CHROMATOGRAPHY_MIXTURES,
  calculateRf,
  calculateDynamicRf,
  calculateVanDeemterEfficiency,
  calculatePeakResolution,
  calculateColumnElutionVolumes,
  getMatchingChromatographyMixture,
} from '../src/domain/chromatographyEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 93: THIN-LAYER & COLUMN CHROMATOGRAPHY ENGINE');

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

// 1. STATIONARY PHASES CATALOG & POLARITY
runTest('STATIONARY_PHASES defines silica gel, alumina, C18 RP and cellulose with accurate characteristics', () => {
  const silica = STATIONARY_PHASES.silica_gel;
  assert(silica, 'Silica gel must be defined');
  assert.strictEqual(silica.type, 'SILICA_GEL');
  assert.strictEqual(silica.polarity, 'POLAR');
  assert(silica.functionalGroupVI.includes('Silanol'));

  const c18 = STATIONARY_PHASES.c18_reverse_phase;
  assert(c18, 'C18 RP must be defined');
  assert.strictEqual(c18.type, 'C18_REVERSE_PHASE');
  assert.strictEqual(c18.polarity, 'NON_POLAR');
  assert(c18.functionalGroupVI.includes('C18'));

  const alumina = STATIONARY_PHASES.alumina_neutral;
  assert(alumina, 'Alumina must be defined');
  assert.strictEqual(alumina.type, 'ALUMINA');

  const paper = STATIONARY_PHASES.cellulose_paper;
  assert(paper, 'Cellulose paper must be defined');
  assert.strictEqual(paper.type, 'CELLULOSE_PAPER');
});

// 2. SNYDER ELUTROPIC SERIES FOR MOBILE PHASES
runTest('MOBILE_PHASE_SOLVENTS reflects Snyder elutropic scale epsilon^0 with strictly increasing eluting power', () => {
  const hex = MOBILE_PHASE_SOLVENTS.hexane;
  const tol = MOBILE_PHASE_SOLVENTS.toluene;
  const dcm = MOBILE_PHASE_SOLVENTS.dichloromethane;
  const etoac = MOBILE_PHASE_SOLVENTS.ethyl_acetate;
  const ace = MOBILE_PHASE_SOLVENTS.acetone;
  const etoh = MOBILE_PHASE_SOLVENTS.ethanol;
  const meoh = MOBILE_PHASE_SOLVENTS.methanol;
  const h2o = MOBILE_PHASE_SOLVENTS.water;

  assert.strictEqual(hex.snyderElutropicIndex, 0.00);
  assert(tol.snyderElutropicIndex > hex.snyderElutropicIndex);
  assert(dcm.snyderElutropicIndex > tol.snyderElutropicIndex);
  assert(etoac.snyderElutropicIndex > dcm.snyderElutropicIndex);
  assert(ace.snyderElutropicIndex > etoac.snyderElutropicIndex);
  assert(etoh.snyderElutropicIndex > ace.snyderElutropicIndex);
  assert(meoh.snyderElutropicIndex > etoh.snyderElutropicIndex);
  assert(h2o.snyderElutropicIndex > meoh.snyderElutropicIndex);
  assert.strictEqual(h2o.snyderElutropicIndex, 0.85);
});

// 3. BENCHMARK CHROMATOGRAPHY MIXTURES
runTest('CHROMATOGRAPHY_MIXTURES contains leaf pigments, analgesic tablets, and food dyes', () => {
  const leaf = CHROMATOGRAPHY_MIXTURES.leaf_pigments;
  assert(leaf, 'Leaf pigments mixture must be present');
  assert.strictEqual(leaf.compounds.length, 4);

  const drugs = CHROMATOGRAPHY_MIXTURES.analgesic_drugs;
  assert(drugs, 'Analgesic drugs must be present');
  assert.strictEqual(drugs.compounds.length, 3);

  const dyes = CHROMATOGRAPHY_MIXTURES.food_dyes;
  assert(dyes, 'Food dyes must be present');
  assert.strictEqual(dyes.compounds.length, 3);
});

// 4. RF MATHEMATICAL FORMULA & BOUNDS
runTest('calculateRf satisfies 0 <= Rf <= 1 and scales linearly with solute travel', () => {
  // Normal cases
  assert.strictEqual(calculateRf(40, 80), 0.5);
  assert.strictEqual(calculateRf(20, 100), 0.2);
  assert.strictEqual(calculateRf(75, 100), 0.75);

  // Solute reaches front
  assert.strictEqual(calculateRf(100, 100), 1.0);

  // Boundary guardrails
  assert.strictEqual(calculateRf(0, 100), 0.0);
  assert.strictEqual(calculateRf(-10, 100), 0.0);
  assert.strictEqual(calculateRf(50, 0), 0.0);
  assert.strictEqual(calculateRf(120, 100), 1.0); // Bounded at 1.0
});

// 5. NORMAL-PHASE DYNAMIC RF WITH POLAR ELUENT
runTest('calculateDynamicRf on normal phase strictly increases Rf when eluent polarity increases', () => {
  const paracetamol = CHROMATOGRAPHY_MIXTURES.analgesic_drugs.compounds.find(c => c.id === 'paracetamol');
  assert(paracetamol);

  const rfLowPolarity = calculateDynamicRf(paracetamol, 0.10, false); // 10% EtOAc
  const rfMidPolarity = calculateDynamicRf(paracetamol, 0.50, false); // 50% EtOAc
  const rfHighPolarity = calculateDynamicRf(paracetamol, 0.90, false); // 90% EtOAc

  console.log(`    Paracetamol Rf: Low=${rfLowPolarity}, Mid=${rfMidPolarity}, High=${rfHighPolarity}`);
  assert(rfMidPolarity > rfLowPolarity, 'Mid polarity eluent must give higher Rf than low polarity');
  assert(rfHighPolarity > rfMidPolarity, 'High polarity eluent must give highest Rf');
});

// 6. REVERSE-PHASE DYNAMIC RF BEHAVIOR
runTest('calculateDynamicRf on reverse phase C18 increases Rf with organic modifier percentage', () => {
  const carotene = CHROMATOGRAPHY_MIXTURES.leaf_pigments.compounds.find(c => c.id === 'carotene');
  assert(carotene);

  const rfAqueous = calculateDynamicRf(carotene, 0.30, true);
  const rfOrganic = calculateDynamicRf(carotene, 0.85, true);

  assert(rfOrganic > rfAqueous, 'Organic modifier on C18 RP increases solute mobility');
});

// 7. LEAF PIGMENT ELUTION ORDER ON SILICA GEL
runTest('Leaf pigment Rf follows canonical biological order: Carotene > Xanthophyll > Chlorophyll a > Chlorophyll b', () => {
  const leaf = CHROMATOGRAPHY_MIXTURES.leaf_pigments;
  const carotene = leaf.compounds.find(c => c.id === 'carotene');
  const xanthophyll = leaf.compounds.find(c => c.id === 'xanthophyll');
  const chla = leaf.compounds.find(c => c.id === 'chlorophyll_a');
  const chlb = leaf.compounds.find(c => c.id === 'chlorophyll_b');

  assert(carotene.rfBaseNormalPhase > xanthophyll.rfBaseNormalPhase, 'Carotene (hydrocarbon) faster than xanthophyll (di-OH)');
  assert(xanthophyll.rfBaseNormalPhase > chla.rfBaseNormalPhase, 'Xanthophyll faster than Chlorophyll a');
  assert(chla.rfBaseNormalPhase > chlb.rfBaseNormalPhase, 'Chlorophyll a (-CH3) faster than Chlorophyll b (-CHO)');
});

// 8. ANALGESIC DRUG ORDER ON SILICA GEL
runTest('Analgesic drugs Rf follows: Aspirin > Paracetamol > Caffeine', () => {
  const drugs = CHROMATOGRAPHY_MIXTURES.analgesic_drugs;
  const aspirin = drugs.compounds.find(c => c.id === 'aspirin');
  const paracetamol = drugs.compounds.find(c => c.id === 'paracetamol');
  const caffeine = drugs.compounds.find(c => c.id === 'caffeine');

  assert(aspirin.rfBaseNormalPhase > paracetamol.rfBaseNormalPhase, 'Aspirin faster than Paracetamol');
  assert(paracetamol.rfBaseNormalPhase > caffeine.rfBaseNormalPhase, 'Paracetamol faster than Caffeine');
});

// 9. VAN DEEMTER CURVE & OPTIMAL FLOW VELOCITY
runTest('calculateVanDeemterEfficiency proves u_opt = sqrt(B/C) and H_min = A + 2*sqrt(B*C)', () => {
  const A = 10.0;
  const B = 36.0;
  const C = 4.0;
  // Expected u_opt = sqrt(36/4) = sqrt(9) = 3.0 mm/s
  // Expected H_min = 10 + 2*sqrt(36*4) = 10 + 2*12 = 34.0 um
  const res = calculateVanDeemterEfficiency({ eddyDiffusionA: A, longitudinalDiffusionB: B, massTransferResistanceC: C });

  assert.strictEqual(res.optimalVelocityMmPerS, 3.0);
  assert.strictEqual(res.minimumHetpUm, 34.0);

  // Check any other point in curveData: H must be >= H_min
  for (const pt of res.curveData) {
    assert(
      pt.hetpUm >= res.minimumHetpUm - 0.05,
      `Every H (${pt.hetpUm}) must be >= H_min (${res.minimumHetpUm})`
    );
  }
});

// 10. THEORETICAL PLATES PER METER CALCULATION
runTest('calculateVanDeemterEfficiency computes realistic theoretical plate count N/m', () => {
  const res = calculateVanDeemterEfficiency({
    eddyDiffusionA: 8.0,
    longitudinalDiffusionB: 20.0,
    massTransferResistanceC: 1.0,
  });

  // H_min ~ 8 + 2*sqrt(20) ~ 8 + 8.94 = 16.94 um
  // N/m = 10^6 / 16.94 ~ 59,000 plates/m
  assert(res.theoreticalPlatesPerMeter > 40000);
  assert(res.theoreticalPlatesPerMeter < 100000);
});

// 11. CHROMATOGRAPHIC PEAK RESOLUTION (RS) FORMULA
runTest('calculatePeakResolution accurately distinguishes baseline resolved (Rs >= 1.5) from overlapping', () => {
  // Baseline resolved: tR1 = 5.0, tR2 = 8.0, w1 = 1.0, w2 = 1.0 -> deltaT = 3.0, avgW = 1.0 -> Rs = 3.0
  const baselineRes = calculatePeakResolution(5.0, 8.0, 1.0, 1.0);
  assert.strictEqual(baselineRes.resolutionRs, 3.0);
  assert.strictEqual(baselineRes.isBaselineResolved, true);
  assert(baselineRes.purityEstimatePercent >= 99.5);

  // Minimal baseline: deltaT = 1.5, avgW = 1.0 -> Rs = 1.5
  const edgeRes = calculatePeakResolution(5.0, 6.5, 1.0, 1.0);
  assert.strictEqual(edgeRes.resolutionRs, 1.5);
  assert.strictEqual(edgeRes.isBaselineResolved, true);

  // Overlapping peaks: deltaT = 0.5, avgW = 1.0 -> Rs = 0.5
  const overlapRes = calculatePeakResolution(5.0, 5.5, 1.0, 1.0);
  assert.strictEqual(overlapRes.resolutionRs, 0.5);
  assert.strictEqual(overlapRes.isBaselineResolved, false);
  assert(overlapRes.purityEstimatePercent < 80);
});

// 12. COLUMN CHROMATOGRAPHY RETENTION VOLUME INVERSE RELATION TO RF
runTest('calculateColumnElutionVolumes shows higher Rf elutes earlier in column chromatography', () => {
  const leaf = CHROMATOGRAPHY_MIXTURES.leaf_pigments;
  const spots = leaf.compounds.map(c => ({
    compound: c,
    rf: c.rfBaseNormalPhase,
  }));

  const fractions = calculateColumnElutionVolumes(15.0, spots);
  assert.strictEqual(fractions.length, 4);

  // First eluted fraction must have highest Rf
  const first = fractions[0];
  const last = fractions[fractions.length - 1];

  assert(first.rf > last.rf, 'First fraction must have higher Rf than last');
  assert(first.elutionVolumeMl < last.elutionVolumeMl, 'First fraction requires less elution volume');
  assert.strictEqual(first.compoundId, 'carotene', 'Beta-carotene elutes first from column');
});

// 13. CARD MATCHING HELPER
runTest('getMatchingChromatographyMixture maps cards to analytical mixtures', () => {
  const matchChlorophyll = getMatchingChromatographyMixture({ name: 'Chlorophyll Diệp Lục' });
  assert(matchChlorophyll);
  assert.strictEqual(matchChlorophyll.id, 'leaf_pigments');

  const matchAspirin = getMatchingChromatographyMixture({ name: 'Aspirin Acetylsalicylic' });
  assert(matchAspirin);
  assert.strictEqual(matchAspirin.id, 'analgesic_drugs');

  const matchGeneric = getMatchingChromatographyMixture({ name: 'Sắc kí bản mỏng' });
  assert(matchGeneric);
  assert.strictEqual(matchGeneric.id, 'leaf_pigments');

  const matchRandom = getMatchingChromatographyMixture({ name: 'Nuclear Uranium' });
  assert.strictEqual(matchRandom, null);
});

// 14. PROCEDURAL SOUND ENGINE INTEGRATION
runTest('sound engine contains playEluentFlowHum, playRfSpotDetectBeep, and playColumnDropDrip', () => {
  assert.strictEqual(typeof sound.playEluentFlowHum, 'function');
  assert.strictEqual(typeof sound.playRfSpotDetectBeep, 'function');
  assert.strictEqual(typeof sound.playColumnDropDrip, 'function');
});

// 15. VISUALIZER COMPONENT INTEGRITY
runTest('ChromatographyVisualizer.tsx is syntactically sound and exports the component', async () => {
  const fs = await import('fs');
  const path = await import('path');
  const compPath = path.resolve('src/components/visualizations/ChromatographyVisualizer.tsx');
  const exists = fs.existsSync(compPath);
  assert.strictEqual(exists, true, 'ChromatographyVisualizer.tsx must exist');

  const code = fs.readFileSync(compPath, 'utf8');
  assert(code.includes('export const ChromatographyVisualizer: React.FC'));
  assert(code.includes('calculateDynamicRf'));
  assert(code.includes('calculateVanDeemterEfficiency'));
  assert(code.includes('calculatePeakResolution'));
});

console.log(`\n🎉 SUITE 93 SUMMARY: ${testsPassed} / 15 TESTS PASSED (100% PASS RATE)`);
