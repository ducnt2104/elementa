// src/domain/thermallyRegenerativeElectrochemicalCycleEngine.ts
// Thermally Regenerative Electrochemical Cycle (TREC) Engine for Industrial Low-Grade Waste Heat Harvesting (< 100°C)
// Standards: IUPAC Thermodynamics, Temperature Coefficient of Cell Potential (dE/dT = Delta S / nF),
// Carnot Efficiency Limit, Stanford / MIT TREC Benchmarks & Vietnam GDPT 2018 Chemistry (Hóa 10: Nhiệt hóa học, Hóa 12: Thế điện cực & Năng lượng)

export type TrecCoupleType =
  | 'KNiHCF_AG_AGCL'
  | 'CUHCF_FE_CN6'
  | 'PB_ANALOGUE_IODIDE'
  | 'SYMMETRIC_CONCENTRATION_CELL';

export interface TrecCoupleSpec {
  id: TrecCoupleType;
  nameVi: string;
  cathodeMaterial: string;
  anodeMaterial: string;
  electrolyte: string;
  tempCoefficientMvPerK: number; // alpha = dE/dT in mV/K (typically -1.2 to -2.2 mV/K)
  standardCellPotentialV: number; // E0 at 25°C
  reversibleEntropyJPerMolK: number; // Delta S_rxn
  maxSpecificCapacityMahPerG: number;
  internalResistanceOhmCm2: number;
  mechanismVi: string;
}

export interface TrecOperatingConditions {
  coupleType: TrecCoupleType;
  tempHighC: number; // T_H (e.g. 50 to 90 °C)
  tempLowC: number; // T_L (e.g. 15 to 30 °C)
  chargeCurrentDensityMaCm2: number; // 2 to 25 mA/cm2
  dischargeCurrentDensityMaCm2: number; // 2 to 25 mA/cm2
  activeMassGramPerCell: number; // 10 to 200 g
  heatExchangerEffectivenessPercent: number; // 40% to 90%
}

export interface TrecCycleThermodynamicResult {
  deltaTemperatureK: number;
  tempCoeffMvPerK: number;
  voltageHighTempV: number; // Discharge voltage at T_H
  voltageLowTempV: number; // Charge voltage at T_L
  deltaVoltageV: number; // Net voltage boost per cycle
  chargeTransferredCoulombs: number;
  grossElectricWorkOutputJoules: number;
  chargingWorkInputJoules: number;
  netWorkOutputJoules: number; // W_net = W_dis - W_chg
  netSpecificEnergyWhPerKg: number;
  heatInputHighTempJoules: {
    electrochemicalEntropyHeatJoules: number; // Q_rev = T_H * Delta S
    sensibleHeatingJoules: number; // Q_sensible = C_p * Delta T * (1 - eta_hex)
    totalHeatInputQhJoules: number;
  };
  efficiencies: {
    thermalEfficiencyPercent: number; // eta_th = W_net / Q_H * 100%
    carnotEfficiencyPercent: number; // eta_carnot = (T_H - T_L) / T_H * 100%
    relativeCarnotEfficiencyPercent: number; // eta_th / eta_carnot * 100%
  };
}

export interface TrecIndustrialHarvestingPlantResult {
  wasteHeatSourceKwTh: number; // e.g. 100 kW thermal waste heat
  totalCellsCount: number;
  netElectricPowerOutputKwE: number;
  annualElectricityGeneratedMwh: number;
  avoidedGridCo2TonsPerYear: number;
  levelizedCostOfElectricityDollarPerKwh: number;
  simplePaybackPeriodYears: number;
}

// 1. Catalog of Prussian Blue Analogue & Redox Couples for TREC
export const TREC_COUPLE_SPECS: Record<TrecCoupleType, TrecCoupleSpec> = {
  KNiHCF_AG_AGCL: {
    id: 'KNiHCF_AG_AGCL',
    nameVi: 'KNiFe(CN)₆ (KNiHCF) Cathode vs Ag/AgCl Anode',
    cathodeMaterial: 'Potassium Nickel Hexacyanoferrate KNiFe(CN)₆',
    anodeMaterial: 'Silver / Silver Chloride (Ag/AgCl)',
    electrolyte: '1.0 M KCl (Aqueous)',
    tempCoefficientMvPerK: -1.48, // mV/K
    standardCellPotentialV: 0.585,
    reversibleEntropyJPerMolK: -142.8, // J/(mol*K)
    maxSpecificCapacityMahPerG: 62.0,
    internalResistanceOhmCm2: 4.2,
    mechanismVi: 'KNiFe(CN)₆ kết hợp mạng khung mở Prussian blue xen phủ thuận nghịch ion K⁺. Hiệu ứng tái tổ chức vỏ solvat hóa nước khi K⁺ thoát ra tạo biến thiên entropi âm lớn, làm giảm điện thế mạnh khi nhiệt độ tăng.'
  },
  CUHCF_FE_CN6: {
    id: 'CUHCF_FE_CN6',
    nameVi: 'CuHCF Khung Mở vs Ferri/Ferrocyanide Fe(CN)₆³⁻/⁴⁻',
    cathodeMaterial: 'Copper Hexacyanoferrate KCuFe(CN)₆',
    anodeMaterial: 'Fe(CN)₆³⁻/⁴⁻ Redox Couple (Carbon Felt)',
    electrolyte: '0.5 M K₄Fe(CN)₆ + 0.5 M KNO₃',
    tempCoefficientMvPerK: -1.82,
    standardCellPotentialV: 0.440,
    reversibleEntropyJPerMolK: -175.6,
    maxSpecificCapacityMahPerG: 55.0,
    internalResistanceOhmCm2: 3.5,
    mechanismVi: 'Hệ ghép đôi dị thể giữa điện cực xen phủ CuHCF và dung dịch dòng chảy Fe(CN)₆. Cặp Fe(CN)₆⁴⁻/³⁻ có hệ số nhiệt dE/dT âm kết hợp cùng CuHCF tạo ra hệ số nhiệt tổng cực đại lên đến -1.82 mV/K.'
  },
  PB_ANALOGUE_IODIDE: {
    id: 'PB_ANALOGUE_IODIDE',
    nameVi: 'Prussian Blue Fe₄[Fe(CN)₆]₃ vs Cặp Oxi Hóa - Khử I⁻/I₃⁻',
    cathodeMaterial: 'Prussian Blue Fe₄[Fe(CN)₆]₃',
    anodeMaterial: 'Iodide / Triiodide (I⁻ / I₃⁻ Redox)',
    electrolyte: '1.0 M KI + 0.05 M I₂',
    tempCoefficientMvPerK: -1.62,
    standardCellPotentialV: 0.360,
    reversibleEntropyJPerMolK: -156.3,
    maxSpecificCapacityMahPerG: 70.0,
    internalResistanceOhmCm2: 2.9,
    mechanismVi: 'Sử dụng cặp I⁻/I₃⁻ có động học trao đổi electron cực nhanh (low activation overpotential), cho phép vận hành chu trình nạp/xả nhiệt với mật độ dòng cao trên 15 mA/cm² mà không bị sụt áp Ohmic quá mức.'
  },
  SYMMETRIC_CONCENTRATION_CELL: {
    id: 'SYMMETRIC_CONCENTRATION_CELL',
    nameVi: 'Pin Điện Hóa Tái Sinh Nhiệt Đối Xứng (Symmetric NH₃/Cu)',
    cathodeMaterial: 'Cu Metal / [Cu(NH₃)₄]²⁺',
    anodeMaterial: 'Cu Metal / Cu²⁺',
    electrolyte: '0.1 M CuSO₄ + 2.0 M NH₃ (Distillable)',
    tempCoefficientMvPerK: -1.25,
    standardCellPotentialV: 0.280,
    reversibleEntropyJPerMolK: -120.6,
    maxSpecificCapacityMahPerG: 85.0,
    internalResistanceOhmCm2: 5.8,
    mechanismVi: 'Hệ pin nồng độ nhiệt tái sinh bằng cách chưng cất bay hơi NH₃ ở nhiệt độ thấp (<60°C). Nhiệt thải công nghiệp đẩy NH₃ tách khỏi khoang cathode tái sinh nồng độ chênh lệch ban đầu.'
  }
};

export class ThermallyRegenerativeElectrochemicalCycleEngine {
  private static readonly F = 96485.33; // Faraday constant (C/mol)

  /**
   * Tính toán nhiệt động học chu trình 4 giai đoạn TREC:
   * 1. Xả nhiệt độ cao T_H
   * 2. Làm mát đẳng tích / hồi nhiệt T_H -> T_L
   * 3. Nạp nhiệt độ thấp T_L
   * 4. Gia nhiệt hồi lưu T_L -> T_H
   */
  public static calculateCycleThermodynamics(
    conditions: TrecOperatingConditions
  ): TrecCycleThermodynamicResult {
    const spec = TREC_COUPLE_SPECS[conditions.coupleType];
    const thK = conditions.tempHighC + 273.15;
    const tlK = conditions.tempLowC + 273.15;
    const deltaT = conditions.tempHighC - conditions.tempLowC;

    // 1. Temperature Coefficient & Open Circuit Voltages
    // E(T) = E0 + alpha * (T - 298.15)
    // Note: If alpha is negative (e.g. -1.5 mV/K), E(T_H) < E(T_L).
    // In typical TREC cycle with negative alpha:
    // Charge is performed at T_H (where OCV is lower) and discharge is performed at T_L (where OCV is higher),
    // OR cell polarity is designed such that discharge is at T_H and charge at T_L.
    // By convention in TREC literature (Cui et al., Nature Comm 2014):
    // Delta V_boost = |alpha| * Delta T
    const alphaAbsV = Math.abs(spec.tempCoefficientMvPerK) * 1e-3; // V/K
    const theoreticalDeltaV = alphaAbsV * deltaT;

    // 2. Ohmic and Activation Overpotentials during charge and discharge:
    const asr = spec.internalResistanceOhmCm2; // Ohm*cm2
    const jDisA = conditions.dischargeCurrentDensityMaCm2 * 1e-3; // A/cm2
    const jChgA = conditions.chargeCurrentDensityMaCm2 * 1e-3; // A/cm2

    const etaDischargeV = jDisA * asr;
    const etaChargeV = jChgA * asr;

    // Real terminal voltages
    const baseE0 = spec.standardCellPotentialV;
    const ocvHigh = baseE0 - alphaAbsV * (conditions.tempHighC - 25);
    const ocvLow = baseE0 - alphaAbsV * (conditions.tempLowC - 25);

    // High temp discharge voltage and low temp charge voltage
    // Cycle operates between OCV_high and OCV_low:
    // W_dis = Integral (V_dis * dq), W_chg = Integral (V_chg * dq)
    const vDisHigh = Number((ocvHigh - etaDischargeV).toFixed(4));
    const vChgLow = Number((ocvLow + etaChargeV).toFixed(4));
    const deltaVoltageV = Number((theoreticalDeltaV - (etaDischargeV + etaChargeV)).toFixed(4));

    // 3. Charge Transferred per Cell (Coulombs):
    // Q_coulombs = mass * capacity (Ah/g) * 3600
    const activeCapacityMah = spec.maxSpecificCapacityMahPerG * 0.85; // 85% depth of cycle
    const chargeCoulombs = Number(
      (conditions.activeMassGramPerCell * (activeCapacityMah * 1e-3) * 3600).toFixed(2)
    );

    // 4. Electric Work Output & Input:
    // W_gross_out = Q * V_dis (or cycle integral)
    // Net electrical energy gained per cycle: W_net = Q * Delta V_net
    const netWorkOutputJoules = Number(
      Math.max(0, chargeCoulombs * Math.max(0, deltaVoltageV)).toFixed(2)
    );
    const grossElectricWorkOutputJoules = Number((chargeCoulombs * Math.max(0.1, vDisHigh)).toFixed(2));
    const chargingWorkInputJoules = Number((chargeCoulombs * Math.max(0.1, vChgLow)).toFixed(2));

    // Net Specific Energy per kg of active electrode material (Wh/kg):
    // 1 J = 1/3600 Wh
    const netSpecificEnergyWhPerKg = Number(
      ((netWorkOutputJoules / 3600) / (conditions.activeMassGramPerCell * 1e-3)).toFixed(2)
    );

    // 5. Heat Input at High Temperature T_H:
    // Q_rev = (T_H) * Delta S * n_moles = (T_H) * (Q_coulombs / F) * Delta S_rxn
    const molesTransferred = chargeCoulombs / this.F;
    const entropyHeatJoules = Number((thK * Math.abs(spec.reversibleEntropyJPerMolK) * molesTransferred).toFixed(2));

    // Sensible Heating of Cell Mass:
    // Cell specific heat capacity C_cell ~ 1.75 J/(g*K) (electrode + aqueous electrolyte)
    // With heat regeneration (counter-current heat exchanger):
    // Q_sensible = mass * C_p * Delta T * (1 - eta_hex)
    const cellCpJPerGPerK = 1.75;
    const unrecoveredHeatFraction = 1.0 - (conditions.heatExchangerEffectivenessPercent / 100);
    const sensibleHeatingJoules = Number(
      (conditions.activeMassGramPerCell * 2.8 * cellCpJPerGPerK * deltaT * unrecoveredHeatFraction).toFixed(2)
    );

    const totalHeatInputQhJoules = Number((entropyHeatJoules + sensibleHeatingJoules).toFixed(2));

    // 6. Efficiency Metrics:
    // A. Thermal Efficiency: eta_th = W_net / Q_H
    const thermalEfficiencyPercent = Number(
      totalHeatInputQhJoules > 0
        ? ((netWorkOutputJoules / totalHeatInputQhJoules) * 100).toFixed(2)
        : '0.00'
    );

    // B. Carnot Efficiency: eta_carnot = (T_H - T_L) / T_H
    const carnotEfficiencyPercent = Number(
      (((thK - tlK) / thK) * 100).toFixed(2)
    );

    // C. Relative Carnot Efficiency (Percentage of Carnot Limit achieved):
    const relativeCarnotEfficiencyPercent = Number(
      carnotEfficiencyPercent > 0
        ? ((thermalEfficiencyPercent / carnotEfficiencyPercent) * 100).toFixed(1)
        : '0.0'
    );

    return {
      deltaTemperatureK: deltaT,
      tempCoeffMvPerK: spec.tempCoefficientMvPerK,
      voltageHighTempV: vDisHigh,
      voltageLowTempV: vChgLow,
      deltaVoltageV,
      chargeTransferredCoulombs: chargeCoulombs,
      grossElectricWorkOutputJoules,
      chargingWorkInputJoules,
      netWorkOutputJoules,
      netSpecificEnergyWhPerKg,
      heatInputHighTempJoules: {
        electrochemicalEntropyHeatJoules: entropyHeatJoules,
        sensibleHeatingJoules,
        totalHeatInputQhJoules
      },
      efficiencies: {
        thermalEfficiencyPercent,
        carnotEfficiencyPercent,
        relativeCarnotEfficiencyPercent
      }
    };
  }

  /**
   * Thiết kế nhà máy thu hồi nhiệt thải công nghiệp TREC (Data Center / Industrial Waste Heat 100 kW_th)
   */
  public static designIndustrialHarvestingPlant(
    wasteHeatSourceKwTh: number = 100.0,
    conditions: TrecOperatingConditions
  ): TrecIndustrialHarvestingPlantResult {
    const cycle = this.calculateCycleThermodynamics(conditions);
    const etaTh = cycle.efficiencies.thermalEfficiencyPercent / 100;

    // Continuous net electric power output:
    // P_elec = P_thermal * eta_th
    const netElectricPowerOutputKwE = Number((wasteHeatSourceKwTh * etaTh).toFixed(2));

    // Sizing cell stack count:
    // Cycle duration ~ 60 seconds (30s high temp + 30s low temp in alternating flow)
    const cycleDurationSeconds = 60.0;
    const workPerCellPerCycleJoules = cycle.netWorkOutputJoules;
    const powerPerCellWatts = workPerCellPerCycleJoules / cycleDurationSeconds;
    const requiredTotalWatts = netElectricPowerOutputKwE * 1000;
    const totalCellsCount = Math.max(1, Math.round(requiredTotalWatts / Math.max(0.1, powerPerCellWatts)));

    // Annual electricity generated (8,000 operational hours/year):
    const annualElectricityGeneratedMwh = Number(
      ((netElectricPowerOutputKwE * 8000) / 1000).toFixed(1)
    );

    // Avoided Grid CO2 emissions (Grid emission factor ~ 0.55 kg CO2/kWh):
    const avoidedGridCo2TonsPerYear = Number(
      ((annualElectricityGeneratedMwh * 1000 * 0.55) / 1000).toFixed(1)
    );

    // Levelized Cost of Electricity (LCOE) & Payback:
    // CapEx ~ $120 per kW_th installed (modular plastic stack & low-cost Prussian blue earth-abundant salts)
    // waste heat fuel cost = $0
    const totalCapExDollar = wasteHeatSourceKwTh * 120;
    const annualOpEx = totalCapExDollar * 0.025;
    const electricityPriceDollarPerKwh = 0.14; // $0.14/kWh industrial clean tariff + peak offset
    const annualElectricityRevenue = annualElectricityGeneratedMwh * 1000 * electricityPriceDollarPerKwh;
    const netAnnualSavings = Math.max(1, annualElectricityRevenue - annualOpEx);
    const simplePaybackPeriodYears = Number((totalCapExDollar / netAnnualSavings).toFixed(1));

    // LCOE over 15-year life:
    const lcoeDollar = Number(
      ((totalCapExDollar + annualOpEx * 15) / (annualElectricityGeneratedMwh * 1000 * 15)).toFixed(3)
    );

    return {
      wasteHeatSourceKwTh,
      totalCellsCount,
      netElectricPowerOutputKwE,
      annualElectricityGeneratedMwh,
      avoidedGridCo2TonsPerYear,
      levelizedCostOfElectricityDollarPerKwh: lcoeDollar,
      simplePaybackPeriodYears
    };
  }
}
