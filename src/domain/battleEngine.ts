// src/domain/battleEngine.ts
// Tactical Turn-Based Battle State Machine for ELEMENTA

import {
  CombatantState,
  CombatCard,
  BattlePhase,
  CombatLogEntry,
  ReactionRule,
  CognitiveErrorLevel
} from './types';
import { ALL_ELEMENTS, ENVIRONMENTAL_CARDS } from '../data/elementsData';
import { defaultReactionEngine, ReactionEvaluationResult } from './reactionEngine';
import { OpponentAi, AiDifficulty } from './opponentAi';

export interface BattleDebriefData {
  outcome: 'VICTORY' | 'DEFEAT' | 'DRAW';
  turnsElapsed: number;
  successfulReactions: { rule: ReactionRule; turn: number }[];
  failedCombinations: {
    symbolOrPair: string;
    level: CognitiveErrorLevel;
    message: string;
    turn: number;
  }[];
  xpGained: number;
}

export class BattleEngine {
  public player: CombatantState;
  public opponent: CombatantState;
  public phase: BattlePhase = 'TURN_START';
  public turn: number = 1;
  public logs: CombatLogEntry[] = [];
  public debrief: BattleDebriefData | null = null;
  public difficulty: AiDifficulty;

  private playerDeckPool: CombatCard[] = [];
  private opponentDeckPool: CombatCard[] = [];
  private logIdCounter = 0;

  constructor(playerDeckCardIds: string[], difficulty: AiDifficulty = 'STANDARD') {
    this.difficulty = difficulty;
    this.playerDeckPool = this.buildDeckCards(playerDeckCardIds);
    this.opponentDeckPool = this.buildAiDeck(difficulty);

    this.player = {
      name: 'Học Giả Nguyên Tố (Bạn)',
      isPlayer: true,
      hp: 300,
      maxHp: 300,
      shield: 50,
      mana: 2,
      maxMana: 5,
      hand: [],
      boardElements: [],
      activeConditions: [],
      statusEffects: []
    };

    this.opponent = {
      name: difficulty === 'BEGINNER' ? 'Robot Thử Nghiệm Alpha' : (difficulty === 'STANDARD' ? 'Học Viện Giả Kim Beta' : 'Giáo Sư Nguyên Tố Omega'),
      isPlayer: false,
      hp: difficulty === 'BEGINNER' ? 220 : (difficulty === 'STANDARD' ? 300 : 360),
      maxHp: difficulty === 'BEGINNER' ? 220 : (difficulty === 'STANDARD' ? 300 : 360),
      shield: 40,
      mana: 2,
      maxMana: 5,
      hand: [],
      boardElements: [],
      activeConditions: [],
      statusEffects: []
    };

    this.initBattle();
  }

  private buildDeckCards(cardIds: string[]): CombatCard[] {
    const cards: CombatCard[] = [];
    for (const id of cardIds) {
      if (id.startsWith('elem_')) {
        const z = parseInt(id.replace('elem_', ''), 10);
        const elem = ALL_ELEMENTS.find(e => e.z === z);
        if (elem) {
          cards.push({ uid: `card_${Date.now()}_${Math.random()}`, type: 'ELEMENT', element: elem });
        }
      } else if (id.startsWith('env_')) {
        const env = ENVIRONMENTAL_CARDS.find(e => e.id === id);
        if (env) {
          cards.push({ uid: `card_${Date.now()}_${Math.random()}`, type: 'ENVIRONMENT', environment: env });
        }
      }
    }
    // Fallback if empty deck provided
    if (cards.length === 0) {
      const defaultElems = [11, 26, 29, 2];
      defaultElems.forEach(z => {
        const elem = ALL_ELEMENTS.find(e => e.z === z);
        if (elem) cards.push({ uid: `def_${z}`, type: 'ELEMENT', element: elem });
      });
      ENVIRONMENTAL_CARDS.forEach(env => {
        cards.push({ uid: `def_${env.id}`, type: 'ENVIRONMENT', environment: env });
      });
    }
    return cards;
  }

  private buildAiDeck(difficulty: AiDifficulty): CombatCard[] {
    const aiIds = difficulty === 'BEGINNER'
      ? ['elem_11', 'elem_12', 'elem_1', 'env_h2o', 'env_o2']
      : ['elem_11', 'elem_26', 'elem_2', 'elem_30', 'elem_29', 'env_h2o', 'env_o2', 'env_temp', 'env_acid', 'env_base'];
    return this.buildDeckCards(aiIds);
  }

  private addLog(source: CombatLogEntry['source'], message: string, detail?: string, isSuccess?: boolean, isFail?: boolean, ruleCode?: string) {
    this.logs.unshift({
      id: `log_${this.logIdCounter++}`,
      turn: this.turn,
      source,
      message,
      detail,
      isReactionSuccess: isSuccess,
      isReactionFail: isFail,
      ruleCode
    });
  }

  public initBattle() {
    // Draw initial 4 cards for both
    for (let i = 0; i < 4; i++) {
      this.drawCard(this.player, this.playerDeckPool);
      this.drawCard(this.opponent, this.opponentDeckPool);
    }
    this.addLog('SYSTEM', 'Trận đấu bắt đầu! Hãy phân bổ nguyên tố và điều kiện môi trường để kích hoạt phản ứng hóa học.');
    this.startPlayerTurn();
  }

  private drawCard(combatant: CombatantState, pool: CombatCard[]) {
    if (combatant.hand.length >= 5) return;
    const randomCard = pool[Math.floor(Math.random() * pool.length)];
    if (randomCard) {
      combatant.hand.push({
        ...randomCard,
        uid: `drawn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
      });
    }
  }

  public startPlayerTurn() {
    this.phase = 'PLAYER_ACTION';
    this.player.mana = Math.min(this.player.maxMana, this.turn + 1);
    this.drawCard(this.player, this.playerDeckPool);
    this.tickStatusEffects(this.player);
    this.addLog('SYSTEM', `Lượt ${this.turn} — Lượt của bạn. Năng lượng Mana: ${this.player.mana}/${this.player.maxMana}.`);
    this.checkWinLoss();
  }

  private tickStatusEffects(combatant: CombatantState) {
    const active: typeof combatant.statusEffects = [];
    for (const eff of combatant.statusEffects) {
      if (eff.archetype === 'CORROSION_DOT') {
        const dmg = eff.potency;
        combatant.hp = Math.max(0, combatant.hp - dmg);
        this.addLog('SYSTEM', `${combatant.name} chịu ${dmg} sát thương từ ${eff.name_vi}.`);
      }
      if (eff.remainingTurns > 1) {
        active.push({ ...eff, remainingTurns: eff.remainingTurns - 1 });
      }
    }
    combatant.statusEffects = active;
  }

  public playCard(cardUid: string): boolean {
    if (this.phase !== 'PLAYER_ACTION') return false;

    const cardIdx = this.player.hand.findIndex(c => c.uid === cardUid);
    if (cardIdx === -1) return false;
    const card = this.player.hand[cardIdx];

    const cost = card.type === 'ELEMENT' ? card.element!.stats.mana_cost : card.environment!.mana_cost;
    if (this.player.mana < cost) {
      this.addLog('SYSTEM', `Không đủ Mana! Cần ${cost} Mana để tung thẻ này.`);
      return false;
    }

    // Spend mana
    this.player.mana -= cost;
    this.player.hand.splice(cardIdx, 1);

    if (card.type === 'ELEMENT') {
      this.player.boardElements.push(card);
      this.addLog('PLAYER', `Triển khai nguyên tố ${card.element!.name_iupac} (${card.element!.symbol}) lên bàn đấu.`);
    } else if (card.type === 'ENVIRONMENT') {
      if (!this.player.activeConditions.includes(card.environment!.conditionType)) {
        this.player.activeConditions.push(card.environment!.conditionType);
      }
      this.addLog('PLAYER', `Kích hoạt tác nhân môi trường: ${card.environment!.name_vi} (${card.environment!.symbol}).`);
    }

    return true;
  }

  public triggerCombo(): ReactionEvaluationResult {
    if (this.phase !== 'PLAYER_ACTION') {
      return {
        engineState: 'NO_REACTION_IN_MODEL',
        status: 'NO_REACTION',
        pedagogicalMessage: 'Chưa đến lượt kích hoạt phản ứng!',
        manaPenaltyPercent: 0
      };
    }

    const elementSymbols = this.player.boardElements
      .filter(c => c.type === 'ELEMENT' && c.element)
      .map(c => c.element!.symbol);

    const result = defaultReactionEngine.evaluateCombination(elementSymbols, this.player.activeConditions);

    if (result.status === 'SUCCESS' && result.matchedRule) {
      const rule = result.matchedRule;
      this.addLog('REACTION', `COMBO KÍCH HOẠT: ${rule.equation}`, result.pedagogicalMessage, true, false, rule.code);

      // Apply tactical effects
      this.applyReactionEffect(this.player, this.opponent, rule);

      // Clear reacted elements and conditions from board
      this.player.boardElements = [];
      this.player.activeConditions = [];

      this.recordSuccessDebrief(rule);
    } else {
      // Penalty handling
      const manaPenalty = Math.max(1, Math.round(this.player.mana * (result.manaPenaltyPercent / 100)));
      this.player.mana = Math.max(0, this.player.mana - manaPenalty);

      this.addLog('REACTION', `KẾT HỢP KHÔNG THÀNH CÔNG: -${manaPenalty} Mana`, result.pedagogicalMessage, false, true);

      if (result.errorLog) {
        this.recordFailureDebrief(result.errorLog);
      }
    }

    this.checkWinLoss();
    return result;
  }

  private applyReactionEffect(source: CombatantState, target: CombatantState, rule: ReactionRule) {
    const power = rule.basePower;

    switch (rule.effectArchetype) {
      case 'BURST_DAMAGE': {
        let remainingDmg = power;
        if (target.shield > 0) {
          const absorbed = Math.min(target.shield, remainingDmg);
          target.shield -= absorbed;
          remainingDmg -= absorbed;
        }
        target.hp = Math.max(0, target.hp - remainingDmg);
        this.addLog('REACTION', `Gây ${power} sát thương nhiệt trực tiếp lên ${target.name}!`);
        break;
      }
      case 'CORROSION_DOT': {
        target.shield = Math.max(0, target.shield - 20);
        target.statusEffects.push({
          id: `eff_${Date.now()}`,
          archetype: 'CORROSION_DOT',
          name_vi: 'Ăn mòn hóa học',
          potency: Math.round(power / 3),
          remainingTurns: rule.durationTurns || 3,
          description: 'Suy giảm giáp và trừ máu mỗi lượt.'
        });
        this.addLog('REACTION', `Gắn trạng thái Ăn mòn (${rule.durationTurns} lượt) lên ${target.name}.`);
        break;
      }
      case 'INERT_SHIELD': {
        source.shield = Math.min(150, source.shield + power);
        this.addLog('REACTION', `${source.name} tăng thêm ${power} điểm Lá chắn phòng thủ.`);
        break;
      }
      case 'CLEANSE_DISPEL': {
        source.statusEffects = [];
        this.addLog('REACTION', `Hóa giải toàn bộ hiệu ứng bất lợi trên ${source.name}!`);
        break;
      }
      case 'FREEZE_STUN':
      case 'BLIND_ACCURACY': {
        target.hp = Math.max(0, target.hp - Math.round(power * 0.7));
        target.statusEffects.push({
          id: `eff_${Date.now()}`,
          archetype: rule.effectArchetype,
          name_vi: rule.name_vi,
          potency: 15,
          remainingTurns: 2,
          description: 'Hạn chế hành động đối phương.'
        });
        this.addLog('REACTION', `Kìm hãm đối phương với hiệu ứng ${rule.name_vi}!`);
        break;
      }
    }
  }

  public endPlayerTurn() {
    if (this.phase !== 'PLAYER_ACTION') return;
    this.phase = 'AI_ACTION';
    this.addLog('SYSTEM', 'Bạn kết thúc lượt. Đối thủ đang tính toán...');

    setTimeout(() => {
      this.executeAiTurn();
    }, 600);
  }

  private executeAiTurn() {
    this.opponent.mana = Math.min(this.opponent.maxMana, this.turn + 1);
    this.drawCard(this.opponent, this.opponentDeckPool);
    this.tickStatusEffects(this.opponent);

    if (this.checkWinLoss()) return;

    // AI takes up to 3 sub-actions
    let actionsTaken = 0;
    while (actionsTaken < 3) {
      actionsTaken++;
      const decision = OpponentAi.decideAction(this.opponent, this.player, this.difficulty);

      if (decision.action === 'PLAY_CARD' && decision.cardUid) {
        const cardIdx = this.opponent.hand.findIndex(c => c.uid === decision.cardUid);
        if (cardIdx !== -1) {
          const card = this.opponent.hand[cardIdx];
          const cost = card.type === 'ELEMENT' ? card.element!.stats.mana_cost : card.environment!.mana_cost;
          if (this.opponent.mana >= cost) {
            this.opponent.mana -= cost;
            this.opponent.hand.splice(cardIdx, 1);
            if (card.type === 'ELEMENT') {
              this.opponent.boardElements.push(card);
              this.addLog('OPPONENT', `${this.opponent.name} tung ${card.element!.symbol} (${card.element!.name_iupac}).`);
            } else {
              if (!this.opponent.activeConditions.includes(card.environment!.conditionType)) {
                this.opponent.activeConditions.push(card.environment!.conditionType);
              }
              this.addLog('OPPONENT', `${this.opponent.name} kích hoạt điều kiện ${card.environment!.name_vi}.`);
            }
          }
        }
      } else if (decision.action === 'TRIGGER_COMBO') {
        const elementSymbols = this.opponent.boardElements
          .filter(c => c.type === 'ELEMENT' && c.element)
          .map(c => c.element!.symbol);
        const res = defaultReactionEngine.evaluateCombination(elementSymbols, this.opponent.activeConditions);
        if (res.status === 'SUCCESS' && res.matchedRule) {
          this.addLog('OPPONENT', `ĐỐI THỦ KÍCH HOẠT: ${res.matchedRule.equation}`, res.pedagogicalMessage, true);
          this.applyReactionEffect(this.opponent, this.player, res.matchedRule);
          this.opponent.boardElements = [];
          this.opponent.activeConditions = [];
        }
        break;
      } else {
        // END_TURN
        break;
      }
    }

    if (this.checkWinLoss()) return;

    // Next turn
    this.turn += 1;
    this.startPlayerTurn();
  }

  private checkWinLoss(): boolean {
    if (this.opponent.hp <= 0) {
      this.phase = 'VICTORY';
      this.compileDebrief('VICTORY');
      this.addLog('SYSTEM', 'CHIẾN THẮNG! Bạn đã làm chủ kiến thức phản ứng hóa học.');
      return true;
    }
    if (this.player.hp <= 0) {
      this.phase = 'DEFEAT';
      this.compileDebrief('DEFEAT');
      this.addLog('SYSTEM', 'THẤT BẠI! Lượng HP của bạn đã cạn kiệt. Hãy xem lại nhật ký hóa học để cải thiện bộ bài.');
      return true;
    }
    return false;
  }

  private successList: { rule: ReactionRule; turn: number }[] = [];
  private failList: { symbolOrPair: string; level: CognitiveErrorLevel; message: string; turn: number }[] = [];

  private recordSuccessDebrief(rule: ReactionRule) {
    this.successList.push({ rule, turn: this.turn });
  }

  private recordFailureDebrief(error: { symbolOrPair: string; level: CognitiveErrorLevel; message: string }) {
    this.failList.push({ ...error, turn: this.turn });
  }

  private compileDebrief(outcome: 'VICTORY' | 'DEFEAT') {
    const baseExp = outcome === 'VICTORY' ? 120 : 40;
    const comboBonus = this.successList.length * 30;
    this.debrief = {
      outcome,
      turnsElapsed: this.turn,
      successfulReactions: this.successList,
      failedCombinations: this.failList,
      xpGained: baseExp + comboBonus
    };
  }
}
