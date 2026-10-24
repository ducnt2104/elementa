// src/domain/chemicalEnvironment.ts
// Comprehensive Dynamic Chemical Environment Engine for ELEMENTA
// Grounded in IUPAC Thermodynamics, Le Chatelier's Principle, Henderson-Hasselbalch Buffer Theory, and Arrhenius Kinetics

export type SolventType = 'WATER' | 'ETHANOL' | 'BENZENE' | 'MOLTEN_SALT';
export type LightExposure = 'DARK' | 'AMBIENT' | 'UV_INTENSE';
export type BufferType = 'NONE' | 'ACIDIC_ACETATE' | 'BASIC_AMMONIA' | 'BICARBONATE_PHYSIO';

export interface ChemicalEnvironmentState {
  ph: number;                      // 0.0 to 14.0, default 7.0 (neutral at 25°C)
  temperature: number;             // Kelvin (default 298.15 K = 25°C)
  pressure: number;                // atm (default 1.0 atm)
  bufferCapacity: number;          // 0 to 10 charges remaining
  bufferType: BufferType;
  activeCatalysts: string[];       // e.g. ['Pt', 'Fe', 'MnO2', 'H2SO4']
  activeInhibitors: string[];      // e.g. ['Pb', 'HCN', 'CO']
  solvent: SolventType;
  redoxPotential: number;          // Volts (e.g. +0.80V oxidizing, -0.40V reducing)
  lightExposure: LightExposure;
  activeEnvironmentCardId?: string;
  environmentCardName?: string;
  turnsRemaining?: number;
}

export interface UniversalIndicatorData {
  phRange: string;
  label: string;
  hex: string;
  glowHex: string;
  bgClass: string;
  textClass: string;
  description: string;
}

export class ChemicalEnvironmentEngine {
  /**
   * Default baseline chemical environment (Standard Ambient Temperature and Pressure - SATP)
   */
  public static createDefaultEnvironment(): ChemicalEnvironmentState {
    return {
      ph: 7.0,
      temperature: 298.15, // 25°C
      pressure: 1.0,       // 1.0 atm
      bufferCapacity: 0,
      bufferType: 'NONE',
      activeCatalysts: [],
      activeInhibitors: [],
      solvent: 'WATER',
      redoxPotential: 0.0,
      lightExposure: 'AMBIENT',
      turnsRemaining: undefined
    };
  }

  /**
   * Determine Universal Indicator Color & Classification according to IUPAC pH scale
   */
  public static getUniversalIndicatorData(ph: number): UniversalIndicatorData {
    if (ph <= 2.5) {
      return {
        phRange: 'pH 0 - 2.5',
        label: 'Axit Rất Mạnh (Strong Acid)',
        hex: '#ef4444',
        glowHex: 'rgba(239, 68, 68, 0.6)',
        bgClass: 'bg-red-950 border-red-500 text-red-200',
        textClass: 'text-red-400',
        description: 'Môi trường giàu ion H⁺ (hoạt độ H₃O⁺ cực cao), ăn mòn mạnh kim loại và phân hủy muối cacbonat.'
      };
    } else if (ph < 6.0) {
      return {
        phRange: 'pH 2.6 - 5.9',
        label: 'Axit Yếu / Vừa (Weak Acid)',
        hex: '#f59e0b',
        glowHex: 'rgba(245, 158, 11, 0.6)',
        bgClass: 'bg-amber-950 border-amber-500 text-amber-200',
        textClass: 'text-amber-400',
        description: 'Môi trường axit nhẹ, kích thích tốc độ phản ứng oxi hóa của một số kim loại kiềm và kiềm thổ.'
      };
    } else if (ph <= 8.0) {
      return {
        phRange: 'pH 6.0 - 8.0',
        label: 'Môi Trường Trung Tính (Neutral)',
        hex: '#10b981',
        glowHex: 'rgba(16, 185, 129, 0.6)',
        bgClass: 'bg-emerald-950 border-emerald-500 text-emerald-200',
        textClass: 'text-emerald-400',
        description: 'Cân bằng ion H⁺ và OH⁻ ổn định (Kw = 10⁻¹⁴ ở 25°C). Không ăn mòn, phù hợp đa dạng chất sinh học.'
      };
    } else if (ph <= 11.5) {
      return {
        phRange: 'pH 8.1 - 11.5',
        label: 'Bazơ Yếu / Vừa (Weak Base)',
        hex: '#06b6d4',
        glowHex: 'rgba(6, 182, 212, 0.6)',
        bgClass: 'bg-cyan-950 border-cyan-500 text-cyan-200',
        textClass: 'text-cyan-400',
        description: 'Nồng độ OH⁻ vượt trội, thúc đẩy tạo kết tủa hydroxide của các cation kim loại chuyển tiếp.'
      };
    } else {
      return {
        phRange: 'pH 11.6 - 14.0',
        label: 'Bazơ Rất Mạnh (Strong Alkali)',
        hex: '#8b5cf6',
        glowHex: 'rgba(139, 92, 246, 0.6)',
        bgClass: 'bg-purple-950 border-purple-500 text-purple-200',
        textClass: 'text-purple-400',
        description: 'Môi trường kiềm đậm đặc, hòa tan các kim loại lưỡng tính (Al, Zn) thành phức chất aluminate/zincate.'
      };
    }
  }

  /**
   * Apply pH perturbation with buffer resistance (Henderson-Hasselbalch principle)
   */
  public static applyPhShift(
    currentEnv: ChemicalEnvironmentState,
    requestedDeltaPh: number
  ): { newEnv: ChemicalEnvironmentState; buffered: boolean; message: string } {
    const updated = { ...currentEnv };

    if (updated.bufferCapacity > 0) {
      // Buffer absorbs 75% of the shock
      const actualDelta = requestedDeltaPh * 0.25;
      updated.ph = Math.max(0, Math.min(14, Number((updated.ph + actualDelta).toFixed(2))));
      updated.bufferCapacity -= 1;
      
      const message = `[Hệ Đệm ${updated.bufferType}] Hấp thụ 75% biến thiên pH! pH chỉ lệch ${actualDelta > 0 ? '+' : ''}${actualDelta.toFixed(2)} (Còn ${updated.bufferCapacity} lượt đệm).`;
      return { newEnv: updated, buffered: true, message };
    }

    updated.ph = Math.max(0, Math.min(14, Number((updated.ph + requestedDeltaPh).toFixed(2))));
    const message = `Môi trường không có đệm: pH biến thiên trực tiếp ${requestedDeltaPh > 0 ? '+' : ''}${requestedDeltaPh.toFixed(2)} (Hiện tại: pH ${updated.ph}).`;
    return { newEnv: updated, buffered: false, message };
  }

  /**
   * Apply Le Chatelier's Principle for Gaseous Equilibrium under Pressure Changes
   * N2(g) + 3H2(g) <=> 2NH3(g) (Δn_gas = 2 - 4 = -2)
   */
  public static calculateLeChatelierGasShift(
    deltaMolesGas: number,
    isPressureIncreased: boolean
  ): {
    shiftDirection: 'FORWARD' | 'REVERSE' | 'NO_SHIFT';
    yieldMultiplier: number;
    scientificLore: string;
  } {
    if (deltaMolesGas === 0) {
      return {
        shiftDirection: 'NO_SHIFT',
        yieldMultiplier: 1.0,
        scientificLore: 'Định luật Le Chatelier: Phản ứng có tổng số mol khí hai vế bằng nhau (Δn_gas = 0), áp suất thay đổi không làm chuyển dịch cân bằng!'
      };
    }

    if (isPressureIncreased) {
      if (deltaMolesGas < 0) {
        // High pressure shifts towards fewer moles of gas (forward)
        return {
          shiftDirection: 'FORWARD',
          yieldMultiplier: 1.45,
          scientificLore: `Tăng áp suất (nén hệ): Cân bằng chuyển dịch theo chiều thuận (tạo ít phân tử khí hơn, Δn = ${deltaMolesGas}), tăng hiệu suất tổng hợp +45%!`
        };
      } else {
        // High pressure shifts towards fewer moles of gas (reverse)
        return {
          shiftDirection: 'REVERSE',
          yieldMultiplier: 0.65,
          scientificLore: `Tăng áp suất (nén hệ): Cân bằng chuyển dịch nghịch về phía có ít mol khí hơn (giảm hiệu suất sản phẩm khí).`
        };
      }
    } else {
      // Pressure decreased
      if (deltaMolesGas < 0) {
        return {
          shiftDirection: 'REVERSE',
          yieldMultiplier: 0.70,
          scientificLore: `Giảm áp suất (giãn nở): Cân bằng dịch chuyển theo chiều nghịch về phía có nhiều mol khí hơn.`
        };
      } else {
        return {
          shiftDirection: 'FORWARD',
          yieldMultiplier: 1.35,
          scientificLore: `Giảm áp suất: Cân bằng chuyển dịch theo chiều thuận tạo nhiều chất khí hơn (Δn = +${deltaMolesGas}).`
        };
      }
    }
  }

  /**
   * Van 't Hoff Isochore & Arrhenius Kinetics: Effect of Temperature on Equilibrium and Rate
   */
  public static calculateThermalEffect(
    deltaH_kJ: number,
    newTempKelvin: number,
    baseTempKelvin: number = 298.15
  ): {
    equilibriumShift: 'FORWARD' | 'REVERSE' | 'NO_SHIFT';
    kineticBoost: number;
    pedagogicalExplanation: string;
  } {
    const tempDifference = newTempKelvin - baseTempKelvin;
    // Arrhenius: Rate increases with T regardless of sign of ΔH
    const kineticBoost = Math.max(0.5, Math.min(3.0, 1.0 + (tempDifference / 100) * 0.3));

    if (deltaH_kJ === 0) {
      return {
        equilibriumShift: 'NO_SHIFT',
        kineticBoost,
        pedagogicalExplanation: `Phản ứng có ΔH = 0: Nhiệt độ không làm chuyển dịch vị trí cân bằng, nhưng động học tăng ${((kineticBoost - 1) * 100).toFixed(0)}%.`
      };
    }

    if (tempDifference > 0) {
      // Heating
      if (deltaH_kJ > 0) {
        // Endothermic reaction absorbs heat: heating shifts forward
        return {
          equilibriumShift: 'FORWARD',
          kineticBoost,
          pedagogicalExplanation: `Phản ứng thu nhiệt (ΔH = +${deltaH_kJ} kJ/mol > 0): Cung cấp nhiệt lượng thúc đẩy cân bằng chuyển dịch theo chiều thuận!`
        };
      } else {
        // Exothermic reaction releases heat: heating shifts reverse
        return {
          equilibriumShift: 'REVERSE',
          kineticBoost,
          pedagogicalExplanation: `Phản ứng tỏa nhiệt (ΔH = ${deltaH_kJ} kJ/mol < 0): Tăng nhiệt độ làm cân bằng chuyển dịch theo chiều nghịch để giải tỏa nhiệt!`
        };
      }
    } else {
      // Cooling
      if (deltaH_kJ < 0) {
        // Cooling favours exothermic
        return {
          equilibriumShift: 'FORWARD',
          kineticBoost,
          pedagogicalExplanation: `Hạ nhiệt độ làm lạnh: Thúc đẩy phản ứng tỏa nhiệt (ΔH = ${deltaH_kJ} kJ/mol) chuyển dịch theo chiều thuận!`
        };
      } else {
        return {
          equilibriumShift: 'REVERSE',
          kineticBoost,
          pedagogicalExplanation: `Hạ nhiệt độ làm giảm hiệu suất của phản ứng thu nhiệt (ΔH = +${deltaH_kJ} kJ/mol).`
        };
      }
    }
  }

  /**
   * Calculate Combat Modifiers for Monsters & Cards based on Live Environment
   */
  public static calculateCombatModifiers(
    env: ChemicalEnvironmentState,
    cardType: string,
    attribute: string,
    chemicalFormula?: string
  ): {
    atkBoost: number;
    defBoost: number;
    specialPerks: string[];
  } {
    let atkBoost = 0;
    let defBoost = 0;
    const specialPerks: string[] = [];

    // 1. pH Effects
    if (env.ph < 4.0) {
      // Strong Acid
      if (['Na', 'K', 'Ca', 'Mg', 'Fe', 'Zn'].includes(chemicalFormula || '')) {
        atkBoost += 300;
        defBoost -= 200;
        specialPerks.push(`Axit mạnh ăn mòn giáp kim loại (-200 DEF), kích thích phóng thích H2 (+300 ATK)`);
      }
      if (attribute === 'ACID_DARK') {
        atkBoost += 250;
        specialPerks.push(`Môi trường axit tăng cường độc tính ăn mòn (+250 ATK)`);
      }
    } else if (env.ph > 10.0) {
      // Strong Base
      if (['Al', 'Zn'].includes(chemicalFormula || '')) {
        atkBoost += 400;
        specialPerks.push(`Kim loại lưỡng tính tan mạnh trong kiềm tạo phức AlO2- / ZnO2(2-) (+400 ATK)`);
      }
      if (attribute === 'TERRA') {
        defBoost += 350;
        specialPerks.push(`Môi trường kiềm kết tủa hydroxide tạo khiên chắn bền vững (+350 DEF)`);
      }
    }

    // 2. Temperature Effects
    if (env.temperature > 500) {
      // High Temp (> 226°C)
      if (attribute === 'PYRO') {
        atkBoost += 350;
        specialPerks.push(`Nhiệt độ cao (>500K) kích hoạt ngọn lửa plasma mãnh liệt (+350 ATK)`);
      }
      if (attribute === 'AQUA') {
        defBoost -= 250;
        specialPerks.push(`Nước bốc hơi dữ dội ở nhiệt độ cao (-250 DEF)`);
      }
    } else if (env.temperature < 270) {
      // Freezing (< -3°C)
      if (attribute === 'AQUA') {
        defBoost += 400;
        specialPerks.push(`Băng giá vĩnh cửu hóa rắn phân tử nước thành tinh thể băng lục giác (+400 DEF)`);
      }
      if (attribute === 'PYRO') {
        atkBoost -= 300;
        specialPerks.push(`Nhiệt độ đóng băng dập tắt ngọn lửa (-300 ATK)`);
      }
    }

    // 3. Pressure Effects
    if (env.pressure > 5.0) {
      if (attribute === 'AERO') {
        atkBoost += 250;
        specialPerks.push(`Áp suất nén khí cao (>5 atm) tăng mật độ phân tử khí (+250 ATK)`);
      }
    }

    // 4. Catalyst Boost
    if (env.activeCatalysts.length > 0) {
      atkBoost += 150 * env.activeCatalysts.length;
      specialPerks.push(`Xúc tác [${env.activeCatalysts.join(', ')}] hạ thấp năng lượng hoạt hóa Ea (+${150 * env.activeCatalysts.length} ATK)`);
    }

    return { atkBoost, defBoost, specialPerks };
  }

  /**
   * Catalyst Poisoning & Enzyme Inactivation (IUPAC & Industrial Chemistry):
   * Maps specific chemical inhibitors/poisons to their targeted catalytic centers.
   */
  public static getInhibitorTargets(inhibitor: string): string[] {
    const norm = inhibitor.trim().toUpperCase();
    if (norm === 'H2S' || norm === 'S2-') return ['Fe', 'Ni'];
    if (norm === 'CO' || norm === 'CARBON_MONOXIDE') return ['Pt', 'Pd', 'Fe', 'Ni'];
    if (norm === 'PB' || norm === 'PB2+' || norm === 'LEAD') return ['Pt', 'Pd', 'ENZYME'];
    if (norm === 'HG' || norm === 'HG2+' || norm === 'MERCURY') return ['Pt', 'Pd', 'ENZYME'];
    if (norm === 'AS' || norm === 'AS2O3' || norm === 'ARSENIC') return ['V2O5', 'Pt'];
    if (norm === 'HCN' || norm === 'CN-' || norm === 'CYANIDE') return ['Pt', 'Fe', 'ENZYME'];
    return [];
  }

  /**
   * Introduces a chemical inhibitor / catalyst poison into the reaction chamber.
   * Irreversibly coordinates with active catalytic sites and deactivates them.
   */
  public static addInhibitor(
    env: ChemicalEnvironmentState,
    inhibitor: string
  ): { poisonedCatalysts: string[]; messageVI: string } {
    if (!env.activeInhibitors.includes(inhibitor)) {
      env.activeInhibitors.push(inhibitor);
    }

    const targeted = this.getInhibitorTargets(inhibitor);
    const poisonedCatalysts: string[] = [];

    if (targeted.length > 0) {
      env.activeCatalysts = env.activeCatalysts.filter(c => {
        if (targeted.includes(c)) {
          poisonedCatalysts.push(c);
          return false;
        }
        return true;
      });
    }

    let messageVI = '';
    if (poisonedCatalysts.length > 0) {
      messageVI = `[Ngộ Độc Chất Xúc Tác] Chất ức chế [${inhibitor}] đã đầu độc và vô hiệu hóa hoàn toàn xúc tác [${poisonedCatalysts.join(', ')}]!`;
    } else {
      messageVI = `[Thêm Chất Ức Chế] [${inhibitor}] hiện diện trong buồng phản ứng, ngăn cản các chất xúc tác tương ứng kích hoạt.`;
    }

    return { poisonedCatalysts, messageVI };
  }

  /**
   * Attempts to activate a catalyst in the reaction chamber.
   * Fails if a coordinating inhibitor is already present (Catalyst Poisoning Defense).
   */
  public static addCatalyst(
    env: ChemicalEnvironmentState,
    catalyst: string
  ): { success: boolean; poisoned: boolean; messageVI: string } {
    // Check if any active inhibitor targets this catalyst
    for (const inh of env.activeInhibitors) {
      const targets = this.getInhibitorTargets(inh);
      if (targets.includes(catalyst)) {
        return {
          success: false,
          poisoned: true,
          messageVI: `[Thất Bại: Ngộ Độc Xúc Tác] Không thể kích hoạt xúc tác [${catalyst}] do buồng phản ứng đang bị nhiễm chất độc [${inh}]!`
        };
      }
    }

    if (!env.activeCatalysts.includes(catalyst)) {
      env.activeCatalysts.push(catalyst);
    }

    return {
      success: true,
      poisoned: false,
      messageVI: `[Kích Hoạt Xúc Tác] Thêm xúc tác [${catalyst}] vào buồng phản ứng, hạ thấp năng lượng hoạt hóa Ea!`
    };
  }
}
