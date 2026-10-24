/**
 * ELEMENTA - Magnetic Tweezers, Supercoiling DNA Plectoneme & Topoisomerase Catalytic Engine
 *
 * Biophysical Foundations & International Standards:
 * - Single-Molecule Magnetic Tweezers (Strick, Allemand, Bensimon, Croquette, 1996-2000):
 *     - External permanent pair of Neodymium magnets (NdFeB) generates constant magnetic field gradient ∇B.
 *     - Constant vertical force: F_mag = 1/2 · ∇(m · B) ≈ F₀ · exp(-z_mag / z₀), where z_mag is magnet-to-sample distance.
 *     - Rotating magnets rotates the superparamagnetic bead, twisting the tethered DNA without torque feedback on the instrument.
 * - Topological Invariance (White's Theorem & Călugăreanu-Fuller Formula):
 *     - Linking number difference: ΔLk = ΔTw + ΔWr
 *     - Where Tw is twist (intrinsic duplex rotation, 10.5 bp/turn) and Wr is writhe (3D plectonemic looping).
 *     - Supercoiling density: σ = ΔLk / Lk₀ = (n_turns · 10.5) / N_bp.
 * - Plectoneme Buckling Transition:
 *     - At low force (F < 0.5 pN): twisting past critical turns |n_c| buckles the molecule into plectonemic supercoils.
 *       Each additional turn shortens the extension by Δz ≈ 50 nm/turn (hat-shaped rotation curve).
 *     - At higher force (F > 1.0 pN): positive supercoils form plectonemes, but negative turns cause DNA melting bubble denaturation without extension decrease.
 * - Topoisomerase Catalytic Steps:
 *     - Topoisomerase I (Type IA/IB): cleaves single strand, swivels or strand-passes with ΔLk = +1 per catalytic cycle, extending DNA by ~50 nm/step.
 *     - Topoisomerase II / DNA Gyrase (Type IIA): cleaves double strand, passes duplex with ΔLk = ±2 per cycle coupling 2 ATP hydrolyses.
 *     - Antibiotic / Oncology: Fluoroquinolones (Ciprofloxacin) target Gyrase; Etoposide/Doxorubicin trap Topo II-DNA cleavage complexes.
 * - Curriculum: Vietnam GDPT 2018 (Sinh học 10 & 12: Cấu trúc siêu xoắn ADN, nhân đôi ADN, enzyme tháo xoắn Topoisomerase/Gyrase; Vật lý 12: Từ trường, lực từ, momen từ piconewton).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 66)
 */

export const DNA_BP_PER_TURN = 10.5; // Watson-Crick B-DNA pitch
export const DNA_RISE_PER_BP_NM = 0.34; // 0.34 nm per base pair
export const PLECTONEME_CONTRACTION_PER_TURN_NM = 52.0; // Typical extension loss per plectonemic turn at ~0.3 pN

export interface MagneticTweezersRotationPoint {
  turns: number; // Magnet rotations (positive = overwound, negative = underwound)
  extensionMicrons: number; // Measured DNA end-to-end extension z (µm)
  supercoilingDensitySigma: number; // σ = ΔLk / Lk₀
  state: 'TWIST_ELASTIC' | 'PLECTONEME_BUCKLING' | 'MELTED_BUBBLE' | 'P_DNA';
}

export interface TopoisomeraseStepTracePoint {
  timeSec: number; // Time in seconds
  extensionMicrons: number; // Stepwise lengthening as supercoils are removed
  linkingNumberChange: number; // Cumulative ΔLk
  stepDetected: boolean;
}

export interface MagneticTweezersSpecimenStandard {
  id: string;
  name: string;
  vietnameseName: string;
  experimentType: 'DNA_SUPERCOILING_ROTATION' | 'TOPO_I_CATALYSIS' | 'GYRASE_NEGATIVE_SUPERCOILING' | 'TOPO_II_DECATENATION' | 'CRISPR_CAS9_R_LOOP';
  dnaLengthBp: number; // e.g. 48500 bp for Lambda DNA (~16.4 µm)
  relaxedContourLengthMicrons: number;
  pullingForcePn: number; // Force set by magnet height (e.g. 0.3 pN or 3.0 pN)
  criticalBucklingTurns: number; // n_c where plectoneme starts forming
  catalyticStepDeltaLk?: number; // +1 for Topo I, ±2 for Topo II/Gyrase
  inhibitorDrug?: string; // Ciprofloxacin, Etoposide
  beadRadiusMicrons: number; // Typically 0.5 - 1.4 µm
  description: string;
  curriculumNotes: string;
}

export interface MagneticTweezersSimulationResult {
  specimen: MagneticTweezersSpecimenStandard;
  magnetHeightMm: number; // Distance of magnets above sample (1 - 10 mm)
  actualForcePn: number; // F = F_0 * exp(-z / z_0)
  maxExtensionMicrons: number;
  rotationCurve: MagneticTweezersRotationPoint[];
  topoisomeraseTrace?: TopoisomeraseStepTracePoint[];
  plectonemeTurnsCount: number;
}

export const MAGNETIC_TWEEZERS_CATALOG: MagneticTweezersSpecimenStandard[] = [
  {
    id: 'lambda_dna_supercoiling_03pn',
    name: 'Bacteriophage λ-DNA Supercoiling & Plectoneme Buckling (0.35 pN)',
    vietnameseName: 'Siêu Xoắn ADN Thực Khuẩn Thể Lambda & Uốn Nếp Plectoneme (Lực Thấp 0.35 pN)',
    experimentType: 'DNA_SUPERCOILING_ROTATION',
    dnaLengthBp: 20600, // 20.6 kbp construct (~7.0 µm)
    relaxedContourLengthMicrons: 7.0,
    pullingForcePn: 0.35,
    criticalBucklingTurns: 12,
    beadRadiusMicrons: 1.0,
    description: 'Single λ-DNA molecule under low pulling force (0.35 pN). Symmetrical hat-shaped rotation curve: positive and negative turns both cause buckling into plectonemic supercoils, shortening extension by ~52 nm/turn.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 12: Cấu trúc siêu xoắn ADN bậc 3; Vật lý 12: Chuyển động quay của nam châm và mômen từ tác dụng lên hạt thuận từ.'
  },
  {
    id: 'lambda_dna_supercoiling_30pn',
    name: 'Bacteriophage λ-DNA Asymmetric Denaturation & Bubble Melting (3.0 pN)',
    vietnameseName: 'Bất Đối Xứng Siêu Xoắn & Nóng Chảy Bong Bóng ADN (Lực Cao 3.0 pN)',
    experimentType: 'DNA_SUPERCOILING_ROTATION',
    dnaLengthBp: 20600,
    relaxedContourLengthMicrons: 7.0,
    pullingForcePn: 3.0,
    criticalBucklingTurns: 22,
    beadRadiusMicrons: 1.0,
    description: 'Under higher force (3.0 pN), rotation curve is highly asymmetric. Positive turns buckle into plectonemes, while negative turns untwist the double helix, forming denaturation bubbles with no loss of extension.',
    curriculumNotes: 'GDPT 2018 Sinh học 12: Cơ chế tách mạch ADN trong chạc sao chép và năng lượng liên kết hydro giữa các cặp bazơ nitơ.'
  },
  {
    id: 'topoisomerase_i_relaxation',
    name: 'Human Topoisomerase IB Real-time Swiveling Relaxation (ΔLk = +1)',
    vietnameseName: 'Enzyme Topoisomerase I Người Tháo Siêu Xoắn Từng Vòng Đơn (ΔLk = +1)',
    experimentType: 'TOPO_I_CATALYSIS',
    dnaLengthBp: 20600,
    relaxedContourLengthMicrons: 7.0,
    pullingForcePn: 0.45,
    criticalBucklingTurns: 12,
    catalyticStepDeltaLk: 1, // ΔLk = +1 per cycle
    beadRadiusMicrons: 1.0,
    description: 'Human Topoisomerase IB relaxing positive supercoils on a magnetically tethered DNA. Real-time extension increases in discrete single-strand swiveling steps of ΔLk = +1, restoring full DNA length.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 12: Vai trò của Topoisomerase I trong việc giải tỏa áp lực xoắn phía trước chạc nhân đôi ADN.'
  },
  {
    id: 'dna_gyrase_negative_supercoiling',
    name: 'E. coli DNA Gyrase ATP-Driven Negative Supercoiling (ΔLk = -2, Ciprofloxacin)',
    vietnameseName: 'ADN Gyrase Vi Khuẩn Tạo Siêu Xoắn Âm Phụ Thuộc ATP (ΔLk = -2 & Kháng Sinh Ciprofloxacin)',
    experimentType: 'GYRASE_NEGATIVE_SUPERCOILING',
    dnaLengthBp: 20600,
    relaxedContourLengthMicrons: 7.0,
    pullingForcePn: 0.5,
    criticalBucklingTurns: 14,
    catalyticStepDeltaLk: -2, // Type II introduces 2 negative supercoils per 2 ATP
    inhibitorDrug: 'Ciprofloxacin (Kháng sinh nhóm Fluoroquinolone)',
    beadRadiusMicrons: 1.0,
    description: 'Bacterial DNA Gyrase actively wraps DNA and hydrolyzes 2 ATP to introduce two negative supercoils (ΔLk = -2) per catalytic cycle against opposing mechanical torque. Inhibited by fluoroquinolone antibiotics.',
    curriculumNotes: 'GDPT 2018 Sinh học 12: Đột biến gen kháng kháng sinh và cơ chế ức chế chọn lọc enzym vi khuẩn của nhóm quinolone/fluoroquinolone.'
  },
  {
    id: 'topo_ii_alpha_decatenation',
    name: 'Human Topoisomerase IIα Double-Strand Passage (ΔLk = +2, Etoposide)',
    vietnameseName: 'Topoisomerase IIα Người Cắt Nối Sợi Kép Phân Giải Thắt Nút (ΔLk = +2 & Hóa Trị Etoposide)',
    experimentType: 'TOPO_II_DECATENATION',
    dnaLengthBp: 20600,
    relaxedContourLengthMicrons: 7.0,
    pullingForcePn: 0.6,
    criticalBucklingTurns: 15,
    catalyticStepDeltaLk: 2, // ΔLk = +2 per double-strand pass
    inhibitorDrug: 'Etoposide (Thuốc ức chế tháo xoắn trong điều trị ung thư)',
    beadRadiusMicrons: 1.0,
    description: 'Human Topo IIα catalyzes double-strand DNA cleavage and transport of a second duplex through the break, relaxing supercoils by ΔLk = +2. Chemotherapeutic poison Etoposide traps DNA breaks.',
    curriculumNotes: 'GDPT 2018 Sinh học 12: Phân chia tế bào nguyên phân, sự tháo rời nhiễm sắc thể kỳ sau và ứng dụng thuốc điều trị ung thư.'
  }
];

/**
 * Calculates constant pulling force from magnet height:
 * F(z) = F_0 * exp(-z_mag / z_0)
 * where F_0 ≈ 25 pN and z_0 ≈ 1.8 mm
 */
export function calculateMagneticForce(magnetHeightMm: number): number {
  const z = Math.max(0.5, Math.min(12, magnetHeightMm));
  const f = 25.0 * Math.exp(-z / 1.8);
  return Number(f.toFixed(2));
}

/**
 * Simulates Magnetic Tweezers Rotation Curve or Topoisomerase Enzymatic Stepping
 */
export function simulateMagneticTweezers(
  specimenId: string,
  magnetHeightMm: number = 4.2
): MagneticTweezersSimulationResult {
  const specimen = MAGNETIC_TWEEZERS_CATALOG.find((s) => s.id === specimenId) || MAGNETIC_TWEEZERS_CATALOG[0];
  const force = calculateMagneticForce(magnetHeightMm);

  const L0_microns = specimen.relaxedContourLengthMicrons;
  const bpCount = specimen.dnaLengthBp;
  const Lk0 = bpCount / DNA_BP_PER_TURN;

  // Max extension under force (approximated by WLC at this force)
  // At 0.35 pN, z_rel ≈ 0.54 * L0; at 3 pN, z_rel ≈ 0.77 * L0; at 10 pN, z_rel ≈ 0.90 * L0
  const forceExtRatio = Math.min(0.96, Math.max(0.45, 0.65 + 0.25 * Math.log10(Math.max(0.1, force))));
  const maxExtMicrons = Number((L0_microns * forceExtRatio).toFixed(3));

  // Generate Rotation Curve (-60 to +60 turns)
  const rotationCurve: MagneticTweezersRotationPoint[] = [];
  const minTurns = -60;
  const maxTurns = 60;
  const nc = specimen.criticalBucklingTurns;
  const plectonemeSlope = (PLECTONEME_CONTRACTION_PER_TURN_NM / 1000); // µm per turn (~0.052 µm)

  let plectonemeTurnsCount = 0;

  for (let n = minTurns; n <= maxTurns; n += 2) {
    const sigma = Number(((n * DNA_BP_PER_TURN) / bpCount).toFixed(4));
    let ext = maxExtMicrons;
    let state: 'TWIST_ELASTIC' | 'PLECTONEME_BUCKLING' | 'MELTED_BUBBLE' | 'P_DNA' = 'TWIST_ELASTIC';

    if (force < 1.0) {
      // Low force regime: symmetric buckling
      if (Math.abs(n) <= nc) {
        state = 'TWIST_ELASTIC';
        // Small parabolic shortening due to twist-bend coupling
        ext = maxExtMicrons - 0.0008 * Math.pow(n, 2);
      } else {
        state = 'PLECTONEME_BUCKLING';
        const plectoTurns = Math.abs(n) - nc;
        ext = Math.max(0.2, maxExtMicrons - 0.0008 * Math.pow(nc, 2) - plectoTurns * plectonemeSlope);
        plectonemeTurnsCount++;
      }
    } else {
      // High force regime: asymmetric buckling vs bubble melting
      if (n > 0) {
        if (n <= nc * 1.5) {
          state = 'TWIST_ELASTIC';
          ext = maxExtMicrons - 0.0004 * Math.pow(n, 2);
        } else {
          state = 'PLECTONEME_BUCKLING';
          const plectoTurns = n - nc * 1.5;
          ext = Math.max(0.3, maxExtMicrons - plectoTurns * (plectonemeSlope * 0.7));
          plectonemeTurnsCount++;
        }
      } else {
        // Negative turns at high force melt DNA duplex bubbles without extension loss!
        state = 'MELTED_BUBBLE';
        ext = Number((maxExtMicrons * (1 - 0.0005 * Math.abs(n))).toFixed(3));
      }
    }

    rotationCurve.push({
      turns: n,
      extensionMicrons: Number(ext.toFixed(3)),
      supercoilingDensitySigma: sigma,
      state
    });
  }

  // Topoisomerase Step Trace Simulation (Time 0 to 120 seconds)
  let topoisomeraseTrace: TopoisomeraseStepTracePoint[] | undefined;
  if (specimen.experimentType.includes('TOPO') || specimen.experimentType.includes('GYRASE')) {
    topoisomeraseTrace = [];
    const stepDeltaLk = specimen.catalyticStepDeltaLk || 1;
    let currentTurns = 30; // Initially supercoiled with 30 positive turns
    let currentExt = Math.max(0.5, maxExtMicrons - (currentTurns - nc) * plectonemeSlope);
    let cumulativeDeltaLk = 0;

    for (let t = 0; t <= 120; t += 2) {
      let stepDetected = false;
      // Enzyme catalytic event probability
      if (currentTurns > 0 && Math.random() < 0.28) {
        currentTurns -= Math.abs(stepDeltaLk);
        cumulativeDeltaLk += stepDeltaLk;
        stepDetected = true;
        currentExt = Math.min(
          maxExtMicrons,
          currentExt + Math.abs(stepDeltaLk) * plectonemeSlope * (0.95 + Math.random() * 0.1)
        );
      }

      const noise = (Math.random() - 0.5) * 0.015;
      topoisomeraseTrace.push({
        timeSec: t,
        extensionMicrons: Number((currentExt + noise).toFixed(3)),
        linkingNumberChange: cumulativeDeltaLk,
        stepDetected
      });
    }
  }

  return {
    specimen,
    magnetHeightMm,
    actualForcePn: force,
    maxExtensionMicrons: maxExtMicrons,
    rotationCurve,
    topoisomeraseTrace,
    plectonemeTurnsCount
  };
}

/**
 * Intelligent Card Matcher for Magnetic Tweezers Systems
 */
export function getMatchingMagneticTweezersCard(card: { id?: string; name?: string; category?: string }): MagneticTweezersSpecimenStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('gyrase') || target.includes('ciprofloxacin') || target.includes('quinolone') || target.includes('negative supercoil')) {
    return MAGNETIC_TWEEZERS_CATALOG.find((s) => s.id === 'dna_gyrase_negative_supercoiling') || null;
  }
  if (target.includes('topo ii') || target.includes('topoisomerase 2') || target.includes('etoposide') || target.includes('decatenation')) {
    return MAGNETIC_TWEEZERS_CATALOG.find((s) => s.id === 'topo_ii_alpha_decatenation') || null;
  }
  if (target.includes('topo') || target.includes('topoisomerase') || target.includes('swivel') || target.includes('relax')) {
    return MAGNETIC_TWEEZERS_CATALOG.find((s) => s.id === 'topoisomerase_i_relaxation') || null;
  }
  if (target.includes('denatur') || target.includes('bubble') || target.includes('melt') || target.includes('asymmetric')) {
    return MAGNETIC_TWEEZERS_CATALOG.find((s) => s.id === 'lambda_dna_supercoiling_30pn') || null;
  }
  if (target.includes('supercoil') || target.includes('plectoneme') || target.includes('twist') || target.includes('linking') || target.includes('writhe')) {
    return MAGNETIC_TWEEZERS_CATALOG.find((s) => s.id === 'lambda_dna_supercoiling_03pn') || null;
  }

  // Fallback
  if (target.includes('magnetic') || target.includes('magnet') || target.includes('bead') || target.includes('torque')) {
    return MAGNETIC_TWEEZERS_CATALOG[0];
  }

  return null;
}
