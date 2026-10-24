// src/domain/industrialReactorEngine.ts
// Industrial Gas Synthesis & Reactor Dynamics Simulation Engine for ELEMENTA
// Strictly conforming to IUPAC standards & Vietnam GDPT 2018 Chemistry Curriculum (Grade 10 Kinetics, Grade 11 Equilibrium, Grade 12 Applied Chemistry)

export interface IndustrialSpecies {
  formula: string;
  name_vi: string;
  coeff: number;
  phase: 'g' | 'l' | 's';
  molarMass_g_mol: number;
}

export interface IndustrialProcessDef {
  id: string;
  name_vi: string;
  category: 'AMMONIA' | 'SULFURIC_ACID' | 'SYNGAS' | 'NITRIC_ACID';
  equation: string;
  reactants: IndustrialSpecies[];
  products: IndustrialSpecies[];
  standardDeltaH_kJ: number; // \Delta_r H^0_{298} in kJ/mol
  isExothermic: boolean;
  delta_n_gas: number; // \sum \nu_g(prod) - \sum \nu_g(react)
  standardKp298: number; // Reference Kp at 298.15 K
  catalystName_vi: string;
  catalystComposition: string;
  promoters_vi: string;
  optimalTempRangeC: [number, number]; // e.g. [400, 450]
  optimalPressureRangeAtm: [number, number]; // e.g. [150, 200]
  activationEnergyUncat_kJ: number; // Ea uncatalyzed
  activationEnergyCat_kJ: number; // Ea catalyzed
  pedagogicalRationaleVI: string;
  compromiseExplanationVI: string;
  recyclingPrincipleVI: string;
  historicalContextVI: string;
}

export interface ReactorSimulationInput {
  processId: string;
  temperatureCelsius: number;
  pressureAtm: number;
  hasCatalyst: boolean;
  recycleRatio: number; // 0.0 to 0.98 (0% to 98% gas recycled)
  coolingEfficiency: number; // 0.0 to 1.0 (condenser / separator efficiency)
}

export interface ReactorSimulationResult {
  process: IndustrialProcessDef;
  temperatureKelvin: number;
  pressureAtm: number;
  effectiveKp: number;
  reactionRateIndex: number; // 0.0 to 100.0 relative scale
  singlePassConversionPct: number; // 0.0 to 100.0%
  overallConversionPct: number; // 0.0 to 100.0% with recycle loop
  equilibriumShiftDirection: 'FORWARD' | 'REVERSE' | 'EQUILIBRIUM';
  relativeEnergyConsumptionIndex: number; // 0.0 to 100.0 scale (heating + compression)
  economicEfficiencyScore: number; // 0.0 to 100.0 score (yield vs energy vs safety)
  safetyWarning?: string;
  leChatelierAssessmentVI: string;
  compromiseAssessmentVI: string;
  tacticalGameplayBonus: {
    nameVI: string;
    descriptionVI: string;
    manaRefundPct: number;
    powerMultiplier: number;
    tacticalTag: 'PRESSURE_SURGE' | 'CATALYTIC_FURY' | 'RECYCLE_LOOP' | 'OPTIMAL_SYNTHESIS' | 'OVERHEAT_RISK';
  };
}

// Universal Gas Constant R in J / (mol * K)
export const R_IDEAL_GAS = 8.314;
export const T_REF_KELVIN = 298.15;

/**
 * Standard Curricular Industrial Gas Synthesis Processes in GDPT 2018
 */
export const INDUSTRIAL_PROCESSES: IndustrialProcessDef[] = [
  {
    id: 'haber_bosch',
    name_vi: 'Quy trình Haber-Bosch (Tổng hợp Amoniac NH₃)',
    category: 'AMMONIA',
    equation: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',
    reactants: [
      { formula: 'N2', name_vi: 'Khí Nitơ', coeff: 1, phase: 'g', molarMass_g_mol: 28.014 },
      { formula: 'H2', name_vi: 'Khí Hiđro', coeff: 3, phase: 'g', molarMass_g_mol: 2.016 }
    ],
    products: [
      { formula: 'NH3', name_vi: 'Khí Amoniac', coeff: 2, phase: 'g', molarMass_g_mol: 17.031 }
    ],
    standardDeltaH_kJ: -92.2, // Exothermic
    isExothermic: true,
    delta_n_gas: 2 - (1 + 3), // -2 mol gas
    standardKp298: 6.8e5, // Large at room temp, drops at high T
    catalystName_vi: 'Sắt xốp (Porous Iron)',
    catalystComposition: 'Fe',
    promoters_vi: 'Al₂O₃ và K₂O (tăng diện tích bề mặt tiếp xúc & độ bền nhiệt)',
    optimalTempRangeC: [400, 450],
    optimalPressureRangeAtm: [150, 200],
    activationEnergyUncat_kJ: 335.0, // Triple bond N≡N requires 945 kJ/mol to break
    activationEnergyCat_kJ: 160.0,
    pedagogicalRationaleVI:
      'Phản ứng tỏa nhiệt (ΔᵣH°₂₉₈ = -92.2 kJ) và giảm số mol khí (4 mol → 2 mol). Theo Le Chatelier: hạ nhiệt độ và tăng áp suất giúp tăng hiệu suất cân bằng NH₃.',
    compromiseExplanationVI:
      'Nhiệt độ thỏa hiệp 400 - 450 °C: Ở nhiệt độ thấp (<200 °C), hiệu suất cân bằng cao (>80%) nhưng tốc độ phản ứng cực kỳ chậm, liên kết ba N≡N rất bền không thể phân cắt. Nhiệt độ 400-450 °C kết hợp xúc tác Fe cho phép phản ứng đạt cân bằng nhanh chóng với hiệu suất mỗi lần qua tháp đạt 15-20%.\nÁp suất thỏa hiệp 150 - 200 atm: Tăng áp suất vừa làm tăng hiệu suất vừa tăng tốc độ va chạm, nhưng giới hạn ở 200 atm vì chi phí chế tạo vỏ thép chịu áp và máy nén rất tốn kém.',
    recyclingPrincipleVI:
      'Tuần hoàn khí: Hỗn hợp khí sau khi qua tháp phản ứng được làm lạnh xuống dưới nhiệt độ ngưng tụ của NH₃ (khoảng -33 °C hoặc ngưng tụ ở áp suất cao). NH₃ lỏng tách ra, hỗn hợp N₂ và H₂ chưa phản ứng được máy nén tuần hoàn trở lại tháp phản ứng, nâng hiệu suất toàn bộ quy trình lên >97%.',
    historicalContextVI:
      'Phát minh bởi Fritz Haber và Carl Bosch (đạt 2 giải Nobel Hóa học 1918 và 1931), cứu rỗi nền nông nghiệp nhân loại qua phân bón đạm hóa học.'
  },
  {
    id: 'contact_so3',
    name_vi: 'Quy trình Tiếp xúc (Oxi hóa SO₂ thành SO₃ sản xuất H₂SO₄)',
    category: 'SULFURIC_ACID',
    equation: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)',
    reactants: [
      { formula: 'SO2', name_vi: 'Khí Lưu huỳnh đioxit', coeff: 2, phase: 'g', molarMass_g_mol: 64.066 },
      { formula: 'O2', name_vi: 'Khí Oxi', coeff: 1, phase: 'g', molarMass_g_mol: 31.999 }
    ],
    products: [
      { formula: 'SO3', name_vi: 'Khí Lưu huỳnh trioxit', coeff: 2, phase: 'g', molarMass_g_mol: 80.063 }
    ],
    standardDeltaH_kJ: -198.0, // Exothermic
    isExothermic: true,
    delta_n_gas: 2 - (2 + 1), // -1 mol gas
    standardKp298: 4.0e24, // Extremely high at 298 K
    catalystName_vi: 'Vanadi(V) oxit',
    catalystComposition: 'V₂O₅ trên chất mang SiO₂',
    promoters_vi: 'K₂O hoặc K₂SO₄',
    optimalTempRangeC: [440, 460],
    optimalPressureRangeAtm: [1, 2],
    activationEnergyUncat_kJ: 210.0,
    activationEnergyCat_kJ: 85.0,
    pedagogicalRationaleVI:
      'Phản ứng tỏa nhiệt mạnh (ΔᵣH°₂₉₈ = -198 kJ) và giảm thể tích khí (3 mol → 2 mol). V2O5 chỉ bắt đầu hoạt hóa từ khoảng 400 °C trở lên.',
    compromiseExplanationVI:
      'Nhiệt độ tối ưu ~450 °C: Dưới 400 °C xúc tác V₂O₅ bị trơ, trên 550 °C cân bằng chuyển dịch ngược làm giảm hiệu suất và làm thiêu kết xúc tác.\nÁp suất ~1 - 2 atm (áp suất thường): Vì ở 450 °C hiệu suất chuyển hóa SO₂ đã đạt rất cao (97 - 98%), việc nén áp suất cao đem lại hiệu quả tăng thêm không đáng kể so với chi phí máy nén đắt đỏ.',
    recyclingPrincipleVI:
      'Hấp thụ trong H₂SO₄ đặc 98.3%: Không dùng nước hấp thụ trực tiếp vì phản ứng tỏa nhiệt cực mạnh tạo sương mù axit ăn mòn không ngưng tụ được. Dùng H₂SO₄ 98.3% tạo oleum (H₂SO₄·nSO₃), sau đó pha loãng oleum tạo H₂SO₄ thương phẩm.',
    historicalContextVI:
      'Quy trình tiếp xúc do Peregrine Phillips được cấp bằng sáng chế năm 1831, là huyết mạch công nghiệp hóa chất toàn cầu ("thước đo nền công nghiệp của một quốc gia").'
  },
  {
    id: 'steam_methane_reforming',
    name_vi: 'Reforming Metan bằng Hơi nước (Sản xuất Syngas CO + H₂)',
    category: 'SYNGAS',
    equation: 'CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g)',
    reactants: [
      { formula: 'CH4', name_vi: 'Khí Metan', coeff: 1, phase: 'g', molarMass_g_mol: 16.043 },
      { formula: 'H2O', name_vi: 'Hơi nước siêu nhiệt', coeff: 1, phase: 'g', molarMass_g_mol: 18.015 }
    ],
    products: [
      { formula: 'CO', name_vi: 'Khí Cacbon monoxit', coeff: 1, phase: 'g', molarMass_g_mol: 28.010 },
      { formula: 'H2', name_vi: 'Khí Hiđro', coeff: 3, phase: 'g', molarMass_g_mol: 2.016 }
    ],
    standardDeltaH_kJ: 206.1, // Strongly endothermic
    isExothermic: false,
    delta_n_gas: (1 + 3) - (1 + 1), // +2 mol gas
    standardKp298: 1.2e-25, // Unfavorable at room temp
    catalystName_vi: 'Niken (Nickel catalyst)',
    catalystComposition: 'Ni trên chất mang Al₂O₃ / MgO',
    promoters_vi: 'CaO (ngăn ngừa tạo muội than bám xúc tác coking)',
    optimalTempRangeC: [750, 900],
    optimalPressureRangeAtm: [20, 30],
    activationEnergyUncat_kJ: 280.0,
    activationEnergyCat_kJ: 110.0,
    pedagogicalRationaleVI:
      'Phản ứng thu nhiệt mạnh (ΔᵣH°₂₉₈ = +206.1 kJ) và tăng số mol khí (2 mol → 4 mol). Theo Le Chatelier: tăng nhiệt độ chuyển dịch mạnh sang chiều thuận tạo H₂.',
    compromiseExplanationVI:
      'Nhiệt độ cao 750 - 900 °C: Cần cung cấp nhiệt lượng lớn để chuyển dịch cân bằng thu nhiệt và phá vỡ liên kết C-H trong CH₄.\nÁp suất 20 - 30 atm: Dù áp suất cao làm giảm nhẹ hiệu suất cân bằng (vì Δn_g = +2), áp suất này được chọn vì các tháp tổng hợp amoniac hoặc metanol tiếp theo hoạt động ở áp suất cao, tiết kiệm chi phí nén khí syngas hạ nguồn.',
    recyclingPrincipleVI:
      'Phản ứng chuyển dịch khí than (Water-Gas Shift): CO sinh ra tiếp tục phản ứng với hơi nước: CO + H₂O ⇌ CO₂ + H₂ để tối đa hóa lượng H₂ thu được, sau đó CO₂ được hấp thụ bằng dung dịch kiềm amin.',
    historicalContextVI:
      'Phương pháp hiện đại sản xuất hơn 80% sản lượng khí Hiđro công nghiệp trên toàn cầu.'
  },
  {
    id: 'ostwald_oxidation',
    name_vi: 'Oxi hóa Amoniac giai đoạn 1 quy trình Ostwald (Sản xuất Axit Nitric HNO₃)',
    category: 'NITRIC_ACID',
    equation: '4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g)',
    reactants: [
      { formula: 'NH3', name_vi: 'Khí Amoniac', coeff: 4, phase: 'g', molarMass_g_mol: 17.031 },
      { formula: 'O2', name_vi: 'Khí Oxi', coeff: 5, phase: 'g', molarMass_g_mol: 31.999 }
    ],
    products: [
      { formula: 'NO', name_vi: 'Khí Nitơ monoxit', coeff: 4, phase: 'g', molarMass_g_mol: 30.006 },
      { formula: 'H2O', name_vi: 'Hơi nước', coeff: 6, phase: 'g', molarMass_g_mol: 18.015 }
    ],
    standardDeltaH_kJ: -905.2, // Extremely exothermic
    isExothermic: true,
    delta_n_gas: (4 + 6) - (4 + 5), // +1 mol gas
    standardKp298: 1.0e60,
    catalystName_vi: 'Lưới hợp kim Bạch kim - Rođi (Pt-Rh Gauze)',
    catalystComposition: '90% Pt - 10% Rh',
    promoters_vi: 'Dệt dạng lưới nhiều lớp, nung đỏ ở 850 - 900 °C',
    optimalTempRangeC: [850, 920],
    optimalPressureRangeAtm: [1, 4],
    activationEnergyUncat_kJ: 180.0,
    activationEnergyCat_kJ: 60.0,
    pedagogicalRationaleVI:
      'Phản ứng tỏa nhiệt dữ dội (ΔᵣH°₂₉₈ = -905.2 kJ). Cần nhiệt độ cao để duy trì trạng thái nóng đỏ của lưới kim loại quý và thời gian tiếp xúc cực ngắn.',
    compromiseExplanationVI:
      'Thời gian tiếp xúc chớp nhoáng (~10⁻³ giây): Nếu hỗn hợp khí lưu lại quá lâu trên xúc tác ở nhiệt độ cao, khí NO sẽ bị phân hủy tiếp thành N₂ và H₂O, làm mất mát lượng đạm quý giá. Hiệu suất chuyển hóa thành NO đạt >96% ở 850-900 °C.\nÁp suất 1 - 4 atm: Vận hành ở áp suất vừa phải giúp cân bằng kích thước buồng đốt và lưu lượng dòng khí.',
    recyclingPrincipleVI:
      'Làm nguội và oxi hóa tiếp nối: Khí NO ra khỏi buồng đốt được làm lạnh nhanh, hòa trộn thêm không khí để chuyển thành NO₂ màu nâu đỏ (2NO + O₂ ⇌ 2NO₂), sau đó hấp thụ vào nước có sục oxi tạo HNO₃ 65-68%.',
    historicalContextVI:
      'Do Wilhelm Ostwald phát minh năm 1902 (Giải Nobel Hóa học 1909), mở đường cho công nghiệp hóa chất nông nghiệp và quốc phòng.'
  }
];

export class IndustrialReactorEngine {
  /**
   * Calculates equilibrium constant Kp at temperature T (Kelvin) using Van 't Hoff relation:
   * ln(Kp(T) / Kp(T0)) = - (ΔᵣH° / R) * (1/T - 1/T0)
   */
  public static calculateKpAtTemperature(
    standardKp: number,
    deltaH_kJ: number,
    tempKelvin: number
  ): number {
    if (tempKelvin <= 0) {
      throw new Error('Nhiệt độ Kelvin phải lớn hơn 0 K.');
    }
    const deltaH_J = deltaH_kJ * 1000;
    const exponent = -(deltaH_J / R_IDEAL_GAS) * (1 / tempKelvin - 1 / T_REF_KELVIN);
    // Clamp exponent to prevent arithmetic overflow/underflow
    const clampedExponent = Math.max(-100, Math.min(100, exponent));
    return standardKp * Math.exp(clampedExponent);
  }

  /**
   * Calculates Arrhenius reaction rate index (0.0 to 100.0)
   * k(T) = A * exp(-Ea / (R * T))
   */
  public static calculateReactionRateIndex(
    process: IndustrialProcessDef,
    tempKelvin: number,
    hasCatalyst: boolean
  ): number {
    const Ea_kJ = hasCatalyst ? process.activationEnergyCat_kJ : process.activationEnergyUncat_kJ;
    const Ea_J = Ea_kJ * 1000;
    
    // Scale pre-exponential factor A such that catalyzed reaction at optimal temp gives ~85-95
    const refTemp = ((process.optimalTempRangeC[0] + process.optimalTempRangeC[1]) / 2) + 273.15;
    const refRate = Math.exp(-(process.activationEnergyCat_kJ * 1000) / (R_IDEAL_GAS * refTemp));
    const currentRate = Math.exp(-Ea_J / (R_IDEAL_GAS * tempKelvin));

    let relativeRate = (currentRate / (refRate || 1e-10)) * 88.0;
    if (!hasCatalyst) {
      relativeRate = relativeRate * 0.05; // Uncatalyzed is dramatically slower
    }
    return Math.max(0.1, Math.min(100.0, Math.round(relativeRate * 10) / 10));
  }

  /**
   * Calculates Single-Pass Equilibrium Conversion Fraction (0.0 to 1.0)
   * Based on thermodynamic equilibrium and pressure.
   */
  public static calculateSinglePassConversion(
    process: IndustrialProcessDef,
    tempKelvin: number,
    pressureAtm: number,
    hasCatalyst: boolean
  ): number {
    const kp = this.calculateKpAtTemperature(process.standardKp298, process.standardDeltaH_kJ, tempKelvin);
    let alphaEq = 0.5;

    if (process.id === 'haber_bosch') {
      // N2 + 3H2 <=> 2NH3
      // Kp = [alpha^2 * 16 * (2 - alpha)^2] / [27 * (1 - alpha)^4 * P^2]
      // Approximate closed-form inversion with empirical cubic calibration:
      // When T=450C (723K), P=200atm => alpha ~ 0.16-0.20
      // When T=200C (473K), P=200atm => alpha ~ 0.80
      const targetKpP2 = kp * Math.pow(pressureAtm, 2);
      if (targetKpP2 <= 1e-4) {
        alphaEq = 0.01;
      } else if (targetKpP2 >= 1e8) {
        alphaEq = 0.95;
      } else {
        // Log-linear interpolation of conversion for Haber-Bosch
        const logVal = Math.log10(targetKpP2);
        // Sigmoid mapping centered around logVal = 3.5
        alphaEq = 1 / (1 + Math.exp(-(logVal - 2.8) * 0.85));
        alphaEq = Math.max(0.01, Math.min(0.96, alphaEq));
      }
    } else if (process.id === 'contact_so3') {
      // 2SO2 + O2 <=> 2SO3, delta_n = -1
      // Exothermic, high yield at 450C (~0.97)
      const targetVal = kp * pressureAtm;
      if (tempKelvin > 900) {
        alphaEq = 0.40;
      } else if (tempKelvin > 800) {
        alphaEq = 0.85;
      } else {
        alphaEq = 0.98 * (1 - Math.exp(-targetVal * 0.01));
        alphaEq = Math.max(0.05, Math.min(0.99, alphaEq));
      }
    } else if (process.id === 'steam_methane_reforming') {
      // CH4 + H2O <=> CO + 3H2, delta_n = +2, Endothermic
      // At T > 850C (1123K), yield > 85%
      if (tempKelvin < 800) {
        alphaEq = 0.02;
      } else {
        const factor = (tempKelvin - 800) / 400; // 0 at 800K, 1 at 1200K
        alphaEq = Math.max(0.02, Math.min(0.95, 0.90 * factor * Math.pow(25 / Math.max(1, pressureAtm), 0.15)));
      }
    } else if (process.id === 'ostwald_oxidation') {
      // Fast irreversible catalytic oxidation: 4NH3 + 5O2 -> 4NO + 6H2O
      // Optimal at 850-920C
      const tempC = tempKelvin - 273.15;
      if (tempC < 600) {
        alphaEq = 0.20;
      } else if (tempC <= 920) {
        alphaEq = 0.92 + 0.06 * ((tempC - 600) / 320);
      } else {
        // At extreme temperature (>950C), parasitic decomposition reduces NO yield
        alphaEq = Math.max(0.60, 0.98 - 0.001 * (tempC - 920));
      }
    }

    // Kinetic approach factor: Without catalyst, or at low temperature, reaction doesn't reach equilibrium in finite time
    const rateIndex = this.calculateReactionRateIndex(process, tempKelvin, hasCatalyst);
    const kineticFraction = Math.min(1.0, Math.max(0.02, rateIndex / 60.0));
    
    return alphaEq * kineticFraction;
  }

  /**
   * Calculates Overall Conversion with Recycle Stream
   * alpha_overall = alpha / [1 - (1 - alpha) * R_recycle * eta_cool]
   */
  public static calculateOverallConversion(
    singlePassConversion: number,
    recycleRatio: number,
    coolingEfficiency: number
  ): number {
    const alpha = Math.max(0, Math.min(1, singlePassConversion));
    const R = Math.max(0, Math.min(0.98, recycleRatio));
    const eta = Math.max(0, Math.min(1, coolingEfficiency));

    const denominator = 1 - (1 - alpha) * R * eta;
    if (denominator <= 0.001) return 0.999;
    const overall = alpha / denominator;
    return Math.max(alpha, Math.min(0.995, overall));
  }

  /**
   * Calculates Relative Energy Consumption Index (0.0 to 100.0)
   * Combines thermal heating cost + compressor electrical mechanical energy.
   */
  public static calculateEnergyConsumption(
    tempCelsius: number,
    pressureAtm: number
  ): number {
    // Thermal energy required above ambient (25 °C)
    const deltaT = Math.max(0, tempCelsius - 25);
    const thermalCost = Math.min(60, (deltaT / 900) * 60);

    // Mechanical compression power: W_comp \propto ln(P / P0)
    const compressionCost = Math.min(40, (Math.log(Math.max(1, pressureAtm)) / Math.log(300)) * 40);

    return Math.round((thermalCost + compressionCost) * 10) / 10;
  }

  /**
   * Complete Reactor Simulation
   */
  public static simulate(input: ReactorSimulationInput): ReactorSimulationResult {
    const process =
      INDUSTRIAL_PROCESSES.find(p => p.id === input.processId) || INDUSTRIAL_PROCESSES[0];

    const tempKelvin = input.temperatureCelsius + 273.15;
    const pressureAtm = Math.max(1.0, input.pressureAtm);
    const hasCatalyst = input.hasCatalyst;
    const recycleRatio = Math.max(0, Math.min(0.98, input.recycleRatio));
    const coolingEfficiency = Math.max(0, Math.min(1.0, input.coolingEfficiency));

    const effectiveKp = this.calculateKpAtTemperature(
      process.standardKp298,
      process.standardDeltaH_kJ,
      tempKelvin
    );

    const reactionRateIndex = this.calculateReactionRateIndex(process, tempKelvin, hasCatalyst);
    const singlePassFraction = this.calculateSinglePassConversion(
      process,
      tempKelvin,
      pressureAtm,
      hasCatalyst
    );
    const overallFraction = this.calculateOverallConversion(
      singlePassFraction,
      recycleRatio,
      coolingEfficiency
    );

    const singlePassConversionPct = Math.round(singlePassFraction * 1000) / 10;
    const overallConversionPct = Math.round(overallFraction * 1000) / 10;

    const energyConsumption = this.calculateEnergyConsumption(input.temperatureCelsius, pressureAtm);

    // Economic Efficiency Score (0 - 100)
    // High yield + reasonable energy + within safe pressure/temperature
    let economicScore = overallConversionPct * 0.85 - energyConsumption * 0.25 + (hasCatalyst ? 15 : -30);
    if (pressureAtm > 250) economicScore -= 20; // Extreme pressure danger penalty
    if (input.temperatureCelsius > 950) economicScore -= 15; // Material degradation penalty
    economicScore = Math.max(0, Math.min(100, Math.round(economicScore * 10) / 10));

    // Safety warnings
    let safetyWarning: string | undefined;
    if (pressureAtm > 240) {
      safetyWarning = 'CẢNH BÁO QUÁ ÁP: Áp suất > 240 atm tiệm cận giới hạn phá hủy của vỏ thép buồng phản ứng!';
    } else if (input.temperatureCelsius > 950) {
      safetyWarning = 'CẢNH BÁO NHIỆT ĐỘ CỰC HẠN: Nhiệt độ vượt 950 °C gây thiêu kết xúc tác và biến tính kim loại!';
    } else if (!hasCatalyst && reactionRateIndex < 5) {
      safetyWarning = 'BẾ TẮC ĐỘNG HỌC: Không có chất xúc tác, tốc độ phản ứng gần như bằng 0 ở điều kiện này!';
    }

    // Le Chatelier Assessment Text
    let leChatelierAssessmentVI = '';
    const inOptTemp =
      input.temperatureCelsius >= process.optimalTempRangeC[0] &&
      input.temperatureCelsius <= process.optimalTempRangeC[1];
    const inOptP =
      pressureAtm >= process.optimalPressureRangeAtm[0] &&
      pressureAtm <= process.optimalPressureRangeAtm[1];

    if (process.isExothermic) {
      leChatelierAssessmentVI = `Phản ứng tỏa nhiệt (ΔᵣH° = ${process.standardDeltaH_kJ} kJ). Tăng nhiệt độ làm cân bằng dịch chuyển theo chiều NGHỊCH (giảm Kp từ ${process.standardKp298.toExponential(2)} ở 25°C xuống ${effectiveKp.toExponential(2)} ở ${input.temperatureCelsius}°C). `;
    } else {
      leChatelierAssessmentVI = `Phản ứng thu nhiệt (ΔᵣH° = +${process.standardDeltaH_kJ} kJ). Tăng nhiệt độ làm cân bằng dịch chuyển theo chiều THUẬN (tăng Kp lên ${effectiveKp.toExponential(2)}). `;
    }

    if (process.delta_n_gas < 0) {
      leChatelierAssessmentVI += `Số mol khí giảm (${process.delta_n_gas} mol), tăng áp suất (${pressureAtm} atm) làm cân bằng dịch chuyển sang chiều THUẬN.`;
    } else if (process.delta_n_gas > 0) {
      leChatelierAssessmentVI += `Số mol khí tăng (+${process.delta_n_gas} mol), giảm áp suất làm cân bằng dịch chuyển sang chiều THUẬN.`;
    } else {
      leChatelierAssessmentVI += `Số mol khí không đổi (Δn_g = 0), áp suất không ảnh hưởng đến vị trí cân bằng.`;
    }

    // Compromise Assessment
    let compromiseAssessmentVI = '';
    if (inOptTemp && inOptP && hasCatalyst) {
      compromiseAssessmentVI = `TRẠNG THÁI TỐI ƯU CÔNG NGHIỆP: Điều kiện thỏa hiệp hoàn hảo (${input.temperatureCelsius}°C, ${pressureAtm} atm có xúc tác ${process.catalystName_vi}). Cân bằng giữa tốc độ phản ứng nhanh và hiệu suất kinh tế cao nhất!`;
    } else if (!hasCatalyst) {
      compromiseAssessmentVI = `THIẾU XÚC TÁC: Năng lượng hoạt hóa cao (${process.activationEnergyUncat_kJ} kJ/mol). Dù hiệu suất cân bằng lý thuyết có thể cao nhưng thời gian chờ phản ứng quá lâu để khả thi thương mại.`;
    } else if (input.temperatureCelsius < process.optimalTempRangeC[0]) {
      compromiseAssessmentVI = `NHIỆT ĐỘ QUÁ THẤP: Kp cao nhưng động học phản ứng chậm, chất xúc tác chưa được kích hoạt đầy đủ.`;
    } else if (input.temperatureCelsius > process.optimalTempRangeC[1]) {
      compromiseAssessmentVI = `NHIỆT ĐỘ QUÁ CAO: Tốc độ phản ứng rất nhanh nhưng hiệu suất cân bằng giảm sút do phản ứng tỏa nhiệt bị chuyển dịch ngược.`;
    } else {
      compromiseAssessmentVI = `ĐIỀU KIỆN THỬ NGHIỆM: Đang vận hành ngoài dải khuyến nghị công nghiệp tiêu chuẩn.`;
    }

    // Tactical Gameplay Bonus
    let tacticalGameplayBonus: ReactorSimulationResult['tacticalGameplayBonus'];
    if (pressureAtm >= 180) {
      tacticalGameplayBonus = {
        nameVI: 'Quá Áp Khí Động (Pressure Surge)',
        descriptionVI: 'Sức ép khí nén cực lớn tăng 35% sát thương phép nguyên tố Khí trong 2 lượt tới.',
        manaRefundPct: 20,
        powerMultiplier: 1.35,
        tacticalTag: 'PRESSURE_SURGE'
      };
    } else if (hasCatalyst && reactionRateIndex >= 70) {
      tacticalGameplayBonus = {
        nameVI: 'Bùng Nổ Xúc Tác (Catalytic Fury)',
        descriptionVI: 'Xúc tác hoạt tính tối đa giúp giảm 1 Mana cost cho tất cả thẻ bài liên kết trong tay.',
        manaRefundPct: 30,
        powerMultiplier: 1.25,
        tacticalTag: 'CATALYTIC_FURY'
      };
    } else if (recycleRatio >= 0.7) {
      tacticalGameplayBonus = {
        nameVI: 'Vòng Tuần Hoàn Khí (Recycle Stream)',
        descriptionVI: 'Thu hồi 1 lá bài Khí vừa dùng từ Mộ bài trở lại Bộ bài hoặc Tay bài.',
        manaRefundPct: 25,
        powerMultiplier: 1.15,
        tacticalTag: 'RECYCLE_LOOP'
      };
    } else if (inOptTemp && inOptP) {
      tacticalGameplayBonus = {
        nameVI: 'Tổng Hợp Hoàn Hảo (Optimal Synthesis)',
        descriptionVI: 'Kích hoạt trạng thái Điều Hòa Công Nghiệp: Hồi phục 500 LP và tăng 20% ATK toàn sân.',
        manaRefundPct: 35,
        powerMultiplier: 1.30,
        tacticalTag: 'OPTIMAL_SYNTHESIS'
      };
    } else {
      tacticalGameplayBonus = {
        nameVI: 'Duy Trì Áp Suất Thường (Standard Operation)',
        descriptionVI: 'Vận hành ổn định cơ bản, tăng 5% hiệu quả nạp Năng lượng.',
        manaRefundPct: 5,
        powerMultiplier: 1.05,
        tacticalTag: 'PRESSURE_SURGE'
      };
    }

    return {
      process,
      temperatureKelvin: tempKelvin,
      pressureAtm,
      effectiveKp,
      reactionRateIndex,
      singlePassConversionPct,
      overallConversionPct,
      equilibriumShiftDirection: process.isExothermic
        ? (input.temperatureCelsius > 500 ? 'REVERSE' : 'FORWARD')
        : (input.temperatureCelsius > 700 ? 'FORWARD' : 'REVERSE'),
      relativeEnergyConsumptionIndex: energyConsumption,
      economicEfficiencyScore: economicScore,
      safetyWarning,
      leChatelierAssessmentVI,
      compromiseAssessmentVI,
      tacticalGameplayBonus
    };
  }
}
