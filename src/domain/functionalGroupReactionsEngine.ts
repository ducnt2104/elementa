// src/domain/functionalGroupReactionsEngine.ts
// ============================================================================
// ELEMENTA QUALITATIVE ORGANIC FUNCTIONAL GROUP IDENTIFICATION ENGINE
// Standards: IUPAC Compendium of Analytical Nomenclature & Vietnam GDPT 2018 Chemistry 11-12
// Covers: Unsaturation (Br2/KMnO4), Terminal Alkyne ([Ag(NH3)2]+), Vicinal Diols (Cu(OH)2 blue complex),
// Phenols (Br2 white ppt / FeCl3 violet), Aldehydes (Tollens silver mirror / Cu2O red),
// Iodoform Test (CHI3 yellow ppt), Carboxylic Acid (NaHCO3 CO2 gas), and Aniline (Br2 / Diazonium).
// ============================================================================

export type FunctionalGroupCategory =
  | 'ALKENE'
  | 'ALKYNE_TERMINAL'
  | 'ALCOHOL_MONO'
  | 'ALCOHOL_POLY_VICINAL'
  | 'PHENOL'
  | 'ALDEHYDE'
  | 'KETONE'
  | 'CARBOXYLIC_ACID'
  | 'AMINE_AROMATIC';

export interface ChemicalReagent {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  initialColorRgb: string;
  activeSpeciesVI: string;
  safetyHazardVI: string;
  operatingConditionsVI: string;
}

export interface ExpectedReaction {
  isPositive: boolean;
  resultingColorRgb: string;
  precipitateColorRgb?: string;
  gasEvolved?: string; // 'CO2' | 'N2'
  requiresHeating: boolean;
  visualObservationVI: string;
  chemicalEquation: string;
  diagnosticMeaningVI: string;
}

export interface OrganicSubstance {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  category: FunctionalGroupCategory;
  functionalGroupVI: string;
  colorRgb: string;
  descriptionVI: string;
  reactions: Record<string, ExpectedReaction>;
}

export interface ReactionResult {
  substanceId: string;
  substanceNameVI: string;
  reagentId: string;
  reagentNameVI: string;
  isPositive: boolean;
  requiresHeating: boolean;
  heatingApplied: boolean;
  beforeColorRgb: string;
  afterColorRgb: string;
  precipitateColorRgb?: string;
  gasEvolved?: string;
  visualObservationVI: string;
  chemicalEquation: string;
  diagnosticMeaningVI: string;
}

// ----------------------------------------------------------------------------
// REAGENTS CATALOG
// ----------------------------------------------------------------------------
export const REAGENTS: Record<string, ChemicalReagent> = {
  bromine_water: {
    id: 'bromine_water',
    name: 'Bromine Water',
    nameVI: 'Nước Brom (Dung dịch Br2)',
    formula: 'Br2(aq)',
    initialColorRgb: '#ea580c', // Orange-brown
    activeSpeciesVI: 'Phân tử Br2 hòa tan trong nước',
    safetyHazardVI: 'Ăn mòn da, hơi brom độc hại cho đường hô hấp. Cần làm trong tủ hút.',
    operatingConditionsVI: 'Nhiệt độ phòng, lắc đều ống nghiệm.',
  },

  baeyer_kmno4: {
    id: 'baeyer_kmno4',
    name: "Baeyer's Reagent (Cold Dilute KMnO4)",
    nameVI: 'Thuốc thử Baeyer (KMnO4 loãng trong kiềm)',
    formula: 'KMnO4(aq) + KOH',
    initialColorRgb: '#7e22ce', // Deep Purple
    activeSpeciesVI: 'Anion pemanganat MnO4⁻ có tính oxi hóa mạnh',
    safetyHazardVI: 'Chất oxi hóa, làm ố vàng da và quần áo khi dính phải.',
    operatingConditionsVI: 'Lắc nhẹ ở nhiệt độ thường, không đun nóng.',
  },

  tollens_silver: {
    id: 'tollens_silver',
    name: "Tollens' Reagent (Ammoniacal Silver Nitrate)",
    nameVI: 'Thuốc thử Tollens (Bạc nitrat trong amoniac)',
    formula: '[Ag(NH3)2]OH',
    initialColorRgb: '#f8fafc', // Colorless
    activeSpeciesVI: 'Phức điaminbạc(I) cation [Ag(NH3)2]⁺',
    safetyHazardVI: 'Để lâu có thể sinh ra bạc fulminat gây nổ nguy hiểm. Cần pha dùng ngay và tiêu hủy sau thí nghiệm.',
    operatingConditionsVI: 'Đun nóng cách thủy nhẹ trong cốc nước nóng 60 - 70 °C, không lắc ống nghiệm.',
  },

  cuoh2_fresh: {
    id: 'cuoh2_fresh',
    name: 'Freshly Prepared Copper(II) Hydroxide',
    nameVI: 'Đồng(II) hiđroxit mới điều chế (Cu(OH)2 + NaOH)',
    formula: 'Cu(OH)2 + NaOH(aq)',
    initialColorRgb: '#38bdf8', // Light sky blue precipitate
    activeSpeciesVI: 'Kết tủa Cu(OH)2 nhầy xốp dạng keo và môi trường kiềm OH⁻',
    safetyHazardVI: 'Dung dịch kiềm ăn mòn, tránh tiếp xúc với mắt.',
    operatingConditionsVI: 'Nhiệt độ thường (cho ancol đa chức) hoặc đun sôi nhẹ (cho anđehit).',
  },

  fecl3_neutral: {
    id: 'fecl3_neutral',
    name: 'Neutral Iron(III) Chloride',
    nameVI: 'Dung dịch Sắt(III) clorua trung tính',
    formula: 'FeCl3(aq)',
    initialColorRgb: '#ca8a04', // Yellowish-brown
    activeSpeciesVI: 'Cation Fe³⁺ tạo phức phối trí với anion phenolat',
    safetyHazardVI: 'Có tính axit yếu, ăn mòn kim loại.',
    operatingConditionsVI: 'Nhỏ 1-2 giọt vào dung dịch phenol ở nhiệt độ phòng.',
  },

  iodoform_reagent: {
    id: 'iodoform_reagent',
    name: 'Iodoform Reagent (I2 in NaOH)',
    nameVI: 'Thuốc thử Iodoform (Iot trong dung dịch kiềm NaOH)',
    formula: 'I2 + NaOH(aq)',
    initialColorRgb: '#854d0e', // Dark amber brown
    activeSpeciesVI: 'Anion hipoiodit IO⁻ sinh ra khi I2 tác dụng với kiềm',
    safetyHazardVI: 'Mùi iot nồng cay mắt, kiềm ăn mòn da.',
    operatingConditionsVI: 'Đun ấm nhẹ 50 - 60 °C cho đến khi màu nâu của iot mất đi, để nguội.',
  },

  nahco3_solution: {
    id: 'nahco3_solution',
    name: 'Sodium Bicarbonate Solution 5%',
    nameVI: 'Dung dịch Natri hiđrocacbonat 5%',
    formula: 'NaHCO3(aq)',
    initialColorRgb: '#f8fafc', // Colorless
    activeSpeciesVI: 'Anion hiđrocacbonat HCO3⁻ có tính bazơ yếu',
    safetyHazardVI: 'Dung dịch lành tính, an toàn tuyệt đối.',
    operatingConditionsVI: 'Nhiệt độ thường, quan sát hiện tượng sủi bọt khí.',
  },
};

// ----------------------------------------------------------------------------
// ORGANIC SUBSTANCES CATALOG
// ----------------------------------------------------------------------------
export const ORGANIC_SUBSTANCES: Record<string, OrganicSubstance> = {
  ethylene: {
    id: 'ethylene',
    name: 'Ethylene (Ethene)',
    nameVI: 'Etilen (Eten)',
    formula: 'CH2=CH2',
    category: 'ALKENE',
    functionalGroupVI: 'Liên kết đôi C=C (chứa 1 liên kết pi kém bền)',
    colorRgb: '#94a3b8',
    descriptionVI: 'Hiđrocacbon không no mạch hở, làm mất màu nhanh chóng nước brom và dung dịch thuốc tím.',
    reactions: {
      bromine_water: {
        isPositive: true,
        resultingColorRgb: '#f8fafc', // Decolorized completely
        requiresHeating: false,
        visualObservationVI: 'Dung dịch nước brom từ màu da cam nâu chuyển sang hoàn toàn không màu.',
        chemicalEquation: 'CH2=CH2 + Br2(aq) ⟶ CH2Br-CH2Br (1,2-đibromoetan không màu)',
        diagnosticMeaningVI: 'Phản ứng cộng vào liên kết pi: nhận biết đặc trưng cho hiđrocacbon không no chứa liên kết C=C.',
      },
      baeyer_kmno4: {
        isPositive: true,
        resultingColorRgb: '#78350f', // Brown precipitate MnO2
        precipitateColorRgb: '#451a03',
        requiresHeating: false,
        visualObservationVI: 'Màu tím thẫm của thuốc tím bị mất màu, đồng thời xuất hiện kết tủa màu nâu đen của MnO2.',
        chemicalEquation: '3 CH2=CH2 + 2 KMnO4 + 4 H2O ⟶ 3 CH2OH-CH2OH + 2 MnO2↓(nâu đen) + 2 KOH',
        diagnosticMeaningVI: 'Phản ứng oxi hóa không hoàn toàn tạo etylen glicol: minh chứng liên kết đôi dễ bị oxi hóa.',
      },
    },
  },

  acetylene: {
    id: 'acetylene',
    name: 'Acetylene (Ethyne)',
    nameVI: 'Axetilen (Etin)',
    formula: 'CH≡CH',
    category: 'ALKYNE_TERMINAL',
    functionalGroupVI: 'Liên kết ba đầu mạch -C≡C-H có nguyên tử H linh động',
    colorRgb: '#94a3b8',
    descriptionVI: 'Hiđrocacbon không no có nguyên tử hiđro liên kết trực tiếp với cacbon lai hóa sp nên có tính axit yếu.',
    reactions: {
      bromine_water: {
        isPositive: true,
        resultingColorRgb: '#f8fafc',
        requiresHeating: false,
        visualObservationVI: 'Dung dịch nước brom bị mất màu nhanh chóng qua 2 nấc phản ứng.',
        chemicalEquation: 'CH≡CH + 2 Br2(aq) ⟶ CHBr2-CHBr2 (1,1,2,2-tetrabromoetan)',
        diagnosticMeaningVI: 'Phản ứng cộng 2 phân tử brom vào liên kết ba.',
      },
      tollens_silver: {
        isPositive: true,
        resultingColorRgb: '#fef08a', // Yellow precipitate
        precipitateColorRgb: '#ca8a04',
        requiresHeating: false,
        visualObservationVI: 'Xuất hiện ngay lập tức kết tủa màu vàng nhạt của bạc axetilua (AgC≡CAg).',
        chemicalEquation: 'CH≡CH + 2 [Ag(NH3)2]OH ⟶ AgC≡CAg↓(vàng nhạt) + 4 NH3 + 2 H2O',
        diagnosticMeaningVI: 'Phản ứng thế ion Ag⁺ vào H linh động ở liên kết ba đầu mạch (ank-1-in). Rất nhạy!',
      },
    },
  },

  ethanol: {
    id: 'ethanol',
    name: 'Ethanol (Ethyl Alcohol)',
    nameVI: 'Etanol (Cồn etylic)',
    formula: 'C2H5OH',
    category: 'ALCOHOL_MONO',
    functionalGroupVI: 'Nhóm hiđroxyl ancol đơn chức -OH liên kết gốc no',
    colorRgb: '#38bdf8',
    descriptionVI: 'Ancol đơn chức bậc 1. Không làm mất màu nước brom, không hòa tan Cu(OH)2, nhưng có phản ứng iodoform.',
    reactions: {
      cuoh2_fresh: {
        isPositive: false,
        resultingColorRgb: '#38bdf8', // Remains light blue precipitate
        precipitateColorRgb: '#0284c7',
        requiresHeating: false,
        visualObservationVI: 'Kết tủa Cu(OH)2 màu xanh lơ không tan, lắng xuống đáy ống nghiệm.',
        chemicalEquation: 'C2H5OH + Cu(OH)2 ⟶ Không phản ứng ở nhiệt độ thường',
        diagnosticMeaningVI: 'Ancol đơn chức không có khả năng tạo phức càng chelate với Cu(OH)2.',
      },
      iodoform_reagent: {
        isPositive: true,
        resultingColorRgb: '#fef08a', // Yellow precipitate
        precipitateColorRgb: '#eab308',
        requiresHeating: true,
        visualObservationVI: 'Khi đun ấm nhẹ, dung dịch mất màu nâu và xuất hiện kết tủa tinh thể màu vàng tươi của Iodoform (CHI3) có mùi sát trùng đặc trưng.',
        chemicalEquation: 'CH3CH2OH + 4 I2 + 6 NaOH ⟶ CHI3↓(vàng) + HCOONa + 5 NaI + 5 H2O',
        diagnosticMeaningVI: 'Dương tính phản ứng Iodoform vì chứa cấu trúc CH3-CH(OH)-.',
      },
    },
  },

  glycerol: {
    id: 'glycerol',
    name: 'Glycerol (Propane-1,2,3-triol)',
    nameVI: 'Glyxerol (Glixerin)',
    formula: 'C3H5(OH)3',
    category: 'ALCOHOL_POLY_VICINAL',
    functionalGroupVI: 'Ba nhóm -OH liền kề (vicinal diol/polyol)',
    colorRgb: '#0284c7',
    descriptionVI: 'Ancol đa chức có các nhóm -OH liền kề, hòa tan Cu(OH)2 tạo phức chất màu xanh lam thẫm đặc trưng.',
    reactions: {
      cuoh2_fresh: {
        isPositive: true,
        resultingColorRgb: '#1d4ed8', // Deep royal blue complex solution
        requiresHeating: false,
        visualObservationVI: 'Kết tủa xanh lơ của Cu(OH)2 tan hoàn toàn, tạo thành dung dịch phức đồng-glyxerol trong suốt màu xanh lam thẫm (xanh da trời đậm).',
        chemicalEquation: '2 C3H5(OH)3 + Cu(OH)2 ⟶ [C3H7O3]2Cu (phức xanh thẫm) + 2 H2O',
        diagnosticMeaningVI: 'Thuốc thử đặc hiệu nhận biết các ancol đa chức có ít nhất 2 nhóm -OH liền kề.',
      },
      nahco3_solution: {
        isPositive: false,
        resultingColorRgb: '#f8fafc',
        requiresHeating: false,
        visualObservationVI: 'Không có hiện tượng gì, không sủi bọt khí.',
        chemicalEquation: 'C3H5(OH)3 + NaHCO3 ⟶ Không phản ứng',
        diagnosticMeaningVI: 'Ancol có tính axit yếu hơn axit cacbonic nên không giải phóng CO2.',
      },
    },
  },

  phenol: {
    id: 'phenol',
    name: 'Phenol (Carbolic Acid)',
    nameVI: 'Phenol',
    formula: 'C6H5OH',
    category: 'PHENOL',
    functionalGroupVI: 'Nhóm -OH liên kết trực tiếp vào vòng benzen',
    colorRgb: '#e2e8f0',
    descriptionVI: 'Hợp chất thơm có hiệu ứng liên hợp p-pi làm tăng mật độ electron ở vị trí ortho và para của nhân thơm.',
    reactions: {
      bromine_water: {
        isPositive: true,
        resultingColorRgb: '#ffffff', // White precipitate
        precipitateColorRgb: '#ffffff',
        requiresHeating: false,
        visualObservationVI: 'Dung dịch nước brom mất màu nhanh và xuất hiện ngay lập tức kết tủa trắng dày đặc của 2,4,6-tribromophenol.',
        chemicalEquation: 'C6H5OH + 3 Br2(aq) ⟶ C6H2Br3OH↓(trắng) + 3 HBr',
        diagnosticMeaningVI: 'Nhóm -OH hoạt hóa vòng benzen cực mạnh ở các vị trí 2,4,6; phản ứng nhận biết phenol kinh điển.',
      },
      fecl3_neutral: {
        isPositive: true,
        resultingColorRgb: '#7c3aed', // Intense purple/violet solution
        requiresHeating: false,
        visualObservationVI: 'Dung dịch chuyển sang màu tím thẫm (tím hoa cà) rực rỡ do tạo phức sắt(III) phenolat.',
        chemicalEquation: '6 C6H5OH + FeCl3 ⟶ H3[Fe(OC6H5)6](màu tím) + 3 HCl',
        diagnosticMeaningVI: 'Phản ứng tạo phức màu đặc trưng của các hợp chất có nhóm OH phenol.',
      },
      nahco3_solution: {
        isPositive: false,
        resultingColorRgb: '#f8fafc',
        requiresHeating: false,
        visualObservationVI: 'Không sủi bọt khí.',
        chemicalEquation: 'C6H5OH + NaHCO3 ⟶ Không phản ứng (pKa phenol ~ 9.95 > pKa H2CO3 ~ 6.35)',
        diagnosticMeaningVI: 'Phenol là axit rất yếu (yếu hơn H2CO3), dùng để phân biệt phenol với axit cacboxylic.',
      },
    },
  },

  acetaldehyde: {
    id: 'acetaldehyde',
    name: 'Acetaldehyde (Ethanal)',
    nameVI: 'Axetanđehit (Etxanal)',
    formula: 'CH3CHO',
    category: 'ALDEHYDE',
    functionalGroupVI: 'Nhóm cacbonyl anđehit -CH=O',
    colorRgb: '#cbd5e1',
    descriptionVI: 'Anđehit có tính khử mạnh, dễ bị oxi hóa bởi phức bạc Tollens và Cu(OH)2 đun nóng.',
    reactions: {
      tollens_silver: {
        isPositive: true,
        resultingColorRgb: '#94a3b8', // Silver mirror
        precipitateColorRgb: '#cbd5e1',
        requiresHeating: true,
        visualObservationVI: 'Thành ống nghiệm bám một lớp bạc kim loại sáng bóng như gương (Phản ứng tráng gương).',
        chemicalEquation: 'CH3CHO + 2 [Ag(NH3)2]OH ⟶ CH3COONH4 + 2 Ag↓(tráng gương) + 3 NH3 + H2O',
        diagnosticMeaningVI: 'Nhóm -CHO bị oxi hóa thành muối amoni: phản ứng tráng bạc đặc trưng định tính anđehit.',
      },
      cuoh2_fresh: {
        isPositive: true,
        resultingColorRgb: '#dc2626', // Red Cu2O precipitate
        precipitateColorRgb: '#b91c1c',
        requiresHeating: true,
        visualObservationVI: 'Khi đun nóng nhẹ ống nghiệm, kết tủa xanh lơ chuyển dần thành kết tủa màu đỏ gạch của đồng(I) oxit Cu2O.',
        chemicalEquation: 'CH3CHO + 2 Cu(OH)2 + NaOH ⟶ CH3COONa + Cu2O↓(đỏ gạch) + 3 H2O',
        diagnosticMeaningVI: 'Anđehit khử Cu(II) về Cu(I) trong môi trường kiềm nóng.',
      },
      iodoform_reagent: {
        isPositive: true,
        resultingColorRgb: '#fef08a',
        precipitateColorRgb: '#eab308',
        requiresHeating: true,
        visualObservationVI: 'Tạo kết tủa tinh thể màu vàng của Iodoform (CHI3).',
        chemicalEquation: 'CH3CHO + 3 I2 + 4 NaOH ⟶ CHI3↓(vàng) + HCOONa + 3 NaI + 3 H2O',
        diagnosticMeaningVI: 'Là anđehit duy nhất cho phản ứng Iodoform nhờ chứa nhóm metyl cacbonyl CH3-C=O.',
      },
    },
  },

  acetone: {
    id: 'acetone',
    name: 'Acetone (Propan-2-one)',
    nameVI: 'Axeton (Propanon)',
    formula: 'CH3COCH3',
    category: 'KETONE',
    functionalGroupVI: 'Nhóm cacbonyl xeton >C=O liên kết hai gốc hiđrocacbon',
    colorRgb: '#cbd5e1',
    descriptionVI: 'Xeton no đơn chức, không có nguyên tử H liên kết trực tiếp với cacbonyl nên không có tính khử mạnh như anđehit.',
    reactions: {
      tollens_silver: {
        isPositive: false,
        resultingColorRgb: '#f8fafc',
        requiresHeating: true,
        visualObservationVI: 'Không có hiện tượng gì, dung dịch vẫn trong suốt, không tráng bạc.',
        chemicalEquation: 'CH3COCH3 + [Ag(NH3)2]OH ⟶ Không phản ứng',
        diagnosticMeaningVI: 'Xeton không có tính khử đối với thuốc thử Tollens, dùng để phân biệt anđehit và xeton.',
      },
      cuoh2_fresh: {
        isPositive: false,
        resultingColorRgb: '#38bdf8',
        precipitateColorRgb: '#0284c7',
        requiresHeating: true,
        visualObservationVI: 'Đun nóng vẫn giữ nguyên kết tủa màu xanh lơ của Cu(OH)2, không tạo kết tủa đỏ gạch.',
        chemicalEquation: 'CH3COCH3 + Cu(OH)2 ⟶ Không phản ứng',
        diagnosticMeaningVI: 'Xeton không bị oxi hóa bởi Cu(OH)2 trong môi trường kiềm.',
      },
      iodoform_reagent: {
        isPositive: true,
        resultingColorRgb: '#fef08a',
        precipitateColorRgb: '#eab308',
        requiresHeating: true,
        visualObservationVI: 'Tạo kết tủa tinh thể màu vàng tươi của Iodoform (CHI3) lắng xuống đáy.',
        chemicalEquation: 'CH3COCH3 + 3 I2 + 4 NaOH ⟶ CHI3↓(vàng) + CH3COONa + 3 NaI + 3 H2O',
        diagnosticMeaningVI: 'Chứa nhóm CH3-CO- đặc trưng cho phản ứng Halofom.',
      },
    },
  },

  acetic_acid: {
    id: 'acetic_acid',
    name: 'Acetic Acid (Ethanoic Acid)',
    nameVI: 'Axit axetic (Axit etanoic)',
    formula: 'CH3COOH',
    category: 'CARBOXYLIC_ACID',
    functionalGroupVI: 'Nhóm cacboxyl -COOH có tính axit rõ rệt',
    colorRgb: '#cbd5e1',
    descriptionVI: 'Axit hữu cơ điển hình, làm quỳ tím hóa đỏ và phản ứng mạnh mẽ với muối cacbonat giải phóng CO2.',
    reactions: {
      nahco3_solution: {
        isPositive: true,
        resultingColorRgb: '#f8fafc',
        gasEvolved: 'CO2',
        requiresHeating: false,
        visualObservationVI: 'Có hiện tượng sủi bọt khí không màu mạnh mẽ (khí CO2 thoát ra làm đục nước vôi trong).',
        chemicalEquation: 'CH3COOH + NaHCO3 ⟶ CH3COONa + CO2↑ + H2O',
        diagnosticMeaningVI: 'Phản ứng đẩy axit yếu H2CO3 ra khỏi muối: nhận biết đặc trưng nhóm -COOH axit cacboxylic.',
      },
      bromine_water: {
        isPositive: false,
        resultingColorRgb: '#ea580c',
        requiresHeating: false,
        visualObservationVI: 'Nước brom vẫn giữ nguyên màu da cam nâu, không bị mất màu.',
        chemicalEquation: 'CH3COOH + Br2 ⟶ Không phản ứng',
        diagnosticMeaningVI: 'Gốc metyl no không phản ứng cộng với nước brom.',
      },
    },
  },

  aniline: {
    id: 'aniline',
    name: 'Aniline (Benzenamine)',
    nameVI: 'Anilin (Benzenamin)',
    formula: 'C6H5NH2',
    category: 'AMINE_AROMATIC',
    functionalGroupVI: 'Nhóm amino thơm -NH2 gắn trực tiếp vào nhân benzen',
    colorRgb: '#e2e8f0',
    descriptionVI: 'Amin thơm bậc 1 có đôi electron tự do trên nguyên tử nitơ liên hợp vào vòng thơm làm giàu mật độ electron ở ortho và para.',
    reactions: {
      bromine_water: {
        isPositive: true,
        resultingColorRgb: '#ffffff',
        precipitateColorRgb: '#ffffff',
        requiresHeating: false,
        visualObservationVI: 'Dung dịch nước brom mất màu và tạo ngay lập tức kết tủa trắng của 2,4,6-tribromoanilin.',
        chemicalEquation: 'C6H5NH2 + 3 Br2(aq) ⟶ C6H2Br3NH2↓(trắng) + 3 HBr',
        diagnosticMeaningVI: 'Nhóm -NH2 hoạt hóa nhân thơm cực mạnh: phản ứng định tính anilin nhanh nhất trong phòng thí nghiệm.',
      },
    },
  },
};

// ----------------------------------------------------------------------------
// REACTION ENGINE LOGIC
// ----------------------------------------------------------------------------

/**
 * Simulates laboratory functional group test:
 * Evaluates whether reaction occurs, if heating was required, and outputs exact stoichiometric equations.
 */
export function simulateReagentTest(
  substanceId: string,
  reagentId: string,
  heatingApplied = false
): ReactionResult {
  const substance = ORGANIC_SUBSTANCES[substanceId] || ORGANIC_SUBSTANCES.ethylene;
  const reagent = REAGENTS[reagentId] || REAGENTS.bromine_water;

  const expected = substance.reactions[reagentId];

  if (!expected) {
    // Default negative test (no observable reaction)
    return {
      substanceId: substance.id,
      substanceNameVI: substance.nameVI,
      reagentId: reagent.id,
      reagentNameVI: reagent.nameVI,
      isPositive: false,
      requiresHeating: false,
      heatingApplied,
      beforeColorRgb: reagent.initialColorRgb,
      afterColorRgb: reagent.initialColorRgb,
      visualObservationVI: 'Không có hiện tượng hóa học nào xảy ra (màu thuốc thử giữ nguyên, không kết tủa, không sủi bọt).',
      chemicalEquation: `${substance.formula} + ${reagent.formula} ⟶ Không phản ứng`,
      diagnosticMeaningVI: `Hợp chất ${substance.nameVI} không chứa nhóm chức tương thích với ${reagent.nameVI}.`,
    };
  }

  // If reaction requires heating and no heating was applied, it stays unreacted
  if (expected.requiresHeating && !heatingApplied) {
    return {
      substanceId: substance.id,
      substanceNameVI: substance.nameVI,
      reagentId: reagent.id,
      reagentNameVI: reagent.nameVI,
      isPositive: false,
      requiresHeating: true,
      heatingApplied: false,
      beforeColorRgb: reagent.initialColorRgb,
      afterColorRgb: reagent.initialColorRgb,
      visualObservationVI: 'Ở nhiệt độ phòng chưa quan sát thấy phản ứng. Cần đun nóng cách thủy nhẹ để kích hoạt phản ứng.',
      chemicalEquation: `${substance.formula} + ${reagent.formula} ⟶ Cần gia nhiệt (t°)`,
      diagnosticMeaningVI: 'Năng lượng hoạt hóa của phản ứng đòi hỏi đun nóng nhẹ.',
    };
  }

  // Active reaction triggered
  return {
    substanceId: substance.id,
    substanceNameVI: substance.nameVI,
    reagentId: reagent.id,
    reagentNameVI: reagent.nameVI,
    isPositive: expected.isPositive,
    requiresHeating: expected.requiresHeating,
    heatingApplied,
    beforeColorRgb: reagent.initialColorRgb,
    afterColorRgb: expected.resultingColorRgb,
    precipitateColorRgb: expected.precipitateColorRgb,
    gasEvolved: expected.gasEvolved,
    visualObservationVI: expected.visualObservationVI,
    chemicalEquation: expected.chemicalEquation,
    diagnosticMeaningVI: expected.diagnosticMeaningVI,
  };
}

/**
 * Deductive analytical search:
 * Finds candidate organic substances that match a set of experimental test observations.
 */
export function deduceCandidateSubstances(
  testFilters: { reagentId: string; mustBePositive: boolean }[]
): OrganicSubstance[] {
  return Object.values(ORGANIC_SUBSTANCES).filter((sub) => {
    return testFilters.every((filter) => {
      const rxn = sub.reactions[filter.reagentId];
      const isPositive = rxn ? rxn.isPositive : false;
      return isPositive === filter.mustBePositive;
    });
  });
}

/**
 * Matches card to relevant organic substance
 */
export function getMatchingFunctionalGroupSubstance(card: { id?: string; name?: string }): OrganicSubstance | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  for (const sub of Object.values(ORGANIC_SUBSTANCES)) {
    const sName = sub.name.toLowerCase();
    const sNameVI = sub.nameVI.toLowerCase();
    const sId = sub.id.toLowerCase();
    const baseVI = sNameVI.split(' ')[0].replace(/[^a-z0-9à-ỹ]/gi, '');
    const baseEN = sName.split(' ')[0].replace(/[^a-z0-9]/gi, '');

    if (
      idLower.includes(sId) ||
      nameLower.includes(sId) ||
      nameLower.includes(sNameVI) ||
      nameLower.includes(sName) ||
      (baseVI.length >= 3 && nameLower.includes(baseVI)) ||
      (baseEN.length >= 3 && nameLower.includes(baseEN)) ||
      nameLower.includes(sub.formula.toLowerCase())
    ) {
      return sub;
    }
  }

  // Generic keyword match
  if (nameLower.includes('nhận biết') || nameLower.includes('thuốc thử') || nameLower.includes('nhóm chức')) {
    return ORGANIC_SUBSTANCES.ethylene;
  }

  return null;
}
