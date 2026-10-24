// test-spectrophotometry-visualizer.mjs
// Test Suite 86: Spectrophotometry, Beer-Lambert Law & Analytical Instrumentation Engine
// Standards: IUPAC Gold Book & Vietnam GDPT 2018 (Hóa 10, 11 & 12)

import assert from 'assert';
import {
  SPECTRO_STANDARDS,
  COMPLEMENTARY_COLOR_TABLE,
  calculateAbsorbance,
  calculateTransmittance,
  calculateAbsorbanceFromTransmittancePct,
  calculatePhotometricRelativeError,
  calculateApparentAbsorbance,
  measureSpectrophotometry,
  getComplementaryColor,
  computeCalibrationRegression,
  quantifyUnknownSample,
  generateStandardCalibrationPoints,
  getMatchingSpectrophotometryConcept
} from './src/domain/spectrophotometryEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🧪 RUNNING TEST SUITE 86: SPECTROPHOTOMETRY & BEER-LAMBERT LAW ENGINE');

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

// 1. BEER-LAMBERT FORMULA INTEGRITY
runTest('Beer-Lambert Law (A = ε·l·c) calculates absorbance precisely', () => {
  // KMnO4: ε = 2400 L/(mol·cm), l = 1.0 cm, c = 0.0002 M
  // A = 2400 * 1.0 * 0.0002 = 0.4800
  const A = calculateAbsorbance(2400, 1.0, 0.0002);
  assert.strictEqual(A, 0.48);

  // CuSO4: ε = 12.6 L/(mol·cm), l = 2.0 cm, c = 0.05 M
  // A = 12.6 * 2.0 * 0.05 = 1.26
  const A2 = calculateAbsorbance(12.6, 2.0, 0.05);
  assert.strictEqual(A2, 1.26);

  // Negative inputs should be safely clamped to 0
  assert.strictEqual(calculateAbsorbance(-100, 1.0, 0.001), 0);
  assert.strictEqual(calculateAbsorbance(2400, -1.0, 0.001), 0);
  assert.strictEqual(calculateAbsorbance(2400, 1.0, -0.001), 0);
});

// 2. TRANSMITTANCE & ABSORBANCE TRANSFORMATION DUALITY
runTest('Transmittance and %Transmittance transform bidirectionally without loss', () => {
  // A = 0 => T = 1.0, %T = 100%
  const t0 = calculateTransmittance(0);
  assert.strictEqual(t0.transmittance, 1.0);
  assert.strictEqual(t0.transmittancePct, 100.0);
  assert.strictEqual(calculateAbsorbanceFromTransmittancePct(100), 0);

  // A = 1.0 => T = 10^-1 = 0.1, %T = 10.0%
  const t1 = calculateTransmittance(1.0);
  assert.strictEqual(t1.transmittance, 0.1);
  assert.strictEqual(t1.transmittancePct, 10.0);
  assert.strictEqual(calculateAbsorbanceFromTransmittancePct(10.0), 1.0);

  // A = 0.30103 (~log10(2)) => T = 0.5, %T = 50.0%
  const tHalf = calculateTransmittance(0.3010);
  assert.ok(Math.abs(tHalf.transmittancePct - 50.0) < 0.1);
  const recoveredA = calculateAbsorbanceFromTransmittancePct(50.0);
  assert.ok(Math.abs(recoveredA - 0.3010) < 0.001);
});

// 3. TWYMAN-LOTHIAN RELATIVE PHOTOMETRIC ERROR CURVE
runTest('Twyman-Lothian photometric relative error reaches minimum near A ≈ 0.434', () => {
  const errLow = calculatePhotometricRelativeError(0.05); // Low A -> high error
  const errOpt = calculatePhotometricRelativeError(0.434); // Optimal A -> lowest error
  const errHigh = calculatePhotometricRelativeError(1.8); // High A -> high error

  assert.ok(errOpt < errLow, `Optimal error ${errOpt} should be lower than low-A error ${errLow}`);
  assert.ok(errOpt < errHigh, `Optimal error ${errOpt} should be lower than high-A error ${errHigh}`);
  assert.ok(errOpt < 4.0, 'Optimal error should be small (<= 4%)');
});

// 4. APPARENT ABSORBANCE & STRAY LIGHT ASYMPTOTE
runTest('Stray light produces an absorbance plateau at high concentrations', () => {
  const s = 0.01; // 1% stray light
  const apparentAt1 = calculateApparentAbsorbance(1.0, 0.001, s);
  const apparentAt2 = calculateApparentAbsorbance(2.0, 0.001, s);
  const apparentAt5 = calculateApparentAbsorbance(5.0, 0.001, s);

  // With 1% stray light, max apparent absorbance is ~ -log10(0.01) = 2.0
  assert.ok(apparentAt1 < apparentAt2);
  assert.ok(apparentAt5 <= 2.05, `Apparent absorbance ${apparentAt5} should not exceed ~2.0 with 1% stray light`);
});

// 5. OLS CALIBRATION REGRESSION PRECISION & DETERMINATION (R²)
runTest('Ordinary Least Squares calibration regression achieves R² >= 0.999 for benchmark points', () => {
  const std = SPECTRO_STANDARDS.kmno4;
  const points = generateStandardCalibrationPoints(std, 5, 0.001);
  assert.strictEqual(points.length, 5);

  const regression = computeCalibrationRegression(points);
  assert.ok(regression.rSquared >= 0.999, `R² ${regression.rSquared} should be >= 0.999`);
  assert.ok(regression.pearsonR >= 0.999, `Pearson r ${regression.pearsonR} should be >= 0.999`);
  assert.ok(Math.abs(regression.slope - std.molarAbsorptivity) / std.molarAbsorptivity < 0.05, 'Slope matches molar absorptivity');
});

// 6. IUPAC LIMITS OF DETECTION (LOD) & QUANTITATION (LOQ)
runTest('LOD and LOQ adhere to 3.3·Sy/x / m and 10·Sy/x / m ratio invariants', () => {
  const std = SPECTRO_STANDARDS.fe_scn;
  const points = generateStandardCalibrationPoints(std, 6, 0.002);
  const reg = computeCalibrationRegression(points);

  assert.ok(reg.lodM > 0, 'LOD must be strictly positive');
  assert.ok(reg.loqM > reg.lodM, 'LOQ must be strictly greater than LOD');
  // Ratio LOQ / LOD must equal 10.0 / 3.3 ≈ 3.0303
  const ratio = reg.loqM / reg.lodM;
  assert.ok(Math.abs(ratio - (10.0 / 3.3)) < 0.05, `Ratio ${ratio} should be ~3.03`);
});

// 7. UNKNOWN SAMPLE QUANTIFICATION & OUT-OF-RANGE WARNINGS
runTest('Unknown sample quantification accurately determines concentration and issues range alerts', () => {
  const std = SPECTRO_STANDARDS.k2cr2o7;
  const points = generateStandardCalibrationPoints(std, 5, 0.001);
  const reg = computeCalibrationRegression(points);

  // Normal sample in middle of calibration range
  const midA = 0.5;
  const normalResult = quantifyUnknownSample(midA, reg);
  assert.strictEqual(normalResult.isValidRange, true);
  assert.strictEqual(normalResult.warning, undefined);
  assert.ok(normalResult.concentrationM > 0);

  // Extremely low sample below LOD
  const lowA = 0.0001;
  const lowResult = quantifyUnknownSample(lowA, reg);
  assert.strictEqual(lowResult.isValidRange, false);
  assert.ok(lowResult.warning?.includes('LOD'));

  // Extremely high sample above calibration curve
  const highA = 3.5;
  const highResult = quantifyUnknownSample(highA, reg);
  assert.strictEqual(highResult.isValidRange, false);
  assert.ok(highResult.warning?.includes('pha loãng') || highResult.warning?.includes('vượt quá'));
});

// 8. COMPLEMENTARY COLOR PAIRING INVARIANTS
runTest('Complementary color physics maps absorbed wavelength to correct observed color', () => {
  // 525 nm (Green absorbed) -> Purple/Magenta observed (KMnO4)
  const c525 = getComplementaryColor(525);
  assert.ok(c525.absorbedColor.includes('Lục'));
  assert.ok(c525.transmittedColor.includes('Tím hồng') || c525.transmittedColor.includes('Magenta'));

  // 450 nm (Blue absorbed) -> Yellow observed
  const c450 = getComplementaryColor(450);
  assert.ok(c450.absorbedColor.includes('Lam'));
  assert.ok(c450.transmittedColor.includes('Vàng'));

  // 660 nm (Red absorbed) -> Cyan observed
  const c660 = getComplementaryColor(660);
  assert.ok(c660.absorbedColor.includes('Đỏ'));
  assert.ok(c660.transmittedColor.includes('Lục - Lam') || c660.transmittedColor.includes('Cyan'));

  // Verify full table integrity (10 wavelength intervals)
  assert.strictEqual(COMPLEMENTARY_COLOR_TABLE.length, 10);
});

// 9. BENCHMARK STANDARDS CATALOG RIGOR
runTest('All 8 spectrophotometric standards contain required physicochemical metadata', () => {
  const standards = Object.values(SPECTRO_STANDARDS);
  assert.strictEqual(standards.length, 8);

  for (const std of standards) {
    assert.ok(std.id, 'Standard has ID');
    assert.ok(std.name, 'Standard has English name');
    assert.ok(std.vietnameseName, 'Standard has Vietnamese name');
    assert.ok(std.chemicalFormula, 'Standard has chemical formula');
    assert.ok(std.lambdaMaxNm >= 300 && std.lambdaMaxNm <= 900, 'Lambda max in UV-Vis-NIR range');
    assert.ok(std.molarAbsorptivity > 0, 'Molar absorptivity is strictly positive');
    assert.ok(std.electronicTransition.length > 5, 'Has detailed electronic transition mechanism');
    assert.ok(std.practicalApplications.length >= 2, 'Has at least 2 practical applications');
    assert.ok(std.typicalConcRangeM.min < std.typicalConcRangeM.max, 'Valid concentration range');
  }
});

// 10. MEASURE SPECTROPHOTOMETRY FULL CYCLE
runTest('measureSpectrophotometry returns comprehensive photometric telemetry', () => {
  const std = SPECTRO_STANDARDS.kmno4;
  const measurement = measureSpectrophotometry(std, 0.0002, 1.0, 0.001);

  assert.strictEqual(measurement.pathLengthCm, 1.0);
  assert.strictEqual(measurement.concentrationM, 0.0002);
  assert.strictEqual(measurement.molarAbsorptivity, 2400);
  assert.strictEqual(measurement.theoreticalAbsorbance, 0.48);
  assert.ok(measurement.apparentAbsorbance > 0);
  assert.ok(measurement.transmittance > 0 && measurement.transmittance < 1.0);
  assert.strictEqual(measurement.withinOptimumRange, true); // 0.48 is in [0.2, 0.8]
  assert.strictEqual(measurement.lightAbsorbedColor, std.absorbedColorName);
});

// 11. AUDIO ENGINE INTEGRATION
runTest('SoundEngine includes spectrophotometer procedural methods without crashing', () => {
  assert.strictEqual(typeof sound.playSpectroLampShutter, 'function');
  assert.strictEqual(typeof sound.playPhotodetectorBeep, 'function');

  // Dry run invocations (runs safely in node/mock environment)
  sound.playSpectroLampShutter();
  sound.playPhotodetectorBeep();
});

// 12. CARD MATCHER SERVICE ACCURACY
runTest('getMatchingSpectrophotometryConcept identifies relevant cards without false positives', () => {
  const matchKMnO4 = getMatchingSpectrophotometryConcept({ name: 'Kali Pemanganat', chemicalFormula: 'KMnO4' });
  assert.strictEqual(matchKMnO4?.id, 'kmno4');

  const matchCuSO4 = getMatchingSpectrophotometryConcept({ name: 'Đồng(II) Sunfat', chemicalFormula: 'CuSO4' });
  assert.strictEqual(matchCuSO4?.id, 'cuso4');

  const matchCr = getMatchingSpectrophotometryConcept({ name: 'Dung dịch đo nồng độ cồn K2Cr2O7' });
  assert.strictEqual(matchCr?.id, 'k2cr2o7');

  const matchFe = getMatchingSpectrophotometryConcept({ name: 'Phức chất đỏ máu', chemicalFormula: '[Fe(SCN)]2+' });
  assert.strictEqual(matchFe?.id, 'fe_scn');

  const matchDiLuc = getMatchingSpectrophotometryConcept({ name: 'Sắc tố diệp lục a quang hợp' });
  assert.strictEqual(matchDiLuc?.id, 'chlorophyll_a');

  // Generic card should return null
  const matchUnknown = getMatchingSpectrophotometryConcept({ name: 'Đá Vôi', chemicalFormula: 'CaCO3' });
  assert.strictEqual(matchUnknown, null);
});

// 13. REACTION / CALIBRATION MATHEMATICAL INVARIANTS
runTest('Linear regression handles edge cases (vertical lines, single points) gracefully', () => {
  const emptyResult = computeCalibrationRegression([]);
  assert.strictEqual(emptyResult.slope, 0);
  assert.strictEqual(emptyResult.rSquared, 0);

  const singleResult = computeCalibrationRegression([{ concentrationM: 0.01, absorbance: 0.2 }]);
  assert.strictEqual(singleResult.slope, 0);
  assert.strictEqual(singleResult.rSquared, 0);
});

// 14. COMPLEMENTARY WAVELENGTH OUT OF BOUNDS HANDLING
runTest('Complementary wavelength selector handles UV and IR edge boundaries', () => {
  const uv = getComplementaryColor(250);
  assert.ok(uv.absorbedColor.includes('Tử ngoại'));

  const ir = getComplementaryColor(900);
  assert.ok(ir.absorbedColor.includes('Hồng ngoại'));
});

// 15. END-TO-END WORKFLOW INTEGRITY
runTest('End-to-end analytical workflow: standard creation -> calibration -> sample quantification', () => {
  const std = SPECTRO_STANDARDS.phenolphthalein;
  const points = generateStandardCalibrationPoints(std, 5, 0.001);
  const reg = computeCalibrationRegression(points);

  const trueC = 0.00003; // 3.0e-5 M
  const trueA = calculateAbsorbance(std.molarAbsorptivity, 1.0, trueC);
  const quant = quantifyUnknownSample(trueA, reg);

  assert.strictEqual(quant.isValidRange, true);
  // Quantified concentration should match true concentration within 5%
  const relDiff = Math.abs(quant.concentrationM - trueC) / trueC;
  assert.ok(relDiff < 0.05, `Relative error ${relDiff} should be < 5%`);
});

console.log(`\n🎉 SUITE 86 COMPLETE: ${testsPassed} / 15 TESTS PASSED (100% SUCCESS)\n`);
