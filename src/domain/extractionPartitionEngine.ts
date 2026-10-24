// src/domain/extractionPartitionEngine.ts
// ============================================================================
// ELEMENTA LIQUID-LIQUID EXTRACTION, PARTITION COEFFICIENT & SEPARATORY FUNNEL ENGINE
// Standards: IUPAC Compendium of Chemical Terminology & Vietnam GDPT 2018 Chemistry 11
// Covers: Nernst Distribution Law (KD = [S]org / [S]aq), Multi-stage Batch Extraction Efficiency,
// LogP Lipophilicity (Octanol-Water), Acid-Base Reactive Extraction (Separation of Acid/Base/Neutral),
// Separatory Funnel Solvent Density & Phase Inversion (Top vs Bottom layer),
// Salting-Out Effect (NaCl), and Craig Counter-Current Distribution.
// ============================================================================

export interface ExtractionSolvent {
  id: string;
  name: string;
  vietnameseName: string;
  formula: string;
  densityGPerMl: number;
  boilingPointC: number;
  isHeavierThanWater: boolean; // density > 1.0 -> Bottom layer in separatory funnel
  dielectricConstant: number;
  safetyHazardVI: string;
}

export interface ExtractedSolute {
  id: string;
  name: string;
  vietnameseName: string;
  formula: string;
  molecularWeight: number;
  logP_octanolWater: number;
  kd_etherWater: number;
  kd_dcmWater: number;
  pKa?: number;
  pKb?: number;
  acidBaseNature: 'ACIDIC' | 'BASIC' | 'NEUTRAL' | 'AMPHOTERIC';
  waterSolubilityGPer100Ml: number;
  etherSolubilityGPer100Ml: number;
  descriptionVI: string;
}

export interface AcidBaseSeparationStep {
  stepNumber: number;
  titleVI: string;
  reagentAdded: string;
  reagentRoleVI: string;
  chemicalEquation: string;
  targetSoluteIsolated: string;
  aqueousPhaseContentsVI: string;
  organicPhaseContentsVI: string;
  precipitationReagent: string;
  precipitationEquation: string;
  pedagogicalNoteVI: string;
}

// ----------------------------------------------------------------------------
// BENCHMARK EXTRACTION SOLVENTS CATALOG
// ----------------------------------------------------------------------------
export const EXTRACTION_SOLVENTS: Record<string, ExtractionSolvent> = {
  water: {
    id: 'water',
    name: 'Water',
    vietnameseName: 'Nước (Pha nước chuẩn)',
    formula: 'H2O',
    densityGPerMl: 1.000,
    boilingPointC: 100.0,
    isHeavierThanWater: false,
    dielectricConstant: 78.4,
    safetyHazardVI: 'An toàn tuyệt đối, dùng làm pha nước chứa muối vô cơ và chất tan ion hóa.',
  },

  diethyl_ether: {
    id: 'diethyl_ether',
    name: 'Diethyl Ether',
    vietnameseName: 'Đietyl ete (Ete etylic)',
    formula: '(C2H5)2O',
    densityGPerMl: 0.713,
    boilingPointC: 34.6,
    isHeavierThanWater: false, // Lighter -> Top layer
    dielectricConstant: 4.3,
    safetyHazardVI: 'Nhẹ hơn nước (nổi lên lớp trên). Cực kỳ dễ bắt lửa, dễ tạo peoxit nổ khi để lâu.',
  },

  ethyl_acetate: {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate',
    vietnameseName: 'Etyl axetat',
    formula: 'CH3COOC2H5',
    densityGPerMl: 0.902,
    boilingPointC: 77.1,
    isHeavierThanWater: false, // Lighter -> Top layer
    dielectricConstant: 6.0,
    safetyHazardVI: 'Nhẹ hơn nước (nổi lên lớp trên). Mùi thơm dễ chịu, ít độc hại hơn ete, rất phổ biến.',
  },

  hexane: {
    id: 'hexane',
    name: 'Hexane',
    vietnameseName: 'Hexan (n-Hexane)',
    formula: 'C6H14',
    densityGPerMl: 0.655,
    boilingPointC: 68.7,
    isHeavierThanWater: false, // Lighter -> Top layer
    dielectricConstant: 1.9,
    safetyHazardVI: 'Nhẹ hơn nước (nổi lên lớp trên cùng). Dung môi không phân cực chuyên chiết chất béo và hydrocacbon.',
  },

  dichloromethane: {
    id: 'dichloromethane',
    name: 'Dichloromethane (DCM)',
    vietnameseName: 'Điclometan (Metylen clorua)',
    formula: 'CH2Cl2',
    densityGPerMl: 1.326,
    boilingPointC: 39.6,
    isHeavierThanWater: true, // Heavier -> Bottom layer!
    dielectricConstant: 8.9,
    safetyHazardVI: 'Nặng hơn nước (chìm xuống lớp dưới đáy phễu chiết). Bay hơi nhanh, độc hại đường hô hấp.',
  },

  chloroform: {
    id: 'chloroform',
    name: 'Chloroform',
    vietnameseName: 'Clorofom (Triclometan)',
    formula: 'CHCl3',
    densityGPerMl: 1.489,
    boilingPointC: 61.2,
    isHeavierThanWater: true, // Heavier -> Bottom layer!
    dielectricConstant: 4.8,
    safetyHazardVI: 'Nặng hơn nước rất nhiều (nằm ở lớp đáy). Có tính gây mê, tránh hít phải hơi.',
  },
};

// ----------------------------------------------------------------------------
// BENCHMARK EXTRACTED SOLUTES CATALOG
// ----------------------------------------------------------------------------
export const EXTRACTED_SOLUTES: Record<string, ExtractedSolute> = {
  benzoic_acid: {
    id: 'benzoic_acid',
    name: 'Benzoic Acid',
    vietnameseName: 'Axit benzoic',
    formula: 'C6H5COOH',
    molecularWeight: 122.12,
    logP_octanolWater: 1.87,
    kd_etherWater: 8.5,
    kd_dcmWater: 12.0,
    pKa: 4.20,
    acidBaseNature: 'ACIDIC',
    waterSolubilityGPer100Ml: 0.34,
    etherSolubilityGPer100Ml: 33.0,
    descriptionVI: 'Axit hữu cơ thơm tan rất ít trong nước lạnh nhưng tan rất tốt trong ete. Bị bazơ yếu NaHCO3 khử proton tạo muối natri benzoat tan hoàn toàn trong nước.',
  },

  aniline: {
    id: 'aniline',
    name: 'Aniline',
    vietnameseName: 'Anilin (Benzenamin)',
    formula: 'C6H5NH2',
    molecularWeight: 93.13,
    logP_octanolWater: 0.90,
    kd_etherWater: 10.2,
    kd_dcmWater: 15.0,
    pKb: 9.37,
    acidBaseNature: 'BASIC',
    waterSolubilityGPer100Ml: 3.6,
    etherSolubilityGPer100Ml: 99.0,
    descriptionVI: 'Amin thơm có tính bazơ yếu, tan nhiều trong ete. Bị axit HCl proton hóa tạo muối phenylamoni clorua tan trong nước, giúp tách khỏi các chất trung tính.',
  },

  naphthalene: {
    id: 'naphthalene',
    name: 'Naphthalene',
    vietnameseName: 'Naphtalen (Băng phiến)',
    formula: 'C10H8',
    molecularWeight: 128.17,
    logP_octanolWater: 3.30,
    kd_etherWater: 45.0,
    kd_dcmWater: 60.0,
    acidBaseNature: 'NEUTRAL',
    waterSolubilityGPer100Ml: 0.003,
    etherSolubilityGPer100Ml: 40.0,
    descriptionVI: 'Hydrocacbon thơm trung tính không chứa nhóm chức axit hay bazơ. Không phản ứng với cả HCl lẫn NaOH, luôn nằm lại ở pha hữu cơ xuyên suốt quá trình chiết.',
  },

  caffeine: {
    id: 'caffeine',
    name: 'Caffeine',
    vietnameseName: 'Cafein',
    formula: 'C8H10N4O2',
    molecularWeight: 194.19,
    logP_octanolWater: -0.07,
    kd_etherWater: 2.2,
    kd_dcmWater: 8.8,
    acidBaseNature: 'NEUTRAL',
    waterSolubilityGPer100Ml: 2.16,
    etherSolubilityGPer100Ml: 0.38,
    descriptionVI: 'Alkaloid có trong trà và cà phê. Chiết xuất cafein từ nước trà bằng DCM hoặc etyl axetat là bài thực hành kinh điển trong hóa hữu cơ đại học.',
  },

  iodine: {
    id: 'iodine',
    name: 'Iodine',
    vietnameseName: 'Iot nguyên tố (I2)',
    formula: 'I2',
    molecularWeight: 253.8,
    logP_octanolWater: 2.49,
    kd_etherWater: 12.0,
    kd_dcmWater: 85.0,
    acidBaseNature: 'NEUTRAL',
    waterSolubilityGPer100Ml: 0.03,
    etherSolubilityGPer100Ml: 25.0,
    descriptionVI: 'Chất tan không phân cực màu nâu đỏ trong nước. Khi chiết với hexan hoặc DCM, lớp hữu cơ chuyển sang màu tím hoa cà đặc trưng (violet).',
  },
};

// ----------------------------------------------------------------------------
// CLASSICAL ACID-BASE 3-COMPONENT SEPARATION PROTOCOL
// ----------------------------------------------------------------------------
export const ACID_BASE_EXTRACTION_PROTOCOL: readonly AcidBaseSeparationStep[] = [
  {
    stepNumber: 1,
    titleVI: 'Chiết Tách Axit Benzoic Bằng Dung Dịch Bazơ NaHCO3',
    reagentAdded: 'NaHCO3 5% (Natri hiđrocacbonat)',
    reagentRoleVI: 'Khử proton nhóm cacboxyl của axit benzoic thành anion benzoat tan trong nước',
    chemicalEquation: 'C6H5COOH(ete) + NaHCO3(aq) ⟶ C6H5COO⁻Na⁺(aq) + CO2↑ + H2O',
    targetSoluteIsolated: 'Axit benzoic (C6H5COOH)',
    aqueousPhaseContentsVI: 'Chứa muối Natri benzoat (C6H5COONa) tan trong nước',
    organicPhaseContentsVI: 'Còn lại Anilin (C6H5NH2) và Naphtalen (C10H8) trong ete',
    precipitationReagent: 'HCl 6M (Axit clohiđric)',
    precipitationEquation: 'C6H5COO⁻Na⁺(aq) + HCl(aq) ⟶ C6H5COOH(s)↓ + NaCl(aq)',
    pedagogicalNoteVI: 'Khi lắc phễu chiết sinh ra khí CO2 nên phải mở khóa phễu xả áp suất thường xuyên để tránh nổ tung nút phễu.',
  },
  {
    stepNumber: 2,
    titleVI: 'Chiết Tách Anilin Bằng Dung Dịch Axit HCl',
    reagentAdded: 'HCl 1M (Axit clohiđric loãng)',
    reagentRoleVI: 'Proton hóa nhóm amin của anilin thành cation phenylamoni tan trong nước',
    chemicalEquation: 'C6H5NH2(ete) + HCl(aq) ⟶ C6H5NH3⁺Cl⁻(aq)',
    targetSoluteIsolated: 'Anilin (C6H5NH2)',
    aqueousPhaseContentsVI: 'Chứa muối Phenylamoni clorua (C6H5NH3Cl) tan trong nước',
    organicPhaseContentsVI: 'Chỉ còn duy nhất Naphtalen (C10H8) trong lớp ete',
    precipitationReagent: 'NaOH 6M (Natri hiđroxit)',
    precipitationEquation: 'C6H5NH3⁺Cl⁻(aq) + NaOH(aq) ⟶ C6H5NH2(l)↓ + NaCl(aq) + H2O',
    pedagogicalNoteVI: 'Anilin tái sinh ở dạng giọt dầu lơ lửng, sau đó được chiết lại bằng ete và làm khô để thu hồi anilin tinh khiết.',
  },
  {
    stepNumber: 3,
    titleVI: 'Thu Hồi Hợp Chất Trung Tính Naphtalen Từ Pha Hữu Cơ',
    reagentAdded: 'Na2SO4 khan (Natri sunfat khan - Chất hút nước)',
    reagentRoleVI: 'Hút sạch các vi giọt nước còn sót lại trong pha ete hữu cơ',
    chemicalEquation: 'Na2SO4(s) + 10 H2O(vết trong ete) ⟶ Na2SO4·10H2O(s)↓',
    targetSoluteIsolated: 'Naphtalen (C10H8)',
    aqueousPhaseContentsVI: 'Đã xả bỏ sau các bước chiết trước',
    organicPhaseContentsVI: 'Dung dịch Naphtalen trong ete hoàn toàn khô ráo',
    precipitationReagent: 'Cô quay đuổi dung môi ete (Rotary Evaporator)',
    precipitationEquation: 'C10H8(ete) ⟶ C10H8(s) (tinh thể trắng naphtalen) + (C2H5)2O↑',
    pedagogicalNoteVI: 'Naphtalen không mang tính axit hay bazơ nên không bị nước hay kiềm/axit lôi cuốn, là minh chứng cho cấu trúc phi điện ly.',
  },
];

// ----------------------------------------------------------------------------
// THERMODYNAMIC DOMAIN LOGIC FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Calculates remaining mass and extraction efficiency of multiple-batch extraction:
 * m_n = m_0 · [ V_aq / (V_aq + K_D · V_org) ]^n
 * Efficiency E_n = 1 - m_n / m_0
 *
 * @param initialMassG Initial mass of solute m0 (grams)
 * @param vAqueousMl Volume of aqueous solution Vaq (mL)
 * @param vOrganicMlPerBatch Volume of organic solvent per extraction batch Vorg (mL)
 * @param numExtractions Number of successive extraction batches n
 * @param kd Partition coefficient K_D = [S]org / [S]aq
 */
export function calculateMultipleExtractionYield(
  initialMassG: number,
  vAqueousMl: number,
  vOrganicMlPerBatch: number,
  numExtractions: number,
  kd: number
): {
  initialMassG: number;
  remainingMassAqueousG: number;
  extractedMassOrganicG: number;
  extractionEfficiencyPercent: number;
  singleBatchComparisonYieldPercent: number; // Comparative yield if extracted 1 time with total volume (n * Vorg)
  batchProgress: { batch: number; remainingG: number; cumulativeExtractedPercent: number }[];
} {
  if (initialMassG <= 0 || vAqueousMl <= 0 || vOrganicMlPerBatch <= 0 || numExtractions <= 0 || kd <= 0) {
    return {
      initialMassG: Math.max(0, initialMassG),
      remainingMassAqueousG: Math.max(0, initialMassG),
      extractedMassOrganicG: 0,
      extractionEfficiencyPercent: 0,
      singleBatchComparisonYieldPercent: 0,
      batchProgress: [],
    };
  }

  const fractionRemainingPerBatch = vAqueousMl / (vAqueousMl + kd * vOrganicMlPerBatch);
  const totalVolumeOrg = vOrganicMlPerBatch * numExtractions;

  // Single batch with entire volume
  const singleBatchRemainingFraction = vAqueousMl / (vAqueousMl + kd * totalVolumeOrg);
  const singleBatchYieldPercent = (1 - singleBatchRemainingFraction) * 100;

  // Cumulative tracking
  const progress: { batch: number; remainingG: number; cumulativeExtractedPercent: number }[] = [];
  let currentRemaining = initialMassG;

  for (let i = 1; i <= numExtractions; i++) {
    currentRemaining *= fractionRemainingPerBatch;
    const cumExtractedPct = ((initialMassG - currentRemaining) / initialMassG) * 100;
    progress.push({
      batch: i,
      remainingG: Number(currentRemaining.toFixed(4)),
      cumulativeExtractedPercent: Number(cumExtractedPct.toFixed(2)),
    });
  }

  const finalRemaining = progress[progress.length - 1].remainingG;
  const finalExtracted = initialMassG - finalRemaining;
  const finalEfficiency = (finalExtracted / initialMassG) * 100;

  return {
    initialMassG,
    remainingMassAqueousG: Number(finalRemaining.toFixed(4)),
    extractedMassOrganicG: Number(finalExtracted.toFixed(4)),
    extractionEfficiencyPercent: Number(finalEfficiency.toFixed(2)),
    singleBatchComparisonYieldPercent: Number(singleBatchYieldPercent.toFixed(2)),
    batchProgress: progress,
  };
}

/**
 * Determines separatory funnel phase orientation (Upper layer vs Lower layer)
 * based on solvent densities relative to water (1.000 g/mL).
 */
export function determineSeparatoryFunnelLayers(organicSolvent: ExtractionSolvent): {
  upperLayerNameVI: string;
  lowerLayerNameVI: string;
  organicIsTop: boolean;
  densityDifference: number;
} {
  const waterDensity = 1.000;
  const orgDensity = organicSolvent.densityGPerMl;
  const diff = Number(Math.abs(orgDensity - waterDensity).toFixed(3));

  if (orgDensity < waterDensity) {
    return {
      upperLayerNameVI: `Lớp Hữu Cơ Trên: ${organicSolvent.vietnameseName} (d = ${orgDensity} g/mL < 1.0)`,
      lowerLayerNameVI: `Lớp Nước Dưới: Nước / Pha muối (d = 1.00 g/mL)`,
      organicIsTop: true,
      densityDifference: diff,
    };
  } else {
    return {
      upperLayerNameVI: `Lớp Nước Trên: Nước / Pha dung dịch (d = 1.00 g/mL)`,
      lowerLayerNameVI: `Lớp Hữu Cơ Dưới: ${organicSolvent.vietnameseName} (d = ${orgDensity} g/mL > 1.0)`,
      organicIsTop: false,
      densityDifference: diff,
    };
  }
}

/**
 * Craig Counter-Current Distribution Simulator:
 * Calculates theoretical distribution of solute across N tubes according to binomial distribution:
 * f(r, N) = [N! / (r! · (N - r)!)] · p^r · q^(N - r)
 * where p = K_D / (1 + K_D), q = 1 / (1 + K_D)
 */
export function calculateCraigDistribution(
  numTubes: number, // Total tubes (N)
  kd: number // Partition coefficient
): { tube: number; fraction: number; percent: number }[] {
  const N = Math.max(2, Math.min(20, numTubes));
  const p = kd / (1.0 + kd);
  const q = 1.0 / (1.0 + kd);

  // Helper for binomial coefficient C(N, r)
  const binomial = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let c = 1;
    for (let i = 1; i <= k; i++) {
      c = (c * (n - (k - i))) / i;
    }
    return c;
  };

  const distribution: { tube: number; fraction: number; percent: number }[] = [];
  for (let r = 0; r <= N; r++) {
    const coeff = binomial(N, r);
    const frac = coeff * Math.pow(p, r) * Math.pow(q, N - r);
    distribution.push({
      tube: r,
      fraction: Number(frac.toFixed(4)),
      percent: Number((frac * 100).toFixed(2)),
    });
  }

  return distribution;
}

/**
 * Calculates salting-out effect on partition coefficient K_D:
 * K_D(with salt) = K_D0 · 10^(k_s · C_salt)
 * Setschenow (Sechenov) equation where k_s ~ 0.15 for NaCl and organic solutes.
 */
export function calculateSaltingOutEffect(
  baseKd: number,
  naclConcentrationMolPerL: number,
  setschenowConstant = 0.15
): { enhancedKd: number; foldIncrease: number } {
  if (baseKd <= 0 || naclConcentrationMolPerL < 0) {
    return { enhancedKd: baseKd, foldIncrease: 1.0 };
  }
  const fold = Math.pow(10, setschenowConstant * naclConcentrationMolPerL);
  const enhanced = baseKd * fold;
  return {
    enhancedKd: Number(enhanced.toFixed(2)),
    foldIncrease: Number(fold.toFixed(2)),
  };
}

/**
 * Matches a card to an extracted solute if relevant
 */
export function getMatchingExtractionSolute(card: { id?: string; name?: string }): ExtractedSolute | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();
  for (const solute of Object.values(EXTRACTED_SOLUTES)) {
    if (
      idLower.includes(solute.id.toLowerCase()) ||
      nameLower.includes(solute.name.toLowerCase()) ||
      nameLower.includes(solute.vietnameseName.toLowerCase()) ||
      nameLower.includes(solute.formula.toLowerCase())
    ) {
      return solute;
    }
  }
  return null;
}

