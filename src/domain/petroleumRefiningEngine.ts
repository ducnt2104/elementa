// src/domain/petroleumRefiningEngine.ts
// Comprehensive Petroleum Refining, Catalytic Cracking, Octane Rating (RON/MON) & Bio-Gasoline (E5/E10) Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Chương 4 Lớp 11: Hydrocarbon - Nguồn Dầu Mỏ & Khí Thiên Nhiên)
// and TCVN 7716:2011 / ASTM D2699 (RON) / ASTM D2700 (MON) Standards

// =============================================================================
// 1. CRUDE OIL FRACTIONAL DISTILLATION DATA STRUCTURES
// =============================================================================

export interface PetroleumFraction {
  id: string;
  nameVi: string;
  nameEn: string;
  carbonNumberRange: string; // e.g., 'C1 - C4', 'C5 - C10'
  boilingRangeCelsius: [number, number]; // [minTemp, maxTemp]
  trayPositionFromTop: number; // 1 to 6 (1 = column top, 6 = bottom residue)
  densityGPerCm3: number;
  primaryHydrocarbonsVi: string;
  vietnamCommercialProductsVi: string[];
  industrialApplicationsVi: string;
}

export const PETROLEUM_FRACTIONS_CATALOG: PetroleumFraction[] = [
  {
    id: 'REFINERY_GAS_LPG',
    nameVi: 'Khí lọc dầu & Khí hóa lỏng (LPG)',
    nameEn: 'Refinery Gas & LPG',
    carbonNumberRange: 'C₁ - C₄',
    boilingRangeCelsius: [-160, 20],
    trayPositionFromTop: 1,
    densityGPerCm3: 0.55,
    primaryHydrocarbonsVi: 'Metan (CH₄), Etan (C₂H₆), Propan (C₃H₈), Butan (C₄H₁₀)',
    vietnamCommercialProductsVi: ['Bình gas đun nấu gia đình LPG (Petrovietnam Gas)', 'Nhiên liệu khí đốt lò nung công nghiệp'],
    industrialApplicationsVi: 'Được thu hồi ở đỉnh tháp chưng cất, nén lỏng thành khí dầu mỏ hóa lỏng (LPG - tỷ lệ 50:50 Propan/Butan) phục vụ dân sinh.'
  },
  {
    id: 'LIGHT_NAPHTHA_GASOLINE',
    nameVi: 'Xăng nhẹ & Naphtha (Nguyên liệu pha chế xăng)',
    nameEn: 'Light Naphtha & Straight-run Gasoline',
    carbonNumberRange: 'C₅ - C₁₀',
    boilingRangeCelsius: [35, 180],
    trayPositionFromTop: 2,
    densityGPerCm3: 0.72,
    primaryHydrocarbonsVi: 'Ankan mạch thẳng và nhánh C₅-C₁₀ (Pentan, Hexan, Heptan, Octan, Xycloankan)',
    vietnamCommercialProductsVi: ['Xăng ô tô xe máy RON 95-V, E5 RON 92', 'Dung môi pha sơn và tẩy rửa công nghiệp'],
    industrialApplicationsVi: 'Xăng chưng cất trực tiếp có chỉ số octan thấp (~60-70), cần qua cụm phân xưởng Isome hóa và Reforming xúc tác để tăng RON lên 95-98.'
  },
  {
    id: 'KEROSENE_JET_FUEL',
    nameVi: 'Dầu hỏa & Nhiên liệu phản lực máy bay (Jet A-1)',
    nameEn: 'Kerosene & Jet Fuel',
    carbonNumberRange: 'C₁₀ - C₁₆',
    boilingRangeCelsius: [180, 260],
    trayPositionFromTop: 3,
    densityGPerCm3: 0.79,
    primaryHydrocarbonsVi: 'Hydrocarbon no mạch hở và vòng C₁₀-C₁₆, độ tinh khiết cao, không chứa olefin',
    vietnamCommercialProductsVi: ['Nhiên liệu hàng không Jet A-1 (Nhà máy lọc dầu Dung Quất cung cấp)', 'Dầu hỏa thắp sáng truyền thống'],
    industrialApplicationsVi: 'Yêu cầu cực kỳ nghiêm ngặt về điểm đông đặc (<-47°C) và nhiệt cháy cao để đảm bảo động cơ máy bay phản lực hoạt động an toàn ở độ cao 10.000m.'
  },
  {
    id: 'DIESEL_OIL_DO',
    nameVi: 'Dầu Diesel (DO - Dầu gazole)',
    nameEn: 'Diesel Fuel (Gasoil)',
    carbonNumberRange: 'C₁₅ - C₂₂',
    boilingRangeCelsius: [260, 340],
    trayPositionFromTop: 4,
    densityGPerCm3: 0.84,
    primaryHydrocarbonsVi: 'Hydrocarbon C₁₅-C₂₂ có chỉ số cetan (Cetane number > 50) đảm bảo tự bốc cháy tốt',
    vietnamCommercialProductsVi: ['Dầu DO 0.05S và DO 0.001S-V (tiêu chuẩn Euro 5 cho ô tô tải, xe buýt)', 'Nhiên liệu tàu thủy vận tải biển'],
    industrialApplicationsVi: 'Cung cấp năng lượng cho động cơ diesel nén nổ của toàn bộ mạng lưới giao thông vận tải hàng hóa nặng và máy kéo nông nghiệp Việt Nam.'
  },
  {
    id: 'HEAVY_GAS_OIL',
    nameVi: 'Dầu nhờn bôi trơn & Dầu lò (FO)',
    nameEn: 'Heavy Gas Oil & Lubricants',
    carbonNumberRange: 'C₂₀ - C₃₀',
    boilingRangeCelsius: [340, 480],
    trayPositionFromTop: 5,
    densityGPerCm3: 0.90,
    primaryHydrocarbonsVi: 'Hydrocarbon phân tử lượng lớn, mạch nhánh và đa vòng, độ nhớt cao',
    vietnamCommercialProductsVi: ['Dầu nhớt bôi trơn động cơ xe máy/ô tô', 'Dầu đốt lò công nghiệp FO (Fuel Oil)'],
    industrialApplicationsVi: 'Làm nguyên liệu nạp (feedstock) cho phân xưởng cracking xúc tác (FCC) để bẻ gãy mạch dài thành xăng và khí hóa lỏng giá trị cao.'
  },
  {
    id: 'ATMOSPHERIC_RESIDUE_ASPHALT',
    nameVi: 'Cặn tháp chưng cất khí quyển & Nhựa đường (Bitumen)',
    nameEn: 'Vacuum Residue & Bitumen / Asphalt',
    carbonNumberRange: '> C₃₀',
    boilingRangeCelsius: [480, 700],
    trayPositionFromTop: 6,
    densityGPerCm3: 1.02,
    primaryHydrocarbonsVi: 'Asphaltene, nhựa hydrocarbon thơm ngưng tụ cao phân tử, lưu huỳnh và kim loại nặng (Ni, V)',
    vietnamCommercialProductsVi: ['Nhựa đường rải đường giao thông cao tốc (Bitumen 60/70)', 'Màng chống thấm dột xây dựng'],
    industrialApplicationsVi: 'Được hút ra ở đáy tháp chưng cất chân không, dùng làm vật liệu kết dính bê tông nhựa rải mặt đường quốc lộ và đường cao tốc Bắc - Nam.'
  }
];

export interface VietnamCrudeOilProfile {
  id: string;
  nameVi: string;
  oilFieldVi: string;
  apiGravity: number; // API > 31.1 is Light Crude
  sulfurContentPercent: number; // Sweet crude < 0.5% S
  paraffinWaxPercent: number;
  pourPointCelsius: number; // High pour point requires heated pipelines
  refineryMatchVi: string;
}

export const VIETNAM_CRUDE_OILS: Record<string, VietnamCrudeOilProfile> = {
  BACH_HO: {
    id: 'BACH_HO',
    nameVi: 'Dầu thô Mỏ Bạch Hổ (Bồn trũng Cửu Long)',
    oilFieldVi: 'Bể Cửu Long, thềm lục địa Nam Bộ (cách Vũng Tàu 120 km)',
    apiGravity: 38.6, // Light sweet crude
    sulfurContentPercent: 0.08, // Ultra-low sulfur (ngọt nhẹ)
    paraffinWaxPercent: 24.5, // Hàm lượng parafin sáp cao
    pourPointCelsius: 32.0, // Điểm đông đặc cao, cần sấy nóng đường ống
    refineryMatchVi: 'Nguyên liệu thiết kế chính cho Nhà máy Lọc dầu Dung Quất (Quảng Ngãi)'
  },
  SU_TU_DEN: {
    id: 'SU_TU_DEN',
    nameVi: 'Dầu thô Mỏ Sư Tử Đen',
    oilFieldVi: 'Lô 15-1, Bồn trũng Cửu Long',
    apiGravity: 36.8,
    sulfurContentPercent: 0.06,
    paraffinWaxPercent: 18.0,
    pourPointCelsius: 28.0,
    refineryMatchVi: 'Nhà máy Lọc dầu Dung Quất & Xuất khẩu quốc tế'
  },
  BRENT_BENCHMARK: {
    id: 'BRENT_BENCHMARK',
    nameVi: 'Dầu chuẩn Quốc tế Brent (Biển Bắc)',
    oilFieldVi: 'Biển Bắc (Vương quốc Anh / Na Uy)',
    apiGravity: 38.3,
    sulfurContentPercent: 0.37,
    paraffinWaxPercent: 6.0,
    pourPointCelsius: -3.0,
    refineryMatchVi: 'Chuẩn định giá dầu mỏ quốc tế'
  }
};

// =============================================================================
// 2. FLUID CATALYTIC CRACKING (FCC) & CARBOCATION BETA-SCISSION
// =============================================================================

export interface FccReactionStep {
  stepIndex: number;
  stepNameVi: string;
  catalystActiveSiteVi: string;
  chemicalEquationVi: string;
  carbocationIntermediateTypeVi: string;
  descriptionVi: string;
}

export const FCC_MECHANISM_STEPS: FccReactionStep[] = [
  {
    stepIndex: 1,
    stepNameVi: 'Tạo ion cacbocation trên tâm axit Brønsted của Zeolit Y',
    catalystActiveSiteVi: 'Tâm axit Brønsted [Si-O(H)-Al] trong mao quản Faujasite',
    chemicalEquationVi: 'R-CH=CH-R\' + H⁺(Zeolite) ⟶ R-CH₂-CH⁺-R\'',
    carbocationIntermediateTypeVi: 'Cacbocation bậc 2 (Secondary Carbocation)',
    descriptionVi: 'Phân tử olefin nhỏ hoặc ankan mạch dài bị proton hóa bởi proton axit mạnh trong khung zeolit Y, tạo thành ion cacbocation mang điện tích dương trên nguyên tử cacbon.'
  },
  {
    stepIndex: 2,
    stepNameVi: 'Chuyển vị ion hiđrua & alkyl (Tạo nhánh tăng chỉ số Octan)',
    catalystActiveSiteVi: 'Khung mao quản kích thước 7.4 Å của Zeolit',
    chemicalEquationVi: 'R-CH₂-CH⁺-CH₂-R\' ⟶ R-C⁺(CH₃)-CH₂-R\'',
    carbocationIntermediateTypeVi: 'Cacbocation bậc 3 (Tertiary Carbocation - Bền nhất)',
    descriptionVi: 'Chuyển dịch ion hiđrua 1,2-hydride shift và chuyển vị alkyl biến đổi mạch cacbon thẳng thành mạch phân nhánh bậc cao, tiền đề then chốt để xăng FCC có chỉ số octan cao vượt trội.'
  },
  {
    stepIndex: 3,
    stepNameVi: 'Phân cắt liên kết beta (Beta-Scission) bẻ gãy mạch',
    catalystActiveSiteVi: 'Phân cắt liên kết C-C ở vị trí beta so với cacbon C⁺',
    chemicalEquationVi: 'R-CH⁺-CH₂-CH₂-R\' ⟶ R-CH=CH₂ (Olefin xăng) + ⁺CH₂-R\' (Cacbocation mới)',
    carbocationIntermediateTypeVi: 'Phân cắt mạch C-C liên tục theo chuỗi truyền phản ứng',
    descriptionVi: 'Liên kết C-C ở vị trí beta bị kéo căng do hiệu ứng siêu liên hợp với orbital p trống, đứt ra tạo một phân tử olefin mạch ngắn (thành phần xăng có RON cao) và một ion cacbocation mới tiếp tục chu kỳ.'
  }
];

// =============================================================================
// 3. OCTANE RATING (RON/MON) & BIOFUEL BLENDING (E5 / E10) SIMULATION
// =============================================================================

export interface HydrocarbonOctaneSample {
  nameVi: string;
  formula: string;
  hydrocarbonClass: 'LINEAR_ALKANE' | 'BRANCHED_ALKANE' | 'ALKENE' | 'AROMATIC' | 'OXYGENATE_BIOFUEL';
  ron: number; // Research Octane Number
  mon: number; // Motor Octane Number
  sensitivityRonMinusMon: number;
  engineKnockingBehaviorVi: string;
}

export const PURE_HYDROCARBONS_OCTANE: Record<string, HydrocarbonOctaneSample> = {
  N_HEPTANE: {
    nameVi: 'n-Heptan (Chất chuẩn đối chứng Min)',
    formula: 'CH₃(CH₂)₅CH₃ (Mạch thẳng 7C)',
    hydrocarbonClass: 'LINEAR_ALKANE',
    ron: 0.0,
    mon: 0.0,
    sensitivityRonMinusMon: 0.0,
    engineKnockingBehaviorVi: 'Dễ bị nén tự kích nổ tự do gây tiếng gõ động cơ dữ dội phá hủy piston. Quy ước chuẩn RON = 0.'
  },
  ISOOCTANE: {
    nameVi: 'Isooctan (2,2,4-Trimetylpentan - Chuẩn Max)',
    formula: '(CH₃)₃C-CH₂-CH(CH₃)₂ (Mạch nhánh)',
    hydrocarbonClass: 'BRANCHED_ALKANE',
    ron: 100.0,
    mon: 100.0,
    sensitivityRonMinusMon: 0.0,
    engineKnockingBehaviorVi: 'Cháy êm dịu, kiểm soát ngọn lửa hoàn hảo, chống kích nổ tối đa. Quy ước chuẩn RON = 100.'
  },
  TOLUENE: {
    nameVi: 'Toluen (Metylbenzen - Reforming aromatics)',
    formula: 'C₆H₅-CH₃ (Vòng thơm)',
    hydrocarbonClass: 'AROMATIC',
    ron: 120.0,
    mon: 109.0,
    sensitivityRonMinusMon: 11.0,
    engineKnockingBehaviorVi: 'Khả năng chống kích nổ cực kỳ cao nhờ nhân thơm bền vững, nhưng hàm lượng bị khống chế theo TCVN để giảm phát thải độc hại.'
  },
  ETHANOL_BIOFUEL: {
    nameVi: 'Etanol Sinh Học (Nhiên liệu cồn sinh học E100)',
    formula: 'C₂H₅OH (Sản xuất từ sắn củ/ngô Việt Nam)',
    hydrocarbonClass: 'OXYGENATE_BIOFUEL',
    ron: 108.0,
    mon: 90.0,
    sensitivityRonMinusMon: 18.0,
    engineKnockingBehaviorVi: 'Chỉ số octan rất cao, chứa oxy nội phân tử giúp xăng cháy triệt để hơn, giảm 20% khí độc CO và hydrocarbon chưa cháy.'
  },
  N_HEXANE: {
    nameVi: 'n-Hexan (Alkan thẳng nhẹ)',
    formula: 'CH₃(CH₂)₄CH₃',
    hydrocarbonClass: 'LINEAR_ALKANE',
    ron: 25.0,
    mon: 26.0,
    sensitivityRonMinusMon: -1.0,
    engineKnockingBehaviorVi: 'Chỉ số octan rất kém, cần qua phân xưởng Isome hóa (Isomerization) để biến thành iso-hexan.'
  }
};

export interface GasolineBlendResult {
  baseGasolineRon: number;
  ethanolVolumePercent: number; // 0% (E0), 5% (E5), 10% (E10)
  resultingBlendRon: number;
  resultingBlendMon: number;
  antiKnockIndexAki: number; // (RON + MON) / 2
  vietnamCommercialGradeNameVi: string;
  coEmissionReductionPercent: number;
  greenhouseGasSavingsPercent: number;
  engineCompatibilityNoticeVi: string;
  vietnamLegalStandardVi: string;
}

/**
 * Calculates blended gasoline octane rating (RON & MON) and emissions reduction
 * based on base gasoline blendstock and bio-ethanol percentage (E5 / E10).
 */
export function calculateGasolineBlendOctane(
  baseGasolineRon: number = 92.0,
  ethanolPercent: number = 5.0 // 5% for E5, 10% for E10
): GasolineBlendResult {
  const safeBaseRon = Math.max(80, Math.min(98, baseGasolineRon));
  const safeEthanol = Math.max(0, Math.min(25, ethanolPercent));

  const ethanolRon = PURE_HYDROCARBONS_OCTANE.ETHANOL_BIOFUEL.ron; // 108
  const ethanolMon = PURE_HYDROCARBONS_OCTANE.ETHANOL_BIOFUEL.mon; // 90

  // Base MON estimation (typically Base RON - 8 to 10 for straight-run/cracked blends)
  const baseGasolineMon = safeBaseRon - 9.0;

  // Synergistic non-linear blending effect of ethanol with hydrocarbons (slight positive synergy)
  const synergyBonus = safeEthanol > 0 ? (safeEthanol / 10.0) * 0.8 : 0;

  const resultingBlendRon = parseFloat(
    (((100 - safeEthanol) * safeBaseRon + safeEthanol * ethanolRon) / 100 + synergyBonus).toFixed(1)
  );

  const resultingBlendMon = parseFloat(
    (((100 - safeEthanol) * baseGasolineMon + safeEthanol * ethanolMon) / 100).toFixed(1)
  );

  const antiKnockIndexAki = parseFloat(((resultingBlendRon + resultingBlendMon) / 2).toFixed(1));

  // Emission reductions
  const coEmissionReductionPercent = Math.min(25, parseFloat((safeEthanol * 1.8).toFixed(1)));
  const greenhouseGasSavingsPercent = Math.min(15, parseFloat((safeEthanol * 1.1).toFixed(1)));

  let gradeName = 'Xăng khoáng truyền thống (E0)';
  if (Math.abs(safeEthanol - 5) <= 1) {
    gradeName = resultingBlendRon >= 95 ? 'Xăng sinh học E5 RON 95' : 'Xăng sinh học E5 RON 92';
  } else if (Math.abs(safeEthanol - 10) <= 2) {
    gradeName = 'Xăng sinh học E10 (Thân thiện môi trường)';
  } else if (safeEthanol > 12) {
    gradeName = `Xăng sinh học nồng độ cồn cao E${Math.round(safeEthanol)}`;
  }

  const engineCompatibilityNoticeVi = safeEthanol <= 10
    ? 'Tương thích 100% với toàn bộ động cơ xe máy (Honda, Yamaha) và ô tô tại Việt Nam mà không cần điều chỉnh hệ thống phun xăng điện tử PGM-FI.'
    : 'Yêu cầu động cơ dòng Flex-Fuel (FFV) với gioăng cao su chịu cồn để tránh ăn mòn đường ống dẫn nhiên liệu.';

  const vietnamLegalStandardVi = 'TCVN 7716:2011 (Nhiên liệu sinh học gốc) & Quyết định 49/2011/QĐ-TTg lộ trình áp dụng tiêu chuẩn khí thải Euro 5';

  return {
    baseGasolineRon: safeBaseRon,
    ethanolVolumePercent: safeEthanol,
    resultingBlendRon,
    resultingBlendMon,
    antiKnockIndexAki,
    vietnamCommercialGradeNameVi: gradeName,
    coEmissionReductionPercent,
    greenhouseGasSavingsPercent,
    engineCompatibilityNoticeVi,
    vietnamLegalStandardVi
  };
}
