// src/domain/biopolymerBiodegradationEngine.ts
// Comprehensive Biopolymers, Biodegradation Kinetics & Green Polymer Chemistry Engine for ELEMENTA
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Lớp 12 - Chương 4: Polymer & Vật liệu Xanh)
// and ISO 14855 / ASTM D6400 / EN 13432 Composting & Biodegradability Standards

// =============================================================================
// 1. DATA STRUCTURES & BIOPOLYMER CATALOG
// =============================================================================

export type PolymerCategory =
  | 'BIO_BASED_BIODEGRADABLE'      // e.g., PLA, PHA/PHB, Chitosan, Starch
  | 'FOSSIL_BASED_NON_BIODEGRADABLE' // e.g., PE, PP, PS, PET

export type DegradationEnvironmentId =
  | 'INDUSTRIAL_COMPOST' // 58°C, 65% RH, thermophilic aerobic microbes
  | 'HOME_COMPOST'       // 28-30°C, 50% RH, mesophilic fungi & bacteria
  | 'NATURAL_SOIL'       // 22°C, natural soil biota, moisture variable
  | 'MARINE_SEAWATER'    // 18°C, 3.5% salinity, marine pelagic microbiota
  | 'LANDFILL_ANAEROBIC' // 35°C, oxygen-deprived, methanogenic

export interface BiopolymerProfile {
  id: string;
  nameVi: string;
  commonName: string;
  chemicalFormula: string;
  repeatUnitNameVi: string;
  monomerSourceVi: string;
  feedstockOrigin: 'RENEWABLE_AGRICULTURAL' | 'BACTERIAL_FERMENTATION' | 'SEAFOOD_WASTE' | 'FOSSIL_PETROCHEMICAL';
  feedstockOriginVi: string;
  linkageType: 'ESTER' | 'GLYCOSIDIC' | 'CARBON_CARBON';
  linkageTypeVi: string;
  initialMwKDa: number; // Initial average molecular weight (kDa)
  tensileStrengthMpa: number;
  elongationAtBreakPercent: number;
  glassTransitionTempCelsius: number; // Tg
  meltingTempCelsius: number; // Tm
  lcaCarbonFootprintKgCo2PerKg: number; // Life Cycle Assessment kg CO2 eq / kg
  microplasticRiskPercent: number; // 0 to 100%
  iso14855CertifiedCompostable: boolean;
  marineBiodegradable: boolean;
  soilBiodegradable: boolean;
  vietnamIndustrialApplicationsVi: string[];
  descriptionVi: string;
  reactionMechanismVi: string;
}

export interface DegradationEnvironment {
  id: DegradationEnvironmentId;
  nameVi: string;
  tempCelsius: number;
  moisturePercent: number;
  microbialActivityLevel: 'VERY_HIGH' | 'HIGH' | 'MODERATE' | 'LOW' | 'MINIMAL';
  aerobic: boolean;
  descriptionVi: string;
  standardNormVi: string;
}

export const DEGRADATION_ENVIRONMENTS: Record<DegradationEnvironmentId, DegradationEnvironment> = {
  INDUSTRIAL_COMPOST: {
    id: 'INDUSTRIAL_COMPOST',
    nameVi: 'Ủ phân hữu cơ công nghiệp (Industrial Compost)',
    tempCelsius: 58,
    moisturePercent: 65,
    microbialActivityLevel: 'VERY_HIGH',
    aerobic: true,
    descriptionVi: 'Điều kiện ủ công nghiệp 58°C, độ ẩm cao và thông khí cưỡng bức. Môi trường tối ưu cho quá trình thủy phân phi sinh học các este nhiệt độ chuyển tinh tinh thể cao (như PLA) trước khi vi sinh vật đồng hóa.',
    standardNormVi: 'ISO 14855 & ASTM D6400 (Yêu cầu phân hủy > 90% sau 180 ngày)'
  },
  HOME_COMPOST: {
    id: 'HOME_COMPOST',
    nameVi: 'Ủ phân hữu cơ tại nhà (Home Compost)',
    tempCelsius: 30,
    moisturePercent: 50,
    microbialActivityLevel: 'MODERATE',
    aerobic: true,
    descriptionVi: 'Hầm ủ rác hữu cơ gia đình ở nhiệt độ phòng (25-35°C). Chỉ các polyme có nhiệt độ nóng chảy thấp hoặc cấu trúc polysaccharide (PHA, Chitosan, Tinh bột) mới phân hủy hiệu quả.',
    standardNormVi: 'NF T 51-800 & TÜV OK Compost Home'
  },
  NATURAL_SOIL: {
    id: 'NATURAL_SOIL',
    nameVi: 'Đất nông nghiệp tự nhiên (Agricultural Soil)',
    tempCelsius: 22,
    moisturePercent: 30,
    microbialActivityLevel: 'MODERATE',
    aerobic: true,
    descriptionVi: 'Màng phủ nông nghiệp (mulch film) hoặc bao bì tự phân hủy trong đất canh tác ở 20-25°C dưới tác động của vi khuẩn và nấm đất (Trichoderma, Streptomyces).',
    standardNormVi: 'EN 17033 (Biodegradable mulch films for agriculture)'
  },
  MARINE_SEAWATER: {
    id: 'MARINE_SEAWATER',
    nameVi: 'Nước biển đại dương (Marine Pelagic Seawater)',
    tempCelsius: 18,
    moisturePercent: 100,
    microbialActivityLevel: 'LOW',
    aerobic: true,
    descriptionVi: 'Môi trường biển mặn (độ mặn 3.5%), nhiệt độ thấp (15-20°C) và mật độ vi sinh thấp. Nhựa truyền thống (PE, PP) trôi nổi hàng thế kỷ tạo hạt vi nhựa; chỉ PHA/PHB phân hủy tự nhiên trong biển.',
    standardNormVi: 'ASTM D6691 & TÜV OK Biodegradable Marine'
  },
  LANDFILL_ANAEROBIC: {
    id: 'LANDFILL_ANAEROBIC',
    nameVi: 'Bãi chôn lấp rác kỵ khí (Anaerobic Landfill)',
    tempCelsius: 35,
    moisturePercent: 40,
    microbialActivityLevel: 'LOW',
    aerobic: false,
    descriptionVi: 'Rác thải bị nén chặt, thiếu oxy. Quá trình phân hủy diễn ra cực kỳ chậm, sinh khí metan (CH4) gây hiệu ứng nhà kính nếu không được thu hồi.',
    standardNormVi: 'ASTM D5511 (Anaerobic biodegradation under high-solids conditions)'
  }
};

export const BIOPOLYMERS_CATALOG: BiopolymerProfile[] = [
  {
    id: 'PLA',
    nameVi: 'Poly(lactic acid) (PLA)',
    commonName: 'Nhựa sinh học PLA từ ngô/sắn',
    chemicalFormula: '[-O-CH(CH₃)-CO-]ₙ',
    repeatUnitNameVi: 'Lactyl (C₃H₄O₂)',
    monomerSourceVi: 'Axit L-lactic từ lên men tinh bột ngô hoặc sắn (khoai mì)',
    feedstockOrigin: 'RENEWABLE_AGRICULTURAL',
    feedstockOriginVi: 'Nông nghiệp tái tạo (Ngô, sắn Việt Nam)',
    linkageType: 'ESTER',
    linkageTypeVi: 'Liên kết este aliphatic (-COO-)',
    initialMwKDa: 140,
    tensileStrengthMpa: 60,
    elongationAtBreakPercent: 5,
    glassTransitionTempCelsius: 58,
    meltingTempCelsius: 165,
    lcaCarbonFootprintKgCo2PerKg: 1.8,
    microplasticRiskPercent: 0,
    iso14855CertifiedCompostable: true,
    marineBiodegradable: false, // Too slow in cold water without Tg thermal cleavage
    soilBiodegradable: false, // Very slow in soil without high temp
    vietnamIndustrialApplicationsVi: [
      'Ly, cốc và ống hút dùng một lần thân thiện môi trường',
      'Chỉ tự tiêu trong phẫu thuật y tế (PLLA/PDLLA)',
      'Dây in 3D (3D Filament) FDM phổ biến nhất thế giới',
      'Hộp đựng thực phẩm sinh học xuất khẩu EU'
    ],
    descriptionVi: 'PLA là loại biopolyester nhiệt dẻo sản xuất từ phản ứng trùng ngưng axit lactic hoặc trùng hợp mở vòng (ROP) lactide. Trong điều kiện ủ công nghiệp 58°C, liên kết este bị thủy phân vô cơ giảm trọng lượng phân tử xuống dưới 10 kDa, sau đó vi khuẩn đồng hóa thành CO2 và H2O.',
    reactionMechanismVi: 'Giai đoạn 1: Thủy phân este phi sinh học (Abiotic Ester Hydrolysis) cắt đứt mạch chính ở 58°C: ~[O-CH(CH₃)-CO]~ + H₂O → ~[O-CH(CH₃)-COOH] + HO-[CH(CH₃)-CO]~. Giai đoạn 2: Enzyme Proteinase K và Esterase vi sinh vật đồng hóa các oligomer ngắn thành CO₂ + H₂O.'
  },
  {
    id: 'PHA_PHB',
    nameVi: 'Polyhydroxybutyrate / Polyhydroxyalkanoates (PHB/PHA)',
    commonName: 'Biopolyester vi sinh tự tích trữ',
    chemicalFormula: '[-O-CH(CH₃)-CH₂-CO-]ₙ',
    repeatUnitNameVi: '3-Hydroxybutyrate (C₄H₆O₂)',
    monomerSourceVi: 'Axit 3-hydroxybutyric sinh tổng hợp nội bào bởi vi khuẩn Cupriavidus necator',
    feedstockOrigin: 'BACTERIAL_FERMENTATION',
    feedstockOriginVi: 'Lên men vi khuẩn từ đường/dầu thực vật phế thải',
    linkageType: 'ESTER',
    linkageTypeVi: 'Liên kết este mạch nhánh (-COO-)',
    initialMwKDa: 320,
    tensileStrengthMpa: 38,
    elongationAtBreakPercent: 7,
    glassTransitionTempCelsius: 4,
    meltingTempCelsius: 175,
    lcaCarbonFootprintKgCo2PerKg: 2.1,
    microplasticRiskPercent: 0,
    iso14855CertifiedCompostable: true,
    marineBiodegradable: true, // Key superpower: degrades even in ocean!
    soilBiodegradable: true,
    vietnamIndustrialApplicationsVi: [
      'Bao bì tự phân hủy trong đại dương, không gây hại sinh vật biển',
      'Vi nang giải phóng chậm thuốc y dược (Drug delivery systems)',
      'Lưới đánh cá sinh học tự hủy nếu bị thất lạc trên biển',
      'Vật liệu cấy ghép mô sụn và giá thể tái tạo tế bào'
    ],
    descriptionVi: 'PHA là họ polyester tự nhiên do nhiều loài vi sinh vật tích lũy làm nguồn dự trữ năng lượng trong tế bào khi dư thừa cacbon nhưng thiếu nitơ/photpho. Điểm đột phá của PHA là khả năng phân hủy sinh học hoàn toàn ngay trong nước biển và đất tự nhiên mà không cần lò ủ nhiệt độ cao.',
    reactionMechanismVi: 'Enzyme ngoại bào PHA Depolymerase tiết ra bởi vi khuẩn biển và đất bám vào bề mặt polyme, phân cắt liên kết este giải phóng monomer hòa tan axit 3-hydroxybutyric, sau đó được chu trình Krebs chuyển hóa trọn vẹn thành CO₂ + H₂O.'
  },
  {
    id: 'CHITOSAN',
    nameVi: 'Chitosan (Deacetylated Chitin)',
    commonName: 'Polysaccharide sinh học từ vỏ tôm cua',
    chemicalFormula: '[-C₆H₁₁NO₄-]ₙ',
    repeatUnitNameVi: 'D-Glucosamine (liên kết β-1,4-glycosidic)',
    monomerSourceVi: 'Khử acetyl chitin từ vỏ phế phẩm thủy hải sản (tôm, cua Cà Mau) bằng NaOH đậm đặc',
    feedstockOrigin: 'SEAFOOD_WASTE',
    feedstockOriginVi: 'Phế phụ phẩm công nghiệp chế biến tôm cá Việt Nam',
    linkageType: 'GLYCOSIDIC',
    linkageTypeVi: 'Liên kết β-(1→4)-glycosidic',
    initialMwKDa: 180,
    tensileStrengthMpa: 45,
    elongationAtBreakPercent: 18,
    glassTransitionTempCelsius: 140,
    meltingTempCelsius: 200, // Decomposes before melting
    lcaCarbonFootprintKgCo2PerKg: 1.2,
    microplasticRiskPercent: 0,
    iso14855CertifiedCompostable: true,
    marineBiodegradable: true,
    soilBiodegradable: true,
    vietnamIndustrialApplicationsVi: [
      'Màng bọc kháng khuẩn bảo quản trái cây (xoài, bưởi, thanh long xuất khẩu)',
      'Băng gạc cầm máu nhanh và liền sẹo vết thương y tế',
      'Xử lý nước thải dệt nhuộm và kết tủa ion kim loại nặng',
      'Kích kháng miễn dịch cây trồng và phân bón hữu cơ sinh học'
    ],
    descriptionVi: 'Chitosan là polymer aminopolysaccharide cation duy nhất trong tự nhiên, thu được khi thủy phân nhóm acetyl (-NHCOCH₃ → -NH₂) của chitin từ vỏ tôm cua. Nhóm -NH₃⁺ tích điện dương phá vỡ màng tế bào vi khuẩn gây hư hỏng thực phẩm, và phân hủy trong đất thành phân bón đạm giàu dinh dưỡng.',
    reactionMechanismVi: 'Enzyme Chitosanase và Chitinase từ nấm đất (như Trichoderma viride) xúc tác thủy phân liên kết β-1,4-glycosidic, cắt mạch thành các phân tử chito-oligosaccharide và glucosamine, cung cấp nguồn đạm và kích hoạt enzyme bảo vệ cho cây trồng.'
  },
  {
    id: 'TPS',
    nameVi: 'Thermoplastic Starch (TPS)',
    commonName: 'Nhựa nhiệt dẻo biến tính từ tinh bột',
    chemicalFormula: '[-C₆H₁₀O₅-]ₙ (với glycerol hóa dẻo)',
    repeatUnitNameVi: 'α-D-Glucose (liên kết α-1,4 và α-1,6-glycosidic)',
    monomerSourceVi: 'Tinh bột sắn, ngô hoặc khoai tây phối trộn chất hóa dẻo glycerol/sorbitol',
    feedstockOrigin: 'RENEWABLE_AGRICULTURAL',
    feedstockOriginVi: 'Nông nghiệp Việt Nam (Sắn củ, ngô)',
    linkageType: 'GLYCOSIDIC',
    linkageTypeVi: 'Liên kết α-glycosidic dễ tiêu hóa',
    initialMwKDa: 250,
    tensileStrengthMpa: 15,
    elongationAtBreakPercent: 45,
    glassTransitionTempCelsius: 25,
    meltingTempCelsius: 130,
    lcaCarbonFootprintKgCo2PerKg: 1.1,
    microplasticRiskPercent: 0,
    iso14855CertifiedCompostable: true,
    marineBiodegradable: true,
    soilBiodegradable: true,
    vietnamIndustrialApplicationsVi: [
      'Xốp chèn hàng đệm lót thay thế xốp EPS (Styrofoam)',
      'Túi màng sinh học tự hủy kết hợp với PBAT/PLA',
      'Chậu ươm cây lâm nghiệp tự tiêu trong đất',
      'Viên nén rải chống xói mòn đất đồi núi'
    ],
    descriptionVi: 'TPS được tạo thành từ tinh bột tự nhiên bị phá vỡ cấu trúc hạt bán kết tinh dưới tác động nhiệt - cơ học trong máy đùn cùng dung môi hóa dẻo (như glycerol). TPS có tốc độ phân hủy cực nhanh trong đất và nước nhưng độ bền cơ học và tính chịu nước thấp hơn PLA/PHA.',
    reactionMechanismVi: 'Enzyme α-amylase và Glucoamylase phổ biến trong tự nhiên nhanh chóng cắt đứt liên kết α-1,4 và α-1,6-glycosidic thành maltose và glucose, được vi sinh vật hấp thụ chỉ trong vòng vài tuần.'
  },
  {
    id: 'PE_SYNTHETIC',
    nameVi: 'Polyethylene (PE - LDPE/HDPE)',
    commonName: 'Nhựa nhiệt dẻo truyền thống từ dầu mỏ',
    chemicalFormula: '[-CH₂-CH₂-]ₙ',
    repeatUnitNameVi: 'Ethylene (C₂H₄)',
    monomerSourceVi: 'Cracking dầu mỏ và khí đồng hành (hóa thạch)',
    feedstockOrigin: 'FOSSIL_PETROCHEMICAL',
    feedstockOriginVi: 'Hóa thạch hữu hạn (Dầu mỏ, khí đốt)',
    linkageType: 'CARBON_CARBON',
    linkageTypeVi: 'Mạch cacbon - cacbon trơ cực kỳ bền vững',
    initialMwKDa: 120,
    tensileStrengthMpa: 28,
    elongationAtBreakPercent: 350,
    glassTransitionTempCelsius: -120,
    meltingTempCelsius: 115,
    lcaCarbonFootprintKgCo2PerKg: 5.0,
    microplasticRiskPercent: 100, // Severe risk of microplastic fragmentation
    iso14855CertifiedCompostable: false,
    marineBiodegradable: false,
    soilBiodegradable: false,
    vietnamIndustrialApplicationsVi: [
      'Túi nilon đi chợ truyền thống (gây ô nhiễm trắng rác thải)',
      'Chai đựng nước ngọt, bình đựng hóa chất gia dụng',
      'Màng co bọc hàng hóa công nghiệp và ống dẫn nước nhựa'
    ],
    descriptionVi: 'PE là polyme tổng hợp phổ biến nhất thế giới với mạch chính toàn liên kết C-C cộng hóa trị không phân cực, không chứa các nhóm chức phân cực hay liên kết este để enzyme vi sinh vật có thể nhận biết và xúc tác thủy phân. Trong môi trường tự nhiên, PE tồn tại 400 - 500 năm và vỡ vụn thành các vi nhựa độc hại.',
    reactionMechanismVi: 'Không có cơ chế phân hủy sinh học tự nhiên. Dưới bức xạ tia cực tím mặt trời (UV) và oxy, PE chỉ trải qua quang oxy hóa chậm (Photo-oxidation) tạo gốc tự do, làm giòn và vỡ vụn thành vi nhựa (microplastics < 5mm) nhiễm độc chuỗi thức ăn sinh học.'
  },
  {
    id: 'PP_SYNTHETIC',
    nameVi: 'Polypropylene (PP)',
    commonName: 'Nhựa nhiệt dẻo cứng từ hóa thạch',
    chemicalFormula: '[-CH₂-CH(CH₃)-]ₙ',
    repeatUnitNameVi: 'Propylene (C₃H₆)',
    monomerSourceVi: 'Hóa dầu từ khí hóa lỏng và naphta dầu mỏ',
    feedstockOrigin: 'FOSSIL_PETROCHEMICAL',
    feedstockOriginVi: 'Hóa thạch hữu hạn',
    linkageType: 'CARBON_CARBON',
    linkageTypeVi: 'Mạch chính C-C có nhóm thế methyl',
    initialMwKDa: 220,
    tensileStrengthMpa: 35,
    elongationAtBreakPercent: 200,
    glassTransitionTempCelsius: 0,
    meltingTempCelsius: 165,
    lcaCarbonFootprintKgCo2PerKg: 4.8,
    microplasticRiskPercent: 95,
    iso14855CertifiedCompostable: false,
    marineBiodegradable: false,
    soilBiodegradable: false,
    vietnamIndustrialApplicationsVi: [
      'Hộp đựng cơm trưa vi sóng, cốc trà sữa dùng một lần',
      'Bao bì dệt xi măng, bao lúa gạo phân bón nông nghiệp',
      'Linh kiện cản xe máy, ô tô và vỏ thiết bị điện tử gia dụng'
    ],
    descriptionVi: 'PP có cấu trúc mạch hydrocarbon no tương tự PE nhưng có nhánh methyl (-CH₃). Mặc dù cacbon bậc 3 trên mạch dễ bị oxy hóa nhiệt hơn một chút so với PE, PP vẫn hoàn toàn không bị phân hủy sinh học bởi các vi sinh vật tự nhiên và tồn tại hàng trăm năm trong môi trường đại dương.',
    reactionMechanismVi: 'Kháng hoàn toàn sự tấn công của enzyme. Quá trình lão hóa quang hóa tạo ra hạt vi sợi nhựa (microfibers) phát tán trong nguồn nước ngầm và không khí hô hấp.'
  }
];

// =============================================================================
// 2. BIODEGRADATION KINETICS MATHEMATICAL SIMULATION
// =============================================================================

export interface BiodegradationStepState {
  week: number;
  remainingMassPercent: number; // 0 to 100%
  co2MineralizationPercent: number; // 0 to 100% (ISO 14855 standard metric)
  averageMwKDa: number; // Current molecular weight
  tensileRetentionPercent: number; // Mechanical strength retention
  visualAppearanceVi: string;
  stageNameVi: string;
  microplasticFragmentCount: number; // For non-biodegradable polymers
}

export interface BiodegradationSimulationResult {
  polymer: BiopolymerProfile;
  environment: DegradationEnvironment;
  durationWeeks: number;
  finalMassPercent: number;
  finalMineralizationPercent: number;
  finalMwKDa: number;
  isFullyDegraded: boolean;
  iso14855Compliant: boolean; // >= 90% mineralization within 26 weeks (180 days)
  halfLifeWeeks: number | null; // t_1/2
  trajectory: BiodegradationStepState[];
  summaryConclusionVi: string;
  pedagogicalTakeawayVi: string;
}

/**
 * Calculates environmental kinetic coefficient (k_eff in week^-1)
 * taking into account temperature, moisture, microbial activity, and polymer structure.
 */
function calculateEffectiveRateConstant(
  polymer: BiopolymerProfile,
  env: DegradationEnvironment
): { k_deg: number; lagWeeks: number; hydrolysisRate: number } {
  // If synthetic C-C backbone (PE, PP)
  if (polymer.linkageType === 'CARBON_CARBON') {
    // Extremely negligible breakdown, ~0.0001 week^-1
    return { k_deg: 0.00015, lagWeeks: 50, hydrolysisRate: 0.00005 };
  }

  // Base rate based on polymer chemical accessibility
  let baseRate = 0.08; // default
  let lagWeeks = 2;
  let hydrolysisRate = 0.05;

  if (polymer.id === 'TPS') {
    baseRate = 0.35; // Starch is rapid
    lagWeeks = 0.5;
    hydrolysisRate = 0.25;
  } else if (polymer.id === 'CHITOSAN') {
    baseRate = 0.22;
    lagWeeks = 1.0;
    hydrolysisRate = 0.15;
  } else if (polymer.id === 'PHA_PHB') {
    baseRate = 0.14;
    lagWeeks = 1.5;
    hydrolysisRate = 0.09;
  } else if (polymer.id === 'PLA') {
    baseRate = 0.09;
    lagWeeks = 3.0;
    hydrolysisRate = 0.07;
  }

  // Environmental modifiers:
  // Temperature Arrhenius factor
  let tempFactor = 1.0;
  if (env.id === 'INDUSTRIAL_COMPOST') {
    // 58°C triggers fast PLA ester hydrolysis because it surpasses Tg ~ 55-60°C!
    if (polymer.id === 'PLA') {
      tempFactor = 4.2;
      lagWeeks = 1.5;
    } else {
      tempFactor = 2.5;
    }
  } else if (env.id === 'HOME_COMPOST') {
    if (polymer.id === 'PLA') {
      // PLA does not hydrolyze well at 30°C!
      tempFactor = 0.15;
      lagWeeks = 12;
    } else {
      tempFactor = 1.1;
    }
  } else if (env.id === 'NATURAL_SOIL') {
    if (polymer.id === 'PLA') {
      tempFactor = 0.08;
      lagWeeks = 24;
    } else if (polymer.id === 'CHITOSAN' || polymer.id === 'TPS') {
      tempFactor = 1.3; // Soil enzymes flourish
    } else {
      tempFactor = 0.85;
    }
  } else if (env.id === 'MARINE_SEAWATER') {
    if (polymer.id === 'PLA') {
      tempFactor = 0.03; // Almost stagnant in ocean
      lagWeeks = 40;
    } else if (polymer.id === 'PHA_PHB') {
      tempFactor = 0.95; // Marine bacteria easily digest PHA
      lagWeeks = 2.0;
    } else {
      tempFactor = 0.5;
    }
  } else if (env.id === 'LANDFILL_ANAEROBIC') {
    tempFactor = 0.25;
    lagWeeks = 8;
  }

  const k_deg = baseRate * tempFactor * (env.moisturePercent / 60);
  return { k_deg, lagWeeks, hydrolysisRate: hydrolysisRate * tempFactor };
}

/**
 * Simulates biodegradation across a time span (in weeks, typically 0 to 52 weeks).
 */
export function simulateBiodegradation(
  polymerId: string,
  environmentId: DegradationEnvironmentId,
  durationWeeks: number = 26 // Standard 6-month evaluation
): BiodegradationSimulationResult {
  const polymer = BIOPOLYMERS_CATALOG.find(p => p.id === polymerId) || BIOPOLYMERS_CATALOG[0];
  const environment = DEGRADATION_ENVIRONMENTS[environmentId] || DEGRADATION_ENVIRONMENTS.INDUSTRIAL_COMPOST;
  const safeDuration = Math.max(4, Math.min(104, durationWeeks));

  const { k_deg, lagWeeks, hydrolysisRate } = calculateEffectiveRateConstant(polymer, environment);

  const trajectory: BiodegradationStepState[] = [];
  const initialMass = 100;
  const initialMw = polymer.initialMwKDa;

  let halfLifeWeeks: number | null = null;

  for (let w = 0; w <= safeDuration; w += 2) {
    let massPercent = 100;
    let co2Percent = 0;
    let currentMw = initialMw;
    let tensilePercent = 100;
    let visualAppearanceVi = 'Nguyên vẹn, bề mặt nhẵn bóng ban đầu.';
    let stageNameVi = 'Ban đầu (Initial Sample)';
    let microplasticFragmentCount = 0;

    if (polymer.linkageType === 'CARBON_CARBON') {
      // Synthetic plastic degradation
      massPercent = Math.max(98.5, 100 - (w * 0.02));
      co2Percent = Math.min(1.5, w * 0.015);
      currentMw = Math.max(initialMw * 0.92, initialMw - (w * 0.2));
      tensilePercent = Math.max(85, 100 - (w * 0.15));

      if (environment.id === 'MARINE_SEAWATER' || environment.id === 'NATURAL_SOIL') {
        microplasticFragmentCount = Math.round(w * 3.5);
      }

      if (w > 30) {
        visualAppearanceVi = 'Bề mặt ố vàng do quang oxy hóa, nứt chân chim nhưng khối lượng không suy giảm. Nguy cơ vỡ thành hạt vi nhựa.';
        stageNameVi = 'Lão hóa vật lý & vi nhựa hóa';
      } else {
        visualAppearanceVi = 'Vật liệu trơ hoàn toàn, chống thấm nước, không có dấu hiệu bị vi sinh vật phân giải.';
        stageNameVi = 'Trơ sinh học';
      }
    } else {
      // Biopolymer degradation
      // Molecular weight drops before macroscopic mass loss due to random chain scission!
      currentMw = initialMw / (1 + hydrolysisRate * w * 1.8);

      if (w < lagWeeks) {
        // Lag phase: surface wetting, biofilm attachment
        massPercent = 100 - (w / Math.max(1, lagWeeks)) * 2;
        co2Percent = (100 - massPercent) * 0.6;
        visualAppearanceVi = 'Bề mặt mất độ bóng, màng sinh học vi khuẩn (biofilm) bắt đầu bám dính.';
        stageNameVi = 'Xâm nhiễm màng sinh học (Biofilm Colonization)';
      } else {
        // Logarithmic decay of mass
        const activeTime = w - lagWeeks;
        massPercent = Math.max(0, 98 * Math.exp(-k_deg * activeTime));
        co2Percent = Math.min(100, (100 - massPercent) * 0.95);

        // Tensile strength collapses once Mw drops below critical entanglement weight
        const mwRetention = currentMw / initialMw;
        tensilePercent = Math.max(0, Math.min(100, Math.pow(mwRetention, 2.2) * 100));

        if (massPercent > 70) {
          visualAppearanceVi = 'Xuất hiện nhiều lỗ xốp rỗ (pitting), nứt vỡ giòn do đứt gãy liên kết este mạch chính.';
          stageNameVi = 'Thủy phân cắt mạch (Chain Scission)';
        } else if (massPercent > 30) {
          visualAppearanceVi = 'Vỡ thành các mảnh vụn nhỏ hữu cơ, sợi xơ bị vi nấm và vi khuẩn gặm nhấm xói mòn mạnh.';
          stageNameVi = 'Vụn hóa sinh học (Fragmentation)';
        } else if (massPercent > 5) {
          visualAppearanceVi = 'Chỉ còn vết cặn mùn hữu cơ màu nâu đen hòa lẫn vào chất nền mùn đất.';
          stageNameVi = 'Đồng hóa vi sinh (Microbial Assimilation)';
        } else {
          visualAppearanceVi = 'Biến mất hoàn toàn, chuyển hóa trọn vẹn thành CO₂, H₂O và sinh khối vi sinh.';
          stageNameVi = 'Khoáng hóa hoàn toàn (Full Mineralization)';
        }
      }

      if (halfLifeWeeks === null && massPercent <= 50) {
        halfLifeWeeks = w;
      }
    }

    trajectory.push({
      week: w,
      remainingMassPercent: parseFloat(massPercent.toFixed(1)),
      co2MineralizationPercent: parseFloat(co2Percent.toFixed(1)),
      averageMwKDa: parseFloat(currentMw.toFixed(1)),
      tensileRetentionPercent: parseFloat(tensilePercent.toFixed(1)),
      visualAppearanceVi,
      stageNameVi,
      microplasticFragmentCount
    });
  }

  const finalStep = trajectory[trajectory.length - 1];
  const isFullyDegraded = finalStep.remainingMassPercent <= 5.0;
  // ISO 14855 standard: >= 90% mineralization within 26 weeks under industrial compost
  const iso14855Compliant = (polymer.linkageType !== 'CARBON_CARBON') &&
    (environment.id === 'INDUSTRIAL_COMPOST' ? finalStep.co2MineralizationPercent >= 90 : false);

  // Explanatory conclusion
  let summaryConclusionVi = '';
  if (polymer.linkageType === 'CARBON_CARBON') {
    summaryConclusionVi = `${polymer.nameVi} trong ${environment.nameVi}: Sau ${safeDuration} tuần, khối lượng còn lại ${finalStep.remainingMassPercent}%. Polyme trơ hoàn toàn với enzyme, không thể phân hủy sinh học, tích lũy ${finalStep.microplasticFragmentCount} mảnh vi nhựa.`;
  } else if (isFullyDegraded) {
    summaryConclusionVi = `${polymer.nameVi} trong ${environment.nameVi}: Phân hủy sinh học hoàn tất sau ${halfLifeWeeks ? halfLifeWeeks * 2 : safeDuration} tuần (độ khoáng hóa CO₂ đạt ${finalStep.co2MineralizationPercent}%). Không để lại vi nhựa hay độc chất tồn dư.`;
  } else {
    summaryConclusionVi = `${polymer.nameVi} trong ${environment.nameVi}: Sau ${safeDuration} tuần, khối lượng còn ${finalStep.remainingMassPercent}% (khoáng hóa CO₂ đạt ${finalStep.co2MineralizationPercent}%). Tốc độ chậm do điều kiện môi trường chưa đạt nhiệt độ thủy phân tối ưu.`;
  }

  const pedagogicalTakeawayVi = `Ý nghĩa hóa học GDPT 2018: Sự khác biệt bản chất giữa nhựa sinh học (${polymer.linkageTypeVi}) và nhựa hóa thạch (mạch C-C trơ) nằm ở khả năng tiếp cận xúc tác của enzyme/nước. Nhựa este/glycoside bị thủy phân cắt mạch thành oligomer tan trong nước để vi khuẩn hấp thụ; trong khi mạch C-C không phân cực đòi hỏi năng lượng phân cắt liên kết rất lớn (~348 kJ/mol) nên tồn tại hàng trăm năm.`;

  return {
    polymer,
    environment,
    durationWeeks: safeDuration,
    finalMassPercent: finalStep.remainingMassPercent,
    finalMineralizationPercent: finalStep.co2MineralizationPercent,
    finalMwKDa: finalStep.averageMwKDa,
    isFullyDegraded,
    iso14855Compliant,
    halfLifeWeeks,
    trajectory,
    summaryConclusionVi,
    pedagogicalTakeawayVi
  };
}

// =============================================================================
// 3. ENZYMATIC CLEAVAGE REACTION MECHANISM & CATALYTIC TRIAD
// =============================================================================

export interface CatalyticTriadStep {
  stepIndex: number;
  stepNameVi: string;
  activeResiduesVi: string;
  reactionDescriptionVi: string;
  chemicalEquationVi: string;
  energyBarrierKjMol: number;
}

export const ESTERASE_CATALYTIC_MECHANISM_STEPS: CatalyticTriadStep[] = [
  {
    stepIndex: 1,
    stepNameVi: 'Tấn công ái nhân của Serine (Nucleophilic Attack)',
    activeResiduesVi: 'Bộ ba xúc tác: Ser105 - His224 - Asp187',
    reactionDescriptionVi: 'Nhóm imidazole của Histidine nhận proton từ nhóm -OH của Serine (được hỗ trợ bởi ion carboxylate của Aspartate), kích hoạt nguyên tử oxy của Serine trở thành tác nhân ái nhân cực mạnh tấn công vào cacbon mang điện tích dương dương điện của nhóm cacbonyl este trên mạch PLA/PHA.',
    chemicalEquationVi: 'Enz-Ser-O⁻ + R₁-CO-O-R₂ → [R₁-C(O⁻)(O-Enz)(O-R₂)]‡ (Chuyển tiếp tứ diện I)',
    energyBarrierKjMol: 42
  },
  {
    stepIndex: 2,
    stepNameVi: 'Hình thành phức este-acyl trung gian (Acyl-Enzyme Intermediate)',
    activeResiduesVi: 'His224 cho proton vào nhóm rời đi',
    reactionDescriptionVi: 'Trạng thái chuyển tiếp tứ diện sụp đổ, giải phóng chuỗi polyme mang nhóm hydroxyl tự do (HO-R₂). Phân tử polyme còn lại gắn chặt vào enzyme qua liên kết cộng hóa trị este acyl hóa tạm thời.',
    chemicalEquationVi: '[R₁-C(O⁻)(O-Enz)(O-R₂)]‡ + H⁺ → R₁-CO-O-Enz + HO-R₂ ↑',
    energyBarrierKjMol: 28
  },
  {
    stepIndex: 3,
    stepNameVi: 'Thủy phân giải phóng axit và hoàn nguyên enzyme (Deacylation & Regeneration)',
    activeResiduesVi: 'Phân tử H₂O kích hoạt bởi His224',
    reactionDescriptionVi: 'Một phân tử nước tiếp cận vị trí hoạt động, bị Histidine lấy proton để tấn công vào liên kết acyl-enzyme, hình thành trạng thái chuyển tiếp tứ diện II. Liên kết giữa enzyme và cơ chất đứt ra, giải phóng đoạn mạch có đầu tận cùng là axit cacboxylic (R₁-COOH) và phục hồi enzyme nguyên vẹn cho chu kỳ tiếp theo.',
    chemicalEquationVi: 'R₁-CO-O-Enz + H₂O → Enz-Ser-OH + R₁-COOH',
    energyBarrierKjMol: 35
  }
];

// =============================================================================
// 4. CIRCULAR ECONOMY & COMPARATIVE RADAR METRICS
// =============================================================================

export interface BiopolymerRadarMetrics {
  polymerId: string;
  polymerNameVi: string;
  carbonFootprintScore: number; // 0 to 100 (100 = lowest footprint, best for climate)
  mechanicalStrengthScore: number; // 0 to 100
  biodegradabilitySpeedScore: number; // 0 to 100 (100 = fastest, naturally in ocean/soil)
  renewabilityFeedstockScore: number; // 0 to 100 (100 = 100% bio-waste or crops)
  processabilityScore: number; // 0 to 100 (ease of injection/blow molding)
}

export function getBiopolymerRadarMetrics(polymerId: string): BiopolymerRadarMetrics {
  const polymer = BIOPOLYMERS_CATALOG.find(p => p.id === polymerId) || BIOPOLYMERS_CATALOG[0];

  switch (polymer.id) {
    case 'PLA':
      return {
        polymerId: 'PLA',
        polymerNameVi: 'Poly(lactic acid) (PLA)',
        carbonFootprintScore: 78,
        mechanicalStrengthScore: 85,
        biodegradabilitySpeedScore: 65, // Needs industrial compost
        renewabilityFeedstockScore: 92,
        processabilityScore: 90
      };
    case 'PHA_PHB':
      return {
        polymerId: 'PHA_PHB',
        polymerNameVi: 'Polyhydroxyalkanoates (PHA/PHB)',
        carbonFootprintScore: 72,
        mechanicalStrengthScore: 70,
        biodegradabilitySpeedScore: 95, // Outstanding marine & soil breakdown
        renewabilityFeedstockScore: 95,
        processabilityScore: 68
      };
    case 'CHITOSAN':
      return {
        polymerId: 'CHITOSAN',
        polymerNameVi: 'Chitosan (Vỏ tôm cua)',
        carbonFootprintScore: 90,
        mechanicalStrengthScore: 75,
        biodegradabilitySpeedScore: 90,
        renewabilityFeedstockScore: 100, // 100% Seafood byproduct valorization
        processabilityScore: 55 // Needs casting/acid solution
      };
    case 'TPS':
      return {
        polymerId: 'TPS',
        polymerNameVi: 'Thermoplastic Starch (TPS)',
        carbonFootprintScore: 92,
        mechanicalStrengthScore: 40,
        biodegradabilitySpeedScore: 98, // Extremely rapid soil decay
        renewabilityFeedstockScore: 95,
        processabilityScore: 75
      };
    case 'PE_SYNTHETIC':
      return {
        polymerId: 'PE_SYNTHETIC',
        polymerNameVi: 'Polyethylene (PE Hóa thạch)',
        carbonFootprintScore: 20,
        mechanicalStrengthScore: 65,
        biodegradabilitySpeedScore: 2, // Non-biodegradable
        renewabilityFeedstockScore: 0,
        processabilityScore: 95
      };
    case 'PP_SYNTHETIC':
    default:
      return {
        polymerId: 'PP_SYNTHETIC',
        polymerNameVi: 'Polypropylene (PP Hóa thạch)',
        carbonFootprintScore: 24,
        mechanicalStrengthScore: 75,
        biodegradabilitySpeedScore: 2,
        renewabilityFeedstockScore: 0,
        processabilityScore: 92
      };
  }
}
