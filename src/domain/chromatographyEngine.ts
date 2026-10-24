// src/domain/chromatographyEngine.ts
// ============================================================================
// ELEMENTA THIN-LAYER & COLUMN CHROMATOGRAPHY ENGINE
// Standards: IUPAC Compendium of Analytical Nomenclature (Orange Book) &
// Vietnam GDPT 2018 Chemistry 11 (Tách biệt và tinh chế bằng sắc kí bản mỏng & sắc kí cột)
// Covers: Retardation Factor (Rf), Snyder Elutropic Series, Van Deemter Column Efficiency,
// Chromatographic Peak Resolution (Rs), Normal-Phase vs Reverse-Phase (RP-HPLC) Principles.
// ============================================================================

export type StationaryPhaseType =
  | 'SILICA_GEL'
  | 'ALUMINA'
  | 'C18_REVERSE_PHASE'
  | 'CELLULOSE_PAPER';

export interface StationaryPhase {
  id: string;
  name: string;
  nameVI: string;
  type: StationaryPhaseType;
  polarity: 'POLAR' | 'NON_POLAR' | 'MODERATE';
  functionalGroupVI: string;
  particleSizeUm: number;
  descriptionVI: string;
  interactionMechanismVI: string;
}

export interface MobilePhaseSolvent {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  snyderElutropicIndex: number; // Snyder epsilon^0 on alumina/silica
  dielectricConstant: number;
  boilingPointC: number;
  polarityCategory: 'NON_POLAR' | 'LOW_POLAR' | 'MODERATE_POLAR' | 'HIGHLY_POLAR';
  descriptionVI: string;
}

export interface ChromatographyCompound {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  colorRgb: string;
  polarityRank: number; // 1 (most non-polar) to 10 (most polar)
  uvActive254nm: boolean;
  rfBaseNormalPhase: number; // Base Rf on silica with moderate eluent (hexane:EtOAc 7:3)
  rfBaseReversePhase: number; // Base Rf on C18 with polar eluent (water:MeOH 3:7)
  descriptionVI: string;
}

export interface ChromatographyMixture {
  id: string;
  titleVI: string;
  categoryVI: string;
  recommendedStationaryId: string;
  recommendedEluentVI: string;
  compounds: ChromatographyCompound[];
  educationalSignificanceVI: string;
  visualSpotDiameterMm: number;
}

export interface VanDeemterParameters {
  eddyDiffusionA: number; // A term (micrometers): 2 * lambda * dp
  longitudinalDiffusionB: number; // B term (micrometers * mm/s): 2 * gamma * Dm
  massTransferResistanceC: number; // C term (micrometers / (mm/s)): Cs + Cm
}

export interface VanDeemterDataPoint {
  velocityMmPerS: number;
  hetpUm: number;
  eddyA: number;
  longitudinalBOverU: number;
  massTransferCTimesU: number;
}

export interface PeakResolutionResult {
  retentionTime1Min: number;
  retentionTime2Min: number;
  peakWidth1Min: number;
  peakWidth2Min: number;
  resolutionRs: number;
  isBaselineResolved: boolean; // Rs >= 1.5
  separationQualityVI: string;
  purityEstimatePercent: number;
}

// ----------------------------------------------------------------------------
// STATIONARY PHASES CATALOG
// ----------------------------------------------------------------------------
export const STATIONARY_PHASES: Record<string, StationaryPhase> = {
  silica_gel: {
    id: 'silica_gel',
    name: 'Silica Gel 60',
    nameVI: 'Pha tĩnh Silicagel (SiO2·xH2O)',
    type: 'SILICA_GEL',
    polarity: 'POLAR',
    functionalGroupVI: 'Nhóm Silanol tự do (-Si-OH) có tính axit yếu và phân cực cao',
    particleSizeUm: 40,
    descriptionVI:
      'Chất hấp phụ phổ biến nhất trong sắc kí pha thường (Normal Phase). Giữ chặt các hợp chất phân cực mạnh có khả năng tạo liên kết hiđro.',
    interactionMechanismVI: 'Hấp phụ phân cực qua liên kết hiđro và tương tác lưỡng cực - lưỡng cực.',
  },

  c18_reverse_phase: {
    id: 'c18_reverse_phase',
    name: 'C18 Octadecylsilane (RP-HPLC)',
    nameVI: 'Pha đảo C18 (Octadecylsilane)',
    type: 'C18_REVERSE_PHASE',
    polarity: 'NON_POLAR',
    functionalGroupVI: 'Mạch hiđrocacbon no C18 alkyl liên kết cộng hóa trị với bề mặt silicagel',
    particleSizeUm: 5,
    descriptionVI:
      'Pha tĩnh tiêu chuẩn vàng trong sắc kí lỏng hiệu năng cao pha đảo (RP-HPLC). Tách dựa trên tính kỵ nước (hydrophobic interaction).',
    interactionMechanismVI: 'Tương tác kỵ nước (phân tán London) giữa chuỗi alkyl C18 và chất tan không phân cực.',
  },

  alumina_neutral: {
    id: 'alumina_neutral',
    name: 'Neutral Aluminum Oxide',
    nameVI: 'Nhôm oxit trung tính (Al2O3)',
    type: 'ALUMINA',
    polarity: 'POLAR',
    functionalGroupVI: 'Bề mặt tinh thể Al-O phối trí với hoạt tính bề mặt trung tính',
    particleSizeUm: 63,
    descriptionVI:
      'Thích hợp tách các hợp chất nhạy cảm với axit mà silicagel có thể làm phân hủy hoặc đồng phân hóa.',
    interactionMechanismVI: 'Hấp phụ lưỡng cực phối trí và liên kết hiđro bề mặt.',
  },

  cellulose_paper: {
    id: 'cellulose_paper',
    name: 'Whatman No. 1 Chromatography Paper',
    nameVI: 'Giấy sắc kí xenlulozơ (Sắc kí giấy)',
    type: 'CELLULOSE_PAPER',
    polarity: 'POLAR',
    functionalGroupVI: 'Sợi xenlulozơ liên kết với lớp màng nước hấp phụ cố định',
    particleSizeUm: 150,
    descriptionVI:
      'Pha tĩnh dùng trong sắc kí giấy phân bố kinh điển trong phòng thí nghiệm trường phổ thông.',
    interactionMechanismVI: 'Cơ chế phân bố lỏng - lỏng giữa nước liên kết trong sợi xenlulozơ và pha động hữu cơ.',
  },
};

// ----------------------------------------------------------------------------
// MOBILE PHASE SOLVENTS CATALOG (SNYDER ELUTROPIC SERIES)
// ----------------------------------------------------------------------------
export const MOBILE_PHASE_SOLVENTS: Record<string, MobilePhaseSolvent> = {
  hexane: {
    id: 'hexane',
    name: 'n-Hexane',
    nameVI: 'Hexan (Pha động không phân cực)',
    formula: 'C6H14',
    snyderElutropicIndex: 0.00,
    dielectricConstant: 1.88,
    boilingPointC: 68.7,
    polarityCategory: 'NON_POLAR',
    descriptionVI: 'Dung môi rửa giải yếu nhất trong pha thường. Không hòa tan và không rửa giải các chất phân cực.',
  },

  toluene: {
    id: 'toluene',
    name: 'Toluene',
    nameVI: 'Toluen',
    formula: 'C7H8',
    snyderElutropicIndex: 0.22,
    dielectricConstant: 2.38,
    boilingPointC: 110.6,
    polarityCategory: 'LOW_POLAR',
    descriptionVI: 'Dung môi thơm phân cực yếu, hòa tan tốt các hợp chất thơm đa vòng.',
  },

  dichloromethane: {
    id: 'dichloromethane',
    name: 'Dichloromethane (DCM)',
    nameVI: 'Điclometan',
    formula: 'CH2Cl2',
    snyderElutropicIndex: 0.30,
    dielectricConstant: 8.93,
    boilingPointC: 39.6,
    polarityCategory: 'LOW_POLAR',
    descriptionVI: 'Dung môi có sức rửa giải trung bình thấp, bay hơi rất nhanh trên bản mỏng TLC.',
  },

  diethyl_ether: {
    id: 'diethyl_ether',
    name: 'Diethyl Ether',
    nameVI: 'Đietyl ete',
    formula: '(C2H5)2O',
    snyderElutropicIndex: 0.38,
    dielectricConstant: 4.33,
    boilingPointC: 34.6,
    polarityCategory: 'MODERATE_POLAR',
    descriptionVI: 'Có khả năng nhận liên kết hiđro, rửa giải tốt các este và xeton.',
  },

  ethyl_acetate: {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate (EtOAc)',
    nameVI: 'Etyl axetat',
    formula: 'CH3COOC2H5',
    snyderElutropicIndex: 0.48,
    dielectricConstant: 6.02,
    boilingPointC: 77.1,
    polarityCategory: 'MODERATE_POLAR',
    descriptionVI: 'Dung môi phân cực trung bình thông dụng nhất kết hợp cùng Hexan (hệ Hexan : EtOAc) để điều chỉnh Rf.',
  },

  acetone: {
    id: 'acetone',
    name: 'Acetone',
    nameVI: 'Axeton',
    formula: 'CH3COCH3',
    snyderElutropicIndex: 0.53,
    dielectricConstant: 20.7,
    boilingPointC: 56.1,
    polarityCategory: 'MODERATE_POLAR',
    descriptionVI: 'Dung môi phân cực mạnh hơn etyl axetat, trộn lẫn hoàn toàn với nước.',
  },

  ethanol: {
    id: 'ethanol',
    name: 'Ethanol',
    nameVI: 'Etanol (Cồn tinh khiết)',
    formula: 'C2H5OH',
    snyderElutropicIndex: 0.68,
    dielectricConstant: 24.55,
    boilingPointC: 78.4,
    polarityCategory: 'HIGHLY_POLAR',
    descriptionVI: 'Dung môi cho liên kết hiđro mạnh mẽ, giải phóng hầu hết các chất bám trên silicagel.',
  },

  methanol: {
    id: 'methanol',
    name: 'Methanol',
    nameVI: 'Metanol',
    formula: 'CH3OH',
    snyderElutropicIndex: 0.73,
    dielectricConstant: 32.7,
    boilingPointC: 64.7,
    polarityCategory: 'HIGHLY_POLAR',
    descriptionVI: 'Dung môi phân cực mạnh, dùng phổ biến trong pha động HPLC pha đảo kết hợp nước.',
  },

  water: {
    id: 'water',
    name: 'Water (Milli-Q)',
    nameVI: 'Nước siêu sạch',
    formula: 'H2O',
    snyderElutropicIndex: 0.85,
    dielectricConstant: 78.4,
    boilingPointC: 100.0,
    polarityCategory: 'HIGHLY_POLAR',
    descriptionVI: 'Sức rửa giải mạnh nhất trên pha thường, nhưng là dung môi rửa giải yếu nhất trên pha đảo C18.',
  },
};

// ----------------------------------------------------------------------------
// BENCHMARK CHROMATOGRAPHY MIXTURES CATALOG
// ----------------------------------------------------------------------------
export const CHROMATOGRAPHY_MIXTURES: Record<string, ChromatographyMixture> = {
  leaf_pigments: {
    id: 'leaf_pigments',
    titleVI: 'Sắc Tố Lá Cây (Diệp Lục & Carotenoid)',
    categoryVI: 'Hợp Chất Tự Nhiên & Thực Vật (Hóa 11)',
    recommendedStationaryId: 'silica_gel',
    recommendedEluentVI: 'Petroleum ether : Axeton (9 : 1 thể tích)',
    educationalSignificanceVI:
      'Thí nghiệm thực hành kinh điển trong chương trình Hóa học và Sinh học 11. Minh chứng beta-caroten hoàn toàn không phân cực nên chạy nhanh nhất theo vết dung môi (Rf ~ 0.95), trong khi chlorophyll phân cực hơn do chứa nhân porphyrin và nhóm este.',
    visualSpotDiameterMm: 4.5,
    compounds: [
      {
        id: 'carotene',
        name: 'beta-Carotene',
        nameVI: 'beta-Caroten (Sắc tố da cam)',
        formula: 'C40H56',
        colorRgb: '#ea580c', // Bright orange
        polarityRank: 1, // Extremely non-polar
        uvActive254nm: true,
        rfBaseNormalPhase: 0.95,
        rfBaseReversePhase: 0.05,
        descriptionVI: 'Hiđrocacbon không no mạch dài gồm 11 liên kết đôi liên hợp, hoàn toàn không phân cực.',
      },
      {
        id: 'xanthophyll',
        name: 'Lutein (Xanthophyll)',
        nameVI: 'Xantophyl (Sắc tố vàng)',
        formula: 'C40H56O2',
        colorRgb: '#eab308', // Yellow
        polarityRank: 4,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.72,
        rfBaseReversePhase: 0.28,
        descriptionVI: 'Dẫn xuất chứa 2 nhóm -OH ở hai đầu mạch carotene, làm tăng đáng kể độ phân cực.',
      },
      {
        id: 'chlorophyll_a',
        name: 'Chlorophyll a',
        nameVI: 'Chất diệp lục a (Xanh lam đậm)',
        formula: 'C55H72MgN4O5',
        colorRgb: '#15803d', // Deep blue-green
        polarityRank: 6,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.48,
        rfBaseReversePhase: 0.52,
        descriptionVI: 'Sắc tố quang hợp chính của lá cây, chứa nhóm metyl -CH3 ở vị trí C7 của nhân porphyrin.',
      },
      {
        id: 'chlorophyll_b',
        name: 'Chlorophyll b',
        nameVI: 'Chất diệp lục b (Xanh lục ngả vàng)',
        formula: 'C55H70MgN4O6',
        colorRgb: '#84cc16', // Yellow-green
        polarityRank: 7,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.35,
        rfBaseReversePhase: 0.65,
        descriptionVI: 'Chứa nhóm formyl -CHO ở vị trí C7, phân cực hơn diệp lục a nên bị silicagel giữ chặt hơn (Rf thấp hơn).',
      },
    ],
  },

  analgesic_drugs: {
    id: 'analgesic_drugs',
    titleVI: 'Hỗn Hợp Dược Phẩm Giảm Đau (Aspirin, Paracetamol, Cafein)',
    categoryVI: 'Hóa Dược & Phân Tích Thuốc (Hóa 11 - 12)',
    recommendedStationaryId: 'silica_gel',
    recommendedEluentVI: 'Etyl axetat : Hexan : Axit axetic (60 : 40 : 1 thể tích)',
    educationalSignificanceVI:
      'Bài toán thực tế kiểm nghiệm tạp chất và định tính thành phần viên thuốc giảm đau hạ sốt tổng hợp. Vết sắc kí không màu được phát hiện dưới đèn tử ngoại UV 254 nm nhờ hiện tượng dập tắt huỳnh quang (quenching).',
    visualSpotDiameterMm: 5.0,
    compounds: [
      {
        id: 'aspirin',
        name: 'Aspirin (Acetylsalicylic Acid)',
        nameVI: 'Aspirin (Axit axetylsalixylic)',
        formula: 'C9H8O4',
        colorRgb: '#38bdf8', // Light blue spot under UV
        polarityRank: 5,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.62,
        rfBaseReversePhase: 0.38,
        descriptionVI: 'Chứa nhóm cacboxyl và este axetat, di chuyển ở vùng trung bình trên bản mỏng silicagel.',
      },
      {
        id: 'paracetamol',
        name: 'Paracetamol (Acetaminophen)',
        nameVI: 'Paracetamol (Axetaminophen)',
        formula: 'C8H9NO2',
        colorRgb: '#a855f7', // Purple under UV
        polarityRank: 7,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.40,
        rfBaseReversePhase: 0.60,
        descriptionVI: 'Chứa nhóm phenol -OH và amit -NHCOCH3, tạo liên kết hiđro mạnh với silicagel nên Rf thấp hơn aspirin.',
      },
      {
        id: 'caffeine',
        name: 'Caffeine',
        nameVI: 'Cafein',
        formula: 'C8H10N4O2',
        colorRgb: '#ec4899', // Pink spot under UV
        polarityRank: 8,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.22,
        rfBaseReversePhase: 0.78,
        descriptionVI: 'Alcaloid có tính bazơ yếu với nhiều nguyên tử nitơ tạo liên kết phối trí với silicagel axit, Rf rất thấp.',
      },
    ],
  },

  food_dyes: {
    id: 'food_dyes',
    titleVI: 'Phẩm Màu Thực Phẩm Nhân Tạo (FD&C Dyes)',
    categoryVI: 'Phân Tích Thực Phẩm & An Toàn Vệ Sinh (Hóa 11)',
    recommendedStationaryId: 'silica_gel',
    recommendedEluentVI: 'n-Butanol : Etanol : Nước : NH3 25% (4 : 4 : 2 : 1 thể tích)',
    educationalSignificanceVI:
      'Tách các phẩm màu sunfonat tan trong nước dùng trong bánh kẹo nước giải khát. Các anion sunfonat (-SO3⁻) tương tác điện ly mạnh mẽ cần hệ pha động phân cực chứa amoniac để rửa giải.',
    visualSpotDiameterMm: 4.0,
    compounds: [
      {
        id: 'tartrazine',
        name: 'Tartrazine (FD&C Yellow No. 5)',
        nameVI: 'Tartrazin (Vàng số 5)',
        formula: 'C16H9N4Na3O9S2',
        colorRgb: '#facc15', // Vibrant Yellow
        polarityRank: 9,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.30,
        rfBaseReversePhase: 0.70,
        descriptionVI: 'Phẩm màu azo chứa 3 nhóm -SO3⁻Na⁺ và vòng pyrazole, cực kỳ phân cực tan vô hạn trong nước.',
      },
      {
        id: 'allura_red',
        name: 'Allura Red AC (FD&C Red No. 40)',
        nameVI: 'Allura Đỏ AC (Đỏ số 40)',
        formula: 'C18H14N2Na2O8S2',
        colorRgb: '#ef4444', // Brilliant Red
        polarityRank: 8,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.48,
        rfBaseReversePhase: 0.52,
        descriptionVI: 'Phẩm màu azo đỏ chứa 2 nhóm sunfonat natri và 1 nhóm metoxy.',
      },
      {
        id: 'brilliant_blue',
        name: 'Brilliant Blue FCF (FD&C Blue No. 1)',
        nameVI: 'Xanh dương Brilliant FCF (Xanh số 1)',
        formula: 'C37H34N2Na2O9S3',
        colorRgb: '#2563eb', // Royal Blue
        polarityRank: 7,
        uvActive254nm: true,
        rfBaseNormalPhase: 0.65,
        rfBaseReversePhase: 0.35,
        descriptionVI: 'Hợp chất triarylmethane cồng kềnh với 3 gốc sunfonat và nhân thơm kỵ nước lớn.',
      },
    ],
  },
};

// ----------------------------------------------------------------------------
// DOMAIN CHROMATOGRAPHY CALCULATIONS & EQUATIONS
// ----------------------------------------------------------------------------

/**
 * Calculates Retardation Factor (Rf):
 * Rf = distance traveled by solute / distance traveled by solvent front
 * Strict physical invariant: 0.00 <= Rf <= 1.00
 */
export function calculateRf(
  distanceSoluteMm: number,
  distanceSolventFrontMm: number
): number {
  if (distanceSolventFrontMm <= 0 || distanceSoluteMm <= 0) {
    return 0.0;
  }
  if (distanceSoluteMm >= distanceSolventFrontMm) {
    return 1.0;
  }
  const rf = distanceSoluteMm / distanceSolventFrontMm;
  return Number(rf.toFixed(3));
}

/**
 * Calculates dynamic Rf on TLC as a function of eluent polarity ratio:
 * In normal phase: higher eluent polarity (fraction of polar solvent e.g. EtOAc in Hexane)
 * drives Rf higher because the mobile phase competes more aggressively for silanol binding sites:
 * Rf(x) = Rf_base · [1 + alpha · (x - 0.30)] bounded in [0.02, 0.98]
 * In reverse phase: higher water content (polar) drives non-polar solutes to stick to C18 (Rf decreases).
 */
export function calculateDynamicRf(
  compound: ChromatographyCompound,
  polarEluentFraction: number, // 0.0 (pure hexane/water) to 1.0 (pure EtOAc/MeOH)
  isReversePhase = false
): number {
  const fraction = Math.max(0.0, Math.min(1.0, polarEluentFraction));

  if (!isReversePhase) {
    // Normal Phase (Silica): Polar eluent increases Rf
    const base = compound.rfBaseNormalPhase;
    // Modifier: delta around 0.30 standard reference
    const delta = fraction - 0.30;
    const dynamic = base * Math.pow(10, delta * 1.2);
    return Number(Math.max(0.03, Math.min(0.97, dynamic)).toFixed(3));
  } else {
    // Reverse Phase (C18): More organic modifier (MeOH/ACN) increases Rf
    // polarEluentFraction here represents organic modifier (0 = pure water, 1 = pure MeOH)
    const base = compound.rfBaseReversePhase;
    const delta = fraction - 0.70;
    const dynamic = base * Math.pow(10, delta * 1.4);
    return Number(Math.max(0.03, Math.min(0.97, dynamic)).toFixed(3));
  }
}

/**
 * Van Deemter Column Efficiency Equation:
 * H = A + B/u + C·u
 * where H is Height Equivalent to a Theoretical Plate (HETP in micrometers),
 * u is mobile phase linear velocity (mm/s).
 * Optimal velocity: u_opt = sqrt(B / C)
 * Minimum plate height: H_min = A + 2·sqrt(B·C)
 */
export function calculateVanDeemterEfficiency(
  params: VanDeemterParameters,
  minVelocity = 0.2,
  maxVelocity = 5.0,
  steps = 25
): {
  optimalVelocityMmPerS: number;
  minimumHetpUm: number;
  theoreticalPlatesPerMeter: number;
  curveData: VanDeemterDataPoint[];
} {
  const A = Math.max(0.1, params.eddyDiffusionA);
  const B = Math.max(0.1, params.longitudinalDiffusionB);
  const C = Math.max(0.01, params.massTransferResistanceC);

  const uOpt = Math.sqrt(B / C);
  const hMin = A + 2 * Math.sqrt(B * C);
  // Theoretical plates N = L / H = 10^6 micrometers / H_min
  const nPerMeter = Math.round(1_000_000 / hMin);

  const curveData: VanDeemterDataPoint[] = [];
  const deltaU = (maxVelocity - minVelocity) / (steps - 1);

  for (let i = 0; i < steps; i++) {
    const u = minVelocity + i * deltaU;
    const bOverU = B / u;
    const cTimesU = C * u;
    const h = A + bOverU + cTimesU;

    curveData.push({
      velocityMmPerS: Number(u.toFixed(2)),
      hetpUm: Number(h.toFixed(2)),
      eddyA: Number(A.toFixed(2)),
      longitudinalBOverU: Number(bOverU.toFixed(2)),
      massTransferCTimesU: Number(cTimesU.toFixed(2)),
    });
  }

  return {
    optimalVelocityMmPerS: Number(uOpt.toFixed(2)),
    minimumHetpUm: Number(hMin.toFixed(2)),
    theoreticalPlatesPerMeter: nPerMeter,
    curveData,
  };
}

/**
 * Chromatographic Peak Resolution (Rs):
 * Rs = 2 · (tR2 - tR1) / (w1 + w2)
 * Baseline resolution threshold: Rs >= 1.5 (99.7% quantitative separation)
 */
export function calculatePeakResolution(
  retentionTime1Min: number,
  retentionTime2Min: number,
  peakWidth1Min: number,
  peakWidth2Min: number
): PeakResolutionResult {
  const t1 = Math.min(retentionTime1Min, retentionTime2Min);
  const t2 = Math.max(retentionTime1Min, retentionTime2Min);
  const w1 = Math.max(0.05, peakWidth1Min);
  const w2 = Math.max(0.05, peakWidth2Min);

  const deltaT = t2 - t1;
  const avgW = (w1 + w2) / 2;
  const rs = deltaT / avgW;

  let qualityVI = 'Tách hoàn toàn ở đường nền (Baseline resolved, định lượng > 99.7%)';
  let purity = 99.8;

  if (rs < 0.6) {
    qualityVI = 'Mũi sắc kí chập nặng, không thể tách riêng (Co-eluting, độ tinh khiết < 70%)';
    purity = 65.0;
  } else if (rs < 1.0) {
    qualityVI = 'Tách một phần, chân mũi giao nhau rõ rệt (Incomplete separation, độ tinh khiết ~ 85%)';
    purity = 85.0;
  } else if (rs < 1.5) {
    qualityVI = 'Gần chạm đường nền (Acceptable separation, độ tinh khiết ~ 98%)';
    purity = 98.0;
  }

  return {
    retentionTime1Min: Number(t1.toFixed(2)),
    retentionTime2Min: Number(t2.toFixed(2)),
    peakWidth1Min: Number(w1.toFixed(2)),
    peakWidth2Min: Number(w2.toFixed(2)),
    resolutionRs: Number(rs.toFixed(2)),
    isBaselineResolved: rs >= 1.5,
    separationQualityVI: qualityVI,
    purityEstimatePercent: purity,
  };
}

/**
 * Simulates preparative Column Chromatography fraction elution volumes:
 * Solute retention volume V_R = V_0 · (1 + k')
 * where k' = (1 - Rf) / Rf
 */
export function calculateColumnElutionVolumes(
  columnVoidVolumeMl: number,
  compoundsWithRf: { compound: ChromatographyCompound; rf: number }[]
): {
  compoundId: string;
  compoundNameVI: string;
  colorRgb: string;
  rf: number;
  retentionFactorKPrime: number;
  elutionVolumeMl: number;
  elutionOrder: number;
}[] {
  const v0 = Math.max(5.0, columnVoidVolumeMl);

  const results = compoundsWithRf.map((item) => {
    const rf = Math.max(0.05, Math.min(0.95, item.rf));
    const kPrime = (1.0 - rf) / rf;
    const vr = v0 * (1.0 + kPrime);

    return {
      compoundId: item.compound.id,
      compoundNameVI: item.compound.nameVI,
      colorRgb: item.compound.colorRgb,
      rf: Number(rf.toFixed(3)),
      retentionFactorKPrime: Number(kPrime.toFixed(2)),
      elutionVolumeMl: Number(vr.toFixed(1)),
      elutionOrder: 0,
    };
  });

  // Sort by elution volume ascending (fastest Rf elutes first)
  results.sort((a, b) => a.elutionVolumeMl - b.elutionVolumeMl);
  results.forEach((r, idx) => {
    r.elutionOrder = idx + 1;
  });

  return results;
}

/**
 * Matches card to a relevant chromatography mixture or substance
 */
export function getMatchingChromatographyMixture(card: { id?: string; name?: string }): ChromatographyMixture | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  for (const mix of Object.values(CHROMATOGRAPHY_MIXTURES)) {
    if (
      idLower.includes(mix.id.toLowerCase()) ||
      nameLower.includes(mix.titleVI.toLowerCase()) ||
      mix.titleVI.toLowerCase().includes(nameLower) ||
      nameLower.includes(mix.categoryVI.toLowerCase())
    ) {
      return mix;
    }
    for (const comp of mix.compounds) {
      const cName = comp.name.toLowerCase();
      const cNameVI = comp.nameVI.toLowerCase();
      const cFormula = comp.formula.toLowerCase();
      if (
        nameLower.includes(cName) ||
        cName.includes(nameLower) ||
        nameLower.includes(cNameVI) ||
        cNameVI.includes(nameLower) ||
        nameLower.includes(comp.id.toLowerCase()) ||
        nameLower.includes(cFormula) ||
        (nameLower.includes('chlorophyll') && comp.id.includes('chlorophyll')) ||
        (nameLower.includes('carotene') && comp.id.includes('carotene')) ||
        (nameLower.includes('aspirin') && comp.id.includes('aspirin')) ||
        (nameLower.includes('paracetamol') && comp.id.includes('paracetamol')) ||
        (nameLower.includes('caffeine') && comp.id.includes('caffeine'))
      ) {
        return mix;
      }
    }
  }

  // Generic keyword match
  if (nameLower.includes('sắc kí') || nameLower.includes('chromatography') || nameLower.includes('bản mỏng') || nameLower.includes('tlc')) {
    return CHROMATOGRAPHY_MIXTURES.leaf_pigments;
  }

  return null;
}
