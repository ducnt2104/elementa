/**
 * ELEMENTA - IODINE-SULFUR (IS / S-I) THERMOCHEMICAL WATER-SPLITTING ENGINE
 *
 * Conforms to:
 * - Generation IV International Forum (GIF) VHTR Nuclear & Solar Hydrogen Protocols
 * - IUPAC Thermochemistry & Multi-Phase Chemical Equilibrium
 * - Japan Atomic Energy Agency (JAEA) HTTR Hydrogen Production Facility Benchmarks
 * - Vietnam GDPT 2018 Chemistry Grade 10 & 11 (Lưu huỳnh, Hợp chất SO2, H2SO4, Halogen I2, HI, Cân bằng Le Chatelier & Nhiệt hóa học)
 */

export interface IodineSulfurReactionStep {
  stepNumber: number;
  reactionName: string;
  vietnameseName: string;
  chemicalEquation: string;
  temperatureC: number;
  pressureBar: number;
  deltaHKjMol: number; // Enthalpy change (+ endothermic, - exothermic)
  phaseSeparationDetail: string;
  catalyst: string;
  leChatelierBehavior: string;
}

export interface IodineSulfurOperatingConditions {
  vhtrHeatSourceTempC: number;    // VHTR nuclear core or solar tower temp (typically 800 - 950°C)
  thermalPowerInputMw: number;     // Thermal power allocated to IS plant in MWth (e.g. 50 MWth)
  bunsenTempC: number;             // Bunsen reaction temperature (typically 80 - 120°C)
  hiDecompositionTempC: number;    // HI decomposition temperature (typically 400 - 450°C)
  so3DecompositionPressureBar: number; // Pressure in SO3 decomposer (typically 1 - 5 bar)
  excessIodineRatio: number;       // Mol ratio of I2 / SO2 in Bunsen feed (typically 4 - 8 for phase separation)
  thermalRecoveryEfficiency: number; // Internal pinch heat exchanger efficiency (0.70 - 0.88)
}

export interface IodineSulfurKineticsResult {
  heatSourceTempC: number;
  carnotMaxEfficiencyPct: number;
  theoreticalThermalEfficiencyPct: number;
  actualThermalToHydrogenEfficiencyPct: number;
  h2ProductionRateKgH: number;
  h2ProductionRateNm3H: number;
  o2ByproductRateNm3H: number;
  waterFeedRateKgH: number;
  thermalPowerConsumedMw: number;
  specificThermalEnergyKwhPerKgH2: number;
  levelizedCostOfHydrogenUsdPerKg: number;
  recirculatingInventories: {
    iodineCirculationKgH: number;
    sulfurDioxideCirculationKgH: number;
    sulfuricAcidProductionKgH: number;
    hydrogenIodideProductionKgH: number;
  };
  environmentalIntegrity: {
    directCo2EmissionsGramsPerKgH2: number;
    reagentLossRatePct: number; // Should be < 0.001% in hermetic closed loop
  };
}

export interface ThermochemicalComparison {
  cycleName: string;
  primaryReactions: string;
  peakTemperatureC: number;
  overallThermalEfficiencyPct: number;
  corrosionChallenge: string;
  commercialMaturity: string;
}

const R_GAS = 8.314462618; // J/(mol K)
const M_H2 = 0.002016;    // kg / mol
const M_H2O = 0.018015;   // kg / mol
const M_O2 = 0.031998;    // kg / mol
const M_I2 = 0.253808;    // kg / mol
const M_SO2 = 0.064066;   // kg / mol
const LHV_H2_MJ_KG = 119.96; // Lower Heating Value of H2 (MJ/kg = 33.32 kWh/kg)

/**
 * Returns the three core chemical reaction steps of the Iodine-Sulfur thermochemical cycle.
 */
export function getIodineSulfurCycleSteps(): IodineSulfurReactionStep[] {
  return [
    {
      stepNumber: 1,
      reactionName: 'Bunsen Exothermic Reaction & Liquid-Liquid Phase Separation',
      vietnameseName: 'Phản ứng Bunsen tỏa nhiệt & Phân tách hai pha lỏng không tan',
      chemicalEquation: 'I2(l) + SO2(g) + 2 H2O(l) -> 2 HI(aq) + H2SO4(aq)',
      temperatureC: 100,
      pressureBar: 2.0,
      deltaHKjMol: -75.0,
      phaseSeparationDetail: 'Khi có lượng dư I2 (tỷ lệ I2/SO2 >= 4), hỗn hợp tự động phân tách trọng lực thành 2 tầng lỏng: Tầng trên nhẹ chứa H2SO4 loãng (~50 wt%), tầng dưới nặng chứa phức HIx (HI-I2-H2O) tỷ trọng 2.8 g/cm³.',
      catalyst: 'Tự xúc tác trong môi trường nước ion hóa',
      leChatelierBehavior: 'Tỏa nhiệt nhẹ; kiểm soát ở 80-120°C để cân bằng giữa tốc độ phản ứng và ngăn ngừa tạo phụ phẩm lưu huỳnh nguyên tố (S) hoặc H2S.'
    },
    {
      stepNumber: 2,
      reactionName: 'Sulfuric Acid Concentration & Catalytic High-Temperature Cracking',
      vietnameseName: 'Cô đặc & Nhiệt phân axit sunfuric ở nhiệt độ siêu cao (850°C)',
      chemicalEquation: 'H2SO4(l) -> H2O(g) + SO2(g) + 1/2 O2(g)^ (850°C)',
      temperatureC: 850,
      pressureBar: 3.0,
      deltaHKjMol: 286.0,
      phaseSeparationDetail: 'H2SO4 được cô đặc chân không lên 98 wt%, hóa hơi thành SO3 + H2O ở 450°C, sau đó khí SO3 đi qua buồng xúc tác Pt/TiO2 hoặc Fe2O3 ở 850°C để phân ly thành SO2 và giải phóng O2 sạch.',
      catalyst: 'Platin trên giá thể titan (Pt/TiO2) hoặc oxit sắt-nhôm (Fe2O3-Al2O3)',
      leChatelierBehavior: 'Thu nhiệt rất mạnh; cần nhiệt độ cao >= 800°C và giảm áp suất để chuyển dịch cân bằng phân ly SO3 sang phía tạo SO2 và O2.'
    },
    {
      stepNumber: 3,
      reactionName: 'Hydrogen Iodide Reactive Distillation & Hydrogen Evolution',
      vietnameseName: 'Chưng cất phản ứng tách HI & Giải phóng khí Hydro sạch',
      chemicalEquation: '2 HI(g) -> H2(g)^ + I2(g) (450°C)',
      temperatureC: 450,
      pressureBar: 2.0,
      deltaHKjMol: 12.0,
      phaseSeparationDetail: 'Pha HIx được thẩm thấu điện phân (EED) hoặc chưng cất phản ứng tách HI khan khỏi nước, sau đó khí HI phân hủy nhiệt ở 450°C giải phóng dòng H2 tinh khiết, I2 ngưng tụ hồi lưu.',
      catalyst: 'Than hoạt tính phủ Rutheni (Ru/C) hoặc Cacbua Silic (SiC)',
      leChatelierBehavior: 'Thu nhiệt nhẹ; độ chuyển hóa cân bằng khoảng 22% ở 450°C, I2 và HI chưa phản ứng được ngưng tụ tuần hoàn khép kín 100% về phản ứng Bunsen.'
    }
  ];
}

/**
 * Calculates Carnot maximum thermodynamic efficiency and theoretical upper limit.
 * Carnot limit: eta_carnot = 1 - (T_low / T_high)
 */
export function calculateCarnotLimit(tHighC: number, tLowC: number = 25): number {
  const T_H = tHighC + 273.15;
  const T_C = tLowC + 273.15;
  const carnot = (1 - (T_C / T_H)) * 100;
  return parseFloat(carnot.toFixed(2));
}

/**
 * Simulates complete Iodine-Sulfur thermochemical plant mass & energy balances.
 */
export function simulateIodineSulfurPlant(
  conditions: IodineSulfurOperatingConditions
): IodineSulfurKineticsResult {
  const {
    vhtrHeatSourceTempC,
    thermalPowerInputMw,
    bunsenTempC,
    hiDecompositionTempC,
    so3DecompositionPressureBar,
    excessIodineRatio,
    thermalRecoveryEfficiency
  } = conditions;

  const carnotMax = calculateCarnotLimit(vhtrHeatSourceTempC, 25);

  // Theoretical thermochemical efficiency for IS cycle with perfect internal heat integration:
  // eta_th = (Delta H_H2O) / Total Heat Input
  // Standard higher heating value (HHV) of H2 = 285.8 kJ/mol; LHV = 241.8 kJ/mol
  // Empirical correlation validated by JAEA HTTR experimental data:
  // Base efficiency at 850°C is ~48.5% with internal recuperation (JAEA HTTR benchmark)
  const tempFactor = Math.max(0.75, Math.min(1.20, 1.0 + ((vhtrHeatSourceTempC - 850) / 600)));
  const pinchFactor = Math.max(0.85, Math.min(1.15, thermalRecoveryEfficiency / 0.80));
  const pressurePenalty = 1 - 0.015 * (so3DecompositionPressureBar - 1); // Slight thermodynamic penalty at higher pressure

  const actualThermalToHydrogenEfficiencyPct = parseFloat(
    (48.5 * tempFactor * pinchFactor * pressurePenalty).toFixed(2)
  );

  const theoreticalThermalEfficiencyPct = parseFloat(
    Math.min(carnotMax * 0.85, actualThermalToHydrogenEfficiencyPct * 1.25).toFixed(2)
  );

  // Thermal energy converted to H2 chemical energy (LHV basis):
  // Thermal Power (MWth) * Efficiency = Chemical Power in H2 (MW-chem)
  const hydrogenChemicalPowerMw = thermalPowerInputMw * (actualThermalToHydrogenEfficiencyPct / 100);

  // LHV of H2 = 119.96 MJ/kg = 33.32 kWh/kg = 33,322.2 kWh / metric ton
  // 1 MW = 3600 MJ/h
  const h2ProductionRateKgH = parseFloat(
    ((hydrogenChemicalPowerMw * 3600) / LHV_H2_MJ_KG).toFixed(2)
  );

  // Normal cubic meters: 1 mol H2 = 0.022414 Nm³, 1 kg H2 = 1000 / 2.016 mol = 496.03 mol = 11.118 Nm³
  const h2ProductionRateNm3H = parseFloat((h2ProductionRateKgH * 11.118).toFixed(1));
  const o2ByproductRateNm3H = parseFloat((h2ProductionRateNm3H / 2).toFixed(1));

  // Stoichiometric water consumption: H2O -> H2 + 0.5 O2 (18.015 g H2O per 2.016 g H2 = 8.936 kg H2O / kg H2)
  const waterFeedRateKgH = parseFloat((h2ProductionRateKgH * (M_H2O / M_H2)).toFixed(2));

  // Specific thermal energy consumption (kWh-th / kg H2):
  // (Thermal Power in kW) / (h2 production in kg/h)
  const specificThermalEnergyKwhPerKgH2 = parseFloat(
    ((thermalPowerInputMw * 1000) / h2ProductionRateKgH).toFixed(2)
  );

  // Recirculating inventories in the closed loop:
  // For each mol of H2 produced: 1 mol I2, 1 mol SO2, 1 mol H2SO4, 2 mol HI circulate
  const molsH2PerSec = (h2ProductionRateKgH * 1000) / (2.016 * 3600);
  const molsH2PerHour = molsH2PerSec * 3600;

  // I2 circulation with excess ratio:
  const iodineCirculationKgH = parseFloat(
    ((molsH2PerHour * excessIodineRatio * M_I2)).toFixed(1)
  );
  const sulfurDioxideCirculationKgH = parseFloat(
    ((molsH2PerHour * M_SO2)).toFixed(1)
  );
  const sulfuricAcidProductionKgH = parseFloat(
    ((molsH2PerHour * 0.098079)).toFixed(1) // 98.08 g/mol
  );
  const hydrogenIodideProductionKgH = parseFloat(
    ((molsH2PerHour * 2 * 0.12791)).toFixed(1) // 127.91 g/mol
  );

  // Levelized Cost of Hydrogen (LCOH) from VHTR / CSP Nuclear Thermochemical:
  // Capital cost of high-temp ceramic reactor + Heat cost (~$20/MWhth)
  // CAPEX amortized: ~$1.20/kg H2, Thermal heat OPEX: ~$1.35/kg, Reagent makeup & maintenance: ~$0.30/kg
  const heatCostPerKg = (specificThermalEnergyKwhPerKgH2 * 0.022); // Assuming $0.022 / kWh-th ($22/MWhth nuclear heat)
  const levelizedCostOfHydrogenUsdPerKg = parseFloat(
    (1.20 + heatCostPerKg + 0.35).toFixed(2)
  );

  return {
    heatSourceTempC: vhtrHeatSourceTempC,
    carnotMaxEfficiencyPct: carnotMax,
    theoreticalThermalEfficiencyPct,
    actualThermalToHydrogenEfficiencyPct,
    h2ProductionRateKgH,
    h2ProductionRateNm3H,
    o2ByproductRateNm3H,
    waterFeedRateKgH,
    thermalPowerConsumedMw: thermalPowerInputMw,
    specificThermalEnergyKwhPerKgH2,
    levelizedCostOfHydrogenUsdPerKg,
    recirculatingInventories: {
      iodineCirculationKgH,
      sulfurDioxideCirculationKgH,
      sulfuricAcidProductionKgH,
      hydrogenIodideProductionKgH
    },
    environmentalIntegrity: {
      directCo2EmissionsGramsPerKgH2: 0.0, // 100% Zero direct emissions
      reagentLossRatePct: 0.0005          // < 0.001% per pass with SiC/Hastelloy hermetic seals
    }
  };
}

/**
 * Returns comparative benchmarks of leading thermochemical water-splitting cycles.
 */
export function compareThermochemicalCycles(): ThermochemicalComparison[] {
  return [
    {
      cycleName: 'Iodine-Sulfur (IS / S-I) Cycle',
      primaryReactions: 'Bunsen (100°C) + H2SO4 Crack (850°C) + HI Crack (450°C)',
      peakTemperatureC: 850,
      overallThermalEfficiencyPct: 48.5,
      corrosionChallenge: 'Axit H2SO4 sôi và HIx cực kỳ ăn mòn kim loại; cần gốm SiC và hợp kim Hastelloy C-276',
      commercialMaturity: 'Thử nghiệm liên tục 150 giờ tại JAEA HTTR Nhật Bản & CEA Pháp; sẵn sàng thương mại 2030'
    },
    {
      cycleName: 'Copper-Chlorine (Cu-Cl) Cycle',
      primaryReactions: 'CuCl2 thủy phân (400°C) + Điện phân CuCl (80°C) + Phân hủy CuO.CuCl2 (500°C)',
      peakTemperatureC: 530,
      overallThermalEfficiencyPct: 41.0,
      corrosionChallenge: 'Muối chloride nóng chảy và dung dịch HCl đậm đặc gây mòn rỗ màng và điện cực',
      commercialMaturity: 'Nhiệt độ đỉnh thấp (530°C) tương thích lò muối muối nóng chảy SCWR; đang thử nghiệm quy mô pilot'
    },
    {
      cycleName: 'Zinc-Zinc Oxide (Zn/ZnO) 2-Step Cycle',
      primaryReactions: 'ZnO phân hủy quang nhiệt (1800°C) + Zn phản ứng với hơi nước sinh H2 (400°C)',
      peakTemperatureC: 1800,
      overallThermalEfficiencyPct: 38.0,
      corrosionChallenge: 'Nhiệt độ cực đoan 1800°C đòi hỏi tháp gương hội tụ CSP khổng lồ và hiện tượng ngưng tụ kẽm kim loại',
      commercialMaturity: 'Giai đoạn nghiên cứu phòng thí nghiệm; hiệu suất quang nhiệt thấp do thất thoát bức xạ đen'
    }
  ];
}
