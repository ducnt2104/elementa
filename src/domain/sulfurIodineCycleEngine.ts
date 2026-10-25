// src/domain/sulfurIodineCycleEngine.ts
// Domain Engine: Concentrated Solar & HTGR Sulfur-Iodine (S-I) Thermochemical Water-Splitting Cycle
// Standards: IUPAC Chemical Thermodynamics, General Atomics S-I Cycle, GDPT 2018 Chemistry & Industrial Green Hydrogen

export type HeatSourcePrimaryType = 'CONCENTRATED_SOLAR_TOWER' | 'HTGR_NUCLEAR_REACTOR' | 'FUSION_MOLTEN_SALT_HEAT';

export interface HeatSourceSpec {
  id: HeatSourcePrimaryType;
  name: string;
  peakOperatingTempC: number; // 850 - 950°C
  nominalThermalPowerMWth: number; // 50 - 500 MWth
  heatTransferFluid: string;
  vietnameseDescription: string;
}

export const SI_HEAT_SOURCES: Record<HeatSourcePrimaryType, HeatSourceSpec> = {
  CONCENTRATED_SOLAR_TOWER: {
    id: 'CONCENTRATED_SOLAR_TOWER',
    name: 'Tháp Điện Mặt Trời Nhiệt Tập Trung (Solar Central Receiver)',
    peakOperatingTempC: 900.0,
    nominalThermalPowerMWth: 100.0,
    heatTransferFluid: 'Muối nóng chảy ternary chloride hoặc khí Heli',
    vietnameseDescription: 'Cánh đồng gương heliostat hội tụ bức xạ mặt trời lên đỉnh tháp, nung nóng dòng khí tải nhiệt lên 900°C cấp nhiệt trực tiếp cho cụm phân hủy axit sunfuric.'
  },
  HTGR_NUCLEAR_REACTOR: {
    id: 'HTGR_NUCLEAR_REACTOR',
    name: 'Lò Phản Ứng Hạt Nhân Khí Nhiệt Độ Cao (HTGR / VHTR Gen-IV)',
    peakOperatingTempC: 950.0,
    nominalThermalPowerMWth: 250.0,
    heatTransferFluid: 'Khí trơ Heli siêu sạch (Helium gas @ 70 bar)',
    vietnameseDescription: 'Lò phản ứng hạt nhân thế hệ thứ IV tải nhiệt bằng khí heli 950°C, cung cấp nguồn nhiệt sạch liên tục 24/7/365 sản xuất hydro quy mô hàng triệu tấn/năm.'
  },
  FUSION_MOLTEN_SALT_HEAT: {
    id: 'FUSION_MOLTEN_SALT_HEAT',
    name: 'Vòng Tản Nhiệt Lò Nhiệt Hạch Tokamak (Fusion FLiBe Blanket)',
    peakOperatingTempC: 850.0,
    nominalThermalPowerMWth: 500.0,
    heatTransferFluid: 'Muối nóng chảy FLiBe (LiF-BeF2)',
    vietnameseDescription: 'Nhiệt giải phóng từ phản ứng nhiệt hạch D-T được lớp màng muối lỏng FLiBe hấp thụ, đồng phát điện năng và hydro sạch ở cấp độ Gigawatt.'
  }
};

export interface SulfurIodineCyclePerformanceResult {
  heatSourceType: HeatSourcePrimaryType;
  peakHeatSourceTempC: number;
  thermalEfficiencyPercent: number; // 45 - 52%
  bunsenReactionTempC: number; // 120°C (393 K)
  sulfuricDecompTempC: number; // 850 - 900°C (1123 - 1173 K)
  hiDecompTempC: number; // 450°C (723 K)
  hourlyHydrogenProductionKg: number;
  dailyHydrogenProductionTons: number;
  levelizedCostOfHydrogenUSDPerKg: number; // $2.20 - $2.90/kg
  annualAvoidedCO2Tons: number;
  corrosionResistantAlloyMaterial: string;
}

// Physical Constants
const HYDROGEN_HHV_MJ_PER_KG = 141.8;
const WATER_MOLAR_MASS_KG_PER_MOL = 0.018015;

/**
 * 1. Simulates Sulfur-Iodine (S-I) Closed-Loop Thermochemical Cycle:
 * Reaction 1 (Bunsen): I2 + SO2 + 2 H2O -> 2 HI + H2SO4 (120°C, Exothermic)
 * Reaction 2 (Sulfuric): H2SO4 -> H2O + SO2 + 0.5 O2 (850-900°C, High-Temp Solar/Nuclear Endothermic)
 * Reaction 3 (HI Decomp): 2 HI -> H2 + I2 (450°C, Endothermic)
 * Net Reaction: H2O -> H2 + 0.5 O2
 */
export function calculateSulfurIodineCyclePerformance(
  heatSourceType: HeatSourcePrimaryType = 'CONCENTRATED_SOLAR_TOWER',
  thermalPowerMWth: number = 100.0,
  sulfuricAcidDecompTempC: number = 900.0,
  hiConversionEnhancementFraction: number = 0.88
): SulfurIodineCyclePerformanceResult {
  const heatSource = SI_HEAT_SOURCES[heatSourceType];

  // Actual thermal efficiency based on Carnot limit and chemical heat recovery:
  // Base efficiency ~ 44%, enhanced with reactive distillation / membrane separation in HI decomposition:
  const tempBonus = (sulfuricAcidDecompTempC - 850.0) * 0.05;
  const hiSeparationBonus = (hiConversionEnhancementFraction - 0.70) * 15.0;
  const thermalEfficiencyPercent = Math.min(52.5, Math.max(42.0, 45.0 + tempBonus + hiSeparationBonus));

  // Hydrogen mass flow rate:
  // Thermal Power to H2 HHV energy:
  const hydrogenEnergyOutputMW = thermalPowerMWth * (thermalEfficiencyPercent / 100.0);
  const hydrogenKgPerSec = (hydrogenEnergyOutputMW * 1e6) / (HYDROGEN_HHV_MJ_PER_KG * 1e6);
  const hourlyHydrogenProductionKg = hydrogenKgPerSec * 3600.0;
  const operatingHoursPerDay = heatSourceType === 'CONCENTRATED_SOLAR_TOWER' ? 10.0 : 24.0;
  const dailyHydrogenProductionTons = (hourlyHydrogenProductionKg * operatingHoursPerDay) / 1000.0;

  // Levelized Cost of Hydrogen (LCOH):
  // S-I has very low electricity demand (<5% for solution pumping), primary cost is capital equipment (SiC exchangers):
  const baseLcoh = heatSourceType === 'HTGR_NUCLEAR_REACTOR' ? 2.35 : 2.75;
  const efficiencyAdjustment = (48.0 - thermalEfficiencyPercent) * 0.03;
  const levelizedCostOfHydrogenUSDPerKg = Math.max(1.95, baseLcoh + efficiencyAdjustment);

  // Carbon avoidance (10 kg CO2/kg H2 baseline vs fossil SMR):
  const annualOperatingDays = heatSourceType === 'CONCENTRATED_SOLAR_TOWER' ? 330.0 : 350.0;
  const annualH2ProductionKg = dailyHydrogenProductionTons * 1000.0 * annualOperatingDays;
  const annualAvoidedCO2Tons = (annualH2ProductionKg * 10.0) / 1000.0;

  return {
    heatSourceType,
    peakHeatSourceTempC: sulfuricAcidDecompTempC,
    thermalEfficiencyPercent,
    bunsenReactionTempC: 120.0,
    sulfuricDecompTempC: sulfuricAcidDecompTempC,
    hiDecompTempC: 450.0,
    hourlyHydrogenProductionKg,
    dailyHydrogenProductionTons,
    levelizedCostOfHydrogenUSDPerKg,
    annualAvoidedCO2Tons,
    corrosionResistantAlloyMaterial: 'Gốm Silicon Carbide (SSiC) & Lớp Phủ Tantalum Chống Ăn Mòn Axit'
  };
}
