// src/domain/lithiumSulfurBatteryEngine.ts
// Domain Engine: Lithium-Sulfur (Li-S) Batteries, Polysulfide Shuttle Effect & 2D MXene Separators
// Standards: IUPAC Electrochemistry, High-Energy Density Targets (> 500 Wh/kg) & Vietnam GDPT 2018 (Hóa 10 & 12: Đơn chất Lưu huỳnh S8 & Pin năng lượng cao)

export type PolysulfideMitigationStrategy = 'CONVENTIONAL_CELGARD' | 'MXENE_TI3C2_INTERLAYER' | 'POLAR_MOF_SEPARATOR' | 'ALL_SOLID_STATE_LIS';

export interface LiSBarrierStrategySpec {
  id: PolysulfideMitigationStrategy;
  nameVi: string;
  interlayerMaterialVi: string;
  chemisorptionMechanismVi: string;
  polysulfideShuttleCurrentReductionPercent: number; // Tỷ lệ ngăn chặn dòng con thoi (%)
  capacityRetentionAt500CyclesPercent: number; // Độ giữ dung lượng sau 500 chu kỳ (%)
  coulombicEfficiencyPercent: number; // Hiệu suất Coulombic CE (%)
  sulfurArealLoadingMgCm2: number; // Tải lượng lưu huỳnh (mg/cm²)
  cellEnergyDensityWhKg: number; // Mật độ năng lượng thực tế (Wh/kg)
  advantagesVi: string;
}

export interface PolysulfideReactionStep {
  stepIndex: number;
  reactionVi: string;
  voltagePlateauV: number;
  speciesNameVi: string;
  phaseStateVi: 'SOLID_INSULATING' | 'LIQUID_SOLUBLE_SHUTTLE' | 'SOLID_PRECIPITATE';
  shuttleRiskVi: 'NONE' | 'HIGH_DISSOLUTION' | 'INSULATING_PASSIVATION';
  specificCapacityDeliveredMahG: number;
}

export interface LiSDischargeProfilePoint {
  depthOfDischargePercent: number;
  cellVoltageV: number;
  deliveredCapacityMahG: number;
  dominantPolysulfideSpeciesVi: string;
  reactionPhaseVi: 'SOLID_TO_LIQUID' | 'LIQUID_TO_SOLID_PRECIPITATION';
}

export interface LiSCellSimulationResult {
  strategy: LiSBarrierStrategySpec;
  sulfurMassGrams: number;
  nominalCellCapacityAh: number;
  cellEnergyDensityWhKg: number;
  volumetricEnergyDensityWhL: number;
  cycleFadeRatePerCyclePercent: number; // Tốc độ chai pin (%/chu kỳ)
  predictedCyclesTo80Percent: number; // Số chu kỳ đạt 80% dung lượng
  anodeCorrosionSeverityVi: string;
  verdictVi: string;
}

// 1. Các Giai Đoạn Điện Hóa Đa Bước Của Cực Dương Lưu Huỳnh (S8)
export const LIS_MULTISTEP_PATHWAY: PolysulfideReactionStep[] = [
  {
    stepIndex: 1,
    reactionVi: 'S₈ + 2Li⁺ + 2e⁻ → Li₂S₈',
    voltagePlateauV: 2.38,
    speciesNameVi: 'Lithium Octasulfide (Li₂S₈)',
    phaseStateVi: 'LIQUID_SOLUBLE_SHUTTLE',
    shuttleRiskVi: 'HIGH_DISSOLUTION',
    specificCapacityDeliveredMahG: 209.0
  },
  {
    stepIndex: 2,
    reactionVi: '3Li₂S₈ + 2Li⁺ + 2e⁻ → 4Li₂S₆',
    voltagePlateauV: 2.30,
    speciesNameVi: 'Lithium Hexasulfide (Li₂S₆)',
    phaseStateVi: 'LIQUID_SOLUBLE_SHUTTLE',
    shuttleRiskVi: 'HIGH_DISSOLUTION',
    specificCapacityDeliveredMahG: 418.0
  },
  {
    stepIndex: 3,
    reactionVi: '2Li₂S₆ + 2Li⁺ + 2e⁻ → 3Li₂S₄',
    voltagePlateauV: 2.15,
    speciesNameVi: 'Lithium Tetrasulfide (Li₂S₄)',
    phaseStateVi: 'LIQUID_SOLUBLE_SHUTTLE',
    shuttleRiskVi: 'HIGH_DISSOLUTION',
    specificCapacityDeliveredMahG: 837.5
  },
  {
    stepIndex: 4,
    reactionVi: 'Li₂S₄ + 2Li⁺ + 2e⁻ → 2Li₂S₂ (kết tủa)',
    voltagePlateauV: 2.05,
    speciesNameVi: 'Lithium Disulfide (Li₂S₂ rắn cách điện)',
    phaseStateVi: 'SOLID_PRECIPITATE',
    shuttleRiskVi: 'INSULATING_PASSIVATION',
    specificCapacityDeliveredMahG: 1256.0
  },
  {
    stepIndex: 5,
    reactionVi: 'Li₂S₂ + 2Li⁺ + 2e⁻ → 2Li₂S (kết tủa cuối)',
    voltagePlateauV: 1.95,
    speciesNameVi: 'Lithium Sulfide (Li₂S nở thể tích 80%)',
    phaseStateVi: 'SOLID_PRECIPITATE',
    shuttleRiskVi: 'INSULATING_PASSIVATION',
    specificCapacityDeliveredMahG: 1675.0 // Cực đại lý thuyết
  }
];

// 2. Danh mục Chiến Lược Ngăn Chặn Hiệu Ứng Con Thoi Polysunfua (LiPS Barrier)
export const LIS_BARRIER_STRATEGIES_CATALOG: LiSBarrierStrategySpec[] = [
  {
    id: 'CONVENTIONAL_CELGARD',
    nameVi: 'Màng Ngăn Celgard PP/PE Tiêu Chuẩn (Không Có Lớp Chắn)',
    interlayerMaterialVi: 'Màng xốp polymer polypropylene Celgard 2400 thông thường',
    chemisorptionMechanismVi: 'Chỉ có lọc cơ học yếu, hoàn toàn không có tương tác hóa hấp phụ với ion polysunfua',
    polysulfideShuttleCurrentReductionPercent: 12.0,
    capacityRetentionAt500CyclesPercent: 38.0, // Chai pin nhanh sau 100-200 chu kỳ
    coulombicEfficiencyPercent: 82.0,
    sulfurArealLoadingMgCm2: 2.0,
    cellEnergyDensityWhKg: 320.0,
    advantagesVi: 'Chi phí cực rẻ, dễ sản xuất nhưng tuổi thọ rất ngắn do hiệu ứng con thoi làm ăn mòn cực âm Lithi kim loại nghiêm trọng.'
  },
  {
    id: 'MXENE_TI3C2_INTERLAYER',
    nameVi: 'Lớp Chắn Nano 2D MXene Ti₃C₂Tₓ Dẫn Điện & Bẫy Hóa Học',
    interlayerMaterialVi: 'Màng nano 2D MXene Ti₃C₂Tₓ phủ trên màng ngăn kết hợp nỉ carbon',
    chemisorptionMechanismVi: 'Liên kết hóa hấp phụ cực mạnh Ti-S và nhóm chức phân cực (-O, -OH, -F) bẫy chặt anion polysunfua Li₂Sₓ, đồng thời độ dẫn điện kim loại (> 5,000 S/cm) tái kích hoạt lưu huỳnh bị kẹt',
    polysulfideShuttleCurrentReductionPercent: 94.5,
    capacityRetentionAt500CyclesPercent: 86.5,
    coulombicEfficiencyPercent: 99.2,
    sulfurArealLoadingMgCm2: 6.5,
    cellEnergyDensityWhKg: 520.0, // Vượt ngưỡng 500 Wh/kg
    advantagesVi: 'Hiệu quả kép vượt trội: Vừa ngăn chặn 95% hiệu ứng con thoi bằng lực liên kết hóa học, vừa là bộ thu lôi điện tử dẫn truyền electron giúp tái chuyển hóa Li₂S thành S₈.'
  },
  {
    id: 'POLAR_MOF_SEPARATOR',
    nameVi: 'Màng Rây Phân Tử Khung Hữu Cơ - Kim Loại (MOF Interlayer - ZIF-8 / HKUST-1)',
    interlayerMaterialVi: 'Lớp màng MOF kích thước lỗ xốp nano siêu đều (sub-nanometer windows ~ 0.4 nm)',
    chemisorptionMechanismVi: 'Sàng lọc kích thước vật lý (LiPS > 0.8 nm không lọt qua được cửa sổ 0.4 nm) kết hợp tâm axit Lewis Zn²⁺/Cu²⁺ giữ chặt anion sunfua',
    polysulfideShuttleCurrentReductionPercent: 91.0,
    capacityRetentionAt500CyclesPercent: 82.0,
    coulombicEfficiencyPercent: 98.5,
    sulfurArealLoadingMgCm2: 5.0,
    cellEnergyDensityWhKg: 460.0,
    advantagesVi: 'Kích thước lỗ xốp nano hoàn hảo chỉ cho ion Li⁺ đi qua và chặn đứng các chuỗi polysunfua dài, duy trì dòng ion đồng đều chống gai dendrite.'
  },
  {
    id: 'ALL_SOLID_STATE_LIS',
    nameVi: 'Pin Lưu Huỳnh Toàn Rắn (All-Solid-State Li-S với Chất Điện Giải Sunfua Li₆PS₅Cl)',
    interlayerMaterialVi: 'Chất điện giải rắn siêu dẫn ion Argyrodite Li₆PS₅Cl hoặc LGPS',
    chemisorptionMechanismVi: 'Loại bỏ hoàn toàn dung môi hữu cơ lỏng ether, polysunfua không thể hòa tan (zero dissolution), triệt tiêu 100% hiệu ứng con thoi',
    polysulfideShuttleCurrentReductionPercent: 99.8,
    capacityRetentionAt500CyclesPercent: 92.0,
    coulombicEfficiencyPercent: 99.9,
    sulfurArealLoadingMgCm2: 8.0,
    cellEnergyDensityWhKg: 560.0,
    advantagesVi: 'Chấm dứt hoàn toàn hiện tượng hòa tan con thoi, an toàn chống cháy nổ tuyệt đối, mật độ năng lượng đạt đỉnh 560 Wh/kg.'
  }
];

// Helper: Lấy danh mục chiến lược ngăn polysulfide
export function getLiSBarrierStrategies(): LiSBarrierStrategySpec[] {
  return LIS_BARRIER_STRATEGIES_CATALOG;
}

// 3. Tạo Đường Cong Phóng Điện 2 Vùng Thềm Điện Thế Của Pin Li-S
export function generateLiSDischargeCurve(): LiSDischargeProfilePoint[] {
  const points: LiSDischargeProfilePoint[] = [];
  const steps = 30;

  for (let i = 0; i <= steps; i++) {
    const dodPercent = (i / steps) * 100.0; // 0% -> 100%
    const deliveredCap = (dodPercent / 100.0) * 1675.0; // mAh/g

    let cellVoltage = 0.0;
    let dominantSpecies = 'S₈';
    let phaseReaction: 'SOLID_TO_LIQUID' | 'LIQUID_TO_SOLID_PRECIPITATION' = 'SOLID_TO_LIQUID';

    if (dodPercent <= 25.0) {
      // Vùng thềm cao (High-voltage plateau: 2.40 V - 2.15 V): Pha Rắn -> Dung dịch lỏng
      // S8 -> Li2S8 -> Li2S6 -> Li2S4
      const p = dodPercent / 25.0;
      cellVoltage = 2.40 - p * 0.25;
      dominantSpecies = dodPercent < 12.0 ? 'Li₂S₈' : 'Li₂S₆';
      phaseReaction = 'SOLID_TO_LIQUID';
    } else {
      // Vùng thềm thấp (Low-voltage plateau: 2.15 V - 1.90 V): Dung dịch lỏng -> Kết tủa rắn
      // Li2S4 -> Li2S2 -> Li2S
      const p = (dodPercent - 25.0) / 75.0;
      cellVoltage = 2.15 - p * 0.20 - Math.pow(p, 4) * 0.15;
      dominantSpecies = dodPercent < 60.0 ? 'Li₂S₄' : dodPercent < 85.0 ? 'Li₂S₂ (rắn)' : 'Li₂S (rắn)';
      phaseReaction = 'LIQUID_TO_SOLID_PRECIPITATION';
    }

    points.push({
      depthOfDischargePercent: Math.round(dodPercent),
      cellVoltageV: Math.max(1.7, Math.round(cellVoltage * 1000) / 1000),
      deliveredCapacityMahG: Math.round(deliveredCap * 10) / 10,
      dominantPolysulfideSpeciesVi: dominantSpecies,
      reactionPhaseVi: phaseReaction
    });
  }

  return points;
}

// 4. Mô Phỏng Pin Li-S Theo Lớp Chắn Màng Ngăn
export function simulateLiSCellPerformance(
  strategyId: PolysulfideMitigationStrategy = 'MXENE_TI3C2_INTERLAYER',
  sulfurMassGrams: number = 2.5 // Khối lượng lưu huỳnh (g)
): LiSCellSimulationResult {
  const strategy = LIS_BARRIER_STRATEGIES_CATALOG.find(s => s.id === strategyId) || LIS_BARRIER_STRATEGIES_CATALOG[1];

  // Dung lượng cell thực tế: C = m_S * q_th * (CE_factor)
  // Lưu huỳnh lý thuyết: 1675 mAh/g = 1.675 Ah/g
  const practicalUtilization = (strategy.coulombicEfficiencyPercent / 100.0) * 0.82;
  const nominalCellCapacityAh = Math.round(sulfurMassGrams * 1.675 * practicalUtilization * 100) / 100;

  const cellEnergyDensityWhKg = strategy.cellEnergyDensityWhKg;
  const volumetricEnergyDensityWhL = Math.round(cellEnergyDensityWhKg * 1.35);

  // Tốc độ suy giảm dung lượng theo chu kỳ dựa trên mức độ ngăn chặn con thoi
  const shuttleLeakFactor = (100.0 - strategy.polysulfideShuttleCurrentReductionPercent) / 100.0;
  const cycleFadeRatePerCyclePercent = Math.round((0.025 + shuttleLeakFactor * 0.45) * 1000) / 1000;

  // Số chu kỳ đạt ngưỡng 80% dung lượng: (1 - 0.80) / fadeRate
  const predictedCyclesTo80Percent = Math.round(20.0 / cycleFadeRatePerCyclePercent);

  let anodeCorrosionSeverityVi = 'ĂN MÒN CỰC KỲ NGHIÊM TRỌNG (Gai Dendrite + Lớp váng cách điện Li₂S dày)';
  let verdictVi = 'KHÔNG THỂ THƯƠNG MẠI HÓA (Pin hỏng hoàn toàn sau < 150 chu kỳ)';

  if (strategy.id === 'MXENE_TI3C2_INTERLAYER' || strategy.id === 'POLAR_MOF_SEPARATOR') {
    anodeCorrosionSeverityVi = 'ĂN MÒN RẤT THẤP (Bề mặt Lithi kim loại phẳng mịn, không gai dendrite)';
    verdictVi = 'ĐẠT CHUẨN THƯƠNG MẠI HÀNG KHÔNG & XE ĐIỆN (Mật độ năng lượng > 500 Wh/kg)';
  } else if (strategy.id === 'ALL_SOLID_STATE_LIS') {
    anodeCorrosionSeverityVi = 'TRIỆT TIÊU ĂN MÒN CON THOI 100% (Không có dung môi lỏng hòa tan)';
    verdictVi = 'CÔNG NGHỆ TƯƠNG LAI HOÀN HẢO (560 Wh/kg, an toàn tuyệt đối chống cháy nổ)';
  }

  return {
    strategy,
    sulfurMassGrams,
    nominalCellCapacityAh,
    cellEnergyDensityWhKg,
    volumetricEnergyDensityWhL,
    cycleFadeRatePerCyclePercent,
    predictedCyclesTo80Percent,
    anodeCorrosionSeverityVi,
    verdictVi
  };
}
