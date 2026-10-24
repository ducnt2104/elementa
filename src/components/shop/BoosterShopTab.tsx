// src/components/shop/BoosterShopTab.tsx
// Comprehensive Yu-Gi-Oh! Style Booster Pack & Box Shop with Categorized Packs:
// - Theo Hộp (Thematic Boxes)
// - Theo Lớp (Lớp 10, Lớp 11, Lớp 12 - GDPT 2018)
// - Theo Loại Chất (Kim loại, Phi kim, Axit, Bazơ, Hữu cơ, Sinh học, Phức chất)
// - Theo Chương (Chương 1 - 12 Sách Giáo Khoa)
// - Theo Bộ Chiến Thuật (Archetype Sets)
// Full support for 1x/10x Pulls, Guaranteed Foil Slot 4, Pity Protection, and Duplicate Shard Crafting.

import React, { useState, useMemo } from 'react';
import { PlayerProfile } from '../../domain/types';
import { PLAYABLE_CARDS } from '../../data/playableCardsData';
import { PlayableCardDef, CardRarity } from '../../domain/cardGameTypes';
import { ChemicalCardView } from '../cards/ChemicalCardView';
import { sound } from '../../audio/soundEngine';
import { CardCraftingModal } from './CardCraftingModal';
import { PackDetailModal } from './PackDetailModal';
import { DailyMarketplaceSection } from './DailyMarketplaceSection';
import {
  Sparkles,
  ShoppingBag,
  Coins,
  Package,
  Layers,
  ChevronLeft,
  AlertTriangle,
  RotateCcw,
  Zap,
  Flame,
  Droplets,
  Atom,
  ShieldCheck,
  CheckCircle2,
  Gift,
  BookOpen,
  Filter,
  Search,
  Tag,
  GraduationCap,
  Hammer,
  Eye
} from 'lucide-react';

export type PackCategoryType = 'GRADE' | 'SUBSTANCE' | 'CHAPTER' | 'ARCHETYPE' | 'BOXES';

export interface BoosterSubPackDef {
  id: string;
  name: string;
  subtitle: string;
  theme: string;
  description: string;
  priceTokens: number;
  featuredCardIds: string[];
  bannerGradient: string;
  badge: string;
  category?: PackCategoryType;
  gradeLevel?: 'LOP_10' | 'LOP_11' | 'LOP_12';
  chapter?: number;
  substanceType?: string;
  targetArchetype?: string;
}

export interface BoosterBoxDef {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  icon: 'flame' | 'shield' | 'atom' | 'droplet';
  subPacks: BoosterSubPackDef[];
}

// ============================================================================
// 1. CANONICAL 4 THEMATIC BOOSTER BOXES (Preserved for Suite 37 Invariants)
// ============================================================================
export const THEMATIC_BOOSTER_BOXES: BoosterBoxDef[] = [
  {
    id: 'box_alkali_halogen',
    title: 'Hộp Kim Loại Kiềm & Halogen',
    subtitle: 'Alkali-Halogen Core & Exothermic Reaction',
    description: 'Chuyên sâu về kim loại kiềm nhóm IA tỏa nhiệt bốc cháy và halogen nhóm VIIA có độ âm điện cực cao.',
    gradient: 'from-amber-600 via-orange-700 to-red-950',
    icon: 'flame',
    subPacks: [
      {
        id: 'sub_alkali_vanguard',
        name: 'Tiên Phong Kim Loại Kiềm',
        subtitle: 'Nhóm IA: Li, Na, K, Rb, Cs',
        theme: 'Alkali Explosion & Hydroxide Formation',
        description: 'Tập trung các quái thú kim loại kiềm với năng lượng ion hóa I1 thấp kỷ lục, phản ứng nổ bùng với nước!',
        priceTokens: 100,
        featuredCardIds: ['card_elem_11_na', 'card_elem_19_k', 'card_trap_sodium_explosion', 'card_comp_nacl'],
        bannerGradient: 'from-amber-600 to-red-900',
        badge: 'Tỏa Nhiệt Cao',
        category: 'BOXES',
        targetArchetype: 'ALKALI_BURST'
      },
      {
        id: 'sub_halogen_vortex',
        name: 'Vòng Xoáy Bão Halogen',
        subtitle: 'Nhóm VIIA: F, Cl, Br, I',
        theme: 'Electronegativity & Electron Thieves',
        description: 'Chứa các quái thú halogen háo electron, bẫy khí clo độc hại và phép kết tủa bạc halogenua bất bại.',
        priceTokens: 100,
        featuredCardIds: ['card_elem_9_f', 'card_elem_17_cl', 'card_elem_35_br', 'card_comp_hcl'],
        bannerGradient: 'from-yellow-600 to-emerald-950',
        badge: 'Độ Âm Điện Cực Đại',
        category: 'BOXES',
        targetArchetype: 'HALOGEN_PURGE'
      }
    ]
  },
  {
    id: 'box_transition_sulfur',
    title: 'Hộp Kim Loại Chuyển Tiếp & Sulfur',
    subtitle: 'Transition Metals & Sulfur Forge',
    description: 'Các nguyên tố khối d đa hóa trị, phức chất phối trí, hợp chất lưu huỳnh nồng độ cao và phản ứng ăn mòn.',
    gradient: 'from-slate-700 via-stone-800 to-emerald-950',
    icon: 'shield',
    subPacks: [
      {
        id: 'sub_sulfur_forge',
        name: 'Lò Rèn Lưu Huỳnh',
        subtitle: 'Sulfur Forge: S, SO2, H2SO4, FeS',
        theme: 'Sulfur Allotropes & Acid Dehydration',
        description: 'Chế ngự lưu huỳnh thoi, lưu huỳnh đơn tà và quái thú tổng hợp Axit Sunfuric háo nước đốt cháy tế bào.',
        priceTokens: 100,
        featuredCardIds: ['card_elem_16_s', 'card_comp_h2so4', 'card_comp_so2_gas', 'card_comp_fe2o3'],
        bannerGradient: 'from-amber-500 to-stone-900',
        badge: 'Háo Nước Cực Mạnh',
        category: 'BOXES'
      },
      {
        id: 'sub_redox_titans',
        name: 'Đấu Sĩ Kim Loại Chuyển Tiếp',
        subtitle: 'D-Block: Fe, Cu, Au, Al, Zn',
        theme: 'Multiple Oxidation States & Coordination',
        description: 'Những chiến binh kim loại sắt, đồng, vàng với chỉ số phòng ngự thụ động hóa và liên kết mạng tinh thể vững chắc.',
        priceTokens: 100,
        featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_elem_79_au', 'card_elem_13_al'],
        bannerGradient: 'from-blue-700 to-slate-950',
        badge: 'Phòng Ngự Bất Hoại',
        category: 'BOXES',
        targetArchetype: 'TRANSITION_FORGE'
      }
    ]
  },
  {
    id: 'box_acid_base_nitro',
    title: 'Hộp Axit — Bazơ & Nitro',
    subtitle: 'Acid-Base Neutralization & Nitro Legion',
    description: 'Chiến thuật kiểm soát nồng độ pH dung dịch, quy trình Haber-Bosch và bão hòa đệm axit-bazơ chuẩn IUPAC.',
    gradient: 'from-cyan-700 via-teal-900 to-blue-950',
    icon: 'droplet',
    subPacks: [
      {
        id: 'sub_nitro_legion',
        name: 'Quân Đoàn Khí Nitơ',
        subtitle: 'Haber-Bosch, NH3, HNO3, NO2',
        theme: 'Triple Covalent Bond & Catalytic Synthesis',
        description: 'Lực lượng khí nitơ bền vững với liên kết ba N≡N, chỉ thức tỉnh dưới áp suất 200 atm và xúc tác hạt sắt nung đỏ!',
        priceTokens: 100,
        featuredCardIds: ['card_elem_7_n', 'card_comp_nh3', 'card_comp_hno3_acid', 'card_spell_mass_spec_draw'],
        bannerGradient: 'from-cyan-600 to-indigo-950',
        badge: 'Liên Kết Ba Bền Vững',
        category: 'BOXES'
      },
      {
        id: 'sub_acid_base_buffer',
        name: 'Phòng Thí Nghiệm Đệm & Trung Hòa',
        subtitle: 'pH Scale & Titration Master',
        description: 'Tối ưu hóa các phép đổi màu chỉ thị quỳ tím, phản ứng trung hòa sinh nhiệt và khiên đệm kháng axit cực mạnh.',
        theme: 'Neutralization & pH Perturbation',
        priceTokens: 100,
        featuredCardIds: ['card_spell_neutralization', 'card_comp_h2o', 'card_comp_nacl', 'card_comp_caco3'],
        bannerGradient: 'from-teal-600 to-blue-950',
        badge: 'Kháng Sốc pH',
        category: 'BOXES',
        targetArchetype: 'STRONG_ACID_CORROSION'
      }
    ]
  },
  {
    id: 'box_organic_environment',
    title: 'Hộp Hợp Chất Hữu Cơ & Môi Trường',
    subtitle: 'Organic Bonds & Environmental Rift',
    description: 'Mạch liên kết cộng hóa trị Carbon, quang phổ khối, địa bàn Khe Nứt Tuần Hoàn và xúc tác kim loại quý.',
    gradient: 'from-purple-800 via-fuchsia-950 to-slate-950',
    icon: 'atom',
    subPacks: [
      {
        id: 'sub_organic_bonds',
        name: 'Kiến Trúc Hóa Học Hữu Cơ',
        subtitle: 'Tetravalent Carbon & Molecular Orbitals',
        theme: 'Organic Chains & Covalent Hybridization',
        description: 'Sức mạnh biến hóa linh hoạt của Carbon lai hóa sp3/sp2, tạo dựng các quái thú đại phân tử hữu cơ liên kết chuỗi.',
        priceTokens: 100,
        featuredCardIds: ['card_elem_6_c', 'card_comp_co2', 'card_spell_platinum_catalyst', 'card_link_4_diamond'],
        bannerGradient: 'from-purple-700 to-fuchsia-950',
        badge: 'Mạng Lưới Cộng Hóa Trị',
        category: 'BOXES',
        targetArchetype: 'HYDROCARBON_CHAIN'
      },
      {
        id: 'sub_environmental_rift',
        name: 'Kỳ Quan Môi Trường & Khí Quyển',
        subtitle: 'Field Spells & Atmospheric Wonders',
        theme: 'Atmospheric Physics & Dynamic Temperature',
        description: 'Chi phối áp suất, nhiệt độ tuyệt đối Kelvin và biến đổi trạng thái pha lỏng - khí - rắn của toàn bộ chiến trường.',
        priceTokens: 100,
        featuredCardIds: ['card_spell_periodic_rift_field', 'card_comp_h2o', 'card_elem_8_o', 'card_elem_1_h'],
        bannerGradient: 'from-indigo-700 to-slate-950',
        badge: 'Biến Đổi Địa Hình',
        category: 'BOXES'
      }
    ]
  }
];

// ============================================================================
// 2. GÓI TÁCH LẺ THEO LỚP (GDPT 2018: LỚP 10, LỚP 11, LỚP 12)
// ============================================================================
export const GRADE_BOOSTER_PACKS: BoosterSubPackDef[] = [
  // --- LỚP 10 ---
  {
    id: 'pack_grade10_atomic_periodic',
    name: 'Gói Lớp 10: Nguyên Tử & Bảng Tuần Hoàn',
    subtitle: 'Cấu hình electron, bán kính r, Z=1→20',
    theme: 'Atomic Structure & Periodic Trends',
    description: 'Xoay quanh mô hình nguyên tử Rutherford - Bohr, các orbital s, p và xu hướng biến đổi bán kính, độ âm điện theo chu kỳ.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_1_h', 'card_elem_11_na', 'card_elem_17_cl', 'card_elem_26_fe'],
    bannerGradient: 'from-cyan-600 to-blue-900',
    badge: 'Lớp 10 • Chương 1 & 2',
    category: 'GRADE',
    gradeLevel: 'LOP_10',
    chapter: 1
  },
  {
    id: 'pack_grade10_bonding_crystal',
    name: 'Gói Lớp 10: Liên Kết Hóa Học & Tinh Thể',
    subtitle: 'Liên kết Ion, Cộng hóa trị, Tinh thể NaCl',
    theme: 'Chemical Bonding & Crystal Lattice',
    description: 'Quy tắc Octet, liên kết ion giữa kim loại và phi kim, cặp electron dùng chung và liên kết hydrogen giữa các phân tử nước.',
    priceTokens: 100,
    featuredCardIds: ['card_comp_nacl', 'card_link_4_diamond', 'card_comp_h2o', 'card_spell_mass_spec_draw'],
    bannerGradient: 'from-blue-600 to-indigo-950',
    badge: 'Lớp 10 • Chương 3',
    category: 'GRADE',
    gradeLevel: 'LOP_10',
    chapter: 3
  },
  {
    id: 'pack_grade10_redox_energy',
    name: 'Gói Lớp 10: Phản Ứng Oxi Hóa - Khử & Năng Lượng',
    subtitle: 'Thế khử chuẩn, Enthalpy ΔrH°298, Nhiệt phản ứng',
    theme: 'Redox Systems & Chemical Enthalpy',
    description: 'Chuyển dời electron giữa chất khử và chất oxi hóa, biến thiên enthalpy chuẩn và cân bằng phương trình ion thu gọn.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_9_f', 'card_elem_19_k', 'card_trap_sodium_explosion', 'card_comp_fe2o3'],
    bannerGradient: 'from-red-600 to-amber-950',
    badge: 'Lớp 10 • Chương 4 & 5',
    category: 'GRADE',
    gradeLevel: 'LOP_10',
    chapter: 4
  },
  {
    id: 'pack_grade10_kinetics_halogen',
    name: 'Gói Lớp 10: Tốc Độ Phản Ứng & Halogen',
    subtitle: 'Định luật Arrhenius, Nhóm VIIA F-Cl-Br-I',
    theme: 'Reaction Kinetics & Halogen Purge',
    description: 'Năng lượng hoạt hóa Ea, yếu tố nhiệt độ, nồng độ, diện tích tiếp xúc và tính oxi hóa cực mạnh của các đơn chất halogen.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_17_cl', 'card_elem_35_br', 'card_elem_9_f', 'card_comp_hcl'],
    bannerGradient: 'from-yellow-600 to-emerald-950',
    badge: 'Lớp 10 • Chương 6 & 7',
    category: 'GRADE',
    gradeLevel: 'LOP_10',
    chapter: 6
  },

  // --- LỚP 11 ---
  {
    id: 'pack_grade11_equilibrium_acid_base',
    name: 'Gói Lớp 11: Cân Bằng Hóa Học & pH Axit - Bazơ',
    subtitle: 'Le Chatelier, Thuyết Brønsted-Lowry, Chuẩn độ',
    theme: 'Equilibrium & Acid-Base Buffer',
    description: 'Chuyển dịch cân bằng thuận nghịch, hằng số Kc, tính pH dung dịch axit mạnh/yếu và quy trình chuẩn độ điểm tương đương.',
    priceTokens: 100,
    featuredCardIds: ['card_spell_neutralization', 'card_comp_h2o', 'card_comp_caco3', 'card_comp_hcl'],
    bannerGradient: 'from-teal-600 to-cyan-950',
    badge: 'Lớp 11 • Chương 1',
    category: 'GRADE',
    gradeLevel: 'LOP_11',
    chapter: 1
  },
  {
    id: 'pack_grade11_nitrogen_sulfur',
    name: 'Gói Lớp 11: Nitrogen, Sulfur & Mưa Axit',
    subtitle: 'Haber-Bosch NH3, Axit HNO3, H2SO4 đặc',
    theme: 'Pnictogen & Chalcogen Industrial Chem',
    description: 'Đặc trưng liên kết ba N≡N siêu bền, phản ứng tổng hợp amoniac ở 200 atm, và tính háo nước gây bỏng nặng của H2SO4.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_7_n', 'card_comp_nh3', 'card_comp_h2so4', 'card_elem_16_s'],
    bannerGradient: 'from-sky-600 to-indigo-950',
    badge: 'Lớp 11 • Chương 2',
    category: 'GRADE',
    gradeLevel: 'LOP_11',
    chapter: 2
  },
  {
    id: 'pack_grade11_hydrocarbons',
    name: 'Gói Lớp 11: Đại Cương Hữu Cơ & Hiđrocacbon',
    subtitle: 'Alkane, Alkene, Alkyne, Aren Benzen',
    theme: 'Organic Carbon Skeleton & Covalent Chains',
    description: 'Thuyết cấu tạo hóa học, đồng phân, đồng đẳng, phản ứng cộng electrophile vào nối đôi và phản ứng thế vòng benzen.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_6_c', 'card_comp_co2', 'card_link_2_ethylene', 'card_link_4_diamond'],
    bannerGradient: 'from-purple-700 to-slate-900',
    badge: 'Lớp 11 • Chương 3 & 4',
    category: 'GRADE',
    gradeLevel: 'LOP_11',
    chapter: 4
  },
  {
    id: 'pack_grade11_derivatives',
    name: 'Gói Lớp 11: Dẫn Xuất Halogen, Alcohol & Acid',
    subtitle: 'Nhóm -OH, Phenol, Aldehyde, Axit Axetic',
    theme: 'Organic Functional Groups',
    description: 'Tính chất của nhóm định chức: phản ứng tráng bạc của aldehyde, độ linh động của hydro trong nhóm carboxyl axit hữu cơ.',
    priceTokens: 100,
    featuredCardIds: ['card_comp_c2h5oh', 'card_comp_ch3cooh', 'card_spell_platinum_catalyst', 'card_comp_co2'],
    bannerGradient: 'from-fuchsia-700 to-stone-900',
    badge: 'Lớp 11 • Chương 5 & 6',
    category: 'GRADE',
    gradeLevel: 'LOP_11',
    chapter: 6
  },

  // --- LỚP 12 ---
  {
    id: 'pack_grade12_ester_lipid_carbohydrate',
    name: 'Gói Lớp 12: Ester, Lipid & Carbohydrate',
    subtitle: 'Xà phòng hóa, Glucose, Fructose, Tinh bột',
    theme: 'Biomolecules & Esters',
    description: 'Phản ứng este hóa thuận nghịch, thủy phân chất béo trong môi trường kiềm, cấu trúc mạch vòng của đường glucose và tinh bột.',
    priceTokens: 100,
    featuredCardIds: ['card_comp_ch3cooh', 'card_comp_c2h5oh', 'card_comp_co2', 'card_comp_h2o'],
    bannerGradient: 'from-emerald-600 to-teal-950',
    badge: 'Lớp 12 • Chương 1 & 2',
    category: 'GRADE',
    gradeLevel: 'LOP_12',
    chapter: 1
  },
  {
    id: 'pack_grade12_amino_polymers',
    name: 'Gói Lớp 12: Amine, Amino Acid, Protein & Polymer',
    subtitle: 'Liên kết Peptide, Protein, PE, Tơ Nilon-6,6',
    theme: 'Peptides & High Polymers',
    description: 'Hợp chất lưỡng tính amino acid, phản ứng màu Biuret, cơ chế trùng hợp và trùng ngưng tạo vật liệu cao phân tử hiện đại.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_7_n', 'card_elem_6_c', 'card_comp_nh3', 'card_link_2_ethylene'],
    bannerGradient: 'from-violet-600 to-indigo-950',
    badge: 'Lớp 12 • Chương 3 & 4',
    category: 'GRADE',
    gradeLevel: 'LOP_12',
    chapter: 3
  },
  {
    id: 'pack_grade12_electrochemistry_metals',
    name: 'Gói Lớp 12: Pin Điện Hóa & Đại Cương Kim Loại',
    subtitle: 'Pin Galvanic, Bình điện phân, Nhóm IA, IIA, Al',
    theme: 'Galvanic Cells & Electrorefining',
    description: 'Thế điện cực chuẩn E°, suất điện động pin điện, sự điện phân dung dịch có màng ngăn và đặc tính lưỡng tính của nhôm.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_elem_11_na', 'card_elem_13_al'],
    bannerGradient: 'from-amber-600 to-slate-900',
    badge: 'Lớp 12 • Chương 5 & 6',
    category: 'GRADE',
    gradeLevel: 'LOP_12',
    chapter: 5
  },
  {
    id: 'pack_grade12_transition_complexes',
    name: 'Gói Lớp 12: Kim Loại Chuyển Tiếp & Phức Chất',
    subtitle: 'Khối d, Phức Werner, Ligand NH3, H2O, Cl-',
    theme: 'Coordination Chemistry & Crystal Field',
    description: 'Cấu hình electron phân lớp 3d, phức chất bát diện và vuông phẳng, màu sắc chuyển tiếp d-d và tính chất từ tính đặc thù.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_elem_79_au', 'card_comp_fe2o3'],
    bannerGradient: 'from-rose-700 to-purple-950',
    badge: 'Lớp 12 • Chương 7 & 8',
    category: 'GRADE',
    gradeLevel: 'LOP_12',
    chapter: 7
  }
];

// ============================================================================
// 3. GÓI TÁCH LẺ THEO LOẠI CHẤT HÓA HỌC
// ============================================================================
export const SUBSTANCE_BOOSTER_PACKS: BoosterSubPackDef[] = [
  {
    id: 'pack_sub_alkali_alkaline_earth',
    name: 'Gói Kim Loại Kiềm & Kiềm Thổ',
    subtitle: 'Nhóm IA (Li, Na, K) & Nhóm IIA (Mg, Ca, Ba)',
    theme: 'Highly Reactive Metals',
    description: 'Các kim loại nhẹ, năng lượng ion hóa thấp, phản ứng mạnh mẽ với nước và tạo dung dịch bazơ mạnh kiềm hóa môi trường.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_11_na', 'card_elem_19_k', 'card_trap_sodium_explosion', 'card_comp_caco3'],
    bannerGradient: 'from-amber-500 to-red-950',
    badge: 'Kim Loại Nhẹ IA-IIA',
    category: 'SUBSTANCE',
    substanceType: 'ALKALI_EARTH'
  },
  {
    id: 'pack_sub_transition_metals',
    name: 'Gói Kim Loại Chuyển Tiếp & Hợp Kim',
    subtitle: 'Khối d: Fe, Cu, Zn, Ni, Cr, Au, Ag',
    theme: 'Transition Metals & Alloys',
    description: 'Sức mạnh mạng tinh thể kim loại vững chắc, tính dẫn điện cao, khả năng tạo phức chất và biến thiên nhiều số oxi hóa.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_elem_79_au', 'card_comp_fe2o3'],
    bannerGradient: 'from-slate-600 to-stone-900',
    badge: 'Kim Loại Khối d',
    category: 'SUBSTANCE',
    substanceType: 'TRANSITION_METALS'
  },
  {
    id: 'pack_sub_halogens_nonmetals',
    name: 'Gói Halogen & Phi Kim Oxi Hóa',
    subtitle: 'Nhóm VIIA (F, Cl, Br, I) & O, S, P',
    theme: 'High Electronegativity Nonmetals',
    description: 'Phi kim có độ âm điện hàng đầu bảng tuần hoàn, háo electron, tạo muối halogenua và phá vỡ cấu trúc quái thú đối phương.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_9_f', 'card_elem_17_cl', 'card_elem_35_br', 'card_comp_hcl'],
    bannerGradient: 'from-yellow-500 to-emerald-950',
    badge: 'Phi Kim & Halogen',
    category: 'SUBSTANCE',
    substanceType: 'HALOGENS_NONMETALS'
  },
  {
    id: 'pack_sub_noble_gases',
    name: 'Gói Khí Hiếm & Trạng Thái Bền',
    subtitle: 'Nhóm VIIIA: He, Ne, Ar, Kr, Xe',
    theme: 'Inert Noble Gases',
    description: 'Lớp vỏ electron bão hòa bền vững 8e (hoặc 2e đối với Heli), trơ hoàn toàn về hóa học và miễn nhiễm sát thương đối phương.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_1_h', 'card_spell_mass_spec_draw', 'card_comp_co2', 'card_spell_periodic_rift_field'],
    bannerGradient: 'from-cyan-500 to-slate-950',
    badge: 'Khí Hiếm Trơ VIIIA',
    category: 'SUBSTANCE',
    substanceType: 'NOBLE_GASES'
  },
  {
    id: 'pack_sub_acids_bases_salts',
    name: 'Gói Axit, Bazơ & Muối Vô Cơ',
    subtitle: 'HCl, H2SO4, HNO3, NaOH, CaCO3, BaSO4',
    theme: 'Acids, Bases & Insoluble Salts',
    description: 'Hệ thống pH dung dịch, phản ứng trung hòa tỏa nhiệt, kết tủa trắng không tan trong axit mạnh và bảo vệ môi trường.',
    priceTokens: 100,
    featuredCardIds: ['card_comp_h2so4', 'card_comp_hcl', 'card_spell_neutralization', 'card_comp_caco3'],
    bannerGradient: 'from-teal-600 to-blue-950',
    badge: 'Axit • Bazơ • Muối',
    category: 'SUBSTANCE',
    substanceType: 'ACIDS_BASES_SALTS'
  },
  {
    id: 'pack_sub_hydrocarbons_organic',
    name: 'Gói Hiđrocacbon & Hóa Hữu Cơ',
    subtitle: 'Mạch Carbon, Alkane, Alkene, Benzen',
    theme: 'Aliphatic & Aromatic Hydrocarbons',
    description: 'Các liên kết cộng hóa trị bền bỉ của Carbon, phản ứng cộng vào nối đôi C=C, tạo polymer và chuỗi mạch cacbon bất tận.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_6_c', 'card_link_2_ethylene', 'card_link_4_diamond', 'card_comp_co2'],
    bannerGradient: 'from-purple-600 to-fuchsia-950',
    badge: 'Hiđrocacbon Hữu Cơ',
    category: 'SUBSTANCE',
    substanceType: 'HYDROCARBONS'
  },
  {
    id: 'pack_sub_biomolecules_polymers',
    name: 'Gói Phân Tử Sinh Học & Polymer',
    subtitle: 'Glucose, Lipid, Protein, Tơ tổng hợp',
    theme: 'Biomolecules & Macromolecules',
    description: 'Nguồn sống sinh học tế bào, năng lượng ATP từ glucose, liên kết peptide trong enzyme và đại phân tử polymer công nghiệp.',
    priceTokens: 100,
    featuredCardIds: ['card_comp_c2h5oh', 'card_comp_ch3cooh', 'card_elem_7_n', 'card_comp_h2o'],
    bannerGradient: 'from-emerald-500 to-teal-950',
    badge: 'Sinh Học & Cao Phân Tử',
    category: 'SUBSTANCE',
    substanceType: 'BIOMOLECULES'
  },
  {
    id: 'pack_sub_coordination_complexes',
    name: 'Gói Phức Chất Phối Trí & Tinh Thể',
    subtitle: 'Phức Werner [Cu(NH3)4]2+, [Fe(CN)6]3-',
    theme: 'Coordination Chemistry & Ligand Fields',
    description: 'Nguyên tử trung tâm nhận cặp electron tự do từ phối tử ligand, hình thành cấu trúc không gian bát diện và khóa chặt quái thú.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_comp_nh3', 'card_spell_platinum_catalyst'],
    bannerGradient: 'from-indigo-600 to-purple-950',
    badge: 'Phức Chất Phối Trí',
    category: 'SUBSTANCE',
    substanceType: 'COORDINATION'
  }
];

// ============================================================================
// 4. GÓI TÁCH LẺ THEO CHƯƠNG SGK GDPT 2018
// ============================================================================
export const CHAPTER_BOOSTER_PACKS: BoosterSubPackDef[] = [
  {
    id: 'pack_chap_01_atomic_structure',
    name: 'Chương 1: Cấu Tạo Nguyên Tử',
    subtitle: 'Hạt p, n, e; Lớp và phân lớp s, p, d, f',
    theme: 'Atomic Orbitals',
    description: 'Khám phá cấu trúc vi mô của vật chất, cấu hình electron và số hiệu nguyên tử Z xác định danh tính của từng nguyên tố.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_1_h', 'card_elem_11_na', 'card_elem_17_cl', 'card_elem_26_fe'],
    bannerGradient: 'from-blue-600 to-slate-950',
    badge: 'Chương 1 (Lớp 10)',
    category: 'CHAPTER',
    chapter: 1
  },
  {
    id: 'pack_chap_02_periodic_table',
    name: 'Chương 2: Bảng Tuần Hoàn Nguyên Tố',
    subtitle: 'Định luật tuần hoàn, Độ âm điện, Năng lượng I1',
    theme: 'Periodic Law',
    description: 'Quy luật biến thiên tuần hoàn tính kim loại - phi kim, hóa trị cao nhất với oxy và công thức oxit/hiđroxit cao nhất.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_9_f', 'card_elem_19_k', 'card_elem_11_na', 'card_spell_periodic_rift_field'],
    bannerGradient: 'from-cyan-600 to-teal-950',
    badge: 'Chương 2 (Lớp 10)',
    category: 'CHAPTER',
    chapter: 2
  },
  {
    id: 'pack_chap_03_chemical_bonds',
    name: 'Chương 3: Liên Kết Hóa Học',
    subtitle: 'Quy tắc Octet, Liên kết ion, CHT, Hydrogen',
    theme: 'Covalent & Ionic Bonds',
    description: 'Sự hình thành liên kết ion và cộng hóa trị, độ phân cực liên kết hiệu độ âm điện Δχ và liên kết hydrogen kỳ diệu của nước.',
    priceTokens: 100,
    featuredCardIds: ['card_comp_nacl', 'card_comp_h2o', 'card_link_4_diamond', 'card_link_2_ethylene'],
    bannerGradient: 'from-indigo-600 to-blue-950',
    badge: 'Chương 3 (Lớp 10)',
    category: 'CHAPTER',
    chapter: 3
  },
  {
    id: 'pack_chap_04_redox_reactions',
    name: 'Chương 4: Phản Ứng Oxi Hóa - Khử',
    subtitle: 'Số oxi hóa, Quá trình oxi hóa & khử',
    theme: 'Electron Transfer',
    description: 'Quy tắc xác định số oxi hóa, phương pháp thăng bằng electron bảo toàn điện tích và ứng dụng trong các chuỗi phản ứng liên hoàn.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_17_cl', 'card_comp_fe2o3', 'card_trap_sodium_explosion'],
    bannerGradient: 'from-red-600 to-orange-950',
    badge: 'Chương 4 (Lớp 10)',
    category: 'CHAPTER',
    chapter: 4
  },
  {
    id: 'pack_chap_05_thermochemistry',
    name: 'Chương 5: Năng Lượng Hóa Học',
    subtitle: 'Enthalpy tạo thành chuẩn, Tỏa nhiệt & Thu nhiệt',
    theme: 'Thermochemistry',
    description: 'Tính toán biến thiên enthalpy phản ứng ΔrH°298 từ nhiệt tạo thành hoặc năng lượng liên kết Eb, dự đoán chiều phản ứng tự diễn ra.',
    priceTokens: 100,
    featuredCardIds: ['card_trap_sodium_explosion', 'card_comp_h2o', 'card_comp_co2', 'card_elem_16_s'],
    bannerGradient: 'from-amber-600 to-rose-950',
    badge: 'Chương 5 (Lớp 10)',
    category: 'CHAPTER',
    chapter: 5
  },
  {
    id: 'pack_chap_06_kinetics_equilibrium',
    name: 'Chương 6: Tốc Độ Phản Ứng & Cân Bằng',
    subtitle: 'Hằng số k, Phương trình Arrhenius, Le Chatelier',
    theme: 'Chemical Equilibrium',
    description: 'Các yếu tố ảnh hưởng tốc độ phản ứng: nồng độ, áp suất, nhiệt độ, chất xúc tác và nguyên lý chuyển dịch cân bằng động.',
    priceTokens: 100,
    featuredCardIds: ['card_spell_platinum_catalyst', 'card_comp_nh3', 'card_elem_7_n', 'card_comp_hcl'],
    bannerGradient: 'from-teal-600 to-emerald-950',
    badge: 'Chương 6 (Lớp 10-11)',
    category: 'CHAPTER',
    chapter: 6
  },
  {
    id: 'pack_chap_07_halogen_elements',
    name: 'Chương 7: Nhóm Nguyên Tố Halogen',
    subtitle: 'F2, Cl2, Br2, I2, Axit halogenhiđric',
    theme: 'Halogen Group VIIA',
    description: 'Tính oxi hóa giảm dần từ Flo đến Iot, tính axit tăng dần từ HF đến HI, và các phản ứng nhận biết ion halogenua bằng ion Ag+.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_9_f', 'card_elem_17_cl', 'card_elem_35_br', 'card_comp_hcl'],
    bannerGradient: 'from-yellow-600 to-green-950',
    badge: 'Chương 7 (Lớp 10)',
    category: 'CHAPTER',
    chapter: 7
  },
  {
    id: 'pack_chap_08_nitrogen_sulfur',
    name: 'Chương 8: Nitrogen & Sulfur',
    subtitle: 'Khí NH3, Axit HNO3, SO2, Axit H2SO4',
    theme: 'Nitrogen & Sulfur Chemistry',
    description: 'Chu trình nitơ trong tự nhiên, mưa axit do oxit lưu huỳnh và nitơ, cùng các tính chất hóa học đặc trưng của axit sunfuric đặc nóng.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_7_n', 'card_comp_nh3', 'card_comp_h2so4', 'card_comp_so2_gas'],
    bannerGradient: 'from-sky-600 to-slate-950',
    badge: 'Chương 8 (Lớp 11)',
    category: 'CHAPTER',
    chapter: 8
  },
  {
    id: 'pack_chap_09_hydrocarbons_general',
    name: 'Chương 9: Hiđrocacbon & Mạch Carbon',
    subtitle: 'Mạch hở no, không no & Vòng Aren thơm',
    theme: 'Hydrocarbon Families',
    description: 'Đồng phân hình học cis-trans, phản ứng thế halogen của ankan, phản ứng cộng trùng hợp của anken và tính thơm của benzen.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_6_c', 'card_link_2_ethylene', 'card_link_4_diamond', 'card_comp_co2'],
    bannerGradient: 'from-purple-700 to-indigo-950',
    badge: 'Chương 9 (Lớp 11)',
    category: 'CHAPTER',
    chapter: 9
  },
  {
    id: 'pack_chap_10_oxygen_nitrogen_organic',
    name: 'Chương 10: Hợp Chất Hữu Cơ Chứa Oxy & Nitơ',
    subtitle: 'Alcohol, Phenol, Aldehyde, Axit & Amine',
    theme: 'Oxygen & Nitrogen Organics',
    description: 'Tính axit của phenol và axit axetic, phản ứng tạo phức màu tím xanh của glixerol với Cu(OH)2 và liên kết hydro liên phân tử.',
    priceTokens: 100,
    featuredCardIds: ['card_comp_c2h5oh', 'card_comp_ch3cooh', 'card_comp_nh3', 'card_elem_7_n'],
    bannerGradient: 'from-fuchsia-700 to-rose-950',
    badge: 'Chương 10 (Lớp 11-12)',
    category: 'CHAPTER',
    chapter: 10
  },
  {
    id: 'pack_chap_11_electrochemistry_cells',
    name: 'Chương 11: Pin Điện Hóa & Điện Phân',
    subtitle: 'Pin Galvanic, Dãy điện hóa kim loại, Điện phân',
    theme: 'Electrochemistry',
    description: 'Cơ chế hoạt động của pin điện Daniell, điện cực anot/catot, định luật Faraday và công nghệ mạ điện chống ăn mòn kim loại.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_elem_11_na', 'card_elem_13_al'],
    bannerGradient: 'from-amber-600 to-cyan-950',
    badge: 'Chương 11 (Lớp 12)',
    category: 'CHAPTER',
    chapter: 11
  },
  {
    id: 'pack_chap_12_transition_complexes',
    name: 'Chương 12: Kim Loại Chuyển Tiếp & Phức Chất',
    subtitle: 'D-block Fe, Cu, Cr & Phức chất phối trí Werner',
    theme: 'Transition Elements & Complexes',
    description: 'Thuyết trường tinh thể, phổ hấp thụ ánh sáng của phức chất, ligand phối trí và ứng dụng xúc tác công nghiệp của phức kim loại.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_elem_79_au', 'card_comp_fe2o3'],
    bannerGradient: 'from-violet-700 to-slate-950',
    badge: 'Chương 12 (Lớp 12)',
    category: 'CHAPTER',
    chapter: 12
  }
];

// ============================================================================
// 5. GÓI TÁCH LẺ THEO BỘ CHIẾN THUẬT (ARCHETYPES)
// ============================================================================
export const ARCHETYPE_BOOSTER_PACKS: BoosterSubPackDef[] = [
  {
    id: 'pack_arch_alkali_burst',
    name: 'Bộ Alkali Burst (Bùng Nổ Kiềm)',
    subtitle: 'Kim loại kiềm IA tỏa nhiệt sinh nổ',
    theme: 'Direct Burn & High Tempo',
    description: 'Chiến thuật gây sát thương LP trực diện nhanh như chớp với các phản ứng nổ Li, Na, K tiếp xúc nước.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_11_na', 'card_elem_19_k', 'card_trap_sodium_explosion', 'card_comp_nacl'],
    bannerGradient: 'from-amber-600 to-red-950',
    badge: 'Chiến Thuật Sát Thương',
    category: 'ARCHETYPE',
    targetArchetype: 'ALKALI_BURST'
  },
  {
    id: 'pack_arch_halogen_purge',
    name: 'Bộ Halogen Purge (Thanh Tẩy Halogen)',
    subtitle: 'Độ âm điện cực đại, trừ ATK/DEF diện rộng',
    theme: 'Board Wipe & Stat Debuff',
    description: 'Thâu tóm electron của mọi quái thú đối phương, bào mòn sức tấn công và thanh trừng sân đấu bằng bão Clo & Flo.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_9_f', 'card_elem_17_cl', 'card_elem_35_br', 'card_comp_hcl'],
    bannerGradient: 'from-yellow-600 to-emerald-950',
    badge: 'Chiến Thuật Áp Chế',
    category: 'ARCHETYPE',
    targetArchetype: 'HALOGEN_PURGE'
  },
  {
    id: 'pack_arch_transition_forge',
    name: 'Bộ Transition Forge (Lò Rèn Chuyển Tiếp)',
    subtitle: 'Đa hóa trị, chỉ số phòng ngự cực đại',
    theme: 'High Defense & Equipment Synergy',
    description: 'Xây dựng bức tường phòng thủ kiên cố với sắt, đồng, kẽm và trang bị xúc tác gia tăng chỉ số vượt trội.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_elem_79_au', 'card_elem_13_al'],
    bannerGradient: 'from-slate-600 to-blue-950',
    badge: 'Chiến Thuật Phòng Ngự',
    category: 'ARCHETYPE',
    targetArchetype: 'TRANSITION_FORGE'
  },
  {
    id: 'pack_arch_noble_void',
    name: 'Bộ Noble Void (Hư Vô Khí Hiếm)',
    subtitle: 'Lớp vỏ 8e bền vững, bất tử hiệu ứng',
    theme: 'Immunity & Stall',
    description: 'Các quái thú khí hiếm không thể bị phá hủy bởi chiến đấu hay hiệu ứng thẻ bài, biến sân đấu thành vùng an toàn tuyệt đối.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_1_h', 'card_spell_mass_spec_draw', 'card_comp_co2', 'card_spell_periodic_rift_field'],
    bannerGradient: 'from-cyan-600 to-slate-950',
    badge: 'Chiến Thuật Bất Tử',
    category: 'ARCHETYPE',
    targetArchetype: 'NOBLE_VOID'
  },
  {
    id: 'pack_arch_strong_acid',
    name: 'Bộ Strong Acid (Ăn Mòn Axit Mạnh)',
    subtitle: 'HCl, HNO3, H2SO4 phá hủy hàng thủ',
    theme: 'Removal & Trap Destruction',
    description: 'Ăn mòn lá chắn phòng thủ của đối phương, vô hiệu hóa bài bẫy úp và đẩy nhanh nhịp độ dứt điểm trận đấu.',
    priceTokens: 100,
    featuredCardIds: ['card_comp_h2so4', 'card_comp_hcl', 'card_comp_hno3_acid', 'card_spell_neutralization'],
    bannerGradient: 'from-teal-600 to-cyan-950',
    badge: 'Chiến Thuật Phá Hàng Thủ',
    category: 'ARCHETYPE',
    targetArchetype: 'STRONG_ACID_CORROSION'
  },
  {
    id: 'pack_arch_werner_coordination',
    name: 'Bộ Werner Coordination (Phức Chất Phối Trí)',
    subtitle: 'Liên kết phối trí bát diện, phong tỏa đối thủ',
    theme: 'Control & Negation',
    description: 'Sử dụng các ion kim loại chuyển tiếp làm tâm phối trí, liên kết chặt chẽ quái thú đối phương và khóa toàn bộ hiệu ứng.',
    priceTokens: 100,
    featuredCardIds: ['card_elem_26_fe', 'card_elem_29_cu', 'card_comp_nh3', 'card_spell_platinum_catalyst'],
    bannerGradient: 'from-indigo-600 to-purple-950',
    badge: 'Chiến Thuật Kiểm Soát',
    category: 'ARCHETYPE',
    targetArchetype: 'WERNER_COORDINATION'
  }
];

// Combine all packs for universal lookup
export const ALL_SPECIALIZED_PACKS: BoosterSubPackDef[] = [
  ...GRADE_BOOSTER_PACKS,
  ...SUBSTANCE_BOOSTER_PACKS,
  ...CHAPTER_BOOSTER_PACKS,
  ...ARCHETYPE_BOOSTER_PACKS
];

// Duplicate Shard Compensation Table
export const SHARDS_PER_DUPLICATE_RARITY: Record<CardRarity, number> = {
  COMMON: 15,
  RARE: 40,
  SUPER_RARE: 100,
  ULTRA_RARE: 250,
  SECRET_RARE: 600
};

// Crafting Cost per Rarity (Standard 4:1 Disenchant/Craft Ratio)
export const CRAFTING_COST_PER_RARITY: Record<CardRarity, number> = {
  COMMON: 60,
  RARE: 160,
  SUPER_RARE: 400,
  ULTRA_RARE: 1000,
  SECRET_RARE: 2400
};

export function calculateCraftingRefundRatio(rarity: CardRarity): number {
  return CRAFTING_COST_PER_RARITY[rarity] / SHARDS_PER_DUPLICATE_RARITY[rarity];
}

// Generate 5 cards for a single booster pack with guaranteed foil in slot 4 and optional pity protection
export function rollBoosterPack(
  subPack: BoosterSubPackDef,
  pool: PlayableCardDef[] = PLAYABLE_CARDS,
  pityCounter: number = 0
): PlayableCardDef[] {
  const rolled: PlayableCardDef[] = [];

  // Filter focus cards if matched
  const featuredCards = subPack.featuredCardIds
    .map(id => pool.find(c => c.id === id))
    .filter((c): c is PlayableCardDef => Boolean(c));

  // Determine specialized candidate pool if pack targets specific archetype
  let specializedPool = pool;
  if (subPack.targetArchetype) {
    const archetypeMatches = pool.filter(c => c.archetype === subPack.targetArchetype);
    if (archetypeMatches.length >= 10) {
      specializedPool = archetypeMatches;
    }
  }

  // Pity trigger: if 9 packs in a row without UR/SEC (pityCounter >= 9), guarantee UR or SEC in slot 4
  const isPityTriggered = pityCounter >= 9;

  for (let slot = 0; slot < 5; slot++) {
    const roll = Math.random() * 100;
    let targetRarity: CardRarity = 'COMMON';

    // Guaranteed Rare or higher in slot 4 (the foil slot)
    if (slot === 4) {
      if (isPityTriggered) {
        targetRarity = roll < 20.0 ? 'SECRET_RARE' : 'ULTRA_RARE';
      } else {
        if (roll < 3.0) targetRarity = 'SECRET_RARE';
        else if (roll < 15.0) targetRarity = 'ULTRA_RARE';
        else if (roll < 45.0) targetRarity = 'SUPER_RARE';
        else targetRarity = 'RARE';
      }
    } else {
      if (roll < 0.5) targetRarity = 'SECRET_RARE';
      else if (roll < 3.0) targetRarity = 'ULTRA_RARE';
      else if (roll < 10.0) targetRarity = 'SUPER_RARE';
      else if (roll < 35.0) targetRarity = 'RARE';
      else targetRarity = 'COMMON';
    }

    // 40% bias toward featured cards if rarity matches
    const featuredMatches = featuredCards.filter(c => c.rarity === targetRarity);
    if (featuredMatches.length > 0 && Math.random() < 0.40) {
      rolled.push(featuredMatches[Math.floor(Math.random() * featuredMatches.length)]);
    } else {
      let candidates = specializedPool.filter(c => c.rarity === targetRarity);
      if (candidates.length === 0) {
        candidates = pool.filter(c => c.rarity === targetRarity);
      }
      if (candidates.length === 0) candidates = pool;
      rolled.push(candidates[Math.floor(Math.random() * candidates.length)]);
    }
  }
  return rolled;
}

interface BoosterShopTabProps {
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export const BoosterShopTab: React.FC<BoosterShopTabProps> = ({
  profile,
  onUpdateProfile
}) => {
  // Navigation & Category Filters
  const [activeCategory, setActiveCategory] = useState<PackCategoryType | 'ALL'>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<'ALL' | 'LOP_10' | 'LOP_11' | 'LOP_12'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBox, setSelectedBox] = useState<BoosterBoxDef | null>(null);

  // Opening State
  const [openingSubPack, setOpeningSubPack] = useState<BoosterSubPackDef | null>(null);
  const [openedCards, setOpenedCards] = useState<PlayableCardDef[]>([]);
  const [isOpeningAnimation, setIsOpeningAnimation] = useState<boolean>(false);
  const [isStarterWelfarePull, setIsStarterWelfarePull] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pullCount, setPullCount] = useState<1 | 10>(1);
  const [showCraftingModal, setShowCraftingModal] = useState<boolean>(false);
  const [inspectingPack, setInspectingPack] = useState<BoosterSubPackDef | null>(null);

  // Duplicate Tracking
  const [duplicateSummary, setDuplicateSummary] = useState<{
    totalShardsGained: number;
    duplicateIndices: number[];
  }>({ totalShardsGained: 0, duplicateIndices: [] });

  // Generate 5 cards for a single pack
  const rollSinglePack = (subPack: BoosterSubPackDef): PlayableCardDef[] => {
    return rollBoosterPack(subPack, PLAYABLE_CARDS);
  };

  // Buy and Open
  const handleExecutePull = (subPack: BoosterSubPackDef, count: 1 | 10, isFreeStarter: boolean = false) => {
    let cost = 0;
    if (isFreeStarter) {
      cost = 0;
    } else {
      cost = count === 1 ? subPack.priceTokens : subPack.priceTokens * 9; // 10% discount on 10x!
      if (profile.knowledgeTokens < cost) {
        sound.playErrorFizzle();
        setErrorMessage(`Không đủ Knowledge Tokens! Cần ${cost} Tokens (Bạn đang có: ${profile.knowledgeTokens}).`);
        setTimeout(() => setErrorMessage(null), 3500);
        return;
      }
    }

    sound.playCardSelect();
    setOpeningSubPack(subPack);
    setPullCount(count);
    setIsStarterWelfarePull(isFreeStarter);
    setIsOpeningAnimation(true);
    setRevealedIndices([]);

    // Roll all cards
    const allRolled: PlayableCardDef[] = [];
    const numPacks = count === 1 ? 1 : 10;
    for (let p = 0; p < numPacks; p++) {
      allRolled.push(...rollSinglePack(subPack));
    }
    setOpenedCards(allRolled);

    // Compute Duplicate Compensation
    const currentCollection = { ...(profile.cardCollection || {}) };
    let shardsGained = 0;
    const dupIndices: number[] = [];

    allRolled.forEach((card, idx) => {
      const existing = currentCollection[card.id] || 0;
      if (existing >= 3) {
        shardsGained += SHARDS_PER_DUPLICATE_RARITY[card.rarity] || 20;
        dupIndices.push(idx);
      } else {
        currentCollection[card.id] = existing + 1;
      }
    });

    setDuplicateSummary({
      totalShardsGained: shardsGained,
      duplicateIndices: dupIndices
    });

    // Persist immediately to Profile
    onUpdateProfile((prev) => {
      return {
        ...prev,
        knowledgeTokens: isFreeStarter ? prev.knowledgeTokens : prev.knowledgeTokens - cost,
        hasClaimedFree10Pack: isFreeStarter ? true : prev.hasClaimedFree10Pack,
        elementalShards: (prev.elementalShards || 0) + shardsGained,
        cardCollection: currentCollection
      };
    });

    // Opening animation
    setTimeout(() => {
      setIsOpeningAnimation(false);
      sound.playVictory();
    }, 1200);
  };

  const handleRevealCard = (index: number) => {
    if (!revealedIndices.includes(index)) {
      sound.playCardSelect();
      setRevealedIndices(prev => [...prev, index]);
    }
  };

  const handleRevealAll = () => {
    sound.playExplosion();
    const all = Array.from({ length: openedCards.length }, (_, i) => i);
    setRevealedIndices(all);
  };

  const handleCloseOpening = () => {
    sound.playUiClick();
    setOpeningSubPack(null);
    setOpenedCards([]);
    setRevealedIndices([]);
    setDuplicateSummary({ totalShardsGained: 0, duplicateIndices: [] });
  };

  // Filtered packs list
  const filteredPacks = useMemo(() => {
    let list: BoosterSubPackDef[] = [];

    if (activeCategory === 'ALL') {
      list = [
        ...THEMATIC_BOOSTER_BOXES.flatMap(b => b.subPacks),
        ...GRADE_BOOSTER_PACKS,
        ...SUBSTANCE_BOOSTER_PACKS,
        ...CHAPTER_BOOSTER_PACKS,
        ...ARCHETYPE_BOOSTER_PACKS
      ];
    } else if (activeCategory === 'BOXES') {
      list = THEMATIC_BOOSTER_BOXES.flatMap(b => b.subPacks);
    } else if (activeCategory === 'GRADE') {
      list = GRADE_BOOSTER_PACKS.filter(p => selectedGrade === 'ALL' || p.gradeLevel === selectedGrade);
    } else if (activeCategory === 'SUBSTANCE') {
      list = SUBSTANCE_BOOSTER_PACKS;
    } else if (activeCategory === 'CHAPTER') {
      list = CHAPTER_BOOSTER_PACKS;
    } else if (activeCategory === 'ARCHETYPE') {
      list = ARCHETYPE_BOOSTER_PACKS;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, selectedGrade, searchQuery]);

  return (
    <div className="min-h-screen bg-obsidian text-ivory p-4 max-w-7xl mx-auto flex flex-col gap-4 select-none animate-fadeIn">
      {/* Top Header: Title & Currency Balance */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-navy/60 border border-navy-light/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-600 to-amber-600 flex items-center justify-center text-ivory shadow-lg shadow-fuchsia-500/20">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-black text-xl text-ivory">
                Cửa Hàng Gói Thẻ Bài (Booster Shop)
              </h1>
              <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300 font-mono text-[10px] font-bold">
                GDPT 2018
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Tách lẻ các gói theo Lớp (10, 11, 12), theo Loại chất, theo Chương sách giáo khoa và 4 Hộp lớn.
            </p>
          </div>
        </div>

        {/* Currency Display & Crafting Sink */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-amber-500/40 text-xs font-mono">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Tokens:</span>
            <strong className="text-amber-300 text-sm">{profile.knowledgeTokens.toLocaleString()}</strong>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-500/40 text-xs font-mono">
            <Sparkles className="w-4 h-4 text-cyan-ion" />
            <span className="text-slate-400">Shards:</span>
            <strong className="text-cyan-ion text-sm">{(profile.elementalShards || 0).toLocaleString()}</strong>
          </div>

          <button
            onClick={() => {
              sound.playUiClick();
              setShowCraftingModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600/30 to-teal-700/30 hover:from-cyan-600/50 hover:to-teal-700/50 text-cyan-300 border border-cyan-500/50 text-xs font-bold font-mono transition-all hover:scale-105 active:scale-95 shadow-md shadow-cyan-500/20"
            title="Mở Xưởng Chế Tạo Thẻ Bằng Elemental Shards"
          >
            <Hammer className="w-4 h-4 text-cyan-400" />
            <span>Xưởng Chế Tạo Thẻ</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono flex items-center gap-2 animate-shake">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          {errorMessage}
        </div>
      )}

      {/* 🎁 PHÚC LỢI TÂN THỦ: MỞ MIỄN PHÍ 10 GÓI THẺ */}
      {!profile.hasClaimedFree10Pack && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 border-2 border-yellow-300 shadow-2xl flex flex-wrap items-center justify-between gap-4 text-obsidian relative overflow-hidden">
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-12 h-12 rounded-xl bg-obsidian text-amber-300 flex items-center justify-center shadow-xl border border-amber-400 shrink-0">
              <Gift className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-obsidian text-amber-300 font-mono text-[10px] font-black uppercase tracking-wider">
                  ★ ĐẶC QUYỀN TÂN THỦ
                </span>
                <span className="text-xs font-mono font-black text-obsidian uppercase bg-yellow-300/90 px-2 py-0.5 rounded border border-yellow-600">
                  TIẾT KIỆM 900 TOKENS (MIỄN PHÍ 100%)
                </span>
              </div>
              <h2 className="font-serif font-black text-xl text-obsidian mt-0.5 drop-shadow-sm">
                PHÚC LỢI KHỞI ĐẦU: MỞ MIỄN PHÍ 10 GÓI THẺ (50 LÁ BÀI TỰ CHỌN)!
              </h2>
              <p className="text-xs font-bold text-obsidian/90 mt-0.5">
                Chọn bất kỳ Gói lẻ nào bên dưới (theo Lớp, Loại chất, Chương hoặc Hộp lớn) và bấm nút &quot;Mở 10 Gói Miễn Phí&quot;!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 PHÚC LỢI HÀNG NGÀY & CHỢ THẺ LUÂN PHIÊN (DAILY FREE & ROTATING SINGLES) */}
      <DailyMarketplaceSection
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        onOpenFreePack={() => handleExecutePull(THEMATIC_BOOSTER_BOXES[0].subPacks[0], 1, true)}
      />

      {/* Multi-Dimensional Category Navigation Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-navy/50 border border-navy-light/40">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveCategory('ALL');
              setSelectedBox(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
              activeCategory === 'ALL'
                ? 'bg-cyan-ion text-obsidian font-bold shadow-md shadow-cyan-ion/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tất Cả ({GRADE_BOOSTER_PACKS.length + SUBSTANCE_BOOSTER_PACKS.length + CHAPTER_BOOSTER_PACKS.length + ARCHETYPE_BOOSTER_PACKS.length + 8})</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveCategory('GRADE');
              setSelectedBox(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
              activeCategory === 'GRADE'
                ? 'bg-fuchsia-500 text-obsidian font-bold shadow-md shadow-fuchsia-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Theo Lớp (10-11-12)</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveCategory('SUBSTANCE');
              setSelectedBox(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
              activeCategory === 'SUBSTANCE'
                ? 'bg-emerald-500 text-obsidian font-bold shadow-md shadow-emerald-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>Theo Loại Chất</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveCategory('CHAPTER');
              setSelectedBox(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
              activeCategory === 'CHAPTER'
                ? 'bg-amber-500 text-obsidian font-bold shadow-md shadow-amber-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Theo Chương GDPT</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveCategory('ARCHETYPE');
              setSelectedBox(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
              activeCategory === 'ARCHETYPE'
                ? 'bg-rose-500 text-obsidian font-bold shadow-md shadow-rose-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Bộ Chiến Thuật</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveCategory('BOXES');
              setSelectedBox(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
              activeCategory === 'BOXES'
                ? 'bg-purple-500 text-obsidian font-bold shadow-md shadow-purple-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>4 Hộp Lớn</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm gói thẻ hoặc chủ đề..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-black/60 border border-navy-light text-xs font-mono text-ivory placeholder-slate-500 focus:outline-none focus:border-cyan-ion"
          />
        </div>
      </div>

      {/* Sub-Filters for Grade Category */}
      {activeCategory === 'GRADE' && (
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-fuchsia-400" />
            Lọc theo khối:
          </span>
          {(['ALL', 'LOP_10', 'LOP_11', 'LOP_12'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => {
                sound.playUiClick();
                setSelectedGrade(grade);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                selectedGrade === grade
                  ? 'bg-fuchsia-600 text-white shadow'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              {grade === 'ALL' ? 'Tất Cả Khối' : grade.replace('_', ' ')}
            </button>
          ))}
        </div>
      )}

      {/* Packs Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPacks.map((pack) => {
          const featuredCards = pack.featuredCardIds
            .map(id => PLAYABLE_CARDS.find(c => c.id === id))
            .filter((c): c is PlayableCardDef => Boolean(c));

          return (
            <div
              key={pack.id}
              className="rounded-2xl border border-navy-light/60 bg-gradient-to-br from-navy/90 via-obsidian to-navy-dark overflow-hidden shadow-xl hover:border-cyan-ion/40 transition-all flex flex-col justify-between"
            >
              {/* Pack Banner */}
              <div className={`p-4 bg-gradient-to-r ${pack.bannerGradient} relative text-white`}>
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-black/60 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {pack.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/20 text-white font-mono text-[10px] font-bold backdrop-blur-sm">
                    100 Tokens / Gói
                  </span>
                </div>
                <h3 className="font-serif font-black text-lg text-white mt-2 leading-tight drop-shadow">
                  {pack.name}
                </h3>
                <p className="text-[11px] font-mono text-white/90 mt-0.5 font-medium">
                  {pack.subtitle}
                </p>
              </div>

              {/* Body Content */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {pack.description}
                </p>

                {/* Featured Cards Previews */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Lá Bài Nổi Bật Trong Gói:</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {featuredCards.map((card) => (
                      <div
                        key={card.id}
                        className="p-1 rounded bg-black/50 border border-navy-light/60 hover:border-cyan-ion transition-all text-center group cursor-pointer"
                        title={`${card.name} (${card.chemicalFormula || card.cardType}) - ${card.rarity}`}
                      >
                        <div className="text-[10px] font-mono font-bold text-cyan-300 truncate">
                          {card.chemicalFormula || card.name.split(' ')[0]}
                        </div>
                        <div className="text-[8px] font-mono text-slate-400 truncate">
                          {card.rarity.replace('_', ' ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase Action Buttons & Details */}
                <div className="pt-2 border-t border-navy-light/40 space-y-2">
                  {/* Pack Details & Odds Button */}
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setInspectingPack(pack);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-navy/80 hover:bg-navy-light text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center justify-center gap-1.5"
                    title="Xem chi tiết các lá trong gói, tỉ lệ rơi và bảo hiểm"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Xem Thẻ & Tỉ Lệ Rơi</span>
                  </button>

                  {/* Free Starter Welfare Button */}
                  {!profile.hasClaimedFree10Pack && (
                    <button
                      onClick={() => handleExecutePull(pack, 10, true)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-obsidian font-bold text-xs font-mono shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-yellow-300"
                    >
                      <Gift className="w-4 h-4 text-obsidian" />
                      <span>MỞ MIỄN PHÍ 10 GÓI (50 LÁ TÂN THỦ)</span>
                    </button>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleExecutePull(pack, 1, false)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold transition-all border border-slate-700 hover:border-cyan-ion/60 flex items-center justify-center gap-1.5"
                    >
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mở 1 Gói (100)</span>
                    </button>

                    <button
                      onClick={() => handleExecutePull(pack, 10, false)}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-fuchsia-700 to-purple-800 hover:from-fuchsia-600 hover:to-purple-700 text-white font-mono text-xs font-bold transition-all shadow-md hover:shadow-fuchsia-500/20 flex items-center justify-center gap-1.5 border border-fuchsia-500/50"
                      title="Mở 10 gói tiết kiệm 10% (Chỉ 900 Tokens)"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Mở 10 Gói (900)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPacks.length === 0 && (
        <div className="p-8 text-center rounded-2xl bg-navy/40 border border-navy-light text-slate-400 font-mono text-sm space-y-2">
          <p>Không tìm thấy gói thẻ phù hợp với từ khóa &quot;{searchQuery}&quot;.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('ALL');
            }}
            className="px-3 py-1.5 rounded-lg bg-cyan-ion text-obsidian text-xs font-bold"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {/* Interactive Pack Opening Modal */}
      {openingSubPack && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="max-w-5xl w-full bg-navy border border-navy-light/80 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-navy-light/60 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-mono text-[10px] font-bold">
                    {pullCount === 1 ? '1 GÓI (5 LÁ)' : '10 GÓI (50 LÁ)'}
                  </span>
                  <h2 className="font-serif font-black text-xl text-ivory">
                    {openingSubPack.name}
                  </h2>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Bấm vào từng lá bài để lật mở, hoặc dùng nút &quot;Mở Tất Cả&quot;.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRevealAll}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-obsidian font-mono font-bold text-xs transition-all shadow"
                >
                  Mở Tất Cả ({openedCards.length})
                </button>
                <button
                  onClick={handleCloseOpening}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-all"
                >
                  Đóng
                </button>
              </div>
            </div>

            {/* Duplicate Shards Compensation Banner */}
            {duplicateSummary.totalShardsGained > 0 && (
              <div className="p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-between text-xs font-mono text-cyan-300">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-ion" />
                  <span>
                    Quy đổi {duplicateSummary.duplicateIndices.length} lá bài trùng lặp (đã sở hữu &ge; 3 bản sao):
                  </span>
                </div>
                <strong className="text-sm font-bold text-cyan-ion">
                  +{duplicateSummary.totalShardsGained} Elemental Shards
                </strong>
              </div>
            )}

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 my-2">
              {openedCards.map((card, idx) => {
                const isRevealed = revealedIndices.includes(idx);
                const isDuplicate = duplicateSummary.duplicateIndices.includes(idx);

                return (
                  <div
                    key={`${card.id}_${idx}`}
                    onClick={() => handleRevealCard(idx)}
                    className="relative cursor-pointer group transition-all transform hover:scale-105"
                  >
                    {isRevealed ? (
                      <div className="relative">
                        <ChemicalCardView
                          card={card}
                          size="sm"
                        />
                        {isDuplicate && (
                          <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-[8px] font-mono font-bold">
                            +{SHARDS_PER_DUPLICATE_RARITY[card.rarity] || 20} Shards
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-[5/7] rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/40 flex flex-col items-center justify-center p-3 shadow-lg group-hover:border-cyan-ion transition-all">
                        <div className="w-10 h-10 rounded-full bg-indigo-900/60 flex items-center justify-center text-cyan-300 border border-indigo-400/40 mb-2">
                          <Atom className="w-5 h-5 animate-spin" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 text-center uppercase tracking-wider">
                          Lá Bài #{idx + 1}
                        </span>
                        <span className="text-[9px] font-mono text-cyan-400 mt-1">
                          (Click để mở)
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between border-t border-navy-light/60 pt-3">
              <span className="text-xs font-mono text-slate-400">
                Đã lật: {revealedIndices.length} / {openedCards.length} lá bài
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExecutePull(openingSubPack, pullCount, false)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-700 hover:from-fuchsia-500 hover:to-purple-600 text-white font-mono text-xs font-bold transition-all shadow"
                >
                  Mở Tiếp ({pullCount === 1 ? '100 Tokens' : '900 Tokens'})
                </button>
                <button
                  onClick={handleCloseOpening}
                  className="px-4 py-2 rounded-xl bg-cyan-ion text-obsidian font-mono text-xs font-bold transition-all shadow-md shadow-cyan-ion/20 hover:brightness-110"
                >
                  Hoàn Tất & Thu Thập
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Crafting & Duplicate Disenchant Chamber */}
      {showCraftingModal && (
        <CardCraftingModal
          profile={profile}
          onUpdateProfile={onUpdateProfile}
          onClose={() => setShowCraftingModal(false)}
        />
      )}

      {/* Pack Details & Card Pool Gallery Modal */}
      {inspectingPack && (
        <PackDetailModal
          subPack={inspectingPack}
          playerTokens={profile.knowledgeTokens}
          collectionOwned={profile.cardCollection || {}}
          onClose={() => setInspectingPack(null)}
          onBuyPack={(pack, count) => {
            setInspectingPack(null);
            handleExecutePull(pack, count, false);
          }}
        />
      )}
    </div>
  );
};
