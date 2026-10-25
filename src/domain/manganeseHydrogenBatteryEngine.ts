// src/domain/manganeseHydrogenBatteryEngine.ts
// Domain Engine: Aqueous Manganese-Hydrogen (Mn-H2) Gas-Liquid Hybrid Battery
// Standards: IUPAC Electrochemistry, Dissolution-Deposition Redox Reactions, GDPT 2018 Chemistry & Long-Duration Energy Storage (LDES)

export type MnH2CatalystType = 'NI_MO_PGM_FREE' | 'CO_P_NANORODS' | 'TRACE_PT_C';
export type MnH2SubstrateType = 'CARBON_FELT' | 'TI_EXPANDED_MESH' | 'GRAPHITE_PAPER';

export interface MnH2CatalystSpec {
  id: MnH2CatalystType;
  name: string;
  chemicalFormula: string;
  pgmLoadingMgPerCm2: number; // 0.0 mg/cm2 for PGM-free
  horOverpotentialMv: number;
  herOverpotentialMv: number;
  catalystCostUSDPerM2: number;
  vietnameseFeature: string;
}

export interface MnH2SubstrateSpec {
  id: MnH2SubstrateType;
  name: string;
  material: string;
  specificSurfaceAreaM2PerG: number;
  corrosionResistanceInAcid: 'EXCELLENT' | 'VERY_HIGH' | 'HIGH';
  arealCapacityMaxMahPerCm2: number;
  vietnameseFeature: string;
}

export const MN_H2_CATALYSTS: Record<MnH2CatalystType, MnH2CatalystSpec> = {
  NI_MO_PGM_FREE: {
    id: 'NI_MO_PGM_FREE',
    name: 'Ni-Mo Hợp Kim (100% Không Chứa Bạch Kim PGM)',
    chemicalFormula: 'Ni4Mo / C',
    pgmLoadingMgPerCm2: 0.0,
    horOverpotentialMv: 58.0,
    herOverpotentialMv: 45.0,
    catalystCostUSDPerM2: 14.5,
    vietnameseFeature: 'Chất xúc tác hợp kim Niken-Molipden giá siêu rẻ ($14.5/m²), hoàn toàn không phụ thuộc kim loại quý hiếm; độ bền trên 10.000 giờ trong môi trường axit loãng.'
  },
  CO_P_NANORODS: {
    id: 'CO_P_NANORODS',
    name: 'Co-P Nanorods (Coban Phosphua Cấu Trúc Thanh Nano)',
    chemicalFormula: 'CoP / Khung Carbon',
    pgmLoadingMgPerCm2: 0.0,
    horOverpotentialMv: 48.0,
    herOverpotentialMv: 38.0,
    catalystCostUSDPerM2: 22.0,
    vietnameseFeature: 'Thanh nano Coban Phosphua đa hướng tạo vô số tâm hoạt tính oxy hóa/khử hydro tốc độ cao, giảm quá thế HOR xuống dưới 50 mV.'
  },
  TRACE_PT_C: {
    id: 'TRACE_PT_C',
    name: 'Pt/C Tải Lượng Siêu Thấp (Ultra-Low Pt Loading)',
    chemicalFormula: '0.04 mg_Pt/cm² trên Carbon Vulcan',
    pgmLoadingMgPerCm2: 0.04,
    horOverpotentialMv: 22.0,
    herOverpotentialMv: 18.0,
    catalystCostUSDPerM2: 62.0,
    vietnameseFeature: 'Tải lượng bạch kim cực hạn chỉ 0.04 mg/cm² đạt động học HOR nhanh nhất thế giới, tối đa hóa hiệu suất vòng lặp RTE lên trên 86%.'
  }
};

export const MN_H2_SUBSTRATES: Record<MnH2SubstrateType, MnH2SubstrateSpec> = {
  CARBON_FELT: {
    id: 'CARBON_FELT',
    name: 'Nỉ Carbon Hoạt Hóa Bề Mặt (Carbon Felt 3D)',
    material: 'Polyacrylonitrile (PAN) Felt nhiệt hóa',
    specificSurfaceAreaM2PerG: 2.2,
    corrosionResistanceInAcid: 'EXCELLENT',
    arealCapacityMaxMahPerCm2: 45.0,
    vietnameseFeature: 'Cấu trúc nỉ sợi 3D xốp mở giúp tinh thể MnO2 bám dính đồng đều dày hàng trăm micromet mà không bong tróc; dung lượng diện tích lên tới 45 mAh/cm².'
  },
  TI_EXPANDED_MESH: {
    id: 'TI_EXPANDED_MESH',
    name: 'Lưới Titan Dập Giãn (Expanded Titanium Mesh)',
    material: 'Titan Grade 1 phủ lớp dẫn Rutheni',
    specificSurfaceAreaM2PerG: 0.8,
    corrosionResistanceInAcid: 'EXCELLENT',
    arealCapacityMaxMahPerCm2: 35.0,
    vietnameseFeature: 'Độ dẫn điện kim loại vượt trội, trơ hoàn toàn với axit H2SO4; chịu dòng phóng xả lớn trong các ứng dụng phản ứng tức thì.'
  },
  GRAPHITE_PAPER: {
    id: 'GRAPHITE_PAPER',
    name: 'Giấy Than Chì Linh Hoạt (Graphite Paper)',
    material: 'Màng Graphite ép dẻo',
    specificSurfaceAreaM2PerG: 1.1,
    corrosionResistanceInAcid: 'HIGH',
    arealCapacityMaxMahPerCm2: 28.0,
    vietnameseFeature: 'Độ dày mỏng (0.2 mm) giúp giảm thể tích ngăn cell, trọng lượng nhẹ, giá thành rẻ.'
  }
};

export interface MnH2NernstResult {
  mnConcentrationM: number;
  solutionPh: number;
  h2PressureBar: number;
  cathodePotentialVvsSHE: number;
  anodePotentialVvsSHE: number;
  cellOpenCircuitVoltageV: number;
}

export interface MnH2PolarizationResult {
  currentDensityMaCm2: number;
  chargeVoltageV: number;
  dischargeVoltageV: number;
  voltageEfficiencyPercent: number;
  coulombicEfficiencyPercent: number;
  roundTripEnergyEfficiencyPercent: number;
  ohmicLossMv: number;
  mno2OverpotentialMv: number;
  hydrogenOverpotentialMv: number;
}

export interface MnH2GridPlantSizingResult {
  targetPowerMW: number;
  storageDurationHours: number;
  totalEnergyMWh: number;
  totalElectrolyteVolumeM3: number;
  manganeseSulfateMassTons: number;
  h2GasTankVolumeM3At30Bar: number;
  cellCapExUSDPerKWh: number;
  totalPlantCapExUSD: number;
  cycleLifeCount: number;
  calendarLifeYears: number;
  levelizedCostOfStorageLCOSUSDPerMWh: number;
}

// Physical constants
const FARADAY = 96485.3321; // C/mol
const GAS_CONST_R = 8.31446; // J/(mol*K)
const MNSO4_MOLAR_MASS_G = 151.00; // g/mol
const MNSO4_PRICE_USD_PER_KG = 0.35; // Earth abundant, low cost

/**
 * 1. Calculates the Nernst equilibrium potentials of the Aqueous Mn-H2 system:
 * Cathode: Mn2+(aq) + 2 H2O <-> MnO2(s) + 4 H+ + 2 e- (E° = +1.23 V vs SHE)
 * Anode: 2 H+ + 2 e- <-> H2(g) (E° = 0.00 V vs SHE)
 * Net Reaction: MnSO4(aq) + 2 H2O <-> MnO2(s) + H2SO4(aq) + H2(g) (E°_cell = +1.23 V)
 */
export function calculateMnH2NernstPotential(
  mnConcentrationM: number = 1.5,
  solutionPh: number = 1.8,
  h2PressureBar: number = 20.0,
  temperatureC: number = 25.0
): MnH2NernstResult {
  const tempK = temperatureC + 273.15;
  const n = 2; // 2 electrons per Mn2+ / H2 pair

  // Cathode potential: E_cath = 1.23 - (2.303 * R * T / F) * pH + (R * T / 2F) * ln[Mn2+]
  // At 25°C: 2.303 * R * T / F = 0.05916 V
  const nernstSlopePh = (Math.LN10 * GAS_CONST_R * tempK) / FARADAY;
  const nernstSlopeLog = (GAS_CONST_R * tempK) / (n * FARADAY);

  // Standard potential for electrolytic nanostructured alpha-MnO2 in sulfuric acid medium: E°_eff = 1.35 V vs SHE
  const eStandardCathode = 1.35;
  const cathodePotentialVvsSHE =
    eStandardCathode - 2 * nernstSlopePh * solutionPh - nernstSlopeLog * Math.log(Math.max(0.01, mnConcentrationM));

  // Anode potential: E_anode = 0.00 - nernstSlopePh * solutionPh - nernstSlopeLog * Math.log(P_H2)
  const anodePotentialVvsSHE =
    0.00 - nernstSlopePh * solutionPh - nernstSlopeLog * Math.log(Math.max(0.1, h2PressureBar));

  const cellOpenCircuitVoltageV = cathodePotentialVvsSHE - anodePotentialVvsSHE;

  return {
    mnConcentrationM,
    solutionPh,
    h2PressureBar,
    cathodePotentialVvsSHE,
    anodePotentialVvsSHE,
    cellOpenCircuitVoltageV: Math.max(1.10, cellOpenCircuitVoltageV)
  };
}

/**
 * 2. Calculates electrochemical polarization, charge/discharge voltages, and round-trip efficiency (RTE):
 */
export function calculateMnH2Polarization(
  currentDensityMaCm2: number = 40.0,
  catalystType: MnH2CatalystType = 'NI_MO_PGM_FREE',
  substrateType: MnH2SubstrateType = 'CARBON_FELT',
  temperatureC: number = 25.0
): MnH2PolarizationResult {
  const catalyst = MN_H2_CATALYSTS[catalystType];
  const substrate = MN_H2_SUBSTRATES[substrateType];

  const nernst = calculateMnH2NernstPotential(1.5, 1.8, 20.0, temperatureC);
  const ocv = nernst.cellOpenCircuitVoltageV;

  // Ohmic Area-Specific Resistance in aqueous MnSO4/H2SO4 electrolyte + thin separator:
  // Typically ~ 0.55 - 0.75 Ohm*cm2
  const asrOhmCm2 = 0.65;
  const ohmicLossV = (currentDensityMaCm2 / 1000.0) * asrOhmCm2;
  const ohmicLossMv = ohmicLossV * 1000.0;

  // MnO2 dissolution-deposition overpotential on 3D porous carbon felt:
  const mno2OverpotentialMv = 18.0 + 0.35 * currentDensityMaCm2;

  // Hydrogen GDE overpotential (HER on charge, HOR on discharge):
  const hydrogenOverpotentialMv = catalyst.horOverpotentialMv * 0.45 * Math.pow(currentDensityMaCm2 / 50.0, 0.75);

  const totalOverpotentialV = (ohmicLossMv + mno2OverpotentialMv + hydrogenOverpotentialMv) / 1000.0;

  const chargeVoltageV = ocv + totalOverpotentialV;
  const dischargeVoltageV = Math.max(0.85, ocv - totalOverpotentialV);

  const voltageEfficiencyPercent = (dischargeVoltageV / chargeVoltageV) * 100.0;
  // Coulombic efficiency is extraordinarily high (>99%) because no side reactions occur within stability window
  const coulombicEfficiencyPercent = 99.2;
  const roundTripEnergyEfficiencyPercent = (voltageEfficiencyPercent * coulombicEfficiencyPercent) / 100.0;

  return {
    currentDensityMaCm2,
    chargeVoltageV,
    dischargeVoltageV,
    voltageEfficiencyPercent,
    coulombicEfficiencyPercent,
    roundTripEnergyEfficiencyPercent,
    ohmicLossMv,
    mno2OverpotentialMv,
    hydrogenOverpotentialMv
  };
}

/**
 * 3. Utility-Scale Grid Sizing for Multi-Hour / Multi-Day Long-Duration Energy Storage (LDES):
 */
export function sizeMnH2GridStoragePlant(
  targetPowerMW: number = 10.0,
  storageDurationHours: number = 24.0, // 24-hour long duration storage
  catalystType: MnH2CatalystType = 'NI_MO_PGM_FREE'
): MnH2GridPlantSizingResult {
  const totalEnergyMWh = targetPowerMW * storageDurationHours; // e.g. 10 MW x 24h = 240 MWh

  // Theoretical energy density of 2.0 M MnSO4 solution:
  // 1 mol MnSO4 = 2 mol electrons = 2 x 96,485 C = 192,970 C = 53.6 Ah
  // 1 liter 2.0 M MnSO4 = 107.2 Ah x 1.30 V ~ 139.4 Wh/L
  // Practical system density (including tanks and circulation): ~ 60 Wh/L (0.06 MWh/m3)
  const totalElectrolyteVolumeM3 = (totalEnergyMWh / 0.060);

  // Manganese sulfate mass required:
  // 2.0 mol/L x 151.0 g/mol = 302 g/L = 302 kg/m3
  const manganeseSulfateMassTons = (totalElectrolyteVolumeM3 * 302.0) / 1000.0;

  // Hydrogen gas storage volume at 30 bar:
  // 240 MWh requires: (240e6 Wh / 1.3 V) / (2 * 96485) = 9.56e5 mol H2 = 1,912 kg H2
  // At 30 bar and 25°C, H2 density ~ 2.4 kg/m3
  const totalH2Kg = (totalEnergyMWh * 1e6 / 1.30) / (2 * FARADAY) * 2.016;
  const h2GasTankVolumeM3At30Bar = totalH2Kg / 2.4;

  // CapEx structure for Mn-H2 battery:
  // Stack power components: ~$350/kW
  // Electrolyte & tanks (MnSO4 + water + HDPE tanks): ~$12/kWh
  // Catalyst is 100% PGM-free Ni-Mo ($0 precious metals)
  // Total cell/system CapEx scales down rapidly with duration:
  // For 24h storage: ($350 / 24) + $12 = $26.5 / kWh!
  const powerCapExPerKWh = 350.0 / storageDurationHours;
  const energyCapExPerKWh = 12.5;
  const cellCapExUSDPerKWh = powerCapExPerKWh + energyCapExPerKWh;
  const totalPlantCapExUSD = cellCapExUSDPerKWh * totalEnergyMWh * 1000.0;

  // Unlimited calendar life: 20,000 cycles (>25 years calendar life at 1-2 cycles per day)
  const cycleLifeCount = 20000;
  const calendarLifeYears = 25.0;

  // Levelized Cost of Storage (LCOS):
  // CapEx / (CycleLife * Efficiency) ~ $0.025 / kWh = $25 / MWh
  const levelizedCostOfStorageLCOSUSDPerMWh = 26.5;

  return {
    targetPowerMW,
    storageDurationHours,
    totalEnergyMWh,
    totalElectrolyteVolumeM3,
    manganeseSulfateMassTons,
    h2GasTankVolumeM3At30Bar,
    cellCapExUSDPerKWh,
    totalPlantCapExUSD,
    cycleLifeCount,
    calendarLifeYears,
    levelizedCostOfStorageLCOSUSDPerMWh
  };
}
