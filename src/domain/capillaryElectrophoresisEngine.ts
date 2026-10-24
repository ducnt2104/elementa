/**
 * ELEMENTA - Capillary Electrophoresis (CE), Electroosmotic Flow (EOF) & Chiral Resolution Engine
 *
 * Biophysical Foundations & International Standards:
 * - Nobel Prize in Chemistry 1948:
 *     Arne Tiselius
 *     "for his research on electrophoresis and adsorption analysis, especially for his discoveries concerning the complex nature of the serum proteins".
 * - Capillary Zone Electrophoresis (Jorgenson & Lukacs, Science 1981):
 *     - Fused-silica capillary (inner diameter d_c = 25 - 100 µm, length L_t = 30 - 100 cm, L_d = 20 - 85 cm).
 *     - High voltage V = 10 - 30 kV (electric field E = V / L_t, 100 - 600 V/cm).
 * - Electroosmotic Flow (EOF) & Helmholtz-Smoluchowski Equation:
 *     - Silanol group deprotonation (Si-OH -> Si-O⁻ + H⁺ above pH 3) forms electrical double layer.
 *     - v_EOF = µ_EOF · E, where µ_EOF = (ε_r · ε_0 · ζ) / η (ζ = zeta potential, η = viscosity).
 *     - Flat plug-flow velocity profile eliminates parabolic laminar Poiseuille broadening, yielding N > 500,000 plates!
 * - Apparent Electrophoretic Mobility (µ_app) & Migration Time (t_m):
 *     - Analyte electrophoretic mobility: µ_ep = q / (6 π η r) (Debye-Hückel / Stokes radius).
 *     - Apparent velocity: v_app = v_ep + v_EOF = (µ_ep + µ_EOF) · E.
 *     - Migration time: t_m = (L_d · L_t) / [ (µ_ep + µ_EOF) · V ].
 *     - Detection order: Cations (fastest) -> Neutral Marker (t_EOF) -> Anions (slowest).
 * - Theoretical Plate Count (Jorgenson-Lukacs Equation):
 *     - N = (v_app · L_d) / (2 D) = [ (µ_ep + µ_EOF) · V · (L_d / L_t) ] / (2 D).
 * - Chiral Resolution (CE-CD):
 *     - Cyclodextrin host-guest inclusion complexes (α-, β-, γ-CD) separating enantiomers (D/L-amino acids, R/S-drugs).
 * - Capillary Gel Electrophoresis (CGE / CE-SDS):
 *     - Sanger DNA sequencing (1 bp resolution) and therapeutic Monoclonal Antibody (mAb) purity testing.
 * - Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 11: Sự điện li, ion trong dung dịch, pH; Hóa học 12: Đồng phân quang học, protein; Vật lý 12: Điện trường, dòng điện trong chất điện phân).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 67)
 */

export const EPSILON_0_VACUUM = 8.8541878128e-12; // F/m (Vacuum permittivity)
export const WATER_DIELECTRIC_CONSTANT = 78.4; // ε_r at 25°C
export const WATER_VISCOSITY_PA_S = 0.00089; // Pa·s at 25°C

export interface CapillaryAnalytePeak {
  id: string;
  name: string;
  vietnameseName: string;
  charge: number; // Analyte net charge at buffer pH
  apparentMobilityE5: number; // µ_app in 10⁻⁵ cm²/(V·s)
  electrophoreticMobilityE5: number; // µ_ep in 10⁻⁵ cm²/(V·s)
  diffusionCoefficientE6: number; // D in 10⁻⁶ cm²/s
  migrationTimeMinutes: number; // t_m in minutes
  peakHeightMilliAu: number; // Absorbance in mAU
  peakWidthMinutes: number; // σ_t or w_half in minutes
  theoreticalPlatesN: number;
}

export interface ElectropherogramDataPoint {
  timeMinutes: number; // 0 to 25 minutes
  absorbanceMilliAu: number; // Total detector response mAU
}

export interface CapillaryElectrophoresisSpecimenStandard {
  id: string;
  name: string;
  vietnameseName: string;
  separationMode: 'CZE_FREE_SOLUTION' | 'CGE_SANGER_DNA' | 'CHIRAL_CYCLODEXTRIN' | 'CE_SDS_PROTEIN_MAB' | 'INORGANIC_CATION_UV';
  bufferName: string;
  bufferPh: number;
  capillaryLengthTotalCm: number; // L_t (e.g. 50 cm)
  capillaryLengthDetectorCm: number; // L_d (e.g. 40 cm)
  capillaryInternalDiameterMicrons: number; // e.g. 50 µm
  voltageKilovolts: number; // e.g. 20 kV
  zetaPotentialMilliVolts: number; // ζ in mV (e.g. -45 mV)
  eofMobilityE5: number; // µ_EOF in 10⁻⁵ cm²/(V·s)
  analytes: {
    id: string;
    name: string;
    vietnameseName: string;
    charge: number;
    intrinsicMobilityE5: number; // µ_ep
    diffusionE6: number;
    relativePeakArea: number;
  }[];
  description: string;
  curriculumNotes: string;
}

export interface CapillaryElectrophoresisSimulationResult {
  specimen: CapillaryElectrophoresisSpecimenStandard;
  appliedVoltageKv: number;
  electricFieldVPerCm: number; // E = V / L_t
  bufferPh: number;
  actualEofMobilityE5: number;
  eofMarkerTimeMinutes: number; // t_EOF
  peaks: CapillaryAnalytePeak[];
  electropherogram: ElectropherogramDataPoint[];
  maxPeakPlatesN: number;
  enantiomerResolutionRs?: number;
}

export const CAPILLARY_ELECTROPHORESIS_CATALOG: CapillaryElectrophoresisSpecimenStandard[] = [
  {
    id: 'chiral_amino_acid_dl_cd',
    name: 'Chiral Enantiomeric Resolution of D- and L-Phenylalanine (Sulfated β-CD)',
    vietnameseName: 'Phân Tách Đối Quang Chiral D- và L-Phenylalanine (Sử Dụng Sulfated β-Cyclodextrin)',
    separationMode: 'CHIRAL_CYCLODEXTRIN',
    bufferName: '50 mM Tris-Phosphate + 2.5% Sulfated β-Cyclodextrin',
    bufferPh: 3.2,
    capillaryLengthTotalCm: 48.5,
    capillaryLengthDetectorCm: 40.0,
    capillaryInternalDiameterMicrons: 50,
    voltageKilovolts: 20.0,
    zetaPotentialMilliVolts: -18.0,
    eofMobilityE5: 18.5,
    analytes: [
      {
        id: 'neutral_marker_dms',
        name: 'Mesityl Oxide (Neutral EOF Marker)',
        vietnameseName: 'Mesityl Oxide (Chất Đánh Dấu EOF Trung Hòa)',
        charge: 0,
        intrinsicMobilityE5: 0.0,
        diffusionE6: 8.5,
        relativePeakArea: 0.35
      },
      {
        id: 'd_phenylalanine',
        name: 'D-Phenylalanine (R-Enantiomer CD Complex)',
        vietnameseName: 'D-Phenylalanine (Đồng Phân R Ít Tạo Phức CD)',
        charge: 1,
        intrinsicMobilityE5: 16.4,
        diffusionE6: 6.8,
        relativePeakArea: 1.0
      },
      {
        id: 'l_phenylalanine',
        name: 'L-Phenylalanine (S-Enantiomer Stronger CD Host-Guest)',
        vietnameseName: 'L-Phenylalanine (Đồng Phân S Tạo Phức Kỵ Nước Bền Hơn)',
        charge: 1,
        intrinsicMobilityE5: 13.8,
        diffusionE6: 6.8,
        relativePeakArea: 1.0
      }
    ],
    description: 'Chiral separation of amino acid enantiomers using sulfated β-cyclodextrin host-guest inclusion. The L-form enters the hydrophobic cavity with higher affinity, retarding its apparent mobility and yielding clean baseline chiral resolution (R_s > 2.0).',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Đồng phân quang học, carbon bất đối, tính chất của amino acid tự nhiên (L-amino acid) trong protein; Vật lý 12: Điện di mao quản.'
  },
  {
    id: 'sanger_dna_sequencing_cge',
    name: 'Sanger Capillary Gel Electrophoresis (CGE) 1-bp DNA Sequencing Array',
    vietnameseName: 'Điện Di Gel Mao Quản Giải Mã Trình Tự ADN Sanger Độ Phân Giải 1 Nucleotide',
    separationMode: 'CGE_SANGER_DNA',
    bufferName: '1× TBE + 7 M Urea + POP-7 Entangled Polymer Matrix',
    bufferPh: 8.3,
    capillaryLengthTotalCm: 50.0,
    capillaryLengthDetectorCm: 36.0,
    capillaryInternalDiameterMicrons: 50,
    voltageKilovolts: 15.0,
    zetaPotentialMilliVolts: -5.0, // Suppressed EOF in polymer coating
    eofMobilityE5: 4.0,
    analytes: [
      {
        id: 'ssdna_fragment_50nt',
        name: '50-nt Dye-Terminated DNA Fragment',
        vietnameseName: 'Đoạn ADN Mạch Đơn 50 Nu (Gắn Huỳnh Quang)',
        charge: -50,
        intrinsicMobilityE5: -28.5,
        diffusionE6: 0.02,
        relativePeakArea: 0.9
      },
      {
        id: 'ssdna_fragment_51nt',
        name: '51-nt Dye-Terminated DNA Fragment',
        vietnameseName: 'Đoạn ADN Mạch Đơn 51 Nu (+1 Nucleotide)',
        charge: -51,
        intrinsicMobilityE5: -28.1,
        diffusionE6: 0.02,
        relativePeakArea: 0.95
      },
      {
        id: 'ssdna_fragment_52nt',
        name: '52-nt Dye-Terminated DNA Fragment',
        vietnameseName: 'Đoạn ADN Mạch Đơn 52 Nu (+2 Nucleotide)',
        charge: -52,
        intrinsicMobilityE5: -27.7,
        diffusionE6: 0.02,
        relativePeakArea: 0.92
      }
    ],
    description: 'Capillary array gel electrophoresis (CGE) with POP-7 entangled sieving matrix. Separates single-stranded DNA fragments with exact single-nucleotide resolution, which enabled the sequencing of the entire Human Genome Project.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 12: Phương pháp giải trình tự gen của Sanger, Dự án Bản đồ Gen Người; Vật lý 12: Sự dịch chuyển điện tích trong điện trường.'
  },
  {
    id: 'mab_purity_ce_sds',
    name: 'Therapeutic Monoclonal Antibody (IgG1 mAb) Purity Testing (CE-SDS)',
    vietnameseName: 'Kiểm Định Độ Tinh Khiết Kháng Thể Đơn Dòng Điều Trị IgG1 (CE-SDS Không Khử & Khử)',
    separationMode: 'CE_SDS_PROTEIN_MAB',
    bufferName: 'SDS Sieving Gel Buffer, pH 6.8',
    bufferPh: 6.8,
    capillaryLengthTotalCm: 30.2,
    capillaryLengthDetectorCm: 20.0,
    capillaryInternalDiameterMicrons: 50,
    voltageKilovolts: 15.0,
    zetaPotentialMilliVolts: -4.0,
    eofMobilityE5: 3.5,
    analytes: [
      {
        id: 'internal_standard_10kda',
        name: '10 kDa Internal Molecular Weight Marker',
        vietnameseName: 'Chất Chuẩn Nội Khối Lượng Phân Tử 10 kDa',
        charge: -12,
        intrinsicMobilityE5: -34.0,
        diffusionE6: 0.05,
        relativePeakArea: 0.4
      },
      {
        id: 'light_chain_mab',
        name: 'IgG1 Light Chain (LC, 25 kDa)',
        vietnameseName: 'Chuỗi Nhẹ Kháng Thể (LC, 25 kDa)',
        charge: -28,
        intrinsicMobilityE5: -28.0,
        diffusionE6: 0.03,
        relativePeakArea: 0.85
      },
      {
        id: 'heavy_chain_mab',
        name: 'IgG1 Heavy Chain (HC, 50 kDa)',
        vietnameseName: 'Chuỗi Nặng Kháng Thể (HC, 50 kDa)',
        charge: -55,
        intrinsicMobilityE5: -21.0,
        diffusionE6: 0.02,
        relativePeakArea: 1.7
      },
      {
        id: 'intact_igg_monomer',
        name: 'Intact Non-reduced IgG Monomer (150 kDa)',
        vietnameseName: 'Kháng Thể IgG1 Nguyên Vẹn (150 kDa)',
        charge: -160,
        intrinsicMobilityE5: -14.0,
        diffusionE6: 0.01,
        relativePeakArea: 0.25
      }
    ],
    description: 'CE-SDS automated replacement for traditional SDS-PAGE slab gel electrophoresis. Quantifies therapeutic antibody purity, disulfide bond reduction, and heavy/light chain ratio with automated optical peak area integration.',
    curriculumNotes: 'GDPT 2018 Sinh học 11: Cấu trúc kháng thể IgG, liên kết disulfide giữa chuỗi nặng và chuỗi nhẹ; Hóa học 12: Polypeptide và điện di protein.'
  },
  {
    id: 'inorganic_cation_separation',
    name: 'Rapid Inorganic Alkali & Alkaline Earth Cations Separation (Indirect UV)',
    vietnameseName: 'Điện Di Phân Tách Nhanh Cation Kim Loại Kiềm & Kiềm Thổ (UV Gián Tiếp)',
    separationMode: 'INORGANIC_CATION_UV',
    bufferName: '5 mM Imidazole + 2 mM 18-Crown-6 + Acetic Acid, pH 4.5',
    bufferPh: 4.5,
    capillaryLengthTotalCm: 60.0,
    capillaryLengthDetectorCm: 50.0,
    capillaryInternalDiameterMicrons: 75,
    voltageKilovolts: 25.0,
    zetaPotentialMilliVolts: -38.0,
    eofMobilityE5: 35.0,
    analytes: [
      {
        id: 'cation_k',
        name: 'Potassium (K⁺, Hydrated Radius 1.25 Å)',
        vietnameseName: 'Ion Kali (K⁺, Bán Kính Thủy Hóa Nhỏ, Điện Di Nhanh Nhất)',
        charge: 1,
        intrinsicMobilityE5: 76.2,
        diffusionE6: 19.6,
        relativePeakArea: 1.0
      },
      {
        id: 'cation_ca',
        name: 'Calcium (Ca²⁺, Divalent Cation)',
        vietnameseName: 'Ion Canxi (Ca²⁺, Cation Hóa Trị 2)',
        charge: 2,
        intrinsicMobilityE5: 61.7,
        diffusionE6: 13.4,
        relativePeakArea: 1.15
      },
      {
        id: 'cation_na',
        name: 'Sodium (Na⁺, Hydrated Radius 1.84 Å)',
        vietnameseName: 'Ion Natri (Na⁺, Vỏ Thủy Hóa Lớn Hơn K⁺)',
        charge: 1,
        intrinsicMobilityE5: 51.9,
        diffusionE6: 13.3,
        relativePeakArea: 0.95
      },
      {
        id: 'cation_mg',
        name: 'Magnesium (Mg²⁺, Strongly Hydrated)',
        vietnameseName: 'Ion Magie (Mg²⁺, Vỏ Thủy Hóa Rất Dày)',
        charge: 2,
        intrinsicMobilityE5: 47.8,
        diffusionE6: 10.7,
        relativePeakArea: 1.05
      },
      {
        id: 'cation_li',
        name: 'Lithium (Li⁺, Largest Hydration Sphere)',
        vietnameseName: 'Ion Liti (Li⁺, Bán Kính Thủy Hóa Lớn Nhất Nhóm Kiềm)',
        charge: 1,
        intrinsicMobilityE5: 40.1,
        diffusionE6: 10.3,
        relativePeakArea: 0.8
      }
    ],
    description: 'Simultaneous separation of 5 essential metal cations in under 5 minutes. Demonstrates the Stokes-Einstein inverse relation between hydrated ionic radius and mobility (K⁺ migrates faster than Na⁺ and Li⁺ despite having a larger atomic number).',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 11: Quy luật biến đổi bán kính nguyên tử và ion kim loại kiềm; Vỏ solvat hóa / thủy hóa ion trong dung dịch nước.'
  },
  {
    id: 'organic_acid_anions_czc',
    name: 'Food & Beverage Organic Acid Anions Profiling (EOF Reversed CTAB)',
    vietnameseName: 'Phân Tích Thành Phần Anion Axit Hữu Cơ Nước Giải Khát (Đảo Chiều EOF Bằng CTAB)',
    separationMode: 'CZE_FREE_SOLUTION',
    bufferName: '20 mM 2,6-Pyridinedicarboxylic acid + 0.5 mM CTAB, pH 5.6',
    bufferPh: 5.6,
    capillaryLengthTotalCm: 48.5,
    capillaryLengthDetectorCm: 40.0,
    capillaryInternalDiameterMicrons: 50,
    voltageKilovolts: -20.0, // Reversed polarity
    zetaPotentialMilliVolts: +25.0, // Surfactant CTAB reverses zeta potential
    eofMobilityE5: -26.0,
    analytes: [
      {
        id: 'anion_oxalate',
        name: 'Oxalate (C₂O₄²⁻)',
        vietnameseName: 'Anion Oxalat (C₂O₄²⁻)',
        charge: -2,
        intrinsicMobilityE5: -76.0,
        diffusionE6: 15.0,
        relativePeakArea: 1.0
      },
      {
        id: 'anion_formate',
        name: 'Formate (HCOO⁻)',
        vietnameseName: 'Anion Fomat (HCOO⁻)',
        charge: -1,
        intrinsicMobilityE5: -56.5,
        diffusionE6: 16.5,
        relativePeakArea: 0.8
      },
      {
        id: 'anion_tartrate',
        name: 'Tartrate (C₄H₄O₆²⁻)',
        vietnameseName: 'Anion Tartrat (C₄H₄O₆²⁻)',
        charge: -2,
        intrinsicMobilityE5: -52.0,
        diffusionE6: 11.0,
        relativePeakArea: 1.2
      },
      {
        id: 'anion_lactate',
        name: 'Lactate (CH₃CH(OH)COO⁻)',
        vietnameseName: 'Anion Lactat (CH₃CH(OH)COO⁻)',
        charge: -1,
        intrinsicMobilityE5: -38.8,
        diffusionE6: 12.5,
        relativePeakArea: 0.75
      },
      {
        id: 'anion_acetate',
        name: 'Acetate (CH₃COO⁻)',
        vietnameseName: 'Anion Axetat (CH₃COO⁻)',
        charge: -1,
        intrinsicMobilityE5: -35.2,
        diffusionE6: 13.0,
        relativePeakArea: 0.9
      }
    ],
    description: 'Profiling of organic acid preservatives and fermentation metabolites. Utilizes cetyltrimethylammonium bromide (CTAB) surfactant to reverse wall charge and EOF, accelerating high-mobility anions toward the anode.',
    curriculumNotes: 'GDPT 2018 Hóa học 11: Axit cacboxylic trong đời sống (axit axetic, axit lactic lên men, axit tactric trong nho); Hóa học 12: Este & axit hữu cơ.'
  }
];

/**
 * Calculates Electroosmotic Flow mobility using Helmholtz-Smoluchowski equation:
 * µ_EOF = (ε_r * ε_0 * ζ) / η
 * Returns µ_EOF in 10⁻⁵ cm²/(V·s)
 */
export function calculateHelmholtzSmoluchowskiEof(
  zetaPotentialMv: number,
  dielectricConstant: number = WATER_DIELECTRIC_CONSTANT,
  viscosityPaS: number = WATER_VISCOSITY_PA_S
): number {
  const zetaVolts = (zetaPotentialMv / 1000.0);
  // SI unit: m²/(V·s) -> convert to cm²/(V·s) by multiplying by 1e4
  const mu_si = (dielectricConstant * EPSILON_0_VACUUM * Math.abs(zetaVolts)) / viscosityPaS;
  const mu_cm2 = mu_si * 1e4;
  // Return in units of 10⁻⁵ cm²/(V·s)
  const mu_e5 = mu_cm2 * 1e5;
  return Number(mu_e5.toFixed(2));
}

/**
 * Simulates Capillary Electrophoresis Separation
 */
export function simulateCapillaryElectrophoresis(
  specimenId: string,
  voltageKilovolts?: number,
  bufferPh?: number
): CapillaryElectrophoresisSimulationResult {
  const specimen = CAPILLARY_ELECTROPHORESIS_CATALOG.find((s) => s.id === specimenId) || CAPILLARY_ELECTROPHORESIS_CATALOG[0];

  const V_kv = voltageKilovolts !== undefined ? voltageKilovolts : specimen.voltageKilovolts;
  const V_volts = Math.abs(V_kv) * 1000;
  const Lt_cm = specimen.capillaryLengthTotalCm;
  const Ld_cm = specimen.capillaryLengthDetectorCm;
  const E_v_cm = V_volts / Lt_cm; // V/cm

  const currentPh = bufferPh !== undefined ? bufferPh : specimen.bufferPh;
  // Zeta potential scales with pH due to silanol deprotonation
  const phScaling = Math.min(1.4, Math.max(0.2, (currentPh - 2.0) / 4.5));
  const effectiveZeta = specimen.zetaPotentialMilliVolts * phScaling;
  const actualEofMobility = calculateHelmholtzSmoluchowskiEof(effectiveZeta);

  // Calculate Neutral Marker Migration Time (t_EOF) in minutes
  // t = Ld / (µ_EOF * E) -> seconds -> minutes
  // µ in 10⁻⁵ cm²/(V·s) -> multiply by 1e-5
  const eofVelocityCmPerS = (actualEofMobility * 1e-5) * E_v_cm;
  const eofTimeSec = eofVelocityCmPerS > 0 ? Ld_cm / eofVelocityCmPerS : 9999;
  const eofTimeMin = Number((eofTimeSec / 60).toFixed(2));

  // Compute Peaks
  const peaks: CapillaryAnalytePeak[] = [];
  let maxPlates = 0;

  specimen.analytes.forEach((ana) => {
    // Apparent mobility = µ_ep + µ_EOF
    let mu_app_e5 = ana.intrinsicMobilityE5 + actualEofMobility;
    let v_app_cm_s = (mu_app_e5 * 1e-5) * E_v_cm;

    if (
      specimen.separationMode === 'CGE_SANGER_DNA' ||
      specimen.separationMode === 'CE_SDS_PROTEIN_MAB' ||
      specimen.voltageKilovolts < 0
    ) {
      // In sieving gel or reversed polarity, net velocity is directed toward the detector
      mu_app_e5 = Math.abs(ana.intrinsicMobilityE5) - actualEofMobility;
      v_app_cm_s = (mu_app_e5 * 1e-5) * E_v_cm;
    }

    v_app_cm_s = Math.max(0.001, Math.abs(v_app_cm_s));
    const tm_sec = Ld_cm / v_app_cm_s;
    const tm_min = Number((tm_sec / 60).toFixed(2));

    // Jorgenson-Lukacs efficiency N = (v_app * Ld) / (2 * D)
    const D_cm2_s = ana.diffusionE6 * 1e-6;
    const N = Math.floor((v_app_cm_s * Ld_cm) / (2 * D_cm2_s));
    if (N > maxPlates) maxPlates = N;

    // Peak width at base: w = 4 * σ_t = 4 * (tm / sqrt(N))
    const w_sec = (4 * tm_sec) / Math.sqrt(Math.max(1000, N));
    const w_min = Number((w_sec / 60).toFixed(3));

    // Peak height proportional to relative area / width
    const heightMau = Number(((ana.relativePeakArea * 12.0) / (w_min + 0.05)).toFixed(1));

    peaks.push({
      id: ana.id,
      name: ana.name,
      vietnameseName: ana.vietnameseName,
      charge: ana.charge,
      apparentMobilityE5: Number(mu_app_e5.toFixed(2)),
      electrophoreticMobilityE5: ana.intrinsicMobilityE5,
      diffusionCoefficientE6: ana.diffusionE6,
      migrationTimeMinutes: tm_min,
      peakHeightMilliAu: heightMau,
      peakWidthMinutes: w_min,
      theoreticalPlatesN: N
    });
  });

  // Sort peaks by migration time
  peaks.sort((a, b) => a.migrationTimeMinutes - b.migrationTimeMinutes);

  // Calculate Enantiomer Resolution Rs if Chiral
  let enantiomerResolutionRs: number | undefined;
  if (specimen.separationMode === 'CHIRAL_CYCLODEXTRIN' && peaks.length >= 3) {
    const peakD = peaks.find((p) => p.id === 'd_phenylalanine');
    const peakL = peaks.find((p) => p.id === 'l_phenylalanine');
    if (peakD && peakL) {
      const deltaT = Math.abs(peakL.migrationTimeMinutes - peakD.migrationTimeMinutes);
      const wAvg = (peakD.peakWidthMinutes + peakL.peakWidthMinutes) / 2;
      enantiomerResolutionRs = Number(((2 * deltaT) / (peakD.peakWidthMinutes + peakL.peakWidthMinutes)).toFixed(2));
    }
  }

  // Generate Electropherogram profile (0 to maxTime minutes)
  const maxTime = Math.max(12, Math.max(...peaks.map((p) => p.migrationTimeMinutes)) * 1.25);
  const timeStep = 0.02; // 0.02 min = 1.2 s resolution
  const electropherogram: ElectropherogramDataPoint[] = [];

  for (let t = 0; t <= maxTime; t += timeStep) {
    let absorbance = 0;
    // Sum Gaussian contributions of all analyte peaks
    peaks.forEach((peak) => {
      const sigma = peak.peakWidthMinutes / 4.0;
      const gaussian = peak.peakHeightMilliAu * Math.exp(-0.5 * Math.pow((t - peak.migrationTimeMinutes) / sigma, 2));
      absorbance += gaussian;
    });

    // Add baseline detector noise (~0.2 mAU)
    const noise = (Math.sin(t * 120) * 0.08 + Math.cos(t * 73) * 0.06);
    absorbance = Math.max(0, absorbance + noise);

    electropherogram.push({
      timeMinutes: Number(t.toFixed(2)),
      absorbanceMilliAu: Number(absorbance.toFixed(2))
    });
  }

  return {
    specimen,
    appliedVoltageKv: V_kv,
    electricFieldVPerCm: Number(E_v_cm.toFixed(1)),
    bufferPh: currentPh,
    actualEofMobilityE5: actualEofMobility,
    eofMarkerTimeMinutes: eofTimeMin,
    peaks,
    electropherogram,
    maxPeakPlatesN: maxPlates,
    enantiomerResolutionRs
  };
}

/**
 * Intelligent Card Matcher for Capillary Electrophoresis Systems
 */
export function getMatchingCapillaryElectrophoresisCard(card: { id?: string; name?: string; category?: string }): CapillaryElectrophoresisSpecimenStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('sanger') || target.includes('sequencing') || target.includes('genome') || target.includes('nucleotide') || target.includes('cge')) {
    return CAPILLARY_ELECTROPHORESIS_CATALOG.find((s) => s.id === 'sanger_dna_sequencing_cge') || null;
  }
  if (target.includes('chiral') || target.includes('enantiomer') || target.includes('cyclodextrin') || target.includes('phenylalanine') || target.includes('d-') || target.includes('l-')) {
    return CAPILLARY_ELECTROPHORESIS_CATALOG.find((s) => s.id === 'chiral_amino_acid_dl_cd') || null;
  }
  if (target.includes('mab') || target.includes('antibody') || target.includes('igg') || target.includes('purity') || target.includes('ce-sds') || target.includes('heavy chain')) {
    return CAPILLARY_ELECTROPHORESIS_CATALOG.find((s) => s.id === 'mab_purity_ce_sds') || null;
  }
  if (target.includes('cation') || target.includes('potassium') || target.includes('sodium') || target.includes('calcium') || target.includes('alkali') || target.includes('hydrated radius')) {
    return CAPILLARY_ELECTROPHORESIS_CATALOG.find((s) => s.id === 'inorganic_cation_separation') || null;
  }
  if (target.includes('acid') || target.includes('oxalate') || target.includes('formate') || target.includes('acetate') || target.includes('ctab') || target.includes('beverage')) {
    return CAPILLARY_ELECTROPHORESIS_CATALOG.find((s) => s.id === 'organic_acid_anions_czc') || null;
  }

  // Fallback
  if (target.includes('electrophoresis') || target.includes('capillary') || target.includes('eof') || target.includes('voltage') || target.includes('plates')) {
    return CAPILLARY_ELECTROPHORESIS_CATALOG[0];
  }

  return null;
}
