// tests/test-carbohydrate-biochemistry.mjs
// Test Suite 170: Carbohydrate Biochemistry, Mutarotation, Tollens Silver Mirror, Fehling Redox, and Starch-Iodine Helix
// Conforming strictly to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 2: Cacbohiđrat) & IUPAC Guidelines

import {
  CARBOHYDRATES_CATALOG,
  calculateMutarotationEquilibrium,
  calculateTollensSilverMirror,
  calculateFehlingReaction,
  simulateStarchIodineColor,
  calculateSucroseInversion,
  calculateCelluloseNitration
} from '../src/domain/carbohydrateEngine.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('======================================================================');
console.log('   ELEMENTA TEST SUITE 170: CARBOHYDRATE BIOCHEMISTRY & DIAGNOSTICS   ');
console.log('======================================================================');

// Test 1: Carbohydrates Catalog
assert(CARBOHYDRATES_CATALOG.length === 6, 'Catalog must contain exactly 6 core carbohydrates');
const glucose = CARBOHYDRATES_CATALOG.find(c => c.id === 'glucose');
const fructose = CARBOHYDRATES_CATALOG.find(c => c.id === 'fructose');
const sucrose = CARBOHYDRATES_CATALOG.find(c => c.id === 'sucrose');
const maltose = CARBOHYDRATES_CATALOG.find(c => c.id === 'maltose');
const starch = CARBOHYDRATES_CATALOG.find(c => c.id === 'starch');
const cellulose = CARBOHYDRATES_CATALOG.find(c => c.id === 'cellulose');

assert(glucose && glucose.classification === 'MONOSACCHARIDE' && glucose.isReducingSugar, 'Glucose is a reducing monosaccharide');
assert(fructose && fructose.sweetnessIndexVsSucrose === 1.5, 'Fructose is the sweetest natural sugar (1.5x sucrose)');
assert(sucrose && !sucrose.isReducingSugar, 'Sucrose is a non-reducing disaccharide');
assert(maltose && maltose.isReducingSugar, 'Maltose is a reducing disaccharide');
assert(starch && starch.classification === 'POLYSACCHARIDE', 'Starch is a polysaccharide');
assert(cellulose && cellulose.classification === 'POLYSACCHARIDE', 'Cellulose is a polysaccharide');

// Test 2: Mutarotation Equilibrium of Glucose
const glucoseMuta = calculateMutarotationEquilibrium('glucose');
assert(glucoseMuta.alphaAnomerPercent === 36.0, 'Glucose mutarotation alpha anomer is 36%');
assert(glucoseMuta.betaAnomerPercent === 64.0, 'Glucose mutarotation beta anomer is 64% (equatorial preference)');
assert(glucoseMuta.equilibriumSpecificRotationDegrees === +52.7, 'Glucose mutarotation equilibrium optical rotation is +52.7 deg');

// Test 3: Tollens Silver Mirror - Glucose & Fructose (Reducing Monosaccharides)
const gluTollens = calculateTollensSilverMirror({ sugarId: 'glucose', sugarMassGrams: 18.016 });
assert(gluTollens.canReduceTollens === true, 'Glucose must reduce Tollens reagent');
assert(gluTollens.stoichiometricRatioSugarToAg === 2, '1 mol glucose yields 2 mol Ag');
// 18.016 g glucose = 0.1 mol -> 0.2 mol Ag = 0.2 * 107.87 = 21.57 g Ag
assert(Math.abs(gluTollens.theoreticalSilverYieldGrams - 21.57) < 0.1, `Silver yield from 18g glucose: ${gluTollens.theoreticalSilverYieldGrams}g (expected ~21.57g)`);

const frucTollens = calculateTollensSilverMirror({ sugarId: 'fructose', sugarMassGrams: 18.016 });
assert(frucTollens.canReduceTollens === true, 'Fructose must reduce Tollens in alkaline medium via enediol isomerization');

// Test 4: Tollens Silver Mirror - Non-reducing Sugars (Sucrose, Starch, Cellulose)
const sucTollens = calculateTollensSilverMirror({ sugarId: 'sucrose', sugarMassGrams: 34.23 });
assert(sucTollens.canReduceTollens === false, 'Sucrose must NOT reduce Tollens reagent (no free hemiacetal)');
assert(sucTollens.theoreticalSilverYieldGrams === 0, 'Sucrose silver yield must be 0g');

const starchTollens = calculateTollensSilverMirror({ sugarId: 'starch', sugarMassGrams: 50.0 });
assert(starchTollens.canReduceTollens === false, 'Starch must NOT reduce Tollens');

// Test 5: Fehling / Cu(OH)2 Polyol Complexation at Room Temperature
const gluFehlingRT = calculateFehlingReaction({
  sugarId: 'glucose',
  reactionCondition: 'ROOM_TEMPERATURE',
  sugarMassGrams: 18.016
});
assert(gluFehlingRT.formsSolubleBlueComplex === true, 'Glucose dissolves Cu(OH)2 at room temp forming deep blue chelate');
assert(gluFehlingRT.formsRedBrickPrecipitate === false, 'Room temperature Cu(OH)2 does not form red precipitate');

const sucFehlingRT = calculateFehlingReaction({
  sugarId: 'sucrose',
  reactionCondition: 'ROOM_TEMPERATURE',
  sugarMassGrams: 34.23
});
assert(sucFehlingRT.formsSolubleBlueComplex === true, 'Sucrose also forms deep blue copper chelate at room temp (polyol test)');

// Test 6: Fehling Redox at Boiling Temperature (>80C)
const gluFehlingHot = calculateFehlingReaction({
  sugarId: 'glucose',
  reactionCondition: 'HEATING_ABOVE_80C',
  sugarMassGrams: 18.016
});
assert(gluFehlingHot.formsRedBrickPrecipitate === true, 'Glucose reduces Cu(OH)2 at >80C to red-brick Cu2O precipitate');
// 0.1 mol glucose -> 0.1 mol Cu2O (M = 143.09) = 14.31 g Cu2O
assert(Math.abs(gluFehlingHot.redPrecipitateMassGrams - 14.31) < 0.1, `Cu2O precipitate yield: ${gluFehlingHot.redPrecipitateMassGrams}g (expected ~14.31g)`);

const sucFehlingHot = calculateFehlingReaction({
  sugarId: 'sucrose',
  reactionCondition: 'HEATING_ABOVE_80C',
  sugarMassGrams: 34.23
});
assert(sucFehlingHot.formsRedBrickPrecipitate === false, 'Sucrose does NOT form red Cu2O precipitate upon heating (non-reducing)');

// Test 7: Starch-Iodine Inclusion Complex & Temperature Reversibility
const starchIodineCold = simulateStarchIodineColor(25);
assert(starchIodineCold.isHelixFormed === true, 'Starch forms helical inclusion complex with I2 at 25C');
assert(starchIodineCold.solutionColorHex === '#1e1b4b', 'Starch-iodine cold solution has deep blue-purple color');

const starchIodineHot = simulateStarchIodineColor(85);
assert(starchIodineHot.isHelixFormed === false, 'Starch helix unwinds at 85C releasing I2');
assert(starchIodineHot.colorNameVI.includes('Mất màu'), 'Starch-iodine hot solution loses blue-purple color');

// Test 8: Sucrose Inversion Dynamics
const inversionInitial = calculateSucroseInversion({ sucroseMassGrams: 34.23, conversionPercent: 0 });
assert(inversionInitial.currentOpticalRotationDegrees === +66.5, 'Initial sucrose optical rotation is +66.5 deg (dextrorotatory)');

const inversionFull = calculateSucroseInversion({ sucroseMassGrams: 34.23, conversionPercent: 100 });
assert(inversionFull.currentOpticalRotationDegrees < 0, `Complete inversion yields levorotatory optical rotation: ${inversionFull.currentOpticalRotationDegrees} deg (< 0)`);
assert(inversionFull.isInversionComplete === true, '100% conversion marks inversion complete');
assert(inversionFull.glucoseYieldGrams > 17 && inversionFull.fructoseYieldGrams > 17, 'Complete inversion yields equal masses of glucose and fructose');

// Test 9: Cellulose Nitration (Guncotton)
const guncotton = calculateCelluloseNitration({ celluloseMassGrams: 16.214 });
// 16.214 g cellulose = 0.1 mol monomer -> 0.1 mol trinitrate = 29.71 g
assert(Math.abs(guncotton.theoreticalCelluloseTrinitrateGrams - 29.71) < 0.1, `Cellulose trinitrate yield: ${guncotton.theoreticalCelluloseTrinitrateGrams}g (expected ~29.71g)`);
assert(guncotton.nitrogenMassPercent === 14.14, 'Cellulose trinitrate contains 14.14% nitrogen');

console.log('======================================================================');
console.log(` AUDIT SUMMARY: ${passed} / ${passed + failed} TESTS PASSED`);
if (failed > 0) {
  console.log(` FAILURE: ${failed} tests failed!`);
  process.exit(1);
} else {
  console.log(' TEST SUITE 170 COMPLETED IN 100% HARMONY!');
  console.log('======================================================================');
  process.exit(0);
}
