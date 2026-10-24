/**
 * ELEMENTA - Optical Tweezers, Photonic Momentum & Single-Molecule Force Spectroscopy Engine
 *
 * Biophysical Foundations & Nobel Prize Standards:
 * - Nobel Prize in Physics 2018:
 *     Arthur Ashkin
 *     "for the optical tweezers and their application to biological systems".
 * - Optical Trapping Physics (Arthur Ashkin, 1970-1986):
 *     - Photonic momentum transfer: p = ℏk = h / λ
 *     - Highly focused laser beam (λ = 1064 nm, NA ≥ 1.2 oil immersion objective) creates:
 *         1. Scattering Force F_scat: pushes dielectric bead along laser propagation direction (+z).
 *         2. Gradient Force F_grad: pulls dielectric bead towards maximum light intensity gradient (∇|E|²).
 *     - Stable 3D optical trap forms when F_grad > F_scat.
 *     - Harmonic Hookean potential for small displacements:
 *         F_trap = - κ_trap · Δx
 *         where κ_trap is trap stiffness (0.05 - 0.5 pN/nm) proportional to laser power P_laser.
 * - Marko-Siggia Worm-Like Chain (WLC) Model for DNA Elasticity (1995):
 *     - Force-extension relationship:
 *         F(x) = (k_B T / P) * [ 1 / (4(1 - x/L₀)²) - 1/4 + x/L₀ ]
 *         where k_B T = 4.114 pN·nm at 25°C, P = 50 nm (persistence length), L₀ is contour length.
 *     - At F ≈ 65 pN, B-DNA undergoes cooperative overstretching transition into S-DNA (L -> 1.7 L₀).
 * - Molecular Motor Stepping (Kinesin-1, Svoboda & Block 1993):
 *     - Hand-over-hand 8.2 nm steps along microtubule protofilaments (matching α/β tubulin dimer spacing).
 *     - Isometric stall force: F_stall ≈ 6.0 pN.
 * - Polyprotein Mechanical Unfolding (Titin Ig27 domains):
 *     - Sequential saw-tooth force peaks at F ≈ 200 pN with contour length gain ΔL_c ≈ 28.4 nm per domain.
 * - Curriculum: Vietnam GDPT 2018 (Vật lý 12: Động lượng photon, áp suất ánh sáng, thế năng đàn hồi; Sinh học 10-12: Cấu trúc cơ học ADN, động cơ phân tử ATP, sự co cơ).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 65)
 */

export const BOLTZMANN_KT_PN_NM = 4.114; // k_B * T at 298.15 K (pN·nm)
export const LASER_TRAP_WAVELENGTH_NM = 1064.0; // Nd:YAG / Fiber laser

export interface OpticalTweezersDataPoint {
  extensionNm: number; // Molecular extension x in nm
  forcePicoNewtons: number; // Measured restoring force in pN
  trapPositionNm: number; // Stage / trap position
  theoreticalWlcForcePn: number; // Marko-Siggia WLC model fit
}

export interface SteppingTracePoint {
  timeMs: number; // Time in milliseconds (0 to 1000 ms)
  beadPositionNm: number; // Position showing discrete 8.2 nm steps
  appliedForcePn: number; // Piconewtons against load
}

export interface OpticalTweezersSpecimenStandard {
  id: string;
  name: string;
  vietnameseName: string;
  experimentType: 'WLC_DNA_ELASTICITY' | 'MOLECULAR_MOTOR_STEPPING' | 'TITIN_POLYPROTEIN_UNFOLDING' | 'RNA_HAIRPIN_UNZIPPING' | 'FLAGELLAR_MOTOR_ROTATION';
  contourLengthNm: number; // L₀ in nm
  persistenceLengthNm: number; // P in nm (50 nm for dsDNA, 1.5 nm for ssDNA, 0.4 nm for unfolded polypeptide)
  overstretchingForcePn?: number; // 65 pN for B-S transition
  stepSizeNm?: number; // 8.2 nm for kinesin
  stallForcePn?: number; // 6.0 pN for kinesin
  unfoldingForcePn?: number; // 200 pN for Titin Ig27
  beadRadiusMicrons: number; // e.g. 0.5 - 1.0 µm
  description: string;
  curriculumNotes: string;
}

export interface OpticalTweezersSimulationResult {
  specimen: OpticalTweezersSpecimenStandard;
  laserPowerMilliWatts: number;
  trapStiffnessPnPerNm: number; // κ_trap
  maxForcePn: number;
  isStalledOrOverstretched: boolean;
  dataPoints: OpticalTweezersDataPoint[];
  steppingTrace?: SteppingTracePoint[];
}

export const OPTICAL_TWEEZERS_CATALOG: OpticalTweezersSpecimenStandard[] = [
  {
    id: 'lambda_dna_wlc',
    name: 'Bacteriophage λ-DNA Single-Molecule Elasticity & Overstretching',
    vietnameseName: 'Độ Đàn Hồi Đơn Phân Tử & Kéo Giãn ADN Thực Khuẩn Thể Lambda (WLC)',
    experimentType: 'WLC_DNA_ELASTICITY',
    contourLengthNm: 16400, // 48.5 kbp × 0.34 nm/bp = 16.4 µm
    persistenceLengthNm: 50.0, // 50 nm persistence length
    overstretchingForcePn: 65.0, // Classical 65 pN cooperative plateau
    beadRadiusMicrons: 1.0,
    description: 'Double-stranded λ-DNA tethered between two optical traps. Low force reveals entropic spring behavior governed by Marko-Siggia WLC, transitioning at 65 pN into an overstretched S-DNA plateau elongating by 70%.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 12: Cấu trúc cơ học chuỗi xoắn kép ADN; Vật lý 12: Động lượng ánh sáng và áp suất bức xạ photon.'
  },
  {
    id: 'kinesin_microtubule_steps',
    name: 'Kinesin-1 Molecular Motor 8.2 nm Hand-over-Hand Stepping',
    vietnameseName: 'Động Cơ Phân Tử Kinesin-1 Đi Bước 8.2 nm Trên Vi Ống (Lực Cản 6 pN)',
    experimentType: 'MOLECULAR_MOTOR_STEPPING',
    contourLengthNm: 500,
    persistenceLengthNm: 20.0,
    stepSizeNm: 8.2, // Tubulin dimer periodicity
    stallForcePn: 6.0, // Stall force
    beadRadiusMicrons: 0.5,
    description: 'Single Kinesin-1 motor stepping processively along microtubule under opposing optical load. Resolves individual 8.2 nm mechanical steps coupling 1 ATP hydrolysis per step until reaching 6.0 pN stall force.',
    curriculumNotes: 'GDPT 2018 Sinh học 10: Vận chuyển nội bào dọc thoi vô sắc và vi ống; Vật lý 12: Thế năng đàn hồi và lực cơ học piconewton.'
  },
  {
    id: 'titin_ig27_octamer',
    name: 'Titin (Ig27)₈ Octamer Polyprotein Saw-Tooth Mechanical Unfolding',
    vietnameseName: 'Kéo Giãn Đa Protein Cơ Titin (Ig27)₈ (Đồ Thị Răng Cưa 200 pN)',
    experimentType: 'TITIN_POLYPROTEIN_UNFOLDING',
    contourLengthNm: 250,
    persistenceLengthNm: 0.4, // Polypeptide persistence length
    unfoldingForcePn: 200.0, // Unfolding force threshold
    beadRadiusMicrons: 0.75,
    description: 'Giant muscle protein Titin Ig27 octamer pulled mechanically. Successive domain unraveling generates an iconic saw-tooth force-extension fingerprint with ΔL_c ≈ 28.4 nm released per unfolded domain.',
    curriculumNotes: 'GDPT 2018 Sinh học 11: Sinh lý cơ bắp và tính đàn hồi của sợi cơ vân; Hóa học 12: Cấu trúc bậc 3 và bậc 4 của protein.'
  },
  {
    id: 'rna_pseudoknot_unzip',
    name: 'Viral RNA Pseudoknot Single-Molecule Mechanical Unzipping',
    vietnameseName: 'Tháo Xoắn Đơn Phân Tử Nút Giả RNA Virus (Lực Tách Base 14.5 pN)',
    experimentType: 'RNA_HAIRPIN_UNZIPPING',
    contourLengthNm: 85,
    persistenceLengthNm: 1.2,
    unfoldingForcePn: 14.5,
    beadRadiusMicrons: 0.5,
    description: 'Mechanical unzipping of viral ribosomal frameshifting RNA pseudoknot. Optical tweezers pull duplex stems apart at 14.5 pN, revealing thermodynamic barriers governing viral translation.',
    curriculumNotes: 'GDPT 2018 Sinh học 12: Cấu trúc ARN mạch đơn và cơ chế dịch mã dịch khung ribosome của retrovirus.'
  },
  {
    id: 'flagellar_motor_torque',
    name: 'Bacterial Flagellar Rotary Motor Nanoscale Stepping Torque',
    vietnameseName: 'Động Cơ Quay Roi Vi Khuẩn (Torque 4000 pN·nm & Góc Bước 14°)',
    experimentType: 'FLAGELLAR_MOTOR_ROTATION',
    contourLengthNm: 120,
    persistenceLengthNm: 30.0,
    stallForcePn: 4.5,
    beadRadiusMicrons: 0.8,
    description: 'Proton-motive force driven bacterial flagellar motor rotating a tethered bead. Measures torque generation and discrete 26-step revolution cycle against optical trap resistance.',
    curriculumNotes: 'GDPT 2018 Sinh học 10: Cấu tạo vi khuẩn, lông và roi bơi; Vật lý 12: Momen lực và chuyển động quay quanh trục cố định.'
  }
];

/**
 * Calculates Marko-Siggia Worm-Like Chain (WLC) force:
 * F(x) = (k_B T / P) * [ 1 / (4(1 - x/L₀)²) - 1/4 + x/L₀ ]
 */
export function calculateMarkoSiggiaForce(
  extensionNm: number,
  contourLengthNm: number,
  persistenceLengthNm: number = 50.0
): number {
  if (extensionNm <= 0 || contourLengthNm <= 0) return 0;
  const z = Math.min(0.965, extensionNm / contourLengthNm);
  const term1 = 1.0 / (4.0 * Math.pow(1.0 - z, 2));
  const term2 = -0.25;
  const term3 = z;
  const f = (BOLTZMANN_KT_PN_NM / persistenceLengthNm) * (term1 + term2 + term3);
  return Number(f.toFixed(2));
}

/**
 * Calculates optical trap stiffness from laser power:
 * κ_trap ≈ 0.0025 * P_laser (mW) -> e.g. 100 mW gives 0.25 pN/nm
 */
export function calculateTrapStiffness(laserPowerMilliWatts: number): number {
  return Number((Math.max(10, laserPowerMilliWatts) * 0.0025).toFixed(4));
}

/**
 * Simulates Optical Tweezers Force-Extension or Stepping Workflow
 */
export function simulateOpticalTweezers(
  specimenId: string,
  laserPowerMilliWatts: number = 100.0
): OpticalTweezersSimulationResult {
  const specimen = OPTICAL_TWEEZERS_CATALOG.find((s) => s.id === specimenId) || OPTICAL_TWEEZERS_CATALOG[0];
  const kappa = calculateTrapStiffness(laserPowerMilliWatts);

  const pointsCount = 120;
  const dataPoints: OpticalTweezersDataPoint[] = [];

  let isStalledOrOverstretched = false;
  let maxForcePn = 0;

  if (specimen.experimentType === 'WLC_DNA_ELASTICITY') {
    // Single-molecule DNA stretching with 65 pN overstretching plateau
    const L0 = 1000; // Normalized 1 µm segment for clear visual scaling
    const P = specimen.persistenceLengthNm;

    for (let i = 0; i <= pointsCount; i++) {
      const frac = (i / pointsCount) * 1.65; // Pull up to 1.65 × L₀
      const extNm = Number((frac * L0).toFixed(1));

      let forcePn = 0;
      let wlcTheor = 0;

      if (frac < 0.96) {
        forcePn = calculateMarkoSiggiaForce(extNm, L0, P);
        wlcTheor = forcePn;
      } else if (frac < 1.60) {
        // Overstretching plateau near 65 pN
        forcePn = Number((65.0 + 3.5 * Math.sin((frac - 0.96) * 8)).toFixed(2));
        wlcTheor = calculateMarkoSiggiaForce(Math.min(960, extNm), L0, P);
        isStalledOrOverstretched = true;
      } else {
        // S-DNA enthalpic stretch
        forcePn = Number((72.0 + (frac - 1.60) * 220).toFixed(2));
        wlcTheor = 70.0;
      }

      const noise = (Math.sin(i * 7.1) + Math.cos(i * 3.3)) * 0.45;
      const rawForce = Number(Math.max(0, forcePn + noise).toFixed(2));
      const trapPos = Number((extNm + rawForce / kappa).toFixed(1));

      if (rawForce > maxForcePn) maxForcePn = rawForce;

      dataPoints.push({
        extensionNm: extNm,
        forcePicoNewtons: rawForce,
        trapPositionNm: trapPos,
        theoreticalWlcForcePn: wlcTheor
      });
    }
  } else if (specimen.experimentType === 'TITIN_POLYPROTEIN_UNFOLDING') {
    // Saw-tooth mechanical unfolding of 8 tandem Ig27 domains
    const domainsCount = 8;
    const deltaLcNm = 28.4; // 28.4 nm per domain
    const totalPullNm = domainsCount * deltaLcNm + 80;

    for (let i = 0; i <= pointsCount; i++) {
      const extNm = Number(((totalPullNm * i) / pointsCount).toFixed(1));
      const domainIndex = Math.min(domainsCount - 1, Math.floor(extNm / deltaLcNm));
      const domainExtension = extNm - domainIndex * deltaLcNm;

      // Each domain builds up force to ~200 pN then snaps back
      const normExt = Math.min(0.92, domainExtension / deltaLcNm);
      const wlcPeak = (BOLTZMANN_KT_PN_NM / 0.4) * (1 / (4 * Math.pow(1 - normExt, 2)) - 0.25 + normExt);
      const forcePn = Number((Math.min(210.0, wlcPeak * 1.8)).toFixed(2));

      const rawForce = Math.max(2.0, forcePn + Math.sin(i * 5.2) * 2.5);
      if (rawForce > maxForcePn) maxForcePn = rawForce;

      dataPoints.push({
        extensionNm: extNm,
        forcePicoNewtons: Number(rawForce.toFixed(2)),
        trapPositionNm: Number((extNm + rawForce / kappa).toFixed(1)),
        theoreticalWlcForcePn: forcePn
      });
    }
  } else {
    // General force curve
    for (let i = 0; i <= pointsCount; i++) {
      const ext = Number(((specimen.contourLengthNm * i) / pointsCount).toFixed(1));
      const f = calculateMarkoSiggiaForce(ext, specimen.contourLengthNm, specimen.persistenceLengthNm);
      if (f > maxForcePn) maxForcePn = f;

      dataPoints.push({
        extensionNm: ext,
        forcePicoNewtons: f,
        trapPositionNm: Number((ext + f / kappa).toFixed(1)),
        theoreticalWlcForcePn: f
      });
    }
  }

  // Stepping Trace for Kinesin Motor Simulation (Time 0 to 1000 ms)
  let steppingTrace: SteppingTracePoint[] | undefined;
  if (specimen.experimentType === 'MOLECULAR_MOTOR_STEPPING') {
    steppingTrace = [];
    let curStep = 0;
    const stepSize = specimen.stepSizeNm || 8.2;
    const stallF = specimen.stallForcePn || 6.0;

    for (let t = 0; t <= 1000; t += 10) {
      // Step occurs every ~120 ms under light load, slowing down near stall
      const stepProb = Math.max(0.02, 0.15 * (1 - (curStep * stepSize * 0.05) / stallF));
      if (Math.random() < stepProb && curStep < 8) {
        curStep++;
      }
      const beadPos = Number((curStep * stepSize + (Math.random() - 0.5) * 1.2).toFixed(2));
      const forceAgainstLoad = Number((beadPos * kappa).toFixed(2));

      steppingTrace.push({
        timeMs: t,
        beadPositionNm: beadPos,
        appliedForcePn: forceAgainstLoad
      });
    }
  }

  return {
    specimen,
    laserPowerMilliWatts,
    trapStiffnessPnPerNm: kappa,
    maxForcePn: Number(maxForcePn.toFixed(2)),
    isStalledOrOverstretched,
    dataPoints,
    steppingTrace
  };
}

/**
 * Intelligent Card Matcher for Optical Tweezers Single-Molecule Systems
 */
export function getMatchingOpticalTweezersCard(card: { id?: string; name?: string; category?: string }): OpticalTweezersSpecimenStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('dna') || target.includes('wlc') || target.includes('lambda') || target.includes('overstretch') || target.includes('helix')) {
    return OPTICAL_TWEEZERS_CATALOG.find((s) => s.id === 'lambda_dna_wlc') || null;
  }
  if (target.includes('kinesin') || target.includes('motor') || target.includes('microtubule') || target.includes('step') || target.includes('atp')) {
    return OPTICAL_TWEEZERS_CATALOG.find((s) => s.id === 'kinesin_microtubule_steps') || null;
  }
  if (target.includes('titin') || target.includes('muscle') || target.includes('sawtooth') || target.includes('unfold') || target.includes('ig27')) {
    return OPTICAL_TWEEZERS_CATALOG.find((s) => s.id === 'titin_ig27_octamer') || null;
  }
  if (target.includes('rna') || target.includes('pseudoknot') || target.includes('unzip') || target.includes('hairpin')) {
    return OPTICAL_TWEEZERS_CATALOG.find((s) => s.id === 'rna_pseudoknot_unzip') || null;
  }
  if (target.includes('flagellar') || target.includes('bacteria') || target.includes('torque') || target.includes('rotary')) {
    return OPTICAL_TWEEZERS_CATALOG.find((s) => s.id === 'flagellar_motor_torque') || null;
  }

  // Fallback
  if (target.includes('laser') || target.includes('force') || target.includes('single') || target.includes('pico')) {
    return OPTICAL_TWEEZERS_CATALOG[0]; // Default to Lambda DNA
  }

  return null;
}
