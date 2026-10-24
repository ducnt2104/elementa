// test-green-chemistry-visualizer.mjs
// Test Suite 83: Green Chemistry, Atmospheric Cycles, Acid Rain & Carbon Neutrality
// Conforming to Vietnam GDPT 2018 (Hóa 11 Chương 2 & 4; Hóa 12 Chương 8) & IUPAC Standards

import assert from 'assert';
import {
  GREEN_CHEMISTRY_PRINCIPLES,
  SYNTHESIS_BENCHMARKS,
  ACID_RAIN_STEPS,
  ACID_RAIN_TARGETS,
  GREENHOUSE_GASES,
  CARBON_CAPTURE_METHODS,
  calculateAtomEconomy,
  calculateEFactor,
  calculateCO2Equivalent,
  calculateLimestoneDissolution,
  getMatchingGreenChemistryConcept
} from './src/domain/greenChemistryEngine.ts';
import { sound } from './src/audio/soundEngine.ts';

console.log('🧪 Starting Test Suite 83: Green Chemistry, Atmospheric Cycles & Carbon Neutrality...\n');

let passedTests = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Principles Catalog Integrity
runTest('1. GREEN_CHEMISTRY_PRINCIPLES catalog: contains all 12 principles of Anastas & Warner', () => {
  assert.strictEqual(GREEN_CHEMISTRY_PRINCIPLES.length, 12);
  GREEN_CHEMISTRY_PRINCIPLES.forEach((p, idx) => {
    assert.strictEqual(p.number, idx + 1);
    assert(p.titleVI.length > 0);
    assert(p.titleEN.length > 0);
    assert(p.chemicalStrategyVI.length > 0);
    assert(p.industrialExampleVI.length > 0);
    assert(p.relevantCurriculumVI.includes('GDPT 2018') || p.relevantCurriculumVI.includes('Hóa học'));
  });
});

// 2. Industrial Synthesis Benchmarks Integrity
runTest('2. SYNTHESIS_BENCHMARKS integrity: Ethylene Oxide, Ibuprofen & Biodiesel routes', () => {
  const benchmarkIds = Object.keys(SYNTHESIS_BENCHMARKS);
  assert(benchmarkIds.includes('ethylene_oxide'));
  assert(benchmarkIds.includes('ibuprofen'));
  assert(benchmarkIds.includes('biodiesel_transesterification'));

  const eo = SYNTHESIS_BENCHMARKS.ethylene_oxide;
  assert.strictEqual(eo.greenRoute.theoreticalAtomEconomyPercent, 100);
  assert(eo.traditionalRoute.theoreticalAtomEconomyPercent < 30);
  assert(eo.traditionalRoute.typicalEFactor > eo.greenRoute.typicalEFactor);
});

// 3. Atom Economy Calculation
runTest('3. calculateAtomEconomy: computes exact %AE and evaluates rating correctly', () => {
  // Ethylene oxide direct catalytic oxidation (C2H4 + 1/2 O2 -> C2H4O)
  const eoResult = calculateAtomEconomy(44.05, 44.05);
  assert.strictEqual(eoResult.atomEconomyPercent, 100);
  assert.strictEqual(eoResult.isGreen, true);
  assert.strictEqual(eoResult.ratingVI, 'XUẤT_SẮC_100%');

  // Chlorohydrin route (C2H4 + Cl2 + Ca(OH)2 -> C2H4O + CaCl2 + H2O)
  const chloroResult = calculateAtomEconomy(44.05, 173.04);
  assert(Math.abs(chloroResult.atomEconomyPercent - 25.46) < 0.1);
  assert.strictEqual(chloroResult.isGreen, false);
  assert.strictEqual(chloroResult.ratingVI, 'KÉM_DƯỚI_50%');

  // Esterification (CH3COOH + C2H5OH -> CH3COOC2H5 + H2O: 88 / (60 + 46) = ~83.02%)
  const esterResult = calculateAtomEconomy(88, 106);
  assert(Math.abs(esterResult.atomEconomyPercent - 83.02) < 0.1);
  assert.strictEqual(esterResult.isGreen, true);
  assert.strictEqual(esterResult.ratingVI, 'TỐT_TRÊN_70%');
});

// 4. Environmental Factor (E-Factor) Calculation
runTest('4. calculateEFactor: calculates waste mass and benchmark industry classifications', () => {
  // Bulk chemical: 120 kg raw materials, 100 kg product -> 20 kg waste, E = 0.2
  const bulkResult = calculateEFactor(120, 100);
  assert.strictEqual(bulkResult.wasteKg, 20);
  assert.strictEqual(bulkResult.eFactor, 0.2);
  assert(bulkResult.industryBenchmarkVI.includes('Hóa chất cơ bản'));

  // Traditional pharmaceutical: 350 kg raw materials, 10 kg product -> 340 kg waste, E = 34.0
  const pharmaResult = calculateEFactor(350, 10);
  assert.strictEqual(pharmaResult.wasteKg, 340);
  assert.strictEqual(pharmaResult.eFactor, 34);
  assert(pharmaResult.industryBenchmarkVI.includes('Hóa chất tinh khiết'));
});

// 5. Acid Rain Atmospheric Steps
runTest('5. ACID_RAIN_STEPS: validates 5 consecutive atmospheric reaction steps for S and N cycles', () => {
  assert.strictEqual(ACID_RAIN_STEPS.length, 5);
  // S cycle
  assert(ACID_RAIN_STEPS[0].atmosphericReactionVI.includes('S(r) + O2(k)'));
  assert(ACID_RAIN_STEPS[1].atmosphericReactionVI.includes('2 SO2(k) + O2(k)'));
  assert(ACID_RAIN_STEPS[2].atmosphericReactionVI.includes('SO3(k) + H2O(l)'));
  // N cycle
  assert(ACID_RAIN_STEPS[3].atmosphericReactionVI.includes('N2(k) + O2(k)'));
  assert(ACID_RAIN_STEPS[4].atmosphericReactionVI.includes('4 NO2(k) + O2(k) + 2 H2O(l)'));
});

// 6. Acid Rain Damage Targets & Chemical Equations
runTest('6. ACID_RAIN_TARGETS: verifies Limestone CaCO3, Steel Bridges Fe, Soil & Aquatic targets', () => {
  assert.strictEqual(ACID_RAIN_TARGETS.length, 4);
  const limestone = ACID_RAIN_TARGETS.find(t => t.id === 'limestone_monument');
  assert(limestone !== undefined);
  assert(limestone.chemicalEquationVI.includes('CaCO3(r) + H2SO4(dd)'));

  const steel = ACID_RAIN_TARGETS.find(t => t.id === 'metallic_bridges');
  assert(steel !== undefined);
  assert(steel.chemicalEquationVI.includes('Fe(r) + H2SO4(dd)'));
});

// 7. Limestone Dissolution Quantitative Calculator
runTest('7. calculateLimestoneDissolution: computes dissolved CaCO3 grams and released CO2 liters STP', () => {
  // 1,000 Liters of rain at pH = 3.0 ([H+] = 10^-3 M -> 1 mol H+)
  // 1 mol H+ dissolves 0.5 mol CaCO3 (0.5 * 100.09 = 50.045 g) and releases 0.5 * 24.79 = 12.395 L CO2
  const calc = calculateLimestoneDissolution(1000, 3.0);
  assert.strictEqual(calc.hPlusMoles, 1.0);
  assert(Math.abs(calc.calciumCarbonateDissolvedGrams - 50.045) < 0.01);
  assert(Math.abs(calc.co2GasReleasedLitersSTP - 12.395) < 0.01);
  assert.strictEqual(calc.rainClassificationVI, 'MƯA_AXIT_CỰC_NẶNG');

  // Natural unpolluted rain at pH = 5.6
  const unpolluted = calculateLimestoneDissolution(1000, 5.6);
  assert.strictEqual(unpolluted.rainClassificationVI, 'MƯA_TỰ_NHIÊN_CHUẨN');
});

// 8. Greenhouse Gases Catalog & GWP Metrics
runTest('8. GREENHOUSE_GASES catalog: validates GWP100 values (CO2=1, CH4=28, N2O=273, SF6=25200)', () => {
  const gases = Object.keys(GREENHOUSE_GASES);
  assert.strictEqual(gases.length, 4);

  assert.strictEqual(GREENHOUSE_GASES.carbon_dioxide.gwp100, 1);
  assert.strictEqual(GREENHOUSE_GASES.methane.gwp100, 28);
  assert.strictEqual(GREENHOUSE_GASES.nitrous_oxide.gwp100, 273);
  assert.strictEqual(GREENHOUSE_GASES.sulfur_hexafluoride.gwp100, 25200);

  assert(GREENHOUSE_GASES.carbon_dioxide.vibrationalAbsorptionBandsMicrons.length > 0);
});

// 9. CO2 Equivalent Multi-gas Emission Calculator
runTest('9. calculateCO2Equivalent: computes total equivalent tonnes and percentage share', () => {
  // 100 tonnes CO2, 5 tonnes CH4 (5*28=140), 1 tonne N2O (1*273=273)
  // Total = 100 + 140 + 273 = 513 tonnes CO2-eq
  const res = calculateCO2Equivalent({
    carbon_dioxide: 100,
    methane: 5,
    nitrous_oxide: 1
  });

  assert.strictEqual(res.totalCO2EquivalentTonnes, 513);
  assert.strictEqual(res.breakdown.length, 3);

  // Check N2O share: 273 / 513 = 53.2%
  const n2oItem = res.breakdown.find(b => b.gasId === 'nitrous_oxide');
  assert(n2oItem !== undefined);
  assert(Math.abs(n2oItem.sharePercent - 53.2) < 0.2);
});

// 10. Carbon Capture & Utilization (CCUS) Technologies
runTest('10. CARBON_CAPTURE_METHODS catalog: amine scrubbing, direct air capture & e-methanol', () => {
  const methods = Object.keys(CARBON_CAPTURE_METHODS);
  assert(methods.includes('amine_scrubbing'));
  assert(methods.includes('direct_air_capture_caustic'));
  assert(methods.includes('catalytic_emethanol'));

  const meA = CARBON_CAPTURE_METHODS.amine_scrubbing;
  assert.strictEqual(meA.captureCategory, 'POST_COMBUSTION');
  assert(meA.keyReactionEquationVI.includes('R-NH2 + CO2'));

  const dac = CARBON_CAPTURE_METHODS.direct_air_capture_caustic;
  assert.strictEqual(dac.captureCategory, 'DIRECT_AIR_CAPTURE');
  assert(dac.operatingTemperatureCelsius >= 900);

  const emethanol = CARBON_CAPTURE_METHODS.catalytic_emethanol;
  assert(emethanol.keyReactionEquationVI.includes('CO2(k) + 3 H2(k)'));
});

// 11. Card and Chemical Formula Matcher
runTest('11. getMatchingGreenChemistryConcept: matches cards by formula or element name', () => {
  const co2Match = getMatchingGreenChemistryConcept('CO2');
  assert(co2Match !== null);
  assert(co2Match.gas?.formula === 'CO2');
  assert(co2Match.captureMethod?.id === 'catalytic_emethanol');

  const so2Match = getMatchingGreenChemistryConcept('SO2');
  assert(so2Match !== null);
  assert(so2Match.damageTarget?.id === 'limestone_monument');

  const c2h4Match = getMatchingGreenChemistryConcept('C2H4');
  assert(c2h4Match !== null);
  assert(c2h4Match.benchmark?.id === 'ethylene_oxide');

  const limeMatch = getMatchingGreenChemistryConcept('CaCO3');
  assert(limeMatch !== null);
  assert(limeMatch.captureMethod?.id === 'direct_air_capture_caustic');

  const unMatched = getMatchingGreenChemistryConcept('XYZ_UNKNOWN');
  assert.strictEqual(unMatched, null);
});

// 12. Procedural Audio Synthesis Methods
runTest('12. SoundEngine: playAcidRainHiss and playEcoSynthesisChime execute without error', () => {
  assert.doesNotThrow(() => {
    sound.playAcidRainHiss();
    sound.playEcoSynthesisChime();
  });
});

// 13. Mathematical Error Guards & Boundary Conditions
runTest('13. Boundary conditions: zero/negative masses throw informative exceptions', () => {
  assert.throws(() => {
    calculateAtomEconomy(-10, 50);
  }, /Khối lượng mol phải lớn hơn 0/);

  assert.throws(() => {
    calculateEFactor(50, 100); // Raw materials < product
  }, /Khối lượng nguyên liệu phải lớn hơn hoặc bằng khối lượng sản phẩm/);

  assert.throws(() => {
    calculateLimestoneDissolution(0, 4.0);
  }, /Thể tích nước mưa phải lớn hơn 0/);
});

// 14. GDPT 2018 Molar Gas Volume Standard (24.79 L at 25°C, 1 bar)
runTest('14. GDPT 2018 gas volume standard: 1 mol of CO2 gas yields exactly 24.79 L at STP', () => {
  // 2 mol H+ dissolves 1 mol CaCO3 and releases 1 mol CO2 (24.79 L)
  // [H+] = 10^-2 M -> 200 Liters gives 2 mol H+
  const calc = calculateLimestoneDissolution(200, 2.0);
  assert.strictEqual(calc.hPlusMoles, 2.0);
  assert(Math.abs(calc.co2GasReleasedLitersSTP - 24.79) < 0.01);
});

// 15. End-to-end Life Cycle Green Certification Rating
runTest('15. End-to-end Green Certification logic: verifies high AE > 70% and low E-factor < 1.0', () => {
  const bio = SYNTHESIS_BENCHMARKS.biodiesel_transesterification;
  const aeResult = calculateAtomEconomy(bio.targetMolarMass * 3, 981.5);
  assert(aeResult.isGreen);
  assert.strictEqual(aeResult.ratingVI, 'TỐT_TRÊN_70%');

  const eFactorResult = calculateEFactor(1000, 870);
  assert(eFactorResult.eFactor < 0.2);
  assert(eFactorResult.industryBenchmarkVI.includes('Lọc hóa dầu') || eFactorResult.industryBenchmarkVI.includes('Hóa chất cơ bản'));
});

console.log(`\n🎉 Test Suite 83 Completed Successfully: ${passedTests} / 15 tests passed (100% Pass)!\n`);
