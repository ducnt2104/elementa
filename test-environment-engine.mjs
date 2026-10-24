// test-environment-engine.mjs
// Comprehensive Scientific Audit Test Suite for Chemical Environment Engine & Le Chatelier Dynamics

import { ChemicalEnvironmentEngine } from './src/domain/chemicalEnvironment.ts';
import { DuelEngine } from './src/domain/duelEngine.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log(`\n============================================================`);
console.log(`   ELEMENTA: CHEMICAL ENVIRONMENT & THERMODYNAMICS AUDIT`);
console.log(`============================================================`);

// --- 1. Default Environment & Universal Indicator ---
console.log('\n--- 1. Default Baseline Environment & pH Scale ---');
const defaultEnv = ChemicalEnvironmentEngine.createDefaultEnvironment();
assert(defaultEnv.ph === 7.0, 'Default environment has neutral pH 7.0 at 25°C');
assert(defaultEnv.temperature === 298.15, 'Default temperature is 298.15 K (25°C)');
assert(defaultEnv.pressure === 1.0, 'Default pressure is 1.0 atm');
assert(defaultEnv.bufferCapacity === 0, 'Default environment has no buffer capacity');

const strongAcid = ChemicalEnvironmentEngine.getUniversalIndicatorData(1.5);
assert(strongAcid.hex === '#ef4444', 'pH 1.5 mapped to strong acid red (#ef4444)');

const weakAcid = ChemicalEnvironmentEngine.getUniversalIndicatorData(4.5);
assert(weakAcid.hex === '#f59e0b', 'pH 4.5 mapped to weak acid amber (#f59e0b)');

const neutral = ChemicalEnvironmentEngine.getUniversalIndicatorData(7.0);
assert(neutral.hex === '#10b981', 'pH 7.0 mapped to neutral emerald (#10b981)');

const weakBase = ChemicalEnvironmentEngine.getUniversalIndicatorData(9.5);
assert(weakBase.hex === '#06b6d4', 'pH 9.5 mapped to weak base cyan (#06b6d4)');

const strongBase = ChemicalEnvironmentEngine.getUniversalIndicatorData(13.0);
assert(strongBase.hex === '#8b5cf6', 'pH 13.0 mapped to strong alkali purple (#8b5cf6)');

// --- 2. Buffer Capacity & Henderson-Hasselbalch Resistance ---
console.log('\n--- 2. Buffer Capacity & Henderson-Hasselbalch Perturbation ---');
// Unbuffered acid shift
const unbuffered = ChemicalEnvironmentEngine.applyPhShift(defaultEnv, -3.0);
assert(unbuffered.buffered === false, 'Unbuffered environment does not resist acid');
assert(unbuffered.newEnv.ph === 4.0, `pH shifts directly by -3.0: 7.0 -> 4.0 (got ${unbuffered.newEnv.ph})`);

// Buffered environment
const bufferedEnv = {
  ...defaultEnv,
  bufferType: 'BICARBONATE_PHYSIO',
  bufferCapacity: 3
};
const bufferRes = ChemicalEnvironmentEngine.applyPhShift(bufferedEnv, -3.0);
assert(bufferRes.buffered === true, 'Bicarbonate buffer active and resisted acid shock');
assert(bufferRes.newEnv.ph === 6.25, `Buffer absorbed 75% of shock, pH changed by only -0.75 to 6.25 (got ${bufferRes.newEnv.ph})`);
assert(bufferRes.newEnv.bufferCapacity === 2, 'Buffer capacity reduced from 3 to 2');

// --- 3. Le Chatelier Principle (Gas Pressure Dynamics) ---
console.log('\n--- 3. Le Chatelier Principle (Gas Pressure Dynamics) ---');
// Haber reaction: N2(g) + 3H2(g) <=> 2NH3(g) (deltaMolesGas = -2)
const haberHighP = ChemicalEnvironmentEngine.calculateLeChatelierGasShift(-2, true);
assert(haberHighP.shiftDirection === 'FORWARD', 'Increasing pressure on Haber reaction shifts FORWARD towards fewer gas moles');
assert(haberHighP.yieldMultiplier === 1.45, 'High pressure increases synthesis yield by +45%');

const haberLowP = ChemicalEnvironmentEngine.calculateLeChatelierGasShift(-2, false);
assert(haberLowP.shiftDirection === 'REVERSE', 'Decreasing pressure on Haber reaction shifts REVERSE');

// Reaction with equal gas moles: H2(g) + Cl2(g) <=> 2HCl(g) (deltaMolesGas = 0)
const equalGas = ChemicalEnvironmentEngine.calculateLeChatelierGasShift(0, true);
assert(equalGas.shiftDirection === 'NO_SHIFT', 'Reaction with Δn_gas = 0 has NO SHIFT under pressure change');
assert(equalGas.yieldMultiplier === 1.0, 'Yield multiplier remains 1.0 when Δn_gas = 0');

// Contact Process: 2SO2(g) + O2(g) <=> 2SO3(g) (deltaMolesGas = 2 - 3 = -1)
const contactHighP = ChemicalEnvironmentEngine.calculateLeChatelierGasShift(-1, true);
assert(contactHighP.shiftDirection === 'FORWARD', 'Contact process under high pressure shifts FORWARD towards fewer gas moles (SO3)');

// Carbonate Decomposition: CaCO3(s) <=> CaO(s) + CO2(g) (deltaMolesGas = +1)
const caco3HighP = ChemicalEnvironmentEngine.calculateLeChatelierGasShift(1, true);
assert(caco3HighP.shiftDirection === 'REVERSE', 'CaCO3 calcination under high pressure shifts REVERSE suppressing gas release');

// --- 4. Van 't Hoff Isochore & Thermal Reaction Kinetics ---
console.log('\n--- 4. Van \'t Hoff Isochore & Thermal Reaction Kinetics ---');
// Endothermic reaction (ΔH = +178 kJ/mol) heated from 298K to 600K
const endoHeated = ChemicalEnvironmentEngine.calculateThermalEffect(178, 600, 298.15);
assert(endoHeated.equilibriumShift === 'FORWARD', 'Heating an endothermic reaction (ΔH > 0) shifts equilibrium FORWARD');
assert(endoHeated.kineticBoost > 1.0, `Arrhenius rate increases with temperature (got ${endoHeated.kineticBoost.toFixed(2)})`);

// Exothermic reaction (ΔH = -92 kJ/mol) heated
const exoHeated = ChemicalEnvironmentEngine.calculateThermalEffect(-92, 600, 298.15);
assert(exoHeated.equilibriumShift === 'REVERSE', 'Heating an exothermic reaction (ΔH < 0) shifts equilibrium REVERSE (Le Chatelier)');

// Exothermic reaction cooled to 250K
const exoCooled = ChemicalEnvironmentEngine.calculateThermalEffect(-92, 250, 298.15);
assert(exoCooled.equilibriumShift === 'FORWARD', 'Cooling an exothermic reaction shifts equilibrium FORWARD');

// --- 5. Environment Combat Modifiers ---
console.log('\n--- 5. Environment Combat Modifiers ---');
// Acidic environment (pH = 2.8) on active metal Sodium Na
const acidEnv = { ...defaultEnv, ph: 2.8 };
const naAcidMod = ChemicalEnvironmentEngine.calculateCombatModifiers(acidEnv, 'ELEMENT_MONSTER', 'PYRO', 'Na');
assert(naAcidMod.atkBoost === 300, 'Acidic environment increases Sodium ATK by +300');
assert(naAcidMod.defBoost === -200, 'Acidic environment corrodes Sodium DEF by -200');

// Alkaline environment (pH = 10.5) on amphoteric metal Aluminum Al
const baseEnv = { ...defaultEnv, ph: 10.5 };
const alBaseMod = ChemicalEnvironmentEngine.calculateCombatModifiers(baseEnv, 'ELEMENT_MONSTER', 'TERRA', 'Al');
assert(alBaseMod.atkBoost === 400, 'Alkaline environment dissolves amphoteric Aluminum with +400 ATK bonus');

// Volcanic High Temp environment (873 K) on PYRO
const pyroEnv = { ...defaultEnv, temperature: 873.15 };
const pyroMod = ChemicalEnvironmentEngine.calculateCombatModifiers(pyroEnv, 'ELEMENT_MONSTER', 'PYRO', 'Fe');
assert(pyroMod.atkBoost === 350, 'High temperature (>500K) increases PYRO ATK by +350');

// Cryogenic Low Temp environment (253 K) on AQUA
const cryoEnv = { ...defaultEnv, temperature: 253.15 };
const cryoMod = ChemicalEnvironmentEngine.calculateCombatModifiers(cryoEnv, 'COMPOUND_MONSTER', 'AQUA', 'H2O');
assert(cryoMod.defBoost === 400, 'Cryogenic freezing increases AQUA DEF by +400');

// Catalysts active (Fe + Pt)
const catalystEnv = { ...defaultEnv, activeCatalysts: ['Fe', 'Pt'] };
const catMod = ChemicalEnvironmentEngine.calculateCombatModifiers(catalystEnv, 'ELEMENT_MONSTER', 'AERO', 'N');
assert(catMod.atkBoost === 300, 'Two active catalysts increase ATK by +300 (+150 each)');

// --- 6. DuelEngine Integration with Environment ---
console.log('\n--- 6. DuelEngine Integration with Environment ---');
const engine = new DuelEngine();
assert(engine.environment.ph === 7.0, 'DuelEngine initialized with neutral environment');
assert(engine.environment.pressure === 1.0, 'DuelEngine pressure is 1.0 atm');

// Player activates Acid Rain Field Card
const acidRainCard = engine.player.deck.find(c => c.def.id === 'card_field_acid_rain') ||
                     engine.player.hand.find(c => c.def.id === 'card_field_acid_rain');
if (acidRainCard) {
  if (!engine.player.hand.includes(acidRainCard)) engine.player.hand.push(acidRainCard);
  engine.player.mana = 5;
  const res = engine.activateSpellFromHand('player', acidRainCard.uid);
  assert(res.success === true, 'Activated Acid Rain Field Spell');
  assert(engine.environment.ph === 2.8, `Environment pH dropped to 2.8 (got ${engine.environment.ph})`);
  assert(engine.player.fieldZone !== null, 'Acid Rain placed in Field Zone');
}

// Player activates Haber Chamber Field Card
const haberCard = engine.player.deck.find(c => c.def.id === 'card_field_haber_chamber') ||
                  engine.player.hand.find(c => c.def.id === 'card_field_haber_chamber');
if (haberCard) {
  if (!engine.player.hand.includes(haberCard)) engine.player.hand.push(haberCard);
  engine.player.mana = 5;
  const res = engine.activateSpellFromHand('player', haberCard.uid);
  assert(res.success === true, 'Activated Haber-Bosch Field Spell');
  assert(engine.environment.pressure === 200.0, `Environment pressure increased to 200 atm (got ${engine.environment.pressure})`);
  assert(engine.environment.activeCatalysts.includes('Fe'), 'Iron [Fe] catalyst added to environment');
}

// Player activates Titration Neutralization Spell
const neutCard = engine.player.deck.find(c => c.def.id === 'card_spell_ph_neutralization') ||
                 engine.player.hand.find(c => c.def.id === 'card_spell_ph_neutralization');
if (neutCard) {
  if (!engine.player.hand.includes(neutCard)) engine.player.hand.push(neutCard);
  engine.player.mana = 5;
  const res = engine.activateSpellFromHand('player', neutCard.uid);
  assert(res.success === true, 'Activated Neutralization Titration Spell');
  assert(engine.environment.ph === 7.0, `Environment pH neutralized back to 7.0 (got ${engine.environment.ph})`);
}

// Combat calculation with active environment
const naCard = engine.player.deck.find(c => c.def.id === 'card_elem_11_na') || engine.player.hand.find(c => c.def.id === 'card_elem_11_na');
engine.player.monsterZones[0] = {
  slotIndex: 0,
  card: naCard,
  position: 'FACE_UP_ATTACK',
  hasAttackedThisTurn: false,
  hasChangedPositionThisTurn: false,
  turnSummoned: 1,
  tempAtkBoost: 0,
  tempDefBoost: 0
};

// Set environment to acid again
engine.environment.ph = 2.5;
engine.currentPhase = 'BATTLE_PHASE';
const directAttackRes = engine.declareAttack(0, 'DIRECT');
assert(directAttackRes.success === true, 'Declared direct attack with active chemical environment');
// Base Na ATK is 1800. In acid (pH 2.5), Na gets +300 ATK -> 1800 + 300 = 2100!
assert(directAttackRes.damageDealt === 2100, `Damage dealt includes +300 acid boost: 1800 + 300 = 2100 (got ${directAttackRes.damageDealt})`);

// --- 7. Buffer Exhaustion & Acid Breakthrough Dynamics ---
console.log('\n--- 7. Buffer Exhaustion & Acid Breakthrough Dynamics ---');
{
  const fragileBuffer = {
    ...defaultEnv,
    ph: 7.4,
    bufferType: 'BICARBONATE_PHYSIO',
    bufferCapacity: 1 // Only 1 charge remaining!
  };

  // First shock uses the last buffer charge
  const shock1 = ChemicalEnvironmentEngine.applyPhShift(fragileBuffer, -2.0);
  assert(shock1.buffered === true, 'First shock is resisted by remaining buffer capacity');
  assert(shock1.newEnv.bufferCapacity === 0, 'Buffer capacity depleted to 0');
  // Absorbs 75% -> drops by -0.5: 7.4 - 0.5 = 6.9
  assert(shock1.newEnv.ph === 6.9, `pH dropped gently to 6.9 (got ${shock1.newEnv.ph})`);

  // Second shock experiences complete breakthrough (0% resistance)
  const shock2 = ChemicalEnvironmentEngine.applyPhShift(shock1.newEnv, -2.0);
  assert(shock2.buffered === false, 'Exhausted buffer provides zero resistance');
  // Full -2.0 drop: 6.9 - 2.0 = 4.9
  assert(shock2.newEnv.ph === 4.9, `Breakthrough drops pH directly to 4.9 (got ${shock2.newEnv.ph})`);
}

// --- 8. Amphoteric Zinc Dual pH Extremes Invariant ---
console.log('\n--- 8. Amphoteric Zinc Dual pH Extremes Invariant ---');
{
  // Zinc in Acid (pH 2.0): active metal reaction generating H2
  const acidEnv = { ...defaultEnv, ph: 2.0 };
  const znAcid = ChemicalEnvironmentEngine.calculateCombatModifiers(acidEnv, 'ELEMENT_MONSTER', 'TERRA', 'Zn');
  assert(znAcid.atkBoost === 300, 'Zinc in strong acid gains +300 ATK');
  assert(znAcid.defBoost === -200, 'Zinc in strong acid loses -200 DEF to acid dissolution');

  // Zinc in Strong Alkali (pH 12.5): amphoteric dissolution forming zincate complex
  const alkaliEnv = { ...defaultEnv, ph: 12.5 };
  const znAlkali = ChemicalEnvironmentEngine.calculateCombatModifiers(alkaliEnv, 'ELEMENT_MONSTER', 'TERRA', 'Zn');
  assert(znAlkali.atkBoost === 400, 'Zinc in strong alkali gains +400 ATK via zincate complexation');
  assert(znAlkali.specialPerks.some(p => p.includes('lưỡng tính')), 'Identifies amphoteric chemical lore');
}

// --- 9. Multi-Hazard Supercritical Environment Stacking ---
console.log('\n--- 9. Multi-Hazard Supercritical Environment Stacking ---');
{
  // Supercritical Haber Reactor: High P (200 atm), High T (723 K), Fe + Pt catalysts
  const supercriticalEnv = {
    ...defaultEnv,
    pressure: 200.0,
    temperature: 723.15,
    activeCatalysts: ['Fe', 'Pt']
  };

  // Test on AERO/PYRO monster:
  // Pressure > 5 -> AERO +250 ATK
  // Temp > 500 -> PYRO +350 ATK
  // Catalysts (2) -> +300 ATK
  // Total ATK boost should stack to 250 + 350 + 300 = 900 ATK!
  const aeroMod = ChemicalEnvironmentEngine.calculateCombatModifiers(supercriticalEnv, 'ELEMENT_MONSTER', 'AERO', 'N');
  // For AERO N: pressure (+250) + catalysts (+300) = +550 ATK
  assert(aeroMod.atkBoost === 550, `AERO monster receives +550 ATK boost in supercritical reactor (got +${aeroMod.atkBoost})`);
  assert(aeroMod.specialPerks.length === 2, 'Gains both high-pressure and catalyst special perks');

  const pyroMod = ChemicalEnvironmentEngine.calculateCombatModifiers(supercriticalEnv, 'ELEMENT_MONSTER', 'PYRO', 'Fe');
  // For PYRO Fe: temp (+350) + catalysts (+300) = +650 ATK
  assert(pyroMod.atkBoost === 650, `PYRO monster receives +650 ATK boost in supercritical reactor (got +${pyroMod.atkBoost})`);
}

console.log(`\n============================================================`);
console.log(` AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
console.log(`============================================================`);

if (failed > 0) process.exit(1);
