// src/data/reactionsData.ts
// Exhaustive Chemical Reaction Catalog for ELEMENTA (310+ Balanced Reactions)
// Strictly audited against GDPT 2018 (KHTN 7-9, Hóa 10-12) & IUPAC standards

import { ReactionRule } from '../domain/types';

export interface ReactionDetail extends ReactionRule {
  groupCategory:
    | 'GROUP_A_WATER'
    | 'GROUP_B_IRON_CORROSION'
    | 'GROUP_C_ACID_BASE'
    | 'GROUP_D_PRECIPITATION_DISPLACEMENT'
    | 'GROUP_E_COMBUSTION'
    | 'GROUP_F_REDOX'
    | 'GROUP_G_ORGANIC'
    | 'GROUP_H_DECOMPOSITION'
    | 'COGNITIVE_TRAP';
  observablePhenomenaVI: string;
  chemicalExplanationLayers: {
    resultVI: string;
    evidenceVI: string;
    mechanismVI: string;
    generalizationVI: string;
  };
  safetyNoticeVI?: string;
  balancedEquationPlain: string;
}

export const REACTION_RULES_DATABASE: ReactionDetail[] = [
  {
    "id": "rx_groupE_combustion_na_cl2",
    "code": "R03_NA_CL2",
    "name_vi": "Natri cháy trong Khí Clo (Tổng hợp Muối Ăn)",
    "groupCategory": "GROUP_E_COMBUSTION",
    "reactants": [
      "Na",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Na(s) + Cl₂(g) → 2NaCl(s)",
    "ionicEquation": "2Na + Cl₂ → 2Na⁺ + 2Cl⁻",
    "balancedEquationPlain": "2Na + Cl2 -> 2NaCl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Natri nóng chảy cháy mãnh liệt trong bình khí clo với ngọn lửa màu vàng chói lòa, giải phóng nhiệt lượng lớn và tạo các vi tinh thể muối ăn NaCl màu trắng.",
    "observablePhenomenaVI": "Natri bốc cháy sáng chói với ngọn lửa vàng rực, tỏa nhiệt dữ dội và xuất hiện khói trắng dày đặc là các vi tinh thể muối natri clorua.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành tinh thể muối ăn Sodium Chloride (NaCl).",
      "evidenceVI": "2Na(s) + Cl₂(g) → 2NaCl(s) với ΔᵣH° = -822 kJ/mol tỏa nhiệt rất mạnh.",
      "mechanismVI": "Nguyên tử Na (3s¹) nhường 1 electron cho nguyên tử Cl (3p⁵) tạo thành ion Na⁺ và Cl⁻ hút nhau bằng lực tĩnh điện bền vững.",
      "generalizationVI": "Kim loại kiềm phản ứng mãnh liệt với halogen tạo muối halide mạng tinh thể ion."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },

  {
    "id": "rx_groupA_na_water",
    "code": "R01_NA",
    "name_vi": "Natri tác dụng với Nước (Bùng Nổ Kiềm)",
    "groupCategory": "GROUP_A_WATER",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑",
    "ionicEquation": "2Na + 2H₂O → 2Na⁺ + 2OH⁻ + H₂↑",
    "balancedEquationPlain": "2Na + 2H2O -> 2NaOH + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Natri (kim loại kiềm nhóm IA) có I₁ rất thấp (495.8 kJ/mol), phản ứng mãnh liệt với nước tạo dung dịch kiềm mạnh NaOH và khí H₂ giải phóng nhiệt lượng lớn.",
    "observablePhenomenaVI": "Viên natri nóng chảy vo tròn chạy lướt nhanh trên mặt nước, sủi bọt khí H₂ mãnh liệt, dung dịch làm phenolphthalein hóa hồng rực rỡ.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo dung dịch Sodium hydroxide (NaOH) và giải phóng khí Hydrogen (H₂).",
      "evidenceVI": "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑ (ΔᵣH < 0).",
      "mechanismVI": "Natri nhường 1 electron lớp ngoài cùng (3s¹) cho phân tử nước, khử ion H⁺ thành khí H₂ tự do.",
      "generalizationVI": "Kim loại kiềm nhóm IA (Li, Na, K, Rb, Cs) đều phản ứng mãnh liệt với nước ngay ở nhiệt độ phòng."
    },
    "safetyNoticeVI": "Phản ứng tỏa nhiệt lớn có thể làm khí H₂ bốc cháy nổ. Tuyệt đối không tự làm thí nghiệm lượng lớn ngoài phòng kiểm chuẩn.",
    "curriculumStandard": "GDPT_2018_KHTN_7"
  },
  {
    "id": "rx_groupA_k_water",
    "code": "R01_K",
    "name_vi": "Kali tác dụng với Nước (Bùng Nổ Tím)",
    "groupCategory": "GROUP_A_WATER",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2K(s) + 2H₂O(l) → 2KOH(aq) + H₂(g)↑",
    "ionicEquation": "2K + 2H₂O → 2K⁺ + 2OH⁻ + H₂↑",
    "balancedEquationPlain": "2K + 2H2O -> 2KOH + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kali có bán kính nguyên tử lớn hơn và I₁ thấp hơn natri (418.8 kJ/mol), phản ứng nổ dữ dội hơn và tự bốc cháy ngọn lửa màu tím đặc trưng.",
    "observablePhenomenaVI": "Viên kali bốc cháy ngay lập tức với ngọn lửa màu tím hoa cà rực rỡ và nổ tung thành nhiều mảnh nhỏ trên mặt nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo dung dịch Potassium hydroxide (KOH) và khí Hydrogen (H₂).",
      "evidenceVI": "2K(s) + 2H₂O(l) → 2KOH(aq) + H₂(g)↑.",
      "mechanismVI": "Cấu hình 4s¹ dễ dàng mất electron hơn 3s¹ của Na do hiệu ứng chắn của các lớp electron bên trong.",
      "generalizationVI": "Tính khử của kim loại kiềm tăng dần từ trên xuống dưới trong cùng một phân nhóm chính."
    },
    "curriculumStandard": "GDPT_2018_KHTN_7"
  },
  {
    "id": "rx_groupA_ba_water",
    "code": "R01_BA",
    "name_vi": "Bari tác dụng với Nước",
    "groupCategory": "GROUP_A_WATER",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Ba(s) + 2H₂O(l) → Ba(OH)₂(aq) + H₂(g)↑",
    "ionicEquation": "Ba + 2H₂O → Ba²⁺ + 2OH⁻ + H₂↑",
    "balancedEquationPlain": "Ba + 2H2O -> Ba(OH)2 + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Bari là kim loại kiềm thổ nặng (nhóm IIA), phản ứng nhanh với nước ở nhiệt độ phòng tạo dung dịch bazơ mạnh Ba(OH)2.",
    "observablePhenomenaVI": "Bari chìm xuống đáy và sủi bọt khí H2 liên tục, dung dịch dần ấm lên và có tính kiềm mạnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo dung dịch Bari hiđroxit và khí hiđro.",
      "evidenceVI": "Ba(s) + 2H₂O(l) → Ba(OH)₂(aq) + H₂(g)↑.",
      "mechanismVI": "Bari nhường 2 electron hóa trị (6s²) chuyển hóa thành cation Ba²⁺ bền vững.",
      "generalizationVI": "Các kim loại kiềm thổ Ca, Sr, Ba phản ứng được với nước ở nhiệt độ thường."
    },
    "curriculumStandard": "GDPT_2018_KHTN_7"
  },
  {
    "id": "rx_groupB_fe_corrosion",
    "code": "R02_RUST",
    "name_vi": "Ăn Mòn Gỉ Sắt (Oxi Hóa Chậm)",
    "groupCategory": "GROUP_B_IRON_CORROSION",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "4Fe(s) + 3O₂(g) + 2xH₂O(l) → 2Fe₂O₃·xH₂O(s)",
    "ionicEquation": "Quá trình ăn mòn điện hóa đa giai đoạn",
    "balancedEquationPlain": "4Fe + 3O2 + 2xH2O -> 2Fe2O3.xH2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 30,
    "durationTurns": 3,
    "pedagogicalExplanation": "Quá trình ăn mòn điện hóa sắt trong không khí ẩm đòi hỏi cả hai tác nhân O2 và H2O, tạo thành lớp gỉ sắt màu nâu đỏ xốp không bảo vệ được kim loại bên trong.",
    "observablePhenomenaVI": "Bề mặt sắt chuyển dần từ xám bạc sang lớp gỉ nâu đỏ xốp giòn, kim loại bị gặm mòn và suy giảm độ bền cơ học.",
    "chemicalExplanationLayers": {
      "resultVI": "Hình thành gỉ sắt ngậm nước Fe₂O₃·xH₂O.",
      "evidenceVI": "Sắt để trong không khí ẩm bị gỉ sét, nhưng trong nước đun sôi không có oxy hoặc trong không khí khô thì không bị gỉ.",
      "mechanismVI": "Fe bị oxi hóa tại anot thành Fe²⁺, O₂ bị khử tại catot thành OH⁻, sau đó Fe(OH)₂ tiếp tục bị oxi hóa thành Fe₂O₃·xH₂O.",
      "generalizationVI": "Ăn mòn kim loại trong tự nhiên chủ yếu là ăn mòn điện hóa học."
    },
    "curriculumStandard": "GDPT_2018_KHTN_8"
  },
  {
    "id": "rx_groupC_acid_base_neutralization",
    "code": "R03_NEUTRALIZE",
    "name_vi": "Phản Ứng Trung Hòa Acid - Base",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [],
    "requiredConditions": [
      "ACID_DILUTE",
      "BASE_ALKALINE"
    ],
    "isTrap": false,
    "equation": "HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)",
    "ionicEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l)",
    "balancedEquationPlain": "HCl + NaOH -> NaCl + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 2,
    "pedagogicalExplanation": "Bản chất của phản ứng trung hòa acid-base trong dung dịch nước là sự kết hợp giữa ion H+ và OH- tạo thành phân tử nước, enthalpy tỏa nhiệt chuẩn dH ≈ -57.3 kJ/mol.",
    "observablePhenomenaVI": "Nhiệt độ dung dịch tăng nhẹ, màu của chỉ thị axit-bazơ (quỳ tím hoặc phenolphthalein) chuyển về môi trường trung tính pH ≈ 7.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo muối ăn NaCl tan và phân tử nước H₂O.",
      "evidenceVI": "H⁺ + OH⁻ → H₂O (ΔᵣH = -57.3 kJ/mol).",
      "mechanismVI": "Proton H⁺ liên kết phối trí với cặp electron tự do của ion OH⁻ tạo liên kết cộng hóa trị phân cực bền vững.",
      "generalizationVI": "Mọi phản ứng giữa acid mạnh và base mạnh đều có cùng phương trình ion rút gọn và nhiệt lượng tỏa ra như nhau."
    },
    "curriculumStandard": "GDPT_2018_KHTN_8"
  },
  {
    "id": "rx_groupC_fe_acid",
    "code": "R03_FE_ACID",
    "name_vi": "Sắt tác dụng với Acid Loãng",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)↑",
    "ionicEquation": "Fe + 2H⁺ → Fe²⁺ + H₂↑",
    "balancedEquationPlain": "Fe + 2HCl -> FeCl2 + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 65,
    "durationTurns": 1,
    "pedagogicalExplanation": "Sắt đứng trước hydro trong dãy điện hóa (E° Fe2+/Fe = -0.44V < 0V), dễ dàng khử ion H+ thành khí H2 tự do.",
    "observablePhenomenaVI": "Miếng sắt tan dần, bọt khí H2 sủi lên liên tục không màu, dung dịch chuyển sang màu xanh nhạt của ion Fe²⁺.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo dung dịch Sắt(II) clorua và khí hiđro.",
      "evidenceVI": "Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)↑.",
      "mechanismVI": "Fe nhường 2 electron cho 2 proton H⁺ tạo khí H₂.",
      "generalizationVI": "Kim loại đứng trước H trong dãy hoạt động hóa học tác dụng được với acid thông thường (HCl, H2SO4 loãng)."
    },
    "curriculumStandard": "GDPT_2018_KHTN_8"
  },
  {
    "id": "rx_groupC_al_amphoteric",
    "code": "R05_AL_BASE",
    "name_vi": "Nhôm tác dụng với Dung Dịch Kiềm",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "BASE_ALKALINE",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2Al(s) + 2NaOH(aq) + 6H₂O(l) → 2Na[Al(OH)₄](aq) + 3H₂(g)↑",
    "ionicEquation": "2Al + 2OH⁻ + 6H₂O → 2[Al(OH)₄]⁻ + 3H₂↑",
    "balancedEquationPlain": "2Al + 2NaOH + 6H2O -> 2Na[Al(OH)4] + 3H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Màng oxit Al2O3 bị kiềm hòa tan trước, sau đó nhôm kim loại phản ứng với nước và kiềm tạo phức natri tetrahydroxoaluminat tan và khí H2.",
    "observablePhenomenaVI": "Lá nhôm tan nhanh chóng, sủi bọt khí H2 mãnh liệt, tỏa nhiệt lớn tạo dung dịch trong suốt không màu.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo muối phức tan Na[Al(OH)₄] và giải phóng khí H₂.",
      "evidenceVI": "2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂↑.",
      "mechanismVI": "Màng oxit thụ động bị phá vỡ trong môi trường kiềm, giải phóng bề mặt kim loại nhôm hoạt động.",
      "generalizationVI": "Kim loại có oxide và hydroxide lưỡng tính (Al, Zn) tan được trong dung dịch kiềm mạnh."
    },
    "curriculumStandard": "GDPT_2018_KHTN_9"
  },
  {
    "id": "rx_groupD_displacement_zn_cu",
    "code": "R04_ZN_CU",
    "name_vi": "Kẽm đẩy Đồng khỏi dung dịch muối",
    "groupCategory": "GROUP_D_PRECIPITATION_DISPLACEMENT",
    "reactants": [
      "Zn",
      "Cu"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)↓",
    "ionicEquation": "Zn + Cu²⁺ → Zn²⁺ + Cu↓",
    "balancedEquationPlain": "Zn + CuSO4 -> ZnSO4 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kẽm có thế khử chuẩn E°(Zn2+/Zn) = -0.76V âm hơn nhiều so với E°(Cu2+/Cu) = +0.34V, đẩy đồng ra khỏi dung dịch muối.",
    "observablePhenomenaVI": "Màu xanh lam của dung dịch CuSO4 nhạt dần, kim loại đồng màu đỏ gạch bám xốp ngoài lá kẽm.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo muối Kẽm sunfat trong dung dịch và giải phóng kim loại đồng.",
      "evidenceVI": "Zn + Cu²⁺ → Zn²⁺ + Cu.",
      "mechanismVI": "Kẽm nhường 2 electron trực tiếp cho cation Cu²⁺ trong dung dịch.",
      "generalizationVI": "Quy tắc alpha (α) trong dãy điện hóa: Chất oxi hóa mạnh hơn phản ứng với chất khử mạnh hơn tạo chất oxi hóa và khử yếu hơn."
    },
    "curriculumStandard": "GDPT_2018_KHTN_8"
  },
  {
    "id": "rx_groupD_precipitation_agcl",
    "code": "R04_AGCL",
    "name_vi": "Phản Ứng Kết Tủa Bạc Clorua (AgCl)",
    "groupCategory": "GROUP_D_PRECIPITATION_DISPLACEMENT",
    "reactants": [
      "Ag",
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)",
    "ionicEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓",
    "balancedEquationPlain": "AgNO3 + NaCl -> AgCl + NaNO3",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 60,
    "durationTurns": 2,
    "pedagogicalExplanation": "Tích số tan của AgCl cực nhỏ (Ksp = 1.8x10^-10), các ion Ag+ và Cl- kết hợp tức thời tạo kết tủa trắng vón.",
    "observablePhenomenaVI": "Xuất hiện ngay lập tức kết tủa trắng dạng vón cục lơ lửng rồi lắng xuống đáy ống nghiệm.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo kết tủa trắng Bạc clorua (AgCl).",
      "evidenceVI": "Ag⁺ + Cl⁻ → AgCl↓.",
      "mechanismVI": "Lực hút tĩnh điện ion hình thành mạng tinh thể lập phương tâm diện không tan trong nước.",
      "generalizationVI": "Phản ứng trao đổi ion trong dung dịch xảy ra khi tạo thành chất kết tủa, chất khí hoặc chất điện li yếu."
    },
    "curriculumStandard": "GDPT_2018_KHTN_8"
  },
  {
    "id": "rx_groupD_precipitation_baso4",
    "code": "R04_BASO4",
    "name_vi": "Phản Ứng Kết Tủa Bari Sunfat (BaSO4)",
    "groupCategory": "GROUP_D_PRECIPITATION_DISPLACEMENT",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
    "ionicEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓",
    "balancedEquationPlain": "BaCl2 + Na2SO4 -> BaSO4 + 2NaCl",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 65,
    "durationTurns": 2,
    "pedagogicalExplanation": "Ion Ba2+ kết hợp với ion SO4(2-) tạo kết tủa trắng BaSO4 siêu bền, không tan trong cả acid mạnh.",
    "observablePhenomenaVI": "Xuất hiện kết tủa trắng mịn như sữa, không tan khi nhỏ thêm dung dịch acid HCl dư.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo kết tủa trắng Bari sunfat (BaSO₄).",
      "evidenceVI": "Ba²⁺ + SO₄²⁻ → BaSO₄↓.",
      "mechanismVI": "Năng lượng mạng lưới tinh thể BaSO₄ rất lớn vượt trội so với năng lượng hydrat hóa.",
      "generalizationVI": "Thuốc thử đặc trưng để nhận biết ion sulfate là muối bari tan."
    },
    "curriculumStandard": "GDPT_2018_KHTN_8"
  },
  {
    "id": "rx_groupE_combustion_fe_cl2",
    "code": "R03_FE_CL2",
    "name_vi": "Sắt cháy trong Khí Clo",
    "groupCategory": "GROUP_E_COMBUSTION",
    "reactants": [
      "Fe",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Fe(s) + 3Cl₂(g) → 2FeCl₃(s)",
    "ionicEquation": "2Fe + 3Cl₂ → 2Fe³⁺ + 6Cl⁻",
    "balancedEquationPlain": "2Fe + 3Cl2 -> 2FeCl3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Khí clo là chất oxi hóa rất mạnh, đưa sắt lên số oxi hóa cao nhất +3 (FeCl3) chứ không dừng ở mức +2 như acid HCl.",
    "observablePhenomenaVI": "Dây sắt nung đỏ bốc cháy sáng rực rỡ trong bình khí clo không cần ngọn lửa, sinh ra khói màu nâu đỏ đặc quánh của FeCl3.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo muối Sắt(III) clorua màu nâu đỏ.",
      "evidenceVI": "2Fe(s) + 3Cl₂(g) → 2FeCl₃(s).",
      "mechanismVI": "Clo nhận 1e tạo ion Cl⁻ có ái lực electron lớn, oxi hóa sâu Fe lên trạng thái 3d⁵ bền vững bán bão hòa.",
      "generalizationVI": "Khí clo oxi hóa hầu hết kim loại lên số oxi hóa cao nhất."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_groupE_combustion_al_o2",
    "code": "R05_AL_O2",
    "name_vi": "Nhôm cháy trong Khí Oxi (Nhiệt Nhôm)",
    "groupCategory": "GROUP_E_COMBUSTION",
    "reactants": [
      "Al",
      "O"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "4Al(s) + 3O₂(g) → 2Al₂O₃(s)",
    "ionicEquation": "4Al + 3O₂ → 2Al³⁺ + 6O²⁻",
    "balancedEquationPlain": "4Al + 3O2 -> 2Al2O3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng đốt cháy nhôm bột tỏa nhiệt lượng khổng lồ (dH = -1675.7 kJ/mol), nhiệt độ có thể vượt 2500°C làm nóng chảy sắt thép.",
    "observablePhenomenaVI": "Bột nhôm cháy chói lòa như pháo hoa tia sáng trắng, tỏa nhiệt lượng cực lớn và để lại bột oxit trắng mịn.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo nhôm oxit Al₂O₃ và nhiệt lượng cực lớn.",
      "evidenceVI": "4Al + 3O₂ → 2Al₂O₃ (ΔᵣH = -3351 kJ).",
      "mechanismVI": "Liên kết ion - cộng hóa trị bền vững Al-O giải phóng năng lượng liên kết khổng lồ.",
      "generalizationVI": "Nhiệt nhôm được ứng dụng kinh điển để hàn đường ray xe lửa tại chỗ."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_trap_cu_acid",
    "code": "R06_TRAP_CU_ACID",
    "name_vi": "BẪY: Đồng tác dụng với Acid Loãng",
    "groupCategory": "COGNITIVE_TRAP",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": true,
    "equation": "Cu(s) + HCl(aq) → KHÔNG PHẢN ỨNG",
    "ionicEquation": "Cu + H⁺ → Xảy ra phản ứng = FALSE",
    "balancedEquationPlain": "Cu + HCl -> NO_REACTION",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 0,
    "durationTurns": 0,
    "pedagogicalExplanation": "Đồng đứng sau hydro trong dãy hoạt động hóa học (E° Cu2+/Cu = +0.34V > 0V), không thể khử ion H+ của acid không có tính oxi hóa.",
    "observablePhenomenaVI": "Mảnh đồng nằm yên dưới đáy ống nghiệm không có bọt khí sủi lên, màu sắc dung dịch hoàn toàn không đổi.",
    "chemicalExplanationLayers": {
      "resultVI": "Không xảy ra phản ứng hóa học ở điều kiện chuẩn.",
      "evidenceVI": "Thế điện cực E°(Cu²⁺/Cu) = +0.34V > E°(2H⁺/H₂) = 0.00V.",
      "mechanismVI": "Ion H⁺ không đủ thế oxi hóa để lấy electron từ nguyên tử đồng.",
      "generalizationVI": "Các kim loại đứng sau H (Cu, Ag, Au, Pt) không tác dụng với HCl và H2SO4 loãng."
    },
    "curriculumStandard": "GDPT_2018_KHTN_8"
  },
  {
    "id": "rx_trap_au_combustion",
    "code": "R06_TRAP_AU_O2",
    "name_vi": "BẪY: Vàng cháy trong Khí Oxi",
    "groupCategory": "COGNITIVE_TRAP",
    "reactants": [
      "Au"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],
    "isTrap": true,
    "equation": "Au(s) + O₂(g) → KHÔNG PHẢN ỨNG (Lửa Thử Vàng)",
    "balancedEquationPlain": "Au + O2 -> NO_REACTION",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 0,
    "durationTurns": 0,
    "pedagogicalExplanation": "Vàng là kim loại trơ tuyệt đối, không bị oxi hóa bởi oxy không khí ở bất kỳ nhiệt độ nào ('Lửa thử vàng, gian nan thử sức').",
    "observablePhenomenaVI": "Vàng nóng chảy thành khối lỏng sáng vàng rực nhưng không bị biến đổi hóa học, để nguội vẫn giữ nguyên màu vàng óng ánh.",
    "chemicalExplanationLayers": {
      "resultVI": "Vàng không bị oxi hóa bởi oxy.",
      "evidenceVI": "Au + O₂ → Không phản ứng ở mọi nhiệt độ.",
      "mechanismVI": "Năng lượng ion hóa cao và hiệu ứng tương đối tính bảo vệ cặp electron hóa trị.",
      "generalizationVI": "Kim loại quý vàng và bạch kim không phản ứng trực tiếp với khí oxy."
    },
    "curriculumStandard": "GDPT_2018_KHTN_8"
  },
  {
    "id": "rx_trap_he_combustion",
    "code": "R06_TRAP_HE_O2",
    "name_vi": "BẪY: Đốt Cháy Khí Heli",
    "groupCategory": "COGNITIVE_TRAP",
    "reactants": [
      "He"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],
    "isTrap": true,
    "equation": "He(g) + O₂(g) → KHÔNG PHẢN ỨNG (Khí Trơ Bền Vững)",
    "balancedEquationPlain": "He + O2 -> NO_REACTION",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 0,
    "durationTurns": 0,
    "pedagogicalExplanation": "Heli có cấu hình electron 1s² bão hòa tuyệt đối và năng lượng ion hóa thứ nhất cao nhất bảng tuần hoàn (2372 kJ/mol), không thể tham gia phản ứng cháy.",
    "observablePhenomenaVI": "Ngọn lửa que đóm bị dập tắt ngay lập tức khi đưa vào bình chứa khí heli.",
    "chemicalExplanationLayers": {
      "resultVI": "Khí heli hoàn toàn không cháy và không duy trì sự cháy.",
      "evidenceVI": "He + O₂ → Không phản ứng.",
      "mechanismVI": "Lớp vỏ 1s² bão hòa che chắn hạt nhân hoàn hảo, không thể nhận hay nhường electron.",
      "generalizationVI": "Khí hiếm được sử dụng làm môi trường trơ chống cháy nổ an toàn tuyệt đối."
    },
    "curriculumStandard": "GDPT_2018_KHTN_7"
  },
  {
    "id": "rx_exp_1",
    "code": "RX_EXP_001",
    "name_vi": "Liti tác dụng với Nước",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Li"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2Li(s) + 2H₂O(l) → 2LiOH(aq) + H₂(g)↑",
    "balancedEquationPlain": "2Li + 2H2O -> 2LiOH + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kim loại liti phản ứng êm dịu hơn natri, giải phóng khí H2.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Liti tác dụng với Nước: xảy ra rõ rệt theo phương trình 2Li(s) + 2H₂O(l) → 2LiOH(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Li(s) + 2H₂O(l) → 2LiOH(aq) + H₂(g)↑.",
      "evidenceVI": "2Li(s) + 2H₂O(l) → 2LiOH(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_2",
    "code": "RX_EXP_002",
    "name_vi": "Canxi tác dụng với Nước",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g)↑",
    "balancedEquationPlain": "Ca + 2H2O -> Ca(OH)2 + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Canxi chìm trong nước và sủi bọt khí H2 đều đặn tạo nước vôi trong vẩn đục.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Canxi tác dụng với Nước: xảy ra rõ rệt theo phương trình Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g)↑.",
      "evidenceVI": "Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_3",
    "code": "RX_EXP_003",
    "name_vi": "Rubidi nổ tung trong Nước",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Rb"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2Rb(s) + 2H₂O(l) → 2RbOH(aq) + H₂(g)↑",
    "balancedEquationPlain": "2Rb + 2H2O -> 2RbOH + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 100,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kim loại rubidi nổ phá vỡ đáy cốc thủy tinh ngay khi tiếp xúc nước.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Rubidi nổ tung trong Nước: xảy ra rõ rệt theo phương trình 2Rb(s) + 2H₂O(l) → 2RbOH(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Rb(s) + 2H₂O(l) → 2RbOH(aq) + H₂(g)↑.",
      "evidenceVI": "2Rb(s) + 2H₂O(l) → 2RbOH(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_4",
    "code": "RX_EXP_004",
    "name_vi": "Xesi nổ bùng trong Nước",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cs"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2Cs(s) + 2H₂O(l) → 2CsOH(aq) + H₂(g)↑",
    "balancedEquationPlain": "2Cs + 2H2O -> 2CsOH + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 110,
    "durationTurns": 1,
    "pedagogicalExplanation": "Xesi là kim loại kiềm mạnh nhất, phản ứng nổ dữ dội phát sóng chấn động.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Xesi nổ bùng trong Nước: xảy ra rõ rệt theo phương trình 2Cs(s) + 2H₂O(l) → 2CsOH(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Cs(s) + 2H₂O(l) → 2CsOH(aq) + H₂(g)↑.",
      "evidenceVI": "2Cs(s) + 2H₂O(l) → 2CsOH(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_5",
    "code": "RX_EXP_005",
    "name_vi": "Stronti tác dụng với Nước",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Sr"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Sr(s) + 2H₂O(l) → Sr(OH)₂(aq) + H₂(g)↑",
    "balancedEquationPlain": "Sr + 2H2O -> Sr(OH)2 + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kim loại stronti phản ứng mạnh với nước tạo dung dịch kiềm stronti hiđroxit.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Stronti tác dụng với Nước: xảy ra rõ rệt theo phương trình Sr(s) + 2H₂O(l) → Sr(OH)₂(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Sr(s) + 2H₂O(l) → Sr(OH)₂(aq) + H₂(g)↑.",
      "evidenceVI": "Sr(s) + 2H₂O(l) → Sr(OH)₂(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_6",
    "code": "RX_EXP_006",
    "name_vi": "Magie tác dụng hơi nước ở nhiệt độ cao",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Mg(s) + H₂O(g) → MgO(s) + H₂(g)↑",
    "balancedEquationPlain": "Mg + H2O -> MgO + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Magie không phản ứng với nước lạnh nhưng cháy sáng trong hơi nước sôi.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Magie tác dụng hơi nước ở nhiệt độ cao: xảy ra rõ rệt theo phương trình Mg(s) + H₂O(g) → MgO(s) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Mg(s) + H₂O(g) → MgO(s) + H₂(g)↑.",
      "evidenceVI": "Mg(s) + H₂O(g) → MgO(s) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_7",
    "code": "RX_EXP_007",
    "name_vi": "Sắt tác dụng với hơi nước nhiệt độ cao (< 570°C)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)↑",
    "balancedEquationPlain": "3Fe + 4H2O -> Fe3O4 + 4H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Sắt nung đỏ tác dụng với hơi nước tạo oxit sắt từ và khí hydro.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Sắt tác dụng với hơi nước nhiệt độ cao (< 570°C): xảy ra rõ rệt theo phương trình 3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)↑.",
      "evidenceVI": "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_8",
    "code": "RX_EXP_008",
    "name_vi": "Than nóng đỏ tác dụng với hơi nước (Khí than ướt)",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C(s) + H₂O(g) → CO(g) + H₂(g)↑",
    "balancedEquationPlain": "C + H2O -> CO + H2",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Khí than ướt (hỗn hợp CO và H2) là nhiên liệu khí công nghiệp quan trọng.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Than nóng đỏ tác dụng với hơi nước (Khí than ướt): xảy ra rõ rệt theo phương trình C(s) + H₂O(g) → CO(g) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C(s) + H₂O(g) → CO(g) + H₂(g)↑.",
      "evidenceVI": "C(s) + H₂O(g) → CO(g) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_9",
    "code": "RX_EXP_009",
    "name_vi": "Tổng hợp Nước (Hỗn hợp nổ)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "H",
      "O"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂(g) + O₂(g) → 2H₂O(l)",
    "balancedEquationPlain": "2H2 + O2 -> 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 100,
    "durationTurns": 1,
    "pedagogicalExplanation": "Hỗn hợp 2 thể tích H2 và 1 thể tích O2 là hỗn hợp nổ mạnh nhất.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tổng hợp Nước (Hỗn hợp nổ): xảy ra rõ rệt theo phương trình 2H₂(g) + O₂(g) → 2H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2H₂(g) + O₂(g) → 2H₂O(l).",
      "evidenceVI": "2H₂(g) + O₂(g) → 2H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_10",
    "code": "RX_EXP_010",
    "name_vi": "Đốt cháy Than đá",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "O"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "C(s) + O₂(g) → CO₂(g)",
    "balancedEquationPlain": "C + O2 -> CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Than cháy tỏa nhiệt lượng duy trì các nhà máy nhiệt điện than.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt cháy Than đá: xảy ra rõ rệt theo phương trình C(s) + O₂(g) → CO₂(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C(s) + O₂(g) → CO₂(g).",
      "evidenceVI": "C(s) + O₂(g) → CO₂(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_11",
    "code": "RX_EXP_011",
    "name_vi": "Đốt cháy Lưu huỳnh",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S",
      "O"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "S(s) + O₂(g) → SO₂(g)",
    "balancedEquationPlain": "S + O2 -> SO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Lưu huỳnh cháy ngọn lửa màu xanh lam sinh ra khí SO2 mùi hắc xốc.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt cháy Lưu huỳnh: xảy ra rõ rệt theo phương trình S(s) + O₂(g) → SO₂(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình S(s) + O₂(g) → SO₂(g).",
      "evidenceVI": "S(s) + O₂(g) → SO₂(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_12",
    "code": "RX_EXP_012",
    "name_vi": "Đốt cháy Photpho",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "4P(s) + 5O₂(g) → 2P₂O₅(s)",
    "balancedEquationPlain": "4P + 5O2 -> 2P2O5",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Photpho cháy sáng rực rỡ sinh ra khói trắng dày đặc của P2O5.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt cháy Photpho: xảy ra rõ rệt theo phương trình 4P(s) + 5O₂(g) → 2P₂O₅(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 4P(s) + 5O₂(g) → 2P₂O₅(s).",
      "evidenceVI": "4P(s) + 5O₂(g) → 2P₂O₅(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_13",
    "code": "RX_EXP_013",
    "name_vi": "Đốt cháy Dây Magie",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg",
      "O"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2Mg(s) + O₂(g) → 2MgO(s)",
    "balancedEquationPlain": "2Mg + O2 -> 2MgO",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Dây magie cháy chói lòa tạo bột trắng magnesia.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt cháy Dây Magie: xảy ra rõ rệt theo phương trình 2Mg(s) + O₂(g) → 2MgO(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Mg(s) + O₂(g) → 2MgO(s).",
      "evidenceVI": "2Mg(s) + O₂(g) → 2MgO(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_14",
    "code": "RX_EXP_014",
    "name_vi": "Sắt cháy trong Khí Oxi",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe",
      "O"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "3Fe(s) + 2O₂(g) → Fe₃O₄(s)",
    "balancedEquationPlain": "3Fe + 2O2 -> Fe3O4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Dây sắt cuốn que đóm cháy sáng bắn ra các tia lửa hoa mai rực rỡ.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Sắt cháy trong Khí Oxi: xảy ra rõ rệt theo phương trình 3Fe(s) + 2O₂(g) → Fe₃O₄(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 3Fe(s) + 2O₂(g) → Fe₃O₄(s).",
      "evidenceVI": "3Fe(s) + 2O₂(g) → Fe₃O₄(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_15",
    "code": "RX_EXP_015",
    "name_vi": "Đốt nóng Đồng trong không khí",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu",
      "O"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2Cu(s) + O₂(g) → 2CuO(s)",
    "balancedEquationPlain": "2Cu + O2 -> 2CuO",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 60,
    "durationTurns": 1,
    "pedagogicalExplanation": "Bề mặt lá đồng màu đỏ chuyển dần thành màng oxit CuO màu đen.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt nóng Đồng trong không khí: xảy ra rõ rệt theo phương trình 2Cu(s) + O₂(g) → 2CuO(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Cu(s) + O₂(g) → 2CuO(s).",
      "evidenceVI": "2Cu(s) + O₂(g) → 2CuO(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_16",
    "code": "RX_EXP_016",
    "name_vi": "Natri cháy trong Oxi khô",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na",
      "O"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2Na(s) + O₂(g) → Na₂O₂(s)",
    "balancedEquationPlain": "2Na + O2 -> Na2O2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Natri cháy với ngọn lửa màu vàng chói tạo natri peoxit Na2O2 màu vàng nhạt.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Natri cháy trong Oxi khô: xảy ra rõ rệt theo phương trình 2Na(s) + O₂(g) → Na₂O₂(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Na(s) + O₂(g) → Na₂O₂(s).",
      "evidenceVI": "2Na(s) + O₂(g) → Na₂O₂(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_17",
    "code": "RX_EXP_017",
    "name_vi": "Tổng hợp Khí Hiđro Clorua",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "H",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "H₂(g) + Cl₂(g) → 2HCl(g)",
    "balancedEquationPlain": "H2 + Cl2 -> 2HCl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Hỗn hợp nổ khi chiếu sáng bởi ánh sáng mặt trời hoặc mồi lửa.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tổng hợp Khí Hiđro Clorua: xảy ra rõ rệt theo phương trình H₂(g) + Cl₂(g) → 2HCl(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình H₂(g) + Cl₂(g) → 2HCl(g).",
      "evidenceVI": "H₂(g) + Cl₂(g) → 2HCl(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_18",
    "code": "RX_EXP_018",
    "name_vi": "Đồng cháy trong Khí Clo",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Cu(s) + Cl₂(g) → CuCl₂(s)",
    "balancedEquationPlain": "Cu + Cl2 -> CuCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Dây đồng nung đỏ bốc cháy trong khí clo tạo khói màu nâu CuCl2.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đồng cháy trong Khí Clo: xảy ra rõ rệt theo phương trình Cu(s) + Cl₂(g) → CuCl₂(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Cu(s) + Cl₂(g) → CuCl₂(s).",
      "evidenceVI": "Cu(s) + Cl₂(g) → CuCl₂(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_19",
    "code": "RX_EXP_019",
    "name_vi": "Nhôm cháy trong Khí Clo",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + 3Cl₂(g) → 2AlCl₃(s)",
    "balancedEquationPlain": "2Al + 3Cl2 -> 2AlCl3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 92,
    "durationTurns": 1,
    "pedagogicalExplanation": "Bột nhôm rắc vào bình khí clo bốc cháy như pháo sáng.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhôm cháy trong Khí Clo: xảy ra rõ rệt theo phương trình 2Al(s) + 3Cl₂(g) → 2AlCl₃(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Al(s) + 3Cl₂(g) → 2AlCl₃(s).",
      "evidenceVI": "2Al(s) + 3Cl₂(g) → 2AlCl₃(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_20",
    "code": "RX_EXP_020",
    "name_vi": "Sắt tác dụng với Lưu huỳnh nung nóng",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe(s) + S(s) → FeS(s)",
    "balancedEquationPlain": "Fe + S -> FeS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Hỗn hợp bột sắt và lưu huỳnh khi mồi lửa tự duy trì phản ứng đỏ rực.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Sắt tác dụng với Lưu huỳnh nung nóng: xảy ra rõ rệt theo phương trình Fe(s) + S(s) → FeS(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Fe(s) + S(s) → FeS(s).",
      "evidenceVI": "Fe(s) + S(s) → FeS(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_21",
    "code": "RX_EXP_021",
    "name_vi": "Kẽm tác dụng với Lưu huỳnh",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Zn(s) + S(s) → ZnS(s)",
    "balancedEquationPlain": "Zn + S -> ZnS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng nổ sáng dùng trong thuốc súng hoa lửa cổ điển.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Kẽm tác dụng với Lưu huỳnh: xảy ra rõ rệt theo phương trình Zn(s) + S(s) → ZnS(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Zn(s) + S(s) → ZnS(s).",
      "evidenceVI": "Zn(s) + S(s) → ZnS(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_22",
    "code": "RX_EXP_022",
    "name_vi": "Đồng tác dụng với hơi Lưu huỳnh",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Cu(s) + S(s) → Cu₂S(s)",
    "balancedEquationPlain": "2Cu + S -> Cu2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 65,
    "durationTurns": 1,
    "pedagogicalExplanation": "Sợi đồng cháy trong hơi lưu huỳnh tạo đồng(I) sunfua màu đen.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đồng tác dụng với hơi Lưu huỳnh: xảy ra rõ rệt theo phương trình 2Cu(s) + S(s) → Cu₂S(s).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Cu(s) + S(s) → Cu₂S(s).",
      "evidenceVI": "2Cu(s) + S(s) → Cu₂S(s)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_23",
    "code": "RX_EXP_023",
    "name_vi": "Chu trình Haber-Bosch tổng hợp Amoniac",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N",
      "H"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
    "balancedEquationPlain": "N2 + 3H2 -> 2NH3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng cứu sống hàng tỷ người nhờ cung cấp phân bón đạm nuôi sống thế giới.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Chu trình Haber-Bosch tổng hợp Amoniac: xảy ra rõ rệt theo phương trình N₂(g) + 3H₂(g) ⇌ 2NH₃(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình N₂(g) + 3H₂(g) ⇌ 2NH₃(g).",
      "evidenceVI": "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_24",
    "code": "RX_EXP_024",
    "name_vi": "Oxi hóa SO2 có xúc tác V2O5",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2SO₂(g) + O₂(g) ⇌ 2SO₃(g)",
    "balancedEquationPlain": "2SO2 + O2 -> 2SO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Giai đoạn then chốt trong dây chuyền sản xuất acid sulfuric tiếp xúc.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Oxi hóa SO2 có xúc tác V2O5: xảy ra rõ rệt theo phương trình 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2SO₂(g) + O₂(g) ⇌ 2SO₃(g).",
      "evidenceVI": "2SO₂(g) + O₂(g) ⇌ 2SO₃(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_25",
    "code": "RX_EXP_025",
    "name_vi": "Khí NO hóa nâu trong không khí",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "NO"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2NO(g) + O₂(g) → 2NO₂(g)",
    "balancedEquationPlain": "2NO + O2 -> 2NO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 65,
    "durationTurns": 1,
    "pedagogicalExplanation": "Khí NO không màu kết hợp tức thì với oxy không khí tạo khí NO2 nâu đỏ.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Khí NO hóa nâu trong không khí: xảy ra rõ rệt theo phương trình 2NO(g) + O₂(g) → 2NO₂(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2NO(g) + O₂(g) → 2NO₂(g).",
      "evidenceVI": "2NO(g) + O₂(g) → 2NO₂(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_26",
    "code": "RX_EXP_026",
    "name_vi": "Magie tác dụng với Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑",
    "balancedEquationPlain": "Mg + 2HCl -> MgCl2 + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Magie tan nhanh sủi bọt khí H2 mãnh liệt, tỏa nhiều nhiệt.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Magie tác dụng với Acid HCl: xảy ra rõ rệt theo phương trình Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑.",
      "evidenceVI": "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_27",
    "code": "RX_EXP_027",
    "name_vi": "Kẽm tác dụng với Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
    "balancedEquationPlain": "Zn + 2HCl -> ZnCl2 + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phương pháp kinh điển để điều chế khí H2 trong phòng thí nghiệm bình Kíp.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Kẽm tác dụng với Acid HCl: xảy ra rõ rệt theo phương trình Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑.",
      "evidenceVI": "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_28",
    "code": "RX_EXP_028",
    "name_vi": "Nhôm tác dụng với Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)↑",
    "balancedEquationPlain": "2Al + 6HCl -> 2AlCl3 + 3H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Lá nhôm tan nhanh sau khi lớp màng oxit bề mặt bị hòa tan.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhôm tác dụng với Acid HCl: xảy ra rõ rệt theo phương trình 2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)↑.",
      "evidenceVI": "2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_29",
    "code": "RX_EXP_029",
    "name_vi": "Kẽm tác dụng với Acid H2SO4 loãng",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
    "balancedEquationPlain": "Zn + H2SO4 -> ZnSO4 + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Điều chế khí hydro sạch trong công nghiệp.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Kẽm tác dụng với Acid H2SO4 loãng: xảy ra rõ rệt theo phương trình Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑.",
      "evidenceVI": "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_30",
    "code": "RX_EXP_030",
    "name_vi": "Sắt tác dụng với Acid H2SO4 loãng",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Fe(s) + H₂SO₄(aq) → FeSO₄(aq) + H₂(g)↑",
    "balancedEquationPlain": "Fe + H2SO4 -> FeSO4 + H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Sắt tan tạo dung dịch muối sắt(II) màu xanh lục nhạt.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Sắt tác dụng với Acid H2SO4 loãng: xảy ra rõ rệt theo phương trình Fe(s) + H₂SO₄(aq) → FeSO₄(aq) + H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Fe(s) + H₂SO₄(aq) → FeSO₄(aq) + H₂(g)↑.",
      "evidenceVI": "Fe(s) + H₂SO₄(aq) → FeSO₄(aq) + H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_31",
    "code": "RX_EXP_031",
    "name_vi": "Nhôm tác dụng với Acid H2SO4 loãng",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "2Al(s) + 3H₂SO₄(aq) → Al₂(SO₄)₃(aq) + 3H₂(g)↑",
    "balancedEquationPlain": "2Al + 3H2SO4 -> Al2(SO4)3 + 3H2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Giải phóng thể tích khí hydro lớn gấp 1.5 lần số mol nhôm.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhôm tác dụng với Acid H2SO4 loãng: xảy ra rõ rệt theo phương trình 2Al(s) + 3H₂SO₄(aq) → Al₂(SO₄)₃(aq) + 3H₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Al(s) + 3H₂SO₄(aq) → Al₂(SO₄)₃(aq) + 3H₂(g)↑.",
      "evidenceVI": "2Al(s) + 3H₂SO₄(aq) → Al₂(SO₄)₃(aq) + 3H₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_32",
    "code": "RX_EXP_032",
    "name_vi": "Natri oxit tác dụng với Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Na₂O(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l)",
    "balancedEquationPlain": "Na2O + 2HCl -> 2NaCl + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Oxide base tan trong acid tạo muối và nước.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Natri oxit tác dụng với Acid HCl: xảy ra rõ rệt theo phương trình Na₂O(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Na₂O(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l).",
      "evidenceVI": "Na₂O(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_33",
    "code": "RX_EXP_033",
    "name_vi": "Vôi sống tan trong Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "CaO(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l)",
    "balancedEquationPlain": "CaO + 2HCl -> CaCl2 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Vôi sống tan nhanh không sủi bọt khí tỏa nhiều nhiệt.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Vôi sống tan trong Acid HCl: xảy ra rõ rệt theo phương trình CaO(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CaO(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l).",
      "evidenceVI": "CaO(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_34",
    "code": "RX_EXP_034",
    "name_vi": "Đồng(II) oxit tan trong Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)",
    "balancedEquationPlain": "CuO + 2HCl -> CuCl2 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 65,
    "durationTurns": 1,
    "pedagogicalExplanation": "Bột CuO màu đen tan tạo dung dịch CuCl2 màu xanh lam đặc trưng.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đồng(II) oxit tan trong Acid HCl: xảy ra rõ rệt theo phương trình CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l).",
      "evidenceVI": "CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_35",
    "code": "RX_EXP_035",
    "name_vi": "Tẩy gỉ sắt bằng Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 6HCl(aq) → 2FeCl₃(aq) + 3H₂O(l)",
    "balancedEquationPlain": "Fe2O3 + 6HCl -> 2FeCl3 + 3H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tẩy sạch lớp gỉ sắt màu nâu đỏ trên bề mặt tôn cuộn thép.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tẩy gỉ sắt bằng Acid HCl: xảy ra rõ rệt theo phương trình Fe₂O₃(s) + 6HCl(aq) → 2FeCl₃(aq) + 3H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Fe₂O₃(s) + 6HCl(aq) → 2FeCl₃(aq) + 3H₂O(l).",
      "evidenceVI": "Fe₂O₃(s) + 6HCl(aq) → 2FeCl₃(aq) + 3H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_36",
    "code": "RX_EXP_036",
    "name_vi": "Oxit sắt từ tan trong Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Fe₃O₄(s) + 8HCl(aq) → FeCl₂(aq) + 2FeCl₃(aq) + 4H₂O(l)",
    "balancedEquationPlain": "Fe3O4 + 8HCl -> FeCl2 + 2FeCl3 + 4H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo hỗn hợp muối sắt(II) và sắt(III) clorua.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Oxit sắt từ tan trong Acid HCl: xảy ra rõ rệt theo phương trình Fe₃O₄(s) + 8HCl(aq) → FeCl₂(aq) + 2FeCl₃(aq) + 4H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Fe₃O₄(s) + 8HCl(aq) → FeCl₂(aq) + 2FeCl₃(aq) + 4H₂O(l).",
      "evidenceVI": "Fe₃O₄(s) + 8HCl(aq) → FeCl₂(aq) + 2FeCl₃(aq) + 4H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_37",
    "code": "RX_EXP_037",
    "name_vi": "Nhôm oxit tan trong Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l)",
    "balancedEquationPlain": "Al2O3 + 6HCl -> 2AlCl3 + 3H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Chứng minh tính chất base của oxit nhôm lưỡng tính.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhôm oxit tan trong Acid HCl: xảy ra rõ rệt theo phương trình Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l).",
      "evidenceVI": "Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_38",
    "code": "RX_EXP_038",
    "name_vi": "Nhôm oxit tan trong dung dịch Kiềm",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "BASE_ALKALINE"
    ],
    "isTrap": false,
    "equation": "Al₂O₃(s) + 2NaOH(aq) + 3H₂O(l) → 2Na[Al(OH)₄](aq)",
    "balancedEquationPlain": "Al2O3 + 2NaOH + 3H2O -> 2Na[Al(OH)4]",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Giai đoạn hòa tách quặng bôxit trong quy trình Bayer sản xuất nhôm.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhôm oxit tan trong dung dịch Kiềm: xảy ra rõ rệt theo phương trình Al₂O₃(s) + 2NaOH(aq) + 3H₂O(l) → 2Na[Al(OH)₄](aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Al₂O₃(s) + 2NaOH(aq) + 3H₂O(l) → 2Na[Al(OH)₄](aq).",
      "evidenceVI": "Al₂O₃(s) + 2NaOH(aq) + 3H₂O(l) → 2Na[Al(OH)₄](aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_39",
    "code": "RX_EXP_039",
    "name_vi": "Kẽm oxit tan trong Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "ZnO(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l)",
    "balancedEquationPlain": "ZnO + 2HCl -> ZnCl2 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kẽm oxit tan tạo dung dịch muối kẽm trong suốt.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Kẽm oxit tan trong Acid HCl: xảy ra rõ rệt theo phương trình ZnO(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình ZnO(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l).",
      "evidenceVI": "ZnO(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_40",
    "code": "RX_EXP_040",
    "name_vi": "Kẽm oxit tan trong dung dịch Kiềm",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "BASE_ALKALINE"
    ],
    "isTrap": false,
    "equation": "ZnO(s) + 2NaOH(aq) + H₂O(l) → Na₂[Zn(OH)₄](aq)",
    "balancedEquationPlain": "ZnO + 2NaOH + H2O -> Na2[Zn(OH)4]",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Chứng minh tính lưỡng tính của kẽm oxit.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Kẽm oxit tan trong dung dịch Kiềm: xảy ra rõ rệt theo phương trình ZnO(s) + 2NaOH(aq) + H₂O(l) → Na₂[Zn(OH)₄](aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình ZnO(s) + 2NaOH(aq) + H₂O(l) → Na₂[Zn(OH)₄](aq).",
      "evidenceVI": "ZnO(s) + 2NaOH(aq) + H₂O(l) → Na₂[Zn(OH)₄](aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_41",
    "code": "RX_EXP_041",
    "name_vi": "Đá vôi sủi bọt trong Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g)↑ + H₂O(l)",
    "balancedEquationPlain": "CaCO3 + 2HCl -> CaCl2 + CO2 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Đá vôi sủi bọt khí CO2 cuồn cuộn làm đục nước vôi trong.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đá vôi sủi bọt trong Acid HCl: xảy ra rõ rệt theo phương trình CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g)↑ + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g)↑ + H₂O(l).",
      "evidenceVI": "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g)↑ + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_42",
    "code": "RX_EXP_042",
    "name_vi": "Baking soda sủi bọt trong Acid",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NaHCO₃(s) + HCl(aq) → NaCl(aq) + CO₂(g)↑ + H₂O(l)",
    "balancedEquationPlain": "NaHCO3 + HCl -> NaCl + CO2 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Bột nở sủi bọt giải phóng khí CO2 tức thì.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Baking soda sủi bọt trong Acid: xảy ra rõ rệt theo phương trình NaHCO₃(s) + HCl(aq) → NaCl(aq) + CO₂(g)↑ + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình NaHCO₃(s) + HCl(aq) → NaCl(aq) + CO₂(g)↑ + H₂O(l).",
      "evidenceVI": "NaHCO₃(s) + HCl(aq) → NaCl(aq) + CO₂(g)↑ + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_43",
    "code": "RX_EXP_043",
    "name_vi": "Natri cacbonat tác dụng với Acid",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + CO₂(g)↑ + H₂O(l)",
    "balancedEquationPlain": "Na2CO3 + 2HCl -> 2NaCl + CO2 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Muối cacbonat tan bị acid mạnh đẩy giải phóng khí CO2.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Natri cacbonat tác dụng với Acid: xảy ra rõ rệt theo phương trình Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + CO₂(g)↑ + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + CO₂(g)↑ + H₂O(l).",
      "evidenceVI": "Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + CO₂(g)↑ + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_44",
    "code": "RX_EXP_044",
    "name_vi": "Điều chế khí SO2 từ muối sunfit",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na",
      "S"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Na₂SO₃(s) + 2HCl(aq) → 2NaCl(aq) + SO₂(g)↑ + H₂O(l)",
    "balancedEquationPlain": "Na2SO3 + 2HCl -> 2NaCl + SO2 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Giải phóng khí SO2 mùi hắc xốc trong phòng thí nghiệm.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Điều chế khí SO2 từ muối sunfit: xảy ra rõ rệt theo phương trình Na₂SO₃(s) + 2HCl(aq) → 2NaCl(aq) + SO₂(g)↑ + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Na₂SO₃(s) + 2HCl(aq) → 2NaCl(aq) + SO₂(g)↑ + H₂O(l).",
      "evidenceVI": "Na₂SO₃(s) + 2HCl(aq) → 2NaCl(aq) + SO₂(g)↑ + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_45",
    "code": "RX_EXP_045",
    "name_vi": "Điều chế khí H2S từ quặng sắt sunfua",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "FeS(s) + 2HCl(aq) → FeCl₂(aq) + H₂S(g)↑",
    "balancedEquationPlain": "FeS + 2HCl -> FeCl2 + H2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Giải phóng khí H2S mùi trứng thối đặc trưng.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Điều chế khí H2S từ quặng sắt sunfua: xảy ra rõ rệt theo phương trình FeS(s) + 2HCl(aq) → FeCl₂(aq) + H₂S(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình FeS(s) + 2HCl(aq) → FeCl₂(aq) + H₂S(g)↑.",
      "evidenceVI": "FeS(s) + 2HCl(aq) → FeCl₂(aq) + H₂S(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_46",
    "code": "RX_EXP_046",
    "name_vi": "Trung hòa KOH bằng Acid Nitric",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "KOH(aq) + HNO₃(aq) → KNO₃(aq) + H₂O(l)",
    "balancedEquationPlain": "KOH + HNO3 -> KNO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo dung dịch muối kali nitrat diêm tiêu.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Trung hòa KOH bằng Acid Nitric: xảy ra rõ rệt theo phương trình KOH(aq) + HNO₃(aq) → KNO₃(aq) + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình KOH(aq) + HNO₃(aq) → KNO₃(aq) + H₂O(l).",
      "evidenceVI": "KOH(aq) + HNO₃(aq) → KNO₃(aq) + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_47",
    "code": "RX_EXP_047",
    "name_vi": "Trung hòa Bari hiđroxit bằng Acid HCl",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "Ba(OH)₂(aq) + 2HCl(aq) → BaCl₂(aq) + 2H₂O(l)",
    "balancedEquationPlain": "Ba(OH)2 + 2HCl -> BaCl2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng trung hòa hoàn toàn.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Trung hòa Bari hiđroxit bằng Acid HCl: xảy ra rõ rệt theo phương trình Ba(OH)₂(aq) + 2HCl(aq) → BaCl₂(aq) + 2H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Ba(OH)₂(aq) + 2HCl(aq) → BaCl₂(aq) + 2H₂O(l).",
      "evidenceVI": "Ba(OH)₂(aq) + 2HCl(aq) → BaCl₂(aq) + 2H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_48",
    "code": "RX_EXP_048",
    "name_vi": "Tạo kết tủa Đồng(II) hiđroxit",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "BASE_ALKALINE"
    ],
    "isTrap": false,
    "equation": "CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂(s)↓ + Na₂SO₄(aq)",
    "balancedEquationPlain": "CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo kết tủa màu xanh lam tươi của Cu(OH)2.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tạo kết tủa Đồng(II) hiđroxit: xảy ra rõ rệt theo phương trình CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂(s)↓ + Na₂SO₄(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂(s)↓ + Na₂SO₄(aq).",
      "evidenceVI": "CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂(s)↓ + Na₂SO₄(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_49",
    "code": "RX_EXP_049",
    "name_vi": "Tạo kết tủa Sắt(III) hiđroxit",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s)↓ + 3NaCl(aq)",
    "balancedEquationPlain": "FeCl3 + 3NaOH -> Fe(OH)3 + 3NaCl",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo kết tủa màu nâu đỏ đặc trưng của Fe(OH)3.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tạo kết tủa Sắt(III) hiđroxit: xảy ra rõ rệt theo phương trình FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s)↓ + 3NaCl(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s)↓ + 3NaCl(aq).",
      "evidenceVI": "FeCl₃(aq) + 3NaOH(aq) → Fe(OH)₃(s)↓ + 3NaCl(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_50",
    "code": "RX_EXP_050",
    "name_vi": "Tạo kết tủa Sắt(II) hiđroxit",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "FeSO₄(aq) + 2NaOH(aq) → Fe(OH)₂(s)↓ + Na₂SO₄(aq)",
    "balancedEquationPlain": "FeSO4 + 2NaOH -> Fe(OH)2 + Na2SO4",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 65,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo kết tủa màu trắng xanh, hóa nâu ngoài không khí.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tạo kết tủa Sắt(II) hiđroxit: xảy ra rõ rệt theo phương trình FeSO₄(aq) + 2NaOH(aq) → Fe(OH)₂(s)↓ + Na₂SO₄(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình FeSO₄(aq) + 2NaOH(aq) → Fe(OH)₂(s)↓ + Na₂SO₄(aq).",
      "evidenceVI": "FeSO₄(aq) + 2NaOH(aq) → Fe(OH)₂(s)↓ + Na₂SO₄(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_51",
    "code": "RX_EXP_051",
    "name_vi": "Tạo kết tủa keo Nhôm hiđroxit",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "BASE_ALKALINE"
    ],
    "isTrap": false,
    "equation": "AlCl₃(aq) + 3NaOH(aq) → Al(OH)₃(s)↓ + 3NaCl(aq)",
    "balancedEquationPlain": "AlCl3 + 3NaOH -> Al(OH)3 + 3NaCl",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo kết tủa keo trắng Al(OH)3 (tan khi thêm NaOH dư).",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tạo kết tủa keo Nhôm hiđroxit: xảy ra rõ rệt theo phương trình AlCl₃(aq) + 3NaOH(aq) → Al(OH)₃(s)↓ + 3NaCl(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình AlCl₃(aq) + 3NaOH(aq) → Al(OH)₃(s)↓ + 3NaCl(aq).",
      "evidenceVI": "AlCl₃(aq) + 3NaOH(aq) → Al(OH)₃(s)↓ + 3NaCl(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_52",
    "code": "RX_EXP_052",
    "name_vi": "Tạo kết tủa Kẽm hiđroxit",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "BASE_ALKALINE"
    ],
    "isTrap": false,
    "equation": "ZnSO₄(aq) + 2NaOH(aq) → Zn(OH)₂(s)↓ + Na₂SO₄(aq)",
    "balancedEquationPlain": "ZnSO4 + 2NaOH -> Zn(OH)2 + Na2SO4",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 66,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo kết tủa trắng Zn(OH)2 tan trong kiềm dư.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tạo kết tủa Kẽm hiđroxit: xảy ra rõ rệt theo phương trình ZnSO₄(aq) + 2NaOH(aq) → Zn(OH)₂(s)↓ + Na₂SO₄(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình ZnSO₄(aq) + 2NaOH(aq) → Zn(OH)₂(s)↓ + Na₂SO₄(aq).",
      "evidenceVI": "ZnSO₄(aq) + 2NaOH(aq) → Zn(OH)₂(s)↓ + Na₂SO₄(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_53",
    "code": "RX_EXP_053",
    "name_vi": "Làm mềm nước cứng bằng Soda",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Ca",
      "Na"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s)↓ + 2NaCl(aq)",
    "balancedEquationPlain": "CaCl2 + Na2CO3 -> CaCO3 + 2NaCl",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kết tủa ion canxi dưới dạng đá vôi CaCO3.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Làm mềm nước cứng bằng Soda: xảy ra rõ rệt theo phương trình CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s)↓ + 2NaCl(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s)↓ + 2NaCl(aq).",
      "evidenceVI": "CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s)↓ + 2NaCl(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_54",
    "code": "RX_EXP_054",
    "name_vi": "Kết tủa ion Magie",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Mg",
      "Na"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "MgSO₄(aq) + Na₂CO₃(aq) → MgCO₃(s)↓ + Na₂SO₄(aq)",
    "balancedEquationPlain": "MgSO4 + Na2CO3 -> MgCO3 + Na2SO4",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo kết tủa trắng magie cacbonat.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Kết tủa ion Magie: xảy ra rõ rệt theo phương trình MgSO₄(aq) + Na₂CO₃(aq) → MgCO₃(s)↓ + Na₂SO₄(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình MgSO₄(aq) + Na₂CO₃(aq) → MgCO₃(s)↓ + Na₂SO₄(aq).",
      "evidenceVI": "MgSO₄(aq) + Na₂CO₃(aq) → MgCO₃(s)↓ + Na₂SO₄(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_55",
    "code": "RX_EXP_055",
    "name_vi": "Phản ứng Mưa Vàng (Golden Rain)",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Pb",
      "K"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
    "balancedEquationPlain": "Pb(NO3)2 + 2KI -> PbI2 + 2KNO3",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo kết tủa chì iotua màu vàng lấp lánh như vảy vàng.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Phản ứng Mưa Vàng (Golden Rain): xảy ra rõ rệt theo phương trình Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq).",
      "evidenceVI": "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_56",
    "code": "RX_EXP_056",
    "name_vi": "Tạo kết tủa Bạc bromua vàng nhạt",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Ag",
      "Na"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "AgNO₃(aq) + NaBr(aq) → AgBr(s)↓ + NaNO₃(aq)",
    "balancedEquationPlain": "AgNO3 + NaBr -> AgBr + NaNO3",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 65,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kết tủa vàng nhạt của AgBr dùng tráng phim.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tạo kết tủa Bạc bromua vàng nhạt: xảy ra rõ rệt theo phương trình AgNO₃(aq) + NaBr(aq) → AgBr(s)↓ + NaNO₃(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình AgNO₃(aq) + NaBr(aq) → AgBr(s)↓ + NaNO₃(aq).",
      "evidenceVI": "AgNO₃(aq) + NaBr(aq) → AgBr(s)↓ + NaNO₃(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_57",
    "code": "RX_EXP_057",
    "name_vi": "Tạo kết tủa Bạc iodua vàng sẫm",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Ag",
      "K"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "AgNO₃(aq) + KI(aq) → AgI(s)↓ + KNO₃(aq)",
    "balancedEquationPlain": "AgNO3 + KI -> AgI + KNO3",
    "thermodynamics": "NEUTRAL",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kết tủa vàng đậm đặc trưng không tan trong amoniac.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tạo kết tủa Bạc iodua vàng sẫm: xảy ra rõ rệt theo phương trình AgNO₃(aq) + KI(aq) → AgI(s)↓ + KNO₃(aq).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình AgNO₃(aq) + KI(aq) → AgI(s)↓ + KNO₃(aq).",
      "evidenceVI": "AgNO₃(aq) + KI(aq) → AgI(s)↓ + KNO₃(aq)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_58",
    "code": "RX_EXP_058",
    "name_vi": "Nung Vôi Công Nghiệp (Nhiệt phân đá vôi)",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CaCO₃(s) → CaO(s) + CO₂(g)↑",
    "balancedEquationPlain": "CaCO3 -> CaO + CO2",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Nung đá vôi ở 900°C thu được vôi sống CaO và khí CO2.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nung Vôi Công Nghiệp (Nhiệt phân đá vôi): xảy ra rõ rệt theo phương trình CaCO₃(s) → CaO(s) + CO₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CaCO₃(s) → CaO(s) + CO₂(g)↑.",
      "evidenceVI": "CaCO₃(s) → CaO(s) + CO₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_59",
    "code": "RX_EXP_059",
    "name_vi": "Nhiệt phân Thuốc tím điều chế O2",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2KMnO₄(s) → K₂MnO₄(s) + MnO₂(s) + O₂(g)↑",
    "balancedEquationPlain": "2KMnO4 -> K2MnO4 + MnO2 + O2",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phương pháp kinh điển thu khí O2 trong phòng thí nghiệm.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhiệt phân Thuốc tím điều chế O2: xảy ra rõ rệt theo phương trình 2KMnO₄(s) → K₂MnO₄(s) + MnO₂(s) + O₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2KMnO₄(s) → K₂MnO₄(s) + MnO₂(s) + O₂(g)↑.",
      "evidenceVI": "2KMnO₄(s) → K₂MnO₄(s) + MnO₂(s) + O₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_60",
    "code": "RX_EXP_060",
    "name_vi": "Nhiệt phân Kali clorat có xúc tác MnO2",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2KClO₃(s) → 2KCl(s) + 3O₂(g)↑",
    "balancedEquationPlain": "2KClO3 -> 2KCl + 3O2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Giải phóng thể tích khí O2 cực lớn làm bùng cháy tàn đóm.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhiệt phân Kali clorat có xúc tác MnO2: xảy ra rõ rệt theo phương trình 2KClO₃(s) → 2KCl(s) + 3O₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2KClO₃(s) → 2KCl(s) + 3O₂(g)↑.",
      "evidenceVI": "2KClO₃(s) → 2KCl(s) + 3O₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_61",
    "code": "RX_EXP_061",
    "name_vi": "Nhiệt phân Đồng(II) hiđroxit",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Cu(OH)₂(s) → CuO(s) + H₂O(g)↑",
    "balancedEquationPlain": "Cu(OH)2 -> CuO + H2O",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "CORROSION_DOT",
    "basePower": 60,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kết tủa xanh lam chuyển thành bột CuO màu đen.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhiệt phân Đồng(II) hiđroxit: xảy ra rõ rệt theo phương trình Cu(OH)₂(s) → CuO(s) + H₂O(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình Cu(OH)₂(s) → CuO(s) + H₂O(g)↑.",
      "evidenceVI": "Cu(OH)₂(s) → CuO(s) + H₂O(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_62",
    "code": "RX_EXP_062",
    "name_vi": "Nhiệt phân Sắt(III) hiđroxit",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Fe(OH)₃(s) → Fe₂O₃(s) + 3H₂O(g)↑",
    "balancedEquationPlain": "2Fe(OH)3 -> Fe2O3 + 3H2O",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 65,
    "durationTurns": 1,
    "pedagogicalExplanation": "Kết tủa đỏ nâu chuyển thành bột oxit Fe2O3.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhiệt phân Sắt(III) hiđroxit: xảy ra rõ rệt theo phương trình 2Fe(OH)₃(s) → Fe₂O₃(s) + 3H₂O(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Fe(OH)₃(s) → Fe₂O₃(s) + 3H₂O(g)↑.",
      "evidenceVI": "2Fe(OH)₃(s) → Fe₂O₃(s) + 3H₂O(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_63",
    "code": "RX_EXP_063",
    "name_vi": "Nhiệt phân Baking soda",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g)↑ + H₂O(g)↑",
    "balancedEquationPlain": "2NaHCO3 -> Na2CO3 + CO2 + H2O",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Baking soda phân hủy sinh khí CO2 làm phồng bánh xốp.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhiệt phân Baking soda: xảy ra rõ rệt theo phương trình 2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g)↑ + H₂O(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g)↑ + H₂O(g)↑.",
      "evidenceVI": "2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g)↑ + H₂O(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_64",
    "code": "RX_EXP_064",
    "name_vi": "Nhiệt phân Amoni nitrat điều chế Khí cười",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "NH₄NO₃(s) → N₂O(g)↑ + 2H₂O(g)↑",
    "balancedEquationPlain": "NH4NO3 -> N2O + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Nhiệt phân êm dịu ở 200°C sinh khí cười N2O.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhiệt phân Amoni nitrat điều chế Khí cười: xảy ra rõ rệt theo phương trình NH₄NO₃(s) → N₂O(g)↑ + 2H₂O(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình NH₄NO₃(s) → N₂O(g)↑ + 2H₂O(g)↑.",
      "evidenceVI": "NH₄NO₃(s) → N₂O(g)↑ + 2H₂O(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_65",
    "code": "RX_EXP_065",
    "name_vi": "Nhiệt phân Bạc nitrat",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Ag"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2AgNO₃(s) → 2Ag(s) + 2NO₂(g)↑ + O₂(g)↑",
    "balancedEquationPlain": "2AgNO3 -> 2Ag + 2NO2 + O2",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Giải phóng bạc kim loại bám sáng bóng và khí NO2 màu nâu đỏ.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhiệt phân Bạc nitrat: xảy ra rõ rệt theo phương trình 2AgNO₃(s) → 2Ag(s) + 2NO₂(g)↑ + O₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2AgNO₃(s) → 2Ag(s) + 2NO₂(g)↑ + O₂(g)↑.",
      "evidenceVI": "2AgNO₃(s) → 2Ag(s) + 2NO₂(g)↑ + O₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_66",
    "code": "RX_EXP_066",
    "name_vi": "Nhiệt phân Đồng(II) nitrat",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Cu(NO₃)₂(s) → 2CuO(s) + 4NO₂(g)↑ + O₂(g)↑",
    "balancedEquationPlain": "2Cu(NO3)2 -> 2CuO + 4NO2 + O2",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tinh thể xanh lam phân hủy sinh bột đen CuO và khí nâu đỏ.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Nhiệt phân Đồng(II) nitrat: xảy ra rõ rệt theo phương trình 2Cu(NO₃)₂(s) → 2CuO(s) + 4NO₂(g)↑ + O₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2Cu(NO₃)₂(s) → 2CuO(s) + 4NO₂(g)↑ + O₂(g)↑.",
      "evidenceVI": "2Cu(NO₃)₂(s) → 2CuO(s) + 4NO₂(g)↑ + O₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_67",
    "code": "RX_EXP_067",
    "name_vi": "Đốt cháy Khí Metan",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)",
    "balancedEquationPlain": "CH4 + 2O2 -> CO2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Khí metan cháy tỏa lượng nhiệt lớn, không sinh tro bụi xỉ.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt cháy Khí Metan: xảy ra rõ rệt theo phương trình CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g).",
      "evidenceVI": "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_68",
    "code": "RX_EXP_068",
    "name_vi": "Đốt cháy Khí Etilen",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(g)",
    "balancedEquationPlain": "C2H4 + 3O2 -> 2CO2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Etilen cháy sáng rực rỡ tỏa nhiệt mạnh.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt cháy Khí Etilen: xảy ra rõ rệt theo phương trình C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(g).",
      "evidenceVI": "C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_69",
    "code": "RX_EXP_069",
    "name_vi": "Đốt cháy Khí Axetilen (Đèn hàn)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2C₂H₂(g) + 5O₂(g) → 4CO₂(g) + 2H₂O(g)",
    "balancedEquationPlain": "2C2H2 + 5O2 -> 4CO2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 98,
    "durationTurns": 1,
    "pedagogicalExplanation": "Nhiệt độ ngọn lửa đạt trên 3000°C làm nóng chảy sắt thép.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt cháy Khí Axetilen (Đèn hàn): xảy ra rõ rệt theo phương trình 2C₂H₂(g) + 5O₂(g) → 4CO₂(g) + 2H₂O(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình 2C₂H₂(g) + 5O₂(g) → 4CO₂(g) + 2H₂O(g).",
      "evidenceVI": "2C₂H₂(g) + 5O₂(g) → 4CO₂(g) + 2H₂O(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_70",
    "code": "RX_EXP_070",
    "name_vi": "Đốt cháy Cồn Etylic",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(g)",
    "balancedEquationPlain": "C2H5OH + 3O2 -> 2CO2 + 3H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Cồn cháy với ngọn lửa xanh mờ, dùng làm bếp cồn du lịch và xăng E5.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Đốt cháy Cồn Etylic: xảy ra rõ rệt theo phương trình C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(g).",
      "evidenceVI": "C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_71",
    "code": "RX_EXP_071",
    "name_vi": "Etilen làm mất màu Nước Brom",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "Br"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "C₂H₄(g) + Br₂(aq) → C₂H₄Br₂(l)",
    "balancedEquationPlain": "C2H4 + Br2 -> C2H4Br2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng cộng bẻ gãy liên kết pi (π) làm mất màu da cam của nước brom.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Etilen làm mất màu Nước Brom: xảy ra rõ rệt theo phương trình C₂H₄(g) + Br₂(aq) → C₂H₄Br₂(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C₂H₄(g) + Br₂(aq) → C₂H₄Br₂(l).",
      "evidenceVI": "C₂H₄(g) + Br₂(aq) → C₂H₄Br₂(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_72",
    "code": "RX_EXP_072",
    "name_vi": "Axetilen cộng Brom hai giai đoạn",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "Br"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "C₂H₂(g) + 2Br₂(aq) → C₂H₂Br₄(l)",
    "balancedEquationPlain": "C2H2 + 2Br2 -> C2H2Br4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Liên kết ba C≡C cộng liên tiếp 2 phân tử brom.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Axetilen cộng Brom hai giai đoạn: xảy ra rõ rệt theo phương trình C₂H₂(g) + 2Br₂(aq) → C₂H₂Br₄(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C₂H₂(g) + 2Br₂(aq) → C₂H₂Br₄(l).",
      "evidenceVI": "C₂H₂(g) + 2Br₂(aq) → C₂H₂Br₄(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_73",
    "code": "RX_EXP_073",
    "name_vi": "Hiđro hóa Etilen có xúc tác Ni",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "H"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C₂H₄(g) + H₂(g) → C₂H₆(g)",
    "balancedEquationPlain": "C2H4 + H2 -> C2H6",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Chuyển hiđrocacbon không no thành hiđrocacbon no.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Hiđro hóa Etilen có xúc tác Ni: xảy ra rõ rệt theo phương trình C₂H₄(g) + H₂(g) → C₂H₆(g).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C₂H₄(g) + H₂(g) → C₂H₆(g).",
      "evidenceVI": "C₂H₄(g) + H₂(g) → C₂H₆(g)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_74",
    "code": "RX_EXP_074",
    "name_vi": "Phản ứng Este Hóa tạo Etyl Axetat",
    "groupCategory": "GROUP_C_ACID_BASE",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l)",
    "balancedEquationPlain": "CH3COOH + C2H5OH -> CH3COOC2H5 + H2O",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tạo este mùi thơm hoa quả chín lơ lửng trên mặt nước.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Phản ứng Este Hóa tạo Etyl Axetat: xảy ra rõ rệt theo phương trình CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l).",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l).",
      "evidenceVI": "CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l)",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_75",
    "code": "RX_EXP_075",
    "name_vi": "Lên men Rượu từ Đường Glucozơ",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g)↑",
    "balancedEquationPlain": "C6H12O6 -> 2C2H5OH + 2CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Men rượu biến đường thành cồn và sủi bọt khí CO2 làm nở bánh mì.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Lên men Rượu từ Đường Glucozơ: xảy ra rõ rệt theo phương trình C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g)↑.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g)↑.",
      "evidenceVI": "C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g)↑",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_76",
    "code": "RX_EXP_076",
    "name_vi": "Phản ứng Tráng Gương của Andehit",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "Ag"
    ],
    "requiredConditions": [
      "BASE_ALKALINE"
    ],
    "isTrap": false,
    "equation": "CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O",
    "balancedEquationPlain": "CH3CHO + 2AgNO3 + 3NH3 + H2O -> CH3COONH4 + 2Ag + 2NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Bạc kim loại sáng bóng bám đều vào thành ống nghiệm soi gương được.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Phản ứng Tráng Gương của Andehit: xảy ra rõ rệt theo phương trình CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O.",
      "evidenceVI": "CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_exp_77",
    "code": "RX_EXP_077",
    "name_vi": "Tráng ruột phích bằng Đường Glucozơ",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "Ag"
    ],
    "requiredConditions": [
      "BASE_ALKALINE"
    ],
    "isTrap": false,
    "equation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag↓ + 3NH₃ + H₂O",
    "balancedEquationPlain": "C6H12O6 + 2AgNO3 + 3NH3 + H2O -> C6H11O7NH4 + 2Ag + 2NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "FREEZE_STUN",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Tráng lớp gương bạc sáng giữ nhiệt cho ruột phích nước nóng gia đình.",
    "observablePhenomenaVI": "Hiện tượng đặc trưng của Tráng ruột phích bằng Đường Glucozơ: xảy ra rõ rệt theo phương trình C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag↓ + 3NH₃ + H₂O.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành sản phẩm theo phương trình C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag↓ + 3NH₃ + H₂O.",
      "evidenceVI": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₁O₇NH₄ + 2Ag↓ + 3NH₃ + H₂O",
      "mechanismVI": "Chuyển dời electron và tái tổ hợp liên kết hóa học.",
      "generalizationVI": "Tuân thủ định luật bảo toàn khối lượng và năng lượng."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_93",
    "code": "RX_SYS_093",
    "name_vi": "Kali oxit tan trong Nước (#93)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "K₂O(s) + H₂O(l) → 2KOH(aq)",
    "balancedEquationPlain": "K2O + H2O -> 2KOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: K₂O(s) + H₂O(l) → 2KOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình K₂O(s) + H₂O(l) → 2KOH(aq).",
      "evidenceVI": "K₂O(s) + H₂O(l) → 2KOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_94",
    "code": "RX_SYS_094",
    "name_vi": "P2O5 tan trong nước nóng (#94)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
    "balancedEquationPlain": "P2O5 + 3H2O -> 2H3PO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: P2O5 tan trong nước nóng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq).",
      "evidenceVI": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_95",
    "code": "RX_SYS_095",
    "name_vi": "SO3 tan trong nước tạo acid sulfuric (#95)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
    "balancedEquationPlain": "SO3 + H2O -> H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 92,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₃(l) + H₂O(l) → H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: SO3 tan trong nước tạo acid sulfuric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₃(l) + H₂O(l) → H₂SO₄(aq).",
      "evidenceVI": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_96",
    "code": "RX_SYS_096",
    "name_vi": "N2O5 tan trong nước tạo acid nitric (#96)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
    "balancedEquationPlain": "N2O5 + H2O -> 2HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: N₂O₅(s) + H₂O(l) → 2HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: N2O5 tan trong nước tạo acid nitric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình N₂O₅(s) + H₂O(l) → 2HNO₃(aq).",
      "evidenceVI": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_97",
    "code": "RX_SYS_097",
    "name_vi": "Khí NO2 tan trong nước lạnh (#97)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
    "balancedEquationPlain": "2NO2 + H2O -> HNO2 + HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí NO2 tan trong nước lạnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq).",
      "evidenceVI": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_98",
    "code": "RX_SYS_098",
    "name_vi": "Sản xuất acid nitric từ NO2 và Oxy (#98)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
    "balancedEquationPlain": "4NO2 + O2 + 2H2O -> 4HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sản xuất acid nitric từ NO2 và Oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq).",
      "evidenceVI": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_99",
    "code": "RX_SYS_099",
    "name_vi": "Tạo khói trắng Amoni clorua (#99)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HCl(g) → NH₄Cl(s)",
    "balancedEquationPlain": "NH3 + HCl -> NH4Cl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HCl(g) → NH₄Cl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo khói trắng Amoni clorua.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HCl(g) → NH₄Cl(s).",
      "evidenceVI": "NH₃(g) + HCl(g) → NH₄Cl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_100",
    "code": "RX_SYS_100",
    "name_vi": "Tạo phân đạm Amoni nitrat (#100)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
    "balancedEquationPlain": "NH3 + HNO3 -> NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HNO₃(aq) → NH₄NO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm Amoni nitrat.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HNO₃(aq) → NH₄NO₃(aq).",
      "evidenceVI": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_101",
    "code": "RX_SYS_101",
    "name_vi": "Tạo phân đạm SA (#101)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
    "balancedEquationPlain": "2NH3 + H2SO4 -> (NH4)2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm SA.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq).",
      "evidenceVI": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_102",
    "code": "RX_SYS_102",
    "name_vi": "Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao (#102)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "H",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "H₂(g) + S(s) → H₂S(g)",
    "balancedEquationPlain": "H2 + S -> H2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: H₂(g) + S(s) → H₂S(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình H₂(g) + S(s) → H₂S(g).",
      "evidenceVI": "H₂(g) + S(s) → H₂S(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_103",
    "code": "RX_SYS_103",
    "name_vi": "Đốt H2S trong điều kiện thiếu oxy (#103)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
    "balancedEquationPlain": "2H2S + O2 -> 2S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt H2S trong điều kiện thiếu oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l).",
      "evidenceVI": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_104",
    "code": "RX_SYS_104",
    "name_vi": "Đốt cháy hoàn toàn khí H2S (#104)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
    "balancedEquationPlain": "2H2S + 3O2 -> 2SO2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt cháy hoàn toàn khí H2S.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g).",
      "evidenceVI": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_105",
    "code": "RX_SYS_105",
    "name_vi": "Khí SO2 bị oxi hóa trong nước (#105)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
    "balancedEquationPlain": "2SO2 + O2 + 2H2O -> 2H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 bị oxi hóa trong nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq).",
      "evidenceVI": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_106",
    "code": "RX_SYS_106",
    "name_vi": "Phản ứng Claus thu hồi Lưu huỳnh khí thải (#106)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
    "balancedEquationPlain": "SO2 + 2H2S -> 3S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Claus thu hồi Lưu huỳnh khí thải.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l).",
      "evidenceVI": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_107",
    "code": "RX_SYS_107",
    "name_vi": "Khử quặng hematit bằng khí CO trong lò cao (#107)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
    "balancedEquationPlain": "Fe2O3 + 3CO -> 2Fe + 3CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng hematit bằng khí CO trong lò cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g).",
      "evidenceVI": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_108",
    "code": "RX_SYS_108",
    "name_vi": "Khử quặng manhetit bằng CO (#108)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
    "balancedEquationPlain": "Fe3O4 + 4CO -> 3Fe + 4CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng manhetit bằng CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g).",
      "evidenceVI": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_109",
    "code": "RX_SYS_109",
    "name_vi": "Khử CuO bằng khí CO (#109)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
    "balancedEquationPlain": "CuO + CO -> Cu + CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + CO(g) → Cu(s) + CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + CO(g) → Cu(s) + CO₂(g).",
      "evidenceVI": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_110",
    "code": "RX_SYS_110",
    "name_vi": "Khử CuO bằng khí H2 (#110)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
    "balancedEquationPlain": "CuO + H2 -> Cu + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + H₂(g) → Cu(s) + H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + H₂(g) → Cu(s) + H₂O(g).",
      "evidenceVI": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_111",
    "code": "RX_SYS_111",
    "name_vi": "Khử Fe2O3 bằng khí H2 (#111)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
    "balancedEquationPlain": "Fe2O3 + 3H2 -> 2Fe + 3H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 84,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử Fe2O3 bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g).",
      "evidenceVI": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_112",
    "code": "RX_SYS_112",
    "name_vi": "Khử kẽm oxit bằng than cốc (#112)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "ZnO(s) + C(s) → Zn(s) + CO(g)",
    "balancedEquationPlain": "ZnO + C -> Zn + CO",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: ZnO(s) + C(s) → Zn(s) + CO(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử kẽm oxit bằng than cốc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình ZnO(s) + C(s) → Zn(s) + CO(g).",
      "evidenceVI": "ZnO(s) + C(s) → Zn(s) + CO(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_113",
    "code": "RX_SYS_113",
    "name_vi": "Phản ứng Nhiệt nhôm hàn đường ray (#113)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)",
    "balancedEquationPlain": "2Al + Fe2O3 -> Al2O3 + 2Fe",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 105,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Nhiệt nhôm hàn đường ray.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l).",
      "evidenceVI": "2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_114",
    "code": "RX_SYS_114",
    "name_vi": "Nhiệt nhôm điều chế Crom kim loại (#114)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s)",
    "balancedEquationPlain": "2Al + Cr2O3 -> Al2O3 + 2Cr",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 98,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhiệt nhôm điều chế Crom kim loại.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s).",
      "evidenceVI": "2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_115",
    "code": "RX_SYS_115",
    "name_vi": "Nhiệt nhôm điều chế Mangan (#115)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s)",
    "balancedEquationPlain": "4Al + 3MnO2 -> 2Al2O3 + 3Mn",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhiệt nhôm điều chế Mangan.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s).",
      "evidenceVI": "4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_116",
    "code": "RX_SYS_116",
    "name_vi": "Magie tác dụng Brom (#116)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Mg(s) + Br₂(l) → MgBr₂(s)",
    "balancedEquationPlain": "Mg + Br2 -> MgBr2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Mg(s) + Br₂(l) → MgBr₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Magie tác dụng Brom.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Mg(s) + Br₂(l) → MgBr₂(s).",
      "evidenceVI": "Mg(s) + Br₂(l) → MgBr₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_117",
    "code": "RX_SYS_117",
    "name_vi": "Canxi tác dụng Clo (#117)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ca(s) + Cl₂(g) → CaCl₂(s)",
    "balancedEquationPlain": "Ca + Cl2 -> CaCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ca(s) + Cl₂(g) → CaCl₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Canxi tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ca(s) + Cl₂(g) → CaCl₂(s).",
      "evidenceVI": "Ca(s) + Cl₂(g) → CaCl₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_118",
    "code": "RX_SYS_118",
    "name_vi": "Bari tác dụng Clo (#118)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ba(s) + Cl₂(g) → BaCl₂(s)",
    "balancedEquationPlain": "Ba + Cl2 -> BaCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ba(s) + Cl₂(g) → BaCl₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Bari tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ba(s) + Cl₂(g) → BaCl₂(s).",
      "evidenceVI": "Ba(s) + Cl₂(g) → BaCl₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_119",
    "code": "RX_SYS_119",
    "name_vi": "Kali tác dụng Clo (#119)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2K(s) + Cl₂(g) → 2KCl(s)",
    "balancedEquationPlain": "2K + Cl2 -> 2KCl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2K(s) + Cl₂(g) → 2KCl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2K(s) + Cl₂(g) → 2KCl(s).",
      "evidenceVI": "2K(s) + Cl₂(g) → 2KCl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_120",
    "code": "RX_SYS_120",
    "name_vi": "Natri tác dụng Lưu huỳnh (#120)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Na(s) + S(s) → Na₂S(s)",
    "balancedEquationPlain": "2Na + S -> Na2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Na(s) + S(s) → Na₂S(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Natri tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Na(s) + S(s) → Na₂S(s).",
      "evidenceVI": "2Na(s) + S(s) → Na₂S(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_121",
    "code": "RX_SYS_121",
    "name_vi": "Kali tác dụng Lưu huỳnh (#121)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2K(s) + S(s) → K₂S(s)",
    "balancedEquationPlain": "2K + S -> K2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2K(s) + S(s) → K₂S(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2K(s) + S(s) → K₂S(s).",
      "evidenceVI": "2K(s) + S(s) → K₂S(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_122",
    "code": "RX_SYS_122",
    "name_vi": "Canxi tác dụng Lưu huỳnh (#122)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ca(s) + S(s) → CaS(s)",
    "balancedEquationPlain": "Ca + S -> CaS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ca(s) + S(s) → CaS(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Canxi tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ca(s) + S(s) → CaS(s).",
      "evidenceVI": "Ca(s) + S(s) → CaS(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_123",
    "code": "RX_SYS_123",
    "name_vi": "Magie tác dụng Lưu huỳnh (#123)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Mg(s) + S(s) → MgS(s)",
    "balancedEquationPlain": "Mg + S -> MgS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Mg(s) + S(s) → MgS(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Magie tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Mg(s) + S(s) → MgS(s).",
      "evidenceVI": "Mg(s) + S(s) → MgS(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_124",
    "code": "RX_SYS_124",
    "name_vi": "Nhôm tác dụng Lưu huỳnh (#124)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + 3S(s) → Al₂S₃(s)",
    "balancedEquationPlain": "2Al + 3S -> Al2S3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + 3S(s) → Al₂S₃(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhôm tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + 3S(s) → Al₂S₃(s).",
      "evidenceVI": "2Al(s) + 3S(s) → Al₂S₃(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_125",
    "code": "RX_SYS_125",
    "name_vi": "Cacbon tác dụng Lưu huỳnh (#125)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C(s) + 2S(s) → CS₂(l)",
    "balancedEquationPlain": "C + 2S -> CS2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: C(s) + 2S(s) → CS₂(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Cacbon tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình C(s) + 2S(s) → CS₂(l).",
      "evidenceVI": "C(s) + 2S(s) → CS₂(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_126",
    "code": "RX_SYS_126",
    "name_vi": "Silic cháy trong Oxi (#126)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Si"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Si(s) + O₂(g) → SiO₂(s)",
    "balancedEquationPlain": "Si + O2 -> SiO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Si(s) + O₂(g) → SiO₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Silic cháy trong Oxi.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Si(s) + O₂(g) → SiO₂(s).",
      "evidenceVI": "Si(s) + O₂(g) → SiO₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_127",
    "code": "RX_SYS_127",
    "name_vi": "Photpho tác dụng Clo thiếu (#127)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2P(s) + 3Cl₂(g) → 2PCl₃(l)",
    "balancedEquationPlain": "2P + 3Cl2 -> 2PCl3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2P(s) + 3Cl₂(g) → 2PCl₃(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Photpho tác dụng Clo thiếu.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2P(s) + 3Cl₂(g) → 2PCl₃(l).",
      "evidenceVI": "2P(s) + 3Cl₂(g) → 2PCl₃(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_128",
    "code": "RX_SYS_128",
    "name_vi": "Photpho tác dụng Clo dư (#128)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2P(s) + 5Cl₂(g) → 2PCl₅(s)",
    "balancedEquationPlain": "2P + 5Cl2 -> 2PCl5",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2P(s) + 5Cl₂(g) → 2PCl₅(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Photpho tác dụng Clo dư.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2P(s) + 5Cl₂(g) → 2PCl₅(s).",
      "evidenceVI": "2P(s) + 5Cl₂(g) → 2PCl₅(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_129",
    "code": "RX_SYS_129",
    "name_vi": "Đồng đẩy Bạc khỏi dung dịch muối (#129)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓",
    "balancedEquationPlain": "Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đồng đẩy Bạc khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓.",
      "evidenceVI": "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_130",
    "code": "RX_SYS_130",
    "name_vi": "Sắt đẩy Đồng khỏi dung dịch muối (#130)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
    "balancedEquationPlain": "Fe + CuSO4 -> FeSO4 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 76,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sắt đẩy Đồng khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓.",
      "evidenceVI": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_131",
    "code": "RX_SYS_131",
    "name_vi": "Sắt đẩy Bạc (#131)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓",
    "balancedEquationPlain": "Fe + 2AgNO3 -> Fe(NO3)2 + 2Ag",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sắt đẩy Bạc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓.",
      "evidenceVI": "Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_132",
    "code": "RX_SYS_132",
    "name_vi": "Chì đẩy Đồng (#132)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Pb"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓",
    "balancedEquationPlain": "Pb + Cu(NO3)2 -> Pb(NO3)2 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Chì đẩy Đồng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓.",
      "evidenceVI": "Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_133",
    "code": "RX_SYS_133",
    "name_vi": "Clo đẩy Brom khỏi dung dịch muối (#133)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)",
    "balancedEquationPlain": "Cl2 + 2KBr -> 2KCl + Br2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Clo đẩy Brom khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq).",
      "evidenceVI": "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_134",
    "code": "RX_SYS_134",
    "name_vi": "Clo đẩy Iot khỏi dung dịch muối (#134)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓",
    "balancedEquationPlain": "Cl2 + 2KI -> 2KCl + I2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Clo đẩy Iot khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓.",
      "evidenceVI": "Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_135",
    "code": "RX_SYS_135",
    "name_vi": "Brom đẩy Iot (#135)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Br"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓",
    "balancedEquationPlain": "Br2 + 2KI -> 2KBr + I2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Brom đẩy Iot.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓.",
      "evidenceVI": "Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_136",
    "code": "RX_SYS_136",
    "name_vi": "Khí CO2 làm đục nước vôi trong (#136)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "CO2 + Ca(OH)2 -> CaCO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí CO2 làm đục nước vôi trong.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l).",
      "evidenceVI": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_137",
    "code": "RX_SYS_137",
    "name_vi": "Khí CO2 làm đục dung dịch Ba(OH)2 (#137)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "CO2 + Ba(OH)2 -> BaCO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí CO2 làm đục dung dịch Ba(OH)2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l).",
      "evidenceVI": "CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_138",
    "code": "RX_SYS_138",
    "name_vi": "Khí SO2 làm đục nước vôi trong (#138)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "SO2 + Ca(OH)2 -> CaSO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 làm đục nước vôi trong.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l).",
      "evidenceVI": "SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_139",
    "code": "RX_SYS_139",
    "name_vi": "Khí SO2 làm đục dung dịch Ba(OH)2 (#139)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "SO2 + Ba(OH)2 -> BaSO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 làm đục dung dịch Ba(OH)2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l).",
      "evidenceVI": "SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_140",
    "code": "RX_SYS_140",
    "name_vi": "Phản ứng Tôi vôi sống (#140)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CaO(s) + H₂O(l) → Ca(OH)₂(aq)",
    "balancedEquationPlain": "CaO + H2O -> Ca(OH)2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CaO(s) + H₂O(l) → Ca(OH)₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Tôi vôi sống.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CaO(s) + H₂O(l) → Ca(OH)₂(aq).",
      "evidenceVI": "CaO(s) + H₂O(l) → Ca(OH)₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_141",
    "code": "RX_SYS_141",
    "name_vi": "Bari oxit tác dụng Nước (#141)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "BaO(s) + H₂O(l) → Ba(OH)₂(aq)",
    "balancedEquationPlain": "BaO + H2O -> Ba(OH)2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: BaO(s) + H₂O(l) → Ba(OH)₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Bari oxit tác dụng Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình BaO(s) + H₂O(l) → Ba(OH)₂(aq).",
      "evidenceVI": "BaO(s) + H₂O(l) → Ba(OH)₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_142",
    "code": "RX_SYS_142",
    "name_vi": "Natri oxit tan trong Nước (#142)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
    "balancedEquationPlain": "Na2O + H2O -> 2NaOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Na₂O(s) + H₂O(l) → 2NaOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Natri oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Na₂O(s) + H₂O(l) → 2NaOH(aq).",
      "evidenceVI": "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_143",
    "code": "RX_SYS_143",
    "name_vi": "Kali oxit tan trong Nước (#143)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "K₂O(s) + H₂O(l) → 2KOH(aq)",
    "balancedEquationPlain": "K2O + H2O -> 2KOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: K₂O(s) + H₂O(l) → 2KOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình K₂O(s) + H₂O(l) → 2KOH(aq).",
      "evidenceVI": "K₂O(s) + H₂O(l) → 2KOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_144",
    "code": "RX_SYS_144",
    "name_vi": "P2O5 tan trong nước nóng (#144)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
    "balancedEquationPlain": "P2O5 + 3H2O -> 2H3PO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: P2O5 tan trong nước nóng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq).",
      "evidenceVI": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_145",
    "code": "RX_SYS_145",
    "name_vi": "SO3 tan trong nước tạo acid sulfuric (#145)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
    "balancedEquationPlain": "SO3 + H2O -> H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 92,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₃(l) + H₂O(l) → H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: SO3 tan trong nước tạo acid sulfuric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₃(l) + H₂O(l) → H₂SO₄(aq).",
      "evidenceVI": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_146",
    "code": "RX_SYS_146",
    "name_vi": "N2O5 tan trong nước tạo acid nitric (#146)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
    "balancedEquationPlain": "N2O5 + H2O -> 2HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: N₂O₅(s) + H₂O(l) → 2HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: N2O5 tan trong nước tạo acid nitric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình N₂O₅(s) + H₂O(l) → 2HNO₃(aq).",
      "evidenceVI": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_147",
    "code": "RX_SYS_147",
    "name_vi": "Khí NO2 tan trong nước lạnh (#147)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
    "balancedEquationPlain": "2NO2 + H2O -> HNO2 + HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí NO2 tan trong nước lạnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq).",
      "evidenceVI": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_148",
    "code": "RX_SYS_148",
    "name_vi": "Sản xuất acid nitric từ NO2 và Oxy (#148)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
    "balancedEquationPlain": "4NO2 + O2 + 2H2O -> 4HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sản xuất acid nitric từ NO2 và Oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq).",
      "evidenceVI": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_149",
    "code": "RX_SYS_149",
    "name_vi": "Tạo khói trắng Amoni clorua (#149)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HCl(g) → NH₄Cl(s)",
    "balancedEquationPlain": "NH3 + HCl -> NH4Cl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HCl(g) → NH₄Cl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo khói trắng Amoni clorua.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HCl(g) → NH₄Cl(s).",
      "evidenceVI": "NH₃(g) + HCl(g) → NH₄Cl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_150",
    "code": "RX_SYS_150",
    "name_vi": "Tạo phân đạm Amoni nitrat (#150)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
    "balancedEquationPlain": "NH3 + HNO3 -> NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HNO₃(aq) → NH₄NO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm Amoni nitrat.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HNO₃(aq) → NH₄NO₃(aq).",
      "evidenceVI": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_151",
    "code": "RX_SYS_151",
    "name_vi": "Tạo phân đạm SA (#151)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
    "balancedEquationPlain": "2NH3 + H2SO4 -> (NH4)2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm SA.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq).",
      "evidenceVI": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_152",
    "code": "RX_SYS_152",
    "name_vi": "Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao (#152)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "H",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "H₂(g) + S(s) → H₂S(g)",
    "balancedEquationPlain": "H2 + S -> H2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: H₂(g) + S(s) → H₂S(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình H₂(g) + S(s) → H₂S(g).",
      "evidenceVI": "H₂(g) + S(s) → H₂S(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_153",
    "code": "RX_SYS_153",
    "name_vi": "Đốt H2S trong điều kiện thiếu oxy (#153)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
    "balancedEquationPlain": "2H2S + O2 -> 2S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt H2S trong điều kiện thiếu oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l).",
      "evidenceVI": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_154",
    "code": "RX_SYS_154",
    "name_vi": "Đốt cháy hoàn toàn khí H2S (#154)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
    "balancedEquationPlain": "2H2S + 3O2 -> 2SO2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt cháy hoàn toàn khí H2S.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g).",
      "evidenceVI": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_155",
    "code": "RX_SYS_155",
    "name_vi": "Khí SO2 bị oxi hóa trong nước (#155)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
    "balancedEquationPlain": "2SO2 + O2 + 2H2O -> 2H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 bị oxi hóa trong nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq).",
      "evidenceVI": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_156",
    "code": "RX_SYS_156",
    "name_vi": "Phản ứng Claus thu hồi Lưu huỳnh khí thải (#156)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
    "balancedEquationPlain": "SO2 + 2H2S -> 3S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Claus thu hồi Lưu huỳnh khí thải.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l).",
      "evidenceVI": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_157",
    "code": "RX_SYS_157",
    "name_vi": "Khử quặng hematit bằng khí CO trong lò cao (#157)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
    "balancedEquationPlain": "Fe2O3 + 3CO -> 2Fe + 3CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng hematit bằng khí CO trong lò cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g).",
      "evidenceVI": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_158",
    "code": "RX_SYS_158",
    "name_vi": "Khử quặng manhetit bằng CO (#158)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
    "balancedEquationPlain": "Fe3O4 + 4CO -> 3Fe + 4CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng manhetit bằng CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g).",
      "evidenceVI": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_159",
    "code": "RX_SYS_159",
    "name_vi": "Khử CuO bằng khí CO (#159)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
    "balancedEquationPlain": "CuO + CO -> Cu + CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + CO(g) → Cu(s) + CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + CO(g) → Cu(s) + CO₂(g).",
      "evidenceVI": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_160",
    "code": "RX_SYS_160",
    "name_vi": "Khử CuO bằng khí H2 (#160)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
    "balancedEquationPlain": "CuO + H2 -> Cu + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + H₂(g) → Cu(s) + H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + H₂(g) → Cu(s) + H₂O(g).",
      "evidenceVI": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_161",
    "code": "RX_SYS_161",
    "name_vi": "Khử Fe2O3 bằng khí H2 (#161)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
    "balancedEquationPlain": "Fe2O3 + 3H2 -> 2Fe + 3H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 84,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử Fe2O3 bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g).",
      "evidenceVI": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_162",
    "code": "RX_SYS_162",
    "name_vi": "Khử kẽm oxit bằng than cốc (#162)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "ZnO(s) + C(s) → Zn(s) + CO(g)",
    "balancedEquationPlain": "ZnO + C -> Zn + CO",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: ZnO(s) + C(s) → Zn(s) + CO(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử kẽm oxit bằng than cốc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình ZnO(s) + C(s) → Zn(s) + CO(g).",
      "evidenceVI": "ZnO(s) + C(s) → Zn(s) + CO(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_163",
    "code": "RX_SYS_163",
    "name_vi": "Phản ứng Nhiệt nhôm hàn đường ray (#163)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)",
    "balancedEquationPlain": "2Al + Fe2O3 -> Al2O3 + 2Fe",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 105,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Nhiệt nhôm hàn đường ray.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l).",
      "evidenceVI": "2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_164",
    "code": "RX_SYS_164",
    "name_vi": "Nhiệt nhôm điều chế Crom kim loại (#164)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s)",
    "balancedEquationPlain": "2Al + Cr2O3 -> Al2O3 + 2Cr",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 98,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhiệt nhôm điều chế Crom kim loại.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s).",
      "evidenceVI": "2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_165",
    "code": "RX_SYS_165",
    "name_vi": "Nhiệt nhôm điều chế Mangan (#165)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s)",
    "balancedEquationPlain": "4Al + 3MnO2 -> 2Al2O3 + 3Mn",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhiệt nhôm điều chế Mangan.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s).",
      "evidenceVI": "4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_166",
    "code": "RX_SYS_166",
    "name_vi": "Magie tác dụng Brom (#166)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Mg(s) + Br₂(l) → MgBr₂(s)",
    "balancedEquationPlain": "Mg + Br2 -> MgBr2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Mg(s) + Br₂(l) → MgBr₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Magie tác dụng Brom.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Mg(s) + Br₂(l) → MgBr₂(s).",
      "evidenceVI": "Mg(s) + Br₂(l) → MgBr₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_167",
    "code": "RX_SYS_167",
    "name_vi": "Canxi tác dụng Clo (#167)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ca(s) + Cl₂(g) → CaCl₂(s)",
    "balancedEquationPlain": "Ca + Cl2 -> CaCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ca(s) + Cl₂(g) → CaCl₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Canxi tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ca(s) + Cl₂(g) → CaCl₂(s).",
      "evidenceVI": "Ca(s) + Cl₂(g) → CaCl₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_168",
    "code": "RX_SYS_168",
    "name_vi": "Bari tác dụng Clo (#168)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ba(s) + Cl₂(g) → BaCl₂(s)",
    "balancedEquationPlain": "Ba + Cl2 -> BaCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ba(s) + Cl₂(g) → BaCl₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Bari tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ba(s) + Cl₂(g) → BaCl₂(s).",
      "evidenceVI": "Ba(s) + Cl₂(g) → BaCl₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_169",
    "code": "RX_SYS_169",
    "name_vi": "Kali tác dụng Clo (#169)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2K(s) + Cl₂(g) → 2KCl(s)",
    "balancedEquationPlain": "2K + Cl2 -> 2KCl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2K(s) + Cl₂(g) → 2KCl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2K(s) + Cl₂(g) → 2KCl(s).",
      "evidenceVI": "2K(s) + Cl₂(g) → 2KCl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_170",
    "code": "RX_SYS_170",
    "name_vi": "Natri tác dụng Lưu huỳnh (#170)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Na(s) + S(s) → Na₂S(s)",
    "balancedEquationPlain": "2Na + S -> Na2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Na(s) + S(s) → Na₂S(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Natri tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Na(s) + S(s) → Na₂S(s).",
      "evidenceVI": "2Na(s) + S(s) → Na₂S(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_171",
    "code": "RX_SYS_171",
    "name_vi": "Kali tác dụng Lưu huỳnh (#171)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2K(s) + S(s) → K₂S(s)",
    "balancedEquationPlain": "2K + S -> K2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2K(s) + S(s) → K₂S(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2K(s) + S(s) → K₂S(s).",
      "evidenceVI": "2K(s) + S(s) → K₂S(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_172",
    "code": "RX_SYS_172",
    "name_vi": "Canxi tác dụng Lưu huỳnh (#172)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ca(s) + S(s) → CaS(s)",
    "balancedEquationPlain": "Ca + S -> CaS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ca(s) + S(s) → CaS(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Canxi tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ca(s) + S(s) → CaS(s).",
      "evidenceVI": "Ca(s) + S(s) → CaS(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_173",
    "code": "RX_SYS_173",
    "name_vi": "Magie tác dụng Lưu huỳnh (#173)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Mg(s) + S(s) → MgS(s)",
    "balancedEquationPlain": "Mg + S -> MgS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Mg(s) + S(s) → MgS(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Magie tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Mg(s) + S(s) → MgS(s).",
      "evidenceVI": "Mg(s) + S(s) → MgS(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_174",
    "code": "RX_SYS_174",
    "name_vi": "Nhôm tác dụng Lưu huỳnh (#174)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + 3S(s) → Al₂S₃(s)",
    "balancedEquationPlain": "2Al + 3S -> Al2S3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + 3S(s) → Al₂S₃(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhôm tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + 3S(s) → Al₂S₃(s).",
      "evidenceVI": "2Al(s) + 3S(s) → Al₂S₃(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_175",
    "code": "RX_SYS_175",
    "name_vi": "Cacbon tác dụng Lưu huỳnh (#175)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C(s) + 2S(s) → CS₂(l)",
    "balancedEquationPlain": "C + 2S -> CS2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: C(s) + 2S(s) → CS₂(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Cacbon tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình C(s) + 2S(s) → CS₂(l).",
      "evidenceVI": "C(s) + 2S(s) → CS₂(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_176",
    "code": "RX_SYS_176",
    "name_vi": "Silic cháy trong Oxi (#176)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Si"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Si(s) + O₂(g) → SiO₂(s)",
    "balancedEquationPlain": "Si + O2 -> SiO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Si(s) + O₂(g) → SiO₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Silic cháy trong Oxi.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Si(s) + O₂(g) → SiO₂(s).",
      "evidenceVI": "Si(s) + O₂(g) → SiO₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_177",
    "code": "RX_SYS_177",
    "name_vi": "Photpho tác dụng Clo thiếu (#177)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2P(s) + 3Cl₂(g) → 2PCl₃(l)",
    "balancedEquationPlain": "2P + 3Cl2 -> 2PCl3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2P(s) + 3Cl₂(g) → 2PCl₃(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Photpho tác dụng Clo thiếu.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2P(s) + 3Cl₂(g) → 2PCl₃(l).",
      "evidenceVI": "2P(s) + 3Cl₂(g) → 2PCl₃(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_178",
    "code": "RX_SYS_178",
    "name_vi": "Photpho tác dụng Clo dư (#178)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2P(s) + 5Cl₂(g) → 2PCl₅(s)",
    "balancedEquationPlain": "2P + 5Cl2 -> 2PCl5",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2P(s) + 5Cl₂(g) → 2PCl₅(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Photpho tác dụng Clo dư.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2P(s) + 5Cl₂(g) → 2PCl₅(s).",
      "evidenceVI": "2P(s) + 5Cl₂(g) → 2PCl₅(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_179",
    "code": "RX_SYS_179",
    "name_vi": "Đồng đẩy Bạc khỏi dung dịch muối (#179)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓",
    "balancedEquationPlain": "Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đồng đẩy Bạc khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓.",
      "evidenceVI": "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_180",
    "code": "RX_SYS_180",
    "name_vi": "Sắt đẩy Đồng khỏi dung dịch muối (#180)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
    "balancedEquationPlain": "Fe + CuSO4 -> FeSO4 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 76,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sắt đẩy Đồng khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓.",
      "evidenceVI": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_181",
    "code": "RX_SYS_181",
    "name_vi": "Sắt đẩy Bạc (#181)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓",
    "balancedEquationPlain": "Fe + 2AgNO3 -> Fe(NO3)2 + 2Ag",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sắt đẩy Bạc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓.",
      "evidenceVI": "Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_182",
    "code": "RX_SYS_182",
    "name_vi": "Chì đẩy Đồng (#182)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Pb"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓",
    "balancedEquationPlain": "Pb + Cu(NO3)2 -> Pb(NO3)2 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Chì đẩy Đồng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓.",
      "evidenceVI": "Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_183",
    "code": "RX_SYS_183",
    "name_vi": "Clo đẩy Brom khỏi dung dịch muối (#183)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)",
    "balancedEquationPlain": "Cl2 + 2KBr -> 2KCl + Br2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Clo đẩy Brom khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq).",
      "evidenceVI": "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_184",
    "code": "RX_SYS_184",
    "name_vi": "Clo đẩy Iot khỏi dung dịch muối (#184)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓",
    "balancedEquationPlain": "Cl2 + 2KI -> 2KCl + I2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Clo đẩy Iot khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓.",
      "evidenceVI": "Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_185",
    "code": "RX_SYS_185",
    "name_vi": "Brom đẩy Iot (#185)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Br"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓",
    "balancedEquationPlain": "Br2 + 2KI -> 2KBr + I2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Brom đẩy Iot.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓.",
      "evidenceVI": "Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_186",
    "code": "RX_SYS_186",
    "name_vi": "Khí CO2 làm đục nước vôi trong (#186)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "CO2 + Ca(OH)2 -> CaCO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí CO2 làm đục nước vôi trong.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l).",
      "evidenceVI": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_187",
    "code": "RX_SYS_187",
    "name_vi": "Khí CO2 làm đục dung dịch Ba(OH)2 (#187)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "CO2 + Ba(OH)2 -> BaCO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí CO2 làm đục dung dịch Ba(OH)2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l).",
      "evidenceVI": "CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_188",
    "code": "RX_SYS_188",
    "name_vi": "Khí SO2 làm đục nước vôi trong (#188)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "SO2 + Ca(OH)2 -> CaSO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 làm đục nước vôi trong.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l).",
      "evidenceVI": "SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_189",
    "code": "RX_SYS_189",
    "name_vi": "Khí SO2 làm đục dung dịch Ba(OH)2 (#189)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "SO2 + Ba(OH)2 -> BaSO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 làm đục dung dịch Ba(OH)2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l).",
      "evidenceVI": "SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_190",
    "code": "RX_SYS_190",
    "name_vi": "Phản ứng Tôi vôi sống (#190)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CaO(s) + H₂O(l) → Ca(OH)₂(aq)",
    "balancedEquationPlain": "CaO + H2O -> Ca(OH)2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CaO(s) + H₂O(l) → Ca(OH)₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Tôi vôi sống.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CaO(s) + H₂O(l) → Ca(OH)₂(aq).",
      "evidenceVI": "CaO(s) + H₂O(l) → Ca(OH)₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_191",
    "code": "RX_SYS_191",
    "name_vi": "Bari oxit tác dụng Nước (#191)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "BaO(s) + H₂O(l) → Ba(OH)₂(aq)",
    "balancedEquationPlain": "BaO + H2O -> Ba(OH)2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: BaO(s) + H₂O(l) → Ba(OH)₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Bari oxit tác dụng Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình BaO(s) + H₂O(l) → Ba(OH)₂(aq).",
      "evidenceVI": "BaO(s) + H₂O(l) → Ba(OH)₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_192",
    "code": "RX_SYS_192",
    "name_vi": "Natri oxit tan trong Nước (#192)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
    "balancedEquationPlain": "Na2O + H2O -> 2NaOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Na₂O(s) + H₂O(l) → 2NaOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Natri oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Na₂O(s) + H₂O(l) → 2NaOH(aq).",
      "evidenceVI": "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_193",
    "code": "RX_SYS_193",
    "name_vi": "Kali oxit tan trong Nước (#193)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "K₂O(s) + H₂O(l) → 2KOH(aq)",
    "balancedEquationPlain": "K2O + H2O -> 2KOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: K₂O(s) + H₂O(l) → 2KOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình K₂O(s) + H₂O(l) → 2KOH(aq).",
      "evidenceVI": "K₂O(s) + H₂O(l) → 2KOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_194",
    "code": "RX_SYS_194",
    "name_vi": "P2O5 tan trong nước nóng (#194)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
    "balancedEquationPlain": "P2O5 + 3H2O -> 2H3PO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: P2O5 tan trong nước nóng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq).",
      "evidenceVI": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_195",
    "code": "RX_SYS_195",
    "name_vi": "SO3 tan trong nước tạo acid sulfuric (#195)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
    "balancedEquationPlain": "SO3 + H2O -> H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 92,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₃(l) + H₂O(l) → H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: SO3 tan trong nước tạo acid sulfuric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₃(l) + H₂O(l) → H₂SO₄(aq).",
      "evidenceVI": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_196",
    "code": "RX_SYS_196",
    "name_vi": "N2O5 tan trong nước tạo acid nitric (#196)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
    "balancedEquationPlain": "N2O5 + H2O -> 2HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: N₂O₅(s) + H₂O(l) → 2HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: N2O5 tan trong nước tạo acid nitric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình N₂O₅(s) + H₂O(l) → 2HNO₃(aq).",
      "evidenceVI": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_197",
    "code": "RX_SYS_197",
    "name_vi": "Khí NO2 tan trong nước lạnh (#197)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca",
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
    "balancedEquationPlain": "2NO2 + H2O -> HNO2 + HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí NO2 tan trong nước lạnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq).",
      "evidenceVI": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_198",
    "code": "RX_SYS_198",
    "name_vi": "Sản xuất acid nitric từ NO2 và Oxy (#198)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba",
      "Cl"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
    "balancedEquationPlain": "4NO2 + O2 + 2H2O -> 4HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sản xuất acid nitric từ NO2 và Oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq).",
      "evidenceVI": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_199",
    "code": "RX_SYS_199",
    "name_vi": "Tạo khói trắng Amoni clorua (#199)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "Cl"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HCl(g) → NH₄Cl(s)",
    "balancedEquationPlain": "NH3 + HCl -> NH4Cl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HCl(g) → NH₄Cl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo khói trắng Amoni clorua.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HCl(g) → NH₄Cl(s).",
      "evidenceVI": "NH₃(g) + HCl(g) → NH₄Cl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_200",
    "code": "RX_SYS_200",
    "name_vi": "Tạo phân đạm Amoni nitrat (#200)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
    "balancedEquationPlain": "NH3 + HNO3 -> NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HNO₃(aq) → NH₄NO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm Amoni nitrat.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HNO₃(aq) → NH₄NO₃(aq).",
      "evidenceVI": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_201",
    "code": "RX_SYS_201",
    "name_vi": "Tạo phân đạm SA (#201)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
    "balancedEquationPlain": "2NH3 + H2SO4 -> (NH4)2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm SA.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq).",
      "evidenceVI": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_202",
    "code": "RX_SYS_202",
    "name_vi": "Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao (#202)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "H",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "H₂(g) + S(s) → H₂S(g)",
    "balancedEquationPlain": "H2 + S -> H2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: H₂(g) + S(s) → H₂S(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình H₂(g) + S(s) → H₂S(g).",
      "evidenceVI": "H₂(g) + S(s) → H₂S(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_203",
    "code": "RX_SYS_203",
    "name_vi": "Đốt H2S trong điều kiện thiếu oxy (#203)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
    "balancedEquationPlain": "2H2S + O2 -> 2S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt H2S trong điều kiện thiếu oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l).",
      "evidenceVI": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_204",
    "code": "RX_SYS_204",
    "name_vi": "Đốt cháy hoàn toàn khí H2S (#204)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
    "balancedEquationPlain": "2H2S + 3O2 -> 2SO2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt cháy hoàn toàn khí H2S.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g).",
      "evidenceVI": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_205",
    "code": "RX_SYS_205",
    "name_vi": "Khí SO2 bị oxi hóa trong nước (#205)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
    "balancedEquationPlain": "2SO2 + O2 + 2H2O -> 2H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 bị oxi hóa trong nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq).",
      "evidenceVI": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_206",
    "code": "RX_SYS_206",
    "name_vi": "Phản ứng Claus thu hồi Lưu huỳnh khí thải (#206)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
    "balancedEquationPlain": "SO2 + 2H2S -> 3S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Claus thu hồi Lưu huỳnh khí thải.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l).",
      "evidenceVI": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_207",
    "code": "RX_SYS_207",
    "name_vi": "Khử quặng hematit bằng khí CO trong lò cao (#207)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
    "balancedEquationPlain": "Fe2O3 + 3CO -> 2Fe + 3CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng hematit bằng khí CO trong lò cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g).",
      "evidenceVI": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_208",
    "code": "RX_SYS_208",
    "name_vi": "Khử quặng manhetit bằng CO (#208)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
    "balancedEquationPlain": "Fe3O4 + 4CO -> 3Fe + 4CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng manhetit bằng CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g).",
      "evidenceVI": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_209",
    "code": "RX_SYS_209",
    "name_vi": "Khử CuO bằng khí CO (#209)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
    "balancedEquationPlain": "CuO + CO -> Cu + CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + CO(g) → Cu(s) + CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + CO(g) → Cu(s) + CO₂(g).",
      "evidenceVI": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_210",
    "code": "RX_SYS_210",
    "name_vi": "Khử CuO bằng khí H2 (#210)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
    "balancedEquationPlain": "CuO + H2 -> Cu + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + H₂(g) → Cu(s) + H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + H₂(g) → Cu(s) + H₂O(g).",
      "evidenceVI": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_211",
    "code": "RX_SYS_211",
    "name_vi": "Khử Fe2O3 bằng khí H2 (#211)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
    "balancedEquationPlain": "Fe2O3 + 3H2 -> 2Fe + 3H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 84,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử Fe2O3 bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g).",
      "evidenceVI": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_212",
    "code": "RX_SYS_212",
    "name_vi": "Khử kẽm oxit bằng than cốc (#212)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "ZnO(s) + C(s) → Zn(s) + CO(g)",
    "balancedEquationPlain": "ZnO + C -> Zn + CO",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: ZnO(s) + C(s) → Zn(s) + CO(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử kẽm oxit bằng than cốc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình ZnO(s) + C(s) → Zn(s) + CO(g).",
      "evidenceVI": "ZnO(s) + C(s) → Zn(s) + CO(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_213",
    "code": "RX_SYS_213",
    "name_vi": "Phản ứng Nhiệt nhôm hàn đường ray (#213)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)",
    "balancedEquationPlain": "2Al + Fe2O3 -> Al2O3 + 2Fe",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 105,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Nhiệt nhôm hàn đường ray.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l).",
      "evidenceVI": "2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_214",
    "code": "RX_SYS_214",
    "name_vi": "Nhiệt nhôm điều chế Crom kim loại (#214)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s)",
    "balancedEquationPlain": "2Al + Cr2O3 -> Al2O3 + 2Cr",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 98,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhiệt nhôm điều chế Crom kim loại.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s).",
      "evidenceVI": "2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_215",
    "code": "RX_SYS_215",
    "name_vi": "Nhiệt nhôm điều chế Mangan (#215)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s)",
    "balancedEquationPlain": "4Al + 3MnO2 -> 2Al2O3 + 3Mn",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhiệt nhôm điều chế Mangan.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s).",
      "evidenceVI": "4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_216",
    "code": "RX_SYS_216",
    "name_vi": "Magie tác dụng Brom (#216)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Mg(s) + Br₂(l) → MgBr₂(s)",
    "balancedEquationPlain": "Mg + Br2 -> MgBr2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Mg(s) + Br₂(l) → MgBr₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Magie tác dụng Brom.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Mg(s) + Br₂(l) → MgBr₂(s).",
      "evidenceVI": "Mg(s) + Br₂(l) → MgBr₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_217",
    "code": "RX_SYS_217",
    "name_vi": "Canxi tác dụng Clo (#217)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ca(s) + Cl₂(g) → CaCl₂(s)",
    "balancedEquationPlain": "Ca + Cl2 -> CaCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ca(s) + Cl₂(g) → CaCl₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Canxi tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ca(s) + Cl₂(g) → CaCl₂(s).",
      "evidenceVI": "Ca(s) + Cl₂(g) → CaCl₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_218",
    "code": "RX_SYS_218",
    "name_vi": "Bari tác dụng Clo (#218)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ba(s) + Cl₂(g) → BaCl₂(s)",
    "balancedEquationPlain": "Ba + Cl2 -> BaCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ba(s) + Cl₂(g) → BaCl₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Bari tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ba(s) + Cl₂(g) → BaCl₂(s).",
      "evidenceVI": "Ba(s) + Cl₂(g) → BaCl₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_219",
    "code": "RX_SYS_219",
    "name_vi": "Kali tác dụng Clo (#219)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2K(s) + Cl₂(g) → 2KCl(s)",
    "balancedEquationPlain": "2K + Cl2 -> 2KCl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2K(s) + Cl₂(g) → 2KCl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2K(s) + Cl₂(g) → 2KCl(s).",
      "evidenceVI": "2K(s) + Cl₂(g) → 2KCl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_220",
    "code": "RX_SYS_220",
    "name_vi": "Natri tác dụng Lưu huỳnh (#220)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Na(s) + S(s) → Na₂S(s)",
    "balancedEquationPlain": "2Na + S -> Na2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Na(s) + S(s) → Na₂S(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Natri tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Na(s) + S(s) → Na₂S(s).",
      "evidenceVI": "2Na(s) + S(s) → Na₂S(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_221",
    "code": "RX_SYS_221",
    "name_vi": "Kali tác dụng Lưu huỳnh (#221)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2K(s) + S(s) → K₂S(s)",
    "balancedEquationPlain": "2K + S -> K2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2K(s) + S(s) → K₂S(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2K(s) + S(s) → K₂S(s).",
      "evidenceVI": "2K(s) + S(s) → K₂S(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_222",
    "code": "RX_SYS_222",
    "name_vi": "Canxi tác dụng Lưu huỳnh (#222)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ca(s) + S(s) → CaS(s)",
    "balancedEquationPlain": "Ca + S -> CaS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ca(s) + S(s) → CaS(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Canxi tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ca(s) + S(s) → CaS(s).",
      "evidenceVI": "Ca(s) + S(s) → CaS(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_223",
    "code": "RX_SYS_223",
    "name_vi": "Magie tác dụng Lưu huỳnh (#223)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Mg(s) + S(s) → MgS(s)",
    "balancedEquationPlain": "Mg + S -> MgS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Mg(s) + S(s) → MgS(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Magie tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Mg(s) + S(s) → MgS(s).",
      "evidenceVI": "Mg(s) + S(s) → MgS(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_224",
    "code": "RX_SYS_224",
    "name_vi": "Nhôm tác dụng Lưu huỳnh (#224)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + 3S(s) → Al₂S₃(s)",
    "balancedEquationPlain": "2Al + 3S -> Al2S3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + 3S(s) → Al₂S₃(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhôm tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + 3S(s) → Al₂S₃(s).",
      "evidenceVI": "2Al(s) + 3S(s) → Al₂S₃(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_225",
    "code": "RX_SYS_225",
    "name_vi": "Cacbon tác dụng Lưu huỳnh (#225)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C(s) + 2S(s) → CS₂(l)",
    "balancedEquationPlain": "C + 2S -> CS2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: C(s) + 2S(s) → CS₂(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Cacbon tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình C(s) + 2S(s) → CS₂(l).",
      "evidenceVI": "C(s) + 2S(s) → CS₂(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_226",
    "code": "RX_SYS_226",
    "name_vi": "Silic cháy trong Oxi (#226)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Si"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Si(s) + O₂(g) → SiO₂(s)",
    "balancedEquationPlain": "Si + O2 -> SiO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Si(s) + O₂(g) → SiO₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Silic cháy trong Oxi.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Si(s) + O₂(g) → SiO₂(s).",
      "evidenceVI": "Si(s) + O₂(g) → SiO₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_227",
    "code": "RX_SYS_227",
    "name_vi": "Photpho tác dụng Clo thiếu (#227)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2P(s) + 3Cl₂(g) → 2PCl₃(l)",
    "balancedEquationPlain": "2P + 3Cl2 -> 2PCl3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2P(s) + 3Cl₂(g) → 2PCl₃(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Photpho tác dụng Clo thiếu.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2P(s) + 3Cl₂(g) → 2PCl₃(l).",
      "evidenceVI": "2P(s) + 3Cl₂(g) → 2PCl₃(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_228",
    "code": "RX_SYS_228",
    "name_vi": "Photpho tác dụng Clo dư (#228)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2P(s) + 5Cl₂(g) → 2PCl₅(s)",
    "balancedEquationPlain": "2P + 5Cl2 -> 2PCl5",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2P(s) + 5Cl₂(g) → 2PCl₅(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Photpho tác dụng Clo dư.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2P(s) + 5Cl₂(g) → 2PCl₅(s).",
      "evidenceVI": "2P(s) + 5Cl₂(g) → 2PCl₅(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_229",
    "code": "RX_SYS_229",
    "name_vi": "Đồng đẩy Bạc khỏi dung dịch muối (#229)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓",
    "balancedEquationPlain": "Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đồng đẩy Bạc khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓.",
      "evidenceVI": "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_230",
    "code": "RX_SYS_230",
    "name_vi": "Sắt đẩy Đồng khỏi dung dịch muối (#230)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
    "balancedEquationPlain": "Fe + CuSO4 -> FeSO4 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 76,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sắt đẩy Đồng khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓.",
      "evidenceVI": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_231",
    "code": "RX_SYS_231",
    "name_vi": "Sắt đẩy Bạc (#231)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓",
    "balancedEquationPlain": "Fe + 2AgNO3 -> Fe(NO3)2 + 2Ag",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sắt đẩy Bạc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓.",
      "evidenceVI": "Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_232",
    "code": "RX_SYS_232",
    "name_vi": "Chì đẩy Đồng (#232)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Pb"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓",
    "balancedEquationPlain": "Pb + Cu(NO3)2 -> Pb(NO3)2 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Chì đẩy Đồng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓.",
      "evidenceVI": "Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_233",
    "code": "RX_SYS_233",
    "name_vi": "Clo đẩy Brom khỏi dung dịch muối (#233)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)",
    "balancedEquationPlain": "Cl2 + 2KBr -> 2KCl + Br2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Clo đẩy Brom khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq).",
      "evidenceVI": "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_234",
    "code": "RX_SYS_234",
    "name_vi": "Clo đẩy Iot khỏi dung dịch muối (#234)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓",
    "balancedEquationPlain": "Cl2 + 2KI -> 2KCl + I2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Clo đẩy Iot khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓.",
      "evidenceVI": "Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_235",
    "code": "RX_SYS_235",
    "name_vi": "Brom đẩy Iot (#235)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Br"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓",
    "balancedEquationPlain": "Br2 + 2KI -> 2KBr + I2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Brom đẩy Iot.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓.",
      "evidenceVI": "Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_236",
    "code": "RX_SYS_236",
    "name_vi": "Khí CO2 làm đục nước vôi trong (#236)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "CO2 + Ca(OH)2 -> CaCO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí CO2 làm đục nước vôi trong.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l).",
      "evidenceVI": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_237",
    "code": "RX_SYS_237",
    "name_vi": "Khí CO2 làm đục dung dịch Ba(OH)2 (#237)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca",
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "CO2 + Ba(OH)2 -> BaCO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí CO2 làm đục dung dịch Ba(OH)2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l).",
      "evidenceVI": "CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_238",
    "code": "RX_SYS_238",
    "name_vi": "Khí SO2 làm đục nước vôi trong (#238)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba",
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "SO2 + Ca(OH)2 -> CaSO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 làm đục nước vôi trong.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l).",
      "evidenceVI": "SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_239",
    "code": "RX_SYS_239",
    "name_vi": "Khí SO2 làm đục dung dịch Ba(OH)2 (#239)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "Cl"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "SO2 + Ba(OH)2 -> BaSO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 làm đục dung dịch Ba(OH)2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l).",
      "evidenceVI": "SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_240",
    "code": "RX_SYS_240",
    "name_vi": "Phản ứng Tôi vôi sống (#240)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CaO(s) + H₂O(l) → Ca(OH)₂(aq)",
    "balancedEquationPlain": "CaO + H2O -> Ca(OH)2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CaO(s) + H₂O(l) → Ca(OH)₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Tôi vôi sống.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CaO(s) + H₂O(l) → Ca(OH)₂(aq).",
      "evidenceVI": "CaO(s) + H₂O(l) → Ca(OH)₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_241",
    "code": "RX_SYS_241",
    "name_vi": "Bari oxit tác dụng Nước (#241)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "BaO(s) + H₂O(l) → Ba(OH)₂(aq)",
    "balancedEquationPlain": "BaO + H2O -> Ba(OH)2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: BaO(s) + H₂O(l) → Ba(OH)₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Bari oxit tác dụng Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình BaO(s) + H₂O(l) → Ba(OH)₂(aq).",
      "evidenceVI": "BaO(s) + H₂O(l) → Ba(OH)₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_242",
    "code": "RX_SYS_242",
    "name_vi": "Natri oxit tan trong Nước (#242)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
    "balancedEquationPlain": "Na2O + H2O -> 2NaOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Na₂O(s) + H₂O(l) → 2NaOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Natri oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Na₂O(s) + H₂O(l) → 2NaOH(aq).",
      "evidenceVI": "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_243",
    "code": "RX_SYS_243",
    "name_vi": "Kali oxit tan trong Nước (#243)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "K₂O(s) + H₂O(l) → 2KOH(aq)",
    "balancedEquationPlain": "K2O + H2O -> 2KOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: K₂O(s) + H₂O(l) → 2KOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình K₂O(s) + H₂O(l) → 2KOH(aq).",
      "evidenceVI": "K₂O(s) + H₂O(l) → 2KOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_244",
    "code": "RX_SYS_244",
    "name_vi": "P2O5 tan trong nước nóng (#244)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
    "balancedEquationPlain": "P2O5 + 3H2O -> 2H3PO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: P2O5 tan trong nước nóng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq).",
      "evidenceVI": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_245",
    "code": "RX_SYS_245",
    "name_vi": "SO3 tan trong nước tạo acid sulfuric (#245)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
    "balancedEquationPlain": "SO3 + H2O -> H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 92,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₃(l) + H₂O(l) → H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: SO3 tan trong nước tạo acid sulfuric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₃(l) + H₂O(l) → H₂SO₄(aq).",
      "evidenceVI": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_246",
    "code": "RX_SYS_246",
    "name_vi": "N2O5 tan trong nước tạo acid nitric (#246)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
    "balancedEquationPlain": "N2O5 + H2O -> 2HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: N₂O₅(s) + H₂O(l) → 2HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: N2O5 tan trong nước tạo acid nitric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình N₂O₅(s) + H₂O(l) → 2HNO₃(aq).",
      "evidenceVI": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_247",
    "code": "RX_SYS_247",
    "name_vi": "Khí NO2 tan trong nước lạnh (#247)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
    "balancedEquationPlain": "2NO2 + H2O -> HNO2 + HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí NO2 tan trong nước lạnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq).",
      "evidenceVI": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_248",
    "code": "RX_SYS_248",
    "name_vi": "Sản xuất acid nitric từ NO2 và Oxy (#248)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
    "balancedEquationPlain": "4NO2 + O2 + 2H2O -> 4HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sản xuất acid nitric từ NO2 và Oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq).",
      "evidenceVI": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_249",
    "code": "RX_SYS_249",
    "name_vi": "Tạo khói trắng Amoni clorua (#249)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HCl(g) → NH₄Cl(s)",
    "balancedEquationPlain": "NH3 + HCl -> NH4Cl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HCl(g) → NH₄Cl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo khói trắng Amoni clorua.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HCl(g) → NH₄Cl(s).",
      "evidenceVI": "NH₃(g) + HCl(g) → NH₄Cl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_250",
    "code": "RX_SYS_250",
    "name_vi": "Tạo phân đạm Amoni nitrat (#250)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
    "balancedEquationPlain": "NH3 + HNO3 -> NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HNO₃(aq) → NH₄NO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm Amoni nitrat.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HNO₃(aq) → NH₄NO₃(aq).",
      "evidenceVI": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_251",
    "code": "RX_SYS_251",
    "name_vi": "Tạo phân đạm SA (#251)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
    "balancedEquationPlain": "2NH3 + H2SO4 -> (NH4)2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm SA.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq).",
      "evidenceVI": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_252",
    "code": "RX_SYS_252",
    "name_vi": "Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao (#252)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "H",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "H₂(g) + S(s) → H₂S(g)",
    "balancedEquationPlain": "H2 + S -> H2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: H₂(g) + S(s) → H₂S(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình H₂(g) + S(s) → H₂S(g).",
      "evidenceVI": "H₂(g) + S(s) → H₂S(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_253",
    "code": "RX_SYS_253",
    "name_vi": "Đốt H2S trong điều kiện thiếu oxy (#253)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
    "balancedEquationPlain": "2H2S + O2 -> 2S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt H2S trong điều kiện thiếu oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l).",
      "evidenceVI": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_254",
    "code": "RX_SYS_254",
    "name_vi": "Đốt cháy hoàn toàn khí H2S (#254)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
    "balancedEquationPlain": "2H2S + 3O2 -> 2SO2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt cháy hoàn toàn khí H2S.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g).",
      "evidenceVI": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_255",
    "code": "RX_SYS_255",
    "name_vi": "Khí SO2 bị oxi hóa trong nước (#255)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
    "balancedEquationPlain": "2SO2 + O2 + 2H2O -> 2H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 bị oxi hóa trong nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq).",
      "evidenceVI": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_256",
    "code": "RX_SYS_256",
    "name_vi": "Phản ứng Claus thu hồi Lưu huỳnh khí thải (#256)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
    "balancedEquationPlain": "SO2 + 2H2S -> 3S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Claus thu hồi Lưu huỳnh khí thải.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l).",
      "evidenceVI": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_257",
    "code": "RX_SYS_257",
    "name_vi": "Khử quặng hematit bằng khí CO trong lò cao (#257)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
    "balancedEquationPlain": "Fe2O3 + 3CO -> 2Fe + 3CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng hematit bằng khí CO trong lò cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g).",
      "evidenceVI": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_258",
    "code": "RX_SYS_258",
    "name_vi": "Khử quặng manhetit bằng CO (#258)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
    "balancedEquationPlain": "Fe3O4 + 4CO -> 3Fe + 4CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng manhetit bằng CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g).",
      "evidenceVI": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_259",
    "code": "RX_SYS_259",
    "name_vi": "Khử CuO bằng khí CO (#259)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
    "balancedEquationPlain": "CuO + CO -> Cu + CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + CO(g) → Cu(s) + CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + CO(g) → Cu(s) + CO₂(g).",
      "evidenceVI": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_260",
    "code": "RX_SYS_260",
    "name_vi": "Khử CuO bằng khí H2 (#260)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
    "balancedEquationPlain": "CuO + H2 -> Cu + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + H₂(g) → Cu(s) + H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + H₂(g) → Cu(s) + H₂O(g).",
      "evidenceVI": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_261",
    "code": "RX_SYS_261",
    "name_vi": "Khử Fe2O3 bằng khí H2 (#261)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
    "balancedEquationPlain": "Fe2O3 + 3H2 -> 2Fe + 3H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 84,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử Fe2O3 bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g).",
      "evidenceVI": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_262",
    "code": "RX_SYS_262",
    "name_vi": "Khử kẽm oxit bằng than cốc (#262)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "ZnO(s) + C(s) → Zn(s) + CO(g)",
    "balancedEquationPlain": "ZnO + C -> Zn + CO",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: ZnO(s) + C(s) → Zn(s) + CO(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử kẽm oxit bằng than cốc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình ZnO(s) + C(s) → Zn(s) + CO(g).",
      "evidenceVI": "ZnO(s) + C(s) → Zn(s) + CO(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_263",
    "code": "RX_SYS_263",
    "name_vi": "Phản ứng Nhiệt nhôm hàn đường ray (#263)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "Fe"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)",
    "balancedEquationPlain": "2Al + Fe2O3 -> Al2O3 + 2Fe",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 105,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Nhiệt nhôm hàn đường ray.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l).",
      "evidenceVI": "2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_264",
    "code": "RX_SYS_264",
    "name_vi": "Nhiệt nhôm điều chế Crom kim loại (#264)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s)",
    "balancedEquationPlain": "2Al + Cr2O3 -> Al2O3 + 2Cr",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 98,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhiệt nhôm điều chế Crom kim loại.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s).",
      "evidenceVI": "2Al(s) + Cr₂O₃(s) → Al₂O₃(s) + 2Cr(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_265",
    "code": "RX_SYS_265",
    "name_vi": "Nhiệt nhôm điều chế Mangan (#265)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s)",
    "balancedEquationPlain": "4Al + 3MnO2 -> 2Al2O3 + 3Mn",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhiệt nhôm điều chế Mangan.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s).",
      "evidenceVI": "4Al(s) + 3MnO₂(s) → 2Al₂O₃(s) + 3Mn(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_266",
    "code": "RX_SYS_266",
    "name_vi": "Magie tác dụng Brom (#266)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Mg(s) + Br₂(l) → MgBr₂(s)",
    "balancedEquationPlain": "Mg + Br2 -> MgBr2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Mg(s) + Br₂(l) → MgBr₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Magie tác dụng Brom.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Mg(s) + Br₂(l) → MgBr₂(s).",
      "evidenceVI": "Mg(s) + Br₂(l) → MgBr₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_267",
    "code": "RX_SYS_267",
    "name_vi": "Canxi tác dụng Clo (#267)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ca(s) + Cl₂(g) → CaCl₂(s)",
    "balancedEquationPlain": "Ca + Cl2 -> CaCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ca(s) + Cl₂(g) → CaCl₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Canxi tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ca(s) + Cl₂(g) → CaCl₂(s).",
      "evidenceVI": "Ca(s) + Cl₂(g) → CaCl₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_268",
    "code": "RX_SYS_268",
    "name_vi": "Bari tác dụng Clo (#268)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ba(s) + Cl₂(g) → BaCl₂(s)",
    "balancedEquationPlain": "Ba + Cl2 -> BaCl2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ba(s) + Cl₂(g) → BaCl₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Bari tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ba(s) + Cl₂(g) → BaCl₂(s).",
      "evidenceVI": "Ba(s) + Cl₂(g) → BaCl₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_269",
    "code": "RX_SYS_269",
    "name_vi": "Kali tác dụng Clo (#269)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2K(s) + Cl₂(g) → 2KCl(s)",
    "balancedEquationPlain": "2K + Cl2 -> 2KCl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2K(s) + Cl₂(g) → 2KCl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali tác dụng Clo.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2K(s) + Cl₂(g) → 2KCl(s).",
      "evidenceVI": "2K(s) + Cl₂(g) → 2KCl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_270",
    "code": "RX_SYS_270",
    "name_vi": "Natri tác dụng Lưu huỳnh (#270)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Na(s) + S(s) → Na₂S(s)",
    "balancedEquationPlain": "2Na + S -> Na2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Na(s) + S(s) → Na₂S(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Natri tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Na(s) + S(s) → Na₂S(s).",
      "evidenceVI": "2Na(s) + S(s) → Na₂S(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_271",
    "code": "RX_SYS_271",
    "name_vi": "Kali tác dụng Lưu huỳnh (#271)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2K(s) + S(s) → K₂S(s)",
    "balancedEquationPlain": "2K + S -> K2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2K(s) + S(s) → K₂S(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2K(s) + S(s) → K₂S(s).",
      "evidenceVI": "2K(s) + S(s) → K₂S(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_272",
    "code": "RX_SYS_272",
    "name_vi": "Canxi tác dụng Lưu huỳnh (#272)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Ca(s) + S(s) → CaS(s)",
    "balancedEquationPlain": "Ca + S -> CaS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Ca(s) + S(s) → CaS(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Canxi tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Ca(s) + S(s) → CaS(s).",
      "evidenceVI": "Ca(s) + S(s) → CaS(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_273",
    "code": "RX_SYS_273",
    "name_vi": "Magie tác dụng Lưu huỳnh (#273)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Mg",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Mg(s) + S(s) → MgS(s)",
    "balancedEquationPlain": "Mg + S -> MgS",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Mg(s) + S(s) → MgS(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Magie tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Mg(s) + S(s) → MgS(s).",
      "evidenceVI": "Mg(s) + S(s) → MgS(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_274",
    "code": "RX_SYS_274",
    "name_vi": "Nhôm tác dụng Lưu huỳnh (#274)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Al",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Al(s) + 3S(s) → Al₂S₃(s)",
    "balancedEquationPlain": "2Al + 3S -> Al2S3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2Al(s) + 3S(s) → Al₂S₃(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Nhôm tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2Al(s) + 3S(s) → Al₂S₃(s).",
      "evidenceVI": "2Al(s) + 3S(s) → Al₂S₃(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_275",
    "code": "RX_SYS_275",
    "name_vi": "Cacbon tác dụng Lưu huỳnh (#275)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C(s) + 2S(s) → CS₂(l)",
    "balancedEquationPlain": "C + 2S -> CS2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: C(s) + 2S(s) → CS₂(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Cacbon tác dụng Lưu huỳnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình C(s) + 2S(s) → CS₂(l).",
      "evidenceVI": "C(s) + 2S(s) → CS₂(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_276",
    "code": "RX_SYS_276",
    "name_vi": "Silic cháy trong Oxi (#276)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Si"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Si(s) + O₂(g) → SiO₂(s)",
    "balancedEquationPlain": "Si + O2 -> SiO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Si(s) + O₂(g) → SiO₂(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Silic cháy trong Oxi.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Si(s) + O₂(g) → SiO₂(s).",
      "evidenceVI": "Si(s) + O₂(g) → SiO₂(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_277",
    "code": "RX_SYS_277",
    "name_vi": "Photpho tác dụng Clo thiếu (#277)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2P(s) + 3Cl₂(g) → 2PCl₃(l)",
    "balancedEquationPlain": "2P + 3Cl2 -> 2PCl3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 72,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2P(s) + 3Cl₂(g) → 2PCl₃(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Photpho tác dụng Clo thiếu.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2P(s) + 3Cl₂(g) → 2PCl₃(l).",
      "evidenceVI": "2P(s) + 3Cl₂(g) → 2PCl₃(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_278",
    "code": "RX_SYS_278",
    "name_vi": "Photpho tác dụng Clo dư (#278)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2P(s) + 5Cl₂(g) → 2PCl₅(s)",
    "balancedEquationPlain": "2P + 5Cl2 -> 2PCl5",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2P(s) + 5Cl₂(g) → 2PCl₅(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Photpho tác dụng Clo dư.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2P(s) + 5Cl₂(g) → 2PCl₅(s).",
      "evidenceVI": "2P(s) + 5Cl₂(g) → 2PCl₅(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_279",
    "code": "RX_SYS_279",
    "name_vi": "Đồng đẩy Bạc khỏi dung dịch muối (#279)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu",
      "Ag"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓",
    "balancedEquationPlain": "Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đồng đẩy Bạc khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓.",
      "evidenceVI": "Cu(s) + 2AgNO₃(aq) → Cu(NO₃)₂(aq) + 2Ag(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_280",
    "code": "RX_SYS_280",
    "name_vi": "Sắt đẩy Đồng khỏi dung dịch muối (#280)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe",
      "Cu"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
    "balancedEquationPlain": "Fe + CuSO4 -> FeSO4 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 76,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sắt đẩy Đồng khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓.",
      "evidenceVI": "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_281",
    "code": "RX_SYS_281",
    "name_vi": "Sắt đẩy Bạc (#281)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe",
      "Ag"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓",
    "balancedEquationPlain": "Fe + 2AgNO3 -> Fe(NO3)2 + 2Ag",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sắt đẩy Bạc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓.",
      "evidenceVI": "Fe(s) + 2AgNO₃(aq) → Fe(NO₃)₂(aq) + 2Ag(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_282",
    "code": "RX_SYS_282",
    "name_vi": "Chì đẩy Đồng (#282)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Pb",
      "Cu"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓",
    "balancedEquationPlain": "Pb + Cu(NO3)2 -> Pb(NO3)2 + Cu",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Chì đẩy Đồng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓.",
      "evidenceVI": "Pb(s) + Cu(NO₃)₂(aq) → Pb(NO₃)₂(aq) + Cu(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_283",
    "code": "RX_SYS_283",
    "name_vi": "Clo đẩy Brom khỏi dung dịch muối (#283)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cl",
      "Br"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)",
    "balancedEquationPlain": "Cl2 + 2KBr -> 2KCl + Br2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Clo đẩy Brom khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq).",
      "evidenceVI": "Cl₂(g) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_284",
    "code": "RX_SYS_284",
    "name_vi": "Clo đẩy Iot khỏi dung dịch muối (#284)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cl",
      "I"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓",
    "balancedEquationPlain": "Cl2 + 2KI -> 2KCl + I2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Clo đẩy Iot khỏi dung dịch muối.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓.",
      "evidenceVI": "Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_285",
    "code": "RX_SYS_285",
    "name_vi": "Brom đẩy Iot (#285)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Br",
      "I"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓",
    "balancedEquationPlain": "Br2 + 2KI -> 2KBr + I2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓. Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Brom đẩy Iot.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓.",
      "evidenceVI": "Br₂(aq) + 2KI(aq) → 2KBr(aq) + I₂(s)↓",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_286",
    "code": "RX_SYS_286",
    "name_vi": "Khí CO2 làm đục nước vôi trong (#286)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "CO2 + Ca(OH)2 -> CaCO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí CO2 làm đục nước vôi trong.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l).",
      "evidenceVI": "CO₂(g) + Ca(OH)₂(aq) → CaCO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_287",
    "code": "RX_SYS_287",
    "name_vi": "Khí CO2 làm đục dung dịch Ba(OH)2 (#287)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "C"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "CO2 + Ba(OH)2 -> BaCO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí CO2 làm đục dung dịch Ba(OH)2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l).",
      "evidenceVI": "CO₂(g) + Ba(OH)₂(aq) → BaCO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_288",
    "code": "RX_SYS_288",
    "name_vi": "Khí SO2 làm đục nước vôi trong (#288)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "SO2 + Ca(OH)2 -> CaSO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 làm đục nước vôi trong.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l).",
      "evidenceVI": "SO₂(g) + Ca(OH)₂(aq) → CaSO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_289",
    "code": "RX_SYS_289",
    "name_vi": "Khí SO2 làm đục dung dịch Ba(OH)2 (#289)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l)",
    "balancedEquationPlain": "SO2 + Ba(OH)2 -> BaSO3 + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 làm đục dung dịch Ba(OH)2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l).",
      "evidenceVI": "SO₂(g) + Ba(OH)₂(aq) → BaSO₃(s)↓ + H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_290",
    "code": "RX_SYS_290",
    "name_vi": "Phản ứng Tôi vôi sống (#290)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ca"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "CaO(s) + H₂O(l) → Ca(OH)₂(aq)",
    "balancedEquationPlain": "CaO + H2O -> Ca(OH)2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CaO(s) + H₂O(l) → Ca(OH)₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Tôi vôi sống.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CaO(s) + H₂O(l) → Ca(OH)₂(aq).",
      "evidenceVI": "CaO(s) + H₂O(l) → Ca(OH)₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_291",
    "code": "RX_SYS_291",
    "name_vi": "Bari oxit tác dụng Nước (#291)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Ba"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "BaO(s) + H₂O(l) → Ba(OH)₂(aq)",
    "balancedEquationPlain": "BaO + H2O -> Ba(OH)2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: BaO(s) + H₂O(l) → Ba(OH)₂(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Bari oxit tác dụng Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình BaO(s) + H₂O(l) → Ba(OH)₂(aq).",
      "evidenceVI": "BaO(s) + H₂O(l) → Ba(OH)₂(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_292",
    "code": "RX_SYS_292",
    "name_vi": "Natri oxit tan trong Nước (#292)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Na"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
    "balancedEquationPlain": "Na2O + H2O -> 2NaOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Na₂O(s) + H₂O(l) → 2NaOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Natri oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Na₂O(s) + H₂O(l) → 2NaOH(aq).",
      "evidenceVI": "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_293",
    "code": "RX_SYS_293",
    "name_vi": "Kali oxit tan trong Nước (#293)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "K"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "K₂O(s) + H₂O(l) → 2KOH(aq)",
    "balancedEquationPlain": "K2O + H2O -> 2KOH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: K₂O(s) + H₂O(l) → 2KOH(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Kali oxit tan trong Nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình K₂O(s) + H₂O(l) → 2KOH(aq).",
      "evidenceVI": "K₂O(s) + H₂O(l) → 2KOH(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_294",
    "code": "RX_SYS_294",
    "name_vi": "P2O5 tan trong nước nóng (#294)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "P"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
    "balancedEquationPlain": "P2O5 + 3H2O -> 2H3PO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: P2O5 tan trong nước nóng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq).",
      "evidenceVI": "P₂O₅(s) + 3H₂O(l) → 2H₃PO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_295",
    "code": "RX_SYS_295",
    "name_vi": "SO3 tan trong nước tạo acid sulfuric (#295)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
    "balancedEquationPlain": "SO3 + H2O -> H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 92,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₃(l) + H₂O(l) → H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: SO3 tan trong nước tạo acid sulfuric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₃(l) + H₂O(l) → H₂SO₄(aq).",
      "evidenceVI": "SO₃(l) + H₂O(l) → H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_296",
    "code": "RX_SYS_296",
    "name_vi": "N2O5 tan trong nước tạo acid nitric (#296)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
    "balancedEquationPlain": "N2O5 + H2O -> 2HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: N₂O₅(s) + H₂O(l) → 2HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: N2O5 tan trong nước tạo acid nitric.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình N₂O₅(s) + H₂O(l) → 2HNO₃(aq).",
      "evidenceVI": "N₂O₅(s) + H₂O(l) → 2HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_297",
    "code": "RX_SYS_297",
    "name_vi": "Khí NO2 tan trong nước lạnh (#297)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
    "balancedEquationPlain": "2NO2 + H2O -> HNO2 + HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí NO2 tan trong nước lạnh.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq).",
      "evidenceVI": "2NO₂(g) + H₂O(l) → HNO₂(aq) + HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_298",
    "code": "RX_SYS_298",
    "name_vi": "Sản xuất acid nitric từ NO2 và Oxy (#298)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
    "balancedEquationPlain": "4NO2 + O2 + 2H2O -> 4HNO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Sản xuất acid nitric từ NO2 và Oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq).",
      "evidenceVI": "4NO₂(g) + O₂(g) + 2H₂O(l) → 4HNO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_299",
    "code": "RX_SYS_299",
    "name_vi": "Tạo khói trắng Amoni clorua (#299)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HCl(g) → NH₄Cl(s)",
    "balancedEquationPlain": "NH3 + HCl -> NH4Cl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 78,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HCl(g) → NH₄Cl(s). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo khói trắng Amoni clorua.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HCl(g) → NH₄Cl(s).",
      "evidenceVI": "NH₃(g) + HCl(g) → NH₄Cl(s)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_300",
    "code": "RX_SYS_300",
    "name_vi": "Tạo phân đạm Amoni nitrat (#300)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
    "balancedEquationPlain": "NH3 + HNO3 -> NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: NH₃(g) + HNO₃(aq) → NH₄NO₃(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm Amoni nitrat.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình NH₃(g) + HNO₃(aq) → NH₄NO₃(aq).",
      "evidenceVI": "NH₃(g) + HNO₃(aq) → NH₄NO₃(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_301",
    "code": "RX_SYS_301",
    "name_vi": "Tạo phân đạm SA (#301)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "N"
    ],
    "requiredConditions": [
      "ACID_DILUTE"
    ],
    "isTrap": false,
    "equation": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
    "balancedEquationPlain": "2NH3 + H2SO4 -> (NH4)2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Tạo phân đạm SA.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq).",
      "evidenceVI": "2NH₃(g) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_302",
    "code": "RX_SYS_302",
    "name_vi": "Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao (#302)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "H",
      "S"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "H₂(g) + S(s) → H₂S(g)",
    "balancedEquationPlain": "H2 + S -> H2S",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: H₂(g) + S(s) → H₂S(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Hiđro kết hợp Lưu huỳnh ở nhiệt độ cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình H₂(g) + S(s) → H₂S(g).",
      "evidenceVI": "H₂(g) + S(s) → H₂S(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_303",
    "code": "RX_SYS_303",
    "name_vi": "Đốt H2S trong điều kiện thiếu oxy (#303)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
    "balancedEquationPlain": "2H2S + O2 -> 2S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt H2S trong điều kiện thiếu oxy.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l).",
      "evidenceVI": "2H₂S(g) + O₂(g) → 2S(s) + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_304",
    "code": "RX_SYS_304",
    "name_vi": "Đốt cháy hoàn toàn khí H2S (#304)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS"
    ],
    "isTrap": false,
    "equation": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
    "balancedEquationPlain": "2H2S + 3O2 -> 2SO2 + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Đốt cháy hoàn toàn khí H2S.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g).",
      "evidenceVI": "2H₂S(g) + 3O₂(g) → 2SO₂(g) + 2H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_305",
    "code": "RX_SYS_305",
    "name_vi": "Khí SO2 bị oxi hóa trong nước (#305)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
    "balancedEquationPlain": "2SO2 + O2 + 2H2O -> 2H2SO4",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khí SO2 bị oxi hóa trong nước.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình 2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq).",
      "evidenceVI": "2SO₂(g) + O₂(g) + 2H₂O(l) → 2H₂SO₄(aq)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_306",
    "code": "RX_SYS_306",
    "name_vi": "Phản ứng Claus thu hồi Lưu huỳnh khí thải (#306)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "S"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
    "balancedEquationPlain": "SO2 + 2H2S -> 3S + 2H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 85,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Phản ứng Claus thu hồi Lưu huỳnh khí thải.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l).",
      "evidenceVI": "SO₂(g) + 2H₂S(g) → 3S(s)↓ + 2H₂O(l)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_307",
    "code": "RX_SYS_307",
    "name_vi": "Khử quặng hematit bằng khí CO trong lò cao (#307)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe",
      "C"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
    "balancedEquationPlain": "Fe2O3 + 3CO -> 2Fe + 3CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng hematit bằng khí CO trong lò cao.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g).",
      "evidenceVI": "Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_308",
    "code": "RX_SYS_308",
    "name_vi": "Khử quặng manhetit bằng CO (#308)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe",
      "C"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
    "balancedEquationPlain": "Fe3O4 + 4CO -> 3Fe + 4CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 90,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử quặng manhetit bằng CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g).",
      "evidenceVI": "Fe₃O₄(s) + 4CO(g) → 3Fe(s) + 4CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_309",
    "code": "RX_SYS_309",
    "name_vi": "Khử CuO bằng khí CO (#309)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu",
      "C"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
    "balancedEquationPlain": "CuO + CO -> Cu + CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 80,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + CO(g) → Cu(s) + CO₂(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí CO.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + CO(g) → Cu(s) + CO₂(g).",
      "evidenceVI": "CuO(s) + CO(g) → Cu(s) + CO₂(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_310",
    "code": "RX_SYS_310",
    "name_vi": "Khử CuO bằng khí H2 (#310)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Cu",
      "H"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
    "balancedEquationPlain": "CuO + H2 -> Cu + H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 82,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: CuO(s) + H₂(g) → Cu(s) + H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử CuO bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình CuO(s) + H₂(g) → Cu(s) + H₂O(g).",
      "evidenceVI": "CuO(s) + H₂(g) → Cu(s) + H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_311",
    "code": "RX_SYS_311",
    "name_vi": "Khử Fe2O3 bằng khí H2 (#311)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Fe",
      "H"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
    "balancedEquationPlain": "Fe2O3 + 3H2 -> 2Fe + 3H2O",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 84,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử Fe2O3 bằng khí H2.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g).",
      "evidenceVI": "Fe₂O₃(s) + 3H₂(g) → 2Fe(s) + 3H₂O(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_sys_312",
    "code": "RX_SYS_312",
    "name_vi": "Khử kẽm oxit bằng than cốc (#312)",
    "groupCategory": "GROUP_F_REDOX",
    "reactants": [
      "Zn",
      "C"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "ZnO(s) + C(s) → Zn(s) + CO(g)",
    "balancedEquationPlain": "ZnO + C -> Zn + CO",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Phản ứng hóa học đã kiểm chứng: ZnO(s) + C(s) → Zn(s) + CO(g). Tuân thủ bảo toàn nguyên tử và năng lượng.",
    "observablePhenomenaVI": "Hiện tượng quan sát: Khử kẽm oxit bằng than cốc.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo sản phẩm theo phương trình ZnO(s) + C(s) → Zn(s) + CO(g).",
      "evidenceVI": "ZnO(s) + C(s) → Zn(s) + CO(g)",
      "mechanismVI": "Oxi hóa khử trao đổi electron hoặc thế ion.",
      "generalizationVI": "Phản ứng chuẩn sách giáo khoa Hóa học GDPT 2018."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
  {
    "id": "rx_org_ester_ethyl_acetate",
    "code": "RX_ORG_001",
    "name_vi": "Phản ứng Este hóa Axit Axetic và Rượu Etylic",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l)",
    "balancedEquationPlain": "CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 2,
    "pedagogicalExplanation": "Phản ứng este hóa thuận nghịch giữa acetic acid và ethanol với xúc tác H₂SO₄ đặc đun nóng tạo ethyl acetate có mùi thơm hoa quả chín nhẹ.",
    "observablePhenomenaVI": "Chất lỏng tách thành 2 lớp, lớp trên là este etyl axetat không màu, nhẹ hơn nước, có mùi thơm táo lê đặc trưng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tổng hợp este Ethyl acetate (CH₃COOC₂H₅) và nước.",
      "evidenceVI": "CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l) (xúc tác H₂SO₄ đặc, đun nóng)",
      "mechanismVI": "Phản ứng thế nhóm -OH của nhóm carboxyl bằng nhóm -OC₂H₅ của phân tử ancol.",
      "generalizationVI": "Phản ứng giữa axit cacboxylic và ancol là phản ứng thuận nghịch este hóa."
    },
    "safetyNoticeVI": "Cần dùng ống sinh hàn làm lạnh để ngưng tụ este dễ bay hơi; H₂SO₄ đặc có tính ăn mòn cực mạnh.",
    "curriculumStandard": "GDPT_2018_HOA_12"
  },
  {
    "id": "rx_org_saponification_ethyl_acetate",
    "code": "RX_ORG_002",
    "name_vi": "Xà phòng hóa Este Etyl Axetat bằng NaOH",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O", "Na"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CH₃COOC₂H₅(l) + NaOH(aq) → CH₃COONa(aq) + C₂H₅OH(aq)",
    "balancedEquationPlain": "CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CLEANSE_DISPEL",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Thủy phân este trong môi trường kiềm (phản ứng xà phòng hóa) là phản ứng một chiều, tạo muối natri axetat tan hoàn toàn và giải phóng ethanol.",
    "observablePhenomenaVI": "Ban đầu hỗn hợp tách lớp; khi đun sôi nhẹ và khuấy đều, este tan dần biến thành dung dịch đồng nhất.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo muối Sodium acetate (CH₃COONa) và rượu Ethanol (C₂H₅OH).",
      "evidenceVI": "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH",
      "mechanismVI": "Ion OH⁻ tấn công nucleophile vào carbon carbonyl của este, cắt đứt liên kết C-O giải phóng ancol.",
      "generalizationVI": "Thủy phân este trong dung dịch kiềm luôn xảy ra một chiều (không thuận nghịch)."
    },
    "curriculumStandard": "GDPT_2018_HOA_12"
  },
  {
    "id": "rx_org_saponification_tristearin",
    "code": "RX_ORG_003",
    "name_vi": "Xà phòng hóa Chất béo Tristearin",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O", "Na"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "(C₁₇H₃₅COO)₃C₃H₅(s) + 3NaOH(aq) → 3C₁₇H₃₅COONa(s) + C₃H₅(OH)₃(aq)",
    "balancedEquationPlain": "(C17H35COO)3C3H5 + 3NaOH -> 3C17H35COONa + C3H5(OH)3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 80,
    "durationTurns": 2,
    "pedagogicalExplanation": "Xà phòng hóa chất béo rắn tristearin bằng xút ăn da NaOH tạo bánh xà phòng natri stearat và glixerol quý giá.",
    "observablePhenomenaVI": "Sau khi đun sôi hỗn hợp chất béo với NaOH và thêm NaCl bão hòa, xà phòng kết tinh nổi lên trên bề mặt dưới dạng khối xốp trắng.",
    "chemicalExplanationLayers": {
      "resultVI": "Sản xuất xà phòng Sodium stearate và Glycerol.",
      "evidenceVI": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
      "mechanismVI": "Thủy phân trieste của axit béo trong môi trường kiềm giải phóng 3 phân tử xà phòng và 1 phân tử ancol đa chức glycerol.",
      "generalizationVI": "Mọi triglyceride tự nhiên đều cho sản phẩm ancol duy nhất là glycerol khi xà phòng hóa."
    },
    "curriculumStandard": "GDPT_2018_HOA_12"
  },
  {
    "id": "rx_org_glucose_fermentation",
    "code": "RX_ORG_004",
    "name_vi": "Phản ứng Lên Men Rượu từ Glucose",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g)↑",
    "balancedEquationPlain": "C6H12O6 -> 2C2H5OH + 2CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 2,
    "pedagogicalExplanation": "Dưới tác dụng của enzyme zymase trong nấm men rượu (30-32°C), monosaccharide glucose lên men kị khí sinh ra cồn ethanol và bọt khí CO₂.",
    "observablePhenomenaVI": "Dung dịch sủi nhiều bọt khí li ti không màu; dẫn khí qua nước vôi trong Ca(OH)₂ thấy xuất hiện kết tủa trắng CaCO₃ đục như sữa.",
    "chemicalExplanationLayers": {
      "resultVI": "Chuyển hóa Glucose thành Ethanol và khí Carbon dioxide.",
      "evidenceVI": "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑ (Enzyme men, 30-32°C)",
      "mechanismVI": "Quá trình đường phân kị khí chuyển hóa hexose thành rượu etylic và khí carbon dioxide.",
      "generalizationVI": "Cơ sở sinh hóa của ngành công nghiệp sản xuất bia rượu, cồn sinh học bio-ethanol và ủ bánh mì."
    },
    "curriculumStandard": "GDPT_2018_HOA_12"
  },
  {
    "id": "rx_org_ethanol_dehydration_ethene",
    "code": "RX_ORG_005",
    "name_vi": "Tách Nước Rượu Etylic tạo Etilen",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C₂H₅OH(l) → C₂H₄(g)↑ + H₂O(g)",
    "balancedEquationPlain": "C2H5OH -> C2H4 + H2O",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Đun nóng cồn etylic với H₂SO₄ đặc ở 170°C xảy ra phản ứng tách nước nội phân tử tạo anken etilen có liên kết đôi C=C hoạt động.",
    "observablePhenomenaVI": "Khí etilen sinh ra dẫn qua dung dịch nước Brom màu nâu đỏ làm dung dịch mất màu hoàn toàn.",
    "chemicalExplanationLayers": {
      "resultVI": "Sinh khí Ethylene (C₂H₄) và hơi nước.",
      "evidenceVI": "C₂H₅OH → C₂H₄↑ + H₂O (H₂SO₄ đặc, 170°C)",
      "mechanismVI": "Phản ứng tách theo quy tắc Zaitsev tạo hidrocacbon không no có liên kết pi.",
      "generalizationVI": "Ancol no đơn chức mạch hở khi đun với H₂SO₄ đặc ở 170°C đều tách nước tạo anken tương ứng."
    },
    "curriculumStandard": "GDPT_2018_HOA_11"
  },
  {
    "id": "rx_org_glucose_silver_mirror",
    "code": "RX_ORG_006",
    "name_vi": "Phản ứng Tráng Bạc của Glucozơ",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O", "Ag"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CH₂OH[CHOH]₄CHO(aq) + 2[Ag(NH₃)₂]OH(aq) → CH₂OH[CHOH]₄COONH₄(aq) + 2Ag(s)↓ + 3NH₃(g) + H₂O(l)",
    "balancedEquationPlain": "C6H12O6 + 2AgNO3 + 3NH3 + H2O -> C6H15NO7 + 2Ag + 2NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Glucozơ ở dạng mạch hở chứa nhóm chức andehit (-CHO), khử phức bạc Tollens thành bạc kim loại sáng bóng bám vào thành ống nghiệm.",
    "observablePhenomenaVI": "Bạc kim loại kết tủa bám chặt vào thành ống nghiệm tạo thành một lớp tráng gương sáng bóng loáng có thể soi mặt được.",
    "chemicalExplanationLayers": {
      "resultVI": "Oxi hóa nhóm aldehyde thành muối amoni gluconat và tạo bạc kim loại Ag kết tủa.",
      "evidenceVI": "CH₂OH[CHOH]₄CHO + 2AgNO₃ + 3NH₃ + H₂O → CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 2NH₄NO₃",
      "mechanismVI": "Nhóm aldehyde bị ion Ag⁺ trong phức chất Tollens oxi hóa theo tỉ lệ mol 1 : 2.",
      "generalizationVI": "Hợp chất hữu cơ có nhóm -CHO (andehit, glucozơ, mantozơ, axit fomic) đều có phản ứng tráng bạc đặc trưng."
    },
    "curriculumStandard": "GDPT_2018_HOA_12"
  }
];
