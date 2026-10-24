// src/domain/opponentAi.ts
// Rule-Based Deterministic Opponent AI for ELEMENTA

import { CombatCard, CombatantState } from './types';

export type AiDifficulty = 'BEGINNER' | 'STANDARD' | 'ADVANCED' | 'EXPERT';

export interface AiDecision {
  action: 'PLAY_CARD' | 'TRIGGER_COMBO' | 'END_TURN';
  cardUid?: string;
  reason: string;
}

export class OpponentAi {
  public static decideAction(
    aiState: CombatantState,
    playerState: CombatantState,
    difficulty: AiDifficulty
  ): AiDecision {
    // 1. If AI already has board cards and conditions that form a combo, trigger combo!
    const boardElementSymbols = aiState.boardElements
      .filter(c => c.type === 'ELEMENT' && c.element)
      .map(c => c.element!.symbol);
    const hasConditions = aiState.activeConditions.length > 0;

    if (boardElementSymbols.length > 0 && hasConditions) {
      // If we have Na/K + H2O, Fe + O2, or Zn + Acid, trigger combo!
      if (
        (boardElementSymbols.includes('Na') && aiState.activeConditions.includes('MOISTURE_H2O')) ||
        (boardElementSymbols.includes('K') && aiState.activeConditions.includes('MOISTURE_H2O')) ||
        (boardElementSymbols.includes('Fe') && aiState.activeConditions.includes('OXYGEN_GAS')) ||
        (boardElementSymbols.includes('Zn') && aiState.activeConditions.includes('ACID_DILUTE'))
      ) {
        return {
          action: 'TRIGGER_COMBO',
          reason: 'Kích hoạt Combo phản ứng tối ưu đã đủ điều kiện trên sàn đấu!'
        };
      }
    }

    // 2. Filter playable cards from hand based on remaining Mana
    const playableCards = aiState.hand.filter(card => {
      const cost = card.type === 'ELEMENT' ? card.element!.stats.mana_cost : card.environment!.mana_cost;
      return cost <= aiState.mana;
    });

    if (playableCards.length === 0) {
      return {
        action: 'END_TURN',
        reason: 'Hết năng lượng Mana, kết thúc lượt.'
      };
    }

    // 3. Strategy by difficulty: EXPERT -> ADVANCED -> STANDARD -> BEGINNER
    if (difficulty === 'EXPERT') {
      // Lethal check: If player HP <= 200, prioritize direct burst element or reaction
      if (playerState.hp <= 200) {
        const burstCard = playableCards.find(c => c.type === 'ELEMENT' && c.element && c.element.stats.atk_red >= 80);
        if (burstCard) {
          return {
            action: 'PLAY_CARD',
            cardUid: burstCard.uid,
            reason: `[EXPERT] Kích hoạt sát thương kết liễu với ${burstCard.element?.name_iupac}!`
          };
        }
      }

      // Counterplay & Disruption: If player has Fe/Cu and AI has moisture/oxygen/acid
      const playerHasFe = playerState.boardElements.some(b => b.element?.symbol === 'Fe');
      if (playerHasFe) {
        const corrosiveEnv = playableCards.find(c => c.type === 'ENVIRONMENT' && (c.environment?.conditionType === 'OXYGEN_GAS' || c.environment?.conditionType === 'ACID_DILUTE'));
        if (corrosiveEnv && !aiState.activeConditions.includes(corrosiveEnv.environment!.conditionType)) {
          return {
            action: 'PLAY_CARD',
            cardUid: corrosiveEnv.uid,
            reason: `[EXPERT] Thiết lập môi trường ăn mòn ${corrosiveEnv.environment?.name_vi} để khắc chế kim loại của đối thủ.`
          };
        }
      }

      // High-yield combo setup (Na/K + H2O)
      const hasNaOrK = aiState.boardElements.some(b => b.element?.symbol === 'Na' || b.element?.symbol === 'K');
      if (hasNaOrK) {
        const h2oCard = playableCards.find(c => c.type === 'ENVIRONMENT' && c.environment?.conditionType === 'MOISTURE_H2O');
        if (h2oCard && !aiState.activeConditions.includes('MOISTURE_H2O')) {
          return {
            action: 'PLAY_CARD',
            cardUid: h2oCard.uid,
            reason: '[EXPERT] Tung Nước H2O kích hoạt nổ tỏa nhiệt nhóm IA!'
          };
        }
      }

      // Low HP Shielding
      if (aiState.hp < aiState.maxHp * 0.45) {
        const shieldCard = playableCards.find(c => c.type === 'ELEMENT' && (c.element?.symbol === 'He' || c.element?.symbol === 'Au'));
        if (shieldCard && !aiState.boardElements.some(b => b.element?.symbol === shieldCard.element?.symbol)) {
          return {
            action: 'PLAY_CARD',
            cardUid: shieldCard.uid,
            reason: '[EXPERT] Triển khai lá chắn nguyên tố trơ bảo vệ sinh mệnh.'
          };
        }
      }
    } else if (difficulty === 'ADVANCED') {
      // Defensive check: If HP is low (< 40%) and has Inert Shield (He/Au), play it
      if (aiState.hp < aiState.maxHp * 0.4) {
        const shieldCard = playableCards.find(c => c.type === 'ELEMENT' && (c.element?.symbol === 'He' || c.element?.symbol === 'Au'));
        if (shieldCard && !aiState.boardElements.some(b => b.element?.symbol === shieldCard.element?.symbol)) {
          return {
            action: 'PLAY_CARD',
            cardUid: shieldCard.uid,
            reason: 'Triển khai lá chắn trơ bảo vệ khi máu xuống thấp.'
          };
        }
      }

      // Combo synergy prioritization
      const hasNa = aiState.boardElements.some(b => b.element?.symbol === 'Na');
      if (hasNa) {
        const h2oCard = playableCards.find(c => c.type === 'ENVIRONMENT' && c.environment?.conditionType === 'MOISTURE_H2O');
        if (h2oCard && !aiState.activeConditions.includes('MOISTURE_H2O')) {
          return {
            action: 'PLAY_CARD',
            cardUid: h2oCard.uid,
            reason: 'Tung thẻ Nước H2O để kích hoạt bùng nổ nhiệt Natri.'
          };
        }
      }
    }

    // Standard/Default play: play the highest synergy card or first playable element
    const elementCard = playableCards.find(c => c.type === 'ELEMENT' && !aiState.boardElements.some(b => b.element?.symbol === c.element?.symbol));
    if (elementCard) {
      return {
        action: 'PLAY_CARD',
        cardUid: elementCard.uid,
        reason: `Triển khai nguyên tố ${elementCard.element?.name_iupac} lên sàn đấu.`
      };
    }

    // Otherwise play environmental card
    const envCard = playableCards.find(c => c.type === 'ENVIRONMENT' && !aiState.activeConditions.includes(c.environment!.conditionType));
    if (envCard) {
      return {
        action: 'PLAY_CARD',
        cardUid: envCard.uid,
        reason: `Kích hoạt tác nhân môi trường ${envCard.environment?.name_vi}.`
      };
    }

    return {
      action: 'END_TURN',
      reason: 'Đã hoàn tất sắp xếp chiến thuật lượt này.'
    };
  }
}
