/**
 * ELEMENTA - Circular Dichroism (CD) Spectroscopy & Protein Secondary Structure Deconvolution Engine
 *
 * Biophysical Foundations & Standards:
 * - Aimé Cotton (1896, Cotton effect) & Jean-Baptiste Biot (Optical Rotatory Dispersion / ORD)
 * - Differential absorption of left and right circularly polarized light (LCP vs RCP):
 *     ΔA = A_L - A_R = (ε_L - ε_R) * c * l = Δε * c * l
 * - Ellipticity θ (in mdeg):
 *     θ (mdeg) = 32980 * ΔA = 32980 * Δε * c * l
 * - Mean Residue Ellipticity [θ]_MRE (in deg·cm²/dmol):
 *     [θ]_MRE = (θ (mdeg) * MRW) / (10 * c (mg/mL) * l (cm))
 *     where MRW = Mean Residue Weight ≈ 110 Da/residue
 * - Spectral Ranges:
 *     - Far-UV (190 - 260 nm): Amide backbone transitions (π -> π*, n -> π*)
 *         * α-Helix: Double minima at 208 nm ([θ] ≈ -33,000) & 222 nm ([θ] ≈ -36,000), peak at 193 nm ([θ] ≈ +70,000)
 *         * β-Sheet: Single minimum at 218 nm ([θ] ≈ -18,000), positive peak at 195 nm ([θ] ≈ +32,000)
 *         * β-Turn: Characteristic band at 202 nm (+12,000) and 224 nm (-8,000)
 *         * Random Coil: Strong negative minimum at 198 nm ([θ] ≈ -40,000), near-zero > 215 nm
 *     - Near-UV (250 - 320 nm): Aromatic amino acids (Trp, Tyr, Phe) and disulfide bonds (S-S)
 * - Secondary Structure Deconvolution:
 *     Constrained Non-Negative Matrix Least Squares (NNLS) fitting against reference basis spectra
 * - Thermal Denaturation:
 *     Two-state Folded <-> Unfolded equilibrium governed by Gibbs-Helmholtz and Van 't Hoff:
 *     f_U(T) = 1 / (1 + exp(-ΔH_m / R * (1/T - 1/T_m)))
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 57)
 */

export interface CdDataPoint {
  wavelength: number; // nm (190 to 260 for Far-UV, or 250 to 320 for Near-UV)
  mre: number; // Mean Residue Ellipticity in deg·cm²/dmol
  rawThetaMdeg?: number; // Raw ellipticity in mdeg
}

export interface SecondaryStructureFractions {
  alphaHelix: number; // Fraction 0.0 - 1.0 (or percentage)
  betaSheet: number; // Fraction 0.0 - 1.0
  betaTurn: number; // Fraction 0.0 - 1.0
  randomCoil: number; // Fraction 0.0 - 1.0
  nrmsd: number; // Normalized Root Mean Square Deviation of fit
}

export interface ThermalMeltingPoint {
  temperatureC: number;
  mre222: number; // [θ] at 222 nm
  fractionUnfolded: number; // 0.0 to 1.0
  dMre_dT: number; // Derivative -d[θ]/dT for Tm determination
}

export interface CdProteinStandard {
  id: string;
  name: string;
  vietnameseName: string;
  category: 'alpha-rich' | 'beta-rich' | 'mixed-alpha-beta' | 'intrinsically-disordered';
  molecularWeightDa: number;
  residuesCount: number;
  mrw: number; // Mean Residue Weight (Da)
  nativeFractions: {
    alphaHelix: number;
    betaSheet: number;
    betaTurn: number;
    randomCoil: number;
  };
  tmCelsius: number; // Thermal melting temperature
  deltaHkJmol: number; // Enthalpy of unfolding at Tm
  nearUvActiveResidues: {
    tryptophan: number;
    tyrosine: number;
    phenylalanine: number;
    disulfideBonds: number;
  };
  biologicalFunction: string;
  curriculumNotes: string;
}

// Universal Gas Constant
const R_GAS = 8.314462618; // J / (mol·K)

// Standard Wavelength Range for Far-UV
export const FAR_UV_WAVELENGTHS = Array.from({ length: 71 }, (_, i) => 190 + i); // 190 to 260 nm

// Standard Wavelength Range for Near-UV
export const NEAR_UV_WAVELENGTHS = Array.from({ length: 71 }, (_, i) => 250 + i); // 250 to 320 nm

/**
 * Pure Canonical Secondary Structure Basis Spectra at 25°C ([θ]_MRE in deg·cm²/dmol)
 * Based on Provencher-Glöckner & Greenfield-Fasman reference sets
 */
export function getCanonicalBasisMre(wavelength: number): {
  alpha: number;
  beta: number;
  turn: number;
  coil: number;
} {
  const wl = wavelength;

  // Pure Alpha Helix: 193 nm (+70k), 208 nm (-33k), 222 nm (-36k)
  const g193 = 70000 * Math.exp(-Math.pow((wl - 193) / 7.2, 2));
  const g208 = -33000 * Math.exp(-Math.pow((wl - 208) / 8.5, 2));
  const g222 = -36000 * Math.exp(-Math.pow((wl - 222) / 10.5, 2));
  const alpha = g193 + g208 + g222;

  // Pure Beta Sheet: 195 nm (+32k), 218 nm (-18k)
  const b195 = 32000 * Math.exp(-Math.pow((wl - 195) / 8.0, 2));
  const b218 = -18000 * Math.exp(-Math.pow((wl - 218) / 12.0, 2));
  const beta = b195 + b218;

  // Pure Beta Turn: 202 nm (+12k), 224 nm (-8k)
  const t202 = 12000 * Math.exp(-Math.pow((wl - 202) / 7.0, 2));
  const t224 = -8000 * Math.exp(-Math.pow((wl - 224) / 11.0, 2));
  const turn = t202 + t224;

  // Pure Random Coil / Disordered: 198 nm (-40k), slight positive at 220 nm (+2k)
  const c198 = -40000 * Math.exp(-Math.pow((wl - 198) / 9.0, 2));
  const c220 = 2500 * Math.exp(-Math.pow((wl - 220) / 14.0, 2));
  const coil = c198 + c220;

  return { alpha, beta, turn, coil };
}

/**
 * Catalog of Standard Benchmark Proteins for Circular Dichroism
 */
export const CD_PROTEIN_CATALOG: CdProteinStandard[] = [
  {
    id: 'myoglobin',
    name: 'Myoglobin (Sperm Whale Muscle)',
    vietnameseName: 'Myoglobin (Cơ vân cá nhà táng)',
    category: 'alpha-rich',
    molecularWeightDa: 17800,
    residuesCount: 153,
    mrw: 116.3,
    nativeFractions: {
      alphaHelix: 0.78,
      betaSheet: 0.00,
      betaTurn: 0.08,
      randomCoil: 0.14
    },
    tmCelsius: 78.5,
    deltaHkJmol: 420,
    nearUvActiveResidues: {
      tryptophan: 2,
      tyrosine: 3,
      phenylalanine: 6,
      disulfideBonds: 0
    },
    biologicalFunction: 'Heme-bound oxygen storage protein in deep-diving cetaceans with iconic globin fold.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Protein bậc II xoắn α và phối tử Heme liên kết ion Fe²⁺.'
  },
  {
    id: 'bsa',
    name: 'Bovine Serum Albumin (BSA)',
    vietnameseName: 'Albumin huyết thanh bò (BSA)',
    category: 'alpha-rich',
    molecularWeightDa: 66463,
    residuesCount: 583,
    mrw: 114.0,
    nativeFractions: {
      alphaHelix: 0.67,
      betaSheet: 0.10,
      betaTurn: 0.08,
      randomCoil: 0.15
    },
    tmCelsius: 65.0,
    deltaHkJmol: 380,
    nearUvActiveResidues: {
      tryptophan: 2,
      tyrosine: 21,
      phenylalanine: 27,
      disulfideBonds: 17
    },
    biologicalFunction: 'Abundant blood plasma protein for maintaining oncotic pressure and transporting fatty acids/drugs.',
    curriculumNotes: 'GDPT 2018 Sinh học & Hóa học 12: Khối cầu albumin hòa tan cao, chứa 17 cầu nối đisunfua duy trì cấu trúc.'
  },
  {
    id: 'concanavalin-a',
    name: 'Concanavalin A (Jack Bean Lectin)',
    vietnameseName: 'Concanavalin A (Lectin đậu Jack)',
    category: 'beta-rich',
    molecularWeightDa: 26500,
    residuesCount: 237,
    mrw: 111.8,
    nativeFractions: {
      alphaHelix: 0.03,
      betaSheet: 0.51,
      betaTurn: 0.18,
      randomCoil: 0.28
    },
    tmCelsius: 71.0,
    deltaHkJmol: 450,
    nearUvActiveResidues: {
      tryptophan: 4,
      tyrosine: 7,
      phenylalanine: 11,
      disulfideBonds: 0
    },
    biologicalFunction: 'Classical carbohydrate-binding lectin featuring a hallmark anti-parallel β-barrel jelly roll fold.',
    curriculumNotes: 'Chuẩn đo phổ CD cấu trúc nếp gấp β (phiến gấp song song và đối song) với cực tiểu duy nhất tại 218 nm.'
  },
  {
    id: 'trastuzumab-fab',
    name: 'Trastuzumab Fab (Anti-HER2 Monoclonal Antibody)',
    vietnameseName: 'Kháng thể đơn dòng Trastuzumab (Phân mảnh Fab)',
    category: 'beta-rich',
    molecularWeightDa: 47600,
    residuesCount: 432,
    mrw: 110.2,
    nativeFractions: {
      alphaHelix: 0.04,
      betaSheet: 0.54,
      betaTurn: 0.16,
      randomCoil: 0.26
    },
    tmCelsius: 72.5,
    deltaHkJmol: 490,
    nearUvActiveResidues: {
      tryptophan: 8,
      tyrosine: 26,
      phenylalanine: 18,
      disulfideBonds: 5
    },
    biologicalFunction: 'Therapeutic monoclonal antibody binding HER2 receptor in breast cancer, classic immunoglobulin fold.',
    curriculumNotes: 'Kháng thể trị liệu ung thư; cấu trúc miễn dịch gần như thuần nếp gấp β với độ bền nhiệt cao.'
  },
  {
    id: 'alpha-synuclein',
    name: 'α-Synuclein Monomer (Parkinson IDP)',
    vietnameseName: 'α-Synuclein đơn phân (Protein nội tại bất trật tự IDP)',
    category: 'intrinsically-disordered',
    molecularWeightDa: 14460,
    residuesCount: 140,
    mrw: 103.3,
    nativeFractions: {
      alphaHelix: 0.02,
      betaSheet: 0.04,
      betaTurn: 0.10,
      randomCoil: 0.84
    },
    tmCelsius: 95.0, // Does not melt cooperatively
    deltaHkJmol: 80,
    nearUvActiveResidues: {
      tryptophan: 0,
      tyrosine: 4,
      phenylalanine: 2,
      disulfideBonds: 0
    },
    biologicalFunction: 'Presynaptic disordered protein that undergoes pathological amyloid aggregation into Lewy bodies.',
    curriculumNotes: 'Mẫu chuẩn protein cuộn ngẫu nhiên (random coil) với cực tiểu sâu tại 198 nm, không có nhiệt độ nóng chảy xác định.'
  },
  {
    id: 'lysozyme',
    name: 'Lysozyme (Hen Egg White)',
    vietnameseName: 'Lysozyme (Lòng trắng trứng gà)',
    category: 'mixed-alpha-beta',
    molecularWeightDa: 14307,
    residuesCount: 129,
    mrw: 110.9,
    nativeFractions: {
      alphaHelix: 0.42,
      betaSheet: 0.19,
      betaTurn: 0.14,
      randomCoil: 0.25
    },
    tmCelsius: 74.0,
    deltaHkJmol: 460,
    nearUvActiveResidues: {
      tryptophan: 6,
      tyrosine: 3,
      phenylalanine: 3,
      disulfideBonds: 4
    },
    biologicalFunction: 'Antibacterial enzyme cleaving β-(1,4)-glycosidic bonds in bacterial peptidoglycan cell walls.',
    curriculumNotes: 'Enzyme kháng khuẩn kinh điển với cả miền xoắn α và phiến gấp β, ổn định bởi 4 cầu đisunfua.'
  }
];

/**
 * Calculates Mean Residue Ellipticity [θ]_MRE from raw ellipticity θ (mdeg),
 * protein concentration c (mg/mL), cuvette pathlength l (cm), and mean residue weight (MRW).
 */
export function calculateMre(
  rawThetaMdeg: number,
  concentrationMgMl: number,
  pathlengthCm: number,
  mrw: number = 110
): number {
  if (concentrationMgMl <= 0 || pathlengthCm <= 0) return 0;
  return (rawThetaMdeg * mrw) / (10 * concentrationMgMl * pathlengthCm);
}

/**
 * Converts Mean Residue Ellipticity [θ]_MRE back to raw instrument ellipticity θ (mdeg)
 */
export function calculateRawTheta(
  mre: number,
  concentrationMgMl: number,
  pathlengthCm: number,
  mrw: number = 110
): number {
  if (mrw <= 0) return 0;
  return (mre * 10 * concentrationMgMl * pathlengthCm) / mrw;
}

/**
 * Calculates fraction of unfolded protein at a given temperature based on a two-state transition:
 *   Folded <=> Unfolded
 *   ΔG(T) = ΔH_m * (1 - T / T_m)
 *   f_U(T) = 1 / (1 + exp(-ΔH_m / (R * T) * (1 - T / T_m)))
 */
export function calculateFractionUnfolded(
  temperatureCelsius: number,
  tmCelsius: number,
  deltaHkJmol: number
): number {
  const TK = temperatureCelsius + 273.15;
  const TmK = tmCelsius + 273.15;
  const deltaHJmol = deltaHkJmol * 1000;

  // Gibbs free energy difference of unfolding
  const deltaG = deltaHJmol * (1 - TK / TmK);
  const exponent = -deltaG / (R_GAS * TK);

  // Clamp exponent to prevent numerical overflow
  if (exponent > 50) return 1.0;
  if (exponent < -50) return 0.0;

  const K_unfold = Math.exp(exponent);
  return K_unfold / (1 + K_unfold);
}

/**
 * Generates an experimental Far-UV Circular Dichroism spectrum for a protein
 * under specific temperature and denaturant conditions.
 */
export function generateFarUvCdSpectrum(
  protein: CdProteinStandard,
  temperatureCelsius: number = 25,
  denaturantMolar: number = 0,
  concentrationMgMl: number = 0.2,
  pathlengthCm: number = 0.1
): CdDataPoint[] {
  // If denaturant is added (e.g. Urea or GdnHCl), it lowers Tm and promotes unfolding
  const effectiveTm = protein.tmCelsius - denaturantMolar * 5.5;
  const fU = calculateFractionUnfolded(temperatureCelsius, effectiveTm, protein.deltaHkJmol);

  // When unfolded, protein predominantly adopts random coil (disordered) conformation
  const alpha = protein.nativeFractions.alphaHelix * (1 - fU) + 0.02 * fU;
  const beta = protein.nativeFractions.betaSheet * (1 - fU) + 0.04 * fU;
  const turn = protein.nativeFractions.betaTurn * (1 - fU) + 0.08 * fU;
  const coil = 1.0 - (alpha + beta + turn);

  return FAR_UV_WAVELENGTHS.map((wl) => {
    const basis = getCanonicalBasisMre(wl);
    const mre = alpha * basis.alpha + beta * basis.beta + turn * basis.turn + coil * basis.coil;
    const rawThetaMdeg = calculateRawTheta(mre, concentrationMgMl, pathlengthCm, protein.mrw);
    return {
      wavelength: wl,
      mre: Math.round(mre),
      rawThetaMdeg: Number(rawThetaMdeg.toFixed(2))
    };
  });
}

/**
 * Generates Near-UV CD spectrum (250 - 320 nm) reflecting tertiary packing of aromatic residues
 */
export function generateNearUvCdSpectrum(
  protein: CdProteinStandard,
  temperatureCelsius: number = 25,
  concentrationMgMl: number = 1.0,
  pathlengthCm: number = 1.0
): CdDataPoint[] {
  const fU = calculateFractionUnfolded(temperatureCelsius, protein.tmCelsius, protein.deltaHkJmol);
  // Tertiary structure collapses rapidly upon partial thermal unfolding
  const tertiaryRetention = Math.max(0, 1 - fU * 1.5);

  const { tryptophan, tyrosine, phenylalanine, disulfideBonds } = protein.nearUvActiveResidues;

  return NEAR_UV_WAVELENGTHS.map((wl) => {
    // Trp peaks at 282, 290 nm
    const trpSignal = tryptophan * (45 * Math.exp(-Math.pow((wl - 290) / 4.0, 2)) + 35 * Math.exp(-Math.pow((wl - 282) / 3.5, 2)));
    // Tyr peaks at 275, 282 nm
    const tyrSignal = tyrosine * (25 * Math.exp(-Math.pow((wl - 275) / 4.5, 2)) - 15 * Math.exp(-Math.pow((wl - 282) / 4.0, 2)));
    // Phe fine vibration peaks at 258, 264 nm
    const pheSignal = phenylalanine * (10 * Math.exp(-Math.pow((wl - 258) / 2.5, 2)) + 12 * Math.exp(-Math.pow((wl - 264) / 2.5, 2)));
    // Disulfide broad band 250 - 290 nm
    const ssSignal = disulfideBonds * 8 * Math.exp(-Math.pow((wl - 268) / 12.0, 2));

    const totalMre = (trpSignal + tyrSignal + pheSignal + ssSignal) * tertiaryRetention;
    const rawTheta = calculateRawTheta(totalMre, concentrationMgMl, pathlengthCm, protein.mrw);

    return {
      wavelength: wl,
      mre: Math.round(totalMre),
      rawThetaMdeg: Number(rawTheta.toFixed(2))
    };
  });
}

/**
 * Generates thermal melting curve by monitoring [θ]_MRE at 222 nm from 20°C to 95°C
 */
export function generateThermalMeltingCurve(
  protein: CdProteinStandard,
  stepDeg: number = 1
): ThermalMeltingPoint[] {
  const points: ThermalMeltingPoint[] = [];

  for (let T = 20; T <= 95; T += stepDeg) {
    const fU = calculateFractionUnfolded(T, protein.tmCelsius, protein.deltaHkJmol);
    const alpha = protein.nativeFractions.alphaHelix * (1 - fU) + 0.02 * fU;
    const beta = protein.nativeFractions.betaSheet * (1 - fU) + 0.04 * fU;
    const turn = protein.nativeFractions.betaTurn * (1 - fU) + 0.08 * fU;
    const coil = 1.0 - (alpha + beta + turn);

    const basis = getCanonicalBasisMre(222);
    const mre222 = alpha * basis.alpha + beta * basis.beta + turn * basis.turn + coil * basis.coil;

    points.push({
      temperatureC: T,
      mre222: Math.round(mre222),
      fractionUnfolded: Number(fU.toFixed(3)),
      dMre_dT: 0 // Will compute gradient below
    });
  }

  // Compute numerical derivative d[θ]/dT (peaks at Tm)
  for (let i = 1; i < points.length - 1; i++) {
    const deltaT = points[i + 1].temperatureC - points[i - 1].temperatureC;
    const deltaMre = points[i + 1].mre222 - points[i - 1].mre222;
    points[i].dMre_dT = Number((deltaMre / deltaT).toFixed(1));
  }
  if (points.length > 2) {
    points[0].dMre_dT = points[1].dMre_dT;
    points[points.length - 1].dMre_dT = points[points.length - 2].dMre_dT;
  }

  return points;
}

/**
 * Chen-Yang empirical formula to estimate α-helix content directly from [θ]_222
 * f_α = (-[θ]_222 - 3000) / (39000 - 3000)
 */
export function estimateHelixFractionChenYang(theta222Mre: number): number {
  const raw = (-theta222Mre - 3000) / (39000 - 3000);
  return Math.max(0, Math.min(1.0, Number(raw.toFixed(3))));
}

/**
 * Constrained Non-Negative Matrix Least Squares (NNLS) deconvolution of Far-UV CD spectrum
 * into pure secondary structure fractions: α-helix, β-sheet, β-turn, and random coil.
 */
export function deconvolveSecondaryStructure(
  spectrum: CdDataPoint[]
): SecondaryStructureFractions {
  // Extract observation vector
  const wavelengths = spectrum.map((d) => d.wavelength);
  const observed = spectrum.map((d) => d.mre);

  // Build design matrix A (N x 4)
  const A = wavelengths.map((wl) => {
    const b = getCanonicalBasisMre(wl);
    return [b.alpha, b.beta, b.turn, b.coil];
  });

  // Build Gram matrix G (4x4) and target vector b (4x1)
  const G = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  const b = [0, 0, 0, 0];

  for (let i = 0; i < observed.length; i++) {
    for (let j = 0; j < 4; j++) {
      b[j] += A[i][j] * observed[i];
      for (let k = 0; k < 4; k++) {
        G[j][k] += A[i][j] * A[i][k];
      }
    }
  }

  // Simplex projected gradient descent
  const traceG = G[0][0] + G[1][1] + G[2][2] + G[3][3];
  const stepSize = 1.8 / (traceG || 1);
  let f = [0.25, 0.25, 0.25, 0.25];

  for (let iter = 0; iter < 12000; iter++) {
    const grad = [0, 0, 0, 0];
    for (let j = 0; j < 4; j++) {
      let gj = -b[j];
      for (let k = 0; k < 4; k++) {
        gj += G[j][k] * f[k];
      }
      grad[j] = gj;
    }

    for (let j = 0; j < 4; j++) {
      f[j] = Math.max(0, f[j] - stepSize * grad[j]);
    }

    const sum = f.reduce((x, y) => x + y, 0);
    if (sum > 0) {
      f = f.map((x) => x / sum);
    }
  }

  // Calculate NRMSD (Normalized Root Mean Square Deviation)
  let sumSqResiduals = 0;
  let sumSqObs = 0;
  for (let i = 0; i < observed.length; i++) {
    const pred = A[i][0] * f[0] + A[i][1] * f[1] + A[i][2] * f[2] + A[i][3] * f[3];
    const diff = observed[i] - pred;
    sumSqResiduals += diff * diff;
    sumSqObs += observed[i] * observed[i];
  }

  const nrmsd = Math.sqrt(sumSqResiduals / (sumSqObs || 1));

  return {
    alphaHelix: Number(f[0].toFixed(3)),
    betaSheet: Number(f[1].toFixed(3)),
    betaTurn: Number(f[2].toFixed(3)),
    randomCoil: Number(f[3].toFixed(3)),
    nrmsd: Number(nrmsd.toFixed(4))
  };
}

/**
 * Intelligent Card Matcher for Circular Dichroism / Protein Spectroscopy
 */
export function getMatchingCdCard(card: { id?: string; name?: string; category?: string }): CdProteinStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('myoglobin') || target.includes('hemoglobin') || target.includes('fe') || target.includes('iron') || target.includes('heme')) {
    return CD_PROTEIN_CATALOG.find((p) => p.id === 'myoglobin') || null;
  }
  if (target.includes('bsa') || target.includes('albumin') || target.includes('serum')) {
    return CD_PROTEIN_CATALOG.find((p) => p.id === 'bsa') || null;
  }
  if (target.includes('concanavalin') || target.includes('lectin') || target.includes('mn') || target.includes('manganese')) {
    return CD_PROTEIN_CATALOG.find((p) => p.id === 'concanavalin-a') || null;
  }
  if (target.includes('trastuzumab') || target.includes('antibody') || target.includes('fab') || target.includes('igg')) {
    return CD_PROTEIN_CATALOG.find((p) => p.id === 'trastuzumab-fab') || null;
  }
  if (target.includes('synuclein') || target.includes('parkinson') || target.includes('amyloid') || target.includes('idp')) {
    return CD_PROTEIN_CATALOG.find((p) => p.id === 'alpha-synuclein') || null;
  }
  if (target.includes('lysozyme') || target.includes('enzyme') || target.includes('egg') || target.includes('peptidoglycan')) {
    return CD_PROTEIN_CATALOG.find((p) => p.id === 'lysozyme') || null;
  }

  // General biological / protein card fallback
  if (target.includes('protein') || target.includes('peptide') || target.includes('bio') || target.includes('amino')) {
    return CD_PROTEIN_CATALOG[0]; // Default to Myoglobin
  }

  return null;
}
