// src/domain/bondingEngine.ts
// Chemical Bonding Engine (Liên Kết Hóa Học & Cấu Trúc Phân Tử)
// Strictly audited against Vietnam GDPT 2018 Chemistry Grade 10 & IUPAC standards

export type BondType = 'IONIC' | 'POLAR_COVALENT' | 'NONPOLAR_COVALENT';

export type VseprShape =
  | 'LINEAR'
  | 'BENT'
  | 'TRIGONAL_PLANAR'
  | 'TRIGONAL_PYRAMIDAL'
  | 'TETRAHEDRAL'
  | 'CRYSTAL_LATTICE'
  | 'TRIGONAL_BIPYRAMIDAL'
  | 'OCTAHEDRAL';

export interface VseprData {
  shape: VseprShape;
  bondAngle: string;
  stericNumber: number;
  hybridization: 'sp' | 'sp²' | 'sp³' | 'sp³d' | 'sp³d²' | 'none';
  centralAtom: string;
  centralAtomSymbol: string;
  ligands: { symbol: string; count: number; name_vi: string }[];
  lonePairsOnCentral: number;
  bondingPairs: number;
  dipoleMomentNet: '0 D (Không cực)' | 'Phân cực (> 0 D)';
}

export interface BondParticipant {
  symbol: string;
  name_vi: string;
  electronegativity: number;
  valenceElectrons: number;
  electronsContributed: number;
  formalCharge?: number;
}

export interface CanonicalBondingModel {
  id: string;
  formula: string;
  name_vi: string;
  name_iupac: string;
  bondType: BondType;
  deltaChi: number; // Electronegativity difference |chi_A - chi_B|
  descriptionVI: string;
  formationMechanismVI: string;
  lewisRepresentation: string; // e.g. "H : H", "Na⁺ [ :Cl: ]⁻"
  sharedPairsCount: number;
  lonePairsCount: number;
  bondOrder: 1 | 2 | 3; // Single, Double, Triple
  geometryVI: string; // Tuyến tính, Góc cong, Tứ diện...
  vsepr?: VseprData;
  gameplayModifier: {
    buffNameVI: string;
    descriptionVI: string;
    statType: 'DEF_SHIELD' | 'TENACITY' | 'COOLDOWN_HASTE' | 'BURST_ATTACK';
    magnitude: number;
  };
}

// Canonical curriculum database of representative bonds
export const CANONICAL_BONDING_DATABASE: CanonicalBondingModel[] = [
  {
    id: 'bond_nacl',
    formula: 'NaCl',
    name_vi: 'Muối Ăn (Sodium Chloride)',
    name_iupac: 'Sodium chloride',
    bondType: 'IONIC',
    deltaChi: 2.23, // |3.16 - 0.93|
    descriptionVI: 'Liên kết ion điển hình giữa kim loại kiềm mạnh (Na) và phi kim halogen mạnh (Cl).',
    formationMechanismVI: 'Nguyên tử Na nhường 1e lớp ngoài cùng (3s¹) tạo cation Na⁺ ([Ne]), nguyên tử Cl nhận 1e vào phân lớp 3p tạo anion Cl⁻ ([Ar]). Hai ion trái dấu hút nhau bằng lực hút tĩnh điện mạnh mẽ hình thành mạng tinh thể lập phương.',
    lewisRepresentation: 'Na⁺ [ :Cl::: ]⁻',
    sharedPairsCount: 0,
    lonePairsCount: 4,
    bondOrder: 1,
    geometryVI: 'Mạng tinh thể lập phương tâm diện (Face-centered cubic)',
    vsepr: {
      shape: 'CRYSTAL_LATTICE',
      bondAngle: '90° (Lập phương)',
      stericNumber: 6,
      hybridization: 'none',
      centralAtom: 'Sodium cation (Na⁺)',
      centralAtomSymbol: 'Na⁺',
      ligands: [{ symbol: 'Cl⁻', count: 6, name_vi: 'Chloride anion' }],
      lonePairsOnCentral: 0,
      bondingPairs: 6,
      dipoleMomentNet: 'Phân cực (> 0 D)'
    },
    gameplayModifier: {
      buffNameVI: 'Mạng Tinh Thể Ion Bền Vững',
      descriptionVI: 'Tăng 35 Giáp và Kháng Phép nhờ lực hút tĩnh điện bền chặt.',
      statType: 'DEF_SHIELD',
      magnitude: 35
    }
  },
  {
    id: 'bond_mgo',
    formula: 'MgO',
    name_vi: 'Magnesium Oxide',
    name_iupac: 'Magnesium oxide',
    bondType: 'IONIC',
    deltaChi: 2.13, // |3.44 - 1.31|
    descriptionVI: 'Liên kết ion đa hóa trị siêu bền nhiệt độ nóng chảy lên tới 2852°C.',
    formationMechanismVI: 'Mg nhường 2e tạo cation Mg²⁺, O nhận 2e tạo anion O²⁻. Điện tích 2+ và 2- tạo lực hút tĩnh điện gấp nhiều lần so với NaCl.',
    lewisRepresentation: 'Mg²⁺ [ :O::: ]²⁻',
    sharedPairsCount: 0,
    lonePairsCount: 4,
    bondOrder: 1,
    geometryVI: 'Mạng tinh thể bát diện chịu nhiệt cao',
    vsepr: {
      shape: 'CRYSTAL_LATTICE',
      bondAngle: '90° (Bát diện)',
      stericNumber: 6,
      hybridization: 'none',
      centralAtom: 'Magnesium cation (Mg²⁺)',
      centralAtomSymbol: 'Mg²⁺',
      ligands: [{ symbol: 'O²⁻', count: 6, name_vi: 'Oxide anion' }],
      lonePairsOnCentral: 0,
      bondingPairs: 6,
      dipoleMomentNet: 'Phân cực (> 0 D)'
    },
    gameplayModifier: {
      buffNameVI: 'Khiên Chống Cháy Siêu Bền',
      descriptionVI: 'Miễn nhiễm 50% sát thương cháy và DoT ăn mòn.',
      statType: 'DEF_SHIELD',
      magnitude: 50
    }
  },
  {
    id: 'bond_h2',
    formula: 'H₂',
    name_vi: 'Khí Hydrogen',
    name_iupac: 'Dihydrogen',
    bondType: 'NONPOLAR_COVALENT',
    deltaChi: 0.00, // |2.20 - 2.20|
    descriptionVI: 'Liên kết cộng hóa trị đơn không phân cực giữa 2 nguyên tử cùng loại.',
    formationMechanismVI: 'Mỗi nguyên tử H góp chung 1 electron độc thân (1s¹) tạo thành 1 đôi electron dùng chung, cả hai đều đạt cấu hình duet bền vững giống khí hiếm Helium.',
    lewisRepresentation: 'H : H (H—H)',
    sharedPairsCount: 1,
    lonePairsCount: 0,
    bondOrder: 1,
    geometryVI: 'Đường thẳng (Tuyến tính)',
    vsepr: {
      shape: 'LINEAR',
      bondAngle: '180°',
      stericNumber: 1,
      hybridization: 'none',
      centralAtom: 'Hydrogen (H)',
      centralAtomSymbol: 'H',
      ligands: [{ symbol: 'H', count: 1, name_vi: 'Hydrogen' }],
      lonePairsOnCentral: 0,
      bondingPairs: 1,
      dipoleMomentNet: '0 D (Không cực)'
    },
    gameplayModifier: {
      buffNameVI: 'Nhẹ Tựa Khí H₂',
      descriptionVI: 'Tăng 15% tốc độ di chuyển trên đấu trường.',
      statType: 'COOLDOWN_HASTE',
      magnitude: 15
    }
  },
  {
    id: 'bond_o2',
    formula: 'O₂',
    name_vi: 'Khí Oxygen',
    name_iupac: 'Dioxygen',
    bondType: 'NONPOLAR_COVALENT',
    deltaChi: 0.00, // |3.44 - 3.44|
    descriptionVI: 'Liên kết cộng hóa trị đôi không phân cực (1 liên kết σ và 1 liên kết π).',
    formationMechanismVI: 'Mỗi nguyên tử Oxygen có 6e hóa trị, góp chung 2 electron độc thân để tạo thành 2 đôi electron dùng chung, cả hai đều đạt octet 8e.',
    lewisRepresentation: ':O:: : :O:: (O = O)',
    sharedPairsCount: 2,
    lonePairsCount: 4,
    bondOrder: 2,
    geometryVI: 'Tuyến tính (Linear)',
    vsepr: {
      shape: 'LINEAR',
      bondAngle: '180°',
      stericNumber: 3,
      hybridization: 'sp²',
      centralAtom: 'Oxygen (O)',
      centralAtomSymbol: 'O',
      ligands: [{ symbol: 'O', count: 1, name_vi: 'Oxygen' }],
      lonePairsOnCentral: 2,
      bondingPairs: 2,
      dipoleMomentNet: '0 D (Không cực)'
    },
    gameplayModifier: {
      buffNameVI: 'Kích Hoạt Oxy Hóa Mạnh',
      descriptionVI: 'Tăng 25 Sức mạnh công kích cho chiêu thức kế tiếp.',
      statType: 'BURST_ATTACK',
      magnitude: 25
    }
  },
  {
    id: 'bond_n2',
    formula: 'N₂',
    name_vi: 'Khí Nitrogen',
    name_iupac: 'Dinitrogen',
    bondType: 'NONPOLAR_COVALENT',
    deltaChi: 0.00, // |3.04 - 3.04|
    descriptionVI: 'Liên kết cộng hóa trị ba siêu bền (1 liên kết σ và 2 liên kết π) với năng lượng liên kết 945 kJ/mol.',
    formationMechanismVI: 'Mỗi nguyên tử Nitrogen góp 3 electron độc thân tạo thành 3 cặp electron dùng chung (liên kết ba N≡N), làm cho phân tử N₂ cực kỳ trơ ở nhiệt độ phòng.',
    lewisRepresentation: ':N ::: N: (N ≡ N)',
    sharedPairsCount: 3,
    lonePairsCount: 2,
    bondOrder: 3,
    geometryVI: 'Tuyến tính (Linear)',
    vsepr: {
      shape: 'LINEAR',
      bondAngle: '180°',
      stericNumber: 2,
      hybridization: 'sp',
      centralAtom: 'Nitrogen (N)',
      centralAtomSymbol: 'N',
      ligands: [{ symbol: 'N', count: 1, name_vi: 'Nitrogen' }],
      lonePairsOnCentral: 1,
      bondingPairs: 3,
      dipoleMomentNet: '0 D (Không cực)'
    },
    gameplayModifier: {
      buffNameVI: 'Liên Kết Ba Bất Diệt',
      descriptionVI: 'Tăng 40% kháng hiệu ứng khống chế (Tenacity).',
      statType: 'TENACITY',
      magnitude: 40
    }
  },
  {
    id: 'bond_hcl',
    formula: 'HCl',
    name_vi: 'Hydrogen Chloride',
    name_iupac: 'Hydrogen chloride',
    bondType: 'POLAR_COVALENT',
    deltaChi: 0.96, // |3.16 - 2.20|
    descriptionVI: 'Liên kết cộng hóa trị có cực, đôi electron dùng chung lệch về phía nguyên tử Chlorine.',
    formationMechanismVI: 'Do độ âm điện của Cl (3.16) lớn hơn H (2.20), đôi electron dùng chung bị hút lệch mạnh về phía Chlorine làm Cl mang điện tích âm một phần (δ⁻) và H mang điện tích dương một phần (δ⁺).',
    lewisRepresentation: 'H : Cl::: (H — Cl)',
    sharedPairsCount: 1,
    lonePairsCount: 3,
    bondOrder: 1,
    geometryVI: 'Tuyến tính phân cực',
    vsepr: {
      shape: 'LINEAR',
      bondAngle: '180°',
      stericNumber: 4,
      hybridization: 'sp³',
      centralAtom: 'Chlorine (Cl)',
      centralAtomSymbol: 'Cl',
      ligands: [{ symbol: 'H', count: 1, name_vi: 'Hydrogen' }],
      lonePairsOnCentral: 3,
      bondingPairs: 1,
      dipoleMomentNet: 'Phân cực (> 0 D)'
    },
    gameplayModifier: {
      buffNameVI: 'Xuyên Giáp Axit',
      descriptionVI: 'Bỏ qua 20% kháng phép của mục tiêu.',
      statType: 'BURST_ATTACK',
      magnitude: 20
    }
  },
  {
    id: 'bond_h2o',
    formula: 'H₂O',
    name_vi: 'Nước (Water)',
    name_iupac: 'Oxidane',
    bondType: 'POLAR_COVALENT',
    deltaChi: 1.24, // |3.44 - 2.20|
    descriptionVI: 'Phân tử góc cong 104.5° với 2 liên kết cộng hóa trị có cực và 2 cặp electron tự do trên Oxy.',
    formationMechanismVI: 'Oxygen dùng 2 electron độc thân tạo 2 liên kết đơn với 2 nguyên tử H. Hai cặp electron chưa liên kết chiếm không gian đẩy 2 liên kết O—H thu hẹp góc từ 109.5° xuống 104.5°, tạo momen lưỡng cực lớn và khả năng tạo liên kết hydrogen liên phân tử phong phú.',
    lewisRepresentation: 'H : O::: : H',
    sharedPairsCount: 2,
    lonePairsCount: 2,
    bondOrder: 1,
    geometryVI: 'Góc cong (Bent 104.5°)',
    vsepr: {
      shape: 'BENT',
      bondAngle: '104.5°',
      stericNumber: 4,
      hybridization: 'sp³',
      centralAtom: 'Oxygen (O)',
      centralAtomSymbol: 'O',
      ligands: [{ symbol: 'H', count: 2, name_vi: 'Hydrogen' }],
      lonePairsOnCentral: 2,
      bondingPairs: 2,
      dipoleMomentNet: 'Phân cực (> 0 D)'
    },
    gameplayModifier: {
      buffNameVI: 'Mạng Lưới Liên Kết Hydrogen',
      descriptionVI: 'Hồi phục 40 HP mỗi 5 giây khi đứng trên sông nước H₂O.',
      statType: 'DEF_SHIELD',
      magnitude: 40
    }
  },
  {
    id: 'bond_co2',
    formula: 'CO₂',
    name_vi: 'Carbon Dioxide',
    name_iupac: 'Carbon dioxide',
    bondType: 'POLAR_COVALENT',
    deltaChi: 0.89, // |3.44 - 2.55|
    descriptionVI: 'Phân tử thẳng 180°: Liên kết C=O phân cực nhưng phân tử tổng thể không phân cực (μ = 0).',
    formationMechanismVI: 'Carbon lai hóa sp tạo 2 liên kết đôi với 2 nguyên tử Oxygen (O=C=O). Hai vectơ momen lưỡng cực của 2 liên kết C=O hướng ngược chiều nhau 180° triệt tiêu lẫn nhau hoàn toàn.',
    lewisRepresentation: ':O:: = C = ::O:',
    sharedPairsCount: 4,
    lonePairsCount: 4,
    bondOrder: 2,
    geometryVI: 'Đường thẳng đối xứng (Linear 180°)',
    vsepr: {
      shape: 'LINEAR',
      bondAngle: '180°',
      stericNumber: 2,
      hybridization: 'sp',
      centralAtom: 'Carbon (C)',
      centralAtomSymbol: 'C',
      ligands: [{ symbol: 'O', count: 2, name_vi: 'Oxygen' }],
      lonePairsOnCentral: 0,
      bondingPairs: 4,
      dipoleMomentNet: '0 D (Không cực)'
    },
    gameplayModifier: {
      buffNameVI: 'Khí Dập Tắt Lửa',
      descriptionVI: 'Giải trừ trạng thái thiêu đốt cho bản thân và đồng minh xung quanh.',
      statType: 'DEF_SHIELD',
      magnitude: 30
    }
  },
  {
    id: 'bond_bf3',
    formula: 'BF₃',
    name_vi: 'Boron Trifluoride',
    name_iupac: 'Trifluoroborane',
    bondType: 'POLAR_COVALENT',
    deltaChi: 1.94, // |3.98 - 2.04|
    descriptionVI: 'Phân tử tam giác phẳng 120° đối xứng, liên kết B—F phân cực mạnh nhưng phân tử không phân cực (μ = 0). Boron đạt 6e octet chưa bão hòa (Lewis acid).',
    formationMechanismVI: 'Boron lai hóa sp² tạo 3 liên kết B—F hướng về 3 đỉnh của tam giác đều với góc 120°. Ba vectơ lưỡng cực triệt tiêu hoàn toàn. Orbital 2p trống của B sẵn sàng nhận đôi e tự do để tạo liên kết cho - nhận.',
    lewisRepresentation: 'F : B(:F) : F',
    sharedPairsCount: 3,
    lonePairsCount: 9,
    bondOrder: 1,
    geometryVI: 'Tam giác phẳng đối xứng (Trigonal Planar 120°)',
    vsepr: {
      shape: 'TRIGONAL_PLANAR',
      bondAngle: '120°',
      stericNumber: 3,
      hybridization: 'sp²',
      centralAtom: 'Boron (B)',
      centralAtomSymbol: 'B',
      ligands: [{ symbol: 'F', count: 3, name_vi: 'Fluorine' }],
      lonePairsOnCentral: 0,
      bondingPairs: 3,
      dipoleMomentNet: '0 D (Không cực)'
    },
    gameplayModifier: {
      buffNameVI: 'Axit Lewis Hút Electron',
      descriptionVI: 'Hấp thụ 30% sát thương kỹ năng năng lượng của đối thủ trong 4 giây.',
      statType: 'DEF_SHIELD',
      magnitude: 30
    }
  },
  {
    id: 'bond_nh3',
    formula: 'NH₃',
    name_vi: 'Ammonia',
    name_iupac: 'Azane',
    bondType: 'POLAR_COVALENT',
    deltaChi: 0.84, // |3.04 - 2.20|
    descriptionVI: 'Phân tử chóp tam giác 107° với 1 cặp electron tự do trên đỉnh.',
    formationMechanismVI: 'Nitrogen lai hóa sp³ tạo 3 liên kết N—H và giữ lại 1 cặp e chưa liên kết trên đỉnh chóp, dễ dàng nhận proton H⁺ thể hiện tính base yếu.',
    lewisRepresentation: 'H : N(:) : H (: H)',
    sharedPairsCount: 3,
    lonePairsCount: 1,
    bondOrder: 1,
    geometryVI: 'Hình chóp tam giác (Trigonal Pyramidal 107°)',
    vsepr: {
      shape: 'TRIGONAL_PYRAMIDAL',
      bondAngle: '107°',
      stericNumber: 4,
      hybridization: 'sp³',
      centralAtom: 'Nitrogen (N)',
      centralAtomSymbol: 'N',
      ligands: [{ symbol: 'H', count: 3, name_vi: 'Hydrogen' }],
      lonePairsOnCentral: 1,
      bondingPairs: 3,
      dipoleMomentNet: 'Phân cực (> 0 D)'
    },
    gameplayModifier: {
      buffNameVI: 'Hơi Cay Khí Kiềm',
      descriptionVI: 'Làm giảm 25% độ chính xác công kích của kẻ địch xung quanh.',
      statType: 'TENACITY',
      magnitude: 25
    }
  },
  {
    id: 'bond_ch4',
    formula: 'CH₄',
    name_vi: 'Methane',
    name_iupac: 'Methane',
    bondType: 'NONPOLAR_COVALENT',
    deltaChi: 0.35, // |2.55 - 2.20| < 0.4
    descriptionVI: 'Phân tử tứ diện đều 109.5° hoàn hảo, liên kết C—H không phân cực.',
    formationMechanismVI: 'Carbon lai hóa sp³ tạo 4 orbital lai hóa hướng về 4 đỉnh của hình tứ diện đều, xen phủ trục với 4 nguyên tử H tạo 4 liên kết σ cực kỳ bền vững.',
    lewisRepresentation: 'H : C(:H)(:H) : H',
    sharedPairsCount: 4,
    lonePairsCount: 0,
    bondOrder: 1,
    geometryVI: 'Tứ diện đều (Tetrahedral 109.5°)',
    vsepr: {
      shape: 'TETRAHEDRAL',
      bondAngle: '109.5°',
      stericNumber: 4,
      hybridization: 'sp³',
      centralAtom: 'Carbon (C)',
      centralAtomSymbol: 'C',
      ligands: [{ symbol: 'H', count: 4, name_vi: 'Hydrogen' }],
      lonePairsOnCentral: 0,
      bondingPairs: 4,
      dipoleMomentNet: '0 D (Không cực)'
    },
    gameplayModifier: {
      buffNameVI: 'Nhiên Liệu Khí Cháy Sạch',
      descriptionVI: 'Tăng 20% sát thương bộc phá khi kích hoạt phản ứng cháy.',
      statType: 'BURST_ATTACK',
      magnitude: 20
    }
  },
  {
    id: 'bond_so2',
    formula: 'SO₂',
    name_vi: 'Sulfur Dioxide',
    name_iupac: 'Sulfur dioxide',
    bondType: 'POLAR_COVALENT',
    deltaChi: 0.86, // |3.44 - 2.58|
    descriptionVI: 'Phân tử góc cong 119° do 1 cặp electron tự do trên Lưu huỳnh đẩy 2 liên kết S—O, tạo momen lưỡng cực phân cực.',
    formationMechanismVI: 'Nguyên tử Sulfur lai hóa sp² tạo 2 liên kết với 2 nguyên tử Oxygen (cấu trúc cộng hưởng giữa liên kết đôi S=O và liên kết phối trí S→O) và mang 1 cặp electron tự do ở đỉnh, thu hẹp góc liên kết từ 120° xuống xấp xỉ 119°.',
    lewisRepresentation: 'O = S(:) → O ↔ O ← S(:) = O',
    sharedPairsCount: 3,
    lonePairsCount: 6,
    bondOrder: 2,
    geometryVI: 'Góc cong (Bent 119°)',
    vsepr: {
      shape: 'BENT',
      bondAngle: '119°',
      stericNumber: 3,
      hybridization: 'sp²',
      centralAtom: 'Sulfur (S)',
      centralAtomSymbol: 'S',
      ligands: [{ symbol: 'O', count: 2, name_vi: 'Oxygen' }],
      lonePairsOnCentral: 1,
      bondingPairs: 3,
      dipoleMomentNet: 'Phân cực (> 0 D)'
    },
    gameplayModifier: {
      buffNameVI: 'Mưa Axit Khí SO₂',
      descriptionVI: 'Tạo vùng ăn mòn làm giảm 20% Giáp và gây DoT độc tố.',
      statType: 'BURST_ATTACK',
      magnitude: 20
    }
  },
  {
    id: 'bond_c2h4',
    formula: 'C₂H₄',
    name_vi: 'Ethylene (Ethene)',
    name_iupac: 'Ethene',
    bondType: 'NONPOLAR_COVALENT',
    deltaChi: 0.35, // C-H (0.35) & C=C (0.00)
    descriptionVI: 'Phân tử phẳng đồng phẳng với liên kết đôi C=C (1 liên kết σ và 1 liên kết π) và 4 liên kết C—H với góc xấp xỉ 120°.',
    formationMechanismVI: 'Cả 2 nguyên tử Carbon đều ở trạng thái lai hóa sp², mỗi Carbon tạo 1 liên kết σ C—C và 2 liên kết σ C—H. Hai orbital 2p không lai hóa xen phủ bên tạo liên kết π kém bền, dễ tham gia phản ứng cộng đặc trưng của anken.',
    lewisRepresentation: 'H₂C = CH₂',
    sharedPairsCount: 6,
    lonePairsCount: 0,
    bondOrder: 2,
    geometryVI: 'Mặt phẳng tam giác (Planar 120°)',
    vsepr: {
      shape: 'TRIGONAL_PLANAR',
      bondAngle: '120°',
      stericNumber: 3,
      hybridization: 'sp²',
      centralAtom: 'Carbon (C)',
      centralAtomSymbol: 'C',
      ligands: [
        { symbol: 'CH₂', count: 1, name_vi: 'Nhóm Methylene' },
        { symbol: 'H', count: 2, name_vi: 'Hydrogen' }
      ],
      lonePairsOnCentral: 0,
      bondingPairs: 4,
      dipoleMomentNet: '0 D (Không cực)'
    },
    gameplayModifier: {
      buffNameVI: 'Xúc Tác Trùng Hợp Polymer',
      descriptionVI: 'Tăng 25% tốc độ đánh và hồi chiêu cho các kỹ năng hữu cơ.',
      statType: 'COOLDOWN_HASTE',
      magnitude: 25
    }
  },
  {
    id: 'bond_c2h2',
    formula: 'C₂H₂',
    name_vi: 'Acetylene (Ethyne)',
    name_iupac: 'Ethyne',
    bondType: 'NONPOLAR_COVALENT',
    deltaChi: 0.35, // C-H (0.35) & C≡C (0.00)
    descriptionVI: 'Phân tử đường thẳng 180° với liên kết ba C≡C (1 liên kết σ và 2 liên kết π mật độ electron cao hình trụ bao quanh trục liên kết).',
    formationMechanismVI: 'Mỗi nguyên tử Carbon ở trạng thái lai hóa sp tạo liên kết σ C—C và liên kết σ C—H theo góc 180°. Hai cặp orbital 2p không lai hóa xen phủ bên theo 2 mặt phẳng vuông góc tạo 2 liên kết π, nhiệt cháy cực cao lên tới 3000°C trong ngọn lửa đèn xì oxy-axetilen.',
    lewisRepresentation: 'H — C ≡ C — H',
    sharedPairsCount: 5,
    lonePairsCount: 0,
    bondOrder: 3,
    geometryVI: 'Đường thẳng (Linear 180°)',
    vsepr: {
      shape: 'LINEAR',
      bondAngle: '180°',
      stericNumber: 2,
      hybridization: 'sp',
      centralAtom: 'Carbon (C)',
      centralAtomSymbol: 'C',
      ligands: [
        { symbol: 'CH', count: 1, name_vi: 'Nhóm Methine' },
        { symbol: 'H', count: 1, name_vi: 'Hydrogen' }
      ],
      lonePairsOnCentral: 0,
      bondingPairs: 4,
      dipoleMomentNet: '0 D (Không cực)'
    },
    gameplayModifier: {
      buffNameVI: 'Ngọn Lửa Hàn Đèn Xì 3000°C',
      descriptionVI: 'Tăng 35 Sức mạnh công kích nhiệt bộc phá thiêu đốt giáp kẻ thù.',
      statType: 'BURST_ATTACK',
      magnitude: 35
    }
  }
];

export class BondingEngine {
  /**
   * Classify bond type based on Pauling electronegativity difference
   */
  public static classifyBondByDeltaChi(chiA: number, chiB: number): {
    deltaChi: number;
    bondType: BondType;
    labelVI: string;
    descriptionVI: string;
  } {
    const deltaChi = Math.abs(Number((chiA - chiB).toFixed(2)));

    if (deltaChi < 0.4) {
      return {
        deltaChi,
        bondType: 'NONPOLAR_COVALENT',
        labelVI: 'Liên kết Cộng hóa trị không phân cực',
        descriptionVI: 'Đôi electron dùng chung nằm đối xứng ở giữa hai nguyên tử do hiệu độ âm điện không đáng kể (Δχ < 0.4).'
      };
    } else if (deltaChi < 1.7) {
      return {
        deltaChi,
        bondType: 'POLAR_COVALENT',
        labelVI: 'Liên kết Cộng hóa trị có phân cực',
        descriptionVI: 'Đôi electron dùng chung bị hút lệch mạnh về phía nguyên tử có độ âm điện lớn hơn (0.4 ≤ Δχ < 1.7).'
      };
    } else {
      return {
        deltaChi,
        bondType: 'IONIC',
        labelVI: 'Liên kết Ion',
        descriptionVI: 'Sự chênh lệch độ âm điện rất lớn (Δχ ≥ 1.7) dẫn đến sự nhường và nhận electron hoàn toàn tạo ra cation và anion hút nhau bằng lực tĩnh điện.'
      };
    }
  }

  /**
   * Normalize subscripts (e.g. N₂ -> N2, H₂O -> H2O)
   */
  public static normalizeFormula(str: string): string {
    const subscriptMap: Record<string, string> = {
      '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
      '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
    };
    return str.split('').map(c => subscriptMap[c] || c).join('').toUpperCase().trim();
  }

  /**
   * Look up canonical model by formula or id
   */
  public static getBondingModel(query: string): CanonicalBondingModel | undefined {
    const qNorm = this.normalizeFormula(query);
    return CANONICAL_BONDING_DATABASE.find(b => {
      const idNorm = this.normalizeFormula(b.id);
      const formulaNorm = this.normalizeFormula(b.formula);
      return (
        idNorm === qNorm ||
        formulaNorm === qNorm ||
        b.id.toUpperCase() === query.trim().toUpperCase() ||
        b.formula === query.trim()
      );
    });
  }

  /**
   * Check if a pair of elements can form an ionic bond based on metal-nonmetal nature and deltaChi
   */
  public static isIonicBondFeasible(
    elementA: { symbol: string; category: string; chi: number | null },
    elementB: { symbol: string; category: string; chi: number | null }
  ): boolean {
    if (elementA.chi === null || elementB.chi === null) return false;
    const delta = Math.abs(elementA.chi - elementB.chi);
    const isOneMetal = elementA.category.includes('METAL') && !elementA.category.includes('NONMETAL');
    const isOtherNonMetal = elementB.category === 'NONMETAL' || elementB.category === 'HALOGEN';

    const isOtherMetal = elementB.category.includes('METAL') && !elementB.category.includes('NONMETAL');
    const isOneNonMetal = elementA.category === 'NONMETAL' || elementA.category === 'HALOGEN';

    return delta >= 1.7 || (isOneMetal && isOtherNonMetal) || (isOtherMetal && isOneNonMetal);
  }

  /**
   * Predict VSEPR molecular geometry, hybridization and bond angle from steric number and lone pairs
   */
  public static predictVseprGeometry(stericNumber: number, lonePairs: number): {
    shape: VseprShape;
    hybridization: 'sp' | 'sp²' | 'sp³' | 'sp³d' | 'sp³d²' | 'none';
    bondAngle: string;
    descriptionVI: string;
  } {
    if (stericNumber === 2 && lonePairs === 0) {
      return {
        shape: 'LINEAR',
        hybridization: 'sp',
        bondAngle: '180°',
        descriptionVI: 'Lai hóa sp: 2 đám mây liên kết đối xứng 180° triệt tiêu lực đẩy, cấu trúc thẳng hàng.'
      };
    }

    if (stericNumber === 3) {
      if (lonePairs === 0) {
        return {
          shape: 'TRIGONAL_PLANAR',
          hybridization: 'sp²',
          bondAngle: '120°',
          descriptionVI: 'Lai hóa sp²: 3 liên kết đồng phẳng phân bố đều ở các góc 120° tam giác đều.'
        };
      }
      return {
        shape: 'BENT',
        hybridization: 'sp²',
        bondAngle: '< 120° (~119°)',
        descriptionVI: 'Lai hóa sp²: 1 cặp e tự do đẩy mạnh 2 liên kết, co góc liên kết xuống < 120° (như SO₂).'
      };
    }

    if (stericNumber === 4) {
      if (lonePairs === 0) {
        return {
          shape: 'TETRAHEDRAL',
          hybridization: 'sp³',
          bondAngle: '109.5°',
          descriptionVI: 'Lai hóa sp³ lý tưởng: 4 liên kết hướng về 4 đỉnh hình tứ diện đều, góc 109.5° (như CH₄).'
        };
      }
      if (lonePairs === 1) {
        return {
          shape: 'TRIGONAL_PYRAMIDAL',
          hybridization: 'sp³',
          bondAngle: '107°',
          descriptionVI: 'Lai hóa sp³: 1 cặp e tự do chiếm thể tích lớn hơn, ép 3 liên kết lại còn 107° (như NH₃).'
        };
      }
      return {
        shape: 'BENT',
        hybridization: 'sp³',
        bondAngle: '104.5°',
        descriptionVI: 'Lai hóa sp³: 2 cặp e tự do tạo lực đẩy cực đại, ép góc liên kết xuống 104.5° (như H₂O).'
      };
    }

    if (stericNumber === 5) {
      return {
        shape: 'TRIGONAL_BIPYRAMIDAL',
        hybridization: 'sp³d',
        bondAngle: '90°, 120°, 180°',
        descriptionVI: 'Lai hóa sp³d: Bát diện mở rộng gồm 3 liên kết xích đạo 120° và 2 liên kết trục 180° (như PCl₅).'
      };
    }

    if (stericNumber === 6) {
      return {
        shape: 'OCTAHEDRAL',
        hybridization: 'sp³d²',
        bondAngle: '90°',
        descriptionVI: 'Lai hóa sp³d²: 6 liên kết phân bố đối xứng hoàn hảo về 6 đỉnh hình bát diện đều góc 90° (như SF₆).'
      };
    }

    return {
      shape: 'LINEAR',
      hybridization: 'none',
      bondAngle: '180°',
      descriptionVI: 'Cấu trúc tuyến tính đơn giản.'
    };
  }

  /**
   * Predicts net molecular polarity and dipole moment vector cancellation
   * Based on VSEPR molecular geometry, ligand identity, and central atom lone pairs.
   * Conforms strictly to GDPT 2018 Chemistry Grade 10: "Phân tử phân cực và không phân cực".
   */
  static predictMolecularPolarity(
    shape: VseprShape,
    ligands: { symbol: string; count: number }[],
    lonePairs: number
  ): {
    isPolar: boolean;
    dipoleMomentNet: '0 D (Không cực)' | 'Phân cực (> 0 D)';
    explanationVI: string;
  } {
    // 1. If central atom has lone pairs and is in Bent or Trigonal Pyramidal shape, asymmetric geometry -> Polar
    if (lonePairs > 0 && (shape === 'BENT' || shape === 'TRIGONAL_PYRAMIDAL')) {
      return {
        isPolar: true,
        dipoleMomentNet: 'Phân cực (> 0 D)',
        explanationVI: `Phân tử có cấu trúc bất đối xứng (${shape === 'BENT' ? 'Góc cong' : 'Chóp tam giác'}) do cặp electron tự do trên nguyên tử trung tâm đẩy các liên kết, các vector momen lưỡng cực liên kết không triệt tiêu nhau nên phân tử phân cực (μ > 0 D).`
      };
    }

    // 2. Check ligand symmetry: are all surrounding ligands identical?
    const uniqueLigands = new Set(ligands.map(l => l.symbol));
    const isSingleLigandType = uniqueLigands.size === 1;

    // 3. For symmetric shapes (LINEAR, TRIGONAL_PLANAR, TETRAHEDRAL, TRIGONAL_BIPYRAMIDAL, OCTAHEDRAL) with 0 lone pairs
    if (lonePairs === 0) {
      if (isSingleLigandType) {
        return {
          isPolar: false,
          dipoleMomentNet: '0 D (Không cực)',
          explanationVI: `Phân tử có cấu hình hình học đối xứng cao (${shape}) với các liên kết giống hệt nhau. Các vector momen lưỡng cực liên kết phân bố đối xứng và triệt tiêu nhau hoàn toàn (∑μ = 0), phân tử không phân cực (μ = 0 D).`
        };
      } else {
        return {
          isPolar: true,
          dipoleMomentNet: 'Phân cực (> 0 D)',
          explanationVI: `Dù có dạng hình học đối xứng (${shape}), các phối tử liên kết khác nhau dẫn đến độ phân cực của các liên kết không tương đương. Các vector momen lưỡng cực không thể triệt tiêu hoàn toàn, phân tử phân cực (μ > 0 D).`
        };
      }
    }

    // Crystal lattice (ionic)
    if (shape === 'CRYSTAL_LATTICE') {
      return {
        isPolar: true,
        dipoleMomentNet: 'Phân cực (> 0 D)',
        explanationVI: 'Hợp chất ion phân ly mạnh trong dung môi phân cực nhờ tương tác tĩnh điện cao.'
      };
    }

    return {
      isPolar: false,
      dipoleMomentNet: '0 D (Không cực)',
      explanationVI: 'Phân tử không phân cực do tính đối xứng của trường điện tích.'
    };
  }
}
