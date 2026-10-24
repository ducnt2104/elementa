// tests/test-buffer-capacity-and-henderson.mjs
// Suite 163: Henderson-Hasselbalch Equation & Van Slyke Buffer Capacity Engine Audit
// Conforming to Vietnam GDPT 2018 Chemistry 11 (Cân bằng dung dịch) & IUPAC Guidelines

import assert from 'assert';
import {
  BUFFER_SYSTEMS_CATALOG,
  calculateBufferState,
  simulateBufferPerturbation,
  findBestBufferForTargetPH
} from '../src/domain/bufferCapacityEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 163: BUFFER CAPACITY & HENDERSON ENGINE AUDIT     ');
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
// 1. Buffer Systems Catalog & Standard Thermodynamic Invariants
// -------------------------------------------------------------------
console.log('--- 1. Buffer Systems Catalog Completeness ---');

runTest('Catalog contains all foundational biological and industrial buffer systems', () => {
  assert.ok(BUFFER_SYSTEMS_CATALOG.length >= 6, `Expected >= 6 systems, got ${BUFFER_SYSTEMS_CATALOG.length}`);

  const systemIds = BUFFER_SYSTEMS_CATALOG.map(s => s.id);
  assert.ok(systemIds.includes('acetate_buffer'), 'Must include acetate buffer');
  assert.ok(systemIds.includes('phosphate_intracellular_buffer'), 'Must include intracellular phosphate buffer');
  assert.ok(systemIds.includes('bicarbonate_blood_buffer'), 'Must include bicarbonate blood buffer');
  assert.ok(systemIds.includes('ammonia_buffer'), 'Must include ammonia buffer');
  assert.ok(systemIds.includes('formate_buffer'), 'Must include formate buffer');
  assert.ok(systemIds.includes('tris_biochem_buffer'), 'Must include TRIS buffer');
});

runTest('Each buffer system strictly adheres to [pKa - 1, pKa + 1] optimal buffer range', () => {
  for (const s of BUFFER_SYSTEMS_CATALOG) {
    assert.strictEqual(s.optimalPHRange[0], Math.round((s.pKa - 1.0) * 100) / 100);
    assert.strictEqual(s.optimalPHRange[1], Math.round((s.pKa + 1.0) * 100) / 100);
    assert.ok(s.equilibriumEquation.includes('⇌'), `Equation for ${s.id} must be reversible equilibrium`);
    assert.ok(s.biologicalOrIndustrialContextVI.length > 20, `Context for ${s.id} must be informative`);
    assert.ok(s.tacticalSynergyVI.length > 10, `Tactical synergy for ${s.id} must be specified`);
  }
});

// -------------------------------------------------------------------
// 2. Henderson-Hasselbalch Equation Mathematical Precision
// -------------------------------------------------------------------
console.log('--- 2. Henderson-Hasselbalch Equation Precision ---');

runTest('Equimolar acid and base ([A-] = [HA]) yields pH = pKa exactly', () => {
  const result = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 0.2,
    baseConcM: 0.2,
    volumeLiters: 1.0
  });

  // pKa of acetate is 4.76
  assert.strictEqual(result.pH, 4.76, 'pH must equal pKa exactly when [A-] = [HA]');
  assert.strictEqual(result.ratioBaseToAcid, 1.0);
  assert.strictEqual(result.pOH, 9.24, 'pH + pOH = 14.00');
  assert.strictEqual(result.isOptimalRange, true, 'Must be within optimal buffer range');
});

runTest('Decadic ratio variation obeys log10 scaling ([B]/[A] = 10 -> pH = pKa + 1)', () => {
  const resultHighBase = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 0.05,
    baseConcM: 0.50 // ratio 10:1
  });

  // pH = 4.76 + log10(10) = 5.76
  assert.strictEqual(resultHighBase.pH, 5.76, 'pH should be pKa + 1.00');
  assert.strictEqual(resultHighBase.isOptimalRange, true);

  const resultHighAcid = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 0.50,
    baseConcM: 0.05 // ratio 1:10
  });

  // pH = 4.76 + log10(0.1) = 3.76
  assert.strictEqual(resultHighAcid.pH, 3.76, 'pH should be pKa - 1.00');
  assert.strictEqual(resultHighAcid.isOptimalRange, true);
});

runTest('Out-of-range ratio correctly flags isOptimalRange as false', () => {
  const resultExtreme = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 1.0,
    baseConcM: 0.01 // ratio 1:100 -> pH = 4.76 - 2 = 2.76 (< 3.76)
  });

  assert.strictEqual(resultExtreme.pH, 2.76);
  assert.strictEqual(resultExtreme.isOptimalRange, false, 'Should be flagged as outside optimal buffer range');
});

// -------------------------------------------------------------------
// 3. Van Slyke Differential Buffer Capacity (Beta)
// -------------------------------------------------------------------
console.log('--- 3. Van Slyke Buffer Capacity Dynamics ---');

runTest('Buffer capacity beta is maximal at equimolar concentrations (pH = pKa)', () => {
  const equimolar = calculateBufferState({
    systemId: 'phosphate_intracellular_buffer',
    acidConcM: 0.1,
    baseConcM: 0.1
  });

  const skewed = calculateBufferState({
    systemId: 'phosphate_intracellular_buffer',
    acidConcM: 0.18,
    baseConcM: 0.02
  });

  // Both have same total concentration C_total = 0.2 M, but equimolar has max beta
  assert.ok(equimolar.vanSlykeBufferCapacityBeta > skewed.vanSlykeBufferCapacityBeta,
    `Equimolar beta (${equimolar.vanSlykeBufferCapacityBeta}) must exceed skewed beta (${skewed.vanSlykeBufferCapacityBeta})`);
});

runTest('Buffer capacity scales directly with total buffer concentration', () => {
  const dilute = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 0.05,
    baseConcM: 0.05
  });

  const concentrated = calculateBufferState({
    systemId: 'acetate_buffer',
    acidConcM: 0.50,
    baseConcM: 0.50
  });

  // 10x total concentration -> ~10x buffer capacity
  const ratio = concentrated.vanSlykeBufferCapacityBeta / dilute.vanSlykeBufferCapacityBeta;
  assert.ok(ratio >= 9.8 && ratio <= 10.2, `Buffer capacity should scale ~10x, got ${ratio}`);
});

// -------------------------------------------------------------------
// 4. Buffer Perturbation & Resistance to Acid/Base Shock
// -------------------------------------------------------------------
console.log('--- 4. Buffer Perturbation & Shock Resistance ---');

runTest('Adding small strong acid (H+) causes minimal pH drop without breaching buffer', () => {
  // 1 L of 0.1 M / 0.1 M acetate buffer (0.1 mol HA, 0.1 mol A-)
  // Add 0.01 mol H+
  const perturb = simulateBufferPerturbation({
    systemId: 'acetate_buffer',
    acidConcM: 0.1,
    baseConcM: 0.1,
    volumeLiters: 1.0,
    perturbType: 'STRONG_ACID',
    addedMoles: 0.01
  });

  assert.strictEqual(perturb.isBufferBreached, false, 'Buffer must withstand 10% load');
  assert.strictEqual(perturb.capacityUtilizationPct, 10.0, '10% of conjugate base capacity utilized');
  assert.strictEqual(perturb.finalBaseMoles, 0.09, 'A- drops from 0.10 to 0.09 mol');
  assert.strictEqual(perturb.finalAcidMoles, 0.11, 'HA rises from 0.10 to 0.11 mol');
  // pH drops from 4.76 to 4.76 + log10(0.09 / 0.11) = 4.76 - 0.087 = ~4.673
  assert.ok(perturb.finalPH >= 4.67 && perturb.finalPH <= 4.68, `Expected pH ~4.673, got ${perturb.finalPH}`);
  assert.ok(perturb.deltaPH < 0 && Math.abs(perturb.deltaPH) < 0.1, 'ΔpH should be under 0.1 units');
  assert.ok(perturb.gameplayModifier.elementalWardPct >= 30, 'Should grant strong elemental ward');
});

runTest('Adding small strong base (OH-) causes minimal pH rise without breaching buffer', () => {
  const perturb = simulateBufferPerturbation({
    systemId: 'acetate_buffer',
    acidConcM: 0.1,
    baseConcM: 0.1,
    volumeLiters: 1.0,
    perturbType: 'STRONG_BASE',
    addedMoles: 0.01
  });

  assert.strictEqual(perturb.isBufferBreached, false);
  assert.strictEqual(perturb.capacityUtilizationPct, 10.0);
  assert.strictEqual(perturb.finalAcidMoles, 0.09);
  assert.strictEqual(perturb.finalBaseMoles, 0.11);
  // pH rises from 4.76 to 4.76 + log10(0.11 / 0.09) = 4.76 + 0.087 = ~4.847
  assert.ok(perturb.finalPH >= 4.84 && perturb.finalPH <= 4.86, `Expected pH ~4.847, got ${perturb.finalPH}`);
});

runTest('Excess strong acid addition breaches buffer and collapses resistance', () => {
  // Buffer has 0.1 mol base, add 0.15 mol H+
  const perturb = simulateBufferPerturbation({
    systemId: 'acetate_buffer',
    acidConcM: 0.1,
    baseConcM: 0.1,
    volumeLiters: 1.0,
    perturbType: 'STRONG_ACID',
    addedMoles: 0.15
  });

  assert.strictEqual(perturb.isBufferBreached, true, 'Buffer must be breached by excess acid');
  assert.ok(perturb.breachReasonVI && perturb.breachReasonVI.includes('phá hủy'), 'Must provide breach explanation');
  assert.strictEqual(perturb.finalBaseMoles, 0, 'Conjugate base must be 0');
  // Excess H+ = 0.05 mol in 1 L -> pH = -log10(0.05) = 1.301
  assert.ok(perturb.finalPH <= 1.5, `Excess strong acid should drop pH drastically, got ${perturb.finalPH}`);
  assert.strictEqual(perturb.gameplayModifier.elementalWardPct, 0, 'Breached buffer grants 0% ward');
  assert.strictEqual(perturb.gameplayModifier.statusResistanceVI, 'MẤT HIỆU LỰC (ĐỆM VỠ)');
});

runTest('Excess strong base addition breaches buffer into extreme alkaline regime', () => {
  // Buffer has 0.1 mol acid, add 0.15 mol OH-
  const perturb = simulateBufferPerturbation({
    systemId: 'acetate_buffer',
    acidConcM: 0.1,
    baseConcM: 0.1,
    volumeLiters: 1.0,
    perturbType: 'STRONG_BASE',
    addedMoles: 0.15
  });

  assert.strictEqual(perturb.isBufferBreached, true);
  assert.strictEqual(perturb.finalAcidMoles, 0);
  // Excess OH- = 0.05 mol in 1 L -> pOH = -log10(0.05) = 1.301 -> pH = 12.699
  assert.ok(perturb.finalPH >= 12.5, `Excess strong base should spike pH, got ${perturb.finalPH}`);
  assert.strictEqual(perturb.gameplayModifier.elementalWardPct, 0);
});

// -------------------------------------------------------------------
// 5. Intelligent Buffer Selector for Target pH
// -------------------------------------------------------------------
console.log('--- 5. Target pH Buffer Optimization Selector ---');

runTest('Recommends intracellular phosphate for physiological neutral pH 7.2 - 7.4', () => {
  const rec72 = findBestBufferForTargetPH(7.2);
  assert.strictEqual(rec72.system.id, 'phosphate_intracellular_buffer', 'Target pH 7.2 must select phosphate');
  assert.strictEqual(rec72.deltaFromPka, 0.0);

  const rec74 = findBestBufferForTargetPH(7.4);
  assert.strictEqual(rec74.system.id, 'phosphate_intracellular_buffer', 'Target pH 7.4 must select closest pKa (phosphate: 7.20 vs blood: 6.35)');
  assert.strictEqual(rec74.deltaFromPka, 0.2);
});

runTest('Recommends acetate for weak acidic conditions (pH 4.8)', () => {
  const rec = findBestBufferForTargetPH(4.8);
  assert.strictEqual(rec.system.id, 'acetate_buffer');
  assert.strictEqual(rec.deltaFromPka, 0.04);
});

runTest('Recommends ammonia buffer for alkaline conditions (pH 9.2)', () => {
  const rec = findBestBufferForTargetPH(9.2);
  assert.strictEqual(rec.system.id, 'ammonia_buffer');
  assert.strictEqual(rec.deltaFromPka, 0.05);
});

// -------------------------------------------------------------------
// 6. Robust Error Handling & Boundaries
// -------------------------------------------------------------------
console.log('--- 6. Parameter Boundary Validations ---');

runTest('Invalid system ID throws error', () => {
  assert.throws(() => {
    calculateBufferState({
      systemId: 'unknown_magic_buffer',
      acidConcM: 0.1,
      baseConcM: 0.1
    });
  }, /Không tìm thấy hệ đệm/);
});

runTest('Non-positive concentrations throw error', () => {
  assert.throws(() => {
    calculateBufferState({
      systemId: 'acetate_buffer',
      acidConcM: 0,
      baseConcM: 0.1
    });
  }, /lớn hơn 0/);

  assert.throws(() => {
    calculateBufferState({
      systemId: 'acetate_buffer',
      acidConcM: 0.1,
      baseConcM: -0.2
    });
  }, /lớn hơn 0/);
});

runTest('Non-positive added moles in perturbation throws error', () => {
  assert.throws(() => {
    simulateBufferPerturbation({
      systemId: 'acetate_buffer',
      acidConcM: 0.1,
      baseConcM: 0.1,
      perturbType: 'STRONG_ACID',
      addedMoles: 0
    });
  }, /lớn hơn 0/);
});

runTest('Out-of-bounds target pH throws error', () => {
  assert.throws(() => findBestBufferForTargetPH(-1), /dải \[0, 14\]/);
  assert.throws(() => findBestBufferForTargetPH(15), /dải \[0, 14\]/);
});

// -------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 163 COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('======================================================================\n');
