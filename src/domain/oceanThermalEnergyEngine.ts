/**
 * ELEMENTA - OCEAN THERMAL ENERGY CONVERSION (OTEC) & DEEP-SEA AMMONIA ENGINE
 *
 * Conforms to:
 * - IUPAC Physical Chemistry & Low-Delta T Carnot / Rankine Thermodynamic Limits
 * - International Energy Agency Ocean Energy Systems (IEA-OES) OTEC Standards
 * - Closed-Cycle (Anderson Ammonia ORC), Open-Cycle (Claude Flash Steam), & Kalina Cycle Architectures
 * - Deep-Sea Cold Water Pipe (CWIP) Hydrodynamics & Darcy-Weisbach Head Loss
 * - Deep Ocean Water (DOW) Nutrient Enrichment (NO3-, PO4^3-, SiO4^4-), Potable Desalination & SWAC Co-generation
 * - Vietnam GDPT 2018 Chemistry & Physics (Nhiệt động lực học chu trình động cơ nhiệt, Entanpy bay hơi, Hóa học biển sâu)
 */

export type OtecTechnologyType =
  | 'CLOSED_CYCLE_AMMONIA'
  | 'KALINA_CYCLE_ZEOTROPIC'
  | 'OPEN_CYCLE_FLASH_STEAM'
  | 'HYBRID_POWER_DESALINATION';

export type OtecWorkingFluid = 'ANHYDROUS_AMMONIA_NH3' | 'ZEOTROPIC_NH3_H2O' | 'R1233ZD_E' | 'PURE_WATER_STEAM';

export interface OtecFluidProperties {
  name: string;
  chemicalFormula: string;
  molecularWeightGPerMol: number;
  normalBoilingPointC: number;
  latentHeatVaporizationKjKg: number; // Latent heat delta H_vap at ~25°C
  saturationPressureAt26CBar: number;
  saturationPressureAt8CBar: number;
  globalWarmingPotentialGwp: number;
  ozoneDepletionPotentialOdp: number;
  description: string;
}

export const OTEC_FLUID_CATALOG: Record<OtecWorkingFluid, OtecFluidProperties> = {
  ANHYDROUS_AMMONIA_NH3: {
    name: 'Amoniac Khan Tinh Khiết (Anhydrous Ammonia)',
    chemicalFormula: 'NH3',
    molecularWeightGPerMol: 17.03,
    normalBoilingPointC: -33.34,
    latentHeatVaporizationKjKg: 1165.0,
    saturationPressureAt26CBar: 10.34,
    saturationPressureAt8CBar: 5.74,
    globalWarmingPotentialGwp: 0,
    ozoneDepletionPotentialOdp: 0,
    description: 'Chất môi giới kinh điển cho chu trình OTEC khép kín (Anderson cycle): ẩn nhiệt hóa hơi cao nhất, hệ số truyền nhiệt vượt trội, tuabin nhỏ gọn.'
  },
  ZEOTROPIC_NH3_H2O: {
    name: 'Hỗn Hợp Đồng Phí Amoniac - Nước (Zeotropic Ammonia-Water 85/15)',
    chemicalFormula: 'NH3 (85%) + H2O (15%)',
    molecularWeightGPerMol: 17.18,
    normalBoilingPointC: -28.5,
    latentHeatVaporizationKjKg: 1220.0,
    saturationPressureAt26CBar: 9.42,
    saturationPressureAt8CBar: 5.15,
    globalWarmingPotentialGwp: 0,
    ozoneDepletionPotentialOdp: 0,
    description: 'Chu trình Kalina: sôi trượt nhiệt độ (temperature glide) giúp giảm tổn thất bất thuận nghịch nhiệt học trong bộ bay hơi, tăng hiệu suất thuần 15-25%.'
  },
  R1233ZD_E: {
    name: 'Hydrofluoroolefin Thân Thiện Sinh Thái (Trans-1-chloro-3,3,3-trifluoropropene)',
    chemicalFormula: 'CF3-CH=CH-Cl',
    molecularWeightGPerMol: 130.5,
    normalBoilingPointC: 19.0,
    latentHeatVaporizationKjKg: 195.0,
    saturationPressureAt26CBar: 1.30,
    saturationPressureAt8CBar: 0.65,
    globalWarmingPotentialGwp: 1,
    ozoneDepletionPotentialOdp: 0.0003,
    description: 'Môi chất thế hệ mới không cháy, áp suất vận hành thấp gần khí quyển, an toàn trên giàn khoan OTEC ngoài khơi.'
  },
  PURE_WATER_STEAM: {
    name: 'Hơi Nước Chân Không (Low-Pressure Water Steam)',
    chemicalFormula: 'H2O',
    molecularWeightGPerMol: 18.015,
    normalBoilingPointC: 100.0,
    latentHeatVaporizationKjKg: 2440.0,
    saturationPressureAt26CBar: 0.0336, // 3.36 kPa
    saturationPressureAt8CBar: 0.0107,  // 1.07 kPa
    globalWarmingPotentialGwp: 0,
    ozoneDepletionPotentialOdp: 0,
    description: 'Chu trình mở Claude: nước biển bề mặt tự sôi trong buồng chớp chân không (3 kPa), hơi nước giãn nở làm quay tuabin rồi ngưng tụ thành nước ngọt tinh khiết.'
  }
};

export interface OtecOperatingParameters {
  technology: OtecTechnologyType;
  workingFluid: OtecWorkingFluid;
  warmSurfaceWaterTempC: number;    // e.g. 26 - 30°C (typical 28°C)
  coldDeepWaterTempC: number;       // e.g. 4 - 6°C (typical 4.5°C at 1000m)
  coldWaterPipeDepthM: number;      // Depth of intake pipe: 800 - 1200 m (nominal 1000 m)
  coldWaterPipeDiameterM: number;   // Internal diameter: 1.5 - 5.0 m (e.g. 2.8 m)
  warmWaterFlowRateM3s: number;     // Surface seawater intake rate (e.g. 25.0 m³/s)
  coldWaterFlowRateM3s: number;     // Deep ocean water intake rate (e.g. 15.0 m³/s)
  evaporatorPinchPointDeltaC: number; // Pinch temperature difference (e.g. 2.0°C)
  condenserPinchPointDeltaC: number;  // Pinch temperature difference (e.g. 2.0°C)
  turbineIsentropicEfficiencyPct: number; // Turbine efficiency (typically 82 - 88%)
  pumpEfficiencyPct: number;        // Seawater pump efficiency (typically 78 - 85%)
}

export interface OtecCalculationResult {
  technology: OtecTechnologyType;
  techName: string;
  workingFluid: OtecFluidProperties;
  thermalGradientDeltaC: number;
  carnotEfficiencyPct: number;
  rankineGrossEfficiencyPct: number;
  netCycleEfficiencyPct: number;
  evaporatorTemperatureC: number;
  condenserTemperatureC: number;
  evaporatorPressureBar: number;
  condenserPressureBar: number;
  expansionPressureRatio: number;
  thermalHeatInputMw: number;
  grossGeneratorPowerMw: number;
  parasiticLosses: {
    coldWaterPumpingPowerMw: number;
    warmWaterPumpingPowerMw: number;
    workingFluidCirculationPowerMw: number;
    totalParasiticPowerMw: number;
    parasiticShareOfGrossPct: number;
  };
  netExportPowerMw: number;
  annualNetGenerationGwh: number;
  capacityFactorPct: number;
  coldWaterPipeHydrodynamics: {
    flowVelocityMPerS: number;
    darcyFrictionalHeadLossM: number;
    densityDifferenceHeadM: number;
    totalDynamicHeadM: number;
  };
  byproductsAndBlueEconomy: {
    potableWaterProductionM3PerDay: number; // Freshwater from Claude flash evaporation / hybrid condenser
    deepOceanWaterNutrients: {
      nitrateConcentrationUmolL: number;    // NO3- for marine aquaculture
      phosphateConcentrationUmolL: number;  // PO4^3-
      silicateConcentrationUmolL: number;   // SiO4^4-
      aquacultureYieldBoostFactor: number; // Boost in spirulina/seaweed/finfish growth
    };
    swacCoolingCapacityMwTh: number;       // Direct Seawater Air Conditioning thermal savings
    swacElectricitySavedMw: number;         // Chiller power eliminated
    greenHydrogenProductionKgPerDay: number; // Potential H2 via PEM/AEMWE using net export
    greenAmmoniaProductionTonsPerDay: number; // Potential NH3 via Haber-Bosch
  };
  environmentalEconomics: {
    co2EmissionsAvoidedTonsPerYear: number;
    levelizedCostOfElectricityUsdPerMwh: number;
    reliabilityDescription: string;
  };
}

export interface VietnamOtecResourceSite {
  siteId: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  surfaceTempMeanC: number;
  deepTemp1000mC: number;
  deltaTC: number;
  distanceTo1000mDepthKm: number; // Offshore distance to reach 1000m deep trench
  theoreticalBaseloadPotentialMw: number;
  notes: string;
}

export const VIETNAM_OTEC_RESOURCES: VietnamOtecResourceSite[] = [
  {
    siteId: 'NINH_THUAN_CA_NA',
    name: 'Vùng Biển Cà Ná - Ninh Thuận',
    region: 'Duyên hải Nam Trung Bộ',
    latitude: 11.33,
    longitude: 108.88,
    surfaceTempMeanC: 28.5,
    deepTemp1000mC: 4.5,
    deltaTC: 24.0,
    distanceTo1000mDepthKm: 22.0,
    theoreticalBaseloadPotentialMw: 4500,
    notes: 'Thềm lục địa dốc đứng lý tưởng nhất Việt Nam, chỉ 22km bờ đạt độ sâu 1000m. Nước trồi tự nhiên dồi dào dinh dưỡng.'
  },
  {
    siteId: 'KHANH_HOA_CAM_RANH',
    name: 'Vịnh Cam Ranh - Khánh Hòa',
    region: 'Duyên hải Nam Trung Bộ',
    latitude: 11.90,
    longitude: 109.25,
    surfaceTempMeanC: 28.2,
    deepTemp1000mC: 4.6,
    deltaTC: 23.6,
    distanceTo1000mDepthKm: 28.0,
    theoreticalBaseloadPotentialMw: 3800,
    notes: 'Khu bảo tồn nước sâu kín gió, kết hợp hoàn hảo giữa nhà máy điện OTEC và làm mát trung tâm dữ liệu SWAC.'
  },
  {
    siteId: 'CON_DAO_BA_RIA',
    name: 'Quần Đảo Côn Đảo - Bà Rịa Vũng Tàu',
    region: 'Đông Nam Bộ ngoài khơi',
    latitude: 8.68,
    longitude: 106.60,
    surfaceTempMeanC: 28.8,
    deepTemp1000mC: 4.8,
    deltaTC: 24.0,
    distanceTo1000mDepthKm: 35.0,
    theoreticalBaseloadPotentialMw: 1200,
    notes: 'Huyện đảo cô lập: OTEC giải quyết đồng thời bài toán điện 24/7, nước ngọt sinh hoạt và điều hòa SWAC không khí thải.'
  },
  {
    siteId: 'PHU_QUY_BINH_THUAN',
    name: 'Đảo Phú Quý - Bình Thuận',
    region: 'Duyên hải Nam Trung Bộ ngoài khơi',
    latitude: 10.52,
    longitude: 108.94,
    surfaceTempMeanC: 28.4,
    deepTemp1000mC: 4.5,
    deltaTC: 23.9,
    distanceTo1000mDepthKm: 25.0,
    theoreticalBaseloadPotentialMw: 850,
    notes: 'Vùng nước sâu lân cận đảo, thay thế hoàn toàn máy phát điện diesel đắt đỏ và tạo nguồn nước ngọt dồi dào.'
  },
  {
    siteId: 'HOANG_SA_TRUONG_SA',
    name: 'Vùng Biển Quần Đảo Trường Sa (Biển Đông)',
    region: 'Hải đảo Tiền tiêu Tổ quốc',
    latitude: 9.50,
    longitude: 112.50,
    surfaceTempMeanC: 29.2,
    deepTemp1000mC: 4.4,
    deltaTC: 24.8,
    distanceTo1000mDepthKm: 5.0,
    theoreticalBaseloadPotentialMw: 15000,
    notes: 'Các rạn san hô atoll dốc đứng rơi thẳng xuống vực sâu 1500m chỉ cách bờ vài km. Năng lượng độc lập chiến lược 24/7.'
  }
];

/**
 * Calculates Antoine/Clausius-Clapeyron saturation pressure for Ammonia
 * P_sat(T) in bar given T in °C
 */
export function calculateAmmoniaSaturationPressureBar(tempC: number): number {
  // Antoine parameters for Ammonia (T in K, P in bar)
  // log10(P [bar]) = A - B / (T [K] + C)
  // Standard NIST values: A = 4.86886, B = 1113.928, C = -10.409 (valid 164K to 405K)
  const T_kelvin = tempC + 273.15;
  const A = 4.86886;
  const B = 1113.928;
  const C = -10.409;
  const logP = A - B / (T_kelvin + C);
  return Math.pow(10, logP);
}

/**
 * Main OTEC Thermodynamic & Hydrodynamic Simulation Engine
 */
export function calculateOtecPerformance(params: OtecOperatingParameters): OtecCalculationResult {
  const {
    technology,
    workingFluid,
    warmSurfaceWaterTempC,
    coldDeepWaterTempC,
    coldWaterPipeDepthM,
    coldWaterPipeDiameterM,
    warmWaterFlowRateM3s,
    coldWaterFlowRateM3s,
    evaporatorPinchPointDeltaC,
    condenserPinchPointDeltaC,
    turbineIsentropicEfficiencyPct,
    pumpEfficiencyPct
  } = params;

  const fluidInfo = OTEC_FLUID_CATALOG[workingFluid];

  // 1. Thermal Gradients & Thermodynamic Limits
  const deltaT = Math.max(0.1, warmSurfaceWaterTempC - coldDeepWaterTempC);
  const T_warm_K = warmSurfaceWaterTempC + 273.15;
  const T_cold_K = coldDeepWaterTempC + 273.15;

  // Theoretical Carnot efficiency limit: eta_carnot = 1 - T_C / T_H
  const carnotEfficiencyPct = (1 - T_cold_K / T_warm_K) * 100;

  // Working fluid evaporation and condensation temperatures
  // Evaporator operates below warm seawater temp (pinch point)
  // Condenser operates above cold seawater temp (pinch point)
  const T_evap_C = warmSurfaceWaterTempC - evaporatorPinchPointDeltaC - 1.5;
  const T_cond_C = coldDeepWaterTempC + condenserPinchPointDeltaC + 1.5;

  let P_evap_bar = fluidInfo.saturationPressureAt26CBar;
  let P_cond_bar = fluidInfo.saturationPressureAt8CBar;

  if (workingFluid === 'ANHYDROUS_AMMONIA_NH3') {
    P_evap_bar = calculateAmmoniaSaturationPressureBar(T_evap_C);
    P_cond_bar = calculateAmmoniaSaturationPressureBar(T_cond_C);
  } else if (workingFluid === 'ZEOTROPIC_NH3_H2O') {
    P_evap_bar = calculateAmmoniaSaturationPressureBar(T_evap_C) * 0.91;
    P_cond_bar = calculateAmmoniaSaturationPressureBar(T_cond_C) * 0.89;
  } else if (workingFluid === 'PURE_WATER_STEAM') {
    // Steam tables empirical fit for low temp steam
    P_evap_bar = 0.006112 * Math.exp((17.67 * T_evap_C) / (T_evap_C + 243.5));
    P_cond_bar = 0.006112 * Math.exp((17.67 * T_cond_C) / (T_cond_C + 243.5));
  }

  const expansionPressureRatio = P_cond_bar > 0 ? P_evap_bar / P_cond_bar : 1.0;

  // Gross thermal heat input into evaporator: Q_in = m_dot_warm * c_p * deltaT_warm_drop
  // Warm water typically cools by ~3.0 - 4.5°C through evaporator
  const warmWaterCoolingRangeC = Math.min(4.5, Math.max(1.5, deltaT * 0.16));
  const rho_warm = 1023.0; // kg/m³ for 28°C seawater
  const c_p_seawater = 4.0; // kJ/(kg K)
  const warmWaterMassFlowKgS = warmWaterFlowRateM3s * rho_warm;
  const thermalHeatInputMw = (warmWaterMassFlowKgS * c_p_seawater * warmWaterCoolingRangeC) / 1000.0;

  // Gross Rankine cycle thermal efficiency
  // Rankine efficiency for low delta-T engines typically reaches 40-55% of Carnot
  let cycleFactor = 0.48;
  if (technology === 'KALINA_CYCLE_ZEOTROPIC') {
    cycleFactor = 0.58; // Kalina cycle recovers 20% more exergy due to non-isothermal boiling
  } else if (technology === 'OPEN_CYCLE_FLASH_STEAM') {
    cycleFactor = 0.42; // Claude cycle has turbine de-aerator and steam moisture penalties
  }
  const rankineGrossEfficiencyPct = carnotEfficiencyPct * cycleFactor * (turbineIsentropicEfficiencyPct / 85.0);

  // Gross electric generator power
  const grossGeneratorPowerMw = thermalHeatInputMw * (rankineGrossEfficiencyPct / 100.0);

  // 2. Cold Water Pipe (CWIP) Hydrodynamics & Pumping Work
  const pipeAreaM2 = Math.PI * Math.pow(coldWaterPipeDiameterM / 2, 2);
  const flowVelocityMPerS = coldWaterFlowRateM3s / Math.max(0.1, pipeAreaM2);

  // Darcy-Weisbach friction head loss: h_f = f * (L/D) * (v^2 / (2g))
  // For smooth extruded HDPE pipe at Re ~ 10^6 - 10^7, Darcy friction factor f ~ 0.0135
  const darcyFrictionFactor = 0.0135;
  const g = 9.80665;
  const darcyFrictionalHeadLossM =
    darcyFrictionFactor * (coldWaterPipeDepthM / coldWaterPipeDiameterM) * (Math.pow(flowVelocityMPerS, 2) / (2 * g));

  // Density head difference: Cold water at 4°C is denser (1028 kg/m³) than warm ocean column (1023 kg/m³)
  const rho_cold = 1028.0;
  const deltaRho = rho_cold - rho_warm; // ~ 5 kg/m³
  const densityDifferenceHeadM = coldWaterPipeDepthM * (deltaRho / rho_cold); // ~ 4.86 m head

  // Minor losses (intake screen, diffuser, bends): ~ 1.0 m head
  const minorLossesM = 1.0;
  const totalDynamicHeadM = darcyFrictionalHeadLossM + densityDifferenceHeadM + minorLossesM;

  // Cold water pump power: P_pump = (rho * g * Q * TDH) / eta_pump
  const coldWaterPumpingPowerMw =
    (rho_cold * g * coldWaterFlowRateM3s * totalDynamicHeadM) / (pumpEfficiencyPct / 100.0) / 1e6;

  // Warm water intake pumping power (short conduit, TDH ~ 2.5 - 3.5 m)
  const warmWaterTDHM = 2.8;
  const warmWaterPumpingPowerMw =
    (rho_warm * g * warmWaterFlowRateM3s * warmWaterTDHM) / (pumpEfficiencyPct / 100.0) / 1e6;

  // Working fluid feed pump power (Rankine circulation)
  const workingFluidCirculationPowerMw = grossGeneratorPowerMw * 0.06;

  const totalParasiticPowerMw = coldWaterPumpingPowerMw + warmWaterPumpingPowerMw + workingFluidCirculationPowerMw;
  const parasiticShareOfGrossPct = grossGeneratorPowerMw > 0 ? (totalParasiticPowerMw / grossGeneratorPowerMw) * 100.0 : 0;

  // Net power export
  const netExportPowerMw = Math.max(0, grossGeneratorPowerMw - totalParasiticPowerMw);
  const netCycleEfficiencyPct = thermalHeatInputMw > 0 ? (netExportPowerMw / thermalHeatInputMw) * 100.0 : 0;

  // Annual baseload generation (Capacity Factor 92-96% for continuous ocean thermal)
  const capacityFactorPct = 94.0;
  const annualNetGenerationGwh = (netExportPowerMw * 8760 * (capacityFactorPct / 100.0)) / 1000.0;

  // 3. Byproducts & Blue Economy Co-generation
  // Potable freshwater production:
  // In Open-Cycle or Hybrid: 0.5% of warm water flashes into steam and condenses as fresh water
  let potableWaterProductionM3PerDay = 0;
  if (technology === 'OPEN_CYCLE_FLASH_STEAM') {
    potableWaterProductionM3PerDay = warmWaterFlowRateM3s * 3600 * 24 * 0.0055; // 0.55% flash fraction
  } else if (technology === 'HYBRID_POWER_DESALINATION') {
    potableWaterProductionM3PerDay = warmWaterFlowRateM3s * 3600 * 24 * 0.0035;
  }

  // Deep Ocean Water (DOW) Nutrient Enrichment
  // Deep ocean water is hyper-rich in nitrates, phosphates, silicates
  const nitrateUmolL = 36.5; // Pristine NO3-
  const phosphateUmolL = 2.45; // PO4^3-
  const silicateUmolL = 72.0; // SiO4^4-
  const aquacultureYieldBoostFactor = 4.2; // 420% increase in microalgae and aquaculture biomass

  // Seawater Air Conditioning (SWAC)
  // Deep seawater warming from 4.5°C to 11.0°C provides immense cooling
  const swacColdWaterUsefulFlowM3s = coldWaterFlowRateM3s * 0.5; // e.g. 50% routed through SWAC heat exchangers
  const swacDeltaT = 6.5; // °C
  const swacCoolingCapacityMwTh = (swacColdWaterUsefulFlowM3s * rho_cold * c_p_seawater * swacDeltaT) / 1000.0;
  // A conventional chiller COP ~ 4.5 consumes electric power:
  const swacElectricitySavedMw = swacCoolingCapacityMwTh / 4.5;

  // Green Hydrogen & Ammonia Potential from Net Export
  // Commercial AEMWE / PEM electrolyzer requires ~48 kWh/kg H2
  const greenHydrogenProductionKgPerDay = (netExportPowerMw * 1000 * 24) / 48.0;
  // Green Ammonia synthesis via Haber-Bosch consumes 0.178 kg H2 per kg NH3
  const greenAmmoniaProductionTonsPerDay = (greenHydrogenProductionKgPerDay / 0.178) / 1000.0;

  // 4. Environmental & Economics
  // Displacing coal/diesel generator on island/coast: 0.75 tons CO2/MWh
  const co2EmissionsAvoidedTonsPerYear = annualNetGenerationGwh * 1000 * 0.75;
  // LCOE calculation ($/MWh) for 10-50 MW scale commercial OTEC
  const levelizedCostOfElectricityUsdPerMwh = Math.max(68.0, 185.0 - netExportPowerMw * 2.8);

  let techName = 'OTEC Chu Trình Kín Amoniac (Closed-Cycle Ammonia ORC)';
  if (technology === 'KALINA_CYCLE_ZEOTROPIC') {
    techName = 'OTEC Chu Trình Kalina (Zeotropic Ammonia-Water)';
  } else if (technology === 'OPEN_CYCLE_FLASH_STEAM') {
    techName = 'OTEC Chu Trình Mở Claude (Open-Cycle Flash Steam & Desalination)';
  } else if (technology === 'HYBRID_POWER_DESALINATION') {
    techName = 'OTEC Hỗn Hợp Đồng Phát Điện & Nước Ngọt (Hybrid Power-Desalination)';
  }

  return {
    technology,
    techName,
    workingFluid: fluidInfo,
    thermalGradientDeltaC: Math.round(deltaT * 100) / 100,
    carnotEfficiencyPct: Math.round(carnotEfficiencyPct * 100) / 100,
    rankineGrossEfficiencyPct: Math.round(rankineGrossEfficiencyPct * 100) / 100,
    netCycleEfficiencyPct: Math.round(netCycleEfficiencyPct * 100) / 100,
    evaporatorTemperatureC: Math.round(T_evap_C * 10) / 10,
    condenserTemperatureC: Math.round(T_cond_C * 10) / 10,
    evaporatorPressureBar: Math.round(P_evap_bar * 100) / 100,
    condenserPressureBar: Math.round(P_cond_bar * 100) / 100,
    expansionPressureRatio: Math.round(expansionPressureRatio * 100) / 100,
    thermalHeatInputMw: Math.round(thermalHeatInputMw * 10) / 10,
    grossGeneratorPowerMw: Math.round(grossGeneratorPowerMw * 100) / 100,
    parasiticLosses: {
      coldWaterPumpingPowerMw: Math.round(coldWaterPumpingPowerMw * 100) / 100,
      warmWaterPumpingPowerMw: Math.round(warmWaterPumpingPowerMw * 100) / 100,
      workingFluidCirculationPowerMw: Math.round(workingFluidCirculationPowerMw * 100) / 100,
      totalParasiticPowerMw: Math.round(totalParasiticPowerMw * 100) / 100,
      parasiticShareOfGrossPct: Math.round(parasiticShareOfGrossPct * 10) / 10
    },
    netExportPowerMw: Math.round(netExportPowerMw * 100) / 100,
    annualNetGenerationGwh: Math.round(annualNetGenerationGwh * 10) / 10,
    capacityFactorPct,
    coldWaterPipeHydrodynamics: {
      flowVelocityMPerS: Math.round(flowVelocityMPerS * 100) / 100,
      darcyFrictionalHeadLossM: Math.round(darcyFrictionalHeadLossM * 100) / 100,
      densityDifferenceHeadM: Math.round(densityDifferenceHeadM * 100) / 100,
      totalDynamicHeadM: Math.round(totalDynamicHeadM * 100) / 100
    },
    byproductsAndBlueEconomy: {
      potableWaterProductionM3PerDay: Math.round(potableWaterProductionM3PerDay),
      deepOceanWaterNutrients: {
        nitrateConcentrationUmolL: nitrateUmolL,
        phosphateConcentrationUmolL: phosphateUmolL,
        silicateConcentrationUmolL: silicateUmolL,
        aquacultureYieldBoostFactor
      },
      swacCoolingCapacityMwTh: Math.round(swacCoolingCapacityMwTh * 10) / 10,
      swacElectricitySavedMw: Math.round(swacElectricitySavedMw * 100) / 100,
      greenHydrogenProductionKgPerDay: Math.round(greenHydrogenProductionKgPerDay),
      greenAmmoniaProductionTonsPerDay: Math.round(greenAmmoniaProductionTonsPerDay * 10) / 10
    },
    environmentalEconomics: {
      co2EmissionsAvoidedTonsPerYear: Math.round(co2EmissionsAvoidedTonsPerYear),
      levelizedCostOfElectricityUsdPerMwh: Math.round(levelizedCostOfElectricityUsdPerMwh * 10) / 10,
      reliabilityDescription: 'Nguồn điện nền sạch 24/7/365 liên tục với hệ số công suất > 94%, hoàn toàn không phụ thuộc thời tiết hay ban đêm.'
    }
  };
}
