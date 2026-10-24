// src/domain/xafsEngine.ts
// Milestone 73: X-ray Absorption Fine Structure (XAFS), XANES Chemical Valence & EXAFS Coordination Shell Engine
// Standards: IUPAC Physical Chemistry & Synchrotron Radiation X-ray Spectroscopy Metrology
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Cấu trúc vỏ nguyên tử, phân lớp electron và tia X; Hóa học 12: Phức chất phối trí, trạng thái oxy hóa kim loại chuyển tiếp, xúc tác đơn nguyên tử; Sinh học 11: Quang hợp và cụm Mn4CaO5 tạo oxy; Vật lý 12: Bức xạ hãm bức xạ synchrotron, hiệu ứng quang điện trong và tán xạ lượng tử)

export const PLANCK_CONSTANT_H = 6.62607015e-34; // J s
export const HBAR = 1.054571817e-34; // J s
export const ELECTRON_MASS_KG = 9.1093837e-31; // kg
export const ELECTRON_CHARGE_COULOMB = 1.602176634e-19; // C
export const SPEED_OF_LIGHT_M_PER_S = 299792458; // m/s
export const SILICON_111_D_SPACING_ANGSTROM = 3.1356; // 2d = 6.2712 Angstrom for Si(111) monochromator

/**
 * Theoretical conversion factor: k = sqrt(2 m_e (E - E_0) / hbar^2)
 * In practical units: k (Angstrom^-1) = 0.51232 * sqrt(E - E_0 (eV))
 */
export const PHOTOELECTRON_K_CONVERSION_FACTOR = 0.51232;

export type XafsEdgeType = 'K_EDGE' | 'L1_EDGE' | 'L2_EDGE' | 'L3_EDGE';

export type XafsSampleType =
  | 'METALLIC_FOIL'
  | 'TRANSITION_OXIDE'
  | 'METALLOENZYME'
  | 'SINGLE_ATOM_CATALYST'
  | 'PEROVSKITE_SEMICONDUCTOR';

export interface CoordinationShell {
  shellIndex: number; // 1, 2, 3...
  scattererElement: string; // 'Cu', 'O', 'Fe', 'Mn', 'Ce', 'I'
  scattererAtomicNumber: number; // Z
  coordinationNumber: number; // N_j (number of scatterers in shell)
  radialDistanceAngstrom: number; // R_j in Angstrom
  debyeWallerFactorAngstromSq: number; // sigma_j^2 (thermal & structural disorder, Angstrom^2)
  backscatteringAmplitudeScalar: number; // Normalized |f(k)| peak amplitude
  phaseShiftRadian: number; // Empirical phase offset (e.g. -0.4 to 0.8 rad)
}

export interface XafsPreEdgeFeature {
  energyEv: number;
  relativeIntensity: number; // 0 to 1
  assignment: string; // e.g. "1s -> 3d quadrupole / p-d hybrid transition"
}

export interface XanesSpectralFeature {
  edgeEnergyE0Ev: number; // Threshold energy E_0 (eV)
  edgeShiftDeltaEv: number; // Chemical shift relative to zero-valent metal foil (eV)
  oxidationState: string; // "0", "+2", "+3", "+2.67", "+3.5", "+4"
  whiteLineEnergyEv: number; // Energy of maximum white-line absorption
  whiteLineIntensity: number; // Normalized mu(E) peak value (1.2 to 2.5)
  preEdgePeaks: XafsPreEdgeFeature[];
  edgeStepNormalized: number; // Normalized jump factor (typically 1.0)
}

export interface XafsSpectrumPoint {
  energyEv: number;
  absorptionMu: number; // Normalized mu(E)
  kWavevector: number; // Photoelectron wavenumber k (Angstrom^-1), 0 below E_0
  chiK: number; // EXAFS chi(k)
  k1ChiK: number; // k * chi(k)
  k2ChiK: number; // k^2 * chi(k)
  k3ChiK: number; // k^3 * chi(k)
}

export interface RSpaceDistributionPoint {
  radialDistanceR: number; // Distance R (Angstrom), 0 to 6.0 A
  radialMagnitude: number; // |FT[k^n chi(k)]| in arbitrary units
  realComponent: number;
  imaginaryComponent: number;
}

export interface XafsStandard {
  id: string;
  name: string;
  vietnameseName: string;
  absorberElement: string; // 'Cu', 'Fe', 'Mn', 'Pt', 'Pb'
  absorberAtomicNumber: number;
  edgeType: XafsEdgeType;
  sampleType: XafsSampleType;
  edgeEnergyE0Ev: number; // Base reference edge energy
  xanes: XanesSpectralFeature;
  amplitudeReductionFactorS02: number; // S_0^2 (typically 0.80 - 0.95)
  meanFreePathLambdaAngstrom: number; // lambda(k) (typically 8 - 12 A)
  shells: CoordinationShell[];
  chemicalFormula: string;
  coordinationGeometry: string;
  description: string;
  curriculumNotes: string;
  synchrotronSignificance: string;
  nobelCitation?: string;
}

export interface XafsSimulationResult {
  standard: XafsStandard;
  incidentEnergyEv: number;
  monochromatorAngleDeg: number; // Bragg angle theta
  transmittedIntensityPercent: number;
  absorptionCoefficientMu: number;
  currentK: number; // Angstrom^-1
  currentChiK: number;
  spectrumCurve: XafsSpectrumPoint[];
  rSpaceDistribution: RSpaceDistributionPoint[];
  dominantShellsSummary: {
    shellIndex: number;
    element: string;
    distanceA: number;
    coordinationNumber: number;
  }[];
}

/**
 * Standard Catalog: 5 Comprehensive XAFS Reference Standards
 */
export const XAFS_STANDARD_CATALOG: XafsStandard[] = [
  {
    id: 'cu_foil_reference',
    name: 'Copper Metal (Cu) Foil Calibrant',
    vietnameseName: 'Lá Đồng Kim Loại Cu (Chuẩn Hiệu Chuẩn Phổ K-edge 8979 eV Synchrotron)',
    absorberElement: 'Cu',
    absorberAtomicNumber: 29,
    edgeType: 'K_EDGE',
    sampleType: 'METALLIC_FOIL',
    edgeEnergyE0Ev: 8979.0,
    chemicalFormula: 'Cu (fcc lattice)',
    coordinationGeometry: 'Face-Centered Cubic (FCC, 12 Nearest Neighbors)',
    amplitudeReductionFactorS02: 0.88,
    meanFreePathLambdaAngstrom: 10.5,
    xanes: {
      edgeEnergyE0Ev: 8979.0,
      edgeShiftDeltaEv: 0.0,
      oxidationState: '0',
      whiteLineEnergyEv: 8993.0,
      whiteLineIntensity: 1.35,
      preEdgePeaks: [],
      edgeStepNormalized: 1.0,
    },
    shells: [
      {
        shellIndex: 1,
        scattererElement: 'Cu',
        scattererAtomicNumber: 29,
        coordinationNumber: 12.0,
        radialDistanceAngstrom: 2.556,
        debyeWallerFactorAngstromSq: 0.008,
        backscatteringAmplitudeScalar: 1.0,
        phaseShiftRadian: -0.35,
      },
      {
        shellIndex: 2,
        scattererElement: 'Cu',
        scattererAtomicNumber: 29,
        coordinationNumber: 6.0,
        radialDistanceAngstrom: 3.615,
        debyeWallerFactorAngstromSq: 0.012,
        backscatteringAmplitudeScalar: 0.85,
        phaseShiftRadian: -0.22,
      },
      {
        shellIndex: 3,
        scattererElement: 'Cu',
        scattererAtomicNumber: 29,
        coordinationNumber: 24.0,
        radialDistanceAngstrom: 4.427,
        debyeWallerFactorAngstromSq: 0.015,
        backscatteringAmplitudeScalar: 0.72,
        phaseShiftRadian: -0.15,
      },
      {
        shellIndex: 4,
        scattererElement: 'Cu',
        scattererAtomicNumber: 29,
        coordinationNumber: 12.0,
        radialDistanceAngstrom: 5.112,
        debyeWallerFactorAngstromSq: 0.018,
        backscatteringAmplitudeScalar: 0.60,
        phaseShiftRadian: -0.08,
      },
    ],
    description:
      'Metallic copper foil is the primary worldwide calibrant for synchrotron beamline monochromators (Cu K-edge at 8979.0 eV). In fcc Cu, the absorbing atom is surrounded by 12 nearest Cu neighbors at 2.556 Å.',
    curriculumNotes:
      'GDPT 2018 Hóa học 10 & 12: Cấu hình electron [Ar] 3d10 4s1, liên kết kim loại mạng lập phương tâm diện (fcc), số phối trí CN = 12. Phổ EXAFS chuẩn mực giúp học sinh hiểu cơ chế tán xạ sóng quang electron.',
    synchrotronSignificance:
      'Global energy calibration benchmark for hard X-ray beamlines (ESRF, SPring-8, APS, NSLS-II, Diamond, DESY).',
  },
  {
    id: 'iron_oxide_hematite',
    name: 'Iron(III) Oxide Hematite (α-Fe2O3)',
    vietnameseName: 'Oxit Sắt(III) Hematit α-Fe2O3 (Dịch Chuyển K-edge Fe3+ & Đỉnh Tiền Ngưỡng 1s→3d)',
    absorberElement: 'Fe',
    absorberAtomicNumber: 26,
    edgeType: 'K_EDGE',
    sampleType: 'TRANSITION_OXIDE',
    edgeEnergyE0Ev: 7112.0,
    chemicalFormula: 'α-Fe2O3 (Corundum structure)',
    coordinationGeometry: 'Distorted Octahedral FeO6 (CN = 6 O)',
    amplitudeReductionFactorS02: 0.85,
    meanFreePathLambdaAngstrom: 9.2,
    xanes: {
      edgeEnergyE0Ev: 7120.5,
      edgeShiftDeltaEv: 8.5,
      oxidationState: '+3',
      whiteLineEnergyEv: 7131.0,
      whiteLineIntensity: 1.58,
      preEdgePeaks: [
        {
          energyEv: 7114.5,
          relativeIntensity: 0.22,
          assignment: '1s -> 3d quadrupole / p-d hybrid transition due to octahedral distortion',
        },
      ],
      edgeStepNormalized: 1.0,
    },
    shells: [
      {
        shellIndex: 1,
        scattererElement: 'O',
        scattererAtomicNumber: 8,
        coordinationNumber: 6.0,
        radialDistanceAngstrom: 1.99, // Weighted average of 3x 1.95 A + 3x 2.11 A
        debyeWallerFactorAngstromSq: 0.004,
        backscatteringAmplitudeScalar: 0.58,
        phaseShiftRadian: -0.48,
      },
      {
        shellIndex: 2,
        scattererElement: 'Fe',
        scattererAtomicNumber: 26,
        coordinationNumber: 4.0,
        radialDistanceAngstrom: 2.95, // Edge-sharing Fe-Fe
        debyeWallerFactorAngstromSq: 0.007,
        backscatteringAmplitudeScalar: 0.92,
        phaseShiftRadian: -0.30,
      },
      {
        shellIndex: 3,
        scattererElement: 'Fe',
        scattererAtomicNumber: 26,
        coordinationNumber: 3.0,
        radialDistanceAngstrom: 3.60, // Corner-sharing Fe-Fe
        debyeWallerFactorAngstromSq: 0.009,
        backscatteringAmplitudeScalar: 0.80,
        phaseShiftRadian: -0.18,
      },
    ],
    description:
      'Hematite exhibits a prominent +8.5 eV chemical edge shift relative to metallic iron foil, demonstrating the correlation between higher oxidation state Fe(III) and increased core-electron binding energy. The weak pre-edge peak at 7114.5 eV reflects 1s -> 3d transitions allowed by non-centrosymmetric FeO6 distortion.',
    curriculumNotes:
      'GDPT 2018 Hóa học 10 & 12: Trạng thái oxy hóa +3 của sắt trong Fe2O3, cấu hình [Ar] 3d5, bán kính ion Fe3+ (0.645 Å), quy tắc dịch chuyển hóa học năng lượng ngưỡng X-ray.',
    synchrotronSignificance:
      'Essential reference for environmental mineralogy, soil chemistry, and corrosion science.',
  },
  {
    id: 'photosystem2_oxygen_evolving_complex',
    name: 'Photosystem II Oxygen-Evolving Complex (Mn4CaO5 Cluster)',
    vietnameseName: 'Phức Hệ Tạo Oxy Photosystem II (Cụm Mn4CaO5 Quang Hợp Tách Nước Tự Nhiên)',
    absorberElement: 'Mn',
    absorberAtomicNumber: 25,
    edgeType: 'K_EDGE',
    sampleType: 'METALLOENZYME',
    edgeEnergyE0Ev: 6539.0,
    chemicalFormula: 'Mn4CaO5 (Kok S1 Ground State)',
    coordinationGeometry: 'Distorted Heteronuclear Oxo-Cubane (Mn3CaO4 + Dangling Mn)',
    amplitudeReductionFactorS02: 0.86,
    meanFreePathLambdaAngstrom: 9.0,
    xanes: {
      edgeEnergyE0Ev: 6551.5,
      edgeShiftDeltaEv: 12.5,
      oxidationState: '+3.5 (2x Mn3+, 2x Mn4+ in S1)',
      whiteLineEnergyEv: 6563.0,
      whiteLineIntensity: 1.62,
      preEdgePeaks: [
        {
          energyEv: 6542.2,
          relativeIntensity: 0.16,
          assignment: '1s -> 3d transition in mixed-valence distorted Mn-oxo polyhedra',
        },
      ],
      edgeStepNormalized: 1.0,
    },
    shells: [
      {
        shellIndex: 1,
        scattererElement: 'O',
        scattererAtomicNumber: 8,
        coordinationNumber: 5.6,
        radialDistanceAngstrom: 1.92, // mu-oxo bridges and terminal waters
        debyeWallerFactorAngstromSq: 0.005,
        backscatteringAmplitudeScalar: 0.55,
        phaseShiftRadian: -0.50,
      },
      {
        shellIndex: 2,
        scattererElement: 'Mn',
        scattererAtomicNumber: 25,
        coordinationNumber: 2.4,
        radialDistanceAngstrom: 2.72, // Di-mu-oxo bridged Mn-Mn pairs
        debyeWallerFactorAngstromSq: 0.004,
        backscatteringAmplitudeScalar: 0.90,
        phaseShiftRadian: -0.32,
      },
      {
        shellIndex: 3,
        scattererElement: 'Ca',
        scattererAtomicNumber: 20,
        coordinationNumber: 1.1,
        radialDistanceAngstrom: 3.40, // Mono-mu-oxo bridged Mn-Ca
        debyeWallerFactorAngstromSq: 0.006,
        backscatteringAmplitudeScalar: 0.70,
        phaseShiftRadian: -0.25,
      },
    ],
    description:
      'The catalytic core of solar water oxidation (2 H2O -> O2 + 4 H+ + 4 e-). XAFS famously resolved the 2.72 Å di-μ-oxo Mn-Mn distances and 3.4 Å Mn-Ca bridges decades before damage-free room-temperature XFEL crystallography confirmed the intact cubane structure.',
    curriculumNotes:
      'GDPT 2018 Sinh học 11 & Hóa học 12: Pha sáng quang hợp, phức hệ phân ly nước quang hóa, vai trò nguyên tố vi lượng mangan và canxi trong hoạt động enzym sinh học.',
    synchrotronSignificance:
      'Historic triumph of biological XAFS spectroscopy (Yachandra, Sauer, Bergmann, Shen, Barber).',
  },
  {
    id: 'platinum_single_atom_catalyst',
    name: 'Platinum Single-Atom Catalyst (Pt1/CeO2 SAC)',
    vietnameseName: 'Xúc Tác Đơn Nguyên Tử Platin Pt1/CeO2 (Minh Chứng EXAFS Hoàn Toàn Triệt Tiêu Liên Kết Pt-Pt)',
    absorberElement: 'Pt',
    absorberAtomicNumber: 78,
    edgeType: 'L3_EDGE',
    sampleType: 'SINGLE_ATOM_CATALYST',
    edgeEnergyE0Ev: 11564.0,
    chemicalFormula: 'Pt1/CeO2 (111) surface vacancy',
    coordinationGeometry: 'Square Planar PtO4 (CN = 4 O)',
    amplitudeReductionFactorS02: 0.89,
    meanFreePathLambdaAngstrom: 11.2,
    xanes: {
      edgeEnergyE0Ev: 11568.5,
      edgeShiftDeltaEv: 4.5,
      oxidationState: '+2 / +4',
      whiteLineEnergyEv: 11568.0,
      whiteLineIntensity: 2.25, // Massive white-line peak indicates strong 5d orbital vacancy
      preEdgePeaks: [],
      edgeStepNormalized: 1.0,
    },
    shells: [
      {
        shellIndex: 1,
        scattererElement: 'O',
        scattererAtomicNumber: 8,
        coordinationNumber: 4.2,
        radialDistanceAngstrom: 2.01, // Pt-O anchoring bond
        debyeWallerFactorAngstromSq: 0.003,
        backscatteringAmplitudeScalar: 0.52,
        phaseShiftRadian: -0.52,
      },
      {
        shellIndex: 2,
        scattererElement: 'Pt',
        scattererAtomicNumber: 78,
        coordinationNumber: 0.0, // Strictly ZERO Pt-Pt coordination -> Definitive proof of single atoms!
        radialDistanceAngstrom: 2.77, // Bulk metallic Pt-Pt distance (absent)
        debyeWallerFactorAngstromSq: 0.020,
        backscatteringAmplitudeScalar: 0.0,
        phaseShiftRadian: 0.0,
      },
      {
        shellIndex: 3,
        scattererElement: 'Ce',
        scattererAtomicNumber: 58,
        coordinationNumber: 2.1,
        radialDistanceAngstrom: 3.32, // Substrate Ce atoms
        debyeWallerFactorAngstromSq: 0.008,
        backscatteringAmplitudeScalar: 0.82,
        phaseShiftRadian: -0.22,
      },
    ],
    description:
      'Single-atom catalysis represents the maximum theoretical atom efficiency (100% surface exposure). The definitive experimental proof of atomic dispersion is provided by EXAFS: complete absence of the Pt-Pt metallic peak at 2.77 Å (N_Pt-Pt = 0), paired with a sharp Pt-O coordination shell at 2.01 Å.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12: Độc quyền kim loại chuyển tiếp platin trong xúc tác chuyển hóa khí thải NOx, CO; công nghệ vật liệu nano và xúc tác đơn nguyên tử.',
    synchrotronSignificance:
      'The gold standard methodology for proving single-atom catalyst integrity in nature catalysis.',
  },
  {
    id: 'lead_halide_perovskite',
    name: 'Lead Halide Perovskite (CH3NH3PbI3)',
    vietnameseName: 'Perovskite Halide Chì CH3NH3PbI3 (Phối Trí Bát Diện [PbI6]4- & Quang Điện Năng Lượng Mới)',
    absorberElement: 'Pb',
    absorberAtomicNumber: 82,
    edgeType: 'L3_EDGE',
    sampleType: 'PEROVSKITE_SEMICONDUCTOR',
    edgeEnergyE0Ev: 13035.0,
    chemicalFormula: 'CH3NH3PbI3 (MAPbI3)',
    coordinationGeometry: 'Corner-Sharing Octahedral [PbI6]4- Network',
    amplitudeReductionFactorS02: 0.90,
    meanFreePathLambdaAngstrom: 10.0,
    xanes: {
      edgeEnergyE0Ev: 13040.0,
      edgeShiftDeltaEv: 5.0,
      oxidationState: '+2',
      whiteLineEnergyEv: 13045.0,
      whiteLineIntensity: 1.48,
      preEdgePeaks: [],
      edgeStepNormalized: 1.0,
    },
    shells: [
      {
        shellIndex: 1,
        scattererElement: 'I',
        scattererAtomicNumber: 53,
        coordinationNumber: 6.0,
        radialDistanceAngstrom: 3.18, // Pb-I octahedral coordination
        debyeWallerFactorAngstromSq: 0.015, // Large thermal vibration (soft lattice)
        backscatteringAmplitudeScalar: 0.95,
        phaseShiftRadian: -0.42,
      },
      {
        shellIndex: 2,
        scattererElement: 'Pb',
        scattererAtomicNumber: 82,
        coordinationNumber: 6.0,
        radialDistanceAngstrom: 6.32, // Distant next-neighbor Pb-Pb
        debyeWallerFactorAngstromSq: 0.025,
        backscatteringAmplitudeScalar: 0.70,
        phaseShiftRadian: -0.15,
      },
    ],
    description:
      'Methylammonium lead iodide (MAPbI3) is the flagship absorber in high-efficiency (>26%) perovskite photovoltaics. Pb L3-edge EXAFS reveals the local [PbI6]4- octahedral coordination and captures large dynamic thermal disorder (sigma^2 = 0.015 Å^2) arising from soft phonon modes.',
    curriculumNotes:
      'GDPT 2018 Hóa học 10 & 12: Mạng tinh thể ion, bán dẫn vùng cấm trực tiếp, năng lượng tái tạo pin mặt trời và bảo vệ môi trường.',
    synchrotronSignificance:
      'Essential for probing local octahedral tilting and defect tolerance in organic-inorganic perovskites.',
  },
];

/**
 * Calculate photoelectron wavevector k (Angstrom^-1) from X-ray energy E (eV) and threshold E_0 (eV)
 * k = 0 if E <= E_0
 */
export function calculateWavevectorK(energyEv: number, edgeEnergyE0Ev: number): number {
  if (energyEv <= edgeEnergyE0Ev) return 0;
  return PHOTOELECTRON_K_CONVERSION_FACTOR * Math.sqrt(energyEv - edgeEnergyE0Ev);
}

/**
 * Calculate Bragg angle theta (degrees) for Si(111) double-crystal monochromator:
 * lambda = hc / E
 * 2 d sin(theta) = lambda -> sin(theta) = hc / (2 d E)
 */
export function calculateMonochromatorBraggAngleDeg(energyEv: number): number {
  if (energyEv <= 0) return 0;
  // hc in eV * Angstrom = 12398.41984
  const hcEvAngstrom = 12398.41984;
  const lambdaAngstrom = hcEvAngstrom / energyEv;
  const sinTheta = lambdaAngstrom / (2 * SILICON_111_D_SPACING_ANGSTROM);
  if (sinTheta >= 1.0) return 90.0;
  if (sinTheta <= 0.0) return 0.0;
  return (Math.asin(sinTheta) * 180) / Math.PI;
}

/**
 * Calculate EXAFS chi(k) using the standard EXAFS equation:
 * chi(k) = S_0^2 sum_j [ (N_j / (k R_j^2)) * |f_j(k)| * exp(-2 k^2 sigma_j^2) * exp(-2 R_j / lambda) * sin(2 k R_j + 2 delta_c + phi_j) ]
 */
export function calculateExafsChiK(k: number, standard: XafsStandard): number {
  if (k < 1.0) return 0.0; // Near-edge cutoff for EXAFS plane-wave approximation

  const s02 = standard.amplitudeReductionFactorS02;
  const lambda = standard.meanFreePathLambdaAngstrom;
  let totalChi = 0;

  for (const shell of standard.shells) {
    if (shell.coordinationNumber <= 0 || shell.backscatteringAmplitudeScalar <= 0) continue;

    const N = shell.coordinationNumber;
    const R = shell.radialDistanceAngstrom;
    const sigmaSq = shell.debyeWallerFactorAngstromSq;

    // Amplitude term: (N / (k * R^2)) * |f(k)|
    // |f(k)| has a typical envelope that peaks around k ~ 5-7 A^-1
    const fEnvelope = shell.backscatteringAmplitudeScalar * (k / (1 + 0.05 * k * k));
    const geometricFactor = N / (k * R * R);

    // Debye-Waller damping: exp(-2 k^2 sigma^2)
    const debyeWallerDamping = Math.exp(-2 * k * k * sigmaSq);

    // Mean free path damping: exp(-2 R / lambda)
    const meanFreePathDamping = Math.exp((-2 * R) / lambda);

    // Phase oscillation: sin(2 k R + phi)
    const phase = 2 * k * R + shell.phaseShiftRadian;
    const oscillation = Math.sin(phase);

    const shellContribution = s02 * geometricFactor * fEnvelope * debyeWallerDamping * meanFreePathDamping * oscillation;
    totalChi += shellContribution;
  }

  return totalChi;
}

/**
 * Generate full continuous XAFS energy scan (from E_0 - 40 eV to E_0 + 600 eV)
 */
export function generateXafsEnergyScan(
  standard: XafsStandard,
  energyStartEv?: number,
  energyEndEv?: number,
  stepEv: number = 1.0
): XafsSpectrumPoint[] {
  const e0 = standard.xanes.edgeEnergyE0Ev;
  const start = energyStartEv !== undefined ? energyStartEv : e0 - 40;
  const end = energyEndEv !== undefined ? energyEndEv : e0 + 600;

  const points: XafsSpectrumPoint[] = [];

  for (let e = start; e <= end; e += stepEv) {
    const deltaE = e - e0;
    let mu = 0;

    // 1. Base edge step modeled with arctan function
    // arctan(deltaE / gamma): normalized step from 0 (far below) to 1.0 (above edge)
    const edgeJumpWidth = 3.5; // eV
    const baseStep = 0.5 + Math.atan(deltaE / edgeJumpWidth) / Math.PI;

    // 2. Pre-edge features (Lorentzian peaks)
    let preEdgeContribution = 0;
    for (const pre of standard.xanes.preEdgePeaks) {
      const preDist = e - pre.energyEv;
      const preHwhm = 1.2;
      preEdgeContribution += pre.relativeIntensity / (1 + (preDist * preDist) / (preHwhm * preHwhm));
    }

    // 3. White line feature (intense transition right at edge)
    const wlDist = e - standard.xanes.whiteLineEnergyEv;
    const wlHwhm = 4.0;
    const wlExcess = Math.max(0, standard.xanes.whiteLineIntensity - 1.0);
    const whiteLineContribution = (wlExcess * 1.5) / (1 + (wlDist * wlDist) / (wlHwhm * wlHwhm));

    // 4. Smooth EXAFS oscillatory contribution for deltaE > 30 eV
    const k = calculateWavevectorK(e, e0);
    let chi = 0;
    if (k >= 1.5) {
      chi = calculateExafsChiK(k, standard);
    }

    // Modulation above edge: mu(E) = baseStep * (1 + chi(k)) + whiteLine + preEdge
    // Smooth transition from XANES to EXAFS
    const exafsWeight = deltaE > 40 ? Math.min(1.0, (deltaE - 40) / 20) : 0;
    mu = baseStep + preEdgeContribution + whiteLineContribution + baseStep * chi * exafsWeight;

    // Numerical sanity clamp
    mu = Math.max(0.01, mu);

    const k1Chi = k * chi;
    const k2Chi = k * k * chi;
    const k3Chi = k * k * k * chi;

    points.push({
      energyEv: Math.round(e * 10) / 10,
      absorptionMu: mu,
      kWavevector: Math.round(k * 100) / 100,
      chiK: chi,
      k1ChiK: k1Chi,
      k2ChiK: k2Chi,
      k3ChiK: k3Chi,
    });
  }

  return points;
}

/**
 * Numerical Discrete Fourier Transform of k^n * chi(k) into R-space (pseudo-radial structure function)
 * FT[k^n chi(k) W(k)] -> |chi(R)| vs R (from 0 to 6.0 Angstrom)
 */
export function calculateFourierTransformRSpace(
  spectrum: XafsSpectrumPoint[],
  standard: XafsStandard,
  kWeight: 1 | 2 | 3 = 2,
  kMin: number = 2.0,
  kMax: number = 12.0
): RSpaceDistributionPoint[] {
  // Filter valid k points within [kMin, kMax]
  const validPoints = spectrum.filter((p) => p.kWavevector >= kMin && p.kWavevector <= kMax);
  if (validPoints.length < 5) {
    // Fallback if spectrum range was narrow
    return [];
  }

  const rPoints: RSpaceDistributionPoint[] = [];
  const rMin = 0.5;
  const rMax = 6.0;
  const rStep = 0.05;

  const dk = validPoints.length > 1 ? (kMax - kMin) / validPoints.length : 0.05;

  for (let r = rMin; r <= rMax; r += rStep) {
    let sumReal = 0;
    let sumImag = 0;

    for (const pt of validPoints) {
      const k = pt.kWavevector;
      // Hanning window W(k) = 0.5 * (1 - cos(2 pi (k - kMin) / (kMax - kMin)))
      const hanning = 0.5 * (1 - Math.cos((2 * Math.PI * (k - kMin)) / (kMax - kMin)));

      const knChi =
        kWeight === 1 ? pt.k1ChiK : kWeight === 2 ? pt.k2ChiK : pt.k3ChiK;

      const weighted = knChi * hanning;
      // Phase term: exp(2 i k R) -> cos(2 k R) + i sin(2 k R)
      const phase = 2 * k * r;
      sumReal += weighted * Math.cos(phase) * dk;
      sumImag += weighted * Math.sin(phase) * dk;
    }

    const magnitude = Math.sqrt(sumReal * sumReal + sumImag * sumImag);

    rPoints.push({
      radialDistanceR: Math.round(r * 100) / 100,
      radialMagnitude: magnitude,
      realComponent: sumReal,
      imaginaryComponent: sumImag,
    });
  }

  return rPoints;
}

/**
 * Simulate end-to-end synchrotron XAFS experiment for a given standard and incident energy
 */
export function simulateXafsExperiment(
  standard: XafsStandard,
  incidentEnergyEv: number
): XafsSimulationResult {
  const e0 = standard.xanes.edgeEnergyE0Ev;
  const thetaDeg = calculateMonochromatorBraggAngleDeg(incidentEnergyEv);
  const k = calculateWavevectorK(incidentEnergyEv, e0);
  const chi = k >= 1.5 ? calculateExafsChiK(k, standard) : 0;

  const spectrum = generateXafsEnergyScan(standard);
  const rSpace = calculateFourierTransformRSpace(spectrum, standard, 2);

  // Find absorption at current incident energy
  const closestPoint = spectrum.reduce((prev, curr) =>
    Math.abs(curr.energyEv - incidentEnergyEv) < Math.abs(prev.energyEv - incidentEnergyEv) ? curr : prev
  );

  const mu = closestPoint.absorptionMu;
  // Transmitted intensity I_t = I_0 * exp(-mu * x), assuming optimal sample thickness mu * x ~ 1.0
  const transmittedPercent = Math.max(1, Math.min(100, Math.exp(-mu) * 100));

  const dominantShellsSummary = standard.shells.map((s) => ({
    shellIndex: s.shellIndex,
    element: s.scattererElement,
    distanceA: s.radialDistanceAngstrom,
    coordinationNumber: s.coordinationNumber,
  }));

  return {
    standard,
    incidentEnergyEv,
    monochromatorAngleDeg: Math.round(thetaDeg * 100) / 100,
    transmittedIntensityPercent: Math.round(transmittedPercent * 10) / 10,
    absorptionCoefficientMu: Math.round(mu * 1000) / 1000,
    currentK: Math.round(k * 100) / 100,
    currentChiK: Math.round(chi * 10000) / 10000,
    spectrumCurve: spectrum,
    rSpaceDistribution: rSpace,
    dominantShellsSummary,
  };
}

/**
 * Match card to appropriate XAFS standard
 */
export function getMatchingXafsCard(card: any): XafsStandard | null {
  if (!card) return null;
  const cardName = (card.name || '').toLowerCase();
  const cardFormula = (card.formula || '').toLowerCase();
  const cardCategory = (card.category || '').toLowerCase();
  const cardElement = (card.elementSymbol || card.symbol || '').toUpperCase();

  // 1. Copper (Cu K-edge)
  if (cardElement === 'CU' || cardName.includes('đồng') || cardName.includes('copper') || cardFormula.includes('cu')) {
    return XAFS_STANDARD_CATALOG.find((s) => s.id === 'cu_foil_reference') || null;
  }

  // 2. Iron / Hematite (Fe K-edge)
  if (
    cardElement === 'FE' ||
    cardName.includes('sắt') ||
    cardName.includes('iron') ||
    cardFormula.includes('fe2o3') ||
    cardFormula.includes('feo') ||
    cardFormula.includes('fe3o4')
  ) {
    return XAFS_STANDARD_CATALOG.find((s) => s.id === 'iron_oxide_hematite') || null;
  }

  // 3. Manganese / Photosystem (Mn K-edge)
  if (
    cardElement === 'MN' ||
    cardName.includes('mangan') ||
    cardName.includes('manganese') ||
    cardName.includes('quang hợp') ||
    cardName.includes('photosystem') ||
    cardFormula.includes('mn')
  ) {
    return XAFS_STANDARD_CATALOG.find((s) => s.id === 'photosystem2_oxygen_evolving_complex') || null;
  }

  // 4. Platinum / Single-Atom Catalyst (Pt L3-edge)
  if (
    cardElement === 'PT' ||
    cardName.includes('platin') ||
    cardName.includes('platinum') ||
    cardName.includes('xúc tác') ||
    cardFormula.includes('pt')
  ) {
    return XAFS_STANDARD_CATALOG.find((s) => s.id === 'platinum_single_atom_catalyst') || null;
  }

  // 5. Lead / Perovskite (Pb L3-edge)
  if (
    cardElement === 'PB' ||
    cardName.includes('chì') ||
    cardName.includes('lead') ||
    cardName.includes('perovskite') ||
    cardFormula.includes('pb')
  ) {
    return XAFS_STANDARD_CATALOG.find((s) => s.id === 'lead_halide_perovskite') || null;
  }

  return null;
}

/**
 * Validate physical consistency of XAFS standard (assertion helper)
 */
export function validateXafsStandardPhysics(standard: XafsStandard): boolean {
  if (standard.edgeEnergyE0Ev <= 0) return false;
  if (standard.amplitudeReductionFactorS02 <= 0 || standard.amplitudeReductionFactorS02 > 1.2) return false;
  if (standard.meanFreePathLambdaAngstrom <= 0) return false;
  if (standard.shells.length === 0) return false;

  for (const shell of standard.shells) {
    if (shell.radialDistanceAngstrom <= 0 || shell.radialDistanceAngstrom > 10) return false;
    if (shell.debyeWallerFactorAngstromSq < 0 || shell.debyeWallerFactorAngstromSq > 0.1) return false;
    if (shell.coordinationNumber < 0 || shell.coordinationNumber > 50) return false;
  }

  return true;
}
