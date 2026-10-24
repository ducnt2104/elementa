// server/src/quests/questService.ts
// Quests Tracking & CA-SRS Spaced Repetition Scheduling Service

import * as crypto from 'crypto';
import { DatabaseManager } from '../db/database';

export interface UserQuestDTO {
  id: string;
  category: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardXp: number;
  rewardTokens: number;
  rewardShards: number;
  isCompleted: boolean;
  isClaimed: boolean;
}

export interface SrsReviewItem {
  id: string;
  topicId: string;
  errorType: string;
  errorLevel: number;
  repetitions: number;
  stability: number;
  nextReviewDate: string;
  isDue: boolean;
}

export class QuestService {
  private dbManager: DatabaseManager;

  constructor(dbManager?: DatabaseManager) {
    this.dbManager = dbManager || DatabaseManager.getInstance();
  }

  /**
   * Get all quests for a user, initializing progress if not yet recorded
   */
  public getUserQuests(userId: string): UserQuestDTO[] {
    const allQuests = this.dbManager.db.prepare('SELECT * FROM quests').all() as any[];
    const progressList = this.dbManager.db.prepare(`
      SELECT quest_id, current_count, is_completed, is_claimed FROM user_quest_progress WHERE user_id = ?
    `).all(userId) as any[];

    const progressMap = new Map<string, any>();
    for (const p of progressList) {
      progressMap.set(p.quest_id, p);
    }

    return allQuests.map((q) => {
      const prog = progressMap.get(q.id);
      const currentCount = prog ? prog.current_count : 0;
      const isCompleted = currentCount >= q.target_count || Boolean(prog && prog.is_completed);
      const isClaimed = Boolean(prog && prog.is_claimed);

      return {
        id: q.id,
        category: q.category,
        title: q.title,
        description: q.description,
        targetCount: q.target_count,
        currentCount,
        rewardXp: q.reward_xp,
        rewardTokens: q.reward_tokens,
        rewardShards: q.reward_shards,
        isCompleted,
        isClaimed
      };
    });
  }

  /**
   * Increment quest progress for a user
   */
  public incrementProgress(userId: string, questId: string, amount: number = 1): void {
    const quest = this.dbManager.db.prepare('SELECT target_count FROM quests WHERE id = ?').get(questId) as any;
    if (!quest) return;

    const now = new Date().toISOString();
    const existing = this.dbManager.db.prepare(`
      SELECT id, current_count, is_completed FROM user_quest_progress WHERE user_id = ? AND quest_id = ?
    `).get(userId, questId) as any;

    if (!existing) {
      const newCount = Math.min(quest.target_count, amount);
      const isDone = newCount >= quest.target_count ? 1 : 0;
      const progId = 'uqp_' + crypto.randomBytes(8).toString('hex');

      this.dbManager.db.prepare(`
        INSERT INTO user_quest_progress (id, user_id, quest_id, current_count, is_completed, is_claimed, last_updated)
        VALUES (?, ?, ?, ?, ?, 0, ?)
      `).run(progId, userId, questId, newCount, isDone, now);
    } else if (!existing.is_completed) {
      const newCount = Math.min(quest.target_count, existing.current_count + amount);
      const isDone = newCount >= quest.target_count ? 1 : 0;

      this.dbManager.db.prepare(`
        UPDATE user_quest_progress SET current_count = ?, is_completed = ?, last_updated = ?
        WHERE id = ?
      `).run(newCount, isDone, now, existing.id);
    }
  }

  /**
   * Claim completed quest reward (Atomic with anti-duplicate claim)
   */
  public claimQuestReward(userId: string, questId: string): { xp: number; tokens: number; shards: number } {
    return this.dbManager.transaction(() => {
      const quest = this.dbManager.db.prepare('SELECT * FROM quests WHERE id = ?').get(questId) as any;
      if (!quest) throw new Error('Nhiệm vụ không tồn tại');

      const prog = this.dbManager.db.prepare(`
        SELECT id, current_count, is_completed, is_claimed FROM user_quest_progress WHERE user_id = ? AND quest_id = ?
      `).get(userId, questId) as any;

      if (!prog || !prog.is_completed) {
        throw new Error('Nhiệm vụ chưa hoàn thành');
      }

      if (prog.is_claimed) {
        throw new Error('Phần thưởng đã được nhận trước đó');
      }

      // Mark claimed
      const now = new Date().toISOString();
      this.dbManager.db.prepare(`
        UPDATE user_quest_progress SET is_claimed = 1, last_updated = ? WHERE id = ?
      `).run(now, prog.id);

      // Award XP, tokens, shards
      this.dbManager.db.prepare(`
        UPDATE user_profiles
        SET xp = xp + ?, knowledge_tokens = knowledge_tokens + ?, elemental_shards = elemental_shards + ?
        WHERE user_id = ?
      `).run(quest.reward_xp, quest.reward_tokens, quest.reward_shards, userId);

      this.dbManager.db.prepare(`
        UPDATE wallets
        SET tokens = tokens + ?, shards = shards + ?, updated_at = ?
        WHERE user_id = ?
      `).run(quest.reward_tokens, quest.reward_shards, now, userId);

      // Record transaction
      const txId = 'tx_' + crypto.randomBytes(12).toString('hex');
      this.dbManager.db.prepare(`
        INSERT INTO currency_transactions (id, user_id, transaction_type, token_delta, shard_delta, item_id, created_at)
        VALUES (?, ?, 'QUEST_REWARD', ?, ?, ?, ?)
      `).run(txId, userId, quest.reward_tokens, quest.reward_shards, questId, now);

      return {
        xp: quest.reward_xp,
        tokens: quest.reward_tokens,
        shards: quest.reward_shards
      };
    });
  }

  // ==========================================
  // CA-SRS (Spaced Repetition) Subsystem
  // ==========================================

  /**
   * Record a match error into CA-SRS and schedule interval
   */
  public recordMatchError(userId: string, topicId: string, errorType: string, errorLevel: number): void {
    const now = new Date();
    // Default initial review interval: 1 day
    const nextDate = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    const srsId = 'srs_' + crypto.randomBytes(8).toString('hex');

    this.dbManager.db.prepare(`
      INSERT INTO srs_reviews (id, user_id, topic_id, error_type, error_level, repetitions, stability, next_review_date, last_review_date)
      VALUES (?, ?, ?, ?, ?, 0, 1.0, ?, ?)
      ON CONFLICT(user_id, topic_id) DO UPDATE SET
        error_level = MAX(error_level, excluded.error_level),
        next_review_date = excluded.next_review_date,
        last_review_date = excluded.last_review_date
    `).run(srsId, userId, topicId, errorType, errorLevel, nextDate, now.toISOString());
  }

  /**
   * Get all due CA-SRS reviews for player
   */
  public getDueSrsReviews(userId: string): SrsReviewItem[] {
    const rows = this.dbManager.db.prepare(`
      SELECT * FROM srs_reviews WHERE user_id = ?
    `).all(userId) as any[];

    const nowTime = Date.now();
    return rows.map((r) => ({
      id: r.id,
      topicId: r.topic_id,
      errorType: r.error_type,
      errorLevel: r.error_level,
      repetitions: r.repetitions,
      stability: r.stability,
      nextReviewDate: r.next_review_date,
      isDue: new Date(r.next_review_date).getTime() <= nowTime
    }));
  }

  /**
   * Process a successful CA-SRS review (advances 1 -> 3 -> 7 -> 14 days)
   */
  public processReviewSuccess(userId: string, topicId: string): { nextIntervalDays: number } {
    const existing = this.dbManager.db.prepare(`
      SELECT * FROM srs_reviews WHERE user_id = ? AND topic_id = ?
    `).get(userId, topicId) as any;

    if (!existing) return { nextIntervalDays: 1 };

    const reps = existing.repetitions + 1;
    let days = 1;
    if (reps === 1) days = 3;
    else if (reps === 2) days = 7;
    else days = 14;

    const nextDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    this.dbManager.db.prepare(`
      UPDATE srs_reviews
      SET repetitions = ?, next_review_date = ?, last_review_date = ?
      WHERE user_id = ? AND topic_id = ?
    `).run(reps, nextDate, now, userId, topicId);

    return { nextIntervalDays: days };
  }
}
