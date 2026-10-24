// src/domain/esterLipidEngine.ts
// Comprehensive Esterification Equilibrium, Lipid Saponification, and Soap Salting-Out Engine
// Strictly conforming to Vietnam GDPT 2018 Grade 12 Chemistry (Chủ đề 1: Este - Lipit - Xà Phòng) & IUPAC Standards

export interface EsterAromaDef {
  id: string;
  nameVI: string;
  nameIUPAC: string;
  formula: string;
  structuralFormula: string;
  acidPrecursorVI: string;
  acidFormula: string;
  alcoholPrecursorVI: string;
  alcoholFormula: string;
  fragranceNoteVI: string;
  boilingPointC: number;
  densityGml: number;
  waterSolubilityGper100ml: number;
  curriculumContextVI: string;
}

export interface TriglycerideDef {
  id: string;
  nameVI: string;
  nameIUPAC: string;
  formula: string;
  fattyAcidNameVI: string;
  fattyAcidFormula: string;
  fattyAcidCarbonCount: number;
  fattyAcidDoubleBonds: number;
  molarMass: number; // g/mol
  physicalStateAt25C: 'LIQUID_OIL' | 'SOLID_FAT';
  meltingPointC: number;
  saponificationValue: number; // mg KOH / g
  iodineValue: number; // g I2 / 100 g
  originVI: string;
  industrialOrDietaryUseVI: string;
}

export const ESTERS_CATALOG: EsterAromaDef[] = [
  {
    id: 'isoamyl_acetate',
    nameVI: 'Isoamyl axetat (Dầu chuối)',
    nameIUPAC: '3-Methylbutyl acetate',
    formula: 'C7H14O2',
    structuralFormula: 'CH3COOCH2CH2CH(CH3)2',
    acidPrecursorVI: 'Axit axetic (CH₃COOH)',
    acidFormula: 'CH3COOH',
    alcoholPrecursorVI: 'Ancol isoamylic ((CH₃)₂CHCH₂CH₂OH)',
    alcoholFormula: '(CH3)2CHCH2CH2OH',
    fragranceNoteVI: 'Hương thơm chuối chín ngọt ngào đặc trưng',
    boilingPointC: 142.0,
    densityGml: 0.876,
    waterSolubilityGper100ml: 0.2,
    curriculumContextVI: 'Thí nghiệm điều chế este kinh điển GDPT 2018 Lớp 12: Đun hồi lưu axit axetic và ancol isoamylic với xúc tác H₂SO₄ đặc.'
  },
  {
    id: 'ethyl_acetate',
    nameVI: 'Etyl axetat',
    nameIUPAC: 'Ethyl acetate',
    formula: 'C4H8O2',
    structuralFormula: 'CH3COOCH2CH3',
    acidPrecursorVI: 'Axit axetic (CH₃COOH)',
    acidFormula: 'CH3COOH',
    alcoholPrecursorVI: 'Etanol (C₂H₅OH)',
    alcoholFormula: 'C2H5OH',
    fragranceNoteVI: 'Mùi hoa quả nhẹ, dung môi thơm dễ chịu',
    boilingPointC: 77.1,
    densityGml: 0.902,
    waterSolubilityGper100ml: 8.3,
    curriculumContextVI: 'Este tiêu biểu nhất trong sách giáo khoa, dùng rộng rãi làm dung môi chiết tách và pha sơn móng tay.'
  },
  {
    id: 'benzyl_acetate',
    nameVI: 'Benzyl axetat',
    nameIUPAC: 'Benzyl acetate',
    formula: 'C9H10O2',
    structuralFormula: 'CH3COOCH2C6H5',
    acidPrecursorVI: 'Axit axetic (CH₃COOH)',
    acidFormula: 'CH3COOH',
    alcoholPrecursorVI: 'Ancol benzylic (C₆H₅CH₂OH)',
    alcoholFormula: 'C6H5CH2OH',
    fragranceNoteVI: 'Hương thơm nồng nàn thanh khiết của hoa nhài (hoa lài)',
    boilingPointC: 212.0,
    densityGml: 1.055,
    waterSolubilityGper100ml: 0.03,
    curriculumContextVI: 'Este thơm giá trị cao trong ngành công nghiệp nước hoa và mỹ phẩm cao cấp.'
  },
  {
    id: 'ethyl_formate',
    nameVI: 'Etyl fomat',
    nameIUPAC: 'Ethyl formate',
    formula: 'C3H6O2',
    structuralFormula: 'HCOOCH2CH3',
    acidPrecursorVI: 'Axit fomic (HCOOH)',
    acidFormula: 'HCOOH',
    alcoholPrecursorVI: 'Etanol (C₂H₅OH)',
    alcoholFormula: 'C2H5OH',
    fragranceNoteVI: 'Mùi hương ngọt thanh của quả đào và quả mâm xôi',
    boilingPointC: 54.0,
    densityGml: 0.917,
    waterSolubilityGper100ml: 9.0,
    curriculumContextVI: 'Este duy nhất có nhóm chức fomat (-CHO) nên vẫn tham gia phản ứng tráng bạc với thuốc thử Tollens!'
  },
  {
    id: 'ethyl_butyrate',
    nameVI: 'Etyl butirat',
    nameIUPAC: 'Ethyl butyrate',
    formula: 'C6H12O2',
    structuralFormula: 'CH3CH2CH2COOCH2CH3',
    acidPrecursorVI: 'Axit butiric (CH₃CH₂CH₂COOH)',
    acidFormula: 'CH3CH2CH2COOH',
    alcoholPrecursorVI: 'Etanol (C₂H₅OH)',
    alcoholFormula: 'C2H5OH',
    fragranceNoteVI: 'Mùi dứa chín (thơm/khóm) nhiệt đới tươi mát',
    boilingPointC: 121.0,
    densityGml: 0.879,
    waterSolubilityGper100ml: 0.6,
    curriculumContextVI: 'Dùng tạo hương liệu trong ngành nước giải khát, kẹo dứa và siro hoa quả.'
  }
];

export const TRIGLYCERIDES_CATALOG: TriglycerideDef[] = [
  {
    id: 'triolein',
    nameVI: 'Triolein (Grixeryl trioleat)',
    nameIUPAC: '1,2,3-Tri(cis-9-octadecenoyl)glycerol',
    formula: 'C57H104O6',
    fattyAcidNameVI: 'Axit oleic (C₁₇H₃₃COOH - Kém no, 1 nối đôi cis)',
    fattyAcidFormula: 'C17H33COOH',
    fattyAcidCarbonCount: 18,
    fattyAcidDoubleBonds: 1,
    molarMass: 885.43,
    physicalStateAt25C: 'LIQUID_OIL',
    meltingPointC: -5.0,
    saponificationValue: 190.1,
    iodineValue: 86.0,
    originVI: 'Thành phần chính của dầu ô liu (70-80%), dầu lạc và dầu vừng.',
    industrialOrDietaryUseVI: 'Dầu ăn cao cấp bảo vệ tim mạch; hydro hóa xúc tác Ni ở 180°C tạo tristearin rắn.'
  },
  {
    id: 'tristearin',
    nameVI: 'Tristearin (Grixeryl tristearat)',
    nameIUPAC: '1,2,3-Trioctadecanoylglycerol',
    formula: 'C57H110O6',
    fattyAcidNameVI: 'Axit stearic (C₁₇H₃₅COOH - No hoàn toàn)',
    fattyAcidFormula: 'C17H35COOH',
    fattyAcidCarbonCount: 18,
    fattyAcidDoubleBonds: 0,
    molarMass: 891.48,
    physicalStateAt25C: 'SOLID_FAT',
    meltingPointC: 71.0,
    saponificationValue: 188.8,
    iodineValue: 0.0,
    originVI: 'Có nhiều trong mỡ bò, mỡ cừu và bơ ca cao.',
    industrialOrDietaryUseVI: 'Nguyên liệu sản xuất nến sáp, xà phòng cứng bánh và kem dưỡng ẩm da.'
  },
  {
    id: 'tripalmitin',
    nameVI: 'Tripalmitin (Grixeryl tripalmitat)',
    nameIUPAC: '1,2,3-Trihexadecanoylglycerol',
    formula: 'C51H98O6',
    fattyAcidNameVI: 'Axit palmitic (C₁₅H₃₁COOH - No hoàn toàn)',
    fattyAcidFormula: 'C15H31COOH',
    fattyAcidCarbonCount: 16,
    fattyAcidDoubleBonds: 0,
    molarMass: 807.32,
    physicalStateAt25C: 'SOLID_FAT',
    meltingPointC: 66.0,
    saponificationValue: 208.5,
    iodineValue: 0.0,
    originVI: 'Có nhiều trong mỡ lợn (heo) và dầu cọ nhiệt đới.',
    industrialOrDietaryUseVI: 'Sản xuất xà phòng bánh truyền thống và chất nhũ hóa thực phẩm.'
  },
  {
    id: 'trilinolein',
    nameVI: 'Trilinolein (Grixeryl trilinoleat)',
    nameIUPAC: '1,2,3-Tri(cis,cis-9,12-octadecadienoyl)glycerol',
    formula: 'C57H98O6',
    fattyAcidNameVI: 'Axit linoleic (C₁₇H₃₁COOH - 2 nối đôi cis, Omega-6)',
    fattyAcidFormula: 'C17H31COOH',
    fattyAcidCarbonCount: 18,
    fattyAcidDoubleBonds: 2,
    molarMass: 879.38,
    physicalStateAt25C: 'LIQUID_OIL',
    meltingPointC: -12.0,
    saponificationValue: 191.4,
    iodineValue: 173.2,
    originVI: 'Dầu hạt lanh, dầu đậu nành, dầu hướng dương.',
    industrialOrDietaryUseVI: 'Axit béo thiết yếu cơ thể không tự tổng hợp được; dùng trong sơn dầu mau khô.'
  }
];

export interface EsterificationEquilibriumResult {
  acidName: string;
  alcoholName: string;
  initialAcidMoles: number;
  initialAlcoholMoles: number;
  equilibriumConstantKc: number;
  dehydratingAgentUsed: boolean;
  equilibriumEsterMoles: number;
  equilibriumWaterMoles: number;
  remainingAcidMoles: number;
  remainingAlcoholMoles: number;
  theoreticalMaxEsterMoles: number;
  conversionYieldPercent: number; // Conversion of limiting reactant
  equilibriumStateVI: string;
  stepByStepExplanationVI: string[];
}

export interface SaponificationResult {
  lipid: TriglycerideDef;
  massGrams: number;
  naohConcentrationM: number;
  naohVolumeMl: number;
  soapCompoundFormula: string;
  soapCompoundNameVI: string;
  theoreticalSoapYieldGrams: number;
  theoreticalGlycerolYieldGrams: number;
  saponificationValueMgKohPerG: number;
  iodineAbsorptionCapacityGrams: number;
  stepByStepExplanationVI: string[];
}

export interface SaltingOutResult {
  initialSoapMassGrams: number;
  waterVolumeMl: number;
  addedNaclGrams: number;
  naclConcentrationPercent: number;
  isSaltingOutThresholdReached: boolean;
  precipitatedSoapCakeGrams: number;
  residualDissolvedSoapGrams: number;
  precipitationEfficiencyPercent: number;
  visualPhenomenonVI: string;
  pedagogicalRationaleVI: string;
}

/**
 * 1. Fischer Esterification Equilibrium:
 *    RCOOH + R'OH <=> RCOOR' + H2O
 *    Kc = (x * x_water) / ((a - x) * (b - x))
 */
export function calculateFischerEsterificationYield(params: {
  initialAcidMoles: number;
  initialAlcoholMoles: number;
  equilibriumConstantKc?: number; // Default 4.0 for primary alcohols
  dehydratingAgentUsed?: boolean; // If true (e.g. H2SO4 removes 90% water or Dean-Stark trap)
}): EsterificationEquilibriumResult {
  const a = params.initialAcidMoles;
  const b = params.initialAlcoholMoles;
  const Kc = params.equilibriumConstantKc !== undefined ? params.equilibriumConstantKc : 4.0;
  const dehydrate = params.dehydratingAgentUsed || false;

  if (a <= 0 || b <= 0) {
    throw new Error('Số mol axit và ancol ban đầu phải lớn hơn 0.');
  }

  const limiting = Math.min(a, b);

  // If dehydrating agent removes water continuously:
  // Water activity is drastically reduced (say effectively 10% stays in equilibrium)
  const effectiveWaterFactor = dehydrate ? 0.1 : 1.0;

  // Solve quadratic equation:
  // Kc = (x * (effectiveWaterFactor * x)) / ((a - x) * (b - x))
  // => (effectiveWaterFactor - Kc) * x^2 + Kc*(a + b)*x - Kc*a*b = 0
  const A = effectiveWaterFactor - Kc;
  const B = Kc * (a + b);
  const C = -Kc * a * b;

  let x: number;
  if (Math.abs(A) < 1e-6) {
    x = -C / B;
  } else {
    const delta = B * B - 4 * A * C;
    const x1 = (-B + Math.sqrt(delta)) / (2 * A);
    const x2 = (-B - Math.sqrt(delta)) / (2 * A);
    // x must be between 0 and min(a, b)
    if (x1 > 0 && x1 < limiting) x = x1;
    else x = x2;
  }

  const roundedX = Math.round(x * 10000) / 10000;
  const yieldPct = Math.round((roundedX / limiting) * 1000) / 10;
  const remAcid = Math.round((a - roundedX) * 10000) / 10000;
  const remAlc = Math.round((b - roundedX) * 10000) / 10000;

  const stepsVI: string[] = [
    `Bước 1: Thiết lập phương trình cân bằng Fischer: RCOOH + R'OH ⇌ RCOOR' + H₂O (Hằng số Kc = ${Kc}).`,
    `Bước 2: Lượng ban đầu: Axit = ${a} mol, Ancol = ${b} mol (Chất hạn chế lý thuyết: ${limiting} mol).`,
    dehydrate
      ? `Bước 3: Dùng H₂SO₄ đặc hút ẩm (hoặc bẫy Dean-Stark tách nước liên tục): Làm giảm nồng độ H₂O, cân bằng chuyển dịch mạnh mẽ theo chiều thuận (Nguyên lý Le Chatelier)!`
      : `Bước 3: Không dùng chất hút ẩm: Phản ứng dừng lại khi đạt trạng thái cân bằng động (nước sinh ra cạnh tranh phản ứng nghịch thủy phân).`,
    `Bước 4: Giải phương trình cân bằng thu được x = ${roundedX} mol este sinh ra.`,
    `Bước 5: Hiệu suất chuyển hóa đạt H = ${yieldPct}% (Còn dư ${remAcid} mol axit và ${remAlc} mol ancol).`
  ];

  return {
    acidName: 'Axit cacboxylic (RCOOH)',
    alcoholName: 'Ancol (R\'OH)',
    initialAcidMoles: a,
    initialAlcoholMoles: b,
    equilibriumConstantKc: Kc,
    dehydratingAgentUsed: dehydrate,
    equilibriumEsterMoles: roundedX,
    equilibriumWaterMoles: dehydrate ? Math.round(roundedX * 0.1 * 10000) / 10000 : roundedX,
    remainingAcidMoles: remAcid,
    remainingAlcoholMoles: remAlc,
    theoreticalMaxEsterMoles: limiting,
    conversionYieldPercent: yieldPct,
    equilibriumStateVI: dehydrate
      ? 'Chuyển dịch cân bằng thuận cực đại nhờ tách nước liên tục'
      : 'Cân bằng thuận nghịch hữu cơ chuẩn GDPT 2018',
    stepByStepExplanationVI: stepsVI
  };
}

/**
 * 2. Triglyceride Saponification:
 *    (RCOO)3C3H5 + 3 NaOH -> 3 RCOONa + C3H5(OH)3
 */
export function calculateSaponification(params: {
  triglycerideId: string;
  lipidMassGrams: number;
  naohConcentrationM?: number; // Default 1.0 M
}): SaponificationResult {
  const lipid = TRIGLYCERIDES_CATALOG.find(t => t.id === params.triglycerideId);
  if (!lipid) {
    throw new Error(`Không tìm thấy chất béo với ID: ${params.triglycerideId}`);
  }

  const massG = params.lipidMassGrams;
  if (massG <= 0) {
    throw new Error('Khối lượng chất béo phải lớn hơn 0.');
  }

  const cNaOH = params.naohConcentrationM !== undefined ? params.naohConcentrationM : 1.0;
  if (cNaOH <= 0) {
    throw new Error('Nồng độ NaOH phải lớn hơn 0.');
  }

  // Mol lipid = massG / M_lipid
  const lipidMoles = massG / lipid.molarMass;
  // Mol NaOH cần = 3 * mol lipid
  const naohMolesNeeded = lipidMoles * 3;
  const naohVolumeMl = Math.round((naohMolesNeeded / cNaOH) * 1000 * 10) / 10;

  // Mol Glycerol sinh ra = mol lipid (M = 92.09 g/mol)
  const glycerolGrams = Math.round(lipidMoles * 92.0938 * 100) / 100;

  // Khối lượng xà phòng muối Natri RCOONa:
  // Định luật bảo toàn khối lượng: m_lipid + m_NaOH = m_xà_phòng + m_glycerol
  const naohMassGrams = naohMolesNeeded * 39.997;
  const soapGrams = Math.round((massG + naohMassGrams - glycerolGrams) * 100) / 100;

  // Khả năng cộng I2 (Iodine absorption capacity):
  // 1 mol lipid cộng lipid.fattyAcidDoubleBonds * 3 mol I2 (M_I2 = 253.8 g/mol)
  const totalDoubleBondsMoles = lipidMoles * (lipid.fattyAcidDoubleBonds * 3);
  const iodineGrams = Math.round(totalDoubleBondsMoles * 253.808 * 100) / 100;

  const stepsVI: string[] = [
    `Bước 1: Phản ứng xà phòng hóa: (${lipid.fattyAcidFormula.replace('COOH', 'COO')})₃C₃H₅ + 3 NaOH → 3 ${lipid.fattyAcidFormula.replace('COOH', 'COONa')} + C₃H₅(OH)₃.`,
    `Bước 2: Số mol chất béo [${lipid.nameVI}]: n = m / M = ${massG} / ${lipid.molarMass} = ${Math.round(lipidMoles * 10000) / 10000} mol.`,
    `Bước 3: Lượng NaOH tối thiểu cần dùng: n_NaOH = 3 × n_lipid = ${Math.round(naohMolesNeeded * 10000) / 10000} mol (thể tích dung dịch ${cNaOH} M: ${naohVolumeMl} mL).`,
    `Bước 4: Áp dụng định luật bảo toàn khối lượng: m_xà_phòng = m_chất_béo + m_NaOH - m_grixerol = ${massG} + ${Math.round(naohMassGrams * 100) / 100} - ${glycerolGrams} = ${soapGrams} g.`,
    `Bước 5: Sản phẩm grixerol (glycerin) thu được: ${glycerolGrams} g (giá trị cao trong sản xuất mỹ phẩm và thuốc nổ nitrophotphin).`,
    lipid.fattyAcidDoubleBonds > 0
      ? `Bước 6: Độ không no: Có ${lipid.fattyAcidDoubleBonds * 3} liên kết đôi C=C trong phân tử, có khả năng làm mất màu tối đa ${iodineGrams} g I₂ (Chỉ số iod: ${lipid.iodineValue}).`
      : `Bước 6: Chất béo no hoàn toàn (Chỉ số iod = 0), không làm mất màu dung dịch brom hay iod ở điều kiện thường.`
  ];

  return {
    lipid,
    massGrams: massG,
    naohConcentrationM: cNaOH,
    naohVolumeMl,
    soapCompoundFormula: lipid.fattyAcidFormula.replace('COOH', 'COONa'),
    soapCompoundNameVI: `Muối natri của ${lipid.fattyAcidNameVI.split('(')[0].trim()}`,
    theoreticalSoapYieldGrams: soapGrams,
    theoreticalGlycerolYieldGrams: glycerolGrams,
    saponificationValueMgKohPerG: lipid.saponificationValue,
    iodineAbsorptionCapacityGrams: iodineGrams,
    stepByStepExplanationVI: stepsVI
  };
}

/**
 * 3. Salting-Out Effect (Hiệu Ứng Muối Ăn Tách Xà Phòng):
 *    Adding saturated NaCl increases ionic strength, lowering soap solubility
 */
export function simulateSoapSaltingOut(params: {
  soapMassGrams: number;
  waterVolumeMl: number;
  addedNaclGrams: number;
}): SaltingOutResult {
  const { soapMassGrams, waterVolumeMl, addedNaclGrams } = params;

  if (soapMassGrams <= 0 || waterVolumeMl <= 0 || addedNaclGrams < 0) {
    throw new Error('Khối lượng xà phòng và thể tích nước phải lớn hơn 0; khối lượng NaCl không âm.');
  }

  // NaCl mass percentage in solution
  const naclPct = Math.round((addedNaclGrams / (waterVolumeMl + addedNaclGrams)) * 1000) / 10;

  // Salting out threshold:
  // In typical GDPT 2018 experiment, saturated NaCl (~15-25% w/w) causes ~90-96% soap to precipitate
  // Threshold starts around 5% NaCl
  const isThreshold = naclPct >= 8.0;

  let efficiencyPct: number;
  if (naclPct < 2.0) {
    efficiencyPct = 0;
  } else if (naclPct < 8.0) {
    // Partial precipitation: 0% to 50%
    efficiencyPct = Math.round(((naclPct - 2.0) / 6.0) * 50 * 10) / 10;
  } else if (naclPct < 16.0) {
    // Strong precipitation: 50% to 92%
    efficiencyPct = Math.round((50 + ((naclPct - 8.0) / 8.0) * 42) * 10) / 10;
  } else {
    // Saturated limit (~95% cake yield)
    efficiencyPct = 95.5;
  }

  const precipitatedGrams = Math.round((soapMassGrams * (efficiencyPct / 100)) * 100) / 100;
  const dissolvedGrams = Math.round((soapMassGrams - precipitatedGrams) * 100) / 100;

  let phenomenonVI: string;
  if (!isThreshold) {
    phenomenonVI = 'Dung dịch còn nhớt và đồng nhất, lượng muối ăn NaCl chưa đủ nồng độ để phá vỡ lớp vỏ solvat hóa của muối axit béo.';
  } else {
    phenomenonVI = `Xuất hiện các mảng xà phòng màu trắng đục đông tụ, nhẹ hơn nước nổi lên trên bề mặt dung dịch. Phần dung dịch trong suốt phía dưới chứa grixerol, NaCl và NaOH dư.`;
  }

  const rationaleVI = 'Hiệu ứng muối kết (Salting-out): Các ion Na⁺ và Cl⁻ có mật độ điện tích cao thu hút mạnh mẽ các phân tử nước để solvat hóa, làm mất lớp vỏ hiđrat hóa bao quanh micelle xà phòng (RCOO⁻). Đồng thời, nồng độ ion Na⁺ cực cao trong dung dịch làm chuyển dịch cân bằng phân ly RCOONa(s) ⇌ RCOO⁻ + Na⁺ theo chiều nghịch (hiệu ứng ion chung), buộc xà phòng kết tủa hoàn toàn!';

  return {
    initialSoapMassGrams: soapMassGrams,
    waterVolumeMl,
    addedNaclGrams,
    naclConcentrationPercent: naclPct,
    isSaltingOutThresholdReached: isThreshold,
    precipitatedSoapCakeGrams: precipitatedGrams,
    residualDissolvedSoapGrams: dissolvedGrams,
    precipitationEfficiencyPercent: efficiencyPct,
    visualPhenomenonVI: phenomenonVI,
    pedagogicalRationaleVI: rationaleVI
  };
}
