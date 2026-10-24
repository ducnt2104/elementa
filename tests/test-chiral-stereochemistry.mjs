// tests/test-chiral-stereochemistry.mjs
// Test Suite 212: Chiral Stereochemistry, CIP Rules & Polarimetry Biot Law Engine
// Standardized against Vietnam GDPT 2018 Chemistry & IUPAC Stereochemical Standards

import assert from 'assert';
import {
  CHIRAL_MOLECULES_CATALOG,
  calculatePolarimeterRotation
} from '../src/domain/chiralStereochemistryEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 212: CHIRAL STEREOCHEMISTRY & POLARIMETRY      ');
console.log('======================================================================\n');

// 1. Catalog completeness & CIP substituents
{
  assert(CHIRAL_MOLECULES_CATALOG.length >= 6, 'Catalog must contain at least 6 canonical chiral compounds');

  const lacticR = CHIRAL_MOLECULES_CATALOG.find(m => m.id === 'R_LACTIC_ACID');
  assert(lacticR, 'R-Lactic acid must be in catalog');
  assert.strictEqual(lacticR.substituents.length, 4, 'Must have 4 substituents ordered by CIP priority');
  assert.strictEqual(lacticR.substituents[0].groupFormula, '-OH', 'Group 1 must be -OH (Oxygen Z=8)');
  assert.strictEqual(lacticR.substituents[1].groupFormula, '-COOH', 'Group 2 must be -COOH');
  assert.strictEqual(lacticR.substituents[2].groupFormula, '-CH₃', 'Group 3 must be -CH3');
  assert.strictEqual(lacticR.substituents[3].groupFormula, '-H', 'Group 4 must be -H (lowest Z=1)');
  console.log('  ✓ CIP rules correctly prioritize Lactic acid substituents (-OH > -COOH > -CH3 > -H)');
}

// 2. Enantiomeric Pair Symmetry
{
  const rLactic = CHIRAL_MOLECULES_CATALOG.find(m => m.id === 'R_LACTIC_ACID');
  const sLactic = CHIRAL_MOLECULES_CATALOG.find(m => m.id === 'S_LACTIC_ACID');
  assert(rLactic && sLactic, 'Both enantiomers of lactic acid must exist');
  assert.strictEqual(rLactic.specificRotationD20, -sLactic.specificRotationD20, 'Enantiomers must have equal and opposite specific rotations');
  console.log('  ✓ Enantiomers (R) and (S) exhibit equal magnitude and opposite signs of specific rotation (±2.6°)');
}

// 3. Meso Compound Inactivity
{
  const mesoTartaric = CHIRAL_MOLECULES_CATALOG.find(m => m.id === 'MESO_TARTARIC_ACID');
  assert(mesoTartaric, 'Meso tartaric acid must exist');
  assert.strictEqual(mesoTartaric.isMesoCompound, true, 'Meso tartaric must be flagged as meso');
  assert.strictEqual(mesoTartaric.specificRotationD20, 0.0, 'Meso compound must have [alpha] = 0.0');

  const mesoReading = calculatePolarimeterRotation('MESO_TARTARIC_ACID', 1.0, 0.20, 100);
  assert.strictEqual(mesoReading.observedRotationAlphaDegrees, 0.0, 'Observed rotation must be 0 for meso compound');
  assert(mesoReading.directionVi.includes('Triệt quang'), 'Must report optical inactivity');
  console.log('  ✓ Meso-tartaric acid with internal mirror plane of symmetry is strictly optically inactive ([alpha] = 0)');
}

// 4. Biot's Law & Enantiomeric Excess (% ee)
{
  // Pure (S)-Thalidomide: [alpha] = -64.5, l = 1 dm, c = 0.1 g/mL, 100% S => alpha = -6.45°
  const pureS = calculatePolarimeterRotation('S_THALIDOMIDE', 1.0, 0.10, 0); // 0% R => 100% S
  assert.strictEqual(pureS.enantiomericExcessPercent, 100, '%ee must be 100%');
  assert.strictEqual(pureS.observedRotationAlphaDegrees, -6.45, 'alpha = -64.5 * 1.0 * 0.10 * 1.0 = -6.45°');
  assert(pureS.directionVi.includes('QUAY TRÁI'), 'Negative alpha must rotate light counter-clockwise (levo)');
  console.log('  ✓ Biot\'s Law validates pure (S)-Thalidomide rotation of -6.45° in 1.0 dm tube');

  // Racemic mixture: 50% R + 50% S => %ee = 0% => alpha = 0.0°
  const racemic = calculatePolarimeterRotation('S_THALIDOMIDE', 1.0, 0.10, 50);
  assert.strictEqual(racemic.enantiomericExcessPercent, 0, 'Racemic mixture has 0% ee');
  assert.strictEqual(racemic.observedRotationAlphaDegrees, 0.0, 'Racemic mixture exhibits zero optical rotation');
  assert(racemic.directionVi.includes('Triệt quang'), 'Racemic mixture must be optically inactive');
  console.log('  ✓ Racemic mixture (50:50 R/S) perfectly extinguishes net optical rotation (alpha = 0.0°)');

  // 75% R : 25% S => %ee = 50%
  const enriched = calculatePolarimeterRotation('R_THALIDOMIDE', 1.0, 0.10, 75);
  assert.strictEqual(enriched.enantiomericExcessPercent, 50, '75:25 ratio has 50% ee');
  assert.strictEqual(enriched.observedRotationAlphaDegrees, 3.225, 'alpha = 64.5 * 1.0 * 0.10 * 0.5 = +3.225°');
  console.log('  ✓ Enantiomeric excess (% ee = 50%) linearly scales observed polarimeter rotation');
}

// 5. Thalidomide Tragedy Pharmacology
{
  const rThalidomide = CHIRAL_MOLECULES_CATALOG.find(m => m.id === 'R_THALIDOMIDE');
  const sThalidomide = CHIRAL_MOLECULES_CATALOG.find(m => m.id === 'S_THALIDOMIDE');
  assert(rThalidomide.pharmacologicalBiologicalSignificanceVi.includes('an thần'), 'R is sedative');
  assert(sThalidomide.pharmacologicalBiologicalSignificanceVi.includes('quái thai'), 'S is teratogen');
  assert(sThalidomide.pharmacologicalBiologicalSignificanceVi.includes('epimerization'), 'Must document in vivo epimerization');
  console.log('  ✓ Pharmacology notes document (R) sedative safety vs (S) teratogen phocomelia and in vivo racemization');
}

console.log('\n======================================================================');
console.log(' AUDIT SUMMARY: ALL TEST CRITERIA MET');
console.log(' TEST SUITE 212 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
