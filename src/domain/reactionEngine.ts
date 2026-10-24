// src/domain/reactionEngine.ts
// Deterministic Chemical State Machine (DCSM) Engine with Explicit Chemical States

import { REACTION_RULES_DATABASE, ReactionDetail } from '../data/reactionsData';
import { EnvironmentalCondition, CognitiveErrorLevel } from './types';
import { verifyEquationBalance } from './equationBalancer';

export type ChemicalEngineState =
  | 'REACTION_OCCURRED'
  | 'MISSING_REACTANT'
  | 'MISSING_CONDITION'
  | 'NO_REACTION_IN_MODEL'
  | 'INVALID_SPECIES'
  | 'UNBALANCED_EQUATION'
  | 'UNSUPPORTED_CASE';

export interface MolecularInventory {
  [formulaOrSymbol: string]: number;
}

export interface StoichiometricYieldProduct {
  formula: string;
  count: number;
  name_vi: string;
}

export interface MolecularReactionMatch {
  ruleCode: string;
  reactionName: string;
  equation: string;
  isExecutable: boolean;
  isTrap: boolean;
  basePower?: number;
  maxYieldUnits: number;
  limitingReactant?: string;
  consumedInventory: MolecularInventory;
  remainingInventory: MolecularInventory;
  producedProducts: StoichiometricYieldProduct[];
  missingReactants: { formula: string; needed: number; available: number }[];
  missingConditions: string[];
  diagnosticMessage: string;
  observablePhenomenaVI?: string;
}

export interface ReactionCascadeStep {
  stepIndex: number;
  reaction: MolecularReactionMatch;
  inventoryBefore: MolecularInventory;
  inventoryAfter: MolecularInventory;
  consumedDelta: MolecularInventory;
  producedDelta: StoichiometricYieldProduct[];
  conditionsApplied: EnvironmentalCondition[];
  isExothermic: boolean;
  pedagogicalSummaryVI: string;
}

export interface ReactionCascadeResult {
  steps: ReactionCascadeStep[];
  finalInventory: MolecularInventory;
  totalReactionsTriggered: number;
  hasTrapsEncountered: boolean;
  trapDetails?: {
    ruleCode: string;
    reactionName: string;
    message: string;
  };
  summaryVI: string;
  netProductsProduced: StoichiometricYieldProduct[];
}

export interface ReactionEvaluationResult {
  engineState: ChemicalEngineState;
  status: 'SUCCESS' | 'TRAP_TRIGGERED' | 'MISSING_CONDITIONS' | 'NO_REACTION';
  matchedRule?: ReactionDetail;
  equation?: string;
  netIonicEquation?: string;
  pedagogicalMessage: string;
  chemicalLayers?: {
    resultVI: string;
    evidenceVI: string;
    mechanismVI: string;
    generalizationVI: string;
  };
  errorLog?: {
    symbolOrPair: string;
    level: CognitiveErrorLevel;
    message: string;
  };
  manaPenaltyPercent: number; // 0 for success, 50 for trap/invalid
  observablePhenomenaVI?: string;
}

export interface ReactionRecipe {
  reactants: Record<string, number>;
  reactantEntries?: [string, number][];
  products: StoichiometricYieldProduct[];
}

// Homoglyph conversion map: Cyrillic lookalikes to Latin standard ASCII
const CYRILLIC_HOMOGLYPH_MAP: Record<string, string> = {
  'А': 'A', 'В': 'B', 'С': 'C', 'Е': 'E', 'Н': 'H', 'К': 'K', 'М': 'M', 'О': 'O', 'Р': 'P', 'Т': 'T', 'Х': 'X',
  'а': 'a', 'с': 'c', 'е': 'e', 'о': 'o', 'р': 'p', 'х': 'x'
};

// Module-level Normalizer for Chemical Keys (Unicode Subscripts, Homoglyphs & Phase Tags)
export function normalizeFormulaKey(key: string): string {
  if (!key) return '';
  return key
    .replace(/[\s\u00A0\u200B-\u200D\uFEFF]/g, '') // Strip whitespace, non-breaking and zero-width spaces
    .replace(/[АВСЕНКМОРТХасеорх]/g, ch => CYRILLIC_HOMOGLYPH_MAP[ch] || ch) // Homoglyph canonicalization
    .replace(/₀/g, '0')
    .replace(/₁/g, '1')
    .replace(/₂/g, '2')
    .replace(/₃/g, '3')
    .replace(/₄/g, '4')
    .replace(/₅/g, '5')
    .replace(/₆/g, '6')
    .replace(/₇/g, '7')
    .replace(/₈/g, '8')
    .replace(/₉/g, '9')
    .replace(/\(s\)|\(l\)|\(g\)|\(aq\)/g, '')
    .trim();
}

// Module-level Standard Curated Stoichiometric Recipes Map for Core Reactions
export const STOICHIOMETRIC_RECIPES: Record<string, ReactionRecipe> = {
  'R01_NA': { reactants: { 'Na': 2, 'H2O': 2 }, products: [{ formula: 'NaOH', count: 2, name_vi: 'Natri hidroxit' }, { formula: 'H2', count: 1, name_vi: 'Khí Hydro' }] },
  'R01_K': { reactants: { 'K': 2, 'H2O': 2 }, products: [{ formula: 'KOH', count: 2, name_vi: 'Kali hidroxit' }, { formula: 'H2', count: 1, name_vi: 'Khí Hydro' }] },
  'R01_BA': { reactants: { 'Ba': 1, 'H2O': 2 }, products: [{ formula: 'Ba(OH)2', count: 1, name_vi: 'Bari hidroxit' }, { formula: 'H2', count: 1, name_vi: 'Khí Hydro' }] },
  'R02_RUST': { reactants: { 'Fe': 4, 'O2': 3, 'H2O': 2 }, products: [{ formula: 'Fe2O3·2H2O', count: 2, name_vi: 'Rỉ sắt' }] },
  'R02_FE_RUST': { reactants: { 'Fe': 4, 'O2': 3, 'H2O': 2 }, products: [{ formula: 'Fe2O3·2H2O', count: 2, name_vi: 'Rỉ sắt' }] },
  'R03_FE_CL2': { reactants: { 'Fe': 2, 'Cl2': 3 }, products: [{ formula: 'FeCl3', count: 2, name_vi: 'Sắt(III) clorua' }] },
  'R04_HCL_NAOH': { reactants: { 'HCl': 1, 'NaOH': 1 }, products: [{ formula: 'NaCl', count: 1, name_vi: 'Muối ăn' }, { formula: 'H2O', count: 1, name_vi: 'Nước' }] },
  'R04_ZN_CU': { reactants: { 'Zn': 1, 'CuSO4': 1 }, products: [{ formula: 'ZnSO4', count: 1, name_vi: 'Kẽm sunfat' }, { formula: 'Cu', count: 1, name_vi: 'Đồng đỏ' }] },
  'R04_AGCL': { reactants: { 'AgNO3': 1, 'NaCl': 1 }, products: [{ formula: 'AgCl', count: 1, name_vi: 'Bạc clorua kết tủa' }, { formula: 'NaNO3', count: 1, name_vi: 'Natri nitrat' }] },
  'R04_BASO4': { reactants: { 'BaCl2': 1, 'Na2SO4': 1 }, products: [{ formula: 'BaSO4', count: 1, name_vi: 'Bari sunfat kết tủa' }, { formula: 'NaCl', count: 2, name_vi: 'Muối ăn' }] },
  'R_CUSO4_NAOH': { reactants: { 'CuSO4': 1, 'NaOH': 2 }, products: [{ formula: 'Cu(OH)2', count: 1, name_vi: 'Đồng(II) hidroxit kết tủa lam' }, { formula: 'Na2SO4', count: 1, name_vi: 'Natri sunfat' }] },
  'R_FECL3_NAOH': { reactants: { 'FeCl3': 1, 'NaOH': 3 }, products: [{ formula: 'Fe(OH)3', count: 1, name_vi: 'Sắt(III) hidroxit kết tủa nâu đỏ' }, { formula: 'NaCl', count: 3, name_vi: 'Natri clorua' }] },
  'R_PB_PRECIPITATE': { reactants: { 'Pb(NO3)2': 1, 'Na2S': 1 }, products: [{ formula: 'PbS', count: 1, name_vi: 'Chì(II) sunfua kết tủa đen' }, { formula: 'NaNO3', count: 2, name_vi: 'Natri nitrat' }] },
  'R05_AL_BASE': { reactants: { 'Al': 2, 'NaOH': 2, 'H2O': 6 }, products: [{ formula: 'Na[Al(OH)4]', count: 2, name_vi: 'Natri aluminat' }, { formula: 'H2', count: 3, name_vi: 'Khí Hydro' }] },
  'R_HABER_SYNTHESIS': { reactants: { 'N2': 1, 'H2': 3 }, products: [{ formula: 'NH3', count: 2, name_vi: 'Khí Amoniac' }] },
  'RX_EXP_023': { reactants: { 'N2': 1, 'H2': 3 }, products: [{ formula: 'NH3', count: 2, name_vi: 'Khí Amoniac' }] },
  'R_H2_O2_WATER': { reactants: { 'H2': 2, 'O2': 1 }, products: [{ formula: 'H2O', count: 2, name_vi: 'Nước lỏng' }] },
  'RX_EXP_009': { reactants: { 'H2': 2, 'O2': 1 }, products: [{ formula: 'H2O', count: 2, name_vi: 'Nước lỏng' }] },
  'R_THERMITE': { reactants: { 'Al': 2, 'Fe2O3': 1 }, products: [{ formula: 'Al2O3', count: 1, name_vi: 'Nhôm oxit' }, { formula: 'Fe', count: 2, name_vi: 'Sắt nóng chảy' }] },
  'RX_SYS_113': { reactants: { 'Al': 2, 'Fe2O3': 1 }, products: [{ formula: 'Al2O3', count: 1, name_vi: 'Nhôm oxit' }, { formula: 'Fe', count: 2, name_vi: 'Sắt nóng chảy' }] },
  'R_SULFUR_COMBUSTION': { reactants: { 'S': 1, 'O2': 1 }, products: [{ formula: 'SO2', count: 1, name_vi: 'Lưu huỳnh đioxit' }] },
  'R_CONTACT_SO3': { reactants: { 'SO2': 2, 'O2': 1 }, products: [{ formula: 'SO3', count: 2, name_vi: 'Lưu huỳnh trioxit' }] },
  'R_H2SO4_SYNTHESIS': { reactants: { 'SO3': 1, 'H2O': 1 }, products: [{ formula: 'H2SO4', count: 1, name_vi: 'Axit Sunfuric' }] },
  'R_NH4CL_SMOKE': { reactants: { 'NH3': 1, 'HCl': 1 }, products: [{ formula: 'NH4Cl', count: 1, name_vi: 'Khói trắng Amoni clorua' }] },
  'R_CHARRING_SUGAR': { reactants: { 'C12H22O11': 1, 'H2SO4': 1 }, products: [{ formula: 'C', count: 12, name_vi: 'Than carbon đen xốp' }, { formula: 'H2O', count: 11, name_vi: 'Hơi nước' }] },
  'RX_ORG_001': { reactants: { 'CH3COOH': 1, 'C2H5OH': 1 }, products: [{ formula: 'CH3COOC2H5', count: 1, name_vi: 'Etyl axetat' }, { formula: 'H2O', count: 1, name_vi: 'Nước' }] },
  'RX_ORG_002': { reactants: { 'CH3COOC2H5': 1, 'NaOH': 1 }, products: [{ formula: 'CH3COONa', count: 1, name_vi: 'Natri axetat' }, { formula: 'C2H5OH', count: 1, name_vi: 'Rượu etylic' }] },
  'RX_ORG_003': { reactants: { '(C17H35COO)3C3H5': 1, 'NaOH': 3 }, products: [{ formula: 'C17H35COONa', count: 3, name_vi: 'Xà phòng Natri stearat' }, { formula: 'C3H5(OH)3', count: 1, name_vi: 'Glixerol' }] },
  'RX_ORG_004': { reactants: { 'C6H12O6': 1 }, products: [{ formula: 'C2H5OH', count: 2, name_vi: 'Rượu etylic' }, { formula: 'CO2', count: 2, name_vi: 'Khí Carbonic' }] },
  'RX_ORG_005': { reactants: { 'C2H5OH': 1 }, products: [{ formula: 'C2H4', count: 1, name_vi: 'Khí Etilen' }, { formula: 'H2O', count: 1, name_vi: 'Hơi nước' }] },
  'RX_ORG_006': { reactants: { 'C6H12O6': 1, 'AgNO3': 2, 'NH3': 3, 'H2O': 1 }, products: [{ formula: 'Ag', count: 2, name_vi: 'Bạc kết tủa tráng gương' }, { formula: 'C6H15NO7', count: 1, name_vi: 'Amoni gluconat' }, { formula: 'NH4NO3', count: 2, name_vi: 'Amoni nitrat' }] }
};

// Module-level Helper to parse balanced equation into reactants and products dynamically
export function parseChemicalEquation(eqStr?: string): ReactionRecipe | null {
  if (!eqStr) return null;
  // Support standard ascii, unicode reaction arrows and equilibrium symbols: ->, →, ⟶, =>, ⇌, <=>, <->
  const arrowRegex = /->|→|⟶|=>|⇌|<=>|<->/;
  if (!arrowRegex.test(eqStr)) return null;

  const parts = eqStr.split(arrowRegex);
  if (parts.length < 2) return null;
  const left = parts[0];
  const right = parts[1];
  if (!left || !right) return null;

  const reactants: Record<string, number> = {};
  for (const term of left.split('+')) {
    const clean = term.trim().replace(/\(s\)|\(l\)|\(g\)|\(aq\)/g, '');
    const match = clean.match(/^(\d*)([A-Za-z0-9·\(\)\[\]]+)$/);
    if (match) {
      const count = match[1] ? parseInt(match[1], 10) : 1;
      const formula = normalizeFormulaKey(match[2]);
      reactants[formula] = (reactants[formula] || 0) + count;
    }
  }

  const products: StoichiometricYieldProduct[] = [];
  for (const term of right.split('+')) {
    const clean = term.trim().replace(/\(s\)|\(l\)|\(g\)|\(aq\)/g, '');
    const match = clean.match(/^(\d*)([A-Za-z0-9·\(\)\[\]]+)$/);
    if (match) {
      const count = match[1] ? parseInt(match[1], 10) : 1;
      const formula = normalizeFormulaKey(match[2]);
      products.push({ formula, count, name_vi: formula });
    }
  }

  return Object.keys(reactants).length > 0 ? { reactants, products } : null;
}

export class ReactionEngine {
  private rules: ReactionDetail[];
  private recipeCache: Map<string, ReactionRecipe> = new Map();

  constructor() {
    this.rules = REACTION_RULES_DATABASE;
    // Pre-parse and warm up O(1) stoichiometric recipe cache for all rules
    for (const rule of this.rules) {
      const parsed = parseChemicalEquation(rule.balancedEquationPlain || rule.equation);
      const recipe = parsed || STOICHIOMETRIC_RECIPES[rule.code] || {
        reactants: rule.reactants.reduce((acc, r) => {
          acc[normalizeFormulaKey(r)] = 1;
          return acc;
        }, {} as Record<string, number>),
        products: [{ formula: rule.reactants.join(''), count: 1, name_vi: rule.name_vi }]
      };
      recipe.reactantEntries = Object.entries(recipe.reactants);
      this.recipeCache.set(rule.code, recipe);
    }
  }

  /**
   * Evaluates the current board state (active element symbols + active environmental conditions).
   */
  public evaluateCombination(
    elementSymbols: string[],
    activeConditions: EnvironmentalCondition[]
  ): ReactionEvaluationResult {
    const symbolSet = new Set(elementSymbols);
    const conditionSet = new Set(activeConditions);

    // 1. Check for specific Cognitive Traps first (Priority over accidental partial matches)
    for (const rule of this.rules) {
      if (!rule.isTrap) continue;

      const hasAllReactants = rule.reactants.every(r => symbolSet.has(r));
      const hasAllConditions = rule.requiredConditions.every(c => conditionSet.has(c));

      if (hasAllReactants && hasAllConditions) {
        return {
          engineState: 'NO_REACTION_IN_MODEL',
          status: 'TRAP_TRIGGERED',
          matchedRule: rule,
          equation: rule.equation,
          pedagogicalMessage: `[BẪY NHẬN THỨC] ${rule.pedagogicalExplanation}`,
          observablePhenomenaVI: rule.observablePhenomenaVI,
          chemicalLayers: rule.chemicalExplanationLayers,
          errorLog: {
            symbolOrPair: rule.reactants.join(' + ') + (rule.requiredConditions.length ? ` (${rule.requiredConditions.join(', ')})` : ''),
            level: 3, // Level 3: Vận dụng sai bản chất dãy hoạt động
            message: rule.pedagogicalExplanation
          },
          manaPenaltyPercent: 50
        };
      }
    }

    // 2. Check for Neutralization (Acid + Base without elements)
    if (conditionSet.has('ACID_DILUTE') && conditionSet.has('BASE_ALKALINE')) {
      const neutRule = this.rules.find(r => r.code === 'R03_NEUTRALIZE' || r.code === 'R04_HCL_NAOH');
      if (neutRule) {
        return {
          engineState: 'REACTION_OCCURRED',
          status: 'SUCCESS',
          matchedRule: neutRule,
          equation: neutRule.equation,
          netIonicEquation: neutRule.ionicEquation,
          pedagogicalMessage: `[PHẢN ỨNG THÀNH CÔNG] ${neutRule.name_vi}: ${neutRule.pedagogicalExplanation}`,
          observablePhenomenaVI: neutRule.observablePhenomenaVI,
          chemicalLayers: neutRule.chemicalExplanationLayers,
          manaPenaltyPercent: 0
        };
      }
    }

    // 3. Check for Valid Reactions (Prioritize specific multi-reactant combinations over single-reactant fallbacks)
    const validCandidates = this.rules.filter(rule => {
      if (rule.isTrap) return false;
      if (rule.code === 'R03_NEUTRALIZE' || rule.code === 'R04_HCL_NAOH') return false;
      return rule.reactants.length > 0 && rule.reactants.every(r => symbolSet.has(r));
    });

    // Sort descending by reactant count so 2-element combos match before 1-element fallbacks
    validCandidates.sort((a, b) => b.reactants.length - a.reactants.length);

    for (const rule of validCandidates) {
      // Check forbidden conditions (e.g. Iron Rusting forbidden under HIGH_TEMP which makes it Fe3O4 instead)
      if (rule.forbiddenConditions && rule.forbiddenConditions.some(c => conditionSet.has(c))) {
        continue;
      }

      const hasAllConditions = rule.requiredConditions.every(c => conditionSet.has(c));
      if (hasAllConditions) {
        return {
          engineState: 'REACTION_OCCURRED',
          status: 'SUCCESS',
          matchedRule: rule,
          equation: rule.equation,
          netIonicEquation: rule.ionicEquation,
          pedagogicalMessage: `[PHẢN ỨNG THÀNH CÔNG] ${rule.name_vi}! ${rule.pedagogicalExplanation}`,
          observablePhenomenaVI: rule.observablePhenomenaVI,
          chemicalLayers: rule.chemicalExplanationLayers,
          manaPenaltyPercent: 0
        };
      }
    }

    // 4. Check for Missing Conditions on known reactants (e.g. Fe + O2 without H2O or without t°)
    const missingCandidates = this.rules.filter(rule => {
      if (rule.isTrap) return false;
      return rule.reactants.length > 0 && rule.reactants.every(r => symbolSet.has(r));
    });
    missingCandidates.sort((a, b) => b.reactants.length - a.reactants.length);

    for (const rule of missingCandidates) {
      const missingConditions = rule.requiredConditions.filter(c => !conditionSet.has(c));
      const conditionLabels = missingConditions.map(c => {
        switch (c) {
          case 'MOISTURE_H2O': return 'Nước / Độ ẩm (H₂O)';
          case 'HIGH_TEMP': return 'Nhiệt độ cao (t°)';
          case 'ACID_DILUTE': return 'Dung dịch Acid loãng';
          case 'BASE_ALKALINE': return 'Dung dịch Kiềm';
          case 'OXYGEN_GAS': return 'Khí Oxygen (O₂)';
          default: return c;
        }
      });

      return {
        engineState: 'MISSING_CONDITION',
        status: 'MISSING_CONDITIONS',
        matchedRule: rule,
        pedagogicalMessage: `[THIẾU ĐIỀU KIỆN PHẢN ỨNG] Tổ hợp ${rule.reactants.join(' + ')} chưa thể xảy ra! Bạn còn thiếu tác nhân: ${conditionLabels.join(' hoặc ')}.`,
        observablePhenomenaVI: 'Các chất tham gia chưa đủ năng lượng hoạt hóa hoặc thiếu môi trường dung môi để bẻ gãy liên kết hóa học.',
        errorLog: {
          symbolOrPair: rule.reactants.join(' + '),
          level: 2, // Level 2: Thông hiểu điều kiện môi trường
          message: `Thiếu điều kiện: ${conditionLabels.join(', ')}`
        },
        manaPenaltyPercent: 25
      };
    }

    // 5. Check if species are completely unsupported or invalid
    if (elementSymbols.length === 0 && activeConditions.length > 0) {
      return {
        engineState: 'MISSING_REACTANT',
        status: 'MISSING_CONDITIONS',
        pedagogicalMessage: `Bạn đã kích hoạt tác nhân môi trường nhưng chưa đưa bất kỳ nguyên tố kim loại hay phi kim nào vào sàn đấu!`,
        manaPenaltyPercent: 20
      };
    }

    // 6. No supported reaction in current GDPT 2018 scope
    return {
      engineState: 'NO_REACTION_IN_MODEL',
      status: 'NO_REACTION',
      pedagogicalMessage: `Tổ hợp các chất hiện tại không tạo phản ứng trong điều kiện này (hoặc nằm ngoài phạm vi mô hình GDPT 2018). Hãy kiểm tra lại dãy hoạt động hóa học và điều kiện môi trường!`,
      errorLog: {
        symbolOrPair: elementSymbols.join(' + '),
        level: 1, // Level 1: Nhận biết
        message: 'Tổ hợp không phản ứng trong cơ sở dữ liệu GDPT 2018.'
      },
      manaPenaltyPercent: 50
    };
  }

  /**
   * Evaluates player's Molecular Inventory (molecule unit counts)
   * Stoichiometric calculation without requiring player to manually type coefficients!
   */
  public evaluateMolecularInventory(
    inventory: MolecularInventory,
    activeConditions: EnvironmentalCondition[] = []
  ): MolecularReactionMatch[] {
    const conditionSet = new Set(activeConditions);
    const results: MolecularReactionMatch[] = [];

    const normInv: MolecularInventory = {};
    for (const [k, v] of Object.entries(inventory)) {
      if (v > 0) {
        const nk = normalizeFormulaKey(k);
        normInv[nk] = (normInv[nk] || 0) + v;
      }
    }

    // Implicit condition fulfillment from physical molecules in inventory
    if (normInv['O2'] && normInv['O2'] > 0) conditionSet.add('OXYGEN_GAS');
    if (normInv['H2O'] && normInv['H2O'] > 0) conditionSet.add('MOISTURE_H2O');
    if ((normInv['HCl'] && normInv['HCl'] > 0) || (normInv['H2SO4'] && normInv['H2SO4'] > 0)) conditionSet.add('ACID_DILUTE');
    if ((normInv['NaOH'] && normInv['NaOH'] > 0) || (normInv['KOH'] && normInv['KOH'] > 0)) conditionSet.add('BASE_ALKALINE');

    for (const rule of this.rules) {
      const recipe = this.recipeCache.get(rule.code);
      if (!recipe) continue;

      const reactantEntries = recipe.reactantEntries || Object.entries(recipe.reactants);
      if (reactantEntries.length === 0) continue;

      // Check available units
      let hasAnyReactant = false;
      const missingReactants: { formula: string; needed: number; available: number }[] = [];
      let minRatio = Infinity;
      let limitingReactant: string | undefined = undefined;

      for (let i = 0; i < reactantEntries.length; i++) {
        const [rFormula, reqCount] = reactantEntries[i];
        // Look up in normInv, check alternatives (e.g. H2 vs H)
        let avail = normInv[rFormula] || 0;
        if (avail === 0 && rFormula === 'H2' && normInv['H']) avail = Math.floor(normInv['H'] / 2);
        if (avail === 0 && rFormula === 'O2' && normInv['O']) avail = Math.floor(normInv['O'] / 2);
        if (avail === 0 && rFormula === 'Cl2' && normInv['Cl']) avail = Math.floor(normInv['Cl'] / 2);

        if (avail > 0) hasAnyReactant = true;

        const ratio = Math.floor(avail / reqCount);
        if (ratio < minRatio) {
          minRatio = ratio;
          limitingReactant = rFormula;
        }

        if (avail < reqCount) {
          missingReactants.push({
            formula: rFormula,
            needed: reqCount,
            available: avail
          });
        }
      }

      // If user has none of the reactants for this rule, skip
      if (!hasAnyReactant) continue;

      const reqConds = rule.requiredConditions;
      let hasAllConditions = true;
      const missingConditions: string[] = [];
      for (let i = 0; i < reqConds.length; i++) {
        const c = reqConds[i];
        if (!conditionSet.has(c)) {
          hasAllConditions = false;
          missingConditions.push(c);
        }
      }
      const isExecutable = minRatio >= 1 && hasAllConditions && !rule.isTrap;

      // Calculate consumed & remaining if executed
      const maxYieldUnits = isExecutable ? minRatio : 0;
      const consumedInventory: MolecularInventory = {};
      const remainingInventory: MolecularInventory = { ...normInv };
      const producedProducts: StoichiometricYieldProduct[] = [];

      if (maxYieldUnits >= 1) {
        for (const [rFormula, reqCount] of reactantEntries) {
          const used = reqCount * maxYieldUnits;
          consumedInventory[rFormula] = used;
          remainingInventory[rFormula] = Math.max(0, (remainingInventory[rFormula] || 0) - used);
        }
        for (const p of recipe.products) {
          producedProducts.push({
            formula: p.formula,
            count: p.count * maxYieldUnits,
            name_vi: p.name_vi
          });
        }
      }

      let diagnosticMessage = '';
      if (rule.isTrap) {
        diagnosticMessage = `[BẪY NHẬN THỨC] ${rule.pedagogicalExplanation}`;
      } else if (isExecutable) {
        const prodText = producedProducts.map(p => `${p.count} ${p.formula} (${p.name_vi})`).join(', ');
        diagnosticMessage = `Đủ điều kiện phản ứng! Tạo thành ${prodText}.`;
      } else if (missingReactants.length > 0) {
        const missText = missingReactants.map(m => `${m.formula} (Có ${m.available}/${m.needed})`).join(', ');
        diagnosticMessage = `Chưa đủ lượng chất: Thiếu ${missText}.`;
      } else if (missingConditions.length > 0) {
        diagnosticMessage = `Đã đủ số lượng chất nhưng thiếu điều kiện môi trường: ${missingConditions.join(', ')}.`;
      }

      results.push({
        ruleCode: rule.code,
        reactionName: rule.name_vi,
        equation: rule.equation,
        isExecutable,
        isTrap: !!rule.isTrap,
        basePower: rule.basePower || 0,
        maxYieldUnits,
        limitingReactant,
        consumedInventory,
        remainingInventory,
        producedProducts,
        missingReactants,
        missingConditions,
        diagnosticMessage,
        observablePhenomenaVI: rule.observablePhenomenaVI
      });
    }

    // Sort: Executable first, then fewest missing reactants
    return results.sort((a, b) => {
      if (a.isExecutable && !b.isExecutable) return -1;
      if (!a.isExecutable && b.isExecutable) return 1;
      return a.missingReactants.length - b.missingReactants.length;
    });
  }

  /**
   * Evaluates sequential multi-reaction cascades across molecular inventory.
   * Products from earlier steps seamlessly become reactants for subsequent reactions!
   * Example: 2Na + 2H2O -> 2NaOH + H2, followed by NaOH + HCl -> NaCl + H2O.
   */
  public evaluateReactionCascade(
    initialInventory: MolecularInventory,
    activeConditions: EnvironmentalCondition[] = [],
    maxSteps: number = 8
  ): ReactionCascadeResult {
    let currentInventory: MolecularInventory = {};
    for (const [k, v] of Object.entries(initialInventory)) {
      if (v > 0) currentInventory[k] = v;
    }

    const steps: ReactionCascadeStep[] = [];
    const triggeredRuleCodes = new Set<string>();
    let hasTrapsEncountered = false;
    let trapDetails: { ruleCode: string; reactionName: string; message: string } | undefined = undefined;
    const netProducedMap: Record<string, { count: number; name_vi: string }> = {};

    for (let step = 0; step < maxSteps; step++) {
      const matches = this.evaluateMolecularInventory(currentInventory, activeConditions);

      // Check for cognitive traps first (all reactants and required conditions present)
      const trap = matches.find(m => m.isTrap && m.missingReactants.length === 0 && m.missingConditions.length === 0);
      if (trap) {
        hasTrapsEncountered = true;
        trapDetails = {
          ruleCode: trap.ruleCode,
          reactionName: trap.reactionName,
          message: trap.diagnosticMessage
        };
        break;
      }

      // Find executable reactions that produce products
      // Prioritize:
      // 1. Un-triggered rules in this cascade (prevent infinite cycles)
      // 2. Highest basePower (thermodynamically dominant reaction when competing for reactants)
      // 3. Higher reactant complexity (multi-reactant compound transformations)
      const candidates = matches.filter(m => m.isExecutable && m.maxYieldUnits >= 1);
      if (candidates.length === 0) break;

      candidates.sort((a, b) => {
        const aTriggered = triggeredRuleCodes.has(a.ruleCode) ? 1 : 0;
        const bTriggered = triggeredRuleCodes.has(b.ruleCode) ? 1 : 0;
        if (aTriggered !== bTriggered) return aTriggered - bTriggered; // un-triggered first

        const powerA = a.basePower || 0;
        const powerB = b.basePower || 0;
        if (powerB !== powerA) return powerB - powerA; // highest thermodynamic power first

        const reactantCountA = Object.keys(a.consumedInventory).length;
        const reactantCountB = Object.keys(b.consumedInventory).length;
        return reactantCountB - reactantCountA;
      });

      const reaction = candidates[0];
      if (!reaction || reaction.maxYieldUnits < 1) break;

      triggeredRuleCodes.add(reaction.ruleCode);
      const inventoryBefore = { ...currentInventory };
      const inventoryAfter = { ...reaction.remainingInventory };

      // Add produced products to inventory for next step
      for (const prod of reaction.producedProducts) {
        inventoryAfter[prod.formula] = (inventoryAfter[prod.formula] || 0) + prod.count;
        if (!netProducedMap[prod.formula]) {
          netProducedMap[prod.formula] = { count: 0, name_vi: prod.name_vi };
        }
        netProducedMap[prod.formula].count += prod.count;
      }

      const ruleDetail = this.rules.find(r => r.code === reaction.ruleCode);
      const isExothermic = ruleDetail?.thermodynamics === 'EXOTHERMIC';
      const prodText = reaction.producedProducts.map(p => `${p.count} ${p.formula}`).join(' + ');

      steps.push({
        stepIndex: step + 1,
        reaction,
        inventoryBefore,
        inventoryAfter,
        consumedDelta: { ...reaction.consumedInventory },
        producedDelta: [...reaction.producedProducts],
        conditionsApplied: [...activeConditions],
        isExothermic,
        pedagogicalSummaryVI: `Bước ${step + 1}: ${reaction.reactionName} (${reaction.equation}) -> Tạo ${prodText}`
      });

      currentInventory = inventoryAfter;
    }

    const netProductsProduced: StoichiometricYieldProduct[] = Object.entries(netProducedMap).map(([formula, data]) => ({
      formula,
      count: data.count,
      name_vi: data.name_vi
    }));

    const summaryVI = steps.length === 0
      ? 'Không có chuỗi phản ứng dây chuyền nào xảy ra với lượng chất hiện tại.'
      : `Chuỗi phản ứng liên hoàn gồm ${steps.length} bước thành công.`;

    return {
      steps,
      finalInventory: currentInventory,
      totalReactionsTriggered: steps.length,
      hasTrapsEncountered,
      trapDetails,
      summaryVI,
      netProductsProduced
    };
  }
}

export const defaultReactionEngine = new ReactionEngine();
