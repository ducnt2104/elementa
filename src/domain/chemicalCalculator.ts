// src/domain/chemicalCalculator.ts
// Comprehensive Chemical Calculator & Stoichiometry Engine for ELEMENTA
// Fully aligned with GDPT 2018 (KHTN 8, KHTN 9, Hóa 10) & IUPAC standards

import { parseFormulaAtoms } from './equationBalancer';
import { ALL_ELEMENTS } from '../data/elementsData';

// Helper: Compute molar mass from formula
export function getMolarMass(formula: string): number {
  const atoms = parseFormulaAtoms(formula);
  let totalMass = 0;

  for (const [symbol, count] of Object.entries(atoms)) {
    const elem = ALL_ELEMENTS.find(e => e.symbol === symbol);
    if (!elem) throw new Error(`Không tìm thấy nguyên tố [${symbol}] trong bảng tuần hoàn.`);
    totalMass += elem.atomic_weight * count;
  }

  return Math.round(totalMass * 1000) / 1000;
}

// 1. Mole & Mass calculations (n = m / M)
export interface MoleCalculationResult {
  moles: number;
  massGrams: number;
  molarMass: number;
  formula: string;
  stepByStepExplanationVI: string[];
}

export function calculateMoles(massGrams: number, formula: string): MoleCalculationResult {
  if (massGrams < 0) throw new Error('Khối lượng không thể là số âm.');
  const M = getMolarMass(formula);
  const n = massGrams / M;

  return {
    moles: Math.round(n * 10000) / 10000,
    massGrams,
    molarMass: M,
    formula,
    stepByStepExplanationVI: [
      `Bước 1: Tính khối lượng mol của ${formula}: M = ${M} g/mol`,
      `Bước 2: Áp dụng công thức n = m / M = ${massGrams} / ${M}`,
      `Bước 3: Số mol chất thu được: n = ${(Math.round(n * 10000) / 10000)} mol`
    ]
  };
}

export function calculateMass(moles: number, formula: string): MoleCalculationResult {
  if (moles < 0) throw new Error('Số mol không thể là số âm.');
  const M = getMolarMass(formula);
  const m = moles * M;

  return {
    moles,
    massGrams: Math.round(m * 1000) / 1000,
    molarMass: M,
    formula,
    stepByStepExplanationVI: [
      `Bước 1: Tính khối lượng mol của ${formula}: M = ${M} g/mol`,
      `Bước 2: Áp dụng công thức m = n × M = ${moles} × ${M}`,
      `Bước 3: Khối lượng chất thu được: m = ${(Math.round(m * 1000) / 1000)} g`
    ]
  };
}

// 2. Gas Volume calculations (V = n * 24.79 in GDPT 2018 vs 22.4 in classical STP)
export type GasStandardCondition = 'STANDARD_2018' | 'CLASSICAL_STP';

export interface GasVolumeResult {
  volumeLiters: number;
  moles: number;
  condition: GasStandardCondition;
  molarVolumeFactor: number;
  stepByStepExplanationVI: string[];
}

export function calculateGasVolume(moles: number, condition: GasStandardCondition = 'STANDARD_2018'): GasVolumeResult {
  if (moles < 0) throw new Error('Số mol khí không thể là số âm.');
  const factor = condition === 'STANDARD_2018' ? 24.79 : 22.4;
  const V = moles * factor;

  const condText = condition === 'STANDARD_2018'
    ? 'Điều kiện chuẩn GDPT 2018 (25°C, 1 bar): 1 mol khí chiếm 24.79 L'
    : 'Điều kiện tiêu chuẩn cổ điển (0°C, 1 atm): 1 mol khí chiếm 22.4 L';

  return {
    volumeLiters: Math.round(V * 1000) / 1000,
    moles,
    condition,
    molarVolumeFactor: factor,
    stepByStepExplanationVI: [
      `Quy chuẩn áp dụng: ${condText}`,
      `Áp dụng công thức: V = n × ${factor}`,
      `Thay số: V = ${moles} × ${factor} = ${(Math.round(V * 1000) / 1000)} L`
    ]
  };
}

export function calculateGasMolesFromVolume(volumeLiters: number, condition: GasStandardCondition = 'STANDARD_2018'): GasVolumeResult {
  if (volumeLiters < 0) throw new Error('Thể tích khí không thể là số âm.');
  const factor = condition === 'STANDARD_2018' ? 24.79 : 22.4;
  const n = volumeLiters / factor;

  return {
    volumeLiters,
    moles: Math.round(n * 10000) / 10000,
    condition,
    molarVolumeFactor: factor,
    stepByStepExplanationVI: [
      `Quy chuẩn: 1 mol khí chiếm ${factor} L`,
      `Áp dụng công thức: n = V / ${factor}`,
      `Thay số: n = ${volumeLiters} / ${factor} = ${(Math.round(n * 10000) / 10000)} mol`
    ]
  };
}

// 3. Solution Concentration (C_M = n / V_dd, C% = m_ct / m_dd * 100%)
export interface MolarityResult {
  molarityCM: number;
  moles: number;
  volumeLiters: number;
  stepByStepExplanationVI: string[];
}

export function calculateMolarity(moles: number, volumeLiters: number): MolarityResult {
  if (volumeLiters <= 0) throw new Error('Thể tích dung dịch phải lớn hơn 0.');
  const CM = moles / volumeLiters;

  return {
    molarityCM: Math.round(CM * 1000) / 1000,
    moles,
    volumeLiters,
    stepByStepExplanationVI: [
      `Áp dụng công thức nồng độ mol: C_M = n / V`,
      `Thay số: C_M = ${moles} mol / ${volumeLiters} L`,
      `Nồng độ mol thu được: C_M = ${(Math.round(CM * 1000) / 1000)} M (mol/L)`
    ]
  };
}

export interface MassPercentageResult {
  percentageC: number;
  soluteMassGrams: number;
  solutionMassGrams: number;
  stepByStepExplanationVI: string[];
}

export function calculateMassPercentage(soluteMassGrams: number, solutionMassGrams: number): MassPercentageResult {
  if (solutionMassGrams <= 0) throw new Error('Khối lượng dung dịch phải lớn hơn 0.');
  if (soluteMassGrams > solutionMassGrams) throw new Error('Khối lượng chất tan không thể lớn hơn khối lượng dung dịch.');
  const Cpct = (soluteMassGrams / solutionMassGrams) * 100;

  return {
    percentageC: Math.round(Cpct * 100) / 100,
    soluteMassGrams,
    solutionMassGrams,
    stepByStepExplanationVI: [
      `Áp dụng công thức nồng độ phần trăm: C% = (m_ct / m_dd) × 100%`,
      `Thay số: C% = (${soluteMassGrams} / ${solutionMassGrams}) × 100%`,
      `Nồng độ phần trăm thu được: C% = ${(Math.round(Cpct * 100) / 100)}%`
    ]
  };
}

// 4. Stoichiometry with Limiting & Excess Reactants
export interface StoichiometryResult {
  limitingReactant: string;
  excessReactant: string | null;
  excessMolesRemaining: number;
  productsFormed: {
    formula: string;
    moles: number;
    massGrams: number;
  }[];
  stepsVI: string[];
}

export interface ReactionParticipantInput {
  formula: string;
  coefficient: number;
  givenMoles: number;
}

export function calculateReactionStoichiometry(
  reactants: ReactionParticipantInput[],
  products: { formula: string; coefficient: number }[]
): StoichiometryResult {
  if (reactants.length === 0) throw new Error('Cần ít nhất một chất tham gia phản ứng.');

  const steps: string[] = [];

  // Compare ratios: givenMoles / coefficient
  let minRatio = Infinity;
  let limitingReactant = reactants[0].formula;

  steps.push('Bước 1: Tính tỷ lệ số mol / hệ số cho từng chất tham gia phản ứng:');
  reactants.forEach(r => {
    const ratio = r.givenMoles / r.coefficient;
    steps.push(`  • ${r.formula}: ${r.givenMoles} mol / ${r.coefficient} = ${Math.round(ratio * 1000) / 1000}`);
    if (ratio < minRatio) {
      minRatio = ratio;
      limitingReactant = r.formula;
    }
  });

  steps.push(`Bước 2: Chất hạn chế (phản ứng hết) là [${limitingReactant}] với tỷ lệ nhỏ nhất ${Math.round(minRatio * 1000) / 1000}. Mọi tính toán sản phẩm dựa theo chất này.`);

  // Excess reactants
  let excessReactant: string | null = null;
  let excessMolesRemaining = 0;

  reactants.forEach(r => {
    if (r.formula !== limitingReactant) {
      const molesConsumed = minRatio * r.coefficient;
      const remaining = r.givenMoles - molesConsumed;
      if (remaining > 0.0001) {
        excessReactant = r.formula;
        excessMolesRemaining = Math.round(remaining * 1000) / 1000;
        steps.push(`  • Chất dư: ${r.formula} phản ứng hết ${Math.round(molesConsumed * 1000) / 1000} mol, còn dư ${excessMolesRemaining} mol.`);
      }
    }
  });

  // Products theoretical yield
  steps.push('Bước 3: Tính toán lượng sản phẩm tạo thành:');
  const productsFormed = products.map(p => {
    const prodMoles = minRatio * p.coefficient;
    const M = getMolarMass(p.formula);
    const mass = prodMoles * M;
    steps.push(`  • Sản phẩm ${p.formula}: n = ${p.coefficient} × ${Math.round(minRatio * 1000) / 1000} = ${Math.round(prodMoles * 1000) / 1000} mol; m = ${Math.round(mass * 100) / 100} g`);
    return {
      formula: p.formula,
      moles: Math.round(prodMoles * 1000) / 1000,
      massGrams: Math.round(mass * 100) / 100
    };
  });

  return {
    limitingReactant,
    excessReactant,
    excessMolesRemaining,
    productsFormed,
    stepsVI: steps
  };
}

// 5. Solution Dilution & Two Solutions Mixing Engine (C1*V1 = C2*V2)
export interface SolutionDilutionResult {
  c1: number;
  v1Liters: number;
  c2: number;
  v2Liters: number;
  waterAddedLiters: number;
  stepByStepExplanationVI: string[];
}

export function calculateSolutionDilution(params: {
  initialConcentration: number;
  initialVolumeLiters: number;
  targetConcentration?: number;
  targetVolumeLiters?: number;
}): SolutionDilutionResult {
  const { initialConcentration: c1, initialVolumeLiters: v1, targetConcentration: c2, targetVolumeLiters: v2 } = params;

  if (c1 <= 0 || v1 <= 0) throw new Error('Nồng độ và thể tích ban đầu phải lớn hơn 0.');

  let finalC2 = c2;
  let finalV2 = v2;

  if (finalC2 !== undefined) {
    if (finalC2 <= 0) throw new Error('Nồng độ mục tiêu phải lớn hơn 0.');
    if (finalC2 > c1) throw new Error('Pha loãng không thể làm nồng độ tăng lên (C2 phải nhỏ hơn C1).');
    finalV2 = Math.round(((c1 * v1) / finalC2) * 1000) / 1000;
  } else if (finalV2 !== undefined) {
    if (finalV2 < v1) throw new Error('Thể tích sau khi pha loãng phải lớn hơn hoặc bằng thể tích ban đầu.');
    finalC2 = Math.round(((c1 * v1) / finalV2) * 1000) / 1000;
  } else {
    throw new Error('Cần cung cấp ít nhất nồng độ mục tiêu (C2) hoặc thể tích mục tiêu (V2).');
  }

  const waterAdded = Math.round((finalV2! - v1) * 1000) / 1000;

  return {
    c1,
    v1Liters: v1,
    c2: finalC2!,
    v2Liters: finalV2!,
    waterAddedLiters: waterAdded,
    stepByStepExplanationVI: [
      `Bước 1: Áp dụng định luật bảo toàn lượng chất tan khi pha loãng: n = C₁ × V₁ = C₂ × V₂`,
      `Bước 2: Số mol chất tan ban đầu: n = ${c1} × ${v1} = ${Math.round(c1 * v1 * 1000) / 1000} mol`,
      `Bước 3: Nồng độ sau pha loãng: C₂ = ${finalC2} M, Thể tích dung dịch sau: V₂ = ${finalV2} L`,
      `Bước 4: Lượng nước cất cần thêm vào: ΔV = V₂ - V₁ = ${finalV2} - ${v1} = ${waterAdded} L`
    ]
  };
}

export interface TwoSolutionsMixingResult {
  resultConcentration: number;
  totalVolumeOrMass: number;
  mode: 'MOLARITY' | 'MASS_PERCENT';
  stepByStepExplanationVI: string[];
}

export function calculateTwoSolutionsMixing(params: {
  c1: number;
  amount1: number; // Volume (L) if MOLARITY, Mass (g) if MASS_PERCENT
  c2: number;
  amount2: number;
  mode: 'MOLARITY' | 'MASS_PERCENT';
}): TwoSolutionsMixingResult {
  const { c1, amount1, c2, amount2, mode } = params;

  if (amount1 <= 0 || amount2 <= 0) throw new Error('Lượng dung dịch 1 và dung dịch 2 phải lớn hơn 0.');
  if (c1 < 0 || c2 < 0) throw new Error('Nồng độ không thể âm.');

  const totalAmount = Math.round((amount1 + amount2) * 1000) / 1000;
  const totalSolute = (c1 * amount1) + (c2 * amount2);
  const resultConc = Math.round((totalSolute / totalAmount) * 1000) / 1000;

  const unit = mode === 'MOLARITY' ? 'M' : '%';
  const amountUnit = mode === 'MOLARITY' ? 'L' : 'g';

  return {
    resultConcentration: resultConc,
    totalVolumeOrMass: totalAmount,
    mode,
    stepByStepExplanationVI: [
      `Bước 1: Tính tổng lượng chất tan: (${c1} × ${amount1}) + (${c2} × ${amount2}) = ${Math.round(totalSolute * 1000) / 1000}`,
      `Bước 2: Tính tổng ${mode === 'MOLARITY' ? 'thể tích' : 'khối lượng'} dung dịch: ${amount1} + ${amount2} = ${totalAmount} ${amountUnit}`,
      `Bước 3: Nồng độ dung dịch hỗn hợp: C_mix = ${resultConc} ${unit}`
    ]
  };
}

// 6. Density to Molarity Conversion Engine: C_M = (10 * C% * d) / M
export interface DensityConcentrationConversionResult {
  formula: string;
  molarMass: number;
  densityGramsPerMl: number;
  massPercentageC: number;
  molarityCM: number;
  stepByStepExplanationVI: string[];
}

export function convertDensityAndConcentration(params: {
  formula: string;
  densityGramsPerMl: number;
  massPercentageC?: number;
  molarityCM?: number;
}): DensityConcentrationConversionResult {
  const { formula, densityGramsPerMl: d, massPercentageC: cPct, molarityCM: cM } = params;

  if (d <= 0) throw new Error('Khối lượng riêng (d) phải lớn hơn 0.');
  const M = getMolarMass(formula);

  let finalCPct = cPct;
  let finalCM = cM;

  if (finalCPct !== undefined) {
    if (finalCPct <= 0 || finalCPct > 100) throw new Error('Nồng độ phần trăm C% phải nằm trong khoảng (0, 100].');
    // C_M = (10 * C% * d) / M
    finalCM = Math.round(((10 * finalCPct * d) / M) * 1000) / 1000;
  } else if (finalCM !== undefined) {
    if (finalCM <= 0) throw new Error('Nồng độ mol C_M phải lớn hơn 0.');
    // C% = (C_M * M) / (10 * d)
    finalCPct = Math.round(((finalCM * M) / (10 * d)) * 100) / 100;
  } else {
    throw new Error('Cần cung cấp ít nhất nồng độ phần trăm C% hoặc nồng độ mol C_M.');
  }

  return {
    formula,
    molarMass: M,
    densityGramsPerMl: d,
    massPercentageC: finalCPct!,
    molarityCM: finalCM!,
    stepByStepExplanationVI: [
      `Bước 1: Tính khối lượng mol của ${formula}: M = ${M} g/mol`,
      `Bước 2: Áp dụng công thức quy đổi kinh điển: C_M = (10 × C% × d) / M  hay  C% = (C_M × M) / (10 × d)`,
      `Bước 3: Kết quả chuyển đổi: C% = ${finalCPct}%  ⇄  C_M = ${finalCM} M (với d = ${d} g/mL)`
    ]
  };
}

// 7. Universal Ideal Gas Law: P * V = n * R * T (R = 0.08206 L*atm / mol*K)
export interface IdealGasResult {
  pressureAtm: number;
  volumeLiters: number;
  moles: number;
  temperatureCelsius: number;
  temperatureKelvin: number;
  gasConstantR: number;
  calculatedVariable: 'P' | 'V' | 'n' | 'T';
  stepByStepExplanationVI: string[];
}

export function calculateIdealGas(params: {
  pressureAtm?: number;
  volumeLiters?: number;
  moles?: number;
  temperatureCelsius?: number;
}): IdealGasResult {
  const R = 0.08206; // L*atm / mol*K
  let { pressureAtm: P, volumeLiters: V, moles: n, temperatureCelsius: tempC } = params;

  let calculatedVariable: 'P' | 'V' | 'n' | 'T';

  if (tempC === undefined) {
    if (P === undefined || V === undefined || n === undefined) {
      throw new Error('Cần ít nhất 3 trong 4 thông số (P, V, n, T) để tính toán phương trình Clapeyron-Mendeleev.');
    }
    const T_calc = (P * V) / (n * R);
    tempC = Math.round((T_calc - 273.15) * 10) / 10;
    calculatedVariable = 'T';
  } else if (P === undefined) {
    if (V === undefined || n === undefined) throw new Error('Thiếu V hoặc n để tính áp suất P.');
    const T_K_temp = tempC + 273.15;
    P = Math.round(((n * R * T_K_temp) / V) * 1000) / 1000;
    calculatedVariable = 'P';
  } else if (V === undefined) {
    if (P === undefined || n === undefined) throw new Error('Thiếu P hoặc n để tính thể tích V.');
    const T_K_temp = tempC + 273.15;
    V = Math.round(((n * R * T_K_temp) / P) * 1000) / 1000;
    calculatedVariable = 'V';
  } else if (n === undefined) {
    const T_K_temp = tempC + 273.15;
    n = Math.round(((P * V) / (R * T_K_temp)) * 10000) / 10000;
    calculatedVariable = 'n';
  } else {
    calculatedVariable = 'P';
  }

  const T_K = Math.round((tempC + 273.15) * 100) / 100;

  return {
    pressureAtm: P,
    volumeLiters: V,
    moles: n,
    temperatureCelsius: tempC,
    temperatureKelvin: T_K,
    gasConstantR: R,
    calculatedVariable,
    stepByStepExplanationVI: [
      `Bước 1: Chuyển đổi nhiệt độ tuyệt đối: T = ${tempC}°C + 273.15 = ${T_K} K`,
      `Bước 2: Áp dụng phương trình trạng thái khí lý tưởng (Clapeyron-Mendeleev): P × V = n × R × T`,
      `Bước 3: Với hằng số khí R = ${R} L·atm/(mol·K):`,
      `  • Áp suất P = ${P} atm; Thể tích V = ${V} L; Số mol n = ${n} mol; Nhiệt độ T = ${tempC}°C (${T_K} K)`
    ]
  };
}

// 8. Acid-Base Titration Curve & Indicator Selector (GDPT 2018 Hóa 11)
export interface TitrationDataPoint {
  volumeBaseAddedMl: number;
  volumeTitrantAddedMl?: number;
  pH: number;
  region: 'INITIAL' | 'BUFFER_OR_PRE_EQ' | 'HALF_EQUIVALENCE' | 'EQUIVALENCE' | 'POST_EQUIVALENCE';
}

export interface IndicatorRecommendation {
  name: string;
  pHRange: string;
  colorChangeVI: string;
  isSuitable: boolean;
  scientificReasonVI: string;
}

export interface TitrationCurveResult {
  acidName: string;
  acidType: 'STRONG' | 'WEAK';
  baseType?: 'STRONG' | 'WEAK';
  titrationMode?: 'ACID_BY_BASE' | 'BASE_BY_ACID';
  pKa?: number;
  pKb?: number;
  baseName: string;
  equivalenceVolumeMl: number;
  equivalencePH: number;
  halfEquivalencePH?: number;
  dataPoints: TitrationDataPoint[];
  curvePoints?: TitrationDataPoint[];
  indicators: IndicatorRecommendation[];
  stepByStepExplanationVI: string[];
}

export function calculateTitrationCurve(params: {
  acidType?: 'STRONG' | 'WEAK';
  baseType?: 'STRONG' | 'WEAK';
  titrationMode?: 'ACID_BY_BASE' | 'BASE_BY_ACID';
  acidMolarity: number;
  acidVolumeMl?: number;
  baseMolarity: number;
  baseVolumeMl?: number;
  pKa?: number; // e.g. 4.76 for CH3COOH
  pKb?: number; // e.g. 4.75 for NH3
}): TitrationCurveResult {
  const titrationMode = params.titrationMode ?? (params.baseType === 'WEAK' ? 'BASE_BY_ACID' : 'ACID_BY_BASE');
  const acidType = params.acidType ?? 'STRONG';
  const baseType = params.baseType ?? 'STRONG';

  const Ca = params.acidMolarity;
  const Va = params.acidVolumeMl ?? params.baseVolumeMl ?? 25.0;
  const Cb = params.baseMolarity;
  const Vb_init = params.baseVolumeMl ?? params.acidVolumeMl ?? 25.0;

  if (Ca <= 0 || Va <= 0 || Cb <= 0 || Vb_init <= 0) {
    throw new Error('Nồng độ và thể tích dung dịch chuẩn độ phải lớn hơn 0.');
  }

  const Kw = 1.0e-14;

  // Dense volume fractions for generating high-definition SVG curves
  const denseFractions = [
    0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85,
    0.9, 0.92, 0.94, 0.96, 0.98, 0.99, 0.995, 1.0, 1.005, 1.01, 1.02, 1.04, 1.06, 1.08, 1.1, 1.15, 1.2, 1.25, 1.30
  ];

  // CASE 1: BASE_BY_ACID (e.g. NH3 or NaOH titrated by HCl)
  if (titrationMode === 'BASE_BY_ACID' || baseType === 'WEAK') {
    const isWeakBase = baseType === 'WEAK';
    const pKb = isWeakBase ? (params.pKb ?? 4.75) : undefined;
    const Kb = pKb !== undefined ? Math.pow(10, -pKb) : undefined;
    const Ka = Kb !== undefined ? Kw / Kb : undefined;

    // Veq of titrant (acid): Veq = (Cb * Vb) / Ca
    const Veq = Math.round(((Cb * Vb_init) / Ca) * 100) / 100;

    const volumeSteps = [
      0,
      Math.round(Veq * 0.25 * 100) / 100,
      Math.round(Veq * 0.5 * 100) / 100, // Half-equivalence
      Math.round(Veq * 0.75 * 100) / 100,
      Math.round(Veq * 0.9 * 100) / 100,
      Math.round(Veq * 0.99 * 100) / 100,
      Veq, // Equivalence point
      Math.round(Veq * 1.01 * 100) / 100,
      Math.round(Veq * 1.1 * 100) / 100,
      Math.round(Veq * 1.25 * 100) / 100
    ];

    const computeBaseByAcidPH = (Va_added: number): { pH: number; region: TitrationDataPoint['region'] } => {
      if (Va_added === 0) {
        if (isWeakBase) {
          const OH_conc = Math.sqrt(Kb! * Cb);
          const pOH = -Math.log10(OH_conc);
          return { pH: Math.round((14.0 - pOH) * 100) / 100, region: 'INITIAL' };
        } else {
          const pOH = -Math.log10(Cb);
          return { pH: Math.round((14.0 - pOH) * 100) / 100, region: 'INITIAL' };
        }
      } else if (Va_added < Veq) {
        const isHalf = Math.abs(Va_added - Veq * 0.5) < 0.05;
        const region: TitrationDataPoint['region'] = isHalf ? 'HALF_EQUIVALENCE' : 'BUFFER_OR_PRE_EQ';
        if (isWeakBase) {
          if (isHalf) {
            const pOH = pKb!;
            return { pH: Math.round((14.0 - pOH) * 100) / 100, region };
          } else {
            const mmol_salt = Ca * Va_added;
            const mmol_base = Cb * Vb_init - Ca * Va_added;
            const ratio = mmol_salt / mmol_base;
            const pOH = pKb! + Math.log10(ratio);
            return { pH: Math.round((14.0 - pOH) * 100) / 100, region };
          }
        } else {
          const mmolOH = Cb * Vb_init - Ca * Va_added;
          const totalV = Vb_init + Va_added;
          const OH_conc = mmolOH / totalV;
          const pOH = -Math.log10(OH_conc);
          return { pH: Math.round((14.0 - pOH) * 100) / 100, region };
        }
      } else if (Math.abs(Va_added - Veq) < 0.001) {
        if (isWeakBase) {
          const totalV = Vb_init + Veq;
          const saltConc = (Cb * Vb_init) / totalV;
          const H_conc = Math.sqrt(Ka! * saltConc);
          return { pH: Math.round(-Math.log10(H_conc) * 100) / 100, region: 'EQUIVALENCE' };
        } else {
          return { pH: 7.00, region: 'EQUIVALENCE' };
        }
      } else {
        const mmolH = Ca * Va_added - Cb * Vb_init;
        const totalV = Vb_init + Va_added;
        const H_conc = mmolH / totalV;
        return { pH: Math.round(-Math.log10(H_conc) * 100) / 100, region: 'POST_EQUIVALENCE' };
      }
    };

    const dataPoints: TitrationDataPoint[] = [];
    let eqPH = isWeakBase ? 5.28 : 7.00;
    let halfEqPH: number | undefined;

    for (const Va_added of volumeSteps) {
      const calc = computeBaseByAcidPH(Va_added);
      if (Math.abs(Va_added - Veq) < 0.001) eqPH = calc.pH;
      if (Math.abs(Va_added - Veq * 0.5) < 0.05 && isWeakBase) halfEqPH = calc.pH;

      dataPoints.push({
        volumeBaseAddedMl: Va_added,
        volumeTitrantAddedMl: Va_added,
        pH: Math.max(0, Math.min(14, calc.pH)),
        region: calc.region
      });
    }

    // Dense curve points for SVG path
    const curvePoints: TitrationDataPoint[] = denseFractions.map(frac => {
      const v = Math.round(Veq * frac * 100) / 100;
      const calc = computeBaseByAcidPH(v);
      return {
        volumeBaseAddedMl: v,
        volumeTitrantAddedMl: v,
        pH: Math.max(0, Math.min(14, calc.pH)),
        region: calc.region
      };
    });

    const indicators: IndicatorRecommendation[] = isWeakBase ? [
      {
        name: 'Methyl Đỏ (Methyl Red)',
        pHRange: '4.4 – 6.2',
        colorChangeVI: 'Đỏ (axit) chuyển sang Vàng (bazơ)',
        isSuitable: true,
        scientificReasonVI: `Rất thích hợp! Điểm tương đương pH = ${eqPH} nằm hoàn hảo bên trong dải đổi màu của Methyl đỏ (4.4 - 6.2) do muối amoni thủy phân tạo môi trường axit.`
      },
      {
        name: 'Methyl Da Cam (Methyl Orange)',
        pHRange: '3.1 – 4.4',
        colorChangeVI: 'Đỏ chuyển sang Vàng da cam',
        isSuitable: true,
        scientificReasonVI: `Chấp nhận được! Bước nhảy pH của chuẩn độ bazơ yếu bằng axit mạnh bao trùm vùng 3.1 - 4.4 gần điểm tương đương.`
      },
      {
        name: 'Bromothymol Xanh (Bromothymol Blue)',
        pHRange: '6.0 – 7.6',
        colorChangeVI: 'Vàng (axit) chuyển sang Xanh lam (bazơ)',
        isSuitable: false,
        scientificReasonVI: `KHÔNG thích hợp! Khoảng đổi màu (6.0 - 7.6) cao hơn điểm tương đương axit (pH = ${eqPH}), chuyển màu quá sớm trước điểm kết thúc chuẩn độ.`
      },
      {
        name: 'Phenolphthalein',
        pHRange: '8.2 – 10.0',
        colorChangeVI: 'Không màu chuyển sang Hồng cánh sen',
        isSuitable: false,
        scientificReasonVI: `HOÀN TOÀN KHÔNG thích hợp! Phenolphthalein mất màu ở pH ~8.2, ngay trong vùng đệm bazơ rất sớm trước khi đạt điểm tương đương (pH = ${eqPH}), gây sai số âm cực lớn.`
      }
    ] : [
      {
        name: 'Phenolphthalein',
        pHRange: '8.2 – 10.0',
        colorChangeVI: 'Hồng cánh sen mất màu thành Không màu',
        isSuitable: true,
        scientificReasonVI: 'Rất thích hợp! Bước nhảy pH của bazơ mạnh - axit mạnh rất rộng (từ pH ~10 xuống ~4), bao trùm dải đổi màu của Phenolphthalein.'
      },
      {
        name: 'Bromothymol Xanh (Bromothymol Blue)',
        pHRange: '6.0 – 7.6',
        colorChangeVI: 'Xanh lam chuyển sang Xanh lục rồi Vàng',
        isSuitable: true,
        scientificReasonVI: `Rất thích hợp! Khoảng đổi màu (6.0 - 7.6) ôm trọn pH trung tính 7.00 của điểm tương đương NaOH + HCl.`
      },
      {
        name: 'Methyl Da Cam (Methyl Orange)',
        pHRange: '3.1 – 4.4',
        colorChangeVI: 'Vàng da cam chuyển sang Đỏ',
        isSuitable: true,
        scientificReasonVI: 'Chấp nhận được! Bước nhảy pH của chuẩn độ bazơ mạnh bằng axit mạnh bao trùm vùng 3.1 - 4.4.'
      }
    ];

    const baseName = isWeakBase ? 'Amoniac (NH₃)' : 'Natri Hiđroxit (NaOH)';

    return {
      acidName: 'Axit Clohiđric (HCl)',
      acidType: 'STRONG',
      baseName,
      baseType: isWeakBase ? 'WEAK' : 'STRONG',
      titrationMode: 'BASE_BY_ACID',
      pKb,
      equivalenceVolumeMl: Veq,
      equivalencePH: eqPH,
      halfEquivalencePH: halfEqPH,
      dataPoints,
      curvePoints,
      indicators,
      stepByStepExplanationVI: [
        `Bước 1: Tính thể tích dung dịch chuẩn độ HCl tại điểm tương đương: V_eq = (C_B × V_B) / C_A = (${Cb} × ${Vb_init}) / ${Ca} = ${Veq} mL`,
        `Bước 2: Xác định pH tại điểm tương đương: ${isWeakBase ? `Bazơ yếu NH₃ + Axit mạnh HCl tạo muối NH₄Cl bị thủy phân (NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺) → dung dịch có tính axit nhẹ với pH_tđ = ${eqPH}.` : `Bazơ mạnh NaOH + Axit mạnh HCl tạo muối trung tính NaCl → pH_tđ = 7.00.`}`,
        `Bước 3: Lựa chọn chỉ thị màu tối ưu: ${indicators.find(i => i.isSuitable)?.name} (${indicators.find(i => i.isSuitable)?.colorChangeVI})`
      ]
    };
  }

  // CASE 2: ACID_BY_BASE (HCl or CH3COOH titrated by NaOH)
  const pKa = acidType === 'WEAK' ? (params.pKa ?? 4.76) : undefined;
  const Ka = pKa !== undefined ? Math.pow(10, -pKa) : undefined;

  // 1. Calculate equivalence volume: Veq = (Ca * Va) / Cb
  const Veq = Math.round(((Ca * Va) / Cb) * 100) / 100;

  // Key volumes to probe along titration curve
  const volumeSteps = [
    0,
    Math.round(Veq * 0.25 * 100) / 100,
    Math.round(Veq * 0.5 * 100) / 100, // Half-equivalence
    Math.round(Veq * 0.75 * 100) / 100,
    Math.round(Veq * 0.9 * 100) / 100,
    Math.round(Veq * 0.99 * 100) / 100,
    Veq, // Equivalence point
    Math.round(Veq * 1.01 * 100) / 100,
    Math.round(Veq * 1.1 * 100) / 100,
    Math.round(Veq * 1.25 * 100) / 100
  ];

  const computeAcidByBasePH = (Vb: number): { pH: number; region: TitrationDataPoint['region'] } => {
    if (Vb === 0) {
      if (acidType === 'STRONG') {
        return { pH: Math.round(-Math.log10(Ca) * 100) / 100, region: 'INITIAL' };
      } else {
        const H_conc = Math.sqrt(Ka! * Ca);
        return { pH: Math.round(-Math.log10(H_conc) * 100) / 100, region: 'INITIAL' };
      }
    } else if (Vb < Veq) {
      const isHalf = Math.abs(Vb - Veq * 0.5) < 0.05;
      const region: TitrationDataPoint['region'] = isHalf ? 'HALF_EQUIVALENCE' : 'BUFFER_OR_PRE_EQ';
      if (acidType === 'STRONG') {
        const mmolH = Ca * Va - Cb * Vb;
        const totalV = Va + Vb;
        const H_conc = mmolH / totalV;
        return { pH: Math.round(-Math.log10(H_conc) * 100) / 100, region };
      } else {
        if (isHalf) {
          return { pH: Math.round(pKa! * 100) / 100, region };
        } else {
          const mmolA_minus = Cb * Vb;
          const mmolHA = Ca * Va - Cb * Vb;
          const ratio = mmolA_minus / mmolHA;
          return { pH: Math.round((pKa! + Math.log10(ratio)) * 100) / 100, region };
        }
      }
    } else if (Math.abs(Vb - Veq) < 0.001) {
      if (acidType === 'STRONG') {
        return { pH: 7.00, region: 'EQUIVALENCE' };
      } else {
        const Kb = Kw / Ka!;
        const totalV = Va + Veq;
        const saltConc = (Ca * Va) / totalV;
        const OH_conc = Math.sqrt(Kb * saltConc);
        const pOH = -Math.log10(OH_conc);
        return { pH: Math.round((14.0 - pOH) * 100) / 100, region: 'EQUIVALENCE' };
      }
    } else {
      const mmolOH = Cb * Vb - Ca * Va;
      const totalV = Va + Vb;
      const OH_conc = mmolOH / totalV;
      const pOH = -Math.log10(OH_conc);
      return { pH: Math.round((14.0 - pOH) * 100) / 100, region: 'POST_EQUIVALENCE' };
    }
  };

  const dataPoints: TitrationDataPoint[] = [];

  let eqPH = 7.0;
  let halfEqPH: number | undefined;

  for (const Vb of volumeSteps) {
    const calc = computeAcidByBasePH(Vb);
    if (Math.abs(Vb - Veq) < 0.001) eqPH = calc.pH;
    if (Math.abs(Vb - Veq * 0.5) < 0.05 && acidType === 'WEAK') halfEqPH = calc.pH;

    dataPoints.push({
      volumeBaseAddedMl: Vb,
      volumeTitrantAddedMl: Vb,
      pH: Math.max(0, Math.min(14, calc.pH)),
      region: calc.region
    });
  }

  // Dense curve points for SVG path
  const curvePoints: TitrationDataPoint[] = denseFractions.map(frac => {
    const v = Math.round(Veq * frac * 100) / 100;
    const calc = computeAcidByBasePH(v);
    return {
      volumeBaseAddedMl: v,
      volumeTitrantAddedMl: v,
      pH: Math.max(0, Math.min(14, calc.pH)),
      region: calc.region
    };
  });

  // Indicator selections
  const indicators: IndicatorRecommendation[] = [
    {
      name: 'Phenolphthalein',
      pHRange: '8.2 – 10.0',
      colorChangeVI: 'Không màu chuyển sang Hồng cánh sen',
      isSuitable: acidType === 'WEAK' ? eqPH >= 8.0 && eqPH <= 10.0 : true,
      scientificReasonVI: acidType === 'WEAK'
        ? `Rất thích hợp! Điểm tương đương pH = ${eqPH} nằm hoàn hảo trong khoảng chuyển màu (8.2 - 10.0) của Phenolphthalein do muối tạo thành có tính kiềm nhẹ.`
        : `Thích hợp! Bước nhảy pH của axit mạnh - bazơ mạnh rất rộng (từ pH ~4 đến ~10), bao trùm dải đổi màu của Phenolphthalein.`
    },
    {
      name: 'Bromothymol Xanh (Bromothymol Blue)',
      pHRange: '6.0 – 7.6',
      colorChangeVI: 'Vàng chuyển sang Xanh lục (trung tính) rồi Xanh lam',
      isSuitable: acidType === 'STRONG',
      scientificReasonVI: acidType === 'STRONG'
        ? `Rất thích hợp! Khoảng đổi màu (6.0 - 7.6) bao quanh pH trung tính 7.00 của điểm tương đương HCl + NaOH.`
        : `KHÔNG thích hợp! Đổi màu ở pH 6.0 - 7.6 trước khi dung dịch axit axetic đạt điểm tương đương kiềm (pH = ${eqPH}).`
    },
    {
      name: 'Methyl Da Cam (Methyl Orange)',
      pHRange: '3.1 – 4.4',
      colorChangeVI: 'Đỏ chuyển sang Vàng da cam',
      isSuitable: acidType === 'STRONG',
      scientificReasonVI: acidType === 'WEAK'
        ? `KHÔNG thích hợp! Khoảng đổi màu của Methyl da cam (3.1 - 4.4) xảy ra quá sớm ở vùng đệm, trước khi phản ứng đạt điểm tương đương (pH = ${eqPH}), gây sai số lớn.`
        : `Chấp nhận được! Bước nhảy pH của axit mạnh bao trùm vùng 3.1 - 4.4.`
    }
  ];

  const acidName = acidType === 'STRONG' ? 'Axit Clohiđric (HCl)' : 'Axit Axetic (CH₃COOH)';
  const baseName = 'Natri Hiđroxit (NaOH)';

  return {
    acidName,
    acidType,
    pKa,
    baseName,
    equivalenceVolumeMl: Veq,
    equivalencePH: eqPH,
    halfEquivalencePH: halfEqPH,
    dataPoints,
    curvePoints,
    indicators,
    stepByStepExplanationVI: [
      `Bước 1: Tính thể tích dung dịch chuẩn độ NaOH tại điểm tương đương: V_eq = (C_A × V_A) / C_B = (${Ca} × ${Va}) / ${Cb} = ${Veq} mL`,
      `Bước 2: Xác định pH tại điểm tương đương:`,
      acidType === 'STRONG'
        ? `  • Axit mạnh + Bazơ mạnh tạo muối NaCl trung tính không bị thủy phân → pH_tđ = 7.00 ở 25°C.`
        : `  • Axit yếu + Bazơ mạnh tạo muối CH₃COONa kiềm tính (thủy phân ion axetat CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻) → pH_tđ = ${eqPH}.`,
      `Bước 3: Lựa chọn chỉ thị màu tối ưu: ${indicators.find(i => i.isSuitable)?.name} (${indicators.find(i => i.isSuitable)?.colorChangeVI})`
    ]
  };
}

// 10. Multi-step Back-Titration (Chuẩn độ ngược / gián tiếp)
export interface BackTitrationResult {
  analyteFormula: string;
  analyteMolarMass: number;
  sampleMassGrams?: number;
  initialReagentMoles: number;
  excessReagentMoles: number;
  consumedReagentMoles: number;
  analyteMoles: number;
  analyteMassGrams: number;
  purityPercentage?: number;
  stepByStepExplanationVI: string[];
}

export interface BackTitrationParams {
  analyteFormula: string;
  sampleMassGrams?: number;
  reagent1Molarity: number;
  reagent1VolumeMl: number;
  titrant2Molarity: number;
  titrant2VolumeMl: number;
  reagent1ToAnalyteRatio?: number;
  titrant2ToReagent1Ratio?: number;
}

export function calculateBackTitration(params: BackTitrationParams): BackTitrationResult {
  const {
    analyteFormula,
    sampleMassGrams,
    reagent1Molarity,
    reagent1VolumeMl,
    titrant2Molarity,
    titrant2VolumeMl,
    reagent1ToAnalyteRatio = 1.0,
    titrant2ToReagent1Ratio = 1.0
  } = params;

  if (reagent1Molarity <= 0 || reagent1VolumeMl <= 0) {
    throw new Error('Nồng độ và thể tích thuốc thử ban đầu phải lớn hơn 0.');
  }
  if (titrant2Molarity <= 0 || titrant2VolumeMl < 0) {
    throw new Error('Nồng độ và thể tích dung dịch chuẩn độ 2 phải không âm.');
  }
  if (reagent1ToAnalyteRatio <= 0 || titrant2ToReagent1Ratio <= 0) {
    throw new Error('Tỷ lệ số mol phản ứng phải lớn hơn 0.');
  }

  const M = getMolarMass(analyteFormula);

  // 1. Total moles of primary reagent added: n1_total = C1 * V1
  const initialReagentMoles = (reagent1Molarity * reagent1VolumeMl) / 1000.0;

  // 2. Moles of titrant 2 used: n2 = C2 * V2
  const titrant2Moles = (titrant2Molarity * titrant2VolumeMl) / 1000.0;

  // 3. Excess moles of primary reagent remaining unreacted:
  const excessReagentMoles = titrant2Moles / titrant2ToReagent1Ratio;

  if (excessReagentMoles > initialReagentMoles) {
    throw new Error('Lượng thuốc thử dư tính toán vượt quá lượng thuốc thử ban đầu đã thêm vào (dữ liệu không hợp lý).');
  }

  // 4. Moles of primary reagent consumed by analyte:
  const consumedReagentMoles = initialReagentMoles - excessReagentMoles;

  // 5. Moles of analyte:
  const analyteMoles = consumedReagentMoles / reagent1ToAnalyteRatio;

  // 6. Mass of pure analyte:
  const analyteMassGrams = analyteMoles * M;

  // 7. Purity percentage if sampleMassGrams is provided:
  let purityPercentage: number | undefined;
  if (sampleMassGrams !== undefined && sampleMassGrams > 0) {
    purityPercentage = Math.round((analyteMassGrams / sampleMassGrams) * 10000) / 100;
  }

  const stepsVI: string[] = [
    `Bước 1: Tính số mol thuốc thử chuẩn ban đầu đã cho vào mẫu: n_chuẩn1 = C₁ × V₁ = ${reagent1Molarity} M × ${(reagent1VolumeMl / 1000).toFixed(4)} L = ${(Math.round(initialReagentMoles * 1000000) / 1000000)} mol.`,
    `Bước 2: Chuẩn độ lượng thuốc thử dư bằng dung dịch chuẩn 2: n_dư = (${titrant2Molarity} M × ${(titrant2VolumeMl / 1000).toFixed(4)} L) / ${titrant2ToReagent1Ratio} = ${(Math.round(excessReagentMoles * 1000000) / 1000000)} mol.`,
    `Bước 3: Lượng thuốc thử đã phản ứng với chất phân tích [${analyteFormula}]: n_phản_ứng = n_chuẩn1 - n_dư = ${(Math.round(consumedReagentMoles * 1000000) / 1000000)} mol.`,
    `Bước 4: Tính số mol chất phân tích theo tỷ lệ phản ứng (1 : ${reagent1ToAnalyteRatio}): n_chất = n_phản_ứng / ${reagent1ToAnalyteRatio} = ${(Math.round(analyteMoles * 1000000) / 1000000)} mol.`,
    `Bước 5: Khối lượng chất tinh khiết [${analyteFormula}] (M = ${M} g/mol): m = ${(Math.round(analyteMassGrams * 10000) / 10000)} g.`
  ];

  if (purityPercentage !== undefined && sampleMassGrams !== undefined) {
    stepsVI.push(`Bước 6: Độ tinh khiết trong mẫu (${sampleMassGrams} g): % = (${(Math.round(analyteMassGrams * 1000) / 1000)} / ${sampleMassGrams}) × 100% = ${purityPercentage}%.`);
  }

  return {
    analyteFormula,
    analyteMolarMass: M,
    sampleMassGrams,
    initialReagentMoles: Math.round(initialReagentMoles * 1000000) / 1000000,
    excessReagentMoles: Math.round(excessReagentMoles * 1000000) / 1000000,
    consumedReagentMoles: Math.round(consumedReagentMoles * 1000000) / 1000000,
    analyteMoles: Math.round(analyteMoles * 1000000) / 1000000,
    analyteMassGrams: Math.round(analyteMassGrams * 10000) / 10000,
    purityPercentage,
    stepByStepExplanationVI: stepsVI
  };
}

// 11. Reaction Percentage Yield (Hiệu suất phản ứng tổng hợp)
export interface ReactionYieldResult {
  productFormula: string;
  theoreticalMassGrams: number;
  actualMassGrams: number;
  percentageYield: number;
  evaluationVI: string;
  stepByStepExplanationVI: string[];
}

export function calculateReactionYield(params: {
  productFormula: string;
  theoreticalMassGrams: number;
  actualMassGrams: number;
}): ReactionYieldResult {
  const { productFormula, theoreticalMassGrams, actualMassGrams } = params;

  if (theoreticalMassGrams <= 0) {
    throw new Error('Khối lượng lý thuyết phải lớn hơn 0.');
  }
  if (actualMassGrams < 0) {
    throw new Error('Khối lượng thực tế thu được không thể là số âm.');
  }

  const yieldPct = Math.round((actualMassGrams / theoreticalMassGrams) * 10000) / 100;

  let evaluationVI = '';
  if (yieldPct > 100) {
    evaluationVI = 'Cảnh báo: Hiệu suất > 100% cho thấy sản phẩm chưa được sấy khô hoàn toàn, còn lẫn dung môi hoặc chứa tạp chất chưa tinh chế.';
  } else if (yieldPct >= 90) {
    evaluationVI = 'Tuyệt vời: Hiệu suất tổng hợp rất cao (≥ 90%), phản ứng diễn ra gần như hoàn toàn với hao hụt kỹ thuật tối thiểu.';
  } else if (yieldPct >= 70) {
    evaluationVI = 'Tốt: Hiệu suất đạt tiêu chuẩn phòng thí nghiệm (70% - 89%), phù hợp cho các quy trình điều chế chuẩn GDPT 2018.';
  } else if (yieldPct >= 40) {
    evaluationVI = 'Trung bình: Hiệu suất ở mức vừa phải (40% - 69%), có thể do phản ứng thuận nghịch đạt cân bằng hoặc hao hụt khi chiết tách/lọc.';
  } else {
    evaluationVI = 'Thấp: Hiệu suất dưới 40%, cần tối ưu hóa các yếu tố: nhiệt độ, chất xúc tác, nồng độ hoặc chuyển dịch cân bằng theo Le Chatelier.';
  }

  const stepsVI = [
    `Bước 1: Xác định khối lượng sản phẩm lý thuyết (theo chất hạn chế): m_lt = ${theoreticalMassGrams} g.`,
    `Bước 2: Cân khối lượng sản phẩm thực tế thu được sau tinh chế: m_tt = ${actualMassGrams} g.`,
    `Bước 3: Tính hiệu suất phản ứng: H(%) = (m_tt / m_lt) × 100% = (${actualMassGrams} / ${theoreticalMassGrams}) × 100% = ${yieldPct}%.`,
    `Bước 4: Đánh giá chất lượng thực nghiệm: ${evaluationVI}`
  ];

  return {
    productFormula,
    theoreticalMassGrams,
    actualMassGrams,
    percentageYield: yieldPct,
    evaluationVI,
    stepByStepExplanationVI: stepsVI
  };
}

