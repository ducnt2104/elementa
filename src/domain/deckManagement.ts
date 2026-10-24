// src/domain/deckManagement.ts
// Comprehensive 9-Slot Deck Management & Strict TCG Validation Engine for ELEMENTA

import { PLAYABLE_CARDS, getPlayableCardById } from '../data/playableCardsData';
import { PlayableCardDef } from './cardGameTypes';

export interface DeckSlot {
  slotIndex: number; // 0 to 8 (9 slots total)
  id: string;
  name: string;
  coverCardId?: string;
  archetype?: string;
  isFavorite?: boolean;
  isDefault?: boolean;
  mainDeck: string[]; // Array of card IDs
  extraDeck: string[]; // Array of card IDs
  sideDeck?: string[]; // Array of card IDs (up to 15 cards, Rulebook v10 tr. 6)
  updatedAt: number;
}

export type CardBanStatus = 'FORBIDDEN' | 'LIMITED' | 'SEMI_LIMITED' | 'UNLIMITED';

export type TournamentFormat = 'STANDARD_GDPT' | 'CLASSROOM_SAFE' | 'UNLIMITED';

export interface BanlistRule {
  cardId: string;
  cardName: string;
  status: CardBanStatus;
  maxCopies: number;
  reason: string;
}

export interface BanlistViolation {
  cardId: string;
  cardName: string;
  count: number;
  allowed: number;
  status: CardBanStatus;
  reason: string;
}

export interface DeckValidationResult {
  isValid: boolean;
  format?: TournamentFormat;
  errors: string[];
  warnings: string[];
  mainCount: number;
  extraCount: number;
  sideCount: number;
  monsterCount: number;
  spellCount: number;
  trapCount: number;
  cardCounts: Record<string, number>;
  banlistViolations?: BanlistViolation[];
  missingOwnedCards?: { id: string; name: string; needed: number; owned: number }[];
}

export interface DeckSynergyAnalysis {
  synergyScore: number; // 0 to 100
  dominantArchetype: 'NITRO_LEGION' | 'SULFUR_FORGE' | 'ALKALI_HALOGEN' | 'ORGANIC_SYNTHESIS' | 'MIXED_HYBRID';
  elementalGroups: {
    alkali: number;
    halogen: number;
    transition: number;
    noble: number;
    chalcogen: number;
    pnictogen: number;
    organic: number;
  };
  redoxBalance: {
    oxidants: number;
    reductants: number;
    ratio: string;
    isBalanced: boolean;
  };
  goldenRatio: {
    attackCount: number;
    environmentCount: number;
    defenseCount: number;
    actualRatio: string;
    isOptimal: boolean;
    pedagogicalAdvice: string;
  };
  chemicalCombosAvailable: string[];
  recommendations: string[];
}

const STORAGE_KEY = 'elementa_deck_slots_v2';
export const TOTAL_DECK_SLOTS = 9;
export const MIN_MAIN_DECK_CARDS = 30;
export const MAX_MAIN_DECK_CARDS = 60;
export const MAX_EXTRA_DECK_CARDS = 15;
export const MAX_SIDE_DECK_CARDS = 15; // Master Rule Official Rulebook v10 tr. 6
export const MAX_COPIES_PER_CARD = 3;

// Default Pre-built Starter Archetypes & GDPT 2018 Competition Decks
export const PREBUILT_DECKS: Omit<DeckSlot, 'slotIndex'>[] = [
  {
    id: 'deck_slot_nitro_legion',
    name: 'Quân Đoàn Nitơ & Haber-Bosch',
    archetype: 'NITRO_LEGION',
    coverCardId: 'card_elem_7_n',
    isFavorite: true,
    isDefault: true,
    mainDeck: [
      'card_elem_7_n', 'card_elem_7_n', 'card_elem_7_n',
      'card_elem_1_h', 'card_elem_1_h', 'card_elem_1_h',
      'card_comp_nh3', 'card_comp_nh3', 'card_comp_nh3',
      'card_comp_no2_gas', 'card_comp_no2_gas',
      'card_comp_nh4cl_smoke', 'card_comp_nh4cl_smoke',
      'card_comp_hno3_acid', 'card_comp_hno3_acid',
      'card_spell_haber_synthesis', 'card_spell_haber_synthesis',
      'card_trap_ammonium_smoke', 'card_trap_ammonium_smoke', 'card_trap_ammonium_smoke',
      'card_spell_tribute_extraction', 'card_spell_tribute_extraction',
      'card_spell_catalytic_life_draw', 'card_spell_catalytic_life_draw',
      'card_elem_11_na', 'card_elem_11_na',
      'card_elem_17_cl', 'card_elem_17_cl',
      'card_spell_neutralization', 'card_spell_neutralization'
    ],
    extraDeck: [
      'card_link_nitrogen_triple', 'card_link_nitrogen_triple',
      'card_comp_nacl', 'card_comp_nacl'
    ],
    sideDeck: [
      'card_comp_hno3_acid',
      'card_comp_fe2o3',
      'card_spell_neutralization'
    ],
    updatedAt: Date.now()
  },
  {
    id: 'deck_slot_sulfur_forge',
    name: 'Lò Rèn Lưu Huỳnh & H₂SO₄',
    archetype: 'SULFUR_FORGE',
    coverCardId: 'card_elem_16_s',
    isFavorite: false,
    isDefault: false,
    mainDeck: [
      'card_elem_16_s', 'card_elem_16_s', 'card_elem_16_s',
      'card_comp_so2_gas', 'card_comp_so2_gas', 'card_comp_so2_gas',
      'card_comp_h2s_rotten', 'card_comp_h2s_rotten',
      'card_comp_baso4_shield', 'card_comp_baso4_shield', 'card_comp_baso4_shield',
      'card_comp_h2so4_oleum', 'card_comp_h2so4_oleum',
      'card_spell_contact_process', 'card_spell_contact_process',
      'card_spell_charring_dehydration', 'card_spell_charring_dehydration',
      'card_trap_h2s_rotten_shield', 'card_trap_h2s_rotten_shield', 'card_trap_h2s_rotten_shield',
      'card_spell_grave_filtration', 'card_spell_grave_filtration',
      'card_elem_26_fe', 'card_elem_26_fe', 'card_elem_26_fe',
      'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o',
      'card_comp_fe2o3', 'card_comp_fe2o3'
    ],
    extraDeck: [
      'card_link_disulfide_bridge', 'card_link_disulfide_bridge',
      'card_comp_h2so4', 'card_comp_h2so4'
    ],
    sideDeck: [
      'card_comp_fe2o3',
      'card_comp_h2s_rotten',
      'card_spell_grave_filtration'
    ],
    updatedAt: Date.now()
  },
  {
    id: 'deck_slot_alkali_halogen',
    name: 'Bão Lửa Kiềm & Halogen',
    archetype: 'ALKALI_HALOGEN',
    coverCardId: 'card_elem_11_na',
    isFavorite: false,
    isDefault: false,
    mainDeck: [
      'card_elem_11_na', 'card_elem_11_na', 'card_elem_11_na',
      'card_elem_19_k', 'card_elem_19_k',
      'card_elem_9_f', 'card_elem_9_f',
      'card_elem_17_cl', 'card_elem_17_cl', 'card_elem_17_cl',
      'card_comp_hcl', 'card_comp_hcl',
      'card_comp_naoh', 'card_comp_naoh',
      'card_trap_sodium_explosion', 'card_trap_sodium_explosion', 'card_trap_sodium_explosion',
      'card_spell_neutralization', 'card_spell_neutralization',
      'card_spell_mass_spec_draw', 'card_spell_mass_spec_draw',
      'card_elem_1_h', 'card_elem_1_h', 'card_elem_1_h',
      'card_comp_h2o', 'card_comp_h2o', 'card_comp_h2o',
      'card_spell_catalytic_life_draw', 'card_spell_catalytic_life_draw', 'card_spell_tribute_extraction'
    ],
    extraDeck: [
      'card_comp_nacl', 'card_comp_nacl', 'card_comp_nacl',
      'card_link_disulfide_bridge'
    ],
    sideDeck: [
      'card_elem_19_k',
      'card_comp_hcl',
      'card_spell_neutralization'
    ],
    updatedAt: Date.now()
  },
  {
    id: 'deck_slot_organic_synthesis',
    name: 'Tổng Hợp Hữu Cơ & Este Hóa',
    archetype: 'ORGANIC_SYNTHESIS',
    coverCardId: 'card_elem_6_c',
    isFavorite: false,
    isDefault: false,
    mainDeck: [
      'card_elem_6_c', 'card_elem_6_c', 'card_elem_6_c',
      'card_elem_1_h', 'card_elem_1_h', 'card_elem_1_h',
      'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o',
      'card_comp_c2h5oh', 'card_comp_c2h5oh', 'card_comp_c2h5oh',
      'card_comp_ch3cooh', 'card_comp_ch3cooh', 'card_comp_ch3cooh',
      'card_comp_ch3cooc2h5', 'card_comp_ch3cooc2h5',
      'card_comp_glucose', 'card_comp_glucose',
      'card_comp_co2', 'card_comp_co2',
      'card_spell_esterification', 'card_spell_esterification', 'card_spell_esterification',
      'card_spell_tollens_mirror', 'card_spell_tollens_mirror',
      'card_trap_saponification', 'card_trap_saponification',
      'card_spell_charring_dehydration', 'card_spell_charring_dehydration'
    ],
    extraDeck: [
      'card_link_2_ethylene', 'card_link_2_ethylene',
      'card_link_4_diamond',
      'card_comp_h2o', 'card_comp_h2o'
    ],
    sideDeck: [
      'card_spell_tollens_mirror',
      'card_comp_naoh',
      'card_spell_catalytic_life_draw'
    ],
    updatedAt: Date.now()
  },
  {
    id: 'deck_slot_khtn_8',
    name: 'KHTN 8: Khí Quyển & Bảo Toàn Khối Lượng',
    archetype: 'KHTN_8_FOUNDATION',
    coverCardId: 'card_elem_8_o',
    isFavorite: true,
    isDefault: false,
    mainDeck: [
      'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o',
      'card_elem_1_h', 'card_elem_1_h', 'card_elem_1_h',
      'card_elem_11_na', 'card_elem_11_na', 'card_elem_11_na',
      'card_elem_26_fe', 'card_elem_26_fe', 'card_elem_26_fe',
      'card_elem_13_al', 'card_elem_13_al',
      'card_comp_h2o', 'card_comp_h2o', 'card_comp_h2o',
      'card_comp_fe2o3', 'card_comp_fe2o3',
      'card_comp_co2', 'card_comp_co2',
      'card_spell_bunsen_burner', 'card_spell_bunsen_burner',
      'card_spell_exothermic_burst', 'card_spell_exothermic_burst',
      'card_spell_mass_spec_draw', 'card_spell_mass_spec_draw',
      'card_trap_sodium_explosion', 'card_trap_sodium_explosion', 'card_trap_sodium_explosion'
    ],
    extraDeck: [
      'card_comp_nacl', 'card_comp_nacl',
      'card_link_nitrogen_triple', 'card_link_nitrogen_triple'
    ],
    sideDeck: [
      'card_spell_displacement',
      'card_comp_naoh',
      'card_spell_neutralization'
    ],
    updatedAt: Date.now()
  },
  {
    id: 'deck_slot_khtn_9',
    name: 'KHTN 9: Dãy Hoạt Động Kim Loại & Halogen',
    archetype: 'KHTN_9_REACTIVITY',
    coverCardId: 'card_elem_26_fe',
    isFavorite: true,
    isDefault: false,
    mainDeck: [
      'card_elem_26_fe', 'card_elem_26_fe', 'card_elem_26_fe',
      'card_elem_29_cu', 'card_elem_29_cu', 'card_elem_29_cu',
      'card_elem_13_al', 'card_elem_13_al', 'card_elem_13_al',
      'card_elem_17_cl', 'card_elem_17_cl', 'card_elem_17_cl',
      'card_comp_hcl', 'card_comp_hcl', 'card_comp_hcl',
      'card_comp_naoh', 'card_comp_naoh',
      'card_spell_displacement', 'card_spell_displacement', 'card_spell_displacement',
      'card_spell_neutralization', 'card_spell_neutralization',
      'card_spell_gas_chromatography', 'card_spell_gas_chromatography',
      'card_spell_mass_spec_draw', 'card_spell_mass_spec_draw',
      'card_trap_sodium_explosion', 'card_trap_sodium_explosion',
      'card_comp_nacl', 'card_elem_11_na'
    ],
    extraDeck: [
      'card_comp_fe2o3', 'card_comp_fe2o3',
      'card_comp_nacl', 'card_comp_nacl'
    ],
    sideDeck: [
      'card_elem_11_na',
      'card_spell_bunsen_burner',
      'card_comp_h2o'
    ],
    updatedAt: Date.now()
  },
  {
    id: 'deck_slot_hoa_10',
    name: 'Hóa 10: Cấu Hình Electron & Oxi Hóa - Khử',
    archetype: 'HOA_10_REDOX',
    coverCardId: 'card_elem_17_cl',
    isFavorite: true,
    isDefault: false,
    mainDeck: [
      'card_elem_17_cl', 'card_elem_17_cl', 'card_elem_17_cl',
      'card_elem_11_na', 'card_elem_11_na', 'card_elem_11_na',
      'card_elem_26_fe', 'card_elem_26_fe', 'card_elem_26_fe',
      'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o',
      'card_elem_1_h', 'card_elem_1_h',
      'card_spell_periodic_rift_field', 'card_spell_periodic_rift_field',
      'card_spell_exothermic_burst', 'card_spell_exothermic_burst',
      'card_spell_mass_spec_draw', 'card_spell_mass_spec_draw',
      'card_spell_gas_chromatography', 'card_spell_gas_chromatography',
      'card_spell_neutralization', 'card_spell_neutralization',
      'card_comp_hcl', 'card_comp_hcl',
      'card_trap_sodium_explosion', 'card_trap_sodium_explosion', 'card_trap_sodium_explosion',
      'card_comp_nacl'
    ],
    extraDeck: [
      'card_link_nitrogen_triple', 'card_link_nitrogen_triple',
      'card_comp_h2o', 'card_comp_h2o'
    ],
    sideDeck: [
      'card_spell_displacement',
      'card_elem_29_cu',
      'card_comp_fe2o3'
    ],
    updatedAt: Date.now()
  }
];

export const FORMAT_BANLISTS: Record<TournamentFormat, Record<string, BanlistRule>> = {
  STANDARD_GDPT: {
    card_comp_thermite: {
      cardId: 'card_comp_thermite',
      cardName: 'Hỗn Hợp Nhiệt Nhôm (Thermite)',
      status: 'LIMITED',
      maxCopies: 1,
      reason: 'Phản ứng tỏa nhiệt cực hạn (>2500°C), giới hạn 1 bản sao trong chuẩn GDPT 2018.'
    },
    card_b10_002_fluoroantimonic_superacid_sovereign_2: {
      cardId: 'card_b10_002_fluoroantimonic_superacid_sovereign_2',
      cardName: 'Chúa Tể Siêu Axit Fluoroantimonic',
      status: 'LIMITED',
      maxCopies: 1,
      reason: 'Siêu axit mạnh nhất vũ trụ (H0 = -31.3), giới hạn 1 bản sao để duy trì cân bằng trận đấu.'
    }
  },
  CLASSROOM_SAFE: {
    card_comp_thermite: {
      cardId: 'card_comp_thermite',
      cardName: 'Hỗn Hợp Nhiệt Nhôm (Thermite)',
      status: 'FORBIDDEN',
      maxCopies: 0,
      reason: 'Cấm sử dụng trong phòng thực hành học sinh do nguy cơ cháy nổ cực đoan.'
    },
    card_b10_002_fluoroantimonic_superacid_sovereign_2: {
      cardId: 'card_b10_002_fluoroantimonic_superacid_sovereign_2',
      cardName: 'Chúa Tể Siêu Axit Fluoroantimonic',
      status: 'FORBIDDEN',
      maxCopies: 0,
      reason: 'Hóa chất nguy hại cấp độ đặc biệt, nghiêm cấm trong định dạng thực hành an toàn.'
    },
    card_trap_sodium_explosion: {
      cardId: 'card_trap_sodium_explosion',
      cardName: 'Cạm Bẫy Nổ Natri Trong Nước',
      status: 'LIMITED',
      maxCopies: 1,
      reason: 'Chỉ cho phép 1 bản sao thí nghiệm biểu diễn có giáo viên giám sát.'
    },
    card_comp_no2_gas: {
      cardId: 'card_comp_no2_gas',
      cardName: 'Khí Nitơ Đioxit (NO2)',
      status: 'LIMITED',
      maxCopies: 1,
      reason: 'Khí độc tính cao đường hô hấp, hạn chế 1 bản sao trong tủ hút.'
    }
  },
  UNLIMITED: {}
};

export class DeckManagementService {
  /**
   * Retrieves active banlist rules for a specific tournament or classroom format
   */
  public static getBanlistForFormat(format: TournamentFormat = 'STANDARD_GDPT'): Record<string, BanlistRule> {
    return FORMAT_BANLISTS[format] || {};
  }

  /**
   * Inspects copy restrictions and ban status for a single card in a format
   */
  public static getCardBanStatus(
    cardId: string,
    format: TournamentFormat = 'STANDARD_GDPT'
  ): { status: CardBanStatus; maxCopies: number; reason?: string } {
    const banlist = this.getBanlistForFormat(format);
    const rule = banlist[cardId];
    if (rule) {
      return {
        status: rule.status,
        maxCopies: rule.maxCopies,
        reason: rule.reason
      };
    }
    return {
      status: 'UNLIMITED',
      maxCopies: MAX_COPIES_PER_CARD
    };
  }

  /**
   * Validate a deck against strict TCG rules and format banlist
   */
  public static validateDeck(
    mainDeck: string[],
    extraDeck: string[] = [],
    sideDeck: string[] = [],
    ownedCollection?: Record<string, number>,
    format: TournamentFormat = 'STANDARD_GDPT'
  ): DeckValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const cardCounts: Record<string, number> = {};
    const banlistViolations: BanlistViolation[] = [];
    const missingOwnedCards: { id: string; name: string; needed: number; owned: number }[] = [];

    // Check Main Deck bounds
    const mainCount = mainDeck.length;
    const extraCount = extraDeck.length;
    const sideCount = sideDeck.length;

    if (mainCount === 0) {
      errors.push('Bộ bài rỗng! Cần tối thiểu 30 lá bài trong Main Deck.');
    } else if (mainCount < MIN_MAIN_DECK_CARDS) {
      errors.push(`Chưa đủ số bài tối thiểu: Hiện có ${mainCount}/${MIN_MAIN_DECK_CARDS} lá (thiếu ${MIN_MAIN_DECK_CARDS - mainCount} lá).`);
    } else if (mainCount > MAX_MAIN_DECK_CARDS) {
      errors.push(`Vượt quá giới hạn tối đa: Hiện có ${mainCount}/${MAX_MAIN_DECK_CARDS} lá (vượt ${mainCount - MAX_MAIN_DECK_CARDS} lá).`);
    }

    // Check Extra Deck bounds
    if (extraCount > MAX_EXTRA_DECK_CARDS) {
      errors.push(`Extra Deck vượt quá giới hạn: Hiện có ${extraCount}/${MAX_EXTRA_DECK_CARDS} lá.`);
    }

    // Check Side Deck bounds (Rulebook v10 tr. 6: max 15 cards)
    if (sideCount > MAX_SIDE_DECK_CARDS) {
      errors.push(`Side Deck vượt quá giới hạn: Hiện có ${sideCount}/${MAX_SIDE_DECK_CARDS} lá.`);
    }

    // Count copies across Main, Extra, and Side Decks
    let monsterCount = 0;
    let spellCount = 0;
    let trapCount = 0;

    for (const id of [...mainDeck, ...extraDeck, ...sideDeck]) {
      cardCounts[id] = (cardCounts[id] || 0) + 1;
      const cardDef = getPlayableCardById(id);
      if (cardDef) {
        if (cardDef.cardType === 'ELEMENT_MONSTER' || cardDef.cardType === 'COMPOUND_MONSTER' || cardDef.cardType === 'LINK_MONSTER') {
          monsterCount++;
        } else if (cardDef.cardType === 'TRAP') {
          trapCount++;
        } else {
          spellCount++;
        }
      }
    }

    // Check 3-copy limit across Main + Extra + Side combined
    for (const [id, count] of Object.entries(cardCounts)) {
      if (count > MAX_COPIES_PER_CARD) {
        const cardDef = getPlayableCardById(id);
        const name = cardDef ? cardDef.name : id;
        errors.push(`Lá bài "${name}" vượt quá giới hạn ${MAX_COPIES_PER_CARD} bản sao (hiện có ${count} lá).`);
      }
    }

    // Check Format Banlist Rules
    const activeBanlist = this.getBanlistForFormat(format);
    for (const [id, count] of Object.entries(cardCounts)) {
      const banRule = activeBanlist[id];
      if (banRule && count > banRule.maxCopies) {
        const cardDef = getPlayableCardById(id);
        const name = cardDef ? cardDef.name : banRule.cardName;
        banlistViolations.push({
          cardId: id,
          cardName: name,
          count,
          allowed: banRule.maxCopies,
          status: banRule.status,
          reason: banRule.reason
        });
        errors.push(
          `[BANLIST: ${banRule.status}] "${name}" vượt quá hạn mức định dạng ${format}: Tối đa ${banRule.maxCopies} lá (đang dùng ${count} lá). ${banRule.reason}`
        );
      }
    }

    // Check Player Collection Ownership limit (Section 7.2: Deck Builder must strictly validate owned cards)
    if (ownedCollection) {
      for (const [id, count] of Object.entries(cardCounts)) {
        const owned = ownedCollection[id] || 0;
        if (count > owned) {
          const cardDef = getPlayableCardById(id);
          const name = cardDef ? cardDef.name : id;
          missingOwnedCards.push({ id, name, needed: count, owned });
          if (owned === 0) {
            errors.push(`Chưa sở hữu lá bài: "${name}" (cần ${count} lá nhưng chưa có trong Kho thẻ).`);
          } else {
            errors.push(`Thiếu bản sao sở hữu: "${name}" (cần ${count} lá nhưng chỉ sở hữu ${owned} trong Kho thẻ).`);
          }
        }
      }
    }

    // Advice warnings
    if (monsterCount < 10 && mainCount >= MIN_MAIN_DECK_CARDS) {
      warnings.push('Cảnh báo chiến thuật: Số lượng Quái thú quá ít (< 10) có thể khiến bạn thiếu quân trên sân.');
    }
    if (monsterCount > 25 && mainCount >= MIN_MAIN_DECK_CARDS) {
      warnings.push('Cảnh báo chiến thuật: Tỷ lệ Quái thú quá cao có thể làm giảm khả năng kích hoạt phản ứng phép.');
    }

    return {
      isValid: errors.length === 0,
      format,
      errors,
      warnings,
      mainCount,
      extraCount,
      sideCount,
      monsterCount,
      spellCount,
      trapCount,
      cardCounts,
      banlistViolations,
      missingOwnedCards
    };
  }

  /**
   * Evaluates elemental synergy, redox balance, and available chemical combos
   */
  public static analyzeDeckSynergy(mainDeck: string[], extraDeck: string[] = []): DeckSynergyAnalysis {
    const mainDefs = mainDeck.map(id => getPlayableCardById(id)).filter((c): c is PlayableCardDef => c !== undefined);
    const extraDefs = extraDeck.map(id => getPlayableCardById(id)).filter((c): c is PlayableCardDef => c !== undefined);
    const allDefs = [...mainDefs, ...extraDefs];

    // 1. Elemental Groups Counting
    const groups = {
      alkali: 0,
      halogen: 0,
      transition: 0,
      noble: 0,
      chalcogen: 0,
      pnictogen: 0,
      organic: 0
    };

    let reductants = 0;
    let oxidants = 0;

    for (const card of allDefs) {
      const z = card.atomicNumber || 0;
      const f = card.chemicalFormula || '';

      // Pnictogen (Nitrogen group): N (7), P (15) or NH3, NO2, NH4Cl, HNO3
      if ([7, 15].includes(z) || /^(N2?$|NH|NO|HNO)/.test(f)) {
        groups.pnictogen++;
        if (f.includes('HNO3') || f.includes('NO2')) oxidants++;
        if (f.includes('NH3')) reductants++;
      }
      // Chalcogen (Oxygen/Sulfur group): O (8), S (16) or SO2, H2SO4, H2S, FeS, BaSO4
      else if ([8, 16, 34].includes(z) || /^(O2?$|S8?$|SO|H2S|FeS|BaSO)/.test(f)) {
        groups.chalcogen++;
        if (f.includes('O2') || f.includes('H2SO4') || f.includes('SO3')) oxidants++;
        if (f.includes('H2S') || f === 'S') reductants++;
      }
      // Alkali: Li (3), Na (11), K (19), Rb (37), Cs (55) or Na, K, Li, NaOH
      else if ([3, 11, 19, 37, 55].includes(z) || /^(Li|Na|K|Rb|Cs)/.test(f)) {
        groups.alkali++;
        reductants++;
      }
      // Halogen: F (9), Cl (17), Br (35), I (53) or F2, Cl2, Br2, HCl, NaCl
      else if ([9, 17, 35, 53].includes(z) || /(F2?$|Cl2?$|Br2?$|I2?$|HCl|NaCl)/.test(f)) {
        groups.halogen++;
        oxidants++;
      }
      // Transition: Sc-Zn (21-30), Ag (47), Pt (78), Au (79), Hg (80)
      else if ((z >= 21 && z <= 30) || [47, 78, 79, 80].includes(z) || /(Fe|Cu|Zn|Ag|Au|Pt|Mn|Cr)/.test(f)) {
        groups.transition++;
        if (['Fe', 'Zn', 'Al'].some(el => f.includes(el))) reductants++;
      }
      // Noble: He (2), Ne (10), Ar (18), Kr (36), Xe (54)
      else if ([2, 10, 18, 36, 54].includes(z) || /^(He|Ne|Ar|Kr|Xe)/.test(f)) {
        groups.noble++;
      }
      // Organic: C (6) or organic formulas
      if (z === 6 || /(C2H5OH|CH3COOH|CH3COOC2H5|C6H12O6|C2H4|C17H35)/.test(f)) {
        groups.organic++;
        if (f.includes('C6H12O6') || f.includes('C2H5OH')) reductants++;
      }
    }

    // 2. Dominant Archetype Detection
    let dominantArchetype: DeckSynergyAnalysis['dominantArchetype'] = 'MIXED_HYBRID';
    const maxGroup = Math.max(groups.pnictogen, groups.chalcogen, groups.alkali, groups.halogen, groups.organic);
    if (maxGroup >= 5) {
      if (groups.pnictogen === maxGroup) dominantArchetype = 'NITRO_LEGION';
      else if (groups.chalcogen === maxGroup) dominantArchetype = 'SULFUR_FORGE';
      else if (groups.alkali === maxGroup || groups.halogen === maxGroup) dominantArchetype = 'ALKALI_HALOGEN';
      else if (groups.organic === maxGroup) dominantArchetype = 'ORGANIC_SYNTHESIS';
    }

    // 3. Chemical Combos Available
    const combos: string[] = [];
    const mainFormulas = new Set(mainDefs.map(c => c.chemicalFormula || ''));
    const mainIds = new Set(mainDeck);

    // Haber-Bosch: N + H
    if ((mainFormulas.has('N2') || mainFormulas.has('N')) && (mainFormulas.has('H2') || mainFormulas.has('H'))) {
      combos.push('Haber-Bosch: N₂ + 3H₂ ⇌ 2NH₃ (Tổng hợp Amoniac)');
    }
    // Salt Formation: Na + Cl
    if ((mainFormulas.has('Na') || mainFormulas.has('NaOH')) && (mainFormulas.has('Cl') || mainFormulas.has('HCl'))) {
      combos.push('Tạo Muối: Na + Cl → NaCl (Liên kết ion cực mạnh)');
    }
    // Water Detonation: Na + H2O
    if ((mainFormulas.has('Na') || mainFormulas.has('K')) && (mainFormulas.has('H2O') || mainIds.has('card_spell_h2o_burst'))) {
      combos.push('Thủy Kích Kiềm: 2Na + 2H₂O → 2NaOH + H₂ (Tỏa nhiệt phát nổ)');
    }
    // Thermite Melt: Al + Fe2O3
    if (mainFormulas.has('Al') && (mainFormulas.has('Fe2O3') || mainFormulas.has('Fe3O4'))) {
      combos.push('Nhiệt Nhôm 3000°C: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe (Nung chảy phòng thủ)');
    }
    // Contact Process: S + O2 -> SO2 -> H2SO4
    if ((mainFormulas.has('S') || mainFormulas.has('SO2') || mainIds.has('card_spell_contact_process')) && (mainFormulas.has('H2SO4') || mainFormulas.has('O2') || mainFormulas.has('O'))) {
      combos.push('Quy Trình Tiếp Xúc V₂O₅: 2SO₂ + O₂ ⇌ 2SO₃ → H₂SO₄ (Hoàng Dịch Axit)');
    }
    // Hydrogen Sulfide: H2S rotten
    if (mainFormulas.has('H2S') || mainIds.has('card_comp_h2s_rotten')) {
      combos.push('Tử Khí Trứng Thối: Fe + H₂S → FeS↓ (Tạo kết tủa đen ăn mòn)');
    }
    // Neutralization: Acid + Base
    if (mainDefs.some(c => c.effectCode === 'SPELL_NEUTRALIZE' || c.id === 'card_spell_neutralization') ||
        (mainDefs.some(c => c.chemicalFormula === 'HCl' || c.effectCode === 'COMP_HCL_DISSOLVE') && mainDefs.some(c => c.atomicNumber === 11 || c.chemicalFormula === 'Na' || c.chemicalFormula === 'NaOH' || c.effectCode === 'ELEM_NA_BURST'))) {
      combos.push('Chuẩn Độ Trung Hòa: HCl + NaOH → NaCl + H₂O (+LP Hồi phục)');
    }
    // Saponification / Ester: Organic
    if (groups.organic >= 3) {
      combos.push('Este Hóa & Xà Phòng Hóa: RCOOH + R\'OH ⇌ RCOOR\' + H₂O');
    }
    // Silver Mirror: Glucose / Tollens
    if (mainFormulas.has('C6H12O6') || mainIds.has('card_spell_tollens_mirror')) {
      combos.push('Tráng Bạc Tollens: C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → 2Ag↓ + Muối Amoni Gluconat');
    }

    // 4. Redox Balance
    const isBalanced = reductants >= 2 && oxidants >= 2;
    const ratio = `${reductants}:${oxidants}`;

    // 5. Golden Ratio Composition (Mục II.2.1.c: 4 Tấn Công : 3 Môi Trường/Xúc Tác : 3 Phòng Thủ)
    let attackCount = 0;
    let environmentCount = 0;
    let defenseCount = 0;

    for (const card of allDefs) {
      if (['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT'].includes(card.cardType)) {
        environmentCount++;
      } else if (card.cardType === 'TRAP') {
        defenseCount++;
      } else {
        const z = card.atomicNumber || 0;
        if ([2, 10, 18, 36, 54, 79, 47].includes(z) || (card.def && card.def >= 1800)) {
          defenseCount++;
        } else {
          attackCount++;
        }
      }
    }

    const totalDeckCards = Math.max(1, allDefs.length);
    const normFactor = totalDeckCards / 10;
    const aNorm = Math.round((attackCount / normFactor) * 10) / 10;
    const eNorm = Math.round((environmentCount / normFactor) * 10) / 10;
    const dNorm = Math.round((defenseCount / normFactor) * 10) / 10;
    const actualRatio = `${aNorm} : ${eNorm} : ${dNorm}`;
    const isOptimal = (aNorm >= 3.0 && aNorm <= 5.5) && (eNorm >= 2.0 && eNorm <= 4.5) && (dNorm >= 2.0 && dNorm <= 4.5);

    let pedagogicalAdvice = '';
    if (environmentCount === 0) {
      pedagogicalAdvice = 'CẢNH BÁO: Bộ bài hoàn toàn thiếu Thẻ Môi Trường / Xúc Tác! Bạn sẽ không thể kích hoạt bất kỳ Combo phản ứng nào.';
    } else if (attackCount < 2) {
      pedagogicalAdvice = 'CẢNH BÁO: Bộ bài thiếu các nguyên tố tấn công bùng nổ để hạ gục điểm sinh mệnh đối thủ.';
    } else if (!isOptimal) {
      pedagogicalAdvice = `Tỉ lệ hiện tại (${actualRatio}) đang lệch so với Tỉ Lệ Vàng chuẩn 4 : 3 : 3 (4 Tấn công : 3 Môi trường : 3 Phòng thủ). Hãy cân bằng lại để tối ưu hóa xác suất rút bài.`;
    } else {
      pedagogicalAdvice = `ĐẠT CHUẨN TỈ LỆ VÀNG (4 : 3 : 3): Bộ bài cân đối hoàn hảo giữa chất tham gia (${attackCount}), tác nhân môi trường (${environmentCount}) và lá chắn phòng thủ (${defenseCount}) theo Mục II.2.1.c Thuyết minh.`;
    }

    // 6. Recommendations
    const recommendations: string[] = [];
    if (reductants === 0) {
      recommendations.push('Thiếu chất khử kim loại (Na, Fe, Al, Zn) để cho electron.');
    }
    if (oxidants === 0) {
      recommendations.push('Thiếu chất oxi hóa (Halogen, O₂, Axit) để nhận electron và tạo điện thế phản ứng.');
    }
    if (environmentCount === 0) {
      recommendations.push('Cần bổ sung Thẻ Môi trường / Xúc tác (H₂O, O₂, Nhiệt độ, Axit) để kích hoạt Combo.');
    }
    if (combos.length === 0) {
      recommendations.push('Chưa phát hiện chuỗi phản ứng tương thích giữa các nguyên tố trong bộ bài. Hãy bổ sung cặp chất phản ứng (VD: Na + Cl, N₂ + H₂, Al + Fe₂O₃).');
    }
    if (mainDefs.length < MIN_MAIN_DECK_CARDS) {
      recommendations.push(`Cần thêm ${MIN_MAIN_DECK_CARDS - mainDefs.length} lá để đủ điều kiện thi đấu TCG.`);
    }

    // 7. Synergy Score (0 - 100)
    let score = 50;
    if (isBalanced) score += 10;
    if (isOptimal) score += 10;
    score += Math.min(15, combos.length * 5);
    if (dominantArchetype !== 'MIXED_HYBRID') score += 10;
    if (extraDefs.length >= 2) score += 5;
    score = Math.max(10, Math.min(100, score));

    return {
      synergyScore: score,
      dominantArchetype,
      elementalGroups: groups,
      redoxBalance: {
        oxidants,
        reductants,
        ratio,
        isBalanced
      },
      goldenRatio: {
        attackCount,
        environmentCount,
        defenseCount,
        actualRatio,
        isOptimal,
        pedagogicalAdvice
      },
      chemicalCombosAvailable: combos,
      recommendations
    };
  }

  /**
   * Load all 9 deck slots from storage
   */
  public static loadDeckSlots(): DeckSlot[] {
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: DeckSlot[] = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length === TOTAL_DECK_SLOTS) {
            return parsed.map(s => ({
              ...s,
              sideDeck: Array.isArray(s.sideDeck) ? s.sideDeck : []
            }));
          }
        }
      } catch (e) {
        // Fallback
      }
    }

    // Initialize 9 slots (3 prebuilts + 6 empty)
    const initialSlots: DeckSlot[] = [];
    for (let i = 0; i < TOTAL_DECK_SLOTS; i++) {
      if (i < PREBUILT_DECKS.length) {
        initialSlots.push({
          ...PREBUILT_DECKS[i],
          sideDeck: PREBUILT_DECKS[i].sideDeck ? [...PREBUILT_DECKS[i].sideDeck!] : [],
          slotIndex: i
        });
      } else {
        initialSlots.push({
          slotIndex: i,
          id: `deck_slot_${i + 1}`,
          name: `Bộ Bài Ô ${i + 1}`,
          mainDeck: [],
          extraDeck: [],
          sideDeck: [],
          updatedAt: Date.now()
        });
      }
    }

    DeckManagementService.saveDeckSlots(initialSlots);
    return initialSlots;
  }

  /**
   * Save all 9 deck slots to storage
   */
  public static saveDeckSlots(slots: DeckSlot[]): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
    } catch (e) {
      console.error('Failed to save deck slots:', e);
    }
  }

  /**
   * Get the active/default deck slot for battles
   */
  public static getActiveDeck(): DeckSlot {
    const slots = DeckManagementService.loadDeckSlots();
    const defaultDeck = slots.find(s => s.isDefault && s.mainDeck.length >= MIN_MAIN_DECK_CARDS);
    if (defaultDeck) return defaultDeck;

    // Fallback to first valid deck
    const firstValid = slots.find(s => s.mainDeck.length >= MIN_MAIN_DECK_CARDS);
    if (firstValid) return firstValid;

    // Fallback to slot 0
    return slots[0];
  }

  /**
   * Save a single deck slot by index
   */
  public static saveSlot(index: number, updated: Partial<DeckSlot>): DeckSlot[] {
    const slots = DeckManagementService.loadDeckSlots();
    if (index >= 0 && index < slots.length) {
      slots[index] = {
        ...slots[index],
        ...updated,
        slotIndex: index,
        updatedAt: Date.now()
      };
      DeckManagementService.saveDeckSlots(slots);
    }
    return slots;
  }

  /**
   * Set a deck slot as default for battles
   */
  public static setDefaultSlot(index: number): DeckSlot[] {
    const slots = DeckManagementService.loadDeckSlots();
    slots.forEach((s, i) => {
      s.isDefault = (i === index);
    });
    DeckManagementService.saveDeckSlots(slots);
    return slots;
  }

  /**
   * Duplicate a deck from source index to target index
   */
  public static duplicateSlot(sourceIndex: number, targetIndex: number): DeckSlot[] {
    const slots = DeckManagementService.loadDeckSlots();
    if (sourceIndex >= 0 && sourceIndex < slots.length && targetIndex >= 0 && targetIndex < slots.length) {
      const src = slots[sourceIndex];
      slots[targetIndex] = {
        ...slots[targetIndex],
        name: `${src.name} (Bản Sao)`,
        archetype: src.archetype,
        coverCardId: src.coverCardId,
        mainDeck: [...src.mainDeck],
        extraDeck: [...src.extraDeck],
        sideDeck: src.sideDeck ? [...src.sideDeck] : [],
        updatedAt: Date.now()
      };
      DeckManagementService.saveDeckSlots(slots);
    }
    return slots;
  }

  /**
   * Clear a deck slot back to empty
   */
  public static resetSlot(index: number): DeckSlot[] {
    const slots = DeckManagementService.loadDeckSlots();
    if (index >= 0 && index < slots.length) {
      slots[index] = {
        slotIndex: index,
        id: `deck_slot_${index + 1}`,
        name: `Bộ Bài Ô ${index + 1} (Trống)`,
        mainDeck: [],
        extraDeck: [],
        sideDeck: [],
        isDefault: false,
        isFavorite: false,
        updatedAt: Date.now()
      };
      DeckManagementService.saveDeckSlots(slots);
    }
    return slots;
  }

  /**
   * Master Rule Side Deck Tactical 1-to-1 Swap (Rulebook v10 tr. 6)
   * Swaps a card between Main/Extra Deck and Side Deck while preserving exact deck sizes
   */
  public static swapCardsWithSideDeck(
    slotIndex: number,
    originalCardId: string,
    sideDeckCardId: string,
    targetDeckType: 'MAIN' | 'EXTRA' = 'MAIN'
  ): { success: boolean; error?: string; updatedSlot?: DeckSlot } {
    const slots = DeckManagementService.loadDeckSlots();
    const slot = slots.find(s => s.slotIndex === slotIndex);
    if (!slot) {
      return { success: false, error: `Không tìm thấy Deck Slot số ${slotIndex + 1}.` };
    }

    const sideDeck = [...(slot.sideDeck || [])];
    const sideIdx = sideDeck.indexOf(sideDeckCardId);
    if (sideIdx === -1) {
      return { success: false, error: `Lá bài "${sideDeckCardId}" không tồn tại trong Side Deck.` };
    }

    if (targetDeckType === 'MAIN') {
      const mainIdx = slot.mainDeck.indexOf(originalCardId);
      if (mainIdx === -1) {
        return { success: false, error: `Lá bài "${originalCardId}" không tồn tại trong Main Deck.` };
      }
      slot.mainDeck[mainIdx] = sideDeckCardId;
      sideDeck[sideIdx] = originalCardId;
    } else {
      const extraIdx = slot.extraDeck.indexOf(originalCardId);
      if (extraIdx === -1) {
        return { success: false, error: `Lá bài "${originalCardId}" không tồn tại trong Extra Deck.` };
      }
      slot.extraDeck[extraIdx] = sideDeckCardId;
      sideDeck[sideIdx] = originalCardId;
    }

    slot.sideDeck = sideDeck;
    slot.updatedAt = Date.now();

    const validation = DeckManagementService.validateDeck(slot.mainDeck, slot.extraDeck, slot.sideDeck);
    if (!validation.isValid) {
      return { success: false, error: validation.errors[0] };
    }

    DeckManagementService.saveDeckSlots(slots);
    return { success: true, updatedSlot: slot };
  }

  /**
   * Universal UTF-8 Safe Base64 Encoder
   */
  private static encodeBase64(str: string): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'utf-8').toString('base64');
    }
    if (typeof btoa !== 'undefined') {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
    }
    return '';
  }

  /**
   * Universal UTF-8 Safe Base64 Decoder
   */
  private static decodeBase64(b64: string): string {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(b64, 'base64').toString('utf-8');
    }
    if (typeof atob !== 'undefined') {
      return decodeURIComponent(Array.prototype.map.call(atob(b64), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }
    return '';
  }

  /**
   * Deterministic FNV-1a Checksum for Deck Export Integrity
   */
  private static calculateChecksum(str: string): number {
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  /**
   * Export a deck slot to a portable URL-safe Base64 code with checksum
   */
  public static exportDeckToString(slotIndex: number): string {
    const slots = DeckManagementService.loadDeckSlots();
    if (slotIndex < 0 || slotIndex >= slots.length) {
      throw new Error(`Invalid slot index: ${slotIndex}`);
    }
    const slot = slots[slotIndex];
    const payloadData = {
      name: slot.name,
      main: slot.mainDeck,
      extra: slot.extraDeck,
      side: slot.sideDeck || []
    };
    const jsonStr = JSON.stringify(payloadData);
    const checksum = DeckManagementService.calculateChecksum(jsonStr);

    const fullPayload = {
      v: 2,
      name: slot.name,
      archetype: slot.archetype,
      coverCardId: slot.coverCardId,
      main: slot.mainDeck,
      extra: slot.extraDeck,
      side: slot.sideDeck || [],
      checksum
    };

    const encoded = DeckManagementService.encodeBase64(JSON.stringify(fullPayload));
    return `ELM-DECK-${encoded}`;
  }

  /**
   * Import a deck code into a target slot with format and checksum validation
   */
  public static importDeckFromString(
    targetIndex: number,
    exportCode: string
  ): { success: boolean; error?: string; deck?: DeckSlot; slots: DeckSlot[] } {
    const slots = DeckManagementService.loadDeckSlots();
    if (targetIndex < 0 || targetIndex >= slots.length) {
      return { success: false, error: `Vị trí ô bộ bài không hợp lệ (${targetIndex}).`, slots };
    }

    const trimmed = exportCode.trim();
    if (!trimmed.startsWith('ELM-DECK-')) {
      return { success: false, error: 'Mã bộ bài không đúng định dạng chuẩn ELEMENTA (thiếu tiền tố ELM-DECK-).', slots };
    }

    try {
      const rawB64 = trimmed.substring('ELM-DECK-'.length);
      const jsonStr = DeckManagementService.decodeBase64(rawB64);
      const payload = JSON.parse(jsonStr);

      if ((payload.v !== 1 && payload.v !== 2) || !Array.isArray(payload.main) || !Array.isArray(payload.extra)) {
        return { success: false, error: 'Cấu trúc dữ liệu mã bộ bài bị lỗi hoặc không tương thích phiên bản.', slots };
      }

      // Verify Checksum based on version
      let verifyData: any;
      if (payload.v === 2) {
        verifyData = {
          name: payload.name,
          main: payload.main,
          extra: payload.extra,
          side: Array.isArray(payload.side) ? payload.side : []
        };
      } else {
        verifyData = {
          name: payload.name,
          main: payload.main,
          extra: payload.extra
        };
      }

      const expectedChecksum = DeckManagementService.calculateChecksum(JSON.stringify(verifyData));
      if (payload.checksum !== expectedChecksum) {
        return { success: false, error: 'Mã bộ bài bị hỏng (Checksum không khớp, phát hiện dữ liệu bị sửa đổi).', slots };
      }

      // Sanitize deck name against HTML/script injection
      const sanitizedName = typeof payload.name === 'string'
        ? payload.name.replace(/<[^>]*>/g, '').replace(/[<>'"\`]/g, '').trim().slice(0, 48) || `Bộ Bài Ô ${targetIndex + 1} (Nhập)`
        : `Bộ Bài Ô ${targetIndex + 1} (Nhập)`;

      // Filter and validate card IDs
      const isValidCardId = (id: any): boolean => typeof id === 'string' && /^[a-zA-Z0-9_]+$/.test(id);
      const safeMain = payload.main.filter(isValidCardId);
      const safeExtra = payload.extra.filter(isValidCardId);
      const safeSide = Array.isArray(payload.side) ? payload.side.filter(isValidCardId) : [];

      // Apply to target slot
      slots[targetIndex] = {
        slotIndex: targetIndex,
        id: `deck_slot_${targetIndex + 1}`,
        name: sanitizedName,
        archetype: typeof payload.archetype === 'string' ? payload.archetype.slice(0, 32) : undefined,
        coverCardId: isValidCardId(payload.coverCardId) ? payload.coverCardId : undefined,
        mainDeck: safeMain,
        extraDeck: safeExtra,
        sideDeck: safeSide,
        isDefault: false,
        isFavorite: false,
        updatedAt: Date.now()
      };

      DeckManagementService.saveDeckSlots(slots);
      return { success: true, deck: slots[targetIndex], slots };
    } catch (e: any) {
      return { success: false, error: `Giải mã bộ bài thất bại: ${e?.message || 'Lỗi không xác định'}`, slots };
    }
  }

  /**
   * Bulk remove card IDs from a deck slot
   */
  public static removeCardsFromSlot(
    slotIndex: number,
    cardIdsToRemove: string[],
    targetDeck: 'main' | 'extra' | 'both' = 'both'
  ): DeckSlot[] {
    const slots = DeckManagementService.loadDeckSlots();
    if (slotIndex >= 0 && slotIndex < slots.length) {
      const slot = slots[slotIndex];
      const removeList = [...cardIdsToRemove];

      if (targetDeck === 'main' || targetDeck === 'both') {
        const newMain: string[] = [];
        for (const id of slot.mainDeck) {
          const rmIdx = removeList.indexOf(id);
          if (rmIdx >= 0) {
            removeList.splice(rmIdx, 1);
          } else {
            newMain.push(id);
          }
        }
        slot.mainDeck = newMain;
      }

      if (targetDeck === 'extra' || targetDeck === 'both') {
        const newExtra: string[] = [];
        for (const id of slot.extraDeck) {
          const rmIdx = removeList.indexOf(id);
          if (rmIdx >= 0) {
            removeList.splice(rmIdx, 1);
          } else {
            newExtra.push(id);
          }
        }
        slot.extraDeck = newExtra;
      }

      slot.updatedAt = Date.now();
      DeckManagementService.saveDeckSlots(slots);
    }
    return slots;
  }

  /**
   * Bulk add card IDs to a deck slot with capacity and 3-copy limits
   */
  public static addCardsToSlot(
    slotIndex: number,
    cardIdsToAdd: string[],
    targetDeck: 'main' | 'extra' = 'main'
  ): { success: boolean; addedCount: number; rejectedCards: string[]; slots: DeckSlot[] } {
    const slots = DeckManagementService.loadDeckSlots();
    if (slotIndex < 0 || slotIndex >= slots.length) {
      return { success: false, addedCount: 0, rejectedCards: [...cardIdsToAdd], slots };
    }

    const slot = slots[slotIndex];
    const cardCounts: Record<string, number> = {};
    for (const id of [...slot.mainDeck, ...slot.extraDeck]) {
      cardCounts[id] = (cardCounts[id] || 0) + 1;
    }

    let addedCount = 0;
    const rejectedCards: string[] = [];

    for (const cardId of cardIdsToAdd) {
      const isExtra = targetDeck === 'extra';
      const maxCap = isExtra ? MAX_EXTRA_DECK_CARDS : MAX_MAIN_DECK_CARDS;
      const currentList = isExtra ? slot.extraDeck : slot.mainDeck;

      if (currentList.length >= maxCap) {
        rejectedCards.push(`${cardId} (quá giới hạn ô)`);
        continue;
      }

      if ((cardCounts[cardId] || 0) >= MAX_COPIES_PER_CARD) {
        rejectedCards.push(`${cardId} (đã đủ 3 bản sao)`);
        continue;
      }

      currentList.push(cardId);
      cardCounts[cardId] = (cardCounts[cardId] || 0) + 1;
      addedCount++;
    }

    slot.updatedAt = Date.now();
    DeckManagementService.saveDeckSlots(slots);
    return { success: true, addedCount, rejectedCards, slots };
  }
}
