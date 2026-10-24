/**
 * Supercritical Fluid Chromatography (SFC) & Green Solvent Chiral Separation Engine
 * 
 * IUPAC Standards & Physical Principles:
 * 1. Supercritical CO2 state: T_c = 31.1°C (304.25 K), P_c = 73.8 bar (7.38 MPa), rho_c = 0.468 g/cm^3.
 * 2. Tunable solvating power via pressure (density rho ~ 0.2 to 0.95 g/cm^3) and organic modifiers (MeOH, EtOH).
 * 3. Fast mass transfer & high diffusivity (D_m ~ 10^-4 cm^2/s) yielding sharp peaks at 3-5x linear velocity of HPLC.
 * 4. Chiral stationary phases (Amylose/Cellulose carbamates) separating critical drug enantiomers:
 *    - Thalidomide (R-sedative vs S-teratogen)
 *    - Ibuprofen (S-active NSAID vs R-inactive)
 *    - Esomeprazole (S-enantiomer proton pump inhibitor)
 *    - Cannabinoids green extraction (CBD / THC resolution)
 *    - Tocopherol vitamin E isomer fractionation
 * 5. Green Analytical Chemistry: Non-toxic, non-flammable CO2 recycled at 100% via depressurization.
 * 6. Curriculum: Vietnam GDPT 2018 (Hóa học 11: Sắc ký cột, dung môi xanh; Hóa học 12: Đồng phân quang học, chirality, đối quang enantio, dược phẩm).
 */

export const CO2_CRITICAL_TEMP_CELSIUS = 31.1; // °C
export const CO2_CRITICAL_PRESSURE_BAR = 73.8; // bar
export const CO2_CRITICAL_DENSITY_G_CM3 = 0.468; // g/cm^3

export type SfcModifierType = 'METHANOL' | 'ETHANOL' | 'ISOPROPANOL' | 'ACETONITRILE';

export type ChiralStationaryPhase =
  | 'CHIRALPAK_AD_AMYLOSE'
  | 'CHIRALCEL_OD_CELLULOSE'
  | 'CHIRALPAK_IA_IMMOBILIZED'
  | 'C18_SUPERCRITICAL_RP';

export interface SfcPeakDefinition {
  analyteName: string;
  enantiomerDesignation?: '(R)' | '(S)' | 'trans' | 'cis' | 'alpha' | 'gamma' | 'isomer';
  baseCapacityFactorK: number; // k' retention factor
  peakAreaPercent: number; // e.g. 50% for racemate
  pharmacologicalRole: string; // clinical activity or safety profile
}

export interface SfcStandard {
  id: string;
  name: string;
  vietnameseName: string;
  chemicalFormula: string;
  compoundClass: string;
  stationaryPhase: ChiralStationaryPhase;
  stationaryPhaseName: string;
  preferredModifier: SfcModifierType;
  defaultModifierPercent: number; // e.g. 15%
  defaultBackPressureBar: number; // e.g. 150 bar
  defaultOvenTempCelsius: number; // e.g. 40°C
  defaultFlowRateMlMin: number; // e.g. 3.0 mL/min
  columnLengthMm: number; // e.g. 250 mm
  columnInternalDiameterMm: number; // e.g. 4.6 mm
  particleSizeUm: number; // e.g. 5.0 um
  peaks: SfcPeakDefinition[];
  greenChemistryScorePercent: number; // 90-98%
  description: string;
  curriculumNotes: string;
  clinicalSignificance: string;
  greenSolventBenefits: string;
}

export interface ChromatographicPeakResult {
  analyteName: string;
  enantiomerDesignation?: string;
  retentionTimeMinutes: number; // t_R
  retentionFactorK: number; // k = (t_R - t_0) / t_0
  peakWidthAtHalfMaxMinutes: number; // w_0.5
  peakHeightMau: number; // milli-absorbance units
  peakArea: number;
  areaPercent: number;
  pharmacologicalRole: string;
}

export interface SfcChromatogramPoint {
  timeMinutes: number; // X-axis (0 to 10 min)
  absorbanceMau: number; // Y-axis (mAU)
  isPeakCenter?: boolean;
}

export interface SfcSimulationResult {
  standard: SfcStandard;
  densityCo2GPerCm3: number;
  deadTimeT0Minutes: number;
  linearVelocityCmPerSec: number;
  peaks: ChromatographicPeakResult[];
  separationFactorAlpha: number; // alpha = k2 / k1
  resolutionRs: number; // R_s = 2(tR2 - tR1) / (w1 + w2)
  enantiomericExcessPercent: number; // ee% = |A1 - A2| / (A1 + A2) * 100
  theoreticalPlateCountN: number;
  hetpMicrometers: number; // H = L / N
  chromatogramPoints: SfcChromatogramPoint[];
  isBaselineResolved: boolean; // R_s >= 1.5
  solventWasteSavedKgPerDay: number;
}

/**
 * Standard Catalog: 5 Benchmark Supercritical Fluid Chromatography Systems
 */
export const SFC_STANDARD_CATALOG: SfcStandard[] = [
  {
    id: 'thalidomide_chiral_enantiomers',
    name: 'Thalidomide Enantiomers (R-Sedative vs S-Teratogen Landmark)',
    vietnameseName: 'Đồng Phân Đối Quang Thalidomide ((R)-An Thần vs (S)-Gây Quái Thai - Chiralpak IA)',
    chemicalFormula: 'C13H10N2O4 (Racemate mixture)',
    compoundClass: 'CHIRAL_PHARMACEUTICAL',
    stationaryPhase: 'CHIRALPAK_IA_IMMOBILIZED',
    stationaryPhaseName: 'Amylose tris(3,5-dimethylphenylcarbamate) gắn cố định',
    preferredModifier: 'METHANOL',
    defaultModifierPercent: 20.0,
    defaultBackPressureBar: 150.0,
    defaultOvenTempCelsius: 35.0,
    defaultFlowRateMlMin: 3.0,
    columnLengthMm: 250,
    columnInternalDiameterMm: 4.6,
    particleSizeUm: 5.0,
    peaks: [
      {
        analyteName: '(R)-Thalidomide',
        enantiomerDesignation: '(R)',
        baseCapacityFactorK: 2.15,
        peakAreaPercent: 50.0,
        pharmacologicalRole: 'Tác dụng an thần, gây ngủ an toàn và kháng ung thư u tủy (multiple myeloma).',
      },
      {
        analyteName: '(S)-Thalidomide',
        enantiomerDesignation: '(S)',
        baseCapacityFactorK: 3.45,
        peakAreaPercent: 50.0,
        pharmacologicalRole: 'Tác nhân quái thai thảm họa lịch sử y học thập niên 1960 (hội chứng phocomelia teo chi).',
      },
    ],
    greenChemistryScorePercent: 96,
    description:
      'Thalidomide is the ultimate historical justification for chiral pharmacology and FDA regulation. In SFC, supercritical CO2 with 20% methanol on an immobilized amylose carbamate column separates (R) and (S) enantiomers in under 4 minutes with baseline resolution (Rs > 2.4), eliminating thousands of liters of toxic hexane/chloroform waste required by classical normal-phase HPLC.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12: Đồng phân lập thể, tâm bất đối xứng (carbon bất đối C*), đồng phân quang học đối quang (enantiomer) và tầm quan trọng sống còn trong tổng hợp dược phẩm.',
    clinicalSignificance:
      'Demonstrates that enantiomers have radically divergent biological targets; rapid SFC chiral testing prevents teratogenic contamination.',
    greenSolventBenefits:
      'Replaces neurotoxic n-hexane with recycled non-toxic supercritical CO2; saves 18.5 L/day of hazardous organic waste in high-throughput QC.',
  },
  {
    id: 'ibuprofen_nsaid_enantiomers',
    name: 'Ibuprofen NSAID Enantiomers (S-Dexibuprofen vs R-Inactive)',
    vietnameseName: 'Đồng Phân Đối Quang Ibuprofen ((S)-Dexibuprofen Hoạt Tính vs (R)-Không Hoạt Tính)',
    chemicalFormula: 'C13H18O2 (2-(4-isobutylphenyl)propanoic acid)',
    compoundClass: 'NON_STEROIDAL_ANTI_INFLAMMATORY',
    stationaryPhase: 'CHIRALCEL_OD_CELLULOSE',
    stationaryPhaseName: 'Cellulose tris(3,5-dimethylphenylcarbamate)',
    preferredModifier: 'ETHANOL',
    defaultModifierPercent: 12.0,
    defaultBackPressureBar: 130.0,
    defaultOvenTempCelsius: 40.0,
    defaultFlowRateMlMin: 3.5,
    columnLengthMm: 150,
    columnInternalDiameterMm: 4.6,
    particleSizeUm: 3.0,
    peaks: [
      {
        analyteName: '(S)-(+)-Ibuprofen (Dexibuprofen)',
        enantiomerDesignation: '(S)',
        baseCapacityFactorK: 1.62,
        peakAreaPercent: 50.0,
        pharmacologicalRole: 'Dược chất ức chế COX-1/COX-2 hoạt tính mạnh gấp 160 lần đối quang (R), giảm đau hạ sốt.',
      },
      {
        analyteName: '(R)-(-)-Ibuprofen',
        enantiomerDesignation: '(R)',
        baseCapacityFactorK: 2.38,
        peakAreaPercent: 50.0,
        pharmacologicalRole: 'Không có hoạt tính ức chế COX trực tiếp; trải qua phản ứng chuyển đổi đồng phân chậm in vivo.',
      },
    ],
    greenChemistryScorePercent: 98,
    description:
      'Ibuprofen is one of the most widely used NSAIDs in the world. Dexibuprofen is the pure active eutomer. Supercritical CO2 with 12% green ethanol on a Chiralcel OD phase delivers ultrafast separation within 2.5 minutes, demonstrating green analytical chemistry with zero chlorinated solvents.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12: Axit cacboxylic thơm, tâm chiral tại vị trí alpha, hoạt tính sinh học chọn lọc quang học của thuốc giảm đau.',
    clinicalSignificance:
      'Using the pure (S)-enantiomer allows 50% lower dosing and reduces gastrointestinal irritation and kidney load.',
    greenSolventBenefits:
      '100% bio-ethanol and supercritical CO2; zero toxicity footprint conforming to ACS Green Chemistry Institute guidelines.',
  },
  {
    id: 'esomeprazole_omeprazole_ppi',
    name: 'Omeprazole / Esomeprazole (Proton Pump Inhibitor Chiral Resolution)',
    vietnameseName: 'Esomeprazole vs (R)-Omeprazole (Thuốc Ức Chế Bơm Proton Dạ Dày - Chiralpak AD)',
    chemicalFormula: 'C17H19N3O3S (Chiral sulfoxide center)',
    compoundClass: 'GASTRIC_PROTON_PUMP_INHIBITOR',
    stationaryPhase: 'CHIRALPAK_AD_AMYLOSE',
    stationaryPhaseName: 'Amylose tris(3,5-dimethylphenylcarbamate) coated on silica',
    preferredModifier: 'ISOPROPANOL',
    defaultModifierPercent: 18.0,
    defaultBackPressureBar: 140.0,
    defaultOvenTempCelsius: 38.0,
    defaultFlowRateMlMin: 2.8,
    columnLengthMm: 250,
    columnInternalDiameterMm: 4.6,
    particleSizeUm: 5.0,
    peaks: [
      {
        analyteName: '(S)-Omeprazole (Esomeprazole / Nexium)',
        enantiomerDesignation: '(S)',
        baseCapacityFactorK: 2.40,
        peakAreaPercent: 85.0, // High ee% formulation
        pharmacologicalRole: 'Thuốc ức chế H+/K+-ATPase thành tế bào viền dạ dày, điều trị trào ngược dạ dày thực quản (GERD).',
      },
      {
        analyteName: '(R)-Omeprazole',
        enantiomerDesignation: '(R)',
        baseCapacityFactorK: 3.92,
        peakAreaPercent: 15.0,
        pharmacologicalRole: 'Bị chuyển hóa nhanh hơn bởi enzym gan CYP2C19, làm giảm sinh khả dụng trong huyết tương.',
      },
    ],
    greenChemistryScorePercent: 94,
    description:
      'Esomeprazole (Nexium) was one of the largest blockbuster drug "chiral switches" in pharmaceutical history, replacing racemic Omeprazole with pure (S)-enantiomer. The chirality arises from the asymmetric sulfoxide sulfur atom (S*=O). SFC provides complete chiral purity verification in under 5 minutes.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12: Hợp chất dị vòng chứa lưu huỳnh và nitơ; tâm bất đối tại nguyên tử lưu huỳnh (chiral sulfoxide) và tương tác với thụ thể sinh học.',
    clinicalSignificance:
      'Higher metabolic stability and consistent acid suppression across patients with varying CYP2C19 genotypes.',
    greenSolventBenefits:
      'Saves up to 92% organic solvent consumption compared to traditional normal-phase liquid chromatography.',
  },
  {
    id: 'cannabinoid_green_fractionation',
    name: 'Cannabinoid Green Fractionation (CBD vs THC vs CBN)',
    vietnameseName: 'Phân Tách Hoạt Chất Cannabinoid Xanh (CBD vs THC vs CBN - C18 Supercritical RP)',
    chemicalFormula: 'C21H30O2 (CBD & THC) / C21H26O2 (CBN)',
    compoundClass: 'PLANT_PHYTOCANNABINOIDS',
    stationaryPhase: 'C18_SUPERCRITICAL_RP',
    stationaryPhaseName: 'Octadecylsilane C18 liên kết pha đảo áp suất cao',
    preferredModifier: 'ETHANOL',
    defaultModifierPercent: 10.0,
    defaultBackPressureBar: 160.0,
    defaultOvenTempCelsius: 45.0,
    defaultFlowRateMlMin: 4.0,
    columnLengthMm: 150,
    columnInternalDiameterMm: 4.6,
    particleSizeUm: 2.7,
    peaks: [
      {
        analyteName: 'Cannabidiol (CBD)',
        enantiomerDesignation: 'isomer',
        baseCapacityFactorK: 1.45,
        peakAreaPercent: 70.0,
        pharmacologicalRole: 'Không gây say, giảm co giật thần kinh (hội chứng Dravet) và chống viêm điều trị động kinh.',
      },
      {
        analyteName: 'delta-9-Tetrahydrocannabinol (THC)',
        enantiomerDesignation: 'isomer',
        baseCapacityFactorK: 2.25,
        peakAreaPercent: 25.0,
        pharmacologicalRole: 'Chất đồng vận thụ thể CB1 gây tác động tâm thần, giảm đau mạn tính và chống nôn mửa hóa trị.',
      },
      {
        analyteName: 'Cannabinol (CBN)',
        enantiomerDesignation: 'isomer',
        baseCapacityFactorK: 3.10,
        peakAreaPercent: 5.0,
        pharmacologicalRole: 'Sản phẩm oxy hóa thoái hóa của THC có tác dụng an thần nhẹ.',
      },
    ],
    greenChemistryScorePercent: 99,
    description:
      'Supercritical fluid extraction (SFE) coupled with SFC is the global gold standard for clean cannabinoid medicine production. Supercritical CO2 extracts lipophilic cannabinoids without hazardous residual solvents (butane, hexane). On a C18 SFC column, CBD and THC are cleanly resolved with 99% green chemistry score.',
    curriculumNotes:
      'GDPT 2018 Hóa học 11 & 12: Chiết xuất chất có nguồn gốc thực vật bằng chất lỏng siêu tới hạn; đồng phân vị trí và đồng phân hình học của terpenoid và phenol.',
    clinicalSignificance:
      'Guarantees zero pesticide and solvent residues in pediatric medical cannabis formulations.',
    greenSolventBenefits:
      '100% solvent-free extract upon depressurization to atmospheric pressure; CO2 returns immediately to gas and is re-compressed.',
  },
  {
    id: 'tocopherol_vitamin_e_isomers',
    name: 'Vitamin E Tocopherol Homologues (Alpha, Beta, Gamma, Delta Fractionation)',
    vietnameseName: 'Đồng Phân Vitamin E Tocopherol (alpha-, beta-, gamma-, delta-Tocopherol)',
    chemicalFormula: 'C29H50O2 (alpha) to C27H46O2 (delta) - Chromanol core with isoprenoid chain',
    compoundClass: 'LIPID_SOLUBLE_ANTIOXIDANT',
    stationaryPhase: 'CHIRALCEL_OD_CELLULOSE',
    stationaryPhaseName: 'Cellulose tris(3,5-dimethylphenylcarbamate)',
    preferredModifier: 'METHANOL',
    defaultModifierPercent: 8.0,
    defaultBackPressureBar: 135.0,
    defaultOvenTempCelsius: 32.0,
    defaultFlowRateMlMin: 3.2,
    columnLengthMm: 250,
    columnInternalDiameterMm: 4.6,
    particleSizeUm: 5.0,
    peaks: [
      {
        analyteName: 'alpha-Tocopherol (5,7,8-trimethyl)',
        enantiomerDesignation: 'alpha',
        baseCapacityFactorK: 1.20,
        peakAreaPercent: 40.0,
        pharmacologicalRole: 'Hoạt tính vitamin E sinh học cao nhất ở người, bảo vệ màng lipid tế bào khỏi sự peroxy hóa.',
      },
      {
        analyteName: 'beta-Tocopherol (5,8-dimethyl)',
        enantiomerDesignation: 'isomer',
        baseCapacityFactorK: 1.75,
        peakAreaPercent: 15.0,
        pharmacologicalRole: 'Đồng phân bảo vệ dầu thực vật chống oxy hóa trung bình.',
      },
      {
        analyteName: 'gamma-Tocopherol (7,8-dimethyl)',
        enantiomerDesignation: 'gamma',
        baseCapacityFactorK: 2.10,
        peakAreaPercent: 35.0,
        pharmacologicalRole: 'Tác dụng bẫy gốc nitơ phản ứng (RNS) vượt trội hơn alpha-tocopherol trong tim mạch.',
      },
      {
        analyteName: 'delta-Tocopherol (8-monomethyl)',
        enantiomerDesignation: 'isomer',
        baseCapacityFactorK: 2.85,
        peakAreaPercent: 10.0,
        pharmacologicalRole: 'Khả năng chống oxy hóa hóa học tự nhiên mạnh nhất trong thực phẩm chống ôi thiu.',
      },
    ],
    greenChemistryScorePercent: 97,
    description:
      'Natural vitamin E extracted from soybean and sunflower oil comprises 4 positional isomers differing only in methyl substitution on the chromanol ring. Traditional HPLC struggles to separate beta and gamma isomers. Supercritical CO2 gently separates all 4 tocopherols at low temperature (32°C), preventing thermal oxidation.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12: Vitamin tan trong dầu mỡ, cấu trúc phenolic chống oxy hóa gốc tự do, bảo vệ màng sinh chất tế bào.',
    clinicalSignificance:
      'Purification of natural d-alpha-tocopherol from mixed tocopherol feeds with high pharmaceutical grade yield.',
    greenSolventBenefits:
      'Low thermal stress (32°C) preserves sensitive antioxidant structures while eliminating toxic n-hexane solvent consumption.',
  },
];

/**
 * Empirical Span-Wagner approximation for Supercritical CO2 Density:
 * Returns density rho in g/cm^3 as a function of pressure (bar) and temperature (°C)
 */
export function calculateCo2Density(pressureBar: number, tempCelsius: number): number {
  const p = Math.max(50, Math.min(400, pressureBar));
  const t = Math.max(25, Math.min(80, tempCelsius));
  const tK = t + 273.15;
  const pMPa = p * 0.1;

  // Reduced variables
  const tau = 304.25 / tK; // T_c / T
  const delta = pMPa / 7.38; // P / P_c

  // Empirical fitting for supercritical fluid chromatography operating envelope (80 - 300 bar, 30 - 60°C)
  let density = 0.468 * Math.pow(delta / tau, 0.42);

  // Correction for liquid-like density surge near critical point
  if (p >= 73.8 && t >= 31.1) {
    const pExcess = (p - 73.8) / 100;
    const tExcess = (t - 31.1) / 30;
    density = 0.52 + 0.38 * (1 - Math.exp(-pExcess * 1.5)) - 0.22 * (1 - Math.exp(-tExcess * 1.2));
  } else if (p < 73.8) {
    // Gas-like subcritical
    density = Math.max(0.12, (p / 73.8) * 0.35);
  }

  return Math.max(0.15, Math.min(0.98, Math.round(density * 1000) / 1000));
}

/**
 * Van Deemter equation for Supercritical Fluid Chromatography:
 * H = A + B/u + C*u
 * Because diffusivity D_m in supercritical CO2 is ~10x higher than in liquid HPLC:
 * - The C-term (mass transfer resistance) is lower, enabling high flow rates without severe plate loss.
 */
export function calculateVanDeemterHetpUm(
  linearVelocityCmS: number,
  particleSizeUm: number = 5.0
): number {
  const dp = particleSizeUm; // micrometers
  const u = Math.max(0.1, linearVelocityCmS);

  // A-term: Eddy diffusion ~ 1.5 * dp
  const termA = 1.5 * dp;

  // B-term: Longitudinal diffusion ~ 2 * D_m / u (converted to um)
  const termB = (12.0 * dp) / u;

  // C-term: Stationary & mobile phase mass transfer ~ 0.04 * dp^2 * u
  const termC = 0.035 * dp * u;

  const hetp = termA + termB + termC;
  return Math.round(hetp * 10) / 10; // in micrometers
}

/**
 * Simulate complete Supercritical Fluid Chromatogram
 */
export function simulateSfcChromatogram(
  standard: SfcStandard,
  modifierPercent: number = standard.defaultModifierPercent,
  backPressureBar: number = standard.defaultBackPressureBar,
  ovenTempCelsius: number = standard.defaultOvenTempCelsius,
  flowRateMlMin: number = standard.defaultFlowRateMlMin
): SfcSimulationResult {
  const density = calculateCo2Density(backPressureBar, ovenTempCelsius);

  // Column physical dimensions
  const colRadiusCm = standard.columnInternalDiameterMm / 20.0;
  const colAreaCm2 = Math.PI * colRadiusCm * colRadiusCm;
  const porosity = 0.65; // Total column porosity
  const voidVolumeMl = colAreaCm2 * (standard.columnLengthMm / 10.0) * porosity;

  // Dead time t_0 (minutes) and linear velocity u (cm/s)
  const t0Minutes = voidVolumeMl / flowRateMlMin;
  const linearVelocityCmS = (flowRateMlMin / (60.0 * colAreaCm2 * porosity));

  // Van Deemter HETP and theoretical plates N
  const hetpUm = calculateVanDeemterHetpUm(linearVelocityCmS, standard.particleSizeUm);
  const columnLengthUm = standard.columnLengthMm * 1000.0;
  const theoreticalPlateCountN = Math.max(1000, Math.round(columnLengthUm / hetpUm));

  // Solvent strength modifier effect on retention factor k:
  // log k = log k_0 - S * phi (Snyder-Soczewinski relationship in SFC)
  // Higher modifier % and higher CO2 density both accelerate elution (decrease k)
  const refModifier = standard.defaultModifierPercent;
  const modFactor = Math.exp(-0.065 * (modifierPercent - refModifier));
  const densityFactor = Math.pow(0.75 / density, 1.8);

  // Calculate individual peak retention and shapes
  const peakResults: ChromatographicPeakResult[] = [];
  let totalPeakArea = 0;

  for (const def of standard.peaks) {
    const k = Math.max(0.2, def.baseCapacityFactorK * modFactor * densityFactor);
    const tR = t0Minutes * (1.0 + k);

    // Peak width at half height w_0.5 = t_R * (2.355 / sqrt(N))
    const w05 = (tR * 2.355) / Math.sqrt(theoreticalPlateCountN);
    const heightMau = (def.peakAreaPercent * 15.0) / (w05 * Math.sqrt(2 * Math.PI));
    const area = def.peakAreaPercent * 100.0;
    totalPeakArea += area;

    peakResults.push({
      analyteName: def.analyteName,
      enantiomerDesignation: def.enantiomerDesignation,
      retentionTimeMinutes: Math.round(tR * 100) / 100,
      retentionFactorK: Math.round(k * 100) / 100,
      peakWidthAtHalfMaxMinutes: Math.round(w05 * 1000) / 1000,
      peakHeightMau: Math.round(heightMau * 10) / 10,
      peakArea: area,
      areaPercent: def.peakAreaPercent,
      pharmacologicalRole: def.pharmacologicalRole,
    });
  }

  // Calculate resolution R_s between peak 0 and peak 1 (or highest adjacent pair)
  let alpha = 1.0;
  let resolutionRs = 0.0;

  if (peakResults.length >= 2) {
    const p1 = peakResults[0];
    const p2 = peakResults[1];
    alpha = p2.retentionFactorK / Math.max(0.01, p1.retentionFactorK);

    // Baseline peak widths: w_b ~ 1.699 * w_0.5
    const wb1 = 1.699 * p1.peakWidthAtHalfMaxMinutes;
    const wb2 = 1.699 * p2.peakWidthAtHalfMaxMinutes;
    resolutionRs = (2.0 * (p2.retentionTimeMinutes - p1.retentionTimeMinutes)) / (wb1 + wb2);
  }

  // Enantiomeric excess calculation if two enantiomers
  let enantiomericExcessPercent = 0.0;
  if (peakResults.length >= 2 && standard.peaks[0].enantiomerDesignation) {
    const a1 = peakResults[0].peakArea;
    const a2 = peakResults[1].peakArea;
    enantiomericExcessPercent = Math.abs(a1 - a2) / (a1 + a2) * 100.0;
  }

  // Generate continuous chromatogram curve
  const maxRetention = Math.max(...peakResults.map((p) => p.retentionTimeMinutes));
  const tEnd = Math.max(6.0, Math.ceil(maxRetention * 1.3));
  const timeStep = 0.01; // 0.01 min resolution
  const chromatogramPoints: SfcChromatogramPoint[] = [];

  for (let t = 0; t <= tEnd; t += timeStep) {
    let absorbance = 0.0;

    // Sum Gaussian peak responses + subtle baseline baseline drift
    for (const pr of peakResults) {
      const sigma = pr.peakWidthAtHalfMaxMinutes / 2.355;
      const dt = t - pr.retentionTimeMinutes;
      const gaussian = pr.peakHeightMau * Math.exp(-(dt * dt) / (2 * sigma * sigma));
      absorbance += gaussian;
    }

    // Baseline detector noise (0.2 mAU)
    const noise = (Math.sin(t * 85.0) + Math.cos(t * 140.0)) * 0.12;
    absorbance += Math.max(0, noise);

    chromatogramPoints.push({
      timeMinutes: Math.round(t * 100) / 100,
      absorbanceMau: Math.round(absorbance * 100) / 100,
    });
  }

  // Green metric: Organic solvent saved vs HPLC running 1.0 mL/min 100% organic solvent
  // SFC uses e.g. 15% modifier vs 100% in HPLC
  const hplcOrganicRateMlMin = 1.0;
  const sfcOrganicRateMlMin = flowRateMlMin * (modifierPercent / 100.0);
  const organicSavedMlPerMin = Math.max(0, hplcOrganicRateMlMin - sfcOrganicRateMlMin * 0.3);
  const solventWasteSavedKgPerDay = Math.round((organicSavedMlPerMin * 60 * 24 * 0.8) / 1000 * 10) / 10;

  return {
    standard,
    densityCo2GPerCm3: density,
    deadTimeT0Minutes: Math.round(t0Minutes * 100) / 100,
    linearVelocityCmPerSec: Math.round(linearVelocityCmS * 10) / 10,
    peaks: peakResults,
    separationFactorAlpha: Math.round(alpha * 100) / 100,
    resolutionRs: Math.round(resolutionRs * 100) / 100,
    enantiomericExcessPercent: Math.round(enantiomericExcessPercent * 10) / 10,
    theoreticalPlateCountN,
    hetpMicrometers: hetpUm,
    chromatogramPoints,
    isBaselineResolved: resolutionRs >= 1.5,
    solventWasteSavedKgPerDay: Math.max(1.2, solventWasteSavedKgPerDay),
  };
}

/**
 * Match a card to an appropriate SFC standard
 */
export function getMatchingSfcCard(card: any): SfcStandard | null {
  if (!card) return null;
  const cardName = (card.name || '').toLowerCase();
  const cardFormula = (card.formula || '').toLowerCase();
  const cardDesc = (card.description || '').toLowerCase();

  // 1. Thalidomide
  if (
    cardName.includes('thalidomide') ||
    cardDesc.includes('thalidomide') ||
    cardFormula.includes('c13h10n2o4')
  ) {
    return SFC_STANDARD_CATALOG.find((s) => s.id === 'thalidomide_chiral_enantiomers') || null;
  }

  // 2. Ibuprofen
  if (
    cardName.includes('ibuprofen') ||
    cardDesc.includes('dexibuprofen') ||
    cardFormula.includes('c13h18o2')
  ) {
    return SFC_STANDARD_CATALOG.find((s) => s.id === 'ibuprofen_nsaid_enantiomers') || null;
  }

  // 3. Omeprazole / Esomeprazole
  if (
    cardName.includes('omeprazole') ||
    cardName.includes('nexium') ||
    cardDesc.includes('esomeprazole') ||
    cardFormula.includes('c17h19n3o3s')
  ) {
    return SFC_STANDARD_CATALOG.find((s) => s.id === 'esomeprazole_omeprazole_ppi') || null;
  }

  // 4. Cannabinoid
  if (
    cardName.includes('cannabinoid') ||
    cardName.includes('cbd') ||
    cardName.includes('thc') ||
    cardDesc.includes('cannabidiol')
  ) {
    return SFC_STANDARD_CATALOG.find((s) => s.id === 'cannabinoid_green_fractionation') || null;
  }

  // 5. Tocopherol Vitamin E
  if (
    cardName.includes('tocopherol') ||
    cardName.includes('vitamin e') ||
    cardDesc.includes('tocopherol') ||
    cardFormula.includes('c29h50o2')
  ) {
    return SFC_STANDARD_CATALOG.find((s) => s.id === 'tocopherol_vitamin_e_isomers') || null;
  }

  return null;
}

/**
 * Validate SFC physics parameters
 */
export function validateSfcStandardPhysics(standard: SfcStandard): boolean {
  if (standard.defaultBackPressureBar < 73.8) return false; // Below critical pressure
  if (standard.defaultOvenTempCelsius < 20.0) return false;
  if (standard.peaks.length === 0) return false;
  if (standard.columnLengthMm <= 0 || standard.columnInternalDiameterMm <= 0) return false;
  return true;
}
