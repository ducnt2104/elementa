// src/domain/ammoniaWaterAbsorptionChillerEngine.ts
// Domain Engine: Closed-Loop Thermochemical Ammonia-Water (NH3-H2O) Absorption Chiller
// Standards: IUPAC Physical Chemistry, Binary Vapor-Liquid Phase Equilibria, GDPT 2018 Chemistry & Industrial Waste Heat Cogeneration

export type AbsorptionCycleType = 'SINGLE_EFFECT_STANDARD' | 'DOUBLE_EFFECT_REGENERATIVE' | 'DIFFUSION_ABSORPTION_NO_PUMP';
export type WasteHeatSourceType = 'AI_DATA_CENTER_EXHAUST' | 'INDUSTRIAL_FLUE_GAS' | 'GEOTHERMAL_STEAM' | 'SOLAR_THERMAL_COLLECTOR';

export interface WasteHeatSourceSpec {
  id: WasteHeatSourceType;
  name: string;
  heatSourceTempRangeC: [number, number];
  typicalAvailableThermalPowerKW: number;
  heatCarrierFluid: string;
  vietnameseDescription: string;
}

export interface AbsorptionCycleSpec {
  id: AbsorptionCycleType;
  name: string;
  nominalThermalCop: number;
  electricalConsumptionFractionPercent: number; // Solution pump electric work < 1.8% of cooling
  minGeneratorTempRequiredC: number;
  ammoniaVaporPurityPercent: number;
  vietnameseFeature: string;
}

export const WASTE_HEAT_SOURCES: Record<WasteHeatSourceType, WasteHeatSourceSpec> = {
  AI_DATA_CENTER_EXHAUST: {
    id: 'AI_DATA_CENTER_EXHAUST',
    name: 'Nhiệt Thải Cụm Máy Chủ AI & Chip GPU (Direct-to-Chip Liquid)',
    heatSourceTempRangeC: [75, 95],
    typicalAvailableThermalPowerKW: 1200.0,
    heatCarrierFluid: 'Nước làm mát tuần hoàn GPU (75-90°C)',
    vietnameseDescription: 'Tận dụng trực tiếp nguồn nhiệt thải từ hệ thống làm mát chất lỏng của hàng nghìn chip GPU AI; chuyển nhiệt thải thành nước lạnh 7°C tái cấp cho trung tâm dữ liệu.'
  },
  INDUSTRIAL_FLUE_GAS: {
    id: 'INDUSTRIAL_FLUE_GAS',
    name: 'Khí Thải Ống Khói Lò Nung Công Nghiệp (Industrial Flue Gas)',
    heatSourceTempRangeC: [110, 160],
    typicalAvailableThermalPowerKW: 2500.0,
    heatCarrierFluid: 'Hơi nước bão hòa hoặc dầu truyền nhiệt',
    vietnameseDescription: 'Nhiệt khí lò nung xi măng, luyện thép, hóa chất được thu hồi qua bộ trao đổi nhiệt cấp cho bộ sinh hơi Generator của máy lạnh hấp thụ.'
  },
  GEOTHERMAL_STEAM: {
    id: 'GEOTHERMAL_STEAM',
    name: 'Hơi Nước Địa Nhiệt Enthalpy Trung Bình',
    heatSourceTempRangeC: [100, 140],
    typicalAvailableThermalPowerKW: 3000.0,
    heatCarrierFluid: 'Hơi địa nhiệt tách nước mặn',
    vietnameseDescription: 'Nguồn năng lượng địa nhiệt tái tạo dồi dào cung cấp lạnh liên tục 24/7 cho các cơ sở chế biến nông thủy sản vùng đồi núi.'
  },
  SOLAR_THERMAL_COLLECTOR: {
    id: 'SOLAR_THERMAL_COLLECTOR',
    name: 'Dàn Thu Nhiệt Mặt Trời Ống Chân Không (Solar Thermal)',
    heatSourceTempRangeC: [85, 120],
    typicalAvailableThermalPowerKW: 800.0,
    heatCarrierFluid: 'Dung dịch nước áp lực cao gia nhiệt mặt trời',
    vietnameseDescription: 'Mô hình làm mát bằng năng lượng mặt trời hoàn toàn: nắng càng gắt thì nhu cầu điều hòa càng cao và công suất tạo lạnh hấp thụ càng lớn.'
  }
};

export const ABSORPTION_CYCLES: Record<AbsorptionCycleType, AbsorptionCycleSpec> = {
  SINGLE_EFFECT_STANDARD: {
    id: 'SINGLE_EFFECT_STANDARD',
    name: 'Chu Trình Hấp Thụ Đơn Hiệu Ứng (Single-Effect NH3-H2O)',
    nominalThermalCop: 0.72,
    electricalConsumptionFractionPercent: 1.5,
    minGeneratorTempRequiredC: 85.0,
    ammoniaVaporPurityPercent: 99.85,
    vietnameseFeature: 'Cấu hình tiêu chuẩn công nghiệp với tháp tinh cất Rectifier tách triệt để hơi nước, COP nhiệt ~ 0.72 từ nguồn nhiệt thấp 85-110°C.'
  },
  DOUBLE_EFFECT_REGENERATIVE: {
    id: 'DOUBLE_EFFECT_REGENERATIVE',
    name: 'Chu Trình Hấp Thụ Kép Hồi Nhiệt (Double-Effect Regenerative)',
    nominalThermalCop: 1.28,
    electricalConsumptionFractionPercent: 1.8,
    minGeneratorTempRequiredC: 130.0,
    ammoniaVaporPurityPercent: 99.95,
    vietnameseFeature: 'Hai tầng sinh hơi áp suất cao và thấp; nhiệt ngưng tụ tầng 1 cấp nhiệt tiếp cho tầng 2, đẩy COP nhiệt lên đến 1.28.'
  },
  DIFFUSION_ABSORPTION_NO_PUMP: {
    id: 'DIFFUSION_ABSORPTION_NO_PUMP',
    name: 'Chu Trình Khuếch Tán Von Platen-Munters (0% Bơm Cơ Học)',
    nominalThermalCop: 0.45,
    electricalConsumptionFractionPercent: 0.0,
    minGeneratorTempRequiredC: 90.0,
    ammoniaVaporPurityPercent: 99.50,
    vietnameseFeature: 'Bổ sung khí trơ Hydro (H2) cân bằng tổng áp suất; tuần hoàn hoàn toàn bằng đối lưu nhiệt tự nhiên, không dùng bơm điện, êm tuyệt đối 0 dB.'
  }
};

export interface AmmoniaWaterEquilibriumResult {
  generatorTempC: number;
  generatorPressureBar: number;
  strongSolutionMassFractionPercent: number; // x_rich ~ 45 - 55%
  weakSolutionMassFractionPercent: number; // x_weak ~ 25 - 35%
  ammoniaVaporPurityPercent: number;
  circulationRatio: number; // Mass of solution circulated per kg NH3 vapor
}

export interface AbsorptionChillerPerformanceResult {
  thermalHeatInputKW: number;
  coolingCapacityKW: number;
  chilledWaterFlowRateLpmAt7C: number;
  heatRejectionTotalKW: number;
  pumpElectricPowerKW: number;
  thermalCop: number;
  effectiveElectricCop: number; // Q_cooling / W_pump (>45)
  carnotMaxThermalCop: number;
  secondLawEfficiencyPercent: number;
}

export interface DataCenterCogenerationEconomicsResult {
  itServerLoadMW: number;
  wasteHeatCapturedMW: number;
  coolingProducedMW: number;
  initialDataCenterPue: number; // e.g. 1.35
  cogenerationPue: number; // e.g. 1.08
  annualElectricitySavedMWh: number;
  annualElectricityCostSavedUSD: number;
  annualAvoidedCO2Tons: number;
  flurocarbonRefrigerantEliminatedKg: number;
}

// Physical constants
const AMMONIA_LATENT_HEAT_KJ_PER_KG = 1371.0; // kJ/kg at 0°C
const WATER_HEAT_CAPACITY_KJ_PER_KG_K = 4.184;
const ELECTRICITY_COST_USD_PER_KWH = 0.11;

/**
 * 1. Calculates binary vapor-liquid phase equilibria for the NH3-H2O mixture in the desorbing generator:
 */
export function calculateAmmoniaWaterEquilibrium(
  generatorTempC: number = 100.0,
  generatorPressureBar: number = 18.0
): AmmoniaWaterEquilibriumResult {
  // Typical generator operating conditions:
  // Strong solution from absorber: ~48 - 54 wt% NH3
  // Weak solution leaving generator: ~28 - 36 wt% NH3
  const tempFactor = (generatorTempC - 85.0) / 45.0;
  const pressFactor = (generatorPressureBar - 15.0) / 10.0;

  const strongSolutionMassFractionPercent = Math.min(56.0, Math.max(40.0, 52.0 - 4.0 * pressFactor));
  const weakSolutionMassFractionPercent = Math.min(
    strongSolutionMassFractionPercent - 10.0,
    Math.max(22.0, 36.0 - 8.0 * tempFactor + 3.0 * pressFactor)
  );

  // Circulation ratio: f = (1 - x_weak) / (x_strong - x_weak)
  const xS = strongSolutionMassFractionPercent / 100.0;
  const xW = weakSolutionMassFractionPercent / 100.0;
  const circulationRatio = Math.max(2.5, (1.0 - xW) / Math.max(0.08, xS - xW));

  return {
    generatorTempC,
    generatorPressureBar,
    strongSolutionMassFractionPercent,
    weakSolutionMassFractionPercent,
    ammoniaVaporPurityPercent: 99.85,
    circulationRatio
  };
}

/**
 * 2. Calculates absorption chiller cooling capacity, thermal COP, and electrical equivalent COP:
 */
export function calculateAbsorptionChillerPerformance(
  thermalHeatInputKW: number = 1000.0,
  generatorTempC: number = 105.0,
  condenserTempC: number = 35.0,
  evaporatorTempC: number = 5.0,
  cycleType: AbsorptionCycleType = 'SINGLE_EFFECT_STANDARD'
): AbsorptionChillerPerformanceResult {
  const spec = ABSORPTION_CYCLES[cycleType];

  // Actual thermal COP calibrated with operating temperatures:
  // COP increases with generator temp and decreases with condenser temp
  const tempDriveBonus = (generatorTempC - spec.minGeneratorTempRequiredC) * 0.0035;
  const liftPenalty = (condenserTempC - 30.0) * 0.006;
  const thermalCop = Math.max(0.35, Math.min(1.45, spec.nominalThermalCop + tempDriveBonus - liftPenalty));

  const coolingCapacityKW = thermalHeatInputKW * thermalCop;

  // Chilled water flow rate (at 7°C supply, 12°C return -> Delta_T = 5 K):
  // Q = m_dot * Cp * Delta_T
  const chilledWaterKgPerS = coolingCapacityKW / (WATER_HEAT_CAPACITY_KJ_PER_KG_K * 5.0);
  const chilledWaterFlowRateLpmAt7C = chilledWaterKgPerS * 60.0;

  // Total heat rejection (Condenser + Absorber): Q_reject = Q_in + Q_cool
  const heatRejectionTotalKW = thermalHeatInputKW + coolingCapacityKW;

  // Ultra-low electric power consumption of liquid solution pump:
  const pumpFraction = spec.electricalConsumptionFractionPercent / 100.0;
  const pumpElectricPowerKW = coolingCapacityKW * pumpFraction;

  // Effective electrical equivalent COP: Q_cool / W_electric
  const effectiveElectricCop = coolingCapacityKW / Math.max(0.1, pumpElectricPowerKW);

  // Theoretical Carnot limit for absorption refrigeration:
  // COP_Carnot = ((T_gen - T_cond) / T_gen) * (T_evap / (T_cond - T_evap))
  const tGenK = generatorTempC + 273.15;
  const tCondK = condenserTempC + 273.15;
  const tEvapK = evaporatorTempC + 273.15;
  const carnotHeatEngineEff = (tGenK - tCondK) / tGenK;
  const carnotRefrigCop = tEvapK / Math.max(1.0, tCondK - tEvapK);
  const carnotMaxThermalCop = Math.max(0.5, carnotHeatEngineEff * carnotRefrigCop);

  const secondLawEfficiencyPercent = Math.min(75.0, (thermalCop / carnotMaxThermalCop) * 100.0);

  return {
    thermalHeatInputKW,
    coolingCapacityKW,
    chilledWaterFlowRateLpmAt7C,
    heatRejectionTotalKW,
    pumpElectricPowerKW,
    thermalCop,
    effectiveElectricCop,
    carnotMaxThermalCop,
    secondLawEfficiencyPercent
  };
}

/**
 * 3. Cogeneration Economics for AI Data Centers:
 * Captures GPU hot liquid coolant to drive absorption chillers, slashing facility PUE and electricity bills.
 */
export function calculateDataCenterCogenerationEconomics(
  itServerLoadMW: number = 10.0,
  wasteHeatCaptureFraction: number = 0.85
): DataCenterCogenerationEconomicsResult {
  // A 10 MW IT server load rejects ~ 9.5 MW of continuous thermal heat
  const totalHeatGeneratedMW = itServerLoadMW * 0.95;
  const wasteHeatCapturedMW = totalHeatGeneratedMW * wasteHeatCaptureFraction;

  // Single-effect absorption chiller produces cooling from captured heat:
  const chillerPerf = calculateAbsorptionChillerPerformance(wasteHeatCapturedMW * 1000.0, 90.0, 32.0, 7.0);
  const coolingProducedMW = chillerPerf.coolingCapacityKW / 1000.0;

  // PUE reduction:
  // Traditional data center PUE = 1.35 (where electric chillers account for ~0.26 PUE points, and UPS/fans ~0.09)
  // With waste-heat absorption chiller supplying 5.8+ MW of chilled water, electric chillers are ~90% displaced:
  const initialDataCenterPue = 1.35;
  const baselineChillerElectricOverheadMW = itServerLoadMW * 0.26;
  const baselineOtherFacilityOverheadMW = itServerLoadMW * 0.09;
  const totalCoolingThermalDemandMW = itServerLoadMW * 0.70;

  const fractionCoolingSuppliedByWasteHeat = Math.min(0.92, coolingProducedMW / totalCoolingThermalDemandMW);
  const remainingChillerElectricMW = baselineChillerElectricOverheadMW * (1.0 - fractionCoolingSuppliedByWasteHeat);
  const totalNewFacilityOverheadMW = remainingChillerElectricMW + baselineOtherFacilityOverheadMW;
  const cogenerationPue = 1.0 + (totalNewFacilityOverheadMW / itServerLoadMW);

  const electricOverheadReductionMW = baselineChillerElectricOverheadMW * fractionCoolingSuppliedByWasteHeat;

  // Annual electricity saved (8,760 hours/year 24/7):
  const annualElectricitySavedMWh = electricOverheadReductionMW * 8760;
  const annualElectricityCostSavedUSD = annualElectricitySavedMWh * 1000.0 * ELECTRICITY_COST_USD_PER_KWH;

  // Avoided carbon emissions (0.55 kg CO2/kWh):
  const annualAvoidedCO2Tons = (annualElectricitySavedMWh * 1000.0 * 0.55) / 1000.0;

  // Fluorocarbon refrigerant eliminated (R410A / R134a):
  // Typically 1.5 kg refrigerant per 10 kW cooling capacity
  const flurocarbonRefrigerantEliminatedKg = (coolingProducedMW * 1000.0 / 10.0) * 1.5;

  return {
    itServerLoadMW,
    wasteHeatCapturedMW,
    coolingProducedMW,
    initialDataCenterPue,
    cogenerationPue,
    annualElectricitySavedMWh,
    annualElectricityCostSavedUSD,
    annualAvoidedCO2Tons,
    flurocarbonRefrigerantEliminatedKg
  };
}
