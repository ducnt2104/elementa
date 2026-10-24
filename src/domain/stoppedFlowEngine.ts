/**
 * ELEMENTA - Stopped-Flow Pre-Steady-State Chemical Kinetics & Flash Photolysis Engine
 *
 * Biophysical Foundations & Nobel Prize Standards:
 * - Nobel Prize in Chemistry 1967:
 *     Manfred Eigen, Ronald G. W. Norrish, and George Porter
 *     "for their studies of extremely fast chemical reactions, effected by disturbing the equilibrium by means of very short pulses of energy".
 * - Rapid Mixing Stopped-Flow Kinetics (Britton Chance 1940, Quentin Gibson 1954):
 *     - Pneumatically driven drive syringes inject reactants through a high-efficiency mixer into an optical flow cell.
 *     - Abrupt stopping syringe halts flow within microseconds, triggering spectroscopic data acquisition.
 *     - Instrument Dead Time (t_dead ≈ 0.5 - 1.5 ms):
 *         t_dead = V_dead / u_flow
 *         Any chemical transformation occurring during transit from mixer to observation volume occurs within the dead time.
 * - Pre-Steady-State Burst Kinetics (Hartree & Chance):
 *     - Enzyme acylation & deacylation mechanism:
 *         E + S <k1/k-1> ES --k2--> E-Ac + P1 --k3--> E + P2
 *     - When acylation is rapid (k2 >> k3):
 *         [P1](t) = π * (1 - exp(-k_obs * t)) + v_ss * t
 *         Burst amplitude: π ≈ [E]₀ * (k2 / (k2 + k3))²
 *         Steady-state velocity: v_ss = [E]₀ * k3 * [S] / (K_S + [S])
 * - Pseudo-First-Order Ligand Binding Kinetics:
 *     - A + B <k_on / k_off> AB (under [B] >> [A]):
 *         k_obs = k_on * [B] + k_off
 *         Slope = k_on (M⁻¹ s⁻¹), Y-intercept = k_off (s⁻¹), K_D = k_off / k_on (M).
 * - Flash Photolysis & Geminate Recombination (Norrish & Porter 1949):
 *     - Nanosecond laser excitation photodissociates heme-ligand bonds:
 *         Mb-CO + hν -> Mb* + CO
 *     - Biphasic rebinding: geminate cage recombination (t_1/2 ~ 180 ns) and bimolecular diffusion rebinding (k_bimol ~ 5e5 M⁻¹ s⁻¹).
 * - Curriculum: Vietnam GDPT 2018 (Hóa học 10: Tốc độ phản ứng hóa học, hằng số tốc độ k, bậc phản ứng, năng lượng hoạt hóa; Sinh học 10-12: Cơ chế xúc tác enzym, trung tâm hoạt động, chất ức chế cạnh tranh).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 62)
 */

export interface StoppedFlowDataPoint {
  timeMs: number; // Time in milliseconds (e.g. 0 to 500 ms)
  rawAbsorbance: number; // Optical signal (e.g. A400 nm or A436 nm)
  fittedAbsorbance: number; // Model prediction
  residual: number; // raw - fitted
  isDeadTimeRegion: boolean; // t < t_dead (unobservable transit window)
}

export interface ConcentrationSeriesPoint {
  substrateConcentrationMicroM: number; // [B] in µM
  kObsPerSec: number; // k_obs in s⁻¹
}

export interface StoppedFlowSpecimenStandard {
  id: string;
  name: string;
  vietnameseName: string;
  reactionType: 'BURST_KINETICS' | 'PSEUDO_FIRST_ORDER' | 'FLASH_PHOTOLYSIS' | 'RAPID_INTERMEDIATE' | 'REDOX_CLOCK';
  probeWavelengthNm: number; // Detection wavelength (e.g. 400 nm, 436 nm)
  defaultDeadTimeMs: number; // Instrument dead time (e.g. 1.0 ms)
  timeWindowMs: number; // Typical experiment duration (e.g. 50 ms to 2000 ms)
  kOnOrK2: number; // k_on (M⁻¹ s⁻¹) or k_acylation (s⁻¹)
  kOffOrK3: number; // k_off (s⁻¹) or k_deacylation (s⁻¹)
  equilibriumKdMicroM?: number; // Equilibrium KD in µM
  enzymeConcentrationMicroM?: number; // Total enzyme [E]₀ in µM
  substrateConcentrationMicroM?: number; // Reactant concentration in µM
  extinctionCoefficientMInvCmInv: number; // M⁻¹ cm⁻¹
  chemicalDescription: string;
  curriculumNotes: string;
}

export interface StoppedFlowSimulationResult {
  specimen: StoppedFlowSpecimenStandard;
  deadTimeMs: number;
  temperatureCelsius: number;
  substrateConcentrationMicroM: number;
  kObsPerSec: number;
  burstAmplitudeDeltaA: number;
  steadyStateRatePerSec: number;
  apparentKdMicroM: number;
  dataPoints: StoppedFlowDataPoint[];
  concentrationSeries: ConcentrationSeriesPoint[];
}

export const STOPPED_FLOW_CATALOG: StoppedFlowSpecimenStandard[] = [
  {
    id: 'chymotrypsin_pnpa',
    name: 'α-Chymotrypsin Pre-Steady-State Burst Hydrolysis (p-NPA)',
    vietnameseName: 'Thủy Phân Nhanh Tiền Ổn Định Của α-Chymotrypsin (Cơ chất p-NPA)',
    reactionType: 'BURST_KINETICS',
    probeWavelengthNm: 400, // p-nitrophenolate yellow anion
    defaultDeadTimeMs: 1.0,
    timeWindowMs: 800,
    kOnOrK2: 4.8, // k2 acylation rate = 4.8 s⁻¹
    kOffOrK3: 0.045, // k3 deacylation rate = 0.045 s⁻¹ (rate-limiting step)
    enzymeConcentrationMicroM: 25.0, // [E]₀ = 25 µM
    substrateConcentrationMicroM: 250.0, // [S] = 250 µM
    extinctionCoefficientMInvCmInv: 14000, // ε = 14,000 M⁻¹ cm⁻¹ at 400 nm
    chemicalDescription: 'Classic Hartley-Kilby burst experiment: rapid acylation of Ser195 releases stoichiometric 1 equivalent of yellow p-nitrophenolate (burst) before slow rate-limiting deacylation establishes steady-state turnover.',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 12: Động học phản ứng bậc 1 song song; Sinh học 10: Cơ chế trung tâm hoạt động Ser-His-Asp của protease serine.'
  },
  {
    id: 'carbonic_anhydrase_co2',
    name: 'Carbonic Anhydrase II (CA-II) Ultra-Fast CO₂ Hydration',
    vietnameseName: 'Hydrat Hóa CO₂ Siêu Tốc Của Enzym Carbonic Anhydrase II (CA-II)',
    reactionType: 'PSEUDO_FIRST_ORDER',
    probeWavelengthNm: 557, // Phenol Red pH indicator
    defaultDeadTimeMs: 0.8,
    timeWindowMs: 60, // 60 ms rapid completion
    kOnOrK2: 1.2e6, // k_cat/KM ≈ 1.2 × 10⁸ M⁻¹ s⁻¹
    kOffOrK3: 15.0,
    equilibriumKdMicroM: 120.0,
    enzymeConcentrationMicroM: 0.5,
    substrateConcentrationMicroM: 2000.0, // 2 mM CO₂
    extinctionCoefficientMInvCmInv: 32000,
    chemicalDescription: 'One of the fastest enzymes known in nature (k_cat ≈ 10⁶ s⁻¹). Stopped-flow mixing with pH indicators measures the millisecond acidification from H₂O + CO₂ -> HCO₃⁻ + H⁺ mediated by zinc-bound hydroxide.',
    curriculumNotes: 'GDPT 2018 Sinh học 11: Vận chuyển khí CO₂ và cân bằng axit-bazơ trong máu người; Hóa học 11: Cân bằng ion và pH dung dịch.'
  },
  {
    id: 'myoglobin_co_flash',
    name: 'Myoglobin-CO Nanosecond Laser Flash Photolysis Rebinding',
    vietnameseName: 'Quang Phân Hủy Laser & Tái Liên Kết Nhanh Myoglobin-CO (Heme Fe²⁺)',
    reactionType: 'FLASH_PHOTOLYSIS',
    probeWavelengthNm: 436, // Soret band deoxy-myoglobin peak
    defaultDeadTimeMs: 0.2, // Flash photolysis optical dead time < 1 µs
    timeWindowMs: 40,
    kOnOrK2: 5.2e5, // k_on = 5.2 × 10⁵ M⁻¹ s⁻¹
    kOffOrK3: 0.022, // k_off = 0.022 s⁻¹
    equilibriumKdMicroM: 0.042, // Ultra-high affinity KD ≈ 42 nM
    enzymeConcentrationMicroM: 10.0,
    substrateConcentrationMicroM: 100.0, // 100 µM dissolved CO
    extinctionCoefficientMInvCmInv: 65000,
    chemicalDescription: 'Nanosecond 532 nm laser pulse breaks Fe-CO coordination bond in < 10 ps. Transient absorption at 436 nm monitors rapid geminate cage recombination followed by bimolecular ligand migration through protein cavities.',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 12: Phức chất phối tử carbon monoxide của Fe(II), độc tính ngộ độc khí than CO; Vật lý 12: Quang phổ laser xung ngắn.'
  },
  {
    id: 'peroxidase_compound_one',
    name: 'Horseradish Peroxidase (HRP) Compound I Intermediate',
    vietnameseName: 'Tạo Hợp Chất Trung Gian Cực Nhanh Compound I Của Peroxidase (HRP + H₂O₂)',
    reactionType: 'RAPID_INTERMEDIATE',
    probeWavelengthNm: 403, // Resting ferric heme Soret transition to green Compound I
    defaultDeadTimeMs: 1.2,
    timeWindowMs: 150,
    kOnOrK2: 1.8e7, // Second-order association = 1.8 × 10⁷ M⁻¹ s⁻¹
    kOffOrK3: 2.5,
    equilibriumKdMicroM: 0.14,
    enzymeConcentrationMicroM: 8.0,
    substrateConcentrationMicroM: 40.0, // 40 µM H₂O₂
    extinctionCoefficientMInvCmInv: 102000,
    chemicalDescription: 'Ferric enzyme reacts with hydrogen peroxide at near diffusion-controlled rate (1.8 × 10⁷ M⁻¹ s⁻¹) forming oxoferryl porphyrin π-cation radical (Compound I, Fe(IV)=O Por•+), decaying to Compound II in milliseconds.',
    curriculumNotes: 'GDPT 2018 Hóa học 10: Phản ứng oxy hóa khử của oxi già H₂O₂; Sinh học 10: Tiêu hóa nội bào và phân giải gốc tự do độc hại trong peroxisome.'
  },
  {
    id: 'persulfate_iodide_clock',
    name: 'Iodide-Persulfate Rapid Redox Clock (S₂O₈²⁻ + 2I⁻)',
    vietnameseName: 'Đồng Hồ Động Học Oxy Hóa Khử Nhanh Iodide - Persulfate (S₂O₈²⁻ + 2I⁻)',
    reactionType: 'REDOX_CLOCK',
    probeWavelengthNm: 350, // Triiodide I₃⁻ absorbance peak
    defaultDeadTimeMs: 1.0,
    timeWindowMs: 1500,
    kOnOrK2: 18.5, // Effective second-order rate constant (M⁻¹ s⁻¹)
    kOffOrK3: 0.001,
    equilibriumKdMicroM: 0.001,
    substrateConcentrationMicroM: 5000.0, // 5 mM KI
    extinctionCoefficientMInvCmInv: 25000, // I₃⁻ molar extinction at 350 nm
    chemicalDescription: 'Bimolecular reaction between like-charged bivalent anions (S₂O₈²⁻ + I⁻ -> [S₂O₈·I]³⁻ -> 2SO₄²⁻ + I₂). Fast triiodide formation at 350 nm verifies Brønsted-Bjerrum primary salt effect on ionic transition states.',
    curriculumNotes: 'GDPT 2018 Hóa học 10: Ảnh hưởng của nồng độ và lực ion lên tốc độ phản ứng; Chuyên đề học tập Hóa học 10: Xác định bậc phản ứng thực nghiệm.'
  }
];

/**
 * Simulates pre-steady-state burst and pseudo-first-order stopped-flow kinetics
 */
export function simulateStoppedFlowKinetics(
  specimenId: string,
  deadTimeMs: number = 1.0,
  substrateConcMicroM?: number,
  temperatureCelsius: number = 25.0
): StoppedFlowSimulationResult {
  const specimen = STOPPED_FLOW_CATALOG.find((s) => s.id === specimenId) || STOPPED_FLOW_CATALOG[0];
  const sConc = substrateConcMicroM !== undefined ? substrateConcMicroM : (specimen.substrateConcentrationMicroM || 100.0);

  // Temperature Arrhenius scaling factor: Q10 ≈ 2.0
  const tempFactor = Math.pow(2.0, (temperatureCelsius - 25.0) / 10.0);

  let kObsPerSec = 0;
  let burstAmplitudeDeltaA = 0;
  let steadyStateRatePerSec = 0;
  let apparentKdMicroM = specimen.equilibriumKdMicroM || 10.0;

  const e0M = (specimen.enzymeConcentrationMicroM || 10.0) * 1e-6; // M
  const s0M = sConc * 1e-6; // M
  const eps = specimen.extinctionCoefficientMInvCmInv;
  const pathlengthCm = 1.0;

  if (specimen.reactionType === 'BURST_KINETICS') {
    // Chymotrypsin Hartley-Kilby model:
    // k_obs = k2 * [S] / (Ks + [S]) + k3
    const Ks = 150e-6; // M
    const k2 = specimen.kOnOrK2 * tempFactor;
    const k3 = specimen.kOffOrK3 * tempFactor;

    kObsPerSec = (k2 * s0M) / (Ks + s0M) + k3;
    const burstConcM = e0M * Math.pow(k2 / (k2 + k3), 2) * (s0M / (Ks + s0M));
    burstAmplitudeDeltaA = burstConcM * eps * pathlengthCm;
    steadyStateRatePerSec = (k2 * k3 / (k2 + k3)) * (s0M / (Ks + s0M));
  } else if (specimen.reactionType === 'PSEUDO_FIRST_ORDER' || specimen.reactionType === 'RAPID_INTERMEDIATE') {
    // A + B <-> AB: k_obs = k_on * [B] + k_off
    const kOn = specimen.kOnOrK2 * tempFactor;
    const kOff = specimen.kOffOrK3 * tempFactor;

    kObsPerSec = kOn * s0M + kOff;
    apparentKdMicroM = Number(((kOff / kOn) * 1e6).toFixed(3));
    burstAmplitudeDeltaA = (e0M * (s0M / (s0M + (kOff / kOn)))) * eps * pathlengthCm * 0.45;
    steadyStateRatePerSec = 0;
  } else if (specimen.reactionType === 'FLASH_PHOTOLYSIS') {
    // Myoglobin-CO flash photolysis:
    const kOn = specimen.kOnOrK2 * tempFactor;
    const kOff = specimen.kOffOrK3 * tempFactor;
    kObsPerSec = kOn * s0M + kOff;
    burstAmplitudeDeltaA = e0M * eps * pathlengthCm * 0.65;
    apparentKdMicroM = Number(((kOff / kOn) * 1e6).toFixed(4));
    steadyStateRatePerSec = 0;
  } else {
    // Redox clock reaction
    const kClock = specimen.kOnOrK2 * tempFactor;
    kObsPerSec = kClock * s0M;
    burstAmplitudeDeltaA = 0.85;
    steadyStateRatePerSec = kObsPerSec * 0.15;
  }

  // Generate time-course data points
  const pointsCount = 180;
  const tMax = specimen.timeWindowMs;
  const dataPoints: StoppedFlowDataPoint[] = [];

  const baselineAbs = 0.050; // Spectrometer optical dark baseline

  for (let i = 0; i < pointsCount; i++) {
    const tMs = Number(((tMax * i) / (pointsCount - 1)).toFixed(2));
    const tSec = tMs / 1000.0;
    const isDeadTime = tMs < deadTimeMs;

    let signal = 0;

    if (specimen.reactionType === 'BURST_KINETICS') {
      // DeltaA * (1 - exp(-k_obs * t)) + v_ss * t
      const burstTerm = burstAmplitudeDeltaA * (1.0 - Math.exp(-kObsPerSec * tSec));
      const ssTerm = (e0M * steadyStateRatePerSec * eps * pathlengthCm) * tSec;
      signal = baselineAbs + burstTerm + ssTerm;
    } else if (specimen.reactionType === 'FLASH_PHOTOLYSIS') {
      // Rapid recovery of Mb-CO: signal rises/decays monoexponentially
      signal = baselineAbs + burstAmplitudeDeltaA * Math.exp(-kObsPerSec * tSec);
    } else {
      // Standard exponential rise to maximum
      signal = baselineAbs + burstAmplitudeDeltaA * (1.0 - Math.exp(-kObsPerSec * tSec));
    }

    // Realistic photon shot noise (~0.0015 AU)
    const noise = (Math.sin(i * 12.7) + Math.cos(i * 5.3)) * 0.0012;
    const rawVal = Number((signal + noise).toFixed(4));
    const fittedVal = Number(signal.toFixed(4));

    dataPoints.push({
      timeMs: tMs,
      rawAbsorbance: rawVal,
      fittedAbsorbance: fittedVal,
      residual: Number((rawVal - fittedVal).toFixed(4)),
      isDeadTimeRegion: isDeadTime
    });
  }

  // Generate 5-point Concentration Series for Diagnostic Plot: k_obs vs [Substrate]
  const concentrationSeries: ConcentrationSeriesPoint[] = [];
  const baseConc = specimen.substrateConcentrationMicroM || 100.0;
  const concMultipliers = [0.25, 0.5, 1.0, 1.75, 2.5];

  concMultipliers.forEach((mult) => {
    const cMicroM = baseConc * mult;
    const cM = cMicroM * 1e-6;
    let kObs = 0;

    if (specimen.reactionType === 'BURST_KINETICS') {
      const Ks = 150e-6;
      kObs = (specimen.kOnOrK2 * tempFactor * cM) / (Ks + cM) + specimen.kOffOrK3 * tempFactor;
    } else {
      kObs = (specimen.kOnOrK2 * tempFactor) * cM + (specimen.kOffOrK3 * tempFactor);
    }

    concentrationSeries.push({
      substrateConcentrationMicroM: Number(cMicroM.toFixed(1)),
      kObsPerSec: Number(kObs.toFixed(2))
    });
  });

  return {
    specimen,
    deadTimeMs,
    temperatureCelsius,
    substrateConcentrationMicroM: sConc,
    kObsPerSec: Number(kObsPerSec.toFixed(2)),
    burstAmplitudeDeltaA: Number(burstAmplitudeDeltaA.toFixed(4)),
    steadyStateRatePerSec: Number(steadyStateRatePerSec.toFixed(4)),
    apparentKdMicroM,
    dataPoints,
    concentrationSeries
  };
}

/**
 * Intelligent Card Matcher for Stopped-Flow Rapid Kinetics Systems
 */
export function getMatchingStoppedFlowCard(card: { id?: string; name?: string; category?: string }): StoppedFlowSpecimenStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('chymotrypsin') || target.includes('burst') || target.includes('pnpa') || target.includes('serine') || target.includes('protease')) {
    return STOPPED_FLOW_CATALOG.find((s) => s.id === 'chymotrypsin_pnpa') || null;
  }
  if (target.includes('carbonic') || target.includes('anhydrase') || target.includes('co2') || target.includes('zinc') || target.includes('bicarbonate')) {
    return STOPPED_FLOW_CATALOG.find((s) => s.id === 'carbonic_anhydrase_co2') || null;
  }
  if (target.includes('myoglobin') || target.includes('flash') || target.includes('laser') || target.includes('photolysis') || target.includes('carbon monoxide') || target.includes('mb-co')) {
    return STOPPED_FLOW_CATALOG.find((s) => s.id === 'myoglobin_co_flash') || null;
  }
  if (target.includes('peroxidase') || target.includes('hrp') || target.includes('peroxide') || target.includes('h2o2') || target.includes('intermediate')) {
    return STOPPED_FLOW_CATALOG.find((s) => s.id === 'peroxidase_compound_one') || null;
  }
  if (target.includes('persulfate') || target.includes('iodide') || target.includes('clock') || target.includes('redox') || target.includes('kinetics')) {
    return STOPPED_FLOW_CATALOG.find((s) => s.id === 'persulfate_iodide_clock') || null;
  }

  // Fallback
  if (target.includes('enzyme') || target.includes('rate') || target.includes('speed') || target.includes('fast')) {
    return STOPPED_FLOW_CATALOG[0]; // Default to Chymotrypsin
  }

  return null;
}
