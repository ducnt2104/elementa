// src/storage/localStore.ts
// LocalStorage Persistence Layer for ELEMENTA with Version Migration

import { PlayerProfile, SrsItem, CreativeSkillSubmission, DuelDeckConfig } from '../domain/types';
import { DEFAULT_PLAYER_DECK_IDS, DEFAULT_EXTRA_DECK_IDS, PLAYABLE_CARDS } from '../data/playableCardsData';

const STORAGE_KEY_PROFILE = 'elementa_profile_v1';
const STORAGE_KEY_SKILLS = 'elementa_custom_skills_v1';
const STORAGE_KEY_SETTINGS = 'elementa_settings_v1';

export type GraphicsQuality = 'ULTRA' | 'BALANCED' | 'PERFORMANCE';

export interface UserSettings {
  volume: number;
  isMuted: boolean;
  reducedMotion: boolean;
  graphicsQuality: GraphicsQuality;
}

export interface GameSaveBundle {
  version: number;
  schema: 'ELEMENTA_SAVE_BUNDLE_V2';
  exportedAt: string;
  profile: PlayerProfile;
  settings: UserSettings;
  skills: CreativeSkillSubmission[];
  deckSlots?: any[];
  rankedProfile?: any;
}

/**
 * Recursively removes dangerous prototype pollution keys (__proto__, constructor, prototype)
 */
export function sanitizeSafeObject<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeSafeObject(item)) as unknown as T;
  }
  const clean: any = {};
  for (const key of Object.keys(obj)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }
    clean[key] = sanitizeSafeObject((obj as any)[key]);
  }
  return clean as T;
}

/**
 * Sanitizes input text, stripping dangerous HTML tags, scripts, and control characters
 */
export function sanitizeInputString(input: unknown, maxLength: number = 64): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // Strip complete HTML tags (e.g. <script>...</script>, <b>, etc.)
    .replace(/[<>'"\`]/g, '') // Strip dangling delimiters
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Strip control characters
    .trim()
    .slice(0, maxLength);
}

// Generate controlled 50-card starter collection with strict elemental/archetype balance
export function generateControlledStarterCollection(): {
  collection: Record<string, number>;
  mainDeck: string[];
  extraDeck: string[];
} {
  const collection: Record<string, number> = {
    // 21 Normal/Effect Monsters Level 1-4 (8 distinct elements)
    'card_elem_11_na': 3,
    'card_elem_17_cl': 3,
    'card_elem_26_fe': 3,
    'card_elem_13_al': 3,
    'card_elem_29_cu': 2,
    'card_elem_1_h': 3,
    'card_elem_8_o': 2,
    'card_elem_6_c': 2,

    // 3 Tribute Monsters Level 5-7 (High-tier boss catalysts)
    'card_elem_19_k': 1,
    'card_elem_47_ag': 1,
    'card_elem_79_au': 1,

    // 4 Extra Deck Monsters (1 Compound, 1 Link, 1 Synchro, 1 Xyz)
    'card_comp_h2o': 1,
    'card_link_1_h_bond': 1,
    'card_synchro_catalytic_converter': 1,
    'card_xyz_hexammine_cobalt': 1,

    // 14 Spells (Draw, search, burn, neutralization, mana, rebirth, field)
    'card_spell_mass_spec_draw': 2,
    'card_spell_gas_chromatography': 2,
    'card_spell_exothermic_burst': 2,
    'card_spell_neutralization': 2,
    'card_spell_lithium_capacitor': 2,
    'card_spell_cathode_rebirth': 2,
    'card_spell_periodic_rift_field': 2,

    // 8 Traps (Defensive shields, precipitation, passivation, cognitive counters)
    'card_trap_noble_gas_shield': 2,
    'card_trap_cognitive_copper': 2,
    'card_trap_passivation_armor': 2,
    'card_trap_precipitation_trap': 1,
    'card_trap_ammonium_smoke': 1
  };

  const extraDeck: string[] = [
    'card_comp_h2o',
    'card_link_1_h_bond',
    'card_synchro_catalytic_converter',
    'card_xyz_hexammine_cobalt'
  ];

  const mainDeck: string[] = [];
  for (const [cardId, count] of Object.entries(collection)) {
    if (!extraDeck.includes(cardId)) {
      for (let i = 0; i < count; i++) {
        mainDeck.push(cardId);
      }
    }
  }

  return { collection, mainDeck, extraDeck };
}

const STARTER_DATA = generateControlledStarterCollection();
export const STARTER_COLLECTION: Record<string, number> = STARTER_DATA.collection;
export const STARTER_MAIN_DECK_IDS: string[] = STARTER_DATA.mainDeck;
export const STARTER_EXTRA_DECK_IDS: string[] = STARTER_DATA.extraDeck;

const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Học Giả Nguyên Tố',
  level: 1,
  xp: 0,
  knowledgeTokens: 1000,
  elementalShards: 150,
  unlockedElementZ: [1, 2, 6, 7, 8, 11, 12, 13, 16, 17, 19, 20, 26, 29, 30], // Starter elements
  unlockedHeroes: ['hero_na_brawler', 'hero_fe_warden', 'hero_h_scout'],
  tcgBotRank: { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 },
  tcgPvpRank: { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 },
  mobaBotRank: { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 },
  mobaPvpRank: { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 },
  activeDeck: [
    'elem_11', // Na
    'elem_26', // Fe
    'elem_29', // Cu
    'elem_2',  // He
    'elem_30', // Zn
    'env_h2o',
    'env_o2',
    'env_temp',
    'env_acid',
    'env_base'
  ],
  savedDecks: [],
  cardCollection: { ...STARTER_COLLECTION },
  activeDuelDeck: {
    id: 'starter_deck_1',
    name: 'Bộ Bài Khởi Nguyên: Ngọn Lửa & Bão Kim Loại',
    mainDeck: [...STARTER_MAIN_DECK_IDS],
    extraDeck: [...STARTER_EXTRA_DECK_IDS]
  },
  savedDuelDecks: [
    {
      id: 'starter_deck_1',
      name: 'Bộ Bài Khởi Nguyên: Ngọn Lửa & Bão Kim Loại',
      mainDeck: [...STARTER_MAIN_DECK_IDS],
      extraDeck: [...STARTER_EXTRA_DECK_IDS]
    }
  ],
  starterPackClaimed: true,
  initialGrantTimestamp: new Date().toISOString(),
  auditTransactions: [
    {
      id: 'tx_init_starter_pack',
      type: 'STARTER_PACK_GRANT',
      amount: 1000,
      timestamp: new Date().toISOString(),
      detail: 'Cấp Bộ Thẻ Khởi Nguyên (50 lá bài tiêu chuẩn) và 1,000 Knowledge Tokens cho tân thủ.'
    }
  ],
  srsItems: [
    {
      id: 'seed_srs_1',
      targetId: 'Na',
      targetType: 'ELEMENT',
      title: 'Kim loại kiềm Natri (Sodium)',
      question: 'Khi thả mẩu Natri (Na) vào chậu nước có pha sẵn dung dịch phenolphthalein, hiện tượng gì xảy ra?',
      correctAnswer: 'Na nóng chảy thành viên tròn chạy trên mặt nước, sủi bọt khí H₂ và dung dịch chuyển sang màu hồng tím.',
      options: [
        'Na nóng chảy thành viên tròn chạy trên mặt nước, sủi bọt khí H₂ và dung dịch chuyển sang màu hồng tím.',
        'Na chìm xuống đáy chậu và không có bọt khí thoát ra.',
        'Na bốc khói đen và tạo kết tủa trắng không tan.',
        'Dung dịch chuyển sang màu xanh lam của ion Cu²⁺.'
      ],
      explanation: 'Natri phản ứng mãnh liệt tỏa nhiệt với nước: 2Na + 2H₂O -> 2NaOH + H₂↑. Dung dịch kiềm NaOH làm phenolphthalein hóa hồng tím.',
      errorLevel: 2,
      repetitionCount: 1,
      intervalDays: 1,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(), // Due today for initial review demo
      consecutiveSuccesses: 1
    },
    {
      id: 'seed_srs_2',
      targetId: 'Cu_HCl',
      targetType: 'REACTION',
      title: 'Dãy Hoạt Động Hóa Học: Đồng (Cu) + Acid',
      question: 'Cho thanh Đồng (Cu) vào ống nghiệm chứa dung dịch HCl loãng ở nhiệt độ thường, hiện tượng quan sát được là gì?',
      correctAnswer: 'Không có hiện tượng gì (Cu không tan và không có bọt khí).',
      options: [
        'Không có hiện tượng gì (Cu không tan và không có bọt khí).',
        'Sủi bọt khí H₂ mãnh liệt và dung dịch hóa xanh.',
        'Thanh đồng tan ngay lập tức tạo khí màu nâu đỏ.',
        'Dung dịch xuất hiện kết tủa trắng đục.'
      ],
      explanation: 'Trong dãy hoạt động hóa học kim loại, Cu đứng sau Hydrogen nên không tác dụng với dung dịch acid loãng (HCl, H₂SO₄ loãng).',
      errorLevel: 3,
      repetitionCount: 1,
      intervalDays: 1,
      easeFactor: 2.3,
      dueDate: new Date().toISOString(),
      consecutiveSuccesses: 0
    }
  ],
  errorHistory: [],
  tutorialCompleted: false,
  hasClaimedFree10Pack: false,
  completedCampaignStages: ['stage_1_acid_rain'],
  solvedPuzzleIds: [],
  stats: {
    battlesPlayed: 0,
    battlesWon: 0,
    reactionsTriggered: 0,
    srsReviewsCompleted: 0
  }
};

const DEFAULT_SETTINGS: UserSettings = {
  volume: 0.7,
  isMuted: false,
  reducedMotion: false,
  graphicsQuality: 'BALANCED'
};

export class GameStorage {
  public static loadProfile(): PlayerProfile {
    try {
      if (typeof localStorage === 'undefined') return DEFAULT_PROFILE;
      const data = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (!data) return DEFAULT_PROFILE;
      const parsed = JSON.parse(data);
      const merged: PlayerProfile = { ...DEFAULT_PROFILE, ...parsed };
      
      // Strict 4-Layer segregation: Do NOT unlock all cards into player collection!
      // New accounts or profiles with empty collection receive strictly the 50-card starter collection.
      if (!parsed.cardCollection || Object.keys(parsed.cardCollection).length === 0) {
        merged.cardCollection = { ...STARTER_COLLECTION };
      } else {
        const totalCards = Object.values(parsed.cardCollection).reduce((sum: number, c: any) => sum + (Number(c) || 0), 0);
        // Clean legacy bug where all 7,300 cards were mass-assigned (3 copies each > 20,000 cards)
        if (totalCards > 10000 && !parsed.starterPackClaimed) {
          merged.cardCollection = { ...STARTER_COLLECTION };
          merged.knowledgeTokens = Math.max(1000, merged.knowledgeTokens || 1000);
          merged.starterPackClaimed = true;
        } else {
          merged.cardCollection = { ...parsed.cardCollection };
        }
      }

      // Guarantee strictly 1,000 starter Knowledge Tokens for new / default profiles
      if (!merged.knowledgeTokens || (parsed.knowledgeTokens === 500 && !parsed.starterPackClaimed)) {
        merged.knowledgeTokens = 1000;
      }

      if (!merged.starterPackClaimed) {
        merged.starterPackClaimed = true;
        merged.initialGrantTimestamp = merged.initialGrantTimestamp || new Date().toISOString();
        if (!merged.auditTransactions || merged.auditTransactions.length === 0) {
          merged.auditTransactions = [...(DEFAULT_PROFILE.auditTransactions || [])];
        }
      }
      if (!merged.activeDuelDeck) {
        merged.activeDuelDeck = { ...DEFAULT_PROFILE.activeDuelDeck! };
      }
      if (!merged.savedDuelDecks || merged.savedDuelDecks.length === 0) {
        merged.savedDuelDecks = [...(DEFAULT_PROFILE.savedDuelDecks || [])];
      }
      if (!Array.isArray(merged.solvedPuzzleIds)) {
        merged.solvedPuzzleIds = [];
      }
      if (!Array.isArray(merged.completedCampaignStages)) {
        merged.completedCampaignStages = ['stage_1_acid_rain'];
      }
      if (typeof merged.elementalShards !== 'number') {
        merged.elementalShards = 150;
      }
      if (!Array.isArray(merged.unlockedHeroes) || merged.unlockedHeroes.length === 0) {
        merged.unlockedHeroes = ['hero_na_brawler', 'hero_fe_warden', 'hero_h_scout'];
      }
      if (!merged.tcgBotRank) {
        merged.tcgBotRank = { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
      }
      if (!merged.tcgPvpRank) {
        merged.tcgPvpRank = { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
      }
      if (!merged.mobaBotRank) {
        merged.mobaBotRank = { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
      }
      if (!merged.mobaPvpRank) {
        merged.mobaPvpRank = { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
      }
      return merged;
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  public static saveProfile(profile: PlayerProfile): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage', e);
    }
  }

  public static loadSkills(): CreativeSkillSubmission[] {
    try {
      if (typeof localStorage === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEY_SKILLS);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  public static saveSkills(skills: CreativeSkillSubmission[]): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.warn('Failed to save skills', e);
    }
  }

  public static loadSettings(): UserSettings {
    try {
      if (typeof localStorage === 'undefined') return DEFAULT_SETTINGS;
      const data = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static saveSettings(settings: UserSettings): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }

  public static resetAll(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY_PROFILE);
        localStorage.removeItem(STORAGE_KEY_SKILLS);
        localStorage.removeItem(STORAGE_KEY_SETTINGS);
        localStorage.removeItem('elementa_deck_slots_v2');
        localStorage.removeItem('elementa_ranked_profile_v2');
      }
    } catch (e) {
      console.warn('Failed to reset storage:', e);
    }
  }

  /**
   * Export complete player state bundle for backup, migration, or teacher inspection
   */
  public static exportSaveBundle(): GameSaveBundle {
    const profile = GameStorage.loadProfile();
    const settings = GameStorage.loadSettings();
    const skills = GameStorage.loadSkills();

    let deckSlots: any[] = [];
    let rankedProfile: any = null;

    if (typeof localStorage !== 'undefined') {
      try {
        const rawDecks = localStorage.getItem('elementa_deck_slots_v2');
        if (rawDecks) deckSlots = JSON.parse(rawDecks);
      } catch { /* ignore */ }

      try {
        const rawRanked = localStorage.getItem('elementa_ranked_profile_v2');
        if (rawRanked) rankedProfile = JSON.parse(rawRanked);
      } catch { /* ignore */ }
    }

    return {
      version: 2,
      schema: 'ELEMENTA_SAVE_BUNDLE_V2',
      exportedAt: new Date().toISOString(),
      profile,
      settings,
      skills,
      deckSlots,
      rankedProfile
    };
  }

  /**
   * Import complete player state bundle with validation, backward-compatible migration, and safety rollback
   */
  public static importSaveBundle(bundleData: string | object): {
    success: boolean;
    error?: string;
    restoredItems?: { profile: boolean; settings: boolean; skills: number; deckSlots: number; ranked: boolean };
  } {
    try {
      let bundle: any = bundleData;
      if (typeof bundleData === 'string') {
        bundle = JSON.parse(bundleData);
      }

      if (!bundle || typeof bundle !== 'object') {
        return { success: false, error: 'Dữ liệu sao lưu không hợp lệ (không phải đối tượng JSON)' };
      }

      // 1. Prototype Pollution Defense
      bundle = sanitizeSafeObject(bundle);

      // Check version / schema compatibility
      if (bundle.version && bundle.version > 2) {
        return { success: false, error: `Phiên bản bản lưu (${bundle.version}) mới hơn phiên bản ứng dụng hỗ trợ (v2)` };
      }

      const restored = {
        profile: false,
        settings: false,
        skills: 0,
        deckSlots: 0,
        ranked: false
      };

      if (bundle.profile && typeof bundle.profile === 'object') {
        // Sanitize profile strings and numeric bounds
        if (typeof bundle.profile.name === 'string') {
          bundle.profile.name = sanitizeInputString(bundle.profile.name, 32) || 'Nhà Giả Kim Vô Danh';
        }
        if (typeof bundle.profile.level === 'number') {
          bundle.profile.level = Math.max(1, Math.min(100, Math.floor(bundle.profile.level) || 1));
        }
        if (typeof bundle.profile.xp === 'number') {
          bundle.profile.xp = Math.max(0, Math.floor(bundle.profile.xp) || 0);
        }
        if (typeof bundle.profile.knowledgeTokens === 'number') {
          bundle.profile.knowledgeTokens = Math.max(0, Math.min(1e7, Math.floor(bundle.profile.knowledgeTokens) || 0));
        }
        if (typeof bundle.profile.elementalShards === 'number') {
          bundle.profile.elementalShards = Math.max(0, Math.min(1e7, Math.floor(bundle.profile.elementalShards) || 0));
        }

        // Validate MMR and rank objects
        const sanitizeRank = (rank: any) => {
          if (!rank || typeof rank !== 'object') return { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
          const validTiers = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
          const tier = validTiers.includes(rank.tier) ? rank.tier : 'BRONZE';
          const division = Math.max(1, Math.min(5, Math.floor(rank.division) || 4));
          const mmr = (typeof rank.mmr === 'number' && Number.isFinite(rank.mmr)) ? Math.max(0, Math.min(100000, Math.floor(rank.mmr))) : 100;
          const wins = (typeof rank.wins === 'number' && Number.isFinite(rank.wins)) ? Math.max(0, Math.floor(rank.wins)) : 0;
          const losses = (typeof rank.losses === 'number' && Number.isFinite(rank.losses)) ? Math.max(0, Math.floor(rank.losses)) : 0;
          return { tier, division, mmr, wins, losses };
        };

        if (bundle.profile.tcgBotRank) bundle.profile.tcgBotRank = sanitizeRank(bundle.profile.tcgBotRank);
        if (bundle.profile.tcgPvpRank) bundle.profile.tcgPvpRank = sanitizeRank(bundle.profile.tcgPvpRank);
        if (bundle.profile.mobaBotRank) bundle.profile.mobaBotRank = sanitizeRank(bundle.profile.mobaBotRank);
        if (bundle.profile.mobaPvpRank) bundle.profile.mobaPvpRank = sanitizeRank(bundle.profile.mobaPvpRank);

        // Sanitize cardCollection against malformed keys and absurd counts
        if (bundle.profile.cardCollection && typeof bundle.profile.cardCollection === 'object') {
          const cleanCollection: Record<string, number> = {};
          for (const [cardId, count] of Object.entries(bundle.profile.cardCollection)) {
            if (/^[a-zA-Z0-9_]+$/.test(cardId) && typeof count === 'number' && Number.isFinite(count)) {
              cleanCollection[cardId] = Math.max(0, Math.min(99, Math.floor(count)));
            }
          }
          bundle.profile.cardCollection = cleanCollection;
        }

        // Sanitize unlockedElementZ: strictly integers 1..118
        if (Array.isArray(bundle.profile.unlockedElementZ)) {
          const rawList = bundle.profile.unlockedElementZ as any[];
          const validZList: number[] = rawList.filter((z: any) => typeof z === 'number' && Number.isInteger(z) && z >= 1 && z <= 118);
          bundle.profile.unlockedElementZ = Array.from(new Set(validZList)).sort((a, b) => a - b);
        }

        GameStorage.saveProfile(bundle.profile);
        restored.profile = true;
      }

      if (bundle.settings && typeof bundle.settings === 'object') {
        if (typeof bundle.settings.volume === 'number') {
          bundle.settings.volume = Math.max(0, Math.min(1, bundle.settings.volume));
        }
        if (!['ULTRA', 'BALANCED', 'PERFORMANCE'].includes(bundle.settings.graphicsQuality)) {
          bundle.settings.graphicsQuality = 'BALANCED';
        }
        GameStorage.saveSettings(bundle.settings);
        restored.settings = true;
      }

      if (Array.isArray(bundle.skills)) {
        const cleanSkills = bundle.skills.filter((s: any) => s && typeof s === 'object').map((s: any) => {
          const safeIcon = (typeof s.iconCanvasDataUrl === 'string' && s.iconCanvasDataUrl.startsWith('data:image/'))
            ? s.iconCanvasDataUrl
            : undefined;
          return {
            ...s,
            id: sanitizeInputString(s.id, 64) || `skill_${Date.now()}`,
            elementSymbol: sanitizeInputString(s.elementSymbol, 4),
            skillName: sanitizeInputString(s.skillName, 64) || 'Kỹ Năng Vô Danh',
            description: sanitizeInputString(s.description, 256),
            iconCanvasDataUrl: safeIcon,
            submittedAt: s.submittedAt || new Date().toISOString(),
            validation: s.validation && typeof s.validation === 'object' ? {
              isSchoolSafe: Boolean(s.validation.isSchoolSafe),
              isScientificallyValid: Boolean(s.validation.isScientificallyValid),
              accuracyScore: Math.max(0, Math.min(100, Number(s.validation.accuracyScore) || 0)),
              effectArchetype: s.validation.effectArchetype || 'DIRECT_DAMAGE',
              basePower: Math.max(0, Math.min(120, Number(s.validation.basePower) || 0)),
              cooldownSeconds: Math.max(5, Math.min(60, Number(s.validation.cooldownSeconds) || 8)),
              pedagogicalFeedbackVi: sanitizeInputString(s.validation.pedagogicalFeedbackVi, 512),
              groundTruthReference: sanitizeInputString(s.validation.groundTruthReference, 256)
            } : undefined
          };
        });
        GameStorage.saveSkills(cleanSkills);
        restored.skills = cleanSkills.length;
      }

      if (typeof localStorage !== 'undefined') {
        if (Array.isArray(bundle.deckSlots) && bundle.deckSlots.length > 0) {
          localStorage.setItem('elementa_deck_slots_v2', JSON.stringify(bundle.deckSlots));
          restored.deckSlots = bundle.deckSlots.length;
        }

        if (bundle.rankedProfile && typeof bundle.rankedProfile === 'object') {
          localStorage.setItem('elementa_ranked_profile_v2', JSON.stringify(bundle.rankedProfile));
          restored.ranked = true;
        }
      }

      return {
        success: true,
        restoredItems: restored
      };
    } catch (e: any) {
      return {
        success: false,
        error: `Lỗi phân tích cú pháp bản sao lưu: ${e.message}`
      };
    }
  }
}
