// src/domain/rankedSystem.ts
// Ranked Ladder, Seasonal Progression & Curriculum Quests Engine for ELEMENTA

export type RankedTierId = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'MASTER';

export interface RankedTierConfig {
  id: RankedTierId;
  name: string;
  name_en: string;
  minMmr: number;
  maxMmr: number;
  badgeColor: string;
  icon: string;
  borderClass: string;
  bgGradient: string;
  promotionReward: { xp: number; shards: number; packCount: number };
}

export const RANKED_TIERS: RankedTierConfig[] = [
  {
    id: 'BRONZE',
    name: 'Đồng Nguyên Tố',
    name_en: 'Bronze Elementalist',
    minMmr: 0,
    maxMmr: 999,
    badgeColor: '#CD7F32',
    icon: '🥉',
    borderClass: 'border-amber-700',
    bgGradient: 'from-amber-950/60 to-slate-900',
    promotionReward: { xp: 100, shards: 50, packCount: 1 }
  },
  {
    id: 'SILVER',
    name: 'Bạc Hóa Học',
    name_en: 'Silver Alchemist',
    minMmr: 1000,
    maxMmr: 1499,
    badgeColor: '#C0C0C0',
    icon: '🥈',
    borderClass: 'border-slate-400',
    bgGradient: 'from-slate-800/80 to-slate-950',
    promotionReward: { xp: 200, shards: 100, packCount: 2 }
  },
  {
    id: 'GOLD',
    name: 'Vàng Quang Phổ',
    name_en: 'Gold Spectroscopist',
    minMmr: 1500,
    maxMmr: 1999,
    badgeColor: '#FFD700',
    icon: '🥇',
    borderClass: 'border-amber-400',
    bgGradient: 'from-amber-900/60 to-slate-950',
    promotionReward: { xp: 350, shards: 200, packCount: 3 }
  },
  {
    id: 'PLATINUM',
    name: 'Bạch Kim Liên Kết',
    name_en: 'Platinum Bondmaster',
    minMmr: 2000,
    maxMmr: 2499,
    badgeColor: '#00FFFF',
    icon: '💠',
    borderClass: 'border-cyan-400',
    bgGradient: 'from-cyan-950/80 to-slate-950',
    promotionReward: { xp: 500, shards: 350, packCount: 4 }
  },
  {
    id: 'DIAMOND',
    name: 'Kim Cương Tinh Thể',
    name_en: 'Diamond Crystallographer',
    minMmr: 2500,
    maxMmr: 2999,
    badgeColor: '#B9F2FF',
    icon: '💎',
    borderClass: 'border-sky-300',
    bgGradient: 'from-sky-950/80 to-slate-950',
    promotionReward: { xp: 800, shards: 500, packCount: 5 }
  },
  {
    id: 'MASTER',
    name: 'Bậc Thầy Nguyên Tố',
    name_en: 'Grand Master of Elements',
    minMmr: 3000,
    maxMmr: 99999,
    badgeColor: '#FF4500',
    icon: '👑',
    borderClass: 'border-red-500 ring-2 ring-amber-400',
    bgGradient: 'from-red-950/90 via-purple-950/80 to-slate-950',
    promotionReward: { xp: 1500, shards: 1000, packCount: 10 }
  }
];

export interface RankedMatchRecord {
  id: string;
  timestamp: number;
  opponentName: string;
  outcome: 'VICTORY' | 'DEFEAT';
  mmrDelta: number;
  playerLpRemaining: number;
  opponentLpRemaining: number;
  turns: number;
  reactionsTriggered: number;
  tributesUsed: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  scientificContext: string;
  category: 'DAILY' | 'CURRICULUM';
  actionKey: 'WIN_DUEL' | 'TRIGGER_REACTION' | 'TRIBUTE_SUMMON' | 'ACTIVATE_TRAP' | 'HABER_BOSCH' | 'SULFUR_CONTACT' | 'PRECIPITATE_BASO4';
  currentProgress: number;
  targetCount: number;
  isClaimed: boolean;
  isCompleted: boolean;
  rewardXp: number;
  rewardShards: number;
}

export interface RankedProfile {
  mmr: number;
  currentTierId: RankedTierId;
  division: number; // 4, 3, 2, 1 (1 is highest before tier promotion)
  peakMmr: number;
  wins: number;
  losses: number;
  currentWinStreak: number;
  longestWinStreak: number;
  seasonId: string;
  demotionShield?: number; // Protected matches remaining against tier demotion
  matchHistory: RankedMatchRecord[];
  quests: Quest[];
}

const STORAGE_KEY = 'elementa_ranked_profile_v2';

export const DEFAULT_QUESTS: Quest[] = [
  // Daily Quests
  {
    id: 'DAILY_WIN_1',
    title: 'Chiến Thắng Xếp Hạng',
    description: 'Giành chiến thắng trong 1 trận Đấu Bài Xếp Hạng (TCG Duel)',
    scientificContext: 'Khảo sát năng lực điều phối nguyên tố và phản ứng trên đấu trường thực chiến.',
    category: 'DAILY',
    actionKey: 'WIN_DUEL',
    currentProgress: 0,
    targetCount: 1,
    isClaimed: false,
    isCompleted: false,
    rewardXp: 120,
    rewardShards: 60
  },
  {
    id: 'DAILY_REACTIONS_3',
    title: 'Bậc Thầy Phản Ứng',
    description: 'Thực hiện 3 phản ứng hóa học hoặc kích hoạt phép phản ứng trên sân',
    scientificContext: 'Tuân thủ định luật bảo toàn khối lượng và tỉ lệ phản ứng hợp thức.',
    category: 'DAILY',
    actionKey: 'TRIGGER_REACTION',
    currentProgress: 0,
    targetCount: 3,
    isClaimed: false,
    isCompleted: false,
    rewardXp: 150,
    rewardShards: 80
  },
  {
    id: 'DAILY_TRIBUTE_1',
    title: 'Hiến Tế Cấp Cao',
    description: 'Triệu hồi 1 quái thú Cấp 6+ (Emperor Nitric Acid, Sulfuric King, Potassium Superburst) bằng cách hiến tế quái thú nhỏ hơn',
    scientificContext: 'Năng lượng giải phóng từ liên kết bị bẻ gãy kích hoạt trạng thái oxy hóa cao nhất.',
    category: 'DAILY',
    actionKey: 'TRIBUTE_SUMMON',
    currentProgress: 0,
    targetCount: 1,
    isClaimed: false,
    isCompleted: false,
    rewardXp: 180,
    rewardShards: 90
  },
  {
    id: 'DAILY_TRAP_1',
    title: 'Bẫy Hóa Học Bất Ngờ',
    description: 'Kích hoạt 1 lá bẫy phòng thủ (Khói Khí NH4Cl, Khiên H2S, Vụ Nổ Natri) từ sân đấu khi bị đối phương tấn công',
    scientificContext: 'Phản ứng bảo vệ khẩn cấp ứng dụng khí độc cản quang hoặc phản ứng tỏa nhiệt cực mạnh.',
    category: 'DAILY',
    actionKey: 'ACTIVATE_TRAP',
    currentProgress: 0,
    targetCount: 1,
    isClaimed: false,
    isCompleted: false,
    rewardXp: 100,
    rewardShards: 50
  },

  // Curriculum GDPT 2018 Quests
  {
    id: 'CURR_HABER_1',
    title: 'Tổng Hợp Amoniac (Haber-Bosch)',
    description: 'Kích hoạt quy trình Haber-Bosch hoặc tạo ra Amoniac NH3 từ N2 và H2',
    scientificContext: 'N2(g) + 3H2(g) ⇌ 2NH3(g) (ΔH < 0, xúc tác Fe/K2O/Al2O3, 450°C, 200 atm).',
    category: 'CURRICULUM',
    actionKey: 'HABER_BOSCH',
    currentProgress: 0,
    targetCount: 1,
    isClaimed: false,
    isCompleted: false,
    rewardXp: 250,
    rewardShards: 150
  },
  {
    id: 'CURR_SULFUR_1',
    title: 'Quy Trình Tiếp Xúc (H2SO4)',
    description: 'Thực hiện phản ứng oxy hóa SO2 với V2O5 xúc tác hoặc tạo ra H2SO4 King',
    scientificContext: '2SO2 + O2 ⇌ 2SO3 (xúc tác V2O5, 450°C). SO3 + H2SO4 → Oleum H2S2O7 → H2SO4 đặc.',
    category: 'CURRICULUM',
    actionKey: 'SULFUR_CONTACT',
    currentProgress: 0,
    targetCount: 1,
    isClaimed: false,
    isCompleted: false,
    rewardXp: 250,
    rewardShards: 150
  },
  {
    id: 'CURR_BASO4_1',
    title: 'Kết Tủa Bari Sunfat Trắng',
    description: 'Tạo kết tủa trắng Bari Sunfat BaSO4 không tan trong axit mạnh',
    scientificContext: 'Ba²⁺ + SO4²⁻ → BaSO4↓ (màu trắng). Phản ứng đặc trưng nhận biết ion Sunfat.',
    category: 'CURRICULUM',
    actionKey: 'PRECIPITATE_BASO4',
    currentProgress: 0,
    targetCount: 1,
    isClaimed: false,
    isCompleted: false,
    rewardXp: 200,
    rewardShards: 100
  }
];

export class RankedSystem {
  private profile: RankedProfile;

  constructor() {
    this.profile = this.loadProfile();
  }

  private loadProfile(): RankedProfile {
    try {
      const dataStr = localStorage.getItem(STORAGE_KEY);
      if (dataStr) {
        const parsed = JSON.parse(dataStr);
        // Ensure quests are populated if missing
        if (!parsed.quests || parsed.quests.length === 0) {
          parsed.quests = [...DEFAULT_QUESTS];
        }
        return parsed;
      }
    } catch (e) {
      // ignore
    }

    return {
      mmr: 1200,
      currentTierId: 'SILVER',
      division: 3,
      peakMmr: 1200,
      wins: 0,
      losses: 0,
      currentWinStreak: 0,
      longestWinStreak: 0,
      seasonId: 'SEASON_1_ATOMIC_DAWN',
      demotionShield: 0,
      matchHistory: [],
      quests: [...DEFAULT_QUESTS]
    };
  }

  public save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profile));
    } catch (e) {
      // ignore
    }
  }

  public getProfile(): RankedProfile {
    return { ...this.profile };
  }

  public getTierConfig(tierId?: RankedTierId): RankedTierConfig {
    const id = tierId || this.profile.currentTierId;
    return RANKED_TIERS.find(t => t.id === id) || RANKED_TIERS[0];
  }

  public calculateTier(mmr: number): { tier: RankedTierConfig; division: number } {
    const tier = RANKED_TIERS.slice().reverse().find(t => mmr >= t.minMmr) || RANKED_TIERS[0];
    const span = Math.max(1, tier.maxMmr - tier.minMmr);
    const progress = Math.max(0, Math.min(1, (mmr - tier.minMmr) / span));
    
    // 4 divisions: IV (0-25%), III (25-50%), II (50-75%), I (75-100%)
    let division = 4;
    if (progress >= 0.75) division = 1;
    else if (progress >= 0.50) division = 2;
    else if (progress >= 0.25) division = 3;

    return { tier, division };
  }

  /**
   * Process and record the result of a duel match
   */
  public recordDuelResult(params: {
    opponentName: string;
    outcome: 'VICTORY' | 'DEFEAT';
    playerLpRemaining: number;
    opponentLpRemaining: number;
    turns: number;
    reactionsTriggered?: number;
    tributesUsed?: number;
  }): { mmrDelta: number; newMmr: number; tierUp: boolean; rewards: { xp: number; shards: number } } {
    const isWin = params.outcome === 'VICTORY';
    const oldTier = this.profile.currentTierId;

    let baseMmrDelta = isWin ? 30 : -18;

    // Bonus for swift victory or high remaining LP
    if (isWin) {
      if (params.playerLpRemaining >= 6000) baseMmrDelta += 5;
      if (params.turns <= 6) baseMmrDelta += 5;
      if ((params.reactionsTriggered || 0) >= 2) baseMmrDelta += 5;
      this.profile.wins += 1;
      this.profile.currentWinStreak += 1;
      if (this.profile.currentWinStreak > this.profile.longestWinStreak) {
        this.profile.longestWinStreak = this.profile.currentWinStreak;
      }
    } else {
      // Bronze protection: never lose MMR in Bronze
      if (this.profile.currentTierId === 'BRONZE') {
        baseMmrDelta = 0;
      } else if (this.profile.demotionShield && this.profile.demotionShield > 0) {
        const currentTier = this.getTierConfig(this.profile.currentTierId);
        if (this.profile.mmr + baseMmrDelta < currentTier.minMmr) {
          // Demotion buffer absorbs the loss down to tier floor
          baseMmrDelta = -(this.profile.mmr - currentTier.minMmr);
          this.profile.demotionShield -= 1;
        }
      }
      this.profile.losses += 1;
      this.profile.currentWinStreak = 0;
    }

    const newMmr = Math.max(0, this.profile.mmr + baseMmrDelta);
    this.profile.mmr = newMmr;
    if (newMmr > this.profile.peakMmr) {
      this.profile.peakMmr = newMmr;
    }

    const { tier: newTier, division: newDivision } = this.calculateTier(newMmr);
    const tierUp = RANKED_TIERS.findIndex(t => t.id === newTier.id) > RANKED_TIERS.findIndex(t => t.id === oldTier);
    if (tierUp) {
      this.profile.demotionShield = 3; // Grant 3-match safety shield on tier promotion
    }
    this.profile.currentTierId = newTier.id;
    this.profile.division = newDivision;

    // Record to history
    const matchRecord: RankedMatchRecord = {
      id: `match_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      opponentName: params.opponentName,
      outcome: params.outcome,
      mmrDelta: baseMmrDelta,
      playerLpRemaining: params.playerLpRemaining,
      opponentLpRemaining: params.opponentLpRemaining,
      turns: params.turns,
      reactionsTriggered: params.reactionsTriggered || 0,
      tributesUsed: params.tributesUsed || 0
    };
    this.profile.matchHistory.unshift(matchRecord);
    if (this.profile.matchHistory.length > 20) {
      this.profile.matchHistory.pop();
    }

    // Update quest progress automatically
    if (isWin) {
      this.progressQuest('WIN_DUEL', 1);
    }
    if ((params.reactionsTriggered || 0) > 0) {
      this.progressQuest('TRIGGER_REACTION', params.reactionsTriggered || 1);
    }
    if ((params.tributesUsed || 0) > 0) {
      this.progressQuest('TRIBUTE_SUMMON', params.tributesUsed || 1);
    }

    this.save();

    const xpReward = isWin ? 200 + (params.turns * 10) : 50;
    const shardsReward = isWin ? 60 : 15;

    return {
      mmrDelta: baseMmrDelta,
      newMmr,
      tierUp,
      rewards: { xp: xpReward, shards: shardsReward }
    };
  }

  /**
   * Progress a quest by action key
   */
  public progressQuest(actionKey: Quest['actionKey'], amount: number = 1): void {
    let changed = false;
    for (const q of this.profile.quests) {
      if (q.actionKey === actionKey && !q.isCompleted) {
        q.currentProgress = Math.min(q.targetCount, q.currentProgress + amount);
        if (q.currentProgress >= q.targetCount) {
          q.isCompleted = true;
        }
        changed = true;
      }
    }
    if (changed) this.save();
  }

  /**
   * Claim reward for a completed quest
   */
  public claimQuest(questId: string): { success: boolean; xp: number; shards: number; message: string } {
    const q = this.profile.quests.find(quest => quest.id === questId);
    if (!q) {
      return { success: false, xp: 0, shards: 0, message: 'Nhiệm vụ không tồn tại.' };
    }
    if (!q.isCompleted) {
      return { success: false, xp: 0, shards: 0, message: 'Nhiệm vụ chưa hoàn thành mục tiêu.' };
    }
    if (q.isClaimed) {
      return { success: false, xp: 0, shards: 0, message: 'Phần thưởng nhiệm vụ này đã được nhận.' };
    }

    q.isClaimed = true;
    this.save();

    return {
      success: true,
      xp: q.rewardXp,
      shards: q.rewardShards,
      message: `Đã nhận thành công +${q.rewardXp} XP và +${q.rewardShards} Mảnh Nguyên Tố!`
    };
  }

  /**
   * Get remaining demotion shield match count
   */
  public getDemotionShield(): number {
    return this.profile.demotionShield || 0;
  }

  /**
   * Override demotion shield match count (for admin/testing/events)
   */
  public setDemotionShield(count: number): void {
    this.profile.demotionShield = Math.max(0, count);
    this.save();
  }

  /**
   * Conclude the active competitive season and perform soft MMR reset
   */
  public resetSeason(newSeasonId: string): {
    oldMmr: number;
    newMmr: number;
    previousTier: RankedTierConfig;
    seasonReward: { xp: number; shards: number; packCount: number };
  } {
    const oldMmr = this.profile.mmr;
    const previousTier = this.getTierConfig(this.profile.currentTierId);
    const seasonReward = { ...previousTier.promotionReward };

    // Competitive Soft Reset Formula:
    // MMR_new = 1000 + floor((MMR_old - 1000) * 0.5)
    // Players below Silver (MMR < 1000) are boosted to fresh placement baseline (1000)
    let newMmr = 1000;
    if (oldMmr > 1000) {
      newMmr = 1000 + Math.floor((oldMmr - 1000) * 0.5);
    }

    this.profile.mmr = newMmr;
    this.profile.peakMmr = newMmr;
    this.profile.seasonId = newSeasonId;
    this.profile.wins = 0;
    this.profile.losses = 0;
    this.profile.currentWinStreak = 0;
    this.profile.longestWinStreak = 0;
    this.profile.demotionShield = 3;

    const { tier, division } = this.calculateTier(newMmr);
    this.profile.currentTierId = tier.id;
    this.profile.division = division;

    // Reset daily quests progress
    this.profile.quests = this.profile.quests.map(q => {
      if (q.category === 'DAILY') {
        return { ...q, currentProgress: 0, isCompleted: false, isClaimed: false };
      }
      return q;
    });

    this.save();

    return {
      oldMmr,
      newMmr,
      previousTier,
      seasonReward
    };
  }
}

export const rankedEngine = new RankedSystem();
