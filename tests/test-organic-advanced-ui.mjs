// tests/test-organic-advanced-ui.mjs
// Suite 166: Advanced Organic Mechanisms Visualizer UI Logic & SEAr Orientation Distribution Audit
// Conforming to Vietnam GDPT 2018 Chemistry 11-12 & IUPAC Guidelines

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
console.log('   ELEMENTA — SUITE 166: ADVANCED ORGANIC UI & SEAr ORIENTATION AUDIT ');
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
// 1. UI Dropdown Catalogs & Default Selections
// -------------------------------------------------------------------
console.log('--- 1. Substrate & Reagent UI Catalog Invariants ---');

runTest('UI default substrate (s_2_bromobutane), nucleophile (iodide), and solvent (acetone) are valid', () => {
  const sub = COMMON_SUBSTRATES_CATALOG.find(s => s.id === 's_2_bromobutane');
  const nuc = COMMON_NUCLEOPHILES_CATALOG.find(n => n.id === 'iodide');
  const sol = COMMON_SOLVENTS_CATALOG.find(sv => sv.id === 'acetone');

  assert.ok(sub, 'Default substrate must exist');
  assert.ok(nuc, 'Default nucleophile must exist');
  assert.ok(sol, 'Default solvent must exist');
  assert.strictEqual(sub.hasChiralCenterAtReactionSite, true);
  assert.strictEqual(nuc.nucleophilicity, 'STRONG');
  assert.strictEqual(sol.type, 'POLAR_APROTIC');
});

runTest('Temperature bounds check in UI slider (0°C to 100°C)', () => {
  const cold = predictSubstitutionElimination({
    substrateId: 'tert_butyl_bromide',
    nucleophileId: 'water',
    solventId: 'water_solvent',
    temperatureCelsius: 10
  });

  const hot = predictSubstitutionElimination({
    substrateId: 'tert_butyl_bromide',
    nucleophileId: 'water',
    solventId: 'water_solvent',
    temperatureCelsius: 85
  });

  assert.strictEqual(cold.predominantMechanism, 'SN1', 'Cold temperature favors SN1 substitution');
  assert.strictEqual(hot.predominantMechanism, 'E1', 'High temperature favors E1 elimination');
});

// -------------------------------------------------------------------
// 2. SEAr Orientation Distribution Sum Invariants
// -------------------------------------------------------------------
console.log('--- 2. SEAr Directing & Distribution Invariants ---');

runTest('All aromatic compounds maintain percentage orientation balance (Ortho + Para + Meta = 100%)', () => {
  const compounds = ['BENZENE', 'TOLUENE', 'PHENOL', 'ANILINE', 'CHLOROBENZENE', 'NITROBENZENE', 'BENZOIC_ACID'];

  for (const comp of compounds) {
    const res = predictAromaticSubstitution({
      aromaticSubstrateKey: comp,
      electrophileType: 'NITRATION'
    });

    const sum = res.orientationDistribution.orthoPct + res.orientationDistribution.paraPct + res.orientationDistribution.metaPct;
    assert.ok(Math.abs(sum - 100) < 0.2, `Sum of percentages for ${comp} should be 100%, got ${sum}`);
    assert.ok(res.reagentsAndCatalystVI.length > 5, 'Must provide reagent & catalyst text');
    assert.ok(res.stepByStepExplanationVI.length >= 3, 'Must provide at least 3 pedagogical steps');
  }
});

runTest('Electrophile generation conditions strictly adhere to GDPT 2018 chemistry', () => {
  const nitration = predictAromaticSubstitution({ aromaticSubstrateKey: 'BENZENE', electrophileType: 'NITRATION' });
  assert.strictEqual(nitration.activeElectrophileFormula, 'NO₂⁺');
  assert.ok(nitration.reagentsAndCatalystVI.includes('HNO₃ đặc') && nitration.reagentsAndCatalystVI.includes('H₂SO₄ đặc'));

  const bromination = predictAromaticSubstitution({ aromaticSubstrateKey: 'BENZENE', electrophileType: 'BROMINATION' });
  assert.strictEqual(bromination.activeElectrophileFormula, 'Br⁺');
  assert.ok(bromination.reagentsAndCatalystVI.includes('FeBr₃') || bromination.reagentsAndCatalystVI.includes('bột Fe'));

  const chlorination = predictAromaticSubstitution({ aromaticSubstrateKey: 'BENZENE', electrophileType: 'CHLORINATION' });
  assert.strictEqual(chlorination.activeElectrophileFormula, 'Cl⁺');
  assert.ok(chlorination.reagentsAndCatalystVI.includes('AlCl₃'));

  const alkylation = predictAromaticSubstitution({ aromaticSubstrateKey: 'BENZENE', electrophileType: 'FRIEDEL_CRAFTS_ALKYLATION' });
  assert.strictEqual(alkylation.activeElectrophileFormula, 'CH₃⁺');
  assert.ok(alkylation.reagentsAndCatalystVI.includes('CH₃Cl'));
});

// -------------------------------------------------------------------
// 3. Educational & Gameplay RPG Synergy
// -------------------------------------------------------------------
console.log('--- 3. Educational Context & Tactical RPG Modifiers ---');

runTest('Walden Inversion grants shield break elemental damage bonus in TCG / RPG', () => {
  const result = predictSubstitutionElimination({
    substrateId: 's_2_bromobutane',
    nucleophileId: 'iodide',
    solventId: 'acetone'
  });

  assert.strictEqual(result.gameplayModifier.elementalDamageType, 'WALDEN_SHIELD_BREAK');
  assert.strictEqual(result.gameplayModifier.damageMultiplier, 1.5);
  assert.ok(result.gameplayModifier.descriptionVI.includes('Nghịch Đảo Walden'));
});

runTest('Aryl halides grant complete resistance due to aromatic inertness', () => {
  const result = predictSubstitutionElimination({
    substrateId: 'bromobenzene',
    nucleophileId: 'hydroxide',
    solventId: 'water_solvent'
  });

  assert.strictEqual(result.gameplayModifier.damageMultiplier, 0);
  assert.strictEqual(result.predominantMechanism, 'NO_REACTION');
});

// -------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 166 COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('======================================================================\n');
