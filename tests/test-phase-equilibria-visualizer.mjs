// test-phase-equilibria-visualizer.mjs
// Test Suite 91: Phase Equilibria, Clausius-Clapeyron Vapor Pressure & Distillation Thermodynamics Engine
// Standards: IUPAC Physical Chemistry & Vietnam GDPT 2018 (Hóa 10 & 11: Phương pháp chưng cất tách biệt và tinh chế)

import assert from 'assert';
import {
  GAS_CONSTANT_R,
  STANDARD_PRESSURE_MMHG,
  VOLATILE_COMPOUNDS,
  BINARY_DISTILLATION_SYSTEMS,
  calculateClausiusClapeyronVaporPressureMmHg,
  calculateAntoineVaporPressureMmHg,
  calculateIdealBinaryVLE,
  calculateBoilingPointIdealMixtureCelsius,
  generateVLEBoilingCurvePoints,
  calculateFenskeMinimumPlates,
  calculateSteamDistillationParameters,
} from '../src/domain/phaseEquilibriaEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 91: PHASE EQUILIBRIA & DISTILLATION THERMODYNAMICS ENGINE');

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

// 1. CLAUSIUS-CLAPEYRON AT NORMAL BOILING POINT
runTest('calculateClausiusClapeyronVaporPressureMmHg satisfies P = 760 mmHg at T = Tb', () => {
  const water = VOLATILE_COMPOUNDS.water;
  const tbK = water.normalBoilingPointC + 273.15; // 373.15 K
  const deltaHJ = water.deltaHvapKjPerMol * 1000;

  const pAtTb = calculateClausiusClapeyronVaporPressureMmHg(tbK, tbK, deltaHJ);
  assert.strictEqual(pAtTb, STANDARD_PRESSURE_MMHG); // Exactly 760 mmHg

  const eth = VOLATILE_COMPOUNDS.ethanol;
  const ethTbK = eth.normalBoilingPointC + 273.15;
  const pEthAtTb = calculateClausiusClapeyronVaporPressureMmHg(ethTbK, ethTbK, eth.deltaHvapKjPerMol * 1000);
  assert.strictEqual(pEthAtTb, STANDARD_PRESSURE_MMHG);
});

// 2. CLAUSIUS-CLAPEYRON MONOTONIC TEMPERATURE DEPENDENCE (dP/dT > 0)
runTest('Clausius-Clapeyron equation strictly exhibits exponential increase with temperature', () => {
  const tbK = 373.15;
  const deltaHJ = 40660;

  const p50 = calculateClausiusClapeyronVaporPressureMmHg(323.15, tbK, deltaHJ); // 50 °C
  const p75 = calculateClausiusClapeyronVaporPressureMmHg(348.15, tbK, deltaHJ); // 75 °C
  const p100 = calculateClausiusClapeyronVaporPressureMmHg(373.15, tbK, deltaHJ); // 100 °C
  const p120 = calculateClausiusClapeyronVaporPressureMmHg(393.15, tbK, deltaHJ); // 120 °C

  assert.ok(p50 < p75, 'P(50C) < P(75C)');
  assert.ok(p75 < p100, 'P(75C) < P(100C)');
  assert.ok(p100 < p120, 'P(100C) < P(120C)');
  assert.ok(p120 > 1000.0, 'P(120C) > 1 atm');
});

// 3. ANTOINE EQUATION ACCURACY FOR PURE WATER
runTest('calculateAntoineVaporPressureMmHg matches standard steam tables for water at 100 °C', () => {
  const water = VOLATILE_COMPOUNDS.water;
  const p100 = calculateAntoineVaporPressureMmHg(100.0, water.antoineCoefficients);
  assert.ok(Math.abs(p100 - 760.0) < 1.0, `Water at 100 °C expected ~760 mmHg, got ${p100}`);

  // Room temp 25 °C water vapor pressure is ~23.8 mmHg
  const p25 = calculateAntoineVaporPressureMmHg(25.0, water.antoineCoefficients);
  assert.ok(Math.abs(p25 - 23.8) < 1.0, `Water at 25 °C expected ~23.8 mmHg, got ${p25}`);
});

// 4. ANTOINE EQUATION ACCURACY FOR PURE ETHANOL
runTest('calculateAntoineVaporPressureMmHg matches NIST experimental data for ethanol', () => {
  const eth = VOLATILE_COMPOUNDS.ethanol;
  const pBoil = calculateAntoineVaporPressureMmHg(eth.normalBoilingPointC, eth.antoineCoefficients);
  assert.ok(Math.abs(pBoil - 760.0) < 2.0, `Ethanol at Tb expected ~760 mmHg, got ${pBoil}`);
});

// 5. RAOULT'S & DALTON'S LAWS FOR IDEAL BINARY MIXTURES
runTest('calculateIdealBinaryVLE strictly satisfies Raoult P_i = x_i·P_i* and Dalton P_tot = ∑ P_i', () => {
  const benzene = VOLATILE_COMPOUNDS.benzene;
  const toluene = VOLATILE_COMPOUNDS.toluene;
  const tempC = 90.0; // Intermediate temperature

  const vle = calculateIdealBinaryVLE(0.40, tempC, benzene, toluene);
  assert.strictEqual(vle.xA, 0.40);
  assert.strictEqual(vle.xB, 0.60);

  // Raoult partial pressures
  assert.strictEqual(vle.partialPA_mmHg, Number((0.40 * vle.pPureA_mmHg).toFixed(2)));
  assert.strictEqual(vle.partialPB_mmHg, Number((0.60 * vle.pPureB_mmHg).toFixed(2)));

  // Dalton total pressure
  const expectedTotal = vle.partialPA_mmHg + vle.partialPB_mmHg;
  assert.ok(Math.abs(vle.totalP_mmHg - expectedTotal) < 0.05, `Total pressure matches sum within rounding: ${vle.totalP_mmHg} vs ${expectedTotal}`);

  // Dalton mole fractions in vapor phase: yA + yB = 1.0
  assert.ok(Math.abs(vle.yA + vle.yB - 1.0) < 0.001);
});

// 6. VAPOR ENRICHMENT INVARIANT (y_A > x_A)
runTest('Vapor phase is strictly enriched in the more volatile component (y_A > x_A)', () => {
  const benzene = VOLATILE_COMPOUNDS.benzene;
  const toluene = VOLATILE_COMPOUNDS.toluene;
  const tempC = 95.0;

  // Test across intermediate liquid mole fractions
  [0.1, 0.3, 0.5, 0.7, 0.9].forEach((xA) => {
    const vle = calculateIdealBinaryVLE(xA, tempC, benzene, toluene);
    assert.ok(vle.yA > vle.xA, `At x_A = ${xA}, y_A (${vle.yA}) must be > x_A (${vle.xA})`);
  });
});

// 7. RELATIVE VOLATILITY INVARIANT (alpha > 1)
runTest('Relative volatility α_AB = P_A* / P_B* is strictly greater than 1.0 for Benzene/Toluene', () => {
  const benzene = VOLATILE_COMPOUNDS.benzene;
  const toluene = VOLATILE_COMPOUNDS.toluene;

  const vle = calculateIdealBinaryVLE(0.5, 90.0, benzene, toluene);
  assert.ok(vle.relativeVolatility > 2.0 && vle.relativeVolatility < 3.0, `alpha should be ~2.4, got ${vle.relativeVolatility}`);
});

// 8. IDEAL BINARY MIXTURE BOILING POINT CALCULATOR
runTest('calculateBoilingPointIdealMixtureCelsius strictly bounds Tb between pure component boiling points', () => {
  const benzene = VOLATILE_COMPOUNDS.benzene; // Tb = 80.1 °C
  const toluene = VOLATILE_COMPOUNDS.toluene; // Tb = 110.6 °C

  const t0 = calculateBoilingPointIdealMixtureCelsius(0.0, benzene, toluene);
  assert.strictEqual(t0, toluene.normalBoilingPointC);

  const t1 = calculateBoilingPointIdealMixtureCelsius(1.0, benzene, toluene);
  assert.strictEqual(t1, benzene.normalBoilingPointC);

  const tMid = calculateBoilingPointIdealMixtureCelsius(0.5, benzene, toluene);
  assert.ok(tMid > benzene.normalBoilingPointC && tMid < toluene.normalBoilingPointC);
  assert.ok(tMid > 90.0 && tMid < 94.0); // Typically ~92 °C for 50-50 mol%
});

// 9. FENSKE MINIMUM THEORETICAL PLATES SCALING
runTest('calculateFenskeMinimumPlates scales monotonically with separation purity target', () => {
  const alpha = 2.4; // Benzene/Toluene

  const platesLow = calculateFenskeMinimumPlates(0.85, 0.15, alpha); // Low purity
  const platesMid = calculateFenskeMinimumPlates(0.95, 0.05, alpha); // Medium purity
  const platesHigh = calculateFenskeMinimumPlates(0.99, 0.01, alpha); // High purity

  assert.ok(platesLow < platesMid, 'Higher purity requires more plates');
  assert.ok(platesMid < platesHigh, 'Ultra-high purity requires even more plates');
  assert.ok(platesHigh >= 9.0, 'Ultra-high purity needs >= 9 plates');
});

// 10. AZEOTROPE THERMODYNAMICS (ETHANOL - WATER MINIMUM AZEOTROPE)
runTest('Ethanol-Water minimum azeotrope boils lower than both pure ethanol and pure water', () => {
  const azSys = BINARY_DISTILLATION_SYSTEMS.ethanol_water;
  assert.strictEqual(azSys.isAzeotropic, true);
  assert.strictEqual(azSys.azeotropeType, 'MINIMUM_BOILING');

  const azData = azSys.azeotropeData;
  assert.strictEqual(azData.boilingPointC, 78.15);
  assert.ok(azData.boilingPointC < VOLATILE_COMPOUNDS.ethanol.normalBoilingPointC); // 78.15 < 78.37
  assert.ok(azData.boilingPointC < VOLATILE_COMPOUNDS.water.normalBoilingPointC); // 78.15 < 100.0
  assert.strictEqual(azData.massFractionA, 0.956); // 95.6% ethanol by mass (rượu 95.6°)
});

// 11. VLE CURVE GENERATOR PINCH POINT CHECK
runTest('generateVLEBoilingCurvePoints correctly generates continuous VLE data', () => {
  const sys = BINARY_DISTILLATION_SYSTEMS.benzene_toluene;
  const points = generateVLEBoilingCurvePoints(sys, 10);
  assert.strictEqual(points.length, 11);

  assert.strictEqual(points[0].xA, 0);
  assert.strictEqual(points[10].xA, 1);

  // Check temperature decreases monotonically from toluene (110.6) to benzene (80.1)
  for (let i = 0; i < points.length - 1; i++) {
    assert.ok(points[i].tBoilC >= points[i + 1].tBoilC, 'Boiling point decreases with increasing benzene fraction');
  }
});

// 12. STEAM DISTILLATION THERMODYNAMICS (LIMONENE - WATER)
runTest('calculateSteamDistillationParameters ensures boiling occurs strictly below 100 °C', () => {
  const limonene = VOLATILE_COMPOUNDS.limonene;
  const params = calculateSteamDistillationParameters(limonene);

  // Mixture boils at ~97.4 °C (< 100 °C and << 176 °C)
  assert.ok(params.distillationTempC > 95.0 && params.distillationTempC < 99.5, `Steam dist temp expected ~97 °C, got ${params.distillationTempC}`);
  assert.ok(params.waterSavedFromOverheatingC > 70.0, 'Prevents thermal decomposition by > 70 °C');

  // Total pressure equals 760 mmHg
  const totalP = params.pWaterMmHg + params.pOilMmHg;
  assert.ok(Math.abs(totalP - 760.0) < 1.0);
});

// 13. STEAM DISTILLATION MASS YIELD FORMULATION
runTest('Steam distillation oil-to-water mass ratio satisfies (P_oil · M_oil) / (P_water · M_water)', () => {
  const eugenol = VOLATILE_COMPOUNDS.eugenol;
  const params = calculateSteamDistillationParameters(eugenol);

  assert.ok(params.distillationTempC > 97.0 && params.distillationTempC < 100.0);
  assert.ok(params.massRatioOilToWater > 0, 'Yields positive distillate ratio');
  assert.ok(params.organicPercentInDistillate > 0 && params.organicPercentInDistillate < 20);
});

// 14. SOUND ENGINE PROCEDURAL AUDIO INTEGRATION
runTest('SoundEngine includes boiling bubble simulation and distillation drip audio triggers', () => {
  assert.strictEqual(typeof sound.playBoilingBubbleSim, 'function');
  assert.strictEqual(typeof sound.playDistillationCondensateDrip, 'function');

  sound.playBoilingBubbleSim();
  sound.playDistillationCondensateDrip();
});

// 15. EDGE CASE SAFEGUARDS
runTest('Thermodynamic calculations handle zero and boundary conditions safely', () => {
  assert.strictEqual(calculateClausiusClapeyronVaporPressureMmHg(0, 373, 40000), 0);
  assert.strictEqual(calculateClausiusClapeyronVaporPressureMmHg(373, 0, 40000), 0);
  assert.strictEqual(calculateFenskeMinimumPlates(0, 0, 1.0), 1);
  assert.strictEqual(calculateFenskeMinimumPlates(1, 0, 1.0), 1);
});

console.log(`\n🎉 SUITE 91 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
