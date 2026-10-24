/**
 * Bio-Layer Interferometry (BLI), Optical Thickness Shift & Real-Time Association/Dissociation Kinetics Engine
 * 
 * Biophysical Principles & Standards:
 * 1. Bio-Layer Interferometry (BLI) (e.g. Sartorius Octet / ForteBio platform):
 *    White light reflection from internal reference layer and biocompatible sensor tip surface.
 *    Wavelength shift delta lambda = 2 * delta(n * d) / m (nm).
 * 2. 1:1 Langmuir Real-Time Binding Kinetics:
 *    - Association Phase: R(t) = R_eq * (1 - exp(-k_obs * t)), where k_obs = k_on * [L] + k_off
 *    - Dissociation Phase: R(t) = R_0 * exp(-k_off * (t - t_diss))
 *    - Kinetic Affinity: K_d = k_off / k_on
 * 3. Dip and Read microplate format:
 *    Zero microfluidic clogging, direct dip into 96/384-well plates, label-free real-time sensorgram.
 * 4. 5 Benchmark Systems:
 *    - Protein A Biosensor - Human IgG Antibody (QC Titer & Kinetic Standard, Kd = 2.0 nM)
 *    - Streptavidin (SA) - Biotinylated DNA Complementary Hybridization (Kd = 1.0e-14 M)
 *    - Anti-His - Recombinant Kinase & Small-Molecule Inhibitor (Fast-off drug discovery)
 *    - Anti-Murine Fc - Antibody Epitope Binning & Sandwich Cross-Blocking
 *    - Aminopropylsilane (APS) - Lipid Liposome / Viral Membrane Fusion
 * 5. Curriculum: Vietnam GDPT 2018 (Hóa học 10: Tốc độ phản ứng v = k[A][B]; Hóa học 11: Cân bằng động k_thuan / k_nghich = Kc; Hóa học 12: Kháng thể đơn dòng, dược phẩm sinh học).
 */

export type BliBiosensorType =
  | 'PROTEIN_A_FC_CAPTURE'
  | 'STREPTAVIDIN_BIOTIN'
  | 'ANTI_HIS_TAG'
  | 'ANTI_MURINE_FC'
  | 'LIPID_MEMBRANE_APS';

export interface BliStandard {
  id: string;
  name: string;
  vietnameseName: string;
  biosensorType: BliBiosensorType;
  biosensorName: string;
  immobilizedLigandName: string;
  analyteName: string;
  molecularWeightAnalyteDa: number;
  trueKonMolarInvSecInv: number; // k_on (M^-1 * s^-1, e.g. 1.2e5)
  trueKoffSecInv: number; // k_off (s^-1, e.g. 2.4e-4)
  trueKdMolar: number; // K_d = k_off / k_on (M, e.g. 2.0e-9)
  theoreticalRmaxNm: number; // R_max (nm wavelength shift at full saturation, e.g. 1.8 nm)
  baselineTimeSec: number; // e.g. 60 s
  associationTimeSec: number; // e.g. 180 s
  dissociationTimeSec: number; // e.g. 300 s
  defaultConcentrationsMolar: number[]; // e.g. [100e-9, 50e-9, 25e-9, 12.5e-9, 6.25e-9]
  description: string;
  curriculumNotes: string;
  biotechApplication: string;
  epitopeBinningRole: string;
}

export interface BliKineticsPoint {
  timeSeconds: number; // Total timeline 0 to 540 s
  wavelengthShiftNm: number; // Real-time response delta lambda (nm)
  phase: 'BASELINE' | 'ASSOCIATION' | 'DISSOCIATION';
}

export interface BliSensorgramCurve {
  concentrationMolar: number;
  concentrationDisplayString: string;
  colorHex: string;
  trace: BliKineticsPoint[];
  steadyStateReqNm: number;
}

export interface BliSimulationResult {
  standard: BliStandard;
  fittedKonMolarInvSecInv: number;
  fittedKoffSecInv: number;
  fittedKdMolar: number;
  kdDisplayString: string;
  sensorgramSeries: BliSensorgramCurve[];
  rSquaredMetric: number; // Goodness of fit (0.985 to 0.999)
  chiSquaredMetric: number; // Reduced chi-squared
  totalExperimentTimeSec: number;
}

/**
 * Standard Catalog: 5 Benchmark Bio-Layer Interferometry Systems
 */
export const BLI_STANDARD_CATALOG: BliStandard[] = [
  {
    id: 'protein_a_human_igg1',
    name: 'Protein A Biosensor - Human IgG1 Monoclonal Antibody (QC Standard)',
    vietnameseName: 'Đầu Dò Protein A - Kháng Thể Đơn Dòng IgG1 Người (Chuẩn Định Lượng Titer & Động Học BLI)',
    biosensorType: 'PROTEIN_A_FC_CAPTURE',
    biosensorName: 'Biosensor gắn Protein A đặc hiệu vùng Fc của IgG',
    immobilizedLigandName: 'Staphylococcal Protein A (42 kDa)',
    analyteName: 'Human IgG1 Monoclonal Antibody (150 kDa)',
    molecularWeightAnalyteDa: 150000,
    trueKonMolarInvSecInv: 1.2e5, // 1.2 x 10^5 M^-1 s^-1
    trueKoffSecInv: 2.4e-4, // 2.4 x 10^-4 s^-1
    trueKdMolar: 2.0e-9, // 2.0 nM
    theoreticalRmaxNm: 1.85, // 1.85 nm optical shift
    baselineTimeSec: 60,
    associationTimeSec: 180,
    dissociationTimeSec: 300,
    defaultConcentrationsMolar: [100e-9, 50e-9, 25e-9, 12.5e-9, 6.25e-9],
    description:
      'The foundational standard for Bio-Layer Interferometry in biopharmaceutical manufacturing. Protein A biosensors capture the Fc constant domain of therapeutic monoclonal antibodies with high affinity (Kd = 2.0 nM). Dip and Read immersion requires zero microfluidic priming and quantifies antibody harvest titer in under 2 minutes.',
    curriculumNotes:
      'GDPT 2018 Hóa học 10 & 12: Tốc độ phản ứng hóa học (hằng số tốc độ thuận k_on và nghịch k_off); cấu trúc kháng thể đơn dòng và ứng dụng công nghệ sinh học.',
    biotechApplication:
      'Bioreactor harvest titer quantification, clone selection, and batch-release purity verification.',
    epitopeBinningRole: 'Standard primary capture layer for antibody cross-blocking assays.',
  },
  {
    id: 'streptavidin_biotin_dna_hybridization',
    name: 'Streptavidin (SA) - Biotinylated DNA Oligonucleotide Hybridization',
    vietnameseName: 'Đầu Dò Streptavidin - Lai Phân Tử DNA Bổ Sung Gắn Biotin (Ái Lực Bền Vững Kd = 10 fM)',
    biosensorType: 'STREPTAVIDIN_BIOTIN',
    biosensorName: 'Biosensor gắn Streptavidin bọc bề mặt quang học',
    immobilizedLigandName: 'Biotinylated 24-nt Capture ssDNA (7.8 kDa)',
    analyteName: 'Complementary Target ssDNA (7.6 kDa)',
    molecularWeightAnalyteDa: 7600,
    trueKonMolarInvSecInv: 4.5e5, // Fast hybridization
    trueKoffSecInv: 4.5e-5, // Slow dissociation (high duplex stability)
    trueKdMolar: 1.0e-10, // 100 pM
    theoreticalRmaxNm: 0.65, // Smaller nucleic acid mass causes smaller shift
    baselineTimeSec: 60,
    associationTimeSec: 180,
    dissociationTimeSec: 300,
    defaultConcentrationsMolar: [50e-9, 25e-9, 12.5e-9, 6.25e-9, 3.125e-9],
    description:
      'Streptavidin biosensors provide near-irreversible ligand attachment (Kd ~ 10^-14 M). In this benchmark, immobilized biotinylated single-stranded DNA captures its complementary Watson-Crick target. The optical thickness shift delta lambda precisely monitors DNA duplex formation in real time.',
    curriculumNotes:
      'GDPT 2018 Sinh học 10 & Hóa học 12: Nguyên tắc bổ sung A-T và G-C, liên kết hydro kép/ba, động học lai phân tử nucleic acid.',
    biotechApplication:
      'Oligonucleotide diagnostic assay development, CRISPR guide RNA target affinity, and aptamer screening.',
    epitopeBinningRole: 'Ultra-stable baseline capture preventing ligand leaching during extended wash cycles.',
  },
  {
    id: 'anti_his_kinase_inhibitor',
    name: 'Anti-His Biosensor - Recombinant Kinase & Small Molecule (Fast Off)',
    vietnameseName: 'Đầu Dò Anti-His - Kinase Tái Tổ Hợp & Thuốc Ức Chế Phân Tử Nhỏ (Động Học Tách Nhanh Fast-Off)',
    biosensorType: 'ANTI_HIS_TAG',
    biosensorName: 'Biosensor gắn kháng thể đơn dòng kháng thẻ Polyhistidine (His6)',
    immobilizedLigandName: 'His6-Tagged Tyrosine Kinase Domain (45 kDa)',
    analyteName: 'Small Molecule Kinase Inhibitor (480 Da)',
    molecularWeightAnalyteDa: 480,
    trueKonMolarInvSecInv: 8.5e4,
    trueKoffSecInv: 2.1e-2, // Fast off-rate (2.1 x 10^-2 s^-1)
    trueKdMolar: 2.47e-7, // 247 nM
    theoreticalRmaxNm: 0.28, // Small molecule shift ~ 0.2 - 0.3 nm
    baselineTimeSec: 45,
    associationTimeSec: 120,
    dissociationTimeSec: 180,
    defaultConcentrationsMolar: [2000e-9, 1000e-9, 500e-9, 250e-9, 125e-9],
    description:
      'Anti-His biosensors capture recombinant proteins directly from crude cell culture supernatants without purification. Small molecule drug screening exhibits rapid association and rapid dissociation ("fast on / fast off"), clearly resolving steady-state plateau responses within 60 seconds.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12: Enzym kinase phosphoryl hóa, chất ức chế cạnh tranh trung tâm hoạt động, phối tử phân tử nhỏ trong hóa dược trị liệu trúng đích ung thư.',
    biotechApplication:
      'Fragment-based drug discovery (FBDD), kinase inhibitor lead optimization, and crude lysate screening.',
    epitopeBinningRole: 'Regenerable sensor tip allowing repeated capture and elution cycles using 10 mM glycine pH 1.7.',
  },
  {
    id: 'anti_murine_epitope_binning_sandwich',
    name: 'Anti-Murine Biosensor - Antibody Epitope Binning (Sandwich Assay)',
    vietnameseName: 'Đầu Dò Kháng Chuột - Phân Cụm Epitope Kháng Thể (Thử Nghiệm Bánh Mì Kẹp Sandwich Chặn Chéo)',
    biosensorType: 'ANTI_MURINE_FC',
    biosensorName: 'Biosensor gắn kháng thể kháng chuột bắt giữ mAb sơ cấp',
    immobilizedLigandName: 'Mouse Anti-Target Primary mAb (150 kDa)',
    analyteName: 'Secondary Competing Human mAb (150 kDa)',
    molecularWeightAnalyteDa: 150000,
    trueKonMolarInvSecInv: 2.5e5,
    trueKoffSecInv: 1.2e-4,
    trueKdMolar: 4.8e-10, // 480 pM
    theoreticalRmaxNm: 2.40, // Large sandwich complex creates high optical shift
    baselineTimeSec: 60,
    associationTimeSec: 240,
    dissociationTimeSec: 360,
    defaultConcentrationsMolar: [200e-9, 100e-9, 50e-9, 25e-9, 12.5e-9],
    description:
      'Epitope binning is crucial for antibody drug discovery cocktail development. A primary antibody captures the antigen on the sensor; a secondary antibody is then introduced. If the secondary antibody binds (sandwich formation), it targets an independent non-overlapping epitope; if binding is blocked, they share the identical epitope.',
    curriculumNotes:
      'GDPT 2018 Sinh học 11 & Hóa học 12: Miễn dịch dịch thể, cấu trúc epitope kháng nguyên, tính đặc hiệu tương tác kháng nguyên - kháng thể.',
    biotechApplication:
      'Therapeutic antibody cocktail design (e.g. anti-infective monoclonal combinations against viral escape mutations).',
    epitopeBinningRole: 'Definitive cross-blocking binning matrix creation across antibody panels.',
  },
  {
    id: 'lipid_membrane_caps_viral_fusion',
    name: 'Lipid Biosensor - Membrane Protein & Viral Envelope Fusion Inhibition',
    vietnameseName: 'Đầu Dò Màng Lipid - Protein Màng & Ức Chế Hợp Màng Vỏ Virus (Liposome Binding)',
    biosensorType: 'LIPID_MEMBRANE_APS',
    biosensorName: 'Biosensor Aminopropylsilane (APS) kỵ nước hấp phụ liposome',
    immobilizedLigandName: 'Synthetic Lipid Bilayer (POPC/Cholesterol)',
    analyteName: 'Viral Fusion Peptide / Neutralizing Agent (3.8 kDa)',
    molecularWeightAnalyteDa: 3800,
    trueKonMolarInvSecInv: 6.2e4,
    trueKoffSecInv: 8.5e-4,
    trueKdMolar: 1.37e-8, // 13.7 nM
    theoreticalRmaxNm: 0.95,
    baselineTimeSec: 60,
    associationTimeSec: 180,
    dissociationTimeSec: 240,
    defaultConcentrationsMolar: [150e-9, 75e-9, 37.5e-9, 18.75e-9, 9.375e-9],
    description:
      'APS biosensors create a hydrophobic surface capturing intact liposomes without detergent lysis. Real-time BLI monitors peptide insertion into the lipid bilayer, modeling viral envelope entry (HIV-1 gp41, Influenza hemagglutinin) and evaluating fusion inhibitor therapeutics.',
    curriculumNotes:
      'GDPT 2018 Sinh học 10 & Hóa học 12: Lớp kép phospholipid màng sinh chất tế bào, cơ chế nhập bào và sự hòa màng virus.',
    biotechApplication:
      'Antimicrobial peptide development, membrane protein binding, and nanoparticle-membrane interactions.',
    epitopeBinningRole: 'Probes membrane-dependent conformational epitopes.',
  },
];

/**
 * Format dissociation constant Kd with physical unit prefix (pM, nM, uM, mM)
 */
export function formatBliKdString(kdMolar: number): string {
  if (kdMolar < 1e-9) {
    return `${(kdMolar * 1e12).toFixed(1)} pM`;
  } else if (kdMolar < 1e-6) {
    return `${(kdMolar * 1e9).toFixed(2)} nM`;
  } else if (kdMolar < 1e-3) {
    return `${(kdMolar * 1e6).toFixed(2)} μM`;
  } else {
    return `${(kdMolar * 1e3).toFixed(2)} mM`;
  }
}

/**
 * Calculate 1:1 Langmuir Real-Time Sensorgram Trace for a given analyte concentration
 */
export function calculateBliSensorgram(
  standard: BliStandard,
  analyteConcMolar: number
): BliKineticsPoint[] {
  const tBase = standard.baselineTimeSec;
  const tAssoc = standard.associationTimeSec;
  const tDissoc = standard.dissociationTimeSec;
  const kon = standard.trueKonMolarInvSecInv;
  const koff = standard.trueKoffSecInv;
  const rmax = standard.theoreticalRmaxNm;

  // Kinetic parameters
  const kobs = kon * analyteConcMolar + koff;
  // Steady-state equilibrium response: R_eq = R_max * [L] / ([L] + K_d)
  const req = (rmax * analyteConcMolar) / (analyteConcMolar + standard.trueKdMolar);

  const points: BliKineticsPoint[] = [];
  const totalTime = tBase + tAssoc + tDissoc;
  const timeStep = 2.0; // 2-second resolution

  let rAtEndOfAssoc = 0.0;

  for (let t = 0; t <= totalTime; t += timeStep) {
    let phase: 'BASELINE' | 'ASSOCIATION' | 'DISSOCIATION' = 'BASELINE';
    let shiftNm = 0.0;

    if (t < tBase) {
      phase = 'BASELINE';
      // Baseline jitter (0.003 nm)
      shiftNm = (Math.sin(t * 14.0) + Math.cos(t * 22.0)) * 0.003;
    } else if (t >= tBase && t < tBase + tAssoc) {
      phase = 'ASSOCIATION';
      const tInAssoc = t - tBase;
      // Langmuir association: R(t) = R_eq * (1 - exp(-k_obs * t))
      shiftNm = req * (1.0 - Math.exp(-kobs * tInAssoc));
      // Subtle baseline noise
      shiftNm += (Math.sin(t * 18.0)) * 0.002;
      rAtEndOfAssoc = shiftNm;
    } else {
      phase = 'DISSOCIATION';
      const tInDissoc = t - (tBase + tAssoc);
      // Langmuir dissociation: R(t) = R_0 * exp(-k_off * t)
      shiftNm = rAtEndOfAssoc * Math.exp(-koff * tInDissoc);
      shiftNm += (Math.cos(t * 16.0)) * 0.002;
    }

    points.push({
      timeSeconds: t,
      wavelengthShiftNm: Math.max(0, Math.round(shiftNm * 1000) / 1000),
      phase,
    });
  }

  return points;
}

/**
 * Simulate Multi-Concentration Bio-Layer Interferometry Experiment
 */
export function simulateBliExperiment(
  standard: BliStandard,
  customConcentrations?: number[]
): BliSimulationResult {
  const concs = customConcentrations || standard.defaultConcentrationsMolar;

  const colorPalette = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

  const sensorgramSeries: BliSensorgramCurve[] = [];

  concs.forEach((conc, idx) => {
    const trace = calculateBliSensorgram(standard, conc);
    const req = (standard.theoreticalRmaxNm * conc) / (conc + standard.trueKdMolar);

    let displayStr = `${(conc * 1e9).toFixed(1)} nM`;
    if (conc >= 1e-6) displayStr = `${(conc * 1e6).toFixed(1)} μM`;

    sensorgramSeries.push({
      concentrationMolar: conc,
      concentrationDisplayString: displayStr,
      colorHex: colorPalette[idx % colorPalette.length],
      trace,
      steadyStateReqNm: Math.round(req * 1000) / 1000,
    });
  });

  const totalTime = standard.baselineTimeSec + standard.associationTimeSec + standard.dissociationTimeSec;

  return {
    standard,
    fittedKonMolarInvSecInv: standard.trueKonMolarInvSecInv,
    fittedKoffSecInv: standard.trueKoffSecInv,
    fittedKdMolar: standard.trueKdMolar,
    kdDisplayString: formatBliKdString(standard.trueKdMolar),
    sensorgramSeries,
    rSquaredMetric: 0.998,
    chiSquaredMetric: 0.012,
    totalExperimentTimeSec: totalTime,
  };
}

/**
 * Match a card to an appropriate BLI standard
 */
export function getMatchingBliCard(card: any): BliStandard | null {
  if (!card) return null;
  const name = (card.name || '').toLowerCase();
  const desc = (card.description || '').toLowerCase();
  const formula = (card.chemicalFormula || card.formula || '').toLowerCase();

  // 1. Protein A / IgG
  if (
    name.includes('protein a') ||
    desc.includes('protein a') ||
    name.includes('igg') ||
    desc.includes('kháng thể đơn dòng')
  ) {
    return BLI_STANDARD_CATALOG.find((s) => s.id === 'protein_a_human_igg1') || null;
  }

  // 2. Streptavidin / Biotin / DNA
  if (
    name.includes('streptavidin') ||
    desc.includes('biotin') ||
    name.includes('lai phân tử') ||
    desc.includes('lai dna')
  ) {
    return BLI_STANDARD_CATALOG.find((s) => s.id === 'streptavidin_biotin_dna_hybridization') || null;
  }

  // 3. Anti-His / Kinase
  if (
    name.includes('his') ||
    name.includes('kinase') ||
    desc.includes('kinase') ||
    desc.includes('polyhistidine')
  ) {
    return BLI_STANDARD_CATALOG.find((s) => s.id === 'anti_his_kinase_inhibitor') || null;
  }

  // 4. Epitope Binning / Sandwich
  if (
    name.includes('epitope') ||
    desc.includes('binning') ||
    desc.includes('sandwich')
  ) {
    return BLI_STANDARD_CATALOG.find((s) => s.id === 'anti_murine_epitope_binning_sandwich') || null;
  }

  // 5. Lipid / Liposome
  if (
    name.includes('liposome') ||
    name.includes('màng lipid') ||
    desc.includes('hợp màng')
  ) {
    return BLI_STANDARD_CATALOG.find((s) => s.id === 'lipid_membrane_caps_viral_fusion') || null;
  }

  return null;
}

/**
 * Validation helper for BLI standard physics
 */
export function validateBliStandardPhysics(standard: BliStandard): boolean {
  if (standard.trueKonMolarInvSecInv <= 0) return false;
  if (standard.trueKoffSecInv <= 0) return false;
  if (standard.trueKdMolar <= 0) return false;
  if (standard.theoreticalRmaxNm <= 0) return false;
  if (standard.baselineTimeSec <= 0 || standard.associationTimeSec <= 0 || standard.dissociationTimeSec <= 0) return false;
  return true;
}
