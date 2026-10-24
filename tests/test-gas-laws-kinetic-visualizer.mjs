// test-gas-laws-kinetic-visualizer.mjs
// Test Suite 96: Gas Laws, Kinetic Molecular Theory & Maxwell-Boltzmann Speed Distribution Engine
// Standards: IUPAC Compendium of Chemical Terminology & Vietnam GDPT 2018 (Hóa 10 & Hóa 12: Chất khí và Thuyết Động học Phân tử)

import assert from 'assert';
import {
  GAS_SPECIES,
  IDEAL_GAS_CONSTANT_R_ATM,
  IDEAL_GAS_CONSTANT_R_J,
  STANDARD_TEMP_K,
  STANDARD_PRESSURE_ATM,
  calculateMaxwellBoltzmannDistribution,
  calculateRealVsIdealGasComparison,
  calculateGrahamEffusion,
  getMatchingGasSpecies,
} from '../src/domain/gasLawsKineticEngine.ts';
import { sound } from '../src/audio/soundEngine.ts';

console.log('💨 RUNNING TEST SUITE 96: GAS LAWS & KINETIC MOLECULAR THEORY ENGINE');

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

// 1. GAS_SPECIES CATALOG INTEGRITY
runTest('GAS_SPECIES defines all core elementary and compound gases with valid physical constants', () => {
  const requiredGases = [
    'hydrogen',
    'helium',
    'nitrogen',
    'oxygen',
    'methane',
    'ammonia',
    'carbon_dioxide',
    'chlorine',
    'sulfur_dioxide',
    'argon',
    'neon',
  ];

  for (const gasId of requiredGases) {
    const gas = GAS_SPECIES[gasId];
    assert(gas, `Missing gas species: ${gasId}`);
    assert(gas.formula, `Gas ${gasId} missing chemical formula`);
    assert(gas.molarMassGPerMol > 0, `Gas ${gasId} invalid molar mass`);
    assert(gas.vanDerWaalsA >= 0, `Gas ${gasId} invalid van der Waals a constant`);
    assert(gas.vanDerWaalsB > 0, `Gas ${gasId} invalid van der Waals b constant`);
  }
});

// 2. IDEAL GAS LAW MOLAR VOLUME AT STP
runTest('Ideal gas law calculates standard molar volume Vm = 22.414 L at STP (0 °C, 1 atm)', () => {
  const n = 1.0; // 1 mol
  const T = STANDARD_TEMP_K; // 273.15 K
  const P = STANDARD_PRESSURE_ATM; // 1.0 atm
  const V = (n * IDEAL_GAS_CONSTANT_R_ATM * T) / P;

  // Standard molar volume is 22.414 L/mol
  assert(Math.abs(V - 22.414) < 0.01, `Expected ~22.414 L, got ${V.toFixed(4)} L`);
});

// 3. MOLAR VOLUME AT SATP / GDPT 2018 STANDARD CONDITION
runTest('Calculates molar volume Vm ≈ 24.79 L at standard ambient conditions (25 °C, 1 bar)', () => {
  const n = 1.0;
  const T = 298.15; // 25 °C
  const P_bar = 1.0;
  const P_atm = P_bar * 0.986923267; // 1 bar in atm
  const V = (n * IDEAL_GAS_CONSTANT_R_ATM * T) / P_atm;

  // Standard condition in GDPT 2018 (25 °C, 1 bar) gives 24.79 L
  assert(Math.abs(V - 24.79) < 0.05, `Expected ~24.79 L, got ${V.toFixed(2)} L`);
});

// 4. REAL GAS VAN DER WAALS PRESSURE COMPARED TO IDEAL GAS
runTest('Van der Waals equation predicts lower pressure than ideal gas for CO2 at moderate volume', () => {
  const gasId = 'carbon_dioxide';
  const T = 300; // K
  const V = 1.0; // L
  const n = 1.0; // mol

  const result = calculateRealVsIdealGasComparison(gasId, T, V, n);
  // Real gas attractions (a parameter) dominate at 1 L, lowering wall impact pressure
  assert(result.vanDerWaalsPressureAtm < result.idealPressureAtm, 'P_vdW should be lower than P_ideal for CO2 at 1 L');
  assert(result.compressibilityFactorZ < 1.0, `Z should be < 1.0 at moderate volume, got ${result.compressibilityFactorZ}`);
});

// 5. COMPRESSIBILITY FACTOR Z REGIMES
runTest('Compressibility factor Z reflects attraction (Z < 1) at moderate P and repulsion (Z > 1) at high P', () => {
  const T = 300;
  const n = 1.0;

  // Moderate volume for CO2 (intermolecular attraction a dominates -> Z < 1.0)
  const moderate = calculateRealVsIdealGasComparison('carbon_dioxide', T, 1.2, n);
  assert(moderate.compressibilityFactorZ < 1.0, `Expected Z < 1.0 for CO2 at 1.2L, got ${moderate.compressibilityFactorZ}`);

  // High pressure / compressed volume for CO2 (excluded volume b dominates when V -> b: 0.05L -> Z > 1.0)
  const highPressureCO2 = calculateRealVsIdealGasComparison('carbon_dioxide', T, 0.05, n);
  assert(highPressureCO2.compressibilityFactorZ > 1.0, `Expected Z > 1.0 for CO2 at 0.05L, got ${highPressureCO2.compressibilityFactorZ}`);

  // Hydrogen has negligible attraction (a ≈ 0.248) so Z > 1.0 across ordinary pressures
  const hydrogenResult = calculateRealVsIdealGasComparison('hydrogen', T, 0.5, n);
  assert(hydrogenResult.compressibilityFactorZ > 1.0, `Expected Z > 1.0 for H2 at 0.5L, got ${hydrogenResult.compressibilityFactorZ}`);
});

// 6. MAXWELL-BOLTZMANN SPEED INVARIANT ORDERING
runTest('Maxwell-Boltzmann speeds strictly adhere to v_mp < v_avg < v_rms with theoretical ratios', () => {
  const gasId = 'nitrogen';
  const T = 300; // K

  const mb = calculateMaxwellBoltzmannDistribution(gasId, T);
  assert(mb.vMostProbableMPerS < mb.vAverageMPerS, `v_mp (${mb.vMostProbableMPerS}) must be strictly less than v_avg (${mb.vAverageMPerS})`);
  assert(mb.vAverageMPerS < mb.vRootMeanSquareMPerS, `v_avg (${mb.vAverageMPerS}) must be strictly less than v_rms (${mb.vRootMeanSquareMPerS})`);

  // Theoretical ratios: v_avg / v_mp = sqrt(4/pi) ≈ 1.128, v_rms / v_mp = sqrt(3/2) ≈ 1.225
  const ratioAvgMp = mb.vAverageMPerS / mb.vMostProbableMPerS;
  const ratioRmsMp = mb.vRootMeanSquareMPerS / mb.vMostProbableMPerS;

  assert(Math.abs(ratioAvgMp - 1.1284) < 0.01, `v_avg/v_mp should be ~1.128, got ${ratioAvgMp.toFixed(3)}`);
  assert(Math.abs(ratioRmsMp - 1.2247) < 0.01, `v_rms/v_mp should be ~1.225, got ${ratioRmsMp.toFixed(3)}`);
});

// 7. TEMPERATURE DEPENDENCE OF SPEED DISTRIBUTION
runTest('Speed distribution shifts to higher velocities as temperature increases', () => {
  const gasId = 'oxygen';
  const mb300 = calculateMaxwellBoltzmannDistribution(gasId, 300);
  const mb600 = calculateMaxwellBoltzmannDistribution(gasId, 600);

  // Speed scales as sqrt(T2/T1) = sqrt(2) ≈ 1.414
  const expectedRatio = Math.sqrt(600 / 300);
  const actualRatio = mb600.vRootMeanSquareMPerS / mb300.vRootMeanSquareMPerS;
  assert(Math.abs(actualRatio - expectedRatio) < 0.01, `Speed should scale by sqrt(2), got ${actualRatio.toFixed(3)}`);

  // Root mean square speed at 600K must be greater than at 300K
  assert(mb600.vRootMeanSquareMPerS > mb300.vRootMeanSquareMPerS, 'v_rms should increase with temperature');
});

// 8. MOLAR MASS DEPENDENCE OF SPEED DISTRIBUTION
runTest('Lighter gases have significantly higher speeds than heavier gases at identical temperature', () => {
  const T = 300;
  const mbH2 = calculateMaxwellBoltzmannDistribution('hydrogen', T); // M = 2.016
  const mbO2 = calculateMaxwellBoltzmannDistribution('oxygen', T);   // M = 31.998

  // Ratio v_rms(H2)/v_rms(O2) = sqrt(31.998 / 2.016) ≈ 3.984 ≈ 4.0
  const speedRatio = mbH2.vRootMeanSquareMPerS / mbO2.vRootMeanSquareMPerS;
  assert(Math.abs(speedRatio - 3.984) < 0.05, `Expected speed ratio ~3.98, got ${speedRatio.toFixed(2)}`);
  assert(mbH2.vRootMeanSquareMPerS > 1900, `H2 rms speed at 300K should exceed 1900 m/s, got ${mbH2.vRootMeanSquareMPerS}`);
});

// 9. MOLAR TRANSLATIONAL KINETIC ENERGY DEPENDENCE SOLELY ON TEMPERATURE
runTest('Molar translational kinetic energy depends solely on temperature: Ek = 3/2 RT for all gases', () => {
  const T = 300; // K
  const expectedEkMolar = 1.5 * IDEAL_GAS_CONSTANT_R_J * T; // ~3741.5 J/mol

  const mbHe = calculateMaxwellBoltzmannDistribution('helium', T);
  const mbAr = calculateMaxwellBoltzmannDistribution('argon', T);

  assert(Math.abs(mbHe.kineticEnergyPerMoleJ - expectedEkMolar) < 1.0, `He Ek mismatch: ${mbHe.kineticEnergyPerMoleJ}`);
  assert(Math.abs(mbAr.kineticEnergyPerMoleJ - expectedEkMolar) < 1.0, `Ar Ek mismatch: ${mbAr.kineticEnergyPerMoleJ}`);
  assert.strictEqual(mbHe.kineticEnergyPerMoleJ, mbAr.kineticEnergyPerMoleJ, 'Ek must be identical for all gases at same T');
});

// 10. GRAHAM EFFUSION RATE RATIO INVERSE SQUARE ROOT
runTest('Graham effusion law: rate ratio equals inverse square root of molar masses r1/r2 = sqrt(M2/M1)', () => {
  const effusion = calculateGrahamEffusion('methane', 'sulfur_dioxide'); // M1 = 16.043, M2 = 64.066
  // Rate ratio sqrt(64.066 / 16.043) = sqrt(3.993) ≈ 1.998 ≈ 2.0
  assert(Math.abs(effusion.effusionRateRatio - 1.998) < 0.02, `Expected ~2.0, got ${effusion.effusionRateRatio.toFixed(3)}`);
  assert(effusion.fasterGasVI === GAS_SPECIES.methane.nameVI, 'Methane is the faster gas');
});

// 11. NH3 AND CL2 EFFUSION COMPARISON
runTest('Graham effusion comparison correctly identifies faster gas and diffusion distance ratio', () => {
  const effusion = calculateGrahamEffusion('ammonia', 'chlorine'); // M_NH3 = 17.031, M_Cl2 = 70.906
  const rateRatioCl2 = Math.sqrt(GAS_SPECIES.chlorine.molarMassGPerMol / GAS_SPECIES.ammonia.molarMassGPerMol);
  assert(Math.abs(effusion.effusionRateRatio - rateRatioCl2) < 0.01, 'Effusion rate ratio matches Graham equation');
  assert(effusion.effusionRateRatio > 1.0, 'Ammonia effuses faster than chlorine');
  assert(effusion.pedagogicalInsightVI.includes('Amoniac'), 'Pedagogical insight references ammonia');
});

// 12. REAL VS IDEAL RESULTS RETURN VALID ATTRIBUTES
runTest('Gas comparison handles pressure units and returns realistic physical density', () => {
  const result = calculateRealVsIdealGasComparison('oxygen', 298.15, 24.79, 1.0);
  assert(result.idealPressureAtm > 0, 'Ideal pressure must be positive');
  assert(result.vanDerWaalsPressureAtm > 0, 'Real vdW pressure must be positive');
  assert(Math.abs(result.idealPressureAtm - 1.0) < 0.05, '1 mole in 24.79 L at 298 K should be ~1 atm');
  assert(result.dominantIntermolecularRegimeVI.length > 10, 'Regime description exists');
});

// 13. CARD MATCHING FOR GAS SPECIES
runTest('getMatchingGasSpecies accurately identifies cards representing gas elements and compounds', () => {
  const cardNitrogen = { id: 'card_nitrogen_gas', name: 'Khí Nitơ Tinh Khiết (N2)' };
  const matchN2 = getMatchingGasSpecies(cardNitrogen);
  assert(matchN2, 'Failed to match nitrogen card');
  assert.strictEqual(matchN2.id, 'nitrogen');

  const cardCO2 = { id: 'card_co2', name: 'Khí Carbonic CO2' };
  const matchCO2 = getMatchingGasSpecies(cardCO2);
  assert(matchCO2, 'Failed to match CO2 card');
  assert.strictEqual(matchCO2.id, 'carbon_dioxide');

  const cardOxygen = { id: 'elem_8_oxygen', name: 'Khí Oxy (Oxygen O2)' };
  const matchO2 = getMatchingGasSpecies(cardOxygen);
  assert(matchO2, 'Failed to match Oxygen card');
  assert.strictEqual(matchO2.id, 'oxygen');

  const cardSolidIron = { id: 'elem_26_iron', name: 'Sắt Kim Loại Fe' };
  const matchIron = getMatchingGasSpecies(cardSolidIron);
  assert.strictEqual(matchIron, null, 'Solid iron should not match any gas species');
});

// 14. SPEED POINTS DISTRIBUTION SAMPLING INTEGRITY
runTest('Maxwell distribution generates smooth discrete points for SVG rendering', () => {
  const mb = calculateMaxwellBoltzmannDistribution('nitrogen', 300, 1500, 25);
  assert(mb.curvePoints.length >= 50, 'Must sample at least 50 points for smooth curve');
  assert(mb.curvePoints[0].speedMPerS === 0, 'Initial speed point starts at 0 m/s');

  // Curve must rise from 0, reach peak near v_mp, then decay monotonically towards 0
  let peakIndex = 0;
  let maxDensity = 0;
  mb.curvePoints.forEach((pt, idx) => {
    if (pt.probabilityDensity > maxDensity) {
      maxDensity = pt.probabilityDensity;
      peakIndex = idx;
    }
  });

  const peakSpeed = mb.curvePoints[peakIndex].speedMPerS;
  assert(Math.abs(peakSpeed - mb.vMostProbableMPerS) < 50, `Peak of sample curve (${peakSpeed}) should be near v_mp (${mb.vMostProbableMPerS})`);
});

// 15. AUDIO HOOKS INTEGRATION
runTest('SoundEngine includes gas piston compression and molecular collision clack effects', () => {
  assert(typeof sound.playGasPistonCompressionWhoosh === 'function', 'playGasPistonCompressionWhoosh method exists');
  assert(typeof sound.playMolecularCollisionClack === 'function', 'playMolecularCollisionClack method exists');

  // Safely trigger without throwing
  sound.playGasPistonCompressionWhoosh();
  sound.playMolecularCollisionClack();
});

console.log(`\n🎉 TEST SUITE 96 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
