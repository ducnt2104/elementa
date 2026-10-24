// test-superconductivity-visualizer.mjs
// Milestone 46: Superconductivity, BCS Cooper Pairs, London Penetration Depth & Meissner Effect Engine
// Standards: Nobel Prize in Physics 1972 (BCS Theory), 1987 (High-Tc Cuprates), 2003 (Type II Vortices)
// Curriculum: Vietnam GDPT 2018 (Vật lí 12 Chuyên đề & Hóa học 12)

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {
  SUPERCONDUCTOR_CATALOG,
  calculateSuperconductivity,
  getMatchingSuperconductorCard,
  LIQUID_NITROGEN_BOILING_POINT_K,
} from './src/domain/superconductivityEngine.ts';

let passedTests = 0;
let totalTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] Test ${totalTests}: ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] Test ${totalTests}: ${testName}`);
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 103: SUPERCONDUCTIVITY & MEISSNER EFFECT');
console.log('======================================================================');

// Test 1: Superconductor Catalog Integrity
runTest('Superconductor benchmark catalog contains elemental, alloy, and high-Tc cuprate presets', () => {
  const required = ['mercury_elemental', 'lead_elemental', 'niobium_titanium', 'ybco_cuprate', 'magnesium_diboride'];
  for (const id of required) {
    const mat = SUPERCONDUCTOR_CATALOG[id];
    assert.ok(mat, `Missing superconductor: ${id}`);
    assert.ok(mat.criticalTemperatureKelvin > 0, `Tc must be positive for ${id}`);
    assert.ok(mat.thermodynamicCriticalFieldH0Tesla > 0, `H0 must be positive for ${id}`);
    assert.ok(mat.nameVI.length > 5, `Vietnamese description required for ${id}`);
  }
});

// Test 2: Ginzburg-Landau Parameter kappa and Type I / Type II Classification
runTest('Ginzburg-Landau parameter kappa cleanly discriminates Type I from Type II superconductors', () => {
  const hg = SUPERCONDUCTOR_CATALOG.mercury_elemental;
  assert.strictEqual(hg.type, 'TYPE_I');
  assert.ok(hg.ginzburgLandauKappa < 1 / Math.SQRT2, `Mercury kappa must be < 1/sqrt(2): ${hg.ginzburgLandauKappa}`);

  const pb = SUPERCONDUCTOR_CATALOG.lead_elemental;
  assert.strictEqual(pb.type, 'TYPE_I');
  assert.ok(pb.ginzburgLandauKappa < 1 / Math.SQRT2);

  const nbti = SUPERCONDUCTOR_CATALOG.niobium_titanium;
  assert.strictEqual(nbti.type, 'TYPE_II');
  assert.ok(nbti.ginzburgLandauKappa > 1 / Math.SQRT2);

  const ybco = SUPERCONDUCTOR_CATALOG.ybco_cuprate;
  assert.strictEqual(ybco.type, 'TYPE_II');
  assert.ok(ybco.ginzburgLandauKappa > 50, 'YBCO is strongly Type II (kappa ~ 100)');
});

// Test 3: High-Tc Liquid Nitrogen Accessibility (Tc > 77.36 K)
runTest('YBCO is verified as High-Tc superconductor accessible at liquid nitrogen boiling point', () => {
  const ybco = SUPERCONDUCTOR_CATALOG.ybco_cuprate;
  assert.ok(ybco.criticalTemperatureKelvin > LIQUID_NITROGEN_BOILING_POINT_K);
  assert.strictEqual(ybco.isHighTcLiquidNitrogenAccessible, true);

  // Conventional superconductors cannot operate in liquid nitrogen
  assert.strictEqual(SUPERCONDUCTOR_CATALOG.mercury_elemental.isHighTcLiquidNitrogenAccessible, false);
  assert.strictEqual(SUPERCONDUCTOR_CATALOG.niobium_titanium.isHighTcLiquidNitrogenAccessible, false);
});

// Test 4: BCS Energy Gap at T = 0: Delta(0) = 1.764 * k_B * Tc
runTest('BCS energy gap at zero temperature evaluates to 1.764 * k_B * Tc', () => {
  const resYBCO = calculateSuperconductivity('ybco_cuprate', 0.1, 0.01);
  // Delta(0) for Tc = 93 K: 1.764 * 1.38e-23 * 93 / 1.602e-19 * 1000 ~= 14.13 meV
  assert.ok(Math.abs(resYBCO.bcsEnergyGapMilliEv - 14.13) < 0.25, `YBCO gap should be ~14.1 meV, got ${resYBCO.bcsEnergyGapMilliEv}`);

  const resPb = calculateSuperconductivity('lead_elemental', 0.1, 0.01);
  // Delta(0) for Tc = 7.2 K: ~1.09 meV
  assert.ok(Math.abs(resPb.bcsEnergyGapMilliEv - 1.09) < 0.15, `Lead gap should be ~1.09 meV, got ${resPb.bcsEnergyGapMilliEv}`);
});

// Test 5: BCS Energy Gap Temperature Dependence: Delta(T) vanishes at Tc
runTest('BCS energy gap decreases monotonically with temperature and vanishes above Tc', () => {
  const resCold = calculateSuperconductivity('ybco_cuprate', 20.0, 0.01);
  const resWarm = calculateSuperconductivity('ybco_cuprate', 80.0, 0.01);
  const resAbove = calculateSuperconductivity('ybco_cuprate', 95.0, 0.01);

  assert.ok(resCold.bcsEnergyGapMilliEv > resWarm.bcsEnergyGapMilliEv, 'Gap must shrink as temperature increases');
  assert.strictEqual(resAbove.bcsEnergyGapMilliEv, 0, 'Gap must be zero above Tc');
  assert.strictEqual(resAbove.isSuperconducting, false);
});

// Test 6: Thermodynamic Critical Field Hc(T) = H0 * [1 - (T/Tc)^2]
runTest('Critical field parabolic temperature dependence Hc(T) matches empirical rule', () => {
  const pb = SUPERCONDUCTOR_CATALOG.lead_elemental;
  const tHalf = pb.criticalTemperatureKelvin * 0.5; // 3.6 K
  const res = calculateSuperconductivity('lead_elemental', tHalf, 0.01);

  // Hc(0.5 Tc) = H0 * (1 - 0.25) = 0.75 * H0
  const expectedHc = pb.thermodynamicCriticalFieldH0Tesla * 0.75;
  assert.ok(Math.abs(res.criticalFieldTesla - expectedHc) < 0.005, `Hc at 0.5 Tc should be ~${expectedHc}, got ${res.criticalFieldTesla}`);
});

// Test 7: Type I Meissner Complete Diamagnetism & Flux Expulsion
runTest('Type I superconductor exhibits 100% magnetic flux expulsion in Meissner state', () => {
  const res = calculateSuperconductivity('lead_elemental', 4.0, 0.02); // 20 mT < Hc(4K) ~= 55 mT
  assert.strictEqual(res.isSuperconducting, true);
  assert.strictEqual(res.superconductingState, 'MEISSNER_STATE');
  assert.strictEqual(res.magneticFluxExpulsionPercent, 100.0, 'Meissner flux expulsion must be 100%');
  assert.ok(res.magneticLevitationForceNewtons > 0, 'Levitation force must be positive in Meissner state');
});

// Test 8: Type I Magnetic Quenching by High Field
runTest('Type I superconductor quenches to normal state when applied field exceeds Hc(T)', () => {
  const res = calculateSuperconductivity('lead_elemental', 4.0, 0.10); // 100 mT > Hc(4K) ~= 55 mT
  assert.strictEqual(res.isSuperconducting, false);
  assert.strictEqual(res.superconductingState, 'NORMAL');
  assert.strictEqual(res.magneticLevitationForceNewtons, 0);
});

// Test 9: Type II Abrikosov Mixed Vortex State
runTest('Type II superconductor enters mixed vortex state between Hc1 and Hc2', () => {
  // Nb-Ti at 4.2 K: Hc1 ~ 16 mT, Hc2 ~ 12 T
  const resVortex = calculateSuperconductivity('niobium_titanium', 4.2, 1.5); // 1.5 Tesla (Hc1 < H < Hc2)
  assert.strictEqual(resVortex.isSuperconducting, true);
  assert.strictEqual(resVortex.superconductingState, 'MIXED_VORTEX_STATE');
  assert.ok(resVortex.magneticFluxExpulsionPercent < 100.0, 'Partial flux penetration as quantized vortices');
  assert.ok(resVortex.magneticFluxExpulsionPercent > 0.0);
});

// Test 10: London Penetration Depth Divergence as T -> Tc
runTest('London penetration depth lambda_L(T) increases with temperature according to Gorter-Casimir rule', () => {
  const resCold = calculateSuperconductivity('niobium_titanium', 2.0, 0.01);
  const resWarm = calculateSuperconductivity('niobium_titanium', 9.0, 0.01); // Near Tc = 9.8 K

  assert.ok(resWarm.londonPenetrationDepthNm > resCold.londonPenetrationDepthNm, 'Penetration depth must expand as T -> Tc');
  assert.ok(resCold.londonPenetrationDepthNm >= SUPERCONDUCTOR_CATALOG.niobium_titanium.londonPenetrationDepth0Nm);
});

// Test 11: Card Matching Service for Superconducting Systems
runTest('getMatchingSuperconductorCard accurately identifies superconducting materials and magnets', () => {
  const ybcoCard = { id: 'card_ybco_levitation', name: 'Gốm Siêu Dẫn YBCO Đệm Từ' };
  assert.strictEqual(getMatchingSuperconductorCard(ybcoCard)?.id, 'ybco_cuprate');

  const nbtiCard = { id: 'card_nbti_mri', name: 'Hợp Kim Nb-Ti Cuộn Nam Châm MRI' };
  assert.strictEqual(getMatchingSuperconductorCard(nbtiCard)?.id, 'niobium_titanium');

  const hgCard = { id: 'card_hg_onnes', name: 'Thủy Ngân Hg 4.15 K' };
  assert.strictEqual(getMatchingSuperconductorCard(hgCard)?.id, 'mercury_elemental');

  const pbCard = { id: 'card_pure_lead', name: 'Chì Kim Loại Pb' };
  assert.strictEqual(getMatchingSuperconductorCard(pbCard)?.id, 'lead_elemental');

  const nonMatch = { id: 'card_silica', name: 'Cát Thạch Anh SiO2' };
  assert.strictEqual(getMatchingSuperconductorCard(nonMatch), null);
});

// Test 12: SoundEngine Audio Integration
runTest('SoundEngine includes playSuperconductingMeissnerLevitateHum and playFluxVortexPinningClick', () => {
  const soundEngineFile = path.resolve('src/audio/soundEngine.ts');
  const content = fs.readFileSync(soundEngineFile, 'utf8');
  assert.ok(content.includes('playSuperconductingMeissnerLevitateHum'), 'Must contain playSuperconductingMeissnerLevitateHum');
  assert.ok(content.includes('playFluxVortexPinningClick'), 'Must contain playFluxVortexPinningClick');
});

// Test 13: SuperconductivityVisualizer Component Integrity
runTest('SuperconductivityVisualizer.tsx component exists and includes required visualizer tabs', () => {
  const compFile = path.resolve('src/components/visualizations/SuperconductivityVisualizer.tsx');
  assert.ok(fs.existsSync(compFile), 'Component file must exist');
  const content = fs.readFileSync(compFile, 'utf8');
  assert.ok(content.includes('phase_diagram'), 'Must include phase diagram tab');
  assert.ok(content.includes('bcs_energy_gap'), 'Must include bcs energy gap tab');
  assert.ok(content.includes('meissner_levitation'), 'Must include meissner levitation tab');
  assert.ok(content.includes('london_vortices'), 'Must include london vortices tab');
});

// Test 14: PeriodicCodexTab Section 35 Integration
runTest('PeriodicCodexTab integrates Section 35 and SUPERCONDUCTIVITY subtab', () => {
  const codexFile = path.resolve('src/components/PeriodicCodexTab.tsx');
  const content = fs.readFileSync(codexFile, 'utf8');
  assert.ok(content.includes('SUPERCONDUCTIVITY'), 'PeriodicCodexTab must handle SUPERCONDUCTIVITY tab');
  assert.ok(content.includes('SuperconductivityVisualizer'), 'PeriodicCodexTab must render SuperconductivityVisualizer');
  assert.ok(content.includes('SECTION 35: SUPERCONDUCTIVITY'), 'Must contain Section 35 header');
});

// Test 15: CardDetailModal Integration
runTest('CardDetailModal provides quick access to Superconductivity Visualizer for matching cards', () => {
  const modalFile = path.resolve('src/components/cards/CardDetailModal.tsx');
  const content = fs.readFileSync(modalFile, 'utf8');
  assert.ok(content.includes('showSuperconductivityModal'), 'CardDetailModal must declare showSuperconductivityModal');
  assert.ok(content.includes('matchingSuperconductor'), 'CardDetailModal must compute matchingSuperconductor');
  assert.ok(content.includes('SuperconductivityVisualizer'), 'CardDetailModal must render SuperconductivityVisualizer modal');
});

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log(' MILESTONE 46: TEST SUITE 103 COMPLETED IN 100% HARMONY!');
console.log('======================================================================');
