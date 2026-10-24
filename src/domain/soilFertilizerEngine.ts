// src/domain/soilFertilizerEngine.ts
// Comprehensive Soil Chemistry, Agricultural Fertilizers, Nutrient Fixation & Nitrate Leaching Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Chuyên đề Lớp 11: Hợp chất của Nitơ - Photpho trong Nông nghiệp)
// and FAO / TCVN 6187 / WHO Guidelines for Drinking Water Quality (Nitrate limits < 50 mg/L)

// =============================================================================
// 1. AGRICULTURAL FERTILIZERS CATALOG & INDUSTRIAL FORMULAS
// =============================================================================

export type FertilizerClass = 'NITROGEN' | 'PHOSPHORUS' | 'POTASSIUM' | 'COMPLEX_NPK' | 'CONTROLLED_RELEASE';

export interface FertilizerProfile {
  id: string;
  nameVi: string;
  commonNameVi: string;
  chemicalFormula: string;
  fertilizerClass: FertilizerClass;
  gradeNPercent: number; // % N (total nitrogen)
  gradeP2O5Percent: number; // % P2O5 (available phosphate)
  gradeK2OPercent: number; // % K2O (soluble potash)
  solubilityGPer100Ml: number; // Water solubility at 20°C
  soilAcidityEffectVi: 'ACIDIFYING' | 'NEUTRAL' | 'BASIC' | 'TEMPORARY_ALKALINE_THEN_ACID';
  acidityDescriptionVi: string;
  primaryMechanismVi: string;
  vietnamManufacturingPlantsVi: string[];
  agronomicRecommendationVi: string;
}

export const FERTILIZERS_CATALOG: FertilizerProfile[] = [
  {
    id: 'UREA',
    nameVi: 'Đạm Urê (Carbamide)',
    commonNameVi: 'Phân đạm Urê 46% N (Đạm trắng)',
    chemicalFormula: 'CO(NH₂)₂',
    fertilizerClass: 'NITROGEN',
    gradeNPercent: 46.0,
    gradeP2O5Percent: 0.0,
    gradeK2OPercent: 0.0,
    solubilityGPer100Ml: 108.0,
    soilAcidityEffectVi: 'TEMPORARY_ALKALINE_THEN_ACID',
    acidityDescriptionVi: 'Khi bón, enzyme urease thủy phân sinh (NH₄)₂CO₃ làm tăng pH cục bộ quanh hạt phân (gây mất khí NH₃↑ nếu bón bề mặt); sau đó vi khuẩn nitrat hóa oxi hóa NH₄⁺ thành NO₃⁻ giải phóng H⁺ làm chua đất về lâu dài.',
    primaryMechanismVi: 'CO(NH₂)₂ + 2H₂O ⟶ (NH₄)₂CO₃ ⟶ 2NH₄⁺ + CO₃²⁻. NH₄⁺ được keo đất hấp phụ hoặc nitrat hóa thành NO₃⁻.',
    vietnamManufacturingPlantsVi: ['Tổng công ty Phân bón và Hóa chất Dầu khí (Đạm Phú Mỹ - Bà Rịa Vũng Tàu)', 'Công ty CP Phân bón Dầu khí Cà Mau (Đạm Cà Mau)'],
    agronomicRecommendationVi: 'Thích hợp cho hầu hết các loại cây trồng (lúa nước, ngô, cây ăn trái). Cần vùi sâu 5-7cm hoặc tưới ngập để tránh thất thoát amoniac bay hơi trong điều kiện nắng nóng.'
  },
  {
    id: 'AMMONIUM_SULFATE',
    nameVi: 'Amoni Sunfat (SA)',
    commonNameVi: 'Phân đạm SA (21% N, 24% S)',
    chemicalFormula: '(NH₄)₂SO₄',
    fertilizerClass: 'NITROGEN',
    gradeNPercent: 21.0,
    gradeP2O5Percent: 0.0,
    gradeK2OPercent: 0.0,
    solubilityGPer100Ml: 75.4,
    soilAcidityEffectVi: 'ACIDIFYING',
    acidityDescriptionVi: 'Phân có tính chua sinh lý mạnh. Quá trình nitrat hóa 2 mol NH₄⁺ giải phóng 4 mol ion H⁺; ion SO₄²⁻ tồn dư trong đất cũng làm tăng độ chua.',
    primaryMechanismVi: '(NH₄)₂SO₄ ⟶ 2NH₄⁺ + SO₄²⁻. Nitrat hóa: 2NH₄⁺ + 4O₂ ⟶ 2NO₃⁻ + 4H⁺ + 2H₂O.',
    vietnamManufacturingPlantsVi: ['Sản phẩm phụ từ nhà máy luyện cốc thép Thái Nguyên', 'Công ty Phân đạm Hà Bắc'],
    agronomicRecommendationVi: 'Tuyệt vời cho đất kiềm hoặc cây trồng ưa lưu huỳnh (cà phê Tây Nguyên, chè Phú Thọ, cao su). Không nên bón thường xuyên trên đất phèn chua mà không khử chua bằng vôi.'
  },
  {
    id: 'AMMONIUM_NITRATE',
    nameVi: 'Amoni Nitrat (Đạm 2 lá)',
    commonNameVi: 'Phân amoni nitrat (35% N)',
    chemicalFormula: 'NH₄NO₃',
    fertilizerClass: 'NITROGEN',
    gradeNPercent: 35.0,
    gradeP2O5Percent: 0.0,
    gradeK2OPercent: 0.0,
    solubilityGPer100Ml: 192.0,
    soilAcidityEffectVi: 'ACIDIFYING',
    acidityDescriptionVi: 'Cung cấp cả đạm amoni (hấp thu dần) và đạm nitrat (cây hút ngay). Hút ẩm mạnh, làm chua đất nhẹ do nitrat hóa phần amoni.',
    primaryMechanismVi: 'NH₄NO₃ ⟶ NH₄⁺ + NO₃⁻. NO₃⁻ tự do trong dung dịch đất, dễ bị rửa trôi nếu mưa lớn.',
    vietnamManufacturingPlantsVi: ['Tổng công ty Công nghiệp Hóa chất mỏ (Vinacomin)'],
    agronomicRecommendationVi: 'Tác dụng cực nhanh, dùng bón thúc cho rau màu vụ đông miền Bắc. Lưu ý bảo quản chống ẩm và phòng chống cháy nổ nghiêm ngặt.'
  },
  {
    id: 'SINGLE_SUPERPHOSPHATE',
    nameVi: 'Supephotphat đơn (SSP)',
    commonNameVi: 'Phân lân Lâm Thao (16-18% P₂O₅)',
    chemicalFormula: 'Ca(H₂PO₄)₂ + 2CaSO₄',
    fertilizerClass: 'PHOSPHORUS',
    gradeNPercent: 0.0,
    gradeP2O5Percent: 17.5,
    gradeK2OPercent: 0.0,
    solubilityGPer100Ml: 1.8,
    soilAcidityEffectVi: 'NEUTRAL',
    acidityDescriptionVi: 'Gồm muối tan canxi dihidrophotphat và thạch cao (CaSO₄). Bản thân không làm chua đất, thạch cao còn giúp cải tạo đất kiềm.',
    primaryMechanismVi: 'Ca₃(PO₄)₂ (quặng Apatit) + 2H₂SO₄ ⟶ Ca(H₂PO₄)₂ + 2CaSO₄. Cung cấp ion H₂PO₄⁻ cây trồng dễ hấp thu.',
    vietnamManufacturingPlantsVi: ['Công ty CP Supe Phốt phát và Hóa chất Lâm Thao (Phú Thọ)'],
    agronomicRecommendationVi: 'Phân lân quốc dân của Việt Nam, bón lót cho lúa và cây ăn quả, đặc biệt trên đất bạc màu và đất phèn.'
  },
  {
    id: 'TRIPLE_SUPERPHOSPHATE',
    nameVi: 'Supephotphat kép (TSP)',
    commonNameVi: 'Phân lân nồng độ cao (46% P₂O₅)',
    chemicalFormula: 'Ca(H₂PO₄)₂',
    fertilizerClass: 'PHOSPHORUS',
    gradeNPercent: 0.0,
    gradeP2O5Percent: 46.0,
    gradeK2OPercent: 0.0,
    solubilityGPer100Ml: 4.0,
    soilAcidityEffectVi: 'NEUTRAL',
    acidityDescriptionVi: 'Không chứa thạch cao phụ phẩm. Hàm lượng P₂O₅ hữu hiệu cao gấp gần 3 lần supe lân đơn.',
    primaryMechanismVi: 'Ca₃(PO₄)₂ + 4H₃PO₄ ⟶ 3Ca(H₂PO₄)₂.',
    vietnamManufacturingPlantsVi: ['Nhà máy DAP Đình Vũ (Hải Phòng)', 'DAP số 2 Lào Cai'],
    agronomicRecommendationVi: 'Tiết kiệm chi phí vận chuyển cho các vùng sâu vùng xa (Tây Nguyên, Tây Bắc). Bón lót đầu vụ.'
  },
  {
    id: 'POTASSIUM_CHLORIDE',
    nameVi: 'Kali Clorua (MOP)',
    commonNameVi: 'Phân kali muối ớt (60% K₂O)',
    chemicalFormula: 'KCl',
    fertilizerClass: 'POTASSIUM',
    gradeNPercent: 0.0,
    gradeP2O5Percent: 0.0,
    gradeK2OPercent: 60.0,
    solubilityGPer100Ml: 34.0,
    soilAcidityEffectVi: 'NEUTRAL',
    acidityDescriptionVi: 'Phân sinh lý trung tính. Ion K⁺ hấp phụ vào keo đất, Cl⁻ tồn tại trong dung dịch đất.',
    primaryMechanismVi: 'KCl ⟶ K⁺ + Cl⁻. K⁺ tham gia điều hòa áp suất thẩm thấu, đóng mở khí khổng và vận chuyển đường bột.',
    vietnamManufacturingPlantsVi: ['Nhập khẩu chủ yếu từ Nga, Belarus, Canada và dự án Kali tại Lào'],
    agronomicRecommendationVi: 'Bón thúc giai đoạn cây nuôi củ quả (lúa trổ bông, khoai lang, mía đường). Không bón lượng lớn cho cây mẫn cảm với clo (thuốc lá, sầu riêng).'
  },
  {
    id: 'DAP_COMPLEX',
    nameVi: 'Diamoni Photphat (DAP)',
    commonNameVi: 'Phân phức hợp DAP (18-46-0)',
    chemicalFormula: '(NH₄)₂HPO₄',
    fertilizerClass: 'COMPLEX_NPK',
    gradeNPercent: 18.0,
    gradeP2O5Percent: 46.0,
    gradeK2OPercent: 0.0,
    solubilityGPer100Ml: 58.0,
    soilAcidityEffectVi: 'TEMPORARY_ALKALINE_THEN_ACID',
    acidityDescriptionVi: 'Giai đoạn đầu tạo pH kiềm nhẹ quanh hạt (~7.5-8.0), sau đó nitrat hóa amoni giải phóng axit.',
    primaryMechanismVi: '(NH₄)₂HPO₄ ⟶ 2NH₄⁺ + HPO₄²⁻. Cung cấp đồng thời đạm amoni và lân tan trong nước.',
    vietnamManufacturingPlantsVi: ['Công ty CP DAP - Vinachem Đình Vũ (Hải Phòng)', 'Công ty CP DAP số 2 - Vinachem (Lào Cai)'],
    agronomicRecommendationVi: 'Phân bón phức hợp cao cấp hàng đầu cho vùng lúa Đồng bằng Sông Cửu Long, kích thích rễ phát triển cực mạnh.'
  },
  {
    id: 'CONTROLLED_RELEASE_UREA',
    nameVi: 'Đạm Urê Chậm Tan Màng Bọc (CRU / CRF)',
    commonNameVi: 'Phân đạm thông minh bọc polyme sinh học',
    chemicalFormula: 'CO(NH₂)₂ + Màng Polyurethane/Polymer sinh học',
    fertilizerClass: 'CONTROLLED_RELEASE',
    gradeNPercent: 42.0,
    gradeP2O5Percent: 0.0,
    gradeK2OPercent: 0.0,
    solubilityGPer100Ml: 1.5, // Controlled diffusion
    soilAcidityEffectVi: 'NEUTRAL',
    acidityDescriptionVi: 'Màng bọc nano/polyme kiểm soát tốc độ khuếch tán nước vào và giải phóng đạm từ từ theo nhu cầu của rễ, giảm 80% hiện tượng rửa trôi nitrat và bay hơi amoniac.',
    primaryMechanismVi: 'Nước thẩm thấu qua vi mao quản màng bọc ⟶ Hòa tan urê lõi ⟶ Khuếch tán từ từ trong 60-90 ngày theo quy luật Fick.',
    vietnamManufacturingPlantsVi: ['Dự án R&D Viện Hàn lâm Khoa học Công nghệ Việt Nam & Đạm Phú Mỹ'],
    agronomicRecommendationVi: 'Công nghệ phân bón chính xác (Hi-tech Agriculture). Chỉ cần bón 1 lần cho cả vụ lúa 3 tháng, giảm phát thải khí nhà kính N₂O và ô nhiễm nguồn nước ngầm.'
  }
];

// =============================================================================
// 2. SOIL TYPES & BUFFER CAPACITY REGIMES IN VIETNAM
// =============================================================================

export type VietnamSoilType =
  | 'ACID_SULFATE_SOIL'    // Đất phèn (Đồng Tháp Mười, Tứ Giác Long Xuyên)
  | 'FERRALSOLIC_SOIL'     // Đất đỏ bazan / Feralit (Tây Nguyên, Đông Nam Bộ)
  | 'ALLUVIAL_RIVER_SOIL'  // Đất phù sa trung tính (Đồng bằng Sông Hồng & Sông Cửu Long)
  | 'SANDY_COASTAL_SOIL';  // Đất cát biển nghèo dinh dưỡng (Duyên hải miền Trung)

export interface SoilProfile {
  id: VietnamSoilType;
  nameVi: string;
  regionalLocationVi: string;
  baselinePh: number;
  cationExchangeCapacityCecMeqPer100g: number; // CEC
  clayContentPercent: number;
  organicMatterHumusPercent: number;
  toxicFreeAl3PlusPpm: number; // Toxic aluminum concentration in ppm
  phosphateFixationCapacityPercent: number; // % of applied phosphate rendered insoluble
  descriptionVi: string;
}

export const VIETNAM_SOILS_DATA: Record<VietnamSoilType, SoilProfile> = {
  ACID_SULFATE_SOIL: {
    id: 'ACID_SULFATE_SOIL',
    nameVi: 'Đất phèn hoạt động (Acid Sulfate Soil)',
    regionalLocationVi: 'Đồng Tháp Mười, Tứ Giác Long Xuyên, Bán đảo Cà Mau',
    baselinePh: 3.8,
    cationExchangeCapacityCecMeqPer100g: 14.5,
    clayContentPercent: 55,
    organicMatterHumusPercent: 4.2,
    toxicFreeAl3PlusPpm: 85, // Very high toxic Al3+
    phosphateFixationCapacityPercent: 88, // Insoluble AlPO4 fixation
    descriptionVi: 'Đất chứa khoáng Pyrit (FeS₂) bị oxy hóa thành axit sunfuric (H₂SO₄) và giải phóng ion nhôm tự do Al³⁺ gây ngộ độc rễ lúa (nghẹt rễ, vàng lá). Bắt buộc phải rửa phèn và bón vôi nông nghiệp khử chua.'
  },
  FERRALSOLIC_SOIL: {
    id: 'FERRALSOLIC_SOIL',
    nameVi: 'Đất Feralit / Đất đỏ Bazan đồi núi',
    regionalLocationVi: 'Tây Nguyên (Đắk Lắk, Gia Lai, Lâm Đồng) & Đông Nam Bộ',
    baselinePh: 4.8,
    cationExchangeCapacityCecMeqPer100g: 18.0,
    clayContentPercent: 62,
    organicMatterHumusPercent: 3.5,
    toxicFreeAl3PlusPpm: 25,
    phosphateFixationCapacityPercent: 75, // FePO4 & AlPO4 fixation
    descriptionVi: 'Đất giàu oxit sắt và oxit nhôm (Goethite, Gibbsite). Khả năng giữ nước và keo đất tốt nhưng cố định phân lân rất mạnh thành sắt/nhôm photphat khó tan, cần bón vôi tăng pH để giải phóng lân hữu hiệu.'
  },
  ALLUVIAL_RIVER_SOIL: {
    id: 'ALLUVIAL_RIVER_SOIL',
    nameVi: 'Đất phù sa bồi tụ sông màu mỡ',
    regionalLocationVi: 'Đồng bằng Sông Hồng & Đồng bằng Sông Tiền, Sông Hậu',
    baselinePh: 6.5,
    cationExchangeCapacityCecMeqPer100g: 22.0,
    clayContentPercent: 38,
    organicMatterHumusPercent: 2.8,
    toxicFreeAl3PlusPpm: 0,
    phosphateFixationCapacityPercent: 25, // Optimum bioavailability
    descriptionVi: 'Đất có độ phì nhiêu cao nhất, pH gần trung tính, hàm lượng dinh dưỡng khoáng cân đối. Rất ít nguy cơ cố định lân hay độc tính nhôm, hiệu quả sử dụng phân bón cao nhất cả nước.'
  },
  SANDY_COASTAL_SOIL: {
    id: 'SANDY_COASTAL_SOIL',
    nameVi: 'Đất cát pha ven biển nghèo keo',
    regionalLocationVi: 'Duyên hải Nam Trung Bộ (Quảng Bình, Bình Định, Ninh Thuận)',
    baselinePh: 5.8,
    cationExchangeCapacityCecMeqPer100g: 4.5, // Extremely low CEC!
    clayContentPercent: 8,
    organicMatterHumusPercent: 0.6,
    toxicFreeAl3PlusPpm: 2,
    phosphateFixationCapacityPercent: 12,
    descriptionVi: 'Hàm lượng hạt sét và mùn cực thấp dẫn đến khả năng trao đổi cation (CEC) nghèo nàn. Phân đạm và kali bón vào rất dễ bị rửa trôi sâu vào mạch nước ngầm sau mỗi trận mưa rào.'
  }
};

// =============================================================================
// 3. LIMING CALCULATION & ACID SULFATE REMEDIATION (BÓN VÔI KHỬ CHUA)
// =============================================================================

export interface LimingRemediationResult {
  soilType: SoilProfile;
  initialPh: number;
  targetPh: number;
  limeRequirementKgCaoPerHa: number; // kg CaO/ha
  neutralizedAl3PlusPpm: number;
  finalFreeAl3PlusPpm: number;
  bioavailablePhosphateIncreasePercent: number;
  chemicalReactionVi: string;
}

/**
 * Calculates agricultural lime requirement (kg CaO/ha) to neutralize soil acidity
 * and precipitate toxic Al3+ into non-toxic Al(OH)3.
 */
export function calculateLimingRequirement(
  soilId: VietnamSoilType,
  targetPh: number = 6.2
): LimingRemediationResult {
  const soil = VIETNAM_SOILS_DATA[soilId];
  const clampedTargetPh = Math.max(soil.baselinePh, Math.min(7.0, targetPh));
  const deltaPh = clampedTargetPh - soil.baselinePh;

  // Buffer capacity factor based on CEC and clay content
  // Higher CEC means stronger soil buffering against pH changes!
  const bufferFactor = 450 + (soil.cationExchangeCapacityCecMeqPer100g * 75);
  const limeRequirementKgCaoPerHa = Math.round(deltaPh * bufferFactor);

  // Toxic Al3+ precipitation: Al3+ + 3OH- -> Al(OH)3 v
  // At pH > 5.5, soluble Al3+ practically drops to near 0 ppm!
  let neutralizedAl3 = 0;
  let remainingAl3 = soil.toxicFreeAl3PlusPpm;

  if (clampedTargetPh >= 5.5) {
    neutralizedAl3 = soil.toxicFreeAl3PlusPpm;
    remainingAl3 = 0;
  } else {
    const neutralFrac = (clampedTargetPh - soil.baselinePh) / (5.5 - soil.baselinePh);
    neutralizedAl3 = Math.round(soil.toxicFreeAl3PlusPpm * Math.min(1, Math.max(0, neutralFrac)));
    remainingAl3 = soil.toxicFreeAl3PlusPpm - neutralizedAl3;
  }

  // Bioavailable phosphorus increases when pH reaches 6.0-6.8 as FePO4/AlPO4 dissolution equilibrium shifts
  const bioavailablePhosphateIncreasePercent = Math.round(
    Math.min(65, (deltaPh / 2.0) * soil.phosphateFixationCapacityPercent)
  );

  const chemicalReactionVi = `Phản ứng khử chua và giải độc nhôm bằng vôi nông nghiệp (CaO / CaCO₃):
1. Khử ion H⁺ tự do: CaO + H₂O ⟶ Ca(OH)₂; Ca(OH)₂ + 2H⁺ ⟶ Ca²⁺ + 2H₂O (làm tăng pH đất từ ${soil.baselinePh} lên ${clampedTargetPh}).
2. Kết tủa nhôm độc: Al³⁺ + 3OH⁻ ⟶ Al(OH)₃↓ (kết tủa keo trắng trơ, loại trừ triệt để ${neutralizedAl3} ppm Al³⁺ gây thối rễ lúa).
3. Giải phóng lân: Ở pH ${clampedTargetPh}, liên kết Fe-P và Al-P bị phá vỡ, giải phóng ion lân hòa tan H₂PO₄⁻ tăng ${bioavailablePhosphateIncreasePercent}%.`;

  return {
    soilType: soil,
    initialPh: soil.baselinePh,
    targetPh: clampedTargetPh,
    limeRequirementKgCaoPerHa,
    neutralizedAl3PlusPpm: neutralizedAl3,
    finalFreeAl3PlusPpm: remainingAl3,
    bioavailablePhosphateIncreasePercent,
    chemicalReactionVi
  };
}

// =============================================================================
// 4. NITROGEN TRANSFORMATION KINETICS & GROUNDWATER LEACHING SIMULATION
// =============================================================================

export interface DailyNitrogenSnapshot {
  day: number;
  soilAmmoniumKgPerHa: number; // NH4+ in soil
  soilNitrateKgPerHa: number; // NO3- in soil
  plantCumulativeUptakeKgNPerHa: number; // N absorbed by crop
  leachedNitrateCumulativeKgNPerHa: number; // N lost to groundwater
  volatilizedAmmoniaCumulativeKgNPerHa: number; // N lost as NH3 gas
  groundwaterNitratePpm: number; // mg/L NO3- in shallow water table
  eutrophicationRiskLevel: 'SAFE' | 'MODERATE' | 'HAZARDOUS';
}

export interface NitrogenSimulationResult {
  fertilizer: FertilizerProfile;
  soil: SoilProfile;
  applicationRateKgPerHa: number;
  rainfallMmPerDay: number;
  totalNAppliedKgPerHa: number;
  nitrogenUseEfficiencyNuePercent: number; // % N taken up by plant
  finalLeachedNitrateKgPerHa: number;
  finalVolatilizedAmmoniaKgPerHa: number;
  maxGroundwaterNitratePpm: number;
  whoStandardExceeded: boolean; // > 50 mg/L NO3-
  dailyTrajectory: DailyNitrogenSnapshot[];
  summaryConclusionVi: string;
  pedagogicalTakeawayVi: string;
}

/**
 * Simulates 30-day soil nitrogen transformation dynamics:
 * Urea hydrolysis -> Nitrification (NH4+ -> NO2- -> NO3-) -> Plant uptake -> Nitrate leaching.
 */
export function simulateNitrogenTransformation(
  fertilizerId: string = 'UREA',
  soilId: VietnamSoilType = 'ALLUVIAL_RIVER_SOIL',
  applicationRateKgPerHa: number = 150, // typical 100-200 kg urea / ha
  rainfallMmPerDay: number = 15, // typical monsoon 10-30 mm/day
  durationDays: number = 45 // Standard crop cycle (e.g. 45-60 days)
): NitrogenSimulationResult {
  const fertilizer = FERTILIZERS_CATALOG.find(f => f.id === fertilizerId) || FERTILIZERS_CATALOG[0];
  const soil = VIETNAM_SOILS_DATA[soilId] || VIETNAM_SOILS_DATA.ALLUVIAL_RIVER_SOIL;

  const safeRate = Math.max(20, Math.min(500, applicationRateKgPerHa));
  const safeRain = Math.max(0, Math.min(60, rainfallMmPerDay));
  const safeDays = Math.max(10, Math.min(90, durationDays));

  const totalNAppliedKgPerHa = parseFloat(((safeRate * fertilizer.gradeNPercent) / 100).toFixed(1));

  // Rate constants modified by soil and fertilizer chemistry
  // Controlled release fertilizer releases N steadily matched to root uptake capacity
  const isCRF = fertilizer.id === 'CONTROLLED_RELEASE_UREA';
  const releaseRate = isCRF ? 0.065 : 0.40; // Steady linear/Fickian diffusion

  // Soil CEC retention factor for NH4+ (higher CEC retains NH4+ tightly)
  const cecRetentionFactor = Math.min(0.9, soil.cationExchangeCapacityCecMeqPer100g / 25);

  // Leaching velocity for NO3- (anion exclusion by clay): higher rain and lower clay = faster leaching
  const leachingRateConstant = (safeRain / 20) * (1 - soil.clayContentPercent / 120) * 0.12;

  // Nitrification rate (soil microbes convert NH4+ to NO3-): suppressed in very acid soil (pH < 4.5)
  let nitrificationRate = 0.15; // Day^-1
  if (soil.baselinePh < 4.5) {
    nitrificationRate = 0.04; // Acid suppresses Nitrosomonas/Nitrobacter
  } else if (soil.baselinePh > 6.0) {
    nitrificationRate = 0.22;
  }

  // Plant daily uptake capacity (active growth phase)
  const maxPlantDailyUptakeKg = 3.2;

  let currentUnreleasedN = totalNAppliedKgPerHa;
  let currentNH4 = 0;
  let currentNO3 = 0;
  let cumulativePlantUptake = 0;
  let cumulativeLeached = 0;
  let cumulativeVolatilized = 0;
  let maxGroundwaterNitrate = 0;

  const trajectory: DailyNitrogenSnapshot[] = [];

  for (let day = 1; day <= safeDays; day++) {
    // 1. Release / Hydrolysis
    const newlyReleased = currentUnreleasedN * releaseRate;
    currentUnreleasedN -= newlyReleased;

    // Ammonia volatilization (occurs immediately after urea hydrolysis if pH high or surface applied)
    let volatilizationFrac = 0.12;
    if (isCRF) volatilizationFrac = 0.02; // Coated granule suppresses volatilization
    if (soil.id === 'SANDY_COASTAL_SOIL') volatilizationFrac = 0.18;

    const volatilizedToday = newlyReleased * volatilizationFrac;
    cumulativeVolatilized += volatilizedToday;

    // Remaining goes to soil NH4+ pool
    currentNH4 += (newlyReleased - volatilizedToday);

    // 2. Nitrification of NH4+ to NO3-
    const nitrifiedToday = currentNH4 * nitrificationRate * (1 - cecRetentionFactor * 0.4);
    currentNH4 = Math.max(0, currentNH4 - nitrifiedToday);
    currentNO3 += nitrifiedToday;

    // 3. Plant Uptake (prefers NO3- and available NH4+)
    // With CRF, steady nutrient supply avoids saturating root uptake capacity
    const availableMineralN = currentNH4 * 0.35 + currentNO3 * 0.85;
    const plantUptakeToday = Math.min(maxPlantDailyUptakeKg, availableMineralN * (isCRF ? 0.45 : 0.25));
    const uptakeFromNO3 = Math.min(currentNO3, plantUptakeToday * 0.7);
    const uptakeFromNH4 = Math.min(currentNH4, plantUptakeToday * 0.3);

    currentNO3 -= uptakeFromNO3;
    currentNH4 -= uptakeFromNH4;
    cumulativePlantUptake += (uptakeFromNO3 + uptakeFromNH4);

    // 4. Nitrate Leaching (NO3- is mobile and washed downward)
    const leachedToday = currentNO3 * leachingRateConstant;
    currentNO3 = Math.max(0, currentNO3 - leachedToday);
    cumulativeLeached += leachedToday;

    // Groundwater nitrate concentration calculation (mg/L NO3-)
    // 1 kg N / ha leached = 4.43 kg NO3- into ~2000 m3 drainage water layer = 2.2 mg/L NO3-
    const instantaneousGwNitratePpm = parseFloat((cumulativeLeached * 2.2).toFixed(1));
    if (instantaneousGwNitratePpm > maxGroundwaterNitrate) {
      maxGroundwaterNitrate = instantaneousGwNitratePpm;
    }

    let eutrophicationRisk: 'SAFE' | 'MODERATE' | 'HAZARDOUS' = 'SAFE';
    if (instantaneousGwNitratePpm > 50) {
      eutrophicationRisk = 'HAZARDOUS';
    } else if (instantaneousGwNitratePpm > 25) {
      eutrophicationRisk = 'MODERATE';
    }

    trajectory.push({
      day,
      soilAmmoniumKgPerHa: parseFloat(currentNH4.toFixed(2)),
      soilNitrateKgPerHa: parseFloat(currentNO3.toFixed(2)),
      plantCumulativeUptakeKgNPerHa: parseFloat(cumulativePlantUptake.toFixed(1)),
      leachedNitrateCumulativeKgNPerHa: parseFloat(cumulativeLeached.toFixed(1)),
      volatilizedAmmoniaCumulativeKgNPerHa: parseFloat(cumulativeVolatilized.toFixed(1)),
      groundwaterNitratePpm: instantaneousGwNitratePpm,
      eutrophicationRiskLevel: eutrophicationRisk
    });
  }

  const nitrogenUseEfficiencyNuePercent = parseFloat(
    Math.min(95, (cumulativePlantUptake / totalNAppliedKgPerHa) * 100).toFixed(1)
  );

  const whoStandardExceeded = maxGroundwaterNitrate > 50.0;

  const summaryConclusionVi = `Mô phỏng 30 ngày bón ${safeRate} kg/ha ${fertilizer.nameVi} trên ${soil.nameVi} (mưa ${safeRain} mm/ngày):
- Tổng lượng đạm nguyên chất: ${totalNAppliedKgPerHa} kg N/ha.
- Cây trồng hấp thu hữu hiệu: ${cumulativePlantUptake.toFixed(1)} kg N (${nitrogenUseEfficiencyNuePercent}% NUE).
- Đạm thất thoát rửa trôi nước ngầm: ${cumulativeLeached.toFixed(1)} kg N (nồng độ NO₃⁻ đạt cực đại ${maxGroundwaterNitrate} mg/L ${whoStandardExceeded ? '⚠️ VƯỢT QUY CHUẨN WHO 50 mg/L' : '✅ Trong ngưỡng an toàn'}).
- Thất thoát khí NH₃ bay hơi: ${cumulativeVolatilized.toFixed(1)} kg N/ha.`;

  const pedagogicalTakeawayVi = `Ý nghĩa hóa học thực tiễn GDPT 2018:
1. Vì sao ion amoni (NH₄⁺) ít bị rửa trôi hơn ion nitrat (NO₃⁻)?
Bề mặt hạt keo sét và mùn trong đất mang điện tích âm, nên hút chặt cation NH₄⁺ theo cơ chế trao đổi ion tĩnh điện (CEC). Ngược lại, anion NO₃⁻ bị điện tích âm của keo đất đẩy ra (anion exclusion) nên hoàn toàn hòa tan tự do và bị dòng nước mưa cuốn trôi vào nước ngầm.
2. Giải pháp phân bón thông minh (CRF):
Phân tan chậm bọc polyme kiểm soát tốc độ giải phóng phù hợp với đường cong hấp thụ sinh trưởng của cây trồng, nâng cao hiệu suất sử dụng phân bón từ 35-40% lên >75-80% và ngăn ngừa hiện tượng phú dưỡng nguồn nước.`;

  return {
    fertilizer,
    soil,
    applicationRateKgPerHa: safeRate,
    rainfallMmPerDay: safeRain,
    totalNAppliedKgPerHa,
    nitrogenUseEfficiencyNuePercent,
    finalLeachedNitrateKgPerHa: parseFloat(cumulativeLeached.toFixed(1)),
    finalVolatilizedAmmoniaKgPerHa: parseFloat(cumulativeVolatilized.toFixed(1)),
    maxGroundwaterNitratePpm: maxGroundwaterNitrate,
    whoStandardExceeded,
    dailyTrajectory: trajectory,
    summaryConclusionVi,
    pedagogicalTakeawayVi
  };
}
