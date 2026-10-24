/**
 * ELEMENTA - Carbonyl Compounds & Carboxylic Acids Domain Engine
 * Conforms strictly to IUPAC Gold Book and Vietnam GDPT 2018 Grade 11 Chemistry Curriculum:
 * Chủ đề 6: Hợp chất Carbonyl (Aldehyde - Ketone) và Carboxylic Acid.
 */

export interface CarbonylDef {
  id: string;
  nameVi: string;
  nameIupac: string;
  formula: string;
  molecularWeight: number;
  carbonylType: 'ANĐEHIT' | 'XETON';
  hasMethylCarbonylGroup: boolean; // Has CH3-C(=O)- group for positive Iodoform test
  boilingPointC: number;
  tollensSilverEquivalents: number; // 4 for HCHO, 2 for other aldehydes, 0 for ketones
  descriptionVi: string;
}

export interface CarboxylicAcidDef {
  id: string;
  nameVi: string;
  nameIupac: string;
  formula: string;
  molecularWeight: number;
  pKa: number;
  carboxylCount: number;
  hasAldehydeGroup: boolean; // True for HCOOH
  hasCarbonCarbonDoubleBond: boolean; // True for acrylic acid CH2=CH-COOH
  boilingPointC: number;
  descriptionVi: string;
}

export interface TollensTestResult {
  compoundId: string;
  isPositive: boolean;
  silverEquivalentsPerMole: number;
  silverMassG: number;
  solutionAppearanceVi: string;
  chemicalEquation: string;
  isPedagogicalTrap: boolean; // True for HCHO (1 -> 4 Ag) or HCOOH (acid that mirrors)
  explanationVi: string;
}

export interface FehlingTestResult {
  compoundId: string;
  isPositive: boolean;
  cu2oColorVi: string;
  precipitateColorHex: string;
  chemicalEquation: string;
  explanationVi: string;
}

export interface IodoformTestResult {
  compoundId: string;
  isPositive: boolean;
  precipitateNameVi: string;
  precipitateColorVi: string;
  precipitateColorHex: string;
  precipitateMassG?: number;
  chemicalEquation: string;
  explanationVi: string;
}

export interface AcidReactivityResult {
  acidId: string;
  reagent: 'NA' | 'NAOH' | 'NA2CO3' | 'CUO';
  reactionOccurs: boolean;
  gasEvolved?: string;
  solutionColorChangeVi: string;
  chemicalEquation: string;
  explanationVi: string;
}

// 1. Catalog of Carbonyl Compounds in GDPT 2018
export const CURRICULUM_CARBONYLS: CarbonylDef[] = [
  {
    id: 'formaldehyde',
    nameVi: 'Fomanđehit (Metanal)',
    nameIupac: 'Methanal',
    formula: 'HCHO',
    molecularWeight: 30.03,
    carbonylType: 'ANĐEHIT',
    hasMethylCarbonylGroup: false,
    boilingPointC: -19.0,
    tollensSilverEquivalents: 4,
    descriptionVi: 'Chất khí không màu, mùi hăng cay nồng. Dung dịch 37-40% trong nước gọi là fomon (formol) dùng ngâm xác, tiệt trùng. Phản ứng tráng bạc tỉ lệ đặc biệt 1 mol HCHO tạo 4 mol Ag.'
  },
  {
    id: 'acetaldehyde',
    nameVi: 'Axetanđehit (Etanal)',
    nameIupac: 'Ethanal',
    formula: 'CH₃CHO',
    molecularWeight: 44.05,
    carbonylType: 'ANĐEHIT',
    hasMethylCarbonylGroup: true,
    boilingPointC: 20.2,
    tollensSilverEquivalents: 2,
    descriptionVi: 'Chất lỏng dễ bay hơi, mùi táo xanh. Có nhóm CH₃-C=O nên vừa tráng bạc tạo 2 Ag vừa cho phản ứng iodoform tạo kết tủa vàng CHI₃.'
  },
  {
    id: 'benzaldehyde',
    nameVi: 'Benzanđehit',
    nameIupac: 'Benzaldehyde',
    formula: 'C₆H₅CHO',
    molecularWeight: 106.12,
    carbonylType: 'ANĐEHIT',
    hasMethylCarbonylGroup: false,
    boilingPointC: 178.1,
    tollensSilverEquivalents: 2,
    descriptionVi: 'Anđehit thơm có mùi hạnh nhân đặc trưng, dùng trong hương liệu mỹ phẩm và thực phẩm. Tham gia phản ứng tráng bạc tạo 2 Ag.'
  },
  {
    id: 'acetone',
    nameVi: 'Axeton (Propan-2-on)',
    nameIupac: 'Propan-2-one',
    formula: 'CH₃COCH₃',
    molecularWeight: 58.08,
    carbonylType: 'XETON',
    hasMethylCarbonylGroup: true,
    boilingPointC: 56.2,
    tollensSilverEquivalents: 0,
    descriptionVi: 'Xeton đơn giản nhất, dung môi hòa tan sơn móng tay và nhiều polyme. Không tráng bạc nhưng cho phản ứng iodoform tạo kết tủa vàng CHI₃.'
  },
  {
    id: 'acetophenone',
    nameVi: 'Axetophenon (Metyl phenyl xeton)',
    nameIupac: '1-Phenylethan-1-one',
    formula: 'C₆H₅COCH₃',
    molecularWeight: 120.15,
    carbonylType: 'XETON',
    hasMethylCarbonylGroup: true,
    boilingPointC: 202.0,
    tollensSilverEquivalents: 0,
    descriptionVi: 'Xeton thơm có nhóm CH₃-C=O, không tráng bạc nhưng phản ứng với I₂/NaOH tạo kết tủa vàng iodoform.'
  },
  {
    id: 'benzophenone',
    nameVi: 'Benzophenon (Điphenyl xeton)',
    nameIupac: 'Diphenylmethanone',
    formula: 'C₆H₅COC₆H₅',
    molecularWeight: 182.22,
    carbonylType: 'XETON',
    hasMethylCarbonylGroup: false,
    boilingPointC: 305.4,
    tollensSilverEquivalents: 0,
    descriptionVi: 'Xeton thơm đối xứng, trơ với cả thuốc thử Tollens và phản ứng iodoform do không có nhóm CH₃-C=O.'
  }
];

// 2. Catalog of Carboxylic Acids in GDPT 2018
export const CURRICULUM_CARBOXYLIC_ACIDS: CarboxylicAcidDef[] = [
  {
    id: 'formic-acid',
    nameVi: 'Axit Fomic (Axit Metanoic)',
    nameIupac: 'Methanoic acid',
    formula: 'HCOOH',
    molecularWeight: 46.03,
    pKa: 3.75,
    carboxylCount: 1,
    hasAldehydeGroup: true,
    hasCarbonCarbonDoubleBond: false,
    boilingPointC: 100.8,
    descriptionVi: 'Axit fomic có trong nọc kiến lửa và ong. Cấu tạo vừa có nhóm -COOH vừa có nhóm -CHO nên là axit cacboxylic duy nhất có phản ứng tráng bạc (1 mol -> 2 mol Ag) và làm mất màu dung dịch brom.'
  },
  {
    id: 'acetic-acid',
    nameVi: 'Axit Axetic (Axit Etanoic)',
    nameIupac: 'Ethanoic acid',
    formula: 'CH₃COOH',
    molecularWeight: 60.05,
    pKa: 4.76,
    carboxylCount: 1,
    hasAldehydeGroup: false,
    hasCarbonCarbonDoubleBond: false,
    boilingPointC: 118.1,
    descriptionVi: 'Thành phần chính của giấm ăn (dung dịch 2-5%). Nguyên liệu chủ chốt trong công nghiệp dệt nhuộm, dược phẩm và tơ axetat.'
  },
  {
    id: 'chloroacetic-acid',
    nameVi: 'Axit Cloaxetic',
    nameIupac: 'Chloroacetic acid',
    formula: 'CH₂ClCOOH',
    molecularWeight: 94.49,
    pKa: 2.86,
    carboxylCount: 1,
    hasAldehydeGroup: false,
    hasCarbonCarbonDoubleBond: false,
    boilingPointC: 189.0,
    descriptionVi: 'Nguyên tử Cl có độ âm điện lớn gây hiệu ứng cảm ứng hút electron (-I), làm phân cực liên kết O-H mạnh hơn, tính axit mạnh hơn axit axetic gần 100 lần.'
  },
  {
    id: 'trichloroacetic-acid',
    nameVi: 'Axit Tricloaxetic (TCA)',
    nameIupac: 'Trichloroacetic acid',
    formula: 'CCl₃COOH',
    molecularWeight: 163.38,
    pKa: 0.65,
    carboxylCount: 1,
    hasAldehydeGroup: false,
    hasCarbonCarbonDoubleBond: false,
    boilingPointC: 196.0,
    descriptionVi: 'Ba nguyên tử Cl hút electron cực mạnh (-I), làm tính axit tiệm cận các axit vô cơ mạnh (pKa=0.65). Dùng trong da liễu để lột tẩy tế bào chết hóa học.'
  },
  {
    id: 'acrylic-acid',
    nameVi: 'Axit Acrylic (Axit Prop-2-enoic)',
    nameIupac: 'Prop-2-enoic acid',
    formula: 'CH₂=CH-COOH',
    molecularWeight: 72.06,
    pKa: 4.25,
    carboxylCount: 1,
    hasAldehydeGroup: false,
    hasCarbonCarbonDoubleBond: true,
    boilingPointC: 141.0,
    descriptionVi: 'Axit không no có liên kết đôi C=C, làm mất màu nước brom và tham gia phản ứng trùng hợp tạo nhựa poliacrylic.'
  },
  {
    id: 'oxalic-acid',
    nameVi: 'Axit Oxalic (Axit Etanđioic)',
    nameIupac: 'Ethanedioic acid',
    formula: 'HOOC-COOH',
    molecularWeight: 90.03,
    pKa: 1.25,
    carboxylCount: 2,
    hasAldehydeGroup: false,
    hasCarbonCarbonDoubleBond: false,
    boilingPointC: 365.0,
    descriptionVi: 'Axit đicacboxylic đơn giản nhất, có trong cây me đất, khế chua. Dùng làm chất tẩy gỉ sét kim loại và chuẩn độ oxi hóa khử với KMnO₄.'
  },
  {
    id: 'benzoic-acid',
    nameVi: 'Axit Benzoic',
    nameIupac: 'Benzoic acid',
    formula: 'C₆H₅COOH',
    molecularWeight: 122.12,
    pKa: 4.20,
    carboxylCount: 1,
    hasAldehydeGroup: false,
    hasCarbonCarbonDoubleBond: false,
    boilingPointC: 249.2,
    descriptionVi: 'Axit thơm tinh thể màu trắng lấp lánh hình kim. Muối natri benzoat là chất bảo quản thực phẩm chống nấm mốc phổ biến.'
  }
];

// 3. Tollens Silver Mirror Reaction Evaluator
export function evaluateTollensTest(compoundId: string, moles: number = 0.01): TollensTestResult {
  const m = Math.max(0.001, moles);

  // Check if it's formaldehyde
  if (compoundId === 'formaldehyde') {
    const agMass = parseFloat((m * 4 * 107.87).toFixed(3));
    return {
      compoundId,
      isPositive: true,
      silverEquivalentsPerMole: 4,
      silverMassG: agMass,
      solutionAppearanceVi: 'Lớp bạc kim loại sáng bóng bám chặt vào thành ống nghiệm (Tráng gương hoàn hảo)',
      chemicalEquation: 'HCHO + 4 [Ag(NH₃)₂]OH —(t°)→ (NH₄)₂CO₃ + 4 Ag↓ + 6 NH₃ + 2 H₂O',
      isPedagogicalTrap: true,
      explanationVi: 'Fomanđehit (HCHO) có cấu tạo đặc biệt: cả 2 liên kết C-H đều thuộc nhóm anđehit, sau khi bị oxi hóa thành axit fomic tiếp tục bị oxi hóa thành muối amoni cacbonat. Do đó 1 mol HCHO tạo ra đúng 4 mol Ag kim loại (Bẫy kinh điển trong đề thi GDPT 2018).'
    };
  }

  // Check if it's formic acid
  if (compoundId === 'formic-acid') {
    const agMass = parseFloat((m * 2 * 107.87).toFixed(3));
    return {
      compoundId,
      isPositive: true,
      silverEquivalentsPerMole: 2,
      silverMassG: agMass,
      solutionAppearanceVi: 'Lớp bạc kim loại sáng bóng bám chặt vào thành ống nghiệm',
      chemicalEquation: 'HCOOH + 2 [Ag(NH₃)₂]OH —(t°)→ (NH₄)₂CO₃ + 2 Ag↓ + 2 NH₃ + H₂O',
      isPedagogicalTrap: true,
      explanationVi: 'Axit fomic (HCOOH) là axit cacboxylic duy nhất tham gia phản ứng tráng bạc vì phân tử chứa nhóm chức anđehit (-CHO). Tỉ lệ 1 mol HCOOH tạo 2 mol Ag.'
    };
  }

  // Check general carbonyls
  const carbonyl = CURRICULUM_CARBONYLS.find(c => c.id === compoundId);
  if (carbonyl) {
    if (carbonyl.carbonylType === 'ANĐEHIT') {
      const agMass = parseFloat((m * 2 * 107.87).toFixed(3));
      return {
        compoundId,
        isPositive: true,
        silverEquivalentsPerMole: 2,
        silverMassG: agMass,
        solutionAppearanceVi: 'Lớp bạc kim loại sáng bóng bám vào thành ống nghiệm',
        chemicalEquation: `${carbonyl.formula} + 2 [Ag(NH₃)₂]OH —(t°)→ R-COONH₄ + 2 Ag↓ + 3 NH₃ + H₂O`,
        isPedagogicalTrap: false,
        explanationVi: `Anđehit đơn chức (${carbonyl.nameVi}) bị oxi hóa bởi phức bạc amoniac tạo muối amoni cacboxylat và giải phóng 2 mol Ag kim loại trên mỗi mol anđehit.`
      };
    } else {
      return {
        compoundId,
        isPositive: false,
        silverEquivalentsPerMole: 0,
        silverMassG: 0,
        solutionAppearanceVi: 'Dung dịch trong suốt, không có bạc bám vào thành ống nghiệm',
        chemicalEquation: `${carbonyl.formula} + [Ag(NH₃)₂]OH —(t°)→ KHÔNG PHẢN ỨNG`,
        isPedagogicalTrap: false,
        explanationVi: `Xeton (${carbonyl.nameVi}) không có nguyên tử H liên kết trực tiếp với nhóm cacbonyl (>C=O) nên trơ với thuốc thử Tollens.`
      };
    }
  }

  // Other carboxylic acids do NOT react
  return {
    compoundId,
    isPositive: false,
    silverEquivalentsPerMole: 0,
    silverMassG: 0,
    solutionAppearanceVi: 'Không có hiện tượng tráng bạc',
    chemicalEquation: 'R-COOH + [Ag(NH₃)₂]OH → Phản ứng axit-bazơ thông thường (không tạo Ag kim loại)',
    isPedagogicalTrap: false,
    explanationVi: 'Các axit cacboxylic thông thường không có nhóm anđehit (-CHO) nên không tham gia phản ứng tráng bạc.'
  };
}

// 4. Fehling / Cu(OH)2 Alkaline Oxidation Test
export function evaluateFehlingTest(compoundId: string): FehlingTestResult {
  if (compoundId === 'formaldehyde') {
    return {
      compoundId,
      isPositive: true,
      cu2oColorVi: 'Kết tủa đỏ gạch Cu₂O',
      precipitateColorHex: '#DC2626',
      chemicalEquation: 'HCHO + 4 Cu(OH)₂ + 2 NaOH —(t°)→ Na₂CO₃ + 2 Cu₂O↓ (đỏ gạch) + 6 H₂O',
      explanationVi: 'Fomanđehit phản ứng mãnh liệt với Cu(OH)₂ trong kiềm nóng tạo kết tủa đỏ gạch Cu₂O với tỉ lệ 1 mol HCHO tạo 2 mol Cu₂O.'
    };
  }

  const carbonyl = CURRICULUM_CARBONYLS.find(c => c.id === compoundId);
  if (carbonyl && carbonyl.carbonylType === 'ANĐEHIT') {
    return {
      compoundId,
      isPositive: true,
      cu2oColorVi: 'Kết tủa đỏ gạch Cu₂O',
      precipitateColorHex: '#DC2626',
      chemicalEquation: `${carbonyl.formula} + 2 Cu(OH)₂ + NaOH —(t°)→ R-COONa + Cu₂O↓ (đỏ gạch) + 3 H₂O`,
      explanationVi: `${carbonyl.nameVi} khử Cu(OH)₂ (Cu²⁺) về oxit đồng(I) Cu₂O (Cu⁺) màu đỏ gạch khi đun nóng trong môi trường kiềm.`
    };
  }

  if (compoundId === 'formic-acid') {
    return {
      compoundId,
      isPositive: true,
      cu2oColorVi: 'Kết tủa đỏ gạch Cu₂O',
      precipitateColorHex: '#DC2626',
      chemicalEquation: 'HCOOH + 2 Cu(OH)₂ + 2 NaOH —(t°)→ Na₂CO₃ + Cu₂O↓ (đỏ gạch) + 4 H₂O',
      explanationVi: 'Axit fomic có nhóm -CHO nên cũng khử được Cu(OH)₂ trong kiềm nóng tạo kết tủa đỏ gạch Cu₂O.'
    };
  }

  return {
    compoundId,
    isPositive: false,
    cu2oColorVi: 'Không tạo kết tủa đỏ gạch (kết tủa Cu(OH)₂ phân hủy thành CuO màu đen khi nung)',
    precipitateColorHex: '#1E293B',
    chemicalEquation: 'Chất này không khử được Cu(OH)₂ thành Cu₂O',
    explanationVi: 'Xeton và các axit thông thường không có tính khử mạnh để chuyển ion Cu²⁺ thành oxit đồng(I) Cu₂O màu đỏ gạch.'
  };
}

// 5. Iodoform / Haloform Reaction (Test for CH3-C=O)
export function evaluateIodoformTest(compoundId: string, moles: number = 0.01): IodoformTestResult {
  const m = Math.max(0.001, moles);
  const carbonyl = CURRICULUM_CARBONYLS.find(c => c.id === compoundId);

  if (carbonyl && carbonyl.hasMethylCarbonylGroup) {
    // R-COCH3 + 3 I2 + 4 NaOH -> R-COONa + CHI3↓ (393.7 g/mol) + 3 NaI + 3 H2O
    const chi3Mass = parseFloat((m * 393.7).toFixed(3));
    return {
      compoundId,
      isPositive: true,
      precipitateNameVi: 'Iođofom (Triiođometan, CHI₃)',
      precipitateColorVi: 'Kết tủa tinh thể màu vàng sáng, mùi sát trùng đặc trưng',
      precipitateColorHex: '#FACC15',
      precipitateMassG: chi3Mass,
      chemicalEquation: `${carbonyl.formula} + 3 I₂ + 4 NaOH → R-COONa + CHI₃↓ (vàng) + 3 NaI + 3 H₂O`,
      explanationVi: `${carbonyl.nameVi} chứa nhóm metyl cacbonyl (CH₃-C=O), các nguyên tử H ở nhóm metyl rất linh động do bị nhóm C=O hút electron, bị thế hoàn toàn bởi halogen trong kiềm rồi đứt gãy liên kết C-C tạo kết tủa vàng CHI₃.`
    };
  }

  return {
    compoundId,
    isPositive: false,
    precipitateNameVi: 'Không có kết tủa',
    precipitateColorVi: 'Dung dịch giữ nguyên màu nâu vàng của I₂/KI (không tạo CHI₃)',
    precipitateColorHex: '#78350F',
    chemicalEquation: 'Hợp chất không có nhóm CH₃-C=O → Không xảy ra phản ứng iođofom',
    explanationVi: 'Phản ứng iođofom là phản ứng đặc hiệu chỉ dành cho các hợp chất có nhóm metyl cacbonyl CH₃-C=O (hoặc ancol CH₃-CH(OH)-).'
  };
}

// 6. Carboxylic Acid Reactivity (Na, NaOH, Na2CO3, CuO)
export function evaluateAcidReaction(
  acidId: string,
  reagent: AcidReactivityResult['reagent']
): AcidReactivityResult {
  const acid = CURRICULUM_CARBOXYLIC_ACIDS.find(a => a.id === acidId);
  if (!acid) {
    throw new Error(`Carboxylic acid '${acidId}' not found in curriculum catalog.`);
  }

  if (reagent === 'NA') {
    return {
      acidId: acid.id,
      reagent: 'NA',
      reactionOccurs: true,
      gasEvolved: 'H₂ (Khí không màu sủi bọt mạnh)',
      solutionColorChangeVi: 'Kim loại Na tan dần, sủi bọt khí H₂',
      chemicalEquation: `2 ${acid.formula} + 2 Na → 2 R-COONa + H₂↑`,
      explanationVi: 'Axit cacboxylic tác dụng với kim loại kiềm giải phóng khí hiđro, tương tự như ancol nhưng với tốc độ nhanh và mãnh liệt hơn nhiều.'
    };
  }

  if (reagent === 'NAOH') {
    return {
      acidId: acid.id,
      reagent: 'NAOH',
      reactionOccurs: true,
      solutionColorChangeVi: 'Phản ứng trung hòa tỏa nhiệt, dung dịch trong suốt',
      chemicalEquation: `${acid.formula} + NaOH → R-COONa + H₂O`,
      explanationVi: 'Phản ứng trung hòa giữa axit và bazơ tạo muối tan và nước.'
    };
  }

  if (reagent === 'NA2CO3') {
    return {
      acidId: acid.id,
      reagent: 'NA2CO3',
      reactionOccurs: true,
      gasEvolved: 'CO₂ (Sủi bọt khí không màu, làm đục nước vôi trong)',
      solutionColorChangeVi: 'Sủi bọt khí CO₂ mãnh liệt',
      chemicalEquation: `2 ${acid.formula} + Na₂CO₃ → 2 R-COONa + CO₂↑ + H₂O`,
      explanationVi: 'Tính axit của axit cacboxylic mạnh hơn axit cacbonic (H₂CO₃), do đó đẩy được CO₂ ra khỏi muối cacbonat. Đây là phản ứng đặc trưng để phân biệt axit cacboxylic với ancol và phenol!'
    };
  }

  // CUO
  return {
    acidId: acid.id,
    reagent: 'CUO',
    reactionOccurs: true,
    solutionColorChangeVi: 'Bột CuO màu đen tan dần, dung dịch chuyển sang màu xanh lam của ion Cu²⁺',
    chemicalEquation: `2 ${acid.formula} + CuO → (R-COO)₂Cu + H₂O`,
    explanationVi: 'Axit cacboxylic tác dụng với oxit bazơ CuO tạo muối đồng(II) có màu xanh lam đặc trưng.'
  };
}
