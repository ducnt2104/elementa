// src/domain/itcEngine.ts
// Milestone 75: Isothermal Titration Calorimetry (ITC), Binding Enthalpy (ΔH°) & Wiseman c-Value Thermodynamics Engine
// Standards: IUPAC Division I Physical & Biophysical Chemistry, Wiseman et al. (1989), Freire et al.
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 11: Năng lượng hóa học, biến thiên enthalpy chuẩn Δr H°298, phản ứng tỏa nhiệt - thu nhiệt; Hóa học 12: Phức chất phối trí, hằng số bền tạo phức; Sinh học 10: Tương tác enzyme - cơ chất, tính đặc hiệu cấu trúc không gian)

export const UNIVERSAL_GAS_CONSTANT_R = 8.314462618; // J / (mol K)
export const CALORIE_TO_JOULE = 4.184; // J / cal

export type ItcInteractionType =
  | 'CHELATION_COMPLEX'
  | 'ULTRA_AFFINITY_BIOTIN'
  | 'DRUG_ENZYME_INHIBITOR'
  | 'HOST_GUEST_INCLUSION'
  | 'ENZYME_SUBSTRATE_MIMIC';

export interface ItcInjectionStep {
  injectionIndex: number;
  injectionVolumeMicroL: number;
  titrantMolarRatio: number; // [L]_t / [M]_t
  macromoleculeBoundFraction: number; // Theta (0 to 1)
  heatPerInjectionMicroJoules: number; // Delta q_i (microJoules)
  normalizedHeatKjPerMol: number; // Delta q / Delta n_L (kJ / mol of injectant)
  cumulativeHeatMicroJoules: number;
  differentialPowerMicroWatts: number; // Peak power in raw thermogram
}

export interface ItcRawThermogramPoint {
  timeSeconds: number; // 0 to ~3600 s (1 hour run)
  differentialPowerMicroWatts: number; // MicroWatts (heat flow)
  activeInjectionIndex: number; // Which injection spike is decaying
}

export interface ItcStandard {
  id: string;
  name: string;
  vietnameseName: string;
  macromoleculeName: string;
  titrantLigandName: string;
  interactionType: ItcInteractionType;
  stoichiometryN: number; // n (molar ratio at equivalence point)
  associationConstantKaMolar: number; // K_a (M^-1)
  dissociationConstantKdMolar: number; // K_d = 1 / K_a (M)
  bindingEnthalpyDeltaHKjPerMol: number; // Delta H° (kJ/mol)
  temperatureKelvin: number; // T (default 298.15 K = 25°C)
  cellVolumeMilliL: number; // V_cell (typically 1.4 mL or 0.2 mL)
  macromoleculeConcentrationMolar: number; // [M]_0 in cell (e.g. 20 uM to 100 uM)
  syringeLigandConcentrationMolar: number; // [L]_syr (typically 10x to 15x cell conc)
  numberOfInjections: number; // typically 15 to 25 injections
  injectionVolumeMicroL: number; // typically 2 to 10 uL per injection
  heatOfDilutionKjPerMol: number; // q_dil (small constant background, e.g. -0.5 kJ/mol)
  description: string;
  curriculumNotes: string;
  biophysicalSignificance: string;
}

export interface ItcSimulationResult {
  standard: ItcStandard;
  wisemanCValue: number; // c = n * K_a * [M]_0
  wisemanRegime: 'OPTIMAL_SIGMOIDAL' | 'TOO_LOW_DIFFUSE' | 'TOO_HIGH_STEP_FUNCTION';
  gibbsFreeEnergyDeltaGKjPerMol: number; // Delta G° = -RT ln(K_a)
  entropyContributionMinusTDeltaSKjPerMol: number; // -T Delta S° = Delta G° - Delta H°
  entropyChangeDeltaSJPerMolK: number; // Delta S°
  thermodynamicDrivingForce: 'ENTHALPY_DRIVEN' | 'ENTROPY_DRIVEN' | 'BALANCED_COMPENSATION';
  injections: ItcInjectionStep[];
  rawThermogram: ItcRawThermogramPoint[];
}

/**
 * Catalog: 5 Comprehensive ITC Benchmark Systems
 */
export const ITC_STANDARD_CATALOG: ItcStandard[] = [
  {
    id: 'edta_calcium_chelation',
    name: 'Calcium - EDTA Chelation Calibrant',
    vietnameseName: 'Phức Chelate Calci - EDTA (Chuẩn Hiệu Chuẩn ITC Quốc Tế n=1.0 & Tỏa Nhiệt ΔH = -25.5 kJ/mol)',
    macromoleculeName: 'EDTA tetrasodium salt (Ethylenediaminetetraacetate)',
    titrantLigandName: 'Calcium Chloride (CaCl2)',
    interactionType: 'CHELATION_COMPLEX',
    stoichiometryN: 1.0,
    associationConstantKaMolar: 5.2e7, // K_a = 5.2 x 10^7 M^-1 (K_d = 19.2 nM)
    dissociationConstantKdMolar: 1.92e-8,
    bindingEnthalpyDeltaHKjPerMol: -25.5, // Exothermic chelation
    temperatureKelvin: 298.15,
    cellVolumeMilliL: 1.4,
    macromoleculeConcentrationMolar: 2.5e-5, // 25 uM EDTA in cell
    syringeLigandConcentrationMolar: 3.0e-4, // 300 uM Ca2+ in syringe (12x)
    numberOfInjections: 20,
    injectionVolumeMicroL: 10.0,
    heatOfDilutionKjPerMol: -0.4,
    description:
      'The international gold-standard chemical test for ITC validation. EDTA forms a strong hexadentate chelate complex with Ca2+ (1:1 stoichiometry) with an exothermic enthalpy of -25.5 kJ/mol. In addition, the displacement of 6 hydration waters from the Ca2+ coordination shell produces a favorable entropic contribution (-TΔS = -18.6 kJ/mol).',
    curriculumNotes:
      'GDPT 2018 Hóa học 10 & 12: Biến thiên enthalpy chuẩn Δr H°298, phản ứng tỏa nhiệt (exothermic); phức chất phối trí chelate vòng càng 6 răng bền vững, ứng dụng làm mềm nước cứng.',
    biophysicalSignificance:
      'Universal benchmark calibrant for testing ITC instrument response, injection syringe accuracy, and cell cleanliness.',
  },
  {
    id: 'streptavidin_biotin',
    name: 'Streptavidin - Biotin Ultra-Affinity Complex',
    vietnameseName: 'Phức Hệ Streptavidin - Biotin (Ái Lực Siêu Cao Kd = 100 fM & Tỏa Nhiệt Cực Đại ΔH = -134 kJ/mol)',
    macromoleculeName: 'Streptavidin (tetrameric core protein)',
    titrantLigandName: 'D-Biotin (Vitamin B7 / Vitamin H)',
    interactionType: 'ULTRA_AFFINITY_BIOTIN',
    stoichiometryN: 4.0, // 4 biotin binding sites per tetramer
    associationConstantKaMolar: 1.0e13, // K_a = 10^13 M^-1 (K_d = 100 fM)
    dissociationConstantKdMolar: 1.0e-13,
    bindingEnthalpyDeltaHKjPerMol: -134.0, // Massive exothermic binding enthalpy!
    temperatureKelvin: 298.15,
    cellVolumeMilliL: 1.4,
    macromoleculeConcentrationMolar: 5.0e-6, // 5 uM tetramer (20 uM sites)
    syringeLigandConcentrationMolar: 2.2e-4, // 220 uM Biotin in syringe
    numberOfInjections: 20,
    injectionVolumeMicroL: 10.0,
    heatOfDilutionKjPerMol: -0.6,
    description:
      'The strongest known non-covalent biological interaction in nature (Kd ~ 100 fM). The immense exothermic enthalpy (ΔH° = -134 kJ/mol) arises from an intricate network of 8 buried hydrogen bonds and aromatic van der Waals stacking inside a hydrophobic barrel. The conformational freezing of the flexible L3/4 surface loop incurs a substantial entropic penalty (-TΔS° = +59.8 kJ/mol).',
    curriculumNotes:
      'GDPT 2018 Sinh học 10 & Hóa học 12: Tương tác liên kết hydro và van der Waals, tính đặc hiệu tuyệt đối của protein với phối tử sinh học; kỹ thuật đánh dấu biotinyl hóa trong ELISA và Western Blot.',
    biophysicalSignificance:
      'Textbook paradigm of enthalpy-driven ultra-affinity binding with dramatic enthalpy-entropy compensation (EEC).',
  },
  {
    id: 'hiv1_protease_darunavir',
    name: 'HIV-1 Protease - Darunavir Inhibitor',
    vietnameseName: 'Enzyme HIV-1 Protease - Thuốc Ức Chế Darunavir (Thiết Kế Thuốc Tối Ưu Enthalpy Kd = 15 pM)',
    macromoleculeName: 'HIV-1 Aspartic Protease (homodimer, 21.5 kDa)',
    titrantLigandName: 'Darunavir (Prezista / TMC-114 antiviral drug)',
    interactionType: 'DRUG_ENZYME_INHIBITOR',
    stoichiometryN: 1.0,
    associationConstantKaMolar: 6.67e10, // K_a = 6.67 x 10^10 M^-1 (K_d = 15 pM)
    dissociationConstantKdMolar: 1.5e-11,
    bindingEnthalpyDeltaHKjPerMol: -46.8, // Enthalpy-optimized drug binding
    temperatureKelvin: 298.15,
    cellVolumeMilliL: 1.4,
    macromoleculeConcentrationMolar: 1.2e-5, // 12 uM protease
    syringeLigandConcentrationMolar: 1.5e-4, // 150 uM Darunavir
    numberOfInjections: 20,
    injectionVolumeMicroL: 10.0,
    heatOfDilutionKjPerMol: -0.5,
    description:
      'Darunavir is a premier second-generation protease inhibitor engineered specifically to combat multidrug resistance. ITC reveals that Darunavir achieves picomolar affinity through an enthalpy-driven mechanism (ΔH° = -46.8 kJ/mol), mediated by its unique bis-tetrahydrofuranyl (bis-THF) moiety forming invariant hydrogen bonds directly with the conserved main-chain Asp29/Asp30 atoms.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 & Sinh học 11: Cơ chế ức chế cạnh tranh enzyme, hóa học dược phẩm và thiết kế thuốc nhắm trúng đích (target-directed drug design) kháng virus HIV/AIDS.',
    biophysicalSignificance:
      'Milestone example of thermodynamic optimization in rational drug discovery: maximizing hydrogen bonding with invariant peptide backbones to circumvent drug-resistance mutations.',
  },
  {
    id: 'beta_cyclodextrin_adamantane',
    name: 'β-Cyclodextrin - Adamantane Host-Guest Complex',
    vietnameseName: 'Phức Bao Khách - Chủ β-Cyclodextrin - Adamantane (Động Lực Giải Sonvat Hóa Khoang Kỵ Nước)',
    macromoleculeName: 'β-Cyclodextrin (Cycloheptaamylose host ring)',
    titrantLigandName: '1-Adamantanecarboxylic Acid (guest molecule)',
    interactionType: 'HOST_GUEST_INCLUSION',
    stoichiometryN: 1.0,
    associationConstantKaMolar: 4.5e4, // K_a = 4.5 x 10^4 M^-1 (K_d = 22.2 uM)
    dissociationConstantKdMolar: 2.22e-5,
    bindingEnthalpyDeltaHKjPerMol: -19.2,
    temperatureKelvin: 298.15,
    cellVolumeMilliL: 1.4,
    macromoleculeConcentrationMolar: 2.0e-4, // 200 uM beta-CD in cell
    syringeLigandConcentrationMolar: 2.5e-3, // 2.5 mM adamantane in syringe
    numberOfInjections: 20,
    injectionVolumeMicroL: 10.0,
    heatOfDilutionKjPerMol: -0.3,
    description:
      'A classic supramolecular host-guest model system. The hydrophobic cage of adamantane fits snugly into the apolar interior cavity of the cyclic oligosaccharide β-cyclodextrin. The driving force is predominantly the expulsion of high-energy structured water molecules from the cavity into bulk solution, accompanied by favorable van der Waals contact.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 (Bài Carbohydrate & Hóa học Siêu phân tử): Vòng oligosaccharide liên kết alpha-1,4-glycosidic, khoang kỵ nước ứng dụng trong viên nén bao tan giải phóng chậm dược phẩm.',
    biophysicalSignificance:
      'Fundamental reference for supramolecular chemistry, drug encapsulation, and hydrophobic cavity desolvation thermodynamics.',
  },
  {
    id: 'lysozyme_tri_nag',
    name: 'Hen Egg White Lysozyme - Tri-N-Acetylglucosamine (NAG3)',
    vietnameseName: 'Lysozyme - Oligosaccharide NAG3 (Cơ Chất Giả Thành Tế Bào Vi Khuẩn & Tỏa Nhiệt ΔH = -52 kJ/mol)',
    macromoleculeName: 'Hen Egg White Lysozyme (HEWL, 14.3 kDa)',
    titrantLigandName: 'Tri-N-acetylglucosamine ((NAG)3 trimer)',
    interactionType: 'ENZYME_SUBSTRATE_MIMIC',
    stoichiometryN: 1.0,
    associationConstantKaMolar: 1.8e5, // K_a = 1.8 x 10^5 M^-1 (K_d = 5.56 uM)
    dissociationConstantKdMolar: 5.56e-6,
    bindingEnthalpyDeltaHKjPerMol: -52.0, // Strongly enthalpy driven
    temperatureKelvin: 298.15,
    cellVolumeMilliL: 1.4,
    macromoleculeConcentrationMolar: 6.0e-5, // 60 uM Lysozyme
    syringeLigandConcentrationMolar: 8.0e-4, // 800 uM NAG3
    numberOfInjections: 20,
    injectionVolumeMicroL: 10.0,
    heatOfDilutionKjPerMol: -0.4,
    description:
      'Lysozyme hydrolyzes the β(1->4) glycosidic bonds of bacterial cell wall peptidoglycan. Titration with the non-hydrolyzable trimer NAG3 binds in catalytic subsites A, B, and C with high enthalpy (-52 kJ/mol) driven by hydrogen bonding with Asp101, Trp62, and Trp63, while the conformational ordering of the active-site cleft incurs an entropic cost (-TΔS° = +22.1 kJ/mol).',
    curriculumNotes:
      'GDPT 2018 Sinh học 10 & Hóa học 12: Cấu trúc không gian bậc 3 của enzyme protein, trung tâm hoạt động, cơ chế kháng khuẩn tự nhiên trong nước mắt và lòng trắng trứng.',
    biophysicalSignificance:
      'Historical foundation of enzymology and structural biology (David Phillips 1965 Nobel crystal structure).',
  },
];

/**
 * Calculate the Wiseman c-value:
 * c = n * K_a * [M]_0
 */
export function calculateWisemanCValue(
  n: number,
  kaMolar: number,
  macromoleculeConcentrationMolar: number
): number {
  return n * kaMolar * macromoleculeConcentrationMolar;
}

/**
 * Single-site Langmuir binding model:
 * Calculates fraction of macromolecule bound Theta (0 to 1)
 */
export function calculateBoundFractionTheta(
  macromoleculeConcMolar: number, // [M]_t
  ligandConcMolar: number, // [L]_t
  stoichiometryN: number, // n
  kaMolar: number // K_a
): number {
  if (macromoleculeConcMolar <= 0 || kaMolar <= 0) return 0;
  const kd = 1 / kaMolar;
  const mt = macromoleculeConcMolar;
  const lt = ligandConcMolar;
  const n = stoichiometryN;

  // Quadratic solution for single independent sites:
  // Theta = ( (1 + n*lt/mt + kd/mt) - sqrt( (1 + n*lt/mt + kd/mt)^2 - 4 * n*lt/mt ) ) / 2
  const b = 1 + (n * lt) / mt + kd / mt;
  const discriminant = Math.max(0, b * b - (4 * n * lt) / mt);
  const theta = (b - Math.sqrt(discriminant)) / 2;

  return Math.max(0, Math.min(1.0, theta));
}

/**
 * Simulate complete ITC titration experiment (injections + raw thermogram)
 */
export function simulateItcTitration(standard: ItcStandard): ItcSimulationResult {
  const tKelvin = standard.temperatureKelvin;
  const ka = standard.associationConstantKaMolar;
  const deltaH = standard.bindingEnthalpyDeltaHKjPerMol;
  const n = standard.stoichiometryN;
  const vCellMilliL = standard.cellVolumeMilliL;
  const vCellLiters = vCellMilliL * 1e-3;
  const m0 = standard.macromoleculeConcentrationMolar;
  const lSyr = standard.syringeLigandConcentrationMolar;
  const numInj = standard.numberOfInjections;
  const injVolMicroL = standard.injectionVolumeMicroL;
  const injVolLiters = injVolMicroL * 1e-6;

  // 1. Wiseman c-value
  const cValue = calculateWisemanCValue(n, ka, m0);
  let cRegime: 'OPTIMAL_SIGMOIDAL' | 'TOO_LOW_DIFFUSE' | 'TOO_HIGH_STEP_FUNCTION' = 'OPTIMAL_SIGMOIDAL';
  if (cValue < 5.0) {
    cRegime = 'TOO_LOW_DIFFUSE';
  } else if (cValue > 1500.0) {
    cRegime = 'TOO_HIGH_STEP_FUNCTION';
  }

  // 2. Gibbs Free Energy & Entropy
  // Delta G° = - R * T * ln(K_a)  (in J/mol -> convert to kJ/mol)
  const deltaGJoule = -UNIVERSAL_GAS_CONSTANT_R * tKelvin * Math.log(ka);
  const deltaGKj = deltaGJoule / 1000.0;
  // -T Delta S° = Delta G° - Delta H°
  const minusTDeltaSKj = deltaGKj - deltaH;
  // Delta S° = (Delta H° - Delta G°) / T (in J / (mol K))
  const deltaSJoulesPerMolK = ((deltaH - deltaGKj) * 1000.0) / tKelvin;

  // Driving force
  let drivingForce: 'ENTHALPY_DRIVEN' | 'ENTROPY_DRIVEN' | 'BALANCED_COMPENSATION' = 'ENTHALPY_DRIVEN';
  if (Math.abs(deltaH) > Math.abs(minusTDeltaSKj) * 1.5) {
    drivingForce = 'ENTHALPY_DRIVEN';
  } else if (Math.abs(minusTDeltaSKj) > Math.abs(deltaH) * 1.5 && minusTDeltaSKj < 0) {
    drivingForce = 'ENTROPY_DRIVEN';
  } else {
    drivingForce = 'BALANCED_COMPENSATION';
  }

  // 3. Step-by-step Titration Injections
  const injections: ItcInjectionStep[] = [];
  let cumulativeHeatMicroJoules = 0;
  let prevTheta = 0;

  for (let i = 1; i <= numInj; i++) {
    // Dilution due to ongoing injections
    const totalAddedVolLiters = i * injVolLiters;
    const currentMt = m0 * (1 - totalAddedVolLiters / vCellLiters);
    // Cumulative ligand added
    const totalLigandMoles = totalAddedVolLiters * lSyr * (1 - totalAddedVolLiters / (2 * vCellLiters));
    const currentLt = totalLigandMoles / vCellLiters;

    const molarRatio = currentLt / currentMt;

    // Bound fraction
    const theta = calculateBoundFractionTheta(currentMt, currentLt, n, ka);
    const deltaTheta = Math.max(0, theta - prevTheta);
    prevTheta = theta;

    // Delta q_i = n * [M]_t * V_cell * Delta Theta * Delta H° (kJ -> J -> uJ)
    // plus heat of dilution
    const deltaMolesBound = n * currentMt * vCellLiters * deltaTheta;
    const heatOfBindingJoules = deltaMolesBound * (deltaH * 1000.0);
    const molesInjectedThisStep = injVolLiters * lSyr;
    const heatOfDilutionJoules = molesInjectedThisStep * (standard.heatOfDilutionKjPerMol * 1000.0);

    const totalHeatStepJoules = heatOfBindingJoules + heatOfDilutionJoules;
    const totalHeatMicroJoules = totalHeatStepJoules * 1e6;

    // Normalized heat: kJ / mol of injectant
    const normalizedKjPerMol = (totalHeatStepJoules / molesInjectedThisStep) / 1000.0;

    cumulativeHeatMicroJoules += totalHeatMicroJoules;

    // Differential power peak in raw thermogram (uW)
    // P_peak ~ Delta q / (2 * tau), with tau ~ 15s
    const diffPowerMicroWatts = (totalHeatMicroJoules / 15.0) * 0.8;

    injections.push({
      injectionIndex: i,
      injectionVolumeMicroL: injVolMicroL,
      titrantMolarRatio: Math.round(molarRatio * 100) / 100,
      macromoleculeBoundFraction: Math.round(theta * 1000) / 1000,
      heatPerInjectionMicroJoules: Math.round(totalHeatMicroJoules * 10) / 10,
      normalizedHeatKjPerMol: Math.round(normalizedKjPerMol * 10) / 10,
      cumulativeHeatMicroJoules: Math.round(cumulativeHeatMicroJoules * 10) / 10,
      differentialPowerMicroWatts: Math.round(diffPowerMicroWatts * 10) / 10,
    });
  }

  // 4. Raw Thermogram Simulation (Power vs Time, uW vs s)
  // Injection spacing = 150 seconds (2.5 minutes)
  const injectionSpacingSeconds = 150;
  const tauSeconds = 18.0; // Decay response time
  const rawThermogram: ItcRawThermogramPoint[] = [];

  for (let injIdx = 0; injIdx < injections.length; injIdx++) {
    const inj = injections[injIdx];
    const tStart = injIdx * injectionSpacingSeconds;

    for (let dt = 0; dt < injectionSpacingSeconds; dt += 3) {
      const t = tStart + dt;
      // Exponential decay from peak
      const decay = Math.exp(-dt / tauSeconds);
      // Small instrument baseline noise (+- 0.02 uW)
      const noise = (Math.sin(t * 0.3) + Math.cos(t * 0.7)) * 0.02;
      const power = inj.differentialPowerMicroWatts * decay + noise;

      rawThermogram.push({
        timeSeconds: t,
        differentialPowerMicroWatts: Math.round(power * 100) / 100,
        activeInjectionIndex: inj.injectionIndex,
      });
    }
  }

  return {
    standard,
    wisemanCValue: Math.round(cValue * 10) / 10,
    wisemanRegime: cRegime,
    gibbsFreeEnergyDeltaGKjPerMol: Math.round(deltaGKj * 10) / 10,
    entropyContributionMinusTDeltaSKjPerMol: Math.round(minusTDeltaSKj * 10) / 10,
    entropyChangeDeltaSJPerMolK: Math.round(deltaSJoulesPerMolK * 10) / 10,
    thermodynamicDrivingForce: drivingForce,
    injections,
    rawThermogram,
  };
}

/**
 * Match card to appropriate ITC standard
 */
export function getMatchingItcCard(card: any): ItcStandard | null {
  if (!card) return null;
  const cardName = (card.name || '').toLowerCase();
  const cardFormula = (card.formula || '').toLowerCase();
  const cardCategory = (card.category || '').toLowerCase();
  const cardElement = (card.elementSymbol || card.symbol || '').toUpperCase();

  // 1. Calcium / EDTA Chelation
  if (
    cardElement === 'CA' ||
    cardName.includes('calci') ||
    cardName.includes('calcium') ||
    cardName.includes('edta') ||
    cardFormula.includes('edta') ||
    cardFormula.includes('ca')
  ) {
    return ITC_STANDARD_CATALOG.find((s) => s.id === 'edta_calcium_chelation') || null;
  }

  // 2. Biotin / Streptavidin
  if (
    cardName.includes('biotin') ||
    cardName.includes('streptavidin') ||
    cardName.includes('vitamin b7') ||
    cardName.includes('vitamin h')
  ) {
    return ITC_STANDARD_CATALOG.find((s) => s.id === 'streptavidin_biotin') || null;
  }

  // 3. HIV-1 / Antiviral / Protease Inhibitor
  if (
    cardName.includes('hiv') ||
    cardName.includes('protease') ||
    cardName.includes('darunavir') ||
    cardName.includes('antiviral') ||
    cardName.includes('kháng virus')
  ) {
    return ITC_STANDARD_CATALOG.find((s) => s.id === 'hiv1_protease_darunavir') || null;
  }

  // 4. Cyclodextrin / Host-Guest
  if (
    cardName.includes('cyclodextrin') ||
    cardName.includes('adamantane') ||
    cardName.includes('siêu phân tử') ||
    cardName.includes('bao tan')
  ) {
    return ITC_STANDARD_CATALOG.find((s) => s.id === 'beta_cyclodextrin_adamantane') || null;
  }

  // 5. Lysozyme / Peptidoglycan
  if (
    cardName.includes('lysozyme') ||
    cardName.includes('peptidoglycan') ||
    cardName.includes('nag') ||
    cardName.includes('kháng khuẩn')
  ) {
    return ITC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_tri_nag') || null;
  }

  return null;
}

/**
 * Validate physical consistency of ITC standard (assertion helper)
 */
export function validateItcStandardPhysics(standard: ItcStandard): boolean {
  if (standard.stoichiometryN <= 0 || standard.stoichiometryN > 20) return false;
  if (standard.associationConstantKaMolar <= 0) return false;
  if (standard.dissociationConstantKdMolar <= 0) return false;
  if (Math.abs(standard.bindingEnthalpyDeltaHKjPerMol) > 500) return false;
  if (standard.cellVolumeMilliL <= 0 || standard.cellVolumeMilliL > 10) return false;
  if (standard.macromoleculeConcentrationMolar <= 0) return false;
  if (standard.syringeLigandConcentrationMolar <= 0) return false;
  return true;
}
