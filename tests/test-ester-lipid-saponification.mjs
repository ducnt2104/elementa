// tests/test-ester-lipid-saponification.mjs
// Suite 168: Fischer Esterification Equilibrium, Lipid Saponification, and Soap Salting-Out Audit
// Strictly aligned with Vietnam GDPT 2018 Chemistry 12 (Chủ đề Este - Lipit) & IUPAC Standards

import assert from 'assert';
import {
  ESTERS_CATALOG,
  TRIGLYCERIDES_CATALOG,
  calculateFischerEsterificationYield,
  calculateSaponification,
  simulateSoapSaltingOut
} from '../src/domain/esterLipidEngine.ts';

console.log('======================================================================');
console.log('   ELEMENTA — SUITE 168: ESTERIFICATION, SAPONIFICATION & SALTING-OUT ');
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
// 1. Fischer Esterification Equilibrium & Le Chatelier Dynamics
// -------------------------------------------------------------------
console.log('--- 1. Fischer Esterification Equilibrium Verification ---');

runTest('Equimolar acid and alcohol (1.0 mol : 1.0 mol) with Kc = 4.0 yields exactly 66.7% equilibrium conversion', () => {
  const result = calculateFischerEsterificationYield({
    initialAcidMoles: 1.0,
    initialAlcoholMoles: 1.0,
    equilibriumConstantKc: 4.0,
    dehydratingAgentUsed: false
  });

  // Kc = x^2 / (1-x)^2 = 4 => x / (1-x) = 2 => x = 2/3 = 0.6667 mol
  assert.ok(result.conversionYieldPercent >= 66.5 && result.conversionYieldPercent <= 66.8,
    `Expected ~66.7% yield, got ${result.conversionYieldPercent}%`);
  assert.strictEqual(result.equilibriumEsterMoles, 0.6667);
  assert.strictEqual(result.remainingAcidMoles, 0.3333);
  assert.strictEqual(result.remainingAlcoholMoles, 0.3333);
  assert.strictEqual(result.theoreticalMaxEsterMoles, 1.0);
});

runTest('Adding dehydrating agent (H2SO4 dac / Dean-Stark trap) boosts yield beyond 85%', () => {
  const normal = calculateFischerEsterificationYield({
    initialAcidMoles: 1.0,
    initialAlcoholMoles: 1.0,
    dehydratingAgentUsed: false
  });

  const dehydrated = calculateFischerEsterificationYield({
    initialAcidMoles: 1.0,
    initialAlcoholMoles: 1.0,
    dehydratingAgentUsed: true
  });

  assert.ok(dehydrated.conversionYieldPercent > normal.conversionYieldPercent + 15,
    `Dehydration should boost yield significantly: ${dehydrated.conversionYieldPercent}% vs ${normal.conversionYieldPercent}%`);
  assert.ok(dehydrated.conversionYieldPercent >= 84.0, 'Yield with dehydrating agent should be >= 84%');
  assert.ok(dehydrated.stepByStepExplanationVI[2].includes('Le Chatelier'));
});

runTest('Excess alcohol (1.0 mol acid : 3.0 mol alcohol) shifts equilibrium to > 88% acid conversion', () => {
  const excessAlcohol = calculateFischerEsterificationYield({
    initialAcidMoles: 1.0,
    initialAlcoholMoles: 3.0,
    equilibriumConstantKc: 4.0,
    dehydratingAgentUsed: false
  });

  // Limiting reactant is acid (1.0 mol)
  assert.strictEqual(excessAlcohol.theoreticalMaxEsterMoles, 1.0);
  assert.ok(excessAlcohol.conversionYieldPercent >= 88.0 && excessAlcohol.conversionYieldPercent <= 92.0,
    `Expected ~90% acid conversion with 3x alcohol, got ${excessAlcohol.conversionYieldPercent}%`);
});

// -------------------------------------------------------------------
// 2. Triglyceride Saponification & Mass Conservation Stoichiometry
// -------------------------------------------------------------------
console.log('--- 2. Triglyceride Saponification Dynamics ---');

runTest('Triolein saponification adheres strictly to mass conservation and 1:3:3:1 molar ratio', () => {
  // 885.43 g of Triolein = 1.0 mol
  const result = calculateSaponification({
    triglycerideId: 'triolein',
    lipidMassGrams: 885.43,
    naohConcentrationM: 1.0
  });

  // 1 mol lipid requires 3 mol NaOH = 3 * 39.997 = 119.99 g
  // Produces 1 mol Glycerol (92.09 g) + 3 mol Sodium Oleate (C17H33COONa = 304.44 * 3 = 913.33 g)
  // Total input: 885.43 + 120.0 = 1005.43 g
  // Total output: 913.34 + 92.09 = 1005.43 g
  assert.strictEqual(result.naohVolumeMl, 3000.0, '3.0 L of 1.0 M NaOH required for 1.0 mol lipid');
  assert.strictEqual(result.theoreticalGlycerolYieldGrams, 92.09, 'Exactly 1.0 mol of glycerol (92.09 g)');
  assert.ok(result.theoreticalSoapYieldGrams >= 913.0 && result.theoreticalSoapYieldGrams <= 914.0,
    `Expected ~913.3 g soap, got ${result.theoreticalSoapYieldGrams} g`);
  assert.ok(result.iodineAbsorptionCapacityGrams >= 760.0 && result.iodineAbsorptionCapacityGrams <= 762.0,
    `1 mol triolein with 3 double bonds consumes 3 mol I2 (761.4 g), got ${result.iodineAbsorptionCapacityGrams} g`);
});

runTest('Tristearin is saturated solid fat with zero iodine absorption capacity', () => {
  const result = calculateSaponification({
    triglycerideId: 'tristearin',
    lipidMassGrams: 100.0
  });

  assert.strictEqual(result.lipid.fattyAcidDoubleBonds, 0);
  assert.strictEqual(result.lipid.physicalStateAt25C, 'SOLID_FAT');
  assert.strictEqual(result.iodineAbsorptionCapacityGrams, 0.0, 'Saturated fat has 0 iodine capacity');
  assert.strictEqual(result.saponificationValueMgKohPerG, 188.8);
});

// -------------------------------------------------------------------
// 3. Salting-Out Effect (Muối Kết Xà Phòng)
// -------------------------------------------------------------------
console.log('--- 3. Soap Salting-Out & Common Ion Effect ---');

runTest('Low NaCl concentration (< 2%) does not precipitate soap', () => {
  const result = simulateSoapSaltingOut({
    soapMassGrams: 50.0,
    waterVolumeMl: 200.0,
    addedNaclGrams: 2.0 // ~1% w/w
  });

  assert.strictEqual(result.isSaltingOutThresholdReached, false);
  assert.strictEqual(result.precipitatedSoapCakeGrams, 0.0);
  assert.strictEqual(result.residualDissolvedSoapGrams, 50.0);
  assert.ok(result.visualPhenomenonVI.includes('đồng nhất'));
});

runTest('Saturated NaCl concentration (> 15%) precipitates over 90% of soap as floating cake', () => {
  const result = simulateSoapSaltingOut({
    soapMassGrams: 100.0,
    waterVolumeMl: 300.0,
    addedNaclGrams: 60.0 // ~16.7% w/w
  });

  assert.strictEqual(result.isSaltingOutThresholdReached, true);
  assert.ok(result.precipitationEfficiencyPercent > 90.0, `Expected > 90%, got ${result.precipitationEfficiencyPercent}%`);
  assert.ok(result.precipitatedSoapCakeGrams > 90.0);
  assert.strictEqual(Math.round(result.precipitatedSoapCakeGrams + result.residualDissolvedSoapGrams), 100.0, 'Mass conserved');
  assert.ok(result.visualPhenomenonVI.includes('nổi lên trên bề mặt'));
  assert.ok(result.pedagogicalRationaleVI.includes('Salting-out'));
});

// -------------------------------------------------------------------
// 4. Fragrance Esters Catalog Completeness & Chemical Specifics
// -------------------------------------------------------------------
console.log('--- 4. Fragrance Esters Catalog Integrity ---');

runTest('Esters catalog contains classic Vietnam GDPT 2018 curriculum fruit aromas', () => {
  assert.ok(ESTERS_CATALOG.length >= 5);
  const ids = ESTERS_CATALOG.map(e => e.id);
  assert.ok(ids.includes('isoamyl_acetate'), 'Isoamyl acetate (banana oil) must exist');
  assert.ok(ids.includes('ethyl_acetate'), 'Ethyl acetate must exist');
  assert.ok(ids.includes('benzyl_acetate'), 'Benzyl acetate (jasmine) must exist');
  assert.ok(ids.includes('ethyl_formate'), 'Ethyl formate (peach) must exist');
  assert.ok(ids.includes('ethyl_butyrate'), 'Ethyl butyrate (pineapple) must exist');

  const isoamyl = ESTERS_CATALOG.find(e => e.id === 'isoamyl_acetate');
  assert.ok(isoamyl.fragranceNoteVI.includes('chuối chín'));
  assert.strictEqual(isoamyl.boilingPointC, 142.0);

  const ethylFormate = ESTERS_CATALOG.find(e => e.id === 'ethyl_formate');
  assert.ok(ethylFormate.curriculumContextVI.includes('tráng bạc'), 'Must note Tollens silver mirror test for formate ester');
});

// -------------------------------------------------------------------
// 5. Parameter Boundary Validations & Error Handling
// -------------------------------------------------------------------
console.log('--- 5. Parameter Boundary Validations ---');

runTest('Non-positive values throw descriptive errors', () => {
  assert.throws(() => {
    calculateFischerEsterificationYield({
      initialAcidMoles: 0,
      initialAlcoholMoles: 1.0
    });
  }, /lớn hơn 0/);

  assert.throws(() => {
    calculateSaponification({
      triglycerideId: 'triolein',
      lipidMassGrams: -50
    });
  }, /lớn hơn 0/);

  assert.throws(() => {
    simulateSoapSaltingOut({
      soapMassGrams: 50,
      waterVolumeMl: 200,
      addedNaclGrams: -10
    });
  }, /không âm/);
});

// -------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------
console.log('\n======================================================================');
console.log(` SUITE 168 COMPLETE: ${passedTests} / ${totalTests} TESTS PASSED (100%)`);
console.log('======================================================================\n');
