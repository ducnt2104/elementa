// src/domain/dyeChemistryEngine.ts
// Comprehensive Synthetic Dye Chemistry, Azo Coupling, Chromophore Theory & Fenton Decolorization Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Chương 3 Lớp 12: Amin & Muối Diazoni; Chương 8: Môi trường)
// and IUPAC Colour Index (C.I.) International Standards

// =============================================================================
// 1. DATA STRUCTURES & DYES CATALOG
// =============================================================================

export type DyeClass =
  | 'AZO_MONOAZO'
  | 'AZO_DISAZO'
  | 'VAT_INDIGO'
  | 'TRIARYLMETHANE'
  | 'ANTHRAQUINONE';

export interface DyeProfile {
  id: string;
  nameVi: string;
  commonNameVi: string;
  chemicalFormula: string;
  colourIndexCiNumber: string; // C.I. generic name / number
  dyeClass: DyeClass;
  chromophoresVi: string[]; // e.g., ['-N=N- (nhóm azo)', 'Vòng benzen liên hợp']
  auxochromesVi: string[]; // e.g., ['-OH (hydroxyl)', '-SO3Na (sulfonat)']
  maxAbsorptionWavelengthNm: number; // lambda_max (nm)
  absorbedColorNameVi: string;
  complementaryObservedColorHex: string; // Perceived visible color
  complementaryObservedColorNameVi: string;
  homoLumoGapEv: number; // Delta E = hc / lambda (eV)
  vietnamTextileIndustryUsageVi: string;
  environmentalToxicityVi: string;
  chemicalSynthesisEquationVi: string;
}

export const DYES_CATALOG: DyeProfile[] = [
  {
    id: 'SUDAN_I',
    nameVi: 'Sudan I (Phẩm đỏ da cam 1-Phenylazo-2-naphthol)',
    commonNameVi: 'Phẩm nhuộm mỡ Sudan I (Phẩm azo dung môi)',
    chemicalFormula: 'C₁₆H₁₂N₂O',
    colourIndexCiNumber: 'C.I. 12055 / Solvent Yellow 14',
    dyeClass: 'AZO_MONOAZO',
    chromophoresVi: ['-N=N- (liên kết đôi azo)', 'Hệ liên hợp π thơm phenyl-naphthol'],
    auxochromesVi: ['-OH (nhóm hydroxyl vị trí ortho tạo liên kết hydro nội phân tử)'],
    maxAbsorptionWavelengthNm: 476,
    absorbedColorNameVi: 'Xanh lam (Blue ~470-490 nm)',
    complementaryObservedColorHex: '#ea580c', // Bright red-orange
    complementaryObservedColorNameVi: 'Đỏ da cam rực rỡ',
    homoLumoGapEv: 2.61, // 1240 / 476 ~ 2.61 eV
    vietnamTextileIndustryUsageVi: 'Nhuộm sáp, dầu bôi trơn, xi đánh giày, và nhiên liệu diesel phân biệt',
    environmentalToxicityVi: 'Chất gây ung thư nhóm 3 (IARC). Bị cấm tuyệt đối làm phụ gia tạo màu ớt bột, tương ớt, gia vị thực phẩm theo Thông tư 24/2019/TT-BYT.',
    chemicalSynthesisEquationVi: 'C₆H₅-N₂⁺Cl⁻ (Benzenđiazoni) + C₁₀H₇-OH (2-Naphthol) + NaOH ⟶ C₁₆H₁₂N₂O (Sudan I)↓ + NaCl + H₂O (0-5°C, pH 9-10)'
  },
  {
    id: 'METHYL_ORANGE',
    nameVi: 'Da Cam Metyl (Helianthin)',
    commonNameVi: 'Chỉ thị da cam metyl (Azo Indicator)',
    chemicalFormula: 'C₁₄H₁₄N₃NaO₃S',
    colourIndexCiNumber: 'C.I. 13025 / Acid Orange 52',
    dyeClass: 'AZO_MONOAZO',
    chromophoresVi: ['-N=N- (azo)', 'Cấu trúc quinonoid trong môi trường axit'],
    auxochromesVi: ['-N(CH₃)₂ (dimetylamino)', '-SO₃Na (nhóm sulfonat tan trong nước)'],
    maxAbsorptionWavelengthNm: 508, // In acid form
    absorbedColorNameVi: 'Xanh lục-lam (Cyan-green ~505 nm)',
    complementaryObservedColorHex: '#dc2626', // Red in acid, shifts to #f59e0b yellow in alkali
    complementaryObservedColorNameVi: 'Đỏ hồng (pH < 3.1) ⟷ Vàng da cam (pH > 4.4)',
    homoLumoGapEv: 2.44,
    vietnamTextileIndustryUsageVi: 'Chỉ thị chuẩn độ axit-bazơ chuẩn phòng thí nghiệm trường học Việt Nam và nhuộm sợi len, tơ tằm',
    environmentalToxicityVi: 'Gây kích ứng mắt và da; nước thải dệt nhuộm chứa dẫn xuất metyl da cam gây cản trở quang hợp của thủy sinh.',
    chemicalSynthesisEquationVi: 'NaO₃S-C₆H₄-N₂⁺ + C₆H₅-N(CH₃)₂ + HCl ⟶ Da Cam Metyl (ghép đôi trong môi trường axit yếu pH 4-5)'
  },
  {
    id: 'CONGO_RED',
    nameVi: 'Đỏ Congo (Congo Red)',
    commonNameVi: 'Thuốc nhuộm disazo trực tiếp cho sợi bông cotton',
    chemicalFormula: 'C₃₂H₂₂N₆Na₂O₆S₂',
    colourIndexCiNumber: 'C.I. 22120 / Direct Red 28',
    dyeClass: 'AZO_DISAZO',
    chromophoresVi: ['2 nhóm -N=N- (disazo đối xứng)', 'Khung diphenyl liên hợp dài'],
    auxochromesVi: ['-NH₂ (amino)', '-SO₃Na (sulfonat)'],
    maxAbsorptionWavelengthNm: 497,
    absorbedColorNameVi: 'Xanh lục (Blue-green ~495-500 nm)',
    complementaryObservedColorHex: '#b91c1c', // Crimson Red (blue at pH < 3)
    complementaryObservedColorNameVi: 'Đỏ thắm (pH > 5.2) ⟷ Xanh lam đậm (pH < 3.0)',
    homoLumoGapEv: 2.49,
    vietnamTextileIndustryUsageVi: 'Nhuộm trực tiếp sợi xenlulozơ (bông, vải lanh, sợi gai) nhờ liên kết hydro giữa nhóm -NH2 với nhóm -OH của xenlulozơ',
    environmentalToxicityVi: 'Chất chuyển hóa thành benzidine - chất gây ung thư bàng quang mạnh; bị kiểm soát gắt gao trong tiêu chuẩn xả thải dệt nhuộm QCVN 13-MT:2015/BTNMT.',
    chemicalSynthesisEquationVi: 'Tetrazoni hóa Benzidine: Cl⁻N₂⁺-C₆H₄-C₆H₄-N₂⁺Cl⁻ + 2 Axit Naphthionic ⟶ Đỏ Congo (pH 8-9)'
  },
  {
    id: 'INDIGO_SYNTHETIC',
    nameVi: 'Chàm Tổng Hợp (Indigo Blue)',
    commonNameVi: 'Phẩm nhuộm quần bò Blue Jeans (Vat Dye)',
    chemicalFormula: 'C₁₆H₁₀N₂O₂',
    colourIndexCiNumber: 'C.I. 73000 / Vat Blue 1',
    dyeClass: 'VAT_INDIGO',
    chromophoresVi: ['2 nhóm >C=O (cacbonyl liên hợp)', 'Liên kết đôi C=C trung tâm trans', 'Hệ nối đôi thơm'],
    auxochromesVi: ['2 nhóm -NH- (sec-amino) liên kết hydro nội và liên phân tử'],
    maxAbsorptionWavelengthNm: 605,
    absorbedColorNameVi: 'Cam (Orange ~600-610 nm)',
    complementaryObservedColorHex: '#1e3a8a', // Deep Classic Denim Blue
    complementaryObservedColorNameVi: 'Xanh chàm / Xanh denim cổ điển',
    homoLumoGapEv: 2.05,
    vietnamTextileIndustryUsageVi: 'Nhuộm vải jean, denim, trang phục truyền thống của đồng bào dân tộc thiểu số miền núi phía Bắc (người Mông, Dao)',
    environmentalToxicityVi: 'Không độc hại trực tiếp nhưng quá trình khử indigo trong bể nhuộm cần lượng lớn chất khử Na2S2O4 sinh khí SO2 độc hại.',
    chemicalSynthesisEquationVi: 'Tổng hợp Heumann-Pfleger: Anilin + Axit cloaxetic ⟶ Phenylglycin ⟶ đun chảy với KOH/NaNH₂ ở 200°C ⟶ Indoxyl ⟶ oxy hóa bằng không khí ⟶ Indigo↓'
  },
  {
    id: 'MALACHITE_GREEN',
    nameVi: 'Xanh Malachite (Lục Malachite)',
    commonNameVi: 'Phẩm nhuộm cation triarylmethan & trị nấm thủy sản',
    chemicalFormula: 'C₂₃H₂₅ClN₂',
    colourIndexCiNumber: 'C.I. 42000 / Basic Green 4',
    dyeClass: 'TRIARYLMETHANE',
    chromophoresVi: ['Cation trityl thơm liên hợp cộng hưởng phân tán điện tích dương'],
    auxochromesVi: ['2 nhóm -N(CH₃)₂ (p-dimetylamino) đẩy electron cực mạnh'],
    maxAbsorptionWavelengthNm: 618,
    absorbedColorNameVi: 'Đỏ cam (Red-orange ~620 nm)',
    complementaryObservedColorHex: '#047857', // Emerald Deep Green
    complementaryObservedColorNameVi: 'Xanh lục bảo đậm (Emerald Green)',
    homoLumoGapEv: 2.01,
    vietnamTextileIndustryUsageVi: 'Nhuộm tơ tằm, da thuộc, giấy và sợi acrylic; từng bị lạm dụng trị nấm và ký sinh trùng ở cá tra, tôm xuất khẩu',
    environmentalToxicityVi: 'Tồn dư leucomalachite green gây đột biến gen và quái thai; cấm hoàn toàn trong nuôi trồng thủy sản xuất khẩu Việt Nam theo TCVN.',
    chemicalSynthesisEquationVi: 'Benzandehit + 2 N,N-đimetylanilin ⟶ Hợp chất leuco ⟶ Oxi hóa bằng PbO₂ ⟶ Xanh Malachite'
  },
  {
    id: 'ALIZARIN',
    nameVi: 'Alizarin (Phẩm đỏ rễ cây thổ miêu)',
    commonNameVi: 'Phẩm nhuộm cầm màu cắn màu (Mordant Lake Dye)',
    chemicalFormula: 'C₁₄H₈O₄',
    colourIndexCiNumber: 'C.I. 58000 / Mordant Red 11',
    dyeClass: 'ANTHRAQUINONE',
    chromophoresVi: ['Nhân Anthraquinone với 2 nhóm C=O đối xứng'],
    auxochromesVi: ['2 nhóm phenolic -OH ở vị trí 1,2 tạo phức chelate với ion Al³⁺/Ca²⁺'],
    maxAbsorptionWavelengthNm: 530,
    absorbedColorNameVi: 'Xanh lục (Green ~530 nm)',
    complementaryObservedColorHex: '#991b1b', // Turkey Red
    complementaryObservedColorNameVi: 'Đỏ Thổ Nhĩ Kỳ (Turkey Red)',
    homoLumoGapEv: 2.34,
    vietnamTextileIndustryUsageVi: 'Nhuộm vải len dạ cao cấp bằng phương pháp cắn màu phèn nhôm (Alum mordant) tạo phức bền màu ánh sáng',
    environmentalToxicityVi: 'Tương đối an toàn sinh thái, có nguồn gốc tự nhiên từ rễ cây Rubia tinctorum, bền vững với ánh sáng và nước giặt.',
    chemicalSynthesisEquationVi: 'Sulfonat hóa anthraquinone ⟶ Muối natri anthraquinone-2-sulfonat ⟶ Đun chảy kiềm với NaOH/KClO₃ ở 200°C ⟶ Alizarin'
  }
];

// =============================================================================
// 2. DIAZOTIZATION & AZO COUPLING REACTION SIMULATOR
// =============================================================================

export interface DiazotizationOutcome {
  temperatureCelsius: number;
  diazoniumYieldPercent: number;
  phenolHydrolysisPercent: number; // Decomposition if T > 10°C
  nitrogenGasReleasedMl: number;
  stabilityStatusVi: 'STABLE_DIAZONIUM_COLD' | 'DECOMPOSING_WARM' | 'EXPLOSIVE_BOILING';
  statusDescriptionVi: string;
}

/**
 * Simulates diazotization of aromatic amine (Aniline + NaNO2 + 2HCl)
 * Temperature must be strictly maintained at 0-5°C.
 * If T > 10°C, benzenediazonium hydrolyzes: [Ar-N2+] + H2O -> Ar-OH + N2^ + H+
 */
export function simulateDiazotizationReaction(
  temperatureCelsius: number = 2.0,
  molesAniline: number = 0.1
): DiazotizationOutcome {
  const safeTemp = Math.max(-5, Math.min(60, temperatureCelsius));
  const safeMoles = Math.max(0.01, Math.min(1.0, molesAniline));

  let diazoniumYield = 98.0;
  let phenolHydrolysis = 2.0;
  let status: 'STABLE_DIAZONIUM_COLD' | 'DECOMPOSING_WARM' | 'EXPLOSIVE_BOILING' = 'STABLE_DIAZONIUM_COLD';
  let description = '';

  if (safeTemp <= 5) {
    diazoniumYield = Math.min(99.0, 95.0 + (5 - safeTemp) * 0.8);
    phenolHydrolysis = 100 - diazoniumYield;
    status = 'STABLE_DIAZONIUM_COLD';
    description = `Nhiệt độ ${safeTemp}°C (trong chậu nước đá): Muối benzenđiazoni clorua [C₆H₅-N₂⁺]Cl⁻ bền vững trong dung dịch nước, sẵn sàng cho phản ứng ghép đôi azo với hiệu suất đạt ${diazoniumYield.toFixed(1)}%.`;
  } else if (safeTemp <= 15) {
    const excess = safeTemp - 5;
    diazoniumYield = Math.max(20.0, 95.0 - excess * 7.5);
    phenolHydrolysis = 100 - diazoniumYield;
    status = 'DECOMPOSING_WARM';
    description = `Cảnh báo nhiệt độ ${safeTemp}°C: Liên kết C-N₂⁺ bị rung động nhiệt phá vỡ. Thủy phân sinh phenol và sủi bọt khí nitơ: [C₆H₅-N₂⁺] + H₂O ⟶ C₆H₅OH + N₂↑ (${phenolHydrolysis.toFixed(1)}% thất thoát).`;
  } else {
    diazoniumYield = Math.max(0, 20.0 - (safeTemp - 15) * 1.5);
    phenolHydrolysis = 100 - diazoniumYield;
    status = 'EXPLOSIVE_BOILING';
    description = `Nguy hiểm ${safeTemp}°C: Muối điazoni phân hủy nhiệt mãnh liệt! Toàn bộ chuyển hóa thành phenol và giải phóng dữ dội khí nitơ N₂↑ gây trào bình.`;
  }

  // Volume of N2 gas released: n(N2) = molesAniline * (phenolHydrolysis / 100)
  const molesN2 = safeMoles * (phenolHydrolysis / 100);
  const nitrogenGasReleasedMl = parseFloat(((molesN2 * 24.79 * 1000)).toFixed(1));

  return {
    temperatureCelsius: safeTemp,
    diazoniumYieldPercent: parseFloat(diazoniumYield.toFixed(1)),
    phenolHydrolysisPercent: parseFloat(phenolHydrolysis.toFixed(1)),
    nitrogenGasReleasedMl,
    stabilityStatusVi: status,
    statusDescriptionVi: description
  };
}

export interface AzoCouplingOutcome {
  targetDye: DyeProfile;
  couplingComponent: '2_NAPHTHOL_PHENOL' | 'DIMETHYLANILINE_AMINE';
  mediumPh: number;
  couplingYieldPercent: number;
  couplingSpeedVi: 'OPTIMAL_RAPID' | 'SLUGGISH_SLOW' | 'INACTIVE_BLOCKED';
  precipitateColorHex: string;
  chemicalExplanationVi: string;
}

/**
 * Simulates Azo Coupling:
 * - With Phenols (e.g. 2-naphthol): requires alkaline medium (pH 9-10) to form reactive phenoxide Ar-O-.
 *   At pH < 7, neutral phenol is poorly activated.
 * - With Amines (e.g. N,N-dimethylaniline): requires mildly acidic to neutral medium (pH 4-6).
 *   At pH < 3, amino group is protonated into -NH(CH3)2+ (deactivated meta-director).
 */
export function simulateAzoCoupling(
  couplingComponent: '2_NAPHTHOL_PHENOL' | 'DIMETHYLANILINE_AMINE' = '2_NAPHTHOL_PHENOL',
  mediumPh: number = 9.5
): AzoCouplingOutcome {
  const safePh = Math.max(1, Math.min(14, mediumPh));

  let couplingYield = 0;
  let speed: 'OPTIMAL_RAPID' | 'SLUGGISH_SLOW' | 'INACTIVE_BLOCKED' = 'SLUGGISH_SLOW';
  let targetDye = DYES_CATALOG[0]; // Sudan I default
  let explanation = '';

  if (couplingComponent === '2_NAPHTHOL_PHENOL') {
    targetDye = DYES_CATALOG.find(d => d.id === 'SUDAN_I') || DYES_CATALOG[0];

    if (safePh >= 8.5 && safePh <= 11.0) {
      couplingYield = Math.min(98, 88 + (10 - Math.abs(safePh - 9.5)) * 2);
      speed = 'OPTIMAL_RAPID';
      explanation = `pH ${safePh} (môi trường kiềm tối ưu): 2-Naphthol bị kiềm hóa chuyển thành ion naphtholate (Ar-O⁻) tích điện âm cực mạnh, kích hoạt nhân thơm thế ái điện tử với cation điazoni. Kết tủa phẩm màu Sudan I đỏ da cam xuất hiện ngay lập tức (hiệu suất ${couplingYield.toFixed(1)}%).`;
    } else if (safePh < 7.0) {
      couplingYield = Math.max(5, (safePh / 7.0) * 35);
      speed = 'INACTIVE_BLOCKED';
      explanation = `pH ${safePh} (môi trường axit): 2-Naphthol không tan và tồn tại ở dạng phân tử trung hòa Ar-OH, mật độ electron trên nhân thơm không đủ mạnh để phản ứng với tác nhân ái điện tử yếu như muối điazoni. Hiệu suất cực thấp (${couplingYield.toFixed(1)}%).`;
    } else {
      couplingYield = Math.max(25, 90 - (safePh - 11.0) * 20);
      speed = 'SLUGGISH_SLOW';
      explanation = `pH ${safePh} (kiềm quá mạnh): Cation điazoni bị ion OH⁻ tấn công chuyển thành ion điazotat [Ar-N=N-O⁻] không còn tính ái điện tử, làm giảm hiệu suất tạo phẩm màu.`;
    }
  } else {
    // Amine coupling (Methyl Orange)
    targetDye = DYES_CATALOG.find(d => d.id === 'METHYL_ORANGE') || DYES_CATALOG[1];

    if (safePh >= 3.5 && safePh <= 6.0) {
      couplingYield = Math.min(97, 85 + (5 - Math.abs(safePh - 4.8)) * 3);
      speed = 'OPTIMAL_RAPID';
      explanation = `pH ${safePh} (môi trường axit yếu tối ưu): Nhóm -N(CH₃)₂ giữ nguyên đôi electron tự do hoạt hóa mạnh vị trí para, trong khi muối điazoni không bị chuyển thành điazotat. Phản ứng ghép đôi tạo phẩm da cam metyl diễn ra thuận lợi nhất (${couplingYield.toFixed(1)}%).`;
    } else if (safePh < 3.0) {
      couplingYield = Math.max(2, safePh * 10);
      speed = 'INACTIVE_BLOCKED';
      explanation = `pH ${safePh} (axit quá mạnh): Nhóm amin bị proton hóa thành cation amoni -NH⁺(CH₃)₂, biến từ nhóm hoạt hóa mạnh thành nhóm phản hoạt hóa hút electron, nhân thơm hoàn toàn không phản ứng với muối điazoni.`;
    } else {
      couplingYield = Math.max(30, 90 - (safePh - 6.0) * 12);
      speed = 'SLUGGISH_SLOW';
      explanation = `pH ${safePh} (môi trường kiềm): Cation điazoni chuyển dần sang điazotat trơ, tốc độ ghép đôi chậm lại rõ rệt.`;
    }
  }

  return {
    targetDye,
    couplingComponent,
    mediumPh: safePh,
    couplingYieldPercent: parseFloat(couplingYield.toFixed(1)),
    couplingSpeedVi: speed,
    precipitateColorHex: targetDye.complementaryObservedColorHex,
    chemicalExplanationVi: explanation
  };
}

// =============================================================================
// 3. TEXTILE WASTEWATER FENTON OXIDATION DECOLORIZATION
// =============================================================================

export interface FentonReactionStep {
  minute: number;
  residualDyeConcentrationPpm: number;
  decolorizationPercent: number; // 0 to 100%
  residualCodMgPerL: number; // Chemical Oxygen Demand
  observedLiquidColorHex: string;
}

export interface FentonTreatmentResult {
  initialDyePpm: number;
  fe2PlusMmolPerL: number;
  h2o2MmolPerL: number;
  phValue: number;
  isOptimalPh: boolean; // pH 2.8 - 3.5 is strictly optimal for Fenton
  reactionDurationMinutes: number;
  finalDecolorizationPercent: number;
  finalCodRemovalPercent: number;
  qcvn13Compliant: boolean; // Vietnam National Technical Regulation on Textile Effluent
  trajectory: FentonReactionStep[];
  processSummaryVi: string;
}

/**
 * Simulates Advanced Oxidation Process (AOP) Fenton decolorization of dye effluent:
 * Fe2+ + H2O2 -> Fe3+ + *OH (hydroxyl radical, E0 = +2.8V) + OH-
 * Hydroxyl radical oxidizes the -N=N- azo chromophore bonds into harmless organic acids, CO2, H2O.
 */
export function simulateFentonDecolorization(
  initialDyePpm: number = 200,
  fe2PlusMmolPerL: number = 1.5,
  h2o2MmolPerL: number = 15.0,
  phValue: number = 3.0,
  durationMinutes: number = 45
): FentonTreatmentResult {
  const safePpm = Math.max(10, Math.min(1000, initialDyePpm));
  const safeFe = Math.max(0.1, Math.min(10, fe2PlusMmolPerL));
  const safeH2O2 = Math.max(1, Math.min(100, h2o2MmolPerL));
  const safePh = Math.max(1.5, Math.min(10.0, phValue));
  const safeTime = Math.max(5, Math.min(120, durationMinutes));

  // Optimal pH for Fenton is strictly 2.8 - 3.5
  // If pH < 2.5: [Fe(H2O)6]2+ forms slowly, H2O2 forms stable H3O2+
  // If pH > 4.0: Fe3+ precipitates as Fe(OH)3 catalyst deactivated!
  let phEfficiencyFactor = 1.0;
  if (safePh >= 2.8 && safePh <= 3.5) {
    phEfficiencyFactor = 1.0;
  } else if (safePh < 2.8) {
    phEfficiencyFactor = Math.max(0.15, 1.0 - (2.8 - safePh) * 0.6);
  } else {
    // pH > 3.5
    phEfficiencyFactor = Math.max(0.05, 1.0 - (safePh - 3.5) * 0.35);
  }

  // Rate constant k_fenton (min^-1)
  const k_fenton = 0.08 * (safeFe / 1.5) * Math.sqrt(safeH2O2 / 15) * phEfficiencyFactor;

  const trajectory: FentonReactionStep[] = [];
  const initialCod = safePpm * 1.8; // COD typically ~1.8x dye ppm

  for (let m = 0; m <= safeTime; m += 5) {
    const residualConc = safePpm * Math.exp(-k_fenton * m);
    const decolorization = ((safePpm - residualConc) / safePpm) * 100;
    const residualCod = initialCod * (0.3 + 0.7 * Math.exp(-k_fenton * 0.7 * m));

    // Color transition from vibrant red/orange towards crystal clear light straw/water
    let colorHex = '#dc2626'; // initial deep red
    if (decolorization > 95) {
      colorHex = '#f8fafc'; // almost clear water
    } else if (decolorization > 80) {
      colorHex = '#fef08a'; // faint yellow straw
    } else if (decolorization > 50) {
      colorHex = '#fca5a5'; // pale pinkish
    } else if (decolorization > 20) {
      colorHex = '#ef4444';
    }

    trajectory.push({
      minute: m,
      residualDyeConcentrationPpm: parseFloat(residualConc.toFixed(1)),
      decolorizationPercent: parseFloat(decolorization.toFixed(1)),
      residualCodMgPerL: parseFloat(residualCod.toFixed(1)),
      observedLiquidColorHex: colorHex
    });
  }

  const finalStep = trajectory[trajectory.length - 1];
  const finalDecolorizationPercent = finalStep.decolorizationPercent;
  const finalCodRemovalPercent = parseFloat((((initialCod - finalStep.residualCodMgPerL) / initialCod) * 100).toFixed(1));

  // Vietnam Standard QCVN 13-MT:2015/BTNMT for textile effluent:
  // Color < 50 Pt-Co (requires > 90% decolorization), COD < 75 mg/L
  const qcvn13Compliant = finalDecolorizationPercent >= 92.0 && finalStep.residualCodMgPerL <= 150;

  const processSummaryVi = `Quá trình oxy hóa nâng cao (AOP) Fenton xử lý nước thải phẩm màu azo:
- Gốc tự do hydroxyl (•OH) sinh ra theo phản ứng: Fe²⁺ + H₂O₂ ⟶ Fe³⁺ + •OH + OH⁻ (E° = +2.8V).
- Gốc •OH tấn công vào liên kết đôi azo (-N=N-), cắt đứt hệ liên hợp quang học π thành các mảnh axit hữu cơ nhỏ không màu.
- Độ pH ${safePh} ${safePh >= 2.8 && safePh <= 3.5 ? '(ĐẠT CHUẨN TỐI ƯU 2.8 - 3.5)' : '(KHÔNG TỐI ƯU, Fe bị kết tủa hoặc H2O2 mất hoạt tính)'}.
- Hiệu suất khử màu đạt ${finalDecolorizationPercent}% sau ${safeTime} phút (${qcvn13Compliant ? 'ĐẠT QUY CHUẨN XẢ THẢI QCVN 13-MT:2015/BTNMT' : 'CHƯA ĐẠT CHUẨN, CẦN ĐIỀU CHỈNH PH HOẶC TĂNG LIỀU H2O2'}).`;

  return {
    initialDyePpm: safePpm,
    fe2PlusMmolPerL: safeFe,
    h2o2MmolPerL: safeH2O2,
    phValue: safePh,
    isOptimalPh: safePh >= 2.8 && safePh <= 3.5,
    reactionDurationMinutes: safeTime,
    finalDecolorizationPercent,
    finalCodRemovalPercent,
    qcvn13Compliant,
    trajectory,
    processSummaryVi
  };
}
