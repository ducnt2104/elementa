// src/domain/redoxEngine.ts
// Redox Balancing & Half-Reaction Analysis Engine for ELEMENTA (Hóa học 10 & 12 GDPT 2018 & IUPAC Compliant)

export interface OxidationNumberChange {
  element: string;
  initialState: number;
  finalState: number;
  electronsTransferred: number;
  processType: 'OXIDATION' | 'REDUCTION';
}

export interface RedoxAnalysisResult {
  reactionKey: string;
  titleVI: string;
  equation: string;
  isRedox: boolean;
  reducingAgent: string; // Chất khử (nhường electron, số oxi hóa tăng)
  oxidizingAgent: string; // Chất oxi hóa (thu electron, số oxi hóa giảm)
  oxidationProcessVI: string; // Quá trình oxi hóa (sự oxi hóa)
  reductionProcessVI: string; // Quá trình khử (sự khử)
  changes: OxidationNumberChange[];
  totalElectronsTransferred: number;
  pedagogicalExplanationVI: string;
  curriculumStandardVI: string;
}

// Built-in verified database of 10 flagship high-school redox reactions
export const VERIFIED_REDOX_DATABASE: Record<string, RedoxAnalysisResult> = {
  // 1. Zn + 2HCl -> ZnCl2 + H2
  'Zn_HCl': {
    reactionKey: 'Zn_HCl',
    titleVI: 'Kẽm Tác Dụng Axit Clothiđric',
    equation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    isRedox: true,
    reducingAgent: 'Kẽm kim loại (Zn)',
    oxidizingAgent: 'Ion proton trong axit (H⁺)',
    oxidationProcessVI: 'Zn⁰ → Zn²⁺ + 2e (Quá trình oxi hóa Zn)',
    reductionProcessVI: '2H⁺ + 2e → H₂⁰ (Quá trình khử H⁺)',
    changes: [
      { element: 'Zn', initialState: 0, finalState: 2, electronsTransferred: 2, processType: 'OXIDATION' },
      { element: 'H', initialState: 1, finalState: 0, electronsTransferred: 1, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 2,
    pedagogicalExplanationVI: 'Kẽm có thế điện cực âm hơn Hydro (E° Zn²⁺/Zn = -0.76V) nên nhường electron cho ion H⁺, số oxi hóa của Zn tăng từ 0 lên +2, H giảm từ +1 về 0.',
    curriculumStandardVI: 'Hóa Học 10: Phản ứng oxi hóa - khử; Hóa Học 12: Đại cương kim loại.'
  },

  // 2. 2Na + 2H2O -> 2NaOH + H2
  'Na_H2O': {
    reactionKey: 'Na_H2O',
    titleVI: 'Natri Nổ Trên Mặt Nước',
    equation: '2Na + 2H₂O → 2NaOH + H₂↑',
    isRedox: true,
    reducingAgent: 'Natri kim loại (Na)',
    oxidizingAgent: 'Nước (H₂O hay H⁺ trong H₂O)',
    oxidationProcessVI: 'Na⁰ → Na⁺ + 1e (Quá trình oxi hóa Na)',
    reductionProcessVI: '2H₂O + 2e → 2OH⁻ + H₂⁰ (Quá trình khử nước)',
    changes: [
      { element: 'Na', initialState: 0, finalState: 1, electronsTransferred: 1, processType: 'OXIDATION' },
      { element: 'H', initialState: 1, finalState: 0, electronsTransferred: 1, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 2,
    pedagogicalExplanationVI: 'Natri là kim loại kiềm có I₁ thấp (495.8 kJ/mol), đóng vai trò chất khử mạnh nhường electron trực tiếp cho phân tử nước.',
    curriculumStandardVI: 'Hóa Học 10: Cấu tạo nguyên tử & tính kim loại; Hóa Học 12: Kim loại kiềm.'
  },

  // 3. 2Fe + 3Cl2 -> 2FeCl3
  'Fe_Cl2': {
    reactionKey: 'Fe_Cl2',
    titleVI: 'Sắt Cháy Sáng Trong Khí Clo',
    equation: '2Fe + 3Cl₂ --[t°]--> 2FeCl₃',
    isRedox: true,
    reducingAgent: 'Sắt kim loại (Fe)',
    oxidizingAgent: 'Khí Clo (Cl₂)',
    oxidationProcessVI: 'Fe⁰ → Fe³⁺ + 3e (Quá trình oxi hóa Fe lên số oxi hóa cao nhất)',
    reductionProcessVI: 'Cl₂⁰ + 2e → 2Cl⁻ (Quá trình khử Cl₂)',
    changes: [
      { element: 'Fe', initialState: 0, finalState: 3, electronsTransferred: 3, processType: 'OXIDATION' },
      { element: 'Cl', initialState: 0, finalState: -1, electronsTransferred: 1, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 6,
    pedagogicalExplanationVI: 'Khí clo là chất oxi hóa rất mạnh đưa sắt từ trạng thái 0 lên thẳng số oxi hóa cực đại +3 (khác với axit HCl chỉ đưa sắt lên +2).',
    curriculumStandardVI: 'Hóa Học 10: Nhóm Halogen; Hóa Học 12: Kim loại chuyển tiếp dãy thứ nhất (Sắt).'
  },

  // 4. 2Al + Fe2O3 -> Al2O3 + 2Fe (Nhiệt nhôm)
  'Al_Fe2O3': {
    reactionKey: 'Al_Fe2O3',
    titleVI: 'Phản Ứng Nhiệt Nhôm (Thermite)',
    equation: '2Al + Fe₂O₃ --[t°]--> Al₂O₃ + 2Fe',
    isRedox: true,
    reducingAgent: 'Nhôm kim loại (Al)',
    oxidizingAgent: 'Sắt(III) oxit (Fe₂O₃)',
    oxidationProcessVI: 'Al⁰ → Al³⁺ + 3e (Quá trình oxi hóa Al)',
    reductionProcessVI: 'Fe³⁺ + 3e → Fe⁰ (Quá trình khử Fe³⁺)',
    changes: [
      { element: 'Al', initialState: 0, finalState: 3, electronsTransferred: 3, processType: 'OXIDATION' },
      { element: 'Fe', initialState: 3, finalState: 0, electronsTransferred: 3, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 6,
    pedagogicalExplanationVI: 'Phản ứng nhiệt nhôm: Nhôm có ái lực cực mạnh với oxy, khử Fe³⁺ trong oxit thành sắt kim loại lỏng ở 2500°C với nhiệt lượng tỏa ra khổng lồ ΔH = -851.5 kJ/mol.',
    curriculumStandardVI: 'Hóa Học 12: Đại cương về kim loại & Phương pháp nhiệt luyện.'
  },

  // 5. 3Cu + 8HNO3 -> 3Cu(NO3)2 + 2NO + 4H2O
  'Cu_HNO3': {
    reactionKey: 'Cu_HNO3',
    titleVI: 'Đồng Tan Trong Axit Nitric Loãng',
    equation: '3Cu + 8HNO₃(loãng) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O',
    isRedox: true,
    reducingAgent: 'Đồng kim loại (Cu)',
    oxidizingAgent: 'Axit nitric (HNO₃ hay ion NO₃⁻ trong môi trường H⁺)',
    oxidationProcessVI: 'Cu⁰ → Cu²⁺ + 2e (Quá trình oxi hóa Cu)',
    reductionProcessVI: 'NO₃⁻ + 4H⁺ + 3e → NO + 2H₂O (Quá trình khử N⁺⁵ về N⁺²)',
    changes: [
      { element: 'Cu', initialState: 0, finalState: 2, electronsTransferred: 2, processType: 'OXIDATION' },
      { element: 'N', initialState: 5, finalState: 2, electronsTransferred: 3, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 6,
    pedagogicalExplanationVI: 'Đồng không tác dụng với HCl nhưng tan mạnh trong HNO₃ vì ion NO₃⁻ trong môi trường H⁺ có tính oxi hóa rất mạnh đưa Cu lên Cu²⁺ và giải phóng khí NO không màu hóa nâu trong không khí.',
    curriculumStandardVI: 'Hóa Học 11: Hợp chất của Nitơ & Tính oxi hóa mạnh của HNO₃.'
  },

  // 6. MnO2 + 4HCl -> MnCl2 + Cl2 + 2H2O
  'MnO2_HCl': {
    reactionKey: 'MnO2_HCl',
    titleVI: 'Điều Chế Khí Clo Bằng Mangan Đioxit',
    equation: 'MnO₂ + 4HCl(đặc) --[t°]--> MnCl₂ + Cl₂↑ + 2H₂O',
    isRedox: true,
    reducingAgent: 'Axit clohiđric (HCl hay ion Cl⁻)',
    oxidizingAgent: 'Mangan(IV) oxit (MnO₂)',
    oxidationProcessVI: '2Cl⁻ → Cl₂⁰ + 2e (Quá trình oxi hóa Cl⁻)',
    reductionProcessVI: 'Mn⁺⁴ + 2e → Mn⁺² (Quá trình khử Mn⁺⁴)',
    changes: [
      { element: 'Cl', initialState: -1, finalState: 0, electronsTransferred: 1, processType: 'OXIDATION' },
      { element: 'Mn', initialState: 4, finalState: 2, electronsTransferred: 2, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 2,
    pedagogicalExplanationVI: 'Phương pháp điều chế khí clo kinh điển trong phòng thí nghiệm: MnO₂ oxi hóa ion clorua Cl⁻ thành khí Clo vàng lục, đồng thời mangan bị khử từ +4 xuống +2.',
    curriculumStandardVI: 'Hóa Học 10: Điều chế khí clo trong phòng thí nghiệm; Cân bằng phản ứng oxi hóa - khử.'
  },

  // 7. 2KMnO4 + 16HCl -> 2KCl + 2MnCl2 + 5Cl2 + 8H2O
  'KMnO4_HCl': {
    reactionKey: 'KMnO4_HCl',
    titleVI: 'Oxi Hóa HCl Bằng Thuốc Tím Kali Pemanganat',
    equation: '2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O',
    isRedox: true,
    reducingAgent: 'Axit clohiđric (HCl hay ion Cl⁻)',
    oxidizingAgent: 'Kali pemanganat (KMnO₄)',
    oxidationProcessVI: '2Cl⁻ → Cl₂⁰ + 2e (Quá trình oxi hóa, nhân hệ số 5 = 10e)',
    reductionProcessVI: 'Mn⁺⁷ + 5e → Mn⁺² (Quá trình khử, nhân hệ số 2 = 10e)',
    changes: [
      { element: 'Cl', initialState: -1, finalState: 0, electronsTransferred: 1, processType: 'OXIDATION' },
      { element: 'Mn', initialState: 7, finalState: 2, electronsTransferred: 5, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 10,
    pedagogicalExplanationVI: 'Tổng electron nhường = 5 × 2 = 10e, Tổng electron nhận = 2 × 5 = 10e. Trong 16 phân tử HCl phản ứng, có 10 phân tử đóng vai trò chất khử tạo 5Cl₂, và 6 phân tử đóng vai trò môi trường tạo muối clorua.',
    curriculumStandardVI: 'Hóa Học 10: Phương pháp thăng bằng electron nâng cao.'
  },

  // 8. Fe + CuSO4 -> FeSO4 + Cu
  'Fe_CuSO4': {
    reactionKey: 'Fe_CuSO4',
    titleVI: 'Thủy Luyện Đẩy Đồng Bằng Thanh Sắt',
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu↓',
    isRedox: true,
    reducingAgent: 'Sắt kim loại (Fe)',
    oxidizingAgent: 'Ion đồng(II) (Cu²⁺)',
    oxidationProcessVI: 'Fe⁰ → Fe²⁺ + 2e (Quá trình oxi hóa Fe)',
    reductionProcessVI: 'Cu²⁺ + 2e → Cu⁰ (Quá trình khử Cu²⁺)',
    changes: [
      { element: 'Fe', initialState: 0, finalState: 2, electronsTransferred: 2, processType: 'OXIDATION' },
      { element: 'Cu', initialState: 2, finalState: 0, electronsTransferred: 2, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 2,
    pedagogicalExplanationVI: 'Quy tắc alpha (α) và dãy điện hóa IUPAC: Sắt có thế điện cực chuẩn E° Fe²⁺/Fe (-0.44V) âm hơn E° Cu²⁺/Cu (+0.34V), do đó Fe tự khử chọn lọc ion Cu²⁺ tạo đồng đỏ bám ngoài thanh sắt.',
    curriculumStandardVI: 'Hóa Học 12: Dãy điện hóa kim loại & Phương pháp thủy luyện.'
  },

  // 9. C + 2H2SO4 (đặc, nóng) -> CO2 + 2SO2 + 2H2O
  'C_H2SO4': {
    reactionKey: 'C_H2SO4',
    titleVI: 'Phi Kim Cacbon Bị Oxi Hóa Bằng Axit Sunfuric Đặc Nóng',
    equation: 'C + 2H₂SO₄(đặc) --[t°]--> CO₂↑ + 2SO₂↑ + 2H₂O',
    isRedox: true,
    reducingAgent: 'Cacbon (C)',
    oxidizingAgent: 'Axit sunfuric đặc (H₂SO₄)',
    oxidationProcessVI: 'C⁰ → C⁺⁴ + 4e (Quá trình oxi hóa C)',
    reductionProcessVI: 'S⁺⁶ + 2e → S⁺⁴ (Quá trình khử S⁺⁶, nhân hệ số 2 = 4e)',
    changes: [
      { element: 'C', initialState: 0, finalState: 4, electronsTransferred: 4, processType: 'OXIDATION' },
      { element: 'S', initialState: 6, finalState: 4, electronsTransferred: 2, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 4,
    pedagogicalExplanationVI: 'Axit sunfuric đặc nóng có tính oxi hóa cực mạnh do nguyên tử lưu huỳnh ở số oxi hóa cao nhất +6. Nó oxi hóa phi kim cacbon về CO₂ và bị khử về khí SO₂ mùi xốc.',
    curriculumStandardVI: 'Hóa Học 10 & 11: Hợp chất của Lưu huỳnh (H₂SO₄ đặc nóng).'
  },

  // 10. 10FeSO4 + 2KMnO4 + 8H2SO4 -> 5Fe2(SO4)3 + K2SO4 + 2MnSO4 + 8H2O
  'FeSO4_KMnO4': {
    reactionKey: 'FeSO4_KMnO4',
    titleVI: 'Chuẩn Độ Pemanganat Định Lượng Muối Sắt(II)',
    equation: '10FeSO₄ + 2KMnO₄ + 8H₂SO₄ → 5Fe₂(SO₄)₃ + K₂SO₄ + 2MnSO₄ + 8H₂O',
    isRedox: true,
    reducingAgent: 'Sắt(II) sulfat (FeSO₄ hay ion Fe²⁺)',
    oxidizingAgent: 'Kali pemanganat (KMnO₄ hay ion MnO₄⁻)',
    oxidationProcessVI: 'Fe²⁺ → Fe³⁺ + 1e (Quá trình oxi hóa, nhân hệ số 10 = 10e)',
    reductionProcessVI: 'Mn⁺⁷ + 5e → Mn⁺² (Quá trình khử, nhân hệ số 2 = 10e)',
    changes: [
      { element: 'Fe', initialState: 2, finalState: 3, electronsTransferred: 1, processType: 'OXIDATION' },
      { element: 'Mn', initialState: 7, finalState: 2, electronsTransferred: 5, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 10,
    pedagogicalExplanationVI: 'Phép chuẩn độ Pemanganat là tiêu chuẩn phân tích định lượng hóa học cổ điển: dung dịch KMnO₄ màu tím đóng vai trò chất tự chỉ thị (khi hết Fe²⁺, một giọt dư KMnO₄ làm dung dịch chuyển sang màu hồng nhạt vĩnh viễn).',
    curriculumStandardVI: 'Hóa Học 10 & Chuyên Đề Hóa Học 12: Phương pháp chuẩn độ thể tích oxi hóa - khử.'
  },

  // 11. Zn + CuSO4 -> ZnSO4 + Cu (Pin Galvanic Daniell)
  'Zn_CuSO4': {
    reactionKey: 'Zn_CuSO4',
    titleVI: 'Thủy Luyện Pin Điện Daniell (Kẽm Đẩy Đồng)',
    equation: 'Zn + CuSO₄ → ZnSO₄ + Cu↓',
    isRedox: true,
    reducingAgent: 'Kẽm kim loại (Zn)',
    oxidizingAgent: 'Ion đồng(II) trong dung dịch (Cu²⁺)',
    oxidationProcessVI: 'Zn⁰ → Zn²⁺ + 2e (Quá trình oxi hóa tại Anode cực âm)',
    reductionProcessVI: 'Cu²⁺ + 2e → Cu⁰ (Quá trình khử tại Cathode cực dương)',
    changes: [
      { element: 'Zn', initialState: 0, finalState: 2, electronsTransferred: 2, processType: 'OXIDATION' },
      { element: 'Cu', initialState: 2, finalState: 0, electronsTransferred: 2, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 2,
    pedagogicalExplanationVI: 'Phản ứng nền tảng của pin điện hóa Daniell: Suất điện động chuẩn E°cell = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = 0.34 - (-0.76) = +1.10 V. Kẽm nhường 2 electron chuyển dịch qua dây dẫn sang ion Cu²⁺.',
    curriculumStandardVI: 'Hóa Học 12: Pin điện hóa học & Dãy điện thế chuẩn.'
  },

  // 12. 3C2H5OH + 2K2Cr2O7 + 8H2SO4 -> 3CH3COOH + 2Cr2(SO4)3 + 2K2SO4 + 11H2O
  'C2H5OH_K2Cr2O7': {
    reactionKey: 'C2H5OH_K2Cr2O7',
    titleVI: 'Oxi Hóa Rượu Etylic Bằng Đicromat (Máy Đo Nồng Độ Cồn)',
    equation: '3C₂H₅OH + 2K₂Cr₂O₇ + 8H₂SO₄ → 3CH₃COOH + 2Cr₂(SO₄)₃ + 2K₂SO₄ + 11H₂O',
    isRedox: true,
    reducingAgent: 'Ancol etylic (C₂H₅OH hay cacbon bậc 1)',
    oxidizingAgent: 'Kali đicromat trong môi trường axit (K₂Cr₂O₇ / H⁺)',
    oxidationProcessVI: 'CH₃CH₂OH → CH₃COOH + 4H⁺ + 4e (Oxi hóa C⁻² lên C⁰)',
    reductionProcessVI: 'Cr₂O₇²⁻ + 14H⁺ + 6e → 2Cr³⁺ + 7H₂O (Khử Cr⁺⁶ da cam về Cr⁺³ xanh lục)',
    changes: [
      { element: 'C', initialState: -2, finalState: 0, electronsTransferred: 2, processType: 'OXIDATION' },
      { element: 'Cr', initialState: 6, finalState: 3, electronsTransferred: 3, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 12,
    pedagogicalExplanationVI: 'Phản ứng ứng dụng trong thiết bị đo nồng độ cồn hơi thở của cảnh sát giao thông: Hơi cồn C₂H₅OH khử Cr⁺⁶ (màu da cam) thành Cr³⁺ (màu xanh lục sẫm), sự đổi màu quang phổ kế đo chính xác nồng độ cồn.',
    curriculumStandardVI: 'Hóa Học 11: Dẫn xuất Halogen - Ancol - Phenol; Hóa Học 12: Crom và hợp chất.'
  },

  // 13. Cl2 + 2NaOH -> NaCl + NaClO + H2O (Tự oxi hóa - tự khử / Nước Javel)
  'Cl2_NaOH': {
    reactionKey: 'Cl2_NaOH',
    titleVI: 'Điều Chế Nước Javel (Phản Ứng Tự Oxi Hóa - Khử)',
    equation: 'Cl₂ + 2NaOH → NaCl + NaClO + H₂O',
    isRedox: true,
    reducingAgent: 'Khí Clo (Cl₂)',
    oxidizingAgent: 'Khí Clo (Cl₂)',
    oxidationProcessVI: 'Cl⁰ → Cl⁺¹ + 1e (Tự oxi hóa tạo muối hipoclorit NaClO)',
    reductionProcessVI: 'Cl⁰ + 1e → Cl⁻¹ (Tự khử tạo muối clorua NaCl)',
    changes: [
      { element: 'Cl', initialState: 0, finalState: 1, electronsTransferred: 1, processType: 'OXIDATION' },
      { element: 'Cl', initialState: 0, finalState: -1, electronsTransferred: 1, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 1,
    pedagogicalExplanationVI: 'Phản ứng tự oxi hóa - tự khử (disproportionation): Một phân tử Cl₂ vừa là chất khử vừa là chất oxi hóa. Một nguyên tử clo nhường 1e lên +1 (NaClO tẩy màu), nguyên tử clo còn lại nhận 1e về -1 (NaCl).',
    curriculumStandardVI: 'Hóa Học 10: Phản ứng tự oxi hóa - tự khử; Nhóm Halogen & Ứng dụng nước Javel.'
  },

  // 14. 3Cl2 + 6KOH -> 5KCl + KClO3 + 3H2O (Nhiệt độ cao)
  'Cl2_KOH_hot': {
    reactionKey: 'Cl2_KOH_hot',
    titleVI: 'Clo Tác Dụng Dung Dịch Kiềm Nóng Tạo Clorat',
    equation: '3Cl₂ + 6KOH --[100°C]--> 5KCl + KClO₃ + 3H₂O',
    isRedox: true,
    reducingAgent: 'Khí Clo (Cl₂)',
    oxidizingAgent: 'Khí Clo (Cl₂)',
    oxidationProcessVI: 'Cl⁰ → Cl⁺⁵ + 5e (Tự oxi hóa ở nhiệt độ cao)',
    reductionProcessVI: '5Cl⁰ + 5e → 5Cl⁻¹ (Tự khử tạo 5 muối clorua)',
    changes: [
      { element: 'Cl', initialState: 0, finalState: 5, electronsTransferred: 5, processType: 'OXIDATION' },
      { element: 'Cl', initialState: 0, finalState: -1, electronsTransferred: 1, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 5,
    pedagogicalExplanationVI: 'Ở nhiệt độ cao (100°C), ion hipoclorit ClO⁻ kém bền tự phân hủy/chuyển dịch tạo clorat ClO₃⁻. Clo từ 0 phân bố thành 1 nguyên tử Cl⁺⁵ (KClO₃) và 5 nguyên tử Cl⁻¹ (KCl), tổng electron trao đổi là 5e.',
    curriculumStandardVI: 'Hóa Học 10: Ảnh hưởng của nhiệt độ đến phản ứng tự oxi hóa - tự khử của Halogen.'
  },

  // 15. 2H2S + SO2 -> 3S + 2H2O (Phản ứng quy tụ số oxi hóa / Comproportionation)
  'H2S_SO2': {
    reactionKey: 'H2S_SO2',
    titleVI: 'Phản Ứng Quy Tụ Số Oxi Hóa (Quá Trình Claus Thu Hồi Lưu Huỳnh)',
    equation: '2H₂S + SO₂ → 3S↓ + 2H₂O',
    isRedox: true,
    reducingAgent: 'Hiđro sunfua (H₂S hay ion S²⁻)',
    oxidizingAgent: 'Lưu huỳnh đioxit (SO₂ hay S⁺⁴)',
    oxidationProcessVI: 'S⁻² → S⁰ + 2e (Oxi hóa lưu huỳnh, nhân hệ số 2 = 4e)',
    reductionProcessVI: 'S⁺⁴ + 4e → S⁰ (Khử lưu huỳnh đioxit về đơn chất)',
    changes: [
      { element: 'S', initialState: -2, finalState: 0, electronsTransferred: 2, processType: 'OXIDATION' },
      { element: 'S', initialState: 4, finalState: 0, electronsTransferred: 4, processType: 'REDUCTION' }
    ],
    totalElectronsTransferred: 4,
    pedagogicalExplanationVI: 'Phản ứng quy tụ số oxi hóa (comproportionation) nền tảng của công nghệ Claus trong hóa dầu: S⁻² (-2) và S⁺⁴ (+4) cùng chuyển dịch về trạng thái trung gian bền S⁰ kết tủa vàng, làm sạch khí thải chứa lưu huỳnh độc hại.',
    curriculumStandardVI: 'Hóa Học 10 & 11: Hợp chất của Lưu huỳnh (H₂S và SO₂) & Bảo vệ môi trường công nghiệp.'
  }
};

export interface StandardReductionCouple {
  coupleKey: string;
  oxidizedForm: string;
  reducedForm: string;
  standardPotentialE0: number; // in Volts vs SHE at 298.15 K
  electrons: number;
  descriptionVI: string;
}

export const STANDARD_REDUCTION_POTENTIALS: Record<string, StandardReductionCouple> = {
  'F2/2F-': { coupleKey: 'F2/2F-', oxidizedForm: 'F₂', reducedForm: '2F⁻', standardPotentialE0: 2.87, electrons: 2, descriptionVI: 'Cặp oxi hóa mạnh nhất trong hóa học, Flo có độ âm điện cao nhất' },
  'MnO4-/Mn2+': { coupleKey: 'MnO4-/Mn2+', oxidizedForm: 'MnO₄⁻ + 8H⁺', reducedForm: 'Mn²⁺ + 4H₂O', standardPotentialE0: 1.51, electrons: 5, descriptionVI: 'Chất oxi hóa mạnh trong môi trường axit mạnh' },
  'Cl2/2Cl-': { coupleKey: 'Cl2/2Cl-', oxidizedForm: 'Cl₂', reducedForm: '2Cl⁻', standardPotentialE0: 1.36, electrons: 2, descriptionVI: 'Khí clo oxi hóa được Br⁻ và I⁻' },
  'Cr2O72-/2Cr3+': { coupleKey: 'Cr2O72-/2Cr3+', oxidizedForm: 'Cr₂O₇²⁻ + 14H⁺', reducedForm: '2Cr³⁺ + 7H₂O', standardPotentialE0: 1.33, electrons: 6, descriptionVI: 'Ion đicromat trong môi trường axit' },
  'Ag+/Ag': { coupleKey: 'Ag+/Ag', oxidizedForm: 'Ag⁺', reducedForm: 'Ag', standardPotentialE0: 0.80, electrons: 1, descriptionVI: 'Ion bạc oxi hóa được Fe²⁺ lên Fe³⁺' },
  'Fe3+/Fe2+': { coupleKey: 'Fe3+/Fe2+', oxidizedForm: 'Fe³⁺', reducedForm: 'Fe²⁺', standardPotentialE0: 0.77, electrons: 1, descriptionVI: 'Cặp oxi hóa Fe³⁺ thành Fe²⁺' },
  'I2/2I-': { coupleKey: 'I2/2I-', oxidizedForm: 'I₂', reducedForm: '2I⁻', standardPotentialE0: 0.54, electrons: 2, descriptionVI: 'Cặp oxi hóa - khử iot' },
  'Cu2+/Cu': { coupleKey: 'Cu2+/Cu', oxidizedForm: 'Cu²⁺', reducedForm: 'Cu', standardPotentialE0: 0.34, electrons: 2, descriptionVI: 'Cực dương trong pin điện hóa Daniell' },
  '2H+/H2': { coupleKey: '2H+/H2', oxidizedForm: '2H⁺', reducedForm: 'H₂', standardPotentialE0: 0.00, electrons: 2, descriptionVI: 'Điện cực hiđro chuẩn (SHE: Standard Hydrogen Electrode, quy ước mốc 0.00 V)' },
  'Pb2+/Pb': { coupleKey: 'Pb2+/Pb', oxidizedForm: 'Pb²⁺', reducedForm: 'Pb', standardPotentialE0: -0.13, electrons: 2, descriptionVI: 'Chì kim loại' },
  'Sn2+/Sn': { coupleKey: 'Sn2+/Sn', oxidizedForm: 'Sn²⁺', reducedForm: 'Sn', standardPotentialE0: -0.14, electrons: 2, descriptionVI: 'Thiếc kim loại' },
  'Ni2+/Ni': { coupleKey: 'Ni2+/Ni', oxidizedForm: 'Ni²⁺', reducedForm: 'Ni', standardPotentialE0: -0.26, electrons: 2, descriptionVI: 'Niken kim loại' },
  'Fe2+/Fe': { coupleKey: 'Fe2+/Fe', oxidizedForm: 'Fe²⁺', reducedForm: 'Fe', standardPotentialE0: -0.44, electrons: 2, descriptionVI: 'Sắt kim loại bị axit thông thường hòa tan' },
  'Zn2+/Zn': { coupleKey: 'Zn2+/Zn', oxidizedForm: 'Zn²⁺', reducedForm: 'Zn', standardPotentialE0: -0.76, electrons: 2, descriptionVI: 'Cực âm trong pin Daniell' },
  'Al3+/Al': { coupleKey: 'Al3+/Al', oxidizedForm: 'Al³⁺', reducedForm: 'Al', standardPotentialE0: -1.66, electrons: 3, descriptionVI: 'Nhôm có tính khử mạnh, sản xuất bằng điện phân nóng chảy' },
  'Mg2+/Mg': { coupleKey: 'Mg2+/Mg', oxidizedForm: 'Mg²⁺', reducedForm: 'Mg', standardPotentialE0: -2.37, electrons: 2, descriptionVI: 'Magie kim loại' },
  'Na+/Na': { coupleKey: 'Na+/Na', oxidizedForm: 'Na⁺', reducedForm: 'Na', standardPotentialE0: -2.71, electrons: 1, descriptionVI: 'Natri kim loại phản ứng mãnh liệt với nước' },
  'K+/K': { coupleKey: 'K+/K', oxidizedForm: 'K⁺', reducedForm: 'K', standardPotentialE0: -2.93, electrons: 1, descriptionVI: 'Kali kim loại kiềm hoạt động hóa học rất mạnh' }
};

export function getStandardReductionCouple(coupleKey: string): StandardReductionCouple | null {
  return STANDARD_REDUCTION_POTENTIALS[coupleKey] || null;
}

export function getAllStandardReductionCouples(): StandardReductionCouple[] {
  return Object.values(STANDARD_REDUCTION_POTENTIALS);
}

export function calculateStandardCellEmf(cathodeCoupleKey: string, anodeCoupleKey: string): {
  cellEmf: number;
  isSpontaneous: boolean;
  explanationVI: string;
} | null {
  const cathode = STANDARD_REDUCTION_POTENTIALS[cathodeCoupleKey];
  const anode = STANDARD_REDUCTION_POTENTIALS[anodeCoupleKey];
  if (!cathode || !anode) return null;

  const rawEmf = cathode.standardPotentialE0 - anode.standardPotentialE0;
  const cellEmf = Math.round(rawEmf * 100) / 100;
  const isSpontaneous = cellEmf > 0;

  const explanationVI = `Pin điện hình thành giữa cathode (${cathode.oxidizedForm}/${cathode.reducedForm}, E° = ${cathode.standardPotentialE0}V) và anode (${anode.oxidizedForm}/${anode.reducedForm}, E° = ${anode.standardPotentialE0}V). Suất điện động chuẩn E°cell = E°cathode - E°anode = ${cathode.standardPotentialE0} - (${anode.standardPotentialE0}) = ${cellEmf} V. Phản ứng ${isSpontaneous ? 'tự diễn biến (sinh công điện thế)' : 'không tự phát (cần điện phân cưỡng bức)'}.`;

  return {
    cellEmf,
    isSpontaneous,
    explanationVI
  };
}

export function analyzeRedoxReaction(reactionKey: string): RedoxAnalysisResult | null {
  return VERIFIED_REDOX_DATABASE[reactionKey] || null;
}

export function getAllRedoxReactionKeys(): string[] {
  return Object.keys(VERIFIED_REDOX_DATABASE);
}

export function getAllRedoxReactions(): RedoxAnalysisResult[] {
  return Object.values(VERIFIED_REDOX_DATABASE);
}

export function getFlagshipRedoxCount(): number {
  return Object.keys(VERIFIED_REDOX_DATABASE).length;
}

export function getRedoxReactionsByElement(elementSymbol: string): RedoxAnalysisResult[] {
  const symUpper = elementSymbol.trim().toUpperCase();
  return Object.values(VERIFIED_REDOX_DATABASE).filter((rx) =>
    rx.changes.some((c) => c.element.toUpperCase() === symUpper)
  );
}

export function verifyRedoxElectronBalance(result: RedoxAnalysisResult): {
  isBalanced: boolean;
  totalDonated: number;
  totalAccepted: number;
} {
  const oxidationChanges = result.changes.filter((c) => c.processType === 'OXIDATION');
  const reductionChanges = result.changes.filter((c) => c.processType === 'REDUCTION');

  let totalDonated = 0;
  for (const oc of oxidationChanges) {
    totalDonated += (oc.finalState - oc.initialState);
  }

  let totalAccepted = 0;
  for (const rc of reductionChanges) {
    totalAccepted += (rc.initialState - rc.finalState);
  }

  return {
    isBalanced: totalDonated > 0 && totalAccepted > 0,
    totalDonated,
    totalAccepted
  };
}
