// src/domain/solidStateBatteryEngine.ts
// Domain Engine: Solid-State Battery Electrolytes, Dendrite Prevention & Fast Ion Conduction
// Standards: IUPAC Electrochemistry, Monroe-Newman Criterion (1972) & Vietnam GDPT 2018 (Hóa học & Vật lý Năng lượng Mới)

export type SolidElectrolyteFamily = 'OXIDE_GARNET' | 'SULFIDE_ARGYRODITE' | 'NASICON_PHOSPHATE' | 'POLYMER_SPE' | 'HYBRID_COMPOSITE';

export interface SolidElectrolyteMaterial {
  id: string;
  nameVi: string;
  chemicalFormula: string;
  family: SolidElectrolyteFamily;
  familyNameVi: string;
  roomTempConductivitymScm: number; // Độ dẫn ion Li⁺ tại 25°C (mS/cm)
  activationEnergyEv: number; // Năng lượng hoạt hóa dẫn ion E_a (eV)
  shearModulusGpa: number; // Mô đun trượt cơ học G (GPa)
  electrochemicalStabilityWindowV: [number, number]; // [V_min, V_max] vs Li/Li⁺
  monroeNewmanDendriteBlocked: boolean; // G > 2 * G_Li (G_Li = 3.4 GPa => G > 6.8 GPa)
  airStabilityVi: string;
  moistureSensitivityVi: 'HOÀN TOÀN TRƠ' | 'NHẠY CẢM NHẸ' | 'CỰC KỲ NGUY HIỂM (SINH KHÍ H₂S)';
  advantagesVi: string;
  challengesVi: string;
}

export interface DendriteRiskAssessment {
  material: SolidElectrolyteMaterial;
  appliedCurrentDensityMaCm2: number;
  criticalCurrentDensityCcdMaCm2: number;
  sandTimeSeconds: number; // Thời gian Sand bắt đầu phân nhánh nhánh cây Li
  dendritePenetrated: boolean; // Nguy cơ đâm thủng chất điện ly rắn
  stackPressureMpa: number; // Áp suất ép cell (MPa)
  hasLithiophilicInterlayer: boolean; // Lớp đệm ái liti (ZnO, Au, Ag nano)
  safetyScore100: number;
  riskStatusVi: 'AN TOÀN TUYỆT ĐỐI' | 'CẢNH BÁO PHÂN CỰC' | 'NGUY CƠ ĐOẢN MẠCH NGẦM';
  mitigationRecommendationVi: string;
}

export interface SolidStateBatteryPerformance {
  electrolyte: SolidElectrolyteMaterial;
  cathodeType: 'NMC811' | 'LFP';
  temperatureCelsius: number;
  currentRateC: number; // Tốc độ nạp xả (0.1C - 5C)
  effectiveIonicConductivitymScm: number;
  cellOperatingVoltageV: number;
  gravimetricEnergyDensityWhKg: number; // Mật độ năng lượng trọng lượng (Wh/kg)
  volumetricEnergyDensityWhL: number; // Mật độ năng lượng thể tích (Wh/L)
  thermalRunawayPunctureSafe: boolean; // An toàn tuyệt đối khi đâm xuyên đinh nhọn / gia nhiệt 180°C
  estimatedCycleLife80Percent: number; // Số chu kỳ giữ > 80% dung lượng
}

// 1. Danh mục Chất Điện Ly Rắn Tiên Tiến
export const SOLID_ELECTROLYTES_CATALOG: SolidElectrolyteMaterial[] = [
  {
    id: 'LLZO_GARNET',
    nameVi: 'Oxit Garnet LLZO Pha Tạp Ta (Li₆.₅La₃Zr₁.₅Ta₀.₅O₁₂)',
    chemicalFormula: 'Li₆.₅La₃Zr₁.₅Ta₀.₅O₁₂',
    family: 'OXIDE_GARNET',
    familyNameVi: 'Oxit Cấu Trúc Garnet (Oxide Garnet)',
    roomTempConductivitymScm: 1.25,
    activationEnergyEv: 0.32,
    shearModulusGpa: 61.0,
    electrochemicalStabilityWindowV: [0.0, 6.0],
    monroeNewmanDendriteBlocked: true,
    airStabilityVi: 'Rất bền trong không khí khô, tạo lớp màng mỏng Li₂CO₃ thụ động trong khí quyển ẩm.',
    moistureSensitivityVi: 'NHẠY CẢM NHẸ',
    advantagesVi: 'Mô đun trượt siêu cứng (61 GPa) chặn đứng hoàn toàn nhánh cây Li, cửa sổ thế siêu rộng (0 - 6V) dùng được với cực dương thế cao 5V.',
    challengesVi: 'Điện trở tiếp xúc ranh giới hạt (grain boundary) cao, cần ép nhiệt hoặc phủ lớp đệm kim loại ái Li để hạ trở kháng.'
  },
  {
    id: 'LGPS_SULFIDE',
    nameVi: 'Sunfua Siêu Dẫn Ion LGPS (Li₁₀GeP₂S₁₂)',
    chemicalFormula: 'Li₁₀GeP₂S₁₂',
    family: 'SULFIDE_ARGYRODITE',
    familyNameVi: 'Sunfua Cấu Trúc Siêu Dẫn (Sulfide Superionic)',
    roomTempConductivitymScm: 12.8,
    activationEnergyEv: 0.22,
    shearModulusGpa: 18.5,
    electrochemicalStabilityWindowV: [1.7, 2.3],
    monroeNewmanDendriteBlocked: true,
    airStabilityVi: 'Phản ứng mãnh liệt với hơi ẩm giải phóng khí độc H₂S, bắt buộc sản xuất trong phòng sạch Argon.',
    moistureSensitivityVi: 'CỰC KỲ NGUY HIỂM (SINH KHÍ H₂S)',
    advantagesVi: 'Độ dẫn ion kỷ lục thế giới (12.8 mS/cm) vượt qua cả dung dịch điện ly hữu cơ lỏng, cơ tính mềm dễ ép nguội tạo tiếp xúc hoàn hảo.',
    challengesVi: 'Cửa sổ ổn định điện hóa rất hẹp, tự phân hủy tại điện thế thấp (< 1.7V) và điện thế cao (> 2.3V), cần màng phủ bảo vệ 2 đầu.'
  },
  {
    id: 'LATP_NASICON',
    nameVi: 'Photphat Cấu Trúc NASICON LATP (Li₁.₃Al₀.₃Ti₁.₇(PO₄)₃)',
    chemicalFormula: 'Li₁.₃Al₀.₃Ti₁.₇(PO₄)₃',
    family: 'NASICON_PHOSPHATE',
    familyNameVi: 'Photphat Cấu Trúc NASICON (Phosphate NASICON)',
    roomTempConductivitymScm: 0.72,
    activationEnergyEv: 0.38,
    shearModulusGpa: 45.0,
    electrochemicalStabilityWindowV: [2.5, 4.5],
    monroeNewmanDendriteBlocked: true,
    airStabilityVi: 'Rất bền trong nước và không khí ẩm, dễ bảo quản và gia công bột gốm.',
    moistureSensitivityVi: 'HOÀN TOÀN TRƠ',
    advantagesVi: 'Ổn định tuyệt đối trong môi trường nước và không khí, chi phí nguyên liệu rẻ, không thải khí độc.',
    challengesVi: 'Ti⁴⁺ bị liti kim loại khử thành Ti³⁺ dẫn điện tử gây đoản mạch nội tại nếu tiếp xúc trực tiếp cực âm Li.'
  },
  {
    id: 'PEO_LITFSI_POLYMER',
    nameVi: 'Polyme Rắn PEO Phối Trộn Muối LiTFSI (Solid Polymer)',
    chemicalFormula: '-(CH₂CH₂O)ₙ- / LiTFSI',
    family: 'POLYMER_SPE',
    familyNameVi: 'Chất Điện Ly Polyme Rắn (Solid Polymer SPE)',
    roomTempConductivitymScm: 0.008,
    activationEnergyEv: 0.65,
    shearModulusGpa: 0.015,
    electrochemicalStabilityWindowV: [0.0, 3.8],
    monroeNewmanDendriteBlocked: false,
    airStabilityVi: 'Rất bền và dễ uốn dẻo, gia công màng mỏng cuộn liên tục (roll-to-roll) tương tự công nghệ pin hiện nay.',
    moistureSensitivityVi: 'HOÀN TOÀN TRƠ',
    advantagesVi: 'Quy trình sản xuất công nghiệp rẻ tiền, độ mềm dẻo cao không lo nứt vỡ cơ học.',
    challengesVi: 'Độ dẫn ion tại nhiệt độ phòng cực thấp do chuỗi polyme kết tinh, bắt buộc pin phải hoạt động ở nhiệt độ cao > 60°C.'
  },
  {
    id: 'LLZO_PEO_COMPOSITE',
    nameVi: 'Màng Lai Ghép Gốm - Polyme (CPE Composite LLZO/PEO)',
    chemicalFormula: 'LLZO (40 wt%) + PEO-LiTFSI',
    family: 'HYBRID_COMPOSITE',
    familyNameVi: 'Màng Lai Ghép Gốm - Polyme (CPE Composite)',
    roomTempConductivitymScm: 0.38,
    activationEnergyEv: 0.36,
    shearModulusGpa: 5.8,
    electrochemicalStabilityWindowV: [0.0, 4.8],
    monroeNewmanDendriteBlocked: false,
    airStabilityVi: 'Bền vững trong không khí thường, linh hoạt uốn cong không gãy giòn.',
    moistureSensitivityVi: 'NHẠY CẢM NHẸ',
    advantagesVi: 'Kết hợp độ dẫn tốt và chống cháy của hạt gốm oxit với tính dẻo dễ gia công của nền polyme, cửa sổ thế 4.8V.',
    challengesVi: 'Điện thế hóa mềm cơ học ở nhiệt độ trên 80°C làm giảm khả năng cản nhánh cây dendrite.'
  }
];

// Helper: Lấy danh mục chất điện ly rắn
export function getSolidElectrolytes(): SolidElectrolyteMaterial[] {
  return SOLID_ELECTROLYTES_CATALOG;
}

// 2. Tính toán độ dẫn ion theo phương trình Arrhenius
// sigma(T) = (sigma_0 / T) * exp(-E_a / (k_B * T))
export function calculateArrheniusConductivity(
  materialId: string,
  temperatureCelsius: number = 25
): number {
  const mat = SOLID_ELECTROLYTES_CATALOG.find(m => m.id === materialId) || SOLID_ELECTROLYTES_CATALOG[0];
  const T_kelvin = temperatureCelsius + 273.15;
  const T_ref = 298.15; // 25°C
  const kB_ev = 8.617333262e-5; // hằng số Boltzmann theo eV/K

  // sigma(T) * T = sigma(T_ref) * T_ref * exp[ -E_a / kB * (1/T - 1/T_ref) ]
  const exponent = (-mat.activationEnergyEv / kB_ev) * ((1 / T_kelvin) - (1 / T_ref));
  const sigmaT = (mat.roomTempConductivitymScm * T_ref / T_kelvin) * Math.exp(exponent);

  return Math.max(0.0001, Math.round(sigmaT * 1000) / 1000);
}

// 3. Đánh giá nguy cơ hình thành nhánh cây Liti (Dendrite) và thời gian Sand
export function evaluateLithiumDendriteRisk(
  materialId: string,
  currentDensityMaCm2: number = 1.0,
  stackPressureMpa: number = 5.0,
  hasLithiophilicInterlayer: boolean = true
): DendriteRiskAssessment {
  const material = SOLID_ELECTROLYTES_CATALOG.find(m => m.id === materialId) || SOLID_ELECTROLYTES_CATALOG[0];

  // Tiêu chuẩn Monroe-Newman: Nếu Mô đun trượt G > 2 * G_Li (6.8 GPa) thì chất điện ly có khả năng cản dendrite về mặt cơ học
  const monroeNewmanPassed = material.shearModulusGpa > 6.8;

  // Dòng tới hạn (Critical Current Density - CCD) phụ thuộc vật liệu, áp suất nén và lớp đệm ái Li
  let baseCcd = 0.5;
  if (material.family === 'OXIDE_GARNET') baseCcd = 1.5;
  else if (material.family === 'SULFIDE_ARGYRODITE') baseCcd = 3.0;
  else if (material.family === 'POLYMER_SPE') baseCcd = 0.3;
  else if (material.family === 'HYBRID_COMPOSITE') baseCcd = 1.2;

  // Áp suất nén đều giúp duy trì tiếp xúc ranh giới hạt và cản dendrite
  const pressureBonus = Math.min(2.0, stackPressureMpa * 0.15);
  // Lớp đệm hạt nano vàng/bạc/ZnO giúp Li kết tủa đều phẳng không tạo đỉnh nhọn
  const interlayerMultiplier = hasLithiophilicInterlayer ? 2.2 : 1.0;

  const criticalCurrentDensityCcdMaCm2 = Math.round((baseCcd + pressureBonus) * interlayerMultiplier * 10) / 10;

  // Thời gian Sand tau_Sand: tau = pi * D * (z * F * C_0 / (2 * J))^2
  // Tỷ lệ nghịch với bình phương mật độ dòng J^2
  const sandTimeSeconds = Math.max(10, Math.round((18000 / Math.pow(Math.max(0.1, currentDensityMaCm2), 2))));

  const dendritePenetrated = currentDensityMaCm2 >= criticalCurrentDensityCcdMaCm2 && !monroeNewmanPassed;

  let safetyScore100 = 85;
  let riskStatusVi: 'AN TOÀN TUYỆT ĐỐI' | 'CẢNH BÁO PHÂN CỰC' | 'NGUY CƠ ĐOẢN MẠCH NGẦM' = 'AN TOÀN TUYỆT ĐỐI';
  let mitigationRecommendationVi = 'Duy trì áp suất nén đồng đều và giới hạn mật độ dòng sạc < 80% CCD.';

  if (currentDensityMaCm2 > criticalCurrentDensityCcdMaCm2) {
    if (monroeNewmanPassed) {
      safetyScore100 = 45;
      riskStatusVi = 'CẢNH BÁO PHÂN CỰC';
      mitigationRecommendationVi = 'Chất điện ly đủ cứng cơ học để chặn xuyên thủng, nhưng phân cực điện hóa quá lớn gây giảm dung lượng nhanh.';
    } else {
      safetyScore100 = 15;
      riskStatusVi = 'NGUY CƠ ĐOẢN MẠCH NGẦM';
      mitigationRecommendationVi = 'Dendrite liti xuyên thủng màng ngăn polyme mềm; bắt buộc phủ lớp đệm ái Liti hoặc chuyển sang điện ly oxit cứng.';
    }
  } else if (currentDensityMaCm2 > criticalCurrentDensityCcdMaCm2 * 0.75) {
    safetyScore100 = 65;
    riskStatusVi = 'CẢNH BÁO PHÂN CỰC';
    mitigationRecommendationVi = 'Đang hoạt động gần giới hạn tới hạn CCD, khuyến nghị tăng áp suất ép cell lên > 5 MPa.';
  }

  return {
    material,
    appliedCurrentDensityMaCm2: currentDensityMaCm2,
    criticalCurrentDensityCcdMaCm2,
    sandTimeSeconds,
    dendritePenetrated,
    stackPressureMpa,
    hasLithiophilicInterlayer,
    safetyScore100,
    riskStatusVi,
    mitigationRecommendationVi
  };
}

// 4. Mô phỏng hiệu năng pin toàn rắn (All-Solid-State Battery - ASSB)
export function simulateSolidStateBatteryCell(
  materialId: string,
  cathodeType: 'NMC811' | 'LFP' = 'NMC811',
  temperatureCelsius: number = 25,
  currentRateC: number = 0.5
): SolidStateBatteryPerformance {
  const electrolyte = SOLID_ELECTROLYTES_CATALOG.find(m => m.id === materialId) || SOLID_ELECTROLYTES_CATALOG[0];
  const effectiveConductivity = calculateArrheniusConductivity(materialId, temperatureCelsius);

  // Hiệu điện thế cell danh định
  const nominalVoltage = cathodeType === 'NMC811' ? 3.85 : 3.25;
  // Sụt áp do trở kháng nội ohm của chất điện ly rắn (V = I * R)
  const internalResistanceDrop = Math.min(0.6, (currentRateC * 0.15) / (effectiveConductivity + 0.05));
  const cellOperatingVoltageV = Math.round((nominalVoltage - internalResistanceDrop) * 100) / 100;

  // Cực âm Liti kim loại siêu mỏng (50 um) giúp tăng vọt mật độ năng lượng
  const baseWhKg = cathodeType === 'NMC811' ? 420.0 : 290.0;
  // Hệ số phạt nếu nhiệt độ thấp làm nghẽn dòng ion
  const tempPenalty = effectiveConductivity < 0.1 ? 0.75 : effectiveConductivity < 0.5 ? 0.9 : 1.0;
  const gravimetricEnergyDensityWhKg = Math.round(baseWhKg * tempPenalty);
  const volumetricEnergyDensityWhL = Math.round(gravimetricEnergyDensityWhKg * 2.15);

  // Khả năng chống cháy nổ khi đâm thủng đinh nhọn
  const thermalRunawayPunctureSafe = electrolyte.family !== 'SULFIDE_ARGYRODITE';

  // Tuổi thọ số chu kỳ nạp xả
  let estimatedCycleLife80Percent = 1500;
  if (electrolyte.family === 'OXIDE_GARNET') estimatedCycleLife80Percent = 3000;
  else if (electrolyte.family === 'SULFIDE_ARGYRODITE') estimatedCycleLife80Percent = 2000;
  else if (electrolyte.family === 'POLYMER_SPE') estimatedCycleLife80Percent = 800;

  return {
    electrolyte,
    cathodeType,
    temperatureCelsius,
    currentRateC,
    effectiveIonicConductivitymScm: effectiveConductivity,
    cellOperatingVoltageV,
    gravimetricEnergyDensityWhKg,
    volumetricEnergyDensityWhL,
    thermalRunawayPunctureSafe,
    estimatedCycleLife80Percent
  };
}
