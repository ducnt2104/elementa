// test-chemistry-calculator.mjs
// Automated Verification Suite for Chemical Calculator, Stoichiometry & Obstacle Collision

import {
  getMolarMass,
  calculateMoles,
  calculateMass,
  calculateGasVolume,
  calculateGasMolesFromVolume,
  calculateMolarity,
  calculateMassPercentage,
  calculateReactionStoichiometry
} from '../src/domain/chemicalCalculator.ts';
import { analyzeRedoxReaction, VERIFIED_REDOX_DATABASE } from '../src/domain/redoxEngine.ts';
import {
  ThermochemistryEngine,
  CURRICULUM_THERMO_REACTIONS,
  CURRICULUM_BOND_ENTHALPY_REACTIONS
} from '../src/domain/thermochemistryEngine.ts';
import { computeElectronStructure } from '../src/domain/orbitalEngine.ts';
import { BondingEngine, CANONICAL_BONDING_DATABASE } from '../src/domain/bondingEngine.ts';
import { MobaEngine } from '../src/game/engine/mobaEngine.ts';

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('\n============================================================');
console.log('   ELEMENTA: CHEMICAL CALCULATOR & REDOX ENGINE AUDIT');
console.log('============================================================\n');

// 1. Molar Mass Calculation Tests
console.log('--- 1. Molar Mass Computation (IUPAC Atomic Weights) ---');
const mH2SO4 = getMolarMass('H2SO4');
assert(mH2SO4 >= 98.0 && mH2SO4 <= 98.1, `Molar mass of H2SO4 ~ 98.07 g/mol (got ${mH2SO4})`);

const mCaOH2 = getMolarMass('Ca(OH)2');
assert(mCaOH2 >= 74.0 && mCaOH2 <= 74.2, `Molar mass of Ca(OH)2 ~ 74.09 g/mol (got ${mCaOH2})`);

const mAl2SO43 = getMolarMass('Al2(SO4)3');
assert(mAl2SO43 >= 342.0 && mAl2SO43 <= 342.3, `Molar mass of Al2(SO4)3 ~ 342.13 g/mol (got ${mAl2SO43})`);

// 2. Mole & Mass Transformations (n = m / M)
console.log('\n--- 2. Mole & Mass Transformations (n = m / M) ---');
const moleResult = calculateMoles(98.07, 'H2SO4');
assert(moleResult.moles >= 0.999 && moleResult.moles <= 1.001, `98.07g H2SO4 is exactly 1 mol (got ${moleResult.moles})`);

const massResult = calculateMass(0.5, 'CaCO3');
const expectedMass = 0.5 * getMolarMass('CaCO3');
assert(Math.abs(massResult.massGrams - expectedMass) < 0.1, `0.5 mol CaCO3 ~ ${expectedMass.toFixed(2)}g (got ${massResult.massGrams})`);

// 3. Gas Volume Standards (GDPT 2018 24.79L vs Classical 22.4L)
console.log('\n--- 3. Gas Volume Standards (GDPT 2018: 24.79L vs Classical: 22.4L) ---');
const gas2018 = calculateGasVolume(1.0, 'STANDARD_2018');
assert(gas2018.volumeLiters === 24.79, `1 mol gas at 25°C, 1 bar (GDPT 2018) = 24.79 L (got ${gas2018.volumeLiters})`);

const gasOld = calculateGasVolume(1.0, 'CLASSICAL_STP');
assert(gasOld.volumeLiters === 22.4, `1 mol gas at 0°C, 1 atm (Classical) = 22.4 L (got ${gasOld.volumeLiters})`);

const gasMolesBack = calculateGasMolesFromVolume(49.58, 'STANDARD_2018');
assert(gasMolesBack.moles === 2.0, `49.58 L gas at standard 2018 = 2.0 mol (got ${gasMolesBack.moles})`);

// 4. Solution Concentration (CM & C%)
console.log('\n--- 4. Solution Concentrations (Molarity CM & Mass % C%) ---');
const molarity = calculateMolarity(0.25, 0.5);
assert(molarity.molarityCM === 0.5, `0.25 mol in 0.5 L solution = 0.5 M (got ${molarity.molarityCM})`);

const massPct = calculateMassPercentage(15, 150);
assert(massPct.percentageC === 10, `15g solute in 150g solution = 10% (got ${massPct.percentageC}%)`);

// 5. Stoichiometry: Limiting & Excess Reactants
console.log('\n--- 5. Stoichiometry & Limiting Reactant Analysis ---');
// 2Al + Fe2O3 -> Al2O3 + 2Fe with 2 mol Al and 1.5 mol Fe2O3
const stoich = calculateReactionStoichiometry(
  [
    { formula: 'Al', coefficient: 2, givenMoles: 2.0 },
    { formula: 'Fe2O3', coefficient: 1, givenMoles: 1.5 }
  ],
  [
    { formula: 'Al2O3', coefficient: 1 },
    { formula: 'Fe', coefficient: 2 }
  ]
);

assert(stoich.limitingReactant === 'Al', `Limiting reactant correctly identified as Al (got ${stoich.limitingReactant})`);
assert(stoich.excessReactant === 'Fe2O3', `Excess reactant identified as Fe2O3 (got ${stoich.excessReactant})`);
assert(stoich.excessMolesRemaining === 0.5, `Excess Fe2O3 remaining = 0.5 mol (got ${stoich.excessMolesRemaining})`);
assert(stoich.productsFormed.find(p => p.formula === 'Al2O3').moles === 1.0, '1.0 mol of Al2O3 formed');
assert(stoich.productsFormed.find(p => p.formula === 'Fe').moles === 2.0, '2.0 mol of Fe formed');

// 6. Redox Engine & Oxidation Number Half-Reactions
console.log('\n--- 6. Redox Half-Reactions & Electron Transfer ---');
const redoxZn = analyzeRedoxReaction('Zn_HCl');
assert(redoxZn !== null && redoxZn.isRedox === true, 'Zn + HCl identified as redox reaction');
assert(redoxZn.reducingAgent.includes('Zn'), 'Zn is identified as reducing agent (nhường e)');
assert(redoxZn.oxidizingAgent.includes('H⁺'), 'H+ is identified as oxidizing agent (thu e)');

const redoxFeCl2 = analyzeRedoxReaction('Fe_Cl2');
assert(redoxFeCl2.oxidationProcessVI.includes('Fe³⁺'), 'Fe oxidized to Fe3+ by chlorine');

const redoxCu = analyzeRedoxReaction('Cu_HNO3');
assert(redoxCu.reducingAgent.includes('Cu'), 'Cu is reducing agent in HNO3 oxidation');

// 7. Obstacle Collision Resolution in MobaEngine
console.log('\n--- 7. Obstacle Collision Resolution (AABB Projection) ---');
const engine = new MobaEngine();
// Test position inside obstacle at (1050, 1320, w=90, h=90)
const insideObsPos = { x: 1080, y: 1350 };
const resolvedPos = engine.resolveCircleAabbCollision(insideObsPos, 28);
const isStillInside = resolvedPos.x > 1050 && resolvedPos.x < 1140 && resolvedPos.y > 1320 && resolvedPos.y < 1410;
assert(!isStillInside, `Entity at (1080, 1350) pushed outside obstacle to (${resolvedPos.x.toFixed(1)}, ${resolvedPos.y.toFixed(1)})`);

// 8. Thermochemistry & Reaction Kinetics (GDPT 2018)
console.log('\n--- 8. Thermochemistry & Chemical Kinetics ---');
const thermiteRx = CURRICULUM_THERMO_REACTIONS.find(r => r.id === 'thermite_rx');
const thermiteRes = ThermochemistryEngine.calculateEnthalpyFromFormation(thermiteRx);
assert(thermiteRes.delta_r_H298 === -851.5, `Thermite reaction enthalpy is -851.5 kJ (got ${thermiteRes.delta_r_H298})`);
assert(thermiteRes.isExothermic === true, 'Thermite reaction is exothermic (tỏa nhiệt)');

const limeRx = CURRICULUM_THERMO_REACTIONS.find(r => r.id === 'limestone_decomp');
const limeRes = ThermochemistryEngine.calculateEnthalpyFromFormation(limeRx);
assert(limeRes.delta_r_H298 === 178.3, `Limestone decomposition enthalpy is +178.3 kJ (got ${limeRes.delta_r_H298})`);
assert(limeRes.isExothermic === false, 'Limestone decomposition is endothermic (thu nhiệt)');

const waterSynth = CURRICULUM_THERMO_REACTIONS.find(r => r.id === 'water_synth');
const waterRes = ThermochemistryEngine.calculateEnthalpyFromFormation(waterSynth);
assert(waterRes.delta_r_H298 === -571.6, `Water synthesis enthalpy is -571.6 kJ (got ${waterRes.delta_r_H298})`);

// Van 't Hoff Rule: T1=20°C, T2=50°C, gamma=2 -> rate increases 2^3 = 8x
const vRes = ThermochemistryEngine.calculateVanTHoffRateIncrease(20, 50, 2.0);
assert(vRes.rateRatio === 8.0, `Van 't Hoff rate ratio for deltaT=30°C is 8.0x (got ${vRes.rateRatio})`);

// Catalyst Speedup: Ea orig=75, Ea cat=45 -> deltaEa=30 kJ/mol
const catRes = ThermochemistryEngine.calculateCatalystSpeedup(75, 45);
assert(catRes.deltaEa === 30, 'Catalyst reduces activation energy by 30 kJ/mol');
assert(catRes.speedupFactor > 100000, `Reaction speedup factor exceeds 100,000x (got ${catRes.speedupFactor.toLocaleString()})`);

// Bond Energy Enthalpy Calculations (GDPT 2018 Method 2)
const ch4Bond = CURRICULUM_BOND_ENTHALPY_REACTIONS.find(r => r.id === 'methane_combustion_bond_rx');
const ch4Res = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(ch4Bond);
assert(ch4Res.delta_r_H298 === -818.0, `Methane combustion enthalpy from bond energy is -818.0 kJ (got ${ch4Res.delta_r_H298})`);
assert(ch4Res.isExothermic === true, 'Methane combustion is exothermic');

const c3h8Bond = CURRICULUM_BOND_ENTHALPY_REACTIONS.find(r => r.id === 'propane_combustion_bond_rx');
const c3h8Res = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(c3h8Bond);
assert(c3h8Res.delta_r_H298 === -2042.0, `Propane combustion enthalpy from bond energy is -2042.0 kJ (got ${c3h8Res.delta_r_H298})`);

const etheneBond = CURRICULUM_BOND_ENTHALPY_REACTIONS.find(r => r.id === 'ethene_hydrogenation_bond_rx');
const etheneRes = ThermochemistryEngine.calculateEnthalpyFromBondEnergies(etheneBond);
assert(etheneRes.delta_r_H298 === -123.0, `Ethene hydrogenation enthalpy is -123.0 kJ (got ${etheneRes.delta_r_H298})`);

// 9. Quantum Orbital & Electron Configuration (GDPT 2018 Grade 10)
console.log('\n--- 9. Quantum Orbital Engine & Hund\'s Rule (GDPT 2018) ---');
const hStruct = computeElectronStructure(1, 'H');
assert(hStruct.fullConfigString === '1s¹', `H configuration is 1s¹ (got ${hStruct.fullConfigString})`);
assert(hStruct.valenceElectrons === 1 && hStruct.totalUnpairedElectrons === 1, 'H has 1 valence electron and 1 unpaired electron');

const heStruct = computeElectronStructure(2, 'He');
assert(heStruct.fullConfigString === '1s²', `He configuration is 1s² (got ${heStruct.fullConfigString})`);
assert(heStruct.elementClass === 'NOBLE_GAS' && heStruct.totalUnpairedElectrons === 0, 'He is Noble Gas with 0 unpaired electrons');

const nStruct = computeElectronStructure(7, 'N');
assert(nStruct.totalUnpairedElectrons === 3, `N has 3 unpaired electrons in 2p orbital by Hund\'s rule (got ${nStruct.totalUnpairedElectrons})`);
assert(nStruct.valenceElectrons === 5, `N has 5 valence electrons (got ${nStruct.valenceElectrons})`);

const naStruct = computeElectronStructure(11, 'Na');
assert(naStruct.nobleGasConfigString === '[Ne] 3s¹', `Na noble gas shorthand is [Ne] 3s¹ (got ${naStruct.nobleGasConfigString})`);
assert(naStruct.elementClass === 'METAL', 'Na classified as Metal (tính khử mạnh)');

const clStruct = computeElectronStructure(17, 'Cl');
assert(clStruct.nobleGasConfigString === '[Ne] 3s² 3p⁵', `Cl noble gas shorthand is [Ne] 3s² 3p⁵ (got ${clStruct.nobleGasConfigString})`);
assert(clStruct.valenceElectrons === 7 && clStruct.elementClass === 'NONMETAL', 'Cl has 7 valence electrons and classified as Nonmetal');

const crStruct = computeElectronStructure(24, 'Cr');
assert(crStruct.subshells.find(s => s.subshell === '3d')?.electronCount === 5, 'Cr triggers half-filled d5 anomaly (3d⁵)');
assert(crStruct.totalUnpairedElectrons === 6, `Cr has 6 unpaired electrons (got ${crStruct.totalUnpairedElectrons})`);

const feStruct = computeElectronStructure(26, 'Fe');
assert(feStruct.valenceElectrons === 8, `Fe transition metal has 8 valence electrons (got ${feStruct.valenceElectrons})`);
assert(feStruct.totalUnpairedElectrons === 4, `Fe has 4 unpaired electrons in 3d orbital (got ${feStruct.totalUnpairedElectrons})`);

const cuStruct = computeElectronStructure(29, 'Cu');
assert(cuStruct.subshells.find(s => s.subshell === '3d')?.electronCount === 10, 'Cu triggers fully-filled d10 anomaly (3d¹⁰)');
assert(cuStruct.totalUnpairedElectrons === 1, `Cu has 1 unpaired electron (got ${cuStruct.totalUnpairedElectrons})`);

// 10. Chemical Bonding Engine & Electronegativity Difference (GDPT 2018 Grade 10)
console.log('\n--- 10. Chemical Bonding Engine & Electronegativity Difference (GDPT 2018) ---');
const ionicClass = BondingEngine.classifyBondByDeltaChi(0.93, 3.16); // NaCl
assert(ionicClass.deltaChi === 2.23, `NaCl deltaChi is 2.23 (got ${ionicClass.deltaChi})`);
assert(ionicClass.bondType === 'IONIC', 'NaCl correctly classified as IONIC (Liên kết ion)');

const polarClass = BondingEngine.classifyBondByDeltaChi(2.20, 3.16); // HCl
assert(polarClass.deltaChi === 0.96, `HCl deltaChi is 0.96 (got ${polarClass.deltaChi})`);
assert(polarClass.bondType === 'POLAR_COVALENT', 'HCl correctly classified as POLAR_COVALENT (Cộng hóa trị có cực)');

const nonpolarClass = BondingEngine.classifyBondByDeltaChi(2.20, 2.20); // H2
assert(nonpolarClass.deltaChi === 0.00, `H2 deltaChi is 0.00 (got ${nonpolarClass.deltaChi})`);
assert(nonpolarClass.bondType === 'NONPOLAR_COVALENT', 'H2 correctly classified as NONPOLAR_COVALENT (Cộng hóa trị không cực)');

const naclModel = BondingEngine.getBondingModel('NaCl');
assert(naclModel !== undefined, 'NaCl found in canonical bonding database');
assert(naclModel?.lewisRepresentation.includes('Na⁺'), 'NaCl Lewis formula contains cation Na⁺');
assert(naclModel?.bondType === 'IONIC', 'NaCl canonical bondType is IONIC');

const n2Model = BondingEngine.getBondingModel('N2');
assert(n2Model?.bondOrder === 3, 'N2 has bond order 3 (Triple bond N≡N)');
assert(n2Model?.sharedPairsCount === 3, 'N2 has 3 shared electron pairs');

const h2oModel = BondingEngine.getBondingModel('H2O');
assert(h2oModel?.bondType === 'POLAR_COVALENT', 'H2O has polar covalent bonds');
assert(h2oModel?.geometryVI.includes('104.5'), 'H2O geometry specifies bent angle 104.5°');

const co2Model = BondingEngine.getBondingModel('CO2');
assert(co2Model?.bondOrder === 2, 'CO2 has double bonds (O=C=O)');
assert(co2Model?.geometryVI.includes('180'), 'CO2 geometry specifies linear 180°');

const isFeasibleNaCl = BondingEngine.isIonicBondFeasible(
  { symbol: 'Na', category: 'ALKALI_METAL', chi: 0.93 },
  { symbol: 'Cl', category: 'HALOGEN', chi: 3.16 }
);
assert(isFeasibleNaCl === true, 'Na + Cl correctly identified as feasible ionic bond formation');

const isFeasibleHCl = BondingEngine.isIonicBondFeasible(
  { symbol: 'H', category: 'NONMETAL', chi: 2.20 },
  { symbol: 'Cl', category: 'HALOGEN', chi: 3.16 }
);
assert(isFeasibleHCl === false, 'H + Cl correctly identified as not ionic (covalent sharing)');

// --- 11. Molecular Inventory & Stoichiometric Yield (Zero-Manual-Coefficients) ---
console.log('\n--- 11. Molecular Inventory Stoichiometric Engine (Zero-Manual-Coefficients) ---');
import { defaultReactionEngine } from '../src/domain/reactionEngine.ts';

// Scenario A: Exact Stoichiometry 2H2 + 1O2 -> 2H2O
const matchWater = defaultReactionEngine.evaluateMolecularInventory({ 'H2': 2, 'O2': 1 });
const waterReaction = matchWater.find(m => m.producedProducts.some(p => p.formula === 'H2O') || m.equation.includes('H2O'));
assert(waterReaction !== undefined, 'Found Water synthesis reaction in molecular inventory evaluation');
assert(waterReaction.isExecutable === true, '2 H2 + 1 O2 is executable');
assert(waterReaction.maxYieldUnits === 1, 'Produces 1 yield block');
assert(waterReaction.producedProducts.some(p => p.formula === 'H2O' && p.count === 2), 'Produces 2 units of H2O');
assert(waterReaction.consumedInventory['H2'] === 2, 'Consumed 2 H2');
assert(waterReaction.consumedInventory['O2'] === 1, 'Consumed 1 O2');

// Scenario B: Limiting Reactant & Excess 5H2 + 2O2 -> 4H2O + 1H2 remaining
const matchExcess = defaultReactionEngine.evaluateMolecularInventory({ 'H2': 5, 'O2': 2 });
const excessWater = matchExcess.find(m => m.producedProducts.some(p => p.formula === 'H2O') || m.equation.includes('H2O'));
assert(excessWater.isExecutable === true, '5 H2 + 2 O2 is executable');
assert(excessWater.maxYieldUnits === 2, 'O2 is limiting: max 2 yield blocks (got 2)');
assert(excessWater.producedProducts.find(p => p.formula === 'H2O')?.count === 4, 'Produces 4 units of H2O');
assert(excessWater.remainingInventory['H2'] === 1, '1 unit of H2 remains in inventory');
assert(excessWater.remainingInventory['O2'] === 0, '0 units of O2 remain in inventory');

// Scenario C: Missing Reactants Diagnostic 1 N2 + 2 H2 (Needs 3 H2 for Haber-Bosch)
const matchHaberIncomplete = defaultReactionEngine.evaluateMolecularInventory({ 'N2': 1, 'H2': 2 });
const haberIncomplete = matchHaberIncomplete.find(m => m.equation.includes('NH3') || m.equation.includes('NH₃'));
assert(haberIncomplete !== undefined, 'Found Haber-Bosch reaction attempt');
assert(haberIncomplete.isExecutable === false, 'Haber-Bosch rejected due to insufficient H2 (have 2, need 3)');
assert(haberIncomplete.missingReactants.some(m => m.formula === 'H2' && m.available === 2 && m.needed === 3), 'Diagnostic identifies 1 missing H2 unit');

// Scenario D: Sodium + Water reaction
const matchNa = defaultReactionEngine.evaluateMolecularInventory({ 'Na': 2, 'H2O': 2 });
const naReaction = matchNa.find(m => m.ruleCode === 'R01_NA');
assert(naReaction !== undefined, 'Found Sodium aqueous reaction');
assert(naReaction.isExecutable === true, '2 Na + 2 H2O is executable');
assert(naReaction.producedProducts.some(p => p.formula === 'NaOH' && p.count === 2), 'Produces 2 NaOH');
assert(naReaction.producedProducts.some(p => p.formula === 'H2' && p.count === 1), 'Produces 1 H2');

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passCount} PASSED, ${failCount} FAILED`);
console.log('============================================================\n');

if (failCount > 0) process.exit(1);
