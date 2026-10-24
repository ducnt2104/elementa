/**
 * ELEMENTA - Quartz Crystal Microbalance with Dissipation (QCM-D), Sauerbrey Acoustic Mass & Viscoelastic Voigt Engine
 *
 * Biophysical Foundations & Analytical Standards:
 * - Günter Sauerbrey (1959 - Piezoelectric Microbalance Principle):
 *     - AT-cut quartz crystal oscillates in acoustic shear mode at fundamental resonance f₀ = 5.0 MHz.
 *     - Sauerbrey Equation for Rigid, Non-Dissipative Thin Films:
 *         Δm = - (C / n) * Δf_n
 *     - Sauerbrey Sensitivity Constant C:
 *         C = √(ρ_q * μ_q) / (2 * f₀²) ≈ 17.7 ng/(cm²·Hz) = 0.177 ng/(mm²·Hz)
 *         where ρ_q = 2.648 g/cm³ (quartz density), μ_q = 2.947 × 10¹¹ g/(cm·s²) (quartz shear modulus).
 *     - n is the harmonic overtone number (n = 1, 3, 5, 7, 9, 11).
 * - Michael Rodahl & Bengt Kasemo (Q-Sense / Chalmers University, 1995-1996 - Dissipation Monitoring):
 *     - When driving voltage is abruptly disconnected, the freely decaying oscillation amplitude:
 *         A(t) = A₀ * exp(-t / τ) * sin(2π * f * t + φ)
 *     - Energy Dissipation Factor D:
 *         D = E_dissipated / (2π * E_stored) = 1 / (π * f * τ)
 *     - ΔD measures the mechanical softness and viscoelastic damping of the adsorbed film.
 * - Viscoelastic Voigt-Voinova Model (M. Voinova, 1999):
 *     - Soft, hydrated biological layers (mucins, blood clots, DNA brushes, hydrogels) dissipate energy internally.
 *     - Overtones diverge (Δf_n / n is non-uniform).
 *     - Resolves acoustic "wet" mass (includes trapped hydration water), shear elasticity μ_f (Pa), and viscosity η_f (Pa·s).
 * - Acoustic (Wet) vs Optical (Dry) Hydration Diagnostic:
 *     - % H₂O = ( (Γ_QCM - Γ_opt) / Γ_QCM ) * 100%
 * - Curriculum: Vietnam GDPT 2018 (Vật lý 12: Dao động cơ học, dao động tắt dần, năng lượng cơ học và hiện tượng cộng hưởng áp điện; Hóa học & Sinh học 10-12: Sự đông tụ máu fibrinogen-fibrin, màng tế bào, hiện tượng hydrat hóa).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 64)
 */

export const SAUERBREY_CONSTANT_NG_PER_CM2_HZ = 17.7; // 17.7 ng/(cm²·Hz) for 5 MHz AT-cut quartz
export const SAUERBREY_CONSTANT_NG_PER_MM2_HZ = 0.177; // 0.177 ng/(mm²·Hz)
export const QUARTZ_FUNDAMENTAL_FREQ_MHZ = 5.0; // 5 MHz AT-cut crystal

export interface QcmdOvertoneData {
  overtoneNumber: number; // n = 3, 5, 7
  deltaFOverNHz: number; // Δf_n / n in Hz
  deltaDDissipationUnits: number; // ΔD in 10⁻⁶ units
}

export interface QcmdTimePoint {
  timeSec: number;
  overtones: QcmdOvertoneData[];
  sauerbreyMassNgPerMm2: number; // Nominal Sauerbrey mass from n = 3
  isViscoelastic: boolean; // ΔD > 1.0 × 10⁻⁶
  filmThicknessNm: number; // Acoustic thickness d
}

export interface QcmdSpecimenStandard {
  id: string;
  name: string;
  vietnameseName: string;
  sampleType: 'BLOOD_COAGULATION' | 'MUCIN_BRUSH' | 'VESICLE_RUPTURE' | 'RIGID_SAM' | 'DNA_BEACON';
  opticalDryMassNgPerMm2: number; // For comparison with acoustic wet mass
  fundamentalFreqMHz: number;
  transitionTimeSec: number;
  initialDeltaF3Hz: number;
  initialDeltaD3E6: number;
  finalDeltaF3Hz: number;
  finalDeltaD3E6: number;
  overtoneDivergenceFactor: number; // 0 for rigid, 0.25 - 0.65 for soft viscoelastic
  hydrationPercentage: number; // % trapped solvent
  description: string;
  curriculumNotes: string;
}

export interface QcmdSimulationResult {
  specimen: QcmdSpecimenStandard;
  finalSauerbreyMassNgPerMm2: number;
  finalDissipationE6: number;
  finalHydrationPercentage: number;
  filmRigidityStatus: 'RIGID_SAUERBREY_ELASTIC' | 'SOFT_VISCOELASTIC_VOIGT' | 'HYPER_HYDRATED_HYDROGEL';
  timePoints: QcmdTimePoint[];
}

export const QCMD_CATALOG: QcmdSpecimenStandard[] = [
  {
    id: 'blood_fibrin_gelation',
    name: 'Blood Clotting Fibrinogen-to-Fibrin Hydrogel Polymerization',
    vietnameseName: 'Đông Tụ Máu Fibrinogen Thành Mạng Lưới Gel Fibrin (Thrombin Xúc Tác)',
    sampleType: 'BLOOD_COAGULATION',
    opticalDryMassNgPerMm2: 3.5,
    fundamentalFreqMHz: 5.0,
    transitionTimeSec: 180, // Thrombin injection
    initialDeltaF3Hz: -32.0, // Initial monomer adsorption
    initialDeltaD3E6: 0.8,
    finalDeltaF3Hz: -165.0, // Huge frequency drop
    finalDeltaD3E6: 18.5, // Enormous dissipation spike (soft porous clot)
    overtoneDivergenceFactor: 0.45,
    hydrationPercentage: 88.0, // 88% trapped serum
    description: 'Thrombin cleaves fibrinopeptides A & B triggering 3D fibrin protofibril crosslinking. Dissipation ΔD skyrockets from 0.8 to 18.5 × 10⁻⁶ and overtones diverge dramatically, diagnosing real-time viscoelastic hydrogel formation.',
    curriculumNotes: 'GDPT 2018 Sinh học 11: Cơ chế đông máu và cân bằng nội môi; Hóa học 12: Sự đông tụ protein và hình thành gel phân tử sinh học.'
  },
  {
    id: 'mucin_hydrated_brush',
    name: 'Ocular/Gastric Mucin Glycoprotein Hydrated Lubricating Brush',
    vietnameseName: 'Chổi Glycoprotein Nhầy Mucin (Bôi Trơn & Hydrat Hóa Siêu Cao)',
    sampleType: 'MUCIN_BRUSH',
    opticalDryMassNgPerMm2: 2.2,
    fundamentalFreqMHz: 5.0,
    transitionTimeSec: 160,
    initialDeltaF3Hz: -25.0,
    initialDeltaD3E6: 1.5,
    finalDeltaF3Hz: -115.0,
    finalDeltaD3E6: 14.0,
    overtoneDivergenceFactor: 0.55,
    hydrationPercentage: 89.5, // > 89% water cushion
    description: 'MUC5AC mucin glycoproteins form an extended viscoelastic brush. The acoustic thickness (36 nm) far exceeds dry optical thickness (5 nm), proving the brush holds over 89% bound water for friction reduction.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 11: Lớp màng nhầy niêm mạc bảo vệ dạ dày khỏi HCl và pepsin; Hóa học 12: Polysaccharide và glycoprotein.'
  },
  {
    id: 'vesicle_two_step_rupture',
    name: 'POPC Supported Lipid Bilayer (Two-Step Vesicle Rupture)',
    vietnameseName: 'Hình Thành Màng Kép Lipid POPC (Quy Trình 2 Bước Vỡ Túi Liposome)',
    sampleType: 'VESICLE_RUPTURE',
    opticalDryMassNgPerMm2: 4.1,
    fundamentalFreqMHz: 5.0,
    transitionTimeSec: 200,
    initialDeltaF3Hz: -58.0, // Trapped vesicles
    initialDeltaD3E6: 11.2, // High dissipation
    finalDeltaF3Hz: -25.5, // Frequency rebounds as water leaves!
    finalDeltaD3E6: 0.35, // Dissipation drops near zero (rigid bilayer)
    overtoneDivergenceFactor: 0.05,
    hydrationPercentage: 15.0,
    description: 'Classic Q-Sense two-step signature: intact vesicles adsorb causing deep Δf (-58 Hz) and high ΔD (11.2 × 10⁻⁶). Critical coverage triggers vesicle rupture: trapped water is expelled, Δf rebounds to -25.5 Hz and ΔD collapses to < 0.4 × 10⁻⁶.',
    curriculumNotes: 'GDPT 2018 Sinh học 10: Màng sinh chất khảm động; Vật lý 12: Hiện tượng cộng hưởng cơ học và phân rã sóng âm.'
  },
  {
    id: 'rigid_thiol_sam',
    name: '1-Dodecanethiol Self-Assembled Monolayer on Gold (Rigid SAM)',
    vietnameseName: 'Màng Đơn Lớp Tự Lắp Ráp Alkanethiol Trên Vàng (Mô Hình Sauerbrey Cứng)',
    sampleType: 'RIGID_SAM',
    opticalDryMassNgPerMm2: 2.1,
    fundamentalFreqMHz: 5.0,
    transitionTimeSec: 140,
    initialDeltaF3Hz: -3.0,
    initialDeltaD3E6: 0.02,
    finalDeltaF3Hz: -18.5,
    finalDeltaD3E6: 0.08, // Negligible dissipation
    overtoneDivergenceFactor: 0.00, // Perfect overtone overlap
    hydrationPercentage: 0.0, // Dry rigid film
    description: 'Benchmark rigid Sauerbrey film: covalent Au-S coordination forms crystalline packed monolayer. Overtones n=3, 5, 7 overlap identically (Δf/n = -18.5 Hz) and dissipation remains near zero (ΔD < 0.1 × 10⁻⁶).',
    curriculumNotes: 'GDPT 2018 Hóa học 10: Liên kết cộng hóa trị tọa độ và lực liên kết phân tử; Hóa học 12: Cảm biến hóa học và công nghệ nano bề mặt.'
  },
  {
    id: 'dna_molecular_beacon',
    name: 'DNA Hairpin Molecular Beacon Grafting & Duplex Stiffening',
    vietnameseName: 'Cảm Biến Đèn Hiệu DNA Hairpin (Cứng Hóa Màng Khi Bắt Cặp Bổ Sung)',
    sampleType: 'DNA_BEACON',
    opticalDryMassNgPerMm2: 1.8,
    fundamentalFreqMHz: 5.0,
    transitionTimeSec: 220,
    initialDeltaF3Hz: -15.0,
    initialDeltaD3E6: 2.2, // Flexible loop dissipates energy
    finalDeltaF3Hz: -38.0, // Mass increases
    finalDeltaD3E6: 0.9, // Dissipation DROPS as duplex rigidifies!
    overtoneDivergenceFactor: 0.15,
    hydrationPercentage: 55.0,
    description: 'Thiolated DNA hairpins grafted on sensor are flexible (ΔD ≈ 2.2 × 10⁻⁶). Target hybridization unzips the loop into a rigid double-stranded rod: frequency drops due to mass addition, while dissipation decreases due to layer stiffening.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 12: Lai hóa phân tử ADN và ứng dụng chẩn đoán y sinh học; Vật lý 12: Dao động điều hòa và tắt dần.'
  }
];

/**
 * Calculates Sauerbrey acoustic mass from frequency shift:
 * Δm = - (C / n) * Δf_n
 * Δm in ng/mm² (or ng/cm²)
 */
export function calculateSauerbreyMass(
  deltaF_Hz: number,
  overtoneNumber: number = 3
): number {
  if (deltaF_Hz >= 0) return 0;
  // Δm (ng/mm²) = - (0.177 / n) * deltaF_Hz
  const massNgPerMm2 = - (SAUERBREY_CONSTANT_NG_PER_MM2_HZ / overtoneNumber) * deltaF_Hz;
  return Number(massNgPerMm2.toFixed(3));
}

/**
 * Calculates energy dissipation factor D from ring-down decay time:
 * D = 1 / (π * f * τ)
 */
export function calculateDissipationDecay(
  decayTimeTauSec: number,
  frequencyHz: number = 5.0e6
): number {
  if (decayTimeTauSec <= 0 || frequencyHz <= 0) return 0;
  const d = 1.0 / (Math.PI * frequencyHz * decayTimeTauSec);
  // Return in 10⁻⁶ units
  return Number((d * 1e6).toFixed(3));
}

/**
 * Full QCM-D Simulation Workflow across multiple overtones (n = 3, 5, 7)
 */
export function simulateQcmdExperiment(
  specimenId: string
): QcmdSimulationResult {
  const specimen = QCMD_CATALOG.find((s) => s.id === specimenId) || QCMD_CATALOG[0];

  const totalTimeSec = 600;
  const timeSteps = 120;
  const timePoints: QcmdTimePoint[] = [];

  const tTrans = specimen.transitionTimeSec;
  const fInit = specimen.initialDeltaF3Hz;
  const fFinal = specimen.finalDeltaF3Hz;
  const dInit = specimen.initialDeltaD3E6;
  const dFinal = specimen.finalDeltaD3E6;
  const divFactor = specimen.overtoneDivergenceFactor;

  for (let i = 0; i <= timeSteps; i++) {
    const t = Number(((totalTimeSec * i) / timeSteps).toFixed(1));

    // Sigmoidal transition progress (or two-step rupture for vesicles)
    let progress = 0;
    let intermediateSpike = 0;

    if (specimen.sampleType === 'VESICLE_RUPTURE') {
      // Two-step vesicle rupture kinetics:
      // Phase 1: adsorption to maximum (t ~ 180s)
      // Phase 2: sudden rupture collapse (t ~ 260s)
      if (t < 180) {
        progress = (t / 180) * 0.95;
      } else if (t < 250) {
        // Vesicle saturation peak
        progress = 1.0;
        intermediateSpike = 1.0;
      } else {
        // Rupture to flat bilayer
        const ruptureProgress = Math.min(1.0, (t - 250) / 70.0);
        progress = 1.0 - 0.55 * ruptureProgress;
        intermediateSpike = 1.0 - ruptureProgress;
      }
    } else {
      // Standard sigmoidal kinetics
      if (t < tTrans - 30) {
        progress = 0;
      } else if (t > tTrans + 70) {
        progress = 1.0;
      } else {
        const arg = (t - tTrans) / 20.0;
        progress = 1.0 / (1.0 + Math.exp(-arg));
      }
    }

    // Baseline frequency & dissipation for overtone n = 3
    let curF3 = fInit + (fFinal - fInit) * progress;
    let curD3 = dInit + (dFinal - dInit) * progress;

    if (specimen.sampleType === 'VESICLE_RUPTURE') {
      curF3 = -10 - 48 * intermediateSpike - 15.5 * progress;
      curD3 = 0.2 + 11.0 * intermediateSpike + 0.15 * progress;
    }

    // Overtones n = 3, 5, 7 with viscoelastic divergence
    const overtones: QcmdOvertoneData[] = [
      {
        overtoneNumber: 3,
        deltaFOverNHz: Number(curF3.toFixed(2)),
        deltaDDissipationUnits: Number(curD3.toFixed(3))
      },
      {
        overtoneNumber: 5,
        deltaFOverNHz: Number((curF3 * (1.0 - divFactor * 0.12)).toFixed(2)),
        deltaDDissipationUnits: Number((curD3 * (1.0 + divFactor * 0.10)).toFixed(3))
      },
      {
        overtoneNumber: 7,
        deltaFOverNHz: Number((curF3 * (1.0 - divFactor * 0.24)).toFixed(2)),
        deltaDDissipationUnits: Number((curD3 * (1.0 + divFactor * 0.22)).toFixed(3))
      }
    ];

    const sauerbreyMass = calculateSauerbreyMass(curF3, 3);
    // Acoustic thickness estimation (assuming film density ρ ≈ 1.05 g/cm³)
    const filmThicknessNm = Number((sauerbreyMass / 1.05).toFixed(2));

    timePoints.push({
      timeSec: t,
      overtones,
      sauerbreyMassNgPerMm2: sauerbreyMass,
      isViscoelastic: curD3 > 1.0,
      filmThicknessNm
    });
  }

  const lastPoint = timePoints[timePoints.length - 1];
  const finalMass = lastPoint.sauerbreyMassNgPerMm2;
  const finalD = lastPoint.overtones[0].deltaDDissipationUnits;

  let filmRigidityStatus: 'RIGID_SAUERBREY_ELASTIC' | 'SOFT_VISCOELASTIC_VOIGT' | 'HYPER_HYDRATED_HYDROGEL';
  if (finalD < 1.0) {
    filmRigidityStatus = 'RIGID_SAUERBREY_ELASTIC';
  } else if (finalD < 10.0) {
    filmRigidityStatus = 'SOFT_VISCOELASTIC_VOIGT';
  } else {
    filmRigidityStatus = 'HYPER_HYDRATED_HYDROGEL';
  }

  return {
    specimen,
    finalSauerbreyMassNgPerMm2: finalMass,
    finalDissipationE6: finalD,
    finalHydrationPercentage: specimen.hydrationPercentage,
    filmRigidityStatus,
    timePoints
  };
}

/**
 * Intelligent Card Matcher for QCM-D Piezoelectric Acoustic Systems
 */
export function getMatchingQcmdCard(card: { id?: string; name?: string; category?: string }): QcmdSpecimenStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('fibrin') || target.includes('clot') || target.includes('thrombin') || target.includes('blood') || target.includes('coagulation')) {
    return QCMD_CATALOG.find((s) => s.id === 'blood_fibrin_gelation') || null;
  }
  if (target.includes('mucin') || target.includes('brush') || target.includes('mucus') || target.includes('lubricant') || target.includes('glycoprotein')) {
    return QCMD_CATALOG.find((s) => s.id === 'mucin_hydrated_brush') || null;
  }
  if (target.includes('vesicle') || target.includes('rupture') || target.includes('bilayer') || target.includes('popc') || target.includes('q-sense')) {
    return QCMD_CATALOG.find((s) => s.id === 'vesicle_two_step_rupture') || null;
  }
  if (target.includes('sam') || target.includes('thiol') || target.includes('gold') || target.includes('monolayer') || target.includes('rigid')) {
    return QCMD_CATALOG.find((s) => s.id === 'rigid_thiol_sam') || null;
  }
  if (target.includes('beacon') || target.includes('hairpin') || target.includes('dna') || target.includes('hybridization')) {
    return QCMD_CATALOG.find((s) => s.id === 'dna_molecular_beacon') || null;
  }

  // Fallback
  if (target.includes('acoustic') || target.includes('crystal') || target.includes('mass') || target.includes('visco')) {
    return QCMD_CATALOG[0]; // Default to Blood Fibrin
  }

  return null;
}
