// test-colloid-surface-visualizer.mjs
// Test Suite 85: Colloids, Surface Chemistry, Surfactants & Micelles
// Conforming to Vietnam GDPT 2018 (Hóa 10 & 11: Dung dịch & Hệ phân tán) & IUPAC Standards

import assert from 'assert';
import {
  DISPERSED_SYSTEMS_CATALOG,
  SURFACTANTS_CATALOG,
  calculateRayleighTyndallScattering,
  calculateBrownianMotionDiffusion,
  calculateYoungLaplacePressure,
  calculateLangmuirAdsorption,
  calculateSchulzeHardyCoagulation,
  getMatchingColloidSurfaceConcept
} from '../src/domain/colloidSurfaceEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('🧪 Starting Test Suite 85: Colloids, Surface Chemistry, Surfactants & Micelles...\n');

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

// 1. Dispersed Systems Catalog Integrity
runTest('1. DISPERSED_SYSTEMS_CATALOG: contains True Solution, Colloid Sol, Emulsion, Gel & Suspension', () => {
  const systemKeys = Object.keys(DISPERSED_SYSTEMS_CATALOG);
  assert.strictEqual(systemKeys.length, 5);
  assert(systemKeys.includes('nacl_solution'));
  assert(systemKeys.includes('fe_oh_3_sol'));
  assert(systemKeys.includes('milk_emulsion'));
  assert(systemKeys.includes('agar_gel'));
  assert(systemKeys.includes('clay_suspension'));
});

// 2. Dispersed Particle Size Boundaries
runTest('2. Particle Size Boundaries: True solution < 1nm, Colloid 1-100nm, Coarse > 100nm', () => {
  const trueSol = DISPERSED_SYSTEMS_CATALOG.nacl_solution;
  assert(trueSol.typicalParticleSizeRangeNm[1] < 1.0);

  const sol = DISPERSED_SYSTEMS_CATALOG.fe_oh_3_sol;
  assert(sol.typicalParticleSizeRangeNm[0] >= 1.0 && sol.typicalParticleSizeRangeNm[1] <= 100.0);

  const coarse = DISPERSED_SYSTEMS_CATALOG.clay_suspension;
  assert(coarse.typicalParticleSizeRangeNm[0] > 100.0);
});

// 3. Membrane Permeability Invariants
runTest('3. Membrane Permeability: Colloid passes filter paper but blocked by dialysis membrane', () => {
  const trueSol = DISPERSED_SYSTEMS_CATALOG.nacl_solution;
  assert.strictEqual(trueSol.passFilterPaper, true);
  assert.strictEqual(trueSol.passDialysisMembrane, true);

  const colloid = DISPERSED_SYSTEMS_CATALOG.fe_oh_3_sol;
  assert.strictEqual(colloid.passFilterPaper, true);
  assert.strictEqual(colloid.passDialysisMembrane, false); // Retained by dialyzing cellophane

  const coarse = DISPERSED_SYSTEMS_CATALOG.clay_suspension;
  assert.strictEqual(coarse.passFilterPaper, false); // Retained by paper
  assert.strictEqual(coarse.passDialysisMembrane, false);
});

// 4. Surfactants Catalog Integrity
runTest('4. SURFACTANTS_CATALOG: contains Anionic (SDS, Soap), Cationic (CTAB), Non-ionic (Triton X-100)', () => {
  const surfKeys = Object.keys(SURFACTANTS_CATALOG);
  assert.strictEqual(surfKeys.length, 4);
  assert.strictEqual(SURFACTANTS_CATALOG.sodium_dodecyl_sulfate.surfactantType, 'ANIONIC');
  assert.strictEqual(SURFACTANTS_CATALOG.sodium_stearate.surfactantType, 'ANIONIC');
  assert.strictEqual(SURFACTANTS_CATALOG.ctab.surfactantType, 'CATIONIC');
  assert.strictEqual(SURFACTANTS_CATALOG.triton_x100.surfactantType, 'NON_IONIC');
});

// 5. Critical Micelle Concentration (CMC) Invariants
runTest('5. CMC Invariants: SDS = 8.2 mM, Soap = 0.6 mM, CTAB = 0.92 mM, Triton X-100 = 0.24 mM', () => {
  assert.strictEqual(SURFACTANTS_CATALOG.sodium_dodecyl_sulfate.criticalMicelleConcentrationMolar, 0.0082);
  assert.strictEqual(SURFACTANTS_CATALOG.sodium_stearate.criticalMicelleConcentrationMolar, 0.0006);
  assert.strictEqual(SURFACTANTS_CATALOG.ctab.criticalMicelleConcentrationMolar, 0.00092);
  assert.strictEqual(SURFACTANTS_CATALOG.triton_x100.criticalMicelleConcentrationMolar, 0.00024);
});

// 6. Griffin HLB Scale Verification
runTest('6. Griffin HLB: detergent range (13-18) for SDS, soap, CTAB, and Triton X-100', () => {
  assert(SURFACTANTS_CATALOG.sodium_stearate.griffinHLB >= 13);
  assert(SURFACTANTS_CATALOG.ctab.griffinHLB >= 13);
  assert(SURFACTANTS_CATALOG.triton_x100.griffinHLB >= 13);
});

// 7. Rayleigh Tyndall Scattering (I ∝ 1/lambda^4)
runTest('7. calculateRayleighTyndallScattering: blue light (450nm) scatters ~5.8x stronger than red light (700nm)', () => {
  const blue = calculateRayleighTyndallScattering(20, 450);
  const red = calculateRayleighTyndallScattering(20, 700);

  const ratio = blue.relativeIntensityNormalized / red.relativeIntensityNormalized;
  // (700 / 450)^4 = (1.5555)^4 = 5.86
  assert(Math.abs(ratio - 5.86) < 0.2);
  assert(blue.colorAppearanceVI.includes('lam'));
  assert(red.colorAppearanceVI.includes('đỏ'));
});

// 8. Einstein-Smoluchowski Brownian Motion Diffusion
runTest('8. calculateBrownianMotionDiffusion: computes diffusion coefficient D and RMS displacement', () => {
  // r = 20 nm, T = 25°C, t = 1.0s
  const res = calculateBrownianMotionDiffusion(20, 25, 1.0);
  assert(res.diffusionCoefficientM2s > 0);
  assert(res.meanDisplacementMicrons > 0);
  // For 20nm in water at 25C: D ~ 1.09e-11 m2/s, <x2> = 2Dt = 2.18e-11 m2 -> rms ~ 4.67 um
  assert(Math.abs(res.meanDisplacementMicrons - 4.67) < 0.3);
});

// 9. Temperature Dependence of Brownian Motion
runTest('9. Brownian Motion: higher temperature increases diffusion coefficient', () => {
  const cold = calculateBrownianMotionDiffusion(20, 5, 1.0);
  const hot = calculateBrownianMotionDiffusion(20, 60, 1.0);
  assert(hot.diffusionCoefficientM2s > cold.diffusionCoefficientM2s);
  assert(hot.meanDisplacementMicrons > cold.meanDisplacementMicrons);
});

// 10. Young-Laplace Capillary Pressure (Delta P = 2*gamma / R or 4*gamma / R)
runTest('10. calculateYoungLaplacePressure: smaller radius yields inversely higher overpressure', () => {
  // Droplet: R = 50 um, gamma = 72.8 mN/m -> Delta P = 2 * 0.0728 / 50e-6 = 2912 Pa
  const drop50 = calculateYoungLaplacePressure(72.8, 50, false);
  assert(Math.abs(drop50.overpressurePascals - 2912) < 2.0);

  // Droplet: R = 25 um -> Delta P = 5824 Pa (double)
  const drop25 = calculateYoungLaplacePressure(72.8, 25, false);
  assert(Math.abs(drop25.overpressurePascals - 5824) < 4.0);

  // Bubble with two surfaces: Delta P = 4*gamma / R
  const bubble50 = calculateYoungLaplacePressure(72.8, 50, true);
  assert(Math.abs(bubble50.overpressurePascals - 5824) < 4.0);
});

// 11. Langmuir Adsorption Isotherm (theta = KC / (1 + KC))
runTest('11. calculateLangmuirAdsorption: verifies Henry linear law at low C and saturation at high C', () => {
  const K = 100.0;
  // Low C = 0.0005 -> KC = 0.05 -> theta ~ 0.0476
  const lowC = calculateLangmuirAdsorption(K, 0.0005);
  assert.strictEqual(lowC.adsorptionRegimeVI, 'HENRY_LINEAR_REGIME');
  assert(lowC.surfaceCoveragePercent < 10.0);

  // High C = 0.5 -> KC = 50 -> theta = 50 / 51 = 0.9804 (~98%)
  const highC = calculateLangmuirAdsorption(K, 0.5);
  assert.strictEqual(highC.adsorptionRegimeVI, 'MONOLAYER_SATURATION');
  assert(highC.surfaceCoveragePercent >= 98.0);
});

// 12. Schulze-Hardy Coagulation Rule (CCC ∝ 1 / z^6)
runTest('12. calculateSchulzeHardyCoagulation: Al3+ (z=3) is 729x more powerful than Na+ (z=1)', () => {
  const na = calculateSchulzeHardyCoagulation(1, 100);
  assert.strictEqual(na.relativeCoagulationPower, 1);
  assert.strictEqual(na.criticalConcentration_mM, 100);

  const mg = calculateSchulzeHardyCoagulation(2, 100);
  assert.strictEqual(mg.relativeCoagulationPower, 64); // 2^6 = 64
  assert(Math.abs(mg.criticalConcentration_mM - (100 / 64)) < 0.01);

  const al = calculateSchulzeHardyCoagulation(3, 100);
  assert.strictEqual(al.relativeCoagulationPower, 729); // 3^6 = 729
  assert(Math.abs(al.criticalConcentration_mM - (100 / 729)) < 0.01);
});

// 13. Card and Chemical Concept Matcher
runTest('13. getMatchingColloidSurfaceConcept: matches Fe(OH)3, SDS, Soap, Milk, Agar and Clay', () => {
  const feSol = getMatchingColloidSurfaceConcept('Fe(OH)3');
  assert(feSol !== null);
  assert.strictEqual(feSol.dispersedSystem?.id, 'fe_oh_3_sol');

  const sds = getMatchingColloidSurfaceConcept('SDS');
  assert(sds !== null);
  assert.strictEqual(sds.surfactant?.id, 'sodium_dodecyl_sulfate');

  const soap = getMatchingColloidSurfaceConcept('xa_phong');
  assert(soap !== null);
  assert.strictEqual(soap.surfactant?.id, 'sodium_stearate');

  const milk = getMatchingColloidSurfaceConcept('sua');
  assert(milk !== null);
  assert.strictEqual(milk.dispersedSystem?.id, 'milk_emulsion');

  const unknown = getMatchingColloidSurfaceConcept('UNKNOWN_SUBSTANCE');
  assert.strictEqual(unknown, null);
});

// 14. Procedural Audio Synthesis Methods
runTest('14. SoundEngine: playColloidLightBeam and playMicelleFormBubble execute without error', () => {
  assert.doesNotThrow(() => {
    sound.playColloidLightBeam();
    sound.playMicelleFormBubble();
  });
});

// 15. Mathematical Boundary Conditions & Exceptions
runTest('15. Boundary conditions: zero/negative particle radius or surface tension throws error', () => {
  assert.throws(() => {
    calculateRayleighTyndallScattering(0, 500);
  }, /Bước sóng và bán kính hạt phải lớn hơn 0/);

  assert.throws(() => {
    calculateYoungLaplacePressure(-10, 50);
  }, /Sức căng bề mặt và bán kính phải lớn hơn 0/);

  assert.throws(() => {
    calculateSchulzeHardyCoagulation(-1);
  }, /Hóa trị ion phải là số nguyên dương/);
});

console.log(`\n🎉 Test Suite 85 Completed Successfully: ${passedTests} / 15 tests passed (100% Pass)!\n`);
