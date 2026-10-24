// tests/test-chemical-kinetics.mjs
/**
 * ELEMENTA — Test Suite 192: Chemical Kinetics & Reaction Rates Domain Engine
 * Conforms to GDPT 2018 Chemistry Grade 10 (Chủ đề 6: Tốc độ phản ứng hóa học) & IUPAC Standards
 */

import assert from 'assert';
import {
  KINETIC_REACTION_CATALOG,
  calculateVanTHoffEffect,
  simulateKineticFactors,
  calculateArrheniusCollision
} from '../src/domain/chemicalKineticsEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 192: CHEMICAL KINETICS DOMAIN ENGINE');
console.log('======================================================================\n');

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    process.exit(1);
  }
}

// 1. Kinetic Catalog
test('Catalog contains at least 4 classic reaction kinetics models', () => {
  assert.ok(KINETIC_REACTION_CATALOG.length >= 4);
});

test('Thiosulfate acid decomposition features yellow sulfur cloudiness observation', () => {
  const thio = KINETIC_REACTION_CATALOG.find(r => r.id === 'thiosulfate-acid');
  assert.strictEqual(thio.overallOrder, 2);
  assert.ok(thio.descriptionVi.includes('dấu thập'));
});

// 2. Van 't Hoff Temperature Rule
test('Van \'t Hoff equation calculates 15.63x rate increase for ΔT = 30°C and γ = 2.5', () => {
  const res = calculateVanTHoffEffect(20, 50, 2.5);
  // (50 - 20)/10 = 3 => 2.5^3 = 15.625 ~ 15.63
  assert.strictEqual(res.rateRatio, 15.63);
  assert.strictEqual(res.deltaT, 30);
  assert.ok(res.realWorldApplicationVi.includes('tăng'));
});

test('Refrigerator preservation test models food spoilage deceleration from 25°C to 4°C', () => {
  const res = calculateVanTHoffEffect(4, 25, 2.2);
  assert.ok(res.rateRatio > 4.0);
  assert.ok(res.realWorldApplicationVi.includes('tủ lạnh'));
});

test('Pressure cooker test models 120°C acceleration over boiling 100°C', () => {
  const res = calculateVanTHoffEffect(100, 120, 2.5);
  assert.strictEqual(res.rateRatio, 6.25); // 2.5^2 = 6.25
  assert.ok(res.realWorldApplicationVi.includes('áp suất'));
});

// 3. 5 Kinetic Factors Simulation
test('Increasing concentration proportionally increases reaction rate', () => {
  const lowConc = simulateKineticFactors({
    reactionId: 'thiosulfate-acid',
    concentrationMolar: 0.5,
    temperatureCelsius: 25,
    surfaceAreaState: 'GRANULES',
    hasCatalyst: false
  });
  const highConc = simulateKineticFactors({
    reactionId: 'thiosulfate-acid',
    concentrationMolar: 1.5,
    temperatureCelsius: 25,
    surfaceAreaState: 'GRANULES',
    hasCatalyst: false
  });
  assert.ok(highConc.calculatedRate > lowConc.calculatedRate);
  assert.ok(highConc.cloudinessTimeSeconds < lowConc.cloudinessTimeSeconds);
});

test('Increasing temperature reduces thiosulfate sulfur cloudiness obscuration time', () => {
  const cold = simulateKineticFactors({
    reactionId: 'thiosulfate-acid',
    concentrationMolar: 1.0,
    temperatureCelsius: 15,
    surfaceAreaState: 'GRANULES',
    hasCatalyst: false
  });
  const hot = simulateKineticFactors({
    reactionId: 'thiosulfate-acid',
    concentrationMolar: 1.0,
    temperatureCelsius: 45,
    surfaceAreaState: 'GRANULES',
    hasCatalyst: false
  });
  assert.ok(hot.calculatedRate > cold.calculatedRate);
  assert.ok(hot.cloudinessTimeSeconds < cold.cloudinessTimeSeconds);
});

test('Fine powder CaCO3 accelerates CO2 gas evolution 8.5x over solid chunks', () => {
  const chunks = simulateKineticFactors({
    reactionId: 'caco3-hcl',
    concentrationMolar: 1.0,
    temperatureCelsius: 25,
    surfaceAreaState: 'CHUNKS',
    hasCatalyst: false
  });
  const powder = simulateKineticFactors({
    reactionId: 'caco3-hcl',
    concentrationMolar: 1.0,
    temperatureCelsius: 25,
    surfaceAreaState: 'FINE_POWDER',
    hasCatalyst: false
  });
  assert.strictEqual(parseFloat((powder.calculatedRate / chunks.calculatedRate).toFixed(1)), 8.5);
  assert.ok(powder.factorBreakdown.surfaceAreaContributionVi.includes('8.5'));
});

test('MnO2 catalyst lowers H2O2 activation energy from 75 to 54 kJ/mol and boosts rate 28x', () => {
  const withoutCat = simulateKineticFactors({
    reactionId: 'h2o2-decomposition',
    concentrationMolar: 1.0,
    temperatureCelsius: 25,
    surfaceAreaState: 'FINE_POWDER',
    hasCatalyst: false
  });
  const withCat = simulateKineticFactors({
    reactionId: 'h2o2-decomposition',
    concentrationMolar: 1.0,
    temperatureCelsius: 25,
    surfaceAreaState: 'FINE_POWDER',
    hasCatalyst: true
  });
  assert.strictEqual(withoutCat.effectiveActivationEnergyEa, 75.0);
  assert.strictEqual(withCat.effectiveActivationEnergyEa, 54.0);
  assert.strictEqual(parseFloat((withCat.calculatedRate / withoutCat.calculatedRate).toFixed(1)), 28.0);
});

// 4. Arrhenius Equation & Collision Theory
test('Arrhenius equation computes effective collision fraction f = exp(-Ea / RT)', () => {
  const res = calculateArrheniusCollision(25, 50.0);
  assert.ok(res.effectiveCollisionFraction > 0);
  assert.ok(res.effectiveCollisionFraction < 1.0);
  assert.strictEqual(res.temperatureKelvin, 298.15);
  assert.ok(res.explanationVi.includes('Maxwell-Boltzmann'));
});

test('Higher temperature expands the fraction of collisions exceeding activation barrier', () => {
  const cold = calculateArrheniusCollision(20, 50.0);
  const hot = calculateArrheniusCollision(60, 50.0);
  assert.ok(hot.effectiveCollisionFraction > cold.effectiveCollisionFraction);
  assert.ok(hot.effectiveCollisionsPerMillion > cold.effectiveCollisionsPerMillion);
});

console.log('\n======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / 11 TESTS PASSED`);
console.log(' TEST SUITE 192 COMPLETED IN 100% HARMONY!');
console.log('======================================================================\n');
