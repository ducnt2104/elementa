/**
 * ELEMENTA - Small-Angle X-Ray Scattering (SAXS), Guinier Radius of Gyration & Kratky Plot Engine
 *
 * Biophysical Foundations & Synchrotron Standards:
 * - Nobel Prize in Chemistry 1936 (Peter Debye - Molecular structures & dipole moments; Debye scattering equation)
 * - André Guinier (1939 - Guinier Law for small-angle particulate scattering):
 *     ln I(q) ≈ ln I(0) - (R_g² / 3) * q²   for q·R_g ≤ 1.3
 *     where q = (4π / λ) * sin(θ / 2) is the momentum transfer vector.
 * - Kratky Plot Representation:
 *     q²·I(q) versus q serves as the universal structural diagnostic:
 *     - Compact globular proteins: Distinct bell-shaped peak decaying to zero at high q (Porod regime I(q) ~ q⁻⁴).
 *     - Intrinsically Disordered Proteins (IDPs): Monotonically rising / plateauing curve (Debye Gaussian coil I(q) ~ q⁻²).
 *     - Multi-domain flexible assemblies: Extended asymmetric double-peak or elevated shoulder.
 * - Pair Distance Distribution Function P(r) (Indirect Fourier Transform):
 *     P(r) = (r / 2π²) * ∫ q * I(q) * sin(q * r) dq   for 0 ≤ r ≤ D_max
 * - Molecular Weight Determination:
 *     M_w(sample) = M_w(std) * (I(0)_sample / c_sample) / (I(0)_std / c_std)
 * - Curriculum: Vietnam GDPT 2018 (Vật lý 12: Nhiễu xạ và tán xạ tia X, cấu trúc tinh thể & vô định hình; Hóa học 12: Hình thể không gian protein bậc III, IV).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 59)
 */

export interface SaxsDataPoint {
  q: number; // Å⁻¹ (0.006 to 0.40)
  intensity: number; // I(q) in arbitrary units / cm⁻¹
  logIntensity: number; // ln I(q)
  qSquared: number; // q² in Å⁻²
  kratky: number; // q² * I(q) in Å⁻²·a.u.
}

export interface SaxsPairDistancePoint {
  r: number; // Å (0 to D_max)
  pr: number; // P(r) pair distance distribution probability
}

export interface SaxsGuinierAnalysis {
  qMin: number;
  qMax: number;
  qRgMax: number; // Must be ≤ 1.3 for valid Guinier regime
  slope: number;
  intercept: number;
  rgAngstroms: number;
  rgNanometers: number;
  i0: number;
  rSquared: number; // Correlation coefficient (ideally > 0.995)
  aggregationWarning: boolean;
}

export interface SaxsProteinStandard {
  id: string;
  name: string;
  vietnameseName: string;
  category: 'globular_compact' | 'globular_elongated' | 'intrinsically_disordered' | 'multidomain_flexible' | 'hollow_spherical_shell';
  molecularWeightKDa: number;
  theoreticalRgAngstroms: number;
  dMaxAngstroms: number;
  i0Normalized: number;
  biologicalDescription: string;
  curriculumNotes: string;
}

export interface SaxsSimulationResult {
  protein: SaxsProteinStandard;
  concentrationMgMl: number;
  aggregationFraction: number; // 0.0 to 0.10 (simulates oligomerization / aggregation)
  scatteringCurve: SaxsDataPoint[];
  pairDistanceCurve: SaxsPairDistancePoint[];
  guinier: SaxsGuinierAnalysis;
  estimatedMwKDa: number;
}

export const SAXS_PROTEIN_CATALOG: SaxsProteinStandard[] = [
  {
    id: 'bsa_monomer',
    name: 'Bovine Serum Albumin (BSA Monomer)',
    vietnameseName: 'Albumin huyết thanh bò (BSA Đơn phân)',
    category: 'globular_elongated',
    molecularWeightKDa: 66.4,
    theoreticalRgAngstroms: 29.8, // 2.98 nm
    dMaxAngstroms: 98.0, // 9.8 nm
    i0Normalized: 48.5,
    biologicalDescription: 'Heart-shaped triangular globular plasma protein with slight axial elongation.',
    curriculumNotes: 'Mẫu chuẩn phổ biến nhất trong SAXS; dạng cầu kéo dài với đỉnh Kratky rõ nét tại q ≈ 0.06 Å⁻¹.'
  },
  {
    id: 'lysozyme',
    name: 'Hen Egg White Lysozyme (HEWL)',
    vietnameseName: 'Lysozyme lòng trắng trứng (HEWL)',
    category: 'globular_compact',
    molecularWeightKDa: 14.3,
    theoreticalRgAngstroms: 14.3, // 1.43 nm
    dMaxAngstroms: 45.0, // 4.5 nm
    i0Normalized: 10.5,
    biologicalDescription: 'Highly compact, rigid ellipsoidal hydrolase enzyme with tight globular core.',
    curriculumNotes: 'Đỉnh Kratky nhọn dạng hình chuông kinh điển suy giảm mạnh về 0 ở góc lớn (tuân theo định luật Porod q⁻⁴).'
  },
  {
    id: 'alpha_synuclein_idp',
    name: 'α-Synuclein (Parkinson IDP Monomer)',
    vietnameseName: 'α-Synuclein (Protein nội tại bất trật tự IDP)',
    category: 'intrinsically_disordered',
    molecularWeightKDa: 14.5,
    theoreticalRgAngstroms: 40.5, // 4.05 nm (vastly expanded for 14.5 kDa!)
    dMaxAngstroms: 152.0, // 15.2 nm
    i0Normalized: 10.6,
    biologicalDescription: 'Intrinsically disordered chain adopting dynamic random coil ensembles in solution.',
    curriculumNotes: 'Đồ thị Kratky tăng đơn điệu không có đỉnh chuông (mô hình cuộn ngẫu nhiên Gauss Debye I ~ q⁻²).'
  },
  {
    id: 'igg_antibody',
    name: 'Human Immunoglobulin G (IgG1 mAb)',
    vietnameseName: 'Kháng thể đơn dòng IgG1 (Khối Y ba nhánh)',
    category: 'multidomain_flexible',
    molecularWeightKDa: 150.0,
    theoreticalRgAngstroms: 51.2, // 5.12 nm
    dMaxAngstroms: 165.0, // 16.5 nm
    i0Normalized: 110.0,
    biologicalDescription: 'Y-shaped multi-domain glycoprotein with flexible hinge region linking Fab and Fc domains.',
    curriculumNotes: 'Đồ thị Kratky có vai rộng hoặc hai đỉnh phản ánh cấu trúc đa miền nối bởi bản lề linh động.'
  },
  {
    id: 'apoferritin',
    name: 'Horse Spleen Apoferritin (24-mer Nanocage)',
    vietnameseName: 'Apoferritin lồng nano (Phức hợp 24 tiểu phần)',
    category: 'hollow_spherical_shell',
    molecularWeightKDa: 480.0,
    theoreticalRgAngstroms: 52.5, // 5.25 nm
    dMaxAngstroms: 128.0, // 12.8 nm
    i0Normalized: 350.0,
    biologicalDescription: 'Hollow spherical protein cage (outer diameter ~12 nm, inner iron-storage cavity ~8 nm).',
    curriculumNotes: 'Đường cong SAXS thể hiện các cực tiểu dao động Bessel rõ rệt do cấu trúc vỏ cầu rỗng chứa sắt.'
  }
];

// Standard experimental q range for laboratory & synchrotron SAXS
export const SAXS_Q_POINTS = Array.from({ length: 80 }, (_, i) => {
  // Logarithmic / power spacing from 0.008 to 0.35 Å⁻¹
  const frac = i / 79;
  return Number((0.008 + 0.342 * Math.pow(frac, 1.25)).toFixed(4));
});

/**
 * Computes Debye random coil scattering intensity for an ideal flexible polymer chain
 */
export function calculateDebyeChainIntensity(q: number, rg: number, i0: number): number {
  const u = Math.pow(q * rg, 2);
  if (u < 1e-4) return i0 * (1 - u / 3);
  return (2 * i0 * (Math.exp(-u) + u - 1)) / (u * u);
}

/**
 * Computes hollow spherical shell scattering amplitude (Apoferritin nanocage)
 */
export function calculateHollowShellIntensity(
  q: number,
  rOuter: number,
  rInner: number,
  i0: number
): number {
  if (q < 0.001) {
    const rgSq = (3 / 5) * (Math.pow(rOuter, 5) - Math.pow(rInner, 5)) / (Math.pow(rOuter, 3) - Math.pow(rInner, 3));
    return i0 * (1 - rgSq * Math.pow(q, 2) / 3);
  }
  const qr2 = q * rOuter;
  const qr1 = q * rInner;

  // Normalized spherical Bessel functions (j1(x) / x = 3*(sin x - x*cos x) / x^3 -> 1 at x -> 0)
  const besselOuter = (3 * (Math.sin(qr2) - qr2 * Math.cos(qr2))) / Math.pow(qr2, 3);
  const besselInner = (3 * (Math.sin(qr1) - qr1 * Math.cos(qr1))) / Math.pow(qr1, 3);

  const vOuter = (4 / 3) * Math.PI * Math.pow(rOuter, 3);
  const vInner = (4 / 3) * Math.PI * Math.pow(rInner, 3);
  const vShell = vOuter - vInner;

  const amp = (vOuter * besselOuter - vInner * besselInner) / vShell;
  return i0 * Math.pow(amp, 2);
}

/**
 * Computes pair distance distribution function P(r)
 */
export function calculatePairDistanceDistribution(
  protein: SaxsProteinStandard,
  steps: number = 60
): SaxsPairDistancePoint[] {
  const dMax = protein.dMaxAngstroms;
  const points: SaxsPairDistancePoint[] = [];

  for (let i = 0; i <= steps; i++) {
    const r = (i / steps) * dMax;
    let pr = 0;

    if (r > 0 && r < dMax) {
      if (protein.category === 'globular_compact') {
        // Symmetric sphere-like bell
        const x = r / dMax;
        pr = 4 * Math.PI * Math.pow(r, 2) * Math.pow(1 - x, 1.5) * x;
      } else if (protein.category === 'globular_elongated') {
        // Asymmetric elongated with shoulder
        const x = r / dMax;
        pr = 4 * Math.PI * Math.pow(r, 2) * Math.exp(-Math.pow((r - dMax * 0.35) / (dMax * 0.25), 2));
      } else if (protein.category === 'intrinsically_disordered') {
        // Broad asymmetric Gaussian coil with long tail
        pr = Math.pow(r, 2) * Math.exp(-Math.pow(r / (protein.theoreticalRgAngstroms * 1.2), 2));
      } else if (protein.category === 'multidomain_flexible') {
        // Bimodal distribution (inter-domain distance peak)
        const peak1 = Math.exp(-Math.pow((r - 35) / 15, 2));
        const peak2 = 0.65 * Math.exp(-Math.pow((r - 95) / 25, 2));
        pr = Math.pow(r, 1.5) * (peak1 + peak2);
      } else if (protein.category === 'hollow_spherical_shell') {
        // Hollow shell: maximum distance is diameter, peak near 80 - 100 Å
        const x = r / dMax;
        pr = Math.pow(r, 2) * Math.sin(Math.PI * x) * (0.4 + 0.6 * Math.sin(Math.PI * x));
      }
    }

    points.push({
      r: Number(r.toFixed(1)),
      pr: Math.max(0, Number(pr.toFixed(2)))
    });
  }

  // Normalize max P(r) to 100
  const maxPr = Math.max(...points.map((p) => p.pr), 1);
  return points.map((p) => ({
    r: p.r,
    pr: Number(((p.pr / maxPr) * 100).toFixed(1))
  }));
}

/**
 * Performs linear regression in the Guinier region (q·Rg ≤ 1.3)
 * ln I(q) = ln I(0) - (Rg² / 3) * q²
 */
export function performGuinierFit(
  points: SaxsDataPoint[],
  theoreticalRg: number
): SaxsGuinierAnalysis {
  // Find points satisfying q * Rg <= 1.3
  const validPoints = points.filter((p) => p.q * theoreticalRg <= 1.3);
  const fitPoints = validPoints.length >= 8 ? validPoints.slice(0, 16) : points.slice(0, 12);

  const n = fitPoints.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  fitPoints.forEach((p) => {
    const x = p.qSquared;
    const y = p.logIntensity;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Correlation coefficient R²
  const ssTot = sumY2 - (sumY * sumY) / n;
  const ssRes = sumY2 - intercept * sumY - slope * sumXY;
  const rSquared = ssTot > 0 ? Math.max(0, Math.min(1.0, 1 - ssRes / ssTot)) : 1.0;

  // Rg = sqrt(-3 * slope)
  const rgAngstroms = slope < 0 ? Math.sqrt(-3 * slope) : theoreticalRg;
  const rgNanometers = rgAngstroms / 10;
  const i0 = Math.exp(intercept);

  // Aggregation check: low-q steep slope vs mid-q slope (low-q upward curvature)
  let aggregationWarning = false;
  if (points.length >= 6) {
    const slopeLow = (points[0].logIntensity - points[2].logIntensity) / (points[2].qSquared - points[0].qSquared || 1e-6);
    const slopeMid = (points[2].logIntensity - points[6].logIntensity) / (points[6].qSquared - points[2].qSquared || 1e-6);
    if (slopeLow > slopeMid * 1.35) {
      aggregationWarning = true;
    }
  }

  const qMin = fitPoints[0].q;
  const qMax = fitPoints[fitPoints.length - 1].q;
  const qRgMax = Number((qMax * rgAngstroms).toFixed(2));

  return {
    qMin,
    qMax,
    qRgMax,
    slope: Number(slope.toFixed(2)),
    intercept: Number(intercept.toFixed(3)),
    rgAngstroms: Number(rgAngstroms.toFixed(2)),
    rgNanometers: Number(rgNanometers.toFixed(2)),
    i0: Number(i0.toFixed(2)),
    rSquared: Number(rSquared.toFixed(4)),
    aggregationWarning
  };
}

/**
 * Simulates a full SAXS experiment on a protein standard
 */
export function simulateSaxsExperiment(
  proteinId: string,
  concentrationMgMl: number = 2.0,
  aggregationFraction: number = 0.0
): SaxsSimulationResult {
  const protein = SAXS_PROTEIN_CATALOG.find((p) => p.id === proteinId) || SAXS_PROTEIN_CATALOG[0];

  const rg = protein.theoreticalRgAngstroms;
  const i0 = protein.i0Normalized * (concentrationMgMl / 2.0);

  const scatteringCurve: SaxsDataPoint[] = SAXS_Q_POINTS.map((q) => {
    let intensity = 0;

    if (protein.category === 'intrinsically_disordered') {
      // Debye Gaussian random coil
      intensity = calculateDebyeChainIntensity(q, rg, i0);
    } else if (protein.category === 'hollow_spherical_shell') {
      // Hollow shell: Outer R = 64 Å, Inner R = 40 Å
      intensity = calculateHollowShellIntensity(q, 64, 40, i0);
    } else {
      // Compact / elongated globular with smoothly matched Porod power law tail
      const guinierCore = i0 * Math.exp(-(Math.pow(rg * q, 2) / 3));
      // Porod tail activates strictly above the Guinier limit (q·Rg > 1.35)
      const u = q * rg;
      const porodActivation = u > 1.35 ? (1 - Math.exp(-Math.pow(u - 1.35, 2))) : 0;
      const porodTail = (i0 * 0.00015 * porodActivation) / (Math.pow(q, 4) + 0.0005);
      intensity = guinierCore + porodTail;

      // Multi-domain flexible interference dip/shoulder
      if (protein.category === 'multidomain_flexible') {
        const domainModulation = 1 + 0.28 * Math.cos(q * 48);
        intensity *= domainModulation;
      }
    }

    // Add aggregate upturn if aggregation is present
    if (aggregationFraction > 0) {
      const aggRg = rg * 5.5;
      const aggI0 = i0 * aggregationFraction * 40;
      const aggIntensity = aggI0 * Math.exp(-(Math.pow(aggRg * q, 2) / 3));
      intensity += aggIntensity;
    }

    // Instrument background noise floor
    intensity = Math.max(0.0005, intensity);

    const logIntensity = Number(Math.log(intensity).toFixed(3));
    const qSquared = Number(Math.pow(q, 2).toFixed(5));
    const kratky = Number((Math.pow(q, 2) * intensity).toFixed(5));

    return {
      q,
      intensity: Number(intensity.toFixed(4)),
      logIntensity,
      qSquared,
      kratky
    };
  });

  const pairDistanceCurve = calculatePairDistanceDistribution(protein);
  const guinier = performGuinierFit(scatteringCurve, protein.theoreticalRgAngstroms);

  // Molecular weight estimated from I(0) relative to standard BSA
  const bsaStdI0 = SAXS_PROTEIN_CATALOG[0].i0Normalized;
  const bsaStdMw = SAXS_PROTEIN_CATALOG[0].molecularWeightKDa;
  const estimatedMwKDa = Number(((guinier.i0 / (concentrationMgMl || 1)) / (bsaStdI0 / 2.0) * bsaStdMw).toFixed(1));

  return {
    protein,
    concentrationMgMl,
    aggregationFraction,
    scatteringCurve,
    pairDistanceCurve,
    guinier,
    estimatedMwKDa
  };
}

/**
 * Intelligent Card Matcher for SAXS / Macromolecular Scattering
 */
export function getMatchingSaxsCard(card: { id?: string; name?: string; category?: string }): SaxsProteinStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('bsa') || target.includes('albumin') || target.includes('serum')) {
    return SAXS_PROTEIN_CATALOG.find((p) => p.id === 'bsa_monomer') || null;
  }
  if (target.includes('lysozyme') || target.includes('hydrolase') || target.includes('egg') || target.includes('rigid')) {
    return SAXS_PROTEIN_CATALOG.find((p) => p.id === 'lysozyme') || null;
  }
  if (target.includes('synuclein') || target.includes('parkinson') || target.includes('idp') || target.includes('disordered')) {
    return SAXS_PROTEIN_CATALOG.find((p) => p.id === 'alpha_synuclein_idp') || null;
  }
  if (target.includes('antibody') || target.includes('igg') || target.includes('trastuzumab') || target.includes('mab')) {
    return SAXS_PROTEIN_CATALOG.find((p) => p.id === 'igg_antibody') || null;
  }
  if (target.includes('ferritin') || target.includes('iron') || target.includes('fe') || target.includes('nanocage')) {
    return SAXS_PROTEIN_CATALOG.find((p) => p.id === 'apoferritin') || null;
  }

  // Fallback for general macromolecular / biological cards
  if (target.includes('protein') || target.includes('polymer') || target.includes('complex')) {
    return SAXS_PROTEIN_CATALOG[0]; // Default to BSA
  }

  return null;
}
