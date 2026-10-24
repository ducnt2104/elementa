// src/domain/equationBalancer.ts
// Scientific Chemical Formula Parser & Equation Conservation Checker for ELEMENTA

export interface ParsedTerm {
  coefficient: number;
  formula: string;
  charge: number;
  atomCounts: Record<string, number>;
}

export interface EquationBalanceResult {
  isBalanced: boolean;
  atomsBalanced: boolean;
  chargeBalanced: boolean;
  atomDiscrepancies: Record<string, { left: number; right: number }>;
  chargeDiscrepancy: { left: number; right: number };
}

/**
 * Converts numbers into Unicode subscript numbers (e.g. 2 -> ₂)
 */
export function toSubscriptUnicode(numStr: string | number): string {
  const map: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    'x': 'ₓ', 'n': 'ₙ'
  };
  return String(numStr).split('').map(ch => map[ch] || ch).join('');
}

/**
 * Converts charges into Unicode superscript (e.g. 2+ -> ²⁺, - -> ⁻)
 */
export function toSuperscriptUnicode(chargeStr: string | number): string {
  const map: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '+': '⁺', '-': '⁻'
  };
  return String(chargeStr).split('').map(ch => map[ch] || ch).join('');
}

/**
 * Formats plain text chemical equation into typographic scientific notation
 * e.g. "4Fe + 3O2 + 2xH2O -> 2Fe2O3*xH2O" => "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O"
 */
export function formatChemicalEquation(rawEq: string): string {
  let res = rawEq
    .replace(/->/g, ' → ')
    .replace(/<->|⇌/g, ' ⇌ ')
    .replace(/\*/g, '·')
    .replace(/\(t\^\circ\)|\(t\*\)/g, '(t°)')
    .replace(/\^([0-9+-]+)/g, (_, match) => toSuperscriptUnicode(match))
    .replace(/([A-Za-z)\]])([0-9]+)/g, (_, prefix, num) => prefix + toSubscriptUnicode(num))
    .replace(/\(s\)/g, '(s)')
    .replace(/\(l\)/g, '(l)')
    .replace(/\(g\)/g, '(g)')
    .replace(/\(aq\)/g, '(aq)');
  return res.replace(/\s+/g, ' ').trim();
}

// Homoglyph conversion map: Cyrillic lookalikes to Latin standard ASCII
const CYRILLIC_HOMOGLYPH_MAP: Record<string, string> = {
  'А': 'A', 'В': 'B', 'С': 'C', 'Е': 'E', 'Н': 'H', 'К': 'K', 'M': 'M', 'О': 'O', 'Р': 'P', 'Т': 'T', 'Х': 'X',
  'а': 'a', 'с': 'c', 'е': 'e', 'о': 'o', 'р': 'p', 'х': 'x'
};

/**
 * Normalizes Unicode subscripts, superscripts, homoglyphs, and brackets to standard ASCII notation
 */
export function normalizeChemicalFormula(str: string): string {
  if (!str) return '';
  const subMap: Record<string, string> = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
    'ₓ': 'x', 'ₙ': 'n'
  };
  const superMap: Record<string, string> = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
    '⁺': '+', '⁻': '-'
  };

  // Strip zero-width characters and convert non-breaking space
  let res = str
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/[АВСЕНКMОРТХасеорх]/g, ch => CYRILLIC_HOMOGLYPH_MAP[ch] || ch);

  // Convert subscripts
  res = res.replace(/[₀₁₂₃₄₅₆₇₈₉ₓₙ]/g, ch => subMap[ch] || ch);

  // Convert superscripts with caret prefix to distinguish from subscripts
  res = res.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, match => {
    return '^' + match.split('').map(c => superMap[c] || c).join('');
  });

  return res.replace(/[{}]/g, '').trim();
}

/**
 * Parses formula string (handles parentheses, e.g. "Ca(OH)2", "Al2(SO4)3", "[Al(OH)4]-", "CuSO4·5H2O")
 * into atomic counts.
 */
export function parseFormulaAtoms(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};
  
  // Normalize Unicode subscripts & superscripts
  let clean = normalizeChemicalFormula(formula);

  // Support ASCII period as hydrate adduct separator when followed by numbers/species e.g. "CuSO4.5H2O", "FeSO4.7H2O"
  clean = clean.replace(/\.([0-9]*[A-Za-z])/g, (_, g1) => '·' + g1);

  // Check for hydrate / adduct notation like "CuSO4·5H2O", "Fe2O3*xH2O"
  if (clean.includes('·') || clean.includes('*')) {
    const parts = clean.split(/[·*]/);
    for (const part of parts) {
      const trimmedPart = part.trim();
      if (!trimmedPart) continue;
      // Skip variable hydrate coefficients like "xH2O" or "nH2O" in fixed atom counting
      if (/^[xn]H2O$/i.test(trimmedPart)) continue;

      const match = trimmedPart.match(/^([0-9]+)\s*(.+)$/);
      if (match) {
        const mult = parseInt(match[1], 10);
        const subCounts = parseFormulaAtoms(match[2]);
        for (const [el, num] of Object.entries(subCounts)) {
          counts[el] = (counts[el] || 0) + num * mult;
        }
      } else {
        const subCounts = parseFormulaAtoms(trimmedPart);
        for (const [el, num] of Object.entries(subCounts)) {
          counts[el] = (counts[el] || 0) + num;
        }
      }
    }
    return counts;
  }

  // Clean off state notations like (s), (l), (aq), (g) and charge indicators
  clean = clean
    .replace(/\((s|l|g|aq)\)/gi, '')
    .replace(/\^[0-9]*[+-]$/, '')
    .replace(/\([0-9]*[+-]\)$/, '');

  // If complex ion ends with bracket + charge e.g. [Fe(CN)6]4- -> [Fe(CN)6]
  clean = clean.replace(/\]([0-9]*[+-])$/, ']');

  // If monoatomic ion e.g. Ca2+ or Fe3+ or Na+ -> Ca, Fe, Na
  const monoCleanMatch = clean.match(/^([A-Z][a-z]?)[0-9]*[+-]$/);
  if (monoCleanMatch) {
    clean = monoCleanMatch[1];
  } else {
    // If multi-digit trailing charge like SO42- -> SO4
    clean = clean.replace(/([0-9])[0-9][+-]$/, '$1');
    // Strip trailing single + or - from polyatomic species e.g. MnO4- -> MnO4, NH4+ -> NH4
    clean = clean.replace(/[+-]$/, '');
  }

  clean = clean
    .replace(/\[/g, '(')
    .replace(/\]/g, ')')
    .trim();

  // Stack-based parser for nested parentheses
  const stack: Record<string, number>[] = [{}];
  let i = 0;

  while (i < clean.length) {
    const char = clean[i];

    if (char === '(') {
      stack.push({});
      i++;
    } else if (char === ')') {
      i++;
      let multStr = '';
      while (i < clean.length && /[0-9]/.test(clean[i])) {
        multStr += clean[i];
        i++;
      }
      const mult = multStr ? parseInt(multStr, 10) : 1;
      const top = stack.pop() || {};
      const current = stack[stack.length - 1];

      for (const [elem, cnt] of Object.entries(top)) {
        current[elem] = (current[elem] || 0) + cnt * mult;
      }
    } else if (/[A-Z]/.test(char)) {
      let elem = char;
      i++;
      if (i < clean.length && /[a-z]/.test(clean[i])) {
        elem += clean[i];
        i++;
      }
      let cntStr = '';
      while (i < clean.length && /[0-9]/.test(clean[i])) {
        cntStr += clean[i];
        i++;
      }
      const cnt = cntStr ? parseInt(cntStr, 10) : 1;
      const current = stack[stack.length - 1];
      current[elem] = (current[elem] || 0) + cnt;
    } else {
      i++;
    }
  }

  const finalCounts = stack[0];
  for (const [el, num] of Object.entries(finalCounts)) {
    counts[el] = (counts[el] || 0) + num;
  }
  return counts;
}

/**
 * Parses charge from ion formula, e.g. "Ba2+" -> +2, "SO4^2-" -> -2, "OH-" -> -1, "H+" -> +1, "Ba²⁺" -> +2, "SO₄²⁻" -> -2
 */
export function parseSpeciesCharge(formula: string): number {
  const normalized = normalizeChemicalFormula(formula).trim();

  // 1. Explicit caret charge like "^2-", "^+", "^3+"
  const caretMatch = normalized.match(/\^([0-9]*)([+-])$/);
  if (caretMatch) {
    const val = caretMatch[1] ? parseInt(caretMatch[1], 10) : 1;
    const sign = caretMatch[2] === '-' ? -1 : 1;
    return val * sign;
  }

  // 2. Parenthesized charge like "(2+)", "(2-)", "(3+)"
  const parenMatch = normalized.match(/\(([0-9]*)([+-])\)$/);
  if (parenMatch) {
    const val = parenMatch[1] ? parseInt(parenMatch[1], 10) : 1;
    const sign = parenMatch[2] === '-' ? -1 : 1;
    return val * sign;
  }

  // 3. Coordination complex closing bracket like "[Fe(CN)6]4-", "[Al(OH)4]-"
  const bracketMatch = normalized.match(/\]([0-9]*)([+-])$/);
  if (bracketMatch) {
    const val = bracketMatch[1] ? parseInt(bracketMatch[1], 10) : 1;
    const sign = bracketMatch[2] === '-' ? -1 : 1;
    return val * sign;
  }

  // 4. Monoatomic ions like "Ca2+", "Al3+", "Fe3+", "Na+", "Cl-"
  const monoMatch = normalized.match(/^([A-Z][a-z]?)([0-9]+)?([+-])$/);
  if (monoMatch) {
    const val = monoMatch[2] ? parseInt(monoMatch[2], 10) : 1;
    const sign = monoMatch[3] === '-' ? -1 : 1;
    return val * sign;
  }

  // 5. Polyatomic ions with multi-digit ending (e.g. "SO42-" -> 4 is subscript, 2 is charge)
  const multiDigitMatch = normalized.match(/([0-9])([0-9])([+-])$/);
  if (multiDigitMatch) {
    const val = parseInt(multiDigitMatch[2], 10);
    const sign = multiDigitMatch[3] === '-' ? -1 : 1;
    return val * sign;
  }

  // 6. Single trailing + or - on polyatomic species (e.g. "MnO4-", "NO3-", "NH4+", "OH-")
  const singleSignMatch = normalized.match(/([+-])$/);
  if (singleSignMatch) {
    return singleSignMatch[1] === '-' ? -1 : 1;
  }

  return 0;
}

/**
 * Checks conservation of atoms and charges for a chemical equation.
 */
export function verifyEquationBalance(
  reactants: { coefficient: number; formula: string; charge?: number }[],
  products: { coefficient: number; formula: string; charge?: number }[]
): EquationBalanceResult {
  const leftAtoms: Record<string, number> = {};
  const rightAtoms: Record<string, number> = {};
  let leftCharge = 0;
  let rightCharge = 0;

  for (const r of reactants) {
    const atoms = parseFormulaAtoms(r.formula);
    for (const [el, num] of Object.entries(atoms)) {
      leftAtoms[el] = (leftAtoms[el] || 0) + num * r.coefficient;
    }
    const charge = r.charge !== undefined ? r.charge : parseSpeciesCharge(r.formula);
    leftCharge += charge * r.coefficient;
  }

  for (const p of products) {
    const atoms = parseFormulaAtoms(p.formula);
    for (const [el, num] of Object.entries(atoms)) {
      rightAtoms[el] = (rightAtoms[el] || 0) + num * p.coefficient;
    }
    const charge = p.charge !== undefined ? p.charge : parseSpeciesCharge(p.formula);
    rightCharge += charge * p.coefficient;
  }

  const allElements = new Set([...Object.keys(leftAtoms), ...Object.keys(rightAtoms)]);
  const atomDiscrepancies: Record<string, { left: number; right: number }> = {};
  let atomsBalanced = true;

  for (const el of allElements) {
    const left = leftAtoms[el] || 0;
    const right = rightAtoms[el] || 0;
    if (left !== right) {
      atomsBalanced = false;
    }
    atomDiscrepancies[el] = { left, right };
  }

  const chargeBalanced = leftCharge === rightCharge;
  const isBalanced = atomsBalanced && chargeBalanced;

  return {
    isBalanced,
    atomsBalanced,
    chargeBalanced,
    atomDiscrepancies,
    chargeDiscrepancy: { left: leftCharge, right: rightCharge }
  };
}

/**
 * Helper: Parses a full equation string like "2Na + 2H2O -> 2NaOH + H2", "N2 + 3H2 ⇌ 2NH3", etc. and verifies balance.
 */
export function parseChemicalEquation(equationStr: string): EquationBalanceResult {
  const normalizedStr = equationStr.replace(/⇌|⇄|<->|<=>/g, '->');
  const parts = normalizedStr.split(/->|→/);
  if (parts.length !== 2) {
    throw new Error('Invalid equation string: missing arrow (-> or ⇌)');
  }

  const parseSide = (sideStr: string) => {
    // Split by '+' only when '+' is a reaction separator, not an ion charge like 'Ba2+', 'Na+'
    return sideStr.trim().split(/\s+\+\s+|(?<=[a-zA-Z0-9\)\]])\+(?=[0-9]*[A-Z\[])/).map(termStr => {
      const trimmed = termStr.trim();
      const match = trimmed.match(/^([0-9]*)\s*(.+)$/);
      const coeff = match && match[1] ? parseInt(match[1], 10) : 1;
      const formula = match && match[2] ? match[2].trim() : trimmed;
      return { coefficient: coeff, formula };
    }).filter(t => t.formula.length > 0);
  };

  const reactants = parseSide(parts[0]);
  const products = parseSide(parts[1]);
  return verifyEquationBalance(reactants, products);
}
