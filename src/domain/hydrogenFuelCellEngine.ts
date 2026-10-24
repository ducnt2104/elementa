// src/domain/hydrogenFuelCellEngine.ts
// Domain Engine: Hydrogen Fuel Cells (PEMFC & SOFC) & Electrocatalytic Oxygen Reduction (ORR)
// Standards: IUPAC Electrochemistry, DOE Technical Targets & Vietnam GDPT 2018 (Hóa 10 & 12: Điện hóa học, Oxi hóa khử, Năng lượng Hydro Xanh)

export type FuelCellTechnology = 'PEMFC_PROTON_EXCHANGE' | 'SOFC_SOLID_OXIDE' | 'AEMFC_ANION_EXCHANGE';

export interface FuelCellSystemSpec {
  id: FuelCellTechnology;
  nameVi: string;
  scientificName: string;
  operatingTempCelsiusRange: [number, number];
  chargeCarrierIon: 'H+' | 'O2-' | 'OH-';
  chargeCarrierNameVi: string;
  electrolyteMaterialVi: string;
  anodeReactionVi: string;
  cathodeReactionVi: string;
  overallReactionVi: string;
  standardCellPotentialV: number; // E° = 1.229 V at 25°C
  anodeCatalystVi: string;
  cathodeCatalystVi: string;
  typicalAreaSpecificResistanceOhmCm2: number; // ASR (Ω·cm²)
  exchangeCurrentDensityOrrMaCm2: number; // j0_c for ORR (mA/cm²)
  limitingCurrentDensityACm2: number; // j_lim (A/cm²)
  fuelFlexibilityVi: string;
  primaryApplicationsVi: string;
  systemEfficiencyLhvPercent: number; // LHV efficiency (%)
}

export interface FuelCellPolarizationPoint {
  currentDensityACm2: number;
  cellVoltageV: number;
  powerDensityWCm2: number;
  activationLossV: number;
  ohmicLossV: number;
  concentrationLossV: number;
  electricalEfficiencyPercent: number; // Based on Higher Heating Value HHV (1.482V)
}

export interface FcevStackPerformanceResult {
  system: FuelCellSystemSpec;
  cellCount: number;
  singleCellActiveAreaCm2: number;
  operatingCurrentDensityACm2: number;
  singleCellVoltageV: number;
  stackTotalVoltageV: number;
  stackCurrentAmperes: number;
  stackElectricPowerKw: number;
  stackEfficiencyPercent: number;
  hydrogenConsumptionKgPerHour: number;
  waterProductionLitersPerHour: number;
  h2TankCapacityKg: number;
  drivingRangeKm: number;
  co2EmissionsGramsPerKm: number; // Strictly 0 g/km
  wasteHeatGenerationKw: number;
}

// 1. Danh mục Công Nghệ Pin Nhiên Liệu Hydro Tiên Tiến
export const FUEL_CELL_SYSTEMS_CATALOG: FuelCellSystemSpec[] = [
  {
    id: 'PEMFC_PROTON_EXCHANGE',
    nameVi: 'Pin Nhiên Liệu Màng Trao Đổi Proton (PEMFC)',
    scientificName: 'Proton Exchange Membrane Fuel Cell',
    operatingTempCelsiusRange: [60, 80],
    chargeCarrierIon: 'H+',
    chargeCarrierNameVi: 'Proton H⁺ hydrat hóa (Cơ chế Grotthuss)',
    electrolyteMaterialVi: 'Màng polymer Perfluorosulfonic acid (Nafion 211 / 212)',
    anodeReactionVi: '2H₂ → 4H⁺ + 4e⁻ (E° = 0.00 V vs SHE, Oxi hóa hydro HOR)',
    cathodeReactionVi: 'O₂ + 4H⁺ + 4e⁻ → 2H₂O (E° = +1.229 V vs SHE, Khử oxy ORR)',
    overallReactionVi: '2H₂ + O₂ → 2H₂O + Nhiệt + Điện năng',
    standardCellPotentialV: 1.229,
    anodeCatalystVi: 'Hạt nano Platin trên muội than (Pt/C, tải lượng cực thấp 0.05 mg/cm²)',
    cathodeCatalystVi: 'Hợp kim nano bát diện Pt₃Ni/C hoặc Pt-Co định hình diện tích cao',
    typicalAreaSpecificResistanceOhmCm2: 0.065,
    exchangeCurrentDensityOrrMaCm2: 0.025, // ORR chậm chạp trên Pt
    limitingCurrentDensityACm2: 2.2,
    fuelFlexibilityVi: 'Yêu cầu Hydro siêu tinh khiết (> 99.97%), rất nhạy cảm với ngộ độc CO (< 0.2 ppm).',
    primaryApplicationsVi: 'Ô tô điện pin nhiên liệu FCEV (Toyota Mirai, Hyundai Nexo), xe buýt đô thị, tàu hỏa hydro Alstom Coradia iLint, máy bay không người lái.',
    systemEfficiencyLhvPercent: 60.0
  },
  {
    id: 'SOFC_SOLID_OXIDE',
    nameVi: 'Pin Nhiên Liệu Gốm Oxit Rắn Nhiệt Cao (SOFC)',
    scientificName: 'Solid Oxide Fuel Cell',
    operatingTempCelsiusRange: [700, 850],
    chargeCarrierIon: 'O2-',
    chargeCarrierNameVi: 'Ion oxy O²⁻ dẫn truyền qua khuyết tật mạng tinh thể',
    electrolyteMaterialVi: 'Gốm Yttria-Stabilized Zirconia (8YSZ: (ZrO₂)₀.₉₂(Y₂O₃)₀.₀₈)',
    anodeReactionVi: '2H₂ + 2O²⁻ → 2H₂O + 4e⁻ (hoặc CH₄ + 4O²⁻ → CO₂ + 2H₂O + 8e⁻)',
    cathodeReactionVi: 'O₂ + 4e⁻ → 2O²⁻ (Khử oxy ở pha khí trên gốm dẫn hỗn hợp MIEC LSCF)',
    overallReactionVi: '2H₂ + O₂ → 2H₂O (hoặc biến đổi trực tiếp khí sinh học / mêtan)',
    standardCellPotentialV: 1.18, // Ở 800°C giảm do biến thiên entropy ΔS
    anodeCatalystVi: 'Cermet hỗn hợp Niken-Zirconia (Ni-YSZ xốp)',
    cathodeCatalystVi: 'Perovskite (La,Sr)(Co,Fe)O₃ (LSCF) hoặc LSM',
    typicalAreaSpecificResistanceOhmCm2: 0.18,
    exchangeCurrentDensityOrrMaCm2: 0.85, // Nhiệt độ cao kích hoạt động học ORR rất nhanh
    limitingCurrentDensityACm2: 1.6,
    fuelFlexibilityVi: 'Đa dạng nhiên liệu xuất sắc: Tự reforming nội bộ khí tự nhiên CH₄, biogas, khí than syngas (H₂ + CO) mà không sợ ngộ độc CO.',
    primaryApplicationsVi: 'Phát điện đồng phát nhiệt - điện (CHP) hiệu suất tổng hợp > 85%, trạm điện vi lưới phân tán, trung tâm dữ liệu AI sạch.',
    systemEfficiencyLhvPercent: 65.0
  },
  {
    id: 'AEMFC_ANION_EXCHANGE',
    nameVi: 'Pin Nhiên Liệu Màng Trao Đổi Anion Kiềm (AEMFC)',
    scientificName: 'Anion Exchange Membrane Fuel Cell',
    operatingTempCelsiusRange: [50, 70],
    chargeCarrierIon: 'OH-',
    chargeCarrierNameVi: 'Anion Hydroxit OH⁻',
    electrolyteMaterialVi: 'Màng polymer chứa nhóm cation amoni bậc bốn (QAPPO / PAP-TPN)',
    anodeReactionVi: '2H₂ + 4OH⁻ → 4H₂O + 4e⁻ (E° = -0.828 V vs SHE)',
    cathodeReactionVi: 'O₂ + 2H₂O + 4e⁻ → 4OH⁻ (E° = +0.401 V vs SHE)',
    overallReactionVi: '2H₂ + O₂ → 2H₂O',
    standardCellPotentialV: 1.229,
    anodeCatalystVi: 'Hợp kim Niken-Vonfram (Ni-W) hoặc Ru/C phi platin',
    cathodeCatalystVi: 'Kim loại chuyển tiếp Fe-N-C phi quý kim (PGM-free) giá rẻ',
    typicalAreaSpecificResistanceOhmCm2: 0.085,
    exchangeCurrentDensityOrrMaCm2: 0.08,
    limitingCurrentDensityACm2: 1.8,
    fuelFlexibilityVi: 'Môi trường kiềm cho phép dùng xúc tác kim loại rẻ tiền (Ni, Fe, Co), không cần kim loại quý Platin.',
    primaryApplicationsVi: 'Bộ nguồn di động chi phí thấp, lưu trữ năng lượng hydro thương mại bình dân hóa.',
    systemEfficiencyLhvPercent: 55.0
  }
];

// Helper: Lấy danh mục pin nhiên liệu
export function getFuelCellSystems(): FuelCellSystemSpec[] {
  return FUEL_CELL_SYSTEMS_CATALOG;
}

// 2. Tính toán Điện thế Cực Thuận Nghịch Nernst theo Nhiệt độ & Áp suất
export function calculateReversibleCellVoltage(
  techId: FuelCellTechnology,
  temperatureCelsius: number = 75.0,
  pressureBar: number = 2.0
): number {
  const tempKelvin = temperatureCelsius + 273.15;
  const standardTempK = 298.15;

  // Đối với phản ứng H2 + 1/2 O2 -> H2O:
  // ΔG° = -237.13 kJ/mol, ΔS° = -44.34 J/(mol·K)
  // E_rev = E° + (ΔS / nF) * (T - 298.15) + (RT / nF) * ln(P_H2 * P_O2^0.5)
  const F = 96485.33; // C/mol
  const R = 8.314; // J/(mol·K)
  const deltaS = -44.34; // J/(mol·K) per mole H2

  let baseE0 = 1.229;
  if (techId === 'SOFC_SOLID_OXIDE') {
    // Ở nhiệt độ cao, nước sinh ra ở thể hơi: ΔG°_800C thấp hơn
    baseE0 = 1.18;
  }

  const tempCorrection = (deltaS / (2.0 * F)) * (tempKelvin - standardTempK);
  // Nernst pressure term: assume pure H2 at pressureBar, air cathode (P_O2 = 0.21 * pressureBar)
  const pO2 = 0.21 * pressureBar;
  const nernstPressureTerm = ((R * tempKelvin) / (2.0 * F)) * Math.log(pressureBar * Math.sqrt(pO2));

  const eRev = baseE0 + tempCorrection + nernstPressureTerm;
  return Math.max(0.95, Math.round(eRev * 1000) / 1000);
}

// 3. Tạo Đường Cong Phân Cực Pin Nhiên Liệu V-J và P-J
export function generateFuelCellPolarizationCurve(
  techId: FuelCellTechnology,
  temperatureCelsius: number = 75.0,
  pressureBar: number = 2.0
): FuelCellPolarizationPoint[] {
  const spec = FUEL_CELL_SYSTEMS_CATALOG.find(s => s.id === techId) || FUEL_CELL_SYSTEMS_CATALOG[0];
  const eRev = calculateReversibleCellVoltage(techId, temperatureCelsius, pressureBar);

  const points: FuelCellPolarizationPoint[] = [];
  const steps = 30;
  const dJ = spec.limitingCurrentDensityACm2 / steps;

  // Hằng số Tafel cho phản ứng khử oxy ORR: b = 2.303 * RT / (alpha * F) ~ 0.07 V/dec
  const tempK = temperatureCelsius + 273.15;
  const tafelSlope = 0.026 * (tempK / 298.15) * 2.303; // ~ 0.06 - 0.08 V

  for (let i = 0; i <= steps; i++) {
    const j = i * dJ; // A/cm²

    if (j === 0) {
      points.push({
        currentDensityACm2: 0,
        cellVoltageV: eRev,
        powerDensityWCm2: 0,
        activationLossV: 0,
        ohmicLossV: 0,
        concentrationLossV: 0,
        electricalEfficiencyPercent: Math.round((eRev / 1.482) * 1000) / 10
      });
      continue;
    }

    // 1. Tổn thất hoạt hóa ORR (Tafel equation): eta_act = b * ln( (j * 1000) / j0 )
    // Chuyển j sang mA/cm² để khớp với exchangeCurrentDensityOrrMaCm2
    const currentMaCm2 = j * 1000.0;
    const actRatio = Math.max(1.0, currentMaCm2 / spec.exchangeCurrentDensityOrrMaCm2);
    const activationLoss = Math.min(0.45, tafelSlope * Math.log(actRatio));

    // 2. Tổn thất Ohmic thuần (Nafion membrane + cell contacts): eta_ohm = j * ASR
    const ohmicLoss = j * spec.typicalAreaSpecificResistanceOhmCm2;

    // 3. Tổn thất nồng độ / trở ngại khuếch tán khí: eta_conc = -m * ln(1 - j / j_lim)
    const ratioLim = j / spec.limitingCurrentDensityACm2;
    let concentrationLoss = 0.0;
    if (ratioLim > 0.8) {
      concentrationLoss = 0.03 - 0.08 * Math.log(Math.max(0.01, 1.0 - ratioLim));
    } else {
      concentrationLoss = 0.03 * ratioLim;
    }

    const cellVoltageRaw = eRev - activationLoss - ohmicLoss - concentrationLoss;
    const cellVoltage = Math.max(0.0, Math.round(cellVoltageRaw * 1000) / 1000);
    const powerDensity = Math.round(cellVoltage * j * 1000) / 1000; // W/cm²

    // Hiệu suất điện năng dựa trên Nhiệt trị cao HHV của Hydro (1.482 V)
    // eta_el = V_cell / 1.482
    const electricalEfficiencyPercent = Math.min(100.0, Math.round((cellVoltage / 1.482) * 1000) / 10);

    points.push({
      currentDensityACm2: Math.round(j * 100) / 100,
      cellVoltageV: cellVoltage,
      powerDensityWCm2: powerDensity,
      activationLossV: Math.round(activationLoss * 1000) / 1000,
      ohmicLossV: Math.round(ohmicLoss * 1000) / 1000,
      concentrationLossV: Math.round(concentrationLoss * 1000) / 1000,
      electricalEfficiencyPercent
    });
  }

  return points;
}

// 4. Mô Phỏng Bộ Pin Nhiên Liệu FCEV (Fuel Cell Electric Vehicle) & Tầm Hoạt Động
export function simulateFcevStackPerformance(
  techId: FuelCellTechnology = 'PEMFC_PROTON_EXCHANGE',
  cellCount: number = 330, // Toyota Mirai stack có 330 tế bào
  singleCellActiveAreaCm2: number = 300.0, // 300 cm² diện tích hoạt động
  operatingCurrentDensityACm2: number = 1.0, // Điểm làm việc danh định 1.0 A/cm²
  h2TankCapacityKg: number = 5.6 // Bình hydro 700 bar của Toyota Mirai (5.6 kg H2)
): FcevStackPerformanceResult {
  const system = FUEL_CELL_SYSTEMS_CATALOG.find(s => s.id === techId) || FUEL_CELL_SYSTEMS_CATALOG[0];
  const eRev = calculateReversibleCellVoltage(techId, 75.0, 2.0);

  // Động học tại điểm làm việc
  const tafelSlope = 0.07;
  const currentMaCm2 = operatingCurrentDensityACm2 * 1000.0;
  const actLoss = Math.min(0.42, tafelSlope * Math.log(Math.max(1.0, currentMaCm2 / system.exchangeCurrentDensityOrrMaCm2)));
  const ohmicLoss = operatingCurrentDensityACm2 * system.typicalAreaSpecificResistanceOhmCm2;
  const ratioLim = operatingCurrentDensityACm2 / system.limitingCurrentDensityACm2;
  const concLoss = ratioLim > 0.8
    ? 0.03 - 0.08 * Math.log(Math.max(0.01, 1.0 - ratioLim))
    : 0.03 * ratioLim;

  const singleCellVoltageRaw = eRev - actLoss - ohmicLoss - concLoss;
  const singleCellVoltageV = Math.max(0.4, Math.round(singleCellVoltageRaw * 1000) / 1000);

  // Tổng điện thế stack (V)
  const stackTotalVoltageV = Math.round(singleCellVoltageV * cellCount * 10) / 10;

  // Dòng điện tổng của stack: I = J * Area (A)
  const stackCurrentAmperes = Math.round(operatingCurrentDensityACm2 * singleCellActiveAreaCm2 * 10) / 10;

  // Công suất điện của stack: P = V_total * I (kW)
  const stackElectricPowerWatts = stackTotalVoltageV * stackCurrentAmperes;
  const stackElectricPowerKw = Math.round((stackElectricPowerWatts / 1000.0) * 10) / 10;

  // Hiệu suất điện stack (%)
  const stackEfficiencyPercent = Math.round((singleCellVoltageV / 1.482) * 1000) / 10;

  // Định luật Faraday tính mức tiêu hao hydro m_dot = (N * I * M_H2) / (2 * F)
  // M_H2 = 2.016 g/mol = 0.002016 kg/mol, F = 96485 C/mol
  // m_dot (kg/s) -> kg/h
  const h2PerSecondKg = (cellCount * stackCurrentAmperes * 0.002016) / (2.0 * 96485.33);
  const hydrogenConsumptionKgPerHour = Math.round(h2PerSecondKg * 3600.0 * 100) / 100;

  // Sản sinh nước tinh khiết H2O: 1 mol H2 tạo 1 mol H2O (18.015 g = 0.018015 kg = 0.018015 L)
  const waterProductionLitersPerHour = Math.round(hydrogenConsumptionKgPerHour * (18.015 / 2.016) * 10) / 10;

  // Tốc độ sinh nhiệt hao phí (Waste heat): P_thermal = (1.482 - V_cell) * I * N (kW)
  const thermalWatts = (1.482 - singleCellVoltageV) * stackCurrentAmperes * cellCount;
  const wasteHeatGenerationKw = Math.round((thermalWatts / 1000.0) * 10) / 10;

  // Tầm hoạt động FCEV: Tiêu thụ trung bình 0.76 kg H2 / 100 km (chuẩn WLTP Toyota Mirai)
  const consumptionPer100Km = 0.78;
  const drivingRangeKm = Math.round((h2TankCapacityKg / consumptionPer100Km) * 100);

  return {
    system,
    cellCount,
    singleCellActiveAreaCm2,
    operatingCurrentDensityACm2,
    singleCellVoltageV,
    stackTotalVoltageV,
    stackCurrentAmperes,
    stackElectricPowerKw,
    stackEfficiencyPercent,
    hydrogenConsumptionKgPerHour,
    waterProductionLitersPerHour,
    h2TankCapacityKg,
    drivingRangeKm,
    co2EmissionsGramsPerKm: 0,
    wasteHeatGenerationKw
  };
}
