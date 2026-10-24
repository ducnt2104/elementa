// src/domain/spacedRepetition.ts
// Chemistry-Aware Adaptive Spaced Repetition System (CA-SRS)

import { SrsItem, CognitiveErrorLevel } from './types';

export interface SrsStatistics {
  total: number;
  dueCount: number;
  leechCount: number;
  masteredCount: number; // Cards with interval >= 21 days
  learningCount: number; // Cards with interval < 21 days
  averageEaseFactor: number;
  averageIntervalDays: number;
}

export class SpacedRepetitionService {
  public static readonly LEECH_THRESHOLD = 4; // Lapses >= 4 marks item as a chronic misconception leech
  public static readonly MAX_INTERVAL_DAYS = 180; // Hard clamp at 180 days (half academic year)
  public static readonly MIN_EASE_FACTOR = 1.3; // SuperMemo lower bound on ease factor

  /**
   * Calculates error level weight omega_err based on Bloom cognitive taxonomy
   */
  public static getErrorWeight(level: CognitiveErrorLevel): number {
    switch (level) {
      case 1: return 1.00; // Level 1 (Nhận biết - standard 1-3-7-14 schedule)
      case 2: return 0.85; // Level 2 (Thông hiểu - shortens interval by 15% to reinforce environmental conditions earlier)
      case 3: return 0.70; // Level 3 (Vận dụng - strong penalty for conceptual traps like Cu + HCl)
      default: return 1.00;
    }
  }

  /**
   * Creates a new SRS item queued from an in-game mistake.
   */
  public static createItemFromMistake(
    targetId: string,
    targetType: 'ELEMENT' | 'REACTION',
    title: string,
    question: string,
    correctAnswer: string,
    options: string[],
    explanation: string,
    errorLevel: CognitiveErrorLevel
  ): SrsItem {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      id: `srs_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      targetId,
      targetType,
      title,
      question,
      correctAnswer,
      options,
      explanation,
      errorLevel,
      repetitionCount: 0,
      intervalDays: 1, // I_1 = 1 day base
      easeFactor: 2.5,
      dueDate: tomorrow.toISOString(),
      consecutiveSuccesses: 0,
      lapses: 0,
      isLeech: false
    };
  }

  /**
   * Computes the next interval given user answer correctness (quality 0-5).
   * Supports optional fine-grained quality rating (0: blackout, 3: pass with effort, 5: perfect).
   */
  public static processReview(
    item: SrsItem,
    isCorrect: boolean,
    quality?: number
  ): SrsItem {
    const effectiveQuality = quality !== undefined ? quality : (isCorrect ? 5 : 1);
    const passed = isCorrect && effectiveQuality >= 3;
    const omega = this.getErrorWeight(item.errorLevel);

    let nextInterval: number;
    let nextConsecutive = item.consecutiveSuccesses;
    let nextEase = item.easeFactor;
    let nextLapses = item.lapses || 0;
    let isLeech = item.isLeech || false;

    if (!passed) {
      // Failed review: Reset interval to 1 day, increment lapse count
      nextInterval = 1;
      nextConsecutive = 0;
      nextLapses += 1;
      if (nextLapses >= this.LEECH_THRESHOLD) {
        isLeech = true;
      }
      if (quality !== undefined) {
        // Detailed SM-2 quality degradation formula
        nextEase = Math.max(
          this.MIN_EASE_FACTOR,
          item.easeFactor + (0.1 - (5 - effectiveQuality) * (0.08 + (5 - effectiveQuality) * 0.02))
        );
      } else {
        // Standard binary failure degradation
        nextEase = Math.max(this.MIN_EASE_FACTOR, item.easeFactor - 0.2);
      }
    } else {
      nextConsecutive += 1;
      // Leech recovery: 3 consecutive correct reviews clears the leech flag
      if (isLeech && nextConsecutive >= 3) {
        isLeech = false;
      }

      if (nextConsecutive === 1) {
        nextInterval = 1;
      } else if (nextConsecutive === 2) {
        nextInterval = 3;
      } else if (nextConsecutive === 3) {
        nextInterval = Math.round(7 * omega);
      } else if (nextConsecutive === 4) {
        nextInterval = Math.round(14 * omega);
      } else {
        // Subsequent reviews: I_k = min(MAX_INTERVAL, round(I_{k-1} * EF * omega_err))
        nextInterval = Math.min(
          this.MAX_INTERVAL_DAYS,
          Math.round(item.intervalDays * item.easeFactor * omega)
        );
      }

      // Update Ease Factor (SuperMemo SM-2 adaptation)
      if (quality !== undefined) {
        nextEase = Math.max(
          this.MIN_EASE_FACTOR,
          item.easeFactor + (0.1 - (5 - effectiveQuality) * (0.08 + (5 - effectiveQuality) * 0.02))
        );
      } else {
        nextEase = Math.max(this.MIN_EASE_FACTOR, item.easeFactor + 0.1);
      }
    }

    const clampedInterval = Math.min(this.MAX_INTERVAL_DAYS, Math.max(1, nextInterval));
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + clampedInterval);

    return {
      ...item,
      repetitionCount: item.repetitionCount + 1,
      intervalDays: clampedInterval,
      easeFactor: nextEase,
      dueDate: nextDueDate.toISOString(),
      lastReviewedDate: new Date().toISOString(),
      consecutiveSuccesses: nextConsecutive,
      lapses: nextLapses,
      isLeech
    };
  }

  /**
   * Filters all items that are due on or before today.
   */
  public static getDueItems(items: SrsItem[]): SrsItem[] {
    const now = new Date();
    return items.filter(item => new Date(item.dueDate) <= now);
  }

  /**
   * Identifies all leech cards (cards with >= 4 lapses needing pedagogical intervention).
   */
  public static getLeechItems(items: SrsItem[]): SrsItem[] {
    return items.filter(item => item.isLeech === true || (item.lapses || 0) >= this.LEECH_THRESHOLD);
  }

  /**
   * Filters items by Bloom's Cognitive Error Level (1: Nhận biết, 2: Thông hiểu, 3: Vận dụng).
   */
  public static getItemsByCognitiveLevel(items: SrsItem[], level: CognitiveErrorLevel): SrsItem[] {
    return items.filter(item => item.errorLevel === level);
  }

  /**
   * Computes the number of cards that will become due within daysAhead days.
   */
  public static getDueForecast(items: SrsItem[], daysAhead: number): number {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + daysAhead);
    return items.filter(item => new Date(item.dueDate) <= cutoff).length;
  }

  /**
   * Generates comprehensive retention and mastery metrics for the student's SRS repository.
   */
  public static getSrsStatistics(items: SrsItem[]): SrsStatistics {
    const total = items.length;
    if (total === 0) {
      return {
        total: 0,
        dueCount: 0,
        leechCount: 0,
        masteredCount: 0,
        learningCount: 0,
        averageEaseFactor: 2.5,
        averageIntervalDays: 0
      };
    }

    const dueCount = this.getDueItems(items).length;
    const leechCount = this.getLeechItems(items).length;
    const masteredCount = items.filter(it => it.intervalDays >= 21).length;
    const learningCount = total - masteredCount;
    const sumEase = items.reduce((acc, it) => acc + it.easeFactor, 0);
    const sumInterval = items.reduce((acc, it) => acc + it.intervalDays, 0);

    return {
      total,
      dueCount,
      leechCount,
      masteredCount,
      learningCount,
      averageEaseFactor: Math.round((sumEase / total) * 100) / 100,
      averageIntervalDays: Math.round((sumInterval / total) * 10) / 10
    };
  }
}
