// src/domain/aluminumAirBatteryEngine.ts
// Aluminum-Air (Al-Air) Mechanically Rechargeable Battery & Alkaline Corrosion Inhibition Engine
// Standards: IUPAC Electrochemistry, Bayer Crystallization Kinetics, Phinergy EV Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Nhôm, Ăn mòn kim loại, Pin galvanic & Năng lượng)

export type AlAirInhibitorType = 'STANNATE_TIN' | 'ZINCATE_ZINC' | 'PEG_ORGANIC_SURFACTANT' | 'UNINHIBITED_RAW_AL';

export interface AlAirInhibitorSpec {
  id: AlAirInhibitorType;
  nameVi: string;
  chemicalFormula: string;
  herOverpotentialShiftMv: number; // Positive shift in Hydrogen Evolution Reaction overpotential (mV)
  corrosionInhibitionEfficiencyPercent: number;
  anodeFaradaicUtilizationPercent: number; // e.g. 92.5% vs 55%
  openCircuitSelfDischargePercentPerDay: number;
  primaryMechanismVi: string;
}

export interface AlAirOperatingConditions {
  inhibitor: AlAirInhibitorType;
  temperatureC: number; // 20 to 65 °C
  currentDensityMaPerCm2: number; // 20 to 250 mA/cm2
  kohConcentrationMolar: number; // 4.0 to 7.0 M KOH
  aluminateConcentrationMolar: number; // 0.5 to 4.5 M Al(OH)4-
  electrolyteFlowVelocityCmPerS: number; // 2 to 20 cm/s
  cellActiveAreaCm2: number; // e.g. 200 to 1200 cm2
  hasSeedCrystallizer: boolean; // Bayer seed crystallizer for Al(OH)3 precipitation
}

export interface AlAirElectrochemicalResult {
  openCircuitVoltageV: number; // E0 = 2.71 V, actual OCV ~ 1.75 - 1.95 V due to mixed potential
  operatingCellVoltageV: number;
  powerDensityMwPerCm2: number;
  overpotentials: {
    anodeActivationV: number;
    cathodeAirReductionActivationV: number; // Gas diffusion cathode ORR
    ohmicElectrolyteAndSeparatorV: number;
    concentrationAluminateDiffusionV: number;
    totalV: number;
  };
  parasiticCorrosionMetrics: {
    corrosionCurrentDensityMaPerCm2: number;
    hydrogenGasEvolutionRateMlPerMinPerCell: number; // H2 byproduct gas rate
    anodeFaradaicEfficiencyPercent: number;
    openCircuitShelfLifeLossPercentPerDay: number;
  };
  crystallizerState: {
    aluminateSupersaturationRatio: number;
    alOh3PrecipitationRateGPerHour: number;
    freeKohRegeneratedMolesPerHour: number;
    gelationRisk: 'SAFE_FLUID' | 'SATURATED_CRYSTALLIZING' | 'GELATION_CLOGGING_RISK';
  };
}

export interface AlAirVehiclePackResult {
  totalUsableEnergyKwh: number;
  vehicleRangeKm: number;
  aluminumAnodePlateWeightKg: number;
  totalBatterySystemWeightKg: number;
  equivalentLiIonBatteryWeightKg: number;
  weightSavingsPercent: number;
  mechanicalRefuelTimeMinutes: number;
  alOh3ByproductCollectedKg: number;
  aluminumConsumptionKgPer100Km: number;
  recycledAluminumEfficiencyPercent: number;
  avoidedTailpipeCo2TonsPerYear: number;
}

// 1. Catalog of Corrosion Inhibitors for Alkaline Aluminum-Air
export const AL_AIR_INHIBITORS: Record<AlAirInhibitorType, AlAirInhibitorSpec> = {
  STANNATE_TIN: {
    id: 'STANNATE_TIN',
    nameVi: 'Potassium Stannate K₂SnO₃ (Pha Tạp Thiếc Điện Hóa)',
    chemicalFormula: 'K₂SnO₃ (10-25 mM)',
    herOverpotentialShiftMv: 385,
    corrosionInhibitionEfficiencyPercent: 94.2,
    anodeFaradaicUtilizationPercent: 93.5,
    openCircuitSelfDischargePercentPerDay: 0.22,
    primaryMechanismVi: 'Ion thiếc Sn⁴⁺ kết tủa màng mỏng kim loại Sn (có quá thế thoát hydro cực cao) che phủ các tâm tạp chất Fe/Si trên hạt nhôm, ức chế phản ứng thoát khí hydro ăn mòn.'
  },
  ZINCATE_ZINC: {
    id: 'ZINCATE_ZINC',
    nameVi: 'Potassium Zincate K₂Zn(OH)₄ (Pha Tạp Kẽm Cận Cân Bằng)',
    chemicalFormula: 'K₂Zn(OH)₄ (20-50 mM)',
    herOverpotentialShiftMv: 320,
    corrosionInhibitionEfficiencyPercent: 88.5,
    anodeFaradaicUtilizationPercent: 87.8,
    openCircuitSelfDischargePercentPerDay: 0.45,
    primaryMechanismVi: 'Kẽm tạo lớp hợp kim bề mặt Al-Zn có thế điện cực trung gian, giảm tốc độ hòa tan tự phát của nhôm trong kiềm đặc KOH.'
  },
  PEG_ORGANIC_SURFACTANT: {
    id: 'PEG_ORGANIC_SURFACTANT',
    nameVi: 'Polyethylene Glycol PEG-6000 + Stannate (Hệ Hỗn Hợp Hữu Cơ - Vô Cơ)',
    chemicalFormula: 'PEG-6000 + K₂SnO₃',
    herOverpotentialShiftMv: 420,
    corrosionInhibitionEfficiencyPercent: 96.8,
    anodeFaradaicUtilizationPercent: 95.8,
    openCircuitSelfDischargePercentPerDay: 0.15,
    primaryMechanismVi: 'Phân tử hữu cơ PEG chuỗi dài hấp phụ vật lý tạo lớp chắn kỵ nước ngăn phân tử H₂O tiếp cận bề mặt nhôm, kết hợp với Sn⁴⁺ đạt độ ức chế ăn mòn kỷ lục >96%.'
  },
  UNINHIBITED_RAW_AL: {
    id: 'UNINHIBITED_RAW_AL',
    nameVi: 'Nhôm Thô Không Pha Tạp (Raw Commercial 99.5% Al)',
    chemicalFormula: 'Al (chứa 0.3% Fe/Si)',
    herOverpotentialShiftMv: 0,
    corrosionInhibitionEfficiencyPercent: 0.0,
    anodeFaradaicUtilizationPercent: 54.0,
    openCircuitSelfDischargePercentPerDay: 14.5,
    primaryMechanismVi: 'Không có phụ gia: Tạp chất Fe và Si tạo thành vô số pin vi mô cục bộ (galvanic micro-cells), giải phóng khí H₂ dữ dội gây lãng phí gần một nửa năng lượng nhôm.'
  }
};

export class AluminumAirBatteryEngine {
  private static readonly R = 8.31446; // J/(mol*K)
  private static readonly F = 96485.33; // C/mol
  private static readonly E0_THEORETICAL = 2.71; // V (E0_Al = -2.31 V, E0_O2 = +0.40 V)
  public static readonly AL_THEORETICAL_CAPACITY_AH_KG = 2980; // Ah/kg
  public static readonly AL_THEORETICAL_ENERGY_WH_KG = 8100; // Wh/kg

  /**
   * Tính toán điện thế tế bào Al-Air, phân rã quá thế, ăn mòn ký sinh và cân bằng kết tinh Al(OH)3
   */
  public static calculateElectrochemicalPerformance(
    conditions: AlAirOperatingConditions
  ): AlAirElectrochemicalResult {
    const inhibitor = AL_AIR_INHIBITORS[conditions.inhibitor];
    const tk = conditions.temperatureC + 273.15;
    const jA = conditions.currentDensityMaPerCm2 * 1e-3; // A/cm2

    // 1. Mixed Open Circuit Voltage (OCV):
    // In alkaline solution, Al establishes a mixed potential governed by anodic Al dissolution
    // and cathodic parasitic hydrogen evolution. Real OCV is ~1.75 - 1.95 V (not theoretical 2.71 V).
    const mixedPotentialOcv = Number((1.72 + (inhibitor.herOverpotentialShiftMv * 1e-3) * 0.45).toFixed(4));

    // 2. Overpotential Deconstruction:
    // A. Anode Aluminum Dissolution Overpotential:
    // Al + 4OH- -> Al(OH)4- + 3e- (Exchange current j0 ~ 45 mA/cm2 = 0.045 A/cm2)
    const j0Al = 0.045 * Math.exp(0.03 * (conditions.temperatureC - 25));
    const etaAnode = Number(((this.R * tk / (1.5 * this.F)) * Math.asinh(jA / (2 * j0Al))).toFixed(4));

    // B. Cathode Air-Breathing Oxygen Reduction Reaction (ORR):
    // Gas diffusion electrode (GDE) with Co3O4 / MnO2 or Ag catalyst: j0_orr ~ 2.5 mA/cm2 = 0.0025 A/cm2
    const j0Orr = 0.0025 * Math.exp(0.025 * (conditions.temperatureC - 25));
    const etaCathode = Number(((this.R * tk / (0.5 * this.F)) * Math.asinh(jA / (2 * j0Orr))).toFixed(4));

    // C. Ohmic Overpotential: Alkaline electrolyte (5-6M KOH conductivity ~ 0.55 S/cm)
    // Inter-electrode gap ~ 2 mm (0.2 cm), separator resistance ~ 0.25 Ohm*cm2
    const electrolyteConductivity = 0.52 * (conditions.kohConcentrationMolar / 5.5); // S/cm
    const gapCm = 0.20;
    const electrolyteAsr = gapCm / electrolyteConductivity; // ~0.38 Ohm*cm2
    const separatorAndContactAsr = 0.32; // Ohm*cm2
    const totalOhmicAsr = electrolyteAsr + separatorAndContactAsr;
    const etaOhmic = Number((jA * totalOhmicAsr).toFixed(4));

    // D. Aluminate Diffusion Concentration Overpotential:
    // Boundary layer diffusion of Al(OH)4- away from Al surface
    const vFlow = Math.max(2.0, conditions.electrolyteFlowVelocityCmPerS);
    const jLimAluminate = 0.380 * Math.sqrt(vFlow / 10.0) * (6.0 / Math.max(1.0, conditions.aluminateConcentrationMolar)); // A/cm2
    const safeJLim = Math.max(jA * 1.12, jLimAluminate);
    const etaConcentration = Number(((this.R * tk / (3 * this.F)) * Math.log(safeJLim / (safeJLim - jA))).toFixed(4));

    const totalOverpotential = etaAnode + etaCathode + etaOhmic + etaConcentration;
    const operatingCellVoltageV = Number(Math.max(0.85, mixedPotentialOcv - totalOverpotential).toFixed(4));
    const powerDensityMwPerCm2 = Number((operatingCellVoltageV * conditions.currentDensityMaPerCm2).toFixed(1));

    // 3. Parasitic Hydrogen Evolution Corrosion Kinetics:
    // Uninhibited Al corrosion current j_corr0 ~ 25 mA/cm2 in 6M KOH at 25°C
    const baseCorrosionMa = 24.0 * Math.exp(0.04 * (conditions.temperatureC - 25));
    const corrosionCurrentDensityMaPerCm2 = Number(
      (baseCorrosionMa * (1 - inhibitor.corrosionInhibitionEfficiencyPercent / 100)).toFixed(2)
    );

    // Faradaic Efficiency = j_discharge / (j_discharge + j_corrosion)
    const anodeFaradaicEfficiencyPercent = Number(
      ((conditions.currentDensityMaPerCm2 / (conditions.currentDensityMaPerCm2 + corrosionCurrentDensityMaPerCm2)) * 100).toFixed(1)
    );

    // Hydrogen Gas Evolution Rate:
    // 2 Al + 6 H2O + 2 OH- -> 2 Al(OH)4- + 3 H2 (3 mol H2 per 6 mol e-)
    // n_dot_H2 = (I_corr) / (2 * F) mol/s per cell
    const cellArea = conditions.cellActiveAreaCm2;
    const iCorrTotalA = (corrosionCurrentDensityMaPerCm2 * 1e-3) * cellArea;
    const h2MolPerSec = iCorrTotalA / (2 * this.F);
    // Gas volume at T (ml/min): V = n * R * T / P * 1e6 * 60
    const hydrogenGasEvolutionRateMlPerMinPerCell = Number(
      ((h2MolPerSec * this.R * tk * 1e6 * 60) / 101325).toFixed(2)
    );

    // 4. Closed-Loop Bayer Seed Crystallizer Dynamics:
    // Equilibrium solubility of Al(OH)4- in 6M KOH at T ~ 1.8 M
    const equilibriumSolubilityMolar = 1.6 + 0.035 * (conditions.temperatureC - 25);
    const aluminateSupersaturationRatio = Number((conditions.aluminateConcentrationMolar / equilibriumSolubilityMolar).toFixed(2));

    let gelationRisk: 'SAFE_FLUID' | 'SATURATED_CRYSTALLIZING' | 'GELATION_CLOGGING_RISK' = 'SAFE_FLUID';
    if (conditions.aluminateConcentrationMolar > 3.8 && !conditions.hasSeedCrystallizer) {
      gelationRisk = 'GELATION_CLOGGING_RISK';
    } else if (conditions.aluminateConcentrationMolar > equilibriumSolubilityMolar) {
      gelationRisk = 'SATURATED_CRYSTALLIZING';
    }

    // Al(OH)3 Precipitation Rate (g/hr per cell):
    // Reaction: Al(OH)4- -> Al(OH)3(s) + OH- (M_Al(OH)3 = 78.0 g/mol)
    const cellDischargeCurrentA = jA * cellArea;
    const alMolesConsumedPerSec = cellDischargeCurrentA / (3 * this.F);
    const crystallizationEfficiency = conditions.hasSeedCrystallizer ? 0.95 : 0.20;
    const alOh3PrecipitationRateGPerHour = Number(
      (alMolesConsumedPerSec * crystallizationEfficiency * 78.0 * 3600).toFixed(2)
    );
    const freeKohRegeneratedMolesPerHour = Number(
      (alMolesConsumedPerSec * crystallizationEfficiency * 3600).toFixed(3)
    );

    return {
      openCircuitVoltageV: mixedPotentialOcv,
      operatingCellVoltageV,
      powerDensityMwPerCm2,
      overpotentials: {
        anodeActivationV: etaAnode,
        cathodeAirReductionActivationV: etaCathode,
        ohmicElectrolyteAndSeparatorV: etaOhmic,
        concentrationAluminateDiffusionV: etaConcentration,
        totalV: Number(totalOverpotential.toFixed(4))
      },
      parasiticCorrosionMetrics: {
        corrosionCurrentDensityMaPerCm2,
        hydrogenGasEvolutionRateMlPerMinPerCell,
        anodeFaradaicEfficiencyPercent,
        openCircuitShelfLifeLossPercentPerDay: inhibitor.openCircuitSelfDischargePercentPerDay
      },
      crystallizerState: {
        aluminateSupersaturationRatio,
        alOh3PrecipitationRateGPerHour,
        freeKohRegeneratedMolesPerHour,
        gelationRisk
      }
    };
  }

  /**
   * Thiết kế hệ thống gói pin ô tô điện tầm cực xa (100 kWh EV Ultra-Long Range Pack > 1,500 km)
   */
  public static designElectricVehicleBatteryPack(
    totalUsableEnergyKwh: number = 100.0,
    inhibitorType: AlAirInhibitorType = 'PEG_ORGANIC_SURFACTANT'
  ): AlAirVehiclePackResult {
    const inhibitor = AL_AIR_INHIBITORS[inhibitorType];

    // Standard EV energy consumption: ~14 kWh per 100 km (e.g. Model 3 / Ioniq class)
    const vehicleRangeKm = Number(((totalUsableEnergyKwh / 14.0) * 100).toFixed(0)); // ~714 - 1700 km depending on pack

    // Aluminum Anode Consumption:
    // Practical energy delivered per kg Al:
    // E_practical = V_cell * 2,980 Ah/kg * Faradaic_eff ~ 1.35 V * 2980 * 0.94 ~ 3,780 Wh/kg = 3.78 kWh/kg Al
    const practicalKwhPerKgAl = 1.35 * (this.AL_THEORETICAL_CAPACITY_AH_KG * 1e-3) * (inhibitor.anodeFaradaicUtilizationPercent / 100);
    const aluminumAnodePlateWeightKg = Number((totalUsableEnergyKwh / practicalKwhPerKgAl).toFixed(1));

    // Vehicle pack mass breakdown:
    // Anode cassette weight + Air cathode stack + KOH circulating electrolyte + seed crystallizer box
    const cathodeAndStackWeightKg = 22.0;
    const electrolyteWeightKg = 18.0;
    const auxiliaryPumpsAndHousingKg = 12.0;
    const totalBatterySystemWeightKg = Number(
      (aluminumAnodePlateWeightKg + cathodeAndStackWeightKg + electrolyteWeightKg + auxiliaryPumpsAndHousingKg).toFixed(1)
    );

    // Equivalent Lithium-ion battery pack (100 kWh Li-ion @ 180 Wh/kg pack level):
    // Mass = 100,000 Wh / 180 Wh/kg ~ 555 kg!
    const equivalentLiIonBatteryWeightKg = Number(((totalUsableEnergyKwh * 1000) / 180).toFixed(1));

    // Weight savings %:
    const weightSavingsPercent = Number(
      (((equivalentLiIonBatteryWeightKg - totalBatterySystemWeightKg) / equivalentLiIonBatteryWeightKg) * 100).toFixed(1)
    );

    // Aluminum Consumption per 100 km:
    const aluminumConsumptionKgPer100Km = Number(((aluminumAnodePlateWeightKg / vehicleRangeKm) * 100).toFixed(2));

    // Solid Al(OH)3 Byproduct collected (M_Al(OH)3 / M_Al = 78.0 / 26.98 = 2.89 kg byproduct per kg Al):
    const alOh3ByproductCollectedKg = Number((aluminumAnodePlateWeightKg * 2.89).toFixed(1));

    // Mechanical Refuel Time:
    // Replacing cassette aluminum cartridges takes under 3 minutes at an automated service station!
    const mechanicalRefuelTimeMinutes = 3.0;

    // Recycled Aluminum closed-loop smelter efficiency:
    // 100% of Al(OH)3 precipitates into industrial gibbsite, converted back to Al via smelting with 98% yield
    const recycledAluminumEfficiencyPercent = 98.2;

    // Avoided Tailpipe Fossil CO2:
    // Standard gasoline car (150 g CO2/km) driving 20,000 km/year:
    const avoidedTailpipeCo2TonsPerYear = Number(((20000 * 0.150) / 1000).toFixed(2)); // ~3.0 tons CO2/yr

    return {
      totalUsableEnergyKwh,
      vehicleRangeKm,
      aluminumAnodePlateWeightKg,
      totalBatterySystemWeightKg,
      equivalentLiIonBatteryWeightKg,
      weightSavingsPercent,
      mechanicalRefuelTimeMinutes,
      alOh3ByproductCollectedKg,
      aluminumConsumptionKgPer100Km,
      recycledAluminumEfficiencyPercent,
      avoidedTailpipeCo2TonsPerYear
    };
  }
}
