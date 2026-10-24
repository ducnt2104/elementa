/**
 * Microscale Thermophoresis (MST), Ludwig-Soret Effect & Dissociation Constant (Kd) Engine
 * 
 * Standards & Physical Principles:
 * 1. Ludwig-Soret Effect (Thermophoresis / Thermal Diffusion):
 *    Molecules move along a microscopic temperature gradient (delta T ~ 2-6 K) induced by an infrared laser.
 *    c_hot / c_cold = exp(-S_T * delta T)
 *    where S_T = D_T / D is the Soret coefficient (K^-1).
 * 2. Tripartite molecular dependence:
 *    Thermophoretic mobility S_T is simultaneously sensitive to:
 *    a) Hydrodynamic size / radius r_H
 *    b) Net surface electric charge Z (Debye-Huckel screen)
 *    c) Hydration shell entropy (delta S_hydration)
 * 3. Law of Mass Action (Hill / Langmuir binding isotherm):
 *    Fraction Bound theta = [L]^n / ([L]^n + K_d^n)
 *    F_norm([L]) = F_unbound + (F_bound - F_unbound) * theta
 * 4. In-solution capillary measurement:
 *    Eliminates surface immobilization artifacts (unlike SPR or BLI). Works in cell lysate and blood serum.
 * 5. 5 Benchmark Standards:
 *    - Carbonic Anhydrase II - Furosemide Calibrant (Kd = 1.3 uM, positive thermophoresis)
 *    - p53 Tumor Suppressor - DNA Target Sequence (Kd = 18 nM, charge neutralization)
 *    - SARS-CoV-2 Spike RBD - Human ACE2 Receptor (Kd = 14.7 nM, hydration remodeling)
 *    - Calmodulin - Calcium Allosteric Cooperativity (Kd = 2.5 uM, Hill n = 2.1)
 *    - RNA Aptamer - Theophylline vs Caffeine (Kd = 100 nM, 10,000x single-methyl selectivity)
 * 6. Curriculum: Vietnam GDPT 2018 (Hóa học 10: Chuyển động nhiệt; Hóa học 11: Cân bằng hóa học Kd; Hóa học 12: Protein, tương tác phối tử, enzym & chất ức chế; Sinh học 10: Thụ thể màng).
 */

export const GAS_CONSTANT_R = 8.314462618; // J/(mol*K)

export interface MstStandard {
  id: string;
  name: string;
  vietnameseName: string;
  targetMolecule: string;
  ligandMolecule: string;
  trueKdMolar: number; // e.g. 1.3e-6 for 1.3 uM
  hillCoefficient: number; // 1.0 for non-cooperative, > 1.0 for cooperative
  unboundSoretCoeffPerKelvin: number; // S_T unbound (e.g. 0.015 K^-1)
  boundSoretCoeffPerKelvin: number; // S_T bound complex (e.g. 0.024 K^-1)
  unboundFnormPerMil: number; // F_norm unbound (e.g. 960 per mil)
  boundFnormPerMil: number; // F_norm bound (e.g. 920 per mil)
  targetConcentrationMolar: number; // e.g. 25 nM
  optimalIrLaserPowerPercent: 20 | 40 | 60 | 80;
  optimalTemperatureCelsius: number; // e.g. 25°C
  biologicalRole: string;
  description: string;
  curriculumNotes: string;
  affinityCategory: 'SUB_NANOMOLAR' | 'LOW_NANOMOLAR' | 'MICROMOLAR' | 'MILLIMOLAR';
}

export interface MstCapillaryTracePoint {
  timeSeconds: number; // 0 to 30 seconds
  fluorescenceArbitraryUnits: number;
  phase: 'COLD_INITIAL' | 'T_JUMP' | 'THERMOPHORESIS' | 'BACK_DIFFUSION';
}

export interface MstTitrationPoint {
  ligandConcentrationMolar: number;
  fractionBound: number; // 0.0 to 1.0
  fNormPerMil: number; // per mil (parts per thousand)
  fluorescenceTrace: MstCapillaryTracePoint[];
}

export interface MstSimulationResult {
  standard: MstStandard;
  fittedKdMolar: number;
  kdDisplayString: string;
  deltaGJoulesPerMol: number; // delta G° = R * T * ln(K_d)
  deltaGKcalPerMol: number;
  signalToNoiseRatio: number;
  titrationPoints: MstTitrationPoint[];
  deltaFnormPerMil: number; // |F_bound - F_unbound|
  temperatureCelsius: number;
  laserDeltaTKelvin: number; // typically 3.5 to 5.0 K
}

/**
 * Standard Catalog: 5 Benchmark Microscale Thermophoresis Systems
 */
export const MST_STANDARD_CATALOG: MstStandard[] = [
  {
    id: 'carbonic_anhydrase_furosemide',
    name: 'Carbonic Anhydrase II - Furosemide Diuretic (MST Calibrant)',
    vietnameseName: 'Carbonic Anhydrase II - Furosemide (Chuẩn Hiệu Chuẩn MST Toàn Cầu - Kd = 1.3 μM)',
    targetMolecule: 'Bovine Carbonic Anhydrase II (29 kDa)',
    ligandMolecule: 'Furosemide Diuretic Sulfonamide (330.7 Da)',
    trueKdMolar: 1.3e-6, // 1.3 μM
    hillCoefficient: 1.0,
    unboundSoretCoeffPerKelvin: 0.016,
    boundSoretCoeffPerKelvin: 0.025,
    unboundFnormPerMil: 955.0,
    boundFnormPerMil: 915.0,
    targetConcentrationMolar: 50e-9, // 50 nM
    optimalIrLaserPowerPercent: 40,
    optimalTemperatureCelsius: 25.0,
    biologicalRole: 'Thuốc lợi tiểu quai ức chế enzym hydrat hóa CO2 trong ống lượn xa và quai Henle của thận.',
    description:
      'The universal reference calibrant for MST instruments (NanoTemper Monolith). Binding of small-molecule furosemide to the zinc active site of carbonic anhydrase causes a local charge and hydration shell rearrangement, yielding a clean 40 per mil thermophoretic signal change with Kd = 1.3 μM.',
    curriculumNotes:
      'GDPT 2018 Hóa học 11 & 12: Hằng số cân bằng phân ly Kd; cơ chế ức chế enzym cạnh tranh của thuốc lợi tiểu sulfonamide.',
    affinityCategory: 'MICROMOLAR',
  },
  {
    id: 'p53_core_domain_dna_target',
    name: 'p53 Tumor Suppressor - Specific Response Element DNA (18 nM)',
    vietnameseName: 'Protein Ức Chế Khối U p53 - Đoạn DNA Mục Tiêu (Ái Lực Cao Kd = 18 nM & Khử Điện Tích)',
    targetMolecule: 'p53 Core DNA-Binding Domain Tetramer (78 kDa)',
    ligandMolecule: '20-bp Duplex DNA Response Element (12.3 kDa)',
    trueKdMolar: 18.0e-9, // 18 nM
    hillCoefficient: 1.1,
    unboundSoretCoeffPerKelvin: 0.012,
    boundSoretCoeffPerKelvin: 0.029,
    unboundFnormPerMil: 968.0,
    boundFnormPerMil: 890.0,
    targetConcentrationMolar: 10e-9, // 10 nM
    optimalIrLaserPowerPercent: 40,
    optimalTemperatureCelsius: 22.0,
    biologicalRole: 'Vệ sĩ bộ gen (Guardian of the Genome) nhận diện trình tự điều hòa dừng chu kỳ tế bào và kích hoạt apoptosis.',
    description:
      'p53 is the most critical tumor suppressor in human cancer biology. When positively charged basic amino acids in the DNA-binding loop coordinate the polyanionic DNA backbone, the net electric charge changes dramatically, leading to massive thermophoretic depletion (delta F_norm = 78 per mil).',
    curriculumNotes:
      'GDPT 2018 Sinh học 10 & Hóa học 12: Protein liên kết DNA, kiểm soát phiên mã gen, đột biến gen TP53 trong ung thư biểu mô.',
    affinityCategory: 'LOW_NANOMOLAR',
  },
  {
    id: 'sars_cov2_spike_rbd_human_ace2',
    name: 'SARS-CoV-2 Spike RBD - Human ACE2 Receptor (14.7 nM)',
    vietnameseName: 'Gai Glycoprotein SARS-CoV-2 RBD - Thụ Thể ACE2 Người (Ái Lực Gai Kháng Nguyên Kd = 14.7 nM)',
    targetMolecule: 'Recombinant Spike RBD Domain (25 kDa)',
    ligandMolecule: 'Human Angiotensin-Converting Enzyme 2 (ACE2 85 kDa)',
    trueKdMolar: 14.7e-9, // 14.7 nM
    hillCoefficient: 1.0,
    unboundSoretCoeffPerKelvin: 0.018,
    boundSoretCoeffPerKelvin: 0.032,
    unboundFnormPerMil: 948.0,
    boundFnormPerMil: 882.0,
    targetConcentrationMolar: 8.0e-9, // 8 nM
    optimalIrLaserPowerPercent: 60,
    optimalTemperatureCelsius: 25.0,
    biologicalRole: 'Cơ chế xâm nhập virus gây đại dịch COVID-19 vào tế bào biểu mô phế nang phổi.',
    description:
      'Direct in-solution quantification of the critical viral entry step without surface tethering. MST demonstrates that the Omicron and Delta mutations strengthen S-RBD/ACE2 affinity while remodeling the interfacial water hydration shell.',
    curriculumNotes:
      'GDPT 2018 Sinh học 10 & 11: Tương tác giữa kháng nguyên bề mặt virus và thụ thể tế bào chủ; cơ chế miễn dịch dịch thể và kháng thể trung hòa.',
    affinityCategory: 'LOW_NANOMOLAR',
  },
  {
    id: 'calmodulin_calcium_cooperative',
    name: 'Calmodulin - Calcium (Ca2+) Cooperativity (Hill n = 2.1)',
    vietnameseName: 'Calmodulin - Ion Canxi (Ca2+) Tương Tác Đồng Hướng (Allosteric Cooperativity - Hill n = 2.1)',
    targetMolecule: 'Apo-Calmodulin (16.7 kDa)',
    ligandMolecule: 'Calcium Cation (Ca2+ 40.08 Da)',
    trueKdMolar: 2.5e-6, // 2.5 μM
    hillCoefficient: 2.1, // Positive cooperativity across 4 EF-hands
    unboundSoretCoeffPerKelvin: 0.014,
    boundSoretCoeffPerKelvin: 0.026,
    unboundFnormPerMil: 960.0,
    boundFnormPerMil: 908.0,
    targetConcentrationMolar: 40e-9, // 40 nM
    optimalIrLaserPowerPercent: 40,
    optimalTemperatureCelsius: 25.0,
    biologicalRole: 'Protein cảm biến canxi nội bào điều hòa hàng trăm kinase và kênh ion tín hiệu tế bào.',
    description:
      'Binding of 4 Ca2+ ions to the EF-hand motifs triggers a dramatic conformational compaction of Calmodulin, exposing hydrophobic methionine patches. The steep sigmoidal binding curve exhibits pronounced positive allosteric cooperativity (Hill coefficient n = 2.1).',
    curriculumNotes:
      'GDPT 2018 Hóa học 11 & Sinh học 11: Tương tác ion kim loại kiềm thổ Ca2+ với protein; cấu trúc bậc 3, miền motif EF-hand và cân bằng liên kết đồng hướng.',
    affinityCategory: 'MICROMOLAR',
  },
  {
    id: 'rna_aptamer_theophylline_selectivity',
    name: 'RNA Aptamer - Theophylline vs Caffeine (10,000x Selectivity)',
    vietnameseName: 'Aptamer RNA - Theophylline (Chọn Lọc Phân Biệt 1 Nhóm Methyl Gấp 10,000 Lần Caffeine)',
    targetMolecule: 'Cy5-Labeled 33-nt RNA Aptamer (11.2 kDa)',
    ligandMolecule: 'Theophylline 1,3-dimethylxanthine (180.16 Da)',
    trueKdMolar: 100.0e-9, // 100 nM
    hillCoefficient: 1.0,
    unboundSoretCoeffPerKelvin: 0.011,
    boundSoretCoeffPerKelvin: 0.023,
    unboundFnormPerMil: 975.0,
    boundFnormPerMil: 922.0,
    targetConcentrationMolar: 15e-9, // 15 nM
    optimalIrLaserPowerPercent: 40,
    optimalTemperatureCelsius: 22.0,
    biologicalRole: 'Mẫu mực thiết kế thụ thể axit nucleic nhân tạo phát hiện thuốc giãn phế quản trị hen suyễn.',
    description:
      'A classic triumph of molecular recognition. The 33-nt RNA aptamer binds theophylline with Kd = 100 nM, but binds caffeine (which differs solely by an extra methyl group at position N-7) with Kd > 1 mM. MST clearly captures the adaptive RNA tertiary folding upon ligand pocket encapsulation.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 & Sinh học 10: Cấu trúc không gian bậc 3 của RNA, liên kết hydro chọn lọc và độ đặc hiệu phân tử phân biệt một nhóm methyl (-CH3).',
    affinityCategory: 'LOW_NANOMOLAR',
  },
];

/**
 * Calculate Steady-State Thermophoretic Depletion:
 * c_hot / c_cold = exp(-S_T * delta T)
 */
export function calculateSoretDepletionRatio(
  soretCoeffSTPerKelvin: number,
  deltaTKelvin: number = 4.0
): number {
  return Math.exp(-soretCoeffSTPerKelvin * deltaTKelvin);
}

/**
 * Calculate Bound Fraction theta using Law of Mass Action with Hill Cooperativity:
 * theta = [L]^n / ([L]^n + K_d^n)
 */
export function calculateMstBoundFraction(
  ligandConcMolar: number,
  kdMolar: number,
  hillCoeff: number = 1.0
): number {
  if (ligandConcMolar <= 0) return 0.0;
  const l_n = Math.pow(ligandConcMolar, hillCoeff);
  const kd_n = Math.pow(kdMolar, hillCoeff);
  return l_n / (l_n + kd_n);
}

/**
 * Generate 30-second Capillary MST Fluorescence Trace:
 * Phase 1: 0 - 5s -> Cold initial fluorescence (F_initial = 1.0)
 * Phase 2: 5 - 6s -> Temperature Jump (T-Jump fast relaxation)
 * Phase 3: 6 - 20s -> Thermophoretic transport depletion (diffusion to steady state)
 * Phase 4: 20 - 30s -> Laser OFF, back-diffusion relaxation
 */
export function generateMstCapillaryTrace(
  fractionBound: number,
  unboundFnorm: number,
  boundFnorm: number
): MstCapillaryTracePoint[] {
  const fNormTarget = unboundFnorm + (boundFnorm - unboundFnorm) * fractionBound;
  const depletionFraction = 1.0 - (fNormTarget / 1000.0);

  const points: MstCapillaryTracePoint[] = [];

  for (let sec = 0; sec <= 30; sec += 0.5) {
    let phase: 'COLD_INITIAL' | 'T_JUMP' | 'THERMOPHORESIS' | 'BACK_DIFFUSION' = 'COLD_INITIAL';
    let fluor = 1000.0; // Base fluorescence AU

    if (sec < 5.0) {
      phase = 'COLD_INITIAL';
      fluor = 1000.0 + (Math.sin(sec * 12.0) * 1.5); // Minor baseline noise
    } else if (sec >= 5.0 && sec < 6.0) {
      phase = 'T_JUMP';
      // Fast photophysical temperature quench (~15 AU drop in 1s)
      const tJumpProgress = (sec - 5.0) / 1.0;
      fluor = 1000.0 - 18.0 * tJumpProgress;
    } else if (sec >= 6.0 && sec <= 20.0) {
      phase = 'THERMOPHORESIS';
      // Exponential approach to thermophoretic depletion plateau
      const thermoProgress = 1.0 - Math.exp(-(sec - 6.0) / 3.8);
      const targetDepletionAu = 1000.0 * depletionFraction;
      fluor = 982.0 - targetDepletionAu * thermoProgress;
    } else {
      phase = 'BACK_DIFFUSION';
      // Laser turned off at 20s: molecules diffuse back
      const backProgress = Math.exp(-(sec - 20.0) / 4.2);
      const targetDepletionAu = 1000.0 * depletionFraction;
      fluor = 982.0 - (targetDepletionAu * backProgress) + (1.0 - backProgress) * 18.0;
    }

    points.push({
      timeSeconds: Math.round(sec * 10) / 10,
      fluorescenceArbitraryUnits: Math.round(fluor * 10) / 10,
      phase,
    });
  }

  return points;
}

/**
 * Format dissociation constant Kd with physical unit prefix (pM, nM, uM, mM)
 */
export function formatKdString(kdMolar: number): string {
  if (kdMolar < 1e-9) {
    return `${(kdMolar * 1e12).toFixed(1)} pM`;
  } else if (kdMolar < 1e-6) {
    return `${(kdMolar * 1e9).toFixed(1)} nM`;
  } else if (kdMolar < 1e-3) {
    return `${(kdMolar * 1e6).toFixed(1)} μM`;
  } else {
    return `${(kdMolar * 1e3).toFixed(1)} mM`;
  }
}

/**
 * Simulate Microscale Thermophoresis Titration Curve & Affinities
 */
export function simulateMstExperiment(
  standard: MstStandard,
  laserPowerPercent: number = standard.optimalIrLaserPowerPercent,
  temperatureCelsius: number = standard.optimalTemperatureCelsius
): MstSimulationResult {
  const kd = standard.trueKdMolar;
  const hill = standard.hillCoefficient;
  const tempK = temperatureCelsius + 273.15;

  // Temperature rise induced by IR laser: delta T ~ 1.5 K (at 20%) to 6.0 K (at 80%)
  const laserDeltaT = (laserPowerPercent / 80.0) * 5.5 + 1.0;

  // Gibbs free energy of binding: delta G° = R * T * ln(K_d)
  const deltaGJoules = GAS_CONSTANT_R * tempK * Math.log(kd);
  const deltaGKcal = deltaGJoules / 4184.0;

  // Generate 16 serial 1:1 dilution titration points spanning 4 orders of magnitude around Kd
  // From Kd / 100 to Kd * 1000
  const titrationPoints: MstTitrationPoint[] = [];
  const minConc = kd / 100.0;
  const maxConc = kd * 800.0;
  const numPoints = 16;
  const logMin = Math.log10(minConc);
  const logMax = Math.log10(maxConc);
  const stepLog = (logMax - logMin) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    const conc = Math.pow(10, logMin + i * stepLog);
    const theta = calculateMstBoundFraction(conc, kd, hill);
    const fNorm = standard.unboundFnormPerMil + (standard.boundFnormPerMil - standard.unboundFnormPerMil) * theta;

    // Simulate capillary trace for 3 key concentrations (unbound, half-bound, fully-bound)
    const trace = generateMstCapillaryTrace(
      theta,
      standard.unboundFnormPerMil,
      standard.boundFnormPerMil
    );

    titrationPoints.push({
      ligandConcentrationMolar: conc,
      fractionBound: Math.round(theta * 1000) / 1000,
      fNormPerMil: Math.round(fNorm * 10) / 10,
      fluorescenceTrace: trace,
    });
  }

  const deltaFnorm = Math.abs(standard.boundFnormPerMil - standard.unboundFnormPerMil);
  const noisePerMil = 2.5; // Typical MST detector noise ~ 2-3 per mil
  const snr = Math.round((deltaFnorm / noisePerMil) * 10) / 10;

  return {
    standard,
    fittedKdMolar: kd,
    kdDisplayString: formatKdString(kd),
    deltaGJoulesPerMol: Math.round(deltaGJoules),
    deltaGKcalPerMol: Math.round(deltaGKcal * 10) / 10,
    signalToNoiseRatio: snr,
    titrationPoints,
    deltaFnormPerMil: deltaFnorm,
    temperatureCelsius,
    laserDeltaTKelvin: Math.round(laserDeltaT * 10) / 10,
  };
}

/**
 * Match a card to an appropriate MST standard
 */
export function getMatchingMstCard(card: any): MstStandard | null {
  if (!card) return null;
  const name = (card.name || '').toLowerCase();
  const desc = (card.description || '').toLowerCase();
  const formula = (card.chemicalFormula || card.formula || '').toLowerCase();

  // 1. Carbonic Anhydrase / Furosemide
  if (
    name.includes('carbonic anhydrase') ||
    desc.includes('furosemide') ||
    name.includes('furosemide') ||
    desc.includes('diuretic')
  ) {
    return MST_STANDARD_CATALOG.find((s) => s.id === 'carbonic_anhydrase_furosemide') || null;
  }

  // 2. p53 Tumor Suppressor / DNA Binding
  if (
    name.includes('p53') ||
    desc.includes('p53') ||
    desc.includes('tumor suppressor') ||
    name.includes('tp53')
  ) {
    return MST_STANDARD_CATALOG.find((s) => s.id === 'p53_core_domain_dna_target') || null;
  }

  // 3. SARS-CoV-2 / ACE2 / Spike
  if (
    name.includes('spike') ||
    name.includes('ace2') ||
    desc.includes('sars-cov-2') ||
    name.includes('coronavirus')
  ) {
    return MST_STANDARD_CATALOG.find((s) => s.id === 'sars_cov2_spike_rbd_human_ace2') || null;
  }

  // 4. Calmodulin / Calcium
  if (
    name.includes('calmodulin') ||
    desc.includes('calmodulin') ||
    desc.includes('ef-hand') ||
    (name.includes('canxi') && desc.includes('protein'))
  ) {
    return MST_STANDARD_CATALOG.find((s) => s.id === 'calmodulin_calcium_cooperative') || null;
  }

  // 5. Aptamer / Theophylline
  if (
    name.includes('aptamer') ||
    desc.includes('theophylline') ||
    name.includes('theophylline')
  ) {
    return MST_STANDARD_CATALOG.find((s) => s.id === 'rna_aptamer_theophylline_selectivity') || null;
  }

  return null;
}

/**
 * Validation helper for MST standard physics
 */
export function validateMstStandardPhysics(standard: MstStandard): boolean {
  if (standard.trueKdMolar <= 0) return false;
  if (standard.hillCoefficient <= 0) return false;
  if (standard.unboundSoretCoeffPerKelvin <= 0 || standard.boundSoretCoeffPerKelvin <= 0) return false;
  if (standard.unboundFnormPerMil <= 0 || standard.boundFnormPerMil <= 0) return false;
  return true;
}
