// test-surface-plasmon-visualizer.mjs
// Milestone 55: Test Suite 112 — Surface Plasmon Resonance (SPR), Kretschmann Configuration & Biomolecular Binding Kinetics Engine
// Standards: Otto Scherzer, Erich Kretschmann & Heinz Raether (1968 - Kretschmann Prism Coupling) & Biacore / GE Healthcare Standards
// Curriculum: Vietnam GDPT 2018 (Vật lý 11: Phản xạ toàn phần TIR; Hóa học 10: Tốc độ phản ứng & Hằng số tốc độ; Hóa học 12: Đại phân tử sinh học & Thuốc trúng đích)

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
console.log('   TEST SUITE 112: SPR KRETSCHMANN & BIOMOLECULAR KINETICS ENGINE');
console.log('======================================================================\n');

async function runTests() {
  const enginePath = resolve('src/domain/surfacePlasmonEngine.ts');
  const visualizerPath = resolve('src/components/visualizations/SurfacePlasmonVisualizer.tsx');
  const codexPath = resolve('src/components/PeriodicCodexTab.tsx');
  const modalPath = resolve('src/components/cards/CardDetailModal.tsx');
  const soundPath = resolve('src/audio/soundEngine.ts');

  // Test 1: File existence
  assert(existsSync(enginePath), 'src/domain/surfacePlasmonEngine.ts exists');
  assert(existsSync(visualizerPath), 'src/components/visualizations/SurfacePlasmonVisualizer.tsx exists');

  const engineSource = readFileSync(enginePath, 'utf-8');
  const visualizerSource = readFileSync(visualizerPath, 'utf-8');
  const codexSource = readFileSync(codexPath, 'utf-8');
  const modalSource = readFileSync(modalPath, 'utf-8');
  const soundSource = readFileSync(soundPath, 'utf-8');

  // Test 2: Standards Catalog Coverage
  assert(
    engineSource.includes('antibody_sars_cov2_spike') &&
    engineSource.includes('herceptin_her2_receptor') &&
    engineSource.includes('biotin_streptavidin_benchmark') &&
    engineSource.includes('small_molecule_aspirin_cox2'),
    'Catalog includes SARS-CoV-2 RBD mAb, Herceptin vs HER2, Biotin-Streptavidin, and Aspirin vs COX-2'
  );

  // Dynamic import of engine module
  const engineModule = await import('../src/domain/surfacePlasmonEngine.ts');

  // Test 3: Total Internal Reflection (TIR) Critical Angle
  const tirAngle = engineModule.calculateCriticalTirAngleDeg(1.517, 1.333);
  assert(
    tirAngle > 61.2 && tirAngle < 61.7,
    `Critical TIR angle for BK7 prism / water buffer is ~61.48° (calculated: ${tirAngle}°)`
  );

  // Test 4: Kretschmann Surface Plasmon Resonance Angle (θ_SPR > θ_crit)
  const sprAngle = engineModule.calculateSprResonanceAngleDeg(1.517, 1.333);
  assert(
    sprAngle > tirAngle && sprAngle > 64.0 && sprAngle < 75.0,
    `SPR resonance angle lies in the total internal reflection regime (θ_SPR = ${sprAngle}° > θ_c = ${tirAngle}°)`
  );

  // Test 5: Langmuir 1:1 Kinetics Simulation & Herceptin Affinity (K_D = 0.5 nM)
  const herceptinKinetics = engineModule.simulateSprKinetics('herceptin_her2_receptor', 10, 25);
  assert(
    herceptinKinetics.sensorgram.length > 100,
    'Generates dense real-time sensorgram (>100 data points across baseline, association, dissociation, regeneration)'
  );
  assert(
    Math.abs(herceptinKinetics.equilibriumKdNanomolar - 0.5) < 0.05,
    `Herceptin-HER2 equilibrium dissociation constant is 0.5 nM (500 pM) (calculated: ${herceptinKinetics.equilibriumKdNanomolar} nM)`
  );

  // Test 6: Biotin-Streptavidin Ultra-High Affinity (Femtomolar range)
  const biotinPair = engineModule.SPR_INTERACTIONS_CATALOG.biotin_streptavidin_benchmark;
  const kdFemto = biotinPair.dissociationRateKoff / biotinPair.associationRateKon;
  assert(
    kdFemto < 1e-12,
    `Streptavidin-Biotin non-covalent bond exhibits femtomolar affinity K_D = ${kdFemto.toExponential(2)} M (< 1 pM)`
  );

  // Test 7: Reflectivity Dip & Resonance Angle Shift (Δθ > 0)
  assert(
    herceptinKinetics.resonanceAngleShiftMillidegrees > 0,
    `Analyte binding induces positive resonance angle shift Δθ = +${herceptinKinetics.resonanceAngleShiftMillidegrees} mDeg`
  );
  const minReflectBaseline = Math.min(...herceptinKinetics.reflectivityCurveBaseline.map(p => p.reflectivityFraction));
  assert(
    minReflectBaseline < 0.10,
    `Kretschmann reflectivity curve drops sharply at resonance dip (R_min = ${(minReflectBaseline * 100).toFixed(1)}% < 10%)`
  );

  // Test 8: Card Matcher Service (getMatchingSprCard)
  const covidCard = engineModule.getMatchingSprCard({ id: 'sars_spike_vax', name: 'Kháng Thể Gai Spike', description: 'SARS-CoV-2' });
  const her2Card = engineModule.getMatchingSprCard({ id: 'herceptin_drug', name: 'Trastuzumab Herceptin', description: 'HER2 ung thư' });
  const copperCard = engineModule.getMatchingSprCard({ id: 'copper_wire', name: 'Đồng Cu', description: 'Kim loại dẫn điện' });
  assert(
    covidCard?.id === 'antibody_sars_cov2_spike' &&
    her2Card?.id === 'herceptin_her2_receptor' &&
    copperCard === null,
    'getMatchingSprCard accurately matches immunoglobulins and rejects non-SPR cards'
  );

  // Test 9: Visualizer Reactive States & Mode Switch
  assert(
    visualizerSource.includes('selectedInteractionId') &&
    visualizerSource.includes('analyteConcentrationNm') &&
    visualizerSource.includes('temperatureCelsius') &&
    visualizerSource.includes('displayMode'),
    'Visualizer provides reactive states for interaction pair, concentration, temperature, and display mode'
  );

  // Test 10: Dual SVG Rendering (Sensorgram R(t) and Kretschmann Dip R(θ))
  assert(
    visualizerSource.includes('sensorgramPath') &&
    visualizerSource.includes('baselineReflectPath') &&
    visualizerSource.includes('boundReflectPath') &&
    visualizerSource.includes('Đơn Vị Tín Hiệu Đáp Ứng R (Response Units - RU)') &&
    visualizerSource.includes('Hệ Số Phản Xạ Ánh Sáng R (Reflectivity %)'),
    'Visualizer supports both Sensorgram R(t) and Kretschmann Reflectivity Dip R(θ) views'
  );

  // Test 11: Audio Methods in soundEngine.ts
  assert(
    soundSource.includes('playSprResonanceDipSweep') &&
    soundSource.includes('playSprSensorgramBindingChime'),
    'soundEngine.ts provides playSprResonanceDipSweep and playSprSensorgramBindingChime audio methods'
  );

  // Test 12: PeriodicCodexTab Section 44 Integration
  assert(
    codexSource.includes("'SURFACE_PLASMON'") &&
    codexSource.includes('SurfacePlasmonVisualizer') &&
    codexSource.includes('SECTION 44: SURFACE PLASMON RESONANCE (SPR)'),
    'PeriodicCodexTab fully integrates Section 44 with tab button and visualizer rendering'
  );

  // Test 13: CardDetailModal Integration
  assert(
    modalSource.includes('matchingSpr') &&
    modalSource.includes('showSprModal') &&
    modalSource.includes('Cộng Hưởng SPR') &&
    modalSource.includes('SurfacePlasmonVisualizer'),
    'CardDetailModal fully integrates matchingSpr badge button and interactive modal popup'
  );

  // Test 14: Kretschmann Standards & Vietnam GDPT 2018 Curriculum
  assert(
    engineSource.includes('Kretschmann') &&
    engineSource.includes('Raether') &&
    engineSource.includes('Biacore') &&
    engineSource.includes('GDPT 2018') &&
    visualizerSource.includes('Kretschmann'),
    'Cites Kretschmann, Raether, Biacore standards, and Vietnam GDPT 2018 curriculum'
  );

  console.log('\n======================================================================');
  console.log(`   SUITE 112 RESULTS: ${passCount} / ${passCount + failCount} PASSED (${Math.round(passCount / (passCount + failCount) * 100)}%)`);
  console.log('======================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
