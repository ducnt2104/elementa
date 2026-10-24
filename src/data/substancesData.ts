// src/data/substancesData.ts
// Exhaustive Chemical Substance Catalog for ELEMENTA
// Audited against IUPAC standards and Vietnamese GDPT 2018 curriculum

export type SubstanceCategory =
  | 'ELEMENT'
  | 'OXIDE'
  | 'ACID'
  | 'BASE'
  | 'SALT'
  | 'HYDROCARBON'
  | 'ORGANIC_DERIVATIVE'
  | 'MINERAL_INDUSTRIAL';

export interface ChemicalSubstance {
  id: string;
  name_iupac: string;
  name_vi: string;
  common_names_vi: string[];
  formula: string;
  formula_display: string;
  molar_mass: number;
  category: SubstanceCategory;
  standard_state: 'SOLID' | 'LIQUID' | 'GAS';
  color_vi: string;
  solubility_water_vi: string;
  description_vi: string;
  applications_vi: string[];
  curriculum: string;
}

export const ALL_SUBSTANCES: ChemicalSubstance[] = [
  {
    "id": "sub_h2",
    "name_iupac": "Hydrogen gas",
    "name_vi": "Khí Hiđro",
    "common_names_vi": [
      "Khí hydro"
    ],
    "formula": "H2",
    "formula_display": "H₂",
    "molar_mass": 2.016,
    "category": "ELEMENT",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Rất ít tan trong nước",
    "description_vi": "Khí nhẹ nhất vũ trụ, cháy tỏa nhiệt lớn.",
    "applications_vi": [
      "Nhiên liệu sạch",
      "Sản xuất NH3"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_o2",
    "name_iupac": "Oxygen gas",
    "name_vi": "Khí Oxi",
    "common_names_vi": [
      "Khí oxygen"
    ],
    "formula": "O2",
    "formula_display": "O₂",
    "molar_mass": 31.998,
    "category": "ELEMENT",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Ít tan trong nước",
    "description_vi": "Duy trì sự sống và sự cháy.",
    "applications_vi": [
      "Dưỡng khí y tế",
      "Hàn cắt kim loại"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_o3",
    "name_iupac": "Ozone gas",
    "name_vi": "Khí Ozon",
    "common_names_vi": [
      "Ozone"
    ],
    "formula": "O3",
    "formula_display": "O₃",
    "molar_mass": 47.997,
    "category": "ELEMENT",
    "standard_state": "GAS",
    "color_vi": "Xanh lam nhạt",
    "solubility_water_vi": "Tan vừa phải",
    "description_vi": "Tầng ozon bảo vệ Trái Đất khỏi tia UV, tính oxi hóa cực mạnh.",
    "applications_vi": [
      "Khử trùng nước",
      "Bảo quản thực phẩm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_n2",
    "name_iupac": "Nitrogen gas",
    "name_vi": "Khí Nitơ",
    "common_names_vi": [
      "Khí nitrogen"
    ],
    "formula": "N2",
    "formula_display": "N₂",
    "molar_mass": 28.014,
    "category": "ELEMENT",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Rất ít tan",
    "description_vi": "Chiếm 78% khí quyển, rất trơ ở nhiệt độ phòng do liên kết ba N≡N.",
    "applications_vi": [
      "Bảo quản thực phẩm",
      "Khí trơ bảo vệ"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_cl2",
    "name_iupac": "Chlorine gas",
    "name_vi": "Khí Clo",
    "common_names_vi": [
      "Khí chlorine"
    ],
    "formula": "Cl2",
    "formula_display": "Cl₂",
    "molar_mass": 70.9,
    "category": "ELEMENT",
    "standard_state": "GAS",
    "color_vi": "Vàng lục",
    "solubility_water_vi": "Tan một phần tạo nước clo",
    "description_vi": "Khí độc, mùi xốc ngạt, tính oxi hóa rất mạnh.",
    "applications_vi": [
      "Khử trùng nước",
      "Sản xuất PVC"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_br2",
    "name_iupac": "Bromine liquid",
    "name_vi": "Brom lỏng",
    "common_names_vi": [
      "Nước brom"
    ],
    "formula": "Br2",
    "formula_display": "Br₂",
    "molar_mass": 159.808,
    "category": "ELEMENT",
    "standard_state": "LIQUID",
    "color_vi": "Nâu đỏ",
    "solubility_water_vi": "Tan trong nước tạo nước brom",
    "description_vi": "Chất lỏng phi kim bốc khói màu nâu độc hại.",
    "applications_vi": [
      "Thuốc nhuộm",
      "Hóa chất chống cháy"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_i2",
    "name_iupac": "Iodine solid",
    "name_vi": "Iot rắn",
    "common_names_vi": [
      "Iodine tinh thể"
    ],
    "formula": "I2",
    "formula_display": "I₂",
    "molar_mass": 253.8,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Tím đen",
    "solubility_water_vi": "Rất ít tan trong nước, tan tốt trong cồn",
    "description_vi": "Chất rắn có tính thăng hoa khi đun nóng.",
    "applications_vi": [
      "Sát trùng y tế",
      "Muối iot"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_f2",
    "name_iupac": "Fluorine gas",
    "name_vi": "Khí Flo",
    "common_names_vi": [
      "Khí fluorine"
    ],
    "formula": "F2",
    "formula_display": "F₂",
    "molar_mass": 37.996,
    "category": "ELEMENT",
    "standard_state": "GAS",
    "color_vi": "Lục nhạt",
    "solubility_water_vi": "Phản ứng mãnh liệt bốc cháy với nước",
    "description_vi": "Phi kim hoạt động mạnh nhất bảng tuần hoàn.",
    "applications_vi": [
      "Sản xuất Teflon",
      "Làm giàu hạt nhân UF6"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_p4",
    "name_iupac": "White phosphorus",
    "name_vi": "Photpho trắng",
    "common_names_vi": [
      "P trắng"
    ],
    "formula": "P4",
    "formula_display": "P₄",
    "molar_mass": 123.896,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng ngà",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Tự bốc cháy trong không khí ở 30°C, phát quang lân tinh.",
    "applications_vi": [
      "Chất tạo khói",
      "Vũ khí nhiệt"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_p_red",
    "name_iupac": "Red phosphorus",
    "name_vi": "Photpho đỏ",
    "common_names_vi": [
      "P đỏ"
    ],
    "formula": "P",
    "formula_display": "P",
    "molar_mass": 30.974,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Đỏ sẫm",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Dạng thù hình bền của photpho, dùng làm đầu diêm.",
    "applications_vi": [
      "Thuốc diêm an toàn",
      "Thuốc bảo vệ thực vật"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_s8",
    "name_iupac": "Sulfur solid",
    "name_vi": "Lưu huỳnh",
    "common_names_vi": [
      "Bột lưu huỳnh"
    ],
    "formula": "S8",
    "formula_display": "S₈",
    "molar_mass": 256.48,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Vàng chanh",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Chất rắn màu vàng, cháy ngọn lửa màu xanh lam tạo SO2.",
    "applications_vi": [
      "Lưu hóa cao su",
      "Sản xuất H2SO4"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_c_graphite",
    "name_iupac": "Graphite",
    "name_vi": "Than chì",
    "common_names_vi": [
      "Graphite"
    ],
    "formula": "C",
    "formula_display": "C",
    "molar_mass": 12.011,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Đen xám",
    "solubility_water_vi": "Không tan",
    "description_vi": "Thù hình dẫn điện tốt của carbon, mềm có cấu trúc lớp.",
    "applications_vi": [
      "Điện cực pin",
      "Ruột bút chì"
    ],
    "curriculum": "GDPT_2018_KHTN_9"
  },
  {
    "id": "sub_c_diamond",
    "name_iupac": "Diamond",
    "name_vi": "Kim cương",
    "common_names_vi": [
      "Diamond"
    ],
    "formula": "C",
    "formula_display": "C",
    "molar_mass": 12.011,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trong suốt lấp lánh",
    "solubility_water_vi": "Không tan",
    "description_vi": "Khoáng vật cứng nhất tự nhiên, dẫn nhiệt tuyệt vời.",
    "applications_vi": [
      "Mũi khoan kỹ thuật",
      "Trang sức cao cấp"
    ],
    "curriculum": "GDPT_2018_KHTN_9"
  },
  {
    "id": "sub_fe",
    "name_iupac": "Iron metal",
    "name_vi": "Sắt kim loại",
    "common_names_vi": [
      "Sắt"
    ],
    "formula": "Fe",
    "formula_display": "Fe",
    "molar_mass": 55.845,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng xám",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại từ tính dẻo, nhiễm từ, nền tảng cơ khí xây dựng.",
    "applications_vi": [
      "Luyện gang thép",
      "Xây dựng"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cu",
    "name_iupac": "Copper metal",
    "name_vi": "Đồng kim loại",
    "common_names_vi": [
      "Đồng"
    ],
    "formula": "Cu",
    "formula_display": "Cu",
    "molar_mass": 63.546,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Đỏ ánh kim",
    "solubility_water_vi": "Không tan",
    "description_vi": "Dẫn điện và nhiệt tuyệt hảo, chống ăn mòn tốt.",
    "applications_vi": [
      "Dây cáp điện",
      "Đúc tượng"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_al",
    "name_iupac": "Aluminium metal",
    "name_vi": "Nhôm kim loại",
    "common_names_vi": [
      "Nhôm"
    ],
    "formula": "Al",
    "formula_display": "Al",
    "molar_mass": 26.982,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng bạc",
    "solubility_water_vi": "Không tan (bị thụ động bởi màng Al2O3)",
    "description_vi": "Kim loại nhẹ, dẫn điện tốt, có màng oxit bảo vệ.",
    "applications_vi": [
      "Vỏ máy bay",
      "Đồ gia dụng"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_na",
    "name_iupac": "Sodium metal",
    "name_vi": "Natri kim loại",
    "common_names_vi": [
      "Natri"
    ],
    "formula": "Na",
    "formula_display": "Na",
    "molar_mass": 22.99,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng bạc ánh kim",
    "solubility_water_vi": "Phản ứng mãnh liệt với nước",
    "description_vi": "Kim loại kiềm mềm cắt bằng dao, bảo quản trong dầu hỏa.",
    "applications_vi": [
      "Đèn đường natri",
      "Luyện kim"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_k",
    "name_iupac": "Potassium metal",
    "name_vi": "Kali kim loại",
    "common_names_vi": [
      "Kali"
    ],
    "formula": "K",
    "formula_display": "K",
    "molar_mass": 39.098,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng bạc",
    "solubility_water_vi": "Nổ mạnh khi tiếp xúc nước",
    "description_vi": "Kim loại kiềm hoạt động mạnh hơn natri, cháy ngọn lửa tím.",
    "applications_vi": [
      "Hợp kim trao đổi nhiệt Na-K",
      "Pin chuyên dụng"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_ca",
    "name_iupac": "Calcium metal",
    "name_vi": "Canxi kim loại",
    "common_names_vi": [
      "Canxi"
    ],
    "formula": "Ca",
    "formula_display": "Ca",
    "molar_mass": 40.078,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Xám bạc",
    "solubility_water_vi": "Phản ứng chậm với nước tạo Ca(OH)2",
    "description_vi": "Kim loại kiềm thổ, chất khử mạnh trong luyện kim.",
    "applications_vi": [
      "Luyện kim khử oxy",
      "Hợp kim ắc quy"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_mg",
    "name_iupac": "Magnesium metal",
    "name_vi": "Magie kim loại",
    "common_names_vi": [
      "Magie"
    ],
    "formula": "Mg",
    "formula_display": "Mg",
    "molar_mass": 24.305,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng bạc",
    "solubility_water_vi": "Không tan trong nước lạnh",
    "description_vi": "Cháy sáng rực rỡ tạo MgO trắng mịn.",
    "applications_vi": [
      "Pháo sáng",
      "Hợp kim nhẹ máy tính"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_zn",
    "name_iupac": "Zinc metal",
    "name_vi": "Kẽm kim loại",
    "common_names_vi": [
      "Kẽm"
    ],
    "formula": "Zn",
    "formula_display": "Zn",
    "molar_mass": 65.38,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Xám xanh",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại bảo vệ catot, tạo lớp gỉ cacbonat kẽm bảo vệ.",
    "applications_vi": [
      "Mạ kẽm chống gỉ",
      "Vỏ pin khô"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_ag",
    "name_iupac": "Silver metal",
    "name_vi": "Bạc kim loại",
    "common_names_vi": [
      "Bạc"
    ],
    "formula": "Ag",
    "formula_display": "Ag",
    "molar_mass": 107.87,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng sáng",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại dẫn điện và nhiệt cao nhất, có tính kháng khuẩn.",
    "applications_vi": [
      "Tráng gương",
      "Mạch vi điện tử",
      "Trang sức"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_au",
    "name_iupac": "Gold metal",
    "name_vi": "Vàng kim loại",
    "common_names_vi": [
      "Vàng"
    ],
    "formula": "Au",
    "formula_display": "Au",
    "molar_mass": 196.97,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Vàng ánh kim",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại quý trơ tuyệt đối, dẻo nhất bảng tuần hoàn.",
    "applications_vi": [
      "Dự trữ tiền tệ",
      "Vi mạch cao cấp"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_pt",
    "name_iupac": "Platinum metal",
    "name_vi": "Bạch kim",
    "common_names_vi": [
      "Platin"
    ],
    "formula": "Pt",
    "formula_display": "Pt",
    "molar_mass": 195.08,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng xám",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại quý có hoạt tính xúc tác cao, chịu nhiệt lớn.",
    "applications_vi": [
      "Bộ xúc tác khí thải",
      "Dụng cụ phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_hg",
    "name_iupac": "Mercury metal",
    "name_vi": "Thủy ngân",
    "common_names_vi": [
      "Thủy ngân"
    ],
    "formula": "Hg",
    "formula_display": "Hg",
    "molar_mass": 200.59,
    "category": "ELEMENT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng bạc lấp lánh",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại duy nhất ở thể lỏng ở nhiệt độ thường, hơi rất độc.",
    "applications_vi": [
      "Nhiệt kế",
      "Áp kế Torricelli"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_pb",
    "name_iupac": "Lead metal",
    "name_vi": "Chì kim loại",
    "common_names_vi": [
      "Chì"
    ],
    "formula": "Pb",
    "formula_display": "Pb",
    "molar_mass": 207.2,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Xám xanh sẫm",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại nặng, mềm, cản tia phóng xạ X và gamma cực tốt.",
    "applications_vi": [
      "Tấm chắn phóng xạ",
      "Cực ắc quy chì"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_sn",
    "name_iupac": "Tin metal",
    "name_vi": "Thiếc kim loại",
    "common_names_vi": [
      "Thiếc"
    ],
    "formula": "Sn",
    "formula_display": "Sn",
    "molar_mass": 118.71,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng bạc",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại dẻo, chống rỉ tốt, không độc ở dạng kim loại.",
    "applications_vi": [
      "Mạ hộp đồ hộp",
      "Hợp kim hàn thiếc"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_ni",
    "name_iupac": "Nickel metal",
    "name_vi": "Niken kim loại",
    "common_names_vi": [
      "Niken"
    ],
    "formula": "Ni",
    "formula_display": "Ni",
    "molar_mass": 58.693,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng bóng",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại cứng, chống ăn mòn, thành phần của thép không gỉ.",
    "applications_vi": [
      "Thép không gỉ Inox",
      "Mạ niken"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cr",
    "name_iupac": "Chromium metal",
    "name_vi": "Crom kim loại",
    "common_names_vi": [
      "Crom"
    ],
    "formula": "Cr",
    "formula_display": "Cr",
    "molar_mass": 51.996,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng ánh thép",
    "solubility_water_vi": "Không tan (bị thụ động)",
    "description_vi": "Kim loại cứng nhất bảng tuần hoàn, rạch được thủy tinh.",
    "applications_vi": [
      "Mạ crom sáng bóng",
      "Thép siêu cứng"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_mn",
    "name_iupac": "Manganese metal",
    "name_vi": "Mangan kim loại",
    "common_names_vi": [
      "Mangan"
    ],
    "formula": "Mn",
    "formula_display": "Mn",
    "molar_mass": 54.938,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Xám bạc giòn",
    "solubility_water_vi": "Không tan",
    "description_vi": "Tăng độ bền chống mài mòn cho thép làm đường ray.",
    "applications_vi": [
      "Thép mangan ray xe lửa",
      "Hợp kim đồng mangan"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_ba",
    "name_iupac": "Barium metal",
    "name_vi": "Bari kim loại",
    "common_names_vi": [
      "Bari"
    ],
    "formula": "Ba",
    "formula_display": "Ba",
    "molar_mass": 137.33,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng bạc",
    "solubility_water_vi": "Phản ứng mạnh với nước tạo Ba(OH)2",
    "description_vi": "Kim loại kiềm thổ nặng hoạt động mạnh.",
    "applications_vi": [
      "Chất khử trong chân không",
      "Luyện kim"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_w",
    "name_iupac": "Tungsten metal",
    "name_vi": "Vonfram",
    "common_names_vi": [
      "Tungsten"
    ],
    "formula": "W",
    "formula_display": "W",
    "molar_mass": 183.84,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Xám thép",
    "solubility_water_vi": "Không tan",
    "description_vi": "Kim loại nóng chảy ở nhiệt độ cao nhất (3422°C).",
    "applications_vi": [
      "Sợi đốt bóng đèn",
      "Điện cực hàn TIG"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_ti",
    "name_iupac": "Titanium metal",
    "name_vi": "Titan",
    "common_names_vi": [
      "Titanium"
    ],
    "formula": "Ti",
    "formula_display": "Ti",
    "molar_mass": 47.867,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Trắng bạc",
    "solubility_water_vi": "Không tan",
    "description_vi": "Nhẹ như nhôm, cứng như thép, tương thích sinh học hoàn hảo.",
    "applications_vi": [
      "Khớp xương nhân tạo",
      "Vỏ máy bay phản lực"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_si",
    "name_iupac": "Silicon crystal",
    "name_vi": "Silic tinh thể",
    "common_names_vi": [
      "Silicon"
    ],
    "formula": "Si",
    "formula_display": "Si",
    "molar_mass": 28.085,
    "category": "ELEMENT",
    "standard_state": "SOLID",
    "color_vi": "Xám ánh kim",
    "solubility_water_vi": "Không tan",
    "description_vi": "Chất bán dẫn cơ bản của toàn bộ ngành công nghiệp máy tính.",
    "applications_vi": [
      "Chip vi xử lý CPU",
      "Pin quang điện"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_he",
    "name_iupac": "Helium gas",
    "name_vi": "Khí Heli",
    "common_names_vi": [
      "Khí helium"
    ],
    "formula": "He",
    "formula_display": "He",
    "molar_mass": 4.0026,
    "category": "ELEMENT",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Khí hiếm nhẹ thứ hai, trơ tuyệt đối không bắt lửa.",
    "applications_vi": [
      "Khí cầu",
      "Làm lạnh nam châm MRI"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_na2o",
    "name_iupac": "Sodium oxide",
    "name_vi": "Natri oxit",
    "common_names_vi": [
      "Sodium oxide"
    ],
    "formula": "Na2O",
    "formula_display": "Na₂O",
    "molar_mass": 61.98,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan mãnh liệt tạo NaOH",
    "description_vi": "Oxide base mạnh, hút ẩm mạnh.",
    "applications_vi": [
      "Hóa chất tổng hợp",
      "Sản xuất thủy tinh"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_k2o",
    "name_iupac": "Potassium oxide",
    "name_vi": "Kali oxit",
    "common_names_vi": [
      "Potassium oxide"
    ],
    "formula": "K2O",
    "formula_display": "K₂O",
    "molar_mass": 94.2,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Xám nhạt",
    "solubility_water_vi": "Tan mãnh liệt tạo KOH",
    "description_vi": "Oxide base mạnh của kim loại kiềm.",
    "applications_vi": [
      "Phân bón kali",
      "Thủy tinh đặc biệt"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_li2o",
    "name_iupac": "Lithium oxide",
    "name_vi": "Liti oxit",
    "common_names_vi": [
      "Lithium oxide"
    ],
    "formula": "Li2O",
    "formula_display": "Li₂O",
    "molar_mass": 29.88,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan trong nước tạo LiOH",
    "description_vi": "Oxide kim loại nhẹ, dùng trong gốm sứ chịu nhiệt.",
    "applications_vi": [
      "Gốm sứ chịu nhiệt",
      "Hóa học pin lithium"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cao",
    "name_iupac": "Calcium oxide",
    "name_vi": "Canxi oxit",
    "common_names_vi": [
      "Vôi sống"
    ],
    "formula": "CaO",
    "formula_display": "CaO",
    "molar_mass": 56.08,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan tỏa nhiều nhiệt tạo Ca(OH)2",
    "description_vi": "Vôi sống kinh điển, phản ứng tôi vôi tỏa nhiệt lớn.",
    "applications_vi": [
      "Sản xuất vôi xây dựng",
      "Xử lý đất chua phèn"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_bao",
    "name_iupac": "Barium oxide",
    "name_vi": "Bari oxit",
    "common_names_vi": [
      "Barium oxide"
    ],
    "formula": "BaO",
    "formula_display": "BaO",
    "molar_mass": 153.33,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng vàng",
    "solubility_water_vi": "Tan tỏa nhiệt tạo Ba(OH)2",
    "description_vi": "Oxide base kiềm thổ nặng.",
    "applications_vi": [
      "Thủy tinh quang học",
      "Chất hút ẩm chân không"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_mgo",
    "name_iupac": "Magnesium oxide",
    "name_vi": "Magie oxit",
    "common_names_vi": [
      "Magnesia"
    ],
    "formula": "MgO",
    "formula_display": "MgO",
    "molar_mass": 40.304,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Oxide chịu nhiệt độ cao tới 2800°C.",
    "applications_vi": [
      "Gạch chịu lửa lò luyện kim",
      "Vật liệu cách nhiệt"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_feo",
    "name_iupac": "Iron(II) oxide",
    "name_vi": "Sắt(II) oxit",
    "common_names_vi": [
      "Ferrous oxide"
    ],
    "formula": "FeO",
    "formula_display": "FeO",
    "molar_mass": 71.844,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Đen",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Oxide base của sắt số oxi hóa +2.",
    "applications_vi": [
      "Sản xuất gốm sứ",
      "Chất màu đen"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_fe2o3",
    "name_iupac": "Iron(III) oxide",
    "name_vi": "Sắt(III) oxit",
    "common_names_vi": [
      "Hematite"
    ],
    "formula": "Fe2O3",
    "formula_display": "Fe₂O₃",
    "molar_mass": 159.69,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Đỏ nâu",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Thành phần chính của quặng hematit và gỉ sắt.",
    "applications_vi": [
      "Sản xuất gang thép",
      "Chất tạo màu gốm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_fe3o4",
    "name_iupac": "Iron(II,III) oxide",
    "name_vi": "Oxit sắt từ",
    "common_names_vi": [
      "Magnetite"
    ],
    "formula": "Fe3O4",
    "formula_display": "Fe₃O₄",
    "molar_mass": 231.53,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Đen",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Oxit hỗn hợp FeO·Fe2O3, có từ tính hút nam châm.",
    "applications_vi": [
      "Mực in laser",
      "Quặng sắt từ"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cuo",
    "name_iupac": "Copper(II) oxide",
    "name_vi": "Đồng(II) oxit",
    "common_names_vi": [
      "Cupric oxide"
    ],
    "formula": "CuO",
    "formula_display": "CuO",
    "molar_mass": 79.545,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Đen",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Dễ bị H2, CO khử thành kim loại đồng màu đỏ.",
    "applications_vi": [
      "Chất xúc tác hữu cơ",
      "Tạo màu xanh cho men sứ"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cu2o",
    "name_iupac": "Copper(I) oxide",
    "name_vi": "Đồng(I) oxit",
    "common_names_vi": [
      "Cuprous oxide"
    ],
    "formula": "Cu2O",
    "formula_display": "Cu₂O",
    "molar_mass": 143.09,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Đỏ gạch",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Tạo ra trong phản ứng tráng bạc hoặc thuốc thử Fehling.",
    "applications_vi": [
      "Sơn chống hà đáy tàu thủy",
      "Chất bán dẫn quang"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_al2o3",
    "name_iupac": "Aluminium oxide",
    "name_vi": "Nhôm oxit",
    "common_names_vi": [
      "Alumina",
      "Corundum",
      "Bauxite"
    ],
    "formula": "Al2O3",
    "formula_display": "Al₂O₃",
    "molar_mass": 101.96,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Oxide lưỡng tính tan được cả trong acid và kiềm mạnh.",
    "applications_vi": [
      "Sản xuất nhôm điện phân",
      "Đá mài corundum"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_zno",
    "name_iupac": "Zinc oxide",
    "name_vi": "Kẽm oxit",
    "common_names_vi": [
      "Kẽm trắng"
    ],
    "formula": "ZnO",
    "formula_display": "ZnO",
    "molar_mass": 81.38,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng (chuyển vàng khi nóng)",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Oxide lưỡng tính, dùng làm chất độn cao su và kem chống nắng.",
    "applications_vi": [
      "Kem chống nắng UV",
      "Lưu hóa cao su"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_co2",
    "name_iupac": "Carbon dioxide",
    "name_vi": "Khí Cacbonic",
    "common_names_vi": [
      "Khí CO2"
    ],
    "formula": "CO2",
    "formula_display": "CO₂",
    "molar_mass": 44.01,
    "category": "OXIDE",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan vừa phải tạo H2CO3",
    "description_vi": "Khí gây hiệu ứng nhà kính, nguyên liệu quang hợp.",
    "applications_vi": [
      "Nước giải khát có ga",
      "Bình chữa cháy"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_co",
    "name_iupac": "Carbon monoxide",
    "name_vi": "Khí Cacbon oxit",
    "common_names_vi": [
      "Khí CO"
    ],
    "formula": "CO",
    "formula_display": "CO",
    "molar_mass": 28.01,
    "category": "OXIDE",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Rất ít tan trong nước",
    "description_vi": "Khí trung tính không tạo muối, cực độc do chiếm chỗ hemoglobin.",
    "applications_vi": [
      "Chất khử trong lò cao",
      "Sản xuất methanol"
    ],
    "curriculum": "GDPT_2018_KHTN_9"
  },
  {
    "id": "sub_so2",
    "name_iupac": "Sulfur dioxide",
    "name_vi": "Khí Lưu huỳnh đioxit",
    "common_names_vi": [
      "Khí sunfurơ"
    ],
    "formula": "SO2",
    "formula_display": "SO₂",
    "molar_mass": 64.066,
    "category": "OXIDE",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan nhiều trong nước tạo H2SO3",
    "description_vi": "Khí mùi hắc xốc, gây mưa acid, làm mất màu nước brom.",
    "applications_vi": [
      "Chất tẩy trắng giấy",
      "Bảo quản rượu vang"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_so3",
    "name_iupac": "Sulfur trioxide",
    "name_vi": "Lưu huỳnh trioxit",
    "common_names_vi": [
      "Sunfuric anhydrit"
    ],
    "formula": "SO3",
    "formula_display": "SO₃",
    "molar_mass": 80.066,
    "category": "OXIDE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu bốc khói",
    "solubility_water_vi": "Phản ứng mãnh liệt tỏa nhiệt tạo H2SO4",
    "description_vi": "Oxide acid mạnh, hòa tan trong H2SO4 tạo oleum.",
    "applications_vi": [
      "Sản xuất acid sulfuric H2SO4",
      "Sulfo hóa hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_p2o5",
    "name_iupac": "Phosphorus pentoxide",
    "name_vi": "Điphotpho pentaoxit",
    "common_names_vi": [
      "P4O10"
    ],
    "formula": "P2O5",
    "formula_display": "P₂O₅",
    "molar_mass": 141.94,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng mịn",
    "solubility_water_vi": "Tan mãnh liệt tạo H3PO4",
    "description_vi": "Chất hút ẩm mạnh nhất thế giới hóa học.",
    "applications_vi": [
      "Chất làm khô chất khí",
      "Sản xuất acid photphoric"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_p2o3",
    "name_iupac": "Phosphorus trioxide",
    "name_vi": "Điphotpho trioxit",
    "common_names_vi": [
      "P4O6"
    ],
    "formula": "P2O3",
    "formula_display": "P₂O₃",
    "molar_mass": 109.94,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng sáp",
    "solubility_water_vi": "Tan trong nước tạo H3PO3",
    "description_vi": "Oxide acid của photpho số oxi hóa +3, rất độc.",
    "applications_vi": [
      "Hóa chất trung gian hữu cơ",
      "Nghiên cứu"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_no2",
    "name_iupac": "Nitrogen dioxide",
    "name_vi": "Khí Nitơ đioxit",
    "common_names_vi": [
      "Khí màu nâu đỏ"
    ],
    "formula": "NO2",
    "formula_display": "NO₂",
    "molar_mass": 46.005,
    "category": "OXIDE",
    "standard_state": "GAS",
    "color_vi": "Nâu đỏ",
    "solubility_water_vi": "Tan trong nước tạo HNO3 và NO",
    "description_vi": "Khí màu nâu đỏ đặc trưng, có tính oxi hóa mạnh và độc.",
    "applications_vi": [
      "Sản xuất acid nitric",
      "Thuốc nổ quân sự"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_no",
    "name_iupac": "Nitric oxide",
    "name_vi": "Khí Nitơ monoxit",
    "common_names_vi": [
      "NO"
    ],
    "formula": "NO",
    "formula_display": "NO",
    "molar_mass": 30.006,
    "category": "OXIDE",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Khí trung tính hóa nâu đỏ ngay lập tức trong không khí thành NO2.",
    "applications_vi": [
      "Chất dẫn truyền tín hiệu mạch máu",
      "Sản xuất HNO3"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_n2o",
    "name_iupac": "Dinitrogen monoxide",
    "name_vi": "Khí Đinitơ oxit",
    "common_names_vi": [
      "Khí cười"
    ],
    "formula": "N2O",
    "formula_display": "N₂O",
    "molar_mass": 44.013,
    "category": "OXIDE",
    "standard_state": "GAS",
    "color_vi": "Không màu mùi ngọt",
    "solubility_water_vi": "Tan vừa phải trong nước",
    "description_vi": "Khí gây hưng phấn giảm đau trong nha khoa y tế.",
    "applications_vi": [
      "Thuốc gây mê nha khoa",
      "Khí nén bình kem tươi"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_n2o5",
    "name_iupac": "Dinitrogen pentoxide",
    "name_vi": "Đinitơ pentaoxit",
    "common_names_vi": [
      "Nitric anhydrit"
    ],
    "formula": "N2O5",
    "formula_display": "N₂O₅",
    "molar_mass": 108.01,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan mãnh liệt tạo HNO3",
    "description_vi": "Oxide acid không bền, phân hủy thành NO2 và O2.",
    "applications_vi": [
      "Thuốc nổ hóa học",
      "Chất nitrat hóa mạnh"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_sio2",
    "name_iupac": "Silicon dioxide",
    "name_vi": "Silic đioxit",
    "common_names_vi": [
      "Thạch anh",
      "Cát trắng"
    ],
    "formula": "SiO2",
    "formula_display": "SiO₂",
    "molar_mass": 60.084,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trong suốt hoặc trắng",
    "solubility_water_vi": "Không tan trong nước (chỉ tan trong HF)",
    "description_vi": "Cấu trúc tinh thể tứ diện khổng lồ, cứng và chịu nhiệt.",
    "applications_vi": [
      "Sản xuất thủy tinh",
      "Thạch anh dao động tử"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_cr2o3",
    "name_iupac": "Chromium(III) oxide",
    "name_vi": "Crom(III) oxit",
    "common_names_vi": [
      "Lục crom"
    ],
    "formula": "Cr2O3",
    "formula_display": "Cr₂O₃",
    "molar_mass": 151.99,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Xanh lục sẫm",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Oxide lưỡng tính, bền nhiệt và chống mài mòn cao.",
    "applications_vi": [
      "Sơn xanh lục ngụy trang",
      "Đánh bóng kim loại"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_cro3",
    "name_iupac": "Chromium(VI) oxide",
    "name_vi": "Crom(VI) oxit",
    "common_names_vi": [
      "Cromic anhydrit"
    ],
    "formula": "CrO3",
    "formula_display": "CrO₃",
    "molar_mass": 99.994,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Đỏ thẫm",
    "solubility_water_vi": "Tan mãnh liệt tạo H2CrO4 và H2Cr2O7",
    "description_vi": "Oxide acid có tính oxi hóa cực mạnh, bốc cháy khi tiếp xúc cồn.",
    "applications_vi": [
      "Mạ crom điện giải",
      "Chất oxi hóa công nghiệp"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_mno2",
    "name_iupac": "Manganese dioxide",
    "name_vi": "Mangan đioxit",
    "common_names_vi": [
      "Pyrolusite"
    ],
    "formula": "MnO2",
    "formula_display": "MnO₂",
    "molar_mass": 86.937,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Đen sẫm",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Chất xúc tác phân hủy H2O2 và điều chế Cl2 từ HCl đặc.",
    "applications_vi": [
      "Chất xúc tác phản ứng",
      "Cực dương pin Leclanché"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_mn2o7",
    "name_iupac": "Manganese heptoxide",
    "name_vi": "Mangan heptaoxit",
    "common_names_vi": [
      "Permanganic anhydrit"
    ],
    "formula": "Mn2O7",
    "formula_display": "Mn₂O₇",
    "molar_mass": 221.87,
    "category": "OXIDE",
    "standard_state": "LIQUID",
    "color_vi": "Xanh lục dầu",
    "solubility_water_vi": "Tan trong nước tạo HMnO4",
    "description_vi": "Chất lỏng màu xanh dầu cực kỳ nguy hiểm, dễ nổ tung.",
    "applications_vi": [
      "Chất oxi hóa cực hạn",
      "Nghiên cứu lý thuyết"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_tio2",
    "name_iupac": "Titanium dioxide",
    "name_vi": "Titan đioxit",
    "common_names_vi": [
      "Titan trắng"
    ],
    "formula": "TiO2",
    "formula_display": "TiO₂",
    "molar_mass": 79.866,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng tinh",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Chất màu trắng có chiết suất cao nhất, hấp thụ tia cực tím UV.",
    "applications_vi": [
      "Sơn trắng cao cấp",
      "Kem chống nắng bảo vệ da"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_zro2",
    "name_iupac": "Zirconium dioxide",
    "name_vi": "Zirconi đioxit",
    "common_names_vi": [
      "Zirconia"
    ],
    "formula": "ZrO2",
    "formula_display": "ZrO₂",
    "molar_mass": 123.22,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Gốm chịu nhiệt độ cao siêu bền, răng sứ thẩm mỹ zirconia.",
    "applications_vi": [
      "Răng sứ nhân tạo",
      "Chén nung kim loại quý"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_cl2o7",
    "name_iupac": "Dichlorine heptoxide",
    "name_vi": "Điclo heptaoxit",
    "common_names_vi": [
      "Perchloric anhydrit"
    ],
    "formula": "Cl2O7",
    "formula_display": "Cl₂O₇",
    "molar_mass": 182.9,
    "category": "OXIDE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan trong nước tạo HClO4",
    "description_vi": "Oxide acid của clo số oxi hóa cao nhất (+7).",
    "applications_vi": [
      "Chất oxi hóa phòng thí nghiệm",
      "Chất perchlorat hóa"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_cl2o",
    "name_iupac": "Dichlorine monoxide",
    "name_vi": "Điclo monoxit",
    "common_names_vi": [
      "Hypochlorous anhydrit"
    ],
    "formula": "Cl2O",
    "formula_display": "Cl₂O",
    "molar_mass": 86.905,
    "category": "OXIDE",
    "standard_state": "GAS",
    "color_vi": "Vàng nâu",
    "solubility_water_vi": "Tan trong nước tạo HClO",
    "description_vi": "Chất khí dễ nổ, có tính sát trùng tẩy màu mạnh mẽ.",
    "applications_vi": [
      "Sản xuất chất tẩy",
      "Khử trùng công nghiệp"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_ag2o",
    "name_iupac": "Silver(I) oxide",
    "name_vi": "Bạc oxit",
    "common_names_vi": [
      "Silver oxide"
    ],
    "formula": "Ag2O",
    "formula_display": "Ag₂O",
    "molar_mass": 231.74,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Nâu đen",
    "solubility_water_vi": "Rất ít tan trong nước",
    "description_vi": "Tạo ra khi kiềm hóa dung dịch muối bạc, tan trong amoniac.",
    "applications_vi": [
      "Pin cúc áo bạc oxit đồng hồ",
      "Thuốc thử Tollens"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_pbo",
    "name_iupac": "Lead(II) oxide",
    "name_vi": "Chì(II) oxit",
    "common_names_vi": [
      "Litharge"
    ],
    "formula": "PbO",
    "formula_display": "PbO",
    "molar_mass": 223.2,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Vàng cam",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Oxide lưỡng tính của chì, tan trong acid và kiềm đặc nóng.",
    "applications_vi": [
      "Thủy tinh pha lê chì",
      "Chế tạo cực ắc quy"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_pbo2",
    "name_iupac": "Lead(IV) oxide",
    "name_vi": "Chì(IV) oxit",
    "common_names_vi": [
      "Chì đioxit"
    ],
    "formula": "PbO2",
    "formula_display": "PbO₂",
    "molar_mass": 239.2,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Nâu sẫm",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Chất oxi hóa mạnh, tạo thành cực dương của bình ắc quy chì.",
    "applications_vi": [
      "Cực dương ắc quy chì",
      "Chất diêm quẹt"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_sno",
    "name_iupac": "Tin(II) oxide",
    "name_vi": "Thiếc(II) oxit",
    "common_names_vi": [
      "Stannous oxide"
    ],
    "formula": "SnO",
    "formula_display": "SnO",
    "molar_mass": 134.71,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Đen lục",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Oxide lưỡng tính của thiếc, có tính khử khi đun nóng.",
    "applications_vi": [
      "Chế tạo men gốm sứ",
      "Chất xúc tác ester hóa"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_sno2",
    "name_iupac": "Tin(IV) oxide",
    "name_vi": "Thiếc(IV) oxit",
    "common_names_vi": [
      "Cassiterite"
    ],
    "formula": "SnO2",
    "formula_display": "SnO₂",
    "molar_mass": 150.71,
    "category": "OXIDE",
    "standard_state": "SOLID",
    "color_vi": "Trắng ngà",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Thành phần của quặng thiếc cassiterit, cảm biến khí ga.",
    "applications_vi": [
      "Cảm biến khí gas rò rỉ",
      "Màng dẫn điện mỏng"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_hcl",
    "name_iupac": "Hydrochloric acid",
    "name_vi": "Acid clohiđric",
    "common_names_vi": [
      "Axit clohydric",
      "Acid muối"
    ],
    "formula": "HCl",
    "formula_display": "HCl",
    "molar_mass": 36.46,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu bốc khói",
    "solubility_water_vi": "Tan vô hạn trong nước",
    "description_vi": "Acid mạnh có trong dịch vị dạ dày người giúp tiêu hóa protein.",
    "applications_vi": [
      "Tẩy gỉ thép cuộn",
      "Sản xuất gelatin"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_h2so4",
    "name_iupac": "Sulfuric acid",
    "name_vi": "Acid sunfuric",
    "common_names_vi": [
      "Axit sunfuric"
    ],
    "formula": "H2SO4",
    "formula_display": "H₂SO₄",
    "molar_mass": 98.072,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu sánh như dầu",
    "solubility_water_vi": "Tan vô hạn tỏa nhiệt dữ dội",
    "description_vi": "Vua của các hóa chất công nghiệp, acid đặc háo nước làm than hóa đường.",
    "applications_vi": [
      "Sản xuất phân lân",
      "Dung dịch ắc quy"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_hno3",
    "name_iupac": "Nitric acid",
    "name_vi": "Acid nitric",
    "common_names_vi": [
      "Axit nitric"
    ],
    "formula": "HNO3",
    "formula_display": "HNO₃",
    "molar_mass": 63.012,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu bốc khói vàng",
    "solubility_water_vi": "Tan vô hạn trong nước",
    "description_vi": "Acid mạnh có tính oxi hóa cực mạnh, hòa tan được cả Cu và Ag.",
    "applications_vi": [
      "Sản xuất phân đạm",
      "Chế tạo thuốc nổ TNT"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_hbr",
    "name_iupac": "Hydrobromic acid",
    "name_vi": "Acid bromhiđric",
    "common_names_vi": [
      "Axit bromhydric"
    ],
    "formula": "HBr",
    "formula_display": "HBr",
    "molar_mass": 80.91,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Acid mạnh hơn cả HCl, tính khử mạnh.",
    "applications_vi": [
      "Hóa dược phẩm",
      "Sản xuất hợp chất brom"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_hi",
    "name_iupac": "Hydroiodic acid",
    "name_vi": "Acid iotđric",
    "common_names_vi": [
      "Axit iothydric"
    ],
    "formula": "HI",
    "formula_display": "HI",
    "molar_mass": 127.91,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu chuyển vàng",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Acid mạnh nhất trong các hydro halogenua, chất khử mạnh.",
    "applications_vi": [
      "Chất khử trong tổng hợp hữu cơ",
      "Dược phẩm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_hf",
    "name_iupac": "Hydrofluoric acid",
    "name_vi": "Acid flohiđric",
    "common_names_vi": [
      "Axit flohydric"
    ],
    "formula": "HF",
    "formula_display": "HF",
    "molar_mass": 20.01,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Acid yếu nhưng có đặc tính độc nhất ăn mòn được thủy tinh (SiO2).",
    "applications_vi": [
      "Khắc chữ lên thủy tinh",
      "Làm sạch bề mặt chip vi mạch"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_hclo4",
    "name_iupac": "Perchloric acid",
    "name_vi": "Acid pecloric",
    "common_names_vi": [
      "Axit pecloric"
    ],
    "formula": "HClO4",
    "formula_display": "HClO₄",
    "molar_mass": 100.46,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu bốc khói",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Một trong những acid vô cơ mạnh nhất từng được biết.",
    "applications_vi": [
      "Hóa học phân tích chuẩn độ",
      "Nhiên liệu tên lửa rắn"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_h3po4",
    "name_iupac": "Phosphoric acid",
    "name_vi": "Acid photphoric",
    "common_names_vi": [
      "Axit photphoric"
    ],
    "formula": "H3PO4",
    "formula_display": "H₃PO₄",
    "molar_mass": 97.994,
    "category": "ACID",
    "standard_state": "SOLID",
    "color_vi": "Không màu sánh",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Acid ba nấc có độ mạnh trung bình, không có tính oxi hóa.",
    "applications_vi": [
      "Phân bón supephotphat",
      "Tạo vị chua trong nước cola"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_h2so3",
    "name_iupac": "Sulfurous acid",
    "name_vi": "Acid sunfurơ",
    "common_names_vi": [
      "Axit sunfurơ"
    ],
    "formula": "H2SO3",
    "formula_display": "H₂SO₃",
    "molar_mass": 82.07,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan tốt (dung dịch SO2)",
    "description_vi": "Acid hai nấc yếu, không bền dễ phân hủy thành SO2 và H2O.",
    "applications_vi": [
      "Chất khử phòng thí nghiệm",
      "Chất tẩy màu"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_h2co3",
    "name_iupac": "Carbonic acid",
    "name_vi": "Acid cacbonic",
    "common_names_vi": [
      "Axit cacbonic"
    ],
    "formula": "H2CO3",
    "formula_display": "H₂CO₃",
    "molar_mass": 62.03,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Dung dịch khí CO2",
    "description_vi": "Acid hai nấc rất yếu, tạo vị tê rát đầu lưỡi trong nước khoáng có ga.",
    "applications_vi": [
      "Nước khoáng có ga",
      "Hệ đệm sinh học máu"
    ],
    "curriculum": "GDPT_2018_KHTN_7"
  },
  {
    "id": "sub_h2s",
    "name_iupac": "Hydrogen sulfide",
    "name_vi": "Hiđro sunfua",
    "common_names_vi": [
      "Khí trứng thối"
    ],
    "formula": "H2S",
    "formula_display": "H₂S",
    "molar_mass": 34.08,
    "category": "ACID",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan một phần tạo acid sunfuhidric",
    "description_vi": "Khí mùi trứng thối nồng nặc, rất độc, gây tê liệt khứu giác.",
    "applications_vi": [
      "Xử lý kim loại nặng",
      "Sản xuất lưu huỳnh"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_hno2",
    "name_iupac": "Nitrous acid",
    "name_vi": "Acid nitrơ",
    "common_names_vi": [
      "Axit nitrơ"
    ],
    "formula": "HNO2",
    "formula_display": "HNO₂",
    "molar_mass": 47.013,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Xanh lam nhạt",
    "solubility_water_vi": "Dung dịch không bền",
    "description_vi": "Acid yếu chỉ tồn tại trong dung dịch lạnh, dùng trong phản ứng diazo hóa.",
    "applications_vi": [
      "Phẩm màu nhuộm azo",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_hclo",
    "name_iupac": "Hypochlorous acid",
    "name_vi": "Acid hipoclorơ",
    "common_names_vi": [
      "Axit hipocloro"
    ],
    "formula": "HClO",
    "formula_display": "HClO",
    "molar_mass": 52.46,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan tốt",
    "description_vi": "Acid rất yếu nhưng có tính sát trùng và tẩy trắng cực mạnh.",
    "applications_vi": [
      "Tẩy trắng sợi vải",
      "Khử trùng y tế"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_h3bo3",
    "name_iupac": "Boric acid",
    "name_vi": "Acid boric",
    "common_names_vi": [
      "Axit boric"
    ],
    "formula": "H3BO3",
    "formula_display": "H₃BO₃",
    "molar_mass": 61.83,
    "category": "ACID",
    "standard_state": "SOLID",
    "color_vi": "Trắng bóng nhờn",
    "solubility_water_vi": "Ít tan trong nước lạnh, tan tốt trong nước nóng",
    "description_vi": "Acid nấc rất yếu, có tính kháng nấm và sát khuẩn nhẹ dịu.",
    "applications_vi": [
      "Nước nhỏ mắt sát trùng",
      "Hãm neutron lò hạt nhân"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_h2sio3",
    "name_iupac": "Silicic acid",
    "name_vi": "Acid silixic",
    "common_names_vi": [
      "Metasilicic acid"
    ],
    "formula": "H2sio3",
    "formula_display": "H₂SiO₃",
    "molar_mass": 78.1,
    "category": "ACID",
    "standard_state": "SOLID",
    "color_vi": "Trắng keo dính",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Acid ở dạng kết tủa keo trắng, sấy khô tạo hạt hút ẩm silica gel.",
    "applications_vi": [
      "Hạt chống ẩm silica gel",
      "Vật liệu lọc nước"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_hcooh",
    "name_iupac": "Formic acid",
    "name_vi": "Acid fomic",
    "common_names_vi": [
      "Axit kiến",
      "Methanoic acid"
    ],
    "formula": "HCOOH",
    "formula_display": "HCOOH",
    "molar_mass": 46.025,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu mùi hắc",
    "solubility_water_vi": "Tan vô hạn trong nước",
    "description_vi": "Acid có trong nọc kiến đỏ và ong đốt, có nhóm CHO nên có tính tráng gương.",
    "applications_vi": [
      "Đông tụ mủ cao su",
      "Nhuộm da giày"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_ch3cooh",
    "name_iupac": "Acetic acid",
    "name_vi": "Acid axetic",
    "common_names_vi": [
      "Axit giấm",
      "Ethanoic acid"
    ],
    "formula": "CH3COOH",
    "formula_display": "CH₃COOH",
    "molar_mass": 60.052,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu chua nồng",
    "solubility_water_vi": "Tan vô hạn trong nước",
    "description_vi": "Thành phần chính của giấm ăn gia đình (nồng độ 4-5%).",
    "applications_vi": [
      "Gia vị nấu ăn giấm",
      "Sản xuất tơ axetat",
      "Dược phẩm aspirin"
    ],
    "curriculum": "GDPT_2018_KHTN_9"
  },
  {
    "id": "sub_c2h5cooh",
    "name_iupac": "Propionic acid",
    "name_vi": "Acid propionic",
    "common_names_vi": [
      "Propanoic acid"
    ],
    "formula": "C2H5COOH",
    "formula_display": "C₂H₅COOH",
    "molar_mass": 74.08,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu mùi cay",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Acid béo mạch ngắn tự nhiên trong phô mai Thụy Sĩ.",
    "applications_vi": [
      "Bảo quản chống mốc bánh mì",
      "Sản xuất dược phẩm"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c3h7cooh",
    "name_iupac": "Butyric acid",
    "name_vi": "Acid butiric",
    "common_names_vi": [
      "Butanoic acid"
    ],
    "formula": "C3H7COOH",
    "formula_display": "C₃H₇COOH",
    "molar_mass": 88.11,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu mùi bơ ôi",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Có mùi đặc trưng của bơ bị ôi và dịch dạ dày động vật.",
    "applications_vi": [
      "Tạo hương liệu thực phẩm",
      "Thức ăn chăn nuôi"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c6h5cooh",
    "name_iupac": "Benzoic acid",
    "name_vi": "Acid benzoic",
    "common_names_vi": [
      "Axit benzoic"
    ],
    "formula": "C6H5COOH",
    "formula_display": "C₆H₅COOH",
    "molar_mass": 122.12,
    "category": "ACID",
    "standard_state": "SOLID",
    "color_vi": "Trắng tinh thể hình kim",
    "solubility_water_vi": "Ít tan trong nước lạnh, tan tốt trong nước nóng",
    "description_vi": "Acid thơm, muối natri benzoat là chất bảo quản thực phẩm phổ biến E211.",
    "applications_vi": [
      "Bảo quản thực phẩm chống mốc E211",
      "Dược phẩm da liễu"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c2h2o4",
    "name_iupac": "Oxalic acid",
    "name_vi": "Acid oxalic",
    "common_names_vi": [
      "Axit khế"
    ],
    "formula": "H2C2O4",
    "formula_display": "(COOH)₂",
    "molar_mass": 90.03,
    "category": "ACID",
    "standard_state": "SOLID",
    "color_vi": "Trắng tinh thể",
    "solubility_water_vi": "Tan tốt trong nước",
    "description_vi": "Acid hai chức có vị chua trong quả khế, tẩy gỉ sét kim loại rất tốt.",
    "applications_vi": [
      "Tẩy gỉ sét trên vải",
      "Đánh bóng đá hoa cương"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c3h6o3",
    "name_iupac": "Lactic acid",
    "name_vi": "Acid lactic",
    "common_names_vi": [
      "Axit sữa chua"
    ],
    "formula": "C3H6O3",
    "formula_display": "CH₃-CH(OH)-COOH",
    "molar_mass": 90.08,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu sánh chua dịu",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Sản phẩm của quá trình lên men sữa chua và sinh ra trong cơ bắp khi vận động nặng.",
    "applications_vi": [
      "Sữa chua lên men",
      "Nhựa sinh học tự hủy PLA"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c6h8o7",
    "name_iupac": "Citric acid",
    "name_vi": "Acid xitric",
    "common_names_vi": [
      "Axit chanh"
    ],
    "formula": "C6H8O7",
    "formula_display": "C₆H₈O₇",
    "molar_mass": 192.12,
    "category": "ACID",
    "standard_state": "SOLID",
    "color_vi": "Trắng tinh thể",
    "solubility_water_vi": "Tan vô hạn trong nước",
    "description_vi": "Acid hữu cơ ba nấc tạo vị chua tự nhiên trong quả chanh, cam, bưởi.",
    "applications_vi": [
      "Chất điều vị chua thực phẩm E330",
      "Chất tẩy cặn vôi ấm nước"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c3h4o2",
    "name_iupac": "Acrylic acid",
    "name_vi": "Acid acrylic",
    "common_names_vi": [
      "Propenoic acid"
    ],
    "formula": "C3H4O2",
    "formula_display": "CH₂=CH-COOH",
    "molar_mass": 72.06,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Không màu mùi hắc",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Acid chưa no có liên kết đôi C=C, trùng hợp tạo keo siêu thấm nước trong bỉm tã trẻ em.",
    "applications_vi": [
      "Nhựa siêu thấm bỉm tã SAP",
      "Sơn phủ acrylic"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c17h35cooh",
    "name_iupac": "Stearic acid",
    "name_vi": "Acid stearic",
    "common_names_vi": [
      "Octadecanoic acid"
    ],
    "formula": "C17H35COOH",
    "formula_display": "C₁₇H₃₅COOH",
    "molar_mass": 284.48,
    "category": "ACID",
    "standard_state": "SOLID",
    "color_vi": "Trắng sáp",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Acid béo no có trong mỡ bò và dầu cọ, nguyên liệu nấu xà phòng bánh.",
    "applications_vi": [
      "Nấu xà phòng",
      "Làm nến sáp cháy"
    ],
    "curriculum": "GDPT_2018_HOA_12"
  },
  {
    "id": "sub_c17h33cooh",
    "name_iupac": "Oleic acid",
    "name_vi": "Acid oleic",
    "common_names_vi": [
      "Axit dầu ôliu"
    ],
    "formula": "C17H33COOH",
    "formula_display": "C₁₇H₃₃COOH",
    "molar_mass": 282.46,
    "category": "ACID",
    "standard_state": "LIQUID",
    "color_vi": "Vàng nhạt dầu",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Acid béo không no có một liên kết đôi cis trong dầu ô liu, tốt cho tim mạch.",
    "applications_vi": [
      "Dầu ăn thực vật",
      "Mỹ phẩm dưỡng da"
    ],
    "curriculum": "GDPT_2018_HOA_12"
  },
  {
    "id": "sub_c15h31cooh",
    "name_iupac": "Palmitic acid",
    "name_vi": "Acid palmitic",
    "common_names_vi": [
      "Hexadecanoic acid"
    ],
    "formula": "C15H31COOH",
    "formula_display": "C₁₅H₃₁COOH",
    "molar_mass": 256.42,
    "category": "ACID",
    "standard_state": "SOLID",
    "color_vi": "Trắng sáp",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Acid béo no phổ biến nhất trong cơ thể động vật và dầu dừa.",
    "applications_vi": [
      "Mỹ phẩm xà phòng",
      "Chất nhũ hóa thực phẩm"
    ],
    "curriculum": "GDPT_2018_HOA_12"
  },
  {
    "id": "sub_naoh",
    "name_iupac": "Sodium hydroxide",
    "name_vi": "Natri hiđroxit",
    "common_names_vi": [
      "Xút ăn da",
      "Caustic soda"
    ],
    "formula": "NaOH",
    "formula_display": "NaOH",
    "molar_mass": 39.997,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hút ẩm",
    "solubility_water_vi": "Tan mãnh liệt tỏa nhiệt",
    "description_vi": "Base mạnh kinh điển, ăn mòn da thịt và thủy tinh, nấu xà phòng xút.",
    "applications_vi": [
      "Nấu xà phòng xút",
      "Sản xuất giấy",
      "Tẩy dầu mỡ cống"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_koh",
    "name_iupac": "Potassium hydroxide",
    "name_vi": "Kali hiđroxit",
    "common_names_vi": [
      "Xút kali",
      "Potash"
    ],
    "formula": "KOH",
    "formula_display": "KOH",
    "molar_mass": 56.106,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hút ẩm",
    "solubility_water_vi": "Tan mãnh liệt tỏa nhiệt",
    "description_vi": "Base kiềm mạnh hơn NaOH, dùng làm xà phòng lỏng và pin kiềm alkaline.",
    "applications_vi": [
      "Sản xuất xà phòng lỏng",
      "Chất điện phân pin alkaline"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_caoh2",
    "name_iupac": "Calcium hydroxide",
    "name_vi": "Canxi hiđroxit",
    "common_names_vi": [
      "Vôi tôi",
      "Nước vôi trong"
    ],
    "formula": "Ca(OH)2",
    "formula_display": "Ca(OH)₂",
    "molar_mass": 74.093,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng mịn",
    "solubility_water_vi": "Ít tan trong nước (phần tan là nước vôi trong)",
    "description_vi": "Dung dịch nước vôi trong dùng để nhận biết khí CO2 (hóa đục trắng CaCO3).",
    "applications_vi": [
      "Quét vôi tường diệt khuẩn",
      "Khử chua đất trồng trọt"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_baoh2",
    "name_iupac": "Barium hydroxide",
    "name_vi": "Bari hiđroxit",
    "common_names_vi": [
      "Baryta"
    ],
    "formula": "Ba(OH)2",
    "formula_display": "Ba(OH)₂",
    "molar_mass": 171.34,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan tốt trong nước nóng",
    "description_vi": "Base kiềm mạnh tan nhiều, dùng để chuẩn độ acid hữu cơ.",
    "applications_vi": [
      "Chuẩn độ acid chuẩn",
      "Làm sạch nước mía"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_lioh",
    "name_iupac": "Lithium hydroxide",
    "name_vi": "Liti hiđroxit",
    "common_names_vi": [
      "Lithium hydroxide"
    ],
    "formula": "LiOH",
    "formula_display": "LiOH",
    "molar_mass": 23.95,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan tốt trong nước",
    "description_vi": "Hấp thụ khí thở CO2 trong tàu ngầm quân sự và trạm vũ trụ quốc tế ISS.",
    "applications_vi": [
      "Lọc khí CO2 trạm vũ trụ ISS",
      "Mỡ bôi trơn lithium"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_nh3_aq",
    "name_iupac": "Ammonia solution",
    "name_vi": "Dung dịch Amoniac",
    "common_names_vi": [
      "Khí NH3",
      "Nước amoniac"
    ],
    "formula": "NH3",
    "formula_display": "NH₃·H₂O",
    "molar_mass": 35.05,
    "category": "BASE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu mùi khai nồng",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Base yếu có tính bay hơi, làm xanh quỳ tím ẩm và tạo phức chất tan với ion Cu2+, Ag+.",
    "applications_vi": [
      "Phân bón đạm amoni",
      "Nước lau kính sáng bóng"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_mgoh2",
    "name_iupac": "Magnesium hydroxide",
    "name_vi": "Magie hiđroxit",
    "common_names_vi": [
      "Sữa magie"
    ],
    "formula": "Mg(OH)2",
    "formula_display": "Mg(OH)₂",
    "molar_mass": 58.32,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Thuốc trung hòa acid dịch vị dạ dày chữa ợ chua, chất chống cháy vô cơ.",
    "applications_vi": [
      "Thuốc đau dạ dày Antacid",
      "Chất chống cháy nhựa"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_aloh3",
    "name_iupac": "Aluminium hydroxide",
    "name_vi": "Nhôm hiđroxit",
    "common_names_vi": [
      "Nhôm hydroxide"
    ],
    "formula": "Al(OH)3",
    "formula_display": "Al(OH)₃",
    "molar_mass": 78.004,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng keo tụ",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Hiđroxit lưỡng tính dạng keo trắng, tan được cả trong acid mạnh và dung dịch kiềm xút.",
    "applications_vi": [
      "Keo tụ lắng cặn nước đục",
      "Thuốc kháng acid dạ dày"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_feoh2",
    "name_iupac": "Iron(II) hydroxide",
    "name_vi": "Sắt(II) hiđroxit",
    "common_names_vi": [
      "Ferrous hydroxide"
    ],
    "formula": "Fe(OH)2",
    "formula_display": "Fe(OH)₂",
    "molar_mass": 89.86,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng xanh",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Kết tủa trắng xanh, nhanh chóng bị oxi hóa trong không khí chuyển sang đỏ nâu Fe(OH)3.",
    "applications_vi": [
      "Nghiên cứu hóa học",
      "Chất khử"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_feoh3",
    "name_iupac": "Iron(III) hydroxide",
    "name_vi": "Sắt(III) hiđroxit",
    "common_names_vi": [
      "Ferric hydroxide"
    ],
    "formula": "Fe(OH)3",
    "formula_display": "Fe(OH)₃",
    "molar_mass": 106.87,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Đỏ nâu",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Kết tủa màu nâu đỏ đặc trưng, không tan trong kiềm dư.",
    "applications_vi": [
      "Xử lý nước thải kim loại",
      "Chất màu gốm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cuoh2",
    "name_iupac": "Copper(II) hydroxide",
    "name_vi": "Đồng(II) hiđroxit",
    "common_names_vi": [
      "Cupric hydroxide"
    ],
    "formula": "Cu(OH)2",
    "formula_display": "Cu(OH)₂",
    "molar_mass": 97.56,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Xanh lam tươi",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Hòa tan trong polyalcohol (glycerol, glucose) tạo phức chất màu xanh lam thẫm rực rỡ.",
    "applications_vi": [
      "Thuốc diệt nấm cây trồng Boocđô",
      "Nhận biết hợp chất đa chức"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_znoh2",
    "name_iupac": "Zinc hydroxide",
    "name_vi": "Kẽm hiđroxit",
    "common_names_vi": [
      "Zinc hydroxide"
    ],
    "formula": "Zn(OH)2",
    "formula_display": "Zn(OH)₂",
    "molar_mass": 99.424,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Hiđroxit lưỡng tính, tan được cả trong acid, dung dịch kiềm mạnh và dung dịch amoniac dư.",
    "applications_vi": [
      "Hóa chất tổng hợp",
      "Chất hấp phụ y tế"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_croh3",
    "name_iupac": "Chromium(III) hydroxide",
    "name_vi": "Crom(III) hiđroxit",
    "common_names_vi": [
      "Chromic hydroxide"
    ],
    "formula": "Cr(OH)3",
    "formula_display": "Cr(OH)₃",
    "molar_mass": 103.02,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Xanh xám",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Hiđroxit lưỡng tính của crom, tan trong kiềm mạnh tạo phức chất xanh ngọc [Cr(OH)4]-.",
    "applications_vi": [
      "Chất màu vẽ tranh",
      "Thuộc da thuộc"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_nioh2",
    "name_iupac": "Nickel(II) hydroxide",
    "name_vi": "Niken(II) hiđroxit",
    "common_names_vi": [
      "Nickelous hydroxide"
    ],
    "formula": "Ni(OH)2",
    "formula_display": "Ni(OH)₂",
    "molar_mass": 92.71,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Xanh lục táo",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Vật liệu cực dương của pin sạc niken-cadmium và niken-kim loại hydrit (NiMH).",
    "applications_vi": [
      "Cực dương pin sạc Ni-MH",
      "Hóa chất mạ niken"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_pboh2",
    "name_iupac": "Lead(II) hydroxide",
    "name_vi": "Chì(II) hiđroxit",
    "common_names_vi": [
      "Plumbous hydroxide"
    ],
    "formula": "Pb(OH)2",
    "formula_display": "Pb(OH)₂",
    "molar_mass": 241.22,
    "category": "BASE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Hiđroxit lưỡng tính của chì, tan trong dung dịch kiềm mạnh tạo muối plumbite.",
    "applications_vi": [
      "Chế tạo điện cực ắc quy",
      "Bôi trơn chịu nhiệt"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_nacl",
    "name_iupac": "Sodium chloride",
    "name_vi": "Natri clorua",
    "common_names_vi": [
      "Muối ăn"
    ],
    "formula": "NaCl",
    "formula_display": "NaCl",
    "molar_mass": 58.44,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng tinh",
    "solubility_water_vi": "Dễ tan trong nước",
    "description_vi": "Muối ăn gia vị thiết yếu hàng ngày, nguyên liệu sản xuất xút-clo.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_kcl",
    "name_iupac": "Potassium chloride",
    "name_vi": "Kali clorua",
    "common_names_vi": [
      "Muối kali"
    ],
    "formula": "KCl",
    "formula_display": "KCl",
    "molar_mass": 74.55,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan trong nước",
    "description_vi": "Phân bón kali chủ đạo nông nghiệp, tiêm trợ tim y tế.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cacl2",
    "name_iupac": "Calcium chloride",
    "name_vi": "Canxi clorua",
    "common_names_vi": [
      "Chất làm tan băng"
    ],
    "formula": "CaCl2",
    "formula_display": "CaCl₂",
    "molar_mass": 110.98,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hút ẩm mạnh",
    "solubility_water_vi": "Tan nhiều tỏa nhiệt",
    "description_vi": "Rắc làm tan băng tuyết trên đường mùa đông, chất hút ẩm.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_mgcl2",
    "name_iupac": "Magnesium chloride",
    "name_vi": "Magie clorua",
    "common_names_vi": [
      "Nigari làm đậu phụ"
    ],
    "formula": "MgCl2",
    "formula_display": "MgCl₂",
    "molar_mass": 95.21,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Chất đông tụ sữa đậu nành làm đậu phụ (nước nigari Nhật Bản).",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_bacl2",
    "name_iupac": "Barium chloride",
    "name_vi": "Bari clorua",
    "common_names_vi": [
      "Thuốc thử ion sunfat"
    ],
    "formula": "BaCl2",
    "formula_display": "BaCl₂",
    "molar_mass": 208.23,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Thuốc thử kinh điển để nhận biết ion sulfate SO4(2-) tạo kết tủa trắng BaSO4.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_alcl3",
    "name_iupac": "Aluminium chloride",
    "name_vi": "Nhôm clorua",
    "common_names_vi": [
      "Xúc tác Friedel-Crafts"
    ],
    "formula": "AlCl3",
    "formula_display": "AlCl₃",
    "molar_mass": 133.34,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng vàng hút ẩm",
    "solubility_water_vi": "Tan bốc khói tạo dung dịch acid",
    "description_vi": "Chất xúc tác acid Lewis mạnh trong phản ứng alkyl hóa hữu cơ Friedel-Crafts.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_fecl2",
    "name_iupac": "Iron(II) chloride",
    "name_vi": "Sắt(II) clorua",
    "common_names_vi": [
      "Ferrous chloride"
    ],
    "formula": "FeCl2",
    "formula_display": "FeCl₂",
    "molar_mass": 126.75,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng xanh",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Muối sắt hóa trị 2, dễ bị oxy hóa thành FeCl3.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_fecl3",
    "name_iupac": "Iron(III) chloride",
    "name_vi": "Sắt(III) clorua",
    "common_names_vi": [
      "Ferric chloride"
    ],
    "formula": "FeCl3",
    "formula_display": "FeCl₃",
    "molar_mass": 162.2,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Nâu đen ánh thép",
    "solubility_water_vi": "Dễ tan tạo dung dịch vàng nâu",
    "description_vi": "Ăn mòn lá đồng trong kỹ thuật in bảng mạch điện tử PCB.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cucl2",
    "name_iupac": "Copper(II) chloride",
    "name_vi": "Đồng(II) clorua",
    "common_names_vi": [
      "Cupric chloride"
    ],
    "formula": "CuCl2",
    "formula_display": "CuCl₂",
    "molar_mass": 134.45,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Nâu (ngậm nước xanh lục)",
    "solubility_water_vi": "Dễ tan tạo dung dịch xanh lam",
    "description_vi": "Chất màu nhuộm vải, chất xúc tác hữu cơ Wacker.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cucl",
    "name_iupac": "Copper(I) chloride",
    "name_vi": "Đồng(I) clorua",
    "common_names_vi": [
      "Cuprous chloride"
    ],
    "formula": "CuCl",
    "formula_display": "CuCl",
    "molar_mass": 98.999,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Chất xúc tác hấp thụ khí CO trong công nghiệp hóa dầu.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_zncl2",
    "name_iupac": "Zinc chloride",
    "name_vi": "Kẽm clorua",
    "common_names_vi": [
      "Thuốc hàn kẽm"
    ],
    "formula": "ZnCl2",
    "formula_display": "ZnCl₂",
    "molar_mass": 136.31,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng chảy rữa",
    "solubility_water_vi": "Tan rất nhiều trong nước",
    "description_vi": "Nước hàn hòa tan oxit kim loại khi hàn thiếc, bảo quản gỗ chống mối mọt.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_agcl",
    "name_iupac": "Silver chloride",
    "name_vi": "Bạc clorua",
    "common_names_vi": [
      "Kết tủa trắng bạc clorua"
    ],
    "formula": "AgCl",
    "formula_display": "AgCl",
    "molar_mass": 143.32,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng vón cục",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Kết tủa trắng hóa tím đen dưới ánh sáng, nhận biết ion Cl-.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_pbcl2",
    "name_iupac": "Lead(II) chloride",
    "name_vi": "Chì(II) clorua",
    "common_names_vi": [
      "Chì clorua"
    ],
    "formula": "PbCl2",
    "formula_display": "PbCl₂",
    "molar_mass": 278.1,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Ít tan trong nước lạnh, tan trong nước sôi",
    "description_vi": "Kết tủa tinh thể hình kim lấp lánh khi để nguội nước sôi.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_nh4cl",
    "name_iupac": "Ammonium chloride",
    "name_vi": "Amoni clorua",
    "common_names_vi": [
      "Muối lạnh"
    ],
    "formula": "NH4Cl",
    "formula_display": "NH₄Cl",
    "molar_mass": 53.49,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan nhiều hút nhiệt",
    "description_vi": "Tan làm nước lạnh ngắt, thuốc long đờm, chất hàn kim loại.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_hgcl2",
    "name_iupac": "Mercury(II) chloride",
    "name_vi": "Thủy ngân(II) clorua",
    "common_names_vi": [
      "Thuốc thăng hoa"
    ],
    "formula": "HgCl2",
    "formula_display": "HgCl₂",
    "molar_mass": 271.52,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan vừa phải",
    "description_vi": "Chất độc cực mạnh hủy hoại thận, khử trùng cổ điển.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_na2so4",
    "name_iupac": "Sodium sulfate",
    "name_vi": "Natri sunfat",
    "common_names_vi": [
      "Muối Glauber"
    ],
    "formula": "Na2SO4",
    "formula_display": "Na₂SO₄",
    "molar_mass": 142.04,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Chất độn trong bột giặt gia đình, sản xuất bột giấy kraft.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_k2so4",
    "name_iupac": "Potassium sulfate",
    "name_vi": "Kali sunfat",
    "common_names_vi": [
      "Phân SOP"
    ],
    "formula": "K2SO4",
    "formula_display": "K₂SO₄",
    "molar_mass": 174.26,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Phân bón kali cao cấp không chứa gốc clo cho cây sầu riêng và thuốc lá.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_caso4",
    "name_iupac": "Calcium sulfate",
    "name_vi": "Canxi sunfat",
    "common_names_vi": [
      "Thạch cao khan"
    ],
    "formula": "CaSO4",
    "formula_display": "CaSO₄",
    "molar_mass": 136.14,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Ít tan",
    "description_vi": "Thành phần của thạch cao tự nhiên, chất phụ gia làm đậu phụ.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_caso4_2h2o",
    "name_iupac": "Gypsum dihydrate",
    "name_vi": "Thạch cao sống",
    "common_names_vi": [
      "Thạch cao 2 nước"
    ],
    "formula": "CaSO4.2H2O",
    "formula_display": "CaSO₄·2H₂O",
    "molar_mass": 172.17,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Ít tan",
    "description_vi": "Khoáng vật thạch cao thiên nhiên, nguyên liệu sản xuất xi măng.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_caso4_hemi",
    "name_iupac": "Bassanite",
    "name_vi": "Thạch cao nung",
    "common_names_vi": [
      "Thạch cao bó bột"
    ],
    "formula": "CaSO4.0.5H2O",
    "formula_display": "CaSO₄·0.5H₂O",
    "molar_mass": 145.15,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng mịn",
    "solubility_water_vi": "Hút nước đông cứng",
    "description_vi": "Nhào với nước nở ra và đông cứng nhanh, dùng để đúc tượng và bó bột xương gãy.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_mgso4",
    "name_iupac": "Magnesium sulfate",
    "name_vi": "Magie sunfat",
    "common_names_vi": [
      "Muối Epsom"
    ],
    "formula": "MgSO4",
    "formula_display": "MgSO₄",
    "molar_mass": 120.366,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Muối khoáng ngâm bồn tắm thư giãn cơ bắp, bổ sung magie cho cây trồng.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_baso4",
    "name_iupac": "Barium sulfate",
    "name_vi": "Bari sunfat",
    "common_names_vi": [
      "Khoáng barit"
    ],
    "formula": "BaSO4",
    "formula_display": "BaSO₄",
    "molar_mass": 233.39,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng mịn nặng",
    "solubility_water_vi": "Không tan trong nước và acid",
    "description_vi": "Uống cản quang chụp X-quang đường tiêu hóa an toàn tuyệt đối.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_al2so43",
    "name_iupac": "Aluminium sulfate",
    "name_vi": "Nhôm sunfat",
    "common_names_vi": [
      "Phèn đơn nhôm"
    ],
    "formula": "Al2(SO4)3",
    "formula_display": "Al₂(SO₄)₃",
    "molar_mass": 342.15,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Chất keo tụ kết tủa bùn cặn làm trong nước sinh hoạt.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_kalso42",
    "name_iupac": "Potassium alum",
    "name_vi": "Phèn chua",
    "common_names_vi": [
      "Kali alum"
    ],
    "formula": "KAl(SO4)2",
    "formula_display": "KAl(SO₄)₂·12H₂O",
    "molar_mass": 258.21,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng tinh thể lớn",
    "solubility_water_vi": "Tan tốt",
    "description_vi": "Phèn chua lọc nước trong dân gian, làm sạch lòng lợn và khử mùi hôi nách.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_feso4",
    "name_iupac": "Iron(II) sulfate",
    "name_vi": "Sắt(II) sunfat",
    "common_names_vi": [
      "Phèn xanh"
    ],
    "formula": "FeSO4",
    "formula_display": "FeSO₄",
    "molar_mass": 151.91,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Xanh lục nhạt",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Thuốc bổ máu bổ sung sắt cho người thiếu máu, mực viết cổ điển gall.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_fe2so43",
    "name_iupac": "Iron(III) sulfate",
    "name_vi": "Sắt(III) sunfat",
    "common_names_vi": [
      "Ferric sulfate"
    ],
    "formula": "Fe2(SO4)3",
    "formula_display": "Fe₂(SO₄)₃",
    "molar_mass": 399.88,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Vàng xám",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Chất keo tụ làm sạch nước thải công nghiệp và bùn lắng.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cuso4",
    "name_iupac": "Copper(II) sulfate",
    "name_vi": "Đồng(II) sunfat",
    "common_names_vi": [
      "Phèn xanh lam"
    ],
    "formula": "CuSO4",
    "formula_display": "CuSO₄",
    "molar_mass": 159.61,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng (ngậm 5 nước màu xanh lam thẫm)",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Pha chế dung dịch Boocđô trừ nấm bệnh cho cây nho và cà chua.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_znso4",
    "name_iupac": "Zinc sulfate",
    "name_vi": "Kẽm sunfat",
    "common_names_vi": [
      "Phèn kẽm"
    ],
    "formula": "ZnSO4",
    "formula_display": "ZnSO₄",
    "molar_mass": 161.47,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Bổ sung vi lượng kẽm cho lúa và vật nuôi, thuốc nhỏ mắt sát trùng nhẹ.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_nh42so4",
    "name_iupac": "Ammonium sulfate",
    "name_vi": "Amoni sunfat",
    "common_names_vi": [
      "Phân đạm SA"
    ],
    "formula": "NH42SO4",
    "formula_display": "(NH₄)₂SO₄",
    "molar_mass": 132.14,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Phân đạm một lá cung cấp cả đạm và lưu huỳnh cho cây chè.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_pbso4",
    "name_iupac": "Lead(II) sulfate",
    "name_vi": "Chì(II) sunfat",
    "common_names_vi": [
      "Bột trắng chì sunfat"
    ],
    "formula": "PbSO4",
    "formula_display": "PbSO₄",
    "molar_mass": 303.26,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Kết tủa trắng bám trên cực ắc quy chì khi bình bị cạn kiệt điện.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_na2co3",
    "name_iupac": "Sodium carbonate",
    "name_vi": "Natri cacbonat",
    "common_names_vi": [
      "Sôđa",
      "Soda ash"
    ],
    "formula": "Na2CO3",
    "formula_display": "Na₂CO₃",
    "molar_mass": 105.99,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Nguyên liệu chính nấu thủy tinh, làm mềm nước cứng, công nghiệp tẩy rửa.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_nahco3",
    "name_iupac": "Sodium bicarbonate",
    "name_vi": "Natri hiđrocacbonat",
    "common_names_vi": [
      "Baking soda",
      "Thuốc muối"
    ],
    "formula": "NaHCO3",
    "formula_display": "NaHCO₃",
    "molar_mass": 84.007,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng mịn",
    "solubility_water_vi": "Tan vừa phải",
    "description_vi": "Bột nở làm bánh xốp, chữa ợ chua đau dạ dày, sủi bọt chữa cháy.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_k2co3",
    "name_iupac": "Potassium carbonate",
    "name_vi": "Kali cacbonat",
    "common_names_vi": [
      "Tro bếp"
    ],
    "formula": "K2CO3",
    "formula_display": "K₂CO₃",
    "molar_mass": 138.205,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hút ẩm",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Có nhiều trong tro bếp thực vật, sản xuất thủy tinh quang học đặc biệt.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_khco3",
    "name_iupac": "Potassium bicarbonate",
    "name_vi": "Kali hiđrocacbonat",
    "common_names_vi": [
      "Bột nở kali"
    ],
    "formula": "KHCO3",
    "formula_display": "KHCO₃",
    "molar_mass": 100.115,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan tốt",
    "description_vi": "Chất đệm chống acid hóa, bột chữa cháy khô cho đám cháy dầu mỡ.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_caco3",
    "name_iupac": "Calcium carbonate",
    "name_vi": "Canxi cacbonat",
    "common_names_vi": [
      "Đá vôi",
      "Phấn viết"
    ],
    "formula": "CaCO3",
    "formula_display": "CaCO₃",
    "molar_mass": 100.087,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước (tan trong nước có CO2)",
    "description_vi": "Thành phần đá vôi, vỏ sò, thạch nhũ hang động, phấn viết bảng.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cahco32",
    "name_iupac": "Calcium bicarbonate",
    "name_vi": "Canxi hiđrocacbonat",
    "common_names_vi": [
      "Muối vôi tan"
    ],
    "formula": "Ca(HCO3)2",
    "formula_display": "Ca(HCO₃)₂",
    "molar_mass": 162.11,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Dung dịch không bền",
    "solubility_water_vi": "Tan trong nước",
    "description_vi": "Nguyên nhân gây ra tính cứng tạm thời của nước tự nhiên, tạo cặn ấm đun nước.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_mgco3",
    "name_iupac": "Magnesium carbonate",
    "name_vi": "Magie cacbonat",
    "common_names_vi": [
      "Bột phấn thể dục"
    ],
    "formula": "MgCO3",
    "formula_display": "MgCO₃",
    "molar_mass": 84.314,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng xốp nhẹ",
    "solubility_water_vi": "Không tan",
    "description_vi": "Bột thoa tay chống trơn trượt của vận động viên leo núi và cử tạ.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_mghco32",
    "name_iupac": "Magnesium bicarbonate",
    "name_vi": "Magie hiđrocacbonat",
    "common_names_vi": [
      "Nước cứng magie"
    ],
    "formula": "Mg(HCO3)2",
    "formula_display": "Mg(HCO₃)₂",
    "molar_mass": 146.34,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Dung dịch",
    "solubility_water_vi": "Tan trong nước",
    "description_vi": "Tạo độ cứng tạm thời của nước, khi đun sôi kết tủa thành MgCO3 và CO2.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_baco3",
    "name_iupac": "Barium carbonate",
    "name_vi": "Bari cacbonat",
    "common_names_vi": [
      "Khoáng witherite"
    ],
    "formula": "BaCO3",
    "formula_display": "BaCO₃",
    "molar_mass": 197.34,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng nặng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Thuốc diệt chuột, men gốm men xanh, tan trong acid dạ dày gây độc cực mạnh.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_nh42co3",
    "name_iupac": "Ammonium carbonate",
    "name_vi": "Amoni cacbonat",
    "common_names_vi": [
      "Bột nở khai"
    ],
    "formula": "NH42CO3",
    "formula_display": "(NH₄)₂CO₃",
    "molar_mass": 96.09,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng mùi khai",
    "solubility_water_vi": "Tan tốt",
    "description_vi": "Bột nở làm bánh bao truyền thống, muối ngửi cấp cứu người ngất xỉu.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_nano3",
    "name_iupac": "Sodium nitrate",
    "name_vi": "Natri nitrat",
    "common_names_vi": [
      "Diêm tiêu Chile"
    ],
    "formula": "NaNO3",
    "formula_display": "NaNO₃",
    "molar_mass": 84.995,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hút ẩm",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Phân đạm natri nitrat, chất bảo quản giữ màu đỏ thịt nguội dăm bông.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_kno3",
    "name_iupac": "Potassium nitrate",
    "name_vi": "Kali nitrat",
    "common_names_vi": [
      "Diêm tiêu",
      "Muối tiêu"
    ],
    "formula": "KNO3",
    "formula_display": "KNO₃",
    "molar_mass": 101.103,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng tinh thể",
    "solubility_water_vi": "Dễ tan (tan cực mạnh khi nóng)",
    "description_vi": "Thành phần cốt tử của thuốc súng đen cổ điển (75% KNO3, 15% C, 10% S).",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cano32",
    "name_iupac": "Calcium nitrate",
    "name_vi": "Canxi nitrat",
    "common_names_vi": [
      "Đạm canxi"
    ],
    "formula": "Ca(NO3)2",
    "formula_display": "Ca(NO₃)₂",
    "molar_mass": 164.09,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng chảy rữa",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Phân bón đạm canxi giúp quả cà chua chắc thịt không bị nứt vỏ.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_agno3",
    "name_iupac": "Silver nitrate",
    "name_vi": "Bạc nitrat",
    "common_names_vi": [
      "Đá lửa bạc"
    ],
    "formula": "AgNO3",
    "formula_display": "AgNO₃",
    "molar_mass": 169.87,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan trong nước",
    "description_vi": "Thuốc thử kinh điển nhận biết các ion halogenua (Cl-, Br-, I-).",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cuno32",
    "name_iupac": "Copper(II) nitrate",
    "name_vi": "Đồng(II) nitrat",
    "common_names_vi": [
      "Cupric nitrate"
    ],
    "formula": "Cu(NO3)2",
    "formula_display": "Cu(NO₃)₂",
    "molar_mass": 187.56,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Xanh lam ngậm nước",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Chất oxi hóa, thuốc nhuộm vải, nhiệt phân tạo ra CuO, NO2 và O2.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_nh4no3",
    "name_iupac": "Ammonium nitrate",
    "name_vi": "Amoni nitrat",
    "common_names_vi": [
      "Đạm 2 lá"
    ],
    "formula": "NH4NO3",
    "formula_display": "NH₄NO₃",
    "molar_mass": 80.043,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hút ẩm",
    "solubility_water_vi": "Tan rất nhiều hút nhiệt",
    "description_vi": "Phân đạm hạt cao cấp, chất nổ công nghiệp khai thác đá mỏ ANFO.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_pbno32",
    "name_iupac": "Lead(II) nitrate",
    "name_vi": "Chì(II) nitrat",
    "common_names_vi": [
      "Plumbous nitrate"
    ],
    "formula": "Pb(NO3)2",
    "formula_display": "Pb(NO₃)₂",
    "molar_mass": 331.2,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Dùng để điều chế sơn vàng cromat PbCrO4 và pháo hoa vàng rực.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_fes",
    "name_iupac": "Iron(II) sulfide",
    "name_vi": "Sắt(II) sunfua",
    "common_names_vi": [
      "Ferrous sulfide"
    ],
    "formula": "FeS",
    "formula_display": "FeS",
    "molar_mass": 87.91,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Đen",
    "solubility_water_vi": "Không tan trong nước (tan trong acid)",
    "description_vi": "Tác dụng với acid giải phóng khí H2S mùi trứng thối trong phòng thí nghiệm.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_fes2",
    "name_iupac": "Iron disulfide",
    "name_vi": "Sắt đisunfua",
    "common_names_vi": [
      "Quặng pirit sắt",
      "Vàng của kẻ ngốc"
    ],
    "formula": "FeS2",
    "formula_display": "FeS₂",
    "molar_mass": 119.98,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Vàng ánh kim lấp lánh",
    "solubility_water_vi": "Không tan",
    "description_vi": "Quặng pirit sắt dùng để đốt lấy SO2 sản xuất acid sulfuric.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_cus",
    "name_iupac": "Copper(II) sulfide",
    "name_vi": "Đồng(II) sunfua",
    "common_names_vi": [
      "Cupric sulfide"
    ],
    "formula": "CuS",
    "formula_display": "CuS",
    "molar_mass": 95.61,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Đen nhánh",
    "solubility_water_vi": "Không tan trong nước và acid loãng",
    "description_vi": "Kết tủa đen bền vững không tan ngay cả trong dung dịch HCl sôi.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_zns",
    "name_iupac": "Zinc sulfide",
    "name_vi": "Kẽm sunfua",
    "common_names_vi": [
      "Quặng sphalerit"
    ],
    "formula": "ZnS",
    "formula_display": "ZnS",
    "molar_mass": 97.47,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Vật liệu phát quang lân tinh trên màn hình radar và kim đồng hồ dạ quang.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_ag2s",
    "name_iupac": "Silver sulfide",
    "name_vi": "Bạc sunfua",
    "common_names_vi": [
      "Màng xỉn bạc"
    ],
    "formula": "Ag2S",
    "formula_display": "Ag₂S",
    "molar_mass": 247.8,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Đen nhánh",
    "solubility_water_vi": "Không tan tuyệt đối",
    "description_vi": "Lớp màng đen xỉn làm mờ đồ trang sức bạc khi gặp khí trứng thối H2S.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_pbs",
    "name_iupac": "Lead(II) sulfide",
    "name_vi": "Chì(II) sunfua",
    "common_names_vi": [
      "Quặng galena"
    ],
    "formula": "PbS",
    "formula_display": "PbS",
    "molar_mass": 239.3,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Xám đen ánh kim",
    "solubility_water_vi": "Không tan",
    "description_vi": "Cảm biến quang học hồng ngoại quân sự, quặng chì quan trọng nhất.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_ki",
    "name_iupac": "Potassium iodide",
    "name_vi": "Kali iodua",
    "common_names_vi": [
      "Muối KI"
    ],
    "formula": "KI",
    "formula_display": "KI",
    "molar_mass": 166.0,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Thuốc bảo vệ tuyến giáp chống hấp thụ iot phóng xạ I-131 khi rò rỉ hạt nhân.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_nabr",
    "name_iupac": "Sodium bromide",
    "name_vi": "Natri bromua",
    "common_names_vi": [
      "Muối NaBr"
    ],
    "formula": "NaBr",
    "formula_display": "NaBr",
    "molar_mass": 102.89,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Thuốc an thần chống co giật y học cổ điển, dung dịch rửa ảnh.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_agbr",
    "name_iupac": "Silver bromide",
    "name_vi": "Bạc bromua",
    "common_names_vi": [
      "Bột tráng phim ảnh"
    ],
    "formula": "AgBr",
    "formula_display": "AgBr",
    "molar_mass": 187.77,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Vàng nhạt",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Bị ánh sáng phân hủy giải phóng bạc kim loại, nền tảng của kỹ thuật nhiếp ảnh phim nhựa.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_agi",
    "name_iupac": "Silver iodide",
    "name_vi": "Bạc iodua",
    "common_names_vi": [
      "Hạt nhân tạo mưa"
    ],
    "formula": "AgI",
    "formula_display": "AgI",
    "molar_mass": 234.77,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Vàng sẫm",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Bắn lên mây làm hạt nhân ngưng tụ hơi nước tạo mưa nhân tạo giải hạn.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_kmno4",
    "name_iupac": "Potassium permanganate",
    "name_vi": "Kali pemanganat",
    "common_names_vi": [
      "Thuốc tím"
    ],
    "formula": "KMnO4",
    "formula_display": "KMnO₄",
    "molar_mass": 158.034,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Tím đen ánh kim",
    "solubility_water_vi": "Tan tạo dung dịch tím thẫm",
    "description_vi": "Chất sát trùng rau sống, chất oxi hóa cực mạnh trong môi trường acid.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_k2cr2o7",
    "name_iupac": "Potassium dichromate",
    "name_vi": "Kali đicromat",
    "common_names_vi": [
      "Muối da cam"
    ],
    "formula": "K2Cr2O7",
    "formula_display": "K₂Cr₂O₇",
    "molar_mass": 294.185,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Cam rực rỡ",
    "solubility_water_vi": "Tan tốt",
    "description_vi": "Ống thổi đo nồng độ cồn cảnh sát giao thông (chuyển từ cam sang xanh lục khi gặp cồn).",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_kclo3",
    "name_iupac": "Potassium chlorate",
    "name_vi": "Kali clorat",
    "common_names_vi": [
      "Thuốc nổ pháo hoa"
    ],
    "formula": "KClO3",
    "formula_display": "KClO₃",
    "molar_mass": 122.55,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan tốt khi nóng",
    "description_vi": "Chất oxi hóa mạnh trong đầu que diêm, nhiệt phân có xúc tác MnO2 để điều chế O2.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_caocl2",
    "name_iupac": "Calcium hypochlorite chloride",
    "name_vi": "Clorua vôi",
    "common_names_vi": [
      "Vôi tẩy trùng"
    ],
    "formula": "CaOCl2",
    "formula_display": "CaOCl₂",
    "molar_mass": 126.98,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng xốp mùi clo",
    "solubility_water_vi": "Tan một phần",
    "description_vi": "Muối hỗn tạp khử trùng chuồng trại gia súc, tẩy uế nguồn nước sau lũ lụt.",
    "applications_vi": [
      "Hóa chất công nghiệp",
      "Thực nghiệm"
    ],
    "curriculum": "GDPT_2018_KHTN_8"
  },
  {
    "id": "sub_ch4",
    "name_iupac": "Methane",
    "name_vi": "Khí Metan",
    "common_names_vi": [
      "Khí bùn ao",
      "Khí thiên nhiên"
    ],
    "formula": "CH4",
    "formula_display": "CH₄",
    "molar_mass": 16.043,
    "category": "HYDROCARBON",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Thành phần chính của khí thiên nhiên và khí biogas hầm ủ rơm rác.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c2h6",
    "name_iupac": "Ethane",
    "name_vi": "Khí Etan",
    "common_names_vi": [
      "Ethane"
    ],
    "formula": "C2H6",
    "formula_display": "C₂H₆",
    "molar_mass": 30.07,
    "category": "HYDROCARBON",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Alkane 2 carbon, nguyên liệu nhiệt phân cracker sản xuất ethylene.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c3h8",
    "name_iupac": "Propane",
    "name_vi": "Khí Propan",
    "common_names_vi": [
      "Gas đun nấu LPG"
    ],
    "formula": "C3H8",
    "formula_display": "C₃H₈",
    "molar_mass": 44.097,
    "category": "HYDROCARBON",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Nhiên liệu khí hóa lỏng LPG nạp bình gas bếp nấu gia đình.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c4h10",
    "name_iupac": "Butane",
    "name_vi": "Khí Butan",
    "common_names_vi": [
      "Bình gas mini"
    ],
    "formula": "C4H10",
    "formula_display": "C₄H₁₀",
    "molar_mass": 58.12,
    "category": "HYDROCARBON",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Khí nạp bình gas mini ăn lẩu và bật lửa ga châm thuốc.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c5h12",
    "name_iupac": "Pentane",
    "name_vi": "Pentan lỏng",
    "common_names_vi": [
      "Pentane"
    ],
    "formula": "C5H12",
    "formula_display": "C₅H₁₂",
    "molar_mass": 72.15,
    "category": "HYDROCARBON",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Dung môi không phân cực dễ bay hơi trong phòng thí nghiệm.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c6h14",
    "name_iupac": "Hexane",
    "name_vi": "Hexan",
    "common_names_vi": [
      "Dung môi hexan"
    ],
    "formula": "C6H14",
    "formula_display": "C₆H₁₄",
    "molar_mass": 86.18,
    "category": "HYDROCARBON",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Dung môi công nghiệp chiết xuất dầu đậu nành từ hạt đậu.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c8h18",
    "name_iupac": "Octane",
    "name_vi": "Octan",
    "common_names_vi": [
      "Isooctan chuẩn"
    ],
    "formula": "C8H18",
    "formula_display": "C₈H₁₈",
    "molar_mass": 114.23,
    "category": "HYDROCARBON",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Chỉ số octan RON 95 đánh giá khả năng chống kích nổ của xăng động cơ ô tô xe máy.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c2h4",
    "name_iupac": "Ethylene",
    "name_vi": "Khí Etilen",
    "common_names_vi": [
      "Ethene"
    ],
    "formula": "C2H4",
    "formula_display": "CH₂=CH₂",
    "molar_mass": 28.054,
    "category": "HYDROCARBON",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Hormone thực vật kích thích hoa quả chín rộ, trùng hợp tạo nhựa dẻo PE.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c3h6",
    "name_iupac": "Propylene",
    "name_vi": "Khí Propilen",
    "common_names_vi": [
      "Propene"
    ],
    "formula": "C3H6",
    "formula_display": "CH₂=CH-CH₃",
    "molar_mass": 42.08,
    "category": "HYDROCARBON",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Nguyên liệu trùng hợp sản xuất nhựa PP làm hộp thực phẩm chịu nhiệt vi sóng.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c2h2",
    "name_iupac": "Acetylene",
    "name_vi": "Khí Axetilen",
    "common_names_vi": [
      "Ethyne"
    ],
    "formula": "C2H2",
    "formula_display": "CH≡CH",
    "molar_mass": 26.038,
    "category": "HYDROCARBON",
    "standard_state": "GAS",
    "color_vi": "Không màu",
    "solubility_water_vi": "Ít tan",
    "description_vi": "Khí hàn xì oxy-axetilen nhiệt độ ngọn lửa đạt trên 3000°C làm nóng chảy sắt thép.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c6h6",
    "name_iupac": "Benzene",
    "name_vi": "Benzen",
    "common_names_vi": [
      "Vòng benzen"
    ],
    "formula": "C6H6",
    "formula_display": "C₆H₆",
    "molar_mass": 78.114,
    "category": "HYDROCARBON",
    "standard_state": "LIQUID",
    "color_vi": "Không màu thơm nhẹ",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Vòng thơm 6 cạnh kinh điển của Kekulé, độc gây ung thư máu.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c7h8",
    "name_iupac": "Toluene",
    "name_vi": "Toluen",
    "common_names_vi": [
      "Methylbenzene"
    ],
    "formula": "C7H8",
    "formula_display": "C₆H₅-CH₃",
    "molar_mass": 92.14,
    "category": "HYDROCARBON",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Dung môi pha sơn và mực in, nguyên liệu sản xuất thuốc nổ TNT.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c8h10",
    "name_iupac": "Xylene",
    "name_vi": "Xilen",
    "common_names_vi": [
      "Dimethylbenzene"
    ],
    "formula": "C8H10",
    "formula_display": "C₆H₄(CH₃)₂",
    "molar_mass": 106.17,
    "category": "HYDROCARBON",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Dung môi ngành sơn và tẩy rửa công nghiệp, sản xuất sợi polyester PET.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c8h8",
    "name_iupac": "Styrene",
    "name_vi": "Stiren",
    "common_names_vi": [
      "Vinylbenzene"
    ],
    "formula": "C8H8",
    "formula_display": "C₆H₅-CH=CH₂",
    "molar_mass": 104.15,
    "category": "HYDROCARBON",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Không tan",
    "description_vi": "Trùng hợp tạo nhựa xốp cách nhiệt EPS (hộp xốp đựng cơm).",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c10h8",
    "name_iupac": "Naphthalene",
    "name_vi": "Băng phiến",
    "common_names_vi": [
      "Long não nhân tạo"
    ],
    "formula": "C10H8",
    "formula_display": "C₁₀H₈",
    "molar_mass": 128.17,
    "category": "HYDROCARBON",
    "standard_state": "SOLID",
    "color_vi": "Trắng mùi hắc",
    "solubility_water_vi": "Không tan",
    "description_vi": "Chất rắn có tính thăng hoa mùi hăng nồng xua đuổi gián và sâu bọ trong tủ quần áo.",
    "applications_vi": [
      "Nhiên liệu khí",
      "Tổng hợp hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_ch3oh",
    "name_iupac": "Methanol",
    "name_vi": "Cồn Metanol",
    "common_names_vi": [
      "Cồn gỗ"
    ],
    "formula": "CH3OH",
    "formula_display": "CH₃OH",
    "molar_mass": 32.042,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Cồn công nghiệp cực độc làm mù mắt và tử vong khi uống nhầm rượu giả.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c2h5oh",
    "name_iupac": "Ethanol",
    "name_vi": "Cồn Etylic",
    "common_names_vi": [
      "Cồn y tế",
      "Rượu ngũ cốc"
    ],
    "formula": "C2H5OH",
    "formula_display": "C₂H₅OH",
    "molar_mass": 46.069,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu thơm dịu",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Cồn uống trong bia rượu, cồn 70° sát trùng y tế, xăng sinh học E5.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c3h7oh",
    "name_iupac": "Isopropanol",
    "name_vi": "Cồn Isopropyl",
    "common_names_vi": [
      "Rửa mạch điện tử IPA"
    ],
    "formula": "C3H7OH",
    "formula_display": "CH₃-CH(OH)-CH₃",
    "molar_mass": 60.1,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Dung môi rửa bo mạch điện tử khô nhanh không để lại cặn bẩn.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c2h4oh2",
    "name_iupac": "Ethylene glycol",
    "name_vi": "Etylen glycol",
    "common_names_vi": [
      "Dung dịch chống đông"
    ],
    "formula": "C2H4(OH)2",
    "formula_display": "CH₂OH-CH₂OH",
    "molar_mass": 62.07,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu sánh ngọt",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Hạ điểm đóng băng của nước làm mát két nước động cơ ô tô xứ lạnh.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c3h5oh3",
    "name_iupac": "Glycerol",
    "name_vi": "Glixerol",
    "common_names_vi": [
      "Glycerin"
    ],
    "formula": "C3H5(OH)3",
    "formula_display": "C₃H₅(OH)₃",
    "molar_mass": 92.094,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu sánh như mật",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Dưỡng ẩm da trong mỹ phẩm, hòa tan Cu(OH)2 tạo phức xanh lam thẫm.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c6h5oh",
    "name_iupac": "Phenol",
    "name_vi": "Phenol",
    "common_names_vi": [
      "Acid carbolic"
    ],
    "formula": "C6H5OH",
    "formula_display": "C₆H₅OH",
    "molar_mass": 94.113,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hồng",
    "solubility_water_vi": "Ít tan trong nước lạnh",
    "description_vi": "Chất sát trùng phẫu thuật đầu tiên của Lister, làm bỏng da trắng bệch.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_hcho",
    "name_iupac": "Formaldehyde",
    "name_vi": "Fomanđehit",
    "common_names_vi": [
      "Foocmon",
      "Metanal"
    ],
    "formula": "HCHO",
    "formula_display": "HCHO",
    "molar_mass": 30.026,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Không màu cay mắt",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Dung dịch 37% gọi là foocmon ngâm xác tiêu bản sinh học chống thối rữa.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_ch3cho",
    "name_iupac": "Acetaldehyde",
    "name_vi": "Axetanđehit",
    "common_names_vi": [
      "Etanal"
    ],
    "formula": "CH3CHO",
    "formula_display": "CH₃CHO",
    "molar_mass": 44.053,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu thơm táo",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Chất chuyển hóa trung gian gây đỏ mặt và nhức đầu sau khi uống rượu bia.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_ch3coch3",
    "name_iupac": "Acetone",
    "name_vi": "Axeton",
    "common_names_vi": [
      "Nước rửa móng tay"
    ],
    "formula": "CH3COCH3",
    "formula_display": "CH₃COCH₃",
    "molar_mass": 58.08,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu thơm mát",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Nước tẩy sơn móng tay của phụ nữ, dung môi hòa tan keo và sơn.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_ch3cooc2h5",
    "name_iupac": "Ethyl acetate",
    "name_vi": "Etyl axetat",
    "common_names_vi": [
      "Hương chuối chín nhẹ"
    ],
    "formula": "CH3COOC2H5",
    "formula_display": "CH₃COOC₂H₅",
    "molar_mass": 88.11,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu thơm ngọt",
    "solubility_water_vi": "Ít tan trong nước",
    "description_vi": "Ester có mùi thơm hoa quả chín, dung môi tẩy sơn và chiết xuất cafein.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c6h12o6",
    "name_iupac": "Glucose",
    "name_vi": "Đường Glucozơ",
    "common_names_vi": [
      "Đường nho",
      "Dextrose"
    ],
    "formula": "C6H12O6",
    "formula_display": "C₆H₁₂O₆",
    "molar_mass": 180.156,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng tinh thể ngọt dịu",
    "solubility_water_vi": "Tan rất nhiều",
    "description_vi": "Đường trong máu nuôi cơ thể người (khoảng 0.1%), truyền dịch cấp cứu.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c12h22o11",
    "name_iupac": "Sucrose",
    "name_vi": "Đường Saccarozơ",
    "common_names_vi": [
      "Đường mía",
      "Đường cát"
    ],
    "formula": "C12H22O11",
    "formula_display": "C₁₂H₂₂O₁₁",
    "molar_mass": 342.3,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng kết tinh",
    "solubility_water_vi": "Dễ tan",
    "description_vi": "Đường ăn nấu nướng hàng ngày chiết xuất từ cây mía hoặc củ cải đường.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_starch",
    "name_iupac": "Starch",
    "name_vi": "Tinh bột",
    "common_names_vi": [
      "Amylase substrate"
    ],
    "formula": "C6H10O5",
    "formula_display": "(C₆H₁₀O₅)n",
    "molar_mass": 162.14,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng vô định hình",
    "solubility_water_vi": "Tan trong nước nóng tạo hồ",
    "description_vi": "Nguồn năng lượng carbohydrate chính của nhân loại trong gạo, ngô, khoai.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_cellulose",
    "name_iupac": "Cellulose",
    "name_vi": "Xenlulozơ",
    "common_names_vi": [
      "Sợi bông vải"
    ],
    "formula": "C6H10O5_cell",
    "formula_display": "(C₆H₁₀O₅)n",
    "molar_mass": 162.14,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng dạng sợi",
    "solubility_water_vi": "Không tan trong nước",
    "description_vi": "Khung xương tế bào thực vật, tạo nên gỗ rừng và sợi bông may mặc.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_ch3nh2",
    "name_iupac": "Methylamine",
    "name_vi": "Metylamin",
    "common_names_vi": [
      "Khí mùi cá ươn"
    ],
    "formula": "CH3NH2",
    "formula_display": "CH₃NH₂",
    "molar_mass": 31.057,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Không màu mùi khai cá",
    "solubility_water_vi": "Tan vô hạn",
    "description_vi": "Amine béo bậc 1 có tính base mạnh hơn amoniac, làm quỳ tím hóa xanh.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_c6h5nh2",
    "name_iupac": "Aniline",
    "name_vi": "Anilin",
    "common_names_vi": [
      "Phenylamine"
    ],
    "formula": "C6H5NH2",
    "formula_display": "C₆H₅NH₂",
    "molar_mass": 93.13,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Không màu hóa nâu ngoài gió",
    "solubility_water_vi": "Rất ít tan trong nước",
    "description_vi": "Amine thơm có tính base rất yếu không đổi màu quỳ tím, nguyên liệu nhuộm vải.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_glycine",
    "name_iupac": "Glycine",
    "name_vi": "Glyxin",
    "common_names_vi": [
      "Aminoacetic acid"
    ],
    "formula": "H2NCH2COOH",
    "formula_display": "H₂N-CH₂-COOH",
    "molar_mass": 75.07,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng ngọt nhẹ",
    "solubility_water_vi": "Tan tốt",
    "description_vi": "Amino acid đơn giản nhất trong cấu trúc protein của cơ thể sống.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_alanine",
    "name_iupac": "Alanine",
    "name_vi": "Alanin",
    "common_names_vi": [
      "2-aminopropanoic acid"
    ],
    "formula": "CH3CHNH2COOH",
    "formula_display": "CH₃-CH(NH₂)-COOH",
    "molar_mass": 89.09,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng",
    "solubility_water_vi": "Tan tốt",
    "description_vi": "Amino acid thiết yếu tham gia chu trình glucose-alanine ở gan và cơ.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_urea",
    "name_iupac": "Urea",
    "name_vi": "Phân đạm Urê",
    "common_names_vi": [
      "Carbamide"
    ],
    "formula": "CH4N2O",
    "formula_display": "(NH₂)₂CO",
    "molar_mass": 60.06,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hạt tròn",
    "solubility_water_vi": "Tan rất nhiều",
    "description_vi": "Phân bón đạm dồi dào nhất cho nông nghiệp, chất đầu tiên được Wohler tổng hợp nhân tạo 1828.",
    "applications_vi": [
      "Dược phẩm thực phẩm",
      "Sản xuất hữu cơ"
    ],
    "curriculum": "GDPT_2018_HOA_11"
  },
  {
    "id": "sub_gen_0_licl",
    "name_iupac": "Lithium chloride",
    "name_vi": "Liti clorua",
    "common_names_vi": [
      "Liti clorua"
    ],
    "formula": "LiCl",
    "formula_display": "LiCl",
    "molar_mass": 42.39,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Lithium chloride (LiCl), khối lượng mol 42.39 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_1_li2so4",
    "name_iupac": "Lithium sulfate",
    "name_vi": "Liti sunfat",
    "common_names_vi": [
      "Liti sunfat"
    ],
    "formula": "Li2SO4",
    "formula_display": "Li2SO4",
    "molar_mass": 109.94,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Lithium sulfate (Li2SO4), khối lượng mol 109.94 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_2_li2co3",
    "name_iupac": "Lithium carbonate",
    "name_vi": "Liti cacbonat",
    "common_names_vi": [
      "Liti cacbonat"
    ],
    "formula": "Li2CO3",
    "formula_display": "Li2CO3",
    "molar_mass": 73.89,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Lithium carbonate (Li2CO3), khối lượng mol 73.89 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_3_rbcl",
    "name_iupac": "Rubidium chloride",
    "name_vi": "Rubidi clorua",
    "common_names_vi": [
      "Rubidi clorua"
    ],
    "formula": "RbCl",
    "formula_display": "RbCl",
    "molar_mass": 120.92,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Rubidium chloride (RbCl), khối lượng mol 120.92 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_4_cscl",
    "name_iupac": "Caesium chloride",
    "name_vi": "Xesi clorua",
    "common_names_vi": [
      "Xesi clorua"
    ],
    "formula": "CsCl",
    "formula_display": "CsCl",
    "molar_mass": 168.36,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Caesium chloride (CsCl), khối lượng mol 168.36 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_5_srcl2",
    "name_iupac": "Strontium chloride",
    "name_vi": "Stronti clorua",
    "common_names_vi": [
      "Stronti clorua"
    ],
    "formula": "SrCl2",
    "formula_display": "SrCl2",
    "molar_mass": 158.53,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Strontium chloride (SrCl2), khối lượng mol 158.53 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_6_srso4",
    "name_iupac": "Strontium sulfate",
    "name_vi": "Stronti sunfat",
    "common_names_vi": [
      "Stronti sunfat"
    ],
    "formula": "SrSO4",
    "formula_display": "SrSO4",
    "molar_mass": 183.68,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Strontium sulfate (SrSO4), khối lượng mol 183.68 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_7_srco3",
    "name_iupac": "Strontium carbonate",
    "name_vi": "Stronti cacbonat",
    "common_names_vi": [
      "Stronti cacbonat"
    ],
    "formula": "SrCO3",
    "formula_display": "SrCO3",
    "molar_mass": 147.63,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Strontium carbonate (SrCO3), khối lượng mol 147.63 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_8_cocl2",
    "name_iupac": "Cobalt(II) chloride",
    "name_vi": "Coban(II) clorua",
    "common_names_vi": [
      "Coban(II) clorua"
    ],
    "formula": "CoCl2",
    "formula_display": "CoCl2",
    "molar_mass": 129.84,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Cobalt(II) chloride (CoCl2), khối lượng mol 129.84 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_9_nicl2",
    "name_iupac": "Nickel(II) chloride",
    "name_vi": "Niken(II) clorua",
    "common_names_vi": [
      "Niken(II) clorua"
    ],
    "formula": "NiCl2",
    "formula_display": "NiCl2",
    "molar_mass": 129.6,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Nickel(II) chloride (NiCl2), khối lượng mol 129.6 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_10_crcl3",
    "name_iupac": "Chromium(III) chloride",
    "name_vi": "Crom(III) clorua",
    "common_names_vi": [
      "Crom(III) clorua"
    ],
    "formula": "CrCl3",
    "formula_display": "CrCl3",
    "molar_mass": 158.36,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Chromium(III) chloride (CrCl3), khối lượng mol 158.36 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_11_mncl2",
    "name_iupac": "Manganese(II) chloride",
    "name_vi": "Mangan(II) clorua",
    "common_names_vi": [
      "Mangan(II) clorua"
    ],
    "formula": "MnCl2",
    "formula_display": "MnCl2",
    "molar_mass": 125.84,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Manganese(II) chloride (MnCl2), khối lượng mol 125.84 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_12_cdcl2",
    "name_iupac": "Cadmium chloride",
    "name_vi": "Cadmi clorua",
    "common_names_vi": [
      "Cadmi clorua"
    ],
    "formula": "CdCl2",
    "formula_display": "CdCl2",
    "molar_mass": 183.32,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Cadmium chloride (CdCl2), khối lượng mol 183.32 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_13_cds",
    "name_iupac": "Cadmium sulfide",
    "name_vi": "Cadmi sunfua",
    "common_names_vi": [
      "Cadmi sunfua"
    ],
    "formula": "CdS",
    "formula_display": "CdS",
    "molar_mass": 144.48,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Cadmium sulfide (CdS), khối lượng mol 144.48 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_14_bicl3",
    "name_iupac": "Bismuth(III) chloride",
    "name_vi": "Bismut(III) clorua",
    "common_names_vi": [
      "Bismut(III) clorua"
    ],
    "formula": "BiCl3",
    "formula_display": "BiCl3",
    "molar_mass": 315.34,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Bismuth(III) chloride (BiCl3), khối lượng mol 315.34 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_15_bi2o3",
    "name_iupac": "Bismuth(III) oxide",
    "name_vi": "Bismut(III) oxit",
    "common_names_vi": [
      "Bismut(III) oxit"
    ],
    "formula": "Bi2O3",
    "formula_display": "Bi2O3",
    "molar_mass": 465.96,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Bismuth(III) oxide (Bi2O3), khối lượng mol 465.96 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_16_ticl4",
    "name_iupac": "Titanium tetrachloride",
    "name_vi": "Titan tetraclorua",
    "common_names_vi": [
      "Titan tetraclorua"
    ],
    "formula": "TiCl4",
    "formula_display": "TiCl4",
    "molar_mass": 189.68,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Titanium tetrachloride (TiCl4), khối lượng mol 189.68 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_17_k2cro4",
    "name_iupac": "Potassium chromate",
    "name_vi": "Kali cromat",
    "common_names_vi": [
      "Kali cromat"
    ],
    "formula": "K2CrO4",
    "formula_display": "K2CrO4",
    "molar_mass": 194.19,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Potassium chromate (K2CrO4), khối lượng mol 194.19 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_18_na2cro4",
    "name_iupac": "Sodium chromate",
    "name_vi": "Natri cromat",
    "common_names_vi": [
      "Natri cromat"
    ],
    "formula": "Na2CrO4",
    "formula_display": "Na2CrO4",
    "molar_mass": 161.97,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium chromate (Na2CrO4), khối lượng mol 161.97 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_19_na2cr2o7",
    "name_iupac": "Sodium dichromate",
    "name_vi": "Natri đicromat",
    "common_names_vi": [
      "Natri đicromat"
    ],
    "formula": "Na2Cr2O7",
    "formula_display": "Na2Cr2O7",
    "molar_mass": 261.97,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium dichromate (Na2Cr2O7), khối lượng mol 261.97 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_20_na3po4",
    "name_iupac": "Sodium phosphate",
    "name_vi": "Natri photphat",
    "common_names_vi": [
      "Natri photphat"
    ],
    "formula": "Na3PO4",
    "formula_display": "Na3PO4",
    "molar_mass": 163.94,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium phosphate (Na3PO4), khối lượng mol 163.94 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_21_k3po4",
    "name_iupac": "Potassium phosphate",
    "name_vi": "Kali photphat",
    "common_names_vi": [
      "Kali photphat"
    ],
    "formula": "K3PO4",
    "formula_display": "K3PO4",
    "molar_mass": 212.27,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Potassium phosphate (K3PO4), khối lượng mol 212.27 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_22_ca3po42",
    "name_iupac": "Calcium phosphate",
    "name_vi": "Canxi photphat",
    "common_names_vi": [
      "Canxi photphat"
    ],
    "formula": "Ca3(PO4)2",
    "formula_display": "Ca3(PO4)2",
    "molar_mass": 310.18,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Calcium phosphate (Ca3(PO4)2), khối lượng mol 310.18 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_23_cah2po42",
    "name_iupac": "Monocalcium phosphate",
    "name_vi": "Canxi đihyđrophotphat",
    "common_names_vi": [
      "Canxi đihyđrophotphat"
    ],
    "formula": "Ca(H2PO4)2",
    "formula_display": "Ca(H2PO4)2",
    "molar_mass": 234.05,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Monocalcium phosphate (Ca(H2PO4)2), khối lượng mol 234.05 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_24_cahpo4",
    "name_iupac": "Dicalcium phosphate",
    "name_vi": "Canxi hyđrophotphat",
    "common_names_vi": [
      "Canxi hyđrophotphat"
    ],
    "formula": "CaHPO4",
    "formula_display": "CaHPO4",
    "molar_mass": 136.06,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Dicalcium phosphate (CaHPO4), khối lượng mol 136.06 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_25_nh43po4",
    "name_iupac": "Ammonium phosphate",
    "name_vi": "Amoni photphat",
    "common_names_vi": [
      "Amoni photphat"
    ],
    "formula": "NH43PO4",
    "formula_display": "NH43PO4",
    "molar_mass": 149.09,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Ammonium phosphate (NH43PO4), khối lượng mol 149.09 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_26_na2so3",
    "name_iupac": "Sodium sulfite",
    "name_vi": "Natri sunfit",
    "common_names_vi": [
      "Natri sunfit"
    ],
    "formula": "Na2SO3",
    "formula_display": "Na2SO3",
    "molar_mass": 126.04,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium sulfite (Na2SO3), khối lượng mol 126.04 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_27_nahso3",
    "name_iupac": "Sodium bisulfite",
    "name_vi": "Natri bisunfit",
    "common_names_vi": [
      "Natri bisunfit"
    ],
    "formula": "NaHSO3",
    "formula_display": "NaHSO3",
    "molar_mass": 104.06,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium bisulfite (NaHSO3), khối lượng mol 104.06 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_28_k2so3",
    "name_iupac": "Potassium sulfite",
    "name_vi": "Kali sunfit",
    "common_names_vi": [
      "Kali sunfit"
    ],
    "formula": "K2SO3",
    "formula_display": "K2SO3",
    "molar_mass": 158.26,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Potassium sulfite (K2SO3), khối lượng mol 158.26 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_29_caso3",
    "name_iupac": "Calcium sulfite",
    "name_vi": "Canxi sunfit",
    "common_names_vi": [
      "Canxi sunfit"
    ],
    "formula": "CaSO3",
    "formula_display": "CaSO3",
    "molar_mass": 120.14,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Calcium sulfite (CaSO3), khối lượng mol 120.14 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_30_na2s",
    "name_iupac": "Sodium sulfide",
    "name_vi": "Natri sunfua",
    "common_names_vi": [
      "Natri sunfua"
    ],
    "formula": "Na2S",
    "formula_display": "Na2S",
    "molar_mass": 78.04,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium sulfide (Na2S), khối lượng mol 78.04 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_31_k2s",
    "name_iupac": "Potassium sulfide",
    "name_vi": "Kali sunfua",
    "common_names_vi": [
      "Kali sunfua"
    ],
    "formula": "K2S",
    "formula_display": "K2S",
    "molar_mass": 110.26,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Potassium sulfide (K2S), khối lượng mol 110.26 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_32_al2s3",
    "name_iupac": "Aluminium sulfide",
    "name_vi": "Nhôm sunfua",
    "common_names_vi": [
      "Nhôm sunfua"
    ],
    "formula": "Al2S3",
    "formula_display": "Al2S3",
    "molar_mass": 150.16,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Aluminium sulfide (Al2S3), khối lượng mol 150.16 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_33_nai",
    "name_iupac": "Sodium iodide",
    "name_vi": "Natri iodua",
    "common_names_vi": [
      "Natri iodua"
    ],
    "formula": "NaI",
    "formula_display": "NaI",
    "molar_mass": 149.89,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium iodide (NaI), khối lượng mol 149.89 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_34_cai2",
    "name_iupac": "Calcium iodide",
    "name_vi": "Canxi iodua",
    "common_names_vi": [
      "Canxi iodua"
    ],
    "formula": "CaI2",
    "formula_display": "CaI2",
    "molar_mass": 293.89,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Calcium iodide (CaI2), khối lượng mol 293.89 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_35_mgi2",
    "name_iupac": "Magnesium iodide",
    "name_vi": "Magie iodua",
    "common_names_vi": [
      "Magie iodua"
    ],
    "formula": "MgI2",
    "formula_display": "MgI2",
    "molar_mass": 278.11,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Magnesium iodide (MgI2), khối lượng mol 278.11 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_36_fei2",
    "name_iupac": "Iron(II) iodide",
    "name_vi": "Sắt(II) iodua",
    "common_names_vi": [
      "Sắt(II) iodua"
    ],
    "formula": "FeI2",
    "formula_display": "FeI2",
    "molar_mass": 309.65,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Iron(II) iodide (FeI2), khối lượng mol 309.65 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_37_cui",
    "name_iupac": "Copper(I) iodide",
    "name_vi": "Đồng(I) iodua",
    "common_names_vi": [
      "Đồng(I) iodua"
    ],
    "formula": "CuI",
    "formula_display": "CuI",
    "molar_mass": 190.45,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Copper(I) iodide (CuI), khối lượng mol 190.45 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_38_naf",
    "name_iupac": "Sodium fluoride",
    "name_vi": "Natri florua",
    "common_names_vi": [
      "Natri florua"
    ],
    "formula": "NaF",
    "formula_display": "NaF",
    "molar_mass": 41.99,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium fluoride (NaF), khối lượng mol 41.99 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_39_kf",
    "name_iupac": "Potassium fluoride",
    "name_vi": "Kali florua",
    "common_names_vi": [
      "Kali florua"
    ],
    "formula": "KF",
    "formula_display": "KF",
    "molar_mass": 58.1,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Potassium fluoride (KF), khối lượng mol 58.1 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_40_caf2",
    "name_iupac": "Calcium fluoride",
    "name_vi": "Canxi florua (Fluorite)",
    "common_names_vi": [
      "Canxi florua (Fluorite)"
    ],
    "formula": "CaF2",
    "formula_display": "CaF2",
    "molar_mass": 78.07,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Calcium fluoride (CaF2), khối lượng mol 78.07 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_41_mgf2",
    "name_iupac": "Magnesium fluoride",
    "name_vi": "Magie florua",
    "common_names_vi": [
      "Magie florua"
    ],
    "formula": "MgF2",
    "formula_display": "MgF2",
    "molar_mass": 62.3,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Magnesium fluoride (MgF2), khối lượng mol 62.3 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_42_baf2",
    "name_iupac": "Barium fluoride",
    "name_vi": "Bari florua",
    "common_names_vi": [
      "Bari florua"
    ],
    "formula": "BaF2",
    "formula_display": "BaF2",
    "molar_mass": 175.32,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Barium fluoride (BaF2), khối lượng mol 175.32 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_43_agf",
    "name_iupac": "Silver fluoride",
    "name_vi": "Bạc florua",
    "common_names_vi": [
      "Bạc florua"
    ],
    "formula": "AgF",
    "formula_display": "AgF",
    "molar_mass": 126.87,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Silver fluoride (AgF), khối lượng mol 126.87 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_44_alf3",
    "name_iupac": "Aluminium fluoride",
    "name_vi": "Nhôm florua",
    "common_names_vi": [
      "Nhôm florua"
    ],
    "formula": "AlF3",
    "formula_display": "AlF3",
    "molar_mass": 83.98,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Aluminium fluoride (AlF3), khối lượng mol 83.98 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_45_na3alf6",
    "name_iupac": "Cryolite",
    "name_vi": "Criolit",
    "common_names_vi": [
      "Criolit"
    ],
    "formula": "Na3AlF6",
    "formula_display": "Na3AlF6",
    "molar_mass": 209.94,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Cryolite (Na3AlF6), khối lượng mol 209.94 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_46_nano2",
    "name_iupac": "Sodium nitrite",
    "name_vi": "Natri nitrit",
    "common_names_vi": [
      "Natri nitrit"
    ],
    "formula": "NaNO2",
    "formula_display": "NaNO2",
    "molar_mass": 69.0,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium nitrite (NaNO2), khối lượng mol 69.0 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_47_kno2",
    "name_iupac": "Potassium nitrite",
    "name_vi": "Kali nitrit",
    "common_names_vi": [
      "Kali nitrit"
    ],
    "formula": "KNO2",
    "formula_display": "KNO2",
    "molar_mass": 85.1,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Potassium nitrite (KNO2), khối lượng mol 85.1 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_48_mgno32",
    "name_iupac": "Magnesium nitrate",
    "name_vi": "Magie nitrat",
    "common_names_vi": [
      "Magie nitrat"
    ],
    "formula": "Mg(NO3)2",
    "formula_display": "Mg(NO3)2",
    "molar_mass": 148.31,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Magnesium nitrate (Mg(NO3)2), khối lượng mol 148.31 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_49_bano32",
    "name_iupac": "Barium nitrate",
    "name_vi": "Bari nitrat",
    "common_names_vi": [
      "Bari nitrat"
    ],
    "formula": "Ba(NO3)2",
    "formula_display": "Ba(NO3)2",
    "molar_mass": 261.34,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Barium nitrate (Ba(NO3)2), khối lượng mol 261.34 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_50_alno33",
    "name_iupac": "Aluminium nitrate",
    "name_vi": "Nhôm nitrat",
    "common_names_vi": [
      "Nhôm nitrat"
    ],
    "formula": "Al(NO3)3",
    "formula_display": "Al(NO3)3",
    "molar_mass": 213.0,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Aluminium nitrate (Al(NO3)3), khối lượng mol 213.0 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_51_feno32",
    "name_iupac": "Iron(II) nitrate",
    "name_vi": "Sắt(II) nitrat",
    "common_names_vi": [
      "Sắt(II) nitrat"
    ],
    "formula": "Fe(NO3)2",
    "formula_display": "Fe(NO3)2",
    "molar_mass": 179.86,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Iron(II) nitrate (Fe(NO3)2), khối lượng mol 179.86 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_52_feno33",
    "name_iupac": "Iron(III) nitrate",
    "name_vi": "Sắt(III) nitrat",
    "common_names_vi": [
      "Sắt(III) nitrat"
    ],
    "formula": "Fe(NO3)3",
    "formula_display": "Fe(NO3)3",
    "molar_mass": 241.86,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Iron(III) nitrate (Fe(NO3)3), khối lượng mol 241.86 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_53_znno32",
    "name_iupac": "Zinc nitrate",
    "name_vi": "Kẽm nitrat",
    "common_names_vi": [
      "Kẽm nitrat"
    ],
    "formula": "Zn(NO3)2",
    "formula_display": "Zn(NO3)2",
    "molar_mass": 189.36,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Zinc nitrate (Zn(NO3)2), khối lượng mol 189.36 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_54_nino32",
    "name_iupac": "Nickel(II) nitrate",
    "name_vi": "Niken(II) nitrat",
    "common_names_vi": [
      "Niken(II) nitrat"
    ],
    "formula": "Ni(NO3)2",
    "formula_display": "Ni(NO3)2",
    "molar_mass": 182.7,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Nickel(II) nitrate (Ni(NO3)2), khối lượng mol 182.7 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_55_cono32",
    "name_iupac": "Cobalt(II) nitrate",
    "name_vi": "Coban(II) nitrat",
    "common_names_vi": [
      "Coban(II) nitrat"
    ],
    "formula": "Co(NO3)2",
    "formula_display": "Co(NO3)2",
    "molar_mass": 182.94,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Cobalt(II) nitrate (Co(NO3)2), khối lượng mol 182.94 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_56_ag2so4",
    "name_iupac": "Silver sulfate",
    "name_vi": "Bạc sunfat",
    "common_names_vi": [
      "Bạc sunfat"
    ],
    "formula": "Ag2SO4",
    "formula_display": "Ag2SO4",
    "molar_mass": 311.8,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Silver sulfate (Ag2SO4), khối lượng mol 311.8 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_57_hgso4",
    "name_iupac": "Mercury(II) sulfate",
    "name_vi": "Thủy ngân(II) sunfat",
    "common_names_vi": [
      "Thủy ngân(II) sunfat"
    ],
    "formula": "HgSO4",
    "formula_display": "HgSO4",
    "molar_mass": 296.65,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Mercury(II) sulfate (HgSO4), khối lượng mol 296.65 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_58_hg2cl2",
    "name_iupac": "Mercury(I) chloride",
    "name_vi": "Calomel",
    "common_names_vi": [
      "Calomel"
    ],
    "formula": "Hg2Cl2",
    "formula_display": "Hg2Cl2",
    "molar_mass": 472.09,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Mercury(I) chloride (Hg2Cl2), khối lượng mol 472.09 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_59_sncl4",
    "name_iupac": "Tin(IV) chloride",
    "name_vi": "Thiếc(IV) clorua",
    "common_names_vi": [
      "Thiếc(IV) clorua"
    ],
    "formula": "SnCl4",
    "formula_display": "SnCl4",
    "molar_mass": 260.52,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Tin(IV) chloride (SnCl4), khối lượng mol 260.52 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_60_sbcl3",
    "name_iupac": "Antimony(III) chloride",
    "name_vi": "Antimon(III) clorua",
    "common_names_vi": [
      "Antimon(III) clorua"
    ],
    "formula": "SbCl3",
    "formula_display": "SbCl3",
    "molar_mass": 228.11,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Antimony(III) chloride (SbCl3), khối lượng mol 228.11 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_61_sbcl5",
    "name_iupac": "Antimony(V) chloride",
    "name_vi": "Antimon(V) clorua",
    "common_names_vi": [
      "Antimon(V) clorua"
    ],
    "formula": "SbCl5",
    "formula_display": "SbCl5",
    "molar_mass": 299.02,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Antimony(V) chloride (SbCl5), khối lượng mol 299.02 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_62_pcl3",
    "name_iupac": "Phosphorus trichloride",
    "name_vi": "Photpho triclorua",
    "common_names_vi": [
      "Photpho triclorua"
    ],
    "formula": "PCl3",
    "formula_display": "PCl3",
    "molar_mass": 137.33,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Phosphorus trichloride (PCl3), khối lượng mol 137.33 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_63_pcl5",
    "name_iupac": "Phosphorus pentachloride",
    "name_vi": "Photpho pentaclorua",
    "common_names_vi": [
      "Photpho pentaclorua"
    ],
    "formula": "PCl5",
    "formula_display": "PCl5",
    "molar_mass": 208.24,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Phosphorus pentachloride (PCl5), khối lượng mol 208.24 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_64_pocl3",
    "name_iupac": "Phosphoryl chloride",
    "name_vi": "Photphoryl clorua",
    "common_names_vi": [
      "Photphoryl clorua"
    ],
    "formula": "POCl3",
    "formula_display": "POCl3",
    "molar_mass": 153.33,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Phosphoryl chloride (POCl3), khối lượng mol 153.33 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_65_socl2",
    "name_iupac": "Thionyl chloride",
    "name_vi": "Thionyl clorua",
    "common_names_vi": [
      "Thionyl clorua"
    ],
    "formula": "SOCl2",
    "formula_display": "SOCl2",
    "molar_mass": 118.97,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Thionyl chloride (SOCl2), khối lượng mol 118.97 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_66_cs2",
    "name_iupac": "Carbon disulfide",
    "name_vi": "Cacbon đisunfua",
    "common_names_vi": [
      "Cacbon đisunfua"
    ],
    "formula": "CS2",
    "formula_display": "CS2",
    "molar_mass": 76.14,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Carbon disulfide (CS2), khối lượng mol 76.14 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_67_hcn",
    "name_iupac": "Hydrogen cyanide",
    "name_vi": "Acid xianhiđric",
    "common_names_vi": [
      "Acid xianhiđric"
    ],
    "formula": "HCN",
    "formula_display": "HCN",
    "molar_mass": 27.025,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Hydrogen cyanide (HCN), khối lượng mol 27.025 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_68_nacn",
    "name_iupac": "Sodium cyanide",
    "name_vi": "Natri xianua",
    "common_names_vi": [
      "Natri xianua"
    ],
    "formula": "NaCN",
    "formula_display": "NaCN",
    "molar_mass": 49.007,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Sodium cyanide (NaCN), khối lượng mol 49.007 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_69_kcn",
    "name_iupac": "Potassium cyanide",
    "name_vi": "Kali xianua",
    "common_names_vi": [
      "Kali xianua"
    ],
    "formula": "KCN",
    "formula_display": "KCN",
    "molar_mass": 65.12,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Potassium cyanide (KCN), khối lượng mol 65.12 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_70_kscn",
    "name_iupac": "Potassium thiocyanate",
    "name_vi": "Kali thioxianat",
    "common_names_vi": [
      "Kali thioxianat"
    ],
    "formula": "KSCN",
    "formula_display": "KSCN",
    "molar_mass": 97.18,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Potassium thiocyanate (KSCN), khối lượng mol 97.18 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_71_nh4scn",
    "name_iupac": "Ammonium thiocyanate",
    "name_vi": "Amoni thioxianat",
    "common_names_vi": [
      "Amoni thioxianat"
    ],
    "formula": "NH4SCN",
    "formula_display": "NH4SCN",
    "molar_mass": 76.12,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Ammonium thiocyanate (NH4SCN), khối lượng mol 76.12 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_72_ch3cl",
    "name_iupac": "Chloromethane",
    "name_vi": "Clometan",
    "common_names_vi": [
      "Clometan"
    ],
    "formula": "CH3Cl",
    "formula_display": "CH3Cl",
    "molar_mass": 50.49,
    "category": "SALT",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Chloromethane (CH3Cl), khối lượng mol 50.49 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_73_ch2cl2",
    "name_iupac": "Dichloromethane",
    "name_vi": "Điclometan",
    "common_names_vi": [
      "Điclometan"
    ],
    "formula": "CH2Cl2",
    "formula_display": "CH2Cl2",
    "molar_mass": 84.93,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Dichloromethane (CH2Cl2), khối lượng mol 84.93 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_74_chcl3",
    "name_iupac": "Chloroform",
    "name_vi": "Clorofom",
    "common_names_vi": [
      "Clorofom"
    ],
    "formula": "CHCl3",
    "formula_display": "CHCl3",
    "molar_mass": 119.38,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Chloroform (CHCl3), khối lượng mol 119.38 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_75_ccl4",
    "name_iupac": "Carbon tetrachloride",
    "name_vi": "Cacbon tetraclorua",
    "common_names_vi": [
      "Cacbon tetraclorua"
    ],
    "formula": "CCl4",
    "formula_display": "CCl4",
    "molar_mass": 153.82,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Carbon tetrachloride (CCl4), khối lượng mol 153.82 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_76_c2h5cl",
    "name_iupac": "Chloroethane",
    "name_vi": "Cloetan",
    "common_names_vi": [
      "Cloetan"
    ],
    "formula": "C2H5Cl",
    "formula_display": "C2H5Cl",
    "molar_mass": 64.51,
    "category": "SALT",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Chloroethane (C2H5Cl), khối lượng mol 64.51 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_77_c2h3cl",
    "name_iupac": "Vinyl chloride",
    "name_vi": "Vinyl clorua",
    "common_names_vi": [
      "Vinyl clorua"
    ],
    "formula": "C2H3Cl",
    "formula_display": "C2H3Cl",
    "molar_mass": 62.5,
    "category": "SALT",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Vinyl chloride (C2H3Cl), khối lượng mol 62.5 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_78_c6h5cl",
    "name_iupac": "Chlorobenzene",
    "name_vi": "Clobenzen",
    "common_names_vi": [
      "Clobenzen"
    ],
    "formula": "C6H5Cl",
    "formula_display": "C6H5Cl",
    "molar_mass": 112.56,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Chlorobenzene (C6H5Cl), khối lượng mol 112.56 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_79_c6h4cl2",
    "name_iupac": "Dichlorobenzene",
    "name_vi": "Điclobenzen",
    "common_names_vi": [
      "Điclobenzen"
    ],
    "formula": "C6H4Cl2",
    "formula_display": "C6H4Cl2",
    "molar_mass": 147.0,
    "category": "SALT",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Dichlorobenzene (C6H4Cl2), khối lượng mol 147.0 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_80_c2h4br2",
    "name_iupac": "1,2-dibromoethane",
    "name_vi": "1,2-đibromoetan",
    "common_names_vi": [
      "1,2-đibromoetan"
    ],
    "formula": "C2H4Br2",
    "formula_display": "C2H4Br2",
    "molar_mass": 187.86,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất 1,2-dibromoethane (C2H4Br2), khối lượng mol 187.86 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_81_c3h5cl",
    "name_iupac": "Allyl chloride",
    "name_vi": "Anlyl clorua",
    "common_names_vi": [
      "Anlyl clorua"
    ],
    "formula": "C3H5Cl",
    "formula_display": "C3H5Cl",
    "molar_mass": 76.52,
    "category": "SALT",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Allyl chloride (C3H5Cl), khối lượng mol 76.52 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_82_c4h8",
    "name_iupac": "But-1-ene",
    "name_vi": "But-1-en",
    "common_names_vi": [
      "But-1-en"
    ],
    "formula": "C4H8",
    "formula_display": "C4H8",
    "molar_mass": 56.11,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất But-1-ene (C4H8), khối lượng mol 56.11 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_83_c4h6",
    "name_iupac": "Buta-1,3-diene",
    "name_vi": "Butadien",
    "common_names_vi": [
      "Butadien"
    ],
    "formula": "C4H6",
    "formula_display": "C4H6",
    "molar_mass": 54.09,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Buta-1,3-diene (C4H6), khối lượng mol 54.09 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_84_c5h8",
    "name_iupac": "Isoprene",
    "name_vi": "Isopren",
    "common_names_vi": [
      "Isopren"
    ],
    "formula": "C5H8",
    "formula_display": "C5H8",
    "molar_mass": 68.12,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Isoprene (C5H8), khối lượng mol 68.12 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_85_c3h4",
    "name_iupac": "Propyne",
    "name_vi": "Propin",
    "common_names_vi": [
      "Propin"
    ],
    "formula": "C3H4",
    "formula_display": "C3H4",
    "molar_mass": 40.06,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Propyne (C3H4), khối lượng mol 40.06 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_86_c4h6_alkyne",
    "name_iupac": "But-1-yne",
    "name_vi": "But-1-in",
    "common_names_vi": [
      "But-1-in"
    ],
    "formula": "C4H6_alkyne",
    "formula_display": "C4H6_alkyne",
    "molar_mass": 54.09,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất But-1-yne (C4H6_alkyne), khối lượng mol 54.09 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_87_c6h12_cyclo",
    "name_iupac": "Cyclohexane",
    "name_vi": "Xiclohexan",
    "common_names_vi": [
      "Xiclohexan"
    ],
    "formula": "C6H12_cyclo",
    "formula_display": "C6H12_cyclo",
    "molar_mass": 84.16,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Cyclohexane (C6H12_cyclo), khối lượng mol 84.16 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_88_c5h10_cyclo",
    "name_iupac": "Cyclopentane",
    "name_vi": "Xiclopentan",
    "common_names_vi": [
      "Xiclopentan"
    ],
    "formula": "C5H10_cyclo",
    "formula_display": "C5H10_cyclo",
    "molar_mass": 70.13,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Cyclopentane (C5H10_cyclo), khối lượng mol 70.13 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_89_c6h10",
    "name_iupac": "Cyclohexene",
    "name_vi": "Xiclohexen",
    "common_names_vi": [
      "Xiclohexen"
    ],
    "formula": "C6H10",
    "formula_display": "C6H10",
    "molar_mass": 82.14,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Cyclohexene (C6H10), khối lượng mol 82.14 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_90_ch3och3",
    "name_iupac": "Dimethyl ether",
    "name_vi": "Đimetyl ete",
    "common_names_vi": [
      "Đimetyl ete"
    ],
    "formula": "CH3OCH3",
    "formula_display": "CH3OCH3",
    "molar_mass": 46.07,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Dimethyl ether (CH3OCH3), khối lượng mol 46.07 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_91_c2h5oc2h5",
    "name_iupac": "Diethyl ether",
    "name_vi": "Đietyl ete",
    "common_names_vi": [
      "Đietyl ete"
    ],
    "formula": "C2H5OC2H5",
    "formula_display": "C2H5OC2H5",
    "molar_mass": 74.12,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Diethyl ether (C2H5OC2H5), khối lượng mol 74.12 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_92_hcooch3",
    "name_iupac": "Methyl formate",
    "name_vi": "Metyl fomat",
    "common_names_vi": [
      "Metyl fomat"
    ],
    "formula": "HCOOCH3",
    "formula_display": "HCOOCH3",
    "molar_mass": 60.05,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Methyl formate (HCOOCH3), khối lượng mol 60.05 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_93_ch3cooch3",
    "name_iupac": "Methyl acetate",
    "name_vi": "Metyl axetat",
    "common_names_vi": [
      "Metyl axetat"
    ],
    "formula": "CH3COOCH3",
    "formula_display": "CH3COOCH3",
    "molar_mass": 74.08,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Methyl acetate (CH3COOCH3), khối lượng mol 74.08 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_94_ch3cooc3h7",
    "name_iupac": "Propyl acetate",
    "name_vi": "Propyl axetat",
    "common_names_vi": [
      "Propyl axetat"
    ],
    "formula": "CH3COOC3H7",
    "formula_display": "CH3COOC3H7",
    "molar_mass": 102.13,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Propyl acetate (CH3COOC3H7), khối lượng mol 102.13 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_95_ch3cooc5h11",
    "name_iupac": "Isoamyl acetate",
    "name_vi": "Isoamyl axetat (hương chuối)",
    "common_names_vi": [
      "Isoamyl axetat (hương chuối)"
    ],
    "formula": "CH3COOC5H11",
    "formula_display": "CH3COOC5H11",
    "molar_mass": 130.18,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Isoamyl acetate (CH3COOC5H11), khối lượng mol 130.18 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_96_c2h5cooc2h5",
    "name_iupac": "Ethyl propionate",
    "name_vi": "Etyl propionat",
    "common_names_vi": [
      "Etyl propionat"
    ],
    "formula": "C2H5COOC2H5",
    "formula_display": "C2H5COOC2H5",
    "molar_mass": 102.13,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Ethyl propionate (C2H5COOC2H5), khối lượng mol 102.13 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_97_c3h7cooc2h5",
    "name_iupac": "Ethyl butyrate",
    "name_vi": "Etyl butirat (hương dứa)",
    "common_names_vi": [
      "Etyl butirat (hương dứa)"
    ],
    "formula": "C3H7COOC2H5",
    "formula_display": "C3H7COOC2H5",
    "molar_mass": 116.16,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Ethyl butyrate (C3H7COOC2H5), khối lượng mol 116.16 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_98_c6h5cooch3",
    "name_iupac": "Methyl benzoate",
    "name_vi": "Metyl benzoat",
    "common_names_vi": [
      "Metyl benzoat"
    ],
    "formula": "C6H5COOCH3",
    "formula_display": "C6H5COOCH3",
    "molar_mass": 136.15,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Methyl benzoate (C6H5COOCH3), khối lượng mol 136.15 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_99_ch2chcooch3",
    "name_iupac": "Methyl acrylate",
    "name_vi": "Metyl acrylat",
    "common_names_vi": [
      "Metyl acrylat"
    ],
    "formula": "CH2CHCOOCH3",
    "formula_display": "CH2CHCOOCH3",
    "molar_mass": 86.09,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Methyl acrylate (CH2CHCOOCH3), khối lượng mol 86.09 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_100_ch2cch3cooch3",
    "name_iupac": "Methyl methacrylate",
    "name_vi": "Metyl metacrylat (thủy tinh plexiglas)",
    "common_names_vi": [
      "Metyl metacrylat (thủy tinh plexiglas)"
    ],
    "formula": "CH2C(CH3)COOCH3",
    "formula_display": "CH2C(CH3)COOCH3",
    "molar_mass": 100.12,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Methyl methacrylate (CH2C(CH3)COOCH3), khối lượng mol 100.12 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_101_c3h5oocc17h353",
    "name_iupac": "Tristearin",
    "name_vi": "Tristearin (chất béo rắn)",
    "common_names_vi": [
      "Tristearin (chất béo rắn)"
    ],
    "formula": "C3H5(OOCC17H35)3",
    "formula_display": "C3H5(OOCC17H35)3",
    "molar_mass": 891.48,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Tristearin (C3H5(OOCC17H35)3), khối lượng mol 891.48 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_102_c3h5oocc17h333",
    "name_iupac": "Triolein",
    "name_vi": "Triolein (dầu lỏng)",
    "common_names_vi": [
      "Triolein (dầu lỏng)"
    ],
    "formula": "C3H5(OOCC17H33)3",
    "formula_display": "C3H5(OOCC17H33)3",
    "molar_mass": 885.43,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Triolein (C3H5(OOCC17H33)3), khối lượng mol 885.43 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_103_c3h5oocc15h313",
    "name_iupac": "Tripalmitin",
    "name_vi": "Tripalmitin",
    "common_names_vi": [
      "Tripalmitin"
    ],
    "formula": "C3H5(OOCC15H31)3",
    "formula_display": "C3H5(OOCC15H31)3",
    "molar_mass": 807.32,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Tripalmitin (C3H5(OOCC15H31)3), khối lượng mol 807.32 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_104_c12h22o11_malt",
    "name_iupac": "Maltose",
    "name_vi": "Đường Mantozo",
    "common_names_vi": [
      "Đường Mantozo"
    ],
    "formula": "C12H22O11_malt",
    "formula_display": "C12H22O11_malt",
    "molar_mass": 342.3,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Maltose (C12H22O11_malt), khối lượng mol 342.3 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_105_c6h12o6_fruc",
    "name_iupac": "Fructose",
    "name_vi": "Đường Fructozo (mật ong)",
    "common_names_vi": [
      "Đường Fructozo (mật ong)"
    ],
    "formula": "C6H12O6_fruc",
    "formula_display": "C6H12O6_fruc",
    "molar_mass": 180.16,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Fructose (C6H12O6_fruc), khối lượng mol 180.16 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_106_c2h5nh2",
    "name_iupac": "Ethylamine",
    "name_vi": "Etylamin",
    "common_names_vi": [
      "Etylamin"
    ],
    "formula": "C2H5NH2",
    "formula_display": "C2H5NH2",
    "molar_mass": 45.08,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Ethylamine (C2H5NH2), khối lượng mol 45.08 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_107_ch32nh",
    "name_iupac": "Dimethylamine",
    "name_vi": "Đimetylamin",
    "common_names_vi": [
      "Đimetylamin"
    ],
    "formula": "(CH3)2NH",
    "formula_display": "(CH3)2NH",
    "molar_mass": 45.08,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Dimethylamine ((CH3)2NH), khối lượng mol 45.08 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_108_ch33n",
    "name_iupac": "Trimethylamine",
    "name_vi": "Trimetylamin",
    "common_names_vi": [
      "Trimetylamin"
    ],
    "formula": "(CH3)3N",
    "formula_display": "(CH3)3N",
    "molar_mass": 59.11,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "GAS",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Trimethylamine ((CH3)3N), khối lượng mol 59.11 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_109_h2nch2ch2nh2",
    "name_iupac": "Ethylenediamine",
    "name_vi": "Etylenđiamin",
    "common_names_vi": [
      "Etylenđiamin"
    ],
    "formula": "H2NCH2CH2NH2",
    "formula_display": "H2NCH2CH2NH2",
    "molar_mass": 60.1,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "LIQUID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Ethylenediamine (H2NCH2CH2NH2), khối lượng mol 60.1 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_110_h2nch26nh2",
    "name_iupac": "Hexamethylenediamine",
    "name_vi": "Hexametylenđiamin",
    "common_names_vi": [
      "Hexametylenđiamin"
    ],
    "formula": "H2N(CH2)6NH2",
    "formula_display": "H2N(CH2)6NH2",
    "molar_mass": 116.21,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Hexamethylenediamine (H2N(CH2)6NH2), khối lượng mol 116.21 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_111_hoocch24cooh",
    "name_iupac": "Adipic acid",
    "name_vi": "Acid ađipic",
    "common_names_vi": [
      "Acid ađipic"
    ],
    "formula": "HOOC(CH2)4COOH",
    "formula_display": "HOOC(CH2)4COOH",
    "molar_mass": 146.14,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Adipic acid (HOOC(CH2)4COOH), khối lượng mol 146.14 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_112_c6h4cooh2",
    "name_iupac": "Terephthalic acid",
    "name_vi": "Acid terephtalic",
    "common_names_vi": [
      "Acid terephtalic"
    ],
    "formula": "C6H4(COOH)2",
    "formula_display": "C6H4(COOH)2",
    "molar_mass": 166.13,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Terephthalic acid (C6H4(COOH)2), khối lượng mol 166.13 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_113_ch3chnh2cooh",
    "name_iupac": "Valine",
    "name_vi": "Valin",
    "common_names_vi": [
      "Valin"
    ],
    "formula": "CH3CH(NH2)COOH",
    "formula_display": "CH3CH(NH2)COOH",
    "molar_mass": 117.15,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Valine (CH3CH(NH2)COOH), khối lượng mol 117.15 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_114_hoocch2ch2chnh2cooh",
    "name_iupac": "Glutamic acid",
    "name_vi": "Acid glutamic",
    "common_names_vi": [
      "Acid glutamic"
    ],
    "formula": "HOOCCH2CH2CH(NH2)COOH",
    "formula_display": "HOOCCH2CH2CH(NH2)COOH",
    "molar_mass": 147.13,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Glutamic acid (HOOCCH2CH2CH(NH2)COOH), khối lượng mol 147.13 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_115_h2nch24chnh2cooh",
    "name_iupac": "Lysine",
    "name_vi": "Lysin",
    "common_names_vi": [
      "Lysin"
    ],
    "formula": "H2N(CH2)4CH(NH2)COOH",
    "formula_display": "H2N(CH2)4CH(NH2)COOH",
    "molar_mass": 146.19,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Lysine (H2N(CH2)4CH(NH2)COOH), khối lượng mol 146.19 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  },
  {
    "id": "sub_gen_116_naoocch2ch2chnh2cooh",
    "name_iupac": "Monosodium glutamate",
    "name_vi": "Mì chính (bột ngọt)",
    "common_names_vi": [
      "Mì chính (bột ngọt)"
    ],
    "formula": "NaOOCCH2CH2CH(NH2)COOH",
    "formula_display": "NaOOCCH2CH2CH(NH2)COOH",
    "molar_mass": 169.11,
    "category": "ORGANIC_DERIVATIVE",
    "standard_state": "SOLID",
    "color_vi": "Trắng hoặc đặc trưng",
    "solubility_water_vi": "Tùy thuộc bản chất ion",
    "description_vi": "Hợp chất Monosodium glutamate (NaOOCCH2CH2CH(NH2)COOH), khối lượng mol 169.11 g/mol.",
    "applications_vi": [
      "Thực nghiệm hóa học",
      "Tổng hợp phòng thí nghiệm"
    ],
    "curriculum": "GDPT_2018_HOA_10"
  }
];

export function getSubstanceById(id: string): ChemicalSubstance | undefined {
  return ALL_SUBSTANCES.find(s => s.id === id);
}

export function getSubstanceByFormula(formula: string): ChemicalSubstance | undefined {
  const clean = formula.trim().toLowerCase();
  return ALL_SUBSTANCES.find(s => s.formula.toLowerCase() === clean || s.formula_display.toLowerCase() === clean);
}

export function searchSubstances(query: string, category?: SubstanceCategory | 'ALL'): ChemicalSubstance[] {
  const q = query.trim().toLowerCase();
  return ALL_SUBSTANCES.filter(s => {
    const matchCat = !category || category === 'ALL' || s.category === category;
    if (!matchCat) return false;
    if (!q) return true;
    return (
      s.formula.toLowerCase().includes(q) ||
      s.formula_display.toLowerCase().includes(q) ||
      s.name_iupac.toLowerCase().includes(q) ||
      s.name_vi.toLowerCase().includes(q) ||
      s.common_names_vi.some(c => c.toLowerCase().includes(q))
    );
  });
}