/**
 * Asymmetrical Flow Field-Flow Fractionation (AF4) & Hydrodynamic Sizing Engine
 * 
 * Physical Principles & International Standards:
 * 1. Open-Channel Separation without Stationary Phase (J. Calvin Giddings):
 *    Separation occurs in a thin ribbon-like channel (thickness w ~ 350 um) between an upper impermeable wall
 *    and a lower accumulation wall (ultrafiltration membrane, 10 kDa MWCO).
 * 2. Orthogonal Flow Dynamics:
 *    - Parabolic laminar channel flow: v(x) = 6 * <v> * (x/w) * (1 - x/w) [Max velocity at center x = w/2]
 *    - Perpendicular cross-flow (V_c): drives analytes toward accumulation wall
 *    - Brownian diffusion (D): drives analytes back into faster parabolic flow streams
 * 3. Exponential Steady-State Elevation & Retention Time:
 *    - Mean layer elevation: l = D / U = (k_B * T) / (6 * pi * eta * R_h * U)
 *    - Dimensionless parameter: lambda = l / w
 *    - Retention time: t_r = t^0 / (6 * lambda) = (pi * eta * w^2 * L / (k_B * T)) * (V_c / V_out) * R_h
 *    - Retention time t_r is DIRECTLY PROPORTIONAL to hydrodynamic radius R_h (smaller particles elute first, larger elute later)!
 * 4. Ultra-Low Shear Advantage over SEC:
 *    Allows characterization of fragile megadalton biopolymers, lipid nanoparticles (LNPs), and exosomes
 *    without shear-induced fragmentation or column clogging.
 * 5. 5 Benchmark Standards:
 *    - NIST Traceable 20 nm / 60 nm / 100 nm Polystyrene Latex Beads
 *    - Lipid Nanoparticles (LNP) mRNA Delivery Vehicles (60 - 120 nm)
 *    - Liposomal Doxorubicin (Doxil Nanomedicine, 85 nm)
 *    - von Willebrand Factor (vWF) High Molecular Weight Multimers (1 - 10 MDa)
 *    - Tumor-Derived Extracellular Vesicles / Exosomes (30 - 150 nm)
 * 6. Vietnam GDPT 2018 Curriculum:
 *    - Vật lý 10: Chuyển động của chất lưu, dòng chảy tầng (laminar flow) và lực cản nhớt Stokes.
 *    - Hóa học 12: Hệ phân tán keo nano, hạt nano lipid và khuếch tán qua màng bán thấm.
 */

export const BOLTZMANN_CONSTANT = 1.380649e-23; // J/K
export const WATER_VISCOSITY_20C_PA_S = 0.001002; // Pa * s (kg / (m * s))
export const STANDARD_CHANNEL_THICKNESS_UM = 350.0; // w in um
export const STANDARD_CHANNEL_LENGTH_CM = 27.5; // L in cm

export interface Af4AnalyteSpecies {
  name: string;
  nominalHydrodynamicRadiusNm: number; // R_h in nm
  nominalDiameterNm: number; // 2 * R_h
  apparentDiffusionCoeffM2PerS: number; // D = k_B * T / (6 * pi * eta * R_h)
  peakFractionPercent: number; // Abundance
  biologicalRole: string;
}

export interface Af4Standard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: 'LATEX_NANOBEADS' | 'MRNA_LNP' | 'LIPOSOMAL_DRUG' | 'MEGADALTON_PROTEIN' | 'EXOSOME_VESICLES';
  channelThicknessMicrons: number; // w (~350 um)
  crossFlowRateMlPerMin: number; // V_c (e.g. 1.5 mL/min)
  detectorFlowRateMlPerMin: number; // V_out (e.g. 0.5 mL/min)
  focusingTimeMinutes: number; // Initial focusing / relaxation step (~2 min)
  membraneMaterial: string; // Regenerated Cellulose (RC) or Polyethersulfone (PES) 10 kDa
  speciesList: Af4AnalyteSpecies[];
  description: string;
  curriculumNotes: string;
  isoStandardRef: string;
}

export interface Af4FractogramPoint {
  timeMinutes: number;
  uvAbsorbance280: number; // Fractogram UV response
  multiAngleLs90Deg: number; // 90° Light Scattering
  crossFlowRateMlPerMin: number; // Live cross-flow program
  instantaneousRhNm: number; // Hydrodynamic radius R_h
}

export interface Af4SimulationResult {
  standard: Af4Standard;
  voidTimeMinutes: number; // t^0 (time for unretained solvent)
  channelThicknessMicrons: number;
  focusingTimeMinutes: number;
  fractogramPoints: Af4FractogramPoint[];
  resolvedSpeciesCount: number;
  hydrodynamicRecoveryPercent: number; // typically > 90% in AF4
  isoComplianceNotes: string;
  curriculumIntegrationNotes: string;
}

/**
 * Calculate Stokes-Einstein Diffusion Coefficient D in m^2/s:
 * D = k_B * T / (6 * pi * eta * R_h)
 */
export function calculateAf4DiffusionCoeffM2PerS(
  radiusNm: number,
  tempCelsius: number = 20.0,
  viscosityPaS: number = WATER_VISCOSITY_20C_PA_S
): number {
  const TK = tempCelsius + 273.15;
  const radiusMeters = radiusNm * 1e-9;
  return (BOLTZMANN_CONSTANT * TK) / (6.0 * Math.PI * viscosityPaS * radiusMeters);
}

/**
 * Calculate AF4 Retention Time t_r in Normal FFF Mode under Exponential Cross-Flow Decay:
 * In modern AF4 (Wyatt / Postnova), exponential cross-flow decay V_c(t) = V_c0 * exp(-t / tau)
 * is universally employed to elute polydisperse and larger nanoparticles within analytical timescales.
 * Analytical solution: t_r = t_delay + tau * ln(1 + t_r,isocratic / tau)
 */
export function calculateAf4RetentionTimeMinutes(
  hydrodynamicRadiusNm: number,
  crossFlowMlPerMin: number,
  detectorFlowMlPerMin: number,
  channelThicknessUm: number = STANDARD_CHANNEL_THICKNESS_UM,
  tempCelsius: number = 20.0
): number {
  const TK = tempCelsius + 273.15;
  const eta = WATER_VISCOSITY_20C_PA_S;
  const wM = channelThicknessUm * 1e-6;
  const LM = STANDARD_CHANNEL_LENGTH_CM * 1e-2;
  const rhM = hydrodynamicRadiusNm * 1e-9;

  // Isocratic retention time: t_r,iso = (pi * eta * w^2 * L / (k_B * T)) * (V_c / V_out) * R_h (seconds)
  const numerator = Math.PI * eta * Math.pow(wM, 2) * LM * (crossFlowMlPerMin / detectorFlowMlPerMin) * rhM;
  const denominator = BOLTZMANN_CONSTANT * TK;
  const trIsoMin = (numerator / denominator) / 60.0;

  // Exponential decay decay constant tau ~ 11.5 min, focusing & void delay ~ 2.5 min
  const tau = 11.5;
  return 2.5 + tau * Math.log(1.0 + trIsoMin / tau);
}

/**
 * Standard Catalog: 5 Benchmark Asymmetrical Flow Field-Flow Fractionation Systems
 */
export const AF4_STANDARD_CATALOG: Af4Standard[] = [
  {
    id: 'nist_latex_nanobead_ladder',
    name: 'NIST Traceable Polystyrene Latex Beads Ladder (20 / 60 / 100 nm)',
    vietnameseName: 'Thang Chuẩn Hạt Nano Polystyrene NIST (20 nm / 60 nm / 100 nm)',
    applicationCategory: 'LATEX_NANOBEADS',
    channelThicknessMicrons: 350,
    crossFlowRateMlPerMin: 1.5,
    detectorFlowRateMlPerMin: 0.5,
    focusingTimeMinutes: 2.0,
    membraneMaterial: 'Regenerated Cellulose (RC) 10 kDa MWCO',
    speciesList: [
      {
        name: 'PSL 20 nm',
        nominalHydrodynamicRadiusNm: 10.0,
        nominalDiameterNm: 20.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(10.0),
        peakFractionPercent: 33.3,
        biologicalRole: 'Chuẩn kích thước nano sơ cấp',
      },
      {
        name: 'PSL 60 nm',
        nominalHydrodynamicRadiusNm: 30.0,
        nominalDiameterNm: 60.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(30.0),
        peakFractionPercent: 33.3,
        biologicalRole: 'Chuẩn trung gian kiểm định độ phân giải',
      },
      {
        name: 'PSL 100 nm',
        nominalHydrodynamicRadiusNm: 50.0,
        nominalDiameterNm: 100.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(50.0),
        peakFractionPercent: 33.4,
        biologicalRole: 'Chuẩn giới hạn trên chế độ Normal FFF',
      },
    ],
    description:
      'Hệ chuẩn hiệu chuẩn thiết bị AF4 (Postnova AF2000 / Wyatt Eclipse). Theo nguyên lý FFF thông thường, hạt 20 nm khuếch tán cao hơn nên lọt vào luồng dòng chảy trung tâm nhanh nhất và rửa giải trước, tiếp theo là 60 nm và 100 nm.',
    curriculumNotes:
      'Vật lý 10: Chuyển động của hạt dưới tác dụng đồng thời của dòng chảy tầng parabol và chuyển động nhiệt Brown; Hóa học 12: Hệ phân tán keo nano.',
    isoStandardRef: 'ISO 13321 / ISO 22412 Methods for Nanoparticle Sizing by Field-Flow Fractionation',
  },
  {
    id: 'mrna_lipid_nanoparticles_lnp',
    name: 'mRNA Vaccine Lipid Nanoparticles (LNP) Formulation Profiling',
    vietnameseName: 'Hạt Nano Lipid LNP Mang Vaccine mRNA - Đánh Giá Phân Bố Kích Thước',
    applicationCategory: 'MRNA_LNP',
    channelThicknessMicrons: 350,
    crossFlowRateMlPerMin: 1.2,
    detectorFlowRateMlPerMin: 0.5,
    focusingTimeMinutes: 2.5,
    membraneMaterial: 'Regenerated Cellulose (RC) 10 kDa MWCO',
    speciesList: [
      {
        name: 'Monomodal Functional LNP',
        nominalHydrodynamicRadiusNm: 42.5,
        nominalDiameterNm: 85.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(42.5),
        peakFractionPercent: 91.5,
        biologicalRole: 'Hạt nano LNP hoàn chỉnh bọc mRNA',
      },
      {
        name: 'LNP Co-Aggregates / Micelles',
        nominalHydrodynamicRadiusNm: 85.0,
        nominalDiameterNm: 170.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(85.0),
        peakFractionPercent: 8.5,
        biologicalRole: 'Hạt kết tụ lipid đa lớp không tối ưu',
      },
    ],
    description:
      'Công nghệ cốt lõi kiểm soát chất lượng vaccine mRNA COVID-19. Do màng túi lipid rất dễ vỡ dưới ứng suất cắt trong cột SEC, AF4 là phương pháp tiêu chuẩn duy nhất giữ nguyên vẹn 100% cấu trúc hạt LNP trong dung dịch đệm sinh lý.',
    curriculumNotes:
      'Hóa học 12: Cấu tạo lipid màng sinh học, tương tác kỵ nước - ưa nước; Sinh học 10 & 12: Cơ chế vận chuyển RNA thông tin vào tế bào đích.',
    isoStandardRef: 'USP Draft Guidelines on Analytical Procedures for Lipid Nanoparticles',
  },
  {
    id: 'liposomal_doxorubicin_doxil',
    name: 'Liposomal Doxorubicin (Doxil) Nanomedicine Carrier',
    vietnameseName: 'Thuốc Chống Ung Thư Doxil - Hạt Liposome Pegylat Hóa 85 nm',
    applicationCategory: 'LIPOSOMAL_DRUG',
    channelThicknessMicrons: 350,
    crossFlowRateMlPerMin: 1.4,
    detectorFlowRateMlPerMin: 0.5,
    focusingTimeMinutes: 2.0,
    membraneMaterial: 'Polyethersulfone (PES) 10 kDa',
    speciesList: [
      {
        name: 'Pegylated Doxorubicin Liposome',
        nominalHydrodynamicRadiusNm: 42.0,
        nominalDiameterNm: 84.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(42.0),
        peakFractionPercent: 96.5,
        biologicalRole: 'Hạt liposome ổn định kéo dài thời gian lưu hành máu',
      },
      {
        name: 'Free Drug / Small Vesicles',
        nominalHydrodynamicRadiusNm: 8.0,
        nominalDiameterNm: 16.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(8.0),
        peakFractionPercent: 3.5,
        biologicalRole: 'Thuốc tự do thoát màng lọc',
      },
    ],
    description:
      'Hệ thuốc nano đầu tiên được FDA phê duyệt (Doxil). Lớp màng lipid đôi phủ PEG (Polyethylene glycol) tạo hiệu ứng chống bám dính protein huyết tương, được AF4 định lượng độ đồng nhất kích thước với độ tái lập < 1%.',
    curriculumNotes:
      'Hóa học 12: Polymer tổng hợp tan trong nước (PEG); Hóa dược: Hệ dẫn truyền thuốc hướng đích nano.',
    isoStandardRef: 'FDA Guidance for Industry: Liposome Drug Products',
  },
  {
    id: 'vocal_multimer_vww_protein',
    name: 'Plasma von Willebrand Factor (vWF) Megadalton Multimer Distribution',
    vietnameseName: 'Yếu Tố Đông Máu von Willebrand (vWF) - Phức Hệ Đa Phân Tử Siêu Lớn',
    applicationCategory: 'MEGADALTON_PROTEIN',
    channelThicknessMicrons: 350,
    crossFlowRateMlPerMin: 1.0,
    detectorFlowRateMlPerMin: 0.5,
    focusingTimeMinutes: 3.0,
    membraneMaterial: 'Regenerated Cellulose (RC) 10 kDa',
    speciesList: [
      {
        name: 'vWF Dimer Building Block',
        nominalHydrodynamicRadiusNm: 12.0,
        nominalDiameterNm: 24.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(12.0),
        peakFractionPercent: 18.0,
        biologicalRole: 'Khối cơ sở 500 kDa',
      },
      {
        name: 'Intermediate Multimer (4x - 8x)',
        nominalHydrodynamicRadiusNm: 28.0,
        nominalDiameterNm: 56.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(28.0),
        peakFractionPercent: 44.0,
        biologicalRole: 'Đa phân tử trung gian 2 - 4 MDa',
      },
      {
        name: 'Ultra-Large vWF Multimer (>10x)',
        nominalHydrodynamicRadiusNm: 65.0,
        nominalDiameterNm: 130.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(65.0),
        peakFractionPercent: 38.0,
        biologicalRole: 'Phức hệ siêu lớn >10 MDa kích hoạt tiểu cầu',
      },
    ],
    description:
      'Đại phân tử protein lớn nhất trong huyết tương người (500 kDa đến > 10 MDa). Các phân tử siêu lớn này hoàn toàn bị nghẽn và mắc kẹt trong gel sắc ký SEC nhưng được AF4 tách nhẹ nhàng trong dòng lưu chất mở.',
    curriculumNotes:
      'Hóa học 12: Đại phân tử sinh học có cầu nối disulfide đa chuỗi; Sinh học 11: Cơ chế đông máu và cân bằng nội môi.',
    isoStandardRef: 'International Society on Thrombosis and Haemostasis (ISTH) Standardization',
  },
  {
    id: 'exosome_extracellular_vesicles',
    name: 'Extracellular Vesicles & Tumor Exosomes Size Fractionation',
    vietnameseName: 'Túi Ngoại Bào Exosome Khối U - Phân Tách Kích Thước Bằng Dòng Chảy Chéo',
    applicationCategory: 'EXOSOME_VESICLES',
    channelThicknessMicrons: 350,
    crossFlowRateMlPerMin: 1.2,
    detectorFlowRateMlPerMin: 0.5,
    focusingTimeMinutes: 2.0,
    membraneMaterial: 'Regenerated Cellulose (RC) 10 kDa',
    speciesList: [
      {
        name: 'Small Exosomes (Exo-S)',
        nominalHydrodynamicRadiusNm: 25.0,
        nominalDiameterNm: 50.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(25.0),
        peakFractionPercent: 42.0,
        biologicalRole: 'Túi exosome nhỏ giàu tetraspanin CD63/CD81',
      },
      {
        name: 'Large Exosomes (Exo-L)',
        nominalHydrodynamicRadiusNm: 55.0,
        nominalDiameterNm: 110.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(55.0),
        peakFractionPercent: 48.0,
        biologicalRole: 'Túi màng chứa vi RNA và protein truyền tin',
      },
      {
        name: 'Microvesicles / Ectosomes',
        nominalHydrodynamicRadiusNm: 95.0,
        nominalDiameterNm: 190.0,
        apparentDiffusionCoeffM2PerS: calculateAf4DiffusionCoeffM2PerS(95.0),
        peakFractionPercent: 10.0,
        biologicalRole: 'Mảnh bọng màng tế bào bong tróc',
      },
    ],
    description:
      'Biomarker hàng đầu trong sinh thiết lỏng chẩn đoán ung thư sớm. AF4 tách rời hoàn toàn các phân lớp exosome khỏi protein tự do (Albumin, IgG) trong huyết tương mà không làm biến dạng màng tế bào.',
    curriculumNotes:
      'Sinh học 10 & 12: Cấu trúc màng tế bào sinh học, túi tiết nội bào và truyền thông tin liên tế bào; Hóa học 12: Hệ phân tán keo nano.',
    isoStandardRef: 'MISEV2023 Guidelines: Minimal Information for Studies of Extracellular Vesicles',
  },
];

/**
 * Simulate Full AF4 Fractogram Run
 */
export function simulateAf4Experiment(
  standard: Af4Standard,
  totalPoints: number = 130
): Af4SimulationResult {
  const voidTime = 1.0; // t^0 in minutes
  const maxTime = 25.0; // minutes
  const step = (maxTime - 0) / (totalPoints - 1);
  const points: Af4FractogramPoint[] = [];

  for (let i = 0; i < totalPoints; i++) {
    const t = i * step;

    // Cross-flow decay profile (constant during focus, then exponential decay)
    let currentCrossFlow = standard.crossFlowRateMlPerMin;
    if (t < standard.focusingTimeMinutes) {
      currentCrossFlow = standard.crossFlowRateMlPerMin;
    } else {
      // Exponential decay to elute larger particles
      const elapsedRun = t - standard.focusingTimeMinutes;
      currentCrossFlow = Math.max(0.08, standard.crossFlowRateMlPerMin * Math.exp(-elapsedRun / 14.0));
    }

    let totalUV = 0.0;
    let totalLS = 0.0;
    let weightedRh = 0.0;
    let totalAmp = 0.0;

    // Focusing void peak (first 2 minutes)
    if (t < standard.focusingTimeMinutes + 0.6) {
      const focusPeak = Math.exp(-Math.pow(t - 1.2, 2) / (2.0 * Math.pow(0.25, 2))) * 0.15;
      totalUV += focusPeak;
    }

    // Analyte peaks eluting in normal FFF mode (smaller first, larger later)
    for (const sp of standard.speciesList) {
      const peakCenterTime = calculateAf4RetentionTimeMinutes(
        sp.nominalHydrodynamicRadiusNm,
        standard.crossFlowRateMlPerMin,
        standard.detectorFlowRateMlPerMin,
        standard.channelThicknessMicrons
      );

      const peakWidth = Math.max(0.45, peakCenterTime * 0.065); // Gaussian width
      const height = sp.peakFractionPercent / 100.0;
      const gauss = height * Math.exp(-Math.pow(t - peakCenterTime, 2) / (2.0 * Math.pow(peakWidth, 2)));

      totalUV += gauss;
      // LS90 scales with radius cubed (Rayleigh regime)
      const lsScaling = Math.pow(sp.nominalHydrodynamicRadiusNm / 20.0, 2.2);
      totalLS += gauss * lsScaling * 0.35;

      weightedRh += gauss * sp.nominalHydrodynamicRadiusNm;
      totalAmp += gauss;
    }

    const instRh = totalAmp > 0.02 ? Math.round((weightedRh / totalAmp) * 10) / 10 : 0.0;

    points.push({
      timeMinutes: Math.round(t * 100) / 100,
      uvAbsorbance280: Math.round(totalUV * 1000) / 1000,
      multiAngleLs90Deg: Math.round(totalLS * 1000) / 1000,
      crossFlowRateMlPerMin: Math.round(currentCrossFlow * 100) / 100,
      instantaneousRhNm: instRh,
    });
  }

  return {
    standard,
    voidTimeMinutes: voidTime,
    channelThicknessMicrons: standard.channelThicknessMicrons,
    focusingTimeMinutes: standard.focusingTimeMinutes,
    fractogramPoints: points,
    resolvedSpeciesCount: standard.speciesList.length,
    hydrodynamicRecoveryPercent: 96.5,
    isoComplianceNotes: standard.isoStandardRef,
    curriculumIntegrationNotes: standard.curriculumNotes,
  };
}

/**
 * Match a card to an appropriate AF4 standard
 */
export function getMatchingAf4Card(card: any): Af4Standard | null {
  if (!card) return null;
  const combined = `${card.name || ''} ${card.description || ''}`.toLowerCase();

  // 1. mRNA LNP
  if (
    combined.includes('lnp') ||
    combined.includes('lipid nanoparticle') ||
    combined.includes('hạt nano lipid') ||
    combined.includes('vaccine mrna')
  ) {
    return AF4_STANDARD_CATALOG.find((s) => s.id === 'mrna_lipid_nanoparticles_lnp') || null;
  }

  // 2. Liposome Doxil
  if (
    combined.includes('liposome') ||
    combined.includes('doxorubicin') ||
    combined.includes('doxil') ||
    combined.includes('thuốc nano')
  ) {
    return AF4_STANDARD_CATALOG.find((s) => s.id === 'liposomal_doxorubicin_doxil') || null;
  }

  // 3. Exosomes / Extracellular vesicles
  if (
    combined.includes('exosome') ||
    combined.includes('túi ngoại bào') ||
    combined.includes('extracellular vesicle') ||
    combined.includes('sinh thiết lỏng')
  ) {
    return AF4_STANDARD_CATALOG.find((s) => s.id === 'exosome_extracellular_vesicles') || null;
  }

  // 4. vWF megadalton protein
  if (
    combined.includes('vwf') ||
    combined.includes('willebrand') ||
    combined.includes('đa phân tử siêu lớn') ||
    combined.includes('megadalton')
  ) {
    return AF4_STANDARD_CATALOG.find((s) => s.id === 'vocal_multimer_vww_protein') || null;
  }

  // 5. Polystyrene latex beads
  if (
    combined.includes('latex') ||
    combined.includes('hạt chuẩn nano') ||
    combined.includes('polystyrene') ||
    combined.includes('iso 13321')
  ) {
    return AF4_STANDARD_CATALOG.find((s) => s.id === 'nist_latex_nanobead_ladder') || null;
  }

  return null;
}

/**
 * Validation helper for AF4 physics
 */
export function validateAf4StandardPhysics(standard: Af4Standard): boolean {
  if (standard.channelThicknessMicrons <= 0) return false;
  if (standard.crossFlowRateMlPerMin <= 0) return false;
  if (standard.detectorFlowRateMlPerMin <= 0) return false;
  if (standard.speciesList.length === 0) return false;
  for (const sp of standard.speciesList) {
    if (sp.nominalHydrodynamicRadiusNm <= 0) return false;
  }
  return true;
}
