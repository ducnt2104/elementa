// src/domain/greenChemistryEngine.ts
// Comprehensive Green Chemistry, Atmospheric Cycles, Acid Rain & Carbon Neutrality Engine
// Conforming to Vietnam GDPT 2018 (Hóa học 11 Chương 2: Nitrogen - Sulfur & Chương 4: Hydrocarbon; Hóa học 12 Chương 8: Hóa học và Môi trường)
// & IUPAC / Paul Anastas & John Warner's 12 Principles of Green Chemistry Standards

export interface GreenPrincipleDef {
  number: number;
  id: string;
  titleVI: string;
  titleEN: string;
  taglineVI: string;
  descriptionVI: string;
  chemicalStrategyVI: string;
  industrialExampleVI: string;
  relevantCurriculumVI: string;
  iconName: string;
}

export interface SynthesisRouteComparison {
  id: string;
  nameVI: string;
  productNameVI: string;
  productFormula: string;
  targetMolarMass: number; // g/mol
  
  // Traditional pathway
  traditionalRoute: {
    nameVI: string;
    reactionEquationVI: string;
    totalReactantMolarMass: number; // sum of (stoich * Mw)
    theoreticalAtomEconomyPercent: number; // (targetMolarMass / totalReactantMolarMass) * 100
    typicalYieldPercent: number;
    typicalEFactor: number; // kg waste / kg product
    majorHazardOrWasteVI: string;
    stepsCount: number;
  };

  // Green / Catalytic pathway
  greenRoute: {
    nameVI: string;
    reactionEquationVI: string;
    totalReactantMolarMass: number;
    theoreticalAtomEconomyPercent: number;
    typicalYieldPercent: number;
    typicalEFactor: number;
    majorGreenAdvantageVI: string;
    stepsCount: number;
  };

  pedagogicalInsightVI: string;
}

export interface AcidRainFormationStep {
  stepOrder: number;
  pollutantSourceVI: string;
  atmosphericReactionVI: string;
  catalystOrConditionVI: string;
  productAcidVI: string;
  acidStrengthType: 'STRONG_DIPROTIC' | 'STRONG_MONOPROTIC' | 'WEAK_ACID';
  pKa: number;
}

export interface AcidRainDamageTarget {
  id: string;
  targetNameVI: string;
  materialTypeVI: string;
  chemicalEquationVI: string;
  mechanismDescriptionVI: string;
  economicOrEcologicalImpactVI: string;
  preventionMeasureVI: string;
}

export interface GreenhouseGasDef {
  formula: string;
  nameVI: string;
  atmosphericAbundancePPM: number;
  gwp100: number; // Global Warming Potential over 100-year horizon (CO2 = 1)
  gwp20: number;  // 20-year horizon
  atmosphericLifetimeYears: number;
  primarySourcesVI: string[];
  vibrationalAbsorptionBandsMicrons: number[]; // IR wavelengths absorbed
  reductionTechnologyVI: string;
}

export interface CarbonCaptureMethodDef {
  id: string;
  methodNameVI: string;
  captureCategory: 'POST_COMBUSTION' | 'PRE_COMBUSTION' | 'OXY_FUEL' | 'DIRECT_AIR_CAPTURE';
  primaryReagentOrSolventVI: string;
  keyReactionEquationVI: string;
  regenerationEnergyMJperKgCO2: number;
  operatingTemperatureCelsius: number;
  advantagesVI: string;
  engineeringChallengesVI: string;
  utilizationProductVI: string;
}

// ==========================================
// 1. THE 12 PRINCIPLES OF GREEN CHEMISTRY
// Paul Anastas & John Warner (1998)
// ==========================================
export const GREEN_CHEMISTRY_PRINCIPLES: GreenPrincipleDef[] = [
  {
    number: 1,
    id: 'waste_prevention',
    titleVI: 'Ngăn Ngừa Chất Thải',
    titleEN: 'Waste Prevention',
    taglineVI: 'Ngăn ngừa tạo thành chất thải tốt hơn là xử lý sau khi phát sinh.',
    descriptionVI: 'Thiết kế các quy trình hóa học sao cho chất thải được giảm thiểu ngay từ nguồn, tránh lãng phí năng lượng và chi phí xử lý độc hại.',
    chemicalStrategyVI: 'Tối ưu hóa sơ đồ tổng hợp không tạo sản phẩm phụ muối vô cơ hoặc cặn bã.',
    industrialExampleVI: 'Sản xuất Ibuprofen công nghệ BHC (3 bước, E-factor ~ 0.3) thay thế quy trình Boots truyền thống (6 bước, E-factor > 5).',
    relevantCurriculumVI: 'Hóa học 12 - Chương 8: Hóa học và vấn đề môi trường.',
    iconName: 'ShieldAlert'
  },
  {
    number: 2,
    id: 'atom_economy',
    titleVI: 'Kinh Tế Nguyên Tử',
    titleEN: 'Atom Economy',
    taglineVI: 'Tối đa hóa việc kết hợp mọi nguyên tử của nguyên liệu vào sản phẩm cuối cùng.',
    descriptionVI: 'Đo lường tỉ lệ phần trăm khối lượng mol của các nguyên tử ban đầu được chuyển hóa thành sản phẩm mong muốn. Phản ứng cộng và đồng phân hóa đạt kinh tế nguyên tử 100%.',
    chemicalStrategyVI: '%AE = (M(sản phẩm mong muốn) / Tổng M(tất cả chất phản ứng)) × 100%. Ưu tiên phản ứng cộng hơn phản ứng thế hay tách.',
    industrialExampleVI: 'Tổng hợp Ethylene Oxide bằng phản ứng oxi hóa trực tiếp C2H4 với O2 (AE = 100%) thay vì phương pháp chlorohydrin (AE = 25.4%).',
    relevantCurriculumVI: 'Hóa học 11 - Chương 4: Hidrocacbon không no, phản ứng cộng.',
    iconName: 'Scale'
  },
  {
    number: 3,
    id: 'less_hazardous_synthesis',
    titleVI: 'Tổng Hợp Hóa Học Ít Độc Hại',
    titleEN: 'Less Hazardous Chemical Syntheses',
    taglineVI: 'Sử dụng và tạo ra các chất ít hoặc không độc hại với con người và môi trường.',
    descriptionVI: 'Bất cứ khi nào khả thi, phương pháp tổng hợp nên lựa chọn chất phản ứng và tiền chất có độc tính tối thiểu đối với sinh vật sống.',
    chemicalStrategyVI: 'Thay thế phosgene (COCl2 cực độc) bằng dimethyl carbonate (DMC) trong tổng hợp polycacbonat và isocyanate.',
    industrialExampleVI: 'Sản xuất nhựa Polycacbonat không dùng Phosgene của tập đoàn Asahi Kasei.',
    relevantCurriculumVI: 'Hóa học 11 - Dẫn xuất halogen và an toàn phòng thí nghiệm.',
    iconName: 'HeartHandshake'
  },
  {
    number: 4,
    id: 'designing_safer_chemicals',
    titleVI: 'Thiết Kế Hóa Chất An Toàn Hơn',
    titleEN: 'Designing Safer Chemicals',
    taglineVI: 'Duy trì hiệu quả chức năng của hóa chất đồng thời giảm thiểu độc tính tối đa.',
    descriptionVI: 'Sản phẩm hóa chất được thiết kế phân tử để vừa hoàn thành nhiệm vụ sử dụng vừa an toàn cho sức khỏe và hệ sinh thái.',
    chemicalStrategyVI: 'Thay thế chất hóa dẻo phthalate độc hại (DEHP) gây rối loạn nội tiết bằng các este citrate sinh học hoặc axetyl tributyl citrate (ATBC).',
    industrialExampleVI: 'Chất hóa dẻo y tế không độc hại cho túi đựng máu và ống truyền tĩnh mạch.',
    relevantCurriculumVI: 'Hóa học 12 - Este - Lipit.',
    iconName: 'ShieldCheck'
  },
  {
    number: 5,
    id: 'safer_solvents_auxiliaries',
    titleVI: 'Dung Môi và Phụ Gia An Toàn Hơn',
    titleEN: 'Safer Solvents and Auxiliaries',
    taglineVI: 'Hạn chế sử dụng dung môi phụ trợ; nếu dùng phải chọn loại vô hại.',
    descriptionVI: 'Tránh dùng các dung môi hữu cơ bay hơi (VOC) độc hại, dễ cháy nổ như benzen, diclometan, cacbon tetraclorua. Thay bằng nước, CO2 siêu tới hạn hoặc chất lỏng ion.',
    chemicalStrategyVI: 'Sử dụng CO2 siêu tới hạn (scCO2) làm dung môi chiết xuất không để lại dư lượng độc hại.',
    industrialExampleVI: 'Quy trình khử cafein trong hạt cà phê bằng CO2 siêu tới hạn không dùng diclometan.',
    relevantCurriculumVI: 'Hóa học 11 - Tách và tinh chế hợp chất hữu cơ.',
    iconName: 'Droplet'
  },
  {
    number: 6,
    id: 'energy_efficiency',
    titleVI: 'Thiết Kế Hiệu Quả Năng Lượng',
    titleEN: 'Design for Energy Efficiency',
    taglineVI: 'Tiến hành phản ứng ở nhiệt độ và áp suất môi trường để tiết kiệm năng lượng.',
    descriptionVI: 'Yêu cầu năng lượng cho các quá trình hóa học phải được giảm thiểu vì tác động môi trường và kinh tế. Sử dụng lò vi sóng, sóng siêu âm, hoặc quang hóa.',
    chemicalStrategyVI: 'Xúc tác enzym và quang xúc tác dưới ánh sáng khả kiến cho phép phản ứng diễn ra êm dịu ở 25°C và 1 atm.',
    industrialExampleVI: 'Sản xuất acrylamide từ acrylonitrile bằng xúc tác enzym nitrile hydratase vi sinh vật ở nhiệt độ phòng.',
    relevantCurriculumVI: 'Hóa học 10 - Tốc độ phản ứng hóa học (Năng lượng hoạt hóa).',
    iconName: 'Zap'
  },
  {
    number: 7,
    id: 'renewable_feedstocks',
    titleVI: 'Sử Dụng Nguồn Nguyên Liệu Tái Tạo',
    titleEN: 'Use of Renewable Feedstocks',
    taglineVI: 'Sử dụng nguyên liệu sinh khối tái tạo thay vì tài nguyên hóa thạch cạn kiệt.',
    descriptionVI: 'Nguyên liệu thô ban đầu nên có nguồn gốc nông nghiệp, sinh khối tái tạo thay vì phụ thuộc dầu mỏ, than đá.',
    chemicalStrategyVI: 'Lên men tinh bột và cellulose thành bio-ethanol, acid polylactic (PLA) hoặc dầu thực vật thành biodiesel.',
    industrialExampleVI: 'Sản xuất nhựa sinh học PLA tự phân hủy từ ngô và mía đường của NatureWorks.',
    relevantCurriculumVI: 'Hóa học 12 - Cacbohiđrat (Tinh bột, Xenlulozơ).',
    iconName: 'Sprout'
  },
  {
    number: 8,
    id: 'reduce_derivatives',
    titleVI: 'Giảm Thiểu Dẫn Xuất Hóa',
    titleEN: 'Reduce Derivatives',
    taglineVI: 'Tránh tạo nhóm bảo vệ hoặc biến đổi tạm thời không cần thiết.',
    descriptionVI: 'Việc bảo vệ/giải bảo vệ nhóm chức đòi hỏi thêm hóa chất phản ứng và tạo ra thêm chất thải phụ.',
    chemicalStrategyVI: 'Xúc tác chọn lọc vị trí (regioselective catalysis) trực tiếp vào nhóm chức mục tiêu mà không cần nhóm bảo vệ.',
    industrialExampleVI: 'Tổng hợp Peptid định hướng xúc tác sinh học không cần nhóm bảo vệ carbamate.',
    relevantCurriculumVI: 'Hóa học 12 - Amino acid và Peptit.',
    iconName: 'Scissors'
  },
  {
    number: 9,
    id: 'catalysis',
    titleVI: 'Xúc Tác Thay Vì Thuốc Thử Hóa Lượng',
    titleEN: 'Catalysis',
    taglineVI: 'Thuốc thử xúc tác chọn lọc vượt trội hơn nhiều so với lượng hóa chất đương lượng.',
    descriptionVI: 'Chất xúc tác có thể tái sử dụng, làm giảm năng lượng hoạt hóa, tăng độ chọn lọc và giảm thiểu phụ phẩm.',
    chemicalStrategyVI: 'Xúc tác kim loại chuyển tiếp (Zeolite, Pt, Pd, Ru, enzymes) thay vì tác nhân oxi hóa khử đương lượng như KMnO4, K2Cr2O7.',
    industrialExampleVI: 'Sản xuất axit nitric xúc tác lưới bạch kim Ostwald thay thế phương pháp nitrat hóa cổ điển.',
    relevantCurriculumVI: 'Hóa học 10 - Yếu tố ảnh hưởng đến tốc độ phản ứng (Chất xúc tác).',
    iconName: 'Sparkles'
  },
  {
    number: 10,
    id: 'design_for_degradation',
    titleVI: 'Thiết Kế Để Phân Hủy Sinh Học',
    titleEN: 'Design for Degradation',
    taglineVI: 'Hóa chất phải tự phân hủy vô hại sau khi sử dụng, không tích tụ lâu dài.',
    descriptionVI: 'Các sản phẩm hóa chất cần có liên kết dễ phân cắt bởi vi sinh vật tự nhiên (liên kết ester, amide) thành CO2, H2O và sinh khối vô hại.',
    chemicalStrategyVI: 'Tránh các chuỗi polymer bền vững không phân hủy như polyolefin gắn halogen, thay bằng polyhydroxyalkanoate (PHA) hay PLA.',
    industrialExampleVI: 'Túi nilông sinh học tự hủy hoàn toàn BioBag sản xuất từ tinh bột ngô và khoai tây.',
    relevantCurriculumVI: 'Hóa học 12 - Polime và vật liệu polime.',
    iconName: 'Recycle'
  },
  {
    number: 11,
    id: 'realtime_pollution_prevention',
    titleVI: 'Phân Tích Thời Gian Thực Để Ngăn Ô Nhiễm',
    titleEN: 'Real-time Analysis for Pollution Prevention',
    taglineVI: 'Giám sát trực tuyến trong dây chuyền sản xuất để ngăn chặn sự cố trước khi phát sinh.',
    descriptionVI: 'Phát triển các cảm biến và phương pháp phân tích in-situ thời gian thực nhằm phát hiện sai lệch thông số phản ứng ngay lập tức.',
    chemicalStrategyVI: 'Quang phổ hồng ngoại gần (NIR), cảm biến điện hóa và sắc ký trực tuyến gắn trực tiếp trong reactor.',
    industrialExampleVI: 'Kiểm soát trực tuyến quá trình hydro hóa dầu thực vật ngăn ngừa tích tụ đồng phân trans-fat độc hại.',
    relevantCurriculumVI: 'Hóa học 12 - Ứng dụng phân tích trong công nghiệp.',
    iconName: 'Activity'
  },
  {
    number: 12,
    id: 'inherently_safer_chemistry',
    titleVI: 'Hóa Học An Toàn Tự Nhiên Để Ngăn Ngừa Tai Nạn',
    titleEN: 'Inherently Safer Chemistry for Accident Prevention',
    taglineVI: 'Lựa chọn chất và trạng thái phản ứng để loại bỏ nguy cơ cháy, nổ, rò rỉ độc chất.',
    descriptionVI: 'Thay thế các hóa chất dễ nổ, khí áp suất cao hoặc chất ăn mòn nguy hiểm bằng các dạng muối, dung dịch nước hoặc tiền chất an toàn hơn.',
    chemicalStrategyVI: 'Sản xuất tại chỗ (in-situ on-demand) các chất không bền hoặc độc hại thay vì vận chuyển và lưu trữ bình chứa áp lực lớn.',
    industrialExampleVI: 'Sản xuất clo dioxide (ClO2) tại chỗ cho tẩy trắng giấy, loại bỏ lưu trữ khí Cl2 lỏng quy mô lớn.',
    relevantCurriculumVI: 'Hóa học 10 - Halogen & An toàn hóa chất.',
    iconName: 'Flame'
  }
];

// ==========================================
// 2. GREEN VS TRADITIONAL SYNTHESIS COMPARISONS
// Real-world industrial benchmarks
// ==========================================
export const SYNTHESIS_BENCHMARKS: Record<string, SynthesisRouteComparison> = {
  ethylene_oxide: {
    id: 'ethylene_oxide',
    nameVI: 'Tổng Hợp Ethylene Oxide (Oxiran)',
    productNameVI: 'Ethylene Oxide (C2H4O)',
    productFormula: 'C2H4O',
    targetMolarMass: 44.05,
    traditionalRoute: {
      nameVI: 'Phương pháp Chlorohydrin cổ điển (2 bước)',
      reactionEquationVI: 'C2H4 + Cl2 + Ca(OH)2 ⎯⎯→ C2H4O + CaCl2 + H2O',
      totalReactantMolarMass: 28.05 + 70.90 + 74.09, // 173.04 g/mol
      theoreticalAtomEconomyPercent: (44.05 / 173.04) * 100, // ~25.46%
      typicalYieldPercent: 80,
      typicalEFactor: 3.2,
      majorHazardOrWasteVI: 'Thải ra 2.5 kg muối thải CaCl2 độc hại trên mỗi kg sản phẩm, tiêu tốn clo độc hại Cl2.',
      stepsCount: 2
    },
    greenRoute: {
      nameVI: 'Phương pháp Oxi hóa Xúc tác Bạc Hiện đại (1 bước)',
      reactionEquationVI: 'C2H4 + 1/2 O2 ⎯⎯(Ag xúc tác, 250°C)⎯→ C2H4O',
      totalReactantMolarMass: 28.05 + 16.00, // 44.05 g/mol
      theoreticalAtomEconomyPercent: 100.0, // 100%
      typicalYieldPercent: 92,
      typicalEFactor: 0.1,
      majorGreenAdvantageVI: 'Kinh tế nguyên tử 100%, chất oxi hóa là khí oxy không khí vô hại, không có muối thải CaCl2.',
      stepsCount: 1
    },
    pedagogicalInsightVI: 'Phương pháp xúc tác bạc minh họa sinh động Nguyên lý 2 (Kinh tế nguyên tử 100%) và Nguyên lý 9 (Xúc tác), biến chất thải thành zero.'
  },
  ibuprofen: {
    id: 'ibuprofen',
    nameVI: 'Tổng Hợp Thuốc Kháng Viêm Ibuprofen',
    productNameVI: 'Ibuprofen (C13H18O2)',
    productFormula: 'C13H18O2',
    targetMolarMass: 206.28,
    traditionalRoute: {
      nameVI: 'Quy trình Boots Cổ điển (1960s - 6 bước)',
      reactionEquationVI: 'Isobutylbenzene + Reagents (AlCl3, CH3COCl, ClCH2COOEt, NH2OH...) ⎯⎯→ Ibuprofen + Muối vô cơ thải',
      totalReactantMolarMass: 514.5, // Tổng khối lượng thuốc thử lượng hóa
      theoreticalAtomEconomyPercent: (206.28 / 514.5) * 100, // ~40.1%
      typicalYieldPercent: 60,
      typicalEFactor: 5.8,
      majorHazardOrWasteVI: 'Hơn 60% khối lượng nguyên liệu trở thành chất thải cặn AlCl3 bị hydrat hóa và muối không tái chế được.',
      stepsCount: 6
    },
    greenRoute: {
      nameVI: 'Quy trình BHC Xanh Hiện đại (Giải thưởng Hóa học Xanh Tổng thống Mỹ 1997 - 3 bước)',
      reactionEquationVI: 'Isobutylbenzene + (CH3CO)2O ⎯⎯(HF xúc tác tái sinh)⎯→ Intermediate ⎯⎯(H2, Pd)⎯→ ⎯⎯(CO, Pd)⎯→ Ibuprofen',
      totalReactantMolarMass: 266.35,
      theoreticalAtomEconomyPercent: (206.28 / 266.35) * 100, // ~77.4% (hoặc ~99% khi tái chế CH3COOH)
      typicalYieldPercent: 90,
      typicalEFactor: 0.35,
      majorGreenAdvantageVI: 'Chỉ 3 bước xúc tác, xúc tác HF thu hồi tái sinh 99.9%, sản phẩm phụ duy nhất là acid acetic (giấm ăn) thương phẩm.',
      stepsCount: 3
    },
    pedagogicalInsightVI: 'Quy trình BHC là biểu tượng kinh điển của Hóa học Xanh: giảm bước tổng hợp từ 6 xuống 3, tăng kinh tế nguyên tử từ 40% lên 77% và tái chế xúc tác triệt để.'
  },
  biodiesel_transesterification: {
    id: 'biodiesel_transesterification',
    nameVI: 'Sản Xuất Nhiên Liệu Sinh Học Biodiesel',
    productNameVI: 'Biodiesel FAME (Este Metylic Axit Béo)',
    productFormula: 'R-COOCH3',
    targetMolarMass: 296.5, // Đại diện Methyl Oleate
    traditionalRoute: {
      nameVI: 'Nhiên liệu Diesel hóa thạch từ dầu mỏ (Cracking & Chưng cất)',
      reactionEquationVI: 'Dầu thô mỏ (Hóa thạch hữu hạn) ⎯⎯(Cracking nhiệt)⎯→ Dầu Diesel C12-C20 + Khí nhà kính CO2 ròng',
      totalReactantMolarMass: 350.0,
      theoreticalAtomEconomyPercent: 84.7,
      typicalYieldPercent: 75,
      typicalEFactor: 1.8,
      majorHazardOrWasteVI: 'Phát thải lưu huỳnh SO2, bụi mịn PM2.5, làm gia tăng lượng CO2 hóa thạch ròng trong chu trình khí quyển.',
      stepsCount: 4
    },
    greenRoute: {
      nameVI: 'Chuyển hóa este dầu thực vật tái tạo (Transesterification)',
      reactionEquationVI: '(RCOO)3C3H5 + 3 CH3OH ⎯⎯(KOH xúc tác, 60°C)⎯→ 3 RCOOCH3 + C3H5(OH)3 (Glycerol)',
      totalReactantMolarMass: 885.4 + 3 * 32.04, // 981.5 g/mol
      theoreticalAtomEconomyPercent: (3 * 296.5 / 981.5) * 100, // ~90.6%
      typicalYieldPercent: 96,
      typicalEFactor: 0.15,
      majorGreenAdvantageVI: 'Nguyên liệu tái tạo (dầu ăn phế thải/dầu thực vật), chu trình carbon trung tính, glycerol phụ phẩm là nguyên liệu mỹ phẩm.',
      stepsCount: 1
    },
    pedagogicalInsightVI: 'Minh họa Nguyên lý 7 (Nguồn nguyên liệu tái tạo) và Nguyên lý 10 (Thiết kế phân hủy sinh học, giảm thiểu khí nhà kính ròng).'
  }
};

// ==========================================
// 3. ACID RAIN CYCLES & DAMAGE TARGETS
// GDPT 2018 Chemistry 11 Chapter 2
// ==========================================
export const ACID_RAIN_STEPS: AcidRainFormationStep[] = [
  {
    stepOrder: 1,
    pollutantSourceVI: 'Đốt than đá, dầu mỏ chứa tạp chất lưu huỳnh trong nhà máy nhiệt điện',
    atmosphericReactionVI: 'S(r) + O2(k) ⎯⎯(t°)⎯→ SO2(k)',
    catalystOrConditionVI: 'Đốt cháy ở nhiệt độ cao > 800°C',
    productAcidVI: 'Khí Lưu huỳnh đioxit (Sulfur dioxide)',
    acidStrengthType: 'WEAK_ACID',
    pKa: 1.81
  },
  {
    stepOrder: 2,
    pollutantSourceVI: 'Khí SO2 bay lên tầng đối lưu, bị oxi hóa quang hóa bởi bụi kim loại hoặc ozon',
    atmosphericReactionVI: '2 SO2(k) + O2(k) ⎯⎯(bụi xúc tác Fe/Mn, ánh sáng)⎯→ 2 SO3(k)',
    catalystOrConditionVI: 'Bụi aerosol kim loại đóng vai trò xúc tác dị thể',
    productAcidVI: 'Khí Lưu huỳnh trioxit (Sulfur trioxide)',
    acidStrengthType: 'STRONG_DIPROTIC',
    pKa: -3.0
  },
  {
    stepOrder: 3,
    pollutantSourceVI: 'SO3 tan vào các hạt nước mây ngưng tụ tạo thành sol khí axit sulfuric',
    atmosphericReactionVI: 'SO3(k) + H2O(l) ⎯⎯→ H2SO4(dd)',
    catalystOrConditionVI: 'Độ ẩm không khí cao, mây ngưng tụ',
    productAcidVI: 'Axit Sulfuric (H2SO4 - Axit mạnh đa nấc)',
    acidStrengthType: 'STRONG_DIPROTIC',
    pKa: -3.0
  },
  {
    stepOrder: 4,
    pollutantSourceVI: 'Sấm sét và động cơ đốt trong sinh ra oxit nitơ từ N2 và O2 không khí',
    atmosphericReactionVI: 'N2(k) + O2(k) ⎯⎯(tia lửa điện > 2000°C)⎯→ 2 NO(k); sau đó 2 NO + O2 ⎯⎯→ 2 NO2',
    catalystOrConditionVI: 'Tia sét hoặc nhiệt độ xilanh ô tô > 2000°C',
    productAcidVI: 'Khí Nitơ đioxit màu nâu đỏ (NO2)',
    acidStrengthType: 'STRONG_MONOPROTIC',
    pKa: -1.38
  },
  {
    stepOrder: 5,
    pollutantSourceVI: 'Khí NO2 tác dụng với nước mưa và oxy hòa tan',
    atmosphericReactionVI: '4 NO2(k) + O2(k) + 2 H2O(l) ⎯⎯→ 4 HNO3(dd)',
    catalystOrConditionVI: 'Oxy hòa tan trong giọt mưa',
    productAcidVI: 'Axit Nitric (HNO3 - Axit mạnh)',
    acidStrengthType: 'STRONG_MONOPROTIC',
    pKa: -1.38
  }
];

export const ACID_RAIN_TARGETS: AcidRainDamageTarget[] = [
  {
    id: 'limestone_monument',
    targetNameVI: 'Tượng Đài và Công Trình Bằng Đá Vôi / Cẩm Thạch',
    materialTypeVI: 'Canxi Cacbonat (CaCO3)',
    chemicalEquationVI: 'CaCO3(r) + H2SO4(dd) ⎯⎯→ CaSO4·2H2O(r) + CO2(k)↑',
    mechanismDescriptionVI: 'Axit sulfuric hòa tan canxi cacbonat chuyển thành thạch cao (CaSO4·2H2O) có thể tích lớn hơn, làm nứt vỡ, mòn rỗ các chi tiết điêu khắc nghệ thuật.',
    economicOrEcologicalImpactVI: 'Phá hủy di sản văn hóa thế giới (đền Taj Mahal, tượng đá Hy Lạp cổ đại, nhà thờ đá).',
    preventionMeasureVI: 'Phủ lớp màng bảo vệ nano hydrophobe silica hoặc giảm thiểu phát thải SO2 bằng bộ lọc khử lưu huỳnh FGD.'
  },
  {
    id: 'metallic_bridges',
    targetNameVI: 'Cầu Đường và Kết Cấu Thép Xây Dựng',
    materialTypeVI: 'Sắt thép (Fe kim loại)',
    chemicalEquationVI: 'Fe(r) + H2SO4(dd) ⎯⎯→ FeSO4(dd) + H2(k)↑  và  4 FeSO4 + O2 + 10 H2O ⎯⎯→ 4 Fe(OH)3↓ + 4 H2SO4',
    mechanismDescriptionVI: 'Ion H+ hòa tan sắt kim loại, lớp gỉ sắt xốp không bảo vệ được lõi kim loại, tạo chu trình ăn mòn tự xúc tác liên tục.',
    economicOrEcologicalImpactVI: 'Gây sập cầu cống, giảm tuổi thọ công trình hạ tầng giao thông hàng tỷ USD mỗi năm.',
    preventionMeasureVI: 'Sơn phủ chống ăn mòn epoxy, mạ kẽm nhúng nóng (bảo vệ catot hy sinh).'
  },
  {
    id: 'forest_soil_leaching',
    targetNameVI: 'Hệ Sinh Thái Rừng và Đất Trồng',
    materialTypeVI: 'Đất phù sa chứa khoáng nhôm silicat',
    chemicalEquationVI: 'Al2Si2O5(OH)4(r) + 6 H+(dd) ⎯⎯→ 2 Al³⁺(dd) + 2 H4SiO4(dd) + H2O',
    mechanismDescriptionVI: 'Axit rửa trôi các ion dưỡng chất Ca²⁺, Mg²⁺, K⁺; đồng thời giải phóng ion nhôm tự do Al³⁺ cực độc làm hỏng mao mạch rễ cây.',
    economicOrEcologicalImpactVI: 'Hiện tượng "Rừng chết" (Waldsterben) tại châu Âu và Bắc Mỹ, suy giảm năng suất nông lâm nghiệp.',
    preventionMeasureVI: 'Rải vôi bột khử chua đất (Ca(OH)2 hoặc CaCO3) để nâng pH đất lên > 6.0.'
  },
  {
    id: 'aquatic_acidification',
    targetNameVI: 'Sông Hồ và Thủy Vực Tự Nhiên',
    materialTypeVI: 'Nước mặt và sinh vật thủy sinh',
    chemicalEquationVI: 'HCO3⁻(dd) + H⁺(dd) ⎯⎯→ CO2(k)↑ + H2O  (mất hệ đệm bicacbonat tự nhiên)',
    mechanismDescriptionVI: 'Khi pH hồ giảm xuống dưới 5.0, ion Al³⁺ hòa tan kết tủa nhầy trên mang cá làm ngạt thở, ấu trùng tôm cua không thể hình thành vỏ kitin.',
    economicOrEcologicalImpactVI: 'Hàng ngàn hồ nước tại bán đảo Scandinavia và Canada trở thành "hồ chết" không còn loài cá nào sống sót.',
    preventionMeasureVI: 'Bón vôi máy bay cho lưu vực hồ và kiểm soát khí thải công nghiệp xuyên biên giới.'
  }
];

// ==========================================
// 4. GREENHOUSE GASES & CLIMATE FORCING
// IPCC AR6 / Vietnam GDPT 2018
// ==========================================
export const GREENHOUSE_GASES: Record<string, GreenhouseGasDef> = {
  carbon_dioxide: {
    formula: 'CO2',
    nameVI: 'Cacbon đioxit',
    atmosphericAbundancePPM: 424.5, // 2024-2026 data
    gwp100: 1, // Chuẩn quy chiếu
    gwp20: 1,
    atmosphericLifetimeYears: 200, // 100 - 300 năm
    primarySourcesVI: [
      'Đốt nhiên liệu hóa thạch (than, dầu, khí)',
      'Sản xuất xi măng (nhiệt phân CaCO3 ⎯⎯→ CaO + CO2)',
      'Cháy rừng và phá rừng nhiệt đới'
    ],
    vibrationalAbsorptionBandsMicrons: [4.26, 14.99], // Dao động uốn và kéo dãn bất đối xứng
    reductionTechnologyVI: 'Công nghệ CCUS (Bắt giữ, tận dụng và chôn lấp carbon), trồng rừng tái sinh.'
  },
  methane: {
    formula: 'CH4',
    nameVI: 'Metan',
    atmosphericAbundancePPM: 1.93,
    gwp100: 28, // GWP 100 năm (IPCC AR6)
    gwp20: 84,  // GWP 20 năm cực kỳ nguy hiểm
    atmosphericLifetimeYears: 12.0,
    primarySourcesVI: [
      'Lên men yếm khí ruộng lúa nước',
      'Lên men dạ cỏ trâu bò (ợ hơi)',
      'Rò rỉ giếng khai thác dầu khí và bãi chôn lấp rác'
    ],
    vibrationalAbsorptionBandsMicrons: [3.31, 7.66],
    reductionTechnologyVI: 'Khai thác khí Biogas làm năng lượng sạch, kỹ thuật canh tác lúa ngập khô xen kẽ (AWD).'
  },
  nitrous_oxide: {
    formula: 'N2O',
    nameVI: 'Đinitơ oxit (Khí cười)',
    atmosphericAbundancePPM: 0.337,
    gwp100: 273, // GWP 100 năm
    gwp20: 273,
    atmosphericLifetimeYears: 114.0,
    primarySourcesVI: [
      'Bón quá mức phân đạm hóa học (quá trình phản nitrat hóa trong đất)',
      'Xử lý nước thải sinh hoạt',
      'Sản xuất axit adipic và axit nitric công nghiệp'
    ],
    vibrationalAbsorptionBandsMicrons: [4.50, 7.78, 17.0],
    reductionTechnologyVI: 'Sử dụng phân đạm bọc hạt tan chậm, chất ức chế men urease, xúc tác phân hủy N2O ở đuôi lò axit.'
  },
  sulfur_hexafluoride: {
    formula: 'SF6',
    nameVI: 'Lưu huỳnh hexaflorua',
    atmosphericAbundancePPM: 0.000011, // ~11 ppt
    gwp100: 25200, // Khí nhà kính nhân tạo mạnh nhất
    gwp20: 17500,
    atmosphericLifetimeYears: 3200.0,
    primarySourcesVI: [
      'Khí cách điện trong máy cắt điện cao thế và trạm biến áp GIS',
      'Công nghiệp sản xuất chất bán dẫn điện tử'
    ],
    vibrationalAbsorptionBandsMicrons: [10.55],
    reductionTechnologyVI: 'Chuyển đổi sang khí cách điện thế hệ mới như Novec 4710 (fluoronitrile) pha loãng với CO2/O2.'
  }
};

// ==========================================
// 5. CARBON CAPTURE, UTILIZATION & STORAGE (CCUS)
// ==========================================
export const CARBON_CAPTURE_METHODS: Record<string, CarbonCaptureMethodDef> = {
  amine_scrubbing: {
    id: 'amine_scrubbing',
    methodNameVI: 'Hấp Thụ Hóa Học Bằng Dung Dịch Amine (MEA)',
    captureCategory: 'POST_COMBUSTION',
    primaryReagentOrSolventVI: 'Monoethanolamine 30% khối lượng (MEA - HO-CH2-CH2-NH2)',
    keyReactionEquationVI: '2 R-NH2 + CO2(k) + H2O ⇌ (R-NH3)2CO3(dd)  hoặc  R-NH2 + CO2 ⇌ R-NH-COO⁻ + R-NH3⁺',
    regenerationEnergyMJperKgCO2: 3.5, // 3.2 - 4.0 MJ / kg CO2
    operatingTemperatureCelsius: 45, // Hấp thụ ở 40-50°C, tái sinh ở 120-140°C
    advantagesVI: 'Công nghệ thương mại chín muồi nhất, hiệu suất bắt giữ CO2 đạt > 90% từ khói thải loãng (10-15% CO2).',
    engineeringChallengesVI: 'Tiêu tốn năng lượng nhiệt tái sinh lớn làm giảm 20-25% hiệu suất nhà máy điện; amine bị bay hơi và phân hủy oxi hóa.',
    utilizationProductVI: 'CO2 tinh khiết áp suất cao dùng cho nén khí nâng cao thu hồi dầu (EOR) hoặc làm đồ uống có ga.'
  },
  direct_air_capture_caustic: {
    id: 'direct_air_capture_caustic',
    methodNameVI: 'Bắt Giữ Trực Tiếp Từ Không Khí (DAC Vòng Kiềm Canxi)',
    captureCategory: 'DIRECT_AIR_CAPTURE',
    primaryReagentOrSolventVI: 'Dung dịch KOH tuần hoàn và vòng nung vôi Ca(OH)2 / CaCO3',
    keyReactionEquationVI: '2 KOH + CO2 ⎯⎯→ K2CO3 + H2O;  K2CO3 + Ca(OH)2 ⎯⎯→ 2 KOH + CaCO3↓;  CaCO3 ⎯⎯(900°C)⎯→ CaO + CO2↑',
    regenerationEnergyMJperKgCO2: 8.5,
    operatingTemperatureCelsius: 900,
    advantagesVI: 'Có thể đặt ở bất cứ đâu độc lập với nguồn phát thải, trực tiếp kéo giảm nồng độ CO2 khí quyển (425 ppm).',
    engineeringChallengesVI: 'Nồng độ CO2 trong không khí siêu loãng (chỉ 0.04%), đòi hỏi luân chuyển thể tích không khí khổng lồ và năng lượng nhiệt nung vôi 900°C.',
    utilizationProductVI: 'Lưu trữ vĩnh viễn trong khoáng bazan dưới lòng đất (Carbfix) thành đá khoáng cacbonat.'
  },
  catalytic_emethanol: {
    id: 'catalytic_emethanol',
    methodNameVI: 'Tổng Hợp e-Methanol Xanh Từ CO2 và Hydro Tái Tạo',
    captureCategory: 'POST_COMBUSTION',
    primaryReagentOrSolventVI: 'Khí CO2 thu giữ + Khí Hydro xanh từ điện phân nước bằng điện mặt trời/gió',
    keyReactionEquationVI: 'CO2(k) + 3 H2(k) ⎯⎯(Xúc tác Cu/ZnO/Al2O3, 250°C, 50 bar)⎯→ CH3OH(h) + H2O(h)  (ΔrH° = -49.5 kJ/mol)',
    regenerationEnergyMJperKgCO2: 1.2,
    operatingTemperatureCelsius: 250,
    advantagesVI: 'Biến khí nhà kính độc hại thành nhiên liệu lỏng mật độ năng lượng cao dễ lưu trữ vận chuyển, không phát thải carbon ròng.',
    engineeringChallengesVI: 'Giá thành sản xuất phụ thuộc vào giá điện xanh để điện phân tạo H2; tạo ra phụ phẩm H2O làm giảm hoạt tính xúc tác đồng.',
    utilizationProductVI: 'e-Methanol nhiên liệu xanh cho tàu biển viễn dương, nguyên liệu cho công nghiệp hóa dầu.'
  }
};

// ==========================================
// 6. QUANTITATIVE MATHEMATICAL CALCULATORS
// ==========================================

/**
 * Calculates Atom Economy (Kinh tế nguyên tử %AE)
 * %AE = (Mw(desired_product) / sum(Mw(reactants))) * 100
 */
export function calculateAtomEconomy(
  desiredProductMolarMass: number,
  totalReactantsMolarMass: number
): {
  atomEconomyPercent: number;
  isGreen: boolean;
  ratingVI: 'XUẤT_SẮC_100%' | 'TỐT_TRÊN_70%' | 'TRUNG_BÌNH_50_70%' | 'KÉM_DƯỚI_50%';
  explanationVI: string;
} {
  if (totalReactantsMolarMass <= 0 || desiredProductMolarMass <= 0) {
    throw new Error('Khối lượng mol phải lớn hơn 0.');
  }

  const rawPercent = (desiredProductMolarMass / totalReactantsMolarMass) * 100;
  const atomEconomyPercent = Math.min(100, Math.round(rawPercent * 100) / 100);

  let ratingVI: 'XUẤT_SẮC_100%' | 'TỐT_TRÊN_70%' | 'TRUNG_BÌNH_50_70%' | 'KÉM_DƯỚI_50%';
  let explanationVI = '';

  if (atomEconomyPercent >= 99.9) {
    ratingVI = 'XUẤT_SẮC_100%';
    explanationVI = 'Phản ứng bảo toàn 100% nguyên tử vào sản phẩm mong muốn (thường là phản ứng cộng hoặc đồng phân hóa). Không tạo chất thải phân tử.';
  } else if (atomEconomyPercent >= 70.0) {
    ratingVI = 'TỐT_TRÊN_70%';
    explanationVI = 'Quy trình có hiệu quả kinh tế nguyên tử cao, phần lớn vật chất được đưa vào sản phẩm thương mại.';
  } else if (atomEconomyPercent >= 50.0) {
    ratingVI = 'TRUNG_BÌNH_50_70%';
    explanationVI = 'Hiệu quả trung bình, vẫn còn một lượng đáng kể nguyên tử bị thải ra dưới dạng phụ phẩm.';
  } else {
    ratingVI = 'KÉM_DƯỚI_50%';
    explanationVI = 'Phần lớn khối lượng nguyên liệu bị lãng phí thành chất thải phụ phẩm (thường gặp ở phản ứng thế hoặc phản ứng Wittig cổ điển). Cần đổi mới xúc tác.';
  }

  return {
    atomEconomyPercent,
    isGreen: atomEconomyPercent >= 70.0,
    ratingVI,
    explanationVI
  };
}

/**
 * Calculates Environmental Factor (E-factor)
 * E = kg waste / kg product = (kg raw materials - kg product) / kg product
 */
export function calculateEFactor(
  totalRawMaterialsKg: number,
  desiredProductKg: number
): {
  eFactor: number;
  wasteKg: number;
  industryBenchmarkVI: string;
  evaluationVI: string;
} {
  if (desiredProductKg <= 0 || totalRawMaterialsKg < desiredProductKg) {
    throw new Error('Khối lượng nguyên liệu phải lớn hơn hoặc bằng khối lượng sản phẩm.');
  }

  const wasteKg = Math.round((totalRawMaterialsKg - desiredProductKg) * 1000) / 1000;
  const rawEFactor = wasteKg / desiredProductKg;
  const eFactor = Math.round(rawEFactor * 100) / 100;

  let industryBenchmarkVI = '';
  let evaluationVI = '';

  if (eFactor < 0.1) {
    industryBenchmarkVI = 'Lọc hóa dầu thô (E < 0.1)';
    evaluationVI = 'Mức chất thải siêu thấp, quy trình tối ưu hóa dòng vật chất gần như hoàn hảo.';
  } else if (eFactor <= 5.0) {
    industryBenchmarkVI = 'Hóa chất cơ bản / đại trà (E ~ 1 - 5)';
    evaluationVI = 'Mức thải đạt chuẩn công nghiệp hóa chất số lượng lớn.';
  } else if (eFactor <= 50.0) {
    industryBenchmarkVI = 'Hóa chất tinh khiết / hóa chất chuyên dụng (E ~ 5 - 50)';
    evaluationVI = 'Lượng chất thải đáng kể, cần áp dụng các bước xúc tác thu hồi dung môi.';
  } else {
    industryBenchmarkVI = 'Công nghiệp Dược phẩm truyền thống (E ~ 25 - 100+)';
    evaluationVI = 'Lượng chất thải rất lớn do tổng hợp hữu cơ nhiều bước phức tạp. Cần chuyển đổi sang quy trình hóa học xanh sinh học.';
  }

  return {
    eFactor,
    wasteKg,
    industryBenchmarkVI,
    evaluationVI
  };
}

/**
 * Calculates Carbon Dioxide Equivalent (CO2-eq)
 * CO2-eq = mass (tonnes) * GWP100
 */
export function calculateCO2Equivalent(
  gasEmissionsTonnes: Record<string, number>
): {
  totalCO2EquivalentTonnes: number;
  breakdown: Array<{
    gasId: string;
    gasNameVI: string;
    massTonnes: number;
    gwp100: number;
    co2EqTonnes: number;
    sharePercent: number;
  }>;
} {
  let totalCO2Eq = 0;
  const breakdown: Array<{
    gasId: string;
    gasNameVI: string;
    massTonnes: number;
    gwp100: number;
    co2EqTonnes: number;
    sharePercent: number;
  }> = [];

  for (const [gasId, massTonnes] of Object.entries(gasEmissionsTonnes)) {
    const gasDef = GREENHOUSE_GASES[gasId];
    if (!gasDef || massTonnes <= 0) continue;

    const co2Eq = massTonnes * gasDef.gwp100;
    totalCO2Eq += co2Eq;

    breakdown.push({
      gasId,
      gasNameVI: gasDef.nameVI,
      massTonnes,
      gwp100: gasDef.gwp100,
      co2EqTonnes: Math.round(co2Eq * 100) / 100,
      sharePercent: 0 // Sẽ tính sau khi có tổng
    });
  }

  if (totalCO2Eq > 0) {
    breakdown.forEach(item => {
      item.sharePercent = Math.round((item.co2EqTonnes / totalCO2Eq) * 1000) / 10;
    });
  }

  return {
    totalCO2EquivalentTonnes: Math.round(totalCO2Eq * 100) / 100,
    breakdown
  };
}

/**
 * Calculates Limestone (CaCO3) dissolution by Acid Rain
 * CaCO3 + H2SO4 -> CaSO4 + CO2 + H2O
 * 1 mol H2SO4 (98.08g) dissolves 1 mol CaCO3 (100.09g)
 */
export function calculateLimestoneDissolution(
  acidRainVolumeLiters: number,
  rainPH: number
): {
  hPlusMoles: number;
  calciumCarbonateDissolvedGrams: number;
  co2GasReleasedLitersSTP: number;
  rainClassificationVI: 'MƯA_AXIT_CỰC_NẶNG' | 'MƯA_AXIT_TRUNG_BÌNH' | 'MƯA_TỰ_NHIÊN_CHUẨN' | 'NƯỚC_TRUNG_TÍNH';
} {
  if (acidRainVolumeLiters <= 0) {
    throw new Error('Thể tích nước mưa phải lớn hơn 0.');
  }

  // [H+] = 10^(-pH)
  const hPlusMolarity = Math.pow(10, -rainPH);
  const hPlusMoles = hPlusMolarity * acidRainVolumeLiters;

  // CaCO3 + 2 H+ -> Ca2+ + CO2 + H2O
  // 2 mol H+ dissolves 1 mol CaCO3 (100.09 g) and releases 1 mol CO2 (24.79 L ở 25°C, 1 bar theo GDPT 2018)
  const caCO3MolesDissolved = hPlusMoles / 2.0;
  const caCO3Grams = caCO3MolesDissolved * 100.09;
  const co2Liters = caCO3MolesDissolved * 24.79; // Thể tích mol khí chuẩn 25°C, 1 bar theo GDPT 2018

  let rainClassificationVI: 'MƯA_AXIT_CỰC_NẶNG' | 'MƯA_AXIT_TRUNG_BÌNH' | 'MƯA_TỰ_NHIÊN_CHUẨN' | 'NƯỚC_TRUNG_TÍNH';
  if (rainPH < 4.0) {
    rainClassificationVI = 'MƯA_AXIT_CỰC_NẶNG';
  } else if (rainPH < 5.6) {
    rainClassificationVI = 'MƯA_AXIT_TRUNG_BÌNH';
  } else if (rainPH <= 6.0) {
    rainClassificationVI = 'MƯA_TỰ_NHIÊN_CHUẨN'; // Do hòa tan CO2 tạo H2CO3
  } else {
    rainClassificationVI = 'NƯỚC_TRUNG_TÍNH';
  }

  return {
    hPlusMoles: Number(hPlusMoles.toExponential(4)),
    calciumCarbonateDissolvedGrams: Math.round(caCO3Grams * 10000) / 10000,
    co2GasReleasedLitersSTP: Math.round(co2Liters * 10000) / 10000,
    rainClassificationVI
  };
}

/**
 * Match a chemical element/compound card with green chemistry or environmental concepts
 */
export function getMatchingGreenChemistryConcept(cardIdOrFormula: string): {
  principle?: GreenPrincipleDef;
  benchmark?: SynthesisRouteComparison;
  gas?: GreenhouseGasDef;
  damageTarget?: AcidRainDamageTarget;
  captureMethod?: CarbonCaptureMethodDef;
} | null {
  const norm = cardIdOrFormula.trim().toLowerCase();

  // CO2
  if (norm.includes('co2') || norm === 'carbon_dioxide' || norm === 'c' || norm === 'carbon') {
    return {
      principle: GREEN_CHEMISTRY_PRINCIPLES[0], // Waste prevention
      gas: GREENHOUSE_GASES.carbon_dioxide,
      captureMethod: CARBON_CAPTURE_METHODS.catalytic_emethanol
    };
  }

  // SO2 / Sulfur
  if (norm.includes('so2') || norm.includes('so3') || norm.includes('h2so4') || norm === 's' || norm === 'sulfur') {
    return {
      principle: GREEN_CHEMISTRY_PRINCIPLES[10], // Realtime analysis
      damageTarget: ACID_RAIN_TARGETS[0] // Limestone
    };
  }

  // NO2 / Nitrogen / Oxit nitơ
  if (
    norm.includes('no2') ||
    norm.includes('hno3') ||
    norm.includes('n2o') ||
    norm === 'no' ||
    norm === 'n' ||
    norm === 'nitrogen' ||
    norm.includes('nitric') ||
    norm.includes('nitơ')
  ) {
    return {
      principle: GREEN_CHEMISTRY_PRINCIPLES[8], // Catalysis
      gas: GREENHOUSE_GASES.nitrous_oxide,
      damageTarget: ACID_RAIN_TARGETS[1] // Metallic
    };
  }

  // Ethylene / Ethylene Oxide
  if (norm.includes('c2h4') || norm.includes('c2h4o') || norm.includes('oxiran') || norm.includes('ethylene')) {
    return {
      principle: GREEN_CHEMISTRY_PRINCIPLES[1], // Atom economy
      benchmark: SYNTHESIS_BENCHMARKS.ethylene_oxide
    };
  }

  // CH4 / Methane / Hydrocarbon
  if (norm.includes('ch4') || norm.includes('methane') || norm.includes('biogas')) {
    return {
      principle: GREEN_CHEMISTRY_PRINCIPLES[6], // Renewable feedstocks
      gas: GREENHOUSE_GASES.methane
    };
  }

  // Biodiesel / Ester / Lipit
  if (norm.includes('ester') || norm.includes('lipid') || norm.includes('biodiesel') || norm.includes('glycerol')) {
    return {
      principle: GREEN_CHEMISTRY_PRINCIPLES[6],
      benchmark: SYNTHESIS_BENCHMARKS.biodiesel_transesterification
    };
  }

  // Calcium / CaCO3 / Lime
  if (norm.includes('caco3') || norm.includes('ca') || norm.includes('calcium') || norm.includes('cao')) {
    return {
      principle: GREEN_CHEMISTRY_PRINCIPLES[3], // Safer chemicals
      damageTarget: ACID_RAIN_TARGETS[0],
      captureMethod: CARBON_CAPTURE_METHODS.direct_air_capture_caustic
    };
  }

  return null;
}
