/**
 * ELEMENTA - Differential Scanning Fluorimetry (DSF) & Protein Thermal Shift Assay (PTSA) Engine
 *
 * Biophysical Foundations & Pharmacological Standards:
 * - Environment-sensitive fluorescent dyes (SYPRO Orange, ANS, CPM):
 *     Strongly quenched in polar aqueous solvent, fluorescence quantum yield increases
 *     exponentially upon binding hydrophobic residues (Leu, Ile, Val, Phe, Trp) exposed during thermal unfolding.
 * - Boltzmann Two-State Sigmoidal Unfolding Model:
 *     F(T) = F_pre(T) + (F_post(T) - F_pre(T)) / (1 + exp((T_m - T) / a))
 *     where a = (R * T_m^2) / ΔH_m is the transition slope factor.
 * - First Derivative Melting Temperature Determination:
 *     (dF/dT)_max at T = T_m (inflection point of unfolding transition).
 * - Thermodynamic Ligand Binding Stabilization (Schellman-Brandts Formulation):
 *     Binding of high-affinity ligands to native folded state stabilizes ΔG_unfold:
 *     ΔT_m = T_m(holo) - T_m(apo) ≈ (R * T_m^2 / ΔH_m) * ln(1 + [L] / K_D)
 *     where ΔT_m > 0 indicates thermodynamic stabilization (positive thermal shift).
 * - Curriculum: Vietnam GDPT 2018 (Hóa học 12: Biến tính nhiệt của protein, tương tác kỵ nước, liên kết phối trí kim loại-enzim, thuốc kháng sinh & kháng virus).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 58)
 */

export interface DsfDataPoint {
  temperatureC: number;
  fluorescenceApo: number; // RFU (Relative Fluorescence Units)
  fluorescenceHolo: number;
  dF_dT_apo: number; // First derivative for Apo Tm peak
  dF_dT_holo: number; // First derivative for Holo Tm peak
}

export interface DsfAssayStandard {
  id: string;
  targetProteinName: string;
  vietnameseName: string;
  targetClass: 'metalloenzyme' | 'transport_globulin' | 'kinase' | 'viral_protease' | 'hydrolase' | 'tumor_suppressor';
  molecularWeightDa: number;
  apoTmCelsius: number;
  deltaHkJmol: number;
  slopeFactorA: number; // °C (typical 1.8 - 3.2°C)
  ligandName: string;
  ligandClass: 'inhibitor' | 'drug' | 'substrate_analog' | 'chaperone';
  kdNanomolar: number;
  maxDeltaTmCelsius: number; // Max thermal shift at saturating ligand
  maxFluorescenceRfu: number;
  biologicalMechanism: string;
  curriculumNotes: string;
}

export interface DsfSimulationResult {
  assay: DsfAssayStandard;
  ligandConcentrationMicroMolar: number;
  measuredApoTm: number;
  measuredHoloTm: number;
  measuredDeltaTm: number;
  stabilizationStatus: 'HIGH_STABILIZATION' | 'MODERATE_STABILIZATION' | 'NEUTRAL' | 'DESTABILIZED';
  points: DsfDataPoint[];
}

export const DSF_ASSAY_CATALOG: DsfAssayStandard[] = [
  {
    id: 'ca2_acetazolamide',
    targetProteinName: 'Human Carbonic Anhydrase II (CA-II)',
    vietnameseName: 'Carbonic Anhydrase II (Enzyme kẽm CA-II)',
    targetClass: 'metalloenzyme',
    molecularWeightDa: 29300,
    apoTmCelsius: 56.5,
    deltaHkJmol: 480,
    slopeFactorA: 2.1,
    ligandName: 'Acetazolamide (Diamox)',
    ligandClass: 'inhibitor',
    kdNanomolar: 12,
    maxDeltaTmCelsius: 10.7,
    maxFluorescenceRfu: 12500,
    biologicalMechanism: 'Zinc-coordinating active site inhibitor for glaucoma and mountain sickness.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Phức chất kẽm trong enzym carbonic anhydrase và cơ chế ức chế chọn lọc.'
  },
  {
    id: 'bsa_ibuprofen',
    targetProteinName: 'Bovine Serum Albumin (BSA)',
    vietnameseName: 'Albumin huyết thanh bò (BSA)',
    targetClass: 'transport_globulin',
    molecularWeightDa: 66463,
    apoTmCelsius: 65.0,
    deltaHkJmol: 380,
    slopeFactorA: 2.8,
    ligandName: 'Ibuprofen (Advil/Motrin)',
    ligandClass: 'drug',
    kdNanomolar: 2500, // 2.5 µM
    maxDeltaTmCelsius: 4.8,
    maxFluorescenceRfu: 15800,
    biologicalMechanism: 'NSAID drug binding to Sudlow Site II hydrophobic pocket on serum albumin.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Khối cầu albumin vận chuyển axit hữu cơ và thuốc chống viêm không steroid.'
  },
  {
    id: 'abl_imatinib',
    targetProteinName: 'Bcr-Abl Tyrosine Kinase Domain',
    vietnameseName: 'Kinase Tyrosine Bcr-Abl (Ung thư bạch cầu)',
    targetClass: 'kinase',
    molecularWeightDa: 32500,
    apoTmCelsius: 51.0,
    deltaHkJmol: 410,
    slopeFactorA: 2.4,
    ligandName: 'Imatinib (Gleevec)',
    ligandClass: 'inhibitor',
    kdNanomolar: 35,
    maxDeltaTmCelsius: 10.5,
    maxFluorescenceRfu: 11200,
    biologicalMechanism: 'First-in-class targeted ATP-competitive inhibitor against Philadelphia chromosome CML kinase.',
    curriculumNotes: 'Liệu pháp trúng đích ức chế enzyme kinase; thay đổi nhiệt độ nóng chảy ΔTm phản ánh lực liên kết thuốc.'
  },
  {
    id: 'mpro_nirmatrelvir',
    targetProteinName: 'SARS-CoV-2 Main Protease (Mpro / 3CLpro)',
    vietnameseName: 'Protease chính SARS-CoV-2 (Mpro)',
    targetClass: 'viral_protease',
    molecularWeightDa: 33800,
    apoTmCelsius: 54.0,
    deltaHkJmol: 450,
    slopeFactorA: 2.2,
    ligandName: 'Nirmatrelvir (Paxlovid)',
    ligandClass: 'inhibitor',
    kdNanomolar: 3.1,
    maxDeltaTmCelsius: 12.8,
    maxFluorescenceRfu: 13400,
    biologicalMechanism: 'Covalent reversible cysteine-reactive protease inhibitor halting viral polyprotein cleavage.',
    curriculumNotes: 'Thuốc kháng virus Covid-19; tạo liên kết thioimidate với Cys145 giúp tăng độ bền nhiệt lên thêm +12.8°C.'
  },
  {
    id: 'lysozyme_nag3',
    targetProteinName: 'Hen Egg White Lysozyme (HEWL)',
    vietnameseName: 'Lysozyme lòng trắng trứng (HEWL)',
    targetClass: 'hydrolase',
    molecularWeightDa: 14307,
    apoTmCelsius: 74.0,
    deltaHkJmol: 460,
    slopeFactorA: 2.0,
    ligandName: 'Tri-N-acetylglucosamine (NAG)3',
    ligandClass: 'substrate_analog',
    kdNanomolar: 8500, // 8.5 µM
    maxDeltaTmCelsius: 4.4,
    maxFluorescenceRfu: 9800,
    biologicalMechanism: 'Trisaccharide substrate analog fitting across subsites A-B-C in the active cleft.',
    curriculumNotes: 'Enzyme kháng khuẩn thủy phân thành tế bào vi khuẩn; cơ chế xúc tác axit-bazơ tổng quát (Glu35/Asp52).'
  },
  {
    id: 'p53_stabilizer',
    targetProteinName: 'p53 Core Domain (Y220C Oncogenic Mutant)',
    vietnameseName: 'Protein ức chế khối u p53 (Đột biến Y220C)',
    targetClass: 'tumor_suppressor',
    molecularWeightDa: 22000,
    apoTmCelsius: 39.5,
    deltaHkJmol: 320,
    slopeFactorA: 2.5,
    ligandName: 'PK11007 (Rescue Chaperone)',
    ligandClass: 'chaperone',
    kdNanomolar: 180,
    maxDeltaTmCelsius: 4.7,
    maxFluorescenceRfu: 14200,
    biologicalMechanism: 'Small molecule occupying the surface crevice caused by Y220C mutation to rescue native folding.',
    curriculumNotes: 'Phục hồi protein ức chế khối u; tăng Tm từ mức nguy hiểm 39.5°C lên trên thân nhiệt sinh lý (44.2°C).'
  }
];

/**
 * Calculates Boltzmann two-state fluorescence at temperature T
 */
export function calculateBoltzmannFluorescence(
  temperatureCelsius: number,
  tmCelsius: number,
  slopeFactorA: number,
  maxRfu: number
): number {
  const T = temperatureCelsius;
  // Pre-transition linear baseline (unfolded dye in aqueous buffer)
  const fPre = 80 + 0.8 * T;

  // Post-transition baseline (dye aggregation and precipitation decay above Tm)
  const fPostPeak = maxRfu;
  const decayOffset = Math.max(0, T - (tmCelsius + 4));
  const fPost = Math.max(fPre, fPostPeak - decayOffset * 110);

  // Boltzmann sigmoidal transition
  const exponent = (tmCelsius - T) / (slopeFactorA || 2.0);
  const clampedExp = Math.max(-40, Math.min(40, exponent));
  const sigmoid = 1.0 / (1.0 + Math.exp(clampedExp));

  return Math.round(fPre + (fPost - fPre) * sigmoid);
}

/**
 * Simulates a Differential Scanning Fluorimetry (DSF) run with Apo and Holo curves
 */
export function simulateDsfExperiment(
  assayId: string,
  ligandConcentrationMicroMolar: number = 10.0
): DsfSimulationResult {
  const assay = DSF_ASSAY_CATALOG.find((a) => a.id === assayId) || DSF_ASSAY_CATALOG[0];

  // Calculate Holo Tm based on ligand binding saturation
  const kdMicroMolar = assay.kdNanomolar / 1000;
  const saturationFraction = ligandConcentrationMicroMolar / (ligandConcentrationMicroMolar + kdMicroMolar);
  const measuredDeltaTm = Number((assay.maxDeltaTmCelsius * saturationFraction).toFixed(1));
  const holoTm = assay.apoTmCelsius + measuredDeltaTm;

  // Temperature sweep from 20.0°C to 95.0°C in 0.5°C increments (151 points)
  const rawPoints: { temp: number; fApo: number; fHolo: number }[] = [];
  for (let T = 20.0; T <= 95.0; T += 0.5) {
    const fApo = calculateBoltzmannFluorescence(T, assay.apoTmCelsius, assay.slopeFactorA, assay.maxFluorescenceRfu);
    const fHolo = calculateBoltzmannFluorescence(T, holoTm, assay.slopeFactorA, assay.maxFluorescenceRfu);
    rawPoints.push({
      temp: Number(T.toFixed(1)),
      fApo,
      fHolo
    });
  }

  // Compute numerical first derivatives dF/dT
  const points: DsfDataPoint[] = rawPoints.map((pt, i) => {
    let dF_dT_apo = 0;
    let dF_dT_holo = 0;
    if (i > 0 && i < rawPoints.length - 1) {
      const dt = rawPoints[i + 1].temp - rawPoints[i - 1].temp;
      dF_dT_apo = Math.round((rawPoints[i + 1].fApo - rawPoints[i - 1].fApo) / dt);
      dF_dT_holo = Math.round((rawPoints[i + 1].fHolo - rawPoints[i - 1].fHolo) / dt);
    }
    return {
      temperatureC: pt.temp,
      fluorescenceApo: pt.fApo,
      fluorescenceHolo: pt.fHolo,
      dF_dT_apo: Math.max(0, dF_dT_apo),
      dF_dT_holo: Math.max(0, dF_dT_holo)
    };
  });

  // Boundary derivatives
  if (points.length > 2) {
    points[0].dF_dT_apo = points[1].dF_dT_apo;
    points[0].dF_dT_holo = points[1].dF_dT_holo;
    points[points.length - 1].dF_dT_apo = points[points.length - 2].dF_dT_apo;
    points[points.length - 1].dF_dT_holo = points[points.length - 2].dF_dT_holo;
  }

  // Locate derivative peak temperatures
  let maxApoDeriv = -1;
  let measuredApoTm = assay.apoTmCelsius;
  let maxHoloDeriv = -1;
  let measuredHoloTm = holoTm;

  points.forEach((pt) => {
    if (pt.dF_dT_apo > maxApoDeriv) {
      maxApoDeriv = pt.dF_dT_apo;
      measuredApoTm = pt.temperatureC;
    }
    if (pt.dF_dT_holo > maxHoloDeriv) {
      maxHoloDeriv = pt.dF_dT_holo;
      measuredHoloTm = pt.temperatureC;
    }
  });

  let stabilizationStatus: 'HIGH_STABILIZATION' | 'MODERATE_STABILIZATION' | 'NEUTRAL' | 'DESTABILIZED';
  if (measuredDeltaTm >= 8.0) stabilizationStatus = 'HIGH_STABILIZATION';
  else if (measuredDeltaTm >= 3.0) stabilizationStatus = 'MODERATE_STABILIZATION';
  else if (measuredDeltaTm > 0.0) stabilizationStatus = 'NEUTRAL';
  else stabilizationStatus = 'DESTABILIZED';

  return {
    assay,
    ligandConcentrationMicroMolar,
    measuredApoTm,
    measuredHoloTm,
    measuredDeltaTm,
    stabilizationStatus,
    points
  };
}

/**
 * Intelligent Card Matcher for DSF / Thermal Shift Assay
 */
export function getMatchingDsfCard(card: { id?: string; name?: string; category?: string }): DsfAssayStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('zinc') || target.includes('zn') || target.includes('carbonic') || target.includes('acetazolamide')) {
    return DSF_ASSAY_CATALOG.find((a) => a.id === 'ca2_acetazolamide') || null;
  }
  if (target.includes('bsa') || target.includes('albumin') || target.includes('ibuprofen') || target.includes('serum')) {
    return DSF_ASSAY_CATALOG.find((a) => a.id === 'bsa_ibuprofen') || null;
  }
  if (target.includes('kinase') || target.includes('abl') || target.includes('imatinib') || target.includes('gleevec') || target.includes('leukemia')) {
    return DSF_ASSAY_CATALOG.find((a) => a.id === 'abl_imatinib') || null;
  }
  if (target.includes('protease') || target.includes('mpro') || target.includes('nirmatrelvir') || target.includes('paxlovid') || target.includes('cys')) {
    return DSF_ASSAY_CATALOG.find((a) => a.id === 'mpro_nirmatrelvir') || null;
  }
  if (target.includes('lysozyme') || target.includes('nag') || target.includes('hydrolase') || target.includes('egg')) {
    return DSF_ASSAY_CATALOG.find((a) => a.id === 'lysozyme_nag3') || null;
  }
  if (target.includes('p53') || target.includes('cancer') || target.includes('tumor') || target.includes('chaperone')) {
    return DSF_ASSAY_CATALOG.find((a) => a.id === 'p53_stabilizer') || null;
  }

  // Fallback for general enzymatic / biopharmaceutical cards
  if (target.includes('enzyme') || target.includes('protein') || target.includes('drug') || target.includes('inhibitor')) {
    return DSF_ASSAY_CATALOG[0]; // Default to Carbonic Anhydrase II
  }

  return null;
}
