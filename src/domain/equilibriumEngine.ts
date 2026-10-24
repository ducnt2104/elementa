// src/domain/equilibriumEngine.ts
// Chemical Equilibrium & Le Chatelier's Principle Engine for ELEMENTA
// Strictly conforming to Vietnam GDPT 2018 Grade 11 Chemistry (Chủ đề 1: Cân bằng hóa học) & IUPAC standards

export interface EquilibriumSpecies {
  formula: string;
  name_vi: string;
  coeff: number;
  phase: 'g' | 'aq' | 'l' | 's'; // Solids (s) and pure solvents (l) are omitted from Kc/Qc per IUPAC
}

export interface EquilibriumReactionDef {
  id: string;
  equation: string;
  name_vi: string;
  reactants: EquilibriumSpecies[];
  products: EquilibriumSpecies[];
  standardKc: number; // Equilibrium constant at T = 298.15 K
  delta_r_H298_kJ: number; // Standard reaction enthalpy (\Delta_r H^0_{298}) in kJ/mol
  isExothermic: boolean;
  delta_n_gas: number; // \sum \nu_g(products) - \sum \nu_g(reactants)
  pedagogicalRationaleVI: string;
  observablePhenomenaVI: string;
  curriculumStandard: 'GDPT_2018_HOA_11';
}

export type ShiftDirection = 'FORWARD' | 'REVERSE' | 'EQUILIBRIUM';

export interface EquilibriumEvaluationResult {
  reactionId: string;
  equation: string;
  temperatureKelvin: number;
  pressureAtm: number;
  effectiveKc: number;
  reactionQuotientQc: number;
  shiftDirection: ShiftDirection;
  shiftDirectionVI: string;
  isAtEquilibrium: boolean;
  delta_n_gas: number;
  isExothermic: boolean;
  leChatelierAnalysisVI: string[];
  pedagogicalSummaryVI: string;
  gameplayModifier: {
    statusEffect: 'EQUILIBRIUM_FORWARD_SURGE' | 'EQUILIBRIUM_REVERSE_SUPPRESS' | 'EQUILIBRIUM_HARMONY';
    manaRegenDeltaPct: number;
    atkMultiplier: number;
    descriptionVI: string;
  };
}

export interface PerturbationResult {
  perturbedSpecies: string;
  perturbationType: 'ADD_REACTANT' | 'REMOVE_REACTANT' | 'ADD_PRODUCT' | 'REMOVE_PRODUCT' | 'TEMPERATURE_CHANGE' | 'PRESSURE_CHANGE' | 'ADD_CATALYST';
  shiftDirection: ShiftDirection;
  shiftDirectionVI: string;
  explanationVI: string;
  newEffectiveKc: number;
  kcChanged: boolean;
}

// Universal Gas Constant R in J / (mol * K)
const R_IDEAL_GAS = 8.314;

// Standard Reference Temperature T0 = 298.15 K (25 °C)
const T_STANDARD = 298.15;

/**
 * Standard Curricular Reversible Reactions in GDPT 2018 (Grade 11 Chemistry)
 */
export const CURRICULUM_EQUILIBRIUM_REACTIONS: EquilibriumReactionDef[] = [
  {
    id: 'eq_haber_bosch',
    equation: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)',
    name_vi: 'Tổng hợp khí Amoniac (Quá trình Haber-Bosch)',
    reactants: [
      { formula: 'N2', name_vi: 'Khí Nitơ', coeff: 1, phase: 'g' },
      { formula: 'H2', name_vi: 'Khí Hiđro', coeff: 3, phase: 'g' }
    ],
    products: [
      { formula: 'NH3', name_vi: 'Khí Amoniac', coeff: 2, phase: 'g' }
    ],
    standardKc: 4.1e8, // At 298 K (thermodynamically favorable, though kinetically slow without catalyst)
    delta_r_H298_kJ: -92.0, // Exothermic (\Delta_r H < 0)
    isExothermic: true,
    delta_n_gas: 2 - (1 + 3), // 2 - 4 = -2
    pedagogicalRationaleVI: 'Phản ứng tỏa nhiệt (ΔᵣH°₂₉₈ = -92 kJ). Tăng áp suất chuyển dịch theo chiều thuận (từ 4 mol khí về 2 mol khí). Tăng nhiệt độ làm cân bằng chuyển dịch theo chiều nghịch.',
    observablePhenomenaVI: 'Khí không màu, khi chuyển dịch chiều thuận sinh ra khí NH3 mùi xốc đặc trưng làm xanh giấy quỳ ẩm.',
    curriculumStandard: 'GDPT_2018_HOA_11'
  },
  {
    id: 'eq_no2_dimerization',
    equation: '2NO₂(g) ⇌ N₂O₄(g)',
    name_vi: 'Cân bằng Đime hóa Nitrogen Dioxide',
    reactants: [
      { formula: 'NO2', name_vi: 'Khí Nito đioxit (màu nâu đỏ)', coeff: 2, phase: 'g' }
    ],
    products: [
      { formula: 'N2O4', name_vi: 'Khí Đinitơ tetraoxit (không màu)', coeff: 1, phase: 'g' }
    ],
    standardKc: 170.0, // At 298 K
    delta_r_H298_kJ: -57.2, // Exothermic (\Delta_r H < 0)
    isExothermic: true,
    delta_n_gas: 1 - 2, // -1
    pedagogicalRationaleVI: 'Cân bằng kinh điển GDPT 2018: 2NO2 (nâu đỏ) ⇌ N2O4 (không màu). Ngâm bình vào nước đá (hạ nhiệt độ) làm chuyển dịch theo chiều tỏa nhiệt (chiều thuận), màu nâu đỏ nhạt dần. Ngâm nước nóng làm chuyển dịch chiều nghịch, màu đậm lên.',
    observablePhenomenaVI: 'Màu nâu đỏ đậm lên khi tăng nhiệt độ (chiều nghịch), nhạt dần sang không màu khi hạ nhiệt độ hoặc nén pit-tông (tăng áp suất).',
    curriculumStandard: 'GDPT_2018_HOA_11'
  },
  {
    id: 'eq_contact_so3',
    equation: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)',
    name_vi: 'Oxi hóa SO2 trong quy trình Tiếp xúc (Sản xuất H2SO4)',
    reactants: [
      { formula: 'SO2', name_vi: 'Khí Lưu huỳnh đioxit', coeff: 2, phase: 'g' },
      { formula: 'O2', name_vi: 'Khí Oxi', coeff: 1, phase: 'g' }
    ],
    products: [
      { formula: 'SO3', name_vi: 'Khí Lưu huỳnh trioxit', coeff: 2, phase: 'g' }
    ],
    standardKc: 4.0e24, // Highly exothermic at room temp
    delta_r_H298_kJ: -198.0,
    isExothermic: true,
    delta_n_gas: 2 - (2 + 1), // 2 - 3 = -1
    pedagogicalRationaleVI: 'Giai đoạn cốt lõi trong sản xuất H2SO4. Xúc tác V2O5 giúp đạt cân bằng nhanh ở 450°C. Tăng áp suất nhẹ và dùng dư O2 giúp nâng cao hiệu suất chuyển hóa SO2.',
    observablePhenomenaVI: 'Khí SO2 mùi hắc chuyển hóa thành làn khói SO3 dễ ngưng tụ thành chất lỏng không màu.',
    curriculumStandard: 'GDPT_2018_HOA_11'
  },
  {
    id: 'eq_hi_synthesis',
    equation: 'H₂(g) + I₂(g) ⇌ 2HI(g)',
    name_vi: 'Phản ứng Tổng hợp Hydro Iodua',
    reactants: [
      { formula: 'H2', name_vi: 'Khí Hiđro', coeff: 1, phase: 'g' },
      { formula: 'I2', name_vi: 'Hơi Iot (tím)', coeff: 1, phase: 'g' }
    ],
    products: [
      { formula: 'HI', name_vi: 'Khí Hiđro iotua', coeff: 2, phase: 'g' }
    ],
    standardKc: 54.0, // At ~700 K (approx 800 at 298 K)
    delta_r_H298_kJ: -9.6,
    isExothermic: true,
    delta_n_gas: 2 - (1 + 1), // 0
    pedagogicalRationaleVI: 'Vì số mol khí hai vế bằng nhau (Δn_g = 0), sự biến đổi áp suất hay thể tích bình hoàn toàn KHÔNG làm chuyển dịch cân bằng này.',
    observablePhenomenaVI: 'Hơi màu tím của I2 nhạt dần khi chuyển dịch theo chiều thuận tạo khí HI không màu.',
    curriculumStandard: 'GDPT_2018_HOA_11'
  },
  {
    id: 'eq_esterification',
    equation: 'CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l)',
    name_vi: 'Phản ứng Este hóa giữa Axit Axetic và Rượu Etylic',
    reactants: [
      { formula: 'CH3COOH', name_vi: 'Axit axetic', coeff: 1, phase: 'l' },
      { formula: 'C2H5OH', name_vi: 'Etanol', coeff: 1, phase: 'l' }
    ],
    products: [
      { formula: 'CH3COOC2H5', name_vi: 'Etyl axetat', coeff: 1, phase: 'l' },
      { formula: 'H2O', name_vi: 'Nước', coeff: 1, phase: 'l' }
    ],
    standardKc: 4.0, // In non-aqueous organic media
    delta_r_H298_kJ: -2.9, // Nearly thermoneutral
    isExothermic: true,
    delta_n_gas: 0,
    pedagogicalRationaleVI: 'Cân bằng este hóa trong pha lỏng. Hằng số Kc xấp xỉ 4. Dùng H2SO4 đặc vừa làm xúc tác vừa hút nước, làm cân bằng chuyển dịch mạnh sang chiều tạo este có mùi thơm hoa quả.',
    observablePhenomenaVI: 'Hỗn hợp phân lớp tạo chất lỏng este nhẹ hơn nước, nổi lên trên và tỏa mùi chuối chín/táo ngọt nhẹ.',
    curriculumStandard: 'GDPT_2018_HOA_11'
  },
  {
    id: 'eq_caco3_calcination',
    equation: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)',
    name_vi: 'Nung vôi (Nhiệt phân Canxi cacbonat)',
    reactants: [
      { formula: 'CaCO3', name_vi: 'Đá vôi canxi cacbonat', coeff: 1, phase: 's' }
    ],
    products: [
      { formula: 'CaO', name_vi: 'Vôi sống canxi oxit', coeff: 1, phase: 's' },
      { formula: 'CO2', name_vi: 'Khí cacbonic', coeff: 1, phase: 'g' }
    ],
    standardKc: 1.6e-23, // Extremely small at 298 K; requires T > 900 °C (1200 K)
    delta_r_H298_kJ: 178.0, // Endothermic (\Delta_r H > 0)
    isExothermic: false,
    delta_n_gas: 1 - 0, // 1 mol gas
    pedagogicalRationaleVI: 'Cân bằng dị thể (heterogeneous equilibrium). Vì CaCO3 và CaO là chất rắn (hoạt độ = 1), biểu thức Kc = [CO2]. Phản ứng thu nhiệt mạnh nên cần nung ở 900-1000°C và mở nắp lò để CO2 thoát đi, làm phản ứng xảy ra hoàn toàn.',
    observablePhenomenaVI: 'Đá vôi cứng nung đỏ chuyển thành bột vôi sống CaO màu trắng, sủi bọt tỏa nhiệt mạnh khi tôi vào nước.',
    curriculumStandard: 'GDPT_2018_HOA_11'
  }
];

export class EquilibriumEngine {
  /**
   * Adjusts the Equilibrium Constant Kc at Temperature T using the Van 't Hoff Equation:
   * ln(Kc(T) / Kc(T0)) = - (\Delta_r H^0 / R) * (1/T - 1/T0)
   */
  public static calculateKcAtTemperature(
    standardKc: number,
    delta_r_H298_kJ: number,
    temperatureKelvin: number
  ): number {
    if (temperatureKelvin <= 0) {
      throw new Error('Nhiệt độ Kelvin phải lớn hơn 0 K.');
    }
    if (Math.abs(temperatureKelvin - T_STANDARD) < 1e-4) {
      return standardKc;
    }

    const deltaH_J = delta_r_H298_kJ * 1000;
    const exponent = -(deltaH_J / R_IDEAL_GAS) * ((1 / temperatureKelvin) - (1 / T_STANDARD));

    // Clamp exponent to prevent numerical overflow
    if (exponent > 100) return standardKc * Math.exp(100);
    if (exponent < -100) return standardKc * Math.exp(-100);

    return standardKc * Math.exp(exponent);
  }

  /**
   * Computes the Reaction Quotient Qc from current concentrations:
   * Qc = \frac{\prod [P_i]^{\nu_i}}{\prod [R_j]^{\nu_j}}
   * Solids (phase 's') and pure solvents (when not reacting solute) have activity = 1 and are omitted per IUPAC.
   */
  public static calculateReactionQuotient(
    reaction: EquilibriumReactionDef,
    concentrations: Record<string, number>
  ): number {
    let numerator = 1.0;
    let denominator = 1.0;

    // Calculate numerator from products (excluding solids)
    for (const prod of reaction.products) {
      if (prod.phase === 's') continue;
      const conc = concentrations[prod.formula] ?? 0;
      if (conc <= 0) {
        numerator = 0;
        break;
      }
      numerator *= Math.pow(conc, prod.coeff);
    }

    // Calculate denominator from reactants (excluding solids)
    for (const react of reaction.reactants) {
      if (react.phase === 's') continue;
      const conc = concentrations[react.formula] ?? 0;
      if (conc <= 0) {
        denominator = 0;
        break;
      }
      denominator *= Math.pow(conc, react.coeff);
    }

    if (denominator === 0) {
      return numerator === 0 ? 1.0 : Number.POSITIVE_INFINITY;
    }

    return numerator / denominator;
  }

  /**
   * Evaluates the comprehensive chemical state against Le Chatelier's Principle.
   */
  public static evaluateEquilibriumState(
    reaction: EquilibriumReactionDef,
    currentConcentrations: Record<string, number>,
    temperatureKelvin: number = 298.15,
    pressureAtm: number = 1.0
  ): EquilibriumEvaluationResult {
    const effectiveKc = this.calculateKcAtTemperature(
      reaction.standardKc,
      reaction.delta_r_H298_kJ,
      temperatureKelvin
    );
    const Qc = this.calculateReactionQuotient(reaction, currentConcentrations);

    // Determine shift direction by comparing Qc to effectiveKc
    let shiftDirection: ShiftDirection = 'EQUILIBRIUM';
    let shiftDirectionVI = 'Hệ đang ở trạng thái cân bằng động (Qc = Kc)';

    const relativeDiff = effectiveKc > 0 ? Math.abs(Qc - effectiveKc) / effectiveKc : 0;

    if (relativeDiff < 0.05) {
      shiftDirection = 'EQUILIBRIUM';
      shiftDirectionVI = 'Hệ đạt trạng thái cân bằng động (Qc ≈ Kc). Tốc độ phản ứng thuận bằng tốc độ phản ứng nghịch.';
    } else if (Qc < effectiveKc) {
      shiftDirection = 'FORWARD';
      shiftDirectionVI = 'Cân bằng chuyển dịch theo CHIỀU THUẬN (tạo thêm sản phẩm) để đưa Qc tăng lên bằng Kc.';
    } else {
      shiftDirection = 'REVERSE';
      shiftDirectionVI = 'Cân bằng chuyển dịch theo CHIỀU NGHỊCH (tạo thêm chất đầu) để đưa Qc giảm xuống bằng Kc.';
    }

    const leChatelierAnalysisVI: string[] = [];

    // Temperature analysis
    if (temperatureKelvin !== T_STANDARD) {
      const deltaT = temperatureKelvin - T_STANDARD;
      if (deltaT > 0) {
        if (reaction.isExothermic) {
          leChatelierAnalysisVI.push(
            `Nhiệt độ hiện tại (${(temperatureKelvin - 273.15).toFixed(1)}°C) cao hơn chuẩn (25°C). Vì phản ứng tỏa nhiệt (ΔᵣH° < 0), tăng nhiệt độ làm Kc giảm và cân bằng chuyển dịch theo CHIỀU NGHỊCH (thu nhiệt).`
          );
        } else {
          leChatelierAnalysisVI.push(
            `Nhiệt độ hiện tại (${(temperatureKelvin - 273.15).toFixed(1)}°C) cao hơn chuẩn (25°C). Vì phản ứng thu nhiệt (ΔᵣH° > 0), tăng nhiệt độ làm Kc tăng và cân bằng chuyển dịch theo CHIỀU THUẬN.`
          );
        }
      } else {
        if (reaction.isExothermic) {
          leChatelierAnalysisVI.push(
            `Nhiệt độ hiện tại (${(temperatureKelvin - 273.15).toFixed(1)}°C) thấp hơn chuẩn (25°C). Hạ nhiệt độ làm cân bằng chuyển dịch theo chiều TỎA NHIỆT (chiều thuận), làm Kc tăng.`
          );
        } else {
          leChatelierAnalysisVI.push(
            `Nhiệt độ hiện tại (${(temperatureKelvin - 273.15).toFixed(1)}°C) thấp hơn chuẩn (25°C). Hạ nhiệt độ làm cân bằng chuyển dịch theo chiều NGHỊCH.`
          );
        }
      }
    }

    // Pressure analysis
    if (reaction.delta_n_gas !== 0 && pressureAtm !== 1.0) {
      if (pressureAtm > 1.0) {
        if (reaction.delta_n_gas < 0) {
          leChatelierAnalysisVI.push(
            `Áp suất cao (${pressureAtm.toFixed(1)} atm > 1 atm). Cân bằng chuyển dịch theo chiều làm giảm số mol khí (Δn_g = ${reaction.delta_n_gas}), tức là CHIỀU THUẬN.`
          );
        } else {
          leChatelierAnalysisVI.push(
            `Áp suất cao (${pressureAtm.toFixed(1)} atm > 1 atm). Cân bằng chuyển dịch theo chiều làm giảm số mol khí (Δn_g = +${reaction.delta_n_gas}), tức là CHIỀU NGHỊCH.`
          );
        }
      } else {
        if (reaction.delta_n_gas < 0) {
          leChatelierAnalysisVI.push(
            `Áp suất giảm (${pressureAtm.toFixed(1)} atm < 1 atm). Cân bằng chuyển dịch theo chiều làm tăng số mol khí, tức là CHIỀU NGHỊCH.`
          );
        } else {
          leChatelierAnalysisVI.push(
            `Áp suất giảm (${pressureAtm.toFixed(1)} atm < 1 atm). Cân bằng chuyển dịch theo CHIỀU THUẬN.`
          );
        }
      }
    } else if (reaction.delta_n_gas === 0 && pressureAtm !== 1.0) {
      leChatelierAnalysisVI.push(
        `Số mol khí hai vế bằng nhau (Δn_g = 0). Sự thay đổi áp suất (${pressureAtm.toFixed(1)} atm) KHÔNG làm chuyển dịch cân bằng.`
      );
    }

    const isAtEquilibrium = shiftDirection === 'EQUILIBRIUM';
    const pedagogicalSummaryVI = isAtEquilibrium
      ? `Hệ đang đạt trạng thái cân bằng hoàn hảo (Qc = ${Qc.toExponential(2)} ≈ Kc = ${effectiveKc.toExponential(2)}).`
      : `Theo nguyên lý Le Chatelier: ${shiftDirectionVI} (Qc = ${Qc.toExponential(2)}, Kc = ${effectiveKc.toExponential(2)}).`;

    // Gameplay modifiers for Duel and MOBA integration
    let statusEffect: 'EQUILIBRIUM_FORWARD_SURGE' | 'EQUILIBRIUM_REVERSE_SUPPRESS' | 'EQUILIBRIUM_HARMONY' = 'EQUILIBRIUM_HARMONY';
    let manaRegenDeltaPct = 0;
    let atkMultiplier = 1.0;
    let descriptionVI = 'Cân bằng động ổn định. Tốc độ hai chiều hài hòa.';

    if (shiftDirection === 'FORWARD') {
      statusEffect = 'EQUILIBRIUM_FORWARD_SURGE';
      manaRegenDeltaPct = 25;
      atkMultiplier = 1.15;
      descriptionVI = 'Chuyển dịch chiều thuận mạnh mẽ: Tăng 25% tốc độ hồi mana và 15% uy lực công kích hóa học!';
    } else if (shiftDirection === 'REVERSE') {
      statusEffect = 'EQUILIBRIUM_REVERSE_SUPPRESS';
      manaRegenDeltaPct = -15;
      atkMultiplier = 0.90;
      descriptionVI = 'Chuyển dịch chiều nghịch cản trở: Giảm 15% hồi mana và 10% uy lực công kích.';
    }

    return {
      reactionId: reaction.id,
      equation: reaction.equation,
      temperatureKelvin,
      pressureAtm,
      effectiveKc,
      reactionQuotientQc: Qc,
      shiftDirection,
      shiftDirectionVI,
      isAtEquilibrium,
      delta_n_gas: reaction.delta_n_gas,
      isExothermic: reaction.isExothermic,
      leChatelierAnalysisVI,
      pedagogicalSummaryVI,
      gameplayModifier: {
        statusEffect,
        manaRegenDeltaPct,
        atkMultiplier,
        descriptionVI
      }
    };
  }

  /**
   * Simulates external perturbation according to Le Chatelier's Principle.
   */
  public static simulatePerturbation(
    reaction: EquilibriumReactionDef,
    perturbation: {
      type: 'CONCENTRATION' | 'TEMPERATURE' | 'PRESSURE' | 'CATALYST';
      species?: string;
      deltaConcentration?: number; // Positive = added, negative = removed
      deltaTemperatureCelsius?: number;
      deltaPressureAtm?: number;
    }
  ): PerturbationResult {
    let shiftDirection: ShiftDirection = 'EQUILIBRIUM';
    let shiftDirectionVI = '';
    let explanationVI = '';
    let kcChanged = false;
    let newEffectiveKc = reaction.standardKc;
    let perturbationType: PerturbationResult['perturbationType'] = 'ADD_REACTANT';

    if (perturbation.type === 'CONCENTRATION' && perturbation.species && perturbation.deltaConcentration !== undefined) {
      const isReactant = reaction.reactants.some(r => r.formula === perturbation.species);
      const isProduct = reaction.products.some(p => p.formula === perturbation.species);

      if (isReactant) {
        if (perturbation.deltaConcentration > 0) {
          perturbationType = 'ADD_REACTANT';
          shiftDirection = 'FORWARD';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU THUẬN';
          explanationVI = `Thêm chất phản ứng ${perturbation.species} (tăng nồng độ). Cân bằng chuyển dịch theo chiều thuận để tiêu thụ bớt ${perturbation.species}. Hằng số Kc không đổi.`;
        } else {
          perturbationType = 'REMOVE_REACTANT';
          shiftDirection = 'REVERSE';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU NGHỊCH';
          explanationVI = `Giảm nồng độ chất phản ứng ${perturbation.species}. Cân bằng chuyển dịch theo chiều nghịch để bù đắp ${perturbation.species}. Hằng số Kc không đổi.`;
        }
      } else if (isProduct) {
        if (perturbation.deltaConcentration > 0) {
          perturbationType = 'ADD_PRODUCT';
          shiftDirection = 'REVERSE';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU NGHỊCH';
          explanationVI = `Thêm sản phẩm ${perturbation.species} (tăng nồng độ). Cân bằng chuyển dịch theo chiều nghịch để tiêu thụ bớt ${perturbation.species}. Hằng số Kc không đổi.`;
        } else {
          perturbationType = 'REMOVE_PRODUCT';
          shiftDirection = 'FORWARD';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU THUẬN';
          explanationVI = `Tách bớt sản phẩm ${perturbation.species} ra khỏi hệ. Cân bằng chuyển dịch theo chiều thuận để tái tạo thêm ${perturbation.species}. Hằng số Kc không đổi.`;
        }
      }
    } else if (perturbation.type === 'TEMPERATURE' && perturbation.deltaTemperatureCelsius !== undefined) {
      perturbationType = 'TEMPERATURE_CHANGE';
      kcChanged = true;
      const targetT = T_STANDARD + perturbation.deltaTemperatureCelsius;
      newEffectiveKc = this.calculateKcAtTemperature(reaction.standardKc, reaction.delta_r_H298_kJ, targetT);

      if (perturbation.deltaTemperatureCelsius > 0) {
        if (reaction.isExothermic) {
          shiftDirection = 'REVERSE';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU NGHỊCH';
          explanationVI = `Tăng nhiệt độ (+${perturbation.deltaTemperatureCelsius}°C). Vì phản ứng tỏa nhiệt (ΔᵣH° < 0), cân bằng chuyển dịch theo chiều thu nhiệt (chiều nghịch). Hằng số Kc GIẢM từ ${reaction.standardKc.toExponential(2)} xuống ${newEffectiveKc.toExponential(2)}.`;
        } else {
          shiftDirection = 'FORWARD';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU THUẬN';
          explanationVI = `Tăng nhiệt độ (+${perturbation.deltaTemperatureCelsius}°C). Vì phản ứng thu nhiệt (ΔᵣH° > 0), cân bằng chuyển dịch theo chiều thuận. Hằng số Kc TĂNG từ ${reaction.standardKc.toExponential(2)} lên ${newEffectiveKc.toExponential(2)}.`;
        }
      } else {
        if (reaction.isExothermic) {
          shiftDirection = 'FORWARD';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU THUẬN';
          explanationVI = `Hạ nhiệt độ (${perturbation.deltaTemperatureCelsius}°C). Cân bằng chuyển dịch theo chiều tỏa nhiệt (chiều thuận). Hằng số Kc TĂNG từ ${reaction.standardKc.toExponential(2)} lên ${newEffectiveKc.toExponential(2)}.`;
        } else {
          shiftDirection = 'REVERSE';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU NGHỊCH';
          explanationVI = `Hạ nhiệt độ (${perturbation.deltaTemperatureCelsius}°C). Cân bằng chuyển dịch theo chiều nghịch. Hằng số Kc GIẢM từ ${reaction.standardKc.toExponential(2)} xuống ${newEffectiveKc.toExponential(2)}.`;
        }
      }
    } else if (perturbation.type === 'PRESSURE' && perturbation.deltaPressureAtm !== undefined) {
      perturbationType = 'PRESSURE_CHANGE';
      if (reaction.delta_n_gas === 0) {
        shiftDirection = 'EQUILIBRIUM';
        shiftDirectionVI = 'KHÔNG CHUYỂN DỊCH';
        explanationVI = `Số mol khí ở hai vế bằng nhau (Δn_g = 0). Áp suất thay đổi KHÔNG làm chuyển dịch cân bằng. Kc không đổi.`;
      } else if (perturbation.deltaPressureAtm > 0) {
        if (reaction.delta_n_gas < 0) {
          shiftDirection = 'FORWARD';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU THUẬN';
          explanationVI = `Tăng áp suất (+${perturbation.deltaPressureAtm} atm). Cân bằng chuyển dịch về phía có số mol khí ít hơn (Δn_g = ${reaction.delta_n_gas}), tức là chiều thuận. Kc không đổi.`;
        } else {
          shiftDirection = 'REVERSE';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU NGHỊCH';
          explanationVI = `Tăng áp suất (+${perturbation.deltaPressureAtm} atm). Cân bằng chuyển dịch về phía có số mol khí ít hơn, tức là chiều nghịch. Kc không đổi.`;
        }
      } else {
        if (reaction.delta_n_gas < 0) {
          shiftDirection = 'REVERSE';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU NGHỊCH';
          explanationVI = `Giảm áp suất (${perturbation.deltaPressureAtm} atm). Cân bằng chuyển dịch về phía có nhiều mol khí hơn (chiều nghịch). Kc không đổi.`;
        } else {
          shiftDirection = 'FORWARD';
          shiftDirectionVI = 'Chuyển dịch theo CHIỀU THUẬN';
          explanationVI = `Giảm áp suất (${perturbation.deltaPressureAtm} atm). Cân bằng chuyển dịch theo chiều thuận. Kc không đổi.`;
        }
      }
    } else if (perturbation.type === 'CATALYST') {
      perturbationType = 'ADD_CATALYST';
      shiftDirection = 'EQUILIBRIUM';
      shiftDirectionVI = 'KHÔNG CHUYỂN DỊCH CÂN BẰNG';
      explanationVI = `Chất xúc tác làm tăng tốc độ phản ứng thuận và nghịch với mức độ như nhau, giúp hệ nhanh đạt đến trạng thái cân bằng hơn mà KHÔNG làm chuyển dịch trạng thái cân bằng và KHÔNG làm biến đổi hằng số Kc.`;
    }

    return {
      perturbedSpecies: perturbation.species || 'Hệ phản ứng',
      perturbationType,
      shiftDirection,
      shiftDirectionVI,
      explanationVI,
      newEffectiveKc,
      kcChanged
    };
  }
}
