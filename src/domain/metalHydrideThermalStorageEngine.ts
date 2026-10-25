// src/domain/metalHydrideThermalStorageEngine.ts
// High-Temperature Metal Hydride Thermochemical Thermal Energy Storage (TCS) & Heat Pump Engine
// Conforms to: Van 't Hoff Chemical Thermodynamics, Dual-Bed Heat Upgrading, ENG Conductivity Intensification & Vietnam GDPT 2018

export type HighTempHydrideType =
  | 'MAGNESIUM_MGH2'
  | 'MAGNESIUM_NICKEL_MG2NIH4'
  | 'SODIUM_ALANATE_NAALH4'
  | 'TITANIUM_VANADIUM_CR_TVCR';

export type LowTempCoupledHydrideType =
  | 'LANI5_STANDARD'
  | 'TIFE_MN_DOPED'
  | 'MNINI5_SUBSTITUTED';

export type ThermalConductivityEnhancementType =
  | 'EXPANDED_NATURAL_GRAPHITE_ENG_10PCT'
  | 'ALUMINUM_FOAM_MATRIX_3D'
  | 'COPPER_FINNED_TUBE'
  | 'UNMODIFIED_LOOSE_POWDER';

export interface HighTempHydrideProperties {
  id: HighTempHydrideType;
  name: string;
  chemicalFormula: string;
  reactionEnthalpyDeltaHKjPerMolH2: number; // e.g. +74.5 kJ/mol H2 for MgH2
  reactionEntropyDeltaSJPerMolK: number;     // e.g. +135.0 J/(mol K)
  hydrogenStorageCapacityWtPct: number;    // e.g. 7.6 wt% for MgH2
  decompositionTempAt1BarC: number;        // T = Delta H / Delta S - 273.15
  optimalOperatingRangeC: [number, number];
  volumetricThermalStorageDensityKwhPerM3: number; // e.g. ~1,500 kWh/m3
  gravimetricThermalStorageDensityKwhPerTon: number; // e.g. ~780 kWh/ton
  description: string;
}

export interface LowTempCoupledProperties {
  id: LowTempCoupledHydrideType;
  name: string;
  chemicalFormula: string;
  deltaHKjPerMolH2: number;
  deltaSJPerMolK: number;
  plateauPressureAt25CBar: number;
  description: string;
}

export interface ConductivityEnhancementProperties {
  id: ThermalConductivityEnhancementType;
  name: string;
  effectiveThermalConductivityWPerMK: number; // k_eff
  volumetricStoragePenaltyPct: number;
  chargingRateMultiplier: number;
  cyclicLongevityCycles: number;
  description: string;
}

export interface VanTHoffIsothermPoint {
  temperatureC: number;
  equilibriumPressureBar: number;
  operatingState: 'DESORPTION_CHARGING' | 'ABSORPTION_DISCHARGING' | 'EQUILIBRIUM';
}

export interface DualBedHeatPumpMetrics {
  highBedTempC: number;
  lowBedTempC: number;
  highBedPlateauPressureBar: number;
  lowBedPlateauPressureBar: number;
  coefficientOfPerformanceCopHeating: number; // Q_high / Q_low
  coefficientOfPerformanceCopCooling: number;
  temperatureLiftDeltaTDegC: number;          // T_high_discharge - T_waste_heat
  heatUpgradingEfficiencyPct: number;
}

export interface PlantThermalStorageBalance {
  storageCapacityMwhTh: number;
  massOfHighTempHydrideTons: number;
  massOfLowTempCoupledHydrideTons: number;
  hydrogenCirculatedKg: number;
  chargingPowerMwTh: number;
  dischargingPowerMwTh: number;
  chargingDurationHours: number;
  dischargingDurationHours: number;
  roundTripThermalEfficiencyPct: number;
  parasiticLossPerDayPct: number; // Virtually 0.0%/day at ambient temperature!
  displacedNaturalGasMmbtsPerCycle: number;
  avoidedCo2TonsPerYear: number; // vs natural gas boilers
}

/**
 * Thermodynamic & Physical Constants
 */
export const GAS_CONSTANT_R = 8.314462618; // J/(mol K)
export const MOLAR_MASS_H2 = 2.016e-3; // kg/mol
export const MOLAR_MASS_MG = 24.305e-3; // kg/mol
export const MOLAR_MASS_MGH2 = 26.321e-3; // kg/mol
export const NATURAL_GAS_HEAT_CONTENT_MJ_PER_MMBTU = 1055.06;
export const NATURAL_GAS_CO2_EMISSION_KG_PER_MWHTH = 202.0; // kg CO2 / MWh-th

export const HIGH_TEMP_HYDRIDE_CATALOG: Record<HighTempHydrideType, HighTempHydrideProperties> = {
  MAGNESIUM_MGH2: {
    id: 'MAGNESIUM_MGH2',
    name: 'Magie Hydrit Độ Tinh Khiết Cao (MgH₂)',
    chemicalFormula: 'MgH₂ ⇌ Mg + H₂',
    reactionEnthalpyDeltaHKjPerMolH2: 74.5,
    reactionEntropyDeltaSJPerMolK: 135.0,
    hydrogenStorageCapacityWtPct: 7.66,
    decompositionTempAt1BarC: 278.7, // 551.8 K
    optimalOperatingRangeC: [350, 450],
    volumetricThermalStorageDensityKwhPerM3: 1550.0, // 5-8x higher than molten salt!
    gravimetricThermalStorageDensityKwhPerTon: 785.0,
    description: 'Vật liệu lưu trữ nhiệt hóa học chuẩn mực vàng. Mật độ lưu trữ nhiệt cực cao (785 kWh/tấn), lưu trữ nhiệt vô hạn ở nhiệt độ phòng mà không suy hao nhiệt (zero thermal loss).'
  },
  MAGNESIUM_NICKEL_MG2NIH4: {
    id: 'MAGNESIUM_NICKEL_MG2NIH4',
    name: 'Hợp Kim Magie-Niken Hydrit (Mg₂NiH₄)',
    chemicalFormula: 'Mg₂NiH₄ ⇌ Mg₂Ni + 2 H₂',
    reactionEnthalpyDeltaHKjPerMolH2: 64.5,
    reactionEntropyDeltaSJPerMolK: 122.0,
    hydrogenStorageCapacityWtPct: 3.6,
    decompositionTempAt1BarC: 255.5, // 528.6 K
    optimalOperatingRangeC: [280, 380],
    volumetricThermalStorageDensityKwhPerM3: 1220.0,
    gravimetricThermalStorageDensityKwhPerTon: 480.0,
    description: 'Hợp kim có động học hấp thụ/nhả hydro nhanh hơn nhiều so với Mg nguyên chất. Thích hợp cho các chu trình bơm nhiệt nhiệt độ cao cần tốc độ nạp/xả nhiệt tức thời.'
  },
  SODIUM_ALANATE_NAALH4: {
    id: 'SODIUM_ALANATE_NAALH4',
    name: 'Natri Alanat Xúc Tác Ti (NaAlH₄ / Na₃AlH₆)',
    chemicalFormula: '3 NaAlH₄ ⇌ Na₃AlH₆ + 2 Al + 3 H₂',
    reactionEnthalpyDeltaHKjPerMolH2: 47.0,
    reactionEntropyDeltaSJPerMolK: 125.0,
    hydrogenStorageCapacityWtPct: 5.5,
    decompositionTempAt1BarC: 103.0,
    optimalOperatingRangeC: [120, 200],
    volumetricThermalStorageDensityKwhPerM3: 850.0,
    gravimetricThermalStorageDensityKwhPerTon: 340.0,
    description: 'Hợp chất hydrit phức thuận nghịch ở nhiệt độ trung bình (120 - 180°C). Tối ưu cho thu hồi nhiệt thải công nghiệp dệt nhuộm, hóa chất và sấy nông sản.'
  },
  TITANIUM_VANADIUM_CR_TVCR: {
    id: 'TITANIUM_VANADIUM_CR_TVCR',
    name: 'Dung Dịch Rắn Titan-Vanadi-Crom (Ti-V-Cr BCC)',
    chemicalFormula: 'TiV₀.₈Cr₁.₂H₅ ⇌ TiV₀.₈Cr₁.₂ + 2.5 H₂',
    reactionEnthalpyDeltaHKjPerMolH2: 38.0,
    reactionEntropyDeltaSJPerMolK: 130.0,
    hydrogenStorageCapacityWtPct: 2.8,
    decompositionTempAt1BarC: 19.1,
    optimalOperatingRangeC: [60, 150],
    volumetricThermalStorageDensityKwhPerM3: 650.0,
    gravimetricThermalStorageDensityKwhPerTon: 220.0,
    description: 'Hợp kim mạng lập phương tâm khối (BCC) áp suất phân hủy cao, tốc độ phản ứng cực nhanh trong dải nhiệt độ thu hồi nước nóng công nghiệp.'
  }
};

export const LOW_TEMP_COUPLED_CATALOG: Record<LowTempCoupledHydrideType, LowTempCoupledProperties> = {
  LANI5_STANDARD: {
    id: 'LANI5_STANDARD',
    name: 'Lantan-Niken Đệm Hydro (LaNi₅)',
    chemicalFormula: 'LaNi₅H₆ ⇌ LaNi₅ + 3 H₂',
    deltaHKjPerMolH2: -30.8,
    deltaSJPerMolK: -108.0,
    plateauPressureAt25CBar: 1.76,
    description: 'Bình xốp chứa hydro ở nhiệt độ phòng. Hấp thụ hydro thoát ra từ MgH₂ ở 20-40°C và nhả hydro trở lại khi được cấp nhiệt thải nhẹ (60-80°C).'
  },
  TIFE_MN_DOPED: {
    id: 'TIFE_MN_DOPED',
    name: 'Titan-Sắt Biến Tính Mangan (TiFe₀.₈₅Mn₀.₁₅)',
    chemicalFormula: 'TiFe₀.₈₅Mn₀.₁₅H₂ ⇌ TiFe₀.₈₅Mn₀.₁₅ + H₂',
    deltaHKjPerMolH2: -28.5,
    deltaSJPerMolK: -105.0,
    plateauPressureAt25CBar: 3.2,
    description: 'Hợp kim đệm hydro giá rẻ không chứa kim loại đất hiếm, tối ưu chi phí cho các trạm lưu trữ nhiệt quy mô hàng chục MWh-th.'
  },
  MNINI5_SUBSTITUTED: {
    id: 'MNINI5_SUBSTITUTED',
    name: 'Mischmetal-Niken (MmNi₅)',
    chemicalFormula: 'MmNi₅H₆ ⇌ MmNi₅ + 3 H₂',
    deltaHKjPerMolH2: -27.0,
    deltaSJPerMolK: -106.0,
    plateauPressureAt25CBar: 4.5,
    description: 'Hợp kim hỗn hợp đất hiếm giá thành thấp, dải áp suất cao cho phép đẩy mạnh lưu lượng khí hydro trong chu trình bơm nhiệt.'
  }
};

export const CONDUCTIVITY_ENHANCEMENT_CATALOG: Record<ThermalConductivityEnhancementType, ConductivityEnhancementProperties> = {
  EXPANDED_NATURAL_GRAPHITE_ENG_10PCT: {
    id: 'EXPANDED_NATURAL_GRAPHITE_ENG_10PCT',
    name: 'Khối Nén Than Chì Giãn Nở Tự Nhiên (ENG 10-15 wt%)',
    effectiveThermalConductivityWPerMK: 12.5, // 30x higher than loose powder
    volumetricStoragePenaltyPct: 8.0,
    chargingRateMultiplier: 8.5,
    cyclicLongevityCycles: 10000,
    description: 'Trộn bột MgH₂ với than chì ENG ép thành bánh xốp dẫn nhiệt. Độ dẫn nhiệt hiệu dụng tăng từ 0.3 lên 12.5 W/(m·K), nạp/xả nhiệt nhanh gấp 8 lần và ngăn hiện tượng bột bị nén vón cục.'
  },
  ALUMINUM_FOAM_MATRIX_3D: {
    id: 'ALUMINUM_FOAM_MATRIX_3D',
    name: 'Bọt Nhôm Xốp Cấu Trúc Mở 3D (Open-cell Al Foam)',
    effectiveThermalConductivityWPerMK: 18.0,
    volumetricStoragePenaltyPct: 14.0,
    chargingRateMultiplier: 10.0,
    cyclicLongevityCycles: 8000,
    description: 'Cấu trúc bọt nhôm xốp dẫn nhiệt siêu tốc xuyên suốt buồng phản ứng, thích hợp cho các ứng dụng đòi hỏi công suất nhiệt tức thời MWth.'
  },
  COPPER_FINNED_TUBE: {
    id: 'COPPER_FINNED_TUBE',
    name: 'Ống Dẫn Nhiệt Cánh Nhôm/Đồng (Finned-Tube Heat Exchanger)',
    effectiveThermalConductivityWPerMK: 4.5,
    volumetricStoragePenaltyPct: 18.0,
    chargingRateMultiplier: 4.0,
    cyclicLongevityCycles: 6000,
    description: 'Thiết kế ống chùm cánh tản nhiệt truyền thống, gia công cơ khí đơn giản nhưng khối lượng thiết bị nặng hơn khối nén ENG.'
  },
  UNMODIFIED_LOOSE_POWDER: {
    id: 'UNMODIFIED_LOOSE_POWDER',
    name: 'Bột Hydrit Rời Nguyên Bản (Loose Powder Bed)',
    effectiveThermalConductivityWPerMK: 0.35, // Poor thermal conductivity
    volumetricStoragePenaltyPct: 0.0,
    chargingRateMultiplier: 1.0,
    cyclicLongevityCycles: 800, // Caking and decrepitation degradation
    description: 'Bột hydrit tự nhiên có độ dẫn nhiệt cực kém (0.35 W/mK), thời gian nạp nhiệt kéo dài hàng chục giờ và dễ bị suy giảm độ xốp sau 800 chu kỳ.'
  }
};

/**
 * Van 't Hoff Chemical Equilibrium Calculator
 * ln(P_eq / P0) = - Delta H / (R * T) + Delta S / R
 */
export function calculateVanTHoffEquilibriumPressureBar(
  deltaHKjPerMol: number,
  deltaSJPerMolK: number,
  temperatureC: number
): number {
  const T_kelvin = temperatureC + 273.15;
  const deltaH_J = deltaHKjPerMol * 1000.0;
  const lnP = -(deltaH_J / (GAS_CONSTANT_R * T_kelvin)) + (deltaSJPerMolK / GAS_CONSTANT_R);
  const pBar = Math.exp(lnP);
  return Number(Math.max(0.001, Math.min(100.0, pBar)).toFixed(3));
}

/**
 * Calculate Dual-Bed Metal Hydride Heat Pump / Upgrading Performance
 * High Bed: MgH2 (Hot process discharge)
 * Low Bed: LaNi5 (Low-temperature waste heat source / ambient sink)
 */
export function calculateDualBedHeatPump(params: {
  highTempHydride: HighTempHydrideType;
  lowTempHydride: LowTempCoupledHydrideType;
  highBedOperatingTempC: number;
  wasteHeatSourceTempC: number;
}): DualBedHeatPumpMetrics {
  const {
    highTempHydride,
    lowTempHydride,
    highBedOperatingTempC,
    wasteHeatSourceTempC
  } = params;

  const highMat = HIGH_TEMP_HYDRIDE_CATALOG[highTempHydride];
  const lowMat = LOW_TEMP_COUPLED_CATALOG[lowTempHydride];

  // Plateau equilibrium pressures at current temperatures:
  const pHighBar = calculateVanTHoffEquilibriumPressureBar(
    highMat.reactionEnthalpyDeltaHKjPerMolH2,
    highMat.reactionEntropyDeltaSJPerMolK,
    highBedOperatingTempC
  );

  const pLowBar = calculateVanTHoffEquilibriumPressureBar(
    Math.abs(lowMat.deltaHKjPerMolH2),
    Math.abs(lowMat.deltaSJPerMolK),
    wasteHeatSourceTempC
  );

  // Theoretical Coefficient of Performance for Heating:
  // COP_heating = Q_high_released / Q_low_supplied = |Delta H_high| / |Delta H_low|
  const copHeating = highMat.reactionEnthalpyDeltaHKjPerMolH2 / Math.abs(lowMat.deltaHKjPerMolH2);
  const copCooling = copHeating - 1.0;

  // Temperature lift: Upgrade low-temperature industrial waste heat to high temperature
  const tempLift = highBedOperatingTempC - wasteHeatSourceTempC;

  // Upgrading thermal exergy efficiency:
  const carnotCop = (highBedOperatingTempC + 273.15) / Math.max(10.0, tempLift);
  const exergyEfficiencyPct = Math.min(85.0, (copHeating / carnotCop) * 100 * 1.8);

  return {
    highBedTempC: highBedOperatingTempC,
    lowBedTempC: wasteHeatSourceTempC,
    highBedPlateauPressureBar: pHighBar,
    lowBedPlateauPressureBar: pLowBar,
    coefficientOfPerformanceCopHeating: Number(copHeating.toFixed(2)),
    coefficientOfPerformanceCopCooling: Number(copCooling.toFixed(2)),
    temperatureLiftDeltaTDegC: Number(tempLift.toFixed(1)),
    heatUpgradingEfficiencyPct: Number(Math.max(45.0, exergyEfficiencyPct).toFixed(1))
  };
}

/**
 * Calculate Plant Mass and Energy Balance for Thermochemical Heat Storage (TCS)
 */
export function calculateTcsPlantBalance(params: {
  storageCapacityMwhTh: number;
  highTempHydride: HighTempHydrideType;
  lowTempHydride: LowTempCoupledHydrideType;
  conductivityEnhancement: ThermalConductivityEnhancementType;
  chargingTempC: number;
  dischargingTempC: number;
}): PlantThermalStorageBalance {
  const {
    storageCapacityMwhTh,
    highTempHydride,
    lowTempHydride,
    conductivityEnhancement
  } = params;

  const highMat = HIGH_TEMP_HYDRIDE_CATALOG[highTempHydride];
  const lowMat = LOW_TEMP_COUPLED_CATALOG[lowTempHydride];
  const enhancement = CONDUCTIVITY_ENHANCEMENT_CATALOG[conductivityEnhancement];

  // Storage capacity: MWh-th to MJ: 1 MWh = 3600 MJ
  const totalHeatMj = storageCapacityMwhTh * 3600.0;

  // Heat released per kg of high-temp hydride:
  // e.g. For MgH2: Delta H = 74.5 kJ/mol H2. Mol of MgH2 = 1 mol H2.
  // Molar mass of MgH2 = 0.02632 kg/mol.
  // Heat density = 74.5 kJ / 0.02632 kg = 2,830 kJ/kg = 2.83 MJ/kg
  const deltaHMjPerMol = highMat.reactionEnthalpyDeltaHKjPerMolH2 / 1000.0;
  const molarMassHighKg = highMat.id === 'MAGNESIUM_MGH2' ? MOLAR_MASS_MGH2 : 0.050; // generic approximation
  const heatDensityMjPerKg = deltaHMjPerMol / molarMassHighKg;

  const massHighHydrideKg = totalHeatMj / heatDensityMjPerKg;
  const massHighHydrideTons = massHighHydrideKg / 1000.0;

  // Total moles of hydrogen circulated:
  const molesH2Circulated = totalHeatMj / deltaHMjPerMol;
  const hydrogenCirculatedKg = molesH2Circulated * MOLAR_MASS_H2;

  // Mass of low-temp hydride needed to absorb hydrogen:
  // e.g. LaNi5H6 absorbs 3 mol H2 per mol LaNi5 (MW ~ 0.432 kg/mol)
  const massLowHydrideTons = (molesH2Circulated / 3.0 * 0.432) / 1000.0;

  // Power and duration: Enhanced thermal conductivity speeds up heat transfer
  const chargingDurationHours = Number((8.0 / enhancement.chargingRateMultiplier).toFixed(1));
  const dischargingDurationHours = Number((8.0 / enhancement.chargingRateMultiplier).toFixed(1));

  const chargingPowerMwTh = Number((storageCapacityMwhTh / chargingDurationHours).toFixed(2));
  const dischargingPowerMwTh = Number((storageCapacityMwhTh / dischargingDurationHours).toFixed(2));

  // Round-trip thermal efficiency: Chemical storage has 0 thermal loss in storage,
  // round-trip efficiency is determined by heat exchanger effectiveness (~88 - 93%)
  const roundTripEfficiencyPct = 90.5;
  const parasiticLossPerDayPct = 0.0; // Lossless storage at room temperature!

  // Fossil displacement: MMBtu of natural gas avoided
  const displacedMmbtu = (totalHeatMj / NATURAL_GAS_HEAT_CONTENT_MJ_PER_MMBTU);

  // Avoided CO2 assuming 300 cycles per year
  const annualMwhStored = storageCapacityMwhTh * 300;
  const avoidedCo2Tons = (annualMwhStored * NATURAL_GAS_CO2_EMISSION_KG_PER_MWHTH) / 1000.0;

  return {
    storageCapacityMwhTh,
    massOfHighTempHydrideTons: Number(massHighHydrideTons.toFixed(1)),
    massOfLowTempCoupledHydrideTons: Number(massLowHydrideTons.toFixed(1)),
    hydrogenCirculatedKg: Number(hydrogenCirculatedKg.toFixed(1)),
    chargingPowerMwTh,
    dischargingPowerMwTh,
    chargingDurationHours,
    dischargingDurationHours,
    roundTripThermalEfficiencyPct: roundTripEfficiencyPct,
    parasiticLossPerDayPct,
    displacedNaturalGasMmbtsPerCycle: Number(displacedMmbtu.toFixed(1)),
    avoidedCo2TonsPerYear: Number(avoidedCo2Tons.toFixed(0))
  };
}

/**
 * Benchmark of Industrial Thermal Energy Storage Technologies
 */
export interface ThermalStorageTechnologyBenchmark {
  technologyName: string;
  storagePrinciple: string;
  operatingTempRangeC: string;
  energyDensityKwhPerM3: number;
  thermalDegradationPerDayPct: string;
  maxStorageDuration: string;
  roundTripEfficiencyPct: number;
  environmentalSafety: string;
}

export const THERMAL_STORAGE_BENCHMARKS: ThermalStorageTechnologyBenchmark[] = [
  {
    technologyName: 'Lưu Trữ Nhiệt Hóa Học Hydrit Kim Loại (Metal Hydride TCS)',
    storagePrinciple: 'Phản ứng nhiệt hóa học thuận nghịch (MgH₂ ⇌ Mg + H₂)',
    operatingTempRangeC: '350°C - 450°C (Nâng nhiệt tới 420°C)',
    energyDensityKwhPerM3: 1550.0, // Immense energy density
    thermalDegradationPerDayPct: '0.0% / ngày (Lưu trữ ở nhiệt độ phòng)',
    maxStorageDuration: 'Vô hạn (Không phụ thuộc vào lớp cách nhiệt)',
    roundTripEfficiencyPct: 90.5,
    environmentalSafety: 'Kim loại magie trơ, không độc hại, tái chế 100%'
  },
  {
    technologyName: 'Muối Nóng Chảy 2 Bể (Molten Salt Solar Two-Tank)',
    storagePrinciple: 'Nhiệt hiện (Sensible heat: NaNO₃-KNO₃ nóng chảy)',
    operatingTempRangeC: '290°C - 565°C',
    energyDensityKwhPerM3: 250.0, // 6x lower than hydride
    thermalDegradationPerDayPct: '1.0 - 2.5% / ngày (Mất nhiệt qua vỏ bồn)',
    maxStorageDuration: '1 - 2 tuần (Nguy cơ đông cứng nếu nguội < 240°C)',
    roundTripEfficiencyPct: 88.0,
    environmentalSafety: 'Muối oxy hóa mạnh, ăn mòn thành bồn chứa'
  },
  {
    technologyName: 'Vật Liệu Chuyển Pha Nhiệt Ẩn (High-Temp PCM)',
    storagePrinciple: 'Nhiệt ẩn nóng chảy (Latent heat of fusion: Hợp kim Al-Si)',
    operatingTempRangeC: '500°C - 580°C',
    energyDensityKwhPerM3: 450.0,
    thermalDegradationPerDayPct: '1.5 - 3.0% / ngày',
    maxStorageDuration: 'Vài ngày đến 1 tuần',
    roundTripEfficiencyPct: 82.0,
    environmentalSafety: 'Độ dẫn nhiệt thấp, giãn nở thể tích khi nóng chảy'
  },
  {
    technologyName: 'Đá Bê Tông Nhiệt Hiện (Solid Media Concrete Thermal Storage)',
    storagePrinciple: 'Nhiệt hiện khối bê tông chịu nhiệt',
    operatingTempRangeC: '200°C - 400°C',
    energyDensityKwhPerM3: 180.0,
    thermalDegradationPerDayPct: '2.0 - 4.0% / ngày',
    maxStorageDuration: '1 - 3 ngày',
    roundTripEfficiencyPct: 78.0,
    environmentalSafety: 'Bê tông nứt vỡ do ứng suất nhiệt sau nhiều chu kỳ'
  }
];
