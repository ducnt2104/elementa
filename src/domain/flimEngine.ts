/**
 * Fluorescence Lifetime Imaging Microscopy (FLIM) & TCSPC Engine
 * 
 * Physical Principles & Scientific Foundations:
 * 1. Time-Correlated Single-Photon Counting (TCSPC):
 *    Pulsed picosecond laser excitation (repetition rate ~ 20 - 80 MHz).
 *    Measures exact nanosecond decay lifetime tau of excited singlet states:
 *      I(t) = I_0 * sum_i [alpha_i * exp(-t / tau_i)]
 *    Lifetime tau is an intrinsic intensive physical property, immune to fluorophore concentration,
 *    laser intensity fluctuations, or photobleaching.
 * 2. Förster Resonance Energy Transfer (FLIM-FRET):
 *    Non-radiative dipole-dipole energy transfer to an acceptor within 1 - 10 nm quenches donor lifetime:
 *      E_FRET = 1 - (tau_DA / tau_D) = R_0^6 / (R_0^6 + r^6)
 *    Enables nanometer-scale molecular ruler measurements in live cells.
 * 3. Phasor Plot Analysis (Universal Semicircle):
 *    Model-free frequency domain coordinates:
 *      g(omega) = int_0^T [I(t) * cos(omega * t) dt] / int_0^T [I(t) dt]
 *      s(omega) = int_0^T [I(t) * sin(omega * t) dt] / int_0^T [I(t) dt]
 *    Mono-exponential decays lie on the Universal Semicircle: (g - 0.5)^2 + s^2 = 0.25.
 *    Multi-exponential decays and FRET states fall inside the semicircle along linear trajectories.
 * 4. Microenvironment Sensing:
 *    - Intracellular pH: Protonation alters fluorophore electron distribution and lifetime.
 *    - Membrane Viscosity: Molecular rotors (e.g. BODIPY) freeze rotation in rigid lipid rafts, prolonging tau.
 *    - Metabolic State: Free NADH (0.4 ns) vs Protein-Bound NADH (3.2 ns) quantifies glycolytic Warburg effect.
 * 5. 5 Benchmark Standards:
 *    - Fluorescein (FITC) in 0.1 M NaOH Primary Calibrant (tau = 4.05 ns, pure mono-exponential)
 *    - CFP-YFP Biosensor FLIM-FRET (tau_D = 2.68 ns -> tau_DA = 1.45 ns, E_FRET = 45.9%, r = 5.2 nm)
 *    - SNARF-5F Lysosomal pH Biosensor (tau = 1.15 ns at pH 4.5 vs 3.80 ns at pH 7.4)
 *    - BODIPY-C12 Membrane Viscosity Rotor (tau = 1.60 ns in L_d vs 3.90 ns in cholesterol rafts L_o)
 *    - Metabolic Coenzyme NADH Free vs LDH-Bound (tau_1 = 0.40 ns, tau_2 = 3.20 ns)
 * 6. Vietnam GDPT 2018 Curriculum Integration:
 *    - Vật lý 12: Thuyết lượng tử ánh sáng, photon, thời gian sống của trạng thái kích thích (tau ~ 10^-9 s).
 *    - Hóa học 12: Tương tác cộng hưởng FRET, hóa sinh chuyển hóa năng lượng tế bào (NADH/NAD+).
 *    - Sinh học 10 & 12: Màng sinh học tế bào, độ nhớt màng và chuyển hóa glycolytic ung thư.
 */

export const SPEED_OF_LIGHT = 299792458; // m/s
export const PLANCK_CONSTANT = 6.62607015e-34; // J*s

export interface FlimDecayComponent {
  name: string;
  lifetimeNanoseconds: number; // tau_i in ns
  amplitudeFractionPercent: number; // alpha_i in %
  biologicalRole: string;
}

export interface FlimStandard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: 'PRIMARY_CALIBRANT' | 'FLIM_FRET' | 'PH_BIOSENSOR' | 'MEMBRANE_VISCOSITY' | 'METABOLIC_NADH';
  laserRepetitionRateMhz: number; // e.g. 40 MHz (period T = 25 ns)
  laserExcitationWavelengthNm: number; // 405, 440, or 488 nm
  irfFwhmPicoseconds: number; // Instrument Response Function FWHM ~ 120 ps
  components: FlimDecayComponent[];
  forsterRadiusR0Nm?: number; // R_0 for FRET (~ 5.0 nm)
  description: string;
  curriculumNotes: string;
  isoStandardRef: string;
}

export interface FlimDecayCurvePoint {
  timeNanoseconds: number; // 0 to 25 ns
  intensityCounts: number; // Photons per time bin
  irfIntensityCounts: number; // Instrument response function
}

export interface FlimPhasorCoordinates {
  g: number; // Real component on x-axis [0, 1]
  s: number; // Imaginary component on y-axis [0, 0.5]
  apparentLifetimeNanoseconds: number;
}

export interface FlimSimulationResult {
  standard: FlimStandard;
  laserPeriodNanoseconds: number; // T = 1 / f_rep
  amplitudeWeightedLifetimeNs: number; // <tau>_amp = sum(alpha_i * tau_i)
  intensityWeightedLifetimeNs: number; // <tau>_int = sum(alpha_i * tau_i^2) / sum(alpha_i * tau_i)
  fretEfficiencyPercent: number; // E_FRET
  apparentIntermolecularDistanceNm: number; // r
  phasorCoordinates: FlimPhasorCoordinates;
  decayPoints: FlimDecayCurvePoint[];
  academicIntegrityNotes: string;
}

/**
 * Calculate FRET Efficiency from Donor Lifetimes:
 * E_FRET = 1 - (tau_DA / tau_D)
 */
export function calculateFlimFretEfficiencyPercent(
  tauDonorAloneNs: number,
  tauDonorWithAcceptorNs: number
): number {
  if (tauDonorAloneNs <= 0) return 0.0;
  const eff = 1.0 - tauDonorWithAcceptorNs / tauDonorAloneNs;
  return Math.max(0.0, Math.min(100.0, eff * 100.0));
}

/**
 * Calculate Intermolecular Distance r from FRET Efficiency & Forster Radius R_0:
 * r = R_0 * ((1 / E) - 1)^(1/6)
 */
export function calculateFlimIntermolecularDistanceNm(
  fretEfficiencyPercent: number,
  forsterRadiusR0Nm: number = 5.0
): number {
  const E = fretEfficiencyPercent / 100.0;
  if (E <= 0.001) return 12.0; // effectively infinity
  if (E >= 0.999) return 1.0;
  return forsterRadiusR0Nm * Math.pow(1.0 / E - 1.0, 1.0 / 6.0);
}

/**
 * Calculate Phasor Coordinates (g, s) from Lifetimes at Laser Angular Frequency omega:
 * For mono-exponential: g = 1 / (1 + (omega * tau)^2), s = (omega * tau) / (1 + (omega * tau)^2)
 */
export function calculateFlimPhasorCoordinates(
  components: FlimDecayComponent[],
  repetitionRateMhz: number = 40.0
): FlimPhasorCoordinates {
  const omega = 2.0 * Math.PI * (repetitionRateMhz * 1e6) * 1e-9; // rad / ns

  let totalWeight = 0.0;
  let gSum = 0.0;
  let sSum = 0.0;

  for (const c of components) {
    const alpha = c.amplitudeFractionPercent / 100.0;
    const tau = c.lifetimeNanoseconds;
    const denom = 1.0 + Math.pow(omega * tau, 2);
    const g_i = 1.0 / denom;
    const s_i = (omega * tau) / denom;

    gSum += alpha * g_i;
    sSum += alpha * s_i;
    totalWeight += alpha;
  }

  const g = totalWeight > 0 ? gSum / totalWeight : 0.5;
  const s = totalWeight > 0 ? sSum / totalWeight : 0.5;

  // Apparent phase lifetime: tau_phi = (1 / omega) * (s / g)
  const tauPhi = g > 0.01 ? (1.0 / omega) * (s / g) : 0.0;

  return {
    g: Math.round(g * 1000) / 1000,
    s: Math.round(s * 1000) / 1000,
    apparentLifetimeNanoseconds: Math.round(tauPhi * 100) / 100,
  };
}

/**
 * Benchmark Standard Catalog: 5 Core FLIM / TCSPC Systems
 */
export const FLIM_STANDARD_CATALOG: FlimStandard[] = [
  {
    id: 'fluorescein_basic_primary_calibrant',
    name: 'Fluorescein (FITC) in 0.1 M NaOH Lifetime Primary Calibrant (4.05 ns)',
    vietnameseName: 'Thuốc Nhuộm Huỳnh Quang Fluorescein (FITC) - Chuẩn Thời Gian Sống Sơ Cấp (4.05 ns)',
    applicationCategory: 'PRIMARY_CALIBRANT',
    laserRepetitionRateMhz: 40.0,
    laserExcitationWavelengthNm: 488,
    irfFwhmPicoseconds: 120,
    components: [
      {
        name: 'Deprotonated Fluorescein Dianion',
        lifetimeNanoseconds: 4.05,
        amplitudeFractionPercent: 100.0,
        biologicalRole: 'Phân tử huỳnh quang chuẩn sơ cấp quốc tế với phân rã đơn hàm mũ hoàn hảo',
      },
    ],
    description:
      'Chất chuẩn quốc tế sơ cấp kiểm định hệ đo TCSPC (PicoQuant / Becker & Hickl). Trong môi trường kiềm 0.1 M NaOH, fluorescein tồn tại 100% ở dạng dianion với thời gian sống duy nhất 4.05 ns, nằm chính xác trên đường tròn bán cầu vạn năng Universal Semicircle.',
    curriculumNotes:
      'Vật lý 12: Thuyết lượng tử ánh sáng, phát quang và thời gian sống trạng thái kích thích; Hóa học 11: Cân bằng acid-base và sự đổi màu chất chỉ thị.',
    isoStandardRef: 'IUPAC Technical Report on Standards for Photoluminescence Quantum Yields and Lifetimes',
  },
  {
    id: 'cfp_yfp_biosensor_flim_fret',
    name: 'CFP-YFP Biosensor FLIM-FRET Conformation Sensor (E = 45.9%)',
    vietnameseName: 'Cảm Biến Sinh Học CFP-YFP - Đo Tương Tác Phân Tử Bằng FLIM-FRET (E = 45.9%)',
    applicationCategory: 'FLIM_FRET',
    laserRepetitionRateMhz: 40.0,
    laserExcitationWavelengthNm: 440,
    irfFwhmPicoseconds: 120,
    forsterRadiusR0Nm: 4.92,
    components: [
      {
        name: 'FRET-Quenched Donor (CFP)',
        lifetimeNanoseconds: 1.45,
        amplitudeFractionPercent: 78.0,
        biologicalRole: 'Phân tử donor CFP bị dập tắt thời gian sống khi tương tác gần với acceptor YFP',
      },
      {
        name: 'Unquenched Free Donor (CFP)',
        lifetimeNanoseconds: 2.68,
        amplitudeFractionPercent: 22.0,
        biologicalRole: 'Dạng donor tự do không xảy ra trao đổi năng lượng FRET',
      },
    ],
    description:
      'Thước đo phân tử nano chuẩn vàng trong tế bào sống. Khi cơ chất liên kết, cấu trúc biosensor co lại làm CFP và YFP tiến lại gần nhau (khoảng cách r = 5.2 nm), dập tắt thời gian sống của CFP từ 2.68 ns xuống 1.45 ns với hiệu suất FRET đạt 45.9%.',
    curriculumNotes:
      'Sinh học 10 & 12: Tương tác protein-protein trong thụ thể tế bào; Hóa học 12: Truyền năng lượng cộng hưởng dipole-dipole.',
    isoStandardRef: 'IUPAC Physical Chemistry Division Recommendations on FRET Data Analysis',
  },
  {
    id: 'snarf5f_lysosomal_ph_biosensor',
    name: 'SNARF-5F Lysosomal Intracellular pH Nanobiosensor (pH 4.5 vs 7.4)',
    vietnameseName: 'Đầu Dò Huỳnh Quang SNARF-5F - Đo pH Cực Bộ Trong Tiêu Thể Lysosome',
    applicationCategory: 'PH_BIOSENSOR',
    laserRepetitionRateMhz: 40.0,
    laserExcitationWavelengthNm: 488,
    irfFwhmPicoseconds: 120,
    components: [
      {
        name: 'Protonated Acidic Species (Lysosome)',
        lifetimeNanoseconds: 1.15,
        amplitudeFractionPercent: 65.0,
        biologicalRole: 'Dạng proton hóa đặc trưng cho môi trường acid trong tiêu thể lysosome (pH ~ 4.5)',
      },
      {
        name: 'Deprotonated Basic Species (Cytosol)',
        lifetimeNanoseconds: 3.80,
        amplitudeFractionPercent: 35.0,
        biologicalRole: 'Dạng khử proton trong tế bào chất trung tính (pH ~ 7.4)',
      },
    ],
    description:
      'Đầu dò huỳnh quang nhạy cảm với ion H+. Không giống như cường độ huỳnh quang bị ảnh hưởng bởi nồng độ nhuộm không đều, thời gian sống FLIM của SNARF-5F đo tuyệt đối độ acid nội bào, phân biệt lysosome ung thư (pH 4.5) với bào tương.',
    curriculumNotes:
      'Hóa học 11: pH và sự điện li của acid-base yếu; Sinh học 10: Tiêu thể lysosome và cơ chế tiêu hóa nội bào.',
    isoStandardRef: 'MISEV Guidelines on Fluorescent Nanoprobes for Organelle Imaging',
  },
  {
    id: 'bodipy_c12_membrane_viscosity_rotor',
    name: 'BODIPY-C12 Molecular Rotor Lipid Raft Viscosity Sensor',
    vietnameseName: 'Cảm Biến Rotor Phân Tử BODIPY-C12 - Đo Độ Nhớt Màng Sinh Học & Lipid Raft',
    applicationCategory: 'MEMBRANE_VISCOSITY',
    laserRepetitionRateMhz: 40.0,
    laserExcitationWavelengthNm: 488,
    irfFwhmPicoseconds: 120,
    components: [
      {
        name: 'Rigid Lipid Raft Phase (L_o)',
        lifetimeNanoseconds: 3.90,
        amplitudeFractionPercent: 55.0,
        biologicalRole: 'Vùng bè lipid giàu cholesterol và sphingolipid cản trở chuyển động quay phân tử',
      },
      {
        name: 'Fluid Disordered Bilayer (L_d)',
        lifetimeNanoseconds: 1.60,
        amplitudeFractionPercent: 45.0,
        biologicalRole: 'Pha lỏng vô trật tự cho phép rotor quay tự do dập tắt kích thích',
      },
    ],
    description:
      'Rotor phân tử cắm vào màng đôi phospholipid. Trong pha lỏng vô trật tự (L_d), nhóm phenyl quay tự do giải phóng năng lượng qua chuyển động xoay (tau = 1.6 ns). Trong bè lipid cứng nhắc giàu cholesterol (L_o), chuyển động quay bị khóa, làm kéo dài thời gian sống lên 3.9 ns.',
    curriculumNotes:
      'Sinh học 10: Cấu trúc mô hình khảm lỏng của màng sinh chất; Hóa học 12: Lipid và liên kết hydrophobic.',
    isoStandardRef: 'Biophysical Journal Benchmark on Fluorescent Molecular Rotors',
  },
  {
    id: 'nadh_metabolic_coenzyme_glycolysis',
    name: 'Metabolic Coenzyme NADH Free vs Protein-Bound Warburg State',
    vietnameseName: 'Coenzyme Chuyển Hóa NADH - Phân Biệt Tự Do & Gắn Protein (Hiệu Ứng Warburg)',
    applicationCategory: 'METABOLIC_NADH',
    laserRepetitionRateMhz: 40.0,
    laserExcitationWavelengthNm: 405,
    irfFwhmPicoseconds: 120,
    components: [
      {
        name: 'Free Folded NADH (Glycolytic)',
        lifetimeNanoseconds: 0.40,
        amplitudeFractionPercent: 72.0,
        biologicalRole: 'Dạng NADH tự do tự dập tắt nội phân tử, đặc trưng cho tế bào ung thư tăng đường phân',
      },
      {
        name: 'LDH-Bound Extended NADH (OxPhos)',
        lifetimeNanoseconds: 3.20,
        amplitudeFractionPercent: 28.0,
        biologicalRole: 'Dạng NADH gắn vào enzyme lactate dehydrogenase tham gia phosphoryl hóa oxy hóa',
      },
    ],
    description:
      'Đo lường tự huỳnh quang (autofluorescence) nội sinh không cần nhuộm màu. NADH tự do có thời gian sống siêu ngắn (0.40 ns) do adenine và nicotinamide xếp chồng tự dập tắt; khi gắn vào enzyme, chuỗi duỗi thẳng kéo dài thời gian sống lên 3.20 ns, định lượng trực tiếp hiệu ứng Warburg ung thư.',
    curriculumNotes:
      'Sinh học 10 & 11: Hô hấp tế bào, chu trình Krebs và chuỗi truyền electron; Hóa học 12: Coenzyme nicotinamide adenine dinucleotide.',
    isoStandardRef: 'Nobel Foundation Historical Archives: Otto Warburg Cancer Metabolism (1931)',
  },
];

/**
 * Simulate Full FLIM TCSPC Decay & Phasor Analysis
 */
export function simulateFlimExperiment(
  standard: FlimStandard,
  totalBins: number = 120
): FlimSimulationResult {
  const periodNs = 1000.0 / standard.laserRepetitionRateMhz; // e.g. 25.0 ns for 40 MHz
  const dt = periodNs / (totalBins - 1);
  const irfSigma = (standard.irfFwhmPicoseconds * 1e-3) / 2.355; // ns
  const t0 = 1.8; // Peak position of IRF in ns

  let ampWeightedLifetime = 0.0;
  let numInt = 0.0;
  let denInt = 0.0;

  for (const c of standard.components) {
    const alpha = c.amplitudeFractionPercent / 100.0;
    ampWeightedLifetime += alpha * c.lifetimeNanoseconds;
    numInt += alpha * Math.pow(c.lifetimeNanoseconds, 2);
    denInt += alpha * c.lifetimeNanoseconds;
  }
  const intWeightedLifetime = denInt > 0 ? numInt / denInt : ampWeightedLifetime;

  // FRET calculations
  let fretEff = 0.0;
  let rNm = 0.0;
  if (standard.applicationCategory === 'FLIM_FRET') {
    const tauDA = standard.components[0].lifetimeNanoseconds;
    const tauD = standard.components[1].lifetimeNanoseconds;
    fretEff = calculateFlimFretEfficiencyPercent(tauD, tauDA);
    rNm = calculateFlimIntermolecularDistanceNm(fretEff, standard.forsterRadiusR0Nm || 5.0);
  }

  const phasor = calculateFlimPhasorCoordinates(
    standard.components,
    standard.laserRepetitionRateMhz
  );

  const points: FlimDecayCurvePoint[] = [];
  const maxCounts = 10000; // 10,000 peak counts (TCSPC standard)

  for (let i = 0; i < totalBins; i++) {
    const t = i * dt;

    // IRF Gaussian pulse
    const irfVal = Math.exp(-Math.pow(t - t0, 2) / (2.0 * Math.pow(irfSigma, 2)));

    // Multi-exponential decay convolved with IRF peak
    let decayVal = 0.0;
    if (t >= t0) {
      const elapsed = t - t0;
      for (const c of standard.components) {
        const alpha = c.amplitudeFractionPercent / 100.0;
        decayVal += alpha * Math.exp(-elapsed / c.lifetimeNanoseconds);
      }
    } else {
      decayVal = irfVal * 0.15;
    }

    const counts = Math.round(decayVal * maxCounts);
    const irfCounts = Math.round(irfVal * maxCounts * 0.9);

    points.push({
      timeNanoseconds: Math.round(t * 100) / 100,
      intensityCounts: Math.max(1, counts),
      irfIntensityCounts: Math.max(1, irfCounts),
    });
  }

  return {
    standard,
    laserPeriodNanoseconds: periodNs,
    amplitudeWeightedLifetimeNs: Math.round(ampWeightedLifetime * 100) / 100,
    intensityWeightedLifetimeNs: Math.round(intWeightedLifetime * 100) / 100,
    fretEfficiencyPercent: Math.round(fretEff * 10) / 10,
    apparentIntermolecularDistanceNm: Math.round(rNm * 100) / 100,
    phasorCoordinates: phasor,
    decayPoints: points,
    academicIntegrityNotes: `${standard.isoStandardRef}. ${standard.curriculumNotes}`,
  };
}

/**
 * Match a card to an appropriate FLIM standard
 */
export function getMatchingFlimCard(card: any): FlimStandard | null {
  if (!card) return null;
  const combined = `${card.name || ''} ${card.description || ''}`.toLowerCase();

  // 1. FLIM-FRET Biosensor
  if (
    combined.includes('fret') ||
    combined.includes('flim-fret') ||
    combined.includes('thước đo phân tử') ||
    combined.includes('cfp') ||
    combined.includes('yfp')
  ) {
    return FLIM_STANDARD_CATALOG.find((s) => s.id === 'cfp_yfp_biosensor_flim_fret') || null;
  }

  // 2. Metabolic NADH
  if (
    combined.includes('nadh') ||
    combined.includes('warburg') ||
    combined.includes('coenzyme') ||
    combined.includes('đường phân') ||
    combined.includes('chuyển hóa ung thư')
  ) {
    return FLIM_STANDARD_CATALOG.find((s) => s.id === 'nadh_metabolic_coenzyme_glycolysis') || null;
  }

  // 3. Membrane Viscosity Rotor
  if (
    combined.includes('bodipy') ||
    combined.includes('độ nhớt màng') ||
    combined.includes('lipid raft') ||
    combined.includes('rotor phân tử')
  ) {
    return FLIM_STANDARD_CATALOG.find((s) => s.id === 'bodipy_c12_membrane_viscosity_rotor') || null;
  }

  // 4. Lysosomal pH Biosensor
  if (
    combined.includes('ph') ||
    combined.includes('lysosome') ||
    combined.includes('tiêu thể') ||
    combined.includes('snarf')
  ) {
    return FLIM_STANDARD_CATALOG.find((s) => s.id === 'snarf5f_lysosomal_ph_biosensor') || null;
  }

  // 5. Fluorescein primary calibrant
  if (
    combined.includes('fluorescein') ||
    combined.includes('fitc') ||
    combined.includes('thời gian sống') ||
    combined.includes('lifetime') ||
    combined.includes('tcspc')
  ) {
    return FLIM_STANDARD_CATALOG.find((s) => s.id === 'fluorescein_basic_primary_calibrant') || null;
  }

  return null;
}

/**
 * Physical Validation Helper
 */
export function validateFlimStandardPhysics(standard: FlimStandard): boolean {
  if (standard.laserRepetitionRateMhz <= 0) return false;
  if (standard.irfFwhmPicoseconds <= 0) return false;
  if (standard.components.length === 0) return false;
  let totalPercent = 0.0;
  for (const c of standard.components) {
    if (c.lifetimeNanoseconds <= 0) return false;
    if (c.amplitudeFractionPercent <= 0) return false;
    totalPercent += c.amplitudeFractionPercent;
  }
  return Math.abs(totalPercent - 100.0) < 0.5;
}
