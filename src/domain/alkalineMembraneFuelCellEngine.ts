// src/domain/alkalineMembraneFuelCellEngine.ts
// Alkaline Anion Exchange Membrane Fuel Cell (AEMFC) Engine for Platinum-Free Zero-Carbon Heavy Transportation
// Standards: IUPAC Electrochemistry, DOE Hydrogen & Fuel Cell Benchmarks, Carbonation Self-Purging Kinetics & Vietnam GDPT 2018 Chemistry (Hóa 10: Tốc độ phản ứng, Hóa 12: Pin nhiên liệu & Thế điện cực)

export type AemfcCatalystType =
  | 'PGM_FREE_AG_NIMO'
  | 'CO3O4_SPINEL_NICU'
  | 'LOW_PGM_BENCHMARK_PT_RU';

export interface AemfcCatalystSpec {
  id: AemfcCatalystType;
  nameVi: string;
  cathodeOrrCatalyst: string;
  anodeHorCatalyst: string;
  pgmLoadingMgPerCm2: number; // 0.0 for PGM-free vs ~0.15 mg/cm2 for Pt
  costPerKwDollar: number; // Catalyst cost per kW stack
  orrExchangeCurrentDensityAcm2: number; // j0_orr at 70°C
  horExchangeCurrentDensityAcm2: number; // j0_hor at 70°C
  durabilityHours: number;
  mechanismVi: string;
}

export interface AemfcOperatingConditions {
  catalystType: AemfcCatalystType;
  temperatureC: number; // 60 to 85 °C
  pressureBar: number; // 1.0 to 3.0 bar
  currentDensityAcm2: number; // 0.1 to 2.5 A/cm2
  co2InletPpm: number; // 0 to 500 ppm (ambient air contains ~420 ppm)
  membraneThicknessMicrons: number; // 10 to 30 um (e.g. PiperION)
  relativeHumidityCathodePercent: number; // 70 to 100%
  relativeHumidityAnodePercent: number; // 60 to 100%
  cellActiveAreaCm2: number; // 200 to 500 cm2
}

export interface AemfcPerformanceResult {
  openCircuitVoltageV: number; // E0 ~ 1.23 V at 25°C, ~1.18 V at 70°C
  operatingCellVoltageV: number;
  powerDensityWPerCm2: number;
  overpotentials: {
    anodeHorActivationV: number;
    cathodeOrrActivationV: number;
    ohmicMembraneAndIonomerV: number;
    carbonationOverpotentialV: number; // Nernstian loss due to CO3(2-)
    massTransferConcentrationV: number;
    totalV: number;
  };
  carbonationState: {
    membraneCarbonateFractionPercent: number;
    anodeCo2PurgeRateMlPerMinPerCell: number;
    selfPurgingEfficiencyPercent: number;
    isOperatingInSelfPurgingRegime: boolean;
  };
  waterManagement: {
    cathodeConsumptionGPerHour: number;
    anodeProductionGPerHour: number;
    netWaterBalanceGPerHour: number;
    backDiffusionSufficiencyRatio: number; // >1.0 means back-diffusion prevents cathode dry-out
  };
  efficiencies: {
    voltageEfficiencyPercent: number;
    systemLhvEfficiencyPercent: number;
  };
}

export interface AemfcHeavyTruckSystemResult {
  netStackPowerKw: number;
  totalRepeatCellsCount: number;
  stackActiveAreaM2: number;
  totalPgmWeightGrams: number;
  totalCatalystCostDollar: number;
  equivalentPemfcCatalystCostDollar: number;
  catalystCostSavingsPercent: number;
  hydrogenConsumptionKgPer100Km: number;
  drivingRangeKmOn50KgH2: number;
  refuelTimeMinutes: number;
  avoidedDieselCo2TonsPerYear: number;
}

// 1. Catalog of AEMFC Catalyst Systems
export const AEMFC_CATALYSTS: Record<AemfcCatalystType, AemfcCatalystSpec> = {
  PGM_FREE_AG_NIMO: {
    id: 'PGM_FREE_AG_NIMO',
    nameVi: 'Không Kim Loại Quý: Bạc (Ag/C) + Niken-Molybden (Ni-Mo/C)',
    cathodeOrrCatalyst: 'Silver Nanoparticles on Carbon (Ag/C, 1.5 mg/cm²)',
    anodeHorCatalyst: 'Nickel-Molybdenum Alloy on Carbon (Ni-Mo/C, 2.0 mg/cm²)',
    pgmLoadingMgPerCm2: 0.0,
    costPerKwDollar: 11.5,
    orrExchangeCurrentDensityAcm2: 0.0035, // 3.5 mA/cm2
    horExchangeCurrentDensityAcm2: 0.045, // 45 mA/cm2
    durabilityHours: 8500,
    mechanismVi: 'Trong môi trường kiềm đặc (pH > 13), bề mặt hạt nano Ag có tương tác tạo phức thuận lợi với chất trung gian O* và OH*, cho phép phản ứng khử oxy (ORR) 4 electron diễn ra nhanh gấp hàng trăm lần so với môi trường axit mà không cần một gam bạch kim (Pt) nào.'
  },
  CO3O4_SPINEL_NICU: {
    id: 'CO3O4_SPINEL_NICU',
    nameVi: 'Oxit Spinel Co₃O₄/C + Hợp Kim Niken-Đồng (Ni-Cu/C)',
    cathodeOrrCatalyst: 'Cobalt Spinel Oxide Co₃O₄ on Carbon (1.2 mg/cm²)',
    anodeHorCatalyst: 'Nickel-Copper Alloy on Carbon (Ni-Cu/C, 1.8 mg/cm²)',
    pgmLoadingMgPerCm2: 0.0,
    costPerKwDollar: 7.8,
    orrExchangeCurrentDensityAcm2: 0.0022,
    horExchangeCurrentDensityAcm2: 0.038,
    durabilityHours: 7200,
    mechanismVi: 'Hệ oxit kim loại chuyển tiếp dồi dào trên vỏ Trái Đất. Các cation Co³⁺/Co²⁺ trong mạng spinel đóng vai trò tâm chuyển dịch điện tích liên tục, giảm thiểu chi phí vật liệu xúc tác xuống dưới $8/kW.'
  },
  LOW_PGM_BENCHMARK_PT_RU: {
    id: 'LOW_PGM_BENCHMARK_PT_RU',
    nameVi: 'Hệ Tham Chiếu Bạch Kim Thấp (Pt/C + Pt-Ru/C)',
    cathodeOrrCatalyst: 'Platinum on Carbon (Pt/C, 0.10 mg Pt/cm²)',
    anodeHorCatalyst: 'Platinum-Ruthenium on Carbon (Pt-Ru/C, 0.05 mg PGM/cm²)',
    pgmLoadingMgPerCm2: 0.15,
    costPerKwDollar: 48.0,
    orrExchangeCurrentDensityAcm2: 0.0085,
    horExchangeCurrentDensityAcm2: 0.120,
    durabilityHours: 12000,
    mechanismVi: 'Hệ xúc tác bạch kim truyền thống tối ưu cho nghiên cứu đối sánh. Đạt mật độ dòng cực đại nhưng chịu chi phí đắt đỏ và phụ thuộc vào chuỗi cung ứng PGM khan hiếm toàn cầu.'
  }
};

export class AlkalineMembraneFuelCellEngine {
  private static readonly F = 96485.33; // Faraday constant (C/mol)
  private static readonly R = 8.31446; // J/(mol*K)

  /**
   * Tính toán điện thế, phân rã quá thế, tự thoát CO2 và cân bằng nước trong AEMFC
   */
  public static calculatePerformance(
    conditions: AemfcOperatingConditions
  ): AemfcPerformanceResult {
    const spec = AEMFC_CATALYSTS[conditions.catalystType];
    const tk = conditions.temperatureC + 273.15;
    const j = conditions.currentDensityAcm2; // A/cm2

    // 1. Reversible Open Circuit Voltage (OCV):
    // E0(T) = 1.229 - 0.00085 * (tk - 298.15) + (RT/4F)*ln(P_O2) + (RT/2F)*ln(P_H2)
    const pO2 = Math.max(0.1, conditions.pressureBar * 0.21);
    const pH2 = Math.max(0.5, conditions.pressureBar * 0.95);
    const nernstBase = 1.229 - 0.00085 * (tk - 298.15);
    const nernstPressureCorrection = ((this.R * tk) / (4 * this.F)) * Math.log(pO2 * Math.pow(pH2, 2));
    const theoreticalOcv = Number((nernstBase + nernstPressureCorrection).toFixed(4));
    // Real OCV with internal crossover & mixed potential ~ 1.02 - 1.05 V
    const realOcv = Number((Math.min(1.05, theoreticalOcv - 0.14)).toFixed(4));

    // 2. Overpotential Deconstruction (Porous Gas Diffusion Electrode Kinetics):
    // Catalyst layer effective roughness factor a_r ~ 10 - 15 cm2_active / cm2_geometric
    const roughnessFactor = 12.0;

    // A. Anode Hydrogen Oxidation Reaction (HOR) Overpotential:
    // 2 H2 + 4 OH- -> 4 H2O + 4 e-
    const j0HorEff = spec.horExchangeCurrentDensityAcm2 * roughnessFactor * Math.exp(0.025 * (conditions.temperatureC - 70));
    const etaAnode = Number(((this.R * tk / (1.0 * this.F)) * Math.asinh(j / (2 * j0HorEff))).toFixed(4));

    // B. Cathode Oxygen Reduction Reaction (ORR) Overpotential:
    // O2 + 2 H2O + 4 e- -> 4 OH- (Tafel slope b ~ 65-80 mV/dec in alkaline)
    const j0OrrEff = spec.orrExchangeCurrentDensityAcm2 * roughnessFactor * Math.exp(0.035 * (conditions.temperatureC - 70));
    const etaCathode = Number(((this.R * tk / (0.50 * this.F)) * Math.asinh(j / (2 * j0OrrEff))).toFixed(4));

    // C. Ohmic Overpotential: Anion exchange membrane (PiperION / Sustainion)
    // Hydroxide conductivity ~ 0.12 S/cm at 70°C.
    // Carbonate accumulation reduces conductivity by up to 45% if CO2 is present
    const baseConductivitySPerCm = 0.12 * Math.exp(0.015 * (conditions.temperatureC - 70));
    const carbonateInhibitionFactor = 1.0 - Math.min(0.40, (conditions.co2InletPpm / 500.0) * 0.40 * Math.exp(-j / 0.8));
    const effectiveConductivity = baseConductivitySPerCm * carbonateInhibitionFactor;
    const membraneThicknessCm = conditions.membraneThicknessMicrons * 1e-4; // e.g. 15 um = 0.0015 cm
    const membraneAsr = membraneThicknessCm / effectiveConductivity; // ~ 0.0125 - 0.025 Ohm*cm2
    const contactAndIonomerAsr = 0.032; // Ohm*cm2
    const totalOhmicAsr = membraneAsr + contactAndIonomerAsr;
    const etaOhmic = Number((j * totalOhmicAsr).toFixed(4));

    // D. Carbonation Nernstian Overpotential & Electrochemical Self-Purging:
    // CO2 + 2 OH- -> CO3(2-) + H2O. At anode: CO3(2-) + 2H+ -> CO2(g) + H2O
    // At high current density (j > 0.8 A/cm2), self-purging purges CO2 out through the anode!
    const isSelfPurging = j >= 0.8;
    const selfPurgingEfficiencyPercent = Number((Math.min(98.5, 45.0 + (j / 2.0) * 53.5)).toFixed(1));
    const unpurgedCo2Fraction = Math.max(0.02, 1.0 - (selfPurgingEfficiencyPercent / 100));
    const carbonationOverpotentialV = Number(
      ((conditions.co2InletPpm / 420.0) * 0.035 * unpurgedCo2Fraction).toFixed(4)
    );

    // E. Concentration / Mass Transfer Overpotential:
    // Limiting current density j_lim ~ 2.8 A/cm2 on modern gas diffusion layers
    const jLim = 2.85 * Math.sqrt(conditions.pressureBar / 1.5);
    const safeJLim = Math.max(j * 1.08, jLim);
    const etaConcentration = Number(((this.R * tk / (2 * this.F)) * Math.log(safeJLim / (safeJLim - j))).toFixed(4));

    const totalOverpotential = etaAnode + etaCathode + etaOhmic + carbonationOverpotentialV + etaConcentration;
    const operatingCellVoltageV = Number(Math.max(0.45, realOcv - totalOverpotential).toFixed(4));
    const powerDensityWPerCm2 = Number((operatingCellVoltageV * j).toFixed(3));

    // 3. Carbonation Metrics & Anode CO2 Purge Rate:
    // CO2 flux purged at anode (ml/min per cell) = j * cellArea * unpurged / F
    const cellDischargeCurrentA = j * conditions.cellActiveAreaCm2;
    const co2MolesPerSec = (cellDischargeCurrentA / (2 * this.F)) * (conditions.co2InletPpm * 1e-6);
    const anodeCo2PurgeRateMlPerMinPerCell = Number(
      ((co2MolesPerSec * this.R * tk * 1e6 * 60) / (conditions.pressureBar * 101325)).toFixed(3)
    );
    const membraneCarbonateFractionPercent = Number(((1.0 - (selfPurgingEfficiencyPercent / 100)) * (conditions.co2InletPpm / 420.0) * 35.0).toFixed(1));

    // 4. Water Management:
    // Cathode consumes 2 H2O per 4 e- (0.5 mol H2O / mol e-), M_H2O = 18.015 g/mol
    // n_dot_H2O_consumed = I / (2 * F) mol/s
    const waterConsumedMolPerSec = cellDischargeCurrentA / (2 * this.F);
    const cathodeConsumptionGPerHour = Number((waterConsumedMolPerSec * 18.015 * 3600).toFixed(1));

    // Anode produces 4 H2O per 4 e- (1.0 mol H2O / mol e-)
    const waterProducedMolPerSec = cellDischargeCurrentA / this.F;
    const anodeProductionGPerHour = Number((waterProducedMolPerSec * 18.015 * 3600).toFixed(1));
    const netWaterBalanceGPerHour = Number((anodeProductionGPerHour - cathodeConsumptionGPerHour).toFixed(1));

    // Back-diffusion across thin membrane (15 um) provides ~1.35x cathode consumption
    const backDiffusionSufficiencyRatio = Number(
      ((25.0 / conditions.membraneThicknessMicrons) * (conditions.relativeHumidityAnodePercent / 90.0)).toFixed(2)
    );

    // 5. System Efficiencies:
    // LHV efficiency: eta_lhv = V_cell / 1.253 V (where 1.253 V is LHV thermoneutral voltage of H2)
    const voltageEfficiencyPercent = Number(((operatingCellVoltageV / realOcv) * 100).toFixed(1));
    const systemLhvEfficiencyPercent = Number(((operatingCellVoltageV / 1.253) * 100).toFixed(1));

    return {
      openCircuitVoltageV: realOcv,
      operatingCellVoltageV,
      powerDensityWPerCm2,
      overpotentials: {
        anodeHorActivationV: etaAnode,
        cathodeOrrActivationV: etaCathode,
        ohmicMembraneAndIonomerV: etaOhmic,
        carbonationOverpotentialV,
        massTransferConcentrationV: etaConcentration,
        totalV: Number(totalOverpotential.toFixed(4))
      },
      carbonationState: {
        membraneCarbonateFractionPercent,
        anodeCo2PurgeRateMlPerMinPerCell,
        selfPurgingEfficiencyPercent,
        isOperatingInSelfPurgingRegime: isSelfPurging
      },
      waterManagement: {
        cathodeConsumptionGPerHour,
        anodeProductionGPerHour,
        netWaterBalanceGPerHour,
        backDiffusionSufficiencyRatio
      },
      efficiencies: {
        voltageEfficiencyPercent,
        systemLhvEfficiencyPercent
      }
    };
  }

  /**
   * Thiết kế hệ thống truyền động pin nhiên liệu xe tải nặng 150 kW (Class-8 Long-Haul Fuel Cell Truck)
   */
  public static designHeavyTruckPowerSystem(
    netStackPowerKw: number = 150.0,
    catalystType: AemfcCatalystType = 'PGM_FREE_AG_NIMO'
  ): AemfcHeavyTruckSystemResult {
    const spec = AEMFC_CATALYSTS[catalystType];

    // Design point: 1.5 A/cm2 @ 0.70 V -> 1.05 W/cm2
    const cellPowerDensityWPerCm2 = 1.05;
    const singleCellActiveAreaCm2 = 350.0; // 350 cm2 commercial automotive cell
    const powerPerCellWatts = cellPowerDensityWPerCm2 * singleCellActiveAreaCm2; // 367.5 W per cell

    // Stack sizing: 150 kW net power (+10% auxiliary power = 165 kW gross stack)
    const grossStackPowerWatts = netStackPowerKw * 1000 * 1.10;
    const totalRepeatCellsCount = Math.ceil(grossStackPowerWatts / powerPerCellWatts); // ~450 cells
    const stackActiveAreaM2 = Number(((totalRepeatCellsCount * singleCellActiveAreaCm2) * 1e-4).toFixed(2));

    // Catalyst Cost & PGM Content:
    const totalPgmWeightGrams = Number(
      ((stackActiveAreaM2 * 1e4 * spec.pgmLoadingMgPerCm2) * 1e-3).toFixed(1)
    );
    const totalCatalystCostDollar = Number((netStackPowerKw * spec.costPerKwDollar).toFixed(0));

    // Equivalent PEMFC catalyst cost ($55/kW, 0.40 mg Pt/cm2):
    const equivalentPemfcCatalystCostDollar = Number((netStackPowerKw * 55.0).toFixed(0));
    const catalystCostSavingsPercent = Number(
      (((equivalentPemfcCatalystCostDollar - totalCatalystCostDollar) / equivalentPemfcCatalystCostDollar) * 100).toFixed(1)
    );

    // Hydrogen consumption:
    // Heavy truck energy consumption: ~7.5 kg H2 per 100 km (at 60% system LHV efficiency)
    const hydrogenConsumptionKgPer100Km = 7.5;
    // Standard Class-8 onboard storage: 50 kg compressed H2 (700 bar)
    const drivingRangeKmOn50KgH2 = Number(((50.0 / hydrogenConsumptionKgPer100Km) * 100).toFixed(0)); // ~667 km

    // Fast 700 bar H2 refuel time:
    const refuelTimeMinutes = 12.0;

    // Avoided diesel CO2 emissions:
    // Diesel truck (35 L/100 km -> 92.4 kg CO2/100 km) driving 120,000 km/year:
    const annualKm = 120000;
    const avoidedDieselCo2TonsPerYear = Number(((annualKm * 0.924) / 1000).toFixed(1)); // ~110.9 tons CO2/yr

    return {
      netStackPowerKw,
      totalRepeatCellsCount,
      stackActiveAreaM2,
      totalPgmWeightGrams,
      totalCatalystCostDollar,
      equivalentPemfcCatalystCostDollar,
      catalystCostSavingsPercent,
      hydrogenConsumptionKgPer100Km,
      drivingRangeKmOn50KgH2,
      refuelTimeMinutes,
      avoidedDieselCo2TonsPerYear
    };
  }
}
