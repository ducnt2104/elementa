// src/domain/redoxReactionsEngine.ts
// Comprehensive Oxidation-Reduction (Redox) Reactions Engine for ELEMENTA
// Strictly conforming to Vietnam GDPT 2018 Chemistry Grade 10 (Chủ đề 4: Phản ứng oxi hóa - khử) & IUPAC Standards

export type RedoxType = 'INTERMOLECULAR' | 'INTRAMOLECULAR' | 'DISPROPORTIONATION' | 'COMPROPORTIONATION';
export type RedoxMedium = 'ACIDIC' | 'NEUTRAL' | 'BASIC';

export interface OxidationStateElement {
  symbol: string;
  count: number;
  oxidationState: number;
  ruleExplanationVi: string;
}

export interface CompoundOxidationState {
  formula: string;
  nameVi: string;
  nameEn: string;
  isIon: boolean;
  charge?: number;
  elements: OxidationStateElement[];
  notesVi?: string;
}

export interface HalfReaction {
  type: 'OXIDATION' | 'REDUCTION';
  speciesInitial: string;
  initialOxidationState: number;
  speciesFinal: string;
  finalOxidationState: number;
  electronsExchanged: number;
  equationVi: string;
  roleVi: string; // 'Chất khử (bị oxi hóa)' or 'Chất oxi hóa (bị khử)'
}

export interface RedoxReactionPreset {
  id: string;
  nameVi: string;
  nameEn: string;
  type: RedoxType;
  medium: RedoxMedium;
  reactants: string[];
  products: string[];
  unbalancedEquation: string;
  balancedEquation: string;
  oxidationHalf: HalfReaction;
  reductionHalf: HalfReaction;
  electronMultiplierOx: number;
  electronMultiplierRed: number;
  totalElectronsTransferred: number;
  observationsVi: string;
  colorInitial: string;
  colorFinal: string;
  industrialApplicationVi: string;
}

export interface MediumDependentPermanganate {
  medium: RedoxMedium;
  mediumNameVi: string;
  reagentVi: string;
  reductionEquationVi: string;
  finalSpecies: string;
  finalOxidationState: number;
  electronsReceived: number;
  colorBefore: string;
  colorAfter: string;
  colorDescriptionVi: string;
  practicalExampleVi: string;
}

// -----------------------------------------------------------------------------
// 1. COMPOUND & ION OXIDATION STATE CATALOG (GDPT 2018 Grade 10)
// -----------------------------------------------------------------------------

export const OXIDATION_STATE_CATALOG: CompoundOxidationState[] = [
  {
    formula: 'KMnO4',
    nameVi: 'Potassium permanganate (Thuốc tím)',
    nameEn: 'Potassium permanganate',
    isIon: false,
    elements: [
      { symbol: 'K', count: 1, oxidationState: 1, ruleExplanationVi: 'Kim loại kiềm (nhóm IA) luôn có số oxi hóa +1' },
      { symbol: 'Mn', count: 1, oxidationState: 7, ruleExplanationVi: 'Mn = 0 - (1*(+1) + 4*(-2)) = +7 (trạng thái oxi hóa cao nhất)' },
      { symbol: 'O', count: 4, oxidationState: -2, ruleExplanationVi: 'Oxygen thông thường có số oxi hóa -2' }
    ],
    notesVi: 'Thuốc tím KMnO4 là chất oxi hóa rất mạnh phổ biến trong chuẩn độ và xử lý môi trường.'
  },
  {
    formula: 'K2Cr2O7',
    nameVi: 'Potassium dichromate',
    nameEn: 'Potassium dichromate',
    isIon: false,
    elements: [
      { symbol: 'K', count: 2, oxidationState: 1, ruleExplanationVi: 'Kim loại kiềm có số oxi hóa +1' },
      { symbol: 'Cr', count: 2, oxidationState: 6, ruleExplanationVi: '2*Cr = 0 - (2*(+1) + 7*(-2)) = +12 => Cr = +6' },
      { symbol: 'O', count: 7, oxidationState: -2, ruleExplanationVi: 'Oxygen thông thường có số oxi hóa -2' }
    ],
    notesVi: 'Dung dịch màu da cam đặc trưng, dùng trong phân tích nồng độ cồn hơi thở (CSGT).'
  },
  {
    formula: 'H2O2',
    nameVi: 'Hydrogen peroxide (Oxy già)',
    nameEn: 'Hydrogen peroxide',
    isIon: false,
    elements: [
      { symbol: 'H', count: 2, oxidationState: 1, ruleExplanationVi: 'Hydrogen liên kết với phi kim có số oxi hóa +1' },
      { symbol: 'O', count: 2, oxidationState: -1, ruleExplanationVi: 'Cầu peroxo (-O-O-) làm mỗi nguyên tử Oxygen nhận 1 e từ H => -1 (ngoại lệ quy tắc thông thường -2)' }
    ],
    notesVi: 'Vừa có tính oxi hóa (về -2 trong H2O) vừa có tính khử (lên 0 trong O2).'
  },
  {
    formula: 'OF2',
    nameVi: 'Oxygen difluoride',
    nameEn: 'Oxygen difluoride',
    isIon: false,
    elements: [
      { symbol: 'O', count: 1, oxidationState: 2, ruleExplanationVi: 'Fluorine có độ âm điện lớn nhất (3.98) nên nhận electron (F = -1) => Oxygen mang số oxi hóa +2' },
      { symbol: 'F', count: 2, oxidationState: -1, ruleExplanationVi: 'Fluorine luôn có số oxi hóa -1 trong mọi hợp chất' }
    ],
    notesVi: 'Hợp chất hiếm hoi mà Oxygen có số oxi hóa dương (+2).'
  },
  {
    formula: 'NaH',
    nameVi: 'Sodium hydride',
    nameEn: 'Sodium hydride',
    isIon: false,
    elements: [
      { symbol: 'Na', count: 1, oxidationState: 1, ruleExplanationVi: 'Kim loại kiềm có số oxi hóa +1' },
      { symbol: 'H', count: 1, oxidationState: -1, ruleExplanationVi: 'Trong hydride kim loại kiềm/kiềm thổ, H nhận 1 e tạo ion H- => số oxi hóa -1' }
    ],
    notesVi: 'H- có tính khử rất mạnh, giải phóng H2 khi tác dụng với nước.'
  },
  {
    formula: 'Fe3O4',
    nameVi: 'Iron(II,III) oxide (Sắt từ oxit)',
    nameEn: 'Iron(II,III) oxide',
    isIon: false,
    elements: [
      { symbol: 'Fe', count: 3, oxidationState: 8/3, ruleExplanationVi: 'Hỗn hợp phân tử FeO.Fe2O3 gồm 1 Fe(+2) và 2 Fe(+3) => Số oxi hóa trung bình = +8/3' },
      { symbol: 'O', count: 4, oxidationState: -2, ruleExplanationVi: 'Oxygen có số oxi hóa -2' }
    ],
    notesVi: 'Gặp trong phản ứng sắt cháy trong oxi hoặc tác dụng với HNO3 đặc nóng.'
  },
  {
    formula: 'FeS2',
    nameVi: 'Iron pyrite (Vàng găm)',
    nameEn: 'Iron disulfide (Pyrite)',
    isIon: false,
    elements: [
      { symbol: 'Fe', count: 1, oxidationState: 2, ruleExplanationVi: 'Fe kết hợp với cụm ion persulfide (S2)2- có số oxi hóa +2' },
      { symbol: 'S', count: 2, oxidationState: -1, ruleExplanationVi: 'Cụm anion disulfide [S-S]2- khiến mỗi nguyên tử Lưu huỳnh có số oxi hóa -1' }
    ],
    notesVi: 'Quặng sản xuất axit sunfuric trong công nghiệp, khi đốt cho Fe2O3 và SO2.'
  },
  {
    formula: 'MnO4-',
    nameVi: 'Permanganate anion',
    nameEn: 'Permanganate ion',
    isIon: true,
    charge: -1,
    elements: [
      { symbol: 'Mn', count: 1, oxidationState: 7, ruleExplanationVi: 'Mn + 4*(-2) = -1 => Mn = -1 + 8 = +7' },
      { symbol: 'O', count: 4, oxidationState: -2, ruleExplanationVi: 'Oxygen có số oxi hóa -2' }
    ],
    notesVi: 'Anion tự do trong dung dịch thuốc tím, mang màu tím thẫm (d-d/LMCT chuyển điện tích).'
  },
  {
    formula: 'Cr2O7^2-',
    nameVi: 'Dichromate anion',
    nameEn: 'Dichromate ion',
    isIon: true,
    charge: -2,
    elements: [
      { symbol: 'Cr', count: 2, oxidationState: 6, ruleExplanationVi: '2*Cr + 7*(-2) = -2 => 2*Cr = +12 => Cr = +6' },
      { symbol: 'O', count: 7, oxidationState: -2, ruleExplanationVi: 'Oxygen có số oxi hóa -2' }
    ],
    notesVi: 'Màu da cam; chuyển thành CrO4(2-) màu vàng chanh khi tăng pH (thêm kiềm).'
  },
  {
    formula: 'NH4+',
    nameVi: 'Ammonium cation',
    nameEn: 'Ammonium ion',
    isIon: true,
    charge: 1,
    elements: [
      { symbol: 'N', count: 1, oxidationState: -3, ruleExplanationVi: 'N + 4*(+1) = +1 => N = +1 - 4 = -3' },
      { symbol: 'H', count: 4, oxidationState: 1, ruleExplanationVi: 'Hydrogen có số oxi hóa +1' }
    ],
    notesVi: 'Nitrogen ở trạng thái oxi hóa cực tiểu (-3), chỉ có tính khử.'
  }
];

// -----------------------------------------------------------------------------
// 2. REDOX PRESETS WITH BALANCING DETAILS (GDPT 2018 4 Types)
// -----------------------------------------------------------------------------

export const REDOX_PRESETS: RedoxReactionPreset[] = [
  {
    id: 'ZN_HCL_INTERMOLECULAR',
    nameVi: 'Kẽm tác dụng với Hydrochloric acid',
    nameEn: 'Zinc with hydrochloric acid',
    type: 'INTERMOLECULAR',
    medium: 'ACIDIC',
    reactants: ['Zn', 'HCl'],
    products: ['ZnCl2', 'H2'],
    unbalancedEquation: 'Zn + HCl -> ZnCl2 + H2',
    balancedEquation: 'Zn + 2HCl -> ZnCl2 + H2',
    oxidationHalf: {
      type: 'OXIDATION',
      speciesInitial: 'Zn(0)',
      initialOxidationState: 0,
      speciesFinal: 'Zn(+2)',
      finalOxidationState: 2,
      electronsExchanged: 2,
      equationVi: 'Zn -> Zn^2+ + 2e',
      roleVi: 'Chất khử (kẽm bị oxi hóa)'
    },
    reductionHalf: {
      type: 'REDUCTION',
      speciesInitial: '2H(+1)',
      initialOxidationState: 1,
      speciesFinal: 'H2(0)',
      finalOxidationState: 0,
      electronsExchanged: 2,
      equationVi: '2H^+ + 2e -> H2',
      roleVi: 'Chất oxi hóa (ion H+ bị khử)'
    },
    electronMultiplierOx: 1,
    electronMultiplierRed: 1,
    totalElectronsTransferred: 2,
    observationsVi: 'Kim loại kẽm tan dần, có bọt khí không màu không mùi (H2) thoát ra sủi bọt mạnh mẽ.',
    colorInitial: '#94a3b8',
    colorFinal: '#38bdf8',
    industrialApplicationVi: 'Điều chế khí hydrogen trong phòng thí nghiệm; mạ kẽm bảo vệ sắt thép.'
  },
  {
    id: 'KMNO4_DECOMPOSITION_INTRAMOLECULAR',
    nameVi: 'Nhiệt phân Thuốc tím KMnO4',
    nameEn: 'Thermal decomposition of KMnO4',
    type: 'INTRAMOLECULAR',
    medium: 'NEUTRAL',
    reactants: ['KMnO4'],
    products: ['K2MnO4', 'MnO2', 'O2'],
    unbalancedEquation: 'KMnO4 --t°--> K2MnO4 + MnO2 + O2',
    balancedEquation: '2KMnO4 --t°--> K2MnO4 + MnO2 + O2',
    oxidationHalf: {
      type: 'OXIDATION',
      speciesInitial: '2O(-2)',
      initialOxidationState: -2,
      speciesFinal: 'O2(0)',
      finalOxidationState: 0,
      electronsExchanged: 4,
      equationVi: '2O^-2 -> O2 + 4e',
      roleVi: 'Nguyên tố khử (Oxygen bị oxi hóa từ -2 lên 0)'
    },
    reductionHalf: {
      type: 'REDUCTION',
      speciesInitial: '2Mn(+7)',
      initialOxidationState: 7,
      speciesFinal: 'Mn(+6) + Mn(+4)',
      finalOxidationState: 5, // average
      electronsExchanged: 4,
      equationVi: '2Mn^+7 + 4e -> Mn^+6 (K2MnO4) + Mn^+4 (MnO2)',
      roleVi: 'Nguyên tố oxi hóa (Mangan bị khử từ +7 xuống +6 và +4)'
    },
    electronMultiplierOx: 1,
    electronMultiplierRed: 1,
    totalElectronsTransferred: 4,
    observationsVi: 'Chất rắn màu tím đen phát tiếng lách tách, giải phóng khí duy trì sự cháy (tàn đóm đỏ bùng cháy).',
    colorInitial: '#86198f',
    colorFinal: '#15803d',
    industrialApplicationVi: 'Phương pháp cổ điển điều chế khí Oxygen tinh khiết trong phòng thí nghiệm trường học.'
  },
  {
    id: 'CL2_NAOH_DISPROPORTIONATION',
    nameVi: 'Khí Chlorine tác dụng dung dịch NaOH (Tự oxi hóa - tự khử)',
    nameEn: 'Chlorine disproportionation in NaOH',
    type: 'DISPROPORTIONATION',
    medium: 'BASIC',
    reactants: ['Cl2', 'NaOH'],
    products: ['NaCl', 'NaClO', 'H2O'],
    unbalancedEquation: 'Cl2 + NaOH -> NaCl + NaClO + H2O',
    balancedEquation: 'Cl2 + 2NaOH -> NaCl + NaClO + H2O',
    oxidationHalf: {
      type: 'OXIDATION',
      speciesInitial: 'Cl(0)',
      initialOxidationState: 0,
      speciesFinal: 'Cl(+1)',
      finalOxidationState: 1,
      electronsExchanged: 1,
      equationVi: 'Cl^0 -> Cl^+1 (trong NaClO) + 1e',
      roleVi: 'Chất khử (Chlorine bị oxi hóa lên +1)'
    },
    reductionHalf: {
      type: 'REDUCTION',
      speciesInitial: 'Cl(0)',
      initialOxidationState: 0,
      speciesFinal: 'Cl(-1)',
      finalOxidationState: -1,
      electronsExchanged: 1,
      equationVi: 'Cl^0 + 1e -> Cl^-1 (trong NaCl)',
      roleVi: 'Chất oxi hóa (Chlorine bị khử xuống -1)'
    },
    electronMultiplierOx: 1,
    electronMultiplierRed: 1,
    totalElectronsTransferred: 1,
    observationsVi: 'Khí clo màu vàng lục tan dần vào dung dịch kiềm tạo thành dung dịch trong suốt có mùi hắc đặc trưng (Nước Javel).',
    colorInitial: '#84cc16',
    colorFinal: '#fef08a',
    industrialApplicationVi: 'Sản xuất Nước Javel tẩy trắng sợi vải, khử trùng nguồn nước sinh hoạt và sàn nhà bệnh viện.'
  },
  {
    id: 'H2S_SO2_COMPROPORTIONATION',
    nameVi: 'Khí H2S tác dụng với khí SO2 (Phản ứng quy tụ / đồng phân hóa ngược)',
    nameEn: 'Hydrogen sulfide and sulfur dioxide comproportionation',
    type: 'COMPROPORTIONATION',
    medium: 'NEUTRAL',
    reactants: ['H2S', 'SO2'],
    products: ['S', 'H2O'],
    unbalancedEquation: 'H2S + SO2 -> S + H2O',
    balancedEquation: '2H2S + SO2 -> 3S + 2H2O',
    oxidationHalf: {
      type: 'OXIDATION',
      speciesInitial: 'S(-2)',
      initialOxidationState: -2,
      speciesFinal: 'S(0)',
      finalOxidationState: 0,
      electronsExchanged: 2,
      equationVi: 'S^-2 -> S^0 + 2e',
      roleVi: 'Chất khử (S trong H2S bị oxi hóa từ -2 lên 0)'
    },
    reductionHalf: {
      type: 'REDUCTION',
      speciesInitial: 'S(+4)',
      initialOxidationState: 4,
      speciesFinal: 'S(0)',
      finalOxidationState: 0,
      electronsExchanged: 4,
      equationVi: 'S^+4 + 4e -> S^0',
      roleVi: 'Chất oxi hóa (S trong SO2 bị khử từ +4 xuống 0)'
    },
    electronMultiplierOx: 2,
    electronMultiplierRed: 1,
    totalElectronsTransferred: 4,
    observationsVi: 'Hai chất khí không màu tiếp xúc nhau lập tức tạo thành khói bụi bột màu vàng lưu huỳnh bám quanh thành bình.',
    colorInitial: '#94a3b8',
    colorFinal: '#eab308',
    industrialApplicationVi: 'Quy trình Claus thu hồi lưu huỳnh nguyên chất từ khí thải lọc dầu khí, giảm ô nhiễm môi trường.'
  },
  {
    id: 'FE_HNO3_CONC_INTERMOLECULAR',
    nameVi: 'Sắt tác dụng HNO3 đặc nóng',
    nameEn: 'Iron with concentrated nitric acid (hot)',
    type: 'INTERMOLECULAR',
    medium: 'ACIDIC',
    reactants: ['Fe', 'HNO3'],
    products: ['Fe(NO3)3', 'NO2', 'H2O'],
    unbalancedEquation: 'Fe + HNO3 (đặc, t°) -> Fe(NO3)3 + NO2 + H2O',
    balancedEquation: 'Fe + 6HNO3 -> Fe(NO3)3 + 3NO2 + 3H2O',
    oxidationHalf: {
      type: 'OXIDATION',
      speciesInitial: 'Fe(0)',
      initialOxidationState: 0,
      speciesFinal: 'Fe(+3)',
      finalOxidationState: 3,
      electronsExchanged: 3,
      equationVi: 'Fe^0 -> Fe^+3 + 3e',
      roleVi: 'Chất khử (Sắt bị oxi hóa lên số oxi hóa cực đại +3)'
    },
    reductionHalf: {
      type: 'REDUCTION',
      speciesInitial: 'N(+5)',
      initialOxidationState: 5,
      speciesFinal: 'N(+4)',
      finalOxidationState: 4,
      electronsExchanged: 1,
      equationVi: 'N^+5 + 1e -> N^+4 (trong NO2)',
      roleVi: 'Chất oxi hóa (Nitric acid bị khử xuống khí NO2 màu nâu đỏ)'
    },
    electronMultiplierOx: 1,
    electronMultiplierRed: 3,
    totalElectronsTransferred: 3,
    observationsVi: 'Kim loại Fe tan mạnh trong dung dịch, dung dịch chuyển sang màu vàng nâu của Fe3+, khí màu nâu đỏ độc hại (NO2) bốc lên cuồn cuộn.',
    colorInitial: '#64748b',
    colorFinal: '#b45309',
    industrialApplicationVi: 'Phân tích định lượng kim loại; điều chế muối sắt(III) nitrate trong tổng hợp hóa học.'
  }
];

// -----------------------------------------------------------------------------
// 3. MEDIUM-DEPENDENT PERMANGANATE REDUCTION (Grade 10 Classic Experiment)
// -----------------------------------------------------------------------------

export const PERMANGANATE_MEDIA: MediumDependentPermanganate[] = [
  {
    medium: 'ACIDIC',
    mediumNameVi: 'Môi trường Acid (H2SO4 loãng)',
    reagentVi: 'H2SO4 loãng cung cấp H+',
    reductionEquationVi: 'MnO4^- + 5e + 8H^+ -> Mn^2+ + 4H2O',
    finalSpecies: 'Mn^2+',
    finalOxidationState: 2,
    electronsReceived: 5,
    colorBefore: '#701a75', // deep purple
    colorAfter: '#fdf2f8', // practically colorless / very pale pink
    colorDescriptionVi: 'Dung dịch thuốc tím bị mất màu hoàn toàn, trở nên không màu (Mn2+ chỉ có màu hồng rất nhạt khó thấy).',
    practicalExampleVi: 'Chuẩn độ xác định hàm lượng Fe2+ hoặc H2O2: 5Fe2+ + MnO4- + 8H+ -> 5Fe3+ + Mn2+ + 4H2O.'
  },
  {
    medium: 'NEUTRAL',
    mediumNameVi: 'Môi trường Trung tính (Nước cất H2O)',
    reagentVi: 'H2O tinh khiết không thêm acid/base',
    reductionEquationVi: 'MnO4^- + 3e + 2H2O -> MnO2 v + 4OH^-',
    finalSpecies: 'MnO2 (rắn)',
    finalOxidationState: 4,
    electronsReceived: 3,
    colorBefore: '#701a75', // deep purple
    colorAfter: '#78350f', // brown-black precipitate
    colorDescriptionVi: 'Xuất hiện kết tủa màu nâu đen MnO2 v lắng dần xuống đáy ống nghiệm.',
    practicalExampleVi: 'Phản ứng Bayer nhận biết anken: 3C2H4 + 2KMnO4 + 4H2O -> 3C2H4(OH)2 + 2MnO2 v + 2KOH.'
  },
  {
    medium: 'BASIC',
    mediumNameVi: 'Môi trường Kiềm mạnh (Dung dịch KOH / NaOH)',
    reagentVi: 'Dung dịch KOH hoặc NaOH đặc cung cấp OH-',
    reductionEquationVi: 'MnO4^- + 1e -> MnO4^2-',
    finalSpecies: 'MnO4^2- (ion manganate)',
    finalOxidationState: 6,
    electronsReceived: 1,
    colorBefore: '#701a75', // deep purple
    colorAfter: '#15803d', // bright emerald green
    colorDescriptionVi: 'Dung dịch đổi từ màu tím thẫm sang màu xanh lá lục bảo tuyệt đẹp của ion manganate (MnO4 2-).',
    practicalExampleVi: 'Phản ứng "tắc kè hoa hóa học" (chemical chameleon) khi đường glucose khử thuốc tím trong môi trường kiềm.'
  }
];

// -----------------------------------------------------------------------------
// 4. TITRATION SIMULATION: KMnO4 vs FeSO4 (Self-indicating Redox Titration)
// -----------------------------------------------------------------------------

export interface RedoxTitrationState {
  cFeSO4: number; // Molarity of Fe2+, e.g. 0.1 M
  vFeSO4: number; // Volume in flask, e.g. 20.0 mL
  cKMnO4: number; // Molarity of titrant in burette, e.g. 0.02 M
  vKMnO4Added: number; // mL added so far
  equivalenceVolume: number; // mL required for equivalence point: V_eq = (c_Fe * V_Fe) / (5 * c_KMnO4)
  isEquivalenceReached: boolean;
  isOverTitrated: boolean;
  fe2RemainingMoles: number;
  mn2ProducedMoles: number;
  excessKMnO4Moles: number;
  solutionColor: string;
  statusVi: string;
}

export function simulatePermanganateTitration(
  cFeSO4: number = 0.10,
  vFeSO4: number = 20.0,
  cKMnO4: number = 0.02,
  vAdded: number = 0.0
): RedoxTitrationState {
  // Stoichiometry: 5 Fe2+ + 1 MnO4- + 8 H+ -> 5 Fe3+ + 1 Mn2+ + 4 H2O
  // n(Fe2+) = cFeSO4 * vFeSO4 / 1000
  // n(MnO4-_eq) = n(Fe2+) / 5
  // v_eq (mL) = (n(MnO4-_eq) / cKMnO4) * 1000 = (cFeSO4 * vFeSO4) / (5 * cKMnO4)
  const initialFeMoles = (cFeSO4 * vFeSO4) / 1000;
  const eqVolume = (cFeSO4 * vFeSO4) / (5 * cKMnO4);
  const addedKMnO4Moles = (cKMnO4 * vAdded) / 1000;
  const feReactedMoles = Math.min(initialFeMoles, addedKMnO4Moles * 5);
  const feRemainingMoles = Math.max(0, initialFeMoles - feReactedMoles);
  const mn2ProducedMoles = feReactedMoles / 5;
  const excessKMnO4Moles = Math.max(0, addedKMnO4Moles - (initialFeMoles / 5));

  const isEquivalenceReached = Math.abs(vAdded - eqVolume) < 0.05 || vAdded >= eqVolume;
  const isOverTitrated = vAdded > eqVolume + 0.1;

  let solutionColor = '#ecfdf5'; // initial pale green of Fe2+
  let statusVi = '';

  if (vAdded === 0) {
    solutionColor = '#ecfdf5';
    statusVi = 'Chưa thêm thuốc tím. Dung dịch FeSO4 có màu xanh lục nhạt đặc trưng của Fe2+.';
  } else if (vAdded < eqVolume - 0.1) {
    solutionColor = '#fef3c7'; // yellow-tint from forming Fe3+
    statusVi = `Đang chuẩn độ: MnO4- nhỏ xuống bị Fe2+ khử tức thì thành Mn2+ không màu; Fe3+ màu vàng nhạt bắt đầu hình thành (${vAdded.toFixed(1)} / ${eqVolume.toFixed(1)} mL).`;
  } else if (vAdded >= eqVolume - 0.1 && vAdded <= eqVolume + 0.1) {
    solutionColor = '#fbcfe8'; // permanent faint pink of 1 drop excess KMnO4
    statusVi = 'ĐẠT ĐIỂM TƯƠNG ĐƯƠNG! 1 giọt KMnO4 dư làm dung dịch xuất hiện màu hồng nhạt bền trong 30 giây (tự chỉ thị).';
  } else {
    solutionColor = '#f472b6'; // excess purple/pink
    statusVi = `ĐÃ QUÁ ĐIỂM TƯƠNG ĐƯƠNG (${(vAdded - eqVolume).toFixed(1)} mL dư KMnO4). Dung dịch chuyển màu tím hồng đậm do MnO4- dư không còn Fe2+ để phản ứng.`;
  }

  return {
    cFeSO4,
    vFeSO4,
    cKMnO4,
    vKMnO4Added: vAdded,
    equivalenceVolume: Number(eqVolume.toFixed(2)),
    isEquivalenceReached,
    isOverTitrated,
    fe2RemainingMoles: Number(feRemainingMoles.toFixed(6)),
    mn2ProducedMoles: Number(mn2ProducedMoles.toFixed(6)),
    excessKMnO4Moles: Number(excessKMnO4Moles.toFixed(6)),
    solutionColor,
    statusVi
  };
}

// -----------------------------------------------------------------------------
// 5. ELECTRON BALANCING HELPER (Verifies conservation of electrons)
// -----------------------------------------------------------------------------

export function verifyElectronBalance(preset: RedoxReactionPreset): {
  isBalanced: boolean;
  totalDonated: number;
  totalAccepted: number;
  summaryVi: string;
} {
  const totalDonated = preset.oxidationHalf.electronsExchanged * preset.electronMultiplierOx;
  const totalAccepted = preset.reductionHalf.electronsExchanged * preset.electronMultiplierRed;
  const isBalanced = totalDonated === totalAccepted && totalDonated === preset.totalElectronsTransferred;

  return {
    isBalanced,
    totalDonated,
    totalAccepted,
    summaryVi: isBalanced
      ? `Thăng bằng electron chính xác: Tổng electron cho (${totalDonated}e) = Tổng electron nhận (${totalAccepted}e) = ${preset.totalElectronsTransferred}e.`
      : `Lỗi thăng bằng electron: Cho (${totalDonated}e) != Nhận (${totalAccepted}e)!`
  };
}
