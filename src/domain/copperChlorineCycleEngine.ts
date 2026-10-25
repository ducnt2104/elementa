/**
 * ELEMENTA - COPPER-CHLORINE (Cu-Cl) THERMOCHEMICAL WATER-SPLITTING CYCLE ENGINE
 *
 * IUPAC-grounded physicochemical and thermodynamic modeling of the 4-step hybrid
 * Copper-Chlorine cycle for clean hydrogen and oxygen production at intermediate
 * temperatures (<= 530°C / 803 K).
 *
 * Highlights:
 * 1. Low peak operating temperature (530°C) perfectly matching Generation IV
 *    Supercritical Water Reactors (SCWR), Lead-Cooled Fast Reactors (LFR), and
 *    Concentrated Solar Power (CSP) molten nitrate salt loops (565°C).
 * 2. Electrochemical cuprous chloride (CuCl) splitting requires only 0.45 - 0.70 V
 *    (vs 1.8 - 2.1 V for conventional water electrolysis), delivering ~70% electricity savings.
 * 3. 100% closed-loop recycling of copper and chlorine; zero greenhouse emissions.
 */

export interface CuClStep {
  stepIndex: number;
  name: string;
  vietnameseName: string;
  reactionEquation: string;
  operatingTempC: number;
  enthalpyChangeKJPerMol: number;
  phaseType: 'SOLID_GAS' | 'SOLID_LIQUID_GAS' | 'AQUEOUS_ELECTROCHEMICAL' | 'CRYSTALLIZATION';
  description: string;
}

export type HeatSourceType = 'SOLAR_MOLTEN_SALT' | 'NUCLEAR_SCWR' | 'NUCLEAR_LFR' | 'INDUSTRIAL_HT_HEAT';

export interface HeatSourceSpec {
  id: HeatSourceType;
  name: string;
  vietnameseName: string;
  nominalTempC: number;
  description: string;
  thermalEfficiencyBase: number;
  carbonIntensityGCO2PerKWhTh: number;
}

export interface CuClCycleParameters {
  thermalInputMWth: number;             // e.g. 10 - 200 MWth
  electrolyzerVoltageV?: number;        // Cell voltage (0.40 - 0.75 V, default 0.55 V)
  hydrolysisSteamRatio?: number;        // Steam-to-Cu molar ratio (1.2 - 2.5, default 1.8)
  heatSourceType?: HeatSourceType;      // Heat driver
  heatSourceTempC?: number;             // Thermal source temp (500 - 650 °C)
  faradaicEfficiency?: number;          // Default 0.98 (98%)
  heatExchangerRecovery?: number;       // Thermal recovery pinch efficiency (0.70 - 0.85, default 0.75)
  operatingHoursPerYear?: number;       // Default 8000 hours
}

export interface CuClCyclePerformance {
  hydrogenProductionKgPerHour: number;
  hydrogenProductionTonsPerDay: number;
  oxygenProductionKgPerHour: number;
  thermalPowerUtilizedMWth: number;
  electrolyzerPowerMWe: number;
  totalEquivalentThermalPowerMW: number;
  netThermalEfficiencyPercent: number;  // LHV H2 basis
  specificElectricityKWhPerKgH2: number;
  specificThermalEnergyMJPerKgH2: number;
  electricitySavingsVsPEMPercent: number;
  lcohUSDPerKg: number;
  annualAvoidedCO2Tons: number;
  cucl2CirculationKgPerHour: number;
  heatSourceUsed: HeatSourceSpec;
}

export interface CycleComparisonEntry {
  cycleName: string;
  vietnameseName: string;
  peakTempC: number;
  thermalEfficiencyPercent: number;
  electricityDemandKWhPerKg: number;
  corrosionChallenge: string;
  primaryHeatDriver: string;
  commercialReadiness: string;
}

// 4 Balanced Chemical Reaction Steps of the Hybrid Cu-Cl Cycle
export const CU_CL_FOUR_STEPS: CuClStep[] = [
  {
    stepIndex: 1,
    name: 'Cupric Chloride Hydrolysis',
    vietnameseName: 'Thủy Phân CuCl₂ (Tạo Đồng Oxyclorua)',
    reactionEquation: '2 CuCl₂(s) + H₂O(g) -> Cu₂OCl₂(s) + 2 HCl(g)',
    operatingTempC: 380,
    enthalpyChangeKJPerMol: 116.5,
    phaseType: 'SOLID_GAS',
    description: 'Phản ứng thu nhiệt giữa bột CuCl₂ và hơi nước quá nhiệt tại 375 - 400°C tạo melanothallite Cu₂OCl₂ và khí HCl.'
  },
  {
    stepIndex: 2,
    name: 'Copper Oxychloride Thermal Decomposition',
    vietnameseName: 'Phân Hủy Nhiệt Đồng Oxyclorua (Đỉnh Nhiệt)',
    reactionEquation: 'Cu₂OCl₂(s) -> 2 CuCl(l) + 1/2 O₂(g)',
    operatingTempC: 530,
    enthalpyChangeKJPerMol: 129.8,
    phaseType: 'SOLID_LIQUID_GAS',
    description: 'Bước đạt đỉnh nhiệt cao nhất của chu trình (500 - 530°C), giải phóng khí oxy tinh khiết và CuCl nóng chảy.'
  },
  {
    stepIndex: 3,
    name: 'Electrochemical Hydrogen Evolution & CuCl Oxidation',
    vietnameseName: 'Điện Phân CuCl/HCl Tạo Hydro Xanh',
    reactionEquation: '2 CuCl(aq) + 2 HCl(aq) -> 2 CuCl₂(aq) + H₂(g)',
    operatingTempC: 80,
    enthalpyChangeKJPerMol: 38.2,
    phaseType: 'AQUEOUS_ELECTROCHEMICAL',
    description: 'Điện phân anolyte/catholyte qua màng PEM tại 80°C với thế cực thấp (0.45 - 0.65 V) tạo trực tiếp hydro tinh khiết.'
  },
  {
    stepIndex: 4,
    name: 'Aqueous CuCl₂ Drying & Crystallization',
    vietnameseName: 'Kết Tinh & Làm Khô Dung Dịch CuCl₂',
    reactionEquation: 'CuCl₂(aq) -> CuCl₂(s) + H₂O(g)',
    operatingTempC: 110,
    enthalpyChangeKJPerMol: 54.3,
    phaseType: 'CRYSTALLIZATION',
    description: 'Thu hồi nhiệt thải nhiệt độ thấp để bay hơi nước, tái sinh hạt tinh thể CuCl₂ khô tuần hoàn về bước 1 khép kín 100%.'
  }
];

export const HEAT_SOURCE_CATALOG: Record<HeatSourceType, HeatSourceSpec> = {
  SOLAR_MOLTEN_SALT: {
    id: 'SOLAR_MOLTEN_SALT',
    name: 'Concentrated Solar Molten Salt (CSP)',
    vietnameseName: 'Năng Lượng Mặt Trời Tập Trung (Muối Nóng Chảy 565°C)',
    nominalTempC: 565,
    description: 'Tháp mặt trời với muối nitrat (NaNO₃-KNO₃) tích trữ nhiệt 16h/ngày, hoàn toàn không phát thải carbon.',
    thermalEfficiencyBase: 0.43,
    carbonIntensityGCO2PerKWhTh: 12.0
  },
  NUCLEAR_SCWR: {
    id: 'NUCLEAR_SCWR',
    name: 'Supercritical Water Nuclear Reactor (SCWR Gen-IV)',
    vietnameseName: 'Lò Phản Ứng Hạt Nhân Nước Siêu Tới Hạn (Gen-IV 550°C)',
    nominalTempC: 550,
    description: 'Lò phản ứng thế hệ IV tải nhiệt nước siêu tới hạn tại 25 MPa và 550°C, vận hành tải nền liên tục 8,400 h/năm.',
    thermalEfficiencyBase: 0.45,
    carbonIntensityGCO2PerKWhTh: 5.0
  },
  NUCLEAR_LFR: {
    id: 'NUCLEAR_LFR',
    name: 'Lead-Cooled Fast Nuclear Reactor (LFR Gen-IV)',
    vietnameseName: 'Lò Phản Ứng Nhanh Làm Mát Bằng Chì Lỏng (LFR 550°C)',
    nominalTempC: 550,
    description: 'Lò phản ứng nhanh dùng chì lỏng hoặc hợp kim chì-bismut eutecti (LBE), áp suất khí quyển, an toàn nội tại.',
    thermalEfficiencyBase: 0.44,
    carbonIntensityGCO2PerKWhTh: 6.0
  },
  INDUSTRIAL_HT_HEAT: {
    id: 'INDUSTRIAL_HT_HEAT',
    name: 'High-Temperature Industrial Waste Heat / Pyrolysis',
    vietnameseName: 'Nhiệt Thải Công Nghiệp Nhiệt Cao / Lò Nhiệt Phân',
    nominalTempC: 580,
    description: 'Thu hồi nhiệt từ lò luyện kim, xi măng hoặc nhiệt phân sinh khối để đồng phát hydro sạch không tốn thêm nhiên liệu.',
    thermalEfficiencyBase: 0.41,
    carbonIntensityGCO2PerKWhTh: 18.0
  }
};

// Physical Constants
const FARADAY_CONSTANT = 96485.33; // C/mol e-
const MOLAR_MASS_H2 = 0.002016;    // kg/mol
const MOLAR_MASS_O2 = 0.031998;    // kg/mol
const MOLAR_MASS_CUCL2 = 0.13445;  // kg/mol
const LHV_HYDROGEN_MJ_PER_KG = 120.0; // MJ/kg (Lower Heating Value)
const SMR_CO2_INTENSITY_KG_PER_KG = 9.5; // kg CO2 per kg H2 from Steam Methane Reforming
const PEM_BASELINE_ELECTRICITY_KWH_PER_KG = 52.0; // kWh/kg for standard water electrolysis

/**
 * Calculates electrochemical performance for the CuCl splitting cell
 */
export function calculateElectrolysisMetrics(
  voltageV: number = 0.55,
  faradaicEfficiency: number = 0.98
): {
  specificElectricityKWhPerKg: number;
  cellPowerMWPerTonPerDay: number;
  pemSavingsPercent: number;
} {
  // Reaction: 2 CuCl + 2 HCl -> 2 CuCl2 + H2 requires 2 electrons per molecule of H2
  const electronsPerMol = 2;
  const joulesPerMolH2 = (electronsPerMol * FARADAY_CONSTANT * voltageV) / faradaicEfficiency;
  const kwhPerMolH2 = joulesPerMolH2 / 3.6e6;
  const molesPerKgH2 = 1.0 / MOLAR_MASS_H2;
  const specificElectricityKWhPerKg = kwhPerMolH2 * molesPerKgH2;

  // Sizing cell power for 1 metric ton H2 per day (1000 kg / 24 h = 41.67 kg/h)
  const kgPerHourPerTonDay = 1000 / 24;
  const cellPowerKW = kgPerHourPerTonDay * specificElectricityKWhPerKg;
  const cellPowerMWPerTonPerDay = cellPowerKW / 1000;

  const pemSavingsPercent = Math.max(
    0,
    ((PEM_BASELINE_ELECTRICITY_KWH_PER_KG - specificElectricityKWhPerKg) / PEM_BASELINE_ELECTRICITY_KWH_PER_KG) * 100
  );

  return {
    specificElectricityKWhPerKg: Number(specificElectricityKWhPerKg.toFixed(2)),
    cellPowerMWPerTonPerDay: Number(cellPowerMWPerTonPerDay.toFixed(3)),
    pemSavingsPercent: Number(pemSavingsPercent.toFixed(1))
  };
}

/**
 * Calculates comprehensive cycle performance, mass balances, efficiency and LCOH
 */
export function calculateCuClPerformance(params: CuClCycleParameters): CuClCyclePerformance {
  const thermalInputMWth = Math.max(1, params.thermalInputMWth);
  const voltageV = params.electrolyzerVoltageV ?? 0.55;
  const faradaicEff = params.faradaicEfficiency ?? 0.98;
  const recoveryPinch = params.heatExchangerRecovery ?? 0.75;
  const heatSourceId = params.heatSourceType ?? 'SOLAR_MOLTEN_SALT';
  const heatSource = HEAT_SOURCE_CATALOG[heatSourceId] || HEAT_SOURCE_CATALOG.SOLAR_MOLTEN_SALT;
  const operatingHours = params.operatingHoursPerYear ?? 8000;

  // Step 1 + Step 2 + Step 4 net thermal duty per mol H2
  // Step 1: 116.5 kJ/mol
  // Step 2: 129.8 kJ/mol
  // Step 4: 54.3 kJ/mol
  // Gross thermal requirement: ~300.6 kJ/mol H2.
  // Internal heat integration with recuperative pinch recovers a significant portion of condensation heat:
  const grossThermalKJPerMolH2 = 300.6;
  const recuperatedKJPerMolH2 = 120.0 * recoveryPinch;
  const netThermalKJPerMolH2 = grossThermalKJPerMolH2 - recuperatedKJPerMolH2; // ~210 kJ/mol H2

  const netThermalMJPerKgH2 = (netThermalKJPerMolH2 / 1000) * (1 / MOLAR_MASS_H2); // ~104 MJ/kg H2

  // Electrochemical electricity demand
  const electroMetrics = calculateElectrolysisMetrics(voltageV, faradaicEff);
  const specificElecKWhPerKg = electroMetrics.specificElectricityKWhPerKg; // ~14.9 kWh/kg H2
  const elecMJPerKgH2 = specificElecKWhPerKg * 3.6; // ~53.6 MJ/kg H2

  // Thermal power budget:
  // Convert thermal power (MWth) to hydrogen output:
  // Each kg H2 requires netThermalMJPerKgH2 of thermal energy + electrical energy supplied
  // 1 MWth = 3600 MJ/h
  const thermalPowerMJPerHour = thermalInputMWth * 3600;
  const hydrogenKgPerHour = thermalPowerMJPerHour / netThermalMJPerKgH2;
  const hydrogenTonsPerDay = (hydrogenKgPerHour * 24) / 1000;

  // Oxygen co-product: 1 mol H2 yields 0.5 mol O2 -> (0.5 * 32 / 2.016) = ~7.94 kg O2 / kg H2
  const oxygenKgPerHour = hydrogenKgPerHour * (0.5 * MOLAR_MASS_O2 / MOLAR_MASS_H2);

  // Electrical power required for the CuCl/HCl electrolyzer
  const electrolyzerPowerMWe = (hydrogenKgPerHour * specificElecKWhPerKg) / 1000;

  // Equivalent total primary thermal power (assuming electricity generated at 40% thermal-to-electric efficiency)
  const powerPlantThermalEfficiency = 0.40;
  const totalEquivalentThermalPowerMW = thermalInputMWth + (electrolyzerPowerMWe / powerPlantThermalEfficiency);

  // Overall thermal efficiency (LHV basis)
  // LHV of H2 = 120 MJ/kg
  const h2ChemicalPowerMW = (hydrogenKgPerHour * LHV_HYDROGEN_MJ_PER_KG) / 3600;
  const netThermalEfficiencyPercent = (h2ChemicalPowerMW / totalEquivalentThermalPowerMW) * 100;

  // CuCl2 circulation rate: 2 moles of CuCl2 per mole of H2
  const cucl2MolesPerHour = (hydrogenKgPerHour / MOLAR_MASS_H2) * 2;
  const cucl2CirculationKgPerHour = cucl2MolesPerHour * MOLAR_MASS_CUCL2;

  // Levelized Cost of Hydrogen (LCOH) model:
  // CapEx amortized + thermal heat cost ($0.022/kWhth) + electric cost ($0.045/kWhe) + O&M & membrane replacement
  const thermalCostUSDPerKg = (netThermalMJPerKgH2 / 3.6) * 0.022; // $0.022/kWh_th
  const electricCostUSDPerKg = specificElecKWhPerKg * 0.045;       // $0.045/kWh_e
  const opexAndCapexUSDPerKg = 1.05; // Reactor vessel CapEx ($0.75) + PEM electrolyzer membrane/electrode replacement ($0.30)
  const o2CreditUSDPerKg = 0.08 * 7.94 * 0.25; // By-product credit (oxygen sold at $0.08/kg, 25% captured market)
  const lcohUSDPerKg = Math.max(1.8, thermalCostUSDPerKg + electricCostUSDPerKg + opexAndCapexUSDPerKg - o2CreditUSDPerKg);

  // Annual Avoided CO2 vs SMR (9.5 kg CO2 / kg H2)
  const annualH2ProductionKg = hydrogenKgPerHour * operatingHours;
  const annualAvoidedCO2Tons = (annualH2ProductionKg * SMR_CO2_INTENSITY_KG_PER_KG) / 1000;

  return {
    hydrogenProductionKgPerHour: Number(hydrogenKgPerHour.toFixed(1)),
    hydrogenProductionTonsPerDay: Number(hydrogenTonsPerDay.toFixed(2)),
    oxygenProductionKgPerHour: Number(oxygenKgPerHour.toFixed(1)),
    thermalPowerUtilizedMWth: Number(thermalInputMWth.toFixed(1)),
    electrolyzerPowerMWe: Number(electrolyzerPowerMWe.toFixed(2)),
    totalEquivalentThermalPowerMW: Number(totalEquivalentThermalPowerMW.toFixed(2)),
    netThermalEfficiencyPercent: Number(netThermalEfficiencyPercent.toFixed(1)),
    specificElectricityKWhPerKgH2: specificElecKWhPerKg,
    specificThermalEnergyMJPerKgH2: Number(netThermalMJPerKgH2.toFixed(1)),
    electricitySavingsVsPEMPercent: electroMetrics.pemSavingsPercent,
    lcohUSDPerKg: Number(lcohUSDPerKg.toFixed(2)),
    annualAvoidedCO2Tons: Number(annualAvoidedCO2Tons.toFixed(0)),
    cucl2CirculationKgPerHour: Number(cucl2CirculationKgPerHour.toFixed(0)),
    heatSourceUsed: heatSource
  };
}

/**
 * Returns comprehensive benchmark data comparing Cu-Cl to other hydrogen technologies
 */
export function compareCuClVsOtherCycles(): CycleComparisonEntry[] {
  return [
    {
      cycleName: 'Copper-Chlorine (Cu-Cl)',
      vietnameseName: 'Chu Trình Đồng - Clo (Cu-Cl)',
      peakTempC: 530,
      thermalEfficiencyPercent: 43.5,
      electricityDemandKWhPerKg: 14.9,
      corrosionChallenge: 'Trung bình (Chống ăn mòn axit HCl bằng Hastelloy/Teflon, không cần gốm SiC siêu nhiệt)',
      primaryHeatDriver: 'Lò hạt nhân SCWR/LFR Gen-IV, Muối nóng chảy CSP (565°C)',
      commercialReadiness: 'Pilot thử nghiệm thành công (Canada CNL, Ontario Tech)'
    },
    {
      cycleName: 'Sulfur-Iodine (S-I)',
      vietnameseName: 'Chu Trình Lưu Huỳnh - Iot (S-I)',
      peakTempC: 900,
      thermalEfficiencyPercent: 50.2,
      electricityDemandKWhPerKg: 2.5,
      corrosionChallenge: 'Rất cao (H₂SO₄ sôi 900°C bắt buộc dùng gốm SiC thiêu kết & Tantalum)',
      primaryHeatDriver: 'Lò khí siêu cao nhiệt HTGR (950°C), Tháp hội tụ mặt trời quang học',
      commercialReadiness: 'Pilot hoàn chỉnh (JAEA Nhật Bản, CEA Pháp)'
    },
    {
      cycleName: 'Zinc-Zinc Oxide (Zn/ZnO)',
      vietnameseName: 'Chu Trình Kẽm - Oxit Kẽm (Zn/ZnO)',
      peakTempC: 1677, // 1950 K
      thermalEfficiencyPercent: 40.1,
      electricityDemandKWhPerKg: 0.0,
      corrosionChallenge: 'Cực cao (Hơi Zn 1950 K gây xói mòn và đòi hỏi tôi lạnh siêu tốc > 10⁵ K/s)',
      primaryHeatDriver: 'Gương cầu mặt trời hội tụ cực hạn (Beam-down 3500 suns)',
      commercialReadiness: 'Thử nghiệm phòng thí nghiệm (PSI Thụy Sĩ, CNRS)'
    },
    {
      cycleName: 'Proton Exchange Membrane (PEM) Electrolysis',
      vietnameseName: 'Điện Phân Nước Màng Trao Đổi Proton (PEM)',
      peakTempC: 80,
      thermalEfficiencyPercent: 25.5, // Well-to-wire based on grid electricity
      electricityDemandKWhPerKg: 52.0,
      corrosionChallenge: 'Thấp (Cần kim loại quý đắt đỏ: Iridium anode, Platinum cathode)',
      primaryHeatDriver: 'Điện năng 100% (Pin mặt trời PV, Tuabin gió)',
      commercialReadiness: 'Thương mại hóa quy mô GW'
    }
  ];
}
