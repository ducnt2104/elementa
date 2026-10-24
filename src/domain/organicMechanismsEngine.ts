// src/domain/organicMechanismsEngine.ts
// Comprehensive Organic Chemistry Stereoisomerism, Reaction Mechanisms & Diagnostic Tests Engine
// Aligned with Vietnam GDPT 2018 Chemistry 11-12 (Chương trình Hóa Học Hữu Cơ) & IUPAC Standards

export type StereoisomerType = 'CIS_TRANS' | 'E_Z' | 'CHIRAL_OPTICAL' | 'CONSTITUTIONAL';

export interface GeometricIsomerPair {
  id: string;
  compoundNameVI: string;
  molecularFormula: string;
  structuralFormulaCisOrZ: string;
  structuralFormulaTransOrE: string;
  leftSubstituents: [string, string]; // [R1, R2] on C1
  rightSubstituents: [string, string]; // [R3, R4] on C2
  cisOrZ: {
    nameIUPAC: string;
    label: 'cis' | 'Z';
    boilingPointC: number;
    meltingPointC: number;
    dipoleMomentDebye: number;
    isPolar: boolean;
    structuralDescriptionVI: string;
    distinctChemicalPropertyVI?: string;
  };
  transOrE: {
    nameIUPAC: string;
    label: 'trans' | 'E';
    boilingPointC: number;
    meltingPointC: number;
    dipoleMomentDebye: number;
    isPolar: boolean;
    structuralDescriptionVI: string;
    distinctChemicalPropertyVI?: string;
  };
  cipPriorityRationaleVI: string;
  curriculumGrade: 'HOA_11' | 'HOA_12';
}

export interface ChiralCenterDefinition {
  id: string;
  compoundNameVI: string;
  molecularFormula: string;
  chiralCarbonPosition: string; // e.g. "C2"
  substituents: [string, string, string, string]; // 4 distinct groups [a, b, c, d]
  enantiomerDOrR: {
    name: string;
    opticalRotation: string; // e.g. "(+) Dextrorotatory"
    biologicalActivityVI: string;
  };
  enantiomerLOrS: {
    name: string;
    opticalRotation: string; // e.g. "(-) Levorotatory"
    biologicalActivityVI: string;
  };
  pharmacologyOrBiologicalInsightVI: string;
  curriculumGrade: 'HOA_11' | 'HOA_12';
}

export interface MarkovnikovAdditionCase {
  id: string;
  alkeneNameVI: string;
  alkeneFormula: string;
  reagentNameVI: string;
  reagentFormula: string; // e.g. "HBr", "H2O/H+", "HCl"
  majorProduct: {
    nameIUPAC: string;
    formula: string;
    yieldPercent: number;
    mechanismDescriptionVI: string;
    carbocationIntermediateVI: string; // e.g. "Cacbocation bậc 2 bền hơn"
  };
  minorProduct: {
    nameIUPAC: string;
    formula: string;
    yieldPercent: number;
    mechanismDescriptionVI: string;
    carbocationIntermediateVI: string; // e.g. "Cacbocation bậc 1 kém bền"
  };
  ruleStatementVI: string;
  antiMarkovnikovConditionVI?: string; // e.g. "Có mặt peoxit (R-O-O-R) thì HBr cộng ngược lại"
}

export interface ZaitsevEliminationCase {
  id: string;
  precursorNameVI: string;
  precursorFormula: string;
  reactionType: 'DEHYDROHALOGENATION' | 'DEHYDRATION';
  conditionsVI: string; // e.g. "KOH / C2H5OH, đun nóng" or "H2SO4 đặc, 170°C"
  majorAlkene: {
    nameIUPAC: string;
    formula: string;
    yieldPercent: number;
    alkylSubstituentCount: number; // e.g. 2 alkyl groups on double bond
    stabilityReasonVI: string;
  };
  minorAlkene: {
    nameIUPAC: string;
    formula: string;
    yieldPercent: number;
    alkylSubstituentCount: number;
    stabilityReasonVI: string;
  };
  ruleStatementVI: string;
}

export interface DiagnosticOrganicTest {
  id: string;
  testNameVI: string;
  reagentVI: string;
  targetFunctionalGroupVI: string;
  positiveSubstances: {
    formula: string;
    nameVI: string;
    observationVI: string;
    reactionEquationVI: string;
    visualColor: string; // CSS color string
    precipitateOrSolution: 'PRECIPITATE' | 'SOLUTION_COLOR_CHANGE' | 'GAS_EFFERVESCENCE' | 'SILVER_MIRROR';
  }[];
  negativeSubstances: {
    formula: string;
    nameVI: string;
    reasonVI: string;
  }[];
  curriculumSignificanceVI: string;
}

/**
 * Benchmark 1: Geometric Isomer Pairs (Cis/Trans & E/Z) in Vietnam GDPT 2018
 */
export const CURRICULUM_GEOMETRIC_ISOMERS: GeometricIsomerPair[] = [
  {
    id: 'but_2_ene',
    compoundNameVI: 'But-2-en (Alkene C₄H₈)',
    molecularFormula: 'C4H8',
    structuralFormulaCisOrZ: '(Z)-CH3-CH=CH-CH3',
    structuralFormulaTransOrE: '(E)-CH3-CH=CH-CH3',
    leftSubstituents: ['-CH3', '-H'],
    rightSubstituents: ['-CH3', '-H'],
    cisOrZ: {
      nameIUPAC: 'cis-but-2-en (hoặc (Z)-but-2-en)',
      label: 'cis',
      boilingPointC: 3.7,
      meltingPointC: -138.9,
      dipoleMomentDebye: 0.33,
      isPolar: true,
      structuralDescriptionVI: 'Hai nhóm metyl (-CH₃) cùng nằm về một phía của mặt phẳng liên kết đôi C=C'
    },
    transOrE: {
      nameIUPAC: 'trans-but-2-en (hoặc (E)-but-2-en)',
      label: 'trans',
      boilingPointC: 0.9,
      meltingPointC: -105.5,
      dipoleMomentDebye: 0.0,
      isPolar: false,
      structuralDescriptionVI: 'Hai nhóm metyl (-CH₃) nằm ở hai phía đối lập của mặt phẳng liên kết đôi C=C, mômen lưỡng cực triệt tiêu hoàn toàn'
    },
    cipPriorityRationaleVI: 'Cacbon C1 đính -CH₃ (C có Z=6) ưu tiên hơn -H (Z=1). Cacbon C2 tương tự: hai nhóm ưu tiên lớn hơn nằm cùng phía là đồng phân (Z)/cis, khác phía là (E)/trans.',
    curriculumGrade: 'HOA_11'
  },
  {
    id: 'maleic_fumaric_acid',
    compoundNameVI: 'Axit Butendioic (Axit Maleic & Axit Fumaric)',
    molecularFormula: 'C4H4O4',
    structuralFormulaCisOrZ: 'cis-HOOC-CH=CH-COOH (Axit Maleic)',
    structuralFormulaTransOrE: 'trans-HOOC-CH=CH-COOH (Axit Fumaric)',
    leftSubstituents: ['-COOH', '-H'],
    rightSubstituents: ['-COOH', '-H'],
    cisOrZ: {
      nameIUPAC: 'Axit maleic (cis-butendioic acid)',
      label: 'cis',
      boilingPointC: 135.0,
      meltingPointC: 139.0,
      dipoleMomentDebye: 3.17,
      isPolar: true,
      structuralDescriptionVI: 'Hai nhóm -COOH ở cùng một phía, có liên kết hiđro nội phân tử',
      distinctChemicalPropertyVI: 'Dễ dàng tách nước khi đun nóng nhẹ ở 140°C tạo anhiđrit maleic vòng 5 cạnh do hai nhóm -COOH ở rất gần nhau!'
    },
    transOrE: {
      nameIUPAC: 'Axit fumaric (trans-butendioic acid)',
      label: 'trans',
      boilingPointC: 290.0,
      meltingPointC: 287.0,
      dipoleMomentDebye: 0.0,
      isPolar: false,
      structuralDescriptionVI: 'Hai nhóm -COOH ở hai phía đối diện, tạo mạng lưới liên kết hiđro liên phân tử rất bền làm nhiệt độ nóng chảy vọt lên 287°C',
      distinctChemicalPropertyVI: 'Không thể tách nước tạo anhiđrit vòng ở 140°C vì hai nhóm -COOH cách nhau quá xa; chỉ tách nước ở >300°C khi đồng phân hóa sang axit maleic.'
    },
    cipPriorityRationaleVI: 'Nhóm -COOH (C đính O, O, O) có độ ưu tiên cao hơn -H (Z=1). Khi hai nhóm -COOH cùng phía tạo Axit Maleic; khác phía tạo Axit Fumaric.',
    curriculumGrade: 'HOA_11'
  },
  {
    id: 'dichloroethene',
    compoundNameVI: '1,2-Đicloroeten (C₂H₂Cl₂)',
    molecularFormula: 'C2H2Cl2',
    structuralFormulaCisOrZ: 'cis-CHCl=CHCl',
    structuralFormulaTransOrE: 'trans-CHCl=CHCl',
    leftSubstituents: ['-Cl', '-H'],
    rightSubstituents: ['-Cl', '-H'],
    cisOrZ: {
      nameIUPAC: 'cis-1,2-đicloroeten (Z)',
      label: 'cis',
      boilingPointC: 60.3,
      meltingPointC: -80.5,
      dipoleMomentDebye: 1.9,
      isPolar: true,
      structuralDescriptionVI: 'Hai nguyên tử Cl có độ âm điện lớn cùng hướng về một phía, mômen lưỡng cực tổng hợp μ = 1.90 D'
    },
    transOrE: {
      nameIUPAC: 'trans-1,2-đicloroeten (E)',
      label: 'trans',
      boilingPointC: 47.5,
      meltingPointC: -50.0,
      dipoleMomentDebye: 0.0,
      isPolar: false,
      structuralDescriptionVI: 'Hai liên kết C-Cl đối xứng tâm qua liên kết đôi, hai vectơ mômen lưỡng cực triệt tiêu nhau hoàn toàn μ = 0 D'
    },
    cipPriorityRationaleVI: 'Clo có số hiệu nguyên tử Z=17 lớn hơn Hiđro Z=1, do đó nhóm -Cl có độ ưu tiên cao hơn -H ở cả 2 đầu C=C.',
    curriculumGrade: 'HOA_11'
  }
];

/**
 * Benchmark 2: Chiral Optical Isomers (C* carbon bất đối)
 */
export const CURRICULUM_CHIRAL_CENTERS: ChiralCenterDefinition[] = [
  {
    id: 'lactic_acid',
    compoundNameVI: 'Axit Lactic (Axit 2-hiđroxipropanoic)',
    molecularFormula: 'C3H6O3',
    chiralCarbonPosition: 'C2 (C*)',
    substituents: ['-H', '-OH', '-CH3', '-COOH'],
    enantiomerDOrR: {
      name: 'D-(-)-Axit lactic',
      opticalRotation: '(-) Quay trái',
      biologicalActivityVI: 'Được sinh ra bởi một số vi khuẩn lên men đặc biệt'
    },
    enantiomerLOrS: {
      name: 'L-(+)-Axit lactic',
      opticalRotation: '(+) Quay phải',
      biologicalActivityVI: 'Sản phẩm lên men tự nhiên trong sữa chua và tích tụ trong cơ bắp người khi vận động mạnh thiếu oxi'
    },
    pharmacologyOrBiologicalInsightVI: 'Cacbon C2 gắn với 4 nhóm thế hoàn toàn khác nhau (-H, -OH, -CH₃, -COOH) tạo thành tâm bất đối xứng quang học (Chirality).',
    curriculumGrade: 'HOA_11'
  },
  {
    id: 'alanine',
    compoundNameVI: 'Alanin (Axit 2-aminopropanoic - Amino Axit Chuẩn)',
    molecularFormula: 'C3H7NO2',
    chiralCarbonPosition: 'C2 (C*)',
    substituents: ['-H', '-NH2', '-CH3', '-COOH'],
    enantiomerDOrR: {
      name: 'D-Alanin',
      opticalRotation: '(R)',
      biologicalActivityVI: 'Có mặt trong thành tế bào vi khuẩn peptidoglycan'
    },
    enantiomerLOrS: {
      name: 'L-Alanin',
      opticalRotation: '(S)',
      biologicalActivityVI: 'Một trong 20 amino axit tiêu chuẩn tham gia cấu tạo nên protein của mọi sinh vật sống trên Trái Đất'
    },
    pharmacologyOrBiologicalInsightVI: 'Tất cả các α-amino axit trong cơ thể sinh vật sống (trừ Glyxin không có C*) đều có cấu hình L. Enzim sinh học có tính chọn lọc lập thể tuyệt đối.',
    curriculumGrade: 'HOA_12'
  },
  {
    id: 'thalidomide',
    compoundNameVI: 'Thalidomide (Bài Học Lập Thể Kinh Điển Trong Dược Phẩm)',
    molecularFormula: 'C13H10N2O4',
    chiralCarbonPosition: 'C3 trên vòng glutarimide',
    substituents: ['-H', '-C=O', '-CH2-', 'Phthalimide ring'],
    enantiomerDOrR: {
      name: '(R)-Thalidomide',
      opticalRotation: '(+) Dextro',
      biologicalActivityVI: 'Thuốc an thần, chống nôn nghén hiệu quả an toàn cho phụ nữ mang thai'
    },
    enantiomerLOrS: {
      name: '(S)-Thalidomide',
      opticalRotation: '(-) Levo',
      biologicalActivityVI: 'Chất gây quái thai kinh hoàng: ức chế hình thành mạch máu dẫn đến dị tật cụt chi ở hàng nghìn trẻ sơ sinh vào thập niên 1960'
    },
    pharmacologyOrBiologicalInsightVI: 'Minh chứng sống động nhất cho tầm quan trọng của đồng phân quang học trong hóa sinh và y dược: hai đồng phân đối quang có thể có tác dụng sinh học hoàn toàn trái ngược nhau!',
    curriculumGrade: 'HOA_12'
  }
];

/**
 * Benchmark 3: Markovnikov Addition Cases (Cộng Electrophile vào Anken Bất Đối Xứng)
 */
export const CURRICULUM_MARKOVNIKOV_CASES: MarkovnikovAdditionCase[] = [
  {
    id: 'propene_hbr',
    alkeneNameVI: 'Propen + Hiđro Bromua (HBr)',
    alkeneFormula: 'CH3-CH=CH2',
    reagentNameVI: 'Hiđro bromua khan',
    reagentFormula: 'HBr',
    majorProduct: {
      nameIUPAC: '2-bromopropan',
      formula: 'CH3-CH(Br)-CH3',
      yieldPercent: 92,
      mechanismDescriptionVI: 'H⁺ cộng vào C1 (nhiều H hơn) tạo cacbocation bậc 2 CH3-CH⁺-CH3 bền hơn, sau đó Br⁻ tấn công tạo sản phẩm chính 2-bromopropan.',
      carbocationIntermediateVI: 'Cacbocation isopropyl bậc 2 (CH₃-CH⁺-CH₃) bền hơn do có 2 nhóm metyl đẩy electron (+I và siêu liên hợp)'
    },
    minorProduct: {
      nameIUPAC: '1-bromopropan',
      formula: 'CH3-CH2-CH2-Br',
      yieldPercent: 8,
      mechanismDescriptionVI: 'H⁺ cộng vào C2 tạo cacbocation bậc 1 CH3-CH2-CH2⁺ kém bền hơn, tạo lượng nhỏ sản phẩm phụ.',
      carbocationIntermediateVI: 'Cacbocation propyl bậc 1 (CH₃-CH₂-CH₂⁺) kém bền'
    },
    ruleStatementVI: 'Quy tắc Maccopnhicop: Trong phản ứng cộng HX vào anken bất đối xứng, phần tử mang điện dương (H⁺) ưu tiên cộng vào cacbon liên kết đôi có nhiều H hơn, còn phần tử mang điện âm (X⁻) cộng vào cacbon có ít H hơn.',
    antiMarkovnikovConditionVI: 'Nếu có mặt chất khơi mào peoxit (R-O-O-R), phản ứng diễn ra theo cơ chế gốc tự do (Kharasch effect) đảo ngược hoàn toàn: 1-bromopropan trở thành sản phẩm chính!'
  },
  {
    id: 'methylpropene_water',
    alkeneNameVI: '2-Metylpropen + Nước (H₂O / H⁺ xúc tác)',
    alkeneFormula: '(CH3)2C=CH2',
    reagentNameVI: 'Nước có axit vô cơ H₂SO₄ loãng xúc tác',
    reagentFormula: 'H2O / H+',
    majorProduct: {
      nameIUPAC: '2-metylpropan-2-ol (Ancol tert-butylic)',
      formula: '(CH3)3C-OH',
      yieldPercent: 95,
      mechanismDescriptionVI: 'H⁺ cộng vào nhóm =CH2 sinh cacbocation bậc 3 (CH3)3C⁺ cực kỳ bền vững, H2O tấn công tạo ancol bậc 3.',
      carbocationIntermediateVI: 'Cacbocation tert-butyl bậc 3 ((CH₃)₃C⁺) có 3 nhóm metyl siêu liên hợp bền nhất'
    },
    minorProduct: {
      nameIUPAC: '2-metylpropan-1-ol (Ancol isobutylic)',
      formula: '(CH3)2CH-CH2-OH',
      yieldPercent: 5,
      mechanismDescriptionVI: 'Cacbocation bậc 1 kém bền tạo lượng không đáng kể ancol bậc 1.',
      carbocationIntermediateVI: 'Cacbocation isobutyl bậc 1 kém bền'
    },
    ruleStatementVI: 'Độ bền của cacbocation quyết định hướng phản ứng: Bậc 3 > Bậc 2 > Bậc 1 > Metyl.'
  }
];

/**
 * Benchmark 4: Zaitsev Elimination Cases (Quy Tắc Tách Zai-xép)
 */
export const CURRICULUM_ZAITSEV_CASES: ZaitsevEliminationCase[] = [
  {
    id: 'butan_2_ol_dehydration',
    precursorNameVI: 'Tách nước từ Butan-2-ol (Dehydration of Butan-2-ol)',
    precursorFormula: 'CH3-CH(OH)-CH2-CH3',
    reactionType: 'DEHYDRATION',
    conditionsVI: 'H₂SO₄ đặc làm xúc tác và hút nước, đun nóng ở 170°C',
    majorAlkene: {
      nameIUPAC: 'but-2-en (CH3-CH=CH-CH3)',
      formula: 'CH3-CH=CH-CH3',
      yieldPercent: 82,
      alkylSubstituentCount: 2,
      stabilityReasonVI: 'Liên kết đôi C=C có 2 nhóm metyl liên kết (anken nhị thế), bền vững hơn theo nhiệt động học'
    },
    minorAlkene: {
      nameIUPAC: 'but-1-en (CH2=CH-CH2-CH3)',
      formula: 'CH2=CH-CH2-CH3',
      yieldPercent: 18,
      alkylSubstituentCount: 1,
      stabilityReasonVI: 'Liên kết đôi C=C ở đầu mạch chỉ có 1 nhóm etyl liên kết (anken nhất thế), kém bền hơn'
    },
    ruleStatementVI: 'Quy tắc Zai-xép: Trong phản ứng tách HX hoặc H₂O, nguyên tử hiđro ưu tiên tách ra cùng nhóm OH (hoặc X) từ nguyên tử cacbon bên cạnh có bậc cao hơn (nghèo hiđro hơn) để tạo anken có nhiều nhóm thế hơn.'
  },
  {
    id: 'bromobutane_2_dehydrohalogenation',
    precursorNameVI: 'Tách HBr từ 2-bromobutan (Dehydrohalogenation)',
    precursorFormula: 'CH3-CH(Br)-CH2-CH3',
    reactionType: 'DEHYDROHALOGENATION',
    conditionsVI: 'Dung dịch KOH trong ancol (ethanol), đun nóng',
    majorAlkene: {
      nameIUPAC: 'but-2-en',
      formula: 'CH3-CH=CH-CH3',
      yieldPercent: 81,
      alkylSubstituentCount: 2,
      stabilityReasonVI: 'H tách từ C3 (bậc 2) ưu tiên hơn C1 (bậc 1) tạo but-2-en bền hơn'
    },
    minorAlkene: {
      nameIUPAC: 'but-1-en',
      formula: 'CH2=CH-CH2-CH3',
      yieldPercent: 19,
      alkylSubstituentCount: 1,
      stabilityReasonVI: 'H tách từ C1 sinh but-1-en sản phẩm phụ'
    },
    ruleStatementVI: 'Cacbon bậc cao hơn (ít H hơn) mất H dễ dàng hơn tạo anken có năng lượng tự do thấp hơn.'
  }
];

/**
 * Benchmark 5: Diagnostic Organic Chemical Tests (Thuốc Thử Đặc Trưng Hóa Hữu Cơ GDPT 2018)
 */
export const CURRICULUM_ORGANIC_TESTS: DiagnosticOrganicTest[] = [
  {
    id: 'tollens_silver_mirror',
    testNameVI: 'Thuốc Thử Tollens (Phản Ứng Tráng Bạc [Ag(NH₃)₂]OH)',
    reagentVI: 'Dung dịch AgNO₃ trong NH₃ dư (Phức điaminbạc(I) hiđroxit)',
    targetFunctionalGroupVI: 'Nhóm chức Anđehit (-CHO) hoặc liên kết ba đầu mạch (Alkyne-1)',
    positiveSubstances: [
      {
        formula: 'CH3CHO',
        nameVI: 'Axetanđehit (Acetaldehyde)',
        observationVI: 'Thành ống nghiệm phủ một lớp bạc kim loại sáng bóng như gương soi',
        reactionEquationVI: 'CH₃CHO + 2[Ag(NH₃)₂]OH ⎯⎯→ CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
        visualColor: '#cbd5e1', // Silvery mirror
        precipitateOrSolution: 'SILVER_MIRROR'
      },
      {
        formula: 'C6H12O6',
        nameVI: 'Glucozơ (Glucose)',
        observationVI: 'Tạo lớp gương bạc kim loại dày đặc khi đun nóng nhẹ',
        reactionEquationVI: 'CH₂OH(CHOH)₄CHO + 2[Ag(NH₃)₂]OH ⎯⎯→ CH₂OH(CHOH)₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
        visualColor: '#cbd5e1',
        precipitateOrSolution: 'SILVER_MIRROR'
      },
      {
        formula: 'HCHO',
        nameVI: 'Fomanđehit (Methanal)',
        observationVI: 'Một mol HCHO tráng bạc tạo tới 4 mol kim loại Bạc Ag!',
        reactionEquationVI: 'HCHO + 4[Ag(NH₃)₂]OH ⎯⎯→ (NH₄)₂CO₃ + 4Ag↓ + 6NH₃ + 2H₂O',
        visualColor: '#e2e8f0',
        precipitateOrSolution: 'SILVER_MIRROR'
      }
    ],
    negativeSubstances: [
      {
        formula: 'CH3COCH3',
        nameVI: 'Axeton (Ketone)',
        reasonVI: 'Xeton không có nhóm -CHO nên không bị oxi hóa bởi thuốc thử Tollens'
      },
      {
        formula: 'C2H5OH',
        nameVI: 'Etanol (Alcohol)',
        reasonVI: 'Ancol đơn chức không phản ứng với thuốc thử Tollens'
      }
    ],
    curriculumSignificanceVI: 'Phản ứng nền tảng nhận biết anđehit và cacbohiđrat có tính khử (glucozơ, fructozơ, mantozơ).'
  },
  {
    id: 'fresh_cuoh2_polyol_and_aldehyde',
    testNameVI: 'Thuốc Thử Cu(OH)₂ Tươi (Nhận Biết Polyol & Anđehit)',
    reagentVI: 'Kết tủa Cu(OH)₂ tươi điều chế tại chỗ từ CuSO₄ + NaOH dư',
    targetFunctionalGroupVI: 'Các nhóm -OH kề nhau (Polyol) hoặc nhóm Anđehit (-CHO)',
    positiveSubstances: [
      {
        formula: 'C3H5(OH)3',
        nameVI: 'Glixerol (Glycerol) ở nhiệt độ thường',
        observationVI: 'Kết tủa Cu(OH)₂ tan ra tạo dung dịch phức chất đồng-glixerol màu xanh lam thẫm (deep blue)',
        reactionEquationVI: '2C₃H₅(OH)₃ + Cu(OH)₂ → [C₃H₇O₃]₂Cu + 2H₂O  (Xanh lam thẫm)',
        visualColor: '#1d4ed8', // Deep royal blue
        precipitateOrSolution: 'SOLUTION_COLOR_CHANGE'
      },
      {
        formula: 'C6H12O6',
        nameVI: 'Glucozơ đun sôi với Cu(OH)₂ / NaOH',
        observationVI: 'Đun nóng xuất hiện kết tủa màu đỏ gạch của Đồng(I) oxit Cu₂O',
        reactionEquationVI: 'CH₂OH(CHOH)₄CHO + 2Cu(OH)₂ + NaOH ⎯⎯→ CH₂OH(CHOH)₄COONa + Cu₂O↓ (đỏ gạch) + 3H₂O',
        visualColor: '#dc2626', // Brick red
        precipitateOrSolution: 'PRECIPITATE'
      }
    ],
    negativeSubstances: [
      {
        formula: 'C2H5OH',
        nameVI: 'Etanol (Ancol đơn chức)',
        reasonVI: 'Chỉ có 1 nhóm -OH không thể tạo phức vòng càng chelate với Cu(OH)₂'
      },
      {
        formula: 'HO-CH2-CH2-CH2-OH',
        nameVI: 'Propan-1,3-điol',
        reasonVI: 'Hai nhóm -OH cách nhau qua 1 nguyên tử C (không kề nhau) nên không tạo phức xanh thẫm'
      }
    ],
    curriculumSignificanceVI: 'Phân biệt ancol đa chức có OH kề nhau với ancol đơn chức; phân biệt anđehit với xeton.'
  },
  {
    id: 'iodoform_reaction',
    testNameVI: 'Phản Ứng Iodoform (Thuốc Thử I₂ / NaOH)',
    reagentVI: 'Dung dịch Iốt (I₂) trong Natri hydroxit (NaOH)',
    targetFunctionalGroupVI: 'Nhóm Methyl Ketone (CH₃-CO-) hoặc Ancol chứa CH₃-CH(OH)-',
    positiveSubstances: [
      {
        formula: 'CH3COCH3',
        nameVI: 'Axeton (Propan-2-on)',
        observationVI: 'Xuất hiện kết tủa màu vàng tinh thể của Iodoform (CHI₃) có mùi sát trùng y tế đặc trưng',
        reactionEquationVI: 'CH₃COCH₃ + 3I₂ + 4NaOH → CHI₃↓ (vàng) + CH₃COONa + 3NaI + 3H₂O',
        visualColor: '#facc15', // Yellow
        precipitateOrSolution: 'PRECIPITATE'
      },
      {
        formula: 'C2H5OH',
        nameVI: 'Etanol (CH₃-CH₂-OH)',
        observationVI: 'Bị I₂/NaOH oxi hóa lên CH₃CHO rồi tạo kết tủa vàng CHI₃',
        reactionEquationVI: 'CH₃CH₂OH + 4I₂ + 6NaOH → CHI₃↓ (vàng) + HCOONa + 5NaI + 5H₂O',
        visualColor: '#facc15',
        precipitateOrSolution: 'PRECIPITATE'
      }
    ],
    negativeSubstances: [
      {
        formula: 'CH3OH',
        nameVI: 'Metanol',
        reasonVI: 'Không có nhóm CH₃-CH(OH)- nên không tạo được iodoform'
      },
      {
        formula: 'CH3CH2COCH2CH3',
        nameVI: 'Pentan-3-on',
        reasonVI: 'Nhóm C=O ở giữa mạch không có nhóm metyl kề cạnh (không phải methyl ketone)'
      }
    ],
    curriculumSignificanceVI: 'Nhận biết đặc hiệu etanol (ancol bậc 1 duy nhất phản ứng) và các metyl xeton.'
  },
  {
    id: 'biuret_protein_test',
    testNameVI: 'Phản Ứng Màu Biuret (Thuốc Thử CuSO₄ + NaOH)',
    reagentVI: 'Dung dịch CuSO₄ 1% trong môi trường NaOH 10%',
    targetFunctionalGroupVI: 'Hợp chất có từ 2 liên kết peptit trở lên (-CO-NH-)',
    positiveSubstances: [
      {
        formula: 'Albumin',
        nameVI: 'Protein lòng trắng trứng (Albumin)',
        observationVI: 'Dung dịch chuyển sang màu tím (hoặc tím đỏ) đặc trưng',
        reactionEquationVI: 'Protein + Cu²⁺ (trong NaOH) → Phức chất màu tím Biuret',
        visualColor: '#a855f7', // Violet purple
        precipitateOrSolution: 'SOLUTION_COLOR_CHANGE'
      },
      {
        formula: 'Tripeptide',
        nameVI: 'Tripeptit (Gly-Ala-Val)',
        observationVI: 'Tạo phức chelate với ion Cu²⁺ có màu tím biuret rõ nét',
        reactionEquationVI: 'Tripeptide (2 liên kết peptit) + Cu(OH)₂ / NaOH → Phức màu tím',
        visualColor: '#a855f7',
        precipitateOrSolution: 'SOLUTION_COLOR_CHANGE'
      }
    ],
    negativeSubstances: [
      {
        formula: 'Dipeptide (Gly-Ala)',
        nameVI: 'Đipeptit',
        reasonVI: 'Đipeptit chỉ có 1 liên kết peptit, không đủ số nguyên tử phối trí để tạo phức biuret màu tím'
      },
      {
        formula: 'Alanine',
        nameVI: 'Amino axit tự do',
        reasonVI: 'Không có liên kết peptit'
      }
    ],
    curriculumSignificanceVI: 'Quy tắc vàng phân biệt đipeptit với tripeptit trở lên và định tính protein trong sinh học và thực phẩm.'
  }
];

/**
 * Diagnostic Test Evaluation Result
 */
export interface DiagnosticEvaluationResult {
  test: DiagnosticOrganicTest;
  targetSubstanceFormula: string;
  isPositive: boolean;
  phenomenonVI: string;
  chemicalEquationVI?: string;
  indicatorColor: string;
  pedagogicalReasonVI: string;
}

/**
 * Check if a molecule undergoes a specific organic test
 */
export function evaluateDiagnosticOrganicTest(
  testId: string,
  substanceFormulaOrName: string
): DiagnosticEvaluationResult {
  const test = CURRICULUM_ORGANIC_TESTS.find(t => t.id === testId) || CURRICULUM_ORGANIC_TESTS[0];
  const query = substanceFormulaOrName.trim().toUpperCase();

  // Check positives
  const matchedPos = test.positiveSubstances.find(
    s => s.formula.toUpperCase() === query || query.includes(s.formula.toUpperCase()) || s.nameVI.toUpperCase().includes(query)
  );

  if (matchedPos) {
    return {
      test,
      targetSubstanceFormula: matchedPos.formula,
      isPositive: true,
      phenomenonVI: matchedPos.observationVI,
      chemicalEquationVI: matchedPos.reactionEquationVI,
      indicatorColor: matchedPos.visualColor,
      pedagogicalReasonVI: `Phản ứng dương tính: ${matchedPos.nameVI} thỏa mãn đặc điểm cấu trúc chứa ${test.targetFunctionalGroupVI}.`
    };
  }

  // Check negatives
  const matchedNeg = test.negativeSubstances.find(
    s => s.formula.toUpperCase() === query || s.nameVI.toUpperCase().includes(query)
  );

  return {
    test,
    targetSubstanceFormula: substanceFormulaOrName,
    isPositive: false,
    phenomenonVI: 'Không có hiện tượng đặc trưng (dung dịch giữ nguyên màu ban đầu hoặc kết tủa không tan)',
    indicatorColor: '#64748b', // Slate gray
    pedagogicalReasonVI: matchedNeg
      ? `Phản ứng âm tính: ${matchedNeg.reasonVI}`
      : `Phản ứng âm tính: Phân tử không chứa nhóm chức đặc hiệu (${test.targetFunctionalGroupVI}) cần thiết.`
  };
}

/**
 * Predict Geometric Isomerism (Cis/Trans, E/Z) feasibility:
 * Rule: R1 != R2 AND R3 != R4 at C=C bond
 */
export function checkGeometricIsomerismFeasibility(
  r1: string,
  r2: string,
  r3: string,
  r4: string
): {
  hasGeometricIsomerism: boolean;
  reasonVI: string;
} {
  const norm1 = r1.trim().toUpperCase();
  const norm2 = r2.trim().toUpperCase();
  const norm3 = r3.trim().toUpperCase();
  const norm4 = r4.trim().toUpperCase();

  if (norm1 === norm2) {
    return {
      hasGeometricIsomerism: false,
      reasonVI: `Không có đồng phân hình học: Hai nhóm thế ở cùng một nguyên tử C thứ nhất trùng nhau (${r1} = ${r2}).`
    };
  }

  if (norm3 === norm4) {
    return {
      hasGeometricIsomerism: false,
      reasonVI: `Không có đồng phân hình học: Hai nhóm thế ở cùng một nguyên tử C thứ hai trùng nhau (${r3} = ${r4}).`
    };
  }

  return {
    hasGeometricIsomerism: true,
    reasonVI: `Có đồng phân hình học: Cả hai nguyên tử cacbon liên kết đôi đều liên kết với hai nhóm thế khác nhau (${r1} ≠ ${r2} và ${r3} ≠ ${r4}).`
  };
}
