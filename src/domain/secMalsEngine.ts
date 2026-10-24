/**
 * SEC-MALS (Size Exclusion Chromatography with Multi-Angle Light Scattering) & Zimm Plot Engine
 * 
 * Physical Principles & Standards:
 * 1. Rayleigh-Gans-Debye Light Scattering:
 *    (K* * c) / R(theta) = 1 / (M_w * P(theta)) + 2 * A_2 * c
 *    where:
 *    - K* = 4 * pi^2 * n_0^2 * (dn/dc)^2 / (lambda_0^4 * N_A) [Optical Constant]
 *    - dn/dc = refractive index increment (0.185 mL/g for standard globular proteins)
 *    - P(theta) = form factor: 1 / P(theta) ~ 1 + (16 * pi^2 * n_0^2 / (3 * lambda_0^2)) * R_g^2 * sin^2(theta / 2)
 * 2. Zimm Plot & Absolute Molar Mass:
 *    Double extrapolation to theta -> 0 and c -> 0 yields:
 *    - y-intercept = 1 / M_w (absolute molecular mass without column calibration standards!)
 *    - Initial slope vs sin^2(theta/2) = radius of gyration R_g
 *    - Initial slope vs c = second virial coefficient A_2
 * 3. Polydispersity Index (PDI):
 *    PDI = M_w / M_n (monomer standard has PDI ~ 1.002, aggregated formulations have PDI > 1.20)
 * 4. 5 Benchmark Standards:
 *    - Bovine Serum Albumin (BSA) Oligomer Ladder (Monomer 66.4 kDa, Dimer 132.8 kDa, Trimer 199.2 kDa)
 *    - Therapeutic Monoclonal Antibody IgG1 Aggregates (Monomer 148.5 kDa vs Dimer vs HMW, USP <129>)
 *    - Adeno-Associated Virus (AAV) Full vs Empty Capsid Mass (3.8 MDa capsid + 1.5 MDa DNA payload)
 *    - Dextran 70 kDa Polysaccharide Conformation (Random coil polymer, dn/dc = 0.142 mL/g)
 *    - NIST Monoclonal Antibody RM 8671 (Certified standard M_w = 148.2 kDa)
 * 5. Vietnam GDPT 2018 Curriculum:
 *    - Hóa học 12: Khối lượng mol phân tử polymer & protein, sự đồng thể và đa phân tán PDI.
 *    - Vật lý 12: Hiện tượng tán xạ Rayleigh, tán xạ đàn hồi và khúc xạ ánh sáng (định luật Snell).
 */

export const AVOGADRO_CONSTANT = 6.02214076e23;
export const LASER_WAVELENGTH_NM = 658.0; // 658 nm red diode laser
export const WATER_REFRACTIVE_INDEX = 1.331; // at 658 nm
export const PROTEIN_STANDARD_DN_DC_ML_G = 0.185; // mL/g

export interface SecMalsPeakSpecies {
  name: string;
  nominalMwDa: number;
  apparentRgNm: number; // Radius of gyration
  elutionVolumeMl: number; // SEC retention volume
  peakFractionPercent: number; // Abundance
  polydispersityIndexPdi: number; // Mw / Mn
  stoichiometry: string;
}

export interface SecMalsStandard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: 'PROTEIN_OLIGOMER' | 'MAB_AGGREGATE' | 'GENE_THERAPY_VECTOR' | 'POLYSACCHARIDE_CONFORMATION' | 'NIST_REFERENCE';
  dnDcMlPerG: number;
  carrierBuffer: string;
  speciesList: SecMalsPeakSpecies[];
  secondVirialCoefficientA2MolMlG2: number; // A_2 interaction parameter
  description: string;
  curriculumNotes: string;
  uspPharmacopeiaRef: string;
}

export interface SecMalsSlicePoint {
  elutionVolumeMl: number;
  uvAbsorbance280: number; // UV trace
  refractiveIndexDiffRI: number; // dRI trace (concentration)
  lightScattering90Deg: number; // 90° LS Rayleigh ratio
  calculatedMwDa: number; // slice-by-slice absolute Mw
  calculatedRgNm: number; // slice-by-slice Rg
}

export interface ZimmPlotPoint {
  angleDegrees: number;
  sin2HalfAngle: number;
  kcOverRTheta: number; // (K* * c) / R(theta) in mol/g
}

export interface SecMalsSimulationResult {
  standard: SecMalsStandard;
  slices: SecMalsSlicePoint[];
  zimmPlotPoints: ZimmPlotPoint[];
  opticalConstantKStar: number;
  measuredWeightAverageMwDa: number;
  measuredNumberAverageMnDa: number;
  overallPdi: number;
  measuredRgNm: number;
  uspComplianceNotes: string;
  curriculumIntegration: string;
}

/**
 * Calculate Optical Constant K*:
 * K* = 4 * pi^2 * n_0^2 * (dn/dc)^2 / (lambda_0^4 * N_A)
 * Output in mol * cm^2 / g^2
 */
export function calculateOpticalConstantKStar(
  dnDcMlPerG: number = PROTEIN_STANDARD_DN_DC_ML_G,
  lambdaNm: number = LASER_WAVELENGTH_NM,
  refractiveIndex: number = WATER_REFRACTIVE_INDEX
): number {
  const lambdaCm = lambdaNm * 1e-7;
  const numerator = 4.0 * Math.pow(Math.PI, 2) * Math.pow(refractiveIndex, 2) * Math.pow(dnDcMlPerG, 2);
  const denominator = Math.pow(lambdaCm, 4) * AVOGADRO_CONSTANT;
  return numerator / denominator;
}

/**
 * Standard Catalog: 5 Benchmark SEC-MALS Systems
 */
export const SEC_MALS_CATALOG: SecMalsStandard[] = [
  {
    id: 'bsa_oligomeric_ladder',
    name: 'Bovine Serum Albumin (BSA) Oligomer Ladder Calibration',
    vietnameseName: 'Chuẩn Thang Oligomer BSA - Phân Tích Đa Đơn Vị (Monomer / Dimer / Trimer)',
    applicationCategory: 'PROTEIN_OLIGOMER',
    dnDcMlPerG: 0.185,
    carrierBuffer: '50 mM Sodium Phosphate, 150 mM NaCl, pH 7.0, 0.02% NaN3',
    speciesList: [
      {
        name: 'BSA Monomer',
        nominalMwDa: 66430,
        apparentRgNm: 3.1,
        elutionVolumeMl: 8.8,
        peakFractionPercent: 84.5,
        polydispersityIndexPdi: 1.002,
        stoichiometry: '1x (Monomer)',
      },
      {
        name: 'BSA Dimer',
        nominalMwDa: 132860,
        apparentRgNm: 4.8,
        elutionVolumeMl: 7.9,
        peakFractionPercent: 12.8,
        polydispersityIndexPdi: 1.005,
        stoichiometry: '2x (Dimer)',
      },
      {
        name: 'BSA Trimer',
        nominalMwDa: 199290,
        apparentRgNm: 6.2,
        elutionVolumeMl: 7.2,
        peakFractionPercent: 2.7,
        polydispersityIndexPdi: 1.012,
        stoichiometry: '3x (Trimer)',
      },
    ],
    secondVirialCoefficientA2MolMlG2: 1.2e-4,
    description:
      'Chuẩn kiểm định độ chuẩn xác của hệ thống SEC-MALS (Wyatt miniDAWN / DAWN). Tín hiệu tán xạ ánh sáng LS tỷ lệ thuận với M * c, cho phép phát hiện đỉnh dimer và trimer nhạy gấp 2 và 3 lần so với tín hiệu UV/dRI thông thường.',
    curriculumNotes:
      'Hóa học 12: Hiện tượng oligomer hóa protein qua liên kết disulfide và tương tác kỵ nước; Vật lý 12: Tán xạ ánh sáng đàn hồi Rayleigh.',
    uspPharmacopeiaRef: 'USP <129> Analytical Procedures for Recombinant Therapeutic Monoclonal Antibodies',
  },
  {
    id: 'mab_igg1_aggregate_profiling',
    name: 'Therapeutic Monoclonal Antibody IgG1 Aggregate Profiling',
    vietnameseName: 'Kháng Thể Đơn Dòng Điều Trị IgG1 - Phân Tích Hạt Kết Tụ Hòa Tan (HMW)',
    applicationCategory: 'MAB_AGGREGATE',
    dnDcMlPerG: 0.185,
    carrierBuffer: '20 mM Histidine, 140 mM NaCl, pH 6.0',
    speciesList: [
      {
        name: 'IgG1 Intact Monomer',
        nominalMwDa: 148500,
        apparentRgNm: 5.2,
        elutionVolumeMl: 8.3,
        peakFractionPercent: 96.2,
        polydispersityIndexPdi: 1.003,
        stoichiometry: '1x (Nguyên vẹn)',
      },
      {
        name: 'Soluble Dimer',
        nominalMwDa: 297000,
        apparentRgNm: 7.8,
        elutionVolumeMl: 7.3,
        peakFractionPercent: 3.1,
        polydispersityIndexPdi: 1.010,
        stoichiometry: '2x (Dimer hòa tan)',
      },
      {
        name: 'High Molecular Weight (HMW)',
        nominalMwDa: 594000,
        apparentRgNm: 12.5,
        elutionVolumeMl: 6.4,
        peakFractionPercent: 0.7,
        polydispersityIndexPdi: 1.085,
        stoichiometry: '>4x (HMW Aggregates)',
      },
    ],
    secondVirialCoefficientA2MolMlG2: 8.5e-5,
    description:
      'Tiêu chuẩn vàng kiểm nghiệm độ an toàn thuốc sinh học tiêm truyền. Các hạt kết tụ HMW mang nguy cơ gây sốc phản vệ và sinh miễn dịch kháng thuốc (immunogenicity), được SEC-MALS đo tuyệt đối không phụ thuộc thể tích rửa giải.',
    curriculumNotes:
      'Hóa học 12: Cấu trúc kháng thể hình chữ Y gồm 2 chuỗi nặng và 2 chuỗi nhẹ; Hóa sinh: Nguy cơ tạo kết tụ miễn dịch.',
    uspPharmacopeiaRef: 'USP <129> / FDA Guidance for Industry: Quality Considerations for Therapeutic mAbs',
  },
  {
    id: 'aav_gene_therapy_capsid',
    name: 'Adeno-Associated Virus (AAV) Empty vs Full Capsid Molar Mass',
    vietnameseName: 'Vector Trị Liệu Gen AAV - Khối Lượng Capsid Rỗng vs Capsid Đầy Bộ Gen',
    applicationCategory: 'GENE_THERAPY_VECTOR',
    dnDcMlPerG: 0.185, // Protein conjugate analysis
    carrierBuffer: 'PBS, 0.001% Pluronic F-68, pH 7.4',
    speciesList: [
      {
        name: 'AAV Empty Capsid (Không chứa gen)',
        nominalMwDa: 3750000, // 3.75 MDa
        apparentRgNm: 12.8,
        elutionVolumeMl: 6.8,
        peakFractionPercent: 32.0,
        polydispersityIndexPdi: 1.008,
        stoichiometry: 'VP1:VP2:VP3 (1:1:10)',
      },
      {
        name: 'AAV Full Capsid (Chứa ssDNA gen)',
        nominalMwDa: 5250000, // 3.75 MDa capsid + 1.5 MDa DNA
        apparentRgNm: 13.1,
        elutionVolumeMl: 6.7,
        peakFractionPercent: 68.0,
        polydispersityIndexPdi: 1.015,
        stoichiometry: 'Capsid + 4.7 kb ssDNA',
      },
    ],
    secondVirialCoefficientA2MolMlG2: 4.2e-6,
    description:
      'Công nghệ phân tích liên hợp (Protein-Conjugate MALS): Phân biệt chính xác tỷ lệ capsid chứa gen (Full) và rỗng (Empty) nhờ sự chênh lệch khối lượng 1.5 MDa của sợi đơn ssDNA bên trong hạt nano virus 25 nm.',
    curriculumNotes:
      'Sinh học 12: Công nghệ gen và vector chuyển gen virus AAV trong y học cá thể hóa; Hóa học 12: Phân tử lượng siêu vĩ mô (MDa).',
    uspPharmacopeiaRef: 'USP Draft General Chapter <1046.1> Gene Therapy Products',
  },
  {
    id: 'dextran_polysaccharide_random_coil',
    name: 'Dextran 70 kDa Polysaccharide Conformation & Broad PDI',
    vietnameseName: 'Polymer Dextran 70 kDa - Cấu Trúc Cuộn Ngẫu Nhiên (Random Coil)',
    applicationCategory: 'POLYSACCHARIDE_CONFORMATION',
    dnDcMlPerG: 0.142, // Polysaccharide dn/dc
    carrierBuffer: '50 mM NaNO3, 0.02% NaN3, pH 7.0',
    speciesList: [
      {
        name: 'Dextran Polysaccharide Distribution',
        nominalMwDa: 71000,
        apparentRgNm: 6.5,
        elutionVolumeMl: 8.5,
        peakFractionPercent: 100.0,
        polydispersityIndexPdi: 1.420, // Broad polymer distribution
        stoichiometry: '(C6H10O5)n D-glucose alpha-(1->6)',
      },
    ],
    secondVirialCoefficientA2MolMlG2: 2.8e-4,
    description:
      'Polymer đường đa tự nhiên với độ đa phân tán rộng PDI = 1.42. Đường đồ thị log-log giữa bán kính hồi chuyển Rg và khối lượng phân tử Mw (Conformation Plot) cho hệ số góc nu ~ 0.53, chứng minh cấu trúc cuộn ngẫu nhiên (random coil).',
    curriculumNotes:
      'Hóa học 12: Polysaccharide, liên kết glycosidic, phân bố khối lượng mol polymer phân tán rộng (PDI > 1).',
    uspPharmacopeiaRef: 'Ph. Eur. Monograph 0270 Dextrans for Injection / ASTM D4001',
  },
  {
    id: 'nist_mab_8671_reference',
    name: 'NIST Monoclonal Antibody Reference Material RM 8671',
    vietnameseName: 'Chuẩn Đối Chiếu Quốc Tế NISTmAb RM 8671 - Khối Lượng Mol Chuẩn 148.2 kDa',
    applicationCategory: 'NIST_REFERENCE',
    dnDcMlPerG: 0.185,
    carrierBuffer: '12.5 mM L-Histidine, 12.5 mM L-Histidine HCl, pH 6.0',
    speciesList: [
      {
        name: 'NISTmAb Certified Monomer',
        nominalMwDa: 148200,
        apparentRgNm: 5.15,
        elutionVolumeMl: 8.35,
        peakFractionPercent: 98.8,
        polydispersityIndexPdi: 1.001,
        stoichiometry: 'Chuẩn NIST Quốc Tế',
      },
      {
        name: 'Trace Dimer',
        nominalMwDa: 296400,
        apparentRgNm: 7.75,
        elutionVolumeMl: 7.4,
        peakFractionPercent: 1.2,
        polydispersityIndexPdi: 1.004,
        stoichiometry: 'Dimer kiểm định',
      },
    ],
    secondVirialCoefficientA2MolMlG2: 9.1e-5,
    description:
      'Vật liệu tham chiếu chuẩn quốc tế do Viện Tiêu chuẩn và Kỹ thuật Quốc gia Hoa Kỳ (NIST) ban hành. Khối lượng phân tử được chứng nhận 148.2 +/- 0.5 kDa xác lập mốc tham chiếu cho các máy đo tán xạ ánh sáng trên toàn cầu.',
    curriculumNotes:
      'Hóa học 12: Chuẩn đối chiếu quốc tế trong kiểm nghiệm dược phẩm; Vật lý 12: Sai số phép đo và chuẩn hóa thiết bị.',
    uspPharmacopeiaRef: 'NIST Certificate of Analysis RM 8671 / USP <129>',
  },
];

/**
 * Simulate SEC-MALS Chromatogram and Slice Data
 */
export function simulateSecMalsExperiment(
  standard: SecMalsStandard,
  totalPoints: number = 120
): SecMalsSimulationResult {
  const KStar = calculateOpticalConstantKStar(standard.dnDcMlPerG);
  const minVol = 5.5; // mL
  const maxVol = 11.5; // mL
  const step = (maxVol - minVol) / (totalPoints - 1);

  const slices: SecMalsSlicePoint[] = [];
  let sumWeightMw = 0.0;
  let sumConcentration = 0.0;
  let sumNumberFraction = 0.0;

  for (let i = 0; i < totalPoints; i++) {
    const vol = minVol + i * step;

    // Sum Gaussian chromatographic peaks for each species
    let totalUV = 0.0;
    let weightedMw = 0.0;
    let weightedRg = 0.0;
    let totalConc = 0.0;

    for (const sp of standard.speciesList) {
      const peakCenter = sp.elutionVolumeMl;
      const peakWidth = 0.28; // mL sigma
      const height = sp.peakFractionPercent / 100.0;
      const gauss = height * Math.exp(-Math.pow(vol - peakCenter, 2) / (2.0 * Math.pow(peakWidth, 2)));

      totalUV += gauss;
      totalConc += gauss;
      weightedMw += gauss * sp.nominalMwDa;
      weightedRg += gauss * sp.apparentRgNm;
    }

    const uv = Math.round(totalUV * 1000) / 1000;
    const dRI = Math.round(totalConc * 0.95 * 1000) / 1000;
    const sliceMw = totalConc > 0.01 ? Math.round(weightedMw / totalConc) : 0;
    const sliceRg = totalConc > 0.01 ? Math.round((weightedRg / totalConc) * 10) / 10 : 0;

    // LS signal is proportional to c * Mw
    const ls90 = Math.round((totalConc * (sliceMw / 100000.0) * 1.8) * 1000) / 1000;

    if (totalConc > 0.05) {
      sumWeightMw += totalConc * sliceMw;
      sumConcentration += totalConc;
      sumNumberFraction += totalConc / Math.max(1, sliceMw);
    }

    slices.push({
      elutionVolumeMl: Math.round(vol * 100) / 100,
      uvAbsorbance280: uv,
      refractiveIndexDiffRI: dRI,
      lightScattering90Deg: ls90,
      calculatedMwDa: sliceMw,
      calculatedRgNm: sliceRg,
    });
  }

  const mw = sumConcentration > 0 ? Math.round(sumWeightMw / sumConcentration) : standard.speciesList[0].nominalMwDa;
  const mn = sumNumberFraction > 0 ? Math.round(sumConcentration / sumNumberFraction) : mw;
  const pdi = Math.round((mw / Math.max(1, mn)) * 1000) / 1000;

  // Generate 7 Zimm plot angle points (from 25° to 145°)
  const angles = [28, 45, 63, 90, 108, 126, 142];
  const zimmPlotPoints: ZimmPlotPoint[] = angles.map((ang) => {
    const rad = (ang * Math.PI) / 180.0;
    const sin2Half = Math.pow(Math.sin(rad / 2.0), 2);
    // (K* c) / R(theta) = 1/Mw * (1 + 16/3 * pi^2 * n^2 / lambda^2 * Rg^2 * sin^2(theta/2))
    const firstSp = standard.speciesList[0];
    const rgCm = firstSp.apparentRgNm * 1e-7;
    const lambdaCm = LASER_WAVELENGTH_NM * 1e-7;
    const slopeFactor = (16.0 / 3.0) * Math.pow(Math.PI, 2) * Math.pow(WATER_REFRACTIVE_INDEX, 2) * Math.pow(rgCm / lambdaCm, 2);
    const kcOverR = (1.0 / firstSp.nominalMwDa) * (1.0 + slopeFactor * sin2Half);

    return {
      angleDegrees: ang,
      sin2HalfAngle: Math.round(sin2Half * 1000) / 1000,
      kcOverRTheta: Math.round(kcOverR * 1e11) / 1e11,
    };
  });

  return {
    standard,
    slices,
    zimmPlotPoints,
    opticalConstantKStar: KStar,
    measuredWeightAverageMwDa: mw,
    measuredNumberAverageMnDa: mn,
    overallPdi: pdi,
    measuredRgNm: standard.speciesList[0].apparentRgNm,
    uspComplianceNotes: standard.uspPharmacopeiaRef,
    curriculumIntegration: standard.curriculumNotes,
  };
}

/**
 * Match a card to an appropriate SEC-MALS standard
 */
export function getMatchingSecMalsCard(card: any): SecMalsStandard | null {
  if (!card) return null;
  const name = (card.name || '').toLowerCase();
  const desc = (card.description || '').toLowerCase();

  // 1. BSA Oligomers
  if (
    name.includes('bsa') ||
    desc.includes('bovine serum albumin') ||
    desc.includes('monomer dimer trimer') ||
    desc.includes('chuẩn oligomer')
  ) {
    return SEC_MALS_CATALOG.find((s) => s.id === 'bsa_oligomeric_ladder') || null;
  }

  // 2. Monoclonal antibody aggregates
  if (
    name.includes('kháng thể') ||
    name.includes('igg') ||
    desc.includes('mab') ||
    desc.includes('hạt kết tụ hòa tan') ||
    desc.includes('hmw') ||
    desc.includes('usp 129')
  ) {
    return SEC_MALS_CATALOG.find((s) => s.id === 'mab_igg1_aggregate_profiling') || null;
  }

  // 3. AAV Gene therapy vector
  if (
    name.includes('aav') ||
    desc.includes('adeno-associated') ||
    desc.includes('capsid') ||
    desc.includes('trị liệu gen')
  ) {
    return SEC_MALS_CATALOG.find((s) => s.id === 'aav_gene_therapy_capsid') || null;
  }

  // 4. Dextran polymer
  if (
    name.includes('dextran') ||
    desc.includes('random coil') ||
    desc.includes('polysaccharide') ||
    desc.includes('cuộn ngẫu nhiên')
  ) {
    return SEC_MALS_CATALOG.find((s) => s.id === 'dextran_polysaccharide_random_coil') || null;
  }

  // 5. NISTmAb standard
  if (
    name.includes('nist') ||
    desc.includes('nistmab') ||
    desc.includes('rm 8671') ||
    desc.includes('chuẩn đối chiếu quốc tế')
  ) {
    return SEC_MALS_CATALOG.find((s) => s.id === 'nist_mab_8671_reference') || null;
  }

  return null;
}

/**
 * Validation helper for SEC-MALS physics
 */
export function validateSecMalsStandardPhysics(standard: SecMalsStandard): boolean {
  if (standard.dnDcMlPerG <= 0) return false;
  if (standard.speciesList.length === 0) return false;
  for (const sp of standard.speciesList) {
    if (sp.nominalMwDa <= 0) return false;
    if (sp.apparentRgNm <= 0) return false;
  }
  return true;
}
