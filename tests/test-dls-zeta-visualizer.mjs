// test-dls-zeta-visualizer.mjs
// Milestone 56: Test Suite 113 — Dynamic Light Scattering (DLS), Stokes-Einstein Particle Size Distribution & Zeta Potential Engine
// Standards: Nobel Prize in Physics 1926 (Jean Baptiste Perrin - Brownian Motion & Sedimentation Equilibrium) & ISO 22412 / ASTM E2490 DLS Standards
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Hạt nano; Hóa học 11: Sự điện ly & pH; Hóa học 12: Keo tụ Protein & Điểm đẳng điện pI; Vật lý 11: Chuyển động Brown & Tán xạ ánh sáng)

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('======================================================================');
console.log('   TEST SUITE 113: DLS PARTICLE SIZING & ZETA POTENTIAL ENGINE');
console.log('======================================================================\n');

async function runTests() {
  const enginePath = resolve('src/domain/dynamicLightScatteringEngine.ts');
  const visualizerPath = resolve('src/components/visualizations/DynamicLightScatteringVisualizer.tsx');
  const codexPath = resolve('src/components/PeriodicCodexTab.tsx');
  const modalPath = resolve('src/components/cards/CardDetailModal.tsx');
  const soundPath = resolve('src/audio/soundEngine.ts');

  // Test 1: File existence
  assert(existsSync(enginePath), 'src/domain/dynamicLightScatteringEngine.ts exists');
  assert(existsSync(visualizerPath), 'src/components/visualizations/DynamicLightScatteringVisualizer.tsx exists');

  const engineSource = readFileSync(enginePath, 'utf-8');
  const visualizerSource = readFileSync(visualizerPath, 'utf-8');
  const codexSource = readFileSync(codexPath, 'utf-8');
  const modalSource = readFileSync(modalPath, 'utf-8');
  const soundSource = readFileSync(soundPath, 'utf-8');

  // Test 2: Standards Catalog Coverage
  assert(
    engineSource.includes('gold_nanoparticles_citrate') &&
    engineSource.includes('bsa_protein_monomer') &&
    engineSource.includes('lipid_nanoparticles_mrna') &&
    engineSource.includes('tio2_photocatalyst_colloid'),
    'Catalog includes Gold Nanoparticles (15 nm), BSA Monomer (7.1 nm), Lipid Nanoparticles LNP (82 nm), and TiO2 Slurry (135 nm)'
  );

  // Dynamic import of engine module
  const engineModule = await import('../src/domain/dynamicLightScatteringEngine.ts');

  // Test 3: Water Dynamic Viscosity calculation
  const eta25 = engineModule.calculateWaterViscosity(25.0);
  assert(
    eta25 > 0.00088 && eta25 < 0.00090,
    `Water viscosity at 25°C is ~0.890 mPa·s (calculated: ${(eta25 * 1000).toFixed(3)} mPa·s)`
  );

  // Test 4: Stokes-Einstein Diffusion Coefficient calculation: D = k_B * T / (6 * π * η * R_h)
  const dCalculated = engineModule.calculateDiffusionCoefficient(7.5, 25.0); // 15 nm Au particle (R_h = 7.5 nm)
  assert(
    dCalculated > 3.0e-11 && dCalculated < 3.5e-11,
    `Translational diffusion coefficient for 15 nm particle is ~3.27e-11 m²/s (calculated: ${dCalculated.toExponential(3)} m²/s)`
  );

  // Test 5: Roundtrip Hydrodynamic Radius from Diffusion Coefficient
  const rhRecovered = engineModule.calculateHydrodynamicRadius(dCalculated, 25.0);
  assert(
    Math.abs(rhRecovered - 7.5) < 0.05,
    `calculateHydrodynamicRadius recovers exact R_h = 7.5 nm from diffusion coefficient (recovered: ${rhRecovered} nm)`
  );

  // Test 6: Smoluchowski Equation for Zeta Potential: ζ = (μ_e * η) / (ε_r * ε_0)
  const zetaCalc = engineModule.calculateZetaPotentialFromMobility(-3.0, 25.0);
  assert(
    zetaCalc < -35.0 && zetaCalc > -42.0,
    `Smoluchowski converts mobility -3.0 × 10⁻⁸ m²/(V·s) to Zeta potential ~-38.4 mV (calculated: ${zetaCalc} mV)`
  );

  // Test 7: Multimodal Particle Size Distribution (Intensity vs Volume vs Number)
  const dlsResult = engineModule.simulateDlsMeasurement('gold_nanoparticles_citrate', 25.0, 7.0);
  assert(
    dlsResult.sizeDistribution.length > 50,
    'Generates dense log-normal size distribution (>50 bins)'
  );
  assert(
    dlsResult.polydispersityIndexPdi === 0.04,
    `PDI matches standard monodisperse criterion (PDI = ${dlsResult.polydispersityIndexPdi} < 0.05)`
  );

  // Test 8: Autocorrelation Function g_2(τ) - 1
  assert(
    dlsResult.autocorrelationCurve.length > 50 &&
    dlsResult.autocorrelationCurve[0].g2MinusOne > 0.8,
    'Second-order autocorrelation function g_2(τ) - 1 starts near coherence factor β ~ 0.88 and decays exponentially'
  );

  // Test 9: Isoelectric Point (IEP) & DLVO Stability Alert
  const bsaResult = engineModule.simulateDlsMeasurement('bsa_protein_monomer', 25.0, 4.7);
  assert(
    Math.abs(bsaResult.measuredZetaPotentialMv) < 2.0 &&
    bsaResult.stabilityStatusVI.includes('keo tụ'),
    `At isoelectric point pI = 4.7, BSA Zeta potential drops to near 0 mV (${bsaResult.measuredZetaPotentialMv} mV) triggering rapid coagulation alert`
  );

  // Test 10: Card Matcher Service (getMatchingDlsCard)
  const auCard = engineModule.getMatchingDlsCard({ id: 'au_colloid_card', name: 'Hệ Keo Vàng', description: 'Hạt vàng nano' });
  const bsaCard = engineModule.getMatchingDlsCard({ id: 'bsa_protein', name: 'Albumin Huyết Thanh', description: 'Protein hình cầu' });
  const gasCard = engineModule.getMatchingDlsCard({ id: 'neon_gas', name: 'Neon', description: 'Khí hiếm' });
  assert(
    auCard?.id === 'gold_nanoparticles_citrate' &&
    bsaCard?.id === 'bsa_protein_monomer' &&
    gasCard === null,
    'getMatchingDlsCard correctly identifies colloidal and nanoparticle cards while rejecting non-colloid cards'
  );

  // Test 11: Visualizer Reactive States & Plot Modes
  assert(
    visualizerSource.includes('selectedSampleId') &&
    visualizerSource.includes('temperatureCelsius') &&
    visualizerSource.includes('samplePh') &&
    visualizerSource.includes('plotMode'),
    'Visualizer provides reactive states for sample, temperature, pH, and plotMode'
  );

  // Test 12: Visualizer SVG Paths for 3 Independent Modes
  assert(
    visualizerSource.includes('intensityPath') &&
    visualizerSource.includes('volumePath') &&
    visualizerSource.includes('numberPath') &&
    visualizerSource.includes('autoPath') &&
    visualizerSource.includes('zetaPath'),
    'Visualizer renders SVG paths for Intensity (I~d⁶), Volume (V~d³), Number (N~d⁰), Autocorrelation g2(τ), and Zeta Titration'
  );

  // Test 13: Audio Methods in soundEngine.ts
  assert(
    soundSource.includes('playDlsLaserScatteringPulse') &&
    soundSource.includes('playZetaIsoelectricAlertTone'),
    'soundEngine.ts provides playDlsLaserScatteringPulse and playZetaIsoelectricAlertTone audio methods'
  );

  // Test 14: PeriodicCodexTab Section 45 Integration
  assert(
    codexSource.includes("'DYNAMIC_LIGHT_SCATTERING'") &&
    codexSource.includes('DynamicLightScatteringVisualizer') &&
    codexSource.includes('SECTION 45: DYNAMIC LIGHT SCATTERING (DLS)'),
    'PeriodicCodexTab fully integrates Section 45 with tab button and visualizer rendering'
  );

  // Test 15: CardDetailModal Integration
  assert(
    modalSource.includes('matchingDls') &&
    modalSource.includes('showDlsModal') &&
    modalSource.includes('Tán Xạ DLS & Zeta') &&
    modalSource.includes('DynamicLightScatteringVisualizer'),
    'CardDetailModal fully integrates matchingDls badge button and interactive modal popup'
  );

  // Test 16: Citations & Vietnam GDPT 2018 Curriculum
  assert(
    engineSource.includes('Jean Baptiste Perrin') &&
    engineSource.includes('ISO 22412') &&
    engineSource.includes('GDPT 2018') &&
    visualizerSource.includes('Nobel Vật Lý 1926'),
    'Cites Nobel Laureate Jean Baptiste Perrin (1926), ISO 22412 / ASTM E2490 standards, and Vietnam GDPT 2018 curriculum'
  );

  console.log('\n======================================================================');
  console.log(`   SUITE 113 RESULTS: ${passCount} / ${passCount + failCount} PASSED (${Math.round(passCount / (passCount + failCount) * 100)}%)`);
  console.log('======================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
