/**
 * ELEMENTA - DIRECT AIR CAPTURE (DAC) & CO2 SEPARATION THERMODYNAMICS ENGINE
 *
 * Conforms to:
 * - IUPAC Physical Chemistry & Separation Thermodynamics
 * - IEA Net-Zero by 2050 Technology Roadmap (Direct Air Carbon Capture & Storage - DACCS)
 * - Climeworks (Solid Amine TVSA) & Oxy/Carbon Engineering (Liquid Alkali Contactor)
 * - Vietnam GDPT 2018 Chemistry Grade 11 & 12 (Carbon cycle, Carbonate equilibria, Causticization, Net-Zero 2050)
 */

export type DacTechnologyType = 'LIQUID_KOH' | 'SOLID_AMINE_TVSA';

export type DacHeatSource = 'GEOTHERMAL' | 'INDUSTRIAL_WASTE_HEAT' | 'OXY_METHANE_CALCINER' | 'SOLAR_THERMAL';

export interface DacOperatingConditions {
  airCo2Ppm: number;            // Ambient CO2 concentration in ppm (typically 420 ppm)
  ambientTempC: number;         // Ambient air temperature in °C (typically 20°C)
  airFlowRateM3h: number;       // Air intake flow rate in m³/h (e.g. 50,000 m³/h per fan cell)
  captureEfficiency: number;    // CO2 capture fraction from air (0.50 - 0.90, typ. 0.75)
  heatSource: DacHeatSource;    // Thermal heat supply type
  electricityPriceUsdKwh: number; // Cost of green electricity ($/kWh)
  thermalEnergyPriceUsdGj: number; // Cost of thermal energy ($/GJ)
  plantLifetimeYears?: number;  // Operational plant lifetime (typically 25 years)
  annualOperatingHours?: number; // Annual capacity factor (typically 8,000 h/yr)
}

export interface DacReactionStep {
  stepNumber: number;
  stepName: string;
  vietnameseName: string;
  chemicalEquation: string;
  temperatureC: number;
  pressureBar: number;
  deltaHKjMol: number; // Enthalpy change (+ endothermic, - exothermic)
  description: string;
}

export interface DacKineticsResult {
  technology: DacTechnologyType;
  techName: string;
  airDensityKgM3: number;
  airMassProcessedKgH: number;
  co2InflowKgH: number;
  co2CapturedKgH: number;
  co2CapturedTonsPerYear: number;
  specificThermalEnergyGjTon: number;
  specificThermalEnergyKwhTon: number;
  specificElectricalEnergyKwhTon: number;
  totalEnergyKwhTon: number;
  thermodynamicMinWorkKwhTon: number;
  secondLawEfficiencyPct: number;
  waterConsumptionM3Ton: number; // Net water balance (solid amine can even produce water!)
  costBreakdown: {
    capexAmortizedPerTon: number;
    opexElectricityPerTon: number;
    opexThermalPerTon: number;
    opexSorbentReagentPerTon: number;
    opexMaintenancePerTon: number;
    totalCostPerTonCo2: number;
  };
  couplingPtX: {
    syngasCoOutputNm3H: number;      // Equivalent CO for Fischer-Tropsch e-fuel
    greenH2RequiredKgH: number;       // H2 needed for complete stoichiometric e-fuel or methane
    eKeroseneProductionLitersDay: number;
  };
}

export interface DacTechComparison {
  name: string;
  type: DacTechnologyType;
  sorbentMaterial: string;
  desorptionTempC: number;
  thermalEnergyGjTon: number;
  electricEnergyKwhTon: number;
  waterBalance: string;
  stackFootprintM2PerTonYr: number;
  currentCostUsdTon: number;
  matureCostUsdTon2035: number;
  keyAdvantage: string;
  keyChallenge: string;
}

const R_GAS = 8.314462618; // J / (mol * K)
const M_CO2 = 0.04401; // kg / mol (44.01 g/mol)
const M_AIR = 0.02897; // kg / mol (28.97 g/mol)
const P_ATM = 101325;  // Pa

/**
 * Calculates theoretical thermodynamic minimum work of separating CO2 from air.
 * W_min = - R * T * [ ln(y) + ((1 - y) / y) * ln(1 - y) ]
 *
 * @param co2Ppm CO2 mole fraction in parts per million (e.g. 420 ppm)
 * @param tempC Temperature in °C (typically 20-25°C)
 * @returns Minimum work in kJ/mol CO2 and kWh/ton CO2
 */
export function calculateThermodynamicMinimumWork(
  co2Ppm: number = 420,
  tempC: number = 20
): { wMinKjMol: number; wMinKwhTon: number } {
  const T = tempC + 273.15;
  const y = Math.max(50, Math.min(500000, co2Ppm)) * 1e-6; // Mole fraction (up to 50% for flue gas)

  // Rigorous ideal mixture separation Gibbs free energy
  // delta_g_mix = R * T * [ y * ln(y) + (1 - y) * ln(1 - y) ]
  // W_min per mol of CO2 = - delta_g_mix / y
  const wMinJouleMol = -R_GAS * T * (Math.log(y) + ((1 - y) / y) * Math.log(1 - y));
  const wMinKjMol = wMinJouleMol / 1000;

  // Convert to kWh per metric ton of pure CO2 (1 ton = 1000 kg = 1000 / 0.04401 mol = 22,722.1 mol)
  const molsPerTon = 1000 / M_CO2;
  const wMinKwhTon = (wMinJouleMol * molsPerTon) / 3.6e6;

  return {
    wMinKjMol: parseFloat(wMinKjMol.toFixed(2)),
    wMinKwhTon: parseFloat(wMinKwhTon.toFixed(2))
  };
}

/**
 * Returns chemical reaction cycle steps for the chosen DAC technology.
 */
export function getDacReactionCycle(tech: DacTechnologyType): DacReactionStep[] {
  if (tech === 'LIQUID_KOH') {
    return [
      {
        stepNumber: 1,
        stepName: 'Air Contactor Absorption',
        vietnameseName: 'Hấp thụ CO2 bằng dung dịch KOH trong tháp tiếp xúc không khí',
        chemicalEquation: '2 KOH(aq) + CO2(g) -> K2CO3(aq) + H2O(l)',
        temperatureC: 25,
        pressureBar: 1.0,
        deltaHKjMol: -108.5,
        description: 'Dung dịch kiềm KOH 2.0M phun mỏng qua khối đệm xốp tiếp xúc với luồng khí cưỡng bức từ quạt công nghiệp khổng lồ, cố định CO2 thành muối kali cacbonat hòa tan.'
      },
      {
        stepNumber: 2,
        stepName: 'Pellet Reactor Causticization',
        vietnameseName: 'Xút hóa tạo hạt canxi cacbonat trong thiết bị kết tinh',
        chemicalEquation: 'K2CO3(aq) + Ca(OH)2(aq) -> 2 KOH(aq) + CaCO3(s)v',
        temperatureC: 45,
        pressureBar: 1.0,
        deltaHKjMol: -5.3,
        description: 'Phản ứng trao đổi ion giữa K2CO3 và nước vôi tôi Ca(OH)2 tái sinh dung dịch KOH hồi lưu, đồng thời kết tinh kết tủa CaCO3 dạng hạt cứng dễ rửa và sấy.'
      },
      {
        stepNumber: 3,
        stepName: 'Oxy-Fired Calciner Desorption',
        vietnameseName: 'Nung vôi nhiệt phân CaCO3 tái sinh CO2 tinh khiết 100%',
        chemicalEquation: 'CaCO3(s) -> CaO(s) + CO2(g)^ (900°C)',
        temperatureC: 900,
        pressureBar: 1.0,
        deltaHKjMol: 178.2,
        description: 'Hạt đá vôi CaCO3 được gia nhiệt tới 900°C bằng buồng đốt oxy-khí thiên nhiên hoặc plasma điện giải phóng 100% dòng khí CO2 sạch áp suất cao sẵn sàng hóa lỏng.'
      },
      {
        stepNumber: 4,
        stepName: 'Lime Slaker Hydration',
        vietnameseName: 'Tôi vôi tái sinh dung dịch Ca(OH)2 khép kín vòng lặp',
        chemicalEquation: 'CaO(s) + H2O(l) -> Ca(OH)2(s) + Nhiệt',
        temperatureC: 100,
        pressureBar: 1.0,
        deltaHKjMol: -64.5,
        description: 'Vôi sống CaO được tôi với nước tỏa nhiệt mạnh tái sinh Ca(OH)2 cho bước xút hóa, hoàn tất chu trình hóa chất khép kín không phát thải phụ phẩm.'
      }
    ];
  }

  // SOLID_AMINE_TVSA (Temperature-Vacuum Swing Adsorption)
  return [
    {
      stepNumber: 1,
      stepName: 'Chemisorption on Solid Amine',
      vietnameseName: 'Hấp phụ hóa học CO2 lên amine hữu cơ gắn trên giá thể xốp',
      chemicalEquation: '2 R-NH2(s) + CO2(g) <=> R-NHCOO- + R-NH3+ (Carbamate ion)',
      temperatureC: 25,
      pressureBar: 1.0,
      deltaHKjMol: -68.0,
      description: 'Không khí xung quanh qua lớp màng sợi nano xenlulo phủ polyethylenimine (PEI). Nhóm amine bậc 1 và 2 tạo liên kết hóa học chọn lọc với CO2 ngay ở nồng độ cực loãng 420 ppm.'
    },
    {
      stepNumber: 2,
      stepName: 'Vacuum Evacuation & Desorption',
      vietnameseName: 'Hạ áp suất chân không và gia nhiệt hơi nước 100°C giải phóng CO2',
      chemicalEquation: 'R-NHCOO- + R-NH3+ + Nhiệt (100°C) -> 2 R-NH2(s) + CO2(g)^',
      temperatureC: 100,
      pressureBar: 0.2,
      deltaHKjMol: 68.0,
      description: 'Khoang lọc được đóng kín, hút chân không xuống 0.2 bar và xông hơi nước nhiệt độ thấp 100°C từ nhiệt thừa công nghiệp hoặc địa nhiệt. Carbamate phân rã nhả CO2 tinh khiết >98%.'
    },
    {
      stepNumber: 3,
      stepName: 'Water Condensation & Sorbent Cooling',
      vietnameseName: 'Ngưng tụ hơi nước phụ phẩm và làm nguội vật liệu hấp phụ',
      chemicalEquation: 'H2O(g) -> H2O(l) (Ngưng tụ thu nước sạch)',
      temperatureC: 30,
      pressureBar: 1.0,
      deltaHKjMol: -44.0,
      description: 'Hỗn hợp khí CO2 và hơi nước đi qua bộ ngưng tụ tách nước lỏng sạch (phụ phẩm có ích), vật liệu amine được làm nguội và sẵn sàng cho chu kỳ hấp phụ kế tiếp.'
    }
  ];
}

/**
 * Simulates complete DAC kinetics, energy balance, Capex/Opex and downstream PtX integration.
 */
export function simulateDacProcess(
  tech: DacTechnologyType,
  conditions: DacOperatingConditions
): DacKineticsResult {
  const {
    airCo2Ppm,
    ambientTempC,
    airFlowRateM3h,
    captureEfficiency,
    heatSource,
    electricityPriceUsdKwh,
    thermalEnergyPriceUsdGj,
    annualOperatingHours = 8000
  } = conditions;

  const T_kelvin = ambientTempC + 273.15;
  // Air density from ideal gas law: rho = P * M / (R * T)
  const airDensityKgM3 = (P_ATM * M_AIR) / (R_GAS * T_kelvin);
  const airMassProcessedKgH = airFlowRateM3h * airDensityKgM3;

  // Mass fraction of CO2 in air: w_CO2 = y_CO2 * (M_CO2 / M_AIR)
  const y_CO2 = airCo2Ppm * 1e-6;
  const w_CO2 = y_CO2 * (M_CO2 / M_AIR);

  const co2InflowKgH = airMassProcessedKgH * w_CO2;
  const co2CapturedKgH = co2InflowKgH * captureEfficiency;
  const co2CapturedTonsPerYear = (co2CapturedKgH * annualOperatingHours) / 1000;

  // Thermodynamic minimum work
  const { wMinKwhTon } = calculateThermodynamicMinimumWork(airCo2Ppm, ambientTempC);

  let specificThermalEnergyGjTon = 0;
  let specificElectricalEnergyKwhTon = 0;
  let waterConsumptionM3Ton = 0;
  let capexAmortizedPerTon = 0;
  let sorbentCostPerTon = 0;
  let maintenanceCostPerTon = 0;

  if (tech === 'LIQUID_KOH') {
    // Liquid alkali system requires high-temperature calcination (900°C)
    // ~8.1 GJ thermal energy / ton CO2
    specificThermalEnergyGjTon = 8.1;
    // Fan contactor + pellet centrifuge + slaker pumps ~ 350 - 450 kWh/ton
    specificElectricalEnergyKwhTon = 400;
    // Net water evaporated in cooling tower and contactor: ~4.5 m³ water lost per ton CO2
    waterConsumptionM3Ton = 4.5;

    capexAmortizedPerTon = 140; // High initial CAPEX for massive industrial chemical plant
    sorbentCostPerTon = 15;    // Makeup KOH and limestone make-up
    maintenanceCostPerTon = 25;
  } else {
    // Solid amine TVSA (Climeworks style) requires low-grade heat (100°C)
    // ~5.4 GJ thermal energy / ton CO2 (~1500 kWh-th/ton)
    specificThermalEnergyGjTon = 5.4;
    // Vacuum pumps, air fans, valve actuators ~ 300 kWh/ton
    specificElectricalEnergyKwhTon = 300;
    // Solid amine desorbs co-adsorbed ambient moisture, generating net clean water! (-1.0 to -1.5 m³)
    waterConsumptionM3Ton = -1.2;

    capexAmortizedPerTon = 190; // High sorbent synthesis & modular container cost
    sorbentCostPerTon = 45;    // Sorbent replacement after ~3,000 thermal cycles
    maintenanceCostPerTon = 20;
  }

  // Adjust thermal cost based on selected heat source
  let effectiveThermalGjPrice = thermalEnergyPriceUsdGj;
  if (heatSource === 'INDUSTRIAL_WASTE_HEAT') {
    // Low grade waste heat is heavily discounted or zero fuel cost
    effectiveThermalGjPrice = Math.min(2.5, thermalEnergyPriceUsdGj * 0.25);
  } else if (heatSource === 'GEOTHERMAL') {
    effectiveThermalGjPrice = Math.min(4.0, thermalEnergyPriceUsdGj * 0.40);
  } else if (heatSource === 'SOLAR_THERMAL') {
    effectiveThermalGjPrice = Math.min(5.0, thermalEnergyPriceUsdGj * 0.50);
  }

  const specificThermalEnergyKwhTon = (specificThermalEnergyGjTon * 1e9) / 3.6e6;
  const totalEnergyKwhTon = specificThermalEnergyKwhTon + specificElectricalEnergyKwhTon;

  const secondLawEfficiencyPct = (wMinKwhTon / totalEnergyKwhTon) * 100;

  const opexElectricityPerTon = specificElectricalEnergyKwhTon * electricityPriceUsdKwh;
  const opexThermalPerTon = specificThermalEnergyGjTon * effectiveThermalGjPrice;
  const totalCostPerTonCo2 =
    capexAmortizedPerTon +
    opexElectricityPerTon +
    opexThermalPerTon +
    sorbentCostPerTon +
    maintenanceCostPerTon;

  // Downstream Power-to-X Coupling:
  // Direct conversion to syngas CO for e-fuels via Fischer-Tropsch (CO + 2 H2 -> -CH2- + H2O)
  // 1 kg CO2 (1/44 kmol) -> 1/44 kmol CO = 28/44 = 0.636 kg CO = 0.509 Nm³ CO
  const co2CapturedKgPerSec = co2CapturedKgH / 3600;
  const syngasCoOutputNm3H = (co2CapturedKgH / 0.04401) * 0.022414; // Standard molar volume = 22.414 L/mol
  // Stoichiometric H2 requirement for Fischer-Tropsch e-fuel: CO + 2 H2 -> -(CH2)- + H2O
  // CO2 + 3 H2 -> -(CH2)- + 2 H2O (if directly hydrogenating CO2)
  // 3 mol H2 per mol CO2 = (3 * 2.016 g H2) / 44.01 g CO2 = 0.1374 kg H2 per kg CO2
  const greenH2RequiredKgH = co2CapturedKgH * 0.1374;
  // Aviation e-kerosene density ~ 0.80 kg/L, 1 ton CO2 yields ~ 316 kg e-kerosene ~ 395 liters
  const eKeroseneProductionLitersDay = (co2CapturedKgH * 24 / 1000) * 395;

  return {
    technology: tech,
    techName: tech === 'LIQUID_KOH' ? 'Liquid Alkali Contactor (KOH / Ca(OH)2)' : 'Solid Amine TVSA (Cellulose-PEI)',
    airDensityKgM3: parseFloat(airDensityKgM3.toFixed(3)),
    airMassProcessedKgH: parseFloat(airMassProcessedKgH.toFixed(1)),
    co2InflowKgH: parseFloat(co2InflowKgH.toFixed(2)),
    co2CapturedKgH: parseFloat(co2CapturedKgH.toFixed(2)),
    co2CapturedTonsPerYear: parseFloat(co2CapturedTonsPerYear.toFixed(1)),
    specificThermalEnergyGjTon: parseFloat(specificThermalEnergyGjTon.toFixed(2)),
    specificThermalEnergyKwhTon: parseFloat(specificThermalEnergyKwhTon.toFixed(1)),
    specificElectricalEnergyKwhTon: parseFloat(specificElectricalEnergyKwhTon.toFixed(1)),
    totalEnergyKwhTon: parseFloat(totalEnergyKwhTon.toFixed(1)),
    thermodynamicMinWorkKwhTon: wMinKwhTon,
    secondLawEfficiencyPct: parseFloat(secondLawEfficiencyPct.toFixed(2)),
    waterConsumptionM3Ton: parseFloat(waterConsumptionM3Ton.toFixed(1)),
    costBreakdown: {
      capexAmortizedPerTon: parseFloat(capexAmortizedPerTon.toFixed(2)),
      opexElectricityPerTon: parseFloat(opexElectricityPerTon.toFixed(2)),
      opexThermalPerTon: parseFloat(opexThermalPerTon.toFixed(2)),
      opexSorbentReagentPerTon: parseFloat(sorbentCostPerTon.toFixed(2)),
      opexMaintenancePerTon: parseFloat(maintenanceCostPerTon.toFixed(2)),
      totalCostPerTonCo2: parseFloat(totalCostPerTonCo2.toFixed(2))
    },
    couplingPtX: {
      syngasCoOutputNm3H: parseFloat(syngasCoOutputNm3H.toFixed(1)),
      greenH2RequiredKgH: parseFloat(greenH2RequiredKgH.toFixed(1)),
      eKeroseneProductionLitersDay: parseFloat(eKeroseneProductionLitersDay.toFixed(1))
    }
  };
}

/**
 * Returns comprehensive benchmark comparison between leading DAC approaches.
 */
export function compareDacTechnologies(): DacTechComparison[] {
  return [
    {
      name: 'Liquid Solvent Absorption (KOH / CaCO3)',
      type: 'LIQUID_KOH',
      sorbentMaterial: 'Dung môi nước KOH 2.0M + Đá vôi Ca(OH)2',
      desorptionTempC: 900,
      thermalEnergyGjTon: 8.1,
      electricEnergyKwhTon: 400,
      waterBalance: 'Tiêu hao nước ~4.5 m³/tấn CO2 (bay hơi tháp giải nhiệt)',
      stackFootprintM2PerTonYr: 0.4,
      currentCostUsdTon: 280,
      matureCostUsdTon2035: 110,
      keyAdvantage: 'Hóa chất rẻ tiền (KOH, đá vôi), thiết bị quy mô khổng lồ (Megaton/năm)',
      keyChallenge: 'Đòi hỏi nhiệt độ cực cao (900°C) cho lò nung vôi, thất thoát nước'
    },
    {
      name: 'Solid Sorbent TVSA (Amine-Cellulose)',
      type: 'SOLID_AMINE_TVSA',
      sorbentMaterial: 'Nhựa xốp / sợi xenlulo biến tính Polyethylenimine (PEI)',
      desorptionTempC: 100,
      thermalEnergyGjTon: 5.4,
      electricEnergyKwhTon: 300,
      waterBalance: 'Sản sinh nước sạch ~1.2 m³/tấn CO2 (thu từ hơi ẩm không khí)',
      stackFootprintM2PerTonYr: 1.2,
      currentCostUsdTon: 350,
      matureCostUsdTon2035: 130,
      keyAdvantage: 'Chỉ cần nhiệt độ thấp 100°C (dễ dùng nhiệt thải, địa nhiệt), module linh hoạt',
      keyChallenge: 'Giá thành vật liệu amine cao, suy giảm hoạt tính sau nhiều chu kỳ nung hút'
    }
  ];
}
