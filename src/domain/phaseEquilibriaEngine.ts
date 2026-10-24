// src/domain/phaseEquilibriaEngine.ts
// ============================================================================
// ELEMENTA PHASE EQUILIBRIA, VAPOR PRESSURE & DISTILLATION THERMODYNAMICS ENGINE
// Standards: IUPAC Physical Chemistry & Vietnam GDPT 2018 Chemistry 10 & 11
// Covers: Clausius-Clapeyron Equation (ln(P2/P1) = -ΔHvap/R (1/T2 - 1/T1)),
// Antoine Vapor Pressure, Raoult's & Dalton's Laws for Binary Mixtures,
// Vapor-Liquid Equilibrium (VLE) T-x-y Boiling Diagrams, Fractional Distillation Plates
// (Fenske Equation / McCabe-Thiele Stepping), Minimum & Maximum Azeotropes,
// and Steam Distillation (Chưng cất lôi cuốn hơi nước) of Essential Oils.
// ============================================================================

export interface PureVolatileCompound {
  id: string;
  name: string;
  vietnameseName: string;
  formula: string;
  molecularWeight: number;
  normalBoilingPointC: number; // °C at 1.0 atm (760 mmHg)
  deltaHvapKjPerMol: number; // Enthalpy of vaporization (kJ/mol)
  antoineCoefficients: { A: number; B: number; C: number }; // log10(P_mmHg) = A - B / (T_C + C)
  densityGPerMl: number;
  isWaterSoluble: boolean;
  essentialOilNameVI?: string;
  curriculumGrade: 'Grade 10' | 'Grade 11' | 'Grade 12' | 'Chuyên / Olympic';
  descriptionVI: string;
}

export interface BinarySystemDef {
  id: string;
  nameVI: string;
  componentA: PureVolatileCompound; // More volatile (lower boiling point)
  componentB: PureVolatileCompound; // Less volatile (higher boiling point)
  isIdeal: boolean;
  isAzeotropic: boolean;
  azeotropeType?: 'MINIMUM_BOILING' | 'MAXIMUM_BOILING';
  azeotropeData?: {
    moleFractionA: number;
    massFractionA: number;
    boilingPointC: number;
  };
  isSteamDistillation: boolean;
  descriptionVI: string;
  practicalApplicationVI: string;
}

// ----------------------------------------------------------------------------
// UNIVERSAL PHYSICAL CONSTANTS
// ----------------------------------------------------------------------------
export const GAS_CONSTANT_R = 8.314462618; // J / (mol · K)
export const STANDARD_PRESSURE_ATM = 1.0;
export const STANDARD_PRESSURE_MMHG = 760.0;
export const STANDARD_PRESSURE_KPA = 101.325;

// ----------------------------------------------------------------------------
// BENCHMARK VOLATILE COMPOUNDS CATALOG (IUPAC & NIST CHEMISTRY WEBBOOK)
// ----------------------------------------------------------------------------
export const VOLATILE_COMPOUNDS: Record<string, PureVolatileCompound> = {
  ethanol: {
    id: 'ethanol',
    name: 'Ethanol',
    vietnameseName: 'Ethanol (Cồn etylic)',
    formula: 'C2H5OH',
    molecularWeight: 46.07,
    normalBoilingPointC: 78.37,
    deltaHvapKjPerMol: 38.56,
    antoineCoefficients: { A: 8.20417, B: 1642.89, C: 230.3 },
    densityGPerMl: 0.789,
    isWaterSoluble: true,
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Dung môi phân cực có liên kết hydro liên phân tử. Tạo hỗn hợp đẳng phí sôi cực tiểu với nước ở 78.15 °C (95.6% khối lượng), là ví dụ thực tiễn trong bài học chưng cất rượu.',
  },

  water: {
    id: 'water',
    name: 'Water',
    vietnameseName: 'Nước tinh khiết',
    formula: 'H2O',
    molecularWeight: 18.015,
    normalBoilingPointC: 100.0,
    deltaHvapKjPerMol: 40.66,
    antoineCoefficients: { A: 8.07131, B: 1730.63, C: 233.426 },
    densityGPerMl: 1.000,
    isWaterSoluble: true,
    curriculumGrade: 'Grade 10',
    descriptionVI: 'Dung môi phổ quát với mạng lưới liên kết hydro mạnh mẽ. Điểm sôi chuẩn 100.0 °C ở 1 atm.',
  },

  benzene: {
    id: 'benzene',
    name: 'Benzene',
    vietnameseName: 'Benzen',
    formula: 'C6H6',
    molecularWeight: 78.11,
    normalBoilingPointC: 80.1,
    deltaHvapKjPerMol: 30.72,
    antoineCoefficients: { A: 6.90565, B: 1211.033, C: 220.79 },
    densityGPerMl: 0.876,
    isWaterSoluble: false,
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Hydrocacbon thơm không phân cực. Khi trộn với toluen tạo thành dung dịch lý tưởng mẫu mực tuân theo Định luật Raoult.',
  },

  toluene: {
    id: 'toluene',
    name: 'Toluene',
    vietnameseName: 'Toluen (Metylbenzen)',
    formula: 'C7H8',
    molecularWeight: 92.14,
    normalBoilingPointC: 110.6,
    deltaHvapKjPerMol: 38.01,
    antoineCoefficients: { A: 6.95464, B: 1344.8, C: 219.48 },
    densityGPerMl: 0.867,
    isWaterSoluble: false,
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Hydrocacbon thơm đồng đẳng của benzen. Độ bay hơi tương đối so với benzen α ≈ 2.5 cho phép tách hiệu quả bằng chưng cất phân đoạn.',
  },

  acetone: {
    id: 'acetone',
    name: 'Acetone',
    vietnameseName: 'Axeton (Propan-2-on)',
    formula: 'C3H6O',
    molecularWeight: 58.08,
    normalBoilingPointC: 56.05,
    deltaHvapKjPerMol: 29.1,
    antoineCoefficients: { A: 7.02447, B: 1161.0, C: 224.0 },
    densityGPerMl: 0.784,
    isWaterSoluble: true,
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Dung môi hữu cơ dễ bay hơi có nhóm cacbonyl phân cực mạnh. Thường dùng trong phương pháp chiết tách và thu hồi dung môi.',
  },

  methanol: {
    id: 'methanol',
    name: 'Methanol',
    vietnameseName: 'Metanol (Ancol metylic)',
    formula: 'CH3OH',
    molecularWeight: 32.04,
    normalBoilingPointC: 64.7,
    deltaHvapKjPerMol: 35.21,
    antoineCoefficients: { A: 7.87863, B: 1473.11, C: 230.0 },
    densityGPerMl: 0.792,
    isWaterSoluble: true,
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Ancol đơn giản nhất, cực độc. Tách biệt metanol và etanol là bài toán an toàn thực phẩm quan trọng trong kiểm định chất lượng rượu nấu.',
  },

  limonene: {
    id: 'limonene',
    name: 'd-Limonene',
    vietnameseName: 'd-Limonen (Tinh dầu vỏ cam/bưởi)',
    formula: 'C10H16',
    molecularWeight: 136.23,
    normalBoilingPointC: 176.0,
    deltaHvapKjPerMol: 46.5,
    antoineCoefficients: { A: 7.05, B: 1650.0, C: 215.0 },
    densityGPerMl: 0.841,
    isWaterSoluble: false,
    essentialOilNameVI: 'Tinh dầu vỏ bưởi / cam',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Terpen mạch vòng không tan trong nước, sôi ở 176 °C. Khi chưng cất lôi cuốn hơi nước với nước, hỗn hợp sôi ở ~97.4 °C (dưới 100 °C), giúp tách tinh dầu mà không bị cháy khét phân hủy nhiệt.',
  },

  eugenol: {
    id: 'eugenol',
    name: 'Eugenol',
    vietnameseName: 'Eugenol (Tinh dầu đinh hương/hương nhu)',
    formula: 'C10H12O2',
    molecularWeight: 164.20,
    normalBoilingPointC: 254.0,
    deltaHvapKjPerMol: 58.0,
    antoineCoefficients: { A: 7.22, B: 1850.0, C: 200.0 },
    densityGPerMl: 1.066,
    isWaterSoluble: false,
    essentialOilNameVI: 'Tinh dầu đinh hương',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Hợp chất phenol thơm sôi ở nhiệt độ cực cao 254 °C. Được chưng cất lôi cuốn hơi nước từ nụ đinh hương hoặc lá hương nhu ở ~99 °C trong thực hành hóa học.',
  },
};

// ----------------------------------------------------------------------------
// BENCHMARK BINARY DISTILLATION SYSTEMS
// ----------------------------------------------------------------------------
export const BINARY_DISTILLATION_SYSTEMS: Record<string, BinarySystemDef> = {
  benzene_toluene: {
    id: 'benzene_toluene',
    nameVI: 'Benzen - Toluen (Dung dịch lý tưởng mẫu mực)',
    componentA: VOLATILE_COMPOUNDS.benzene,
    componentB: VOLATILE_COMPOUNDS.toluene,
    isIdeal: true,
    isAzeotropic: false,
    isSteamDistillation: false,
    descriptionVI: 'Hệ nhị phân lý tưởng kinh điển: các phân tử benzen và toluen có cấu trúc và lực liên kết van der Waals tương đồng nhau, nhiệt hòa tan ΔHmix ≈ 0. Tuân theo Định luật Raoult trên toàn dải nồng độ.',
    practicalApplicationVI: 'Tách benzen và toluen trong công nghiệp hóa dầu bằng tháp chưng cất phân đoạn nhiều đĩa.',
  },

  ethanol_water: {
    id: 'ethanol_water',
    nameVI: 'Etanol - Nước (Đẳng phí sôi cực tiểu 78.15 °C)',
    componentA: VOLATILE_COMPOUNDS.ethanol,
    componentB: VOLATILE_COMPOUNDS.water,
    isIdeal: false,
    isAzeotropic: true,
    azeotropeType: 'MINIMUM_BOILING',
    azeotropeData: {
      moleFractionA: 0.894, // ~89.4 mol% ethanol
      massFractionA: 0.956, // 95.6% ethanol by mass (rượu 95.6°)
      boilingPointC: 78.15,
    },
    isSteamDistillation: false,
    descriptionVI: 'Sai lệch dương so với Định luật Raoult do sự phá vỡ một phần liên kết hydro giữa các phân tử nước. Tại điểm 95.6% khối lượng, pha lỏng và pha hơi có thành phần y = x hoàn toàn bằng nhau, không thể chưng cất làm đậm đặc hơn 95.6° bằng tháp thường.',
    practicalApplicationVI: 'Chưng cất rượu truyền thống và cồn y tế 70° - 90°. Để thu cồn tuyệt đối 99.5° cần chưng cất đẳng phí với benzen hoặc rây phân tử zeolite.',
  },

  limonene_water: {
    id: 'limonene_water',
    nameVI: 'Limonen - Nước (Chưng cất lôi cuốn hơi nước tinh dầu bưởi)',
    componentA: VOLATILE_COMPOUNDS.water, // More volatile in vapor pressure
    componentB: VOLATILE_COMPOUNDS.limonene,
    isIdeal: false,
    isAzeotropic: false,
    isSteamDistillation: true,
    descriptionVI: 'Hai chất lỏng hoàn toàn không tan lẫn vào nhau. Áp suất hơi bão hòa tổng bằng tổng áp suất của nước và limonen (P_total = P_nước + P_limonen). Hỗn hợp bắt đầu sôi khi P_total = 1 atm tại nhiệt độ 97.4 °C (thấp hơn cả điểm sôi của nước 100 °C và limonen 176 °C)!',
    practicalApplicationVI: 'Chiết xuất tinh dầu bưởi, cam, sả công nghiệp bằng nồi chưng cất hơi nước mà không làm biến tính các cấu tử hương liệu quý giá.',
  },

  eugenol_water: {
    id: 'eugenol_water',
    nameVI: 'Eugenol - Nước (Chưng cất lôi cuốn hơi nước đinh hương)',
    componentA: VOLATILE_COMPOUNDS.water,
    componentB: VOLATILE_COMPOUNDS.eugenol,
    isIdeal: false,
    isAzeotropic: false,
    isSteamDistillation: true,
    descriptionVI: 'Eugenol có điểm sôi rất cao (254 °C). Nếu đun nóng trực tiếp sẽ bị cháy và polymer hóa. Nhờ chưng cất hơi nước, hơi nước sục qua hỗn hợp lôi cuốn eugenol bay sang ống ngưng tụ ở ~99 °C, sau đó tách lớp bằng phễu chiết.',
    practicalApplicationVI: 'Sản xuất tinh dầu đinh hương dùng làm thuốc tê nha khoa và hương liệu mỹ phẩm dược liệu.',
  },
};

// ----------------------------------------------------------------------------
// THERMODYNAMIC DOMAIN FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Calculates vapor pressure using Clausius-Clapeyron equation:
 * ln(P2 / P1) = - (ΔHvap / R) * (1/T2 - 1/T1)
 * @param tempKelvin Target temperature T2 in Kelvin
 * @param normalTbKelvin Normal boiling point T1 in Kelvin (at P1 = 1.0 atm = 760 mmHg)
 * @param deltaHvapJPerMol Enthalpy of vaporization in J/mol
 * @returns Vapor pressure P2 in mmHg
 */
export function calculateClausiusClapeyronVaporPressureMmHg(
  tempKelvin: number,
  normalTbKelvin: number,
  deltaHvapJPerMol: number
): number {
  if (tempKelvin <= 0 || normalTbKelvin <= 0 || deltaHvapJPerMol <= 0) return 0;
  const exponent = (-deltaHvapJPerMol / GAS_CONSTANT_R) * (1 / tempKelvin - 1 / normalTbKelvin);
  const pMmHg = STANDARD_PRESSURE_MMHG * Math.exp(exponent);
  return Number(pMmHg.toFixed(2));
}

/**
 * Calculates high-accuracy vapor pressure using Antoine equation:
 * log10(P_mmHg) = A - B / (T_C + C)
 */
export function calculateAntoineVaporPressureMmHg(
  tempCelsius: number,
  coefficients: { A: number; B: number; C: number }
): number {
  const { A, B, C } = coefficients;
  if (tempCelsius + C <= 0) return 0;
  const log10P = A - B / (tempCelsius + C);
  const pMmHg = Math.pow(10, log10P);
  return Number(pMmHg.toFixed(2));
}

/**
 * Evaluates Raoult's Law and Dalton's Law for an ideal binary liquid mixture (A + B):
 * P_A = x_A · P_A*(T)
 * P_B = (1 - x_A) · P_B*(T)
 * P_total = P_A + P_B
 * y_A = P_A / P_total (vapor phase mole fraction)
 * Relative volatility α_AB = P_A* / P_B*
 */
export function calculateIdealBinaryVLE(
  moleFractionLiquidA: number, // x_A (0.0 to 1.0)
  tempCelsius: number,
  compoundA: PureVolatileCompound,
  compoundB: PureVolatileCompound
): {
  xA: number;
  xB: number;
  pPureA_mmHg: number;
  pPureB_mmHg: number;
  partialPA_mmHg: number;
  partialPB_mmHg: number;
  totalP_mmHg: number;
  yA: number;
  yB: number;
  relativeVolatility: number;
} {
  const xA = Math.max(0.0, Math.min(1.0, moleFractionLiquidA));
  const xB = 1.0 - xA;

  const pPureA_mmHg = calculateAntoineVaporPressureMmHg(tempCelsius, compoundA.antoineCoefficients);
  const pPureB_mmHg = calculateAntoineVaporPressureMmHg(tempCelsius, compoundB.antoineCoefficients);

  const partialPA_mmHg = xA * pPureA_mmHg;
  const partialPB_mmHg = xB * pPureB_mmHg;
  const totalP_mmHg = partialPA_mmHg + partialPB_mmHg;

  const yA = totalP_mmHg > 0 ? Number((partialPA_mmHg / totalP_mmHg).toFixed(4)) : xA;
  const yB = Number((1.0 - yA).toFixed(4));

  const relVol = pPureB_mmHg > 0 ? Number((pPureA_mmHg / pPureB_mmHg).toFixed(3)) : 1.0;

  return {
    xA: Number(xA.toFixed(4)),
    xB: Number(xB.toFixed(4)),
    pPureA_mmHg,
    pPureB_mmHg,
    partialPA_mmHg: Number(partialPA_mmHg.toFixed(2)),
    partialPB_mmHg: Number(partialPB_mmHg.toFixed(2)),
    totalP_mmHg: Number(totalP_mmHg.toFixed(2)),
    yA,
    yB,
    relativeVolatility: relVol,
  };
}

/**
 * Computes boiling temperature T_boil (°C) of an ideal binary mixture at 1.0 atm (760 mmHg)
 * where P_total(T) = x_A·P_A*(T) + (1 - x_A)·P_B*(T) = 760 mmHg via binary search.
 */
export function calculateBoilingPointIdealMixtureCelsius(
  moleFractionA: number,
  compoundA: PureVolatileCompound,
  compoundB: PureVolatileCompound
): number {
  const xA = Math.max(0.0, Math.min(1.0, moleFractionA));
  if (xA >= 0.999) return compoundA.normalBoilingPointC;
  if (xA <= 0.001) return compoundB.normalBoilingPointC;

  let lowT = Math.min(compoundA.normalBoilingPointC, compoundB.normalBoilingPointC) - 5;
  let highT = Math.max(compoundA.normalBoilingPointC, compoundB.normalBoilingPointC) + 5;

  // Binary search for T where totalP = 760 mmHg
  for (let iter = 0; iter < 40; iter++) {
    const midT = (lowT + highT) / 2;
    const pA = calculateAntoineVaporPressureMmHg(midT, compoundA.antoineCoefficients);
    const pB = calculateAntoineVaporPressureMmHg(midT, compoundB.antoineCoefficients);
    const totalP = xA * pA + (1 - xA) * pB;

    if (totalP < STANDARD_PRESSURE_MMHG) {
      lowT = midT;
    } else {
      highT = midT;
    }
  }

  return Number(((lowT + highT) / 2).toFixed(2));
}

/**
 * Generates Boiling Point Diagram (T-x-y curve) data points from x_A = 0 to 1
 * for plotting Bubble Point (liquidus) and Dew Point (vaporus) curves.
 */
export function generateVLEBoilingCurvePoints(
  system: BinarySystemDef,
  steps = 21
): { xA: number; yA: number; tBoilC: number }[] {
  const points: { xA: number; yA: number; tBoilC: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const xA = i / steps;

    // For non-ideal azeotropic systems (Ethanol - Water)
    if (system.isAzeotropic && system.azeotropeData) {
      const az = system.azeotropeData;
      let tBoil: number;
      let yA: number;

      if (xA <= az.moleFractionA) {
        // Curve from 0 (Water, 100°C) down to azeotrope (78.15°C)
        const t = xA / az.moleFractionA;
        tBoil = 100.0 - (100.0 - az.boilingPointC) * Math.pow(t, 0.7);
        // Vapor is enriched in ethanol
        yA = Math.min(az.moleFractionA, Math.pow(t, 0.45) * az.moleFractionA);
      } else {
        // Curve from azeotrope (78.15°C) to pure ethanol (78.37°C)
        const t = (xA - az.moleFractionA) / (1.0 - az.moleFractionA);
        tBoil = az.boilingPointC + (78.37 - az.boilingPointC) * t;
        // In pinch region, yA is very close to xA
        yA = az.moleFractionA + (1.0 - az.moleFractionA) * Math.pow(t, 1.2);
      }

      points.push({
        xA: Number(xA.toFixed(3)),
        yA: Number(yA.toFixed(3)),
        tBoilC: Number(tBoil.toFixed(2)),
      });
    } else {
      // Ideal binary system (Benzene - Toluene)
      const tBoilC = calculateBoilingPointIdealMixtureCelsius(xA, system.componentA, system.componentB);
      const vle = calculateIdealBinaryVLE(xA, tBoilC, system.componentA, system.componentB);
      points.push({
        xA: Number(xA.toFixed(3)),
        yA: Number(vle.yA.toFixed(3)),
        tBoilC,
      });
    }
  }

  return points;
}

/**
 * Calculates Fenske Equation for Minimum Theoretical Plates at Total Reflux:
 * N_min = ln[ (x_D / (1 - x_D)) / (x_B / (1 - x_B)) ] / ln(alpha_avg)
 */
export function calculateFenskeMinimumPlates(
  distillatePurityA: number, // x_D (e.g. 0.98)
  bottomsPurityA: number, // x_B (e.g. 0.05)
  avgRelativeVolatility: number // alpha
): number {
  if (
    distillatePurityA <= 0 ||
    distillatePurityA >= 1 ||
    bottomsPurityA <= 0 ||
    bottomsPurityA >= 1 ||
    avgRelativeVolatility <= 1.0
  ) {
    return 1;
  }

  const num = Math.log((distillatePurityA / (1 - distillatePurityA)) / (bottomsPurityA / (1 - bottomsPurityA)));
  const den = Math.log(avgRelativeVolatility);
  const nMin = num / den;
  return Number(Math.max(1, nMin).toFixed(1));
}

/**
 * Steam Distillation (Chưng cất lôi cuốn hơi nước) Calculations:
 * P_total = P_water*(T) + P_oil*(T) = 760 mmHg
 * Mass ratio: m_oil / m_water = (P_oil* · M_oil) / (P_water* · M_water)
 */
export function calculateSteamDistillationParameters(
  organicCompound: PureVolatileCompound
): {
  distillationTempC: number;
  pWaterMmHg: number;
  pOilMmHg: number;
  massRatioOilToWater: number; // g oil / g water in distillate
  organicPercentInDistillate: number; // mass %
  waterSavedFromOverheatingC: number; // ΔT saved from boiling without decomposition
} {
  const water = VOLATILE_COMPOUNDS.water;

  // Search temperature where P_water(T) + P_oil(T) = 760 mmHg
  // Must be strictly below 100°C because P_water(100°C) = 760 mmHg alone!
  let lowT = 85.0;
  let highT = 99.9;

  for (let iter = 0; iter < 30; iter++) {
    const midT = (lowT + highT) / 2;
    const pW = calculateAntoineVaporPressureMmHg(midT, water.antoineCoefficients);
    const pO = calculateAntoineVaporPressureMmHg(midT, organicCompound.antoineCoefficients);
    const totalP = pW + pO;

    if (totalP < STANDARD_PRESSURE_MMHG) {
      lowT = midT;
    } else {
      highT = midT;
    }
  }

  const distT = (lowT + highT) / 2;
  const pWater = calculateAntoineVaporPressureMmHg(distT, water.antoineCoefficients);
  const pOil = Math.max(0.1, STANDARD_PRESSURE_MMHG - pWater);

  // Mass ratio = (pOil * M_oil) / (pWater * M_water)
  const massRatio = (pOil * organicCompound.molecularWeight) / (pWater * water.molecularWeight);
  const organicMassPercent = (massRatio / (1 + massRatio)) * 100;
  const tempSaved = organicCompound.normalBoilingPointC - distT;

  return {
    distillationTempC: Number(distT.toFixed(2)),
    pWaterMmHg: Number(pWater.toFixed(1)),
    pOilMmHg: Number(pOil.toFixed(1)),
    massRatioOilToWater: Number(massRatio.toFixed(4)),
    organicPercentInDistillate: Number(organicMassPercent.toFixed(2)),
    waterSavedFromOverheatingC: Number(tempSaved.toFixed(1)),
  };
}
