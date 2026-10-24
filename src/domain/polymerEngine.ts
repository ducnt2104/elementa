// src/domain/polymerEngine.ts
// Comprehensive Polymerization, Macromolecules & Condensation Kinetics Engine
// Conforming to Vietnam GDPT 2018 Chemistry 12 (Chương 4: Polime và Vật liệu Polime) & IUPAC Standards

export type PolymerizationType = 'ADDITION' | 'CONDENSATION';
export type PolymerSpatialStructure = 'LINEAR' | 'BRANCHED' | 'NETWORK_3D';
export type PolymerApplicationCategory = 'PLASTIC' | 'FIBER_TEXTILE' | 'RUBBER' | 'ADHESIVE';
export type PolymerOrigin = 'SYNTHETIC' | 'NATURAL' | 'SEMI_SYNTHETIC';

export interface PolymerMonomer {
  nameVI: string;
  nameIUPAC: string;
  formula: string;
  molarMass: number; // g / mol
  reactiveGroupVI: string; // e.g. "Liên kết đôi C=C", "Nhóm -NH2 và -COOH", "Hai nhóm -OH kề"
}

export interface PolymerDefinition {
  id: string;
  nameVI: string;
  nameIUPAC: string;
  tradeOrCommonNameVI: string;
  polymerizationType: PolymerizationType;
  spatialStructure: PolymerSpatialStructure;
  origin: PolymerOrigin;
  applicationCategory: PolymerApplicationCategory;
  monomers: PolymerMonomer[];
  repeatingUnitFormula: string; // e.g. "[-CH2-CH2-]"
  repeatingUnitMolarMass: number; // g / mol
  reactionEquationVI: string;
  reactionConditionsVI: string;
  smallMoleculeByproduct?: string; // e.g. "H2O" for condensation, undefined for addition
  keyPhysicalPropertiesVI: string[];
  industrialApplicationsVI: string[];
  pedagogicalKeyPointsVI: string[];
  curriculumGrade: 'HOA_12';
}

export const CURRICULUM_POLYMERS: Record<string, PolymerDefinition> = {
  polyethylene: {
    id: 'polyethylene',
    nameVI: 'Polietilen (Nhựa PE)',
    nameIUPAC: 'Poly(ethen) / Polyethylene',
    tradeOrCommonNameVI: 'Nhựa PE (Chất dẻo phổ biến nhất thế giới)',
    polymerizationType: 'ADDITION',
    spatialStructure: 'LINEAR',
    origin: 'SYNTHETIC',
    applicationCategory: 'PLASTIC',
    monomers: [
      {
        nameVI: 'Etilen (Ethen)',
        nameIUPAC: 'ethen',
        formula: 'CH2=CH2',
        molarMass: 28.05,
        reactiveGroupVI: 'Liên kết đôi C=C kém bền dễ mở vòng'
      }
    ],
    repeatingUnitFormula: '[-CH2-CH2-]',
    repeatingUnitMolarMass: 28.05,
    reactionEquationVI: 'n CH₂=CH₂ ⎯⎯⎯⎯→ [-CH₂-CH₂-]ₙ  (trùng hợp, t°, p, xt)',
    reactionConditionsVI: 'Nhiệt độ 100-300°C, áp suất 100-2000 atm, xúc tác Ziegler-Natta hoặc peoxit',
    keyPhysicalPropertiesVI: [
      'Chất rắn màu trắng hơi trong, không dẫn điện, không dẫn nhiệt',
      'Không thấm nước, không thấm khí, trơ với axit, kiềm và nước brom',
      'Nhiệt độ nóng chảy khoảng 110-120°C, nhẹ hơn nước (d ≈ 0.92-0.95 g/cm³)'
    ],
    industrialApplicationsVI: [
      'Sản xuất màng bọc thực phẩm, túi nilon, màng phủ nông nghiệp',
      'Bình chứa hóa chất, ống dẫn nước gia dụng, vật liệu cách điện cáp điện'
    ],
    pedagogicalKeyPointsVI: [
      'Phản ứng trùng hợp chỉ xảy ra khi monome có liên kết đôi C=C.',
      'Khối lượng mol của một đoạn mạch polime phụ thuộc vào hệ số trùng hợp n: M_polime = n × 28 g/mol.',
      'Cấu trúc mạch không phân nhánh tạo độ bền cơ học cao.'
    ],
    curriculumGrade: 'HOA_12'
  },

  polyvinyl_chloride: {
    id: 'polyvinyl_chloride',
    nameVI: 'Poli(vinyl clorua) (Nhựa PVC)',
    nameIUPAC: 'Poly(1-chloroethene) / Polyvinyl chloride',
    tradeOrCommonNameVI: 'Nhựa PVC',
    polymerizationType: 'ADDITION',
    spatialStructure: 'LINEAR',
    origin: 'SYNTHETIC',
    applicationCategory: 'PLASTIC',
    monomers: [
      {
        nameVI: 'Vinyl clorua (Cloeten)',
        nameIUPAC: 'chloroethene',
        formula: 'CH2=CH-Cl',
        molarMass: 62.5,
        reactiveGroupVI: 'Liên kết đôi C=C đính nguyên tử Clo'
      }
    ],
    repeatingUnitFormula: '[-CH2-CH(Cl)-]',
    repeatingUnitMolarMass: 62.5,
    reactionEquationVI: 'n CH₂=CH-Cl ⎯⎯⎯⎯→ [-CH₂-CH(Cl)-]ₙ  (trùng hợp, t°, p, xt)',
    reactionConditionsVI: 'Nhiệt độ 40-60°C, áp suất nhẹ, xúc tác peoxit hữu cơ',
    keyPhysicalPropertiesVI: [
      'Chất rắn vô định hình, cách điện tốt, bền nhiệt hơn PE',
      'Hàm lượng clo chiếm tới 56.8% khối lượng phân tử',
      'Bị phân hủy giải phóng khí HCl độc hại khi đốt cháy ở nhiệt độ cao'
    ],
    industrialApplicationsVI: [
      'Sản xuất ống dẫn nước PVC, máng xối, ống bọc dây điện dân dụng',
      'Làm vật liệu sàn nhựa vinyl, da nhân tạo, áo mưa, màng bọc cách điện'
    ],
    pedagogicalKeyPointsVI: [
      'Hàm lượng % khối lượng của Clo trong PVC: %Cl = 35.5 / 62.5 × 100% = 56.8%.',
      'Khi clo hóa PVC (sản xuất tơ clorin), clo phản ứng thế nguyên tử H trên mạch polime.',
      'PVC cứng; khi trộn thêm chất hóa dẻo (như đioctyl phtalat) sẽ thu được PVC mềm làm da nhân tạo.'
    ],
    curriculumGrade: 'HOA_12'
  },

  teflon_ptfe: {
    id: 'teflon_ptfe',
    nameVI: 'Teflon (Poli(tetrafloetilen) - Vua Của Chất Dẻo)',
    nameIUPAC: 'Poly(tetrafluoroethene) / PTFE',
    tradeOrCommonNameVI: 'Chất chống dính Teflon',
    polymerizationType: 'ADDITION',
    spatialStructure: 'LINEAR',
    origin: 'SYNTHETIC',
    applicationCategory: 'PLASTIC',
    monomers: [
      {
        nameVI: 'Tetrafloetilen',
        nameIUPAC: 'tetrafluoroethene',
        formula: 'CF2=CF2',
        molarMass: 100.02,
        reactiveGroupVI: 'Liên kết đôi C=C gắn 4 nguyên tử Flo có độ âm điện cực đại'
      }
    ],
    repeatingUnitFormula: '[-CF2-CF2-]',
    repeatingUnitMolarMass: 100.02,
    reactionEquationVI: 'n CF₂=CF₂ ⎯⎯⎯⎯→ [-CF₂-CF₂-]ₙ  (trùng hợp, t°, p, xt)',
    reactionConditionsVI: 'Áp suất cao, chất khơi mào persulfat',
    keyPhysicalPropertiesVI: [
      'Hệ số ma sát cực nhỏ (chỉ ~0.04), trơn trượt vô song',
      'Trơ tuyệt đối với mọi hóa chất: không bị axit sunfuric đặc, axit nitric, hay nước cường toan ăn mòn',
      'Chịu nhiệt vượt trội lên đến trên 260-327°C mà không bị biến tính'
    ],
    industrialApplicationsVI: [
      'Lớp tráng chống dính trên lòng chảo chiên rán, nồi cơm điện cao cấp',
      'Gioăng làm kín, đệm trục quay máy bay, tàu vũ trụ, van dẫn hóa chất siêu ăn mòn'
    ],
    pedagogicalKeyPointsVI: [
      'Liên kết C-F là một trong những liên kết đơn bền vững nhất trong hóa học hữu cơ (năng lượng liên kết ~485 kJ/mol).',
      'Được coi là "Vua của chất dẻo" nhờ độ trơ hóa học tuyệt đối và hệ số ma sát nhỏ nhất trong mọi vật liệu rắn.'
    ],
    curriculumGrade: 'HOA_12'
  },

  pmma_plexiglas: {
    id: 'pmma_plexiglas',
    nameVI: 'Plexiglas (Thủy Tinh Hữu Cơ - PMMA)',
    nameIUPAC: 'Poly(methyl methacrylate) / PMMA',
    tradeOrCommonNameVI: 'Thủy tinh hữu cơ Plexiglas',
    polymerizationType: 'ADDITION',
    spatialStructure: 'LINEAR',
    origin: 'SYNTHETIC',
    applicationCategory: 'PLASTIC',
    monomers: [
      {
        nameVI: 'Metyl metacrylat',
        nameIUPAC: 'methyl 2-methylpropenoate',
        formula: 'CH2=C(CH3)-COOCH3',
        molarMass: 100.12,
        reactiveGroupVI: 'Liên kết đôi C=C của este chưa no'
      }
    ],
    repeatingUnitFormula: '[-CH2-C(CH3)(COOCH3)-]',
    repeatingUnitMolarMass: 100.12,
    reactionEquationVI: 'n CH₂=C(CH₃)COOCH₃ ⎯⎯⎯⎯→ [-CH₂-C(CH₃)(COOCH₃)-]ₙ  (trùng hợp, t°, xt)',
    reactionConditionsVI: 'Nhiệt độ 60-80°C, xúc tác peoxit benzoat',
    keyPhysicalPropertiesVI: [
      'Trong suốt tuyệt vời, cho khoảng 92-93% ánh sáng nhìn thấy truyền qua (trong hơn cả thủy tinh silicat thường)',
      'Nhẹ bằng 1/2 thủy tinh silicat, khó vỡ vụn khi va đập cơ học',
      'Dễ uốn nặn khi đun nóng, dễ gia công cắt gọt chính xác'
    ],
    industrialApplicationsVI: [
      'Kính chắn gió máy bay phản lực, kính buồng lái trực thăng, kính ô tô cao cấp',
      'Kính bảo hộ lao động, kính hiển vi, răng giả trong nha khoa, bể cá thủy sinh khổng lồ'
    ],
    pedagogicalKeyPointsVI: [
      'Monome metyl metacrylat được điều chế từ phản ứng este hóa giữa axit metacrylic CH₂=C(CH₃)COOH và metanol CH₃OH.',
      'Khác với thủy tinh vô cơ silicat (SiO₂), thủy tinh hữu cơ có thể cưa, khoan, mài và tạo hình nhiệt dễ dàng.'
    ],
    curriculumGrade: 'HOA_12'
  },

  nylon_66: {
    id: 'nylon_66',
    nameVI: 'Nilon-6,6 (Tơ Poliamit Điển Hình)',
    nameIUPAC: 'Poly(hexamethylene adipamide) / Nylon-6,6',
    tradeOrCommonNameVI: 'Tơ Nilon-6,6',
    polymerizationType: 'CONDENSATION',
    spatialStructure: 'LINEAR',
    origin: 'SYNTHETIC',
    applicationCategory: 'FIBER_TEXTILE',
    monomers: [
      {
        nameVI: 'Hexametylendiamin (1,6-diaminohexan)',
        nameIUPAC: 'hexane-1,6-diamine',
        formula: 'H2N-(CH2)6-NH2',
        molarMass: 116.21,
        reactiveGroupVI: 'Hai nhóm amin bậc một -NH2 ở hai đầu mạch'
      },
      {
        nameVI: 'Axit ađipic (Axit hexandioic)',
        nameIUPAC: 'hexanedioic acid',
        formula: 'HOOC-(CH2)4-COOH',
        molarMass: 146.14,
        reactiveGroupVI: 'Hai nhóm cacboxyl -COOH ở hai đầu mạch'
      }
    ],
    repeatingUnitFormula: '[-NH-(CH2)6-NH-CO-(CH2)4-CO-]',
    repeatingUnitMolarMass: 226.32,
    reactionEquationVI: 'n H₂N-(CH₂)₆-NH₂ + n HOOC-(CH₂)₄-COOH ⎯⎯⎯⎯→ [-NH-(CH₂)₆-NH-CO-(CH₂)₄-CO-]ₙ + 2n H₂O  (trùng ngưng, t°, p)',
    reactionConditionsVI: 'Nhiệt độ 280°C, áp suất khí trơ loại bỏ nước liên tục',
    smallMoleculeByproduct: 'H2O',
    keyPhysicalPropertiesVI: [
      'Sợi dai bền, mềm mại, óng mượt như tơ tằm, đàn hồi cao, ít thấm nước',
      'Chứa liên kết peptit/amit (-CO-NH-) nên kém bền trong môi trường axit mạnh và kiềm mạnh (bị thủy phân)',
      'Nhiệt độ nóng chảy cao (~265°C)'
    ],
    industrialApplicationsVI: [
      'Dệt vải lụa may mặc cao cấp, tất sợi tổng hợp, dây dù cứu sinh, chỉ khâu phẫu thuật',
      'Sản xuất dây cáp kéo tàu, dây cước câu cá, lưới đánh cá, màng bọc chống xé rách'
    ],
    pedagogicalKeyPointsVI: [
      'Tên gọi "6,6" bắt nguồn từ số lượng 6 nguyên tử cacbon có trong mỗi monome (hexametylendiamin có 6C và axit ađipic có 6C).',
      'Đây là phản ứng TRÙNG NGƯNG vì giải phóng phân tử nhỏ H₂O bên cạnh mạch polime.',
      'Do chứa liên kết amit -CO-NH-, quần áo dệt bằng nilon không nên giặt bằng xà phòng có độ kiềm cao hoặc phơi dưới ánh nắng gắt.'
    ],
    curriculumGrade: 'HOA_12'
  },

  terylene_lapsan: {
    id: 'terylene_lapsan',
    nameVI: 'Tơ Lapsan / PET (Poli(etylen terephtalat))',
    nameIUPAC: 'Poly(ethylene terephthalate) / PET',
    tradeOrCommonNameVI: 'Tơ Lapsan (Polyester) & Nhựa chai PET',
    polymerizationType: 'CONDENSATION',
    spatialStructure: 'LINEAR',
    origin: 'SYNTHETIC',
    applicationCategory: 'FIBER_TEXTILE',
    monomers: [
      {
        nameVI: 'Axit terephtalic (p-axit benzenđicacboxylic)',
        nameIUPAC: 'benzene-1,4-dicarboxylic acid',
        formula: 'p-HOOC-C6H4-COOH',
        molarMass: 166.13,
        reactiveGroupVI: 'Hai nhóm -COOH đối xứng vị trí para trên vòng benzen'
      },
      {
        nameVI: 'Etylen glicol (Etan-1,2-điol)',
        nameIUPAC: 'ethane-1,2-diol',
        formula: 'HO-CH2-CH2-OH',
        molarMass: 62.07,
        reactiveGroupVI: 'Hai nhóm -OH ở hai đầu mạch ancol'
      }
    ],
    repeatingUnitFormula: '[-OC-C6H4-CO-O-CH2-CH2-O-]',
    repeatingUnitMolarMass: 192.17,
    reactionEquationVI: 'n p-HOOC-C₆H₄-COOH + n HO-CH₂-CH₂-OH ⎯⎯⎯⎯→ [-OC-C₆H₄-CO-O-CH₂-CH₂-O-]ₙ + 2n H₂O  (trùng ngưng, t°, xt)',
    reactionConditionsVI: 'Nhiệt độ 200-280°C, xúc tác antimon trioxit Sb2O3',
    smallMoleculeByproduct: 'H2O',
    keyPhysicalPropertiesVI: [
      'Chứa liên kết este (-COO-) nên thuộc loại tơ Polieste',
      'Sợi cực kỳ bền cơ học, bền nhiệt, không bị nhăn nhàu khi giặt, giữ nếp ly quần áo hoàn hảo',
      'Bền với ánh sáng và nấm mốc hơn tơ tự nhiên'
    ],
    industrialApplicationsVI: [
      'Dệt vải may mặc polyester cao cấp, vải bạt buồm, lều trại, rèm cửa',
      'Thổi thành chai nhựa đựng nước giải khát, nước khoáng, dầu ăn (nhựa ký hiệu PET 1)'
    ],
    pedagogicalKeyPointsVI: [
      'Tơ Lapsan thuộc loại tơ polieste (chứa liên kết este -COO-), khác với nilon thuộc loại poliamit (chứa liên kết amit -CO-NH-).',
      'Khi đun nóng với dung dịch kiềm, tơ lapsan bị thủy phân liên kết este tạo muối terephtalat và etylen glicol.'
    ],
    curriculumGrade: 'HOA_12'
  },

  buna_rubber: {
    id: 'buna_rubber',
    nameVI: 'Cao Su Buna (Poli(buta-1,3-đien))',
    nameIUPAC: 'Poly(buta-1,3-diene) / Polybutadiene',
    tradeOrCommonNameVI: 'Cao su nhân tạo Buna',
    polymerizationType: 'ADDITION',
    spatialStructure: 'LINEAR',
    origin: 'SYNTHETIC',
    applicationCategory: 'RUBBER',
    monomers: [
      {
        nameVI: 'Buta-1,3-đien (Đivinyl)',
        nameIUPAC: 'buta-1,3-diene',
        formula: 'CH2=CH-CH=CH2',
        molarMass: 54.09,
        reactiveGroupVI: 'Hệ liên kết đôi liên hợp C=C-C=C'
      }
    ],
    repeatingUnitFormula: '[-CH2-CH=CH-CH2-]',
    repeatingUnitMolarMass: 54.09,
    reactionEquationVI: 'n CH₂=CH-CH=CH₂ ⎯⎯⎯⎯→ [-CH₂-CH=CH-CH₂-]ₙ  (trùng hợp 1,4, Na, t°, p)',
    reactionConditionsVI: 'Nhiệt độ, áp suất, xúc tác Natri kim loại (Na)',
    keyPhysicalPropertiesVI: [
      'Tính đàn hồi cao, tính chống mài mòn tốt',
      'Trong mắt xích polime vẫn còn liên kết đôi C=C chưa phản ứng nên có thể tham gia phản ứng cộng brom hoặc lưu hóa với lưu huỳnh'
    ],
    industrialApplicationsVI: [
      'Sản xuất lốp xe ô tô tải, đế giày dép, băng tải công nghiệp, ống mềm cao su'
    ],
    pedagogicalKeyPointsVI: [
      'Tên gọi "Buna" ghép từ Buta-1,3-đien và kim loại Natri (Na) đóng vai trò chất xúc tác lịch sử.',
      'Phản ứng trùng hợp cộng theo kiểu 1,4: hai liên kết đôi ở hai đầu gộp lại tạo liên kết đôi mới ở giữa vị trí C2=C3.'
    ],
    curriculumGrade: 'HOA_12'
  },

  vulcanized_rubber: {
    id: 'vulcanized_rubber',
    nameVI: 'Cao Su Lưu Hóa (Mạng Không Gian 3 Chiều Với Cầu Nối -S-S-)',
    nameIUPAC: 'Cross-linked Polyisoprene / Vulcanized Rubber',
    tradeOrCommonNameVI: 'Cao su lưu hóa (Lốp xe chịu tải)',
    polymerizationType: 'ADDITION', // Cross-linking addition
    spatialStructure: 'NETWORK_3D',
    origin: 'SEMI_SYNTHETIC',
    applicationCategory: 'RUBBER',
    monomers: [
      {
        nameVI: 'Cao su thô (Polyisopren hoặc Polybutadien) + Lưu huỳnh (S)',
        nameIUPAC: 'polyisoprene + sulfur',
        formula: '[-CH2-C(CH3)=CH-CH2-]n + S',
        molarMass: 68.12,
        reactiveGroupVI: 'Liên kết đôi C=C phản ứng cộng với lưu huỳnh tạo cầu nối disunfua'
      }
    ],
    repeatingUnitFormula: 'Mạng lưới không gian liên kết bởi các cầu nối đisunfua [-S-S-]',
    repeatingUnitMolarMass: 68.12,
    reactionEquationVI: 'Mạch cao su thẳng + S (đun 130-150°C) ⎯⎯⎯⎯→ Mạng lưới không gian có cầu nối -S-S-',
    reactionConditionsVI: 'Trộn 3-5% lưu huỳnh bột vào cao su thô, đun nóng ở 130-150°C trong khuôn ép',
    keyPhysicalPropertiesVI: [
      'Độ đàn hồi cao gấp nhiều lần cao su thô',
      'Khó tan trong xăng và các dung môi hữu cơ thông thường (chỉ bị trương nở)',
      'Lâu mòn, chịu nhiệt tốt hơn, không bị dính nhớp khi trời nóng và không bị giòn khi trời lạnh'
    ],
    industrialApplicationsVI: [
      'Lốp xe ô tô, máy bay, xe máy chịu tải trọng và ma sát cực lớn',
      'Đệm cao su chống động đất cho móng cầu và tòa nhà chọc trời'
    ],
    pedagogicalKeyPointsVI: [
      'Phát minh tình cờ vĩ đại của Charles Goodyear năm 1839 khi đánh rơi cao su và lưu huỳnh lên bếp lò nóng.',
      'Cầu nối đisunfua -S-S- biến các sợi polime mạch thẳng trượt lên nhau thành một mạng không gian 3 chiều đồng nhất.'
    ],
    curriculumGrade: 'HOA_12'
  },

  nitron_olon: {
    id: 'nitron_olon',
    nameVI: 'Tơ Nitron / Olon (Poliacrilonitrin)',
    nameIUPAC: 'Poly(acrylonitrile) / PAN',
    tradeOrCommonNameVI: 'Tơ Nitron (Len nhân tạo)',
    polymerizationType: 'ADDITION',
    spatialStructure: 'LINEAR',
    origin: 'SYNTHETIC',
    applicationCategory: 'FIBER_TEXTILE',
    monomers: [
      {
        nameVI: 'Acrilonitrin (Vinyl xianua)',
        nameIUPAC: 'prop-2-enenitrile',
        formula: 'CH2=CH-CN',
        molarMass: 53.06,
        reactiveGroupVI: 'Liên kết đôi C=C gắn nhóm xiano -CN'
      }
    ],
    repeatingUnitFormula: '[-CH2-CH(CN)-]',
    repeatingUnitMolarMass: 53.06,
    reactionEquationVI: 'n CH₂=CH-CN ⎯⎯⎯⎯→ [-CH₂-CH(CN)-]ₙ  (trùng hợp, t°, p, xt)',
    reactionConditionsVI: 'Nhiệt độ, xúc tác peoxit trong dung dịch nước',
    keyPhysicalPropertiesVI: [
      'Khả năng giữ nhiệt vượt trội (ấm hơn cả len lông cừu tự nhiên)',
      'Bền với ánh sáng mặt trời, axit và thời tiết ngoài trời',
      'Sợi dai, nhẹ và xốp mềm'
    ],
    industrialApplicationsVI: [
      'Dệt áo len, khăn quàng cổ ấm, chăn đông nhân tạo, vải bạt che phủ',
      'Tiền chất (Precursor) để nung nhiệt phân sản xuất sợi cacbon siêu nhẹ siêu bền (Carbon fiber)'
    ],
    pedagogicalKeyPointsVI: [
      'Monome acrilonitrin có tên gọi khác là vinyl xianua (CH₂=CH-CN).',
      'Tơ nitron là nguyên liệu số một để chế tạo sợi cacbon dùng trong vỏ máy bay phản lực Boeing 787 và gậy đánh golf.'
    ],
    curriculumGrade: 'HOA_12'
  },

  bakelite_rezit: {
    id: 'bakelite_rezit',
    nameVI: 'Nhựa Rezit (Bakelite - Nhựa Phenol-Fomanđehit Mạng Không Gian)',
    nameIUPAC: 'Phenol-formaldehyde resin (Resite)',
    tradeOrCommonNameVI: 'Nhựa Bakelite (Chất dẻo nhiệt rắn đầu tiên)',
    polymerizationType: 'CONDENSATION',
    spatialStructure: 'NETWORK_3D',
    origin: 'SYNTHETIC',
    applicationCategory: 'PLASTIC',
    monomers: [
      {
        nameVI: 'Phenol + Fomanđehit',
        nameIUPAC: 'phenol + methanal',
        formula: 'C6H5OH + HCHO',
        molarMass: 94.11,
        reactiveGroupVI: 'Vị trí ortho/para của nhân phenol phản ứng ngưng tụ với nhóm cacbonyl của HCHO'
      }
    ],
    repeatingUnitFormula: 'Mạng lưới 3D gồm các nhân benzen liên kết qua cầu nối metylen [-CH2-]',
    repeatingUnitMolarMass: 106.12,
    reactionEquationVI: 'Phenol + HCHO (dư kiềm) ⎯⎯→ Nhựa Rezol ⎯⎯⎯→ Nhựa Rezit (Bakelite mạng 3D, t°=150°C)',
    reactionConditionsVI: 'Đun nóng rezol ở khoảng 150°C để các nhóm -CH2OH ngưng tụ tạo mạng không gian',
    smallMoleculeByproduct: 'H2O',
    keyPhysicalPropertiesVI: [
      'Là chất dẻo nhiệt rắn (thermoset): không nóng chảy khi đun nóng mà chỉ bị cháy cacbon hóa',
      'Độ cứng cao, cách điện và cách nhiệt tuyệt hảo, chống cháy'
    ],
    industrialApplicationsVI: [
      'Sản xuất vỏ phích cắm điện thoại cổ điển, công tắc điện dân dụng, tay cầm chảo chống cháy',
      'Bảng mạch in điện tử đời đầu, keo dán gỗ ép chịu nước'
    ],
    pedagogicalKeyPointsVI: [
      'Khác với nhựa nhiệt dẻo (PE, PVC nóng chảy khi nung), Bakelite là chất dẻo nhiệt rắn có mạng không gian 3D vĩnh viễn.',
      'Do Leo Baekeland phát minh năm 1907, đánh dấu buổi bình minh của kỷ nguyên vật liệu tổng hợp toàn cầu.'
    ],
    curriculumGrade: 'HOA_12'
  }
};

/**
 * Calculate degree of polymerization (hệ số trùng hợp n)
 * n = M_polymer / M_monomer
 */
export function calculateDegreeOfPolymerization(
  molarMassPolymer: number,
  repeatingUnitMolarMass: number
): number {
  if (molarMassPolymer <= 0 || repeatingUnitMolarMass <= 0) return 0;
  return Math.round((molarMassPolymer / repeatingUnitMolarMass) * 10) / 10;
}

/**
 * Calculate element mass percentage in a polymer
 */
export function calculateElementPercentage(
  elementAtomicMass: number,
  elementAtomCountInUnit: number,
  repeatingUnitMolarMass: number
): number {
  if (repeatingUnitMolarMass <= 0) return 0;
  const pct = (elementAtomicMass * elementAtomCountInUnit / repeatingUnitMolarMass) * 100;
  return Math.round(pct * 100) / 100;
}

/**
 * Calculate extended polymer chain length in nanometers
 * d_CC ≈ 0.154 nm (154 pm), bond angle tetrahedral ≈ 109.5°
 * Projection of one C-C bond along chain axis = 0.154 * sin(109.5° / 2) ≈ 0.126 nm
 */
export function calculateChainLengthNanometers(
  degreeOfPolymerizationN: number,
  carbonAtomsInMainChainPerUnit: number = 2
): number {
  if (degreeOfPolymerizationN <= 0) return 0;
  const bondLengthNm = 0.126; // projected nm per C-C bond
  const totalBonds = degreeOfPolymerizationN * carbonAtomsInMainChainPerUnit;
  return Math.round(totalBonds * bondLengthNm * 10) / 10;
}
