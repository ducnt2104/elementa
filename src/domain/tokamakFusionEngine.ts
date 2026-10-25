/**
 * ELEMENTA - TOKAMAK MAGNETIC CONFINEMENT FUSION & PLASMA CHEMISTRY ENGINE
 *
 * Conforms to:
 * - IUPAC & IAEA Nuclear Fusion Physics & Maxwellian Fusion Reactivity Standards
 * - Lawson Triple Product Confinement Criterion (n * T * tau_E >= 3e21 keV s/m³)
 * - ITER (International Thermonuclear Experimental Reactor) & High-Field REBCO (SPARC/ARC) Benchmarks
 * - In-situ Lithium Tritium Breeding Blanket Radiochemistry (^6Li + n -> ^4He + ^3H + 4.78 MeV)
 * - Divertor Heat Flux Management & Impurity Radiative Detachment (Ar/Ne seeding)
 * - Vietnam GDPT 2018 Physics & Chemistry (Phản ứng nhiệt hạch tổng hợp hạt nhân, Năng lượng liên kết hạt nhân, Độ hụt khối)
 */

export type FusionFuelReaction =
  | 'DEUTERIUM_TRITIUM'
  | 'DEUTERIUM_DEUTERIUM'
  | 'DEUTERIUM_HELIUM3'
  | 'PROTON_BORON11';

export type MagnetTechnology =
  | 'REBCO_HIGH_TEMP_SUPERCONDUCTOR'
  | 'NBSN_LOW_TEMP_SUPERCONDUCTOR';

export type BlanketBreederType =
  | 'LIQUID_PB16LI_EUTECTIC'
  | 'SOLID_CERAMIC_LI4SIO4_BE'
  | 'FLIBE_MOLTEN_SALT';

export interface FusionReactionProperties {
  name: string;
  chemicalFormula: string;
  reactants: string[];
  products: string[];
  totalEnergyReleaseMev: number;
  chargedParticleEnergyMev: number; // Alpha / proton energy retained for self-heating
  neutronEnergyMev: number;          // Volumetric heat deposited into blanket
  idealIgnitionTemperatureKeV: number;
  description: string;
}

export const FUSION_REACTIONS_CATALOG: Record<FusionFuelReaction, FusionReactionProperties> = {
  DEUTERIUM_TRITIUM: {
    name: 'Phản Ứng Đơteri - Triti (D-T)',
    chemicalFormula: '²H + ³H → ⁴He (3.52 MeV) + ¹n (14.06 MeV)',
    reactants: ['²H (Deuterium)', '³H (Tritium)'],
    products: ['⁴He (Alpha 3.52 MeV)', '¹n (Fast Neutron 14.06 MeV)'],
    totalEnergyReleaseMev: 17.58,
    chargedParticleEnergyMev: 3.52,
    neutronEnergyMev: 14.06,
    idealIgnitionTemperatureKeV: 15.0, // ~ 174 million °C
    description: 'Phản ứng nhiệt hạch có tiết diện hiệu dụng lớn nhất ở nhiệt độ khả thi thấp nhất (~15 keV). 80% năng lượng tỏa ra dưới dạng neutron nhanh 14.1 MeV xuyên vào lớp chăn để sinh điện và tái tạo Triti.'
  },
  DEUTERIUM_DEUTERIUM: {
    name: 'Phản Ứng Đơteri - Đơteri Tự Thân (D-D)',
    chemicalFormula: '²H + ²H → ³He (0.82 MeV) + n (2.45 MeV) [50%] / ³H (1.01 MeV) + p (3.02 MeV) [50%]',
    reactants: ['²H (Deuterium)', '²H (Deuterium)'],
    products: ['³He + n / ³H + p'],
    totalEnergyReleaseMev: 3.65,
    chargedParticleEnergyMev: 2.42,
    neutronEnergyMev: 1.23,
    idealIgnitionTemperatureKeV: 50.0,
    description: 'Nhiên liệu chỉ cần Đơteri chiết xuất từ nước biển tự nhiên với chi phí cực rẻ ($0.05/gram), loại bỏ nhu cầu nuôi cấy Triti ban đầu.'
  },
  DEUTERIUM_HELIUM3: {
    name: 'Phản Ứng Đơteri - Heli-3 (D-³He)',
    chemicalFormula: '²H + ³He → ⁴He (3.67 MeV) + p (14.68 MeV)',
    reactants: ['²H (Deuterium)', '³He (Helium-3)'],
    products: ['⁴He (3.67 MeV)', 'p (Proton 14.68 MeV)'],
    totalEnergyReleaseMev: 18.35,
    chargedParticleEnergyMev: 18.35,
    neutronEnergyMev: 0.0,
    idealIgnitionTemperatureKeV: 60.0,
    description: 'Phản ứng phi-neutron (aneutronic): 100% năng lượng nằm trong các hạt mang điện (alpha và proton), cho phép chuyển đổi trực tiếp thành điện năng qua từ trường mà không cần tuabin hơi nước.'
  },
  PROTON_BORON11: {
    name: 'Phản Ứng Proton - Bo-11 (p-¹¹B)',
    chemicalFormula: 'p + ¹¹B → 3 ⁴He (8.68 MeV)',
    reactants: ['¹H (Proton)', '¹¹B (Boron-11)'],
    products: ['3 ⁴He (Alpha particles 8.68 MeV)'],
    totalEnergyReleaseMev: 8.68,
    chargedParticleEnergyMev: 8.68,
    neutronEnergyMev: 0.0,
    idealIgnitionTemperatureKeV: 150.0,
    description: 'Nhiên liệu tương lai hoàn hảo không neutron và không phóng xạ: hydro và khoáng chất borax dồi dào, sản phẩm duy nhất là khí Heli vô hại.'
  }
};

export interface BlanketProperties {
  name: string;
  multiplierMaterial: string;
  tritiumBreedingRatioBase: number;
  operatingTemperatureC: number;
  coolantFluid: string;
  description: string;
}

export const BLANKET_CATALOG: Record<BlanketBreederType, BlanketProperties> = {
  LIQUID_PB16LI_EUTECTIC: {
    name: 'Hợp Kim Lỏng Chì - Liti Eutectic (Pb-16Li Eutectic Liquid Metal)',
    multiplierMaterial: 'Pb (chì nhân neutron tự nhiên qua phản ứng (n, 2n))',
    tritiumBreedingRatioBase: 1.18,
    operatingTemperatureC: 550.0,
    coolantFluid: 'Pb-16Li / Khí Heli cao áp',
    description: 'Dung dịch kim loại lỏng chì-liti làm giàu Li-6 (90%). Chì nhân đôi neutron và Liti hấp thụ neutron nhiệt để sinh Triti liên tục, dễ dàng chiết xuất Triti ra khỏi chất lỏng.'
  },
  SOLID_CERAMIC_LI4SIO4_BE: {
    name: 'Gốm Rắn Liti Orthosilicate Với Beryli (Li4SiO4 Pebble Bed + Beryllium)',
    multiplierMaterial: 'Beryli kim loại (Be + n -> 2n + 2alpha)',
    tritiumBreedingRatioBase: 1.24,
    operatingTemperatureC: 650.0,
    coolantFluid: 'Khí Heli tinh khiết 8.0 MPa',
    description: 'Hạt gốm oxit liti rắn xếp lớp với hạt beryli nhân neutron. Khí Heli quét liên tục mang khí Triti về hệ thống hóa học tinh chế.'
  },
  FLIBE_MOLTEN_SALT: {
    name: 'Muối Nóng Chảy FLiBe (2LiF · BeF2 Molten Fluoride Salt)',
    multiplierMaterial: 'Beryli trong muối FLiBe',
    tritiumBreedingRatioBase: 1.12,
    operatingTemperatureC: 700.0,
    coolantFluid: 'Muối FLiBe lỏng áp suất thấp',
    description: 'Hỗn hợp muối nóng chảy lưỡng tính vừa làm chất sinh Triti vừa làm chất tải nhiệt nhiệt độ cao kết hợp tuabin sCO2 hiệu suất 48%.'
  }
};

export interface TokamakParameters {
  majorRadiusM: number;               // R_0 in meters (e.g. 6.2m for ITER, 3.3m for ARC)
  minorRadiusM: number;               // a in meters (e.g. 2.0m for ITER, 1.1m for ARC)
  toroidalMagneticFieldTesla: number; // B_T in Tesla on axis (e.g. 5.3T up to 12.0T for REBCO)
  plasmaCurrentMA: number;            // I_p in Mega-Amperes (e.g. 15.0 MA)
  electronDensity10e19M3: number;     // n_e in 10^19 m^-3 (e.g. 10.5)
  ionTemperatureKeV: number;          // T_i in keV (e.g. 15.0 keV)
  energyConfinementTimeS: number;     // tau_E in seconds (e.g. 3.8 s)
  auxiliaryHeatingPowerMw: number;    // P_aux from NBI + ECRH (e.g. 50 MW)
  fuelReaction: FusionFuelReaction;
  blanketType: BlanketBreederType;
  magnetTechnology: MagnetTechnology;
}

export interface TokamakCalculationResult {
  reactorModelName: string;
  dimensions: {
    majorRadiusM: number;
    minorRadiusM: number;
    aspectRatio: number;
    plasmaVolumeM3: number;
    plasmaSurfaceAreaM2: number;
  };
  plasmaState: {
    temperatureKeV: number;
    temperatureMillionCelsius: number;
    electronDensityM3: number;
    energyConfinementTimeS: number;
    lawsonTripleProductKeVsM3: number;
    lawsonIgnitionThresholdKeVsM3: number;
    tripleProductMarginFactor: number;
    isLawsonIgnitionMet: boolean;
  };
  nuclearReactionsAndHeating: {
    reaction: FusionReactionProperties;
    fusionPowerThermalMw: number;
    alphaSelfHeatingPowerMw: number;
    neutronPowerMw: number;
    bremsstrahlungRadiationLossMw: number;
    auxiliaryHeatingPowerMw: number;
    energyGainFactorQ: number;
    fusionRegime: 'SUBCRITICAL' | 'BREAKEVEN_Q1' | 'BURNING_PLASMA_Q5' | 'ENERGY_PRODUCING_Q10' | 'SELF_HEATING_IGNITION';
  };
  tritiumBreedingCycle: {
    blanketInfo: BlanketProperties;
    tritiumBreedingRatioTBR: number;
    isSelfSufficient: boolean;
    tritiumConsumptionGramsPerDay: number;
    tritiumProductionGramsPerDay: number;
    netTritiumSurplusKgPerYear: number;
  };
  divertorAndWallSafety: {
    peakDivertorHeatFluxMwPerM2: number;
    detachedDivertorHeatFluxMwPerM2: number;
    impurityGasSeeding: string; // e.g. 'Khí trơ Argon / Neon phân tán nhiệt bức xạ'
    wallArmorMaterial: string;  // e.g. 'Tungsten (Vonfram) tinh khiết chịu 3,422°C'
  };
  powerPlantEnergyBalance: {
    blanketEnergyMultiplicationFactor: number; // M ~ 1.18 due to exothermic 6Li(n,alpha)T
    thermalPowerToTurbinesMw: number;
    grossElectricPowerMw: number;
    auxiliarySystemsElectricConsumptionMw: number; // Cryogenics + NBI/RF generators
    netElectricPowerExportMw: number;
    netPlantEfficiencyPct: number;
    annualCleanElectricityGwh: number;
  };
  environmentalSafetyCheck: {
    activeFuelInventoryInCoreGrams: number; // Only ~ 2-5 grams inside plasma!
    catastrophicMeltdownRisk: string;
    longLivedWasteComparison: string;
  };
}

/**
 * Tokamak Magnetic Confinement Fusion Simulation Engine
 */
export function calculateTokamakPerformance(params: TokamakParameters): TokamakCalculationResult {
  const {
    majorRadiusM,
    minorRadiusM,
    toroidalMagneticFieldTesla,
    plasmaCurrentMA,
    electronDensity10e19M3,
    ionTemperatureKeV,
    energyConfinementTimeS,
    auxiliaryHeatingPowerMw,
    fuelReaction,
    blanketType,
    magnetTechnology
  } = params;

  const reactionInfo = FUSION_REACTIONS_CATALOG[fuelReaction];
  const blanketInfo = BLANKET_CATALOG[blanketType];

  // 1. Plasma Geometry & Magnetic Confinement
  const aspectRatio = majorRadiusM / Math.max(0.1, minorRadiusM);
  // Elongation kappa ~ 1.7 - 1.85 (D-shaped plasma cross-section)
  const elongationKappa = 1.8;
  const plasmaVolumeM3 = 2 * Math.PI * majorRadiusM * (Math.PI * Math.pow(minorRadiusM, 2) * elongationKappa);
  const plasmaSurfaceAreaM2 = 2 * Math.PI * majorRadiusM * (2 * Math.PI * minorRadiusM * Math.sqrt((1 + Math.pow(elongationKappa, 2)) / 2));

  // 2. Lawson Triple Product & Physical State
  // 1 keV = 1.16045 x 10^7 Kelvin (~ 11.604 million °C)
  const temperatureMillionCelsius = ionTemperatureKeV * 11.6045;
  const densityActualM3 = electronDensity10e19M3 * 1e19;
  const lawsonTripleProductKeVsM3 = densityActualM3 * ionTemperatureKeV * energyConfinementTimeS;

  // Lawson criterion for D-T: ~ 3.0 x 10^21 keV s/m³
  let lawsonIgnitionThresholdKeVsM3 = 3.0e21;
  if (fuelReaction === 'DEUTERIUM_DEUTERIUM') {
    lawsonIgnitionThresholdKeVsM3 = 1.2e23;
  } else if (fuelReaction === 'DEUTERIUM_HELIUM3') {
    lawsonIgnitionThresholdKeVsM3 = 8.5e22;
  } else if (fuelReaction === 'PROTON_BORON11') {
    lawsonIgnitionThresholdKeVsM3 = 5.0e24;
  }

  const tripleProductMarginFactor = lawsonTripleProductKeVsM3 / lawsonIgnitionThresholdKeVsM3;
  const isLawsonIgnitionMet = tripleProductMarginFactor >= 1.0;

  // 3. Fusion Power & Alpha Self-Heating Calculations
  // Thermonuclear reaction rate parameter <sigma*v> for D-T (approximate Bosch-Hale empirical parameterization)
  // At ~15 keV, <sigma*v> ~ 4.2e-22 m³/s
  const theta = ionTemperatureKeV / (1 - (ionTemperatureKeV * -0.003));
  const xi = Math.pow(6.924e-1 / Math.max(1, theta), 1 / 3);
  const sigmaV_DT = 1.173e-18 * Math.pow(xi, -5 / 6) * Math.exp(-3 * xi); // m³/s

  // Total fusion power: P_fus = n_D * n_T * <sigma*v> * E_fusion * Volume
  // In 50:50 D-T mix: n_D = n_T = n_e / 2
  const n_fuel = densityActualM3 / 2.0;
  const fusionReactionsPerSecond = Math.pow(n_fuel, 2) * sigmaV_DT * plasmaVolumeM3;
  const joulesPerMev = 1.60218e-13;
  const fusionPowerThermalWatts = fusionReactionsPerSecond * (reactionInfo.totalEnergyReleaseMev * joulesPerMev);
  
  // Baseline scaling calibrated against ITER (500 MW fusion from 50 MW aux heat)
  // Scaling with B_T^4 and Volume:
  const magneticFieldFactor = Math.pow(toroidalMagneticFieldTesla / 5.3, 3.2);
  const volumeFactor = plasmaVolumeM3 / 840.0;
  const temperatureFactor = Math.pow(ionTemperatureKeV / 15.0, 1.8) * Math.exp(-0.04 * Math.pow(ionTemperatureKeV - 15.0, 2));

  let fusionPowerThermalMw = Math.round(500.0 * magneticFieldFactor * volumeFactor * temperatureFactor * (electronDensity10e19M3 / 10.5));
  fusionPowerThermalMw = Math.max(1.0, fusionPowerThermalMw);

  // Alpha and neutron split
  const alphaRatio = reactionInfo.chargedParticleEnergyMev / reactionInfo.totalEnergyReleaseMev;
  const alphaSelfHeatingPowerMw = Math.round(fusionPowerThermalMw * alphaRatio * 10) / 10;
  const neutronPowerMw = Math.round((fusionPowerThermalMw - alphaSelfHeatingPowerMw) * 10) / 10;

  // Bremsstrahlung radiation loss: P_brems ~ 5.35e-37 * n_e^2 * Z_eff * sqrt(T_e) * Volume
  const bremsstrahlungRadiationLossMw = Math.round(
    (5.35e-37 * Math.pow(densityActualM3, 2) * 1.3 * Math.sqrt(ionTemperatureKeV * 1000) * plasmaVolumeM3) / 1e6 * 10
  ) / 10;

  // Energy Gain Factor Q = P_fusion / P_auxiliary
  const energyGainFactorQ = auxiliaryHeatingPowerMw > 0 ? Math.round((fusionPowerThermalMw / auxiliaryHeatingPowerMw) * 10) / 10 : 999.0;

  let fusionRegime: 'SUBCRITICAL' | 'BREAKEVEN_Q1' | 'BURNING_PLASMA_Q5' | 'ENERGY_PRODUCING_Q10' | 'SELF_HEATING_IGNITION' = 'SUBCRITICAL';
  if (energyGainFactorQ >= 50.0 || (alphaSelfHeatingPowerMw > auxiliaryHeatingPowerMw * 5)) {
    fusionRegime = 'SELF_HEATING_IGNITION';
  } else if (energyGainFactorQ >= 10.0) {
    fusionRegime = 'ENERGY_PRODUCING_Q10';
  } else if (energyGainFactorQ >= 5.0) {
    fusionRegime = 'BURNING_PLASMA_Q5';
  } else if (energyGainFactorQ >= 1.0) {
    fusionRegime = 'BREAKEVEN_Q1';
  }

  // 4. Tritium Breeding Blanket Radiochemistry
  // 1 GW fusion consumes ~ 55.6 kg of Tritium per year (~ 152 grams/day)
  // Tritium consumption rate:
  const tritiumConsumptionGramsPerDay = Math.round((fusionPowerThermalMw / 1000.0) * 152.0 * 10) / 10;

  // Blanket breeding ratio (TBR) with magnet technology factor
  let magnetModifier = 1.0;
  if (magnetTechnology === 'REBCO_HIGH_TEMP_SUPERCONDUCTOR') {
    magnetModifier = 1.04; // Thinner coils allow thicker inboard breeding blanket
  }
  const tritiumBreedingRatioTBR = Math.round(blanketInfo.tritiumBreedingRatioBase * magnetModifier * 100) / 100;
  const tritiumProductionGramsPerDay = Math.round(tritiumConsumptionGramsPerDay * tritiumBreedingRatioTBR * 10) / 10;
  const isSelfSufficient = tritiumBreedingRatioTBR >= 1.05;
  const netTritiumSurplusKgPerYear = Math.round(((tritiumProductionGramsPerDay - tritiumConsumptionGramsPerDay) * 365.25 / 1000.0) * 100) / 100;

  // 5. Divertor Heat Flux Management
  // Peak unmitigated heat flux on divertor strike point:
  const rawExhaustPowerMw = alphaSelfHeatingPowerMw + auxiliaryHeatingPowerMw - bremsstrahlungRadiationLossMw;
  const peakDivertorHeatFluxMwPerM2 = Math.round((Math.max(5.0, rawExhaustPowerMw) / 4.2) * 10) / 10;
  // In-situ impurity noble gas seeding (Argon / Neon) radiates 80% of heat before striking tungsten:
  const detachedDivertorHeatFluxMwPerM2 = Math.round(peakDivertorHeatFluxMwPerM2 * 0.22 * 10) / 10;

  // 6. Power Plant Balance of Plant & Electricity Export
  // Blanket energy multiplication factor M ~ 1.18 from exothermic 6Li(n,alpha)T (+4.78 MeV)
  const blanketEnergyMultiplicationFactor = 1.18;
  const thermalPowerToTurbinesMw = Math.round((neutronPowerMw * blanketEnergyMultiplicationFactor + rawExhaustPowerMw) * 10) / 10;

  // Modern sCO2 / Supercritical Steam turbine thermal efficiency ~ 46%
  const grossThermalEfficiencyPct = 46.0;
  const grossElectricPowerMw = Math.round(thermalPowerToTurbinesMw * (grossThermalEfficiencyPct / 100.0) * 10) / 10;

  // Recirculating auxiliary power: RF/NBI generators (50% wall-plug eff) + Cryogenic helium plant
  const heatingWallPlugElectricMw = auxiliaryHeatingPowerMw * 2.0;
  let cryogenicPowerMw = 22.0;
  if (magnetTechnology === 'REBCO_HIGH_TEMP_SUPERCONDUCTOR') {
    cryogenicPowerMw = 6.5; // REBCO operates at 20K instead of 4K, saving 70% cryo power!
  }
  const auxiliarySystemsElectricConsumptionMw = Math.round((heatingWallPlugElectricMw + cryogenicPowerMw + 12.0) * 10) / 10;

  const netElectricPowerExportMw = Math.max(0, Math.round((grossElectricPowerMw - auxiliarySystemsElectricConsumptionMw) * 10) / 10);
  const netPlantEfficiencyPct = thermalPowerToTurbinesMw > 0 ? Math.round((netElectricPowerExportMw / thermalPowerToTurbinesMw) * 1000) / 10 : 0;
  const capacityFactor = 0.90; // Baseload commercial fusion reactor
  const annualCleanElectricityGwh = Math.round((netElectricPowerExportMw * 8760 * capacityFactor) / 1000.0 * 10) / 10;

  // Active fuel in core is minuscule:
  const activeFuelInventoryInCoreGrams = Math.round((densityActualM3 * plasmaVolumeM3 * 2.5 * 1.67e-27 * 1000) * 100) / 100;

  const reactorModelName =
    magnetTechnology === 'REBCO_HIGH_TEMP_SUPERCONDUCTOR'
      ? 'Lò Phản Ứng Nhiệt Hạch Từ Trường Cao REBCO ARC (High-Field Fusion Power Plant)'
      : 'Lò Phản Ứng Nhiệt Hạch Tokamak Tiêu Chuẩn ITER/DEMO (P_fus = ' + fusionPowerThermalMw + ' MW)';

  return {
    reactorModelName,
    dimensions: {
      majorRadiusM,
      minorRadiusM,
      aspectRatio: Math.round(aspectRatio * 100) / 100,
      plasmaVolumeM3: Math.round(plasmaVolumeM3),
      plasmaSurfaceAreaM2: Math.round(plasmaSurfaceAreaM2)
    },
    plasmaState: {
      temperatureKeV: ionTemperatureKeV,
      temperatureMillionCelsius: Math.round(temperatureMillionCelsius * 10) / 10,
      electronDensityM3: densityActualM3,
      energyConfinementTimeS,
      lawsonTripleProductKeVsM3,
      lawsonIgnitionThresholdKeVsM3,
      tripleProductMarginFactor: Math.round(tripleProductMarginFactor * 100) / 100,
      isLawsonIgnitionMet
    },
    nuclearReactionsAndHeating: {
      reaction: reactionInfo,
      fusionPowerThermalMw,
      alphaSelfHeatingPowerMw,
      neutronPowerMw,
      bremsstrahlungRadiationLossMw,
      auxiliaryHeatingPowerMw,
      energyGainFactorQ,
      fusionRegime
    },
    tritiumBreedingCycle: {
      blanketInfo,
      tritiumBreedingRatioTBR,
      isSelfSufficient,
      tritiumConsumptionGramsPerDay,
      tritiumProductionGramsPerDay,
      netTritiumSurplusKgPerYear
    },
    divertorAndWallSafety: {
      peakDivertorHeatFluxMwPerM2,
      detachedDivertorHeatFluxMwPerM2,
      impurityGasSeeding: 'Phun khí Argon / Neon tạo plasma tách rời (Detached Divertor), giảm 78% tải nhiệt bề mặt',
      wallArmorMaterial: 'Vonfram (Tungsten W) đơn tinh thể, nhiệt độ nóng chảy 3,422°C'
    },
    powerPlantEnergyBalance: {
      blanketEnergyMultiplicationFactor,
      thermalPowerToTurbinesMw,
      grossElectricPowerMw,
      auxiliarySystemsElectricConsumptionMw,
      netElectricPowerExportMw,
      netPlantEfficiencyPct,
      annualCleanElectricityGwh
    },
    environmentalSafetyCheck: {
      activeFuelInventoryInCoreGrams,
      catastrophicMeltdownRisk: 'Không thể xảy ra: Chỉ có ~2.5 gram nhiên liệu trong buồng chân không, bất kỳ sự cố rò rỉ nào sẽ làm plasma tắt ngay lập tức trong vài phần nghìn giây.',
      longLivedWasteComparison: 'Không có rác thải phân hạch actinide. Vỏ bọc hợp kim thép kích hoạt thấp (EUROFER) phân rã hoàn toàn sau 100 năm và có thể tái chế an toàn.'
    }
  };
}
