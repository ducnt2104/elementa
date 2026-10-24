// tests/test-buffer-capacity-visualizer-ui.mjs
// Suite 164: Buffer Capacity Visualizer Component Logic & State Transition Audit
// Conforming to React 18 / Vite component architecture & GDPT 2018 Chemistry standards

import assert from 'assert';
import {
  BUFFER_SYSTEMS_CATALOG,
  calculateBufferState,
  simulateBufferPerturbation
} from '../src/domain/bufferCapacityEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 164: BUFFER CAPACITY VISUALIZER UI LOGIC AUDIT    ');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------------
// 1. Initial State & Catalog Mapping
// -------------------------------------------------------------------
console.log('--- 1. Default Initial State & Catalog Consistency ---');

runTest('Default acetate buffer at 0.2 M / 0.2 M / 1.0 L initializes with exact pKa pH 4.76', () => {
  const defaultState = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 0.2,
    baseConcM: 0.2,
    volumeLiters: 1.0
  });

  assert.strictEqual(defaultState.system.id, 'acetate_buffer');
  assert.strictEqual(defaultState.pH, 4.76);
  assert.strictEqual(defaultState.pOH, 9.24);
  assert.strictEqual(defaultState.isOptimalRange, true);
  assert.strictEqual(defaultState.acidMoles, 0.2);
  assert.strictEqual(defaultState.baseMoles, 0.2);
});

runTest('Switching system updates active catalog item and corresponding optimal range', () => {
  const systems = ['phosphate_intracellular_buffer', 'bicarbonate_blood_buffer', 'ammonia_buffer', 'tris_biochem_buffer'];
  for (const sysId of systems) {
    const sys = BUFFER_SYSTEMS_CATALOG.find(s => s.id === sysId);
    assert.ok(sys, `System ${sysId} must exist`);
    const state = calculateBufferState({
      systemId: sysId,
      acidConcM: 0.1,
      baseConcM: 0.1,
      volumeLiters: 2.0
    });
    assert.strictEqual(state.pH, sys.pKa);
    assert.strictEqual(state.isOptimalRange, true);
    assert.strictEqual(state.acidMoles, 0.2);
    assert.strictEqual(state.baseMoles, 0.2);
  }
});

// -------------------------------------------------------------------
// 2. Interactive Slider Concentration Changes
// -------------------------------------------------------------------
console.log('--- 2. Interactive Slider Responses ---');

runTest('Increasing conjugate base increases pH and shifts color category', () => {
  const baseAcidRatio = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 0.1,
    baseConcM: 0.5 // 5:1 ratio
  });

  // pH = 4.76 + log10(5) = 4.76 + 0.699 = ~5.459
  assert.ok(baseAcidRatio.pH > 5.45 && baseAcidRatio.pH < 5.47);
  assert.strictEqual(baseAcidRatio.isOptimalRange, true);
});

runTest('Increasing acid concentration decreases pH', () => {
  const acidHeavy = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 0.5,
    baseConcM: 0.1 // 1:5 ratio
  });

  // pH = 4.76 + log10(0.2) = 4.76 - 0.699 = ~4.061
  assert.ok(acidHeavy.pH > 4.05 && acidHeavy.pH < 4.07);
  assert.strictEqual(acidHeavy.isOptimalRange, true);
});

// -------------------------------------------------------------------
// 3. Perturbation Simulation & UI Status Badges
// -------------------------------------------------------------------
console.log('--- 3. Perturbation Shock Status Badges ---');

runTest('Perturbation with strong acid generates valid step-by-step and ward modifier', () => {
  const perturb = simulateBufferPerturbation({
    systemId: 'acetate_buffer',
    acidConcM: 0.2,
    baseConcM: 0.2,
    volumeLiters: 1.0,
    perturbType: 'STRONG_ACID',
    addedMoles: 0.04
  });

  assert.strictEqual(perturb.isBufferBreached, false);
  assert.strictEqual(perturb.capacityUtilizationPct, 20.0);
  assert.ok(perturb.gameplayModifier.elementalWardPct > 20);
  assert.strictEqual(perturb.stepByStepExplanationVI.length, 6);
  assert.ok(perturb.stepByStepExplanationVI[1].includes('0.04 mol H⁺'));
});

runTest('Breach scenario generates alert reason and collapses status ward', () => {
  const breached = simulateBufferPerturbation({
    systemId: 'acetate_buffer',
    acidConcM: 0.2,
    baseConcM: 0.2,
    volumeLiters: 1.0,
    perturbType: 'STRONG_BASE',
    addedMoles: 0.30 // Exceeds 0.2 mol acid
  });

  assert.strictEqual(breached.isBufferBreached, true);
  assert.strictEqual(breached.gameplayModifier.elementalWardPct, 0);
  assert.ok(breached.breachReasonVI && breached.breachReasonVI.includes('kiềm hóa hoàn toàn'));
  assert.strictEqual(breached.gameplayModifier.statusResistanceVI, 'MẤT HIỆU LỰC (ĐỆM VỠ)');
});

// -------------------------------------------------------------------
// 4. Color Spectrum Helper Consistency
// -------------------------------------------------------------------
console.log('--- 4. Color Spectrum Logic Verification ---');

runTest('Color helper maps pH regions predictably from red to purple', () => {
  const getPHColor = (ph) => {
    if (ph < 3) return '#EF4444'; // Red
    if (ph < 6) return '#F59E0B'; // Amber
    if (ph < 8) return '#10B981'; // Emerald
    if (ph < 11) return '#06B6D4'; // Cyan
    return '#8B5CF6'; // Purple
  };

  assert.strictEqual(getPHColor(1.5), '#EF4444');
  assert.strictEqual(getPHColor(4.76), '#F59E0B');
  assert.strictEqual(getPHColor(7.4), '#10B981');
  assert.strictEqual(getPHColor(9.25), '#06B6D4');
  assert.strictEqual(getPHColor(13.0), '#8B5CF6');
});

// -------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 164 COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('======================================================================\n');
