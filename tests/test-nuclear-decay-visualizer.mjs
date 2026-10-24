// tests/test-nuclear-decay-visualizer.mjs
// Test Suite 82: Nuclear Chemistry, Radioactivity & Half-Life Decay
// Conforming to Vietnam GDPT 2018 (Hóa 10 Chương 1, Vật lý 12 Chương Hạt Nhân) & IUPAC Standards

import assert from 'assert';
import {
  CURRICULUM_RADIOISOTOPES,
  calculateRemainingFraction,
  calculateRemainingMass,
  calculateDecayConstant,
  calculateActivityBecquerel,
  convertBqToCurie,
  calculateCarbon14AgeYears,
  calculateMassDefectAmu,
  calculateBindingEnergyMeV,
  calculateBindingEnergyPerNucleon,
  BECQUEREL_PER_CURIE
} from '../src/domain/nuclearEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('🧪 Starting Test Suite 82: Nuclear Chemistry, Radioactivity & Half-Life Decay...\n');

let passedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Catalog Integrity
runTest('1. CURRICULUM_RADIOISOTOPES catalog contains 10 benchmark radioisotopes', () => {
  const ids = Object.keys(CURRICULUM_RADIOISOTOPES);
  assert.strictEqual(ids.length, 10);
  assert(ids.includes('carbon_14'));
  assert(ids.includes('uranium_238'));
  assert(ids.includes('uranium_235_fission'));
  assert(ids.includes('iodine_131'));
  assert(ids.includes('technetium_99m'));
  assert(ids.includes('fluorine_18'));
  assert(ids.includes('cobalt_60'));
  assert(ids.includes('radium_226'));
  assert(ids.includes('tritium_3h'));
  assert(ids.includes('potassium_40'));
});

// 2. Conservation of Mass Number A and Charge Z
runTest('2. Conservation Laws: parent and daughter nucleons balance correctly across decay modes', () => {
  // Alpha: A_d = A_p - 4, Z_d = Z_p - 2
  const u238 = CURRICULUM_RADIOISOTOPES.uranium_238;
  assert.strictEqual(u238.parentNuclide.massNumberA - 4, u238.daughterNuclide.massNumberA);
  assert.strictEqual(u238.parentNuclide.atomicNumberZ - 2, u238.daughterNuclide.atomicNumberZ);

  // Beta minus: A_d = A_p, Z_d = Z_p + 1
  const c14 = CURRICULUM_RADIOISOTOPES.carbon_14;
  assert.strictEqual(c14.parentNuclide.massNumberA, c14.daughterNuclide.massNumberA);
  assert.strictEqual(c14.parentNuclide.atomicNumberZ + 1, c14.daughterNuclide.atomicNumberZ);

  // Beta plus: A_d = A_p, Z_d = Z_p - 1
  const f18 = CURRICULUM_RADIOISOTOPES.fluorine_18;
  assert.strictEqual(f18.parentNuclide.massNumberA, f18.daughterNuclide.massNumberA);
  assert.strictEqual(f18.parentNuclide.atomicNumberZ - 1, f18.daughterNuclide.atomicNumberZ);
});

// 3. Alpha Decay Mode Verification
runTest('3. Alpha decay mode: U-238 and Ra-226 emit helium-4 nuclei', () => {
  assert.strictEqual(CURRICULUM_RADIOISOTOPES.uranium_238.decayMode, 'ALPHA');
  assert.strictEqual(CURRICULUM_RADIOISOTOPES.radium_226.decayMode, 'ALPHA');
  assert(CURRICULUM_RADIOISOTOPES.uranium_238.emittedParticleVI.includes('⁴₂He²⁺'));
  assert(CURRICULUM_RADIOISOTOPES.radium_226.daughterNuclide.symbol.includes('Rn'));
});

// 4. Beta Minus Decay Mode Verification
runTest('4. Beta minus decay mode: C-14, I-131, Co-60, H-3 emit electrons and antineutrinos', () => {
  const betaMinusIsotopes = ['carbon_14', 'iodine_131', 'cobalt_60', 'tritium_3h', 'potassium_40'];
  for (const id of betaMinusIsotopes) {
    assert.strictEqual(CURRICULUM_RADIOISOTOPES[id].decayMode, 'BETA_MINUS');
  }
});

// 5. Beta Plus (Positron) Decay Verification
runTest('5. Beta plus decay: F-18 emits positron for PET-CT medical scans', () => {
  const f18 = CURRICULUM_RADIOISOTOPES.fluorine_18;
  assert.strictEqual(f18.decayMode, 'BETA_PLUS');
  assert(f18.emittedParticleVI.includes('positron'));
  assert(f18.decayEquationVI.includes('2γ 511 keV'));
});

// 6. Gamma Isomeric Transition Verification
runTest('6. Gamma isomeric decay: Tc-99m drops from metastable state emitting 140.5 keV gamma', () => {
  const tc99m = CURRICULUM_RADIOISOTOPES.technetium_99m;
  assert.strictEqual(tc99m.decayMode, 'GAMMA');
  assert.strictEqual(tc99m.halfLifeDisplayVI, '6.01 giờ');
  assert(tc99m.emittedParticleVI.includes('gamma'));
  assert.strictEqual(tc99m.parentNuclide.atomicNumberZ, tc99m.daughterNuclide.atomicNumberZ);
  assert.strictEqual(tc99m.parentNuclide.massNumberA, tc99m.daughterNuclide.massNumberA);
});

// 7. Induced Nuclear Fission Verification
runTest('7. Nuclear Fission: U-235 captures neutron releasing Ba-141, Kr-92, 3 neutrons and ~200 MeV', () => {
  const u235 = CURRICULUM_RADIOISOTOPES.uranium_235_fission;
  assert.strictEqual(u235.decayMode, 'FISSION');
  assert.strictEqual(u235.decayEnergyMeV, 200.0);
  assert(u235.decayEquationVI.includes('Ba'));
  assert(u235.decayEquationVI.includes('Kr'));
  assert(u235.decayEquationVI.includes('3 ¹₀n'));
});

// 8. Radiation Shielding Classifications
runTest('8. Radiation Shielding: Alpha stopped by Paper, Beta by Aluminum, Gamma by Lead/Concrete', () => {
  assert.strictEqual(CURRICULUM_RADIOISOTOPES.uranium_238.shieldingRequired, 'PAPER_SKIN');
  assert.strictEqual(CURRICULUM_RADIOISOTOPES.carbon_14.shieldingRequired, 'ALUMINUM_SHEET');
  assert.strictEqual(CURRICULUM_RADIOISOTOPES.technetium_99m.shieldingRequired, 'LEAD_CONCRETE');
  assert.strictEqual(CURRICULUM_RADIOISOTOPES.cobalt_60.shieldingRequired, 'LEAD_CONCRETE');
});

// 9. Remaining Fraction Calculation N(t)/N0 = (0.5)^(t/t_half)
runTest('9. calculateRemainingFraction: accurately computes exponential decay ratios', () => {
  assert.strictEqual(calculateRemainingFraction(0, 100), 1.0);
  assert.strictEqual(calculateRemainingFraction(100, 100), 0.5);
  assert.strictEqual(calculateRemainingFraction(200, 100), 0.25);
  assert.strictEqual(calculateRemainingFraction(300, 100), 0.125);
  assert.strictEqual(calculateRemainingFraction(400, 100), 0.0625);

  // Safe edge cases
  assert.strictEqual(calculateRemainingFraction(-10, 100), 1.0);
  assert.strictEqual(calculateRemainingFraction(100, 0), 1.0);
});

// 10. Remaining Mass Calculation m(t) = m0 * (0.5)^(t/t_half)
runTest('10. calculateRemainingMass: computes physical remaining mass in grams', () => {
  // 100 g sample after 1 half life -> 50 g
  assert.strictEqual(calculateRemainingMass(100, 10, 10), 50);
  // 80 g sample after 3 half lives -> 10 g
  assert.strictEqual(calculateRemainingMass(80, 30, 10), 10);
  // Edge cases
  assert.strictEqual(calculateRemainingMass(0, 10, 10), 0);
  assert.strictEqual(calculateRemainingMass(-5, 10, 10), 0);
});

// 11. Decay Constant Lambda = ln(2) / t_half
runTest('11. calculateDecayConstant: computes exact decay constant', () => {
  const lambda = calculateDecayConstant(100);
  assert(Math.abs(lambda - 0.00693147) < 1e-6);
  assert.strictEqual(calculateDecayConstant(0), 0);
});

// 12. Activity Becquerel & Curie Conversions
runTest('12. Activity in Bq and Ci: converts accurately according to 1 Ci = 3.7e10 Bq', () => {
  const oneCurieBq = BECQUEREL_PER_CURIE;
  assert.strictEqual(convertBqToCurie(oneCurieBq), 1.0);
  assert.strictEqual(convertBqToCurie(7.4e10), 2.0);
  assert.strictEqual(convertBqToCurie(0), 0);

  // 1 g of C-14: M = 14 g/mol, t_half = 5730 * 3.15576e7 s
  const activityBq = calculateActivityBecquerel(1.0, 14.0, 5730 * 365.25 * 86400);
  assert(activityBq > 1e11); // High specific activity
});

// 13. Radiocarbon Archaeological Dating Calculator
runTest('13. calculateCarbon14AgeYears: accurately calculates archaeological ages', () => {
  // 50% remaining activity = exactly 1 half-life (5,730 years)
  const age50 = calculateCarbon14AgeYears(50.0);
  assert.strictEqual(age50.estimatedAgeYears, 5730);

  // 25% remaining activity = exactly 2 half-lives (11,460 years)
  const age25 = calculateCarbon14AgeYears(25.0);
  assert.strictEqual(age25.estimatedAgeYears, 11460);

  // 12.5% remaining activity = exactly 3 half-lives (17,190 years)
  const age12_5 = calculateCarbon14AgeYears(12.5);
  assert.strictEqual(age12_5.estimatedAgeYears, 17190);

  // 100% remaining activity = 0 years (modern living organism)
  const age100 = calculateCarbon14AgeYears(100.0);
  assert.strictEqual(age100.estimatedAgeYears, 0);

  // Out of bounds / invalid inputs handled safely
  const invalidNeg = calculateCarbon14AgeYears(-10);
  assert.strictEqual(invalidNeg.estimatedAgeYears, 0);
  const invalidOver = calculateCarbon14AgeYears(150);
  assert.strictEqual(invalidOver.estimatedAgeYears, 0);
});

// 14. Mass Defect and Binding Energy Calculations
runTest('14. calculateMassDefectAmu and calculateBindingEnergyMeV: verifies Einstein mass-energy equivalence', () => {
  // Helium-4 nucleus: Z = 2, A = 4, actual alpha mass ≈ 4.001506 amu
  // Constituent: 2 * 1.007276 + 2 * 1.008665 = 4.031882 amu
  // Delta m ≈ 0.030376 amu
  const deltaM = calculateMassDefectAmu(2, 4, 4.001506);
  assert(deltaM > 0.03 && deltaM < 0.031);

  const eb = calculateBindingEnergyMeV(deltaM);
  assert(eb > 28.0 && eb < 28.6); // Known ~28.3 MeV for He-4

  const ebPerNucleon = calculateBindingEnergyPerNucleon(deltaM, 4);
  assert(ebPerNucleon > 7.0 && ebPerNucleon < 7.2); // ~7.07 MeV/nucleon

  // Edge cases
  assert.strictEqual(calculateMassDefectAmu(0, 0, 0), 0);
  assert.strictEqual(calculateBindingEnergyMeV(0), 0);
  assert.strictEqual(calculateBindingEnergyPerNucleon(0, 4), 0);
});

// 15. Sound Engine Integration
runTest('15. Sound Engine: playGeigerCounterClick and playNuclearDecayBurst are callable', () => {
  assert.strictEqual(typeof sound.playGeigerCounterClick, 'function');
  assert.strictEqual(typeof sound.playNuclearDecayBurst, 'function');
  sound.playGeigerCounterClick();
  sound.playNuclearDecayBurst();
});

console.log(`\n🎉 All ${passedTests} / 15 tests passed successfully in Test Suite 82!\n`);
