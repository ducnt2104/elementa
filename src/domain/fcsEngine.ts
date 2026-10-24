/**
 * Fluorescence Correlation Spectroscopy (FCS) & Single-Molecule Confocal Engine
 * 
 * Physical Principles & Scientific Foundations:
 * 1. Douglas Magde, Elliot Elson & Watt W. Webb (1972) / Rudolf Rigler (1990s):
 *    Spontaneous fluorescence intensity fluctuations delta F(t) = F(t) - <F> in an ultra-small
 *    diffraction-limited confocal observation volume (V_eff ~ 0.25 - 0.50 femtoliters!).
 * 2. 3D Gaussian Confocal Volume Model:
 *    Focal waist w_0 ~ 220 nm, axial elongation z_0 ~ 1100 nm (structure parameter S = z_0 / w_0 ~ 5.0).
 *    Effective focal volume: V_eff = pi^(3/2) * w_0^2 * z_0.
 * 3. Temporal Auto-Correlation Function G(tau):
 *    G(tau) = <delta F(t) * delta F(t + tau)> / <F>^2
 *    G(tau) = (1 / N) * [1 / (1 + tau / tau_D)] * [1 / sqrt(1 + (w_0/z_0)^2 * (tau / tau_D))] * [1 + (T / (1 - T)) * exp(-tau / tau_T)]
 *    - G(0) = 1 / N: Mean number of fluorophores in confocal volume.
 *      Absolute nanomolar/picomolar concentration: C = N / (V_eff * N_A).
 *    - tau_D: Characteristic diffusion residence time: tau_D = w_0^2 / (4 * D).
 *    - Triplet blinking fraction T with microsecond lifetime tau_T ~ 2 - 5 us.
 * 4. Single-Molecule Brightness (Molecular Brightness eta):
 *    eta = <F> / N (counts per second per molecule, kHz/molecule).
 *    Doubles upon dimerization / oligomerization, providing unambiguous stoichiometry.
 * 5. Stokes-Einstein Diffusion Coefficient & Radius:
 *    D = w_0^2 / (4 * tau_D) = (k_B * T) / (6 * pi * eta_visc * R_h).
 * 6. 5 Benchmark Systems:
 *    - Rhodamine 6G (R6G) Confocal Primary Calibrant (D = 4.26e-10 m^2/s, R_h = 0.50 nm, tau_D = 28.2 us)
 *    - Enhanced Green Fluorescent Protein (eGFP) Standard (D = 8.70e-11 m^2/s, R_h = 2.45 nm, tau_D = 138.0 us)
 *    - Alexa488 ssDNA 20-mer vs dsDNA Duplex Hybridization (R_h = 1.62 nm -> 2.58 nm)
 *    - Cy5-EGF Receptor Ligand Dimerization (eta doubles from 24 kHz to 48 kHz/molecule)
 *    - Fluorescent CdSe/ZnS Core-Shell Quantum Dot QD-655 (R_h = 12.5 nm, massive brightness >160 kHz)
 * 7. Vietnam GDPT 2018 Curriculum Integration:
 *    - Vật lý 12: Lượng tử ánh sáng, photon, hiện tượng huỳnh quang, định luật phát quang Stokes.
 *    - Hóa học 12: Thuốc thử huỳnh quang và đánh dấu phân tử, cấu trúc không gian protein/DNA.
 *    - Sinh học 10 & 12: Kính hiển vi đồng tiêu (confocal), tương tác phối tử - thụ thể màng tế bào.
 */

export const BOLTZMANN_CONSTANT = 1.380649e-23; // J/K
export const AVOGADRO_CONSTANT = 6.02214076e23; // mol^-1
export const WATER_VISCOSITY_20C_PA_S = 0.001002; // Pa * s

export interface FcsAnalyteSpecies {
  name: string;
  nominalHydrodynamicRadiusNm: number; // R_h
  apparentDiffusionCoeffM2PerS: number; // D
  characteristicDiffusionTimeMicrosec: number; // tau_D in us
  fractionPercent: number; // % contribution
  molecularBrightnessKhz: number; // kHz per molecule (cpsm)
  biologicalRole: string;
}

export interface FcsStandard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: 'PRIMARY_CALIBRANT' | 'FLUORESCENT_PROTEIN' | 'DNA_HYBRIDIZATION' | 'RECEPTOR_DIMER' | 'QUANTUM_DOT';
  confocalWaistNm: number; // w_0 ~ 220 nm
  confocalAxialRadiusNm: number; // z_0 ~ 1100 nm
  laserExcitationWavelengthNm: number; // 488, 532, or 633 nm
  laserPowerMicroWatts: number; // 10 - 50 uW
  tripletFraction: number; // T ~ 0.12
  tripletLifetimeMicrosec: number; // tau_T ~ 3.5 us
  speciesList: FcsAnalyteSpecies[];
  description: string;
  curriculumNotes: string;
  isoStandardRef: string;
}

export interface FcsCorrelationCurvePoint {
  lagTimeMicrosec: number; // tau in us (logarithmic scale 0.1 us to 1,000,000 us)
  correlationG: number; // G(tau)
  tripletFreeCorrelationG: number; // Pure diffusion component
}

export interface FcsSimulationResult {
  standard: FcsStandard;
  confocalVolumeFemtoliters: number; // V_eff in fL
  meanParticleNumberN: number; // N
  absoluteConcentrationNanomolar: number; // C in nM
  totalFluorescenceIntensityKhz: number; // <F> in kHz
  apparentMolecularBrightnessKhz: number; // <F> / N in kHz
  weightedDiffusionCoeffM2PerS: number; // D
  weightedHydrodynamicRadiusNm: number; // R_h
  correlationCurvePoints: FcsCorrelationCurvePoint[];
  academicIntegrityNotes: string;
}

/**
 * Calculate Confocal Volume V_eff in femtoliters (1 fL = 1e-15 L = 1e-18 m^3):
 * V_eff = pi^(3/2) * w_0^2 * z_0
 */
export function calculateFcsConfocalVolumeFemtoliters(
  waistNm: number,
  axialNm: number
): number {
  const wMeters = waistNm * 1e-9;
  const zMeters = axialNm * 1e-9;
  const vM3 = Math.pow(Math.PI, 1.5) * Math.pow(wMeters, 2) * zMeters;
  return vM3 * 1e18; // 1 m^3 = 1e18 fL
}

/**
 * Calculate Stokes-Einstein Diffusion Coefficient D in m^2/s:
 * D = (k_B * T) / (6 * pi * eta * R_h)
 */
export function calculateFcsDiffusionCoeffM2PerS(
  radiusNm: number,
  tempCelsius: number = 20.0,
  viscosityPaS: number = WATER_VISCOSITY_20C_PA_S
): number {
  const TK = tempCelsius + 273.15;
  const radiusMeters = radiusNm * 1e-9;
  return (BOLTZMANN_CONSTANT * TK) / (6.0 * Math.PI * viscosityPaS * radiusMeters);
}

/**
 * Calculate Characteristic Diffusion Time tau_D in microseconds:
 * tau_D = w_0^2 / (4 * D)
 */
export function calculateFcsDiffusionTimeMicrosec(
  waistNm: number,
  diffusionM2PerS: number
): number {
  const wMeters = waistNm * 1e-9;
  const tauSeconds = Math.pow(wMeters, 2) / (4.0 * diffusionM2PerS);
  return tauSeconds * 1e6; // in us
}

/**
 * Benchmark Standard Catalog: 5 Core FCS Systems
 */
export const FCS_STANDARD_CATALOG: FcsStandard[] = [
  {
    id: 'rhodamine_6g_primary_calibrant',
    name: 'Rhodamine 6G (R6G) Confocal Focal Volume Primary Calibrant',
    vietnameseName: 'Thuốc Nhuộm Huỳnh Quang Rhodamine 6G (R6G) - Hiệu Chuẩn Thể Tích Đồng Tiêu',
    applicationCategory: 'PRIMARY_CALIBRANT',
    confocalWaistNm: 220.0,
    confocalAxialRadiusNm: 1100.0,
    laserExcitationWavelengthNm: 532,
    laserPowerMicroWatts: 15.0,
    tripletFraction: 0.14,
    tripletLifetimeMicrosec: 2.8,
    speciesList: [
      {
        name: 'Rhodamine 6G Free Dye',
        nominalHydrodynamicRadiusNm: 0.50,
        apparentDiffusionCoeffM2PerS: 4.26e-10,
        characteristicDiffusionTimeMicrosec: 28.4,
        fractionPercent: 100.0,
        molecularBrightnessKhz: 32.5,
        biologicalRole: 'Chất chuẩn huỳnh quang sơ cấp xác định bán kính eo chùm tia w0',
      },
    ],
    description:
      'Chất chuẩn quốc tế vàng để hiệu chuẩn kích thước eo chùm laser confocal (w0 ~ 220 nm) và thể tích hội tụ (V_eff ~ 0.29 fL). Do kích thước phân tử cực nhỏ (0.50 nm), R6G khuếch tán cực nhanh qua tiêu điểm trong chưa đầy 30 microgiây.',
    curriculumNotes:
      'Vật lý 12: Thuyết lượng tử ánh sáng, quang phổ phát xạ huỳnh quang; Hóa học 10: Phân tử hợp chất hữu cơ ion xanthene.',
    isoStandardRef: 'ISO 22412 / IUPAC Recommendations on Fluorescence Spectroscopy Standards',
  },
  {
    id: 'egfp_fluorescent_protein_standard',
    name: 'Enhanced Green Fluorescent Protein (eGFP) 27 kDa Standard',
    vietnameseName: 'Protein Huỳnh Quang Lục eGFP (27 kDa) - Chuẩn Đo Kích Thước Sinh Học',
    applicationCategory: 'FLUORESCENT_PROTEIN',
    confocalWaistNm: 220.0,
    confocalAxialRadiusNm: 1100.0,
    laserExcitationWavelengthNm: 488,
    laserPowerMicroWatts: 25.0,
    tripletFraction: 0.10,
    tripletLifetimeMicrosec: 4.2,
    speciesList: [
      {
        name: 'Monomeric eGFP Barrel',
        nominalHydrodynamicRadiusNm: 2.45,
        apparentDiffusionCoeffM2PerS: 8.70e-11,
        characteristicDiffusionTimeMicrosec: 139.1,
        fractionPercent: 95.0,
        molecularBrightnessKhz: 18.2,
        biologicalRole: 'Protein huỳnh quang thùng beta 11 sợi ổn định',
      },
      {
        name: 'eGFP Dimer Artifact',
        nominalHydrodynamicRadiusNm: 3.55,
        apparentDiffusionCoeffM2PerS: 6.00e-11,
        characteristicDiffusionTimeMicrosec: 201.7,
        fractionPercent: 5.0,
        molecularBrightnessKhz: 36.4,
        biologicalRole: 'Dạng dimer kết tụ nhân tạo với độ sáng gấp đôi',
      },
    ],
    description:
      'Nobel Hóa học 2008 (Osamu Shimomura, Martin Chalfie, Roger Y. Tsien). Cấu trúc thùng beta 11 sợi bảo vệ nhóm mang màu tripeptide Ser65-Tyr66-Gly67. FCS đo chính xác thời gian khuếch tán 139 microgiây tương ứng bán kính 2.45 nm trong dung dịch đệm sinh lý.',
    curriculumNotes:
      'Sinh học 10: Cấu trúc protein bậc ba và bậc bốn; Hóa học 12: Peptide và biến tính protein.',
    isoStandardRef: 'Nobel Committee for Chemistry Citation 2008: Discovery of Green Fluorescent Protein',
  },
  {
    id: 'dna_hybridization_alexa488',
    name: 'Single-Strand to Duplex DNA Hybridization (AlexaFluor-488)',
    vietnameseName: 'Lai Hóa DNA Chuỗi Đơn Thành Chuỗi Kép - Khảo Sát Bằng Đầu Dò Alexa-488',
    applicationCategory: 'DNA_HYBRIDIZATION',
    confocalWaistNm: 220.0,
    confocalAxialRadiusNm: 1100.0,
    laserExcitationWavelengthNm: 488,
    laserPowerMicroWatts: 20.0,
    tripletFraction: 0.08,
    tripletLifetimeMicrosec: 3.0,
    speciesList: [
      {
        name: 'Single-Stranded 20-mer ssDNA',
        nominalHydrodynamicRadiusNm: 1.62,
        apparentDiffusionCoeffM2PerS: 1.32e-10,
        characteristicDiffusionTimeMicrosec: 91.7,
        fractionPercent: 30.0,
        molecularBrightnessKhz: 22.0,
        biologicalRole: 'Chuỗi đơn linh động uốn cong tự do',
      },
      {
        name: 'Duplex 20-bp dsDNA Hybrid',
        nominalHydrodynamicRadiusNm: 2.58,
        apparentDiffusionCoeffM2PerS: 8.28e-11,
        characteristicDiffusionTimeMicrosec: 146.1,
        fractionPercent: 70.0,
        molecularBrightnessKhz: 21.8,
        biologicalRole: 'Chuỗi kép xoắn B-DNA dạng que cứng nhắc',
      },
    ],
    description:
      'Khi chuỗi đơn lai hóa với chuỗi bổ sung tạo xoắn kép dsDNA, tính mềm dẻo mất đi và thể tích hydrodynamic tăng lên, làm chậm thời gian lưu trong tiêu điểm từ 91 us lên 146 us. Tỷ lệ phần trăm lai hóa được xác định trực tiếp từ việc phân tách hai thành phần G(tau).',
    curriculumNotes:
      'Sinh học 10 & 12: Cấu trúc xoắn kép Watson-Crick, nguyên tắc bổ sung A-T, G-C; Hóa học 12: Axit nucleic.',
    isoStandardRef: 'IUPAC Recommendations on Single-Molecule Biophysical Techniques',
  },
  {
    id: 'cy5_egf_receptor_dimerization',
    name: 'Epidermal Growth Factor (EGF) Membrane Receptor Dimerization',
    vietnameseName: 'Thụ Thể Yếu Tố Tăng Trưởng Biểu Bì EGFR - Quá Trình Dimer Hóa Kích Hoạt',
    applicationCategory: 'RECEPTOR_DIMER',
    confocalWaistNm: 220.0,
    confocalAxialRadiusNm: 1100.0,
    laserExcitationWavelengthNm: 633,
    laserPowerMicroWatts: 18.0,
    tripletFraction: 0.12,
    tripletLifetimeMicrosec: 3.5,
    speciesList: [
      {
        name: 'Cy5-EGF Monomer Complex',
        nominalHydrodynamicRadiusNm: 3.80,
        apparentDiffusionCoeffM2PerS: 5.62e-11,
        characteristicDiffusionTimeMicrosec: 215.3,
        fractionPercent: 40.0,
        molecularBrightnessKhz: 24.0,
        biologicalRole: 'Phối tử gắn đơn thụ thể chưa kích hoạt',
      },
      {
        name: 'Active EGFR Dimer Complex',
        nominalHydrodynamicRadiusNm: 5.60,
        apparentDiffusionCoeffM2PerS: 3.81e-11,
        characteristicDiffusionTimeMicrosec: 317.6,
        fractionPercent: 60.0,
        molecularBrightnessKhz: 48.0,
        biologicalRole: 'Phức hệ dimer thụ thể kép kích hoạt tyrosine kinase truyền tin ung thư',
      },
    ],
    description:
      'Cơ chế phân tử kích hoạt tế bào ung thư. Khi EGFR dimer hóa, hai phân tử Cy5-EGF cùng có mặt trong một hạt phức hợp, khiến độ sáng đơn phân tử (molecular brightness eta) tăng gấp đôi từ 24 lên 48 kHz/phân tử, phân biệt dứt khoát với tương tác không đặc hiệu.',
    curriculumNotes:
      'Sinh học 11 & 12: Truyền tin tế bào, cơ chế phosphoryl hóa tyrosine kinase thụ thể màng; Y sinh học: Kháng thể đích Cetuximab.',
    isoStandardRef: 'MISEV Guidelines for Single-Molecule Receptor Tracking',
  },
  {
    id: 'quantum_dot_qd655_nanocrystal',
    name: 'CdSe/ZnS Core-Shell Quantum Dot QD-655 Nanocrystal',
    vietnameseName: 'Chấm Lượng Tử Bán Dẫn CdSe/ZnS QD-655 - Đo Kích Thước & Độ Sáng Cực Đại',
    applicationCategory: 'QUANTUM_DOT',
    confocalWaistNm: 220.0,
    confocalAxialRadiusNm: 1100.0,
    laserExcitationWavelengthNm: 488,
    laserPowerMicroWatts: 10.0,
    tripletFraction: 0.05,
    tripletLifetimeMicrosec: 1.5,
    speciesList: [
      {
        name: 'Colloidal QD-655 Monocrystal',
        nominalHydrodynamicRadiusNm: 12.50,
        apparentDiffusionCoeffM2PerS: 1.71e-11,
        characteristicDiffusionTimeMicrosec: 707.6,
        fractionPercent: 92.0,
        molecularBrightnessKhz: 175.0,
        biologicalRole: 'Hạt nano bán kích cỡ lượng tử phát quang bền vững',
      },
      {
        name: 'Quantum Dot Dimer Aggregate',
        nominalHydrodynamicRadiusNm: 22.00,
        apparentDiffusionCoeffM2PerS: 9.70e-12,
        characteristicDiffusionTimeMicrosec: 1247.4,
        fractionPercent: 8.0,
        molecularBrightnessKhz: 350.0,
        biologicalRole: 'Cụm kết tụ nano phát xạ kép',
      },
    ],
    description:
      'Nobel Hóa học 2023 (Moungi Bawendi, Louis Brus, Alexei Ekimov). Hạt tinh thể nano bán dẫn với hiệu ứng giam hãm lượng tử (quantum confinement). Độ sáng đơn phân tử cực khủng (>170 kHz/phân tử, gấp >5 lần thuốc nhuộm hữu cơ) cho phép theo dõi ở nồng độ picomolar.',
    curriculumNotes:
      'Vật lý 12: Hạt nano bán dẫn, vùng cấm năng lượng phụ thuộc kích thước hạt; Hóa học 12: Hệ phân tán keo nano.',
    isoStandardRef: 'Nobel Committee for Chemistry Citation 2023: Discovery and Synthesis of Quantum Dots',
  },
];

/**
 * Simulate Full FCS Correlation Curve Run G(tau)
 */
export function simulateFcsExperiment(
  standard: FcsStandard,
  totalPoints: number = 100
): FcsSimulationResult {
  const vEffFl = calculateFcsConfocalVolumeFemtoliters(
    standard.confocalWaistNm,
    standard.confocalAxialRadiusNm
  );

  // Mean particle number N in confocal volume (typically 0.8 - 4.5 molecules)
  const meanN = 1.85;
  // Calculate concentration C = N / (V_eff * N_A) in nanomolar
  const vEffLiters = vEffFl * 1e-15;
  const concMolar = meanN / (vEffLiters * AVOGADRO_CONSTANT);
  const concNm = concMolar * 1e9; // in nM

  // Confocal structure parameter S = z_0 / w_0
  const S = standard.confocalAxialRadiusNm / standard.confocalWaistNm;
  const invSsq = 1.0 / Math.pow(S, 2);

  // Logarithmic lag time grid from 0.2 us to 1,000,000 us (1 second)
  const minLogTau = Math.log10(0.2); // 0.2 us
  const maxLogTau = Math.log10(1000000); // 1 s
  const step = (maxLogTau - minLogTau) / (totalPoints - 1);
  const points: FcsCorrelationCurvePoint[] = [];

  let weightedD = 0.0;
  let weightedRh = 0.0;
  let totalBrightnessKhz = 0.0;

  for (const sp of standard.speciesList) {
    const frac = sp.fractionPercent / 100.0;
    weightedD += frac * sp.apparentDiffusionCoeffM2PerS;
    weightedRh += frac * sp.nominalHydrodynamicRadiusNm;
    totalBrightnessKhz += frac * sp.molecularBrightnessKhz;
  }

  const totalFluorescence = meanN * totalBrightnessKhz; // in kHz

  for (let i = 0; i < totalPoints; i++) {
    const logTau = minLogTau + i * step;
    const tau = Math.pow(10, logTau); // us

    // Triplet factor: [1 + (T / (1 - T)) * exp(-tau / tau_T)]
    const T = standard.tripletFraction;
    const tauT = standard.tripletLifetimeMicrosec;
    const tripletFactor = 1.0 + (T / (1.0 - T)) * Math.exp(-tau / tauT);

    // Multicomponent 3D Brownian diffusion
    let diffusionTerm = 0.0;
    for (const sp of standard.speciesList) {
      const frac = sp.fractionPercent / 100.0;
      const tauD = sp.characteristicDiffusionTimeMicrosec;
      const dX = 1.0 / (1.0 + tau / tauD);
      const dZ = 1.0 / Math.sqrt(1.0 + invSsq * (tau / tauD));
      diffusionTerm += frac * dX * dZ;
    }

    const pureDiffusionG = (1.0 / meanN) * diffusionTerm;
    const totalG = (1.0 / meanN) * tripletFactor * diffusionTerm;

    points.push({
      lagTimeMicrosec: Math.round(tau * 100) / 100,
      correlationG: Math.round(totalG * 10000) / 10000,
      tripletFreeCorrelationG: Math.round(pureDiffusionG * 10000) / 10000,
    });
  }

  return {
    standard,
    confocalVolumeFemtoliters: Math.round(vEffFl * 1000) / 1000,
    meanParticleNumberN: meanN,
    absoluteConcentrationNanomolar: Math.round(concNm * 10) / 10,
    totalFluorescenceIntensityKhz: Math.round(totalFluorescence * 10) / 10,
    apparentMolecularBrightnessKhz: Math.round(totalBrightnessKhz * 10) / 10,
    weightedDiffusionCoeffM2PerS: weightedD,
    weightedHydrodynamicRadiusNm: Math.round(weightedRh * 100) / 100,
    correlationCurvePoints: points,
    academicIntegrityNotes: `${standard.isoStandardRef}. ${standard.curriculumNotes}`,
  };
}

/**
 * Match a card to an appropriate FCS standard
 */
export function getMatchingFcsCard(card: any): FcsStandard | null {
  if (!card) return null;
  const combined = `${card.name || ''} ${card.description || ''}`.toLowerCase();

  // 1. Quantum Dot
  if (
    combined.includes('quantum dot') ||
    combined.includes('chấm lượng tử') ||
    combined.includes('qd655') ||
    combined.includes('bawendi') ||
    combined.includes('nobel 2023')
  ) {
    return FCS_STANDARD_CATALOG.find((s) => s.id === 'quantum_dot_qd655_nanocrystal') || null;
  }

  // 2. GFP / eGFP
  if (
    combined.includes('gfp') ||
    combined.includes('egfp') ||
    combined.includes('huỳnh quang lục') ||
    combined.includes('barrel') ||
    combined.includes('nobel 2008')
  ) {
    return FCS_STANDARD_CATALOG.find((s) => s.id === 'egfp_fluorescent_protein_standard') || null;
  }

  // 3. DNA Hybridization
  if (
    combined.includes('hybridization') ||
    combined.includes('lai hóa') ||
    combined.includes('alexa') ||
    combined.includes('ssdna') ||
    combined.includes('dsdna')
  ) {
    return FCS_STANDARD_CATALOG.find((s) => s.id === 'dna_hybridization_alexa488') || null;
  }

  // 4. EGFR Receptor Dimerization
  if (
    combined.includes('egfr') ||
    combined.includes('thụ thể') ||
    combined.includes('dimer hóa') ||
    combined.includes('tyrosine kinase') ||
    combined.includes('cy5')
  ) {
    return FCS_STANDARD_CATALOG.find((s) => s.id === 'cy5_egf_receptor_dimerization') || null;
  }

  // 5. Rhodamine 6G primary calibrant
  if (
    combined.includes('rhodamine') ||
    combined.includes('r6g') ||
    combined.includes('confocal') ||
    combined.includes('đồng tiêu') ||
    combined.includes('thuốc nhuộm')
  ) {
    return FCS_STANDARD_CATALOG.find((s) => s.id === 'rhodamine_6g_primary_calibrant') || null;
  }

  return null;
}

/**
 * Physical Validation Helper
 */
export function validateFcsStandardPhysics(standard: FcsStandard): boolean {
  if (standard.confocalWaistNm <= 0) return false;
  if (standard.confocalAxialRadiusNm <= standard.confocalWaistNm) return false;
  if (standard.tripletFraction < 0 || standard.tripletFraction >= 1.0) return false;
  if (standard.tripletLifetimeMicrosec <= 0) return false;
  if (standard.speciesList.length === 0) return false;
  for (const sp of standard.speciesList) {
    if (sp.nominalHydrodynamicRadiusNm <= 0) return false;
    if (sp.apparentDiffusionCoeffM2PerS <= 0) return false;
    if (sp.characteristicDiffusionTimeMicrosec <= 0) return false;
  }
  return true;
}
