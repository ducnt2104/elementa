// src/domain/simsEngine.ts
// Milestone 71: Secondary Ion Mass Spectrometry (SIMS), Sputtering Cascades & Depth Profiling Isotopic Engine
// Standards: Peter Sigmund (Linear Collision Cascade Theory 1969) & Andersen-Hinthorne Local Thermal Equilibrium (LTE) Model
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Đồng vị bền và đồng vị phóng xạ, khối phổ, bán dẫn; Hóa học 12: Hợp kim titan, pin Lithium-ion, màng phospholipid; Vật lý 12: Động lượng va chạm, bức xạ ion)

export const AVOGADRO_CONSTANT = 6.02214076e23; // mol^-1
export const ELEMENTARY_CHARGE_COULOMB = 1.602176634e-19; // C

export interface SimsMonitoredSpecies {
  label: string; // e.g. "11B+", "28Si+", "LiF-"
  massOverChargeDa: number; // m/z
  polarity: 'POSITIVE' | 'NEGATIVE';
  colorHex: string;
  peakCountsPerSecond: number; // Raw detector signal
  calibratedConcentrationAtomsCm3?: number; // Quantitative concentration
  surfaceSensitivityPpb: number; // Detection limit in ppb
}

export interface SimsDepthProfilePoint {
  depthNanometers: number; // Sputter crater depth (0 to 60 nm)
  sputterTimeSeconds: number; // Erosion time
  speciesCounts: { [speciesLabel: string]: number }; // Counts/sec for each monitored species
  layerPhaseDescription: string;
}

export interface SimsStandard {
  id: string;
  name: string;
  vietnameseName: string;
  simsMode: 'DYNAMIC_DEPTH_PROFILING' | 'STATIC_SURFACE_SPECTROMETRY' | 'HIGH_PRECISION_ISOTOPE_RATIO';
  primaryIonSpecies: 'O2_PLUS' | 'CS_PLUS' | 'BI3_PLUS' | 'O_MINUS' | 'C60_PLUS';
  primaryBeamEnergyKev: number; // 0.5 - 30 keV
  primaryBeamCurrentNanoAmps: number; // Primary ion current
  targetMatrix: string; // e.g. "Crystalline Silicon (100)", "DPPC Bilayer"
  sputterYieldAtomsPerIon: number; // Sigmund sputter yield Y
  sputterErosionRateNmPerSec: number; // dz/dt in nm/s
  maximumDepthNm: number; // Max profile depth
  monitoredSpecies: SimsMonitoredSpecies[];
  description: string;
  curriculumNotes: string;
  scientificCitation: string;
}

export interface SimsSimulationResult {
  standard: SimsStandard;
  currentDepthNm: number;
  currentSputterTimeSeconds: number;
  totalIonDoseIonsCm2: number; // Primary ion dose
  isStaticLimitExceeded: boolean; // Dose > 10^12 ions/cm^2
  currentProfilePoint: SimsDepthProfilePoint;
  depthProfileData: SimsDepthProfilePoint[];
  sputterCraterAspectRatio: number;
}

export const SIMS_SPECIMEN_CATALOG: SimsStandard[] = [
  {
    id: 'semiconductor_boron_delta_doping',
    name: 'Silicon Boron Delta-Doped Superlattice (Si:B) Ultra-Shallow Junction',
    vietnameseName: 'Bán Dẫn Silic Pha Tạp Delta Boron (Si:B) & Mối Nối Cực Nông (0.5 keV O2+ Dynamic SIMS)',
    simsMode: 'DYNAMIC_DEPTH_PROFILING',
    primaryIonSpecies: 'O2_PLUS',
    primaryBeamEnergyKev: 0.5, // Ultra-low energy for sub-nm depth resolution
    primaryBeamCurrentNanoAmps: 15.0,
    targetMatrix: 'Crystalline Silicon (100) Wafer',
    sputterYieldAtomsPerIon: 0.45,
    sputterErosionRateNmPerSec: 0.12, // 0.12 nm/s crater erosion
    maximumDepthNm: 50.0,
    monitoredSpecies: [
      {
        label: '11B+',
        massOverChargeDa: 11.009,
        polarity: 'POSITIVE',
        colorHex: '#f59e0b',
        peakCountsPerSecond: 85000,
        calibratedConcentrationAtomsCm3: 5.2e19,
        surfaceSensitivityPpb: 10.0
      },
      {
        label: '10B+',
        massOverChargeDa: 10.013,
        polarity: 'POSITIVE',
        colorHex: '#fbbf24',
        peakCountsPerSecond: 21000,
        calibratedConcentrationAtomsCm3: 1.3e19,
        surfaceSensitivityPpb: 25.0
      },
      {
        label: '28Si+ (Matrix)',
        massOverChargeDa: 27.977,
        polarity: 'POSITIVE',
        colorHex: '#38bdf8',
        peakCountsPerSecond: 1200000,
        calibratedConcentrationAtomsCm3: 5.0e22,
        surfaceSensitivityPpb: 50000.0
      }
    ],
    description: 'Gold-standard dynamic SIMS depth profiling in nanoelectronics. Low-energy 0.5 keV O2+ primary ion bombardment minimizes atomic recoil mixing, achieving sub-nanometer depth resolution (<1.2 nm/decade decay length) across ultra-shallow boron delta-spikes in next-generation MOSFET source/drain junctions.',
    curriculumNotes: 'GDPT 2018 Hóa học 10: Cấu tạo vỏ electron nguyên tử, đồng vị bền B-10 (19.9%) và B-11 (80.1%), chất bán dẫn nhóm IIIA-IVA; Vật lý 12: Linh kiện bán dẫn và công nghệ vi mạch tích hợp.',
    scientificCitation: 'Peter Sigmund (1969): Theory of Sputtering. I. Sputtering Yield of Amorphous and Polycrystalline Targets. Phys. Rev. 184, 383.'
  },
  {
    id: 'tof_sims_lipid_membrane',
    name: 'DPPC Phospholipid Bilayer Cell Membrane Molecular ToF-SIMS',
    vietnameseName: 'Khối Phổ ToF-SIMS Bề Mặt Màng Tế Bào Phospholipid DPPC (Bi3+ Cluster Static SIMS)',
    simsMode: 'STATIC_SURFACE_SPECTROMETRY',
    primaryIonSpecies: 'BI3_PLUS',
    primaryBeamEnergyKev: 30.0,
    primaryBeamCurrentNanoAmps: 0.0002, // 0.2 pA pulsed beam to maintain static limit
    targetMatrix: 'Dipalmitoylphosphatidylcholine (DPPC) Langmuir-Blodgett Bilayer',
    sputterYieldAtomsPerIon: 12.5, // High molecular cluster yield
    sputterErosionRateNmPerSec: 0.002,
    maximumDepthNm: 8.0,
    monitoredSpecies: [
      {
        label: 'Phosphocholine Headgroup [C5H15NO4P]+',
        massOverChargeDa: 184.1,
        polarity: 'POSITIVE',
        colorHex: '#ec4899',
        peakCountsPerSecond: 95000,
        surfaceSensitivityPpb: 5.0
      },
      {
        label: 'Palmitoyl Fatty Acyl [C16H31O]+',
        massOverChargeDa: 239.2,
        polarity: 'POSITIVE',
        colorHex: '#a855f7',
        peakCountsPerSecond: 42000,
        surfaceSensitivityPpb: 12.0
      },
      {
        label: 'Intact Molecular Ion [M+H]+',
        massOverChargeDa: 734.6,
        polarity: 'POSITIVE',
        colorHex: '#06b6d4',
        peakCountsPerSecond: 18000,
        surfaceSensitivityPpb: 20.0
      }
    ],
    description: 'State-of-the-art molecular surface spectrometry. Pulsed bismuth cluster primary ions (Bi3+) impart massive energy density into the top 1 nm, ejecting intact lipid headgroups (m/z 184.1) and intact protonated molecules [M+H]+ (m/z 734.6) with primary ion dose kept strictly below the static limit (10^12 ions/cm2).',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Lipid, este của glycerol và acid béo bão hòa palmitic; Sinh học 10: Cấu trúc màng kép phospholipid và tính thấm chọn lọc sinh học.',
    scientificCitation: 'Benninghoven et al. (1987): Secondary Ion Mass Spectrometry: Basic Concepts, Instrumental Aspects, Applications and Trends. John Wiley & Sons.'
  },
  {
    id: 'geological_lead_uranium_zircon',
    name: 'Jack Hills Ancient Zircon (ZrSiO4) U-Pb Isotopic Geochronology',
    vietnameseName: 'Định Tuổi Đồng Vị U-Pb Khoáng Vật Zircon Jack Hills (SHRIMP / NanoSIMS 4.4 Tỷ Năm)',
    simsMode: 'HIGH_PRECISION_ISOTOPE_RATIO',
    primaryIonSpecies: 'O_MINUS',
    primaryBeamEnergyKev: 10.0,
    primaryBeamCurrentNanoAmps: 2.5,
    targetMatrix: 'Zircon (ZrSiO4) Single Crystal Micro-Domain',
    sputterYieldAtomsPerIon: 1.1,
    sputterErosionRateNmPerSec: 0.05,
    maximumDepthNm: 25.0,
    monitoredSpecies: [
      {
        label: '206Pb+ (Radiogenic daughter of 238U)',
        massOverChargeDa: 205.974,
        polarity: 'POSITIVE',
        colorHex: '#10b981',
        peakCountsPerSecond: 45000,
        surfaceSensitivityPpb: 0.5
      },
      {
        label: '207Pb+ (Radiogenic daughter of 235U)',
        massOverChargeDa: 206.976,
        polarity: 'POSITIVE',
        colorHex: '#34d399',
        peakCountsPerSecond: 26200,
        surfaceSensitivityPpb: 0.5
      },
      {
        label: '238U+ (Parent radioisotope)',
        massOverChargeDa: 238.051,
        polarity: 'POSITIVE',
        colorHex: '#e11d48',
        peakCountsPerSecond: 180000,
        surfaceSensitivityPpb: 1.0
      }
    ],
    description: 'High-sensitivity high-resolution ion microprobe (SHRIMP / NanoSIMS) dating of the oldest known terrestrial matter: Jack Hills zircons from Western Australia. In-situ sputtering of microscopic growth rings reveals a 207Pb/206Pb ratio confirming an age of 4.404 billion years, proving liquid water and crust formed within 150 million years of Earth origin.',
    curriculumNotes: 'GDPT 2018 Hóa học 10: Phóng xạ hạt nhân, đồng vị chì và chuỗi phân rã phóng xạ Uranium-Chì; Vật lý 12: Năng lượng liên kết hạt nhân, chu kỳ bán rã và định tuổi cổ vật.',
    scientificCitation: 'Wilde, Valley, Peck & Graham (2001): Evidence from detrital zircons for the existence of continental crust and oceans on the Earth 4.4 Gyr ago. Nature 409, 175-178.'
  },
  {
    id: 'battery_solid_electrolyte_interphase_sei',
    name: 'Lithium Anode Solid Electrolyte Interphase (SEI) Cryo-ToF-SIMS 3D Tomography',
    vietnameseName: 'Chụp Cắt Lớp 3D Lớp Gian Pha Điện Cực Rắn SEI Pin Lithium Kim Loại (Cryo-ToF-SIMS)',
    simsMode: 'DYNAMIC_DEPTH_PROFILING',
    primaryIonSpecies: 'CS_PLUS',
    primaryBeamEnergyKev: 1.0,
    primaryBeamCurrentNanoAmps: 8.0,
    targetMatrix: 'Passivated Lithium Foil (Carbonate Electrolyte LP30)',
    sputterYieldAtomsPerIon: 2.8,
    sputterErosionRateNmPerSec: 0.25,
    maximumDepthNm: 40.0,
    monitoredSpecies: [
      {
        label: 'LiF- (Inner inorganic SEI)',
        massOverChargeDa: 25.998,
        polarity: 'NEGATIVE',
        colorHex: '#06b6d4',
        peakCountsPerSecond: 110000,
        surfaceSensitivityPpb: 2.0
      },
      {
        label: 'Li2O- (Dense inner SEI)',
        massOverChargeDa: 29.992,
        polarity: 'NEGATIVE',
        colorHex: '#3b82f6',
        peakCountsPerSecond: 75000,
        surfaceSensitivityPpb: 5.0
      },
      {
        label: 'C2HO- (Outer organic SEI)',
        massOverChargeDa: 41.003,
        polarity: 'NEGATIVE',
        colorHex: '#a855f7',
        peakCountsPerSecond: 92000,
        surfaceSensitivityPpb: 10.0
      }
    ],
    description: 'Cryogenic 3D depth-profiling of delicate battery interfaces. Cesium primary ion sputtering combined with cryo-cooling (-140 °C) preserves the volatile organic and inorganic bilayer of the Solid Electrolyte Interphase (SEI), resolving the dense LiF/Li2O inner layer protecting against dendrite puncture.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Điện hóa học, pin sạc Lithium-ion, quá trình oxi hóa khử tại cực âm và hiện tượng thụ động hóa bề mặt kim loại kiềm.',
    scientificCitation: 'Wang et al. (2018): Real-time mass spectrometric characterization of the solid-electrolyte interphase in lithium metal batteries. Nature Nanotechnology 13, 856-861.'
  },
  {
    id: 'corrosion_hydrogen_embrittlement',
    name: 'Titanium Aerospace Alloy (Ti-6Al-4V) Deuterium / Hydrogen Embrittlement',
    vietnameseName: 'Phát Hiện Khí Hydrogen/Deuterium Giòn Hóa Ranh Giới Hạt Hợp Kim Titan Hàng Không',
    simsMode: 'DYNAMIC_DEPTH_PROFILING',
    primaryIonSpecies: 'CS_PLUS',
    primaryBeamEnergyKev: 3.0,
    primaryBeamCurrentNanoAmps: 18.0,
    targetMatrix: 'Titanium Alloy Ti-6Al-4V (Aerospace Airframe)',
    sputterYieldAtomsPerIon: 1.8,
    sputterErosionRateNmPerSec: 0.18,
    maximumDepthNm: 60.0,
    monitoredSpecies: [
      {
        label: '1H- (Interstitial Hydrogen)',
        massOverChargeDa: 1.008,
        polarity: 'NEGATIVE',
        colorHex: '#ef4444',
        peakCountsPerSecond: 185000,
        surfaceSensitivityPpb: 0.2
      },
      {
        label: '2D- (Deuterium Tracer)',
        massOverChargeDa: 2.014,
        polarity: 'NEGATIVE',
        colorHex: '#f97316',
        peakCountsPerSecond: 98000,
        surfaceSensitivityPpb: 0.1
      },
      {
        label: '48Ti- (Alloy Matrix Reference)',
        massOverChargeDa: 47.948,
        polarity: 'NEGATIVE',
        colorHex: '#64748b',
        peakCountsPerSecond: 450000,
        surfaceSensitivityPpb: 1000.0
      }
    ],
    description: 'Sub-ppm tracking of hydrogen isotopes in structural alloys. Cesium ion bombardment provides extreme ionization efficiency for electronegative hydrogen and deuterium tracers, mapping catastrophic hydrogen accumulation at α/β phase boundaries that triggers catastrophic stress corrosion cracking.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Tính chất của kim loại chuyển tiếp Titan và hợp kim nhẹ; Hiện tượng ăn mòn kim loại trong môi trường công nghiệp hàng không.',
    scientificCitation: 'Williams et al. (1984): High sensitivity hydrogen isotope analysis in structural metals by secondary ion mass spectrometry. J. Vac. Sci. Technol. A 2, 731.'
  }
];

/**
 * Calculates Sputtering Erosion Rate dz/dt in nm/s using Sigmund's equation:
 * dz/dt = (J_p · Y · M) / (rho · N_A · e)
 */
export function calculateSputterErosionRate(
  primaryCurrentNanoAmps: number,
  rasterAreaMicrons: number = 75, // 75 μm x 75 μm raster crater
  sputterYield: number = 1.0,
  targetDensityGramsCm3: number = 2.33, // Silicon density
  targetMolarMassGramsMol: number = 28.085
): number {
  const currentAmps = primaryCurrentNanoAmps * 1e-9;
  const areaCm2 = Math.pow(rasterAreaMicrons * 1e-4, 2);
  const currentDensityAmpsCm2 = currentAmps / areaCm2;
  const ionsPerSecCm2 = currentDensityAmpsCm2 / ELEMENTARY_CHARGE_COULOMB;

  // Atoms removed per cm2 per sec = ionsPerSecCm2 * Y
  const atomsRemovedPerSecCm2 = ionsPerSecCm2 * sputterYield;
  // Volume removed per sec cm2 = atoms / (rho * N_A / M)
  const atomsPerCm3 = (targetDensityGramsCm3 * AVOGADRO_CONSTANT) / targetMolarMassGramsMol;
  const erosionRateCmPerSec = atomsRemovedPerSecCm2 / atomsPerCm3;
  const erosionRateNmPerSec = erosionRateCmPerSec * 1e7;

  return Number(Math.max(0.001, erosionRateNmPerSec).toFixed(3));
}

/**
 * Simulates SIMS Depth Profile or Surface Mass Spectrum
 */
export function simulateSimsAnalysis(
  standardId: string,
  targetDepthNanometers: number = 15.0
): SimsSimulationResult {
  const standard =
    SIMS_SPECIMEN_CATALOG.find((s) => s.id === standardId) ||
    SIMS_SPECIMEN_CATALOG[0];

  const maxDepth = standard.maximumDepthNm;
  const currentDepth = Math.min(maxDepth, Math.max(0.1, targetDepthNanometers));
  const erosionRate = standard.sputterErosionRateNmPerSec;
  const currentSputterTime = Number((currentDepth / erosionRate).toFixed(1));

  // Compute accumulated ion dose
  // Dose = (I_p * t) / (e * Area)
  const craterAreaCm2 = Math.pow(250 * 1e-4, 2);
  const totalIons = (standard.primaryBeamCurrentNanoAmps * 1e-9 * currentSputterTime) / ELEMENTARY_CHARGE_COULOMB;
  const dose = totalIons / craterAreaCm2;
  const isStaticLimit = dose > 1e12;

  // Generate depth profile curve from 0 nm to maxDepth in 0.5 nm steps
  const depthProfileData: SimsDepthProfilePoint[] = [];

  for (let z = 0; z <= maxDepth; z += 0.5) {
    const zNum = Number(z.toFixed(1));
    const tSec = Number((zNum / erosionRate).toFixed(1));
    const counts: { [label: string]: number } = {};
    let phaseDesc = 'Cốt Nền Vật Liệu (Bulk Matrix)';

    if (standard.id === 'semiconductor_boron_delta_doping') {
      // Delta spikes at 12.5 nm, 25.0 nm, 37.5 nm
      const d1 = Math.abs(zNum - 12.5);
      const d2 = Math.abs(zNum - 25.0);
      const d3 = Math.abs(zNum - 37.5);

      const peak1 = Math.exp(-Math.pow(d1 / 1.2, 2));
      const peak2 = Math.exp(-Math.pow(d2 / 1.2, 2));
      const peak3 = Math.exp(-Math.pow(d3 / 1.2, 2));
      const totalPeak = peak1 + peak2 + peak3;

      counts['11B+'] = Math.round(150 + totalPeak * 85000);
      counts['10B+'] = Math.round(38 + totalPeak * 21000);
      counts['28Si+ (Matrix)'] = 1200000;

      if (totalPeak > 0.4) {
        phaseDesc = 'Mặt Phẳng Pha Tạp Delta Boron (B-Doped Plane)';
      }
    } else if (standard.id === 'tof_sims_lipid_membrane') {
      // Surface membrane 0 to 4 nm, substrate beyond 4 nm
      const surfaceFactor = Math.exp(-zNum / 1.8);
      counts['Phosphocholine Headgroup [C5H15NO4P]+'] = Math.round(95000 * surfaceFactor);
      counts['Palmitoyl Fatty Acyl [C16H31O]+'] = Math.round(42000 * surfaceFactor);
      counts['Intact Molecular Ion [M+H]+'] = Math.round(18000 * surfaceFactor);

      if (zNum < 2.0) {
        phaseDesc = 'Nhóm Đầu Ưa Nước Phosphocholine';
      } else if (zNum < 4.0) {
        phaseDesc = 'Chuỗi Đuôi Kỵ Nước Acid Palmitic';
      } else {
        phaseDesc = 'Đế Thủy Tinh / Silicon Substrate';
      }
    } else if (standard.id === 'geological_lead_uranium_zircon') {
      // Uniform zircon matrix with isotopic ratio
      counts['206Pb+ (Radiogenic daughter of 238U)'] = 45000;
      counts['207Pb+ (Radiogenic daughter of 235U)'] = 26200;
      counts['238U+ (Parent radioisotope)'] = 180000;
      phaseDesc = 'Vòng Sinh Trưởng Tinh Thể Zircon Hóa Đá (4.4 Ga)';
    } else if (standard.id === 'battery_solid_electrolyte_interphase_sei') {
      // Organic SEI (0 - 15 nm), Inorganic SEI (15 - 35 nm), bulk Li (> 35 nm)
      if (zNum <= 15.0) {
        counts['C2HO- (Outer organic SEI)'] = Math.round(92000 * (1 - zNum / 18.0));
        counts['LiF- (Inner inorganic SEI)'] = Math.round(15000 + zNum * 3000);
        counts['Li2O- (Dense inner SEI)'] = Math.round(8000 + zNum * 2000);
        phaseDesc = 'Lớp SEI Hữu Cơ Ngoài (Alkyl Carbonate)';
      } else if (zNum <= 35.0) {
        counts['C2HO- (Outer organic SEI)'] = Math.round(1000 * Math.exp(-(zNum - 15) / 3));
        counts['LiF- (Inner inorganic SEI)'] = Math.round(110000 * Math.exp(-Math.pow((zNum - 25) / 8, 2)));
        counts['Li2O- (Dense inner SEI)'] = Math.round(75000 * Math.exp(-Math.pow((zNum - 28) / 7, 2)));
        phaseDesc = 'Lớp SEI Vô Cơ Trong (LiF / Li2O Bảo Vệ)';
      } else {
        counts['C2HO- (Outer organic SEI)'] = 200;
        counts['LiF- (Inner inorganic SEI)'] = 2500;
        counts['Li2O- (Dense inner SEI)'] = 1200;
        phaseDesc = 'Kim Loại Lithium Tinh Khiết (Li Anode)';
      }
    } else {
      // Corrosion hydrogen embrittlement
      const peakH = zNum < 15.0 ? Math.exp(-zNum / 5.0) : 0.05 + 0.95 * Math.exp(-Math.pow((zNum - 30) / 4, 2));
      counts['1H- (Interstitial Hydrogen)'] = Math.round(2000 + peakH * 183000);
      counts['2D- (Deuterium Tracer)'] = Math.round(1000 + peakH * 97000);
      counts['48Ti- (Alloy Matrix Reference)'] = 450000;
      phaseDesc = zNum >= 26 && zNum <= 34 ? 'Ranh Giới Hạt α/β Giòn Hóa Do Khí Hydrogen' : 'Hợp Kim Titan Ti-6Al-4V';
    }

    depthProfileData.push({
      depthNanometers: zNum,
      sputterTimeSeconds: tSec,
      speciesCounts: counts,
      layerPhaseDescription: phaseDesc
    });
  }

  // Find closest point to target depth
  const currentPoint = depthProfileData.reduce((prev, curr) => {
    return Math.abs(curr.depthNanometers - currentDepth) < Math.abs(prev.depthNanometers - currentDepth) ? curr : prev;
  });

  return {
    standard,
    currentDepthNm: currentDepth,
    currentSputterTimeSeconds: currentSputterTime,
    totalIonDoseIonsCm2: dose,
    isStaticLimitExceeded: isStaticLimit,
    currentProfilePoint: currentPoint,
    depthProfileData,
    sputterCraterAspectRatio: Number((currentDepth / 250000).toFixed(6))
  };
}

/**
 * Intelligent Card Matcher for SIMS & Isotopic Sputtering Systems
 */
export function getMatchingSimsCard(card: { id?: string; name?: string; category?: string }): SimsStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('boron') || target.includes('silicon wafer') || target.includes('semiconductor') || target.includes('junction') || target.includes('delta-dop') || target.includes('mosfet')) {
    return SIMS_SPECIMEN_CATALOG.find((s) => s.id === 'semiconductor_boron_delta_doping') || null;
  }
  if (target.includes('lipid') || target.includes('dppc') || target.includes('membrane') || target.includes('phospholipid') || target.includes('cell membrane')) {
    return SIMS_SPECIMEN_CATALOG.find((s) => s.id === 'tof_sims_lipid_membrane') || null;
  }
  if (target.includes('zircon') || target.includes('uranium') || target.includes('lead') || target.includes('geology') || target.includes('ancient') || target.includes('shrimp')) {
    return SIMS_SPECIMEN_CATALOG.find((s) => s.id === 'geological_lead_uranium_zircon') || null;
  }
  if (target.includes('sei') || target.includes('lithium') || target.includes('battery') || target.includes('solid electrolyte') || target.includes('anode')) {
    return SIMS_SPECIMEN_CATALOG.find((s) => s.id === 'battery_solid_electrolyte_interphase_sei') || null;
  }
  if (target.includes('titanium') || target.includes('embrittlement') || target.includes('hydrogen') || target.includes('deuterium') || target.includes('corrosion') || target.includes('aerospace')) {
    return SIMS_SPECIMEN_CATALOG.find((s) => s.id === 'corrosion_hydrogen_embrittlement') || null;
  }

  // Fallback
  if (target.includes('sims') || target.includes('sputter') || target.includes('mass spec') || target.includes('isotope ratio')) {
    return SIMS_SPECIMEN_CATALOG[0];
  }

  return null;
}
