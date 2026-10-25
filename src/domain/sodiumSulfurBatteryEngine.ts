// src/domain/sodiumSulfurBatteryEngine.ts
// Domain Engine: High-Temperature Solid-State Sodium-Sulfur (Na-S) Battery
// Standards: NGK Utility Grid Benchmarks, Sodium Beta''-Alumina Solid Electrolyte (BASE), Polysulfide Phase Equilibria & IUPAC

export type BaseElectrolyteType = 'BASE_TUBULAR_STANDARD' | 'BASE_PLANAR_THIN' | 'BASE_ZIRCONIA_TOUGHENED';
export type NaSPolysulfidePhase = 'TWO_PHASE_S_NA2S5' | 'SINGLE_PHASE_POLYSULFIDES';

export interface BaseElectrolyteSpec {
  id: BaseElectrolyteType;
  name: string;
  chemicalFormula: string;
  geometry: 'TUBULAR' | 'PLANAR';
  wallThicknessMm: number;
  ionicConductivity320CSPerCm: number; // S/cm at 320°C
  activationEnergyEv: number;
  mechanicalStrengthMpa: number;
  vietnameseDescription: string;
}

export const BASE_ELECTROLYTES: Record<BaseElectrolyteType, BaseElectrolyteSpec> = {
  BASE_TUBULAR_STANDARD: {
    id: 'BASE_TUBULAR_STANDARD',
    name: 'Ống Gốm Beta\'\'-Alumina Chuẩn Công Nghiệp (Tubular BASE)',
    chemicalFormula: 'Na1.67Al10.33Mg0.67O17',
    geometry: 'TUBULAR',
    wallThicknessMm: 1.2,
    ionicConductivity320CSPerCm: 0.28,
    activationEnergyEv: 0.22,
    mechanicalStrengthMpa: 240,
    vietnameseDescription: 'Ống gốm rắn beta\'\'-alumina hình trụ bịt một đầu. Dẫn ion Na⁺ siêu tốc qua mặt phẳng dẫn 2D, cách điện tuyệt đối, ngăn cách natri lỏng và lưu huỳnh lỏng.'
  },
  BASE_PLANAR_THIN: {
    id: 'BASE_PLANAR_THIN',
    name: 'Tấm Gốm Phẳng Siêu Mỏng (Thin Planar BASE)',
    chemicalFormula: 'Na1.67Al10.33Mg0.67O17',
    geometry: 'PLANAR',
    wallThicknessMm: 0.5,
    ionicConductivity320CSPerCm: 0.32,
    activationEnergyEv: 0.21,
    mechanicalStrengthMpa: 290,
    vietnameseDescription: 'Cấu trúc đĩa phẳng siêu mỏng 0.5 mm, giảm 55% nội trở thuần ohmic ASR, gia tăng mật độ công suất phóng nạp nhanh.'
  },
  BASE_ZIRCONIA_TOUGHENED: {
    id: 'BASE_ZIRCONIA_TOUGHENED',
    name: 'Gốm Gia Cường Zirconia (ZTA Beta\'\'-Alumina)',
    chemicalFormula: 'Na-Beta\'\'-Al2O3 / 15wt% ZrO2',
    geometry: 'TUBULAR',
    wallThicknessMm: 1.0,
    ionicConductivity320CSPerCm: 0.24,
    activationEnergyEv: 0.23,
    mechanicalStrengthMpa: 380,
    vietnameseDescription: 'Hỗn hợp composite gốm gia cường pha hạt nano ZrO₂. Độ bền đứt gãy tăng vọt (K_IC = 4.8 MPa·m^1/2), chống sốc nhiệt và nứt gãy cơ học tuyệt đối.'
  }
};

export interface NaSOperatingConditions {
  electrolyteType: BaseElectrolyteType;
  operatingTempC: number;           // 290°C to 360°C (molten state)
  stateOfChargePercent: number;     // 0% to 100% (0% = Na2S3, 100% = S)
  currentDensityMaPerCm2: number;   // 50 to 300 mA/cm2
  dischargeMode: 'DISCHARGE' | 'CHARGE';
  ambientTempC: number;             // -20°C to 40°C
}

export interface NaSCellPerformanceResult {
  openCircuitVoltageV: number;
  polysulfidePhase: NaSPolysulfidePhase;
  polysulfideCompositionFormula: string; // e.g. S + Na2S5 or Na2S4.2
  operatingCellVoltageV: number;
  baseIonicConductivitySPerCm: number;
  areaSpecificResistanceOhmCm2: number;
  coulombicEfficiencyPercent: number; // Always 100% due to solid BASE
  voltageEfficiencyPercent: number;
  roundTripEnergyEfficiencyPercent: number;
  cellSpecificEnergyWhPerKg: number;
  cellVolumetricEnergyWhPerL: number;
  jouleHeatGenerationWattsPerCell: number;
  heatLossRateWattsPerCell: number;
  thermalSelfSustaining: boolean;
}

export interface NaSUtilityPlantResult {
  plantRatedPowerMw: number;
  durationHours: number;
  totalEnergyMwh: number;
  totalCellCount: number;
  totalMoltenSodiumTons: number;
  totalSulfurTons: number;
  footprintSquareMeters: number;
  capitalCostDollarsPerKwh: number;
  totalCapExMillionDollars: number;
  annualLevelizedCostDollarsPerKwhCycle: number;
  calendarLifeYearsGuaranteed: number;
}

export class SodiumSulfurBatteryEngine {
  public static readonly FARADAY_CONSTANT = 96485.33; // C/mol
  public static readonly BOLTZMANN_EV = 8.61733e-5; // eV/K
  public static readonly E0_TWO_PHASE_V = 2.076; // S + Na2S5 plateau voltage at 320°C
  public static readonly E0_CUTOFF_V = 1.780;    // Na2S3 discharge cutoff voltage
  public static readonly NA_ATOMIC_MASS_G_MOL = 22.99;
  public static readonly S_ATOMIC_MASS_G_MOL = 32.06;

  /**
   * Calculate BASE solid electrolyte ionic conductivity via Arrhenius equation.
   */
  public static calculateBaseConductivity(electrolyte: BaseElectrolyteSpec, tempC: number): number {
    const tempK = tempC + 273.15;
    const refTempK = 320 + 273.15; // 593.15 K
    return electrolyte.ionicConductivity320CSPerCm * Math.exp(
      -(electrolyte.activationEnergyEv / this.BOLTZMANN_EV) * (1 / tempK - 1 / refTempK)
    );
  }

  /**
   * Calculate cell open-circuit voltage (OCV) and polysulfide phase.
   * Region 1 (100% to 57% SOC): Two-phase liquid region (S + Na2S5) -> Constant OCV = 2.076 V.
   * Region 2 (57% to 0% SOC): Single-phase polysulfides (Na2S5 -> Na2S3) -> Linear decline to 1.780 V.
   */
  public static calculateCellOcv(socPercent: number, tempC: number): {
    ocvV: number;
    phase: NaSPolysulfidePhase;
    formula: string;
  } {
    const soc = Math.min(100.0, Math.max(0.0, socPercent));
    // Temperature coefficient dE/dT ~ -0.4 mV/K
    const tempK = tempC + 273.15;
    const tempCorrection = -0.0004 * (tempK - 593.15);

    if (soc >= 57.0) {
      // Two-phase region: Molten sulfur + Na2S5
      const ocvV = this.E0_TWO_PHASE_V + tempCorrection;
      const sulfurFraction = (soc - 57.0) / (100.0 - 57.0);
      const formula = sulfurFraction > 0.05
        ? `${(sulfurFraction * 100).toFixed(0)}% S(l) + Na₂S₅(l)`
        : 'Na₂S₅(l) Bão Hòa';
      return { ocvV, phase: 'TWO_PHASE_S_NA2S5', formula };
    } else {
      // Single-phase polysulfide progressive reduction: Na2S5 -> Na2Sx -> Na2S3
      const fraction = soc / 57.0; // 1 at 57% SOC, 0 at 0% SOC
      const x = 3.0 + 2.0 * fraction; // x from 3.0 to 5.0
      const ocvV = this.E0_CUTOFF_V + (this.E0_TWO_PHASE_V - this.E0_CUTOFF_V) * fraction + tempCorrection;
      return { ocvV, phase: 'SINGLE_PHASE_POLYSULFIDES', formula: `Na₂S_${x.toFixed(2)}(l)` };
    }
  }

  /**
   * Calculate detailed cell performance under operating current.
   */
  public static calculateCellPerformance(conditions: NaSOperatingConditions): NaSCellPerformanceResult {
    const electrolyte = BASE_ELECTROLYTES[conditions.electrolyteType];
    const { ocvV, phase, formula } = this.calculateCellOcv(conditions.stateOfChargePercent, conditions.operatingTempC);

    const sigmaBase = this.calculateBaseConductivity(electrolyte, conditions.operatingTempC);

    // Area-specific resistance ASR_BASE:
    const thicknessCm = electrolyte.wallThicknessMm * 0.1;
    const asrBase = thicknessCm / Math.max(0.01, sigmaBase);

    // Cathode sulfur felt resistance + contact resistance:
    // Molten sulfur/polysulfide porous graphite felt matrix ASR ~ 0.45 Ohm*cm2
    const asrCathodeFelt = 0.45;
    const asrContact = 0.15;
    const totalAsrOhmCm2 = asrBase + asrCathodeFelt + asrContact;

    const jAcm2 = conditions.currentDensityMaPerCm2 * 0.001;
    const vOhmic = jAcm2 * totalAsrOhmCm2;

    // Activation overpotential is exceptionally low at 320°C (molten liquid-metal / molten-salt interfaces)
    const etaAct = 0.025 * Math.log10(1 + conditions.currentDensityMaPerCm2 / 20.0);

    let operatingCellVoltageV = 0;
    if (conditions.dischargeMode === 'DISCHARGE') {
      operatingCellVoltageV = Math.max(1.30, ocvV - vOhmic - etaAct);
    } else {
      operatingCellVoltageV = ocvV + vOhmic + etaAct;
    }

    // Coulombic efficiency is 100% because solid ceramic BASE has zero electronic conduction
    const coulombicEfficiencyPercent = 100.0;
    // Estimated discharge-to-charge voltage ratio
    const nominalDischargeV = ocvV - vOhmic - etaAct;
    const nominalChargeV = ocvV + vOhmic + etaAct;
    const voltageEfficiencyPercent = (nominalDischargeV / nominalChargeV) * 100.0;
    const roundTripEnergyEfficiencyPercent = voltageEfficiencyPercent; // CE = 100%

    // Energy densities:
    // Commercial NGK cell: ~240 Wh/kg, ~390 Wh/L
    const cellSpecificEnergyWhPerKg = 240.0 * (nominalDischargeV / 2.0);
    const cellVolumetricEnergyWhPerL = 390.0 * (nominalDischargeV / 2.0);

    // Thermal balance per standard commercial cell (active area ~400 cm2):
    const cellActiveAreaCm2 = 400.0;
    const cellCurrentA = jAcm2 * cellActiveAreaCm2;
    const cellOverpotentialV = vOhmic + etaAct;
    const jouleHeatGenerationWattsPerCell = cellCurrentA * cellOverpotentialV;

    // Vacuum insulated thermal enclosure heat dissipation:
    // High-performance evacuated powder / multi-layer vacuum insulation (MLI):
    // heat loss is approx 4.5 W per cell at 320°C in pack assembly
    const heatLossRateWattsPerCell = 4.5 * ((conditions.operatingTempC - conditions.ambientTempC) / (320 - 25));
    const thermalSelfSustaining = jouleHeatGenerationWattsPerCell >= heatLossRateWattsPerCell;

    return {
      openCircuitVoltageV: ocvV,
      polysulfidePhase: phase,
      polysulfideCompositionFormula: formula,
      operatingCellVoltageV,
      baseIonicConductivitySPerCm: sigmaBase,
      areaSpecificResistanceOhmCm2: totalAsrOhmCm2,
      coulombicEfficiencyPercent,
      voltageEfficiencyPercent,
      roundTripEnergyEfficiencyPercent,
      cellSpecificEnergyWhPerKg,
      cellVolumetricEnergyWhPerL,
      jouleHeatGenerationWattsPerCell,
      heatLossRateWattsPerCell,
      thermalSelfSustaining
    };
  }

  /**
   * Utility grid plant sizing (1 MW to 50 MW / 6h duration).
   */
  public static calculateUtilityPlant(
    plantRatedPowerMw: number = 10.0,
    durationHours: number = 6.0
  ): NaSUtilityPlantResult {
    const totalEnergyMwh = plantRatedPowerMw * durationHours;

    // Standard commercial 50 kW / 300 kWh NaS module contains 384 tubular cells
    const cellsPerMwh = 1280; // 384 / 0.3 = 1280 cells per MWh
    const totalCellCount = Math.round(totalEnergyMwh * cellsPerMwh);

    // Raw active material consumption:
    // 2Na + 3S -> Na2S3 gives ~0.38 kg Na and ~0.80 kg S per kWh of nominal capacity
    const totalMoltenSodiumTons = (totalEnergyMwh * 1000.0 * 0.38) / 1000.0;
    const totalSulfurTons = (totalEnergyMwh * 1000.0 * 0.80) / 1000.0;

    // Footprint: High energy density allows 1 MW / 6 MWh system in ~160 m2 containerized footprint
    const footprintSquareMeters = (plantRatedPowerMw * 160.0);

    // Capital Cost Breakdown:
    // Commercial Na-S installed CapEx: ~$240 - $280 / kWh (including vacuum thermal enclosures and PCS)
    const capitalCostDollarsPerKwh = 245.0;
    const totalCapExMillionDollars = (capitalCostDollarsPerKwh * totalEnergyMwh * 1000.0) / 1e6;

    // Levelized Cost of Storage (LCOS):
    // 15 years, 365 cycles/yr = 5,475 cycles guaranteed, up to 7,300 cycles.
    const annualLevelizedCostDollarsPerKwhCycle = 0.048; // $0.048 / kWh-cycle
    const calendarLifeYearsGuaranteed = 15;

    return {
      plantRatedPowerMw,
      durationHours,
      totalEnergyMwh,
      totalCellCount,
      totalMoltenSodiumTons,
      totalSulfurTons,
      footprintSquareMeters,
      capitalCostDollarsPerKwh,
      totalCapExMillionDollars,
      annualLevelizedCostDollarsPerKwhCycle,
      calendarLifeYearsGuaranteed
    };
  }
}
