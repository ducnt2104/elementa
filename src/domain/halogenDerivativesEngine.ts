// src/domain/halogenDerivativesEngine.ts
/**
 * ELEMENTA — Halogen Derivatives & Mechanism ($S_N1, S_N2, E1, E2$) Domain Engine
 * Conforms strictly to GDPT 2018 Chemistry Grade 11 (Chủ đề 5: Dẫn xuất Halogen) & IUPAC Gold Book.
 * 
 * Subsystems:
 * 1. Halogen Derivative Catalog: Alkyl, Allyl, Benzyl, Vinyl, Aryl halides & Freon (CFC) with bond energies and reactivity ranks.
 * 2. Aqueous Hydrolysis & Halogen Diagnostic Test: Acidification with HNO3, precipitation with AgNO3 (AgCl white, AgBr pale yellow, AgI deep yellow).
 * 3. Ethanolic Dehydrohalogenation (Zaitsev Elimination): Preferential β-hydrogen elimination from less hydrogenated carbon yielding more substituted alkene.
 * 4. Mechanism Decision Matrix: SN1 vs SN2 vs E1 vs E2 governed by substrate degree (1°, 2°, 3°), nucleophile nucleophilicity, base strength, and solvent proticity.
 * 5. CFC Photolysis & Stratospheric Ozone Depletion: Catalytic chain mechanism of Cl• radicals and Montreal Protocol transition.
 */

export type HalogenClass = 'ALKYL' | 'ALLYLIC' | 'BENZYLIC' | 'VINYLIC' | 'ARYL' | 'POLYHALOGEN';
export type HalogenType = 'F' | 'Cl' | 'Br' | 'I';

export interface HalogenDerivative {
  id: string;
  nameVi: string;
  nameIupac: string;
  formula: string;
  condensedFormula: string;
  halogenClass: HalogenClass;
  halogenType: HalogenType;
  carbonDegree: '1°' | '2°' | '3°' | 'vinyl_sp2' | 'aryl_sp2';
  boilingPointC: number;
  molarMassGmol: number;
  cHalogenBondEnergyKjMol: number;
  hydrolysisReactivity: 'VERY_HIGH' | 'HIGH' | 'MODERATE' | 'INERT_UNDER_STANDARD';
  descriptionVi: string;
  gdptStandardRef: string;
}

export const HALOGEN_DERIVATIVE_CATALOG: HalogenDerivative[] = [
  {
    id: 'ethyl-chloride',
    nameVi: 'Etyl clorua (Cloroetan)',
    nameIupac: 'Chloroethane',
    formula: 'C2H5Cl',
    condensedFormula: 'CH3-CH2Cl',
    halogenClass: 'ALKYL',
    halogenType: 'Cl',
    carbonDegree: '1°',
    boilingPointC: 12.3,
    molarMassGmol: 64.51,
    cHalogenBondEnergyKjMol: 339,
    hydrolysisReactivity: 'MODERATE',
    descriptionVi: 'Dẫn xuất alkyl bậc 1 điển hình. Thủy phân theo cơ chế SN2 khi đun nóng với dung dịch NaOH loãng.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 15: Dẫn xuất halogen'
  },
  {
    id: 'isopropyl-bromide',
    nameVi: 'Isopropyl bromua (2-Bromopropan)',
    nameIupac: '2-Bromopropane',
    formula: 'C3H7Br',
    condensedFormula: 'CH3-CH(Br)-CH3',
    halogenClass: 'ALKYL',
    halogenType: 'Br',
    carbonDegree: '2°',
    boilingPointC: 59.4,
    molarMassGmol: 123.0,
    cHalogenBondEnergyKjMol: 285,
    hydrolysisReactivity: 'HIGH',
    descriptionVi: 'Dẫn xuất alkyl bậc 2. Có sự cạnh tranh giữa thế nucleophin và tách hydro halogenua theo quy tắc Zaitsev.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 15: Dẫn xuất halogen'
  },
  {
    id: 'tert-butyl-chloride',
    nameVi: 'tert-Butyl clorua (2-Clo-2-metylpropan)',
    nameIupac: '2-Chloro-2-methylpropane',
    formula: 'C4H9Cl',
    condensedFormula: '(CH3)3C-Cl',
    halogenClass: 'ALKYL',
    halogenType: 'Cl',
    carbonDegree: '3°',
    boilingPointC: 50.8,
    molarMassGmol: 92.57,
    cHalogenBondEnergyKjMol: 331,
    hydrolysisReactivity: 'VERY_HIGH',
    descriptionVi: 'Dẫn xuất alkyl bậc 3 kinh điển. Phản ứng thế diễn ra cực nhanh qua cơ chế SN1 (tạo carbocation bậc 3 rất bền). Dễ bị tách E2 tạo isobuten khi gặp bazo mạnh.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 15: Dẫn xuất halogen'
  },
  {
    id: 'allyl-chloride',
    nameVi: 'Anlyl clorua (3-Cloprop-1-en)',
    nameIupac: '3-Chloroprop-1-ene',
    formula: 'C3H5Cl',
    condensedFormula: 'CH2=CH-CH2Cl',
    halogenClass: 'ALLYLIC',
    halogenType: 'Cl',
    carbonDegree: '1°',
    boilingPointC: 45.1,
    molarMassGmol: 76.53,
    cHalogenBondEnergyKjMol: 290,
    hydrolysisReactivity: 'VERY_HIGH',
    descriptionVi: 'Halogen anlylic. Vị trí anlyl tạo carbocation cộng hưởng bền [CH2=CH-CH2+ <-> +CH2-CH=CH2], thủy phân dễ dàng ngay ở nhiệt độ phòng.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 15: Dẫn xuất halogen'
  },
  {
    id: 'benzyl-chloride',
    nameVi: 'Benzyl clorua',
    nameIupac: 'Benzyl chloride (Chloromethylbenzene)',
    formula: 'C7H7Cl',
    condensedFormula: 'C6H5-CH2Cl',
    halogenClass: 'BENZYLIC',
    halogenType: 'Cl',
    carbonDegree: '1°',
    boilingPointC: 179.3,
    molarMassGmol: 126.58,
    cHalogenBondEnergyKjMol: 295,
    hydrolysisReactivity: 'VERY_HIGH',
    descriptionVi: 'Halogen benzylic. Carbocation benzylic giải tỏa điện tích âm vào vòng benzen, phản ứng thế SN1 và SN2 đều rất nhanh. Chất gây cay mắt mạnh.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 15: Dẫn xuất halogen'
  },
  {
    id: 'chlorobenzene',
    nameVi: 'Clorobenzen',
    nameIupac: 'Chlorobenzene',
    formula: 'C6H5Cl',
    condensedFormula: 'C6H5Cl',
    halogenClass: 'ARYL',
    halogenType: 'Cl',
    carbonDegree: 'aryl_sp2',
    boilingPointC: 131.6,
    molarMassGmol: 112.56,
    cHalogenBondEnergyKjMol: 400,
    hydrolysisReactivity: 'INERT_UNDER_STANDARD',
    descriptionVi: 'BẪY THI KINH ĐIỂN: Halogen đính trực tiếp vào vòng benzen. Đôi electron không chia của Cl liên hợp p-pi với vòng thơm làm liên kết C-Cl bền vững, trơ tuyệt đối với dung dịch kiềm ở điều kiện thường (chỉ thủy phân ở 300°C, 200 atm).',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 15: Dẫn xuất halogen'
  },
  {
    id: 'vinyl-chloride',
    nameVi: 'Vinyl clorua (Cloeten)',
    nameIupac: 'Chloroethene',
    formula: 'C2H3Cl',
    condensedFormula: 'CH2=CHCl',
    halogenClass: 'VINYLIC',
    halogenType: 'Cl',
    carbonDegree: 'vinyl_sp2',
    boilingPointC: -13.4,
    molarMassGmol: 62.50,
    cHalogenBondEnergyKjMol: 406,
    hydrolysisReactivity: 'INERT_UNDER_STANDARD',
    descriptionVi: 'Halogen vinylic. Hiệu ứng liên hợp p-pi làm liên kết C-Cl ngắn lại và tăng độ bền, không bị thủy phân ở điều kiện thường. Dùng trùng hợp sản xuất nhựa PVC.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 15: Dẫn xuất halogen'
  },
  {
    id: 'cfc-12',
    nameVi: 'Freon-12 (Điclorodiflorometan, CFC-12)',
    nameIupac: 'Dichlorodifluoromethane',
    formula: 'CCl2F2',
    condensedFormula: 'CCl2F2',
    halogenClass: 'POLYHALOGEN',
    halogenType: 'Cl',
    carbonDegree: '1°',
    boilingPointC: -29.8,
    molarMassGmol: 120.91,
    cHalogenBondEnergyKjMol: 450,
    hydrolysisReactivity: 'INERT_UNDER_STANDARD',
    descriptionVi: 'Hợp chất CFC từng dùng làm chất sinh hàn trong tủ lạnh, máy lạnh. Trơ về mặt hóa học ở tầng đối lưu nhưng khi lên tầng bình lưu bị tia tử ngoại (UV) quang hóa giải phóng gốc tự do Cl• phá hủy tầng ozon.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 15: Dẫn xuất halogen'
  }
];

export interface HalogenDiagnosticResult {
  compoundNameVi: string;
  formula: string;
  hydrolyzesUnderStandard: boolean;
  hno3NeutralizationRequired: boolean;
  hno3RoleExplanationVi: string;
  precipitateFormed: boolean;
  precipitateColor: string;
  precipitateFormula: string;
  ammoniaSolubilityVi: string;
  chemicalEquations: {
    hydrolysis: string;
    neutralization: string;
    precipitation: string;
  };
  examTrapAlertVi: string;
}

export function simulateHalogenDiagnosticTest(compoundId: string): HalogenDiagnosticResult {
  const compound = HALOGEN_DERIVATIVE_CATALOG.find(c => c.id === compoundId);
  if (!compound) {
    throw new Error(`Compound not found: ${compoundId}`);
  }

  // Aryl & Vinyl halides do NOT hydrolyze under standard conditions
  if (compound.hydrolysisReactivity === 'INERT_UNDER_STANDARD') {
    return {
      compoundNameVi: compound.nameVi,
      formula: compound.formula,
      hydrolyzesUnderStandard: false,
      hno3NeutralizationRequired: true,
      hno3RoleExplanationVi: 'Bắt buộc trung hòa kiềm dư bằng HNO3 trước khi nhỏ AgNO3.',
      precipitateFormed: false,
      precipitateColor: 'Không có kết tủa (dung dịch trong suốt)',
      precipitateFormula: 'Không có',
      ammoniaSolubilityVi: 'Không có kết tủa.',
      chemicalEquations: {
        hydrolysis: `${compound.condensedFormula} + NaOH (dd) --(100°C)--> Không phản ứng`,
        neutralization: 'NaOH (dư) + HNO3 -> NaNO3 + H2O',
        precipitation: 'Không có ion X- tự do -> Không tạo kết tủa với AgNO3'
      },
      examTrapAlertVi: 'BẪY THI CỰC KỲ QUAN TRỌNG: Clorobenzen và Vinyl clorua có liên kết C-X gắn trực tiếp vào carbon lai hóa sp2 (có liên hợp p-pi), do đó KHÔNG bị thủy phân trong dung dịch NaOH ở nhiệt độ sôi thường, không sinh ra ion halogenua và KHÔNG tạo kết tủa với AgNO3.'
    };
  }

  // Active halides (Alkyl, Allyl, Benzyl)
  const isChloride = compound.halogenType === 'Cl';
  const isBromide = compound.halogenType === 'Br';
  const pptColor = isChloride ? 'Trắng' : (isBromide ? 'Vàng nhạt' : 'Vàng đậm');
  const pptForm = isChloride ? 'AgCl↓' : (isBromide ? 'AgBr↓' : 'AgI↓');
  const nh3Solubility = isChloride
    ? 'Tan hoàn toàn trong dung dịch NH3 loãng tạo phức bạc [Ag(NH3)2]+'
    : (isBromide
      ? 'Tan ít trong dung dịch NH3 đặc, không tan trong NH3 loãng'
      : 'Hoàn toàn không tan kể cả trong dung dịch NH3 đặc nóng');

  return {
    compoundNameVi: compound.nameVi,
    formula: compound.formula,
    hydrolyzesUnderStandard: true,
    hno3NeutralizationRequired: true,
    hno3RoleExplanationVi: 'BẮT BUỘC TRUNG HÒA: Phải thêm axit HNO3 loãng để trung hòa hết lượng NaOH dư, ngăn cản phản ứng phụ 2Ag+ + 2OH- -> Ag2O↓ (nâu đen) + H2O làm sai lệch màu sắc nhận biết.',
    precipitateFormed: true,
    precipitateColor: pptColor,
    precipitateFormula: pptForm,
    ammoniaSolubilityVi: nh3Solubility,
    chemicalEquations: {
      hydrolysis: `${compound.condensedFormula} + NaOH --(t°)--> R-OH + Na${compound.halogenType}`,
      neutralization: 'NaOH (dư) + HNO3 -> NaNO3 + H2O',
      precipitation: `Na${compound.halogenType} + AgNO3 -> ${pptForm} + NaNO3`
    },
    examTrapAlertVi: 'Tại sao không dùng HCl hay H2SO4 để trung hòa kiềm? Nếu dùng HCl, ion Cl- sẽ tạo kết tủa trắng AgCl giả mạo; nếu dùng H2SO4, ion SO4(2-) nồng độ cao có thể tạo kết tủa Ag2SO4 gây nhiễu.'
  };
}

export interface ZaitsevEliminationResult {
  substrateNameVi: string;
  formula: string;
  reagentVi: string;
  reactionOccurs: boolean;
  majorProduct: {
    nameIupac: string;
    formula: string;
    percentage: number;
    substitutionDegree: string;
    zaitsevReasonVi: string;
  };
  minorProduct?: {
    nameIupac: string;
    formula: string;
    percentage: number;
    substitutionDegree: string;
    zaitsevReasonVi: string;
  };
  ruleAppliedVi: string;
  chemicalEquation: string;
  solventRoleVi: string;
}

export function simulateZaitsevElimination(substrateId: string): ZaitsevEliminationResult {
  if (substrateId === '2-bromobutane' || substrateId === 'isopropyl-bromide') {
    if (substrateId === 'isopropyl-bromide') {
      return {
        substrateNameVi: '2-Bromopropan (CH3-CH(Br)-CH3)',
        formula: 'C3H7Br',
        reagentVi: 'KOH trong C2H5OH (đun nóng)',
        reactionOccurs: true,
        majorProduct: {
          nameIupac: 'Propene',
          formula: 'CH3-CH=CH2',
          percentage: 100,
          substitutionDegree: 'Đơn thế (monosubstituted)',
          zaitsevReasonVi: 'Hai nhóm -CH3 ở hai bên tương đương nhau (đều chứa 3 nguyên tử H), chỉ cho 1 hướng tách duy nhất.'
        },
        ruleAppliedVi: 'Tách hydro halogenua (đối xứng vị trí beta).',
        chemicalEquation: 'CH3-CH(Br)-CH3 + KOH --(C2H5OH, t°)--> CH3-CH=CH2 + KBr + H2O',
        solventRoleVi: 'Dung môi etanol đóng vai trò chuyển hóa bazơ từ OH- thành etoxit C2H5O- có tính bazo mạnh hơn và tính nucleophin phân cực thấp hơn, thúc đẩy phản ứng tách E2 thay vì thế SN2.'
      };
    }

    // 2-Bromobutane
    return {
      substrateNameVi: '2-Bromobutan (CH3-CH2-CH(Br)-CH3)',
      formula: 'C4H9Br',
      reagentVi: 'KOH trong C2H5OH (đun nóng)',
      reactionOccurs: true,
      majorProduct: {
        nameIupac: 'But-2-ene (hỗn hợp trans và cis)',
        formula: 'CH3-CH=CH-CH3',
        percentage: 81,
        substitutionDegree: 'Nhị thế (disubstituted alkene bền hơn)',
        zaitsevReasonVi: 'Quy tắc Zaitsev: Nguyên tử H bị tách ưu tiên ở carbon beta có ít H hơn (-CH2- chứa 2H so với -CH3 chứa 3H), sinh ra anken có nhiều nhóm thế hơn quanh nối đôi.'
      },
      minorProduct: {
        nameIupac: 'But-1-ene',
        formula: 'CH3-CH2-CH=CH2',
        percentage: 19,
        substitutionDegree: 'Đơn thế (monosubstituted alkene kém bền hơn)',
        zaitsevReasonVi: 'Tách H ở carbon beta bậc 1 (-CH3) tạo anken kém bền hơn về mặt nhiệt động học.'
      },
      ruleAppliedVi: 'Quy tắc tách Zaitsev (Zaytsev\'s Rule): Ưu tiên tạo anken có độ thế cao hơn quanh liên kết đôi.',
      chemicalEquation: 'CH3-CH2-CH(Br)-CH3 + KOH --(C2H5OH, t°)--> CH3-CH=CH-CH3 (81%) + CH3-CH2-CH=CH2 (19%) + KBr + H2O',
      solventRoleVi: 'Dung môi ancol bazơ KOH/C2H5OH là điều kiện bắt buộc để thực hiện phản ứng tách. Nếu dùng KOH/H2O (dung dịch nước) thì phản ứng ưu thế sẽ là phản ứng THẾ tạo butan-2-ol.'
    };
  }

  if (substrateId === 'tert-butyl-chloride') {
    return {
      substrateNameVi: 'tert-Butyl clorua ((CH3)3C-Cl)',
      formula: 'C4H9Cl',
      reagentVi: 'KOH trong C2H5OH (đun nóng)',
      reactionOccurs: true,
      majorProduct: {
        nameIupac: '2-Methylpropene (Isobutylene)',
        formula: '(CH3)2C=CH2',
        percentage: 100,
        substitutionDegree: 'Nhị thế (1,1-disubstituted)',
        zaitsevReasonVi: 'Cả 3 nhóm metyl xung quanh đều chứa 3 H bậc 1 tương đương, chỉ tạo 1 anken duy nhất.'
      },
      ruleAppliedVi: 'Tách E2 triệt để do án ngữ không gian ngăn cản phản ứng thế.',
      chemicalEquation: '(CH3)3C-Cl + KOH --(C2H5OH, t°)--> (CH3)2C=CH2 + KCl + H2O',
      solventRoleVi: 'Bazơ mạnh trong ancol loại bỏ proton nhanh chóng qua cơ chế E2 lưỡng phân tử.'
    };
  }

  // Default: ethyl-chloride
  return {
    substrateNameVi: 'Etyl clorua (CH3-CH2Cl)',
    formula: 'C2H5Cl',
    reagentVi: 'KOH trong C2H5OH (đun nóng)',
    reactionOccurs: true,
    majorProduct: {
      nameIupac: 'Ethene (Ethylene)',
      formula: 'CH2=CH2',
      percentage: 100,
      substitutionDegree: 'Không thế (etilen)',
      zaitsevReasonVi: 'Chỉ có 1 carbon beta duy nhất, chỉ sinh ra etilen.'
    },
    ruleAppliedVi: 'Tách HX từ dẫn xuất bậc 1.',
    chemicalEquation: 'CH3-CH2Cl + KOH --(C2H5OH, t°)--> CH2=CH2 + KCl + H2O',
    solventRoleVi: 'Thúc đẩy phản ứng tách khí etilen.'
  };
}

export interface MechanismDecisionResult {
  substrateDegree: '1°' | '2°' | '3°';
  nucleophileStrength: 'STRONG' | 'WEAK';
  baseStrength: 'STRONG' | 'WEAK';
  solventType: 'POLAR_PROTIC' | 'POLAR_APROTIC';
  predominantMechanism: 'SN1' | 'SN2' | 'E1' | 'E2';
  kineticRateLaw: string;
  stereochemicalOutcomeVi: string;
  carbocationIntermediateFormed: boolean;
  explanationVi: string;
}

export function predictMechanism(
  substrateDegree: '1°' | '2°' | '3°',
  nucleophileStrength: 'STRONG' | 'WEAK',
  baseStrength: 'STRONG' | 'WEAK',
  solventType: 'POLAR_PROTIC' | 'POLAR_APROTIC'
): MechanismDecisionResult {
  // 1° Alkyl halides: SN2 is strongly favored (steric hindrance is minimal)
  if (substrateDegree === '1°') {
    if (baseStrength === 'STRONG' && nucleophileStrength === 'WEAK') {
      // Bulky base like t-BuOK
      return {
        substrateDegree: '1°',
        nucleophileStrength,
        baseStrength,
        solventType,
        predominantMechanism: 'E2',
        kineticRateLaw: 'v = k[RX][Base]',
        stereochemicalOutcomeVi: 'Tách anti-periplanar tạo anken.',
        carbocationIntermediateFormed: false,
        explanationVi: 'Dù là bậc 1, bazơ mạnh cồng kềnh khó tiếp cận carbon trung tâm nên ưu tiên giật proton beta tạo anken theo cơ chế E2.'
      };
    }

    return {
      substrateDegree: '1°',
      nucleophileStrength,
      baseStrength,
      solventType,
      predominantMechanism: 'SN2',
      kineticRateLaw: 'v = k[RX][Nu-]',
      stereochemicalOutcomeVi: 'Nghịch đảo cấu hình Walden (Walden Inversion) 100% do tác nhân nucleophin tấn công từ phía đối diện nhóm xuất.',
      carbocationIntermediateFormed: false,
      explanationVi: 'Carbon bậc 1 không bị án ngữ không gian, phản ứng thế nucleophin đồng thời một giai đoạn (SN2) diễn ra thuận lợi nhất.'
    };
  }

  // 3° Alkyl halides: SN2 is impossible due to severe steric crowding
  if (substrateDegree === '3°') {
    if (baseStrength === 'STRONG') {
      return {
        substrateDegree: '3°',
        nucleophileStrength,
        baseStrength,
        solventType,
        predominantMechanism: 'E2',
        kineticRateLaw: 'v = k[RX][Base]',
        stereochemicalOutcomeVi: 'Tách theo quy tắc Zaitsev tạo anken bền vững nhất.',
        carbocationIntermediateFormed: false,
        explanationVi: 'Carbon bậc 3 bị che chắn hoàn toàn ngăn cản tấn công thế nucleophin; gặp bazo mạnh sẽ lập tức diễn ra phản ứng tách E2 tạo anken.'
      };
    }

    // Weak base / polar protic solvent favors SN1
    return {
      substrateDegree: '3°',
      nucleophileStrength,
      baseStrength,
      solventType,
      predominantMechanism: 'SN1',
      kineticRateLaw: 'v = k[RX] (phản ứng bậc 1, tốc độ không phụ thuộc nồng độ nucleophile)',
      stereochemicalOutcomeVi: 'Racemic hóa (tạo hỗn hợp 50% nghịch đảo + 50% bảo toàn cấu hình) do carbocation trung gian có cấu trúc tam giác phẳng sp2.',
      carbocationIntermediateFormed: true,
      explanationVi: 'Nhóm xuất X- tự do phân ly tạo carbocation bậc 3 cực kỳ bền vững (nhờ hiệu ứng siêu liên hợp của 3 nhóm ankyl), sau đó nucleophin tấn công ngẫu nhiên từ 2 phía.'
    };
  }

  // 2° Alkyl halides: Borderline sensitive to conditions
  if (baseStrength === 'STRONG') {
    return {
      substrateDegree: '2°',
      nucleophileStrength,
      baseStrength,
      solventType,
      predominantMechanism: 'E2',
      kineticRateLaw: 'v = k[RX][Base]',
      stereochemicalOutcomeVi: 'Tách Zaitsev ưu tiên anken nhiều nhóm thế hơn.',
      carbocationIntermediateFormed: false,
      explanationVi: 'Carbon bậc 2 khi gặp bazơ mạnh (như RO-, OH- đun nóng trong ancol) ưu tiên phản ứng tách E2.'
    };
  }

  if (nucleophileStrength === 'STRONG' && solventType === 'POLAR_APROTIC') {
    return {
      substrateDegree: '2°',
      nucleophileStrength,
      baseStrength,
      solventType,
      predominantMechanism: 'SN2',
      kineticRateLaw: 'v = k[RX][Nu-]',
      stereochemicalOutcomeVi: 'Nghịch đảo cấu hình Walden.',
      carbocationIntermediateFormed: false,
      explanationVi: 'Dung môi không proton phân cực (aprotic như DMSO, DMF, axeton) không solvat hóa ion âm, làm tăng hoạt tính nucleophin và ưu tiên cơ chế SN2.'
    };
  }

  // Weak Nu, polar protic solvent -> SN1/E1
  return {
    substrateDegree: '2°',
    nucleophileStrength,
    baseStrength,
    solventType,
    predominantMechanism: 'SN1',
    kineticRateLaw: 'v = k[RX]',
    stereochemicalOutcomeVi: 'Racemic hóa chiếm ưu thế kèm chuyển vị carbocation nếu có cấu trúc phân nhánh kế cận.',
    carbocationIntermediateFormed: true,
    explanationVi: 'Dung môi phân cực có proton (nước, ancol) solvat hóa tốt anion halogenua, thúc đẩy phân ly tạo carbocation bậc 2 theo cơ chế SN1.'
  };
}

export interface CfcOzoneCycleResult {
  cfcCompoundNameVi: string;
  formula: string;
  troposphericLifetimeYears: number;
  ozoneDepletionPotential: number; // ODP relative to CFC-11 = 1.0
  radicalChainSteps: {
    stepNameVi: string;
    chemicalEquation: string;
    descriptionVi: string;
  }[];
  catalyticEfficiency: string;
  montrealProtocolReplacementVi: string;
}

export function simulateCfcOzoneCycle(): CfcOzoneCycleResult {
  return {
    cfcCompoundNameVi: 'Freon-12 (CF2Cl2)',
    formula: 'CF2Cl2',
    troposphericLifetimeYears: 100,
    ozoneDepletionPotential: 1.0,
    radicalChainSteps: [
      {
        stepNameVi: '1. Khơi mào quang hóa (UV Photolysis)',
        chemicalEquation: 'CF2Cl2 + hν (λ < 240 nm) -> •CF2Cl + Cl•',
        descriptionVi: 'Tia cực tím tầng bình lưu có năng lượng cao bẻ gãy liên kết C-Cl tạo ra gốc tự do clo nguyên tử hoạt động cực mạnh.'
      },
      {
        stepNameVi: '2. Phá hủy phân tử Ozon (Ozone Destruction)',
        chemicalEquation: 'Cl• + O3 -> ClO• + O2',
        descriptionVi: 'Gốc Cl• tấn công phân tử ozon biến thành gốc clo monoxit ClO• và giải phóng oxy phân tử.'
      },
      {
        stepNameVi: '3. Tái sinh xúc tác Clo (Catalytic Regeneration)',
        chemicalEquation: 'ClO• + O -> Cl• + O2',
        descriptionVi: 'ClO• phản ứng với nguyên tử oxy tự do trong khí quyển để tái sinh lại gốc Cl• tự do ban đầu, sẵn sàng phá hủy chu kỳ tiếp theo.'
      }
    ],
    catalyticEfficiency: '1 gốc tự do Cl• duy nhất có thể xúc tác phá hủy tới hơn 100,000 phân tử O3 trước khi bị giữ lại bởi phản ứng đứt mạch!',
    montrealProtocolReplacementVi: 'Nghị định thư Montreal (1987) đã cấm hoàn toàn CFCs, thay thế bằng HFCs (như HFC-134a CF3CH2F) và HFOs có ODP = 0 (không chứa clo nên không phá hủy tầng ozon).'
  };
}
