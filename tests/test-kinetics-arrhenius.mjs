// test-kinetics-arrhenius.mjs
// Comprehensive test suite for Chemical Kinetics & Arrhenius Visualizer Engine (GDPT 2018 & IUPAC Compliant)

import assert from 'node:assert';
import {
  ThermochemistryEngine,
  REACTION_KINETICS_PROFILES,
  STANDARD_FORMATION_ENTHALPY,
  BOND_ENERGIES,
  CURRICULUM_THERMO_REACTIONS,
  CURRICULUM_BOND_ENTHALPY_REACTIONS
} from '../src/domain/thermochemistryEngine.ts';

console.log('--- TEST SUITE 28: CHEMICAL KINETICS & ARRHENIUS ENGINE ---');

// Test 1: Van 't Hoff Reaction Rate Scaling
console.log("Test 1: Van 't Hoff Reaction Rate Scaling Rules...");

// Rule 1: At ΔT = 0, rate ratio must be 1.0
const v0 = ThermochemistryEngine.calculateVanTHoffRateIncrease(25, 25, 2.5);
assert.strictEqual(v0.rateRatio, 1.0, 'At deltaT = 0, rate ratio must be exactly 1.0');
assert.strictEqual(v0.deltaT, 0, 'deltaT must be 0');
assert.strictEqual(v0.exponent, 0, 'exponent must be 0');

// Rule 2: At ΔT = +10°C, rate ratio must equal gamma
const v10 = ThermochemistryEngine.calculateVanTHoffRateIncrease(25, 35, 3.0);
assert.strictEqual(v10.rateRatio, 3.0, 'At deltaT = 10, gamma = 3, rate ratio must be 3.0');

// Rule 3: At ΔT = +30°C (3 intervals), rate ratio = gamma^3
// gamma = 2.0 -> 2^3 = 8
const v30 = ThermochemistryEngine.calculateVanTHoffRateIncrease(20, 50, 2.0);
assert.strictEqual(v30.rateRatio, 8.0, 'At deltaT = 30, gamma = 2, rate ratio must be 8.0');

// Rule 4: At negative ΔT = -20°C (cooling), rate ratio = gamma^(-2) = 1/4 = 0.25
const vMinus20 = ThermochemistryEngine.calculateVanTHoffRateIncrease(40, 20, 2.0);
assert.strictEqual(vMinus20.rateRatio, 0.25, 'At deltaT = -20, gamma = 2, rate ratio must be 0.25');

console.log('  ✓ Van \'t Hoff rule mathematically verified for baseline, heating, cooling, and variable gamma');

// Test 2: Arrhenius Catalyst Activation Energy Reduction
console.log('Test 2: Arrhenius Catalyst Acceleration Factor Calculations...');

// Rule 1: No change in Ea (deltaEa = 0) -> speedupFactor = 1.0
const cat0 = ThermochemistryEngine.calculateCatalystSpeedup(50, 50, 298.15);
assert.strictEqual(cat0.deltaEa_kJ, 0, 'deltaEa must be 0');
assert.strictEqual(cat0.speedupFactor, 1, 'speedupFactor must be 1');

// Rule 2: Typical deltaEa (e.g. esterification: 65 -> 42 kJ/mol, deltaEa = 23 kJ/mol at 343.15 K)
// deltaEa_J = 23,000 J/mol. R = 8.314. T = 343.15 K. R*T = 2852.95. Exponent = 23000 / 2852.95 = 8.0618. exp(8.0618) = 3171
const catEster = ThermochemistryEngine.calculateCatalystSpeedup(65, 42, 343.15);
assert.strictEqual(catEster.deltaEa_kJ, 23, 'Esterification deltaEa must be 23 kJ/mol');
assert(catEster.speedupFactor > 3000 && catEster.speedupFactor < 3300, `Speedup must be ~3171, got ${catEster.speedupFactor}`);
assert(catEster.speedupFormatted.length > 0, 'speedupFormatted must be non-empty');

// Rule 3: Extreme deltaEa (Haber-Bosch: 335 -> 103 kJ/mol, deltaEa = 232 kJ/mol at 298.15 K)
// Must format cleanly without crash or NaN
const catHaber = ThermochemistryEngine.calculateCatalystSpeedup(335, 103, 298.15);
assert.strictEqual(catHaber.deltaEa_kJ, 232, 'Haber deltaEa must be 232 kJ/mol');
assert(!isNaN(catHaber.speedupFactor), 'speedupFactor must not be NaN');
assert(catHaber.speedupFormatted.includes('10^') || catHaber.speedupFormatted.includes('e+'), 'Must use exponential format for huge factors');

console.log('  ✓ Arrhenius speedup equations handle normal, extreme, and zero-delta conditions reliably');

// Test 3: Catalog Kinetics Profiles Integrity
console.log('Test 3: Catalog Kinetics Profiles Integrity...');
const profileKeys = Object.keys(REACTION_KINETICS_PROFILES);
assert(profileKeys.length >= 8, `Expected at least 8 reaction profiles, found ${profileKeys.length}`);

for (const key of profileKeys) {
  const profile = ThermochemistryEngine.getKineticsProfile(key);
  assert(profile, `Profile for ${key} must exist`);
  assert(profile.eaUncatalyzed_kJ > 0, `Profile ${key} must have positive uncatalyzed Ea`);
  assert(profile.reactionNameVI.length > 5, `Profile ${key} has invalid reaction name`);
  assert(profile.mechanismNoteVI.length > 15, `Profile ${key} has insufficient mechanism note`);

  if (profile.eaCatalyzed_kJ !== undefined) {
    assert(
      profile.eaCatalyzed_kJ < profile.eaUncatalyzed_kJ,
      `Catalyzed Ea must be strictly less than uncatalyzed Ea for ${key}`
    );
    assert(profile.catalystName && profile.catalystName.length > 2, `Profile ${key} missing catalyst name`);
    assert(profile.catalystKey && profile.catalystKey.length > 0, `Profile ${key} missing catalyst key`);
  }
}
console.log(`  ✓ All ${profileKeys.length} kinetics profiles verified for IUPAC/GDPT 2018 consistency`);

// Test 4: Enthalpy Calculation & Exothermic / Endothermic Classification
console.log('Test 4: Enthalpy Calculations for Curriculum Reactions...');
assert(CURRICULUM_THERMO_REACTIONS.length >= 6, 'Must have at least 6 curriculum reactions');

for (const rx of CURRICULUM_THERMO_REACTIONS) {
  const result = ThermochemistryEngine.calculateEnthalpyFromFormation(rx);
  assert(!isNaN(result.delta_r_H298), `Enthalpy for ${rx.id} must be a number`);
  assert(result.stepExplanationVI.length >= 4, `Reaction ${rx.id} must have step-by-step explanations`);
  assert(result.reactionTypeVI.length > 0, `Reaction ${rx.id} must have reactionTypeVI`);

  if (rx.id === 'thermite_rx') {
    // 2Al + Fe2O3 -> Al2O3 + 2Fe
    // delta_r H = -1675.7 - (-824.2) = -851.5 kJ
    assert.strictEqual(result.delta_r_H298, -851.5, 'Thermite reaction enthalpy must be -851.5 kJ');
    assert.strictEqual(result.isExothermic, true, 'Thermite must be exothermic');
  } else if (rx.id === 'limestone_decomp') {
    // CaCO3 -> CaO + CO2
    // delta_r H = (-635.1 + -393.5) - (-1206.9) = -1028.6 - (-1206.9) = +178.3 kJ
    assert.strictEqual(result.delta_r_H298, 178.3, 'Limestone decomposition must be +178.3 kJ');
    assert.strictEqual(result.isExothermic, false, 'Limestone decomposition must be endothermic');
  }
}
console.log('  ✓ Enthalpy of reaction accurately matches Standard Formation Enthalpy values');

// Test 5: Standard Formation Enthalpy Reference State Zero Law
console.log('Test 5: Standard Formation Enthalpy Reference State Zero Law...');
const referenceElements = ['O2(g)', 'H2(g)', 'N2(g)', 'Cl2(g)', 'Na(s)', 'Fe(s)', 'Al(s)', 'Cu(s)', 'C(graphite)'];
for (const elem of referenceElements) {
  const data = STANDARD_FORMATION_ENTHALPY[elem];
  assert(data, `Reference element ${elem} must exist in database`);
  assert.strictEqual(data.delta_f_H298, 0, `Standard formation enthalpy of reference element ${elem} must be 0`);
}
console.log('  ✓ Reference state elements strictly obey IUPAC delta_f H° = 0 convention');

// Test 6: Chemical Bond Energy Enthalpy Calculations (GDPT 2018 Method 2)
console.log('Test 6: Chemical Bond Energy Enthalpy Calculations (Delta_r H = Sum Eb_reactants - Sum Eb_products)...');

// Reaction 1: H2(g) + Cl2(g) -> 2HCl(g)
const h2cl2Result = ThermochemistryEngine.calculateEnthalpyFromBondEnergies({
  id: 'h2_cl2_rx',
  equation: 'H2(g) + Cl2(g) -> 2HCl(g)',
  name_vi: 'Tổng Hợp Axit Clohiđric Khí',
  reactantBonds: [
    { bond: 'H-H', count: 1 },
    { bond: 'Cl-Cl', count: 1 }
  ],
  productBonds: [
    { bond: 'H-Cl', count: 2 }
  ]
});

// Reactants: 436 + 243 = 679. Products: 2 * 432 = 864. Delta = 679 - 864 = -185 kJ
assert.strictEqual(h2cl2Result.sumReactantsEb, 679, 'Reactant bond energies sum must be 679 kJ');
assert.strictEqual(h2cl2Result.sumProductsEb, 864, 'Product bond energies sum must be 864 kJ');
assert.strictEqual(h2cl2Result.delta_r_H298, -185.0, 'Enthalpy from bond energies must be -185.0 kJ');
assert.strictEqual(h2cl2Result.isExothermic, true, 'H2 + Cl2 must be exothermic');
assert(h2cl2Result.stepExplanationVI.length >= 4, 'Step explanations must be complete');

// Reaction 2: Haber-Bosch N2(g) + 3H2(g) -> 2NH3(g)
const haberBondResult = ThermochemistryEngine.calculateEnthalpyFromBondEnergies({
  id: 'haber_bond_rx',
  equation: 'N2(g) + 3H2(g) -> 2NH3(g)',
  name_vi: 'Tổng Hợp Amoniac (Tính Theo Năng Lượng Liên Kết)',
  reactantBonds: [
    { bond: 'N#N', count: 1 },
    { bond: 'H-H', count: 3 }
  ],
  productBonds: [
    { bond: 'N-H', count: 6 }
  ]
});

// Reactants: 945 + 3 * 436 = 2253. Products: 6 * 391 = 2346. Delta = 2253 - 2346 = -93 kJ
assert.strictEqual(haberBondResult.sumReactantsEb, 2253, 'Haber reactant bond energies sum must be 2253 kJ');
assert.strictEqual(haberBondResult.sumProductsEb, 2346, 'Haber product bond energies sum must be 2346 kJ');
assert.strictEqual(haberBondResult.delta_r_H298, -93.0, 'Haber enthalpy from bond energies must be -93.0 kJ');
assert.strictEqual(haberBondResult.isExothermic, true, 'Haber reaction must be exothermic');

// Reaction 3: Methane Combustion CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)
const ch4BondRx = CURRICULUM_BOND_ENTHALPY_REACTIONS.find((r) => r.id === 'methane_combustion_bond_rx');
assert(ch4BondRx, 'Methane combustion bond reaction must be registered');
const ch4BondResult = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(ch4BondRx);
// Reactants: 4*413 + 2*498 = 1652 + 996 = 2648 kJ
// Products: 2*799 + 4*467 = 1598 + 1868 = 3466 kJ
// Delta = 2648 - 3466 = -818.0 kJ
assert.strictEqual(ch4BondResult.sumReactantsEb, 2648, 'Methane reactant bond energies sum must be 2648 kJ');
assert.strictEqual(ch4BondResult.sumProductsEb, 3466, 'Methane product bond energies sum must be 3466 kJ');
assert.strictEqual(ch4BondResult.delta_r_H298, -818.0, 'Methane combustion enthalpy from bond energies must be -818.0 kJ');
assert.strictEqual(ch4BondResult.isExothermic, true, 'Methane combustion must be exothermic');

// Reaction 4: Ethane Combustion 2C2H6(g) + 7O2(g) -> 4CO2(g) + 6H2O(g)
const c2h6BondRx = CURRICULUM_BOND_ENTHALPY_REACTIONS.find((r) => r.id === 'ethane_combustion_bond_rx');
assert(c2h6BondRx, 'Ethane combustion bond reaction must be registered');
const c2h6BondResult = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(c2h6BondRx);
// Reactants: 2*347 + 12*413 + 7*498 = 694 + 4956 + 3486 = 9136 kJ
// Products: 8*799 + 12*467 = 6392 + 5604 = 11996 kJ
// Delta = 9136 - 11996 = -2860.0 kJ
assert.strictEqual(c2h6BondResult.sumReactantsEb, 9136, 'Ethane reactant bond energies sum must be 9136 kJ');
assert.strictEqual(c2h6BondResult.sumProductsEb, 11996, 'Ethane product bond energies sum must be 11996 kJ');
assert.strictEqual(c2h6BondResult.delta_r_H298, -2860.0, 'Ethane combustion enthalpy must be -2860.0 kJ');
assert.strictEqual(c2h6BondResult.isExothermic, true, 'Ethane combustion must be exothermic');

// Reaction 5: Propane Combustion C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)
const c3h8BondRx = CURRICULUM_BOND_ENTHALPY_REACTIONS.find((r) => r.id === 'propane_combustion_bond_rx');
assert(c3h8BondRx, 'Propane combustion bond reaction must be registered');
const c3h8BondResult = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(c3h8BondRx);
// Reactants: 2*347 + 8*413 + 5*498 = 694 + 3304 + 2490 = 6488 kJ
// Products: 6*799 + 8*467 = 4794 + 3736 = 8530 kJ
// Delta = 6488 - 8530 = -2042.0 kJ
assert.strictEqual(c3h8BondResult.sumReactantsEb, 6488, 'Propane reactant bond energies sum must be 6488 kJ');
assert.strictEqual(c3h8BondResult.sumProductsEb, 8530, 'Propane product bond energies sum must be 8530 kJ');
assert.strictEqual(c3h8BondResult.delta_r_H298, -2042.0, 'Propane combustion enthalpy must be -2042.0 kJ');
assert.strictEqual(c3h8BondResult.isExothermic, true, 'Propane combustion must be exothermic');

// Reaction 6: Ethene Hydrogenation C2H4(g) + H2(g) -> C2H6(g)
const etheneBondRx = CURRICULUM_BOND_ENTHALPY_REACTIONS.find((r) => r.id === 'ethene_hydrogenation_bond_rx');
assert(etheneBondRx, 'Ethene hydrogenation bond reaction must be registered');
const etheneBondResult = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(etheneBondRx);
// Reactants: 614 + 4*413 + 436 = 2702 kJ. Products: 347 + 6*413 = 2825 kJ. Delta = 2702 - 2825 = -123.0 kJ
assert.strictEqual(etheneBondResult.sumReactantsEb, 2702, 'Ethene reactant bond energies sum must be 2702 kJ');
assert.strictEqual(etheneBondResult.sumProductsEb, 2825, 'Ethene product bond energies sum must be 2825 kJ');
assert.strictEqual(etheneBondResult.delta_r_H298, -123.0, 'Ethene hydrogenation enthalpy must be -123.0 kJ');

// Error Guard: Missing bond energy throws descriptive error
assert.throws(() => {
  ThermochemistryEngine.calculateEnthalpyFromBondEnergies({
    id: 'invalid_bond_rx',
    equation: 'X2 -> 2X',
    name_vi: 'Phản ứng giả định',
    reactantBonds: [{ bond: 'X-X_UNKNOWN', count: 1 }],
    productBonds: []
  });
}, /Không tìm thấy năng lượng liên kết/, 'Unknown bond must throw descriptive error');
console.log('  ✓ Bond energy enthalpy calculations accurately match GDPT 2018 formulas for H2+Cl2, Haber-Bosch, CH4, C2H6, C3H8, and C2H4+H2');

// Test 7: Predefined Curriculum Bond Enthalpy Catalog Coverage
console.log('Test 7: Predefined Curriculum Bond Enthalpy Catalog Coverage & Integrity...');
assert.strictEqual(CURRICULUM_BOND_ENTHALPY_REACTIONS.length, 8, 'Must have exactly 8 curriculum bond enthalpy reactions');
for (const rx of CURRICULUM_BOND_ENTHALPY_REACTIONS) {
  assert(rx.id && rx.id.length > 0, 'Reaction must have valid id');
  assert(rx.equation && rx.equation.length > 5, `Reaction ${rx.id} must have equation`);
  assert(rx.name_vi && rx.name_vi.length > 5, `Reaction ${rx.id} must have Vietnamese name`);
  assert(rx.reactantBonds.length > 0, `Reaction ${rx.id} must have reactant bonds`);
  assert(rx.productBonds.length > 0, `Reaction ${rx.id} must have product bonds`);
  const calc = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(rx);
  assert(!isNaN(calc.delta_r_H298), `Reaction ${rx.id} calculated enthalpy must be numeric`);
  assert(calc.stepExplanationVI.length >= 4, `Reaction ${rx.id} must have complete step explanations`);
}
console.log('  ✓ All 8 predefined bond enthalpy reactions calculate valid stoichiometric thermodynamic delta_r H°');

// Test 8: Temperature Sensitivity of Catalyst Acceleration Ratio
console.log('Test 8: Temperature Sensitivity of Catalyst Acceleration Ratio...');
const speedupAt300K = ThermochemistryEngine.calculateCatalystSpeedup(100, 50, 300.0);
const speedupAt600K = ThermochemistryEngine.calculateCatalystSpeedup(100, 50, 600.0);

assert.strictEqual(speedupAt300K.deltaEa_kJ, 50, 'Delta Ea at 300 K is 50 kJ/mol');
assert.strictEqual(speedupAt600K.deltaEa_kJ, 50, 'Delta Ea at 600 K is 50 kJ/mol');
assert(speedupAt300K.speedupFactor > speedupAt600K.speedupFactor, 'Catalyst acceleration factor must be significantly higher at lower temperature');
assert(speedupAt300K.speedupFactor > 1e8, 'At 300K, 50 kJ reduction produces >10^8 acceleration');
assert(speedupAt600K.speedupFactor < 1e5, 'At 600K, 50 kJ reduction produces <10^5 acceleration');
console.log('  ✓ Verified fundamental chemical kinetics principle: catalysts produce greater relative speedup at lower ambient temperatures');

// Test 9: Inhibitor Rate Retardation Dynamics (Negative Delta Ea)
console.log('Test 9: Inhibitor Negative Delta Ea & Rate Retardation...');
const inhibitorRes = ThermochemistryEngine.calculateCatalystSpeedup(50, 75, 298.15);
assert.strictEqual(inhibitorRes.deltaEa_kJ, -25, 'Inhibitor delta Ea must be negative (-25 kJ/mol)');
assert(inhibitorRes.speedupFactor < 1.0, `Inhibitor speedup factor must be < 1.0 (got ${inhibitorRes.speedupFactor})`);
assert(inhibitorRes.speedupFactor > 0, 'Inhibitor speedup factor must remain positive');
console.log('  ✓ Reaction inhibitors successfully model negative activation barriers and rate retardation');

// Test 10: Standard Formation Enthalpy Physical Benchmarks & Vaporization Heat
console.log('Test 10: Standard Formation Enthalpy Physical Benchmarks & Vaporization Heat...');
const h2oLiquid = STANDARD_FORMATION_ENTHALPY['H2O(l)'];
const h2oGas = STANDARD_FORMATION_ENTHALPY['H2O(g)'];
assert(h2oLiquid && h2oGas, 'Both liquid and gas water must be in database');

// Heat of vaporization delta_H_vap = delta_f_H(H2O(g)) - delta_f_H(H2O(l))
// -241.8 - (-285.8) = +44.0 kJ/mol
const deltaHVap = Number((h2oGas.delta_f_H298 - h2oLiquid.delta_f_H298).toFixed(1));
assert.strictEqual(deltaHVap, 44.0, `Water heat of vaporization must be exactly +44.0 kJ/mol (got ${deltaHVap})`);

const co2 = STANDARD_FORMATION_ENTHALPY['CO2(g)'];
assert.strictEqual(co2.delta_f_H298, -393.5, 'CO2 standard formation enthalpy must be -393.5 kJ/mol');

const ch4 = STANDARD_FORMATION_ENTHALPY['CH4(g)'];
assert.strictEqual(ch4.delta_f_H298, -74.8, 'CH4 standard formation enthalpy must be -74.8 kJ/mol');

const nh3 = STANDARD_FORMATION_ENTHALPY['NH3(g)'];
assert.strictEqual(nh3.delta_f_H298, -46.1, 'NH3 standard formation enthalpy must be -46.1 kJ/mol');
console.log('  ✓ Thermodynamic benchmarks (water vaporization enthalpy +44.0 kJ/mol, CO2, CH4, NH3) strictly verified');

console.log('\n========================================');
console.log('ALL 10 TEST GROUPS IN SUITE 28 PASSED (100% SUCCESS)');
console.log('========================================');
