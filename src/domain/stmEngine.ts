/**
 * ELEMENTA - Scanning Tunneling Microscopy (STM), Quantum Tunneling & Tersoff-Hamann LDOS Engine
 *
 * Biophysical & Nanotechnology Standards:
 * - Nobel Prize in Physics 1986:
 *     Gerd Binnig & Heinrich Rohrer (IBM Zurich Research Laboratory)
 *     "for their design of the scanning tunneling microscope".
 * - Quantum Mechanical Tunneling:
 *     - Electron wave function decay across vacuum barrier of width d:
 *         I_t ∝ V_bias · exp(-2 κ d)
 *     - Decay constant:
 *         κ = √(2m·Φ) / ℏ ≈ 0.512 · √(Φ (eV)) Å⁻¹
 *     - For typical work function Φ ≈ 4.5 eV:
 *         κ ≈ 1.1 Å⁻¹  =>  2κ ≈ 2.2 Å⁻¹
 *         exp(-2.2 · 1.0 Å) ≈ 0.11 ≈ 1/10 (tenfold drop per 1 Å separation!).
 *     - Enables 0.01 Å (1 pm) vertical resolution.
 * - Tersoff-Hamann Theory (1983, 1985):
 *     - Tunneling current images the Local Density of States (LDOS) at Fermi energy ρ(r₀, E_F)
 *       rather than nuclear positions.
 * - Scanning Tunneling Spectroscopy (STS):
 *     - Differential conductance dI/dV directly measures LDOS:
 *         (dI/dV) / (I/V) ∝ ρ_sample(E_F + e·V_bias)
 *     - Resolves semiconductor band gaps, van Hove singularities, and surface states.
 * - Curriculum: Vietnam GDPT 2018 (Vật lý 12: Hiệu ứng xuyên ngầm lượng tử, hàm sóng, vật liệu nano; Hóa học 10 & 12: Orbital nguyên tử, cấu trúc than chì HOPG).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 69)
 */

export const PLANCK_H_BAR = 1.054571817e-34; // J·s
export const ELECTRON_MASS_KG = 9.1093837e-31; // kg
export const ELECTRON_CHARGE_COULOMB = 1.602176634e-19; // C

export interface StmGridPoint {
  xAngstroms: number;
  yAngstroms: number;
  apparentHeightAngstroms: number; // Topographic z in Å
  localDosValue: number; // Arbitrary units proportional to LDOS
}

export interface StsConductancePoint {
  biasVoltageVolts: number; // e.g. -2.0 V to +2.0 V
  tunnelingCurrentNanoAmps: number; // I(V) in nA
  differentialConductanceDiDv: number; // dI/dV in µS or a.u.
  isBandGapRegion: boolean;
}

export interface StmSpecimenStandard {
  id: string;
  name: string;
  vietnameseName: string;
  materialType: 'SEMICONDUCTOR_SURFACE' | '2D_HONEYCOMB_GRAPHITE' | 'NOBLE_METAL_RECONSTRUCTION' | '1D_CARBON_NANOTUBE' | 'QUANTUM_CORRAL';
  workFunctionEv: number; // Φ in eV (typically 4.2 - 5.1 eV)
  typicalBiasVoltageVolts: number;
  setpointCurrentNanoAmps: number;
  bandGapEv?: number; // Electronic band gap
  gridSizeAngstroms: number; // e.g. 20 Å x 20 Å
  atomicFeaturesDescription: string;
  description: string;
  curriculumNotes: string;
}

export interface StmSimulationResult {
  specimen: StmSpecimenStandard;
  tipSampleDistanceAngstroms: number; // d in Å (typically 4.0 - 8.0 Å)
  decayConstantKappaAngstromInv: number; // κ
  tunnelingCurrentNanoAmps: number; // I_t
  topographyGrid: StmGridPoint[][]; // 2D height map
  spectroscopyCurve: StsConductancePoint[]; // dI/dV curve
  subAngstromSensitivityRatio: number; // Current change per 1 Å
}

export const STM_SPECIMEN_CATALOG: StmSpecimenStandard[] = [
  {
    id: 'si111_7x7_reconstruction',
    name: 'Silicon Si(111)-7×7 Dimer-Adatom-Stacking Fault (DAS) Reconstruction',
    vietnameseName: 'Bề Mặt Silic Si(111)-7×7 Tái Cấu Trúc DAS (Takayanagi 1985)',
    materialType: 'SEMICONDUCTOR_SURFACE',
    workFunctionEv: 4.8,
    typicalBiasVoltageVolts: +1.5,
    setpointCurrentNanoAmps: 1.0,
    bandGapEv: 1.12,
    gridSizeAngstroms: 46.0, // 7x7 unit cell ~ 26.9 Å side
    atomicFeaturesDescription: '12 adatoms per unit cell, 6 rest atoms, 1 deep corner hole, and stacking fault half.',
    description: 'Iconic atomic reconstruction of the Si(111) surface solved by STM. Demonstrates that bias polarity selects empty states (+1.5 V, adatoms bright) vs filled states (-1.5 V, rest atoms visible).',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 11: Cấu trúc tinh thể mạng cộng hóa trị của Silic; Vật lý 12: Bán dẫn loại p/n, khe vùng năng lượng và hiệu ứng xuyên ngầm lượng tử.'
  },
  {
    id: 'hopg_graphite_honeycomb',
    name: 'Highly Oriented Pyrolytic Graphite (HOPG) Atomic Triad Sublattice',
    vietnameseName: 'Than Chì HOPG Định Hướng Cao (Bất Đối Xứng Mạng Con α/β)',
    materialType: '2D_HONEYCOMB_GRAPHITE',
    workFunctionEv: 4.6,
    typicalBiasVoltageVolts: 0.25,
    setpointCurrentNanoAmps: 0.8,
    bandGapEv: 0.0, // Semi-metal
    gridSizeAngstroms: 20.0,
    atomicFeaturesDescription: 'Only every second carbon atom (β-site, 2.46 Å spacing) is visible due to interlayer interaction with α-site below.',
    description: 'Universal STM calibration standard. Shows the fundamental quantum principle of STM: the tip images electronic LDOS rather than nuclear positions; α-carbon atoms directly above atoms in the second layer have lower LDOS at E_F and appear dark.',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 12: Dạng thù hình than chì (graphite), liên kết π giải tỏa và liên kết Van der Waals giữa các lớp graphene.'
  },
  {
    id: 'au111_herringbone_reconstruction',
    name: 'Gold Au(111)-(22×√3) Herringbone Reconstruction & Shockley Surface State',
    vietnameseName: 'Bề Mặt Vàng Au(111) Tái Cấu Trúc Xương Cá Herringbone & Trạng Thái Mặt Shockley',
    materialType: 'NOBLE_METAL_RECONSTRUCTION',
    workFunctionEv: 5.3,
    typicalBiasVoltageVolts: 0.5,
    setpointCurrentNanoAmps: 1.2,
    bandGapEv: 0.0,
    gridSizeAngstroms: 60.0,
    atomicFeaturesDescription: 'Periodic pair of soliton dislocation ridges with 63 Å period separating hcp and fcc surface domains.',
    description: 'Clean noble metal reconstruction. 23 surface atoms compress onto 22 bulk atom sites, creating stress-relieving herringbone elbows that serve as atomic templates for molecular self-assembly.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Mạng tinh thể kim loại lập phương tâm diện (fcc) của Vàng; Vật lý 12: Sóng điện tử bề mặt 2 chiều.'
  },
  {
    id: 'swcnt_van_hove_singularities',
    name: 'Single-Walled Carbon Nanotube (SWCNT) 1D van Hove Singularities',
    vietnameseName: 'Ống Nano Carbon Đơn Vách (SWCNT) & Kỳ Dị van Hove 1 Chiều',
    materialType: '1D_CARBON_NANOTUBE',
    workFunctionEv: 4.9,
    typicalBiasVoltageVolts: 0.8,
    setpointCurrentNanoAmps: 0.5,
    bandGapEv: 0.75, // Semiconducting chiral tube
    gridSizeAngstroms: 30.0,
    atomicFeaturesDescription: 'Atomic carbon hexagon helical pitch determined by chiral vector (n, m).',
    description: 'Atomic-resolution imaging of a carbon nanotube cylinder. dI/dV spectroscopy reveals 1D density of states divergence peaks (van Hove singularities) directly confirming quantum confinement in 1D nanomaterials.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Vật liệu nano carbon (Fullerene, Nanotube, Graphene); Vật lý 12: Lượng tử hóa mức năng lượng.'
  },
  {
    id: 'quantum_corral_fe_cu111',
    name: 'Quantum Corral: 48 Iron Atoms on Cu(111) Surface (Crommie-Lutz-Eigler 1993)',
    vietnameseName: 'Chuồng Lượng Tử: 48 Nguyên Tử Sắt Trên Đồng Cu(111) (Eigler 1993)',
    materialType: 'QUANTUM_CORRAL',
    workFunctionEv: 4.5,
    typicalBiasVoltageVolts: 0.01,
    setpointCurrentNanoAmps: 1.0,
    bandGapEv: 0.0,
    gridSizeAngstroms: 140.0,
    atomicFeaturesDescription: '48 Fe atoms placed in a circle of 71.3 Å radius, trapping surface electron waves into Bessel function rings.',
    description: 'Iconic demonstration of atom manipulation with the STM tip. Standing electron waves trapped inside the iron ring create quantum mechanical probability density interference fringes J₀²(k_F · r).',
    curriculumNotes: 'GDPT 2018 Vật lý 12: Sóng vật chất de Broglie, hàm sóng electron và thí nghiệm thao tác từng nguyên tử bằng đầu dò lượng tử.'
  }
];

/**
 * Calculates quantum mechanical vacuum decay constant κ (Å⁻¹):
 * κ = √(2m·Φ) / ℏ = 0.512 · √(Φ) Å⁻¹
 */
export function calculateTunnelingDecayConstant(workFunctionEv: number): number {
  const phi = Math.max(1.0, workFunctionEv);
  const kappa = 0.512 * Math.sqrt(phi);
  return Number(kappa.toFixed(3));
}

/**
 * Calculates Tunneling Current I_t:
 * I_t = I_0 · V_bias · exp(-2 κ (d - d_0))
 */
export function calculateTunnelingCurrent(
  biasVoltageVolts: number,
  tipSampleDistanceAngstroms: number,
  workFunctionEv: number
): number {
  const kappa = calculateTunnelingDecayConstant(workFunctionEv);
  const d = Math.max(2.0, tipSampleDistanceAngstroms);
  // Reference distance d_0 = 5.0 Å gives ~1.0 nA at 1.0 V
  const deltaD = d - 5.0;
  const current = Math.abs(biasVoltageVolts) * Math.exp(-2 * kappa * deltaD);
  return Number(Math.max(0.001, current).toFixed(3));
}

/**
 * Simulates STM Topographic Image Grid and STS Spectroscopy
 */
export function simulateStmExperiment(
  specimenId: string,
  tipDistanceAngstroms: number = 5.0,
  biasVoltageVolts?: number
): StmSimulationResult {
  const specimen = STM_SPECIMEN_CATALOG.find((s) => s.id === specimenId) || STM_SPECIMEN_CATALOG[0];
  const bias = biasVoltageVolts !== undefined ? biasVoltageVolts : specimen.typicalBiasVoltageVolts;
  const kappa = calculateTunnelingDecayConstant(specimen.workFunctionEv);
  const currentNa = calculateTunnelingCurrent(bias, tipDistanceAngstroms, specimen.workFunctionEv);

  // Sub-angstrom sensitivity: ratio of current at d vs d + 1 Å
  const sensitivityRatio = Number(Math.exp(2 * kappa * 1.0).toFixed(1));

  // Generate 24x24 Topography Grid
  const res = 24;
  const topographyGrid: StmGridPoint[][] = [];
  const size = specimen.gridSizeAngstroms;

  for (let iy = 0; iy < res; iy++) {
    const row: StmGridPoint[] = [];
    const y = (iy / (res - 1)) * size;

    for (let ix = 0; ix < res; ix++) {
      const x = (ix / (res - 1)) * size;
      let height = 0;
      let ldos = 0;

      if (specimen.id === 'hopg_graphite_honeycomb') {
        // Hexagonal honeycomb periodicity: a = 2.46 Å
        const a = 2.46;
        const wave1 = Math.cos((2 * Math.PI * x) / a);
        const wave2 = Math.cos((2 * Math.PI * (x * 0.5 + y * 0.866)) / a);
        const wave3 = Math.cos((2 * Math.PI * (-x * 0.5 + y * 0.866)) / a);
        const sum = (wave1 + wave2 + wave3) / 3.0;
        height = Number((0.2 + 0.35 * Math.max(0, sum)).toFixed(2));
        ldos = Number((0.5 + 0.5 * sum).toFixed(2));
      } else if (specimen.id === 'quantum_corral_fe_cu111') {
        // Circular standing waves J_0(k_F * r)
        const cx = size / 2;
        const cy = size / 2;
        const r = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
        const kF = 0.38; // Fermi wave vector
        const besselApprox = Math.cos(kF * r) / Math.sqrt(Math.max(1, r * 0.15));
        height = Number((0.4 + 0.3 * besselApprox).toFixed(2));
        ldos = Number((0.5 + 0.4 * besselApprox).toFixed(2));
      } else {
        // Si(111)-7x7 / General semiconductor grid
        const period = 7.0;
        const bump = Math.sin((x * Math.PI) / period) * Math.cos((y * Math.PI) / period);
        height = Number((0.3 + 0.45 * Math.pow(Math.abs(bump), 1.5)).toFixed(2));
        ldos = Number((0.4 + 0.6 * Math.abs(bump)).toFixed(2));
      }

      row.push({
        xAngstroms: Number(x.toFixed(2)),
        yAngstroms: Number(y.toFixed(2)),
        apparentHeightAngstroms: height,
        localDosValue: ldos
      });
    }
    topographyGrid.push(row);
  }

  // Generate STS (dI/dV) Conductance Spectroscopy Curve (-2.0 V to +2.0 V)
  const spectroscopyCurve: StsConductancePoint[] = [];
  const gap = specimen.bandGapEv || 0.0;
  const halfGap = gap / 2.0;

  for (let v = -2.0; v <= 2.0; v += 0.05) {
    const isGap = gap > 0 && Math.abs(v) < halfGap;
    let didv = 0;

    if (isGap) {
      didv = 0.02 + Math.random() * 0.01; // Insulating inside gap
    } else {
      const overVolt = Math.abs(v) - halfGap;
      didv = Number((0.2 + 1.8 * Math.pow(overVolt, 1.3)).toFixed(2));
    }

    const current = Number((v * didv * 0.4).toFixed(3));

    spectroscopyCurve.push({
      biasVoltageVolts: Number(v.toFixed(2)),
      tunnelingCurrentNanoAmps: current,
      differentialConductanceDiDv: didv,
      isBandGapRegion: isGap
    });
  }

  return {
    specimen,
    tipSampleDistanceAngstroms: tipDistanceAngstroms,
    decayConstantKappaAngstromInv: kappa,
    tunnelingCurrentNanoAmps: currentNa,
    topographyGrid,
    spectroscopyCurve,
    subAngstromSensitivityRatio: sensitivityRatio
  };
}

/**
 * Intelligent Card Matcher for STM & Quantum Tunneling Systems
 */
export function getMatchingStmCard(card: { id?: string; name?: string; category?: string }): StmSpecimenStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('silicon') || target.includes('si(111)') || target.includes('7x7') || target.includes('adatom') || target.includes('das')) {
    return STM_SPECIMEN_CATALOG.find((s) => s.id === 'si111_7x7_reconstruction') || null;
  }
  if (target.includes('hopg') || target.includes('graphite') || target.includes('graphene') || target.includes('honeycomb') || target.includes('carbon layer')) {
    return STM_SPECIMEN_CATALOG.find((s) => s.id === 'hopg_graphite_honeycomb') || null;
  }
  if (target.includes('gold') || target.includes('au(111)') || target.includes('herringbone') || target.includes('shockley')) {
    return STM_SPECIMEN_CATALOG.find((s) => s.id === 'au111_herringbone_reconstruction') || null;
  }
  if (target.includes('nanotube') || target.includes('swcnt') || target.includes('van hove') || target.includes('chiral tube')) {
    return STM_SPECIMEN_CATALOG.find((s) => s.id === 'swcnt_van_hove_singularities') || null;
  }
  if (target.includes('corral') || target.includes('quantum corral') || target.includes('bessel') || target.includes('eigler') || target.includes('standing wave')) {
    return STM_SPECIMEN_CATALOG.find((s) => s.id === 'quantum_corral_fe_cu111') || null;
  }

  // Fallback
  if (target.includes('stm') || target.includes('tunneling') || target.includes('tunnel') || target.includes('quantum') || target.includes('ldos')) {
    return STM_SPECIMEN_CATALOG[0];
  }

  return null;
}
