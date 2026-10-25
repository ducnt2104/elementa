// src/domain/zincBromineFlowBatteryEngine.ts
// Zinc-Bromine Redox Flow Battery (Zn-Br / ZBB) Two-Phase Polybromide Complexation Engine
// Standards: IUPAC Electrochemistry, Sand's Transition Time, Gel-Polymer Membranes & Vietnam GDPT 2018 (Hóa 10 & 12: Halogen, Mạ điện & Năng lượng)

export type ZnBrComplexingAgentType = 'MEP_BROMIDE' | 'MEM_BROMIDE' | 'DMMP_BROMIDE';

export interface ZnBrComplexingAgentSpec {
  id: ZnBrComplexingAgentType;
  nameVi: string;
  chemicalFormula: string;
  chemicalName: string;
  complexationEfficiencyPercent: number; // >98% free Br2 sequestered into dense polybromide oil
  polybromideOilDensityGPerCm3: number; // e.g. 2.35 g/cm3 (sinks to bottom of tank)
  aqueousFreeBr2Ppm: number; // ppm free Br2 in equilibrium (< 150 ppm)
  selfDischargeReductionPercent: number; // >95% suppression of Br2 crossover
  primaryAdvantagesVi: string;
}

export interface ZnBrOperatingConditions {
  complexingAgent: ZnBrComplexingAgentType;
  stateOfCharge: number; // 0.05 to 0.95 (5% - 95%)
  temperatureC: number; // 15 to 45 °C
  currentDensityMaPerCm2: number; // 20 to 120 mA/cm2
  electrolyteFlowRateLMin: number; // 1.0 to 10.0 L/min
  znBr2SaltConcentrationMolar: number; // 2.0 to 3.5 M
  electrodeAreaCm2: number; // e.g. 1000 cm2 per cell
  membraneTypeVi: string; // e.g. Microporous Polyolefin / Daramic
}

export interface ZnBrElectrochemicalResult {
  openCircuitVoltageV: number; // Nominal ~1.82 V to 1.86 V (E0 = 1.84 V)
  operatingDischargeVoltageV: number;
  operatingChargeVoltageV: number;
  powerDensityMwPerCm2: number;
  overpotentials: {
    zincDepositionActivationV: number;
    bromineRedoxActivationV: number;
    ohmicMembraneAndElectrolyteV: number;
    concentrationDiffusionV: number;
    totalV: number;
  };
  zincMorphologyAndDendriteSafety: {
    sandsTransitionTimeSeconds: number; // Transition time tau_sand
    limitingCurrentDensityMaPerCm2: number;
    dendriteGrowthRisk: 'SAFE_FLAT_PLATING' | 'MILD_ROUGHNESS' | 'DENDRITE_SHORT_CIRCUIT_RISK';
    recommendedRejuvenationStrippingIntervalCycles: number;
  };
  polybromidePhaseSeparation: {
    oilPhaseVolumePercent: number; // Dense polybromide oil layer at tank bottom
    aqueousFreeBromineConcentrationPpm: number;
    selfDischargeRatePercentPerDay: number;
  };
  roundTripEfficiencyPercent: number;
}

export interface ZnBrSubstationPlantResult {
  ratedPowerKw: number;
  storageDurationHours: number;
  totalCapacityKwh: number;
  cellActiveAreaCm2: number;
  totalCellCount: number;
  stackModuleCount: number;
  totalZincInventoryKg: number;
  totalBromineInventoryKg: number;
  totalElectrolyteVolumeLiters: number;
  polybromideOilReservoirLiters: number;
  capitalCostPerKwhUsd: number;
  totalCapExUsd: number;
  systemRoundTripEfficiencyPercent: number;
  cycleLifeWithStrippingLimit: number; // >10,000 cycles with periodic 100% DOD stripping
  avoidedPeakerCo2TonsPerYear: number;
}

// 1. Catalog of Quaternary Ammonium Complexing Agents
export const ZN_BR_COMPLEXING_AGENTS: Record<ZnBrComplexingAgentType, ZnBrComplexingAgentSpec> = {
  MEP_BROMIDE: {
    id: 'MEP_BROMIDE',
    nameVi: 'N-Methyl-N-Ethylpyrrolidinium Bromide (MEP-Br Chuẩn Công Nghiệp)',
    chemicalFormula: '[C₇H₁₆N]⁺Br⁻',
    chemicalName: 'N-methyl-N-ethylpyrrolidinium bromide',
    complexationEfficiencyPercent: 98.8,
    polybromideOilDensityGPerCm3: 2.38,
    aqueousFreeBr2Ppm: 95,
    selfDischargeReductionPercent: 97.2,
    primaryAdvantagesVi: 'Chất tạo phức tiêu chuẩn toàn cầu (Redflow, Primus Power): Tạo pha dầu polybromide MEP[Br(Br₂)ₙ] tỷ trọng cao (2.38 g/cm³) lắng hoàn toàn xuống đáy bể, giữ nồng độ Br₂ tự do trong pha nước dưới 100 ppm.'
  },
  MEM_BROMIDE: {
    id: 'MEM_BROMIDE',
    nameVi: 'N-Methyl-N-Ethylmorpholinium Bromide (MEM-Br Bền Nhiệt)',
    chemicalFormula: '[C₇H₁₆NO]⁺Br⁻',
    chemicalName: 'N-methyl-N-ethylmorpholinium bromide',
    complexationEfficiencyPercent: 98.2,
    polybromideOilDensityGPerCm3: 2.32,
    aqueousFreeBr2Ppm: 120,
    selfDischargeReductionPercent: 96.0,
    primaryAdvantagesVi: 'Vòng morpholine chứa nguyên tử oxy ether tăng khả năng hòa tan trong nước và độ dẫn ion; bền nhiệt hơn ở khí hậu nhiệt đới (&gt;35°C).'
  },
  DMMP_BROMIDE: {
    id: 'DMMP_BROMIDE',
    nameVi: '1,1-Dimethylpiperidinium Bromide (DMP-Br Độ Nhớt Thấp)',
    chemicalFormula: '[C₇H₁₆N]⁺Br⁻',
    chemicalName: '1,1-dimethylpiperidinium bromide',
    complexationEfficiencyPercent: 97.5,
    polybromideOilDensityGPerCm3: 2.28,
    aqueousFreeBr2Ppm: 145,
    selfDischargeReductionPercent: 94.5,
    primaryAdvantagesVi: 'Pha dầu polybromide có độ nhớt thấp hơn 30%, giúp giảm áp suất bơm tuần hoàn và cải thiện tốc độ giải phóng Br₂ khi xả điện nhanh.'
  }
};

export class ZincBromineFlowBatteryEngine {
  private static readonly R = 8.31446; // J/(mol*K)
  private static readonly F = 96485.33; // C/mol
  private static readonly E0_CELL = 1.84; // V (E0_pos = +1.08 V, E0_neg = -0.76 V)

  /**
   * Tính toán điện thế Nernst, cơ chế tạo phức 2 pha polybromide và an toàn gai kẽm (Sand's Time)
   */
  public static calculateElectrochemicalPerformance(
    conditions: ZnBrOperatingConditions
  ): ZnBrElectrochemicalResult {
    const qAgent = ZN_BR_COMPLEXING_AGENTS[conditions.complexingAgent];
    const tk = conditions.temperatureC + 273.15;
    const soc = Math.min(0.95, Math.max(0.05, conditions.stateOfCharge));
    const currentDensityA = conditions.currentDensityMaPerCm2 * 1e-3; // A/cm2

    // 1. Nernst Open Circuit Voltage (OCV):
    // E_OCV = E0 + (RT / 2F) * ln( [Zn^2+]_anode * [Br2]_cathode / ([Br^-]^2 ) )
    // In presence of Q-Br, free Br2 activity is buffered by two-phase equilibrium:
    // a(Br2) ~ constant * soc
    const nernstShift = (this.R * tk / (2 * this.F)) * Math.log(
      Math.max(0.1, (soc * conditions.znBr2SaltConcentrationMolar) / (1 - soc * 0.8))
    );
    const openCircuitVoltageV = Number((this.E0_CELL + nernstShift * 0.25).toFixed(4));

    // 2. Overpotential Deconstruction:
    // A. Zinc Plating / Stripping Activation Overpotential (Butler-Volmer):
    // Zinc exchange current density j0_zn ~ 15 mA/cm2 = 0.015 A/cm2 on carbon plastic
    const j0Zn = 0.015 * (1 + 0.02 * (conditions.temperatureC - 25));
    const etaZnActivation = Number(((this.R * tk / (0.5 * this.F)) * Math.asinh(currentDensityA / (2 * j0Zn))).toFixed(4));

    // B. Bromine Redox Activation Overpotential:
    // 2 Br- <=> Br2 + 2e-, j0_br ~ 25 mA/cm2 = 0.025 A/cm2 on porous carbon felt
    const j0Br = 0.025 * (1 + 0.025 * (conditions.temperatureC - 25));
    const etaBrActivation = Number(((this.R * tk / (0.5 * this.F)) * Math.asinh(currentDensityA / (2 * j0Br))).toFixed(4));

    // C. Ohmic Overpotential: Microporous membrane (Daramic) + aqueous electrolyte
    // Daramic membrane ASR ~ 0.85 Ohm*cm2; aqueous 2.5M ZnBr2 ~ 0.45 Ohm*cm2
    const totalOhmicAsr = 1.30; // Ohm*cm2
    const etaOhmic = Number((currentDensityA * totalOhmicAsr).toFixed(4));

    // D. Concentration Diffusion Overpotential:
    // Hydrodynamic flow limits concentration boundary layer thickness
    const flowFactor = Math.sqrt(Math.max(1.0, conditions.electrolyteFlowRateLMin) / 3.0);
    const limitingCurrentA = 0.220 * (conditions.znBr2SaltConcentrationMolar / 2.5) * flowFactor; // A/cm2 (220 mA/cm2)
    const safeILim = Math.max(currentDensityA * 1.1, limitingCurrentA);
    const etaConcentration = Number(((this.R * tk / (2 * this.F)) * Math.log(safeILim / (safeILim - currentDensityA))).toFixed(4));

    const totalOverpotential = etaZnActivation + etaBrActivation + etaOhmic + etaConcentration;
    const operatingDischargeVoltageV = Number(Math.max(1.20, openCircuitVoltageV - totalOverpotential).toFixed(4));
    const operatingChargeVoltageV = Number((openCircuitVoltageV + totalOverpotential).toFixed(4));
    const powerDensityMwPerCm2 = Number((operatingDischargeVoltageV * conditions.currentDensityMaPerCm2).toFixed(1));

    // 3. Sand's Transition Time & Zinc Dendrite Safety:
    // tau_sand = pi * D_zn * (z * F * C_zn / 2 * J)^2
    // D_zn ~ 7.5e-6 cm2/s
    const dZn = 7.5e-6; // cm2/s
    const cZnMolPerCm3 = conditions.znBr2SaltConcentrationMolar * 1e-3; // mol/cm3
    const sandsTransitionTimeSeconds = Number(
      (Math.PI * dZn * Math.pow((2 * this.F * cZnMolPerCm3) / (2 * currentDensityA), 2)).toFixed(1)
    );

    const limitingCurrentDensityMaPerCm2 = Number((limitingCurrentA * 1000).toFixed(1));
    let dendriteGrowthRisk: 'SAFE_FLAT_PLATING' | 'MILD_ROUGHNESS' | 'DENDRITE_SHORT_CIRCUIT_RISK' = 'SAFE_FLAT_PLATING';
    if (conditions.currentDensityMaPerCm2 > limitingCurrentDensityMaPerCm2 * 0.85) {
      dendriteGrowthRisk = 'DENDRITE_SHORT_CIRCUIT_RISK';
    } else if (conditions.currentDensityMaPerCm2 > limitingCurrentDensityMaPerCm2 * 0.55) {
      dendriteGrowthRisk = 'MILD_ROUGHNESS';
    }

    // 4. Two-Phase Polybromide Complexation & Self-Discharge:
    // At higher SOC, more Br2 is stored in dense polybromide oil phase
    const oilPhaseVolumePercent = Number((soc * 18.5).toFixed(1)); // Up to 18.5% of positive electrolyte
    const aqueousFreeBromineConcentrationPpm = Number(
      (qAgent.aqueousFreeBr2Ppm * (0.4 + 0.6 * soc)).toFixed(0)
    );
    // Self-discharge rate (%/day) proportional to aqueous free Br2
    const selfDischargeRatePercentPerDay = Number(
      ((aqueousFreeBromineConcentrationPpm / 100) * 0.85).toFixed(2)
    );

    // Round-Trip Efficiency:
    // Voltage eff = V_dis / V_chg (~75-82%), Coulombic eff ~ 92%, Pumping eff ~ 96%
    const voltageEff = operatingDischargeVoltageV / operatingChargeVoltageV;
    const coulombicEff = 0.92;
    const pumpEff = 0.96;
    const roundTripEfficiencyPercent = Number((voltageEff * coulombicEff * pumpEff * 100).toFixed(1));

    return {
      openCircuitVoltageV,
      operatingDischargeVoltageV,
      operatingChargeVoltageV,
      powerDensityMwPerCm2,
      overpotentials: {
        zincDepositionActivationV: etaZnActivation,
        bromineRedoxActivationV: etaBrActivation,
        ohmicMembraneAndElectrolyteV: etaOhmic,
        concentrationDiffusionV: etaConcentration,
        totalV: Number(totalOverpotential.toFixed(4))
      },
      zincMorphologyAndDendriteSafety: {
        sandsTransitionTimeSeconds,
        limitingCurrentDensityMaPerCm2,
        dendriteGrowthRisk,
        recommendedRejuvenationStrippingIntervalCycles: 7 // strip to 0V every 7 cycles to remove all zinc
      },
      polybromidePhaseSeparation: {
        oilPhaseVolumePercent,
        aqueousFreeBromineConcentrationPpm,
        selfDischargeRatePercentPerDay
      },
      roundTripEfficiencyPercent
    };
  }

  /**
   * Thiết kế trạm lưu trữ năng lượng phân phối Zinc-Bromine (500 kW / 2 MWh Substation Unit)
   */
  public static designSubstationStoragePlant(
    ratedPowerKw: number,
    storageDurationHours: number,
    complexingAgent: ZnBrComplexingAgentType = 'MEP_BROMIDE'
  ): ZnBrSubstationPlantResult {
    const totalCapacityKwh = ratedPowerKw * storageDurationHours;
    const qAgent = ZN_BR_COMPLEXING_AGENTS[complexingAgent];

    // Standard industrial Zn-Br stack module (e.g. Redflow ZBM3 module = 10 kWh / 3 kW):
    // Cell active area: 1,000 cm2 (31.6 cm x 31.6 cm)
    // Nominal current: 50 A (50 mA/cm2)
    // Cell operating voltage: ~1.55 V discharge
    // Power per cell: ~77.5 W
    const cellActiveAreaCm2 = 1000;
    const cellPowerWatts = 77.5;
    const totalCellCount = Math.ceil((ratedPowerKw * 1000) / cellPowerWatts);
    const cellsPerModule = 60; // ~4.65 kW module
    const stackModuleCount = Math.ceil(totalCellCount / cellsPerModule);

    // Chemical Reactant Inventory:
    // Reaction: Zn + Br2 -> ZnBr2 (M_Zn = 65.38 g/mol, M_Br2 = 159.8 g/mol)
    // Specific energy ~ 65 Wh/kg of electrolyte solution
    // Total moles of electrons = (totalCapacityKwh * 3600 * 1000) / (1.55 V * 2 * F)
    const molesReacted = (totalCapacityKwh * 3.6e6) / (1.55 * 2 * this.F);
    const excessFactor = 1.35; // 35% excess electrolyte to maintain conductivity
    const totalZincInventoryKg = Number(((molesReacted * 65.38e-3 * excessFactor)).toFixed(1));
    const totalBromineInventoryKg = Number(((molesReacted * 159.8e-3 * excessFactor)).toFixed(1));

    // Electrolyte volume (2.5 M aqueous ZnBr2 solution):
    // Volume = moles / 2.5 M = Liters
    const totalElectrolyteVolumeLiters = Number(((molesReacted * excessFactor / 2.5)).toFixed(0));
    // Polybromide oil reservoir (dense bottom layer ~ 15% of positive side = 7.5% total):
    const polybromideOilReservoirLiters = Number(((totalElectrolyteVolumeLiters * 0.075)).toFixed(0));

    // Economics:
    // Earth-abundant Zinc and Bromine, recyclable HDPE plastic tanks and extruded carbon plastic bipolar plates
    // Redflow / Primus Power utility benchmark: $195 - $225 / kWh
    const capitalCostPerKwhUsd = 205;
    const totalCapExUsd = Number((totalCapacityKwh * capitalCostPerKwhUsd).toFixed(0));

    // Displaced peaker fossil emissions: 0.65 tons CO2 / MWh-cycle, 330 cycles/year
    const avoidedPeakerCo2TonsPerYear = Number(((totalCapacityKwh / 1000) * 330 * 0.65).toFixed(1));

    return {
      ratedPowerKw,
      storageDurationHours,
      totalCapacityKwh,
      cellActiveAreaCm2,
      totalCellCount,
      stackModuleCount,
      totalZincInventoryKg,
      totalBromineInventoryKg,
      totalElectrolyteVolumeLiters,
      polybromideOilReservoirLiters,
      capitalCostPerKwhUsd,
      totalCapExUsd,
      systemRoundTripEfficiencyPercent: 74.5,
      cycleLifeWithStrippingLimit: 12000,
      avoidedPeakerCo2TonsPerYear
    };
  }
}
