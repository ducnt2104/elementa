// src/game/data/itemsData.ts
// MOBA In-Game Chemical Item Shop for ELEMENTA
// Built on Authentic Chemical Materials, Metallurgy & Electrochemistry

import { ChemicalItem } from '../types';

export const CHEMICAL_ITEMS_CATALOG: ChemicalItem[] = [
  // 1. BOOTS / MOBILITY
  {
    id: 'item_bauxite_boots',
    name_vi: 'Giày Bauxit Siêu Bền',
    name_en: 'Bauxite Heavy Boots',
    chemicalFormula: 'Al₂O₃·2H₂O',
    cost: 850,
    icon: 'boots',
    category: 'UTILITY',
    stats: {
      movementSpeed: 45,
      magicResist: 25,
      armor: 15
    },
    passiveVI: 'Tăng 45 Tốc độ di chuyển. Giảm 20% thời gian chịu hiệu ứng khống chế (làm chậm, trói chân).',
    chemicalConceptVI: 'Bauxit là quặng nhôm oxit ngậm nước có độ chịu lực và độ bền mài mòn cơ học cực cao.'
  },
  {
    id: 'item_light_gas_shoes',
    name_vi: 'Hài Khí Hiếm Tinh Khiết',
    name_en: 'Noble Gas Light Striders',
    chemicalFormula: 'He / Ne',
    cost: 950,
    icon: 'wind',
    category: 'UTILITY',
    stats: {
      movementSpeed: 60,
      cooldownReduction: 10
    },
    passiveVI: 'Tăng 60 Tốc độ di chuyển. Khi đi qua khu vực sông tăng thêm 20% tốc độ chạy trong 2 giây.',
    chemicalConceptVI: 'Khí hiếm có khối lượng riêng cực thấp, giảm thiểu tối đa lực cản khí động học.'
  },

  // 2. ATTACK / PHYSICAL
  {
    id: 'item_alkaline_gauntlet',
    name_vi: 'Găng Tay Kiềm Hóa Na⁺',
    name_en: 'Alkaline Ion Gauntlet',
    chemicalFormula: 'NaOH / Na⁺',
    cost: 2100,
    icon: 'fist',
    category: 'ATTACK',
    stats: {
      ad: 40,
      hp: 250,
      attackSpeed: 0.15
    },
    passiveVI: 'Đòn đánh thường đốt cháy ion kiềm gây thêm 30 sát thương phép và giảm 15% giáp của đối phương trong 3s.',
    chemicalConceptVI: 'Môi trường kiềm mạnh phá vỡ liên kết peptit và lipid của mục tiêu.'
  },
  {
    id: 'item_copper_crystal_bow',
    name_vi: 'Cung Tinh Thể Đồng Đỏ',
    name_en: 'Copper Crystal Compound Bow',
    chemicalFormula: 'Cu (fcc lattice)',
    cost: 2500,
    icon: 'bow',
    category: 'ATTACK',
    stats: {
      ad: 55,
      attackSpeed: 0.25,
      movementSpeed: 15
    },
    passiveVI: 'Đòn đánh thường nảy điện sang 2 mục tiêu lân cận gây 40% sát thương vật lý.',
    chemicalConceptVI: 'Cấu trúc lập phương tâm diện (fcc) của đồng cho mật độ electron dẫn điện cao nhất, tạo chuỗi truyền dẫn điện tích.'
  },
  {
    id: 'item_thermite_blade',
    name_vi: 'Thanh Kiếm Nhiệt Nhôm Siêu Nhiệt',
    name_en: 'Thermite Ignition Blade',
    chemicalFormula: '2Al + Fe₂O₃',
    cost: 2800,
    icon: 'flame-sword',
    category: 'ATTACK',
    stats: {
      ad: 65,
      cooldownReduction: 10
    },
    passiveVI: 'Đòn đánh và kỹ năng bỏ qua 25% Giáp của mục tiêu. Gây sát thương chuẩn lên các công trình và trụ tháp.',
    chemicalConceptVI: 'Nhiệt nhôm nung chảy sắt ở 2500°C phá vỡ mọi hợp kim bảo vệ bề mặt.'
  },

  // 3. MAGIC / ABILITY POWER
  {
    id: 'item_electrolyte_solution',
    name_vi: 'Bình Dung Dịch Điện Phân',
    name_en: 'Electrolyte Ionic Solution',
    chemicalFormula: 'NaCl (aq)',
    cost: 1400,
    icon: 'flask',
    category: 'MAGIC',
    stats: {
      ap: 35,
      mana: 300,
      cooldownReduction: 10
    },
    passiveVI: 'Hồi 8% năng lượng tối đa mỗi khi hạ gục một đơn vị lính hoặc quái rừng.',
    chemicalConceptVI: 'Các ion tự do Na⁺ và Cl⁻ trong nước truyền tải dòng điện và bổ sung chất điện giải cơ thể.'
  },
  {
    id: 'item_platinum_catalyst',
    name_vi: 'Lõi Xúc Tác Bạch Kim Pt',
    name_en: 'Platinum Reaction Catalyst',
    chemicalFormula: 'Pt (s)',
    cost: 2400,
    icon: 'sparkle-core',
    category: 'MAGIC',
    stats: {
      ap: 60,
      mana: 400,
      cooldownReduction: 20
    },
    passiveVI: 'Giảm 20% thời gian hồi chiêu tất cả kỹ năng. Kỹ năng trúng tướng giảm hồi chiêu của các kỹ năng khác đi 1 giây.',
    chemicalConceptVI: 'Bạch kim Pt là chất xúc tác dị thể kinh điển làm hạ năng lượng hoạt hóa Ea, gia tốc phản ứng lên hàng triệu lần.'
  },
  {
    id: 'item_super_ozone_staff',
    name_vi: 'Vương Trượng Ozon O₃',
    name_en: 'Super-Ozone Crown Staff',
    chemicalFormula: 'O₃ (g)',
    cost: 3000,
    icon: 'staff',
    category: 'MAGIC',
    stats: {
      ap: 85,
      magicResist: 20
    },
    passiveVI: 'Kỹ năng gây thêm sát thương tương đương 6% máu tối đa của đối phương trong 3 giây (hiệu ứng oxi hóa sâu).',
    chemicalConceptVI: 'Phân tử Ozon giải phóng gốc tự do oxi hóa tế bào màng với thế oxi hóa khử E° = +2.07V.'
  },

  // 4. DEFENSE / HEALTH / ARMOR
  {
    id: 'item_passivation_foil',
    name_vi: 'Màng Oxit Thụ Động Al₂O₃',
    name_en: 'Passivating Oxide Coating',
    chemicalFormula: 'Al₂O₃',
    cost: 1900,
    icon: 'shield',
    category: 'DEFENSE',
    stats: {
      armor: 45,
      hp: 300
    },
    passiveVI: 'Giảm 15% sát thương nhận vào từ các đòn đánh thường và mũi tên xạ thủ.',
    chemicalConceptVI: 'Màng oxit kim loại thụ động ngăn cản các tác nhân ăn mòn thâm nhập vào mạng tinh thể.'
  },
  {
    id: 'item_rust_armor',
    name_vi: 'Giáp Gỉ Sét Từ Tính Fe₃O₄',
    name_en: 'Magnetite Rust Armor',
    chemicalFormula: 'Fe₃O₄ / Fe₂O₃·xH₂O',
    cost: 2400,
    icon: 'heavy-armor',
    category: 'DEFENSE',
    stats: {
      armor: 60,
      hp: 400,
      magicResist: 25
    },
    passiveVI: 'Khi bị tấn công, phản lại 25 sát thương ăn mòn cho kẻ địch và làm chậm tốc đánh của chúng 15%.',
    chemicalConceptVI: 'Từ tính của oxit sắt từ Fe₃O₄ làm lệch quỹ đạo và tiêu hao động năng của vũ khí kim loại tiếp xúc.'
  },
  {
    id: 'item_barium_sulfate_fortress',
    name_vi: 'Khiên Kết Tủa Bari BaSO₄',
    name_en: 'Insoluble Barium Sulfate Shield',
    chemicalFormula: 'BaSO₄ (s)',
    cost: 2700,
    icon: 'crystal-shield',
    category: 'DEFENSE',
    stats: {
      armor: 50,
      magicResist: 50,
      hp: 450
    },
    passiveVI: 'Khi máu tụt xuống dưới 30%, nhận ngay một lớp khiên kết tủa hấp thụ 400 sát thương trong 4 giây (hồi chiêu 60s).',
    chemicalConceptVI: 'Bari sunfat có tích số tan cực nhỏ Ksp = 1.1 × 10⁻¹⁰ tạo lớp kết tủa trơ không hòa tan trong axit.'
  }
];
