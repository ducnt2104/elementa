// src/domain/shardsEconomy.ts
// Elemental Shards Crafting & Recycling Economy Engine for ELEMENTA Tactical TCG
// Strictly decoupled from Knowledge Tokens; dedicated to targeted card progression.

import { PlayerProfile } from './types';
import { PlayableCardDef, CardRarity } from './cardGameTypes';
import { getPlayableCardById, getAllPlayableCards } from '../data/playableCardsData';

export const SHARD_CRAFTING_COSTS: Record<CardRarity, number> = {
  COMMON: 60,
  RARE: 160,
  SUPER_RARE: 400,
  ULTRA_RARE: 1000,
  SECRET_RARE: 2400
};

export const SHARD_RECYCLE_YIELDS: Record<CardRarity, number> = {
  COMMON: 15,
  RARE: 40,
  SUPER_RARE: 100,
  ULTRA_RARE: 250,
  SECRET_RARE: 600
};

export function getCardCraftingCost(card: PlayableCardDef): number {
  return SHARD_CRAFTING_COSTS[card.rarity] || 160;
}

export function getCardRecycleYield(card: PlayableCardDef): number {
  return SHARD_RECYCLE_YIELDS[card.rarity] || 40;
}

export interface DuplicateScanResult {
  totalCardsToRecycle: number;
  totalShardsEarned: number;
  duplicateItems: { card: PlayableCardDef; currentCount: number; excessCount: number; shardsPerCopy: number }[];
}

/**
 * Scans player collection for duplicate copies beyond the standard maximum 3 copies.
 */
export function scanDuplicateCards(collection: Record<string, number>): DuplicateScanResult {
  const duplicateItems: DuplicateScanResult['duplicateItems'] = [];
  let totalCardsToRecycle = 0;
  let totalShardsEarned = 0;

  for (const [cardId, count] of Object.entries(collection)) {
    if (count > 3) {
      const card = getPlayableCardById(cardId);
      if (card) {
        const excess = count - 3;
        const yieldPerCopy = getCardRecycleYield(card);
        totalCardsToRecycle += excess;
        totalShardsEarned += excess * yieldPerCopy;
        duplicateItems.push({
          card,
          currentCount: count,
          excessCount: excess,
          shardsPerCopy: yieldPerCopy
        });
      }
    }
  }

  return { totalCardsToRecycle, totalShardsEarned, duplicateItems };
}

/**
 * Crafts a specific card using player's Elemental Shards.
 */
export function craftCardWithShards(
  profile: PlayerProfile,
  cardId: string
): { success: boolean; message: string; updatedProfile?: PlayerProfile } {
  const card = getPlayableCardById(cardId);
  if (!card) {
    return { success: false, message: `Thẻ bài với ID [${cardId}] không tồn tại trong kho dữ liệu!` };
  }

  const cost = getCardCraftingCost(card);
  const currentShards = profile.elementalShards || 0;

  if (currentShards < cost) {
    return {
      success: false,
      message: `Không đủ Elemental Shards! Cần ${cost} Shards (Hiện có: ${currentShards} Shards).`
    };
  }

  const currentCollection = { ...(profile.cardCollection || {}) };
  const currentCount = currentCollection[cardId] || 0;

  if (currentCount >= 3) {
    return {
      success: false,
      message: `Bạn đã sở hữu tối đa 3 bản sao của thẻ [${card.name}]. Không cần chế tạo thêm!`
    };
  }

  currentCollection[cardId] = currentCount + 1;
  const nextShards = currentShards - cost;

  const newTx = {
    id: `tx_craft_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'CARD_CRAFT' as const,
    amount: cost,
    timestamp: new Date().toISOString(),
    detail: `Chế tạo thẻ bài [${card.name}] (${card.rarity}) bằng ${cost} Elemental Shards.`
  };

  const updatedProfile: PlayerProfile = {
    ...profile,
    elementalShards: nextShards,
    cardCollection: currentCollection,
    auditTransactions: [...(profile.auditTransactions || []), newTx]
  };

  return {
    success: true,
    message: `Chế tạo thành công thẻ [${card.name}]! (-${cost} Elemental Shards)`,
    updatedProfile
  };
}

/**
 * Disenchants all duplicate card copies (>3) in player collection into Elemental Shards.
 */
export function recycleDuplicates(
  profile: PlayerProfile
): { success: boolean; countRecycled: number; shardsGained: number; message: string; updatedProfile?: PlayerProfile } {
  const scan = scanDuplicateCards(profile.cardCollection || {});
  if (scan.totalCardsToRecycle <= 0) {
    return {
      success: false,
      countRecycled: 0,
      shardsGained: 0,
      message: 'Không có thẻ bài trùng lặp (>3 bản sao) để phân rã!'
    };
  }

  const nextCollection = { ...(profile.cardCollection || {}) };
  for (const item of scan.duplicateItems) {
    nextCollection[item.card.id] = 3; // Clamp to 3 copies
  }

  const currentShards = profile.elementalShards || 0;
  const nextShards = currentShards + scan.totalShardsEarned;

  const newTx = {
    id: `tx_recycle_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'CARD_RECYCLE' as const,
    amount: scan.totalShardsEarned,
    timestamp: new Date().toISOString(),
    detail: `Phân rã ${scan.totalCardsToRecycle} thẻ trùng lặp, nhận ${scan.totalShardsEarned} Elemental Shards.`
  };

  const updatedProfile: PlayerProfile = {
    ...profile,
    elementalShards: nextShards,
    cardCollection: nextCollection,
    auditTransactions: [...(profile.auditTransactions || []), newTx]
  };

  return {
    success: true,
    countRecycled: scan.totalCardsToRecycle,
    shardsGained: scan.totalShardsEarned,
    message: `Phân rã thành công ${scan.totalCardsToRecycle} thẻ trùng! Nhận +${scan.totalShardsEarned} Elemental Shards.`,
    updatedProfile
  };
}
