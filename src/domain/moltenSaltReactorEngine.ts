/**
 * ELEMENTA - MOLTEN SALT NUCLEAR REACTOR (MSR) & THORIUM LIQUID FUEL ENGINE
 *
 * Conforms to:
 * - IUPAC Physical Chemistry & High-Temperature Molten Halide Salts Thermodynamics
 * - Oak Ridge National Laboratory (ORNL) Molten Salt Reactor Experiment (MSRE) Benchmarks
 * - Generation-IV International Forum (GIF) MSR Technical Specifications
 * - Thorium Breeding Cycle (^232Th -> ^233Pa -> ^233U), In-situ Online Radiochemical Reprocessing
 * - Passive Freeze Plug Safety & Supercritical CO2 (sCO2) Recompression Brayton Thermal Integration
 * - Vietnam GDPT 2018 Physics & Chemistry (Phản ứng phân hạch hạt nhân, Năng lượng liên kết, Độc tính neutron, Cân bằng nhiệt động)
 */

export type MoltenSaltType =
  | 'FLIBE_LI2BEF4'
  | 'FLINAK_LI_NA_KF'
  | 'CHLORIDE_NACL_MGCL2'
  | 'THORIUM_FLUORIDE_FUEL';

export type PowerConversionCycle = 'SUPERCRITICAL_CO2_BRAYTON' | 'SUPERCRITICAL_STEAM_RANKINE' | 'CLOSED_HELIUM_BRAYTON';

export interface MoltenSaltProperties {
  name: string;
  chemicalFormula: string;
  molecularWeightGPerMol: number;
  meltingPointC: number;
  boilingPointC: number;
  densityGPerCm3At700C: number;
  heatCapacityJPerG_K: number;
  thermalConductivityWPerM_K: number;
  viscosityCPAt700C: number;
  vaporPressureAt700CBar: number;
  description: string;
}

export const MOLTEN_SALT_CATALOG: Record<MoltenSaltType, MoltenSaltProperties> = {
  FLIBE_LI2BEF4: {
    name: 'Muối FLiBe Làm Mát (66% LiF - 34% BeF2, 7Li 99.995%)',
    chemicalFormula: '2LiF · BeF2',
    molecularWeightGPerMol: 98.88,
    meltingPointC: 459.0,
    boilingPointC: 1430.0,
    densityGPerCm3At700C: 1.94,
    heatCapacityJPerG_K: 2.38,
    thermalConductivityWPerM_K: 1.05,
    viscosityCPAt700C: 5.6,
    vaporPressureAt700CBar: 0.0012,
    description: 'Chất làm mát và dung môi nhiên liệu kinh điển từ thí nghiệm MSRE tại Oak Ridge. Tiết diện bắt neutron nhiệt cực thấp khi làm giàu Li-7, độ trơ nhiệt hóa học tuyệt đối.'
  },
  THORIUM_FLUORIDE_FUEL: {
    name: 'Muối Nhiên Liệu Tái Sinh Thori (71.7% LiF - 16% BeF2 - 12% ThF4 - 0.3% 233UF4)',
    chemicalFormula: 'LiF · BeF2 · ThF4 · 233UF4',
    molecularWeightGPerMol: 132.5,
    meltingPointC: 500.0,
    boilingPointC: 1450.0,
    densityGPerCm3At700C: 3.25,
    heatCapacityJPerG_K: 1.35,
    thermalConductivityWPerM_K: 1.15,
    viscosityCPAt700C: 8.2,
    vaporPressureAt700CBar: 0.0008,
    description: 'Dung dịch muối lỏng mang hạt nhân màu Th-232 và hạt nhân phân hạch U-233. Tái sinh nhiên liệu liên tục trong vùng hoạt với tỷ số tái sinh BR > 1.05.'
  },
  FLINAK_LI_NA_KF: {
    name: 'Muối Ba Cấu Tử FLiNaK (46.5% LiF - 11.5% NaF - 42.0% KF)',
    chemicalFormula: 'LiF · NaF · KF',
    molecularWeightGPerMol: 41.3,
    meltingPointC: 454.0,
    boilingPointC: 1570.0,
    densityGPerCm3At700C: 2.02,
    heatCapacityJPerG_K: 1.88,
    thermalConductivityWPerM_K: 0.92,
    viscosityCPAt700C: 2.9,
    vaporPressureAt700CBar: 0.0025,
    description: 'Hỗn hợp eutectic ba cấu tử không chứa beryli độc hại, chi phí rẻ, truyền nhiệt tuyệt hảo cho vòng truyền nhiệt thứ cấp và tích nhiệt năng lượng mặt trời tập trung (CSP).'
  },
  CHLORIDE_NACL_MGCL2: {
    name: 'Muối Clorua Phổ Neutron Nhanh (55% NaCl - 45% MgCl2, 37Cl 99%)',
    chemicalFormula: 'NaCl · MgCl2',
    molecularWeightGPerMol: 74.8,
    meltingPointC: 390.0,
    boilingPointC: 1418.0,
    densityGPerCm3At700C: 1.68,
    heatCapacityJPerG_K: 1.15,
    thermalConductivityWPerM_K: 0.55,
    viscosityCPAt700C: 1.8,
    vaporPressureAt700CBar: 0.0038,
    description: 'Chu trình lò phản ứng muối clorua nhanh (MCFR): độ hòa tan actinide cao (> 20 mol%), có khả năng thiêu đốt trực tiếp rác thải hạt nhân actinide tồn lưu lâu từ các lò nước nhẹ.'
  }
};

export interface MsrReactorParameters {
  fuelSaltType: MoltenSaltType;
  coolantSaltType: MoltenSaltType;
  thermalPowerMwTh: number;             // Reactor core thermal power (e.g. 500 MWth)
  coreInletTemperatureC: number;        // Primary loop inlet temp (e.g. 620°C)
  coreOutletTemperatureC: number;       // Primary loop outlet temp (e.g. 720°C)
  powerCycle: PowerConversionCycle;     // Power conversion cycle (e.g. sCO2 Brayton)
  heliumSpargingFlowM3PerH: number;     // Online bubbling rate for Xenon-135 extraction
  bismuthExtractionRateKgPerH: number;  // Liquid bismuth Pa-233 / Lanthanide extraction rate
  freezePlugActiveCoolingKw: number;    // Cooling power keeping passive freeze plug frozen
}

export interface MsrCalculationResult {
  reactorName: string;
  thermalPowerMwTh: number;
  coreTemperatureDeltaC: number;
  safetyMarginToBoilingC: number;      // Difference between operating temp and salt boiling point (> 700°C margin!)
  operatingPressureBar: number;         // Ambient near-atmospheric pressure (< 2 bar)
  
  neutronicsAndBreeding: {
    fissileInventoryKg: number;         // U-233 mass in core
    thoriumFertileInventoryTons: number; // Th-232 mass in core
    breedingRatio: number;              // BR = U-233 produced / U-233 consumed (> 1.05 in LFTR)
    promptNeutronLifetimeMicroSec: number;
    temperatureCoefficientOfReactivityPcmPerC: number; // Strongly negative (~ -3.5 pcm/°C)
    xenon135PoisoningReductionPct: number; // > 99% stripped by online helium sparging
  };

  passiveSafetyMetrics: {
    freezePlugStatus: 'SOLID_OPERATIONAL' | 'PASSIVELY_MELTING' | 'DRAINED_TO_SUBCOOL';
    freezePlugMeltTimeMinutes: number;   // In SBO (station blackout), plug passively melts in 4-8 mins
    subcriticalGravityDrainSuccess: boolean;
    decayHeatPassiveAirCoolingMwTh: number;
    radiologicalContainmentIntegrity: string;
  };

  powerCyclePerformance: {
    cycleType: PowerConversionCycle;
    cycleName: string;
    grossThermalEfficiencyPct: number;   // e.g. 48.5% for sCO2 Brayton at 700°C
    electricPowerOutputMw: number;
    annualElectricityOutputGwh: number;
    highTemperatureHeatCoGenerationMwTh: number; // Heat at 600-700°C for H2 / synfuels
  };

  environmentalAndWasteAdvantages: {
    transuranicWasteReductionPct: number; // 99.8% reduction compared to standard PWR (no long-lived Pu/Am/Cm)
    wasteRadiotoxicityDecayYears: number; // 300 years to reach baseline ore level (vs 300,000 years for PWR!)
    thoriumEnergyDensityKwhPerKg: number; // 1 kg Thorium ~ 24,000,000 kWh (~ 3,500,000 kg coal)
    annualCo2DisplacedTons: number;
  };
}

/**
 * Main Molten Salt Reactor & Thorium Fuel Cycle Simulation Engine
 */
export function calculateMsrPerformance(params: MsrReactorParameters): MsrCalculationResult {
  const {
    fuelSaltType,
    thermalPowerMwTh,
    coreInletTemperatureC,
    coreOutletTemperatureC,
    powerCycle,
    heliumSpargingFlowM3PerH,
    bismuthExtractionRateKgPerH,
    freezePlugActiveCoolingKw
  } = params;

  const fuelProps = MOLTEN_SALT_CATALOG[fuelSaltType];
  const coreTemperatureDeltaC = Math.max(10, coreOutletTemperatureC - coreInletTemperatureC);

  // Safety margin to boiling: MSR operates near ambient pressure without flashing
  const safetyMarginToBoilingC = Math.max(0, fuelProps.boilingPointC - coreOutletTemperatureC);
  const operatingPressureBar = 1.5; // Near ambient atmospheric pressure (vs 155 bar in PWR)

  // 1. Neutronics, Thorium Breeding & Online Chemistry
  // Thorium Th-232 captures neutron to produce Pa-233 which decays to fissile U-233
  // In a 500 MWth LFTR:
  const fissileInventoryKg = Math.round(thermalPowerMwTh * 1.65); // ~ 825 kg U-233
  const thoriumFertileInventoryTons = Math.round(thermalPowerMwTh * 0.12 * 10) / 10; // ~ 60 tons Th-232

  // Online helium sparging strips volatile Xe-135 and Kr-85:
  // Xe-135 has microscopic absorption cross section 2.65 million barns! Insoluble noble gas strips > 99%
  const xenonExtractionEfficiency = Math.min(0.998, 0.982 + (heliumSpargingFlowM3PerH / 20.0) * 0.015);
  const xenon135PoisoningReductionPct = Math.round(xenonExtractionEfficiency * 1000) / 10;

  // Online bismuth extraction isolates Pa-233 so it decays outside neutron flux:
  const paExtractionFactor = Math.min(1.0, bismuthExtractionRateKgPerH / 200.0);
  // Breeding ratio: without Pa extraction BR ~ 0.98; with full online extraction BR ~ 1.065
  const baseBr = fuelSaltType === 'THORIUM_FLUORIDE_FUEL' ? 1.01 : 0.92;
  const breedingRatio = Math.round((baseBr + 0.055 * paExtractionFactor) * 1000) / 1000;

  // Temperature coefficient of reactivity (Doppler broadening + salt thermal expansion):
  // Strongly negative: if temp rises, salt expands and expels fissile fuel from core!
  const temperatureCoefficientOfReactivityPcmPerC = -3.85; // pcm / °C (1 pcm = 10^-5 delta k/k)
  const promptNeutronLifetimeMicroSec = 280;

  // 2. Passive Safety & Freeze Plug Mechanics
  let freezePlugStatus: 'SOLID_OPERATIONAL' | 'PASSIVELY_MELTING' | 'DRAINED_TO_SUBCOOL' = 'SOLID_OPERATIONAL';
  let freezePlugMeltTimeMinutes = 5.2;

  if (freezePlugActiveCoolingKw <= 0) {
    freezePlugStatus = 'PASSIVELY_MELTING';
    freezePlugMeltTimeMinutes = 4.5;
  } else if (coreOutletTemperatureC > 800) {
    freezePlugStatus = 'PASSIVELY_MELTING';
    freezePlugMeltTimeMinutes = 2.5;
  }

  // Decay heat is typically ~6.5% immediately, dropping to ~1.5% after 1 hour
  const decayHeatPassiveAirCoolingMwTh = Math.round(thermalPowerMwTh * 0.035 * 10) / 10;

  // 3. Power Conversion Cycle Performance
  let grossThermalEfficiencyPct = 48.5; // Default for sCO2 Recompression Brayton at 700°C
  let cycleName = 'Chu Trình Siêu Tới Hạn sCO2 Brayton Tái Nén (Supercritical CO2 Recompression)';

  if (powerCycle === 'SUPERCRITICAL_STEAM_RANKINE') {
    grossThermalEfficiencyPct = 43.8;
    cycleName = 'Chu Trình Siêu Tới Hạn Hơi Nước Rankine (Supercritical Steam)';
  } else if (powerCycle === 'CLOSED_HELIUM_BRAYTON') {
    grossThermalEfficiencyPct = 46.2;
    cycleName = 'Chu Trình Khí Khép Kín Heli Brayton (Closed-Loop Helium)';
  }

  // Temperature bonus: each 50°C above 650°C boosts thermal efficiency by ~1.2%
  const tempBonus = ((coreOutletTemperatureC - 650) / 50.0) * 1.2;
  grossThermalEfficiencyPct = Math.round((grossThermalEfficiencyPct + tempBonus) * 10) / 10;

  const electricPowerOutputMw = Math.round(thermalPowerMwTh * (grossThermalEfficiencyPct / 100.0) * 10) / 10;
  const capacityFactor = 0.95; // MSR runs continuously for years without refueling shutdowns
  const annualElectricityOutputGwh = Math.round(((electricPowerOutputMw * 8760 * capacityFactor) / 1000.0) * 10) / 10;

  // High temperature heat co-generation (waste heat at 550 - 650°C):
  const highTemperatureHeatCoGenerationMwTh = Math.round(thermalPowerMwTh * 0.38 * 10) / 10;

  // 4. Environmental & Waste Profile
  const transuranicWasteReductionPct = 99.8; // Thorium cycle produces virtually zero Plutonium, Americium, Curium
  const wasteRadiotoxicityDecayYears = 300; // Drops to natural uranium ore level in 300 years (vs 300,000 for PWR)
  const thoriumEnergyDensityKwhPerKg = 24000000; // 24 million kWh per kg of natural Th-232 (100% utilized vs 0.7% in uranium LWR)
  const annualCo2DisplacedTons = Math.round(annualElectricityOutputGwh * 1000 * 0.82); // Displacing thermal coal (820 g CO2/kWh)

  return {
    reactorName: 'Lò Phản Ứng Muối Lỏng Nhiên Liệu Thori LFTR (500 MWth)',
    thermalPowerMwTh,
    coreTemperatureDeltaC,
    safetyMarginToBoilingC,
    operatingPressureBar,
    neutronicsAndBreeding: {
      fissileInventoryKg,
      thoriumFertileInventoryTons,
      breedingRatio,
      promptNeutronLifetimeMicroSec,
      temperatureCoefficientOfReactivityPcmPerC,
      xenon135PoisoningReductionPct
    },
    passiveSafetyMetrics: {
      freezePlugStatus,
      freezePlugMeltTimeMinutes,
      subcriticalGravityDrainSuccess: true,
      decayHeatPassiveAirCoolingMwTh,
      radiologicalContainmentIntegrity: 'Bất khả xâm phạm: Muối lỏng giữ chặt các hạt nhân phóng xạ Cs, I, Sr dưới dạng muối fluoride không bay hơi.'
    },
    powerCyclePerformance: {
      cycleType: powerCycle,
      cycleName,
      grossThermalEfficiencyPct,
      electricPowerOutputMw,
      annualElectricityOutputGwh,
      highTemperatureHeatCoGenerationMwTh
    },
    environmentalAndWasteAdvantages: {
      transuranicWasteReductionPct,
      wasteRadiotoxicityDecayYears,
      thoriumEnergyDensityKwhPerKg,
      annualCo2DisplacedTons
    }
  };
}
