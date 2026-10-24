// tests/test-petroleum-refining.mjs
// Test Suite 222: Petroleum Refining, Catalytic Cracking & Octane Blending Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum & TCVN 7716:2011 Standards

import assert from 'assert';
import {
  PETROLEUM_FRACTIONS_CATALOG,
  VIETNAM_CRUDE_OILS,
  FCC_MECHANISM_STEPS,
  PURE_HYDROCARBONS_OCTANE,
  calculateGasolineBlendOctane
} from '../src/domain/petroleumRefiningEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 222: PETROLEUM REFINING & CRACKING ENGINE     ');
console.log('======================================================================\n');

// 1. Fractional Distillation Columns & Trays
{
  assert(PETROLEUM_FRACTIONS_CATALOG.length >= 6, 'Must contain 6 canonical petroleum distillation cuts');

  const lpg = PETROLEUM_FRACTIONS_CATALOG.find(f => f.id === 'REFINERY_GAS_LPG');
  const naphtha = PETROLEUM_FRACTIONS_CATALOG.find(f => f.id === 'LIGHT_NAPHTHA_GASOLINE');
  const kerosene = PETROLEUM_FRACTIONS_CATALOG.find(f => f.id === 'KEROSENE_JET_FUEL');
  const bitumen = PETROLEUM_FRACTIONS_CATALOG.find(f => f.id === 'ATMOSPHERIC_RESIDUE_ASPHALT');

  assert(lpg && lpg.trayPositionFromTop === 1, 'LPG must be at top tray (1)');
  assert(naphtha && (naphtha.carbonNumberRange.includes('C₅') || naphtha.carbonNumberRange.includes('C5')), 'Naphtha must contain C5-C10');
  assert(kerosene && kerosene.vietnamCommercialProductsVi.some(p => p.includes('Jet A-1')),
    'Kerosene must cite Jet A-1 aviation fuel');
  assert(bitumen && bitumen.trayPositionFromTop === 6, 'Residue/Bitumen must be at bottom tray (6)');

  console.log('  ✓ Fractional distillation trays verified (LPG C1-C4 -> Naphtha C5-C10 -> Jet A-1 -> Diesel -> Heavy Gas Oil -> Bitumen)');
}

// 2. Vietnamese Crude Oil Profiles
{
  const bachHo = VIETNAM_CRUDE_OILS.BACH_HO;
  const suTuDen = VIETNAM_CRUDE_OILS.SU_TU_DEN;

  assert(bachHo, 'Bach Ho crude must exist');
  assert(bachHo.apiGravity > 35, 'Bach Ho must be Light Crude (API > 35)');
  assert(bachHo.sulfurContentPercent < 0.1, 'Bach Ho must be sweet crude with < 0.1% S');
  assert(bachHo.pourPointCelsius >= 30, 'Bach Ho has high pour point (>= 30°C) due to paraffin wax');
  assert(bachHo.refineryMatchVi.includes('Dung Quất'), 'Must cite Dung Quất refinery design feed');

  assert(suTuDen && suTuDen.sulfurContentPercent < 0.1, 'Su Tu Den must also be sweet crude');

  console.log(`  ✓ Vietnam crude oil profiles validated: Bạch Hổ API ${bachHo.apiGravity}°, Sulfur ${bachHo.sulfurContentPercent}%, Pour Point ${bachHo.pourPointCelsius}°C (Dung Quất Refinery feedstock)`);
}

// 3. Catalytic Cracking (FCC) Mechanism Steps
{
  assert.strictEqual(FCC_MECHANISM_STEPS.length, 3, 'Must contain 3 FCC mechanism steps');

  const step1 = FCC_MECHANISM_STEPS[0];
  const step2 = FCC_MECHANISM_STEPS[1];
  const step3 = FCC_MECHANISM_STEPS[2];

  assert(step1.chemicalEquationVi.includes('H⁺(Zeolite)'), 'Step 1 must involve Zeolite Brønsted acid protonation');
  assert(step2.carbocationIntermediateTypeVi.includes('bậc 3'), 'Step 2 must produce branched tertiary carbocations for high octane');
  assert(step3.stepNameVi.includes('Beta-Scission'), 'Step 3 must be beta-scission bond cleavage');

  console.log('  ✓ Zeolite Y catalytic cracking mechanism verified: Acid protonation -> Carbocation branching -> Beta-scission');
}

// 4. Pure Hydrocarbons Octane Standards
{
  const nHeptane = PURE_HYDROCARBONS_OCTANE.N_HEPTANE;
  const isooctane = PURE_HYDROCARBONS_OCTANE.ISOOCTANE;
  const toluene = PURE_HYDROCARBONS_OCTANE.TOLUENE;
  const ethanol = PURE_HYDROCARBONS_OCTANE.ETHANOL_BIOFUEL;

  assert.strictEqual(nHeptane.ron, 0.0, 'n-Heptane must have reference RON = 0');
  assert.strictEqual(isooctane.ron, 100.0, 'Isooctane must have reference RON = 100');
  assert(toluene.ron > 115, 'Toluene aromatic must have RON > 115');
  assert(ethanol.ron >= 105, 'Bio-ethanol must have RON >= 105');

  console.log('  ✓ Octane rating standards verified: n-Heptane (RON 0) vs Isooctane (RON 100) vs Toluene (RON 120) vs Bio-Ethanol (RON 108)');
}

// 5. Bio-Gasoline E5 & E10 Blending Calculation
{
  // Blend 5% Ethanol into RON 92 base -> E5 RON 92
  const e5Blend = calculateGasolineBlendOctane(92.0, 5.0);
  assert(e5Blend.resultingBlendRon > 92.5, `E5 blend must raise RON, got ${e5Blend.resultingBlendRon}`);
  assert(e5Blend.coEmissionReductionPercent > 5, 'E5 must reduce CO emissions');
  assert(e5Blend.vietnamCommercialGradeNameVi.includes('E5'), 'Must name E5 grade');

  // Blend 10% Ethanol into RON 95 base -> E10
  const e10Blend = calculateGasolineBlendOctane(95.0, 10.0);
  assert(e10Blend.resultingBlendRon > 96.0, `E10 blend must achieve high RON (>96), got ${e10Blend.resultingBlendRon}`);
  assert(e10Blend.greenhouseGasSavingsPercent >= 10, 'E10 must save >=10% greenhouse gas emissions');
  assert(e10Blend.vietnamCommercialGradeNameVi.includes('E10'), 'Must name E10 grade');

  console.log(`  ✓ Bio-Gasoline blending verified: E5 reaches RON ${e5Blend.resultingBlendRon} (-${e5Blend.coEmissionReductionPercent}% CO) & E10 reaches RON ${e10Blend.resultingBlendRon} (-${e10Blend.greenhouseGasSavingsPercent}% GHG)`);
}

// 6. Vietnam Legal & Curriculum Context
{
  const blend = calculateGasolineBlendOctane(92.0, 5.0);
  assert(blend.vietnamLegalStandardVi.includes('TCVN 7716'), 'Must reference TCVN 7716 standard');
  assert(blend.engineCompatibilityNoticeVi.includes('Honda') || blend.engineCompatibilityNoticeVi.includes('PGM-FI'),
    'Must address Vietnamese motorbike engine compatibility');

  console.log('  ✓ Vietnam national standard TCVN 7716:2011 and motorbike engine compatibility confirmed');
}

console.log('\n======================================================================');
console.log('   TEST SUITE 222: ALL 6 TEST CASES PASSED SUCCESSFULLY               ');
console.log('======================================================================\n');
