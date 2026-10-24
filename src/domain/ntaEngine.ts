/**
 * Nanoparticle Tracking Analysis (NTA), Stokes-Einstein Brownian Motion & Extracellular Vesicle Hydrodynamic Sizing Engine
 * 
 * Standards & Physical Principles:
 * 1. ISO 19430:2016 (Particle size analysis — Particle tracking analysis (NTA) method).
 * 2. Stokes-Einstein Diffusion Equation:
 *    D_t = (k_B * T) / (3 * pi * eta * d_H)
 *    where k_B = 1.380649e-23 J/K, T is absolute temperature (K), eta is dynamic viscosity (Pa*s), and d_H is hydrodynamic diameter.
 * 3. 2D Brownian Mean Squared Displacement (MSD):
 *    <(delta x)^2 + (delta y)^2> = 4 * D_t * delta t
 * 4. Resolves single-particle hydrodynamic sizing without intensity-weighted d^6 ensemble bias of Dynamic Light Scattering (DLS).
 * 5. Simultaneous calculation of absolute particle concentration (particles/mL) and size distribution (D10, D50, D90, Mode).
 * 6. 5 Benchmark Standards:
 *    - NIST Traceable 100 nm Polystyrene Latex Beads (Primary calibrant)
 *    - Exosomes / Extracellular Vesicles (Liquid biopsy cancer biomarker, 30-150 nm)
 *    - Lipid Nanoparticles (mRNA Vaccine Delivery LNPs, 60-100 nm)
 *    - Adeno-Associated Virus (AAV Gene therapy capsid, 25 nm)
 *    - Gold Nanoparticles (Plasmonic resonant scatterer, 30 nm)
 * 7. Curriculum: Vietnam GDPT 2018 (Hóa học 10: Chuyển động nhiệt Brown; Hóa học 11: Hệ keo và hiệu ứng Tyndall; Sinh học 10: Màng sinh chất và bóng màng exosome; Sinh học 12: Liệu pháp gen và công nghệ nano y sinh).
 */

export const BOLTZMANN_CONSTANT_J_PER_K = 1.380649e-23; // J/K (CODATA)

export interface NtaStandard {
  id: string;
  name: string;
  vietnameseName: string;
  chemicalFormula: string;
  particleType: 'POLYMER_CALIBRANT' | 'EXTRACELLULAR_VESICLE' | 'LIPID_NANOPARTICLE' | 'VIRAL_VECTOR' | 'METALLIC_COLLOID';
  trueMeanDiameterNm: number;
  trueModeDiameterNm: number;
  polydispersityStandardDevNm: number;
  nominalConcentrationParticlesPerMl: number; // e.g. 1.2e9
  refractiveIndex: number; // e.g. 1.59 for PS, 1.38 for lipid vesicle
  optimalLaserWavelengthNm: 405 | 488 | 532 | 640;
  optimalTemperatureCelsius: number; // e.g. 25°C
  description: string;
  curriculumNotes: string;
  biomedicalApplication: string;
  isoStandardRef: string;
}

export interface NtaTrajectoryPoint {
  frameIndex: number;
  xMicrons: number;
  yMicrons: number;
}

export interface ParticleTrack {
  particleId: number;
  apparentDiameterNm: number;
  diffusionCoeffM2S: number;
  trajectory: NtaTrajectoryPoint[];
  scatteringIntensityAdu: number;
}

export interface SizeDistributionPoint {
  diameterNm: number; // 10 to 500 nm
  concentrationParticlesPerMl: number;
  normalizedFrequencyPercent: number;
}

export interface NtaSimulationResult {
  standard: NtaStandard;
  temperatureCelsius: number;
  mediumViscosityMpaS: number;
  meanDiameterNm: number;
  modeDiameterNm: number;
  d10Nm: number;
  d50Nm: number; // Median
  d90Nm: number;
  spanMetric: number; // (D90 - D10) / D50
  totalConcentrationParticlesPerMl: number;
  diffusionCoeffModeM2S: number;
  distributionCurve: SizeDistributionPoint[];
  trackedParticles: ParticleTrack[];
  frameRateFps: number;
}

/**
 * Standard Catalog: 5 Benchmark NTA Particulate Systems
 */
export const NTA_STANDARD_CATALOG: NtaStandard[] = [
  {
    id: 'nist_100nm_polystyrene_beads',
    name: 'NIST Traceable 100 nm Polystyrene Latex Beads (ISO 19430 Calibrant)',
    vietnameseName: 'Hạt Chuẩn Polystyrene 100 nm NIST (Hiệu Chuẩn Kích Thước & Nồng Độ ISO 19430)',
    chemicalFormula: '[C8H8]n (Latex nanospheres in water)',
    particleType: 'POLYMER_CALIBRANT',
    trueMeanDiameterNm: 100.2,
    trueModeDiameterNm: 99.8,
    polydispersityStandardDevNm: 4.5,
    nominalConcentrationParticlesPerMl: 1.0e9,
    refractiveIndex: 1.59,
    optimalLaserWavelengthNm: 488,
    optimalTemperatureCelsius: 25.0,
    description:
      'The international primary calibration standard for NTA instruments under ISO 19430. Highly monodisperse polystyrene spheres suspended in ultrapure water scatter light strongly due to their high refractive index (n = 1.59), providing unambiguous proof of single-particle Stokes-Einstein tracking.',
    curriculumNotes:
      'GDPT 2018 Hóa học 10 & 11: Chuyển động nhiệt Brown của hạt vi mô; hệ keo dị thể phân tán trong nước và hiện tượng tán xạ ánh sáng Tyndall.',
    biomedicalApplication:
      'Daily instrument qualification, camera focus validation, and flow-cell volume calibration.',
    isoStandardRef: 'ISO 19430:2016 Particle size analysis — Particle tracking analysis (NTA)',
  },
  {
    id: 'exosome_extracellular_vesicles',
    name: 'Tumor-Derived Extracellular Vesicles (Exosomes 30-150 nm)',
    vietnameseName: 'Bóng Màng Ngoại Bào Exosome (Dấu Ấn Ung Thư Sinh Thiết Lỏng - Kích Thước 30-150 nm)',
    chemicalFormula: 'Lipid bilayer membrane + Tetraspanins (CD63/CD81/CD9) + microRNA cargo',
    particleType: 'EXTRACELLULAR_VESICLE',
    trueMeanDiameterNm: 92.5,
    trueModeDiameterNm: 84.0,
    polydispersityStandardDevNm: 22.0,
    nominalConcentrationParticlesPerMl: 1.4e9,
    refractiveIndex: 1.38,
    optimalLaserWavelengthNm: 405, // 405 nm violet laser provides higher Rayleigh scattering for low-index vesicles
    optimalTemperatureCelsius: 25.0,
    description:
      'Extracellular vesicles (exosomes) secreted by cancer cells carry tumor-specific RNA and proteins. Because their refractive index (n ~ 1.38) is close to water (n = 1.33), conventional DLS misses sub-100 nm populations. NTA individual particle scattering resolves the true biological size distribution.',
    curriculumNotes:
      'GDPT 2018 Sinh học 10: Cấu trúc màng sinh chất tế bào, túi tiết ngoại bào (exocytosis) và sự truyền tin giữa các tế bào trong cơ thể.',
    biomedicalApplication:
      'Non-invasive liquid biopsy for early cancer detection, organ-specific metastasis tracking, and stem cell therapy characterization.',
    isoStandardRef: 'MISEV2018 Guidelines for Extracellular Vesicle Characterization',
  },
  {
    id: 'lipid_nanoparticles_mrna_vaccine',
    name: 'mRNA Vaccine Delivery Lipid Nanoparticles (LNP 60-100 nm)',
    vietnameseName: 'Hạt Nano Lipid Vận Chuyển Vaccine mRNA (LNP - Ionizable Lipid / PEG - 80 nm)',
    chemicalFormula: 'Ionizable lipid (SM-102) + DSPC + Cholesterol + PEG-2000 lipid + mRNA',
    particleType: 'LIPID_NANOPARTICLE',
    trueMeanDiameterNm: 82.0,
    trueModeDiameterNm: 78.5,
    polydispersityStandardDevNm: 11.0,
    nominalConcentrationParticlesPerMl: 8.5e8,
    refractiveIndex: 1.44,
    optimalLaserWavelengthNm: 488,
    optimalTemperatureCelsius: 25.0,
    description:
      'Lipid nanoparticles enabled the worldwide COVID-19 mRNA vaccines (Pfizer/BioNTech, Moderna). Sizing between 60 nm and 100 nm with low polydispersity (PDI < 0.12) is mandatory to guarantee endosomal escape and prevent rapid macrophage clearance in the liver.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 & Sinh học 12: Cấu tạo lipid phức tạp, liên kết este, tương tác kỵ nước và cơ chế phân phối vật chất di truyền mRNA vào ribosome.',
    biomedicalApplication:
      'Quality control for mRNA vaccine formulation stability, freeze-thaw aggregation checks, and encapsulation efficiency.',
    isoStandardRef: 'USP <1243> Submicron Particle Sizing in Injectables',
  },
  {
    id: 'adeno_associated_virus_vector',
    name: 'Adeno-Associated Virus Gene Therapy Capsids (AAV 25 nm)',
    vietnameseName: 'Vector Virus AAV Liệu Pháp Gen (Vỏ Capsid Tinh Khiết 25 nm & Cụm Tập Hợp Aggregation)',
    chemicalFormula: 'Icosahedral VP1/VP2/VP3 viral protein shell + ssDNA transgene',
    particleType: 'VIRAL_VECTOR',
    trueMeanDiameterNm: 26.2,
    trueModeDiameterNm: 25.0,
    polydispersityStandardDevNm: 3.5,
    nominalConcentrationParticlesPerMl: 3.2e9,
    refractiveIndex: 1.48,
    optimalLaserWavelengthNm: 405,
    optimalTemperatureCelsius: 20.0,
    description:
      'AAV vectors are the leading platform for in vivo gene therapy (e.g. Zolgensma for spinal muscular atrophy). Individual 25 nm capsids represent the extreme lower limit of NTA sensitivity, accurately counting monomeric virus particles and distinguishing immunogenic aggregation multimers (dimers 45 nm, trimers 65 nm).',
    curriculumNotes:
      'GDPT 2018 Sinh học 10 & 12: Cấu trúc virus không có màng bọc, vỏ protein capsid đối xứng hình khối 20 mặt, ứng dụng vector chuyển gen.',
    biomedicalApplication:
      'Determination of viral physical titer (capsids/mL) and detection of aggregation before patient infusion.',
    isoStandardRef: 'FDA Center for Biologics Evaluation and Research (CBER) Guidance for Gene Therapy',
  },
  {
    id: 'gold_nanoparticles_plasmonic',
    name: 'Colloidal Gold Nanoparticles (AuNPs 30 nm Plasmonic Calibrant)',
    vietnameseName: 'Hạt Nano Vàng Keo AuNP (30 nm - Tán Xạ Cộng Hưởng Plasmon Bề Mặt SPR 532 nm)',
    chemicalFormula: 'Au(0) core + Citrate capping shell',
    particleType: 'METALLIC_COLLOID',
    trueMeanDiameterNm: 31.4,
    trueModeDiameterNm: 30.0,
    polydispersityStandardDevNm: 2.8,
    nominalConcentrationParticlesPerMl: 5.0e8,
    refractiveIndex: 0.25, // Complex optical permittivity (dominant plasmon resonance)
    optimalLaserWavelengthNm: 532, // Green laser matches localized surface plasmon resonance (LSPR)
    optimalTemperatureCelsius: 25.0,
    description:
      'Colloidal gold displays localized surface plasmon resonance (LSPR) at 525-535 nm, scattering green laser light up to 10^5 times more intensely than a polystyrene bead of identical diameter. This allows tracking particles down to 15 nm with high signal-to-noise ratio.',
    curriculumNotes:
      'GDPT 2018 Hóa học 11 & 12: Đơn chất kim loại quý chuyển tiếp nhóm IB; hiện tượng nano plasmonics làm thay đổi màu sắc từ vàng khối sang đỏ ruby ánh tím ở kích thước nano.',
    biomedicalApplication:
      'Rapid lateral flow immunoassay diagnostics, photothermal cancer ablation, and optical instrument alignment.',
    isoStandardRef: 'NIST Standard Reference Material SRM 8011 Gold Nanoparticles',
  },
];

/**
 * Temperature-dependent dynamic viscosity of pure water (in Pa*s):
 * Vogel-Fulcher-Tammann approximation
 */
export function calculateWaterViscosityPaS(tempCelsius: number): number {
  const t = Math.max(5, Math.min(60, tempCelsius));
  // At 20°C: ~ 1.002 mPa*s, at 25°C: ~ 0.890 mPa*s, at 37°C: ~ 0.691 mPa*s
  const viscosityMpaS = 2.414e-2 * Math.pow(10, 247.8 / (t + 133.15));
  return viscosityMpaS * 1e-3; // convert to Pa*s
}

/**
 * Stokes-Einstein Diffusion Coefficient D_t (m^2/s):
 * D_t = (k_B * T) / (3 * pi * eta * d_H)
 */
export function calculateStokesEinsteinDiffusionCoeff(
  hydrodynamicDiameterNm: number,
  tempCelsius: number
): number {
  const dMeters = Math.max(1, hydrodynamicDiameterNm) * 1e-9;
  const tempK = tempCelsius + 273.15;
  const eta = calculateWaterViscosityPaS(tempCelsius);

  const dt = (BOLTZMANN_CONSTANT_J_PER_K * tempK) / (3 * Math.PI * eta * dMeters);
  return dt;
}

/**
 * Generate 2D Brownian Motion Trajectory for a single nanoparticle:
 * <(delta x)^2 + (delta y)^2> = 4 * D_t * delta t
 */
export function generateBrownianTrajectory(
  hydrodynamicDiameterNm: number,
  tempCelsius: number,
  numFrames: number = 25,
  frameIntervalSeconds: number = 0.0333 // 30 frames per second
): NtaTrajectoryPoint[] {
  const dt = calculateStokesEinsteinDiffusionCoeff(hydrodynamicDiameterNm, tempCelsius);
  // Standard deviation of 1D step: sigma_1D = sqrt(2 * D_t * delta t)
  const stepSigmaMeters = Math.sqrt(2 * dt * frameIntervalSeconds);
  const stepSigmaMicrons = stepSigmaMeters * 1e6;

  const points: NtaTrajectoryPoint[] = [];
  let currentX = 0.0;
  let currentY = 0.0;

  for (let f = 0; f < numFrames; f++) {
    points.push({
      frameIndex: f,
      xMicrons: Math.round(currentX * 1000) / 1000,
      yMicrons: Math.round(currentY * 1000) / 1000,
    });

    // Box-Muller Gaussian random step
    const u1 = Math.max(1e-6, Math.random());
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

    currentX += z0 * stepSigmaMicrons;
    currentY += z1 * stepSigmaMicrons;
  }

  return points;
}

/**
 * Simulate NTA Particle Size Distribution and Tracking Ensemble
 */
export function simulateNtaExperiment(
  standard: NtaStandard,
  temperatureCelsius: number = standard.optimalTemperatureCelsius
): NtaSimulationResult {
  const meanD = standard.trueMeanDiameterNm;
  const modeD = standard.trueModeDiameterNm;
  const sigmaD = standard.polydispersityStandardDevNm;
  const totalConc = standard.nominalConcentrationParticlesPerMl;
  const etaPaS = calculateWaterViscosityPaS(temperatureCelsius);
  const etaMpaS = Math.round(etaPaS * 1e6) / 1000;

  // Diffusion coefficient at mode diameter
  const dtMode = calculateStokesEinsteinDiffusionCoeff(modeD, temperatureCelsius);

  // Generate continuous lognormal / Gaussian size distribution
  const distributionCurve: SizeDistributionPoint[] = [];
  const minSize = Math.max(10, Math.floor(modeD - 3.5 * sigmaD));
  const maxSize = Math.ceil(modeD + 4.5 * sigmaD);
  const stepSize = Math.max(0.2, Math.round(((maxSize - minSize) / 100) * 10) / 10);

  let cumFreq = 0.0;
  const rawFrequencies: { d: number; freq: number }[] = [];

  for (let d = minSize; d <= maxSize; d += stepSize) {
    const roundedD = Math.round(d * 10) / 10;
    const diff = roundedD - modeD;
    const freq = Math.exp(-(diff * diff) / (2 * sigmaD * sigmaD));
    rawFrequencies.push({ d: roundedD, freq });
    cumFreq += freq;
  }

  // Percentiles D10, D50, D90 calculation
  let runningSum = 0.0;
  let d10 = minSize;
  let d50 = modeD;
  let d90 = maxSize;

  for (const item of rawFrequencies) {
    const normFreq = (item.freq / cumFreq) * 100.0;
    const binConc = (item.freq / cumFreq) * totalConc;
    distributionCurve.push({
      diameterNm: item.d,
      concentrationParticlesPerMl: Math.round(binConc),
      normalizedFrequencyPercent: Math.round(normFreq * 100) / 100,
    });

    runningSum += item.freq;
    const fract = runningSum / cumFreq;
    if (fract >= 0.10 && d10 === minSize) d10 = item.d;
    if (fract >= 0.50 && d50 === modeD) d50 = item.d;
    if (fract >= 0.90 && d90 === maxSize) d90 = item.d;
  }

  const spanMetric = Math.round(((d90 - d10) / d50) * 100) / 100;

  // Generate 8 discrete particle tracks for live microscopic visualizer
  const trackedParticles: ParticleTrack[] = [];
  for (let p = 0; p < 8; p++) {
    // Sample diameter around mode with slight random offset
    const dRand = Math.max(15, modeD + (Math.random() - 0.5) * 2 * sigmaD);
    const dt = calculateStokesEinsteinDiffusionCoeff(dRand, temperatureCelsius);
    const traj = generateBrownianTrajectory(dRand, temperatureCelsius, 30, 0.0333);

    // Rayleigh scattering intensity scales approximately as d^6 (or d^3 for plasmonics)
    const relIntensity = Math.min(255, Math.round(20 + Math.pow(dRand / modeD, 3.5) * 60));

    trackedParticles.push({
      particleId: p + 1,
      apparentDiameterNm: Math.round(dRand * 10) / 10,
      diffusionCoeffM2S: dt,
      trajectory: traj,
      scatteringIntensityAdu: relIntensity,
    });
  }

  return {
    standard,
    temperatureCelsius,
    mediumViscosityMpaS: etaMpaS,
    meanDiameterNm: Math.round(meanD * 10) / 10,
    modeDiameterNm: Math.round(modeD * 10) / 10,
    d10Nm: Math.round(d10 * 10) / 10,
    d50Nm: Math.round(d50 * 10) / 10,
    d90Nm: Math.round(d90 * 10) / 10,
    spanMetric,
    totalConcentrationParticlesPerMl: totalConc,
    diffusionCoeffModeM2S: dtMode,
    distributionCurve,
    trackedParticles,
    frameRateFps: 30,
  };
}

/**
 * Match a card to an appropriate NTA standard
 */
export function getMatchingNtaCard(card: any): NtaStandard | null {
  if (!card) return null;
  const name = (card.name || '').toLowerCase();
  const desc = (card.description || '').toLowerCase();
  const formula = (card.chemicalFormula || card.formula || '').toLowerCase();

  // 1. Polystyrene / Latex
  if (
    name.includes('polystyrene') ||
    desc.includes('latex') ||
    desc.includes('hạt chuẩn') ||
    formula.includes('c8h8')
  ) {
    return NTA_STANDARD_CATALOG.find((s) => s.id === 'nist_100nm_polystyrene_beads') || null;
  }

  // 2. Exosome / Extracellular Vesicles
  if (
    name.includes('exosome') ||
    desc.includes('extracellular vesicle') ||
    desc.includes('bóng màng') ||
    name.includes('túi tiết')
  ) {
    return NTA_STANDARD_CATALOG.find((s) => s.id === 'exosome_extracellular_vesicles') || null;
  }

  // 3. Lipid Nanoparticles / LNP
  if (
    name.includes('lnp') ||
    name.includes('lipid nanoparticle') ||
    desc.includes('mrna vaccine') ||
    desc.includes('hạt nano lipid')
  ) {
    return NTA_STANDARD_CATALOG.find((s) => s.id === 'lipid_nanoparticles_mrna_vaccine') || null;
  }

  // 4. AAV / Gene Therapy Vector
  if (
    name.includes('aav') ||
    name.includes('adeno') ||
    desc.includes('capsid') ||
    desc.includes('vector virus')
  ) {
    return NTA_STANDARD_CATALOG.find((s) => s.id === 'adeno_associated_virus_vector') || null;
  }

  // 5. Gold Nanoparticles / AuNPs
  if (
    name.includes('vàng keo') ||
    name.includes('aunp') ||
    name.includes('gold nano') ||
    (formula === 'au' && desc.includes('nano'))
  ) {
    return NTA_STANDARD_CATALOG.find((s) => s.id === 'gold_nanoparticles_plasmonic') || null;
  }

  return null;
}

/**
 * Validation helper for NTA standard physics
 */
export function validateNtaStandardPhysics(standard: NtaStandard): boolean {
  if (standard.trueMeanDiameterNm <= 0 || standard.trueModeDiameterNm <= 0) return false;
  if (standard.polydispersityStandardDevNm <= 0) return false;
  if (standard.nominalConcentrationParticlesPerMl <= 0) return false;
  if (standard.refractiveIndex <= 0) return false;
  return true;
}
