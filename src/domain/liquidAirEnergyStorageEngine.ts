// src/domain/liquidAirEnergyStorageEngine.ts
// Domain Engine: Liquid-Air Energy Storage (LAES) & Cryogenic Thermal Integration
// Standards: IUPAC Physical Chemistry, Cryogenic Thermodynamics, Claude Air Liquefaction Cycle, GDPT 2018 Physics & LDES Grid Balancing

export type LaesScaleType = 'COMMUNITY_MICROGRID' | 'REGIONAL_SUBSTATION' | 'UTILITY_GIGAWATT_HOUR';
export type CryoColdStorageMedia = 'PACKED_GRAVEL_BED' | 'PERLITE_HOLLOW_SPHERES' | 'CRYOGENIC_PHASE_CHANGE_FLUID';

export interface LaesScaleSpec {
  id: LaesScaleType;
  name: string;
  nominalDischargePowerMW: number;
  storageDurationHours: number;
  totalEnergyMWh: number;
  liquidAirTankVolumeM3: number; // Volume of liquid air at -194°C
  chargingCompressorPowerMW: number;
  vietnameseFeature: string;
}

export const LAES_SCALES: Record<LaesScaleType, LaesScaleSpec> = {
  COMMUNITY_MICROGRID: {
    id: 'COMMUNITY_MICROGRID',
    name: 'Quy Mô Vi Lưới Đô Thị (Community Microgrid)',
    nominalDischargePowerMW: 10.0,
    storageDurationHours: 8.0,
    totalEnergyMWh: 80.0,
    liquidAirTankVolumeM3: 450.0,
    chargingCompressorPowerMW: 16.0,
    vietnameseFeature: 'Trạm lưu trữ phân tán không phát thải, tích hợp làm mát trung tâm dữ liệu và cấp khí oxy y tế cho bệnh viện quận.'
  },
  REGIONAL_SUBSTATION: {
    id: 'REGIONAL_SUBSTATION',
    name: 'Trạm Biến Áp Khu Vực (Regional Substation Peak Shaving)',
    nominalDischargePowerMW: 50.0,
    storageDurationHours: 10.0,
    totalEnergyMWh: 500.0,
    liquidAirTankVolumeM3: 2800.0,
    chargingCompressorPowerMW: 80.0,
    vietnameseFeature: 'Giải tỏa công suất điện mặt trời và điện gió ngoài khơi quy mô lớn, thay thế cụm turbine khí chu trình hở (OCGT).'
  },
  UTILITY_GIGAWATT_HOUR: {
    id: 'UTILITY_GIGAWATT_HOUR',
    name: 'Đại Nhà Máy Lưới Điện Quốc Gia (Gigawatt-Hour Utility)',
    nominalDischargePowerMW: 100.0,
    storageDurationHours: 12.0,
    totalEnergyMWh: 1200.0,
    liquidAirTankVolumeM3: 6800.0,
    chargingCompressorPowerMW: 165.0,
    vietnameseFeature: 'Siêu dự trữ năng lượng đa ngày (LDES), hoạt động 35+ năm không suy giảm dung lượng, 100% sử dụng không khí tự nhiên.'
  }
};

export interface LaesCyclePerformanceResult {
  chargePowerMW: number;
  dischargePowerMW: number;
  storageDurationHours: number;
  roundTripEfficiencyPercent: number; // 55 - 65% with recycled cold
  liquidAirProductionRateKgPerSec: number;
  liquidAirDensityKgPerM3: number; // ~ 875 kg/m3 at 1 bar, -194°C
  expansionRatioLiquidToGas: number; // ~ 700x
  compressorDischargePressureBar: number; // 80 - 140 bar
  turbineInletPressureBar: number; // 120 - 180 bar
  coldStorageRecycleEffectivenessPercent: number; // 88 - 95%
  wasteHeatRecoveryTempC: number; // 180 - 240°C
}

export interface LaesEconomicsAndEmissionsResult {
  totalStoredEnergyMWh: number;
  capitalCostTotalMillionUSD: number;
  capitalCostPerKWhUSD: number; // typically $80 - $140/kWh
  levelizedCostOfStoragePerMWh: number; // $60 - $85/MWh
  calendarLifeYears: number; // 35+ years
  annualCyclesCount: number; // 365 cycles/yr
  annualAvoidedCO2Tons: number;
  criticalMaterialsMassKg: number; // Strictly 0 kg (no Li, Co, Ni)
  liquidAirExpansionPressurePotentialBar: number;
}

// Physical Constants
const LIQUID_AIR_DENSITY_KG_PER_M3 = 875.0; // at 79 K (-194°C)
const AMBIENT_AIR_DENSITY_KG_PER_M3 = 1.225; // at 20°C, 1 bar
const EXPANSION_RATIO_LIQUID_TO_GAS = Math.round(LIQUID_AIR_DENSITY_KG_PER_M3 / AMBIENT_AIR_DENSITY_KG_PER_M3); // ~ 714x
const LIQUID_AIR_SPECIFIC_ENERGY_KWH_PER_M3 = 180.0; // kWh/m3 thermal-mechanical equivalent

/**
 * 1. Simulates Thermodynamic Cycle Performance of LAES with Cold Thermal Energy Storage (CTES):
 */
export function calculateLaesCyclePerformance(
  scaleType: LaesScaleType = 'REGIONAL_SUBSTATION',
  coldRecycleEffectiveness: number = 0.92,
  includeWasteHeatReheat: boolean = true
): LaesCyclePerformanceResult {
  const spec = LAES_SCALES[scaleType];

  // Baseline unrecouped Claude cycle efficiency is low (~38-42%).
  // Recycled cold storage (CTES packed pebble bed) pre-cools incoming compressed air from ambient to -150°C,
  // drastically slashing compressor liquefaction work:
  const baselineEfficiency = 42.0;
  const coldRecycleBoost = (coldRecycleEffectiveness * 100.0 - 80.0) * 1.25;
  const heatReheatBoost = includeWasteHeatReheat ? 6.5 : 0.0;
  const roundTripEfficiencyPercent = Math.min(65.0, Math.max(50.0, baselineEfficiency + coldRecycleBoost + heatReheatBoost));

  // Liquid air flow rate during charging:
  // 1 MWh electrical output requires ~ 5.5 m3 of liquid air
  const liquidAirVolumeTotalM3 = spec.totalEnergyMWh * (1000.0 / LIQUID_AIR_SPECIFIC_ENERGY_KWH_PER_M3) * (58.0 / roundTripEfficiencyPercent);
  const totalMassLiquidAirKg = liquidAirVolumeTotalM3 * LIQUID_AIR_DENSITY_KG_PER_M3;
  const chargingHours = spec.storageDurationHours * 0.9;
  const liquidAirProductionRateKgPerSec = totalMassLiquidAirKg / (chargingHours * 3600.0);

  return {
    chargePowerMW: spec.chargingCompressorPowerMW,
    dischargePowerMW: spec.nominalDischargePowerMW,
    storageDurationHours: spec.storageDurationHours,
    roundTripEfficiencyPercent,
    liquidAirProductionRateKgPerSec,
    liquidAirDensityKgPerM3: LIQUID_AIR_DENSITY_KG_PER_M3,
    expansionRatioLiquidToGas: EXPANSION_RATIO_LIQUID_TO_GAS,
    compressorDischargePressureBar: 110.0,
    turbineInletPressureBar: 160.0,
    coldStorageRecycleEffectivenessPercent: coldRecycleEffectiveness * 100.0,
    wasteHeatRecoveryTempC: 220.0
  };
}

/**
 * 2. Simulates Economics, Lifecycle & Environmental Superiority of LAES vs Lithium-Ion BESS:
 */
export function calculateLaesEconomicsAndEmissions(
  scaleType: LaesScaleType = 'REGIONAL_SUBSTATION',
  roundTripEfficiencyPercent: number = 60.5
): LaesEconomicsAndEmissionsResult {
  const spec = LAES_SCALES[scaleType];

  // CapEx structure:
  // Power block (turbomachinery + compressor): ~$750/kW
  // Storage block (insulated cryo-tanks + packed pebble bed CTES): ~$35/kWh
  const powerBlockCostUSD = spec.nominalDischargePowerMW * 1000.0 * 750.0;
  const storageBlockCostUSD = spec.totalEnergyMWh * 1000.0 * 35.0;
  const balanceCostUSD = (powerBlockCostUSD + storageBlockCostUSD) * 0.18;
  const capitalCostTotalUSD = powerBlockCostUSD + storageBlockCostUSD + balanceCostUSD;
  const capitalCostTotalMillionUSD = capitalCostTotalUSD / 1_000_000.0;

  const capitalCostPerKWhUSD = capitalCostTotalUSD / (spec.totalEnergyMWh * 1000.0);

  // LCOS for 35-year life with 365 cycles/year:
  // LCOS = (CapEx * CRF + O&M) / Annual Energy Discharged + Electricity_Charge / RTE
  const annualEnergyMWh = spec.totalEnergyMWh * 365.0;
  const crf = 0.075; // Capital Recovery Factor (7.5% WACC)
  const annualFixedCostUSD = capitalCostTotalUSD * crf + capitalCostTotalUSD * 0.02; // 2% annual O&M
  const electricityChargeUSDPerMWh = 26.0; // Cheap curtailed off-peak solar/wind charging
  const chargingCostPerDischargeMWh = electricityChargeUSDPerMWh / (roundTripEfficiencyPercent / 100.0);
  const fixedCostPerDischargeMWh = annualFixedCostUSD / annualEnergyMWh;
  const levelizedCostOfStoragePerMWh = fixedCostPerDischargeMWh + chargingCostPerDischargeMWh;

  // Avoided carbon emissions (displacing natural gas peaking peakers @ 0.45 tons CO2/MWh):
  const annualAvoidedCO2Tons = annualEnergyMWh * 0.45;

  return {
    totalStoredEnergyMWh: spec.totalEnergyMWh,
    capitalCostTotalMillionUSD,
    capitalCostPerKWhUSD,
    levelizedCostOfStoragePerMWh,
    calendarLifeYears: 35,
    annualCyclesCount: 365,
    annualAvoidedCO2Tons,
    criticalMaterialsMassKg: 0.0, // 100% free of Lithium, Cobalt, Nickel
    liquidAirExpansionPressurePotentialBar: 180.0
  };
}
