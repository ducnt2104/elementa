// src/domain/metalAirBatteryEngine.ts
// Domain Engine: Metal-Air Batteries (Zinc-Air & Lithium-Air), Gas Diffusion Cathodes & Open-Breathe Systems
// Standards: IUPAC Electrochemistry, Open-Atmosphere Secondary Systems & Vietnam GDPT 2018 (Hóa 10 & 12: Kim loại kiềm/chuyển tiếp & Pin hít thở không khí)

export type MetalAirChemistryType = 'ZINC_AIR_AQUEOUS' | 'LITHIUM_AIR_APROTIC' | 'ALUMINUM_AIR_PRIMARY' | 'SODIUM_AIR_BATTERY';

export interface MetalAirBatterySpec {
  id: MetalAirChemistryType;
  nameVi: string;
  scientificName: string;
  anodeMetalVi: string;
  anodeReactionVi: string;
  cathodeReactionVi: string;
  overallReactionVi: string;
  theoreticalCellVoltageV: number; // E°_cell
  practicalWorkingVoltageV: number;
  theoreticalSpecificEnergyWhKg: number; // Loại trừ khối lượng O2 vì hít từ khí quyển
  practicalEnergyDensityWhKg: number;
  electrolyteTypeVi: string;
  bifunctionalCatalystOrrOerVi: string;
  rechargeabilityVi: 'ELECTRICALLY_RECHARGEABLE' | 'MECHANICALLY_REFUELED_ZINC_PELLETS' | 'PRIMARY_DISPOSABLE';
  ambientContaminantSensitivityVi: string; // Độ nhạy với CO2 và độ ẩm H2O
  primaryApplicationsVi: string;
}

export interface GasDiffusionElectrodePoint {
  oxygenPartialPressureBar: number;
  currentDensityMaCm2: number;
  cellVoltageV: number;
  powerDensityMilliWCm2: number;
  triphaseBoundaryStateVi: 'OPTIMAL_TRIPLE_PHASE' | 'ELECTROLYTE_FLOODING' | 'GAS_STARVATION';
}

export interface MetalAirSimulationResult {
  battery: MetalAirBatterySpec;
  metalAnodeMassGrams: number;
  oxygenConsumedLiters: number;
  deliveredEnergyWattHours: number;
  operatingDurationHours: number;
  co2ScrubberRequired: boolean;
  zincDendriteSuppressionStatusVi: string;
  safetyScoreOutOf10: number;
  verdictVi: string;
}

// 1. Danh mục Công Nghệ Pin Kim Loại - Không Khí (Metal-Air)
export const METAL_AIR_CHEMISTRIES_CATALOG: MetalAirBatterySpec[] = [
  {
    id: 'ZINC_AIR_AQUEOUS',
    nameVi: 'Pin Kẽm - Không Khí Dung Môi Nước (Zinc-Air Battery)',
    scientificName: 'Aqueous Zinc-Air Secondary Battery',
    anodeMetalVi: 'Kẽm kim loại (Zn) dạng xốp hoặc hạt vi mô',
    anodeReactionVi: 'Zn + 4OH⁻ ⇌ Zn(OH)₄²⁻ + 2e⁻ → ZnO + H₂O + 2OH⁻ (E° = -1.25 V vs SHE)',
    cathodeReactionVi: 'O₂ + 2H₂O + 4e⁻ ⇌ 4OH⁻ (E° = +0.40 V vs SHE, Khử / Tiến hóa Oxy ORR/OER)',
    overallReactionVi: '2Zn + O₂ ⇌ 2ZnO (E° = 1.65 V, Thực tế ~ 1.25 V)',
    theoreticalCellVoltageV: 1.65,
    practicalWorkingVoltageV: 1.25,
    theoreticalSpecificEnergyWhKg: 1086.0,
    practicalEnergyDensityWhKg: 450.0,
    electrolyteTypeVi: 'Dung dịch kiềm kiềm hóa KOH 6 M (hoặc điện giải muối trung tính ZnSO₄)',
    bifunctionalCatalystOrrOerVi: 'Spinel oxit hỗn hợp Coban-Mangan Co₃O₄/Mn₃O₄ trên ống nano carbon (CNT)',
    rechargeabilityVi: 'ELECTRICALLY_RECHARGEABLE',
    ambientContaminantSensitivityVi: 'Khí CO₂ phản ứng với KOH tạo muối kết tủa K₂CO₃ làm tắc nghẽn mao quản; cần lớp màng kỵ nước PTFE chọn lọc O₂.',
    primaryApplicationsVi: 'Máy trợ thính y tế (Hearing aids), lưu trữ điện lưới trạm vi mô thành phố, đèn tín hiệu phao cứu sinh đường biển.'
  },
  {
    id: 'LITHIUM_AIR_APROTIC',
    nameVi: 'Pin Lithi - Không Khí Phi Proton (Li-Air / Li-O₂ - Đỉnh Cao Lý Thuyết)',
    scientificName: 'Non-Aqueous Lithium-Oxygen Battery',
    anodeMetalVi: 'Lithi kim loại (Li) siêu tinh khiết',
    anodeReactionVi: '2Li ⇌ 2Li⁺ + 2e⁻ (E° = -3.04 V vs SHE)',
    cathodeReactionVi: 'O₂ + 2Li⁺ + 2e⁻ ⇌ Li₂O₂ (kết tủa hình xuyến Toroid, E° = +2.96 V vs SHE)',
    overallReactionVi: '2Li + O₂ ⇌ Li₂O₂ (E° = 2.96 V, Tương đương xăng dầu)',
    theoreticalCellVoltageV: 2.96,
    practicalWorkingVoltageV: 2.70,
    theoreticalSpecificEnergyWhKg: 3505.0, // Đỉnh cao lý thuyết của pin hóa học
    practicalEnergyDensityWhKg: 950.0,
    electrolyteTypeVi: 'Dung môi aprotic hữu cơ bền (Tetraglyme / DMSO) chứa muối LiTFSI',
    bifunctionalCatalystOrrOerVi: 'Cụm nano Rutheni Ru/MnO₂ kết hợp chất con thoi oxy hóa khử (Redox Mediator TEMPO/LiI)',
    rechargeabilityVi: 'ELECTRICALLY_RECHARGEABLE',
    ambientContaminantSensitivityVi: 'Rất nhạy cảm: Hơi ẩm H₂O và CO₂ phản ứng với Li tạo LiOH và Li₂CO₃ không thể sạc lại, cần hệ thống màng lọc O₂ tinh khiết.',
    primaryApplicationsVi: 'Hàng không không gian vũ trụ, xe điện siêu cự ly (> 1,200 km một lần sạc), máy bay không người lái thám hiểm vùng sâu.'
  },
  {
    id: 'ALUMINUM_AIR_PRIMARY',
    nameVi: 'Pin Nhôm - Không Khí Năng Lượng Cực Đại (Aluminum-Air Refuelable)',
    scientificName: 'Aluminum-Air Mechanical Battery',
    anodeMetalVi: 'Nhôm hợp kim (Al-Sn-Ga) tái chế',
    anodeReactionVi: 'Al + 4OH⁻ → Al(OH)₄⁻ + 3e⁻ (E° = -2.31 V vs SHE)',
    cathodeReactionVi: 'O₂ + 2H₂O + 4e⁻ → 4OH⁻ (E° = +0.40 V vs SHE)',
    overallReactionVi: '4Al + 3O₂ + 6H₂O → 4Al(OH)₃ (E° = 2.71 V, Thực tế 1.5 V)',
    theoreticalCellVoltageV: 2.71,
    practicalWorkingVoltageV: 1.50,
    theoreticalSpecificEnergyWhKg: 2790.0,
    practicalEnergyDensityWhKg: 1300.0,
    electrolyteTypeVi: 'Dung dịch nước kiềm KOH hoặc muối ăn NaCl trung tính',
    bifunctionalCatalystOrrOerVi: 'Mangan oxit nano MnO₂ trên muội than rẻ tiền',
    rechargeabilityVi: 'MECHANICALLY_REFUELED_ZINC_PELLETS',
    ambientContaminantSensitivityVi: 'Chống chịu tốt khí quyển, Al(OH)₃ sinh ra được thu hồi về nhà máy luyện kim điện phân tái sinh Al.',
    primaryApplicationsVi: 'Bộ nguồn mở rộng tầm hoạt động khẩn cấp cho xe tải đường trường (chạy 2,500 km chỉ cần thay tấm nhôm trong 3 phút).'
  }
];

// Helper: Lấy danh mục pin kim loại - không khí
export function getMetalAirChemistries(): MetalAirBatterySpec[] {
  return METAL_AIR_CHEMISTRIES_CATALOG;
}

// 2. Mô Phỏng Điện Cực Khuếch Tán Khí (Gas Diffusion Electrode - GDE)
export function simulateGasDiffusionElectrode(
  chemistryId: MetalAirChemistryType = 'ZINC_AIR_AQUEOUS',
  oxygenPartialPressureBar: number = 0.21 // Mặc định 21% O2 trong không khí
): GasDiffusionElectrodePoint[] {
  const spec = METAL_AIR_CHEMISTRIES_CATALOG.find(b => b.id === chemistryId) || METAL_AIR_CHEMISTRIES_CATALOG[0];
  const points: GasDiffusionElectrodePoint[] = [];

  const maxJ = 120.0; // mA/cm²
  const steps = 25;

  for (let i = 0; i <= steps; i++) {
    const j = (i / steps) * maxJ; // mA/cm²

    // V(j) = V_ocv - eta_activation - j * R_contact - eta_concentration
    // Phân áp Oxy ảnh hưởng trực tiếp tới điện thế Nernst:
    // Delta_V_O2 = (R*T / 4F) * ln(P_O2 / 0.21)
    const nernstO2Term = 0.015 * Math.log(Math.max(0.01, oxygenPartialPressureBar / 0.21));
    const vOcv = spec.practicalWorkingVoltageV + nernstO2Term;

    const actLoss = j === 0 ? 0 : 0.07 * Math.log(1.0 + j / 2.0);
    const ohmicLoss = j * 0.0035; // R_ohm
    const concLoss = Math.pow(j / (maxJ * Math.sqrt(oxygenPartialPressureBar / 0.21)), 3) * 0.25;

    const vCellRaw = vOcv - actLoss - ohmicLoss - concLoss;
    const vCell = Math.max(0.4, Math.round(vCellRaw * 1000) / 1000);
    const pDensity = Math.round(vCell * j * 10) / 10; // mW/cm²

    let boundaryState: 'OPTIMAL_TRIPLE_PHASE' | 'ELECTROLYTE_FLOODING' | 'GAS_STARVATION' = 'OPTIMAL_TRIPLE_PHASE';
    if (j > 90.0) {
      boundaryState = 'GAS_STARVATION'; // Thiếu oxy khuếch tán vào mao quản
    } else if (oxygenPartialPressureBar < 0.1) {
      boundaryState = 'ELECTROLYTE_FLOODING';
    }

    points.push({
      oxygenPartialPressureBar,
      currentDensityMaCm2: Math.round(j * 10) / 10,
      cellVoltageV: vCell,
      powerDensityMilliWCm2: pDensity,
      triphaseBoundaryStateVi: boundaryState
    });
  }

  return points;
}

// 3. Mô Phỏng Toàn Diện Bộ Pin Kim Loại - Không Khí (Metal-Air Simulation)
export function simulateMetalAirSystem(
  chemistryId: MetalAirChemistryType = 'ZINC_AIR_AQUEOUS',
  metalAnodeMassGrams: number = 50.0, // 50g kẽm
  dischargeCurrentMa: number = 500.0 // 500 mA dòng xả
): MetalAirSimulationResult {
  const battery = METAL_AIR_CHEMISTRIES_CATALOG.find(b => b.id === chemistryId) || METAL_AIR_CHEMISTRIES_CATALOG[0];

  // Năng lượng thực tế phân phối: E = m_metal * specific_energy (Wh)
  const deliveredEnergyWattHours = Math.round((metalAnodeMassGrams / 1000.0) * battery.practicalEnergyDensityWhKg * 10) / 10;

  // Lượng oxy hít vào từ không khí:
  // Zn: 2 mol Zn cần 1 mol O2 (22.4 L) -> 65.38 g Zn cần 11.2 L O2
  // V_O2 (L) = (m_metal / 65.38) * 11.2
  let molarMass = 65.38;
  let o2Ratio = 11.2;
  if (chemistryId === 'LITHIUM_AIR_APROTIC') {
    molarMass = 6.94; // 2 mol Li (13.88g) cần 22.4 L O2
    o2Ratio = 16.1;
  } else if (chemistryId === 'ALUMINUM_AIR_PRIMARY') {
    molarMass = 26.98; // 4 mol Al (107.92g) cần 3 mol O2 (67.2 L)
    o2Ratio = 16.8;
  }

  const oxygenConsumedLiters = Math.round((metalAnodeMassGrams / molarMass) * o2Ratio * 10) / 10;

  // Thời gian phóng điện liên tục: t = (E / (V * I)) (hours)
  const powerWatts = battery.practicalWorkingVoltageV * (dischargeCurrentMa / 1000.0);
  const operatingDurationHours = Math.round((deliveredEnergyWattHours / powerWatts) * 10) / 10;

  const co2ScrubberRequired = chemistryId === 'ZINC_AIR_AQUEOUS' || chemistryId === 'LITHIUM_AIR_APROTIC';

  let zincDendriteSuppressionStatusVi = 'ĐƯỢC KIỂM SOÁT TỐT (Điện giải gel nanocomposite ức chế dendrite)';
  let safetyScoreOutOf10 = 9.5; // Kẽm nước không cháy nổ
  let verdictVi = 'AN TOÀN TUYỆT ĐỐI CHỐNG CHÁY NỔ (Điện giải gốc nước, thích hợp y tế & dân dụng)';

  if (chemistryId === 'LITHIUM_AIR_APROTIC') {
    zincDendriteSuppressionStatusVi = 'NGUY CƠ LITHI KIM LOẠI PHẢN ỨNG MẠNH VỚI ĐỘ ẨM';
    safetyScoreOutOf10 = 7.0;
    verdictVi = 'MẬT ĐỘ NĂNG LƯỢNG KỶ LỤC (> 950 Wh/kg), CẦN MÀNG CHỌN LỌC OXY TỰ NHIÊN';
  } else if (chemistryId === 'ALUMINUM_AIR_PRIMARY') {
    zincDendriteSuppressionStatusVi = 'KHÔNG CÓ DOCK SẠC ĐIỆN — THAY THẾ TẤM NHÔM TRONG 3 PHÚT';
    safetyScoreOutOf10 = 9.0;
    verdictVi = 'CÔNG SUẤT DỰ PHÒNG SIÊU DÀI HẠN (1300 Wh/kg, lưu trữ 20 năm không tự phóng điện)';
  }

  return {
    battery,
    metalAnodeMassGrams,
    oxygenConsumedLiters,
    deliveredEnergyWattHours,
    operatingDurationHours,
    co2ScrubberRequired,
    zincDendriteSuppressionStatusVi,
    safetyScoreOutOf10,
    verdictVi
  };
}
