// tests/test-nuclear-shell-model.mjs
// Test Suite 226: Nuclear Shell Model, Magic Numbers, Spin-Orbit & Radiometric Dating Engine
// Conforming to Vietnam GDPT 2018 Physics & Chemistry Olympiad (IChO/IPhO) Standards

import assert from 'assert';
import {
  NUCLEAR_SHELL_LEVELS,
  MAGIC_NUMBERS,
  DOUBLY_MAGIC_ISOTOPES,
  predictNuclearGroundState,
  calculateRadiocarbonAge,
  calculateUraniumLeadConcordia
} from '../src/domain/nuclearShellModelEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 226: NUCLEAR SHELL MODEL & DATING ENGINE      ');
console.log('======================================================================\n');

// 1. Shell Model Energy Levels & Magic Numbers Gaps
{
  assert(NUCLEAR_SHELL_LEVELS.length >= 15, 'Must contain full single-particle levels up to 1i13/2');
  assert.deepStrictEqual(MAGIC_NUMBERS, [2, 8, 20, 28, 50, 82, 126], 'Must reproduce canonical Mayer-Jensen magic numbers');

  const level1s = NUCLEAR_SHELL_LEVELS.find(l => l.id === '1s1_2');
  const level1p3 = NUCLEAR_SHELL_LEVELS.find(l => l.id === '1p3_2');
  const level1f7 = NUCLEAR_SHELL_LEVELS.find(l => l.id === '1f7_2');
  const level1g9 = NUCLEAR_SHELL_LEVELS.find(l => l.id === '1g9_2');

  assert(level1s && level1s.capacity === 2 && level1s.magicNumber === 2, '1s1/2 must close shell at 2');
  assert(level1p3 && level1p3.capacity === 4, '1p3/2 capacity must be 2*(3/2)+1 = 4');
  assert(level1f7 && level1f7.magicNumber === 28, '1f7/2 must close magic shell at 28 (Spin-orbit coupling)');
  assert(level1g9 && level1g9.magicNumber === 50, '1g9/2 must close magic shell at 50');

  console.log('  ✓ Nuclear Shell Model energy levels & Spin-Orbit magic gaps verified: 2, 8, 20, 28, 50, 82, 126');
}

// 2. Canonical Doubly Magic Isotopes Catalog
{
  assert(DOUBLY_MAGIC_ISOTOPES.length >= 5, 'Must contain canonical doubly magic nuclei');

  const he4 = DOUBLY_MAGIC_ISOTOPES.find(i => i.id === 'HE_4');
  const o16 = DOUBLY_MAGIC_ISOTOPES.find(i => i.id === 'O_16');
  const ca40 = DOUBLY_MAGIC_ISOTOPES.find(i => i.id === 'CA_40');
  const ca48 = DOUBLY_MAGIC_ISOTOPES.find(i => i.id === 'CA_48');
  const pb208 = DOUBLY_MAGIC_ISOTOPES.find(i => i.id === 'PB_208');
  const fl298 = DOUBLY_MAGIC_ISOTOPES.find(i => i.id === 'FL_298');

  assert(he4 && he4.z === 2 && he4.n === 2, 'He-4 must be Z=2, N=2');
  assert(o16 && o16.z === 8 && o16.n === 8, 'O-16 must be Z=8, N=8');
  assert(ca40 && ca40.z === 20 && ca40.n === 20, 'Ca-40 must be Z=20, N=20');
  assert(ca48 && ca48.z === 20 && ca48.n === 28, 'Ca-48 must be Z=20, N=28');
  assert(pb208 && pb208.z === 82 && pb208.n === 126, 'Pb-208 must be Z=82, N=126');
  assert(fl298 && fl298.z === 114 && fl298.n === 184, 'Fl-298 must represent the superheavy Island of Stability');

  console.log('  ✓ Doubly Magic Isotopes validated: ⁴He, ¹⁶O, ⁴⁰Ca, ⁴⁸Ca, ²⁰⁸Pb and Island of Stability ²⁹⁸Fl');
}

// 3. Ground State J^P Spin-Parity Predictions
{
  // Even-even nucleus: 12C (Z=6, N=6)
  const carbon12 = predictNuclearGroundState(6, 6);
  assert.strictEqual(carbon12.nucleusType, 'EVEN_EVEN');
  assert.strictEqual(carbon12.predictedSpinParity, '0⁺', 'All even-even nuclei must have J^P = 0+');

  // Doubly magic nucleus: 208Pb (Z=82, N=126)
  const lead208 = predictNuclearGroundState(82, 126);
  assert(lead208.isDoublyMagic, '208Pb must be recognized as doubly magic');
  assert.strictEqual(lead208.predictedSpinParity, '0⁺');
  assert.strictEqual(lead208.deformedShape, 'SPHERICAL');

  // Even-odd nucleus: 17O (Z=8 magic, N=9 odd neutron in 1d5/2)
  const oxygen17 = predictNuclearGroundState(8, 9);
  assert.strictEqual(oxygen17.nucleusType, 'EVEN_ODD');
  assert.strictEqual(oxygen17.predictedSpinParity, '5/2⁺', '17O must have J^P = 5/2+ (1d5/2 neutron)');

  // Even-odd nucleus: 13C (Z=6, N=7 odd neutron in 1p1/2)
  const carbon13 = predictNuclearGroundState(6, 7);
  assert.strictEqual(carbon13.nucleusType, 'EVEN_ODD');
  assert.strictEqual(carbon13.predictedSpinParity, '1/2⁻', '13C must have J^P = 1/2- (1p1/2 neutron)');

  console.log(`  ✓ Ground state spin-parity predictions verified: ¹²C = ${carbon12.predictedSpinParity}, ²⁰⁸Pb = ${lead208.predictedSpinParity}, ¹⁷O = ${oxygen17.predictedSpinParity}, ¹³C = ${carbon13.predictedSpinParity}`);
}

// 4. Radiocarbon-14 Dating Kinetics
{
  // 50% activity remaining (exactly 1 half-life = 5730 years)
  const oneHalfLife = calculateRadiocarbonAge(50.0);
  assert(oneHalfLife.isValidMethod, '50% activity must be valid');
  assert.strictEqual(oneHalfLife.calculatedAgeBeforePresentYears, 5730, '50% activity must equal 5730 BP');

  // Dong Son bronze drum wood fragment sample (activity ~76.2%)
  const dongSon = calculateRadiocarbonAge(76.2, 'Mẫu gỗ tang trống đồng Đông Sơn');
  assert(dongSon.calculatedAgeBeforePresentYears >= 2200 && dongSon.calculatedAgeBeforePresentYears <= 2300,
    'Dong Son culture sample must date to ~2250 BP (ca. 300 BCE)');
  assert(dongSon.calendarDateRangeVi.includes('TCN'), 'Must cite BCE era for Dong Son');

  // Exhausted sample (< 0.2%)
  const dinosaurBone = calculateRadiocarbonAge(0.05);
  assert(!dinosaurBone.isValidMethod, 'Dinosaur sample must exceed Carbon-14 detection limit (> 50,000 yr)');

  console.log(`  ✓ Radiocarbon dating confirmed: 50% activity = ${oneHalfLife.calculatedAgeBeforePresentYears} yr BP; Đông Sơn sample = ${dongSon.calculatedAgeBeforePresentYears} yr BP (${dongSon.calendarDateRangeVi})`);
}

// 5. Uranium-Lead Concordia-Discordia Geochronology
{
  // Earth Jack Hills zircon (concordant age ~4.40 Ga)
  // At 4.40 Ga: ratio 206Pb/238U ≈ 0.979; ratio 207Pb/235U ≈ 75.8
  const jackHillsZircon = calculateUraniumLeadConcordia(0.979, 75.8);
  assert(jackHillsZircon.isConcordant, 'Jack Hills zircon must be concordant');
  assert(jackHillsZircon.age206Ga >= 4.35 && jackHillsZircon.age206Ga <= 4.45, 'Age must be ~4.4 Ga');
  assert(jackHillsZircon.geologicalEpochVi.includes('Hadean') || jackHillsZircon.geologicalEpochVi.includes('Hỏa minh'),
    'Must classify in Hadean eon');

  // Discordant metamorphism sample (Pb loss)
  const metamorphismZircon = calculateUraniumLeadConcordia(0.35, 12.0);
  assert(!metamorphismZircon.isConcordant, 'Metamorphosed sample must be discordant');
  assert(metamorphismZircon.interpretationVi.includes('BẤT HÒA HỢP'), 'Must flag Discordant Wetherill intercept');

  console.log(`  ✓ Uranium-Lead geochronology validated: Earth oldest zircon age = ${jackHillsZircon.age206Ga} Ga (${jackHillsZircon.geologicalEpochVi.slice(0, 35)}...)`);
}

console.log('\n======================================================================');
console.log('   ALL 5 TESTS IN SUITE 226 PASSED WITH DISTINCTION!                 ');
console.log('======================================================================\n');
