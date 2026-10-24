// src/domain/esiMassSpecEngine.ts
// Milestone 76: Electrospray Ionization Mass Spectrometry (ESI-MS), Multiple Charging & Macromolecular Deconvolution Engine
// Standards: John B. Fenn (Nobel Prize in Chemistry 2002) & IUPAC Mass Spectrometry Terminology
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Khối phổ MS xác định phân tử khối và đồng vị; Hóa học 12: Protein, cấu trúc bậc 1 của insulin, kháng thể đơn dòng mAb, công nghệ sinh học phân tử; Sinh học 10: Axit nucleic DNA/RNA và giải trình tự)

export const PROTON_MASS_DA = 1.007276466621; // Dalton (Da)
export const ELECTRON_CHARGE_COULOMB = 1.602176634e-19; // C
export const VACUUM_PERMITTIVITY_F_PER_M = 8.8541878128e-12; // F/m

export type EsiPolarityMode = 'POSITIVE_ION' | 'NEGATIVE_ION';

export type MacromoleculeClass =
  | 'GLOBULAR_HEME_PROTEIN'
  | 'SERUM_ALBUMIN'
  | 'PEPTIDE_HORMONE'
  | 'MONOCLONAL_ANTIBODY'
  | 'RNA_OLIGONUCLEOTIDE';

export interface ChargeStatePeak {
  chargeZ: number; // z (e.g. +10, +11, +12 or -6, -7)
  massToChargeMz: number; // m/z (Thomsons, Th)
  relativeIntensityPercent: number; // 0 to 100%
  deconvolutedMassDa: number; // Calculated neutral mass M
  theoreticalMz: number;
  adductIdentity: string; // e.g. "[M + 12H]12+"
}

export interface EsiStandard {
  id: string;
  name: string;
  vietnameseName: string;
  chemicalFormula: string;
  macromoleculeClass: MacromoleculeClass;
  polarityMode: EsiPolarityMode;
  trueNeutralMolecularWeightDa: number; // Accurate average mass M
  capillaryVoltageKv: number; // High voltage (typically 2.5 - 4.5 kV)
  desolvationGasTempCelsius: number; // N2 drying gas (typically 200 - 350 °C)
  minimumChargeZ: number;
  maximumChargeZ: number;
  mostAbundantChargeZ: number;
  envelopeGaussianWidthZ: number;
  spectralNoisePercent: number;
  description: string;
  curriculumNotes: string;
  biotechApplication: string;
  nobelCitation: string;
}

export interface DeconvolutedMassComponent {
  molecularWeightDa: number;
  intensityPercent: number;
  chargeStatesObserved: number[];
  massAccuracyPpm: number;
}

export interface EsiSpectrumPoint {
  massToChargeMz: number; // m/z axis (e.g. 500 to 3500 Th)
  intensityPercent: number; // 0 to 100%
  isChargePeak: boolean;
  assignedChargeZ?: number;
}

export interface EsiSimulationResult {
  standard: EsiStandard;
  chargeEnvelopePeaks: ChargeStatePeak[];
  deconvolutedMasses: DeconvolutedMassComponent[];
  calculatedNeutralMassDa: number;
  massAccuracyErrorDa: number;
  massAccuracyPpm: number;
  spectrumCurve: EsiSpectrumPoint[];
  rayleighDropletChargeLimitFc: number; // Femtocoulombs
}

/**
 * Standard Catalog: 5 Historical & Biopharmaceutical ESI-MS Standards
 */
export const ESI_STANDARD_CATALOG: EsiStandard[] = [
  {
    id: 'horse_heart_cytochrome_c',
    name: 'Equine Heart Cytochrome c (John Fenn Historical Calibrant)',
    vietnameseName: 'Cytochrome c Tim Ngựa (Chuẩn Lịch Sử Nobel 2002 John Fenn - Khối Lượng 12,360 Da)',
    chemicalFormula: 'C535H858N148O151S4Fe (104 amino acids + covalently bound heme c)',
    macromoleculeClass: 'GLOBULAR_HEME_PROTEIN',
    polarityMode: 'POSITIVE_ION',
    trueNeutralMolecularWeightDa: 12360.1,
    capillaryVoltageKv: 3.2,
    desolvationGasTempCelsius: 250,
    minimumChargeZ: 8,
    maximumChargeZ: 18,
    mostAbundantChargeZ: 13, // [M + 13H]13+ at m/z = 951.8 Th
    envelopeGaussianWidthZ: 2.2,
    spectralNoisePercent: 2.5,
    description:
      'The foundational standard presented by John B. Fenn in his landmark 1989 Science paper and 2002 Nobel lecture. Electrospray transforms the intact 12.36 kDa metalloprotein into a pristine Gaussian envelope of multiple protonated ions ([M + 8H]8+ through [M + 18H]18+), completely preserving the non-covalent heme coordination without thermal fragmentation.',
    curriculumNotes:
      'GDPT 2018 Hóa học 10 & 12: Nguyên lý khối phổ ESI-MS xác định chính xác phân tử khối protein; cấu trúc chuỗi polypeptide bậc 1, 2, 3 và nhóm ngoại heme tham gia chuỗi truyền electron hô hấp tế bào.',
    biotechApplication:
      'Universal primary mass spectrometer calibrant and benchmark for charge state deconvolution algorithms.',
    nobelCitation:
      'Nobel Prize in Chemistry 2002 (John B. Fenn) "for the development of methods for identification and structure analyses of biological macromolecules".',
  },
  {
    id: 'human_recombinant_insulin',
    name: 'Recombinant Human Insulin (Therapeutic Standard)',
    vietnameseName: 'Insulin Tái Tổ Hợp Người (Tiêu Chuẩn Dược Phẩm QC - 5,808 Da & 3 Cầu Disulfide)',
    chemicalFormula: 'C257H383N65O77S6 (A-chain 21 aa, B-chain 30 aa, 3 S-S bridges)',
    macromoleculeClass: 'PEPTIDE_HORMONE',
    polarityMode: 'POSITIVE_ION',
    trueNeutralMolecularWeightDa: 5807.6,
    capillaryVoltageKv: 2.8,
    desolvationGasTempCelsius: 220,
    minimumChargeZ: 3,
    maximumChargeZ: 6,
    mostAbundantChargeZ: 4, // [M + 4H]4+ at m/z = 1452.9 Th
    envelopeGaussianWidthZ: 1.1,
    spectralNoisePercent: 1.8,
    description:
      'Human insulin is the paramount biopharmaceutical quality control standard. Intact ESI-MS immediately reveals the [M + 4H]4+ (m/z 1452.9 Th) and [M + 5H]5+ (m/z 1162.5 Th) ions, enabling single-Dalton resolution to detect deamidation (Asp/Glu +1 Da), oxidation (+16 Da), or incorrect disulfide pairing.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12: Hormone peptide điều hòa đường huyết, liên kết disulfide (-S-S-) nối 2 chuỗi polypeptide A và B; công nghệ DNA tái tổ hợp sản xuất insulin trong vi khuẩn E. coli.',
    biotechApplication:
      'Batch-release purity testing, biosimilar comparability, and formulation stability monitoring.',
    nobelCitation:
      'Historical echo to Frederick Sanger (Nobel Prize in Chemistry 1958) for the first primary protein sequence determination.',
  },
  {
    id: 'bovine_serum_albumin_bsa',
    name: 'Bovine Serum Albumin (BSA 66.4 kDa)',
    vietnameseName: 'Albumin Huyết Thanh Bò (BSA - Khối Lượng 66,430 Da & Dải Đa Tích Điện 30+ Đến 60+)',
    chemicalFormula: 'C2934H4615N781O897S39 (583 amino acids, 17 disulfide bonds)',
    macromoleculeClass: 'SERUM_ALBUMIN',
    polarityMode: 'POSITIVE_ION',
    trueNeutralMolecularWeightDa: 66430.3,
    capillaryVoltageKv: 3.8,
    desolvationGasTempCelsius: 300,
    minimumChargeZ: 32,
    maximumChargeZ: 62,
    mostAbundantChargeZ: 45, // [M + 45H]45+ at m/z = 1477.2 Th
    envelopeGaussianWidthZ: 5.5,
    spectralNoisePercent: 3.0,
    description:
      'Bovine serum albumin demonstrates how Fenn\'s electrospray allows a large 66.4 kDa protein to carry over 45 positive charges, bringing its mass-to-charge ratio into the modest 1,100 - 2,000 Th range easily accessible by benchtop quadrupole or Orbitrap mass spectrometers.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 & Sinh học 10: Protein hình cầu vận chuyển acid béo và thuốc trong máu; điện ly đa proton của các nhóm amino (-NH2) lysin, histidin và arginin.',
    biotechApplication:
      'Standard blocking agent in molecular biology and standard reference for high-mass multiple charging envelopes.',
    nobelCitation:
      'Key prototype in Fenn\'s proof that megadalton proteins can be analyzed without breaking chemical bonds.',
  },
  {
    id: 'monoclonal_antibody_igg1',
    name: 'Therapeutic Monoclonal Antibody (Intact IgG1 148.5 kDa)',
    vietnameseName: 'Kháng Thể Đơn Dòng Điều Trị IgG1 (Cụm Đại Phân Tử 148.5 kDa & Phân Tích Glycan)',
    chemicalFormula: '2x Heavy Chains (50 kDa) + 2x Light Chains (25 kDa) + Core G0F/G1F Glycans',
    macromoleculeClass: 'MONOCLONAL_ANTIBODY',
    polarityMode: 'POSITIVE_ION',
    trueNeutralMolecularWeightDa: 148500.0,
    capillaryVoltageKv: 4.2,
    desolvationGasTempCelsius: 320,
    minimumChargeZ: 42,
    maximumChargeZ: 60,
    mostAbundantChargeZ: 50, // [M + 50H]50+ at m/z = 2971.0 Th
    envelopeGaussianWidthZ: 4.2,
    spectralNoisePercent: 3.5,
    description:
      'Monoclonal antibodies (mAbs like Trastuzumab, Pembrolizumab) are the largest class of modern targeted cancer biotherapeutics. Intact ESI-MS deconvolution resolves the entire 148.5 kDa heterotetramer ([M + 45H]45+ to [M + 55H]55+), accurately quantifying micro-heterogeneous glycoforms (G0F, G1F, G2F) differing by just 162 Da (galactose units).',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 & Sinh học 11: Kháng thể dịch thể, liên kết glycoprotein, liệu pháp miễn dịch nhắm đích điều trị ung thư và các bệnh lý tự miễn.',
    biotechApplication:
      'Biopharmaceutical intact mass profiling, glycoform distribution, and antibody-drug conjugate (ADC) drug-to-antibody ratio (DAR) determination.',
    nobelCitation:
      'Critical pillar of modern molecular medicine and biomanufacturing analytics.',
  },
  {
    id: 'synthetic_rna_oligonucleotide',
    name: 'Synthetic 24-nt RNA Guide Oligonucleotide (Negative Mode)',
    vietnameseName: 'Oligonucleotide RNA 24-nt Tổng Hợp (Chế Độ Ion Âm [M - zH]z- & Giải Trình Tự Khối Phổ)',
    chemicalFormula: '5\'-AUGCAUGCACGUAGCUAGCUAGCU-3\' (76 Phosphodiester backbone links)',
    macromoleculeClass: 'RNA_OLIGONUCLEOTIDE',
    polarityMode: 'NEGATIVE_ION',
    trueNeutralMolecularWeightDa: 7652.8,
    capillaryVoltageKv: -2.9,
    desolvationGasTempCelsius: 220,
    minimumChargeZ: -10,
    maximumChargeZ: -4,
    mostAbundantChargeZ: -7, // [M - 7H]7- at m/z = 1092.3 Th
    envelopeGaussianWidthZ: 1.4,
    spectralNoisePercent: 2.0,
    description:
      'Therapeutic oligonucleotides (siRNA, antisense ASO, mRNA vaccines) bear polyanionic phosphodiester backbones and are analyzed in negative ion mode ESI-MS. Deconvolution of the [M - 5H]5- through [M - 8H]8- envelope verifies sequence fidelity and detects n-1 failure sequences and phosphorothioate diastereomers.',
    curriculumNotes:
      'GDPT 2018 Sinh học 10 & Hóa học 12: Axit ribonucleic RNA, liên kết phosphodiester, ứng dụng can thiệp RNAi và vaccine công nghệ mRNA.',
    biotechApplication:
      'siRNA impurity profiling, antisense oligonucleotide synthesis monitoring, and CRISPR guide RNA verification.',
    nobelCitation:
      'Direct link to Nobel Prize in Physiology or Medicine 2006 (Fire & Mello) for RNA interference.',
  },
];

/**
 * Calculate theoretical m/z for a given neutral mass M, charge z, and polarity
 */
export function calculateTheoreticalMz(
  neutralMassDa: number,
  chargeZ: number,
  polarity: EsiPolarityMode = 'POSITIVE_ION'
): number {
  if (chargeZ === 0) return neutralMassDa;
  const absZ = Math.abs(chargeZ);
  if (polarity === 'POSITIVE_ION') {
    return (neutralMassDa + absZ * PROTON_MASS_DA) / absZ;
  } else {
    return (neutralMassDa - absZ * PROTON_MASS_DA) / absZ;
  }
}

/**
 * Deconvolute charge state z from two adjacent peaks in the mass spectrum:
 * In positive mode: z_1 = ( (m/z)_2 - m_p ) / ( (m/z)_1 - (m/z)_2 )
 * where (m/z)_1 corresponds to charge z_1, and (m/z)_2 corresponds to z_1 + 1 (lower m/z)
 */
export function deconvoluteAdjacentChargeState(
  mz1: number, // Higher m/z (lower charge z)
  mz2: number, // Lower m/z (higher charge z + 1)
  polarity: EsiPolarityMode = 'POSITIVE_ION'
): { calculatedZ1: number; roundedZ1: number; deconvolutedMassDa: number } {
  const deltaMz = mz1 - mz2;
  if (deltaMz <= 0) {
    return { calculatedZ1: 0, roundedZ1: 0, deconvolutedMassDa: 0 };
  }

  let z1Exact: number;
  let mass: number;

  if (polarity === 'POSITIVE_ION') {
    z1Exact = (mz2 - PROTON_MASS_DA) / deltaMz;
    const roundedZ1 = Math.max(1, Math.round(z1Exact));
    mass = roundedZ1 * (mz1 - PROTON_MASS_DA);
    return { calculatedZ1: z1Exact, roundedZ1, deconvolutedMassDa: mass };
  } else {
    z1Exact = (mz2 + PROTON_MASS_DA) / deltaMz;
    const roundedZ1 = Math.max(1, Math.round(z1Exact));
    mass = roundedZ1 * (mz1 + PROTON_MASS_DA);
    return { calculatedZ1: z1Exact, roundedZ1, deconvolutedMassDa: mass };
  }
}

/**
 * Calculate Rayleigh Droplet Charge Limit (in femtocoulombs):
 * q_R = 8 * pi * sqrt(epsilon_0 * gamma * R^3)
 * For water: gamma = 0.0728 N/m, R ~ 1.0 micrometer
 */
export function calculateRayleighChargeLimitFemtocoulombs(radiusMicrometers: number = 1.0): number {
  const rMeters = radiusMicrometers * 1e-6;
  const gammaWater = 0.0728; // N/m
  const qCoulomb =
    8 * Math.PI * Math.sqrt(VACUUM_PERMITTIVITY_F_PER_M * gammaWater * Math.pow(rMeters, 3));
  return qCoulomb * 1e15; // convert Coulomb to femtocoulombs (fC)
}

/**
 * Simulate ESI Mass Spectrum and Multiple Charging Envelope
 */
export function simulateEsiMassSpectrum(standard: EsiStandard): EsiSimulationResult {
  const massM = standard.trueNeutralMolecularWeightDa;
  const polarity = standard.polarityMode;
  const minZ = Math.min(Math.abs(standard.minimumChargeZ), Math.abs(standard.maximumChargeZ));
  const maxZ = Math.max(Math.abs(standard.minimumChargeZ), Math.abs(standard.maximumChargeZ));
  const peakZ = Math.abs(standard.mostAbundantChargeZ);
  const widthZ = standard.envelopeGaussianWidthZ;

  const peaks: ChargeStatePeak[] = [];
  const calculatedMasses: number[] = [];

  // Generate discrete charge peaks
  for (let z = minZ; z <= maxZ; z++) {
    const theoreticalMz = calculateTheoreticalMz(massM, z, polarity);

    // Gaussian intensity distribution across charge states
    const distZ = z - peakZ;
    const intensity = 100.0 * Math.exp(-(distZ * distZ) / (2 * widthZ * widthZ));

    const signedZ = polarity === 'POSITIVE_ION' ? z : -z;
    const adductStr =
      polarity === 'POSITIVE_ION' ? `[M + ${z}H]${z}+` : `[M - ${z}H]${z}-`;

    const deconvolutedMass =
      polarity === 'POSITIVE_ION'
        ? z * (theoreticalMz - PROTON_MASS_DA)
        : z * (theoreticalMz + PROTON_MASS_DA);

    calculatedMasses.push(deconvolutedMass);

    peaks.push({
      chargeZ: signedZ,
      massToChargeMz: Math.round(theoreticalMz * 100) / 100,
      relativeIntensityPercent: Math.round(intensity * 10) / 10,
      deconvolutedMassDa: Math.round(deconvolutedMass * 10) / 10,
      theoreticalMz: Math.round(theoreticalMz * 1000) / 1000,
      adductIdentity: adductStr,
    });
  }

  // Average deconvoluted neutral mass
  const avgDeconvolutedMass =
    calculatedMasses.length > 0
      ? calculatedMasses.reduce((acc, val) => acc + val, 0) / calculatedMasses.length
      : massM;
  const massErrorDa = avgDeconvolutedMass - massM;
  const massAccuracyPpm = (Math.abs(massErrorDa) / massM) * 1e6;

  // Generate continuous ESI mass spectrum (m/z curve)
  const allMz = peaks.length > 0 ? peaks.map((p) => p.massToChargeMz) : [massM];
  const mzMin = Math.max(100, Math.floor(Math.min(...allMz) * 0.85));
  const mzMax = Math.ceil(Math.max(...allMz) * 1.15);
  const stepMz = Math.max(0.5, (mzMax - mzMin) / 800);

  const spectrumCurve: EsiSpectrumPoint[] = [];

  for (let mz = mzMin; mz <= mzMax; mz += stepMz) {
    let totalIntensity = 0;
    let matchingZ: number | undefined = undefined;

    // Sum Lorentzian/Gaussian peaks for each charge state
    for (const pk of peaks) {
      const dMz = mz - pk.theoreticalMz;
      const hwhm = 0.8; // Peak resolution width (Th)
      const peakShape = pk.relativeIntensityPercent / (1 + (dMz * dMz) / (hwhm * hwhm));
      totalIntensity += peakShape;

      if (Math.abs(dMz) < hwhm * 0.5) {
        matchingZ = pk.chargeZ;
      }
    }

    // Baseline noise
    const noise = (Math.sin(mz * 1.5) + Math.cos(mz * 2.8)) * (standard.spectralNoisePercent * 0.2);
    const finalIntensity = Math.max(0, Math.min(100, totalIntensity + noise));

    spectrumCurve.push({
      massToChargeMz: Math.round(mz * 10) / 10,
      intensityPercent: Math.round(finalIntensity * 10) / 10,
      isChargePeak: matchingZ !== undefined && finalIntensity > 15,
      assignedChargeZ: matchingZ,
    });
  }

  const rayleighLimitFc = calculateRayleighChargeLimitFemtocoulombs(1.0);

  return {
    standard,
    chargeEnvelopePeaks: peaks,
    deconvolutedMasses: [
      {
        molecularWeightDa: Math.round(avgDeconvolutedMass * 10) / 10,
        intensityPercent: 100.0,
        chargeStatesObserved: peaks.map((p) => p.chargeZ),
        massAccuracyPpm: Math.round(massAccuracyPpm * 10) / 10,
      },
    ],
    calculatedNeutralMassDa: Math.round(avgDeconvolutedMass * 10) / 10,
    massAccuracyErrorDa: Math.round(massErrorDa * 100) / 100,
    massAccuracyPpm: Math.round(massAccuracyPpm * 10) / 10,
    spectrumCurve,
    rayleighDropletChargeLimitFc: Math.round(rayleighLimitFc * 100) / 100,
  };
}

/**
 * Match card to appropriate ESI-MS standard
 */
export function getMatchingEsiCard(card: any): EsiStandard | null {
  if (!card) return null;
  const cardName = (card.name || '').toLowerCase();
  const cardFormula = (card.formula || '').toLowerCase();
  const cardCategory = (card.category || '').toLowerCase();

  // 1. Cytochrome c
  if (
    cardName.includes('cytochrome') ||
    cardName.includes('fenn') ||
    cardName.includes('heme c') ||
    cardFormula.includes('fe') && cardName.includes('protein')
  ) {
    return ESI_STANDARD_CATALOG.find((s) => s.id === 'horse_heart_cytochrome_c') || null;
  }

  // 2. Insulin
  if (
    cardName.includes('insulin') ||
    cardName.includes('hormone') ||
    cardFormula.includes('c257')
  ) {
    return ESI_STANDARD_CATALOG.find((s) => s.id === 'human_recombinant_insulin') || null;
  }

  // 3. Bovine Serum Albumin / BSA
  if (
    cardName.includes('bsa') ||
    cardName.includes('albumin') ||
    cardName.includes('serum')
  ) {
    return ESI_STANDARD_CATALOG.find((s) => s.id === 'bovine_serum_albumin_bsa') || null;
  }

  // 4. Monoclonal Antibody IgG1
  if (
    cardName.includes('kháng thể') ||
    cardName.includes('antibody') ||
    cardName.includes('igg') ||
    cardName.includes('mab')
  ) {
    return ESI_STANDARD_CATALOG.find((s) => s.id === 'monoclonal_antibody_igg1') || null;
  }

  // 5. RNA Oligonucleotide
  if (
    cardName.includes('rna') ||
    cardName.includes('oligo') ||
    cardName.includes('sirna') ||
    cardName.includes('nucleic')
  ) {
    return ESI_STANDARD_CATALOG.find((s) => s.id === 'synthetic_rna_oligonucleotide') || null;
  }

  return null;
}

/**
 * Validation helper for ESI standard
 */
export function validateEsiStandardPhysics(standard: EsiStandard): boolean {
  if (standard.trueNeutralMolecularWeightDa <= 500) return false;
  if (standard.minimumChargeZ === 0 || standard.maximumChargeZ === 0) return false;
  if (standard.minimumChargeZ >= standard.maximumChargeZ) return false;
  if (standard.capillaryVoltageKv === 0) return false;
  if (standard.envelopeGaussianWidthZ <= 0) return false;
  return true;
}
