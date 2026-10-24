/**
 * Taylor Dispersion Analysis (TDA) & Capillary Hydrodynamic Radii Engine
 * 
 * Physical Principles & Scientific Foundations:
 * 1. Sir Geoffrey Ingram Taylor (1953) & Roberto Aris (1956):
 *    "Dispersion of soluble matter in solvent flowing slowly through a tube" (Proc. R. Soc. Lond. A).
 *    Pulse injection of analyte into an open circular capillary (radius r ~ 25 - 50 um, length L ~ 30 - 100 cm)
 *    under laminar Poiseuille pressure-driven flow.
 * 2. Taylor-Aris Axial Dispersion:
 *    Combined action of parabolic velocity profile and radial molecular Brownian diffusion.
 *    Apparent axial dispersion coefficient:
 *      K = D + (r^2 * u^2) / (48 * D)
 *    When convective transport dominates (Péclet number Pe = r * u / D >> 1), K ~ (r^2 * u^2) / (48 * D).
 * 3. Two-Window UV Detection & Peak Variance (Taylorgram):
 *    Dual optical windows at distances L_1 and L_2 from inlet eliminate injection broadening artifacts:
 *      sigma_{t1}^2 = (r^2 * t_1) / (24 * D)
 *      sigma_{t2}^2 = (r^2 * t_2) / (24 * D)
 *    Differential extraction of molecular diffusion coefficient D:
 *      D = (r^2 * (t_2 - t_1)) / (24 * (sigma_{t2}^2 - sigma_{t1}^2))
 * 4. Stokes-Einstein Hydrodynamic Radius:
 *    R_h = (k_B * T) / (6 * pi * eta * D)
 *    Provides absolute, calibration-free hydrodynamic size across sub-nanometer to sub-micron scales
 *    with zero matrix interaction and unmatched tolerance for excipients/turbid buffers.
 * 5. 5 Benchmark Standards:
 *    - Caffeine & Paracetamol Small-Molecule Primary Calibrant (R_h = 0.48 nm, 194 Da)
 *    - Human Recombinant Insulin Monomer vs Zinc Hexamer (R_h = 1.34 nm, 5.8 kDa)
 *    - NISTmAb RM 8671 Therapeutic Monoclonal Antibody (R_h = 5.38 nm, 148.2 kDa)
 *    - Thrombin-Binding G-Quadruplex DNA Aptamer (R_h = 1.82 nm, 9.2 kDa)
 *    - Adeno-Associated Virus AAV8 Gene Therapy Vector Capsid (R_h = 13.8 nm, 3.8 MDa)
 * 6. Vietnam GDPT 2018 Curriculum Integration:
 *    - Vật lý 10: Chuyển động của chất lưu trong ống tròn, lưu lượng dòng chảy tầng và định luật Poiseuille.
 *    - Hóa học 12: Đại phân tử sinh học, cấu trúc bậc ba và bậc bốn của protein, tương tác phối tử - ion kim loại.
 */

export const BOLTZMANN_CONSTANT = 1.380649e-23; // J/K
export const WATER_VISCOSITY_20C_PA_S = 0.001002; // Pa * s

export interface TdaAnalyteSpecies {
  name: string;
  nominalHydrodynamicRadiusNm: number; // R_h in nm
  nominalMolecularWeightDa: number; // Da
  apparentDiffusionCoeffM2PerS: number; // D in m^2/s
  fractionPercent: number; // % abundance
  biologicalRole: string;
}

export interface TdaStandard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: 'SMALL_MOLECULE' | 'PEPTIDE_HORMONE' | 'ANTIBODY_BIOLOGIC' | 'NUCLEIC_APTAMER' | 'VIRAL_CAPSID';
  capillaryRadiusMicrons: number; // r ~ 25 - 50 um
  capillaryLengthWindow1Cm: number; // L_1 ~ 18 cm
  capillaryLengthWindow2Cm: number; // L_2 ~ 30 cm
  drivePressureMbar: number; // Delta P ~ 50 - 140 mbar
  temperatureCelsius: number; // T ~ 20.0 C
  speciesList: TdaAnalyteSpecies[];
  description: string;
  curriculumNotes: string;
  isoStandardRef: string;
}

export interface TdaTaylorgramPoint {
  timeSeconds: number;
  window1AbsorbanceUv: number; // UV trace at detector 1
  window2AbsorbanceUv: number; // UV trace at detector 2 (broadened)
  instantaneousLinearFlowSpeedMmPerS: number;
}

export interface TdaSimulationResult {
  standard: TdaStandard;
  linearVelocityMPerS: number; // u
  window1TransitTimeSec: number; // t_1
  window2TransitTimeSec: number; // t_2
  window1VarianceSec2: number; // sigma_{t1}^2
  window2VarianceSec2: number; // sigma_{t2}^2
  extractedDiffusionCoeffM2PerS: number; // D
  extractedHydrodynamicRadiusNm: number; // R_h
  pecletNumber: number; // Pe = r * u / D
  taylorgramPoints: TdaTaylorgramPoint[];
  academicIntegrityNotes: string;
}

/**
 * Calculate Stokes-Einstein Diffusion Coefficient D in m^2/s:
 * D = k_B * T / (6 * pi * eta * R_h)
 */
export function calculateTdaStokesEinsteinD(
  radiusNm: number,
  tempCelsius: number = 20.0,
  viscosityPaS: number = WATER_VISCOSITY_20C_PA_S
): number {
  const TK = tempCelsius + 273.15;
  const radiusMeters = radiusNm * 1e-9;
  return (BOLTZMANN_CONSTANT * TK) / (6.0 * Math.PI * viscosityPaS * radiusMeters);
}

/**
 * Calculate Hydrodynamic Radius R_h from Diffusion Coefficient D:
 * R_h = k_B * T / (6 * pi * eta * D)
 */
export function calculateTdaRadiusFromD(
  diffusionM2PerS: number,
  tempCelsius: number = 20.0,
  viscosityPaS: number = WATER_VISCOSITY_20C_PA_S
): number {
  const TK = tempCelsius + 273.15;
  const radiusMeters = (BOLTZMANN_CONSTANT * TK) / (6.0 * Math.PI * viscosityPaS * diffusionM2PerS);
  return radiusMeters * 1e9; // convert to nm
}

/**
 * Calculate Taylorgram Peak Variance sigma_t^2 in seconds^2:
 * sigma_t^2 = (r^2 * t_0) / (24 * D)
 */
export function calculateTdaPeakVarianceSec2(
  capillaryRadiusUm: number,
  transitTimeSec: number,
  diffusionCoeffM2PerS: number
): number {
  const rM = capillaryRadiusUm * 1e-6;
  return (Math.pow(rM, 2) * transitTimeSec) / (24.0 * diffusionCoeffM2PerS);
}

/**
 * Extract Diffusion Coefficient from Dual Window Taylorgram:
 * D = (r^2 * (t_2 - t_1)) / (24 * (sigma_2^2 - sigma_1^2))
 */
export function extractTdaDiffusionFromDualWindows(
  capillaryRadiusUm: number,
  t1Sec: number,
  t2Sec: number,
  sigma1SqSec2: number,
  sigma2SqSec2: number
): number {
  const rM = capillaryRadiusUm * 1e-6;
  const deltaT = t2Sec - t1Sec;
  const deltaSigmaSq = sigma2SqSec2 - sigma1SqSec2;
  if (deltaSigmaSq <= 0) return 0.0;
  return (Math.pow(rM, 2) * deltaT) / (24.0 * deltaSigmaSq);
}

/**
 * Benchmark Standard Catalog: 5 Core TDA Systems
 */
export const TDA_STANDARD_CATALOG: TdaStandard[] = [
  {
    id: 'caffeine_paracetamol_small_molecule',
    name: 'Caffeine & Paracetamol Small-Molecule Calibrant (0.48 nm)',
    vietnameseName: 'Chuẩn Phân Tử Nhỏ Caffeine & Paracetamol (0.48 nm / 194 Da)',
    applicationCategory: 'SMALL_MOLECULE',
    capillaryRadiusMicrons: 25.0,
    capillaryLengthWindow1Cm: 18.0,
    capillaryLengthWindow2Cm: 30.0,
    drivePressureMbar: 60.0,
    temperatureCelsius: 20.0,
    speciesList: [
      {
        name: 'Caffeine Monomer',
        nominalHydrodynamicRadiusNm: 0.48,
        nominalMolecularWeightDa: 194.19,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(0.48),
        fractionPercent: 80.0,
        biologicalRole: 'Phân tử chuẩn hiệu chuẩn độ tán xạ mao dẫn',
      },
      {
        name: 'Paracetamol Internal Control',
        nominalHydrodynamicRadiusNm: 0.42,
        nominalMolecularWeightDa: 151.16,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(0.42),
        fractionPercent: 20.0,
        biologicalRole: 'Chất nội chuẩn kiểm tra áp suất dòng',
      },
    ],
    description:
      'Hệ chuẩn phân tử nhỏ sơ cấp kiểm định thiết bị Malvern Viscosizer TD. Với kích thước dưới 1 nanomet, hệ số khuếch tán D lớn dẫn đến độ mở rộng đỉnh Taylor hẹp và tốc độ cân bằng xuyên tâm cực nhanh.',
    curriculumNotes:
      'Hóa học 10 & 11: Phân tử hợp chất hữu cơ dị vòng, liên kết hydrogen nội phân tử; Vật lý 10: Dòng chảy tầng trong ống mao dẫn Poiseuille.',
    isoStandardRef: 'ASTM E2834 / ISO 22412 Standards for Hydrodynamic Size Determination',
  },
  {
    id: 'human_insulin_monomer_hexamer',
    name: 'Human Recombinant Insulin Monomer vs Zinc Hexamer Equilibrium',
    vietnameseName: 'Insulin Tái Tổ Hợp Người - Cân Bằng Đơn Phân & Lục Phân Kẽm (1.34 nm)',
    applicationCategory: 'PEPTIDE_HORMONE',
    capillaryRadiusMicrons: 25.0,
    capillaryLengthWindow1Cm: 18.0,
    capillaryLengthWindow2Cm: 30.0,
    drivePressureMbar: 80.0,
    temperatureCelsius: 20.0,
    speciesList: [
      {
        name: 'Insulin Monomer',
        nominalHydrodynamicRadiusNm: 1.34,
        nominalMolecularWeightDa: 5808.0,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(1.34),
        fractionPercent: 72.0,
        biologicalRole: 'Dạng peptide đơn phân có hoạt tính hạ đường huyết',
      },
      {
        name: 'Zinc-Stabilized Hexamer',
        nominalHydrodynamicRadiusNm: 2.75,
        nominalMolecularWeightDa: 34848.0,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(2.75),
        fractionPercent: 28.0,
        biologicalRole: 'Phức hệ lục phân phối trí kẽm ổn định trong bảo quản',
      },
    ],
    description:
      'Hormone peptide quan trọng điều trị đái tháo đường. TDA định lượng chính xác sự chuyển dịch cân bằng giữa dạng đơn phân giải phóng nhanh (1.34 nm) và lục phân giải phóng chậm (2.75 nm) mà không cần pha loãng hay cố định bề mặt.',
    curriculumNotes:
      'Hóa học 12: Peptide và protein, phức chất phối trí Zn2+; Sinh học 11: Tuyến tụy nội tiết và điều hòa đường huyết.',
    isoStandardRef: 'USP Monograph on Insulin Formulations Hydrodynamic Stability',
  },
  {
    id: 'nistmab_therapeutic_monoclonal_antibody',
    name: 'NISTmAb RM 8671 Monoclonal Antibody Sizing & Excipient Stability',
    vietnameseName: 'Kháng Thể Đơn Dòng NISTmAb RM 8671 - Đo Kích Thước & Ổn Định Tá Dược',
    applicationCategory: 'ANTIBODY_BIOLOGIC',
    capillaryRadiusMicrons: 25.0,
    capillaryLengthWindow1Cm: 18.0,
    capillaryLengthWindow2Cm: 30.0,
    drivePressureMbar: 100.0,
    temperatureCelsius: 20.0,
    speciesList: [
      {
        name: 'NISTmAb Monomer (IgG1)',
        nominalHydrodynamicRadiusNm: 5.38,
        nominalMolecularWeightDa: 148200.0,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(5.38),
        fractionPercent: 96.5,
        biologicalRole: 'Kháng thể trị liệu đơn phân chuẩn đối chứng',
      },
      {
        name: 'Soluble Dimer Aggregate',
        nominalHydrodynamicRadiusNm: 7.82,
        nominalMolecularWeightDa: 296400.0,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(7.82),
        fractionPercent: 3.5,
        biologicalRole: 'Sản phẩm kết tụ dimer hòa tan',
      },
    ],
    description:
      'Chuẩn quốc tế vàng NIST RM 8671. TDA nổi trội đặc biệt vì có thể đo trực tiếp mẫu trong dung dịch đệm chứa chất hoạt động bề mặt Polysorbate 20 và đường Sucrose nồng độ cao mà hoàn toàn không bị nhiễu chiết suất như SEC-MALS hay DLS.',
    curriculumNotes:
      'Hóa học 12: Cấu trúc bậc bốn của kháng thể IgG1; Sinh học 10 & 12: Miễn dịch dịch thể và liệu pháp kháng thể trúng đích.',
    isoStandardRef: 'NIST Special Publication 260-175: NISTmAb Reference Material 8671',
  },
  {
    id: 'thrombin_binding_aptamer_dna',
    name: 'Thrombin-Binding DNA Aptamer G-Quadruplex Folding (1.82 nm)',
    vietnameseName: 'Aptamer DNA Liên Kết Thrombin - Gấp Nếp Cấu Trúc G-Quadruplex (1.82 nm)',
    applicationCategory: 'NUCLEIC_APTAMER',
    capillaryRadiusMicrons: 25.0,
    capillaryLengthWindow1Cm: 18.0,
    capillaryLengthWindow2Cm: 30.0,
    drivePressureMbar: 85.0,
    temperatureCelsius: 20.0,
    speciesList: [
      {
        name: 'Folded G-Quadruplex TBA',
        nominalHydrodynamicRadiusNm: 1.82,
        nominalMolecularWeightDa: 9240.0,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(1.82),
        fractionPercent: 88.0,
        biologicalRole: 'Cấu trúc G-quadruplex gấp nếp đặc hiệu ức chế đông máu',
      },
      {
        name: 'Unfolded Random Coil',
        nominalHydrodynamicRadiusNm: 2.65,
        nominalMolecularWeightDa: 9240.0,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(2.65),
        fractionPercent: 12.0,
        biologicalRole: 'Dạng chuỗi thẳng ngẫu nhiên chưa gấp nếp',
      },
    ],
    description:
      'Oligonucleotide 29-mer tạo cấu trúc không gian G-quadruplex đặc hiệu nhận diện thrombin. TDA phát hiện sự co gọn kích thước thủy động từ 2.65 nm (duỗi thẳng) xuống 1.82 nm (gấp nếp) khi bổ sung ion K+ phối trí trung tâm.',
    curriculumNotes:
      'Hóa học 12: Axit nucleic DNA, liên kết hydro liên base Guanine; Sinh học 10: Cấu trúc không gian của vật liệu di truyền.',
    isoStandardRef: 'IUPAC Recommendations on Nucleic Acid Secondary Structure Terminology',
  },
  {
    id: 'adeno_associated_virus_aav8_capsid',
    name: 'Adeno-Associated Virus AAV8 Gene Therapy Vector Capsid (13.8 nm)',
    vietnameseName: 'Hạt Virus Vector AAV8 Trị Liệu Gen - Xác Định Bán Kính Vỏ Capsid (13.8 nm)',
    applicationCategory: 'VIRAL_CAPSID',
    capillaryRadiusMicrons: 25.0,
    capillaryLengthWindow1Cm: 18.0,
    capillaryLengthWindow2Cm: 30.0,
    drivePressureMbar: 120.0,
    temperatureCelsius: 20.0,
    speciesList: [
      {
        name: 'Intact AAV8 Capsid',
        nominalHydrodynamicRadiusNm: 13.8,
        nominalMolecularWeightDa: 3800000.0,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(13.8),
        fractionPercent: 92.0,
        biologicalRole: 'Vỏ capsid đối xứng icosahedral 60 tiểu đơn vị',
      },
      {
        name: 'Capsid Fragments / Aggregates',
        nominalHydrodynamicRadiusNm: 28.5,
        nominalMolecularWeightDa: 7600000.0,
        apparentDiffusionCoeffM2PerS: calculateTdaStokesEinsteinD(28.5),
        fractionPercent: 8.0,
        biologicalRole: 'Phức hợp kết tụ vỏ capsid',
      },
    ],
    description:
      'Vector vận chuyển gen hàng đầu trong y học chính xác. TDA định lượng bán kính thủy động nguyên vẹn (13.8 nm, đường kính 27.6 nm) trong ống vi lưu mao dẫn tiêu thụ dưới 5 microliter mẫu, vượt trội hoàn toàn về tiết kiệm mẫu so với AUC.',
    curriculumNotes:
      'Sinh học 10 & 12: Cấu tạo virus, vỏ protein capsid hình khối 20 mặt; Công nghệ sinh học: Kỹ thuật chuyển gen trị liệu.',
    isoStandardRef: 'FDA Guidance for Industry: Human Gene Therapy Products Incorporating Viral Vectors',
  },
];

/**
 * Simulate Full TDA Experiment with Dual-Window Detection
 */
export function simulateTdaExperiment(
  standard: TdaStandard,
  totalPoints: number = 140
): TdaSimulationResult {
  // Capillary geometry
  const rM = standard.capillaryRadiusMicrons * 1e-6;
  const L1M = standard.capillaryLengthWindow1Cm * 1e-2;
  const L2M = standard.capillaryLengthWindow2Cm * 1e-2;
  const deltaPM = standard.drivePressureMbar * 100.0; // Pa (N/m^2)
  const eta = WATER_VISCOSITY_20C_PA_S;

  // Poiseuille linear velocity: u = (r^2 * Delta P) / (8 * eta * L2)
  const u = (Math.pow(rM, 2) * deltaPM) / (8.0 * eta * L2M); // m/s
  const t1 = L1M / u; // seconds
  const t2 = L2M / u; // seconds

  // Primary species weighted properties
  const primarySpecies = standard.speciesList[0];
  const D = primarySpecies.apparentDiffusionCoeffM2PerS;

  // Variances
  const sigma1Sq = calculateTdaPeakVarianceSec2(standard.capillaryRadiusMicrons, t1, D);
  const sigma2Sq = calculateTdaPeakVarianceSec2(standard.capillaryRadiusMicrons, t2, D);
  const sigma1 = Math.sqrt(sigma1Sq);
  const sigma2 = Math.sqrt(sigma2Sq);

  // Time grid from 0 to 1.4 * t2
  const maxTime = t2 * 1.35;
  const step = maxTime / (totalPoints - 1);
  const points: TdaTaylorgramPoint[] = [];

  for (let i = 0; i < totalPoints; i++) {
    const t = i * step;

    // Window 1 Gaussian response
    let uv1 = 0.0;
    // Window 2 Gaussian response (broader, lower peak height due to dispersion conservation)
    let uv2 = 0.0;

    for (const sp of standard.speciesList) {
      const spD = sp.apparentDiffusionCoeffM2PerS;
      const spSigma1 = Math.sqrt(calculateTdaPeakVarianceSec2(standard.capillaryRadiusMicrons, t1, spD));
      const spSigma2 = Math.sqrt(calculateTdaPeakVarianceSec2(standard.capillaryRadiusMicrons, t2, spD));
      const frac = sp.fractionPercent / 100.0;

      const g1 = (frac / (spSigma1 * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(t - t1, 2) / (2.0 * Math.pow(spSigma1, 2)));
      const g2 = (frac / (spSigma2 * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(t - t2, 2) / (2.0 * Math.pow(spSigma2, 2)));

      uv1 += g1;
      uv2 += g2;
    }

    // Scale UV absorbance to typical AU values (0 - 1.2 AU)
    const scaledUv1 = uv1 * (sigma1 * Math.sqrt(2 * Math.PI)) * 0.95;
    const scaledUv2 = uv2 * (sigma1 * Math.sqrt(2 * Math.PI)) * 0.95;

    points.push({
      timeSeconds: Math.round(t * 10) / 10,
      window1AbsorbanceUv: Math.round(scaledUv1 * 1000) / 1000,
      window2AbsorbanceUv: Math.round(scaledUv2 * 1000) / 1000,
      instantaneousLinearFlowSpeedMmPerS: Math.round(u * 1000 * 100) / 100,
    });
  }

  const extractedD = extractTdaDiffusionFromDualWindows(
    standard.capillaryRadiusMicrons,
    t1,
    t2,
    sigma1Sq,
    sigma2Sq
  );

  const extractedRh = calculateTdaRadiusFromD(extractedD, standard.temperatureCelsius);
  const peclet = (rM * u) / D;

  return {
    standard,
    linearVelocityMPerS: u,
    window1TransitTimeSec: t1,
    window2TransitTimeSec: t2,
    window1VarianceSec2: sigma1Sq,
    window2VarianceSec2: sigma2Sq,
    extractedDiffusionCoeffM2PerS: extractedD,
    extractedHydrodynamicRadiusNm: Math.round(extractedRh * 100) / 100,
    pecletNumber: Math.round(peclet),
    taylorgramPoints: points,
    academicIntegrityNotes: `${standard.isoStandardRef}. ${standard.curriculumNotes}`,
  };
}

/**
 * Match a card to an appropriate TDA standard
 */
export function getMatchingTdaCard(card: any): TdaStandard | null {
  if (!card) return null;
  const combined = `${card.name || ''} ${card.description || ''}`.toLowerCase();

  // 1. Caffeine / Small molecules
  if (
    combined.includes('caffeine') ||
    combined.includes('paracetamol') ||
    combined.includes('phân tử nhỏ') ||
    combined.includes('viscosizer')
  ) {
    return TDA_STANDARD_CATALOG.find((s) => s.id === 'caffeine_paracetamol_small_molecule') || null;
  }

  // 2. Insulin peptide
  if (
    combined.includes('insulin') ||
    combined.includes('hormone peptide') ||
    combined.includes('lục phân kẽm') ||
    combined.includes('đơn phân insulin')
  ) {
    return TDA_STANDARD_CATALOG.find((s) => s.id === 'human_insulin_monomer_hexamer') || null;
  }

  // 3. NISTmAb / Monoclonal antibody
  if (
    combined.includes('nistmab') ||
    combined.includes('kháng thể đơn dòng') ||
    combined.includes('mab') ||
    combined.includes('polysorbate')
  ) {
    return TDA_STANDARD_CATALOG.find((s) => s.id === 'nistmab_therapeutic_monoclonal_antibody') || null;
  }

  // 4. Aptamer / G-quadruplex
  if (
    combined.includes('aptamer') ||
    combined.includes('quadruplex') ||
    combined.includes('thrombin') ||
    combined.includes('oligonucleotide')
  ) {
    return TDA_STANDARD_CATALOG.find((s) => s.id === 'thrombin_binding_aptamer_dna') || null;
  }

  // 5. AAV virus vector
  if (
    combined.includes('aav') ||
    combined.includes('capsid') ||
    combined.includes('adeno-associated') ||
    combined.includes('trị liệu gen')
  ) {
    return TDA_STANDARD_CATALOG.find((s) => s.id === 'adeno_associated_virus_aav8_capsid') || null;
  }

  return null;
}

/**
 * Physical Validation Helper
 */
export function validateTdaStandardPhysics(standard: TdaStandard): boolean {
  if (standard.capillaryRadiusMicrons <= 0) return false;
  if (standard.capillaryLengthWindow1Cm <= 0) return false;
  if (standard.capillaryLengthWindow2Cm <= standard.capillaryLengthWindow1Cm) return false;
  if (standard.drivePressureMbar <= 0) return false;
  if (standard.speciesList.length === 0) return false;
  for (const sp of standard.speciesList) {
    if (sp.nominalHydrodynamicRadiusNm <= 0) return false;
    if (sp.nominalMolecularWeightDa <= 0) return false;
  }
  return true;
}
