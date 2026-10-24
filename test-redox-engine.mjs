// test-redox-engine.mjs
// Comprehensive test suite for Redox Balancing & Half-Reaction Analysis Engine (GDPT 2018 & IUPAC Compliant)

import assert from 'node:assert';
import {
  VERIFIED_REDOX_DATABASE,
  analyzeRedoxReaction,
  getAllRedoxReactionKeys,
  getAllRedoxReactions,
  verifyRedoxElectronBalance,
  getFlagshipRedoxCount,
  getRedoxReactionsByElement,
  STANDARD_REDUCTION_POTENTIALS,
  getStandardReductionCouple,
  getAllStandardReductionCouples,
  calculateStandardCellEmf
} from './src/domain/redoxEngine.ts';

console.log('--- TEST SUITE 26: REDOX BALANCING & HALF-REACTION ANALYSIS ENGINE ---');

// Test 1: Database Completeness & Keys
console.log('Test 1: Database Completeness & 15 Flagship Redox Reactions...');
const keys = getAllRedoxReactionKeys();
assert(Array.isArray(keys), 'Keys must be an array');
assert.strictEqual(keys.length, 15, `Expected exactly 15 flagship reactions, got ${keys.length}`);

const reactions = getAllRedoxReactions();
assert.strictEqual(reactions.length, 15, 'getAllRedoxReactions must return 15 items');
console.log(`  ✓ Confirmed ${keys.length} flagship high school redox reactions registered`);

// Test 2: Field Integrity & Curriculum Standards
console.log('Test 2: Field Integrity & Non-Empty Metadata...');
for (const rx of reactions) {
  assert(rx.reactionKey && rx.reactionKey.length > 0, 'Reaction key must be non-empty');
  assert(rx.titleVI && rx.titleVI.length > 5, `Reaction ${rx.reactionKey} has invalid title`);
  assert(rx.equation && rx.equation.length > 5, `Reaction ${rx.reactionKey} has invalid equation`);
  assert.strictEqual(rx.isRedox, true, `Reaction ${rx.reactionKey} must be isRedox: true`);
  assert(rx.reducingAgent && rx.reducingAgent.length > 3, `Reaction ${rx.reactionKey} missing reducingAgent`);
  assert(rx.oxidizingAgent && rx.oxidizingAgent.length > 3, `Reaction ${rx.reactionKey} missing oxidizingAgent`);
  assert(rx.oxidationProcessVI && rx.oxidationProcessVI.length > 5, `Reaction ${rx.reactionKey} missing oxidationProcessVI`);
  assert(rx.reductionProcessVI && rx.reductionProcessVI.length > 5, `Reaction ${rx.reactionKey} missing reductionProcessVI`);
  assert(rx.pedagogicalExplanationVI && rx.pedagogicalExplanationVI.length > 20, `Reaction ${rx.reactionKey} explanation too short`);
  assert(rx.curriculumStandardVI && rx.curriculumStandardVI.length > 5, `Reaction ${rx.reactionKey} missing curriculumStandardVI`);
  assert(rx.totalElectronsTransferred > 0, `Reaction ${rx.reactionKey} totalElectronsTransferred must be positive`);
}
console.log(`  ✓ All ${reactions.length} reactions satisfy strict IUPAC & GDPT 2018 metadata specifications`);

// Test 3: Oxidation Number Changes & Half-Reaction Mathematical Invariants
console.log('Test 3: Oxidation Number Changes & Half-Reaction Mathematical Consistency...');
for (const rx of reactions) {
  assert(Array.isArray(rx.changes), `Reaction ${rx.reactionKey} changes must be an array`);
  assert(rx.changes.length >= 2, `Reaction ${rx.reactionKey} must have at least 2 oxidation state changes`);

  const oxidationChanges = rx.changes.filter((c) => c.processType === 'OXIDATION');
  const reductionChanges = rx.changes.filter((c) => c.processType === 'REDUCTION');

  assert(oxidationChanges.length >= 1, `Reaction ${rx.reactionKey} must have at least one OXIDATION process`);
  assert(reductionChanges.length >= 1, `Reaction ${rx.reactionKey} must have at least one REDUCTION process`);

  // Verify Oxidation invariant: finalState > initialState, electrons = final - initial
  for (const oc of oxidationChanges) {
    assert(
      oc.finalState > oc.initialState,
      `Oxidation of ${oc.element} in ${rx.reactionKey} must increase state: ${oc.initialState} -> ${oc.finalState}`
    );
    assert.strictEqual(
      oc.electronsTransferred,
      oc.finalState - oc.initialState,
      `Oxidation of ${oc.element} in ${rx.reactionKey} electron transfer mismatch`
    );
  }

  // Verify Reduction invariant: finalState < initialState, electrons = initial - final
  for (const rc of reductionChanges) {
    assert(
      rc.finalState < rc.initialState,
      `Reduction of ${rc.element} in ${rx.reactionKey} must decrease state: ${rc.initialState} -> ${rc.finalState}`
    );
    assert.strictEqual(
      rc.electronsTransferred,
      rc.initialState - rc.finalState,
      `Reduction of ${rc.element} in ${rx.reactionKey} electron transfer mismatch`
    );
  }

  // Verify helper function
  const balance = verifyRedoxElectronBalance(rx);
  assert.strictEqual(balance.isBalanced, true, `Reaction ${rx.reactionKey} failed electron balance verification`);
  assert(balance.totalDonated > 0, `Reaction ${rx.reactionKey} totalDonated must be > 0`);
  assert(balance.totalAccepted > 0, `Reaction ${rx.reactionKey} totalAccepted must be > 0`);
}
console.log('  ✓ Invariant maintained: all oxidation/reduction half-reactions satisfy conservation of charge');

// Test 4: Specific Chemical Reality Tests for High-School Benchmark Reactions
console.log('Test 4: Specific High-School Benchmark Chemical Reality Invariants...');

// 4.1: Zn + 2HCl -> ZnCl2 + H2
const rxZn = analyzeRedoxReaction('Zn_HCl');
assert(rxZn, 'Zn_HCl not found');
assert.strictEqual(rxZn.totalElectronsTransferred, 2);
const znChange = rxZn.changes.find((c) => c.element === 'Zn');
assert.strictEqual(znChange.initialState, 0);
assert.strictEqual(znChange.finalState, 2);

// 4.2: 2Fe + 3Cl2 -> 2FeCl3 (Must be +3, not +2)
const rxFeCl = analyzeRedoxReaction('Fe_Cl2');
assert(rxFeCl, 'Fe_Cl2 not found');
assert.strictEqual(rxFeCl.totalElectronsTransferred, 6);
const feChange = rxFeCl.changes.find((c) => c.element === 'Fe');
assert.strictEqual(feChange.finalState, 3, 'Fe burned in chlorine must reach maximum +3 oxidation state');

// 4.3: 3Cu + 8HNO3 -> 3Cu(NO3)2 + 2NO + 4H2O
const rxCuN = analyzeRedoxReaction('Cu_HNO3');
assert(rxCuN, 'Cu_HNO3 not found');
assert.strictEqual(rxCuN.totalElectronsTransferred, 6);
const nChange = rxCuN.changes.find((c) => c.element === 'N');
assert.strictEqual(nChange.initialState, 5);
assert.strictEqual(nChange.finalState, 2);

// 4.4: 2KMnO4 + 16HCl -> 2KCl + 2MnCl2 + 5Cl2 + 8H2O
const rxKMnO4 = analyzeRedoxReaction('KMnO4_HCl');
assert(rxKMnO4, 'KMnO4_HCl not found');
assert.strictEqual(rxKMnO4.totalElectronsTransferred, 10);
const mnChange = rxKMnO4.changes.find((c) => c.element === 'Mn');
assert.strictEqual(mnChange.initialState, 7);
assert.strictEqual(mnChange.finalState, 2);

// 4.5: 10FeSO4 + 2KMnO4 + 8H2SO4 -> 5Fe2(SO4)3 + K2SO4 + 2MnSO4 + 8H2O
const rxTitration = analyzeRedoxReaction('FeSO4_KMnO4');
assert(rxTitration, 'FeSO4_KMnO4 not found');
assert.strictEqual(rxTitration.totalElectronsTransferred, 10);
const feTitChange = rxTitration.changes.find((c) => c.element === 'Fe');
assert.strictEqual(feTitChange.initialState, 2);
assert.strictEqual(feTitChange.finalState, 3);

// 4.6: C + 2H2SO4 -> CO2 + 2SO2 + 2H2O
const rxCH2SO4 = analyzeRedoxReaction('C_H2SO4');
assert(rxCH2SO4, 'C_H2SO4 not found');
assert.strictEqual(rxCH2SO4.totalElectronsTransferred, 4);
const cChange = rxCH2SO4.changes.find((c) => c.element === 'C');
assert.strictEqual(cChange.initialState, 0);
assert.strictEqual(cChange.finalState, 4);
const sChange = rxCH2SO4.changes.find((c) => c.element === 'S');
assert.strictEqual(sChange.initialState, 6);
assert.strictEqual(sChange.finalState, 4);
// 4.7: Zn + CuSO4 -> ZnSO4 + Cu (Daniell Cell)
const rxZnCu = analyzeRedoxReaction('Zn_CuSO4');
assert(rxZnCu, 'Zn_CuSO4 not found');
assert.strictEqual(rxZnCu.totalElectronsTransferred, 2);
const znDispChange = rxZnCu.changes.find((c) => c.element === 'Zn');
assert.strictEqual(znDispChange.initialState, 0);
assert.strictEqual(znDispChange.finalState, 2);
const cuDispChange = rxZnCu.changes.find((c) => c.element === 'Cu');
assert.strictEqual(cuDispChange.initialState, 2);
assert.strictEqual(cuDispChange.finalState, 0);

// 4.8: 3C2H5OH + 2K2Cr2O7 + 8H2SO4 -> 3CH3COOH + 2Cr2(SO4)3 + 2K2SO4 + 11H2O
const rxBreath = analyzeRedoxReaction('C2H5OH_K2Cr2O7');
assert(rxBreath, 'C2H5OH_K2Cr2O7 not found');
assert.strictEqual(rxBreath.totalElectronsTransferred, 12);
const cAlcChange = rxBreath.changes.find((c) => c.element === 'C');
assert.strictEqual(cAlcChange.initialState, -2);
assert.strictEqual(cAlcChange.finalState, 0);
const crChange = rxBreath.changes.find((c) => c.element === 'Cr');
assert.strictEqual(crChange.initialState, 6);
assert.strictEqual(crChange.finalState, 3);

// 4.9: 2Na + 2H2O -> 2NaOH + H2
const rxNa = analyzeRedoxReaction('Na_H2O');
assert(rxNa, 'Na_H2O not found');
assert.strictEqual(rxNa.totalElectronsTransferred, 2);
const naOxChange = rxNa.changes.find((c) => c.element === 'Na');
assert.strictEqual(naOxChange.initialState, 0);
assert.strictEqual(naOxChange.finalState, 1);
const hRedChange = rxNa.changes.find((c) => c.element === 'H');
assert.strictEqual(hRedChange.initialState, 1);
assert.strictEqual(hRedChange.finalState, 0);

// 4.10: 2Al + Fe2O3 -> Al2O3 + 2Fe (Thermite)
const rxAlFe = analyzeRedoxReaction('Al_Fe2O3');
assert(rxAlFe, 'Al_Fe2O3 not found');
assert.strictEqual(rxAlFe.totalElectronsTransferred, 6);
const alChange = rxAlFe.changes.find((c) => c.element === 'Al');
assert.strictEqual(alChange.initialState, 0);
assert.strictEqual(alChange.finalState, 3);
const feOxideChange = rxAlFe.changes.find((c) => c.element === 'Fe');
assert.strictEqual(feOxideChange.initialState, 3);
assert.strictEqual(feOxideChange.finalState, 0);

// 4.11: MnO2 + 4HCl -> MnCl2 + Cl2 + 2H2O
const rxMnO2 = analyzeRedoxReaction('MnO2_HCl');
assert(rxMnO2, 'MnO2_HCl not found');
assert.strictEqual(rxMnO2.totalElectronsTransferred, 2);
const mnOxChange = rxMnO2.changes.find((c) => c.element === 'Mn');
assert.strictEqual(mnOxChange.initialState, 4);
assert.strictEqual(mnOxChange.finalState, 2);
const clGasChange = rxMnO2.changes.find((c) => c.element === 'Cl');
assert.strictEqual(clGasChange.initialState, -1);
assert.strictEqual(clGasChange.finalState, 0);

// 4.12: Fe + CuSO4 -> FeSO4 + Cu
const rxFeCu = analyzeRedoxReaction('Fe_CuSO4');
assert(rxFeCu, 'Fe_CuSO4 not found');
assert.strictEqual(rxFeCu.totalElectronsTransferred, 2);
const feDispChange = rxFeCu.changes.find((c) => c.element === 'Fe');
assert.strictEqual(feDispChange.initialState, 0);
assert.strictEqual(feDispChange.finalState, 2);
const cuDispChange2 = rxFeCu.changes.find((c) => c.element === 'Cu');
assert.strictEqual(cuDispChange2.initialState, 2);
assert.strictEqual(cuDispChange2.finalState, 0);

// 4.13: Cl2 + 2NaOH -> NaCl + NaClO + H2O (Disproportionation in cold base)
const rxCl2NaOH = analyzeRedoxReaction('Cl2_NaOH');
assert(rxCl2NaOH, 'Cl2_NaOH not found');
assert.strictEqual(rxCl2NaOH.totalElectronsTransferred, 1);
const clOx1 = rxCl2NaOH.changes.find((c) => c.processType === 'OXIDATION');
assert.strictEqual(clOx1.element, 'Cl');
assert.strictEqual(clOx1.initialState, 0);
assert.strictEqual(clOx1.finalState, 1);
const clRed1 = rxCl2NaOH.changes.find((c) => c.processType === 'REDUCTION');
assert.strictEqual(clRed1.element, 'Cl');
assert.strictEqual(clRed1.initialState, 0);
assert.strictEqual(clRed1.finalState, -1);

// 4.14: 3Cl2 + 6KOH -> 5KCl + KClO3 + 3H2O (Disproportionation in hot base)
const rxCl2Hot = analyzeRedoxReaction('Cl2_KOH_hot');
assert(rxCl2Hot, 'Cl2_KOH_hot not found');
assert.strictEqual(rxCl2Hot.totalElectronsTransferred, 5);
const clOxHot = rxCl2Hot.changes.find((c) => c.processType === 'OXIDATION');
assert.strictEqual(clOxHot.initialState, 0);
assert.strictEqual(clOxHot.finalState, 5);
const clRedHot = rxCl2Hot.changes.find((c) => c.processType === 'REDUCTION');
assert.strictEqual(clRedHot.initialState, 0);
assert.strictEqual(clRedHot.finalState, -1);

// 4.15: 2H2S + SO2 -> 3S + 2H2O (Comproportionation / Claus process)
const rxClaus = analyzeRedoxReaction('H2S_SO2');
assert(rxClaus, 'H2S_SO2 not found');
assert.strictEqual(rxClaus.totalElectronsTransferred, 4);
const sOx = rxClaus.changes.find((c) => c.processType === 'OXIDATION');
assert.strictEqual(sOx.initialState, -2);
assert.strictEqual(sOx.finalState, 0);
const sRed = rxClaus.changes.find((c) => c.processType === 'REDUCTION');
assert.strictEqual(sRed.initialState, 4);
assert.strictEqual(sRed.finalState, 0);

console.log('  ✓ Verified all 15/15 benchmark reaction oxidation states and half-reaction stoichiometry');

// Test 5: Lookup API & Edge Cases
console.log('Test 5: Lookup API Graceful Edge Cases...');
assert.strictEqual(analyzeRedoxReaction('invalid_reaction_key'), null);
assert.strictEqual(analyzeRedoxReaction(''), null);
assert.strictEqual(analyzeRedoxReaction('unknown_key_xyz'), null);
console.log('  ✓ Lookup API correctly returns null for unindexed keys without throwing exceptions');

// Test 6: Element-Based Query & Flagship Counter API
console.log('Test 6: Element-Based Redox Query & Flagship Counter...');
assert.strictEqual(getFlagshipRedoxCount(), 15, 'Must have exactly 15 flagship redox reactions');

const feReactions = getRedoxReactionsByElement('Fe');
assert(feReactions.length >= 4, `Expected at least 4 Fe reactions, got ${feReactions.length}`);
const feKeys = feReactions.map(r => r.reactionKey);
assert(feKeys.includes('Fe_Cl2'));
assert(feKeys.includes('Al_Fe2O3'));
assert(feKeys.includes('Fe_CuSO4'));
assert(feKeys.includes('FeSO4_KMnO4'));

const cuReactions = getRedoxReactionsByElement('Cu');
assert(cuReactions.length >= 3, `Expected at least 3 Cu reactions, got ${cuReactions.length}`);

const clReactions = getRedoxReactionsByElement('Cl');
assert(clReactions.length >= 4, `Expected at least 4 Cl reactions, got ${clReactions.length}`);

const nonExistentReactions = getRedoxReactionsByElement('Krypton');
assert.strictEqual(nonExistentReactions.length, 0);
console.log('  ✓ Element-based redox query correctly retrieves all relevant half-reaction profiles');

// Test 7: Electron Conservation Law
console.log('Test 7: Net Electron Conservation Invariant Verification...');
for (const rx of reactions) {
  const balance = verifyRedoxElectronBalance(rx);
  assert.strictEqual(balance.isBalanced, true);
  assert.strictEqual(balance.totalDonated > 0, true);
  assert.strictEqual(balance.totalAccepted > 0, true);
  // Total electrons transferred must match or be multiple of donated/accepted
  assert.ok(rx.totalElectronsTransferred >= balance.totalDonated);
}
console.log('  ✓ All 15 reactions obey fundamental Electron Conservation Law');

// Test 8: Disproportionation (Tự Oxi Hóa - Khử) Pedagogical Invariants
console.log('Test 8: Disproportionation (Tự Oxi Hóa - Khử) Pedagogical Invariants...');
const dispReactions = [rxCl2NaOH, rxCl2Hot];
for (const disp of dispReactions) {
  assert.strictEqual(disp.reducingAgent, disp.oxidizingAgent, 'Disproportionation must share identical reducing and oxidizing species');
  const oxElem = disp.changes.find(c => c.processType === 'OXIDATION')?.element;
  const redElem = disp.changes.find(c => c.processType === 'REDUCTION')?.element;
  assert.strictEqual(oxElem, redElem, 'Disproportionation must involve the same chemical element');
}
console.log('  ✓ Disproportionation invariants verified across cold and hot halogen pathways');

// Test 9: Comproportionation (Quy Tụ Số Oxi Hóa) Pedagogical Invariants
console.log('Test 9: Comproportionation (Quy Tụ Số Oxi Hóa) Pedagogical Invariants...');
const compReaction = rxClaus;
const compOx = compReaction.changes.find(c => c.processType === 'OXIDATION');
const compRed = compReaction.changes.find(c => c.processType === 'REDUCTION');
assert.strictEqual(compOx.element, compRed.element, 'Comproportionation involves the same element from differing initial states');
assert.strictEqual(compOx.finalState, compRed.finalState, 'Comproportionation converges to identical intermediate oxidation state');
assert(compOx.initialState < compOx.finalState && compRed.initialState > compRed.finalState, 'States must converge from below and above');
console.log(`  ✓ Comproportionation confirmed: S(-2) and S(+4) converge to elemental S(0) via Claus reaction`);

// Test 10: Standard Reduction Potentials Database & Electrochemical Series
console.log('Test 10: Standard Reduction Potentials Database & Electrochemical Series...');
const couples = getAllStandardReductionCouples();
assert(couples.length >= 18, `Expected at least 18 standard reduction couples, got ${couples.length}`);

// Standard Hydrogen Electrode (SHE) must be 0.00 V by international convention
const she = getStandardReductionCouple('2H+/H2');
assert(she !== null, 'Standard Hydrogen Electrode must be defined');
assert.strictEqual(she.standardPotentialE0, 0.00, 'SHE standard reduction potential must be exactly 0.00 V');

// Fluorine couple has highest reduction potential (strongest oxidizer)
const f2 = getStandardReductionCouple('F2/2F-');
assert.strictEqual(f2.standardPotentialE0, 2.87, 'Fluorine E0 must be +2.87 V');

// Potassium / Sodium highly negative potentials (strongest reducing agents)
const kCouple = getStandardReductionCouple('K+/K');
assert(kCouple.standardPotentialE0 < -2.9, 'Potassium E0 must be strongly negative (< -2.90 V)');

// Verify lookup edge cases
assert.strictEqual(getStandardReductionCouple('non_existent_couple'), null);
console.log(`  ✓ Electrochemical series database verified with ${couples.length} IUPAC standard couples`);

// Test 11: Galvanic Cell EMF Calculation & Spontaneity Verification
console.log('Test 11: Galvanic Cell EMF Calculation & Thermodynamic Spontaneity...');

// Daniell Cell: Cathode Cu2+/Cu (+0.34 V) and Anode Zn2+/Zn (-0.76 V)
// E0_cell = 0.34 - (-0.76) = 1.10 V
const daniellCell = calculateStandardCellEmf('Cu2+/Cu', 'Zn2+/Zn');
assert(daniellCell !== null, 'Daniell cell calculation must succeed');
assert.strictEqual(daniellCell.cellEmf, 1.10, `Daniell cell EMF must be +1.10 V, got ${daniellCell.cellEmf}`);
assert.strictEqual(daniellCell.isSpontaneous, true, 'Daniell cell must be spontaneous (E0 > 0)');
assert(daniellCell.explanationVI.includes('1.1'), 'Explanation must detail standard voltage');

// Iron - Copper galvanic cell: Cathode Cu2+/Cu (+0.34 V), Anode Fe2+/Fe (-0.44 V)
// E0_cell = 0.34 - (-0.44) = 0.78 V
const feCuCell = calculateStandardCellEmf('Cu2+/Cu', 'Fe2+/Fe');
assert.strictEqual(feCuCell.cellEmf, 0.78, `Fe-Cu cell EMF must be +0.78 V, got ${feCuCell.cellEmf}`);
assert.strictEqual(feCuCell.isSpontaneous, true);

// Permanganate titration with Fe2+: Cathode MnO4-/Mn2+ (+1.51 V), Anode Fe3+/Fe2+ (+0.77 V)
// E0_cell = 1.51 - 0.77 = 0.74 V
const titrationCell = calculateStandardCellEmf('MnO4-/Mn2+', 'Fe3+/Fe2+');
assert.strictEqual(titrationCell.cellEmf, 0.74);
assert.strictEqual(titrationCell.isSpontaneous, true);

// Non-spontaneous reversed cell: Cathode Zn2+/Zn (-0.76 V), Anode Cu2+/Cu (+0.34 V)
// E0_cell = -0.76 - 0.34 = -1.10 V
const nonSpontaneousCell = calculateStandardCellEmf('Zn2+/Zn', 'Cu2+/Cu');
assert.strictEqual(nonSpontaneousCell.cellEmf, -1.10);
assert.strictEqual(nonSpontaneousCell.isSpontaneous, false, 'Negative cell EMF must be non-spontaneous');

// Invalid inputs return null gracefully
assert.strictEqual(calculateStandardCellEmf('invalid', 'Cu2+/Cu'), null);
assert.strictEqual(calculateStandardCellEmf('Cu2+/Cu', 'invalid'), null);
console.log('  ✓ Galvanic cell EMF and spontaneity invariants mathematically verified');

console.log('--- ALL 11/11 REDOX BALANCING & ELECTROCHEMISTRY ENGINE VERIFICATIONS PASSED ---');
