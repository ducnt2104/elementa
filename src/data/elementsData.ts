// src/data/elementsData.ts
// IUPAC & GDPT 2018 Ground Truth Elemental Database for ELEMENTA
// Exhaustive, authenticated dataset covering all 118 periodic elements without placeholders

import { ElementData, EnvironmentalCard } from '../domain/types';
import { calculateAtkOx, calculateAtkRed, calculateDefStab, calculateManaCost } from '../domain/statMapper';

export interface RawElement {
  z: number;
  symbol: string;
  name_iupac: string;
  name_vi: string;
  atomic_weight: number;
  group: number;
  period: number;
  category: ElementData['category'];
  electronegativity: number | null;
  first_ionization_energy: number;
  electron_config: string;
  standard_state: ElementData['standard_state'];
  oxidation_states: number[];
  role: ElementData['role'];
  unlockedByDefault: boolean;
  apps_vi: string;
  facts_vi: string[];
}

export const RAW_ELEMENTS: RawElement[] = [
  {
    z: 1, symbol: 'H', name_iupac: 'Hydrogen', name_vi: 'Hiđro', atomic_weight: 1.008,
    group: 1, period: 1, category: 'NONMETAL', electronegativity: 2.2, first_ionization_energy: 1312.0,
    electron_config: '1s¹', standard_state: 'GAS', oxidation_states: [-1, 1], role: 'BURST_REDUCTION',
    unlockedByDefault: true,
    apps_vi: "Nhiên liệu hydro xanh, sản xuất amoniac NH3, công nghệ pin nhiên liệu sạch.",
    facts_vi: ["Nguyên tố nhẹ nhất và dồi dào nhất trong vũ trụ (chiếm ~75% khối lượng vũ trụ).", "Cháy trong khí O2 tỏa nhiệt lượng cực lớn (2H2 + O2 -> 2H2O, dH < 0).", "Đóng vai trò nguyên tử cơ động tạo ion H+ trong mọi dung dịch acid."]
  },
  {
    z: 2, symbol: 'He', name_iupac: 'Helium', name_vi: 'Heli', atomic_weight: 4.0026,
    group: 18, period: 1, category: 'NOBLE_GAS', electronegativity: null, first_ionization_energy: 2372.3,
    electron_config: '1s²', standard_state: 'GAS', oxidation_states: [0], role: 'INERT_SHIELD',
    unlockedByDefault: true,
    apps_vi: "Làm lạnh nam châm siêu dẫn trong máy chụp cộng hưởng từ MRI, khí nâng khinh khí cầu an toàn.",
    facts_vi: ["Cấu hình 1s² bão hòa bền vững tuyệt đối, năng lượng ion hóa thứ nhất I1 cao nhất bảng tuần hoàn.", "Hoàn toàn trơ về mặt hóa học ở mọi điều kiện thông thường, không cháy và không duy trì sự cháy."]
  },
  {
    z: 3, symbol: 'Li', name_iupac: 'Lithium', name_vi: 'Liti', atomic_weight: 6.94,
    group: 1, period: 2, category: 'ALKALI_METAL', electronegativity: 0.98, first_ionization_energy: 520.2,
    electron_config: '[He] 2s¹', standard_state: 'SOLID', oxidation_states: [1], role: 'BURST_REDUCTION',
    unlockedByDefault: true,
    apps_vi: "Chế tạo pin sạc Li-ion cho điện thoại thông minh, xe điện Tesla và hợp kim siêu nhẹ hàng không.",
    facts_vi: ["Kim loại có khối lượng riêng nhỏ nhất trong tất cả các kim loại (D = 0.534 g/cm³), nổi trên dầu hỏa.", "Cháy với ngọn lửa màu đỏ son đặc trưng khi đốt trên đèn khí."]
  },
  {
    z: 4, symbol: 'Be', name_iupac: 'Beryllium', name_vi: 'Beri', atomic_weight: 9.0122,
    group: 2, period: 2, category: 'ALKALINE_EARTH', electronegativity: 1.57, first_ionization_energy: 899.5,
    electron_config: '[He] 2s²', standard_state: 'SOLID', oxidation_states: [2], role: 'VARIABLE_VALENCE',
    unlockedByDefault: true,
    apps_vi: "Hợp kim đồng-beri đàn hồi cao làm lò xo phi thuyền, cửa sổ tia X trong ống phát xạ.",
    facts_vi: ["Beri có tính lưỡng tính đặc biệt trong nhóm kim loại kiềm thổ, oxide và hydroxide tan được trong kiềm mạnh.", "Hợp chất của beri có vị ngọt nhưng cực kỳ độc đối với phổi con người."]
  },
  {
    z: 5, symbol: 'B', name_iupac: 'Boron', name_vi: 'Bo', atomic_weight: 10.81,
    group: 13, period: 2, category: 'METALLOID', electronegativity: 2.04, first_ionization_energy: 800.6,
    electron_config: '[He] 2s² 2p¹', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: true,
    apps_vi: "Thủy tinh borosilicate Pyrex chịu nhiệt độ cao, sợi boron siêu bền trong áo chống đạn và cánh máy bay.",
    facts_vi: ["Bán kim loại nhóm IIIA có cấu trúc cụm đa diện B12 icosahedron cực kỳ cứng (độ cứng Mohs 9.3).", "Hợp chất acid boric H3BO3 là chất sát khuẩn nhẹ và chất làm chậm phản ứng neutron trong lò phản ứng hạt nhân."]
  },
  {
    z: 6, symbol: 'C', name_iupac: 'Carbon', name_vi: 'Carbon', atomic_weight: 12.011,
    group: 14, period: 2, category: 'NONMETAL', electronegativity: 2.55, first_ionization_energy: 1086.5,
    electron_config: '[He] 2s² 2p²', standard_state: 'SOLID', oxidation_states: [-4, 2, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: true,
    apps_vi: "Cơ sở của toàn bộ hóa học hữu cơ và sự sống, vật liệu siêu bền graphene, sợi carbon và điện cực than chì.",
    facts_vi: ["Sở hữu các dạng thù hình tương phản kỳ diệu: kim cương cứng nhất tự nhiên vs than chì mềm dẫn điện.", "Khả năng tạo liên kết cộng hóa trị vô tận C-C mạch thẳng, nhánh và vòng tạo nên hàng chục triệu hợp chất hữu cơ."]
  },
  {
    z: 7, symbol: 'N', name_iupac: 'Nitrogen', name_vi: 'Nitơ', atomic_weight: 14.007,
    group: 15, period: 2, category: 'NONMETAL', electronegativity: 3.04, first_ionization_energy: 1402.3,
    electron_config: '[He] 2s² 2p³', standard_state: 'GAS', oxidation_states: [-3, 1, 2, 3, 4, 5], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: true,
    apps_vi: "Khí bảo quản thực phẩm, sản xuất phân bón đạm urê qua chu trình Haber-Bosch, nitơ lỏng bảo quản sinh học.",
    facts_vi: ["Chiếm 78% thể tích bầu khí quyển Trái Đất.", "Liên kết ba N≡N siêu bền vững (năng lượng liên kết 945 kJ/mol) khiến N2 rất trơ ở nhiệt độ phòng."]
  },
  {
    z: 8, symbol: 'O', name_iupac: 'Oxygen', name_vi: 'Oxi', atomic_weight: 15.999,
    group: 16, period: 2, category: 'NONMETAL', electronegativity: 3.44, first_ionization_energy: 1313.9,
    electron_config: '[He] 2s² 2p⁴', standard_state: 'GAS', oxidation_states: [-2, -1, 2], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: true,
    apps_vi: "Duy trì hô hấp hiếu khí của sinh vật, dưỡng khí y tế cấp cứu, chất oxi hóa trong động cơ tên lửa lỏng.",
    facts_vi: ["Nguyên tố dồi dào nhất ở vỏ Trái Đất (chiếm ~46% khối lượng vỏ Trái Đất).", "Khí O2 có tính thuận từ do có 2 electron độc thân ở orbital phản liên kết π*."]
  },
  {
    z: 9, symbol: 'F', name_iupac: 'Fluorine', name_vi: 'Flo', atomic_weight: 18.998,
    group: 17, period: 2, category: 'HALOGEN', electronegativity: 3.98, first_ionization_energy: 1681.0,
    electron_config: '[He] 2s² 2p⁵', standard_state: 'GAS', oxidation_states: [-1], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: true,
    apps_vi: "Sản xuất men chống dính Teflon (PTFE), chất khắc thủy tinh HF, kem đánh răng chứa natri florua bảo vệ men răng.",
    facts_vi: ["Nguyên tố có độ âm điện lớn nhất bảng tuần hoàn (χ = 3.98 Pauling).", "Tính oxi hóa mạnh nhất, phản ứng bốc cháy với hầu hết mọi chất kể cả nước và khí hiếm xenon."]
  },
  {
    z: 10, symbol: 'Ne', name_iupac: 'Neon', name_vi: 'Neon', atomic_weight: 20.18,
    group: 18, period: 2, category: 'NOBLE_GAS', electronegativity: null, first_ionization_energy: 2080.7,
    electron_config: '[He] 2s² 2p⁶', standard_state: 'GAS', oxidation_states: [0], role: 'INERT_SHIELD',
    unlockedByDefault: true,
    apps_vi: "Đèn quảng cáo neon phát ánh sáng đỏ cam rực rỡ, laser khí He-Ne trong máy quét mã vạch và quang học.",
    facts_vi: ["Khí hiếm phát xạ ánh sáng đỏ cam cường độ mạnh nhất trong các khí khi có phóng điện cao áp.", "Trơ tuyệt đối, không tạo bất kỳ hợp chất hóa học bền nào đã biết ở điều kiện thường."]
  },
  {
    z: 11, symbol: 'Na', name_iupac: 'Sodium', name_vi: 'Natri', atomic_weight: 22.99,
    group: 1, period: 3, category: 'ALKALI_METAL', electronegativity: 0.93, first_ionization_energy: 495.8,
    electron_config: '[Ne] 3s¹', standard_state: 'SOLID', oxidation_states: [1], role: 'BURST_REDUCTION',
    unlockedByDefault: true,
    apps_vi: "Đèn hơi natri chiếu sáng đường phố màu vàng sương mù, chất trao đổi nhiệt lò phản ứng hạt nhân nhanh.",
    facts_vi: ["Kim loại kiềm mềm có thể cắt bằng dao, phản ứng mãnh liệt nổ tung khi tiếp xúc với nước tạo NaOH và H2.", "Cation Na+ là ion điện giải chính duy trì áp suất thẩm thấu và dẫn truyền xung thần kinh trong cơ thể."]
  },
  {
    z: 12, symbol: 'Mg', name_iupac: 'Magnesium', name_vi: 'Magie', atomic_weight: 24.305,
    group: 2, period: 3, category: 'ALKALINE_EARTH', electronegativity: 1.31, first_ionization_energy: 737.7,
    electron_config: '[Ne] 3s²', standard_state: 'SOLID', oxidation_states: [2], role: 'BURST_REDUCTION',
    unlockedByDefault: true,
    apps_vi: "Hợp kim magnalium siêu nhẹ chế tạo vỏ máy tính xách tay và khung xe đua, pháo sáng cứu hộ biển.",
    facts_vi: ["Cháy trong không khí với ngọn lửa trắng chói lòa giàu tia tử ngoại (2Mg + O2 -> 2MgO).", "Là nguyên tử trung tâm của phân tử diệp lục (chlorophyll), quyết định quá trình quang hợp trên Trái Đất."]
  },
  {
    z: 13, symbol: 'Al', name_iupac: 'Aluminium', name_vi: 'Nhôm', atomic_weight: 26.982,
    group: 13, period: 3, category: 'POST_TRANSITION', electronegativity: 1.61, first_ionization_energy: 577.5,
    electron_config: '[Ne] 3s² 3p¹', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: true,
    apps_vi: "Vật liệu kết cấu vỏ máy bay, dây dẫn điện cao thế đường dài, cửa nhôm kính và giấy bạc bọc thực phẩm.",
    facts_vi: ["Kim loại dồi dào nhất trong vỏ Trái Đất (chiếm ~8.1% khối lượng).", "Tự tạo màng oxit Al2O3 mỏng mịn (cỡ vài nanomet) cực kỳ bền vững, thụ động hóa bảo vệ kim loại bên trong."]
  },
  {
    z: 14, symbol: 'Si', name_iupac: 'Silicon', name_vi: 'Silic', atomic_weight: 28.085,
    group: 14, period: 3, category: 'METALLOID', electronegativity: 1.9, first_ionization_energy: 786.5,
    electron_config: '[Ne] 3s² 3p²', standard_state: 'SOLID', oxidation_states: [-4, 2, 4], role: 'INERT_SHIELD',
    unlockedByDefault: true,
    apps_vi: "Trái tim của cuộc cách mạng bán dẫn (vi xử lý CPU/GPU Silicon Valley), pin mặt trời quang điện, keo silicone.",
    facts_vi: ["Nguyên tố phổ biến thứ hai ở vỏ Trái Đất sau oxy (chiếm ~27.7%), thành phần chính của cát và thạch anh SiO2.", "Độ tinh khiết silicon dùng cho vi mạch máy tính phải đạt tới mức 99.9999999% (9 con số 9)."]
  },
  {
    z: 15, symbol: 'P', name_iupac: 'Phosphorus', name_vi: 'Photpho', atomic_weight: 30.974,
    group: 15, period: 3, category: 'NONMETAL', electronegativity: 2.19, first_ionization_energy: 1011.8,
    electron_config: '[Ne] 3s² 3p³', standard_state: 'SOLID', oxidation_states: [-3, 3, 5], role: 'VARIABLE_VALENCE',
    unlockedByDefault: true,
    apps_vi: "Sản xuất phân bón lân (supephotphat) cho nông nghiệp, thuốc diêm quẹt an toàn, chất làm chậm cháy.",
    facts_vi: ["Photpho trắng tự bốc cháy trong không khí ở 30°C và phát quang lân tinh xanh trong bóng tối.", "Xương sống của phân tử ADN, ARN và đồng tiền năng lượng sinh học ATP trong mọi tế bào sống."]
  },
  {
    z: 16, symbol: 'S', name_iupac: 'Sulfur', name_vi: 'Lưu huỳnh', atomic_weight: 32.06,
    group: 16, period: 3, category: 'NONMETAL', electronegativity: 2.58, first_ionization_energy: 999.6,
    electron_config: '[Ne] 3s² 3p⁴', standard_state: 'SOLID', oxidation_states: [-2, 2, 4, 6], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: true,
    apps_vi: "Sản xuất acid sulfuric H2SO4 (chỉ số sức mạnh công nghiệp hóa chất), lưu hóa cao su lốp xe, thuốc súng đen.",
    facts_vi: ["Chất rắn màu vàng rơm, khi đốt cháy tạo ngọn lửa màu xanh lam và khí SO2 mùi hắc nồng đặc trưng.", "Tạo cầu nối disulfide (-S-S-) duy trì cấu trúc bậc 3 và bậc 4 của protein trong tóc và móng tay."]
  },
  {
    z: 17, symbol: 'Cl', name_iupac: 'Chlorine', name_vi: 'Clo', atomic_weight: 35.45,
    group: 17, period: 3, category: 'HALOGEN', electronegativity: 3.16, first_ionization_energy: 1251.2,
    electron_config: '[Ne] 3s² 3p⁵', standard_state: 'GAS', oxidation_states: [-1, 1, 3, 5, 7], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: true,
    apps_vi: "Khử trùng nước sinh hoạt nhà máy nước và hồ bơi, sản xuất nhựa PVC làm ống dẫn nước, thuốc tẩy Javel.",
    facts_vi: ["Khí màu vàng lục, mùi xốc ngạt, nặng hơn không khí khoảng 2.5 lần và có tính độc mạnh.", "Tác dụng với dung dịch kiềm tạo hỗn hợp muối hypochlorite có tính tẩy màu và sát trùng mạnh mẽ."]
  },
  {
    z: 18, symbol: 'Ar', name_iupac: 'Argon', name_vi: 'Argon', atomic_weight: 39.95,
    group: 18, period: 3, category: 'NOBLE_GAS', electronegativity: null, first_ionization_energy: 1520.6,
    electron_config: '[Ne] 3s² 3p⁶', standard_state: 'GAS', oxidation_states: [0], role: 'INERT_SHIELD',
    unlockedByDefault: true,
    apps_vi: "Khí bảo vệ mối hàn kim loại nhiệt độ cao TIG/MIG, nạp bóng đèn sợi đốt chống bay hơi vonfram, cửa kính cách nhiệt.",
    facts_vi: ["Khí hiếm dồi dào nhất trong khí quyển Trái Đất (chiếm ~0.93% thể tích, nhiều hơn cả khí CO2).", "Được sinh ra liên tục từ sự phân rã phóng xạ của đồng vị Kali-40 (40K) trong lòng đất."]
  },
  {
    z: 19, symbol: 'K', name_iupac: 'Potassium', name_vi: 'Kali', atomic_weight: 39.098,
    group: 1, period: 4, category: 'ALKALI_METAL', electronegativity: 0.82, first_ionization_energy: 418.8,
    electron_config: '[Ar] 4s¹', standard_state: 'SOLID', oxidation_states: [1], role: 'BURST_REDUCTION',
    unlockedByDefault: true,
    apps_vi: "Phân bón kali cho cây trồng tăng sức chống rét và đậu quả, xà phòng mềm kali stearate, muối ăn y tế.",
    facts_vi: ["Kim loại kiềm hoạt động mạnh hơn natri, tự bốc cháy ngọn lửa màu tím hoa cà khi ném vào nước.", "Cation K+ là ion chủ đạo bên trong dịch nội bào, phối hợp với bơm Na+/K+-ATPase để truyền tín hiệu não."]
  },
  {
    z: 20, symbol: 'Ca', name_iupac: 'Calcium', name_vi: 'Canxi', atomic_weight: 40.078,
    group: 2, period: 4, category: 'ALKALINE_EARTH', electronegativity: 1.0, first_ionization_energy: 589.8,
    electron_config: '[Ar] 4s²', standard_state: 'SOLID', oxidation_states: [2], role: 'BURST_REDUCTION',
    unlockedByDefault: true,
    apps_vi: "Sản xuất xi măng portland và vôi xây dựng, thạch cao bó bột xương gãy CaSO4·2H2O, luyện kim khử oxy.",
    facts_vi: ["Thành phần cấu tạo chính của xương, răng (hydroxyapatite) và vỏ sò đá vôi CaCO3.", "Phản ứng tôi vôi sống (CaO + H2O -> Ca(OH)2) tỏa lượng nhiệt rất lớn đủ làm sôi nước."]
  },
  {
    z: 21, symbol: 'Sc', name_iupac: 'Scandium', name_vi: 'Scandi', atomic_weight: 44.956,
    group: 3, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.36, first_ionization_energy: 633.1,
    electron_config: '[Ar] 3d¹ 4s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Hợp kim nhôm-scandi siêu cứng nhẹ chế tạo khung xe đạp đua thể thao chuyên nghiệp và linh kiện máy bay phản lực MiG.",
    facts_vi: ["Nguyên tố chuyển tiếp đầu tiên của bảng tuần hoàn, được tiên đoán bởi Mendeleev với tên gọi Ekaboron.", "Bổ sung một lượng nhỏ 0.5% Sc vào nhôm giúp tăng độ bền kéo và ngăn nứt mối hàn ở nhiệt độ cao."]
  },
  {
    z: 22, symbol: 'Ti', name_iupac: 'Titanium', name_vi: 'Titan', atomic_weight: 47.867,
    group: 4, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.54, first_ionization_energy: 658.8,
    electron_config: '[Ar] 3d² 4s²', standard_state: 'SOLID', oxidation_states: [2, 3, 4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Vỏ tàu vũ trụ và động cơ phản lực, khớp háng nhân tạo y tế nhờ tương thích sinh học tuyệt đối, sắc tố trắng TiO2.",
    facts_vi: ["Kim loại bền tương đương thép nhưng nhẹ hơn thép 45% và chống ăn mòn nước biển tuyệt hảo.", "Titanium dioxide (TiO2) là chất màu trắng mờ đục có chiết suất quang học cao nhất, dùng trong kem chống nắng."]
  },
  {
    z: 23, symbol: 'V', name_iupac: 'Vanadium', name_vi: 'Vanadi', atomic_weight: 50.942,
    group: 5, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.63, first_ionization_energy: 650.9,
    electron_config: '[Ar] 3d³ 4s²', standard_state: 'SOLID', oxidation_states: [2, 3, 4, 5], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Hợp kim thép vanadi làm cờ lê mỏ lết siêu cứng không biến dạng, chất xúc tác V2O5 trong sản xuất H2SO4.",
    facts_vi: ["Các ion của vanadi trong dung dịch tạo nên 4 màu sắc kỳ diệu theo 4 số oxi hóa: Tím (+2), Xanh lục (+3), Lam (+4), Vàng (+5).", "Thép vanadi được Henry Ford tiên phong sử dụng để sản xuất khung xe ô tô Model T huyền thoại."]
  },
  {
    z: 24, symbol: 'Cr', name_iupac: 'Chromium', name_vi: 'Crom', atomic_weight: 51.996,
    group: 6, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.66, first_ionization_energy: 652.9,
    electron_config: '[Ar] 3d⁵ 4s¹', standard_state: 'SOLID', oxidation_states: [2, 3, 6], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Mạ crom sáng bóng chống gỉ cho phụ tùng xe máy, thành phần bắt buộc của thép không gỉ inox (ít nhất 10.5% Cr).",
    facts_vi: ["Kim loại cứng nhất trong tất cả các kim loại (độ cứng Mohs 8.5), có thể rạch đứt thủy tinh.", "Có cấu hình electron ngoại lệ 3d⁵ 4s¹ bán bão hòa bền vững thay vì 3d⁴ 4s²."]
  },
  {
    z: 25, symbol: 'Mn', name_iupac: 'Manganese', name_vi: 'Mangan', atomic_weight: 54.938,
    group: 7, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.55, first_ionization_energy: 717.3,
    electron_config: '[Ar] 3d⁵ 4s²', standard_state: 'SOLID', oxidation_states: [2, 3, 4, 6, 7], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Thép mangan Hadfield chống mài mòn làm đường ray xe lửa và gầu máy xúc, chất oxi hóa tím thuốc tím KMnO4.",
    facts_vi: ["Có dải số oxi hóa phong phú bậc nhất từ -3 đến +7, tạo nên các hợp chất đa dạng màu sắc.", "Thuốc tím KMnO4 là chất sát trùng và chất oxi hóa chuẩn độ kinh điển trong phòng thí nghiệm hóa học."]
  },
  {
    z: 26, symbol: 'Fe', name_iupac: 'Iron', name_vi: 'Sắt', atomic_weight: 55.845,
    group: 8, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.83, first_ionization_energy: 762.5,
    electron_config: '[Ar] 3d⁶ 4s²', standard_state: 'SOLID', oxidation_states: [2, 3, 6], role: 'VARIABLE_VALENCE',
    unlockedByDefault: true,
    apps_vi: "Kim loại nền tảng của nền văn minh công nghiệp (chiếm 95% tổng sản lượng kim loại thế giới), thép xây dựng, đường ray.",
    facts_vi: ["Nguyên tố có năng lượng liên kết hạt nhân trên mỗi nucleon bền vững nhất trong vũ trụ.", "Là tâm hoạt tính của hemoglobin trong hồng cầu, liên kết thuận nghịch với O2 để vận chuyển oxy nuôi cơ thể."]
  },
  {
    z: 27, symbol: 'Co', name_iupac: 'Cobalt', name_vi: 'Coban', atomic_weight: 58.933,
    group: 9, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.88, first_ionization_energy: 760.4,
    electron_config: '[Ar] 3d⁷ 4s²', standard_state: 'SOLID', oxidation_states: [2, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Vật liệu cực âm pin xe điện lithium-cobalt oxide (LiCoO2), nam châm vĩnh cửu Alnico, phẩm màu xanh coban gốm sứ.",
    facts_vi: ["Là nguyên tử trung tâm của vitamin B12 (cobalamin), vi chất bắt buộc chống bệnh thiếu máu ác tính.", "Đồng vị phóng xạ Coban-60 phát tia gamma năng lượng cao dùng trong xạ trị ung thư và khử trùng y tế."]
  },
  {
    z: 28, symbol: 'Ni', name_iupac: 'Nickel', name_vi: 'Niken', atomic_weight: 58.693,
    group: 10, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.91, first_ionization_energy: 737.1,
    electron_config: '[Ar] 3d⁸ 4s²', standard_state: 'SOLID', oxidation_states: [2, 3], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Hợp kim thép không gỉ inox 304 (chứa 8% Ni), pin sạc Ni-MH, chất xúc tác hydro hóa dầu thực vật thành bơ nhân tạo.",
    facts_vi: ["Chống ăn mòn tuyệt vời trong môi trường kiềm và acid loãng, bề mặt có độ bóng mờ ánh vàng nhẹ đặc trưng.", "Lõi sâu Trái Đất là một khối hợp kim sắt-niken khổng lồ sinh ra từ trường bảo vệ sự sống khỏi bức xạ vũ trụ."]
  },
  {
    z: 29, symbol: 'Cu', name_iupac: 'Copper', name_vi: 'Đồng', atomic_weight: 63.546,
    group: 11, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.9, first_ionization_energy: 745.5,
    electron_config: '[Ar] 3d¹⁰ 4s¹', standard_state: 'SOLID', oxidation_states: [1, 2], role: 'VARIABLE_VALENCE',
    unlockedByDefault: true,
    apps_vi: "Dây cáp điện và cuộn dây mô tơ điện nhờ độ dẫn điện siêu cao, ống nước đồng kháng khuẩn, hợp kim đồng thanh.",
    facts_vi: ["Một trong số ít kim loại có màu sắc tự nhiên không phải màu xám bạc (màu đỏ ánh cam đặc trưng).", "Có cấu hình electron bão hòa ngoại lệ 3d¹⁰ 4s¹ và tính kháng khuẩn tự nhiên tiêu diệt vi khuẩn trên bề mặt."]
  },
  {
    z: 30, symbol: 'Zn', name_iupac: 'Zinc', name_vi: 'Kẽm', atomic_weight: 65.38,
    group: 12, period: 4, category: 'TRANSITION_METAL', electronegativity: 1.65, first_ionization_energy: 906.4,
    electron_config: '[Ar] 3d¹⁰ 4s²', standard_state: 'SOLID', oxidation_states: [2], role: 'BURST_REDUCTION',
    unlockedByDefault: true,
    apps_vi: "Mạ kẽm nhúng nóng bảo vệ tôn lợp và cầu đường sắt chống gỉ, vỏ pin khô kẽm-carbon, kem chống hăm kẽm oxit ZnO.",
    facts_vi: ["Đóng vai trò điện cực anot hy sinh trong bảo vệ catot chống ăn mòn cho vỏ tàu thủy đi biển.", "Nguyên tố vi lượng thiết yếu cấu tạo hơn 300 enzyme sinh học điều hòa hệ miễn dịch và phân chia tế bào."]
  },
  {
    z: 31, symbol: 'Ga', name_iupac: 'Gallium', name_vi: 'Gali', atomic_weight: 69.723,
    group: 13, period: 4, category: 'POST_TRANSITION', electronegativity: 1.81, first_ionization_energy: 578.8,
    electron_config: '[Ar] 3d¹⁰ 4s² 4p¹', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Chất bán dẫn hợp chất GaN (Gali Nitride) trong củ sạc nhanh công suất lớn và đèn LED xanh lam giải Nobel 2014.",
    facts_vi: ["Kim loại nóng chảy ngay trong lòng bàn tay người ở nhiệt độ 29.76°C.", "Có khả năng thấm ướt thủy tinh và ăn mòn phá hủy mạng tinh thể nhôm kim loại chỉ sau vài phút tiếp xúc."]
  },
  {
    z: 32, symbol: 'Ge', name_iupac: 'Germanium', name_vi: 'Gecmani', atomic_weight: 72.63,
    group: 14, period: 4, category: 'METALLOID', electronegativity: 2.01, first_ionization_energy: 762.0,
    electron_config: '[Ar] 3d¹⁰ 4s² 4p²', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Ống kính quang học hồng ngoại nhìn đêm trong camera nhiệt quân sự, cáp sợi quang viễn thông tốc độ cao.",
    facts_vi: ["Chất bán dẫn đầu tiên được dùng để chế tạo bóng bán dẫn bán dẫn transistor tại phòng thí nghiệm Bell năm 1947.", "Được Mendeleev dự đoán chính xác tuyệt đối tính chất hóa lý trước khi tìm thấy với tên Ekasilicon."]
  },
  {
    z: 33, symbol: 'As', name_iupac: 'Arsenic', name_vi: 'Asen', atomic_weight: 74.922,
    group: 15, period: 4, category: 'METALLOID', electronegativity: 2.18, first_ionization_energy: 947.0,
    electron_config: '[Ar] 3d¹⁰ 4s² 4p³', standard_state: 'SOLID', oxidation_states: [-3, 3, 5], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: false,
    apps_vi: "Chất bán dẫn pha tạp GaAs trong laser quang điện và pin mặt trời vệ tinh không gian, thuốc trị bệnh bạch cầu.",
    facts_vi: ["Nổi tiếng trong lịch sử với biệt danh 'vua của các chất độc' do hợp chất thạch tín As2O3 không màu không mùi.", "Gây ngộ độc mãn tính tích tụ qua nguồn nước ngầm ô nhiễm, làm tổn thương da và tim mạch."]
  },
  {
    z: 34, symbol: 'Se', name_iupac: 'Selenium', name_vi: 'Selen', atomic_weight: 78.971,
    group: 16, period: 4, category: 'NONMETAL', electronegativity: 2.55, first_ionization_energy: 941.0,
    electron_config: '[Ar] 3d¹⁰ 4s² 4p⁴', standard_state: 'SOLID', oxidation_states: [-2, 4, 6], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: false,
    apps_vi: "Trống cảm quang trong máy photocopy và in laser nhờ hiệu ứng quang dẫn, dầu gội trị gàu chứa SeS2.",
    facts_vi: ["Độ dẫn điện tăng vọt lên hàng nghìn lần khi được chiếu sáng (hiệu ứng quang dẫn).", "Vi chất chống oxy hóa quan trọng trong enzyme glutathione peroxidase bảo vệ tế bào hồng cầu."]
  },
  {
    z: 35, symbol: 'Br', name_iupac: 'Bromine', name_vi: 'Brom', atomic_weight: 79.904,
    group: 17, period: 4, category: 'HALOGEN', electronegativity: 2.96, first_ionization_energy: 1139.9,
    electron_config: '[Ar] 3d¹⁰ 4s² 4p⁵', standard_state: 'LIQUID', oxidation_states: [-1, 1, 3, 5], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: true,
    apps_vi: "Chất chống cháy brom hóa trong nhựa điện tử, thuốc an thần kali bromua cổ điển, phim ảnh tráng bạc AgBr.",
    facts_vi: ["Là phi kim duy nhất ở thể lỏng tại điều kiện tiêu chuẩn, chất lỏng màu nâu đỏ bốc khói ngạt độc hại.", "Dung dịch nước brom màu da cam dùng để nhận biết liên kết đôi C=C của anken và ankin (mất màu tức thì)."]
  },
  {
    z: 36, symbol: 'Kr', name_iupac: 'Krypton', name_vi: 'Kripton', atomic_weight: 83.798,
    group: 18, period: 4, category: 'NOBLE_GAS', electronegativity: 3.0, first_ionization_energy: 1350.8,
    electron_config: '[Ar] 3d¹⁰ 4s² 4p⁶', standard_state: 'GAS', oxidation_states: [0, 2], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Đèn flash chụp ảnh tốc độ cao ở sân bay, laser excimer KrF trong khắc quang khắc vi mạch bán dẫn.",
    facts_vi: ["Từ năm 1960 đến 1983, độ dài chuẩn 1 mét quốc tế được định nghĩa theo bước sóng phát xạ của Krypton-86.", "Có thể phản ứng với khí flo ở nhiệt độ cực thấp tạo thành tinh thể Krypton difluoride (KrF2)."]
  },
  {
    z: 37, symbol: 'Rb', name_iupac: 'Rubidium', name_vi: 'Rubidi', atomic_weight: 85.468,
    group: 1, period: 5, category: 'ALKALI_METAL', electronegativity: 0.82, first_ionization_energy: 403.0,
    electron_config: '[Kr] 5s¹', standard_state: 'SOLID', oxidation_states: [1], role: 'BURST_REDUCTION',
    unlockedByDefault: false,
    apps_vi: "Đồng hồ nguyên tử rubidi nhỏ gọn trong vệ tinh định vị GPS, nghiên cứu ngưng tụ Bose-Einstein.",
    facts_vi: ["Kim loại kiềm có nhiệt độ nóng chảy thấp (39.3°C), phản ứng bốc cháy tự phát dữ dội khi tiếp xúc không khí ẩm.", "Hơi nguyên tử Rubidi-87 được hai nhà khoa học Cornell và Wieman dùng để tạo ra trạng thái ngưng tụ Bose-Einstein đoạt Nobel 2001."]
  },
  {
    z: 38, symbol: 'Sr', name_iupac: 'Strontium', name_vi: 'Stronti', atomic_weight: 87.62,
    group: 2, period: 5, category: 'ALKALINE_EARTH', electronegativity: 0.95, first_ionization_energy: 549.5,
    electron_config: '[Kr] 5s²', standard_state: 'SOLID', oxidation_states: [2], role: 'BURST_REDUCTION',
    unlockedByDefault: false,
    apps_vi: "Tạo màu đỏ rực rỡ trong pháo hoa lễ hội và đạn tín hiệu quân sự, đồng hồ nguyên tử quang học chính xác nhất.",
    facts_vi: ["Đồng vị phóng xạ nhân tạo Stronti-90 sinh ra từ các vụ nổ hạt nhân có khả năng thay thế canxi tích tụ trong xương.", "Đồng hồ nguyên tử mạng quang học Stronti có độ chính xác sai số chỉ 1 giây sau 15 tỷ năm (bằng tuổi vũ trụ)."]
  },
  {
    z: 39, symbol: 'Y', name_iupac: 'Yttrium', name_vi: 'Ytri', atomic_weight: 88.906,
    group: 3, period: 5, category: 'TRANSITION_METAL', electronegativity: 1.22, first_ionization_energy: 600.0,
    electron_config: '[Kr] 4d¹ 5s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Chất siêu dẫn nhiệt độ cao YBCO (YBa2Cu3O7) hoạt động ở nhiệt độ nitơ lỏng, đá quý nhân tạo YAG cho laser.",
    facts_vi: ["Khoáng vật đầu tiên được tìm thấy tại mỏ Ytterby Thụy Điển (ngôi làng mang tên cho 4 nguyên tố Y, Yb, Tb, Er).", "Gốm siêu dẫn Yttrium-Barium-Copper-Oxide có hiện tượng bay từ tính Meissner ngoạn mục trên đường ray nam châm."]
  },
  {
    z: 40, symbol: 'Zr', name_iupac: 'Zirconium', name_vi: 'Zirconi', atomic_weight: 91.224,
    group: 4, period: 5, category: 'TRANSITION_METAL', electronegativity: 1.33, first_ionization_energy: 640.1,
    electron_config: '[Kr] 4d² 5s²', standard_state: 'SOLID', oxidation_states: [4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Vỏ bọc thanh nhiên liệu urani trong lò phản ứng hạt nhân nhờ hấp thụ nơtron cực thấp, dao gốm zirconia siêu sắc.",
    facts_vi: ["Kim loại chịu nhiệt độ cao và chống ăn mòn nước siêu sôi cực kỳ ấn tượng trong môi trường lò phản ứng hạt nhân.", "Đá zirconi khối nhân tạo (Cubic Zirconia - CZ) có độ tán sắc lấp lánh mô phỏng kim cương hoàn hảo trong trang sức."]
  },
  {
    z: 41, symbol: 'Nb', name_iupac: 'Niobium', name_vi: 'Niobi', atomic_weight: 92.906,
    group: 5, period: 5, category: 'TRANSITION_METAL', electronegativity: 1.6, first_ionization_energy: 652.1,
    electron_config: '[Kr] 4d⁴ 5s¹', standard_state: 'SOLID', oxidation_states: [3, 5], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Dây cáp hợp kim siêu dẫn Nb-Ti trong máy va chạm hạt lớn CERN LHC và máy chụp cộng hưởng từ MRI.",
    facts_vi: ["Gia tăng chỉ 0.1% Niobi vào thép kết cấu giúp tăng gấp đôi độ bền của cầu treo và đường ống dẫn dầu xuyên lục địa.", "Bị nhầm lẫn với Tantalum suốt nhiều thập kỷ vì tính chất hóa học tương tự như hai chị em sinh đôi Niobe và Tantalus."]
  },
  {
    z: 42, symbol: 'Mo', name_iupac: 'Molybdenum', name_vi: 'Molipđen', atomic_weight: 95.95,
    group: 6, period: 5, category: 'TRANSITION_METAL', electronegativity: 2.16, first_ionization_energy: 684.3,
    electron_config: '[Kr] 4d⁵ 5s¹', standard_state: 'SOLID', oxidation_states: [4, 6], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Thép chịu nhiệt độ cao trong động cơ phản lực và nồi hơi áp suất cao, chất bôi trơn rắn MoS2 chịu tải nặng.",
    facts_vi: ["Có nhiệt độ nóng chảy cao thứ 6 trong các nguyên tố (2623°C) và hệ số giãn nở nhiệt rất nhỏ.", "Là nguyên tố kim loại nặng duy nhất cần thiết cho sự sống ở dạng enzyme nitrogenase giúp vi khuẩn cố định đạm từ khí quyển."]
  },
  {
    z: 43, symbol: 'Tc', name_iupac: 'Technetium', name_vi: 'Tecneti', atomic_weight: 98.0,
    group: 7, period: 5, category: 'TRANSITION_METAL', electronegativity: 1.9, first_ionization_energy: 702.0,
    electron_config: '[Kr] 4d⁵ 5s²', standard_state: 'SOLID', oxidation_states: [4, 7], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Đồng vị phóng xạ y học hạt nhân Tc-99m dùng trong hơn 80% các ca chụp cắt lớp SPECT chẩn đoán xương và tim mạch.",
    facts_vi: ["Nguyên tố đầu tiên được con người tổng hợp nhân tạo thành công bằng máy gia tốc hạt năm 1937 (Technetos = nhân tạo).", "Là nguyên tố nhẹ nhất trong bảng tuần hoàn không có bất kỳ đồng vị bền vững nào."]
  },
  {
    z: 44, symbol: 'Ru', name_iupac: 'Ruthenium', name_vi: 'Ruteni', atomic_weight: 101.07,
    group: 8, period: 5, category: 'TRANSITION_METAL', electronegativity: 2.2, first_ionization_energy: 710.2,
    electron_config: '[Kr] 4d⁷ 5s¹', standard_state: 'SOLID', oxidation_states: [3, 4, 8], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Chất xúc tác Grubbs đoạt giải Nobel Hóa học 2005 cho phản ứng hoán vị olefin hữu cơ, lớp phủ ổ đĩa cứng máy tính.",
    facts_vi: ["Kim loại thuộc nhóm bạch kim có khả năng tạo hợp chất ở số oxi hóa tối đa +8 (Ruthenium tetroxide RuO4).", "Bổ sung 0.1% Ruteni vào titan giúp tăng khả năng kháng ăn mòn acid lên hơn 100 lần."]
  },
  {
    z: 45, symbol: 'Rh', name_iupac: 'Rhodium', name_vi: 'Rodi', atomic_weight: 102.91,
    group: 9, period: 5, category: 'TRANSITION_METAL', electronegativity: 2.28, first_ionization_energy: 719.7,
    electron_config: '[Kr] 4d⁸ 5s¹', standard_state: 'SOLID', oxidation_states: [3], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Bộ chuyển đổi xúc tác xử lý khí thải ô tô (giảm khí độc NOx thành N2), mạ trang sức vàng trắng sáng bóng vĩnh cửu.",
    facts_vi: ["Thường là kim loại quý đắt nhất thế giới, giá trị có thời điểm vượt xa vàng và bạch kim gấp 5-10 lần.", "Có khả năng phản xạ ánh sáng quang học cực cao và hoàn toàn không bị ố mờ xỉn màu trong không khí quyển."]
  },
  {
    z: 46, symbol: 'Pd', name_iupac: 'Palladium', name_vi: 'Paladi', atomic_weight: 106.42,
    group: 10, period: 5, category: 'TRANSITION_METAL', electronegativity: 2.2, first_ionization_energy: 804.4,
    electron_config: '[Kr] 4d¹⁰', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Chất xúc tác phản ứng ghép mạch carbon chéo Suzuki-Heck Nobel 2010, màng lọc hydro siêu tinh khiết.",
    facts_vi: ["Có khả năng kỳ lạ hấp thụ thể tích khí hydro gấp 900 lần thể tích của chính nó ở nhiệt độ phòng.", "Cấu hình electron duy nhất không có electron nào ở phân lớp ngoài cùng: [Kr] 4d¹⁰ 5s⁰."]
  },
  {
    z: 47, symbol: 'Ag', name_iupac: 'Silver', name_vi: 'Bạc', atomic_weight: 107.87,
    group: 11, period: 5, category: 'TRANSITION_METAL', electronegativity: 1.93, first_ionization_energy: 731.0,
    electron_config: '[Kr] 4d¹⁰ 5s¹', standard_state: 'SOLID', oxidation_states: [1], role: 'INERT_SHIELD',
    unlockedByDefault: true,
    apps_vi: "Dẫn điện và dẫn nhiệt tốt nhất trong tất cả các kim loại, pin mặt trời quang điện, tráng gương quang học, trang sức.",
    facts_vi: ["Kim loại có độ phản xạ ánh sáng trắng cao nhất (99%) và tính diệt khuẩn ion Ag+ tiêu diệt vi sinh vật mạnh mẽ.", "Bị xỉn màu trong không khí do phản ứng với vết khí H2S tạo thành lớp màng bạc sulfide Ag2S màu đen."]
  },
  {
    z: 48, symbol: 'Cd', name_iupac: 'Cadmium', name_vi: 'Cadmi', atomic_weight: 112.41,
    group: 12, period: 5, category: 'TRANSITION_METAL', electronegativity: 1.69, first_ionization_energy: 867.8,
    electron_config: '[Kr] 4d¹⁰ 5s²', standard_state: 'SOLID', oxidation_states: [2], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Pin sạc Ni-Cd cổ điển, thanh điều khiển hấp thụ neutron trong lò hạt nhân, phẩm màu vàng nghệ cadmium sulfide CdS.",
    facts_vi: ["Kim loại nặng rất độc, tích tụ trong thận và xương gây ra hội chứng bệnh đau nhức xương Itai-itai tại Nhật Bản.", "Chấm lượng tử quang học CdSe phát xạ huỳnh quang rực rỡ dùng trong công nghệ màn hình QLED tivi thế hệ mới."]
  },
  {
    z: 49, symbol: 'In', name_iupac: 'Indium', name_vi: 'Indi', atomic_weight: 114.82,
    group: 13, period: 5, category: 'POST_TRANSITION', electronegativity: 1.78, first_ionization_energy: 558.3,
    electron_config: '[Kr] 4d¹⁰ 5s² 5p¹', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Màng dẫn điện trong suốt ITO (Indium Tin Oxide) làm màn hình cảm ứng điện thoại thông minh và tivi phẳng LCD/OLED.",
    facts_vi: ["Kim loại mềm đến mức có thể dùng móng tay ấn lõm và phát ra âm thanh 'tiếng khóc kim loại' khi bị uốn cong.", "Nếu không có màng mỏng oxit indi trong suốt dẫn điện, toàn bộ công nghệ màn hình cảm ứng ngày nay không thể tồn tại."]
  },
  {
    z: 50, symbol: 'Sn', name_iupac: 'Tin', name_vi: 'Thiếc', atomic_weight: 118.71,
    group: 14, period: 5, category: 'POST_TRANSITION', electronegativity: 1.96, first_ionization_energy: 708.6,
    electron_config: '[Kr] 4d¹⁰ 5s² 5p²', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Mạ thiếc hộp sữa đặc và đồ hộp thực phẩm bảo quản, hợp kim hàn chì-thiếc trong bảng mạch điện tử vi tính.",
    facts_vi: ["Tồn tại hai dạng thù hình: thiếc trắng kim loại dẻo (β) và thiếc xám phi kim giòn vụn (α).", "Hiện tượng 'dịch hạch thiếc' (tin pest) khiến cúc áo thiếc của quân đội Napoleon bị vỡ vụn thành bột trong mùa đông giá lạnh nước Nga."]
  },
  {
    z: 51, symbol: 'Sb', name_iupac: 'Antimony', name_vi: 'Antimon', atomic_weight: 121.76,
    group: 15, period: 5, category: 'METALLOID', electronegativity: 2.05, first_ionization_energy: 834.0,
    electron_config: '[Kr] 4d¹⁰ 5s² 5p³', standard_state: 'SOLID', oxidation_states: [-3, 3, 5], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Hợp kim chữ in sách truyền thống (nở ra khi đông đặc giúp nét chữ sắc nét), chất chống cháy Sb2O3 trong sợi rèm cửa.",
    facts_vi: ["Một trong số ít chất có tính chất kỳ lạ: nở rộng thể tích khi đông đặc từ thể lỏng sang thể rắn (giống nước đá).", "Acid fluoroantimonic (H[SbF6]) là một siêu acid mạnh nhất thế giới, mạnh gấp 10¹⁶ lần acid sulfuric nguyên chất."]
  },
  {
    z: 52, symbol: 'Te', name_iupac: 'Tellurium', name_vi: 'Telu', atomic_weight: 127.6,
    group: 16, period: 5, category: 'METALLOID', electronegativity: 2.1, first_ionization_energy: 869.3,
    electron_config: '[Kr] 4d¹⁰ 5s² 5p⁴', standard_state: 'SOLID', oxidation_states: [-2, 4, 6], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: false,
    apps_vi: "Pin mặt trời màng mỏng CdTe hiệu suất cao, đĩa quang học ghi xóa CD-RW/DVD-RAM, vật liệu nhiệt điện Peltier làm lạnh.",
    facts_vi: ["Tên gọi bắt nguồn từ Tellus (nữ thần Trái Đất trong thần thoại La Mã), đối ứng với nguyên tố Selen (Mặt Trăng).", "Tiếp xúc với một lượng cực nhỏ telu sẽ khiến hơi thở và mồ hôi có mùi tỏi nồng kéo dài hàng tháng trời."]
  },
  {
    z: 53, symbol: 'I', name_iupac: 'Iodine', name_vi: 'Iot', atomic_weight: 126.9,
    group: 17, period: 5, category: 'HALOGEN', electronegativity: 2.66, first_ionization_energy: 1008.4,
    electron_config: '[Kr] 4d¹⁰ 5s² 5p⁵', standard_state: 'SOLID', oxidation_states: [-1, 1, 5, 7], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: true,
    apps_vi: "Muối ăn bổ sung iot phòng chống bệnh bướu cổ và thiểu năng trí tuệ, cồn iot povidone sát trùng vết thương phẫu thuật.",
    facts_vi: ["Chất rắn tinh thể màu tím đen, có tính thăng hoa đặc trưng biến thẳng từ thể rắn thành hơi tím khi đun nóng nhẹ.", "Phản ứng với hồ tinh bột tạo phức chất màu xanh tím đặc trưng dùng làm chất chỉ thị nhạy bén bậc nhất."]
  },
  {
    z: 54, symbol: 'Xe', name_iupac: 'Xenon', name_vi: 'Xenon', atomic_weight: 131.29,
    group: 18, period: 5, category: 'NOBLE_GAS', electronegativity: 2.6, first_ionization_energy: 1170.4,
    electron_config: '[Kr] 4d¹⁰ 5s² 5p⁶', standard_state: 'GAS', oxidation_states: [0, 2, 4, 6], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Động cơ đẩy ion trên vệ tinh quỹ đạo vũ trụ Starlink, đèn pha xenon rực sáng ô tô sang trọng, thuốc mê hít an toàn.",
    facts_vi: ["Năm 1962, Neil Bartlett tổng hợp thành công hợp chất đầu tiên của khí hiếm Xe[PtF6], phá vỡ quan niệm khí hiếm hoàn toàn trơ.", "Là môi trường phát hiện vật chất tối lỏng nặng hàng đầu trong các thí nghiệm vật lý thiên văn ngầm dưới lòng đất."]
  },
  {
    z: 55, symbol: 'Cs', name_iupac: 'Caesium', name_vi: 'Xesi', atomic_weight: 132.91,
    group: 1, period: 6, category: 'ALKALI_METAL', electronegativity: 0.79, first_ionization_energy: 375.7,
    electron_config: '[Xe] 6s¹', standard_state: 'SOLID', oxidation_states: [1], role: 'BURST_REDUCTION',
    unlockedByDefault: false,
    apps_vi: "Định nghĩa chuẩn 1 giây quốc tế SI trong đồng hồ nguyên tử caesium fountain, dung dịch khoan giếng dầu mỏ.",
    facts_vi: ["Nguyên tố có năng lượng ion hóa I1 thấp nhất và độ âm điện nhỏ nhất trong các nguyên tố bền (χ = 0.79).", "1 giây được định nghĩa chính xác là 9,192,631,770 chu kỳ bức xạ chuyển mức siêu tinh tế của nguyên tử Caesium-133."]
  },
  {
    z: 56, symbol: 'Ba', name_iupac: 'Barium', name_vi: 'Bari', atomic_weight: 137.33,
    group: 2, period: 6, category: 'ALKALINE_EARTH', electronegativity: 0.89, first_ionization_energy: 502.9,
    electron_config: '[Xe] 6s²', standard_state: 'SOLID', oxidation_states: [2], role: 'BURST_REDUCTION',
    unlockedByDefault: true,
    apps_vi: "Uống cản quang Barium sulfate (BaSO4) chụp X-quang đường tiêu hóa dạ dày, bùn khoan giếng dầu nặng, pháo hoa xanh lá lục.",
    facts_vi: ["Tất cả các muối bari tan đều rất độc, nhưng BaSO4 hoàn toàn không độc do độ tan cực kỳ bé (Ksp ≈ 10⁻¹⁰).", "Cháy trên ngọn lửa đèn khí phát ánh sáng màu xanh lục táo (apple green) đặc trưng tuyệt đẹp."]
  },
  {
    z: 57, symbol: 'La', name_iupac: 'Lanthanum', name_vi: 'Lantan', atomic_weight: 138.91,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.1, first_ionization_energy: 538.1,
    electron_config: '[Xe] 5d¹ 6s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Kính quang học máy ảnh cao cấp có chiết suất cao và độ tán sắc thấp, điện cực pin xe hybrid Toyota Prius.",
    facts_vi: ["Nguyên tố đứng đầu chuỗi 15 nguyên tố họ Lantan (Lanthanides) có tính chất hóa học tương tự nhau.", "Kim loại đất hiếm phản ứng nhanh với nước giải phóng khí hydro giống như kim loại kiềm thổ."]
  },
  {
    z: 58, symbol: 'Ce', name_iupac: 'Cerium', name_vi: 'Xeri', atomic_weight: 140.12,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.12, first_ionization_energy: 534.4,
    electron_config: '[Xe] 4f¹ 5d¹ 6s²', standard_state: 'SOLID', oxidation_states: [3, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Đá lửa bật lửa zippo (hợp kim mischmetal), chất xúc tác tự làm sạch lò nướng, bột mài đánh bóng kính màn hình smartphone.",
    facts_vi: ["Nguyên tố đất hiếm dồi dào nhất trong vỏ Trái Đất (nhiều hơn cả chì và thiếc).", "Có thể đạt số oxi hóa bền +4 ngoài mức +3 đặc trưng của họ Lantan nhờ cấu hình phân lớp 4f trống rỗng."]
  },
  {
    z: 59, symbol: 'Pr', name_iupac: 'Praseodymium', name_vi: 'Praseodym', atomic_weight: 140.91,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.13, first_ionization_energy: 527.0,
    electron_config: '[Xe] 4f³ 6s²', standard_state: 'SOLID', oxidation_states: [3, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Kính hàn bảo vệ mắt của thợ thổi thủy tinh (kính didymium hấp thụ tia vàng chói), nam châm động cơ gió.",
    facts_vi: ["Hợp kim với niken có hiệu ứng từ nhiệt cực mạnh làm lạnh tới sát độ không tuyệt đối.", "Tạo màu xanh lục vàng tinh tế cho men gốm và thủy tinh nhân tạo."]
  },
  {
    z: 60, symbol: 'Nd', name_iupac: 'Neodymium', name_vi: 'Neodym', atomic_weight: 144.24,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.14, first_ionization_energy: 533.1,
    electron_config: '[Xe] 4f⁴ 6s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nam châm siêu cường Neodymium (NdFeB) mạnh nhất hành tinh trong tai nghe, động cơ xe điện và máy phát điện gió.",
    facts_vi: ["Một viên nam châm NdFeB nhỏ bằng đồng xu có thể nâng vật nặng hàng chục kilôgam và hút kẹp dập nát xương tay.", "Laser tinh thể rắn Nd:YAG phát tia laser hồng ngoại công suất cao dùng trong cắt gọt cơ khí và phẫu thuật mắt."]
  },
  {
    z: 61, symbol: 'Pm', name_iupac: 'Promethium', name_vi: 'Prometi', atomic_weight: 145.0,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.13, first_ionization_energy: 540.0,
    electron_config: '[Xe] 4f⁵ 6s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Pin hạt nhân nguyên tử kích thước cúc áo cho máy điều hòa nhịp tim và tàu thăm dò không gian sâu bền hàng chục năm.",
    facts_vi: ["Nguyên tố họ Lantan duy nhất có tính phóng xạ và không tồn tại đồng vị bền vững trong tự nhiên.", "Đặt tên theo Prometheus, vị thần titan trong thần thoại Hy Lạp đã đánh cắp ngọn lửa từ đỉnh Olympus trao cho loài người."]
  },
  {
    z: 62, symbol: 'Sm', name_iupac: 'Samarium', name_vi: 'Samari', atomic_weight: 150.36,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.17, first_ionization_energy: 544.5,
    electron_config: '[Xe] 4f⁶ 6s²', standard_state: 'SOLID', oxidation_states: [2, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nam châm chịu nhiệt độ cao Samarium-Cobalt (SmCo) trong tên lửa dẫn đường quân sự, thuốc phóng xạ điều trị ung thư xương.",
    facts_vi: ["Nam châm SmCo duy trì từ tính bền bỉ ở nhiệt độ lên tới hơn 700°C mà không bị mất từ như nam châm neodymium.", "Được phát hiện và đặt tên theo viên kỹ sư mỏ người Nga Samarsky-Bykhovets, người đầu tiên được vinh danh trên tên nguyên tố."]
  },
  {
    z: 63, symbol: 'Eu', name_iupac: 'Europium', name_vi: 'Europi', atomic_weight: 120.0,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.2, first_ionization_energy: 547.1,
    electron_config: '[Xe] 4f⁷ 6s²', standard_state: 'SOLID', oxidation_states: [2, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Chất phát quang chống làm tiền giả trong tờ tiền giấy Euro phát sáng đỏ dưới đèn tử ngoại UV, photpho tivi màu đỏ.",
    facts_vi: ["Nguyên tố có hoạt tính hóa học mạnh nhất trong toàn bộ 15 nguyên tố họ Lantan.", "Hợp chất Europium phát quang đỏ tươi rực rỡ dưới ánh sáng đen UV là lớp bảo an tối mật của đồng tiền chung châu Âu."]
  },
  {
    z: 64, symbol: 'Gd', name_iupac: 'Gadolinium', name_vi: 'Gadolini', atomic_weight: 157.25,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.2, first_ionization_energy: 593.4,
    electron_config: '[Xe] 4f⁷ 5d¹ 6s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Thuốc tương phản từ tiêm tĩnh mạch trong chụp cộng hưởng từ MRI, thanh điều khiển hấp thụ nơtron lò hạt nhân.",
    facts_vi: ["Có khả năng hấp thụ neutron nhiệt cao nhất trong số tất cả các nguyên tố tự nhiên.", "Trở thành vật liệu sắt từ tự nhiên ở nhiệt độ mát 20°C (nhiệt độ Curie ngay gần nhiệt độ phòng)."]
  },
  {
    z: 65, symbol: 'Tb', name_iupac: 'Terbium', name_vi: 'Terbi', atomic_weight: 158.93,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.2, first_ionization_energy: 565.8,
    electron_config: '[Xe] 4f⁹ 6s²', standard_state: 'SOLID', oxidation_states: [3, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Chất phát quang màu xanh lục trong đèn chiếu huỳnh quang trichromatic và màn hình màu, vật liệu từ giảo Terfenol-D.",
    facts_vi: ["Hợp kim Terfenol-D thay đổi hình dạng co giãn khi đặt trong từ trường, dùng trong sonar thủy âm tàu ngầm quân sự.", "Là một trong bốn nguyên tố được đặt theo tên ngôi làng Ytterby ở Thụy Điển."]
  },
  {
    z: 66, symbol: 'Dy', name_iupac: 'Dysprosium', name_vi: 'Dysprosi', atomic_weight: 162.5,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.22, first_ionization_energy: 573.0,
    electron_config: '[Xe] 4f¹⁰ 6s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Phụ gia bắt buộc cho nam châm xe điện giúp chống mất từ tính ở nhiệt độ cao trên đường cao tốc, đĩa ghi âm từ-quang.",
    facts_vi: ["Có độ cảm từ cao bậc nhất ở nhiệt độ thấp, đóng vai trò sống còn trong chuỗi cung ứng động cơ điện xanh.", "Tên gọi có nguồn gốc từ từ tiếng Hy Lạp 'dysprositos' có nghĩa là 'rất khó tiếp cận' do độ khó tách chiết."]
  },
  {
    z: 67, symbol: 'Ho', name_iupac: 'Holmium', name_vi: 'Holmi', atomic_weight: 164.93,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.23, first_ionization_energy: 581.0,
    electron_config: '[Xe] 4f¹¹ 6s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Cực từ hội tụ từ trường mạnh nhất trong máy gia tốc hạt, laser y tế Holmium:YAG tán sỏi thận không xâm lấn.",
    facts_vi: ["Sở hữu mômen từ nguyên tử lớn nhất trong tất cả các nguyên tố hóa học tự nhiên (10.6 Bohr magneton).", "Được đặt tên để vinh danh thủ đô Stockholm của Thụy Điển (Holmia trong tiếng Latin)."]
  },
  {
    z: 68, symbol: 'Er', name_iupac: 'Erbium', name_vi: 'Erbi', atomic_weight: 167.26,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.24, first_ionization_energy: 589.3,
    electron_config: '[Xe] 4f¹² 6s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Bộ khuếch đại quang học EDFA trong tuyến cáp quang internet xuyên đại dương, laser Erbium thẩm mỹ tái tạo bề mặt da.",
    facts_vi: ["Ion Er3+ phát xạ ánh sáng ở bước sóng 1550 nm, đúng dải suy hao quang học thấp nhất của sợi thủy tinh internet.", "Kính màu pha erbi có màu hồng nhạt dịu dàng dùng trong đồ trang trí pha lê cao cấp."]
  },
  {
    z: 69, symbol: 'Tm', name_iupac: 'Thulium', name_vi: 'Thuli', atomic_weight: 168.93,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.25, first_ionization_energy: 596.7,
    electron_config: '[Xe] 4f¹³ 6s²', standard_state: 'SOLID', oxidation_states: [2, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nguồn phát tia X di động không cần nguồn điện cho cứu hộ chiến trường, laser thulium phẫu thuật mô mềm.",
    facts_vi: ["Là nguyên tố hiếm thứ hai trong họ Lantan sau promethium không bền.", "Được đặt tên theo Thule, vùng đất thần thoại cực bắc xa xôi lạnh giá theo văn hóa Bắc Âu cổ đại."]
  },
  {
    z: 70, symbol: 'Yb', name_iupac: 'Ytterbium', name_vi: 'Ytecbi', atomic_weight: 173.05,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.1, first_ionization_energy: 603.4,
    electron_config: '[Xe] 4f¹⁴ 6s²', standard_state: 'SOLID', oxidation_states: [2, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Đồng hồ nguyên tử quang học Ytterbium ổn định cao thế hệ mới, laser sợi quang công nghiệp cắt thép tấm dày.",
    facts_vi: ["Độ dẫn điện của Ytterbium tăng vọt khi chịu áp suất cơ học nén cực lớn, dùng làm cảm biến đo áp lực nổ dưới lòng đất.", "Nguyên tố thứ tư được đặt tên theo mỏ khoáng Ytterby Thụy Điển."]
  },
  {
    z: 71, symbol: 'Lu', name_iupac: 'Lutetium', name_vi: 'Luteti', atomic_weight: 174.97,
    group: 3, period: 6, category: 'LANTHANIDE', electronegativity: 1.27, first_ionization_energy: 523.5,
    electron_config: '[Xe] 4f¹⁴ 5d¹ 6s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Đầu dò nhấp nháy tinh thể LSO trong máy chụp cắt lớp phát xạ positron PET phát hiện khối u ung thư sớm.",
    facts_vi: ["Nguyên tố nặng nhất và cứng nhất trong toàn bộ chuỗi họ Lantan.", "Kim loại đất hiếm đắt đỏ bậc nhất do độ phổ biến trong quặng thấp và cực kỳ khó tách tinh khiết."]
  },
  {
    z: 72, symbol: 'Hf', name_iupac: 'Hafnium', name_vi: 'Hafni', atomic_weight: 178.49,
    group: 4, period: 6, category: 'TRANSITION_METAL', electronegativity: 1.3, first_ionization_energy: 658.5,
    electron_config: '[Xe] 4f¹⁴ 5d² 6s²', standard_state: 'SOLID', oxidation_states: [4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Lớp điện môi high-k Hafnium oxide (HfO2) trong bóng bán dẫn vi xử lý Intel Core thế hệ nano, thanh điều khiển tàu ngầm hạt nhân.",
    facts_vi: ["Hấp thụ neutron mạnh gấp 600 lần so với nguyên tố chị em zirconi mặc dù kích thước ion gần như giống hệt nhau.", "Hợp kim Tantalum Hafnium Carbide (Ta4HfC5) là vật liệu có nhiệt độ nóng chảy cao nhất thế giới từng được biết (~4215°C)."]
  },
  {
    z: 73, symbol: 'Ta', name_iupac: 'Tantalum', name_vi: 'Tantan', atomic_weight: 180.95,
    group: 5, period: 6, category: 'TRANSITION_METAL', electronegativity: 1.5, first_ionization_energy: 761.0,
    electron_config: '[Xe] 4f¹⁴ 5d³ 6s²', standard_state: 'SOLID', oxidation_states: [5], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Tụ điện tantan thể tích siêu nhỏ dung lượng cao trong bảng mạch điện thoại di động và máy tính bảng cao cấp.",
    facts_vi: ["Hoàn toàn miễn nhiễm với sự ăn mòn của acid clohidric, acid nitric và nước cường toan ở nhiệt độ phòng.", "Đặt theo vua Tantalus trong thần thoại Hy Lạp bị đày xuống hồ nước nhưng không thể uống được nước."]
  },
  {
    z: 74, symbol: 'W', name_iupac: 'Tungsten', name_vi: 'Vonfram', atomic_weight: 183.84,
    group: 6, period: 6, category: 'TRANSITION_METAL', electronegativity: 2.36, first_ionization_energy: 770.0,
    electron_config: '[Xe] 4f¹⁴ 5d⁴ 6s²', standard_state: 'SOLID', oxidation_states: [4, 6], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Sợi đốt bóng đèn tròn chịu nhiệt, đầu đạn xuyên giáp mật độ cao quân sự, mũi khoan kim loại vonfram cacbua WC siêu cứng.",
    facts_vi: ["Kim loại có nhiệt độ nóng chảy cao nhất trong toàn bộ bảng tuần hoàn (3422°C, 6192°F).", "Áp suất hơi cực kỳ thấp ở nhiệt độ cao, bền bỉ ngay cả trong điều kiện buồng phóng điện hồ quang plasma."]
  },
  {
    z: 75, symbol: 'Re', name_iupac: 'Rhenium', name_vi: 'Reni', atomic_weight: 186.21,
    group: 7, period: 6, category: 'TRANSITION_METAL', electronegativity: 1.9, first_ionization_energy: 760.0,
    electron_config: '[Xe] 4f¹⁴ 5d⁵ 6s²', standard_state: 'SOLID', oxidation_states: [4, 7], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Hợp kim siêu chịu nhiệt đơn tinh thể làm cánh turbine buồng đốt động cơ máy bay phản lực thương mại Boeing/Airbus.",
    facts_vi: ["Nguyên tố bền cuối cùng trong bảng tuần hoàn được nhân loại phát hiện vào năm 1925 tại Đức.", "Có nhiệt độ sôi cao thứ hai (5596°C) và nhiệt độ nóng chảy cao thứ ba (3186°C) trong các nguyên tố."]
  },
  {
    z: 76, symbol: 'Os', name_iupac: 'Osmium', name_vi: 'Osmi', atomic_weight: 190.23,
    group: 8, period: 6, category: 'TRANSITION_METAL', electronegativity: 2.2, first_ionization_energy: 840.0,
    electron_config: '[Xe] 4f¹⁴ 5d⁶ 6s²', standard_state: 'SOLID', oxidation_states: [4, 8], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Đầu ngòi bút máy vĩnh cửu không mòn, trục xoay đồng hồ cơ khí chính xác cao, thuốc nhuộm màng lipid hiển vi điện tử.",
    facts_vi: ["Nguyên tố có khối lượng riêng nặng nhất trong tự nhiên (D = 22.59 g/cm³, nặng hơn chì gấp 2 lần).", "Hợp chất Osmium tetroxide (OsO4) dễ bay hơi có mùi hăng nồng cực độc làm bỏng rát giác mạc mắt."]
  },
  {
    z: 77, symbol: 'Ir', name_iupac: 'Iridium', name_vi: 'Iridi', atomic_weight: 192.22,
    group: 9, period: 6, category: 'TRANSITION_METAL', electronegativity: 2.2, first_ionization_energy: 880.0,
    electron_config: '[Xe] 4f¹⁴ 5d⁷ 6s²', standard_state: 'SOLID', oxidation_states: [3, 4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Bugi đánh lửa iridi siêu bền cho xe đua F1 và máy bay trực thăng, chén nung đơn tinh thể laser ở 2000°C.",
    facts_vi: ["Kim loại có khả năng chống ăn mòn hóa học cao nhất thế giới, không suy chuyển trước mọi acid và nước cường toan sôi.", "Lớp địa tầng đất sét mỏng chứa nồng độ Iridi dị thường trên toàn cầu là bằng chứng tiểu hành tinh quét sạch loài khủng long 66 triệu năm trước."]
  },
  {
    z: 78, symbol: 'Pt', name_iupac: 'Platinum', name_vi: 'Bạch kim', atomic_weight: 195.08,
    group: 10, period: 6, category: 'TRANSITION_METAL', electronegativity: 2.28, first_ionization_energy: 870.0,
    electron_config: '[Xe] 4f¹⁴ 5d⁹ 6s¹', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Trang sức bạch kim quý phái, chất xúc tác sản xuất acid nitric Ostwald, thuốc hóa trị ung thư cisplatin điều trị ung thư tinh hoàn.",
    facts_vi: ["Kim loại quý cực kỳ trơ, không bị oxi hóa ở bất kỳ nhiệt độ nào trong không khí quyển.", "Cisplatin [Pt(NH3)2Cl2] tạo liên kết chéo với chuỗi xoắn kép ADN tế bào ung thư để ngăn chặn sự phân chia bất thường."]
  },
  {
    z: 79, symbol: 'Au', name_iupac: 'Gold', name_vi: 'Vàng', atomic_weight: 196.97,
    group: 11, period: 6, category: 'TRANSITION_METAL', electronegativity: 2.54, first_ionization_energy: 890.1,
    electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', standard_state: 'SOLID', oxidation_states: [1, 3], role: 'INERT_SHIELD',
    unlockedByDefault: true,
    apps_vi: "Bảo chứng dự trữ tài chính quốc tế, tiếp điểm vi mạch điện tử mạ vàng chống ăn mòn, lớp màng phản xạ hồng ngoại kính phi hành gia.",
    facts_vi: ["Kim loại dẻo nhất hành tinh: chỉ 1 gram vàng có thể kéo dài thành sợi dây mảnh 2 km hoặc cán thành lá mỏng 0.0001 mm xuyên thấu ánh sáng.", "Màu vàng ánh kim độc nhất bắt nguồn từ hiệu ứng tương đối tính hẹp Einstein làm co cụm orbital 6s."]
  },
  {
    z: 80, symbol: 'Hg', name_iupac: 'Mercury', name_vi: 'Thủy ngân', atomic_weight: 200.59,
    group: 12, period: 6, category: 'TRANSITION_METAL', electronegativity: 2.0, first_ionization_energy: 1007.1,
    electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', standard_state: 'LIQUID', oxidation_states: [1, 2], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nhiệt kế thủy ngân y tế cổ điển, áp kế đo khí quyển Torricelli, hỗn hống nha khoa hàn răng amalgam.",
    facts_vi: ["Kim loại duy nhất ở thể lỏng tại điều kiện phòng (nóng chảy ở -38.83°C).", "Khí hơi thủy ngân và các hợp chất hữu cơ (methylmercury) gây tổn thương thần kinh trung ương vĩnh viễn (thảm họa Minamata)."]
  },
  {
    z: 81, symbol: 'Tl', name_iupac: 'Thallium', name_vi: 'Tali', atomic_weight: 204.38,
    group: 13, period: 6, category: 'POST_TRANSITION', electronegativity: 1.62, first_ionization_energy: 589.4,
    electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', standard_state: 'SOLID', oxidation_states: [1, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Thuốc xạ hình tim mạch Thallium-201, thấu kính quang học hồng ngoại muối KRS-5, thuốc diệt chuột cấm.",
    facts_vi: ["Độc tố tế bào khét tiếng làm rụng tóc hàng loạt và tê liệt thần kinh vận động do thay thế ion K+ trong tế bào.", "Cháy trên ngọn lửa cho vệt quang phổ màu xanh lục lục bảo tươi sáng (Thallos = chồi non màu xanh)."]
  },
  {
    z: 82, symbol: 'Pb', name_iupac: 'Lead', name_vi: 'Chì', atomic_weight: 207.2,
    group: 14, period: 6, category: 'POST_TRANSITION', electronegativity: 2.33, first_ionization_energy: 715.6,
    electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Bình ắc quy chì-acid trong ô tô xe máy, tấm chắn bảo vệ tia bức xạ X và tia gamma trong phòng chụp X-quang bệnh viện.",
    facts_vi: ["Kim loại nặng có điểm dừng phân rã phóng xạ cuối cùng của các chuỗi phóng xạ tự nhiên urani và thori.", "Độc tố thần kinh làm giảm chỉ số thông minh IQ ở trẻ nhỏ, đã bị cấm hoàn toàn trong xăng pha chì và sơn tường."]
  },
  {
    z: 83, symbol: 'Bi', name_iupac: 'Bismuth', name_vi: 'Bismut', atomic_weight: 208.98,
    group: 15, period: 6, category: 'POST_TRANSITION', electronegativity: 2.02, first_ionization_energy: 703.0,
    electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', standard_state: 'SOLID', oxidation_states: [3, 5], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Thuốc chữa đau dạ dày Pepto-Bismol (bismuth subsalicylate), cầu chì an toàn phòng cháy chữa cháy tự chảy ở nhiệt độ thấp.",
    facts_vi: ["Kim loại nặng duy nhất gần như không độc, có tinh thể dạng bậc thang cầu vồng óng ánh tuyệt đẹp do màng oxit giao thoa.", "Từng được coi là nguyên tố bền cuối cùng, năm 2003 phát hiện phân rã phóng xạ alpha với chu kỳ bán rã cực lớn 2x10¹⁹ năm."]
  },
  {
    z: 84, symbol: 'Po', name_iupac: 'Polonium', name_vi: 'Poloni', atomic_weight: 209.0,
    group: 16, period: 6, category: 'POST_TRANSITION', electronegativity: 2.0, first_ionization_energy: 812.1,
    electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: false,
    apps_vi: "Nguồn phóng xạ hạt alpha chống tĩnh điện trong sản xuất vi mạch bán dẫn, nguồn sưởi nhiệt vệ tinh không gian Lunokhod.",
    facts_vi: ["Được Marie Curie phát hiện năm 1898 và đặt tên theo tổ quốc Ba Lan (Poland) của bà.", "Chất cực độc phóng xạ phát hạt alpha năng lượng cao làm nóng tự phát đỏ rực trong không khí."]
  },
  {
    z: 85, symbol: 'At', name_iupac: 'Astatine', name_vi: 'Astatin', atomic_weight: 210.0,
    group: 17, period: 6, category: 'HALOGEN', electronegativity: 2.2, first_ionization_energy: 920.0,
    electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', standard_state: 'SOLID', oxidation_states: [-1, 1], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: false,
    apps_vi: "Đồng vị phóng xạ Astatine-211 trong liệu pháp miễn dịch phóng xạ nhắm trúng đích alpha tiêu diệt tế bào ung thư di căn.",
    facts_vi: ["Nguyên tố tự nhiên hiếm nhất trong lớp vỏ Trái Đất, tổng khối lượng ước tính toàn cầu chưa đầy 25 gram tại bất kỳ thời điểm nào.", "Tên gọi có nguồn gốc từ tiếng Hy Lạp 'astatos' nghĩa là không bền vững, đồng vị sống lâu nhất chỉ có chu kỳ bán rã 8.1 giờ."]
  },
  {
    z: 86, symbol: 'Rn', name_iupac: 'Radon', name_vi: 'Radon', atomic_weight: 222.0,
    group: 18, period: 6, category: 'NOBLE_GAS', electronegativity: 2.2, first_ionization_energy: 1037.0,
    electron_config: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', standard_state: 'GAS', oxidation_states: [0, 2], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Dự báo động đất thông qua nồng độ khí thoát ra từ đứt gãy địa chất, bức xạ điều trị ung thư cổ điển.",
    facts_vi: ["Khí hiếm phóng xạ không màu không mùi sinh ra từ sự phân rã radium trong đất đá tự nhiên dưới móng nhà.", "Nguyên nhân gây ung thư phổi hàng đầu ở người không hút thuốc lá do hít phải bụi con cháu phân rã phóng xạ."]
  },
  {
    z: 87, symbol: 'Fr', name_iupac: 'Francium', name_vi: 'Franxi', atomic_weight: 223.0,
    group: 1, period: 7, category: 'ALKALI_METAL', electronegativity: 0.7, first_ionization_energy: 380.0,
    electron_config: '[Rn] 7s¹', standard_state: 'SOLID', oxidation_states: [1], role: 'BURST_REDUCTION',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu vật lý lý thuyết về lực tương tác yếu và cấu trúc nguyên tử trong bẫy bẫy magneto-optical laser.",
    facts_vi: ["Nguyên tố có độ âm điện thấp nhất bảng tuần hoàn (χ = 0.70 Pauling).", "Kim loại kiềm có tính phóng xạ cực kỳ bất ổn, đồng vị bền nhất Francium-223 chỉ tồn tại được trong 22 phút."]
  },
  {
    z: 88, symbol: 'Ra', name_iupac: 'Radium', name_vi: 'Radi', atomic_weight: 226.0,
    group: 2, period: 7, category: 'ALKALINE_EARTH', electronegativity: 0.9, first_ionization_energy: 509.3,
    electron_config: '[Rn] 7s²', standard_state: 'SOLID', oxidation_states: [2], role: 'BURST_REDUCTION',
    unlockedByDefault: false,
    apps_vi: "Sơn dạ quang phát sáng mặt đồng hồ quân sự thời Thế chiến I, xạ trị tế bào ung thư thời kỳ đầu thế kỷ 20.",
    facts_vi: ["Marie và Pierre Curie phát hiện năm 1898, phát ra ánh sáng huỳnh quang màu xanh lơ ma mị trong bóng tối.", "Vụ kiện bi thương 'Những cô gái Radium' (Radium Girls) đã làm thay đổi toàn bộ luật an toàn vệ sinh lao động quốc tế."]
  },
  {
    z: 89, symbol: 'Ac', name_iupac: 'Actinium', name_vi: 'Actini', atomic_weight: 227.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.1, first_ionization_energy: 499.0,
    electron_config: '[Rn] 6d¹ 7s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nguồn phát tia alpha nhắm mục tiêu y học Ac-225 trong điều trị ung thư tuyến tiền liệt giai đoạn cuối.",
    facts_vi: ["Nguyên tố mở đầu chuỗi 15 nguyên tố họ Actini (Actinides) đều có tính phóng xạ tự nhiên hoặc nhân tạo.", "Phát ra ánh sáng xanh lam huyền ảo trong không khí do ion hóa các phân tử khí quyển xung quanh."]
  },
  {
    z: 90, symbol: 'Th', name_iupac: 'Thorium', name_vi: 'Thori', atomic_weight: 232.04,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.3, first_ionization_energy: 587.0,
    electron_config: '[Rn] 6d² 7s²', standard_state: 'SOLID', oxidation_states: [4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Nhiên liệu lò phản ứng muối nóng chảy thế hệ 4 LFTR sạch hơn và an toàn hơn urani, que hàn TIG chịu nhiệt.",
    facts_vi: ["Dồi dào gấp 3-4 lần so với urani trong vỏ Trái Đất và không thể dùng trực tiếp để chế tạo bom nguyên tử.", "Được đặt theo tên vị thần sấm sét Thor dũng mãnh trong thần thoại Bắc Âu."]
  },
  {
    z: 91, symbol: 'Pa', name_iupac: 'Protactinium', name_vi: 'Protactini', atomic_weight: 231.04,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.5, first_ionization_energy: 568.0,
    electron_config: '[Rn] 5f² 6d¹ 7s²', standard_state: 'SOLID', oxidation_states: [4, 5], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Định tuổi trầm tích đại dương đáy biển sâu trong hải dương học và biến đổi khí hậu cổ đại.",
    facts_vi: ["Sản phẩm phân rã trung gian đóng vai trò 'ông tổ' sinh ra Actinium qua phân rã phóng xạ alpha.", "Kim loại siêu hiếm và độc hại cao do bức xạ alpha nguy hiểm, đòi hỏi hộp găng tay cô lập áp suất âm đặc biệt."]
  },
  {
    z: 92, symbol: 'U', name_iupac: 'Uranium', name_vi: 'Urani', atomic_weight: 238.03,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.38, first_ionization_energy: 597.6,
    electron_config: '[Rn] 5f³ 6d¹ 7s²', standard_state: 'SOLID', oxidation_states: [3, 4, 6], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nhiên liệu phân hạch trong hơn 400 nhà máy điện hạt nhân dân sự toàn cầu (U-235), đạn xuyên giáp urani nghèo U-238.",
    facts_vi: ["Đồng vị U-235 là chất duy nhất có trong tự nhiên có thể duy trì phản ứng phân hạch dây chuyền giải phóng năng lượng E=mc² khổng lồ.", "1 kg Urani-235 giải phóng năng lượng tương đương với việc đốt cháy khoảng 2,700 tấn than đá tiêu chuẩn."]
  },
  {
    z: 93, symbol: 'Np', name_iupac: 'Neptunium', name_vi: 'Neptuni', atomic_weight: 237.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.36, first_ionization_energy: 604.5,
    electron_config: '[Rn] 5f⁴ 6d¹ 7s²', standard_state: 'SOLID', oxidation_states: [3, 4, 5, 6], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Đầu dò phát hiện neutron năng lượng cao, nguyên liệu tiền chất để tổng hợp đồng vị phóng xạ Plutonium-238.",
    facts_vi: ["Nguyên tố siêu urani nhân tạo đầu tiên được tạo ra tại Đại học California Berkeley năm 1940.", "Đặt tên theo Sao Hải Vương (Neptune), hành tinh tiếp theo sau Sao Thiên Vương (Uranus)."]
  },
  {
    z: 94, symbol: 'Pu', name_iupac: 'Plutonium', name_vi: 'Plutoni', atomic_weight: 244.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.28, first_ionization_energy: 584.7,
    electron_config: '[Rn] 5f⁶ 7s²', standard_state: 'SOLID', oxidation_states: [3, 4, 5, 6], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nguồn nhiệt phát điện RTG cho tàu vũ trụ thám hiểm Voyager, New Horizons và robot sao Hỏa Curiosity (Pu-238), vũ khí hạt nhân (Pu-239).",
    facts_vi: ["1 gram Plutoni có thể sinh nhiệt ấm nóng tay người liên tục trong hàng thập kỷ nhờ phân rã alpha nội tại.", "Là nguyên tố nhân tạo nguy hiểm nhất với liều gây tử vong cấp tính tính bằng microgram nếu hít vào phổi."]
  },
  {
    z: 95, symbol: 'Am', name_iupac: 'Americium', name_vi: 'Americi', atomic_weight: 243.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.13, first_ionization_energy: 578.0,
    electron_config: '[Rn] 5f⁷ 7s²', standard_state: 'SOLID', oxidation_states: [3, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Đầu báo khói ion hóa cứu sinh trong hầu hết các hộ gia đình (chứa một lượng siêu vi Americium-241 an toàn).",
    facts_vi: ["Nguyên tố nhân tạo duy nhất mà người dân bình thường có thể sở hữu hợp pháp trong gia đình dưới dạng cảm biến báo khói.", "Tia alpha từ Am-241 ion hóa không khí tạo dòng điện, khi có hạt khói xâm nhập sẽ ngắt dòng điện và kích hoạt còi báo động."]
  },
  {
    z: 96, symbol: 'Cm', name_iupac: 'Curium', name_vi: 'Curi', atomic_weight: 247.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.28, first_ionization_energy: 581.0,
    electron_config: '[Rn] 5f⁷ 6d¹ 7s²', standard_state: 'SOLID', oxidation_states: [3, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Máy phân tích tia X hạt alpha APXS gắn trên các xe thám hiểm tự hành Rover phân tích thành phần khoáng vật đất đá Sao Hỏa.",
    facts_vi: ["Được đặt tên để vinh danh vợ chồng hai nhà bác học vĩ đại Marie Curie và Pierre Curie.", "Tỏa nhiệt phóng xạ mãnh liệt đến mức có thể tự nóng chảy nếu tích tụ một khối lượng đủ lớn mà không làm lạnh."]
  },
  {
    z: 97, symbol: 'Bk', name_iupac: 'Berkelium', name_vi: 'Berkelium', atomic_weight: 247.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.3, first_ionization_energy: 601.0,
    electron_config: '[Rn] 5f⁹ 7s²', standard_state: 'SOLID', oxidation_states: [3, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Bia bắn hạt nhân dùng để tổng hợp nguyên tố siêu nặng số hiệu Z=117 (Tennessine) tại viện Dubna Nga.",
    facts_vi: ["Được tổng hợp năm 1949 tại Phòng thí nghiệm Quốc gia Lawrence Berkeley và đặt theo tên thành phố Berkeley, California.", "Được sản xuất với sản lượng cực ít tính bằng miligram trong lò phản ứng hạt nhân thông lượng cao Oak Ridge."]
  },
  {
    z: 98, symbol: 'Cf', name_iupac: 'Californium', name_vi: 'Californium', atomic_weight: 251.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.3, first_ionization_energy: 608.0,
    electron_config: '[Rn] 5f¹⁰ 7s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nguồn phát neutron mạnh mẽ dùng để khởi động lò phản ứng hạt nhân, quét phát hiện chất nổ vũ khí tại sân bay.",
    facts_vi: ["Đồng vị Californium-252 phát ra 170 triệu neutron mỗi giây chỉ từ 1 microgram vật chất qua phân hạch tự phát.", "Một trong những nguyên tố có giá bán đắt nhất thế giới, lên tới khoảng 27 triệu USD cho mỗi gram."]
  },
  {
    z: 99, symbol: 'Es', name_iupac: 'Einsteinium', name_vi: 'Einsteinium', atomic_weight: 252.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.3, first_ionization_energy: 619.0,
    electron_config: '[Rn] 5f¹¹ 7s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu tính chất hóa học và tương tác cơ học lượng tử của các electron phân lớp 5f ở ranh giới bảng tuần hoàn.",
    facts_vi: ["Được tìm thấy lần đầu tiên trong đám mây tro bụi phóng xạ của vụ thử bom nhiệt hạch khinh khí Ivy Mike năm 1952 tại Thái Bình Dương.", "Đặt tên để vinh danh nhà vật lý lý thuyết vĩ đại Albert Einstein."]
  },
  {
    z: 100, symbol: 'Fm', name_iupac: 'Fermium', name_vi: 'Fermium', atomic_weight: 257.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.3, first_ionization_energy: 627.0,
    electron_config: '[Rn] 5f¹² 7s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nguyên tố nặng nhất có thể tạo ra bằng phương pháp bắt giữ neutron liên tục trong lò phản ứng hạt nhân.",
    facts_vi: ["Được đặt tên để vinh danh Enrico Fermi, cha đẻ của lò phản ứng hạt nhân nhân tạo đầu tiên trên thế giới.", "Từ nguyên tố số 101 trở đi, bắt buộc phải dùng máy gia tốc hạt bắn phá ion nặng trực tiếp mới có thể tổng hợp được."]
  },
  {
    z: 101, symbol: 'Md', name_iupac: 'Mendelevium', name_vi: 'Mendelevium', atomic_weight: 258.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.3, first_ionization_energy: 635.0,
    electron_config: '[Rn] 5f¹³ 7s²', standard_state: 'SOLID', oxidation_states: [2, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu lịch sử tổng hợp từng nguyên tử một (atom-at-a-time chemistry) trong máy gia tốc.",
    facts_vi: ["Được đặt theo tên Dmitri Mendeleev, người phát minh ra Bảng tuần hoàn các nguyên tố hóa học năm 1869.", "Lần đầu tiên được tạo ra với số lượng đếm được vỏn vẹn đúng 17 nguyên tử vào năm 1955."]
  },
  {
    z: 102, symbol: 'No', name_iupac: 'Nobelium', name_vi: 'Nobelium', atomic_weight: 259.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.3, first_ionization_energy: 642.0,
    electron_config: '[Rn] 5f¹⁴ 7s²', standard_state: 'SOLID', oxidation_states: [2, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu hành vi số oxi hóa +2 bền bất thường do phân lớp 5f đã được lấp đầy hoàn toàn 14 electron.",
    facts_vi: ["Được đặt tên để vinh danh Alfred Nobel, nhà phát minh thuốc nổ dynamite và người sáng lập giải thưởng Nobel.", "Chu kỳ bán rã của đồng vị bền nhất chỉ khoảng 58 phút."]
  },
  {
    z: 103, symbol: 'Lr', name_iupac: 'Lawrencium', name_vi: 'Lawrencium', atomic_weight: 266.0,
    group: 3, period: 7, category: 'ACTINIDE', electronegativity: 1.3, first_ionization_energy: 470.0,
    electron_config: '[Rn] 5f¹⁴ 7s² 7p¹', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nguyên tố cuối cùng của chuỗi họ Actini, khép lại sự điền đầy electron vào phân lớp f.",
    facts_vi: ["Đặt tên theo Ernest Lawrence, người phát minh ra máy gia tốc hạt cyclotron đóng góp nền tảng cho vật lý hạt nhân.", "Electron hóa trị ngoài cùng điền vào orbital 7p1 thay vì 6d1 do hiệu ứng co tương đối tính đặc biệt."]
  },
  {
    z: 104, symbol: 'Rf', name_iupac: 'Rutherfordium', name_vi: 'Rutherfordium', atomic_weight: 267.0,
    group: 4, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 580.0,
    electron_config: '[Rn] 5f¹⁴ 6d² 7s²', standard_state: 'SOLID', oxidation_states: [4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu hóa học nguyên tố siêu nặng nhóm IVB đối chiếu với hafnium và zirconi.",
    facts_vi: ["Đặt tên theo Ernest Rutherford, cha đẻ của vật lý hạt nhân và mô hình nguyên tử có hạt nhân.", "Nguyên tố chuyển tiếp siêu nặng đầu tiên của khối d chu kì 7."]
  },
  {
    z: 105, symbol: 'Db', name_iupac: 'Dubnium', name_vi: 'Dubnium', atomic_weight: 268.0,
    group: 5, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 660.0,
    electron_config: '[Rn] 5f¹⁴ 6d³ 7s²', standard_state: 'SOLID', oxidation_states: [5], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu tương đồng hóa học nhóm VB với tantal và niobi trong dung dịch nước.",
    facts_vi: ["Đặt tên theo thành phố khoa học Dubna của Nga, nơi đặt Viện Liên hiệp Nghiên cứu Hạt nhân JINR lừng danh.", "Được tổng hợp qua phản ứng bắn phá bia Californium-249 bằng chùm tia ion Nitơ-15."]
  },
  {
    z: 106, symbol: 'Sg', name_iupac: 'Seaborgium', name_vi: 'Seaborgium', atomic_weight: 269.0,
    group: 6, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 760.0,
    electron_config: '[Rn] 5f¹⁴ 6d⁴ 7s²', standard_state: 'SOLID', oxidation_states: [6], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Tổng hợp phức chất carbonyl siêu nặng Sg(CO)6 chứng minh tính chất tương đồng với vonfram W(CO)6.",
    facts_vi: ["Nguyên tố đầu tiên được đặt theo tên một nhà khoa học còn sống vào thời điểm đặt tên (Glenn T. Seaborg).", "Việc đặt tên từng gây tranh cãi quốc tế kéo dài nhiều năm trước khi được IUPAC chính thức phê duyệt năm 1997."]
  },
  {
    z: 107, symbol: 'Bh', name_iupac: 'Bohrium', name_vi: 'Bohrium', atomic_weight: 270.0,
    group: 7, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 740.0,
    electron_config: '[Rn] 5f¹⁴ 6d⁵ 7s²', standard_state: 'SOLID', oxidation_states: [7], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu hóa học pha khí hợp chất bay hơi oxychloride BhO3Cl tương đồng nhóm VIIB.",
    facts_vi: ["Đặt tên để vinh danh nhà vật lý lý thuyết vĩ đại Niels Bohr với mô hình cấu trúc nguyên tử các quỹ đạo lượng tử.", "Được tổng hợp tại Viện Nghiên cứu Ion nặng GSI Darmstadt của Đức năm 1981."]
  },
  {
    z: 108, symbol: 'Hs', name_iupac: 'Hassium', name_vi: 'Hassium', atomic_weight: 269.0,
    group: 8, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 730.0,
    electron_config: '[Rn] 5f¹⁴ 6d⁶ 7s²', standard_state: 'SOLID', oxidation_states: [8], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Xác nhận số oxi hóa cao kỷ lục +8 ở nguyên tố siêu nặng thông qua phân tử tetroxide bay hơi HsO4.",
    facts_vi: ["Đặt tên theo bang Hessen (Hassia trong tiếng Latin), nơi tọa lạc viện nghiên cứu hạt nhân GSI Darmstadt của Đức.", "Hassium tetroxide có nhiệt độ thăng hoa gần tương đương với OsO4 chứng minh tính tuần hoàn vẫn bảo toàn ở vùng siêu nặng."]
  },
  {
    z: 109, symbol: 'Mt', name_iupac: 'Meitnerium', name_vi: 'Meitnerium', atomic_weight: 278.0,
    group: 9, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 800.0,
    electron_config: '[Rn] 5f¹⁴ 6d⁷ 7s²', standard_state: 'SOLID', oxidation_states: [3, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu ranh giới bền vững hạt nhân ở các hạt nhân giàu proton có năng lượng liên kết cực hạn.",
    facts_vi: ["Đặt tên để vinh danh nhà nữ vật lý Lise Meitner, người giải thích bản chất phân hạch hạt nhân bị bỏ quên giải Nobel.", "Là người phụ nữ duy nhất không phải hoàng gia được vinh danh độc lập trên bảng tuần hoàn nguyên tố."]
  },
  {
    z: 110, symbol: 'Ds', name_iupac: 'Darmstadtium', name_vi: 'Darmstadtium', atomic_weight: 281.0,
    group: 10, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 950.0,
    electron_config: '[Rn] 5f¹⁴ 6d⁸ 7s²', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nghiên cứu cấu trúc đồng vị siêu nặng nhóm 10 và hiệu ứng tương đối tính làm co orbital d.",
    facts_vi: ["Đặt theo tên thành phố khoa học Darmstadt của Đức, nơi tổng hợp thành công 6 nguyên tố siêu nặng 107-112.", "Được tạo ra bằng cách bắn phá bia chì chì-208 bằng chùm hạt nhân niken niken-62 trong máy gia tốc UNILAC."]
  },
  {
    z: 111, symbol: 'Rg', name_iupac: 'Roentgenium', name_vi: 'Roentgenium', atomic_weight: 282.0,
    group: 11, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 1020.0,
    electron_config: '[Rn] 5f¹⁴ 6d⁹ 7s²', standard_state: 'SOLID', oxidation_states: [3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Đồng đẳng siêu nặng của vàng (Au) dùng để kiểm chứng hiệu ứng co tương đối tính đối với liên kết hóa học kim loại.",
    facts_vi: ["Đặt tên để vinh danh Wilhelm Conrad Röntgen, nhà bác học đoạt giải Nobel Vật lý đầu tiên phát minh ra tia X năm 1895.", "Nguyên tố quý tộc siêu nặng có ái lực electron cao bất thường theo tính toán hóa học lượng tử."]
  },
  {
    z: 112, symbol: 'Cn', name_iupac: 'Copernicium', name_vi: 'Copernicium', atomic_weight: 285.0,
    group: 12, period: 7, category: 'TRANSITION_METAL', electronegativity: null, first_ionization_energy: 1155.0,
    electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s²', standard_state: 'LIQUID', oxidation_states: [2], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Kiểm nghiệm trạng thái vật lý lỏng hoặc khí dễ bay hơi tương tự khí hiếm do orbital 7s bị co rút tương đối tính mạnh.",
    facts_vi: ["Đặt tên để vinh danh nhà thiên văn học Nicolaus Copernicus, người đã đặt Mặt Trời vào trung tâm của Hệ Mặt Trời.", "Có thể ở thể khí hoặc lỏng dễ bay hơi ở nhiệt độ phòng do cặp electron 7s² bão hòa trơ."]
  },
  {
    z: 113, symbol: 'Nh', name_iupac: 'Nihonium', name_vi: 'Nihonium', atomic_weight: 286.0,
    group: 13, period: 7, category: 'POST_TRANSITION', electronegativity: null, first_ionization_energy: 705.0,
    electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', standard_state: 'SOLID', oxidation_states: [1, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nguyên tố đầu tiên được phát hiện tại châu Á, nghiên cứu hóa tính nhóm IIIA dưới tác động hiệu ứng spin-quỹ đạo.",
    facts_vi: ["Được các nhà khoa học Nhật Bản tại viện RIKEN tổng hợp thành công sau hơn 9 năm kiên trì bắn phá hạt nhân.", "Nihon là cách gọi quốc hiệu của đất nước Nhật Bản trong tiếng Nhật (xứ sở Mặt Trời mọc)."]
  },
  {
    z: 114, symbol: 'Fl', name_iupac: 'Flerovium', name_vi: 'Flerovium', atomic_weight: 289.0,
    group: 14, period: 7, category: 'POST_TRANSITION', electronegativity: null, first_ionization_energy: 824.0,
    electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Nằm ngay tâm của vùng giả thuyết 'Đảo bền vững' (Island of Stability) hạt nhân lý thuyết.",
    facts_vi: ["Đặt tên theo Phòng thí nghiệm Phản ứng Hạt nhân Flerov tại viện Dubna Nga và nhà vật lý Georgy Flyorov.", "Hóa tính yếu hơn nhiều so với chì, thể hiện xu hướng trơ giống khí hiếm do orbital 7p1/2 được lấp đầy."]
  },
  {
    z: 115, symbol: 'Mc', name_iupac: 'Moscovium', name_vi: 'Moscovium', atomic_weight: 290.0,
    group: 15, period: 7, category: 'POST_TRANSITION', electronegativity: null, first_ionization_energy: 538.0,
    electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', standard_state: 'SOLID', oxidation_states: [1, 3], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Kiểm chứng sự phân rã chuỗi alpha dẫn tới nihonium và rutherfordium trong vật lý hạt nhân thực nghiệm.",
    facts_vi: ["Đặt tên theo vùng Moskva (Moscow Oblast), cái nôi nghiên cứu hạt nhân của Viện Liên hiệp JINR Dubna Nga.", "Được tổng hợp từ phản ứng tổng hợp nhiệt hạch lạnh giữa hạt nhân Americium-243 và Canxi-48."]
  },
  {
    z: 116, symbol: 'Lv', name_iupac: 'Livermorium', name_vi: 'Livermorium', atomic_weight: 293.0,
    group: 16, period: 7, category: 'POST_TRANSITION', electronegativity: null, first_ionization_energy: 723.0,
    electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', standard_state: 'SOLID', oxidation_states: [2, 4], role: 'VARIABLE_VALENCE',
    unlockedByDefault: false,
    apps_vi: "Khảo sát ranh giới phân hạch tự phát ở các hạt nhân cực nặng có số khối tiến gần 300.",
    facts_vi: ["Đặt tên để vinh danh Phòng thí nghiệm Quốc gia Lawrence Livermore (LLNL) tại California Hoa Kỳ.", "Được tổng hợp qua phản ứng bắn phá bia Curium-248 bằng chùm tia ion Canxi-48 giàu nơtron."]
  },
  {
    z: 117, symbol: 'Ts', name_iupac: 'Tennessine', name_vi: 'Tennessine', atomic_weight: 294.0,
    group: 17, period: 7, category: 'HALOGEN', electronegativity: null, first_ionization_energy: 743.0,
    electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', standard_state: 'SOLID', oxidation_states: [-1, 1, 3], role: 'CORROSIVE_OXIDATION',
    unlockedByDefault: false,
    apps_vi: "Halogen siêu nặng cuối cùng, kiểm tra sự suy giảm tính oxi hóa do tách mức năng lượng tương đối tính spin-orbit.",
    facts_vi: ["Đặt tên theo bang Tennessee của Hoa Kỳ, nơi đặt Phòng thí nghiệm Quốc gia Oak Ridge và Đại học Vanderbilt.", "Cần sử dụng bia Berkelium-249 quý giá sản xuất liên tục suốt 250 ngày tại lò phản ứng thông lượng cao HFIR."]
  },
  {
    z: 118, symbol: 'Og', name_iupac: 'Oganesson', name_vi: 'Oganesson', atomic_weight: 294.0,
    group: 18, period: 7, category: 'NOBLE_GAS', electronegativity: null, first_ionization_energy: 860.0,
    electron_config: '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', standard_state: 'SOLID', oxidation_states: [0, 2, 4], role: 'INERT_SHIELD',
    unlockedByDefault: false,
    apps_vi: "Nguyên tố có số hiệu nguyên tử Z=118 cao nhất và nặng nhất từng được nhân loại tổng hợp thành công.",
    facts_vi: ["Đặt tên để vinh danh Viện sĩ Yuri Oganessian, nhà vật lý hạt nhân huyền thoại người Nga gốc Armenia mở đường cho kỷ nguyên siêu nặng.", "Khác với các khí hiếm trước đó, Oganesson được các mô hình hóa học lượng tử dự đoán là một chất rắn bán dẫn ở nhiệt độ phòng do tương tác electron phân tán."]
  },
];

export function generateFull118Elements(): ElementData[] {
  return RAW_ELEMENTS.map(raw => {
    const atk_ox = calculateAtkOx(raw.electronegativity, raw.category);
    const atk_red = calculateAtkRed(raw.first_ionization_energy, raw.category);
    const def_stab = calculateDefStab(raw.first_ionization_energy, raw.symbol, raw.category);
    const mana_cost = calculateManaCost(raw.period, raw.category, def_stab);
    return {
      ...raw,
      stats: { atk_ox, atk_red, def_stab, mana_cost }
    };
  });
}

export const ALL_ELEMENTS: ElementData[] = generateFull118Elements();

export const CORE_MVP_ELEMENTS: ElementData[] = ALL_ELEMENTS.filter(e =>
  (e.z <= 20) || [26, 29, 30, 35, 47, 53, 56, 79].includes(e.z)
);

// Environmental Agent Cards (Table 4 & GDPT 2018)
export const ENVIRONMENTAL_CARDS: EnvironmentalCard[] = [
  {
    id: 'env_h2o', symbol: 'H₂O', name_vi: 'Độ ẩm / Nước', name_iupac: 'Water / Moisture',
    conditionType: 'MOISTURE_H2O', mana_cost: 1,
    description_vi: 'Cung cấp dung môi nước hoặc độ ẩm không khí. Bắt buộc để kích hoạt bùng nổ kiềm (Na/K) hoặc tạo gỉ sắt (Fe + O2).',
    pedagogical_note: 'Nước là dung môi phân cực phổ biến nhất, tham gia trực tiếp phản ứng thủy phân và tạo môi trường dẫn điện cho ăn mòn điện hóa.'
  },
  {
    id: 'env_temp', symbol: 't°', name_vi: 'Nhiệt độ cao', name_iupac: 'High Temperature',
    conditionType: 'HIGH_TEMP', mana_cost: 1,
    description_vi: 'Cung cấp năng lượng hoạt hóa nhiệt độ cao. Giúp đốt cháy sắt tạo Fe3O4 hoặc oxi hóa kim loại đồng tạo CuO đen.',
    pedagogical_note: 'Theo quy tắc Van\'t Hoff và phương trình Arrhenius, nhiệt độ tăng làm tăng động năng hạt và số va chạm hiệu quả, gia tốc phản ứng.'
  },
  {
    id: 'env_acid', symbol: 'HCl (loãng)', name_vi: 'Acid loãng', name_iupac: 'Dilute Hydrochloric Acid',
    conditionType: 'ACID_DILUTE', mana_cost: 1,
    description_vi: 'Dung dịch chứa ion H+. Phản ứng với kim loại đứng trước H (Zn, Fe, Mg) giải phóng khí H2, hoặc trung hòa dung dịch kiềm.',
    pedagogical_note: 'Chỉ các kim loại có thế điện cực E° < 0V (đứng trước H trong dãy điện hóa) mới khử được ion H+ thành khí H2.'
  },
  {
    id: 'env_base', symbol: 'NaOH', name_vi: 'Dung dịch Kiềm', name_iupac: 'Sodium Hydroxide Solution',
    conditionType: 'BASE_ALKALINE', mana_cost: 1,
    description_vi: 'Dung dịch kiềm mạnh chứa ion OH-. Trung hòa acid (H+ + OH- -> H2O) hoặc kết tủa ion kim loại nặng.',
    pedagogical_note: 'Phản ứng trung hòa acid-base là phản ứng trao đổi proton tức thời với enthalpy tỏa nhiệt chuẩn dH ≈ -57.3 kJ/mol.'
  },
  {
    id: 'env_o2', symbol: 'O₂', name_vi: 'Khí Oxygen', name_iupac: 'Oxygen Gas',
    conditionType: 'OXYGEN_GAS', mana_cost: 1,
    description_vi: 'Khí oxi trong khí quyển. Tác nhân oxi hóa chủ đạo trong các phản ứng cháy, tạo gỉ kim loại và duy trì phản ứng nhiệt.',
    pedagogical_note: 'O2 chiếm 21% thể tích không khí, tham gia phản ứng oxi hóa chậm tạo màng oxide hoặc cháy rực rỡ khi có nhiệt.'
  }
];