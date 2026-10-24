// src/domain/pharmacokineticsEngine.ts
// Comprehensive Pharmacokinetics, Drug Ionization & ADME Simulation Engine for ELEMENTA
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Chuyên đề Hóa học Y - Dược 12)
// and IUPAC / Clinical Pharmacokinetics Standards

export type DrugNature = 'WEAK_ACID' | 'WEAK_BASE' | 'NEUTRAL_OR_AMPHOTERIC';

export interface DrugProfile {
  id: string;
  nameVi: string;
  nameEn: string;
  nature: DrugNature;
  pKa: number;
  halfLifeHours: number; // Elimination half-life t1/2
  volumeOfDistributionLPerKg: number; // Vd in L/kg
  bioavailabilityFraction: number; // Oral bioavailability F (0.0 to 1.0)
  therapeuticWindow: {
    mec: number; // Minimum Effective Concentration (mg/L)
    mtc: number; // Minimum Toxic Concentration (mg/L)
  };
  primaryAbsorptionSiteVi: string;
  hepaticMetabolismPathwayVi: string;
  clinicalIndicationVi: string;
}

export const DRUG_CATALOG: DrugProfile[] = [
  {
    id: 'ASPIRIN',
    nameVi: 'Aspirin (Axit Acetylsalicylic)',
    nameEn: 'Aspirin (Acetylsalicylic acid)',
    nature: 'WEAK_ACID',
    pKa: 3.5,
    halfLifeHours: 0.35, // Rapidly hydrolyzed to salicylate (t1/2 ~ 2-3h)
    volumeOfDistributionLPerKg: 0.15,
    bioavailabilityFraction: 0.70,
    therapeuticWindow: {
      mec: 15.0, // mg/L (as salicylate)
      mtc: 30.0  // mg/L
    },
    primaryAbsorptionSiteVi: 'Dạ dày (pH 1.5) và phần đầu tá tràng do dạng phân tử không ion hóa chiếm ưu thế',
    hepaticMetabolismPathwayVi: 'Thủy phân thành salicylic acid rồi liên hợp glucuronide và glycine',
    clinicalIndicationVi: 'Hạ sốt, giảm đau, kháng viêm và ức chế kết tập tiểu cầu ngừa huyết khối'
  },
  {
    id: 'PARACETAMOL',
    nameVi: 'Paracetamol (Acetaminophen)',
    nameEn: 'Paracetamol (Acetaminophen)',
    nature: 'NEUTRAL_OR_AMPHOTERIC', // Phenolic pKa ~ 9.5, un-ionized at physiological pH
    pKa: 9.5,
    halfLifeHours: 2.0,
    volumeOfDistributionLPerKg: 0.90,
    bioavailabilityFraction: 0.85,
    therapeuticWindow: {
      mec: 10.0,
      mtc: 25.0
    },
    primaryAbsorptionSiteVi: 'Ruột non (hấp thu thụ động nhanh chóng nhờ diện tích vi nhung mao lớn)',
    hepaticMetabolismPathwayVi: 'Liên hợp Glucuronide (60%), Sulfate (35%), và 5% qua CYP2E1 tạo chất độc NAPQI',
    clinicalIndicationVi: 'Hạ sốt, giảm đau bậc 1 (không có tác dụng kháng viêm ngoại vi)'
  },
  {
    id: 'MORPHINE',
    nameVi: 'Morphine',
    nameEn: 'Morphine',
    nature: 'WEAK_BASE',
    pKa: 8.0,
    halfLifeHours: 2.5,
    volumeOfDistributionLPerKg: 3.5,
    bioavailabilityFraction: 0.30, // High first-pass metabolism
    therapeuticWindow: {
      mec: 0.015, // mg/L (15 ng/mL)
      mtc: 0.060  // mg/L (60 ng/mL)
    },
    primaryAbsorptionSiteVi: 'Ruột non (hỗng tràng pH 6.8 - 7.5 nơi tỷ lệ base tự do không ion hóa tăng cao)',
    hepaticMetabolismPathwayVi: 'Chuyển hóa bước đầu qua gan (first-pass effect) thành Morphine-3-glucuronide (M3G) và M6G',
    clinicalIndicationVi: 'Giảm đau trung ương bậc 3 cho bệnh nhân hậu phẫu hoặc ung thư giai đoạn muộn'
  },
  {
    id: 'IBUPROFEN',
    nameVi: 'Ibuprofen',
    nameEn: 'Ibuprofen',
    nature: 'WEAK_ACID',
    pKa: 4.4,
    halfLifeHours: 2.0,
    volumeOfDistributionLPerKg: 0.14,
    bioavailabilityFraction: 0.90,
    therapeuticWindow: {
      mec: 10.0,
      mtc: 50.0
    },
    primaryAbsorptionSiteVi: 'Dạ dày và ruột non',
    hepaticMetabolismPathwayVi: 'Oxi hóa qua CYP2C9 thành các dẫn xuất hydroxy- và carboxy-ibuprofen',
    clinicalIndicationVi: 'Kháng viêm không steroid (NSAID), giảm đau khớp và đau đầu'
  },
  {
    id: 'DIAZEPAM',
    nameVi: 'Diazepam',
    nameEn: 'Diazepam',
    nature: 'WEAK_BASE',
    pKa: 3.4,
    halfLifeHours: 36.0, // Long-acting benzodiazepine
    volumeOfDistributionLPerKg: 1.1,
    bioavailabilityFraction: 0.95,
    therapeuticWindow: {
      mec: 0.2,
      mtc: 1.5
    },
    primaryAbsorptionSiteVi: 'Ruột non, tan mạnh trong lipid, hấp thu hoàn toàn qua màng sinh học',
    hepaticMetabolismPathwayVi: 'Chuyển hóa qua CYP3A4 và CYP2C19 tạo chất chuyển hóa có hoạt tính desmethyldiazepam',
    clinicalIndicationVi: 'An thần, giải lo âu, giãn cơ và cắt cơn co giật'
  }
];

// =============================================================================
// 1. PH-PARTITION HYPOTHESIS & HENDERSON-HASSELBALCH IONIZATION
// =============================================================================

export interface OrganIonizationRatio {
  organNameVi: string;
  nominalPh: number;
  fractionUnIonizedPercent: number; // % in non-ionized, lipid-soluble state (absorbable)
  fractionIonizedPercent: number; // % in ionized state (water-soluble, polar)
  isFavorableForPassiveAbsorption: boolean;
  explanationVi: string;
}

/**
 * Calculates drug ionization at a given pH using the Henderson-Hasselbalch equation.
 * For weak acids: pH = pKa + log([A-] / [HA])  => [A-]/[HA] = 10^(pH - pKa)
 *   Fraction non-ionized [HA] = 1 / (1 + 10^(pH - pKa))
 * For weak bases: pH = pKa + log([B] / [BH+])  => [B]/[BH+] = 10^(pH - pKa)
 *   Fraction non-ionized [B] = 1 / (1 + 10^(pKa - pH))
 */
export function calculateDrugIonizationAtPh(drug: DrugProfile, ph: number): {
  fractionUnIonized: number;
  fractionIonized: number;
  fractionUnIonizedPercent: number;
  fractionIonizedPercent: number;
} {
  let fractionUnIonized: number;

  if (drug.nature === 'WEAK_ACID') {
    fractionUnIonized = 1.0 / (1.0 + Math.pow(10, ph - drug.pKa));
  } else if (drug.nature === 'WEAK_BASE') {
    fractionUnIonized = 1.0 / (1.0 + Math.pow(10, drug.pKa - ph));
  } else {
    // Neutral or very weak acid (like paracetamol pKa 9.5)
    fractionUnIonized = 1.0 / (1.0 + Math.pow(10, ph - drug.pKa));
  }

  const fractionIonized = 1.0 - fractionUnIonized;
  return {
    fractionUnIonized,
    fractionIonized,
    fractionUnIonizedPercent: parseFloat((fractionUnIonized * 100).toFixed(2)),
    fractionIonizedPercent: parseFloat((fractionIonized * 100).toFixed(2))
  };
}

export function evaluateDrugAbsorptionAcrossOrgans(drugId: string): OrganIonizationRatio[] {
  const drug = DRUG_CATALOG.find(d => d.id === drugId) || DRUG_CATALOG[0];

  const organs = [
    { nameVi: 'Dịch vị dạ dày (Stomach lumen)', ph: 1.5 },
    { nameVi: 'Tá tràng & hỗng tràng (Intestinal lumen)', ph: 6.8 },
    { nameVi: 'Huyết tương máu (Blood plasma)', ph: 7.4 },
    { nameVi: 'Nước tiểu bài tiết (Urine)', ph: 6.0 }
  ];

  return organs.map(org => {
    const { fractionUnIonizedPercent, fractionIonizedPercent } = calculateDrugIonizationAtPh(drug, org.ph);
    const isFavorable = fractionUnIonizedPercent >= 30.0;

    let explanationVi = '';
    if (drug.nature === 'WEAK_ACID') {
      if (org.ph < drug.pKa) {
        explanationVi = `pH < pKa (${org.ph} < ${drug.pKa}): Cân bằng dịch chuyển sang dạng phân tử HA không mang điện (${fractionUnIonizedPercent}%), dễ tan trong lớp kép phospholipid màng tế bào.`;
      } else {
        explanationVi = `pH > pKa (${org.ph} > ${drug.pKa}): Phân ly chủ yếu thành anion A⁻ mang điện tích âm (${fractionIonizedPercent}%), khó khuếch tán thụ động qua lipid.`;
      }
    } else if (drug.nature === 'WEAK_BASE') {
      if (org.ph > drug.pKa) {
        explanationVi = `pH > pKa (${org.ph} > ${drug.pKa}): Tồn tại ở dạng base tự do B không mang điện (${fractionUnIonizedPercent}%), khuếch tán tối ưu qua biểu mô.`;
      } else {
        explanationVi = `pH < pKa (${org.ph} < ${drug.pKa}): Bị proton hóa thành cation BH⁺ (${fractionIonizedPercent}%), giữ thuốc lại trong pha nước (ion trapping).`;
      }
    } else {
      explanationVi = `Thuốc trung tính/acid cực yếu: Dạng không ion hóa chiếm ${fractionUnIonizedPercent}%, hấp thu dễ dàng qua toàn bộ chiều dài ống tiêu hóa.`;
    }

    return {
      organNameVi: org.nameVi,
      nominalPh: org.ph,
      fractionUnIonizedPercent,
      fractionIonizedPercent,
      isFavorableForPassiveAbsorption: isFavorable,
      explanationVi
    };
  });
}

// =============================================================================
// 2. ONE-COMPARTMENT PHARMACOKINETICS & BATEMAN FUNCTION
// =============================================================================

export interface TimeConcentrationPoint {
  timeHours: number;
  concentrationMgL: number;
  inTherapeuticWindow: boolean;
  isSubTherapeutic: boolean;
  isToxic: boolean;
}

export interface PharmacokineticSimulationResult {
  drug: DrugProfile;
  doseMg: number;
  bodyWeightKg: number;
  eliminationRateConstantKe: number; // ke = ln(2) / t1/2
  apparentVolumeOfDistributionL: number; // Vd = Vd_per_kg * weight
  clearanceLPerHr: number; // Cl = ke * Vd
  cMaxMgL: number;
  tMaxHours: number;
  areaUnderCurveAuc: number; // AUC = (F * Dose) / Cl
  curvePoints: TimeConcentrationPoint[];
  fiveHalfLivesHours: number;
  percentRemainingAtFiveHalfLives: number; // ~3.125%
}

/**
 * Simulates plasma concentration over time following single oral dose using Bateman function:
 * C(t) = [F * Dose * ka / (Vd * (ka - ke))] * (e^(-ke * t) - e^(-ka * t))
 */
export function simulateOralSingleDose(
  drugId: string,
  doseMg: number,
  bodyWeightKg: number = 60,
  maxHours: number = 24
): PharmacokineticSimulationResult {
  const drug = DRUG_CATALOG.find(d => d.id === drugId) || DRUG_CATALOG[0];

  const ke = Math.log(2) / drug.halfLifeHours;
  // Typical oral absorption rate constant ka is 3 to 6 times ke
  const ka = Math.max(1.5, ke * 4.0);

  const Vd = drug.volumeOfDistributionLPerKg * bodyWeightKg;
  const F = drug.bioavailabilityFraction;
  const Cl = ke * Vd;
  const AUC = (F * doseMg) / Cl;

  // Analytical Tmax = ln(ka / ke) / (ka - ke)
  const tMaxHours = parseFloat((Math.log(ka / ke) / (ka - ke)).toFixed(2));
  
  // Calculate Cmax at Tmax
  const batemanFactor = (F * doseMg * ka) / (Vd * (ka - ke));
  const cMaxMgL = parseFloat(
    (batemanFactor * (Math.exp(-ke * tMaxHours) - Math.exp(-ka * tMaxHours))).toFixed(3)
  );

  // Generate curve points
  const step = maxHours / 48; // 48 points
  const curvePoints: TimeConcentrationPoint[] = [];

  for (let t = 0; t <= maxHours; t += step) {
    const tRounded = parseFloat(t.toFixed(2));
    let conc = 0;
    if (tRounded > 0) {
      conc = batemanFactor * (Math.exp(-ke * tRounded) - Math.exp(-ka * tRounded));
      conc = Math.max(0, conc);
    }
    const concRounded = parseFloat(conc.toFixed(3));
    const inTherapeutic = concRounded >= drug.therapeuticWindow.mec && concRounded <= drug.therapeuticWindow.mtc;
    const isSub = concRounded < drug.therapeuticWindow.mec;
    const isTox = concRounded > drug.therapeuticWindow.mtc;

    curvePoints.push({
      timeHours: tRounded,
      concentrationMgL: concRounded,
      inTherapeuticWindow: inTherapeutic,
      isSubTherapeutic: isSub,
      isToxic: isTox
    });
  }

  const fiveHalfLives = parseFloat((5 * drug.halfLifeHours).toFixed(1));
  const remainingAtFiveHalfLives = parseFloat((Math.pow(0.5, 5) * 100).toFixed(3)); // 3.125%

  return {
    drug,
    doseMg,
    bodyWeightKg,
    eliminationRateConstantKe: parseFloat(ke.toFixed(4)),
    apparentVolumeOfDistributionL: parseFloat(Vd.toFixed(2)),
    clearanceLPerHr: parseFloat(Cl.toFixed(2)),
    cMaxMgL,
    tMaxHours,
    areaUnderCurveAuc: parseFloat(AUC.toFixed(2)),
    curvePoints,
    fiveHalfLivesHours: fiveHalfLives,
    percentRemainingAtFiveHalfLives: remainingAtFiveHalfLives
  };
}

// =============================================================================
// 3. PARACETAMOL OVERDOSE & NAC (N-ACETYLCYSTEINE) ANTIDOTE RESCUE
// =============================================================================

export interface ParacetamolOverdoseAssessment {
  ingestedDoseGrams: number;
  hoursPostIngestion: number;
  plasmaParacetamolMgL: number;
  rumackMatthew150LineMgL: number; // 150 mg/L at 4h, half-life 4h line
  isHepatotoxicRiskHigh: boolean;
  hepaticGlutathioneDepletedPercent: number;
  toxicNapqiLevelArbitraryUnits: number;
  nacAdministered: boolean;
  clinicalOutcomeVi: string;
  biochemicalMechanismVi: string;
}

/**
 * Assesses acute Paracetamol overdose against the Rumack-Matthew nomogram.
 * Treatment line starts at 150 mg/L at 4 hours post-ingestion.
 */
export function assessParacetamolOverdoseAndNac(
  ingestedDoseGrams: number,
  hoursPostIngestion: number,
  nacAdministered: boolean
): ParacetamolOverdoseAssessment {
  const safeDose = Math.max(0.5, ingestedDoseGrams);
  const safeHours = Math.max(1, Math.min(24, hoursPostIngestion));

  // Estimate plasma concentration (peak ~ 1-2h, then declines with t1/2 ~ 2-4h in overdose)
  const peakConcMgL = (safeDose * 1000 * 0.85) / 54; // 54 L Vd for 60kg adult
  const overdoseT12 = safeDose > 10 ? 4.0 : 2.5; // Half-life prolongs in severe overdose
  const decayTime = Math.max(0, safeHours - 1.5);
  const plasmaConc = parseFloat((peakConcMgL * Math.pow(0.5, decayTime / overdoseT12)).toFixed(1));

  // Rumack-Matthew 150-treatment line: 150 mg/L at 4 hours, declines with t1/2 = 4h
  // Line formula: C_line(t) = 150 * (0.5)^((t - 4) / 4)
  const rumackLine = parseFloat((150 * Math.pow(0.5, (safeHours - 4) / 4.0)).toFixed(1));
  const isHighRisk = safeHours >= 4 && plasmaConc >= rumackLine;

  let glutathioneDepletion = Math.min(98, Math.round((safeDose / 12.0) * 80));
  let napqiLevel = parseFloat((safeDose * 0.05 * 10).toFixed(1)); // 5% shunted to NAPQI

  let outcomeVi = '';
  let mechanismVi = '';

  if (safeDose <= 4.0) {
    outcomeVi = 'Liều điều trị an toàn (≤ 4g/ngày). Glutathione tế bào gan trung hòa hoàn toàn lượng nhỏ NAPQI sinh ra.';
    mechanismVi = '95% Paracetamol liên hợp Glucuronide và Sulfate bài tiết qua nước tiểu; 5% NAPQI được Glutathione bất hoạt thành axit mercapturic vô hại.';
  } else if (!isHighRisk && !nacAdministered) {
    outcomeVi = 'Nồng độ dưới ngưỡng chỉ định dùng NAC theo Rumack-Matthew. Cần theo dõi men gan (ALT/AST).';
    mechanismVi = 'Dự trữ Glutathione giảm nhẹ nhưng tế bào gan vẫn đủ khả năng giải độc.';
  } else if (isHighRisk && !nacAdministered) {
    outcomeVi = 'NGUY CƠ HOẠI TỬ TẾ BÀO GAN CẤP TÍNH (Acute Liver Failure). Men gan tăng vọt > 1.000 U/L.';
    mechanismVi = 'Glutathione cạn kiệt (> 70%), NAPQI dư thừa phản ứng liên kết đồng hóa trị với nhóm sulfhydryl của protein ty thể gan, gây hoại tử thùy trung tâm.';
  } else {
    // High risk BUT NAC administered
    glutathioneDepletion = 15; // restored by NAC!
    outcomeVi = 'HỒI PHỤC HOÀN TOÀN: N-Acetylcysteine (NAC) giải độc thành công, ngăn ngừa tổn thương gan vĩnh viễn.';
    mechanismVi = 'NAC cung cấp L-cysteine làm tiền chất tổng hợp mới Glutathione dự trữ, đồng thời trực tiếp khử và kết hợp với NAPQI thành hợp chất không độc.';
  }

  return {
    ingestedDoseGrams: safeDose,
    hoursPostIngestion: safeHours,
    plasmaParacetamolMgL: plasmaConc,
    rumackMatthew150LineMgL: rumackLine,
    isHepatotoxicRiskHigh: isHighRisk,
    hepaticGlutathioneDepletedPercent: glutathioneDepletion,
    toxicNapqiLevelArbitraryUnits: napqiLevel,
    nacAdministered,
    clinicalOutcomeVi: outcomeVi,
    biochemicalMechanismVi: mechanismVi
  };
}
