// src/domain/foodChemistryEngine.ts
// Comprehensive Food Chemistry, Maillard Reaction, Lipid Auto-oxidation & Safety Testing Engine for ELEMENTA
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Chuyên đề Hóa học Thực phẩm & Đời sống)
// and FAO/WHO Codex Alimentarius & IUPAC Food Chemistry Standards

// =============================================================================
// 1. MAILLARD REACTION & NON-ENZYMATIC BROWNING KINETICS
// =============================================================================

export interface MaillardReactionOutcome {
  temperatureCelsius: number;
  durationMinutes: number;
  reducingSugar: string; // e.g., 'D-Glucose', 'D-Fructose', 'Lactose'
  aminoAcid: string; // e.g., 'L-Lysine', 'L-Glycine', 'L-Asparagine'
  browningColorHex: string; // From pale beige (#fef3c7) to golden amber (#d97706) to deep brown (#451a03)
  browningIntensityPercent: number; // 0 to 100%
  melanoidinYieldMmol: number;
  dominantAromaNotesVi: string[];
  keyAromaCompoundsVi: string[];
  acrylamideRiskLevel: 'NONE' | 'LOW' | 'MODERATE' | 'HAZARDOUS';
  acrylamideConcentrationPpb: number; // microgram/kg
  chemicalExplanationVi: string;
}

/**
 * Simulates Maillard browning, aroma profile, and acrylamide risk.
 * Reaction requires reducing sugar carbonyl + amino group (nucleophilic addition).
 * Temperature threshold ~ 120-130°C for notable acceleration; optimal at 140-165°C.
 * If Asparagine is heated above 160°C, toxic Acrylamide (C3H5NO) forms as a byproduct.
 */
export function simulateMaillardReaction(
  temperatureCelsius: number,
  durationMinutes: number,
  reducingSugar: string = 'D-Glucose',
  aminoAcid: string = 'L-Lysine'
): MaillardReactionOutcome {
  const safeTemp = Math.max(20, Math.min(260, temperatureCelsius));
  const safeTime = Math.max(0, Math.min(120, durationMinutes));

  // Temperature acceleration factor using Arrhenius-like kinetic progression
  // Activation energy Ea ~ 100-140 kJ/mol
  let rateFactor = 0;
  if (safeTemp >= 100) {
    rateFactor = Math.pow((safeTemp - 90) / 40, 2.8) * (safeTime / 15);
  } else if (safeTemp >= 60) {
    rateFactor = ((safeTemp - 50) / 50) * (safeTime / 60) * 0.15;
  }

  const browningIntensityPercent = Math.min(100, Math.round(rateFactor * 12));
  const melanoidinYieldMmol = parseFloat((Math.min(25, rateFactor * 1.8)).toFixed(2));

  // Visual browning color progression
  let browningColorHex = '#fef3c7'; // Pale wheat/dough
  if (browningIntensityPercent > 85) {
    browningColorHex = '#291404'; // Charred Dark Crust / Roasted Coffee
  } else if (browningIntensityPercent > 65) {
    browningColorHex = '#451a03'; // Deep Chestnut Brown (Searing / Crust)
  } else if (browningIntensityPercent > 40) {
    browningColorHex = '#92400e'; // Golden Brown Toasted
  } else if (browningIntensityPercent > 20) {
    browningColorHex = '#d97706'; // Amber Honey
  } else if (browningIntensityPercent > 5) {
    browningColorHex = '#fde68a'; // Light Golden
  }

  // Characteristic aroma compounds based on reactants and temperature
  const dominantAromaNotesVi: string[] = [];
  const keyAromaCompoundsVi: string[] = [];

  if (safeTemp < 100) {
    dominantAromaNotesVi.push('Mùi bột ngọt tươi nhạt', 'Hương aldehyde hoa quả nhẹ');
    keyAromaCompoundsVi.push('Glucosylamine', 'Sản phẩm chuyển vị Amadori');
  } else if (safeTemp < 150) {
    dominantAromaNotesVi.push('Mùi bơ béo caramen', 'Hương bánh mì mới nướng');
    keyAromaCompoundsVi.push('Diacetyl (2,3-butanedione)', 'Furfural', 'Hydroxymethylfurfural (HMF)');
  } else if (safeTemp <= 190) {
    dominantAromaNotesVi.push('Hương thịt nướng thơm lừng', 'Mùi hạt dẻ rang & cà phê');
    keyAromaCompoundsVi.push('2-Acetyl-1-pyrroline (Hương cơm cháy/bánh mì)', 'Tetramethylpyrazine', 'Thiazole');
  } else {
    dominantAromaNotesVi.push('Mùi khét hăng hắc', 'Mùi đắng cháy xém');
    keyAromaCompoundsVi.push('Melanoidin đa tụ chuỗi dài', 'Polyme phenol ngưng tụ');
  }

  // Acrylamide byproduct calculation (specific to Asparagine + high heat > 160°C)
  let acrylamideRiskLevel: 'NONE' | 'LOW' | 'MODERATE' | 'HAZARDOUS' = 'NONE';
  let acrylamideConcentrationPpb = 0;

  if (aminoAcid === 'L-Asparagine' && safeTemp >= 140) {
    const acrylamideFactor = Math.pow((safeTemp - 130) / 30, 2.5) * (safeTime / 10);
    acrylamideConcentrationPpb = Math.round(acrylamideFactor * 120);

    if (acrylamideConcentrationPpb > 1000) {
      acrylamideRiskLevel = 'HAZARDOUS';
    } else if (acrylamideConcentrationPpb > 500) {
      acrylamideRiskLevel = 'MODERATE';
    } else if (acrylamideConcentrationPpb > 100) {
      acrylamideRiskLevel = 'LOW';
    }
  }

  const chemicalExplanationVi = `Giai đoạn 1: Đường khử (${reducingSugar}) cộng hợp nhóm amin của ${aminoAcid} tạo Glucosylamine rồi chuyển vị Amadori. ` +
    `Giai đoạn 2: Khử nước & phân cắt mạch tạo hợp chất dicarbonyl (Furfural, Diacetyl). ` +
    `Giai đoạn 3: Phản ứng ngưng tụ Aldol tạo polyme Melanoidin mang sắc nâu và chất chống oxi hóa tự nhiên.`;

  return {
    temperatureCelsius: safeTemp,
    durationMinutes: safeTime,
    reducingSugar,
    aminoAcid,
    browningColorHex,
    browningIntensityPercent,
    melanoidinYieldMmol,
    dominantAromaNotesVi,
    keyAromaCompoundsVi,
    acrylamideRiskLevel,
    acrylamideConcentrationPpb,
    chemicalExplanationVi
  };
}

// =============================================================================
// 2. LIPID AUTO-OXIDATION & RANCIDITY (SỰ ÔI THIU DẦU MỠ)
// =============================================================================

export interface LipidOxidationProfile {
  oilTypeVi: string;
  polyunsaturatedFatPercent: number; // Higher PUFA = faster rancidity
  exposureDays: number;
  hasLightExposure: boolean;
  hasOxygenContact: boolean;
  temperatureCelsius: number;
  hasAntioxidantVitaminE: boolean;
  peroxideValuePovMeqPerKg: number; // Peroxide Value (meq O2/kg)
  malondialdehydeMdaPpm: number; // Secondary oxidation product
  freshnessGradeVi: 'DẦU_TƯƠI_MỚI' | 'BẮT_ĐẦU_OXI_HÓA' | 'ÔI_THIU_NGUY_HẠI';
  rancidOdorNotesVi: string[];
  biochemicalMechanismVi: string;
}

export function simulateLipidAutoOxidation(
  oilType: 'OLIVE_OIL' | 'SOYBEAN_OIL' | 'SUNFLOWER_OIL',
  exposureDays: number,
  hasLight: boolean = true,
  hasOxygen: boolean = true,
  hasAntioxidant: boolean = false,
  temperatureCelsius: number = 25
): LipidOxidationProfile {
  let oilNameVi = 'Dầu Đậu Nành (Soybean oil)';
  let pufaPercent = 58; // 58% linoleic/linolenic acid

  if (oilType === 'OLIVE_OIL') {
    oilNameVi = 'Dầu Oliu nguyên chất (Olive oil)';
    pufaPercent = 11; // 75% oleic acid (monounsaturated), low PUFA => high stability!
  } else if (oilType === 'SUNFLOWER_OIL') {
    oilNameVi = 'Dầu Hướng Dương (Sunflower oil)';
    pufaPercent = 65; // High PUFA => rapid auto-oxidation
  }

  // Base rate depends strongly on polyunsaturated fatty acid % (bis-allylic hydrogens)
  let rate = (pufaPercent / 20) * (exposureDays / 10);

  if (hasLight) rate *= 2.2; // Photosensitized singlet oxygen generation
  if (hasOxygen) rate *= 1.8;
  if (temperatureCelsius > 30) rate *= Math.pow(1.04, temperatureCelsius - 25);
  if (hasAntioxidant) rate *= 0.25; // Vitamin E (alpha-tocopherol) traps peroxy radicals ROO*

  // Peroxide Value calculation: starts at 1.5 meq/kg, peaks as hydroperoxides accumulate
  const pov = parseFloat((Math.min(45, 1.5 + rate * 3.8)).toFixed(1));
  const mda = parseFloat((Math.min(18, rate * 1.2)).toFixed(2));

  let freshnessGradeVi: 'DẦU_TƯƠI_MỚI' | 'BẮT_ĐẦU_OXI_HÓA' | 'ÔI_THIU_NGUY_HẠI';
  const rancidOdorNotesVi: string[] = [];

  if (pov <= 5.0) {
    freshnessGradeVi = 'DẦU_TƯƠI_MỚI';
    rancidOdorNotesVi.push('Mùi thơm béo thanh khiết tự nhiên', 'Không có mùi chua hay hăng');
  } else if (pov <= 10.0) {
    freshnessGradeVi = 'BẮT_ĐẦU_OXI_HÓA';
    rancidOdorNotesVi.push('Mùi cỏ ngai ngái', 'Vị đắng nhẹ đầu lưỡi');
  } else {
    freshnessGradeVi = 'ÔI_THIU_NGUY_HẠI';
    rancidOdorNotesVi.push('Mùi hôi khét dầu mỡ ôi thiu (Hexanal)', 'Mùi sơn vecni nồng nặc do peroxide phân hủy');
  }

  const biochemicalMechanismVi = `Cơ chế gốc tự do 3 giai đoạn: ` +
    `1. Khởi đầu: RH ─(hν, O₂)─> R•. ` +
    `2. Lan truyền: R• + O₂ ─> ROO•; ROO• + RH ─> ROOH (Hydroperoxide) + R•. ` +
    `3. Phân hủy: ROOH bẻ gãy mạch tạo aldehyde, ketone bay hơi độc hại (MDA, Hexanal).`;

  return {
    oilTypeVi: oilNameVi,
    polyunsaturatedFatPercent: pufaPercent,
    exposureDays,
    hasLightExposure: hasLight,
    hasOxygenContact: hasOxygen,
    temperatureCelsius,
    hasAntioxidantVitaminE: hasAntioxidant,
    peroxideValuePovMeqPerKg: pov,
    malondialdehydeMdaPpm: mda,
    freshnessGradeVi,
    rancidOdorNotesVi,
    biochemicalMechanismVi
  };
}

// =============================================================================
// 3. FOOD SAFETY: BORAX DETECTION (CURCUMIN TEST) & PRESERVATIVES
// =============================================================================

export interface BoraxCurcuminTestResult {
  sampleTypeVi: string;
  boraxPresent: boolean;
  acidExtractColorHex: string; // Yellow (#eab308) for clean, Red-Orange (#dc2626) for Borax
  alkaliConfirmationColorHex: string; // Stays yellow or turns Dark Green-Blue/Black (#064e3b / #022c22)
  complexNameVi: string;
  isLegalForFoodConsumption: boolean;
  forensicReportVi: string;
}

export function performBoraxCurcuminTest(
  sample: 'PURE_PORK_SAUSAGE' | 'ADULTERATED_BORAX_SAUSAGE' | 'TURMERIC_BLANK'
): BoraxCurcuminTestResult {
  switch (sample) {
    case 'ADULTERATED_BORAX_SAUSAGE':
      return {
        sampleTypeVi: 'Giò lụa / Chả lụa chứa Hàn the (Borax - Na₂B₄O₇ · 10H₂O)',
        boraxPresent: true,
        acidExtractColorHex: '#dc2626', // Red-Orange Rosocyanine
        alkaliConfirmationColorHex: '#022c22', // Dark Green-Black
        complexNameVi: 'Phức chất Rosocyanine (Curcumin : Boric acid tỉ lệ 2 : 1)',
        isLegalForFoodConsumption: false,
        forensicReportVi: 'DƯƠNG TÍNH VỚI HÀN THE: Giấy nghệ chuyển từ vàng sang ĐỎ CAM trong môi trường acid HCl. Khi nhỏ dung dịch kiềm (NH₃/NaOH), vết màu chuyển ngay sang XANH ĐEN / XANH LỤC THẪM đặc trưng. Mẫu vi phạm nghiêm trọng Luật An toàn thực phẩm!'
      };

    case 'PURE_PORK_SAUSAGE':
      return {
        sampleTypeVi: 'Giò lụa truyền thống an toàn (Không pha hàn the)',
        boraxPresent: false,
        acidExtractColorHex: '#eab308', // Pure Curcumin Yellow
        alkaliConfirmationColorHex: '#b45309', // Brown-Orange (natural curcumin alkaline shift)
        complexNameVi: 'Không hình thành phức chất Rosocyanine',
        isLegalForFoodConsumption: true,
        forensicReportVi: 'ÂM TÍNH VỚI HÀN THE: Giấy nghệ giữ nguyên màu VÀNG TƯƠI trong môi trường acid. Không xuất hiện sắc đỏ cam của Rosocyanine. Mẫu đạt tiêu chuẩn an toàn vệ sinh thực phẩm.'
      };

    case 'TURMERIC_BLANK':
    default:
      return {
        sampleTypeVi: 'Mẫu trắng đối chứng (Giấy tẩm củ nghệ tươi + HCl)',
        boraxPresent: false,
        acidExtractColorHex: '#facc15',
        alkaliConfirmationColorHex: '#ca8a04',
        complexNameVi: 'Curcumin tự do',
        isLegalForFoodConsumption: true,
        forensicReportVi: 'MẪU ĐỐI CHỨNG: Giấy nghệ chuẩn hóa có hoạt tính tốt, nền vàng sáng đồng nhất.'
      };
  }
}

export interface FoodPreservativeSpec {
  id: string;
  nameVi: string;
  eNumber: string;
  chemicalFormula: string;
  optimalPhRange: string;
  mechanismVi: string;
  commonFoodsVi: string;
  maxPermittedLevelVi: string;
}

export const PRESERVATIVE_CATALOG: FoodPreservativeSpec[] = [
  {
    id: 'SODIUM_BENZOATE',
    nameVi: 'Sodium Benzoate (Natri benzoat)',
    eNumber: 'E211',
    chemicalFormula: 'C₆H₅COONa',
    optimalPhRange: 'pH 2.5 - 4.0 (Môi trường acid mạnh)',
    mechanismVi: 'Trong môi trường acid, chuyển thành axit benzoic phân tử không ion hóa C₆H₅COOH, xuyên thủng màng tế bào nấm mốc và ức chế enzyme hô hấp.',
    commonFoodsVi: 'Nước ngọt có gas, nước ép hoa quả, tương ớt, dưa muối',
    maxPermittedLevelVi: '1000 mg/kg (theo quy chuẩn BYT Việt Nam)'
  },
  {
    id: 'POTASSIUM_SORBATE',
    nameVi: 'Potassium Sorbate (Kali sorbat)',
    eNumber: 'E202',
    chemicalFormula: 'CH₃-CH=CH-CH=CH-COOK',
    optimalPhRange: 'pH lên tới 6.5 (Rộng hơn Natri benzoat)',
    mechanismVi: 'Ức chế chọn lọc enzyme dehydrogenase của nấm mốc và vi khuẩn kị khí; an toàn, chuyển hóa thành CO₂ và H₂O như acid béo thông thường.',
    commonFoodsVi: 'Bánh ngọt, phô mai, mứt quả, sốt mayonnaise',
    maxPermittedLevelVi: '1000 - 2000 mg/kg'
  },
  {
    id: 'SODIUM_NITRITE',
    nameVi: 'Sodium Nitrite (Natri nitrit)',
    eNumber: 'E250',
    chemicalFormula: 'NaNO₂',
    optimalPhRange: 'Thực phẩm chế biến từ thịt',
    mechanismVi: 'Tác dụng kép: 1. Tạo Nitrosomyoglobin giữ màu hồng tươi cho thịt muối; 2. Ức chế cực mạnh sự nảy mầm của nha bào Clostridium botulinum sinh độc tố thần kinh chết người.',
    commonFoodsVi: 'Lạp xưởng, xúc xích, giăm bông, thịt hộp pate',
    maxPermittedLevelVi: '80 - 150 mg/kg (Kiểm soát nghiêm ngặt tránh tạo Nitrosamine gây ung thư)'
  }
];
