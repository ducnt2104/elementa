/**
 * ELEMENTA - Solid-State NMR (ssNMR), Magic-Angle Spinning (MAS) & Dipolar Coupling Engine
 *
 * Biophysical Foundations & Nobel Prize Standards:
 * - Nobel Prize in Physics 1952:
 *     Felix Bloch and Edward Mills Purcell
 *     "for their development of new methods for nuclear magnetic precision measurements and discoveries in connection therewith".
 * - Nobel Prize in Chemistry 1991:
 *     Richard R. Ernst
 *     "for his contributions to the development of the methodology of high-resolution nuclear magnetic resonance (NMR) spectroscopy".
 * - Nobel Prize in Chemistry 2002:
 *     Kurt Wüthrich
 *     "for his development of nuclear magnetic resonance spectroscopy for determining the three-dimensional structure of biological macromolecules in solution".
 * - Magic-Angle Spinning (MAS) (E. Raymond Andrew & I. J. Lowe, 1958-1959):
 *     - Anisotropic dipole-dipole Hamiltonian:
 *         H_D = - (μ₀/4π) * (γ_I * γ_S * ℏ / r³) * [ (3 cos²θ - 1) / 2 ] * (3 I_z S_z - I · S)
 *     - Second Legendre Polynomial:
 *         P₂(cos θ) = (3 cos²θ - 1) / 2
 *     - Magic Angle:
 *         θ_m = arccos(1 / √3) ≈ 54.7356° (54° 44' 08")
 *         P₂(cos θ_m) ≡ 0.
 *       Rapid sample rotation about θ_m averages dipolar broadening and Chemical Shift Anisotropy (CSA) to zero!
 *     - Spinning Sidebands:
 *         Appear at frequencies ν = ν_iso ± k · ν_R (where ν_R is MAS spinning rate in kHz).
 * - Cross-Polarization (CP-MAS) (Alex Pines, M. G. Gibby, John S. Waugh, 1973):
 *     - Hartmann-Hahn condition: γ_I * B_{1I} = γ_S * B_{1S} (ω_{1H} = ω_{1C})
 *     - Signal enhancement factor: η ≈ γ_H / γ_C ≈ 3.98 (or γ_H / γ_N ≈ 9.87)
 *     - CP kinetics: I(t) = I₀ * [ 1 / (1 - T_IS / T_{1ρH}) ] * [ exp(-t / T_{1ρH}) - exp(-t / T_IS) ]
 * - Applications:
 *     Insoluble amyloid fibrils (Alzheimer's Aβ42, Parkinson's α-Synuclein), membrane protein channels in intact lipid bilayers,
 *     bone hydroxyapatite/collagen, zeolite catalysts, and solid lithium battery electrolytes.
 * - Curriculum: Vietnam GDPT 2018 (Vật lý 12: Hiện tượng cộng hưởng từ hạt nhân NMR, mômen từ spin hạt nhân, bức xạ RF; Hóa học 10-12: Polyme, tinh thể vô cơ, màng sinh học).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 61)
 */

export const MAGIC_ANGLE_DEGREES = 54.7356; // arccos(1/√3) in degrees
export const PROTON_GYROMAGNETIC_RATIO = 267.522; // 10⁶ rad/(T·s)
export const CARBON13_GYROMAGNETIC_RATIO = 67.2828; // 10⁶ rad/(T·s)
export const NITROGEN15_GYROMAGNETIC_RATIO = -27.116; // 10⁶ rad/(T·s)
export const PHOSPHORUS31_GYROMAGNETIC_RATIO = 108.291; // 10⁶ rad/(T·s)

export interface NmrPeakDefinition {
  id: string;
  label: string;
  chemicalShiftPpm: number; // Isotropic shift δ_iso
  intensity: number;
  csaSpanPpm: number; // Chemical Shift Anisotropy span (Ω)
  asymmetryEta: number; // Asymmetry parameter η (0.0 to 1.0)
  assignment: string;
}

export interface SolidStateNmrSpecimen {
  id: string;
  name: string;
  vietnameseName: string;
  targetNucleus: '¹³C' | '¹⁵N' | '³¹P' | '²⁹Si' | '⁷Li';
  spectrometerFieldTesla: number; // e.g. 14.1 T (600 MHz ¹H) or 18.8 T (800 MHz ¹H)
  spectrometerBaseFreqMHz: number; // Base frequency for target nucleus
  optimalMasRateKHz: number; // e.g. 10 to 60 kHz
  optimalContactTimeMs: number; // e.g. 1.0 to 2.5 ms
  tIS_Ms: number; // Heteronuclear cross-polarization buildup time constant
  t1RhoH_Ms: number; // Proton rotating-frame relaxation time constant
  peaks: NmrPeakDefinition[];
  biologicalOrMaterialSignificance: string;
  curriculumNotes: string;
}

export interface NmrSpectrumDataPoint {
  ppm: number;
  staticIntensity: number; // Powder pattern with full dipolar/CSA broadening
  masIntensity: number; // Sharp isotropic peaks + spinning sidebands
}

export interface CrossPolarizationDataPoint {
  contactTimeMs: number;
  transferredPolarization: number; // Normalized 0.0 to 1.0
}

export interface SolidStateNmrSimulationResult {
  specimen: SolidStateNmrSpecimen;
  rotorAngleDegrees: number;
  masSpinRateKHz: number;
  contactTimeMs: number;
  p2Value: number; // (3 cos²θ - 1)/2
  isMagicAngleLocked: boolean; // within 0.1° of 54.74°
  hartmannHahnEnhancement: number; // ~3.98x for 13C
  apparentLinewidthHz: number;
  spectrum: NmrSpectrumDataPoint[];
  cpDynamics: CrossPolarizationDataPoint[];
}

export const SOLID_STATE_NMR_CATALOG: SolidStateNmrSpecimen[] = [
  {
    id: 'amyloid_beta_42',
    name: 'Amyloid-β (Aβ₁₋₄₂) Cross-β Fibrils (Alzheimer\'s)',
    vietnameseName: 'Sợi Amyloid-β (Aβ₁₋₄₂) Bệnh Alzheimer (Cấu trúc phiến gấp chéo β)',
    targetNucleus: '¹³C',
    spectrometerFieldTesla: 18.8, // 800 MHz
    spectrometerBaseFreqMHz: 201.2, // 13C frequency at 18.8 T
    optimalMasRateKHz: 20.0,
    optimalContactTimeMs: 1.5,
    tIS_Ms: 0.18,
    t1RhoH_Ms: 6.5,
    peaks: [
      { id: 'ala30_ca', label: 'Ala30 Cα', chemicalShiftPpm: 52.8, intensity: 0.95, csaSpanPpm: 45, asymmetryEta: 0.35, assignment: 'β-sheet core backbone' },
      { id: 'ala30_cb', label: 'Ala30 Cβ', chemicalShiftPpm: 17.5, intensity: 0.85, csaSpanPpm: 25, asymmetryEta: 0.20, assignment: 'Alanine methyl sidechain' },
      { id: 'val36_ca', label: 'Val36 Cα', chemicalShiftPpm: 61.5, intensity: 0.90, csaSpanPpm: 48, asymmetryEta: 0.40, assignment: 'Hydrophobic steric zipper' },
      { id: 'val36_cb', label: 'Val36 Cβ', chemicalShiftPpm: 32.0, intensity: 0.80, csaSpanPpm: 30, asymmetryEta: 0.25, assignment: 'Valine branched aliphatic' },
      { id: 'gly38_ca', label: 'Gly38 Cα', chemicalShiftPpm: 43.2, intensity: 0.75, csaSpanPpm: 40, asymmetryEta: 0.30, assignment: 'Turn region between β-strands' },
      { id: 'carbonyl_co', label: 'Backbone C=O', chemicalShiftPpm: 173.5, intensity: 1.00, csaSpanPpm: 130, asymmetryEta: 0.70, assignment: 'Inter-strand hydrogen bonding carbonyl' }
    ],
    biologicalOrMaterialSignificance: 'Pathological cross-β fibril aggregates in Alzheimer\'s disease. ssNMR directly elucidates atomic-resolution steric zipper packing and registered parallel in-register sheets without crystallization.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 12: Đột biến gấp cuộn protein bất thường, liên kết hydro liên chuỗi; Hóa học 12: Peptid và protein phi tinh thể.'
  },
  {
    id: 'influenza_m2_channel',
    name: 'Influenza A M2 Proton Channel in Lipid Bilayer',
    vietnameseName: 'Kênh dẫn Proton M2 Cúm A trong Màng Kép Phospholipid',
    targetNucleus: '¹³C',
    spectrometerFieldTesla: 14.1, // 600 MHz
    spectrometerBaseFreqMHz: 150.9,
    optimalMasRateKHz: 15.0,
    optimalContactTimeMs: 1.8,
    tIS_Ms: 0.22,
    t1RhoH_Ms: 5.8,
    peaks: [
      { id: 'his37_cd2', label: 'His37 Cδ2', chemicalShiftPpm: 118.2, intensity: 0.90, csaSpanPpm: 90, asymmetryEta: 0.60, assignment: 'Proton-sensor imidazole ring' },
      { id: 'his37_ce1', label: 'His37 Cε1', chemicalShiftPpm: 136.8, intensity: 0.85, csaSpanPpm: 95, asymmetryEta: 0.55, assignment: 'pH-dependent protonation site' },
      { id: 'trp41_ca', label: 'Trp41 Cα', chemicalShiftPpm: 56.4, intensity: 0.80, csaSpanPpm: 50, asymmetryEta: 0.35, assignment: 'Channel gating tryptophan plug' },
      { id: 'lipid_ch2', label: 'Lipid (CH₂)n', chemicalShiftPpm: 30.2, intensity: 1.00, csaSpanPpm: 25, asymmetryEta: 0.15, assignment: 'POPC/POPG bilayer hydrocarbon core' }
    ],
    biologicalOrMaterialSignificance: 'Tetrameric ion channel in intact native lipid vesicles. ssNMR revealed how histidine protonation triggers tryptophan gate opening for viral acidification.',
    curriculumNotes: 'Cấu trúc màng sinh học và cơ chế vận chuyển ion chủ động; đích tác động của thuốc kháng virus rimantadine, amantadine.'
  },
  {
    id: 'bone_hydroxyapatite',
    name: 'Bone Matrix Hydroxyapatite / Collagen Interface',
    vietnameseName: 'Chất Khoáng Xương Hydroxyapatite & Sợi Collagen Type-I',
    targetNucleus: '³¹P',
    spectrometerFieldTesla: 14.1,
    spectrometerBaseFreqMHz: 242.9,
    optimalMasRateKHz: 25.0,
    optimalContactTimeMs: 2.0,
    tIS_Ms: 0.35,
    t1RhoH_Ms: 8.0,
    peaks: [
      { id: 'bulk_po4', label: 'Crystalline PO₄³⁻', chemicalShiftPpm: 2.8, intensity: 1.00, csaSpanPpm: 75, asymmetryEta: 0.20, assignment: 'Core hydroxyapatite crystal lattice' },
      { id: 'surface_hpo4', label: 'Surface HPO₄²⁻', chemicalShiftPpm: 1.2, intensity: 0.45, csaSpanPpm: 85, asymmetryEta: 0.50, assignment: 'Amorphous hydrated mineral-collagen boundary' },
      { id: 'poly_phosphate', label: 'Interfacial PO₄', chemicalShiftPpm: 3.9, intensity: 0.30, csaSpanPpm: 70, asymmetryEta: 0.30, assignment: 'Divalent cation binding interface' }
    ],
    biologicalOrMaterialSignificance: 'Composite biomaterial of calcium phosphate Ca₁₀(PO₄)₆(OH)₂ nanocrystals embedded in collagen. ³¹P MAS NMR distinguishes crystalline core from disordered hydrated surface layer.',
    curriculumNotes: 'GDPT 2018 Hóa học 11 & 12: Muối photphat, hợp chất của Canxi; Sinh học 11: Mô liên kết xương và khoáng hóa sinh học.'
  },
  {
    id: 'zeolite_zsm5',
    name: 'Zeolite Catalyst ZSM-5 Framework (Si/Al Active Sites)',
    vietnameseName: 'Chất Xúc Tác Zeolit ZSM-5 (Tâm Axit Brønsted Khung Si/Al)',
    targetNucleus: '²⁹Si',
    spectrometerFieldTesla: 18.8,
    spectrometerBaseFreqMHz: 119.2,
    optimalMasRateKHz: 12.0,
    optimalContactTimeMs: 3.5,
    tIS_Ms: 0.50,
    t1RhoH_Ms: 12.0,
    peaks: [
      { id: 'si_0al', label: 'Si(4Si, 0Al)', chemicalShiftPpm: -112.5, intensity: 1.00, csaSpanPpm: 60, asymmetryEta: 0.30, assignment: 'Pure silica tetrahedral framework Q⁴(0Al)' },
      { id: 'si_1al', label: 'Si(3Si, 1Al)', chemicalShiftPpm: -106.2, intensity: 0.40, csaSpanPpm: 55, asymmetryEta: 0.45, assignment: 'Brønsted acid site proton donor Q⁴(1Al)' },
      { id: 'si_oh', label: 'Si(3Si, OH)', chemicalShiftPpm: -101.5, intensity: 0.15, csaSpanPpm: 65, asymmetryEta: 0.60, assignment: 'Defect framework silanol group Q³(OH)' }
    ],
    biologicalOrMaterialSignificance: 'MFI-type aluminosilicate molecular sieve widely utilized in catalytic hydrocarbon cracking and methanol-to-gasoline (MTG) synthesis. ²⁹Si MAS NMR quantifies Si/Al ratio and acid site distribution.',
    curriculumNotes: 'GDPT 2018 Hóa học 11: Hóa dầu và cracking hydrocacbon; Hóa học 10: Tốc độ phản ứng và chất xúc tác dị thể.'
  },
  {
    id: 'lgps_solid_electrolyte',
    name: 'Solid-State Battery Electrolyte (Li₁₀GeP₂S₁₂ - LGPS)',
    vietnameseName: 'Chất Điện Phân Pin Rắn Siêu Dẫn Ion (Li₁₀GeP₂S₁₂ - LGPS)',
    targetNucleus: '⁷Li',
    spectrometerFieldTesla: 14.1,
    spectrometerBaseFreqMHz: 233.2,
    optimalMasRateKHz: 30.0,
    optimalContactTimeMs: 0.8,
    tIS_Ms: 0.12,
    t1RhoH_Ms: 4.5,
    peaks: [
      { id: 'li_fast_channel', label: 'Li(1) 1D Fast Channel', chemicalShiftPpm: 1.25, intensity: 1.00, csaSpanPpm: 18, asymmetryEta: 0.20, assignment: 'c-axis continuous hopping conduction pathway' },
      { id: 'li_interchannel', label: 'Li(2) Inter-channel', chemicalShiftPpm: 0.65, intensity: 0.65, csaSpanPpm: 22, asymmetryEta: 0.40, assignment: 'Cross-diffusion connecting channels' },
      { id: 'li_framework', label: 'Li(3) Octahedral Site', chemicalShiftPpm: -0.15, intensity: 0.35, csaSpanPpm: 28, asymmetryEta: 0.50, assignment: 'Trapped lattice coordination site' }
    ],
    biologicalOrMaterialSignificance: 'Superionic solid electrolyte exhibiting room-temperature ionic conductivity comparable to liquid electrolytes (1.2 × 10⁻² S/cm). ⁷Li MAS NMR probes 1D fast-diffusion channels without dendrite formation.',
    curriculumNotes: 'GDPT 2018 Vật lý 12 & Hóa học 12: Năng lượng tái tạo, pin nhiên liệu và công nghệ lưu trữ năng lượng tương lai.'
  }
];

/**
 * Calculates Second Legendre Polynomial:
 * P₂(cos θ) = (3 cos²θ - 1) / 2
 */
export function calculateLegendreP2(thetaDegrees: number): number {
  const thetaRad = (thetaDegrees * Math.PI) / 180;
  const cosTheta = Math.cos(thetaRad);
  const p2 = 0.5 * (3 * Math.pow(cosTheta, 2) - 1);
  return Number(p2.toFixed(5));
}

/**
 * Calculates Cross-Polarization buildup and decay curve:
 * I(t) = I₀ * [ 1 / (1 - T_IS / T_{1ρH}) ] * [ exp(-t / T_{1ρH}) - exp(-t / T_IS) ]
 */
export function calculateCrossPolarizationDynamics(
  contactTimeMs: number,
  tIS_Ms: number,
  t1RhoH_Ms: number,
  i0: number = 1.0
): number {
  if (contactTimeMs <= 0) return 0;
  const ratio = tIS_Ms / t1RhoH_Ms;
  if (Math.abs(1 - ratio) < 1e-4) {
    return Number((i0 * (contactTimeMs / tIS_Ms) * Math.exp(-contactTimeMs / tIS_Ms)).toFixed(4));
  }
  const prefactor = 1.0 / (1.0 - ratio);
  const decayTerm = Math.exp(-contactTimeMs / t1RhoH_Ms);
  const buildupTerm = Math.exp(-contactTimeMs / tIS_Ms);
  const val = Math.max(0, i0 * prefactor * (decayTerm - buildupTerm));
  return Number(val.toFixed(4));
}

/**
 * Simulates a single powder CSA pattern component for static broad spectrum
 */
function staticPowderKernel(ppm: number, deltaIso: number, span: number, p2Factor: number): number {
  const halfSpan = (span / 2) * Math.max(0.08, Math.abs(p2Factor));
  const diff = ppm - deltaIso;
  if (Math.abs(diff) > halfSpan * 1.3) return 0;

  // Elliptic/asymmetric powder line profile
  const u = (diff + halfSpan) / (2 * halfSpan); // 0 to 1
  if (u <= 0 || u >= 1) return 0;
  const raw = 1 / Math.sqrt(Math.max(0.005, u * (1 - u)));
  return Math.min(3.5, raw);
}

/**
 * Simulates MAS spectrum with isotropic central band + spinning sidebands
 */
function masKernel(
  ppm: number,
  deltaIso: number,
  span: number,
  p2Factor: number,
  masRateKHz: number,
  baseFreqMHz: number
): number {
  // Convert MAS rate to ppm: Δppm = (ν_R / ν₀) * 1e3
  const sidebandSpacingPpm = (masRateKHz / baseFreqMHz) * 1e3;
  const effectiveSpan = span * Math.abs(p2Factor);
  const naturalLinewidthPpm = 0.35 + 0.65 * Math.abs(p2Factor); // narrows at magic angle

  let intensity = 0;

  // Central isotropic peak (k = 0)
  const diff0 = ppm - deltaIso;
  intensity += 1.2 * Math.exp(-Math.pow(diff0 / naturalLinewidthPpm, 2));

  // If spinning rate is slower than CSA span and p2 != 0, generate sidebands (k = ±1, ±2, ±3)
  if (effectiveSpan > sidebandSpacingPpm * 0.4 && sidebandSpacingPpm > 0.5) {
    for (let k = -4; k <= 4; k++) {
      if (k === 0) continue;
      const sbPos = deltaIso + k * sidebandSpacingPpm;
      const distFromCenter = Math.abs(k * sidebandSpacingPpm);
      if (distFromCenter > effectiveSpan * 1.4) continue;

      // Sideband intensity decays with distance and decreases as MAS rate increases
      const sbAmplitude = Math.exp(-distFromCenter / (effectiveSpan * 0.75 + 1)) * (effectiveSpan / (effectiveSpan + 2 * sidebandSpacingPpm));
      const diffSb = ppm - sbPos;
      intensity += sbAmplitude * Math.exp(-Math.pow(diffSb / naturalLinewidthPpm, 2));
    }
  }

  return intensity;
}

/**
 * Full Solid-State NMR Simulation Workflow
 */
export function simulateSolidStateNmr(
  specimenId: string,
  masSpinRateKHz: number = 20.0,
  rotorAngleDegrees: number = MAGIC_ANGLE_DEGREES,
  contactTimeMs: number = 1.5
): SolidStateNmrSimulationResult {
  const specimen = SOLID_STATE_NMR_CATALOG.find((s) => s.id === specimenId) || SOLID_STATE_NMR_CATALOG[0];

  const p2Value = calculateLegendreP2(rotorAngleDegrees);
  const isMagicAngleLocked = Math.abs(rotorAngleDegrees - MAGIC_ANGLE_DEGREES) < 0.15;

  // Hartmann-Hahn CP enhancement factor: ~3.98 for 13C, ~9.87 for 15N, ~2.47 for 31P
  let maxEnhancement = 3.98;
  if (specimen.targetNucleus === '¹⁵N') maxEnhancement = 9.87;
  if (specimen.targetNucleus === '³¹P') maxEnhancement = 2.47;
  if (specimen.targetNucleus === '²⁹Si') maxEnhancement = 5.03;
  if (specimen.targetNucleus === '⁷Li') maxEnhancement = 2.58;

  const cpFraction = calculateCrossPolarizationDynamics(
    contactTimeMs,
    specimen.tIS_Ms,
    specimen.t1RhoH_Ms
  );
  const hartmannHahnEnhancement = Number((1.0 + (maxEnhancement - 1.0) * cpFraction).toFixed(2));

  // Apparent linewidth: at static angle/powder ~1500 Hz, at magic angle drops to ~25-40 Hz
  const apparentLinewidthHz = Number(
    (30.0 + 1800.0 * Math.abs(p2Value) + (specimen.optimalMasRateKHz / Math.max(1, masSpinRateKHz)) * 20.0).toFixed(1)
  );

  // Determine PPM range covering all peaks and their sidebands/CSA
  let minPpm = 999;
  let maxPpm = -999;
  specimen.peaks.forEach((pk) => {
    const lo = pk.chemicalShiftPpm - pk.csaSpanPpm * 0.7;
    const hi = pk.chemicalShiftPpm + pk.csaSpanPpm * 0.7;
    if (lo < minPpm) minPpm = lo;
    if (hi > maxPpm) maxPpm = hi;
  });
  const spanTotal = maxPpm - minPpm;
  const plotMinPpm = Math.floor(minPpm - spanTotal * 0.20);
  const plotMaxPpm = Math.ceil(maxPpm + spanTotal * 0.20);

  // Generate 250 spectral data points
  const pointsCount = 250;
  const spectrum: NmrSpectrumDataPoint[] = [];

  for (let i = 0; i < pointsCount; i++) {
    const ppm = Number((plotMinPpm + (plotMaxPpm - plotMinPpm) * (i / (pointsCount - 1))).toFixed(2));
    let staticSum = 0;
    let masSum = 0;

    for (const pk of specimen.peaks) {
      // Static broad powder pattern (p2 = 1.0 representing completely un-spun solid)
      const st = staticPowderKernel(ppm, pk.chemicalShiftPpm, pk.csaSpanPpm, 1.0);
      staticSum += pk.intensity * st;

      // MAS spectrum with current rotor angle and spinning speed
      const ms = masKernel(
        ppm,
        pk.chemicalShiftPpm,
        pk.csaSpanPpm,
        p2Value,
        masSpinRateKHz,
        specimen.spectrometerBaseFreqMHz
      );
      masSum += pk.intensity * ms;
    }

    // Baseline noise + CP amplification
    const baseNoise = 0.02 * Math.sin(i * 1.5);
    const scaledMas = Math.max(0, (masSum * (hartmannHahnEnhancement / maxEnhancement) + baseNoise));
    const scaledStatic = Math.max(0, (staticSum * 0.35 + baseNoise));

    spectrum.push({
      ppm,
      staticIntensity: Number(scaledStatic.toFixed(4)),
      masIntensity: Number(scaledMas.toFixed(4))
    });
  }

  // Generate Cross-Polarization Dynamics curve from 0 to 10 ms
  const cpDynamics: CrossPolarizationDataPoint[] = [];
  for (let step = 0; step <= 50; step++) {
    const t = Number((step * 0.2).toFixed(2)); // 0.0 to 10.0 ms
    const trans = calculateCrossPolarizationDynamics(t, specimen.tIS_Ms, specimen.t1RhoH_Ms);
    cpDynamics.push({
      contactTimeMs: t,
      transferredPolarization: trans
    });
  }

  return {
    specimen,
    rotorAngleDegrees,
    masSpinRateKHz,
    contactTimeMs,
    p2Value,
    isMagicAngleLocked,
    hartmannHahnEnhancement,
    apparentLinewidthHz,
    spectrum,
    cpDynamics
  };
}

/**
 * Intelligent Card Matcher for Solid-State NMR Macromolecules & Materials
 */
export function getMatchingSolidStateNmrCard(card: { id?: string; name?: string; category?: string }): SolidStateNmrSpecimen | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('amyloid') || target.includes('alzheimer') || target.includes('fibril') || target.includes('plaque') || target.includes('tau')) {
    return SOLID_STATE_NMR_CATALOG.find((s) => s.id === 'amyloid_beta_42') || null;
  }
  if (target.includes('influenza') || target.includes('m2') || target.includes('bilayer') || target.includes('lipid') || target.includes('channel')) {
    return SOLID_STATE_NMR_CATALOG.find((s) => s.id === 'influenza_m2_channel') || null;
  }
  if (target.includes('bone') || target.includes('hydroxyapatite') || target.includes('tooth') || target.includes('calcium') || target.includes('phosphate') || target.includes('collagen')) {
    return SOLID_STATE_NMR_CATALOG.find((s) => s.id === 'bone_hydroxyapatite') || null;
  }
  if (target.includes('zeolite') || target.includes('zsm') || target.includes('catalyst') || target.includes('silica') || target.includes('aluminate')) {
    return SOLID_STATE_NMR_CATALOG.find((s) => s.id === 'zeolite_zsm5') || null;
  }
  if (target.includes('battery') || target.includes('solid_electrolyte') || target.includes('lithium') || target.includes('lgps') || target.includes('electrolyte')) {
    return SOLID_STATE_NMR_CATALOG.find((s) => s.id === 'lgps_solid_electrolyte') || null;
  }

  // General fallbacks
  if (target.includes('solid') || target.includes('crystal') || target.includes('nmr') || target.includes('polymer')) {
    return SOLID_STATE_NMR_CATALOG[0]; // Default to Amyloid-β
  }

  return null;
}
