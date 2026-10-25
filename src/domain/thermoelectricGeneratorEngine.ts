// src/domain/thermoelectricGeneratorEngine.ts
// Domain Engine: Solid-State Thermoelectric Energy Harvesting & Peltier Cooling (TEG/TEC)
// Standards: IUPAC Physical Chemistry, Seebeck & Peltier Effects, Figure of Merit zT, GDPT 2018 Physics & Industrial Heat Harvesting

export type ThermoelectricMaterialId =
  | 'BISMUTH_TELLURIDE_ROOM_TEMP'
  | 'SKUTTERUDITE_FILLED_MID_TEMP'
  | 'SILICON_GERMANIUM_SPACE_RTG'
  | 'OXIDE_CERAMIC_HIGH_TEMP';

export type ThermoelectricApplicationMode =
  | 'AUTOMOTIVE_EXHAUST_HARVESTING'
  | 'INDUSTRIAL_FURNACE_COGENERATION'
  | 'SPACE_PROBE_RADIOISOTOPE_RTG'
  | 'SOLID_STATE_PELTIER_CHIP_COOLING';

export interface ThermoelectricMaterialSpec {
  id: ThermoelectricMaterialId;
  name: string;
  chemicalFormula: string;
  optimalTempRangeK: [number, number];
  seebeckCoefficientMicroVPerK: number; // S (micro-V/K)
  electricalConductivitySiemensPerCm: number; // sigma (S/cm)
  thermalConductivityWPerMK: number; // kappa (W/(m*K))
  peakFigureOfMeritZT: number; // Dimensionless zT
  vietnameseDescription: string;
}

export const THERMOELECTRIC_MATERIALS: Record<ThermoelectricMaterialId, ThermoelectricMaterialSpec> = {
  BISMUTH_TELLURIDE_ROOM_TEMP: {
    id: 'BISMUTH_TELLURIDE_ROOM_TEMP',
    name: 'Bismuth Telluride Nanostructured Bi₂Te₃ / Sb₂Te₃',
    chemicalFormula: 'Bi₂Te₃',
    optimalTempRangeK: [300, 480],
    seebeckCoefficientMicroVPerK: 220.0,
    electricalConductivitySiemensPerCm: 1150.0,
    thermalConductivityWPerMK: 1.25,
    peakFigureOfMeritZT: 1.35,
    vietnameseDescription: 'Vật liệu nhiệt điện tiêu chuẩn nhiệt độ phòng; tán xạ phonon tại ranh giới hạt nano giúp ghìm độ dẫn nhiệt xuống 1.25 W/(m·K) đẩy zT lên 1.35.'
  },
  SKUTTERUDITE_FILLED_MID_TEMP: {
    id: 'SKUTTERUDITE_FILLED_MID_TEMP',
    name: 'Filled Skutterudite (Ba,La)xCo₄Sb₁₂',
    chemicalFormula: 'Co₄Sb₁₂',
    optimalTempRangeK: [500, 850],
    seebeckCoefficientMicroVPerK: 195.0,
    electricalConductivitySiemensPerCm: 1450.0,
    thermalConductivityWPerMK: 1.65,
    peakFigureOfMeritZT: 1.65,
    vietnameseDescription: 'Cấu trúc lồng tinh thể skutterudite được điền đầy bởi các nguyên tử kim loại kiềm thổ/đất hiếm dao động tự do (rattler atoms), triệt tiêu dẫn nhiệt mạng tinh thể.'
  },
  SILICON_GERMANIUM_SPACE_RTG: {
    id: 'SILICON_GERMANIUM_SPACE_RTG',
    name: 'Silicon-Germanium Si₀.₈Ge₀.₂ (NASA RTG Alloy)',
    chemicalFormula: 'Si₀.₈Ge₀.₂',
    optimalTempRangeK: [750, 1300],
    seebeckCoefficientMicroVPerK: 280.0,
    electricalConductivitySiemensPerCm: 680.0,
    thermalConductivityWPerMK: 3.80,
    peakFigureOfMeritZT: 1.05,
    vietnameseDescription: 'Hợp kim siêu bền nhiệt được cơ quan vũ trụ NASA sử dụng trên các tàu thám hiểm Voyager 1 & 2, Curiosity và Perseverance vận hành liên tục trên 45 năm trong vũ trụ.'
  },
  OXIDE_CERAMIC_HIGH_TEMP: {
    id: 'OXIDE_CERAMIC_HIGH_TEMP',
    name: 'Eco-Friendly Cobaltite Oxide Ca₃Co₄O₉ / ZnO',
    chemicalFormula: 'Ca₃Co₄O₉',
    optimalTempRangeK: [600, 1100],
    seebeckCoefficientMicroVPerK: 160.0,
    electricalConductivitySiemensPerCm: 850.0,
    thermalConductivityWPerMK: 1.85,
    peakFigureOfMeritZT: 0.85,
    vietnameseDescription: 'Gốm oxit thân thiện môi trường, 100% không chứa Tellur hay Chì độc hại, kháng oxy hóa tuyệt đối trong khí thải lò nung nhiệt độ cao tới 1000°C.'
  }
};

export interface ThermoelectricConversionResult {
  hotJunctionTempK: number;
  coldJunctionTempK: number;
  tempDifferenceK: number;
  averageFigureOfMeritZT: number;
  carnotMaxEfficiencyPercent: number;
  actualConversionEfficiencyPercent: number;
  electricalPowerOutputWatts: number;
  openCircuitVoltageVolts: number;
  heatFlowRateWatts: number;
}

export interface AutomotiveExhaustTegEconomicsResult {
  engineMechanicalPowerKW: number;
  exhaustGasHeatKW: number;
  recoveredElectricPowerWatts: number;
  alternatorUnloadPercent: number;
  fuelEconomyImprovementPercent: number;
  annualFuelSavedLiters: number;
  annualAvoidedCO2Kg: number;
}

/**
 * 1. Calculates the Dimensionless Figure of Merit (zT) from fundamental transport properties:
 * zT = (S^2 * sigma * T) / kappa
 */
export function calculateFigureOfMeritZT(
  seebeckMicroVPerK: number,
  electricalConductivitySPerCm: number,
  thermalConductivityWPerMK: number,
  tempK: number
): number {
  const seebeckVPerK = seebeckMicroVPerK * 1e-6;
  const electricalConductivitySPerM = electricalConductivitySPerCm * 100.0;
  const powerFactorWPerMK2 = Math.pow(seebeckVPerK, 2) * electricalConductivitySPerM;
  const zT = (powerFactorWPerMK2 * tempK) / thermalConductivityWPerMK;
  return zT;
}

/**
 * 2. Calculates Maximum Thermoelectric Power Conversion Efficiency and Electric Power Output:
 * eta_max = (Delta_T / T_h) * (sqrt(1 + zT_avg) - 1) / (sqrt(1 + zT_avg) + T_c / T_h)
 */
export function calculateThermoelectricGeneratorPerformance(
  materialId: ThermoelectricMaterialId = 'BISMUTH_TELLURIDE_ROOM_TEMP',
  hotSideTempC: number = 250.0,
  coldSideTempC: number = 40.0,
  numberOfThermocouplePairs: number = 128,
  thermalHeatInputWatts: number = 1500.0
): ThermoelectricConversionResult {
  const material = THERMOELECTRIC_MATERIALS[materialId];
  const hotJunctionTempK = hotSideTempC + 273.15;
  const coldJunctionTempK = coldSideTempC + 273.15;
  const tempDifferenceK = Math.max(5.0, hotJunctionTempK - coldJunctionTempK);
  const avgTempK = (hotJunctionTempK + coldJunctionTempK) / 2.0;

  // Actual zT at average temperature:
  const zT_avg = calculateFigureOfMeritZT(
    material.seebeckCoefficientMicroVPerK,
    material.electricalConductivitySiemensPerCm,
    material.thermalConductivityWPerMK,
    avgTempK
  );

  // Carnot theoretical efficiency:
  const carnotMaxEfficiencyPercent = (tempDifferenceK / hotJunctionTempK) * 100.0;

  // Maximum thermoelectric conversion efficiency:
  const m = Math.sqrt(1.0 + zT_avg);
  const efficiencyNumerator = m - 1.0;
  const efficiencyDenominator = m + (coldJunctionTempK / hotJunctionTempK);
  const actualConversionEfficiencyPercent = (carnotMaxEfficiencyPercent * (efficiencyNumerator / efficiencyDenominator));

  const electricalPowerOutputWatts = thermalHeatInputWatts * (actualConversionEfficiencyPercent / 100.0);

  // Open circuit Seebeck voltage: V_oc = 2 * N_pairs * S * Delta_T
  const openCircuitVoltageVolts = 2.0 * numberOfThermocouplePairs * (material.seebeckCoefficientMicroVPerK * 1e-6) * tempDifferenceK;

  return {
    hotJunctionTempK,
    coldJunctionTempK,
    tempDifferenceK,
    averageFigureOfMeritZT: zT_avg,
    carnotMaxEfficiencyPercent,
    actualConversionEfficiencyPercent,
    electricalPowerOutputWatts,
    openCircuitVoltageVolts,
    heatFlowRateWatts: thermalHeatInputWatts
  };
}

/**
 * 3. Simulates Vehicle Automotive Exhaust Waste Heat Recovery (TEG):
 * Upgrades 150 kW commercial diesel/gasoline truck engine by capturing exhaust heat into a 1.2 kW TEG module.
 */
export function calculateAutomotiveExhaustTegEconomics(
  engineMechanicalPowerKW: number = 150.0,
  tegHotTempC: number = 380.0,
  tegCoolantTempC: number = 65.0
): AutomotiveExhaustTegEconomicsResult {
  // Exhaust heat carries ~28% of total fuel thermal energy
  const totalFuelThermalPowerKW = engineMechanicalPowerKW / 0.38;
  const exhaustGasHeatKW = totalFuelThermalPowerKW * 0.28;

  // TEG conversion efficiency using Mid-Temp Skutterudites:
  const tegPerf = calculateThermoelectricGeneratorPerformance(
    'SKUTTERUDITE_FILLED_MID_TEMP',
    tegHotTempC,
    tegCoolantTempC,
    256,
    exhaustGasHeatKW * 0.08 * 1000.0 // 8% of exhaust heat channeled through compact TEG
  );

  const recoveredElectricPowerWatts = tegPerf.electricalPowerOutputWatts;

  // Typical vehicle alternator draws 1.8 kW with 65% efficiency (2.77 kW engine load).
  // A 1.2 kW TEG unloads the alternator by ~65%:
  const alternatorUnloadPercent = Math.min(100.0, (recoveredElectricPowerWatts / 1800.0) * 100.0);
  const engineLoadReductionKW = (recoveredElectricPowerWatts / 1000.0) / 0.65;
  const fuelEconomyImprovementPercent = (engineLoadReductionKW / engineMechanicalPowerKW) * 100.0;

  // Operating 100,000 km/year at 28 L/100km fuel consumption:
  const baselineAnnualFuelLiters = 28000.0;
  const annualFuelSavedLiters = baselineAnnualFuelLiters * (fuelEconomyImprovementPercent / 100.0);
  const annualAvoidedCO2Kg = annualFuelSavedLiters * 2.68; // 2.68 kg CO2 per liter of diesel

  return {
    engineMechanicalPowerKW,
    exhaustGasHeatKW,
    recoveredElectricPowerWatts,
    alternatorUnloadPercent,
    fuelEconomyImprovementPercent,
    annualFuelSavedLiters,
    annualAvoidedCO2Kg
  };
}
