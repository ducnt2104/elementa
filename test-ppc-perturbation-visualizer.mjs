import assert from 'node:assert';
import {
  PPC_STANDARD_CATALOG,
  WATER_DENSITY_MAX_TEMP_CELSIUS,
  STANDARD_PPC_PRESSURE_JUMP_BAR,
  calculateWaterThermalExpansionKInv,
  calculateProteinThermalExpansionKInv,
  calculatePpcHeatEffectMicroJoules,
  simulatePpcExperiment,
  getMatchingPpcCard,
  validatePpcStandardPhysics,
} from './src/domain/ppcEngine.ts';

console.log('🧪 ====================================================================');
console.log('🧪 ELEMENTA TEST SUITE 140: PRESSURE PERTURBATION CALORIMETRY (PPC)');
console.log('🧪 Thermal Expansion alpha(T) · Cavity Volume · Solvation Clathrate');
console.log('🧪 ====================================================================\n');

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
runTest('PPC Catalog contains 5 international benchmark pressure perturbation systems', () => {
  assert.strictEqual(PPC_STANDARD_CATALOG.length, 5, 'Must contain 5 benchmark standards');
  const ids = PPC_STANDARD_CATALOG.map((s) => s.id);
  assert.ok(ids.includes('lysozyme_hewl_solvation_shell'), 'Must include Lysozyme HEWL');
  assert.ok(ids.includes('ribonuclease_a_negative_unfolding_volume'), 'Must include RNase A');
  assert.ok(ids.includes('bovine_serum_albumin_cavity_compression'), 'Must include BSA');
  assert.ok(ids.includes('myoglobin_heme_pocket_hydration'), 'Must include Myoglobin');
  assert.ok(ids.includes('pure_water_density_anomaly_metrology'), 'Must include Pure Water Anomaly');
});

runTest('Pure water standard anchors metrological zero-expansion point at 3.98 °C', () => {
  const water = PPC_STANDARD_CATALOG.find((s) => s.id === 'pure_water_density_anomaly_metrology');
  assert.ok(water, 'Water standard must exist');
  assert.strictEqual(water.applicationCategory, 'WATER_ANOMALY_METROLOGY');
  assert.strictEqual(water.partialSpecificVolumeCm3PerG, 1.000, 'Partial specific volume of water is 1.000 cm^3/g');
  assert.strictEqual(water.nativeThermalExpansionKInv, 0.0, 'alpha must be 0.0 at 3.98 °C');
  assert.ok(validatePpcStandardPhysics(water), 'Water standard physics must validate');
});

runTest('Lysozyme HEWL exhibits significant thermal expansion step jump upon unfolding', () => {
  const hewl = PPC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hewl_solvation_shell');
  assert.ok(hewl, 'HEWL standard must exist');
  assert.strictEqual(hewl.unfoldingTmCelsius, 65.4, 'Tm must be 65.4 °C');
  assert.ok(hewl.denaturedThermalExpansionKInv > hewl.nativeThermalExpansionKInv, 'Denatured alpha > native alpha');
  assert.ok(hewl.volumeChangeOfUnfoldingMlPerMol < 0, 'Unfolding volume is negative due to hydrophobic exposure');
  assert.ok(validatePpcStandardPhysics(hewl), 'HEWL physics must validate');
});

runTest('RNase A and BSA capture internal cavity volume compression', () => {
  const rnase = PPC_STANDARD_CATALOG.find((s) => s.id === 'ribonuclease_a_negative_unfolding_volume');
  assert.strictEqual(rnase.internalCavityVolumeAngstrom3, 520, 'RNase A cavity volume must be 520 A^3');

  const bsa = PPC_STANDARD_CATALOG.find((s) => s.id === 'bovine_serum_albumin_cavity_compression');
  assert.strictEqual(bsa.internalCavityVolumeAngstrom3, 1250, 'BSA cavity volume must be 1,250 A^3');
  assert.strictEqual(bsa.volumeChangeOfUnfoldingMlPerMol, -46.0, 'BSA negative unfolding volume must be -46 mL/mol');
});

// -----------------------------------------------------------------------------
// 2. Physical Constants & Pure Water Anomaly
// -----------------------------------------------------------------------------
runTest('Water thermal expansion crosses zero at exactly 3.98 °C and is negative below it', () => {
  assert.strictEqual(WATER_DENSITY_MAX_TEMP_CELSIUS, 3.98, 'Maximum density temperature must be 3.98 °C');
  assert.strictEqual(STANDARD_PPC_PRESSURE_JUMP_BAR, 5.0, 'Pressure jump must be 5.0 bar');

  const alphaAt398 = calculateWaterThermalExpansionKInv(3.98);
  assert.strictEqual(alphaAt398, 0.0, 'Water thermal expansion must be exactly 0.0 at 3.98 °C');

  // Below 3.98 °C (e.g. 1.0 °C), water expands upon cooling (alpha < 0)
  const alphaAt1C = calculateWaterThermalExpansionKInv(1.0);
  assert.ok(alphaAt1C < 0, 'Water thermal expansion must be negative below 3.98 °C');

  // Above 3.98 °C (e.g. 20.0 °C), water expands upon heating (alpha > 0)
  const alphaAt20C = calculateWaterThermalExpansionKInv(20.0);
  assert.ok(alphaAt20C > 0, 'Water thermal expansion must be positive above 3.98 °C');
  assert.ok(alphaAt20C > 1.5e-4, 'Water alpha at 20 °C must be around 2.0e-4 K^-1');

  // Physiological temperature (37 °C)
  const alphaAt37C = calculateWaterThermalExpansionKInv(37.0);
  assert.ok(alphaAt37C > 3.0e-4 && alphaAt37C < 4.5e-4, 'Water alpha at 37 °C must be around 3.6e-4 K^-1');
});

runTest('Pressure jump heat effect Delta Q correctly vanishes when sample and reference match', () => {
  const temp = 25.0; // °C
  const alphaSample = 2.0e-4;
  const alphaRef = 2.0e-4;

  const heatZero = calculatePpcHeatEffectMicroJoules(temp, alphaSample, alphaRef);
  assert.strictEqual(heatZero, 0.0, 'Delta Q must be exactly 0 uJ when thermal expansion is matched');

  // If sample expands more than reference (alphaSample > alphaRef) during positive pressure jump (+5 bar),
  // thermodynamic expansion work causes Delta Q < 0 (exothermic heat output)
  const heatExo = calculatePpcHeatEffectMicroJoules(temp, 4.0e-4, 2.0e-4);
  assert.ok(heatExo < 0, 'Positive Delta alpha causes exothermic negative heat pulse for +5 bar jump');
});

// -----------------------------------------------------------------------------
// 3. Protein Thermal Expansion & Unfolding Step
// -----------------------------------------------------------------------------
runTest('Protein thermal expansion exhibits sigmoidal jump at transition temperature Tm', () => {
  const hewl = PPC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hewl_solvation_shell');

  const alphaNative20 = calculateProteinThermalExpansionKInv(20.0, hewl);
  const alphaDenat80 = calculateProteinThermalExpansionKInv(80.0, hewl);

  assert.ok(alphaNative20 < 4.5e-4, 'Native lysozyme alpha must be around 3.8e-4 K^-1');
  assert.ok(alphaDenat80 > 7.5e-4, 'Denatured lysozyme alpha must be around 8.0e-4 K^-1');
  assert.ok(alphaDenat80 > alphaNative20 * 1.8, 'Denatured state must have > 80% higher expansion than native');
});

// -----------------------------------------------------------------------------
// 4. Experiment Simulation
// -----------------------------------------------------------------------------
runTest('simulatePpcExperiment produces comprehensive multi-temperature profile and volumetric scores', () => {
  const bsa = PPC_STANDARD_CATALOG.find((s) => s.id === 'bovine_serum_albumin_cavity_compression');
  const sim = simulatePpcExperiment(bsa, 50);

  assert.ok(sim, 'Simulation result must exist');
  assert.strictEqual(sim.points.length, 50, 'Must produce requested number of points');
  assert.strictEqual(sim.pressureJumpBar, 5.0, 'Pressure jump must be 5.0 bar');
  assert.strictEqual(sim.apparentVolumetricChangeMlPerMol, -46.0, 'Volumetric change must match standard');
  assert.ok(sim.fractionalCavityHydrationPercent > 50, 'BSA cavity hydration percent must be > 50%');
  assert.ok(sim.solvationShellOrderScore > 0, 'Solvation shell order score must be > 0');
});

// -----------------------------------------------------------------------------
// 5. Card Matching Heuristic
// -----------------------------------------------------------------------------
runTest('getMatchingPpcCard maps cards to pressure perturbation calorimetry standards', () => {
  const waterCard = { name: 'Nước cất siêu sạch', description: 'Nở vì nhiệt dị thường ở 3.98 độ C' };
  const match1 = getMatchingPpcCard(waterCard);
  assert.ok(match1, 'Must match water anomaly card');
  assert.strictEqual(match1.id, 'pure_water_density_anomaly_metrology');

  const lysozymeCard = { name: 'Protein Lysozyme', description: 'Lớp vỏ hydrat hóa solvation shell clathrate' };
  const match2 = getMatchingPpcCard(lysozymeCard);
  assert.ok(match2, 'Must match lysozyme card');
  assert.strictEqual(match2.id, 'lysozyme_hewl_solvation_shell');

  const rnaseCard = { name: 'Enzyme RNase A', description: 'Thể tích biến tính âm và sụp đổ hốc rỗng' };
  const match3 = getMatchingPpcCard(rnaseCard);
  assert.ok(match3, 'Must match RNase card');
  assert.strictEqual(match3.id, 'ribonuclease_a_negative_unfolding_volume');

  const bsaCard = { name: 'Bovine Serum Albumin', description: 'Nén hốc rỗng cavity compression' };
  const match4 = getMatchingPpcCard(bsaCard);
  assert.ok(match4, 'Must match BSA card');
  assert.strictEqual(match4.id, 'bovine_serum_albumin_cavity_compression');

  const myoCard = { name: 'Huyết sắc tố Myoglobin', description: 'Túi Heme và apomyoglobin' };
  const match5 = getMatchingPpcCard(myoCard);
  assert.ok(match5, 'Must match myoglobin card');
  assert.strictEqual(match5.id, 'myoglobin_heme_pocket_hydration');

  const unrelated = { name: 'Đồng Sunfat CuSO4', description: 'Muối ngậm nước màu xanh lam' };
  assert.strictEqual(getMatchingPpcCard(unrelated), null, 'Unrelated card must return null');
});

console.log('\n====================================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (100% Pass)`);
console.log('====================================================================\n');
