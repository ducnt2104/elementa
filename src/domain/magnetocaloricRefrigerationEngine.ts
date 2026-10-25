// src/domain/magnetocaloricRefrigerationEngine.ts
// Domain Engine: Magnetocaloric Refrigeration & Magnetic Heat Pump (MCE)
// Standards: IUPAC Physical Chemistry, Active Magnetic Regenerator (AMR) Thermodynamics, GDPT 2018 Physics & Zero-GWP Cooling

export type MceMaterialType = 'LA_FE_SI_HYDRIDE' | 'GADOLINIUM_PURE' | 'MN_FE_P_SI_EARTH_ABUNDANT';
export type MceFluidType = 'PURE_WATER' | 'WATER_ETHYLENE_GLYCOL' | 'DEIONIZED_WATER_INHIBITED';

export interface MceMaterialSpec {
  id: MceMaterialType;
  name: string;
  chemicalFormula: string;
  curieTemperatureC: number;
  magneticEntropyChangeJPerKgKAt1_5T: number;
  adiabaticTempChangeDeltaTKAt1_5T: number;
  transitionType: 'FOMT_FIRST_ORDER' | 'SOPT_SECOND_ORDER';
  hysteresisLossJPerKg: number;
  thermalConductivityWPerMK: number;
  densityKgPerM3: number;
  vietnameseFeature: string;
}

export interface MceFluidSpec {
  id: MceFluidType;
  name: string;
  specificHeatJPerKgK: number;
  globalWarmingPotentialGWP: number; // 0.0 for water
  ozoneDepletionPotentialODP: number; // 0.0
  operatingMinTempC: number;
  vietnameseFeature: string;
}

export const MCE_MATERIALS: Record<MceMaterialType, MceMaterialSpec> = {
  LA_FE_SI_HYDRIDE: {
    id: 'LA_FE_SI_HYDRIDE',
    name: 'La(Fe,Si)13Hy Hydride (Khổng Lồ Kháng Hysteresis)',
    chemicalFormula: 'La(Fe0.88Si0.12)13H1.6',
    curieTemperatureC: 22.0,
    magneticEntropyChangeJPerKgKAt1_5T: 22.5,
    adiabaticTempChangeDeltaTKAt1_5T: 5.4,
    transitionType: 'FOMT_FIRST_ORDER',
    hysteresisLossJPerKg: 1.8,
    thermalConductivityWPerMK: 8.5,
    densityKgPerM3: 7200.0,
    vietnameseFeature: 'Hiệu ứng từ nhiệt khổng lồ (Giant MCE) qua chuyển pha cấu trúc từ bậc một FOMT; hydro hóa kẽ nguyên tử điều chỉnh chính xác nhiệt độ Curie ở 22°C điều hòa dân dụng.'
  },
  GADOLINIUM_PURE: {
    id: 'GADOLINIUM_PURE',
    name: 'Gadolini Kim Loại Tinh Khiết (Chuẩn Đối Chứng Quốc Tế)',
    chemicalFormula: 'Gd (99.9% Purity)',
    curieTemperatureC: 20.0,
    magneticEntropyChangeJPerKgKAt1_5T: 10.2,
    adiabaticTempChangeDeltaTKAt1_5T: 3.8,
    transitionType: 'SOPT_SECOND_ORDER',
    hysteresisLossJPerKg: 0.1,
    thermalConductivityWPerMK: 10.6,
    densityKgPerM3: 7900.0,
    vietnameseFeature: 'Vật liệu từ nhiệt chuẩn kinh điển với chuyển pha bậc hai SOPT không trễ từ, độ bền cơ lý vô hạn, chống mỏi dập từ trường.'
  },
  MN_FE_P_SI_EARTH_ABUNDANT: {
    id: 'MN_FE_P_SI_EARTH_ABUNDANT',
    name: 'MnFe(P,Si) Kim Loại Trầm Tích (0% Đất Hiếm Giá Siêu Rẻ)',
    chemicalFormula: 'Mn1.25Fe0.70P0.50Si0.50',
    curieTemperatureC: 24.0,
    magneticEntropyChangeJPerKgKAt1_5T: 18.0,
    adiabaticTempChangeDeltaTKAt1_5T: 4.8,
    transitionType: 'FOMT_FIRST_ORDER',
    hysteresisLossJPerKg: 2.4,
    thermalConductivityWPerMK: 5.2,
    densityKgPerM3: 6800.0,
    vietnameseFeature: '100% hợp kim các nguyên tố dồi dào trên vỏ trái đất (Mangan, Sắt, Photpho, Silic), loại bỏ hoàn toàn đất hiếm đắt đỏ, chi phí sản xuất thấp hơn 80%.'
  }
};

export const MCE_FLUIDS: Record<MceFluidType, MceFluidSpec> = {
  PURE_WATER: {
    id: 'PURE_WATER',
    name: 'Nước Tinh Khiết Tự Nhiên (100% Zero-GWP)',
    specificHeatJPerKgK: 4184.0,
    globalWarmingPotentialGWP: 0.0,
    ozoneDepletionPotentialODP: 0.0,
    operatingMinTempC: 3.0,
    vietnameseFeature: 'Môi chất truyền nhiệt hoàn hảo nhất hành tinh: GWP = 0, ODP = 0, không độc hại, không cháy nổ, nhiệt dung riêng cực đại.'
  },
  WATER_ETHYLENE_GLYCOL: {
    id: 'WATER_ETHYLENE_GLYCOL',
    name: 'Nước - Ethylene Glycol 30% (Chống Đóng Băng Tủ Lạnh)',
    specificHeatJPerKgK: 3750.0,
    globalWarmingPotentialGWP: 0.0,
    ozoneDepletionPotentialODP: 0.0,
    operatingMinTempC: -15.0,
    vietnameseFeature: 'Hạ điểm đóng băng xuống -15°C cho các ứng dụng tủ lạnh bảo quản thực phẩm và dược phẩm y tế.'
  },
  DEIONIZED_WATER_INHIBITED: {
    id: 'DEIONIZED_WATER_INHIBITED',
    name: 'Nước Khử Ion Bổ Sung Chất Ức Chế Ăn Mòn',
    specificHeatJPerKgK: 4150.0,
    globalWarmingPotentialGWP: 0.0,
    ozoneDepletionPotentialODP: 0.0,
    operatingMinTempC: 2.0,
    vietnameseFeature: 'Loại bỏ ion dẫn điện, bổ sung màng thụ động hóa chống oxy hóa bề mặt hạt hợp kim từ nhiệt.'
  }
};

export interface MceThermodynamicProperties {
  materialType: MceMaterialType;
  magneticFieldTesla: number;
  operatingTempC: number;
  isothermalEntropyChangeJPerKgK: number;
  adiabaticTemperatureChangeDeltaTK: number;
}

export interface AmrCyclePerformance {
  materialType: MceMaterialType;
  fluidType: MceFluidType;
  magneticFieldTesla: number;
  hotSinkTempC: number;
  coldLoadTempC: number;
  temperatureSpanK: number;
  coolingCapacityWatts: number;
  magneticDriveWorkWatts: number;
  fluidPumpWorkWatts: number;
  totalElectricPowerWatts: number;
  copCooling: number;
  carnotCop: number;
  secondLawEfficiencyPercent: number; // 50% - 65% of Carnot
}

export interface EnvironmentalSavingsResult {
  coolingCapacityKW: number;
  annualOperatingHours: number;
  refrigerantMassKgSaved: number;
  avoidedDirectGwpTonsCO2e: number;
  annualElectricitySavedKWh: number;
  avoidedIndirectElectricityCO2eTons: number;
  totalAnnualAvoidedCO2eTons: number;
}

/**
 * 1. Calculates the magnetocaloric effect (isothermal entropy change Delta_S_mag and adiabatic temp change Delta_T_ad):
 * Based on Maxwell relation: (dS/dH)_T = (dM/dT)_H
 */
export function calculateMceThermodynamicProperties(
  materialType: MceMaterialType = 'LA_FE_SI_HYDRIDE',
  magneticFieldTesla: number = 1.5,
  operatingTempC: number = 22.0
): MceThermodynamicProperties {
  const spec = MCE_MATERIALS[materialType];
  const fieldFactor = Math.pow(magneticFieldTesla / 1.5, 0.75);

  // Temperature offset from Curie temperature (sharp peak at T = T_C):
  const tempOffsetK = Math.abs(operatingTempC - spec.curieTemperatureC);
  // Lorentzian / Gaussian peak shape:
  const peakWidthK = spec.transitionType === 'FOMT_FIRST_ORDER' ? 6.0 : 14.0;
  const tempAttenuation = 1.0 / (1.0 + Math.pow(tempOffsetK / peakWidthK, 2));

  const isothermalEntropyChangeJPerKgK =
    spec.magneticEntropyChangeJPerKgKAt1_5T * fieldFactor * tempAttenuation;

  const adiabaticTemperatureChangeDeltaTK =
    spec.adiabaticTempChangeDeltaTKAt1_5T * fieldFactor * tempAttenuation;

  return {
    materialType,
    magneticFieldTesla,
    operatingTempC,
    isothermalEntropyChangeJPerKgK,
    adiabaticTemperatureChangeDeltaTK
  };
}

/**
 * 2. Simulates an Active Magnetic Regenerator (AMR) 4-step thermodynamic cycle:
 * Step 1: Adiabatic Magnetization (+Delta_T_ad)
 * Step 2: Isofield Fluid Blow to Hot Sink
 * Step 3: Adiabatic Demagnetization (-Delta_T_ad)
 * Step 4: Isofield Fluid Blow from Cold Load
 */
export function calculateAmrCyclePerformance(
  materialType: MceMaterialType = 'LA_FE_SI_HYDRIDE',
  fluidType: MceFluidType = 'PURE_WATER',
  magneticFieldTesla: number = 1.5,
  hotSinkTempC: number = 32.0, // Ambient heat rejection
  coldLoadTempC: number = 18.0, // Air conditioned room or refrigeration space
  bedActiveMassKg: number = 8.0, // 8 kg of porous magnetocaloric spheres
  cycleFrequencyHz: number = 2.0 // 2.0 Hz AMR rotation speed
): AmrCyclePerformance {
  const avgTempC = (hotSinkTempC + coldLoadTempC) / 2.0;
  const tempSpanK = hotSinkTempC - coldLoadTempC;
  const mceProps = calculateMceThermodynamicProperties(materialType, magneticFieldTesla, avgTempC);

  // Regeneration amplification factor: AMR bed regenerates temperature span much larger than single Delta_T_ad
  // Temp span amplification = 4 to 8 times Delta_T_ad
  const coolingCapacityPerCycleJ =
    bedActiveMassKg * mceProps.isothermalEntropyChangeJPerKgK * (coldLoadTempC + 273.15) * 0.18;
  const coolingCapacityWatts = Math.max(50.0, coolingCapacityPerCycleJ * cycleFrequencyHz);

  // Magnetic motor work: rotational magnetic torque against magnetic force + hysteresis loss:
  const hysteresisLossWatts =
    bedActiveMassKg * MCE_MATERIALS[materialType].hysteresisLossJPerKg * cycleFrequencyHz;
  const magneticDriveWorkWatts = (coolingCapacityWatts / 4.8) + hysteresisLossWatts;

  // Fluid pumping work through micro-packed bed:
  const fluidPumpWorkWatts = Math.max(15.0, 0.08 * coolingCapacityWatts);
  const totalElectricPowerWatts = magneticDriveWorkWatts + fluidPumpWorkWatts;

  // Actual Coefficient of Performance (COP):
  const copCooling = coolingCapacityWatts / Math.max(1.0, totalElectricPowerWatts);

  // Theoretical Carnot COP: COP_Carnot = T_cold / (T_hot - T_cold)
  const coldLoadTempK = coldLoadTempC + 273.15;
  const carnotCop = coldLoadTempK / Math.max(1.0, tempSpanK);

  // Second-Law Thermodynamic Efficiency (Percent of Carnot):
  const secondLawEfficiencyPercent = Math.min(85.0, (copCooling / carnotCop) * 100.0);

  return {
    materialType,
    fluidType,
    magneticFieldTesla,
    hotSinkTempC,
    coldLoadTempC,
    temperatureSpanK: tempSpanK,
    coolingCapacityWatts,
    magneticDriveWorkWatts,
    fluidPumpWorkWatts,
    totalElectricPowerWatts,
    copCooling,
    carnotCop,
    secondLawEfficiencyPercent
  };
}

/**
 * 3. Calculates environmental benefits: Zero-GWP refrigerant elimination and electricity savings vs vapor compression.
 */
export function calculateEnvironmentalSavings(
  coolingCapacityKW: number = 3.5, // Standard 1-ton residential room air conditioner
  annualOperatingHours: number = 2500 // 2,500 hours cooling season
): EnvironmentalSavingsResult {
  // Conventional R410A vapor compression unit:
  // Refrigerant charge: ~ 1.2 kg R410A per 3.5 kW AC
  // R410A GWP = 2088 (Global Warming Potential)
  // Annual leakage rate ~ 8%
  const refrigerantChargeKg = (coolingCapacityKW / 3.5) * 1.2;
  const annualRefrigerantLeakageKg = refrigerantChargeKg * 0.08;
  const avoidedDirectGwpTonsCO2e = (annualRefrigerantLeakageKg * 2088) / 1000.0;

  // Energy efficiency advantage:
  // Vapor compression COP ~ 3.2
  // Magnetocaloric AMR COP ~ 4.8 (33% less electricity!)
  const electricKWhVaporCompression = (coolingCapacityKW / 3.2) * annualOperatingHours;
  const electricKWhMagnetocaloric = (coolingCapacityKW / 4.8) * annualOperatingHours;
  const annualElectricitySavedKWh = Math.max(0, electricKWhVaporCompression - electricKWhMagnetocaloric);

  // Grid emissions factor: ~ 0.55 kg CO2/kWh
  const avoidedIndirectElectricityCO2eTons = (annualElectricitySavedKWh * 0.55) / 1000.0;
  const totalAnnualAvoidedCO2eTons = avoidedDirectGwpTonsCO2e + avoidedIndirectElectricityCO2eTons;

  return {
    coolingCapacityKW,
    annualOperatingHours,
    refrigerantMassKgSaved: refrigerantChargeKg,
    avoidedDirectGwpTonsCO2e,
    annualElectricitySavedKWh,
    avoidedIndirectElectricityCO2eTons,
    totalAnnualAvoidedCO2eTons
  };
}
