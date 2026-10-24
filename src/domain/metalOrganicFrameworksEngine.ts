// src/domain/metalOrganicFrameworksEngine.ts
// Domain Engine: Metal-Organic Frameworks (MOFs), Reticular Chemistry, Carbon Capture & H2 Storage
// Standards: IUPAC Gold Book, Pure & Applied Chemistry (Yaghi Reticular Chemistry) & Vietnam GDPT 2018 (Vật liệu xốp tiên tiến)

export interface MofProfile {
  id: string;
  chemicalFormula: string;
  nameVi: string;
  metalSbu: string; // Secondary Building Unit (e.g. "Zn4O tetrahedron", "Zr6O4(OH)4 octahedron")
  organicLinker: string; // e.g. "BDC (1,4-benzenedicarboxylate)", "BTC (1,3,5-benzenetricarboxylate)"
  betSurfaceAreaM2PerG: number; // m^2/g
  poreDiameterNm: number; // nm
  poreVolumeCm3PerG: number; // cm^3/g
  hydrothermalStability: 'LOW' | 'MODERATE' | 'EXCELLENT' | 'RECORD';
  co2CapacityMmolPerG: number; // at 298 K, 1 bar
  h2CapacityWeightPercent: number; // at 77 K, 100 bar
  isostericHeatQstKjPerMol: number; // kJ/mol
  industrialRoleVi: string;
}

export interface AdsorptionSimulationResult {
  mof: MofProfile;
  pressureBar: number;
  temperatureKelvin: number;
  co2UptakeMmolPerG: number;
  co2UptakeWeightPercent: number;
  h2UptakeWeightPercent: number;
  co2OverN2Selectivity: number; // Selectivity factor
  regenerationEnergyKjPerKgCo2: number;
  comparisonWithMeaAmineVi: string;
  applicationSummaryVi: string;
}

export interface WaterHarvestingResult {
  relativeHumidityPercent: number;
  dailyWaterYieldLitersPerKgMof: number;
  isDesorptionFeasibleWithSunlight: boolean;
  desertViabilityVi: string;
}

// ---------------------------------------------------------------------------
// 1. CANONICAL MOF RETICULAR CATALOG
// ---------------------------------------------------------------------------

export const MOF_CATALOG: Record<string, MofProfile> = {
  MOF_5: {
    id: 'MOF_5',
    chemicalFormula: 'Zn₄O(BDC)₃',
    nameVi: 'MOF-5 (Vật Liệu Khởi Nguồn Reticular Chemistry - Yaghi 1999)',
    metalSbu: 'Tứ diện Zn₄O',
    organicLinker: '1,4-Benzenedicarboxylate (BDC)',
    betSurfaceAreaM2PerG: 3800,
    poreDiameterNm: 1.2,
    poreVolumeCm3PerG: 1.55,
    hydrothermalStability: 'LOW', // Sensitive to ambient moisture
    co2CapacityMmolPerG: 2.1,
    h2CapacityWeightPercent: 7.1,
    isostericHeatQstKjPerMol: 19.5,
    industrialRoleVi: 'Cột mốc lịch sử mở ra kỷ nguyên mạng lưới phối trí xốp (Reticular Chemistry). Nhạy với hơi nước trong không khí.'
  },
  UIO_66: {
    id: 'UIO_66',
    chemicalFormula: 'Zr₆O₄(OH)₄(BDC)₆',
    nameVi: 'UiO-66 (Độ Bền Thủy Nhiệt Cực Hạn - Đại Học Oslo)',
    metalSbu: 'Bát diện cụm Zr₆O₄(OH)₄',
    organicLinker: '1,4-Benzenedicarboxylate (BDC)',
    betSurfaceAreaM2PerG: 1200,
    poreDiameterNm: 0.85,
    poreVolumeCm3PerG: 0.50,
    hydrothermalStability: 'RECORD', // Survives boiling water, acids, 500°C
    co2CapacityMmolPerG: 2.8,
    h2CapacityWeightPercent: 4.2,
    isostericHeatQstKjPerMol: 26.0,
    industrialRoleVi: 'Khung Zirconi siêu bền: chịu được nước sôi, axit đặc và nhiệt độ 500°C; lý tưởng cho xúc tác dị thể công nghiệp và xử lý nước thải.'
  },
  HKUST_1: {
    id: 'HKUST_1',
    chemicalFormula: 'Cu₃(BTC)₂',
    nameVi: 'HKUST-1 / MOF-199 (Tâm Kim Loại Đồng Hở - ĐH Khoa Học Kỹ Thuật Hồng Kông)',
    metalSbu: 'Cụm hai nhân đồng Cu₂(COO)₄ (Paddlewheel)',
    organicLinker: '1,3,5-Benzenetricarboxylate (BTC)',
    betSurfaceAreaM2PerG: 1850,
    poreDiameterNm: 0.90,
    poreVolumeCm3PerG: 0.75,
    hydrothermalStability: 'MODERATE',
    co2CapacityMmolPerG: 4.2,
    h2CapacityWeightPercent: 5.5,
    isostericHeatQstKjPerMol: 30.0,
    industrialRoleVi: 'Tâm Cu²⁺ phối trí chưa bão hòa (Open Metal Sites) tạo tương tác tĩnh điện mạnh hút khí CO₂ và lưu trữ khí thiên nhiên CH₄.'
  },
  MOF_74_MG: {
    id: 'MOF_74_MG',
    chemicalFormula: 'Mg₂(DOBDC)',
    nameVi: 'Mg-MOF-74 (Bẫy Khí Nhà Kính CO₂ Kỷ Lục Tại Áp Suất Thấp)',
    metalSbu: 'Chuỗi xoắn ốc Mg-O liên tục',
    organicLinker: '2,5-Dioxido-1,4-benzenedicarboxylate (DOBDC)',
    betSurfaceAreaM2PerG: 1520,
    poreDiameterNm: 1.1,
    poreVolumeCm3PerG: 0.60,
    hydrothermalStability: 'EXCELLENT',
    co2CapacityMmolPerG: 8.5, // Record high CO2 uptake at 1 bar!
    h2CapacityWeightPercent: 5.0,
    isostericHeatQstKjPerMol: 44.0,
    industrialRoleVi: 'Mật độ tâm Mg²⁺ hở cực cao, giữ kỷ lục thế giới về khả năng hấp phụ CO₂ ở áp suất thấp; ứng dụng khử khí thải nhà máy điện than.'
  },
  MOF_303: {
    id: 'MOF_303',
    chemicalFormula: 'Al(OH)(PZDC)',
    nameVi: 'MOF-303 (Máy Thu Nước Tinh Khiết Từ Không Khí Sa Mạc Khô Cằn)',
    metalSbu: 'Chuỗi que bát diện AlO₄(OH)₂',
    organicLinker: '1H-Pyrazole-3,5-dicarboxylate (PZDC)',
    betSurfaceAreaM2PerG: 1350,
    poreDiameterNm: 0.60,
    poreVolumeCm3PerG: 0.54,
    hydrothermalStability: 'EXCELLENT',
    co2CapacityMmolPerG: 1.9,
    h2CapacityWeightPercent: 3.5,
    isostericHeatQstKjPerMol: 22.0,
    industrialRoleVi: 'Bẫy phân tử nước từ không khí sa mạc có độ ẩm thấp < 20% RH, giải hấp ra nước uống sạch nhờ ánh sáng mặt trời tự nhiên.'
  }
};

// ---------------------------------------------------------------------------
// 2. DUAL-SITE LANGMUIR-FREUNDLICH ADSORPTION & REGENERATION
// ---------------------------------------------------------------------------

/**
 * Simulates gas adsorption isotherm (CO2, H2) in MOFs using Dual-Site Langmuir model
 * Calculates energy savings compared to conventional aqueous Monoethanolamine (MEA) scrubbing
 */
export function simulateMofAdsorption(
  mofId: string,
  pressureBar: number = 1.0, // 0.05 to 50 bar
  temperatureKelvin: number = 298 // 273 to 350 K
): AdsorptionSimulationResult {
  const mof = MOF_CATALOG[mofId] || MOF_CATALOG.MOF_74_MG;

  // Temperature effect on Henry constant / affinity (van 't Hoff relation):
  // b(T) = b0 * exp(Qst / (R * T))
  const R_GAS = 8.314e-3; // kJ/(mol.K)
  const tempFactor = Math.exp((mof.isostericHeatQstKjPerMol / R_GAS) * (1 / temperatureKelvin - 1 / 298));

  // Langmuir saturation capacity
  const qMaxCo2 = mof.co2CapacityMmolPerG * 1.35;
  const affinityB = (0.75 / 1.0) * tempFactor;

  // Langmuir isotherm: q = qMax * (b * P) / (1 + b * P)
  const co2UptakeMmol = (qMaxCo2 * (affinityB * pressureBar)) / (1 + affinityB * pressureBar);
  const co2UptakeMmolPerG = +Math.max(0.1, co2UptakeMmol).toFixed(2);

  // Convert mmol/g to wt% (M_CO2 = 44.01 g/mol):
  // wt% = mmol/g * 44.01 * 1e-3 * 100
  const co2UptakeWeightPercent = +(co2UptakeMmolPerG * 44.01 * 0.1).toFixed(1);

  // H2 storage capacity (cryo 77 K vs room temp)
  const h2TempPenalty = Math.exp(-0.012 * (temperatureKelvin - 77));
  const h2PressureFactor = Math.min(1.0, pressureBar / 60);
  const h2UptakeWeightPercent = +(mof.h2CapacityWeightPercent * h2TempPenalty * h2PressureFactor).toFixed(2);

  // CO2/N2 Selectivity factor (S = (q_CO2 / q_N2) * (P_N2 / P_CO2))
  // Flue gas typically 15% CO2, 85% N2
  const selectivity = +(15 + (mof.isostericHeatQstKjPerMol / 19.5) * 18).toFixed(1);

  // Regeneration energy: Conventional aqueous MEA (30% monoethanolamine) requires ~3600 - 4200 kJ/kg CO2
  // MOFs physisorption typically requires only 1100 - 1600 kJ/kg CO2 (saving > 60% parasitic energy!)
  const regenerationEnergyKjPerKgCo2 = +(1100 + (mof.isostericHeatQstKjPerMol - 19.5) * 22).toFixed(0);

  const energySavingsPercent = Math.round(((3800 - regenerationEnergyKjPerKgCo2) / 3800) * 100);

  const comparisonWithMeaAmineVi = `Tiết kiệm ${energySavingsPercent}% năng lượng giải hấp so với dung dịch amin lỏng (MEA: ~3,800 kJ/kg CO₂). Tái sinh hoàn toàn bằng chân không nhẹ hoặc nhiệt dư nhiệt độ thấp (< 80°C).`;

  const applicationSummaryVi = `Tại ${temperatureKelvin} K và áp suất ${pressureBar} bar, ${mof.nameVi} hấp phụ ${co2UptakeMmolPerG} mmol CO₂/g (${co2UptakeWeightPercent} wt%). Độ chọn lọc CO₂/N₂ đạt ${selectivity}.`;

  return {
    mof,
    pressureBar,
    temperatureKelvin,
    co2UptakeMmolPerG,
    co2UptakeWeightPercent,
    h2UptakeWeightPercent,
    co2OverN2Selectivity: selectivity,
    regenerationEnergyKjPerKgCo2,
    comparisonWithMeaAmineVi,
    applicationSummaryVi
  };
}

// ---------------------------------------------------------------------------
// 3. ATMOSPHERIC DESERT WATER HARVESTING (MOF-303)
// ---------------------------------------------------------------------------

/**
 * Simulates atmospheric drinking water extraction from low-humidity desert air
 * Omar Yaghi et al., Science 2018 / Nature Materials 2020 (MOF-303 water harvester)
 */
export function simulateAtmosphericWaterHarvesting(
  relativeHumidityPercent: number = 20, // 10% to 80% RH
  ambientTemperatureCelsius: number = 28 // 15 to 45 °C
): WaterHarvestingResult {
  // MOF-303 has an S-shaped water sorption isotherm with steep uptake starting at ~10-15% RH
  let dailyWaterYieldLiters = 0;

  if (relativeHumidityPercent < 10) {
    dailyWaterYieldLiters = 0.1;
  } else if (relativeHumidityPercent < 25) {
    // Steep uptake inflection window
    dailyWaterYieldLiters = 0.5 + ((relativeHumidityPercent - 10) / 15) * 1.5;
  } else {
    // Saturated cage filling
    dailyWaterYieldLiters = 2.0 + Math.min(1.5, ((relativeHumidityPercent - 25) / 55) * 1.5);
  }

  // Desorption temperature requires only 60 - 70°C, easily achieved with low-cost solar thermal collectors
  const isDesorptionFeasibleWithSunlight = ambientTemperatureCelsius + 35 >= 60;

  const desertViabilityVi = relativeHumidityPercent >= 15
    ? `KHẢ THI TUYỆT VỜI: Thu được ${dailyWaterYieldLiters.toFixed(2)} lít nước uống tinh khiết/kg MOF mỗi ngày trong điều kiện sa mạc (${relativeHumidityPercent}% RH). Giải hấp 100% bằng ánh sáng mặt trời không cần điện lưới.`
    : `ĐỘ ẨM QUÁ THẤP (< 15% RH): Năng suất thu nước bị giới hạn (${dailyWaterYieldLiters.toFixed(2)} L/kg). Cần tích lũy qua đêm khi độ ẩm tương đối tăng lên do nhiệt độ giảm.`;

  return {
    relativeHumidityPercent,
    dailyWaterYieldLitersPerKgMof: +dailyWaterYieldLiters.toFixed(2),
    isDesorptionFeasibleWithSunlight,
    desertViabilityVi
  };
}
