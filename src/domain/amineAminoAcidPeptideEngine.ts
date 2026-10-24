// src/domain/amineAminoAcidPeptideEngine.ts
// Comprehensive Amines, Amino Acids, Peptides & Protein Reactions Engine
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 3: Hợp chất chứa Nitơ) & IUPAC Standards

export type AmineClassification = 'PRIMARY_ALIPHATIC' | 'SECONDARY_ALIPHATIC' | 'TERTIARY_ALIPHATIC' | 'PRIMARY_AROMATIC';

export interface AmineDef {
  id: string;
  nameVI: string;
  nameIUPAC: string;
  formula: string;
  structuralFormula: string;
  molarMass: number; // g/mol
  classification: AmineClassification;
  pKb: number; // Smaller pKb = stronger base
  relativeBasicityRank: number; // 1 = Strongest base in catalog
  litmusReactionVI: string;
  odorVI: string;
  curriculumContextVI: string;
}

export interface AminoAcidDef {
  id: string;
  nameVI: string;
  abbreviation3Letter: string;
  abbreviation1Letter: string;
  formula: string;
  structuralFormula: string;
  molarMass: number; // g/mol
  pKa1_alphaCarboxyl: number; // ~ 2.0 - 2.4
  pKa2_alphaAmino: number; // ~ 9.0 - 9.8
  pKaR_sideChain?: number; // Side chain pKa if ionizable
  isoelectricPointPI: number; // pI
  litmusColorVI: 'DO' | 'XANH' | 'KHONG_DOI_MAU'; // Red, Blue, No change
  netChargeAtPh7: number;
  dietaryClassificationVI: 'THIET_YEU' | 'KHONG_THIET_YEU';
  curriculumContextVI: string;
}

export interface PeptideChainDef {
  sequence: string[]; // e.g. ['Gly', 'Ala', 'Val']
  aminoAcidCount: number;
  peptideBondCount: number; // Count = aminoAcidCount - 1
  molarMass: number; // Sum of AAs - (peptideBondCount * 18.015)
  classificationVI: 'DIPEPTIT' | 'TRIPEPTIT' | 'TETRAPEPTIT' | 'POLYPEPTIT' | 'PROTEIN';
}

export interface ElectrophoresisMigrationResult {
  aminoAcid: AminoAcidDef;
  solutionPH: number;
  netCharge: number; // e.g. +0.95, 0.00, -0.98
  dominantFormVI: 'CATION_DUONG' | 'ZWITTERION_LUONG_CUC' | 'ANION_AM';
  migrationDirectionVI: 'VE_CUC_AM_CATOT' | 'DUNG_YEN_KHONG_DICH_CHUYEN' | 'VE_CUC_DUONG_ANOT';
  migrationSpeedScore: number; // 0 to 1 based on |netCharge|
  explanationVI: string;
}

export interface AnilineBromineTestResult {
  anilineMassGrams: number;
  molesAniline: number;
  bromineMolesNeeded: number;
  stoichiometricRatioAnilineToBr2: number; // 1 : 3
  precipitateCompoundNameVI: string;
  precipitateFormula: string;
  theoreticalPrecipitateGrams: number;
  visualPhenomenonVI: string;
  chemicalEquationVI: string;
  pedagogicalRationaleVI: string;
}

export interface BiuretProteinTestResult {
  peptide: PeptideChainDef;
  canGiveBiuretTest: boolean; // Requires >= 2 peptide bonds (tripeptide or higher)
  observedColorHex: string; // Violet (#8b5cf6) or blue (#38bdf8)
  visualPhenomenonVI: string;
  pedagogicalRationaleVI: string;
  curriculumWarningVI: string;
}

export interface XanthoproteicTestResult {
  sampleNameVI: string;
  containsAromaticRings: boolean;
  nitricAcidReactionPhenomenonVI: string;
  ammoniaNeutralizationPhenomenonVI: string;
  pedagogicalRationaleVI: string;
}

export interface AmineNitrousAcidResult {
  amine: AmineDef;
  temperatureCelsius: number;
  gasEvolutionVI: string; // "Thoát khí N2 sủi bọt mạnh" or "Không thoát khí"
  productNameVI: string;
  visualPhenomenonVI: string;
  chemicalEquationVI: string;
  pedagogicalInsightVI: string;
}

// ----------------------------------------------------------------------------
// 1. CATALOGS
// ----------------------------------------------------------------------------
export const AMINES_CATALOG: AmineDef[] = [
  {
    id: 'dimethylamine',
    nameVI: 'Đimetylamin',
    nameIUPAC: 'N-Methylmethanamine',
    formula: 'C2H7N',
    structuralFormula: '(CH3)2NH',
    molarMass: 45.08,
    classification: 'SECONDARY_ALIPHATIC',
    pKb: 3.27,
    relativeBasicityRank: 1, // Strongest base
    litmusReactionVI: 'Làm quỳ tím ẩm hóa xanh rõ rệt do tính bazơ mạnh nhất',
    odorVI: 'Mùi khai nồng giống amoniac, mùi tanh nồng của cá ươn',
    curriculumContextVI: 'Amin bậc II có hai nhóm metyl đẩy electron (+I) làm tăng mật độ electron trên nguyên tử nitơ, ít bị cản trở không gian hơn bậc III trong dung môi nước.'
  },
  {
    id: 'methylamine',
    nameVI: 'Metylamin',
    nameIUPAC: 'Methanamine',
    formula: 'CH5N',
    structuralFormula: 'CH3NH2',
    molarMass: 31.06,
    classification: 'PRIMARY_ALIPHATIC',
    pKb: 3.36,
    relativeBasicityRank: 2,
    litmusReactionVI: 'Làm quỳ tím ẩm hóa xanh',
    odorVI: 'Chất khí ở điều kiện thường, mùi khai nồng khó chịu',
    curriculumContextVI: 'Amin bậc I tiêu biểu; phản ứng với HNO₂ sủi bọt khí nitơ N₂ ngay ở nhiệt độ thường.'
  },
  {
    id: 'ammonia',
    nameVI: 'Amoniac (Chất chuẩn so sánh)',
    nameIUPAC: 'Azane',
    formula: 'NH3',
    structuralFormula: 'NH3',
    molarMass: 17.03,
    classification: 'PRIMARY_ALIPHATIC',
    pKb: 4.75,
    relativeBasicityRank: 3,
    litmusReactionVI: 'Làm quỳ tím ẩm hóa xanh',
    odorVI: 'Mùi khai đặc trưng',
    curriculumContextVI: 'Mốc chuẩn so sánh tính bazơ: Amin béo > NH₃ > Amin thơm.'
  },
  {
    id: 'aniline',
    nameVI: 'Anilin (Phenylamin)',
    nameIUPAC: 'Benzenamine',
    formula: 'C6H7N',
    structuralFormula: 'C6H5NH2',
    molarMass: 93.13,
    classification: 'PRIMARY_AROMATIC',
    pKb: 9.37,
    relativeBasicityRank: 4, // Weakest base
    litmusReactionVI: 'Tính bazơ rất yếu, KHÔNG làm đổi màu quỳ tím hay phenolphtalein!',
    odorVI: 'Chất lỏng dầu không màu, rất độc, mùi tanh hắc nhẹ, để lâu trong không khí bị oxi hóa hóa đen',
    curriculumContextVI: 'Đôi electron tự do của N liên hợp với vòng benzen (+C), làm giảm mật độ electron trên N và kích hoạt mãnh liệt các vị trí ortho/para của vòng benzen!'
  }
];

export const AMINO_ACIDS_CATALOG: AminoAcidDef[] = [
  {
    id: 'glycine',
    nameVI: 'Glyxin (Axit aminoaxetic)',
    abbreviation3Letter: 'Gly',
    abbreviation1Letter: 'G',
    formula: 'C2H5NO2',
    structuralFormula: 'H2N-CH2-COOH',
    molarMass: 75.07,
    pKa1_alphaCarboxyl: 2.34,
    pKa2_alphaAmino: 9.60,
    isoelectricPointPI: 5.97,
    litmusColorVI: 'KHONG_DOI_MAU', // 1 NH2, 1 COOH => Neutral
    netChargeAtPh7: 0.0,
    dietaryClassificationVI: 'KHONG_THIET_YEU',
    curriculumContextVI: 'Amino axit đơn giản nhất, không có đồng phân quang học vì carbon alpha gắn với 2 nguyên tử hydro giống nhau.'
  },
  {
    id: 'alanine',
    nameVI: 'Alanin (Axit alpha-aminopropionic)',
    abbreviation3Letter: 'Ala',
    abbreviation1Letter: 'A',
    formula: 'C3H7NO2',
    structuralFormula: 'CH3-CH(NH2)-COOH',
    molarMass: 89.09,
    pKa1_alphaCarboxyl: 2.34,
    pKa2_alphaAmino: 9.69,
    isoelectricPointPI: 6.01,
    litmusColorVI: 'KHONG_DOI_MAU',
    netChargeAtPh7: 0.0,
    dietaryClassificationVI: 'KHONG_THIET_YEU',
    curriculumContextVI: 'Có 1 tâm bất đối C* ở vị trí alpha, tồn tại 2 đồng phân quang học D và L (tự nhiên là L-Alanin).'
  },
  {
    id: 'valine',
    nameVI: 'Valin (Axit alpha-aminoisovaleric)',
    abbreviation3Letter: 'Val',
    abbreviation1Letter: 'V',
    formula: 'C5H11NO2',
    structuralFormula: '(CH3)2CH-CH(NH2)-COOH',
    molarMass: 117.15,
    pKa1_alphaCarboxyl: 2.32,
    pKa2_alphaAmino: 9.62,
    isoelectricPointPI: 5.97,
    litmusColorVI: 'KHONG_DOI_MAU',
    netChargeAtPh7: 0.0,
    dietaryClassificationVI: 'THIET_YEU',
    curriculumContextVI: 'Amino axit thiết yếu mạch nhánh (BCAA) cơ thể người không tự tổng hợp được, phải nạp qua thức ăn.'
  },
  {
    id: 'glutamic_acid',
    nameVI: 'Axit glutamic (Axit alpha-aminoglutaric)',
    abbreviation3Letter: 'Glu',
    abbreviation1Letter: 'E',
    formula: 'C5H9NO4',
    structuralFormula: 'HOOC-CH2-CH2-CH(NH2)-COOH',
    molarMass: 147.13,
    pKa1_alphaCarboxyl: 2.19,
    pKa2_alphaAmino: 9.67,
    pKaR_sideChain: 4.25, // Carboxyl side chain
    isoelectricPointPI: 3.22, // (2.19 + 4.25) / 2
    litmusColorVI: 'DO', // 2 COOH, 1 NH2 => Acidic => Red litmus!
    netChargeAtPh7: -1.0,
    dietaryClassificationVI: 'KHONG_THIET_YEU',
    curriculumContextVI: 'Có 2 nhóm -COOH và 1 nhóm -NH₂, làm quỳ tím hóa đỏ! Muối mononatri glutamat (bột ngọt / mì chính) là gia vị điều vị umami quen thuộc.'
  },
  {
    id: 'lysine',
    nameVI: 'Lysin (Axit alpha,epsilon-điaminocaproic)',
    abbreviation3Letter: 'Lys',
    abbreviation1Letter: 'K',
    formula: 'C6H14N2O2',
    structuralFormula: 'H2N-(CH2)4-CH(NH2)-COOH',
    molarMass: 146.19,
    pKa1_alphaCarboxyl: 2.18,
    pKa2_alphaAmino: 8.95,
    pKaR_sideChain: 10.53, // Epsilon amino group
    isoelectricPointPI: 9.74, // (8.95 + 10.53) / 2
    litmusColorVI: 'XANH', // 2 NH2, 1 COOH => Basic => Blue litmus!
    netChargeAtPh7: +1.0,
    dietaryClassificationVI: 'THIET_YEU',
    curriculumContextVI: 'Có 2 nhóm -NH₂ và 1 nhóm -COOH, làm quỳ tím hóa xanh! Là amino axit thiết yếu thúc đẩy phát triển chiều cao và tăng trưởng cơ bắp.'
  }
];

// ----------------------------------------------------------------------------
// 2. ISOELECTRIC POINT & ELECTROPHORESIS MIGRATION MODEL
// ----------------------------------------------------------------------------
export function calculateElectrophoresisMigration(params: {
  aminoAcidId: string;
  solutionPH: number;
}): ElectrophoresisMigrationResult {
  const aa = AMINO_ACIDS_CATALOG.find(a => a.id === params.aminoAcidId);
  if (!aa) {
    throw new Error(`Không tìm thấy amino axit với ID: ${params.aminoAcidId}`);
  }

  const pH = params.solutionPH;
  const pI = aa.isoelectricPointPI;
  const delta = Math.round((pH - pI) * 100) / 100;

  let netCharge: number;
  let dominantFormVI: 'CATION_DUONG' | 'ZWITTERION_LUONG_CUC' | 'ANION_AM';
  let directionVI: 'VE_CUC_AM_CATOT' | 'DUNG_YEN_KHONG_DICH_CHUYEN' | 'VE_CUC_DUONG_ANOT';
  let speedScore: number;
  let explanationVI: string;

  if (Math.abs(delta) < 0.2) {
    // Isoelectric window
    netCharge = 0.0;
    dominantFormVI = 'ZWITTERION_LUONG_CUC';
    directionVI = 'DUNG_YEN_KHONG_DICH_CHUYEN';
    speedScore = 0.0;
    explanationVI = `Tại pH = ${pH} gần điểm đẳng điện pI = ${pI}, phân tử ${aa.nameVI} tồn tại chủ yếu ở dạng ion lưỡng cực (+H3N-CH(R)-COO-) có tổng điện tích bằng 0, không bị hút về bất kỳ điện cực nào trong điện trường.`;
  } else if (pH < pI) {
    // Acidic environment -> Cation
    netCharge = Math.min(2.0, Math.max(0.2, (pI - pH) * 0.4));
    dominantFormVI = 'CATION_DUONG';
    directionVI = 'VE_CUC_AM_CATOT';
    speedScore = Math.min(1.0, (pI - pH) / 4.0);
    explanationVI = `Tại pH = ${pH} < pI = ${pI}, môi trường axit cung cấp thêm H+, nhóm -COO- bị proton hóa thành -COOH, phân tử mang điện tích dương (cation +H3N-CH(R)-COOH), do đó di chuyển về phía cực âm (catot).`;
  } else {
    // Basic environment -> Anion
    netCharge = -Math.min(2.0, Math.max(0.2, (pH - pI) * 0.4));
    dominantFormVI = 'ANION_AM';
    directionVI = 'VE_CUC_DUONG_ANOT';
    speedScore = Math.min(1.0, (pH - pI) / 4.0);
    explanationVI = `Tại pH = ${pH} > pI = ${pI}, môi trường kiềm lấy bớt H+, nhóm -NH3+ bị mất proton thành -NH2, phân tử mang điện tích âm (anion H2N-CH(R)-COO-), do đó di chuyển về phía cực dương (anot).`;
  }

  return {
    aminoAcid: aa,
    solutionPH: pH,
    netCharge: Math.round(netCharge * 100) / 100,
    dominantFormVI,
    migrationDirectionVI: directionVI,
    migrationSpeedScore: Math.round(speedScore * 100) / 100,
    explanationVI
  };
}

// ----------------------------------------------------------------------------
// 3. ANILINE REACTION WITH BROMINE WATER (WHITE PRECIPITATE)
// ----------------------------------------------------------------------------
export function calculateAnilineBromineReaction(params: {
  anilineMassGrams: number;
}): AnilineBromineTestResult {
  const massG = params.anilineMassGrams;
  if (massG <= 0) {
    throw new Error('Khối lượng anilin phải lớn hơn 0.');
  }

  // C6H5NH2 (93.13 g/mol) + 3 Br2 -> C6H2Br3NH2 (329.82 g/mol) + 3 HBr
  const molesAniline = massG / 93.13;
  const molesBr2 = molesAniline * 3;
  const theoreticalPrecipitateG = Math.round(molesAniline * 329.82 * 100) / 100;

  const visual = `Dung dịch nước brom màu da cam bị mất màu ngay lập tức, đồng thời xuất hiện kết tủa trắng dày đặc của 2,4,6-tribromanilin (${theoreticalPrecipitateG} g) lắng xuống đáy ống nghiệm.`;
  const equation = 'C₆H₅NH₂ + 3 Br₂ (dd) → C₆H₂Br₃NH₂↓ (trắng) + 3 HBr';
  const rationale = 'Nhóm -NH₂ liên hợp mạnh với vòng benzen làm tăng mật độ electron ở các vị trí ortho và para gấp nhiều lần, khiến anilin thế đồng thời 3 nguyên tử brom ở điều kiện thường mà không cần xúc tác Fe hay đun nóng!';

  return {
    anilineMassGrams: massG,
    molesAniline: Math.round(molesAniline * 10000) / 10000,
    bromineMolesNeeded: Math.round(molesBr2 * 10000) / 10000,
    stoichiometricRatioAnilineToBr2: 3,
    precipitateCompoundNameVI: '2,4,6-Tribromanilin (Kết tủa trắng)',
    precipitateFormula: 'C6H2Br3NH2',
    theoreticalPrecipitateGrams: theoreticalPrecipitateG,
    visualPhenomenonVI: visual,
    chemicalEquationVI: equation,
    pedagogicalRationaleVI: rationale
  };
}

// ----------------------------------------------------------------------------
// 4. BIURET COLOR TEST FOR PEPTIDES & PROTEINS
// ----------------------------------------------------------------------------
export function evaluateBiuretTest(aminoAcidSymbols: string[]): BiuretProteinTestResult {
  if (aminoAcidSymbols.length < 2) {
    throw new Error('Chuỗi peptit phải có ít nhất 2 amino axit.');
  }

  const count = aminoAcidSymbols.length;
  const bonds = count - 1;

  let classificationVI: 'DIPEPTIT' | 'TRIPEPTIT' | 'TETRAPEPTIT' | 'POLYPEPTIT' | 'PROTEIN';
  if (count === 2) classificationVI = 'DIPEPTIT';
  else if (count === 3) classificationVI = 'TRIPEPTIT';
  else if (count === 4) classificationVI = 'TETRAPEPTIT';
  else if (count <= 10) classificationVI = 'POLYPEPTIT';
  else classificationVI = 'PROTEIN';

  const peptideDef: PeptideChainDef = {
    sequence: aminoAcidSymbols,
    aminoAcidCount: count,
    peptideBondCount: bonds,
    molarMass: count * 100, // Approximation
    classificationVI
  };

  // SGK GDPT 2018 Quy tắc vàng:
  // Đipeptit CHỈ CÓ 1 LIÊN KẾT PEPTIT NÊN KHÔNG THAM GIA PHẢN ỨNG MÀU BIURET!
  // Từ tripeptit trở lên (>= 2 liên kết peptit) hoặc protein mới có phản ứng màu biuret tím!
  const canGive = bonds >= 2;

  if (canGive) {
    return {
      peptide: peptideDef,
      canGiveBiuretTest: true,
      observedColorHex: '#8b5cf6', // Violet
      visualPhenomenonVI: 'Dung dịch chuyển từ màu xanh lam nhạt của Cu(OH)₂ sang màu tím hoặc tím đỏ đặc trưng của phức chất phối trí đồng-peptit.',
      pedagogicalRationaleVI: 'Các liên kết peptit (-CO-NH-) phối trí nguyên tử nitơ và oxy với ion Cu²⁺ trong môi trường kiềm mạnh, tạo phức chelate nhiều vòng có màu tím biuret đặc trưng.',
      curriculumWarningVI: 'Thỏa mãn điều kiện SGK GDPT 2018: Chuỗi có từ 2 liên kết peptit trở lên (tripeptit trở lên).'
    };
  } else {
    return {
      peptide: peptideDef,
      canGiveBiuretTest: false,
      observedColorHex: '#38bdf8', // Light blue (unreacted Cu(OH)2)
      visualPhenomenonVI: 'Dung dịch không đổi sang màu tím, vẫn giữ nguyên màu xanh lam nhạt của kết tủa Cu(OH)₂ ban đầu.',
      pedagogicalRationaleVI: 'Đipeptit chỉ có duy nhất 1 liên kết peptit (-CO-NH-), không đủ mật độ nguyên tử phối trí để hình thành phức chelate đa vòng bền vững với Cu²⁺.',
      curriculumWarningVI: 'BẪY KINH ĐIỂN THI THPT GDPT 2018: Đipeptit (2 gốc amino axit, 1 liên kết peptit) KHÔNG CÓ phản ứng màu biuret!'
    };
  }
}

// ----------------------------------------------------------------------------
// 5. XANTHOPROTEIC TEST (NITRIC ACID COLORATION)
// ----------------------------------------------------------------------------
export function evaluateXanthoproteicTest(params: {
  sampleNameVI: string;
  hasAromaticResidues: boolean; // Phenylalanine, Tyrosine, Tryptophan
}): XanthoproteicTestResult {
  const { sampleNameVI, hasAromaticResidues } = params;

  if (hasAromaticResidues) {
    return {
      sampleNameVI,
      containsAromaticRings: true,
      nitricAcidReactionPhenomenonVI: 'Khi nhỏ HNO₃ đặc vào và đun nóng nhẹ, xuất hiện kết tủa màu vàng tươi do phản ứng nitơ hóa vòng benzen của các gốc thơm (tyrosin, phenylalanin).',
      ammoniaNeutralizationPhenomenonVI: 'Khi nhỏ tiếp dung dịch amoniac NH₃ hoặc kiềm NaOH vào, kết tủa vàng chuyển sang màu da cam đậm rực rỡ.',
      pedagogicalRationaleVI: 'Axit nitric đặc nitơ hóa nhân thơm (-C6H4-NO2) của các gốc amino axit thơm trong chuỗi polipeptit, tạo hợp chất nitro thơm màu vàng (phản ứng xantoprotein).'
    };
  } else {
    return {
      sampleNameVI,
      containsAromaticRings: false,
      nitricAcidReactionPhenomenonVI: 'Không có hiện tượng hóa vàng khi tác dụng với axit nitric đặc.',
      ammoniaNeutralizationPhenomenonVI: 'Không có biến đổi màu sang da cam khi kiềm hóa.',
      pedagogicalRationaleVI: 'Mẫu thử không chứa các gốc amino axit có nhân thơm (Phe, Tyr, Trp) nên không thể tham gia phản ứng nitro hóa tạo dẫn xuất màu vàng.'
    };
  }
}
