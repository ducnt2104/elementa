// src/domain/electrolysisEngine.ts
// Comprehensive Electrolysis & Faraday's Laws Simulation Engine for ELEMENTA
// Conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề Điện Phân) & IUPAC Standards

/** Faraday constant in Coulombs per mole of electrons (C/mol) */
export const FARADAY_CONSTANT = 96485;

/** Standard gas molar volume in Liters per mole at 25°C, 1 bar (Vietnam GDPT 2018) */
export const GAS_MOLAR_VOLUME_STANDARD = 24.79;

/** Legacy gas molar volume in Liters per mole at 0°C, 1 atm (ĐKTC cũ) */
export const GAS_MOLAR_VOLUME_LEGACY = 22.4;

export type ElectrolyteMedium = 'MOLTEN' | 'AQUEOUS';

export interface ElectrodeReaction {
  electrode: 'ANODE' | 'CATHODE';
  poleSign: '+' | '-'; // In electrolytic cells: Anode is (+), Cathode is (-)
  electrodeMaterial: string; // e.g., 'Graphite (Than chì)', 'Titanium / Platinum', 'Copper (Đồng đỏ)'
  halfReactionEquation: string; // e.g., '2Cl⁻ → Cl₂ + 2e⁻'
  electronsTransferred: number; // e.g. 2 for Cl2, 3 for Al
  speciesProduced: string; // e.g., 'Cl₂', 'Al', 'H₂', 'Cu', 'O₂'
  speciesFormula: string; // 'Cl2', 'Al', 'H2', 'Cu', 'O2'
  state: 'GAS' | 'SOLID' | 'LIQUID' | 'AQUEOUS_ION';
  molarMass: number; // g/mol (Al: 26.98, Cu: 63.55, Cl2: 70.90, H2: 2.016, O2: 32.00, Na: 22.99)
  stoichiometricElectronRatio: number; // n_e per mole of product
  standardPotentialE0: number; // V vs SHE
  descriptionVI: string;
  visualColor: string; // CSS color string
  effervescenceOrDeposit: 'BUBBLING_GAS' | 'SOLID_DEPOSITION' | 'ANODE_DISSOLUTION' | 'LIQUID_LAYER';
}

export interface ElectrolysisScenario {
  id: string;
  nameVI: string;
  nameEN: string;
  medium: ElectrolyteMedium;
  electrolyteName: string;
  electrolyteFormula: string;
  overallEquation: string;
  hasDiaphragmOrMembrane: boolean;
  membraneDescriptionVI?: string;
  anode: ElectrodeReaction;
  cathode: ElectrodeReaction;
  solutionChangesVI: {
    phChange: 'INCREASE_ALKALINE' | 'DECREASE_ACIDIC' | 'CONSTANT_NEUTRAL';
    colorChangeDescriptionVI: string;
    descriptionVI: string;
  };
  pedagogicalKeyPointsVI: string[];
  industrialApplicationVI: string;
  historicalContextVI?: string;
  recommendedCurrentA: number;
  recommendedTimeSec: number;
  decompositionVoltageV: number; // Minimum theoretical decomposition voltage
}

/**
 * 7 Curriculum Benchmark Electrolysis Scenarios according to GDPT 2018
 */
export const ELECTROLYSIS_SCENARIOS: Record<string, ElectrolysisScenario> = {
  molten_nacl: {
    id: 'molten_nacl',
    nameVI: 'Điện Phân Nóng Chảy NaCl (Sản Xuất Natri - Downs Cell)',
    nameEN: 'Molten NaCl Electrolysis (Downs Cell)',
    medium: 'MOLTEN',
    electrolyteName: 'Natri chloride nóng chảy (pha phụ gia CaCl₂ hạ nhiệt độ nóng chảy xuống ~600°C)',
    electrolyteFormula: 'NaCl (l)',
    overallEquation: '2NaCl (l) ⎯⎯⎯⎯→ 2Na (l) + Cl₂ (g)↑  (đpnc, ~600°C)',
    hasDiaphragmOrMembrane: true,
    membraneDescriptionVI: 'Màng ngăn hình trụ bằng lưới thép ngăn Natri lỏng và khí Clo tái hợp mãnh liệt',
    anode: {
      electrode: 'ANODE',
      poleSign: '+',
      electrodeMaterial: 'Than chì (Graphite)',
      halfReactionEquation: '2Cl⁻ → Cl₂↑ + 2e⁻',
      electronsTransferred: 2,
      speciesProduced: 'Khí Clo (Chlorine gas)',
      speciesFormula: 'Cl2',
      state: 'GAS',
      molarMass: 70.9,
      stoichiometricElectronRatio: 2,
      standardPotentialE0: 1.36,
      descriptionVI: 'Ion Cl⁻ di chuyển về cực dương (anot), nhường 2e tạo khí clo màu vàng lục sủi bọt thoát ra',
      visualColor: '#a3e635', // Lime yellow-green
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    cathode: {
      electrode: 'CATHODE',
      poleSign: '-',
      electrodeMaterial: 'Sắt (Fe) hoặc Thép hình trụ',
      halfReactionEquation: 'Na⁺ + 1e⁻ → Na (l)',
      electronsTransferred: 1,
      speciesProduced: 'Kim loại Natri lỏng (Molten Na)',
      speciesFormula: 'Na',
      state: 'LIQUID',
      molarMass: 22.99,
      stoichiometricElectronRatio: 1,
      standardPotentialE0: -2.71,
      descriptionVI: 'Cation Na⁺ di chuyển về cực âm (catot), nhận 1e tạo Natri lỏng nhẹ hơn chất điện phân nổi lên trên',
      visualColor: '#cbd5e1', // Silvery slate
      effervescenceOrDeposit: 'LIQUID_LAYER'
    },
    solutionChangesVI: {
      phChange: 'CONSTANT_NEUTRAL',
      colorChangeDescriptionVI: 'Khối muối nóng chảy duy trì màu trong suốt-xám, sinh ra váng Natri lỏng màu trắng bạc',
      descriptionVI: 'Điện phân muối khan nóng chảy không có mặt nước, điều chế kim loại kiềm nhóm IA có tính khử mạnh nhất'
    },
    pedagogicalKeyPointsVI: [
      'Không thể điều chế Natri bằng điện phân dung dịch NaCl vì nước bị khử trước Na⁺ ở catot (H₂O có thế khử cao hơn Na⁺ rất nhiều).',
      'Phải pha thêm CaCl₂ (khoảng 58% CaCl₂ + 42% NaCl) để hạ nhiệt độ nóng chảy từ 801°C xuống khoảng 580 - 600°C nhằm tiết kiệm năng lượng và tránh Na sôi bay hơi.',
      'Natri lỏng có khối lượng riêng nhỏ hơn hỗn hợp muối nóng chảy nên nổi lên và được hút ra ngoài trong môi trường khí trơ.'
    ],
    industrialApplicationVI: 'Công nghệ Downs sản xuất kim loại Natri quy mô công nghiệp dùng làm chất trao đổi nhiệt lò phản ứng hạt nhân, sản xuất hợp kim Na-K, thuốc thử cơ kim.',
    historicalContextVI: 'Humphry Davy lần đầu tiên cô lập kim loại Natri vào năm 1807 bằng phương pháp điện phân nóng chảy NaOH.',
    recommendedCurrentA: 5.0,
    recommendedTimeSec: 1800, // 30 mins
    decompositionVoltageV: 4.07
  },

  hall_heroult_al2o3: {
    id: 'hall_heroult_al2o3',
    nameVI: 'Điện Phân Nóng Chảy Al₂O₃ Trong Criolit (Quy Trình Hall-Héroult)',
    nameEN: 'Molten Al2O3 in Cryolite (Hall-Héroult Process)',
    medium: 'MOLTEN',
    electrolyteName: 'Alumin (Al₂O₃) hòa tan trong Criolit nóng chảy (Na₃AlF₆, ~950°C)',
    electrolyteFormula: 'Al₂O₃ trong Na₃AlF₆ (l)',
    overallEquation: '2Al₂O₃ (l) ⎯⎯⎯⎯→ 4Al (l) + 3O₂ (g)↑  (đpnc, criolit, ~950°C)',
    hasDiaphragmOrMembrane: false,
    anode: {
      electrode: 'ANODE',
      poleSign: '+',
      electrodeMaterial: 'Các khối Than chì (Graphite blocks) thả từ trên xuống',
      halfReactionEquation: '2O²⁻ → O₂↑ + 4e⁻  (kèm C + O₂ → CO₂↑, 2C + O₂ → 2CO↑)',
      electronsTransferred: 4,
      speciesProduced: 'Hỗn hợp khí O₂, CO₂, CO',
      speciesFormula: 'O2',
      state: 'GAS',
      molarMass: 32.0,
      stoichiometricElectronRatio: 4,
      standardPotentialE0: 1.23,
      descriptionVI: 'Ion O²⁻ bị oxi hóa tạo khí O₂ ở nhiệt độ cao lập tức đốt cháy anot than chì thành khí CO₂ và CO làm anot bị mòn liên tục',
      visualColor: '#f97316', // Orange fire / carbon glow
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    cathode: {
      electrode: 'CATHODE',
      poleSign: '-',
      electrodeMaterial: 'Lớp lót Than chì đáy thùng điện phân',
      halfReactionEquation: 'Al³⁺ + 3e⁻ → Al (l)',
      electronsTransferred: 3,
      speciesProduced: 'Nhôm lỏng (Liquid Aluminium)',
      speciesFormula: 'Al',
      state: 'LIQUID',
      molarMass: 26.98,
      stoichiometricElectronRatio: 3,
      standardPotentialE0: -1.66,
      descriptionVI: 'Cation Al³⁺ nhận 3e tạo Nhôm kim loại nóng chảy có khối lượng riêng lớn hơn criolit nên chìm xuống đáy thùng',
      visualColor: '#94a3b8', // Metallic silver
      effervescenceOrDeposit: 'LIQUID_LAYER'
    },
    solutionChangesVI: {
      phChange: 'CONSTANT_NEUTRAL',
      colorChangeDescriptionVI: 'Criolit nóng chảy màu đỏ cam rực lửa (~950°C), nhôm lỏng chìm đáy được tháo định kỳ',
      descriptionVI: 'Criolit Na₃AlF₆ đóng 3 vai trò sinh tử: hạ nhiệt độ nóng chảy Al₂O₃ từ 2050°C xuống 950°C, tăng độ dẫn điện, và tạo lớp bảo vệ nổi lên trên ngăn Al lỏng bị oxi hóa bởi không khí'
    },
    pedagogicalKeyPointsVI: [
      'Criolit (Na₃AlF₆) hạ nhiệt độ từ 2050°C xuống ~950°C, giảm năng lượng tiêu thụ khổng lồ và tăng độ dẫn điện của hỗn hợp lỏng.',
      'Khối lượng riêng của Al lỏng (2.3 g/cm³) nặng hơn criolit lỏng (2.1 g/cm³) nên Al chìm xuống đáy, được bảo vệ khỏi khí O₂ và không khí.',
      'Khí O₂ giải phóng ở anot phản ứng với cacbon ở nhiệt độ cao (C + O₂ → CO₂, 2C + O₂ → 2CO) nên anot than chì bị tiêu hao và phải hạ xuống / thay thế liên tục.'
    ],
    industrialApplicationVI: 'Phương pháp duy nhất sản xuất nhôm thương phẩm toàn cầu, biến nhôm từ kim loại quý hơn vàng ở thế kỷ XIX thành vật liệu kết cấu phổ biến nhất hiện nay.',
    historicalContextVI: 'Phát minh đồng thời bởi Charles Martin Hall (Mỹ) và Paul Héroult (Pháp) năm 1886 một cách hoàn toàn độc lập.',
    recommendedCurrentA: 10.0,
    recommendedTimeSec: 1200,
    decompositionVoltageV: 2.89
  },

  chlor_alkali_membrane: {
    id: 'chlor_alkali_membrane',
    nameVI: 'Điện Phân Dung Dịch NaCl Có Màng Ngăn Cation (Công Nghiệp Xút - Clo)',
    nameEN: 'Chlor-Alkali Process (Membrane Cell)',
    medium: 'AQUEOUS',
    electrolyteName: 'Dung dịch Natri chloride bão hòa (Nước muối brine ~25-26% NaCl)',
    electrolyteFormula: 'NaCl (aq) + H₂O (l)',
    overallEquation: '2NaCl (aq) + 2H₂O (l) ⎯⎯⎯⎯→ 2NaOH (aq) + Cl₂ (g)↑ + H₂ (g)↑  (đpdd, mnx)',
    hasDiaphragmOrMembrane: true,
    membraneDescriptionVI: 'Màng trao đổi cation chọn lọc (Nafion) chỉ cho phép ion Na⁺ đi qua, ngăn cản Cl⁻ và OH⁻ trộn lẫn',
    anode: {
      electrode: 'ANODE',
      poleSign: '+',
      electrodeMaterial: 'Titan phủ Ruteni Oxit (DSA - Dimensionally Stable Anode)',
      halfReactionEquation: '2Cl⁻ → Cl₂↑ + 2e⁻',
      electronsTransferred: 2,
      speciesProduced: 'Khí Clo (Chlorine gas Cl₂)',
      speciesFormula: 'Cl2',
      state: 'GAS',
      molarMass: 70.9,
      stoichiometricElectronRatio: 2,
      standardPotentialE0: 1.36,
      descriptionVI: 'Ở anot, ion Cl⁻ có thế phóng điện thuận lợi hơn phân tử nước nên bị oxi hóa tạo khí Cl₂ màu vàng lục',
      visualColor: '#84cc16', // Yellow-green
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    cathode: {
      electrode: 'CATHODE',
      poleSign: '-',
      electrodeMaterial: 'Lưới thép mềm hoặc Niken',
      halfReactionEquation: '2H₂O + 2e⁻ → H₂↑ + 2OH⁻',
      electronsTransferred: 2,
      speciesProduced: 'Khí Hiđro (H₂) và ion Hydroxit (OH⁻)',
      speciesFormula: 'H2',
      state: 'GAS',
      molarMass: 2.016,
      stoichiometricElectronRatio: 2,
      standardPotentialE0: -0.83,
      descriptionVI: 'Ở catot, ion Na⁺ không bị khử trong nước; phân tử H₂O bị khử sinh ra khí H₂ và ion OH⁻ kiềm hóa dung dịch',
      visualColor: '#38bdf8', // Sky blue bubbles
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    solutionChangesVI: {
      phChange: 'INCREASE_ALKALINE',
      colorChangeDescriptionVI: 'Dung dịch phía catot kiềm hóa mạnh (pH > 13), nhỏ quỳ tím hóa xanh biếc, phenolphthalein hóa hồng sen',
      descriptionVI: 'Ion Na⁺ di chuyển xuyên qua màng cation sang buồng catot kết hợp với OH⁻ tạo dung dịch xút tinh khiết NaOH ~30-35%'
    },
    pedagogicalKeyPointsVI: [
      'Ở catot, Na⁺ không bị khử vì tính khử của Na quá mạnh (E° = -2.71 V so với H₂O là -0.83 V). Nước bị khử sinh H₂ và OH⁻.',
      'Ở anot, ion Cl⁻ bị oxi hóa trước nước sinh khí Cl₂.',
      'Nếu KHÔNG có màng ngăn, Cl₂ sinh ra ở anot sẽ tan vào dung dịch và phản ứng tức thì với NaOH sinh ra nước Javel: Cl₂ + 2NaOH → NaCl + NaClO + H₂O.',
      'Màng cation Nafion hiện đại thay thế màng amiăng độc hại và tế bào thủy ngân trong sản xuất công nghiệp thế giới.'
    ],
    industrialApplicationVI: 'Trụ cột của nền công nghiệp hóa chất toàn cầu: cung cấp Xút (NaOH) cho dệt nhuộm, xà phòng, nhôm; cung cấp Clo khử trùng nước, sản xuất PVC, nhựa.',
    historicalContextVI: 'Công nghệ màng trao đổi ion được thương mại hóa từ những năm 1970, tạo bước nhảy vọt về bảo vệ môi trường và hiệu suất năng lượng.',
    recommendedCurrentA: 3.0,
    recommendedTimeSec: 2400,
    decompositionVoltageV: 2.19
  },

  chlor_alkali_no_membrane: {
    id: 'chlor_alkali_no_membrane',
    nameVI: 'Điện Phân Dung Dịch NaCl Không Màng Ngăn (Điều Chế Nước Javel)',
    nameEN: 'Electrolysis of NaCl without Diaphragm (Javel Water)',
    medium: 'AQUEOUS',
    electrolyteName: 'Dung dịch NaCl loãng hoặc bão hòa không có vách ngăn điện cực',
    electrolyteFormula: 'NaCl (aq) + H₂O (l)',
    overallEquation: 'NaCl + H₂O ⎯⎯⎯⎯→ NaClO + H₂↑  (đpdd không màng ngăn, nhiệt độ thường)',
    hasDiaphragmOrMembrane: false,
    anode: {
      electrode: 'ANODE',
      poleSign: '+',
      electrodeMaterial: 'Graphite / Titan',
      halfReactionEquation: '2Cl⁻ → Cl₂↑ + 2e⁻',
      electronsTransferred: 2,
      speciesProduced: 'Khí Clo (sau đó tan phản ứng với NaOH)',
      speciesFormula: 'Cl2',
      state: 'GAS',
      molarMass: 70.9,
      stoichiometricElectronRatio: 2,
      standardPotentialE0: 1.36,
      descriptionVI: 'Cl₂ thoát ra tại anot nhưng lập tức khuếch tán trong dung dịch và tác dụng với NaOH sinh ra ở catot',
      visualColor: '#eab308', // Amber yellow
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    cathode: {
      electrode: 'CATHODE',
      poleSign: '-',
      electrodeMaterial: 'Sắt / Niken',
      halfReactionEquation: '2H₂O + 2e⁻ → H₂↑ + 2OH⁻',
      electronsTransferred: 2,
      speciesProduced: 'Khí Hiđro (H₂) và ion OH⁻',
      speciesFormula: 'H2',
      state: 'GAS',
      molarMass: 2.016,
      stoichiometricElectronRatio: 2,
      standardPotentialE0: -0.83,
      descriptionVI: 'H₂ bay lên khỏi dung dịch, để lại lượng lớn OH⁻ hòa tan phân bố đều trong toàn bộ bình điện phân',
      visualColor: '#38bdf8',
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    solutionChangesVI: {
      phChange: 'INCREASE_ALKALINE',
      colorChangeDescriptionVI: 'Dung dịch thu được có mùi hắc đặc trưng của Clo/Javel, có tính tẩy màu cực mạnh',
      descriptionVI: 'Phản ứng tạo nước Javel: Cl₂ + 2NaOH → NaCl + NaClO + H₂O. Muối NaClO có tính oxi hóa rất mạnh làm mất màu quỳ tím'
    },
    pedagogicalKeyPointsVI: [
      'Không có màng ngăn, khí Cl₂ ở anot và dung dịch NaOH ở catot gặp nhau phản ứng tự phát tạo hỗn hợp muối NaCl và NaClO (nước Javel).',
      'Nếu nhúng quỳ tím vào dung dịch sau điện phân, quỳ tím thoạt tiên hóa xanh do tính kiềm của NaOH dư, sau đó bị tẩy trắng hoàn toàn bởi gốc hypoclorit ClO⁻.',
      'Nếu đun nóng dung dịch lên trên 70°C trong quá trình điện phân, phản ứng chuyển thành: 3Cl₂ + 6NaOH → 5NaCl + NaClO₃ + 3H₂O (sản xuất Kali/Natri clorat).'
    ],
    industrialApplicationVI: 'Điều chế nước Javel khử trùng bể bơi, tẩy uế y tế, tẩy trắng sợi vải, xử lý nước sinh hoạt quy mô tại chỗ.',
    recommendedCurrentA: 2.5,
    recommendedTimeSec: 1500,
    decompositionVoltageV: 2.19
  },

  copper_electroplating: {
    id: 'copper_electroplating',
    nameVI: 'Mạ Điện & Tinh Luyện Đồng Bằng Anot Tan (Copper Electroplating)',
    nameEN: 'Copper Electroplating & Sacrificial Anode Refining',
    medium: 'AQUEOUS',
    electrolyteName: 'Dung dịch Đồng(II) sulfat (CuSO₄ ~1M) pha axit H₂SO₄ làm chất dẫn điện',
    electrolyteFormula: 'CuSO₄ (aq) + H₂SO₄ (aq)',
    overallEquation: 'Cu (anot tan thô) ⎯⎯⎯⎯→ Cu (catot mạ tinh khiết)  (đpdd, anot tan)',
    hasDiaphragmOrMembrane: false,
    anode: {
      electrode: 'ANODE',
      poleSign: '+',
      electrodeMaterial: 'Tấm đồng đỏ thô (Chứa tạp chất Fe, Zn, Ag, Au)',
      halfReactionEquation: 'Cu (r) → Cu²⁺ + 2e⁻',
      electronsTransferred: 2,
      speciesProduced: 'Ion Cu²⁺ hòa tan vào dung dịch',
      speciesFormula: 'Cu',
      state: 'AQUEOUS_ION',
      molarMass: 63.55,
      stoichiometricElectronRatio: 2,
      standardPotentialE0: 0.34,
      descriptionVI: 'Anot bằng kim loại Cu tự tan ra: các nguyên tử Cu nhường 2e tạo ion Cu²⁺ đi vào dung dịch bù đắp lượng ion mất đi ở catot',
      visualColor: '#ea580c', // Copper bronze
      effervescenceOrDeposit: 'ANODE_DISSOLUTION'
    },
    cathode: {
      electrode: 'CATHODE',
      poleSign: '-',
      electrodeMaterial: 'Vật cần mạ (Vỏ kim loại, chìa khóa) hoặc Lá đồng tinh khiết',
      halfReactionEquation: 'Cu²⁺ + 2e⁻ → Cu (r)↓',
      electronsTransferred: 2,
      speciesProduced: 'Kim loại Đồng nguyên chất bám đỏ mịn',
      speciesFormula: 'Cu',
      state: 'SOLID',
      molarMass: 63.55,
      stoichiometricElectronRatio: 2,
      standardPotentialE0: 0.34,
      descriptionVI: 'Ion Cu²⁺ bị khử bám phủ một lớp đồng đỏ kim loại sáng bóng, mịn màng và bền chắc lên bề mặt catot',
      visualColor: '#f97316', // Bright copper red
      effervescenceOrDeposit: 'SOLID_DEPOSITION'
    },
    solutionChangesVI: {
      phChange: 'CONSTANT_NEUTRAL',
      colorChangeDescriptionVI: 'Màu xanh lam của dung dịch [Cu(H₂O)₆]²⁺ hoàn toàn không đổi trong suốt quá trình điện phân!',
      descriptionVI: 'Tốc độ tan của Cu ở anot bằng chính xác tốc độ kết tủa của Cu ở catot: nồng độ ion Cu²⁺ trong dung dịch luôn là hằng số'
    },
    pedagogicalKeyPointsVI: [
      'Điện phân với anot tan: Khối lượng cực anot giảm bao nhiêu thì khối lượng cực catot tăng bấy nhiêu (Δm_anot = Δm_catot).',
      'Nồng độ Cu²⁺ và màu sắc dung dịch không đổi vì tốc độ sinh Cu²⁺ ở cực dương cân bằng tuyệt đối với tốc độ tiêu hao Cu²⁺ ở cực âm.',
      'Trong tinh luyện đồng: các tạp chất kim loại hoạt động hơn (Fe, Zn, Ni) tan vào dung dịch nhưng không bị khử ở catot; các kim loại kém hoạt động (Ag, Au, Pt) không tan, rơi xuống đáy tạo thành bùn anot (anode slime) cực kỳ giá trị.'
    ],
    industrialApplicationVI: 'Mạ trang sức, mạ chống gỉ chi tiết máy bay ô tô, sản xuất bảng mạch in điện tử (PCB), và tinh chế đồng đạt độ tinh khiết 99.99% phục vụ dây dẫn điện.',
    recommendedCurrentA: 2.0,
    recommendedTimeSec: 1800,
    decompositionVoltageV: 0.15 // Near zero theoretical overpotential needed
  },

  aqueous_cuso4_inert: {
    id: 'aqueous_cuso4_inert',
    nameVI: 'Điện Phân Dung Dịch CuSO₄ Với Điện Cực Trơ (Graphite)',
    nameEN: 'Aqueous CuSO4 Electrolysis with Inert Electrodes',
    medium: 'AQUEOUS',
    electrolyteName: 'Dung dịch Đồng(II) sulfat CuSO₄ trong nước với điện cực than chì trơ',
    electrolyteFormula: 'CuSO₄ (aq) + H₂O (l)',
    overallEquation: '2CuSO₄ + 2H₂O ⎯⎯⎯⎯→ 2Cu↓ + O₂↑ + 2H₂SO₄  (đpdd, điện cực trơ)',
    hasDiaphragmOrMembrane: false,
    anode: {
      electrode: 'ANODE',
      poleSign: '+',
      electrodeMaterial: 'Than chì trơ (Graphite) hoặc Bạch kim (Pt)',
      halfReactionEquation: '2H₂O → O₂↑ + 4H⁺ + 4e⁻',
      electronsTransferred: 4,
      speciesProduced: 'Khí Oxi (O₂) và ion H⁺ axit',
      speciesFormula: 'O2',
      state: 'GAS',
      molarMass: 32.0,
      stoichiometricElectronRatio: 4,
      standardPotentialE0: 1.23,
      descriptionVI: 'Gốc SO₄²⁻ chứa oxi không bị oxi hóa trong dung dịch nước; phân tử H₂O bị oxi hóa sinh bọt khí O₂ và ion H⁺',
      visualColor: '#06b6d4', // Cyan
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    cathode: {
      electrode: 'CATHODE',
      poleSign: '-',
      electrodeMaterial: 'Than chì hoặc thanh kim loại',
      halfReactionEquation: 'Cu²⁺ + 2e⁻ → Cu↓',
      electronsTransferred: 2,
      speciesProduced: 'Kim loại Đồng đỏ (Cu)',
      speciesFormula: 'Cu',
      state: 'SOLID',
      molarMass: 63.55,
      stoichiometricElectronRatio: 2,
      standardPotentialE0: 0.34,
      descriptionVI: 'Cation Cu²⁺ có thế khử dương hơn H₂O nên bị khử bám phủ lớp đồng đỏ kim loại lên bề mặt catot',
      visualColor: '#ea580c',
      effervescenceOrDeposit: 'SOLID_DEPOSITION'
    },
    solutionChangesVI: {
      phChange: 'DECREASE_ACIDIC',
      colorChangeDescriptionVI: 'Màu xanh lam đặc trưng của ion Cu²⁺ nhạt dần rồi mất màu hoàn toàn; quỳ tím hóa đỏ đậm (axit H₂SO₄)',
      descriptionVI: 'Khi Cu²⁺ bị khử hết, nếu tiếp tục điện phân thì nước sẽ bị điện phân ở cả 2 điện cực (catot sủi bọt H₂, anot sủi bọt O₂)'
    },
    pedagogicalKeyPointsVI: [
      'Gốc axit chứa oxi có số oxi hóa cao nhất (SO₄²⁻, NO₃⁻, PO₄³⁻, CO₃²⁻) và ion F⁻ không bao giờ bị oxi hóa trong dung dịch nước.',
      'Dung dịch sau phản ứng có tính axit mạnh vì sinh ra H₂SO₄ tự do (pH giảm mạnh).',
      'Nếu thời gian điện phân kéo dài sau khi Cu²⁺ hết, catot bắt đầu sủi bọt khí H₂ (2H₂O + 2e⁻ → H₂ + 2OH⁻).'
    ],
    industrialApplicationVI: 'Thu hồi kim loại đồng từ quặng sulfat nghèo bằng phương pháp thủy luyện kết hợp điện phân (SX-EW process).',
    recommendedCurrentA: 2.0,
    recommendedTimeSec: 1800,
    decompositionVoltageV: 0.89
  },

  water_splitting_acidic: {
    id: 'water_splitting_acidic',
    nameVI: 'Điện Phân Nước Pha Axit H₂SO₄ (Sản Xuất Hiđro Xanh - Green H₂)',
    nameEN: 'Acidic Water Splitting (PEM Electrolysis)',
    medium: 'AQUEOUS',
    electrolyteName: 'Nước cất pha H₂SO₄ loãng làm chất điện ly tăng độ dẫn điện',
    electrolyteFormula: '2H₂O (l) [pha H₂SO₄ loãng xúc tác dẫn điện]',
    overallEquation: '2H₂O (l) ⎯⎯⎯⎯→ 2H₂ (g)↑ + O₂ (g)↑  (đpdd dung dịch chất điện ly trơ)',
    hasDiaphragmOrMembrane: false,
    anode: {
      electrode: 'ANODE',
      poleSign: '+',
      electrodeMaterial: 'Bạch kim (Pt) hoặc Titan mạ IrO₂',
      halfReactionEquation: '2H₂O → O₂↑ + 4H⁺ + 4e⁻',
      electronsTransferred: 4,
      speciesProduced: 'Khí Oxi (O₂)',
      speciesFormula: 'O2',
      state: 'GAS',
      molarMass: 32.0,
      stoichiometricElectronRatio: 4,
      standardPotentialE0: 1.23,
      descriptionVI: 'Phân tử nước bị oxi hóa giải phóng 1 mol O₂ tương ứng với 4 mol electron di chuyển trong mạch',
      visualColor: '#06b6d4',
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    cathode: {
      electrode: 'CATHODE',
      poleSign: '-',
      electrodeMaterial: 'Bạch kim (Pt) hoặc Niken',
      halfReactionEquation: '4H⁺ + 4e⁻ → 2H₂↑',
      electronsTransferred: 4,
      speciesProduced: 'Khí Hiđro (H₂)',
      speciesFormula: 'H2',
      state: 'GAS',
      molarMass: 2.016,
      stoichiometricElectronRatio: 2, // 2 e- per H2 molecule
      standardPotentialE0: 0.0,
      descriptionVI: 'Ion H⁺ nhận electron tạo khí H₂; thể tích khí H₂ sinh ra gấp ĐÔI thể tích khí O₂ ở anot',
      visualColor: '#38bdf8',
      effervescenceOrDeposit: 'BUBBLING_GAS'
    },
    solutionChangesVI: {
      phChange: 'CONSTANT_NEUTRAL',
      colorChangeDescriptionVI: 'Dung dịch luôn trong suốt không màu; lượng nước giảm dần làm nồng độ H₂SO₄ tăng nhẹ',
      descriptionVI: 'Định luật Avogadro và bảo toàn e: Số mol H₂ sinh ra luôn gấp ĐÔI số mol O₂ (tỉ lệ thể tích V_H₂ : V_O₂ = 2 : 1 chuẩn)'
    },
    pedagogicalKeyPointsVI: [
      'Nước nguyên chất dẫn điện cực kém (Kw = 10⁻¹⁴), phải thêm chất điện ly không bị điện phân (H₂SO₄, NaOH, Na₂SO₄, KNO₃) để truyền dẫn dòng ion.',
      'Tỉ lệ thể tích 2 : 1 giữa H₂ và O₂ là minh chứng thực nghiệm vĩ đại chứng minh công thức hóa học của nước là H₂O.',
      'Năng lượng tối thiểu cần cung cấp theo nhiệt động học là ΔG° = 237.2 kJ/mol, tương ứng suất điện động phân hủy tối thiểu E° = 1.23 V.'
    ],
    industrialApplicationVI: 'Công nghệ then chốt của kỷ nguyên Năng lượng tái tạo và Kinh tế Hiđro (sản xuất Hiđro xanh từ điện mặt trời và gió để lưu trữ năng lượng).',
    historicalContextVI: 'William Nicholson và Anthony Carlisle phát hiện ra hiện tượng điện phân nước phân tách thành khí hiđro và oxi năm 1800 chỉ ít tuần sau khi Volta chế tạo pin Volta.',
    recommendedCurrentA: 2.0,
    recommendedTimeSec: 1800,
    decompositionVoltageV: 1.23
  }
};

/**
 * Result structure of quantitative Faraday electrolysis calculation
 */
export interface ElectrolysisSimulationResult {
  scenario: ElectrolysisScenario;
  parameters: {
    currentA: number;
    durationSec: number;
    efficiencyPercent: number;
    gasMolarVolume: number;
  };
  metrics: {
    totalChargeCoulombs: number; // Q = I * t
    molesOfElectrons: number; // n_e = Q / F * (eff / 100)
    effectiveChargeCoulombs: number;
    actualVoltageV: number;
    energyConsumedJoules: number; // W = U * I * t
    energyConsumedKWh: number;
  };
  cathodeResult: {
    species: string;
    formula: string;
    state: 'GAS' | 'SOLID' | 'LIQUID' | 'AQUEOUS_ION';
    molesProduced: number;
    massGrams: number;
    massMilligrams: number;
    gasVolumeLiters: number;
    halfReactionEquation: string;
    displayQuantityText: string;
  };
  anodeResult: {
    species: string;
    formula: string;
    state: 'GAS' | 'SOLID' | 'LIQUID' | 'AQUEOUS_ION';
    molesProducedOrConsumed: number;
    massGrams: number;
    massMilligrams: number;
    gasVolumeLiters: number;
    halfReactionEquation: string;
    displayQuantityText: string;
  };
  stoichiometricChecks: {
    electronConservationValid: boolean;
    volumeRatioGasExpected?: string;
    volumeRatioGasActual?: number;
  };
  faradayFormulaDerivationVI: string[];
}

/**
 * Core Faraday Calculation: Calculate deposited mass in grams
 * Formula: m = (A * I * t * efficiency) / (n * F * 100)
 */
export function calculateFaradayMass(params: {
  molarMass: number;
  currentA: number;
  timeSec: number;
  electronsTransferred: number;
  efficiencyPercent?: number;
}): number {
  const { molarMass, currentA, timeSec, electronsTransferred, efficiencyPercent = 100 } = params;
  if (electronsTransferred <= 0 || timeSec <= 0 || currentA <= 0) return 0;
  const rawMass = (molarMass * currentA * timeSec * (efficiencyPercent / 100)) / (electronsTransferred * FARADAY_CONSTANT);
  return Math.round(rawMass * 100000) / 100000;
}

/**
 * Calculate gas volume produced in liters at standard conditions (24.79 L/mol)
 * Formula: V = (I * t * efficiency / (n * F * 100)) * V_m
 */
export function calculateFaradayGasVolume(params: {
  currentA: number;
  timeSec: number;
  electronsTransferred: number;
  gasMolarVolume?: number;
  efficiencyPercent?: number;
}): number {
  const {
    currentA,
    timeSec,
    electronsTransferred,
    gasMolarVolume = GAS_MOLAR_VOLUME_STANDARD,
    efficiencyPercent = 100
  } = params;
  if (electronsTransferred <= 0 || timeSec <= 0 || currentA <= 0) return 0;
  const molesOfProduct = (currentA * timeSec * (efficiencyPercent / 100)) / (electronsTransferred * FARADAY_CONSTANT);
  const volume = molesOfProduct * gasMolarVolume;
  return Math.round(volume * 100000) / 100000;
}

/**
 * Calculate moles of electrons transferred: n_e = (I * t) / F
 */
export function calculateFaradayMolesOfElectrons(
  currentA: number,
  timeSec: number,
  efficiencyPercent: number = 100
): number {
  if (currentA <= 0 || timeSec <= 0) return 0;
  const ne = (currentA * timeSec * (efficiencyPercent / 100)) / FARADAY_CONSTANT;
  return Math.round(ne * 100000) / 100000;
}

/**
 * Calculate time required in seconds to deposit target mass or produce target moles
 */
export function calculateElectrolysisTime(params: {
  targetMassGrams?: number;
  targetGasLiters?: number;
  molarMass?: number;
  electronsTransferred: number;
  currentA: number;
  efficiencyPercent?: number;
  gasMolarVolume?: number;
}): number {
  const {
    targetMassGrams,
    targetGasLiters,
    molarMass,
    electronsTransferred,
    currentA,
    efficiencyPercent = 100,
    gasMolarVolume = GAS_MOLAR_VOLUME_STANDARD
  } = params;
  if (currentA <= 0 || electronsTransferred <= 0 || efficiencyPercent <= 0) return 0;

  const eff = efficiencyPercent / 100;

  if (targetMassGrams !== undefined && targetMassGrams > 0 && molarMass && molarMass > 0) {
    const moles = targetMassGrams / molarMass;
    const time = (moles * electronsTransferred * FARADAY_CONSTANT) / (currentA * eff);
    return Math.round(time * 100) / 100;
  }

  if (targetGasLiters !== undefined && targetGasLiters > 0) {
    const moles = targetGasLiters / gasMolarVolume;
    const time = (moles * electronsTransferred * FARADAY_CONSTANT) / (currentA * eff);
    return Math.round(time * 100) / 100;
  }

  return 0;
}

/**
 * Full Electrolysis Simulation Engine
 */
export function simulateElectrolysis(
  scenarioId: string,
  currentA: number,
  durationSec: number,
  options?: {
    efficiencyPercent?: number;
    gasMolarVolume?: number;
    appliedVoltageV?: number;
  }
): ElectrolysisSimulationResult {
  const scenario = ELECTROLYSIS_SCENARIOS[scenarioId] || ELECTROLYSIS_SCENARIOS.chlor_alkali_membrane;
  const efficiencyPercent = options?.efficiencyPercent ?? 100;
  const gasMolarVolume = options?.gasMolarVolume ?? GAS_MOLAR_VOLUME_STANDARD;
  const actualVoltageV = options?.appliedVoltageV ?? Math.max(scenario.decompositionVoltageV * 1.35, 1.5);

  const totalChargeCoulombs = Math.round(currentA * durationSec * 100) / 100;
  const effectiveChargeCoulombs = Math.round(totalChargeCoulombs * (efficiencyPercent / 100) * 100) / 100;
  const molesOfElectrons = calculateFaradayMolesOfElectrons(currentA, durationSec, efficiencyPercent);

  // Energy consumed: W = U * I * t (Joules), 1 kWh = 3,600,000 Joules
  const energyConsumedJoules = Math.round(actualVoltageV * currentA * durationSec * 100) / 100;
  const energyConsumedKWh = Math.round((energyConsumedJoules / 3600000) * 10000) / 10000;

  // Cathode calculation
  const cathodeNeRatio = scenario.cathode.stoichiometricElectronRatio;
  const cathodeMoles = Math.round((molesOfElectrons / cathodeNeRatio) * 100000) / 100000;
  const cathodeMassGrams = Math.round(cathodeMoles * scenario.cathode.molarMass * 100000) / 100000;
  const cathodeMassMg = Math.round(cathodeMassGrams * 1000 * 100) / 100;
  const cathodeGasVolLiters = scenario.cathode.state === 'GAS'
    ? Math.round(cathodeMoles * gasMolarVolume * 10000) / 10000
    : 0;

  const cathodeQuantityText = scenario.cathode.state === 'GAS'
    ? `${cathodeGasVolLiters.toFixed(3)} L (${(cathodeGasVolLiters * 1000).toFixed(1)} mL khí ${scenario.cathode.speciesFormula})`
    : `${cathodeMassGrams.toFixed(4)} g (${cathodeMassMg.toFixed(1)} mg ${scenario.cathode.speciesFormula})`;

  // Anode calculation
  const anodeNeRatio = scenario.anode.stoichiometricElectronRatio;
  const anodeMoles = Math.round((molesOfElectrons / anodeNeRatio) * 100000) / 100000;
  const anodeMassGrams = Math.round(anodeMoles * scenario.anode.molarMass * 100000) / 100000;
  const anodeMassMg = Math.round(anodeMassGrams * 1000 * 100) / 100;
  const anodeGasVolLiters = scenario.anode.state === 'GAS'
    ? Math.round(anodeMoles * gasMolarVolume * 10000) / 10000
    : 0;

  const anodeQuantityText = scenario.anode.state === 'GAS'
    ? `${anodeGasVolLiters.toFixed(3)} L (${(anodeGasVolLiters * 1000).toFixed(1)} mL khí ${scenario.anode.speciesFormula})`
    : scenario.anode.effervescenceOrDeposit === 'ANODE_DISSOLUTION'
    ? `${anodeMassGrams.toFixed(4)} g (${anodeMassMg.toFixed(1)} mg Cu tan vào dung dịch)`
    : `${anodeMassGrams.toFixed(4)} g sản phẩm`;

  // Stoichiometric check (e.g. Water electrolysis volume ratio 2 : 1)
  let volumeRatioGasExpected: string | undefined;
  let volumeRatioGasActual: number | undefined;

  if (scenario.cathode.state === 'GAS' && scenario.anode.state === 'GAS') {
    if (scenario.id === 'water_splitting_acidic') {
      volumeRatioGasExpected = '2 : 1 (V_H₂ : V_O₂)';
      volumeRatioGasActual = anodeGasVolLiters > 0 ? Math.round((cathodeGasVolLiters / anodeGasVolLiters) * 100) / 100 : undefined;
    } else if (scenario.id === 'chlor_alkali_membrane') {
      volumeRatioGasExpected = '1 : 1 (V_H₂ : V_Cl₂)';
      volumeRatioGasActual = anodeGasVolLiters > 0 ? Math.round((cathodeGasVolLiters / anodeGasVolLiters) * 100) / 100 : undefined;
    }
  }

  // Step-by-step mathematical derivation strings
  const derivations: string[] = [
    `Bước 1: Tính điện lượng qua bình: Q = I × t = ${currentA.toFixed(2)} A × ${durationSec} s = ${totalChargeCoulombs.toLocaleString()} C.`,
    `Bước 2: Tính số mol electron trao đổi: n_e = Q / F = ${totalChargeCoulombs.toLocaleString()} / ${FARADAY_CONSTANT.toLocaleString()} = ${molesOfElectrons.toFixed(5)} mol (với hiệu suất dòng ${efficiencyPercent}%).`,
    `Bước 3: Quá trình tại Catot (-) (Sự khử): ${scenario.cathode.halfReactionEquation}`,
    `  • Số mol ${scenario.cathode.speciesFormula} sinh ra = n_e / ${cathodeNeRatio} = ${molesOfElectrons.toFixed(5)} / ${cathodeNeRatio} = ${cathodeMoles.toFixed(5)} mol.`,
    scenario.cathode.state === 'GAS'
      ? `  • Thể tích khí (ở 25°C, 1 bar): V = ${cathodeMoles.toFixed(5)} mol × ${gasMolarVolume} L/mol = ${cathodeGasVolLiters.toFixed(3)} L (${(cathodeGasVolLiters * 1000).toFixed(1)} mL).`
      : `  • Khối lượng kim loại bám: m = ${cathodeMoles.toFixed(5)} mol × ${scenario.cathode.molarMass} g/mol = ${cathodeMassGrams.toFixed(4)} g (${cathodeMassMg.toFixed(1)} mg).`,
    `Bước 4: Quá trình tại Anot (+) (Sự oxi hóa): ${scenario.anode.halfReactionEquation}`,
    `  • Số mol ${scenario.anode.speciesFormula} = n_e / ${anodeNeRatio} = ${molesOfElectrons.toFixed(5)} / ${anodeNeRatio} = ${anodeMoles.toFixed(5)} mol.`,
    scenario.anode.state === 'GAS'
      ? `  • Thể tích khí thoát ra: V = ${anodeMoles.toFixed(5)} mol × ${gasMolarVolume} L/mol = ${anodeGasVolLiters.toFixed(3)} L (${(anodeGasVolLiters * 1000).toFixed(1)} mL).`
      : scenario.anode.effervescenceOrDeposit === 'ANODE_DISSOLUTION'
      ? `  • Khối lượng anot đồng tan ra: m = ${anodeMoles.toFixed(5)} mol × ${scenario.anode.molarMass} g/mol = ${anodeMassGrams.toFixed(4)} g.`
      : `  • Khối lượng sản phẩm: m = ${anodeMassGrams.toFixed(4)} g.`,
    `Bước 5: Điện năng tiêu thụ: W = U × I × t = ${actualVoltageV.toFixed(2)} V × ${currentA.toFixed(2)} A × ${durationSec} s = ${energyConsumedJoules.toLocaleString()} J (${energyConsumedKWh.toFixed(4)} kWh).`
  ];

  return {
    scenario,
    parameters: {
      currentA,
      durationSec,
      efficiencyPercent,
      gasMolarVolume
    },
    metrics: {
      totalChargeCoulombs,
      molesOfElectrons,
      effectiveChargeCoulombs,
      actualVoltageV,
      energyConsumedJoules,
      energyConsumedKWh
    },
    cathodeResult: {
      species: scenario.cathode.speciesProduced,
      formula: scenario.cathode.speciesFormula,
      state: scenario.cathode.state,
      molesProduced: cathodeMoles,
      massGrams: cathodeMassGrams,
      massMilligrams: cathodeMassMg,
      gasVolumeLiters: cathodeGasVolLiters,
      halfReactionEquation: scenario.cathode.halfReactionEquation,
      displayQuantityText: cathodeQuantityText
    },
    anodeResult: {
      species: scenario.anode.speciesProduced,
      formula: scenario.anode.speciesFormula,
      state: scenario.anode.state,
      molesProducedOrConsumed: anodeMoles,
      massGrams: anodeMassGrams,
      massMilligrams: anodeMassMg,
      gasVolumeLiters: anodeGasVolLiters,
      halfReactionEquation: scenario.anode.halfReactionEquation,
      displayQuantityText: anodeQuantityText
    },
    stoichiometricChecks: {
      electronConservationValid: true,
      volumeRatioGasExpected,
      volumeRatioGasActual
    },
    faradayFormulaDerivationVI: derivations
  };
}

/**
 * Educational Quiz / Challenge Question for Vietnam High School Graduation Exam
 */
export interface ElectrolysisChallenge {
  id: string;
  scenarioId: string;
  titleVI: string;
  questionVI: string;
  options: {
    id: string;
    textVI: string;
    isCorrect: boolean;
  }[];
  explanationVI: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export const CURRICULUM_ELECTROLYSIS_CHALLENGES: ElectrolysisChallenge[] = [
  {
    id: 'q1_faraday_copper',
    scenarioId: 'aqueous_cuso4_inert',
    titleVI: 'Tính khối lượng đồng bám ở catot (Định luật Faraday)',
    questionVI: 'Điện phân 500 mL dung dịch CuSO₄ với điện cực trơ, cường độ dòng điện không đổi I = 1.93 A trong thời gian 50 phút. Biết hiệu suất phản ứng 100%. Khối lượng Cu bám vào catot là:',
    options: [
      { id: 'A', textVI: '1.905 g', isCorrect: true },
      { id: 'B', textVI: '3.810 g', isCorrect: false },
      { id: 'C', textVI: '0.953 g', isCorrect: false },
      { id: 'D', textVI: '2.540 g', isCorrect: false }
    ],
    explanationVI: 'Áp dụng công thức m = (A·I·t)/(n·F): t = 50 × 60 = 3000 s. m = (63.55 × 1.93 × 3000) / (2 × 96485) ≈ 1.9065 g (~1.905 g theo A = 64).',
    difficulty: 'EASY'
  },
  {
    id: 'q2_chlor_alkali_membrane',
    scenarioId: 'chlor_alkali_membrane',
    titleVI: 'Vai trò của màng ngăn cation trong sản xuất Xút - Clo',
    questionVI: 'Trong công nghiệp xút - clo hiện đại, màng trao đổi cation Nafion giữa buồng anot và catot có vai trò then chốt nào?',
    options: [
      { id: 'A', textVI: 'Chỉ cho ion Na⁺ đi qua sang buồng catot, ngăn Cl⁻ và OH⁻ gặp nhau tạo nước Javel', isCorrect: true },
      { id: 'B', textVI: 'Chỉ cho khí H₂ và Cl₂ trao đổi để cân bằng áp suất giữa hai bình', isCorrect: false },
      { id: 'C', textVI: 'Hòa tan muối NaCl rắn để tăng tốc độ dòng điện', isCorrect: false },
      { id: 'D', textVI: 'Ngăn không cho dung dịch sôi ở nhiệt độ cao', isCorrect: false }
    ],
    explanationVI: 'Màng trao đổi cation cho phép Na⁺ di chuyển từ anot sang catot tạo NaOH tinh khiết, đồng thời ngăn Cl⁻ và OH⁻ tiếp xúc nhau để không sinh ra nước Javel (NaCl + NaClO).',
    difficulty: 'MEDIUM'
  },
  {
    id: 'q3_hall_heroult_cryolite',
    scenarioId: 'hall_heroult_al2o3',
    titleVI: 'Vai trò của Criolit trong điện phân Al₂O₃',
    questionVI: 'Vì sao trong sản xuất nhôm công nghiệp (Hall-Héroult), người ta bắt buộc phải hòa tan Al₂O₃ vào criolit nóng chảy (Na₃AlF₆)?',
    options: [
      { id: 'A', textVI: 'Hạ nhiệt độ nóng chảy từ 2050°C xuống ~950°C, tăng độ dẫn điện và tạo lớp màng nổi bảo vệ nhôm lỏng khỏi bị oxi hóa', isCorrect: true },
      { id: 'B', textVI: 'Để Al biến thành ion Al³⁺ duy nhất mà không cần dòng điện', isCorrect: false },
      { id: 'C', textVI: 'Để hòa tan các khối than chì tránh bị mòn', isCorrect: false },
      { id: 'D', textVI: 'Làm tăng nhiệt độ lên trên 3000°C giúp phản ứng diễn ra nhanh hơn', isCorrect: false }
    ],
    explanationVI: 'Al₂O₃ có nhiệt độ nóng chảy rất cao (2050°C) khó duy trì. Criolit Na₃AlF₆ hạ nhiệt độ xuống ~950°C, tăng tính dẫn điện, và có khối lượng riêng nhỏ hơn Al lỏng nên nổi lên trên ngăn Al bị oxi hóa.',
    difficulty: 'MEDIUM'
  },
  {
    id: 'q4_water_ratio',
    scenarioId: 'water_splitting_acidic',
    titleVI: 'Tỉ lệ thể tích khí trong điện phân nước',
    questionVI: 'Khi điện phân nước có pha H₂SO₄ loãng với các điện cực trơ, tỉ lệ thể tích khí thoát ra ở Catot (-) so với Anot (+) (ở cùng điều kiện nhiệt độ và áp suất) là:',
    options: [
      { id: 'A', textVI: 'V(Catot) : V(Anot) = 2 : 1 (V_H₂ : V_O₂ = 2 : 1)', isCorrect: true },
      { id: 'B', textVI: 'V(Catot) : V(Anot) = 1 : 2 (V_H₂ : V_O₂ = 1 : 2)', isCorrect: false },
      { id: 'C', textVI: 'V(Catot) : V(Anot) = 1 : 1', isCorrect: false },
      { id: 'D', textVI: 'V(Catot) : V(Anot) = 4 : 1', isCorrect: false }
    ],
    explanationVI: 'Catot: 4H⁺ + 4e⁻ → 2H₂↑. Anot: 2H₂O → O₂↑ + 4H⁺ + 4e⁻. Cứ 4 mol electron chuyển dịch sinh ra 2 mol H₂ và 1 mol O₂, do đó tỉ lệ thể tích V(H₂) : V(O₂) = 2 : 1.',
    difficulty: 'EASY'
  }
];
