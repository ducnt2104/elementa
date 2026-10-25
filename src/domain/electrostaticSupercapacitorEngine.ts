// src/domain/electrostaticSupercapacitorEngine.ts
// Domain Engine: Electrostatic Supercapacitor Energy Storage with Graphene Hybrid Electrodes
// Standards: IUPAC Electrochemistry, Helmholtz Double-Layer & Pseudocapacitance, GDPT 2018 Physics & Fast Pulse Power

export type SupercapacitorElectrolyteType = 'ORGANIC_ACN_TEABF4' | 'IONIC_LIQUID_EMIM_TFSI' | 'AQUEOUS_NEUTRAL_SULFATE';
export type SupercapacitorElectrodeType = 'HIERARCHICAL_GRAPHENE' | 'ACTIVATED_CARBON_MAXSORB' | 'MXENE_TITANIUM_CARBIDE';

export interface SupercapacitorElectrolyteSpec {
  id: SupercapacitorElectrolyteType;
  name: string;
  chemicalFormula: string;
  nominalCellVoltageV: number;
  maxSurgeVoltageV: number;
  ionicConductivityMsPerCm: number;
  operatingTempMinC: number;
  operatingTempMaxC: number;
  internalResistanceEsrMilliohms: number;
  vietnameseFeature: string;
}

export interface SupercapacitorElectrodeSpec {
  id: SupercapacitorElectrodeType;
  name: string;
  materialComposition: string;
  betSurfaceAreaM2PerG: number;
  gravimetricCapacitanceFPerG: number;
  volumetricCapacitanceFPerCm3: number;
  cycleLifeMillionCycles: number;
  capacitanceRetentionAfterMillionCyclesPercent: number;
  vietnameseFeature: string;
}

export const SUPERCAPACITOR_ELECTROLYTES: Record<SupercapacitorElectrolyteType, SupercapacitorElectrolyteSpec> = {
  ORGANIC_ACN_TEABF4: {
    id: 'ORGANIC_ACN_TEABF4',
    name: '1.0 M TEABF4 trong Acetonitrile (Chuẩn Công Nghiệp Siêu Tốc)',
    chemicalFormula: '1.0 M (C2H5)4NBF4 / ACN',
    nominalCellVoltageV: 2.85,
    maxSurgeVoltageV: 3.0,
    ionicConductivityMsPerCm: 56.0,
    operatingTempMinC: -40,
    operatingTempMaxC: 65,
    internalResistanceEsrMilliohms: 0.18,
    vietnameseFeature: 'Độ dẫn ion cực đại (56 mS/cm) và độ nhớt siêu thấp của dung môi Acetonitrile giúp phóng dòng điện xung hàng ngàn Ampe trong micro-giây.'
  },
  IONIC_LIQUID_EMIM_TFSI: {
    id: 'IONIC_LIQUID_EMIM_TFSI',
    name: '[EMIM][TFSI] Muối Lỏng Ion Điện Áp Cao 3.8 V',
    chemicalFormula: '1-Ethyl-3-methylimidazolium TFSI',
    nominalCellVoltageV: 3.80,
    maxSurgeVoltageV: 4.0,
    ionicConductivityMsPerCm: 14.5,
    operatingTempMinC: -20,
    operatingTempMaxC: 90,
    internalResistanceEsrMilliohms: 0.45,
    vietnameseFeature: 'Cửa sổ điện áp mở rộng lên đến 3.8 V giúp mật độ năng lượng (tỉ lệ với V²) tăng gấp đôi; không bay hơi và không bốc cháy ở nhiệt độ cao.'
  },
  AQUEOUS_NEUTRAL_SULFATE: {
    id: 'AQUEOUS_NEUTRAL_SULFATE',
    name: '1.0 M Na2SO4 Dung Dịch Nước Trung Tính An Toàn',
    chemicalFormula: '1.0 M Na2SO4 trong H2O',
    nominalCellVoltageV: 2.0,
    maxSurgeVoltageV: 2.2,
    ionicConductivityMsPerCm: 82.0,
    operatingTempMinC: -5,
    operatingTempMaxC: 60,
    internalResistanceEsrMilliohms: 0.12,
    vietnameseFeature: 'Dung dịch muối sulfat nước trung tính 100% không độc hại, thân thiện môi trường, chi phí sản xuất cực rẻ cho lưu trữ xung điện lưới.'
  }
};

export const SUPERCAPACITOR_ELECTRODES: Record<SupercapacitorElectrodeType, SupercapacitorElectrodeSpec> = {
  HIERARCHICAL_GRAPHENE: {
    id: 'HIERARCHICAL_GRAPHENE',
    name: 'Graphene Cấu Trúc Đa Cấp 3D (Hierarchical Graphene)',
    materialComposition: 'Mạng Graphene 3D xốp mesopore + micropore',
    betSurfaceAreaM2PerG: 2800.0,
    gravimetricCapacitanceFPerG: 210.0,
    volumetricCapacitanceFPerCm3: 165.0,
    cycleLifeMillionCycles: 1.2,
    capacitanceRetentionAfterMillionCyclesPercent: 94.5,
    vietnameseFeature: 'Diện tích bề mặt riêng cực đại 2.800 m²/g với các kênh dẫn ion liên thông 3D ngăn chặn hoàn toàn hiện tượng xếp lớp dính chặt của các lá graphene.'
  },
  ACTIVATED_CARBON_MAXSORB: {
    id: 'ACTIVATED_CARBON_MAXSORB',
    name: 'Carbon Hoạt Tính Maxsorb Siêu Xốp',
    materialComposition: 'Than gáo dừa hoạt hóa KOH',
    betSurfaceAreaM2PerG: 2200.0,
    gravimetricCapacitanceFPerG: 145.0,
    volumetricCapacitanceFPerCm3: 120.0,
    cycleLifeMillionCycles: 1.0,
    capacitanceRetentionAfterMillionCyclesPercent: 91.0,
    vietnameseFeature: 'Giá thành thương mại rẻ nhất, độ tinh khiết cao, cấu trúc vi lỗ xốp đồng đều 1.5 - 2.0 nm phù hợp kích thước ion chất điện ly hữu cơ.'
  },
  MXENE_TITANIUM_CARBIDE: {
    id: 'MXENE_TITANIUM_CARBIDE',
    name: 'MXene Ti3C2Tx Hai Chiều Siêu Dẫn Điện',
    materialComposition: 'Lớp nano Ti3C2Tx chuyển tiếp kim loại',
    betSurfaceAreaM2PerG: 650.0,
    gravimetricCapacitanceFPerG: 380.0,
    volumetricCapacitanceFPerCm3: 900.0,
    cycleLifeMillionCycles: 0.8,
    capacitanceRetentionAfterMillionCyclesPercent: 88.0,
    vietnameseFeature: 'Điện dung giả Faradaic bề mặt cực lớn kết hợp dẫn điện kim loại (10.000 S/cm); đạt mật độ điện dung thể tích kỷ lục thế giới (900 F/cm³).'
  }
};

export interface RagonePerformancePoint {
  dischargeTimeSeconds: number;
  cellVoltageV: number;
  specificEnergyWhPerKg: number;
  specificPowerKWPerKg: number;
  roundTripEnergyEfficiencyPercent: number;
  maxMatchedImpedancePowerKWPerKg: number;
}

export interface RegenerativeBrakingResult {
  vehicleType: string;
  vehicleMassTons: number;
  initialSpeedKmh: number;
  brakingTimeSeconds: number;
  kineticEnergyRecoverableMJ: number;
  kineticEnergyKWh: number;
  peakBrakingPowerKW: number;
  supercapacitorBankCapacitanceF: number;
  supercapacitorBankMassKg: number;
  energyRecoveryEfficiencyPercent: number;
  annualElectricitySavedKWh: number;
  annualElectricityCostSavedUSD: number;
  annualAvoidedCO2Tons: number;
}

/**
 * 1. Calculates the Ragone performance (Specific Energy Wh/kg and Specific Power kW/kg) across discharge timescales (0.1s to 60s):
 * Energy: E = (1/2) * C * V^2 / 3.6 (Wh/kg)
 * Power: P = E / t_discharge (kW/kg)
 * Max Matched Power: P_max = V^2 / (4 * ESR) (kW/kg)
 */
export function calculateRagonePerformance(
  electrodeType: SupercapacitorElectrodeType = 'HIERARCHICAL_GRAPHENE',
  electrolyteType: SupercapacitorElectrolyteType = 'ORGANIC_ACN_TEABF4',
  dischargeTimeSeconds: number = 5.0
): RagonePerformancePoint {
  const electrode = SUPERCAPACITOR_ELECTRODES[electrodeType];
  const electrolyte = SUPERCAPACITOR_ELECTROLYTES[electrolyteType];
  const v = electrolyte.nominalCellVoltageV;

  // Single electrode capacitance C_single (F/g). In a symmetrical two-electrode cell:
  // C_cell = C_single / 4 (accounting for 2 electrodes in series and packaging factor ~0.5)
  const cellCapacitanceFPerG = electrode.gravimetricCapacitanceFPerG / 4.0;
  const cellCapacitanceFPerKg = cellCapacitanceFPerG * 1000.0;

  // Theoretical stored energy in cell active mass:
  // E = (1/2) * C * V^2 (Joules/kg) / 3600 = Wh/kg
  const theoreticalEnergyWhPerKg = (0.5 * cellCapacitanceFPerKg * Math.pow(v, 2)) / 3600.0;

  // Packaging factor for commercial cell (active materials constitute ~42% of total cell mass with foils, separator, casing):
  const cellPackagingFactor = 0.42;
  const practicalPackagedEnergyWhPerKg = theoreticalEnergyWhPerKg * cellPackagingFactor;

  // Effective IR drop at fast discharge:
  // t_discharge = RC timescale
  const esr = electrolyte.internalResistanceEsrMilliohms * 1e-3;
  const irLossFactor = Math.min(0.40, (esr * 15.0) / Math.max(0.1, dischargeTimeSeconds));
  const specificEnergyWhPerKg = practicalPackagedEnergyWhPerKg * (1.0 - irLossFactor);

  // Specific Power during discharge (kW/kg):
  const specificPowerKWPerKg = (specificEnergyWhPerKg * 3.6) / Math.max(0.05, dischargeTimeSeconds);

  // Maximum matched impedance power: P_max = V^2 / (4 * ESR) in kW/kg
  const maxMatchedImpedancePowerKWPerKg = (Math.pow(v, 2) / (4 * Math.max(1e-4, esr * 0.15))) / 1000.0;

  // Round-trip energy efficiency:
  const roundTripEnergyEfficiencyPercent = Math.max(78.0, 98.0 - 18.0 * (1.0 / Math.max(1.0, dischargeTimeSeconds)));

  return {
    dischargeTimeSeconds,
    cellVoltageV: v,
    specificEnergyWhPerKg,
    specificPowerKWPerKg,
    roundTripEnergyEfficiencyPercent,
    maxMatchedImpedancePowerKWPerKg
  };
}

/**
 * 2. Sizing a supercapacitor regenerative braking energy recovery system for electric transit:
 * Metro train (e.g. 220 tons at 80 km/h) or High-Speed Rail (400 tons at 160 km/h) or Electric Bus (18 tons at 60 km/h).
 */
export function sizeRegenerativeBrakingSystem(
  vehicleType: 'METRO_TRAIN' | 'HIGH_SPEED_RAIL' | 'ELECTRIC_BUS' = 'METRO_TRAIN',
  electrodeType: SupercapacitorElectrodeType = 'HIERARCHICAL_GRAPHENE',
  electrolyteType: SupercapacitorElectrolyteType = 'ORGANIC_ACN_TEABF4'
): RegenerativeBrakingResult {
  let vehicleMassTons = 220.0;
  let initialSpeedKmh = 80.0;
  let brakingTimeSeconds = 18.0;
  let dailyBrakingStops = 220;

  if (vehicleType === 'HIGH_SPEED_RAIL') {
    vehicleMassTons = 420.0;
    initialSpeedKmh = 160.0;
    brakingTimeSeconds = 35.0;
    dailyBrakingStops = 60;
  } else if (vehicleType === 'ELECTRIC_BUS') {
    vehicleMassTons = 18.0;
    initialSpeedKmh = 50.0;
    brakingTimeSeconds = 8.0;
    dailyBrakingStops = 450;
  }

  // Kinetic energy: E_k = (1/2) * m * v^2
  const massKg = vehicleMassTons * 1000.0;
  const speedMPerS = (initialSpeedKmh * 1000.0) / 3600.0;
  const kineticEnergyJoules = 0.5 * massKg * Math.pow(speedMPerS, 2);
  const kineticEnergyMJ = kineticEnergyJoules / 1e6;
  const kineticEnergyKWh = kineticEnergyJoules / 3.6e6;

  // Peak electrical braking power (kW):
  const peakBrakingPowerKW = (kineticEnergyJoules / brakingTimeSeconds) / 1000.0;

  // Supercapacitor bank sizing:
  // Operates between V_max (e.g. 750 V DC transit bus) and V_min (V_max / 2)
  // Recoverable energy Delta_E = (3/4) * (1/2) * C * V_max^2
  const busVoltageMaxV = 750.0;
  const energyRecoveryEfficiencyPercent = 92.5; // High efficiency of EDLC
  const energyToStoreJoules = kineticEnergyJoules * (energyRecoveryEfficiencyPercent / 100.0);
  const bankCapacitanceF = energyToStoreJoules / (0.375 * Math.pow(busVoltageMaxV, 2));

  // Bank mass from Ragone energy density at braking timescale:
  const ragone = calculateRagonePerformance(electrodeType, electrolyteType, brakingTimeSeconds);
  const supercapacitorBankMassKg = (energyToStoreJoules / 3600.0) / Math.max(1.0, ragone.specificEnergyWhPerKg);

  // Annual electricity saved & cost:
  const annualElectricitySavedKWh = kineticEnergyKWh * (energyRecoveryEfficiencyPercent / 100.0) * dailyBrakingStops * 365;
  const electricityRateUSDPerKWh = 0.12;
  const annualElectricityCostSavedUSD = annualElectricitySavedKWh * electricityRateUSDPerKWh;
  const annualAvoidedCO2Tons = (annualElectricitySavedKWh * 0.55) / 1000.0;

  return {
    vehicleType,
    vehicleMassTons,
    initialSpeedKmh,
    brakingTimeSeconds,
    kineticEnergyRecoverableMJ: kineticEnergyMJ,
    kineticEnergyKWh,
    peakBrakingPowerKW,
    supercapacitorBankCapacitanceF: bankCapacitanceF,
    supercapacitorBankMassKg,
    energyRecoveryEfficiencyPercent,
    annualElectricitySavedKWh,
    annualElectricityCostSavedUSD,
    annualAvoidedCO2Tons
  };
}
