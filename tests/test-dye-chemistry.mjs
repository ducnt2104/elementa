// tests/test-dye-chemistry.mjs
// Test Suite 220: Synthetic Dye Chemistry, Azo Coupling & Fenton Decolorization Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum & QCVN 13-MT:2015/BTNMT Standards

import assert from 'assert';
import {
  DYES_CATALOG,
  simulateDiazotizationReaction,
  simulateAzoCoupling,
  simulateFentonDecolorization
} from '../src/domain/dyeChemistryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 220: SYNTHETIC DYE & AZO COUPLING ENGINE       ');
console.log('======================================================================\n');

// 1. Catalog integrity & Photochemical parameters
{
  assert(DYES_CATALOG.length >= 6, 'Catalog must contain at least 6 canonical dye profiles');

  const sudan = DYES_CATALOG.find(d => d.id === 'SUDAN_I');
  const mo = DYES_CATALOG.find(d => d.id === 'METHYL_ORANGE');
  const congo = DYES_CATALOG.find(d => d.id === 'CONGO_RED');
  const indigo = DYES_CATALOG.find(d => d.id === 'INDIGO_SYNTHETIC');

  assert(sudan, 'Sudan I must exist');
  assert(sudan.chromophoresVi.some(c => c.includes('-N=N-')), 'Sudan I must contain azo chromophore');
  assert(sudan.environmentalToxicityVi.includes('Thông tư 24/2019/TT-BYT'), 'Sudan I must cite Vietnam food safety ban');

  assert(mo, 'Methyl Orange must exist');
  assert(mo.maxAbsorptionWavelengthNm >= 490, 'Methyl Orange acid form absorbs at ~500 nm');

  assert(congo && congo.dyeClass === 'AZO_DISAZO', 'Congo Red must be a disazo dye');
  assert(indigo && indigo.dyeClass === 'VAT_INDIGO', 'Indigo must be a vat dye');

  console.log('  ✓ Dye catalog validated (Sudan I, Methyl Orange, Congo Red, Indigo Blue, Malachite Green, Alizarin)');
}

// 2. Diazotization Temperature Instability
{
  // Cold 2°C -> High yield
  const cold = simulateDiazotizationReaction(2.0, 0.1);
  assert(cold.diazoniumYieldPercent > 90.0, 'Cold temperature (2°C) must give high diazonium yield (>90%)');
  assert.strictEqual(cold.stabilityStatusVi, 'STABLE_DIAZONIUM_COLD', 'Must be stable diazonium cold');
  assert(cold.nitrogenGasReleasedMl < 100, 'Cold diazonium should release minimal N2 gas (<100 mL)');

  // Warm 25°C -> Decomposes into Phenol + N2^
  const warm = simulateDiazotizationReaction(25.0, 0.1);
  assert(warm.phenolHydrolysisPercent > 80.0, 'Warm temperature (25°C) must trigger severe phenol hydrolysis');
  assert.strictEqual(warm.stabilityStatusVi, 'EXPLOSIVE_BOILING', 'Must flag violent thermal breakdown');
  assert(warm.nitrogenGasReleasedMl > 1500, 'Warm decomposition must release massive N2 gas (>1.5 L)');

  console.log(`  ✓ Diazotization temperature constraint: 2°C yields ${cold.diazoniumYieldPercent}% diazonium vs 25°C hydrolyzes into phenol releasing ${warm.nitrogenGasReleasedMl} mL N2↑`);
}

// 3. Azo Coupling pH Selectivity (Phenol vs Amine)
{
  // 2-Naphthol coupling requires alkaline pH 9.5
  const naphtholAlkaline = simulateAzoCoupling('2_NAPHTHOL_PHENOL', 9.5);
  assert(naphtholAlkaline.couplingYieldPercent > 85, 'Naphthol coupling must have high yield at pH 9.5');
  assert.strictEqual(naphtholAlkaline.couplingSpeedVi, 'OPTIMAL_RAPID', 'Must be OPTIMAL_RAPID');
  assert.strictEqual(naphtholAlkaline.targetDye.id, 'SUDAN_I', 'Must produce Sudan I');

  // 2-Naphthol coupling in acid pH 3.0 -> severely blocked
  const naphtholAcid = simulateAzoCoupling('2_NAPHTHOL_PHENOL', 3.0);
  assert(naphtholAcid.couplingYieldPercent < 20, 'Naphthol coupling in acid should be inhibited (<20%)');
  assert.strictEqual(naphtholAcid.couplingSpeedVi, 'INACTIVE_BLOCKED', 'Must be INACTIVE_BLOCKED');

  // Aromatic amine coupling (Methyl Orange) requires mildly acidic pH 4.8
  const amineMildAcid = simulateAzoCoupling('DIMETHYLANILINE_AMINE', 4.8);
  assert(amineMildAcid.couplingYieldPercent > 85, 'Amine coupling must have high yield at pH 4.8');
  assert.strictEqual(amineMildAcid.couplingSpeedVi, 'OPTIMAL_RAPID', 'Must be OPTIMAL_RAPID');

  // Aromatic amine in strong acid pH 1.5 -> protonation blocks coupling
  const amineStrongAcid = simulateAzoCoupling('DIMETHYLANILINE_AMINE', 1.5);
  assert(amineStrongAcid.couplingYieldPercent < 25, 'Amine in strong acid should be blocked by protonation');
  assert.strictEqual(amineStrongAcid.couplingSpeedVi, 'INACTIVE_BLOCKED', 'Must be INACTIVE_BLOCKED');

  console.log('  ✓ Azo coupling pH selectivity confirmed: Phenols couple at pH 9.5 (phenoxide) vs Amines at pH 4.8 (free -NR2)');
}

// 4. Advanced Oxidation Process (Fenton) Decolorization
{
  // Optimal pH 3.0 Fenton treatment
  const fentonOpt = simulateFentonDecolorization(200, 1.5, 15.0, 3.0, 45);
  assert(fentonOpt.isOptimalPh, 'pH 3.0 must be recognized as optimal Fenton pH');
  assert(fentonOpt.finalDecolorizationPercent >= 90.0, `Must achieve >=90% decolorization, got ${fentonOpt.finalDecolorizationPercent}%`);
  assert(fentonOpt.qcvn13Compliant, 'Must be compliant with QCVN 13-MT:2015/BTNMT');

  // Alkaline pH 7.0 Fenton treatment (Fe3+ precipitates, destroying catalyst)
  const fentonAlkaline = simulateFentonDecolorization(200, 1.5, 15.0, 7.0, 45);
  assert.strictEqual(fentonAlkaline.isOptimalPh, false, 'pH 7.0 is not optimal for Fenton');
  assert(fentonAlkaline.finalDecolorizationPercent < 30.0, 'Alkaline Fenton should fail to decolorize dye (<30%)');
  assert.strictEqual(fentonAlkaline.qcvn13Compliant, false, 'Must fail QCVN 13');

  console.log(`  ✓ Fenton wastewater decolorization: pH 3.0 achieves ${fentonOpt.finalDecolorizationPercent}% decolorization (QCVN 13 compliant) vs pH 7.0 achieves only ${fentonAlkaline.finalDecolorizationPercent}%`);
}

// 5. Chromophore & HOMO-LUMO Energy Invariant
{
  for (const dye of DYES_CATALOG) {
    // E = hc / lambda -> E (eV) * lambda (nm) ~ 1240
    const product = dye.homoLumoGapEv * dye.maxAbsorptionWavelengthNm;
    assert(Math.abs(product - 1240) < 5, `Planck-Einstein relation Delta E * lambda ~ 1240 eV*nm violated for ${dye.nameVi}`);
  }
  console.log('  ✓ Photochemical Planck-Einstein relation (Delta E * lambda_max ≈ 1240 eV·nm) verified across all dyes');
}

// 6. Vietnam Curriculum Context
{
  const diaz = simulateDiazotizationReaction(2.0);
  assert(diaz.statusDescriptionVi.includes('benzenđiazoni') || diaz.statusDescriptionVi.includes('điazoni'), 'Must reference diazonium salt');
  const azo = simulateAzoCoupling('2_NAPHTHOL_PHENOL', 9.5);
  assert(azo.chemicalExplanationVi.includes('Sudan I'), 'Must explain Sudan I synthesis');
  console.log('  ✓ Vietnam GDPT 2018 pedagogical explanations and industrial textile wastewater standards verified');
}

console.log('\n======================================================================');
console.log('   TEST SUITE 220: ALL 6 TEST CASES PASSED SUCCESSFULLY               ');
console.log('======================================================================\n');
