// src/domain/electrochemistryEngine.ts
// Comprehensive Electrochemistry & Galvanic Cells / Electrolysis Engine for ELEMENTA
// Aligned with GDPT 2018 Chemistry 12 (Pin Điện Hóa & Điện Phân) and IUPAC Standards

export interface RedoxCouple {
  id: string;
  oxidizedForm: string;
  reducedForm: string;
  standardPotentialE0: number; // in Volts vs SHE at 298.15 K
  electronsTransferred: number;
  halfReactionVI: string;
  equationHTML?: string;
}

// 1. Comprehensive Standard Reduction Potential Table (E° in Volts vs Standard Hydrogen Electrode)
export const STANDARD_REDUCTION_POTENTIALS: Record<string, RedoxCouple> = {
  F2_F: {
    id: 'F2_F',
    oxidizedForm: 'F₂',
    reducedForm: 'F⁻',
    standardPotentialE0: 2.87,
    electronsTransferred: 2,
    halfReactionVI: 'F₂ + 2e⁻ ⇌ 2F⁻'
  },
  S2O8_SO4: {
    id: 'S2O8_SO4',
    oxidizedForm: 'S₂O₈²⁻',
    reducedForm: 'SO₄²⁻',
    standardPotentialE0: 2.01,
    electronsTransferred: 2,
    halfReactionVI: 'S₂O₈²⁻ + 2e⁻ ⇌ 2SO₄²⁻'
  },
  MnO4_Mn2: {
    id: 'MnO4_Mn2',
    oxidizedForm: 'MnO₄⁻ (H⁺)',
    reducedForm: 'Mn²⁺',
    standardPotentialE0: 1.51,
    electronsTransferred: 5,
    halfReactionVI: 'MnO₄⁻ + 8H⁺ + 5e⁻ ⇌ Mn²⁺ + 4H₂O'
  },
  Cl2_Cl: {
    id: 'Cl2_Cl',
    oxidizedForm: 'Cl₂',
    reducedForm: 'Cl⁻',
    standardPotentialE0: 1.36,
    electronsTransferred: 2,
    halfReactionVI: 'Cl₂ + 2e⁻ ⇌ 2Cl⁻'
  },
  Cr2O7_Cr3: {
    id: 'Cr2O7_Cr3',
    oxidizedForm: 'Cr₂O₇²⁻ (H⁺)',
    reducedForm: 'Cr³⁺',
    standardPotentialE0: 1.33,
    electronsTransferred: 6,
    halfReactionVI: 'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ ⇌ 2Cr³⁺ + 7H₂O'
  },
  O2_H2O: {
    id: 'O2_H2O',
    oxidizedForm: 'O₂ (H⁺)',
    reducedForm: 'H₂O',
    standardPotentialE0: 1.23,
    electronsTransferred: 4,
    halfReactionVI: 'O₂ + 4H⁺ + 4e⁻ ⇌ 2H₂O'
  },
  Br2_Br: {
    id: 'Br2_Br',
    oxidizedForm: 'Br₂',
    reducedForm: 'Br⁻',
    standardPotentialE0: 1.07,
    electronsTransferred: 2,
    halfReactionVI: 'Br₂ + 2e⁻ ⇌ 2Br⁻'
  },
  Ag_Ag0: {
    id: 'Ag_Ag0',
    oxidizedForm: 'Ag⁺',
    reducedForm: 'Ag',
    standardPotentialE0: 0.80,
    electronsTransferred: 1,
    halfReactionVI: 'Ag⁺ + 1e⁻ ⇌ Ag'
  },
  Fe3_Fe2: {
    id: 'Fe3_Fe2',
    oxidizedForm: 'Fe³⁺',
    reducedForm: 'Fe²⁺',
    standardPotentialE0: 0.77,
    electronsTransferred: 1,
    halfReactionVI: 'Fe³⁺ + 1e⁻ ⇌ Fe²⁺'
  },
  I2_I: {
    id: 'I2_I',
    oxidizedForm: 'I₂',
    reducedForm: 'I⁻',
    standardPotentialE0: 0.54,
    electronsTransferred: 2,
    halfReactionVI: 'I₂ + 2e⁻ ⇌ 2I⁻'
  },
  O2_OH: {
    id: 'O2_OH',
    oxidizedForm: 'O₂ (H₂O)',
    reducedForm: 'OH⁻',
    standardPotentialE0: 0.40,
    electronsTransferred: 4,
    halfReactionVI: 'O₂ + 2H₂O + 4e⁻ ⇌ 4OH⁻'
  },
  Cu2_Cu: {
    id: 'Cu2_Cu',
    oxidizedForm: 'Cu²⁺',
    reducedForm: 'Cu',
    standardPotentialE0: 0.34,
    electronsTransferred: 2,
    halfReactionVI: 'Cu²⁺ + 2e⁻ ⇌ Cu'
  },
  H_H2: {
    id: 'H_H2',
    oxidizedForm: 'H⁺',
    reducedForm: 'H₂',
    standardPotentialE0: 0.00,
    electronsTransferred: 2,
    halfReactionVI: '2H⁺ + 2e⁻ ⇌ H₂ (Điện cực Chuẩn Hydro SHE)'
  },
  Pb2_Pb: {
    id: 'Pb2_Pb',
    oxidizedForm: 'Pb²⁺',
    reducedForm: 'Pb',
    standardPotentialE0: -0.13,
    electronsTransferred: 2,
    halfReactionVI: 'Pb²⁺ + 2e⁻ ⇌ Pb'
  },
  Sn2_Sn: {
    id: 'Sn2_Sn',
    oxidizedForm: 'Sn²⁺',
    reducedForm: 'Sn',
    standardPotentialE0: -0.14,
    electronsTransferred: 2,
    halfReactionVI: 'Sn²⁺ + 2e⁻ ⇌ Sn'
  },
  Ni2_Ni: {
    id: 'Ni2_Ni',
    oxidizedForm: 'Ni²⁺',
    reducedForm: 'Ni',
    standardPotentialE0: -0.26,
    electronsTransferred: 2,
    halfReactionVI: 'Ni²⁺ + 2e⁻ ⇌ Ni'
  },
  Fe2_Fe: {
    id: 'Fe2_Fe',
    oxidizedForm: 'Fe²⁺',
    reducedForm: 'Fe',
    standardPotentialE0: -0.44,
    electronsTransferred: 2,
    halfReactionVI: 'Fe²⁺ + 2e⁻ ⇌ Fe'
  },
  Cr3_Cr: {
    id: 'Cr3_Cr',
    oxidizedForm: 'Cr³⁺',
    reducedForm: 'Cr',
    standardPotentialE0: -0.74,
    electronsTransferred: 3,
    halfReactionVI: 'Cr³⁺ + 3e⁻ ⇌ Cr'
  },
  Zn2_Zn: {
    id: 'Zn2_Zn',
    oxidizedForm: 'Zn²⁺',
    reducedForm: 'Zn',
    standardPotentialE0: -0.76,
    electronsTransferred: 2,
    halfReactionVI: 'Zn²⁺ + 2e⁻ ⇌ Zn'
  },
  H2O_H2_OH: {
    id: 'H2O_H2_OH',
    oxidizedForm: 'H₂O',
    reducedForm: 'H₂ + OH⁻',
    standardPotentialE0: -0.83,
    electronsTransferred: 2,
    halfReactionVI: '2H₂O + 2e⁻ ⇌ H₂ + 2OH⁻ (Môi trường kiềm pH 14)'
  },
  Al3_Al: {
    id: 'Al3_Al',
    oxidizedForm: 'Al³⁺',
    reducedForm: 'Al',
    standardPotentialE0: -1.66,
    electronsTransferred: 3,
    halfReactionVI: 'Al³⁺ + 3e⁻ ⇌ Al'
  },
  Mg2_Mg: {
    id: 'Mg2_Mg',
    oxidizedForm: 'Mg²⁺',
    reducedForm: 'Mg',
    standardPotentialE0: -2.37,
    electronsTransferred: 2,
    halfReactionVI: 'Mg²⁺ + 2e⁻ ⇌ Mg'
  },
  Na_Na0: {
    id: 'Na_Na0',
    oxidizedForm: 'Na⁺',
    reducedForm: 'Na',
    standardPotentialE0: -2.71,
    electronsTransferred: 1,
    halfReactionVI: 'Na⁺ + 1e⁻ ⇌ Na'
  },
  Ca2_Ca: {
    id: 'Ca2_Ca',
    oxidizedForm: 'Ca²⁺',
    reducedForm: 'Ca',
    standardPotentialE0: -2.87,
    electronsTransferred: 2,
    halfReactionVI: 'Ca²⁺ + 2e⁻ ⇌ Ca'
  },
  Ba2_Ba: {
    id: 'Ba2_Ba',
    oxidizedForm: 'Ba²⁺',
    reducedForm: 'Ba',
    standardPotentialE0: -2.91,
    electronsTransferred: 2,
    halfReactionVI: 'Ba²⁺ + 2e⁻ ⇌ Ba'
  },
  K_K0: {
    id: 'K_K0',
    oxidizedForm: 'K⁺',
    reducedForm: 'K',
    standardPotentialE0: -2.93,
    electronsTransferred: 1,
    halfReactionVI: 'K⁺ + 1e⁻ ⇌ K'
  },
  Li_Li0: {
    id: 'Li_Li0',
    oxidizedForm: 'Li⁺',
    reducedForm: 'Li',
    standardPotentialE0: -3.04,
    electronsTransferred: 1,
    halfReactionVI: 'Li⁺ + 1e⁻ ⇌ Li'
  }
};

// 2. Galvanic Cell Simulation Engine
export interface GalvanicCellResult {
  cathode: {
    couple: RedoxCouple;
    electrodeSign: '+ (Dương)';
    processType: 'REDUCTION (Sự Khử)';
    halfReaction: string;
    concentrationM: number;
  };
  anode: {
    couple: RedoxCouple;
    electrodeSign: '- (Âm)';
    processType: 'OXIDATION (Sự Oxi Hóa)';
    halfReaction: string;
    concentrationM: number;
  };
  standardCellPotentialE0: number; // E°_cell = E°_cathode - E°_anode (V)
  nonStandardCellPotentialE: number; // Nernst equation E_cell
  gibbsFreeEnergyDeltaG0Kj: number; // ΔG° = -n F E° (kJ/mol)
  equilibriumConstantK: number; // K = 10^(nE° / 0.0592)
  electronsTransferred: number; // n
  temperatureKelvin: number; // T (K)
  reactionQuotientQ: number; // Q
  isSpontaneous: boolean;
  electronFlowVI: string;
  saltBridgeIonsMigrationVI: string;
  stepByStepExplanationVI: string[];
}

export interface GalvanicCellPreset {
  id: string;
  nameVi: string;
  nameEn: string;
  descriptionVi: string;
  anodeCoupleId: string;
  cathodeCoupleId: string;
  anodeMetalNameVi: string;
  cathodeMetalNameVi: string;
  anodeSolutionFormula: string;
  cathodeSolutionFormula: string;
  standardPotentialE0: number; // in Volts
  electronsTransferred: number;
  anodeColor: string; // Hex for electrode strip
  cathodeColor: string; // Hex for electrode strip
  anodeSolutionColor: string; // Hex for electrolyte fluid
  cathodeSolutionColor: string; // Hex for electrolyte fluid
}

export const GALVANIC_CELL_PRESETS: GalvanicCellPreset[] = [
  {
    id: 'daniell_zn_cu',
    nameVi: 'Pin Daniell (Zn - Cu)',
    nameEn: 'Daniell Cell (Zn - Cu)',
    descriptionVi: 'Pin điện hóa kinh điển GDPT 2018 Lớp 12: Điện cực Zn nhúng trong dung dịch ZnSO₄ và Cu nhúng trong dung dịch CuSO₄, nối bằng cầu muối KNO₃.',
    anodeCoupleId: 'Zn2_Zn',
    cathodeCoupleId: 'Cu2_Cu',
    anodeMetalNameVi: 'Kẽm (Zn)',
    cathodeMetalNameVi: 'Đồng (Cu)',
    anodeSolutionFormula: 'ZnSO₄ (aq)',
    cathodeSolutionFormula: 'CuSO₄ (aq)',
    standardPotentialE0: 1.10,
    electronsTransferred: 2,
    anodeColor: '#94A3B8', // Silver-grey zinc
    cathodeColor: '#E07A5F', // Rose-orange copper
    anodeSolutionColor: 'rgba(148, 163, 184, 0.25)', // Clear pale zinc sulfate
    cathodeSolutionColor: 'rgba(14, 165, 233, 0.45)' // Vivid cyan blue copper sulfate
  },
  {
    id: 'mg_cu',
    nameVi: 'Pin Magie - Đồng (Mg - Cu)',
    nameEn: 'Magnesium - Copper Cell (Mg - Cu)',
    descriptionVi: 'Pin điện hóa điện thế cao (2.71 V): Magie có tính khử rất mạnh ở cực âm và Đồng ở cực dương.',
    anodeCoupleId: 'Mg2_Mg',
    cathodeCoupleId: 'Cu2_Cu',
    anodeMetalNameVi: 'Magie (Mg)',
    cathodeMetalNameVi: 'Đồng (Cu)',
    anodeSolutionFormula: 'MgSO₄ (aq)',
    cathodeSolutionFormula: 'CuSO₄ (aq)',
    standardPotentialE0: 2.71,
    electronsTransferred: 2,
    anodeColor: '#CBD5E1', // Bright silvery magnesium
    cathodeColor: '#E07A5F', // Copper
    anodeSolutionColor: 'rgba(203, 213, 225, 0.20)', // Clear
    cathodeSolutionColor: 'rgba(14, 165, 233, 0.45)' // Cyan blue
  },
  {
    id: 'fe_cu',
    nameVi: 'Pin Sắt - Đồng (Fe - Cu)',
    nameEn: 'Iron - Copper Cell (Fe - Cu)',
    descriptionVi: 'Mô phỏng cơ chế ăn mòn điện hóa học: Sắt bị oxi hóa ở Anot tạo ion Fe²⁺ bảo vệ Đồng.',
    anodeCoupleId: 'Fe2_Fe',
    cathodeCoupleId: 'Cu2_Cu',
    anodeMetalNameVi: 'Sắt (Fe)',
    cathodeMetalNameVi: 'Đồng (Cu)',
    anodeSolutionFormula: 'FeSO₄ (aq)',
    cathodeSolutionFormula: 'CuSO₄ (aq)',
    standardPotentialE0: 0.78,
    electronsTransferred: 2,
    anodeColor: '#64748B', // Slate iron
    cathodeColor: '#E07A5F', // Copper
    anodeSolutionColor: 'rgba(134, 239, 172, 0.25)', // Pale green Fe2+
    cathodeSolutionColor: 'rgba(14, 165, 233, 0.45)' // Cyan blue
  },
  {
    id: 'zn_ag',
    nameVi: 'Pin Kẽm - Bạc (Zn - Ag)',
    nameEn: 'Zinc - Silver Cell (Zn - Ag)',
    descriptionVi: 'Pin điện thế cao (1.56 V) với cực dương Bạc quý tộc và ion Ag⁺ được khử thành Bạc kim loại sáng bóng.',
    anodeCoupleId: 'Zn2_Zn',
    cathodeCoupleId: 'Ag_Ag0',
    anodeMetalNameVi: 'Kẽm (Zn)',
    cathodeMetalNameVi: 'Bạc (Ag)',
    anodeSolutionFormula: 'Zn(NO₃)₂ (aq)',
    cathodeSolutionFormula: 'AgNO₃ (aq)',
    standardPotentialE0: 1.56,
    electronsTransferred: 2,
    anodeColor: '#94A3B8', // Zinc
    cathodeColor: '#F8FAFC', // Silvery radiant silver
    anodeSolutionColor: 'rgba(148, 163, 184, 0.25)',
    cathodeSolutionColor: 'rgba(226, 232, 240, 0.30)' // Silvery clear
  },
  {
    id: 'al_cu',
    nameVi: 'Pin Nhôm - Đồng (Al - Cu)',
    nameEn: 'Aluminum - Copper Cell (Al - Cu)',
    descriptionVi: 'Pin đa electron (n = 6 e⁻ trao đổi): 2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu, suất điện động chuẩn 2.00 V.',
    anodeCoupleId: 'Al3_Al',
    cathodeCoupleId: 'Cu2_Cu',
    anodeMetalNameVi: 'Nhôm (Al)',
    cathodeMetalNameVi: 'Đồng (Cu)',
    anodeSolutionFormula: 'Al₂(SO₄)₃ (aq)',
    cathodeSolutionFormula: 'CuSO₄ (aq)',
    standardPotentialE0: 2.00,
    electronsTransferred: 6,
    anodeColor: '#E2E8F0', // Aluminum
    cathodeColor: '#E07A5F', // Copper
    anodeSolutionColor: 'rgba(226, 232, 240, 0.20)',
    cathodeSolutionColor: 'rgba(14, 165, 233, 0.45)'
  },
  {
    id: 'zn_pb',
    nameVi: 'Pin Kẽm - Chì (Zn - Pb)',
    nameEn: 'Zinc - Lead Cell (Zn - Pb)',
    descriptionVi: 'Pin điện hóa với suất điện động chuẩn 0.63 V, minh họa sự chênh lệch thế oxi hóa khử giữa kim loại hoạt động mạnh và trung bình.',
    anodeCoupleId: 'Zn2_Zn',
    cathodeCoupleId: 'Pb2_Pb',
    anodeMetalNameVi: 'Kẽm (Zn)',
    cathodeMetalNameVi: 'Chì (Pb)',
    anodeSolutionFormula: 'Zn(NO₃)₂ (aq)',
    cathodeSolutionFormula: 'Pb(NO₃)₂ (aq)',
    standardPotentialE0: 0.63,
    electronsTransferred: 2,
    anodeColor: '#94A3B8', // Zinc
    cathodeColor: '#475569', // Dark grey lead
    anodeSolutionColor: 'rgba(148, 163, 184, 0.25)',
    cathodeSolutionColor: 'rgba(100, 116, 139, 0.25)'
  }
];

export function getCoupleByElementSymbol(symbol: string): RedoxCouple | undefined {
  if (!symbol) return undefined;
  const s = symbol.trim();
  switch (s) {
    case 'Zn': return STANDARD_REDUCTION_POTENTIALS['Zn2_Zn'];
    case 'Cu': return STANDARD_REDUCTION_POTENTIALS['Cu2_Cu'];
    case 'Ag': return STANDARD_REDUCTION_POTENTIALS['Ag_Ag0'];
    case 'Fe': return STANDARD_REDUCTION_POTENTIALS['Fe2_Fe'];
    case 'Mg': return STANDARD_REDUCTION_POTENTIALS['Mg2_Mg'];
    case 'Al': return STANDARD_REDUCTION_POTENTIALS['Al3_Al'];
    case 'Pb': return STANDARD_REDUCTION_POTENTIALS['Pb2_Pb'];
    case 'Sn': return STANDARD_REDUCTION_POTENTIALS['Sn2_Sn'];
    case 'Ni': return STANDARD_REDUCTION_POTENTIALS['Ni2_Ni'];
    case 'Cr': return STANDARD_REDUCTION_POTENTIALS['Cr3_Cr'];
    case 'Na': return STANDARD_REDUCTION_POTENTIALS['Na_Na0'];
    case 'K': return STANDARD_REDUCTION_POTENTIALS['K_K0'];
    case 'Li': return STANDARD_REDUCTION_POTENTIALS['Li_Li0'];
    case 'Ca': return STANDARD_REDUCTION_POTENTIALS['Ca2_Ca'];
    case 'Ba': return STANDARD_REDUCTION_POTENTIALS['Ba2_Ba'];
    case 'H': return STANDARD_REDUCTION_POTENTIALS['H_H2'];
    default: return undefined;
  }
}

export function simulateGalvanicCell(params: {
  coupleAId: string;
  coupleBId: string;
  concentrationA?: number; // default 1.0 M
  concentrationB?: number; // default 1.0 M
  temperatureKelvin?: number; // default 298.15 K (25 °C)
}): GalvanicCellResult {
  const coupleA = STANDARD_REDUCTION_POTENTIALS[params.coupleAId];
  const coupleB = STANDARD_REDUCTION_POTENTIALS[params.coupleBId];

  if (!coupleA || !coupleB) {
    throw new Error(`Không tìm thấy cặp oxi hóa - khử: ${params.coupleAId} hoặc ${params.coupleBId}`);
  }

  if (coupleA.id === coupleB.id) {
    throw new Error('Hai điện cực trong pin điện hóa phải là hai cặp oxi hóa - khử khác nhau.');
  }

  const concA = params.concentrationA !== undefined ? params.concentrationA : 1.0;
  const concB = params.concentrationB !== undefined ? params.concentrationB : 1.0;
  const T = params.temperatureKelvin !== undefined ? params.temperatureKelvin : 298.15;

  if (concA <= 0 || concB <= 0) {
    throw new Error('Nồng độ ion trong các bán pin phải lớn hơn 0.');
  }

  if (T <= 0) {
    throw new Error('Nhiệt độ tuyệt đối (Kelvin) phải lớn hơn 0 K.');
  }

  // Cathode is the half-cell with higher standard potential (reduction occurs at cathode)
  let cathodeCouple: RedoxCouple;
  let anodeCouple: RedoxCouple;
  let cathodeConc: number;
  let anodeConc: number;

  if (coupleA.standardPotentialE0 >= coupleB.standardPotentialE0) {
    cathodeCouple = coupleA;
    anodeCouple = coupleB;
    cathodeConc = concA;
    anodeConc = concB;
  } else {
    cathodeCouple = coupleB;
    anodeCouple = coupleA;
    cathodeConc = concB;
    anodeConc = concA;
  }

  // E°_cell = E°_cathode - E°_anode
  const E0_cell = Math.round((cathodeCouple.standardPotentialE0 - anodeCouple.standardPotentialE0) * 1000) / 1000;

  // Least common multiple for electrons transferred n
  const nA = cathodeCouple.electronsTransferred;
  const nB = anodeCouple.electronsTransferred;
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const n = (nA * nB) / gcd(nA, nB);

  // ΔG° = -n * F * E° (J/mol) -> convert to kJ/mol
  // F = 96485 C/mol
  const F = 96485;
  const deltaG0_kJ = Math.round(((-n * F * E0_cell) / 1000) * 10) / 10;

  // Nernst thermal factor: (2.302585 * R * T) / F
  // R = 8.314462 J/(mol*K)
  const R = 8.314462;
  const nernstFactor = (2.302585093 * R * T) / F; // ~0.05916 V at 298.15 K

  // K = 10^(n * E0 / nernstFactor)
  const logK = (n * E0_cell) / nernstFactor;
  const K = Math.pow(10, Math.min(300, logK));

  // Nernst Equation: E = E° - (nernstFactor / n) * log10(Q)
  // Simplified Q = [Anode ion]^coeff_anode / [Cathode ion]^coeff_cathode
  const coeffAnode = n / nB;
  const coeffCathode = n / nA;
  const Q = Math.pow(anodeConc, coeffAnode) / Math.pow(cathodeConc, coeffCathode);
  const nernstCorrection = (nernstFactor / n) * Math.log10(Q);
  const E_nonStandard = Math.round((E0_cell - nernstCorrection) * 1000) / 1000;

  const tempCelsius = Math.round((T - 273.15) * 10) / 10;
  const stepsVI: string[] = [
    `Bước 1: So sánh thế điện cực chuẩn: E°(${cathodeCouple.oxidizedForm}/${cathodeCouple.reducedForm}) = ${cathodeCouple.standardPotentialE0} V > E°(${anodeCouple.oxidizedForm}/${anodeCouple.reducedForm}) = ${anodeCouple.standardPotentialE0} V.`,
    `Bước 2: Xác định các điện cực:`,
    `  • Cực Dương (+) - Catot: Xảy ra quá trình khử: ${cathodeCouple.halfReactionVI}`,
    `  • Cực Âm (-) - Anot: Xảy ra quá trình oxi hóa: ${anodeCouple.reducedForm} → ${anodeCouple.oxidizedForm} + ${anodeCouple.electronsTransferred}e⁻`,
    `Bước 3: Sức điện động chuẩn của pin: E°_pin = E°_catot - E°_anot = ${cathodeCouple.standardPotentialE0} - (${anodeCouple.standardPotentialE0}) = ${E0_cell} V.`,
    `Bước 4: Năng lượng tự do Gibbs: ΔG° = -n·F·E°_pin = -(${n}) × 96485 × ${E0_cell} = ${deltaG0_kJ} kJ/mol (${deltaG0_kJ < 0 ? 'Phản ứng tự diễn biến' : 'Không tự diễn biến'}).`,
    `Bước 5: Áp dụng phương trình Nernst ở ${tempCelsius}°C (${T} K): E_pin = ${E0_cell} - (${Math.round(nernstFactor * 10000) / 10000}/${n})·log₁₀(${Math.round(Q * 1000) / 1000}) = ${E_nonStandard} V.`
  ];

  return {
    cathode: {
      couple: cathodeCouple,
      electrodeSign: '+ (Dương)',
      processType: 'REDUCTION (Sự Khử)',
      halfReaction: cathodeCouple.halfReactionVI,
      concentrationM: cathodeConc
    },
    anode: {
      couple: anodeCouple,
      electrodeSign: '- (Âm)',
      processType: 'OXIDATION (Sự Oxi Hóa)',
      halfReaction: `${anodeCouple.reducedForm} → ${anodeCouple.oxidizedForm} + ${anodeCouple.electronsTransferred}e⁻`,
      concentrationM: anodeConc
    },
    standardCellPotentialE0: E0_cell,
    nonStandardCellPotentialE: E_nonStandard,
    gibbsFreeEnergyDeltaG0Kj: deltaG0_kJ,
    equilibriumConstantK: K,
    electronsTransferred: n,
    temperatureKelvin: T,
    reactionQuotientQ: Q,
    isSpontaneous: E0_cell > 0,
    electronFlowVI: `Dòng electron chuyển dời từ cực Anot (-) [${anodeCouple.reducedForm}] sang cực Catot (+) [${cathodeCouple.reducedForm}] qua dây dẫn mạch ngoài.`,
    saltBridgeIonsMigrationVI: `Cầu muối (KNO₃ / KCl): Cation (K⁺) di chuyển về phía bán pin Catot (+); Anion (NO₃⁻ / Cl⁻) di chuyển về phía bán pin Anot (-) để trung hòa điện tích.`,
    stepByStepExplanationVI: stepsVI
  };
}

// 3. Faraday Electrolysis Calculation Engine
export interface ElectrolysisCalculationResult {
  electrolyteFormula: string;
  currentAmperes: number;
  timeSeconds: number;
  totalChargeCoulombs: number;
  electronsTransferredMoles: number;
  cathodeProduct: {
    substance: string;
    halfReactionVI: string;
    massGrams?: number;
    volumeLiters?: number;
  };
  anodeProduct: {
    substance: string;
    halfReactionVI: string;
    massGrams?: number;
    volumeLiters?: number;
  };
  overallEquationVI: string;
  solutionPhTrend: 'INCREASES (Kiềm hóa)' | 'DECREASES (Axit hóa)' | 'CONSTANT (Không đổi)';
  stepByStepExplanationVI: string[];
}

export type ElectrolysisScenario = 
  | 'CUSO4_AQUEOUS'      // 2CuSO4 + 2H2O -> 2Cu + O2 + 2H2SO4
  | 'NACL_AQUEOUS_DIAPHRAGM' // 2NaCl + 2H2O -> 2NaOH + H2 + Cl2 (có màng ngăn)
  | 'NACL_AQUEOUS_NO_DIAPHRAGM' // NaCl + H2O -> NaClO + H2 (nước Javel)
  | 'NACL_MOLTEN'        // 2NaCl -> 2Na + Cl2 (đpnc)
  | 'AL2O3_MOLTEN_CRYOLITE' // 2Al2O3 -> 4Al + 3O2 (Hall-Heroult)
  | 'AGNO3_AQUEOUS';     // 4AgNO3 + 2H2O -> 4Ag + O2 + 4HNO3

export function calculateElectrolysis(params: {
  scenario: ElectrolysisScenario;
  currentAmperes: number;
  timeSeconds: number;
}): ElectrolysisCalculationResult {
  const { scenario, currentAmperes: I, timeSeconds: t } = params;

  if (I <= 0 || t <= 0) {
    throw new Error('Cường độ dòng điện (I) và thời gian điện phân (t) phải lớn hơn 0.');
  }

  const F = 96485; // Faraday constant C/mol
  const Q = I * t; // Total charge in Coulombs
  const n_e = Q / F; // Moles of electrons transferred
  const gasMolarVolume = 24.79; // GDPT 2018 at 25°C, 1 bar

  let electrolyteFormula = '';
  let cathodeSubstance = '';
  let cathodeHalfReaction = '';
  let cathodeMass: number | undefined;
  let cathodeVol: number | undefined;

  let anodeSubstance = '';
  let anodeHalfReaction = '';
  let anodeMass: number | undefined;
  let anodeVol: number | undefined;

  let overallEq = '';
  let phTrend: ElectrolysisCalculationResult['solutionPhTrend'] = 'CONSTANT (Không đổi)';

  switch (scenario) {
    case 'CUSO4_AQUEOUS': {
      electrolyteFormula = 'CuSO₄ (dung dịch)';
      // Cathode: Cu2+ + 2e -> Cu (M=63.55 g/mol, n=2)
      cathodeSubstance = 'Đồng kim loại (Cu bám vào catot)';
      cathodeHalfReaction = 'Cu²⁺ + 2e⁻ → Cu↓';
      const molesCu = n_e / 2;
      cathodeMass = Math.round(molesCu * 63.546 * 1000) / 1000;

      // Anode: 2H2O -> O2 + 4H+ + 4e (M=32 g/mol, n=4)
      anodeSubstance = 'Khí Oxi (O₂ thoát ra ở anot)';
      anodeHalfReaction = '2H₂O → O₂↑ + 4H⁺ + 4e⁻';
      const molesO2 = n_e / 4;
      anodeVol = Math.round(molesO2 * gasMolarVolume * 1000) / 1000;
      anodeMass = Math.round(molesO2 * 32.0 * 1000) / 1000;

      overallEq = '2CuSO₄ + 2H₂O xrightarrow{đpdd} 2Cu↓ + O₂↑ + 2H₂SO₄';
      phTrend = 'DECREASES (Axit hóa)';
      break;
    }
    case 'NACL_AQUEOUS_DIAPHRAGM': {
      electrolyteFormula = 'NaCl (dung dịch có màng ngăn xốp)';
      // Cathode: 2H2O + 2e -> H2 + 2OH- (n=2)
      cathodeSubstance = 'Khí Hiđro (H₂ thoát ra ở catot) & NaOH';
      cathodeHalfReaction = '2H₂O + 2e⁻ → H₂↑ + 2OH⁻';
      const molesH2 = n_e / 2;
      cathodeVol = Math.round(molesH2 * gasMolarVolume * 1000) / 1000;
      cathodeMass = Math.round(molesH2 * 2.016 * 1000) / 1000;

      // Anode: 2Cl- -> Cl2 + 2e (n=2)
      anodeSubstance = 'Khí Clo (Cl₂ thoát ra ở anot)';
      anodeHalfReaction = '2Cl⁻ → Cl₂↑ + 2e⁻';
      const molesCl2 = n_e / 2;
      anodeVol = Math.round(molesCl2 * gasMolarVolume * 1000) / 1000;
      anodeMass = Math.round(molesCl2 * 70.90 * 1000) / 1000;

      overallEq = '2NaCl + 2H₂O xrightarrow{đpdd, mnx} 2NaOH + H₂↑ + Cl₂↑';
      phTrend = 'INCREASES (Kiềm hóa)';
      break;
    }
    case 'NACL_MOLTEN': {
      electrolyteFormula = 'NaCl (nóng chảy 801°C)';
      // Cathode: Na+ + e -> Na (M=22.99 g/mol, n=1)
      cathodeSubstance = 'Natri kim loại lỏng (Na)';
      cathodeHalfReaction = 'Na⁺ + 1e⁻ → Na';
      const molesNa = n_e / 1;
      cathodeMass = Math.round(molesNa * 22.99 * 1000) / 1000;

      // Anode: 2Cl- -> Cl2 + 2e (n=2)
      anodeSubstance = 'Khí Clo (Cl₂)';
      anodeHalfReaction = '2Cl⁻ → Cl₂↑ + 2e⁻';
      const molesCl2 = n_e / 2;
      anodeVol = Math.round(molesCl2 * gasMolarVolume * 1000) / 1000;
      anodeMass = Math.round(molesCl2 * 70.90 * 1000) / 1000;

      overallEq = '2NaCl xrightarrow{đpnc} 2Na + Cl₂↑';
      phTrend = 'CONSTANT (Không đổi)';
      break;
    }
    case 'AL2O3_MOLTEN_CRYOLITE': {
      electrolyteFormula = 'Al₂O₃ trong Na₃AlF₆ (nóng chảy ~950°C)';
      // Cathode: Al3+ + 3e -> Al (M=26.98 g/mol, n=3)
      cathodeSubstance = 'Nhôm kim loại nóng chảy (Al)';
      cathodeHalfReaction = 'Al³⁺ + 3e⁻ → Al';
      const molesAl = n_e / 3;
      cathodeMass = Math.round(molesAl * 26.982 * 1000) / 1000;

      // Anode: 2O2- -> O2 + 4e (n=4)
      anodeSubstance = 'Khí Oxi (O₂ phản ứng ăn mòn anot than chì thành CO/CO₂)';
      anodeHalfReaction = '2O²⁻ → O₂↑ + 4e⁻';
      const molesO2 = n_e / 4;
      anodeVol = Math.round(molesO2 * gasMolarVolume * 1000) / 1000;
      anodeMass = Math.round(molesO2 * 32.0 * 1000) / 1000;

      overallEq = '2Al₂O₃ xrightarrow{đpnc, criolit} 4Al + 3O₂↑';
      phTrend = 'CONSTANT (Không đổi)';
      break;
    }
    case 'AGNO3_AQUEOUS': {
      electrolyteFormula = 'AgNO₃ (dung dịch)';
      // Cathode: Ag+ + e -> Ag (M=107.87 g/mol, n=1)
      cathodeSubstance = 'Bạc kim loại (Ag bám vào catot)';
      cathodeHalfReaction = 'Ag⁺ + 1e⁻ → Ag↓';
      const molesAg = n_e / 1;
      cathodeMass = Math.round(molesAg * 107.868 * 1000) / 1000;

      // Anode: 2H2O -> O2 + 4H+ + 4e
      anodeSubstance = 'Khí Oxi (O₂)';
      anodeHalfReaction = '2H₂O → O₂↑ + 4H⁺ + 4e⁻';
      const molesO2 = n_e / 4;
      anodeVol = Math.round(molesO2 * gasMolarVolume * 1000) / 1000;
      anodeMass = Math.round(molesO2 * 32.0 * 1000) / 1000;

      overallEq = '4AgNO₃ + 2H₂O xrightarrow{đpdd} 4Ag↓ + O₂↑ + 4HNO₃';
      phTrend = 'DECREASES (Axit hóa)';
      break;
    }
    default: {
      electrolyteFormula = 'NaCl (dung dịch không màng ngăn)';
      cathodeSubstance = 'Khí Hiđro (H₂)';
      cathodeHalfReaction = '2H₂O + 2e⁻ → H₂↑ + 2OH⁻';
      const molesH2 = n_e / 2;
      cathodeVol = Math.round(molesH2 * gasMolarVolume * 1000) / 1000;

      anodeSubstance = 'Khí Clo phản ứng với OH⁻ sinh nước Javel';
      anodeHalfReaction = '2Cl⁻ → Cl₂↑ + 2e⁻; sau đó Cl₂ + 2NaOH → NaCl + NaClO + H₂O';
      overallEq = 'NaCl + H₂O xrightarrow{đpdd, kmn} NaClO + H₂↑ (Nước Javel tẩy màu)';
      phTrend = 'INCREASES (Kiềm hóa)';
      break;
    }
  }

  const stepsVI = [
    `Bước 1: Tính điện lượng qua bình điện phân: Q = I × t = ${I} A × ${t} s = ${Q} C.`,
    `Bước 2: Tính số mol electron trao đổi theo định luật Faraday: n_e = Q / F = ${Q} / 96485 = ${Math.round(n_e * 10000) / 10000} mol e⁻.`,
    `Bước 3: Xác định bán phản ứng tại Catot (-) và Anot (+):`,
    `  • Catot: ${cathodeHalfReaction}`,
    `  • Anot: ${anodeHalfReaction}`,
    `Bước 4: Sản phẩm thu được:`,
    cathodeMass !== undefined ? `  • Tại Catot: Thu được ${cathodeMass} g chất rắn [${cathodeSubstance}].` : `  • Tại Catot: Thu được ${cathodeVol} L khí [${cathodeSubstance}].`,
    anodeVol !== undefined ? `  • Tại Anot: Thu được ${anodeVol} L khí [${anodeSubstance}].` : `  • Tại Anot: Thu được ${anodeMass} g chất [${anodeSubstance}].`,
    `Bước 5: Xu hướng pH dung dịch sau điện phân: ${phTrend}.`
  ];

  return {
    electrolyteFormula,
    currentAmperes: I,
    timeSeconds: t,
    totalChargeCoulombs: Q,
    electronsTransferredMoles: Math.round(n_e * 10000) / 10000,
    cathodeProduct: {
      substance: cathodeSubstance,
      halfReactionVI: cathodeHalfReaction,
      massGrams: cathodeMass,
      volumeLiters: cathodeVol
    },
    anodeProduct: {
      substance: anodeSubstance,
      halfReactionVI: anodeHalfReaction,
      massGrams: anodeMass,
      volumeLiters: anodeVol
    },
    overallEquationVI: overallEq,
    solutionPhTrend: phTrend,
    stepByStepExplanationVI: stepsVI
  };
}

// 4. Concentration Cell Simulation Engine (Pin Nồng Độ)
export interface ConcentrationCellResult {
  couple: RedoxCouple;
  anode: {
    concentrationM: number;
    electrodeSign: '- (Âm)';
    processType: 'OXIDATION (Sự Oxi Hóa - Tạo thêm ion)';
    halfReaction: string;
  };
  cathode: {
    concentrationM: number;
    electrodeSign: '+ (Dương)';
    processType: 'REDUCTION (Sự Khử - Giảm bớt ion)';
    halfReaction: string;
  };
  standardCellPotentialE0: number; // strictly 0.00 V
  cellPotentialE: number; // E = (0.0592 / n) * log10(C_conc / C_dilute)
  electronsTransferred: number; // n
  isSpontaneous: boolean;
  drivingForceVI: string;
  stepByStepExplanationVI: string[];
}

export function simulateConcentrationCell(params: {
  coupleId: string;
  concentrationDilute: number;
  concentrationConcentrated: number;
}): ConcentrationCellResult {
  const couple = STANDARD_REDUCTION_POTENTIALS[params.coupleId];
  if (!couple) {
    throw new Error(`Không tìm thấy cặp oxi hóa - khử: ${params.coupleId}`);
  }

  const cDilute = params.concentrationDilute;
  const cConc = params.concentrationConcentrated;

  if (cDilute <= 0 || cConc <= 0) {
    throw new Error('Nồng độ trong pin nồng độ phải lớn hơn 0.');
  }

  if (cDilute >= cConc) {
    throw new Error('Nồng độ dung dịch loãng (C_anot) phải nhỏ hơn nồng độ dung dịch đặc (C_catot) để pin hoạt động.');
  }

  const n = couple.electronsTransferred;
  const nernstFactor = 0.05916 / n;
  const logRatio = Math.log10(cConc / cDilute);
  const cellPotentialE = Math.round(nernstFactor * logRatio * 10000) / 10000;

  const anodeHalfReaction = `${couple.reducedForm} → ${couple.oxidizedForm} + ${n}e⁻ (C = ${cDilute} M)`;
  const cathodeHalfReaction = `${couple.oxidizedForm} + ${n}e⁻ → ${couple.reducedForm} (C = ${cConc} M)`;

  const stepsVI = [
    `Bước 1: Hai nửa pin cùng dùng cặp ${couple.oxidizedForm}/${couple.reducedForm} nên suất điện động chuẩn E°_cell = E° - E° = 0.00 V.`,
    `Bước 2: Phản ứng diễn ra theo chiều san bằng nồng độ:`,
    `  • Anot (-): Nơi có nồng độ thấp (${cDilute} M), kim loại tan ra để tăng nồng độ: ${anodeHalfReaction}`,
    `  • Catot (+): Nơi có nồng độ cao (${cConc} M), ion bị khử để giảm nồng độ: ${cathodeHalfReaction}`,
    `Bước 3: Áp dụng phương trình Nernst ở 25°C: E_pin = (0.0592 / n) × log(C_đặc / C_loãng) = (${Math.round((0.0592 / n) * 1000) / 1000}) × log(${cConc} / ${cDilute}) = ${cellPotentialE} V.`,
    `Bước 4: Pin hoạt động tự phát cho đến khi nồng độ hai bên bằng nhau (C_loãng = C_đặc), khi đó E_pin = 0 V.`
  ];

  return {
    couple,
    anode: {
      concentrationM: cDilute,
      electrodeSign: '- (Âm)',
      processType: 'OXIDATION (Sự Oxi Hóa - Tạo thêm ion)',
      halfReaction: anodeHalfReaction
    },
    cathode: {
      concentrationM: cConc,
      electrodeSign: '+ (Dương)',
      processType: 'REDUCTION (Sự Khử - Giảm bớt ion)',
      halfReaction: cathodeHalfReaction
    },
    standardCellPotentialE0: 0.00,
    cellPotentialE,
    electronsTransferred: n,
    isSpontaneous: true,
    drivingForceVI: 'Thế điện hóa chênh lệch do građien nồng độ (Entropi pha loãng tự phát)',
    stepByStepExplanationVI: stepsVI
  };
}
