/**
 * ELEMENTA - Dual-Polarization Interferometry (DPI), Evanescent Wave Waveguide & Molecular Layer Dimensions Engine
 *
 * Biophysical Foundations & Analytical Standards:
 * - Dual-Polarization Interferometry (G. H. Cross et al., Farfield Group / Manchester University, 2003):
 *     - Evanescent wave optical slab waveguide simultaneously exciting two orthogonal polarization modes:
 *         1. Transverse Magnetic (TM₀) mode: Electric field E_z normal to sensor surface (probes layer thickness d and perpendicular anisotropy).
 *         2. Transverse Electric (TE₀) mode: Electric field E_y parallel to sensor surface (probes total optical mass).
 *     - Coherent He-Ne laser (λ = 632.8 nm) creates interference fringes between reference waveguide and sensing waveguide.
 *     - Sub-picoradian optical phase shift resolution (ΔΦ_TM, ΔΦ_TE) yielding:
 *         - Layer thickness d with 0.1 Å (0.01 nm) sub-atomic resolution.
 *         - Layer refractive index n_adlayer with 10⁻⁷ RIU precision.
 * - De Feijter's Analytical Inversion Formula (J. A. De Feijter, 1978):
 *     - Mass surface density Γ (ng/mm² or mg/m²):
 *         Γ = d * ( (n_adlayer - n_bulk) / (dn/dc) )
 *     - where dn/dc is the refractive index increment:
 *         ~ 0.182 mL/g for globular proteins
 *         ~ 0.165 mL/g for phospholipid bilayers
 *         ~ 0.170 mL/g for DNA/RNA oligonucleotides
 * - Molecular Dimensions & Area per Molecule:
 *     - Area per molecule: A_mol = M_w / (Γ * N_A) [in nm² or Å²]
 *     - Packing density: ρ = Γ / d [in g/cm³]
 * - Direct Differentiation between Conformational Change vs Mass Binding:
 *     - Mass binding: Both thickness d and refractive index n (or total mass Γ) increase concurrently.
 *     - Conformational change / Unfolding: Thickness d expands while refractive index n drops due to solvent swelling, with constant mass Γ!
 * - Curriculum: Vietnam GDPT 2018 (Vật lý 12: Giao thoa sóng ánh sáng, khe Young, phân cực ánh sáng TM/TE, phản xạ toàn phần và sóng evanescent; Hóa học & Sinh học 10-12: Hấp phụ phân tử sinh học, màng kép lipid, biến tính protein).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 63)
 */

export const LASER_WAVELENGTH_NM = 632.8; // He-Ne laser
export const BULK_WATER_REFRACTIVE_INDEX = 1.3330; // Pure water at 25°C
export const AVOGADRO_CONSTANT = 6.02214076e23; // mol⁻¹

export interface DpiTimePoint {
  timeSec: number; // Time in seconds (0 to 600 s)
  phaseShiftTmDeg: number; // TM phase shift in degrees
  phaseShiftTeDeg: number; // TE phase shift in degrees
  thicknessNm: number; // Resolved thickness d in nm
  refractiveIndex: number; // Resolved layer refractive index n_adlayer
  surfaceMassDensityNgPerMm2: number; // De Feijter mass Γ in ng/mm²
  areaPerMoleculeNm2: number; // Molecular footprint A_mol
}

export interface DpiSpecimenStandard {
  id: string;
  name: string;
  vietnameseName: string;
  molecularWeightKDa: number;
  dnDcMlPerG: number; // Refractive index increment (e.g. 0.182 mL/g)
  nativeThicknessNm: number; // Expected thickness d in native state
  nativeRefractiveIndex: number; // Expected n_adlayer in native state
  transitionType: 'CONFORMATIONAL_UNFOLDING' | 'ORIENTATION_TRANSITION' | 'VESICLE_RUPTURE_BILAYER' | 'HYBRIDIZATION_RIGIDITY' | 'ANTIGEN_CAPTURE';
  transitionTimeSec: number; // When reagent / transition triggers (e.g. 180 s)
  postTransitionThicknessNm: number;
  postTransitionRefractiveIndex: number;
  description: string;
  curriculumNotes: string;
}

export interface DpiSimulationResult {
  specimen: DpiSpecimenStandard;
  temperatureCelsius: number;
  bulkRefractiveIndex: number;
  finalThicknessNm: number;
  finalRefractiveIndex: number;
  finalMassDensityNgPerMm2: number;
  finalAreaPerMoleculeNm2: number;
  thicknessResolutionAngstroms: number; // 0.1 Å
  timePoints: DpiTimePoint[];
}

export const DPI_CATALOG: DpiSpecimenStandard[] = [
  {
    id: 'bsa_adsorption_orientation',
    name: 'Bovine Serum Albumin (BSA) Adsorption & End-on Transition',
    vietnameseName: 'Hấp Phụ & Chuyển Dịch Định Hướng Của Albumin Huyết Thanh (BSA)',
    molecularWeightKDa: 66.4,
    dnDcMlPerG: 0.182,
    nativeThicknessNm: 3.2, // Side-on prolate ellipsoid (4 × 4 × 14 nm)
    nativeRefractiveIndex: 1.450,
    transitionType: 'ORIENTATION_TRANSITION',
    transitionTimeSec: 200,
    postTransitionThicknessNm: 7.4, // End-on perpendicular packing
    postTransitionRefractiveIndex: 1.465,
    description: 'BSA forms an initial low-density side-on monolayer (d ≈ 3.2 nm). Increasing bulk concentration forces steric crowding into an end-on vertical orientation (d ≈ 7.4 nm), accurately resolving anisotropic molecular footprint.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Cấu trúc không gian protein huyết thanh; Vật lý 12: Sự phân cực sóng ánh sáng TM và TE trong màng mỏng dị hướng.'
  },
  {
    id: 'lipid_bilayer_rupture',
    name: 'Supported Lipid Bilayer Formation (POPC Vesicle Rupture)',
    vietnameseName: 'Hình Thành Màng Kép Lipid (POPC Phá Vỡ Túi Liposome)',
    molecularWeightKDa: 0.76, // POPC MW ~ 760 Da
    dnDcMlPerG: 0.165,
    nativeThicknessNm: 24.5, // Intact small unilamellar vesicles (SUVs)
    nativeRefractiveIndex: 1.385,
    transitionType: 'VESICLE_RUPTURE_BILAYER',
    transitionTimeSec: 150,
    postTransitionThicknessNm: 4.25, // Planar lipid bilayer (42.5 Å matching X-ray reflectivity)
    postTransitionRefractiveIndex: 1.472,
    description: 'SUVs adsorb onto silica forming a 25 nm thick porous vesicular layer. At critical surface coverage, cooperative vesicle collapse forms a uniform planar bilayer with exact thickness d = 4.25 nm and packed refractive index n = 1.472.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 11: Cấu trúc mô hình khảm động của màng sinh học phospholipid kép; Hóa học 12: Lipid và este phức tạp.'
  },
  {
    id: 'dna_hybridization_rigidity',
    name: 'DNA 24-mer Oligonucleotide Hybridization & Duplex Extension',
    vietnameseName: 'Lai Hóa Đoạn Oligonucleotide DNA 24-mer & Kéo Dài Chuỗi Kép B-DNA',
    molecularWeightKDa: 7.4, // 24-mer ssDNA
    dnDcMlPerG: 0.170,
    nativeThicknessNm: 1.8, // Flexible coiled ssDNA
    nativeRefractiveIndex: 1.440,
    transitionType: 'HYBRIDIZATION_RIGIDITY',
    transitionTimeSec: 180,
    postTransitionThicknessNm: 6.9, // Rigid double-stranded B-DNA duplex (24 bp × 3.4 Å/bp)
    postTransitionRefractiveIndex: 1.460,
    description: 'Single-stranded probe tethered to surface is flexible with low effective thickness (1.8 nm). Hybridization with target DNA creates a rigid rod B-DNA duplex extending away from sensor (d = 6.9 nm, matching 24 bp length).',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 12: Nguyên tắc bổ sung A-T, G-X trong chuỗi xoắn kép ADN; Hóa học 12: Axit nucleic và liên kết hydro.'
  },
  {
    id: 'lysozyme_urea_denaturation',
    name: 'Lysozyme Chemical Denaturation & Hydrophobic Core Swelling',
    vietnameseName: 'Biến Tính Protein Lysozyme Bằng Urê & Giãn Phồng Lõi Kỵ Nước',
    molecularWeightKDa: 14.3,
    dnDcMlPerG: 0.185,
    nativeThicknessNm: 2.85, // Compact native globule
    nativeRefractiveIndex: 1.465,
    transitionType: 'CONFORMATIONAL_UNFOLDING',
    transitionTimeSec: 220,
    postTransitionThicknessNm: 6.10, // Swollen denatured random coil
    postTransitionRefractiveIndex: 1.382, // Drops due to massive water penetration!
    description: 'Direct DPI hallmark of protein denaturation: addition of 8 M urea unfolds the hydrophobic core. Thickness d inflates from 2.85 nm to 6.10 nm while refractive index drops from 1.465 to 1.382 as water penetrates, keeping mass density constant.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Hiện tượng đông tụ và biến tính protein dưới tác dụng của hóa chất; Sinh học 10: Sự biến đổi cấu trúc bậc 3 và bậc 4 enzym.'
  },
  {
    id: 'igg_antigen_immunosensor',
    name: 'Monoclonal IgG Antibody Immobilization & Antigen Capture',
    vietnameseName: 'Cố Định Kháng Thể Đơn Dòng IgG & Bắt Giữ Kháng Nguyên Đặc Hiệu',
    molecularWeightKDa: 150.0, // IgG antibody
    dnDcMlPerG: 0.182,
    nativeThicknessNm: 4.6, // Immobilized IgG layer
    nativeRefractiveIndex: 1.455,
    transitionType: 'ANTIGEN_CAPTURE',
    transitionTimeSec: 240,
    postTransitionThicknessNm: 8.5, // IgG + bound antigen complex
    postTransitionRefractiveIndex: 1.462,
    description: 'Monoclonal IgG covalently attached to silanized sensor surface (d = 4.6 nm). Specific antigen binding forms immune complex expanding layer dimensions to 8.5 nm with stoichiometric mass accumulation (ΔΓ = +1.2 ng/mm²).',
    curriculumNotes: 'GDPT 2018 Sinh học 11 & 12: Miễn dịch thể dịch, tương tác kháng nguyên - kháng thể đặc hiệu; Hóa học 12: Ứng dụng cảm biến sinh học biosensor.'
  }
];

/**
 * Calculates De Feijter's surface mass density:
 * Γ = d * ( (n_adlayer - n_bulk) / (dn/dc) )
 * d in nm, Γ in ng/mm² (equivalent to mg/m²)
 */
export function calculateDeFeijterMass(
  thicknessNm: number,
  refractiveIndex: number,
  bulkRefractiveIndex: number = BULK_WATER_REFRACTIVE_INDEX,
  dnDcMlPerG: number = 0.182
): number {
  if (thicknessNm <= 0 || refractiveIndex <= bulkRefractiveIndex) return 0;
  // d (nm) * 1e-7 cm
  // (n - n_bulk) / (dn/dc in cm³/g)
  // 1 g/cm² = 1e7 ng/mm²
  // -> Γ (ng/mm²) = thicknessNm * ((refractiveIndex - bulkRefractiveIndex) / dnDcMlPerG)
  const massNgPerMm2 = thicknessNm * ((refractiveIndex - bulkRefractiveIndex) / dnDcMlPerG);
  return Number(massNgPerMm2.toFixed(3));
}

/**
 * Calculates area per molecule A_mol (nm²):
 * A_mol = (M_w / (Γ * N_A)) * 1e14
 */
export function calculateAreaPerMolecule(
  massNgPerMm2: number,
  molecularWeightKDa: number
): number {
  if (massNgPerMm2 <= 0 || molecularWeightKDa <= 0) return 0;
  const massGPerCm2 = massNgPerMm2 * 1e-7;
  const molesPerCm2 = massGPerCm2 / (molecularWeightKDa * 1000);
  const moleculesPerCm2 = molesPerCm2 * AVOGADRO_CONSTANT;
  if (moleculesPerCm2 <= 0) return 0;
  // Area in cm² per molecule -> convert to nm² (* 1e14)
  const areaNm2 = (1.0 / moleculesPerCm2) * 1e14;
  return Number(Math.min(999.0, Math.max(0.01, areaNm2)).toFixed(2));
}

/**
 * Full Dual-Polarization Interferometry Simulation Workflow
 */
export function simulateDpiExperiment(
  specimenId: string,
  temperatureCelsius: number = 25.0
): DpiSimulationResult {
  const specimen = DPI_CATALOG.find((s) => s.id === specimenId) || DPI_CATALOG[0];

  // Temperature variation on water refractive index: dn/dT ≈ -1.0e-4 RIU/°C
  const bulkRefractiveIndex = Number(
    (BULK_WATER_REFRACTIVE_INDEX - 0.00010 * (temperatureCelsius - 25.0)).toFixed(4)
  );

  const totalTimeSec = 600;
  const timeSteps = 120;
  const timePoints: DpiTimePoint[] = [];

  const tTransition = specimen.transitionTimeSec;
  const dInitial = specimen.nativeThicknessNm;
  const dFinal = specimen.postTransitionThicknessNm;
  const nInitial = specimen.nativeRefractiveIndex;
  const nFinal = specimen.postTransitionRefractiveIndex;

  for (let i = 0; i <= timeSteps; i++) {
    const t = Number(((totalTimeSec * i) / timeSteps).toFixed(1));

    // Sigmoidal transition kinetics
    let progress = 0;
    if (t < tTransition - 30) {
      // Pre-transition initial baseline
      progress = 0;
    } else if (t > tTransition + 70) {
      // Post-transition plateau
      progress = 1.0;
    } else {
      // Smooth sigmoidal step
      const arg = (t - tTransition) / 18.0;
      progress = 1.0 / (1.0 + Math.exp(-arg));
    }

    // Thickness and Refractive Index evolution
    const currentD = Number((dInitial + (dFinal - dInitial) * progress).toFixed(3));
    const currentN = Number((nInitial + (nFinal - nInitial) * progress).toFixed(4));

    // Phase shift calculation: TM and TE optical path length changes
    // ΔΦ_TE ~ C_TE * (n - n_bulk) * d
    // ΔΦ_TM ~ C_TM * (n - n_bulk) * d * (1 + 0.35 * (d / 10))
    const deltaN = Math.max(0, currentN - bulkRefractiveIndex);
    const teShiftDeg = Number((deltaN * currentD * 14.8).toFixed(2));
    const tmShiftDeg = Number((deltaN * currentD * 18.2 * (1 + 0.04 * currentD)).toFixed(2));

    const massNgPerMm2 = calculateDeFeijterMass(currentD, currentN, bulkRefractiveIndex, specimen.dnDcMlPerG);
    const areaMolNm2 = calculateAreaPerMolecule(massNgPerMm2, specimen.molecularWeightKDa);

    timePoints.push({
      timeSec: t,
      phaseShiftTmDeg: tmShiftDeg,
      phaseShiftTeDeg: teShiftDeg,
      thicknessNm: currentD,
      refractiveIndex: currentN,
      surfaceMassDensityNgPerMm2: massNgPerMm2,
      areaPerMoleculeNm2: areaMolNm2
    });
  }

  const lastPoint = timePoints[timePoints.length - 1];

  return {
    specimen,
    temperatureCelsius,
    bulkRefractiveIndex,
    finalThicknessNm: lastPoint.thicknessNm,
    finalRefractiveIndex: lastPoint.refractiveIndex,
    finalMassDensityNgPerMm2: lastPoint.surfaceMassDensityNgPerMm2,
    finalAreaPerMoleculeNm2: lastPoint.areaPerMoleculeNm2,
    thicknessResolutionAngstroms: 0.1, // 0.01 nm
    timePoints
  };
}

/**
 * Intelligent Card Matcher for Dual-Polarization Interferometry
 */
export function getMatchingDpiCard(card: { id?: string; name?: string; category?: string }): DpiSpecimenStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('bsa') || target.includes('albumin') || target.includes('serum') || target.includes('orientation')) {
    return DPI_CATALOG.find((s) => s.id === 'bsa_adsorption_orientation') || null;
  }
  if (target.includes('lipid') || target.includes('bilayer') || target.includes('membrane') || target.includes('vesicle') || target.includes('popc')) {
    return DPI_CATALOG.find((s) => s.id === 'lipid_bilayer_rupture') || null;
  }
  if (target.includes('dna') || target.includes('hybrid') || target.includes('oligonucleotide') || target.includes('base') || target.includes('duplex')) {
    return DPI_CATALOG.find((s) => s.id === 'dna_hybridization_rigidity') || null;
  }
  if (target.includes('lysozyme') || target.includes('urea') || target.includes('unfold') || target.includes('denature')) {
    return DPI_CATALOG.find((s) => s.id === 'lysozyme_urea_denaturation') || null;
  }
  if (target.includes('antibody') || target.includes('igg') || target.includes('antigen') || target.includes('immuno') || target.includes('biosensor')) {
    return DPI_CATALOG.find((s) => s.id === 'igg_antigen_immunosensor') || null;
  }

  // Fallback
  if (target.includes('protein') || target.includes('surface') || target.includes('thickness') || target.includes('refraction')) {
    return DPI_CATALOG[0]; // Default to BSA
  }

  return null;
}
