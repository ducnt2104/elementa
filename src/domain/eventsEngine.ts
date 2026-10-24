// src/domain/eventsEngine.ts
// Timed Community Events & 7-Day Login Rewards Engine for ELEMENTA
// Manages Event lifecycle, objectives, claim verification, and Daily Login streak

import type { PlayerProfile } from './types.ts';

export interface EventObjective {
  id: string;
  title: string;
  targetCount: number;
  currentCount: number;
  trackingType: 'BATTLES_WON' | 'REACTIONS_TRIGGERED' | 'COMPOUNDS_CREATED';
  isCompleted: boolean;
}

export interface TimedEventDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  themeColor: string;
  startDate: string; // ISO String
  endDate: string;   // ISO String
  objectives: EventObjective[];
  rewards: {
    knowledgeTokens: number;
    elementalShards: number;
    xp: number;
    exclusiveCardId?: string;
    exclusiveCardName?: string;
    cardPackType?: 'RARE' | 'COMPOUND' | 'EVENT' | 'REACTION';
  };
}

export interface DailyLoginRewardDay {
  day: number;
  title: string;
  type: 'SHARDS' | 'PACK' | 'CARD' | 'XP_TOKENS' | 'JACKPOT';
  shards?: number;
  tokens?: number;
  xp?: number;
  packType?: string;
  cardId?: string;
  cardName?: string;
  icon: string;
}

export const DAILY_LOGIN_CALENDAR: DailyLoginRewardDay[] = [
  { day: 1, title: 'Ngày 1: Khởi Đầu Hóa Học', type: 'SHARDS', shards: 200, icon: '💎' },
  { day: 2, title: 'Ngày 2: Túi Bài Cơ Bản', type: 'PACK', packType: 'BASIC_PACK', shards: 50, icon: '📦' },
  { day: 3, title: 'Ngày 3: Mảnh Năng Lượng', type: 'SHARDS', shards: 350, icon: '💎' },
  { day: 4, title: 'Ngày 4: Thẻ Độc Quyền Al₂O₃', type: 'CARD', cardId: 'card_comp_fe2o3', cardName: 'Hỏa Thần Nhiệt Nhôm — Al₂O₃', shards: 100, icon: '🔥' },
  { day: 5, title: 'Ngày 5: Túi Bài Nguyên Tố', type: 'PACK', packType: 'ELEMENT_PACK', shards: 150, icon: '✨' },
  { day: 6, title: 'Ngày 6: Kinh Nghiệm & Tri Thức', type: 'XP_TOKENS', xp: 1000, tokens: 500, shards: 200, icon: '📜' },
  { day: 7, title: 'Ngày 7: Hộp Quà Hoàng Kim', type: 'JACKPOT', packType: 'ULTRA_RARE_PACK', shards: 1000, tokens: 1000, xp: 2000, icon: '👑' }
];

export const CANONICAL_TIMED_EVENTS: TimedEventDefinition[] = [
  {
    id: 'event_chemical_revolution_2026',
    title: 'ĐẠI CÁCH MẠNG HÓA HỌC (CHEMICAL REVOLUTION)',
    subtitle: 'Sự Kiện Thi Đấu Toàn Máy Chủ — Tuần Lễ Vàng',
    description: 'Tham gia các trận so tài đỉnh cao, kích hoạt chuỗi phản ứng xúc tác và tổng hợp các quái thú hợp chất để nhận thẻ bài giới hạn và rương Shards khổng lồ.',
    badge: 'SỰ KIỆN NÓNG',
    themeColor: 'from-amber-600 via-rose-600 to-purple-800',
    startDate: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    endDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    objectives: [
      { id: 'obj_win_10', title: 'Giành 10 chiến thắng trên Đấu Trường', targetCount: 10, currentCount: 0, trackingType: 'BATTLES_WON', isCompleted: false },
      { id: 'obj_react_20', title: 'Thực hiện 20 phản ứng hóa học thành công', targetCount: 20, currentCount: 0, trackingType: 'REACTIONS_TRIGGERED', isCompleted: false },
      { id: 'obj_comp_5', title: 'Tổng hợp 5 quái thú hợp chất trên sân đấu', targetCount: 5, currentCount: 0, trackingType: 'COMPOUNDS_CREATED', isCompleted: false }
    ],
    rewards: {
      knowledgeTokens: 1500,
      elementalShards: 800,
      xp: 2500,
      cardPackType: 'EVENT',
      exclusiveCardId: 'card_comp_h2o',
      exclusiveCardName: 'Thủy Long Tinh Khiết — H₂O (Foil Edition)'
    }
  },
  {
    id: 'event_acid_base_symposium',
    title: 'HỘI THẢO CÂN BẰNG AXIT — BAZƠ',
    subtitle: 'Chiến Dịch Khám Phá pH & Dung Dịch Đệm',
    description: 'Vận dụng chuẩn độ axit - bazơ, quan sát bước nhảy pH và giải quyết các câu đố Le Chatelier để rinh về các gói bài Phép Đặc Nhiệm.',
    badge: 'GIÁO DỤC GDPT',
    themeColor: 'from-cyan-600 via-blue-700 to-indigo-900',
    startDate: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
    endDate: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString(),
    objectives: [
      { id: 'obj_win_5', title: 'Giành 5 chiến thắng với bộ bài Axit/Bazơ', targetCount: 5, currentCount: 0, trackingType: 'BATTLES_WON', isCompleted: false },
      { id: 'obj_react_15', title: 'Kích hoạt 15 phản ứng trung hòa hoặc tạo kết tủa', targetCount: 15, currentCount: 0, trackingType: 'REACTIONS_TRIGGERED', isCompleted: false }
    ],
    rewards: {
      knowledgeTokens: 1000,
      elementalShards: 500,
      xp: 1500,
      cardPackType: 'REACTION'
    }
  }
];

export class EventsEngine {
  private static EVENT_STORAGE_KEY = 'elementa_user_events_v1';
  private static LOGIN_STORAGE_KEY = 'elementa_login_streak_v1';

  /**
   * Get Daily Login State
   */
  public static getDailyLoginState(): {
    currentDay: number;
    canClaimToday: boolean;
    lastClaimDate: string | null;
    claimedDays: number[];
  } {
    try {
      const raw = localStorage.getItem(this.LOGIN_STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        const todayStr = new Date().toISOString().slice(0, 10);
        const canClaimToday = data.lastClaimDate !== todayStr;
        return {
          currentDay: data.currentDay || 1,
          canClaimToday,
          lastClaimDate: data.lastClaimDate || null,
          claimedDays: data.claimedDays || []
        };
      }
    } catch (e) {
      console.warn('[EventsEngine] Failed to read login streak:', e);
    }

    return {
      currentDay: 1,
      canClaimToday: true,
      lastClaimDate: null,
      claimedDays: []
    };
  }

  /**
   * Claim Daily Login Reward
   */
  public static claimDailyLogin(
    profile: PlayerProfile,
    updateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void
  ): { success: boolean; rewardDay?: DailyLoginRewardDay; message: string } {
    const state = this.getDailyLoginState();

    if (!state.canClaimToday) {
      return { success: false, message: 'Bạn đã điểm danh hôm nay rồi! Hãy quay lại vào ngày mai.' };
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    const dayConfig = DAILY_LOGIN_CALENDAR.find((d) => d.day === state.currentDay) || DAILY_LOGIN_CALENDAR[0];

    // Next streak calculation (cycles from 1 to 7)
    const nextClaimedDays = [...state.claimedDays, state.currentDay];
    const nextDay = state.currentDay >= 7 ? 1 : state.currentDay + 1;

    try {
      localStorage.setItem(
        this.LOGIN_STORAGE_KEY,
        JSON.stringify({
          currentDay: nextDay,
          lastClaimDate: todayStr,
          claimedDays: nextClaimedDays
        })
      );
    } catch (e) {
      console.warn('[EventsEngine] Failed to save login streak:', e);
    }

    // Apply reward to profile
    updateProfile((prev) => {
      const nextCollection = { ...(prev.cardCollection || {}) };
      if (dayConfig.cardId) {
        nextCollection[dayConfig.cardId] = (nextCollection[dayConfig.cardId] || 0) + 1;
      }

      return {
        ...prev,
        knowledgeTokens: prev.knowledgeTokens + (dayConfig.tokens || 0),
        elementalShards: (prev.elementalShards || 0) + (dayConfig.shards || 0),
        xp: prev.xp + (dayConfig.xp || 0),
        cardCollection: nextCollection
      };
    });

    return {
      success: true,
      rewardDay: dayConfig,
      message: `Điểm danh thành công Ngày ${dayConfig.day}: ${dayConfig.title}!`
    };
  }

  /**
   * Get Active Timed Events Evaluated with Profile
   */
  public static getEvaluatedEvents(profile: PlayerProfile): Array<{
    definition: TimedEventDefinition;
    isFullyCompleted: boolean;
    isClaimed: boolean;
    remainingHours: number;
  }> {
    let claimedEvents: Record<string, boolean> = {};
    try {
      const raw = localStorage.getItem(this.EVENT_STORAGE_KEY);
      if (raw) claimedEvents = JSON.parse(raw);
    } catch (e) {
      console.warn('[EventsEngine] Failed to read event progress:', e);
    }

    const now = Date.now();
    const battlesWon = profile.stats?.battlesWon || profile.battlesWon || 0;
    const reactions = profile.stats?.reactionsTriggered || profile.reactionsTriggered || 0;

    return CANONICAL_TIMED_EVENTS.map((evt) => {
      const endMs = new Date(evt.endDate).getTime();
      const remainingHours = Math.max(0, Math.round((endMs - now) / (1000 * 3600)));

      // Evaluate objectives
      let allCompleted = true;
      evt.objectives.forEach((obj) => {
        if (obj.trackingType === 'BATTLES_WON') {
          obj.currentCount = Math.min(obj.targetCount, battlesWon);
        } else if (obj.trackingType === 'REACTIONS_TRIGGERED') {
          obj.currentCount = Math.min(obj.targetCount, reactions);
        } else if (obj.trackingType === 'COMPOUNDS_CREATED') {
          obj.currentCount = Math.min(obj.targetCount, Math.floor(reactions / 3));
        }

        obj.isCompleted = obj.currentCount >= obj.targetCount;
        if (!obj.isCompleted) allCompleted = false;
      });

      return {
        definition: evt,
        isFullyCompleted: allCompleted,
        isClaimed: Boolean(claimedEvents[evt.id]),
        remainingHours
      };
    });
  }

  /**
   * Claim Event Rewards
   */
  public static claimEventReward(
    eventId: string,
    profile: PlayerProfile,
    updateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void
  ): { success: boolean; message: string } {
    const evaluated = this.getEvaluatedEvents(profile).find((e) => e.definition.id === eventId);
    if (!evaluated) {
      return { success: false, message: 'Sự kiện không tồn tại hoặc đã hết hạn.' };
    }

    if (!evaluated.isFullyCompleted) {
      return { success: false, message: 'Bạn chưa hoàn thành tất cả mục tiêu của sự kiện này.' };
    }

    if (evaluated.isClaimed) {
      return { success: false, message: 'Bạn đã nhận thưởng sự kiện này rồi.' };
    }

    // Save claim state
    let claimedEvents: Record<string, boolean> = {};
    try {
      const raw = localStorage.getItem(this.EVENT_STORAGE_KEY);
      if (raw) claimedEvents = JSON.parse(raw);
      claimedEvents[eventId] = true;
      localStorage.setItem(this.EVENT_STORAGE_KEY, JSON.stringify(claimedEvents));
    } catch (e) {
      console.warn('[EventsEngine] Failed to save claimed event:', e);
    }

    // Apply rewards
    const rew = evaluated.definition.rewards;
    updateProfile((prev) => {
      const nextCollection = { ...(prev.cardCollection || {}) };
      if (rew.exclusiveCardId) {
        nextCollection[rew.exclusiveCardId] = (nextCollection[rew.exclusiveCardId] || 0) + 1;
      }

      return {
        ...prev,
        knowledgeTokens: prev.knowledgeTokens + rew.knowledgeTokens,
        elementalShards: (prev.elementalShards || 0) + rew.elementalShards,
        xp: prev.xp + rew.xp,
        cardCollection: nextCollection
      };
    });

    return {
      success: true,
      message: `Nhận thưởng Sự Kiện thành công: +${rew.knowledgeTokens} Tokens, +${rew.elementalShards} Shards, +${rew.xp} XP!`
    };
  }
}
