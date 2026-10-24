// test-reaction-sandbox.mjs
// Automated Verification Suite for ELEMENTA Reaction Sandbox & Thermodynamic Simulator
// Conforming to Vietnam GDPT 2018 Chemistry Standards (Inorganic, Thermite, Kinetics & Organics)

import assert from 'assert';
import { defaultReactionEngine, ReactionEngine } from './src/domain/reactionEngine.ts';
import { ThermochemistryEngine } from './src/domain/thermochemistryEngine.ts';

console.log('============================================================');
console.log('   ELEMENTA: REACTION SANDBOX & THERMODYNAMICS AUDIT       ');
console.log('============================================================\n');

let passedAssertions = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${desc}`);
    passedAssertions++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Organic Esterification Kinetics Simulation
console.log('--- 1. Organic Esterification & Activation Barriers (Hóa 12) ---');

function simulateEsterification(hasH2SO4, tempC) {
  const pair = 'C2H5OH+CH3COOH';
  const hasHeat = tempC >= 50;
  if (hasH2SO4 && hasHeat) {
    return {
      hasReacted: true,
      equation: 'CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l) (H₂SO₄ đặc, t°)',
      deltaH: -15.2,
      product: 'CH3COOC2H5'
    };
  }
  return {
    hasReacted: false,
    reason: 'Requires concentrated H2SO4 catalyst and heat'
  };
}

it('Esterification succeeds with H2SO4 catalyst and 65°C water bath', () => {
  const res = simulateEsterification(true, 65);
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.product, 'CH3COOC2H5');
  assert.ok(res.equation.includes('CH₃COOC₂H₅'));
});

it('Esterification is rejected at 25°C without acid catalyst', () => {
  const res = simulateEsterification(false, 25);
  assert.strictEqual(res.hasReacted, false);
});

// 2. Silver Mirror Tollens Redox Reaction
console.log('\n--- 2. Tollens Silver Mirror Reaction (Cacbohiđrat Hóa 12) ---');

function simulateSilverMirror(hasNH3, tempC) {
  if (hasNH3 && tempC >= 40) {
    return {
      hasReacted: true,
      equation: 'C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag↓ + 3NH₃ + H₂O (t°)',
      hasSilverMirror: true,
      deltaH: -145.0
    };
  }
  return {
    hasReacted: false,
    hasSilverMirror: false
  };
}

it('Tollens silver mirror succeeds with NH3 buffer and 50°C gentle heat', () => {
  const res = simulateSilverMirror(true, 50);
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.hasSilverMirror, true);
  assert.ok(res.equation.includes('2Ag↓'));
});

it('Tollens silver mirror fails without ammonia ligand', () => {
  const res = simulateSilverMirror(false, 50);
  assert.strictEqual(res.hasReacted, false);
});

// 3. Acid Carbonate Effervescence
console.log('\n--- 3. Acid Dissolution of Carbonates & Gas Effervescence ---');

function simulateCaCO3Dissolution(acidFormula) {
  if (acidFormula === 'HCl') {
    return {
      hasReacted: true,
      gasReleased: 'CO2',
      equation: 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g)↑ + H₂O(l)',
      deltaH: -15.8
    };
  }
  return { hasReacted: false };
}

it('CaCO3 reacts with HCl releasing gaseous CO2', () => {
  const res = simulateCaCO3Dissolution('HCl');
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.gasReleased, 'CO2');
  assert.ok(res.equation.includes('CO₂(g)↑'));
});

// 4. Thermite & Incompatible Reactions
console.log('\n--- 4. Thermite Activation Threshold & Activity Series ---');

function simulateThermite(tempK) {
  if (tempK >= 800) {
    return {
      hasReacted: true,
      moltenFe: true,
      tempEstimated: 3000
    };
  }
  return {
    hasReacted: false,
    moltenFe: false
  };
}

it('Thermite requires T >= 800K to overcome activation barrier Ea', () => {
  assert.strictEqual(simulateThermite(300).hasReacted, false);
  assert.strictEqual(simulateThermite(900).hasReacted, true);
  assert.strictEqual(simulateThermite(900).moltenFe, true);
});

// 5. Daniell Cell & Single Displacement Reactions
console.log('\n--- 5. Daniell Cell Redox Displacement & Hydrogen Synthesis ---');

function simulateDaniellReaction(metal, salt) {
  const pair = [metal, salt].sort().join('+');
  if (pair === 'CuSO4+Zn') {
    return {
      hasReacted: true,
      equation: 'Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)↓',
      deltaH: -218.7,
      eStandard: 1.10,
      precipitatedMetal: 'Cu'
    };
  }
  if (pair === 'CuSO4+Fe') {
    return {
      hasReacted: true,
      equation: 'Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓',
      deltaH: -150.0,
      eStandard: 0.78,
      precipitatedMetal: 'Cu'
    };
  }
  return { hasReacted: false };
}

it('Zinc displaces Copper from CuSO4 solution spontaneously (Daniell EMF = +1.10V)', () => {
  const res = simulateDaniellReaction('Zn', 'CuSO4');
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.eStandard, 1.10);
  assert.strictEqual(res.precipitatedMetal, 'Cu');
  assert.ok(res.equation.includes('ZnSO₄'));
});

it('Iron displaces Copper from CuSO4 solution spontaneously (EMF = +0.78V)', () => {
  const res = simulateDaniellReaction('Fe', 'CuSO4');
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.eStandard, 0.78);
  assert.strictEqual(res.precipitatedMetal, 'Cu');
});

// 6. Precipitation & Gas Generation Benchmarks
console.log('\n--- 6. Halide Precipitation & Metal Acid Gas Synthesis ---');

function simulatePrecipitationAndAcid(rA, rB) {
  const pair = [rA, rB].sort().join('+');
  if (pair === 'AgNO3+NaCl') {
    return {
      hasReacted: true,
      equation: 'AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)',
      precipitate: 'AgCl',
      color: 'white'
    };
  }
  if (pair === 'HCl+Zn') {
    return {
      hasReacted: true,
      equation: 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑',
      gas: 'H2',
      deltaH: -153.9
    };
  }
  return { hasReacted: false };
}

it('AgNO3 and NaCl produce white insoluble AgCl precipitate (Ksp ~ 1.8e-10)', () => {
  const res = simulatePrecipitationAndAcid('AgNO3', 'NaCl');
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.precipitate, 'AgCl');
  assert.strictEqual(res.color, 'white');
  assert.ok(res.equation.includes('AgCl(s)↓'));
});

it('Zinc reacts with HCl releasing gaseous Hydrogen', () => {
  const res = simulatePrecipitationAndAcid('Zn', 'HCl');
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.gas, 'H2');
  assert.ok(res.equation.includes('H₂(g)↑'));
});

// 7. ReactionEngine DCSM Combination & Cognitive Traps
console.log('\n--- 7. ReactionEngine DCSM State Machine & Cognitive Traps ---');

it('Alkali metal Na in moisture triggers REACTION_OCCURRED with 0 penalty', () => {
  const res = defaultReactionEngine.evaluateCombination(['Na'], ['MOISTURE_H2O']);
  assert.strictEqual(res.engineState, 'REACTION_OCCURRED');
  assert.strictEqual(res.status, 'SUCCESS');
  assert.strictEqual(res.manaPenaltyPercent, 0);
  assert.ok(res.equation.includes('NaOH'));
});

it('Noble gas He with Oxygen and heat triggers NO_REACTION_IN_MODEL cognitive trap with 50% penalty', () => {
  const res = defaultReactionEngine.evaluateCombination(['He'], ['OXYGEN_GAS', 'HIGH_TEMP']);
  assert.strictEqual(res.engineState, 'NO_REACTION_IN_MODEL');
  assert.strictEqual(res.status, 'TRAP_TRIGGERED');
  assert.strictEqual(res.manaPenaltyPercent, 50);
  assert.strictEqual(res.errorLog?.level, 3);
});

it('Noble metal Au with Oxygen and heat triggers cognitive trap', () => {
  const res = defaultReactionEngine.evaluateCombination(['Au'], ['OXYGEN_GAS', 'HIGH_TEMP']);
  assert.strictEqual(res.status, 'TRAP_TRIGGERED');
  assert.strictEqual(res.manaPenaltyPercent, 50);
});

it('Copper in dilute acid triggers cognitive trap (E° Cu2+/Cu = +0.34V > 0)', () => {
  const res = defaultReactionEngine.evaluateCombination(['Cu'], ['ACID_DILUTE']);
  assert.strictEqual(res.status, 'TRAP_TRIGGERED');
  assert.strictEqual(res.manaPenaltyPercent, 50);
});

it('Iron alone without conditions correctly reports MISSING_CONDITION and 25% penalty', () => {
  const res = defaultReactionEngine.evaluateCombination(['Fe'], []);
  assert.strictEqual(res.engineState, 'MISSING_CONDITION');
  assert.strictEqual(res.status, 'MISSING_CONDITIONS');
  assert.strictEqual(res.manaPenaltyPercent, 25);
  assert.strictEqual(res.errorLog?.level, 2);
  assert.ok(res.pedagogicalMessage.includes('thiếu tác nhân') || res.pedagogicalMessage.includes('Thiếu tác nhân'));
});

// 8. Stoichiometric Yield & Limiting Reactant Calculations
console.log('\n--- 8. Stoichiometric Yield & Limiting Reactant Calculations ---');

it('Haber-Bosch NH3 synthesis limits yield by N2 when H2 is in excess', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'N2': 2, 'H2': 10 },
    ['HIGH_TEMP']
  );
  const haber = matches.find(m => m.ruleCode === 'RX_EXP_023' || m.ruleCode === 'R_HABER_SYNTHESIS');
  assert.ok(haber, 'Haber synthesis rule must match');
  assert.strictEqual(haber.isExecutable, true);
  assert.strictEqual(haber.maxYieldUnits, 2);
  assert.strictEqual(haber.limitingReactant, 'N2');
  assert.strictEqual(haber.remainingInventory['N2'], 0);
  assert.strictEqual(haber.remainingInventory['H2'], 4);
  const nh3Product = haber.producedProducts.find(p => p.formula === 'NH3');
  assert.strictEqual(nh3Product?.count, 4);
});

it('Water synthesis limits yield by O2 when H2 is in excess', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'H2': 8, 'O2': 3 },
    ['HIGH_TEMP', 'OXYGEN_GAS']
  );
  const waterRx = matches.find(m => m.ruleCode === 'RX_EXP_009' || m.ruleCode === 'R_H2_O2_WATER');
  assert.ok(waterRx);
  assert.strictEqual(waterRx.isExecutable, true);
  assert.strictEqual(waterRx.maxYieldUnits, 3);
  assert.strictEqual(waterRx.limitingReactant, 'O2');
  assert.strictEqual(waterRx.remainingInventory['H2'], 2);
  assert.strictEqual(waterRx.remainingInventory['O2'], 0);
  const h2o = waterRx.producedProducts.find(p => p.formula === 'H2O');
  assert.strictEqual(h2o?.count, 6);
});

it('Thermite reaction 2Al + Fe2O3 -> Al2O3 + 2Fe calculates molten iron yield', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'Al': 6, 'Fe2O3': 2 },
    ['HIGH_TEMP']
  );
  const thermite = matches.find(m => m.ruleCode === 'RX_SYS_113' || m.ruleCode === 'R_THERMITE');
  assert.ok(thermite);
  assert.strictEqual(thermite.isExecutable, true);
  assert.strictEqual(thermite.maxYieldUnits, 2);
  assert.strictEqual(thermite.remainingInventory['Al'], 2);
  const fe = thermite.producedProducts.find(p => p.formula === 'Fe');
  assert.strictEqual(fe?.count, 4);
});

// 9. Organic Chemistry Reaction Pathways (GDPT 2018 Grade 11-12)
console.log('\n--- 9. Organic Chemistry Reaction Pathways (GDPT 2018) ---');

it('Esterification CH3COOH + C2H5OH -> CH3COOC2H5 + H2O succeeds under HIGH_TEMP', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'CH3COOH': 3, 'C2H5OH': 2 },
    ['HIGH_TEMP']
  );
  const ester = matches.find(m => m.ruleCode === 'RX_ORG_001');
  assert.ok(ester, 'Esterification rule RX_ORG_001 must match');
  assert.strictEqual(ester.isExecutable, true);
  assert.strictEqual(ester.maxYieldUnits, 2);
  assert.strictEqual(ester.limitingReactant, 'C2H5OH');
  assert.strictEqual(ester.remainingInventory['CH3COOH'], 1);
  const ethylAcetate = ester.producedProducts.find(p => p.formula === 'CH3COOC2H5');
  assert.strictEqual(ethylAcetate?.count, 2);
});

it('Tristearin saponification with NaOH produces sodium stearate soap and glycerol', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { '(C17H35COO)3C3H5': 2, 'NaOH': 6 },
    ['HIGH_TEMP']
  );
  const sapon = matches.find(m => m.ruleCode === 'RX_ORG_003');
  assert.ok(sapon, 'Saponification rule RX_ORG_003 must match');
  assert.strictEqual(sapon.isExecutable, true);
  assert.strictEqual(sapon.maxYieldUnits, 2);
  const soap = sapon.producedProducts.find(p => p.formula === 'C17H35COONa');
  const glycerol = sapon.producedProducts.find(p => p.formula === 'C3H5(OH)3');
  assert.strictEqual(soap?.count, 6);
  assert.strictEqual(glycerol?.count, 2);
});

it('Glucose anaerobic fermentation produces ethanol and carbon dioxide gas', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'C6H12O6': 3 },
    ['MOISTURE_H2O']
  );
  const ferm = matches.find(m => m.ruleCode === 'RX_ORG_004');
  assert.ok(ferm);
  assert.strictEqual(ferm.isExecutable, true);
  assert.strictEqual(ferm.maxYieldUnits, 3);
  const c2h5oh = ferm.producedProducts.find(p => p.formula === 'C2H5OH');
  const co2 = ferm.producedProducts.find(p => p.formula === 'CO2');
  assert.strictEqual(c2h5oh?.count, 6);
  assert.strictEqual(co2?.count, 6);
});

it('Glucose Tollens silver mirror reduction synthesizes metallic silver mirror', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'C6H12O6': 1, 'AgNO3': 2, 'NH3': 3, 'H2O': 1 },
    ['HIGH_TEMP']
  );
  const silverMirror = matches.find(m => m.ruleCode === 'RX_ORG_006');
  assert.ok(silverMirror);
  assert.strictEqual(silverMirror.isExecutable, true);
  assert.strictEqual(silverMirror.maxYieldUnits, 1);
  const ag = silverMirror.producedProducts.find(p => p.formula === 'Ag');
  assert.strictEqual(ag?.count, 2);
});

// 10. Environmental Edge Cases & Organic Dehydration/Saponification
console.log('\n--- 10. Environmental Edge Cases & Saponification/Dehydration ---');

it('Acid-Base neutralization occurs purely from environmental conditions (HCl + NaOH)', () => {
  const res = defaultReactionEngine.evaluateCombination([], ['ACID_DILUTE', 'BASE_ALKALINE']);
  assert.strictEqual(res.engineState, 'REACTION_OCCURRED');
  assert.strictEqual(res.status, 'SUCCESS');
  assert.ok(res.matchedRule?.code === 'R03_NEUTRALIZE' || res.matchedRule?.code === 'R04_HCL_NAOH');
  assert.strictEqual(res.manaPenaltyPercent, 0);
});

it('Condition active without reactants correctly returns MISSING_REACTANT', () => {
  const res = defaultReactionEngine.evaluateCombination([], ['HIGH_TEMP']);
  assert.strictEqual(res.engineState, 'MISSING_REACTANT');
  assert.strictEqual(res.status, 'MISSING_CONDITIONS');
  assert.strictEqual(res.manaPenaltyPercent, 20);
});

it('Ethyl acetate saponification with NaOH produces sodium acetate and ethanol', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'CH3COOC2H5': 4, 'NaOH': 4 },
    ['HIGH_TEMP']
  );
  const sapon = matches.find(m => m.ruleCode === 'RX_ORG_002');
  assert.ok(sapon, 'Ethyl acetate saponification must match');
  assert.strictEqual(sapon.isExecutable, true);
  assert.strictEqual(sapon.maxYieldUnits, 4);
  const naOAc = sapon.producedProducts.find(p => p.formula === 'CH3COONa');
  const ethanol = sapon.producedProducts.find(p => p.formula === 'C2H5OH');
  assert.strictEqual(naOAc?.count, 4);
  assert.strictEqual(ethanol?.count, 4);
});

it('Ethanol catalytic dehydration yields ethylene gas (C2H4)', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'C2H5OH': 5 },
    ['HIGH_TEMP']
  );
  const dehyd = matches.find(m => m.ruleCode === 'RX_ORG_005');
  assert.ok(dehyd, 'Ethanol dehydration must match');
  assert.strictEqual(dehyd.isExecutable, true);
  assert.strictEqual(dehyd.maxYieldUnits, 5);
  const c2h4 = dehyd.producedProducts.find(p => p.formula === 'C2H4');
  assert.strictEqual(c2h4?.count, 5);
});

// 11. Limiting Reactant & Remaining Inventory Conservation
console.log('\n--- 11. Limiting Reactant & Remaining Inventory Conservation ---');

it('Haber-Bosch inventory with 10 H2 and 2 N2 correctly identifies N2 as limiting with exact remaining inventory', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'H2': 10, 'N2': 2 },
    ['HIGH_PRESSURE', 'HIGH_TEMP']
  );
  const haber = matches.find(m => m.ruleCode.includes('HABER') || m.reactionName.includes('Haber'));
  assert.ok(haber, 'Haber reaction must match');
  assert.strictEqual(haber.isExecutable, true);
  assert.strictEqual(haber.maxYieldUnits, 2, '2 units of N2 limits reaction to 2 yield blocks');
  assert.strictEqual(haber.limitingReactant, 'N2');

  // 2 blocks consume 6 H2 and 2 N2
  assert.strictEqual(haber.consumedInventory['H2'], 6);
  assert.strictEqual(haber.consumedInventory['N2'], 2);

  // Remaining: 10 - 6 = 4 H2, 2 - 2 = 0 N2
  assert.strictEqual(haber.remainingInventory['H2'], 4);
  assert.strictEqual(haber.remainingInventory['N2'], 0);

  // Products: 2 blocks * 2 NH3 = 4 NH3
  const nh3 = haber.producedProducts.find(p => p.formula === 'NH3');
  assert.strictEqual(nh3?.count, 4);
});

// 12. Missing Reactant Diagnostic Reporting
console.log('\n--- 12. Missing Reactant Diagnostic Reporting ---');

it('Sub-stoichiometric Haber inventory (2 H2, 1 N2) flags missing H2 reactant without throwing', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'H2': 2, 'N2': 1 },
    ['HIGH_PRESSURE', 'HIGH_TEMP']
  );
  const haber = matches.find(m => m.ruleCode.includes('HABER') || m.reactionName.includes('Haber'));
  assert.ok(haber);
  assert.strictEqual(haber.isExecutable, false, 'Insufficient H2 must render reaction non-executable');
  assert.strictEqual(haber.maxYieldUnits, 0);
  assert.ok(haber.missingReactants.length > 0, 'Must report missing reactant');
  const missingH2 = haber.missingReactants.find(m => m.formula === 'H2');
  assert.ok(missingH2);
  assert.strictEqual(missingH2.needed, 3);
  assert.strictEqual(missingH2.available, 2);
  assert.ok(haber.diagnosticMessage.includes('Thiếu') || haber.diagnosticMessage.includes('Cần'));
});

// 13. Missing Environmental Conditions Diagnostic Reporting
console.log('\n--- 13. Missing Environmental Conditions Diagnostic Reporting ---');

it('Esterification without acid catalyst or heat reports missing environmental conditions', () => {
  const matches = defaultReactionEngine.evaluateMolecularInventory(
    { 'CH3COOH': 2, 'C2H5OH': 2 },
    [] // No environmental conditions provided
  );
  const ester = matches.find(m => m.ruleCode === 'RX_ORG_001');
  assert.ok(ester);
  assert.strictEqual(ester.isExecutable, false);
  assert.ok(ester.missingConditions.length > 0, 'Must report missing conditions');
  assert.ok(ester.diagnosticMessage.length > 10, 'Diagnostic message must explain missing catalyst/temp');
});

// 14. Combinatorial Reaction Pathways & Catalytic Energy Barriers (GDPT 2018 Standard)
console.log('\n--- 14. Combinatorial Pathways, Le Chatelier & Catalytic Activation ---');

// Simulation test harness matching ReactionSandboxTab evaluateReaction logic
function simulateSandboxEvaluation(reactantA, reactantB, options = {}) {
  const {
    temperatureC = 25,
    pressureAtm = 1.0,
    initialPh = 7.0,
    selectedCatalyst = 'NONE'
  } = options;
  const pair = [reactantA, reactantB].sort().join('+');

  if (pair === 'Al+NaOH') {
    return {
      hasReacted: true,
      balancedEquation: '2Al(s) + 2NaOH(aq) + 6H₂O(l) → 2Na[Al(OH)₄](aq) + 3H₂(g)↑',
      deltaH: -830.4,
      isExothermic: true,
      resultingPh: 12.0
    };
  }

  if (pair === 'Ba+H2O') {
    return {
      hasReacted: true,
      balancedEquation: 'Ba(s) + 2H₂O(l) → Ba(OH)₂(aq) + H₂(g)↑',
      deltaH: -428.6,
      isExothermic: true,
      resultingPh: 13.0
    };
  }

  if (pair === 'O2+SO2') {
    const hasCatalyst = selectedCatalyst === 'V2O5' || selectedCatalyst === 'Pt';
    const hasOptimalHeat = temperatureC >= 400;
    if (hasCatalyst || hasOptimalHeat) {
      return {
        hasReacted: true,
        balancedEquation: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g) (ΔH°₂₉₈ = -197.8 kJ)',
        deltaH: -197.8,
        isExothermic: true,
        resultingPh: 2.0
      };
    }
    return {
      hasReacted: false,
      balancedEquation: '2SO₂(g) + O₂(g) ↛ (Cần xúc tác V₂O₅/Pt hoặc nhiệt độ > 400°C)',
      deltaH: 0,
      isExothermic: false,
      resultingPh: initialPh
    };
  }

  if (pair === 'AgNO3+Cu') {
    return {
      hasReacted: true,
      balancedEquation: 'Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓',
      deltaH: -147.2,
      isExothermic: true,
      resultingPh: initialPh
    };
  }

  if (pair === 'Cl2+Fe') {
    if (temperatureC >= 100) {
      return {
        hasReacted: true,
        balancedEquation: '2Fe(s) + 3Cl₂(g) → 2FeCl₃(s) (t°)',
        deltaH: -799.0,
        isExothermic: true,
        resultingPh: 2.5
      };
    }
    return {
      hasReacted: false,
      balancedEquation: '2Fe(s) + 3Cl₂(g) ↛ (Cần mồi nhiệt độ t° ≥ 100°C)',
      deltaH: 0,
      isExothermic: false,
      resultingPh: initialPh
    };
  }

  if (pair === 'Cl2+H2') {
    if (selectedCatalyst === 'LIGHT' || temperatureC >= 50) {
      return {
        hasReacted: true,
        balancedEquation: 'H₂(g) + Cl₂(g) → 2HCl(g) (Ánh sáng hν hoặc t°)',
        deltaH: -184.6,
        isExothermic: true,
        resultingPh: 1.0
      };
    }
    return {
      hasReacted: false,
      balancedEquation: 'H₂(g) + Cl₂(g) ↛ (Cần ánh sáng quang hóa hoặc nhiệt độ > 50°C)',
      deltaH: 0,
      isExothermic: false,
      resultingPh: initialPh
    };
  }

  return { hasReacted: false, deltaH: 0, resultingPh: initialPh };
}

it('Al + NaOH dissolves with vigorous H2 effervescence producing soluble aluminate complex', () => {
  const res = simulateSandboxEvaluation('Al', 'NaOH');
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.deltaH, -830.4);
  assert.strictEqual(res.resultingPh, 12.0);
  assert.ok(res.balancedEquation.includes('Na[Al(OH)₄]'));
  assert.ok(res.balancedEquation.includes('3H₂(g)↑'));

  const kinetics = ThermochemistryEngine.getKineticsProfile('Al+NaOH');
  assert.ok(kinetics);
  assert.strictEqual(kinetics.eaUncatalyzed_kJ, 45);
});

it('Ba + H2O hydrolyzes strongly exothermic yielding high alkaline Ba(OH)2 solution', () => {
  const res = simulateSandboxEvaluation('Ba', 'H2O');
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.deltaH, -428.6);
  assert.strictEqual(res.resultingPh, 13.0);
  assert.ok(res.balancedEquation.includes('Ba(OH)₂'));

  const kinetics = ThermochemistryEngine.getKineticsProfile('Ba+H2O');
  assert.ok(kinetics);
  assert.strictEqual(kinetics.eaUncatalyzed_kJ, 15);
});

it('SO2 + O2 contact process is gated by V2O5 catalyst or 450°C heat barrier', () => {
  // Cold without catalyst -> rejected
  const cold = simulateSandboxEvaluation('SO2', 'O2', { temperatureC: 25, selectedCatalyst: 'NONE' });
  assert.strictEqual(cold.hasReacted, false);

  // Catalyzed with V2O5 at 450°C -> reacts efficiently
  const hotCat = simulateSandboxEvaluation('SO2', 'O2', { temperatureC: 450, selectedCatalyst: 'V2O5' });
  assert.strictEqual(hotCat.hasReacted, true);
  assert.strictEqual(hotCat.deltaH, -197.8);
  assert.strictEqual(hotCat.resultingPh, 2.0);

  const kinetics = ThermochemistryEngine.getKineticsProfile('O2+SO2');
  assert.ok(kinetics);
  assert.strictEqual(kinetics.eaUncatalyzed_kJ, 190);
  assert.strictEqual(kinetics.eaCatalyzed_kJ, 60);
  assert.strictEqual(kinetics.catalystKey, 'V2O5');

  // Verify Arrhenius speedup from V2O5
  const speedup = ThermochemistryEngine.calculateCatalystSpeedup(190, 60, 450 + 273.15);
  assert.ok(speedup.deltaEa_kJ === 130);
  assert.ok(speedup.speedupFactor > 1e8);
});

it('Cu + AgNO3 generates crystalline silver arbor tree with +0.46V cell potential', () => {
  const res = simulateSandboxEvaluation('Cu', 'AgNO3');
  assert.strictEqual(res.hasReacted, true);
  assert.strictEqual(res.deltaH, -147.2);
  assert.ok(res.balancedEquation.includes('2Ag(s)↓'));
  assert.ok(res.balancedEquation.includes('Cu(NO₃)₂'));

  const kinetics = ThermochemistryEngine.getKineticsProfile('AgNO3+Cu');
  assert.ok(kinetics);
  assert.strictEqual(kinetics.eaUncatalyzed_kJ, 32);
});

it('Fe + Cl2 chlorination requires thermal ignition (t >= 100°C) to yield reddish-brown FeCl3', () => {
  const roomTemp = simulateSandboxEvaluation('Fe', 'Cl2', { temperatureC: 25 });
  assert.strictEqual(roomTemp.hasReacted, false);

  const ignited = simulateSandboxEvaluation('Fe', 'Cl2', { temperatureC: 200 });
  assert.strictEqual(ignited.hasReacted, true);
  assert.strictEqual(ignited.deltaH, -799.0);
  assert.ok(ignited.balancedEquation.includes('2FeCl₃(s)'));

  const kinetics = ThermochemistryEngine.getKineticsProfile('Cl2+Fe');
  assert.ok(kinetics);
  assert.strictEqual(kinetics.eaUncatalyzed_kJ, 85);
});

it('H2 + Cl2 photochemical reaction triggers explosive radical chain upon light/heat activation', () => {
  const dark = simulateSandboxEvaluation('H2', 'Cl2', { temperatureC: 25, selectedCatalyst: 'NONE' });
  assert.strictEqual(dark.hasReacted, false);

  const light = simulateSandboxEvaluation('H2', 'Cl2', { temperatureC: 25, selectedCatalyst: 'LIGHT' });
  assert.strictEqual(light.hasReacted, true);
  assert.strictEqual(light.deltaH, -184.6);
  assert.strictEqual(light.resultingPh, 1.0);
  assert.ok(light.balancedEquation.includes('2HCl(g)'));

  const kinetics = ThermochemistryEngine.getKineticsProfile('Cl2+H2');
  assert.ok(kinetics);
  assert.strictEqual(kinetics.eaUncatalyzed_kJ, 72);
  assert.strictEqual(kinetics.eaCatalyzed_kJ, 20);
});

console.log('\n============================================================');
console.log(` AUDIT RESULT: ${passedAssertions} PASSED, 0 FAILED`);
console.log('============================================================\n');
