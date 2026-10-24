// src/domain/vseprEngine.ts
// Gillespie-Nyholm Valence Shell Electron Pair Repulsion (VSEPR) Engine
// Strictly audited against Vietnam GDPT 2018 Grade 10 Chemistry & IUPAC Physical Chemistry

export type VseprGenericFormula =
  | 'AX2'
  | 'AX3'
  | 'AX2E1'
  | 'AX4'
  | 'AX3E1'
  | 'AX2E2'
  | 'AX5'
  | 'AX4E1'
  | 'AX3E2'
  | 'AX2E3'
  | 'AX6'
  | 'AX5E1'
  | 'AX4E2';

export type VseprHybridization = 'sp' | 'sp²' | 'sp³' | 'sp³d' | 'sp³d²';

export type ElectronDomainType = 'BONDING' | 'LONE_PAIR';

export interface VseprDomain3D {
  id: string;
  type: ElectronDomainType;
  label: string; // e.g. "H", "F", "Cl", "LP:1"
  // Unit vector coordinates on 3D sphere
  x: number;
  y: number;
  z: number;
  // Scaled 2D projected coordinates for SVG rendering
  px?: number;
  py?: number;
  depth?: number;
  isEquatorial?: boolean;
}

export interface VseprAngleData {
  betweenDomains: [string, string];
  idealAngleDeg: number;
  deformedAngleDeg: number;
  label: string;
  isEquatorial?: boolean;
}

export interface VseprGeometryDescriptor {
  formulaAXE: VseprGenericFormula;
  stericNumber: number;
  bondingPairs: number;
  lonePairs: number;
  electronDomainGeometryVI: string; // Cấu hình electron: Đường thẳng, Tam giác phẳng, Tứ diện...
  molecularShapeVI: string; // Dạng hình học phân tử: Tuyến tính, Góc cong, Chóp tam giác, Bập bênh...
  shapeEn: string;
  hybridization: VseprHybridization;
  idealBondAngleDeg: number;
  actualStandardAngleDeg: number;
  bondAngleFormulaText: string;
  isPolar: boolean;
  dipoleMomentText: string;
  pedagogicalNotesVI: string;
  curriculumExamples: string[];
}

export interface VseprMoleculePreset {
  id: string;
  formula: string;
  name_vi: string;
  name_en: string;
  formulaAXE: VseprGenericFormula;
  centralAtomSymbol: string;
  centralAtomNameVI: string;
  ligandSymbol: string;
  ligandNameVI: string;
  bondingPairs: number;
  lonePairs: number;
  defaultAngleDeg: number;
  repulsionCoefficient: number; // sensitivity to LP repulsion
  descriptionVI: string;
  tacticalBuff: {
    nameVI: string;
    descriptionVI: string;
    type: 'ACCURACY' | 'SHIELD' | 'PENETRATION' | 'HASTE';
    power: number;
  };
}

export const VSEPR_GEOMETRY_CATALOG: Record<VseprGenericFormula, VseprGeometryDescriptor> = {
  AX2: {
    formulaAXE: 'AX2',
    stericNumber: 2,
    bondingPairs: 2,
    lonePairs: 0,
    electronDomainGeometryVI: 'Đường thẳng (Linear)',
    molecularShapeVI: 'Đường thẳng (Linear)',
    shapeEn: 'Linear',
    hybridization: 'sp',
    idealBondAngleDeg: 180,
    actualStandardAngleDeg: 180,
    bondAngleFormulaText: '180°',
    isPolar: false,
    dipoleMomentText: 'μ = 0 D (Không cực)',
    pedagogicalNotesVI: '2 đám mây electron liên kết nằm đối diện nhau 180° để lực đẩy giữa chúng đạt cực tiểu. Phân tử đối xứng hoàn hảo.',
    curriculumExamples: ['BeCl₂', 'CO₂', 'HCN', 'C₂H₂']
  },
  AX3: {
    formulaAXE: 'AX3',
    stericNumber: 3,
    bondingPairs: 3,
    lonePairs: 0,
    electronDomainGeometryVI: 'Tam giác phẳng (Trigonal Planar)',
    molecularShapeVI: 'Tam giác phẳng (Trigonal Planar)',
    shapeEn: 'Trigonal Planar',
    hybridization: 'sp²',
    idealBondAngleDeg: 120,
    actualStandardAngleDeg: 120,
    bondAngleFormulaText: '120°',
    isPolar: false,
    dipoleMomentText: 'μ = 0 D (Không cực nếu 3 phối tử giống nhau)',
    pedagogicalNotesVI: '3 đám mây liên kết phân bố đối xứng về 3 đỉnh tam giác đều, góc 120°. Momen lưỡng cực triệt tiêu hoàn toàn.',
    curriculumExamples: ['BF₃', 'SO₃', 'AlCl₃', 'C₂H₄']
  },
  AX2E1: {
    formulaAXE: 'AX2E1',
    stericNumber: 3,
    bondingPairs: 2,
    lonePairs: 1,
    electronDomainGeometryVI: 'Tam giác phẳng (Trigonal Planar)',
    molecularShapeVI: 'Góc cong (Bent)',
    shapeEn: 'Bent',
    hybridization: 'sp²',
    idealBondAngleDeg: 120,
    actualStandardAngleDeg: 119,
    bondAngleFormulaText: '< 120° (~119°)',
    isPolar: true,
    dipoleMomentText: 'μ > 0 D (Phân cực)',
    pedagogicalNotesVI: '1 cặp electron tự do (LP) chiếm thể tích lớn hơn đám mây liên kết (BP), tạo lực đẩy LP-BP > BP-BP, ép góc O-S-O từ 120° xuống ~119°.',
    curriculumExamples: ['SO₂', 'O₃', 'NO₂⁻']
  },
  AX4: {
    formulaAXE: 'AX4',
    stericNumber: 4,
    bondingPairs: 4,
    lonePairs: 0,
    electronDomainGeometryVI: 'Tứ diện đều (Tetrahedral)',
    molecularShapeVI: 'Tứ diện đều (Tetrahedral)',
    shapeEn: 'Tetrahedral',
    hybridization: 'sp³',
    idealBondAngleDeg: 109.5,
    actualStandardAngleDeg: 109.5,
    bondAngleFormulaText: '109.5°',
    isPolar: false,
    dipoleMomentText: 'μ = 0 D (Không cực)',
    pedagogicalNotesVI: '4 liên kết hướng về 4 đỉnh của một hình tứ diện đều. Góc liên kết chuẩn acos(-1/3) ≈ 109.47°.',
    curriculumExamples: ['CH₄', 'CCl₄', 'SiH₄', 'NH₄⁺', 'SO₄²⁻']
  },
  AX3E1: {
    formulaAXE: 'AX3E1',
    stericNumber: 4,
    bondingPairs: 3,
    lonePairs: 1,
    electronDomainGeometryVI: 'Tứ diện (Tetrahedral)',
    molecularShapeVI: 'Chóp tam giác (Trigonal Pyramidal)',
    shapeEn: 'Trigonal Pyramidal',
    hybridization: 'sp³',
    idealBondAngleDeg: 109.5,
    actualStandardAngleDeg: 107.0,
    bondAngleFormulaText: '< 109.5° (107.0°)',
    isPolar: true,
    dipoleMomentText: 'μ = 1.47 D (Phân cực mạnh)',
    pedagogicalNotesVI: '1 cặp electron tự do trên đỉnh hình chóp đẩy 3 liên kết N-H lại gần nhau, góc giảm ~2.5° xuống 107.0°.',
    curriculumExamples: ['NH₃', 'NF₃', 'PCl₃', 'H₃O⁺']
  },
  AX2E2: {
    formulaAXE: 'AX2E2',
    stericNumber: 4,
    bondingPairs: 2,
    lonePairs: 2,
    electronDomainGeometryVI: 'Tứ diện (Tetrahedral)',
    molecularShapeVI: 'Góc cong (Bent)',
    shapeEn: 'Bent',
    hybridization: 'sp³',
    idealBondAngleDeg: 109.5,
    actualStandardAngleDeg: 104.5,
    bondAngleFormulaText: '<< 109.5° (104.5°)',
    isPolar: true,
    dipoleMomentText: 'μ = 1.85 D (Phân cực rất mạnh)',
    pedagogicalNotesVI: '2 cặp electron tự do đẩy nhau cực mạnh (LP-LP), đồng thời đẩy 2 liên kết O-H (LP-BP), ép góc liên kết xuống 104.5°.',
    curriculumExamples: ['H₂O', 'H₂S', 'OF₂', 'SCl₂']
  },
  AX5: {
    formulaAXE: 'AX5',
    stericNumber: 5,
    bondingPairs: 5,
    lonePairs: 0,
    electronDomainGeometryVI: 'Lưỡng chóp tam giác (Trigonal Bipyramidal)',
    molecularShapeVI: 'Lưỡng chóp tam giác (Trigonal Bipyramidal)',
    shapeEn: 'Trigonal Bipyramidal',
    hybridization: 'sp³d',
    idealBondAngleDeg: 90,
    actualStandardAngleDeg: 90,
    bondAngleFormulaText: '90° (trục-xích đạo), 120° (xích đạo), 180° (trục)',
    isPolar: false,
    dipoleMomentText: 'μ = 0 D (Không cực)',
    pedagogicalNotesVI: '3 liên kết xích đạo (equatorial) 120° và 2 liên kết trục (axial) 180°. Liên kết trục dài hơn liên kết xích đạo do chịu lực đẩy lớn hơn.',
    curriculumExamples: ['PCl₅', 'PF₅', 'AsF₅']
  },
  AX4E1: {
    formulaAXE: 'AX4E1',
    stericNumber: 5,
    bondingPairs: 4,
    lonePairs: 1,
    electronDomainGeometryVI: 'Lưỡng chóp tam giác (Trigonal Bipyramidal)',
    molecularShapeVI: 'Dạng cái bập bênh (Seesaw)',
    shapeEn: 'Seesaw',
    hybridization: 'sp³d',
    idealBondAngleDeg: 90,
    actualStandardAngleDeg: 102,
    bondAngleFormulaText: '< 120° (~102° xích đạo), < 180° (~173° trục)',
    isPolar: true,
    dipoleMomentText: 'μ > 0 D (Phân cực)',
    pedagogicalNotesVI: 'Quy tắc Gillespie-Nyholm: Cặp electron tự do LUÔN ưu tiên chiếm vị trí xích đạo (equatorial) để chỉ gặp 2 tương tác 90° thay vì 3 tương tác 90° nếu ở trục.',
    curriculumExamples: ['SF₄', 'SeF₄', 'TeCl₄']
  },
  AX3E2: {
    formulaAXE: 'AX3E2',
    stericNumber: 5,
    bondingPairs: 3,
    lonePairs: 2,
    electronDomainGeometryVI: 'Lưỡng chóp tam giác (Trigonal Bipyramidal)',
    molecularShapeVI: 'Dạng chữ T (T-shaped)',
    shapeEn: 'T-shaped',
    hybridization: 'sp³d',
    idealBondAngleDeg: 90,
    actualStandardAngleDeg: 87.5,
    bondAngleFormulaText: '< 90° (~87.5°), < 180° (~175°)',
    isPolar: true,
    dipoleMomentText: 'μ > 0 D (Phân cực)',
    pedagogicalNotesVI: 'Cả 2 cặp electron tự do đều chiếm vị trí xích đạo (góc 120° giữa chúng), đẩy 2 liên kết trục uốn cong nhẹ về phía liên kết xích đạo còn lại.',
    curriculumExamples: ['ClF₃', 'BrF₃', 'ICl₃']
  },
  AX2E3: {
    formulaAXE: 'AX2E3',
    stericNumber: 5,
    bondingPairs: 2,
    lonePairs: 3,
    electronDomainGeometryVI: 'Lưỡng chóp tam giác (Trigonal Bipyramidal)',
    molecularShapeVI: 'Đường thẳng (Linear)',
    shapeEn: 'Linear',
    hybridization: 'sp³d',
    idealBondAngleDeg: 180,
    actualStandardAngleDeg: 180,
    bondAngleFormulaText: '180°',
    isPolar: false,
    dipoleMomentText: 'μ = 0 D (Không cực)',
    pedagogicalNotesVI: 'Cả 3 cặp electron tự do nằm trên mặt phẳng xích đạo tạo tam giác đều đối xứng 120° triệt tiêu lực đẩy lẫn nhau, giữ 2 liên kết trục thẳng hàng 180°.',
    curriculumExamples: ['XeF₂', 'I₃⁻', 'IF₂⁻']
  },
  AX6: {
    formulaAXE: 'AX6',
    stericNumber: 6,
    bondingPairs: 6,
    lonePairs: 0,
    electronDomainGeometryVI: 'Bát diện đều (Octahedral)',
    molecularShapeVI: 'Bát diện đều (Octahedral)',
    shapeEn: 'Octahedral',
    hybridization: 'sp³d²',
    idealBondAngleDeg: 90,
    actualStandardAngleDeg: 90,
    bondAngleFormulaText: '90° & 180°',
    isPolar: false,
    dipoleMomentText: 'μ = 0 D (Không cực)',
    pedagogicalNotesVI: '6 liên kết đối xứng hoàn hảo hướng về 6 đỉnh của một hình bát diện đều. Mọi vị trí đều tương đương nhau.',
    curriculumExamples: ['SF₆', 'PF₆⁻', 'SiF₆²⁻', '[AlF₆]³⁻']
  },
  AX5E1: {
    formulaAXE: 'AX5E1',
    stericNumber: 6,
    bondingPairs: 5,
    lonePairs: 1,
    electronDomainGeometryVI: 'Bát diện (Octahedral)',
    molecularShapeVI: 'Chóp vuông (Square Pyramidal)',
    shapeEn: 'Square Pyramidal',
    hybridization: 'sp³d²',
    idealBondAngleDeg: 90,
    actualStandardAngleDeg: 84.8,
    bondAngleFormulaText: '< 90° (~84.8°)',
    isPolar: true,
    dipoleMomentText: 'μ > 0 D (Phân cực)',
    pedagogicalNotesVI: '1 cặp electron tự do ở 1 đỉnh bát diện đẩy 4 liên kết mặt đáy lên phía đỉnh đối diện, góc liên kết đáy-đỉnh giảm xuống ~84.8°.',
    curriculumExamples: ['BrF₅', 'IF₅', 'XeOF₄']
  },
  AX4E2: {
    formulaAXE: 'AX4E2',
    stericNumber: 6,
    bondingPairs: 4,
    lonePairs: 2,
    electronDomainGeometryVI: 'Bát diện (Octahedral)',
    molecularShapeVI: 'Vuông phẳng (Square Planar)',
    shapeEn: 'Square Planar',
    hybridization: 'sp³d²',
    idealBondAngleDeg: 90,
    actualStandardAngleDeg: 90,
    bondAngleFormulaText: '90° & 180°',
    isPolar: false,
    dipoleMomentText: 'μ = 0 D (Không cực)',
    pedagogicalNotesVI: '2 cặp electron tự do nằm ở 2 đỉnh đối diện nhau (trans 180°) để lực đẩy LP-LP cực tiểu. 4 liên kết nằm trên cùng một mặt phẳng vuông góc 90° hoàn hảo.',
    curriculumExamples: ['XeF₄', 'ICl₄⁻']
  }
};

export const VSEPR_BENCHMARK_PRESETS: VseprMoleculePreset[] = [
  {
    id: 'vsepr_h2o',
    formula: 'H₂O',
    name_vi: 'Nước (Water)',
    name_en: 'Water',
    formulaAXE: 'AX2E2',
    centralAtomSymbol: 'O',
    centralAtomNameVI: 'Oxygen',
    ligandSymbol: 'H',
    ligandNameVI: 'Hydrogen',
    bondingPairs: 2,
    lonePairs: 2,
    defaultAngleDeg: 104.5,
    repulsionCoefficient: 2.0,
    descriptionVI: '2 cặp electron tự do trên Oxy tạo lực đẩy mạnh nhất theo quy tắc Gillespie-Nyholm, ép góc H-O-H từ 109.5° xuống 104.5°.',
    tacticalBuff: {
      nameVI: 'Góc Cong Lưỡng Cực Nước',
      descriptionVI: 'Tăng 30% hiệu ứng làm chậm và sát thương phản xạ từ môi trường nước.',
      type: 'HASTE',
      power: 30
    }
  },
  {
    id: 'vsepr_nh3',
    formula: 'NH₃',
    name_vi: 'Ammonia',
    name_en: 'Ammonia',
    formulaAXE: 'AX3E1',
    centralAtomSymbol: 'N',
    centralAtomNameVI: 'Nitrogen',
    ligandSymbol: 'H',
    ligandNameVI: 'Hydrogen',
    bondingPairs: 3,
    lonePairs: 1,
    defaultAngleDeg: 107.0,
    repulsionCoefficient: 1.0,
    descriptionVI: '1 cặp electron tự do trên đỉnh chóp tam giác đẩy 3 liên kết N-H thu hẹp lại góc 107.0°.',
    tacticalBuff: {
      nameVI: 'Chóp Đỉnh Kiềm Hoá',
      descriptionVI: 'Giảm 25% giáp kẻ địch xung quanh khi tung chiêu mang gốc base.',
      type: 'PENETRATION',
      power: 25
    }
  },
  {
    id: 'vsepr_ch4',
    formula: 'CH₄',
    name_vi: 'Methane',
    name_en: 'Methane',
    formulaAXE: 'AX4',
    centralAtomSymbol: 'C',
    centralAtomNameVI: 'Carbon',
    ligandSymbol: 'H',
    ligandNameVI: 'Hydrogen',
    bondingPairs: 4,
    lonePairs: 0,
    defaultAngleDeg: 109.5,
    repulsionCoefficient: 0.0,
    descriptionVI: 'Không có cặp electron tự do (LP = 0). 4 liên kết C-H phân bố đối xứng hoàn hảo ở góc tứ diện 109.5°.',
    tacticalBuff: {
      nameVI: 'Tứ Diện Cân Bằng Tuyệt Đối',
      descriptionVI: 'Tăng 40 điểm Khiên bảo hộ không gian chống mọi sát thương bộc phát.',
      type: 'SHIELD',
      power: 40
    }
  },
  {
    id: 'vsepr_bf3',
    formula: 'BF₃',
    name_vi: 'Boron Trifluoride',
    name_en: 'Boron trifluoride',
    formulaAXE: 'AX3',
    centralAtomSymbol: 'B',
    centralAtomNameVI: 'Boron',
    ligandSymbol: 'F',
    ligandNameVI: 'Fluorine',
    bondingPairs: 3,
    lonePairs: 0,
    defaultAngleDeg: 120.0,
    repulsionCoefficient: 0.0,
    descriptionVI: '3 liên kết B-F đồng phẳng phân bố đều ở các góc 120°. Momen lưỡng cực triệt tiêu hoàn toàn.',
    tacticalBuff: {
      nameVI: 'Tam Giác Phẳng Hút Điện',
      descriptionVI: 'Hấp thụ 20% năng lượng ma thuật đối phương nhờ orbital trống.',
      type: 'ACCURACY',
      power: 20
    }
  },
  {
    id: 'vsepr_so2',
    formula: 'SO₂',
    name_vi: 'Sulfur Dioxide',
    name_en: 'Sulfur dioxide',
    formulaAXE: 'AX2E1',
    centralAtomSymbol: 'S',
    centralAtomNameVI: 'Sulfur',
    ligandSymbol: 'O',
    ligandNameVI: 'Oxygen',
    bondingPairs: 2,
    lonePairs: 1,
    defaultAngleDeg: 119.0,
    repulsionCoefficient: 1.0,
    descriptionVI: 'Lai hóa sp² với 1 cặp electron tự do trên Lưu huỳnh ép góc O-S-O từ 120° xuống xấp xỉ 119°.',
    tacticalBuff: {
      nameVI: 'Đám Mây Khí Chua Uốn Cong',
      descriptionVI: 'Tạo làn sương axit làm giảm 15% tốc độ tấn công của đối thủ.',
      type: 'HASTE',
      power: 15
    }
  },
  {
    id: 'vsepr_co2',
    formula: 'CO₂',
    name_vi: 'Carbon Dioxide',
    name_en: 'Carbon dioxide',
    formulaAXE: 'AX2',
    centralAtomSymbol: 'C',
    centralAtomNameVI: 'Carbon',
    ligandSymbol: 'O',
    ligandNameVI: 'Oxygen',
    bondingPairs: 2,
    lonePairs: 0,
    defaultAngleDeg: 180.0,
    repulsionCoefficient: 0.0,
    descriptionVI: 'Cấu trúc thẳng hàng 180° đối xứng tuyệt đối, hai liên kết C=O phân cực triệt tiêu nhau (μ = 0).',
    tacticalBuff: {
      nameVI: 'Tia Khí Thẳng Xuyên Thấu',
      descriptionVI: 'Tăng 35% sát thương định hướng thẳng hàng trên đường đạn.',
      type: 'PENETRATION',
      power: 35
    }
  },
  {
    id: 'vsepr_pcl5',
    formula: 'PCl₅',
    name_vi: 'Phosphorus Pentachloride',
    name_en: 'Phosphorus pentachloride',
    formulaAXE: 'AX5',
    centralAtomSymbol: 'P',
    centralAtomNameVI: 'Phosphorus',
    ligandSymbol: 'Cl',
    ligandNameVI: 'Chlorine',
    bondingPairs: 5,
    lonePairs: 0,
    defaultAngleDeg: 90.0,
    repulsionCoefficient: 0.0,
    descriptionVI: 'Lưỡng chóp tam giác sp³d với 3 phối tử xích đạo (120°) và 2 phối tử trục (90° so với xích đạo, 180° với nhau).',
    tacticalBuff: {
      nameVI: 'Lưỡng Chóp Không Gian Bát Hướng',
      descriptionVI: 'Mở rộng tầm quét tấn công thêm 50 đơn vị khoảng cách.',
      type: 'ACCURACY',
      power: 50
    }
  },
  {
    id: 'vsepr_sf4',
    formula: 'SF₄',
    name_vi: 'Sulfur Tetrafluoride',
    name_en: 'Sulfur tetrafluoride',
    formulaAXE: 'AX4E1',
    centralAtomSymbol: 'S',
    centralAtomNameVI: 'Sulfur',
    ligandSymbol: 'F',
    ligandNameVI: 'Fluorine',
    bondingPairs: 4,
    lonePairs: 1,
    defaultAngleDeg: 102.0,
    repulsionCoefficient: 1.5,
    descriptionVI: 'Hình cái bập bênh: Cặp electron tự do chiếm vị trí xích đạo ép góc F_eq-S-F_eq từ 120° xuống ~102° và F_ax-S-F_ax xuống ~173°.',
    tacticalBuff: {
      nameVI: 'Đòn Bẩy Bập Bênh',
      descriptionVI: 'Gây hiệu ứng hất tung 0.75s khi kích hoạt chiêu thức bập bênh.',
      type: 'PENETRATION',
      power: 45
    }
  },
  {
    id: 'vsepr_clf3',
    formula: 'ClF₃',
    name_vi: 'Chlorine Trifluoride',
    name_en: 'Chlorine trifluoride',
    formulaAXE: 'AX3E2',
    centralAtomSymbol: 'Cl',
    centralAtomNameVI: 'Chlorine',
    ligandSymbol: 'F',
    ligandNameVI: 'Fluorine',
    bondingPairs: 3,
    lonePairs: 2,
    defaultAngleDeg: 87.5,
    repulsionCoefficient: 2.0,
    descriptionVI: 'Hình chữ T: 2 cặp electron tự do xích đạo đẩy mạnh 2 liên kết trục uốn cong nhẹ về phía trước (~87.5°).',
    tacticalBuff: {
      nameVI: 'Mũi Gai Chữ T Siêu Ăn Mòn',
      descriptionVI: 'Bỏ qua 30% kháng phép và gây vết thương sâu không thể hồi máu trong 3s.',
      type: 'PENETRATION',
      power: 50
    }
  },
  {
    id: 'vsepr_sf6',
    formula: 'SF₆',
    name_vi: 'Sulfur Hexafluoride',
    name_en: 'Sulfur hexafluoride',
    formulaAXE: 'AX6',
    centralAtomSymbol: 'S',
    centralAtomNameVI: 'Sulfur',
    ligandSymbol: 'F',
    ligandNameVI: 'Fluorine',
    bondingPairs: 6,
    lonePairs: 0,
    defaultAngleDeg: 90.0,
    repulsionCoefficient: 0.0,
    descriptionVI: 'Bát diện đều sp³d²: 6 liên kết S-F đối xứng hoàn hảo ở các góc 90° và 180°, cực kỳ trơ về mặt hóa học.',
    tacticalBuff: {
      nameVI: 'Vỏ Bọc Bát Diện Trơ Điện',
      descriptionVI: 'Miễn nhiễm hoàn toàn với sát thương sốc điện và phóng điện trong 4 giây.',
      type: 'SHIELD',
      power: 60
    }
  },
  {
    id: 'vsepr_xef4',
    formula: 'XeF₄',
    name_vi: 'Xenon Tetrafluoride',
    name_en: 'Xenon tetrafluoride',
    formulaAXE: 'AX4E2',
    centralAtomSymbol: 'Xe',
    centralAtomNameVI: 'Xenon',
    ligandSymbol: 'F',
    ligandNameVI: 'Fluorine',
    bondingPairs: 4,
    lonePairs: 2,
    defaultAngleDeg: 90.0,
    repulsionCoefficient: 1.0,
    descriptionVI: 'Vuông phẳng: 2 cặp electron tự do ở 2 trục đối đỉnh triệt tiêu nhau, giữ 4 liên kết nằm phẳng ở góc 90°.',
    tacticalBuff: {
      nameVI: 'Lưới Vuông Phẳng Khí Hiếm',
      descriptionVI: 'Tạo vùng khóa vị trí 90° giữ chân kẻ địch trong 1.5 giây.',
      type: 'ACCURACY',
      power: 40
    }
  }
];

export class VseprEngine {
  /**
   * Determine AXnEm formula from bonding pairs (n) and lone pairs (m)
   */
  public static getAXEFormula(bondingPairs: number, lonePairs: number): VseprGenericFormula {
    const key = `AX${bondingPairs}${lonePairs > 0 ? `E${lonePairs}` : ''}`;
    if (key in VSEPR_GEOMETRY_CATALOG) {
      return key as VseprGenericFormula;
    }
    // Fallback safe mapping
    if (bondingPairs === 2 && lonePairs === 0) return 'AX2';
    if (bondingPairs === 3 && lonePairs === 0) return 'AX3';
    if (bondingPairs === 2 && lonePairs === 1) return 'AX2E1';
    if (bondingPairs === 4 && lonePairs === 0) return 'AX4';
    if (bondingPairs === 3 && lonePairs === 1) return 'AX3E1';
    if (bondingPairs === 2 && lonePairs === 2) return 'AX2E2';
    if (bondingPairs === 5 && lonePairs === 0) return 'AX5';
    if (bondingPairs === 4 && lonePairs === 1) return 'AX4E1';
    if (bondingPairs === 3 && lonePairs === 2) return 'AX3E2';
    if (bondingPairs === 2 && lonePairs === 3) return 'AX2E3';
    if (bondingPairs === 6 && lonePairs === 0) return 'AX6';
    if (bondingPairs === 5 && lonePairs === 1) return 'AX5E1';
    if (bondingPairs === 4 && lonePairs === 2) return 'AX4E2';

    return 'AX4';
  }

  /**
   * Calculate deformed bond angle based on Gillespie-Nyholm LP repulsion multiplier (0.0x to 2.0x)
   * Standard reality is repulsionMultiplier = 1.0.
   */
  public static calculateDeformedAngle(
    formulaAXE: VseprGenericFormula,
    repulsionMultiplier: number = 1.0
  ): {
    idealAngleDeg: number;
    actualAngleDeg: number;
    angleDeviationDeg: number;
    repulsionEnergyIndex: number;
    explanationVI: string;
  } {
    const geom = VSEPR_GEOMETRY_CATALOG[formulaAXE] || VSEPR_GEOMETRY_CATALOG.AX4;
    const ideal = geom.idealBondAngleDeg;
    let delta = 0;
    let lpFactor = geom.lonePairs;

    // Specific Gillespie-Nyholm parameters
    switch (formulaAXE) {
      case 'AX2E1': // SO2 (120 -> 119)
        delta = 1.0 * repulsionMultiplier;
        break;
      case 'AX3E1': // NH3 (109.5 -> 107.0)
        delta = 2.5 * repulsionMultiplier;
        break;
      case 'AX2E2': // H2O (109.5 -> 104.5)
        delta = 5.0 * repulsionMultiplier;
        break;
      case 'AX4E1': // SF4 eq (120 -> 102)
        delta = 18.0 * repulsionMultiplier;
        break;
      case 'AX3E2': // ClF3 (90 -> 87.5)
        delta = 2.5 * repulsionMultiplier;
        break;
      case 'AX5E1': // BrF5 (90 -> 84.8)
        delta = 5.2 * repulsionMultiplier;
        break;
      case 'AX2':
      case 'AX3':
      case 'AX4':
      case 'AX5':
      case 'AX6':
      case 'AX2E3': // linear cancellation
      case 'AX4E2': // square planar trans cancellation
      default:
        delta = 0;
        break;
    }

    const actualAngleDeg = Number(Math.max(60, ideal - delta).toFixed(1));
    const angleDeviationDeg = Number((ideal - actualAngleDeg).toFixed(1));

    // Electrostatic repulsion index: U = w_LP_LP * n_LP*(n_LP-1)/2 + w_LP_BP * n_LP * n_BP + w_BP_BP * n_BP*(n_BP-1)/2
    const nBP = geom.bondingPairs;
    const nLP = geom.lonePairs;
    const pairsLP_LP = (nLP * (nLP - 1)) / 2;
    const pairsLP_BP = nLP * nBP;
    const pairsBP_BP = (nBP * (nBP - 1)) / 2;
    // Gillespie weights: LP-LP (4.0) > LP-BP (2.2) > BP-BP (1.0)
    const repulsionEnergyIndex = Number(
      (pairsLP_LP * 4.0 * repulsionMultiplier +
       pairsLP_BP * 2.2 * repulsionMultiplier +
       pairsBP_BP * 1.0).toFixed(1)
    );

    let explanationVI = '';
    if (nLP === 0) {
      explanationVI = `Cấu hình ${geom.formulaAXE} không có cặp electron tự do (LP = 0). Các đám mây liên kết đối xứng hoàn hảo, góc liên kết giữ nguyên mức lý tưởng ${ideal}°.`;
    } else if (formulaAXE === 'AX2E3' || formulaAXE === 'AX4E2') {
      explanationVI = `Các cặp electron tự do phân bố đối xứng hoàn hảo (ở mặt phẳng xích đạo hoặc vị trí đối đỉnh trans 180°), các vectơ lực đẩy triệt tiêu nhau nên góc liên kết không bị biến dạng (${actualAngleDeg}°).`;
    } else {
      explanationVI = `Quy tắc Gillespie-Nyholm: ${nLP} cặp electron tự do (LP) tạo lực đẩy mạnh hơn liên kết (LP-BP > BP-BP), ép góc liên kết co lại ${angleDeviationDeg}° (từ ${ideal}° xuống ${actualAngleDeg}° với hệ số đẩy ${repulsionMultiplier.toFixed(2)}x).`;
    }

    return {
      idealAngleDeg: ideal,
      actualAngleDeg,
      angleDeviationDeg,
      repulsionEnergyIndex,
      explanationVI
    };
  }

  /**
   * Compute 3D unit coordinates for all electron domains (bonding pairs and lone pairs)
   * using spherical coordinates and Gillespie-Nyholm compressed angles.
   */
  public static generateDomainCoordinates3D(
    formulaAXE: VseprGenericFormula,
    repulsionMultiplier: number = 1.0
  ): VseprDomain3D[] {
    const geom = VSEPR_GEOMETRY_CATALOG[formulaAXE] || VSEPR_GEOMETRY_CATALOG.AX4;
    const { actualAngleDeg } = this.calculateDeformedAngle(formulaAXE, repulsionMultiplier);
    const thetaRad = (actualAngleDeg * Math.PI) / 180;
    const halfTheta = thetaRad / 2;

    const domains: VseprDomain3D[] = [];

    switch (formulaAXE) {
      case 'AX2': {
        // Linear along X axis
        domains.push({ id: 'bp-1', type: 'BONDING', label: 'X', x: -1, y: 0, z: 0 });
        domains.push({ id: 'bp-2', type: 'BONDING', label: 'X', x: 1, y: 0, z: 0 });
        break;
      }

      case 'AX3': {
        // Trigonal Planar (120° apart on XY plane)
        domains.push({ id: 'bp-1', type: 'BONDING', label: 'X', x: 0, y: 1, z: 0 });
        domains.push({
          id: 'bp-2',
          type: 'BONDING',
          label: 'X',
          x: Math.sin((2 * Math.PI) / 3),
          y: Math.cos((2 * Math.PI) / 3),
          z: 0
        });
        domains.push({
          id: 'bp-3',
          type: 'BONDING',
          label: 'X',
          x: -Math.sin((2 * Math.PI) / 3),
          y: Math.cos((2 * Math.PI) / 3),
          z: 0
        });
        break;
      }

      case 'AX2E1': {
        // Bent 119° with 1 LP on top (Y > 0)
        domains.push({ id: 'lp-1', type: 'LONE_PAIR', label: 'LP', x: 0, y: 1, z: 0 });
        domains.push({
          id: 'bp-1',
          type: 'BONDING',
          label: 'X',
          x: Math.sin(halfTheta),
          y: -Math.cos(halfTheta),
          z: 0
        });
        domains.push({
          id: 'bp-2',
          type: 'BONDING',
          label: 'X',
          x: -Math.sin(halfTheta),
          y: -Math.cos(halfTheta),
          z: 0
        });
        break;
      }

      case 'AX4': {
        // Tetrahedral (109.5°)
        // Invertible tetrahedron vertices
        const a = 1 / Math.sqrt(3);
        domains.push({ id: 'bp-1', type: 'BONDING', label: 'X', x: a, y: a, z: a });
        domains.push({ id: 'bp-2', type: 'BONDING', label: 'X', x: -a, y: -a, z: a });
        domains.push({ id: 'bp-3', type: 'BONDING', label: 'X', x: -a, y: a, z: -a });
        domains.push({ id: 'bp-4', type: 'BONDING', label: 'X', x: a, y: -a, z: -a });
        break;
      }

      case 'AX3E1': {
        // Trigonal Pyramidal (NH3): LP on top (+Y), 3 BP pointing down compressed by theta
        domains.push({ id: 'lp-1', type: 'LONE_PAIR', label: 'LP', x: 0, y: 1, z: 0 });
        // The angle between any two BPs is actualAngleDeg
        // Radius of base circle: r = 2 * sin(theta/2) / sqrt(3)
        // Since x^2 + z^2 + y^2 = 1, y = -cos(coneAngle)
        const coneAngle = Math.asin((2 / Math.sqrt(3)) * Math.sin(halfTheta));
        const yBase = -Math.cos(coneAngle);
        const rBase = Math.sin(coneAngle);

        for (let i = 0; i < 3; i++) {
          const phi = (i * 2 * Math.PI) / 3 - Math.PI / 2;
          domains.push({
            id: `bp-${i + 1}`,
            type: 'BONDING',
            label: 'X',
            x: rBase * Math.cos(phi),
            y: yBase,
            z: rBase * Math.sin(phi)
          });
        }
        break;
      }

      case 'AX2E2': {
        // Bent (H2O): 2 LPs above in YZ plane, 2 BPs below separated by actualAngleDeg
        // LP angle ~112° apart, BP angle = actualAngleDeg (104.5°)
        const lpAngle = Math.min(130, 109.5 + 2.5 * repulsionMultiplier);
        const halfLp = (lpAngle * Math.PI) / 360;

        domains.push({
          id: 'lp-1',
          type: 'LONE_PAIR',
          label: 'LP₁',
          x: 0,
          y: Math.cos(halfLp),
          z: Math.sin(halfLp)
        });
        domains.push({
          id: 'lp-2',
          type: 'LONE_PAIR',
          label: 'LP₂',
          x: 0,
          y: Math.cos(halfLp),
          z: -Math.sin(halfLp)
        });

        domains.push({
          id: 'bp-1',
          type: 'BONDING',
          label: 'X',
          x: Math.sin(halfTheta),
          y: -Math.cos(halfTheta),
          z: 0
        });
        domains.push({
          id: 'bp-2',
          type: 'BONDING',
          label: 'X',
          x: -Math.sin(halfTheta),
          y: -Math.cos(halfTheta),
          z: 0
        });
        break;
      }

      case 'AX5': {
        // Trigonal Bipyramidal: 2 axial (Y axis: +1, -1), 3 equatorial (XZ plane, 120°)
        domains.push({ id: 'bp-ax1', type: 'BONDING', label: 'X_ax', x: 0, y: 1, z: 0, isEquatorial: false });
        domains.push({ id: 'bp-ax2', type: 'BONDING', label: 'X_ax', x: 0, y: -1, z: 0, isEquatorial: false });
        for (let i = 0; i < 3; i++) {
          const phi = (i * 2 * Math.PI) / 3;
          domains.push({
            id: `bp-eq${i + 1}`,
            type: 'BONDING',
            label: 'X_eq',
            x: Math.cos(phi),
            y: 0,
            z: Math.sin(phi),
            isEquatorial: true
          });
        }
        break;
      }

      case 'AX4E1': {
        // Seesaw (SF4): 1 equatorial LP, 2 equatorial BP (compressed by theta), 2 axial BP (bent backward)
        domains.push({ id: 'lp-1', type: 'LONE_PAIR', label: 'LP', x: 1, y: 0, z: 0, isEquatorial: true });
        // 2 equatorial BPs compressed by actualAngleDeg
        const phi1 = Math.PI - halfTheta;
        const phi2 = Math.PI + halfTheta;
        domains.push({ id: 'bp-eq1', type: 'BONDING', label: 'X_eq', x: Math.cos(phi1), y: 0, z: Math.sin(phi1), isEquatorial: true });
        domains.push({ id: 'bp-eq2', type: 'BONDING', label: 'X_eq', x: Math.cos(phi2), y: 0, z: Math.sin(phi2), isEquatorial: true });
        // 2 axial BPs slightly bent away from LP (x < 0)
        const axialBend = (3.5 * repulsionMultiplier * Math.PI) / 180;
        domains.push({ id: 'bp-ax1', type: 'BONDING', label: 'X_ax', x: -Math.sin(axialBend), y: Math.cos(axialBend), z: 0, isEquatorial: false });
        domains.push({ id: 'bp-ax2', type: 'BONDING', label: 'X_ax', x: -Math.sin(axialBend), y: -Math.cos(axialBend), z: 0, isEquatorial: false });
        break;
      }

      case 'AX3E2': {
        // T-shaped (ClF3): 2 equatorial LPs at 120°, 1 equatorial BP, 2 axial BPs (tilted backward ~87.5°)
        domains.push({ id: 'lp-1', type: 'LONE_PAIR', label: 'LP₁', x: Math.cos((2 * Math.PI) / 3), y: 0, z: Math.sin((2 * Math.PI) / 3), isEquatorial: true });
        domains.push({ id: 'lp-2', type: 'LONE_PAIR', label: 'LP₂', x: Math.cos((4 * Math.PI) / 3), y: 0, z: Math.sin((4 * Math.PI) / 3), isEquatorial: true });
        domains.push({ id: 'bp-eq1', type: 'BONDING', label: 'X_eq', x: 1, y: 0, z: 0, isEquatorial: true });
        // Axial BPs compressed towards equatorial BP
        const axialTilt = ((90 - actualAngleDeg) * Math.PI) / 180;
        domains.push({ id: 'bp-ax1', type: 'BONDING', label: 'X_ax', x: Math.sin(axialTilt), y: Math.cos(axialTilt), z: 0, isEquatorial: false });
        domains.push({ id: 'bp-ax2', type: 'BONDING', label: 'X_ax', x: Math.sin(axialTilt), y: -Math.cos(axialTilt), z: 0, isEquatorial: false });
        break;
      }

      case 'AX2E3': {
        // Linear (XeF2): 3 equatorial LPs (120° in XZ), 2 axial BPs (+Y, -Y)
        for (let i = 0; i < 3; i++) {
          const phi = (i * 2 * Math.PI) / 3;
          domains.push({
            id: `lp-${i + 1}`,
            type: 'LONE_PAIR',
            label: `LP${i + 1}`,
            x: Math.cos(phi),
            y: 0,
            z: Math.sin(phi),
            isEquatorial: true
          });
        }
        domains.push({ id: 'bp-ax1', type: 'BONDING', label: 'X_ax', x: 0, y: 1, z: 0, isEquatorial: false });
        domains.push({ id: 'bp-ax2', type: 'BONDING', label: 'X_ax', x: 0, y: -1, z: 0, isEquatorial: false });
        break;
      }

      case 'AX6': {
        // Octahedral: ±X, ±Y, ±Z
        domains.push({ id: 'bp-1', type: 'BONDING', label: 'X', x: 1, y: 0, z: 0 });
        domains.push({ id: 'bp-2', type: 'BONDING', label: 'X', x: -1, y: 0, z: 0 });
        domains.push({ id: 'bp-3', type: 'BONDING', label: 'X', x: 0, y: 1, z: 0 });
        domains.push({ id: 'bp-4', type: 'BONDING', label: 'X', x: 0, y: -1, z: 0 });
        domains.push({ id: 'bp-5', type: 'BONDING', label: 'X', x: 0, y: 0, z: 1 });
        domains.push({ id: 'bp-6', type: 'BONDING', label: 'X', x: 0, y: 0, z: -1 });
        break;
      }

      case 'AX5E1': {
        // Square Pyramidal (BrF5): 1 LP at -Y, 1 BP at +Y, 4 basal BPs tilted upward towards +Y
        domains.push({ id: 'lp-1', type: 'LONE_PAIR', label: 'LP', x: 0, y: -1, z: 0 });
        domains.push({ id: 'bp-top', type: 'BONDING', label: 'X_apex', x: 0, y: 1, z: 0 });
        const basalTilt = ((90 - actualAngleDeg) * Math.PI) / 180;
        const yBase = Math.sin(basalTilt);
        const rBase = Math.cos(basalTilt);
        for (let i = 0; i < 4; i++) {
          const phi = (i * Math.PI) / 2;
          domains.push({
            id: `bp-base${i + 1}`,
            type: 'BONDING',
            label: 'X',
            x: rBase * Math.cos(phi),
            y: yBase,
            z: rBase * Math.sin(phi)
          });
        }
        break;
      }

      case 'AX4E2': {
        // Square Planar (XeF4): 2 LPs at +Y and -Y, 4 BPs at ±X and ±Z (90° in XZ plane)
        domains.push({ id: 'lp-1', type: 'LONE_PAIR', label: 'LP₁', x: 0, y: 1, z: 0 });
        domains.push({ id: 'lp-2', type: 'LONE_PAIR', label: 'LP₂', x: 0, y: -1, z: 0 });
        domains.push({ id: 'bp-1', type: 'BONDING', label: 'X', x: 1, y: 0, z: 0 });
        domains.push({ id: 'bp-2', type: 'BONDING', label: 'X', x: -1, y: 0, z: 0 });
        domains.push({ id: 'bp-3', type: 'BONDING', label: 'X', x: 0, y: 0, z: 1 });
        domains.push({ id: 'bp-4', type: 'BONDING', label: 'X', x: 0, y: 0, z: -1 });
        break;
      }
    }

    return domains;
  }

  /**
   * Projects 3D domain points onto a 2D SVG canvas with pitch and yaw rotations
   * Center is (0, 0), radius is bondLengthPx.
   */
  public static project3Dto2D(
    domains: VseprDomain3D[],
    yawDeg: number,
    pitchDeg: number,
    bondLengthPx: number = 90
  ): VseprDomain3D[] {
    const yawRad = (yawDeg * Math.PI) / 180;
    const pitchRad = (pitchDeg * Math.PI) / 180;
    const cosY = Math.cos(yawRad);
    const sinY = Math.sin(yawRad);
    const cosP = Math.cos(pitchRad);
    const sinP = Math.sin(pitchRad);

    return domains.map(d => {
      // 1. Rotate around Y axis (Yaw)
      const x1 = d.x * cosY + d.z * sinY;
      const y1 = d.y;
      const z1 = -d.x * sinY + d.z * cosY;

      // 2. Rotate around X axis (Pitch)
      const x2 = x1;
      const y2 = y1 * cosP - z1 * sinP;
      const z2 = y1 * sinP + z1 * cosP;

      // 3. Perspective factor
      const cameraDistance = 3.5;
      const perspective = cameraDistance / (cameraDistance - z2);

      return {
        ...d,
        px: Number((x2 * bondLengthPx * perspective).toFixed(2)),
        py: Number((-y2 * bondLengthPx * perspective).toFixed(2)), // SVG Y points down
        depth: Number(z2.toFixed(3))
      };
    });
  }

  /**
   * Normalize formula subscripts (e.g. H₂O -> H2O, NH₃ -> NH3)
   */
  public static normalizeFormula(str: string): string {
    const subscriptMap: Record<string, string> = {
      '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
      '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
    };
    return str.split('').map(c => subscriptMap[c] || c).join('').toUpperCase().trim();
  }

  /**
   * Look up preset by id, formula, or AXE notation with subscript normalization
   */
  public static getPreset(query: string): VseprMoleculePreset | undefined {
    const qNorm = this.normalizeFormula(query);
    return VSEPR_BENCHMARK_PRESETS.find(p => {
      const pIdNorm = this.normalizeFormula(p.id);
      const pFormulaNorm = this.normalizeFormula(p.formula);
      const pAxeNorm = this.normalizeFormula(p.formulaAXE);
      return (
        pIdNorm === qNorm ||
        pFormulaNorm === qNorm ||
        pAxeNorm === qNorm
      );
    });
  }
}
