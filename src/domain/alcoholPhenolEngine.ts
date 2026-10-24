/**
 * ELEMENTA - Alcohols, Phenols & Halogen Derivatives Domain Engine
 * Conforms strictly to IUPAC Gold Book and Vietnam GDPT 2018 Grade 11 Chemistry Curriculum:
 * Chủ đề 5: Dẫn xuất halogen - Alcohol - Phenol.
 */

export interface AlcoholDef {
  id: string;
  nameVi: string;
  nameIupac: string;
  formula: string;
  molecularWeight: number;
  alcoholClass: 'BẬC_1' | 'BẬC_2' | 'BẬC_3' | 'ĐA_CHỨC';
  hydroxylCount: number;
  isVicinalPolyol: boolean; // Has adjacent -OH groups capable of chelating Cu(OH)2
  boilingPointC: number;
  densityGPerMl: number;
  waterSolubility: 'TAN_VÔ_HẠN' | 'TAN_TỐT' | 'ÍT_TAN' | 'KHÔNG_TAN';
  descriptionVi: string;
}

export interface PhenolDef {
  id: string;
  nameVi: string;
  nameIupac: string;
  formula: string;
  molecularWeight: number;
  pKa: number;
  meltingPointC: number;
  boilingPointC: number;
  waterSolubility20C: string;
  descriptionVi: string;
}

export interface OxidationResult {
  alcoholId: string;
  productNameVi: string;
  productFormula: string;
  productType: 'ANĐEHIT' | 'XETON' | 'KHÔNG_PHẢN_ỨNG';
  cuoColorChange: string;
  chemicalEquation: string;
  isRedOxidized: boolean;
  explanationVi: string;
}

export interface DehydrationResult {
  alcoholId: string;
  temperatureC: number;
  reactionType: 'TẠO_ETE_140C' | 'TÁCH_NƯỚC_ANKEN_170C' | 'KHÔNG_PHÙ_HỢP';
  mainProductVi: string;
  mainProductFormula: string;
  byProductFormula: string;
  followsZaitsev: boolean;
  majorAlkene?: string;
  minorAlkene?: string;
  chemicalEquation: string;
  explanationVi: string;
}

export interface CuOh2PolyolTestResult {
  compoundId: string;
  dissolvesCuOh2: boolean;
  solutionColorVi: string;
  colorHex: string;
  complexFormula?: string;
  chemicalEquation?: string;
  explanationVi: string;
}

export interface PhenolReactionResult {
  reagent: 'NAOH' | 'CO2_H2O' | 'BR2_WATER' | 'HNO3_CONC';
  reactionOccurs: boolean;
  precipitateFormed: boolean;
  precipitateNameVi?: string;
  precipitateColorVi?: string;
  precipitateHex?: string;
  precipitateMassG?: number;
  chemicalEquation: string;
  explanationVi: string;
}

// 1. Catalog of Alcohols in GDPT 2018
export const CURRICULUM_ALCOHOLS: AlcoholDef[] = [
  {
    id: 'methanol',
    nameVi: 'Metanol (Ancol Metylic)',
    nameIupac: 'Methanol',
    formula: 'CH₃OH',
    molecularWeight: 32.04,
    alcoholClass: 'BẬC_1',
    hydroxylCount: 1,
    isVicinalPolyol: false,
    boilingPointC: 64.7,
    densityGPerMl: 0.792,
    waterSolubility: 'TAN_VÔ_HẠN',
    descriptionVi: 'Cồn công nghiệp, cực độc (làm mù mắt hoặc tử vong khi ngộ độc rượu giả). Cháy ngọn lửa xanh mờ ít khói.'
  },
  {
    id: 'ethanol',
    nameVi: 'Etanol (Ancol Etylic)',
    nameIupac: 'Ethanol',
    formula: 'C₂H₅OH',
    molecularWeight: 46.07,
    alcoholClass: 'BẬC_1',
    hydroxylCount: 1,
    isVicinalPolyol: false,
    boilingPointC: 78.3,
    densityGPerMl: 0.789,
    waterSolubility: 'TAN_VÔ_HẠN',
    descriptionVi: 'Rượu uống, cồn y tế sát trùng 70°, nhiên liệu sinh học E5. Liên kết hiđro liên phân tử làm nhiệt độ sôi cao hơn hẳn đimetyl ete (-24°C).'
  },
  {
    id: 'propan-1-ol',
    nameVi: 'Propan-1-ol (Ancol Propylic)',
    nameIupac: 'Propan-1-ol',
    formula: 'CH₃CH₂CH₂OH',
    molecularWeight: 60.10,
    alcoholClass: 'BẬC_1',
    hydroxylCount: 1,
    isVicinalPolyol: false,
    boilingPointC: 97.2,
    densityGPerMl: 0.803,
    waterSolubility: 'TAN_VÔ_HẠN',
    descriptionVi: 'Ancol bậc 1 ba cacbon, khi oxi hóa bằng CuO nung nóng tạo propanal (anđehit propylic).'
  },
  {
    id: 'propan-2-ol',
    nameVi: 'Propan-2-ol (Ancol Isopropylic / IPA)',
    nameIupac: 'Propan-2-ol',
    formula: 'CH₃CH(OH)CH₃',
    molecularWeight: 60.10,
    alcoholClass: 'BẬC_2',
    hydroxylCount: 1,
    isVicinalPolyol: false,
    boilingPointC: 82.6,
    densityGPerMl: 0.786,
    waterSolubility: 'TAN_VÔ_HẠN',
    descriptionVi: 'Ancol bậc 2 kinh điển, dung môi tẩy rửa vi mạch điện tử. Khi oxi hóa bằng CuO nung nóng tạo axeton (xeton).'
  },
  {
    id: '2-methylpropan-2-ol',
    nameVi: '2-Metylpropan-2-ol (tert-Butyl alcohol)',
    nameIupac: '2-Methylpropan-2-ol',
    formula: '(CH₃)₃COH',
    molecularWeight: 74.12,
    alcoholClass: 'BẬC_3',
    hydroxylCount: 1,
    isVicinalPolyol: false,
    boilingPointC: 82.4,
    densityGPerMl: 0.789,
    waterSolubility: 'TAN_VÔ_HẠN',
    descriptionVi: 'Ancol bậc 3, không có nguyên tử H ở nguyên tử C mang nhóm -OH nên không bị oxi hóa bởi CuO nung nóng.'
  },
  {
    id: 'butan-2-ol',
    nameVi: 'Butan-2-ol (sec-Butyl alcohol)',
    nameIupac: 'Butan-2-ol',
    formula: 'CH₃CH(OH)CH₂CH₃',
    molecularWeight: 74.12,
    alcoholClass: 'BẬC_2',
    hydroxylCount: 1,
    isVicinalPolyol: false,
    boilingPointC: 99.5,
    densityGPerMl: 0.806,
    waterSolubility: 'TAN_TỐT',
    descriptionVi: 'Ancol bậc 2 dùng để kiểm chứng quy tắc Zaitsev khi tách nước ở 170°C tạo but-2-en (sản phẩm chính).'
  },
  {
    id: 'ethylene-glycol',
    nameVi: 'Etylen glicol (Etan-1,2-điol)',
    nameIupac: 'Ethane-1,2-diol',
    formula: 'CH₂OH-CH₂OH',
    molecularWeight: 62.07,
    alcoholClass: 'ĐA_CHỨC',
    hydroxylCount: 2,
    isVicinalPolyol: true,
    boilingPointC: 197.3,
    densityGPerMl: 1.113,
    waterSolubility: 'TAN_VÔ_HẠN',
    descriptionVi: 'Chất lỏng sánh ngọt nhưng rất độc, dùng làm chất chống đông trong két nước ô tô. Hòa tan Cu(OH)₂ tạo dung dịch xanh lam đậm.'
  },
  {
    id: 'glycerol',
    nameVi: 'Glixerol (Propan-1,2,3-triol)',
    nameIupac: 'Propane-1,2,3-triol',
    formula: 'C₃H₅(OH)₃',
    molecularWeight: 92.09,
    alcoholClass: 'ĐA_CHỨC',
    hydroxylCount: 3,
    isVicinalPolyol: true,
    boilingPointC: 290.0,
    densityGPerMl: 1.261,
    waterSolubility: 'TAN_VÔ_HẠN',
    descriptionVi: 'Chất lỏng sánh không màu, vị ngọt béo, tạo từ thủy phân chất béo. Dùng trong mỹ phẩm, dược phẩm và sản xuất nitroglycerin.'
  }
];

// 2. Catalog of Phenols in GDPT 2018
export const CURRICULUM_PHENOLS: PhenolDef[] = [
  {
    id: 'phenol',
    nameVi: 'Phenol (Axit Cacbolic)',
    nameIupac: 'Phenol',
    formula: 'C₆H₅OH',
    molecularWeight: 94.11,
    pKa: 9.95,
    meltingPointC: 40.5,
    boilingPointC: 181.7,
    waterSolubility20C: 'Ít tan trong nước lạnh (8.3 g/100 mL), tan vô hạn trên 66°C',
    descriptionVi: 'Chất rắn tinh thể không màu, để lâu trong không khí bị oxi hóa chuyển sang màu hồng. Rất độc, gây bỏng da nặng khi tiếp xúc.'
  },
  {
    id: 'o-cresol',
    nameVi: 'o-Cresol (2-Metylphenol)',
    nameIupac: '2-Methylphenol',
    formula: 'CH₃-C₆H₄-OH',
    molecularWeight: 108.14,
    pKa: 10.29,
    meltingPointC: 30.9,
    boilingPointC: 191.0,
    waterSolubility20C: '2.5 g/100 mL ở 20°C',
    descriptionVi: 'Dẫn xuất phenol có nhóm metyl ở vị trí ortho, dùng trong chất sát trùng và sản xuất nhựa crezolic.'
  },
  {
    id: 'picric-acid',
    nameVi: 'Axit Picric (2,4,6-Trinitrophenol)',
    nameIupac: '2,4,6-Trinitrophenol',
    formula: 'C₆H₂(NO₂)₃OH',
    molecularWeight: 229.10,
    pKa: 0.38,
    meltingPointC: 122.5,
    boilingPointC: 300.0,
    waterSolubility20C: '1.27 g/100 mL',
    descriptionVi: 'Tinh thể màu vàng sáng, vị rất đắng. Do 3 nhóm -NO₂ hút e mạnh nên tính axit cực mạnh (pKa=0.38, làm đỏ quỳ tím). Dùng làm thuốc nổ.'
  }
];

// 3. Alcohol Controlled CuO Oxidation Predictor
export function predictAlcoholOxidation(alcoholId: string): OxidationResult {
  const alc = CURRICULUM_ALCOHOLS.find(a => a.id === alcoholId);
  if (!alc) {
    throw new Error(`Alcohol with id '${alcoholId}' not found in curriculum catalog.`);
  }

  if (alc.alcoholClass === 'BẬC_1') {
    let productNameVi = 'Anđehit';
    let productFormula = 'R-CHO';
    let equation = '';

    if (alc.id === 'methanol') {
      productNameVi = 'Fomanđehit (Metanal)';
      productFormula = 'HCHO';
      equation = 'CH₃OH + CuO —(t°)→ HCHO + Cu↓ + H₂O';
    } else if (alc.id === 'ethanol') {
      productNameVi = 'Axetanđehit (Etanal)';
      productFormula = 'CH₃CHO';
      equation = 'CH₃CH₂OH + CuO —(t°)→ CH₃CHO + Cu↓ (đỏ) + H₂O';
    } else if (alc.id === 'propan-1-ol') {
      productNameVi = 'Propanal (Propionanđehit)';
      productFormula = 'CH₃CH₂CHO';
      equation = 'CH₃CH₂CH₂OH + CuO —(t°)→ CH₃CH₂CHO + Cu↓ + H₂O';
    } else {
      productNameVi = 'Anđehit tương ứng';
      productFormula = 'R-CHO';
      equation = 'R-CH₂OH + CuO —(t°)→ R-CHO + Cu↓ + H₂O';
    }

    return {
      alcoholId: alc.id,
      productNameVi,
      productFormula,
      productType: 'ANĐEHIT',
      cuoColorChange: 'Bột CuO màu đen chuyển thành kim loại Cu màu đỏ gạch',
      chemicalEquation: equation,
      isRedOxidized: true,
      explanationVi: `Ancol bậc 1 (${alc.nameVi}) bị oxi hóa không hoàn toàn bởi CuO nung nóng tạo anđehit tương ứng và đồng kim loại màu đỏ gạch.`
    };
  }

  if (alc.alcoholClass === 'BẬC_2') {
    let productNameVi = 'Xeton';
    let productFormula = 'R-CO-R\'';
    let equation = '';

    if (alc.id === 'propan-2-ol') {
      productNameVi = 'Axeton (Propan-2-on)';
      productFormula = 'CH₃COCH₃';
      equation = 'CH₃CH(OH)CH₃ + CuO —(t°)→ CH₃COCH₃ + Cu↓ (đỏ) + H₂O';
    } else if (alc.id === 'butan-2-ol') {
      productNameVi = 'Butan-2-on (Etyl metyl xeton)';
      productFormula = 'CH₃COCH₂CH₃';
      equation = 'CH₃CH(OH)CH₂CH₃ + CuO —(t°)→ CH₃COCH₂CH₃ + Cu↓ + H₂O';
    } else {
      productNameVi = 'Xeton tương ứng';
      productFormula = 'R-CO-R\'';
      equation = 'R-CH(OH)-R\' + CuO —(t°)→ R-CO-R\' + Cu↓ + H₂O';
    }

    return {
      alcoholId: alc.id,
      productNameVi,
      productFormula,
      productType: 'XETON',
      cuoColorChange: 'Bột CuO màu đen chuyển thành kim loại Cu màu đỏ gạch',
      chemicalEquation: equation,
      isRedOxidized: true,
      explanationVi: `Ancol bậc 2 (${alc.nameVi}) bị oxi hóa không hoàn toàn bởi CuO nung nóng tạo xeton tương ứng và giải phóng Cu màu đỏ gạch.`
    };
  }

  if (alc.alcoholClass === 'BẬC_3') {
    return {
      alcoholId: alc.id,
      productNameVi: 'Không có sản phẩm',
      productFormula: 'Không phản ứng',
      productType: 'KHÔNG_PHẢN_ỨNG',
      cuoColorChange: 'Màu đen của CuO không đổi (không xảy ra phản ứng)',
      chemicalEquation: '(CH₃)₃COH + CuO —(t°)→ KHÔNG PHẢN ỨNG',
      isRedOxidized: false,
      explanationVi: `Ancol bậc 3 (${alc.nameVi}) không có nguyên tử H ở nguyên tử C mang nhóm OH nên bền vững, không bị oxi hóa bởi CuO ở điều kiện thường.`
    };
  }

  // Đa chức
  return {
    alcoholId: alc.id,
    productNameVi: 'Hợp chất tạp chức đa chức',
    productFormula: 'O=CH-CH=O',
    productType: 'ANĐEHIT',
    cuoColorChange: 'CuO đen chuyển sang Cu đỏ',
    chemicalEquation: 'CH₂OH-CH₂OH + 2 CuO —(t°)→ OHC-CHO + 2 Cu↓ + 2 H₂O',
    isRedOxidized: true,
    explanationVi: 'Các nhóm ancol bậc 1 của poliancol bị oxi hóa thành anđehit tương ứng.'
  };
}

// 4. Dehydration Kinetics: 140°C Etherification vs 170°C Zaitsev Alkene Elimination
export function predictAlcoholDehydration(alcoholId: string, temperatureC: number): DehydrationResult {
  const alc = CURRICULUM_ALCOHOLS.find(a => a.id === alcoholId);
  if (!alc) {
    throw new Error(`Alcohol with id '${alcoholId}' not found.`);
  }

  const t = Math.round(temperatureC);

  // Methanol cannot undergo intramolecular dehydration to alkene (only 1 carbon)
  if (alc.id === 'methanol') {
    if (t >= 130 && t <= 150) {
      return {
        alcoholId: alc.id,
        temperatureC: t,
        reactionType: 'TẠO_ETE_140C',
        mainProductVi: 'Đimetyl ete',
        mainProductFormula: 'CH₃-O-CH₃',
        byProductFormula: 'H₂O',
        followsZaitsev: false,
        chemicalEquation: '2 CH₃OH —(H₂SO₄ đặc, 140°C)→ CH₃-O-CH₃ + H₂O',
        explanationVi: 'Ở 140°C với H₂SO₄ đặc, 2 phân tử metanol tách 1 phân tử nước tạo thành đimetyl ete.'
      };
    } else {
      return {
        alcoholId: alc.id,
        temperatureC: t,
        reactionType: 'KHÔNG_PHÙ_HỢP',
        mainProductVi: 'Không tạo anken (chỉ có 1C)',
        mainProductFormula: 'CH₃OH',
        byProductFormula: '',
        followsZaitsev: false,
        chemicalEquation: 'CH₃OH —(170°C)→ Không tách tạo anken được (chỉ có 1 cacbon)',
        explanationVi: 'Metanol chỉ có 1 nguyên tử cacbon nên không thể tách nước nội phân tử tạo anken.'
      };
    }
  }

  // General Alcohols at ~140°C: Etherification
  if (t >= 130 && t <= 150) {
    let etherName = 'Ete tương ứng';
    let etherFormula = 'R-O-R';
    let eq = '';

    if (alc.id === 'ethanol') {
      etherName = 'Đietyl ete (Thuốc mê Ete)';
      etherFormula = 'C₂H₅-O-C₂H₅';
      eq = '2 C₂H₅OH —(H₂SO₄ đặc, 140°C)→ C₂H₅-O-C₂H₅ + H₂O';
    } else {
      etherName = `Đialkyl ete của ${alc.nameVi}`;
      etherFormula = 'R-O-R';
      eq = `2 ${alc.formula} —(H₂SO₄ đặc, 140°C)→ R-O-R + H₂O`;
    }

    return {
      alcoholId: alc.id,
      temperatureC: t,
      reactionType: 'TẠO_ETE_140C',
      mainProductVi: etherName,
      mainProductFormula: etherFormula,
      byProductFormula: 'H₂O',
      followsZaitsev: false,
      chemicalEquation: eq,
      explanationVi: `Ở ~140°C với xúc tác H₂SO₄ đặc, phản ứng tách nước liên phân tử xảy ra ưu tiên tạo ete.`
    };
  }

  // General Alcohols at ~170°C: Intramolecular Elimination (Alkene)
  if (t >= 160 && t <= 180) {
    let alkeneName = 'Anken';
    let alkeneFormula = 'CnH2n';
    let followsZaitsev = false;
    let majorAlkene: string | undefined;
    let minorAlkene: string | undefined;
    let eq = '';

    if (alc.id === 'ethanol') {
      alkeneName = 'Etilen (Eten)';
      alkeneFormula = 'CH₂=CH₂';
      eq = 'C₂H₅OH —(H₂SO₄ đặc, 170°C)→ CH₂=CH₂↑ + H₂O';
    } else if (alc.id === 'propan-1-ol' || alc.id === 'propan-2-ol') {
      alkeneName = 'Propen (Propilen)';
      alkeneFormula = 'CH₃-CH=CH₂';
      eq = `${alc.formula} —(H₂SO₄ đặc, 170°C)→ CH₃-CH=CH₂↑ + H₂O`;
    } else if (alc.id === 'butan-2-ol') {
      followsZaitsev = true;
      majorAlkene = 'But-2-en (Sản phẩm chính - tuân theo quy tắc Zaitsev)';
      minorAlkene = 'But-1-en (Sản phẩm phụ)';
      alkeneName = 'But-2-en (chính)';
      alkeneFormula = 'CH₃-CH=CH-CH₃';
      eq = 'CH₃-CH(OH)-CH₂-CH₃ —(H₂SO₄ đặc, 170°C)→ CH₃-CH=CH-CH₃ (chính) + CH₂=CH-CH₂-CH₃ (phụ) + H₂O';
    } else {
      alkeneName = 'Anken tương ứng';
      alkeneFormula = 'CnH2n';
      eq = `${alc.formula} —(H₂SO₄ đặc, 170°C)→ Anken + H₂O`;
    }

    return {
      alcoholId: alc.id,
      temperatureC: t,
      reactionType: 'TÁCH_NƯỚC_ANKEN_170C',
      mainProductVi: alkeneName,
      mainProductFormula: alkeneFormula,
      byProductFormula: 'H₂O',
      followsZaitsev,
      majorAlkene,
      minorAlkene,
      chemicalEquation: eq,
      explanationVi: followsZaitsev
        ? `Tách nước ở 170°C theo quy tắc Zaitsev: Nhóm -OH ưu tiên tách cùng nguyên tử H ở cacbon bậc cao hơn (ít H hơn) tạo anken có nhiều nhóm thế hơn là sản phẩm chính (${majorAlkene}).`
        : `Ở nhiệt độ cao (~170°C) với H₂SO₄ đặc, phản ứng tách nước nội phân tử xảy ra tạo liên kết đôi C=C (anken).`
    };
  }

  return {
    alcoholId: alc.id,
    temperatureC: t,
    reactionType: 'KHÔNG_PHÙ_HỢP',
    mainProductVi: 'Không tối ưu',
    mainProductFormula: alc.formula,
    byProductFormula: '',
    followsZaitsev: false,
    chemicalEquation: `Nhiệt độ ${t}°C không thuộc dải phản ứng đặc trưng (140°C tạo ete hoặc 170°C tạo anken).`,
    explanationVi: 'Cần duy trì nhiệt độ ổn định ở 140°C để tạo ete hoặc 170°C để tách nước tạo anken.'
  };
}

// 5. Cu(OH)2 Polyol Diagnostic Test (Nhận biết Poliancol có nhóm -OH kề nhau)
export function evaluateCuOh2PolyolTest(compoundId: string): CuOh2PolyolTestResult {
  const alc = CURRICULUM_ALCOHOLS.find(a => a.id === compoundId);
  if (!alc) {
    // If not alcohol, check if it's monohydric or non-polyol
    return {
      compoundId,
      dissolvesCuOh2: false,
      solutionColorVi: 'Không tan, kết tủa Cu(OH)₂ màu xanh lam nhạt lắng xuống đáy',
      colorHex: '#38BDF8',
      explanationVi: 'Hợp chất không có nhiều nhóm -OH kề nhau nên không hòa tan Cu(OH)₂ ở nhiệt độ thường.'
    };
  }

  if (alc.isVicinalPolyol) {
    let eq = '';
    let complex = '';
    if (alc.id === 'glycerol') {
      complex = '[Cu(C₃H₇O₃)₂]';
      eq = '2 C₃H₅(OH)₃ + Cu(OH)₂ → [Cu(C₃H₇O₃)₂] (xanh lam thẫm) + 2 H₂O';
    } else {
      complex = '[Cu(C₂H₅O₂)₂]';
      eq = '2 C₂H₄(OH)₂ + Cu(OH)₂ → [Cu(C₂H₅O₂)₂] (xanh lam thẫm) + 2 H₂O';
    }

    return {
      compoundId: alc.id,
      dissolvesCuOh2: true,
      solutionColorVi: 'Dung dịch phức đồng xanh lam thẫm (Royal Blue)',
      colorHex: '#1D4ED8',
      complexFormula: complex,
      chemicalEquation: eq,
      explanationVi: `${alc.nameVi} có ${alc.hydroxylCount} nhóm -OH kề nhau (vicinal diol/triol), có khả năng tạo phức càng cua (chelate) bền với Cu²⁺, hòa tan kết tủa Cu(OH)₂ tạo dung dịch màu xanh lam thẫm đặc trưng.`
    };
  }

  return {
    compoundId: alc.id,
    dissolvesCuOh2: false,
    solutionColorVi: 'Kết tủa Cu(OH)₂ không tan, giữ nguyên màu xanh lam nhạt dạng keo',
    colorHex: '#7DD3FC',
    explanationVi: `${alc.nameVi} là ancol đơn chức (${alc.hydroxylCount} nhóm -OH), không thể tạo phức chelate với Cu(OH)₂ ở nhiệt độ thường. Kết tủa Cu(OH)₂ không tan.`
  };
}

// 6. Phenol Characteristic Reactions (NaOH, CO2, Bromine, HNO3)
export function evaluatePhenolReaction(
  reagent: PhenolReactionResult['reagent'],
  phenolMoles: number = 0.01
): PhenolReactionResult {
  const moles = Math.max(0.001, phenolMoles);

  if (reagent === 'NAOH') {
    return {
      reagent: 'NAOH',
      reactionOccurs: true,
      precipitateFormed: false,
      chemicalEquation: 'C₆H₅OH (ít tan/vẩn đục) + NaOH → C₆H₅ONa (tan trong suốt) + H₂O',
      explanationVi: 'Phenol có tính axit yếu, phản ứng với dung dịch kiềm NaOH tạo muối natri phenolat tan hoàn toàn làm dung dịch từ vẩn đục trở nên trong suốt.'
    };
  }

  if (reagent === 'CO2_H2O') {
    return {
      reagent: 'CO2_H2O',
      reactionOccurs: true,
      precipitateFormed: true,
      precipitateNameVi: 'Phenol vẩn đục',
      precipitateColorVi: 'Vẩn đục trắng sữa',
      precipitateHex: '#F8FAFC',
      precipitateMassG: parseFloat((moles * 94.11).toFixed(2)),
      chemicalEquation: 'C₆H₅ONa + CO₂ + H₂O → C₆H₅OH↓ (vẩn đục) + NaHCO₃',
      explanationVi: 'Axit cacbonic (H₂CO₃) có tính axit mạnh hơn phenol (pKa 6.35 < 9.95), do đó CO₂ và H₂O đẩy được phenol ra khỏi muối natri phenolat làm dung dịch vẩn đục trở lại. Muối thu được là NaHCO₃ (không tạo Na₂CO₃).'
    };
  }

  if (reagent === 'BR2_WATER') {
    // C6H5OH + 3 Br2 -> C6H2Br3OH (330.8 g/mol) + 3 HBr
    const mass = parseFloat((moles * 330.8).toFixed(2));
    return {
      reagent: 'BR2_WATER',
      reactionOccurs: true,
      precipitateFormed: true,
      precipitateNameVi: '2,4,6-Tribromophenol',
      precipitateColorVi: 'Kết tủa trắng',
      precipitateHex: '#FFFFFF',
      precipitateMassG: mass,
      chemicalEquation: 'C₆H₅OH + 3 Br₂ → C₆H₂Br₃OH↓ (trắng) + 3 HBr',
      explanationVi: 'Do ảnh hưởng của nhóm -OH đẩy e (+R) hoạt hóa vòng benzen ở các vị trí ortho và para, phenol phản ứng rất dễ dàng với nước brom ở nhiệt độ thường, làm mất màu vàng nâu của dung dịch brom và tạo kết tủa trắng 2,4,6-tribromophenol. Đây là phản ứng định tính kinh điển nhận biết phenol.'
    };
  }

  // HNO3_CONC
  // C6H5OH + 3 HNO3 -> C6H2(NO2)3OH (229.1 g/mol) + 3 H2O
  const picricMass = parseFloat((moles * 229.1).toFixed(2));
  return {
    reagent: 'HNO3_CONC',
    reactionOccurs: true,
    precipitateFormed: true,
    precipitateNameVi: 'Axit Picric (2,4,6-Trinitrophenol)',
    precipitateColorVi: 'Kết tủa vàng sáng',
    precipitateHex: '#FACC15',
    precipitateMassG: picricMass,
    chemicalEquation: 'C₆H₅OH + 3 HNO₃ (đặc) —(H₂SO₄ đặc, t°)→ C₆H₂(NO₂)₃OH↓ (vàng) + 3 H₂O',
    explanationVi: 'Phản ứng thế 3 nhóm nitro (-NO₂) vào các vị trí 2, 4, 6 của vòng benzen tạo ra axit picric kết tủa màu vàng sáng, dùng sản xuất thuốc nổ và phẩm nhuộm.'
  };
}
