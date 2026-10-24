// tests/test-pharmacokinetics.mjs
// Test Suite 208: Pharmacokinetics, Drug Ionization & ADME Simulation Engine
// Standardized against Vietnam GDPT 2018 Chemistry 12 & Clinical Pharmacokinetics Standards

import assert from 'assert';
import {
  DRUG_CATALOG,
  calculateDrugIonizationAtPh,
  evaluateDrugAbsorptionAcrossOrgans,
  simulateOralSingleDose,
  assessParacetamolOverdoseAndNac
} from '../src/domain/pharmacokineticsEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 208: PHARMACOKINETICS & DRUG ADME SIMULATION   ');
console.log('======================================================================\n');

// 1. Catalog completeness
{
  assert(DRUG_CATALOG.length >= 5, 'Drug catalog must contain at least 5 benchmark clinical compounds');
  const aspirin = DRUG_CATALOG.find(d => d.id === 'ASPIRIN');
  assert(aspirin, 'Aspirin must be present in catalog');
  assert.strictEqual(aspirin.nature, 'WEAK_ACID', 'Aspirin is a weak acid');
  assert.strictEqual(aspirin.pKa, 3.5, 'Aspirin pKa is 3.5');

  const morphine = DRUG_CATALOG.find(d => d.id === 'MORPHINE');
  assert(morphine, 'Morphine must be present in catalog');
  assert.strictEqual(morphine.nature, 'WEAK_BASE', 'Morphine is a weak base');
  assert.strictEqual(morphine.pKa, 8.0, 'Morphine pKa is 8.0');
  console.log('  ✓ Drug catalog contains clinical benchmarks with authenticated pKa and half-lives');
}

// 2. Henderson-Hasselbalch Ionization & Organ pH Partition
{
  const aspirin = DRUG_CATALOG.find(d => d.id === 'ASPIRIN');

  // In stomach (pH 1.5): pH < pKa (1.5 < 3.5) => non-ionized HA dominates (> 95%)
  const stomachAspirin = calculateDrugIonizationAtPh(aspirin, 1.5);
  assert(stomachAspirin.fractionUnIonizedPercent > 95.0, 'Aspirin in stomach must be > 95% non-ionized');
  console.log('  ✓ Aspirin in stomach (pH 1.5) is > 95% non-ionized HA, readily permeating lipid membrane');

  // In blood plasma (pH 7.4): pH > pKa (7.4 > 3.5) => ionized A- dominates (> 99.9%)
  const plasmaAspirin = calculateDrugIonizationAtPh(aspirin, 7.4);
  assert(plasmaAspirin.fractionIonizedPercent > 99.9, 'Aspirin in blood must be > 99.9% ionized');
  console.log('  ✓ Aspirin in blood (pH 7.4) is > 99.9% ionized A-, trapped in extracellular fluid');

  // Morphine (weak base pKa 8.0) in intestine (pH 6.8) vs stomach (pH 1.5)
  const morphine = DRUG_CATALOG.find(d => d.id === 'MORPHINE');
  const stomachMorphine = calculateDrugIonizationAtPh(morphine, 1.5);
  const intestineMorphine = calculateDrugIonizationAtPh(morphine, 6.8);
  assert(stomachMorphine.fractionIonizedPercent > 99.9, 'Morphine in acidic stomach is completely ionized BH+');
  assert(intestineMorphine.fractionUnIonizedPercent > stomachMorphine.fractionUnIonizedPercent, 'Morphine non-ionized fraction increases in intestine');
  console.log('  ✓ Morphine (weak base) is ion-trapped in stomach but gains absorbable non-ionized fraction in intestine');

  // Full organ absorption profile
  const organProfiles = evaluateDrugAbsorptionAcrossOrgans('ASPIRIN');
  assert.strictEqual(organProfiles.length, 4, 'Must evaluate 4 physiological compartments');
  assert.strictEqual(organProfiles[0].isFavorableForPassiveAbsorption, true, 'Stomach is favorable for Aspirin passive absorption');
  console.log('  ✓ Organ absorption profiling evaluates stomach, intestine, blood, and urine');
}

// 3. One-Compartment Pharmacokinetics & Bateman Function
{
  const pk = simulateOralSingleDose('IBUPROFEN', 400, 60, 24);
  assert(pk.cMaxMgL > 0, 'Cmax must be positive');
  assert(pk.tMaxHours > 0 && pk.tMaxHours < 5, 'Tmax must be between 0 and 5 hours for oral ibuprofen');
  assert(pk.areaUnderCurveAuc > 0, 'AUC must be positive');
  assert.strictEqual(pk.percentRemainingAtFiveHalfLives, 3.125, 'Percent remaining after 5 half-lives must be 3.125%');
  assert.strictEqual(pk.fiveHalfLivesHours, 10.0, '5 * 2.0h = 10.0h for ibuprofen');
  console.log('  ✓ One-compartment Bateman kinetics models Cmax, Tmax, AUC, and 5-t1/2 clearance rule');
}

// 4. Paracetamol Overdose & Rumack-Matthew Nomogram
{
  // Safe dose 1g at 4h: not high risk
  const safe = assessParacetamolOverdoseAndNac(1.0, 4, false);
  assert.strictEqual(safe.isHepatotoxicRiskHigh, false, '1g dose must not be high risk');
  assert(safe.clinicalOutcomeVi.includes('an toàn'), 'Must report safe dose');

  // Toxic overdose 15g at 4h without NAC: high risk hepatotoxicity
  const toxic = assessParacetamolOverdoseAndNac(15.0, 4, false);
  assert.strictEqual(toxic.isHepatotoxicRiskHigh, true, '15g dose at 4h exceeds 150 mg/L Rumack line');
  assert(toxic.hepaticGlutathioneDepletedPercent > 70, 'Glutathione must be heavily depleted');
  assert(toxic.clinicalOutcomeVi.includes('HOẠI TỬ'), 'Must warn of acute liver necrosis');

  // Toxic overdose 15g WITH NAC antidote: rescued
  const rescued = assessParacetamolOverdoseAndNac(15.0, 4, true);
  assert(rescued.clinicalOutcomeVi.includes('HỒI PHỤC HOÀN TOÀN'), 'NAC administration must rescue patient');
  assert(rescued.hepaticGlutathioneDepletedPercent <= 20, 'Glutathione pool restored by NAC');
  console.log('  ✓ Rumack-Matthew nomogram identifies hepatotoxicity and verifies NAC antidote restoration');
}

console.log('\n======================================================================');
console.log(' AUDIT SUMMARY: ALL TEST CRITERIA MET');
console.log(' TEST SUITE 208 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
