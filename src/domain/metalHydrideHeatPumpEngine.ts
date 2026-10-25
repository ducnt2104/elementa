// src/domain/metalHydrideHeatPumpEngine.ts
// Domain Engine: Solid-State Thermochemical Metal Hydride Heat Pump & Heat Transformer (MH-HP)
// Standards: IUPAC Chemical Thermodynamics, Van 't Hoff Hydride Phase Equilibria, GDPT 2018 Chemistry & Industrial Waste Heat Upgrading

export type HydrideAlloyId =
  | 'LANI5_STANDARD'
  | 'MM_NI_AL_MISCHMETAL'
  | 'TIFE_MN_TITANIUM_IRON'
  | 'ZR_TI_CR_FE_LAVES';

export type HeatPumpOperatingMode =
  | 'HEAT_TRANSFORMER_UPGRADE' // Nâng cấp nhiệt thải: 90°C -> 155°C (Hơi nước bão hòa)
  | 'THERMAL_DRIVEN_CHILLER'; // Làm mát không dùng điện: Nhiệt cấp 120°C -> Làm lạnh 4°C

export interface MetalHydrideAlloySpec {
  id: HydrideAlloyId;
  formula: string;
  name: string;
  alloyFamily: 'AB5' | 'AB' | 'AB2_LAVES';
  enthalpyAbsorptionKJPerMolH2: number; // Delta_H < 0, typically -25 to -36 kJ/mol H2
  entropyAbsorptionJPerMolH2K: number; // Delta_S < 0, typically -100 to -115 J/(mol*K)
  hydrogenStorageCapacityWtPercent: number; // 1.2 - 1.8 wt% H2
  plateauSlopeFactor: number; // Real plateau tilt
  hysteresisFactor: number; // P_abs / P_des factor (typically 1.10 - 1.25)
  vietnameseDescription: string;
}

export const METAL_HYDRIDE_ALLOYS: Record<HydrideAlloyId, MetalHydrideAlloySpec> = {
  LANI5_STANDARD: {
    id: 'LANI5_STANDARD',
    formula: 'LaNi₅',
    name: 'Lanthanum-Nickel AB₅ Intermetallic',
    alloyFamily: 'AB5',
    enthalpyAbsorptionKJPerMolH2: -30.8,
    entropyAbsorptionJPerMolH2K: -108.0,
    hydrogenStorageCapacityWtPercent: 1.45,
    plateauSlopeFactor: 0.08,
    hysteresisFactor: 1.15,
    vietnameseDescription: 'Hợp kim kinh điển cấu trúc CaCu₅; động học hấp phụ siêu nhanh (<30s), áp suất cân bằng 1.8-3.0 bar ở 25°C, tuổi thọ chu kỳ > 10.000 lần.'
  },
  MM_NI_AL_MISCHMETAL: {
    id: 'MM_NI_AL_MISCHMETAL',
    formula: 'MmNi₄.₅Al₀.₅',
    name: 'Mischmetal-Substituted High-Temp AB₅',
    alloyFamily: 'AB5',
    enthalpyAbsorptionKJPerMolH2: -34.5,
    entropyAbsorptionJPerMolH2K: -112.0,
    hydrogenStorageCapacityWtPercent: 1.35,
    plateauSlopeFactor: 0.12,
    hysteresisFactor: 1.20,
    vietnameseDescription: 'Hợp kim nhiệt độ cao pha Mischmetal (La, Ce, Pr, Nd) và Nhôm để hạ áp suất cân bằng, chịu nhiệt độ giải hấp lên tới 130-170°C, giá thành thấp.'
  },
  TIFE_MN_TITANIUM_IRON: {
    id: 'TIFE_MN_TITANIUM_IRON',
    formula: 'TiFe₀.₈₅Mn₀.₁₅',
    name: 'Titanium-Iron-Manganese AB Intermetallic',
    alloyFamily: 'AB',
    enthalpyAbsorptionKJPerMolH2: -27.5,
    entropyAbsorptionJPerMolH2K: -106.0,
    hydrogenStorageCapacityWtPercent: 1.85,
    plateauSlopeFactor: 0.14,
    hysteresisFactor: 1.25,
    vietnameseDescription: 'Hợp kim gốc titan-sắt dồi dào, dung lượng trữ hydro cao (1.85 wt%), pha Mn giúp hoạt hóa dễ dàng ở nhiệt độ thường làm tầng nhiệt độ thấp (LTH).'
  },
  ZR_TI_CR_FE_LAVES: {
    id: 'ZR_TI_CR_FE_LAVES',
    formula: 'Zr₀.₉Ti₀.₁Cr₁.₂Fe₀.₈',
    name: 'Zirconium AB₂ Laves Phase Alloy',
    alloyFamily: 'AB2_LAVES',
    enthalpyAbsorptionKJPerMolH2: -25.5,
    entropyAbsorptionJPerMolH2K: -104.0,
    hydrogenStorageCapacityWtPercent: 1.70,
    plateauSlopeFactor: 0.10,
    hysteresisFactor: 1.18,
    vietnameseDescription: 'Pha Laves C14 độ bền nhiệt cơ học cao, chịu áp suất nạp hydro cao tới 50 bar, tối ưu cho ứng dụng nén hydro nhiệt hóa đa tầng.'
  }
};

// Physical Constants
const UNIVERSAL_GAS_CONSTANT_R = 8.31446; // J/(mol*K)
const HYDROGEN_MOLAR_MASS_KG_PER_MOL = 0.002016; // kg/mol H2
const REFERENCE_PRESSURE_BAR = 1.0; // P0 = 1 bar

export interface VanTHoffPoint {
  tempC: number;
  tempK: number;
  equilibriumPressureBarAbs: number;
  equilibriumPressureBarDes: number;
}

export interface MetalHydrideHeatTransformerResult {
  wasteHeatSourceTempC: number; // T_m (e.g. 90°C)
  ambientSinkTempC: number; // T_l (e.g. 25°C)
  upgradedOutputTempC: number; // T_h (e.g. 150°C)
  temperatureLiftK: number; // T_h - T_m
  highTempHydrideId: HydrideAlloyId;
  lowTempHydrideId: HydrideAlloyId;
  pressureHighBar: number;
  pressureLowBar: number;
  thermalCop: number; // Q_upgraded / Q_waste_in (~ 0.38 - 0.48)
  carnotMaxCop: number;
  secondLawEfficiencyPercent: number;
  upgradedThermalPowerKW: number;
  annualElectricityDisplacedMWh: number;
  annualFuelSavingsUSD: number;
  annualAvoidedCO2Tons: number;
}

export interface MetalHydrideChillerResult {
  drivingHeatSourceTempC: number; // T_drive (e.g. 125°C)
  ambientHeatRejectionTempC: number; // T_amb (e.g. 32°C)
  chilledWaterTempC: number; // T_chill (e.g. 5°C)
  highTempHydrideId: HydrideAlloyId;
  lowTempHydrideId: HydrideAlloyId;
  coolingCapacityKW: number;
  coolingThermalCop: number; // Q_cool / Q_drive (~ 0.35 - 0.52)
  effectiveElectricCopEquivalent: number; // Zero moving parts, > 60
}

/**
 * 1. Calculates Van 't Hoff equilibrium hydrogen pressure for a metal hydride alloy at temperature T:
 * ln(P_eq / P0) = Delta_H / (R * T) - Delta_S / R
 */
export function calculateVanTHoffEquilibrium(
  alloyId: HydrideAlloyId,
  tempC: number
): VanTHoffPoint {
  const alloy = METAL_HYDRIDE_ALLOYS[alloyId];
  const tempK = tempC + 273.15;

  // Delta_H in J/mol H2, Delta_S in J/(mol*K)
  const deltaH_J = alloy.enthalpyAbsorptionKJPerMolH2 * 1000.0;
  const deltaS_J = alloy.entropyAbsorptionJPerMolH2K;

  // Absorption equilibrium pressure
  const lnP_over_P0 = (deltaH_J / (UNIVERSAL_GAS_CONSTANT_R * tempK)) - (deltaS_J / UNIVERSAL_GAS_CONSTANT_R);
  const pEqAbs = REFERENCE_PRESSURE_BAR * Math.exp(lnP_over_P0);

  // Desorption equilibrium pressure with hysteresis
  const pEqDes = pEqAbs / alloy.hysteresisFactor;

  return {
    tempC,
    tempK,
    equilibriumPressureBarAbs: Math.max(0.01, pEqAbs),
    equilibriumPressureBarDes: Math.max(0.01, pEqDes)
  };
}

/**
 * 2. Simulates Heat Transformer Mode (Thermochemical Temperature Upgrading):
 * Upgrades waste heat from T_m to T_h by rejecting part of the heat to ambient sink T_l.
 * Dual-reactor hydrogen shuttle:
 * Step 1: Desorb H2 from HTH at T_m (input heat) -> Absorb H2 in LTH at T_l (reject heat).
 * Step 2: Desorb H2 from LTH at T_m (input heat) -> Absorb H2 in HTH at T_h (release high-grade heat).
 */
export function calculateHeatTransformerPerformance(
  wasteHeatSourceTempC: number = 95.0,
  ambientSinkTempC: number = 25.0,
  wasteHeatInputPowerKW: number = 500.0,
  highTempHydrideId: HydrideAlloyId = 'MM_NI_AL_MISCHMETAL',
  lowTempHydrideId: HydrideAlloyId = 'TIFE_MN_TITANIUM_IRON'
): MetalHydrideHeatTransformerResult {
  const hth = METAL_HYDRIDE_ALLOYS[highTempHydrideId];
  const lth = METAL_HYDRIDE_ALLOYS[lowTempHydrideId];

  // Pressures in the two steps:
  // In Step 2, LTH desorbs at T_m -> generates high pressure P_high:
  const lthAtTm = calculateVanTHoffEquilibrium(lowTempHydrideId, wasteHeatSourceTempC);
  const pressureHighBar = lthAtTm.equilibriumPressureBarDes;

  // In Step 1, HTH desorbs at T_m while LTH absorbs at T_l -> establishes low pressure P_low:
  const lthAtTl = calculateVanTHoffEquilibrium(lowTempHydrideId, ambientSinkTempC);
  const pressureLowBar = lthAtTl.equilibriumPressureBarAbs;

  // Delivered upgraded temperature T_h at HTH during absorption at P_high:
  // ln(P_high / P0) = Delta_H_HTH / (R * T_h) - Delta_S_HTH / R
  // -> 1 / T_h = (R * ln(P_high / P0) + Delta_S_HTH) / Delta_H_HTH
  const deltaH_HTH_J = hth.enthalpyAbsorptionKJPerMolH2 * 1000.0;
  const deltaS_HTH_J = hth.entropyAbsorptionJPerMolH2K;
  const lnP_high = Math.log(pressureHighBar / REFERENCE_PRESSURE_BAR);
  const invTh = (UNIVERSAL_GAS_CONSTANT_R * lnP_high + deltaS_HTH_J) / deltaH_HTH_J;
  const thK = 1.0 / invTh;
  const upgradedOutputTempC = Math.min(185.0, Math.max(wasteHeatSourceTempC + 20.0, thK - 273.15));

  const temperatureLiftK = upgradedOutputTempC - wasteHeatSourceTempC;

  // Thermal COP for Heat Transformer:
  // COP_th = Q_high / (Q_waste_step1 + Q_waste_step2)
  // Ratio of reaction enthalpies modified by heat exchanger recovery efficiency (eta_rec ~ 0.85):
  const etaRec = 0.85;
  const rawCop = Math.abs(deltaH_HTH_J) / (Math.abs(deltaH_HTH_J) + Math.abs(lth.enthalpyAbsorptionKJPerMolH2 * 1000.0));
  const thermalCop = Math.min(0.48, Math.max(0.35, rawCop * etaRec));

  const upgradedThermalPowerKW = wasteHeatInputPowerKW * thermalCop;

  // Carnot Maximum COP for Heat Transformer:
  // COP_Carnot = ((T_m - T_l) / T_m) * (T_h / (T_h - T_l))
  const tmK = wasteHeatSourceTempC + 273.15;
  const tlK = ambientSinkTempC + 273.15;
  const carnotMaxCop = ((tmK - tlK) / tmK) * (thK / Math.max(1.0, thK - tlK));
  const secondLawEfficiencyPercent = Math.min(85.0, (thermalCop / Math.max(0.4, carnotMaxCop)) * 100.0);

  // Economic & Ecological impact (operating 8,000 hrs/year replacing electric steam generation or fuel oil):
  const annualHeatEnergyMWh = (upgradedThermalPowerKW * 8000.0) / 1000.0;
  const annualElectricityDisplacedMWh = annualHeatEnergyMWh; // if replaced resistive heating
  const fuelCostPerMWh = 65.0; // USD/MWh for steam
  const annualFuelSavingsUSD = annualHeatEnergyMWh * fuelCostPerMWh;
  const annualAvoidedCO2Tons = annualHeatEnergyMWh * 0.35; // 0.35 tons CO2/MWh industrial steam

  return {
    wasteHeatSourceTempC,
    ambientSinkTempC,
    upgradedOutputTempC,
    temperatureLiftK,
    highTempHydrideId,
    lowTempHydrideId,
    pressureHighBar,
    pressureLowBar,
    thermalCop,
    carnotMaxCop,
    secondLawEfficiencyPercent,
    upgradedThermalPowerKW,
    annualElectricityDisplacedMWh,
    annualFuelSavingsUSD,
    annualAvoidedCO2Tons
  };
}

/**
 * 3. Simulates Thermally Driven Refrigeration Mode:
 * Driven by thermal heat at T_drive (e.g. 120-150°C), rejects heat to ambient T_amb (30-35°C), produces chilled water at T_chill (0-8°C).
 */
export function calculateMetalHydrideChillerPerformance(
  drivingHeatSourceTempC: number = 130.0,
  ambientHeatRejectionTempC: number = 32.0,
  chilledWaterTempC: number = 5.0,
  drivingHeatPowerKW: number = 300.0,
  highTempHydrideId: HydrideAlloyId = 'LANI5_STANDARD',
  lowTempHydrideId: HydrideAlloyId = 'TIFE_MN_TITANIUM_IRON'
): MetalHydrideChillerResult {
  const hth = METAL_HYDRIDE_ALLOYS[highTempHydrideId];
  const lth = METAL_HYDRIDE_ALLOYS[lowTempHydrideId];

  // Cooling COP for metal hydride chiller:
  // COP_cool = Q_chill / Q_drive = |Delta_H_LTH| / |Delta_H_HTH| * eta_system
  const deltaH_HTH = Math.abs(hth.enthalpyAbsorptionKJPerMolH2);
  const deltaH_LTH = Math.abs(lth.enthalpyAbsorptionKJPerMolH2);

  const etaSystem = 0.50; // Sensible heat loss in alloy bed cycling
  const coolingThermalCop = Math.min(0.55, Math.max(0.28, (deltaH_LTH / deltaH_HTH) * etaSystem));
  const coolingCapacityKW = drivingHeatPowerKW * coolingThermalCop;

  // Zero moving parts (no mechanical compressor, passive hydrogen valve manifold):
  // Parasitic electric consumption < 0.5 kW for control electronics
  const effectiveElectricCopEquivalent = coolingCapacityKW / 0.5;

  return {
    drivingHeatSourceTempC,
    ambientHeatRejectionTempC,
    chilledWaterTempC,
    highTempHydrideId,
    lowTempHydrideId,
    coolingCapacityKW,
    coolingThermalCop,
    effectiveElectricCopEquivalent
  };
}
