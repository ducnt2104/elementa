// test-osmosis-colligative-visualizer.mjs
// Test Suite 97: Chemical Osmosis, Colligative Properties & Van 't Hoff Factor Engine
// Standards: IUPAC Compendium of Analytical & Physical Chemistry + Vietnam GDPT 2018 (Hóa 10-12: Áp suất thẩm thấu, Tính chất nồng độ, Hệ số Van 't Hoff)

import assert from 'assert';
import {
  COLLIGATIVE_SOLUTES,
  GAS_CONSTANT_R_ATM,
  WATER_KB,
  WATER_KF,
  WATER_NORMAL_BP,
  WATER_NORMAL_FP,
  PHYSIOLOGICAL_OSMOTIC_PRESSURE_ATM,
  computeApparentVanTHoffI,
  calculateOsmoticPressure,
  calculateColligativeProperties,
  simulateReverseOsmosisDesalination,
  getMatchingOsmosisSolute,
} from '../src/domain/osmosisColligativeEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('💧 RUNNING TEST SUITE 97: CHEMICAL OSMOSIS & COLLIGATIVE PROPERTIES ENGINE');

let testsPassed = 0;

function runTest(name, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    process.exit(1);
  }
}

// 1. COLLIGATIVE_SOLUTES CATALOG INTEGRITY
runTest('COLLIGATIVE_SOLUTES catalog covers non-electrolytes, strong electrolytes and weak electrolytes', () => {
  const requiredSolutes = [
    'glucose',
    'sucrose',
    'urea',
    'sodium_chloride',
    'calcium_chloride',
    'magnesium_sulfate',
    'aluminum_sulfate',
    'acetic_acid',
  ];

  for (const solId of requiredSolutes) {
    const sol = COLLIGATIVE_SOLUTES[solId];
    assert(sol, `Missing solute definition: ${solId}`);
    assert(sol.formula, `Solute ${solId} missing formula`);
    assert(sol.molarMassGPerMol > 0, `Solute ${solId} invalid molar mass`);
    assert(sol.ionCountN >= 1, `Solute ${solId} invalid ion count`);
    assert(sol.theoreticalMaxI >= 1.0, `Solute ${solId} invalid theoreticalMaxI`);
    assert(sol.dissociationEquation.length > 5, `Solute ${solId} missing dissociation equation`);
  }
});

// 2. NON-ELECTROLYTE INVARIANT i = 1.0
runTest('Non-electrolyte solutes maintain Van \'t Hoff factor i = 1.0 across all concentrations', () => {
  const nonElectrolytes = ['glucose', 'sucrose', 'urea'];
  const testConcentrations = [0.001, 0.05, 0.1, 0.5, 1.0, 2.5];

  for (const id of nonElectrolytes) {
    const sol = COLLIGATIVE_SOLUTES[id];
    for (const C of testConcentrations) {
      const i = computeApparentVanTHoffI(sol, C);
      assert.strictEqual(i, 1.0, `${sol.name} must have i = 1.0 at ${C} M, got ${i}`);
    }
  }
});

// 3. STRONG ELECTROLYTE DILUTION LIMIT & INTERIONIC ATTRACTION
runTest('Strong electrolytes exhibit Debye-Hückel interionic depression and approach n at infinite dilution', () => {
  const nacl = COLLIGATIVE_SOLUTES.sodium_chloride;
  const cacl2 = COLLIGATIVE_SOLUTES.calcium_chloride;

  // At high dilution C = 0.001 M, i approaches theoretical limit n
  const iNaClDilute = computeApparentVanTHoffI(nacl, 0.001);
  assert(iNaClDilute > 1.95, `NaCl at 0.001 M should approach 2.0, got ${iNaClDilute}`);

  // At 0.1 M, interionic attractions lower i to ~1.90 for NaCl and ~2.70 for CaCl2
  const iNaCl01 = computeApparentVanTHoffI(nacl, 0.1);
  const iCaCl201 = computeApparentVanTHoffI(cacl2, 0.1);

  assert(Math.abs(iNaCl01 - 1.90) < 0.05, `NaCl at 0.1 M expected ~1.90, got ${iNaCl01}`);
  assert(Math.abs(iCaCl201 - 2.70) < 0.05, `CaCl2 at 0.1 M expected ~2.70, got ${iCaCl201}`);
});

// 4. WEAK ELECTROLYTE OSTWALD DILUTION LAW (ACETIC ACID)
runTest('Weak electrolyte acetic acid has degree of dissociation alpha << 1.0 and i ≈ 1.013 at 0.1 M', () => {
  const ch3cooh = COLLIGATIVE_SOLUTES.acetic_acid;
  const i01 = computeApparentVanTHoffI(ch3cooh, 0.1);

  // In 0.1 M acetic acid, alpha ≈ sqrt(1.75e-5 / 0.1) ≈ 0.0132 -> i = 1 + alpha ≈ 1.0132
  assert(Math.abs(i01 - 1.0132) < 0.005, `Acetic acid at 0.1 M expected i ≈ 1.013, got ${i01}`);
  assert(i01 < 1.05, 'Weak acid must not behave as strong electrolyte');
  assert(i01 > 1.0, 'Weak acid dissociation must increase particle count above 1.0');
});

// 5. OSMOTIC PRESSURE OF PHYSIOLOGICAL SALINE AT BODY TEMPERATURE
runTest('Van \'t Hoff law: 0.154 M NaCl at 37 °C matches physiological osmotic pressure Π ≈ 7.3 - 7.6 atm', () => {
  const result = calculateOsmoticPressure('sodium_chloride', 0.154, 310.15); // 37 °C

  // Π = i · C · R · T = 1.876 · 0.154 · 0.08206 · 310.15 ≈ 7.35 atm
  assert(Math.abs(result.osmoticPressureAtm - 7.35) < 0.3, `Expected ~7.35 atm, got ${result.osmoticPressureAtm} atm`);
  assert(result.osmoticPressureKPa > 700, `Expected >700 kPa, got ${result.osmoticPressureKPa} kPa`);
  assert.strictEqual(result.tonicity, 'ISOTONIC', '0.154 M NaCl must be classified as ISOTONIC');
  assert.strictEqual(result.rbcResponse, 'NORMAL_BICONCAVE', 'Isotonic solution maintains normal biconcave RBC');
});

// 6. PFEFFER CELL EQUILIBRIUM WATER COLUMN HEIGHT
runTest('Pfeffer osmometer column height is proportional to osmotic pressure: 1 atm ≈ 1033 cm H2O', () => {
  const result = calculateOsmoticPressure('glucose', 0.1, 298.15); // 25 °C
  // Π = 1.0 * 0.1 * 0.08206 * 298.15 = 2.446 atm
  // Column height = 2.446 * 1033.23 ≈ 2527 cm H2O
  assert(Math.abs(result.osmoticPressureAtm - 2.446) < 0.02, `Expected ~2.45 atm, got ${result.osmoticPressureAtm}`);
  assert(Math.abs(result.equilibriumWaterColumnHeightCm - 2527) < 30, `Expected ~2527 cm, got ${result.equilibriumWaterColumnHeightCm}`);
});

// 7. TONICITY AND RED BLOOD CELL MORPHOLOGY
runTest('Tonicity engine accurately flags hypotonic hemolysis and hypertonic crenation risks', () => {
  // Pure water or very dilute solution (hypotonic)
  const hypotonic = calculateOsmoticPressure('sodium_chloride', 0.02, 310.15);
  assert.strictEqual(hypotonic.tonicity, 'HYPOTONIC');
  assert.strictEqual(hypotonic.rbcResponse, 'TURGID_HEMOLYSIS');

  // Concentrated saline (hypertonic)
  const hypertonic = calculateOsmoticPressure('sodium_chloride', 0.8, 310.15);
  assert.strictEqual(hypertonic.tonicity, 'HYPERTONIC');
  assert.strictEqual(hypertonic.rbcResponse, 'CRENATION_SHRIVELED');
});

// 8. BOILING POINT ELEVATION (EBULLIOSCOPY)
runTest('Boiling point elevation ΔTb = i · Kb · m raises solution boiling point above 100.0 °C', () => {
  const result = calculateColligativeProperties('glucose', 1.0); // 1.0 m glucose, i = 1.0
  // ΔTb = 1.0 * 0.512 * 1.0 = 0.512 °C
  assert(Math.abs(result.deltaTbCelsius - 0.512) < 0.001, `Expected ΔTb = 0.512 °C, got ${result.deltaTbCelsius}`);
  assert(Math.abs(result.solutionBoilingPointCelsius - 100.512) < 0.001, 'Boiling point should be 100.512 °C');
});

// 9. FREEZING POINT DEPRESSION (CRYOSCOPY)
runTest('Freezing point depression ΔTf = i · Kf · m lowers solution freezing point below 0.0 °C', () => {
  const result = calculateColligativeProperties('glucose', 1.0); // 1.0 m glucose, i = 1.0
  // ΔTf = 1.0 * 1.86 * 1.0 = 1.86 °C -> FP = -1.86 °C
  assert(Math.abs(result.deltaTfCelsius - 1.86) < 0.001, `Expected ΔTf = 1.86 °C, got ${result.deltaTfCelsius}`);
  assert(Math.abs(result.solutionFreezingPointCelsius - (-1.86)) < 0.001, 'Freezing point should be -1.86 °C');
});

// 10. WATER COLLIGATIVE INVARIANT Kf / Kb = 3.633
runTest('Water colligative ratio invariant: Kf / Kb = 1.86 / 0.512 ≈ 3.633 for all solutes', () => {
  const solIds = ['glucose', 'sodium_chloride', 'calcium_chloride', 'aluminum_sulfate'];

  for (const id of solIds) {
    const prop = calculateColligativeProperties(id, 0.5);
    const actualRatio = prop.deltaTfCelsius / prop.deltaTbCelsius;
    assert(Math.abs(actualRatio - 3.633) < 0.01, `Ratio ΔTf/ΔTb must equal 3.633, got ${actualRatio.toFixed(3)}`);
    assert.strictEqual(prop.ebullioscopicVsCryoscopicRatio, 3.633);
  }
});

// 11. ROAD DE-ICING EFFICIENCY OF CaCl2 OVER NaCl AND GLUCOSE
runTest('Calcium chloride depresses freezing point significantly more than glucose due to i ≈ 2.7', () => {
  const propGlucose = calculateColligativeProperties('glucose', 1.0);
  const propCaCl2 = calculateColligativeProperties('calcium_chloride', 1.0);

  // CaCl2 produces much larger ΔTf than non-electrolyte Glucose
  assert(propCaCl2.deltaTfCelsius > propGlucose.deltaTfCelsius * 2.0, 'CaCl2 must lower freezing point by more than double glucose');
  assert(propCaCl2.solutionFreezingPointCelsius < -3.5, `CaCl2 1m should freeze below -3.5 °C, got ${propCaCl2.solutionFreezingPointCelsius}`);
});

// 12. RAOULTS LAW VAPOR PRESSURE LOWERING
runTest('Raoult\'s law lowers vapor pressure below pure water reference (23.76 mmHg at 25 °C)', () => {
  const prop = calculateColligativeProperties('sodium_chloride', 1.0);
  assert(prop.deltaPmmHg > 0, 'ΔP must be positive');
  assert(prop.vaporPressureMmHg < 23.76, 'Solution vapor pressure must be lower than pure water');
  assert(prop.vaporPressureMmHg > 20.0, 'Vapor pressure should remain in reasonable range');
});

// 13. INDUSTRIAL REVERSE OSMOSIS (SWRO) SIMULATION
runTest('Reverse osmosis model confirms seawater desalination feasibility when P_applied > P_osmotic', () => {
  // Seawater 35 g/L: osmotic pressure is ~27.5 atm (~27.9 bar)
  // At 65 bar (64.1 atm), net driving pressure > 25 atm -> Feasible desalination
  const swro65 = simulateReverseOsmosisDesalination(35.0, 65.0, 45);
  assert.strictEqual(swro65.isDesalinationFeasible, true, '65 bar SWRO must be feasible');
  assert(swro65.netDrivingPressureAtm > 20, 'Net driving pressure must be positive and substantial');
  assert(swro65.saltRejectionPercent > 99.0, `Salt rejection must exceed 99%, got ${swro65.saltRejectionPercent}%`);
  assert(swro65.permeateSalinityMgPerL <= 500, `Permeate TDS must meet WHO drinking water standard, got ${swro65.permeateSalinityMgPerL}`);

  // At 20 bar, applied pressure is below seawater osmotic pressure -> Desalination unfeasible
  const swro20 = simulateReverseOsmosisDesalination(35.0, 20.0, 45);
  assert.strictEqual(swro20.isDesalinationFeasible, false, '20 bar should fail against 35 g/L seawater');
  assert.strictEqual(swro20.permeateFluxLPerM2Hour, 0, 'No permeate flux should flow when unfeasible');
});

// 14. CARD MATCHING FOR COLLIGATIVE SOLUTES
runTest('getMatchingOsmosisSolute accurately identifies cards representing salts and sugars', () => {
  const cardSalt = { id: 'card_nacl', name: 'Natri Clorua Tinh Khiết (NaCl)' };
  const matchNaCl = getMatchingOsmosisSolute(cardSalt);
  assert(matchNaCl, 'Failed to match NaCl card');
  assert.strictEqual(matchNaCl.id, 'sodium_chloride');

  const cardGlucose = { id: 'card_glucose', name: 'D-Glucozơ C6H12O6' };
  const matchGlu = getMatchingOsmosisSolute(cardGlucose);
  assert(matchGlu, 'Failed to match Glucose card');
  assert.strictEqual(matchGlu.id, 'glucose');

  const cardCaCl2 = { id: 'card_cacl2', name: 'Canxi Clorua CaCl2' };
  const matchCaCl2 = getMatchingOsmosisSolute(cardCaCl2);
  assert(matchCaCl2, 'Failed to match CaCl2 card');
  assert.strictEqual(matchCaCl2.id, 'calcium_chloride');

  const cardInsolubleIron = { id: 'card_fe_metal', name: 'Thanh Sắt Fe' };
  const matchIron = getMatchingOsmosisSolute(cardInsolubleIron);
  assert.strictEqual(matchIron, null, 'Insoluble iron metal should not match any colligative solute');
});

// 15. AUDIO HOOKS INTEGRATION
runTest('SoundEngine includes playOsmoticFlowTrickle and playCellLysisPop effects', () => {
  assert(typeof sound.playOsmoticFlowTrickle === 'function', 'playOsmoticFlowTrickle exists');
  assert(typeof sound.playCellLysisPop === 'function', 'playCellLysisPop exists');

  // Trigger safely
  sound.playOsmoticFlowTrickle();
  sound.playCellLysisPop();
});

console.log(`\n🎉 TEST SUITE 97 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
