// tests/test-forensic-chemistry.mjs
// Test Suite 206: Forensic Chemistry, Breathalyzer Redox, Luminol & Toxicology Engine
// Standardized against Vietnam GDPT 2018 Chemistry & IUPAC Analytical Standards

import assert from 'assert';
import {
  calculateBreathalyzerTest,
  evaluateLuminolChemiluminescence,
  performMarshTest,
  MARQUIS_CATALOG,
  simulateCyanideAntidote
} from '../src/domain/forensicChemistryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 206: FORENSIC CHEMISTRY & TOXICOLOGY ENGINE   ');
console.log('======================================================================\n');

// 1. Breathalyzer Alcohol Redox & Decree 100 Tiers
{
  const sober = calculateBreathalyzerTest(0.0);
  assert.strictEqual(sober.vietnamDecree100Tier, 'TIER_0_SOBER', '0.0 mg/L breath ethanol must be TIER_0_SOBER');
  assert.strictEqual(sober.solutionColor, '#ea580c', 'Sober sample must maintain orange dichromate color');
  assert.strictEqual(sober.estimatedBacMgPer100mL, 0.0, 'BAC must be 0 for sober sample');
  console.log('  ✓ Sober sample (0.0 mg/L) retains orange dichromate and TIER_0_SOBER');

  const tier1 = calculateBreathalyzerTest(0.20);
  assert.strictEqual(tier1.vietnamDecree100Tier, 'TIER_1_LOW', '0.20 mg/L must fall into TIER_1_LOW');
  assert.strictEqual(tier1.estimatedBacMgPer100mL, 42.0, '0.20 mg/L breath ethanol equates to 42.0 mg/100mL BAC');
  assert(tier1.dichromateConsumedMmol > 0, 'Dichromate must be consumed in reaction');
  assert(tier1.cr3ProducedMmol > 0, 'Cr3+ green ions must be formed');
  console.log('  ✓ Tier 1 breathalyzer (0.20 mg/L) converts to 42.0 mg/100mL BAC with dichromate reduction');

  const tier2 = calculateBreathalyzerTest(0.35);
  assert.strictEqual(tier2.vietnamDecree100Tier, 'TIER_2_MEDIUM', '0.35 mg/L must fall into TIER_2_MEDIUM');
  console.log('  ✓ Tier 2 breathalyzer (0.35 mg/L) triggers medium fine tier');

  const tier3 = calculateBreathalyzerTest(0.65);
  assert.strictEqual(tier3.vietnamDecree100Tier, 'TIER_3_SEVERE', '0.65 mg/L must trigger TIER_3_SEVERE penalty');
  assert.strictEqual(tier3.solutionColor, '#15803d', 'High alcohol must turn cuvette deep emerald green');
  assert(tier3.absorbanceAt600nm > tier1.absorbanceAt600nm, 'Absorbance at 600nm must increase with Cr3+ formation');
  console.log('  ✓ Tier 3 breathalyzer (> 0.40 mg/L) turns deep emerald green (#15803d) with high 600nm OD');
}

// 2. Luminol Bloodstain Chemiluminescence
{
  const driedBlood = evaluateLuminolChemiluminescence('DRIED_BLOOD');
  assert.strictEqual(driedBlood.isPositiveGlow, true, 'Dried blood must trigger positive chemiluminescent glow');
  assert.strictEqual(driedBlood.isFalsePositive, false, 'Blood is a true positive, not false positive');
  assert.strictEqual(driedBlood.emissionWavelengthNm, 425, 'Luminol emission peak must be 425 nm (blue-cyan)');
  assert.strictEqual(driedBlood.glowIntensityPercent, 100, 'Dried blood has 100% glow intensity');
  console.log('  ✓ Luminol gives true positive 425nm cyan glow for dried blood (Fe-Heme catalyzed)');

  const dilutedBlood = evaluateLuminolChemiluminescence('DILUTED_BLOOD_1_100000');
  assert.strictEqual(dilutedBlood.isPositiveGlow, true, '1:100,000 diluted blood must remain detectable');
  assert(dilutedBlood.glowIntensityPercent > 0, 'Ultra-trace blood must exhibit non-zero glow');
  console.log('  ✓ Luminol demonstrates ultra-trace sensitivity down to 1:100,000 dilution');

  const bleachFalsePositive = evaluateLuminolChemiluminescence('BLEACH_FALSE_POSITIVE');
  assert.strictEqual(bleachFalsePositive.isPositiveGlow, true, 'Bleach triggers luminescence');
  assert.strictEqual(bleachFalsePositive.isFalsePositive, true, 'Bleach is flagged as FALSE POSITIVE');
  assert(bleachFalsePositive.glowDurationSeconds <= 5, 'Bleach luminescence decays rapidly (< 5s)');
  console.log('  ✓ Bleach (NaClO) is correctly flagged as rapid-decaying FALSE POSITIVE');

  const clean = evaluateLuminolChemiluminescence('CLEAN_SURFACE');
  assert.strictEqual(clean.isPositiveGlow, false, 'Clean surface produces no luminescence');
  assert.strictEqual(clean.glowIntensityPercent, 0, 'Clean surface intensity is 0%');
  console.log('  ✓ Clean control surface exhibits zero chemiluminescence');
}

// 3. Historical Marsh Test for Arsenic Detection
{
  const arsenic = performMarshTest('ARSENIC_TRIPTOXIDE');
  assert.strictEqual(arsenic.isConfirmedArsenic, true, 'As2O3 must produce confirmed arsenic');
  assert.strictEqual(arsenic.arsenicPresent, true);
  assert(arsenic.hypochloriteSolubilityVi.includes('TAN HOÀN TOÀN'), 'Arsenic mirror must dissolve in NaOCl');
  console.log('  ✓ Marsh test yields metallic arsenic mirror that completely dissolves in NaOCl');

  const antimony = performMarshTest('ANTIMONY_TRICHLORIDE');
  assert.strictEqual(antimony.isConfirmedArsenic, false, 'Antimony must NOT be misidentified as arsenic');
  assert.strictEqual(antimony.antimonyPresent, true);
  assert(antimony.hypochloriteSolubilityVi.includes('KHÔNG TAN'), 'Antimony mirror must be insoluble in NaOCl');
  console.log('  ✓ Antimony mirror is insoluble in NaOCl, preventing false conviction');

  const blank = performMarshTest('CONTROL_BLANK');
  assert.strictEqual(blank.isConfirmedArsenic, false);
  assert.strictEqual(blank.mirrorAppearanceVi.includes('Không hình thành'), true);
  console.log('  ✓ Reagent blank shows no deposition, validating test purity');
}

// 4. Marquis Reagent Catalog
{
  assert(MARQUIS_CATALOG.length >= 5, 'Marquis catalog must contain at least 5 benchmark substances');
  
  const opiate = MARQUIS_CATALOG.find(s => s.id === 'MORPHINE_HEROIN');
  assert(opiate, 'Morphine/Heroin must be present in Marquis catalog');
  assert.strictEqual(opiate.primaryColorHex, '#7c3aed', 'Morphine must turn deep violet/purple');

  const ats = MARQUIS_CATALOG.find(s => s.id === 'AMPHETAMINE_METH');
  assert(ats, 'Amphetamine/Meth must be present');
  assert.strictEqual(ats.primaryColorHex, '#ea580c', 'Amphetamine must turn orange');

  const ecstasy = MARQUIS_CATALOG.find(s => s.id === 'MDMA_ECSTASY');
  assert(ecstasy, 'MDMA must be present');
  assert.strictEqual(ecstasy.primaryColorHex, '#09090b', 'MDMA turns jet black');
  console.log('  ✓ Marquis reagent correctly categorizes Opiate (Violet), ATS (Orange), and MDMA (Black)');
}

// 5. Cyanide Poisoning Antidote Simulation
{
  const untreated = simulateCyanideAntidote(60, 'NONE');
  assert.strictEqual(untreated.patientSurvivalStatusVi, 'TỬ_VONG_DO_NGẠT_TẾ_BÀO', '60mg untreated NaCN must be fatal');
  assert(untreated.cytochromeOxidaseInhibitionPercent >= 80, 'Complex IV must be heavily inhibited');

  const thiosulfate = simulateCyanideAntidote(60, 'SODIUM_THIOSULFATE');
  assert.strictEqual(thiosulfate.patientSurvivalStatusVi, 'HỒI_PHỤC_HOÀN_TOÀN', 'Thiosulfate administration saves patient');
  assert(thiosulfate.thiocyanateExcretedMmol > 0, 'Thiocyanate must be formed for kidney excretion');

  const hydroxocobalamin = simulateCyanideAntidote(60, 'HYDROXOCOBALAMIN');
  assert.strictEqual(hydroxocobalamin.patientSurvivalStatusVi, 'HỒI_PHỤC_HOÀN_TOÀN', 'Hydroxocobalamin binds cyanide into Vitamin B12');
  assert(hydroxocobalamin.cyanocobalaminFormedMmol > 0, 'Cyanocobalamin must be formed');
  console.log('  ✓ Cyanide antidotes (Thiosulfate & Hydroxocobalamin) reverse lethal cytochrome inhibition');
}

console.log('\n======================================================================');
console.log(' AUDIT SUMMARY: ALL TEST CRITERIA MET');
console.log(' TEST SUITE 206 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
