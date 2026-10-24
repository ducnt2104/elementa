// src/domain/coordinationComplexEngine.ts
// Coordination Chemistry, Ligand Exchange & Crystal Field Color Engine for ELEMENTA
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 4: Phức chất) & IUPAC Standards

export type CoordinationGeometry = 'LINEAR' | 'TETRAHEDRAL' | 'SQUARE_PLANAR' | 'OCTAHEDRAL';

export interface LigandDef {
  formula: string;
  name_vi: string;
  name_iupac: string;
  charge: number;
  denticity: number; // 1 = monodentate, 2 = bidentate, 6 = hexadentate
  spectrochemicalRank: number; // 1 (weakest, I-) to 10 (strongest, CO / CN-)
  donorAtom: string;
  description_vi: string;
}

export interface CoordinationComplexDef {
  id: string;
  formula: string;
  name_vi: string;
  name_iupac: string;
  centralCationSymbol: string;
  centralCationName_vi: string;
  centralCationOxidationState: number; // e.g. 2 for Cu2+
  dElectronCount: number; // e.g. 9 for Cu(II) (Ar 3d9)
  coordinationNumber: 2 | 4 | 6;
  geometry: CoordinationGeometry;
  geometryName_vi: string;
  netCharge: number;
  innerSphereLigands: { ligandFormula: string; count: number }[];
  solutionColorHex: string;
  solutionColorName_vi: string;
  absorbedWavelength_nm: number; // Wavelength absorbed (lambda_max)
  complementaryColorName_vi: string;
  crystalFieldSplitting_kJ: number; // Delta_o / Delta_t in kJ/mol
  logStabilityConstantBeta: number; // log10(beta_n)
  precursorFormula: string;
  precursorColorHex: string;
  precursorColorName_vi: string;
  ligandExchangeEquationVI: string;
  curriculumStandard: 'GDPT_2018_HOA_12';
  pedagogicalRationaleVI: string;
  qualitativeAnalysisRoleVI: string;
  biologicalOrMedicalSignificanceVI: string;
  tacticalGameplayBonus: {
    nameVI: string;
    descriptionVI: string;
    shieldAmount: number;
    tenacityBoostPct: number;
    manaRefundPct: number;
    tacticalTag: 'COORDINATION_WARD' | 'LIGAND_BURST' | 'CHELATE_LOCK' | 'COLOR_REVEAL';
  };
}

export interface LigandExchangeSimulationInput {
  complexId: string;
  addedLigandConcentrationM: number; // 0.0 to 12.0 M (e.g. NH3 or Cl-)
  temperatureCelsius: number; // 10 to 80 °C
  excessLigand: boolean;
}

export interface LigandExchangeSimulationResult {
  complex: CoordinationComplexDef;
  formationFractionPct: number; // 0.0 to 100.0% conversion of aqua complex to coordination complex
  currentColorHex: string;
  dominantSpeciesFormula: string;
  observedColorNameVI: string;
  spectrochemicalFieldStrengthVI: 'YẾU (Weak field)' | 'TRUNG BÌNH (Medium field)' | 'MẠNH (Strong field)';
  crystalFieldSplitting_kJ: number;
  isPrecipitateDissolved: boolean; // e.g. Cu(OH)2 dissolves in excess NH3
  pedagogicalAnalysisVI: string;
  tacticalBonus: CoordinationComplexDef['tacticalGameplayBonus'];
}

/**
 * Standard Ligands in GDPT 2018 Curriculum
 */
export const CURRICULUM_LIGANDS: Record<string, LigandDef> = {
  H2O: {
    formula: 'H2O',
    name_vi: 'Aqua (Nước)',
    name_iupac: 'Aqua',
    charge: 0,
    denticity: 1,
    spectrochemicalRank: 4,
    donorAtom: 'O',
    description_vi: 'Phối tử aqua trung tính phổ biến trong dung dịch nước.'
  },
  NH3: {
    formula: 'NH3',
    name_vi: 'Ammine (Amoniac)',
    name_iupac: 'Ammine',
    charge: 0,
    denticity: 1,
    spectrochemicalRank: 7,
    donorAtom: 'N',
    description_vi: 'Phối tử ammine tạo phức xanh thẫm với Cu²⁺ và phức tráng gương với Ag⁺.'
  },
  Cl_MINUS: {
    formula: 'Cl-',
    name_vi: 'Clorua (Chlorido)',
    name_iupac: 'Chlorido',
    charge: -1,
    denticity: 1,
    spectrochemicalRank: 2,
    donorAtom: 'Cl',
    description_vi: 'Phối tử trường yếu, chuyển phức Co²⁺ từ hồng sang xanh chàm.'
  },
  SCN_MINUS: {
    formula: 'SCN-',
    name_vi: 'Thiocyanato',
    name_iupac: 'Thiocyanato',
    charge: -1,
    denticity: 1,
    spectrochemicalRank: 3,
    donorAtom: 'S/N',
    description_vi: 'Phối tử nhận biết ion Fe³⁺ cực nhạy tạo màu đỏ máu đặc trưng.'
  },
  CN_MINUS: {
    formula: 'CN-',
    name_vi: 'Xianua (Cyanido)',
    name_iupac: 'Cyanido',
    charge: -1,
    denticity: 1,
    spectrochemicalRank: 9,
    donorAtom: 'C',
    description_vi: 'Phối tử trường cực mạnh tạo phức bát diện bền vững với ion sắt.'
  },
  EN: {
    formula: 'en',
    name_vi: 'Ethylenediamine (1,2-diaminoethane)',
    name_iupac: 'Ethylenediamine',
    charge: 0,
    denticity: 2,
    spectrochemicalRank: 8,
    donorAtom: 'N',
    description_vi: 'Phối tử hai càng (chelate) tạo vòng 5 cạnh bền vững vượt trội.'
  },
  EDTA4_MINUS: {
    formula: 'EDTA4-',
    name_vi: 'Ethylenediaminetetraacetate',
    name_iupac: 'Ethylenediaminetetraacetate',
    charge: -4,
    denticity: 6,
    spectrochemicalRank: 7,
    donorAtom: 'N/O',
    description_vi: 'Phối tử sáu càng đa nha (hexadentate) ôm trọn cation kim loại trong chuẩn độ complexon.'
  }
};

/**
 * 6 Standard Curricular Coordination Complexes in GDPT 2018 (Grade 12 Chemistry)
 */
export const CURRICULUM_COORDINATION_COMPLEXES: CoordinationComplexDef[] = [
  {
    id: 'complex_cu_nh3',
    formula: '[Cu(NH3)4(H2O)2]2+',
    name_vi: 'Phức chất Tetraammine Đồng(II)',
    name_iupac: 'Tetraamminediaquacopper(II) ion',
    centralCationSymbol: 'Cu²⁺',
    centralCationName_vi: 'Đồng(II)',
    centralCationOxidationState: 2,
    dElectronCount: 9,
    coordinationNumber: 6,
    geometry: 'OCTAHEDRAL',
    geometryName_vi: 'Bát diện kéo dài (Jahn-Teller Distortion)',
    netCharge: 2,
    innerSphereLigands: [
      { ligandFormula: 'NH3', count: 4 },
      { ligandFormula: 'H2O', count: 2 }
    ],
    solutionColorHex: '#002fbe', // Royal deep blue
    solutionColorName_vi: 'Xanh lam thẫm (Da trời đậm)',
    absorbedWavelength_nm: 610, // Absorbs orange-red light
    complementaryColorName_vi: 'Đỏ cam (Orange-Red)',
    crystalFieldSplitting_kJ: 196.0,
    logStabilityConstantBeta: 13.3, // log10(beta_4) = 13.3
    precursorFormula: '[Cu(H2O)6]2+',
    precursorColorHex: '#7dd3fc', // Light sky blue
    precursorColorName_vi: 'Xanh lam nhạt',
    ligandExchangeEquationVI: '[Cu(H2O)6]²⁺ (xanh nhạt) + 4NH₃ ⇌ [Cu(NH3)4(H2O)2]²⁺ (xanh thẫm) + 4H₂O',
    curriculumStandard: 'GDPT_2018_HOA_12',
    pedagogicalRationaleVI:
      'Thí nghiệm kinh điển GDPT 2018 Lớp 12: Nhỏ từng giọt NH₃ vào dung dịch CuSO₄, ban đầu xuất hiện kết tủa xanh nhạt Cu(OH)₂, sau đó kết tủa tan hoàn toàn tạo dung dịch phức chất màu xanh thẫm đặc trưng do NH₃ thế các phân tử H₂O trong cầu nội phối trí.',
    qualitativeAnalysisRoleVI: 'Nhận biết đặc hiệu cation Cu²⁺ trong dung dịch phân tích hóa học.',
    biologicalOrMedicalSignificanceVI:
      'Thuốc thử Schweizer ([Cu(NH3)4](OH)2) có khả năng hòa tan xenlulozo để sản xuất tơ đồng-amoniac nhân tạo.',
    tacticalGameplayBonus: {
      nameVI: 'Lam Thẫm Đồng Phức (Royal Azure Ward)',
      descriptionVI: 'Tạo 450 Khiên Nước và phản hồi 20% sát thương ăn mòn về phía đối thủ.',
      shieldAmount: 450,
      tenacityBoostPct: 25,
      manaRefundPct: 20,
      tacticalTag: 'COORDINATION_WARD'
    }
  },
  {
    id: 'complex_fe_scn',
    formula: '[Fe(SCN)(H2O)5]2+',
    name_vi: 'Phức chất Thiocyanato Sắt(III)',
    name_iupac: 'Pentaaquathiocyanatoiron(III) ion',
    centralCationSymbol: 'Fe³⁺',
    centralCationName_vi: 'Sắt(III)',
    centralCationOxidationState: 3,
    dElectronCount: 5,
    coordinationNumber: 6,
    geometry: 'OCTAHEDRAL',
    geometryName_vi: 'Bát diện phối trí',
    netCharge: 2,
    innerSphereLigands: [
      { ligandFormula: 'SCN-', count: 1 },
      { ligandFormula: 'H2O', count: 5 }
    ],
    solutionColorHex: '#990000', // Deep blood red
    solutionColorName_vi: 'Đỏ máu (Blood Red)',
    absorbedWavelength_nm: 480, // Absorbs blue-green
    complementaryColorName_vi: 'Xanh lơ (Blue-Green)',
    crystalFieldSplitting_kJ: 172.0,
    logStabilityConstantBeta: 3.1,
    precursorFormula: '[Fe(H2O)6]3+',
    precursorColorHex: '#fef08a', // Pale yellow-brown
    precursorColorName_vi: 'Vàng rơm / Nâu nhạt',
    ligandExchangeEquationVI: '[Fe(H2O)6]³⁺ (vàng nhạt) + SCN⁻ ⇌ [Fe(SCN)(H2O)5]²⁺ (đỏ máu) + H₂O',
    curriculumStandard: 'GDPT_2018_HOA_12',
    pedagogicalRationaleVI:
      'Phản ứng cực nhạy dùng để nhận biết dấu vết ion Fe³⁺. Sự xuất hiện của màu đỏ máu do chuyển dịch điện tích phối tử-kim loại (LMCT) khi phối tử SCN⁻ gắn vào tâm phối trí Fe³⁺.',
    qualitativeAnalysisRoleVI: 'Nhận diện ion Fe³⁺ ở nồng độ cực loãng (ppm), dùng trong trắc quang phân tích.',
    biologicalOrMedicalSignificanceVI:
      'Mô hình liên kết tương tự trung tâm hem trong hemoglobin và cytochrom vận chuyển oxy.',
    tacticalGameplayBonus: {
      nameVI: 'Huyết Sắc Phối Trí (Crimson Thiocyanate)',
      descriptionVI: 'Cường hóa 30% sát thương chí mạng cho đòn đánh nguyên tố Hỏa/Kim trong 2 lượt.',
      shieldAmount: 200,
      tenacityBoostPct: 15,
      manaRefundPct: 30,
      tacticalTag: 'COLOR_REVEAL'
    }
  },
  {
    id: 'complex_co_cl',
    formula: '[CoCl4]2-',
    name_vi: 'Phức chất Tetrachloridocobaltate(II)',
    name_iupac: 'Tetrachloridocobaltate(II) ion',
    centralCationSymbol: 'Co²⁺',
    centralCationName_vi: 'Cobalt(II)',
    centralCationOxidationState: 2,
    dElectronCount: 7,
    coordinationNumber: 4,
    geometry: 'TETRAHEDRAL',
    geometryName_vi: 'Tứ diện (Tetrahedral)',
    netCharge: -2,
    innerSphereLigands: [{ ligandFormula: 'Cl-', count: 4 }],
    solutionColorHex: '#1d4ed8', // Vibrant deep blue
    solutionColorName_vi: 'Xanh chàm (Deep Cobalt Blue)',
    absorbedWavelength_nm: 690, // Absorbs deep red
    complementaryColorName_vi: 'Đỏ (Red)',
    crystalFieldSplitting_kJ: 115.0, // Delta_t = 4/9 Delta_o
    logStabilityConstantBeta: 2.3,
    precursorFormula: '[Co(H2O)6]2+',
    precursorColorHex: '#f472b6', // Pink
    precursorColorName_vi: 'Hồng phấn (Pink)',
    ligandExchangeEquationVI: '[Co(H2O)6]²⁺ (hồng) + 4Cl⁻ ⇌ [CoCl4]²⁻ (xanh chàm) + 6H₂O (ΔH > 0)',
    curriculumStandard: 'GDPT_2018_HOA_12',
    pedagogicalRationaleVI:
      'Cân bằng nhiệt sắc kinh điển (Thermo-chromic equilibrium): Phản ứng chuyển hóa giữa phức bát diện [Co(H2O)6]²⁺ màu hồng và phức tứ diện [CoCl4]²⁻ màu xanh chàm. Phản ứng thu nhiệt (ΔH > 0), đun nóng dung dịch chuyển sang màu xanh, làm lạnh chuyển về màu hồng.',
    qualitativeAnalysisRoleVI: 'Chất chỉ thị độ ẩm trong chất hút ẩm silica gel (đổi màu hồng khi ngậm nước).',
    biologicalOrMedicalSignificanceVI:
      'Mực tàng hình hóa học thời xưa: Viết lên giấy bằng dung dịch CoCl2 (không thấy màu), khi hơ lửa nóng sẽ hiện chữ màu xanh chàm.',
    tacticalGameplayBonus: {
      nameVI: 'Nhiệt Sắc Đổi Pha (Cobalt Phase Shift)',
      descriptionVI: 'Chuyển hóa 200 điểm Sát thương nhận vào thành Năng lượng Mana dự trữ.',
      shieldAmount: 300,
      tenacityBoostPct: 35,
      manaRefundPct: 25,
      tacticalTag: 'LIGAND_BURST'
    }
  },
  {
    id: 'complex_ag_nh3',
    formula: '[Ag(NH3)2]+',
    name_vi: 'Phức chất Diamminesilver(I) (Thuốc thử Tollens)',
    name_iupac: 'Diamminesilver(I) ion',
    centralCationSymbol: 'Ag⁺',
    centralCationName_vi: 'Bạc(I)',
    centralCationOxidationState: 1,
    dElectronCount: 10, // Full d10 closed shell
    coordinationNumber: 2,
    geometry: 'LINEAR',
    geometryName_vi: 'Đường thẳng (Linear 180°)',
    netCharge: 1,
    innerSphereLigands: [{ ligandFormula: 'NH3', count: 2 }],
    solutionColorHex: '#e2e8f0', // Colorless / Silver white
    solutionColorName_vi: 'Không màu / Ánh bạc trong suốt',
    absorbedWavelength_nm: 230, // UV region (no visible absorption)
    complementaryColorName_vi: 'Không màu (Truyền qua toàn bộ)',
    crystalFieldSplitting_kJ: 0.0, // d10 full subshell
    logStabilityConstantBeta: 7.2,
    precursorFormula: 'Ag+ / AgOH / Ag2O',
    precursorColorHex: '#78350f', // Dark brown Ag2O precipitate
    precursorColorName_vi: 'Nâu đen (Ag₂O kết tủa)',
    ligandExchangeEquationVI: 'Ag₂O(s) + 4NH₃ + H₂O ⇌ 2[Ag(NH3)2]⁺ + 2OH⁻',
    curriculumStandard: 'GDPT_2018_HOA_12',
    pedagogicalRationaleVI:
      'Thành phần chính của thuốc thử Tollens dùng trong phản ứng tráng bạc tráng gương aldehyde và glucose. Kết tủa nâu Ag₂O ban đầu tan hoàn toàn trong NH₃ dư tạo dung dịch phức ion tuyến tính trong suốt.',
    qualitativeAnalysisRoleVI: 'Phân biệt anđehit và xeton; nhận biết liên kết ba đầu mạch (ank-1-in).',
    biologicalOrMedicalSignificanceVI:
      'Sản xuất gương soi và ruột phích nước nóng truyền thống bằng phản ứng tráng gương hóa học.',
    tacticalGameplayBonus: {
      nameVI: 'Tấm Gương Bạc Tollens (Silver Mirror Reflection)',
      descriptionVI: 'Phản chiếu hoàn toàn 1 kỹ năng phép thuật kế tiếp của đối thủ.',
      shieldAmount: 500,
      tenacityBoostPct: 40,
      manaRefundPct: 15,
      tacticalTag: 'COORDINATION_WARD'
    }
  },
  {
    id: 'complex_ni_nh3',
    formula: '[Ni(NH3)6]2+',
    name_vi: 'Phức chất Hexaammine Niken(II)',
    name_iupac: 'Hexaamminenickel(II) ion',
    centralCationSymbol: 'Ni²⁺',
    centralCationName_vi: 'Niken(II)',
    centralCationOxidationState: 2,
    dElectronCount: 8,
    coordinationNumber: 6,
    geometry: 'OCTAHEDRAL',
    geometryName_vi: 'Bát diện đều (Octahedral)',
    netCharge: 2,
    innerSphereLigands: [{ ligandFormula: 'NH3', count: 6 }],
    solutionColorHex: '#7c3aed', // Rich violet-blue
    solutionColorName_vi: 'Tím hoa cà (Violet-Blue)',
    absorbedWavelength_nm: 575, // Absorbs yellow-green
    complementaryColorName_vi: 'Tím (Violet)',
    crystalFieldSplitting_kJ: 130.0,
    logStabilityConstantBeta: 8.6,
    precursorFormula: '[Ni(H2O)6]2+',
    precursorColorHex: '#10b981', // Emerald green
    precursorColorName_vi: 'Xanh lục ngọc bích',
    ligandExchangeEquationVI: '[Ni(H2O)6]²⁺ (xanh lục) + 6NH₃ ⇌ [Ni(NH3)6]²⁺ (tím) + 6H₂O',
    curriculumStandard: 'GDPT_2018_HOA_12',
    pedagogicalRationaleVI:
      'Minh họa sống động thuyết trường tinh thể: Phối tử NH₃ có trường mạnh hơn H₂O làm tăng độ tách mức năng lượng orbital d (Δo tăng), chuyển dịch dải hấp thụ quang phổ từ vùng đỏ (cho màu xanh lục) sang vùng vàng (cho màu tím).',
    qualitativeAnalysisRoleVI: 'Nhận biết cation Ni²⁺ và tách lọc tinh chế quặng niken.',
    biologicalOrMedicalSignificanceVI:
      'Kim loại vi lượng thiết yếu trong enzyme urease phân giải ure của sinh vật.',
    tacticalGameplayBonus: {
      nameVI: 'Tím Ngọc Bích Niken (Violet Chelate Ward)',
      descriptionVI: 'Giảm 25% sát thương nhận vào và tăng 20 Kháng Hiệu Ứng Khống Chế.',
      shieldAmount: 350,
      tenacityBoostPct: 30,
      manaRefundPct: 20,
      tacticalTag: 'CHELATE_LOCK'
    }
  },
  {
    id: 'complex_pt_cisplatin',
    formula: '[Pt(NH3)2Cl2]',
    name_vi: 'Phức chất Cisplatin (Cis-diamminedichloridoplatinum(II))',
    name_iupac: 'cis-diamminedichloridoplatinum(II)',
    centralCationSymbol: 'Pt²⁺',
    centralCationName_vi: 'Bạch kim(II)',
    centralCationOxidationState: 2,
    dElectronCount: 8, // d8 square planar
    coordinationNumber: 4,
    geometry: 'SQUARE_PLANAR',
    geometryName_vi: 'Vuông phẳng (Square Planar 90°)',
    netCharge: 0, // Neutral complex
    innerSphereLigands: [
      { ligandFormula: 'NH3', count: 2 },
      { ligandFormula: 'Cl-', count: 2 }
    ],
    solutionColorHex: '#eab308', // Pale yellow crystalline
    solutionColorName_vi: 'Vàng rơm / Tinh thể vàng nhạt',
    absorbedWavelength_nm: 300,
    complementaryColorName_vi: 'Vàng nhạt (Yellow)',
    crystalFieldSplitting_kJ: 220.0,
    logStabilityConstantBeta: 15.0,
    precursorFormula: '[PtCl4]2-',
    precursorColorHex: '#d97706',
    precursorColorName_vi: 'Đỏ cam tetrachlorido',
    ligandExchangeEquationVI: '[PtCl4]²⁻ + 2NH₃ ⇌ cis-[Pt(NH3)2Cl2] + 2Cl⁻',
    curriculumStandard: 'GDPT_2018_HOA_12',
    pedagogicalRationaleVI:
      'Ví dụ xuất sắc về đồng phân hình học trong phức vuông phẳng: Đồng phân cis-[Pt(NH3)2Cl2] có hai nhóm -Cl cạnh nhau (góc 90°), có hoạt tính hóa trị liệu ung thư, trong khi đồng phân trans- (góc 180°) hoàn toàn không có hoạt tính sinh học.',
    qualitativeAnalysisRoleVI: 'Thuốc hóa trị điều trị ung thư tinh hoàn, buồng trứng và bàng quang.',
    biologicalOrMedicalSignificanceVI:
      'Gắn vào chuỗi xoắn kép DNA tế bào ung thư tạo liên kết chéo nội sợi, ngăn cản sao chép và phiên mã DNA.',
    tacticalGameplayBonus: {
      nameVI: 'Khóa Chuỗi Cisplatin (Cisplatin Crosslink)',
      descriptionVI: 'Khóa vĩnh viễn 1 kỹ năng kích hoạt của mục tiêu đối phương trong 2 lượt.',
      shieldAmount: 250,
      tenacityBoostPct: 20,
      manaRefundPct: 35,
      tacticalTag: 'CHELATE_LOCK'
    }
  }
];

export class CoordinationComplexEngine {
  /**
   * Simulates Ligand Exchange Equilibrium
   * Equilibrium conversion depends on ligand concentration [L] and stability constant beta_n:
   * Fraction alpha = ([L]^n * beta) / (1 + [L]^n * beta)
   */
  public static simulateLigandExchange(
    input: LigandExchangeSimulationInput
  ): LigandExchangeSimulationResult {
    const complex =
      CURRICULUM_COORDINATION_COMPLEXES.find(c => c.id === input.complexId) ||
      CURRICULUM_COORDINATION_COMPLEXES[0];

    const concL = Math.max(0, input.addedLigandConcentrationM);
    const n = complex.innerSphereLigands.reduce((sum, lig) => {
      return lig.ligandFormula !== 'H2O' ? sum + lig.count : sum;
    }, 0) || 1;

    // Effective beta with temperature perturbation (exothermic exchange slightly shifts back at high T)
    const tempEffect = Math.exp(-0.015 * (input.temperatureCelsius - 25));
    const effectiveBeta = Math.pow(10, complex.logStabilityConstantBeta) * tempEffect;

    // Fractional conversion using Hill-Langmuir / mass action approximation
    let fraction = 0;
    if (concL > 0) {
      const term = Math.pow(concL, Math.min(4, n)) * (effectiveBeta > 1e12 ? 1e4 : effectiveBeta * 1e-2);
      fraction = term / (1 + term);
      if (input.excessLigand || concL >= 3.0) {
        fraction = Math.max(fraction, 0.96);
      }
    }
    const formationFractionPct = Math.min(100, Math.max(0, Math.round(fraction * 1000) / 10));

    // Interpolate solution color between precursor and fully formed complex
    const currentColorHex =
      formationFractionPct < 20
        ? complex.precursorColorHex
        : formationFractionPct > 80
        ? complex.solutionColorHex
        : input.complexId === 'complex_co_cl'
        ? '#9333ea' // Purple intermediate between pink and blue
        : input.complexId === 'complex_cu_nh3'
        ? '#0284c7' // Medium azure intermediate
        : complex.solutionColorHex;

    const observedColorNameVI =
      formationFractionPct < 20
        ? complex.precursorColorName_vi
        : formationFractionPct > 80
        ? complex.solutionColorName_vi
        : `Chuyển tiếp (${complex.precursorColorName_vi} → ${complex.solutionColorName_vi})`;

    const dominantSpeciesFormula =
      formationFractionPct > 60 ? complex.formula : complex.precursorFormula;

    const isPrecipitateDissolved =
      input.complexId === 'complex_cu_nh3'
        ? concL >= 0.5 // Excess NH3 dissolves Cu(OH)2
        : input.complexId === 'complex_ag_nh3'
        ? concL >= 0.2 // Excess NH3 dissolves Ag2O
        : true;

    // Spectrochemical series field strength
    let spectrochemicalFieldStrengthVI: LigandExchangeSimulationResult['spectrochemicalFieldStrengthVI'] =
      'TRUNG BÌNH (Medium field)';
    if (complex.crystalFieldSplitting_kJ >= 180) {
      spectrochemicalFieldStrengthVI = 'MẠNH (Strong field)';
    } else if (complex.crystalFieldSplitting_kJ <= 120) {
      spectrochemicalFieldStrengthVI = 'YẾU (Weak field)';
    }

    // Pedagogical explanation
    let pedagogicalAnalysisVI = '';
    if (formationFractionPct > 80) {
      pedagogicalAnalysisVI = `Hoàn tất chuyển hóa: Đã tạo phức bền ${complex.formula}. Phối tử trường mạnh thế chỗ hoàn toàn các phân tử H₂O, tạo dung dịch màu ${complex.solutionColorName_vi}.`;
    } else if (formationFractionPct < 20) {
      pedagogicalAnalysisVI = `Nồng độ phối tử quá thấp: Dạng chủ yếu vẫn là cation hydrat ${complex.precursorFormula} màu ${complex.precursorColorName_vi}.`;
    } else {
      pedagogicalAnalysisVI = `Trạng thái cân bằng cạnh tranh: Tồn tại đồng thời cation hydrat và phức chất phối tử từng nấc, dung dịch có màu pha trộn.`;
    }

    return {
      complex,
      formationFractionPct,
      currentColorHex,
      dominantSpeciesFormula,
      observedColorNameVI,
      spectrochemicalFieldStrengthVI,
      crystalFieldSplitting_kJ: complex.crystalFieldSplitting_kJ,
      isPrecipitateDissolved,
      pedagogicalAnalysisVI,
      tacticalBonus: complex.tacticalGameplayBonus
    };
  }
}
