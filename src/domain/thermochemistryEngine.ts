// src/domain/thermochemistryEngine.ts
// Scientific Thermochemistry & Kinetics Engine for ELEMENTA (GDPT 2018 & IUPAC)
// Covers Enthalpy of Reaction (\Delta_r H^0_{298}), Standard Enthalpy of Formation (\Delta_f H^0_{298}),
// Bond Energy Calculations (E_b), Exothermic/Endothermic Classification, and Van 't Hoff Kinetics.

export interface ThermodynamicSpecies {
  formula: string;
  name_vi: string;
  state: 's' | 'l' | 'g' | 'aq';
  delta_f_H298: number; // kJ/mol (Standard Enthalpy of Formation at 298.15 K)
}

export interface BondEnergyData {
  bond: string;
  energy: number; // kJ/mol
}

export interface ThermochemicalReaction {
  id: string;
  equation: string;
  name_vi: string;
  reactants: { formula: string; coeff: number }[];
  products: { formula: string; coeff: number }[];
  category: 'COMBUSTION' | 'THERMITE' | 'SYNTHESIS' | 'DECOMPOSITION' | 'AQUEOUS_REDOX';
  notesVI: string;
}

export interface BondEnergyItem {
  bond: string;
  count: number;
}

export interface BondEnthalpyReaction {
  id: string;
  equation: string;
  name_vi: string;
  reactantBonds: BondEnergyItem[];
  productBonds: BondEnergyItem[];
  notesVI?: string;
}

export interface BondEnthalpyResult {
  delta_r_H298: number;
  isExothermic: boolean;
  reactionTypeVI: string;
  sumReactantsEb: number;
  sumProductsEb: number;
  stepExplanationVI: string[];
}

// 1. Standard Enthalpy of Formation Database (\Delta_f H^0_{298} in kJ/mol)
export const STANDARD_FORMATION_ENTHALPY: Record<string, ThermodynamicSpecies> = {
  // Elements in reference state (\Delta_f H = 0)
  'O2(g)': { formula: 'O2', name_vi: 'Khí oxi', state: 'g', delta_f_H298: 0 },
  'H2(g)': { formula: 'H2', name_vi: 'Khí hiđro', state: 'g', delta_f_H298: 0 },
  'N2(g)': { formula: 'N2', name_vi: 'Khí nitơ', state: 'g', delta_f_H298: 0 },
  'Cl2(g)': { formula: 'Cl2', name_vi: 'Khí clo', state: 'g', delta_f_H298: 0 },
  'Na(s)': { formula: 'Na', name_vi: 'Natri kim loại', state: 's', delta_f_H298: 0 },
  'Fe(s)': { formula: 'Fe', name_vi: 'Sắt kim loại', state: 's', delta_f_H298: 0 },
  'Al(s)': { formula: 'Al', name_vi: 'Nhôm kim loại', state: 's', delta_f_H298: 0 },
  'Cu(s)': { formula: 'Cu', name_vi: 'Đồng kim loại', state: 's', delta_f_H298: 0 },
  'C(graphite)': { formula: 'C', name_vi: 'Than chì', state: 's', delta_f_H298: 0 },
  'Ba(s)': { formula: 'Ba', name_vi: 'Bari kim loại', state: 's', delta_f_H298: 0 },

  // Compounds
  'H2O(l)': { formula: 'H2O', name_vi: 'Nước lỏng', state: 'l', delta_f_H298: -285.8 },
  'H2O(g)': { formula: 'H2O', name_vi: 'Hơi nước', state: 'g', delta_f_H298: -241.8 },
  'CO2(g)': { formula: 'CO2', name_vi: 'Khí cacbonic', state: 'g', delta_f_H298: -393.5 },
  'CO(g)': { formula: 'CO', name_vi: 'Khí cacbon oxit', state: 'g', delta_f_H298: -110.5 },
  'CH4(g)': { formula: 'CH4', name_vi: 'Khí metan', state: 'g', delta_f_H298: -74.8 },
  'C2H5OH(l)': { formula: 'C2H5OH', name_vi: 'Etanol', state: 'l', delta_f_H298: -277.7 },
  'Fe2O3(s)': { formula: 'Fe2O3', name_vi: 'Sắt(III) oxit', state: 's', delta_f_H298: -824.2 },
  'Al2O3(s)': { formula: 'Al2O3', name_vi: 'Nhôm oxit', state: 's', delta_f_H298: -1675.7 },
  'NaOH(aq)': { formula: 'NaOH', name_vi: 'Dung dịch natri hiđroxit', state: 'aq', delta_f_H298: -470.1 },
  'NaOH(s)': { formula: 'NaOH', name_vi: 'Natri hiđroxit rắn', state: 's', delta_f_H298: -425.6 },
  'HCl(g)': { formula: 'HCl', name_vi: 'Khí hiđro clorua', state: 'g', delta_f_H298: -92.3 },
  'NH3(g)': { formula: 'NH3', name_vi: 'Khí amoniac', state: 'g', delta_f_H298: -46.1 },
  'SO2(g)': { formula: 'SO2', name_vi: 'Khí lưu huỳnh đioxit', state: 'g', delta_f_H298: -296.8 },
  'SO3(g)': { formula: 'SO3', name_vi: 'Lưu huỳnh trioxit', state: 'g', delta_f_H298: -395.7 },
  'CaO(s)': { formula: 'CaO', name_vi: 'Vôi sống (canxi oxit)', state: 's', delta_f_H298: -635.1 },
  'CaCO3(s)': { formula: 'CaCO3', name_vi: 'Đá vôi (canxi cacbonat)', state: 's', delta_f_H298: -1206.9 },
  'NO(g)': { formula: 'NO', name_vi: 'Khí nitơ monoxit', state: 'g', delta_f_H298: 90.3 },
  'NO2(g)': { formula: 'NO2', name_vi: 'Khí nitơ đioxit (nâu đỏ)', state: 'g', delta_f_H298: 33.2 },
  'BaSO4(s)': { formula: 'BaSO4', name_vi: 'Bari sunfat kết tủa', state: 's', delta_f_H298: -1473.2 },
  'Ba(OH)2(aq)': { formula: 'Ba(OH)2', name_vi: 'Bari hiđroxit dung dịch', state: 'aq', delta_f_H298: -1000.2 },
  'FeCl3(s)': { formula: 'FeCl3', name_vi: 'Sắt(III) clorua', state: 's', delta_f_H298: -399.5 },
  'Cu(NO3)2(aq)': { formula: 'Cu(NO3)2', name_vi: 'Đồng(II) nitrat', state: 'aq', delta_f_H298: -302.9 },
  'AgNO3(aq)': { formula: 'AgNO3', name_vi: 'Bạc nitrat dung dịch', state: 'aq', delta_f_H298: -124.4 },
  'Ag(s)': { formula: 'Ag', name_vi: 'Bạc kim loại', state: 's', delta_f_H298: 0 },
  'Na[Al(OH)4](aq)': { formula: 'Na[Al(OH)4]', name_vi: 'Natri aluminat', state: 'aq', delta_f_H298: -1499.7 }
};

// 2. Average Bond Energies (E_b in kJ/mol at 298 K - Vietnam GDPT 2018 & IUPAC Standard)
export const BOND_ENERGIES: Record<string, number> = {
  'H-H': 436,
  'O=O': 498,
  'N#N': 945, // N triple bond N
  'C-H': 413,
  'C-C': 347,
  'C=C': 614,
  'C#C': 839,
  'C=O': 799, // in CO2 (double bond)
  'C=O_carbonyl': 745, // in aldehydes / ketones / esters
  'C-O': 358,
  'O-H': 467,
  'O-O': 146,
  'Cl-Cl': 243,
  'H-Cl': 432,
  'N-H': 391,
  'Br-Br': 193,
  'H-Br': 366,
  'I-I': 151,
  'H-I': 298,
  'C-Cl': 328,
  'C-Br': 276,
  'C-I': 240,
  'S-H': 339,
  'S=O': 521
};

// Predefined Curriculum Bond Enthalpy Reactions (GDPT 2018 Grade 10 & 11)
export const CURRICULUM_BOND_ENTHALPY_REACTIONS: BondEnthalpyReaction[] = [
  {
    id: 'h2_cl2_bond_rx',
    equation: 'H2(g) + Cl2(g) -> 2HCl(g)',
    name_vi: 'Tổng Hợp Khí Hiđro Clorua (H2 + Cl2)',
    reactantBonds: [
      { bond: 'H-H', count: 1 },
      { bond: 'Cl-Cl', count: 1 }
    ],
    productBonds: [
      { bond: 'H-Cl', count: 2 }
    ],
    notesVI: 'Phản ứng nổ sáng tạo khói trắng axit, ΔᵣH° = -185 kJ (Tỏa nhiệt).'
  },
  {
    id: 'haber_bond_rx',
    equation: 'N2(g) + 3H2(g) -> 2NH3(g)',
    name_vi: 'Tổng Hợp Amoniac (Haber-Bosch - Bond Energy)',
    reactantBonds: [
      { bond: 'N#N', count: 1 },
      { bond: 'H-H', count: 3 }
    ],
    productBonds: [
      { bond: 'N-H', count: 6 }
    ],
    notesVI: 'Liên kết ba N≡N rất bền (945 kJ) cần xúc tác Fe để hạ rào cản năng lượng hoạt hóa, ΔᵣH° = -93 kJ.'
  },
  {
    id: 'methane_combustion_bond_rx',
    equation: 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)',
    name_vi: 'Đốt Cháy Metan (CH4 + 2O2)',
    reactantBonds: [
      { bond: 'C-H', count: 4 },
      { bond: 'O=O', count: 2 }
    ],
    productBonds: [
      { bond: 'C=O', count: 2 },
      { bond: 'O-H', count: 4 }
    ],
    notesVI: 'Tỏa lượng nhiệt lớn (-818 kJ) dùng làm nhiên liệu khí đốt sạch tiêu chuẩn.'
  },
  {
    id: 'ethane_combustion_bond_rx',
    equation: '2C2H6(g) + 7O2(g) -> 4CO2(g) + 6H2O(g)',
    name_vi: 'Đốt Cháy Etan (2C2H6 + 7O2)',
    reactantBonds: [
      { bond: 'C-C', count: 2 },
      { bond: 'C-H', count: 12 },
      { bond: 'O=O', count: 7 }
    ],
    productBonds: [
      { bond: 'C=O', count: 8 },
      { bond: 'O-H', count: 12 }
    ],
    notesVI: 'Quá trình đốt cháy hoàn toàn ankan mạch thẳng 2 C, tỏa -2860 kJ cho 2 mol (-1430 kJ/mol).'
  },
  {
    id: 'propane_combustion_bond_rx',
    equation: 'C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)',
    name_vi: 'Đốt Cháy Propan (Khí Hóa Lỏng LPG)',
    reactantBonds: [
      { bond: 'C-C', count: 2 },
      { bond: 'C-H', count: 8 },
      { bond: 'O=O', count: 5 }
    ],
    productBonds: [
      { bond: 'C=O', count: 6 },
      { bond: 'O-H', count: 8 }
    ],
    notesVI: 'Thành phần chính của khí đốt gas dân dụng LPG, tỏa -2042 kJ/mol propan.'
  },
  {
    id: 'ethene_hydrogenation_bond_rx',
    equation: 'C2H4(g) + H2(g) -> C2H6(g)',
    name_vi: 'Hiđro Hóa Eten Tạo Etan (Xúc Tác Ni, t°)',
    reactantBonds: [
      { bond: 'C=C', count: 1 },
      { bond: 'C-H', count: 4 },
      { bond: 'H-H', count: 1 }
    ],
    productBonds: [
      { bond: 'C-C', count: 1 },
      { bond: 'C-H', count: 6 }
    ],
    notesVI: 'Cộng hợp hiđro vào liên kết đôi pi (π) kém bền của anken, tỏa nhiệt ΔᵣH° = -123 kJ.'
  },
  {
    id: 'hydrogen_combustion_bond_rx',
    equation: '2H2(g) + O2(g) -> 2H2O(g)',
    name_vi: 'Đốt Cháy Hiđro Tạo Hơi Nước',
    reactantBonds: [
      { bond: 'H-H', count: 2 },
      { bond: 'O=O', count: 1 }
    ],
    productBonds: [
      { bond: 'O-H', count: 4 }
    ],
    notesVI: 'Phản ứng tỏa nhiệt mạnh (-498 kJ ở trạng thái hơi), cơ sở năng lượng pin nhiên liệu sạch.'
  },
  {
    id: 'h2_br2_bond_rx',
    equation: 'H2(g) + Br2(g) -> 2HBr(g)',
    name_vi: 'Tổng Hợp Hiđro Bromua (H2 + Br2)',
    reactantBonds: [
      { bond: 'H-H', count: 1 },
      { bond: 'Br-Br', count: 1 }
    ],
    productBonds: [
      { bond: 'H-Br', count: 2 }
    ],
    notesVI: 'Phản ứng halogen hóa tỏa nhiệt êm dịu hơn clo, ΔᵣH° = -103 kJ.'
  }
];

// 3. Curriculum Thermochemical Reactions Catalog
export const CURRICULUM_THERMO_REACTIONS: ThermochemicalReaction[] = [
  {
    id: 'thermite_rx',
    equation: '2Al(s) + Fe2O3(s) -> Al2O3(s) + 2Fe(s)',
    name_vi: 'Phản Ứng Nhiệt Nhôm Siêu Tỏa Nhiệt',
    reactants: [
      { formula: 'Al(s)', coeff: 2 },
      { formula: 'Fe2O3(s)', coeff: 1 }
    ],
    products: [
      { formula: 'Al2O3(s)', coeff: 1 },
      { formula: 'Fe(s)', coeff: 2 }
    ],
    category: 'THERMITE',
    notesVI: 'Tỏa lượng nhiệt khổng lồ (~851.5 kJ) làm nóng chảy sắt đạt hơn 2500°C dùng hàn đường ray.'
  },
  {
    id: 'water_synth',
    equation: '2H2(g) + O2(g) -> 2H2O(l)',
    name_vi: 'Phản Ứng Tổng Hợp Nước Lỏng',
    reactants: [
      { formula: 'H2(g)', coeff: 2 },
      { formula: 'O2(g)', coeff: 1 }
    ],
    products: [
      { formula: 'H2O(l)', coeff: 2 }
    ],
    category: 'SYNTHESIS',
    notesVI: 'Phản ứng nổ mạnh tỏa 571.6 kJ, nền tảng nhiên liệu tên lửa đẩy hidro - oxi.'
  },
  {
    id: 'methane_combustion',
    equation: 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)',
    name_vi: 'Đốt Cháy Hoàn Toàn Khí Metan',
    reactants: [
      { formula: 'CH4(g)', coeff: 1 },
      { formula: 'O2(g)', coeff: 2 }
    ],
    products: [
      { formula: 'CO2(g)', coeff: 1 },
      { formula: 'H2O(l)', coeff: 2 }
    ],
    category: 'COMBUSTION',
    notesVI: 'Nhiên liệu khí thiên nhiên sạch, tỏa -890.3 kJ/mol metan.'
  },
  {
    id: 'ammonia_synth',
    equation: 'N2(g) + 3H2(g) -> 2NH3(g)',
    name_vi: 'Tổng Hợp Amoniac (Quy Trình Haber-Bosch)',
    reactants: [
      { formula: 'N2(g)', coeff: 1 },
      { formula: 'H2(g)', coeff: 3 }
    ],
    products: [
      { formula: 'NH3(g)', coeff: 2 }
    ],
    category: 'SYNTHESIS',
    notesVI: 'Phản ứng tỏa nhiệt thuận nghịch (-92.2 kJ) cần xúc tác Fe/Pt và nhiệt độ thích hợp.'
  },
  {
    id: 'limestone_decomp',
    equation: 'CaCO3(s) -> CaO(s) + CO2(g)',
    name_vi: 'Nhiệt Phân Đá Vôi (Nung Vôi)',
    reactants: [
      { formula: 'CaCO3(s)', coeff: 1 }
    ],
    products: [
      { formula: 'CaO(s)', coeff: 1 },
      { formula: 'CO2(g)', coeff: 1 }
    ],
    category: 'DECOMPOSITION',
    notesVI: 'Phản ứng thu nhiệt (+178.3 kJ) cần cung cấp nhiệt liên tục ở khoảng 900-1000°C.'
  },
  {
    id: 'na_water_thermo',
    equation: '2Na(s) + 2H2O(l) -> 2NaOH(aq) + H2(g)',
    name_vi: 'Natri Tác Dụng Nước Tỏa Nhiệt',
    reactants: [
      { formula: 'Na(s)', coeff: 2 },
      { formula: 'H2O(l)', coeff: 2 }
    ],
    products: [
      { formula: 'NaOH(aq)', coeff: 2 },
      { formula: 'H2(g)', coeff: 1 }
    ],
    category: 'AQUEOUS_REDOX',
    notesVI: 'Phản ứng tỏa nhiệt mạnh làm nóng chảy mẩu Na và kích nổ khí H2 thoát ra.'
  }
];

export interface EnthalpyResult {
  delta_r_H298: number; // kJ
  isExothermic: boolean; // true if < 0 (tỏa nhiệt), false if > 0 (thu nhiệt)
  reactionTypeVI: string;
  stepExplanationVI: string[];
  gameplayModifier: {
    effectType: 'THERMAL_BLAST' | 'CHILL_SLOW' | 'CATALYST_BURST';
    movementBonusPct: number;
    areaDamageBonusPct: number;
  };
}

// 4. Curriculum Kinetics & Activation Energy Profiles
export interface ReactionKineticsProfile {
  pairKey: string;
  reactionNameVI: string;
  eaUncatalyzed_kJ: number;
  eaCatalyzed_kJ?: number;
  catalystName?: string;
  catalystKey?: string;
  mechanismNoteVI: string;
}

export const REACTION_KINETICS_PROFILES: Record<string, ReactionKineticsProfile> = {
  'H2+N2': {
    pairKey: 'H2+N2',
    reactionNameVI: 'Tổng Hợp Amoniac (Haber-Bosch)',
    eaUncatalyzed_kJ: 335,
    eaCatalyzed_kJ: 103,
    catalystName: 'Sắt [Fe] có chất phụ gia',
    catalystKey: 'Fe',
    mechanismNoteVI: 'Liên kết N≡N bền vững (945 kJ/mol) có rào cản năng lượng hoạt hóa Ea = 335 kJ/mol. Bề mặt bột sắt Fe hấp phụ phân hủy phân tử N2, hạ Ea xuống còn 103 kJ/mol.'
  },
  'Al+Fe2O3': {
    pairKey: 'Al+Fe2O3',
    reactionNameVI: 'Phản Ứng Nhiệt Nhôm Siêu Tỏa Nhiệt',
    eaUncatalyzed_kJ: 180,
    mechanismNoteVI: 'Mạng tinh thể oxit Fe2O3 cần năng lượng kích thích ban đầu ~180 kJ/mol (mồi nhiệt > 800K) để ion nhôm bắt đầu phản ứng oxi hóa khử mãnh liệt.'
  },
  'C2H5OH+CH3COOH': {
    pairKey: 'C2H5OH+CH3COOH',
    reactionNameVI: 'Phản Ứng Este Hóa Tạo Etyl Axetat',
    eaUncatalyzed_kJ: 65,
    eaCatalyzed_kJ: 42,
    catalystName: 'Axit Sunfuric đặc [H2SO4 đặc]',
    catalystKey: 'H2SO4',
    mechanismNoteVI: 'Ion H+ từ H2SO4 proton hóa nhóm cacbonyl C=O, tăng độ dương điện để phân tử ancol tấn công ái nhân, hạ Ea từ 65 xuống 42 kJ/mol.'
  },
  'AgNO3+C6H12O6': {
    pairKey: 'AgNO3+C6H12O6',
    reactionNameVI: 'Phản Ứng Tráng Bạc (Thuốc thử Tollens)',
    eaUncatalyzed_kJ: 78,
    eaCatalyzed_kJ: 38,
    catalystName: 'Dung dịch Amoniac [NH3] (Phức [Ag(NH3)2]+)',
    catalystKey: 'NH3',
    mechanismNoteVI: 'Phối tử NH3 ổn định ion Ag+ dưới dạng cation phức [Ag(NH3)2]+, làm giảm thế oxy hóa khử và giảm Ea từ 78 xuống 38 kJ/mol để oxi hóa nhóm anđehit của glucozơ.'
  },
  'HCl+NaOH': {
    pairKey: 'HCl+NaOH',
    reactionNameVI: 'Trung Hòa Axit Clohiđric & Natri Hiđroxit',
    eaUncatalyzed_kJ: 10,
    mechanismNoteVI: 'Phản ứng khuếch tán ion H3O+ và OH- trong dung dịch nước có rào cản năng lượng hoạt hóa cực thấp (~10 kJ/mol), xảy ra gần như tức thời ở 25°C.'
  },
  'H2O+Na': {
    pairKey: 'H2O+Na',
    reactionNameVI: 'Natri Kim Loại Thủy Phân Tỏa Nhiệt',
    eaUncatalyzed_kJ: 18,
    mechanismNoteVI: 'Kim loại kiềm Na có electron hóa trị 3s1 linh động, phản ứng tự diễn giải phóng năng lượng mạnh với Ea thấp.'
  },
  'CaCO3+HCl': {
    pairKey: 'CaCO3+HCl',
    reactionNameVI: 'Axit Clohiđric Ăn Mòn Đá Vôi',
    eaUncatalyzed_kJ: 28,
    mechanismNoteVI: 'Ion H+ xâm nhập bề mặt chất rắn CaCO3 phá vỡ liên kết ion - cộng hóa trị cacbonat, giải phóng khí CO2.'
  },
  'Fe+O2': {
    pairKey: 'Fe+O2',
    reactionNameVI: 'Oxi Hóa Sắt Tạo Oxit Sắt Từ',
    eaUncatalyzed_kJ: 95,
    mechanismNoteVI: 'Ở nhiệt độ phòng tốc độ phản ứng oxi hóa chậm chạp (gỉ sét). Khi đun nóng hoặc đốt dây sắt trong oxi nguyên chất, các phân tử vượt rào cản 95 kJ/mol bùng cháy sáng chói.'
  },
  'Al+NaOH': {
    pairKey: 'Al+NaOH',
    reactionNameVI: 'Nhôm Hòa Tan Trong Dung Dịch Kiềm',
    eaUncatalyzed_kJ: 45,
    mechanismNoteVI: 'Lớp màng oxit Al2O3 bảo vệ bị hòa tan bởi kiềm OH-, giải phóng bề mặt kim loại Al phản ứng sinh khí H2 và phức [Al(OH)4]-.'
  },
  'Ba+H2O': {
    pairKey: 'Ba+H2O',
    reactionNameVI: 'Bari Kim Loại Thủy Phân Tỏa Nhiệt',
    eaUncatalyzed_kJ: 15,
    mechanismNoteVI: 'Kim loại kiềm thổ Bari có bán kính nguyên tử lớn, thế khử chuẩn rất âm (-2.91V), thủy phân tự phát ở nhiệt độ thường với Ea thấp.'
  },
  'O2+SO2': {
    pairKey: 'O2+SO2',
    reactionNameVI: 'Oxi Hóa Khí SO2 Tạo SO3 (Phương Pháp Tiếp Xúc)',
    eaUncatalyzed_kJ: 190,
    eaCatalyzed_kJ: 60,
    catalystName: 'Vanadi(V) oxit [V2O5] hoặc Bạch kim [Pt]',
    catalystKey: 'V2O5',
    mechanismNoteVI: 'Chất xúc tác V2O5 tham gia chu trình oxy hóa khử trung gian (V2O5 + SO2 -> 2VO2 + SO3, rồi 2VO2 + 0.5 O2 -> V2O5), hạ Ea từ 190 xuống 60 kJ/mol.'
  },
  'AgNO3+Cu': {
    pairKey: 'AgNO3+Cu',
    reactionNameVI: 'Kim Loại Đồng Khử Bạc Nitrat (Cây Bạc)',
    eaUncatalyzed_kJ: 32,
    mechanismNoteVI: 'Chênh lệch thế khử chuẩn dương lớn (E°cell = +0.46V) tạo động lực phản ứng tự phát tạo tinh thể Ag kết tủa.'
  },
  'Cl2+Fe': {
    pairKey: 'Cl2+Fe',
    reactionNameVI: 'Sắt Cháy Sáng Trong Khí Clo',
    eaUncatalyzed_kJ: 85,
    mechanismNoteVI: 'Cần nung nóng dây sắt vượt qua hàng rào kích hoạt 85 kJ/mol để bắt đầu chuỗi phản ứng oxi hóa tỏa nhiệt cực mạnh lên Fe(III).'
  },
  'Cl2+H2': {
    pairKey: 'Cl2+H2',
    reactionNameVI: 'Nổ Quang Hóa Hiđro & Clo',
    eaUncatalyzed_kJ: 72,
    eaCatalyzed_kJ: 20,
    catalystName: 'Ánh sáng / Quang hóa (Photon hν)',
    catalystKey: 'LIGHT',
    mechanismNoteVI: 'Photon năng lượng phá vỡ liên kết Cl-Cl khơi mào gốc tự do Cl•, kích hoạt phản ứng dây chuyền nổ nhanh với Ea hiệu dụng giảm xuống 20 kJ/mol.'
  }
};

export interface VanTHoffResult {
  rateRatio: number;
  deltaT: number;
  exponent: number;
  gamma: number;
  explanationVI: string;
}

export interface CatalystKineticsResult {
  speedupFactor: number;
  speedupFormatted: string;
  deltaEa: number; // backward compatibility
  deltaEa_kJ: number;
  eaOriginal_kJ: number;
  eaCatalyzed_kJ: number;
  tempKelvin: number;
  explanationVI: string;
}

export class ThermochemistryEngine {
  /**
   * Retrieve kinetics and activation energy profile for a pair
   */
  static getKineticsProfile(pairKey: string): ReactionKineticsProfile | undefined {
    return REACTION_KINETICS_PROFILES[pairKey];
  }

  /**
   * Calculate \Delta_r H^0_{298} based on Standard Enthalpies of Formation
   * Formula: \Delta_r H^0_{298} = \sum \nu_p \Delta_f H^0_{298}(products) - \sum \nu_r \Delta_f H^0_{298}(reactants)
   */
  static calculateEnthalpyFromFormation(reaction: ThermochemicalReaction): EnthalpyResult {
    let sumProducts = 0;
    const prodSteps: string[] = [];

    for (const prod of reaction.products) {
      const data = STANDARD_FORMATION_ENTHALPY[prod.formula];
      const val = data ? data.delta_f_H298 : 0;
      const total = prod.coeff * val;
      sumProducts += total;
      prodSteps.push(`${prod.coeff} × (${val})`);
    }

    let sumReactants = 0;
    const reactSteps: string[] = [];

    for (const react of reaction.reactants) {
      const data = STANDARD_FORMATION_ENTHALPY[react.formula];
      const val = data ? data.delta_f_H298 : 0;
      const total = react.coeff * val;
      sumReactants += total;
      reactSteps.push(`${react.coeff} × (${val})`);
    }

    const delta_r_H298 = Math.round((sumProducts - sumReactants) * 10) / 10;
    const isExothermic = delta_r_H298 < 0;

    const steps = [
      `Áp dụng công thức GDPT 2018: ΔᵣH°₂₉₈ = ∑ νₚ·Δ_f H°₂₉₈(sản phẩm) - ∑ νᵣ·Δ_f H°₂₉₈(chất đầu)`,
      `Tổng enthalpy sản phẩm = ${prodSteps.join(' + ')} = ${sumProducts.toFixed(1)} kJ`,
      `Tổng enthalpy chất đầu = ${reactSteps.join(' + ')} = ${sumReactants.toFixed(1)} kJ`,
      `ΔᵣH°₂₉₈ = (${sumProducts.toFixed(1)}) - (${sumReactants.toFixed(1)}) = ${delta_r_H298 > 0 ? '+' : ''}${delta_r_H298.toFixed(1)} kJ`,
      isExothermic
        ? `Vì ΔᵣH°₂₉₈ < 0, phản ứng TỎA NHIỆT mạnh ra môi trường xung quanh.`
        : `Vì ΔᵣH°₂₉₈ > 0, phản ứng THU NHIỆT từ môi trường xung quanh.`
    ];

    return {
      delta_r_H298,
      isExothermic,
      reactionTypeVI: isExothermic ? 'Phản ứng Tỏa Nhiệt (Exothermic)' : 'Phản ứng Thu Nhiệt (Endothermic)',
      stepExplanationVI: steps,
      gameplayModifier: {
        effectType: isExothermic ? 'THERMAL_BLAST' : 'CHILL_SLOW',
        movementBonusPct: isExothermic ? Math.min(35, Math.round(Math.abs(delta_r_H298) / 30)) : 0,
        areaDamageBonusPct: isExothermic ? Math.min(50, Math.round(Math.abs(delta_r_H298) / 20)) : 0
      }
    };
  }

  /**
   * Calculate \Delta_r H^0_{298} based on Chemical Bond Energies (GDPT 2018 Hóa 10)
   * Formula: \Delta_r H^0_{298} = \sum E_b(reactants) - \sum E_b(products)
   */
  static calculateEnthalpyFromBondEnergies(reaction: BondEnthalpyReaction): BondEnthalpyResult {
    let sumReactantsEb = 0;
    const reactSteps: string[] = [];

    for (const item of reaction.reactantBonds) {
      const eb = BOND_ENERGIES[item.bond];
      if (eb === undefined) {
        throw new Error(`Không tìm thấy năng lượng liên kết cho liên kết '${item.bond}' trong cơ sở dữ liệu.`);
      }
      const total = item.count * eb;
      sumReactantsEb += total;
      reactSteps.push(`${item.count} × E_b(${item.bond}) [${eb} kJ]`);
    }

    let sumProductsEb = 0;
    const prodSteps: string[] = [];

    for (const item of reaction.productBonds) {
      const eb = BOND_ENERGIES[item.bond];
      if (eb === undefined) {
        throw new Error(`Không tìm thấy năng lượng liên kết cho liên kết '${item.bond}' trong cơ sở dữ liệu.`);
      }
      const total = item.count * eb;
      sumProductsEb += total;
      prodSteps.push(`${item.count} × E_b(${item.bond}) [${eb} kJ]`);
    }

    const delta_r_H298 = Math.round((sumReactantsEb - sumProductsEb) * 10) / 10;
    const isExothermic = delta_r_H298 < 0;

    const steps = [
      `Áp dụng công thức tính theo năng lượng liên kết (GDPT 2018): ΔᵣH°₂₉₈ = ∑ E_b(chất đầu) - ∑ E_b(sản phẩm)`,
      `Tổng năng lượng phá vỡ liên kết chất đầu = ${reactSteps.join(' + ')} = ${sumReactantsEb.toFixed(1)} kJ`,
      `Tổng năng lượng giải phóng khi hình thành liên kết sản phẩm = ${prodSteps.join(' + ')} = ${sumProductsEb.toFixed(1)} kJ`,
      `ΔᵣH°₂₉₈ = (${sumReactantsEb.toFixed(1)}) - (${sumProductsEb.toFixed(1)}) = ${delta_r_H298 > 0 ? '+' : ''}${delta_r_H298.toFixed(1)} kJ`,
      isExothermic
        ? `Vì năng lượng tỏa ra khi tạo liên kết mới lớn hơn năng lượng cần để phá vỡ liên kết cũ, phản ứng TỎA NHIỆT (ΔᵣH°₂₉₈ < 0).`
        : `Vì năng lượng cần phá vỡ liên kết cũ lớn hơn năng lượng tỏa ra khi tạo liên kết mới, phản ứng THU NHIỆT (ΔᵣH°₂₉₈ > 0).`
    ];

    return {
      delta_r_H298,
      isExothermic,
      reactionTypeVI: isExothermic ? 'Phản ứng Tỏa Nhiệt (Exothermic)' : 'Phản ứng Thu Nhiệt (Endothermic)',
      sumReactantsEb,
      sumProductsEb,
      stepExplanationVI: steps
    };
  }

  /**
   * Van 't Hoff Chemical Kinetics: Effect of Temperature on Reaction Rate
   * Ratio: v_T2 / v_T1 = gamma ^ ((T2 - T1) / 10)
   */
  static calculateVanTHoffRateIncrease(t1Celsius: number, t2Celsius: number, gamma: number = 2.0): VanTHoffResult {
    const deltaT = t2Celsius - t1Celsius;
    const exponent = deltaT / 10;
    const rateRatio = Math.round(Math.pow(gamma, exponent) * 100) / 100;

    return {
      rateRatio,
      deltaT,
      exponent,
      gamma,
      explanationVI: `Theo định luật Van 't Hoff với hệ số nhiệt độ γ = ${gamma.toFixed(1)}: Khi tăng từ ${t1Celsius}°C lên ${t2Celsius}°C (ΔT = ${deltaT}°C), tốc độ phản ứng biến thiên ${rateRatio} lần (γ^(${exponent.toFixed(1)})).`
    };
  }

  /**
   * Catalyst effect: Lowering activation energy E_a
   * Arrhenius Equation: k = A * exp(-E_a / (RT))
   */
  static calculateCatalystSpeedup(eaOriginal_kJ: number, eaCatalyzed_kJ: number, tempKelvin: number = 298.15): CatalystKineticsResult {
    const R = 8.314; // J/(mol*K)
    const deltaEa_kJ = eaOriginal_kJ - eaCatalyzed_kJ;
    const deltaEa_J = deltaEa_kJ * 1000;
    const exponent = deltaEa_J / (R * tempKelvin);

    let speedupFactor: number;
    let speedupFormatted: string;

    if (exponent > 700) {
      speedupFactor = Number.POSITIVE_INFINITY;
      const log10Val = exponent / Math.LN10;
      const expInt = Math.floor(log10Val);
      const mantissa = Math.pow(10, log10Val - expInt);
      speedupFormatted = `${mantissa.toFixed(2)} × 10^${expInt}`;
    } else {
      speedupFactor = Math.exp(exponent);
      if (speedupFactor >= 1e9) {
        speedupFormatted = speedupFactor.toExponential(2);
      } else {
        speedupFormatted = Math.round(speedupFactor).toLocaleString();
      }
    }

    return {
      speedupFactor,
      speedupFormatted,
      deltaEa: deltaEa_kJ,
      deltaEa_kJ,
      eaOriginal_kJ,
      eaCatalyzed_kJ,
      tempKelvin,
      explanationVI: `Chất xúc tác làm giảm năng lượng hoạt hóa Eₐ từ ${eaOriginal_kJ} kJ/mol xuống ${eaCatalyzed_kJ} kJ/mol (giảm ${deltaEa_kJ} kJ/mol). Ở ${tempKelvin} K, tốc độ phản ứng tăng xấp xỉ ${speedupFormatted} lần.`
    };
  }
}
