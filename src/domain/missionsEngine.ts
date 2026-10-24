// src/domain/missionsEngine.ts
// Comprehensive Missions & Learning Progression Engine for ELEMENTA
// Manages Daily, Weekly, Chemistry Specialized, Collection, and Beginner Missions

import type { PlayerProfile } from './types.ts';

export type MissionCategory = 'DAILY' | 'WEEKLY' | 'CHEMISTRY' | 'COLLECTION' | 'BEGINNER';

export interface MissionReward {
  knowledgeTokens: number;
  elementalShards: number;
  xp: number;
  cardPackType?: 'BASIC' | 'ELEMENT' | 'REACTION' | 'COMPOUND' | 'RARE';
  cardRewardId?: string;
  cardRewardName?: string;
}

export interface MissionDefinition {
  id: string;
  category: MissionCategory;
  title: string;
  description: string;
  pedagogicalNote?: string;
  targetCount: number;
  reward: MissionReward;
  trackingKey: 'BATTLES_WON' | 'BATTLES_PLAYED' | 'REACTIONS_TRIGGERED' | 'COMPOUNDS_CREATED' | 'SRS_REVIEWS' | 'COLLECTION_SIZE' | 'ELEMENTS_OWNED' | 'TUTORIAL_DONE' | 'DECK_SAVED' | 'CUSTOM_TRIGGER';
  customCondition?: string;
}

export interface UserMissionProgress {
  missionId: string;
  currentCount: number;
  isCompleted: boolean;
  isClaimed: boolean;
  completedAt?: string;
  claimedAt?: string;
}

export const CANONICAL_MISSIONS: MissionDefinition[] = [
  // --- DAILY MISSIONS ---
  {
    id: 'daily_win_1',
    category: 'DAILY',
    title: 'Khúc Khải Hoàn Đầu Ngày',
    description: 'Chiến thắng 1 trận đấu bài TCG hoặc đấu trường MOBA',
    pedagogicalNote: 'Rèn luyện phản xạ tính toán và áp dụng chiến thuật hóa học',
    targetCount: 1,
    trackingKey: 'BATTLES_WON',
    reward: { knowledgeTokens: 100, elementalShards: 30, xp: 150 }
  },
  {
    id: 'daily_reactions_5',
    category: 'DAILY',
    title: 'Chuỗi Phản Ứng Rực Sáng',
    description: 'Kích hoạt 5 phản ứng hóa học trong các trận chiến',
    pedagogicalNote: 'Ghi nhớ bản chất các phản ứng trao đổi, oxi hóa khử và phân hủy',
    targetCount: 5,
    trackingKey: 'REACTIONS_TRIGGERED',
    reward: { knowledgeTokens: 120, elementalShards: 40, xp: 120 }
  },
  {
    id: 'daily_compound_3',
    category: 'DAILY',
    title: 'Kỹ Thuật Viên Tổng Hợp',
    description: 'Triệu hồi tổng hợp thành công 3 quái thú hợp chất',
    pedagogicalNote: 'Thực hành cân bằng hệ số tỉ lượng và xác định chất tham gia',
    targetCount: 3,
    trackingKey: 'COMPOUNDS_CREATED',
    reward: { knowledgeTokens: 150, elementalShards: 50, xp: 200 }
  },
  {
    id: 'daily_srs_review',
    category: 'DAILY',
    title: 'Củng Cố Trí Nhớ CA-SRS',
    description: 'Hoàn thành 3 câu hỏi ôn tập phản ứng hóa học thông minh',
    pedagogicalNote: 'Củng cố kiến thức theo đường cong lãng quên Ebbinghaus',
    targetCount: 3,
    trackingKey: 'SRS_REVIEWS',
    reward: { knowledgeTokens: 100, elementalShards: 35, xp: 100 }
  },

  // --- WEEKLY MISSIONS ---
  {
    id: 'weekly_win_10',
    category: 'WEEKLY',
    title: 'Bậc Thầy Đấu Trường Hóa Học',
    description: 'Chiến thắng 10 trận đấu trong tuần',
    pedagogicalNote: 'Thành thạo ứng biến chiến thuật với các bộ bài nguyên tố đối lập',
    targetCount: 10,
    trackingKey: 'BATTLES_WON',
    reward: { knowledgeTokens: 600, elementalShards: 200, xp: 800, cardPackType: 'RARE' }
  },
  {
    id: 'weekly_reactions_25',
    category: 'WEEKLY',
    title: 'Cộng Hưởng Nhiệt Động Học',
    description: 'Thực hiện 25 phản ứng hóa học trên đấu trường',
    pedagogicalNote: 'Làm chủ các tương tác nhiệt lượng và nguyên lý Le Chatelier',
    targetCount: 25,
    trackingKey: 'REACTIONS_TRIGGERED',
    reward: { knowledgeTokens: 500, elementalShards: 150, xp: 600 }
  },
  {
    id: 'weekly_compounds_10',
    category: 'WEEKLY',
    title: 'Nhà Kiến Tạo Hợp Chất',
    description: 'Tổng hợp 10 hợp chất đặc biệt trên sân đấu',
    pedagogicalNote: 'Lắp ghép liên kết cộng hóa trị, liên kết ion và phối trí phức tạp',
    targetCount: 10,
    trackingKey: 'COMPOUNDS_CREATED',
    reward: { knowledgeTokens: 550, elementalShards: 180, xp: 700, cardPackType: 'COMPOUND' }
  },

  // --- CHEMISTRY SPECIALIZED MISSIONS ---
  {
    id: 'chem_water_synthesis',
    category: 'CHEMISTRY',
    title: 'Nguồn Nước Của Sự Sống (H₂O)',
    description: 'Tổng hợp Thủy Long Tinh Khiết H₂O: 2H₂ + O₂ → 2H₂O',
    pedagogicalNote: 'Phản ứng tỏa nhiệt mạnh giữa hydro và oxy tạo dung môi sự sống',
    targetCount: 1,
    trackingKey: 'CUSTOM_TRIGGER',
    customCondition: 'H2O',
    reward: { knowledgeTokens: 200, elementalShards: 150, xp: 300, cardPackType: 'ELEMENT' }
  },
  {
    id: 'chem_salt_synthesis',
    category: 'CHEMISTRY',
    title: 'Tinh Thể Muối Mỏ (NaCl)',
    description: 'Tổng hợp Kim Thần Tinh Thể NaCl: 2Na + Cl₂ → 2NaCl',
    pedagogicalNote: 'Phản ứng hình thành liên kết ion kinh điển giữa kim loại kiềm và halogen',
    targetCount: 1,
    trackingKey: 'CUSTOM_TRIGGER',
    customCondition: 'NaCl',
    reward: { knowledgeTokens: 200, elementalShards: 150, xp: 300, cardRewardId: 'card_comp_nacl', cardRewardName: 'Kim Thần Tinh Thể — NaCl' }
  },
  {
    id: 'chem_thermite_melt',
    category: 'CHEMISTRY',
    title: 'Hỏa Thần Nhiệt Nhôm (3000°C)',
    description: 'Kích hoạt phản ứng nhiệt nhôm: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe',
    pedagogicalNote: 'Phản ứng khử oxit sắt bằng nhôm giải phóng nhiệt độ nóng chảy kim loại',
    targetCount: 1,
    trackingKey: 'CUSTOM_TRIGGER',
    customCondition: 'THERMITE',
    reward: { knowledgeTokens: 300, elementalShards: 200, xp: 500, cardRewardId: 'card_comp_fe2o3', cardRewardName: 'Hỏa Thần Nhiệt Nhôm — Al₂O₃' }
  },

  // --- COLLECTION MISSIONS ---
  {
    id: 'col_elements_10',
    category: 'COLLECTION',
    title: 'Thám Hiểm Bảng Tuần Hoàn I',
    description: 'Mở khóa tối thiểu 10 nguyên tố hóa học',
    pedagogicalNote: 'Thu thập các nguyên tố thuộc chu kỳ 1, 2 và 3',
    targetCount: 10,
    trackingKey: 'ELEMENTS_OWNED',
    reward: { knowledgeTokens: 250, elementalShards: 200, xp: 300 }
  },
  {
    id: 'col_cards_25',
    category: 'COLLECTION',
    title: 'Kho Tàng Học Giả I',
    description: 'Sở hữu tối thiểu 25 thẻ bài trong bộ sưu tập cá nhân',
    pedagogicalNote: 'Mở rộng chiều sâu chiến thuật và đa dạng hóa bộ bài',
    targetCount: 25,
    trackingKey: 'COLLECTION_SIZE',
    reward: { knowledgeTokens: 300, elementalShards: 250, xp: 400, cardPackType: 'BASIC' }
  },
  {
    id: 'col_cards_50',
    category: 'COLLECTION',
    title: 'Kho Tàng Học Giả II',
    description: 'Sở hữu tối thiểu 50 thẻ bài trong bộ sưu tập cá nhân',
    pedagogicalNote: 'Xây dựng kho thẻ hoàn chỉnh sẵn sàng cho giải đấu Master Duel',
    targetCount: 50,
    trackingKey: 'COLLECTION_SIZE',
    reward: { knowledgeTokens: 500, elementalShards: 400, xp: 800, cardPackType: 'RARE' }
  },

  // --- BEGINNER MISSIONS ---
  {
    id: 'beg_tutorial',
    category: 'BEGINNER',
    title: 'Tốt Nghiệp Tân Thủ Lab',
    description: 'Hoàn thành hướng dẫn cơ bản trong Phòng Thí Nghiệm',
    pedagogicalNote: 'Làm quen với 6 pha lượt đấu và cơ chế tương tác nguyên tố',
    targetCount: 1,
    trackingKey: 'TUTORIAL_DONE',
    reward: { knowledgeTokens: 200, elementalShards: 100, xp: 200 }
  },
  {
    id: 'beg_deck_craft',
    category: 'BEGINNER',
    title: 'Nhà Thiết Kế Bộ Bài',
    description: 'Tùy chỉnh và lưu 1 bộ bài chiến thuật 30-60 lá',
    pedagogicalNote: 'Tuân thủ Master Rule về số lượng lá bài chính và Extra Deck',
    targetCount: 1,
    trackingKey: 'DECK_SAVED',
    reward: { knowledgeTokens: 150, elementalShards: 80, xp: 150 }
  }
];

export class MissionsEngine {
  private static STORAGE_KEY = 'elementa_user_missions_v1';

  /**
   * Load user mission progress from persistent storage
   */
  public static loadProgress(): Record<string, UserMissionProgress> {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('[MissionsEngine] Failed to load missions progress:', e);
    }
    return {};
  }

  /**
   * Save user mission progress to persistent storage
   */
  public static saveProgress(progress: Record<string, UserMissionProgress>): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('[MissionsEngine] Failed to save missions progress:', e);
    }
  }

  /**
   * Calculate current progress for all missions based on player profile
   */
  public static getEvaluatedMissions(profile: PlayerProfile): Array<{
    definition: MissionDefinition;
    progress: UserMissionProgress;
  }> {
    const saved = this.loadProgress();
    const collectionSize = Object.values(profile.cardCollection || {}).reduce((s, n) => s + n, 0);
    const elementsOwned = (profile.unlockedElementZ || []).length;

    return CANONICAL_MISSIONS.map((def) => {
      const existing = saved[def.id] || {
        missionId: def.id,
        currentCount: 0,
        isCompleted: false,
        isClaimed: false
      };

      let currentCount = existing.currentCount;

      switch (def.trackingKey) {
        case 'BATTLES_WON':
          currentCount = Math.max(currentCount, profile.stats?.battlesWon || profile.battlesWon || 0);
          break;
        case 'BATTLES_PLAYED':
          currentCount = Math.max(currentCount, profile.stats?.battlesPlayed || profile.battlesPlayed || 0);
          break;
        case 'REACTIONS_TRIGGERED':
          currentCount = Math.max(currentCount, profile.stats?.reactionsTriggered || profile.reactionsTriggered || 0);
          break;
        case 'COLLECTION_SIZE':
          currentCount = Math.max(currentCount, collectionSize);
          break;
        case 'ELEMENTS_OWNED':
          currentCount = Math.max(currentCount, elementsOwned);
          break;
        case 'TUTORIAL_DONE':
          currentCount = profile.tutorialCompleted ? 1 : 0;
          break;
        case 'SRS_REVIEWS':
          currentCount = Math.max(currentCount, (profile.srsItems || []).filter(i => (i.repetitionCount || 0) > 0).length);
          break;
        case 'COMPOUNDS_CREATED':
        case 'DECK_SAVED':
        case 'CUSTOM_TRIGGER':
          // Preserved in existing progress
          break;
      }

      const isCompleted = currentCount >= def.targetCount;

      return {
        definition: def,
        progress: {
          ...existing,
          currentCount,
          isCompleted,
          completedAt: isCompleted && !existing.completedAt ? new Date().toISOString() : existing.completedAt
        }
      };
    });
  }

  /**
   * Increment a custom tracking event (e.g. compounds created, custom reactions)
   */
  public static recordEvent(
    trackingKey: 'COMPOUNDS_CREATED' | 'DECK_SAVED' | 'CUSTOM_TRIGGER',
    customCondition?: string,
    amount: number = 1
  ): void {
    const saved = this.loadProgress();

    CANONICAL_MISSIONS.forEach((def) => {
      if (def.trackingKey === trackingKey) {
        if (customCondition && def.customCondition && def.customCondition !== customCondition) {
          return;
        }

        const prog = saved[def.id] || {
          missionId: def.id,
          currentCount: 0,
          isCompleted: false,
          isClaimed: false
        };

        prog.currentCount += amount;
        if (prog.currentCount >= def.targetCount) {
          prog.isCompleted = true;
          if (!prog.completedAt) prog.completedAt = new Date().toISOString();
        }

        saved[def.id] = prog;
      }
    });

    this.saveProgress(saved);
  }

  /**
   * Claim reward for a completed mission. Prevents double claiming.
   */
  public static claimReward(
    missionId: string,
    profile: PlayerProfile,
    updateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void
  ): { success: boolean; reward?: MissionReward; message: string } {
    const mission = CANONICAL_MISSIONS.find((m) => m.id === missionId);
    if (!mission) {
      return { success: false, message: 'Nhiệm vụ không tồn tại trong hệ thống.' };
    }

    const saved = this.loadProgress();
    let prog = saved[missionId];

    if (!prog || !prog.isCompleted) {
      // Dynamically evaluate with current profile
      const evaluated = this.getEvaluatedMissions(profile).find((m) => m.definition.id === missionId);
      if (evaluated && evaluated.progress.isCompleted) {
        prog = evaluated.progress;
      }
    }

    if (!prog || !prog.isCompleted) {
      return { success: false, message: 'Nhiệm vụ chưa hoàn thành.' };
    }

    if (prog.isClaimed) {
      return { success: false, message: 'Phần thưởng nhiệm vụ này đã được nhận trước đó.' };
    }

    // Mark as claimed
    prog.isClaimed = true;
    prog.claimedAt = new Date().toISOString();
    saved[missionId] = prog;
    this.saveProgress(saved);

    // Apply reward to profile
    updateProfile((prev) => {
      const nextCollection = { ...(prev.cardCollection || {}) };
      if (mission.reward.cardRewardId) {
        nextCollection[mission.reward.cardRewardId] = (nextCollection[mission.reward.cardRewardId] || 0) + 1;
      }

      return {
        ...prev,
        knowledgeTokens: prev.knowledgeTokens + mission.reward.knowledgeTokens,
        elementalShards: (prev.elementalShards || 0) + mission.reward.elementalShards,
        xp: prev.xp + mission.reward.xp,
        cardCollection: nextCollection
      };
    });

    return {
      success: true,
      reward: mission.reward,
      message: `Đã nhận thành công +${mission.reward.knowledgeTokens} Tokens, +${mission.reward.elementalShards} Shards, +${mission.reward.xp} XP!`
    };
  }
}
