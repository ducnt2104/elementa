// src/domain/recrystallizationEngine.ts
// ============================================================================
// ELEMENTA RECRYSTALLIZATION, SOLUBILITY CURVES & MELTING POINT PURITY ENGINE
// Standards: IUPAC Compendium of Analytical Nomenclature & Vietnam GDPT 2018 Chemistry 11
// Covers: Temperature-dependent Solubility Curves S(T), Solvent Selection Criteria,
// Theoretical Crystallization Yield, Cooling Rate vs Crystal Morphology (Slow vs Shock Cooling),
// Melting Point Depression & Range (Pure <= 1.0 deg C vs Impure Broad), Mixed Melting Point Verification.
// ============================================================================

export interface RecrystallizationSolvent {
  id: string;
  name: string;
  nameVI: string;
  boilingPointC: number;
  freezingPointC: number;
  polarityCategory: 'POLAR_PROTIC' | 'POLAR_APROTIC' | 'NON_POLAR';
  dielectricConstant: number;
  safetySummaryVI: string;
}

export interface SolubilityDataPoint {
  temperatureC: number;
  solubilityGPer100G: number; // grams solute per 100 grams solvent
}

export interface RecrystallizationSubstance {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  molecularWeight: number;
  meltingPointPureMinC: number;
  meltingPointPureMaxC: number;
  enthalpyOfFusionKjPerMol: number;
  cryoscopicConstantKf: number; // deg C * kg / mol (for freezing/melting depression)
  idealSolventId: string;
  solubilityCurve: SolubilityDataPoint[];
  crystalHabitVI: string; // e.g. hình kim lấp lánh (needles), hình lăng trụ (prisms)
  commonImpuritiesVI: string[];
  descriptionVI: string;
}

export interface RecrystallizationProtocol {
  substanceId: string;
  solventId: string;
  crudeMassG: number;
  initialPurityPercent: number; // e.g. 90.0%
  solventVolumeMl: number;
  dissolutionTempC: number; // e.g. 95 C (near boiling)
  crystallizationTempC: number; // e.g. 4 C (ice bath)
  coolingMode: 'SLOW_CONTROLLED' | 'SHOCK_ICE_BATH';
  useActivatedCharcoal: boolean; // Norit A for colored impurities
}

export interface RecrystallizationYieldResult {
  pureSubstanceInitialG: number;
  impurityInitialG: number;
  massDissolvedAtHotG: number;
  massRemainingSolubleAtColdG: number;
  recoveredCrystalsMassG: number;
  theoreticalRecoveryPercent: number; // (recovered / pure_initial) * 100
  actualYieldPercent: number; // (recovered / crude_initial) * 100
  purifiedPurityPercent: number; // 99.5% if slow cooling, 93-95% if shock cooling
  crystalMorphologyVI: string;
  observedMeltingMinC: number;
  observedMeltingMaxC: number;
  meltingRangeC: number;
  isPureSharp: boolean; // range <= 1.0 deg C
  evaluationVerdictVI: string;
  operationalStepsVI: string[];
}

// ----------------------------------------------------------------------------
// RECRYSTALLIZATION SOLVENTS CATALOG
// ----------------------------------------------------------------------------
export const RECRYSTALLIZATION_SOLVENTS: Record<string, RecrystallizationSolvent> = {
  water: {
    id: 'water',
    name: 'Water',
    nameVI: 'Nước (H2O)',
    boilingPointC: 100.0,
    freezingPointC: 0.0,
    polarityCategory: 'POLAR_PROTIC',
    dielectricConstant: 78.4,
    safetySummaryVI: 'Dung môi lý tưởng nhất: không cháy, không độc hại, giá rẻ, độ dốc độ tan theo nhiệt độ rất cao đối với axit thơm.',
  },

  ethanol: {
    id: 'ethanol',
    name: 'Ethanol (96%)',
    nameVI: 'Etanol 96% (C2H5OH)',
    boilingPointC: 78.4,
    freezingPointC: -114.1,
    polarityCategory: 'POLAR_PROTIC',
    dielectricConstant: 24.5,
    safetySummaryVI: 'Hòa tan tốt nhiều hợp chất hữu cơ. Dễ cháy, cần đun cách thủy không dùng ngọn lửa trực tiếp.',
  },

  ethyl_acetate: {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate',
    nameVI: 'Etyl axetat (CH3COOC2H5)',
    boilingPointC: 77.1,
    freezingPointC: -83.6,
    polarityCategory: 'POLAR_APROTIC',
    dielectricConstant: 6.0,
    safetySummaryVI: 'Dung môi phân cực trung bình, nhiệt độ sôi vừa phải, rất dễ làm bay hơi để thu hồi tinh thể.',
  },

  toluene: {
    id: 'toluene',
    name: 'Toluene',
    nameVI: 'Toluen (C7H8)',
    boilingPointC: 110.6,
    freezingPointC: -95.0,
    polarityCategory: 'NON_POLAR',
    dielectricConstant: 2.4,
    safetySummaryVI: 'Dung môi không phân cực cho hợp chất thơm đa vòng. Nhiệt độ sôi cao, cần làm nguội kỹ trước khi lọc.',
  },
};

// ----------------------------------------------------------------------------
// BENCHMARK SUBSTANCES & TEMPERATURE SOLUBILITY PROFILES
// ----------------------------------------------------------------------------
export const RECRYSTALLIZATION_SUBSTANCES: Record<string, RecrystallizationSubstance> = {
  benzoic_acid: {
    id: 'benzoic_acid',
    name: 'Benzoic Acid',
    nameVI: 'Axit benzoic',
    formula: 'C6H5COOH',
    molecularWeight: 122.12,
    meltingPointPureMinC: 122.0,
    meltingPointPureMaxC: 122.5,
    enthalpyOfFusionKjPerMol: 18.0,
    cryoscopicConstantKf: 4.0,
    idealSolventId: 'water',
    crystalHabitVI: 'Tinh thể hình phiến hoặc hình kim màu trắng bạc lấp lánh (Lustrous white needles)',
    commonImpuritiesVI: ['Vết bụi bẩn cơ học không tan', 'Màu hữu cơ vàng nhạt', 'Axit vô cơ'],
    descriptionVI:
      'Chất chuẩn kinh điển cho bài thực hành kết tinh lại trong chương trình Hóa học 11 GDPT 2018. Độ tan tăng vọt 20 lần từ 25 °C lên 95 °C, cho hiệu suất thu hồi tinh thể cực cao.',
    solubilityCurve: [
      { temperatureC: 0, solubilityGPer100G: 0.17 },
      { temperatureC: 10, solubilityGPer100G: 0.21 },
      { temperatureC: 20, solubilityGPer100G: 0.29 },
      { temperatureC: 25, solubilityGPer100G: 0.34 },
      { temperatureC: 40, solubilityGPer100G: 0.55 },
      { temperatureC: 60, solubilityGPer100G: 1.15 },
      { temperatureC: 75, solubilityGPer100G: 2.20 },
      { temperatureC: 85, solubilityGPer100G: 3.80 },
      { temperatureC: 95, solubilityGPer100G: 6.80 },
    ],
  },

  acetanilide: {
    id: 'acetanilide',
    name: 'Acetanilide',
    nameVI: 'Axetanilit (N-phenylaxetamit)',
    formula: 'C6H5NHCOCH3',
    molecularWeight: 135.17,
    meltingPointPureMinC: 113.5,
    meltingPointPureMaxC: 114.5,
    enthalpyOfFusionKjPerMol: 21.6,
    cryoscopicConstantKf: 3.8,
    idealSolventId: 'water',
    crystalHabitVI: 'Tinh thể hình vảy óng ánh màu trắng tinh khiết (Glistening white plates/flakes)',
    commonImpuritiesVI: ['Anilin chưa phản ứng hết (chất lỏng màu nâu sẫm)', 'Sản phẩm phụ màu đen'],
    descriptionVI:
      'Sản phẩm điều chế hữu cơ từ anilin và anhiđrit axetic. Cần dùng than hoạt tính (than khử màu) trong lúc dung dịch sôi để hấp phụ tạp chất màu nâu trước khi lọc nóng.',
    solubilityCurve: [
      { temperatureC: 0, solubilityGPer100G: 0.35 },
      { temperatureC: 20, solubilityGPer100G: 0.50 },
      { temperatureC: 25, solubilityGPer100G: 0.54 },
      { temperatureC: 50, solubilityGPer100G: 1.35 },
      { temperatureC: 70, solubilityGPer100G: 2.50 },
      { temperatureC: 85, solubilityGPer100G: 3.90 },
      { temperatureC: 100, solubilityGPer100G: 5.50 },
    ],
  },

  aspirin: {
    id: 'aspirin',
    name: 'Aspirin (Acetylsalicylic Acid)',
    nameVI: 'Aspirin (Axit axetylsalixylic)',
    formula: 'C9H8O4',
    molecularWeight: 180.16,
    meltingPointPureMinC: 135.0,
    meltingPointPureMaxC: 136.0,
    enthalpyOfFusionKjPerMol: 29.8,
    cryoscopicConstantKf: 4.5,
    idealSolventId: 'ethanol',
    crystalHabitVI: 'Tinh thể hình kim đơn nghiêng màu trắng (Monoclinic white needles)',
    commonImpuritiesVI: ['Axit salixylic chưa phản ứng', 'Polyme este hóa'],
    descriptionVI:
      'Thường kết tinh trong hệ hỗn hợp dung môi Etanol : Nước (hòa tan trong etanol ấm rồi thêm nước cho đến khi bắt đầu vẫn đục, hâm nóng nhẹ cho trong rồi để nguội từ từ).',
    solubilityCurve: [
      { temperatureC: 0, solubilityGPer100G: 0.25 },
      { temperatureC: 25, solubilityGPer100G: 1.00 },
      { temperatureC: 50, solubilityGPer100G: 3.20 },
      { temperatureC: 75, solubilityGPer100G: 10.50 },
    ],
  },

  potassium_nitrate: {
    id: 'potassium_nitrate',
    name: 'Potassium Nitrate',
    nameVI: 'Kali nitrat (KNO3)',
    formula: 'KNO3',
    molecularWeight: 101.10,
    meltingPointPureMinC: 334.0,
    meltingPointPureMaxC: 334.5,
    enthalpyOfFusionKjPerMol: 9.8,
    cryoscopicConstantKf: 2.5,
    idealSolventId: 'water',
    crystalHabitVI: 'Tinh thể hình lăng trụ trực thoi trong suốt không màu (Transparent orthorhombic prisms)',
    commonImpuritiesVI: ['Muối ăn NaCl (được giữ lại trong nước cái vì độ tan của NaCl ít phụ thuộc nhiệt độ)'],
    descriptionVI:
      'Bài toán mẫu mực trong chương trình Hóa học 10 và 11 về tách hỗn hợp muối KNO3 và NaCl dựa trên sự chênh lệch độ dốc đường cong độ tan (KNO3 dốc đứng, NaCl nằm ngang).',
    solubilityCurve: [
      { temperatureC: 0, solubilityGPer100G: 13.3 },
      { temperatureC: 20, solubilityGPer100G: 31.6 },
      { temperatureC: 40, solubilityGPer100G: 63.9 },
      { temperatureC: 60, solubilityGPer100G: 110.0 },
      { temperatureC: 80, solubilityGPer100G: 167.0 },
      { temperatureC: 100, solubilityGPer100G: 246.0 },
    ],
  },
};

// ----------------------------------------------------------------------------
// THERMODYNAMIC LOGIC & CALCULATIONS
// ----------------------------------------------------------------------------

/**
 * Linearly interpolates solubility at arbitrary temperature from piecewise curve
 */
export function interpolateSolubility(
  substance: RecrystallizationSubstance,
  tempC: number
): number {
  const curve = substance.solubilityCurve;
  if (!curve || curve.length === 0) return 0.0;
  if (tempC <= curve[0].temperatureC) return curve[0].solubilityGPer100G;
  if (tempC >= curve[curve.length - 1].temperatureC) {
    return curve[curve.length - 1].solubilityGPer100G;
  }

  for (let i = 0; i < curve.length - 1; i++) {
    const p1 = curve[i];
    const p2 = curve[i + 1];
    if (tempC >= p1.temperatureC && tempC <= p2.temperatureC) {
      const frac = (tempC - p1.temperatureC) / (p2.temperatureC - p1.temperatureC);
      const sol = p1.solubilityGPer100G + frac * (p2.solubilityGPer100G - p1.solubilityGPer100G);
      return Number(sol.toFixed(3));
    }
  }

  return curve[0].solubilityGPer100G;
}

/**
 * Calculates theoretical recrystallization recovery yield and purity:
 * 1. Calculate mass of pure compound and impurity in crude sample.
 * 2. Calculate max solubility at hot temp (must be >= mass to dissolve completely).
 * 3. Calculate residual dissolved mass at cold crystallization temp:
 *    m_cold = S(T_cold) * (V_solvent / 100)
 * 4. Theoretical recovery = pure_initial - m_cold (if positive).
 * 5. Impurity handling: If impurity mass < S_impurity(cold), impurity stays completely in mother liquor!
 * 6. Cooling rate effect:
 *    - Slow cooling: Perfect lattice assembly, excludes impurity (purity ~ 99.5%, sharp mp range <= 0.8 C).
 *    - Shock cooling: Rapid entrapment (occlusion) of mother liquor in microcrystals (purity ~ 94%, broader mp range).
 */
export function calculateRecrystallizationYield(
  protocol: RecrystallizationProtocol
): RecrystallizationYieldResult {
  const substance = RECRYSTALLIZATION_SUBSTANCES[protocol.substanceId] || RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;
  const crudeMass = Math.max(0.1, protocol.crudeMassG);
  const purityFrac = Math.max(0.5, Math.min(0.999, protocol.initialPurityPercent / 100));
  const vSolvent = Math.max(5.0, protocol.solventVolumeMl);

  const pureInitial = crudeMass * purityFrac;
  const impurityInitial = crudeMass * (1 - purityFrac);

  // Solubility at hot & cold
  const sHot = interpolateSolubility(substance, protocol.dissolutionTempC);
  const sCold = interpolateSolubility(substance, protocol.crystallizationTempC);

  // Maximum substance that can dissolve at hot temp in given solvent volume
  const maxSolubleHot = (sHot * vSolvent) / 100;
  const massDissolvedHot = Math.min(pureInitial, maxSolubleHot);

  // Residual substance that MUST stay dissolved in cold solvent (mother liquor loss)
  const massResidualCold = (sCold * vSolvent) / 100;

  // Raw theoretical crystal precipitate
  let rawCrystals = Math.max(0, massDissolvedHot - massResidualCold);

  // Activated charcoal deduction (slight adsorption loss ~ 3-5%)
  if (protocol.useActivatedCharcoal) {
    rawCrystals *= 0.96;
  }

  // Effect of cooling mode
  let finalPurity = 99.6;
  let trappedImpurityG = 0.0;
  let morphology = substance.crystalHabitVI;

  if (protocol.coolingMode === 'SHOCK_ICE_BATH') {
    // Shock cooling traps ~ 3-5% of available impurity via occlusion
    trappedImpurityG = impurityInitial * 0.25;
    finalPurity = Number(((rawCrystals / (rawCrystals + trappedImpurityG)) * 100).toFixed(1));
    morphology = 'Bột vi tinh thể hạt nhỏ vón cục (Microcrystalline precipitate, ngậm tạp chất)';
  } else {
    // Slow cooling excludes almost all impurities
    finalPurity = 99.6;
    morphology = `Tinh thể lớn hoàn chỉnh: ${substance.crystalHabitVI}`;
  }

  const recoveredTotal = Number((rawCrystals + trappedImpurityG).toFixed(3));
  const theoreticalRecPct = Number(((rawCrystals / pureInitial) * 100).toFixed(2));
  const actualYieldPct = Number(((recoveredTotal / crudeMass) * 100).toFixed(2));

  // Melting point depression calculation:
  // Delta Tm = Kf * m_impurity / M_impurity
  const mpAnalysis = calculateMeltingPointDepression(substance, finalPurity, protocol.coolingMode);

  // Operational step-by-step audit log
  const steps: string[] = [
    `1. Cân chính xác ${crudeMass} g mẫu thô chứa ${pureInitial.toFixed(2)} g ${substance.nameVI} (${(purityFrac * 100).toFixed(1)}% tinh khiết).`,
    `2. Hòa tan nóng trong lượng tối thiểu ${vSolvent} mL dung môi ở ${protocol.dissolutionTempC} °C (Độ tan S = ${sHot} g/100g dung môi).`,
  ];

  if (protocol.useActivatedCharcoal) {
    steps.push('3. Thêm một thìa nhỏ than hoạt tính (Norit A) vào dung dịch đang sôi nhẹ để hấp phụ tạp chất màu hữu cơ, sau đó lọc nóng qua phễu có nếp gấp.');
  } else {
    steps.push('3. Lọc nóng qua phễu thủy tinh cuống ngắn có giấy lọc xếp nếp để loại bỏ tạp chất cơ học không tan.');
  }

  if (protocol.coolingMode === 'SLOW_CONTROLLED') {
    steps.push(`4. Để nguội tự nhiên từ từ đến nhiệt độ phòng rồi mới đặt vào cốc nước đá ${protocol.crystallizationTempC} °C để kích thích mạng tinh thể phát triển hoàn hảo.`);
  } else {
    steps.push(`4. [CẢNH BÁO] Làm lạnh đột ngột bằng cách nhúng ngay bình nóng vào chậu đá ${protocol.crystallizationTempC} °C: tinh thể kết tủa dạng bụi mịn bẫy tạp chất.`);
  }

  steps.push(`5. Lọc hút chân không trên phễu Buchner, rửa tinh thể bằng 5 mL dung môi lạnh ${protocol.crystallizationTempC} °C, sấy khô hút chân không.`);
  steps.push(`6. Thu hồi ${recoveredTotal} g tinh thể đạt độ tinh khiết ${finalPurity}% (Điểm nóng chảy: ${mpAnalysis.onsetC} - ${mpAnalysis.clearC} °C, khoảng nóng chảy ${mpAnalysis.rangeC} °C).`);

  let verdict = 'Kết tinh xuất sắc: Tinh thể tinh khiết, điểm nóng chảy sắc nét (khoảng < 1.0 °C).';
  if (!mpAnalysis.isPureSharp) {
    verdict = 'Chưa đạt độ tinh khiết tối đa: Khoảng nóng chảy rộng do làm lạnh quá nhanh hoặc thiếu dung môi.';
  }

  return {
    pureSubstanceInitialG: Number(pureInitial.toFixed(3)),
    impurityInitialG: Number(impurityInitial.toFixed(3)),
    massDissolvedAtHotG: Number(massDissolvedHot.toFixed(3)),
    massRemainingSolubleAtColdG: Number(massResidualCold.toFixed(3)),
    recoveredCrystalsMassG: recoveredTotal,
    theoreticalRecoveryPercent: theoreticalRecPct,
    actualYieldPercent: actualYieldPct,
    purifiedPurityPercent: finalPurity,
    crystalMorphologyVI: morphology,
    observedMeltingMinC: mpAnalysis.onsetC,
    observedMeltingMaxC: mpAnalysis.clearC,
    meltingRangeC: mpAnalysis.rangeC,
    isPureSharp: mpAnalysis.isPureSharp,
    evaluationVerdictVI: verdict,
    operationalStepsVI: steps,
  };
}

/**
 * Calculates Melting Point Depression and Melting Range:
 * Pure substances melt sharply within delta T <= 1.0 deg C at standard literature mp.
 * Impure substances show depressed onset melting temperature and widened melting range.
 */
export function calculateMeltingPointDepression(
  substance: RecrystallizationSubstance,
  purityPercent: number,
  coolingMode: 'SLOW_CONTROLLED' | 'SHOCK_ICE_BATH'
): {
  onsetC: number;
  clearC: number;
  rangeC: number;
  isPureSharp: boolean;
} {
  const pureMin = substance.meltingPointPureMinC;
  const pureMax = substance.meltingPointPureMaxC;

  const impurityPercent = Math.max(0, 100 - purityPercent);
  // Depression formula: onset drops ~ 0.8 deg C per 1% impurity
  const onsetDepression = impurityPercent * 0.85;
  // Clear point (hoàn toàn nóng chảy) drops slightly less ~ 0.2 deg C per 1% impurity
  const clearDepression = impurityPercent * 0.20;

  const onset = pureMin - onsetDepression;
  const clear = pureMax - clearDepression;
  const range = clear - onset;

  return {
    onsetC: Number(onset.toFixed(1)),
    clearC: Number(clear.toFixed(1)),
    rangeC: Number(range.toFixed(1)),
    isPureSharp: range <= 1.0 && coolingMode === 'SLOW_CONTROLLED',
  };
}

/**
 * Mixed Melting Point Test (Thử nghiệm nhiệt độ nóng chảy hỗn hợp):
 * If Sample A is mixed 50:50 with authentic standard B:
 * - If A === B: Melting point remains identical and sharp (no depression).
 * - If A !== B: Melting point depresses significantly (5 - 15 deg C) with broad melting range!
 */
export function calculateMixedMeltingPoint(
  sampleAId: string,
  sampleBId: string,
  moleFractionA = 0.5
): {
  areIdentical: boolean;
  expectedMeltingPointC: number;
  depressionC: number;
  meltingRangeC: number;
  verdictVI: string;
} {
  const subA = RECRYSTALLIZATION_SUBSTANCES[sampleAId] || RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;
  const subB = RECRYSTALLIZATION_SUBSTANCES[sampleBId] || RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;

  if (subA.id === subB.id) {
    return {
      areIdentical: true,
      expectedMeltingPointC: subA.meltingPointPureMinC,
      depressionC: 0.0,
      meltingRangeC: Number((subA.meltingPointPureMaxC - subA.meltingPointPureMinC).toFixed(1)),
      verdictVI: `Hai mẫu đồng nhất (Chính là ${subA.nameVI}): Điểm nóng chảy không bị hạ thấp (${subA.meltingPointPureMinC} °C), khoảng nóng chảy sắc nét ≤ 0.5 °C.`,
    };
  }

  // Two different compounds mixed: eutectic depression occurs
  const avgMp = (subA.meltingPointPureMinC + subB.meltingPointPureMinC) / 2;
  const depression = 11.5 * (4 * moleFractionA * (1 - moleFractionA)); // Maximum depression at 50:50
  const depressedMp = avgMp - depression;

  return {
    areIdentical: false,
    expectedMeltingPointC: Number(depressedMp.toFixed(1)),
    depressionC: Number(depression.toFixed(1)),
    meltingRangeC: 8.5, // Broad range 8-10 deg C
    verdictVI: `Hai chất khác nhau (${subA.nameVI} và ${subB.nameVI}): Điểm nóng chảy hỗn hợp hạ sâu ${depression.toFixed(1)} °C và khoảng nóng chảy dãn rộng bất thường (8.5 °C).`,
  };
}

/**
 * Matches card to relevant recrystallization substance
 */
export function getMatchingRecrystallizationSubstance(card: { id?: string; name?: string }): RecrystallizationSubstance | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  for (const sub of Object.values(RECRYSTALLIZATION_SUBSTANCES)) {
    if (
      idLower.includes(sub.id.toLowerCase()) ||
      nameLower.includes(sub.nameVI.toLowerCase()) ||
      nameLower.includes(sub.name.toLowerCase()) ||
      nameLower.includes(sub.formula.toLowerCase())
    ) {
      return sub;
    }
  }

  if (nameLower.includes('kết tinh') || nameLower.includes('recrystallization') || nameLower.includes('tinh thể')) {
    return RECRYSTALLIZATION_SUBSTANCES.benzoic_acid;
  }

  return null;
}
