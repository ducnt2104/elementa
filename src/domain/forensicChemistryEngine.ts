// src/domain/forensicChemistryEngine.ts
// Comprehensive Forensic Chemistry & Toxicology Simulation Engine for ELEMENTA
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Chuyên đề Hóa học Kỹ thuật Hình sự & Đời sống)
// and IUPAC Analytical Chemistry & Chemiluminescence Standards

// =============================================================================
// 1. BREATHALYZER & BLOOD ALCOHOL CONCENTRATION (BAC / BrAC)
// =============================================================================

export interface BreathalyzerReading {
  breathEthanolMgL: number; // BrAC: mg/L in exhaled alveolar air
  estimatedBacGPer100mL: number; // BAC: g/100mL (% by volume, using 2100:1 partition ratio)
  estimatedBacMgPer100mL: number; // BAC in mg/100mL
  dichromateConsumedMmol: number;
  cr3ProducedMmol: number;
  absorbanceAt600nm: number; // Optical density at 600nm (Cr3+ green peak)
  absorbanceAt440nm: number; // Optical density at 440nm (Cr2O7 2- orange peak)
  solutionColor: string; // CSS color string representing transition from orange to deep green
  vietnamDecree100Tier: 'TIER_0_SOBER' | 'TIER_1_LOW' | 'TIER_2_MEDIUM' | 'TIER_3_SEVERE';
  legalPenaltyDescriptionVi: string;
}

/**
 * Calculates breathalyzer redox response based on exhaled alcohol.
 * Reaction: 3 C2H5OH + 2 K2Cr2O7 + 8 H2SO4 -> 3 CH3COOH + 2 Cr2(SO4)3 + 2 K2SO4 + 11 H2O
 * Henry's Law blood-to-breath partition ratio = 2100:1 (2100 mL alveolar air contains same ethanol as 1 mL blood).
 */
export function calculateBreathalyzerTest(
  breathEthanolMgL: number,
  cellPathLengthCm: number = 1.0
): BreathalyzerReading {
  const safeBrAC = Math.max(0, breathEthanolMgL);
  
  // Blood alcohol conversion (Henry's Law)
  // 1 mg/L breath = 2100 mg / 1000 mL blood = 2.1 mg/mL = 0.21 g/100mL = 210 mg/100mL
  const bacGPer100mL = (safeBrAC * 2100) / 10000;
  const bacMgPer100mL = safeBrAC * 210;

  // Stoichiometry: 1 mmol C2H5OH consumes (2/3) mmol Cr2O7(2-) and yields (4/3) mmol Cr(3+)
  // Molar mass of C2H5OH = 46.07 g/mol
  const ethanolMmolPerSample = (safeBrAC * 0.5) / 46.07; // Assuming 500 mL exhaled sample volume
  const dichromateConsumedMmol = (2 / 3) * ethanolMmolPerSample;
  const cr3ProducedMmol = (4 / 3) * ethanolMmolPerSample;

  // Beer-Lambert Law simulation:
  // Initial orange Cr2O7(2-) absorbance at 440 nm is high, decreases with reduction
  // Green Cr3+ absorbance at 600 nm starts at ~0, increases with production
  const initialDichromateMmol = 0.05;
  const remainingDichromate = Math.max(0, initialDichromateMmol - dichromateConsumedMmol);
  
  const epsilon440 = 380; // L/(mol*cm) for Cr2O7(2-)
  const epsilon600 = 25; // L/(mol*cm) for Cr(3+)
  
  const cuvetteVolL = 0.003; // 3 mL cuvette
  const concDichromateM = remainingDichromate / 1000 / cuvetteVolL;
  const concCr3M = cr3ProducedMmol / 1000 / cuvetteVolL;

  const absorbanceAt440nm = parseFloat((epsilon440 * concDichromateM * cellPathLengthCm).toFixed(3));
  const absorbanceAt600nm = parseFloat((epsilon600 * concCr3M * cellPathLengthCm).toFixed(3));

  // Visual color interpolation: Orange (#ea580c) -> Olive (#65a30d) -> Deep Green (#15803d)
  let solutionColor: string;
  const reactionExtent = Math.min(1.0, safeBrAC / 0.6); // fully green at 0.6 mg/L
  if (reactionExtent <= 0.05) {
    solutionColor = '#ea580c'; // Bright Orange (Cr2O7 2-)
  } else if (reactionExtent < 0.4) {
    solutionColor = '#c2410c'; // Red-Orange
  } else if (reactionExtent < 0.7) {
    solutionColor = '#65a30d'; // Olive Khaki
  } else {
    solutionColor = '#15803d'; // Deep Emerald Green (Cr3+)
  }

  // Vietnam Decree 100/2019/ND-CP legal classification
  let vietnamDecree100Tier: 'TIER_0_SOBER' | 'TIER_1_LOW' | 'TIER_2_MEDIUM' | 'TIER_3_SEVERE';
  let legalPenaltyDescriptionVi: string;

  if (safeBrAC === 0) {
    vietnamDecree100Tier = 'TIER_0_SOBER';
    legalPenaltyDescriptionVi = 'Không phát hiện cồn trong khí thở. Đủ điều kiện điều khiển phương tiện giao thông.';
  } else if (safeBrAC <= 0.25) {
    vietnamDecree100Tier = 'TIER_1_LOW';
    legalPenaltyDescriptionVi = 'Mức 1 (≤ 0.25 mg/L khí thở): Phạt 6-8 triệu VNĐ (ô tô), 2-3 triệu VNĐ (xe máy); Tước GPLX 10-12 tháng.';
  } else if (safeBrAC <= 0.40) {
    vietnamDecree100Tier = 'TIER_2_MEDIUM';
    legalPenaltyDescriptionVi = 'Mức 2 (0.25 - 0.40 mg/L khí thở): Phạt 16-18 triệu VNĐ (ô tô), 4-5 triệu VNĐ (xe máy); Tước GPLX 16-18 tháng.';
  } else {
    vietnamDecree100Tier = 'TIER_3_SEVERE';
    legalPenaltyDescriptionVi = 'Mức 3 (> 0.40 mg/L khí thở): Khung phạt kịch trần 30-40 triệu VNĐ (ô tô), 6-8 triệu VNĐ (xe máy); Tước GPLX 22-24 tháng.';
  }

  return {
    breathEthanolMgL: safeBrAC,
    estimatedBacGPer100mL: parseFloat(bacGPer100mL.toFixed(4)),
    estimatedBacMgPer100mL: parseFloat(bacMgPer100mL.toFixed(2)),
    dichromateConsumedMmol: parseFloat(dichromateConsumedMmol.toFixed(5)),
    cr3ProducedMmol: parseFloat(cr3ProducedMmol.toFixed(5)),
    absorbanceAt600nm,
    absorbanceAt440nm,
    solutionColor,
    vietnamDecree100Tier,
    legalPenaltyDescriptionVi
  };
}

// =============================================================================
// 2. LUMINOL CHEMILUMINESCENCE & BLOODSTAIN DETECTION
// =============================================================================

export interface LuminolTestScenario {
  targetSample: 'DRIED_BLOOD' | 'DILUTED_BLOOD_1_1000' | 'DILUTED_BLOOD_1_100000' | 'BLEACH_FALSE_POSITIVE' | 'RUST_IRON_OXIDE' | 'CLEAN_SURFACE';
  catalystNameVi: string;
  reactionTypeVi: string;
  isPositiveGlow: boolean;
  isFalsePositive: boolean;
  glowColorHex: string;
  glowIntensityPercent: number; // 0 to 100%
  glowDurationSeconds: number;
  emissionWavelengthNm: number; // 425 nm (blue-violet)
  chemiluminescentEquationVi: string;
  forensicInterpretationVi: string;
}

export function evaluateLuminolChemiluminescence(
  targetSample: LuminolTestScenario['targetSample']
): LuminolTestScenario {
  switch (targetSample) {
    case 'DRIED_BLOOD':
      return {
        targetSample,
        catalystNameVi: 'Hemoglobin (Fe2+/Fe3+ Heme prosthetic group)',
        reactionTypeVi: 'Oxi hóa Luminol xúc tác bởi ion Sắt trong máu',
        isPositiveGlow: true,
        isFalsePositive: false,
        glowColorHex: '#38bdf8', // Vibrant Cyan-Blue
        glowIntensityPercent: 100,
        glowDurationSeconds: 30,
        emissionWavelengthNm: 425,
        chemiluminescentEquationVi: 'Luminol (C₈H₇N₃O₂) + 2H₂O₂ + 2OH⁻ ─(Fe-Heme)─> 3-Aminophthalate* + N₂↑ + 3H₂O + hν (425 nm)',
        forensicInterpretationVi: 'Phát quang xanh lam rực rỡ kéo dài ~30s trong buồng tối. Khẳng định có vết máu tiềm ẩn.'
      };

    case 'DILUTED_BLOOD_1_1000':
      return {
        targetSample,
        catalystNameVi: 'Hemoglobin pha loãng (1 : 1.000)',
        reactionTypeVi: 'Oxi hóa Luminol xúc tác Heme nồng độ vi lượng',
        isPositiveGlow: true,
        isFalsePositive: false,
        glowColorHex: '#0284c7', // Medium Cyan
        glowIntensityPercent: 75,
        glowDurationSeconds: 22,
        emissionWavelengthNm: 425,
        chemiluminescentEquationVi: 'Luminol + H₂O₂ ─(Trace Fe-Heme)─> 3-Aminophthalate* + N₂↑ + hν',
        forensicInterpretationVi: 'Phát quang xanh lam rõ nét. Minh chứng độ nhạy cực cao của thử nghiệm Luminol ngay cả khi hung thủ đã lau dọn hiện trường.'
      };

    case 'DILUTED_BLOOD_1_100000':
      return {
        targetSample,
        catalystNameVi: 'Hemoglobin siêu vi lượng (1 : 100.000)',
        reactionTypeVi: 'Oxi hóa Luminol xúc tác vi lượng giới hạn phát hiện',
        isPositiveGlow: true,
        isFalsePositive: false,
        glowColorHex: '#0369a1', // Faint Blue
        glowIntensityPercent: 35,
        glowDurationSeconds: 12,
        emissionWavelengthNm: 425,
        chemiluminescentEquationVi: 'Luminol + H₂O₂ ─(Ultra-trace Fe)─> 3-Aminophthalate* + N₂↑ + hν',
        forensicInterpretationVi: 'Ánh sáng xanh mờ nhạt nhưng quan sát được rõ bằng máy ảnh phơi sáng ISO cao trong bóng tối hoàn toàn.'
      };

    case 'BLEACH_FALSE_POSITIVE':
      return {
        targetSample,
        catalystNameVi: 'Nước Javel / Thuốc tẩy (Sodium hypochlorite NaClO)',
        reactionTypeVi: 'Oxi hóa trực tiếp Luminol bởi ion Hypochlorite ClO⁻ (Không cần xúc tác enzyme)',
        isPositiveGlow: true,
        isFalsePositive: true,
        glowColorHex: '#67e8f9', // Pale whitish blue
        glowIntensityPercent: 95,
        glowDurationSeconds: 4, // Very rapid decay!
        emissionWavelengthNm: 425,
        chemiluminescentEquationVi: 'Luminol + 2ClO⁻ ─(Trực tiếp)─> 3-Aminophthalate* + N₂↑ + 2Cl⁻ + hν (Lóe sáng tắt nhanh)',
        forensicInterpretationVi: 'DƯƠNG TÍNH GIẢ (False Positive): Lóe sáng chớp nhoáng rồi tắt lịm trong 3-5 giây. Dấu hiệu nghi phạm dùng nước Javel tẩy xóa hiện trường!'
      };

    case 'RUST_IRON_OXIDE':
      return {
        targetSample,
        catalystNameVi: 'Rỉ sét kim loại (Fe2O3 · nH2O)',
        reactionTypeVi: 'Xúc tác dị thể vô cơ ion Fe3+',
        isPositiveGlow: true,
        isFalsePositive: true,
        glowColorHex: '#0284c7',
        glowIntensityPercent: 40,
        glowDurationSeconds: 15,
        emissionWavelengthNm: 425,
        chemiluminescentEquationVi: 'Luminol + H₂O₂ ─(Fe³⁺ rỉ sét)─> 3-Aminophthalate* + N₂↑ + hν',
        forensicInterpretationVi: 'DƯƠNG TÍNH GIẢ (False Positive): Rỉ sắt trên đinh hoặc khung cửa cũng xúc tác phân hủy H2O2. Cần làm tiếp test Kastle-Meyer xác nhận.'
      };

    case 'CLEAN_SURFACE':
    default:
      return {
        targetSample: 'CLEAN_SURFACE',
        catalystNameVi: 'Không có chất xúc tác',
        reactionTypeVi: 'Không xảy ra phản ứng trong buồng tối',
        isPositiveGlow: false,
        isFalsePositive: false,
        glowColorHex: '#0f172a', // Obsidian dark
        glowIntensityPercent: 0,
        glowDurationSeconds: 0,
        emissionWavelengthNm: 0,
        chemiluminescentEquationVi: 'Luminol + H₂O₂ (Không có chất xúc tác) ─> Tốc độ phản ứng ~ 0 (Không phát quang)',
        forensicInterpretationVi: 'Bề mặt sạch, hoàn toàn không có dấu vết sinh học hoặc hóa chất oxi hóa.'
      };
  }
}

// =============================================================================
// 3. MARSH TEST FOR ARSENIC DETECTION & DIFFERENTIATION
// =============================================================================

export interface MarshTestResult {
  arsenicPresent: boolean;
  antimonyPresent: boolean;
  sampleNameVi: string;
  hydrogenGenerationEquationVi: string;
  thermalDecompositionEquationVi: string;
  mirrorAppearanceVi: string;
  mirrorColorHex: string;
  hypochloriteSolubilityVi: string;
  hypochloriteReactionEquationVi: string;
  isConfirmedArsenic: boolean;
  historicalContextVi: string;
}

export function performMarshTest(
  sampleType: 'ARSENIC_TRIPTOXIDE' | 'ANTIMONY_TRICHLORIDE' | 'CONTROL_BLANK'
): MarshTestResult {
  switch (sampleType) {
    case 'ARSENIC_TRIPTOXIDE':
      return {
        arsenicPresent: true,
        antimonyPresent: false,
        sampleNameVi: 'Asen trioxit (As₂O₃ - Thạch tín)',
        hydrogenGenerationEquationVi: 'As₂O₃ + 6Zn + 6H₂SO₄ ─> 2AsH₃↑ (khí arsine cực độc) + 6ZnSO₄ + 3H₂O',
        thermalDecompositionEquationVi: '2AsH₃ ─(300°C)─> 2As↓ (gương asen bóng màu xám đen) + 3H₂↑',
        mirrorAppearanceVi: 'Vệt gương kim loại màu nâu đen ánh bạc bóng loáng bám trên thành chén sứ lạnh.',
        mirrorColorHex: '#71717a', // Metallic slate silver
        hypochloriteSolubilityVi: 'TAN HOÀN TOÀN trong dung dịch nước Javel (NaOCl).',
        hypochloriteReactionEquationVi: '2As + 5NaOCl + 3H₂O ─> 2H₃AsO₄ (axit asenic) + 5NaCl (Gương biến mất)',
        isConfirmedArsenic: true,
        historicalContextVi: 'Phương pháp James Marsh (1836): Thử nghiệm hóa học pháp y kinh điển đầu tiên được tòa án Anh chấp nhận làm bằng chứng kết tội đầu độc.'
      };

    case 'ANTIMONY_TRICHLORIDE':
      return {
        arsenicPresent: false,
        antimonyPresent: true,
        sampleNameVi: 'Antimon triclorua (SbCl₃)',
        hydrogenGenerationEquationVi: '2SbCl₃ + 3Zn + 3H₂SO₄ ─> 2SbH₃↑ (khí stibine) + 3ZnSO₄ + 6HCl',
        thermalDecompositionEquationVi: '2SbH₃ ─(t°)─> 2Sb↓ (gương antimon màu đen nhám) + 3H₂↑',
        mirrorAppearanceVi: 'Vệt gương màu đen xỉn mờ, không bóng bằng asen.',
        mirrorColorHex: '#27272a', // Matte black
        hypochloriteSolubilityVi: 'KHÔNG TAN trong dung dịch nước Javel (NaOCl).',
        hypochloriteReactionEquationVi: 'Sb + NaOCl ─> Không tan (Giúp phân biệt chính xác 100% giữa Asen và Antimon)',
        isConfirmedArsenic: false,
        historicalContextVi: 'Khử nhầm lẫn pháp y: Antimon cho phản ứng tạo khí tương tự nhưng vết gương không tan trong NaOCl, loại trừ nghi án thạch tín.'
      };

    case 'CONTROL_BLANK':
    default:
      return {
        arsenicPresent: false,
        antimonyPresent: false,
        sampleNameVi: 'Mẫu trắng đối chứng (Kẽm + H₂SO₄ tinh khiết)',
        hydrogenGenerationEquationVi: 'Zn + H₂SO₄ ─> ZnSO₄ + H₂↑',
        thermalDecompositionEquationVi: 'Khí hydro tinh khiết cháy thành hơi nước 2H₂ + O₂ ─> 2H₂O',
        mirrorAppearanceVi: 'Không hình thành bất kỳ vệt gương hay lắng cặn nào trên đĩa sứ.',
        mirrorColorHex: '#e2e8f0', // Clean porcelain white
        hypochloriteSolubilityVi: 'Không có kết tủa.',
        hypochloriteReactionEquationVi: 'Không có phản ứng.',
        isConfirmedArsenic: false,
        historicalContextVi: 'Quy chuẩn phòng thí nghiệm: Đảm bảo kẽm và axit sunfuric tinh khiết không bị lẫn tạp chất asen trước khi thử mẫu bệnh phẩm.'
      };
  }
}

// =============================================================================
// 4. MARQUIS REAGENT COLOR TESTING (PRESUMPTIVE DRUG IDENTIFICATION)
// =============================================================================

export interface MarquisSubstanceTest {
  id: string;
  nameVi: string;
  nameEn: string;
  chemicalFormula: string;
  classificationVi: string;
  primaryColorHex: string;
  colorTransitionDescriptionVi: string;
  reactionMechanismVi: string;
  confirmationMethodVi: string;
}

export const MARQUIS_CATALOG: MarquisSubstanceTest[] = [
  {
    id: 'MORPHINE_HEROIN',
    nameVi: 'Morphine / Heroin (Diacetylmorphine)',
    nameEn: 'Morphine / Heroin',
    chemicalFormula: 'C₁₇H₁₉NO₃ / C₂₁H₂₃NO₅',
    classificationVi: 'Nhóm Opiate / Thuốc phiện',
    primaryColorHex: '#7c3aed', // Deep Violet / Purple
    colorTransitionDescriptionVi: 'Chuyển ngay từ không màu sang TÍM ĐẬM (Deep Purple / Violet).',
    reactionMechanismVi: 'Hai phân tử morphine ngưng tụ với formaldehyde tạo muối carbocation mang màu tím liên hợp bền vững.',
    confirmationMethodVi: 'Sắc ký khí ghép khối phổ (GC-MS) hoặc HPLC.'
  },
  {
    id: 'AMPHETAMINE_METH',
    nameVi: 'Amphetamine / Methamphetamine (Ma túy đá)',
    nameEn: 'Amphetamine / Methamphetamine',
    chemicalFormula: 'C₉H₁₃N / C₁₀H₁₅N',
    classificationVi: 'Chất kích thích hệ thần kinh trung ương (ATS)',
    primaryColorHex: '#ea580c', // Bright Orange -> Red-Orange
    colorTransitionDescriptionVi: 'Chuyển sang màu DA CAM rồi biến chuyển dần sang NÂU ĐỎ.',
    reactionMechanismVi: 'Phản ứng ngưng tụ Friedel-Crafts giữa nhân thơm benzene của amphetamine và formaldehyde trong H2SO4.',
    confirmationMethodVi: 'Thử nghiệm Simon (cho màu xanh cobalt với amine bậc 2).'
  },
  {
    id: 'MDMA_ECSTASY',
    nameVi: 'MDMA (Thuốc lắc - Ecstasy)',
    nameEn: 'MDMA (3,4-Methylenedioxymethamphetamine)',
    chemicalFormula: 'C₁₁H₁₅NO₂',
    classificationVi: 'Chất kích thích / Gây ảo giác',
    primaryColorHex: '#09090b', // Jet Black / Deep Purple-Black
    colorTransitionDescriptionVi: 'Sủi bọt tăm nhẹ rồi chuyển sang TÍM ĐEN rồi ĐEN KỊT (Jet Black).',
    reactionMechanismVi: 'Nhóm methylenedioxy (-O-CH2-O-) bị proton hóa và bẻ gãy, tạo phức chất polyphenol màu đen.',
    confirmationMethodVi: 'Thử nghiệm Mecke (chuyển xanh lục sang xanh đậm).'
  },
  {
    id: 'ASPIRIN',
    nameVi: 'Aspirin (Acetylsalicylic acid)',
    nameEn: 'Aspirin',
    chemicalFormula: 'C₉H₈O₄',
    classificationVi: 'Thuốc hạ sốt giảm đau thông thường (Đối chứng âm tính ma túy)',
    primaryColorHex: '#f43f5e', // Slow Rose Pink
    colorTransitionDescriptionVi: 'Không đổi màu tức thì; sau 2-3 phút xuất hiện sắc HỒNG NHẠT (Rose Pink).',
    reactionMechanismVi: 'Thủy phân giải phóng một phần salicylic acid tạo phức màu hồng nhạt với thuốc thử.',
    confirmationMethodVi: 'Phản ứng với FeCl3 tạo dung dịch màu tím đặc trưng của phenol.'
  },
  {
    id: 'SUGAR_STARCH',
    nameVi: 'Đường kính / Tinh bột (Sucrose / Starch)',
    nameEn: 'Sucrose / Starch',
    chemicalFormula: 'C₁₂H₂₂O₁₁ / (C₆H₁₀O₅)n',
    classificationVi: 'Tá dược / Chất độn thông thường (Mẫu trắng)',
    primaryColorHex: '#ca8a04', // Caramel Yellow-Brown
    colorTransitionDescriptionVi: 'Chuyển sang VÀNG NÂU DO THAN HÓA (Caramelization) bởi H2SO4 đặc, không tạo màu tím hay cam.',
    reactionMechanismVi: 'H2SO4 đặc háo nước hút nước làm cháy xém carbohydrate, không có phản ứng tạo phẩm nhuộm.',
    confirmationMethodVi: 'Âm tính với tất cả chỉ thị ma túy.'
  }
];

// =============================================================================
// 5. CYANIDE TOXICITY & ANTIDOTE THERAPY SIMULATION
// =============================================================================

export interface CyanideAntidoteOutcome {
  initialCyanideMg: number;
  antidoteAdministered: 'NONE' | 'SODIUM_THIOSULFATE' | 'HYDROXOCOBALAMIN';
  cytochromeOxidaseInhibitionPercent: number; // 0 to 100%
  thiocyanateExcretedMmol: number;
  cyanocobalaminFormedMmol: number;
  patientSurvivalStatusVi: 'TỬ_VONG_DO_NGẠT_TẾ_BÀO' | 'NGUY_KỊCH' | 'HỒI_PHỤC_HOÀN_TOÀN';
  biochemicalMechanismVi: string;
}

export function simulateCyanideAntidote(
  cyanideDoseMg: number,
  antidote: 'NONE' | 'SODIUM_THIOSULFATE' | 'HYDROXOCOBALAMIN'
): CyanideAntidoteOutcome {
  const lethalDoseMg = 50; // ~50-100 mg NaCN is fatal to adults without antidote
  const safeDose = Math.max(0, cyanideDoseMg);
  const cyanideMmol = safeDose / 49.0; // Molar mass NaCN = 49 g/mol

  if (antidote === 'NONE') {
    const inhibition = Math.min(100, Math.round((safeDose / lethalDoseMg) * 85));
    const status = safeDose >= lethalDoseMg ? 'TỬ_VONG_DO_NGẠT_TẾ_BÀO' : (safeDose >= 20 ? 'NGUY_KỊCH' : 'HỒI_PHỤC_HOÀN_TOÀN');
    return {
      initialCyanideMg: safeDose,
      antidoteAdministered: 'NONE',
      cytochromeOxidaseInhibitionPercent: inhibition,
      thiocyanateExcretedMmol: 0,
      cyanocobalaminFormedMmol: 0,
      patientSurvivalStatusVi: status,
      biochemicalMechanismVi: 'CN⁻ gắn chặt vào ion Fe³⁺ của phức hệ Cytochrome c Oxidase (Complex IV), triệt tiêu chuỗi truyền electron ty thể và ngừng tổng hợp ATP.'
    };
  }

  if (antidote === 'SODIUM_THIOSULFATE') {
    // Reaction: CN- + S2O3(2-) -(enzyme rhodanese)-> SCN- + SO3(2-)
    const convertedMmol = parseFloat(cyanideMmol.toFixed(4));
    return {
      initialCyanideMg: safeDose,
      antidoteAdministered: 'SODIUM_THIOSULFATE',
      cytochromeOxidaseInhibitionPercent: 8, // mostly unblocked
      thiocyanateExcretedMmol: convertedMmol,
      cyanocobalaminFormedMmol: 0,
      patientSurvivalStatusVi: 'HỒI_PHỤC_HOÀN_TOÀN',
      biochemicalMechanismVi: 'Enzyme Rhodanese trong gan dùng Sodium Thiosulfate chuyển hóa CN⁻ thành Thiocyanate (SCN⁻) độc tính thấp gấp 200 lần, bài tiết an toàn qua nước tiểu.'
    };
  }

  // HYDROXOCOBALAMIN (Cyanokit)
  const convertedCobalamin = parseFloat(cyanideMmol.toFixed(4));
  return {
    initialCyanideMg: safeDose,
    antidoteAdministered: 'HYDROXOCOBALAMIN',
    cytochromeOxidaseInhibitionPercent: 4, // rapid chelation
    thiocyanateExcretedMmol: 0,
    cyanocobalaminFormedMmol: convertedCobalamin,
    patientSurvivalStatusVi: 'HỒI_PHỤC_HOÀN_TOÀN',
    biochemicalMechanismVi: 'Hydroxocobalamin (Vitamin B12a) bắt giữ phối tử CN⁻ tạo thành Cyanocobalamin (Vitamin B12 lành tính), bài tiết nhanh chóng qua thận mà không gây tụt huyết áp.'
  };
}
