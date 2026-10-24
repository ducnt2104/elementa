/**
 * Differential Scanning Calorimetry (DSC), Heat Capacity (Cp) & Protein Thermal Denaturation Engine
 * 
 * Physical Principles & International Standards:
 * 1. Power-Compensated & Heat-Flux DSC:
 *    Measures heat flow rate dq/dt difference between sample and reference cells during linear temperature scanning:
 *    dq/dt = Cp * (dT/dt) = Cp * beta
 *    where beta is scanning rate in °C/min (typically 1.0 °C/min in biocalorimetry, 10 °C/min in materials).
 * 2. Two-State Protein Denaturation (Native N <=> Denatured D):
 *    Gibbs-Helmholtz Equation:
 *    Delta G°(T) = Delta H_cal * (1 - T / Tm) - Delta Cp * [ (Tm - T) + T * ln(T / Tm) ]
 *    Equilibrium constant: K(T) = exp(-Delta G°(T) / (R * T))
 *    Fraction unfolded: f_D(T) = K(T) / (1 + K(T))
 *    Excess Heat Capacity:
 *    Delta Cp_excess(T) = (Delta H_cal * Delta H_vH / (R * T^2)) * (K(T) / (1 + K(T))^2)
 * 3. Enthalpy Ratio & Cooperativity Index:
 *    r_coop = Delta H_cal / Delta H_vH
 *    - r_coop = 1.0: Two-state all-or-none cooperative transition (e.g. Lysozyme, Ribonuclease A).
 *    - r_coop > 1.0: Independent domains unfolding in succession (e.g. IgG1 mAb CH2, Fab, CH3).
 *    - r_coop < 1.0: Intermediates or oligomer dissociation preceding unfolding.
 * 4. Pharmaceutical & Polymer Thermodynamics:
 *    - Glass transition (Tg): Second-order transition exhibiting heat capacity baseline step Delta Cp without latent heat.
 *    - Cold crystallization (Tc): Exothermic recrystallization peak (Delta H_c < 0).
 *    - Melting point (Tm): First-order thermodynamic endothermic phase change (Delta H_m > 0).
 * 5. Vietnam GDPT 2018 Curriculum:
 *    - Hóa học 10: Phản ứng thu nhiệt (endothermic, Delta H > 0) và tỏa nhiệt (exothermic, Delta H < 0), biến thiên enthalpy chuẩn.
 *    - Hóa học 12: Sự biến tính protein (mất cấu trúc không gian bậc 2, 3, 4 khi gia nhiệt), polymer vô định hình.
 *    - Vật lý 12: Nhiệt lượng, nhiệt dung riêng Cp, nhiệt nóng chảy riêng và định luật nhiệt động lực học.
 */

export const GAS_CONSTANT_R = 8.314462; // J / (mol * K)
export const KELVIN_ZERO_CELSIUS = 273.15;

export type DscApplicationType =
  | 'BIOCALORIMETRY_CALIBRANT'
  | 'BIOPHARMACEUTICAL_STABILITY'
  | 'PHARMACEUTICAL_FORMULATION'
  | 'NUCLEIC_ACID_THERMODYNAMICS'
  | 'METROLOGY_CALIBRATION';

export interface DscDomainTransition {
  domainName: string;
  tmCelsius: number; // Midpoint temperature of unfolding
  calorimetricEnthalpyKjPerMol: number; // Delta H_cal in kJ/mol
  vanTHoffEnthalpyKjPerMol: number; // Delta H_vH in kJ/mol
  transitionWidthCelsius: number; // Half-height peak width
  deltaCpKjPerMolKelvin: number; // Heat capacity difference between N and D states
}

export interface DscStandard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: DscApplicationType;
  scanRateCelsiusPerMin: number;
  temperatureRangeCelsius: [number, number]; // [T_start, T_end]
  domains: DscDomainTransition[];
  cooperativityRatio: number; // Delta H_cal / Delta H_vH
  unfoldingMechanism: 'TWO_STATE_COOPERATIVE' | 'MULTI_DOMAIN_NON_TWO_STATE' | 'AMORPHOUS_CRYSTALLINE_GLASS' | 'DUPLEX_HELIX_COIL';
  glassTransitionTgCelsius?: number;
  glassTransitionDeltaCpJPerGramK?: number;
  coldCrystallizationTcCelsius?: number;
  sampleConcentrationMgPerMl: number;
  bufferComposition: string;
  biotechSignificance: string;
  curriculumNotes: string;
  iupacAstmReference: string;
}

export interface DscThermogramPoint {
  temperatureCelsius: number;
  temperatureKelvin: number;
  baselineHeatCapacityCp: number; // kJ/(mol*K) or J/(g*K)
  excessHeatCapacityDeltaCp: number; // Peak excess heat capacity
  totalApparentCp: number; // baseline + excess
  fractionUnfoldedFraction: number; // 0.0 to 1.0 (denatured fraction f_D)
  derivativeDcpDt: number; // dCp/dT for inflection / peak identification
}

export interface DscDeconvolutedDomainResult {
  domainName: string;
  fittedTmCelsius: number;
  fittedDeltaHcalKjPerMol: number;
  fittedDeltaHvHKjPerMol: number;
  domainFractionPercent: number;
}

export interface DscSimulationResult {
  standard: DscStandard;
  scanRateCelsiusPerMin: number;
  points: DscThermogramPoint[];
  peakTmCelsius: number;
  apparentOnsetTmCelsius: number;
  totalCalorimetricEnthalpyKjPerMol: number;
  globalVanTHoffEnthalpyKjPerMol: number;
  overallCooperativityRatio: number;
  deconvolutedDomains: DscDeconvolutedDomainResult[];
  bufferStabilizationScore: number; // 0 - 100% stability index
  uspIupacSummary: string;
  curriculumContext: string;
}

/**
 * Standard Catalog: 5 International Benchmark DSC Systems
 */
export const DSC_STANDARD_CATALOG: DscStandard[] = [
  {
    id: 'lysozyme_hen_egg_white_calibrant',
    name: 'Hen Egg White Lysozyme (HEWL) Two-State Calibrant',
    vietnameseName: 'Chuẩn Đo Nhiệt Lượng Sinh Học - Lysozyme Lòng Trắng Trứng (HEWL)',
    applicationCategory: 'BIOCALORIMETRY_CALIBRANT',
    scanRateCelsiusPerMin: 1.0,
    temperatureRangeCelsius: [20.0, 95.0],
    domains: [
      {
        domainName: 'Intact Lysozyme Core Globule',
        tmCelsius: 65.4,
        calorimetricEnthalpyKjPerMol: 504.0,
        vanTHoffEnthalpyKjPerMol: 494.1,
        transitionWidthCelsius: 4.8,
        deltaCpKjPerMolKelvin: 6.3,
      },
    ],
    cooperativityRatio: 1.02,
    unfoldingMechanism: 'TWO_STATE_COOPERATIVE',
    sampleConcentrationMgPerMl: 1.0,
    bufferComposition: '20 mM Glycine-HCl, pH 4.0, 50 mM NaCl',
    biotechSignificance:
      'Chuẩn đo lường quốc tế kiểm định máy đo nhiệt lượng quét vi sai (MicroCal VP-DSC / PEAQ-DSC). Tỷ số r_coop = 1.02 xác nhận cơ chế biến tính hai trạng thái lý tưởng "tất cả hoặc không" (all-or-none), không có tiểu phần trung gian tồn tại.',
    curriculumNotes:
      'Hóa học 12: Sự đông tụ và biến tính protein khi đun nóng (phá vỡ liên kết hydrogen và cầu nối disulfide nội phân tử); Hóa học 10: Phản ứng thu nhiệt (biến thiên enthalpy Delta H > 0).',
    iupacAstmReference: 'IUPAC Recommendations for Biophysical Calorimetry / ASTM E967',
  },
  {
    id: 'therapeutic_mab_igg1_multidomain',
    name: 'Therapeutic Monoclonal Antibody IgG1 Multi-Domain Denaturation',
    vietnameseName: 'Kháng Thể Đơn Dòng Điều Trị IgG1 - Biến Tính Nhiệt Đa Vùng',
    applicationCategory: 'BIOPHARMACEUTICAL_STABILITY',
    scanRateCelsiusPerMin: 1.0,
    temperatureRangeCelsius: [35.0, 95.0],
    domains: [
      {
        domainName: 'CH2 Domain (Kháng thể Fc mềm dẻo)',
        tmCelsius: 68.5,
        calorimetricEnthalpyKjPerMol: 320.0,
        vanTHoffEnthalpyKjPerMol: 520.0,
        transitionWidthCelsius: 5.2,
        deltaCpKjPerMolKelvin: 8.5,
      },
      {
        domainName: 'Fab Domain (Vùng liên kết kháng nguyên)',
        tmCelsius: 73.2,
        calorimetricEnthalpyKjPerMol: 610.0,
        vanTHoffEnthalpyKjPerMol: 680.0,
        transitionWidthCelsius: 4.6,
        deltaCpKjPerMolKelvin: 12.0,
      },
      {
        domainName: 'CH3 Domain (Vùng đồng nhị phân ổn định)',
        tmCelsius: 82.6,
        calorimetricEnthalpyKjPerMol: 450.0,
        vanTHoffEnthalpyKjPerMol: 590.0,
        transitionWidthCelsius: 4.1,
        deltaCpKjPerMolKelvin: 9.2,
      },
    ],
    cooperativityRatio: 2.34,
    unfoldingMechanism: 'MULTI_DOMAIN_NON_TWO_STATE',
    sampleConcentrationMgPerMl: 0.8,
    bufferComposition: '10 mM Histidine, pH 6.0, 140 mM Trehalose, 0.02% Polysorbate-20',
    biotechSignificance:
      'Chỉ số vàng đánh giá độ ổn định nhiệt công thức thuốc sinh học kháng thể đơn dòng (mAbs). Vùng CH2 biến tính sớm nhất ở 68.5 °C là điểm kích hoạt kết tụ protein không thuận nghịch (irreversible aggregation).',
    curriculumNotes:
      'Hóa học 12: Cấu trúc bậc 3 và bậc 4 của protein phức tạp; ảnh hưởng của tá dược đường đa (Trehalose) và chất hoạt động bề mặt đến liên kết kỵ nước bảo vệ protein.',
    iupacAstmReference: 'USP <1790> / ICH Q6B Specifications for Biotechnological Products',
  },
  {
    id: 'indomethacin_pvp_amorphous_dispersion',
    name: 'Amorphous Solid Dispersion Indomethacin - PVP Polymer',
    vietnameseName: 'Hệ Phân Tán Vô Định Hình Indomethacin - Polymer PVP (BCS Class II)',
    applicationCategory: 'PHARMACEUTICAL_FORMULATION',
    scanRateCelsiusPerMin: 10.0,
    temperatureRangeCelsius: [10.0, 180.0],
    domains: [
      {
        domainName: 'Tái Kết Tinh Lạnh (Cold Crystallization)',
        tmCelsius: 95.5,
        calorimetricEnthalpyKjPerMol: -48.2, // Exothermic peak
        vanTHoffEnthalpyKjPerMol: 120.0,
        transitionWidthCelsius: 12.0,
        deltaCpKjPerMolKelvin: 0.0,
      },
      {
        domainName: 'Nóng Chảy Tinh Thể Indomethacin gamma (Melting)',
        tmCelsius: 161.2,
        calorimetricEnthalpyKjPerMol: 108.5, // Endothermic melting
        vanTHoffEnthalpyKjPerMol: 310.0,
        transitionWidthCelsius: 3.5,
        deltaCpKjPerMolKelvin: 0.0,
      },
    ],
    cooperativityRatio: 1.45,
    unfoldingMechanism: 'AMORPHOUS_CRYSTALLINE_GLASS',
    glassTransitionTgCelsius: 42.0,
    glassTransitionDeltaCpJPerGramK: 0.38,
    coldCrystallizationTcCelsius: 95.5,
    sampleConcentrationMgPerMl: 5.0,
    bufferComposition: 'Trạng thái rắn phân tán vô định hình Indomethacin:PVP K30 (1:3 w/w)',
    biotechSignificance:
      'Công nghệ nano hóa dược giải phóng hoạt chất BCS Class II khó tan. DSC xác định nhiệt độ hóa thủy tinh Tg = 42 °C; polymer PVP ức chế sự tái kết tinh indomethacin, duy trì trạng thái vô định hình siêu bão hòa trong ruột.',
    curriculumNotes:
      'Hóa học 12: Polymer tổng hợp (Polyvinylpyrrolidone), trạng thái vô định hình vs mạng tinh thể; Vật lý 12: Nhiệt chuyển pha nóng chảy và sự thăng hoa.',
    iupacAstmReference: 'ASTM E1356 (Glass Transition) / Ph. Eur. 2.2.34 DSC',
  },
  {
    id: 'dsdna_oligonucleotide_duplex_melting',
    name: 'Double-Stranded DNA Duplex Thermal Melting & Hyperchromicity',
    vietnameseName: 'Nóng Chảy Phân Tử Kép dsDNA Duplex (Kỹ Thuật PCR & Đo Ái Lực)',
    applicationCategory: 'NUCLEIC_ACID_THERMODYNAMICS',
    scanRateCelsiusPerMin: 1.0,
    temperatureRangeCelsius: [30.0, 95.0],
    domains: [
      {
        domainName: '24-mer Oligonucleotide Duplex Cooperative Unzipping',
        tmCelsius: 76.8,
        calorimetricEnthalpyKjPerMol: 345.0,
        vanTHoffEnthalpyKjPerMol: 348.0,
        transitionWidthCelsius: 3.8,
        deltaCpKjPerMolKelvin: 0.8,
      },
    ],
    cooperativityRatio: 0.99,
    unfoldingMechanism: 'DUPLEX_HELIX_COIL',
    sampleConcentrationMgPerMl: 0.5,
    bufferComposition: '10 mM Tris-HCl, pH 7.5, 100 mM NaCl, 1 mM EDTA',
    biotechSignificance:
      'Mô hình nhiệt động học lân cận gần nhất (Nearest-Neighbor Thermodynamics) cho PCR primers và xét nghiệm chẩn đoán di truyền. Tm = 76.8 °C phụ thuộc hàm lượng %GC và nồng độ ion Na+ ổn định liên kết phosphate.',
    curriculumNotes:
      'Sinh học 10 & 12: Cấu trúc xoắn kép DNA (nguyên tắc bổ sung A-T 2 liên kết H, G-C 3 liên kết H); Hóa học 10: Năng lượng liên kết ion và liên kết hydro.',
    iupacAstmReference: 'IUPAC Biophysical Chemistry Commission on Nucleic Acid Thermodynamics',
  },
  {
    id: 'gallium_indium_astm_e967_calibrant',
    name: 'Primary Temperature Calibrant Gallium / Indium (ASTM E967)',
    vietnameseName: 'Chuẩn Đo Lường Nhiệt Kế ASTM E967/E968 - Kim Loại Gallium & Indium',
    applicationCategory: 'METROLOGY_CALIBRATION',
    scanRateCelsiusPerMin: 5.0,
    temperatureRangeCelsius: [15.0, 70.0],
    domains: [
      {
        domainName: 'Nóng Chảy Kim Loại Gallium Siêu Tinh Khiết (99.9999% Ga)',
        tmCelsius: 29.76,
        calorimetricEnthalpyKjPerMol: 80.08, // J/g conversion in engine
        vanTHoffEnthalpyKjPerMol: 79.95,
        transitionWidthCelsius: 0.35,
        deltaCpKjPerMolKelvin: 0.05,
      },
    ],
    cooperativityRatio: 1.00,
    unfoldingMechanism: 'TWO_STATE_COOPERATIVE',
    sampleConcentrationMgPerMl: 10.0,
    bufferComposition: 'Mẫu chuẩn kim loại rắn đóng kín trong chén nhôm hermetic aluminum pan',
    biotechSignificance:
      'Chuẩn đo lường hiệu chuẩn thang nhiệt độ và thông lượng nhiệt máy DSC theo tiêu chuẩn ASTM E967 và ASTM E968. Độ tinh khiết cực cao đem lại đỉnh nóng chảy siêu hẹp (< 0.4 °C) tại 29.76 °C.',
    curriculumNotes:
      'Hóa học 10: Bảng tuần hoàn kim loại nhóm IIIA (Ga, In); Vật lý 12: Nhiệt chuyển pha thể rắn - lỏng đẳng nhiệt.',
    iupacAstmReference: 'ASTM E967 (Temperature Calibration) / ASTM E968 (Heat Flow Calibration)',
  },
];

/**
 * Calculate Gibbs Free Energy of Unfolding at temperature T:
 * Delta G°(T) = Delta H_cal * (1 - T / Tm) - Delta Cp * [ (Tm - T) + T * ln(T / Tm) ]
 * Output in J/mol
 */
export function calculateGibbsFreeEnergyJPerMol(
  tempCelsius: number,
  tmCelsius: number,
  deltaHcalKjPerMol: number,
  deltaCpKjPerMolKelvin: number
): number {
  const TK = tempCelsius + KELVIN_ZERO_CELSIUS;
  const TmK = tmCelsius + KELVIN_ZERO_CELSIUS;
  const deltaHcalJ = deltaHcalKjPerMol * 1000.0;
  const deltaCpJ = deltaCpKjPerMolKelvin * 1000.0;

  const enthalpyTerm = deltaHcalJ * (1.0 - TK / TmK);
  const cpTerm = deltaCpJ * ((TmK - TK) + TK * Math.log(TK / TmK));

  return enthalpyTerm - cpTerm;
}

/**
 * Calculate Equilibrium Constant K(T) = exp(-Delta G° / (R * T))
 */
export function calculateEquilibriumConstant(
  tempCelsius: number,
  tmCelsius: number,
  deltaHcalKjPerMol: number,
  deltaCpKjPerMolKelvin: number
): number {
  const TK = tempCelsius + KELVIN_ZERO_CELSIUS;
  const deltaGJ = calculateGibbsFreeEnergyJPerMol(tempCelsius, tmCelsius, deltaHcalKjPerMol, deltaCpKjPerMolKelvin);
  const exponent = -deltaGJ / (GAS_CONSTANT_R * TK);

  // Guard against numerical overflow / underflow
  if (exponent > 80.0) return Math.exp(80.0);
  if (exponent < -80.0) return Math.exp(-80.0);
  return Math.exp(exponent);
}

/**
 * Calculate Fraction Unfolded f_D(T) = K(T) / (1 + K(T))
 */
export function calculateFractionUnfolded(
  tempCelsius: number,
  tmCelsius: number,
  deltaHcalKjPerMol: number,
  deltaCpKjPerMolKelvin: number
): number {
  const K = calculateEquilibriumConstant(tempCelsius, tmCelsius, deltaHcalKjPerMol, deltaCpKjPerMolKelvin);
  return K / (1.0 + K);
}

/**
 * Calculate Single Domain Excess Heat Capacity Delta Cp_excess(T) in kJ/(mol * K)
 */
export function calculateDomainExcessCp(
  tempCelsius: number,
  domain: DscDomainTransition
): number {
  const TK = tempCelsius + KELVIN_ZERO_CELSIUS;
  const deltaHcalJ = domain.calorimetricEnthalpyKjPerMol * 1000.0;
  const deltaHvHJ = domain.vanTHoffEnthalpyKjPerMol * 1000.0;
  const K = calculateEquilibriumConstant(
    tempCelsius,
    domain.tmCelsius,
    domain.calorimetricEnthalpyKjPerMol,
    domain.deltaCpKjPerMolKelvin
  );

  const denom = Math.pow(1.0 + K, 2);
  if (denom <= 0) return 0.0;

  const excessJ = (deltaHcalJ * deltaHvHJ / (GAS_CONSTANT_R * Math.pow(TK, 2))) * (K / denom);
  return excessJ / 1000.0; // convert to kJ / (mol * K)
}

/**
 * Calculate Baseline Heat Capacity (native state slope + denatured state offset)
 */
export function calculateBaselineHeatCapacity(
  tempCelsius: number,
  standard: DscStandard
): number {
  // Linear polynomial baseline: Cp_base(T) = a0 + a1 * T
  const a0 = 8.5; // kJ / (mol * K) baseline
  const a1 = 0.045; // slope with temperature
  return a0 + a1 * (tempCelsius - 20.0);
}

/**
 * Simulate Full DSC Thermogram Scan
 */
export function simulateDscScan(
  standard: DscStandard,
  numPoints: number = 220
): DscSimulationResult {
  const [tStart, tEnd] = standard.temperatureRangeCelsius;
  const step = (tEnd - tStart) / (numPoints - 1);
  const points: DscThermogramPoint[] = [];

  let maxTotalCp = -Infinity;
  let peakTm = standard.domains[0]?.tmCelsius || 65.0;

  for (let i = 0; i < numPoints; i++) {
    const tempC = tStart + i * step;
    const tempK = tempC + KELVIN_ZERO_CELSIUS;

    const baseCp = calculateBaselineHeatCapacity(tempC, standard);

    // Sum excess heat capacities of all active domains
    let totalExcessCp = 0.0;
    let weightedFraction = 0.0;

    for (const domain of standard.domains) {
      const dCp = calculateDomainExcessCp(tempC, domain);
      totalExcessCp += dCp;

      const fD = calculateFractionUnfolded(
        tempC,
        domain.tmCelsius,
        domain.calorimetricEnthalpyKjPerMol,
        domain.deltaCpKjPerMolKelvin
      );
      weightedFraction += fD / standard.domains.length;
    }

    // Add Glass Transition step if applicable
    if (standard.glassTransitionTgCelsius !== undefined && standard.glassTransitionDeltaCpJPerGramK) {
      const tg = standard.glassTransitionTgCelsius;
      const stepJ = standard.glassTransitionDeltaCpJPerGramK * 10.0; // scale for visualization
      const stepFraction = 1.0 / (1.0 + Math.exp(-(tempC - tg) / 2.5));
      totalExcessCp += stepFraction * stepJ;
    }

    const totalCp = baseCp + totalExcessCp;

    if (totalCp > maxTotalCp) {
      maxTotalCp = totalCp;
      peakTm = tempC;
    }

    // Derivative approximation
    let derivative = 0.0;
    if (i > 0) {
      const prev = points[i - 1];
      derivative = (totalCp - prev.totalApparentCp) / step;
    }

    points.push({
      temperatureCelsius: Math.round(tempC * 100) / 100,
      temperatureKelvin: Math.round(tempK * 100) / 100,
      baselineHeatCapacityCp: Math.round(baseCp * 100) / 100,
      excessHeatCapacityDeltaCp: Math.round(totalExcessCp * 100) / 100,
      totalApparentCp: Math.round(totalCp * 100) / 100,
      fractionUnfoldedFraction: Math.round(weightedFraction * 1000) / 1000,
      derivativeDcpDt: Math.round(derivative * 100) / 100,
    });
  }

  // Deconvoluted domain summaries
  let sumCal = 0.0;
  let sumHvH = 0.0;
  const deconvoluted: DscDeconvolutedDomainResult[] = standard.domains.map((dom) => {
    sumCal += Math.abs(dom.calorimetricEnthalpyKjPerMol);
    sumHvH += Math.abs(dom.vanTHoffEnthalpyKjPerMol);
    return {
      domainName: dom.domainName,
      fittedTmCelsius: dom.tmCelsius,
      fittedDeltaHcalKjPerMol: dom.calorimetricEnthalpyKjPerMol,
      fittedDeltaHvHKjPerMol: dom.vanTHoffEnthalpyKjPerMol,
      domainFractionPercent: Math.round(
        (Math.abs(dom.calorimetricEnthalpyKjPerMol) /
          standard.domains.reduce((acc, d) => acc + Math.abs(d.calorimetricEnthalpyKjPerMol), 0)) *
          100
      ),
    };
  });

  const overallCoop = sumHvH > 0 ? Math.round((sumCal / sumHvH) * 100) / 100 : 1.0;
  const apparentOnset = Math.round((peakTm - 6.5) * 10) / 10;

  // Buffer stabilization score: higher Tm correlates with higher formulation stability index
  const stabScore = Math.min(100, Math.max(30, Math.round(((peakTm - 40.0) / 50.0) * 100)));

  return {
    standard,
    scanRateCelsiusPerMin: standard.scanRateCelsiusPerMin,
    points,
    peakTmCelsius: Math.round(peakTm * 10) / 10,
    apparentOnsetTmCelsius: apparentOnset,
    totalCalorimetricEnthalpyKjPerMol: Math.round(sumCal * 10) / 10,
    globalVanTHoffEnthalpyKjPerMol: Math.round(sumHvH * 10) / 10,
    overallCooperativityRatio: overallCoop,
    deconvolutedDomains: deconvoluted,
    bufferStabilizationScore: stabScore,
    uspIupacSummary: standard.iupacAstmReference,
    curriculumContext: standard.curriculumNotes,
  };
}

/**
 * Match a card to an appropriate DSC thermal stability standard
 */
export function getMatchingDscCard(card: any): DscStandard | null {
  if (!card) return null;
  const name = (card.name || '').toLowerCase();
  const desc = (card.description || '').toLowerCase();

  // 1. Lysozyme / Calibrant
  if (
    name.includes('lysozyme') ||
    desc.includes('lòng trắng trứng') ||
    desc.includes('hewl') ||
    desc.includes('chuẩn nhiệt lượng')
  ) {
    return DSC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hen_egg_white_calibrant') || null;
  }

  // 2. Monoclonal antibody IgG / Multi-domain
  if (
    name.includes('kháng thể') ||
    name.includes('igg') ||
    desc.includes('mab') ||
    desc.includes('biến tính đa vùng') ||
    desc.includes('độ ổn định nhiệt')
  ) {
    return DSC_STANDARD_CATALOG.find((s) => s.id === 'therapeutic_mab_igg1_multidomain') || null;
  }

  // 3. Indomethacin / Amorphous polymer
  if (
    name.includes('indomethacin') ||
    name.includes('vô định hình') ||
    desc.includes('hóa thủy tinh') ||
    desc.includes('nhiệt độ tg') ||
    desc.includes('pvp')
  ) {
    return DSC_STANDARD_CATALOG.find((s) => s.id === 'indomethacin_pvp_amorphous_dispersion') || null;
  }

  // 4. dsDNA duplex melting
  if (
    name.includes('dna') ||
    desc.includes('nóng chảy dna') ||
    desc.includes('duplex') ||
    desc.includes('pcr primer')
  ) {
    return DSC_STANDARD_CATALOG.find((s) => s.id === 'dsdna_oligonucleotide_duplex_melting') || null;
  }

  // 5. Gallium / Indium
  if (
    name.includes('gallium') ||
    name.includes('indium') ||
    desc.includes('astm e967') ||
    desc.includes('hiệu chuẩn nhiệt độ')
  ) {
    return DSC_STANDARD_CATALOG.find((s) => s.id === 'gallium_indium_astm_e967_calibrant') || null;
  }

  return null;
}

/**
 * Validation helper for DSC physical integrity
 */
export function validateDscStandardPhysics(standard: DscStandard): boolean {
  if (standard.scanRateCelsiusPerMin <= 0) return false;
  if (standard.temperatureRangeCelsius[0] >= standard.temperatureRangeCelsius[1]) return false;
  if (standard.domains.length === 0) return false;
  for (const dom of standard.domains) {
    if (dom.transitionWidthCelsius <= 0) return false;
  }
  return true;
}
