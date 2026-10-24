import assert from 'node:assert';
import {
  RMM_STANDARD_CATALOG,
  WATER_DENSITY_20C_G_CM3,
  HEAVY_WATER_DENSITY_G_CM3,
  SMR_RESONATOR_F0_HZ,
  SMR_EFFECTIVE_MASS_NANOGRAMS,
  calculateBuoyantMassFemtograms,
  calculateFrequencyShiftHz,
  calculateApparentDryDiameterNm,
  calculateTwoFluidDensityGPerCm3,
  simulateRmmExperiment,
  getMatchingRmmCard,
  validateRmmStandardPhysics,
} from '../src/domain/rmmEngine.ts';

console.log('🧪 ========================================================');
console.log('🧪 ELEMENTA TEST SUITE 138: RESONANT MASS MEASUREMENT (RMM)');
console.log('🧪 Archimedes SMR · Buoyant Mass · Positive/Negative Shifts');
console.log('🧪 ========================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}`);
    throw err;
  }
}

// -----------------------------------------------------------------------------
// 1. Standards Catalog Verification
// -----------------------------------------------------------------------------
runTest('RMM Catalog contains 5 benchmark suspended microchannel resonator systems', () => {
  assert.strictEqual(RMM_STANDARD_CATALOG.length, 5, 'Must contain 5 benchmark standards');
  const ids = RMM_STANDARD_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('prefilled_syringe_igg_silicone'), 'Must include Pre-filled Syringe QC');
  assert.ok(ids.includes('yeast_single_cell_growth_biomass'), 'Must include Yeast Single-Cell Biomass');
  assert.ok(ids.includes('gold_nanoparticle_extreme_density'), 'Must include Gold Calibrant');
  assert.ok(ids.includes('bacterial_endospore_dehydration'), 'Must include Bacterial Endospore');
  assert.ok(ids.includes('environmental_microplastics_debris'), 'Must include Microplastics');
});

runTest('Pre-filled syringe standard contains both positive and negative buoyant populations', () => {
  const std = RMM_STANDARD_CATALOG.find((s) => s.id === 'prefilled_syringe_igg_silicone');
  assert.ok(std, 'Pre-filled syringe standard must exist');
  assert.strictEqual(std.applicationCategory, 'PREFILLED_SYRINGE_QC');
  assert.strictEqual(std.populations.length, 2, 'Must have protein aggregate and silicone oil populations');

  const proteinAgg = std.populations.find((p) => p.name.includes('IgG'));
  assert.ok(proteinAgg, 'Protein aggregate population must exist');
  assert.strictEqual(proteinAgg.buoyancySign, 'NEGATIVE_BUOYANT');
  assert.ok(proteinAgg.nominalDensityGPerCm3 > std.carrierFluidDensityGPerCm3, 'Protein density > fluid density');

  const siliconeOil = std.populations.find((p) => p.name.includes('Silicone'));
  assert.ok(siliconeOil, 'Silicone oil population must exist');
  assert.strictEqual(siliconeOil.buoyancySign, 'POSITIVE_BUOYANT');
  assert.ok(siliconeOil.nominalDensityGPerCm3 < std.carrierFluidDensityGPerCm3, 'Silicone oil density < fluid density');

  assert.ok(validateRmmStandardPhysics(std), 'Standard physics must validate as true');
});

runTest('Gold nanoparticle standard reflects extreme density (19.32 g/cm^3)', () => {
  const std = RMM_STANDARD_CATALOG.find((s) => s.id === 'gold_nanoparticle_extreme_density');
  assert.ok(std, 'Gold standard must exist');
  assert.strictEqual(std.populations[0].nominalDensityGPerCm3, 19.32, 'Gold density must be 19.32 g/cm^3');
  assert.strictEqual(std.populations[0].buoyancySign, 'NEGATIVE_BUOYANT');
  assert.ok(validateRmmStandardPhysics(std), 'Gold standard physics must validate');
});

// -----------------------------------------------------------------------------
// 2. Physical Constants and Fundamental Formulas
// -----------------------------------------------------------------------------
runTest('SMR fundamental resonator frequency and cantilever effective mass are calibrated', () => {
  assert.strictEqual(SMR_RESONATOR_F0_HZ, 405000.0, 'f_0 must be 405 kHz');
  assert.strictEqual(SMR_EFFECTIVE_MASS_NANOGRAMS, 2.45, 'M_eff must be 2.45 ng');
  assert.strictEqual(WATER_DENSITY_20C_G_CM3, 0.9982, 'Water density must be 0.9982 g/cm^3');
  assert.strictEqual(HEAVY_WATER_DENSITY_G_CM3, 1.1050, 'Heavy water density must be 1.1050 g/cm^3');
});

runTest('Buoyant mass formula correctly differentiates positive and negative buoyancy', () => {
  const diameterNm = 1000; // 1 micron particle
  const fluidDensity = 1.0; // g/cm^3

  // Dense particle: 1.30 g/cm^3 (protein aggregate)
  const denseBuoyantMass = calculateBuoyantMassFemtograms(diameterNm, 1.30, fluidDensity);
  assert.ok(denseBuoyantMass > 0, 'Dense particle must have positive buoyant mass (> 0 fg)');

  // Light particle: 0.96 g/cm^3 (silicone oil)
  const lightBuoyantMass = calculateBuoyantMassFemtograms(diameterNm, 0.96, fluidDensity);
  assert.ok(lightBuoyantMass < 0, 'Light particle must have negative buoyant mass (< 0 fg)');

  // Neutral particle: 1.00 g/cm^3
  const neutralBuoyantMass = calculateBuoyantMassFemtograms(diameterNm, 1.0, fluidDensity);
  assert.ok(Math.abs(neutralBuoyantMass) < 1e-9, 'Neutrally buoyant particle must have ~0 fg buoyant mass');
});

runTest('Frequency shift sign obeys cantilever mechanics: Delta f = - (f_0 / 2 M_eff) * m_b', () => {
  // If m_b > 0 (dense particle), Delta f must be NEGATIVE (frequency drop)
  const shiftDense = calculateFrequencyShiftHz(100.0); // 100 fg
  assert.ok(shiftDense < 0, 'Positive buoyant mass causes negative frequency shift (drop)');

  // If m_b < 0 (light particle / silicone oil), Delta f must be POSITIVE (frequency peak)
  const shiftLight = calculateFrequencyShiftHz(-100.0); // -100 fg
  assert.ok(shiftLight > 0, 'Negative buoyant mass causes positive frequency shift (peak)');
});

// -----------------------------------------------------------------------------
// 3. Two-Fluid Density Extraction (H2O vs D2O) & Dry Diameter
// -----------------------------------------------------------------------------
runTest('Two-fluid density calculation extracts true particle density without geometric bias', () => {
  const trueRho = 1.32; // g/cm^3
  const diameterNm = 1200; // nm
  const rho1 = WATER_DENSITY_20C_G_CM3;
  const rho2 = HEAVY_WATER_DENSITY_G_CM3;

  const mb1 = calculateBuoyantMassFemtograms(diameterNm, trueRho, rho1);
  const mb2 = calculateBuoyantMassFemtograms(diameterNm, trueRho, rho2);

  const calculatedDensity = calculateTwoFluidDensityGPerCm3(mb1, mb2, rho1, rho2);
  assert.ok(Math.abs(calculatedDensity - trueRho) < 1e-3, 'Extracted density must match true density within 0.001 g/cm^3');
});

runTest('Equivalent spherical diameter accurately reconstructs original particle size from dry mass', () => {
  const diameter = 850; // nm
  const density = 1.32; // g/cm^3
  const dryMassFg = (4.0 / 3.0) * Math.PI * Math.pow((diameter / 2) * 1e-7, 3) * density * 1e15;
  const reconstructedD = calculateApparentDryDiameterNm(dryMassFg, density);
  assert.ok(Math.abs(reconstructedD - diameter) < 1.0, 'Reconstructed diameter must be within 1 nm of original');
});

// -----------------------------------------------------------------------------
// 4. Experiment Simulation & Transits
// -----------------------------------------------------------------------------
runTest('simulateRmmExperiment generates realistic baseline, pulses, and discrimination', () => {
  const std = RMM_STANDARD_CATALOG.find((s) => s.id === 'prefilled_syringe_igg_silicone');
  const sim = simulateRmmExperiment(std, 25);

  assert.ok(sim, 'Simulation result must not be null');
  assert.strictEqual(sim.totalEventsCount, 25, 'Must produce 25 events');
  assert.strictEqual(sim.events.length, 25, 'Events array must have 25 items');
  assert.ok(sim.standard.uspStandardRef, 'Must include USP reference');
  assert.ok(sim.standard.curriculumNotes, 'Must include GDPT 2018 context');
  assert.ok(sim.resolvedSiliconOilVsProteinRatio, 'Must report silicone oil vs protein ratio');

  // Verify that both positive and negative peak events are recorded in prefilled syringe
  const hasNegativeShifts = sim.events.some((e) => e.peakFrequencyShiftHz < 0);
  const hasPositiveShifts = sim.events.some((e) => e.peakFrequencyShiftHz > 0);
  assert.ok(hasNegativeShifts, 'Simulation must record negative frequency shifts (protein aggregates)');
  assert.ok(hasPositiveShifts, 'Simulation must record positive frequency shifts (silicone oil droplets)');

  // Verify pulse traces
  const firstEvent = sim.events[0];
  assert.ok(firstEvent.pulseTrace.length > 5, 'Event must have high-resolution transit pulse points');
  assert.ok(firstEvent.equivalentDiameterNm > 0, 'Equivalent diameter must be > 0 nm');
  assert.ok(firstEvent.dryMassFemtograms > 0, 'Dry mass must be > 0 fg');
});

// -----------------------------------------------------------------------------
// 5. Card Matching Heuristic
// -----------------------------------------------------------------------------
runTest('getMatchingRmmCard maps relevant cards to RMM standards', () => {
  const syringeCard = { name: 'Dầu silicon ống tiêm', description: 'Kiểm nghiệm hạt vi tiểu phân USP 1788' };
  const match1 = getMatchingRmmCard(syringeCard);
  assert.ok(match1, 'Must match silicone oil card');
  assert.strictEqual(match1.id, 'prefilled_syringe_igg_silicone');

  const yeastCard = { name: 'Tế bào nấm men', description: 'Đo lường sinh khối và chu kỳ tế bào' };
  const match2 = getMatchingRmmCard(yeastCard);
  assert.ok(match2, 'Must match yeast card');
  assert.strictEqual(match2.id, 'yeast_single_cell_growth_biomass');

  const goldCard = { name: 'Hạt nano vàng', description: 'Chuẩn độ tỷ trọng cao density calibrant' };
  const match3 = getMatchingRmmCard(goldCard);
  assert.ok(match3, 'Must match gold card');
  assert.strictEqual(match3.id, 'gold_nanoparticle_extreme_density');

  const sporeCard = { name: 'Bào tử Bacillus', description: 'Độ mất nước màng spore coat' };
  const match4 = getMatchingRmmCard(sporeCard);
  assert.ok(match4, 'Must match spore card');
  assert.strictEqual(match4.id, 'bacterial_endospore_dehydration');

  const plasticCard = { name: 'Vi nhựa đại dương', description: 'Microplastic polymer mảnh vỡ' };
  const match5 = getMatchingRmmCard(plasticCard);
  assert.ok(match5, 'Must match microplastic card');
  assert.strictEqual(match5.id, 'environmental_microplastics_debris');

  const unrelated = { name: 'Axit Clohidric', description: 'Axit mạnh vô cơ' };
  assert.strictEqual(getMatchingRmmCard(unrelated), null, 'Unrelated card must return null');
});

console.log('\n========================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (100% Pass)`);
console.log('========================================================\n');
