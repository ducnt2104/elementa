// src/domain/crystallographyEngine.ts
// Comprehensive Crystallography, Unit Cells & Solid-State Chemistry Engine
// Conforming to Vietnam GDPT 2018 (Hóa học 10 Chương 3: Liên kết hóa học & Tinh thể) & IUPAC Standards

export type CrystalSystemType =
  | 'CUBIC'          // Lập phương (a = b = c, α = β = γ = 90°)
  | 'TETRAGONAL'      // Tứ phương (a = b ≠ c, α = β = γ = 90°)
  | 'ORTHORHOMBIC'    // Trực thoi (a ≠ b ≠ c, α = β = γ = 90°)
  | 'HEXAGONAL'       // Lục phương (a = b ≠ c, α = β = 90°, γ = 120°)
  | 'RHOMBOHEDRAL'    // Mặt thoi / Tam phương (a = b = c, α = β = γ ≠ 90°)
  | 'MONOCLINIC'      // Một nghiêng (a ≠ b ≠ c, α = γ = 90°, β ≠ 90°)
  | 'TRICLINIC';      // Ba nghiêng (a ≠ b ≠ c, α ≠ β ≠ γ ≠ 90°)

export type CubicLatticeType =
  | 'SIMPLE_CUBIC'        // SC (Lập phương đơn giản, 1 nguyên tử/ô)
  | 'BODY_CENTERED_CUBIC' // BCC (Lập phương tâm khối, 2 nguyên tử/ô)
  | 'FACE_CENTERED_CUBIC' // FCC / CCP (Lập phương tâm diện, 4 nguyên tử/ô)
  | 'HEXAGONAL_CLOSE_PACK'// HCP (Lục phương chặt khít, 2 nguyên tử/ô đơn vị, 6 nguyên tử/lăng trụ)
  | 'DIAMOND_CUBIC';      // Mạng kim cương (8 nguyên tử/ô)

export interface CrystalSystemDef {
  type: CrystalSystemType;
  nameVI: string;
  nameEN: string;
  axesRelationVI: string;
  anglesRelationVI: string;
  bravaisLatticeTypesVI: string[];
  characteristicSubstancesVI: string[];
  pedagogicalNotesVI: string;
}

export interface UnitCellPresetDef {
  id: string;
  nameVI: string;
  chemicalFormula: string;
  molarMassGmol: number;
  crystalSystem: CrystalSystemType;
  latticeType: CubicLatticeType | 'IONIC_ROCKSALT' | 'IONIC_CESIUM' | 'IONIC_ZINCBLENDE' | 'IONIC_FLUORITE';
  atomsOrFormulaUnitsPerCell: number; // Z
  coordinationNumber: number | string; // e.g. 6, 8, 12, or "6:6", "8:8"
  packingEfficiencyPercent: number; // APF %
  latticeEdgeA_pm: number; // a in picometers (pm = 10^-12 m)
  latticeEdgeC_pm?: number; // c in pm (for tetragonal/hexagonal)
  cationRadiusPm?: number; // for ionic
  anionRadiusPm?: number;
  atomicRadiusPm?: number; // for metallic/covalent
  densityTheoreticalGcm3: number;
  cleavagePlanesVI: string;
  mohsHardness: number;
  pedagogicalInsightVI: string;
  curriculumBenchmarkVI: string;
}

export const AVOGADRO_CONSTANT = 6.02214076e23; // mol^-1 (CODATA 2018)

// ==========================================
// 1. THE 7 CRYSTAL SYSTEMS (7 Hệ Tinh Thể)
// ==========================================
export const CRYSTAL_SYSTEMS: Record<CrystalSystemType, CrystalSystemDef> = {
  CUBIC: {
    type: 'CUBIC',
    nameVI: 'Hệ Lập Phương (Cubic)',
    nameEN: 'Cubic System',
    axesRelationVI: 'a = b = c',
    anglesRelationVI: 'α = β = γ = 90°',
    bravaisLatticeTypesVI: ['Đơn giản (P)', 'Tâm khối (I)', 'Tâm diện (F)'],
    characteristicSubstancesVI: ['NaCl', 'Cu', 'Fe (alpha)', 'Diamond', 'CsCl', 'Au'],
    pedagogicalNotesVI: 'Hệ có tính đối xứng cao nhất trong không gian 3 chiều với 3 trục đối xứng bậc 4, 4 trục bậc 3, 6 trục bậc 2 và 9 mặt đối xứng.'
  },
  TETRAGONAL: {
    type: 'TETRAGONAL',
    nameVI: 'Hệ Tứ Phương (Tetragonal)',
    nameEN: 'Tetragonal System',
    axesRelationVI: 'a = b ≠ c',
    anglesRelationVI: 'α = β = γ = 90°',
    bravaisLatticeTypesVI: ['Đơn giản (P)', 'Tâm khối (I)'],
    characteristicSubstancesVI: ['TiO2 (Rutile)', 'SnO2 (Cassiterite)', 'In (Indi)'],
    pedagogicalNotesVI: 'Hình lăng trụ đứng đáy vuông, kéo dài hoặc nén dọc theo trục c.'
  },
  ORTHORHOMBIC: {
    type: 'ORTHORHOMBIC',
    nameVI: 'Hệ Trực Thoi (Orthorhombic)',
    nameEN: 'Orthorhombic System',
    axesRelationVI: 'a ≠ b ≠ c',
    anglesRelationVI: 'α = β = γ = 90°',
    bravaisLatticeTypesVI: ['Đơn giản (P)', 'Tâm khối (I)', 'Tâm diện (F)', 'Tâm đáy (C)'],
    characteristicSubstancesVI: ['Lưu huỳnh tà phương (S alpha)', 'KNO3', 'BaSO4'],
    pedagogicalNotesVI: 'Hình hộp chữ nhật với 3 kích thước cạnh hoàn toàn khác nhau nhưng tất cả các góc đều vuông 90°.'
  },
  HEXAGONAL: {
    type: 'HEXAGONAL',
    nameVI: 'Hệ Lục Phương (Hexagonal)',
    nameEN: 'Hexagonal System',
    axesRelationVI: 'a = b ≠ c',
    anglesRelationVI: 'α = β = 90°, γ = 120°',
    bravaisLatticeTypesVI: ['Đơn giản (P)'],
    characteristicSubstancesVI: ['Mg', 'Zn', 'Graphite', 'SiO2 (Thạch anh)', 'Ice Ih (Nước đá)'],
    pedagogicalNotesVI: 'Đáy là hình thoi có góc 120° ghép thành lục giác đều, trục c vuông góc với mặt phẳng đáy.'
  },
  RHOMBOHEDRAL: {
    type: 'RHOMBOHEDRAL',
    nameVI: 'Hệ Mặt Thoi / Tam Phương (Trigonal)',
    nameEN: 'Rhombohedral / Trigonal System',
    axesRelationVI: 'a = b = c',
    anglesRelationVI: 'α = β = γ ≠ 90° (< 120°)',
    bravaisLatticeTypesVI: ['Đơn giản (R)'],
    characteristicSubstancesVI: ['CaCO3 (Calcite)', 'Al2O3 (Corundum)', 'Bi (Bismut)'],
    pedagogicalNotesVI: 'Tương đương một hình lập phương bị kéo dãn hoặc nén dọc theo một đường chéo thân.'
  },
  MONOCLINIC: {
    type: 'MONOCLINIC',
    nameVI: 'Hệ Một Nghiêng (Monoclinic)',
    nameEN: 'Monoclinic System',
    axesRelationVI: 'a ≠ b ≠ c',
    anglesRelationVI: 'α = γ = 90°, β ≠ 90°',
    bravaisLatticeTypesVI: ['Đơn giản (P)', 'Tâm đáy (C)'],
    characteristicSubstancesVI: ['Lưu huỳnh đơn tà (S beta)', 'Thạch cao sống (CaSO4·2H2O)', 'FeSO4·7H2O'],
    pedagogicalNotesVI: 'Có 2 góc vuông và một góc xiên β, mặt bên là các hình bình hành nghiêng.'
  },
  TRICLINIC: {
    type: 'TRICLINIC',
    nameVI: 'Hệ Ba Nghiêng (Triclinic)',
    nameEN: 'Triclinic System',
    axesRelationVI: 'a ≠ b ≠ c',
    anglesRelationVI: 'α ≠ β ≠ γ ≠ 90°',
    bravaisLatticeTypesVI: ['Đơn giản (P)'],
    characteristicSubstancesVI: ['CuSO4·5H2O (Phèn xanh)', 'K2Cr2O7', 'H3BO3'],
    pedagogicalNotesVI: 'Hệ có độ đối xứng thấp nhất, cả 3 cạnh và 3 góc đều không bằng nhau và không có góc vuông.'
  }
};

// ==========================================
// 2. CURRICULUM BENCHMARK CRYSTAL PRESETS
// GDPT 2018 Chemistry 10 & National Olympiad
// ==========================================
export const CURRICULUM_CRYSTAL_PRESETS: Record<string, UnitCellPresetDef> = {
  copper_fcc: {
    id: 'copper_fcc',
    nameVI: 'Đồng Kim Loại (Mạng Lập Phương Tâm Diện - FCC)',
    chemicalFormula: 'Cu',
    molarMassGmol: 63.546,
    crystalSystem: 'CUBIC',
    latticeType: 'FACE_CENTERED_CUBIC',
    atomsOrFormulaUnitsPerCell: 4, // 8 * (1/8) + 6 * (1/2) = 4
    coordinationNumber: 12,
    packingEfficiencyPercent: 74.05, // pi * sqrt(2) / 6
    latticeEdgeA_pm: 361.5, // 0.3615 nm
    atomicRadiusPm: 127.8, // a * sqrt(2) / 4
    densityTheoreticalGcm3: 8.94,
    cleavagePlanesVI: '{111} - Mặt xếp chặt khít nhất',
    mohsHardness: 3.0,
    pedagogicalInsightVI: 'Trong mạng FCC, các nguyên tử tiếp xúc trực tiếp dọc theo đường chéo mặt: 4r = a√2. Độ đặc khít đạt cực đại lý thuyết 74.05% theo giả thuyết Kepler.',
    curriculumBenchmarkVI: 'Hóa học 10 - Bài tập tính khối lượng riêng tinh thể kim loại (Chương 3).'
  },
  iron_alpha_bcc: {
    id: 'iron_alpha_bcc',
    nameVI: 'Sắt Ferrite Alpha (Mạng Lập Phương Tâm Khối - BCC)',
    chemicalFormula: 'Fe',
    molarMassGmol: 55.845,
    crystalSystem: 'CUBIC',
    latticeType: 'BODY_CENTERED_CUBIC',
    atomsOrFormulaUnitsPerCell: 2, // 8 * (1/8) + 1 = 2
    coordinationNumber: 8,
    packingEfficiencyPercent: 68.02, // pi * sqrt(3) / 8
    latticeEdgeA_pm: 286.6, // 0.2866 nm
    atomicRadiusPm: 124.1, // a * sqrt(3) / 4
    densityTheoreticalGcm3: 7.87,
    cleavagePlanesVI: '{100} và {110}',
    mohsHardness: 4.0,
    pedagogicalInsightVI: 'Trong mạng BCC, các nguyên tử chạm nhau dọc theo đường chéo thân của ô mạng: 4r = a√3. Sắt alpha tồn tại ổn định ở nhiệt độ phòng dưới 912°C.',
    curriculumBenchmarkVI: 'Hóa học 10 - Cấu trúc mạng tinh thể kim loại kiềm và kim loại chuyển tiếp nhóm B.'
  },
  polonium_alpha_sc: {
    id: 'polonium_alpha_sc',
    nameVI: 'Poloni Alpha (Mạng Lập Phương Đơn Giản - SC)',
    chemicalFormula: 'Po',
    molarMassGmol: 209.0,
    crystalSystem: 'CUBIC',
    latticeType: 'SIMPLE_CUBIC',
    atomsOrFormulaUnitsPerCell: 1, // 8 * (1/8) = 1
    coordinationNumber: 6,
    packingEfficiencyPercent: 52.36, // pi / 6
    latticeEdgeA_pm: 335.2,
    atomicRadiusPm: 167.6, // a / 2
    densityTheoreticalGcm3: 9.20,
    cleavagePlanesVI: '{100}',
    mohsHardness: 2.0,
    pedagogicalInsightVI: 'Poloni là nguyên tố duy nhất trong bảng tuần hoàn kết tinh theo mạng lập phương đơn giản ở điều kiện thường. Độ đặc khít chỉ đạt 52.36%, thể tích lỗ trống tới 47.64%.',
    curriculumBenchmarkVI: 'Hóa học 10 - So sánh độ đặc khít giữa các kiểu mạng tinh thể lập phương.'
  },
  carbon_diamond: {
    id: 'carbon_diamond',
    nameVI: 'Kim Cương (Mạng Tinh Thể Nguyên Tử Diamond)',
    chemicalFormula: 'C',
    molarMassGmol: 12.011,
    crystalSystem: 'CUBIC',
    latticeType: 'DIAMOND_CUBIC',
    atomsOrFormulaUnitsPerCell: 8, // 4 (FCC) + 4 (hốc tứ diện) = 8
    coordinationNumber: 4, // sp3 tetrahedral
    packingEfficiencyPercent: 34.01, // pi * sqrt(3) / 16
    latticeEdgeA_pm: 356.7,
    atomicRadiusPm: 77.2, // a * sqrt(3) / 8
    densityTheoreticalGcm3: 3.51,
    cleavagePlanesVI: '{111} - Cát khai hoàn toàn hình bát diện',
    mohsHardness: 10.0,
    pedagogicalInsightVI: 'Mặc dù độ đặc khít hình học chỉ là 34.01% (rất thoáng), nhưng nhờ mạng lưới liên kết cộng hóa trị tứ diện sp³ cực bền theo 3 chiều không gian, kim cương có độ cứng cao nhất tự nhiên.',
    curriculumBenchmarkVI: 'Hóa học 10 - Tinh thể nguyên tử và liên kết cộng hóa trị.'
  },
  sodium_chloride_rocksalt: {
    id: 'sodium_chloride_rocksalt',
    nameVI: 'Muối Ăn NaCl (Mạng Tinh Thể Ion Kiểu Halite / Rocksalt)',
    chemicalFormula: 'NaCl',
    molarMassGmol: 58.44,
    crystalSystem: 'CUBIC',
    latticeType: 'IONIC_ROCKSALT',
    atomsOrFormulaUnitsPerCell: 4, // 4 Na+ và 4 Cl-
    coordinationNumber: '6 : 6', // Na+ được bao quanh bởi 6 Cl- và ngược lại
    packingEfficiencyPercent: 66.8,
    latticeEdgeA_pm: 564.0, // a = 0.564 nm
    cationRadiusPm: 102.0, // r(Na+)
    anionRadiusPm: 181.0, // r(Cl-)
    densityTheoreticalGcm3: 2.165,
    cleavagePlanesVI: '{100} - Cát khai hoàn toàn hình lập phương',
    mohsHardness: 2.5,
    pedagogicalInsightVI: 'Ion Cl⁻ lớn tạo thành mạng lập phương tâm diện (FCC), ion Na⁺ nhỏ chui vào tất cả các hốc bát diện (tâm ô mạng và trung điểm 12 cạnh). Tiếp xúc cạnh: a = 2(r+ + r-).',
    curriculumBenchmarkVI: 'Hóa học 10 - Tinh thể ion (Chương 3: Liên kết ion).'
  },
  cesium_chloride: {
    id: 'cesium_chloride',
    nameVI: 'Xesi Clorua CsCl (Mạng Tinh Thể Ion Kiểu Lập Phương)',
    chemicalFormula: 'CsCl',
    molarMassGmol: 168.36,
    crystalSystem: 'CUBIC',
    latticeType: 'IONIC_CESIUM',
    atomsOrFormulaUnitsPerCell: 1, // 1 Cs+ và 1 Cl-
    coordinationNumber: '8 : 8',
    packingEfficiencyPercent: 68.3,
    latticeEdgeA_pm: 412.3,
    cationRadiusPm: 167.0, // r(Cs+)
    anionRadiusPm: 181.0, // r(Cl-)
    densityTheoreticalGcm3: 3.99,
    cleavagePlanesVI: '{110}',
    mohsHardness: 2.5,
    pedagogicalInsightVI: 'Do tỉ lệ bán kính r(Cs+)/r(Cl-) = 0.92 > 0.732, ion Cs⁺ quá lớn không thể ở trong hốc bát diện mà chuyển sang hốc lập phương tâm khối (phối trí 8:8). Tiếp xúc đường chéo thân: a√3 = 2(r+ + r-).',
    curriculumBenchmarkVI: 'Hóa học 10 & Bồi dưỡng HSG - Quy tắc tỉ số bán kính Pauling xác định số phối trí tinh thể ion.'
  },
  zinc_blende: {
    id: 'zinc_blende',
    nameVI: 'Sphalerite ZnS (Mạng Tinh Thể Zinc Blende)',
    chemicalFormula: 'ZnS',
    molarMassGmol: 97.47,
    crystalSystem: 'CUBIC',
    latticeType: 'IONIC_ZINCBLENDE',
    atomsOrFormulaUnitsPerCell: 4, // 4 Zn2+ và 4 S2-
    coordinationNumber: '4 : 4',
    packingEfficiencyPercent: 54.0,
    latticeEdgeA_pm: 541.0,
    cationRadiusPm: 74.0, // Zn2+
    anionRadiusPm: 184.0, // S2-
    densityTheoreticalGcm3: 4.09,
    cleavagePlanesVI: '{110}',
    mohsHardness: 3.5,
    pedagogicalInsightVI: 'S²⁻ tạo mạng FCC, Zn²⁺ chiếm 4 trong số 8 hốc tứ diện đan xen luân phiên (tương tự vị trí của các nguyên tử trong kim cương). Tiếp xúc: a√3/4 = r+ + r-.',
    curriculumBenchmarkVI: 'Hóa học 10 & Chuyên Hóa - Tinh thể bán dẫn nhóm II-VI.'
  },
  calcium_fluorite: {
    id: 'calcium_fluorite',
    nameVI: 'Fluorite CaF2 (Mạng Tinh Thể Huỳnh Thạch)',
    chemicalFormula: 'CaF2',
    molarMassGmol: 78.07,
    crystalSystem: 'CUBIC',
    latticeType: 'IONIC_FLUORITE',
    atomsOrFormulaUnitsPerCell: 4, // 4 Ca2+ và 8 F-
    coordinationNumber: '8 : 4', // Ca2+ phối trí 8, F- phối trí 4
    packingEfficiencyPercent: 62.4,
    latticeEdgeA_pm: 546.3,
    cationRadiusPm: 100.0, // Ca2+
    anionRadiusPm: 133.0, // F-
    densityTheoreticalGcm3: 3.18,
    cleavagePlanesVI: '{111} - Cát khai bát diện hoàn hảo',
    mohsHardness: 4.0,
    pedagogicalInsightVI: 'Ca²⁺ tạo mạng lập phương tâm diện (FCC), F⁻ chiếm trọn vẹn cả 8 hốc tứ diện bên trong ô mạng. Số phối trí của Ca²⁺ là 8, còn F⁻ là 4 thỏa mãn tỉ lệ hóa học 1:2.',
    curriculumBenchmarkVI: 'Hóa học 10 & Chuyên Hóa - Tinh thể ion AB2.'
  }
};

// ==========================================
// 3. QUANTITATIVE PHYSICAL CALCULATORS
// ==========================================

/**
 * Calculates theoretical density of a crystal unit cell
 * ρ = (Z * M) / (N_A * V_cell)
 * a in picometers (pm = 10^-10 cm), V_cell = (a * 10^-10)^3 cm^3
 */
export function calculateCrystalDensity(
  molarMassGmol: number,
  atomsOrUnitsPerCellZ: number,
  latticeEdgeA_pm: number,
  latticeEdgeC_pm?: number
): {
  densityGcm3: number;
  unitCellVolumeCm3: number;
  unitCellVolumePm3: number;
  interpretationVI: string;
} {
  if (molarMassGmol <= 0 || atomsOrUnitsPerCellZ <= 0 || latticeEdgeA_pm <= 0) {
    throw new Error('Các thông số khối lượng mol, số nguyên tử và hằng số mạng phải lớn hơn 0.');
  }

  // Volume in pm^3
  let volumePm3: number;
  if (latticeEdgeC_pm && latticeEdgeC_pm > 0) {
    // Tetragonal / Hexagonal prism
    volumePm3 = latticeEdgeA_pm * latticeEdgeA_pm * latticeEdgeC_pm;
  } else {
    // Cubic
    volumePm3 = Math.pow(latticeEdgeA_pm, 3);
  }

  // 1 pm = 10^-10 cm => 1 pm^3 = 10^-30 cm^3
  const volumeCm3 = volumePm3 * 1e-30;

  // Mass of unit cell in grams = (Z * M) / N_A
  const massCellGrams = (atomsOrUnitsPerCellZ * molarMassGmol) / AVOGADRO_CONSTANT;

  // Density = mass / volume (g/cm^3)
  const density = massCellGrams / volumeCm3;
  const densityGcm3 = Math.round(density * 1000) / 1000;

  return {
    densityGcm3,
    unitCellVolumeCm3: Number(volumeCm3.toExponential(4)),
    unitCellVolumePm3: Math.round(volumePm3),
    interpretationVI: `Mỗi ô mạng cơ sở chứa ${atomsOrUnitsPerCellZ} phân tử/nguyên tử với thể tích ${volumePm3.toLocaleString()} pm³ (${volumeCm3.toExponential(2)} cm³), tạo ra khối lượng riêng lý thuyết ρ = ${densityGcm3} g/cm³.`
  };
}

/**
 * Calculates Lattice Constant a from Atomic Radius r
 */
export function calculateLatticeConstantFromRadius(
  radiusPm: number,
  latticeType: CubicLatticeType
): {
  latticeEdgeA_pm: number;
  formulaVI: string;
} {
  if (radiusPm <= 0) {
    throw new Error('Bán kính nguyên tử phải lớn hơn 0.');
  }

  let edge: number;
  let formulaVI: string;

  switch (latticeType) {
    case 'SIMPLE_CUBIC':
      edge = 2 * radiusPm;
      formulaVI = 'a = 2r';
      break;
    case 'BODY_CENTERED_CUBIC':
      edge = (4 * radiusPm) / Math.sqrt(3);
      formulaVI = 'a = 4r / √3';
      break;
    case 'FACE_CENTERED_CUBIC':
    case 'HEXAGONAL_CLOSE_PACK':
      edge = (4 * radiusPm) / Math.sqrt(2);
      formulaVI = 'a = 4r / √2 = 2√2r';
      break;
    case 'DIAMOND_CUBIC':
      edge = (8 * radiusPm) / Math.sqrt(3);
      formulaVI = 'a = 8r / √3';
      break;
  }

  return {
    latticeEdgeA_pm: Math.round(edge * 100) / 100,
    formulaVI
  };
}

/**
 * Calculates Atomic Radius r from Lattice Constant a
 */
export function calculateAtomicRadiusFromLatticeConstant(
  edgeA_pm: number,
  latticeType: CubicLatticeType
): {
  radiusPm: number;
  formulaVI: string;
} {
  if (edgeA_pm <= 0) {
    throw new Error('Hằng số mạng a phải lớn hơn 0.');
  }

  let radius: number;
  let formulaVI: string;

  switch (latticeType) {
    case 'SIMPLE_CUBIC':
      radius = edgeA_pm / 2;
      formulaVI = 'r = a / 2';
      break;
    case 'BODY_CENTERED_CUBIC':
      radius = (edgeA_pm * Math.sqrt(3)) / 4;
      formulaVI = 'r = a√3 / 4';
      break;
    case 'FACE_CENTERED_CUBIC':
    case 'HEXAGONAL_CLOSE_PACK':
      radius = (edgeA_pm * Math.sqrt(2)) / 4;
      formulaVI = 'r = a√2 / 4';
      break;
    case 'DIAMOND_CUBIC':
      radius = (edgeA_pm * Math.sqrt(3)) / 8;
      formulaVI = 'r = a√3 / 8';
      break;
  }

  return {
    radiusPm: Math.round(radius * 100) / 100,
    formulaVI
  };
}

/**
 * Calculates Atomic Packing Factor (APF / Độ đặc khít %)
 * P = (V_atoms / V_cell) * 100%
 */
export function calculateAtomicPackingFactor(latticeType: CubicLatticeType): {
  apfPercent: number;
  voidSpacePercent: number;
  derivationVI: string;
} {
  let apf: number;
  let derivationVI: string;

  switch (latticeType) {
    case 'SIMPLE_CUBIC':
      apf = (Math.PI / 6) * 100; // ~52.36%
      derivationVI = 'P = (1 × (4/3)πr³) / (2r)³ = π / 6 ≈ 52.36%';
      break;
    case 'BODY_CENTERED_CUBIC':
      apf = ((Math.PI * Math.sqrt(3)) / 8) * 100; // ~68.02%
      derivationVI = 'P = (2 × (4/3)πr³) / (4r/√3)³ = π√3 / 8 ≈ 68.02%';
      break;
    case 'FACE_CENTERED_CUBIC':
    case 'HEXAGONAL_CLOSE_PACK':
      apf = ((Math.PI * Math.sqrt(2)) / 6) * 100; // ~74.05%
      derivationVI = 'P = (4 × (4/3)πr³) / (2√2r)³ = π√2 / 6 ≈ 74.05% (Giới hạn cực đại Kepler)';
      break;
    case 'DIAMOND_CUBIC':
      apf = ((Math.PI * Math.sqrt(3)) / 16) * 100; // ~34.01%
      derivationVI = 'P = (8 × (4/3)πr³) / (8r/√3)³ = π√3 / 16 ≈ 34.01%';
      break;
  }

  const apfPercent = Math.round(apf * 100) / 100;
  const voidSpacePercent = Math.round((100 - apfPercent) * 100) / 100;

  return {
    apfPercent,
    voidSpacePercent,
    derivationVI
  };
}

/**
 * Calculates Bragg's Law of X-ray Diffraction (XRD)
 * n * λ = 2 * d_hkl * sin(θ)
 * For cubic systems: d_hkl = a / sqrt(h^2 + k^2 + l^2)
 */
export function calculateBraggDiffraction(
  wavelengthPm: number,
  h: number,
  k: number,
  l: number,
  latticeEdgeA_pm: number,
  orderN: number = 1
): {
  interplanarDistancePm: number;
  thetaDegrees: number;
  twoThetaDegrees: number;
  millerIndicesDisplay: string;
  isDiffractionPossible: boolean;
} {
  if (wavelengthPm <= 0 || latticeEdgeA_pm <= 0 || orderN <= 0) {
    throw new Error('Bước sóng, cạnh ô mạng và bậc nhiễu xạ phải lớn hơn 0.');
  }

  const sumSquares = h * h + k * k + l * l;
  if (sumSquares === 0) {
    throw new Error('Chỉ số Miller (hkl) không thể đồng thời bằng 0.');
  }

  // Interplanar distance d = a / sqrt(h^2 + k^2 + l^2)
  const d_hkl = latticeEdgeA_pm / Math.sqrt(sumSquares);

  // sin(theta) = (n * lambda) / (2 * d_hkl)
  const sinTheta = (orderN * wavelengthPm) / (2 * d_hkl);

  if (sinTheta > 1.0) {
    return {
      interplanarDistancePm: Math.round(d_hkl * 100) / 100,
      thetaDegrees: 0,
      twoThetaDegrees: 0,
      millerIndicesDisplay: `(${h} ${k} ${l})`,
      isDiffractionPossible: false
    };
  }

  const thetaRad = Math.asin(sinTheta);
  const thetaDeg = (thetaRad * 180) / Math.PI;
  const twoThetaDeg = thetaDeg * 2;

  return {
    interplanarDistancePm: Math.round(d_hkl * 100) / 100,
    thetaDegrees: Math.round(thetaDeg * 100) / 100,
    twoThetaDegrees: Math.round(twoThetaDeg * 100) / 100,
    millerIndicesDisplay: `(${h} ${k} ${l})`,
    isDiffractionPossible: true
  };
}

/**
 * Matches a card or chemical formula to an appropriate crystal lattice preset
 */
export function getMatchingCrystalPreset(cardIdOrFormula: string): UnitCellPresetDef | null {
  const norm = cardIdOrFormula.trim().toLowerCase();

  // Copper
  if (norm.includes('cu') || norm === 'copper' || norm === 'dong') {
    return CURRICULUM_CRYSTAL_PRESETS.copper_fcc;
  }

  // Iron
  if (norm.includes('fe') || norm === 'iron' || norm === 'sat') {
    return CURRICULUM_CRYSTAL_PRESETS.iron_alpha_bcc;
  }

  // Polonium
  if (norm.includes('po') || norm === 'polonium') {
    return CURRICULUM_CRYSTAL_PRESETS.polonium_alpha_sc;
  }

  // Diamond / Carbon
  if (norm.includes('diamond') || norm.includes('kim_cuong') || norm === 'c' || norm === 'carbon') {
    return CURRICULUM_CRYSTAL_PRESETS.carbon_diamond;
  }

  // NaCl
  if (norm.includes('nacl') || norm.includes('salt') || norm.includes('muoi_an') || norm.includes('halite')) {
    return CURRICULUM_CRYSTAL_PRESETS.sodium_chloride_rocksalt;
  }

  // CsCl
  if (norm.includes('cscl') || norm.includes('cs') || norm.includes('cesium') || norm.includes('xesi')) {
    return CURRICULUM_CRYSTAL_PRESETS.cesium_chloride;
  }

  // ZnS
  if (norm.includes('zns') || norm.includes('sphalerite') || norm.includes('kem_sunfua')) {
    return CURRICULUM_CRYSTAL_PRESETS.zinc_blende;
  }

  // CaF2
  if (norm.includes('caf2') || norm.includes('fluorite') || norm.includes('huynh_thach')) {
    return CURRICULUM_CRYSTAL_PRESETS.calcium_fluorite;
  }

  // General alkali metals (BCC)
  if (norm === 'na' || norm === 'k' || norm === 'li' || norm.includes('kali') || norm.includes('natri')) {
    return CURRICULUM_CRYSTAL_PRESETS.iron_alpha_bcc;
  }

  // General noble metals (FCC)
  if (norm === 'ag' || norm === 'au' || norm === 'al' || norm === 'pt' || norm.includes('bac') || norm.includes('vang') || norm.includes('nhom')) {
    return CURRICULUM_CRYSTAL_PRESETS.copper_fcc;
  }

  return null;
}
