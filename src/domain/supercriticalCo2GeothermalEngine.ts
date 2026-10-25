// src/domain/supercriticalCo2GeothermalEngine.ts
// Domain Engine: Supercritical Carbon Dioxide (sCO2) Closed-Loop Geothermal Power Cycle
// Standards: IUPAC Physical Chemistry, Supercritical Fluid Thermodynamics (NIST REFPROP sCO2), GDPT 2018 Chemistry & EGS Geothermal

export type GeothermalReservoirRockType = 'CRYSTALLINE_GRANITE' | 'BASALT_FLOOD' | 'SEDIMENTARY_SANDSTONE';
export type Sco2SurfaceTurbineCycle = 'RECUPERATED_BRAYTON' | 'TRANSCRITICAL_RANKINE' | 'COMBINED_BINARY';

export interface GeothermalReservoirRockSpec {
  id: GeothermalReservoirRockType;
  name: string;
  depthKmRange: [number, number];
  permeabilityMilliDarcy: number;
  thermalConductivityWPerMK: number;
  reservoirTempRangeC: [number, number];
  mineralCarbonationReactivity: 'HIGH' | 'MODERATE' | 'LOW';
  carbonationMinerals: string;
  vietnameseDescription: string;
}

export interface Sco2TurbineCycleSpec {
  id: Sco2SurfaceTurbineCycle;
  name: string;
  maxPressureMpa: number;
  minPressureMpa: number;
  turbomachineryFootprintReductionPercent: number; // >80% smaller than steam turbine
  thermalEfficiencyBasePercent: number;
  vietnameseFeature: string;
}

export const GEOTHERMAL_ROCKS: Record<GeothermalReservoirRockType, GeothermalReservoirRockSpec> = {
  CRYSTALLINE_GRANITE: {
    id: 'CRYSTALLINE_GRANITE',
    name: 'Đá Granite Tinh Thể Khô Sâu (Hot Dry Rock - HDR)',
    depthKmRange: [3.0, 5.0],
    permeabilityMilliDarcy: 15.0,
    thermalConductivityWPerMK: 3.2,
    reservoirTempRangeC: [160, 240],
    mineralCarbonationReactivity: 'MODERATE',
    carbonationMinerals: 'Plagioclase + Biotite ➔ Calcite (CaCO3) + Siderite (FeCO3)',
    vietnameseDescription: 'Tầng đá móng granite cổ sâu 3-5 km với nhiệt lượng khổng lồ; mạng vi khe nứt nhân tạo dẫn sCO2 với độ nhớt thấp gấp 3 lần nước.'
  },
  BASALT_FLOOD: {
    id: 'BASALT_FLOOD',
    name: 'Đá Basalt Hoạt Tính Khoáng Hóa Nhanh (CarbFix Reservoir)',
    depthKmRange: [1.5, 3.0],
    permeabilityMilliDarcy: 45.0,
    thermalConductivityWPerMK: 2.1,
    reservoirTempRangeC: [140, 200],
    mineralCarbonationReactivity: 'HIGH',
    carbonationMinerals: 'Olivine ((Mg,Fe)2SiO4) + CO2 ➔ Magnesite (MgCO3) + Quartz',
    vietnameseDescription: 'Tầng basalt giàu ion Ca2+, Mg2+, Fe2+ phản ứng khoáng hóa nhanh chóng biến 5-8% CO2 lưu chuyển thành đá vôi rắn vĩnh viễn trong lòng đất.'
  },
  SEDIMENTARY_SANDSTONE: {
    id: 'SEDIMENTARY_SANDSTONE',
    name: 'Sa Thạch Trầm Tích Nước Mặn Sâu (Saline Aquifer)',
    depthKmRange: [2.0, 4.0],
    permeabilityMilliDarcy: 80.0,
    thermalConductivityWPerMK: 2.6,
    reservoirTempRangeC: [120, 180],
    mineralCarbonationReactivity: 'LOW',
    carbonationMinerals: 'Feldspar + CO2 ➔ Kaolinite + Calcite',
    vietnameseDescription: 'Độ thấm hút cao tự nhiên, ma sát dòng chảy rất nhỏ; sCO2 đẩy lùi nước muối mặn không gây tắc nghẽn hay bám cặn silica.'
  }
};

export const SCO2_TURBINE_CYCLES: Record<Sco2SurfaceTurbineCycle, Sco2TurbineCycleSpec> = {
  RECUPERATED_BRAYTON: {
    id: 'RECUPERATED_BRAYTON',
    name: 'Chu Trình Brayton sCO2 Hồi Nhiệt (Recuperated Brayton)',
    maxPressureMpa: 18.0,
    minPressureMpa: 8.0,
    turbomachineryFootprintReductionPercent: 88.0,
    thermalEfficiencyBasePercent: 18.5,
    vietnameseFeature: 'Mật độ sCO2 cao (>350 kg/m³) tại cửa vào turbine giúp đường kính cánh turbine chỉ cỡ 0.6 m cho công suất 10 MW (nhỏ hơn 10 lần tuabin hơi).'
  },
  TRANSCRITICAL_RANKINE: {
    id: 'TRANSCRITICAL_RANKINE',
    name: 'Chu Trình Rankine Xuyên Tới Hạn (Transcritical Rankine)',
    maxPressureMpa: 16.0,
    minPressureMpa: 6.5,
    turbomachineryFootprintReductionPercent: 82.0,
    thermalEfficiencyBasePercent: 16.2,
    vietnameseFeature: 'Làm mát khí CO2 về trạng thái lỏng cận tới hạn ở áp suất 6.5 MPa giúp giảm tối đa công nén của máy bơm ngưng tụ.'
  },
  COMBINED_BINARY: {
    id: 'COMBINED_BINARY',
    name: 'Chu Trình Hỗn Hợp Nhị Phân sCO2 - ORC Hữu Cơ',
    maxPressureMpa: 20.0,
    minPressureMpa: 7.8,
    turbomachineryFootprintReductionPercent: 85.0,
    thermalEfficiencyBasePercent: 21.8,
    vietnameseFeature: 'Tận dụng toàn bộ nhiệt khí xả cấp tiếp cho chu trình ORC hữu cơ cấp thấp, đẩy tổng hiệu suất nhiệt lên trên 21%.'
  }
};

export interface ThermosiphonBuoyancyResult {
  reservoirDepthM: number;
  injectionTempC: number;
  productionTempC: number;
  injectionDensityKgPerM3: number;
  productionDensityKgPerM3: number;
  buoyantPressureHeadMpa: number;
  naturalCirculationFlowRateKgPerS: number;
  parasiticPumpingPowerFractionPercent: number; // 0.0% for pure natural thermosiphon
  thermosiphonStatus: 'SELF_SUSTAINING' | 'ASSISTED_CIRCULATION';
}

export interface Sco2TurbinePowerResult {
  reservoirTempC: number;
  turbineInletPressureMpa: number;
  turbineOutletPressureMpa: number;
  massFlowRateKgPerS: number;
  grossTurbinePowerMW: number;
  condenserHeatRejectionMW: number;
  netElectricPowerMW: number;
  cycleThermalEfficiencyPercent: number;
  turbineRotorDiameterMeters: number;
  equivalentSteamTurbineDiameterMeters: number;
}

export interface GeothermalPlantEconomicsResult {
  electricPowerMW: number;
  annualElectricityGenerationGWh: number;
  levelizedCostOfElectricityUSDPerMWh: number;
  annualAvoidedCO2EmissionsTons: number;
  annualMineralizedCarbonSequestrationTons: number;
  waterConsumptionLitersPerMWh: number; // 0.0 L/MWh (100% closed gas loop)
  landFootprintM2PerMW: number;
}

// Physical constants
const GRAVITY_M_PER_S2 = 9.80665;
const CO2_CRITICAL_TEMP_C = 31.04;
const CO2_CRITICAL_PRESSURE_MPA = 7.38;

/**
 * 1. Calculates the thermosiphon buoyancy drive in deep EGS injection/production wells:
 * Density of cold sCO2 (30-40°C, 10-15 MPa) ~ 880-940 kg/m3
 * Density of hot sCO2 (160-240°C, 10-15 MPa) ~ 300-450 kg/m3
 * Delta_P_buoyancy = (rho_inj - rho_prod) * g * H
 */
export function calculateThermosiphonBuoyancy(
  reservoirDepthM: number = 3500,
  injectionTempC: number = 35,
  productionTempC: number = 200,
  wellDiameterM: number = 0.25
): ThermosiphonBuoyancyResult {
  // Density approximations for sCO2 at 12 MPa (NIST thermodynamic tables):
  // Cold injection well:
  const injectionDensityKgPerM3 = Math.max(750, 960 - 2.8 * (injectionTempC - 25));
  // Hot production well:
  const productionDensityKgPerM3 = Math.max(240, 520 - 1.25 * (productionTempC - 100));

  // Buoyant driving pressure head:
  const densityDelta = injectionDensityKgPerM3 - productionDensityKgPerM3;
  const buoyantPressureHeadPa = densityDelta * GRAVITY_M_PER_S2 * reservoirDepthM;
  const buoyantPressureHeadMpa = buoyantPressureHeadPa / 1e6;

  // Well cross-sectional area:
  const wellAreaM2 = Math.PI * Math.pow(wellDiameterM / 2.0, 2);

  // Darcy-Weisbach flow equilibrium in deep loop:
  // Friction loss Delta_P_fric = f * (H / D) * (rho * v^2 / 2) balance buoyant drive
  const avgDensity = (injectionDensityKgPerM3 + productionDensityKgPerM3) / 2.0;
  // Natural flow velocity sustained by buoyancy (m/s):
  const naturalVelocityMPerS = Math.min(3.8, Math.sqrt((2 * buoyantPressureHeadPa) / (avgDensity * 12.0)));
  const naturalCirculationFlowRateKgPerS = avgDensity * wellAreaM2 * naturalVelocityMPerS;

  const parasiticPumpingPowerFractionPercent = buoyantPressureHeadMpa >= 5.0 ? 0.0 : 1.2;
  const thermosiphonStatus = buoyantPressureHeadMpa >= 5.0 ? 'SELF_SUSTAINING' : 'ASSISTED_CIRCULATION';

  return {
    reservoirDepthM,
    injectionTempC,
    productionTempC,
    injectionDensityKgPerM3,
    productionDensityKgPerM3,
    buoyantPressureHeadMpa,
    naturalCirculationFlowRateKgPerS,
    parasiticPumpingPowerFractionPercent,
    thermosiphonStatus
  };
}

/**
 * 2. Calculates surface turbomachinery expansion and cycle efficiency for sCO2 Brayton/Rankine loop:
 */
export function calculateSco2TurbinePowerAndEfficiency(
  reservoirTempC: number = 200,
  cycleType: Sco2SurfaceTurbineCycle = 'RECUPERATED_BRAYTON',
  massFlowRateKgPerS: number = 180.0
): Sco2TurbinePowerResult {
  const cycleSpec = SCO2_TURBINE_CYCLES[cycleType];
  const turbineInletPressureMpa = cycleSpec.maxPressureMpa;
  const turbineOutletPressureMpa = cycleSpec.minPressureMpa;

  // Specific enthalpy drop across sCO2 expander:
  // Delta_h ~ Cp * T_in * (1 - (P_out / P_in)^((gamma-1)/gamma)) * isentropic_eff
  // For sCO2, isentropic enthalpy drop ~ 70 - 110 kJ/kg
  const tempK = reservoirTempC + 273.15;
  const pressureRatio = turbineInletPressureMpa / turbineOutletPressureMpa;
  const specificEnthalpyDropKJPerKg = 0.85 * (1.18 * tempK * (1 - Math.pow(1.0 / pressureRatio, 0.22)));

  const grossTurbinePowerKW = massFlowRateKgPerS * specificEnthalpyDropKJPerKg;
  const grossTurbinePowerMW = grossTurbinePowerKW / 1000.0;

  // Parasitic recompression work (for closed loop compressor):
  const compressorWorkFraction = cycleType === 'TRANSCRITICAL_RANKINE' ? 0.12 : 0.22;
  const netElectricPowerMW = grossTurbinePowerMW * (1.0 - compressorWorkFraction);

  // Total heat extracted from geothermal rock (kW_th):
  // Average Cp for sCO2 across 35°C to 200°C at 15 MPa ~ 1.95 kJ/(kg*K)
  const thermalHeatMW = (massFlowRateKgPerS * 1.95 * (reservoirTempC - 35)) / 1000.0;
  const condenserHeatRejectionMW = Math.max(0, thermalHeatMW - netElectricPowerMW);
  const cycleThermalEfficiencyPercent = (netElectricPowerMW / Math.max(0.1, thermalHeatMW)) * 100;

  // Turbomachinery physical rotor diameter:
  // Because sCO2 has very high fluid density (>300 kg/m3), the volumetric flow rate is tiny!
  // A 10 MW sCO2 turbine has rotor diameter ~ 0.55 - 0.70 m, compared to steam turbine > 3.5 m.
  const turbineRotorDiameterMeters = 0.20 * Math.pow(grossTurbinePowerMW, 0.45);
  const equivalentSteamTurbineDiameterMeters = turbineRotorDiameterMeters * 5.5;

  return {
    reservoirTempC,
    turbineInletPressureMpa,
    turbineOutletPressureMpa,
    massFlowRateKgPerS,
    grossTurbinePowerMW,
    condenserHeatRejectionMW,
    netElectricPowerMW,
    cycleThermalEfficiencyPercent,
    turbineRotorDiameterMeters,
    equivalentSteamTurbineDiameterMeters
  };
}

/**
 * 3. Calculates Geothermal Plant Economics, Zero Water Consumption, and Mineral Carbonation Sequestration:
 */
export function calculateGeothermalPlantEconomicsAndCarbonStorage(
  electricPowerMW: number = 25.0,
  rockType: GeothermalReservoirRockType = 'BASALT_FLOOD',
  annualCapacityFactor: number = 0.94 // Geothermal baseload runs 94% of the year
): GeothermalPlantEconomicsResult {
  const rockSpec = GEOTHERMAL_ROCKS[rockType];
  const annualHours = 8760 * annualCapacityFactor;
  const annualElectricityGenerationGWh = (electricPowerMW * annualHours) / 1000.0;

  // Levelized Cost of Electricity (LCOE):
  // Zero fuel cost, high capacity factor (94%), compact sCO2 turbomachinery cuts CapEx
  // LCOE ~ $55 - $72 / MWh (very competitive with fossil baseload and cheaper than offshore wind)
  const baseLCOE = rockType === 'BASALT_FLOOD' ? 58.0 : rockType === 'CRYSTALLINE_GRANITE' ? 66.0 : 62.0;

  // Avoided carbon emissions vs coal/gas grid baseline (0.75 tons CO2/MWh):
  const annualAvoidedCO2EmissionsTons = (annualElectricityGenerationGWh * 1000) * 0.75;

  // Mineral Carbonation:
  // A percentage of the circulating sCO2 reacts with basalt/granite rock to form solid minerals
  // Basalt (high reactivity): ~ 450 tons CO2 mineralized per MW per year
  // Granite (moderate reactivity): ~ 180 tons CO2 mineralized per MW per year
  let mineralizationFactorTonsPerMW = 180;
  if (rockSpec.mineralCarbonationReactivity === 'HIGH') mineralizationFactorTonsPerMW = 450;
  if (rockSpec.mineralCarbonationReactivity === 'LOW') mineralizationFactorTonsPerMW = 80;
  const annualMineralizedCarbonSequestrationTons = electricPowerMW * mineralizationFactorTonsPerMW;

  return {
    electricPowerMW,
    annualElectricityGenerationGWh,
    levelizedCostOfElectricityUSDPerMWh: baseLCOE,
    annualAvoidedCO2EmissionsTons,
    annualMineralizedCarbonSequestrationTons,
    waterConsumptionLitersPerMWh: 0.0, // 100% closed gas loop, zero water consumption
    landFootprintM2PerMW: 450 // Extremely compact surface footprint
  };
}
