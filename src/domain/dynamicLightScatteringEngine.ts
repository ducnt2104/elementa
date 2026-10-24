// src/domain/dynamicLightScatteringEngine.ts
// Milestone 56: Dynamic Light Scattering (DLS), Stokes-Einstein Particle Size Distribution & Zeta Potential Engine
// Standards: Nobel Prize in Physics 1926 (Jean Baptiste Perrin - Brownian Motion & Sedimentation Equilibrium) & ISO 22412 / ASTM E2490 DLS Standards
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Kích thước hạt nano; Hóa học 11: Sự điện ly, pH & Điện thế bề mặt keo; Hóa học 12: Sự keo tụ Protein & Điểm đẳng điện pI; Vật lý 11: Chuyển động Brown & Tán xạ Rayleigh)

export interface DlsSampleStandard {
  id: string;
  name: string;
  nameVI: string;
  materialClassVI: string;
  hydrodynamicDiameterNm: number; // d_h = 2 * R_h (nm)
  polydispersityIndexPdi: number; // PDI = μ_2 / Γ^2
  isoelectricPointIep: number; // pH at which zeta potential = 0 mV
  zetaPotentialMvAtPh7: number; // mV
  refractiveIndex: number;
  descriptionVI: string;
  colorHex: string;
}

export interface DlsAutocorrelationPoint {
  delayTimeMicroseconds: number; // τ (μs)
  g2MinusOne: number; // Second-order correlation function g_2(τ) - 1
  fittedBaseline: number;
}

export interface DlsSizeDistributionBin {
  diameterNm: number;
  intensityPercentage: number; // I(d) - raw light scattering (Rayleigh ~ d^6)
  volumePercentage: number; // V(d) ~ I / d^3
  numberPercentage: number; // N(d) ~ I / d^6 (physical particle count)
}

export interface ZetaTitrationPoint {
  pH: number;
  zetaPotentialMv: number;
  electrophoreticMobility: number; // 10⁻⁸ m²/(V·s)
  colloidalStabilityVI: 'Ổn định điện tích âm cao' | 'Vùng keo tụ không ổn định (IEP)' | 'Ổn định điện tích dương cao';
}

export interface DlsSimulationResult {
  sample: DlsSampleStandard;
  temperatureCelsius: number;
  samplePh: number;
  solventViscosityPaS: number;
  diffusionCoefficientM2PerS: number; // D (m²/s)
  hydrodynamicDiameterNm: number;
  polydispersityIndexPdi: number;
  measuredZetaPotentialMv: number;
  stabilityStatusVI: string;
  autocorrelationCurve: DlsAutocorrelationPoint[];
  sizeDistribution: DlsSizeDistributionBin[];
  zetaTitrationCurve: ZetaTitrationPoint[];
  pedagogicalAnalysisVI: string;
}

// ============================================================================
// PHYSICAL CONSTANTS (CODATA / IUPAC)
// ============================================================================
export const BOLTZMANN_CONSTANT_KB = 1.380649e-23; // J/K
export const ELEMENTARY_CHARGE_E = 1.602176634e-19; // C
export const VACUUM_PERMITTIVITY_EPS0 = 8.8541878128e-12; // F/m
export const WATER_REFRACTIVE_INDEX_N = 1.330;
export const WATER_RELATIVE_PERMITTIVITY_EPSR = 78.54; // at 25°C
export const LASER_WAVELENGTH_NM = 632.8; // Red He-Ne laser (632.8 nm)
export const NIBS_SCATTERING_ANGLE_DEG = 173.0; // Non-Invasive Back Scatter (NIBS)

// ============================================================================
// DLS STANDARDS & COLLOIDAL SAMPLES CATALOG
// ============================================================================
export const DLS_CATALOG: Record<string, DlsSampleStandard> = {
  gold_nanoparticles_citrate: {
    id: 'gold_nanoparticles_citrate',
    name: 'Citrate-Capped Gold Nanoparticles (Au NPs)',
    nameVI: 'Hạt Nano Vàng 15 nm Bọc Citrate (Chuẩn Đơn Phân Tán ISO/NIST)',
    materialClassVI: 'Hệ keo nano kim loại quý đơn phân tán cao',
    hydrodynamicDiameterNm: 15.0,
    polydispersityIndexPdi: 0.04, // Siêu đơn phân tán (PDI < 0.05)
    isoelectricPointIep: 2.5,
    zetaPotentialMvAtPh7: -38.5, // Rất ổn định (<-30 mV)
    refractiveIndex: 0.20,
    descriptionVI: 'Chuẩn kích thước hạt nano quốc tế NIST. Các anion citrate tích điện âm bọc kín bề mặt tạo thế Zeta -38.5 mV, sinh lực đẩy tĩnh điện ngăn chặn hoàn toàn hiện tượng tụ hạt.',
    colorHex: '#f59e0b'
  },

  bsa_protein_monomer: {
    id: 'bsa_protein_monomer',
    name: 'Bovine Serum Albumin (BSA Monomer)',
    nameVI: 'Protein Huyết Thanh Bò Albumin (BSA - Đại Phân Tử Sinh Học)',
    materialClassVI: 'Protein hình cầu đơn phân tử (Globular Protein 66.5 kDa)',
    hydrodynamicDiameterNm: 7.1,
    polydispersityIndexPdi: 0.12,
    isoelectricPointIep: 4.7, // Điểm đẳng điện pI = 4.7
    zetaPotentialMvAtPh7: -18.2,
    refractiveIndex: 1.45,
    descriptionVI: 'Protein hình cầu kích thước 7.1 nm. Tại điểm đẳng điện pI = 4.7, tổng điện tích bằng 0 (Zeta = 0 mV), lực đẩy tĩnh điện biến mất khiến các chuỗi polypeptide keo tụ vón cục.',
    colorHex: '#38bdf8'
  },

  lipid_nanoparticles_mrna: {
    id: 'lipid_nanoparticles_mrna',
    name: 'Lipid Nanoparticles mRNA Carrier (LNP Vaccine)',
    nameVI: 'Hạt Nano Lipid Vận Chuyển mRNA (Công Nghệ Vaccine Pfizer/Moderna)',
    materialClassVI: 'Hệ mang thuốc nano hướng đích thông minh',
    hydrodynamicDiameterNm: 82.0,
    polydispersityIndexPdi: 0.15,
    isoelectricPointIep: 6.4, // Lipid có thể ion hóa (Ionizable lipid pKa ~ 6.5)
    zetaPotentialMvAtPh7: -4.5, // Trung hòa ở máu (pH 7.4), dương tính trong endosome (pH 5.0)
    refractiveIndex: 1.48,
    descriptionVI: 'Cấu trúc nano lipid thế hệ mới với lipid ion hóa: ở máu (pH 7.4) tích điện gần trung hòa để kéo dài thời gian lưu thông, nhưng trong endosome (pH 5.0) tích điện dương (+15 mV) để giải phóng mRNA vào tế bào chất.',
    colorHex: '#10b981'
  },

  tio2_photocatalyst_colloid: {
    id: 'tio2_photocatalyst_colloid',
    name: 'Titanium Dioxide Photocatalytic Slurry (TiO₂)',
    nameVI: 'Huyền Phù Oxit Bán Dẫn Quang Xúc Tác TiO₂ (Xử Lý Nước Thải)',
    materialClassVI: 'Hạt oxit vô cơ phân tán đa kích thước',
    hydrodynamicDiameterNm: 135.0,
    polydispersityIndexPdi: 0.28,
    isoelectricPointIep: 6.2,
    zetaPotentialMvAtPh7: -22.0,
    refractiveIndex: 2.60,
    descriptionVI: 'Hạt oxit nano titanium dioxide kích thước 135 nm. Ở pH kiềm bề mặt mang điện âm (Ti-O⁻), ở pH acid mang điện dương (Ti-OH₂⁺), chuyển pha keo tụ tại pH 6.2.',
    colorHex: '#8b5cf6'
  }
};

// ============================================================================
// STOKES-EINSTEIN & SMOLUCHOWSKI MATHEMATICAL EQUATIONS
// ============================================================================

/**
 * Calculates water dynamic viscosity at temperature T (°C):
 * Vogel-Fulcher-Tammann semi-empirical formula for water:
 * η(T) in Pa·s
 */
export function calculateWaterViscosity(temperatureC: number = 25.0): number {
  const tKelvin = temperatureC + 273.15;
  // Approximation around 15°C - 45°C
  const etaMpaS = 0.890 * Math.exp(-0.021 * (temperatureC - 25.0));
  return Number((etaMpaS * 1e-3).toPrecision(4)); // Pa·s
}

/**
 * Calculates translational diffusion coefficient D from Hydrodynamic Radius:
 * D = (k_B * T) / (6 * π * η * R_h)
 * (Stokes-Einstein Relation)
 * Output in m²/s
 */
export function calculateDiffusionCoefficient(
  hydrodynamicRadiusNm: number,
  temperatureC: number = 25.0
): number {
  const T = temperatureC + 273.15;
  const eta = calculateWaterViscosity(temperatureC);
  const RhMeters = hydrodynamicRadiusNm * 1e-9;
  const D = (BOLTZMANN_CONSTANT_KB * T) / (6 * Math.PI * eta * RhMeters);
  return Number(D.toPrecision(4));
}

/**
 * Calculates Hydrodynamic Radius R_h from measured diffusion coefficient D:
 * R_h = (k_B * T) / (6 * π * η * D)
 * Output in nm
 */
export function calculateHydrodynamicRadius(
  diffusionCoefficientM2PerS: number,
  temperatureC: number = 25.0
): number {
  const T = temperatureC + 273.15;
  const eta = calculateWaterViscosity(temperatureC);
  const RhMeters = (BOLTZMANN_CONSTANT_KB * T) / (6 * Math.PI * eta * diffusionCoefficientM2PerS);
  return Number((RhMeters * 1e9).toFixed(2));
}

/**
 * Calculates scattering wavevector q:
 * q = (4 * π * n / λ_0) * sin(θ / 2)
 * Output in m⁻¹
 */
export function calculateScatteringWavevectorQ(
  laserWavelengthNm: number = LASER_WAVELENGTH_NM,
  refractiveIndex: number = WATER_REFRACTIVE_INDEX_N,
  scatteringAngleDeg: number = NIBS_SCATTERING_ANGLE_DEG
): number {
  const lambdaMeters = laserWavelengthNm * 1e-9;
  const thetaRad = (scatteringAngleDeg * Math.PI) / 180.0;
  const q = ((4 * Math.PI * refractiveIndex) / lambdaMeters) * Math.sin(thetaRad / 2);
  return Number(q.toPrecision(5));
}

/**
 * Converts Electrophoretic Mobility to Zeta Potential:
 * Smoluchowski Equation (valid for aqueous solutions with thin double layer κa >> 1):
 * ζ = (μ_e * η) / (ε_r * ε_0)
 * Output in mV
 */
export function calculateZetaPotentialFromMobility(
  mobilityMicronsCmPerVs: number, // 10⁻⁸ m²/(V·s)
  temperatureC: number = 25.0
): number {
  const eta = calculateWaterViscosity(temperatureC);
  const eps = WATER_RELATIVE_PERMITTIVITY_EPSR * VACUUM_PERMITTIVITY_EPS0;
  const mobilityM2PerVs = mobilityMicronsCmPerVs * 1e-8;
  const zetaVolts = (mobilityM2PerVs * eta) / eps;
  return Number((zetaVolts * 1000).toFixed(1)); // Convert to mV
}

/**
 * Simulates complete DLS autocorrelation curve, Size distribution (Intensity, Volume, Number),
 * and Zeta potential titration across pH 2 to 12.
 */
export function simulateDlsMeasurement(
  sampleId: string,
  temperatureCelsius: number = 25.0,
  samplePh: number = 7.0
): DlsSimulationResult {
  const sample = DLS_CATALOG[sampleId] || DLS_CATALOG.gold_nanoparticles_citrate;

  const RhNm = sample.hydrodynamicDiameterNm / 2.0;
  const D = calculateDiffusionCoefficient(RhNm, temperatureCelsius);
  const q = calculateScatteringWavevectorQ(LASER_WAVELENGTH_NM, WATER_REFRACTIVE_INDEX_N, NIBS_SCATTERING_ANGLE_DEG);
  const gamma = D * q * q; // Decay rate Γ in s⁻¹

  // 1. Second-Order Autocorrelation Function g_2(τ) - 1:
  // g_2(τ) - 1 = β * exp(-2 * Γ * τ) * (1 + μ_2/2 * τ²)^2
  const autocorrelationCurve: DlsAutocorrelationPoint[] = [];
  const beta = 0.88; // Instrument coherence factor
  const pdi = sample.polydispersityIndexPdi;

  // Logarithmic time steps from 0.5 μs to 100,000 μs (100 ms)
  for (let exp = -0.5; exp <= 5.0; exp += 0.08) {
    const tauMicroseconds = Math.pow(10, exp);
    const tauSeconds = tauMicroseconds * 1e-6;

    // Cumulants expansion with PDI decay
    const exponent = -2.0 * gamma * tauSeconds * (1 - 0.5 * pdi * gamma * tauSeconds);
    const g2MinusOne = beta * Math.exp(Math.max(-25.0, exponent));

    autocorrelationCurve.push({
      delayTimeMicroseconds: Number(tauMicroseconds.toFixed(2)),
      g2MinusOne: Number(Math.max(0.0001, g2MinusOne).toFixed(4)),
      fittedBaseline: Number(beta.toFixed(3))
    });
  }

  // 2. Multi-tier Size Distribution (Intensity vs Volume vs Number):
  // Rayleigh scattering: I ~ d^6; Volume ~ d^3; Number ~ d^0
  const sizeDistribution: DlsSizeDistributionBin[] = [];
  const meanDiameter = sample.hydrodynamicDiameterNm;
  const sigmaLog = Math.sqrt(Math.log(1 + pdi)); // Width of log-normal distribution

  const numBins = 70;
  const minD = Math.max(0.5, meanDiameter * 0.15);
  const maxD = meanDiameter * 5.0;
  const stepLog = (Math.log10(maxD) - Math.log10(minD)) / (numBins - 1);

  let sumIntensity = 0;
  let sumVolume = 0;
  let sumNumber = 0;

  const rawBins: { d: number; iRaw: number; vRaw: number; nRaw: number }[] = [];

  for (let i = 0; i < numBins; i++) {
    const logD = Math.log10(minD) + i * stepLog;
    const d = Math.pow(10, logD);

    // Log-normal distribution centered around meanDiameter
    const lnRatio = Math.log(d / meanDiameter);
    const intensity = (1 / (d * sigmaLog * Math.sqrt(2 * Math.PI))) * Math.exp(-(lnRatio * lnRatio) / (2 * sigmaLog * sigmaLog));

    // Convert intensity distribution to Volume (~ I / d³) and Number (~ I / d⁶)
    const volume = intensity / Math.pow(d, 3);
    const number = intensity / Math.pow(d, 6);

    sumIntensity += intensity;
    sumVolume += volume;
    sumNumber += number;

    rawBins.push({ d, iRaw: intensity, vRaw: volume, nRaw: number });
  }

  rawBins.forEach((b) => {
    sizeDistribution.push({
      diameterNm: Number(b.d.toFixed(2)),
      intensityPercentage: Number(((b.iRaw / sumIntensity) * 100).toFixed(2)),
      volumePercentage: Number(((b.vRaw / sumVolume) * 100).toFixed(2)),
      numberPercentage: Number(((b.nRaw / sumNumber) * 100).toFixed(2))
    });
  });

  // 3. Zeta Potential pH Titration Curve:
  const zetaTitrationCurve: ZetaTitrationPoint[] = [];
  const iep = sample.isoelectricPointIep;
  const baseZeta7 = sample.zetaPotentialMvAtPh7;

  for (let pH = 2.0; pH <= 12.0; pH += 0.5) {
    // Sigmoidal Henderson-Hasselbalch style surface protonation curve:
    // ζ(pH) = -45 * tanh((pH - iep) / 2.2)
    const zeta = -48.0 * Math.tanh((pH - iep) / 2.4);
    const mobility = (zeta / 1000) * (WATER_RELATIVE_PERMITTIVITY_EPSR * VACUUM_PERMITTIVITY_EPS0) / calculateWaterViscosity(temperatureCelsius) * 1e8;

    let colloidalStabilityVI: ZetaTitrationPoint['colloidalStabilityVI'] = 'Ổn định điện tích âm cao';
    if (Math.abs(zeta) < 15.0) {
      colloidalStabilityVI = 'Vùng keo tụ không ổn định (IEP)';
    } else if (zeta > 15.0) {
      colloidalStabilityVI = 'Ổn định điện tích dương cao';
    }

    zetaTitrationCurve.push({
      pH: Number(pH.toFixed(1)),
      zetaPotentialMv: Number(zeta.toFixed(1)),
      electrophoreticMobility: Number(mobility.toFixed(2)),
      colloidalStabilityVI
    });
  }

  // Current measured Zeta potential at requested samplePh:
  const measuredZetaPotentialMv = Number((-48.0 * Math.tanh((samplePh - iep) / 2.4)).toFixed(1));
  let stabilityStatusVI = 'Ổn định tuyệt vời (|ζ| ≥ 30 mV, lực đẩy tĩnh điện chiếm ưu thế)';
  if (Math.abs(measuredZetaPotentialMv) < 15.0) {
    stabilityStatusVI = 'Nguy cơ keo tụ cao (|ζ| < 15 mV, gần điểm đẳng điện IEP)';
  } else if (Math.abs(measuredZetaPotentialMv) < 30.0) {
    stabilityStatusVI = 'Độ ổn định vừa phải (15 mV ≤ |ζ| < 30 mV)';
  }

  const pedagogicalAnalysisVI = `Tán xạ ánh sáng động (DLS) & Đo thế Zeta phân tích mẫu ${sample.nameVI} tại nhiệt độ T = ${temperatureCelsius}°C và pH = ${samplePh}. Các hạt phân tán chuyển động nhiệt Brown ngẫu nhiên theo định luật Einstein-Perrin (Nobel Vật lý 1926). Hàm tự tương tác cường độ photon g₂(τ) suy giảm với tốc độ phân rã Γ = ${gamma.toExponential(2)} s⁻¹, xác định hệ số khuếch tán tịnh tiến D = ${D.toExponential(2)} m²/s. Áp dụng hệ thức Stokes-Einstein D = k_B·T / (6πηR_h), đường kính thủy động học đạt d_h = ${sample.hydrodynamicDiameterNm} nm với chỉ số đa phân tán PDI = ${pdi} (đơn phân tán cao). Theo thuyết tán xạ Rayleigh, cường độ tán xạ tỉ lệ với lũy thừa 6 của kích thước hạt (I ~ d⁶), khiến phân bố cường độ nhạy cảm vượt trội với các hạt lớn/cụm kết tụ so với phân bố thể tích và số lượng hạt. Tại pH = ${samplePh}, thế Zeta đo được là ζ = ${measuredZetaPotentialMv} mV (Điểm đẳng điện IEP = pH ${iep}), phản ánh trạng thái ${stabilityStatusVI}.`;

  return {
    sample,
    temperatureCelsius,
    samplePh,
    solventViscosityPaS: calculateWaterViscosity(temperatureCelsius),
    diffusionCoefficientM2PerS: D,
    hydrodynamicDiameterNm: sample.hydrodynamicDiameterNm,
    polydispersityIndexPdi: pdi,
    measuredZetaPotentialMv,
    stabilityStatusVI,
    autocorrelationCurve,
    sizeDistribution,
    zetaTitrationCurve,
    pedagogicalAnalysisVI
  };
}

/**
 * Card matching service: identifies if an ELEMENTA card corresponds to a DLS / Zeta standard
 */
export function getMatchingDlsCard(card: { id?: string; name?: string; description?: string }): DlsSampleStandard | null {
  if (!card) return null;
  const text = `${card.id || ''} ${card.name || ''} ${card.description || ''}`.toLowerCase();

  if (text.includes('vàng') || text.includes('gold') || text.includes('keo') || text.includes('colloid')) {
    return DLS_CATALOG.gold_nanoparticles_citrate;
  }
  if (text.includes('albumin') || text.includes('bsa') || text.includes('protein') || text.includes('lòng trắng')) {
    return DLS_CATALOG.bsa_protein_monomer;
  }
  if (text.includes('lipid') || text.includes('lnp') || text.includes('mrna') || text.includes('vaccine')) {
    return DLS_CATALOG.lipid_nanoparticles_mrna;
  }
  if (text.includes('titan') || text.includes('tio2') || text.includes('huyền phù') || text.includes('slurry')) {
    return DLS_CATALOG.tio2_photocatalyst_colloid;
  }

  return null;
}
