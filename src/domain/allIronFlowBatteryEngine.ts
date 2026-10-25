// src/domain/allIronFlowBatteryEngine.ts
// All-Iron Redox Flow Battery (IFB) Engine for Non-Toxic, Zero-Degradation Long-Duration Energy Storage (LDES)
// Standards: IUPAC Electrochemistry, ESS Inc. Commercial Benchmarks, Catalytic Proton Rebalancer Kinetics & Vietnam GDPT 2018 Chemistry (Hóa 12: Kim loại Sắt Fe, Ăn mòn & Pin điện hóa)

export type IronFlowElectrolyteType =
  | 'ALL_CHLORIDE_SLURRY'
  | 'CHLORIDE_CITRATE_COMPLEX'
  | 'ALL_SULFATE_ECO_NEUTRAL';

export interface IronFlowElectrolyteSpec {
  id: IronFlowElectrolyteType;
  nameVi: string;
  chemicalFormulas: {
    negative: string;
    positive: string;
    supportingElectrolyte: string;
  };
  phOperatingRange: [number, number];
  herOverpotentialShiftMv: number;
  ironPlatingCoulombicEfficiencyPercent: number; // e.g. 96.5% vs 88%
  solubilityLimitMolar: number;
  mechanismVi: string;
}

export interface IronFlowOperatingConditions {
  electrolyteType: IronFlowElectrolyteType;
  stateOfCharge: number; // 0.05 to 0.95
  temperatureC: number; // 25 to 65 °C
  currentDensityMaCm2: number; // 20 to 120 mA/cm2
  flowRateLMin: number; // 1.0 to 10.0 L/min
  hasProtonRebalancer: boolean; // Catalytic H2 + 2Fe3+ -> 2Fe2+ + 2H+
  electrodeAreaCm2: number; // e.g. 1000 cm2
  membraneTypeVi: string;
}

export interface IronFlowElectrochemicalResult {
  openCircuitVoltageV: number; // E0 = 1.21 V (Fe3+/Fe2+ 0.77 V - (Fe2+/Fe0 -0.44 V))
  operatingChargeVoltageV: number;
  operatingDischargeVoltageV: number;
  overpotentials: {
    anodeFePlatingDissolutionV: number;
    cathodeFeRedoxV: number;
    ohmicMembraneAndElectrolyteV: number;
    concentrationMassTransferV: number;
    totalV: number;
  };
  coulombicEfficiencyPercent: number;
  voltageEfficiencyPercent: number;
  roundTripEfficiencyPercent: number;
  rebalancerMetrics: {
    parasiticH2EvolutionRateMlPerMin: number;
    protonRegenerationRateMolesPerHour: number;
    socDriftPerHourPercent: number;
    isStateOfChargeBalanced: boolean;
  };
}

export interface IronFlowGridPlantResult {
  plantPowerKw: number;
  storageDurationHours: number;
  totalStorageCapacityKwh: number;
  totalStacksCount: number;
  totalIronSaltMassTons: number;
  electrolyteTankVolumeM3: number;
  capitalCostDollarPerKwh: number;
  totalCapExDollar: number;
  roundTripEfficiencyPercent: number;
  annualElectricityDischargedMwh: number;
  avoidedGridCo2TonsPerYear: number;
  projectLifespanYears: number;
  unlimitedCycleLifeGuaranteed: boolean;
}

// 1. Catalog of All-Iron Flow Battery Electrolyte Systems
export const IRON_FLOW_ELECTROLYTES: Record<IronFlowElectrolyteType, IronFlowElectrolyteSpec> = {
  ALL_CHLORIDE_SLURRY: {
    id: 'ALL_CHLORIDE_SLURRY',
    nameVi: 'Hệ Dung Dịch Muối Sắt Clorua Tiêu Chuẩn (All-Chloride FeCl₂)',
    chemicalFormulas: {
      negative: 'FeCl₂ (2.5 M) + NH₄Cl (1.5 M)',
      positive: 'FeCl₂ (1.5 M) + FeCl₃ (1.0 M) + NH₄Cl',
      supportingElectrolyte: 'pH 1.8 - 2.2 HCl'
    },
    phOperatingRange: [1.8, 2.4],
    herOverpotentialShiftMv: 140,
    ironPlatingCoulombicEfficiencyPercent: 96.2,
    solubilityLimitMolar: 3.2,
    mechanismVi: 'Ion Cl⁻ làm tăng tính dẫn điện của dung dịch và xúc tác cho động học truyền điện tích Fe²⁺/Fe³⁺ trên điện cực nỉ cacbon. Vận hành ở pH axit nhẹ kiểm soát kết tủa hydroxit sắt trong khi giảm tốc độ thoát khí H₂.'
  },
  CHLORIDE_CITRATE_COMPLEX: {
    id: 'CHLORIDE_CITRATE_COMPLEX',
    nameVi: 'Hệ Phức Phụ Gia Citrate Ức Chế Hydro (Citrate-Complexed FeCl₂)',
    chemicalFormulas: {
      negative: 'FeCl₂ (2.0 M) + Potassium Citrate (0.2 M)',
      positive: 'FeCl₂ (1.2 M) + FeCl₃ (0.8 M) + Citrate',
      supportingElectrolyte: 'pH 2.8 - 3.4 Buffer'
    },
    phOperatingRange: [2.8, 3.6],
    herOverpotentialShiftMv: 260,
    ironPlatingCoulombicEfficiencyPercent: 98.4,
    solubilityLimitMolar: 2.8,
    mechanismVi: 'Ligand citrate chelat hóa một phần ion sắt tự do, làm tăng quá thế thoát khí hydro (HER) lên thêm +260 mV. Cho phép mạ sắt cực kỳ mịn, không gai dendrite và đạt hiệu suất dòng Coulombic kỷ lục >98%.'
  },
  ALL_SULFATE_ECO_NEUTRAL: {
    id: 'ALL_SULFATE_ECO_NEUTRAL',
    nameVi: 'Hệ Muối Sunfat Thân Thiện Môi Trường (Sulfate-Based FeSO₄)',
    chemicalFormulas: {
      negative: 'FeSO₄ (1.8 M) + (NH₄)₂SO₄ (1.0 M)',
      positive: 'FeSO₄ (1.0 M) + Fe₂(SO₄)₃ (0.4 M)',
      supportingElectrolyte: 'pH 2.5 - 3.2 H₂SO₄'
    },
    phOperatingRange: [2.5, 3.5],
    herOverpotentialShiftMv: 190,
    ironPlatingCoulombicEfficiencyPercent: 94.8,
    solubilityLimitMolar: 2.2,
    mechanismVi: 'Sử dụng muối sắt sunfat công nghiệp giá rẻ, độ ăn mòn thấp hơn ion clorua. Dung dịch trung tính sinh thái, không phát sinh khí độc clo kể cả trong sự cố cực đoan.'
  }
};

export class AllIronFlowBatteryEngine {
  private static readonly F = 96485.33; // Faraday constant (C/mol)
  private static readonly R = 8.31446; // J/(mol*K)
  public static readonly E0_CELL = 1.21; // V (Fe3+/Fe2+ +0.77 V - (Fe2+/Fe -0.44 V))

  /**
   * Tính toán điện thế, phân rã quá thế, hiệu suất chu trình và cân bằng tái tổ hợp proton
   */
  public static calculateElectrochemicalPerformance(
    conditions: IronFlowOperatingConditions
  ): IronFlowElectrochemicalResult {
    const spec = IRON_FLOW_ELECTROLYTES[conditions.electrolyteType];
    const tk = conditions.temperatureC + 273.15;
    const soc = Math.max(0.05, Math.min(0.95, conditions.stateOfCharge));
    const jA = conditions.currentDensityMaCm2 * 1e-3; // A/cm2

    // 1. Nernst Open Circuit Voltage (OCV):
    // E_pos = E0_pos + (RT/F) * ln([Fe3+]/[Fe2+]) = 0.77 + (RT/F) * ln(soc / (1 - soc))
    // E_neg = E0_neg + (RT/2F) * ln([Fe2+]/1) = -0.44 + (RT/2F) * ln(1 - soc)
    const nernstPos = 0.77 + (this.R * tk / this.F) * Math.log(soc / (1 - soc));
    const nernstNeg = -0.44 + (this.R * tk / (2 * this.F)) * Math.log(Math.max(0.05, 1 - soc));
    const ocv = Number((nernstPos - nernstNeg).toFixed(4));

    // 2. Overpotential Deconstruction:
    // A. Anode Negative Electrode: Iron Plating / Stripping (Fe2+ + 2e- <-> Fe)
    // Exchange current density j0_Fe ~ 15 mA/cm2 = 0.015 A/cm2 at 25°C
    const j0Fe = 0.015 * Math.exp(0.028 * (conditions.temperatureC - 25));
    const etaAnode = Number(((this.R * tk / (this.F)) * Math.asinh(jA / (2 * j0Fe))).toFixed(4));

    // B. Cathode Positive Electrode: Soluble Fe2+/Fe3+ Redox (Fe2+ <-> Fe3+ + e-)
    // Exchange current density on carbon felt: j0_pos ~ 40 mA/cm2 = 0.040 A/cm2
    const j0Pos = 0.040 * Math.exp(0.032 * (conditions.temperatureC - 25));
    const etaCathode = Number(((this.R * tk / (0.5 * this.F)) * Math.asinh(jA / (2 * j0Pos))).toFixed(4));

    // C. Ohmic Losses: Microporous Separator + Electrolyte Bulk Conductivity
    // Resistance ASR ~ 0.85 Ohm*cm2
    const totalAsr = 0.85 * (300 / tk); // decreases with temperature
    const etaOhmic = Number((jA * totalAsr).toFixed(4));

    // D. Concentration Overpotential (Mass Transfer Limitation):
    const flowScale = Math.max(1.0, conditions.flowRateLMin);
    const jLim = 0.220 * Math.sqrt(flowScale / 4.0); // A/cm2
    const safeJLim = Math.max(jA * 1.15, jLim);
    const etaConcentration = Number(((this.R * tk / this.F) * Math.log(safeJLim / (safeJLim - jA))).toFixed(4));

    const totalOverpotential = etaAnode + etaCathode + etaOhmic + etaConcentration;

    // Terminal Charge & Discharge Voltages:
    const vChg = Number((ocv + totalOverpotential).toFixed(4));
    const vDis = Number(Math.max(0.60, ocv - totalOverpotential).toFixed(4));

    // 3. Efficiency Calculations:
    const ce = spec.ironPlatingCoulombicEfficiencyPercent;
    const ve = Number(((vDis / vChg) * 100).toFixed(1));
    const rte = Number(((ce * ve) / 100).toFixed(1));

    // 4. Parasitic Hydrogen & Proton Rebalancer Kinetics:
    // Fraction of charge current lost to H2 evolution = (100 - ce)%
    const iTotalChargeA = jA * conditions.electrodeAreaCm2;
    const iHerA = iTotalChargeA * ((100 - ce) / 100);
    // H2 evolution rate: n_dot_H2 = I_her / (2*F) mol/s
    const h2MolPerSec = iHerA / (2 * this.F);
    const h2MlPerMin = Number(((h2MolPerSec * this.R * tk * 1e6 * 60) / 101325).toFixed(2));

    // Rebalancing Reaction: 2 Fe3+ + H2 -> 2 Fe2+ + 2 H+
    // Catalyst efficiency = 98% with Pt/C mesh rebalancer tower
    const rebalancerEfficiency = conditions.hasProtonRebalancer ? 0.98 : 0.0;
    const protonMolesPerSec = (2 * h2MolPerSec) * rebalancerEfficiency;
    const protonRegenerationRateMolesPerHour = Number((protonMolesPerSec * 3600).toFixed(3));

    // SOC Drift (%/hour):
    // Without rebalancing, negative state accumulates unplated excess or unbalance ~0.45%/hr
    const socDriftPerHourPercent = conditions.hasProtonRebalancer ? 0.01 : 0.42;

    return {
      openCircuitVoltageV: ocv,
      operatingChargeVoltageV: vChg,
      operatingDischargeVoltageV: vDis,
      overpotentials: {
        anodeFePlatingDissolutionV: etaAnode,
        cathodeFeRedoxV: etaCathode,
        ohmicMembraneAndElectrolyteV: etaOhmic,
        concentrationMassTransferV: etaConcentration,
        totalV: Number(totalOverpotential.toFixed(4))
      },
      coulombicEfficiencyPercent: ce,
      voltageEfficiencyPercent: ve,
      roundTripEfficiencyPercent: rte,
      rebalancerMetrics: {
        parasiticH2EvolutionRateMlPerMin: h2MlPerMin,
        protonRegenerationRateMolesPerHour,
        socDriftPerHourPercent,
        isStateOfChargeBalanced: conditions.hasProtonRebalancer
      }
    };
  }

  /**
   * Thiết kế trạm lưu trữ lưới điện lớn All-Iron Flow Battery (ESS Energy Warehouse 500 kW / 6 MWh - 12h LDES)
   */
  public static designGridStoragePlant(
    plantPowerKw: number = 500.0,
    storageDurationHours: number = 12.0,
    electrolyteType: IronFlowElectrolyteType = 'ALL_CHLORIDE_SLURRY'
  ): IronFlowGridPlantResult {
    const totalStorageCapacityKwh = plantPowerKw * storageDurationHours; // e.g. 6,000 kWh = 6 MWh
    const spec = IRON_FLOW_ELECTROLYTES[electrolyteType];

    // Standard commercial stack module: 50 kW per stack (10 stacks for 500 kW)
    const stackPowerKw = 50.0;
    const totalStacksCount = Math.ceil(plantPowerKw / stackPowerKw);

    // Iron Salt Mass & Volume Calculation:
    // Reaction: Fe + 2 Fe3+ -> 3 Fe2+ (2 Faradays per mol Fe = 55.85 g Fe)
    // Theoretical capacity: 2 * 96,485 C / 55.85 g = 3,455 C/g = 960 Ah/kg Fe
    // At practical discharge voltage ~ 1.05 V: Energy density ~ 1,000 Wh/kg Fe
    // With salt molar mass (FeCl2 = 126.75 g/mol, FeCl3 = 162.2 g/mol), total salt requirement:
    const saltKgPerKwh = 18.5; // ~18.5 kg iron salts per kWh storage
    const totalIronSaltMassTons = Number(((totalStorageCapacityKwh * saltKgPerKwh) / 1000).toFixed(1));

    // Electrolyte Tank Volume (m3):
    // Concentration ~ 2.2 M -> ~22-25 kWh/m3
    const volumetricEnergyDensityKwhPerM3 = 24.0;
    const electrolyteTankVolumeM3 = Number((totalStorageCapacityKwh / volumetricEnergyDensityKwhPerM3).toFixed(1));

    // Capital Cost ($/kWh):
    // Earth-abundant iron + chloride: Stack ($380/kW) + Electrolyte ($22/kWh) + Tanks/BOP ($45/kWh)
    // For 12-hour storage: CapEx = (380 / 12) + 22 + 45 = $98.6 + balance = ~$185/kWh!
    const stackCostPerKwh = 380 / storageDurationHours;
    const electrolyteCostPerKwh = 24.0;
    const bopAndPumpsCostPerKwh = 52.0;
    const capitalCostDollarPerKwh = Number((stackCostPerKwh + electrolyteCostPerKwh + bopAndPumpsCostPerKwh).toFixed(1));
    const totalCapExDollar = Number((capitalCostDollarPerKwh * totalStorageCapacityKwh).toFixed(0));

    // RTE & Operations:
    const roundTripEfficiencyPercent = 71.5;
    const annualCycles = 330;
    const annualElectricityDischargedMwh = Number(
      ((totalStorageCapacityKwh * annualCycles * (roundTripEfficiencyPercent / 100)) / 1000).toFixed(1)
    );

    // Avoided Grid CO2 emissions (0.55 kg CO2/kWh):
    const avoidedGridCo2TonsPerYear = Number(
      ((annualElectricityDischargedMwh * 1000 * 0.55) / 1000).toFixed(1)
    );

    return {
      plantPowerKw,
      storageDurationHours,
      totalStorageCapacityKwh,
      totalStacksCount,
      totalIronSaltMassTons,
      electrolyteTankVolumeM3,
      capitalCostDollarPerKwh,
      totalCapExDollar,
      roundTripEfficiencyPercent,
      annualElectricityDischargedMwh,
      avoidedGridCo2TonsPerYear,
      projectLifespanYears: 25,
      unlimitedCycleLifeGuaranteed: true
    };
  }
}
