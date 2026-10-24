/**
 * Single-Molecule FRET (smFRET) & Alternating-Laser Excitation (ALEX) Engine
 * 
 * Physical Principles & Scientific Foundations:
 * 1. Single-Molecule Förster Resonance Energy Transfer (smFRET):
 *    Direct real-time observation of distance changes within single macromolecules (10 - 100 Å):
 *      E = 1 / (1 + (r / R_0)^6)
 *    where R_0 is the Förster distance (typically 5.0 - 6.0 nm for Cy3/Cy5 or Atto550/Atto647N).
 * 2. Alternating-Laser Excitation (ALEX / Pulsed Interleaved Excitation PIE):
 *    Alternating green (Donor excitation) and red (Acceptor direct excitation) laser pulses:
 *      - I_DD: Donor emission upon Donor excitation
 *      - I_DA: Acceptor emission upon Donor excitation (FRET signal!)
 *      - I_AA: Acceptor emission upon Acceptor direct excitation
 * 3. 2D E-S Sorting (Stoichiometry vs FRET Efficiency):
 *    - Spectral crosstalk correction: F_DA = I_DA - alpha * I_DD - delta * I_AA
 *    - FRET efficiency: E = F_DA / (F_DA + gamma * I_DD)
 *    - Stoichiometry ratio: S = (F_DA + gamma * I_DD) / (F_DA + gamma * I_DD + I_AA)
 *    - S ~= 1.0: Donor-only species (no acceptor / bleached)
 *    - S ~= 0.0: Acceptor-only species (no donor / bleached)
 *    - S ~= 0.5: Equimolar 1D:1A dual-labeled active complexes!
 * 4. Hidden Markov Model (HMM) & Kinetic Dwell Times:
 *    Fluorescence time trajectories reveal transitions between conformational states:
 *      k_open->closed = 1 / tau_dwell_open
 *      k_closed->open = 1 / tau_dwell_closed
 *      Delta G° = -R * T * ln(K_eq)
 * 5. 5 Benchmark Standards:
 *    - DNA Holliday Junction 4-Way Branch Migration & Folding (Lilley & Ha 2000)
 *    - Ribosome tRNA Translocation Classical vs Hybrid State (Puglisi & Blanchard 2004)
 *    - DNA Hairpin Dynamic Unzipping & Thermal Breathing (Bonnet & Libchaber 1998)
 *    - CRISPR-Cas9 HNH Endonuclease Conformational Activation (Doudna & Sternberg 2015)
 *    - GPCR beta-2 Adrenergic Receptor Dynamic Signaling (Kobilka 2012 Nobel Prize)
 * 6. Vietnam GDPT 2018 Curriculum Integration:
 *    - Vật lý 12: Thuyết lượng tử ánh sáng, quang phổ phát xạ, tương tác ánh sáng - hạt đơn lẻ.
 *    - Hóa học 12: Động học phản ứng, cân bằng hóa học Delta G = -RT ln K, cấu trúc DNA và protein.
 *    - Sinh học 10 & 12: Cấu trúc không gian của acid nucleic, cơ chế phiên mã - dịch mã ribosome, enzyme CRISPR-Cas9.
 */

export const GAS_CONSTANT_R = 8.314462618; // J/(mol*K)
export const STANDARD_TEMP_KELVIN = 298.15; // 25 °C in Kelvin

export interface SmFretState {
  name: string;
  vietnameseName: string;
  fretEfficiency: number; // 0.0 to 1.0
  intermolecularDistanceNm: number; // Distance in nm
  meanDwellTimeMs: number; // Mean residence time in ms
  populationFractionPercent: number; // %
}

export interface SmFretStandard {
  id: string;
  name: string;
  vietnameseName: string;
  category: 'HOLLIDAY_JUNCTION' | 'RIBOSOME_TRANSLOCATION' | 'DNA_HAIRPIN' | 'CRISPR_CAS9' | 'GPCR_RECEPTOR';
  donorDye: string; // e.g. Cy3 or Atto550
  acceptorDye: string; // e.g. Cy5 or Atto647N
  forsterRadiusR0Nm: number; // R_0 in nm (~ 5.4 nm)
  laserDonorWavelengthNm: number; // e.g. 532 nm
  laserAcceptorWavelengthNm: number; // e.g. 640 nm
  spectralCrosstalkAlpha: number; // alpha: donor bleed-through (~ 0.08)
  directExcitationDelta: number; // delta: direct excitation of acceptor (~ 0.05)
  gammaFactor: number; // gamma: detection efficiency & quantum yield ratio (~ 1.0)
  states: SmFretState[];
  description: string;
  curriculumNotes: string;
  citation: string;
}

export interface SmFretBurstPhotonPoint {
  id: number;
  fretEfficiency: number; // E (0 to 1)
  stoichiometry: number; // S (0 to 1)
  totalPhotons: number; // Total burst photons (e.g. 80 - 450 photons)
  subpopulation: 'DONOR_ONLY' | 'ACCEPTOR_ONLY' | 'DUAL_LABELED_STATE_1' | 'DUAL_LABELED_STATE_2';
}

export interface SmFretTrajectoryTimePoint {
  timeSeconds: number; // 0 to 10 s
  donorIntensityCounts: number; // I_D
  acceptorIntensityCounts: number; // I_A
  apparentFretEfficiency: number; // E_app = I_A / (I_D + I_A)
  idealHMMStateIndex: number; // 0 or 1
}

export interface SmFretSimulationResult {
  standard: SmFretStandard;
  bursts: SmFretBurstPhotonPoint[];
  trajectory: SmFretTrajectoryTimePoint[];
  forwardRateConstantK12: number; // s^-1 (transition from state 1 -> state 2)
  reverseRateConstantK21: number; // s^-1 (transition from state 2 -> state 1)
  equilibriumConstantKeq: number; // K_eq = k12 / k21
  deltaGStandardKiloJoulesPerMole: number; // Delta G° = -RT ln Keq in kJ/mol
  academicIntegrityNotes: string;
}

/**
 * Calculate distance from FRET efficiency and Forster radius R_0:
 * r = R_0 * ((1 - E) / E)^(1/6)
 */
export function calculateSmFretDistanceNm(fretEfficiency: number, forsterRadiusR0Nm: number): number {
  if (fretEfficiency <= 0.001) return forsterRadiusR0Nm * 2.5;
  if (fretEfficiency >= 0.999) return forsterRadiusR0Nm * 0.3;
  return forsterRadiusR0Nm * Math.pow((1.0 - fretEfficiency) / fretEfficiency, 1.0 / 6.0);
}

/**
 * Calculate FRET efficiency from distance r and Forster radius R_0:
 * E = 1 / (1 + (r / R_0)^6)
 */
export function calculateSmFretEfficiency(distanceNm: number, forsterRadiusR0Nm: number): number {
  if (distanceNm <= 0.0) return 1.0;
  const ratio = distanceNm / forsterRadiusR0Nm;
  return 1.0 / (1.0 + Math.pow(ratio, 6.0));
}

/**
 * Correct ALEX photon counts to obtain accurate E and S values:
 * F_DA = I_DA - alpha * I_DD - delta * I_AA
 * E = F_DA / (F_DA + gamma * I_DD)
 * S = (F_DA + gamma * I_DD) / (F_DA + gamma * I_DD + I_AA)
 */
export function calculateCorrectedSmFretAlexValues(
  iDD: number,
  iDA: number,
  iAA: number,
  alpha: number = 0.08,
  delta: number = 0.05,
  gamma: number = 1.0
): { correctedE: number; stoichiometryS: number } {
  const fDA = Math.max(0.0, iDA - alpha * iDD - delta * iAA);
  const denominatorE = fDA + gamma * iDD;
  const correctedE = denominatorE > 0 ? Math.max(0.0, Math.min(1.0, fDA / denominatorE)) : 0.0;
  
  const numeratorS = fDA + gamma * iDD;
  const denominatorS = numeratorS + iAA;
  const stoichiometryS = denominatorS > 0 ? Math.max(0.0, Math.min(1.0, numeratorS / denominatorS)) : 0.0;
  
  return { correctedE, stoichiometryS };
}

/**
 * 5 Globally Standardized Benchmark Systems for smFRET & ALEX
 */
export const SM_FRET_BENCHMARK_STANDARDS: SmFretStandard[] = [
  {
    id: 'HOLLIDAY_JUNCTION',
    name: 'Holliday Junction 4-Way DNA Branch Migration',
    vietnameseName: 'Ngã tư Holliday 4 sợi DNA & Chuyển dịch Cấu hình',
    category: 'HOLLIDAY_JUNCTION',
    donorDye: 'Cy3 (550 nm)',
    acceptorDye: 'Cy5 (670 nm)',
    forsterRadiusR0Nm: 5.4,
    laserDonorWavelengthNm: 532,
    laserAcceptorWavelengthNm: 640,
    spectralCrosstalkAlpha: 0.08,
    directExcitationDelta: 0.05,
    gammaFactor: 1.02,
    states: [
      {
        name: 'Isoform I (Open Folded)',
        vietnameseName: 'Đồng phân dị hình I (Dạng mở góc)',
        fretEfficiency: 0.22,
        intermolecularDistanceNm: 6.7,
        meanDwellTimeMs: 140,
        populationFractionPercent: 38
      },
      {
        name: 'Isoform II (Stacked Closed)',
        vietnameseName: 'Đồng phân dị hình II (Dạng xếp chồng)',
        fretEfficiency: 0.78,
        intermolecularDistanceNm: 4.4,
        meanDwellTimeMs: 230,
        populationFractionPercent: 62
      }
    ],
    description: 'Bốn sợi DNA ngã tư Holliday chuyển đổi linh động giữa hai cấu trúc không gian Isoform I và Isoform II phụ thuộc vào nồng độ ion cation Mg2+, thiết lập mô hình kinh điển giải Nobel tái tổ hợp di truyền.',
    curriculumNotes: 'Hóa học 12: Động học cân bằng chuyển hóa cấu trúc; Sinh học 12: Tái tổ hợp tương đồng và tiếp hợp - trao đổi chéo nhiễm sắc thể.',
    citation: 'Lilley, D. M. J. & Ha, T. (2000). Single-molecule FRET reveals Holliday junction dynamics. PNAS 97(17):9471-9475.'
  },
  {
    id: 'RIBOSOME_TRANSLOCATION',
    name: 'Ribosome tRNA Translocation Hybrid State',
    vietnameseName: 'Trạng thái Lai Chuyển vị tRNA trên Ribosome 70S',
    category: 'RIBOSOME_TRANSLOCATION',
    donorDye: 'Atto550',
    acceptorDye: 'Atto647N',
    forsterRadiusR0Nm: 5.8,
    laserDonorWavelengthNm: 532,
    laserAcceptorWavelengthNm: 640,
    spectralCrosstalkAlpha: 0.07,
    directExcitationDelta: 0.04,
    gammaFactor: 0.98,
    states: [
      {
        name: 'Classical State (A/A, P/P)',
        vietnameseName: 'Trạng thái Cổ điển (Vị trí A/A và P/P)',
        fretEfficiency: 0.72,
        intermolecularDistanceNm: 4.9,
        meanDwellTimeMs: 320,
        populationFractionPercent: 65
      },
      {
        name: 'Hybrid State (A/P, P/E)',
        vietnameseName: 'Trạng thái Lai động (Vị trí A/P và P/E)',
        fretEfficiency: 0.35,
        intermolecularDistanceNm: 6.5,
        meanDwellTimeMs: 170,
        populationFractionPercent: 35
      }
    ],
    description: 'Chuyển vị ribosome đơn phân tử: Phân tử tRNA gắn nhãn FRET dao động giữa cấu hình cổ điển và trạng thái lai trước khi yếu tố dịch mã EF-G thủy phân GTP để đẩy chuỗi polypeptide.',
    curriculumNotes: 'Sinh học 10 & 12: Cơ chế dịch mã tổng hợp protein tại ribosome; Hóa học 12: Xúc tác enzyme và thủy phân liên kết giàu năng lượng GTP.',
    citation: 'Blanchard, S. C., Gonzalez, R. L., Kim, H. D., Chu, S. & Puglisi, J. D. (2004). tRNA selection and translocation on the ribosome. Nat Struct Mol Biol 11:1008-1014.'
  },
  {
    id: 'DNA_HAIRPIN',
    name: 'DNA Hairpin Thermal Breathing & Folding',
    vietnameseName: 'Cặp Kẹp Tóc DNA Dao động Gấp nếp & Nhiệt động học',
    category: 'DNA_HAIRPIN',
    donorDye: 'Cy3',
    acceptorDye: 'Cy5',
    forsterRadiusR0Nm: 5.4,
    laserDonorWavelengthNm: 532,
    laserAcceptorWavelengthNm: 640,
    spectralCrosstalkAlpha: 0.09,
    directExcitationDelta: 0.06,
    gammaFactor: 1.05,
    states: [
      {
        name: 'Unfolded / Open State',
        vietnameseName: 'Dạng mở mạch thẳng (Unfolded)',
        fretEfficiency: 0.16,
        intermolecularDistanceNm: 7.2,
        meanDwellTimeMs: 45,
        populationFractionPercent: 25
      },
      {
        name: 'Folded / Closed Hairpin',
        vietnameseName: 'Dạng kẹp tóc đóng (Folded Hairpin)',
        fretEfficiency: 0.86,
        intermolecularDistanceNm: 4.0,
        meanDwellTimeMs: 135,
        populationFractionPercent: 75
      }
    ],
    description: 'Dao động đóng-mở nhiệt động học của vòng kẹp tóc DNA chuỗi đơn. Đo trực tiếp hằng số tốc độ đóng k_close và mở k_open qua phân tích thời gian cư trú ngẫu nhiên Poisson.',
    curriculumNotes: 'Hóa học 12: Động học phản ứng bậc 1, năng lượng kích hoạt Arrhenius; Vật lý 12: Dao động nhiệt và chuyển pha phân tử.',
    citation: 'Bonnet, G., Krichevsky, O. & Libchaber, A. (1998). Kinetics of conformational fluctuations in DNA hairpin-loops. PNAS 95(15):8602-8606.'
  },
  {
    id: 'CRISPR_CAS9',
    name: 'CRISPR-Cas9 HNH Nuclease Activation',
    vietnameseName: 'Kích hoạt Miền Nuclease HNH của CRISPR-Cas9',
    category: 'CRISPR_CAS9',
    donorDye: 'Cy3',
    acceptorDye: 'Cy5',
    forsterRadiusR0Nm: 5.6,
    laserDonorWavelengthNm: 532,
    laserAcceptorWavelengthNm: 640,
    spectralCrosstalkAlpha: 0.08,
    directExcitationDelta: 0.05,
    gammaFactor: 1.0,
    states: [
      {
        name: 'RNA-Bound Inactive (Conformation I)',
        vietnameseName: 'Dạng bất hoạt gắn RNA mục tiêu',
        fretEfficiency: 0.38,
        intermolecularDistanceNm: 6.2,
        meanDwellTimeMs: 520,
        populationFractionPercent: 45
      },
      {
        name: 'Docked Active Cleavage (Conformation C)',
        vietnameseName: 'Dạng cắt hoạt tính tiếp xúc sợi DNA',
        fretEfficiency: 0.82,
        intermolecularDistanceNm: 4.3,
        meanDwellTimeMs: 630,
        populationFractionPercent: 55
      }
    ],
    description: 'Enzyme chỉnh sửa gene Cas9 (Nobel Hóa học 2020 - Emmanuelle Charpentier & Jennifer Doudna): Miền HNH xoay linh động và gập sát chuỗi DNA mục tiêu để thực hiện vết cắt kép DSB.',
    curriculumNotes: 'Sinh học 12: Công nghệ chỉnh sửa gene CRISPR-Cas9; Hóa học 12: Cấu trúc bậc bốn của protein enzyme và phối tử.',
    citation: 'Sternberg, S. H., LaFrance, B., Kaplan, M. & Doudna, J. A. (2015). Conformational control of DNA target cleavage by CRISPR-Cas9. Nature 527:110-113.'
  },
  {
    id: 'GPCR_RECEPTOR',
    name: 'beta-2 Adrenergic Receptor Dynamic Activation',
    vietnameseName: 'Thụ thể G-Protein beta-2 Adrenergic Chuyển mạch Tín hiệu',
    category: 'GPCR_RECEPTOR',
    donorDye: 'Atto550',
    acceptorDye: 'Atto647N',
    forsterRadiusR0Nm: 5.5,
    laserDonorWavelengthNm: 532,
    laserAcceptorWavelengthNm: 640,
    spectralCrosstalkAlpha: 0.08,
    directExcitationDelta: 0.05,
    gammaFactor: 1.01,
    states: [
      {
        name: 'Basal / Inactive TM6 Closed',
        vietnameseName: 'Trạng thái nghỉ TM6 khép kín',
        fretEfficiency: 0.74,
        intermolecularDistanceNm: 4.7,
        meanDwellTimeMs: 280,
        populationFractionPercent: 70
      },
      {
        name: 'Active G-Protein Bound TM6 Open',
        vietnameseName: 'Trạng thái hoạt hóa mở rộng gắn G-Protein',
        fretEfficiency: 0.28,
        intermolecularDistanceNm: 6.6,
        meanDwellTimeMs: 120,
        populationFractionPercent: 30
      }
    ],
    description: 'Thụ thể bắt cặp G-Protein GPCR (Nobel Hóa học 2012 - Brian Kobilka & Robert Lefkowitz): Đo độ mở rộng của xoắn xuyên màng TM6 khi chất đồng vận liên kết và huy động protein Gs.',
    curriculumNotes: 'Sinh học 10 & 12: Truyền tin tế bào qua thụ thể màng; Dược học: Cơ chế thụ thể tác động của adrenaline và thuốc giãn phế quản.',
    citation: 'Manglik, A. & Kobilka, B. (2014). Structural insights into G-protein-coupled receptor activation. Cell 161(5):1101-1111.'
  }
];

/**
 * Generate 2D smFRET ALEX Burst Population (E-S Diagram)
 */
export function generateSmFretAlexBursts(
  standard: SmFretStandard,
  totalBursts: number = 300,
  donorOnlyFraction: number = 0.15,
  acceptorOnlyFraction: number = 0.15
): SmFretBurstPhotonPoint[] {
  const bursts: SmFretBurstPhotonPoint[] = [];
  const state1 = standard.states[0];
  const state2 = standard.states[1];
  
  const dualLabeledBursts = Math.round(totalBursts * (1.0 - donorOnlyFraction - acceptorOnlyFraction));
  const numDonorOnly = Math.round(totalBursts * donorOnlyFraction);
  const numAcceptorOnly = totalBursts - dualLabeledBursts - numDonorOnly;

  let burstId = 1;

  // 1. Donor-only subpopulation (S ~ 0.98, E ~ 0.02)
  for (let i = 0; i < numDonorOnly; i++) {
    const e = Math.max(0.0, Math.min(0.12, 0.02 + (Math.random() - 0.5) * 0.06));
    const s = Math.max(0.88, Math.min(1.0, 0.98 + (Math.random() - 0.5) * 0.04));
    const photons = Math.round(120 + Math.random() * 180);
    bursts.push({
      id: burstId++,
      fretEfficiency: e,
      stoichiometry: s,
      totalPhotons: photons,
      subpopulation: 'DONOR_ONLY'
    });
  }

  // 2. Acceptor-only subpopulation (S ~ 0.03, E ~ 0.00)
  for (let i = 0; i < numAcceptorOnly; i++) {
    const e = Math.max(0.0, Math.min(0.08, 0.01 + (Math.random() - 0.5) * 0.03));
    const s = Math.max(0.0, Math.min(0.08, 0.02 + (Math.random() - 0.5) * 0.03));
    const photons = Math.round(100 + Math.random() * 160);
    bursts.push({
      id: burstId++,
      fretEfficiency: e,
      stoichiometry: s,
      totalPhotons: photons,
      subpopulation: 'ACCEPTOR_ONLY'
    });
  }

  // 3. Dual-labeled subpopulation sorted into State 1 and State 2
  const fractionState1 = state1.populationFractionPercent / (state1.populationFractionPercent + state2.populationFractionPercent);
  const numState1 = Math.round(dualLabeledBursts * fractionState1);
  const numState2 = dualLabeledBursts - numState1;

  for (let i = 0; i < numState1; i++) {
    // Gaussian spread around nominal E with sigma ~ 0.07
    const noiseE = (Math.random() + Math.random() + Math.random() - 1.5) * 0.09;
    const e = Math.max(0.01, Math.min(0.99, state1.fretEfficiency + noiseE));
    const noiseS = (Math.random() + Math.random() - 1.0) * 0.06;
    const s = Math.max(0.35, Math.min(0.65, 0.52 + noiseS));
    const photons = Math.round(150 + Math.random() * 250);
    bursts.push({
      id: burstId++,
      fretEfficiency: e,
      stoichiometry: s,
      totalPhotons: photons,
      subpopulation: 'DUAL_LABELED_STATE_1'
    });
  }

  for (let i = 0; i < numState2; i++) {
    const noiseE = (Math.random() + Math.random() + Math.random() - 1.5) * 0.08;
    const e = Math.max(0.01, Math.min(0.99, state2.fretEfficiency + noiseE));
    const noiseS = (Math.random() + Math.random() - 1.0) * 0.06;
    const s = Math.max(0.35, Math.min(0.65, 0.50 + noiseS));
    const photons = Math.round(150 + Math.random() * 250);
    bursts.push({
      id: burstId++,
      fretEfficiency: e,
      stoichiometry: s,
      totalPhotons: photons,
      subpopulation: 'DUAL_LABELED_STATE_2'
    });
  }

  return bursts;
}

/**
 * Generate Single-Molecule Time-Resolved Trajectory with 2-State Markov Transitions
 */
export function generateSmFretTrajectory(
  standard: SmFretStandard,
  durationSeconds: number = 8.0,
  timeStepSeconds: number = 0.05
): SmFretTrajectoryTimePoint[] {
  const points: SmFretTrajectoryTimePoint[] = [];
  const state1 = standard.states[0];
  const state2 = standard.states[1];

  // Transition probabilities per time step dt
  const dtMs = timeStepSeconds * 1000.0;
  const prob1To2 = Math.min(0.9, dtMs / state1.meanDwellTimeMs);
  const prob2To1 = Math.min(0.9, dtMs / state2.meanDwellTimeMs);

  let currentState = 0; // Start in state 0 or 1
  if (Math.random() > 0.5) currentState = 1;

  const totalSteps = Math.round(durationSeconds / timeStepSeconds);
  const totalPhotonFlux = 120; // Average total photons per bin

  for (let i = 0; i < totalSteps; i++) {
    const t = i * timeStepSeconds;

    // Check Markov transition
    if (currentState === 0) {
      if (Math.random() < prob1To2) currentState = 1;
    } else {
      if (Math.random() < prob2To1) currentState = 0;
    }

    const nominalE = currentState === 0 ? state1.fretEfficiency : state2.fretEfficiency;
    // Expected donor and acceptor intensity
    const expectedAcceptor = totalPhotonFlux * nominalE;
    const expectedDonor = totalPhotonFlux * (1.0 - nominalE);

    // Poisson-like photon noise
    const noiseD = (Math.random() - 0.5) * 20;
    const noiseA = (Math.random() - 0.5) * 20;

    const donorCounts = Math.max(5, Math.round(expectedDonor + noiseD));
    const acceptorCounts = Math.max(5, Math.round(expectedAcceptor + noiseA));
    const apparentE = acceptorCounts / (donorCounts + acceptorCounts);

    points.push({
      timeSeconds: parseFloat(t.toFixed(2)),
      donorIntensityCounts: donorCounts,
      acceptorIntensityCounts: acceptorCounts,
      apparentFretEfficiency: parseFloat(apparentE.toFixed(3)),
      idealHMMStateIndex: currentState
    });
  }

  return points;
}

/**
 * Perform Comprehensive smFRET & ALEX Analysis
 */
export function simulateSmFretAlexSystem(standard: SmFretStandard): SmFretSimulationResult {
  const state1 = standard.states[0];
  const state2 = standard.states[1];

  // Transition rates: k = 1 / tau_dwell
  const forwardRateK12 = 1000.0 / state1.meanDwellTimeMs; // s^-1
  const reverseRateK21 = 1000.0 / state2.meanDwellTimeMs; // s^-1

  // Equilibrium constant K_eq = k12 / k21
  const equilibriumConstantKeq = forwardRateK12 / reverseRateK21;

  // Gibbs free energy Delta G° = -R * T * ln(K_eq) in kJ/mol
  const deltaGStandardKiloJoulesPerMole = 
    (-GAS_CONSTANT_R * STANDARD_TEMP_KELVIN * Math.log(equilibriumConstantKeq)) / 1000.0;

  const bursts = generateSmFretAlexBursts(standard, 320);
  const trajectory = generateSmFretTrajectory(standard, 8.0, 0.05);

  const academicNotes = 
    `Phổ FRET đơn phân tử (smFRET) kết hợp kích thích laser xen kẽ (ALEX) cho phép lọc sạch 100% tạp chất Donor-only và Acceptor-only thông qua giản đồ 2D E-S. ` +
    `Hằng số tốc độ thuận k_12 = ${forwardRateK12.toFixed(2)} s⁻¹, hằng số nghịch k_21 = ${reverseRateK21.toFixed(2)} s⁻¹, ` +
    `hằng số cân bằng nhiệt động K_eq = ${equilibriumConstantKeq.toFixed(3)}, biến thiên năng lượng tự do Gibbs chuẩn ΔG° = ${deltaGStandardKiloJoulesPerMole.toFixed(2)} kJ/mol. ` +
    `Độ phân giải khoảng cách đạt tới 0.1 nm (1 Å) trong phạm vi Förster R₀ = ${standard.forsterRadiusR0Nm} nm theo chuẩn IUPAC và sách giáo khoa GDPT 2018.`;

  return {
    standard,
    bursts,
    trajectory,
    forwardRateConstantK12: parseFloat(forwardRateK12.toFixed(3)),
    reverseRateConstantK21: parseFloat(reverseRateK21.toFixed(3)),
    equilibriumConstantKeq: parseFloat(equilibriumConstantKeq.toFixed(3)),
    deltaGStandardKiloJoulesPerMole: parseFloat(deltaGStandardKiloJoulesPerMole.toFixed(3)),
    academicIntegrityNotes: academicNotes
  };
}

/**
 * Match a game card to an smFRET / ALEX benchmark standard
 */
export function getMatchingSmFretCard(card: any): SmFretStandard | null {
  if (!card) return null;
  const combined = `${card.name || ''} ${card.description || ''}`.toLowerCase();

  // 1. Holliday Junction
  if (
    combined.includes('holliday') ||
    combined.includes('tái tổ hợp') ||
    combined.includes('trao đổi chéo') ||
    combined.includes('branch migration')
  ) {
    return SM_FRET_BENCHMARK_STANDARDS.find(s => s.id === 'HOLLIDAY_JUNCTION') || null;
  }

  // 2. Ribosome Translocation
  if (
    combined.includes('ribosome') ||
    combined.includes('dịch mã') ||
    combined.includes('trna') ||
    combined.includes('translocation') ||
    combined.includes('polypeptide')
  ) {
    return SM_FRET_BENCHMARK_STANDARDS.find(s => s.id === 'RIBOSOME_TRANSLOCATION') || null;
  }

  // 3. CRISPR-Cas9
  if (
    combined.includes('crispr') ||
    combined.includes('cas9') ||
    combined.includes('chỉnh sửa gene') ||
    combined.includes('nuclease')
  ) {
    return SM_FRET_BENCHMARK_STANDARDS.find(s => s.id === 'CRISPR_CAS9') || null;
  }

  // 4. DNA Hairpin
  if (
    combined.includes('kẹp tóc') ||
    combined.includes('hairpin') ||
    combined.includes('stem-loop') ||
    combined.includes('dao động nhiệt')
  ) {
    return SM_FRET_BENCHMARK_STANDARDS.find(s => s.id === 'DNA_HAIRPIN') || null;
  }

  // 5. GPCR
  if (
    combined.includes('gpcr') ||
    combined.includes('adrenergic') ||
    combined.includes('adrenaline') ||
    combined.includes('thụ thể màng') ||
    combined.includes('g-protein')
  ) {
    return SM_FRET_BENCHMARK_STANDARDS.find(s => s.id === 'GPCR_RECEPTOR') || null;
  }

  return null;
}

