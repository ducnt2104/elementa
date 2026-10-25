// src/domain/directEthanolSolidOxideEngine.ts
// Domain Engine: Direct Ethanol Solid Oxide Fuel Cell (DE-SOFC) Carbon-Neutral Biofuel Co-Generation
// Standards: IUPAC Electrochemistry, Intermediate-Temperature SOFC (IT-SOFC / PCFC), GDPT 2018 Chemistry & Agricultural Biomass CHP

export type DeSofcElectrolyteType = 'BZCY_PROTONIC' | 'SDC_CERIA' | 'YSZ_ZIRCONIA';
export type DeSofcAnodeType = 'SFMO_DOUBLE_PEROVSKITE' | 'CU_CERIA_YSZ' | 'BAO_NICKEL_YSZ' | 'STANDARD_NI_YSZ';

export interface DeSofcElectrolyteSpec {
  id: DeSofcElectrolyteType;
  name: string;
  chemicalFormula: string;
  chargeCarrier: 'H+' | 'O2-';
  minTempC: number;
  maxTempC: number;
  defaultTempC: number;
  activationEnergyEv: number;
  preExponentialConductivitySPerCm: number;
  standardThicknessUm: number;
  faradaicTransportNumber: number;
  vietnameseDescription: string;
  waterFormationSide: 'CATHODE' | 'ANODE';
}

export interface DeSofcAnodeSpec {
  id: DeSofcAnodeType;
  name: string;
  chemicalComposition: string;
  cokingResistanceRating: 'ULTRA_HIGH' | 'HIGH' | 'MODERATE' | 'LOW';
  cokingResistanceFactor: number; // 0.2 to 0.98
  minSafeSteamCarbonRatio: number;
  exchangeCurrentDensityBaseAcm2: number;
  vietnameseFeature: string;
  catalyticMechanism: string;
}

export const DE_SOFC_ELECTROLYTES: Record<DeSofcElectrolyteType, DeSofcElectrolyteSpec> = {
  BZCY_PROTONIC: {
    id: 'BZCY_PROTONIC',
    name: 'BaCe0.7Zr0.1Y0.2O3-δ (Gốm Dẫn Proton PCFC)',
    chemicalFormula: 'BaCe0.7Zr0.1Y0.2O3-δ',
    chargeCarrier: 'H+',
    minTempC: 550,
    maxTempC: 700,
    defaultTempC: 650,
    activationEnergyEv: 0.45,
    preExponentialConductivitySPerCm: 14000.0,
    standardThicknessUm: 15,
    faradaicTransportNumber: 0.97,
    vietnameseDescription: 'Chất điện phân dẫn proton BZCY. H+ di chuyển qua màng tạo nước tại cathode, giúp khí CO2 thoát ra từ cực anode đạt độ tinh khiết 100% không bị hơi nước pha loãng, sẵn sàng tuần hoàn sinh khối.',
    waterFormationSide: 'CATHODE'
  },
  SDC_CERIA: {
    id: 'SDC_CERIA',
    name: 'Sm0.2Ce0.8O1.9 (Samarium-Doped Ceria IT-SOFC)',
    chemicalFormula: 'Sm0.2Ce0.8O1.9',
    chargeCarrier: 'O2-',
    minTempC: 600,
    maxTempC: 750,
    defaultTempC: 650,
    activationEnergyEv: 0.68,
    preExponentialConductivitySPerCm: 48000.0,
    standardThicknessUm: 20,
    faradaicTransportNumber: 0.92,
    vietnameseDescription: 'Chất điện phân Ceria pha tạp Samarium dẫn ion O2- với độ dẫn ion cao vượt trội ở dải nhiệt độ trung gian 600-750°C, giảm điện trở nội Ohmic.',
    waterFormationSide: 'ANODE'
  },
  YSZ_ZIRCONIA: {
    id: 'YSZ_ZIRCONIA',
    name: '8YSZ (8 mol% Y2O3-Stabilized Zirconia)',
    chemicalFormula: '(ZrO2)0.92(Y2O3)0.08',
    chargeCarrier: 'O2-',
    minTempC: 700,
    maxTempC: 850,
    defaultTempC: 750,
    activationEnergyEv: 0.92,
    preExponentialConductivitySPerCm: 90000.0,
    standardThicknessUm: 15,
    faradaicTransportNumber: 0.99,
    vietnameseDescription: 'Chất điện phân Zirconia ổn định Yttria kinh điển, độ bền cơ hóa học cực cao, dẫn ion oxy O2- hoàn hảo ở nhiệt độ cao 750-850°C.',
    waterFormationSide: 'ANODE'
  }
};

export const DE_SOFC_ANODES: Record<DeSofcAnodeType, DeSofcAnodeSpec> = {
  SFMO_DOUBLE_PEROVSKITE: {
    id: 'SFMO_DOUBLE_PEROVSKITE',
    name: 'Sr2Fe1.5Mo0.5O6-δ (Double Perovskite Chống Muội Than)',
    chemicalComposition: 'Sr2Fe1.5Mo0.5O6-δ (SFMO)',
    cokingResistanceRating: 'ULTRA_HIGH',
    cokingResistanceFactor: 0.96,
    minSafeSteamCarbonRatio: 1.0,
    exchangeCurrentDensityBaseAcm2: 0.32,
    vietnameseFeature: 'Cấu trúc Double Perovskite SFMO không chứa Niken kim loại tự do, loại bỏ hoàn toàn cơ chế tạo sợi than graphite bọc điện cực; tự phân tách hạt nano Fe-Mo siêu xúc tác.',
    catalyticMechanism: 'Exsolution hạt nano Fe-Mo bề mặt xúc tác phân cắt liên kết C-C ethanol mà không tạo muội than sợi.'
  },
  CU_CERIA_YSZ: {
    id: 'CU_CERIA_YSZ',
    name: 'Cu-CeO2-YSZ (Cermet Đồng - Ceria Hoạt Tính)',
    chemicalComposition: 'Cu (20 wt%) + CeO2 (15 wt%) + 8YSZ',
    cokingResistanceRating: 'HIGH',
    cokingResistanceFactor: 0.88,
    minSafeSteamCarbonRatio: 1.5,
    exchangeCurrentDensityBaseAcm2: 0.28,
    vietnameseFeature: 'Đồng (Cu) dẫn điện tốt nhưng trơ với phản ứng cracking C-C tạo than chì; CeO2 có dung lượng lưu trữ oxy di động cao giúp oxy hóa tức thì các mảnh cacbon hữu cơ.',
    catalyticMechanism: 'Chuyển dịch oxy mạng tinh thể Ce4+ <-> Ce3+ liên tục đốt sạch màng cacbon bám dính.'
  },
  BAO_NICKEL_YSZ: {
    id: 'BAO_NICKEL_YSZ',
    name: 'Ni-BaO/YSZ (Niken Biến Tính Nano-BaO)',
    chemicalComposition: 'Ni (40 wt%) + BaO (5 wt%) + YSZ',
    cokingResistanceRating: 'MODERATE',
    cokingResistanceFactor: 0.72,
    minSafeSteamCarbonRatio: 2.0,
    exchangeCurrentDensityBaseAcm2: 0.38,
    vietnameseFeature: 'Đảo nano BaO hấp phụ hơi nước phân tử cực mạnh, sinh ra các gốc hydroxyl OH* cục bộ liên tục khí hóa cacbon trên các hạt Niken kim loại.',
    catalyticMechanism: 'C* + OH* -> CO + H* trên biên pha ba hạt BaO-Ni.'
  },
  STANDARD_NI_YSZ: {
    id: 'STANDARD_NI_YSZ',
    name: 'Ni-YSZ Chuẩn (Cermet Niken Truyền Thống)',
    chemicalComposition: 'Ni (50 wt%) + 8YSZ (50 wt%)',
    cokingResistanceRating: 'LOW',
    cokingResistanceFactor: 0.35,
    minSafeSteamCarbonRatio: 3.0,
    exchangeCurrentDensityBaseAcm2: 0.42,
    vietnameseFeature: 'Hoạt tính khử hydro cao nhưng Niken kim loại đóng vai trò tâm mầm kết tinh sợi graphite; dễ bị ngộ độc muội than nứt vỡ nếu tỉ lệ hơi nước S/C < 3.0.',
    catalyticMechanism: 'Niken xúc tác mạnh phản ứng Methane cracking và Boudouard tạo muội than dạng sợi.'
  }
};

export interface EthanolReformingInput {
  temperatureC: number;
  steamToCarbonRatio: number; // S/C ratio, e.g. 1.0 to 3.5
  anodeType: DeSofcAnodeType;
  ethanolFeedLph: number; // Liquid bio-ethanol feed rate in L/h
}

export interface EthanolReformingEquilibrium {
  temperatureC: number;
  steamToCarbonRatio: number;
  equilibriumH2Percent: number;
  equilibriumCOPercent: number;
  equilibriumCO2Percent: number;
  equilibriumCH4Percent: number;
  equilibriumH2OPercent: number;
  cokingResistancePercent: number;
  carbonDepositionRisk: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  reformingEnthalpyKJPerMolEthanol: number;
  internalReformingFraction: number;
}

export interface DeSofcStackSpecs {
  cellCount: number; // e.g. 60 cells
  cellActiveAreaCm2: number; // e.g. 100 cm2
  electrolyteType: DeSofcElectrolyteType;
  anodeType: DeSofcAnodeType;
}

export interface DeSofcPolarizationPoint {
  currentDensityAcm2: number;
  cellVoltageV: number;
  powerDensityWcm2: number;
  activationOverpotentialV: number;
  ohmicOverpotentialV: number;
  concentrationOverpotentialV: number;
}

export interface DeSofcOperatingPerformance {
  operatingCurrentDensityAcm2: number;
  cellVoltageV: number;
  stackVoltageV: number;
  stackElectricPowerKW: number;
  exhaustThermalPowerKW: number;
  totalChpPowerKW: number;
  electricalEfficiencyLHVPercent: number;
  thermalEfficiencyPercent: number;
  chpTotalEfficiencyPercent: number;
  fuelConsumptionLph: number;
  exhaustGasTempC: number;
  netLifecycleCO2EmissionsKgPerYear: number; // 0.0 for closed biomass cycle
  avoidedCO2EmissionsTonsPerYear: number;
  cokingRiskStatus: string;
}

export interface RuralMicrogridSizingResult {
  targetElectricPowerKW: number;
  stackCount: number;
  totalCells: number;
  dailyBioEthanolConsumptionLiters: number;
  dailyElectricOutputKWh: number;
  dailyThermalHeatMJ: number;
  annualAvoidedDieselCostUSD: number;
  annualAvoidedCO2Tons: number;
  agriculturalWasteFeedstockTonsPerYear: number;
}

// Physical constants
const FARADAY = 96485.3321; // C/mol
const GAS_CONST_R = 8.31446; // J/(mol*K)
const ETHANOL_LHV_MJ_PER_KG = 26.8; // Lower Heating Value of Ethanol
const ETHANOL_DENSITY_KG_PER_L = 0.789; // kg/L
const ETHANOL_MOLAR_MASS_G = 46.069; // g/mol
const DIESEL_EMISSIONS_KG_PER_KWH = 0.85; // kg CO2/kWh from agricultural diesel generator
const DIESEL_COST_PER_LITER_USD = 1.05; // USD/L diesel

/**
 * 1. Simulates thermodynamic internal steam reforming of bio-ethanol:
 * C2H5OH + 3 H2O <-> 2 CO2 + 6 H2 (Complete Reforming, deltaH° = +174 kJ/mol)
 * Side reactions: C2H5OH -> CH4 + CO + H2; CO + H2O <-> CO2 + H2 (WGS); 2 CO <-> C + CO2 (Boudouard)
 */
export function calculateEthanolReformingEquilibrium(
  input: EthanolReformingInput
): EthanolReformingEquilibrium {
  const { temperatureC, steamToCarbonRatio, anodeType } = input;
  const anodeSpec = DE_SOFC_ANODES[anodeType];
  const scRatio = Math.max(0.5, steamToCarbonRatio);
  const tempK = temperatureC + 273.15;

  // Temperature normalized factor (550 - 800 °C)
  const tempFactor = (temperatureC - 550) / 250;

  // Steam to Carbon ratio effect: high S/C drives equilibrium towards CO2 and H2 via Water-Gas Shift
  // Stoichiometric complete reforming requires S/C = 3/2 = 1.5 (3 H2O per 2 Carbon atoms)
  const scAdvantage = Math.min(1.0, (scRatio - 0.5) / 2.5);

  // Equilibrium dry gas fractions:
  // Baseline complete conversion: 6 H2 (75%) + 2 CO2 (25%) = 8 mol products per mol ethanol
  // At intermediate temp (600-700°C), some CO and trace CH4 exist
  const baseH2 = 62.0 + 10.0 * scAdvantage + 4.0 * tempFactor;
  const baseCO = Math.max(2.0, 16.0 * (1.0 - 0.65 * scAdvantage) + 3.0 * tempFactor);
  const baseCO2 = Math.max(10.0, 20.0 * (0.6 + 0.4 * scAdvantage) - 2.0 * tempFactor);
  const baseCH4 = Math.max(0.2, 5.0 * (1.0 - scAdvantage) * Math.exp(-(temperatureC - 550) / 60));

  const total = baseH2 + baseCO + baseCO2 + baseCH4;
  const equilibriumH2Percent = (baseH2 / total) * 100;
  const equilibriumCOPercent = (baseCO / total) * 100;
  const equilibriumCO2Percent = (baseCO2 / total) * 100;
  const equilibriumCH4Percent = (baseCH4 / total) * 100;
  const equilibriumH2OPercent = Math.max(5.0, 35.0 * (scRatio / 3.0));

  // Coking Resistance Index calculation:
  // Depends on anode material catalyst tolerance and steam/carbon excess above minimum safe ratio
  const scMargin = scRatio / anodeSpec.minSafeSteamCarbonRatio;
  let cokingResistancePercent = anodeSpec.cokingResistanceFactor * 100 * Math.min(1.0, Math.pow(scMargin, 0.65));
  if (scRatio < anodeSpec.minSafeSteamCarbonRatio) {
    cokingResistancePercent *= Math.pow(scRatio / anodeSpec.minSafeSteamCarbonRatio, 1.8);
  }
  cokingResistancePercent = Math.max(5, Math.min(99.5, cokingResistancePercent));

  let carbonDepositionRisk: 'VERY_LOW' | 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  if (cokingResistancePercent >= 88) carbonDepositionRisk = 'VERY_LOW';
  else if (cokingResistancePercent >= 75) carbonDepositionRisk = 'LOW';
  else if (cokingResistancePercent >= 55) carbonDepositionRisk = 'MODERATE';
  else if (cokingResistancePercent >= 35) carbonDepositionRisk = 'HIGH';
  else carbonDepositionRisk = 'CRITICAL';

  // Endothermic reforming enthalpy: ~174 kJ/mol at complete reforming
  const reformingEnthalpyKJPerMolEthanol = 173.5 + 0.02 * (temperatureC - 600);

  return {
    temperatureC,
    steamToCarbonRatio: scRatio,
    equilibriumH2Percent,
    equilibriumCOPercent,
    equilibriumCO2Percent,
    equilibriumCH4Percent,
    equilibriumH2OPercent,
    cokingResistancePercent,
    carbonDepositionRisk,
    reformingEnthalpyKJPerMolEthanol,
    internalReformingFraction: 0.985
  };
}

/**
 * 2. Calculates electrolyte Ohmic Area Specific Resistance (ASR_ohm) via Arrhenius law.
 */
export function calculateElectrolyteASR(
  electrolyteType: DeSofcElectrolyteType,
  temperatureC: number,
  thicknessUm?: number
): number {
  const spec = DE_SOFC_ELECTROLYTES[electrolyteType];
  const tempK = temperatureC + 273.15;
  const thicknessCm = (thicknessUm ?? spec.standardThicknessUm) * 1e-4;

  // Arrhenius: sigma = (A / T) * exp(-Ea / (k_B * T))
  const BOLTZMANN_EV = 8.617333262145e-5;
  const conductivitySPerCm =
    (spec.preExponentialConductivitySPerCm / tempK) *
    Math.exp(-spec.activationEnergyEv / (BOLTZMANN_EV * tempK));

  const asrOhmCm2 = thicknessCm / Math.max(1e-4, conductivitySPerCm);
  // Add contact resistance (interconnect and electrode interfaces ~ 0.035 Ohm*cm2)
  return asrOhmCm2 + 0.035;
}

/**
 * 3. Calculates complete electrochemical polarization (I-V and Power Density) curve for DE-SOFC:
 * Overall reaction: C2H5OH + 3 O2 -> 2 CO2 + 3 H2O (n = 12 electrons, E°_298 = 1.145 V)
 */
export function generateDESOFCPolarizationCurve(
  specs: DeSofcStackSpecs,
  conditions: EthanolReformingInput,
  pointsCount: number = 25
): DeSofcPolarizationPoint[] {
  const electrolyteSpec = DE_SOFC_ELECTROLYTES[specs.electrolyteType];
  const anodeSpec = DE_SOFC_ANODES[specs.anodeType];
  const tempK = conditions.temperatureC + 273.15;

  // Standard thermodynamic Nernst potential at operating temperature (E° ~ 1.14 V at 298K, ~ 1.09 V at 650°C)
  const eStandard = 1.145 - 0.00021 * (conditions.temperatureC - 25);
  // Reforming gas partial pressures effect on Nernst potential (n = 12 electrons per C2H5OH)
  const nernstV = eStandard + ((GAS_CONST_R * tempK) / (12 * FARADAY)) * Math.log(0.95);

  const asrOhm = calculateElectrolyteASR(specs.electrolyteType, conditions.temperatureC);
  const j0 = anodeSpec.exchangeCurrentDensityBaseAcm2 * Math.exp(((conditions.temperatureC - 650) / 100) * 0.7);
  const jLim = 2.2 + 0.4 * ((conditions.temperatureC - 650) / 100);

  const points: DeSofcPolarizationPoint[] = [];
  const maxJ = 1.8;

  for (let i = 0; i <= pointsCount; i++) {
    const j = (i / pointsCount) * maxJ;

    if (j === 0) {
      points.push({
        currentDensityAcm2: 0,
        cellVoltageV: nernstV,
        powerDensityWcm2: 0,
        activationOverpotentialV: 0,
        ohmicOverpotentialV: 0,
        concentrationOverpotentialV: 0
      });
      continue;
    }

    // Activation overpotential via high-field Butler-Volmer (alpha = 0.5)
    const etaAct = ((2 * GAS_CONST_R * tempK) / FARADAY) * Math.asinh(j / (2 * j0));

    // Ohmic overpotential
    const etaOhm = j * asrOhm;

    // Concentration overpotential
    let etaConc = 0;
    if (j < jLim) {
      etaConc = -((GAS_CONST_R * tempK) / (2 * FARADAY)) * Math.log(1 - j / jLim);
    } else {
      etaConc = 0.5;
    }

    const cellVoltageV = Math.max(0.1, nernstV - etaAct - etaOhm - etaConc);
    const powerDensityWcm2 = j * cellVoltageV;

    points.push({
      currentDensityAcm2: j,
      cellVoltageV,
      powerDensityWcm2,
      activationOverpotentialV: etaAct,
      ohmicOverpotentialV: etaOhm,
      concentrationOverpotentialV: etaConc
    });
  }

  return points;
}

/**
 * 4. Calculates Operating Performance and Combined Heat & Power (CHP) metrics for a given stack.
 */
export function calculateDESOFCOperatingPerformance(
  specs: DeSofcStackSpecs,
  conditions: EthanolReformingInput,
  operatingCurrentDensityAcm2: number = 0.8
): DeSofcOperatingPerformance {
  const curve = generateDESOFCPolarizationCurve(specs, conditions, 30);
  // Find point closest to operatingCurrentDensityAcm2
  const point = curve.reduce((prev, curr) =>
    Math.abs(curr.currentDensityAcm2 - operatingCurrentDensityAcm2) <
    Math.abs(prev.currentDensityAcm2 - operatingCurrentDensityAcm2)
      ? curr
      : prev
  );

  const reforming = calculateEthanolReformingEquilibrium(conditions);
  const activeAreaCm2 = specs.cellActiveAreaCm2;
  const cellCount = specs.cellCount;

  const cellVoltageV = point.cellVoltageV;
  const stackVoltageV = cellVoltageV * cellCount;
  const totalCurrentA = operatingCurrentDensityAcm2 * activeAreaCm2;
  const stackElectricPowerKW = (stackVoltageV * totalCurrentA) / 1000.0;

  // Faraday law for fuel consumption:
  // C2H5OH + 3 O2 -> 2 CO2 + 3 H2O (n = 12 mol e- per mol ethanol)
  // Faradaic efficiency ~ 98.5%
  const faradaicEfficiency = 0.985;
  const molEthanolPerSec = (totalCurrentA * cellCount) / (12 * FARADAY * faradaicEfficiency);
  const gramsEthanolPerSec = molEthanolPerSec * ETHANOL_MOLAR_MASS_G;
  const fuelConsumptionLph = (gramsEthanolPerSec * 3600) / (ETHANOL_DENSITY_KG_PER_L * 1000);

  // Lower Heating Value input power (kW)
  // LHV = 26.8 MJ/kg = 26800 kJ/kg = 26.8 kJ/g
  const fuelInputPowerKW = (gramsEthanolPerSec * ETHANOL_LHV_MJ_PER_KG);
  const electricalEfficiencyLHVPercent = (stackElectricPowerKW / Math.max(0.1, fuelInputPowerKW)) * 100;

  // High-grade exhaust heat recovery (exhaust gas at 550 - 620 °C)
  // Heat recovery exchanger efficiency ~ 75%
  const heatRecoveryEfficiency = 0.75;
  const heatGeneratedKW = Math.max(0, fuelInputPowerKW - stackElectricPowerKW);
  const exhaustThermalPowerKW = heatGeneratedKW * heatRecoveryEfficiency;
  const thermalEfficiencyPercent = (exhaustThermalPowerKW / Math.max(0.1, fuelInputPowerKW)) * 100;
  const totalChpPowerKW = stackElectricPowerKW + exhaustThermalPowerKW;
  const chpTotalEfficiencyPercent = electricalEfficiencyLHVPercent + thermalEfficiencyPercent;

  // Avoided CO2 emissions compared to agricultural diesel generator (0.85 kg CO2/kWh electric):
  // 8,000 hours/year continuous operation
  const annualElectricKWh = stackElectricPowerKW * 8000;
  const avoidedCO2EmissionsTonsPerYear = (annualElectricKWh * DIESEL_EMISSIONS_KG_PER_KWH) / 1000;

  return {
    operatingCurrentDensityAcm2,
    cellVoltageV,
    stackVoltageV,
    stackElectricPowerKW,
    exhaustThermalPowerKW,
    totalChpPowerKW,
    electricalEfficiencyLHVPercent,
    thermalEfficiencyPercent,
    chpTotalEfficiencyPercent,
    fuelConsumptionLph,
    exhaustGasTempC: conditions.temperatureC - 65,
    netLifecycleCO2EmissionsKgPerYear: 0.0, // 100% Closed Bio-loop from plant photosynthesis
    avoidedCO2EmissionsTonsPerYear,
    cokingRiskStatus: reforming.carbonDepositionRisk
  };
}

/**
 * 5. Rural / Agricultural Microgrid Sizing Calculator:
 * Computes stack count, daily bio-ethanol requirements, agricultural waste feedstock tons, and diesel cost savings.
 */
export function sizeRuralAgriculturalMicrogrid(
  targetElectricPowerKW: number,
  electrolyteType: DeSofcElectrolyteType = 'BZCY_PROTONIC',
  anodeType: DeSofcAnodeType = 'SFMO_DOUBLE_PEROVSKITE'
): RuralMicrogridSizingResult {
  const baseSpecs: DeSofcStackSpecs = {
    cellCount: 60,
    cellActiveAreaCm2: 120,
    electrolyteType,
    anodeType
  };

  const baseConditions: EthanolReformingInput = {
    temperatureC: 650,
    steamToCarbonRatio: 1.5,
    anodeType,
    ethanolFeedLph: 5.0
  };

  const basePerf = calculateDESOFCOperatingPerformance(baseSpecs, baseConditions, 0.8);
  const singleStackPowerKW = basePerf.stackElectricPowerKW;

  const stackCount = Math.max(1, Math.ceil(targetElectricPowerKW / singleStackPowerKW));
  const totalCells = stackCount * baseSpecs.cellCount;
  const actualPowerKW = stackCount * singleStackPowerKW;

  const hourlyEthanolLiters = stackCount * basePerf.fuelConsumptionLph;
  const dailyBioEthanolConsumptionLiters = hourlyEthanolLiters * 24;
  const dailyElectricOutputKWh = actualPowerKW * 24;
  const dailyThermalHeatMJ = stackCount * basePerf.exhaustThermalPowerKW * 3.6 * 24;

  // Equivalent diesel fuel saved: Diesel generator requires ~ 0.28 L diesel per kWh
  const annualDieselLitersSaved = (dailyElectricOutputKWh * 365) * 0.28;
  const annualAvoidedDieselCostUSD = annualDieselLitersSaved * DIESEL_COST_PER_LITER_USD;
  const annualAvoidedCO2Tons = (dailyElectricOutputKWh * 365 * DIESEL_EMISSIONS_KG_PER_KWH) / 1000;

  // Agricultural biomass feedstock conversion:
  // 1 ton dry sugarcane bagasse or corn stover yields ~ 280 Liters of bio-ethanol
  const annualEthanolLiters = dailyBioEthanolConsumptionLiters * 365;
  const agriculturalWasteFeedstockTonsPerYear = annualEthanolLiters / 280.0;

  return {
    targetElectricPowerKW,
    stackCount,
    totalCells,
    dailyBioEthanolConsumptionLiters,
    dailyElectricOutputKWh,
    dailyThermalHeatMJ,
    annualAvoidedDieselCostUSD,
    annualAvoidedCO2Tons,
    agriculturalWasteFeedstockTonsPerYear
  };
}
