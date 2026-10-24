// src/domain/halogensRedoxEngine.ts
/**
 * ELEMENTA — Halogens (Group VIIA) & Hydrogen Halides Domain Engine
 * Conforms strictly to GDPT 2018 Chemistry Grade 10 (Chủ đề 7: Nguyên tố nhóm VIIA) & IUPAC Standards.
 * 
 * Subsystems:
 * 1. Halogen Elements & Periodic Trends: F2, Cl2, Br2, I2 states, electronegativities, oxidizing strength (F2 > Cl2 > Br2 > I2).
 * 2. Halogen Displacement in Solution: Cl2 displaces Br- and I-; Br2 displaces I-; F2 reacts violently with water instead.
 * 3. Hydrogen Halides & Hydrohalic Acids:
 *    - Acid strength in water: HF (weak, pKa=3.17) < HCl < HBr < HI (strongest).
 *    - Reducing power: HF < HCl < HBr < HI (reaction with concentrated H2SO4 producing SO2 vs H2S).
 *    - Glass etching: SiO2 + 4HF -> SiF4↑ + 2H2O (stored in plastic PE bottles).
 * 4. Javel Water & Bleaching Powder: Cl2 + 2NaOH -> NaCl + NaClO + H2O and CaOCl2 mixed salt disinfection mechanism.
 * 5. Starch-Iodine Specific Diagnostic: Formation of deep blue-purple inclusion complex (amylose helical cavity).
 */

export interface HalogenElement {
  symbol: 'F' | 'Cl' | 'Br' | 'I';
  nameVi: string;
  nameIupac: string;
  molecularFormula: string;
  physicalState25C: string;
  colorVi: string;
  colorHex: string;
  electronegativityPauling: number;
  standardReductionPotentialE0V: number; // X2 + 2e -> 2X-
  waterReactivityVi: string;
  descriptionVi: string;
  gdptStandardRef: string;
}

export const HALOGEN_ELEMENTS_CATALOG: HalogenElement[] = [
  {
    symbol: 'F',
    nameVi: 'Flo',
    nameIupac: 'Fluorine',
    molecularFormula: 'F2',
    physicalState25C: 'Khí',
    colorVi: 'Lục nhạt',
    colorHex: '#bef264',
    electronegativityPauling: 3.98,
    standardReductionPotentialE0V: +2.87,
    waterReactivityVi: 'Bốc cháy và phân hủy nước mãnh liệt ngay trong bóng tối và ở nhiệt độ thấp: 2F2 + 2H2O -> 4HF + O2↑. Không tồn tại trong dung dịch nước.',
    descriptionVi: 'Nguyên tố có độ âm điện lớn nhất và tính oxi hóa mạnh nhất trong bảng tuần hoàn. Oxi hóa được tất cả kim loại và phi kim (trừ O2, N2 và khí hiếm nhẹ).',
    gdptStandardRef: 'GDPT 2018 Hóa học 10 - Bài 17: Biến thiên tính chất nhóm Halogen'
  },
  {
    symbol: 'Cl',
    nameVi: 'Clo',
    nameIupac: 'Chlorine',
    molecularFormula: 'Cl2',
    physicalState25C: 'Khí',
    colorVi: 'Vàng lục, mùi hắc',
    colorHex: '#84cc16',
    electronegativityPauling: 3.16,
    standardReductionPotentialE0V: +1.36,
    waterReactivityVi: 'Tan một phần và phản ứng thuận nghịch: Cl2 + H2O <=> HCl + HClO (nước clo có tính tẩy màu và sát trùng nhờ HClO).',
    descriptionVi: 'Chất oxi hóa mạnh, tự oxi hóa khử trong dung dịch kiềm tạo nước Javel và clorua vôi. Dùng khử trùng nước sinh hoạt.',
    gdptStandardRef: 'GDPT 2018 Hóa học 10 - Bài 17: Biến thiên tính chất nhóm Halogen'
  },
  {
    symbol: 'Br',
    nameVi: 'Brom',
    nameIupac: 'Bromine',
    molecularFormula: 'Br2',
    physicalState25C: 'Chất lỏng',
    colorVi: 'Đỏ nâu, bốc khói',
    colorHex: '#991b1b',
    electronegativityPauling: 2.96,
    standardReductionPotentialE0V: +1.07,
    waterReactivityVi: 'Tan ít trong nước tạo nước brom (màu vàng cam): Br2 + H2O <=> HBr + HBrO. Phản ứng chậm hơn clo.',
    descriptionVi: 'Halogen duy nhất ở thể lỏng ở nhiệt độ phòng. Hơi brom rất độc, gây bỏng nặng trên da.',
    gdptStandardRef: 'GDPT 2018 Hóa học 10 - Bài 17: Biến thiên tính chất nhóm Halogen'
  },
  {
    symbol: 'I',
    nameVi: 'Iot',
    nameIupac: 'Iodine',
    molecularFormula: 'I2',
    physicalState25C: 'Chất rắn',
    colorVi: 'Tím đen, ánh kim',
    colorHex: '#581c87',
    electronegativityPauling: 2.66,
    standardReductionPotentialE0V: +0.54,
    waterReactivityVi: 'Rất ít tan trong nước; tan nhiều trong dung dịch KI tạo ion triiodide I3- màu nâu đỏ (thuốc sát trùng Lugol).',
    descriptionVi: 'Có tính thăng hoa (chuyển trực tiếp từ thể rắn sang hơi tím khi đun nóng). Tạo phức màu xanh tím đặc trưng với hồ tinh bột.',
    gdptStandardRef: 'GDPT 2018 Hóa học 10 - Bài 17: Biến thiên tính chất nhóm Halogen'
  }
];

export interface HalogenDisplacementResult {
  addedHalogen: 'Cl2' | 'Br2' | 'I2' | 'F2';
  targetHalideSolution: 'NaF' | 'NaCl' | 'NaBr' | 'NaI';
  reactionOccurs: boolean;
  chemicalEquation: string;
  colorBeforeVi: string;
  colorAfterVi: string;
  organicExtractionColorVi: string; // Extraction with hexan / CCl4
  explanationVi: string;
}

export function simulateHalogenDisplacement(
  addedHalogen: 'Cl2' | 'Br2' | 'I2' | 'F2',
  targetHalideSolution: 'NaF' | 'NaCl' | 'NaBr' | 'NaI'
): HalogenDisplacementResult {
  if (addedHalogen === 'F2') {
    return {
      addedHalogen,
      targetHalideSolution,
      reactionOccurs: true,
      chemicalEquation: '2F2 + 2H2O -> 4HF + O2↑ (Phản ứng phân hủy nước tức thì)',
      colorBeforeVi: 'Dung dịch trong suốt không màu',
      colorAfterVi: 'Bốc cháy và sủi bọt khí O2',
      organicExtractionColorVi: 'Không thể chiết',
      explanationVi: 'QUY TẮC BẤT DI BẤT DỊCH: Flo không bao giờ dùng để đẩy các halogen khác ra khỏi dung dịch muối vì F2 phản ứng bốc cháy mãnh liệt với nước trước khi kịp tiếp xúc với ion halogenua.'
    };
  }

  if (addedHalogen === 'Cl2') {
    if (targetHalideSolution === 'NaBr') {
      return {
        addedHalogen,
        targetHalideSolution,
        reactionOccurs: true,
        chemicalEquation: 'Cl2 + 2NaBr -> 2NaCl + Br2',
        colorBeforeVi: 'Dung dịch NaBr trong suốt không màu',
        colorAfterVi: 'Dung dịch chuyển sang màu vàng cam của Brom (Br2)',
        organicExtractionColorVi: 'Khi lắc với dung môi hữu cơ (hexan / benzen), lớp hữu cơ nổi lên trên có màu ĐỎ NÂU ĐẬM.',
        explanationVi: 'Clo có tính oxi hóa mạnh hơn Brom (E° Cl2/2Cl- = +1.36V > E° Br2/2Br- = +1.07V), dễ dàng nhận electron từ Br- để giải phóng Br2 tự do.'
      };
    }
    if (targetHalideSolution === 'NaI') {
      return {
        addedHalogen,
        targetHalideSolution,
        reactionOccurs: true,
        chemicalEquation: 'Cl2 + 2NaI -> 2NaCl + I2↓ (nếu Cl2 dư: 5Cl2 + I2 + 6H2O -> 2HIO3 + 10HCl)',
        colorBeforeVi: 'Dung dịch NaI trong suốt không màu',
        colorAfterVi: 'Xuất hiện màu nâu đỏ của I2 tan (hoặc tinh thể iot tím đen lắng xuống)',
        organicExtractionColorVi: 'Khi lắc với dung môi hữu cơ, lớp hữu cơ chuyển sang màu TÍM ĐẶC TRƯNG của phân tử I2.',
        explanationVi: 'Clo có tính oxi hóa mạnh hơn nhiều so với Iot, đẩy I- thành I2 tự do.'
      };
    }
    // NaF or NaCl
    return {
      addedHalogen,
      targetHalideSolution,
      reactionOccurs: false,
      chemicalEquation: `Cl2 + ${targetHalideSolution} -> Không phản ứng`,
      colorBeforeVi: 'Dung dịch trong suốt không màu',
      colorAfterVi: 'Dung dịch có màu vàng lục nhạt của nước clo hòa tan',
      organicExtractionColorVi: 'Lớp hữu cơ có màu vàng lục nhạt',
      explanationVi: 'Clo không thể oxi hóa ion F- (F có tính oxi hóa mạnh nhất) và không phản ứng với ion Cl- cùng loại.'
    };
  }

  if (addedHalogen === 'Br2') {
    if (targetHalideSolution === 'NaI') {
      return {
        addedHalogen,
        targetHalideSolution,
        reactionOccurs: true,
        chemicalEquation: 'Br2 + 2NaI -> 2NaBr + I2',
        colorBeforeVi: 'Dung dịch NaI trong suốt',
        colorAfterVi: 'Dung dịch chuyển sang màu nâu sẫm của Iot',
        organicExtractionColorVi: 'Lớp dung môi hữu cơ có màu TÍM HỒNG ĐẶC TRƯNG của I2.',
        explanationVi: 'Brom có tính oxi hóa mạnh hơn Iot (E° = +1.07V > +0.54V), oxi hóa I- thành I2.'
      };
    }
    return {
      addedHalogen,
      targetHalideSolution,
      reactionOccurs: false,
      chemicalEquation: `Br2 + ${targetHalideSolution} -> Không phản ứng`,
      colorBeforeVi: 'Dung dịch trong suốt',
      colorAfterVi: 'Dung dịch giữ nguyên màu vàng cam của nước brom',
      organicExtractionColorVi: 'Lớp hữu cơ màu đỏ nâu',
      explanationVi: 'Brom có tính oxi hóa yếu hơn F2 và Cl2, không thể đẩy F- hay Cl- ra khỏi muối.'
    };
  }

  // I2 added
  return {
    addedHalogen: 'I2',
    targetHalideSolution,
    reactionOccurs: false,
    chemicalEquation: `I2 + ${targetHalideSolution} -> Không phản ứng`,
    colorBeforeVi: 'Dung dịch trong suốt',
    colorAfterVi: 'Dung dịch có màu nâu nhạt của I2',
    organicExtractionColorVi: 'Lớp hữu cơ màu tím',
    explanationVi: 'Iot có tính oxi hóa yếu nhất trong nhóm halogen, không thể đẩy bất kỳ halogen nào (F-, Cl-, Br-) ra khỏi dung dịch muối.'
  };
}

export interface HydrogenHalideAnalysis {
  formula: string;
  nameVi: string;
  bondLengthPm: number;
  bondEnergyKjMol: number;
  pKaInWater: number;
  acidStrengthVi: string;
  reactionWithConcH2SO4: {
    occurs: boolean;
    redoxEquation: string;
    gasEvolvedVi: string;
    reducingStrengthRanking: string;
  };
  specialReactionsVi: string;
}

export const HYDROGEN_HALIDES_CATALOG: Record<string, HydrogenHalideAnalysis> = {
  'HF': {
    formula: 'HF',
    nameVi: 'Hiđro florua (Axit flohiđric)',
    bondLengthPm: 92,
    bondEnergyKjMol: 565,
    pKaInWater: 3.17,
    acidStrengthVi: 'Axit yếu trong dung dịch nước (do liên kết H-F phân cực mạnh và năng lượng liên kết 565 kJ/mol rất lớn, tạo liên kết hiđro liên phân tử mạnh F-H...F-H).',
    reactionWithConcH2SO4: {
      occurs: false,
      redoxEquation: 'CaF2 + H2SO4 (đ) --(t°)--> CaSO4 + 2HF↑ (Phản ứng trao đổi, không phải oxi hóa khử)',
      gasEvolvedVi: 'Khí HF bốc khói trong không khí ẩm',
      reducingStrengthRanking: 'Tính khử yếu nhất nhóm, hoàn toàn không khử được H2SO4 đặc.'
    },
    specialReactionsVi: 'PHẢN ỨNG KHẮC THỦY TINH ĐỘC BẢN: SiO2 + 4HF -> SiF4↑ + 2H2O. Ăn mòn thủy tinh nên bắt buộc phải đựng dung dịch HF trong chai nhựa Polyethylene (PE) hoặc sáp parafin.'
  },
  'HCl': {
    formula: 'HCl',
    nameVi: 'Hiđro clorua (Axit clohiđric)',
    bondLengthPm: 127,
    bondEnergyKjMol: 431,
    pKaInWater: -7.0,
    acidStrengthVi: 'Axit mạnh, điện li hoàn toàn trong dung dịch nước.',
    reactionWithConcH2SO4: {
      occurs: false,
      redoxEquation: 'NaCl(s) + H2SO4(đ) --(t°<250°C)--> NaHSO4 + HCl↑ (Phương pháp sunfat điều chế HCl, không xảy ra phản ứng oxi hóa khử)',
      gasEvolvedVi: 'Khí HCl mùi xốc, làm quỳ tím ẩm hóa đỏ',
      reducingStrengthRanking: 'Tính khử yếu, không bị H2SO4 đặc oxi hóa.'
    },
    specialReactionsVi: 'Phản ứng với các chất oxi hóa mạnh (MnO2, KMnO4, KClO3) khi đun nóng để điều chế khí clo trong phòng thí nghiệm: MnO2 + 4HCl(đ) -> MnCl2 + Cl2↑ + 2H2O.'
  },
  'HBr': {
    formula: 'HBr',
    nameVi: 'Hiđro bromua (Axit bromhiđric)',
    bondLengthPm: 141,
    bondEnergyKjMol: 366,
    pKaInWater: -9.0,
    acidStrengthVi: 'Axit rất mạnh (mạnh hơn HCl).',
    reactionWithConcH2SO4: {
      occurs: true,
      redoxEquation: '2HBr + H2SO4(đ) -> Br2 + SO2↑ + 2H2O',
      gasEvolvedVi: 'Khí SO2 mùi hắc và hơi Br2 màu đỏ nâu bốc lên',
      reducingStrengthRanking: 'Tính khử trung bình-mạnh: Khử được S(+6) trong H2SO4 đặc xuống S(+4) trong SO2.'
    },
    specialReactionsVi: 'Không thể điều chế HBr bằng phương pháp sunfat (NaBr + H2SO4 đặc) vì HBr sinh ra bị H2SO4 đặc oxi hóa ngay lập tức thành Br2 và SO2.'
  },
  'HI': {
    formula: 'HI',
    nameVi: 'Hiđro iotua (Axit iothiđric)',
    bondLengthPm: 161,
    bondEnergyKjMol: 295,
    pKaInWater: -10.0,
    acidStrengthVi: 'Axit mạnh nhất trong dãy hydro halide (độ dài liên kết 161 pm lớn nhất, năng lượng bẻ gãy H-I chỉ 295 kJ/mol dễ nhả H+ nhất).',
    reactionWithConcH2SO4: {
      occurs: true,
      redoxEquation: '8HI + H2SO4(đ) -> 4I2↓ + H2S↑ + 4H2O',
      gasEvolvedVi: 'Khí H2S mùi trứng thối đặc trưng và tinh thể I2 tím đen lắng xuống',
      reducingStrengthRanking: 'Tính khử mạnh nhất nhóm: Khử sâu S(+6) trong H2SO4 đặc xuống tận S(-2) trong H2S.'
    },
    specialReactionsVi: 'Dễ bị oxi không khí oxi hóa ngay ở nhiệt độ phòng làm dung dịch HI chuyển sang màu nâu đỏ: 4HI + O2 -> 2I2 + 2H2O.'
  }
};

export interface BleachingReactionResult {
  productType: 'JAVEL_WATER' | 'BLEACHING_POWDER_CAOCl2';
  nameVi: string;
  chemicalEquation: string;
  activeSpeciesVi: string;
  bleachingMechanismVi: string;
  realWorldApplicationVi: string;
}

export function simulateBleachingProduct(productType: 'JAVEL_WATER' | 'BLEACHING_POWDER_CAOCl2'): BleachingReactionResult {
  if (productType === 'JAVEL_WATER') {
    return {
      productType: 'JAVEL_WATER',
      nameVi: 'Nước Javel (Hỗn hợp NaCl và NaClO)',
      chemicalEquation: 'Cl2 + 2NaOH -> NaCl + NaClO + H2O (ở nhiệt độ phòng, dung dịch loãng)',
      activeSpeciesVi: 'Ion Hypoclorit ClO- (nguyên tử Clo có số oxi hóa +1 kém bền, tính oxi hóa rất mạnh).',
      bleachingMechanismVi: 'Trong không khí, NaClO phản ứng với CO2 và hơi nước: NaClO + CO2 + H2O -> NaHCO3 + HClO; axit hypocloro HClO kém bền phân hủy giải phóng oxy nguyên tử [O] phá hủy các hợp chất màu và màng tế bào vi khuẩn.',
      realWorldApplicationVi: 'Dùng tẩy trắng vải sợi, giấy và khử trùng y tế, tẩy uế nhà vệ sinh và nguồn nước.'
    };
  }

  return {
    productType: 'BLEACHING_POWDER_CAOCl2',
    nameVi: 'Clorua vôi (Muối hỗn tạp CaOCl2)',
    chemicalEquation: 'Cl2 + Ca(OH)2 (vôi tôi ẩm, 30°C) -> CaOCl2 + H2O',
    activeSpeciesVi: 'Muối hỗn tạp của cation Ca(2+) với 2 loại anion gốc axit: Cl(-) và ClO(-).',
    bleachingMechanismVi: 'Tương tự nước Javel nhưng ở thể rắn: 2CaOCl2 + CO2 + H2O -> CaCO3↓ + CaCl2 + 2HClO; giải phóng axit HClO có tính oxi hóa khử trùng mạnh.',
    realWorldApplicationVi: 'Rẻ tiền, hàm lượng clo hoạt tính cao (30-38%), thể bột khô dễ vận chuyển hơn nước Javel. Dùng tẩy uế hố rác, chuồng trại chăn nuôi và xử lý chất độc quân sự.'
  };
}

export function simulateStarchIodineTest(hasIodine: boolean, temperatureCelsius: number = 25): {
  colorVi: string;
  colorHex: string;
  isPositive: boolean;
  explanationVi: string;
} {
  if (!hasIodine) {
    return {
      colorVi: 'Không màu (dung dịch hồ tinh bột trong suốt)',
      colorHex: '#ffffff',
      isPositive: false,
      explanationVi: 'Không có mặt I2: Hồ tinh bột không đổi màu.'
    };
  }

  if (temperatureCelsius > 70) {
    return {
      colorVi: 'Mất màu xanh (trở lại trong suốt)',
      colorHex: '#e2e8f0',
      isPositive: true,
      explanationVi: 'Đun nóng (>70°C): Cấu trúc chuỗi xoắn amylose dãn nở, các phân tử I2 bị giải phóng ra khỏi xoắn ốc làm mất màu xanh tím.'
    };
  }

  return {
    colorVi: 'Xanh tím đậm (Blue-Violet)',
    colorHex: '#1e1b4b',
    isPositive: true,
    explanationVi: 'Nhiệt độ phòng (25°C): Phân tử I2 chui vào bên trong các hốc xoắn ốc của chuỗi amylose tạo thành hợp chất bọc (inclusion complex) hấp thụ ánh sáng tạo màu xanh tím đặc trưng. Khi để nguội, màu xanh tím lại xuất hiện trở lại.'
  };
}
