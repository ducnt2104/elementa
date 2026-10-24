// test-chemistry-fuzz.mjs
// Exhaustive Chemistry Engine Fuzzing & GDPT 2018 Database Integrity Test Suite

import assert from 'assert';
import {
  parseFormulaAtoms,
  parseSpeciesCharge,
  parseChemicalEquation,
  formatChemicalEquation,
  normalizeChemicalFormula
} from '../src/domain/equationBalancer.ts';
import { ALL_ELEMENTS } from '../src/data/elementsData.ts';
import { REACTION_RULES_DATABASE } from '../src/data/reactionsData.ts';
import { EquilibriumEngine, CURRICULUM_EQUILIBRIUM_REACTIONS } from '../src/domain/equilibriumEngine.ts';
import { ReactionEngine } from '../src/domain/reactionEngine.ts';

let totalTests = 0;
let passedTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         ${err.message}`);
    process.exitCode = 1;
  }
}

console.log('=== TEST SUITE: CHEMISTRY FUZZING, REACTION INTEGRITY & 118 ELEMENTS ===\n');

// -------------------------------------------------------------
// GROUP 1: UNICODE NORMALIZATION & ATOM COUNTING
// -------------------------------------------------------------
console.log('--- Group 1: Unicode Normalization & Formula Parser ---');

runTest('Plain ASCII formulas parse accurately', () => {
  const h2o = parseFormulaAtoms('H2O');
  assert.deepStrictEqual(h2o, { H: 2, O: 1 });

  const caoh2 = parseFormulaAtoms('Ca(OH)2');
  assert.deepStrictEqual(caoh2, { Ca: 1, O: 2, H: 2 });

  const al2so4_3 = parseFormulaAtoms('Al2(SO4)3');
  assert.deepStrictEqual(al2so4_3, { Al: 2, S: 3, O: 12 });
});

runTest('Unicode subscripts parse accurately without dropping digits', () => {
  const h2o = parseFormulaAtoms('H₂O');
  assert.deepStrictEqual(h2o, { H: 2, O: 1 });

  const caoh2 = parseFormulaAtoms('Ca(OH)₂');
  assert.deepStrictEqual(caoh2, { Ca: 1, O: 2, H: 2 });

  const al2so4_3 = parseFormulaAtoms('Al₂(SO₄)₃');
  assert.deepStrictEqual(al2so4_3, { Al: 2, S: 3, O: 12 });

  const c6h12o6 = parseFormulaAtoms('C₆H₁₂O₆');
  assert.deepStrictEqual(c6h12o6, { C: 6, H: 12, O: 6 });
});

runTest('Square bracket complex ions parse nested atomic counts', () => {
  const complex1 = parseFormulaAtoms('[Al(OH)4]-');
  assert.deepStrictEqual(complex1, { Al: 1, O: 4, H: 4 });

  const complex2 = parseFormulaAtoms('[Fe(H2O)6]3+');
  assert.deepStrictEqual(complex2, { Fe: 1, H: 12, O: 6 });

  const complex3 = parseFormulaAtoms('[Cu(NH₃)₄]²⁺');
  assert.deepStrictEqual(complex3, { Cu: 1, N: 4, H: 12 });
});

// -------------------------------------------------------------
// GROUP 2: HYDRATES & ADDUCT DECOMPOSITION
// -------------------------------------------------------------
console.log('\n--- Group 2: Hydrates & Adduct Decomposition ---');

runTest('CuSO4·5H2O (Copper II Sulfate Pentahydrate) computes total atoms', () => {
  const atoms = parseFormulaAtoms('CuSO4·5H2O');
  assert.strictEqual(atoms.Cu, 1);
  assert.strictEqual(atoms.S, 1);
  assert.strictEqual(atoms.H, 10);
  assert.strictEqual(atoms.O, 9); // 4 from SO4 + 5 from 5H2O
});

runTest('Ba(OH)2*8H2O (Barium Hydroxide Octahydrate) computes total atoms', () => {
  const atoms = parseFormulaAtoms('Ba(OH)2*8H2O');
  assert.strictEqual(atoms.Ba, 1);
  assert.strictEqual(atoms.H, 18); // 2 from OH + 16 from 8H2O
  assert.strictEqual(atoms.O, 10); // 2 from OH + 8 from 8H2O
});

runTest('Rust hydrate Fe2O3·xH2O handles variable hydrate gracefully', () => {
  const atoms = parseFormulaAtoms('Fe2O3·xH2O');
  assert.strictEqual(atoms.Fe, 2);
  assert.strictEqual(atoms.O, 3);
});

// -------------------------------------------------------------
// GROUP 3: CHARGE EXTRACTION ROBUSTNESS
// -------------------------------------------------------------
console.log('\n--- Group 3: Ion Charge Parsing Fuzzing ---');

runTest('Parses plain ASCII charges: +, 2+, 3+, -, 2-, 3-', () => {
  assert.strictEqual(parseSpeciesCharge('Na+'), 1);
  assert.strictEqual(parseSpeciesCharge('Ca2+'), 2);
  assert.strictEqual(parseSpeciesCharge('Al3+'), 3);
  assert.strictEqual(parseSpeciesCharge('Cl-'), -1);
  assert.strictEqual(parseSpeciesCharge('SO4^2-'), -2);
  assert.strictEqual(parseSpeciesCharge('PO4^3-'), -3);
  assert.strictEqual(parseSpeciesCharge('H2O'), 0);
  assert.strictEqual(parseSpeciesCharge('NaCl'), 0);
});

runTest('Parses Unicode superscript charges: ⁺, ²⁺, ³⁺, ⁻, ²⁻, ³⁻', () => {
  assert.strictEqual(parseSpeciesCharge('Na⁺'), 1);
  assert.strictEqual(parseSpeciesCharge('Ba²⁺'), 2);
  assert.strictEqual(parseSpeciesCharge('Fe³⁺'), 3);
  assert.strictEqual(parseSpeciesCharge('OH⁻'), -1);
  assert.strictEqual(parseSpeciesCharge('SO₄²⁻'), -2);
  assert.strictEqual(parseSpeciesCharge('PO₄³⁻'), -3);
});

runTest('Parses LaTeX bracketed and parenthesized charges: ^{2+}, (2-)', () => {
  assert.strictEqual(parseSpeciesCharge('Fe^{3+}'), 3);
  assert.strictEqual(parseSpeciesCharge('SO4(2-)'), -2);
  assert.strictEqual(parseSpeciesCharge('[Al(OH)4]^-'), -1);
});

// -------------------------------------------------------------
// GROUP 4: REVERSIBLE EQUATION BALANCING & ARROW FUZZING
// -------------------------------------------------------------
console.log('\n--- Group 4: Equation Balancing & Arrow Formats ---');

runTest('Standard arrow (-> and →) equations balance properly', () => {
  const r1 = parseChemicalEquation('2Na + 2H2O -> 2NaOH + H2');
  assert.strictEqual(r1.isBalanced, true);

  const r2 = parseChemicalEquation('4Fe + 3O2 → 2Fe2O3');
  assert.strictEqual(r2.isBalanced, true);
});

runTest('Reversible arrows (⇌, <=>, <->) balance properly', () => {
  const r1 = parseChemicalEquation('N2 + 3H2 ⇌ 2NH3');
  assert.strictEqual(r1.isBalanced, true);

  const r2 = parseChemicalEquation('N2 + 3H2 <=> 2NH3');
  assert.strictEqual(r2.isBalanced, true);

  const r3 = parseChemicalEquation('CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O');
  assert.strictEqual(r3.isBalanced, true);
});

runTest('Net ionic equations verify both atom and charge conservation', () => {
  const r1 = parseChemicalEquation('Ba^2+ + SO4^2- -> BaSO4');
  assert.strictEqual(r1.isBalanced, true);
  assert.strictEqual(r1.atomsBalanced, true);
  assert.strictEqual(r1.chargeBalanced, true);

  const r2 = parseChemicalEquation('Zn + Cu^2+ -> Zn^2+ + Cu');
  assert.strictEqual(r2.isBalanced, true);
  assert.strictEqual(r2.chargeBalanced, true);
});

runTest('Unbalanced equation detects discrepancy', () => {
  const res = parseChemicalEquation('H2 + O2 -> H2O');
  assert.strictEqual(res.isBalanced, false);
  assert.strictEqual(res.atomsBalanced, false);
  assert.strictEqual(res.atomDiscrepancies.O.left, 2);
  assert.strictEqual(res.atomDiscrepancies.O.right, 1);
});

// -------------------------------------------------------------
// GROUP 5: WHITESPACE & IRREGULAR SPACING FUZZING
// -------------------------------------------------------------
console.log('\n--- Group 5: Whitespace & Irregular Token Fuzzing ---');

runTest('Fuzzed whitespace variations maintain equation integrity', () => {
  const variations = [
    '2Na + 2H2O -> 2NaOH + H2',
    '   2   Na   +   2   H2O   ->   2   NaOH   +   H2   ',
    '2Na+2H2O->2NaOH+H2',
    '2 Na + 2 H2O -> 2 NaOH + 1 H2',
    '\t2Na\t+\t2H2O\t->\t2NaOH\t+\tH2\n'
  ];

  for (const eq of variations) {
    const res = parseChemicalEquation(eq);
    assert.strictEqual(res.isBalanced, true, `Failed on: "${eq}"`);
  }
});

// -------------------------------------------------------------
// GROUP 6: ORGANIC REACTION CATALOG AUDIT (GROUP_G_ORGANIC)
// -------------------------------------------------------------
console.log('\n--- Group 6: Organic Reaction Database Audit (GROUP_G_ORGANIC) ---');

runTest('GROUP_G_ORGANIC reactions are populated and valid', () => {
  const organicRx = REACTION_RULES_DATABASE.filter(r => r.groupCategory === 'GROUP_G_ORGANIC');
  assert.ok(organicRx.length >= 6, `Expected >= 6 organic reactions, got ${organicRx.length}`);

  // Check specific flagship organic reactions
  const ester = organicRx.find(r => r.id === 'rx_org_ester_ethyl_acetate');
  assert.ok(ester, 'rx_org_ester_ethyl_acetate must exist');
  assert.strictEqual(ester.curriculumStandard, 'GDPT_2018_HOA_12');
  assert.ok(ester.equation.includes('CH₃COOC₂H₅'));

  const sapon = organicRx.find(r => r.id === 'rx_org_saponification_ethyl_acetate');
  assert.ok(sapon, 'rx_org_saponification_ethyl_acetate must exist');
  assert.ok(sapon.pedagogicalExplanation.includes('xà phòng hóa'));

  const tristearin = organicRx.find(r => r.id === 'rx_org_saponification_tristearin');
  assert.ok(tristearin, 'rx_org_saponification_tristearin must exist');
  assert.ok(tristearin.equation.includes('C₁₇H₃₅COONa'));

  const ferm = organicRx.find(r => r.id === 'rx_org_glucose_fermentation');
  assert.ok(ferm, 'rx_org_glucose_fermentation must exist');
  assert.ok(ferm.equation.includes('C₆H₁₂O₆'));

  const dehy = organicRx.find(r => r.id === 'rx_org_ethanol_dehydration_ethene');
  assert.ok(dehy, 'rx_org_ethanol_dehydration_ethene must exist');
  assert.ok(dehy.equation.includes('C₂H₄'));

  const silver = organicRx.find(r => r.id === 'rx_org_glucose_silver_mirror');
  assert.ok(silver, 'rx_org_glucose_silver_mirror must exist');
  assert.ok(silver.name_vi.includes('Tráng Bạc') || silver.pedagogicalExplanation.includes('bạc kim loại'), 'rx_org_glucose_silver_mirror should describe silver mirror');
});

// -------------------------------------------------------------
// GROUP 7: EXHAUSTIVE 118 ELEMENTS INTEGRITY CHECK
// -------------------------------------------------------------
console.log('\n--- Group 7: Exhaustive Periodic Table (118 Elements) Audit ---');

runTest('All 118 elements exist without gaps and have complete IUPAC metadata', () => {
  assert.strictEqual(ALL_ELEMENTS.length, 118, 'Must have exactly 118 elements');

  for (let z = 1; z <= 118; z++) {
    const el = ALL_ELEMENTS.find(e => e.z === z);
    assert.ok(el, `Element Z=${z} missing from ALL_ELEMENTS`);
    assert.strictEqual(typeof el.symbol, 'string');
    assert.ok(el.symbol.length >= 1 && el.symbol.length <= 3);
    assert.ok(el.atomic_weight > 0, `Z=${z} must have positive atomic weight`);
    assert.ok(el.period >= 1 && el.period <= 7, `Z=${z} period must be 1-7`);
    assert.ok(el.group >= 1 && el.group <= 18, `Z=${z} group must be 1-18`);
    assert.ok(el.electron_config.length > 0, `Z=${z} must have electron configuration`);
    assert.ok(Array.isArray(el.oxidation_states) && el.oxidation_states.length > 0, `Z=${z} must have oxidation states`);
    assert.ok(el.stats.mana_cost >= 1 && el.stats.mana_cost <= 5, `Z=${z} mana_cost must be 1-5`);
    assert.ok(!isNaN(el.stats.atk_ox), `Z=${z} atk_ox cannot be NaN`);
    assert.ok(!isNaN(el.stats.atk_red), `Z=${z} atk_red cannot be NaN`);
    assert.ok(!isNaN(el.stats.def_stab), `Z=${z} def_stab cannot be NaN`);
  }
});

// -------------------------------------------------------------
// GROUP 8: COORDINATION ADDUCTS & COMPLEX IONS
// -------------------------------------------------------------
console.log('\n--- Group 8: Transition Metal Coordination Adducts & Polyatomic Oxyanions ---');

runTest('Parses complex coordination spheres and polyatomic oxyanions', () => {
  const agDiamine = parseFormulaAtoms('[Ag(NH3)2]+');
  assert.deepStrictEqual(agDiamine, { Ag: 1, N: 2, H: 6 });
  assert.strictEqual(parseSpeciesCharge('[Ag(NH3)2]+'), 1);

  const feHexacyano4 = parseFormulaAtoms('[Fe(CN)6]4-');
  assert.deepStrictEqual(feHexacyano4, { Fe: 1, C: 6, N: 6 });
  assert.strictEqual(parseSpeciesCharge('[Fe(CN)6]4-'), -4);

  const feHexacyano3 = parseFormulaAtoms('[Fe(CN)6]³⁻');
  assert.deepStrictEqual(feHexacyano3, { Fe: 1, C: 6, N: 6 });
  assert.strictEqual(parseSpeciesCharge('[Fe(CN)6]³⁻'), -3);

  const cuHexaaqua = parseFormulaAtoms('[Cu(H2O)6]2+');
  assert.deepStrictEqual(cuHexaaqua, { Cu: 1, H: 12, O: 6 });
  assert.strictEqual(parseSpeciesCharge('[Cu(H2O)6]2+'), 2);

  const mno4 = parseFormulaAtoms('MnO4-');
  assert.deepStrictEqual(mno4, { Mn: 1, O: 4 });
  assert.strictEqual(parseSpeciesCharge('MnO4-'), -1);

  const cr2o7 = parseFormulaAtoms('Cr2O7^2-');
  assert.deepStrictEqual(cr2o7, { Cr: 2, O: 7 });
  assert.strictEqual(parseSpeciesCharge('Cr2O7^2-'), -2);

  const s2o3 = parseFormulaAtoms('S2O3^2-');
  assert.deepStrictEqual(s2o3, { S: 2, O: 3 });
  assert.strictEqual(parseSpeciesCharge('S2O3^2-'), -2);
});

// -------------------------------------------------------------
// GROUP 9: FLAGSHIP REDOX BALANCING & HYDROCARBON HOMOLOGY
// -------------------------------------------------------------
console.log('\n--- Group 9: Flagship Redox Balancing & Hydrocarbon Combustion Series ---');

runTest('Permanganate and Dichromate acid redox equations conserve atoms and charges', () => {
  // 5Fe^2+ + MnO4^- + 8H^+ -> 5Fe^3+ + Mn^2+ + 4H2O
  const perm = parseChemicalEquation('5Fe^2+ + MnO4^- + 8H^+ -> 5Fe^3+ + Mn^2+ + 4H2O');
  assert.strictEqual(perm.isBalanced, true, 'Permanganate titration equation must be balanced');
  assert.strictEqual(perm.atomsBalanced, true);
  assert.strictEqual(perm.chargeBalanced, true);

  // Cr2O7^2- + 6Fe^2+ + 14H^+ -> 2Cr^3+ + 6Fe^3+ + 7H2O
  const dichrom = parseChemicalEquation('Cr2O7^2- + 6Fe^2+ + 14H^+ -> 2Cr^3+ + 6Fe^3+ + 7H2O');
  assert.strictEqual(dichrom.isBalanced, true, 'Dichromate redox equation must be balanced');
  assert.strictEqual(dichrom.atomsBalanced, true);
  assert.strictEqual(dichrom.chargeBalanced, true);
});

runTest('Alkane hydrocarbon homologous series complete combustion balances accurately', () => {
  const combustionEqs = [
    'CH4 + 2O2 -> CO2 + 2H2O',           // Methane (n=1)
    '2C2H6 + 7O2 -> 4CO2 + 6H2O',       // Ethane (n=2)
    'C3H8 + 5O2 -> 3CO2 + 4H2O',         // Propane (n=3)
    '2C4H10 + 13O2 -> 8CO2 + 10H2O'     // Butane (n=4)
  ];

  for (const eq of combustionEqs) {
    const res = parseChemicalEquation(eq);
    assert.strictEqual(res.isBalanced, true, `Hydrocarbon combustion must balance: ${eq}`);
    assert.strictEqual(res.atomsBalanced, true);
  }
});

// -------------------------------------------------------------
// GROUP 10: HYDRATE ADDUCT DOT & MIDDLE-DOT FUZZING
// -------------------------------------------------------------
console.log('\n--- Group 10: Multi-Format Hydrate Adduct Fuzzing ---');

runTest('Parses hydrate adducts with both middle dot (·) and ASCII period (.) identically', () => {
  const cuso4_dot = parseFormulaAtoms('CuSO4.5H2O');
  const cuso4_mid = parseFormulaAtoms('CuSO4·5H2O');
  assert.deepStrictEqual(cuso4_dot, { Cu: 1, S: 1, O: 9, H: 10 });
  assert.deepStrictEqual(cuso4_dot, cuso4_mid);

  const feso4_dot = parseFormulaAtoms('FeSO4.7H2O');
  const feso4_mid = parseFormulaAtoms('FeSO4·7H2O');
  assert.deepStrictEqual(feso4_dot, { Fe: 1, S: 1, O: 11, H: 14 });
  assert.deepStrictEqual(feso4_dot, feso4_mid);

  const alum = parseFormulaAtoms('KAl(SO4)2·12H2O');
  assert.deepStrictEqual(alum, { K: 1, Al: 1, S: 2, O: 20, H: 24 });

  const bacl2 = parseFormulaAtoms('BaCl2.2H2O');
  assert.deepStrictEqual(bacl2, { Ba: 1, Cl: 2, H: 4, O: 2 });
});

// -------------------------------------------------------------
// GROUP 11: CHEMICAL EQUILIBRIUM BOUNDARY FUZZING
// -------------------------------------------------------------
console.log('\n--- Group 11: Equilibrium Engine Extreme Boundary Fuzzing ---');

runTest('EquilibriumEngine handles extreme temperatures, pressures, and concentrations with zero NaN', () => {
  const rx = CURRICULUM_EQUILIBRIUM_REACTIONS[0]; // Haber-Bosch

  // Extreme temperatures: 1 K to 5000 K
  const extremeTemps = [1, 50, 273.15, 298.15, 500, 1000, 3000, 5000];
  for (const T of extremeTemps) {
    const kc = EquilibriumEngine.calculateKcAtTemperature(rx.standardKc, rx.delta_r_H298_kJ, T);
    assert.ok(!isNaN(kc), `Kc must not be NaN at T=${T} K`);
    assert.ok(kc >= 0, `Kc must be non-negative at T=${T} K`);
  }

  // Extreme concentrations: near zero, 1e-6, 1000 M
  const testCases = [
    { N2: 0, H2: 0, NH3: 0 },
    { N2: 1e-6, H2: 1e-6, NH3: 1e-6 },
    { N2: 1000, H2: 1000, NH3: 1000 },
    { N2: 10, H2: 0, NH3: 5 }
  ];

  for (const conc of testCases) {
    const Qc = EquilibriumEngine.calculateReactionQuotient(rx, conc);
    assert.ok(!isNaN(Qc), `Qc must not be NaN for concentrations: ${JSON.stringify(conc)}`);
  }

  // Extreme state evaluations
  const extremeEval = EquilibriumEngine.evaluateEquilibriumState(rx, { N2: 500, H2: 500, NH3: 1 }, 1500, 250);
  assert.ok(!isNaN(extremeEval.effectiveKc), 'effectiveKc must be a valid number');
  assert.ok(!isNaN(extremeEval.reactionQuotientQc), 'Qc must be a valid number');
  assert.ok(['FORWARD', 'REVERSE', 'EQUILIBRIUM'].includes(extremeEval.shiftDirection));
});

// -------------------------------------------------------------
// GROUP 12: DCSM REACTION CASCADE DETERMINISTIC STRESS
// -------------------------------------------------------------
console.log('\n--- Group 12: DCSM Reaction Cascade Multi-Cycle Random Inventory Fuzzing ---');

runTest('100 random molecular inventories execute deterministically without infinite loops', () => {
  const engine = new ReactionEngine();
  const pool = ['Na', 'H2O', 'HCl', 'NaOH', 'Al', 'Fe2O3', 'Cl2', 'S', 'O2', 'N2', 'H2', 'NH3', 'Cu'];

  // Seeded pseudo-random generation for deterministic fuzzing
  let seed = 123456789;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  for (let cycle = 1; cycle <= 100; cycle++) {
    const inv = {};
    const speciesCount = 2 + Math.floor(rnd() * 4); // 2 to 5 species
    for (let s = 0; s < speciesCount; s++) {
      const item = pool[Math.floor(rnd() * pool.length)];
      inv[item] = 1 + Math.floor(rnd() * 5); // 1 to 5 molecules
    }

    const conditions = [];
    if (rnd() > 0.5) conditions.push('HIGH_TEMP');
    if (rnd() > 0.5) conditions.push('MOISTURE_H2O');
    if (rnd() > 0.5) conditions.push('OXYGEN_GAS');
    if (rnd() > 0.5) conditions.push('ACID_DILUTE');

    const result = engine.evaluateReactionCascade(inv, conditions, 6);

    assert.ok(result.steps.length <= 6, 'Must respect maxSteps limit');
    assert.strictEqual(typeof result.totalReactionsTriggered, 'number');
    assert.strictEqual(typeof result.hasTrapsEncountered, 'boolean');

    // Invariant: Final inventory cannot have negative quantities
    for (const [formula, count] of Object.entries(result.finalInventory)) {
      assert.ok(count >= 0, `Inventory count for ${formula} cannot be negative (got ${count})`);
      assert.ok(!isNaN(count), `Inventory count for ${formula} cannot be NaN`);
    }
  }
});

console.log(`\n=================================================`);
console.log(`CHEMISTRY FUZZ TESTS COMPLETE: ${passedTests} / ${totalTests} PASSED`);
console.log(`=================================================\n`);
