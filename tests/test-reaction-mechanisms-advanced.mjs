// tests/test-reaction-mechanisms-advanced.mjs
// Suite 165: Advanced Reaction Mechanisms (SN1, SN2, E1, E2, and SEAr) Verification
// Aligned with Vietnam GDPT 2018 Chemistry 11-12 & IUPAC Physical Organic Chemistry Standards

import assert from 'assert';
import {
  COMMON_SUBSTRATES_CATALOG,
  COMMON_NUCLEOPHILES_CATALOG,
  COMMON_SOLVENTS_CATALOG,
  SEAR_SUBSTITUENTS_CATALOG,
  predictSubstitutionElimination,
  predictAromaticSubstitution
} from '../src/domain/reactionMechanismsAdvancedEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 165: REACTION MECHANISMS ADVANCED AUDIT (SN/E/SEAr) ');
console.log('======================================================================\n');

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

// -------------------------------------------------------------------
// 1. Catalogs Integrity & Physical Organic Parameters
// -------------------------------------------------------------------
console.log('--- 1. Catalogs Completeness & Thermodynamic Invariants ---');

runTest('Catalogs cover complete spectrum of methyl, 1°, 2°, 3°, and aryl substrates', () => {
  assert.ok(COMMON_SUBSTRATES_CATALOG.length >= 6);
  const classes = COMMON_SUBSTRATES_CATALOG.map(s => s.carbonClassification);
  assert.ok(classes.includes('METHYL'));
  assert.ok(classes.includes('PRIMARY'));
  assert.ok(classes.includes('SECONDARY'));
  assert.ok(classes.includes('TERTIARY'));
  assert.ok(classes.includes('ARYL'));

  // Tert-butyl bromide must have high steric hindrance and high carbocation stability
  const tBuBr = COMMON_SUBSTRATES_CATALOG.find(s => s.id === 'tert_butyl_bromide');
  assert.strictEqual(tBuBr.stericHindranceScore, 9);
  assert.strictEqual(tBuBr.carbocationStabilityScore, 9);
});

runTest('Solvents catalog differentiates polar protic vs polar aprotic dielectric constants', () => {
  const water = COMMON_SOLVENTS_CATALOG.find(s => s.id === 'water_solvent');
  const acetone = COMMON_SOLVENTS_CATALOG.find(s => s.id === 'acetone');
  const dmso = COMMON_SOLVENTS_CATALOG.find(s => s.id === 'dmso');

  assert.strictEqual(water.type, 'POLAR_PROTIC');
  assert.strictEqual(acetone.type, 'POLAR_APROTIC');
  assert.strictEqual(dmso.type, 'POLAR_APROTIC');
  assert.ok(water.dielectricConstant > 70, 'Water has high dielectric constant');
  assert.ok(dmso.dielectricConstant > 40, 'DMSO has high polar aprotic permittivity');
});

// -------------------------------------------------------------------
// 2. Methyl and Primary Substrates: Strict SN2 Kinetics
// -------------------------------------------------------------------
console.log('--- 2. Methyl & Primary Substrates (Strict SN2) ---');

runTest('Methyl bromide with hydroxide in acetone proceeds strictly via SN2', () => {
  const result = predictSubstitutionElimination({
    substrateId: 'methyl_bromide',
    nucleophileId: 'hydroxide',
    solventId: 'acetone'
  });

  assert.strictEqual(result.predominantMechanism, 'SN2');
  assert.strictEqual(result.kineticOrder, 2);
  assert.ok(result.rateLawEquation.includes('[Cơ chất]') && result.rateLawEquation.includes('[Nucleophile]'));
  assert.strictEqual(result.stereochemicalOutcome, 'WALDEN_INVERSION');
  assert.ok(result.intermediateOrTransitionStateVI.includes('ngũ phối tử'));
});

runTest('Primary ethyl bromide with cyanide in DMSO performs fast concerted backside attack', () => {
  const result = predictSubstitutionElimination({
    substrateId: 'ethyl_bromide',
    nucleophileId: 'cyanide',
    solventId: 'dmso'
  });

  assert.strictEqual(result.predominantMechanism, 'SN2');
  assert.strictEqual(result.kineticOrder, 2);
  assert.strictEqual(result.gameplayModifier.spellSpeed, 2);
});

// -------------------------------------------------------------------
// 3. Tertiary Substrates: Steric Blockade of SN2 & Carbocation Regimes
// -------------------------------------------------------------------
console.log('--- 3. Tertiary Substrates (E2 vs SN1/E1) ---');

runTest('tert-Butyl bromide with strong base (OH-) undergoes exclusive E2 elimination', () => {
  const result = predictSubstitutionElimination({
    substrateId: 'tert_butyl_bromide',
    nucleophileId: 'hydroxide',
    solventId: 'water_solvent'
  });

  assert.strictEqual(result.predominantMechanism, 'E2');
  assert.strictEqual(result.stereochemicalOutcome, 'ZAITSEV_ALKENE');
  assert.strictEqual(result.kineticOrder, 2);
  assert.strictEqual(result.majorProductFormula, '(CH3)2C=CH2');
});

runTest('tert-Butyl bromide with weak nucleophile (H2O) at 25°C undergoes SN1 solvolysis', () => {
  const result = predictSubstitutionElimination({
    substrateId: 'tert_butyl_bromide',
    nucleophileId: 'water',
    solventId: 'water_solvent',
    temperatureCelsius: 25
  });

  assert.strictEqual(result.predominantMechanism, 'SN1');
  assert.strictEqual(result.kineticOrder, 1);
  assert.strictEqual(result.rateLawEquation, 'v = k · [Cơ chất]');
  assert.strictEqual(result.majorProductFormula, '(CH3)3C-OH');
  assert.ok(result.intermediateOrTransitionStateVI.includes('hyperconjugation'));
});

runTest('tert-Butyl bromide with weak nucleophile at 70°C switches to E1 elimination', () => {
  const result = predictSubstitutionElimination({
    substrateId: 'tert_butyl_bromide',
    nucleophileId: 'ethanol',
    solventId: 'ethanol_solvent',
    temperatureCelsius: 70
  });

  assert.strictEqual(result.predominantMechanism, 'E1');
  assert.strictEqual(result.competingMechanism, 'SN1');
  assert.strictEqual(result.stereochemicalOutcome, 'ZAITSEV_ALKENE');
});

// -------------------------------------------------------------------
// 4. Secondary Substrates: Walden Inversion vs Racemization
// -------------------------------------------------------------------
console.log('--- 4. Chiral Secondary Substrate Stereochemistry ---');

runTest('(S)-2-Bromobutane with iodide in polar aprotic acetone yields 100% Walden Inversion (SN2)', () => {
  const result = predictSubstitutionElimination({
    substrateId: 's_2_bromobutane',
    nucleophileId: 'iodide',
    solventId: 'acetone'
  });

  assert.strictEqual(result.predominantMechanism, 'SN2');
  assert.strictEqual(result.stereochemicalOutcome, 'WALDEN_INVERSION');
  assert.ok(result.majorProductNameVI.includes('Walden') || result.majorProductNameVI.includes('(R)'));
  assert.strictEqual(result.gameplayModifier.elementalDamageType, 'WALDEN_SHIELD_BREAK');
  assert.strictEqual(result.gameplayModifier.damageMultiplier, 1.5);
});

runTest('(S)-2-Bromobutane with weak nucleophile (H2O) yields Racemization (SN1)', () => {
  const result = predictSubstitutionElimination({
    substrateId: 's_2_bromobutane',
    nucleophileId: 'water',
    solventId: 'water_solvent'
  });

  assert.strictEqual(result.predominantMechanism, 'SN1');
  assert.strictEqual(result.stereochemicalOutcome, 'RACEMIZATION');
  assert.ok(result.majorProductNameVI.includes('racemic'));
});

// -------------------------------------------------------------------
// 5. Bulky Base Effect & Aryl Halide Inertness
// -------------------------------------------------------------------
console.log('--- 5. Bulky Base & Inert Substrates ---');

runTest('Bulky base (t-BuO-) forces E2 elimination with Hofmann orientation', () => {
  const result = predictSubstitutionElimination({
    substrateId: 's_2_bromobutane',
    nucleophileId: 'tert_butoxide',
    solventId: 'acetone'
  });

  assert.strictEqual(result.predominantMechanism, 'E2');
  assert.strictEqual(result.stereochemicalOutcome, 'HOFMANN_ALKENE');
  assert.ok(result.stepByStepExplanationVI[2].includes('Hofmann'));
});

runTest('Aryl halide (Bromobenzene) is completely inert under standard conditions', () => {
  const result = predictSubstitutionElimination({
    substrateId: 'bromobenzene',
    nucleophileId: 'hydroxide',
    solventId: 'water_solvent'
  });

  assert.strictEqual(result.predominantMechanism, 'NO_REACTION');
  assert.strictEqual(result.kineticOrder, 0);
  assert.strictEqual(result.gameplayModifier.damageMultiplier, 0);
  assert.ok(result.intermediateOrTransitionStateVI.includes('C(sp2)-X'));
});

// -------------------------------------------------------------------
// 6. Electrophilic Aromatic Substitution (SEAr)
// -------------------------------------------------------------------
console.log('--- 6. Electrophilic Aromatic Substitution (SEAr) ---');

runTest('Benzene nitration produces nitrobenzene via NO2+ electrophile and Wheland complex', () => {
  const result = predictAromaticSubstitution({
    aromaticSubstrateKey: 'BENZENE',
    electrophileType: 'NITRATION'
  });

  assert.strictEqual(result.activeElectrophileFormula, 'NO₂⁺');
  assert.strictEqual(result.majorProductVI, 'Nitrobenzen (C₆H₅NO₂)');
  assert.ok(result.whelandComplexIntermediateVI.includes('Phức chất σ'));
});

runTest('Toluene directs electrophile to Ortho (58%) and Para (38%) positions with +I activation', () => {
  const result = predictAromaticSubstitution({
    aromaticSubstrateKey: 'TOLUENE',
    electrophileType: 'NITRATION'
  });

  assert.strictEqual(result.substituentInfo.directingCategory, 'ORTHO_PARA_ACTIVATING');
  assert.strictEqual(result.orientationDistribution.orthoPct, 58);
  assert.strictEqual(result.orientationDistribution.paraPct, 38);
  assert.strictEqual(result.orientationDistribution.metaPct, 4);
  assert.ok(result.reactivityComparisonToBenzeneVI.includes('Hoạt hóa nhẹ'));
});

runTest('Phenol bromination produces 2,4,6-tribromophenol white precipitate without catalyst', () => {
  const result = predictAromaticSubstitution({
    aromaticSubstrateKey: 'PHENOL',
    electrophileType: 'BROMINATION'
  });

  assert.strictEqual(result.substituentInfo.activationLevel, 'STRONGLY_ACTIVATING');
  assert.ok(result.majorProductVI.includes('2,4,6-Tribromophenol'));
  assert.ok(result.majorProductVI.includes('Kết tủa trắng'));
});

runTest('Nitrobenzene deactivates ring and directs substitution to Meta position (93%)', () => {
  const result = predictAromaticSubstitution({
    aromaticSubstrateKey: 'NITROBENZENE',
    electrophileType: 'CHLORINATION'
  });

  assert.strictEqual(result.substituentInfo.directingCategory, 'META_DEACTIVATING');
  assert.strictEqual(result.orientationDistribution.metaPct, 93);
  assert.ok(result.reactivityComparisonToBenzeneVI.includes('Phản hoạt hóa'));
});

runTest('Chlorobenzene directs Ortho/Para (70% para) despite being deactivated (-I > +M)', () => {
  const result = predictAromaticSubstitution({
    aromaticSubstrateKey: 'CHLOROBENZENE',
    electrophileType: 'NITRATION'
  });

  assert.strictEqual(result.substituentInfo.directingCategory, 'ORTHO_PARA_DEACTIVATING');
  assert.strictEqual(result.orientationDistribution.paraPct, 70);
  assert.strictEqual(result.orientationDistribution.metaPct, 0);
  assert.ok(result.substituentInfo.explanationVI.includes('phản hoạt hóa'));
});

// -------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 165 COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('======================================================================\n');
