// src/domain/alkaliHardWaterEngine.ts
// Comprehensive Alkali Metals (Group IA), Alkaline Earth Metals (Group IIA) & Hard Water Softening Engine
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 7: Nguyên tố nhóm IA và nhóm IIA) & IUPAC Standards

export type AlkaliGroupType = 'GROUP_IA_ALKALI' | 'GROUP_IIA_ALKALINE_EARTH';
export type HardWaterType = 'NUOC_MEM' | 'NUOC_CUNG_TAM_THOI' | 'NUOC_CUNG_VINH_CUU' | 'NUOC_CUNG_TOAN_PHAN';
export type SofteningMethodType = 'BOILING_NUNG_NONG' | 'LIME_CAOH2' | 'SODA_NA2CO3' | 'PHOSPHATE_NA3PO4' | 'ION_EXCHANGE_RESIN';

export interface AlkaliMetalDef {
  symbol: string;
  nameVI: string;
  group: AlkaliGroupType;
  atomicNumber: number;
  valenceElectronConfig: string;
  standardPotentialE0Volts: number;
  densityGcm3: number;
  meltingPointC: number;
  waterReactivityScore: number; // 0 to 100 (Be = 0, Cs = 100)
  waterReactionEquationVI: string;
  flameTestColorVI: string;
  flameHexColor: string;
  emissionWavelengthNm: number;
  curriculumContextVI: string;
}

export interface WaterSampleIons {
  ca2PlusMmolPerL: number;
  mg2PlusMmolPerL: number;
  hco3MinusMmolPerL: number;
  clMinusMmolPerL: number;
  so42MinusMmolPerL: number;
}

export interface HardWaterAnalysisResult {
  totalHardnessCaco3MgPerL: number;
  waterCategoryVI: 'NƯỚC MỀM' | 'NƯỚC CỨNG VỪA' | 'NƯỚC CỨNG' | 'NƯỚC RẤT CỨNG';
  hardnessType: HardWaterType;
  temporaryHardnessMgPerL: number;
  permanentHardnessMgPerL: number;
  soapPrecipitationWastePercent: number; // % soap wasted as scum (RCOO)2Ca
  boilerScaleRiskScore: number; // 0 to 100
  pedagogicalAnalysisVI: string;
}

export interface SofteningSimulationResult {
  initialHardnessMgPerL: number;
  softeningMethod: SofteningMethodType;
  residualHardnessMgPerL: number;
  softeningEfficiencyPercent: number;
  precipitateFormedGramsPer1000L: number;
  precipitateFormula: string;
  chemicalEquationVI: string;
  visualPhenomenonVI: string;
  pedagogicalEvaluationVI: string;
  curriculumWarningVI: string;
}

// ----------------------------------------------------------------------------
// 1. GROUP IA & IIA METALS CATALOG
// ----------------------------------------------------------------------------
export const GROUP_IA_IIA_METALS: AlkaliMetalDef[] = [
  {
    symbol: 'Li',
    nameVI: 'Liti',
    group: 'GROUP_IA_ALKALI',
    atomicNumber: 3,
    valenceElectronConfig: '2s¹',
    standardPotentialE0Volts: -3.04,
    densityGcm3: 0.534, // Lightest solid metal
    meltingPointC: 180.5,
    waterReactivityScore: 50,
    waterReactionEquationVI: '2 Li + 2 H₂O → 2 LiOH + H₂↑ (Phản ứng êm dịu, không bốc cháy)',
    flameTestColorVI: 'Đỏ tươi (Carmine Red)',
    flameHexColor: '#e11d48',
    emissionWavelengthNm: 670.8,
    curriculumContextVI: 'Kim loại có khối lượng riêng nhỏ nhất; dùng sản xuất pin Li-ion trong smartphone và xe điện.'
  },
  {
    symbol: 'Na',
    nameVI: 'Natri',
    group: 'GROUP_IA_ALKALI',
    atomicNumber: 11,
    valenceElectronConfig: '3s¹',
    standardPotentialE0Volts: -2.71,
    densityGcm3: 0.968, // Lighter than water
    meltingPointC: 97.8,
    waterReactivityScore: 80,
    waterReactionEquationVI: '2 Na + 2 H₂O → 2 NaOH + H₂↑ (Nóng chảy vo tròn chạy trên mặt nước, bốc cháy ngọn lửa vàng)',
    flameTestColorVI: 'Vàng tươi rực rỡ (Golden Yellow)',
    flameHexColor: '#fbbf24',
    emissionWavelengthNm: 589.3,
    curriculumContextVI: 'Bảo quản bằng cách ngâm chìm trong dầu hỏa để ngăn tác dụng với oxi và hơi nước trong không khí.'
  },
  {
    symbol: 'K',
    nameVI: 'Kali',
    group: 'GROUP_IA_ALKALI',
    atomicNumber: 19,
    valenceElectronConfig: '4s¹',
    standardPotentialE0Volts: -2.93,
    densityGcm3: 0.862,
    meltingPointC: 63.5,
    waterReactivityScore: 95,
    waterReactionEquationVI: '2 K + 2 H₂O → 2 KOH + H₂↑ (Bốc cháy tức thì, ngọn lửa tím kèm tiếng nổ lách tách)',
    flameTestColorVI: 'Tím nhạt (Lilac Violet qua kính coban)',
    flameHexColor: '#c084fc',
    emissionWavelengthNm: 766.5,
    curriculumContextVI: 'Cần thiết cho tế bào thần kinh và cơ tim; ion K⁺ kích thích màu ngọn lửa tím nhạt đặc trưng.'
  },
  {
    symbol: 'Be',
    nameVI: 'Beri',
    group: 'GROUP_IIA_ALKALINE_EARTH',
    atomicNumber: 4,
    valenceElectronConfig: '2s²',
    standardPotentialE0Volts: -1.85,
    densityGcm3: 1.85,
    meltingPointC: 1287.0,
    waterReactivityScore: 0, // Inactive with water at any temperature!
    waterReactionEquationVI: 'Be + H₂O ↛ Không phản ứng ở bất kỳ nhiệt độ nào do màng oxit bền',
    flameTestColorVI: 'Không nhuộm màu ngọn lửa',
    flameHexColor: '#94a3b8',
    emissionWavelengthNm: 0,
    curriculumContextVI: 'Kim loại kiềm thổ duy nhất KHÔNG tác dụng với nước ở bất kỳ nhiệt độ nào do năng lượng ion hóa cao và màng oxit bảo vệ.'
  },
  {
    symbol: 'Mg',
    nameVI: 'Magie',
    group: 'GROUP_IIA_ALKALINE_EARTH',
    atomicNumber: 12,
    valenceElectronConfig: '3s²',
    standardPotentialE0Volts: -2.37,
    densityGcm3: 1.738,
    meltingPointC: 650.0,
    waterReactivityScore: 25,
    waterReactionEquationVI: 'Mg + 2 H₂O (sôi) → Mg(OH)₂ + H₂↑ (Chỉ phản ứng chậm với nước nóng/hơi nước)',
    flameTestColorVI: 'Cháy sáng chói lóa phát tia UV (Trắng bạc)',
    flameHexColor: '#ffffff',
    emissionWavelengthNm: 285.2,
    curriculumContextVI: 'Cháy sáng chói trong không khí; đặc biệt Mg cháy được cả trong khí CO₂ nên không dùng bình chữa cháy CO₂ dập đám cháy kim loại Mg!'
  },
  {
    symbol: 'Ca',
    nameVI: 'Canxi',
    group: 'GROUP_IIA_ALKALINE_EARTH',
    atomicNumber: 20,
    valenceElectronConfig: '4s²',
    standardPotentialE0Volts: -2.87,
    densityGcm3: 1.55,
    meltingPointC: 842.0,
    waterReactivityScore: 70,
    waterReactionEquationVI: 'Ca + 2 H₂O → Ca(OH)₂ + H₂↑ (Phản ứng nhanh ở nhiệt độ thường, dung dịch vẩn đục)',
    flameTestColorVI: 'Đỏ da cam (Brick Red)',
    flameHexColor: '#f97316',
    emissionWavelengthNm: 622.0,
    curriculumContextVI: 'Thành phần chính của xương, vỏ sò, thạch cao và đá vôi; ion Ca²⁺ là nguyên nhân chính gây nước cứng.'
  },
  {
    symbol: 'Ba',
    nameVI: 'Bari',
    group: 'GROUP_IIA_ALKALINE_EARTH',
    atomicNumber: 56,
    valenceElectronConfig: '6s²',
    standardPotentialE0Volts: -2.90,
    densityGcm3: 3.51,
    meltingPointC: 727.0,
    waterReactivityScore: 85,
    waterReactionEquationVI: 'Ba + 2 H₂O → Ba(OH)₂ + H₂↑ (Phản ứng mãnh liệt tạo dung dịch kiềm trong suốt)',
    flameTestColorVI: 'Xanh lục táo (Apple Green)',
    flameHexColor: '#22c55e',
    emissionWavelengthNm: 524.2,
    curriculumContextVI: 'Hợp chất BaSO₄ cản quang dùng chụp X-quang đường tiêu hóa vì độ tan cực nhỏ không gây độc.'
  }
];

// ----------------------------------------------------------------------------
// 2. HARD WATER CLASSIFICATION & EVALUATION
// ----------------------------------------------------------------------------
export function analyzeWaterHardness(sample: WaterSampleIons): HardWaterAnalysisResult {
  const { ca2PlusMmolPerL, mg2PlusMmolPerL, hco3MinusMmolPerL, clMinusMmolPerL, so42MinusMmolPerL } = sample;

  // Total hardness in mmol/L of (Ca2+ + Mg2+)
  const totalDivalentMmol = ca2PlusMmolPerL + mg2PlusMmolPerL;
  // Convert to mg/L of equivalent CaCO3 (M = 100.0869 g/mol)
  const totalCaco3MgPerL = Math.round(totalDivalentMmol * 100.0869 * 10) / 10;

  // Temporary hardness is limited by HCO3- (1 mmol Ca2+ pairs with 2 mmol HCO3-)
  const maxTempHardnessMmol = Math.min(totalDivalentMmol, hco3MinusMmolPerL / 2);
  const tempCaco3MgPerL = Math.round(maxTempHardnessMmol * 100.0869 * 10) / 10;
  const permCaco3MgPerL = Math.round(Math.max(0, totalCaco3MgPerL - tempCaco3MgPerL) * 10) / 10;

  let categoryVI: 'NƯỚC MỀM' | 'NƯỚC CỨNG VỪA' | 'NƯỚC CỨNG' | 'NƯỚC RẤT CỨNG';
  if (totalCaco3MgPerL < 60) categoryVI = 'NƯỚC MỀM';
  else if (totalCaco3MgPerL <= 120) categoryVI = 'NƯỚC CỨNG VỪA';
  else if (totalCaco3MgPerL <= 180) categoryVI = 'NƯỚC CỨNG';
  else categoryVI = 'NƯỚC RẤT CỨNG';

  let hType: HardWaterType;
  if (totalCaco3MgPerL < 60) {
    hType = 'NUOC_MEM';
  } else if (tempCaco3MgPerL > 0 && permCaco3MgPerL === 0) {
    hType = 'NUOC_CUNG_TAM_THOI';
  } else if (tempCaco3MgPerL === 0 && permCaco3MgPerL > 0) {
    hType = 'NUOC_CUNG_VINH_CUU';
  } else {
    hType = 'NUOC_CUNG_TOAN_PHAN';
  }

  // Soap waste estimation: 100 mg/L CaCO3 wastes ~ 15% soap as scum
  const soapWaste = Math.min(75, Math.round((totalCaco3MgPerL / 100) * 15 * 10) / 10);
  const boilerRisk = Math.min(100, Math.round((totalCaco3MgPerL / 250) * 100));

  let pedagogicalVI: string;
  if (hType === 'NUOC_MEM') {
    pedagogicalVI = 'Nước mềm đạt chuẩn sinh hoạt và công nghiệp; không gây đóng cặn nồi hơi và giặt bọt xà phòng xốp mềm.';
  } else if (hType === 'NUOC_CUNG_TAM_THOI') {
    pedagogicalVI = 'Nước có tính cứng tạm thời do chứa các muối hiđrocacbonat Ca(HCO₃)₂ và Mg(HCO₃)₂. Có thể làm mềm đơn giản bằng cách đun sôi hoặc dùng nước vôi trong Ca(OH)₂ vừa đủ.';
  } else if (hType === 'NUOC_CUNG_VINH_CUU') {
    pedagogicalVI = 'Nước có tính cứng vĩnh cửu do chứa các ion Cl⁻ và SO₄²⁻ của Ca²⁺ và Mg²⁺. ĐUN SÔI KHÔNG THỂ LÀM MỀM! Phải dùng hóa chất tạo kết tủa (Na₂CO₃, Na₃PO₄) hoặc nhựa trao đổi ion.';
  } else {
    pedagogicalVI = 'Nước có tính cứng toàn phần chứa cả anion HCO₃⁻ lẫn các anion Cl⁻, SO₄²⁻. Đây là loại nước ngầm tự nhiên phổ biến nhất ở vùng địa hình đá vôi karst.';
  }

  return {
    totalHardnessCaco3MgPerL: totalCaco3MgPerL,
    waterCategoryVI: categoryVI,
    hardnessType: hType,
    temporaryHardnessMgPerL: tempCaco3MgPerL,
    permanentHardnessMgPerL: permCaco3MgPerL,
    soapPrecipitationWastePercent: soapWaste,
    boilerScaleRiskScore: boilerRisk,
    pedagogicalAnalysisVI: pedagogicalVI
  };
}

// ----------------------------------------------------------------------------
// 3. WATER SOFTENING METHODS SIMULATION
// ----------------------------------------------------------------------------
export function simulateWaterSoftening(params: {
  sample: WaterSampleIons;
  method: SofteningMethodType;
}): SofteningSimulationResult {
  const analysis = analyzeWaterHardness(params.sample);
  const initialH = analysis.totalHardnessCaco3MgPerL;
  const tempH = analysis.temporaryHardnessMgPerL;
  const permH = analysis.permanentHardnessMgPerL;

  let residualH: number;
  let eqVI: string;
  let visualVI: string;
  let rationaleVI: string;
  let warningVI: string = '';
  let pptFormula: string = 'CaCO3';

  switch (params.method) {
    case 'BOILING_NUNG_NONG': {
      // Boiling only decomposes temporary hardness:
      // Ca(HCO3)2 -> CaCO3 v + CO2 ^ + H2O
      // Mg(HCO3)2 -> MgCO3 v (hoac Mg(OH)2 v) + CO2 ^ + H2O
      residualH = permH; // Permanent hardness remains!
      eqVI = 'Ca(HCO₃)₂ (đun nóng) → CaCO₃↓ + CO₂↑ + H₂O';
      visualVI = 'Xuất hiện cặn vôi màu trắng đục lắng xuống đáy nồi, có bọt khí CO₂ thoát ra sủi tăm.';
      rationaleVI = 'Nhiệt phân hủy ion HCO₃⁻ không bền nhiệt thành ion CO₃²⁻, kết tủa hoàn toàn ion Ca²⁺ và Mg²⁺ của tính cứng tạm thời.';
      if (permH > 0) {
        warningVI = `BẪY THI ĐẠI HỌC SGK GDPT 2018: Đun sôi CHỈ LÀM MỀM ĐƯỢC tính cứng tạm thời, KHÔNG THỂ LÀM MỀM tính cứng vĩnh cửu (còn lại ${permH} mg/L CaCO₃ do ion Cl⁻ và SO₄²⁻ không bị nhiệt phân)!`;
      } else {
        warningVI = 'Nước chỉ có tính cứng tạm thời nên đun sôi đã loại bỏ triệt để 100% độ cứng!';
      }
      break;
    }

    case 'LIME_CAOH2': {
      // Lime softening: Ca(HCO3)2 + Ca(OH)2 -> 2 CaCO3 v + 2 H2O
      // Only for temporary hardness, requires EXACT stoichiometric amount
      residualH = permH;
      eqVI = 'Ca(HCO₃)₂ + Ca(OH)₂ (vừa đủ) → 2 CaCO₃↓ + 2 H₂O';
      visualVI = 'Dung dịch xuất hiện kết tủa trắng mịn của canxi cacbonat CaCO₃.';
      rationaleVI = 'Ion OH⁻ trung hòa ion lưỡng tính HCO₃⁻ tạo ion CO₃²⁻: HCO₃⁻ + OH⁻ → CO₃²⁻ + H₂O, sau đó Ca²⁺ + CO₃²⁻ → CaCO₃↓.';
      warningVI = 'LƯU Ý KỸ THUẬT: Chỉ được dùng lượng Ca(OH)₂ VỪA ĐỦ. Nếu cho dư nước vôi trong Ca(OH)₂, chính ion Ca²⁺ dư thừa sẽ làm nước cứng trở lại!';
      break;
    }

    case 'SODA_NA2CO3': {
      // Soda ash Na2CO3: UNIVERSAL SOFTENER
      // Precipitates BOTH temporary and permanent hardness!
      residualH = Math.round(initialH * 0.05 * 10) / 10; // ~95% removed
      eqVI = 'Ca²⁺ + CO₃²⁻ → CaCO₃↓ ; Mg²⁺ + CO₃²⁻ → MgCO₃↓';
      visualVI = 'Kết tủa trắng CaCO₃ và MgCO₃ xuất hiện dày đặc lắng xuống đáy, nước lọc sau kết tủa trong suốt và mềm hoàn toàn.';
      rationaleVI = 'Na₂CO₃ cung cấp nồng độ cao ion CO₃²⁻, kết tủa triệt để tất cả ion Ca²⁺ và Mg²⁺ không phân biệt tính cứng tạm thời hay vĩnh cửu!';
      warningVI = 'Na₂CO₃ (soda) là hóa chất kinh điển làm mềm được TẤT CẢ các loại nước cứng (tạm thời, vĩnh cửu và toàn phần).';
      break;
    }

    case 'PHOSPHATE_NA3PO4': {
      // Na3PO4: Form insoluble phosphates: Ca3(PO4)2, Mg3(PO4)2
      residualH = Math.round(initialH * 0.03 * 10) / 10; // ~97% removed
      pptFormula = 'Ca3(PO4)2';
      eqVI = '3 Ca²⁺ + 2 PO₄³⁻ → Ca₃(PO₄)₂↓ ; 3 Mg²⁺ + 2 PO₄³⁻ → Mg₃(PO₄)₂↓';
      visualVI = 'Kết tủa keo trắng canxi photphat Ca₃(PO₄)₂ không tan lắng nhanh.';
      rationaleVI = 'Muối photphat của kim loại kiềm thổ có tích số tan cực nhỏ (Ksp ≈ 10⁻²⁹), làm giảm nồng độ Ca²⁺ xuống mức tối thiểu.';
      warningVI = 'Cùng với Na₂CO₃, Na₃PO₄ là chất làm mềm vạn năng cho mọi loại nước cứng.';
      break;
    }

    case 'ION_EXCHANGE_RESIN': {
      // Zeolite / Cation exchange resin: 2 R-Na + Ca2+ -> R2-Ca + 2 Na+
      residualH = Math.round(initialH * 0.01 * 10) / 10; // ~99% removed
      pptFormula = 'R2-Ca (Giữ trong cột nhựa)';
      eqVI = '2 R-Na (nhựa trao đổi) + Ca²⁺ (dd) ⇄ R₂-Ca + 2 Na⁺ (dd)';
      visualVI = 'Nước chảy qua cột lọc hạt nhựa cationit, không sinh kết tủa lơ lửng, nước đầu ra mềm tuyệt đối (< 5 mg/L).';
      rationaleVI = 'Phương pháp hiện đại: Các ion Ca²⁺ và Mg²⁺ trong nước bị hấp phụ mạnh lên nhóm chức sunfonic (-SO₃⁻) của nhựa và giải phóng ion Na⁺ lành tính vào nước.';
      warningVI = 'Khi cột nhựa bão hòa ion Ca²⁺, hoàn nguyên đơn giản bằng cách ngâm rửa với dung dịch muối ăn NaCl bão hòa!';
      break;
    }
  }

  const efficiencyPct = Math.round(((initialH - residualH) / initialH) * 1000) / 10;
  // Grams of precipitate per 1000L = (initialH - residualH) mg/L * 1000L / 1000mg = (initialH - residualH) g
  const pptGrams = Math.round((initialH - residualH) * 10) / 10;

  return {
    initialHardnessMgPerL: initialH,
    softeningMethod: params.method,
    residualHardnessMgPerL: residualH,
    softeningEfficiencyPercent: efficiencyPct,
    precipitateFormedGramsPer1000L: pptGrams,
    precipitateFormula: pptFormula,
    chemicalEquationVI: eqVI,
    visualPhenomenonVI: visualVI,
    pedagogicalEvaluationVI: rationaleVI,
    curriculumWarningVI: warningVI
  };
}
