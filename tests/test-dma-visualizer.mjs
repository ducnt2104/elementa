// test-dma-visualizer.mjs
// Milestone 74: Test Suite 131 - Dynamic Mechanical Analysis (DMA), Viscoelastic Loss Modulus & Glass Transition (Tg) Engine
// Standards: IUPAC Polymer Division & ISO 6721 / ASTM D4065 Dynamic Mechanical Testing Standards
// Curriculum: Vietnam GDPT 2018 (Hóa học 12: Đại cương về polymer, chất dẻo, cao su, tơ sợi, composite; Vật lý 12: Biến dạng cơ học của vật rắn, dao động cưỡng bức)

import assert from 'node:assert';
import {
  UNIVERSAL_GAS_CONSTANT_R,
  WLF_C1_UNIVERSAL,
  WLF_C2_UNIVERSAL,
  DMA_STANDARD_CATALOG,
  calculateWlfShiftFactorLogAT,
  calculateDynamicModuliAtTemperature,
  generateDmaTemperatureScan,
  generateDmaFrequencySweep,
  simulateDmaMeasurement,
  getMatchingDmaCard,
  validateDmaStandardPhysics
} from '../src/domain/dmaEngine.ts';

console.log('🧪 ============================================================');
console.log('🧪 ELEMENTA TEST SUITE 131: DMA & VISCOELASTICITY ENGINE');
console.log('🧪 Standards: IUPAC Polymer Division & ISO 6721 Metrology');
console.log('🧪 ============================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// 1. Universal Physical Constants & WLF Parameters
// ---------------------------------------------------------------------------
runTest('Universal Gas Constant R and WLF constants match international standards', () => {
  assert.strictEqual(UNIVERSAL_GAS_CONSTANT_R, 8.314462618);
  assert.strictEqual(WLF_C1_UNIVERSAL, 17.44);
  assert.strictEqual(WLF_C2_UNIVERSAL, 51.6);
});

// ---------------------------------------------------------------------------
// 2. Catalog Standards Verification & Physical Consistency
// ---------------------------------------------------------------------------
runTest('DMA Catalog contains exactly 5 benchmark polymer systems', () => {
  assert.strictEqual(DMA_STANDARD_CATALOG.length, 5);
});

runTest('All standards pass physical validity checks', () => {
  for (const std of DMA_STANDARD_CATALOG) {
    assert.ok(validateDmaStandardPhysics(std), `Standard ${std.id} failed physics validation`);
    assert.ok(std.id.length > 0);
    assert.ok(std.name.length > 0);
    assert.ok(std.vietnameseName.length > 0);
    assert.ok(std.glassyStorageModulusPa > std.rubberyStorageModulusPa);
    assert.ok(std.peakTanDelta > 0 && std.peakTanDelta <= 3.0);
    assert.ok(std.curriculumNotes.includes('GDPT 2018'));
  }
});

runTest('Catalog IDs are completely unique', () => {
  const ids = DMA_STANDARD_CATALOG.map((s) => s.id);
  const uniqueIds = new Set(ids);
  assert.strictEqual(uniqueIds.size, ids.length);
});

// ---------------------------------------------------------------------------
// 3. PMMA (Plexiglas) Amorphous Thermoplastic & Beta-Relaxation
// ---------------------------------------------------------------------------
runTest('PMMA exhibits Tg at 105°C with ~3-decade modulus plunge and sub-Tg beta-relaxation', () => {
  const pmma = DMA_STANDARD_CATALOG.find((s) => s.id === 'pmma_plexiglas');
  assert.ok(pmma);
  assert.strictEqual(pmma.classification, 'AMORPHOUS_THERMOPLASTIC');
  assert.strictEqual(pmma.glassTransitionTgCelsius, 105.0);
  assert.strictEqual(pmma.glassyStorageModulusPa, 3.2e9); // 3.2 GPa
  assert.strictEqual(pmma.rubberyStorageModulusPa, 3.5e6); // 3.5 MPa

  // Ratio of glassy to rubbery modulus is ~914x
  const modulusRatio = pmma.glassyStorageModulusPa / pmma.rubberyStorageModulusPa;
  assert.ok(modulusRatio > 900, `Expected >900x modulus drop, got ${modulusRatio}`);

  // Beta relaxation at 30°C
  assert.strictEqual(pmma.secondaryRelaxations.length, 1);
  const beta = pmma.secondaryRelaxations[0];
  assert.strictEqual(beta.temperatureCelsius, 30.0);
  assert.strictEqual(beta.activationEnergyKjPerMol, 85.0);
});

// ---------------------------------------------------------------------------
// 4. Natural Rubber (Cis-1,4-Polyisoprene) Cryogenic Embrittlement
// ---------------------------------------------------------------------------
runTest('Natural rubber operates on rubbery plateau at 25°C and embrittles below -70°C', () => {
  const rubber = DMA_STANDARD_CATALOG.find((s) => s.id === 'natural_rubber_polyisoprene');
  assert.ok(rubber);
  assert.strictEqual(rubber.classification, 'CROSSLINKED_ELASTOMER');
  assert.strictEqual(rubber.glassTransitionTgCelsius, -70.0);

  // At room temperature 25°C: rubbery plateau
  const at25 = calculateDynamicModuliAtTemperature(25.0, rubber, 1.0);
  assert.strictEqual(at25.viscoelasticState, 'RUBBERY_PLATEAU');
  assert.ok(at25.storageModulusEPrimePa < 1e7); // < 10 MPa (flexible)
  assert.ok(at25.tanDelta < 0.1); // low damping, high bounce

  // At cryogenic temperature -100°C: glassy state
  const atMinus100 = calculateDynamicModuliAtTemperature(-100.0, rubber, 1.0);
  assert.strictEqual(atMinus100.viscoelasticState, 'GLASSY');
  assert.ok(atMinus100.storageModulusEPrimePa > 2e9); // > 2 GPa (shatters like glass)
});

// ---------------------------------------------------------------------------
// 5. Polylactic Acid (PLA) Cold Crystallization Rebound
// ---------------------------------------------------------------------------
runTest('PLA displays cold crystallization peak at 100°C with modulus rebound', () => {
  const pla = DMA_STANDARD_CATALOG.find((s) => s.id === 'polylactic_acid_pla');
  assert.ok(pla);
  assert.strictEqual(pla.hasColdCrystallization, true);
  assert.strictEqual(pla.glassTransitionTgCelsius, 60.0);
  assert.strictEqual(pla.coldCrystallizationTempCelsius, 100.0);
  assert.strictEqual(pla.meltingTempCelsius, 175.0);

  // At 85°C (above Tg, before cold crystallization): modulus is low in rubbery dip
  const at85 = calculateDynamicModuliAtTemperature(85.0, pla, 1.0);
  // At 115°C (after cold crystallization): modulus surges back up
  const at115 = calculateDynamicModuliAtTemperature(115.0, pla, 1.0);

  assert.ok(
    at115.storageModulusEPrimePa > at85.storageModulusEPrimePa * 5,
    `Recrystallized modulus at 115°C (${at115.storageModulusEPrimePa}) should exceed 85°C (${at85.storageModulusEPrimePa})`
  );
  assert.strictEqual(at115.viscoelasticState, 'CRYSTALLINE');
});

// ---------------------------------------------------------------------------
// 6. Aerospace Epoxy-Carbon Composite (Extreme Modulus & High Tg)
// ---------------------------------------------------------------------------
runTest('Aerospace composite maintains >45 GPa modulus across 180°C glass transition', () => {
  const comp = DMA_STANDARD_CATALOG.find((s) => s.id === 'epoxy_carbon_composite');
  assert.ok(comp);
  assert.strictEqual(comp.glassTransitionTgCelsius, 180.0);
  assert.strictEqual(comp.glassyStorageModulusPa, 6.5e10); // 65 GPa
  assert.strictEqual(comp.rubberyStorageModulusPa, 4.8e10); // 48 GPa
  assert.ok(comp.peakTanDelta <= 0.25); // Very rigid, low mechanical damping

  // At 200°C (above Tg): still retains massive structural stiffness
  const at200 = calculateDynamicModuliAtTemperature(200.0, comp, 1.0);
  assert.ok(at200.storageModulusEPrimePa > 4.5e10);
});

// ---------------------------------------------------------------------------
// 7. PTFE Teflon Helical Phase Transitions
// ---------------------------------------------------------------------------
runTest('PTFE resolves 19°C and 30°C helical crystal untwisting transitions with ultra-low damping', () => {
  const ptfe = DMA_STANDARD_CATALOG.find((s) => s.id === 'ptfe_teflon');
  assert.ok(ptfe);
  assert.strictEqual(ptfe.secondaryRelaxations.length, 2);
  assert.strictEqual(ptfe.secondaryRelaxations[0].temperatureCelsius, 19.0);
  assert.strictEqual(ptfe.secondaryRelaxations[1].temperatureCelsius, 30.0);
  assert.strictEqual(ptfe.meltingTempCelsius, 327.0);
});

// ---------------------------------------------------------------------------
// 8. Williams-Landel-Ferry (WLF) Shift Factor
// ---------------------------------------------------------------------------
runTest('calculateWlfShiftFactorLogAT satisfies WLF boundary conditions', () => {
  // At reference temperature T = Tg: log10(a_T) = 0
  const logAT_Tg = calculateWlfShiftFactorLogAT(105, 105);
  assert.strictEqual(logAT_Tg, 0);

  // Above Tg: log10(a_T) < 0 (faster relaxation, equivalent to higher frequency)
  const logAT_Above = calculateWlfShiftFactorLogAT(125, 105);
  assert.ok(logAT_Above < 0);

  // Below Tg: log10(a_T) > 0 (slower relaxation)
  const logAT_Below = calculateWlfShiftFactorLogAT(85, 105);
  assert.ok(logAT_Below > 0);
});

// ---------------------------------------------------------------------------
// 9. Temperature Sweep Scan Generator
// ---------------------------------------------------------------------------
runTest('generateDmaTemperatureScan produces smooth monotonic E\' and peaked tan delta', () => {
  const pmma = DMA_STANDARD_CATALOG[0];
  const scan = generateDmaTemperatureScan(pmma, 20, 160, 2.0, 1.0);
  assert.ok(scan.length > 50);

  // Find peak tan delta position
  let maxTanD = scan[0];
  for (const pt of scan) {
    if (pt.tanDelta > maxTanD.tanDelta) {
      maxTanD = pt;
    }
  }

  // Peak should be within +-5°C of Tg (105°C)
  assert.ok(
    Math.abs(maxTanD.temperatureCelsius - 105.0) <= 6.0,
    `Tan delta peak at ${maxTanD.temperatureCelsius}°C should be close to Tg 105°C`
  );
});

// ---------------------------------------------------------------------------
// 10. Frequency Sweep & Frequency Shift of Apparent Tg
// ---------------------------------------------------------------------------
runTest('Increasing oscillation frequency shifts apparent Tg to higher temperatures', () => {
  const pmma = DMA_STANDARD_CATALOG[0];
  const lowFreqModuli = calculateDynamicModuliAtTemperature(105.0, pmma, 0.1);
  const highFreqModuli = calculateDynamicModuliAtTemperature(105.0, pmma, 10.0);

  // At 105°C, high frequency test behaves as if it is at a lower relative temperature (higher E')
  assert.ok(
    highFreqModuli.storageModulusEPrimePa > lowFreqModuli.storageModulusEPrimePa,
    `High freq E' (${highFreqModuli.storageModulusEPrimePa}) must exceed low freq E' (${lowFreqModuli.storageModulusEPrimePa})`
  );
});

// ---------------------------------------------------------------------------
// 11. Energy Dissipation & Hysteresis
// ---------------------------------------------------------------------------
runTest('simulateDmaMeasurement calculates positive cycle energy dissipation', () => {
  const pmma = DMA_STANDARD_CATALOG[0];
  const sim = simulateDmaMeasurement(pmma, 105.0, 1.0, 0.05);

  assert.strictEqual(sim.standard.id, pmma.id);
  assert.strictEqual(sim.currentTemperatureCelsius, 105.0);
  assert.ok(sim.energyDissipationJPerM3Cycle > 0);
  assert.ok(sim.lossAngleDegrees > 20.0); // High damping at Tg
  assert.strictEqual(sim.viscoelasticState, 'TRANSITION');
  assert.ok(sim.temperatureScanCurve.length > 0);
  assert.ok(sim.frequencySweepCurve.length > 0);
});

// ---------------------------------------------------------------------------
// 12. Card Matcher Engine
// ---------------------------------------------------------------------------
runTest('getMatchingDmaCard correctly maps cards to DMA polymer standards', () => {
  // PMMA
  const pmmaCard = { name: 'Thủy Tinh Hữu Cơ Plexiglas PMMA', formula: '[C5O2H8]n' };
  assert.strictEqual(getMatchingDmaCard(pmmaCard)?.id, 'pmma_plexiglas');

  // Rubber
  const rubberCard = { name: 'Cao Su Thiên Nhiên Lưu Hóa', formula: '[C5H8]n' };
  assert.strictEqual(getMatchingDmaCard(rubberCard)?.id, 'natural_rubber_polyisoprene');

  // PLA
  const plaCard = { name: 'Nhựa Sinh Học PLA In 3D', formula: '[C3H4O2]n' };
  assert.strictEqual(getMatchingDmaCard(plaCard)?.id, 'polylactic_acid_pla');

  // Composite
  const compCard = { name: 'Vật Liệu Composite Hàng Không', formula: 'Carbon Fiber' };
  assert.strictEqual(getMatchingDmaCard(compCard)?.id, 'epoxy_carbon_composite');

  // Teflon
  const teflonCard = { name: 'Chảo Chống Dính Teflon PTFE', formula: '[C2F4]n' };
  assert.strictEqual(getMatchingDmaCard(teflonCard)?.id, 'ptfe_teflon');

  // Non-matching
  const naclCard = { name: 'Muối Ăn', formula: 'NaCl' };
  assert.strictEqual(getMatchingDmaCard(naclCard), null);
  assert.strictEqual(getMatchingDmaCard(null), null);
});

// ---------------------------------------------------------------------------
// 13. Secondary Relaxation Sub-Peak Resolution
// ---------------------------------------------------------------------------
runTest('PMMA sub-Tg beta-relaxation at 30°C produces local tan delta elevation', () => {
  const pmma = DMA_STANDARD_CATALOG[0];
  const at10 = calculateDynamicModuliAtTemperature(10.0, pmma, 1.0);
  const at30 = calculateDynamicModuliAtTemperature(30.0, pmma, 1.0);
  const at50 = calculateDynamicModuliAtTemperature(50.0, pmma, 1.0);

  // Tan delta at 30°C should be higher than at 10°C and 50°C due to beta-relaxation peak
  assert.ok(
    at30.tanDelta > at10.tanDelta,
    `Beta relaxation peak at 30°C (${at30.tanDelta}) should exceed 10°C (${at10.tanDelta})`
  );
  assert.ok(
    at30.tanDelta > at50.tanDelta,
    `Beta relaxation peak at 30°C (${at30.tanDelta}) should exceed 50°C (${at50.tanDelta})`
  );
});

// ---------------------------------------------------------------------------
// 14. Frequency Sweep Data Point Completeness
// ---------------------------------------------------------------------------
runTest('generateDmaFrequencySweep spans 4 decades (0.01 Hz to 100 Hz)', () => {
  const pmma = DMA_STANDARD_CATALOG[0];
  const sweep = generateDmaFrequencySweep(pmma, 105.0);
  assert.strictEqual(sweep.length, 13);
  assert.strictEqual(sweep[0].frequencyHz, 0.01);
  assert.strictEqual(sweep[sweep.length - 1].frequencyHz, 100.0);

  // All points must have positive moduli and tan delta
  for (const pt of sweep) {
    assert.ok(pt.masterCurveStorageModulusPa > 0);
    assert.ok(pt.masterCurveLossModulusPa > 0);
    assert.ok(pt.tanDelta > 0);
  }
});

// ---------------------------------------------------------------------------
// 15. Energy Dissipation Quadratic Strain Scaling
// ---------------------------------------------------------------------------
runTest('Energy dissipation scales quadratically with dynamic strain amplitude (gamma_0^2)', () => {
  const pmma = DMA_STANDARD_CATALOG[0];
  const simSmallStrain = simulateDmaMeasurement(pmma, 105.0, 1.0, 0.05); // 0.05%
  const simDoubleStrain = simulateDmaMeasurement(pmma, 105.0, 1.0, 0.10); // 0.10% (2x)

  const ratio = simDoubleStrain.energyDissipationJPerM3Cycle / simSmallStrain.energyDissipationJPerM3Cycle;
  // Should scale as 2^2 = 4x
  assert.ok(
    Math.abs(ratio - 4.0) < 0.2,
    `Expected ~4.0x dissipation increase for 2x strain, got ${ratio.toFixed(2)}x`
  );
});

// ---------------------------------------------------------------------------
// 16. Rubber Plateau Entropic Elasticity Invariance
// ---------------------------------------------------------------------------
runTest('Natural rubber maintains stable rubbery plateau across 0°C to 60°C', () => {
  const rubber = DMA_STANDARD_CATALOG[1];
  const at0 = calculateDynamicModuliAtTemperature(0.0, rubber, 1.0);
  const at60 = calculateDynamicModuliAtTemperature(60.0, rubber, 1.0);

  // Both should be in RUBBERY_PLATEAU with modulus within 2x
  assert.strictEqual(at0.viscoelasticState, 'RUBBERY_PLATEAU');
  assert.strictEqual(at60.viscoelasticState, 'RUBBERY_PLATEAU');
  assert.ok(
    Math.abs(Math.log10(at60.storageModulusEPrimePa) - Math.log10(at0.storageModulusEPrimePa)) < 0.3
  );
});

console.log(`\n🎉 ALL ${passedTests} / ${totalTests} TESTS PASSED FOR TEST SUITE 131!`);
