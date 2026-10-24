// src/domain/curriculumMasteryEngine.ts
// Comprehensive GDPT 2018 Chemistry Curriculum Diagnostic, Competency Matrix & Mastery Engine
// Strictly conforming to Vietnam MOET Circular 06/2024/TT-BGDDT & 24/2025/TT-BGDDT Standards

export type GradeLevel = 'GRADE_10' | 'GRADE_11' | 'GRADE_12';
export type CompetencyLevel = 'RECOGNITION' | 'COMPREHENSION' | 'APPLICATION' | 'HIGH_APPLICATION';

export interface CurriculumTopic {
  id: string;
  grade: GradeLevel;
  topicNumber: number;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  keyConcepts: string[];
  associatedVisualizerTab: string;
  nationalExamWeightPercent: number; // typical % in Graduation / University Entrance exam
}

export interface DiagnosticQuestion {
  id: string;
  topicId: string;
  grade: GradeLevel;
  level: CompetencyLevel;
  questionVi: string;
  optionsVi: string[];
  correctOptionIndex: number;
  explanationVi: string;
  remedialConceptVi: string;
}

export interface MasteryAssessmentResult {
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  grade10ScorePercent: number;
  grade11ScorePercent: number;
  grade12ScorePercent: number;
  levelBreakdown: {
    recognition: { correct: number; total: number };
    comprehension: { correct: number; total: number };
    application: { correct: number; total: number };
    highApplication: { correct: number; total: number };
  };
  weakTopicIds: string[];
  strongTopicIds: string[];
  competencyRankVi: string;
  personalizedRoadmapVi: string[];
}

// -----------------------------------------------------------------------------
// 1. GDPT 2018 CHEMISTRY CURRICULUM TOPICS CATALOG (Grade 10, 11, 12)
// -----------------------------------------------------------------------------

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  // Grade 10 Topics
  {
    id: 'G10_TOPIC_1_ATOMIC_STRUCTURE',
    grade: 'GRADE_10',
    topicNumber: 1,
    titleVi: 'Cấu tạo nguyên tử & Orbital nguyên tử',
    titleEn: 'Atomic Structure & Orbitals',
    descriptionVi: 'Hạt nhân (p, n), vỏ electron, orbital s/p/d/f, cấu hình electron và quy tắc Hund.',
    keyConcepts: ['Proton/Neutron/Electron', 'Orbital nguyên tử (AO)', 'Cấu hình electron', 'Quy tắc Hund'],
    associatedVisualizerTab: 'PERIODIC_TABLE',
    nationalExamWeightPercent: 4
  },
  {
    id: 'G10_TOPIC_2_PERIODIC_TABLE',
    grade: 'GRADE_10',
    topicNumber: 2,
    titleVi: 'Bảng tuần hoàn & Biến đổi tuần hoàn',
    titleEn: 'Periodic Table & Periodic Trends',
    descriptionVi: 'Chu kỳ, nhóm A/B, quy luật bán kính, độ âm điện, năng lượng ion hóa I1 và biến đổi acid-base oxide/hydroxide chu kỳ 3.',
    keyConcepts: ['Bán kính nguyên tử', 'Năng lượng ion hóa I1', 'Độ âm điện Pauling', 'Acid-Base Chu kỳ 3'],
    associatedVisualizerTab: 'PERIODIC_TRENDS_OCTET',
    nationalExamWeightPercent: 6
  },
  {
    id: 'G10_TOPIC_3_CHEMICAL_BONDING',
    grade: 'GRADE_10',
    topicNumber: 3,
    titleVi: 'Liên kết hóa học & Quy tắc Octet',
    titleEn: 'Chemical Bonding & Octet Rule',
    descriptionVi: 'Liên kết ion, cộng hóa trị (có cực/không cực), liên kết cho-nhận, liên kết hydrogen, tương tác van der Waals và ngoại lệ octet.',
    keyConcepts: ['Quy tắc Octet', 'Ngoại lệ Octet (BF3, SF6, NO2)', 'Liên kết Hydrogen', 'Mô hình VSEPR'],
    associatedVisualizerTab: 'VSEPR_BONDING',
    nationalExamWeightPercent: 6
  },
  {
    id: 'G10_TOPIC_4_REDOX_REACTIONS',
    grade: 'GRADE_10',
    topicNumber: 4,
    titleVi: 'Phản ứng oxi hóa - khử & Thăng bằng electron',
    titleEn: 'Redox Reactions & Electron Balance',
    descriptionVi: 'Số oxi hóa, 4 loại phản ứng (thông thường, nội phân tử, dị phân, quy tụ) và chuẩn độ KMnO4 đa môi trường.',
    keyConcepts: ['Số oxi hóa', 'Chất khử / Chất oxi hóa', 'Thăng bằng electron', 'Chuẩn độ KMnO4'],
    associatedVisualizerTab: 'REDOX_REACTIONS',
    nationalExamWeightPercent: 8
  },
  {
    id: 'G10_TOPIC_5_CHEMICAL_ENERGETICS',
    grade: 'GRADE_10',
    topicNumber: 5,
    titleVi: 'Năng lượng hóa học & Enthalpy tạo thành',
    titleEn: 'Chemical Energetics & Enthalpy of Formation',
    descriptionVi: 'Nhiệt tạo thành chuẩn delta_f H°298, biến thiên enthalpy phản ứng delta_r H°298, năng lượng liên kết Eb và định luật Hess.',
    keyConcepts: ['Nhiệt tạo thành chuẩn', 'Năng lượng liên kết', 'Định luật Hess', 'Nhiệt lượng kế'],
    associatedVisualizerTab: 'CHEMICAL_ENERGETICS',
    nationalExamWeightPercent: 6
  },
  {
    id: 'G10_TOPIC_6_CHEMICAL_KINETICS',
    grade: 'GRADE_10',
    topicNumber: 6,
    titleVi: 'Tốc độ phản ứng hóa học & Quy tắc Van \'t Hoff',
    titleEn: 'Chemical Reaction Kinetics & Van \'t Hoff Rule',
    descriptionVi: 'Phương trình tốc độ, hệ số nhiệt độ gamma, 5 yếu tố ảnh hưởng và thuyết va chạm hoạt động Arrhenius.',
    keyConcepts: ['Định luật tác dụng khối lượng', 'Quy tắc Van \'t Hoff', '5 yếu tố tốc độ', 'Thuyết va chạm'],
    associatedVisualizerTab: 'CHEMICAL_KINETICS',
    nationalExamWeightPercent: 6
  },
  {
    id: 'G10_TOPIC_7_HALOGENS',
    grade: 'GRADE_10',
    topicNumber: 7,
    titleVi: 'Nguyên tố nhóm VIIA (Halogen) & Nước Javel',
    titleEn: 'Group VIIA Halogens & Bleaching Agents',
    descriptionVi: 'Tính oxi hóa F2 > Cl2 > Br2 > I2, phản ứng thế halogen, hydrohalic acid, ăn mòn thủy tinh của HF và nước Javel.',
    keyConcepts: ['Phản ứng thế halogen', 'Độ mạnh axit HX', 'HF ăn mòn thủy tinh', 'Nước Javel & CaOCl2'],
    associatedVisualizerTab: 'HALOGENS_REDOX',
    nationalExamWeightPercent: 6
  },

  // Grade 11 Topics
  {
    id: 'G11_TOPIC_1_CHEMICAL_EQUILIBRIUM',
    grade: 'GRADE_11',
    topicNumber: 1,
    titleVi: 'Cân bằng hóa học & Nguyên lý Le Chatelier',
    titleEn: 'Chemical Equilibrium & Le Chatelier Principle',
    descriptionVi: 'Hằng số cân bằng Kc, các yếu tố chuyển dịch cân bằng (nhiệt độ, áp suất, nồng độ) và xúc tác.',
    keyConcepts: ['Hằng số Kc', 'Nguyên lý Le Chatelier', 'Cân bằng N2 + 3H2', 'Cân bằng NO2/N2O4'],
    associatedVisualizerTab: 'EQUILIBRIUM',
    nationalExamWeightPercent: 6
  },
  {
    id: 'G11_TOPIC_2_AQUEOUS_EQUILIBRIA_PH',
    grade: 'GRADE_11',
    topicNumber: 2,
    titleVi: 'Cân bằng trong dung dịch nước & Thuyết Bronsted-Lowry',
    titleEn: 'Aqueous Equilibria, pH & Titration',
    descriptionVi: 'Sự điện li, thuyết acid-base Bronsted-Lowry, tính pH, dung dịch đệm và chuẩn độ acid-base.',
    keyConcepts: ['Thuyết Bronsted-Lowry', 'Tính pH dung dịch', 'Dung dịch đệm', 'Đường cong chuẩn độ'],
    associatedVisualizerTab: 'TITRATION',
    nationalExamWeightPercent: 8
  },
  {
    id: 'G11_TOPIC_3_NITROGEN_SULFUR',
    grade: 'GRADE_11',
    topicNumber: 3,
    titleVi: 'Nitrogen, Sulfur & Mưa Acid - Phú Dưỡng',
    titleEn: 'Nitrogen, Sulfur & Environmental Acid Rain',
    descriptionVi: 'Đơn chất N2 trơ, amoniac (đài phun nước), axit nitric, axit sunfuric đặc, phú dưỡng và mưa axit.',
    keyConcepts: ['Đài phun NH3', 'HNO3 tính oxi hóa mạnh', 'H2SO4 hút nước', 'Hiện tượng phú dưỡng'],
    associatedVisualizerTab: 'NITROGEN_SULFUR_COMPOUNDS',
    nationalExamWeightPercent: 6
  },
  {
    id: 'G11_TOPIC_4_HYDROCARBONS',
    grade: 'GRADE_11',
    topicNumber: 4,
    titleVi: 'Hydrocarbon (Alkane, Alkene, Alkyne, Arene)',
    titleEn: 'Hydrocarbons: Alkanes to Arenes',
    descriptionVi: 'Quy tắc thế Markovnikov, hiệu ứng peroxide Kharasch, ankin có nối ba đầu mạch với AgNO3/NH3 và thuốc nổ TNT.',
    keyConcepts: ['Quy tắc Markovnikov', 'Ankin đầu mạch với AgNO3', 'Brom hóa Benzen', 'Thuốc nổ TNT'],
    associatedVisualizerTab: 'HYDROCARBONS_REACTIONS',
    nationalExamWeightPercent: 8
  },
  {
    id: 'G11_TOPIC_5_HALOGEN_DERIVATIVES_ALCOHOL_PHENOL',
    grade: 'GRADE_11',
    topicNumber: 5,
    titleVi: 'Dẫn xuất Halogen, Alcohol & Phenol',
    titleEn: 'Halogen Derivatives, Alcohols & Phenols',
    descriptionVi: 'Quy tắc tách Zaitsev, cơ chế SN1/SN2, liên kết hydrogen của alcohol, tính acid của phenol và thuốc nổ picric acid.',
    keyConcepts: ['Quy tắc tách Zaitsev', 'Phá hủy tầng ozone CFC', 'Alcohol đa chức hòa tan Cu(OH)2', 'Phenol phản ứng nước Brom'],
    associatedVisualizerTab: 'HALOGEN_DERIVATIVES',
    nationalExamWeightPercent: 8
  },
  {
    id: 'G11_TOPIC_6_CARBONYL_CARBOXYLIC',
    grade: 'GRADE_11',
    topicNumber: 6,
    titleVi: 'Hợp chất Carbonyl & Carboxylic Acid',
    titleEn: 'Carbonyl Compounds & Carboxylic Acids',
    descriptionVi: 'Aldehyde tráng bạc Tollens, phản ứng iodoform, tính acid của carboxylic acid và phản ứng ester hóa.',
    keyConcepts: ['Phản ứng tráng bạc Tollens', 'Phản ứng Iodoform nhận biết CH3CO-', 'Tính acid carboxylic', 'Phản ứng ester hóa'],
    associatedVisualizerTab: 'CARBONYL_CARBOXYLIC_ACID',
    nationalExamWeightPercent: 8
  },

  // Grade 12 Topics
  {
    id: 'G12_TOPIC_1_ESTER_LIPID',
    grade: 'GRADE_12',
    topicNumber: 1,
    titleVi: 'Ester, Lipid, Xà phòng & Chất giặt rửa',
    titleEn: 'Esters, Lipids, Soaps & Detergents',
    descriptionVi: 'Thủy phân thuận nghịch trong acid, xà phòng hóa bất thuận nghịch trong kiềm, chất béo omega-3/6 và micelle tẩy rửa.',
    keyConcepts: ['Thủy phân este', 'Xà phòng hóa chất béo', 'Chỉ số xà phòng hóa', 'Cơ chế tẩy rửa micelle'],
    associatedVisualizerTab: 'ESTER_LIPID_SAPONIFICATION',
    nationalExamWeightPercent: 8
  },
  {
    id: 'G12_TOPIC_2_CARBOHYDRATE',
    grade: 'GRADE_12',
    topicNumber: 2,
    titleVi: 'Carbohydrate (Glucose, Saccarozo, Tinh bột, Xenlulozo)',
    titleEn: 'Carbohydrates & Polysaccharides',
    descriptionVi: 'Cấu trúc mạch vòng hemiacetal, tráng bạc của glucose/fructose, thủy phân polysaccharide và tơ visco/axetat.',
    keyConcepts: ['Cấu trúc vòng Glucose', 'Phản ứng tráng bạc', 'Hồ tinh bột với Iodine', 'Xenlulozo trinitrat'],
    associatedVisualizerTab: 'CARBOHYDRATE_BIOCHEMISTRY',
    nationalExamWeightPercent: 8
  },
  {
    id: 'G12_TOPIC_3_AMINES_AMINO_ACIDS_PEPTIDES',
    grade: 'GRADE_12',
    topicNumber: 3,
    titleVi: 'Amine, Amino Acid, Peptide & Protein',
    titleEn: 'Amines, Amino Acids, Peptides & Proteins',
    descriptionVi: 'Bậc amine, ion lưỡng cực zwitterion, điểm đẳng điện pI, phản ứng màu biuret và biến tính protein.',
    keyConcepts: ['Bậc của amine', 'Ion lưỡng cực amino acid', 'Điểm đẳng điện pI', 'Phản ứng màu biuret'],
    associatedVisualizerTab: 'AMINES_AMINO_ACIDS_PEPTIDES',
    nationalExamWeightPercent: 8
  },
  {
    id: 'G12_TOPIC_4_POLYMERS',
    grade: 'GRADE_12',
    topicNumber: 4,
    titleVi: 'Polymer & Vật liệu Polymer',
    titleEn: 'Polymers & Macromolecular Materials',
    descriptionVi: 'Trùng hợp, trùng ngưng, cao su lưu hóa, chất dẻo, tơ tổng hợp (nylon-6,6, lapsan) và keo dán sinh học.',
    keyConcepts: ['Phản ứng trùng hợp', 'Phản ứng trùng ngưng', 'Tơ nilon-6,6', 'Lưu hóa cao su'],
    associatedVisualizerTab: 'POLYMERS_MACROMOLECULES',
    nationalExamWeightPercent: 6
  },
  {
    id: 'G12_TOPIC_5_METALLURGY_CORROSION',
    grade: 'GRADE_12',
    topicNumber: 5,
    titleVi: 'Đại cương Kim loại, Pin điện & Sự ăn mòn',
    titleEn: 'Electrochemistry, Galvanic Cells & Corrosion',
    descriptionVi: 'Thế điện cực chuẩn E°, suất điện động pin Galvani, phương trình Nernst, ăn mòn điện hóa và mạ điện bảo vệ.',
    keyConcepts: ['Thế điện cực chuẩn E°', 'Phương trình Nernst', 'Ăn mòn điện hóa học', 'Bảo vệ bằng cathode hy sinh'],
    associatedVisualizerTab: 'METALLURGY_CORROSION',
    nationalExamWeightPercent: 8
  }
];

// -----------------------------------------------------------------------------
// 2. DIAGNOSTIC BENCHMARK QUESTIONS POOL (Covers Grade 10, 11, 12)
// -----------------------------------------------------------------------------

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'Q01_OCTET_EXCEPTION',
    topicId: 'G10_TOPIC_3_CHEMICAL_BONDING',
    grade: 'GRADE_10',
    level: 'COMPREHENSION',
    questionVi: 'Phân tử nào sau đây có nguyên tử trung tâm KHÔNG thỏa mãn quy tắc Octet (vỏ ngoài khác 8 electron)?',
    optionsVi: ['CH4', 'NH3', 'BF3', 'H2O'],
    correctOptionIndex: 2,
    explanationVi: 'Trong phân tử BF3, nguyên tử Boron chỉ tạo 3 liên kết đơn B-F nên xung quanh B chỉ có 6 electron (thiếu octet) và đóng vai trò acid Lewis mạnh.',
    remedialConceptVi: 'Quy tắc Octet và các ngoại lệ: BF3 (6e), BeCl2 (4e), PCl5 (10e), SF6 (12e).'
  },
  {
    id: 'Q02_IONIZATION_ANOMALY',
    topicId: 'G10_TOPIC_2_PERIODIC_TABLE',
    grade: 'GRADE_10',
    level: 'APPLICATION',
    questionVi: 'Tại sao năng lượng ion hóa thứ nhất (I1) của Nitrogen (Z = 7) lại cao hơn Oxygen (Z = 8) dù Oxygen có điện tích hạt nhân lớn hơn?',
    optionsVi: [
      'Bán kính nguyên tử của Nitrogen lớn hơn Oxygen.',
      'Nitrogen có phân lớp 2p3 bán bão hòa đối xứng rất bền vững theo quy tắc Hund.',
      'Oxygen có độ âm điện nhỏ hơn Nitrogen.',
      'Nitrogen là chất khí trơ ở nhiệt độ phòng.'
    ],
    correctOptionIndex: 1,
    explanationVi: 'Nitrogen có cấu hình 2s² 2p³ bán bão hòa bền vững. Ở Oxygen (2p⁴), có 1 cặp electron ghép đôi đẩy nhau, làm giảm năng lượng cần bứt electron ra.',
    remedialConceptVi: 'Bất thường I1 do tính bền vững của phân lớp bão hòa (s²) và bán bão hòa (p³).'
  },
  {
    id: 'Q03_REDOX_MEDIUM',
    topicId: 'G10_TOPIC_4_REDOX_REACTIONS',
    grade: 'GRADE_10',
    level: 'APPLICATION',
    questionVi: 'Khi chuẩn độ dung dịch FeSO4 bằng dung dịch thuốc tím KMnO4 trong môi trường H2SO4 loãng, ion MnO4- bị khử về trạng thái nào?',
    optionsVi: ['MnO2 (kết tủa nâu đen)', 'Mn2+ (gần như không màu)', 'MnO4^2- (màu xanh lá)', 'Mn(s) (kim loại kết tủa)'],
    correctOptionIndex: 1,
    explanationVi: 'Trong môi trường acid (H+), ion MnO4- nhận 5e bị khử thành ion Mn2+ không màu: MnO4- + 5e + 8H+ -> Mn2+ + 4H2O.',
    remedialConceptVi: 'Ảnh hưởng môi trường đến KMnO4: Acid -> Mn2+ (không màu); Trung tính -> MnO2 (nâu); Kiềm -> MnO4^2- (xanh lá).'
  },
  {
    id: 'Q04_PERIOD3_AMPHOTERIC',
    topicId: 'G10_TOPIC_2_PERIODIC_TABLE',
    grade: 'GRADE_10',
    level: 'RECOGNITION',
    questionVi: 'Hydroxide nào của các nguyên tố thuộc Chu kỳ 3 có tính chất lưỡng tính (amphoteric)?',
    optionsVi: ['Mg(OH)2', 'Al(OH)3', 'H2SiO3', 'H3PO4'],
    correctOptionIndex: 1,
    explanationVi: 'Al(OH)3 là hydroxide lưỡng tính, tan được trong cả dung dịch acid mạnh (tạo Al3+) và dung dịch kiềm mạnh (tạo ion aluminate [Al(OH)4]-).',
    remedialConceptVi: 'Biến đổi acid-base Chu kỳ 3: NaOH (base mạnh) -> Mg(OH)2 -> Al(OH)3 (lưỡng tính) -> H2SiO3 -> H3PO4 -> H2SO4 -> HClO4 (acid rất mạnh).'
  },
  {
    id: 'Q05_MARKOVNIKOV',
    topicId: 'G11_TOPIC_4_HYDROCARBONS',
    grade: 'GRADE_11',
    level: 'APPLICATION',
    questionVi: 'Khi cho Propene (CH3-CH=CH2) tác dụng với HBr trong điều kiện KHÔNG có peroxide, sản phẩm chính theo quy tắc Markovnikov là gì?',
    optionsVi: ['1-bromopropane', '2-bromopropane', '1,2-dibromopropane', 'Cyclopropane'],
    correctOptionIndex: 1,
    explanationVi: 'Theo quy tắc Markovnikov, nguyên tử H liên kết vào C mang nhiều H hơn (C bậc 1 ở đầu mạch), còn halogen Br liên kết vào C mang ít H hơn (C bậc 2 ở giữa mạch) tạo sản phẩm chính 2-bromopropane (CH3-CHBr-CH3).',
    remedialConceptVi: 'Quy tắc cộng Markovnikov và hiệu ứng Kharasch (anti-Markovnikov khi có mặt peroxide hữu cơ).'
  },
  {
    id: 'Q06_ZAITSEV_ELIMINATION',
    topicId: 'G11_TOPIC_5_HALOGEN_DERIVATIVES_ALCOHOL_PHENOL',
    grade: 'GRADE_11',
    level: 'APPLICATION',
    questionVi: 'Đun nóng 2-bromobutane với dung dịch KOH trong ethanol (C2H5OH), sản phẩm alkene chính theo quy tắc Zaitsev là gì?',
    optionsVi: ['But-1-ene', 'But-2-ene', 'Butan-2-ol', 'Buta-1,3-diene'],
    correctOptionIndex: 1,
    explanationVi: 'Theo quy tắc Zaitsev, nguyên tử halogen bị tách cùng nguyên tử H ở carbon beta bậc cao hơn (chứa ít H hơn) để tạo alkene có nhiều nhóm thế hơn và bền hơn: But-2-ene chiếm ~81%.',
    remedialConceptVi: 'Quy tắc tách Zaitsev: Alkene bền hơn mang nhiều nhóm ankyl hơn là sản phẩm chính.'
  },
  {
    id: 'Q07_BIURET_PROTEIN',
    topicId: 'G12_TOPIC_3_AMINES_AMINO_ACIDS_PEPTIDES',
    grade: 'GRADE_12',
    level: 'RECOGNITION',
    questionVi: 'Chất nào sau đây KHÔNG cho phản ứng màu Biuret với Cu(OH)2 trong môi trường kiềm?',
    optionsVi: ['Lòng trắng trứng (Albumin)', 'Tripeptide Ala-Gly-Val', 'Dipeptide Gly-Ala', 'Polypeptide insulin'],
    correctOptionIndex: 2,
    explanationVi: 'Phản ứng màu Biuret chỉ xảy ra với các peptide có từ 2 liên kết peptide trở lên (tức từ tripeptide trở lên) và protein. Dipeptide Gly-Ala chỉ có 1 liên kết peptide nên không phản ứng.',
    remedialConceptVi: 'Điều kiện phản ứng màu Biuret: Tối thiểu 2 liên kết peptide (tripeptide trở lên), tạo phức màu tím đặc trưng.'
  },
  {
    id: 'Q08_NERNST_EQUATION',
    topicId: 'G12_TOPIC_5_METALLURGY_CORROSION',
    grade: 'GRADE_12',
    level: 'HIGH_APPLICATION',
    questionVi: 'Theo phương trình Nernst ở 25°C, khi tăng nồng độ ion Cu2+ trong dung dịch bán pin Cu2+/Cu lên 100 lần, thế điện cực E(Cu2+/Cu) sẽ thay đổi như thế nào?',
    optionsVi: ['Tăng thêm 0.0592 V', 'Giảm đi 0.0592 V', 'Tăng thêm 0.0296 V', 'Không đổi'],
    correctOptionIndex: 0,
    explanationVi: 'E = E° + (0.0592 / n) * log[Cu2+]. Với Cu2+ (n = 2), delta E = (0.0592 / 2) * log(100) = 0.0296 * 2 = +0.0592 V.',
    remedialConceptVi: 'Phương trình Nernst: E = E° + (0.0592 / n) * log([Oxi hóa] / [Khử]).'
  }
];

// -----------------------------------------------------------------------------
// 3. MASTERY SCORING & ROADMAP GENERATOR ALGORITHM
// -----------------------------------------------------------------------------

export function evaluateDiagnosticExam(
  userAnswers: { questionId: string; selectedOptionIndex: number }[]
): MasteryAssessmentResult {
  let correctCount = 0;
  const gradeScores = {
    GRADE_10: { correct: 0, total: 0 },
    GRADE_11: { correct: 0, total: 0 },
    GRADE_12: { correct: 0, total: 0 }
  };
  const levelBreakdown = {
    recognition: { correct: 0, total: 0 },
    comprehension: { correct: 0, total: 0 },
    application: { correct: 0, total: 0 },
    highApplication: { correct: 0, total: 0 }
  };

  const weakTopicIds: string[] = [];
  const strongTopicIds: string[] = [];

  for (const q of DIAGNOSTIC_QUESTIONS) {
    gradeScores[q.grade].total++;

    if (q.level === 'RECOGNITION') levelBreakdown.recognition.total++;
    else if (q.level === 'COMPREHENSION') levelBreakdown.comprehension.total++;
    else if (q.level === 'APPLICATION') levelBreakdown.application.total++;
    else if (q.level === 'HIGH_APPLICATION') levelBreakdown.highApplication.total++;

    const userAns = userAnswers.find(a => a.questionId === q.id);
    const isCorrect = userAns && userAns.selectedOptionIndex === q.correctOptionIndex;

    if (isCorrect) {
      correctCount++;
      gradeScores[q.grade].correct++;
      if (q.level === 'RECOGNITION') levelBreakdown.recognition.correct++;
      else if (q.level === 'COMPREHENSION') levelBreakdown.comprehension.correct++;
      else if (q.level === 'APPLICATION') levelBreakdown.application.correct++;
      else if (q.level === 'HIGH_APPLICATION') levelBreakdown.highApplication.correct++;

      if (!strongTopicIds.includes(q.topicId)) strongTopicIds.push(q.topicId);
    } else {
      if (!weakTopicIds.includes(q.topicId)) weakTopicIds.push(q.topicId);
    }
  }

  const scorePercentage = Math.round((correctCount / DIAGNOSTIC_QUESTIONS.length) * 100);
  const grade10ScorePercent = gradeScores.GRADE_10.total > 0
    ? Math.round((gradeScores.GRADE_10.correct / gradeScores.GRADE_10.total) * 100)
    : 100;
  const grade11ScorePercent = gradeScores.GRADE_11.total > 0
    ? Math.round((gradeScores.GRADE_11.correct / gradeScores.GRADE_11.total) * 100)
    : 100;
  const grade12ScorePercent = gradeScores.GRADE_12.total > 0
    ? Math.round((gradeScores.GRADE_12.correct / gradeScores.GRADE_12.total) * 100)
    : 100;

  let competencyRankVi = 'Cần Cố Gắng (Chưa Đạt Chuẩn)';
  if (scorePercentage >= 90) competencyRankVi = 'Xuất Sắc (Thượng Thừa Hóa Học THPT)';
  else if (scorePercentage >= 75) competencyRankVi = 'Giỏi (Nắm Vững Năng Lực GDPT 2018)';
  else if (scorePercentage >= 50) competencyRankVi = 'Khá (Đạt Chuẩn Tốt Nghiệp)';

  // Build tailored remedial roadmap
  const personalizedRoadmapVi: string[] = [];
  if (weakTopicIds.length === 0) {
    personalizedRoadmapVi.push('Chúc mừng bạn! Nền tảng hóa học GDPT 2018 cả 3 khối 10-11-12 của bạn đạt mức độ hoàn hảo.');
    personalizedRoadmapVi.push('Hãy tiếp tục thử thách với các chế độ Tactical TCG Rank Đấu Trí và MOBA Elemental Arena.');
  } else {
    for (const topicId of weakTopicIds) {
      const topic = CURRICULUM_TOPICS.find(t => t.id === topicId);
      if (topic) {
        personalizedRoadmapVi.push(
          `Ôn tập chủ đề "${topic.titleVi}" (Lớp ${topic.grade.replace('GRADE_', '')}): Sử dụng Visualizer "${topic.associatedVisualizerTab}" để thực hành mô phỏng tương tác.`
        );
      }
    }
  }

  return {
    totalQuestions: DIAGNOSTIC_QUESTIONS.length,
    correctCount,
    scorePercentage,
    grade10ScorePercent,
    grade11ScorePercent,
    grade12ScorePercent,
    levelBreakdown,
    weakTopicIds,
    strongTopicIds,
    competencyRankVi,
    personalizedRoadmapVi
  };
}
