/**
 * ELEMENTA - GEOTHERMAL THERMOCHEMICAL BRINE & DIRECT MINERAL EXTRACTION ENGINE
 *
 * Conforms to:
 * - Geothermal Energy Association (GEA) & International Geothermal Association (IGA) Engineering Standards
 * - Direct Lithium Extraction (DLE) using Nanoporous Sorbents (Lithium Titanate Li2TiO3, Manganese Oxide)
 * - Flash Steam & Binary Organic Rankine Cycle (ORC with isopentane/isobutane) Thermodynamics
 * - Amorphous Silica (SiO2) Solubility Equilibrium & Anti-scaling Kinetics: log(C_sat) = 4.52 - 731/T(K)
 * - Multi-Effect Distillation (MED) Desalination coupled to low-enthalpy reject brine (90-120°C)
 * - Vietnam GDPT 2018 Chemistry & Physics (Nhiệt hóa học, Cân bằng hòa tan, Chiết xuất khoáng sản, Năng lượng địa nhiệt)
 */

export type GeothermalCycleType = 'SINGLE_FLASH' | 'DOUBLE_FLASH' | 'BINARY_ORC' | 'COMBINED_FLASH_BINARY';

export type GeothermalSiteId =
  | 'SALTON_SEA_USA'
  | 'UPPER_RHINE_GERMANY'
  | 'BINH_CHAU_VIETNAM'
  | 'KRAFLA_ICELAND'
  | 'WAIRAKEI_NEW_ZEALAND';

export interface GeothermalReservoirSite {
  id: GeothermalSiteId;
  name: string;
  country: string;
  temperatureC: number;                // Reservoir bottom-hole temperature °C
  wellDepthM: number;                  // Average production well depth in meters
  typicalFlowRateKgPerSec: number;     // Production flow rate per well cluster in kg/s
  tdsPpm: number;                      // Total Dissolved Solids in mg/L (ppm)
  lithiumPpm: number;                  // Li+ concentration in mg/L
  rubidiumPpm: number;                 // Rb+ concentration in mg/L
  cesiumPpm: number;                   // Cs+ concentration in mg/L
  silicaPpm: number;                   // SiO2 dissolved silica in mg/L
  potassiumPpm: number;               // K+ in mg/L
  description: string;
}

export interface GeothermalPowerOutput {
  grossPowerMWe: number;
  parasiticPumpingPowerMWe: number;
  netExportPowerMWe: number;
  thermalPowerAvailableMWth: number;   // Low-grade reject heat (90-120°C) available for DLE & MED
  carnotEfficiencyPct: number;
  netCycleEfficiencyPct: number;
  brineExitTemperatureC: number;
}

export interface DirectLithiumExtractionYield {
  annualLithiumMetalTons: number;
  annualLceMetricTons: number;         // Lithium Carbonate Equivalent (Li2CO3) in metric tons/year
  annualLiOhMonohydrateTons: number;   // LiOH·H2O battery grade in metric tons/year
  equivalentEvBatteriesCount: number;  // At 55 kg LCE per 75 kWh EV pack
  co2EmissionsIntensityKgPerKgLi: number; // vs ~15 kg CO2 for spodumene hard-rock mining
  waterRecirculationEfficiencyPct: number; // Closed-loop reinjection > 98%
  annualRubidiumKg: number;
  annualCesiumKg: number;
}

export interface GeothermalDesalinationYield {
  freshwaterDailyM3: number;
  freshwaterAnnualM3: number;
  productWaterTdsPpm: number;          // Demineralized water < 10 ppm
  specificThermalEnergyKwhPerM3: number;
  coolingDutyAvoidedMWth: number;
}

export interface SilicaScalingRiskAssessment {
  silicaSaturationIndex: number;       // SSI = C_actual / C_equilibrium (SSI > 1.0 = supersaturated)
  equilibriumSilicaSolubilityPpm: number;
  scalingRiskCategory: 'SAFE_SUBSATURATED' | 'MODERATE_METASTABLE' | 'SEVERE_SCALING_HAZARD';
  mitigationAction: string;
  recommendedAcidDosingPpm: number;    // HCl / H2SO4 to adjust pH to 4.5-5.0
}

export const GEOTHERMAL_SITES_CATALOG: Record<GeothermalSiteId, GeothermalReservoirSite> = {
  SALTON_SEA_USA: {
    id: 'SALTON_SEA_USA',
    name: 'Bồn Địa Salton Sea (California, Hoa Kỳ)',
    country: 'Hoa Kỳ',
    temperatureC: 290,
    wellDepthM: 2500,
    typicalFlowRateKgPerSec: 450,
    tdsPpm: 260000, // Extremely hyper-saline brine
    lithiumPpm: 240, // Richest geothermal lithium brine on Earth
    rubidiumPpm: 110,
    cesiumPpm: 20,
    silicaPpm: 550,
    potassiumPpm: 18000,
    description: 'Thung lũng Lithium thế kỷ 21. Nước muối địa nhiệt siêu mặn nhiệt độ 290°C với trữ lượng Li+ lên tới 240 mg/L, đủ cung ứng pin lithium cho toàn bộ ngành xe điện Bắc Mỹ trong nhiều thập kỷ.'
  },
  UPPER_RHINE_GERMANY: {
    id: 'UPPER_RHINE_GERMANY',
    name: 'Địa Hào Thượng Rhine (Upper Rhine Graben, Đức/Pháp)',
    country: 'Đức / Pháp',
    temperatureC: 165,
    wellDepthM: 3200,
    typicalFlowRateKgPerSec: 120,
    tdsPpm: 110000,
    lithiumPpm: 180,
    rubidiumPpm: 35,
    cesiumPpm: 8,
    silicaPpm: 320,
    potassiumPpm: 5200,
    description: 'Trái tim địa nhiệt châu Âu. Cụm nhà máy điện chu trình nhị phân (Binary ORC) khai thác năng lượng không phát thải carbon kết hợp trạm chiết xuất lithium trực tiếp (DLE) cung ứng cho Gigafactory.'
  },
  BINH_CHAU_VIETNAM: {
    id: 'BINH_CHAU_VIETNAM',
    name: 'Mỏ Địa Nhiệt Bình Châu (Bà Rịa - Vũng Tàu, Việt Nam)',
    country: 'Việt Nam',
    temperatureC: 135,
    wellDepthM: 1800,
    typicalFlowRateKgPerSec: 75,
    tdsPpm: 22000,
    lithiumPpm: 45,
    rubidiumPpm: 18,
    cesiumPpm: 3,
    silicaPpm: 210,
    potassiumPpm: 1400,
    description: 'Nguồn khoáng nóng địa nhiệt điển hình duyên hải Nam Bộ Việt Nam. Tiềm năng kép phát triển điện địa nhiệt chu trình nhị phân nhiệt độ thấp, chiết xuất muối khoáng vi lượng và khử mặn nước cấp sinh hoạt.'
  },
  KRAFLA_ICELAND: {
    id: 'KRAFLA_ICELAND',
    name: 'Tổ Hợp Núi Lửa Krafla (Iceland)',
    country: 'Iceland',
    temperatureC: 310,
    wellDepthM: 2100,
    typicalFlowRateKgPerSec: 320,
    tdsPpm: 1800, // Very low salinity volcanic steam
    lithiumPpm: 8,
    rubidiumPpm: 4,
    cesiumPpm: 1,
    silicaPpm: 680,
    potassiumPpm: 120,
    description: 'Hệ thống địa nhiệt hơi khô núi lửa với nhiệt độ siêu nóng trên 300°C. Siêu hiệu suất phát điện hơi quá nhiệt (Flash Steam) và cấp nhiệt sưởi ấm vùng cực, nồng độ silica cao đòi hỏi kiểm soát đóng cặn chặt chẽ.'
  },
  WAIRAKEI_NEW_ZEALAND: {
    id: 'WAIRAKEI_NEW_ZEALAND',
    name: 'Khu Vực Địa Nhiệt Wairakei (New Zealand)',
    country: 'New Zealand',
    temperatureC: 245,
    wellDepthM: 2000,
    typicalFlowRateKgPerSec: 280,
    tdsPpm: 4500,
    lithiumPpm: 14,
    rubidiumPpm: 12,
    cesiumPpm: 4,
    silicaPpm: 580,
    potassiumPpm: 220,
    description: 'Nhà máy điện địa nhiệt thương mại hóa đầu tiên trên thế giới (vận hành từ 1958). Tiên phong kết hợp tháp chớp hơi nhiều cấp và tái tuần hoàn 100% dung dịch địa nhiệt vào lòng đất.'
  }
};

/**
 * Calculates amorphous silica equilibrium solubility at temperature T (Kelvin):
 * log10(C_sat, ppm) = 4.52 - (731 / T_Kelvin)
 * Fournie & Marshall (1982) Standard Geothermal Solubility Relation.
 */
export function calculateSilicaSolubilityPpm(temperatureC: number): number {
  const tKelvin = temperatureC + 273.15;
  const logC = 4.52 - (731 / tKelvin);
  const cSatPpm = Math.pow(10, logC);
  return Number(cSatPpm.toFixed(1));
}

/**
 * Evaluates silica precipitation and pipe clogging risk upon brine cooling.
 */
export function evaluateSilicaScalingRisk(
  silicaConcentrationPpm: number,
  exitTemperatureC: number,
  brinePh: number = 7.0
): SilicaScalingRiskAssessment {
  const cSat = calculateSilicaSolubilityPpm(exitTemperatureC);
  const ssi = silicaConcentrationPpm / cSat;

  let category: 'SAFE_SUBSATURATED' | 'MODERATE_METASTABLE' | 'SEVERE_SCALING_HAZARD' = 'SAFE_SUBSATURATED';
  let mitigation = '';
  let acidDosingPpm = 0;

  if (ssi < 1.0) {
    category = 'SAFE_SUBSATURATED';
    mitigation = 'An toàn tuyệt đối: Dung dịch chưa bão hòa silica, không có nguy cơ đóng cặn đường ống và giếng bơm ép hoàn lưu.';
    acidDosingPpm = 0;
  } else if (ssi <= 1.4) {
    category = 'MODERATE_METASTABLE';
    mitigation = 'Vùng siêu bão hòa giả bền: Có thể xuất hiện mầm hạt keo silica sau 1-2 giờ. Khuyến nghị bơm chất phân tán polymer hoặc duy trì nhiệt độ xả > 85°C.';
    acidDosingPpm = 15;
  } else {
    category = 'SEVERE_SCALING_HAZARD';
    mitigation = 'Nguy cơ đóng cặn trầm trọng (SSI > 1.4): Silica polymer hóa tự phát gây nghẹt đường ống và lỗ rỗng vỉa chứa. Cần châm axit điều chỉnh pH xuống 4.8 - 5.0 để làm chậm động học kết tủa.';
    acidDosingPpm = Math.round((ssi - 1.2) * 40);
  }

  return {
    silicaSaturationIndex: Number(ssi.toFixed(2)),
    equilibriumSilicaSolubilityPpm: cSat,
    scalingRiskCategory: category,
    mitigationAction: mitigation,
    recommendedAcidDosingPpm: acidDosingPpm
  };
}

/**
 * Calculates Thermodynamic Geothermal Power and Heat Balance
 */
export function calculateGeothermalPower(
  flowRateKgPerSec: number,
  reservoirTempC: number,
  cycleType: GeothermalCycleType = 'BINARY_ORC',
  ambientTempC: number = 25
): GeothermalPowerOutput {
  const safeFlow = Math.max(1, flowRateKgPerSec);
  const safeTemp = Math.max(80, Math.min(350, reservoirTempC));
  const tResK = safeTemp + 273.15;
  const tAmbK = ambientTempC + 273.15;

  // Carnot ceiling
  const carnotEfficiency = (tResK - tAmbK) / tResK;

  // Approximate specific brine enthalpy h = c_p * (T - T_ref) where c_p ~ 4.18 kJ/(kg*K)
  const deltaT = safeTemp - ambientTempC;
  const totalThermalPowerMWth = (safeFlow * 4.184 * deltaT) / 1000;

  let grossThermalToElectricEff = 0;
  let exitTempC = 70;

  switch (cycleType) {
    case 'SINGLE_FLASH':
      grossThermalToElectricEff = Math.min(0.20, carnotEfficiency * 0.45);
      exitTempC = Math.max(100, safeTemp * 0.45);
      break;
    case 'DOUBLE_FLASH':
      grossThermalToElectricEff = Math.min(0.24, carnotEfficiency * 0.55);
      exitTempC = Math.max(90, safeTemp * 0.40);
      break;
    case 'BINARY_ORC':
      // Binary Organic Rankine Cycle is optimal for moderate temps (100 - 200°C)
      grossThermalToElectricEff = Math.min(0.18, carnotEfficiency * 0.50);
      exitTempC = Math.max(65, safeTemp * 0.42);
      break;
    case 'COMBINED_FLASH_BINARY':
      grossThermalToElectricEff = Math.min(0.26, carnotEfficiency * 0.60);
      exitTempC = Math.max(60, safeTemp * 0.35);
      break;
  }

  const grossPowerMWe = totalThermalPowerMWth * grossThermalToElectricEff;

  // Parasitic pumping power: deep well lift + reinjection pump ~ 10-15% of gross
  const parasiticPowerMWe = grossPowerMWe * 0.12;
  const netPowerMWe = Math.max(0, grossPowerMWe - parasiticPowerMWe);

  // Available low-grade heat in reject brine (between exitTemp and 45°C reinjection)
  const heatDeltaT = Math.max(0, exitTempC - 45);
  const rejectHeatAvailableMWth = (safeFlow * 4.184 * heatDeltaT) / 1000;

  return {
    grossPowerMWe: Number(grossPowerMWe.toFixed(2)),
    parasiticPumpingPowerMWe: Number(parasiticPowerMWe.toFixed(2)),
    netExportPowerMWe: Number(netPowerMWe.toFixed(2)),
    thermalPowerAvailableMWth: Number(rejectHeatAvailableMWth.toFixed(2)),
    carnotEfficiencyPct: Number((carnotEfficiency * 100).toFixed(1)),
    netCycleEfficiencyPct: Number(((netPowerMWe / totalThermalPowerMWth) * 100).toFixed(2)),
    brineExitTemperatureC: Math.round(exitTempC)
  };
}

/**
 * Direct Lithium Extraction (DLE) & Trace Strategic Minerals Recovery
 */
export function calculateDirectMineralExtraction(
  flowRateKgPerSec: number,
  lithiumPpm: number,
  rubidiumPpm: number = 0,
  cesiumPpm: number = 0,
  dleRecoveryEfficiencyPct: number = 90.0,
  operatingHoursPerYear: number = 8000
): DirectLithiumExtractionYield {
  const safeFlow = Math.max(1, flowRateKgPerSec);
  const safeLiPpm = Math.max(0, lithiumPpm);
  const safeDleEff = Math.max(10, Math.min(99, dleRecoveryEfficiencyPct)) / 100;

  // Brine mass processed per year in metric tons: (kg/s * 3600 * hours) / 1000
  const annualBrineProcessedTons = (safeFlow * 3600 * operatingHoursPerYear) / 1000;
  // Convert brine mass to m³ assuming density ~1.10 kg/L = 1.10 tons/m³
  const annualBrineVolumeM3 = annualBrineProcessedTons / 1.10;

  // Mass of dissolved Li+ in kg/year: (Volume in m³ * Li ppm in g/m³) / 1000 = Volume * ppm * 1e-3
  // Since 1 mg/L = 1 g/m³
  const rawLithiumExtractedKg = (annualBrineVolumeM3 * safeLiPpm * 1e-3) * safeDleEff;
  const annualLithiumMetalTons = rawLithiumExtractedKg / 1000;

  // Conversion factors:
  // Li2CO3 (M = 73.89 g/mol, 2 Li = 13.88 g) -> factor = 73.89 / 13.88 = 5.3235
  const annualLceTons = annualLithiumMetalTons * 5.324;

  // Battery-grade LiOH·H2O (M = 41.96 g/mol, 1 Li = 6.94 g) -> factor = 41.96 / 6.94 = 6.046
  const annualLiOhTons = annualLithiumMetalTons * 6.046;

  // Typical 75 kWh EV battery pack (e.g. Tesla Model 3 / VinFast VF8) uses ~55 kg LCE
  const equivalentBatteries = Math.round((annualLceTons * 1000) / 55);

  // By-products Rubidium & Cesium (at 75% recovery efficiency)
  const annualRbKg = (annualBrineVolumeM3 * rubidiumPpm * 1e-3) * 0.75;
  const annualCsKg = (annualBrineVolumeM3 * cesiumPpm * 1e-3) * 0.75;

  return {
    annualLithiumMetalTons: Number(annualLithiumMetalTons.toFixed(2)),
    annualLceMetricTons: Number(annualLceTons.toFixed(1)),
    annualLiOhMonohydrateTons: Number(annualLiOhTons.toFixed(1)),
    equivalentEvBatteriesCount: equivalentBatteries,
    co2EmissionsIntensityKgPerKgLi: 0.35, // DLE geothermal produces almost zero CO2 vs 15.0 kg for hard rock mining
    waterRecirculationEfficiencyPct: 98.5, // 98.5% of water is reinjected deep underground
    annualRubidiumKg: Number(annualRbKg.toFixed(1)),
    annualCesiumKg: Number(annualCsKg.toFixed(1))
  };
}

/**
 * Multi-Effect Desalination (MED) from low-enthalpy reject geothermal brine
 */
export function calculateGeothermalDesalination(
  thermalPowerAvailableMWth: number,
  medGainOutputRatioGor: number = 8.5
): GeothermalDesalinationYield {
  const safeHeat = Math.max(0.1, thermalPowerAvailableMWth);
  // Latent heat of water vaporization h_fg ~ 2320 kJ/kg = 0.644 kWh/kg
  // GOR (Gain Output Ratio) = kg of freshwater produced per kg of steam input
  // Freshwater rate (kg/s) = (MWth * 1000 kJ/s * GOR) / 2320 kJ/kg
  const freshwaterKgPerSec = (safeHeat * 1000 * medGainOutputRatioGor) / 2320;
  
  const dailyM3 = (freshwaterKgPerSec * 86400) / 1000;
  const annualM3 = dailyM3 * 365;

  // Specific thermal energy: MWth / (m³/hour)
  const hourlyM3 = dailyM3 / 24;
  const specificThermalEnergy = (safeHeat * 1000) / hourlyM3; // kWh / m³

  return {
    freshwaterDailyM3: Math.round(dailyM3),
    freshwaterAnnualM3: Math.round(annualM3),
    productWaterTdsPpm: 5.0, // High-purity distillate for green H2 electrolyzers
    specificThermalEnergyKwhPerM3: Number(specificThermalEnergy.toFixed(1)),
    coolingDutyAvoidedMWth: Number((safeHeat * 0.85).toFixed(2))
  };
}

/**
 * Mining Carbon & Environmental Impact Benchmark Comparison
 */
export interface LithiumMiningMethodBenchmark {
  methodName: string;
  co2EmissionsKgPerKgLiOH: number;
  waterConsumedM3PerTonLce: number;
  landUseM2PerTonLce: number;
  extractionCycleTime: string;
  recoveryYieldPct: number;
  description: string;
}

export const LITHIUM_MINING_BENCHMARKS: LithiumMiningMethodBenchmark[] = [
  {
    methodName: 'Chiết Xuất Địa Nhiệt Trực Tiếp (Geothermal DLE)',
    co2EmissionsKgPerKgLiOH: 0.35, // Virtually zero carbon
    waterConsumedM3PerTonLce: 4.5, // Closed loop reinjection
    landUseM2PerTonLce: 15.0,
    extractionCycleTime: '90 phút (1.5 giờ)',
    recoveryYieldPct: 92.0,
    description: 'Công nghệ xanh tương lai: Sử dụng 100% năng lượng tự thân của dung dịch địa nhiệt, hoàn lưu 98.5% nước muối xuống vỉa ngầm sau 90 phút, diện tích nhà xưởng siêu nhỏ gọn.'
  },
  {
    methodName: 'Khai Thác Đá Cứng Quặng Spodumene (Hard Rock Mining)',
    co2EmissionsKgPerKgLiOH: 15.0, // Extremely carbon-intensive calcination
    waterConsumedM3PerTonLce: 65.0,
    landUseM2PerTonLce: 450.0,
    extractionCycleTime: 'Vài tuần đến vài tháng',
    recoveryYieldPct: 65.0,
    description: 'Khai mỏ lộ thiên truyền thống: Đòi hỏi nung nung quặng ở 1,050°C với lò đốt than/khí hóa thạch, nghiền mịn và axit hóa, tàn phá cảnh quan và phát thải CO₂ rất lớn.'
  },
  {
    methodName: 'Hồ Bốc Hơi Muối Salar (Evaporation Ponds)',
    co2EmissionsKgPerKgLiOH: 3.2,
    waterConsumedM3PerTonLce: 450.0, // Enormous evaporative water loss in arid deserts
    landUseM2PerTonLce: 3200.0,
    extractionCycleTime: '12 - 24 tháng',
    recoveryYieldPct: 45.0,
    description: 'Các ruộng muối Atacama/Salar: Bơm cạn tầng nước ngầm sa mạc phơi khô dưới nắng suốt 18 tháng, làm sụt giảm mực nước ngầm nghiêm trọng và hiệu suất thu hồi thấp (< 50%).'
  }
];
