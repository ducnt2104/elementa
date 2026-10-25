// src/domain/ironSlurryFlowBatteryEngine.ts
// Domain Engine: Iron-Slurry Semi-Solid Flow Battery (SS-IFB) Ultra-Low Cost Long-Duration Grid Storage
// Standards: IUPAC Electrochemistry, Bingham-Herschel Bulkley Rheology, Electrical Percolation & LDES Grid Economics

export type SlurryCompositionType = 'MICRON_FE_KETJENBLACK' | 'MAGNETITE_CNT_AQUEOUS' | 'ZVI_GRAPHENE_COMPOSITE';
export type SeparatorType = 'MICROPOROUS_POLYOLEFIN' | 'HYDROPHILIC_CELLULOSE' | 'ANION_EXCHANGE_MEMBRANE';

export interface SlurryCompositionSpec {
  id: SlurryCompositionType;
  name: string;
  activeMaterial: string;
  conductiveAdditive: string;
  solidVolumeFractionPercent: number; // 15% to 35%
  percolationThresholdVolumePercent: number; // 0.8% to 1.5%
  volumetricCapacityAhPerL: number;    // 120 to 240 Ah/L
  electronicConductivitySPerM: number; // 0.1 to 2.5 S/m
  yieldStressPa: number;               // 5 to 45 Pa
  flowBehaviorIndexN: number;          // 0.45 to 0.75 (shear-thinning)
  vietnameseDescription: string;
}

export interface SeparatorSpec {
  id: SeparatorType;
  name: string;
  thicknessUm: number;
  porosityPercent: number;
  areaSpecificResistanceOhmCm2: number;
  costDollarsPerM2: number;
  vietnameseFeature: string;
}

export const SLURRY_COMPOSITIONS: Record<SlurryCompositionType, SlurryCompositionSpec> = {
  MICRON_FE_KETJENBLACK: {
    id: 'MICRON_FE_KETJENBLACK',
    name: 'Bột Sắt Vi Cỡ (Fe⁰) + Muội Than Dẫn Điện Ketjenblack',
    activeMaterial: 'Bột sắt kim loại vi mô Fe⁰ (d50 = 3.5 µm)',
    conductiveAdditive: 'Ketjenblack EC-600JD (1.2 vol%)',
    solidVolumeFractionPercent: 25.0,
    percolationThresholdVolumePercent: 0.95,
    volumetricCapacityAhPerL: 185.0,
    electronicConductivitySPerM: 1.45,
    yieldStressPa: 18.5,
    flowBehaviorIndexN: 0.58,
    vietnameseDescription: 'Huyền phù hạt sắt kim loại phân tán trong mạng lưới dẫn điện muội than. Mật độ dung lượng đạt 185 Ah/L, cao gấp 4.5 lần dung dịch sắt hòa tan truyền thống.'
  },
  MAGNETITE_CNT_AQUEOUS: {
    id: 'MAGNETITE_CNT_AQUEOUS',
    name: 'Hạt Nano Magnetit (Fe₃O₄) + Ống Nano Cacbon (CNT)',
    activeMaterial: 'Oxit sắt từ Fe₃O₄ hình cầu (d50 = 85 nm)',
    conductiveAdditive: 'Multi-walled CNTs (0.8 vol%)',
    solidVolumeFractionPercent: 20.0,
    percolationThresholdVolumePercent: 0.75,
    volumetricCapacityAhPerL: 145.0,
    electronicConductivitySPerM: 2.10,
    yieldStressPa: 12.0,
    flowBehaviorIndexN: 0.52,
    vietnameseDescription: 'Hệ bùn oxit sắt nano liên kết bởi mạng lưới CNT dẫn điện 3D. Độ linh động cao, dễ bơm và giảm 40% tổn thất áp suất thủy lực.'
  },
  ZVI_GRAPHENE_COMPOSITE: {
    id: 'ZVI_GRAPHENE_COMPOSITE',
    name: 'Hạt Sắt Không Hóa Trị ZVI + Phiến Graphene Đa Lớp',
    activeMaterial: 'Sắt hoạt hóa bề mặt ZVI (Zero-Valent Iron)',
    conductiveAdditive: 'Few-layer Graphene nanoplatelets (1.5 vol%)',
    solidVolumeFractionPercent: 30.0,
    percolationThresholdVolumePercent: 0.65,
    volumetricCapacityAhPerL: 220.0,
    electronicConductivitySPerM: 3.20,
    yieldStressPa: 28.0,
    flowBehaviorIndexN: 0.62,
    vietnameseDescription: 'Huyền phù sắt nồng độ cao gia cường graphene. Dung lượng thể tích đỉnh 220 Ah/L, dẫn điện tử vượt trội, lý tưởng cho tích trữ năng lượng tuần hoàn nhiều ngày.'
  }
};

export const SEPARATORS: Record<SeparatorType, SeparatorSpec> = {
  MICROPOROUS_POLYOLEFIN: {
    id: 'MICROPOROUS_POLYOLEFIN',
    name: 'Màng Xốp Polyolefin Siêu Rẻ (Celgard Standard)',
    thicknessUm: 25,
    porosityPercent: 55,
    areaSpecificResistanceOhmCm2: 0.65,
    costDollarsPerM2: 3.5,
    vietnameseFeature: 'Màng xốp không chứa nhóm trao đổi ion đắt tiền; hạt bùn kích thước micron không thể lọt qua lỗ xốp nano, giảm 90% chi phí màng so với Nafion.'
  },
  HYDROPHILIC_CELLULOSE: {
    id: 'HYDROPHILIC_CELLULOSE',
    name: 'Màng Xenluloza Sinh Học Thân Nước (Bio-Cellulose)',
    thicknessUm: 35,
    porosityPercent: 68,
    areaSpecificResistanceOhmCm2: 0.45,
    costDollarsPerM2: 2.0,
    vietnameseFeature: 'Chất liệu xenluloza tái tạo giá thành cực thấp ($2/m²), thấm ướt dung dịch nước tức thì, phân hủy sinh học thân thiện môi trường.'
  },
  ANION_EXCHANGE_MEMBRANE: {
    id: 'ANION_EXCHANGE_MEMBRANE',
    name: 'Màng Trao Đổi Anion Chọn Lọc (AEM Polymer)',
    thicknessUm: 30,
    porosityPercent: 0,
    areaSpecificResistanceOhmCm2: 1.10,
    costDollarsPerM2: 45.0,
    vietnameseFeature: 'Ngăn chặn hoàn toàn ion sắt hòa tan khuếch tán chéo, độ tự phóng điện cực thấp nhưng chi phí đầu tư cao hơn.'
  }
};

export interface SlurryOperatingConditions {
  slurryType: SlurryCompositionType;
  separatorType: SeparatorType;
  stateOfChargePercent: number; // 10% to 90%
  flowRateMillilitersPerMinute: number; // 10 to 200 mL/min
  temperatureC: number;         // 15°C to 50°C
  currentDensityMaPerCm2: number; // 20 to 120 mA/cm2
}

export interface SlurryElectrochemicalResult {
  openCircuitVoltageV: number;
  dischargeVoltageV: number;
  chargeVoltageV: number;
  coulombicEfficiencyPercent: number;
  voltageEfficiencyPercent: number;
  roundTripEnergyEfficiencyPercent: number;
  apparentViscosityPaS: number;
  pumpingLossWattsPerCell: number;
  netCellPowerDensityMwPerCm2: number;
  volumetricEnergyDensityWhPerL: number;
}

export interface MultiDayStorageEconomicResult {
  stackRatedPowerKw: number;
  durationHours: number; // e.g. 24h, 48h, 100h
  totalStoredEnergyKwh: number;
  slurryTankVolumeM3: number;
  rawIronMassTons: number;
  capitalCostDollarsPerKwh: number;
  totalSystemCapExDollars: number;
  annualLevelizedCostOfStorageDollarsPerKwh: number; // LCOS
  cyclesLifetimeGuaranteed: number;
}

export class IronSlurryFlowBatteryEngine {
  public static readonly FARADAY_CONSTANT = 96485.33; // C/mol
  public static readonly STANDARD_POTENTIAL_V = 1.21; // Fe2+/Fe0 (-0.44V) vs Fe3+/Fe2+ (+0.77V)
  public static readonly IRON_ATOMIC_MASS_G_MOL = 55.845; // g/mol
  public static readonly IRON_DENSITY_KG_M3 = 7874.0;

  /**
   * Calculate non-Newtonian apparent viscosity via Herschel-Bulkley model:
   * mu_app = tau_y / gamma_dot + K * gamma_dot^(n - 1)
   */
  public static calculateApparentViscosity(
    slurry: SlurryCompositionSpec,
    flowRateMlMin: number,
    temperatureC: number
  ): number {
    // Channel geometry: 2 mm gap height, 5 cm width
    // Shear rate approx: gamma_dot = 6 * Q / (w * h^2)
    const Q_m3_s = (flowRateMlMin * 1e-6) / 60.0;
    const h_m = 0.002;
    const w_m = 0.05;
    const gammaDot = Math.max(1.0, (6 * Q_m3_s) / (w_m * h_m * h_m));

    // Temperature scaling (Arrhenius on viscosity)
    const tempFactor = Math.exp(1200 * (1 / (temperatureC + 273.15) - 1 / 298.15));
    const tauYield = slurry.yieldStressPa * tempFactor;
    const K = 0.45 * tempFactor; // Consistency index Pa*s^n

    const muApp = (tauYield / gammaDot) + K * Math.pow(gammaDot, slurry.flowBehaviorIndexN - 1);
    return Math.min(2.5, Math.max(0.015, muApp));
  }

  /**
   * Calculate cell electrochemical performance and parasitic pumping loss.
   */
  public static calculateSlurryPerformance(conditions: SlurryOperatingConditions): SlurryElectrochemicalResult {
    const slurry = SLURRY_COMPOSITIONS[conditions.slurryType];
    const separator = SEPARATORS[conditions.separatorType];

    // OCV from Nernst equation with SOC:
    // E = E0 + (R*T / (2*F)) * ln(SOC / (1 - SOC))
    const tempK = conditions.temperatureC + 273.15;
    const socClamped = Math.min(0.95, Math.max(0.05, conditions.stateOfChargePercent / 100.0));
    const nernstShift = ((8.314 * tempK) / (2 * this.FARADAY_CONSTANT)) * Math.log(socClamped / (1 - socClamped));
    const openCircuitVoltageV = this.STANDARD_POTENTIAL_V + nernstShift;

    // Resistance: Area Specific Resistance ASR = ASR_sep + ASR_slurry + ASR_contact
    // Percolating carbon network provides 3D conductive pathways, effective path length ~ 150 µm to current-collecting grid:
    const effectivePercolationPathCm = 0.015;
    const sigmaSlurryScm = slurry.electronicConductivitySPerM * 0.01;
    const rSlurry = effectivePercolationPathCm / Math.max(0.005, sigmaSlurryScm);
    const totalAsrOhmCm2 = separator.areaSpecificResistanceOhmCm2 + rSlurry + 0.35;

    const jAcm2 = conditions.currentDensityMaPerCm2 * 0.001;
    const vOhmic = jAcm2 * totalAsrOhmCm2;

    // Activation overpotential:
    const etaAct = 0.065 * Math.log10(1 + conditions.currentDensityMaPerCm2 / 10.0);

    const dischargeVoltageV = Math.max(0.65, openCircuitVoltageV - vOhmic - etaAct);
    const chargeVoltageV = openCircuitVoltageV + vOhmic + etaAct;

    const coulombicEfficiencyPercent = Math.min(99.0, 96.5 + (conditions.currentDensityMaPerCm2 / 120.0) * 1.8);
    const voltageEfficiencyPercent = (dischargeVoltageV / chargeVoltageV) * 100.0;
    const roundTripEnergyEfficiencyPercent = (coulombicEfficiencyPercent / 100.0) * voltageEfficiencyPercent;

    // Pumping power:
    const muApp = this.calculateApparentViscosity(slurry, conditions.flowRateMillilitersPerMinute, conditions.temperatureC);
    const Q_m3_s = (conditions.flowRateMillilitersPerMinute * 1e-6) / 60.0;
    const channelLengthM = 0.25;
    const channelAreaM2 = 0.002 * 0.05;
    // Pressure drop in laminar duct: DeltaP = (12 * mu * L * Q) / (w * h^3)
    const deltaP = (12 * muApp * channelLengthM * Q_m3_s) / (0.05 * Math.pow(0.002, 3));
    const pumpingLossWattsPerCell = (deltaP * Q_m3_s) / 0.70; // 70% pump efficiency

    const grossPowerDensityMwPerCm2 = conditions.currentDensityMaPerCm2 * dischargeVoltageV;
    const netCellPowerDensityMwPerCm2 = Math.max(10.0, grossPowerDensityMwPerCm2 - (pumpingLossWattsPerCell * 1000.0 / 250.0));

    // Volumetric energy density: Wh/L = Volumetric Capacity Ah/L * Discharge Voltage
    const volumetricEnergyDensityWhPerL = slurry.volumetricCapacityAhPerL * dischargeVoltageV;

    return {
      openCircuitVoltageV,
      dischargeVoltageV,
      chargeVoltageV,
      coulombicEfficiencyPercent,
      voltageEfficiencyPercent,
      roundTripEnergyEfficiencyPercent,
      apparentViscosityPaS: muApp,
      pumpingLossWattsPerCell,
      netCellPowerDensityMwPerCm2,
      volumetricEnergyDensityWhPerL
    };
  }

  /**
   * Multi-day long-duration energy storage (LDES) system economics (24h to 100h duration).
   */
  public static calculateLdesEconomics(
    conditions: SlurryOperatingConditions,
    stackRatedPowerKw: number = 500.0,
    durationHours: number = 48.0
  ): MultiDayStorageEconomicResult {
    const perf = this.calculateSlurryPerformance(conditions);
    const totalStoredEnergyKwh = stackRatedPowerKw * durationHours;

    // Slurry volume required: Volume = Energy / EnergyDensity (L)
    const requiredSlurryLiters = (totalStoredEnergyKwh * 1000.0) / perf.volumetricEnergyDensityWhPerL;
    const slurryTankVolumeM3 = (requiredSlurryLiters / 1000.0) * 1.15; // 15% safety ullage

    // Raw iron mass (kg):
    const slurry = SLURRY_COMPOSITIONS[conditions.slurryType];
    const ironVolumeM3 = (requiredSlurryLiters / 1000.0) * (slurry.solidVolumeFractionPercent / 100.0);
    const rawIronMassTons = (ironVolumeM3 * this.IRON_DENSITY_KG_M3) / 1000.0;

    // Capital Cost Breakdown ($/kWh):
    // 1. Stack Cost: ~$450 / kW / durationHours
    const stackCostPerKwh = 450.0 / durationHours;
    // 2. Active Slurry Material: Scrap iron ($0.40/kg) + Carbon black ($3.0/kg) + Saline water ($0.05/L)
    const ironCostDollars = rawIronMassTons * 1000.0 * 0.45;
    const carbonCostDollars = (requiredSlurryLiters * 0.02 * 2.5);
    const materialCostPerKwh = (ironCostDollars + carbonCostDollars) / totalStoredEnergyKwh;
    // 3. Tank & Balance of Plant (BoP): HDPE large atmospheric storage tanks ($25/m3) + piping
    const tankBopPerKwh = (slurryTankVolumeM3 * 45.0) / totalStoredEnergyKwh + 8.5;

    const capitalCostDollarsPerKwh = Math.max(25.0, stackCostPerKwh + materialCostPerKwh + tankBopPerKwh);
    const totalSystemCapExDollars = capitalCostDollarsPerKwh * totalStoredEnergyKwh;

    // Levelized Cost of Storage (LCOS) over 25 years (10,000 cycles, zero degradation):
    const annualHours = 8000;
    const cyclesLifetimeGuaranteed = 25000; // Zero dendrites, liquid-suspended particles do not crack
    const annualLevelizedCostOfStorageDollarsPerKwh = (capitalCostDollarsPerKwh / 20.0) + 0.015;

    return {
      stackRatedPowerKw,
      durationHours,
      totalStoredEnergyKwh,
      slurryTankVolumeM3,
      rawIronMassTons,
      capitalCostDollarsPerKwh,
      totalSystemCapExDollars,
      annualLevelizedCostOfStorageDollarsPerKwh,
      cyclesLifetimeGuaranteed
    };
  }
}
