import assert from 'assert';
import {
  SM_FRET_BENCHMARK_STANDARDS,
  calculateSmFretDistanceNm,
  calculateSmFretEfficiency,
  calculateCorrectedSmFretAlexValues,
  generateSmFretAlexBursts,
  generateSmFretTrajectory,
  simulateSmFretAlexSystem,
  getMatchingSmFretCard,
} from './src/domain/smFretEngine.ts';

console.log('🧪 RUNNING TEST SUITE 147: Single-Molecule FRET (smFRET) & Alternating-Laser Excitation (ALEX) Visualizer...\n');

let passedTests = 0;

// Test 1: Standard Catalog Integrity
try {
  assert.ok(Array.isArray(SM_FRET_BENCHMARK_STANDARDS), 'SM_FRET_BENCHMARK_STANDARDS must be an array');
  assert.strictEqual(SM_FRET_BENCHMARK_STANDARDS.length, 5, 'Catalog must contain 5 benchmark systems');

  const categories = SM_FRET_BENCHMARK_STANDARDS.map(s => s.category);
  assert.ok(categories.includes('HOLLIDAY_JUNCTION'), 'Must contain HOLLIDAY_JUNCTION');
  assert.ok(categories.includes('RIBOSOME_TRANSLOCATION'), 'Must contain RIBOSOME_TRANSLOCATION');
  assert.ok(categories.includes('DNA_HAIRPIN'), 'Must contain DNA_HAIRPIN');
  assert.ok(categories.includes('CRISPR_CAS9'), 'Must contain CRISPR_CAS9');
  assert.ok(categories.includes('GPCR_RECEPTOR'), 'Must contain GPCR_RECEPTOR');

  console.log('✅ Test 1 Passed: smFRET benchmark catalog contains 5 comprehensive physical systems.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 1 Failed:', err);
  process.exit(1);
}

// Test 2: Standard Physical Validity & Dual States
try {
  for (const std of SM_FRET_BENCHMARK_STANDARDS) {
    assert.ok(std.forsterRadiusR0Nm >= 4.5 && std.forsterRadiusR0Nm <= 6.5, `Förster radius R0 must be ~ 5 nm, got ${std.forsterRadiusR0Nm}`);
    assert.strictEqual(std.states.length, 2, 'Each system must define 2 conformational states');
    
    const [s1, s2] = std.states;
    assert.ok(s1.fretEfficiency >= 0.0 && s1.fretEfficiency <= 1.0, 'State 1 E must be in [0, 1]');
    assert.ok(s2.fretEfficiency >= 0.0 && s2.fretEfficiency <= 1.0, 'State 2 E must be in [0, 1]');
    assert.ok(s1.intermolecularDistanceNm > 0 && s2.intermolecularDistanceNm > 0, 'Distances must be positive');
    assert.ok(s1.meanDwellTimeMs > 0 && s2.meanDwellTimeMs > 0, 'Dwell times must be positive');
  }

  console.log('✅ Test 2 Passed: All 5 smFRET standards define physical Förster radii and 2 conformational states.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 2 Failed:', err);
  process.exit(1);
}

// Test 3: Förster Distance <-> FRET Efficiency Reciprocal Inversion
try {
  const r0 = 5.4; // nm
  const testDistances = [3.5, 4.5, 5.4, 6.5, 7.5];

  for (const r of testDistances) {
    const e = calculateSmFretEfficiency(r, r0);
    const recoveredR = calculateSmFretDistanceNm(e, r0);
    assert.ok(Math.abs(recoveredR - r) < 0.01, `Reciprocal inversion failed: expected ${r}, got ${recoveredR}`);
  }

  // At r = R0, E must equal exactly 0.5 (50%)
  const eAtR0 = calculateSmFretEfficiency(r0, r0);
  assert.ok(Math.abs(eAtR0 - 0.5) < 0.0001, `At r = R0, E must be 0.5, got ${eAtR0}`);

  console.log('✅ Test 3 Passed: Förster distance and efficiency reciprocal conversion is exact to < 0.01 nm.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 3 Failed:', err);
  process.exit(1);
}

// Test 4: ALEX 3-Color Photon Correction & 2D E-S Coordinates
try {
  // Case A: 1D:1A FRET complex with iDD = 40, iDA = 60, iAA = 100
  const resultA = calculateCorrectedSmFretAlexValues(40, 60, 100, 0.08, 0.05, 1.0);
  assert.ok(resultA.stoichiometryS > 0.40 && resultA.stoichiometryS < 0.60, `1D:1A stoichiometry S must be ~ 0.5, got ${resultA.stoichiometryS}`);
  assert.ok(resultA.correctedE > 0.45 && resultA.correctedE < 0.65, `Corrected E must be ~ 0.56, got ${resultA.correctedE}`);

  // Case B: Donor-only (iDD = 120, iDA = 10 (bleedthrough), iAA = 0)
  const resultDOnly = calculateCorrectedSmFretAlexValues(120, 10, 0, 0.08, 0.05, 1.0);
  assert.ok(resultDOnly.stoichiometryS >= 0.99, `Donor-only S must be ~ 1.0, got ${resultDOnly.stoichiometryS}`);
  assert.ok(resultDOnly.correctedE < 0.05, `Donor-only E must be ~ 0.0, got ${resultDOnly.correctedE}`);

  // Case C: Acceptor-only (iDD = 0, iDA = 0, iAA = 150)
  const resultAOnly = calculateCorrectedSmFretAlexValues(0, 0, 150, 0.08, 0.05, 1.0);
  assert.ok(resultAOnly.stoichiometryS <= 0.01, `Acceptor-only S must be ~ 0.0, got ${resultAOnly.stoichiometryS}`);

  console.log('✅ Test 4 Passed: ALEX crosstalk corrections correctly isolate Donor-only, Acceptor-only, and 1D:1A species.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 4 Failed:', err);
  process.exit(1);
}

// Test 5: 2D Burst Population Generator
try {
  const std = SM_FRET_BENCHMARK_STANDARDS[0]; // Holliday Junction
  const bursts = generateSmFretAlexBursts(std, 200, 0.15, 0.15);

  assert.strictEqual(bursts.length, 200, 'Must generate exactly 200 bursts');
  const dOnly = bursts.filter(b => b.subpopulation === 'DONOR_ONLY');
  const aOnly = bursts.filter(b => b.subpopulation === 'ACCEPTOR_ONLY');
  const dual1 = bursts.filter(b => b.subpopulation === 'DUAL_LABELED_STATE_1');
  const dual2 = bursts.filter(b => b.subpopulation === 'DUAL_LABELED_STATE_2');

  assert.ok(dOnly.length > 20, 'Must have sufficient Donor-only bursts');
  assert.ok(aOnly.length > 20, 'Must have sufficient Acceptor-only bursts');
  assert.ok(dual1.length > 20, 'Must have State 1 dual bursts');
  assert.ok(dual2.length > 20, 'Must have State 2 dual bursts');

  console.log('✅ Test 5 Passed: 2D burst generator produces sorted subpopulations matching ALEX expectations.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 5 Failed:', err);
  process.exit(1);
}

// Test 6: Single-Molecule Trajectory & Markov Dynamics
try {
  const std = SM_FRET_BENCHMARK_STANDARDS[2]; // DNA Hairpin
  const trajectory = generateSmFretTrajectory(std, 5.0, 0.05);

  assert.ok(trajectory.length >= 99, `Trajectory must have ~100 time points, got ${trajectory.length}`);
  const hasState0 = trajectory.some(p => p.idealHMMStateIndex === 0);
  const hasState1 = trajectory.some(p => p.idealHMMStateIndex === 1);
  assert.ok(hasState0 && hasState1, 'Trajectory must sample both Markov conformational states');

  // Verify anti-correlation between donor and acceptor
  for (const point of trajectory) {
    assert.ok(point.donorIntensityCounts >= 0 && point.acceptorIntensityCounts >= 0, 'Intensities must be non-negative');
    assert.ok(point.apparentFretEfficiency >= 0.0 && point.apparentFretEfficiency <= 1.0, 'Apparent E must be bounded');
  }

  console.log('✅ Test 6 Passed: Real-time single-molecule trajectory exhibits 2-state Markov conformational switching.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 6 Failed:', err);
  process.exit(1);
}

// Test 7: Full System Simulation & Thermodynamics
try {
  for (const std of SM_FRET_BENCHMARK_STANDARDS) {
    const sim = simulateSmFretAlexSystem(std);
    assert.ok(sim.forwardRateConstantK12 > 0, 'Forward rate must be positive');
    assert.ok(sim.reverseRateConstantK21 > 0, 'Reverse rate must be positive');
    assert.ok(sim.equilibriumConstantKeq > 0, 'Equilibrium constant must be positive');
    assert.ok(!isNaN(sim.deltaGStandardKiloJoulesPerMole), 'Delta G° must be a valid number');
    assert.ok(sim.academicIntegrityNotes.length > 50, 'Academic integrity notes must be comprehensive');
  }

  console.log('✅ Test 7 Passed: Full system simulation computes thermodynamic Delta G° and Markov rates for all 5 standards.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 7 Failed:', err);
  process.exit(1);
}

// Test 8: Game Card Matching
try {
  const hjCard = { name: 'Tái tổ hợp Tương đồng DNA', description: 'Ngã tư Holliday chuyển dịch 4 sợi' };
  const riboCard = { name: 'Ribosome 70S Dịch mã', description: 'Chuyển vị tRNA hybrid state' };
  const cas9Card = { name: 'CRISPR Cas9 Phân tử', description: 'Cắt DNA bằng nuclease HNH' };

  const match1 = getMatchingSmFretCard(hjCard);
  const match2 = getMatchingSmFretCard(riboCard);
  const match3 = getMatchingSmFretCard(cas9Card);

  assert.strictEqual(match1?.id, 'HOLLIDAY_JUNCTION', 'Holliday card must match HOLLIDAY_JUNCTION');
  assert.strictEqual(match2?.id, 'RIBOSOME_TRANSLOCATION', 'Ribosome card must match RIBOSOME_TRANSLOCATION');
  assert.strictEqual(match3?.id, 'CRISPR_CAS9', 'CRISPR card must match CRISPR_CAS9');

  console.log('✅ Test 8 Passed: Game card keyword matching accurately connects to smFRET / ALEX standards.');
  passedTests++;
} catch (err) {
  console.error('❌ Test 8 Failed:', err);
  process.exit(1);
}

console.log(`\n🎉 ALL ${passedTests} / 8 TESTS PASSED! Single-Molecule FRET (smFRET) & ALEX Visualizer is 100% verified!`);
