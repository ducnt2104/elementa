// test-solubility-precipitation-visualizer.mjs
// Test Suite 78: Solubility Product Constant (K_sp), Precipitation Equilibrium, Fractional Precipitation & Amphoteric Re-dissolution
// Strictly audited against Vietnam GDPT 2018 Chemistry & IUPAC Physical Chemistry

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {
  CURRICULUM_SPARINGLY_SOLUBLE_SALTS,
  SolubilityEngine
} from './src/domain/solubilityEngine.ts';

console.log('======================================================================');
console.log('   TEST SUITE 78: SOLUBILITY PRODUCT (K_sp) & PRECIPITATION DYNAMICS');
console.log('======================================================================\n');

let passCount = 0;
let failCount = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  [PASS] ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  [FAIL] ${desc}`);
    console.error(`         ${err.stack || err.message}`);
    failCount++;
  }
}

// ============================================================================
// 1. CURRICULUM SPARINGLY SOLUBLE SALTS & IUPAC K_sp VALUES
// ============================================================================
console.log('--- 1. CURRICULUM SALTS & IUPAC K_sp VALUES ---');

it('defines all 9 core sparingly soluble salts with stoichiometries and K_sp values', () => {
  assert.strictEqual(CURRICULUM_SPARINGLY_SOLUBLE_SALTS.length, 9);
  const formulas = CURRICULUM_SPARINGLY_SOLUBLE_SALTS.map(s => s.formula);
  assert.ok(formulas.includes('AgCl'));
  assert.ok(formulas.includes('AgBr'));
  assert.ok(formulas.includes('AgI'));
  assert.ok(formulas.includes('BaSO₄'));
  assert.ok(formulas.includes('CaCO₃'));
  assert.ok(formulas.includes('Al(OH)₃'));
  assert.ok(formulas.includes('Zn(OH)₂'));
  assert.ok(formulas.includes('Fe(OH)₃'));
  assert.ok(formulas.includes('PbI₂'));
});

it('verifies amphoteric property flags conform strictly to GDPT 2018', () => {
  const al = SolubilityEngine.getSalt('Al(OH)3');
  assert.ok(al);
  assert.strictEqual(al.isAmphoteric, true);
  assert.strictEqual(al.amphotericComplexFormula, '[Al(OH)₄]⁻');

  const zn = SolubilityEngine.getSalt('Zn(OH)2');
  assert.ok(zn);
  assert.strictEqual(zn.isAmphoteric, true);
  assert.strictEqual(zn.canDissolveInAmmonia, true);
  assert.strictEqual(zn.ammoniaComplexFormula, '[Zn(NH₃)₄]²⁺');

  const ba = SolubilityEngine.getSalt('BaSO4');
  assert.ok(ba);
  assert.strictEqual(ba.isAmphoteric, false);
  assert.strictEqual(ba.canDissolveInAmmonia, false);

  const agi = SolubilityEngine.getSalt('AgI');
  assert.ok(agi);
  assert.strictEqual(agi.canDissolveInAmmonia, false);

  const agcl = SolubilityEngine.getSalt('AgCl');
  assert.ok(agcl);
  assert.strictEqual(agcl.canDissolveInAmmonia, true);
});

// ============================================================================
// 2. MOLAR SOLUBILITY (s) IN PURE WATER
// ============================================================================
console.log('--- 2. MOLAR SOLUBILITY IN PURE WATER ---');

it('computes exact molar solubility for 1:1 salts (AgCl, BaSO4, CaCO3)', () => {
  const agcl = SolubilityEngine.getSalt('AgCl');
  const resAgCl = SolubilityEngine.calculateSolubilityInPureWater(agcl);
  // s = sqrt(1.77e-10) ≈ 1.33e-5 M
  assert.ok(Math.abs(resAgCl.molarSolubilityM - 1.3304e-5) < 1e-7);
  assert.ok(Math.abs(resAgCl.massSolubilityMgPerL - 1.907) < 0.05);

  const baso4 = SolubilityEngine.getSalt('BaSO4');
  const resBa = SolubilityEngine.calculateSolubilityInPureWater(baso4);
  // s = sqrt(1.08e-10) ≈ 1.039e-5 M
  assert.ok(Math.abs(resBa.molarSolubilityM - 1.0392e-5) < 1e-7);
  assert.ok(Math.abs(resBa.massSolubilityMgPerL - 2.425) < 0.05);

  const caco3 = SolubilityEngine.getSalt('CaCO3');
  const resCa = SolubilityEngine.calculateSolubilityInPureWater(caco3);
  // s = sqrt(3.36e-9) ≈ 5.796e-5 M
  assert.ok(Math.abs(resCa.molarSolubilityM - 5.7965e-5) < 1e-7);
});

it('computes molar solubility for 1:2 salt PbI2 (s = (K_sp / 4)^(1/3))', () => {
  const pbi2 = SolubilityEngine.getSalt('PbI2');
  const res = SolubilityEngine.calculateSolubilityInPureWater(pbi2);
  // s = (9.80e-9 / 4)^(1/3) ≈ 1.348e-3 M
  assert.ok(Math.abs(res.molarSolubilityM - 1.348e-3) < 1e-5);
  assert.ok(res.cationEquilibriumM === res.molarSolubilityM);
  assert.ok(res.anionEquilibriumM === 2 * res.molarSolubilityM);
});

it('computes molar solubility for 1:3 salt Fe(OH)3 (s = (K_sp / 27)^(1/4))', () => {
  const fe = SolubilityEngine.getSalt('Fe(OH)3');
  const res = SolubilityEngine.calculateSolubilityInPureWater(fe);
  // s = (2.79e-39 / 27)^(1/4) ≈ 1.008e-10 M
  assert.ok(Math.abs(res.molarSolubilityM - 1.008e-10) < 1e-12);
  assert.ok(res.molarSolubilityM < 1e-9, 'Fe(OH)3 must be extremely insoluble');
});

// ============================================================================
// 3. COMMON-ION EFFECT (HIỆU ỨNG ION CHUNG)
// ============================================================================
console.log('--- 3. COMMON-ION EFFECT (LE CHATELIER) ---');

it('demonstrates drastic solubility suppression when common ion is added', () => {
  const agcl = SolubilityEngine.getSalt('AgCl');
  const pureWaterS = SolubilityEngine.calculateSolubilityInPureWater(agcl).molarSolubilityM;

  // In 0.1 M NaCl (common ion Cl-)
  const resCommon = SolubilityEngine.calculateSolubilityWithCommonIon(agcl, 'ANION', 0.1);
  // s = K_sp / 0.1 = 1.77e-9 M
  assert.ok(Math.abs(resCommon.molarSolubilityM - 1.77e-9) < 1e-11);
  assert.ok(
    resCommon.suppressionRatio > 7000,
    `Solubility should decrease by > 7000 times, got ${resCommon.suppressionRatio}`
  );
  assert.ok(resCommon.molarSolubilityM < pureWaterS);
});

it('suppresses BaSO4 solubility in presence of 0.2 M Na2SO4', () => {
  const baso4 = SolubilityEngine.getSalt('BaSO4');
  const resCommon = SolubilityEngine.calculateSolubilityWithCommonIon(baso4, 'ANION', 0.2);
  // s = 1.08e-10 / 0.2 = 5.4e-10 M
  assert.ok(Math.abs(resCommon.molarSolubilityM - 5.4e-10) < 1e-12);
  assert.ok(resCommon.suppressionRatio > 18000);
});

// ============================================================================
// 4. PRECIPITATION CONDITION (Q_sp vs K_sp)
// ============================================================================
console.log('--- 4. PRECIPITATION CONDITION (Q_sp vs K_sp) ---');

it('correctly identifies UNSATURATED solution when Q_sp < K_sp', () => {
  const agcl = SolubilityEngine.getSalt('AgCl');
  // [Ag+] = 1e-6 M, [Cl-] = 1e-6 M => Q_sp = 1e-12 < 1.77e-10
  const cond = SolubilityEngine.evaluatePrecipitationCondition(agcl, 1e-6, 1e-6, 0.1);
  assert.strictEqual(cond.state, 'UNSATURATED');
  assert.strictEqual(cond.precipitateMassMg, 0);
  assert.strictEqual(cond.percentPrecipitated, 0);
  assert.ok(cond.logRatio < 0);
});

it('correctly identifies SUPERSATURATED solution and calculates precipitate mass', () => {
  const agcl = SolubilityEngine.getSalt('AgCl');
  // [Ag+] = 0.05 M, [Cl-] = 0.05 M in 0.1 L (5 mmol each)
  const cond = SolubilityEngine.evaluatePrecipitationCondition(agcl, 0.05, 0.05, 0.1);
  assert.strictEqual(cond.state, 'SUPERSATURATED');
  assert.ok(cond.qSp > cond.kSp);
  assert.ok(cond.logRatio > 6.0);
  // 5 mmol * 143.32 g/mol ≈ 716.6 mg
  assert.ok(Math.abs(cond.precipitateMassMg - 716.6) < 2.0);
  assert.ok(cond.percentPrecipitated > 99.0);
});

// ============================================================================
// 5. FRACTIONAL PRECIPITATION DYNAMICS (AgI -> AgBr -> AgCl)
// ============================================================================
console.log('--- 5. FRACTIONAL PRECIPITATION DYNAMICS ---');

it('precipitates AgI first when small amount of Ag+ is added to mixed halides', () => {
  // 0.1 L of 0.02 M Cl-, 0.02 M Br-, 0.02 M I- (2.0 mmol each)
  // Add 1.0 mmol of Ag+
  const res = SolubilityEngine.simulateFractionalPrecipitation(
    { Cl_M: 0.02, Br_M: 0.02, I_M: 0.02 },
    0.001, // 1 mmol
    0.1
  );

  assert.strictEqual(res.activePrecipitatingIon, 'I⁻');
  const pptI = res.precipitatedPhases.find(p => p.halide === 'I');
  const pptBr = res.precipitatedPhases.find(p => p.halide === 'Br');
  const pptCl = res.precipitatedPhases.find(p => p.halide === 'Cl');

  assert.ok(pptI && pptI.precipitatedMoles > 0);
  assert.strictEqual(pptBr.precipitatedMoles, 0, 'AgBr must not precipitate yet');
  assert.strictEqual(pptCl.precipitatedMoles, 0, 'AgCl must not precipitate yet');
});

it('precipitates AgBr second only after >99.9% of I- is exhausted', () => {
  // Add 3.0 mmol of Ag+ (enough to consume 2.0 mmol of I- and 1.0 mmol of Br-)
  const res = SolubilityEngine.simulateFractionalPrecipitation(
    { Cl_M: 0.02, Br_M: 0.02, I_M: 0.02 },
    0.003, // 3 mmol
    0.1
  );

  assert.strictEqual(res.activePrecipitatingIon, 'Br⁻');
  const pptI = res.precipitatedPhases.find(p => p.halide === 'I');
  const pptBr = res.precipitatedPhases.find(p => p.halide === 'Br');
  const pptCl = res.precipitatedPhases.find(p => p.halide === 'Cl');

  assert.strictEqual(pptI.precipitatedMoles, 0.002, 'All 2 mmol I- precipitated as AgI');
  assert.strictEqual(pptBr.precipitatedMoles, 0.001, '1 mmol Br- precipitated as AgBr');
  assert.strictEqual(pptCl.precipitatedMoles, 0, 'AgCl still 0 mmol precipitated');
});

it('precipitates AgCl last when Ag+ exceeds combined moles of I- and Br-', () => {
  // Add 5.0 mmol of Ag+ (consumes 2 mmol I-, 2 mmol Br-, and 1 mmol Cl-)
  const res = SolubilityEngine.simulateFractionalPrecipitation(
    { Cl_M: 0.02, Br_M: 0.02, I_M: 0.02 },
    0.005, // 5 mmol
    0.1
  );

  assert.strictEqual(res.activePrecipitatingIon, 'Cl⁻');
  const pptCl = res.precipitatedPhases.find(p => p.halide === 'Cl');
  assert.strictEqual(pptCl.precipitatedMoles, 0.001);
});

// ============================================================================
// 6. AMPHOTERIC HYDROXIDE RE-DISSOLUTION (Al(OH)3 & Zn(OH)2)
// ============================================================================
console.log('--- 6. AMPHOTERIC HYDROXIDE RE-DISSOLUTION ---');

it('demonstrates bell-curve precipitation and complete re-dissolution of Al(OH)3', () => {
  // Initial Al3+ = 0.05 M in 0.1 L (5 mmol)
  // Peak precipitate requires 3 OH- per Al3+ (15 mmol OH- in 0.1 L => 0.15 M OH-)
  const peak = SolubilityEngine.simulateAmphotericDissolution('ALUMINUM', 0.05, 0.15, 0.1);
  assert.strictEqual(peak.isPrecipitatePresent, true);
  // 5 mmol * 78 g/mol = 390 mg
  assert.strictEqual(peak.precipitateMassMg, 390.0);
  assert.strictEqual(peak.complexMoles, 0);

  // Excess OH- (0.25 M OH- in 0.1 L = 25 mmol OH- => ratio = 5.0 >= 4.0)
  const dissolved = SolubilityEngine.simulateAmphotericDissolution('ALUMINUM', 0.05, 0.25, 0.1);
  assert.strictEqual(dissolved.isPrecipitatePresent, false, 'Precipitate must be 100% dissolved');
  assert.strictEqual(dissolved.precipitateMassMg, 0);
  assert.ok(Math.abs(dissolved.complexMoles - 0.005) < 1e-6);
  assert.strictEqual(dissolved.stageStateVI, 'Tan hoàn toàn thành dung dịch trong suốt');
});

it('re-dissolves Zn(OH)2 in excess OH- into tetrahydroxidozincate [Zn(OH)4]2-', () => {
  const dissolvedZn = SolubilityEngine.simulateAmphotericDissolution('ZINC', 0.05, 0.25, 0.1);
  assert.strictEqual(dissolvedZn.isPrecipitatePresent, false);
  assert.ok(Math.abs(dissolvedZn.complexMoles - 0.005) < 1e-6);
});

// ============================================================================
// 7. UNIVERSAL APP INTEGRATION VERIFICATION
// ============================================================================
console.log('--- 7. UNIVERSAL APP INTEGRATION VERIFICATION ---');

it('integrates SolubilityPrecipitationVisualizer into PeriodicCodexTab as Section 10', () => {
  const codexPath = path.resolve('src/components/PeriodicCodexTab.tsx');
  const code = fs.readFileSync(codexPath, 'utf8');
  assert.ok(code.includes("import { SolubilityPrecipitationVisualizer } from './visualizations/SolubilityPrecipitationVisualizer'"));
  assert.ok(code.includes("'SOLUBILITY_PRECIPITATION'"));
  assert.ok(code.includes('SECTION 10: SOLUBILITY PRODUCT'));
  assert.ok(code.includes('<SolubilityPrecipitationVisualizer />'));
});

it('integrates solubility into CardDetailModal with matchingSalt detector and modal overlay', () => {
  const cardModalPath = path.resolve('src/components/cards/CardDetailModal.tsx');
  const code = fs.readFileSync(cardModalPath, 'utf8');
  assert.ok(code.includes("import { SolubilityPrecipitationVisualizer } from '../visualizations/SolubilityPrecipitationVisualizer'"));
  assert.ok(code.includes('matchingSalt'));
  assert.ok(code.includes('showSolubilityModal'));
  assert.ok(code.includes('Tích số tan (K_sp)'));
  assert.ok(code.includes('<SolubilityPrecipitationVisualizer initialSaltId={matchingSalt.id} />'));
});

it('provides procedural Web Audio synthesis methods in SoundEngine', () => {
  const soundEnginePath = path.resolve('src/audio/soundEngine.ts');
  const code = fs.readFileSync(soundEnginePath, 'utf8');
  assert.ok(code.includes('playPrecipitationNucleation'));
  assert.ok(code.includes('playAmphotericDissolution'));
});

// ============================================================================
// SUMMARY REPORT
// ============================================================================
console.log('\n======================================================================');
console.log(`   SUITE 78 COMPLETE: ${passCount} PASSED, ${failCount} FAILED (TOTAL: ${passCount + failCount})`);
console.log('======================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
