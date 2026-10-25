// src/domain/zincAirOxideCycleEngine.ts
// Domain Engine: Concentrated Solar Thermochemical Zinc-Zinc Oxide (Zn/ZnO) Water-Splitting Cycle
// Standards: IUPAC Chemical Thermodynamics, High-Temperature Solar Chemistry, GDPT 2018 Chemistry & Green Hydrogen Economy

export type SolarReceiverType = 'BEAM_DOWN_ROTATING_CAVITY' | 'SOLAR_TOWER_AEROSOL_FLUIDIZED' | 'PARABOLIC_DISH_VACUUM';

export interface SolarReceiverSpec {
  id: SolarReceiverType;
  name: string;
  solarConcentrationRatios: number; // e.g. 2000 - 5000 suns
  receiverOperatingTempK: number; // 1800 - 2150 K
  opticalEfficiencyPercent: number; // 75 - 85%
  typicalThermalCapacityMWth: number; // 5 - 50 MWth
  vietnameseDescription: string;
}

export const SOLAR_RECEIVERS: Record<SolarReceiverType, SolarReceiverSpec> = {
  BEAM_DOWN_ROTATING_CAVITY: {
    id: 'BEAM_DOWN_ROTATING_CAVITY',
    name: 'Lò Xoay Trọng Lực Chiếu Xuống (Beam-Down Rotating Cavity)',
    solarConcentrationRatios: 3500,
    receiverOperatingTempK: 1950,
    opticalEfficiencyPercent: 82.0,
    typicalThermalCapacityMWth: 10.0,
    vietnameseDescription: 'Chùm tia hội tụ từ tháp phản xạ xuống lò xoay ly tâm, bột ZnO bám trên thành lò liên tục hấp thụ bức xạ mặt trời trực tiếp mà không cần ống thạch anh đắt tiền.'
  },
  SOLAR_TOWER_AEROSOL_FLUIDIZED: {
    id: 'SOLAR_TOWER_AEROSOL_FLUIDIZED',
    name: 'Tháp Tập Trung Hạt Khí Dung Tầng Sôi (Aerosol Fluidized Bed)',
    solarConcentrationRatios: 4500,
    receiverOperatingTempK: 2050,
    opticalEfficiencyPercent: 84.5,
    typicalThermalCapacityMWth: 25.0,
    vietnameseDescription: 'Bột nano ZnO lơ lửng trong dòng khí trơ Ar/N₂ hấp thụ năng lượng mặt trời thể tích cực nhanh, phân ly hoàn toàn thành hơi Zn và O₂.'
  },
  PARABOLIC_DISH_VACUUM: {
    id: 'PARABOLIC_DISH_VACUUM',
    name: 'Chảo Parabol Hội Tụ Điểm Chân Không (Parabolic Dish Vacuum)',
    solarConcentrationRatios: 5000,
    receiverOperatingTempK: 2150,
    opticalEfficiencyPercent: 86.0,
    typicalThermalCapacityMWth: 5.0,
    vietnameseDescription: 'Độ tập trung siêu cao đạt nhiệt độ 2150 K trong buồng chân không áp suất thấp, hạ nhiệt độ phân ly ZnO giúp tăng tốc độ phản ứng.'
  }
};

export interface ZnZnoThermodynamicsResult {
  step1ReductionTempK: number;
  step2HydrolysisTempK: number;
  step1EnthalpyKJPerMol: number; // +460 kJ/mol (Endothermic)
  step2EnthalpyKJPerMol: number; // -105 kJ/mol (Exothermic)
  zincDissociationPressureBar: number;
  quenchCoolingRateKelvinPerSec: number; // > 10^5 K/s to prevent recomb
  zincNanoparticleConversionPercent: number; // 92 - 98%
  solarToHydrogenEfficiencyPercent: number; // 32 - 42%
  hourlyHydrogenProductionKg: number;
  dailyHydrogenProductionTons: number;
  levelizedCostOfHydrogenUSDPerKg: number;
  avoidedAnnualCO2Tons: number;
}

// Physical Constants
const ZINC_MOLAR_MASS_KG_PER_MOL = 0.06538; // kg/mol Zn
const HYDROGEN_MOLAR_MASS_KG_PER_MOL = 0.002016; // kg/mol H2
const HYDROGEN_HHV_MJ_PER_KG = 141.8; // Higher Heating Value of H2
const UNIVERSAL_GAS_CONSTANT_R = 8.31446;

/**
 * 1. Simulates the Two-Step Solar Zinc-Zinc Oxide Thermochemical Cycle:
 * Step 1: ZnO(s) -> Zn(g) + 0.5 O2(g)   (Endothermic solar thermal dissociation at 1950 K)
 * Step 2: Zn(s) + H2O(g) -> ZnO(s) + H2(g) (Exothermic hydrolysis at 650 K)
 */
export function calculateZnZnoCyclePerformance(
  receiverType: SolarReceiverType = 'BEAM_DOWN_ROTATING_CAVITY',
  solarThermalInputMWth: number = 10.0,
  hydrolysisTempC: number = 400.0,
  quenchEffectiveness: number = 0.94
): ZnZnoThermodynamicsResult {
  const receiver = SOLAR_RECEIVERS[receiverType];
  const step1ReductionTempK = receiver.receiverOperatingTempK;
  const step2HydrolysisTempK = hydrolysisTempC + 273.15;

  // Dissociation equilibrium pressure of Zn(g) over ZnO at high temperature:
  // Delta_G° = 460,000 - 285 * T (J/mol)
  const deltaG_J = 460000.0 - 285.0 * step1ReductionTempK;
  const lnK = -deltaG_J / (UNIVERSAL_GAS_CONSTANT_R * step1ReductionTempK);
  const zincDissociationPressureBar = Math.min(25.0, Math.max(0.1, Math.exp(lnK * 0.67)));

  // Solar-to-Hydrogen (STH) thermochemical efficiency:
  // eta_STH = (m_dot_H2 * HHV) / Q_solar
  // Carnot radiation limit: eta_absorber = 1 - (T_amb / T_rec)^4 * (1 / C)
  const tAmb = 300.0;
  const reradiationLossFraction = Math.pow(tAmb / step1ReductionTempK, 4) * (1.0 / (receiver.solarConcentrationRatios / 1000.0));
  const absorberThermalEfficiency = Math.max(0.65, (receiver.opticalEfficiencyPercent / 100.0) * (1.0 - reradiationLossFraction * 0.15));

  // High-temperature heat to chemical work:
  const chemicalThermodynamicEfficiency = 0.52; // High-enthalpy conversion
  const solarToHydrogenEfficiencyPercent = absorberThermalEfficiency * chemicalThermodynamicEfficiency * quenchEffectiveness * 100.0;

  // Hydrogen production rate:
  const hydrogenThermalPowerMW = solarThermalInputMWth * (solarToHydrogenEfficiencyPercent / 100.0);
  const hydrogenKgPerSec = (hydrogenThermalPowerMW * 1e6) / (HYDROGEN_HHV_MJ_PER_KG * 1e6);
  const hourlyHydrogenProductionKg = hydrogenKgPerSec * 3600.0;
  const dailyHydrogenProductionTons = (hourlyHydrogenProductionKg * 8.0) / 1000.0; // 8 peak sun hours/day

  // LCOH economics for 30-year concentrated solar plant:
  // CapEx for heliostat field + solar tower receiver + zinc hydrolyzer: ~$1,800/kWth
  const lcohElectricityAndCapex = 2.95 + (42.0 - solarToHydrogenEfficiencyPercent) * 0.04;
  const levelizedCostOfHydrogenUSDPerKg = Math.min(4.20, Math.max(2.40, lcohElectricityAndCapex));

  // Annual avoided CO2 emissions (vs Steam Methane Reforming producing 10 kg CO2/kg H2):
  const annualH2ProductionKg = dailyHydrogenProductionTons * 1000.0 * 330.0; // 330 sunny days/yr
  const avoidedAnnualCO2Tons = (annualH2ProductionKg * 10.0) / 1000.0;

  return {
    step1ReductionTempK,
    step2HydrolysisTempK,
    step1EnthalpyKJPerMol: 460.0,
    step2EnthalpyKJPerMol: -105.0,
    zincDissociationPressureBar,
    quenchCoolingRateKelvinPerSec: 150000.0, // 1.5 * 10^5 K/s
    zincNanoparticleConversionPercent: quenchEffectiveness * 100.0,
    solarToHydrogenEfficiencyPercent,
    hourlyHydrogenProductionKg,
    dailyHydrogenProductionTons,
    levelizedCostOfHydrogenUSDPerKg,
    avoidedAnnualCO2Tons
  };
}
