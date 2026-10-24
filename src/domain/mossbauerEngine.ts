// src/domain/mossbauerEngine.ts
// Milestone 72: Mössbauer Spectroscopy, Recoilless Nuclear Gamma Resonance & Hyperfine Interactions Engine
// Standards: Rudolf L. Mössbauer (Nobel Prize in Physics 1961) & 57Fe Nuclear Hyperfine Metrology
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 12: Cấu hình electron nguyên tử sắt [Ar]3d6 4s2, trạng thái oxy hóa Fe2+ và Fe3+, phức chất phối trí của sắt trong hemoglobin và ferrocene; Vật lý 12: Phản ứng hạt nhân, bức xạ gamma, hiệu ứng Doppler, từ trường trong vật liệu sắt từ)

export const GAMMA_ENERGY_EV = 14412.5; // 14.4125 keV 57Fe nuclear transition
export const HEISENBERG_NATURAL_LINEWIDTH_EV = 4.665e-9; // 4.665 neV
export const NATURAL_LINEWIDTH_MM_PER_SEC = 0.194; // 2 * Gamma_0 / E_gamma * c
export const SPEED_OF_LIGHT_MM_PER_SEC = 2.99792458e11; // mm/s
export const RECOIL_ENERGY_FREE_ATOM_MEV = 1.956; // 1.956 meV for free 57Fe atom

export interface MossbauerResonancePeak {
  velocityMmPerSec: number; // Peak position in Doppler velocity (mm/s)
  absorptionDepthPercent: number; // % resonant transmission reduction
  linewidthFwhmMmPerSec: number; // Full-width at half maximum
  transitionSublevels: string; // e.g. "-1/2 -> -3/2"
}

export interface MossbauerSubspectrum {
  label: string; // e.g. "Fe3+ Tetrahedral", "Fe(II) High-Spin"
  fractionPercent: number; // Relative area under curve (0 to 100%)
  isomerShiftDeltaMmPerSec: number; // delta in mm/s
  quadrupoleSplittingDeltaEqMmPerSec: number; // Delta E_Q in mm/s
  magneticHyperfineFieldTesla: number; // B_hf in Tesla
  resonancePeaks: MossbauerResonancePeak[];
}

export interface MossbauerSpectrumPoint {
  dopplerVelocityMmPerSec: number; // Velocity axis (-10 to +10 mm/s)
  relativeTransmissionPercent: number; // Transmitted gamma count (90% to 100%)
  isAtResonancePeak: boolean;
}

export interface MossbauerStandard {
  id: string;
  name: string;
  vietnameseName: string;
  ironChemicalSystem: 'METALLIC_FERROMAGNET' | 'BIOINORGANIC_HEME' | 'MIXED_VALENCE_OXIDE' | 'ORGANOMETALLIC_SANDWICH' | 'PLANETARY_MINERAL';
  ironOxidationState: 'Fe(0)' | 'Fe(II)' | 'Fe(III)' | 'Fe(II/III) Mixed';
  spinState: 'HIGH_SPIN_S_2' | 'LOW_SPIN_S_0' | 'FERROMAGNETIC' | 'FERRIMAGNETIC';
  coordinationGeometry: string;
  debyeTemperatureKelvin: number; // theta_D (280 - 450 K)
  recoillessFractionPercent: number; // Lamb-Mössbauer factor f
  subspectra: MossbauerSubspectrum[];
  description: string;
  curriculumNotes: string;
  nobelCitation: string;
}

export interface MossbauerSimulationResult {
  standard: MossbauerStandard;
  currentDopplerVelocityMmPerSec: number;
  gammaEnergyShiftNanoEv: number; // delta E = E_gamma * (v / c)
  recoillessFractionPercent: number;
  currentSpectrumPoint: MossbauerSpectrumPoint;
  spectrumCurve: MossbauerSpectrumPoint[];
  closestPeakDistanceMmPerSec: number;
  isResonanceAchieved: boolean; // True within 0.1 mm/s of a peak
}

export const MOSSBAUER_SPECIMEN_CATALOG: MossbauerStandard[] = [
  {
    id: 'alpha_iron_metal_foil',
    name: 'Natural Alpha-Iron (α-Fe) Primary Calibration Foil',
    vietnameseName: 'Lá Sắt Kim Loại α-Fe (Chuẩn Hiệu Chuẩn Doppler 33 Tesla, 6 Đỉnh Đối Xứng)',
    ironChemicalSystem: 'METALLIC_FERROMAGNET',
    ironOxidationState: 'Fe(0)',
    spinState: 'FERROMAGNETIC',
    coordinationGeometry: 'BCC Body-Centered Cubic Metal Lattice (CN = 8)',
    debyeTemperatureKelvin: 470,
    recoillessFractionPercent: 78.5,
    subspectra: [
      {
        label: 'α-Fe Ferromagnetic Sextet',
        fractionPercent: 100.0,
        isomerShiftDeltaMmPerSec: 0.0, // Definition of zero velocity
        quadrupoleSplittingDeltaEqMmPerSec: 0.0, // Cubic symmetry V_zz = 0
        magneticHyperfineFieldTesla: 33.0, // 330 kOe at 295 K
        resonancePeaks: [
          { velocityMmPerSec: -5.328, absorptionDepthPercent: 12.0, linewidthFwhmMmPerSec: 0.26, transitionSublevels: '-1/2 → -3/2' },
          { velocityMmPerSec: -3.076, absorptionDepthPercent: 8.0, linewidthFwhmMmPerSec: 0.26, transitionSublevels: '-1/2 → -1/2' },
          { velocityMmPerSec: -0.840, absorptionDepthPercent: 4.0, linewidthFwhmMmPerSec: 0.26, transitionSublevels: '-1/2 → +1/2' },
          { velocityMmPerSec: 0.840, absorptionDepthPercent: 4.0, linewidthFwhmMmPerSec: 0.26, transitionSublevels: '+1/2 → -1/2' },
          { velocityMmPerSec: 3.076, absorptionDepthPercent: 8.0, linewidthFwhmMmPerSec: 0.26, transitionSublevels: '+1/2 → +1/2' },
          { velocityMmPerSec: 5.328, absorptionDepthPercent: 12.0, linewidthFwhmMmPerSec: 0.26, transitionSublevels: '+1/2 → +3/2' }
        ]
      }
    ],
    description: 'The international primary standard for Mössbauer spectrometer velocity calibration. Ferromagnetic body-centered cubic iron produces an internal nuclear magnetic field of 33.0 Tesla, splitting nuclear gamma levels into a classic 6-line sextet with theoretical intensity ratios 3 : 2 : 1 : 1 : 2 : 3.',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 12: Cấu tạo kim loại chuyển tiếp Sắt (Z=26), mạng tinh thể lập phương tâm khối (BCC); Vật lý 12: Từ trường trong vật liệu sắt từ, hiện tượng Zeeman hạt nhân và hiệu ứng Doppler.',
    nobelCitation: 'Rudolf L. Mössbauer, Nobel Prize in Physics 1961: "For his researches concerning the resonance absorption of gamma radiation and his discovery in this connection of the effect which bears his name".'
  },
  {
    id: 'deoxy_hemoglobin_high_spin',
    name: 'Deoxy-Hemoglobin Fe(II) High-Spin Bioinorganic Active Center',
    vietnameseName: 'Trung Tâm Hoạt Động Deoxy-Hemoglobin Sắt(II) Spin Cao (S=2, Tứ Cực Khổng Lồ 2.4 mm/s)',
    ironChemicalSystem: 'BIOINORGANIC_HEME',
    ironOxidationState: 'Fe(II)',
    spinState: 'HIGH_SPIN_S_2',
    coordinationGeometry: 'Porphyrin Five-Coordinate Dome (Fe displaced 0.4 Å out of plane)',
    debyeTemperatureKelvin: 310,
    recoillessFractionPercent: 62.0,
    subspectra: [
      {
        label: 'Deoxy-Hb Fe(II) High-Spin Doublet',
        fractionPercent: 100.0,
        isomerShiftDeltaMmPerSec: 0.92, // High isomer shift characteristic of Fe2+ (reduced s-density)
        quadrupoleSplittingDeltaEqMmPerSec: 2.40, // Huge EFG from non-spherical d-shell
        magneticHyperfineFieldTesla: 0.0, // Paramagnetic at room temp
        resonancePeaks: [
          { velocityMmPerSec: -0.28, absorptionDepthPercent: 9.5, linewidthFwhmMmPerSec: 0.28, transitionSublevels: '±1/2 → ±1/2' },
          { velocityMmPerSec: 2.12, absorptionDepthPercent: 9.5, linewidthFwhmMmPerSec: 0.28, transitionSublevels: '±1/2 → ±3/2' }
        ]
      }
    ],
    description: 'Bioinorganic iron active site in deoxygenated red blood cells. The high-spin Fe(II) ion (S=2, d6) is displaced 0.4 Å out of the porphyrin plane. The asymmetric valence d-electron population creates a massive electric field gradient (EFG), producing a widely split quadrupole doublet (ΔE_Q = 2.40 mm/s) with large isomer shift (0.92 mm/s).',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Phức chất phối trí porphyrin chứa Fe(II) trong hemoglobin; Sinh học 11: Chức năng vận chuyển khí O2 và CO2 của hồng cầu trong hệ tuần hoàn.',
    nobelCitation: 'Rudolf L. Mössbauer, Nobel Prize in Physics 1961: Application of recoilless nuclear resonance to biological macromolecules.'
  },
  {
    id: 'magnetite_verwey_charge_ordering',
    name: 'Magnetite (Fe3O4) Inverse Spinel & Verwey Charge-Ordering Transition',
    vietnameseName: 'Quặng Từ Tính Magnetite (Fe3O4) Spinel Ngược & Chuyển Pha Trật Tự Điện Tích Verwey',
    ironChemicalSystem: 'MIXED_VALENCE_OXIDE',
    ironOxidationState: 'Fe(II/III) Mixed',
    spinState: 'FERRIMAGNETIC',
    coordinationGeometry: 'Tetrahedral [Fe3+]A and Octahedral [Fe2+Fe3+]B Inverse Spinel',
    debyeTemperatureKelvin: 420,
    recoillessFractionPercent: 74.0,
    subspectra: [
      {
        label: 'Tetrahedral A-site Fe3+',
        fractionPercent: 33.3,
        isomerShiftDeltaMmPerSec: 0.27,
        quadrupoleSplittingDeltaEqMmPerSec: 0.02,
        magneticHyperfineFieldTesla: 49.1,
        resonancePeaks: [
          { velocityMmPerSec: -7.52, absorptionDepthPercent: 5.0, linewidthFwhmMmPerSec: 0.32, transitionSublevels: 'A-site 1' },
          { velocityMmPerSec: -4.38, absorptionDepthPercent: 3.3, linewidthFwhmMmPerSec: 0.32, transitionSublevels: 'A-site 2' },
          { velocityMmPerSec: -1.22, absorptionDepthPercent: 1.7, linewidthFwhmMmPerSec: 0.32, transitionSublevels: 'A-site 3' },
          { velocityMmPerSec: 1.76, absorptionDepthPercent: 1.7, linewidthFwhmMmPerSec: 0.32, transitionSublevels: 'A-site 4' },
          { velocityMmPerSec: 4.92, absorptionDepthPercent: 3.3, linewidthFwhmMmPerSec: 0.32, transitionSublevels: 'A-site 5' },
          { velocityMmPerSec: 8.06, absorptionDepthPercent: 5.0, linewidthFwhmMmPerSec: 0.32, transitionSublevels: 'A-site 6' }
        ]
      },
      {
        label: 'Octahedral B-site Fe2.5+ (Hopping)',
        fractionPercent: 66.7,
        isomerShiftDeltaMmPerSec: 0.67,
        quadrupoleSplittingDeltaEqMmPerSec: 0.01,
        magneticHyperfineFieldTesla: 46.0,
        resonancePeaks: [
          { velocityMmPerSec: -6.65, absorptionDepthPercent: 9.0, linewidthFwhmMmPerSec: 0.38, transitionSublevels: 'B-site 1' },
          { velocityMmPerSec: -3.71, absorptionDepthPercent: 6.0, linewidthFwhmMmPerSec: 0.38, transitionSublevels: 'B-site 2' },
          { velocityMmPerSec: -0.77, absorptionDepthPercent: 3.0, linewidthFwhmMmPerSec: 0.38, transitionSublevels: 'B-site 3' },
          { velocityMmPerSec: 2.11, absorptionDepthPercent: 3.0, linewidthFwhmMmPerSec: 0.38, transitionSublevels: 'B-site 4' },
          { velocityMmPerSec: 5.05, absorptionDepthPercent: 6.0, linewidthFwhmMmPerSec: 0.38, transitionSublevels: 'B-site 5' },
          { velocityMmPerSec: 7.99, absorptionDepthPercent: 9.0, linewidthFwhmMmPerSec: 0.38, transitionSublevels: 'B-site 6' }
        ]
      }
    ],
    description: 'Classic mixed-valence iron oxide. Fast electron hopping between octahedral Fe2+ and Fe3+ sites above the Verwey temperature (120 K) averages their valence to Fe2.5+ (δ = 0.67 mm/s, Bhf = 46.0 T), distinct from the tetrahedral Fe3+ A-site (δ = 0.27 mm/s, Bhf = 49.1 T), resolving two superimposed magnetic sextets with 1 : 2 area ratio.',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 12: Quặng sắt oxit từ Fe3O4, số oxy hóa hỗn hợp +2 và +3; Vật lý 12: Vật liệu ferit từ tính và dẫn điện qua cơ chế nhảy vọt electron.',
    nobelCitation: 'Rudolf L. Mössbauer, Nobel Prize in Physics 1961: Resolving mixed valence and electron hopping in solids.'
  },
  {
    id: 'ferrocene_organometallic_sandwich',
    name: 'Ferrocene Fe(η5-C5H5)2 Dicyclopentadienyl Organometallic Sandwich',
    vietnameseName: 'Phức Kẹp Sandwich Ferrocene Fe(C5H5)2 Sắt(II) Spin Thấp (S=0, Gradient Điện Trường Lớn)',
    ironChemicalSystem: 'ORGANOMETALLIC_SANDWICH',
    ironOxidationState: 'Fe(II)',
    spinState: 'LOW_SPIN_S_0',
    coordinationGeometry: 'Parallel Pentagonal Sandwich (D5d staggered symmetry)',
    debyeTemperatureKelvin: 340,
    recoillessFractionPercent: 68.0,
    subspectra: [
      {
        label: 'Ferrocene Low-Spin Fe(II) Doublet',
        fractionPercent: 100.0,
        isomerShiftDeltaMmPerSec: 0.45,
        quadrupoleSplittingDeltaEqMmPerSec: 2.37,
        magneticHyperfineFieldTesla: 0.0,
        resonancePeaks: [
          { velocityMmPerSec: -0.735, absorptionDepthPercent: 10.5, linewidthFwhmMmPerSec: 0.24, transitionSublevels: '±1/2 → ±1/2' },
          { velocityMmPerSec: 1.635, absorptionDepthPercent: 10.5, linewidthFwhmMmPerSec: 0.24, transitionSublevels: '±1/2 → ±3/2' }
        ]
      }
    ],
    description: 'Nobel-prize winning organometallic sandwich complex (Kealy & Pauson 1951, Fischer & Wilkinson 1973). Diamagnetic low-spin Fe(II) (S=0, d6) is sandwiched between two parallel cyclopentadienyl pi-rings. Extreme axial electron density along the fivefold C5 axis produces a giant positive electric field gradient V_zz, creating a beautifully sharp, symmetric quadrupole doublet (ΔE_Q = 2.37 mm/s).',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Phức chất hữu cơ kim loại, liên kết phối trí pi giữa cation kim loại chuyển tiếp và phối tử cyclopentadienyl; Cấu trúc hình học sandwich.',
    nobelCitation: 'Rudolf L. Mössbauer, Nobel Prize in Physics 1961: Precise determination of chemical bonding and covalency via isomer shift.'
  },
  {
    id: 'mars_jarosite_mimos_ii',
    name: 'Martian Acid-Sulfate Jarosite KFe3(SO4)2(OH)6 (MER Spirit & Opportunity MIMOS II)',
    vietnameseName: 'Khoáng Vật Jarosite Sao Hỏa (Bằng Chứng Nước Axit Cổ Đại Trên Sao Hỏa - NASA MER)',
    ironChemicalSystem: 'PLANETARY_MINERAL',
    ironOxidationState: 'Fe(III)',
    spinState: 'HIGH_SPIN_S_2',
    coordinationGeometry: 'Kagome Hydroxide-Sulfate Layered Octahedra',
    debyeTemperatureKelvin: 380,
    recoillessFractionPercent: 71.0,
    subspectra: [
      {
        label: 'Jarosite Fe3+ Octahedral Doublet',
        fractionPercent: 100.0,
        isomerShiftDeltaMmPerSec: 0.39,
        quadrupoleSplittingDeltaEqMmPerSec: 1.15,
        magneticHyperfineFieldTesla: 0.0, // Paramagnetic at 250 K on Mars surface
        resonancePeaks: [
          { velocityMmPerSec: -0.185, absorptionDepthPercent: 8.0, linewidthFwhmMmPerSec: 0.30, transitionSublevels: 'Fe3+ Doublet 1' },
          { velocityMmPerSec: 0.965, absorptionDepthPercent: 8.0, linewidthFwhmMmPerSec: 0.30, transitionSublevels: 'Fe3+ Doublet 2' }
        ]
      }
    ],
    description: 'Pivotal planetary science discovery by NASA Mars Exploration Rover Opportunity on Meridiani Planum. The miniaturized MIMOS II Mössbauer spectrometer detected the unique doublet of Jarosite (δ = 0.39 mm/s, ΔE_Q = 1.15 mm/s), an iron-hydroxy-sulfate mineral that requires acidic liquid water to form, confirming that Mars once had standing bodies of liquid water.',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 12: Muối sunfat phức của sắt Fe(III), khoáng vật học sao Hỏa; Vật lý 12: Đo phổ Mössbauer trong môi trường vũ trụ ngoài Trái Đất.',
    nobelCitation: 'Rudolf L. Mössbauer, Nobel Prize in Physics 1961: Space exploration application of nuclear gamma resonance.'
  }
];

/**
 * Calculates Doppler energy shift in nano-electronvolts (neV):
 * delta E = E_gamma * (v / c)
 * 1 mm/s = 48.075 neV for 57Fe (14.41 keV)
 */
export function calculateDopplerEnergyShiftNanoEv(velocityMmPerSec: number): number {
  const energyShiftEv = GAMMA_ENERGY_EV * (velocityMmPerSec / SPEED_OF_LIGHT_MM_PER_SEC);
  return Number((energyShiftEv * 1e9).toFixed(3)); // Convert to neV
}

/**
 * Simulates Mössbauer Gamma Transmission Spectrum Curve
 */
export function simulateMossbauerSpectrum(
  standardId: string,
  dopplerVelocityMmPerSec: number = 0.0
): MossbauerSimulationResult {
  const standard =
    MOSSBAUER_SPECIMEN_CATALOG.find((s) => s.id === standardId) ||
    MOSSBAUER_SPECIMEN_CATALOG[0];

  const currentVelocity = Number(Math.max(-10.0, Math.min(10.0, dopplerVelocityMmPerSec)).toFixed(2));
  const energyShiftNanoEv = calculateDopplerEnergyShiftNanoEv(currentVelocity);

  // Flatten all resonance peaks across subspectra
  const allPeaks: MossbauerResonancePeak[] = [];
  standard.subspectra.forEach((sub) => {
    sub.resonancePeaks.forEach((pk) => {
      allPeaks.push(pk);
    });
  });

  // Generate Mössbauer transmission spectrum from -10.0 to +10.0 mm/s in 0.1 mm/s steps (201 points)
  const spectrumCurve: MossbauerSpectrumPoint[] = [];

  for (let v = -10.0; v <= 10.05; v += 0.1) {
    const vNum = Number(v.toFixed(2));
    let totalAbsorption = 0;
    let isPeak = false;

    allPeaks.forEach((pk) => {
      const diff = Math.abs(vNum - pk.velocityMmPerSec);
      const halfWidth = pk.linewidthFwhmMmPerSec / 2.0;
      // Lorentzian absorption profile: L(v) = 1 / (1 + (v - v0)^2 / halfWidth^2)
      const lorentzian = 1.0 / (1.0 + Math.pow(diff / halfWidth, 2));
      totalAbsorption += pk.absorptionDepthPercent * lorentzian;

      if (diff < 0.08) {
        isPeak = true;
      }
    });

    const transmission = Math.max(70.0, 100.0 - totalAbsorption);

    spectrumCurve.push({
      dopplerVelocityMmPerSec: vNum,
      relativeTransmissionPercent: Number(transmission.toFixed(2)),
      isAtResonancePeak: isPeak
    });
  }

  // Find closest point to current velocity
  const currentPoint = spectrumCurve.reduce((prev, curr) => {
    return Math.abs(curr.dopplerVelocityMmPerSec - currentVelocity) < Math.abs(prev.dopplerVelocityMmPerSec - currentVelocity) ? curr : prev;
  });

  // Calculate distance to closest peak
  let minPeakDist = 999.0;
  allPeaks.forEach((pk) => {
    const d = Math.abs(currentVelocity - pk.velocityMmPerSec);
    if (d < minPeakDist) minPeakDist = d;
  });

  const isResonant = minPeakDist <= 0.15;

  return {
    standard,
    currentDopplerVelocityMmPerSec: currentVelocity,
    gammaEnergyShiftNanoEv: energyShiftNanoEv,
    recoillessFractionPercent: standard.recoillessFractionPercent,
    currentSpectrumPoint: currentPoint,
    spectrumCurve,
    closestPeakDistanceMmPerSec: Number(minPeakDist.toFixed(3)),
    isResonanceAchieved: isResonant
  };
}

/**
 * Intelligent Card Matcher for Mössbauer & Nuclear Gamma Resonance Systems
 */
export function getMatchingMossbauerCard(card: { id?: string; name?: string; category?: string }): MossbauerStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('alpha-iron') || target.includes('iron foil') || target.includes('metallic iron') || target.includes('fe(0)') || target.includes('ferromagnet')) {
    return MOSSBAUER_SPECIMEN_CATALOG.find((s) => s.id === 'alpha_iron_metal_foil') || null;
  }
  if (target.includes('hemoglobin') || target.includes('deoxy') || target.includes('heme') || target.includes('blood') || target.includes('porphyrin')) {
    return MOSSBAUER_SPECIMEN_CATALOG.find((s) => s.id === 'deoxy_hemoglobin_high_spin') || null;
  }
  if (target.includes('magnetite') || target.includes('fe3o4') || target.includes('verwey') || target.includes('spinel') || target.includes('lodestone')) {
    return MOSSBAUER_SPECIMEN_CATALOG.find((s) => s.id === 'magnetite_verwey_charge_ordering') || null;
  }
  if (target.includes('ferrocene') || target.includes('sandwich') || target.includes('cyclopentadienyl') || target.includes('organometallic')) {
    return MOSSBAUER_SPECIMEN_CATALOG.find((s) => s.id === 'ferrocene_organometallic_sandwich') || null;
  }
  if (target.includes('jarosite') || target.includes('mars') || target.includes('opportunity') || target.includes('spirit') || target.includes('mimos')) {
    return MOSSBAUER_SPECIMEN_CATALOG.find((s) => s.id === 'mars_jarosite_mimos_ii') || null;
  }

  // Fallback keyword detection
  if (target.includes('iron') || target.includes('fe') || target.includes('mossbauer') || target.includes('gamma resonance') || target.includes('hyperfine')) {
    return MOSSBAUER_SPECIMEN_CATALOG[0];
  }

  return null;
}
