// src/domain/reactionMechanismsAdvancedEngine.ts
// Comprehensive Organic Reaction Mechanisms: Nucleophilic Substitution (SN1/SN2), Elimination (E1/E2), and Electrophilic Aromatic Substitution (SEAr)
// Conforming strictly to Vietnam GDPT 2018 Chemistry 11-12 & IUPAC Physical Organic Chemistry Standards

export type CarbonClassification = 'METHYL' | 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'ALLYLIC' | 'BENZYLIC' | 'VINYLIC' | 'ARYL';
export type NucleophileStrength = 'STRONG' | 'MODERATE' | 'WEAK';
export type BaseStrength = 'STRONG_BASE' | 'WEAK_BASE';
export type SolventType = 'POLAR_PROTIC' | 'POLAR_APROTIC' | 'NON_POLAR';

export interface OrganicSubstrateDef {
  id: string;
  nameVI: string;
  nameIUPAC: string;
  formula: string;
  carbonClassification: CarbonClassification;
  leavingGroup: 'I' | 'Br' | 'Cl' | 'F' | 'OTs' | 'OH2_PLUS';
  hasChiralCenterAtReactionSite: boolean;
  stericHindranceScore: number; // 1 (methyl) to 10 (neopentyl / vinylic)
  carbocationStabilityScore: number; // 1 (methyl/vinylic) to 10 (tertiary benzylic)
  pedagogicalDescriptionVI: string;
}

export interface NucleophileDef {
  id: string;
  nameVI: string;
  formula: string;
  nucleophilicity: NucleophileStrength;
  basicity: BaseStrength;
  isBulky: boolean; // e.g. t-BuO- is bulky base promoting E2 Hofmann
  charge: number; // e.g. -1 for OH-, 0 for H2O
}

export interface SolventDef {
  id: string;
  nameVI: string;
  formula: string;
  type: SolventType;
  dielectricConstant: number; // Relative permittivity epsilon_r
  pedagogicalNoteVI: string;
}

export interface SubstitutionPredictionResult {
  substrate: OrganicSubstrateDef;
  nucleophile: NucleophileDef;
  solvent: SolventDef;
  temperatureCelsius: number;
  predominantMechanism: 'SN1' | 'SN2' | 'E1' | 'E2' | 'NO_REACTION';
  stereochemicalOutcome: 'WALDEN_INVERSION' | 'RACEMIZATION' | 'ZAITSEV_ALKENE' | 'HOFMANN_ALKENE' | 'NO_CHANGE';
  rateLawEquation: string;
  kineticOrder: number;
  intermediateOrTransitionStateVI: string;
  majorProductNameVI: string;
  majorProductFormula: string;
  competingMechanism?: 'SN1' | 'SN2' | 'E1' | 'E2';
  stepByStepExplanationVI: string[];
  gameplayModifier: {
    spellSpeed: 1 | 2;
    elementalDamageType: 'ORGANIC_HALOGEN' | 'ALKENE_SYNTHESIS' | 'WALDEN_SHIELD_BREAK';
    damageMultiplier: number;
    descriptionVI: string;
  };
}

export interface SearSubstituentDef {
  groupFormula: string;
  nameVI: string;
  directingCategory: 'ORTHO_PARA_ACTIVATING' | 'ORTHO_PARA_DEACTIVATING' | 'META_DEACTIVATING';
  activationLevel: 'STRONGLY_ACTIVATING' | 'MODERATELY_ACTIVATING' | 'WEAKLY_ACTIVATING' | 'DEACTIVATING' | 'STRONGLY_DEACTIVATING';
  electronicEffectVI: string; // e.g. "+M > -I" or "-I, -M"
  orthoPercent: number;
  paraPercent: number;
  metaPercent: number;
  explanationVI: string;
}

export const SEAR_SUBSTITUENTS_CATALOG: Record<string, SearSubstituentDef> = {
  OH: {
    groupFormula: '-OH',
    nameVI: 'Nhóm Hiđroxyl (Phenol)',
    directingCategory: 'ORTHO_PARA_ACTIVATING',
    activationLevel: 'STRONGLY_ACTIVATING',
    electronicEffectVI: 'Cặp electron tự do của O liên hợp mạnh vào vòng (+M > -I)',
    orthoPercent: 40,
    paraPercent: 60,
    metaPercent: 0,
    explanationVI: 'Phenol phản ứng thế brom cực nhanh ở điều kiện thường không cần xúc tác, tạo kết tủa trắng 2,4,6-tribromophenol.'
  },
  NH2: {
    groupFormula: '-NH2',
    nameVI: 'Nhóm Amino (Anilin)',
    directingCategory: 'ORTHO_PARA_ACTIVATING',
    activationLevel: 'STRONGLY_ACTIVATING',
    electronicEffectVI: 'Cặp electron trên N cho mạnh vào nhân thơm (+M >> -I)',
    orthoPercent: 35,
    paraPercent: 65,
    metaPercent: 0,
    explanationVI: 'Anilin phản ứng tức thì với nước brom tạo kết tủa trắng 2,4,6-tribromoanilin do vòng benzen được hoạt hóa cực mạnh.'
  },
  CH3: {
    groupFormula: '-CH3',
    nameVI: 'Nhóm Metyl (Toluen)',
    directingCategory: 'ORTHO_PARA_ACTIVATING',
    activationLevel: 'WEAKLY_ACTIVATING',
    electronicEffectVI: 'Hiệu ứng cảm ứng dương (+I) và siêu liên hợp hyperconjugation',
    orthoPercent: 58,
    paraPercent: 38,
    metaPercent: 4,
    explanationVI: 'Toluen phản ứng thế nhanh hơn benzen khoảng 25 lần, ưu tiên thế vào vị trí ortho và para (tạo o-nitrotoluen và p-nitrotoluen).'
  },
  CL: {
    groupFormula: '-Cl',
    nameVI: 'Nhóm Clo (Clorobenzen)',
    directingCategory: 'ORTHO_PARA_DEACTIVATING',
    activationLevel: 'DEACTIVATING',
    electronicEffectVI: 'Hiệu ứng cảm ứng hút electron (-I) mạnh hơn hiệu ứng liên hợp (+M)',
    orthoPercent: 30,
    paraPercent: 70,
    metaPercent: 0,
    explanationVI: 'Nhóm halogen làm giảm mật độ electron toàn vòng (phản hoạt hóa), nhưng cặp electron tự do vẫn làm bền hóa ion arenium ở vị trí ortho và para.'
  },
  NO2: {
    groupFormula: '-NO2',
    nameVI: 'Nhóm Nitro (Nitrobenzen)',
    directingCategory: 'META_DEACTIVATING',
    activationLevel: 'STRONGLY_DEACTIVATING',
    electronicEffectVI: 'Cả hai hiệu ứng cảm ứng và liên hợp đều hút electron mạnh (-I, -M)',
    orthoPercent: 6,
    paraPercent: 1,
    metaPercent: 93,
    explanationVI: 'Nhóm -NO₂ làm vòng benzen nghèo electron nhất ở vị trí ortho và para; vị trí meta ít bị vô hiệu hóa hơn nên phản ứng thế định hướng 93% vào meta.'
  },
  COOH: {
    groupFormula: '-COOH',
    nameVI: 'Nhóm Cacboxyl (Axit Benzoic)',
    directingCategory: 'META_DEACTIVATING',
    activationLevel: 'DEACTIVATING',
    electronicEffectVI: 'Hút electron do liên kết C=O phân cực (-I, -M)',
    orthoPercent: 18,
    paraPercent: 2,
    metaPercent: 80,
    explanationVI: 'Axit benzoic định hướng nhóm thế tiếp theo vào vị trí meta và yêu cầu điều kiện phản ứng khắt khe hơn benzen.'
  }
};

export const COMMON_SUBSTRATES_CATALOG: OrganicSubstrateDef[] = [
  {
    id: 'methyl_bromide',
    nameVI: 'Bromometan (Metyl bromua)',
    nameIUPAC: 'Bromomethane',
    formula: 'CH3Br',
    carbonClassification: 'METHYL',
    leavingGroup: 'Br',
    hasChiralCenterAtReactionSite: false,
    stericHindranceScore: 1,
    carbocationStabilityScore: 1,
    pedagogicalDescriptionVI: 'Không bị che chắn không gian; không thể tạo cacbocation CH3+; CHỈ phản ứng theo cơ chế SN2.'
  },
  {
    id: 'ethyl_bromide',
    nameVI: 'Bromoetan (Etyl bromua - Bậc 1)',
    nameIUPAC: 'Bromoethane',
    formula: 'CH3CH2Br',
    carbonClassification: 'PRIMARY',
    leavingGroup: 'Br',
    hasChiralCenterAtReactionSite: false,
    stericHindranceScore: 2,
    carbocationStabilityScore: 2,
    pedagogicalDescriptionVI: 'Dẫn xuất halogen bậc 1; chướng ngại không gian rất nhỏ; phản ứng cực kỳ thuận lợi theo SN2.'
  },
  {
    id: 'isopropyl_bromide',
    nameVI: '2-Bromopropan (Isopropyl bromua - Bậc 2)',
    nameIUPAC: '2-Bromopropane',
    formula: '(CH3)2CHBr',
    carbonClassification: 'SECONDARY',
    leavingGroup: 'Br',
    hasChiralCenterAtReactionSite: false,
    stericHindranceScore: 5,
    carbocationStabilityScore: 6,
    pedagogicalDescriptionVI: 'Dẫn xuất bậc 2 ranh giới; cơ chế (SN1, SN2, E2) phụ thuộc mạnh vào độ mạnh của nucleophile, bazơ và dung môi.'
  },
  {
    id: 's_2_bromobutane',
    nameVI: '(S)-2-Bromobutan (Bậc 2 Bất Đối Xứng)',
    nameIUPAC: '(S)-2-Bromobutane',
    formula: 'CH3CH(Br)CH2CH3',
    carbonClassification: 'SECONDARY',
    leavingGroup: 'Br',
    hasChiralCenterAtReactionSite: true,
    stericHindranceScore: 5,
    carbocationStabilityScore: 6,
    pedagogicalDescriptionVI: 'Có nguyên tử cacbon bất đối xứng C2; minh chứng mẫu mực cho nghịch đảo cấu hình Walden (SN2) vs racemic hóa (SN1).'
  },
  {
    id: 'tert_butyl_bromide',
    nameVI: '2-Bromo-2-metylpropan (tert-Butyl bromua - Bậc 3)',
    nameIUPAC: '2-Bromo-2-methylpropane',
    formula: '(CH3)3CBr',
    carbonClassification: 'TERTIARY',
    leavingGroup: 'Br',
    hasChiralCenterAtReactionSite: false,
    stericHindranceScore: 9,
    carbocationStabilityScore: 9,
    pedagogicalDescriptionVI: 'Bị che chắn không gian hoàn toàn ở 3 phía; KHÔNG THỂ phản ứng SN2; phân ly tạo cacbocation bậc 3 siêu bền (SN1 hoặc E2).'
  },
  {
    id: 'bromobenzene',
    nameVI: 'Bromobenzen (Halogen gắn trực tiếp vòng thơm)',
    nameIUPAC: 'Bromobenzene',
    formula: 'C6H5Br',
    carbonClassification: 'ARYL',
    leavingGroup: 'Br',
    hasChiralCenterAtReactionSite: false,
    stericHindranceScore: 10,
    carbocationStabilityScore: 1,
    pedagogicalDescriptionVI: 'Liên kết C(sp2)-Br có tính chất liên hợp đôi p-π rất bền; TRƠ với cả SN1 và SN2 ở điều kiện thường.'
  }
];

export const COMMON_NUCLEOPHILES_CATALOG: NucleophileDef[] = [
  {
    id: 'hydroxide',
    nameVI: 'Ion Hiđroxit (OH⁻)',
    formula: 'OH⁻',
    nucleophilicity: 'STRONG',
    basicity: 'STRONG_BASE',
    isBulky: false,
    charge: -1
  },
  {
    id: 'cyanide',
    nameVI: 'Ion Xianua (CN⁻)',
    formula: 'CN⁻',
    nucleophilicity: 'STRONG',
    basicity: 'WEAK_BASE',
    isBulky: false,
    charge: -1
  },
  {
    id: 'iodide',
    nameVI: 'Ion Iotua (I⁻)',
    formula: 'I⁻',
    nucleophilicity: 'STRONG',
    basicity: 'WEAK_BASE',
    isBulky: false,
    charge: -1
  },
  {
    id: 'tert_butoxide',
    nameVI: 'Kali tert-butoxit (t-BuO⁻)',
    formula: '(CH3)3CO⁻',
    nucleophilicity: 'MODERATE',
    basicity: 'STRONG_BASE',
    isBulky: true, // Bulky base forces E2 elimination over substitution
    charge: -1
  },
  {
    id: 'water',
    nameVI: 'Nước (H₂O)',
    formula: 'H₂O',
    nucleophilicity: 'WEAK',
    basicity: 'WEAK_BASE',
    isBulky: false,
    charge: 0
  },
  {
    id: 'ethanol',
    nameVI: 'Etanol (C₂H₅OH)',
    formula: 'C2H5OH',
    nucleophilicity: 'WEAK',
    basicity: 'WEAK_BASE',
    isBulky: false,
    charge: 0
  }
];

export const COMMON_SOLVENTS_CATALOG: SolventDef[] = [
  {
    id: 'water_solvent',
    nameVI: 'Nước (H₂O)',
    formula: 'H₂O',
    type: 'POLAR_PROTIC',
    dielectricConstant: 80.1,
    pedagogicalNoteVI: 'Dung môi phân cực proton mạnh; solvat hóa anion halogen và làm bền hóa cacbocation, thúc đẩy cơ chế SN1.'
  },
  {
    id: 'acetone',
    nameVI: 'Axeton (CH₃COCH₃)',
    formula: 'CH3COCH3',
    type: 'POLAR_APROTIC',
    dielectricConstant: 20.7,
    pedagogicalNoteVI: 'Dung môi phân cực phi proton; không tạo liên kết hiđro với anion, giữ nucleophile ở trạng thái tự do giàu năng lượng, thúc đẩy SN2 tối đa.'
  },
  {
    id: 'dmso',
    nameVI: 'Đimetyl sunfoxit (DMSO)',
    formula: '(CH3)2SO',
    type: 'POLAR_APROTIC',
    dielectricConstant: 46.7,
    pedagogicalNoteVI: 'Dung môi phi proton có hằng số điện môi cao, tăng tốc độ phản ứng thế SN2 lên hàng nghìn lần.'
  },
  {
    id: 'ethanol_solvent',
    nameVI: 'Etanol (C₂H₅OH)',
    formula: 'C2H5OH',
    type: 'POLAR_PROTIC',
    dielectricConstant: 24.5,
    pedagogicalNoteVI: 'Phân cực proton; thường dùng làm dung môi cho phản ứng tách E2 khi phối hợp với bazơ mạnh KOH đun nóng.'
  }
];

/**
 * Predicts whether SN1, SN2, E1, or E2 occurs based on substrate, nucleophile/base, solvent, and temperature
 */
export function predictSubstitutionElimination(params: {
  substrateId: string;
  nucleophileId: string;
  solventId: string;
  temperatureCelsius?: number;
}): SubstitutionPredictionResult {
  const substrate = COMMON_SUBSTRATES_CATALOG.find(s => s.id === params.substrateId);
  const nucleophile = COMMON_NUCLEOPHILES_CATALOG.find(n => n.id === params.nucleophileId);
  const solvent = COMMON_SOLVENTS_CATALOG.find(sv => sv.id === params.solventId);

  if (!substrate || !nucleophile || !solvent) {
    throw new Error('Không tìm thấy cơ chất, tác nhân nucleophile hoặc dung môi trong danh mục chuẩn.');
  }

  const tempC = params.temperatureCelsius !== undefined ? params.temperatureCelsius : 25;

  // Rule 0: Aryl and Vinylic halides are inert under standard conditions
  if (substrate.carbonClassification === 'ARYL' || substrate.carbonClassification === 'VINYLIC') {
    return {
      substrate,
      nucleophile,
      solvent,
      temperatureCelsius: tempC,
      predominantMechanism: 'NO_REACTION',
      stereochemicalOutcome: 'NO_CHANGE',
      rateLawEquation: 'v = 0 (Trơ hóa học)',
      kineticOrder: 0,
      intermediateOrTransitionStateVI: 'Không thể tạo cacbocation phenyl do năng lượng quá cao; liên kết C(sp2)-X có một phần liên kết đôi do cộng hưởng p-π.',
      majorProductNameVI: 'Không phản ứng (Hỗn hợp giữ nguyên)',
      majorProductFormula: substrate.formula,
      stepByStepExplanationVI: [
        'Bước 1: Nhận diện cơ chất là dẫn xuất halogen liên kết trực tiếp với cacbon lai hóa sp² của vòng benzen.',
        'Bước 2: Cặp electron không chia của halogen liên hợp vào hệ electron π của vòng thơm, làm liên kết C-X ngắn lại và bền vững hơn nhiều so với liên kết C(sp³)-X.',
        'Bước 3: Ở điều kiện thường hoặc đun sôi nhẹ, bromobenzen hoàn toàn trơ với tác nhân nucleophile và dung môi kiềm loãng.'
      ],
      gameplayModifier: {
        spellSpeed: 1,
        elementalDamageType: 'ORGANIC_HALOGEN',
        damageMultiplier: 0,
        descriptionVI: 'Đòn công kích bị phản kháng hoàn toàn do liên kết thơm trơ hóa học.'
      }
    };
  }

  let mechanism: 'SN1' | 'SN2' | 'E1' | 'E2';
  let competing: 'SN1' | 'SN2' | 'E1' | 'E2' | undefined;
  let stereochemistry: 'WALDEN_INVERSION' | 'RACEMIZATION' | 'ZAITSEV_ALKENE' | 'HOFMANN_ALKENE';
  let majorProductVI: string;
  let majorProductFormula: string;
  let rateLaw: string;
  let kineticOrder: number;
  let intermediateVI: string;
  const stepsVI: string[] = [];

  // Bulky strong base (t-BuO-) -> Strictly E2 (Hofmann product on secondary/tertiary, E2 on primary if heated)
  if (nucleophile.isBulky && nucleophile.basicity === 'STRONG_BASE') {
    mechanism = 'E2';
    stereochemistry = 'HOFMANN_ALKENE';
    rateLaw = 'v = k · [Cơ chất] · [Bazơ]';
    kineticOrder = 2;
    intermediateVI = 'Trạng thái chuyển tiếp đồng thời anti-periplanar (H và Br ở vị trí đối song song)';
    majorProductVI = 'Anken ít nhóm thế hơn (Sản phẩm Hofmann do hiệu ứng che chắn không gian của bazơ cồng kềnh)';
    majorProductFormula = 'Alkene';
    stepsVI.push(
      `Bước 1: Tác nhân [${nucleophile.nameVI}] là một bazơ rất mạnh nhưng có kích thước hình học cồng kềnh (t-BuO⁻).`,
      'Bước 2: Chướng ngại không gian ngăn cản bazơ tiếp cận nguyên tử cacbon trung tâm, loại bỏ hoàn toàn khả năng thế nucleophile.',
      'Bước 3: Bazơ ưu tiên giật proton H⁺ ở vị trí cacbon bậc thấp ít bị che chắn nhất (ngoại vi), sinh ra anken kém bền hơn làm sản phẩm chính (quy tắc Hofmann).'
    );
  }
  // Case A: Methyl or Primary Substrate
  else if (substrate.carbonClassification === 'METHYL' || substrate.carbonClassification === 'PRIMARY') {
    if (nucleophile.basicity === 'STRONG_BASE' && tempC >= 80) {
      mechanism = 'E2';
      competing = 'SN2';
      stereochemistry = 'ZAITSEV_ALKENE';
      majorProductVI = 'Etylen (hoặc anken tương ứng)';
      majorProductFormula = 'CH2=CH2';
      rateLaw = 'v = k · [Cơ chất] · [Bazơ]';
      kineticOrder = 2;
      intermediateVI = 'Trạng thái chuyển tiếp tách đồng thời E2';
      stepsVI.push(
        'Bước 1: Dẫn xuất bậc 1 khi đun nóng ở nhiệt độ cao với bazơ mạnh sẽ ưu tiên tách theo cơ chế E2.',
        'Bước 2: Phản ứng thế SN2 cạnh tranh như một sản phẩm phụ.'
      );
    } else {
      mechanism = 'SN2';
      competing = undefined;
      stereochemistry = substrate.hasChiralCenterAtReactionSite ? 'WALDEN_INVERSION' : 'WALDEN_INVERSION';
      rateLaw = 'v = k · [Cơ chất] · [Nucleophile]';
      kineticOrder = 2;
      intermediateVI = 'Trạng thái chuyển tiếp ngũ phối tử [Nu···C···X]‡ với liên kết C-X đang đứt và C-Nu đang hình thành đồng thời.';
      majorProductVI = `Sản phẩm thế nucleophile ${nucleophile.formula === 'OH⁻' ? 'Ancol' : 'Dẫn xuất'}`;
      majorProductFormula = substrate.formula.replace(substrate.leavingGroup, nucleophile.formula.replace('⁻', ''));
      stepsVI.push(
        `Bước 1: Cơ chất [${substrate.nameVI}] thuộc loại ${substrate.carbonClassification === 'METHYL' ? 'Metyl' : 'Bậc 1'}, hầu như không có chướng ngại không gian.`,
        `Bước 2: Nucleophile [${nucleophile.nameVI}] tấn công từ phía đối diện liên kết C-${substrate.leavingGroup} (Backside Attack).`,
        `Bước 3: Cơ chế diễn ra trong một giai đoạn duy nhất (Concerted SN2), tốc độ phản ứng tỷ lệ bậc 2: v = k·[RX]·[Nu].`,
        `Bước 4: ${solvent.type === 'POLAR_APROTIC' ? 'Dung môi phân cực phi proton [' + solvent.nameVI + '] làm nucleophile tự do tối đa, tăng tốc độ SN2 vượt trội.' : 'Dung môi [' + solvent.nameVI + '] cho phép phản ứng diễn ra ổn định.'}`
      );
    }
  }
  // Case B: Tertiary Substrate
  else if (substrate.carbonClassification === 'TERTIARY') {
    if (nucleophile.basicity === 'STRONG_BASE') {
      mechanism = 'E2';
      competing = undefined;
      stereochemistry = 'ZAITSEV_ALKENE';
      rateLaw = 'v = k · [Cơ chất] · [Bazơ]';
      kineticOrder = 2;
      intermediateVI = 'Trạng thái chuyển tiếp anti-periplanar E2';
      majorProductVI = '2-Metylpropen (Anken Zaitsev)';
      majorProductFormula = '(CH3)2C=CH2';
      stepsVI.push(
        'Bước 1: Cơ chất bậc 3 bị 3 nhóm metyl che chắn hoàn toàn, ngăn cản nucleophile tiếp cận trung tâm C-Br (Loại bỏ SN2).',
        'Bước 2: Sự hiện diện của bazơ mạnh lập tức giật proton β-H, dẫn tới phản ứng tách E2 chiếm ưu thế tuyệt đối.'
      );
    } else {
      // Weak nucleophile / weak base (e.g. H2O, EtOH) -> SN1 (competing E1 if hot)
      if (tempC >= 60) {
        mechanism = 'E1';
        competing = 'SN1';
        stereochemistry = 'ZAITSEV_ALKENE';
        majorProductVI = '2-Metylpropen (Sản phẩm tách nhiệt độ cao E1)';
        majorProductFormula = '(CH3)2C=CH2';
      } else {
        mechanism = 'SN1';
        competing = 'E1';
        stereochemistry = 'RACEMIZATION';
        majorProductVI = 'tert-Butanol (Ancol bậc 3)';
        majorProductFormula = '(CH3)3C-OH';
      }
      rateLaw = 'v = k · [Cơ chất]';
      kineticOrder = 1;
      intermediateVI = 'Cacbocation phẳng lai hóa sp² (CH3)3C⁺ được làm bền nhờ 9 liên kết C-H siêu liên hợp hyperconjugation.';
      stepsVI.push(
        `Bước 1: Cơ chất phân ly dị ly chậm: (CH3)3C-Br → (CH3)3C⁺ + Br⁻ (giai đoạn quyết định tốc độ r.d.s).`,
        `Bước 2: Dung môi phân cực proton [${solvent.nameVI}] solvat hóa ion Br⁻ và làm bền cacbocation bậc 3.`,
        `Bước 3: Tác nhân nucleophile yếu [${nucleophile.nameVI}] tấn công nhanh vào cả 2 mặt của cacbocation phẳng.`,
        `Bước 4: Tốc độ phản ứng tuân theo động học bậc 1: v = k·[RX], không phụ thuộc nồng độ nucleophile.`
      );
    }
  }
  // Case C: Secondary Substrate (Ranh giới)
  else {
    // Strong base -> E2
    if (nucleophile.basicity === 'STRONG_BASE') {
      mechanism = 'E2';
      competing = 'SN2';
      stereochemistry = 'ZAITSEV_ALKENE';
      majorProductVI = 'But-2-en (Anken theo quy tắc Zaitsev)';
      majorProductFormula = 'CH3-CH=CH-CH3';
      rateLaw = 'v = k · [Cơ chất] · [Bazơ]';
      kineticOrder = 2;
      intermediateVI = 'Trạng thái chuyển tiếp tách E2 anti-periplanar';
      stepsVI.push(
        'Bước 1: Cơ chất bậc 2 phản ứng với bazơ mạnh ưu tiên tách proton β theo quy tắc Zaitsev.',
        'Bước 2: Nhóm halogen và nguyên tử H ở cacbon lân cận bậc cao hơn cùng tách ra, tạo liên kết đôi có nhiều nhóm thế hơn.'
      );
    }
    // Strong nucleophile + Polar aprotic solvent -> SN2 (Walden Inversion)
    else if (nucleophile.nucleophilicity === 'STRONG' && solvent.type === 'POLAR_APROTIC') {
      mechanism = 'SN2';
      competing = 'E2';
      stereochemistry = 'WALDEN_INVERSION';
      rateLaw = 'v = k · [Cơ chất] · [Nucleophile]';
      kineticOrder = 2;
      intermediateVI = 'Trạng thái chuyển tiếp ngũ phối tử nghịch đảo cấu hình không gian';
      majorProductVI = substrate.hasChiralCenterAtReactionSite
        ? '(R)-2-Butanol (hoặc dẫn xuất nghịch đảo 100% cấu hình Walden)'
        : 'Sản phẩm thế SN2';
      majorProductFormula = 'CH3CH(Nu)CH2CH3';
      stepsVI.push(
        'Bước 1: Nucleophile mạnh kết hợp với dung môi phân cực phi proton (Aprotic) thúc đẩy cơ chế thế lưỡng phân tử SN2.',
        'Bước 2: Tấn công mặt sau dẫn đến hiện tượng nghịch đảo cấu hình Walden (100% Inversion) tại trung tâm bất đối C2!'
      );
    }
    // Weak nucleophile + Polar protic solvent -> SN1 (Racemization)
    else {
      mechanism = 'SN1';
      competing = 'E1';
      stereochemistry = 'RACEMIZATION';
      rateLaw = 'v = k · [Cơ chất]';
      kineticOrder = 1;
      intermediateVI = 'Cacbocation bậc 2 phẳng CH3-CH⁺-CH2CH3';
      majorProductVI = 'Hỗn hợp racemic (±)-butan-2-ol (50% R + 50% S, triệt tiêu tính quang hoạt)';
      majorProductFormula = 'CH3CH(OH)CH2CH3';
      stepsVI.push(
        'Bước 1: Trong dung môi phân cực proton với tác nhân nucleophile yếu, cơ chất bậc 2 ion hóa chậm tạo cacbocation phẳng.',
        'Bước 2: Tấn công đối xứng từ cả 2 phía của mặt phẳng sp² tạo ra hỗn hợp racemic 50:50 không làm quay mặt phẳng ánh sáng phân cực.'
      );
    }
  }

  const spellSpeed = mechanism === 'SN2' || mechanism === 'E2' ? 2 : 1;
  const dmgMul = mechanism === 'SN2' && stereochemistry === 'WALDEN_INVERSION' ? 1.5 : 1.2;

  return {
    substrate,
    nucleophile,
    solvent,
    temperatureCelsius: tempC,
    predominantMechanism: mechanism,
    stereochemicalOutcome: stereochemistry,
    rateLawEquation: rateLaw,
    kineticOrder,
    intermediateOrTransitionStateVI: intermediateVI,
    majorProductNameVI: majorProductVI,
    majorProductFormula,
    competingMechanism: competing,
    stepByStepExplanationVI: stepsVI,
    gameplayModifier: {
      spellSpeed,
      elementalDamageType: stereochemistry === 'WALDEN_INVERSION' ? 'WALDEN_SHIELD_BREAK' : 'ORGANIC_HALOGEN',
      damageMultiplier: dmgMul,
      descriptionVI: stereochemistry === 'WALDEN_INVERSION'
        ? 'Hiệu ứng Nghịch Đảo Walden: Phá vỡ hoàn toàn lá chắn phòng thủ của đối thủ, gây thêm 50% sát thương chí mạng.'
        : `Phản ứng thế/tách theo cơ chế [${mechanism}], thi triển ở Spell Speed ${spellSpeed}.`
    }
  };
}

/**
 * Predicts Electrophilic Aromatic Substitution (SEAr) orientation and product distribution
 */
export function predictAromaticSubstitution(params: {
  aromaticSubstrateKey: 'BENZENE' | 'TOLUENE' | 'PHENOL' | 'ANILINE' | 'CHLOROBENZENE' | 'NITROBENZENE' | 'BENZOIC_ACID';
  electrophileType: 'NITRATION' | 'BROMINATION' | 'CHLORINATION' | 'FRIEDEL_CRAFTS_ALKYLATION';
}): {
  aromaticNameVI: string;
  substituentInfo?: SearSubstituentDef;
  reagentsAndCatalystVI: string;
  activeElectrophileFormula: string;
  reactivityComparisonToBenzeneVI: string;
  orientationDistribution: { orthoPct: number; paraPct: number; metaPct: number };
  majorProductVI: string;
  whelandComplexIntermediateVI: string;
  stepByStepExplanationVI: string[];
} {
  const reagentsMap = {
    NITRATION: { reagentsVI: 'HNO₃ đặc + H₂SO₄ đặc (xúc tác tạo NO₂⁺)', electrophile: 'NO₂⁺' },
    BROMINATION: { reagentsVI: 'Br₂ khan + FeBr₃ (hoặc bột Fe, đun nóng)', electrophile: 'Br⁺' },
    CHLORINATION: { reagentsVI: 'Cl₂ khan + AlCl₃ (xúc tác axit Lewis)', electrophile: 'Cl⁺' },
    FRIEDEL_CRAFTS_ALKYLATION: { reagentsVI: 'CH₃Cl + AlCl₃ khan', electrophile: 'CH₃⁺' }
  };

  const reagentData = reagentsMap[params.electrophileType];

  if (params.aromaticSubstrateKey === 'BENZENE') {
    return {
      aromaticNameVI: 'Benzen (C₆H₆)',
      reagentsAndCatalystVI: reagentData.reagentsVI,
      activeElectrophileFormula: reagentData.electrophile,
      reactivityComparisonToBenzeneVI: 'Chuẩn quy chiếu độ hoạt động = 1.0',
      orientationDistribution: { orthoPct: 33.3, paraPct: 33.3, metaPct: 33.3 },
      majorProductVI: params.electrophileType === 'NITRATION' ? 'Nitrobenzen (C₆H₅NO₂)' : 'Dẫn xuất thế benzen',
      whelandComplexIntermediateVI: 'Phức chất σ (Cacbocation arenium ion) với điện tích dương giải tỏa đều trên 5 nguyên tử cacbon lai hóa sp².',
      stepByStepExplanationVI: [
        'Bước 1: Axit xúc tác tạo ra tác nhân ái điện tử mang điện tích dương mạnh (Electrophile E⁺).',
        'Bước 2: Đám mây electron π của vòng benzen tấn công E⁺ tạo phức σ (ion arenium). Vòng thơm tạm thời mất tính thơm.',
        'Bước 3: Bazơ yếu trong môi trường nhanh chóng giật proton H⁺ để tái lập vòng thơm bền vững.'
      ]
    };
  }

  const substituentKeyMap: Record<string, string> = {
    TOLUENE: 'CH3',
    PHENOL: 'OH',
    ANILINE: 'NH2',
    CHLOROBENZENE: 'CL',
    NITROBENZENE: 'NO2',
    BENZOIC_ACID: 'COOH'
  };

  const subKey = substituentKeyMap[params.aromaticSubstrateKey];
  const subInfo = SEAR_SUBSTITUENTS_CATALOG[subKey];

  let majorName: string;
  if (params.aromaticSubstrateKey === 'PHENOL' && params.electrophileType === 'BROMINATION') {
    majorName = '2,4,6-Tribromophenol (Kết tủa trắng, thế cả 3 vị trí ortho và para cùng lúc!)';
  } else if (params.aromaticSubstrateKey === 'ANILINE' && params.electrophileType === 'BROMINATION') {
    majorName = '2,4,6-Tribromoanilin (Kết tủa trắng)';
  } else if (subInfo.directingCategory === 'META_DEACTIVATING') {
    majorName = `m-Dẫn xuất (${subInfo.metaPercent}% sản phẩm thế meta)`;
  } else {
    majorName = `Hỗn hợp ortho và para (ưu tiên para ${subInfo.paraPercent}% do ít bị che chắn không gian)`;
  }

  return {
    aromaticNameVI: subInfo.nameVI,
    substituentInfo: subInfo,
    reagentsAndCatalystVI: reagentData.reagentsVI,
    activeElectrophileFormula: reagentData.electrophile,
    reactivityComparisonToBenzeneVI: subInfo.activationLevel === 'STRONGLY_ACTIVATING'
      ? 'Hoạt hóa cực mạnh (> 1000 lần so với benzen)'
      : subInfo.activationLevel === 'WEAKLY_ACTIVATING'
      ? 'Hoạt hóa nhẹ (~25 lần so với benzen)'
      : 'Phản hoạt hóa (phản ứng chậm hơn benzen, đòi hỏi nhiệt độ cao)',
    orientationDistribution: {
      orthoPct: subInfo.orthoPercent,
      paraPct: subInfo.paraPercent,
      metaPct: subInfo.metaPercent
    },
    majorProductVI: majorName,
    whelandComplexIntermediateVI: `Phức σ arenium được làm bền hóa đặc biệt khi E⁺ tấn công vào vị trí ${subInfo.directingCategory === 'META_DEACTIVATING' ? 'meta' : 'ortho/para'} nhờ ${subInfo.electronicEffectVI}.`,
    stepByStepExplanationVI: [
      `Bước 1: Xác định bản chất nhóm thế [${subInfo.groupFormula}]: ${subInfo.electronicEffectVI}.`,
      `Bước 2: Đánh giá vị trí thế: Nhóm ${subInfo.nameVI} thuộc nhóm định hướng [${subInfo.directingCategory}].`,
      `Bước 3: Phân bố sản phẩm: Ortho (${subInfo.orthoPercent}%), Para (${subInfo.paraPercent}%), Meta (${subInfo.metaPercent}%).`,
      `Bước 4: Nhận xét sư phạm GDPT 2018: ${subInfo.explanationVI}`
    ]
  };
}
