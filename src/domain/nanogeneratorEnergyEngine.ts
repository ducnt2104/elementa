// src/domain/nanogeneratorEnergyEngine.ts
// Domain Engine: Piezoelectric & Triboelectric Nanogenerators (PENG & TENG)
// Standards: IUPAC Advanced Materials, Maxwell's Displacement Current (Wang 2006, 2012) & Vietnam GDPT 2018 (Vật lý & Hóa học Năng lượng Tự cấp nguồn)

export type GeneratorTechnology = 'PIEZOELECTRIC_PENG' | 'TRIBOELECTRIC_TENG' | 'HYBRID_PENG_TENG';
export type TengWorkingMode = 'VERTICAL_CONTACT_SEPARATION' | 'LATERAL_SLIDING' | 'SINGLE_ELECTRODE' | 'FREE_STANDING';

export interface PiezoelectricMaterial {
  id: string;
  nameVi: string;
  chemicalFormula: string;
  d33PiezoelectricCoefficientPcN: number; // Hệ số áp điện d33 (pC/N)
  relativePermittivityEpsilonR: number; // Hằng số điện môi tương đối ε_r
  g33VoltageCoefficientVmN: number; // Hệ số điện thế g33 = d33 / (ε0 * εr) (10⁻³ V·m/N)
  mechanicalCouplingFactorK33: number; // Hệ số ghép cơ điện k33 (0-1)
  curieTemperatureCelsius: number; // Nhiệt độ Curie T_c (°C)
  leadFreeEcoCompliant: boolean; // Tuân thủ RoHS không chứa Chì độc hại
  crystalPhaseVi: string;
  advantagesVi: string;
  limitationsVi: string;
}

export interface TriboelectricMaterialPair {
  id: string;
  nameVi: string;
  positiveTriboLayer: string; // Lớp tích điện dương (dễ mất electron)
  negativeTriboLayer: string; // Lớp tích điện âm (dễ hút electron)
  surfaceChargeDensityMicroCm2: number; // Mật độ điện tích bề mặt σ (μC/m²)
  typicalOpenCircuitVoltageV: number; // Điện thế hở mạch V_oc (V)
  typicalShortCircuitCurrentUa: number; // Dòng ngắn mạch I_sc (μA)
  preferredWorkingMode: TengWorkingMode;
  modeNameVi: string;
  durabilityCycles: number;
  applicationDomainVi: string;
}

export interface PengOutputCalculation {
  material: PiezoelectricMaterial;
  appliedForceN: number;
  vibrationFrequencyHz: number;
  filmThicknessMicrons: number;
  electrodeAreaCm2: number;
  peakOpenCircuitVoltageV: number;
  peakShortCircuitCurrentMicroA: number;
  instantaneousPowerMilliW: number;
  energyPerCycleMicroJ: number;
}

export interface TengOutputCalculation {
  pair: TriboelectricMaterialPair;
  vibrationFrequencyHz: number;
  contactGapMm: number;
  loadResistanceMegaOhms: number;
  matchedPeakPowerMilliW: number;
  transferredChargeNanocoulombs: number;
  optimalLoadResistanceMegaOhms: number;
  isImpedanceMatched: boolean;
}

export interface PmuStorageSimulation {
  sourceType: GeneratorTechnology;
  generatorNameVi: string;
  rectifierEfficiencyPercent: number; // Hiệu suất cầu chỉnh lưu Schottky
  storageCapacitanceMicroF: number; // Tụ lưu trữ C (μF)
  chargingTimeSeconds: number;
  accumulatedVoltageV: number; // Điện áp tích lũy V_cap
  storedEnergyMilliJoules: number; // E = (1/2) * C * V²
  canPowerIotSensorNode: boolean; // Đủ năng lượng phát tín hiệu BLE 3.3V (cần >= 1.5 mJ)
  sensorDischargeDurationMs: number;
}

// 1. Danh mục Vật liệu Áp điện PENG
export const PIEZOELECTRIC_MATERIALS_CATALOG: PiezoelectricMaterial[] = [
  {
    id: 'PVDF_BETA_POLYMER',
    nameVi: 'Polyme Polyvinylidene Fluoride Pha-β (PVDF-β)',
    chemicalFormula: '-(C₂H₂F₂)ₙ- (Pha β ziczac)',
    d33PiezoelectricCoefficientPcN: -32.5,
    relativePermittivityEpsilonR: 11.5,
    g33VoltageCoefficientVmN: 319.0,
    mechanicalCouplingFactorK33: 0.20,
    curieTemperatureCelsius: 165,
    leadFreeEcoCompliant: true,
    crystalPhaseVi: 'Pha β trực thoi phân cực (All-trans TTTT conformation)',
    advantagesVi: 'Mềm dẻo tuyệt đối, đàn hồi chịu va đập lớn, hệ số điện thế g33 cực cao (319 mV·m/N), an toàn sinh học dệt vải may mặc.',
    limitationsVi: 'Hệ số áp điện d33 trung bình, đòi hỏi kéo dãn định hướng kết hợp điện trường cao (poling > 100 MV/m) để chuyển đổi pha α sang pha β.'
  },
  {
    id: 'ZNO_NANOWIRES',
    nameVi: 'Dây Nano Kẽm Oxit (ZnO Nanowire Arrays)',
    chemicalFormula: 'ZnO (Cấu trúc Wurtzite)',
    d33PiezoelectricCoefficientPcN: 12.4,
    relativePermittivityEpsilonR: 8.5,
    g33VoltageCoefficientVmN: 165.0,
    mechanicalCouplingFactorK33: 0.18,
    curieTemperatureCelsius: 450,
    leadFreeEcoCompliant: true,
    crystalPhaseVi: 'Lục giác Wurtzite không tâm đối xứng (Non-centrosymmetric P6₃mc)',
    advantagesVi: 'Vật liệu bán dẫn áp điện nano (Piezotronics), sinh học tương thích tuyệt đối, mọc thẳng đứng trên nhiều loại đế (thủy tinh, polyme, kim loại).',
    limitationsVi: 'Mật độ hạt tải tự do cao làm sàng lọc (screen) điện trường áp điện nếu không có lớp chặn Schottky hoặc pha tạp.'
  },
  {
    id: 'KNN_LEAD_FREE_CERAMIC',
    nameVi: 'Gốm Áp Điện Không Chì KNN ((K,Na)NbO₃)',
    chemicalFormula: '(K₀.₅Na₀.₅)NbO₃',
    d33PiezoelectricCoefficientPcN: 310.0,
    relativePermittivityEpsilonR: 1250.0,
    g33VoltageCoefficientVmN: 28.0,
    mechanicalCouplingFactorK33: 0.52,
    curieTemperatureCelsius: 410,
    leadFreeEcoCompliant: true,
    crystalPhaseVi: 'Perovskite trực thoi - tứ giác (Morphotropic Phase Boundary - MPB)',
    advantagesVi: 'Hệ số d33 rất cao (> 300 pC/N) hoàn toàn không chứa Chì độc hại, tuân thủ nghiêm ngặt chuẩn bảo vệ môi trường EU RoHS.',
    limitationsVi: 'Quy trình thiêu kết gốm phức tạp do Kali và Natri dễ bay hơi ở nhiệt độ cao (> 1100°C).'
  },
  {
    id: 'PZT_PIEZOCERAMIC',
    nameVi: 'Gốm Chì Titanat Zirconat PZT (Công Nghiệp)',
    chemicalFormula: 'Pb[ZrₓTi₁₋ₓ]O₃',
    d33PiezoelectricCoefficientPcN: 580.0,
    relativePermittivityEpsilonR: 1800.0,
    g33VoltageCoefficientVmN: 36.4,
    mechanicalCouplingFactorK33: 0.72,
    curieTemperatureCelsius: 350,
    leadFreeEcoCompliant: false,
    crystalPhaseVi: 'Perovskite ranh giới pha dị hình (MPB)',
    advantagesVi: 'Hệ số áp điện d33 và hệ số ghép cơ điện k33 kỷ lục ngành công nghiệp, đáp ứng công suất xung cực mạnh.',
    limitationsVi: 'Chứa hơn 60% khối lượng là Chì (Pb) cực độc gây ô nhiễm môi trường, gãy giòn cơ học không uốn cong được.'
  }
];

// 2. Danh mục Cặp Vật Liệu Ma Sát Điện TENG
export const TRIBOELECTRIC_PAIRS_CATALOG: TriboelectricMaterialPair[] = [
  {
    id: 'PTFE_ALUMINUM_CONTACT',
    nameVi: 'Màng Teflon PTFE / Nhôm (Tiếp xúc - Tách vuông góc)',
    positiveTriboLayer: 'Nhôm (Al Foil) - Điện cực dẫn & Cho electron',
    negativeTriboLayer: 'Polytetrafluoroethylene (PTFE Teflon) - Hút electron cực mạnh',
    surfaceChargeDensityMicroCm2: 145.0,
    typicalOpenCircuitVoltageV: 480.0,
    typicalShortCircuitCurrentUa: 42.0,
    preferredWorkingMode: 'VERTICAL_CONTACT_SEPARATION',
    modeNameVi: 'Chế độ Tiếp Xúc - Tách Rời Vuông Góc (Contact-Separation)',
    durabilityCycles: 500000,
    applicationDomainVi: 'Nút nhấn cơ học tự cấp nguồn, bàn phím thông minh, cảm biến giám sát bước chân.'
  },
  {
    id: 'FEP_COPPER_SLIDING',
    nameVi: 'Màng FEP / Đồng (Trượt Ma Sát Biên Độ Ngang)',
    positiveTriboLayer: 'Đồng (Cu Interdigital Electrode)',
    negativeTriboLayer: 'Fluorinated Ethylene Propylene (FEP Micro-patterned)',
    surfaceChargeDensityMicroCm2: 110.0,
    typicalOpenCircuitVoltageV: 320.0,
    typicalShortCircuitCurrentUa: 65.0,
    preferredWorkingMode: 'LATERAL_SLIDING',
    modeNameVi: 'Chế độ Trượt Ma Sát Ngang (Lateral Sliding Mode)',
    durabilityCycles: 250000,
    applicationDomainVi: 'Thu hồi năng lượng quay của trục động cơ, cảm biến vận tốc góc bánh xe, công tắc trượt.'
  },
  {
    id: 'PDMS_SKIN_SINGLE_ELECTRODE',
    nameVi: 'Silicon PDMS / Da Người (Đơn Điện Cực Sinh Học)',
    positiveTriboLayer: 'Biểu bì Da Người (Human Skin)',
    negativeTriboLayer: 'Polydimethylsiloxane vi cấu trúc kim tự tháp (Pyramid PDMS)',
    surfaceChargeDensityMicroCm2: 85.0,
    typicalOpenCircuitVoltageV: 260.0,
    typicalShortCircuitCurrentUa: 18.0,
    preferredWorkingMode: 'SINGLE_ELECTRODE',
    modeNameVi: 'Chế độ Đơn Điện Cực Đeo Bám Cơ Thể (Single-Electrode Mode)',
    durabilityCycles: 1000000,
    applicationDomainVi: 'Vòng đeo tay theo dõi sức khỏe, da nhân tạo thông minh (E-skin), màn hình cảm ứng tự thân.'
  },
  {
    id: 'OCEAN_BLUE_ENERGY_SPHERE',
    nameVi: 'Quả Cầu Tự Do Thu Năng Lượng Sóng Biển (Freestanding Ball)',
    positiveTriboLayer: 'Màng Polyamide (Nylon 6,6)',
    negativeTriboLayer: 'Hạt Silicon lồng trong vỏ FEP',
    surfaceChargeDensityMicroCm2: 125.0,
    typicalOpenCircuitVoltageV: 650.0,
    typicalShortCircuitCurrentUa: 55.0,
    preferredWorkingMode: 'FREE_STANDING',
    modeNameVi: 'Chế độ Lớp Ma Sát Tự Do Không Dây Dẫn (Freestanding Triboelectric Layer)',
    durabilityCycles: 2000000,
    applicationDomainVi: 'Mạng lưới phao nổi thu năng lượng sóng biển Blue Energy, cảm biến môi trường đại dương sâu.'
  }
];

// Helper: Lấy danh mục vật liệu áp điện
export function getPiezoelectricMaterials(): PiezoelectricMaterial[] {
  return PIEZOELECTRIC_MATERIALS_CATALOG;
}

// Helper: Lấy danh mục cặp ma sát điện
export function getTriboelectricPairs(): TriboelectricMaterialPair[] {
  return TRIBOELECTRIC_PAIRS_CATALOG;
}

// 3. Tính toán hiệu năng Máy Phát Điện Nano Áp Điện (PENG)
export function calculatePengOutput(
  materialId: string,
  appliedForceN: number = 20.0,
  vibrationFrequencyHz: number = 5.0,
  filmThicknessMicrons: number = 50.0,
  electrodeAreaCm2: number = 10.0,
  isCantileverBending: boolean = true
): PengOutputCalculation {
  const material = PIEZOELECTRIC_MATERIALS_CATALOG.find(m => m.id === materialId) || PIEZOELECTRIC_MATERIALS_CATALOG[0];

  const areaM2 = electrodeAreaCm2 * 1e-4;
  const thicknessM = filmThicknessMicrons * 1e-6;
  const directStressPa = appliedForceN / areaM2;

  // Trong chế độ uốn dẻo đòn bẩy (Cantilever Bending Mode), ứng suất kéo bề mặt được khuếch đại cơ học
  const stressAmplification = isCantileverBending ? 35.0 : 1.0;
  const effectiveStressPa = directStressPa * stressAmplification;

  // Hằng số điện môi chân không ε_0 = 8.854e-12 F/m
  const epsilon0 = 8.8541878128e-12;
  const epsilon = epsilon0 * material.relativePermittivityEpsilonR;

  // Điện dung nội tại của màng áp điện: C_p = (ε * A) / d
  const internalCapacitanceF = (epsilon * areaM2) / thicknessM;

  // Điện áp hở mạch đỉnh: V_oc = g33 * stress * thickness
  // với g33 tính bằng (10⁻³ V·m/N)
  const g33Standard = material.g33VoltageCoefficientVmN * 1e-3;
  const peakOpenCircuitVoltageV = Math.abs(g33Standard * effectiveStressPa * thicknessM);

  // Dòng ngắn mạch đỉnh I_sc = d33 * (dF_effective/dt) ≈ d33 * (F * ampl) * (2 * pi * f)
  const d33Standard = Math.abs(material.d33PiezoelectricCoefficientPcN) * 1e-12;
  const peakShortCircuitCurrentA = d33Standard * (appliedForceN * stressAmplification) * (2 * Math.PI * vibrationFrequencyHz);
  const peakShortCircuitCurrentMicroA = peakShortCircuitCurrentA * 1e6;

  // Năng lượng mỗi chu kỳ: E = (1/2) * C_p * V_oc²
  const energyPerCycleJ = 0.5 * internalCapacitanceF * Math.pow(peakOpenCircuitVoltageV, 2);
  const energyPerCycleMicroJ = energyPerCycleJ * 1e6;

  // Công suất tức thời trung bình: P = E * f (W) -> chuyển thành mW
  const instantaneousPowerMilliW = energyPerCycleJ * vibrationFrequencyHz * 1000.0;

  return {
    material,
    appliedForceN,
    vibrationFrequencyHz,
    filmThicknessMicrons,
    electrodeAreaCm2,
    peakOpenCircuitVoltageV: Math.round(peakOpenCircuitVoltageV * 100) / 100,
    peakShortCircuitCurrentMicroA: Math.round(peakShortCircuitCurrentMicroA * 100) / 100,
    instantaneousPowerMilliW: Math.round(instantaneousPowerMilliW * 1000) / 1000,
    energyPerCycleMicroJ: Math.round(energyPerCycleMicroJ * 100) / 100
  };
}

// 4. Tính toán hiệu năng Máy Phát Điện Nano Ma Sát Điện (TENG) & Khớp Trở Kháng
export function calculateTengOutput(
  pairId: string,
  vibrationFrequencyHz: number = 3.0,
  contactGapMm: number = 2.0,
  loadResistanceMegaOhms: number = 20.0
): TengOutputCalculation {
  const pair = TRIBOELECTRIC_PAIRS_CATALOG.find(p => p.id === pairId) || TRIBOELECTRIC_PAIRS_CATALOG[0];

  // Diện tích màng chuẩn: 25 cm² = 0.0025 m²
  const areaM2 = 0.0025;
  const totalChargeC = (pair.surfaceChargeDensityMicroCm2 * 1e-6) * areaM2;
  const transferredChargeNanocoulombs = Math.round(totalChargeC * 1e9 * 10) / 10;

  // Dòng chuyển dời Maxwell đỉnh: I_peak = omega * Q = 2 * pi * f * Q
  const omega = 2 * Math.PI * vibrationFrequencyHz;
  const peakCurrentA = omega * totalChargeC;

  // Điện dung TENG trung bình (C ~ 40 - 150 pF)
  const averageCapacitanceF = (100.0 / Math.max(0.5, contactGapMm)) * 1e-12;
  
  // Trở kháng tối ưu theo lý thuyết dòng dịch chuyển: R_opt = 1 / (omega * C)
  const optimalLoadOhms = 1.0 / (omega * averageCapacitanceF);
  const optimalLoadResistanceMegaOhms = Math.round((optimalLoadOhms / 1e6) * 10) / 10;

  // Công suất tức thời theo định luật Ohm trên tải R:
  // I_R = I_peak / sqrt(1 + (omega * R * C)²)
  // P(R) = I_R² * R = (I_peak² * R) / (1 + (omega * R * C)²)
  const rLoadOhms = loadResistanceMegaOhms * 1e6;
  const denominator = 1.0 + Math.pow(omega * rLoadOhms * averageCapacitanceF, 2);
  const powerWatts = (Math.pow(peakCurrentA, 2) * rLoadOhms) / denominator;
  const matchedPeakPowerMilliW = Math.round(powerWatts * 1000.0 * 100) / 100;

  // Kiểm tra mức độ khớp trở kháng (|R_load - R_opt| / R_opt < 50%)
  const isImpedanceMatched = Math.abs(loadResistanceMegaOhms - optimalLoadResistanceMegaOhms) / optimalLoadResistanceMegaOhms < 0.5;

  return {
    pair,
    vibrationFrequencyHz,
    contactGapMm,
    loadResistanceMegaOhms,
    matchedPeakPowerMilliW,
    transferredChargeNanocoulombs,
    optimalLoadResistanceMegaOhms,
    isImpedanceMatched
  };
}

// 5. Mô phỏng Mạch Quản Lý Năng Lượng (Power Management Unit - PMU) nạp tụ điện
export function simulatePmuStorageCharging(
  sourceType: GeneratorTechnology,
  sourceId: string,
  durationSeconds: number = 30.0,
  storageCapacitanceMicroF: number = 100.0
): PmuStorageSimulation {
  let generatorNameVi = 'PENG PVDF-β';
  let avgChargingCurrentUa = 15.0;

  if (sourceType === 'PIEZOELECTRIC_PENG') {
    const mat = PIEZOELECTRIC_MATERIALS_CATALOG.find(m => m.id === sourceId) || PIEZOELECTRIC_MATERIALS_CATALOG[0];
    generatorNameVi = mat.nameVi;
    avgChargingCurrentUa = Math.abs(mat.d33PiezoelectricCoefficientPcN) * 0.65;
  } else if (sourceType === 'TRIBOELECTRIC_TENG') {
    const pair = TRIBOELECTRIC_PAIRS_CATALOG.find(p => p.id === sourceId) || TRIBOELECTRIC_PAIRS_CATALOG[0];
    generatorNameVi = pair.nameVi;
    avgChargingCurrentUa = pair.typicalShortCircuitCurrentUa * 0.55;
  } else {
    generatorNameVi = 'Lai ghép PENG-TENG Đồng Thời';
    avgChargingCurrentUa = 48.0;
  }

  // Cầu chỉnh lưu Schottky hiệu suất ~88%
  const rectifierEfficiency = 0.88;
  const effectiveCurrentA = (avgChargingCurrentUa * 1e-6) * rectifierEfficiency;

  // Nạp tụ điện: V(t) = (I * t) / C (giới hạn tối đa 5.0 V bởi diode Zener bảo vệ)
  const capFarads = storageCapacitanceMicroF * 1e-6;
  const theoreticalVoltage = (effectiveCurrentA * durationSeconds) / capFarads;
  const accumulatedVoltageV = Math.min(5.0, Math.round(theoreticalVoltage * 100) / 100);

  // Năng lượng tích trữ: E = (1/2) * C * V² (J) -> mJ
  const storedEnergyJoules = 0.5 * capFarads * Math.pow(accumulatedVoltageV, 2);
  const storedEnergyMilliJoules = Math.round(storedEnergyJoules * 1000.0 * 100) / 100;

  // Nút cảm biến IoT BLE truyền 1 bản tin beacon tiêu thụ ~1.2 mJ tại 3.3V
  const canPowerIotSensorNode = storedEnergyMilliJoules >= 1.2 && accumulatedVoltageV >= 3.0;
  const sensorDischargeDurationMs = canPowerIotSensorNode ? Math.round((storedEnergyMilliJoules / 0.045) * 10) / 10 : 0;

  return {
    sourceType,
    generatorNameVi,
    rectifierEfficiencyPercent: 88,
    storageCapacitanceMicroF,
    chargingTimeSeconds: durationSeconds,
    accumulatedVoltageV,
    storedEnergyMilliJoules,
    canPowerIotSensorNode,
    sensorDischargeDurationMs
  };
}
