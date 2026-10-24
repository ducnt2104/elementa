// src/domain/duelEngine.ts
// Comprehensive Yu-Gi-Oh! Inspired Tactical Chemical Duel Engine

import {
  CardInstance,
  PlayableCardDef,
  DuelistState,
  DuelPhase,
  MonsterZoneSlot,
  SpellTrapZoneSlot,
  ChainItem,
  ChainTargetRef,
  ChainTargetValidationResult,
  DuelLogEntry,
  DuelOutcome,
  MonsterBattlePosition,
  ResolvedChainSummary,
  ResolvedChainItem,
  DeckSearchFilter,
  DeckTutorResult,
  BattleReplayState,
  LingeringTurnEffect,
  TemporaryControlTransferRecord,
  BattlefieldColumnIndex,
  ColumnCardRef,
  BattlefieldColumnSummary,
  FastEffectTimingBox,
  TriggerTimingType,
  GameEventRecord,
  ChemicalAttribute
} from './cardGameTypes';
import {
  PLAYABLE_CARDS,
  getPlayableCardById,
  DEFAULT_PLAYER_DECK_IDS,
  DEFAULT_EXTRA_DECK_IDS
} from '../data/playableCardsData';
import { executeStructuredEffect } from './structuredEffectResolver';
import {
  ChemicalEnvironmentState,
  ChemicalEnvironmentEngine
} from './chemicalEnvironment';
import { ReactionEngine, ReactionEvaluationResult } from './reactionEngine';
import { EnvironmentalCondition } from './types';

export type AiLevel = 'NOVICE' | 'ADEPT' | 'EXPERT' | 'MENDELEEV' | 'RANKED_AI';

export interface RankedAiDeckGenerationResult {
  mainDeck: string[]; // Exactly 60 cards (maximum allowed by Master Rules)
  extraDeck: string[]; // Exactly 15 cards (maximum allowed by Master Rules)
  metadata: {
    seed: number;
    generatedAt: string;
    totalCards: number;
    mainDeckCount: number;
    extraDeckCount: number;
    monstersCount: number;
    spellsCount: number;
    trapsCount: number;
    archetypeFocus: string;
  };
}

/**
 * Dynamically generates a fresh, randomized 60-card bot deck from the ENTIRE 7,300+ catalog
 * for Ranked vs AI mode, respecting ruleset max deck size (60 Main / 15 Extra) and max 3 copies limit.
 * Does NOT alter or inject into player collection.
 */
export function generateRankedAiMaxDeck(customSeed?: number): RankedAiDeckGenerationResult {
  const seed = customSeed !== undefined ? customSeed : Math.floor(Math.random() * 1000000) + 1;
  let currentSeed = seed;
  const pseudoRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };

  const extraPool: PlayableCardDef[] = [];
  const lowLevelMonsters: PlayableCardDef[] = [];
  const highLevelMonsters: PlayableCardDef[] = [];
  const spells: PlayableCardDef[] = [];
  const traps: PlayableCardDef[] = [];

  for (const card of PLAYABLE_CARDS) {
    if (!card || !card.id || !card.name) continue;

    const isExtra =
      ['COMPOUND_MONSTER', 'SYNCHRO_MONSTER', 'XYZ_MONSTER', 'LINK_MONSTER'].includes(card.cardType as any) ||
      (card as any).isExtraDeck;

    if (isExtra) {
      extraPool.push(card);
    } else if (['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT', 'SPELL'].includes(card.cardType)) {
      spells.push(card);
    } else if (card.cardType === 'TRAP') {
      traps.push(card);
    } else {
      const lvl = card.level || 4;
      if (lvl >= 5) {
        highLevelMonsters.push(card);
      } else {
        lowLevelMonsters.push(card);
      }
    }
  }

  const shuffleArray = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(pseudoRandom() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffledLow = shuffleArray(lowLevelMonsters);
  const shuffledHigh = shuffleArray(highLevelMonsters);
  const shuffledSpells = shuffleArray(spells);
  const shuffledTraps = shuffleArray(traps);
  const shuffledExtra = shuffleArray(extraPool);

  const cardCounts: Record<string, number> = {};
  const mainDeck: string[] = [];

  const addCards = (pool: PlayableCardDef[], targetCount: number) => {
    let poolIdx = 0;
    let added = 0;
    while (added < targetCount && poolIdx < pool.length * 3) {
      const card = pool[poolIdx % pool.length];
      poolIdx++;
      const currentCount = cardCounts[card.id] || 0;
      if (currentCount < 3) {
        cardCounts[card.id] = currentCount + 1;
        mainDeck.push(card.id);
        added++;
      }
    }
  };

  // Build exactly 60 cards: 26 Low Monsters + 8 Tribute Monsters + 16 Spells + 10 Traps
  addCards(shuffledLow, 26);
  addCards(shuffledHigh, 8);
  addCards(shuffledSpells, 16);
  addCards(shuffledTraps, 10);

  // Guarantee strictly 60 cards
  while (mainDeck.length < 60) {
    const fallbackPool = [...shuffledLow, ...shuffledSpells, ...shuffledTraps];
    for (const card of fallbackPool) {
      if ((cardCounts[card.id] || 0) < 3) {
        cardCounts[card.id] = (cardCounts[card.id] || 0) + 1;
        mainDeck.push(card.id);
        if (mainDeck.length === 60) break;
      }
    }
    if (mainDeck.length < 60) {
      mainDeck.push('card_elem_11_na');
    }
  }

  // Extra Deck: strictly 15 cards
  const extraDeck: string[] = [];
  const extraCounts: Record<string, number> = {};
  for (const card of shuffledExtra) {
    if (extraDeck.length >= 15) break;
    if ((extraCounts[card.id] || 0) < 3) {
      extraCounts[card.id] = (extraCounts[card.id] || 0) + 1;
      extraDeck.push(card.id);
    }
  }
  while (extraDeck.length < 15) {
    const pad = DEFAULT_EXTRA_DECK_IDS[extraDeck.length % DEFAULT_EXTRA_DECK_IDS.length];
    extraDeck.push(pad);
  }

  return {
    mainDeck: shuffleArray(mainDeck),
    extraDeck,
    metadata: {
      seed,
      generatedAt: new Date().toISOString(),
      totalCards: 75,
      mainDeckCount: mainDeck.length,
      extraDeckCount: extraDeck.length,
      monstersCount: 34,
      spellsCount: 16,
      trapsCount: 10,
      archetypeFocus: 'Toàn Năng Nguyên Tố (Full 7,300+ Catalog Dynamic Draft)'
    }
  };
}

export type CombatEventType = 
  | 'ATTACK_DECLARED'
  | 'MONSTER_SUMMONED'
  | 'SPELL_ACTIVATED'
  | 'DAMAGE_STEP';

export interface CombatEvent {
  type: CombatEventType;
  actorPlayerId: string; // The duelist performing the action (e.g. attacker, summoner, caster)
  targetPlayerId?: string; // The opposing/target duelist (e.g. defender)
  sourceCard?: CardInstance; // Card being played/attacking/summoned
  targetCard?: CardInstance; // Card being targeted
  sourceSlotIndex?: number;
  targetSlotIndex?: number | 'DIRECT';
  damageAmount?: number;
  substep?: number;
}

export interface AutoTrapTriggerResult {
  triggered: boolean;
  trapName?: string;
  trapCardUid?: string;
  trapEffectCode?: string;
  actionNegated?: boolean;
  attackerDestroyed?: boolean;
  combatEnded?: boolean;
}

export interface AttackDeclarationResult {
  success: boolean;
  message: string;
  damageDealt: number;
  attackerDestroyed: boolean;
  targetDestroyed: boolean;
  directAttack: boolean;
  isPiercingDamage?: boolean;
  piercingDamageDealt?: number;
  reflectionDamageDealt?: number;
  scientificExplanation?: string;
  damageSubsteps?: string[];
  replayTriggered?: boolean;
  replayState?: BattleReplayState | null;
}

export class DuelEngine {
  public player: DuelistState;
  public opponent: DuelistState;
  public currentTurn: number = 1;
  public activePlayerId: string; // 'player' or 'opponent'
  public currentPhase: DuelPhase = 'DRAW_PHASE';
  public chainStack: ChainItem[] = [];
  public lastResolvedChain: ResolvedChainSummary | null = null;
  public logs: DuelLogEntry[] = [];
  public outcome: DuelOutcome = 'IN_PROGRESS';
  public aiLevel: AiLevel;
  public environment: ChemicalEnvironmentState = ChemicalEnvironmentEngine.createDefaultEnvironment();
  public reactionEngine: ReactionEngine = new ReactionEngine();
  public activeReplayState: BattleReplayState | null = null;
  public enforceTurnOneNoAttack: boolean = false; // Rulebook v10 tr. 38: Turn 1 Player Cannot Attack Rule
  public activeControlTransfers: TemporaryControlTransferRecord[] = []; // Master Rule: Control of Cards & Temporary Control Transfers (Rulebook v10 tr. 47 & 55)
  public fastEffectTimingBox: FastEffectTimingBox = 'BOX_A_OPEN_GAME_STATE'; // Rulebook v10 tr. 44-47 Fast Effect Timing Chart
  public priorityPlayerId: string = 'player';
  public consecutivePriorityPasses: number = 0;

  public setEnforceTurnOneNoAttack(enabled: boolean): void {
    this.enforceTurnOneNoAttack = enabled;
  }

  public getFastEffectTimingBox(): FastEffectTimingBox {
    return this.fastEffectTimingBox;
  }

  public getPriorityPlayerId(): string {
    return this.priorityPlayerId;
  }

  public setFastEffectTimingBox(box: FastEffectTimingBox): void {
    this.fastEffectTimingBox = box;
  }

  // ==========================================
  // DAMAGE STEP SUBSTEP TRACKING (Rulebook v10 tr. 40-43)
  // 0: Not in Damage Step
  // 1: Start of Damage Step
  // 2: Before Damage Calculation
  // 3: During Damage Calculation
  // 4: After Damage Calculation
  // 5: End of Damage Step
  // ==========================================
  public currentDamageStepSubstep: 0 | 1 | 2 | 3 | 4 | 5 = 0;

  public setCurrentDamageStepSubstep(substep: 0 | 1 | 2 | 3 | 4 | 5): void {
    this.currentDamageStepSubstep = substep;
  }

  public getCurrentDamageStepSubstep(): number {
    return this.currentDamageStepSubstep;
  }

  // ==========================================
  // GAME EVENT TRACKING & MISSING THE TIMING (Rulebook v10 tr. 52-53)
  // ==========================================
  public lastGameEvent: GameEventRecord | null = null;
  public gameEventHistory: GameEventRecord[] = [];

  public recordGameEvent(
    eventType: string,
    cardOrOptions?: CardInstance | {
      card?: CardInstance;
      cardUid?: string;
      cardName?: string;
      duelistId?: string;
      payload?: any;
      chainIndex?: number;
      [key: string]: any;
    },
    duelistId?: string,
    payload?: any,
    chainIndex?: number
  ): GameEventRecord {
    let cardInstance: CardInstance | undefined;
    let uid: string | undefined;
    let name: string | undefined;
    let did: string | undefined = duelistId;
    let cIndex: number | undefined = chainIndex;
    let pLoad: any = payload;

    if (cardOrOptions && 'def' in cardOrOptions) {
      cardInstance = cardOrOptions as CardInstance;
      uid = cardInstance.uid;
      name = cardInstance.def?.name;
      did = did || cardInstance.ownerId;
    } else if (cardOrOptions && typeof cardOrOptions === 'object') {
      const opts = cardOrOptions as any;
      if (opts.card && opts.card.def) {
        cardInstance = opts.card;
        uid = opts.card.uid;
        name = opts.card.def?.name;
      }
      uid = uid || opts.cardUid;
      name = name || opts.cardName;
      did = did || opts.duelistId;
      cIndex = cIndex ?? opts.chainIndex;
      pLoad = pLoad ?? opts.payload ?? opts;
    }

    const record: GameEventRecord = {
      eventType,
      cardUid: uid,
      cardName: name,
      duelistId: did,
      chainIndex: cIndex,
      timestamp: Date.now(),
      payload: pLoad
    };
    this.lastGameEvent = record;
    this.gameEventHistory.push(record);
    return record;
  }

  public getLastGameEvent(): GameEventRecord | null {
    return this.lastGameEvent;
  }

  public isLastGameEvent(eventType: string, cardUid?: string): boolean {
    if (!this.lastGameEvent) return false;
    if (this.lastGameEvent.eventType !== eventType) return false;
    if (cardUid && this.lastGameEvent.cardUid !== cardUid) return false;
    return true;
  }

  public canActivateTriggerEffect(
    card: CardInstance,
    timingType: TriggerTimingType = card.def.triggerTimingType || 'OPTIONAL_WHEN',
    requiredEventType: string = 'SENT_TO_GRAVEYARD',
    targetCardUid?: string
  ): { canActivate: boolean; missedTiming: boolean; reason: string } {
    const uidToCheck = targetCardUid || card.uid;

    if (timingType === 'MANDATORY') {
      return {
        canActivate: true,
        missedTiming: false,
        reason: `[Quy Tắc Kích Hoạt Bắt Buộc - Rulebook v10 tr. 52-53]: Hiệu ứng bắt buộc của [${card.def.name}] không bao giờ bỏ lỡ thời điểm (Never Misses Timing) và phải được xếp vào chuỗi phản ứng.`
      };
    }

    if (timingType === 'OPTIONAL_IF') {
      return {
        canActivate: true,
        missedTiming: false,
        reason: `[Quy Tắc Kích Hoạt "Nếu... bạn có thể..." - Rulebook v10 tr. 53]: Hiệu ứng tùy chọn dạng "Nếu" của [${card.def.name}] không bao giờ bỏ lỡ thời điểm (Never Misses Timing) ngay cả khi có hành động khác diễn ra sau đó.`
      };
    }

    // timingType === 'OPTIONAL_WHEN' ("Khi... bạn có thể...")
    const isLast = this.isLastGameEvent(requiredEventType, uidToCheck);
    if (isLast) {
      return {
        canActivate: true,
        missedTiming: false,
        reason: `[Thời Điểm Hợp Lệ - Rulebook v10 tr. 52]: Sự kiện kích hoạt "${requiredEventType}" của [${card.def.name}] là hành động cuối cùng vừa xảy ra trên bàn cờ. Hiệu ứng tùy chọn được phép kích hoạt!`
      };
    } else {
      const lastDesc = this.lastGameEvent ? `${this.lastGameEvent.eventType} (${this.lastGameEvent.cardName || 'Hành động khác'})` : 'Không xác định';
      const reason = `[Bỏ Lỡ Thời Điểm (Missing the Timing) - Rulebook v10 tr. 52-53]: Hiệu ứng tùy chọn "Khi... bạn có thể..." của [${card.def.name}] đã bị bỏ lỡ thời điểm! Sự kiện "${requiredEventType}" không phải là hành động cuối cùng xảy ra (Hành động cuối cùng: ${lastDesc}).`;
      this.addLog(
        this.getDuelist(card.ownerId).name,
        reason,
        'CHAIN'
      );
      return {
        canActivate: false,
        missedTiming: true,
        reason
      };
    }
  }
  
  private logCounter: number = 0;
  private instanceCounter: number = 0;

  // Environment mutators
  public setEnvironment(partial: Partial<ChemicalEnvironmentState>, sourceName?: string) {
    this.environment = { ...this.environment, ...partial };
    if (sourceName) {
      this.environment.environmentCardName = sourceName;
      this.addLog('SYSTEM', `[Biến Đổi Môi Trường] ${sourceName} đã thay đổi điều kiện phản ứng (pH: ${this.environment.ph}, T: ${(this.environment.temperature - 273.15).toFixed(0)}°C, P: ${this.environment.pressure} atm).`, 'CHEMICAL_REACTION');
    }
  }

  public applyPhPerturbation(deltaPh: number, sourceName?: string) {
    const res = ChemicalEnvironmentEngine.applyPhShift(this.environment, deltaPh);
    this.environment = res.newEnv;
    this.addLog(sourceName || 'SYSTEM', res.message, 'CHEMICAL_REACTION');
  }

  constructor(
    playerDeckIds: string[] = DEFAULT_PLAYER_DECK_IDS,
    playerExtraDeckIds: string[] = DEFAULT_EXTRA_DECK_IDS,
    aiLevel: AiLevel = 'ADEPT',
    opponentCustomDeck?: { mainDeck: string[]; extraDeck?: string[]; sideDeck?: string[]; name?: string },
    playerSideDeckIds: string[] = [],
    initialLp: number = 8000
  ) {
    this.aiLevel = aiLevel;
    this.activePlayerId = 'player';

    // Initialize Player
    this.player = this.createInitialDuelistState('player', 'Học Giả Nguyên Tố (Bạn)', true, playerDeckIds, playerExtraDeckIds, playerSideDeckIds, initialLp);

    // Initialize AI Opponent
    let rankedBotDeck: RankedAiDeckGenerationResult | null = null;
    if (aiLevel === 'RANKED_AI' && !opponentCustomDeck) {
      rankedBotDeck = generateRankedAiMaxDeck();
    }
    const aiDeckIds = opponentCustomDeck?.mainDeck || (rankedBotDeck ? rankedBotDeck.mainDeck : this.generateAiDeckIds(aiLevel));
    const aiExtraDeckIds = opponentCustomDeck?.extraDeck || (rankedBotDeck ? rankedBotDeck.extraDeck : [...DEFAULT_EXTRA_DECK_IDS]);
    const aiSideDeckIds = opponentCustomDeck?.sideDeck || this.generateAiSideDeckIds(aiLevel);
    const aiName = opponentCustomDeck?.name || (aiLevel === 'RANKED_AI'
      ? 'Đại Sư AI Hạng (60 Thẻ Bài)'
      : (aiLevel === 'NOVICE'
        ? 'Học Viên Giả Kim Alpha'
        : (aiLevel === 'ADEPT'
          ? 'Chiến Binh Phản Ứng Beta'
          : (aiLevel === 'EXPERT'
            ? 'Bậc Thầy Phản Ứng Gamma'
            : 'Đại Sư Hóa Học Mendeleev'))));
    this.opponent = this.createInitialDuelistState('opponent', aiName, false, aiDeckIds, aiExtraDeckIds, aiSideDeckIds, initialLp);

    // Shuffle and draw opening hand (5 cards each)
    this.shuffle(this.player.deck);
    this.shuffle(this.opponent.deck);

    for (let i = 0; i < 5; i++) {
      this.drawCard('player', false);
      this.drawCard('opponent', false);
    }

    this.addLog('SYSTEM', `Trận đấu bắt đầu! ${this.player.name} đối đầu với ${this.opponent.name}. Cả hai khởi đầu với ${initialLp.toLocaleString()} LP.`, 'INFO');

    // Turn 1 start: start at DRAW_PHASE
    this.startTurn('player');
  }

  // ==========================================
  // INITIALIZATION HELPERS
  // ==========================================
  private createInitialDuelistState(
    id: string,
    name: string,
    isPlayer: boolean,
    deckIds: string[],
    extraDeckIds: string[],
    sideDeckIds: string[] = [],
    initialLp: number = 8000
  ): DuelistState {
    const deck = deckIds.map(cid => this.instantiateCard(cid, id)).filter((c): c is CardInstance => c !== null);
    const extraDeck = extraDeckIds.map(cid => this.instantiateCard(cid, id)).filter((c): c is CardInstance => c !== null);
    const sideDeck = sideDeckIds.map(cid => this.instantiateCard(cid, id)).filter((c): c is CardInstance => c !== null);

    return {
      id,
      name,
      isPlayer,
      lp: initialLp,
      maxLp: initialLp,
      mana: 1,
      maxMana: 1,
      deck,
      extraDeck,
      sideDeck,
      hand: [],
      monsterZones: [null, null, null, null, null],
      extraMonsterZone: null,
      spellTrapZones: [null, null, null, null, null],
      pendulumZones: { left: null, right: null },
      hasPendulumSummonedThisTurn: false,
      properlySummonedUids: [],
      fieldZone: null,
      graveyard: [],
      banished: [],
      normalSummonsRemaining: 1,
      lingeringEffects: []
    };
  }

  private instantiateCard(cardDefId: string, ownerId: string): CardInstance | null {
    const def = getPlayableCardById(cardDefId);
    if (!def) return null;
    this.instanceCounter++;
    return {
      uid: `${cardDefId}_inst_${this.instanceCounter}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      def: { ...def },
      ownerId,
      originalOwnerId: ownerId
    };
  }

  private shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private generateAiDeckIds(level: AiLevel): string[] {
    if (level === 'RANKED_AI') {
      return generateRankedAiMaxDeck().mainDeck;
    }
    if (level === 'MENDELEEV') {
      return [
        'card_elem_7_n', 'card_elem_7_n', 'card_elem_7_n',
        'card_elem_1_h', 'card_elem_1_h', 'card_elem_1_h',
        'card_elem_26_fe', 'card_elem_26_fe', 'card_elem_26_fe',
        'card_spell_haber_synthesis', 'card_spell_haber_synthesis',
        'card_elem_11_na', 'card_elem_11_na', 'card_elem_11_na',
        'card_elem_17_cl', 'card_elem_17_cl', 'card_elem_17_cl',
        'card_elem_16_s', 'card_elem_16_s', 'card_elem_16_s',
        'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o',
        'card_elem_78_pt_tuner', 'card_elem_78_pt_tuner', // Platinum Tuner (Synchro Enabler)
        'card_pend_glycine', 'card_pend_glutamic', // Pendulum Scales (Scale 1 & 8)
        'card_spell_crystallization_ritual', 'card_ritual_fullerene', // Ritual Spell & Boss
        'card_spell_contact_process', 'card_spell_charring_dehydration',
        'card_spell_periodic_rift_field', 'card_spell_neutralization',
        'card_spell_mass_spec_draw', 'card_spell_lithium_capacitor',
        'card_trap_noble_gas_shield', 'card_trap_precipitation_trap',
        'card_trap_ammonium_smoke', 'card_elem_19_k',
        'card_elem_79_au', 'card_elem_20_ca'
      ];
    } else if (level === 'EXPERT') {
      return [
        'card_elem_11_na', 'card_elem_11_na', 'card_elem_11_na',
        'card_elem_17_cl', 'card_elem_17_cl', 'card_elem_17_cl',
        'card_elem_26_fe', 'card_elem_26_fe', 'card_elem_26_fe',
        'card_elem_1_h', 'card_elem_1_h', 'card_elem_1_h',
        'card_elem_8_o', 'card_elem_8_o', 'card_elem_8_o',
        'card_elem_16_s', 'card_elem_16_s',
        'card_elem_13_al', 'card_elem_13_al',
        'card_elem_29_cu', 'card_elem_29_cu',
        'card_elem_78_pt_tuner', // Platinum Tuner
        'card_pend_glycine', 'card_pend_glutamic', // Pendulum Scales
        'card_elem_19_k', 'card_elem_79_au',
        'card_elem_7_n', 'card_elem_7_n',
        'card_spell_exothermic_burst', 'card_spell_neutralization',
        'card_spell_displacement', 'card_spell_mass_spec_draw',
        'card_spell_gas_chromatography', 'card_spell_bunsen_burner',
        'card_trap_cognitive_copper', 'card_trap_noble_gas_shield',
        'card_trap_passivation_armor', 'card_trap_ammonium_smoke'
      ];
    }
    return [...DEFAULT_PLAYER_DECK_IDS];
  }

  private generateAiSideDeckIds(level: AiLevel): string[] {
    return [
      'card_spell_neutralization',
      'card_trap_noble_gas_shield',
      'card_comp_fe2o3',
      'card_comp_baso4_shield',
      'card_spell_tribute_extraction',
      'card_elem_19_k'
    ];
  }

  public getDuelist(id: string): DuelistState {
    return id === 'player' ? this.player : this.opponent;
  }

  public getOpponent(id: string): DuelistState {
    return id === 'player' ? this.opponent : this.player;
  }

  /**
   * Master Rule Side Deck Tactical Swap (Rulebook v10 tr. 6)
   * Swaps 1 card from Main Deck or Extra Deck with 1 card from Side Deck
   */
  public swapSideDeckCard(
    duelistId: 'player' | 'opponent',
    originalCardUid: string,
    sideCardUid: string
  ): { success: boolean; message: string } {
    const duelist = duelistId === 'player' ? this.player : this.opponent;
    const sideDeck = duelist.sideDeck || [];

    const sideIdx = sideDeck.findIndex(c => c.uid === sideCardUid);
    if (sideIdx === -1) {
      return { success: false, message: `Lá bài thay thế (UID: ${sideCardUid}) không tồn tại trong Side Deck.` };
    }
    const sideCard = sideDeck[sideIdx];

    // Check in Main Deck first
    const mainIdx = duelist.deck.findIndex(c => c.uid === originalCardUid);
    if (mainIdx !== -1) {
      const origCard = duelist.deck[mainIdx];
      duelist.deck[mainIdx] = sideCard;
      sideDeck[sideIdx] = origCard;
      duelist.sideDeck = sideDeck;

      const msg = `[Side Deck] ${duelist.name} đã tráo đổi lá bài "${origCard.def.name}" từ Main Deck với lá bài "${sideCard.def.name}" từ Side Deck.`;
      this.addLog('SYSTEM', msg, 'INFO');
      return { success: true, message: msg };
    }

    // Check in Extra Deck
    const extraIdx = duelist.extraDeck.findIndex(c => c.uid === originalCardUid);
    if (extraIdx !== -1) {
      const origCard = duelist.extraDeck[extraIdx];
      duelist.extraDeck[extraIdx] = sideCard;
      sideDeck[sideIdx] = origCard;
      duelist.sideDeck = sideDeck;

      const msg = `[Side Deck] ${duelist.name} đã tráo đổi lá bài "${origCard.def.name}" từ Extra Deck với lá bài "${sideCard.def.name}" từ Side Deck.`;
      this.addLog('SYSTEM', msg, 'INFO');
      return { success: true, message: msg };
    }

    return { success: false, message: `Lá bài chỉ định (UID: ${originalCardUid}) không có trong Main Deck hay Extra Deck.` };
  }

  /**
   * Autonomous AI Side-Deck Dynamic Adaptation (Rulebook v10 tr. 6)
   * Analyzes observed opponent card formulas/types and strategically swaps up to 3 cards
   * from AI Side Deck into Main/Extra Deck to counter opponent's elemental archetype.
   */
  public aiPerformSideDeckAdaptation(observedOpponentCardIds: string[]): { swappedCount: number; logs: string[] } {
    const ai = this.opponent;
    if (!ai.sideDeck || ai.sideDeck.length === 0) {
      return { swappedCount: 0, logs: ['AI Side Deck rỗng, bỏ qua tráo đổi.'] };
    }

    const logs: string[] = [];
    let swappedCount = 0;

    // Detect opponent elemental traits
    const hasWaterAlkali = observedOpponentCardIds.some(id => id.includes('na') || id.includes('k') || id.includes('h2o') || id.includes('alkali'));
    const hasHeavyAggro = observedOpponentCardIds.some(id => id.includes('burn') || id.includes('tribute') || id.includes('explosion'));
    const hasAcidToxic = observedOpponentCardIds.some(id => id.includes('hcl') || id.includes('h2so4') || id.includes('h2s'));

    // Strategy 1: Counter Water/Alkali with Neutralization or Passivation shields
    if (hasWaterAlkali) {
      const shieldSideCard = ai.sideDeck.find(c => c.def.id.includes('neutralization') || c.def.id.includes('shield') || c.def.id.includes('fe2o3'));
      if (shieldSideCard) {
        const lowDefMainCard = ai.deck.find(c => c.def.cardType === 'ELEMENT_MONSTER' && (c.def.def || 0) < 1000);
        if (lowDefMainCard) {
          const res = this.swapSideDeckCard('opponent', lowDefMainCard.uid, shieldSideCard.uid);
          if (res.success) {
            swappedCount++;
            logs.push(`AI nhận diện đối thủ dùng hệ Kiềm/Nước: Tráo "${lowDefMainCard.def.name}" lấy "${shieldSideCard.def.name}" để phòng thủ kết tủa.`);
          }
        }
      }
    }

    // Strategy 2: Counter Aggro/Burn with High Defense / Recovery
    if (hasHeavyAggro && swappedCount < 2) {
      const recoverySideCard = ai.sideDeck.find(c => c.def.id.includes('baso4') || c.def.id.includes('life_draw') || c.def.id.includes('filtration'));
      if (recoverySideCard) {
        const extraSpell = ai.deck.find(c => (c.def.cardType === 'REACTION_SPELL' || c.def.cardType === 'EQUIP_CATALYST' || c.def.cardType === 'FIELD_ENVIRONMENT') && !c.def.id.includes('haber'));
        if (extraSpell) {
          const res = this.swapSideDeckCard('opponent', extraSpell.uid, recoverySideCard.uid);
          if (res.success) {
            swappedCount++;
            logs.push(`AI nhận diện đối thủ tấn công bão táp: Tráo "${extraSpell.def.name}" lấy "${recoverySideCard.def.name}" để gia cố hồi phục.`);
          }
        }
      }
    }

    // Strategy 3: Counter Acid with Base / Buff
    if (hasAcidToxic && swappedCount < 3) {
      const baseSideCard = ai.sideDeck.find(c => c.def.id.includes('naoh') || c.def.id.includes('neutralization'));
      if (baseSideCard) {
        const candidate = ai.deck.find(c => c.def.id !== baseSideCard.def.id);
        if (candidate) {
          const res = this.swapSideDeckCard('opponent', candidate.uid, baseSideCard.uid);
          if (res.success) {
            swappedCount++;
            logs.push(`AI nhận diện môi trường axit độc hại: Tráo "${candidate.def.name}" lấy "${baseSideCard.def.name}" để trung hòa pH.`);
          }
        }
      }
    }

    if (swappedCount > 0) {
      this.shuffle(ai.deck);
    }

    return { swappedCount, logs };
  }

  // ==========================================
  // DECK SEARCH & TUTOR ENGINE (Rulebook v10 tr. 33)
  // ==========================================

  /**
   * Public Deck Shuffle (Rulebook v10 tr. 33: Thoroughly shuffle your Deck after searching)
   */
  public shuffleDeck(duelistId: string): void {
    const duelist = this.getDuelist(duelistId);
    this.shuffle(duelist.deck);
    this.addLog('SYSTEM', `${duelist.name} đã xáo trộn lại Bộ Bài chính.`, 'INFO');
  }

  /**
   * Search Main Deck for cards matching specific scientific/tactical criteria
   */
  public getSearchableDeckCards(
    duelistId: 'player' | 'opponent',
    filter?: DeckSearchFilter
  ): CardInstance[] {
    const duelist = this.getDuelist(duelistId);
    if (!filter) return [...duelist.deck];

    return duelist.deck.filter(inst => {
      const def = inst.def;

      if (filter.cardType && def.cardType !== filter.cardType) return false;
      if (filter.cardTypes && filter.cardTypes.length > 0 && !filter.cardTypes.includes(def.cardType)) return false;

      if (filter.category) {
        if (filter.category === 'MONSTER' && !['ELEMENT_MONSTER', 'PENDULUM_MONSTER', 'RITUAL_MONSTER'].includes(def.cardType)) return false;
        if (filter.category === 'COMPOUND' && def.cardType !== 'COMPOUND_MONSTER') return false;
        if (filter.category === 'SPELL' && !['REACTION_SPELL', 'EQUIP_CATALYST', 'FIELD_ENVIRONMENT'].includes(def.cardType)) return false;
        if (filter.category === 'TRAP' && def.cardType !== 'TRAP') return false;
        if (filter.category === 'EXTRA' && !['SYNCHRO_MONSTER', 'XYZ_MONSTER', 'LINK_MONSTER'].includes(def.cardType)) return false;
      }

      if (filter.attribute && def.attribute !== filter.attribute) return false;
      if (filter.elementalGroup && def.archetype !== filter.elementalGroup && def.attribute !== filter.elementalGroup) return false;

      if (filter.chemicalFormula && def.chemicalFormula !== filter.chemicalFormula) return false;
      if (filter.chemicalFormulaContains) {
        if (!def.chemicalFormula || !def.chemicalFormula.toLowerCase().includes(filter.chemicalFormulaContains.toLowerCase())) {
          return false;
        }
      }

      if (filter.maxLevel !== undefined && (def.level || 0) > filter.maxLevel) return false;
      if (filter.minLevel !== undefined && (def.level || 0) < filter.minLevel) return false;
      if (filter.exactLevel !== undefined && def.level !== filter.exactLevel) return false;

      if (filter.isTuner !== undefined && !!def.isTuner !== filter.isTuner) return false;
      const isPendulumCard = def.cardType === 'PENDULUM_MONSTER' || def.pendulumScale !== undefined;
      if (filter.isPendulum !== undefined && isPendulumCard !== filter.isPendulum) return false;

      if (filter.searchQuery && filter.searchQuery.trim().length > 0) {
        const q = filter.searchQuery.trim().toLowerCase();
        const matchName = def.name.toLowerCase().includes(q);
        const matchEn = def.name_en?.toLowerCase().includes(q);
        const matchFormula = def.chemicalFormula?.toLowerCase().includes(q);
        const matchDesc = def.effectText?.toLowerCase().includes(q) || def.scientificLore?.toLowerCase().includes(q);
        if (!matchName && !matchEn && !matchFormula && !matchDesc) return false;
      }

      return true;
    });
  }

  /**
   * Tutor Card from Main Deck to Hand, GY, or Field (Rulebook v10 tr. 33)
   * Enforces card revelation to opponent and mandatory deck shuffle.
   */
  public tutorCardFromDeck(
    duelistId: 'player' | 'opponent',
    cardUid: string,
    destination: 'HAND' | 'GRAVEYARD' | 'FIELD' = 'HAND',
    sourceReason: string = 'Chiết Tách Phân Đoạn'
  ): DeckTutorResult {
    const duelist = this.getDuelist(duelistId);
    const cardIndex = duelist.deck.findIndex(c => c.uid === cardUid);

    if (cardIndex === -1) {
      return {
        success: false,
        destination,
        shuffled: false,
        message: `Không tìm thấy thẻ bài với UID [${cardUid}] trong Bộ Bài chính của ${duelist.name}.`
      };
    }

    const [tutoredCard] = duelist.deck.splice(cardIndex, 1);
    let destinationLabel = 'tay';

    if (destination === 'HAND') {
      duelist.hand.push(tutoredCard);
      destinationLabel = 'tay';
    } else if (destination === 'GRAVEYARD') {
      duelist.graveyard.push(tutoredCard);
      destinationLabel = 'Mộ Bài';
    } else if (destination === 'FIELD') {
      if (['ELEMENT_MONSTER', 'COMPOUND_MONSTER', 'PENDULUM_MONSTER', 'RITUAL_MONSTER'].includes(tutoredCard.def.cardType)) {
        const slotIdx = duelist.monsterZones.findIndex(z => z === null);
        if (slotIdx !== -1) {
          duelist.monsterZones[slotIdx] = {
            slotIndex: slotIdx,
            card: tutoredCard,
            position: 'FACE_UP_ATTACK',
            hasAttackedThisTurn: false,
            hasChangedPositionThisTurn: false,
            turnSummoned: this.currentTurn,
            tempAtkBoost: 0,
            tempDefBoost: 0
          };
          destinationLabel = `vùng Quái thú (Ô ${slotIdx + 1})`;
        } else {
          duelist.hand.push(tutoredCard);
          destinationLabel = 'tay (do sân đã đầy quái thú)';
        }
      } else {
        const slotIdx = duelist.spellTrapZones.findIndex(z => z === null);
        if (slotIdx !== -1) {
          duelist.spellTrapZones[slotIdx] = {
            slotIndex: slotIdx,
            card: tutoredCard,
            isFaceUp: true,
            turnSet: this.currentTurn
          };
          destinationLabel = `vùng Phép/Bẫy (Ô ${slotIdx + 1})`;
        } else {
          duelist.hand.push(tutoredCard);
          destinationLabel = 'tay (do sân đã đầy phép/bẫy)';
        }
      }
    }

    // MANDATORY MASTER RULE REQUIREMENT (Rulebook v10 tr. 33): Thoroughly shuffle Deck after searching
    this.shuffle(duelist.deck);

    const logMsg = `[Tìm Kiếm Bộ Bài] ${duelist.name} kích hoạt [${sourceReason}]: Công khai [${tutoredCard.def.name}] (${tutoredCard.def.chemicalFormula || 'CTHH'}) và đưa vào ${destinationLabel}. Bộ bài chính đã được xáo trộn kỹ!`;
    this.addLog(duelist.name, logMsg, 'INFO', `IUPAC: Chiết tách chọn lọc hoạt chất ${tutoredCard.def.chemicalFormula || tutoredCard.def.name} từ hỗn hợp dung dịch Bộ Bài.`);

    return {
      success: true,
      card: tutoredCard,
      destination,
      shuffled: true,
      message: `Đã chiết tách thành công [${tutoredCard.def.name}] vào ${destinationLabel} và xáo trộn lại Bộ bài.`
    };
  }

  /**
   * Autonomous AI Deck Tutor Intelligence
   * Evaluates missing pieces (Tuner for Synchro, reactant for Fusion, or Scale for Pendulum) and tutors from deck.
   */
  public aiPerformAutonomousDeckTutor(
    reason: string = 'AI Phân Tích & Chiết Tách Chiến Thuật'
  ): DeckTutorResult | null {
    const ai = this.opponent;
    if (ai.deck.length === 0) return null;

    // Priority 1: If AI has non-Tuner on field and Tuner in deck, search Tuner
    const hasNonTunerOnField = ai.monsterZones.some(z => z && z.card && !z.card.def.isTuner);
    const hasTunerOnField = ai.monsterZones.some(z => z && z.card && z.card.def.isTuner);
    if (hasNonTunerOnField && !hasTunerOnField) {
      const tunerInDeck = ai.deck.find(c => c.def.isTuner);
      if (tunerInDeck) {
        return this.tutorCardFromDeck('opponent', tunerInDeck.uid, 'HAND', `${reason} (Tìm Quái Thú Điều Nhịp Tuner)`);
      }
    }

    // Priority 2: If AI has one Pendulum Scale but missing the other, search the complementary scale
    const leftScale = ai.pendulumZones?.left?.def.pendulumScale;
    const rightScale = ai.pendulumZones?.right?.def.pendulumScale;
    if ((leftScale !== undefined && rightScale === undefined) || (leftScale === undefined && rightScale !== undefined)) {
      const missingHigh = leftScale !== undefined && leftScale <= 4;
      const scaleInDeck = ai.deck.find(c => (c.def.cardType === 'PENDULUM_MONSTER' || c.def.pendulumScale !== undefined) && (missingHigh ? (c.def.pendulumScale || 0) >= 7 : (c.def.pendulumScale || 0) <= 3));
      if (scaleInDeck) {
        return this.tutorCardFromDeck('opponent', scaleInDeck.uid, 'HAND', `${reason} (Tìm Thang Đo Dao Động Bổ Trợ)`);
      }
    }

    // Priority 3: Search powerful high ATK monster or synthesis spell
    const bossMonster = ai.deck.find(c => (c.def.atk || 0) >= 2000);
    if (bossMonster) {
      return this.tutorCardFromDeck('opponent', bossMonster.uid, 'HAND', `${reason} (Triệu Tập Chủ Lực)`);
    }

    // Fallback: Tutor top available monster or card
    const firstMonster = ai.deck.find(c => ['ELEMENT_MONSTER', 'COMPOUND_MONSTER'].includes(c.def.cardType)) || ai.deck[0];
    if (firstMonster) {
      return this.tutorCardFromDeck('opponent', firstMonster.uid, 'HAND', `${reason} (Chiết Tách Tài Nguyên)`);
    }

    return null;
  }

  // ==========================================
  // LOGGING SYSTEM
  // ==========================================
  public addLog(
    actor: string,
    message: string,
    type: DuelLogEntry['type'],
    scientificNote?: string
  ) {
    this.logCounter++;
    this.logs.push({
      id: `log_${this.logCounter}_${Date.now()}`,
      turn: this.currentTurn,
      phase: this.currentPhase,
      actor,
      message,
      type,
      scientificNote
    });
  }

  // ==========================================
  // TURN & PHASE MACHINE
  // ==========================================
  public startTurn(duelistId: string) {
    if (this.outcome !== 'IN_PROGRESS') return;

    this.activeReplayState = null;
    this.activePlayerId = duelistId;
    this.fastEffectTimingBox = 'BOX_A_OPEN_GAME_STATE';
    this.priorityPlayerId = duelistId;
    this.consecutivePriorityPasses = 0;
    const duelist = this.getDuelist(duelistId);

    // Refresh Mana: 1 on turn 1, ramp up to max 10
    const newManaCap = Math.min(10, Math.ceil(this.currentTurn / 2) + 1);
    duelist.maxMana = newManaCap;
    let startingMana = newManaCap;
    if (duelist.frozenMana && duelist.frozenMana > 0) {
      startingMana = Math.max(0, startingMana - duelist.frozenMana);
      this.addLog(duelist.name, `[Hiệu ứng Thu Nhiệt] ${duelist.frozenMana} Mana bị đóng băng không thể sử dụng trong lượt này!`, 'INFO');
      duelist.frozenMana = 0;
    }
    if (duelist.bonusManaNextTurn && duelist.bonusManaNextTurn > 0) {
      startingMana += duelist.bonusManaNextTurn;
      this.addLog(duelist.name, `[Pin Liti Tái Nạp] Hồi phục thêm ${duelist.bonusManaNextTurn} Mana dự trữ từ tế bào Liti!`, 'INFO');
      duelist.bonusManaNextTurn = 0;
    }
    duelist.mana = startingMana;
    duelist.normalSummonsRemaining = 1;

    // Reset Monster Zone flags for new turn
    for (const slot of duelist.monsterZones) {
      if (slot && slot.card) {
        slot.hasAttackedThisTurn = false;
        slot.hasChangedPositionThisTurn = false;
        slot.tempAtkBoost = 0;
        slot.tempDefBoost = 0;
        slot.passivationShieldUsed = false;
        slot.inertShieldUsed = false;
      }
    }

    this.currentPhase = 'DRAW_PHASE';
    this.addLog(duelist.name, `Bắt đầu Lượt ${this.currentTurn} (${duelist.name}). Mana được nạp: ${duelist.mana}/${duelist.maxMana}.`, 'INFO');

    // Execute Draw Phase
    this.drawCard(duelistId, true);

    // Transition to STANDBY_PHASE
    this.currentPhase = 'STANDBY_PHASE';
    this.resolveStandbyEffects(duelistId);

    // Transition to MAIN_PHASE_1
    this.currentPhase = 'MAIN_PHASE_1';
    this.addLog(duelist.name, `Chuyển sang Pha Chính 1 (Main Phase 1). Hãy triệu hồi và triển khai chiến thuật!`, 'INFO');

    // If AI's turn, trigger AI thought process
    if (duelistId === 'opponent') {
      this.runAiTurn();
    }
  }

  public advancePhase(chosenDiscardUids?: string[]): DuelPhase {
    if (this.outcome !== 'IN_PROGRESS') return this.currentPhase;

    this.activeReplayState = null;
    const duelist = this.getDuelist(this.activePlayerId);

    switch (this.currentPhase) {
      case 'MAIN_PHASE_1':
        if (this.enforceTurnOneNoAttack && this.currentTurn === 1) {
          this.currentPhase = 'END_PHASE';
          this.addLog(
            duelist.name,
            `[Quy Tắc Lượt Đầu Tiên - Rulebook v10 tr. 38] Người chơi đi trước không thể tiến hành Pha Chiến Đấu trong Lượt 1. Bỏ qua Battle Phase chuyển thẳng sang End Phase.`,
            'INFO'
          );
          this.resolveEndPhase(this.activePlayerId, chosenDiscardUids);
          break;
        }
        this.currentPhase = 'BATTLE_PHASE';
        this.addLog(duelist.name, `Chuyển sang Pha Chiến Đấu (Battle Phase)! Tuyên bố tấn công mục tiêu.`, 'INFO');
        break;
      case 'BATTLE_PHASE':
        this.currentPhase = 'MAIN_PHASE_2';
        this.addLog(duelist.name, `Chuyển sang Pha Chính 2 (Main Phase 2). Triển khai thêm quái thú hoặc bẫy úp.`, 'INFO');
        break;
      case 'MAIN_PHASE_2':
      default:
        this.currentPhase = 'END_PHASE';
        this.resolveEndPhase(this.activePlayerId, chosenDiscardUids);
        break;
    }

    return this.currentPhase;
  }

  public resolveStandbyEffects(duelistId: string) {
    const duelist = this.getDuelist(duelistId);

    // Master Rule: Field Spell Maintenance Cost & Voluntary Abandonment (Rulebook v10 tr. 28 & tr. 32)
    if (duelist.fieldZone && !duelist.fieldZone.isFaceDown) {
      const fieldCard = duelist.fieldZone;
      const fDef = fieldCard.def;
      const fMaintCost = fieldCard.maintenanceCost || fDef.maintenanceCost;

      let fieldDestroyed = false;
      if (fieldCard.voluntaryMaintenanceCeased) {
        fieldDestroyed = true;
        this.addLog(
          duelist.name,
          `[Từ Bỏ Duy Trì Địa Bàn - Rulebook v10 tr. 32] ${duelist.name} chủ động ngừng duy trì [${fDef.name}]! Thẻ Địa Bàn bị phá hủy và đưa xuống Mộ Bài.`,
          'INFO'
        );
        this.recordGameEvent('FIELD_VOLUNTARILY_ABANDONED', { duelistId, cardUid: fieldCard.uid, cardName: fDef.name });
      } else if (fMaintCost) {
        const lpNeeded = fMaintCost.lp || 0;
        const manaNeeded = fMaintCost.mana || 0;
        const canPay = duelist.lp >= lpNeeded && duelist.mana >= manaNeeded;

        if (canPay) {
          duelist.lp -= lpNeeded;
          duelist.mana -= manaNeeded;
          this.recordGameEvent('MAINTENANCE_COST_PAID', {
            duelistId,
            cardUid: fieldCard.uid,
            cardName: fDef.name,
            costLp: lpNeeded,
            costMana: manaNeeded
          });
          this.addLog(
            duelist.name,
            `[Chi Phí Duy Trì Địa Bàn - Rulebook v10 tr. 32] ${duelist.name} thanh toán ${lpNeeded ? `${lpNeeded} LP ` : ''}${manaNeeded ? `${manaNeeded} Mana` : ''} để duy trì [${fDef.name}].`,
            'INFO'
          );
        } else {
          fieldDestroyed = true;
          this.addLog(
            duelist.name,
            `[Chi Phí Duy Trì Địa Bàn Thất Bại - Rulebook v10 tr. 32] ${duelist.name} không đủ tài nguyên để duy trì Địa Bàn [${fDef.name}]! Thẻ bài sụp đổ và đưa xuống Mộ bài.`,
            'INFO'
          );
          this.recordGameEvent('FIELD_DESTROYED_BY_MAINTENANCE_FAILURE', { duelistId, cardUid: fieldCard.uid, cardName: fDef.name });
        }
      }

      if (fieldDestroyed) {
        this.sendCardToGraveyard(duelistId, fieldCard, true);
        duelist.fieldZone = null;
      } else {
        const code = duelist.fieldZone.def.effectCode;
        if (code === 'FIELD_PERIODIC_RIFT') {
          this.addLog(duelist.name, `[Hiệu ứng Địa Bàn: Khe Nứt Tuần Hoàn] Cung cấp năng lượng nguyên tố ổn định.`, 'INFO');
        } else if (code === 'FIELD_BUFFER_SOLUTION') {
          duelist.lp = Math.min(duelist.maxLp, duelist.lp + 500);
          this.addLog(duelist.name, `[Hiệu ứng Địa Bàn: Đệm Bicarbonate] Duy trì cân bằng nội môi, hồi phục 500 LP (Hiện có: ${duelist.lp} LP).`, 'INFO');
        } else if (code === 'FIELD_CRYOGENIC_LAB') {
          const opp = this.getOpponent(duelistId);
          opp.frozenMana = (opp.frozenMana || 0) + 1;
          this.addLog(duelist.name, `[Hiệu ứng Địa Bàn: Phòng Siêu Lạnh] Nhiệt độ -20°C đóng băng 1 Mana của ${opp.name}!`, 'INFO');
        } else if (code === 'FIELD_ACID_RAIN') {
          this.addLog(duelist.name, `[Hiệu ứng Địa Bàn: Mưa Axit] Khí quyển ăn mòn (pH 2.8) duy trì sự kích hoạt kim loại kiềm.`, 'INFO');
        } else if (code === 'FIELD_HABER_CHAMBER') {
          this.addLog(duelist.name, `[Hiệu ứng Địa Bàn: Lò Haber-Bosch] Buồng áp suất 200 atm duy trì cân bằng chuyển dịch thuận.`, 'INFO');
        }
      }
    }

    // Continuous Spells and Continuous Traps in spellTrapZones (Rulebook v10 tr. 29 & tr. 32)
    for (let i = 0; i < duelist.spellTrapZones.length; i++) {
      const slot = duelist.spellTrapZones[i];
      if (slot && slot.card && slot.isFaceUp) {
        const card = slot.card;
        const cDef = card.def;

        // Master Rule: Voluntary Maintenance Abandonment (Rulebook v10 tr. 32)
        if (card.voluntaryMaintenanceCeased) {
          this.addLog(
            duelist.name,
            `[Từ Bỏ Duy Trì - Rulebook v10 tr. 32] ${duelist.name} chủ động ngừng duy trì [${cDef.name}]! Lá bài bị phá hủy và đưa xuống Mộ Bài.`,
            'INFO'
          );
          this.cleanSlotEquipCards(duelistId, i);
          this.sendCardToGraveyard(duelistId, card, true);
          duelist.spellTrapZones[i] = null;
          this.recordGameEvent('CARD_VOLUNTARILY_ABANDONED', {
            duelistId,
            cardUid: card.uid,
            cardName: cDef.name
          });
          continue;
        }

        // Master Rule: Standby Phase Maintenance Costs (Rulebook v10 tr. 32)
        const maintCost = card.maintenanceCost || cDef.maintenanceCost;
        if (maintCost) {
          const lpCost = maintCost.lp || 0;
          const manaCost = maintCost.mana || 0;
          const canPay = duelist.lp >= lpCost && duelist.mana >= manaCost;

          if (canPay) {
            duelist.lp -= lpCost;
            duelist.mana -= manaCost;
            this.recordGameEvent('MAINTENANCE_COST_PAID', {
              duelistId,
              cardUid: card.uid,
              cardName: cDef.name,
              costLp: lpCost,
              costMana: manaCost
            });
            this.addLog(
              duelist.name,
              `[Chi Phí Duy Trì - Rulebook v10 tr. 32] ${duelist.name} thanh toán ${lpCost ? `${lpCost} LP ` : ''}${manaCost ? `${manaCost} Mana` : ''} để duy trì [${cDef.name}] (Còn ${duelist.lp} LP, ${duelist.mana} Mana).`,
              'INFO'
            );
          } else {
            // Insufficient resources -> Destroyed!
            this.addLog(
              duelist.name,
              `[Chi Phí Duy Trì Thất Bại - Rulebook v10 tr. 32] ${duelist.name} không đủ tài nguyên để duy trì [${cDef.name}]! Lá bài bị phá hủy và đưa xuống Mộ bài.`,
              'INFO'
            );
            this.cleanSlotEquipCards(duelistId, i);
            this.sendCardToGraveyard(duelistId, card, true);
            duelist.spellTrapZones[i] = null;
            this.recordGameEvent('CARD_DESTROYED_BY_MAINTENANCE_FAILURE', {
              duelistId,
              cardUid: card.uid,
              cardName: cDef.name
            });
            continue;
          }
        }

        if (cDef.effectCode === 'SPELL_PLATINUM_MATRIX') {
          duelist.mana = Math.min(10, duelist.mana + 1);
          const opp = this.getOpponent(duelistId);
          opp.lp = Math.max(0, opp.lp - 200);
          this.addLog(
            duelist.name,
            `[Phép Duy Trì: Xúc Tác Bạch Kim] Hạ thấp Ea trong Standby Phase! Hồi phục +1 Mana và gây 200 LP phản ứng phụ lên ${opp.name}! (Còn ${opp.lp} LP)`,
            'CHEMICAL_REACTION',
            cDef.scientificLore
          );
        } else if (cDef.effectCode === 'SPELL_FUEL_CELL_PERMA') {
          duelist.lp = Math.min(duelist.maxLp, duelist.lp + 400);
          this.addLog(
            duelist.name,
            `[Phép Duy Trì: Pin Nhiên Liệu Hydro] Phản ứng oxi hóa H₂/O₂ sinh điện sạch! Hồi phục +400 LP (Hiện có: ${duelist.lp} LP).`,
            'INFO',
            cDef.scientificLore
          );
        } else if (cDef.effectCode === 'SPELL_PLASMA_CONFINEMENT') {
          duelist.monsterZones.forEach(mSlot => {
            if (mSlot && mSlot.card && (mSlot.card.def.attribute === 'ELECTRO' || mSlot.card.def.attribute === 'PYRO')) {
              mSlot.tempAtkBoost = (mSlot.tempAtkBoost || 0) + 400;
            }
          });
          this.addLog(
            duelist.name,
            `[Từ Trường Plasma Tokamak] Từ trường siêu nhiệt kích hoạt! Tăng +400 ATK cho toàn bộ quái thú hệ Điện và Lửa!`,
            'CHEMICAL_REACTION',
            cDef.scientificLore
          );
        } else if (cDef.effectCode === 'SPELL_ENDOTHERMIC_CHAMBER') {
          // Suppresses enemy Pyro monster ATK by -600
          const opp = this.getOpponent(duelistId);
          opp.monsterZones.forEach(mSlot => {
            if (mSlot && mSlot.card && mSlot.card.def.attribute === 'PYRO') {
              mSlot.tempAtkBoost = (mSlot.tempAtkBoost || 0) - 600;
            }
          });
          this.addLog(
            duelist.name,
            `[Buồng Làm Lạnh Thu Nhiệt Liên Tục]: Phản ứng thu nhiệt (ΔH° > 0) làm lạnh buồng, giảm 600 ATK của quái thú hệ Hỏa đối phương!`,
            'CHEMICAL_REACTION',
            cDef.scientificLore
          );
        } else if (cDef.effectCode === 'TRAP_ANODIC_PROTECTION') {
          // Anodic protection passivates friendly terra/earth monsters
          duelist.monsterZones.forEach(mSlot => {
            if (mSlot && mSlot.card && mSlot.card.def.attribute === 'TERRA') {
              mSlot.card.cannotBeDestroyedByCardEffects = true;
            }
          });
          this.addLog(
            duelist.name,
            `[Màng Thụ Động Hóa Anot Liên Tục]: Dòng điện bảo vệ anot tạo màng thụ động hóa che chắn các quái thú kim loại!`,
            'TRAP',
            cDef.scientificLore
          );
        }
      }
    }

    // Master Rule: Radioactive Half-Life Decay & Standby Depletion (Rulebook v10 tr. 32)
    for (let i = 0; i < duelist.monsterZones.length; i++) {
      const mSlot = duelist.monsterZones[i];
      if (mSlot && mSlot.card) {
        const card = mSlot.card;
        const cDef = card.def;
        if (cDef.effectCode === 'ELEM_RA_ALPHA_DECAY' || cDef.decayCounters !== undefined) {
          if (card.decayCounters === undefined) {
            card.decayCounters = cDef.decayCounters ?? 3;
          }
          if (card.decayCounters > 0) {
            card.decayCounters -= 1;
            const opp = this.getOpponent(duelistId);
            const radiationDmg = 400;
            opp.lp = Math.max(0, opp.lp - radiationDmg);
            this.recordGameEvent('RADIOACTIVE_ALPHA_DECAY', {
              duelistId,
              cardUid: card.uid,
              cardName: cDef.name,
              remainingCounters: card.decayCounters,
              damageDealt: radiationDmg
            });
            this.addLog(
              duelist.name,
              `[Định Luật Phân Rã Phóng Xạ - Chu Kỳ Bán Rã] [${cDef.name}] phóng thích hạt alpha (⁴₂He²⁺), gây ${radiationDmg} LP sát thương bức xạ lên ${opp.name}! (Còn ${card.decayCounters} chu kỳ).`,
              'CHEMICAL_REACTION',
              cDef.relatedEquation
            );
            this.checkWinConditions();

            if (card.decayCounters === 0) {
              this.addLog(
                duelist.name,
                `[Hoàn Tất Chu Kỳ Bán Rã] Hạt nhân [${cDef.name}] đã phân rã hoàn toàn thành chì ²⁰⁶₈₂Pb bền vững và được đưa xuống Mộ bài.`,
                'INFO'
              );
              this.cleanSlotXyzMaterials(duelistId, i);
              this.cleanSlotEquipCards(duelistId, i);
              this.sendCardToGraveyard(duelistId, card, true);
              duelist.monsterZones[i] = null;
              this.recordGameEvent('MONSTER_DECAY_COMPLETED', {
                duelistId,
                cardUid: card.uid,
                cardName: cDef.name
              });
            }
          }
        }
      }
    }
  }

  /**
   * Master Rule: Voluntary Maintenance Abandonment (Rulebook v10 tr. 32)
   * "If a card says 'You can pay... If you don't, destroy this card', you may choose whether to pay or not."
   * Allows the duelist to voluntarily cease maintenance on an active Continuous Spell/Trap or Field Spell,
   * causing it to self-destruct upon or before Standby Phase without deducting resources.
   */
  public relinquishMaintenance(duelistId: string, target: number | 'FIELD'): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (target === 'FIELD') {
      if (!duelist.fieldZone) {
        return { success: false, message: 'Không có Thẻ Địa Bàn nào để ngừng duy trì!' };
      }
      duelist.fieldZone.voluntaryMaintenanceCeased = true;
      const cardName = duelist.fieldZone.def.name;
      this.addLog(
        duelist.name,
        `[Ngừng Duy Trì Địa Bàn - Rulebook v10 tr. 32] ${duelist.name} chủ động ngừng thanh toán chi phí duy trì cho Thẻ Địa Bàn [${cardName}].`,
        'INFO'
      );
      return { success: true, message: `Đã ngừng duy trì Thẻ Địa Bàn [${cardName}] thành công!` };
    }

    if (target < 0 || target >= duelist.spellTrapZones.length) {
      return { success: false, message: 'Vị trí ô Phép/Bẫy không hợp lệ!' };
    }
    const slot = duelist.spellTrapZones[target];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không có lá bài nào tại ô này để ngừng duy trì!' };
    }
    slot.card.voluntaryMaintenanceCeased = true;
    const cardName = slot.card.def.name;
    this.addLog(
      duelist.name,
      `[Ngừng Duy Trì - Rulebook v10 tr. 32] ${duelist.name} chủ động ngừng thanh toán chi phí duy trì cho [${cardName}].`,
      'INFO'
    );
    return { success: true, message: `Đã ngừng duy trì [${cardName}] thành công!` };
  }

  /**
   * Returns the number of cards in hand exceeding the 6-card limit (Rulebook v10 tr. 31 & 35)
   */
  public getHandSizeLimitExcess(duelistId: string): number {
    return Math.max(0, this.getDuelist(duelistId).hand.length - 6);
  }

  /**
   * Checks whether the duelist's hand exceeds the 6-card limit (Rulebook v10 tr. 31 & 35)
   */
  public isHandSizeLimitExceeded(duelistId: string): boolean {
    return this.getDuelist(duelistId).hand.length > 6;
  }

  /**
   * Discards a specific card from hand to Graveyard under Hand Size Limit rule (Rulebook v10 tr. 31 & 35)
   */
  public discardCardFromHand(
    duelistId: string,
    cardUid: string
  ): { success: boolean; message: string; remainingExcess: number; card?: CardInstance } {
    const duelist = this.getDuelist(duelistId);
    const handIdx = duelist.hand.findIndex(c => c.uid === cardUid);
    if (handIdx === -1) {
      return {
        success: false,
        message: 'Lá bài không có trên tay!',
        remainingExcess: this.getHandSizeLimitExcess(duelistId)
      };
    }

    const [discarded] = duelist.hand.splice(handIdx, 1);
    this.sendCardToGraveyard(duelistId, discarded, false);
    const remainingExcess = this.getHandSizeLimitExcess(duelistId);

    this.recordGameEvent('CARD_DISCARDED', {
      duelistId,
      cardUid: discarded.uid,
      cardName: discarded.def.name,
      reason: 'HAND_SIZE_LIMIT'
    });

    this.addLog(
      duelist.name,
      `[Quy Tắc Giới Hạn Bài Trên Tay - Rulebook v10 tr. 31] ${duelist.name} đã chọn và chuyển [${discarded.def.name}] từ trên tay xuống Mộ bài (Còn ${duelist.hand.length}/6 lá trên tay).`,
      'INFO'
    );

    return {
      success: true,
      message: `Đã chuyển [${discarded.def.name}] xuống Mộ bài.`,
      remainingExcess,
      card: discarded
    };
  }

  /**
   * Discards multiple chosen cards from hand to Graveyard under Hand Size Limit rule (Rulebook v10 tr. 31 & 35)
   */
  public discardMultipleCardsFromHand(
    duelistId: string,
    cardUids: string[]
  ): { success: boolean; message: string; discardedCount: number } {
    let discardedCount = 0;
    for (const uid of cardUids) {
      const res = this.discardCardFromHand(duelistId, uid);
      if (res.success) discardedCount++;
    }

    return {
      success: true,
      message: `Đã chuyển ${discardedCount} lá bài từ trên tay xuống Mộ bài theo luật Giới hạn bài (Rulebook v10 tr. 31).`,
      discardedCount
    };
  }

  /**
   * Evaluates and selects cards to discard from hand when exceeding hand size limit (Rulebook v10 tr. 31 & 35)
   * Prioritizes discarding redundant duplicates, high-level deadweight, or unplayable cards, while preserving starters, tuners, and counters.
   */
  public aiSelectHandDiscardCards(duelistId: string = 'opponent'): CardInstance[] {
    const duelist = this.getDuelist(duelistId);
    const excess = Math.max(0, duelist.hand.length - 6);
    if (excess === 0) return [];

    const fieldMonsterCount = duelist.monsterZones.filter(s => s && s.card).length;
    const hasActiveField = Boolean(duelist.fieldZone);

    // Track card IDs already seen in hand to detect duplicates
    const seenIds = new Set<string>();

    const scoredHand = duelist.hand.map(card => {
      let discardScore = 0;

      // 1. Duplicate card in hand: high discard preference (+50)
      if (seenIds.has(card.def.id)) {
        discardScore += 50;
      } else {
        seenIds.add(card.def.id);
      }

      // 2. Extra field environment spell when one is already active (+40)
      if (card.def.cardType === 'FIELD_ENVIRONMENT' && hasActiveField) {
        discardScore += 40;
      }

      // 3. High level monster without tribute fodder on field (+35)
      const level = card.def.level || 4;
      const isMonster = card.def.cardType === 'ELEMENT_MONSTER' ||
                        card.def.cardType === 'COMPOUND_MONSTER' ||
                        card.def.cardType === 'SYNCHRO_MONSTER' ||
                        card.def.cardType === 'XYZ_MONSTER' ||
                        card.def.cardType === 'PENDULUM_MONSTER' ||
                        card.def.cardType === 'RITUAL_MONSTER';
      if (isMonster) {
        if (level >= 7 && fieldMonsterCount < 2) {
          discardScore += 35;
        } else if (level >= 5 && fieldMonsterCount < 1) {
          discardScore += 25;
        }
      }

      // 4. Heavy mana cost that exceeds current mana + 2 (+20)
      if (card.def.manaCost > duelist.mana + 2) {
        discardScore += 20;
      }

      // PRESERVATION RULES (Subtract discard score):
      // Tuner monsters are vital for Synchro plays (-40)
      if (card.def.isTuner) {
        discardScore -= 40;
      }

      // Normal summonable Level 1-4 monsters (-30)
      if (card.def.cardType === 'ELEMENT_MONSTER' && level <= 4) {
        discardScore -= 30;
      }

      // Powerful draw spells or quick-play surges (-25)
      if (card.def.effectCode === 'SPELL_DRAW_2' || card.def.effectCode === 'SPELL_QUICK_ATK_SURGE') {
        discardScore -= 25;
      }

      // Counter traps (-20)
      if (card.def.spellTrapSubtype === 'COUNTER_TRAP') {
        discardScore -= 20;
      }

      return { card, score: discardScore };
    });

    // Sort descending by score (highest discard score = top candidate to discard)
    scoredHand.sort((a, b) => b.score - a.score);

    return scoredHand.slice(0, excess).map(item => item.card);
  }

  /**
   * Resolves the End Phase including Hand Size Limit Discard (Rulebook v10 tr. 31 & 35)
   */
  public resolveEndPhase(duelistId: string, chosenDiscardUids?: string[]) {
    const duelist = this.getDuelist(duelistId);
    this.addLog(duelist.name, `Kết thúc Lượt ${this.currentTurn} (End Phase).`, 'INFO');

    // Rulebook v10 tr. 31 & 35: End Phase Hand Size Limit Discard (Max 6 cards for turn player)
    if (this.isHandSizeLimitExceeded(duelistId)) {
      if (chosenDiscardUids && chosenDiscardUids.length > 0) {
        this.discardMultipleCardsFromHand(duelistId, chosenDiscardUids);
      } else if (duelistId === 'opponent') {
        const optimalDiscards = this.aiSelectHandDiscardCards('opponent');
        for (const card of optimalDiscards) {
          this.discardCardFromHand('opponent', card.uid);
        }
      }

      // Fallback safeguard: if still > 6 cards, safely discard remaining excess
      while (duelist.hand.length > 6) {
        const discarded = duelist.hand.pop();
        if (discarded) {
          duelist.graveyard.push(discarded);
          this.addLog(
            duelist.name,
            `[Quy Tắc Giới Hạn Bài Trên Tay - Rulebook v10 tr. 31] Bài trên tay vượt quá 6 lá. Đã chuyển [${discarded.def.name}] xuống Mộ bài.`,
            'INFO'
          );
        }
      }
    }

    // Rulebook v10 tr. 31: Reset "Until the end of this turn" temporary ATK/DEF stat modifications for all monsters on field
    for (const p of [this.player, this.opponent]) {
      for (const slot of p.monsterZones) {
        if (slot) {
          slot.tempAtkBoost = 0;
          slot.tempDefBoost = 0;
        }
      }
    }

    // Rulebook v10 tr. 47 & 55: Return temporary control transfers whose duration is UNTIL_END_OF_TURN
    this.resolveEndPhaseControlReturns();

    // Rulebook v10 tr. 48-49 & 54: Reset "Until the end of this turn" monster effect negations
    this.resolveEndPhaseNegations();

    // Rulebook v10 tr. 30-31, 40-43 & 54: Reset "Until the end of this turn" battle & effect destruction protections
    this.resolveEndPhaseProtections();

    // Rulebook v10 tr. 31 & 54: Process Multi-turn lingering effects countdown and expiration
    this.processEndPhaseLingeringEffects(duelistId);

    // Switch active player
    const nextPlayerId = duelistId === 'player' ? 'opponent' : 'player';
    this.currentTurn++;
    this.startTurn(nextPlayerId);
  }

  // ==========================================
  // CARD DRAWING & RESOURCES
  // ==========================================
  public drawCard(duelistId: string, logDraw: boolean = true): CardInstance | null {
    const duelist = this.getDuelist(duelistId);
    if (duelist.deck.length === 0) {
      this.addLog(duelist.name, `Hết bài trong Bộ Bài Chính (Deck Out)! Không thể rút thêm bài.`, 'INFO');
      this.checkWinConditions(duelistId);
      return null;
    }

    const card = duelist.deck.shift()!;
    duelist.hand.push(card);

    if (logDraw) {
      this.addLog(duelist.name, `Rút 1 lá bài từ bộ bài. Số bài trên tay: ${duelist.hand.length}.`, 'INFO');
    }
    return card;
  }

  // ==========================================
  // SUMMONING MECHANICS (TRIỆU HỒI)
  // ==========================================

  // Normal Summon / Set
  public normalSummon(
    duelistId: string,
    handCardUid: string,
    position: MonsterBattlePosition = 'FACE_UP_ATTACK',
    tributeSlotIndices: number[] = [],
    preferredTargetSlotIndex?: number
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể triệu hồi quái thú trong Main Phase 1 hoặc Main Phase 2!' };
    }
    if (this.activePlayerId !== duelistId) {
      return { success: false, message: 'Không phải lượt của bạn!' };
    }

    const duelist = this.getDuelist(duelistId);
    if (duelist.normalSummonsRemaining <= 0) {
      return { success: false, message: 'Bạn đã dùng hết lượt Triệu Hồi Thường trong lượt này!' };
    }

    const handIndex = duelist.hand.findIndex(c => c.uid === handCardUid);
    if (handIndex === -1) return { success: false, message: 'Lá bài không có trên tay!' };

    const card = duelist.hand[handIndex];
    if (card.def.cardType !== 'ELEMENT_MONSTER' && card.def.cardType !== 'COMPOUND_MONSTER') {
      return { success: false, message: 'Lá bài này không phải quái thú!' };
    }

    // Check Mana cost
    if (duelist.mana < card.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${card.def.manaCost} Mana (Hiện có: ${duelist.mana}).` };
    }

    // Check Tributes required by Level
    const level = card.def.level || 1;
    const hasTributeOverride = card.def.effectCode === 'ELEM_K_SUPER_BURST';

    if (level > 5) {
      if (tributeSlotIndices.length === 0) {
        return {
          success: false,
          message: `Quái thú Cấp ${level} (>5 sao) bắt buộc phải hiến tế quái thú có số sao thấp hơn sao cho tổng số sao >= ${level}!`
        };
      }

      // Guard against duplicate tribute slots or out-of-bounds indices
      const uniqueIndices = new Set(tributeSlotIndices);
      if (uniqueIndices.size !== tributeSlotIndices.length) {
        return { success: false, message: 'Không thể chọn trùng lặp cùng một quái thú để hiến tế nhiều lần!' };
      }
      for (const tIdx of tributeSlotIndices) {
        if (tIdx < 0 || tIdx >= duelist.monsterZones.length) {
          return { success: false, message: `Vị trí ô hiến tế ${tIdx} nằm ngoài phạm vi sân đấu!` };
        }
        const s = duelist.monsterZones[tIdx];
        if (s && s.card) {
          const activeTransfer = this.activeControlTransfers.find(r => r.cardUid === s.card!.uid);
          if (activeTransfer && activeTransfer.canTribute === false) {
            return {
              success: false,
              message: `[Vi Phạm Master Rule - Rulebook v10 tr. 47] Quái thú [${s.card.def.name}] đang trong trạng thái chuyển giao quyền kiểm soát không thể đem đi hiến tế (Tribute)!`
            };
          }
        }
      }

      if (hasTributeOverride && tributeSlotIndices.length >= 1) {
        // Explicit exception permitted by card definition
      } else {
        // Strict ELEMENTA custom tribute rule:
        // 1. All tributed monsters must have strictly fewer stars than target (tribute.level < target.level)
        // 2. Sum of stars of all tributed monsters must be >= target.level
        let totalTributeStars = 0;
        for (const tIdx of tributeSlotIndices) {
          const slot = duelist.monsterZones[tIdx];
          if (!slot || !slot.card) {
            return { success: false, message: `Vị trí ô hiến tế ${tIdx + 1} không có quái thú hợp lệ!` };
          }
          const tLevel = slot.card.def.level || 1;
          if (tLevel >= level) {
            return {
              success: false,
              message: `Quy tắc hiến tế ELEMENTA: Quái thú hiến tế [${slot.card.def.name}] (${tLevel} sao) không được có số sao bằng hoặc lớn hơn quái thú mục tiêu (${level} sao)!`
            };
          }
          totalTributeStars += tLevel;
        }

        if (totalTributeStars < level) {
          return {
            success: false,
            message: `Tổng số sao của các quái thú hiến tế (${totalTributeStars} sao) chưa đạt yêu cầu của quái thú Cấp ${level} (Cần tổng >= ${level} sao)!`
          };
        }
      }
    }

    // Find available Monster Zone slot
    const emptySlotIndex = duelist.monsterZones.findIndex((s, idx) => s === null && !tributeSlotIndices.includes(idx));
    if (emptySlotIndex === -1 && tributeSlotIndices.length === 0) {
      return { success: false, message: 'Khu vực quái thú (Monster Zones) đã đầy (5/5)!' };
    }

    // Perform tributes if required
    for (const tIdx of tributeSlotIndices) {
      const slot = duelist.monsterZones[tIdx];
      if (!slot || !slot.card) {
        return { success: false, message: 'Mục tiêu hiến tế không hợp lệ!' };
      }
      this.recordGameEvent('TRIBUTED', slot.card, duelistId);
      this.recordGameEvent('SENT_TO_GRAVEYARD', slot.card, duelistId, { reason: 'TRIBUTE' });
      this.sendCardToGraveyard(duelistId, slot.card, true);
      duelist.monsterZones[tIdx] = null;
      this.addLog(duelist.name, `Hiến tế [${slot.card.def.name}] từ ô ${tIdx + 1} để triệu hồi cấp cao.`, 'SUMMON');
    }

    // Determine target slot
    const targetSlotIndex = preferredTargetSlotIndex !== undefined && duelist.monsterZones[preferredTargetSlotIndex] === null
      ? preferredTargetSlotIndex
      : (tributeSlotIndices.length > 0 ? tributeSlotIndices[0] : emptySlotIndex);

    // Deduct mana & consume normal summon
    duelist.mana -= card.def.manaCost;
    duelist.normalSummonsRemaining--;
    duelist.hand.splice(handIndex, 1);

    // Place into Monster Zone
    duelist.monsterZones[targetSlotIndex] = {
      slotIndex: targetSlotIndex,
      card,
      position,
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };

    this.recordGameEvent(
      tributeSlotIndices.length > 0
        ? 'TRIBUTE_SUMMON_COMPLETED'
        : (position === 'FACE_DOWN_DEFENSE' ? 'NORMAL_SET_COMPLETED' : 'NORMAL_SUMMON_COMPLETED'),
      card,
      duelistId
    );

    const actionText = position === 'FACE_DOWN_DEFENSE' ? 'Úp phòng thủ' : 'Triệu hồi';
    this.addLog(
      duelist.name,
      `${actionText} [${card.def.name}] (Cấp ${level}, ATK: ${card.def.atk}, DEF: ${card.def.def}) tại ô ${targetSlotIndex + 1}.`,
      'SUMMON',
      card.def.scientificLore
    );

    // Trigger Summon Effect if any
    this.checkTriggerEffects('ON_SUMMON', card, duelistId, targetSlotIndex);

    // Event-Driven Automatic Trap Detection for Opponent on Summon (e.g. Ammonium Smoke, Precipitation)
    if (position !== 'FACE_DOWN_DEFENSE') {
      this.checkAndAutoTriggerTraps({
        type: 'MONSTER_SUMMONED',
        actorPlayerId: duelistId,
        targetPlayerId: this.getOpponent(duelistId).id,
        sourceCard: card,
        targetSlotIndex
      });
    }

    return { success: true, message: 'Triệu hồi thành công!' };
  }

  // ==========================================
  // MONSTER TOKEN MECHANICS (Rulebook v10 tr. 48-49)
  // ==========================================
  /**
   * Special Summons a Monster Token to an open Main Monster Zone (Rulebook v10 tr. 48-49)
   */
  public summonToken(
    duelistId: string,
    tokenDef: {
      name: string;
      name_en: string;
      atk: number;
      def: number;
      level: number;
      attribute: ChemicalAttribute;
      chemicalFormula?: string;
      scientificLore?: string;
    },
    position: 'FACE_UP_ATTACK' | 'FACE_UP_DEFENSE' = 'FACE_UP_ATTACK',
    preferredSlotIndex?: number
  ): { success: boolean; slotIndex?: number; token?: CardInstance; message: string } {
    if (this.outcome !== 'IN_PROGRESS') {
      return { success: false, message: 'Trận đấu đã kết thúc!' };
    }

    const duelist = this.getDuelist(duelistId);

    // Rulebook v10 tr. 48: Tokens cannot be in Face-Down Defense position
    if ((position as any) === 'FACE_DOWN_DEFENSE') {
      return {
        success: false,
        message: '[Quy Tắc Monster Token - Rulebook v10 tr. 48] Monster Token không thể được triệu hồi ở tư thế úp phòng thủ (Face-Down Defense)!'
      };
    }

    // Find available Main Monster Zone slot
    let targetSlotIndex = -1;
    if (preferredSlotIndex !== undefined && duelist.monsterZones[preferredSlotIndex] === null) {
      targetSlotIndex = preferredSlotIndex;
    } else {
      targetSlotIndex = duelist.monsterZones.findIndex(s => s === null);
    }

    // Rulebook v10 tr. 48: If there are no open Monster Zones, Tokens cannot be summoned
    if (targetSlotIndex === -1) {
      const msg = `[Quy Tắc Monster Token - Rulebook v10 tr. 48] Vùng quái thú của ${duelist.name} đã đầy (5/5)! Không đủ khoảng trống trên sân để Triệu Hồi Token.`;
      this.addLog('SYSTEM', msg, 'INFO');
      return { success: false, message: msg };
    }

    const tokenUid = `token_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullDef: PlayableCardDef = {
      id: `card_token_${tokenDef.chemicalFormula || 'radical'}`,
      name: tokenDef.name,
      name_en: tokenDef.name_en,
      cardType: 'TOKEN_MONSTER',
      rarity: 'COMMON',
      attribute: tokenDef.attribute,
      manaCost: 0,
      level: tokenDef.level,
      atk: tokenDef.atk,
      def: tokenDef.def,
      chemicalFormula: tokenDef.chemicalFormula,
      isToken: true,
      effectCode: 'TOKEN_VANILLA',
      effectText: `Monster Token (Rulebook v10 tr. 48-49). Biến mất hoàn toàn khi rời sân. Không thể sử dụng làm nguyên liệu Xyz.`,
      scientificLore: tokenDef.scientificLore || 'Gốc tự do hoạt hóa cao mang electron độc thân, có thời gian sống ngắn và biến mất ngay sau khi phản ứng kết thúc.'
    };

    const tokenInstance: CardInstance = {
      uid: tokenUid,
      def: fullDef,
      ownerId: duelistId,
      properlySummoned: true,
      isToken: true
    };

    duelist.monsterZones[targetSlotIndex] = {
      slotIndex: targetSlotIndex,
      card: tokenInstance,
      position,
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };

    this.recordGameEvent('TOKEN_SUMMON_COMPLETED', tokenInstance, duelistId);
    this.addLog(
      duelist.name,
      `[Triệu Hồi Token - Rulebook v10 tr. 48-49] Xuất hiện Monster Token [${tokenInstance.def.name}] (${tokenInstance.def.chemicalFormula || 'Gốc tự do'}, Cấp ${tokenInstance.def.level}, ATK: ${tokenInstance.def.atk}/DEF: ${tokenInstance.def.def}) tại ô ${targetSlotIndex + 1}!`,
      'SUMMON',
      tokenInstance.def.scientificLore
    );

    return {
      success: true,
      slotIndex: targetSlotIndex,
      token: tokenInstance,
      message: `Triệu Hồi Token [${tokenInstance.def.name}] thành công!`
    };
  }

  // Compound Synthesis Summon (Fusion/Synthesis combining reactants)
  public compoundSynthesisSummon(
    duelistId: string,
    extraDeckCardUid: string,
    materialSources: { location: 'FIELD' | 'HAND'; idOrSlot: number | string }[]
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể Tổng Hợp Hợp Chất trong Main Phase!' };
    }

    const duelist = this.getDuelist(duelistId);
    const extraIndex = duelist.extraDeck.findIndex(c => c.uid === extraDeckCardUid);
    if (extraIndex === -1) {
      return { success: false, message: 'Thẻ Hợp Chất không có trong Extra Deck!' };
    }

    const compoundCard = duelist.extraDeck[extraIndex];
    const recipe = compoundCard.def.synthesisRecipe;
    if (!recipe) {
      return { success: false, message: 'Thẻ này không có công thức tổng hợp hóa học!' };
    }

    if (duelist.mana < compoundCard.def.manaCost) {
      return { success: false, message: `Không đủ Mana tổng hợp! Cần ${compoundCard.def.manaCost} Mana (Có: ${duelist.mana}).` };
    }

    // Guard against duplicate material sources
    const fieldSlotsSet = new Set<number>();
    const handUidsSet = new Set<string>();
    for (const mat of materialSources) {
      if (mat.location === 'FIELD') {
        const slotIdx = typeof mat.idOrSlot === 'number' ? mat.idOrSlot : parseInt(mat.idOrSlot, 10);
        if (fieldSlotsSet.has(slotIdx)) {
          return { success: false, message: 'Không thể sử dụng cùng một quái thú trên sân nhiều lần!' };
        }
        fieldSlotsSet.add(slotIdx);
      } else {
        const uid = String(mat.idOrSlot);
        if (handUidsSet.has(uid)) {
          return { success: false, message: 'Không thể sử dụng cùng một lá bài trên tay nhiều lần!' };
        }
        handUidsSet.add(uid);
      }
    }

    // Verify materials meet formula stoichiometry
    const collectedFormulas: string[] = [];
    const cardsToConsume: { location: 'FIELD' | 'HAND'; index: number; card: CardInstance }[] = [];

    for (const mat of materialSources) {
      if (mat.location === 'FIELD') {
        const slotIdx = typeof mat.idOrSlot === 'number' ? mat.idOrSlot : parseInt(mat.idOrSlot, 10);
        const slot = duelist.monsterZones[slotIdx];
        if (slot?.card?.def?.chemicalFormula) {
          collectedFormulas.push(slot.card.def.chemicalFormula);
          cardsToConsume.push({ location: 'FIELD', index: slotIdx, card: slot.card });
        }
      } else {
        const hIdx = duelist.hand.findIndex(c => c.uid === mat.idOrSlot);
        if (hIdx !== -1) {
          const card = duelist.hand[hIdx];
          if (card?.def?.chemicalFormula) {
            collectedFormulas.push(card.def.chemicalFormula);
            cardsToConsume.push({ location: 'HAND', index: hIdx, card });
          }
        }
      }
    }

    // Count gathered reactants
    const gatheredCounts: Record<string, number> = {};
    for (const f of collectedFormulas) {
      gatheredCounts[f] = (gatheredCounts[f] || 0) + 1;
    }

    for (const req of recipe.reactantFormulas) {
      const have = gatheredCounts[req.formula] || 0;
      if (have < req.count) {
        return {
          success: false,
          message: `Thiếu nguyên liệu phản ứng! Cần ${req.count} ${req.formula} (Hiện có: ${have}). Phương trình: ${recipe.pedagogicalEquation}`
        };
      }
    }

    // Find target slot in Monster Zone
    const emptySlot = duelist.monsterZones.findIndex(s => s === null);
    const hasFieldMaterial = cardsToConsume.some(c => c.location === 'FIELD');
    if (emptySlot === -1 && !hasFieldMaterial) {
      return { success: false, message: 'Không còn ô trống trên sân quái thú!' };
    }

    // Consume materials: send to Graveyard
    for (const item of cardsToConsume) {
      if (item.location === 'FIELD') {
        duelist.monsterZones[item.index] = null;
      } else {
        const idx = duelist.hand.findIndex(c => c.uid === item.card.uid);
        if (idx !== -1) duelist.hand.splice(idx, 1);
      }
      this.sendCardToGraveyard(duelistId, item.card, item.location === 'FIELD');
    }

    // Remove from Extra Deck & mark properly summoned (Properly Special Summoned First rule)
    duelist.extraDeck.splice(extraIndex, 1);
    compoundCard.properlySummoned = true;
    duelist.properlySummonedUids = duelist.properlySummonedUids || [];
    duelist.properlySummonedUids.push(compoundCard.uid);

    duelist.mana -= compoundCard.def.manaCost;

    // Place summoned compound onto field
    const finalSlotIndex = duelist.monsterZones.findIndex(s => s === null);
    duelist.monsterZones[finalSlotIndex] = {
      slotIndex: finalSlotIndex,
      card: compoundCard,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };

    this.addLog(
      duelist.name,
      `[TRIỆU HỒI TỔNG HỢP HÓA HỌC] Tạo thành công [${compoundCard.def.name}]! Phương trình phản ứng: ${recipe.pedagogicalEquation}`,
      'CHEMICAL_REACTION',
      compoundCard.def.scientificLore
    );

    // Apply special compound trigger
    if (compoundCard.def.effectCode === 'COMP_H2O_HEAL') {
      duelist.lp = Math.min(duelist.maxLp, duelist.lp + 800);
      this.addLog(duelist.name, `[Hiệu ứng Thủy Long H₂O] Nước tinh khiết hồi phục 800 LP (Hiện có: ${duelist.lp} LP).`, 'INFO');
    } else if (compoundCard.def.effectCode === 'COMP_THERMITE_MELT') {
      const opp = this.getOpponent(duelistId);
      let meltedCount = 0;
      opp.monsterZones.forEach((s, idx) => {
        if (s && s.card && s.position !== 'FACE_UP_ATTACK') {
          opp.graveyard.push(s.card);
          opp.monsterZones[idx] = null;
          meltedCount++;
        }
      });
      opp.spellTrapZones.forEach((s, idx) => {
        if (s && s.card) {
          opp.graveyard.push(s.card);
          opp.spellTrapZones[idx] = null;
          meltedCount++;
        }
      });
      opp.lp = Math.max(0, opp.lp - 600);
      this.addLog(duelist.name, `[Hỏa Thần Nhiệt Nhôm] Sóng nhiệt 3000°C nung chảy ${meltedCount} thẻ phòng thủ/bẫy của đối thủ và gây 600 LP sát thương!`, 'CHEMICAL_REACTION');
      this.checkWinConditions();
    } else if (compoundCard.def.effectCode === 'COMP_AGCL_FREEZE') {
      const opp = this.getOpponent(duelistId);
      opp.monsterZones.forEach((s) => {
        if (s && s.card) {
          s.hasAttackedThisTurn = true; // Stun attacks
        }
      });
      this.addLog(duelist.name, `[Băng Phong Kết Tủa AgCl] Kết tủa ion trắng xóa phong tỏa đòn đánh của toàn bộ quái thú đối phương!`, 'CHEMICAL_REACTION');
    }

    return { success: true, message: `Tổng hợp thành công ${compoundCard.def.name}!` };
  }

  // Link Summon (Chemical Covalency / Coordination Link)
  public linkSummon(
    duelistId: string,
    extraDeckCardUid: string,
    fieldSlotIndices: number[],
    useEmz: boolean = false,
    targetSlotIndex?: number,
    targetEmzDuelistId?: string
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể Triệu Hồi Link trong Main Phase!' };
    }

    const duelist = this.getDuelist(duelistId);
    const oppId = duelistId === 'player' ? 'opponent' : 'player';

    if (useEmz && this.isExtraLinkActive(oppId)) {
      return {
        success: false,
        message: '[Khóa Cổng Extra Link - Master Rule 2020]: Đối thủ đã thiết lập Extra Link khóa kín toàn bộ Extra Monster Zone!'
      };
    }

    const targetEmzOwnerId = (useEmz && targetEmzDuelistId) ? targetEmzDuelistId : duelistId;
    const targetEmzOwner = this.getDuelist(targetEmzOwnerId);

    if (useEmz) {
      if (targetEmzOwner.extraMonsterZone && targetEmzOwner.extraMonsterZone.card) {
        return { success: false, message: 'Extra Monster Zone đã có quái thú!' };
      }
    } else if (targetSlotIndex !== undefined) {
      if (duelist.monsterZones[targetSlotIndex] !== null && !fieldSlotIndices.includes(targetSlotIndex)) {
        return { success: false, message: `Ô số ${targetSlotIndex + 1} đã có quái thú!` };
      }
    }

    const extraIndex = duelist.extraDeck.findIndex(c => c.uid === extraDeckCardUid);
    if (extraIndex === -1) {
      return { success: false, message: 'Thẻ Link không có trong Extra Deck!' };
    }

    const linkCard = duelist.extraDeck[extraIndex];
    if (linkCard.def.cardType !== 'LINK_MONSTER') {
      return { success: false, message: 'Thẻ này không phải Quái Thú Link!' };
    }

    if (duelist.mana < linkCard.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${linkCard.def.manaCost} Mana (Có: ${duelist.mana}).` };
    }

    const requiredRating = linkCard.def.linkRating || 1;
    let totalContribution = 0;
    const cardsToConsume: { slotIndex: number; card: CardInstance }[] = [];

    // Guard against duplicate slot indices or out-of-bounds indices
    const uniqueSlots = new Set(fieldSlotIndices);
    if (uniqueSlots.size !== fieldSlotIndices.length) {
      return { success: false, message: 'Không thể chọn trùng lặp cùng một quái thú làm nguyên liệu Link nhiều lần!' };
    }
    for (const slotIdx of fieldSlotIndices) {
      if (slotIdx < 0 || slotIdx >= duelist.monsterZones.length) {
        return { success: false, message: `Vị trí ô quái thú ${slotIdx} nằm ngoài phạm vi sân đấu!` };
      }
    }

    for (const slotIdx of fieldSlotIndices) {
      const slot = duelist.monsterZones[slotIdx];
      if (!slot || !slot.card) {
        return { success: false, message: `Ô số ${slotIdx + 1} không có quái thú để làm nguyên liệu Link!` };
      }
      totalContribution += (slot.card.def.linkRating || 1);
      cardsToConsume.push({ slotIndex: slotIdx, card: slot.card });
    }

    if (totalContribution < requiredRating) {
      return {
        success: false,
        message: `Chưa đủ nguyên liệu Link! Quái thú Link-${requiredRating} yêu cầu tổng liên kết >= ${requiredRating} (Hiện có: ${totalContribution}).`
      };
    }

    if (linkCard.def.linkMaterialsRequired) {
      if (cardsToConsume.length < linkCard.def.linkMaterialsRequired.minCount) {
        return { success: false, message: `Cần ít nhất ${linkCard.def.linkMaterialsRequired.minCount} quái thú trên sân!` };
      }
    }

    // Send link materials to Graveyard
    for (const item of cardsToConsume) {
      duelist.monsterZones[item.slotIndex] = null;
      duelist.graveyard.push(item.card);
      this.addLog(duelist.name, `Gửi [${item.card.def.name}] vào Mộ Bài để thiết lập liên kết Link.`, 'SUMMON');
    }

    // Deduct from Extra Deck & Mana & mark properly summoned (Properly Special Summoned First rule)
    duelist.extraDeck.splice(extraIndex, 1);
    linkCard.properlySummoned = true;
    duelist.properlySummonedUids = duelist.properlySummonedUids || [];
    duelist.properlySummonedUids.push(linkCard.uid);
    duelist.mana -= linkCard.def.manaCost;

    // Place Link monster (Always Attack Position, Link monsters cannot have Defense position)
    const destSlotIndex = (targetSlotIndex !== undefined && targetSlotIndex >= 0 && targetSlotIndex < duelist.monsterZones.length)
      ? targetSlotIndex
      : duelist.monsterZones.findIndex(s => s === null);

    const newSlot: MonsterZoneSlot = {
      slotIndex: useEmz ? -1 : destSlotIndex,
      card: linkCard,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: true,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0,
      isExtraMonsterZone: useEmz
    };

    if (useEmz) {
      targetEmzOwner.extraMonsterZone = newSlot;
    } else {
      duelist.monsterZones[destSlotIndex] = newSlot;
    }

    this.addLog(
      duelist.name,
      `[TRIỆU HỒI LINK THÀNH CÔNG] Triệu hồi [${linkCard.def.name}] (Link-${requiredRating}, ATK ${linkCard.def.atk})!`,
      'SUMMON',
      linkCard.def.scientificLore
    );

    // Link summon triggers
    if (linkCard.def.effectCode === 'LINK_H_BOND_DRAW') {
      this.drawCard(duelistId);
      this.addLog(duelist.name, `[Hiệu ứng H–H Link-1] Rút 1 lá bài từ bộ bài!`, 'INFO');
    }

    return { success: true, message: `Triệu hồi Link thành công: ${linkCard.def.name}!` };
  }

  // ==========================================
  // MASTER RULE 10 SUMMONING MECHANICS EXTENSION
  // ==========================================

  // Normal Set (Face-down Defense from hand - does not count as Summoned)
  public normalSet(
    duelistId: string,
    handCardUid: string,
    preferredTargetSlotIndex?: number
  ): { success: boolean; message: string } {
    return this.normalSummon(duelistId, handCardUid, 'FACE_DOWN_DEFENSE', [], preferredTargetSlotIndex);
  }

  // Flip Summon (Manual flip from Face-down Defense to Face-up Attack - Rulebook v10 tr. 25)
  public flipSummon(
    duelistId: string,
    slotIndex: number,
    isEmz: boolean = false
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể Triệu Hồi Lật trong Main Phase!' };
    }
    if (this.activePlayerId !== duelistId) {
      return { success: false, message: 'Không phải lượt của bạn!' };
    }

    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không có quái thú tại ô này!' };
    }
    if (slot.position !== 'FACE_DOWN_DEFENSE') {
      return { success: false, message: 'Chỉ quái thú đang ở tư thế Phòng Thủ Úp Mặt (Face-down Defense) mới có thể Triệu Hồi Lật!' };
    }
    if (slot.turnSummoned === this.currentTurn) {
      return { success: false, message: 'Không thể Triệu Hồi Lật một quái thú vừa mới được đặt úp trong cùng một lượt!' };
    }
    if (slot.hasChangedPositionThisTurn) {
      return { success: false, message: 'Quái thú này đã thay đổi tư thế trong lượt này!' };
    }

    // Change to FACE_UP_ATTACK
    slot.position = 'FACE_UP_ATTACK';
    slot.hasChangedPositionThisTurn = true;

    this.addLog(
      duelist.name,
      `[TRIỆU HỒI LẬT (FLIP SUMMON)] Lật ngửa [${slot.card.def.name}] sang tư thế Tấn Công Ngửa Mặt!`,
      'SUMMON'
    );

    // Trigger FLIP effect if card has one
    this.checkFlipEffect(duelistId, slot.card, slotIndex, isEmz);

    return { success: true, message: `Triệu Hồi Lật thành công: ${slot.card.def.name}!` };
  }

  // Synchro Summon (Tuner + Non-Tuner exact level sum - Rulebook v10 tr. 20-21)
  public synchroSummon(
    duelistId: string,
    extraIndex: number,
    targetSlotIndex: number,
    tunerSlotIndex: number,
    nonTunerSlotIndices: number[],
    useEmz: boolean = false
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể Triệu Hồi Đồng Bộ trong Main Phase!' };
    }
    if (this.activePlayerId !== duelistId) {
      return { success: false, message: 'Không phải lượt của bạn!' };
    }

    const oppId = duelistId === 'player' ? 'opponent' : 'player';
    if (useEmz && this.isExtraLinkActive(oppId)) {
      return {
        success: false,
        message: '[Khóa Cổng Extra Link - Master Rule 2020]: Đối thủ đã thiết lập Extra Link khóa kín toàn bộ Extra Monster Zone!'
      };
    }

    const duelist = this.getDuelist(duelistId);
    if (extraIndex < 0 || extraIndex >= duelist.extraDeck.length) {
      return { success: false, message: 'Vị trí thẻ trong Extra Deck không hợp lệ!' };
    }

    const synchroCard = duelist.extraDeck[extraIndex];
    if (synchroCard.def.cardType !== 'SYNCHRO_MONSTER') {
      return { success: false, message: 'Thẻ này không phải Quái Thú Đồng Bộ (Synchro Monster)!' };
    }

    if (duelist.mana < synchroCard.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${synchroCard.def.manaCost} Mana (Hiện có: ${duelist.mana}).` };
    }

    // Verify Tuner
    if (tunerSlotIndex < 0 || tunerSlotIndex >= duelist.monsterZones.length) {
      return { success: false, message: 'Vị trí ô Tuner không hợp lệ!' };
    }
    const tunerSlot = duelist.monsterZones[tunerSlotIndex];
    if (!tunerSlot || !tunerSlot.card) {
      return { success: false, message: 'Không có quái thú tại ô Tuner!' };
    }
    if (!tunerSlot.card.def.isTuner) {
      return { success: false, message: `Quái thú [${tunerSlot.card.def.name}] không phải là Tuner!` };
    }
    const tunerLevel = this.getMonsterLevel(tunerSlot.card);
    if (tunerLevel === undefined) {
      return {
        success: false,
        message: `[Vi Phạm Master Rule - Rulebook v10 tr. 25] Quái thú [${tunerSlot.card.def.name}] là Quái thú Xyz/Link (không có Level), không thể làm nguyên liệu Triệu hồi Đồng Bộ (Synchro Material)!`
      };
    }

    // Verify Non-Tuners
    if (!nonTunerSlotIndices || nonTunerSlotIndices.length === 0) {
      return { success: false, message: 'Cần ít nhất 1 quái thú Non-Tuner để Triệu Hồi Đồng Bộ!' };
    }
    if (nonTunerSlotIndices.includes(tunerSlotIndex)) {
      return { success: false, message: 'Tuner không thể trùng với Non-Tuner!' };
    }
    const uniqueNonTuners = new Set(nonTunerSlotIndices);
    if (uniqueNonTuners.size !== nonTunerSlotIndices.length) {
      return { success: false, message: 'Không thể chọn trùng lặp quái thú Non-Tuner!' };
    }

    let nonTunerLevelSum = 0;
    for (const idx of nonTunerSlotIndices) {
      if (idx < 0 || idx >= duelist.monsterZones.length) {
        return { success: false, message: `Vị trí ô Non-Tuner ${idx} không hợp lệ!` };
      }
      const slot = duelist.monsterZones[idx];
      if (!slot || !slot.card) {
        return { success: false, message: `Không có quái thú tại ô Non-Tuner ${idx + 1}!` };
      }
      if (slot.card.def.isTuner) {
        return { success: false, message: `Quái thú [${slot.card.def.name}] ở ô ${idx + 1} là Tuner, không thể làm Non-Tuner!` };
      }
      const nonTunerLevel = this.getMonsterLevel(slot.card);
      if (nonTunerLevel === undefined) {
        return {
          success: false,
          message: `[Vi Phạm Master Rule - Rulebook v10 tr. 25] Quái thú [${slot.card.def.name}] ở ô ${idx + 1} là Quái thú Xyz/Link (không có Level), không thể làm nguyên liệu Triệu hồi Đồng Bộ (Synchro Material)!`
        };
      }
      nonTunerLevelSum += nonTunerLevel;
    }

    const totalLevelSum = tunerLevel + nonTunerLevelSum;
    const targetLevel = synchroCard.def.synchroLevel || synchroCard.def.level || 7;

    if (totalLevelSum !== targetLevel) {
      return {
        success: false,
        message: `Tổng Cấp độ nguyên liệu (${tunerLevel} Tuner + ${nonTunerLevelSum} Non-Tuner = ${totalLevelSum}) không bằng Cấp độ Quái Thú Đồng Bộ (${targetLevel})!`
      };
    }

    // Check target destination
    if (useEmz) {
      const oppId = duelistId === 'player' ? 'opponent' : 'player';
      if (this.isExtraLinkActive(oppId)) {
        return {
          success: false,
          message: '[Khóa Cổng Extra Link - Master Rule 2020]: Đối thủ đã thiết lập Extra Link khóa kín toàn bộ Extra Monster Zone!'
        };
      }
      if (duelist.extraMonsterZone && duelist.extraMonsterZone.card) {
        return { success: false, message: 'Extra Monster Zone đã có quái thú!' };
      }
    } else {
      const isTargetFreed = (targetSlotIndex === tunerSlotIndex) || nonTunerSlotIndices.includes(targetSlotIndex);
      if (duelist.monsterZones[targetSlotIndex] !== null && !isTargetFreed) {
        return { success: false, message: `Ô số ${targetSlotIndex + 1} đã có quái thú!` };
      }
    }

    // Send materials to Graveyard
    const tunerCard = tunerSlot.card;
    this.sendCardToGraveyard(duelistId, tunerCard, true);
    duelist.monsterZones[tunerSlotIndex] = null;
    this.addLog(duelist.name, `Gửi Tuner [${tunerCard.def.name}] (Cấp ${tunerLevel}) vào Mộ Bài.`, 'SUMMON');

    for (const idx of nonTunerSlotIndices) {
      const card = duelist.monsterZones[idx]!.card!;
      this.sendCardToGraveyard(duelistId, card, true);
      duelist.monsterZones[idx] = null;
      this.addLog(duelist.name, `Gửi Non-Tuner [${card.def.name}] (Cấp ${card.def.level || 1}) vào Mộ Bài.`, 'SUMMON');
    }

    // Deduct mana
    duelist.mana -= synchroCard.def.manaCost;

    // Remove from Extra Deck & mark properly summoned
    duelist.extraDeck.splice(extraIndex, 1);
    synchroCard.properlySummoned = true;
    duelist.properlySummonedUids = duelist.properlySummonedUids || [];
    duelist.properlySummonedUids.push(synchroCard.uid);

    // Place monster
    const newSlot: MonsterZoneSlot = {
      slotIndex: useEmz ? -1 : targetSlotIndex,
      card: synchroCard,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: (tunerCard.def.effectCode === 'TUNER_PT_SPEED' ? 500 : 0),
      tempDefBoost: 0,
      isExtraMonsterZone: useEmz
    };

    if (useEmz) {
      duelist.extraMonsterZone = newSlot;
    } else {
      duelist.monsterZones[targetSlotIndex] = newSlot;
    }

    this.addLog(
      duelist.name,
      `[TRIỆU HỒI ĐỒNG BỘ THÀNH CÔNG] Triệu hồi [${synchroCard.def.name}] (Level ${targetLevel}, ATK ${synchroCard.def.atk}, DEF ${synchroCard.def.def})!`,
      'SUMMON',
      synchroCard.def.scientificLore
    );

    // Synchro effects
    if (synchroCard.def.effectCode === 'SYNCHRO_EMISSION_PURIFY') {
      const opp = this.getOpponent(duelistId);
      const targetTrapIdx = opp.spellTrapZones.findIndex(s => s && s.card);
      if (targetTrapIdx !== -1) {
        const destroyed = opp.spellTrapZones[targetTrapIdx]!.card!;
        opp.spellTrapZones[targetTrapIdx] = null;
        opp.graveyard.push(destroyed);
        this.addLog(duelist.name, `[Lò Chuyển Hóa Xúc Tác] Tiêu hủy lá bài [${destroyed.def.name}] của đối phương!`, 'CHEMICAL_REACTION');
      }
      duelist.lp = Math.min(duelist.maxLp, duelist.lp + 600);
      this.addLog(duelist.name, `[Lò Chuyển Hóa Xúc Tác] Hồi phục 600 LP (Hiện có: ${duelist.lp} LP).`, 'INFO');
    }

    return { success: true, message: `Triệu Hồi Đồng Bộ thành công: ${synchroCard.def.name}!` };
  }

  // Xyz Summon (Overlay same Level monsters as Xyz Materials - Rulebook v10 tr. 18-19, 51)
  public xyzSummon(
    duelistId: string,
    extraIndex: number,
    targetSlotIndex: number,
    overlaySlotIndices: number[],
    useEmz: boolean = false
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể Triệu Hồi Xyz trong Main Phase!' };
    }
    if (this.activePlayerId !== duelistId) {
      return { success: false, message: 'Không phải lượt của bạn!' };
    }

    const oppId = duelistId === 'player' ? 'opponent' : 'player';
    if (useEmz && this.isExtraLinkActive(oppId)) {
      return {
        success: false,
        message: '[Khóa Cổng Extra Link - Master Rule 2020]: Đối thủ đã thiết lập Extra Link khóa kín toàn bộ Extra Monster Zone!'
      };
    }

    const duelist = this.getDuelist(duelistId);
    if (extraIndex < 0 || extraIndex >= duelist.extraDeck.length) {
      return { success: false, message: 'Vị trí thẻ trong Extra Deck không hợp lệ!' };
    }

    const xyzCard = duelist.extraDeck[extraIndex];
    if (xyzCard.def.cardType !== 'XYZ_MONSTER') {
      return { success: false, message: 'Thẻ này không phải Quái Thú Xyz (Xyz Monster)!' };
    }

    if (duelist.mana < xyzCard.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${xyzCard.def.manaCost} Mana (Hiện có: ${duelist.mana}).` };
    }

    const reqCount = xyzCard.def.xyzMaterialsRequired?.count || 2;
    const reqLevel = xyzCard.def.xyzMaterialsRequired?.level || xyzCard.def.xyzRank || 4;

    if (overlaySlotIndices.length !== reqCount) {
      return { success: false, message: `Quái thú Xyz Rank ${xyzCard.def.xyzRank || 4} yêu cầu chính xác ${reqCount} nguyên liệu xếp chồng (chọn: ${overlaySlotIndices.length})!` };
    }

    const uniqueIndices = new Set(overlaySlotIndices);
    if (uniqueIndices.size !== overlaySlotIndices.length) {
      return { success: false, message: 'Không thể chọn trùng lặp cùng một quái thú!' };
    }

    const overlayMaterials: CardInstance[] = [];
    for (const idx of overlaySlotIndices) {
      if (idx < 0 || idx >= duelist.monsterZones.length) {
        return { success: false, message: `Vị trí ô ${idx} không hợp lệ!` };
      }
      const slot = duelist.monsterZones[idx];
      if (!slot || !slot.card) {
        return { success: false, message: `Ô số ${idx + 1} không có quái thú!` };
      }
      // Master Rule (Rulebook v10 tr. 48 & 51): Monster Tokens CANNOT be used as Xyz Material!
      if (slot.card.isToken || slot.card.def.isToken || slot.card.def.cardType === 'TOKEN_MONSTER') {
        return {
          success: false,
          message: `[Quy Tắc Monster Token - Rulebook v10 tr. 48] Monster Token [${slot.card.def.name}] không thể được sử dụng làm Nguyên liệu Xyz (không thể xếp chồng làm Xyz Material)!`
        };
      }
      const matLevel = this.getMonsterLevel(slot.card);
      if (matLevel === undefined) {
        return {
          success: false,
          message: `[Vi Phạm Master Rule - Rulebook v10 tr. 25] Quái thú [${slot.card.def.name}] ở ô ${idx + 1} là Quái thú Xyz/Link (không có Level), không thể làm nguyên liệu Triệu hồi Xyz (Xyz Material)!`
        };
      }
      if (matLevel !== reqLevel) {
        return {
          success: false,
          message: `Quái thú [${slot.card.def.name}] ở ô ${idx + 1} có Cấp ${matLevel}, không khớp Cấp độ yêu cầu (${reqLevel})!`
        };
      }
      overlayMaterials.push(slot.card);
    }

    // Verify target slot
    if (useEmz) {
      const oppId = duelistId === 'player' ? 'opponent' : 'player';
      if (this.isExtraLinkActive(oppId)) {
        return {
          success: false,
          message: '[Khóa Cổng Extra Link - Master Rule 2020]: Đối thủ đã thiết lập Extra Link khóa kín toàn bộ Extra Monster Zone!'
        };
      }
      if (duelist.extraMonsterZone && duelist.extraMonsterZone.card) {
        return { success: false, message: 'Extra Monster Zone đã có quái thú!' };
      }
    } else {
      const isTargetFreed = overlaySlotIndices.includes(targetSlotIndex);
      if (duelist.monsterZones[targetSlotIndex] !== null && !isTargetFreed) {
        return { success: false, message: `Ô số ${targetSlotIndex + 1} đã có quái thú!` };
      }
    }

    // Clear overlay slots from field (Xyz materials are attached underneath, not treated as cards on the field)
    for (const idx of overlaySlotIndices) {
      duelist.monsterZones[idx] = null;
    }

    // Deduct mana
    duelist.mana -= xyzCard.def.manaCost;

    // Remove from Extra Deck & mark properly summoned
    duelist.extraDeck.splice(extraIndex, 1);
    xyzCard.properlySummoned = true;
    duelist.properlySummonedUids = duelist.properlySummonedUids || [];
    duelist.properlySummonedUids.push(xyzCard.uid);

    // Place into slot with attached xyzMaterials
    const newSlot: MonsterZoneSlot = {
      slotIndex: useEmz ? -1 : targetSlotIndex,
      card: xyzCard,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0,
      xyzMaterials: overlayMaterials,
      isExtraMonsterZone: useEmz
    };

    if (useEmz) {
      duelist.extraMonsterZone = newSlot;
    } else {
      duelist.monsterZones[targetSlotIndex] = newSlot;
    }

    this.addLog(
      duelist.name,
      `[TRIỆU HỒI XYZ THÀNH CÔNG] Triệu hồi [${xyzCard.def.name}] (Rank ${xyzCard.def.xyzRank || 4}, ATK ${xyzCard.def.atk}, DEF ${xyzCard.def.def}) bằng cách xếp chồng ${reqCount} nguyên liệu Cấp ${reqLevel}!`,
      'SUMMON',
      xyzCard.def.scientificLore
    );

    return { success: true, message: `Triệu Hồi Xyz thành công: ${xyzCard.def.name}!` };
  }

  // Detach Xyz Material to Graveyard
  public detachXyzMaterial(
    duelistId: string,
    slotIndex: number,
    isEmz: boolean = false
  ): { success: boolean; message: string; detachedCard?: CardInstance } {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];

    if (!slot || !slot.card) {
      return { success: false, message: 'Không có quái thú tại ô này!' };
    }
    if (slot.card.def.cardType !== 'XYZ_MONSTER') {
      return { success: false, message: 'Quái thú này không phải Quái Thú Xyz!' };
    }
    if (!slot.xyzMaterials || slot.xyzMaterials.length === 0) {
      return { success: false, message: 'Quái thú Xyz này không còn Vật Liệu để tháo (Detach)!' };
    }

    const detached = slot.xyzMaterials.pop()!;
    duelist.graveyard.push(detached);

    this.addLog(
      duelist.name,
      `[THÁO VẬT LIỆU XYZ] Tháo [${detached.def.name}] từ [${slot.card.def.name}] xuống Mộ Bài! (Còn lại: ${slot.xyzMaterials.length} vật liệu).`,
      'INFO'
    );

    // Trigger Xyz monster effect (Rulebook v10 tr. 48-49 & 54: Check if monster effect is negated on field)
    if (this.isMonsterEffectNegated(duelistId, slotIndex, isEmz)) {
      this.recordGameEvent('EFFECT_NEGATED', slot.card, duelistId, {
        reason: 'MONSTER_EFFECT_NEGATED_ON_FIELD',
        slotIndex
      });
      this.addLog(
        duelist.name,
        `[Vô Hiệu Hóa Hiệu Ứng - Rulebook v10 tr. 48-49 & 54] [${slot.card.def.name}] đã trả chi phí tháo vật liệu [${detached.def.name}], nhưng hiệu ứng kích hoạt bị vô hiệu hóa (Skill Drain)!`,
        'INFO'
      );
      return {
        success: true,
        message: `Đã tháo [${detached.def.name}], nhưng hiệu ứng của [${slot.card.def.name}] bị vô hiệu hóa!`,
        detachedCard: detached
      };
    }

    if (slot.card.def.effectCode === 'XYZ_COBALT_DETACH_SHIELD') {
      slot.passivationShieldUsed = false;
      slot.inertShieldUsed = false;
      slot.tempDefBoost += 1000;
      this.addLog(duelist.name, `[Khiên Phối Trí Bát Diện Co] Gia cố phòng ngự +1000 DEF và kích hoạt lá chắn hấp thụ sát thương!`, 'CHEMICAL_REACTION');
    } else if (slot.card.def.effectCode === 'XYZ_FERROCENE_DETACH_BOOST') {
      slot.tempAtkBoost += 800;
      this.addLog(duelist.name, `[Bánh Kẹp Ferrocene] Chuyển dịch điện tử Fe²⁺ tăng vĩnh viễn +800 ATK (Hiện có: ${(slot.card.def.atk || 0) + slot.tempAtkBoost} ATK)!`, 'CHEMICAL_REACTION');
    }

    return { success: true, message: `Tháo thành công [${detached.def.name}]!`, detachedCard: detached };
  }

  // Pendulum Scale Placement (Slots 0 and 4 of Spell & Trap Zones)
  public placePendulumScale(
    duelistId: string,
    handCardUid: string,
    side: 'left' | 'right'
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể kích hoạt Thang Đo Dao Động trong Main Phase!' };
    }
    if (this.activePlayerId !== duelistId) {
      return { success: false, message: 'Không phải lượt của bạn!' };
    }

    const duelist = this.getDuelist(duelistId);
    duelist.pendulumZones = duelist.pendulumZones || { left: null, right: null };

    if (duelist.pendulumZones[side] !== null) {
      return { success: false, message: `Pendulum Zone ${side.toUpperCase()} đã có lá bài!` };
    }

    const handIndex = duelist.hand.findIndex(c => c.uid === handCardUid);
    if (handIndex === -1) {
      return { success: false, message: 'Lá bài không có trên tay!' };
    }

    const card = duelist.hand[handIndex];
    if (card.def.pendulumScale === undefined) {
      return { success: false, message: 'Lá bài này không có Thang Đo Dao Động (Pendulum Scale)!' };
    }

    const slotIdx = side === 'left' ? 0 : 4;
    if (duelist.spellTrapZones[slotIdx] !== null) {
      return { success: false, message: `Ô Phép/Bẫy số ${slotIdx + 1} (Pendulum Zone ${side.toUpperCase()}) đang bị chiếm dụng!` };
    }

    // Remove from hand & place into pendulum zone
    duelist.hand.splice(handIndex, 1);
    duelist.pendulumZones[side] = card;
    duelist.spellTrapZones[slotIdx] = {
      slotIndex: slotIdx,
      card,
      isFaceUp: true,
      turnSet: this.currentTurn
    };

    this.addLog(
      duelist.name,
      `[KÍCH HOẠT THANG ĐO DAO ĐỘNG] ${duelist.name} đặt [${card.def.name}] vào Pendulum Zone ${side.toUpperCase()} (Scale ${card.def.pendulumScale})!`,
      'SPELL',
      card.def.pendulumEffectText || card.def.scientificLore
    );

    return { success: true, message: `Kích hoạt Thang Đo Dao Động ${side.toUpperCase()} thành công!` };
  }

  // Pendulum Summon (Summon monsters from hand and face-up Extra Deck between Scales - Rulebook v10 tr. 16-17)
  public pendulumSummon(
    duelistId: string,
    selections: { handUids?: string[]; extraDeckUids?: string[] }
  ): { success: boolean; message: string; summonedCount: number } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể Triệu Hồi Dao Động trong Main Phase!', summonedCount: 0 };
    }
    if (this.activePlayerId !== duelistId) {
      return { success: false, message: 'Không phải lượt của bạn!', summonedCount: 0 };
    }

    const duelist = this.getDuelist(duelistId);
    duelist.pendulumZones = duelist.pendulumZones || { left: null, right: null };

    if (duelist.hasPendulumSummonedThisTurn) {
      return { success: false, message: 'Mỗi lượt chỉ được thực hiện Triệu Hồi Dao Động (Pendulum Summon) đúng 1 lần!', summonedCount: 0 };
    }

    const leftCard = duelist.pendulumZones.left;
    const rightCard = duelist.pendulumZones.right;
    if (!leftCard || !rightCard) {
      return { success: false, message: 'Cần thiết lập đủ cả 2 bên Thang Đo Dao Động (Pendulum Scales) để thực hiện triệu hồi!', summonedCount: 0 };
    }

    const scaleL = leftCard.def.pendulumScale || 1;
    const scaleR = rightCard.def.pendulumScale || 8;
    const minScale = Math.min(scaleL, scaleR);
    const maxScale = Math.max(scaleL, scaleR);

    if (maxScale - minScale <= 1) {
      return { success: false, message: `Khoảng cách giữa hai Thang đo (${minScale} và ${maxScale}) không có Cấp độ nào hợp lệ!`, summonedCount: 0 };
    }

    const handUids = selections.handUids || [];
    const extraDeckUids = selections.extraDeckUids || [];
    let availableSlots = duelist.monsterZones.map((s, idx) => s === null ? idx : -1).filter(idx => idx !== -1);

    if (handUids.length + extraDeckUids.length > availableSlots.length) {
      return { success: false, message: `Không đủ ô trống trên sân (Trống: ${availableSlots.length}, Chọn: ${handUids.length + extraDeckUids.length})!`, summonedCount: 0 };
    }

    let summonedCount = 0;

    // Process Hand Summons
    for (const uid of handUids) {
      const hIdx = duelist.hand.findIndex(c => c.uid === uid);
      if (hIdx === -1) continue;
      const card = duelist.hand[hIdx];
      const lvl = card.def.level || 1;
      if (lvl <= minScale || lvl >= maxScale) {
        return { success: false, message: `Quái thú [${card.def.name}] Cấp ${lvl} nằm ngoài khoảng Thang đo (${minScale} - ${maxScale})!`, summonedCount: 0 };
      }
      const targetSlot = availableSlots.shift()!;
      duelist.hand.splice(hIdx, 1);
      duelist.monsterZones[targetSlot] = {
        slotIndex: targetSlot,
        card,
        position: 'FACE_UP_ATTACK',
        hasAttackedThisTurn: false,
        hasChangedPositionThisTurn: false,
        turnSummoned: this.currentTurn,
        tempAtkBoost: 0,
        tempDefBoost: 0
      };
      summonedCount++;
      this.addLog(duelist.name, `Triệu hồi Dao Động [${card.def.name}] (Cấp ${lvl}) từ tay lên ô ${targetSlot + 1}.`, 'SUMMON');
    }

    // Process Face-up Extra Deck Summons
    for (const uid of extraDeckUids) {
      const eIdx = duelist.extraDeck.findIndex(c => c.uid === uid);
      if (eIdx === -1) continue;
      const card = duelist.extraDeck[eIdx];
      if (!card.isFaceUpInExtraDeck) {
        return { success: false, message: `Quái thú [${card.def.name}] không ở trạng thái ngửa mặt trong Extra Deck!`, summonedCount: 0 };
      }
      const lvl = card.def.level || 1;
      if (lvl <= minScale || lvl >= maxScale) {
        return { success: false, message: `Quái thú [${card.def.name}] Cấp ${lvl} nằm ngoài khoảng Thang đo (${minScale} - ${maxScale})!`, summonedCount: 0 };
      }
      const targetSlot = availableSlots.shift()!;
      duelist.extraDeck.splice(eIdx, 1);
      card.isFaceUpInExtraDeck = false;
      duelist.monsterZones[targetSlot] = {
        slotIndex: targetSlot,
        card,
        position: 'FACE_UP_ATTACK',
        hasAttackedThisTurn: false,
        hasChangedPositionThisTurn: false,
        turnSummoned: this.currentTurn,
        tempAtkBoost: 0,
        tempDefBoost: 0
      };
      summonedCount++;
      this.addLog(duelist.name, `Triệu hồi Dao Động [${card.def.name}] (Cấp ${lvl}) từ Extra Deck ngửa lên ô ${targetSlot + 1}.`, 'SUMMON');
    }

    duelist.hasPendulumSummonedThisTurn = true;
    this.addLog(
      duelist.name,
      `[TRIỆU HỒI DAO ĐỘNG THÀNH CÔNG] Triệu hồi đồng thời ${summonedCount} quái thú giữa Thang đo Scale ${minScale} và ${maxScale}!`,
      'SUMMON'
    );

    return { success: true, message: `Triệu Hồi Dao Động thành công ${summonedCount} quái thú!`, summonedCount };
  }

  // Ritual Summon (Ritual Spell + Tributes from Hand/Field - Rulebook v10 tr. 23)
  public ritualSummon(
    duelistId: string,
    ritualMonsterHandUid: string,
    ritualSpellHandUid: string,
    tributeSlotIndices: number[],
    targetSlotIndex?: number
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể Triệu Hồi Nghi Thức trong Main Phase!' };
    }
    if (this.activePlayerId !== duelistId) {
      return { success: false, message: 'Không phải lượt của bạn!' };
    }

    const duelist = this.getDuelist(duelistId);

    // Find Ritual Monster in hand
    const mIdx = duelist.hand.findIndex(c => c.uid === ritualMonsterHandUid);
    if (mIdx === -1) return { success: false, message: 'Quái thú Nghi Thức không có trên tay!' };
    const ritualMonster = duelist.hand[mIdx];
    if (ritualMonster.def.cardType !== 'RITUAL_MONSTER' && !ritualMonster.def.isRitualMonster) {
      return { success: false, message: 'Lá bài này không phải Quái Thú Nghi Thức!' };
    }

    // Find Ritual Spell in hand
    const sIdx = duelist.hand.findIndex(c => c.uid === ritualSpellHandUid);
    if (sIdx === -1) return { success: false, message: 'Phép Nghi Thức không có trên tay!' };
    const ritualSpell = duelist.hand[sIdx];
    if (ritualSpell.def.spellTrapSubtype !== 'RITUAL_SPELL') {
      return { success: false, message: 'Lá bài này không phải Phép Nghi Thức (Ritual Spell)!' };
    }

    if (duelist.mana < ritualSpell.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${ritualSpell.def.manaCost} Mana để kích hoạt Phép Nghi Thức.` };
    }

    // Validate tributes
    const reqLevel = ritualMonster.def.level || 8;
    let totalTributeLevel = 0;
    const uniqueTributes = new Set(tributeSlotIndices);
    if (uniqueTributes.size !== tributeSlotIndices.length) {
      return { success: false, message: 'Không thể chọn trùng lặp quái thú hiến tế!' };
    }

    for (const idx of tributeSlotIndices) {
      if (idx < 0 || idx >= duelist.monsterZones.length) {
        return { success: false, message: `Vị trí ô hiến tế ${idx} không hợp lệ!` };
      }
      const slot = duelist.monsterZones[idx];
      if (!slot || !slot.card) {
        return { success: false, message: `Ô số ${idx + 1} không có quái thú để hiến tế!` };
      }
      const activeTransfer = this.activeControlTransfers.find(r => r.cardUid === slot.card!.uid);
      if (activeTransfer && activeTransfer.canTribute === false) {
        return {
          success: false,
          message: `[Vi Phạm Master Rule - Rulebook v10 tr. 47] Quái thú [${slot.card.def.name}] đang trong trạng thái chuyển giao quyền kiểm soát không thể đem đi hiến tế (Tribute)!`
        };
      }
      const tLevel = this.getMonsterLevel(slot.card);
      if (tLevel === undefined) {
        return {
          success: false,
          message: `[Vi Phạm Master Rule - Rulebook v10 tr. 20-21 & 25] Quái thú [${slot.card.def.name}] ở ô ${idx + 1} là Quái thú Xyz/Link (không có Level), không thể hiến tế theo Cấp độ cho Triệu hồi Nghi Thức (Ritual Tribute)!`
        };
      }
      totalTributeLevel += tLevel;
    }

    if (totalTributeLevel < reqLevel) {
      return {
        success: false,
        message: `Chưa đủ Cấp độ hiến tế! Tổng Cấp hiện có: ${totalTributeLevel}, Cần tối thiểu: ${reqLevel}.`
      };
    }

    // Send tributes to Graveyard
    for (const idx of tributeSlotIndices) {
      const c = duelist.monsterZones[idx]!.card!;
      this.sendCardToGraveyard(duelistId, c, true);
      duelist.monsterZones[idx] = null;
      this.addLog(duelist.name, `Hiến tế [${c.def.name}] (Cấp ${c.def.level || 1}) cho Nghi Thức.`, 'SUMMON');
    }

    // Send ritual spell to Graveyard
    duelist.mana -= ritualSpell.def.manaCost;
    duelist.hand.splice(sIdx, 1);
    duelist.graveyard.push(ritualSpell);

    // Remove monster from hand
    const updatedMIdx = duelist.hand.findIndex(c => c.uid === ritualMonsterHandUid);
    duelist.hand.splice(updatedMIdx, 1);

    // Mark properly summoned
    ritualMonster.properlySummoned = true;
    duelist.properlySummonedUids = duelist.properlySummonedUids || [];
    duelist.properlySummonedUids.push(ritualMonster.uid);

    // Place monster in target slot or first empty slot
    let slotToPlace = targetSlotIndex !== undefined && duelist.monsterZones[targetSlotIndex] === null
      ? targetSlotIndex
      : duelist.monsterZones.findIndex(s => s === null);

    if (slotToPlace === -1) {
      slotToPlace = tributeSlotIndices[0];
    }

    duelist.monsterZones[slotToPlace] = {
      slotIndex: slotToPlace,
      card: ritualMonster,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };

    this.addLog(
      duelist.name,
      `[TRIỆU HỒI NGHI THỨC THÀNH CÔNG] Triệu hồi [${ritualMonster.def.name}] (Cấp ${reqLevel}, ATK ${ritualMonster.def.atk}, DEF ${ritualMonster.def.def}) bằng Phép [${ritualSpell.def.name}]!`,
      'SUMMON',
      ritualMonster.def.scientificLore
    );

    return { success: true, message: `Triệu Hồi Nghi Thức thành công: ${ritualMonster.def.name}!` };
  }

  // Central Card Routing to Graveyard (Handles Pendulum Face-up Extra Deck Redirection & Token Disappearance)
  // Master Rule: Original Owner Graveyard Routing Invariant (Rulebook v10 tr. 47 & 55)
  public sendCardToGraveyard(duelistId: string, card: CardInstance, fromField: boolean = true): void {
    const ownerId = card.originalOwnerId || card.ownerId || duelistId;
    const recipient = this.getDuelist(ownerId);
    const sender = this.getDuelist(duelistId);

    // Clear any active control transfer record for this card
    this.activeControlTransfers = this.activeControlTransfers.filter(r => r.cardUid !== card.uid);

    // Master Rule (Rulebook v10 tr. 48-49): Monster Tokens disappear completely when leaving the field; they NEVER enter GY!
    if (card.isToken || card.def.isToken || card.def.cardType === 'TOKEN_MONSTER') {
      this.addLog(
        sender.name,
        `[Quy Tắc Monster Token - Rulebook v10 tr. 48] Monster Token [${card.def.name}] rời khỏi sân và biến mất hoàn toàn khỏi trận đấu (không vào Mộ Bài)!`,
        'INFO'
      );
      return;
    }

    // Pendulum rule (Rulebook v10 tr. 17 & 47): Whenever one of your Pendulum Monster Cards on the field would be sent to Graveyard, place it face-up on its OWNER's Extra Deck instead!
    if (fromField && card.def.cardType === 'PENDULUM_MONSTER') {
      card.isFaceUpInExtraDeck = true;
      recipient.extraDeck.push(card);
      this.addLog(
        recipient.name,
        `[Quy Tắc Dao Động & Sở Hữu - Rulebook v10 tr. 17 & 47] [${card.def.name}] rời sân và quay trở về Extra Deck của chủ nhân [${recipient.name}] ở trạng thái ngửa mặt!`,
        'INFO'
      );
    } else {
      recipient.graveyard.push(card);
      if (ownerId !== duelistId) {
        this.addLog(
          recipient.name,
          `[Quy Tắc Quyền Sở Hữu - Rulebook v10 tr. 47] Lá bài [${card.def.name}] thuộc quyền sở hữu của [${recipient.name}], được gửi về Mộ Bài của chủ nhân gốc thay vì [${sender.name}]!`,
          'INFO'
        );
      }
    }
  }

  // Change Monster Position (Attack <-> Defense) (Rulebook v10 tr. 24)
  public changeMonsterPosition(
    duelistId: string,
    slotIndex: number,
    isEmz: boolean = false
  ): { success: boolean; message: string } {
    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: '[Quy Tắc Đổi Tư Thế - Rulebook v10 tr. 24] Chỉ có thể đổi tư thế trong Main Phase!' };
    }
    if (duelistId !== this.activePlayerId) {
      return { success: false, message: '[Quy Tắc Đổi Tư Thế - Rulebook v10 tr. 24] Chỉ có thể đổi tư thế trong lượt của chính mình!' };
    }

    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) return { success: false, message: 'Không có quái thú tại ô này!' };

    if (slot.card.def.cardType === 'LINK_MONSTER') {
      return { success: false, message: '[Quy Tắc Quái Thú Link - Master Rule 2020] Quái Thú Link không có chỉ số DEF và không thể chuyển sang tư thế phòng thủ!' };
    }

    if (slot.turnSummoned === this.currentTurn) {
      return { success: false, message: '[Quy Tắc Đổi Tư Thế - Rulebook v10 tr. 24] Quái thú vừa được triệu hồi hoặc đặt úp trong lượt này không thể đổi tư thế!' };
    }
    if (slot.hasAttackedThisTurn) {
      return { success: false, message: '[Quy Tắc Đổi Tư Thế - Rulebook v10 tr. 24] Quái thú đã tuyên bố tấn công trong lượt này không thể đổi tư thế!' };
    }
    if (slot.hasChangedPositionThisTurn) {
      return { success: false, message: '[Quy Tắc Đổi Tư Thế - Rulebook v10 tr. 24] Quái thú đã đổi tư thế trong lượt này! Mỗi quái thú chỉ được phép đổi tư thế tối đa 1 lần mỗi lượt.' };
    }
    if (slot.positionLockedUntilTurn !== undefined && slot.positionLockedUntilTurn >= this.currentTurn) {
      return { success: false, message: '[Khóa Tư Thế] Quái thú đang bị trầm tích/kết tinh khóa cứng không thể đổi tư thế!' };
    }

    // Changing Face-down Defense to Face-up Attack is canonical Flip Summon (Rulebook v10 tr. 25)
    if (slot.position === 'FACE_DOWN_DEFENSE') {
      return this.flipSummon(duelistId, slotIndex, isEmz);
    }

    if (slot.position === 'FACE_UP_ATTACK') {
      slot.position = 'FACE_UP_DEFENSE';
    } else {
      slot.position = 'FACE_UP_ATTACK';
    }
    slot.hasChangedPositionThisTurn = true;

    this.addLog(
      duelist.name,
      `[Đổi Tư Thế - Rulebook v10 tr. 24] Chuyển [${slot.card.def.name}] sang tư thế ${slot.position === 'FACE_UP_ATTACK' ? 'Tấn Công Ngửa Mặt' : 'Phòng Thủ Ngửa Mặt'}.`,
      'INFO'
    );
    return {
      success: true,
      message: `Đổi tư thế [${slot.card.def.name}] sang ${slot.position === 'FACE_UP_ATTACK' ? 'Tấn Công' : 'Phòng Thủ'} thành công!`
    };
  }

  // ==========================================
  // SPELL & TRAP ACTIVATION & SETTING
  // ==========================================
  public setSpellTrap(duelistId: string, handCardUid: string, preferredSlotIndex?: number): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const handIndex = duelist.hand.findIndex(c => c.uid === handCardUid);
    if (handIndex === -1) return { success: false, message: 'Lá bài không có trên tay!' };

    const card = duelist.hand[handIndex];

    // Master Rule (Rulebook v10 tr. 28): Setting a Field Spell Card in the Field Zone
    // "You can also Set a Field Spell Card face-down in your Field Zone. It will have no effect until you activate it."
    // The Field Zone is independent of the 5 Spell & Trap Zones!
    if (card.def.cardType === 'FIELD_ENVIRONMENT') {
      if (duelist.fieldZone) {
        // Send previous Field Spell to Graveyard by game mechanics (NOT destroyed!)
        const oldField = duelist.fieldZone;
        duelist.graveyard.push(oldField);
        this.addLog(
          duelist.name,
          `[Thay Thế Địa Bàn - Rulebook v10 tr. 28] Thẻ Địa Bàn cũ [${oldField.def.name}] được chuyển xuống Mộ Bài theo cơ chế trò chơi (không phải bị tiêu diệt bởi hiệu ứng).`,
          'SPELL'
        );
      }
      duelist.hand.splice(handIndex, 1);
      card.isFaceDown = true;
      card.turnSet = this.currentTurn;
      duelist.fieldZone = card;
      this.addLog(
        duelist.name,
        `[Úp Thẻ Địa Bàn - Rulebook v10 tr. 28] ${duelist.name} đã Úp Thẻ Địa Bàn [${card.def.name}] vào Khu Vực Địa Bàn (Field Zone). Thẻ chưa có hiệu lực cho đến khi được kích hoạt lật ngửa.`,
        'SPELL'
      );
      return { success: true, message: `Úp Thẻ Địa Bàn [${card.def.name}] thành công!` };
    }

    // Master Rule Column Placement (Rulebook v10 tr. 4-5): Support preferredSlotIndex
    const emptySlot = preferredSlotIndex !== undefined && preferredSlotIndex >= 0 && preferredSlotIndex <= 4 && duelist.spellTrapZones[preferredSlotIndex] === null
      ? preferredSlotIndex
      : duelist.spellTrapZones.findIndex(s => s === null);
    if (emptySlot === -1) return { success: false, message: 'Khu vực Phép/Bẫy (Spell/Trap Zones) đã đầy (5/5)!' };

    duelist.hand.splice(handIndex, 1);
    duelist.spellTrapZones[emptySlot] = {
      slotIndex: emptySlot,
      card,
      isFaceUp: false,
      turnSet: this.currentTurn
    };

    const targetCol = this.getColumnForSlot(duelist.id, 'SPELL_TRAP', emptySlot);
    this.addLog(duelist.name, `Đặt 1 lá bài úp vào ô Phép/Bẫy số ${emptySlot + 1} (Cột chiến trường ${targetCol + 1}).`, 'TRAP');
    return { success: true, message: 'Đặt bài úp thành công!' };
  }

  public activateSpellFromHand(
    duelistId: string,
    handCardUid: string,
    targetSlotIndexOrOptions?: number | {
      targetSlotIndex?: number;
      targetSlotIndices?: number[];
      targetRefs?: ChainTargetRef[];
      targetPlayerId?: string;
      requiresAllTargets?: boolean;
    }
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const handIndex = duelist.hand.findIndex(c => c.uid === handCardUid);
    if (handIndex === -1) return { success: false, message: 'Lá bài không có trên tay!' };

    const card = duelist.hand[handIndex];
    if (card.def.cardType !== 'REACTION_SPELL' && card.def.cardType !== 'EQUIP_CATALYST' && card.def.cardType !== 'FIELD_ENVIRONMENT') {
      return { success: false, message: 'Lá bài này không phải thẻ Phép!' };
    }

    const isQuickPlay = card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL';

    // Master Rule Damage Step Restriction (Rulebook v10 tr. 43)
    if (this.currentDamageStepSubstep > 0) {
      const damageCheck = this.canActivateInDamageStep(card, this.currentDamageStepSubstep);
      if (!damageCheck.allowed) {
        return {
          success: false,
          message: `[Vi Phạm Damage Step - Rulebook v10 tr. 43] ${damageCheck.reason}`
        };
      }
    }

    // Master Rule (Rulebook v10 tr. 29): Quick-Play Spells vs Normal Spells from hand
    if (isQuickPlay) {
      // Rulebook v10 tr. 29: Cannot activate Quick-Play Spell from hand during opponent's turn! Must be Set first.
      if (this.activePlayerId !== duelistId) {
        return {
          success: false,
          message: 'Không thể kích hoạt Phép Tốc Độ (Quick-Play Spell) từ trên tay trong lượt của đối thủ (Rulebook v10 tr. 29)! Bạn phải Úp (Set) xuống sân từ trước.'
        };
      }
      // Quick-Play Spells can be activated during ANY phase of turn player's turn (Main, Battle, etc.)
    } else {
      // Normal Spell / Continuous Spell / Equip Spell / Field Spell can only be activated during own turn Main Phase 1 or 2
      if (this.activePlayerId !== duelistId) {
        return { success: false, message: 'Chỉ có thể kích hoạt thẻ Phép thường trong lượt của bạn!' };
      }
      if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
        return { success: false, message: 'Chỉ có thể kích hoạt thẻ Phép thường trong Main Phase 1 hoặc Main Phase 2!' };
      }
    }

    if (duelist.mana < card.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${card.def.manaCost} Mana (Có: ${duelist.mana}).` };
    }

    // Master Rule (Rulebook v10 tr. 29): Continuous Spells require an open S/T zone to remain face-up on field
    if (card.def.spellTrapSubtype === 'CONTINUOUS_SPELL') {
      const preferredSlot = typeof targetSlotIndexOrOptions === 'number'
        ? targetSlotIndexOrOptions
        : targetSlotIndexOrOptions?.targetSlotIndex;
      const targetStIndex = preferredSlot !== undefined && preferredSlot >= 0 && preferredSlot <= 4 && duelist.spellTrapZones[preferredSlot] === null
        ? preferredSlot
        : duelist.spellTrapZones.findIndex(z => z === null);
      if (targetStIndex === -1) {
        return { success: false, message: 'Hàng Phép/Bẫy của bạn đã đầy, không thể kích hoạt Phép Duy Trì (Continuous Spell)!' };
      }
      duelist.mana -= card.def.manaCost;
      duelist.hand.splice(handIndex, 1);
      duelist.spellTrapZones[targetStIndex] = {
        slotIndex: targetStIndex,
        card,
        isFaceUp: true,
        turnSet: this.currentTurn
      };
      this.pushChain(card, duelistId, card.def.spellSpeed || 1, undefined, `Kích hoạt Phép Duy Trì [${card.def.name}]`);
      this.resolveChain();
      return { success: true, message: `Kích hoạt Phép Duy Trì [${card.def.name}] thành công!` };
    }

    // Master Rule (Rulebook v10 tr. 28): Field Spell Activation from hand
    // "If you want to play a new Field Spell Card while you already control one, you can send the previous Field Spell Card to the Graveyard and play the new one. (This is not considered destroying the card.)"
    // Under Master Rule 2021 Update / Rulebook v10: Each player has their own independent Field Zone!
    if (card.def.cardType === 'FIELD_ENVIRONMENT') {
      if (duelist.fieldZone && duelist.fieldZone.uid !== card.uid) {
        const oldField = duelist.fieldZone;
        duelist.graveyard.push(oldField);
        duelist.fieldZone = null;
        this.addLog(
          duelist.name,
          `[Thay Thế Địa Bàn - Rulebook v10 tr. 28] Thẻ Địa Bàn cũ [${oldField.def.name}] được chuyển xuống Mộ Bài theo cơ chế trò chơi (không kích hoạt hiệu ứng bị tiêu diệt).`,
          'SPELL'
        );
      }
      duelist.mana -= card.def.manaCost;
      duelist.hand.splice(handIndex, 1);
      card.isFaceDown = false;
      duelist.fieldZone = card;

      this.pushChain(card, duelistId, card.def.spellSpeed || 1, targetSlotIndexOrOptions, `Kích hoạt Thẻ Địa Bàn [${card.def.name}]`);
      this.resolveChain();
      return { success: true, message: `Kích hoạt Thẻ Địa Bàn [${card.def.name}] thành công!` };
    }

    // Deduct mana & remove from hand
    duelist.mana -= card.def.manaCost;
    duelist.hand.splice(handIndex, 1);

    // Push to chain stack with Speed 2 for Quick-Play, Speed 1 for Normal
    const effectiveSpeed = card.def.spellSpeed || (isQuickPlay ? 2 : 1);
    this.pushChain(card, duelistId, effectiveSpeed, targetSlotIndexOrOptions, `Kích hoạt [${card.def.name}]`);

    // Event-Driven Auto Trap Reaction on Spell Activation (e.g. Le Chatelier Counter Trap, Cognitive Copper)
    this.checkAndAutoTriggerTraps({
      type: 'SPELL_ACTIVATED',
      actorPlayerId: duelistId,
      targetPlayerId: this.getOpponent(duelistId).id,
      sourceCard: card
    });

    // Auto resolve chain
    this.resolveChain();

    return { success: true, message: 'Kích hoạt phép thành công!' };
  }

  public activateSpellTrapFromField(
    duelistId: string,
    slotIndex: number,
    targetSlotIndexOrOptions?: number | {
      targetSlotIndex?: number;
      targetSlotIndices?: number[];
      targetRefs?: ChainTargetRef[];
      targetPlayerId?: string;
      requiresAllTargets?: boolean;
    }
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (slotIndex < 0 || slotIndex >= duelist.spellTrapZones.length) {
      return { success: false, message: 'Vị trí ô Phép/Bẫy không hợp lệ!' };
    }

    const slot = duelist.spellTrapZones[slotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không có lá bài nào tại ô Phép/Bẫy này!' };
    }

    const card = slot.card;
    const isTrap = card.def.cardType === 'TRAP';
    const isQuickPlay = card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL';

    // Master Rule Damage Step Restriction (Rulebook v10 tr. 43)
    if (this.currentDamageStepSubstep > 0) {
      const damageCheck = this.canActivateInDamageStep(card, this.currentDamageStepSubstep);
      if (!damageCheck.allowed) {
        return {
          success: false,
          message: `[Vi Phạm Damage Step - Rulebook v10 tr. 43] ${damageCheck.reason}`
        };
      }
    }

    // Trap & Quick-Play Spell cannot be activated on the same turn it was set (Rulebook v10 tr. 29)
    if ((isTrap || isQuickPlay) && slot.turnSet >= this.currentTurn) {
      return { 
        success: false, 
        message: isQuickPlay 
          ? 'Phép Tốc Độ (Quick-Play Spell) vừa đặt (Set) trong lượt này chưa thể kích hoạt (Rulebook v10 tr. 29)! Phải chờ sang lượt tiếp theo như Thẻ Bẫy.'
          : 'Bẫy vừa đặt trong lượt này chưa thể kích hoạt! Phải chờ sang lượt tiếp theo.' 
      };
    }

    // Normal spell can only be activated during own Main Phase
    if (!isTrap && !isQuickPlay) {
      if (this.activePlayerId !== duelistId) {
        return { success: false, message: 'Chỉ có thể kích hoạt thẻ Phép thường trong lượt của bạn!' };
      }
      if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
        return { success: false, message: 'Chỉ có thể kích hoạt thẻ Phép thường trong Main Phase 1 hoặc Main Phase 2!' };
      }
    }

    // Check mana cost
    if (duelist.mana < card.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${card.def.manaCost} Mana (Có: ${duelist.mana}).` };
    }

    // Deduct mana
    duelist.mana -= card.def.manaCost;

    // Flip face up
    slot.isFaceUp = true;

    // Remove from field spellTrapZones if normal spell or normal trap (Rulebook v10 tr. 29)
    if (
      card.def.cardType !== 'FIELD_ENVIRONMENT' &&
      card.def.spellTrapSubtype !== 'CONTINUOUS_TRAP' &&
      card.def.spellTrapSubtype !== 'CONTINUOUS_SPELL' &&
      card.def.cardType !== 'EQUIP_CATALYST' &&
      card.def.spellTrapSubtype !== 'EQUIP_SPELL'
    ) {
      duelist.spellTrapZones[slotIndex] = null;
    }

    this.addLog(
      duelist.name,
      `[Lật Ngửa Kích Hoạt] ${duelist.name} kích hoạt lá bài úp [${card.def.name}] từ ô ${slotIndex + 1}!`,
      isTrap ? 'TRAP' : 'SPELL'
    );

    // Push to chain stack with Speed 2 for Trap & Quick-Play, Speed 1 for Normal
    const effectiveSpeed = card.def.spellSpeed || (isTrap || isQuickPlay ? 2 : 1);
    this.pushChain(card, duelistId, effectiveSpeed, targetSlotIndexOrOptions, `Kích hoạt [${card.def.name}] từ sân`);

    // Auto resolve chain
    this.resolveChain();

    return { success: true, message: `Kích hoạt [${card.def.name}] thành công!` };
  }

  /**
   * Kích hoạt Thẻ Địa Bàn đang Úp (Face-Down) trong Khu Vực Địa Bàn (Field Zone)
   * Yu-Gi-Oh! Official Rulebook v10 tr. 28 & Master Rule 2021 Update:
   * "To activate a Field Spell Card, play it face-up in your Field Zone, or flip it face-up if it was already Set in your Field Zone."
   */
  public activateFieldSpellFromField(duelistId: string): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (!duelist.fieldZone) {
      return { success: false, message: 'Không có Thẻ Địa Bàn nào trong Khu Vực Địa Bàn (Field Zone)!' };
    }

    const card = duelist.fieldZone;
    if (!card.isFaceDown) {
      return { success: false, message: 'Thẻ Địa Bàn này đã được lật ngửa và đang hoạt động!' };
    }

    if (this.activePlayerId !== duelistId) {
      return { success: false, message: 'Chỉ có thể kích hoạt Thẻ Địa Bàn trong lượt của bạn (Rulebook v10 tr. 28)!' };
    }

    if (this.currentPhase !== 'MAIN_PHASE_1' && this.currentPhase !== 'MAIN_PHASE_2') {
      return { success: false, message: 'Chỉ có thể kích hoạt Thẻ Địa Bàn trong Main Phase 1 hoặc Main Phase 2!' };
    }

    if (duelist.mana < card.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${card.def.manaCost} Mana (Có: ${duelist.mana}).` };
    }

    duelist.mana -= card.def.manaCost;
    card.isFaceDown = false;

    this.addLog(
      duelist.name,
      `[Kích Hoạt Địa Bàn Từ Sân - Rulebook v10 tr. 28] ${duelist.name} lật ngửa và kích hoạt Thẻ Địa Bàn [${card.def.name}] trong Khu Vực Địa Bàn!`,
      'SPELL'
    );

    this.pushChain(card, duelistId, card.def.spellSpeed || 1, undefined, `Kích hoạt Thẻ Địa Bàn [${card.def.name}]`);
    this.resolveChain();

    return { success: true, message: `Kích hoạt Thẻ Địa Bàn [${card.def.name}] thành công!` };
  }

  /**
   * Tiêu diệt Thẻ Địa Bàn trong Field Zone bởi hiệu ứng bài (Rulebook v10 tr. 28)
   */
  public destroyFieldZoneCard(duelistId: string): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (!duelist.fieldZone) {
      return { success: false, message: 'Không có Thẻ Địa Bàn nào trong Field Zone!' };
    }
    const card = duelist.fieldZone;
    duelist.fieldZone = null;
    duelist.graveyard.push(card);
    this.addLog(
      duelist.name,
      `[TIÊU DIỆT ĐỊA BÀN - Rulebook v10 tr. 28] Thẻ Địa Bàn [${card.def.name}] bị tiêu diệt và gửi xuống Mộ Bài!`,
      'DAMAGE'
    );
    return { success: true, message: `Thẻ Địa Bàn [${card.def.name}] đã bị tiêu diệt!` };
  }

  // ==========================================
  // CHAIN / REACTION STACK (LIFO)
  // ==========================================
  public pushChain(
    cardInstance: CardInstance,
    activatorPlayerId: string,
    spellSpeed: 1 | 2 | 3,
    targetSlotIndexOrOptions?: number | {
      targetSlotIndex?: number;
      targetSlotIndices?: number[];
      targetRefs?: ChainTargetRef[];
      targetPlayerId?: string;
      requiresAllTargets?: boolean;
    },
    description: string = '',
    targetPlayerId?: string,
    effectPayload?: any
  ): { success: boolean; chainIndex?: number; message?: string } {
    if (!cardInstance || !cardInstance.def) {
      return { success: false, message: 'Thẻ không hợp lệ!' };
    }
    if (this.outcome !== 'IN_PROGRESS') {
      return { success: false, message: 'Trận đấu đã kết thúc!' };
    }

    // Master Rule Damage Step Restriction (Rulebook v10 tr. 43)
    if (this.currentDamageStepSubstep > 0) {
      const damageCheck = this.canActivateInDamageStep(cardInstance, this.currentDamageStepSubstep);
      if (!damageCheck.allowed) {
        const msg = `[Vi Phạm Damage Step - Rulebook v10 tr. 43] ${damageCheck.reason}`;
        this.addLog('SYSTEM', msg, 'CHAIN');
        return { success: false, message: msg };
      }
    }

    // Spell Speed Rule 1: Spell Speed 1 cannot chain to an existing link (must be Chain Link 1)
    if (this.chainStack.length > 0 && spellSpeed === 1) {
      const msg = `Quy tắc Spell Speed: Hiệu ứng Tốc độ 1 [${cardInstance.def.name}] không thể kích hoạt để phản ứng lại một chuỗi (Chain Link > 1)!`;
      this.addLog('SYSTEM', msg, 'CHAIN');
      return { success: false, message: msg };
    }

    // Spell Speed Rule 2: Cannot chain a lower Spell Speed to a higher Spell Speed
    if (this.chainStack.length > 0) {
      const topItem = this.chainStack[this.chainStack.length - 1];
      if (spellSpeed < topItem.spellSpeed) {
        const msg = `Quy tắc Spell Speed: Tốc độ ${spellSpeed} không thể phản ứng lại Tốc độ ${topItem.spellSpeed} ([${topItem.cardInstance.def.name}])!`;
        this.addLog('SYSTEM', msg, 'CHAIN');
        return { success: false, message: msg };
      }
    }

    let targetSlotIndex: number | undefined;
    let targetSlotIndices: number[] | undefined;
    let targetRefs: ChainTargetRef[] | undefined;
    let targetPlayer: string | undefined = targetPlayerId;
    let requiresAllTargets: boolean | undefined = cardInstance.def.requiresAllTargets;

    if (typeof targetSlotIndexOrOptions === 'object' && targetSlotIndexOrOptions !== null) {
      targetSlotIndex = targetSlotIndexOrOptions.targetSlotIndex;
      targetSlotIndices = targetSlotIndexOrOptions.targetSlotIndices;
      targetRefs = targetSlotIndexOrOptions.targetRefs;
      if (targetSlotIndexOrOptions.targetPlayerId) {
        targetPlayer = targetSlotIndexOrOptions.targetPlayerId;
      }
      if (targetSlotIndexOrOptions.requiresAllTargets !== undefined) {
        requiresAllTargets = targetSlotIndexOrOptions.requiresAllTargets;
      }
    } else if (typeof targetSlotIndexOrOptions === 'number') {
      targetSlotIndex = targetSlotIndexOrOptions;
    }

    // Auto-populate targetRefs if not explicitly provided
    if (!targetRefs) {
      const derivedRefs: ChainTargetRef[] = [];
      const activator = this.getDuelist(activatorPlayerId);
      const defaultOpponent = this.getOpponent(activatorPlayerId);

      if (targetSlotIndices && targetSlotIndices.length > 0) {
        for (const sIdx of targetSlotIndices) {
          const targetDuelist = targetPlayer 
            ? this.getDuelist(targetPlayer) 
            : (activator.monsterZones[sIdx]?.card ? activator : defaultOpponent);
          const slot = targetDuelist.monsterZones[sIdx];
          if (slot && slot.card) {
            derivedRefs.push({
              playerId: targetDuelist.id,
              zone: 'MONSTER',
              slotIndex: sIdx,
              cardUid: slot.card.uid,
              cardName: slot.card.def.name
            });
          }
        }
      } else if (targetSlotIndex !== undefined) {
        const targetDuelist = targetPlayer 
          ? this.getDuelist(targetPlayer) 
          : (activator.monsterZones[targetSlotIndex]?.card ? activator : defaultOpponent);
        const slot = targetDuelist.monsterZones[targetSlotIndex];
        if (slot && slot.card) {
          derivedRefs.push({
            playerId: targetDuelist.id,
            zone: 'MONSTER',
            slotIndex: targetSlotIndex,
            cardUid: slot.card.uid,
            cardName: slot.card.def.name
          });
        }
      }
      if (derivedRefs.length > 0) {
        targetRefs = derivedRefs;
      }
    }

    const chainIndex = this.chainStack.length + 1;
    const wasOnField = this.isContinuousCardFaceUpOnField(activatorPlayerId, cardInstance);
    this.chainStack.push({
      chainIndex,
      cardInstance,
      activatorPlayerId,
      spellSpeed,
      targetSlotIndex,
      targetSlotIndices,
      targetRefs,
      requiresAllTargets,
      targetPlayerId: targetPlayer,
      description,
      effectPayload,
      isNegated: false,
      wasOnField
    });

    const activator = this.getDuelist(activatorPlayerId);
    this.addLog(
      activator.name,
      `[Chain Link ${chainIndex}]: ${activator.name} kích hoạt [${cardInstance.def.name}] (Tốc độ ${spellSpeed}).`,
      'CHAIN'
    );

    // Rulebook v10 tr. 44-47: Fast Effect Timing Box E - Chain is active.
    // Reset consecutive passes and pass priority to the opponent to respond
    this.fastEffectTimingBox = 'BOX_E_CHAIN_RESOLUTION';
    this.consecutivePriorityPasses = 0;
    this.priorityPlayerId = activatorPlayerId === 'player' ? 'opponent' : 'player';

    return { success: true, chainIndex };
  }

  /**
   * Xác thực tính hợp lệ của các mục tiêu được nhắm chọn trong chuỗi phản ứng (Rulebook v10 tr. 48-49 & 54)
   * - Nếu mục tiêu còn tồn tại trên sân: hợp lệ.
   * - Nếu mục tiêu đã rời sân hoặc không còn hợp lệ:
   *   + Nếu lá bài yêu cầu TẤT CẢ/CẢ HAI mục tiêu (requiresAllTargets: true): Toàn bộ hiệu ứng bị vô hiệu hóa (Resolves without effect).
   *   + Nếu không yêu cầu nghiêm ngặt (mặc định): Hiệu ứng tiếp tục áp dụng tối đa lên các mục tiêu còn lại ("resolves as much as possible").
   *   + Nếu tất cả mục tiêu đều mất: Toàn bộ hiệu ứng bị vô hiệu hóa (Resolves without effect).
   */
  public validateChainTargets(item: ChainItem): ChainTargetValidationResult {
    // If the card targets a column, is a field spell, or is a continuous card, it does not require a single monster target
    if (
      item.cardInstance?.def?.effectCode === 'SPELL_SPECTROPHOTOMETER_LASER_COLLIMATOR' ||
      item.cardInstance?.def?.spellTrapSubtype === 'CONTINUOUS_SPELL' ||
      item.cardInstance?.def?.spellTrapSubtype === 'CONTINUOUS_TRAP' ||
      item.cardInstance?.def?.cardType === 'FIELD_ENVIRONMENT'
    ) {
      return { canResolve: true, validTargets: [], missingTargets: [], isFullFizzle: false };
    }

    // If no explicit targetRefs, evaluate targetSlotIndex
    if (!item.targetRefs || item.targetRefs.length === 0) {
      if (item.targetSlotIndex !== undefined) {
        const activator = this.getDuelist(item.activatorPlayerId);
        const opponent = this.getOpponent(item.activatorPlayerId);
        const targetDuelist = item.targetPlayerId
          ? this.getDuelist(item.targetPlayerId)
          : (activator.monsterZones[item.targetSlotIndex]?.card ? activator : opponent);
        const slot = targetDuelist.monsterZones[item.targetSlotIndex];
        if (slot && slot.card) {
          return {
            canResolve: true,
            validTargets: [{
              playerId: targetDuelist.id,
              zone: 'MONSTER',
              slotIndex: item.targetSlotIndex,
              cardUid: slot.card.uid,
              cardName: slot.card.def.name
            }],
            missingTargets: [],
            isFullFizzle: false
          };
        } else {
          return {
            canResolve: false,
            validTargets: [],
            missingTargets: [{
              playerId: targetDuelist.id,
              zone: 'MONSTER',
              slotIndex: item.targetSlotIndex,
              cardUid: '',
              cardName: `Mục tiêu ô ${item.targetSlotIndex + 1}`
            }],
            isFullFizzle: true,
            message: `Mục tiêu tại ô quái thú ${item.targetSlotIndex + 1} của ${targetDuelist.name} không còn tồn tại trên sân.`
          };
        }
      }
      return { canResolve: true, validTargets: [], missingTargets: [], isFullFizzle: false };
    }

    const validTargets: ChainTargetRef[] = [];
    const missingTargets: ChainTargetRef[] = [];

    for (const ref of item.targetRefs) {
      const duelist = this.getDuelist(ref.playerId);
      let isValid = false;
      if (ref.zone === 'MONSTER') {
        if (ref.slotIndex !== undefined && duelist.monsterZones[ref.slotIndex]?.card?.uid === ref.cardUid) {
          isValid = true;
        } else if (duelist.monsterZones.some(s => s && s.card && s.card.uid === ref.cardUid)) {
          isValid = true;
        }
      } else if (ref.zone === 'SPELL_TRAP') {
        if (ref.slotIndex !== undefined && duelist.spellTrapZones[ref.slotIndex]?.card?.uid === ref.cardUid) {
          isValid = true;
        } else if (duelist.spellTrapZones.some(s => s && s.card && s.card.uid === ref.cardUid)) {
          isValid = true;
        }
      } else if (ref.zone === 'FIELD') {
        if (duelist.fieldZone && duelist.fieldZone.uid === ref.cardUid) {
          isValid = true;
        }
      }

      if (isValid) {
        validTargets.push(ref);
      } else {
        missingTargets.push(ref);
      }
    }

    const requiresAll = item.requiresAllTargets ?? Boolean(item.cardInstance.def.requiresAllTargets);

    if (requiresAll && missingTargets.length > 0) {
      return {
        canResolve: false,
        validTargets,
        missingTargets,
        isFullFizzle: true,
        message: `Hiệu ứng [${item.cardInstance.def.name}] bắt buộc TẤT CẢ (${item.targetRefs.length}) mục tiêu hợp lệ (Both/All Targets Invariant - Rulebook v10 tr. 48-49 & 54)! Do ${missingTargets.map(m => m.cardName || m.cardUid).join(', ')} đã rời sân, toàn bộ hiệu ứng không thể áp dụng.`
      };
    }

    if (validTargets.length === 0 && item.targetRefs.length > 0) {
      return {
        canResolve: false,
        validTargets: [],
        missingTargets,
        isFullFizzle: true,
        message: `Tất cả mục tiêu của [${item.cardInstance.def.name}] đã rời sân hoặc không còn hợp lệ tại thời điểm giải quyết chuỗi (Rulebook v10 tr. 48-49).`
      };
    }

    return {
      canResolve: true,
      validTargets,
      missingTargets,
      isFullFizzle: false,
      message: missingTargets.length > 0
        ? `Một phần mục tiêu (${missingTargets.map(m => m.cardName || m.cardUid).join(', ')}) đã rời sân! Hiệu ứng tiếp tục áp dụng lên ${validTargets.length} mục tiêu còn lại: ${validTargets.map(v => v.cardName).join(', ')} (Rulebook v10 tr. 48-49).`
        : undefined
    };
  }

  public resolveChain() {
    if (this.chainStack.length === 0) return;

    // Capture snapshot of the chain before popping in LIFO order
    const chainSnapshot: ResolvedChainItem[] = this.chainStack.map(item => {
      const activator = this.getDuelist(item.activatorPlayerId);
      return {
        chainIndex: item.chainIndex,
        cardName: item.cardInstance.def.name,
        chemicalFormula: item.cardInstance.def.chemicalFormula,
        activatorPlayerId: item.activatorPlayerId,
        activatorName: activator.name,
        spellSpeed: item.spellSpeed,
        isNegated: Boolean(item.isNegated),
        description: item.description
      };
    });

    this.lastResolvedChain = {
      items: chainSnapshot,
      timestamp: Date.now()
    };

    this.addLog('SYSTEM', `Bắt đầu giải quyết Chuỗi Phản Ứng (Chain Resolution - LIFO)...`, 'CHAIN');

    // Resolve backwards (LIFO)
    while (this.chainStack.length > 0) {
      const item = this.chainStack.pop()!;
      if (item.isNegated) {
        this.addLog(
          'SYSTEM',
          `[Chain Link ${item.chainIndex}]: Hiệu ứng của [${item.cardInstance.def.name}] đã bị vô hiệu hóa! Không có tác dụng.`,
          'CHAIN'
        );
        // Master Rule: Negated Continuous Spell/Trap activation is sent to Graveyard (Rulebook v10 tr. 29)
        const activator = this.getDuelist(item.activatorPlayerId);
        if (item.isReturnedToDeck) {
          // Rulebook v10 tr. 44-47: Already returned/shuffled back into Deck by Counter Trap, do not send to GY
        } else if (item.cardInstance.def.spellTrapSubtype === 'CONTINUOUS_SPELL' || item.cardInstance.def.spellTrapSubtype === 'CONTINUOUS_TRAP') {
          const stIdx = activator.spellTrapZones.findIndex(s => s && s.card && s.card.uid === item.cardInstance.uid);
          if (stIdx !== -1) {
            activator.spellTrapZones[stIdx] = null;
          }
          activator.graveyard.push(item.cardInstance);
        } else if (item.cardInstance.def.cardType !== 'FIELD_ENVIRONMENT') {
          activator.graveyard.push(item.cardInstance);
        }
      } else {
        const card = item.cardInstance;
        // Master Rule (Rulebook v10 tr. 28-29): Continuous Spell/Trap, Field Spell, and Equip Cards Must Remain Face-Up on Field to Resolve
        const isContinuous = card.def.spellTrapSubtype === 'CONTINUOUS_SPELL' ||
                             card.def.spellTrapSubtype === 'CONTINUOUS_TRAP' ||
                             card.def.cardType === 'FIELD_ENVIRONMENT' ||
                             card.def.cardType === 'EQUIP_CATALYST' ||
                             card.def.spellTrapSubtype === 'EQUIP_SPELL';

        if (isContinuous && item.wasOnField && !this.isContinuousCardFaceUpOnField(item.activatorPlayerId, card)) {
          this.addLog(
            'SYSTEM',
            `[Quy Tắc Thẻ Duy Trì/Địa Bàn - Rulebook v10 tr. 28-29] Thẻ Duy Trì/Địa Bàn [${card.def.name}] không còn ngửa mặt trên sân tại thời điểm giải quyết Chain Link ${item.chainIndex}! Hiệu ứng không thể kích hoạt (Fizzle).`,
            'CHAIN'
          );
          continue;
        }

        // Master Rule (Rulebook v10 tr. 48-49 & 54): Target Validation at Resolution Time
        const targetValidation = this.validateChainTargets(item);
        if (!targetValidation.canResolve) {
          this.addLog(
            'SYSTEM',
            `[Quy Tắc Mục Tiêu Chuỗi - Rulebook v10 tr. 48-49 & 54] ${targetValidation.message} -> Hiệu ứng của [${card.def.name}] không thể áp dụng (Resolves without effect)!`,
            'CHAIN'
          );
          this.recordGameEvent(
            'EFFECT_RESOLVED_WITHOUT_EFFECT',
            item.cardInstance,
            item.activatorPlayerId,
            {
              chainIndex: item.chainIndex,
              reason: targetValidation.isFullFizzle
                ? (item.requiresAllTargets ? 'MISSING_REQUIRED_ALL_TARGETS' : 'ALL_TARGETS_DISAPPEARED')
                : 'INVALID_TARGET',
              missingTargets: targetValidation.missingTargets
            },
            item.chainIndex
          );
          // Normal/Quick-play/Equip spell or Normal trap that fizzles goes to Graveyard (Rulebook v10 tr. 28-29 & 48-49)
          const isTrueContinuous = card.def.spellTrapSubtype === 'CONTINUOUS_SPELL' || card.def.spellTrapSubtype === 'CONTINUOUS_TRAP';
          if (!isTrueContinuous && card.def.cardType !== 'FIELD_ENVIRONMENT') {
            const activator = this.getDuelist(item.activatorPlayerId);
            if (!activator.graveyard.some(c => c.uid === card.uid)) {
              activator.graveyard.push(card);
            }
          }
          continue;
        } else if (targetValidation.missingTargets.length > 0) {
          this.addLog(
            'SYSTEM',
            `[Quy Tắc Mục Tiêu Chuỗi - Rulebook v10 tr. 48-49] ${targetValidation.message}`,
            'CHAIN'
          );
          this.recordGameEvent(
            'CHAIN_TARGET_PARTIAL_APPLIED',
            item.cardInstance,
            item.activatorPlayerId,
            {
              chainIndex: item.chainIndex,
              validTargets: targetValidation.validTargets,
              missingTargets: targetValidation.missingTargets
            },
            item.chainIndex
          );
        }

        this.executeCardEffect(item);
        this.recordGameEvent('CHAIN_LINK_RESOLVED', item.cardInstance, item.activatorPlayerId, { chainIndex: item.chainIndex, description: item.description }, item.chainIndex);

        // Rulebook v10 tr. 50: Sequential Chain Damage Check
        // If LP reaches 0 mid-chain, the duel ends immediately; remaining chain links do NOT resolve!
        this.checkWinConditions();
        if (this.outcome !== 'IN_PROGRESS') {
          this.addLog(
            'SYSTEM',
            `[Kết Thúc Trận Đấu Giữa Chuỗi - Rulebook v10 tr. 50] Điểm gốc đã chạm 0 tại Chain Link ${item.chainIndex}! Trận đấu kết thúc ngay lập tức, các mắt xích còn lại trong chuỗi bị hủy bỏ.`,
            'CHAIN'
          );
          this.chainStack = [];
          break;
        }
      }
    }

    this.checkWinConditions();
    this.fastEffectTimingBox = 'BOX_A_OPEN_GAME_STATE';
    this.priorityPlayerId = this.activePlayerId;
    this.consecutivePriorityPasses = 0;
  }

  // ==========================================
  // FAST EFFECT TIMING & PRIORITY PROTOCOL (Rulebook v10 tr. 44-47)
  // ==========================================
  public triggerFastEffectWindow(actionDescription: string): { triggerOccurred: boolean; priorityPlayerId: string } {
    // Transition to Box B (Action Trigger Check) -> Box C (Turn Player Fast Effect Priority)
    this.fastEffectTimingBox = 'BOX_C_TURN_PLAYER_FAST';
    this.priorityPlayerId = this.activePlayerId;
    this.consecutivePriorityPasses = 0;
    this.addLog(
      'SYSTEM',
      `[Fast Effect Timing Chart - Rulebook v10 tr. 44-45] Cửa sổ kích hoạt hiệu ứng nhanh sau hành động "${actionDescription}": Quyền ưu tiên kích hoạt (Priority) thuộc về người chơi theo lượt (${this.getDuelist(this.activePlayerId).name}).`,
      'INFO'
    );
    return { triggerOccurred: true, priorityPlayerId: this.priorityPlayerId };
  }

  public passPriority(duelistId: string): { chainResolved: boolean; nextPriorityPlayerId: string; message: string } {
    if (this.outcome !== 'IN_PROGRESS') {
      return { chainResolved: false, nextPriorityPlayerId: this.priorityPlayerId, message: 'Trận đấu đã kết thúc!' };
    }

    if (duelistId !== this.priorityPlayerId) {
      const msg = `[Quy Tắc Quyền Ưu Tiên - Rulebook v10 tr. 44-47] Không phải lượt ưu tiên của ${this.getDuelist(duelistId).name}! Quyền ưu tiên hiện tại thuộc về ${this.getDuelist(this.priorityPlayerId).name}.`;
      this.addLog('SYSTEM', msg, 'INFO');
      return { chainResolved: false, nextPriorityPlayerId: this.priorityPlayerId, message: msg };
    }

    this.consecutivePriorityPasses++;
    const passingDuelist = this.getDuelist(duelistId);
    const opponentId = duelistId === 'player' ? 'opponent' : 'player';
    const nextDuelist = this.getDuelist(opponentId);

    // Case 1: In BOX_C (Turn Player Fast Effect window)
    if (this.fastEffectTimingBox === 'BOX_C_TURN_PLAYER_FAST') {
      this.fastEffectTimingBox = 'BOX_D_OPPONENT_FAST';
      this.priorityPlayerId = opponentId;
      const msg = `[Fast Effect Timing - Box C → Box D] ${passingDuelist.name} nhường quyền ưu tiên (Pass Priority). Quyền kích hoạt Fast Effect chuyển sang ${nextDuelist.name}.`;
      this.addLog('SYSTEM', msg, 'INFO');
      return { chainResolved: false, nextPriorityPlayerId: opponentId, message: msg };
    }

    // Case 2: In BOX_D (Opponent Fast Effect window)
    if (this.fastEffectTimingBox === 'BOX_D_OPPONENT_FAST') {
      // Both players have passed without activating a fast effect -> return to Open Game State (Box A)
      this.fastEffectTimingBox = 'BOX_A_OPEN_GAME_STATE';
      this.priorityPlayerId = this.activePlayerId;
      this.consecutivePriorityPasses = 0;
      const msg = `[Fast Effect Timing - Box D → Box A] Cả hai người chơi đều không kích hoạt Fast Effect. Trạng thái quay trở lại Bàn cờ Mở (Open Game State - Box A) với quyền ưu tiên thuộc về người chơi theo lượt (${this.getDuelist(this.activePlayerId).name}).`;
      this.addLog('SYSTEM', msg, 'INFO');
      return { chainResolved: false, nextPriorityPlayerId: this.activePlayerId, message: msg };
    }

    // Case 3: In BOX_E (Chain Resolution - Box E)
    if (this.fastEffectTimingBox === 'BOX_E_CHAIN_RESOLUTION') {
      if (this.consecutivePriorityPasses >= 2) {
        // Both players consecutively passed priority on the chain stack -> automatically resolve the chain!
        const msg = `[Fast Effect Timing - Box E Resolution] Cả hai người chơi đều nhường quyền ưu tiên liên tiếp (consecutive priority passes = 2). Chuỗi mắt xích bắt đầu giải quyết theo thứ tự LIFO!`;
        this.addLog('SYSTEM', msg, 'CHAIN');
        this.resolveChain();
        return { chainResolved: true, nextPriorityPlayerId: this.activePlayerId, message: msg };
      } else {
        // Switch priority to the other player on the chain
        this.priorityPlayerId = opponentId;
        const msg = `[Fast Effect Timing - Box E Priority] ${passingDuelist.name} nhường quyền ưu tiên trên chuỗi. Quyền kích hoạt chuỗi tiếp theo chuyển sang ${nextDuelist.name}.`;
        this.addLog('SYSTEM', msg, 'CHAIN');
        return { chainResolved: false, nextPriorityPlayerId: opponentId, message: msg };
      }
    }

    // Default Case (e.g. In BOX_A)
    this.priorityPlayerId = opponentId;
    return { chainResolved: false, nextPriorityPlayerId: opponentId, message: `${passingDuelist.name} nhường quyền ưu tiên.` };
  }

  public getEligibleFastEffects(duelistId: string): CardInstance[] {
    const duelist = this.getDuelist(duelistId);
    const eligible: CardInstance[] = [];

    // Current top spell speed requirement if chain exists
    const topSpellSpeed = this.chainStack.length > 0
      ? this.chainStack[this.chainStack.length - 1].spellSpeed
      : 2; // Default minimum fast effect speed is 2

    // 1. Spells/Traps set on field
    for (const slot of duelist.spellTrapZones) {
      if (slot && slot.card) {
        const card = slot.card;
        const speed = card.def.spellSpeed || (card.def.spellTrapSubtype === 'COUNTER_TRAP' ? 3 : 2);
        // Traps or Quick-Play Spells set previously
        if (card.def.cardType === 'TRAP' || card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL') {
          // If a chain exists, must meet or exceed top spell speed; if top is 3, only 3 can respond
          if (speed >= topSpellSpeed) {
            eligible.push(card);
          }
        }
      }
    }

    // 2. Quick-Play Spells in hand (only turn player can activate Quick-Play Spells directly from hand, Rulebook v10 tr. 28)
    if (duelistId === this.activePlayerId) {
      for (const card of duelist.hand) {
        if (card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL') {
          const speed = card.def.spellSpeed || 2;
          if (speed >= topSpellSpeed) {
            eligible.push(card);
          }
        }
      }
    }

    return eligible;
  }

  /**
   * Autonomous AI Fast Effect Evaluation & Priority Response (Yu-Gi-Oh! Rulebook v10 tr. 44-47)
   * When priority passes to the opponent AI during Fast Effect Windows (Box B/C/D) or Chain Resolution (Box E),
   * the AI scans eligible fast effects, filters out cognitive traps, and either chains a card or passes priority.
   */
  public aiEvaluateAndRespondPriority(): { actionTaken: 'CHAINED' | 'PASSED'; message: string } {
    if (this.priorityPlayerId !== 'opponent' || this.outcome !== 'IN_PROGRESS') {
      return { actionTaken: 'PASSED', message: 'Không phải lượt ưu tiên của đối thủ AI.' };
    }

    const eligible = this.getEligibleFastEffects('opponent');
    if (eligible.length === 0) {
      const res = this.passPriority('opponent');
      return { actionTaken: 'PASSED', message: res.message };
    }

    // Filter out cognitive trap blunders (e.g. Cu + HCl, Au + O2, etc.)
    const validCard = eligible.find(card => {
      const id = card.def.id;
      if (id.includes('trap_cognitive_cu_hcl') || id.includes('trap_cognitive_au') || id.includes('cognitive_trap')) {
        return false;
      }
      return true;
    });

    if (validCard) {
      const duelist = this.opponent;
      const slotIndex = duelist.spellTrapZones.findIndex(s => s && s.card && s.card.uid === validCard.uid);
      if (slotIndex !== -1) {
        const speed = validCard.def.spellSpeed || (validCard.def.spellTrapSubtype === 'COUNTER_TRAP' ? 3 : 2);
        const pushRes = this.pushChain(
          validCard,
          'opponent',
          speed,
          undefined,
          `[Phản Ứng Chuỗi AI] ${validCard.def.name}`
        );
        if (pushRes.success) {
          const slot = duelist.spellTrapZones[slotIndex];
          if (slot) {
            slot.isFaceUp = true;
            if (validCard.def.spellTrapSubtype !== 'CONTINUOUS_TRAP' && validCard.def.spellTrapSubtype !== 'CONTINUOUS_SPELL') {
              duelist.spellTrapZones[slotIndex] = null;
            }
          }
          return {
            actionTaken: 'CHAINED',
            message: `Đối thủ AI kích hoạt [${validCard.def.name}] vào Chuỗi Link ${pushRes.chainIndex}!`
          };
        }
      }
    }

    // Default: AI passes priority
    const res = this.passPriority('opponent');
    return { actionTaken: 'PASSED', message: res.message };
  }

  private executeCardEffect(item: ChainItem) {
    const activator = this.getDuelist(item.activatorPlayerId);
    const opponent = this.getOpponent(item.activatorPlayerId);
    const card = item.cardInstance;

    this.addLog(activator.name, `Giải quyết [Chain Link ${item.chainIndex}]: [${card.def.name}] có hiệu lực!`, 'CHAIN');

    // Field Environment Placement: activated field card becomes the active face-up card in Field Zone
    if (card.def.cardType === 'FIELD_ENVIRONMENT') {
      activator.fieldZone = card;
      card.isFaceDown = false;
    }

    // Structured Machine-Readable Effect Dispatch (Master Rule Opcode Resolution)
    if (card.def.structuredEffects && card.def.structuredEffects.length > 0) {
      for (const eff of card.def.structuredEffects) {
        const structRes = executeStructuredEffect(this, item.activatorPlayerId, item, eff);
        for (const log of structRes.logs) {
          if (log.status === 'SUCCESS') {
            this.addLog(activator.name, `[Hiệu Ứng Cấu Trúc: ${eff.effectId}] ${log.description}`, 'INFO');
          }
        }
      }
    }

    switch (card.def.effectCode) {
      case 'SPELL_EXO_BURST': {
        // Deal 900 damage if controlling Pyro
        const hasPyro = activator.monsterZones.some(s => s && s.card && s.card.def.attribute === 'PYRO');
        const dmg = hasPyro ? 900 : 450;
        opponent.lp = Math.max(0, opponent.lp - dmg);
        this.addLog(activator.name, `[Bộc Phát Tỏa Nhiệt] Gây ${dmg} LP sát thương trực tiếp lên ${opponent.name}! (Còn ${opponent.lp} LP)`, 'DAMAGE');
        break;
      }
      case 'SPELL_DRAW_2': {
        this.drawCard(item.activatorPlayerId);
        this.drawCard(item.activatorPlayerId);
        this.addLog(activator.name, `[Quang Phổ Khối] Phân tích cấu trúc thành công, rút 2 lá bài!`, 'INFO');
        break;
      }
      case 'SPELL_SUPERCRITICAL_EXTRACTION': {
        const banishRes = this.banishTopCardsFromDeck(item.activatorPlayerId, 3, true);
        const c1 = this.drawCard(item.activatorPlayerId);
        const c2 = this.drawCard(item.activatorPlayerId);
        this.addLog(
          activator.name,
          `[Chiết Xuất Siêu Tới Hạn CO₂ - Rulebook v10 tr. 55] Trục xuất úp mặt ${banishRes.count} lá bài từ đỉnh bộ bài! Rút thành công 2 lá bài mới (${c1 ? c1.def.name : 'Trống'}, ${c2 ? c2.def.name : 'Trống'}).`,
          'CHEMICAL_REACTION',
          card.def.scientificLore
        );
        break;
      }
      case 'SPELL_NOBLE_CONTAINMENT_GRID': {
        const opponent = this.getOpponent(item.activatorPlayerId);
        this.addLingeringEffect(opponent.id, {
          sourceCardUid: card.uid,
          sourceCardName: card.def.name,
          targetPlayerId: opponent.id,
          effectType: 'ATTACK_PROHIBITION',
          durationTurns: 2,
          turnActivated: this.currentTurn,
          expiresAt: 'CUSTOM_TURNS',
          description: `Đối thủ bị phong tỏa tuyên bố tấn công trong 2 lượt (Rulebook v10 tr. 54).`,
          payload: { turnsRemaining: 2 }
        });
        this.addLog(
          activator.name,
          `[Lưới Khí Trơ Phong Tỏa - Rulebook v10 tr. 54] Thiết lập màng đệm khí hiếm Xe/Rn! ${opponent.name} bị phong tỏa không thể tuyên bố tấn công trong 2 lượt tới.`,
          'CHEMICAL_REACTION',
          card.def.scientificLore
        );
        break;
      }
      case 'SPELL_CENTRIFUGE_CRYSTALLIZATION': {
        const opponent = this.getOpponent(item.activatorPlayerId);
        let shiftedCount = 0;
        for (const slot of opponent.monsterZones) {
          if (slot && slot.card && slot.position === 'FACE_UP_ATTACK') {
            slot.position = 'FACE_UP_DEFENSE';
            slot.positionLockedUntilTurn = this.currentTurn + 2;
            shiftedCount++;
          }
        }
        if (opponent.extraMonsterZone && opponent.extraMonsterZone.card && opponent.extraMonsterZone.position === 'FACE_UP_ATTACK') {
          if (opponent.extraMonsterZone.card.def.cardType !== 'LINK_MONSTER') {
            opponent.extraMonsterZone.position = 'FACE_UP_DEFENSE';
            opponent.extraMonsterZone.positionLockedUntilTurn = this.currentTurn + 2;
            shiftedCount++;
          }
        }
        this.addLog(
          activator.name,
          `[Ly Tâm Kết Tinh Phân Lớp - Rulebook v10 tr. 24] Lực quán tính ly tâm ép ${shiftedCount} quái thú tấn công của ${opponent.name} sang tư thế Phòng Thủ Ngửa Mặt và khóa tư thế trong 2 lượt!`,
          'CHEMICAL_REACTION',
          card.def.scientificLore
        );
        break;
      }
      case 'SPELL_PHOTOLYSIS_TOKENS': {
        // Special Summon 2 Free Radical Tokens (Rulebook v10 tr. 48-49)
        this.summonToken(activator.id, {
          name: 'Token Gốc Hydroxyl ·OH',
          name_en: 'Hydroxyl Radical Token',
          atk: 500,
          def: 500,
          level: 1,
          attribute: 'AERO',
          chemicalFormula: '·OH',
          scientificLore: 'Gốc tự do hydroxyl mang electron độc thân, biến mất ngay sau khi rời sân.'
        }, 'FACE_UP_ATTACK');
        this.summonToken(activator.id, {
          name: 'Token Gốc Hydroxyl ·OH',
          name_en: 'Hydroxyl Radical Token',
          atk: 500,
          def: 500,
          level: 1,
          attribute: 'AERO',
          chemicalFormula: '·OH',
          scientificLore: 'Gốc tự do hydroxyl mang electron độc thân, biến mất ngay sau khi rời sân.'
        }, 'FACE_UP_DEFENSE');
        this.addLog(activator.name, `[Quang Phân Sinh Gốc]: Chiếu xạ UV tạo ra các gốc tự do Hydroxyl trên sân!`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'SPELL_NEUTRALIZE': {
        activator.lp = Math.min(activator.maxLp, activator.lp + 700);
        this.addLog(activator.name, `[Trung Hòa Axit - Bazơ] Phản ứng trung hòa giải phóng năng lượng hồi phục 700 LP (Hiện có: ${activator.lp} LP).`, 'INFO');
        break;
      }
      case 'SPELL_DUAL_ELECTROLYSIS': {
        const targetValidation = this.validateChainTargets(item);
        const targetsToApply = targetValidation.validTargets;
        for (const targetRef of targetsToApply) {
          const targetOwner = this.getDuelist(targetRef.playerId);
          const slot = targetOwner.monsterZones.find(s => s && s.card && s.card.uid === targetRef.cardUid);
          if (slot && slot.card) {
            const currentEffectiveAtk = Math.max(0, (slot.card.def.atk || 0) + (slot.tempAtkBoost || 0));
            if (currentEffectiveAtk <= 600) {
              this.addLog(
                activator.name,
                `[Điện Phân Lưỡng Cực Catot - Anot] Dòng điện phân ly hoàn toàn ion [${slot.card.def.name}] (ATK: ${currentEffectiveAtk} <= 600)! Quái thú bị hòa tan phá hủy và đưa xuống Mộ bài.`,
                'CHEMICAL_REACTION',
                card.def.scientificLore
              );
              const destroyedCard = slot.card;
              targetOwner.monsterZones[slot.slotIndex] = null;
              targetOwner.graveyard.push(destroyedCard);
              this.recordGameEvent('MONSTER_DESTROYED_BY_EFFECT', destroyedCard, targetOwner.id, {
                reason: 'ELECTROLYSIS_DISSOLUTION',
                sourceCardUid: card.uid
              });
            } else {
              slot.tempAtkBoost = (slot.tempAtkBoost || 0) - 600;
              this.addLog(
                activator.name,
                `[Điện Phân Lưỡng Cực Catot - Anot] Phân cực dòng ion làm suy giảm 600 ATK của [${slot.card.def.name}] (ATK hiện tại: ${(slot.card.def.atk || 0) + slot.tempAtkBoost})!`,
                'CHEMICAL_REACTION',
                card.def.scientificLore
              );
              this.recordGameEvent('MONSTER_ATK_MODIFIED', slot.card, targetOwner.id, {
                modifier: -600,
                newAtk: (slot.card.def.atk || 0) + slot.tempAtkBoost,
                sourceCardUid: card.uid
              });
            }
          }
        }
        break;
      }
      case 'SPELL_REDOX_COUPLING': {
        const targetValidation = this.validateChainTargets(item);
        if (!targetValidation.canResolve) break;

        const friendlyRef = targetValidation.validTargets.find(t => t.playerId === activator.id);
        const opponentRef = targetValidation.validTargets.find(t => t.playerId === opponent.id);

        if (friendlyRef && opponentRef) {
          const friendlySlot = activator.monsterZones.find(s => s && s.card && s.card.uid === friendlyRef.cardUid);
          if (friendlySlot && friendlySlot.card) {
            friendlySlot.tempAtkBoost = (friendlySlot.tempAtkBoost || 0) + 600;
            this.addLog(
              activator.name,
              `[Ghép Đôi Phản Ứng Oxy Hóa - Khử] Bán phản ứng khử tiếp nhận electron thành công: [${friendlySlot.card.def.name}] nhận thêm +600 ATK!`,
              'CHEMICAL_REACTION',
              card.def.scientificLore
            );
            this.recordGameEvent('MONSTER_ATK_MODIFIED', friendlySlot.card, activator.id, {
              modifier: 600,
              newAtk: (friendlySlot.card.def.atk || 0) + friendlySlot.tempAtkBoost,
              sourceCardUid: card.uid
            });
          }
          opponent.lp = Math.max(0, opponent.lp - 800);
          this.addLog(
            activator.name,
            `[Ghép Đôi Phản Ứng Oxy Hóa - Khử] Nhiệt lượng tỏa ra từ phản ứng oxy hóa - khử (ΔH° < 0) gây 800 LP sát thương trực tiếp lên ${opponent.name}! (Còn ${opponent.lp} LP)`,
            'DAMAGE',
            card.def.scientificLore
          );
          this.recordGameEvent('EFFECT_DAMAGE_DEALT', card, activator.id, {
            damage: 800,
            targetPlayerId: opponent.id,
            remainingLp: opponent.lp
          });
        }
        break;
      }
      case 'SPELL_QUICK_ATK_SURGE': {
        // Target monster slot or highest ATK monster
        let targetSlot: MonsterZoneSlot | null = null;
        if (item.targetSlotIndex !== undefined && item.targetSlotIndex >= 0 && item.targetSlotIndex < activator.monsterZones.length) {
          targetSlot = activator.monsterZones[item.targetSlotIndex];
        }
        if (!targetSlot || !targetSlot.card) {
          // Find first available or highest ATK monster
          const activeSlots = activator.monsterZones.filter((s): s is MonsterZoneSlot => s !== null && s.card !== null);
          if (activeSlots.length > 0) {
            targetSlot = activeSlots.reduce((max, curr) => 
              ((curr.card?.def.atk || 0) + curr.tempAtkBoost > (max.card?.def.atk || 0) + max.tempAtkBoost) ? curr : max
            );
          }
        }
        if (targetSlot && targetSlot.card) {
          targetSlot.tempAtkBoost += 800;
          this.addLog(
            activator.name,
            `[Xung Lực Nhiệt Nhôm Cấp Tốc] Nhiệt nhôm bùng nổ tức thời (ΔH° = -851.5 kJ/mol)! Quái thú [${targetSlot.card.def.name}] được tăng +800 ATK trong lượt này!`,
            'SPELL',
            '2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l)'
          );
        }
        break;
      }
      case 'SPELL_MUTUAL_DETONATION': {
        const dmg = 1500;
        activator.lp = Math.max(0, activator.lp - dmg);
        opponent.lp = Math.max(0, opponent.lp - dmg);
        this.addLog(
          activator.name,
          `[Sóng Nổ Nitroglycerin Siêu Tới Hạn] Phản ứng nhiệt phân đẳng tích cực mạnh (4C₃H₅(NO₃)₃ → 12CO₂ + 10H₂O + 6N₂ + O₂)! Cả ${activator.name} và ${opponent.name} cùng nhận ${dmg} LP sát thương nổ!`,
          'DAMAGE',
          '4C3H5(NO3)3(l) -> 12CO2(g) + 10H2O(g) + 6N2(g) + O2(g) (ΔH° cực âm)'
        );
        break;
      }
      case 'SPELL_DISPLACEMENT': {
        // Destroy 1 opponent monster with lowest ATK
        let lowestSlot: MonsterZoneSlot | null = null;
        let lowestAtk = 99999;
        for (const s of opponent.monsterZones) {
          if (s && s.card && (s.card.def.atk || 0) < lowestAtk) {
            lowestAtk = s.card.def.atk || 0;
            lowestSlot = s;
          }
        }
        if (lowestSlot && lowestSlot.card) {
          this.addLog(activator.name, `[Phản Ứng Thế] Đẩy kim loại [${lowestSlot.card.def.name}] ra khỏi dung dịch và tiêu diệt!`, 'CHEMICAL_REACTION');
          opponent.graveyard.push(lowestSlot.card);
          opponent.monsterZones[lowestSlot.slotIndex] = null;
        }
        break;
      }
      case 'SPELL_BUNSEN_EQUIP': {
        if (item.targetSlotIndex !== undefined) {
          const slot = activator.monsterZones[item.targetSlotIndex];
          if (slot && slot.card) {
            slot.tempAtkBoost += 600;
            slot.card.def.attribute = 'PYRO';
            this.addLog(activator.name, `[Đèn Khí Bunsen] Gia nhiệt tăng 600 ATK và chuyển thuộc tính PYRO cho [${slot.card.def.name}]!`, 'INFO');
          }
        }
        break;
      }
      case 'TRAP_LE_CHATELIER_COUNTER': {
        // Rulebook v10 tr. 44-47: Spell Speed 3 Counter Trap negates preceding chain link activation and shuffles it back to Deck
        if (this.chainStack.length > 0) {
          const targetItem = this.chainStack[this.chainStack.length - 1];
          targetItem.isNegated = true;
          targetItem.isReturnedToDeck = true;
          const targetCard = targetItem.cardInstance;
          const targetOwner = this.getDuelist(targetItem.activatorPlayerId);
          // Remove from Spell/Trap zone if placed on field
          const stIdx = targetOwner.spellTrapZones.findIndex(s => s && s.card && s.card.uid === targetCard.uid);
          if (stIdx !== -1) {
            targetOwner.spellTrapZones[stIdx] = null;
          }
          // Remove from monster zone if placed on field
          const mIdx = targetOwner.monsterZones.findIndex(m => m && m.card && m.card.uid === targetCard.uid);
          if (mIdx !== -1) {
            targetOwner.monsterZones[mIdx] = null;
          }
          // Remove from graveyard if present
          targetOwner.graveyard = targetOwner.graveyard.filter(c => c.uid !== targetCard.uid);
          // Return to deck
          targetOwner.deck.push(targetCard);
          this.addLog(
            activator.name,
            `[Bẫy Phản Kháng Le Chatelier (Tốc độ 3)]: Vô hiệu hóa kích hoạt của [Chain Link ${targetItem.chainIndex}: ${targetItem.cardInstance.def.name}] và hoàn trả lá bài này về Bộ bài!`,
            'TRAP',
            card.def.scientificLore
          );
        } else {
          this.addLog(
            activator.name,
            `[Bẫy Phản Kháng Le Chatelier]: Không có hiệu ứng nào trên chuỗi phản ứng để vô hiệu hóa!`,
            'TRAP'
          );
        }
        break;
      }
      case 'TRAP_GALVANIC_COUNTER': {
        // Spell Speed 3 Counter Trap negates preceding chain link and deals 600 damage (Rulebook v10 tr. 43)
        if (this.chainStack.length > 0) {
          const targetItem = this.chainStack[this.chainStack.length - 1];
          targetItem.isNegated = true;
          this.addLog(
            activator.name,
            `[Bẫy Xung Điện Galvanic (Tốc độ 3)]: Vô hiệu hóa kích hoạt của [Chain Link ${targetItem.chainIndex}: ${targetItem.cardInstance.def.name}]!`,
            'TRAP',
            card.def.scientificLore
          );
        }
        opponent.lp = Math.max(0, opponent.lp - 600);
        this.addLog(
          activator.name,
          `[Bẫy Xung Điện Galvanic]: Suất điện động pin Galvanic (E°pin = +1.10V) phóng điện giáng 600 LP sát thương trực tiếp lên ${opponent.name}! (Còn ${opponent.lp} LP)`,
          'DAMAGE',
          card.def.scientificLore
        );
        this.recordGameEvent('EFFECT_DAMAGE_DEALT', card, activator.id, {
          damage: 600,
          targetPlayerId: opponent.id,
          remainingLp: opponent.lp
        });
        break;
      }
      case 'SPELL_DEFENSE_SURGE': {
        let targetSlot: MonsterZoneSlot | null = null;
        if (item.targetSlotIndex !== undefined && item.targetSlotIndex >= 0 && item.targetSlotIndex < activator.monsterZones.length) {
          targetSlot = activator.monsterZones[item.targetSlotIndex];
        }
        if (!targetSlot || !targetSlot.card) {
          const activeSlots = activator.monsterZones.filter((s): s is MonsterZoneSlot => s !== null && s.card !== null);
          if (activeSlots.length > 0) {
            targetSlot = activeSlots[0];
          }
        }
        if (targetSlot && targetSlot.card) {
          targetSlot.tempDefBoost += 1000;
          this.addLog(
            activator.name,
            `[Màng Chắn Kết Tinh Đột Biến]: Kết tinh siêu bão hòa tạo màng tinh thể gia cố +1000 DEF cho [${targetSlot.card.def.name}]! (DEF hiện tại: ${(targetSlot.card.def.def || 0) + targetSlot.tempDefBoost})`,
            'SPELL',
            card.def.scientificLore
          );
          this.recordGameEvent('MONSTER_DEF_MODIFIED', targetSlot.card, activator.id, {
            modifier: 1000,
            newDef: (targetSlot.card.def.def || 0) + targetSlot.tempDefBoost,
            sourceCardUid: card.uid
          });
        }
        break;
      }
      case 'TRIGGER_MG_WHEN_OPTIONAL': {
        // Magnesium Flash: Draw 1 card (Rulebook v10 tr. 52)
        this.drawCard(activator.id, true);
        this.addLog(activator.name, `[Magiê — Tia Sáng Rực Rỡ]: Rút 1 lá bài mới từ phản ứng cháy chói sáng!`, 'INFO', card.def.scientificLore);
        break;
      }
      case 'TRIGGER_AL_IF_OPTIONAL': {
        // Aluminium Amphoteric: Gain 800 LP (Rulebook v10 tr. 53)
        activator.lp = Math.min(activator.maxLp, activator.lp + 800);
        this.addLog(activator.name, `[Nhôm — Mạng Tinh Thể Lưỡng Tính]: Hồi phục 800 LP từ màng thụ động oxit!`, 'INFO', card.def.scientificLore);
        break;
      }
      case 'TRIGGER_CL_MANDATORY': {
        // Chlorine Fumes: Deal 600 damage to opponent (Rulebook v10 tr. 52-53)
        opponent.lp = Math.max(0, opponent.lp - 600);
        this.addLog(activator.name, `[Khí Clo — Khói Độc Bốc Hơi]: Khí độc Clo thiêu đốt trừ 600 LP của ${opponent.name}!`, 'DAMAGE', card.def.scientificLore);
        break;
      }
      case 'TRAP_COGNITIVE_CU_HCL': {
        // Negate the preceding chain link if one exists on the stack!
        if (this.chainStack.length > 0) {
          const targetItem = this.chainStack[this.chainStack.length - 1];
          targetItem.isNegated = true;
          this.addLog(
            activator.name,
            `[Bẫy Nhận Thức Cu + HCl]: Vô hiệu hóa thành công kích hoạt của [Chain Link ${targetItem.chainIndex}: ${targetItem.cardInstance.def.name}]!`,
            'TRAP'
          );
        }
        opponent.lp = Math.max(0, opponent.lp - 1000);
        this.addLog(
          activator.name,
          `[BẪY NHẬN THỨC: Cu + HCl] Đối phương mắc bẫy nhận thức hóa học! Cu đứng sau H₂ trong dãy điện hóa (E° = +0.34V), phản ứng không xảy ra! Đối phương mất 1000 LP.`,
          'TRAP',
          card.def.scientificLore
        );
        break;
      }
      case 'TRAP_NOBLE_SHIELD': {
        this.addLog(activator.name, `[Bức Tường Khí Hiếm] Khiên bát tử trơ tuyệt đối hóa giải đòn tấn công và kết thúc Battle Phase!`, 'TRAP');
        this.currentPhase = 'MAIN_PHASE_2';
        break;
      }
      case 'TRAP_SODIUM_EXPLOSION': {
        // Destroy target attacking monster
        if (item.targetSlotIndex !== undefined) {
          const slot = opponent.monsterZones[item.targetSlotIndex];
          if (slot && slot.card) {
            this.addLog(activator.name, `[Bẫy Nổ Kim Loại Kiềm] Natri bùng nổ tiêu diệt ngay [${slot.card.def.name}]!`, 'TRAP');
            opponent.graveyard.push(slot.card);
            opponent.monsterZones[item.targetSlotIndex] = null;
          }
        }
        break;
      }
      case 'SPELL_MANA_RAMP': {
        activator.mana = Math.min(10, activator.mana + 2);
        this.addLog(activator.name, `[Siêu Tụ Điện Pin Lithium] Phóng dòng điện siêu dẫn, nạp +2 Mana (Hiện có: ${activator.mana}/${activator.maxMana})!`, 'SPELL');
        break;
      }
      case 'SPELL_MANA_FREEZE': {
        opponent.frozenMana = (opponent.frozenMana || 0) + 2;
        this.addLog(activator.name, `[Phản Ứng Thu Nhiệt] Thu nhiệt làm lạnh sâu, đóng băng 2 Mana của đối thủ ở lượt tiếp theo!`, 'SPELL');
        break;
      }
      case 'SPELL_FUEL_CELL_PERMA': {
        activator.maxMana = Math.min(10, activator.maxMana + 1);
        activator.mana = Math.min(activator.maxMana, activator.mana + 1);
        activator.lp = Math.min(activator.maxLp, activator.lp + 400);
        this.addLog(activator.name, `[Pin Nhiên Liệu Hydro] Tăng vĩnh viễn Mana tối đa lên ${activator.maxMana} và hồi phục 400 LP!`, 'SPELL');
        break;
      }
      case 'SPELL_MANA_BURN': {
        const burned = Math.min(2, opponent.mana);
        opponent.mana -= burned;
        const burnDmg = burned * 400;
        opponent.lp = Math.max(0, opponent.lp - burnDmg);
        this.addLog(activator.name, `[Hồ Quang Plasma] Đốt cháy ${burned} Mana của đối thủ và gây ${burnDmg} LP sát thương!`, 'DAMAGE');
        this.checkWinConditions();
        break;
      }
      case 'SPELL_GRAVEYARD_REBORN': {
        const metalIdx = activator.graveyard.findIndex(c => 
          c.def.cardType === 'ELEMENT_MONSTER' && (c.def.attribute === 'TERRA' || c.def.attribute === 'ELECTRO' || c.def.attribute === 'PYRO')
        );
        const emptySlot = activator.monsterZones.findIndex(s => s === null);
        if (metalIdx !== -1 && emptySlot !== -1) {
          const revived = activator.graveyard.splice(metalIdx, 1)[0];
          activator.monsterZones[emptySlot] = {
            slotIndex: emptySlot,
            card: revived,
            position: 'FACE_UP_ATTACK',
            hasAttackedThisTurn: false,
            hasChangedPositionThisTurn: false,
            turnSummoned: this.currentTurn,
            tempAtkBoost: 0,
            tempDefBoost: 0
          };
          this.addLog(activator.name, `[Điện Phân Catot Tái Sinh] Hoàn nguyên ion kim loại, hồi sinh [${revived.def.name}] từ Mộ Bài lên sân đấu!`, 'CHEMICAL_REACTION');
        } else {
          this.addLog(activator.name, `[Điện Phân Catot] Không tìm thấy quái thú kim loại trong Mộ Bài hoặc không còn ô trống trên sân.`, 'INFO');
        }
        break;
      }
      case 'SPELL_RADIOACTIVE_BANISH': {
        const oppSlotIdx = opponent.monsterZones.findIndex(s => s && s.card);
        if (oppSlotIdx !== -1) {
          const banishedCard = opponent.monsterZones[oppSlotIdx]!.card!;
          opponent.monsterZones[oppSlotIdx] = null;
          opponent.banished.push(banishedCard);
          this.addLog(activator.name, `[Phân Rã Phóng Xạ Uranium] Bức xạ hạt nhân phá vỡ cấu trúc! TRỤC XUẤT VĨNH VIỄN [${banishedCard.def.name}] (Chết hơn chết)!`, 'DAMAGE');
        }
        break;
      }
      case 'SPELL_AQUA_REGIA_BANISH': {
        let bestSlotIdx = -1;
        let maxDef = -1;
        opponent.monsterZones.forEach((s, idx) => {
          if (s && s.card && (s.card.def.def || 0) > maxDef) {
            maxDef = s.card.def.def || 0;
            bestSlotIdx = idx;
          }
        });
        if (bestSlotIdx !== -1) {
          const target = opponent.monsterZones[bestSlotIdx]!.card!;
          opponent.monsterZones[bestSlotIdx] = null;
          opponent.banished.push(target);
          this.addLog(activator.name, `[Nước Cường Toan Aqua Regia] Hòa tan hoàn toàn quái thú kiên cố nhất [${target.def.name}] và TRỤC XUẤT KHỎI TRẬN ĐẤU!`, 'CHEMICAL_REACTION');
        }
        break;
      }
      case 'SPELL_CHROMATOGRAPHY_DRAW': {
        const c1 = this.drawCard(item.activatorPlayerId);
        const c2 = this.drawCard(item.activatorPlayerId);
        let bonus = false;
        if ((c1 && (c1.def.attribute === 'AERO' || c1.def.chemicalFormula === 'Cl' || c1.def.chemicalFormula === 'He')) ||
            (c2 && (c2.def.attribute === 'AERO' || c2.def.chemicalFormula === 'Cl' || c2.def.chemicalFormula === 'He'))) {
          this.drawCard(item.activatorPlayerId);
          bonus = true;
        }
        this.addLog(activator.name, `[Sắc Ký Khí Tách Pha] Phân giải sắc ký pha động tốc độ cao! Rút ${bonus ? '3' : '2'} lá bài!`, 'INFO');
        break;
      }
      case 'SPELL_CHELATION_CAPTURE_EDTA': {
        const targetSlotIndex = item.targetSlotIndex !== undefined ? item.targetSlotIndex : opponent.monsterZones.findIndex(s => s && s.card);
        if (targetSlotIndex === -1 || !opponent.monsterZones[targetSlotIndex]?.card) {
          this.addLog(activator.name, `[Phối Tử Chelate EDTA] Không có quái thú hợp lệ trên sân đối thủ để tạo phức chelate!`, 'INFO');
          break;
        }
        const targetCard = opponent.monsterZones[targetSlotIndex]!.card!;
        const transferResult = this.takeControlOfMonster(
          item.activatorPlayerId,
          targetSlotIndex,
          'UNTIL_END_OF_TURN',
          false,
          false,
          'EDTA_HEXADENTATE_CHELATION'
        );
        if (transferResult.success) {
          this.addLog(
            activator.name,
            `[Phối Tử Chelate Hóa EDTA] Phối tử 6 càng EDTA bao bọc quái thú [${targetCard.def.name}], tước đoạt toàn bộ tự do và chiếm quyền điều khiển! (Không thể tấn công hay hiến tế trong lượt này)`,
            'CHEMICAL_REACTION',
            'Mⁿ⁺ + EDTA⁴⁻ → [M(EDTA)]ⁿ⁻⁴'
          );
        } else {
          this.addLog(activator.name, transferResult.message, 'INFO');
        }
        break;
      }
      case 'SPELL_SPECTROPHOTOMETER_LASER_COLLIMATOR': {
        const colIndex = (item.targetSlotIndex !== undefined ? Math.max(0, Math.min(4, item.targetSlotIndex)) : 2) as BattlefieldColumnIndex;
        const destructionResult = this.destroyColumnCards(colIndex, 'SPECTROPHOTOMETER_LASER');
        if (destructionResult.count > 0) {
          const damage = destructionResult.count * 500;
          opponent.lp = Math.max(0, opponent.lp - damage);
          this.recordGameEvent('EFFECT_DAMAGE_DEALT', card, activator.id, {
            damage,
            reason: 'SPECTROPHOTOMETER_BEER_LAMBERT_ABSORBANCE',
            destroyedCount: destructionResult.count,
            columnIndex: colIndex
          });
          this.addLog(
            activator.name,
            `[Định Luật Beer-Lambert: A = ε·l·c] Tia laser đơn sắc hấp thụ năng lượng quang phổ từ ${destructionResult.count} lá bài bị tiêu hủy! Gây ${damage} sát thương quang tử lên đối thủ! (LP còn: ${opponent.lp})`,
            'CHEMICAL_REACTION',
            'A = -log₁₀(T) = ε · l · c'
          );
        } else {
          this.addLog(
            activator.name,
            `[Tia Laser Quang Phổ] Tia laser quét qua Cột ${colIndex + 1} nhưng không có lá bài nào bị bắn trúng!`,
            'INFO'
          );
        }
        break;
      }
      case 'SPELL_DIAMOND_CRYSTAL_LATTICE': {
        // Continuous diamond lattice resonance:
        // Scans all friendly monsters on activator's field. If they have an adjacent friendly monster, grants +400 ATK/DEF.
        let boostedCount = 0;
        for (let i = 0; i < activator.monsterZones.length; i++) {
          const slot = activator.monsterZones[i];
          if (slot && slot.card) {
            const myCol = this.getColumnForSlot(activator.id, 'MONSTER', i);
            const adjacentCols = this.getAdjacentColumns(myCol);
            const hasAdjacentAlliedMonster = adjacentCols.some(adjCol => {
              const summary = this.getCardsInColumn(adjCol);
              return summary.playerCards.some(c => (c.zoneType === 'MONSTER' || c.zoneType === 'EXTRA_MONSTER') && c.duelistId === activator.id);
            });
            if (hasAdjacentAlliedMonster) {
              slot.tempAtkBoost += 400;
              slot.tempDefBoost += 400;
              boostedCount++;
              this.recordGameEvent('MONSTER_ATK_MODIFIED', slot.card, activator.id, {
                slotIndex: i,
                newAtkBoost: slot.tempAtkBoost,
                reason: 'DIAMOND_LATTICE_ADJACENCY'
              });
            }
          }
        }
        this.addLog(
          activator.name,
          `[Mạng Tinh Thể Kim Cương Tứ Diện] Tinh thể carbon lai hóa sp³ cộng hưởng định hướng cột: Tăng +400 ATK/DEF cho ${boostedCount} quái thú có đồng minh ở cột liền kề!`,
          'CHEMICAL_REACTION',
          'C(kim cương) lai hóa sp³, mạng lưới tứ diện liên kết cộng hóa trị bền vững'
        );
        break;
      }
      case 'TRAP_ABSOLUTE_ZERO_FREEZE': {
        this.addLog(
          activator.name,
          `[Độ Không Tuyệt Đối — Khóa Hiệu Ứng Siêu Dẫn - Rulebook v10 tr. 48-49 & 54] Thiết lập nhiệt độ 0 Kelvin! Định luật III Nhiệt động lực học đóng băng hoàn toàn hiệu ứng của mọi quái thú ngửa mặt trên sân (Skill Drain)!`,
          'CHEMICAL_REACTION',
          'lim_{T → 0 K} ΔS = 0; k = A · e^{-E_a / (RT)} → 0'
        );
        break;
      }
      case 'SPELL_FLASH_PRECIPITATION_NULLIFIER': {
        const targetSlot = item.targetSlotIndex !== undefined ? item.targetSlotIndex : 0;
        const targetPlayer = item.targetPlayerId || (opponent.monsterZones[targetSlot]?.card ? opponent.id : activator.id);
        const negateResult = this.negateMonsterEffects(targetPlayer, targetSlot, 'UNTIL_END_OF_TURN', 'FLASH_PRECIPITATION');
        this.addLog(
          activator.name,
          `[Thuốc Thử Kết Tủa Nhanh] Phun kết tủa BaSO₄ bất hoạt toàn diện bề mặt quái thú: ${negateResult.message}`,
          'CHEMICAL_REACTION',
          'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (K_sp = 1.1 × 10⁻¹⁰)'
        );
        break;
      }
      case 'SPELL_PASSIVATION_OXIDE_FILM': {
        // Continuous Spell - Rulebook v10 tr. 30-31, 54
        // Face-up TERRA monsters gain effect destruction immunity and +300 DEF
        let protectedCount = 0;
        for (let i = 0; i < activator.monsterZones.length; i++) {
          const slot = activator.monsterZones[i];
          if (slot && slot.card && slot.card.def.attribute === 'TERRA') {
            slot.tempDefBoost = (slot.tempDefBoost || 0) + 300;
            protectedCount++;
            this.recordGameEvent('MONSTER_DEF_MODIFIED', slot.card, activator.id, {
              slotIndex: i,
              newDefBoost: slot.tempDefBoost,
              reason: 'PASSIVATION_OXIDE_LAYER'
            });
          }
        }
        this.addLog(
          activator.name,
          `[Màng Oxit Thụ Động Hóa — Lớp Bảo Vệ Bất Hoại - Rulebook v10 tr. 30-31, 54] Hình thành màng oxit Al₂O₃/Fe₂O₃ nanomet đặc sít! ${protectedCount} quái thú hệ Địa nhận bảo vệ kháng hủy hiệu ứng vĩnh viễn (khi lá bài còn ngửa mặt) và +300 DEF!`,
          'CHEMICAL_REACTION',
          '4Al + 3O₂ → 2Al₂O₃ (ΔH° = -1675.7 kJ/mol; Lớp màng oxit thụ động hóa nanomet)'
        );
        break;
      }
      case 'SPELL_SUPERCONDUCTING_MEISSNER_SHIELD': {
        // Quick-Play Spell - Rulebook v10 tr. 30-31, 40-43, 54
        // Target 1 face-up monster: Cannot be destroyed by battle or card effects until End Phase
        const targetSlot = item.targetSlotIndex !== undefined ? item.targetSlotIndex : 0;
        const targetPlayer = item.targetPlayerId || activator.id;
        this.grantBattleProtection(targetPlayer, targetSlot, 'UNTIL_END_OF_TURN', 'MEISSNER_DIAMAGNETIC_SHIELD');
        this.grantEffectProtection(targetPlayer, targetSlot, 'UNTIL_END_OF_TURN', 'MEISSNER_DIAMAGNETIC_SHIELD');
        this.addLog(
          activator.name,
          `[Lá Chắn Nghịch Từ Meissner Siêu Dẫn - Rulebook v10 tr. 30-31, 40-43, 54] Hiệu ứng nghịch từ hoàn hảo trục xuất mọi từ trường (B = 0)! Quái thú mục tiêu được bảo vệ bất hoại khỏi cả chiến đấu lẫn hiệu ứng thẻ bài cho đến hết lượt!`,
          'CHEMICAL_REACTION',
          'B = μ₀(H + M) = 0 (T < T_c, Hiện tượng nghịch từ lý tưởng)'
        );
        break;
      }
      case 'SPELL_AAS_SEARCH': {
        const metalIdx = activator.deck.findIndex(c => c.def.cardType === 'ELEMENT_MONSTER' && (c.def.attribute === 'TERRA' || c.def.attribute === 'ELECTRO' || c.def.attribute === 'PYRO'));
        if (metalIdx !== -1) {
          const searched = activator.deck.splice(metalIdx, 1)[0];
          activator.hand.push(searched);
          this.addLog(activator.name, `[Quang Phổ Hấp Thụ AAS] Phát hiện vạch hấp thụ kim loại, tìm kiếm [${searched.def.name}] từ bộ bài lên tay!`, 'INFO');
        }
        break;
      }
      case 'FIELD_ACID_RAIN': {
        this.environment.ph = 2.8;
        this.environment.activeEnvironmentCardId = card.def.id;
        this.environment.environmentCardName = card.def.name;
        activator.fieldZone = card;
        this.addLog(activator.name, `[Địa Bàn Môi Trường: Mưa Axit] Thiết lập pH = 2.8! Môi trường axit mạnh ăn mòn giáp (-200 DEF) và kích thích quái thú kim loại kiềm/kiềm thổ (+300 ATK).`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'FIELD_ALKALINE_SPRING': {
        this.environment.ph = 10.5;
        this.environment.activeEnvironmentCardId = card.def.id;
        this.environment.environmentCardName = card.def.name;
        activator.fieldZone = card;
        this.addLog(activator.name, `[Địa Bàn Môi Trường: Suối Khoáng Kiềm] Thiết lập pH = 10.5! Môi trường bazơ dồi dào OH⁻ tăng cường phòng ngự kết tủa (+350 DEF) và quái thú lưỡng tính Al/Zn (+400 ATK).`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'FIELD_HABER_CHAMBER': {
        this.environment.pressure = 200.0;
        this.environment.temperature = 723.15; // 450°C
        if (!this.environment.activeCatalysts.includes('Fe')) this.environment.activeCatalysts.push('Fe');
        this.environment.activeEnvironmentCardId = card.def.id;
        this.environment.environmentCardName = card.def.name;
        activator.fieldZone = card;
        this.addLog(activator.name, `[Địa Bàn Môi Trường: Buồng Cao Áp Haber-Bosch] Thiết lập P = 200 atm, T = 450°C, Xúc tác [Fe]! Kích hoạt nguyên lý Le Chatelier tăng mạnh hiệu suất phản ứng khí (+45%).`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'FIELD_BUFFER_SOLUTION': {
        this.environment.ph = 7.4;
        this.environment.bufferType = 'BICARBONATE_PHYSIO';
        this.environment.bufferCapacity = 4;
        this.environment.activeEnvironmentCardId = card.def.id;
        this.environment.environmentCardName = card.def.name;
        activator.fieldZone = card;
        this.addLog(activator.name, `[Địa Bàn Môi Trường: Đệm Bicarbonate] Thiết lập pH = 7.4 với 4 lượt đệm! Duy trì trạng thái cân bằng nội môi, hấp thụ 75% biến thiên axit/kiềm.`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'FIELD_VOLCANIC_VENT': {
        this.environment.temperature = 873.15; // 600°C
        this.environment.activeEnvironmentCardId = card.def.id;
        this.environment.environmentCardName = card.def.name;
        activator.fieldZone = card;
        this.addLog(activator.name, `[Địa Bàn Môi Trường: Miệng Núi Lửa Nhiệt Thủy] Nhiệt độ đạt 600°C! Kích hoạt toàn diện phản ứng thu nhiệt và gia tốc hệ PYRO (+350 ATK).`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'FIELD_CRYOGENIC_LAB': {
        this.environment.temperature = 253.15; // -20°C
        this.environment.activeEnvironmentCardId = card.def.id;
        this.environment.environmentCardName = card.def.name;
        activator.fieldZone = card;
        this.addLog(activator.name, `[Địa Bàn Môi Trường: Phòng Thí Nghiệm Siêu Lạnh] Nhiệt độ hạ xuống -20°C! Nước đóng băng thành khiên tinh thể vững chắc (+400 DEF).`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'SPELL_PH_NEUTRALIZE': {
        this.environment.ph = 7.0;
        activator.lp = Math.min(activator.maxLp, activator.lp + 800);
        this.addLog(activator.name, `[Chuẩn Độ Trung Hòa] Điểm tương đương đạt được: Đưa pH về 7.0 (Trung Tính), giải phóng nhiệt trung hòa hồi phục 800 LP!`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'SPELL_PRESSURE_PUMP': {
        this.environment.pressure = Math.min(100, this.environment.pressure + 15);
        opponent.lp = Math.max(0, opponent.lp - 600);
        this.addLog(activator.name, `[Máy Bơm Piston Áp Suất Khí] Nén khí tăng áp suất buồng đấu lên ${this.environment.pressure.toFixed(1)} atm! Gây 600 LP sát thương nén khí lên ${opponent.name}!`, 'DAMAGE', card.def.scientificLore);
        this.checkWinConditions();
        break;
      }
      case 'EQUIP_IRON_CATALYST': {
        if (!this.environment.activeCatalysts.includes('Fe')) this.environment.activeCatalysts.push('Fe');
        if (item.targetSlotIndex !== undefined) {
          const slot = activator.monsterZones[item.targetSlotIndex];
          if (slot && slot.card) {
            slot.tempAtkBoost += 250;
            this.addLog(activator.name, `[Xúc Tác Sắt Hoạt Tính] Trang bị cho [${slot.card.def.name}] tăng +250 ATK và thêm xúc tác [Fe] vào buồng phản ứng!`, 'INFO');
          }
        }
        break;
      }
      case 'FIELD_HABER_BOSCH': {
        this.environment.pressure = 200.0;
        this.environment.temperature = 723.15; // 450°C
        if (!this.environment.activeCatalysts.includes('Fe')) this.environment.activeCatalysts.push('Fe');
        this.environment.activeEnvironmentCardId = card.def.id;
        this.environment.environmentCardName = card.def.name;
        activator.fieldZone = card;
        activator.monsterZones.forEach(s => {
          if (s && s.card && (s.card.def.archetype === 'NITRO_LEGION' || s.card.def.chemicalFormula === 'N2' || s.card.def.chemicalFormula === 'NH3')) {
            s.tempAtkBoost += 400;
          }
        });
        this.addLog(activator.name, `[Buồng Tổng Hợp Haber-Bosch] Thiết lập P=200 atm, T=450°C [Fe]! Tăng 400 ATK cho hệ Nitro!`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'FIELD_CONTACT_V2O5': {
        this.environment.temperature = 723.15; // 450°C
        if (!this.environment.activeCatalysts.includes('V2O5')) this.environment.activeCatalysts.push('V2O5');
        this.environment.activeEnvironmentCardId = card.def.id;
        this.environment.environmentCardName = card.def.name;
        activator.fieldZone = card;
        activator.monsterZones.forEach(s => {
          if (s && s.card && (s.card.def.archetype === 'SULFUR_FORGE' || s.card.def.chemicalFormula === 'S' || s.card.def.chemicalFormula === 'S8' || s.card.def.chemicalFormula === 'H2SO4')) {
            s.tempAtkBoost += 400;
          }
        });
        this.addLog(activator.name, `[Tháp Tiếp Xúc V₂O₅] Nạp xúc tác V₂O₅ ở 450°C! Tăng 400 ATK cho hệ Sulfur và kích hoạt phản ứng SO₂ → SO₃!`, 'CHEMICAL_REACTION', card.def.scientificLore);
        break;
      }
      case 'TRAP_AMMONIUM_SMOKE': {
        if (item.targetSlotIndex !== undefined) {
          const slot = opponent.monsterZones[item.targetSlotIndex];
          if (slot && slot.card) {
            slot.tempAtkBoost = Math.max(-slot.card.def.atk! || 0, slot.tempAtkBoost - 600);
            this.addLog(activator.name, `[Bẫy Khói Trắng NH₄Cl] Màn khói trắng dày đặc che mắt [${slot.card.def.name}], giảm 600 ATK và hóa giải đòn tấn công!`, 'TRAP');
          }
        }
        break;
      }
      case 'TRAP_H2S_SHIELD': {
        if (item.targetSlotIndex !== undefined) {
          const slot = opponent.monsterZones[item.targetSlotIndex];
          if (slot && slot.card) {
            slot.position = 'FACE_UP_DEFENSE';
            slot.tempDefBoost = Math.max(-slot.card.def.def! || 0, slot.tempDefBoost - 600);
            this.addLog(activator.name, `[Bẫy Mùi Trứng Thối H₂S] Đổi [${slot.card.def.name}] sang Thế Thủ và kết tủa đen giảm 600 DEF!`, 'TRAP');
          }
        }
        break;
      }
      case 'SPELL_CHARRING_BANISH': {
        let targetIdx = -1;
        if (item.targetSlotIndex !== undefined && opponent.monsterZones[item.targetSlotIndex]?.card) {
          targetIdx = item.targetSlotIndex;
        } else {
          targetIdx = opponent.monsterZones.findIndex(s => s && s.card && s.position !== 'FACE_UP_ATTACK');
          if (targetIdx === -1) targetIdx = opponent.monsterZones.findIndex(s => s && s.card);
        }
        if (targetIdx !== -1) {
          const victim = opponent.monsterZones[targetIdx]!.card!;
          opponent.monsterZones[targetIdx] = null;
          opponent.banished.push(victim);
          opponent.lp = Math.max(0, opponent.lp - 500);
          this.addLog(activator.name, `[Phép Than Hóa Háo Nước] H₂SO₄ đặc hút cạn nước! Hóa than và TRỤC XUẤT [${victim.def.name}] sang Vùng Bị Loại! ${opponent.name} mất 500 LP.`, 'CHEMICAL_REACTION');
        }
        break;
      }
      case 'SPELL_TRIBUTE_DRAW_2': {
        const mySlotIdx = activator.monsterZones.findIndex(s => s && s.card);
        if (mySlotIdx !== -1) {
          const sac = activator.monsterZones[mySlotIdx]!.card!;
          activator.monsterZones[mySlotIdx] = null;
          activator.graveyard.push(sac);
          this.drawCard(item.activatorPlayerId);
          this.drawCard(item.activatorPlayerId);
          this.addLog(activator.name, `[Hiến Tế Quái Thú Đổi Thẻ] Hiến tế [${sac.def.name}] vào Mộ Bài và rút 2 lá bài mới!`, 'INFO');
        }
        break;
      }
      case 'SPELL_LP_DRAW_2': {
        activator.lp = Math.max(1, activator.lp - 1000);
        this.drawCard(item.activatorPlayerId);
        this.drawCard(item.activatorPlayerId);
        this.addLog(activator.name, `[Sinh Mệnh Đổi Thẻ] Trả 1000 LP (còn ${activator.lp} LP), rút ngay 2 lá bài!`, 'INFO');
        break;
      }
      case 'SPELL_GRAVE_FILTER_DRAW': {
        if (activator.graveyard.length >= 2) {
          const b1 = activator.graveyard.pop()!;
          const b2 = activator.graveyard.pop()!;
          activator.banished.push(b1, b2);
          this.drawCard(item.activatorPlayerId);
          this.drawCard(item.activatorPlayerId);
          this.addLog(activator.name, `[Lọc Tinh Thể Mộ Bài] Trục xuất [${b1.def.name}] và [${b2.def.name}] khỏi Mộ Bài sang Vùng Bị Loại, rút 2 lá bài!`, 'INFO');
        } else {
          this.drawCard(item.activatorPlayerId);
          this.addLog(activator.name, `[Lọc Tinh Thể Mộ Bài] Mộ bài không đủ 2 lá, chỉ rút 1 lá bài!`, 'INFO');
        }
        break;
      }
      case 'SPELL_LE_CHATELIER': {
        let restoredCount = 0;
        for (const slot of activator.monsterZones) {
          if (slot && slot.card) {
            if (slot.tempAtkBoost < 0) { slot.tempAtkBoost = 0; restoredCount++; }
            if (slot.tempDefBoost < 0) { slot.tempDefBoost = 0; restoredCount++; }
          }
        }
        const drawn = this.drawCard(item.activatorPlayerId);
        this.addLog(
          activator.name,
          `[Nguyên Lý Le Chatelier] Cân bằng tự dịch chuyển chống lại nhiễu loạn! ${restoredCount > 0 ? `Khôi phục chỉ số của ${restoredCount} quái thú và ` : ''}rút 1 lá bài (${drawn ? drawn.def.name : 'Bộ bài trống'}).`,
          'SPELL',
          card.def.scientificLore
        );
        break;
      }
      case 'SPELL_PLATINUM_MATRIX': {
        activator.mana = Math.min(10, activator.mana + 1);
        opponent.lp = Math.max(0, opponent.lp - 300);
        this.addLog(
          activator.name,
          `[Xúc Tác Bạch Kim Vĩnh Cửu] Hạ thấp năng lượng hoạt hóa Ea! Hoàn trả 1 Mana và gây 300 LP phản ứng phụ lên đối thủ.`,
          'SPELL',
          card.def.scientificLore
        );
        break;
      }
      case 'TRAP_PASSIVATION': {
        let targetSlot: MonsterZoneSlot | null = null;
        if (item.targetSlotIndex !== undefined) {
          targetSlot = activator.monsterZones[item.targetSlotIndex];
        }
        if (!targetSlot) {
          targetSlot = activator.monsterZones.find(s => s && s.card) || null;
        }
        if (targetSlot && targetSlot.card) {
          targetSlot.tempDefBoost += 1200;
          this.addLog(
            activator.name,
            `[Giáp Thụ Động Hóa Nhôm Oxit] Lớp màng thụ động Al₂O₃/Fe₃O₄ siêu mỏng hình thành, tăng 1200 DEF cho [${targetSlot.card.def.name}]!`,
            'TRAP',
            card.def.scientificLore
          );
        }
        break;
      }
      case 'TRAP_PRECIPITATION': {
        let targetSlot: MonsterZoneSlot | null = null;
        if (item.targetSlotIndex !== undefined) {
          targetSlot = opponent.monsterZones[item.targetSlotIndex];
        }
        if (!targetSlot) {
          let maxAtk = -1;
          for (const s of opponent.monsterZones) {
            if (s && s.card && (s.card.def.atk || 0) > maxAtk) {
              maxAtk = s.card.def.atk || 0;
              targetSlot = s;
            }
          }
        }
        if (targetSlot && targetSlot.card) {
          targetSlot.position = 'FACE_DOWN_DEFENSE';
          targetSlot.hasAttackedThisTurn = true;
          this.addLog(
            activator.name,
            `[Bẫy Kết Tủa Bari Sunfat BaSO₄] Tạo kết tủa nặng khóa chặt [${targetSlot.card.def.name}], chuyển về tư thế PHÒNG THỦ ÚP MẶT!`,
            'TRAP',
            card.def.scientificLore
          );
        }
        break;
      }
      case 'SPELL_ESTERIFICATION': {
        this.drawCard(item.activatorPlayerId);
        let targetSlot: MonsterZoneSlot | null = null;
        if (item.targetSlotIndex !== undefined) {
          targetSlot = activator.monsterZones[item.targetSlotIndex];
        }
        if (!targetSlot) {
          targetSlot = activator.monsterZones.find(s => s && s.card) || null;
        }
        if (targetSlot && targetSlot.card) {
          targetSlot.tempAtkBoost += 500;
          this.addLog(
            activator.name,
            `[Phép Este Hóa Fischer] Rút 1 lá bài và xúc tác H₂SO₄ đặc hút nước tăng 500 ATK cho [${targetSlot.card.def.name}]!`,
            'SPELL',
            card.def.scientificLore
          );
        } else {
          this.addLog(
            activator.name,
            `[Phép Este Hóa Fischer] Rút 1 lá bài từ bộ bài thành công!`,
            'SPELL',
            card.def.scientificLore
          );
        }
        break;
      }
      case 'SPELL_TOLLENS_MIRROR': {
        opponent.lp = Math.max(0, opponent.lp - 600);
        activator.lp = Math.min(8000, activator.lp + 400);
        this.addLog(
          activator.name,
          `[Phép Tráng Bạc Tollens] Kết tủa lớp gương bạc Ag lấp lánh! Gây 600 LP sát thương lên ${opponent.name} (còn ${opponent.lp} LP) và hồi phục 400 LP cho bản thân (hiện có ${activator.lp} LP)!`,
          'SPELL',
          card.def.scientificLore
        );
        break;
      }
      case 'TRAP_NOBLE_MEMBRANE_CONT': {
        const attackerSlot = opponent.monsterZones[item.targetSlotIndex !== undefined ? item.targetSlotIndex : 0];
        if (attackerSlot && attackerSlot.card) {
          attackerSlot.tempAtkBoost -= 500;
          this.addLog(
            activator.name,
            `[Bẫy Duy Trì: Màng Trơ Khí Hiếm] Khởi động màng năng lượng khí trơ bát tử! Giảm 500 ATK của quái thú tấn công [${attackerSlot.card.def.name}]!`,
            'TRAP',
            card.def.scientificLore
          );
        }
        break;
      }
      case 'TRAP_SAPONIFICATION': {
        let targetSlot: MonsterZoneSlot | null = null;
        if (item.targetSlotIndex !== undefined) {
          targetSlot = opponent.monsterZones[item.targetSlotIndex];
        }
        if (!targetSlot) {
          let maxAtk = -1;
          for (const s of opponent.monsterZones) {
            if (s && s.card && (s.card.def.atk || 0) > maxAtk) {
              maxAtk = s.card.def.atk || 0;
              targetSlot = s;
            }
          }
        }
        if (targetSlot && targetSlot.card) {
          targetSlot.hasAttackedThisTurn = true;
          targetSlot.tempAtkBoost -= 500;
          this.addLog(
            activator.name,
            `[Bẫy Xà Phòng Hóa] Lớp bôi trơn xà phòng natri khiến [${targetSlot.card.def.name}] trượt ngã, vô hiệu hóa đòn đánh và giảm 500 ATK!`,
            'TRAP',
            card.def.scientificLore
          );
        }
        break;
      }
      default: {
        // Dynamic execution of student-crafted custom cards
        if (card.def.effectCode && card.def.effectCode.startsWith('CUSTOM_')) {
          const dmg = (card.def.manaCost || 3) * 250;
          opponent.lp = Math.max(0, opponent.lp - dmg);
          this.addLog(
            activator.name,
            `[Thẻ Sáng Chế: ${card.def.name}] Kích hoạt kỹ năng tự chế! Giải phóng năng lượng phản ứng, gây ${dmg} LP sát thương lên ${opponent.name}!`,
            'CHEMICAL_REACTION',
            card.def.scientificLore
          );
        }
        break;
      }
    }

    // Move spell/trap to graveyard if it wasn't continuous/field/equip
    if (card.def.cardType === 'FIELD_ENVIRONMENT') {
      activator.fieldZone = card;
      card.isFaceDown = false;
    } else if (card.def.cardType === 'EQUIP_CATALYST' || card.def.spellTrapSubtype === 'EQUIP_SPELL') {
      // Master Rule (Rulebook v10 tr. 28): Equip Spell must have a valid face-up target monster on field
      const targetSlot = item.targetSlotIndex !== undefined
        ? (activator.monsterZones[item.targetSlotIndex] || opponent.monsterZones[item.targetSlotIndex])
        : null;

      if (targetSlot && targetSlot.card && targetSlot.position !== 'FACE_DOWN_DEFENSE') {
        // Successfully equipped: remains on field
        targetSlot.equippedCards = targetSlot.equippedCards || [];
        if (!targetSlot.equippedCards.some(e => e.uid === card.uid)) {
          targetSlot.equippedCards.push(card);
        }
      } else {
        // Target monster is missing or invalid: Equip Spell fizzles and is sent to Graveyard immediately!
        this.addLog(
          'SYSTEM',
          `[Mất Mục Tiêu] Quái thú mục tiêu của [${card.def.name}] đã rời sân trước khi giải quyết! Thẻ Trang Bị không thể gắn và bị gửi xuống Mộ Bài.`,
          'SPELL'
        );
        activator.graveyard.push(card);
      }
    } else if (card.def.spellTrapSubtype === 'CONTINUOUS_TRAP' || card.def.spellTrapSubtype === 'CONTINUOUS_SPELL') {
      // Continuous spell / trap remains face-up on field in spellTrapZones (Rulebook v10 tr. 29)
    } else {
      activator.graveyard.push(card);
    }
  }

  // ==========================================
  // BATTLE & COMBAT SYSTEM (Rulebook v10 tr. 38-43)
  // ==========================================

  public get activeBattleReplay(): BattleReplayState | null {
    return this.activeReplayState;
  }

  /**
   * Master Rule Battle Step Attack Declaration (Rulebook v10 tr. 40)
   * Tracks initial defender count to evaluate Battle Step Replays.
   */
  public declareAttack(
    attackerSlotIndex: number,
    targetSlotIndex: number | 'DIRECT',
    isEmzAttacker: boolean = false
  ): AttackDeclarationResult {
    if (this.currentPhase !== 'BATTLE_PHASE') {
      return { success: false, message: 'Chỉ có thể tấn công trong Battle Phase!', damageDealt: 0, attackerDestroyed: false, targetDestroyed: false, directAttack: false };
    }

    const attackerDuelist = this.getDuelist(this.activePlayerId);
    const defenderDuelist = this.getOpponent(this.activePlayerId);

    // Master Rule: Turn 1 Player Cannot Attack Rule (Rulebook v10 tr. 38)
    if (this.enforceTurnOneNoAttack && this.currentTurn === 1) {
      this.addLog(
        attackerDuelist.name,
        `[Quy Tắc Lượt Đầu Tiên - Rulebook v10 tr. 38] Người chơi đi trước không thể tuyên bố tấn công trong Lượt 1 của trận đấu!`,
        'INFO'
      );
      return {
        success: false,
        message: `[Quy Tắc Lượt Đầu Tiên - Rulebook v10 tr. 38] Người chơi đi trước không thể tuyên bố tấn công trong Lượt 1 của trận đấu!`,
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    // Master Rule: Check for Turn-based Attack Prohibition lingering effects (Rulebook v10 tr. 54)
    if (this.hasLingeringEffect(this.activePlayerId, 'ATTACK_PROHIBITION')) {
      const activeEffects = this.getLingeringEffects(this.activePlayerId).filter(e => e.effectType === 'ATTACK_PROHIBITION');
      const effectName = activeEffects.length > 0 ? activeEffects[0].sourceCardName : 'Lưới Khí Trơ Phong Tỏa';
      this.addLog(
        attackerDuelist.name,
        `[Phong Tỏa Tấn Công - Rulebook v10 tr. 54] Không thể tuyên bố tấn công do đang chịu hiệu ứng duy trì từ "${effectName}"!`,
        'INFO'
      );
      return {
        success: false,
        message: `[Phong Tỏa Tấn Công - Rulebook v10 tr. 54] Không thể tuyên bố tấn công do đang chịu hiệu ứng duy trì từ "${effectName}"!`,
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    const attackerSlot = (isEmzAttacker || attackerSlotIndex === -1)
      ? attackerDuelist.extraMonsterZone
      : attackerDuelist.monsterZones[attackerSlotIndex];
    if (!attackerSlot || !attackerSlot.card) {
      return { success: false, message: 'Không có quái thú tấn công tại ô này!', damageDealt: 0, attackerDestroyed: false, targetDestroyed: false, directAttack: false };
    }

    if (attackerSlot.position !== 'FACE_UP_ATTACK') {
      return {
        success: false,
        message: '[Quy Tắc Chiến Đấu - Rulebook v10 tr. 38] Chỉ quái thú ở tư thế Tấn Công Ngửa Mặt mới có thể tấn công!',
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    if (attackerSlot.hasAttackedThisTurn) {
      return { success: false, message: 'Quái thú này đã tấn công trong lượt này!', damageDealt: 0, attackerDestroyed: false, targetDestroyed: false, directAttack: false };
    }

    const attackerCard = attackerSlot.card;

    // Master Rule: Control Transfer Attack Prohibition Check (Rulebook v10 tr. 47)
    const activeTransfer = this.activeControlTransfers.find(r => r.cardUid === attackerCard.uid);
    if (activeTransfer && activeTransfer.canAttack === false) {
      this.addLog(
        attackerDuelist.name,
        `[Vi Phạm Master Rule - Rulebook v10 tr. 47] Quái thú [${attackerCard.def.name}] đang trong trạng thái chuyển giao quyền kiểm soát không thể tuyên bố tấn công!`,
        'INFO'
      );
      return {
        success: false,
        message: `[Vi Phạm Master Rule - Rulebook v10 tr. 47] Quái thú [${attackerCard.def.name}] đang trong trạng thái chuyển giao quyền kiểm soát không thể tuyên bố tấn công!`,
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    // Master Rule: Level 4+ Attack Restriction Check (Gravity Bind / Ultracentrifugal Sedimentation - Rulebook v10 tr. 25)
    if (this.isGravityBindActive()) {
      const attackerLevel = this.getMonsterLevel(attackerCard);
      if (attackerLevel !== undefined && attackerLevel >= 4) {
        this.addLog(
          attackerDuelist.name,
          `[Bẫy Ly Tâm Lắng Cặn - Rulebook v10 tr. 25] Quái thú [${attackerCard.def.name}] có Cấp độ ${attackerLevel} (>= 4) bị phong tỏa tấn công bởi Bẫy Ly Tâm! (Quái thú Xyz/Link không có Cấp độ nên được miễn nhiễm).`,
          'INFO'
        );
        return {
          success: false,
          message: `[Bẫy Ly Tâm Lắng Cặn - Rulebook v10 tr. 25] Quái thú [${attackerCard.def.name}] có Cấp độ ${attackerLevel} (>= 4) bị phong tỏa tấn công bởi Bẫy Ly Tâm!`,
          damageDealt: 0,
          attackerDestroyed: false,
          targetDestroyed: false,
          directAttack: false
        };
      }
    }

    // Direct Attack Validation: Check if opponent has defenders unless Fluorine bypass applies
    const hasDefenders = defenderDuelist.monsterZones.some(s => s && s.card);
    if (targetSlotIndex === 'DIRECT') {
      if (hasDefenders) {
        const onlyDefenseMonsters = defenderDuelist.monsterZones.every(s => !s || !s.card || s.position !== 'FACE_UP_ATTACK');
        const isFluorineMaxOx = attackerCard.def.effectCode === 'ELEM_F_MAX_OX';
        if (!isFluorineMaxOx || !onlyDefenseMonsters) {
          return {
            success: false,
            message: 'Đối phương vẫn còn quái thú phòng thủ trên sân! Phải tấn công quái thú trước.',
            damageDealt: 0,
            attackerDestroyed: false,
            targetDestroyed: false,
            directAttack: false
          };
        }
        this.addLog(attackerDuelist.name, `[Độ Âm Điện Tuyệt Đối F] Flo xuyên thủng mọi phòng tuyến phòng thủ để tấn công trực tiếp!`, 'CHEMICAL_REACTION', 'F₂ + 2e⁻ → 2F⁻');
      }
    } else {
      // Monster Target Validation
      const defenderSlot = defenderDuelist.monsterZones[targetSlotIndex];
      if (!defenderSlot || !defenderSlot.card) {
        return {
          success: false,
          message: 'Mục tiêu tấn công không tồn tại!',
          damageDealt: 0,
          attackerDestroyed: false,
          targetDestroyed: false,
          directAttack: false
        };
      }
    }

    // Record initial defender board state before Battle Step fast effects trigger
    const initialDefenderCount = defenderDuelist.monsterZones.filter(s => s && s.card).length;
    const targetCardUid = (targetSlotIndex !== 'DIRECT' && defenderDuelist.monsterZones[targetSlotIndex]?.card)
      ? defenderDuelist.monsterZones[targetSlotIndex]!.card!.uid
      : null;

    // Trigger on-attack element effects (e.g. Potassium K Super Burst)
    if (attackerCard.def.effectCode === 'ELEM_K_SUPER_BURST') {
      defenderDuelist.lp = Math.max(0, defenderDuelist.lp - 400);
      attackerSlot.tempAtkBoost += 300;
      this.addLog(
        attackerDuelist.name,
        `[Hoàng Đế Kali] Ngọn lửa tím bùng cháy thiêu đốt 400 LP đối thủ và tăng +300 ATK!`,
        'CHEMICAL_REACTION',
        '2K + 2H₂O → 2KOH + H₂'
      );
      this.checkWinConditions();
    }

    // Battle Step Fast Effects: Check defender trap reactions (e.g., Noble Gas Shield or Sodium Blast)
    const trapTriggered = this.checkDefenderTrapReaction(defenderDuelist.id, attackerSlotIndex);
    if (trapTriggered) {
      // Check if attacker was destroyed by trap
      const currentAttackerSlot = attackerDuelist.monsterZones[attackerSlotIndex];
      if (!currentAttackerSlot || !currentAttackerSlot.card || currentAttackerSlot.card.uid !== attackerCard.uid) {
        return {
          success: true,
          message: 'Đòn tấn công bị chặn bởi Bẫy đối phương! Quái thú tấn công bị tiêu diệt!',
          damageDealt: 0,
          attackerDestroyed: true,
          targetDestroyed: false,
          directAttack: targetSlotIndex === 'DIRECT'
        };
      }
      attackerSlot.hasAttackedThisTurn = true;
      return {
        success: true,
        message: 'Đòn tấn công bị chặn bởi Bẫy của đối phương!',
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: targetSlotIndex === 'DIRECT'
      };
    }

    // Check if Battle Step Replay is triggered (Rulebook v10 tr. 40):
    // "After you declare an attack, if the number of monsters on your opponent's side of the field changes before the Damage Step, a Replay occurs."
    const currentDefenderCount = defenderDuelist.monsterZones.filter(s => s && s.card).length;
    const targetMissing = targetSlotIndex !== 'DIRECT' && (
      !defenderDuelist.monsterZones[targetSlotIndex] ||
      defenderDuelist.monsterZones[targetSlotIndex]?.card?.uid !== targetCardUid
    );

    if (currentDefenderCount !== initialDefenderCount || targetMissing) {
      const replayState = this.initiateBattleReplay(attackerSlotIndex, initialDefenderCount, targetSlotIndex);
      if (this.activePlayerId === 'opponent') {
        return this.aiResolveBattleReplay();
      }
      return {
        success: true,
        message: 'Quy Tắc Đánh Lại (Battle Replay) được kích hoạt!',
        replayTriggered: true,
        replayState,
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    // No Replay: Lock attack right and proceed directly into Damage Step
    attackerSlot.hasAttackedThisTurn = true;
    return this.resolveDamageStep(attackerSlotIndex, targetSlotIndex);
  }

  /**
   * Initializes a Battle Step Replay State (Rulebook v10 tr. 40)
   */
  public initiateBattleReplay(
    attackerSlotIndex: number,
    initialDefenderCount: number,
    originalTarget: number | 'DIRECT'
  ): BattleReplayState {
    const attackerDuelist = this.getDuelist(this.activePlayerId);
    const defenderDuelist = this.getOpponent(this.activePlayerId);

    const attackerSlot = attackerDuelist.monsterZones[attackerSlotIndex];

    if (!attackerSlot || !attackerSlot.card) {
      throw new Error('Không tìm thấy quái thú tấn công để tạo Battle Replay');
    }

    const currentDefenderCount = defenderDuelist.monsterZones.filter(s => s && s.card).length;
    const eligibleTargetSlots: number[] = [];
    defenderDuelist.monsterZones.forEach((slot, idx) => {
      if (slot && slot.card) {
        eligibleTargetSlots.push(idx);
      }
    });

    const isFluorineMaxOx = attackerSlot.card.def.effectCode === 'ELEM_F_MAX_OX';
    const onlyDefenseMonsters = defenderDuelist.monsterZones.every(s => !s || !s.card || s.position !== 'FACE_UP_ATTACK');
    const canDirectAttack = currentDefenderCount === 0 || (isFluorineMaxOx && onlyDefenseMonsters);

    const reason = `Số lượng quái thú trên sân đối phương đã thay đổi trong Battle Step (từ ${initialDefenderCount} thành ${currentDefenderCount})!`;

    const replayState: BattleReplayState = {
      isActive: true,
      attackerSlotIndex,
      attackerCardUid: attackerSlot.card.uid,
      attackerCardName: attackerSlot.card.def.name,
      attackerAtk: (attackerSlot.card.def.atk || 0) + attackerSlot.tempAtkBoost,
      initialDefenderCount,
      currentDefenderCount,
      eligibleTargetSlots,
      canDirectAttack,
      triggerReason: reason
    };

    this.activeReplayState = replayState;

    this.addLog(
      'SYSTEM',
      `[QUY TẮC ĐÁNH LẠI (BATTLE REPLAY)] ${reason} Đòn tấn công tạm dừng. Người chơi có quyền: (1) Chọn lại mục tiêu mới, (2) Tấn công trực tiếp (nếu đối thủ không còn quái thú), hoặc (3) Hủy bỏ đòn tấn công an toàn.`,
      'INFO'
    );

    return replayState;
  }

  /**
   * Evaluates or manually checks if a Battle Replay condition is met (Rulebook v10 tr. 40)
   */
  public triggerBattleReplayCheck(
    attackerSlotIndex: number,
    initialDefenderCount: number,
    originalTarget: number | 'DIRECT'
  ): BattleReplayState | null {
    const defenderDuelist = this.getOpponent(this.activePlayerId);
    const currentDefenderCount = defenderDuelist.monsterZones.filter(s => s && s.card).length;
    const targetMissing = originalTarget !== 'DIRECT' && (
      !defenderDuelist.monsterZones[originalTarget] ||
      !defenderDuelist.monsterZones[originalTarget]?.card
    );

    if (currentDefenderCount !== initialDefenderCount || targetMissing) {
      return this.initiateBattleReplay(attackerSlotIndex, initialDefenderCount, originalTarget);
    }
    return null;
  }

  /**
   * Executes the attacking player's decision during a Battle Step Replay (Rulebook v10 tr. 40)
   */
  public executeBattleReplay(
    decision: 'RETARGET' | 'DIRECT' | 'CANCEL',
    newTargetSlotIndex?: number
  ): AttackDeclarationResult {
    if (!this.activeReplayState || !this.activeReplayState.isActive) {
      return {
        success: false,
        message: 'Hiện không có tình huống Đánh Lại (Battle Replay) nào đang diễn ra!',
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    const attackerDuelist = this.getDuelist(this.activePlayerId);
    const defenderDuelist = this.getOpponent(this.activePlayerId);

    // Master Rule: Check for Turn-based Attack Prohibition lingering effects (Rulebook v10 tr. 54)
    if (decision !== 'CANCEL' && this.hasLingeringEffect(this.activePlayerId, 'ATTACK_PROHIBITION')) {
      const activeEffects = this.getLingeringEffects(this.activePlayerId).filter(e => e.effectType === 'ATTACK_PROHIBITION');
      const effectName = activeEffects.length > 0 ? activeEffects[0].sourceCardName : 'Lưới Khí Trơ Phong Tỏa';
      this.addLog(
        attackerDuelist.name,
        `[Phong Tỏa Tấn Công - Rulebook v10 tr. 54] Không thể tuyên bố tấn công do đang chịu hiệu ứng duy trì từ "${effectName}"!`,
        'INFO'
      );
      return {
        success: false,
        message: `Không thể tuyên bố tấn công do đang chịu hiệu ứng duy trì từ "${effectName}"!`,
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }
    const attackerSlotIndex = this.activeReplayState.attackerSlotIndex;
    const attackerSlot = attackerDuelist.monsterZones[attackerSlotIndex];

    if (!attackerSlot || !attackerSlot.card || attackerSlot.card.uid !== this.activeReplayState.attackerCardUid) {
      this.activeReplayState = null;
      return {
        success: false,
        message: 'Quái thú tuyên bố tấn công ban đầu không còn tồn tại trên sân!',
        damageDealt: 0,
        attackerDestroyed: true,
        targetDestroyed: false,
        directAttack: false
      };
    }

    if (decision === 'CANCEL') {
      const cardName = attackerSlot.card.def.name;
      attackerSlot.hasAttackedThisTurn = true;
      this.activeReplayState = null;
      this.addLog(
        attackerDuelist.name,
        `[QUY TẮC ĐÁNH LẠI (REPLAY)] ${attackerDuelist.name} quyết định HỦY đòn tấn công của [${cardName}] an toàn! Quái thú không vào Damage Step và không chịu sát thương.`,
        'ATTACK'
      );
      return {
        success: true,
        message: `Đã hủy đòn tấn công của [${cardName}] an toàn!`,
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    if (decision === 'DIRECT') {
      if (!this.activeReplayState.canDirectAttack) {
        return {
          success: false,
          message: 'Không thể tấn công trực tiếp khi đối phương vẫn còn quái thú trấn giữ sân!',
          damageDealt: 0,
          attackerDestroyed: false,
          targetDestroyed: false,
          directAttack: false
        };
      }
      this.activeReplayState = null;
      attackerSlot.hasAttackedThisTurn = true;
      return this.resolveDamageStep(attackerSlotIndex, 'DIRECT');
    }

    if (decision === 'RETARGET') {
      if (newTargetSlotIndex === undefined || !this.activeReplayState.eligibleTargetSlots.includes(newTargetSlotIndex)) {
        return {
          success: false,
          message: 'Mục tiêu tấn công mới được chọn không hợp lệ hoặc không có quái thú!',
          damageDealt: 0,
          attackerDestroyed: false,
          targetDestroyed: false,
          directAttack: false
        };
      }
      this.activeReplayState = null;
      attackerSlot.hasAttackedThisTurn = true;
      return this.resolveDamageStep(attackerSlotIndex, newTargetSlotIndex);
    }

    return {
      success: false,
      message: 'Quyết định Đánh Lại không hợp lệ!',
      damageDealt: 0,
      attackerDestroyed: false,
      targetDestroyed: false,
      directAttack: false
    };
  }

  /**
   * AI Autonomous Battle Replay Solver
   * Evaluates optimal tactic: Direct Attack > Destroy Enemy Monster > Cancel Attack Safely
   */
  public aiResolveBattleReplay(): AttackDeclarationResult {
    if (!this.activeReplayState || !this.activeReplayState.isActive) {
      return {
        success: false,
        message: 'AI không có tình huống Replay nào để xử lý!',
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    const replay = this.activeReplayState;
    const aiDuelist = this.getDuelist(this.activePlayerId);
    const opponentDuelist = this.getOpponent(this.activePlayerId);
    const attackerSlot = aiDuelist.monsterZones[replay.attackerSlotIndex];

    if (!attackerSlot || !attackerSlot.card) {
      return this.executeBattleReplay('CANCEL');
    }

    // Direct Attack priority if opponent board cleared
    if (replay.canDirectAttack) {
      return this.executeBattleReplay('DIRECT');
    }

    // Evaluate available enemy monsters
    const attackerAtk = (attackerSlot.card.def.atk || 0) + attackerSlot.tempAtkBoost;
    let bestTargetSlot: number | null = null;
    let maxKillScore = -9999;

    for (const slotIdx of replay.eligibleTargetSlots) {
      const defenderSlot = opponentDuelist.monsterZones[slotIdx];
      if (!defenderSlot || !defenderSlot.card) continue;

      if (defenderSlot.position === 'FACE_UP_ATTACK') {
        const defAtk = (defenderSlot.card.def.atk || 0) + defenderSlot.tempAtkBoost;
        if (attackerAtk > defAtk) {
          const score = (attackerAtk - defAtk) + 500;
          if (score > maxKillScore) {
            maxKillScore = score;
            bestTargetSlot = slotIdx;
          }
        }
      } else {
        const defDef = (defenderSlot.card.def.def || 0) + defenderSlot.tempDefBoost;
        if (attackerAtk > defDef) {
          const score = 250;
          if (score > maxKillScore) {
            maxKillScore = score;
            bestTargetSlot = slotIdx;
          }
        }
      }
    }

    if (bestTargetSlot !== null) {
      return this.executeBattleReplay('RETARGET', bestTargetSlot);
    } else {
      // Tactical retreat: avoid destroying attacker against stronger enemy
      return this.executeBattleReplay('CANCEL');
    }
  }

  /**
   * Helper to cancel an active replay safely
   */
  public cancelBattleReplay(): boolean {
    return this.executeBattleReplay('CANCEL').success;
  }

  /**
   * Damage Step Execution Engine (Rulebook v10 tr. 41-43)
   * Resolves the 5 chronological Damage Substeps.
   */
  public resolveDamageStep(
    attackerSlotIndex: number,
    targetSlotIndex: number | 'DIRECT'
  ): AttackDeclarationResult {
    const attackerDuelist = this.getDuelist(this.activePlayerId);
    const defenderDuelist = this.getOpponent(this.activePlayerId);

    const attackerSlot = attackerDuelist.monsterZones[attackerSlotIndex];
    if (!attackerSlot || !attackerSlot.card) {
      return { success: false, message: 'Không có quái thú tấn công tại ô này!', damageDealt: 0, attackerDestroyed: false, targetDestroyed: false, directAttack: false };
    }

    const attackerCard = attackerSlot.card;

    // Master Rule: Control Transfer Attack Prohibition Check (Rulebook v10 tr. 47)
    const activeTransfer = this.activeControlTransfers.find(r => r.cardUid === attackerCard.uid);
    if (activeTransfer && activeTransfer.canAttack === false) {
      this.addLog(
        attackerDuelist.name,
        `[Vi Phạm Master Rule - Rulebook v10 tr. 47] Quái thú [${attackerCard.def.name}] đang trong trạng thái chuyển giao quyền kiểm soát không thể tuyên bố tấn công!`,
        'INFO'
      );
      return {
        success: false,
        message: `[Vi Phạm Master Rule - Rulebook v10 tr. 47] Quái thú [${attackerCard.def.name}] đang trong trạng thái chuyển giao quyền kiểm soát không thể tuyên bố tấn công!`,
        damageDealt: 0,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: false
      };
    }

    // Master Rule: Level 4+ Attack Restriction Check (Gravity Bind / Ultracentrifugal Sedimentation - Rulebook v10 tr. 25)
    if (this.isGravityBindActive()) {
      const attackerLevel = this.getMonsterLevel(attackerCard);
      if (attackerLevel !== undefined && attackerLevel >= 4) {
        this.addLog(
          attackerDuelist.name,
          `[Bẫy Ly Tâm Lắng Cặn - Rulebook v10 tr. 25] Quái thú [${attackerCard.def.name}] có Cấp độ ${attackerLevel} (>= 4) bị phong tỏa tấn công bởi Bẫy Ly Tâm! (Quái thú Xyz/Link không có Cấp độ nên được miễn nhiễm).`,
          'INFO'
        );
        return {
          success: false,
          message: `[Bẫy Ly Tâm Lắng Cặn - Rulebook v10 tr. 25] Quái thú [${attackerCard.def.name}] có Cấp độ ${attackerLevel} (>= 4) bị phong tỏa tấn công bởi Bẫy Ly Tâm!`,
          damageDealt: 0,
          attackerDestroyed: false,
          targetDestroyed: false,
          directAttack: false
        };
      }
    }

    const envAttackerMod = ChemicalEnvironmentEngine.calculateCombatModifiers(
      this.environment,
      attackerCard.def.cardType,
      attackerCard.def.attribute,
      attackerCard.def.chemicalFormula
    );

    // Dynamic field buffs:
    // Friendly Oxygen increases allied Pyro monsters' ATK by +300
    let fieldSynergyAtk = 0;
    if (attackerCard.def.attribute === 'PYRO') {
      const hasFriendlyOxygen = attackerDuelist.monsterZones.some(s => s && s.card && s.card.def.chemicalFormula === 'O');
      if (hasFriendlyOxygen) fieldSynergyAtk += 300;
      const hasEnemyBromine = defenderDuelist.monsterZones.some(s => s && s.card && s.card.def.chemicalFormula === 'Br');
      if (hasEnemyBromine) fieldSynergyAtk -= 300;
    }

    const attackerAtk = Math.max(0, (attackerCard.def.atk || 0) + attackerSlot.tempAtkBoost + envAttackerMod.atkBoost + fieldSynergyAtk);
    if (envAttackerMod.specialPerks.length > 0) {
      this.addLog(attackerDuelist.name, `[Hiệu Ứng Môi Trường: ${envAttackerMod.specialPerks.join('; ')}]`, 'INFO');
    }

    // Direct Attack Resolution
    if (targetSlotIndex === 'DIRECT') {
      this.currentDamageStepSubstep = 1;
      const hasDefenders = defenderDuelist.monsterZones.some(s => s && s.card);
      if (hasDefenders) {
        // Fluorine (F) absolute electronegativity override: Can attack directly if opponent only has defense position monsters!
        const onlyDefenseMonsters = defenderDuelist.monsterZones.every(s => !s || !s.card || s.position !== 'FACE_UP_ATTACK');
        const isFluorineMaxOx = attackerCard.def.effectCode === 'ELEM_F_MAX_OX';
        if (!isFluorineMaxOx || !onlyDefenseMonsters) {
          this.currentDamageStepSubstep = 0;
          return { success: false, message: 'Đối phương vẫn còn quái thú phòng thủ trên sân! Phải tấn công quái thú trước.', damageDealt: 0, attackerDestroyed: false, targetDestroyed: false, directAttack: false };
        }
        this.addLog(attackerDuelist.name, `[Độ Âm Điện Tuyệt Đối F] Flo xuyên thủng mọi phòng tuyến phòng thủ để tấn công trực tiếp!`, 'CHEMICAL_REACTION', 'F₂ + 2e⁻ → 2F⁻');
      }

      this.currentDamageStepSubstep = 3;
      // Deal Direct Damage
      defenderDuelist.lp = Math.max(0, defenderDuelist.lp - attackerAtk);
      this.recordGameEvent('BATTLE_DAMAGE_DEALT', {
        duelistId: defenderDuelist.id,
        cardUid: attackerCard.uid,
        cardName: attackerCard.def.name,
        damage: attackerAtk
      });

      this.addLog(
        attackerDuelist.name,
        `[TẤN CÔNG TRỰC TIẾP] [${attackerCard.def.name}] giáng đòn chí mạng trực tiếp! ${defenderDuelist.name} chịu ${attackerAtk} LP sát thương (Còn ${defenderDuelist.lp} LP)!`,
        'ATTACK'
      );

      // Sulfur direct burn effect
      if (attackerCard.def.effectCode === 'ELEM_S_BURN') {
        defenderDuelist.lp = Math.max(0, defenderDuelist.lp - 300);
        this.addLog(attackerDuelist.name, `[Hỏa Thần Núi Lửa S] Khí SO₂ thiêu đốt đối thủ nhận thêm 300 LP sát thương hiệu ứng!`, 'CHEMICAL_REACTION', 'S + O₂ → SO₂');
      }

      this.checkWinConditions();

      const damageSubsteps: string[] = [
        'Mốc 1: Bắt Đầu Damage Step (Start of Damage Step)',
        'Mốc 2: Trước Tính Toán (Before Damage Calc - Trực diện đối thủ)',
        `Mốc 3: Tính Sát Thương Trực Tiếp (-${attackerAtk} LP)`,
        'Mốc 4: Sau Tính Toán (Hoàn tất truyền xung lực)',
        'Mốc 5: Kết Thúc Damage Step (Cập nhật điểm gốc LP)'
      ];

      this.currentDamageStepSubstep = 0;
      return {
        success: true,
        message: 'Tấn công trực tiếp thành công!',
        damageDealt: attackerAtk,
        attackerDestroyed: false,
        targetDestroyed: false,
        directAttack: true,
        scientificExplanation: attackerCard.def.scientificLore,
        damageSubsteps
      };
    }

    // Attack Target Monster Resolution
    const defenderSlot = defenderDuelist.monsterZones[targetSlotIndex];
    if (!defenderSlot || !defenderSlot.card) {
      this.currentDamageStepSubstep = 0;
      return { success: false, message: 'Mục tiêu tấn công không tồn tại!', damageDealt: 0, attackerDestroyed: false, targetDestroyed: false, directAttack: false };
    }

    const defenderCard = defenderSlot.card;

    // Neon Plasma Glow: Blinds attacker reducing attacker ATK by 500
    if (defenderCard.def.effectCode === 'ELEM_NE_GLOW') {
      attackerSlot.tempAtkBoost -= 500;
      this.addLog(defenderDuelist.name, `[Lăng Kính Plasma Neon] Ánh sáng đỏ rực làm chói mắt, giảm 500 ATK của [${attackerCard.def.name}]!`, 'CHEMICAL_REACTION');
    }

    const envDefenderMod = ChemicalEnvironmentEngine.calculateCombatModifiers(
      this.environment,
      defenderCard.def.cardType,
      defenderCard.def.attribute,
      defenderCard.def.chemicalFormula
    );

    // Defender Calcium Guard: Friendly element monsters get +200 DEF in defense position
    let defenderFieldDefBonus = 0;
    const hasDefenderCalcium = defenderDuelist.monsterZones.some(s => s && s.card && s.card.def.chemicalFormula === 'Ca' && s.position !== 'FACE_UP_ATTACK');
    if (hasDefenderCalcium && defenderCard.def.chemicalFormula !== 'Ca') {
      defenderFieldDefBonus += 200;
    }

    let attackerDestroyed = false;
    let targetDestroyed = false;
    let damageDealt = 0;
    let isPiercingDamage = false;
    let piercingDamageDealt = 0;
    let reflectionDamageDealt = 0;

    // Damage Step Substep 1: Start of Damage Step
    this.currentDamageStepSubstep = 1;
    this.addLog('SYSTEM', '[Damage Step - Mốc 1: Bắt Đầu] Bước vào tính toán giao chiến.', 'INFO');

    // Damage Step Substep 2: Before Damage Calculation (Flip Face-down defense monsters)
    this.currentDamageStepSubstep = 2;
    const wasFaceDown = defenderSlot.position === 'FACE_DOWN_DEFENSE';
    if (wasFaceDown) {
      defenderSlot.position = 'FACE_UP_DEFENSE';
      this.addLog(
        defenderDuelist.name,
        `[Damage Step - Mốc 2: Trước Tính Toán] Lật ngửa [${defenderCard.def.name}] sang tư thế Phòng Thủ Ngửa Mặt!`,
        'INFO'
      );
    }

    // Damage Step Substep 3: Perform Damage Calculation
    this.currentDamageStepSubstep = 3;
    const defenderAtk = Math.max(0, (defenderCard.def.atk || 0) + defenderSlot.tempAtkBoost + envDefenderMod.atkBoost);
    const defenderDef = Math.max(0, (defenderCard.def.def || 0) + defenderSlot.tempDefBoost + envDefenderMod.defBoost + defenderFieldDefBonus);

    if (defenderSlot.position === 'FACE_UP_ATTACK') {
      // ATK vs ATK (Rulebook v10 tr. 41)
      this.addLog(
        attackerDuelist.name,
        `[GIAO TRANH] [${attackerCard.def.name}] (ATK ${attackerAtk}) đối đầu với [${defenderCard.def.name}] (ATK ${defenderAtk})!`,
        'ATTACK'
      );

      if (attackerAtk > defenderAtk) {
        damageDealt = attackerAtk - defenderAtk;
        targetDestroyed = true;
      } else if (attackerAtk < defenderAtk) {
        damageDealt = defenderAtk - attackerAtk;
        attackerDestroyed = true;
      } else {
        // Equal ATK: Rulebook v10 tr. 50: Monsters with 0 ATK cannot destroy anything by battle
        if (attackerAtk === 0 && defenderAtk === 0) {
          attackerDestroyed = false;
          targetDestroyed = false;
          damageDealt = 0;
        } else {
          attackerDestroyed = true;
          targetDestroyed = true;
          damageDealt = 0;
        }
      }
    } else {
      // ATK vs DEF (Rulebook v10 tr. 42-43)
      this.addLog(
        attackerDuelist.name,
        `[CÔNG THÀNH] [${attackerCard.def.name}] (ATK ${attackerAtk}) tấn công [${defenderCard.def.name}] (DEF ${defenderDef})!`,
        'ATTACK'
      );

      // Master Rule: Check Piercing Battle Damage (Rulebook v10 tr. 42)
      const hasPiercing = !!(
        attackerCard.def.piercingDamage ||
        attackerSlot.hasPiercingDamage ||
        attackerSlot.equippedCards?.some(eq => eq.def.piercingDamage || eq.def.effectCode === 'EQUIP_PIERCING_DRILL') ||
        attackerCard.def.effectCode === 'COMP_HCL_DISSOLVE'
      );

      if (attackerAtk > defenderDef) {
        targetDestroyed = true;
        if (hasPiercing) {
          const pierceAmount = attackerAtk - defenderDef;
          damageDealt = pierceAmount;
          isPiercingDamage = true;
          piercingDamageDealt = pierceAmount;
        } else {
          damageDealt = 0;
        }
      } else if (attackerAtk < defenderDef) {
        damageDealt = defenderDef - attackerAtk;
        reflectionDamageDealt = damageDealt;
      } else {
        damageDealt = 0;
      }
    }

    // Damage Step Substep 4: After Damage Calculation (Inflict Battle Damage, FLIP Effects & Protective Shields)
    if (defenderSlot.position === 'FACE_UP_ATTACK') {
      if (attackerAtk > defenderAtk) {
        defenderDuelist.lp = Math.max(0, defenderDuelist.lp - damageDealt);
        this.recordGameEvent('BATTLE_DAMAGE_DEALT', {
          duelistId: defenderDuelist.id,
          cardUid: attackerCard.uid,
          cardName: attackerCard.def.name,
          damage: damageDealt
        });
        this.addLog(
          attackerDuelist.name,
          `Tiêu diệt [${defenderCard.def.name}]! ${defenderDuelist.name} nhận ${damageDealt} LP sát thương.`,
          'DAMAGE'
        );
      } else if (attackerAtk < defenderAtk) {
        attackerDuelist.lp = Math.max(0, attackerDuelist.lp - damageDealt);
        this.recordGameEvent('BATTLE_DAMAGE_DEALT', {
          duelistId: attackerDuelist.id,
          cardUid: defenderCard.uid,
          cardName: defenderCard.def.name,
          damage: damageDealt
        });
        this.addLog(
          defenderDuelist.name,
          `[${defenderCard.def.name}] phản kích tiêu diệt [${attackerCard.def.name}]! ${attackerDuelist.name} nhận ${damageDealt} LP sát thương.`,
          'DAMAGE'
        );
      } else {
        if (attackerAtk === 0 && defenderAtk === 0) {
          this.addLog(
            'SYSTEM',
            `[Quy Tắc 0 ATK] Cả hai quái thú cùng có 0 ATK trong giao chiến, không quái thú nào bị tiêu diệt!`,
            'ATTACK'
          );
        } else {
          this.addLog(
            'SYSTEM',
            `Hai bên đồng quy vu tận! Cả [${attackerCard.def.name}] và [${defenderCard.def.name}] đều bị tiêu diệt!`,
            'ATTACK'
          );
        }
      }
    } else {
      if (attackerAtk > defenderDef) {
        if (isPiercingDamage) {
          defenderDuelist.lp = Math.max(0, defenderDuelist.lp - piercingDamageDealt);
          this.recordGameEvent('BATTLE_DAMAGE_DEALT', {
            duelistId: defenderDuelist.id,
            cardUid: attackerCard.uid,
            cardName: attackerCard.def.name,
            damage: piercingDamageDealt
          });
          this.addLog(
            attackerDuelist.name,
            `[SÁT THƯƠNG XUYÊN GIÁP (PIERCING DAMAGE)] [${attackerCard.def.name}] đâm xuyên qua lớp phòng thủ của [${defenderCard.def.name}]! ${defenderDuelist.name} nhận ${piercingDamageDealt} LP sát thương xuyên giáp (Còn ${defenderDuelist.lp} LP)!`,
            'DAMAGE'
          );
        } else {
          this.addLog(
            attackerDuelist.name,
            `Phá vỡ phòng tuyến! Tiêu diệt quái thú phòng thủ [${defenderCard.def.name}]. (Không gây sát thương chiến đấu)`,
            'ATTACK'
          );
        }
      } else if (attackerAtk < defenderDef) {
        attackerDuelist.lp = Math.max(0, attackerDuelist.lp - reflectionDamageDealt);
        this.recordGameEvent('BATTLE_DAMAGE_DEALT', {
          duelistId: attackerDuelist.id,
          cardUid: defenderCard.uid,
          cardName: defenderCard.def.name,
          damage: reflectionDamageDealt
        });
        this.addLog(
          defenderDuelist.name,
          `Giáp phòng thủ kiên cố! Đòn tấn công bị bật ngược lại, ${attackerDuelist.name} nhận ${reflectionDamageDealt} LP sát thương phản kích! (Còn ${attackerDuelist.lp} LP)`,
          'DAMAGE'
        );
      } else {
        this.addLog('SYSTEM', `Đòn đánh không xuyên thủng được lớp giáp phòng thủ. Cả hai đều an toàn.`, 'ATTACK');
      }
    }

    // Substep 4 FLIP effect triggers (Rulebook v10 tr. 43)
    this.currentDamageStepSubstep = 4;
    if (wasFaceDown) {
      this.checkFlipEffect(defenderDuelist.id, defenderCard, targetSlotIndex);
    }

    // Post-Combat Element Survival Shields (applied before GY transit):
    // 1. Aluminum Passivation Shield (first destruction avoided per turn)
    if (targetDestroyed && defenderCard.def.effectCode === 'ELEM_AL_PASSIVATION' && !defenderSlot.passivationShieldUsed) {
      defenderSlot.passivationShieldUsed = true;
      targetDestroyed = false;
      this.addLog(defenderDuelist.name, `[Khiên Thụ Động Hóa Al₂O₃] Lớp màng oxit bền vững ngăn chặn phá hủy đòn đánh đầu tiên trong lượt!`, 'CHEMICAL_REACTION', '4Al + 3O₂ → 2Al₂O₃');
    }

    // 2. Helium Inert Octet Shield (first battle destruction in defense avoided per turn)
    if (targetDestroyed && defenderCard.def.effectCode === 'ELEM_HE_INERT' && defenderSlot.position !== 'FACE_UP_ATTACK' && !defenderSlot.inertShieldUsed) {
      defenderSlot.inertShieldUsed = true;
      targetDestroyed = false;
      this.addLog(defenderDuelist.name, `[Khiên Bát Tử Trơ Tuyệt Đối He] Lớp vỏ 1s² bão hòa bảo vệ Heli không bị tiêu diệt bởi chiến đấu!`, 'CHEMICAL_REACTION');
    }

    // 3. Chlorine Oxidation: After destroying an enemy monster, reduce another enemy monster's ATK by 400
    if (targetDestroyed && attackerCard.def.effectCode === 'ELEM_CL_OXIDIZE') {
      const otherEnemySlot = defenderDuelist.monsterZones.find((s, idx) => s && s.card && idx !== targetSlotIndex);
      if (otherEnemySlot && otherEnemySlot.card) {
        otherEnemySlot.tempAtkBoost -= 400;
        this.addLog(attackerDuelist.name, `[Hắc Xà Ăn Mòn Cl] Khí Clo oxi hóa giảm 400 ATK của [${otherEnemySlot.card.def.name}]!`, 'CHEMICAL_REACTION', 'Cl₂ + 2e⁻ → 2Cl⁻');
      }
    }

    // Master Rule Battle Destruction Immunity Invariant (Rulebook v10 tr. 40-43)
    // Even if monster is protected from battle destruction, battle damage is still calculated and dealt!
    if (targetDestroyed && this.isMonsterProtectedFromBattle(defenderDuelist.id, targetSlotIndex)) {
      targetDestroyed = false;
      this.addLog(
        defenderDuelist.name,
        `[KHÁNG TIÊU DIỆT CHIẾN ĐẤU] [${defenderCard.def.name}] không thể bị tiêu diệt bởi chiến đấu! (Sát thương chiến đấu vẫn được trừ vào LP)`,
        'INFO'
      );
      this.recordGameEvent('BATTLE_DESTRUCTION_PREVENTED', {
        duelistId: defenderDuelist.id,
        cardUid: defenderCard.uid,
        cardName: defenderCard.def.name,
        reason: 'BATTLE_IMMUNITY'
      });
    }

    if (attackerDestroyed && this.isMonsterProtectedFromBattle(attackerDuelist.id, attackerSlotIndex)) {
      attackerDestroyed = false;
      this.addLog(
        attackerDuelist.name,
        `[KHÁNG TIÊU DIỆT CHIẾN ĐẤU] [${attackerCard.def.name}] không thể bị tiêu diệt bởi chiến đấu! (Sát thương phản kích vẫn được trừ vào LP)`,
        'INFO'
      );
      this.recordGameEvent('BATTLE_DESTRUCTION_PREVENTED', {
        duelistId: attackerDuelist.id,
        cardUid: attackerCard.uid,
        cardName: attackerCard.def.name,
        reason: 'BATTLE_IMMUNITY'
      });
    }

    // Damage Step Substep 5: End of Damage Step (Send destroyed monsters to GY & SEGOC floating triggers)
    this.currentDamageStepSubstep = 5;
    if (targetDestroyed) {
      this.cleanSlotXyzMaterials(defenderDuelist.id, targetSlotIndex);
      this.cleanSlotEquipCards(defenderDuelist.id, targetSlotIndex);
      this.sendCardToGraveyard(defenderDuelist.id, defenderCard, true);
      defenderDuelist.monsterZones[targetSlotIndex] = null;
      this.recordGameEvent('MONSTER_DESTROYED_BY_BATTLE', {
        duelistId: defenderDuelist.id,
        cardUid: defenderCard.uid,
        cardName: defenderCard.def.name
      });
      this.recordGameEvent('MONSTER_SENT_TO_GRAVEYARD', {
        duelistId: defenderDuelist.id,
        cardUid: defenderCard.uid,
        cardName: defenderCard.def.name,
        reason: 'BATTLE_DESTRUCTION'
      });
    }

    if (attackerDestroyed) {
      this.cleanSlotXyzMaterials(attackerDuelist.id, attackerSlotIndex);
      this.cleanSlotEquipCards(attackerDuelist.id, attackerSlotIndex);
      this.sendCardToGraveyard(attackerDuelist.id, attackerCard, true);
      attackerDuelist.monsterZones[attackerSlotIndex] = null;
      this.recordGameEvent('MONSTER_DESTROYED_BY_BATTLE', {
        duelistId: attackerDuelist.id,
        cardUid: attackerCard.uid,
        cardName: attackerCard.def.name
      });
      this.recordGameEvent('MONSTER_SENT_TO_GRAVEYARD', {
        duelistId: attackerDuelist.id,
        cardUid: attackerCard.uid,
        cardName: attackerCard.def.name,
        reason: 'BATTLE_DESTRUCTION'
      });
    }

    // 4. Lithium Battery Recharge: When destroyed, restore +1 Mana on owner's next turn
    if (attackerDestroyed && attackerCard.def.effectCode === 'ELEM_LI_BATTERY') {
      attackerDuelist.bonusManaNextTurn = (attackerDuelist.bonusManaNextTurn || 0) + 1;
      this.addLog(attackerDuelist.name, `[Tích Trữ Pin Liti] Phóng điện nạp dự trữ +1 Mana cho lượt kế tiếp!`, 'CHEMICAL_REACTION', 'Li → Li⁺ + e⁻');
    }
    if (targetDestroyed && defenderCard.def.effectCode === 'ELEM_LI_BATTERY') {
      defenderDuelist.bonusManaNextTurn = (defenderDuelist.bonusManaNextTurn || 0) + 1;
      this.addLog(defenderDuelist.name, `[Tích Trữ Pin Liti] Phóng điện nạp dự trữ +1 Mana cho lượt kế tiếp!`, 'CHEMICAL_REACTION', 'Li → Li⁺ + e⁻');
    }

    this.checkWinConditions();

    const damageSubsteps: string[] = [
      'Mốc 1: Bắt Đầu Damage Step (Start of Damage Step)',
      wasFaceDown ? `Mốc 2: Lật ngửa [${defenderCard.def.name}] sang Phòng Thủ` : 'Mốc 2: Trước Tính Toán (Before Damage Calc)',
      isPiercingDamage
        ? `Mốc 3: Tính Sát Thương Xuyên Giáp [Piercing] (ATK ${attackerAtk} - DEF ${defenderDef} = -${piercingDamageDealt} LP)`
        : reflectionDamageDealt > 0
          ? `Mốc 3: Tính Sát Thương Phản Kích [Reflection] (DEF ${defenderDef} - ATK ${attackerAtk} = -${reflectionDamageDealt} LP)`
          : `Mốc 3: Tính Sát Thương (${damageDealt > 0 ? `-${damageDealt} LP` : 'Hòa / 0 Sát thương'})`,
      'Mốc 4: Sau Tính Toán (Kích hoạt Hiệu Ứng Lật - FLIP)',
      `Mốc 5: Kết Thúc Damage Step (${targetDestroyed ? `Gửi [${defenderCard.def.name}] xuống GY` : attackerDestroyed ? `Gửi [${attackerCard.def.name}] xuống GY` : 'Cả hai bảo toàn'})`
    ];

    this.currentDamageStepSubstep = 0;

    return {
      success: true,
      message: isPiercingDamage
        ? `Giao tranh kết thúc. Sát thương xuyên giáp: -${piercingDamageDealt} LP!`
        : reflectionDamageDealt > 0
          ? `Giao tranh kết thúc. Phản đòn phòng thủ: -${reflectionDamageDealt} LP!`
          : 'Giao tranh kết thúc.',
      damageDealt,
      attackerDestroyed,
      targetDestroyed,
      directAttack: false,
      isPiercingDamage,
      piercingDamageDealt,
      reflectionDamageDealt,
      scientificExplanation: attackerCard.def.scientificLore,
      damageSubsteps
    };
  }

  // Master Rule: Distinction Between Destroy vs Send to GY vs Tribute vs Banish (Rulebook v10 tr. 52-55)
  public destroyMonster(
    duelistId: string,
    slotIndex: number,
    cause: 'BATTLE' | 'EFFECT' = 'EFFECT',
    isEmz: boolean = false
  ): { destroyed: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) {
      return { destroyed: false, message: 'Không có quái thú tại ô này!' };
    }
    const card = slot.card;

    // Rulebook v10 tr. 52: "Cannot be destroyed by card effects" immunity
    if (cause === 'EFFECT' && this.isMonsterProtectedFromCardEffects(duelistId, slotIndex, isEmz)) {
      this.addLog(
        duelist.name,
        `[KHÁNG HỦY HIỆU ỨNG] [${card.def.name}] không thể bị tiêu diệt bởi hiệu ứng thẻ bài!`,
        'INFO'
      );
      this.recordGameEvent('EFFECT_DESTRUCTION_PREVENTED', {
        duelistId,
        cardUid: card.uid,
        cardName: card.def.name,
        reason: 'EFFECT_IMMUNITY'
      });
      return { destroyed: false, message: `[${card.def.name}] kháng cự hiệu ứng tiêu diệt!` };
    }

    // Rulebook v10 tr. 40-43: "Cannot be destroyed by battle" immunity
    if (cause === 'BATTLE' && this.isMonsterProtectedFromBattle(duelistId, slotIndex, isEmz)) {
      this.addLog(
        duelist.name,
        `[KHÁNG TIÊU DIỆT CHIẾN ĐẤU] [${card.def.name}] không thể bị tiêu diệt bởi chiến đấu!`,
        'INFO'
      );
      this.recordGameEvent('BATTLE_DESTRUCTION_PREVENTED', {
        duelistId,
        cardUid: card.uid,
        cardName: card.def.name,
        reason: 'BATTLE_IMMUNITY'
      });
      return { destroyed: false, message: `[${card.def.name}] kháng cự tiêu diệt do chiến đấu!` };
    }

    if (isEmz) {
      duelist.extraMonsterZone = null;
    } else {
      this.cleanSlotXyzMaterials(duelistId, slotIndex);
      this.cleanSlotEquipCards(duelistId, slotIndex);
      duelist.monsterZones[slotIndex] = null;
    }
    this.sendCardToGraveyard(duelistId, card, true);
    this.recordGameEvent('MONSTER_DESTROYED', card, duelistId, { cause });
    this.recordGameEvent('SENT_TO_GRAVEYARD', card, duelistId, { reason: 'DESTROYED' });

    this.addLog(
      duelist.name,
      `[TIÊU DIỆT] [${card.def.name}] tại ${isEmz ? 'Vùng Quái Thú Bổ Sung (EMZ)' : `Ô ${slotIndex + 1}`} bị tiêu diệt bởi ${cause === 'BATTLE' ? 'chiến đấu' : 'hiệu ứng'}!`,
      'DAMAGE'
    );
    return { destroyed: true, message: `Tiêu diệt [${card.def.name}] thành công!` };
  }

  // Send Monster to Graveyard (Rulebook v10 tr. 54 - Bypasses destruction immunity)
  public sendMonsterToGraveyard(
    duelistId: string,
    slotIndex: number
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (slotIndex < 0 || slotIndex >= duelist.monsterZones.length) {
      return { success: false, message: 'Vị trí ô quái thú không hợp lệ!' };
    }
    const slot = duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không có quái thú tại ô này!' };
    }
    const card = slot.card;

    this.cleanSlotXyzMaterials(duelistId, slotIndex);
    this.cleanSlotEquipCards(duelistId, slotIndex);
    this.sendCardToGraveyard(duelistId, card, true);
    duelist.monsterZones[slotIndex] = null;
    this.recordGameEvent('SENT_TO_GRAVEYARD', card, duelistId, { reason: 'EFFECT_SEND' });

    this.addLog(
      duelist.name,
      `[GỬI XUỐNG MỘ] [${card.def.name}] bị gửi xuống Mộ Bài (Không tính là tiêu diệt, bỏ qua kháng hủy)!`,
      'INFO'
    );
    return { success: true, message: `Đã gửi [${card.def.name}] xuống Mộ Bài!` };
  }

  // Tribute Monster (Rulebook v10 tr. 53 - Bypasses destruction immunity)
  public tributeMonster(
    duelistId: string,
    slotIndex: number
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (slotIndex < 0 || slotIndex >= duelist.monsterZones.length) {
      return { success: false, message: 'Vị trí ô quái thú không hợp lệ!' };
    }
    const slot = duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không có quái thú tại ô này!' };
    }
    const card = slot.card;

    // Master Rule (Rulebook v10 tr. 47): Control transfer tribute prohibition check
    const activeTransfer = this.activeControlTransfers.find(r => r.cardUid === card.uid);
    if (activeTransfer && activeTransfer.canTribute === false) {
      return {
        success: false,
        message: `[Vi Phạm Master Rule - Rulebook v10 tr. 47] Quái thú [${card.def.name}] đang trong trạng thái chuyển giao quyền kiểm soát không thể đem đi hiến tế (Tribute)!`
      };
    }

    this.cleanSlotXyzMaterials(duelistId, slotIndex);
    this.cleanSlotEquipCards(duelistId, slotIndex);
    this.sendCardToGraveyard(duelistId, card, true);
    duelist.monsterZones[slotIndex] = null;
    this.recordGameEvent('TRIBUTED', card, duelistId);
    this.recordGameEvent('SENT_TO_GRAVEYARD', card, duelistId, { reason: 'TRIBUTE' });

    this.addLog(
      duelist.name,
      `[HIẾN TẾ] [${card.def.name}] được Hiến Tế làm vật hiến sinh (Không tính là tiêu diệt, bỏ qua kháng hủy)!`,
      'SUMMON'
    );
    return { success: true, message: `Đã hiến tế [${card.def.name}] thành công!` };
  }

  // Banish Monster (Rulebook v10 tr. 55 - Bypasses destruction immunity)
  public banishMonster(
    duelistId: string,
    slotIndex: number,
    faceDown: boolean = false
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (slotIndex < 0 || slotIndex >= duelist.monsterZones.length) {
      return { success: false, message: 'Vị trí ô quái thú không hợp lệ!' };
    }
    const slot = duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không có quái thú tại ô này!' };
    }
    const card = slot.card;

    this.cleanSlotXyzMaterials(duelistId, slotIndex);
    this.cleanSlotEquipCards(duelistId, slotIndex);
    duelist.monsterZones[slotIndex] = null;

    // Master Rule (Rulebook v10 tr. 48-49): Monster Tokens disappear completely when banished; they NEVER enter Banished Zone!
    if (card.isToken || card.def.isToken || card.def.cardType === 'TOKEN_MONSTER') {
      this.addLog(
        duelist.name,
        `[Quy Tắc Monster Token - Rulebook v10 tr. 48] Monster Token [${card.def.name}] bị trục xuất khỏi sân nhưng biến mất ngay lập tức (không vào Vùng Bị Loại)!`,
        'INFO'
      );
      return { success: true, message: `Monster Token [${card.def.name}] đã biến mất khỏi trận đấu!` };
    }

    card.isFaceDown = faceDown;
    duelist.banished.push(card);

    this.addLog(
      duelist.name,
      `[LOẠI BỎ KHỎI TRẬN ĐẤU] [${card.def.name}] bị trục xuất ${faceDown ? 'Úp Mặt' : 'Ngửa Mặt'} vào Vùng Bị Loại (Bỏ qua kháng hủy)!`,
      'INFO'
    );
    return { success: true, message: `Đã loại bỏ [${card.def.name}] khỏi trận đấu!` };
  }

  /**
   * Destroys a Spell/Trap card on the field (Rulebook v10 tr. 29, 52)
   */
  public destroySpellTrap(
    duelistId: string,
    slotIndex: number,
    cause: 'BATTLE' | 'EFFECT' = 'EFFECT'
  ): { destroyed: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (slotIndex < 0 || slotIndex >= duelist.spellTrapZones.length) {
      return { destroyed: false, message: 'Vị trí ô Phép/Bẫy không hợp lệ!' };
    }
    const slot = duelist.spellTrapZones[slotIndex];
    if (!slot || !slot.card) {
      return { destroyed: false, message: 'Không có lá bài Phép/Bẫy tại ô này!' };
    }
    const card = slot.card;

    if (cause === 'EFFECT' && (card.cannotBeDestroyedByCardEffects || card.def.cannotBeDestroyedByCardEffects || card.def.effectCode === 'IMMUNE_DESTROY')) {
      this.addLog(
        duelist.name,
        `[KHÁNG HỦY HIỆU ỨNG] [${card.def.name}] không thể bị tiêu diệt bởi hiệu ứng thẻ bài!`,
        'INFO'
      );
      return { destroyed: false, message: `[${card.def.name}] kháng cự hiệu ứng tiêu diệt!` };
    }

    // If it's an Equip Spell attached to a monster, remove from monster's equippedCards
    if (card.def.cardType === 'EQUIP_CATALYST' || card.def.spellTrapSubtype === 'EQUIP_SPELL') {
      const allSlots = [...duelist.monsterZones, ...this.getOpponent(duelistId).monsterZones];
      for (const mSlot of allSlots) {
        if (mSlot && mSlot.equippedCards) {
          const eqIdx = mSlot.equippedCards.findIndex(e => e.uid === card.uid);
          if (eqIdx !== -1) {
            mSlot.equippedCards.splice(eqIdx, 1);
            mSlot.hasPiercingDamage = !!(mSlot.card && (mSlot.card.def.piercingDamage || mSlot.card.def.effectCode === 'COMP_HCL_DISSOLVE'));
          }
        }
      }
    }

    duelist.spellTrapZones[slotIndex] = null;
    duelist.graveyard.push(card);

    this.addLog(
      duelist.name,
      `[TIÊU DIỆT PHÉP/BẪY] [${card.def.name}] tại ô ${slotIndex + 1} bị phá hủy và gửi xuống Mộ Bài!`,
      'SPELL'
    );
    return { destroyed: true, message: `Đã phá hủy [${card.def.name}] thành công!` };
  }

  /**
   * Checks whether a Continuous Spell/Trap, Field Spell, or Equip Spell remains face-up on field (Rulebook v10 tr. 29)
   */
  public isContinuousCardFaceUpOnField(duelistId: string, card: CardInstance): boolean {
    if (!card || !card.def) return false;
    const duelist = this.getDuelist(duelistId);
    const opponent = this.getOpponent(duelistId);

    if (card.def.cardType === 'FIELD_ENVIRONMENT') {
      return !!(duelist.fieldZone && duelist.fieldZone.uid === card.uid && !duelist.fieldZone.isFaceDown);
    }
    if (card.def.cardType === 'EQUIP_CATALYST' || card.def.spellTrapSubtype === 'EQUIP_SPELL') {
      const inST = duelist.spellTrapZones.some(s => s && s.card && s.card.uid === card.uid && s.isFaceUp);
      const onMyMon = duelist.monsterZones.some(s => s && s.equippedCards?.some(e => e.uid === card.uid));
      const onOppMon = opponent.monsterZones.some(s => s && s.equippedCards?.some(e => e.uid === card.uid));
      return inST || onMyMon || onOppMon;
    }
    // CONTINUOUS_SPELL or CONTINUOUS_TRAP
    return duelist.spellTrapZones.some(s => s && s.card && s.card.uid === card.uid && s.isFaceUp);
  }

  /**
   * Event-Driven Automatic Trap Detection and Triggering Engine
   * Grounded in Yu-Gi-Oh! Master Rules & ELEMENTA DCSM chemistry engine:
   * When an armed face-down Trap card exists on field (turnSet < currentTurn)
   * and a valid combat trigger occurs (Attack, Summon, Spell Cast, Damage Step),
   * the engine automatically detects and activates the Trap into the Chain Stack,
   * logs with [BẪY TỰ KÍCH HOẠT], and resolves the chain without manual prompt.
   */
  public checkAndAutoTriggerTraps(event: CombatEvent): AutoTrapTriggerResult {
    const reactorId = event.targetPlayerId || this.getOpponent(event.actorPlayerId).id;
    const reactor = this.getDuelist(reactorId);
    const actor = this.getDuelist(event.actorPlayerId);

    // If traps are locked by Barium BaSO4 precipitation this turn, reject trap activation
    if (reactor.trapsLockedTurn === this.currentTurn) {
      this.addLog(reactor.name, `[Bẫy Bị Phong Tỏa] Bẫy của ${reactor.name} bị phong tỏa bởi trầm tích Bari trong lượt này!`, 'INFO');
      return { triggered: false };
    }

    // ----------------------------------------------------
    // TRIGGER 1: ATTACK_DECLARED
    // ----------------------------------------------------
    if (event.type === 'ATTACK_DECLARED') {
      const attackerSlotIndex = event.sourceSlotIndex ?? -1;

      // Master Rule: Check for active face-up Continuous Traps (Rulebook v10 tr. 29)
      const faceUpNobleMembrane = reactor.spellTrapZones.find(s => s && s.card && s.isFaceUp && s.card.def.effectCode === 'TRAP_NOBLE_MEMBRANE_CONT');
      if (faceUpNobleMembrane && faceUpNobleMembrane.card && attackerSlotIndex >= 0) {
        const attackerSlot = actor.monsterZones[attackerSlotIndex];
        if (attackerSlot && attackerSlot.card) {
          attackerSlot.tempAtkBoost -= 500;
          this.addLog(
            reactor.name,
            `[BẪY TỰ KÍCH HOẠT] [Bẫy Duy Trì: Màng Trơ Khí Hiếm] Lớp vỏ electron bão hòa ns²np⁶ phát huy hiệu lực liên tục, giảm 500 ATK của [${attackerSlot.card.def.name}]!`,
            'TRAP',
            faceUpNobleMembrane.card.def.scientificLore
          );
        }
      }

      // Scan armed face-down traps
      for (let i = 0; i < reactor.spellTrapZones.length; i++) {
        const slot = reactor.spellTrapZones[i];
        if (slot && slot.card && !slot.isFaceUp && slot.card.def.cardType === 'TRAP') {
          const trapCard = slot.card;
          if (slot.turnSet >= this.currentTurn) continue; // Cannot activate on the exact turn set

          // 1. Noble Gas Shield: Negates attack and ends Battle Phase
          if (trapCard.def.effectCode === 'TRAP_NOBLE_SHIELD') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] tự động kích hoạt trước đòn tấn công của ${actor.name}! Vách ngăn khí hiếm trơ tuyệt đối hóa giải sát thương và kết thúc Battle Phase!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 3, undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              combatEnded: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          // 2. Precipitation Stun Trap: Forces attacker into Face-down Defense
          if (trapCard.def.effectCode === 'TRAP_PRECIPITATION') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] tự động tạo kết tủa Bari Sunfat BaSO₄ bao bọc quái thú tấn công, ép chuyển ngay sang tư thế Phòng Thủ Úp Mặt!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 2, attackerSlotIndex >= 0 ? attackerSlotIndex : undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              combatEnded: false,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          // 3. Cognitive Copper Trap (Cu + HCl): Reflects attack and burns 1000 LP
          if (trapCard.def.effectCode === 'TRAP_COGNITIVE_CU_HCL') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] phản đòn nhận thức hóa học! Cu đứng sau H₂ trong dãy điện hóa (E° = +0.34V > 0), hóa giải đòn tấn công và phản chấn 1000 LP!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 3, attackerSlotIndex >= 0 ? attackerSlotIndex : undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              combatEnded: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          // 4. Sodium Explosion: Explodes and destroys attacking monster
          if (trapCard.def.effectCode === 'TRAP_SODIUM_EXPLOSION') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] bùng nổ kim loại kiềm mãnh liệt khi đối phương tiếp cận, tiêu diệt quái thú tấn công!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 3, attackerSlotIndex >= 0 ? attackerSlotIndex : undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              attackerDestroyed: true,
              combatEnded: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          // 5. Ammonium Smoke Trap: Blinds attacker and reduces ATK by 600
          if (trapCard.def.effectCode === 'TRAP_AMMONIUM_SMOKE') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] màn khói trắng NH₄Cl tỏa ra đặc quánh, làm giảm 600 ATK và hóa giải đòn tấn công!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 2, attackerSlotIndex >= 0 ? attackerSlotIndex : undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              combatEnded: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          // 6. Passivation Armor: Forms protective oxide skin +1200 DEF
          if (trapCard.def.effectCode === 'TRAP_PASSIVATION') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] màng oxit thụ động Al₂O₃/Fe₃O₄ bao bọc tạo lá chắn gia tăng +1200 DEF!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 2, typeof event.targetSlotIndex === 'number' ? event.targetSlotIndex : undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: false,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          // 7. General ON_ATTACK_DECLARE
          if (trapCard.def.activationWindow === 'ON_ATTACK_DECLARE') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] Bẫy [${trapCard.def.name}] tự động kích hoạt khi đối thủ tuyên bố tấn công!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, trapCard.def.spellSpeed || 2, attackerSlotIndex >= 0 ? attackerSlotIndex : undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }
        }
      }

      // Quick-Play Spells set on prior turns reacting to attacks
      for (let i = 0; i < reactor.spellTrapZones.length; i++) {
        const slot = reactor.spellTrapZones[i];
        if (slot && slot.card && !slot.isFaceUp && slot.card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL') {
          const quickSpell = slot.card;
          if (slot.turnSet >= this.currentTurn) continue;

          if (quickSpell.def.effectCode === 'SPELL_NEUTRALIZE') {
            reactor.spellTrapZones[i] = null;
            this.addLog(reactor.name, `[BẪY TỰ KÍCH HOẠT] Phép Tốc Độ [${quickSpell.def.name}] tự động trung hòa đòn tấn công!`, 'SPELL');
            this.pushChain(quickSpell, reactorId, 2, attackerSlotIndex >= 0 ? attackerSlotIndex : undefined, `[BẪY TỰ KÍCH HOẠT] ${quickSpell.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              trapName: quickSpell.def.name,
              trapCardUid: quickSpell.uid
            };
          }
        }
      }
    }

    // ----------------------------------------------------
    // TRIGGER 2: MONSTER_SUMMONED
    // ----------------------------------------------------
    if (event.type === 'MONSTER_SUMMONED') {
      const summonedSlotIndex = typeof event.targetSlotIndex === 'number' ? event.targetSlotIndex : undefined;
      const summonedCard = event.sourceCard;

      for (let i = 0; i < reactor.spellTrapZones.length; i++) {
        const slot = reactor.spellTrapZones[i];
        if (slot && slot.card && !slot.isFaceUp && slot.card.def.cardType === 'TRAP') {
          const trapCard = slot.card;
          if (slot.turnSet >= this.currentTurn) continue;

          // Ammonium Smoke on summon (Trap Hole equivalent)
          if (trapCard.def.effectCode === 'TRAP_AMMONIUM_SMOKE') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] tự động kích hoạt khi [${summonedCard?.def.name || 'Quái thú'}] vừa bước vào chiến trường! Khói trắng NH₄Cl mù mịt giảm 600 ATK!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 2, summonedSlotIndex, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          // Precipitation Trap on summon: forces summoned monster to face-down defense
          if (trapCard.def.effectCode === 'TRAP_PRECIPITATION') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] tự động kết tủa BaSO₄ giam giữ [${summonedCard?.def.name || 'Quái thú'}] vào tư thế Phòng Thủ Úp Mặt!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 2, summonedSlotIndex, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          if (trapCard.def.activationWindow === 'ON_MONSTER_SUMMON' || trapCard.def.activationWindow === 'ON_SUMMON') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] Bẫy [${trapCard.def.name}] tự động kích hoạt khi quái thú đối phương được triệu hồi!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, trapCard.def.spellSpeed || 2, summonedSlotIndex, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }
        }
      }
    }

    // ----------------------------------------------------
    // TRIGGER 3: SPELL_ACTIVATED
    // ----------------------------------------------------
    if (event.type === 'SPELL_ACTIVATED') {
      const spellCard = event.sourceCard;

      for (let i = 0; i < reactor.spellTrapZones.length; i++) {
        const slot = reactor.spellTrapZones[i];
        if (slot && slot.card && !slot.isFaceUp && slot.card.def.cardType === 'TRAP') {
          const trapCard = slot.card;
          if (slot.turnSet >= this.currentTurn) continue;

          // Le Chatelier Counter Trap (Spell Speed 3)
          if (trapCard.def.effectCode === 'TRAP_LE_CHATELIER_COUNTER') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] Bẫy Phản Kháng Tốc Độ 3 tự động chuyển dịch cân bằng hóa giải hoàn toàn lá bài Phép [${spellCard?.def.name || 'Phép'}]!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 3, undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          // Cognitive Copper Trap on spell activation
          if (trapCard.def.effectCode === 'TRAP_COGNITIVE_CU_HCL') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] [${trapCard.def.name}] Bẫy Nhận Thức tự động vô hiệu hóa thẻ Phép [${spellCard?.def.name || 'Phép'}] và trừ 1000 LP đối thủ!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, 3, undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }

          if (trapCard.def.activationWindow === 'ON_SPELL_CAST') {
            reactor.spellTrapZones[i] = null;
            this.addLog(
              reactor.name,
              `[BẪY TỰ KÍCH HOẠT] Bẫy [${trapCard.def.name}] tự động đáp trả kích hoạt Phép của đối thủ!`,
              'TRAP',
              trapCard.def.scientificLore
            );
            this.pushChain(trapCard, reactorId, trapCard.def.spellSpeed || 2, undefined, `[BẪY TỰ KÍCH HOẠT] ${trapCard.def.name}`);
            this.resolveChain();
            return {
              triggered: true,
              actionNegated: true,
              trapName: trapCard.def.name,
              trapCardUid: trapCard.uid,
              trapEffectCode: trapCard.def.effectCode
            };
          }
        }
      }
    }

    return { triggered: false };
  }

  private checkDefenderTrapReaction(defenderId: string, attackerSlotIndex: number): boolean {
    const res = this.checkAndAutoTriggerTraps({
      type: 'ATTACK_DECLARED',
      actorPlayerId: this.activePlayerId,
      targetPlayerId: defenderId,
      sourceSlotIndex: attackerSlotIndex
    });
    return res.triggered && Boolean(res.actionNegated);
  }

  public attackMonster(
    attackerSlotIndex: number,
    targetSlotIndex: number,
    isEmzAttacker: boolean = false
  ): AttackDeclarationResult {
    return this.declareAttack(attackerSlotIndex, targetSlotIndex, isEmzAttacker);
  }

  public attackDirect(
    attackerSlotIndex: number,
    isEmzAttacker: boolean = false
  ): AttackDeclarationResult {
    return this.declareAttack(attackerSlotIndex, 'DIRECT', isEmzAttacker);
  }

  public summonMonster(
    duelistId: string,
    handCardUid: string,
    position: MonsterBattlePosition = 'FACE_UP_ATTACK',
    tributeSlotIndices: number[] = [],
    preferredTargetSlotIndex?: number
  ): { success: boolean; message: string } {
    return this.normalSummon(duelistId, handCardUid, position, tributeSlotIndices, preferredTargetSlotIndex);
  }

  /**
   * Evaluates whether a card can be activated during the Damage Step (Rulebook v10 tr. 43)
   * Grounded in Yu-Gi-Oh! Official Rulebook Version 10, page 43:
   * 1. Counter Trap Cards (Spell Speed 3) - Allowed throughout the Damage Step (Substeps 1-5).
   * 2. Mandatory Trigger Effects - Allowed in their respective trigger windows.
   * 3. Specific Damage Step Activation Cards (activationWindow === 'DAMAGE_STEP' or battle destroyed triggers).
   * 4. Effects that directly modify ATK and/or DEF (Quick-Play Spells, Traps, Quick Effects):
   *    - ONLY allowed from Start of Damage Step until Before Damage Calculation (Substep 1 or 2).
   *    - STRICTLY BLOCKED during/after Damage Calculation (Substep 3, 4, 5).
   * 5. Normal Spells (Speed 1), regular Traps without ATK/DEF change, and non-fast effects are STRICTLY BLOCKED.
   */
  public canActivateInDamageStep(card: CardInstance, currentSubstep: number = 1): { allowed: boolean; reason: string } {
    if (!card || !card.def) {
      return { allowed: false, reason: 'Thẻ không hợp lệ!' };
    }

    // 1. Counter Traps are allowed throughout the Damage Step (Rulebook v10 tr. 43)
    if (card.def.cardType === 'TRAP' && card.def.spellTrapSubtype === 'COUNTER_TRAP') {
      return { allowed: true, reason: 'Thẻ Bẫy Phản Kháng (Counter Trap - Tốc độ 3) được phép kích hoạt trong toàn bộ Damage Step (Mốc 1-5)!' };
    }

    // 2. Mandatory Trigger Effects (FLIP effects, mandatory battle destruction triggers)
    if (card.def.triggerTimingType === 'MANDATORY') {
      return { allowed: true, reason: 'Hiệu ứng Kích Hoạt Bắt Buộc (Mandatory Trigger) được phép kích hoạt trong Damage Step (Rulebook v10 tr. 43)!' };
    }

    // Normal Spells (Spell Speed 1) are NEVER allowed in the Damage Step (Rulebook v10 tr. 43)
    if (card.def.cardType === 'REACTION_SPELL' && card.def.spellTrapSubtype === 'NORMAL_SPELL') {
      return {
        allowed: false,
        reason: 'Thẻ Phép Thường (Normal Spell - Tốc độ 1) tuyệt đối không thể kích hoạt trong Damage Step (Rulebook v10 tr. 43)!'
      };
    }

    // 3. Effects that directly modify ATK and/or DEF (Rulebook v10 tr. 43)
    const isAtkDefModifier = 
      Boolean(card.def.modifiesAtkDef) ||
      card.def.effectCode === 'SPELL_QUICK_ATK_SURGE' ||
      card.def.effectCode === 'TRAP_NOBLE_MEMBRANE_CONT' ||
      card.def.effectCode === 'SPELL_LE_CHATELIER' ||
      card.def.effectCode === 'SPELL_BUNSEN_EQUIP' ||
      card.def.effectCode === 'SPELL_REDOX_COUPLING' ||
      card.def.effectCode === 'SPELL_DEFENSE_SURGE' ||
      Boolean(card.def.effectText?.match(/(\+|\-)\d+\s*(ATK|DEF)/i)) ||
      Boolean(card.def.effectText?.toLowerCase().includes('tăng') && card.def.effectText?.toLowerCase().includes('atk')) ||
      Boolean(card.def.effectText?.toLowerCase().includes('giảm') && card.def.effectText?.toLowerCase().includes('atk')) ||
      Boolean(card.def.effectText?.toLowerCase().includes('tăng') && card.def.effectText?.toLowerCase().includes('def')) ||
      Boolean(card.def.effectText?.toLowerCase().includes('giảm') && card.def.effectText?.toLowerCase().includes('def'));

    if (isAtkDefModifier) {
      // Fast Effect Requirement: Must be Quick-Play Spell or Trap or Quick Effect
      const isFastEffect = card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL' || 
                           card.def.cardType === 'TRAP' || 
                           card.def.spellSpeed === 2 || 
                           card.def.spellSpeed === 3;

      if (!isFastEffect) {
        return {
          allowed: false,
          reason: 'Chỉ có hiệu ứng nhanh (Quick-Play Spell / Trap) thay đổi ATK/DEF mới được kích hoạt trong Damage Step (Rulebook v10 tr. 43)!'
        };
      }

      // Timing rule: Substep 1 and Substep 2 ONLY (Before Damage Calculation)
      if (currentSubstep > 2) {
        return {
          allowed: false,
          reason: 'Hiệu ứng thay đổi ATK/DEF chỉ được kích hoạt ở Mốc 1 hoặc Mốc 2 trước khi tính sát thương (Before Damage Calculation). Không thể kích hoạt ở Mốc 3, 4, 5 (Rulebook v10 tr. 43)!'
        };
      }

      return {
        allowed: true,
        reason: 'Hiệu ứng trực tiếp thay đổi ATK/DEF được phép kích hoạt trước khi tính sát thương (Mốc 1-2, Rulebook v10 tr. 43)!'
      };
    }

    // 4. Specifically permitted non-ATK/DEF Damage Step cards (Battle destruction triggers, etc.)
    if (
      card.def.activationWindow === 'DAMAGE_STEP' ||
      card.def.activationWindow === 'ON_BATTLE_DESTROYED' ||
      card.def.effectText?.toLowerCase().includes('trong damage step') ||
      card.def.effectText?.toLowerCase().includes('khi bị tiêu diệt bởi chiến đấu')
    ) {
      return { allowed: true, reason: 'Thẻ bài có văn bản hiệu ứng chỉ định rõ được kích hoạt trong Damage Step (Rulebook v10 tr. 43)!' };
    }

    // 5. All other cards / effects are blocked
    return {
      allowed: false,
      reason: 'Chỉ có Bẫy Phản Kháng, hiệu ứng bắt buộc hoặc thẻ bài trực tiếp thay đổi chỉ số ATK/DEF mới được phép kích hoạt trong Damage Step (Rulebook v10 tr. 43)!'
    };
  }

  // ==========================================
  // MULTI-COST STRATEGIC DRAW SYSTEM
  // ==========================================
  public tributeToDraw(duelistId: string, monsterSlotIndex: number, cardsToDraw: number = 2): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (monsterSlotIndex < 0 || monsterSlotIndex >= duelist.monsterZones.length) {
      return { success: false, message: 'Vị trí quái thú không hợp lệ!' };
    }
    const slot = duelist.monsterZones[monsterSlotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không có quái thú nào tại ô này để hiến tế!' };
    }
    const monsterName = slot.card.def.name;
    duelist.graveyard.push(slot.card);
    duelist.monsterZones[monsterSlotIndex] = null;

    for (let i = 0; i < cardsToDraw; i++) {
      this.drawCard(duelistId);
    }
    this.addLog(duelist.name, `[Hiến Tế Đổi Thẻ] Hiến tế [${monsterName}] vào Mộ Bài và rút ${cardsToDraw} lá bài mới!`, 'INFO');
    return { success: true, message: `Hiến tế [${monsterName}] thành công, rút ${cardsToDraw} lá bài!` };
  }

  public lifePointDraw(duelistId: string, lpCost: number = 1000, cardsToDraw: number = 2): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (duelist.lp <= lpCost) {
      return { success: false, message: `Không đủ Điểm Sinh Mệnh! Cần nhiều hơn ${lpCost} LP (Hiện có: ${duelist.lp} LP).` };
    }
    duelist.lp -= lpCost;
    for (let i = 0; i < cardsToDraw; i++) {
      this.drawCard(duelistId);
    }
    this.addLog(duelist.name, `[Sinh Mệnh Đổi Thẻ] Tiêu hao ${lpCost} LP (Còn ${duelist.lp} LP), rút ngay ${cardsToDraw} lá bài!`, 'DAMAGE');
    return { success: true, message: `Đã trả ${lpCost} LP và rút ${cardsToDraw} lá bài!` };
  }

  public graveyardConsumeDraw(duelistId: string, graveCardUids: string[], cardsToDraw: number = 2): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    if (graveCardUids.length < 2) {
      return { success: false, message: 'Cần chọn ít nhất 2 lá bài trong Mộ Bài để trục xuất!' };
    }
    const banishedCards: CardInstance[] = [];
    for (const uid of graveCardUids) {
      const idx = duelist.graveyard.findIndex(c => c.uid === uid);
      if (idx !== -1) {
        const c = duelist.graveyard.splice(idx, 1)[0];
        duelist.banished.push(c);
        banishedCards.push(c);
      }
    }
    if (banishedCards.length < 2) {
      return { success: false, message: 'Không tìm thấy đủ 2 lá bài hợp lệ trong Mộ Bài!' };
    }
    for (let i = 0; i < cardsToDraw; i++) {
      this.drawCard(duelistId);
    }
    this.addLog(
      duelist.name,
      `[Lọc Tinh Thể Mộ Bài] Trục xuất ${banishedCards.map(c => `[${c.def.name}]`).join(', ')} khỏi Mộ Bài sang Vùng Bị Loại, rút ${cardsToDraw} lá bài!`,
      'INFO'
    );
    return { success: true, message: `Trục xuất thành công và rút ${cardsToDraw} lá bài!` };
  }

  // ==========================================
  // GRAVEYARD & BANISHED ZONE OPERATIONS
  // ==========================================
  public banishCardFromField(
    duelistId: string,
    zone: 'MONSTER' | 'SPELL_TRAP' | 'FIELD_ZONE',
    slotIndex?: number,
    faceDown?: boolean
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const isFaceDown = Boolean(faceDown);

    if (zone === 'MONSTER') {
      const idx = slotIndex ?? 0;
      const slot = duelist.monsterZones[idx];
      if (!slot || !slot.card) return { success: false, message: 'Không có quái thú tại ô này!' };
      const card = slot.card;
      duelist.monsterZones[idx] = null;

      // Master Rule (Rulebook v10 tr. 48-49): Monster Tokens disappear completely when banished; they NEVER enter Banished Zone!
      if (card.isToken || card.def.isToken || card.def.cardType === 'TOKEN_MONSTER') {
        this.addLog(
          duelist.name,
          `[Quy Tắc Monster Token - Rulebook v10 tr. 48] Monster Token [${card.def.name}] bị trục xuất khỏi sân nhưng biến mất ngay lập tức (không vào Vùng Bị Loại)!`,
          'INFO'
        );
        return { success: true, message: `Monster Token [${card.def.name}] đã biến mất khỏi trận đấu!` };
      }

      // Master Rule (Rulebook v10 tr. 47 & 55): Original owner Banished Zone routing
      const targetOwnerId = card.originalOwnerId || card.ownerId || duelistId;
      const targetOwner = this.getDuelist(targetOwnerId);

      // Clear any active control transfer
      this.activeControlTransfers = this.activeControlTransfers.filter(r => r.cardUid !== card.uid);

      card.isFaceDown = isFaceDown;
      targetOwner.banished.push(card);
      this.addLog(
        duelist.name,
        isFaceDown
          ? `[Trục Xuất Úp Mặt - Rulebook v10 tr. 55] [${card.def.name}] bị trục xuất Úp Mặt vào Vùng Bị Loại! Thẻ không còn thuộc tính công khai và không thể kích hoạt hiệu ứng.`
          : `[Trục Xuất Vĩnh Viễn - Rulebook v10 tr. 55] [${card.def.name}] bị đẩy vào Vùng Bị Loại (Banished Zone)!`,
        'DAMAGE'
      );
      if (targetOwnerId !== duelistId) {
        this.addLog(
          targetOwner.name,
          `[Quy Tắc Quyền Sở Hữu - Rulebook v10 tr. 47] Lá bài [${card.def.name}] thuộc sở hữu của [${targetOwner.name}], được gửi về Vùng Bị Loại của chủ nhân gốc!`,
          'INFO'
        );
      }
      return { success: true, message: `Đã trục xuất [${card.def.name}]!` };
    } else if (zone === 'FIELD_ZONE') {
      if (!duelist.fieldZone) return { success: false, message: 'Không có Thẻ Địa Bàn trong Field Zone!' };
      const card = duelist.fieldZone;
      const targetOwnerId = card.originalOwnerId || card.ownerId || duelistId;
      const targetOwner = this.getDuelist(targetOwnerId);
      card.isFaceDown = isFaceDown;
      duelist.fieldZone = null;
      targetOwner.banished.push(card);
      this.addLog(
        targetOwner.name,
        isFaceDown
          ? `[Trục Xuất Úp Mặt - Rulebook v10 tr. 55] Thẻ Địa Bàn [${card.def.name}] bị trục xuất Úp Mặt vào Vùng Bị Loại!`
          : `[Trục Xuất Địa Bàn - Rulebook v10 tr. 28 & 55] [${card.def.name}] bị trục xuất vào Vùng Bị Loại của chủ nhân [${targetOwner.name}]!`,
        'DAMAGE'
      );
      return { success: true, message: `Đã trục xuất [${card.def.name}]!` };
    } else {
      const idx = slotIndex ?? 0;
      const slot = duelist.spellTrapZones[idx];
      if (!slot || !slot.card) return { success: false, message: 'Không có bài phép/bẫy tại ô này!' };
      const card = slot.card;
      const targetOwnerId = card.originalOwnerId || card.ownerId || duelistId;
      const targetOwner = this.getDuelist(targetOwnerId);
      card.isFaceDown = isFaceDown;
      duelist.spellTrapZones[idx] = null;
      targetOwner.banished.push(card);
      this.addLog(
        targetOwner.name,
        isFaceDown
          ? `[Trục Xuất Úp Mặt - Rulebook v10 tr. 55] Phép/Bẫy [${card.def.name}] bị trục xuất Úp Mặt vào Vùng Bị Loại!`
          : `[Trục Xuất - Rulebook v10 tr. 47 & 55] [${card.def.name}] bị loại vào Vùng Bị Loại của chủ nhân [${targetOwner.name}]!`,
        'DAMAGE'
      );
      return { success: true, message: `Đã trục xuất [${card.def.name}]!` };
    }
  }

  public banishCardFromGraveyard(duelistId: string, cardUid: string, faceDown?: boolean): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const graveIdx = duelist.graveyard.findIndex(c => c.uid === cardUid);
    if (graveIdx === -1) return { success: false, message: 'Lá bài không có trong Mộ Bài!' };
    const card = duelist.graveyard.splice(graveIdx, 1)[0];
    const isFaceDown = Boolean(faceDown);
    card.isFaceDown = isFaceDown;
    duelist.banished.push(card);
    this.addLog(
      duelist.name,
      isFaceDown
        ? `[Trục Xuất Úp Mặt - Rulebook v10 tr. 55] [${card.def.name}] bị trục xuất Úp Mặt từ Mộ Bài sang Vùng Bị Loại!`
        : `[Trục Xuất Mộ Bài - Rulebook v10 tr. 55] [${card.def.name}] bị trục xuất từ Mộ Bài sang Vùng Bị Loại!`,
      'INFO'
    );
    return { success: true, message: `Đã trục xuất [${card.def.name}] khỏi Mộ Bài!` };
  }

  public banishCardFromHand(duelistId: string, cardUid: string, faceDown?: boolean): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const handIdx = duelist.hand.findIndex(c => c.uid === cardUid);
    if (handIdx === -1) return { success: false, message: 'Lá bài không có trên tay!' };
    const card = duelist.hand.splice(handIdx, 1)[0];
    const isFaceDown = Boolean(faceDown);
    card.isFaceDown = isFaceDown;
    duelist.banished.push(card);
    this.addLog(
      duelist.name,
      isFaceDown
        ? `[Trục Xuất Úp Mặt - Rulebook v10 tr. 55] [${card.def.name}] bị trục xuất Úp Mặt từ tay vào Vùng Bị Loại!`
        : `[Trục Xuất Trên Tay - Rulebook v10 tr. 55] [${card.def.name}] bị trục xuất từ tay vào Vùng Bị Loại!`,
      'INFO'
    );
    return { success: true, message: `Đã trục xuất [${card.def.name}] từ tay!` };
  }

  public banishTopCardsFromDeck(
    duelistId: string,
    count: number,
    faceDown?: boolean
  ): { success: boolean; count: number; message: string } {
    const duelist = this.getDuelist(duelistId);
    const isFaceDown = Boolean(faceDown);
    const numToBanish = Math.min(count, duelist.deck.length);
    if (numToBanish <= 0) {
      return { success: false, count: 0, message: 'Bộ bài không còn lá bài nào để trục xuất!' };
    }

    const removed = duelist.deck.splice(0, numToBanish);
    for (const card of removed) {
      card.isFaceDown = isFaceDown;
      duelist.banished.push(card);
    }

    this.addLog(
      duelist.name,
      `[Trục Xuất Từ Bộ Bài - Rulebook v10 tr. 55] ${duelist.name} đã trục xuất ${numToBanish} lá bài ${isFaceDown ? 'ÚP MẶT (FACE-DOWN)' : 'NGỬA MẶT'} từ đỉnh Bộ bài vào Vùng Bị Loại!`,
      'INFO'
    );

    return {
      success: true,
      count: numToBanish,
      message: `Đã trục xuất ${numToBanish} lá bài ${isFaceDown ? 'úp mặt' : 'ngửa mặt'} từ Bộ bài!`
    };
  }

  public filterBanishedCards(
    duelistId: string,
    filter: {
      attribute?: string;
      cardType?: string;
      level?: number;
      name?: string;
      allowFaceDown?: boolean;
    } = {}
  ): CardInstance[] {
    const duelist = this.getDuelist(duelistId);
    const hasPropertyFilter = Boolean(filter.attribute || filter.cardType || filter.level !== undefined || filter.name);

    return duelist.banished.filter(card => {
      if (card.isFaceDown) {
        if (hasPropertyFilter && !filter.allowFaceDown) {
          return false;
        }
      }

      if (filter.attribute && card.def.attribute !== filter.attribute) return false;
      if (filter.cardType && card.def.cardType !== filter.cardType) return false;
      if (filter.level !== undefined && card.def.level !== filter.level) return false;
      if (filter.name && !card.def.name.toLowerCase().includes(filter.name.toLowerCase())) return false;

      return true;
    });
  }

  public canTargetBanishedCard(card: CardInstance, requiresPropertyCheck: boolean = false): boolean {
    if (card.isFaceDown && requiresPropertyCheck) {
      return false;
    }
    return true;
  }

  public retrieveFromBanished(
    duelistId: string,
    cardUid: string,
    destination: 'HAND' | 'DECK' | 'GRAVEYARD',
    requiresPropertyCheck: boolean = false
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const banishedIdx = duelist.banished.findIndex(c => c.uid === cardUid);
    if (banishedIdx === -1) {
      return { success: false, message: 'Lá bài không tồn tại trong Vùng Bị Loại!' };
    }

    const card = duelist.banished[banishedIdx];
    if (card.isFaceDown && requiresPropertyCheck) {
      return {
        success: false,
        message: '[Vi Phạm Master Rule - Rulebook v10 tr. 55] Thẻ bị trục xuất Úp Mặt không có tên, hệ, cấp hay thuộc tính công khai, không thể được chỉ định bởi hiệu ứng này!'
      };
    }

    duelist.banished.splice(banishedIdx, 1);
    card.isFaceDown = false;

    if (destination === 'HAND') {
      duelist.hand.push(card);
      this.addLog(duelist.name, `[Hoàn Nguyên Vùng Bị Loại - Rulebook v10 tr. 55] Lấy lại [${card.def.name}] từ Vùng Bị Loại lên tay!`, 'INFO');
    } else if (destination === 'GRAVEYARD') {
      duelist.graveyard.push(card);
      this.addLog(duelist.name, `[Chuyển Vùng Bị Loại - Rulebook v10 tr. 55] Chuyển [${card.def.name}] từ Vùng Bị Loại vào Mộ Bài!`, 'INFO');
    } else {
      duelist.deck.push(card);
      this.shuffleDeck(duelistId);
      this.addLog(duelist.name, `[Hồi Trở Về Bộ Bài - Rulebook v10 tr. 55] Xáo trộn [${card.def.name}] từ Vùng Bị Loại trở lại Bộ bài!`, 'INFO');
    }

    return { success: true, message: `Hoàn nguyên [${card.def.name}] về ${destination} thành công!` };
  }

  // ==========================================
  // LINGERING TURN EFFECTS & COUNTDOWN MECHANICS (Rulebook v10 tr. 30-31, 54)
  // ==========================================

  /**
   * Registers a turn-based lingering effect on a duelist (Rulebook v10 tr. 31 & 54)
   */
  public addLingeringEffect(targetPlayerId: string, effectData: Omit<LingeringTurnEffect, 'id'>): LingeringTurnEffect {
    const duelist = this.getDuelist(targetPlayerId);
    if (!duelist.lingeringEffects) {
      duelist.lingeringEffects = [];
    }
    const effect: LingeringTurnEffect = {
      ...effectData,
      id: `lingering_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
    };
    duelist.lingeringEffects.push(effect);
    return effect;
  }

  /**
   * Retrieves all active lingering effects on a duelist
   */
  public getLingeringEffects(duelistId: string): LingeringTurnEffect[] {
    const duelist = this.getDuelist(duelistId);
    return duelist.lingeringEffects ? [...duelist.lingeringEffects] : [];
  }

  /**
   * Checks if a duelist is currently affected by a specific lingering effect type
   */
  public hasLingeringEffect(duelistId: string, effectType: LingeringTurnEffect['effectType']): boolean {
    const duelist = this.getDuelist(duelistId);
    if (!duelist.lingeringEffects) return false;
    return duelist.lingeringEffects.some(e => e.effectType === effectType && e.durationTurns > 0);
  }

  /**
   * Explicitly removes a lingering effect by ID
   */
  public removeLingeringEffect(duelistId: string, effectId: string): boolean {
    const duelist = this.getDuelist(duelistId);
    if (!duelist.lingeringEffects) return false;
    const idx = duelist.lingeringEffects.findIndex(e => e.id === effectId);
    if (idx !== -1) {
      duelist.lingeringEffects.splice(idx, 1);
      return true;
    }
    return false;
  }

  /**
   * Decrements multi-turn counters and clamps duration at the End Phase (Rulebook v10 tr. 31, 54)
   */
  public processEndPhaseLingeringEffects(endingTurnPlayerId: string): void {
    for (const p of [this.player, this.opponent]) {
      if (!p.lingeringEffects || p.lingeringEffects.length === 0) continue;

      const remaining: LingeringTurnEffect[] = [];
      for (const effect of p.lingeringEffects) {
        let shouldDecrement = false;

        if (effect.expiresAt === 'END_OF_TURN') {
          shouldDecrement = true;
        } else if (p.id === endingTurnPlayerId || effect.targetPlayerId === 'ALL') {
          shouldDecrement = true;
        }

        if (shouldDecrement) {
          effect.durationTurns--;
          if (effect.payload && typeof effect.payload.turnsRemaining === 'number') {
            effect.payload.turnsRemaining = effect.durationTurns;
          }
        }

        if (effect.durationTurns <= 0) {
          this.addLog(
            p.name,
            `[Hết Hiệu Lực Duy Trì - Rulebook v10 tr. 31 & 54] Hiệu ứng "${effect.sourceCardName}" (${effect.description}) đã hoàn tất thời gian duy trì và giải trừ hiệu lực.`,
            'INFO'
          );
        } else {
          if (shouldDecrement) {
            this.addLog(
              p.name,
              `[Bộ Đếm Lượt Duy Trì - Rulebook v10 tr. 54] Hiệu ứng "${effect.sourceCardName}" còn ${effect.durationTurns} lượt duy trì.`,
              'INFO'
            );
          }
          remaining.push(effect);
        }
      }
      p.lingeringEffects = remaining;
    }
  }

  // ==========================================
  // CONTROL OF CARDS & TEMPORARY CONTROL TRANSFERS (Rulebook v10 tr. 47 & 55)
  // ==========================================
  public takeControlOfMonster(
    controllerId: string,
    targetSlotIndex: number,
    duration: 'UNTIL_END_OF_TURN' | 'PERMANENT' = 'UNTIL_END_OF_TURN',
    canAttack: boolean = true,
    canTribute: boolean = true,
    reason?: string
  ): { success: boolean; message: string; targetCard?: CardInstance; destinationSlotIndex?: number } {
    const opponentId = controllerId === 'player' ? 'opponent' : 'player';
    const controller = this.getDuelist(controllerId);
    const opponent = this.getDuelist(opponentId);

    if (targetSlotIndex < 0 || targetSlotIndex >= opponent.monsterZones.length) {
      return { success: false, message: 'Vị trí ô quái thú mục tiêu không hợp lệ!' };
    }

    const targetSlot = opponent.monsterZones[targetSlotIndex];
    if (!targetSlot || !targetSlot.card) {
      return { success: false, message: 'Không có quái thú tại ô chỉ định của đối thủ!' };
    }

    // Open Monster Zone Invariant (Rulebook v10 tr. 47):
    // "To take control of a monster, you must have an open Monster Zone."
    const openSlotIndex = controller.monsterZones.findIndex(slot => slot === null);
    if (openSlotIndex === -1) {
      return {
        success: false,
        message: '[Vi Phạm Master Rule - Rulebook v10 tr. 47] Không thể chuyển giao quyền điều khiển quái thú: Người chơi không còn ô quái thú trống (5/5 đã bị chiếm dụng)!'
      };
    }

    const targetMonster = targetSlot.card;
    if (!targetMonster.originalOwnerId) {
      targetMonster.originalOwnerId = targetMonster.ownerId || opponentId;
    }

    // Move monster preserving battle position and attachments
    controller.monsterZones[openSlotIndex] = {
      slotIndex: openSlotIndex,
      card: targetMonster,
      position: targetSlot.position,
      hasAttackedThisTurn: targetSlot.hasAttackedThisTurn,
      hasChangedPositionThisTurn: targetSlot.hasChangedPositionThisTurn,
      turnSummoned: targetSlot.turnSummoned,
      tempAtkBoost: targetSlot.tempAtkBoost,
      tempDefBoost: targetSlot.tempDefBoost,
      passivationShieldUsed: targetSlot.passivationShieldUsed,
      inertShieldUsed: targetSlot.inertShieldUsed,
      xyzMaterials: targetSlot.xyzMaterials ? [...targetSlot.xyzMaterials] : undefined,
      equippedCards: targetSlot.equippedCards ? [...targetSlot.equippedCards] : undefined,
      hasPiercingDamage: targetSlot.hasPiercingDamage,
      positionLockedUntilTurn: targetSlot.positionLockedUntilTurn
    };

    // Vacate opponent's slot
    opponent.monsterZones[targetSlotIndex] = null;

    // Record transfer
    const record: TemporaryControlTransferRecord = {
      cardUid: targetMonster.uid,
      originalOwnerId: targetMonster.originalOwnerId,
      currentControllerId: controllerId,
      originalSlotIndex: targetSlotIndex,
      transferredAtTurn: this.currentTurn,
      duration,
      canAttack,
      canTribute,
      preservedPosition: targetSlot.position,
      reason: reason || 'CARD_EFFECT'
    };
    this.activeControlTransfers.push(record);

    this.recordGameEvent('MONSTER_CONTROL_TRANSFERRED', targetMonster, controllerId, {
      fromDuelistId: opponentId,
      toDuelistId: controllerId,
      slotIndex: openSlotIndex,
      duration
    });

    this.addLog(
      controller.name,
      `[Chiếm Quyền Điều Khiển - Rulebook v10 tr. 47] ${controller.name} chiếm quyền điều khiển [${targetMonster.def.name}] từ ${opponent.name} (chuyển sang Ô ${openSlotIndex + 1})!`,
      'SPELL',
      targetMonster.def.scientificLore
    );

    return {
      success: true,
      message: `Đã chiếm quyền điều khiển [${targetMonster.def.name}] thành công!`,
      targetCard: targetMonster,
      destinationSlotIndex: openSlotIndex
    };
  }

  public returnControlOfMonster(record: TemporaryControlTransferRecord): { returned: boolean; destroyedByOverflow: boolean; message: string } {
    const controller = this.getDuelist(record.currentControllerId);
    const originalOwner = this.getDuelist(record.originalOwnerId);

    const currentSlotIndex = controller.monsterZones.findIndex(slot => slot && slot.card && slot.card.uid === record.cardUid);
    if (currentSlotIndex === -1) {
      // Monster no longer on controller's field (already destroyed, tributed, or banished)
      return { returned: false, destroyedByOverflow: false, message: 'Quái thú đã không còn trên sân.' };
    }

    const currentSlot = controller.monsterZones[currentSlotIndex]!;
    const monster = currentSlot.card!;

    // Check if original owner has an open monster zone
    const targetSlotIndex = originalOwner.monsterZones.findIndex(s => s === null);

    if (targetSlotIndex !== -1) {
      // Move back to original owner
      controller.monsterZones[currentSlotIndex] = null;
      originalOwner.monsterZones[targetSlotIndex] = {
        slotIndex: targetSlotIndex,
        card: monster,
        position: currentSlot.position,
        hasAttackedThisTurn: false,
        hasChangedPositionThisTurn: false,
        turnSummoned: currentSlot.turnSummoned,
        tempAtkBoost: 0,
        tempDefBoost: 0,
        xyzMaterials: currentSlot.xyzMaterials ? [...currentSlot.xyzMaterials] : undefined,
        equippedCards: currentSlot.equippedCards ? [...currentSlot.equippedCards] : undefined,
        hasPiercingDamage: currentSlot.hasPiercingDamage,
        positionLockedUntilTurn: currentSlot.positionLockedUntilTurn
      };

      this.recordGameEvent('MONSTER_CONTROL_RETURNED', monster, originalOwner.id, {
        fromDuelistId: controller.id,
        toDuelistId: originalOwner.id,
        slotIndex: targetSlotIndex
      });

      this.addLog(
        originalOwner.name,
        `[Trả Quyền Điều Khiển - Rulebook v10 tr. 47] Quái thú [${monster.def.name}] hết thời hạn kiểm soát, quay trở về sân của chủ nhân gốc [${originalOwner.name}] tại Ô ${targetSlotIndex + 1}!`,
        'INFO'
      );

      return { returned: true, destroyedByOverflow: false, message: `Quái thú đã quay về sân chủ nhân gốc.` };
    } else {
      // Field Full Overflow Destruction Invariant (Rulebook v10 tr. 55):
      // "If a monster cannot return because there are no open Monster Zones on its owner's field, it is destroyed and sent to the owner's Graveyard."
      controller.monsterZones[currentSlotIndex] = null;
      this.sendCardToGraveyard(record.originalOwnerId, monster, true);

      this.recordGameEvent('MONSTER_DESTROYED_BY_OVERFLOW_ON_RETURN', monster, originalOwner.id, {
        originalOwnerId: record.originalOwnerId,
        controllerId: record.currentControllerId,
        reason: 'FIELD_FULL_OVERFLOW'
      });

      this.addLog(
        originalOwner.name,
        `[Vi Phạm Sân Đầy - Rulebook v10 tr. 55] [${monster.def.name}] quay trở về nhưng sân của chủ nhân gốc [${originalOwner.name}] đã đầy (5/5 ô). Quái thú bị tiêu hủy bởi quy tắc trận đấu và gửi vào Mộ Bài của chủ nhân!`,
        'DAMAGE'
      );

      return {
        returned: false,
        destroyedByOverflow: true,
        message: `Sân chủ nhân đã đầy (5/5), quái thú bị tiêu hủy bởi luật trận đấu và gửi vào Mộ Bài của chủ nhân gốc (Rulebook v10 tr. 55).`
      };
    }
  }

  public resolveEndPhaseControlReturns(): { processedCount: number; returnedCount: number; overflowDestroyedCount: number } {
    const toReturn = this.activeControlTransfers.filter(r => r.duration === 'UNTIL_END_OF_TURN');
    let returnedCount = 0;
    let overflowDestroyedCount = 0;

    for (const record of toReturn) {
      const res = this.returnControlOfMonster(record);
      if (res.returned) returnedCount++;
      if (res.destroyedByOverflow) overflowDestroyedCount++;
    }

    // Remove processed records
    this.activeControlTransfers = this.activeControlTransfers.filter(r => r.duration !== 'UNTIL_END_OF_TURN');

    return {
      processedCount: toReturn.length,
      returnedCount,
      overflowDestroyedCount
    };
  }

  // =========================================================================
  // MASTER RULE COLUMN PLACEMENT & ADJACENCY ENGINE (Rulebook v10 tr. 4-5, 22-23)
  // =========================================================================

  /**
   * Converts a given duelist's zone slot into the global Battlefield Column Index (0 to 4).
   * Column 0: Player Slot 0 / Opponent Slot 4
   * Column 1: Player Slot 1 / Opponent Slot 3 (also Extra Monster Zone 1)
   * Column 2: Player Slot 2 / Opponent Slot 2 (Center)
   * Column 3: Player Slot 3 / Opponent Slot 1 (also Extra Monster Zone 2)
   * Column 4: Player Slot 4 / Opponent Slot 0
   */
  public getColumnForSlot(
    duelistId: string,
    zoneType: 'MONSTER' | 'SPELL_TRAP' | 'EXTRA_MONSTER',
    slotIndex: number
  ): BattlefieldColumnIndex {
    const isPlayer = duelistId === 'player';
    if (zoneType === 'EXTRA_MONSTER') {
      return (slotIndex === 0 ? 1 : 3) as BattlefieldColumnIndex;
    }
    const clampedSlot = Math.max(0, Math.min(4, slotIndex));
    if (isPlayer) {
      return clampedSlot as BattlefieldColumnIndex;
    } else {
      return (4 - clampedSlot) as BattlefieldColumnIndex;
    }
  }

  /**
   * Returns the opposing slot index directly across the battlefield (4 - slotIndex).
   */
  public getOpposingSlotIndex(slotIndex: number): number {
    return Math.max(0, Math.min(4, 4 - slotIndex));
  }

  /**
   * Returns an array of adjacent column indices (0 to 4) for a given column.
   */
  public getAdjacentColumns(columnIndex: BattlefieldColumnIndex): BattlefieldColumnIndex[] {
    const adjacent: BattlefieldColumnIndex[] = [];
    if (columnIndex > 0) adjacent.push((columnIndex - 1) as BattlefieldColumnIndex);
    if (columnIndex < 4) adjacent.push((columnIndex + 1) as BattlefieldColumnIndex);
    return adjacent;
  }

  /**
   * Retrieves all cards located in a specific battlefield column across both players.
   */
  public getCardsInColumn(columnIndex: BattlefieldColumnIndex): BattlefieldColumnSummary {
    const playerCards: ColumnCardRef[] = [];
    const opponentCards: ColumnCardRef[] = [];

    // 1. Player Spell/Trap in this column
    const playerSt = this.player.spellTrapZones[columnIndex];
    if (playerSt && playerSt.card) {
      playerCards.push({
        duelistId: 'player',
        zoneType: 'SPELL_TRAP',
        slotIndex: columnIndex,
        card: playerSt.card,
        columnIndex
      });
    }

    // 2. Player Monster in this column
    const playerMon = this.player.monsterZones[columnIndex];
    if (playerMon && playerMon.card) {
      playerCards.push({
        duelistId: 'player',
        zoneType: 'MONSTER',
        slotIndex: columnIndex,
        card: playerMon.card,
        columnIndex
      });
    }

    // 3. Extra Monster Zones (Column 1 = EMZ 1, Column 3 = EMZ 2)
    if (columnIndex === 1 || columnIndex === 3) {
      const emzSlotIndex = columnIndex === 1 ? 0 : 1;
      if (this.player.extraMonsterZone && this.player.extraMonsterZone.card) {
        playerCards.push({
          duelistId: 'player',
          zoneType: 'EXTRA_MONSTER',
          slotIndex: emzSlotIndex,
          card: this.player.extraMonsterZone.card,
          columnIndex
        });
      }
      if (this.opponent.extraMonsterZone && this.opponent.extraMonsterZone.card) {
        opponentCards.push({
          duelistId: 'opponent',
          zoneType: 'EXTRA_MONSTER',
          slotIndex: emzSlotIndex,
          card: this.opponent.extraMonsterZone.card,
          columnIndex
        });
      }
    }

    // 4. Opponent Monster in this column (Opponent's slot is 4 - columnIndex)
    const oppSlotIndex = 4 - columnIndex;
    const oppMon = this.opponent.monsterZones[oppSlotIndex];
    if (oppMon && oppMon.card) {
      opponentCards.push({
        duelistId: 'opponent',
        zoneType: 'MONSTER',
        slotIndex: oppSlotIndex,
        card: oppMon.card,
        columnIndex
      });
    }

    // 5. Opponent Spell/Trap in this column (Opponent's slot is 4 - columnIndex)
    const oppSt = this.opponent.spellTrapZones[oppSlotIndex];
    if (oppSt && oppSt.card) {
      opponentCards.push({
        duelistId: 'opponent',
        zoneType: 'SPELL_TRAP',
        slotIndex: oppSlotIndex,
        card: oppSt.card,
        columnIndex
      });
    }

    const allCards = [...playerCards, ...opponentCards];
    const hasMonster = allCards.some(c => c.zoneType === 'MONSTER' || c.zoneType === 'EXTRA_MONSTER');
    const hasSpellTrap = allCards.some(c => c.zoneType === 'SPELL_TRAP');

    return {
      columnIndex,
      playerCards,
      opponentCards,
      allCards,
      totalCardCount: allCards.length,
      hasMonster,
      hasSpellTrap
    };
  }

  /**
   * Retrieves summary for all 5 battlefield columns (0 to 4).
   */
  public getAllColumnsSummary(): BattlefieldColumnSummary[] {
    return ([0, 1, 2, 3, 4] as BattlefieldColumnIndex[]).map(c => this.getCardsInColumn(c));
  }

  /**
   * Finds the column index of a specific card on the battlefield.
   */
  public getCardColumn(cardUid: string): BattlefieldColumnIndex | null {
    // Check player monster zones
    for (let i = 0; i < this.player.monsterZones.length; i++) {
      if (this.player.monsterZones[i]?.card?.uid === cardUid) {
        return i as BattlefieldColumnIndex;
      }
    }
    // Check player spell/trap zones
    for (let i = 0; i < this.player.spellTrapZones.length; i++) {
      if (this.player.spellTrapZones[i]?.card?.uid === cardUid) {
        return i as BattlefieldColumnIndex;
      }
    }
    // Check player EMZ (Column 1)
    if (this.player.extraMonsterZone?.card?.uid === cardUid) {
      return 1;
    }
    // Check opponent monster zones
    for (let i = 0; i < this.opponent.monsterZones.length; i++) {
      if (this.opponent.monsterZones[i]?.card?.uid === cardUid) {
        return (4 - i) as BattlefieldColumnIndex;
      }
    }
    // Check opponent spell/trap zones
    for (let i = 0; i < this.opponent.spellTrapZones.length; i++) {
      if (this.opponent.spellTrapZones[i]?.card?.uid === cardUid) {
        return (4 - i) as BattlefieldColumnIndex;
      }
    }
    // Check opponent EMZ (Column 3)
    if (this.opponent.extraMonsterZone?.card?.uid === cardUid) {
      return 3;
    }
    return null;
  }

  /**
   * Checks whether two cards on the field occupy the same column.
   */
  public areCardsInSameColumn(cardUidA: string, cardUidB: string): boolean {
    const colA = this.getCardColumn(cardUidA);
    const colB = this.getCardColumn(cardUidB);
    if (colA === null || colB === null) return false;
    return colA === colB;
  }

  /**
   * Checks whether two cards on the field occupy horizontally adjacent columns (|colA - colB| === 1).
   */
  public areCardsInAdjacentColumns(cardUidA: string, cardUidB: string): boolean {
    const colA = this.getCardColumn(cardUidA);
    const colB = this.getCardColumn(cardUidB);
    if (colA === null || colB === null) return false;
    return Math.abs(colA - colB) === 1;
  }

  /**
   * Destroys all cards in a designated column across both duelists' fields (Rulebook v10 tr. 4-5, 22-23).
   * All destroyed cards route strictly to their original owners' Graveyards.
   */
  public destroyColumnCards(
    columnIndex: BattlefieldColumnIndex,
    reason: string = 'COLUMN_DESTRUCTION'
  ): { destroyedCards: CardInstance[]; count: number } {
    const summary = this.getCardsInColumn(columnIndex);
    const destroyedCards: CardInstance[] = [];

    // Player S/T in this column
    const playerSt = this.player.spellTrapZones[columnIndex];
    if (playerSt && playerSt.card) {
      const card = playerSt.card;
      this.player.spellTrapZones[columnIndex] = null;
      this.sendCardToGraveyard(card.originalOwnerId || this.player.id, card, true);
      destroyedCards.push(card);
    }

    // Player Monster in this column
    const playerMon = this.player.monsterZones[columnIndex];
    if (playerMon && playerMon.card) {
      if (this.isMonsterProtectedFromCardEffects(this.player.id, columnIndex)) {
        this.addLog(
          this.player.name,
          `[KHÁNG HỦY HIỆU ỨNG] [${playerMon.card.def.name}] tại Cột ${columnIndex + 1} có màng thụ động hóa bảo vệ, miễn nhiễm hủy bởi laser quang phổ!`,
          'INFO'
        );
      } else {
        const card = playerMon.card;
        this.cleanSlotXyzMaterials(this.player.id, columnIndex);
        this.cleanSlotEquipCards(this.player.id, columnIndex);
        this.player.monsterZones[columnIndex] = null;
        this.sendCardToGraveyard(card.originalOwnerId || this.player.id, card, true);
        destroyedCards.push(card);
      }
    }

    // Extra Monster Zones (Column 1 = EMZ 1, Column 3 = EMZ 2)
    if (columnIndex === 1 || columnIndex === 3) {
      if (this.player.extraMonsterZone && this.player.extraMonsterZone.card) {
        if (this.isMonsterProtectedFromCardEffects(this.player.id, 0, true)) {
          this.addLog(
            this.player.name,
            `[KHÁNG HỦY HIỆU ỨNG] [${this.player.extraMonsterZone.card.def.name}] tại EMZ có bảo vệ, miễn nhiễm hủy bởi laser quang phổ!`,
            'INFO'
          );
        } else {
          const card = this.player.extraMonsterZone.card;
          this.player.extraMonsterZone = null;
          this.sendCardToGraveyard(card.originalOwnerId || this.player.id, card, true);
          destroyedCards.push(card);
        }
      }
      if (this.opponent.extraMonsterZone && this.opponent.extraMonsterZone.card) {
        if (this.isMonsterProtectedFromCardEffects(this.opponent.id, 0, true)) {
          this.addLog(
            this.opponent.name,
            `[KHÁNG HỦY HIỆU ỨNG] [${this.opponent.extraMonsterZone.card.def.name}] tại EMZ đối phương có bảo vệ, miễn nhiễm hủy bởi laser quang phổ!`,
            'INFO'
          );
        } else {
          const card = this.opponent.extraMonsterZone.card;
          this.opponent.extraMonsterZone = null;
          this.sendCardToGraveyard(card.originalOwnerId || this.opponent.id, card, true);
          destroyedCards.push(card);
        }
      }
    }

    // Opponent Monster in this column (Opponent's slot is 4 - columnIndex)
    const oppSlot = 4 - columnIndex;
    const oppMon = this.opponent.monsterZones[oppSlot];
    if (oppMon && oppMon.card) {
      if (this.isMonsterProtectedFromCardEffects(this.opponent.id, oppSlot)) {
        this.addLog(
          this.opponent.name,
          `[KHÁNG HỦY HIỆU ỨNG] [${oppMon.card.def.name}] tại Cột ${columnIndex + 1} (Ô ${oppSlot + 1}) có màng thụ động hóa bảo vệ, miễn nhiễm hủy bởi laser quang phổ!`,
          'INFO'
        );
      } else {
        const card = oppMon.card;
        this.cleanSlotXyzMaterials(this.opponent.id, oppSlot);
        this.cleanSlotEquipCards(this.opponent.id, oppSlot);
        this.opponent.monsterZones[oppSlot] = null;
        this.sendCardToGraveyard(card.originalOwnerId || this.opponent.id, card, true);
        destroyedCards.push(card);
      }
    }

    // Opponent S/T in this column (Opponent's slot is 4 - columnIndex)
    const oppSt = this.opponent.spellTrapZones[oppSlot];
    if (oppSt && oppSt.card) {
      const card = oppSt.card;
      this.opponent.spellTrapZones[oppSlot] = null;
      this.sendCardToGraveyard(card.originalOwnerId || this.opponent.id, card, true);
      destroyedCards.push(card);
    }

    this.recordGameEvent('COLUMN_CARDS_DESTROYED', {
      columnIndex,
      destroyedCount: destroyedCards.length,
      cardUids: destroyedCards.map(c => c.uid),
      reason
    });

    this.addLog(
      'Hệ Thống',
      `[Phá Hủy Thẳng Cột - Master Rule Col ${columnIndex + 1}] Chùm tia laser quét qua Cột ${columnIndex + 1}, tiêu hủy toàn bộ ${destroyedCards.length} lá bài trên cùng một đường thẳng!`,
      'DAMAGE'
    );

    return {
      destroyedCards,
      count: destroyedCards.length
    };
  }

  // =========================================================================
  // MASTER RULE CONTINUOUS & LINGERING MONSTER EFFECT NULLIFICATION ENGINE
  // (Skill Drain & Effect Negation Invariants - Rulebook v10 tr. 48-49, 54)
  // =========================================================================

  /**
   * Evaluates the Level of a monster card instance or definition (Rulebook v10 tr. 25 & Master Rule 2020).
   * Returns undefined for Xyz Monsters (which have Ranks, not Levels) and Link Monsters (which have Link Ratings, not Levels).
   * For other monsters, returns the numerical Level (defaults to 1 if not set).
   */
  public getMonsterLevel(card: PlayableCardDef | CardInstance | null | undefined): number | undefined {
    if (!card) return undefined;
    const def: PlayableCardDef = (typeof (card as any).def === 'object' && (card as any).def !== null)
      ? (card as CardInstance).def
      : (card as PlayableCardDef);
    if (def.cardType === 'XYZ_MONSTER' || def.xyzRank !== undefined) {
      return undefined; // Xyz Monsters have Ranks, not Levels (Rulebook v10 tr. 25)
    }
    if (def.cardType === 'LINK_MONSTER' || def.linkRating !== undefined) {
      return undefined; // Link Monsters have Link Ratings, not Levels (Master Rule 2020)
    }
    return def.level !== undefined ? def.level : 1;
  }

  /**
   * Checks whether the Level 4+ attack lock (Gravity Bind / Ultracentrifugal Sedimentation) is active.
   * True if any face-up Continuous Trap with TRAP_GRAVITY_BIND_SEDIMENTATION is active on either duelist's field.
   */
  public isGravityBindActive(): boolean {
    for (const p of [this.player, this.opponent]) {
      for (const slot of p.spellTrapZones) {
        if (slot && slot.card && slot.isFaceUp && slot.card.def.effectCode === 'TRAP_GRAVITY_BIND_SEDIMENTATION') {
          return true;
        }
      }
    }
    return false;
  }

  // =========================================================================
  // MASTER RULE LINK ARROW TOPOLOGY & CO-LINK ENGINE (Master Rule 2020)
  // =========================================================================

  /**
   * Calculates the target zones pointed to by a Link Monster's Link Arrows (Master Rule 2020).
   * EMZ is positioned symmetrically above MMZ Slot 1 (Column 1) for the duelist.
   */
  public getLinkedZones(
    duelistId: string,
    slotIndex: number,
    isEmz: boolean = false
  ): { duelistId: string; slotIndex: number; isEmz?: boolean }[] {
    const duelist = this.getDuelist(duelistId);
    const oppId = duelistId === 'player' ? 'opponent' : 'player';
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card || slot.card.def.cardType !== 'LINK_MONSTER') {
      return [];
    }

    const arrows = slot.card.def.linkArrows || [];
    const linked: { duelistId: string; slotIndex: number; isEmz?: boolean }[] = [];

    if (isEmz) {
      // EMZ 1 is above Player MMZ Slot 1 (Column 1) / Opponent MMZ Slot 3.
      // EMZ 2 is above Opponent MMZ Slot 1 (Column 3 from Player POV) / Player MMZ Slot 3.
      if (duelistId === 'player') {
        for (const arrow of arrows) {
          switch (arrow) {
            case 'BOTTOM':
              linked.push({ duelistId: 'player', slotIndex: 1, isEmz: false });
              break;
            case 'BOTTOM_LEFT':
              linked.push({ duelistId: 'player', slotIndex: 0, isEmz: false });
              break;
            case 'BOTTOM_RIGHT':
              linked.push({ duelistId: 'player', slotIndex: 2, isEmz: false });
              break;
            case 'TOP':
              linked.push({ duelistId: 'opponent', slotIndex: 3, isEmz: false });
              break;
            case 'TOP_LEFT':
              linked.push({ duelistId: 'opponent', slotIndex: 4, isEmz: false });
              break;
            case 'TOP_RIGHT':
              linked.push({ duelistId: 'opponent', slotIndex: 2, isEmz: false });
              break;
          }
        }
      } else {
        // duelistId === 'opponent' (EMZ 2, directly above Opponent Slot 1 / Player Slot 3)
        for (const arrow of arrows) {
          switch (arrow) {
            case 'BOTTOM':
              linked.push({ duelistId: 'opponent', slotIndex: 1, isEmz: false });
              break;
            case 'BOTTOM_LEFT':
              linked.push({ duelistId: 'opponent', slotIndex: 0, isEmz: false });
              break;
            case 'BOTTOM_RIGHT':
              linked.push({ duelistId: 'opponent', slotIndex: 2, isEmz: false });
              break;
            case 'TOP':
              linked.push({ duelistId: 'player', slotIndex: 3, isEmz: false });
              break;
            case 'TOP_LEFT':
              linked.push({ duelistId: 'player', slotIndex: 4, isEmz: false });
              break;
            case 'TOP_RIGHT':
              linked.push({ duelistId: 'player', slotIndex: 2, isEmz: false });
              break;
          }
        }
      }
    } else {
      // MMZ Slot i (0 to 4)
      for (const arrow of arrows) {
        switch (arrow) {
          case 'LEFT':
            if (slotIndex > 0) linked.push({ duelistId, slotIndex: slotIndex - 1, isEmz: false });
            break;
          case 'RIGHT':
            if (slotIndex < 4) linked.push({ duelistId, slotIndex: slotIndex + 1, isEmz: false });
            break;
          case 'TOP':
            if (slotIndex === 1) {
              // Above Slot 1 is duelist's own primary EMZ
              linked.push({ duelistId, slotIndex: -1, isEmz: true });
            } else if (slotIndex === 3) {
              // Above Slot 3 is the other EMZ (managed by opponent or as second EMZ)
              linked.push({ duelistId: oppId, slotIndex: -1, isEmz: true });
            } else {
              linked.push({ duelistId: oppId, slotIndex: 4 - slotIndex, isEmz: false });
            }
            break;
          case 'TOP_LEFT':
            if (slotIndex > 0) linked.push({ duelistId: oppId, slotIndex: Math.min(4, 4 - slotIndex + 1), isEmz: false });
            break;
          case 'TOP_RIGHT':
            if (slotIndex < 4) linked.push({ duelistId: oppId, slotIndex: Math.max(0, 4 - slotIndex - 1), isEmz: false });
            break;
        }
      }
    }

    return linked;
  }

  /**
   * Determines whether a designated zone is pointed to by any active Link Arrow on the field.
   */
  public isZonePointedByLinkArrow(
    targetDuelistId: string,
    targetSlotIndex: number,
    isTargetEmz: boolean = false
  ): boolean {
    for (const dId of ['player', 'opponent']) {
      const d = this.getDuelist(dId);
      // Check EMZ
      if (d.extraMonsterZone && d.extraMonsterZone.card) {
        const zones = this.getLinkedZones(dId, -1, true);
        if (zones.some(z => z.duelistId === targetDuelistId && z.slotIndex === targetSlotIndex && (!!z.isEmz === isTargetEmz))) {
          return true;
        }
      }
      // Check MMZ
      for (let i = 0; i < d.monsterZones.length; i++) {
        if (d.monsterZones[i] && d.monsterZones[i]!.card) {
          const zones = this.getLinkedZones(dId, i, false);
          if (zones.some(z => z.duelistId === targetDuelistId && z.slotIndex === targetSlotIndex && (!!z.isEmz === isTargetEmz))) {
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Determines whether two Link Monsters on the battlefield are Co-Linked (Mutual Link - Master Rule 2020).
   * True if Monster A's arrow points to Zone B AND Monster B's arrow points to Zone A.
   */
  public isCoLinked(
    duelistIdA: string,
    slotIndexA: number,
    isEmzA: boolean,
    duelistIdB: string,
    slotIndexB: number,
    isEmzB: boolean
  ): boolean {
    const zonesA = this.getLinkedZones(duelistIdA, slotIndexA, isEmzA);
    const aPointsToB = zonesA.some(z => z.duelistId === duelistIdB && z.slotIndex === slotIndexB && (!!z.isEmz === isEmzB));
    if (!aPointsToB) return false;

    const zonesB = this.getLinkedZones(duelistIdB, slotIndexB, isEmzB);
    const bPointsToA = zonesB.some(z => z.duelistId === duelistIdA && z.slotIndex === slotIndexA && (!!z.isEmz === isEmzA));
    return bPointsToA;
  }

  /**
   * Extra Link Verification (Master Rule 2020 / Rulebook v10 tr. 4-5, 22-23):
   * Determines whether the specified duelist has formed an unbroken chain of pairwise Co-Linked
   * monsters spanning from their primary Extra Monster Zone (EMZ 1) to the opposite Extra Monster Zone (EMZ 2).
   */
  public isExtraLinkActive(duelistId: string): boolean {
    const oppId = duelistId === 'player' ? 'opponent' : 'player';
    const duelist = this.getDuelist(duelistId);
    const opp = this.getDuelist(oppId);

    // Both EMZs must be occupied by Link Monsters
    if (!duelist.extraMonsterZone || !duelist.extraMonsterZone.card || duelist.extraMonsterZone.card.def.cardType !== 'LINK_MONSTER') {
      return false;
    }
    if (!opp.extraMonsterZone || !opp.extraMonsterZone.card || opp.extraMonsterZone.card.def.cardType !== 'LINK_MONSTER') {
      return false;
    }

    interface NodeKey {
      dId: string;
      sIndex: number;
      isEmz: boolean;
    }

    const startNode: NodeKey = { dId: duelistId, sIndex: -1, isEmz: true };
    const targetNode: NodeKey = { dId: oppId, sIndex: -1, isEmz: true };

    const visited = new Set<string>();
    const nodeToKey = (n: NodeKey) => `${n.dId}_${n.sIndex}_${n.isEmz}`;
    const queue: NodeKey[] = [startNode];
    visited.add(nodeToKey(startNode));

    const allCandidates: NodeKey[] = [
      { dId: 'player', sIndex: -1, isEmz: true },
      { dId: 'opponent', sIndex: -1, isEmz: true }
    ];
    for (let i = 0; i < 5; i++) {
      allCandidates.push({ dId: duelistId, sIndex: i, isEmz: false });
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.dId === targetNode.dId && current.sIndex === targetNode.sIndex && current.isEmz === targetNode.isEmz) {
        return true;
      }

      for (const candidate of allCandidates) {
        const cKey = nodeToKey(candidate);
        if (visited.has(cKey)) continue;

        if (this.isCoLinked(current.dId, current.sIndex, current.isEmz, candidate.dId, candidate.sIndex, candidate.isEmz)) {
          visited.add(cKey);
          queue.push(candidate);
        }
      }
    }

    return false;
  }

  /**
   * Checks whether a specific monster on the field is a node in an active Extra Link chain.
   */
  public isMonsterInExtraLink(duelistId: string, slotIndex: number, isEmz: boolean = false): boolean {
    const isPlayerActive = this.isExtraLinkActive('player');
    const isOppActive = this.isExtraLinkActive('opponent');
    if (!isPlayerActive && !isOppActive) {
      return false;
    }
    const controllingPlayer = isPlayerActive ? 'player' : 'opponent';
    const oppId = controllingPlayer === 'player' ? 'opponent' : 'player';

    interface NodeKey {
      dId: string;
      sIndex: number;
      isEmz: boolean;
    }
    const startNode: NodeKey = { dId: controllingPlayer, sIndex: -1, isEmz: true };
    const targetNode: NodeKey = { dId: oppId, sIndex: -1, isEmz: true };

    const nodeToKey = (n: NodeKey) => `${n.dId}_${n.sIndex}_${n.isEmz}`;
    const startKey = nodeToKey(startNode);
    const targetKey = nodeToKey(targetNode);
    const queryKey = nodeToKey({ dId: duelistId, sIndex: slotIndex, isEmz });

    if (queryKey === startKey || queryKey === targetKey) return true;

    const allCandidates: NodeKey[] = [startNode, targetNode];
    for (let i = 0; i < 5; i++) {
      allCandidates.push({ dId: controllingPlayer, sIndex: i, isEmz: false });
    }

    const hasPath = (src: NodeKey, dst: NodeKey): boolean => {
      const q = [src];
      const vis = new Set<string>([nodeToKey(src)]);
      const dstKey = nodeToKey(dst);
      while (q.length > 0) {
        const cur = q.shift()!;
        if (nodeToKey(cur) === dstKey) return true;
        for (const cand of allCandidates) {
          const k = nodeToKey(cand);
          if (vis.has(k)) continue;
          if (this.isCoLinked(cur.dId, cur.sIndex, cur.isEmz, cand.dId, cand.sIndex, cand.isEmz)) {
            vis.add(k);
            q.push(cand);
          }
        }
      }
      return false;
    };

    const queryNode: NodeKey = { dId: duelistId, sIndex: slotIndex, isEmz };
    return hasPath(startNode, queryNode) && hasPath(queryNode, targetNode);
  }

  /**
   * Checks whether global monster effect negation (Skill Drain) is active on the battlefield.
   * True if any face-up Continuous Trap with TRAP_ABSOLUTE_ZERO_FREEZE is active.
   */
  public isGlobalMonsterEffectNegationActive(): boolean {
    for (const p of [this.player, this.opponent]) {
      for (const slot of p.spellTrapZones) {
        if (slot && slot.card && slot.isFaceUp && slot.card.def.effectCode === 'TRAP_ABSOLUTE_ZERO_FREEZE') {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Determines whether a specific monster slot currently has its effects negated.
   * Evaluates global Skill Drain field lock, individual slot negation, and lingering turn effects.
   */
  public isMonsterEffectNegated(duelistId: string, slotIndex: number, isEmz: boolean = false): boolean {
    if (this.isGlobalMonsterEffectNegationActive()) {
      return true;
    }
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) return false;

    if (slot.isEffectNegated === true) {
      if (slot.effectsNegatedUntilTurn === undefined || slot.effectsNegatedUntilTurn >= this.currentTurn) {
        return true;
      }
    }

    // Check lingering effects on duelist
    if (this.hasLingeringEffect(duelistId, 'STAT_MODIFIER')) {
      const effects = this.getLingeringEffects(duelistId).filter(e => e.payload?.negateAllMonsters === true);
      if (effects.length > 0) return true;
    }

    return false;
  }

  /**
   * Negates the effects of a monster on the field for a duration (Rulebook v10 tr. 48-49, 54).
   * Does NOT prevent declaring attack, changing position, or paying activation costs (e.g. detaching Xyz materials).
   */
  public negateMonsterEffects(
    duelistId: string,
    slotIndex: number,
    duration: 'UNTIL_END_OF_TURN' | 'PERMANENT',
    reason: string = 'EFFECT_NEGATION',
    isEmz: boolean = false
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không có quái thú tại ô này để vô hiệu hóa hiệu ứng!' };
    }

    slot.isEffectNegated = true;
    slot.effectsNegatedUntilTurn = duration === 'UNTIL_END_OF_TURN' ? this.currentTurn : 9999;

    this.recordGameEvent('MONSTER_EFFECTS_NEGATED', slot.card, duelistId, {
      slotIndex,
      isEmz,
      duration,
      reason
    });

    this.addLog(
      duelist.name,
      `[Vô Hiệu Hóa Hiệu Ứng - Rulebook v10 tr. 48-49 & 54] Hiệu ứng của quái thú [${slot.card.def.name}] bị vô hiệu hóa ${duration === 'UNTIL_END_OF_TURN' ? 'cho đến hết lượt này' : 'vĩnh viễn'}!`,
      'INFO'
    );

    return {
      success: true,
      message: `Đã vô hiệu hóa hiệu ứng của [${slot.card.def.name}] (${duration === 'UNTIL_END_OF_TURN' ? 'hết lượt' : 'vĩnh viễn'}).`
    };
  }

  /**
   * Resets temporary monster effect negations whose duration has expired (Rulebook v10 tr. 48-49 & 54).
   */
  public resolveEndPhaseNegations(): void {
    for (const p of [this.player, this.opponent]) {
      for (const slot of p.monsterZones) {
        if (slot && slot.effectsNegatedUntilTurn !== undefined && slot.effectsNegatedUntilTurn <= this.currentTurn) {
          slot.isEffectNegated = false;
          slot.effectsNegatedUntilTurn = undefined;
        }
      }
      if (p.extraMonsterZone && p.extraMonsterZone.effectsNegatedUntilTurn !== undefined && p.extraMonsterZone.effectsNegatedUntilTurn <= this.currentTurn) {
        p.extraMonsterZone.isEffectNegated = false;
        p.extraMonsterZone.effectsNegatedUntilTurn = undefined;
      }
    }
  }

  /**
   * Master Rule 2020 / Rulebook v10 tr. 52-55:
   * Checks whether a monster is immune to card effect destruction.
   * Considers innate monster effects (negated by Skill Drain / individual negation),
   * slot-level protection, continuous Spells/Traps on the field (NOT negated by Skill Drain),
   * and temporary lingering protections.
   */
  public isMonsterProtectedFromCardEffects(duelistId: string, slotIndex: number, isEmz: boolean = false): boolean {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) return false;

    const card = slot.card;

    // 1. Innate monster card effect protection (negated if monster effect is negated)
    const hasInnateProtection = !!(
      card.cannotBeDestroyedByCardEffects ||
      card.def.cannotBeDestroyedByCardEffects ||
      card.def.effectCode === 'IMMUNE_DESTROY'
    );
    if (hasInnateProtection && !this.isMonsterEffectNegated(duelistId, slotIndex, isEmz)) {
      return true;
    }

    // 2. Slot-level direct protection
    if (slot.cannotBeDestroyedByCardEffects) {
      return true;
    }

    // 3. Temporary lingering protection (until end of specified turn)
    if (slot.effectDestructionImmunityUntilTurn !== undefined && this.currentTurn <= slot.effectDestructionImmunityUntilTurn) {
      return true;
    }

    // 4. Continuous Spell/Trap cards on controller's field (NOT negated by Skill Drain!)
    for (const st of duelist.spellTrapZones) {
      if (st && st.card && st.isFaceUp) {
        if (st.card.def.effectCode === 'SPELL_PASSIVATION_OXIDE_FILM') {
          if (card.def.attribute === 'TERRA') {
            return true;
          }
        } else if (st.card.def.effectCode === 'TRAP_ANODIC_PROTECTION') {
          if (card.def.attribute === 'TERRA') {
            return true;
          }
        }
      }
    }

    // 5. Extra Link Conjugated Resonance Invariant: Monsters in an active Extra Link cannot be destroyed by card effects
    if (this.isMonsterInExtraLink(duelistId, slotIndex, isEmz)) {
      return true;
    }

    return false;
  }

  /**
   * Master Rule 2020 / Rulebook v10 tr. 40-43, 54:
   * Checks whether a monster is immune to battle destruction.
   * Note: Even if protected from battle destruction, battle damage is still calculated
   * and inflicted to player LP! (Rulebook v10 tr. 40-41).
   */
  public isMonsterProtectedFromBattle(duelistId: string, slotIndex: number, isEmz: boolean = false): boolean {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) return false;

    const card = slot.card;

    // 1. Innate monster card battle protection (negated if monster effect is negated)
    const hasInnateBattleProtection = !!(
      card.cannotBeDestroyedByBattle ||
      card.def.cannotBeDestroyedByBattle ||
      card.def.effectCode === 'IMMUNE_BATTLE'
    );
    if (hasInnateBattleProtection && !this.isMonsterEffectNegated(duelistId, slotIndex, isEmz)) {
      return true;
    }

    // 2. Slot-level direct protection
    if (slot.cannotBeDestroyedByBattle) {
      return true;
    }

    // 3. Temporary lingering protection (until end of specified turn)
    if (slot.battleDestructionImmunityUntilTurn !== undefined && this.currentTurn <= slot.battleDestructionImmunityUntilTurn) {
      return true;
    }

    return false;
  }

  /**
   * Grants battle destruction immunity to a monster slot (Rulebook v10 tr. 40-43, 54).
   * Duration can be 'UNTIL_END_OF_TURN' or a specific number of turns.
   */
  public grantBattleProtection(
    duelistId: string,
    slotIndex: number,
    duration: 'UNTIL_END_OF_TURN' | number = 'UNTIL_END_OF_TURN',
    reason: string = 'EFFECT_PROTECTION',
    isEmz: boolean = false
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không tìm thấy quái thú để ban khiên bảo vệ!' };
    }

    slot.cannotBeDestroyedByBattle = true;
    if (duration === 'UNTIL_END_OF_TURN') {
      slot.battleDestructionImmunityUntilTurn = this.currentTurn;
    } else if (typeof duration === 'number') {
      slot.battleDestructionImmunityUntilTurn = this.currentTurn + duration;
    }

    this.recordGameEvent('MONSTER_PROTECTION_GRANTED', slot.card, duelistId, {
      slotIndex,
      isEmz,
      protectionType: 'BATTLE',
      duration,
      reason
    });

    this.addLog(
      duelist.name,
      `[KHIÊN BẢO VỆ CHIẾN ĐẤU] [${slot.card.def.name}] nhận khiên bất hoại trước giao chiến vật lý (${duration === 'UNTIL_END_OF_TURN' ? 'Đến hết lượt' : `${duration} lượt`})! Lý do: ${reason}`,
      'INFO'
    );

    return { success: true, message: `Đã ban khiên bảo vệ chiến đấu cho [${slot.card.def.name}]!` };
  }

  /**
   * Grants card effect destruction immunity to a monster slot (Rulebook v10 tr. 30-31, 52-55).
   * Duration can be 'UNTIL_END_OF_TURN' or a specific number of turns.
   */
  public grantEffectProtection(
    duelistId: string,
    slotIndex: number,
    duration: 'UNTIL_END_OF_TURN' | number = 'UNTIL_END_OF_TURN',
    reason: string = 'EFFECT_PROTECTION',
    isEmz: boolean = false
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) {
      return { success: false, message: 'Không tìm thấy quái thú để ban khiên bảo vệ!' };
    }

    slot.cannotBeDestroyedByCardEffects = true;
    if (duration === 'UNTIL_END_OF_TURN') {
      slot.effectDestructionImmunityUntilTurn = this.currentTurn;
    } else if (typeof duration === 'number') {
      slot.effectDestructionImmunityUntilTurn = this.currentTurn + duration;
    }

    this.recordGameEvent('MONSTER_PROTECTION_GRANTED', slot.card, duelistId, {
      slotIndex,
      isEmz,
      protectionType: 'EFFECT',
      duration,
      reason
    });

    this.addLog(
      duelist.name,
      `[KHIÊN BẢO VỆ HIỆU ỨNG] [${slot.card.def.name}] nhận khiên thụ động hóa kháng hủy hiệu ứng (${duration === 'UNTIL_END_OF_TURN' ? 'Đến hết lượt' : `${duration} lượt`})! Lý do: ${reason}`,
      'INFO'
    );

    return { success: true, message: `Đã ban khiên bảo vệ hiệu ứng cho [${slot.card.def.name}]!` };
  }

  /**
   * Resets temporary battle & effect destruction protections that have expired at the end of turn (Rulebook v10 tr. 30-31, 54).
   */
  public resolveEndPhaseProtections(): void {
    for (const duelist of [this.player, this.opponent]) {
      for (let i = 0; i < duelist.monsterZones.length; i++) {
        const slot = duelist.monsterZones[i];
        if (slot) {
          // Reset once-per-turn element shields
          slot.passivationShieldUsed = false;
          slot.inertShieldUsed = false;

          // Reset temporary battle destruction immunity
          if (slot.battleDestructionImmunityUntilTurn !== undefined && this.currentTurn >= slot.battleDestructionImmunityUntilTurn) {
            slot.cannotBeDestroyedByBattle = false;
            delete slot.battleDestructionImmunityUntilTurn;
            this.recordGameEvent('MONSTER_PROTECTION_EXPIRED', slot.card || undefined, duelist.id, {
              slotIndex: i,
              protectionType: 'BATTLE'
            });
          }

          // Reset temporary effect destruction immunity
          if (slot.effectDestructionImmunityUntilTurn !== undefined && this.currentTurn >= slot.effectDestructionImmunityUntilTurn) {
            slot.cannotBeDestroyedByCardEffects = false;
            delete slot.effectDestructionImmunityUntilTurn;
            this.recordGameEvent('MONSTER_PROTECTION_EXPIRED', slot.card || undefined, duelist.id, {
              slotIndex: i,
              protectionType: 'EFFECT'
            });
          }
        }
      }

      if (duelist.extraMonsterZone) {
        const emz = duelist.extraMonsterZone;
        emz.passivationShieldUsed = false;
        emz.inertShieldUsed = false;
        if (emz.battleDestructionImmunityUntilTurn !== undefined && this.currentTurn >= emz.battleDestructionImmunityUntilTurn) {
          emz.cannotBeDestroyedByBattle = false;
          delete emz.battleDestructionImmunityUntilTurn;
        }
        if (emz.effectDestructionImmunityUntilTurn !== undefined && this.currentTurn >= emz.effectDestructionImmunityUntilTurn) {
          emz.cannotBeDestroyedByCardEffects = false;
          delete emz.effectDestructionImmunityUntilTurn;
        }
      }
    }
  }

  /**
   * Calculates the full effective ATK of a monster on the field according to Master Rule 2020:
   * Base ATK + Equip Modifiers + Lingering/Temporary Modifiers + Continuous Static Modifiers (Spells/Traps/Field)
   */
  public getEffectiveMonsterAtk(duelistId: string, slotIndex: number, isEmz: boolean = false): number {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) return 0;

    const baseAtk = slot.card.def.atk || 0;
    const lingeringAtk = slot.tempAtkBoost || 0;

    // Equip card modifiers
    let equipAtk = 0;
    if (slot.equippedCards) {
      for (const eq of slot.equippedCards) {
        if (eq.def.effectCode === 'EQUIP_CATALYST_SITE') {
          equipAtk += 300;
        }
      }
    }

    // Continuous Spells/Traps on controller's field
    let continuousAtk = 0;
    for (const st of duelist.spellTrapZones) {
      if (st && st.card && st.isFaceUp) {
        if (st.card.def.effectCode === 'SPELL_PLASMA_CONFINEMENT') {
          if (slot.card.def.attribute === 'ELECTRO' || slot.card.def.attribute === 'PYRO') {
            continuousAtk += 400;
          }
        } else if (st.card.def.effectCode === 'SPELL_DIAMOND_CRYSTAL_LATTICE') {
          const col = isEmz ? (slotIndex === 0 ? 1 : 3) : slotIndex;
          const adj = this.getAdjacentColumns(col as BattlefieldColumnIndex);
          const hasAlliedNeighbor = adj.some(adjCol => {
            const adjSlot = duelist.monsterZones[adjCol];
            return adjSlot && adjSlot.card;
          });
          if (hasAlliedNeighbor) continuousAtk += 400;
        }
      }
    }

    // Continuous Spells/Traps on opponent's field affecting this monster
    const opp = this.getOpponent(duelistId);
    for (const st of opp.spellTrapZones) {
      if (st && st.card && st.isFaceUp) {
        if (st.card.def.effectCode === 'SPELL_ENDOTHERMIC_CHAMBER') {
          if (slot.card.def.attribute === 'PYRO') {
            continuousAtk -= 600;
          }
        }
      }
    }

    // Field Environment static modifiers
    if (duelist.fieldZone && !duelist.fieldZone.isFaceDown) {
      if (duelist.fieldZone.def.effectCode === 'FIELD_OCTAHEDRAL_COMPLEX') {
        const isExtra = ['COMPOUND_MONSTER', 'SYNCHRO_MONSTER', 'XYZ_MONSTER', 'LINK_MONSTER'].includes(slot.card.def.cardType);
        if (isExtra || (slot.xyzMaterials && slot.xyzMaterials.length > 0)) {
          continuousAtk += 400;
        }
      }
    }

    // Extra Link Conjugated Resonance Boost (+500 ATK - GDPT 2018 delocalized pi-electron cloud)
    let extraLinkAtk = 0;
    if (this.isMonsterInExtraLink(duelistId, slotIndex, isEmz)) {
      extraLinkAtk += 500;
    }

    return Math.max(0, baseAtk + lingeringAtk + equipAtk + continuousAtk + extraLinkAtk);
  }

  /**
   * Calculates the full effective DEF of a monster on the field according to Master Rule 2020:
   * Base DEF + Equip Modifiers + Lingering/Temporary Modifiers + Continuous Static Modifiers (Spells/Traps/Field)
   */
  public getEffectiveMonsterDef(duelistId: string, slotIndex: number, isEmz: boolean = false): number {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) return 0;

    const baseDef = slot.card.def.def || 0;
    const lingeringDef = slot.tempDefBoost || 0;

    let equipDef = 0;
    if (slot.equippedCards) {
      for (const eq of slot.equippedCards) {
        if (eq.def.effectCode === 'EQUIP_CATALYST_SITE') {
          equipDef += 300;
        }
      }
    }

    let continuousDef = 0;
    for (const st of duelist.spellTrapZones) {
      if (st && st.card && st.isFaceUp) {
        if (st.card.def.effectCode === 'SPELL_DIAMOND_CRYSTAL_LATTICE') {
          const col = isEmz ? (slotIndex === 0 ? 1 : 3) : slotIndex;
          const adj = this.getAdjacentColumns(col as BattlefieldColumnIndex);
          const hasAlliedNeighbor = adj.some(adjCol => {
            const adjSlot = duelist.monsterZones[adjCol];
            return adjSlot && adjSlot.card;
          });
          if (hasAlliedNeighbor) continuousDef += 400;
        } else if (st.card.def.effectCode === 'SPELL_PASSIVATION_OXIDE_FILM') {
          if (slot.card.def.attribute === 'TERRA') {
            continuousDef += 300;
          }
        }
      }
    }

    if (duelist.fieldZone && !duelist.fieldZone.isFaceDown) {
      if (duelist.fieldZone.def.effectCode === 'FIELD_OCTAHEDRAL_COMPLEX') {
        const isExtra = ['COMPOUND_MONSTER', 'SYNCHRO_MONSTER', 'XYZ_MONSTER', 'LINK_MONSTER'].includes(slot.card.def.cardType);
        if (isExtra || (slot.xyzMaterials && slot.xyzMaterials.length > 0)) {
          continuousDef += 400;
        }
      }
    }

    return Math.max(0, baseDef + lingeringDef + equipDef + continuousDef);
  }

  public reviveFromGraveyard(duelistId: string, cardUid: string, targetSlotIndex?: number): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const graveIdx = duelist.graveyard.findIndex(c => c.uid === cardUid);
    if (graveIdx === -1) {
      return { success: false, message: 'Lá bài không tồn tại trong Mộ Bài (có thể đã bị trục xuất vào Vùng Bị Loại)!' };
    }

    const targetCard = duelist.graveyard[graveIdx];
    const isSpecialType = targetCard.def.cardType === 'COMPOUND_MONSTER' ||
      targetCard.def.cardType === 'SYNCHRO_MONSTER' ||
      targetCard.def.cardType === 'XYZ_MONSTER' ||
      targetCard.def.cardType === 'LINK_MONSTER' ||
      targetCard.def.cardType === 'RITUAL_MONSTER';

    if (isSpecialType && !targetCard.properlySummoned) {
      return {
        success: false,
        message: `[Vi Phạm Master Rule] Quái thú Extra Deck / Nghi Thức [${targetCard.def.name}] chưa từng được Triệu Hồi Đúng Chuẩn trước đó (Properly Special Summoned First), không thể hồi sinh!`
      };
    }

    let emptySlot = targetSlotIndex !== undefined && duelist.monsterZones[targetSlotIndex] === null
      ? targetSlotIndex
      : duelist.monsterZones.findIndex(s => s === null);

    if (emptySlot === -1) {
      return { success: false, message: 'Khu vực quái thú đã đầy, không thể hồi sinh!' };
    }

    const revived = duelist.graveyard.splice(graveIdx, 1)[0];
    duelist.monsterZones[emptySlot] = {
      slotIndex: emptySlot,
      card: revived,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };
    this.addLog(duelist.name, `[Hồi Sinh Mộ Bài] [${revived.def.name}] được hồi sinh từ Mộ Bài lên ô ${emptySlot + 1}!`, 'SUMMON');
    return { success: true, message: `Hồi sinh [${revived.def.name}] thành công!` };
  }

  public summonFromBanished(duelistId: string, cardUid: string, targetSlotIndex?: number): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const banIdx = duelist.banished.findIndex(c => c.uid === cardUid);
    if (banIdx === -1) {
      return { success: false, message: 'Lá bài không có trong Vùng Bị Loại!' };
    }

    const targetCard = duelist.banished[banIdx];
    const isSpecialType = targetCard.def.cardType === 'COMPOUND_MONSTER' ||
      targetCard.def.cardType === 'SYNCHRO_MONSTER' ||
      targetCard.def.cardType === 'XYZ_MONSTER' ||
      targetCard.def.cardType === 'LINK_MONSTER' ||
      targetCard.def.cardType === 'RITUAL_MONSTER';

    if (isSpecialType && !targetCard.properlySummoned) {
      return {
        success: false,
        message: `[Vi Phạm Master Rule] Quái thú Extra Deck / Nghi Thức [${targetCard.def.name}] chưa từng được Triệu Hồi Đúng Chuẩn trước đó (Properly Special Summoned First), không thể hồi sinh!`
      };
    }

    let emptySlot = targetSlotIndex !== undefined && duelist.monsterZones[targetSlotIndex] === null
      ? targetSlotIndex
      : duelist.monsterZones.findIndex(s => s === null);

    if (emptySlot === -1) {
      return { success: false, message: 'Khu vực quái thú đã đầy!' };
    }

    const summoned = duelist.banished.splice(banIdx, 1)[0];
    duelist.monsterZones[emptySlot] = {
      slotIndex: emptySlot,
      card: summoned,
      position: 'FACE_UP_ATTACK',
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };
    this.addLog(duelist.name, `[Triệu Hồi Từ Hư Vô] [${summoned.def.name}] trở về từ Vùng Bị Loại (Banished Zone)!`, 'SUMMON');
    return { success: true, message: `Triệu hồi [${summoned.def.name}] từ Vùng Bị Loại thành công!` };
  }

  /**
   * Special Summon from Graveyard (Master Rule: Does NOT consume Normal Summon count)
   */
  public specialSummonFromGraveyard(
    duelistId: string,
    cardUid: string,
    targetSlotIndex?: number,
    position: MonsterBattlePosition = 'FACE_UP_ATTACK'
  ): { success: boolean; message: string; card?: CardInstance; slotIndex?: number } {
    const duelist = this.getDuelist(duelistId);
    const graveIdx = duelist.graveyard.findIndex(c => c.uid === cardUid);
    if (graveIdx === -1) {
      return { success: false, message: 'Lá bài không tồn tại trong Mộ Bài!' };
    }

    const targetCard = duelist.graveyard[graveIdx];
    const isSpecialType =
      targetCard.def.cardType === 'COMPOUND_MONSTER' ||
      targetCard.def.cardType === 'SYNCHRO_MONSTER' ||
      targetCard.def.cardType === 'XYZ_MONSTER' ||
      targetCard.def.cardType === 'LINK_MONSTER' ||
      targetCard.def.cardType === 'RITUAL_MONSTER';

    if (isSpecialType && !targetCard.properlySummoned) {
      return {
        success: false,
        message: `Quái thú [${targetCard.def.name}] chưa từng được Triệu Hồi Đúng Chuẩn trước đó (Properly Special Summoned First), không thể hồi sinh!`
      };
    }

    const emptySlot =
      targetSlotIndex !== undefined && duelist.monsterZones[targetSlotIndex] === null
        ? targetSlotIndex
        : duelist.monsterZones.findIndex(s => s === null);

    if (emptySlot === -1) {
      return { success: false, message: 'Khu vực quái thú trên sân đã đầy!' };
    }

    const revived = duelist.graveyard.splice(graveIdx, 1)[0];
    duelist.monsterZones[emptySlot] = {
      slotIndex: emptySlot,
      card: revived,
      position,
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };

    this.checkTriggerEffects('ON_SUMMON', revived, duelistId, emptySlot);
    this.addLog(duelist.name, `[Triệu Hồi Đặc Biệt Mộ Bài] [${revived.def.name}] được triệu hồi đặc biệt lên ô ${emptySlot + 1}!`, 'SUMMON');
    return { success: true, message: `Triệu hồi đặc biệt [${revived.def.name}] từ Mộ Bài thành công!`, card: revived, slotIndex: emptySlot };
  }

  /**
   * Special Summon from Hand (Does NOT consume Normal Summon count)
   */
  public specialSummonFromHand(
    duelistId: string,
    handCardUid: string,
    targetSlotIndex?: number,
    position: MonsterBattlePosition = 'FACE_UP_ATTACK',
    ignoreCost: boolean = false
  ): { success: boolean; message: string; card?: CardInstance; slotIndex?: number } {
    const duelist = this.getDuelist(duelistId);
    const handIndex = duelist.hand.findIndex(c => c.uid === handCardUid);
    if (handIndex === -1) {
      return { success: false, message: 'Lá bài không có trên tay!' };
    }

    const card = duelist.hand[handIndex];
    const isMonster =
      card.def.cardType === 'ELEMENT_MONSTER' ||
      card.def.cardType === 'COMPOUND_MONSTER' ||
      card.def.cardType === 'SYNCHRO_MONSTER' ||
      card.def.cardType === 'XYZ_MONSTER' ||
      card.def.cardType === 'PENDULUM_MONSTER' ||
      card.def.cardType === 'RITUAL_MONSTER';

    if (!isMonster) {
      return { success: false, message: 'Lá bài này không phải quái thú!' };
    }

    if (!ignoreCost && duelist.mana < card.def.manaCost) {
      return { success: false, message: `Không đủ Mana! Cần ${card.def.manaCost} Mana (Hiện có: ${duelist.mana}).` };
    }

    const emptySlot =
      targetSlotIndex !== undefined && duelist.monsterZones[targetSlotIndex] === null
        ? targetSlotIndex
        : duelist.monsterZones.findIndex(s => s === null);

    if (emptySlot === -1) {
      return { success: false, message: 'Khu vực quái thú trên sân đã đầy!' };
    }

    if (!ignoreCost) {
      duelist.mana -= card.def.manaCost;
    }

    duelist.hand.splice(handIndex, 1);
    duelist.monsterZones[emptySlot] = {
      slotIndex: emptySlot,
      card,
      position,
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };

    this.checkTriggerEffects('ON_SUMMON', card, duelistId, emptySlot);
    this.addLog(duelist.name, `[Triệu Hồi Đặc Biệt Từ Tay] [${card.def.name}] giáng lâm lên ô ${emptySlot + 1}!`, 'SUMMON');
    return { success: true, message: `Triệu hồi đặc biệt [${card.def.name}] từ tay thành công!`, card, slotIndex: emptySlot };
  }

  /**
   * Special Summon from Deck directly to Field
   */
  public specialSummonFromDeck(
    duelistId: string,
    predicate: string | ((c: CardInstance) => boolean),
    targetSlotIndex?: number,
    position: MonsterBattlePosition = 'FACE_UP_ATTACK'
  ): { success: boolean; message: string; card?: CardInstance; slotIndex?: number } {
    const duelist = this.getDuelist(duelistId);
    const deckIdx = typeof predicate === 'string'
      ? duelist.deck.findIndex(c => c.uid === predicate || c.def.id === predicate)
      : duelist.deck.findIndex(predicate);

    if (deckIdx === -1) {
      return { success: false, message: 'Không tìm thấy quái thú phù hợp trong Bộ bài!' };
    }

    const emptySlot =
      targetSlotIndex !== undefined && duelist.monsterZones[targetSlotIndex] === null
        ? targetSlotIndex
        : duelist.monsterZones.findIndex(s => s === null);

    if (emptySlot === -1) {
      return { success: false, message: 'Khu vực quái thú trên sân đã đầy!' };
    }

    const summoned = duelist.deck.splice(deckIdx, 1)[0];
    duelist.monsterZones[emptySlot] = {
      slotIndex: emptySlot,
      card: summoned,
      position,
      hasAttackedThisTurn: false,
      hasChangedPositionThisTurn: false,
      turnSummoned: this.currentTurn,
      tempAtkBoost: 0,
      tempDefBoost: 0
    };

    // Shuffle deck after tutor
    for (let i = duelist.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duelist.deck[i], duelist.deck[j]] = [duelist.deck[j], duelist.deck[i]];
    }
    this.checkTriggerEffects('ON_SUMMON', summoned, duelistId, emptySlot);
    this.addLog(duelist.name, `[Triệu Hồi Đặc Biệt Từ Deck] [${summoned.def.name}] được gọi thẳng từ Bộ bài lên ô ${emptySlot + 1}!`, 'SUMMON');
    return { success: true, message: `Triệu hồi đặc biệt [${summoned.def.name}] từ Bộ bài thành công!`, card: summoned, slotIndex: emptySlot };
  }

  /**
   * Search / Add card from Deck to Hand
   */
  public searchDeckToHand(
    duelistId: string,
    predicate: string | ((c: CardInstance) => boolean)
  ): { success: boolean; message: string; card?: CardInstance } {
    const duelist = this.getDuelist(duelistId);
    const deckIdx = typeof predicate === 'string'
      ? duelist.deck.findIndex(c => c.uid === predicate || c.def.id === predicate)
      : duelist.deck.findIndex(predicate);

    if (deckIdx === -1) {
      return { success: false, message: 'Không tìm thấy lá bài phù hợp trong Bộ bài!' };
    }

    const card = duelist.deck.splice(deckIdx, 1)[0];
    duelist.hand.push(card);
    for (let i = duelist.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duelist.deck[i], duelist.deck[j]] = [duelist.deck[j], duelist.deck[i]];
    }
    this.addLog(duelist.name, `[Tìm Kiếm Bộ Bài] Rút lá [${card.def.name}] từ Bộ bài lên tay!`, 'INFO');
    return { success: true, message: `Thêm [${card.def.name}] vào tay thành công!`, card };
  }

  /**
   * Mill top cards from Deck directly to Graveyard
   */
  public millDeckToGraveyard(duelistId: string, count: number): { success: boolean; countMilled: number; cards: CardInstance[] } {
    const duelist = this.getDuelist(duelistId);
    const milled: CardInstance[] = [];
    const toMill = Math.min(count, duelist.deck.length);

    for (let i = 0; i < toMill; i++) {
      const c = duelist.deck.shift();
      if (c) {
        duelist.graveyard.push(c);
        milled.push(c);
      }
    }

    if (milled.length > 0) {
      this.addLog(duelist.name, `[Mộ Hóa] Gửi ${milled.length} lá từ đỉnh Bộ bài xuống Mộ Bài!`, 'INFO');
    }
    return { success: true, countMilled: milled.length, cards: milled };
  }

  /**
   * Evaluates active battlefield card combinations with environmental conditions using DCSM ReactionEngine.
   */
  public evaluateBattlefieldReaction(
    duelistId: string,
    cardUids: string[]
  ): ReactionEvaluationResult & { success: boolean; message: string; damageInflicted?: number } {
    const duelist = this.getDuelist(duelistId);
    const opponent = this.getOpponent(duelistId);

    // Collect card definitions
    const involvedCards: CardInstance[] = [];
    for (const uid of cardUids) {
      // Find on field or in hand
      const fieldCard = duelist.monsterZones.find(s => s && s.card && s.card.uid === uid)?.card;
      if (fieldCard) {
        involvedCards.push(fieldCard);
      } else {
        const handCard = duelist.hand.find(c => c.uid === uid);
        if (handCard) involvedCards.push(handCard);
      }
    }

    const symbols = involvedCards
      .map(c => c.def.chemicalFormula?.replace(/[^a-zA-Z0-9]/g, '') || '')
      .filter(Boolean);

    // Map current environment to EnvironmentalConditions
    const activeConditions: EnvironmentalCondition[] = [];
    if (this.environment.solvent === 'WATER' || duelist.monsterZones.some(s => s?.card?.def.chemicalFormula === 'H2O')) {
      activeConditions.push('MOISTURE_H2O');
    }
    if (this.environment.temperature > 373.15 || duelist.monsterZones.some(s => s?.card?.def.attribute === 'PYRO')) {
      activeConditions.push('HIGH_TEMP');
    }
    if (this.environment.ph < 6.0 || duelist.monsterZones.some(s => s?.card?.def.chemicalFormula === 'HCl')) {
      activeConditions.push('ACID_DILUTE');
    }
    if (this.environment.ph > 8.0 || duelist.monsterZones.some(s => s?.card?.def.chemicalFormula === 'NaOH')) {
      activeConditions.push('BASE_ALKALINE');
    }
    if (duelist.monsterZones.some(s => s?.card?.def.chemicalFormula === 'O2')) {
      activeConditions.push('OXYGEN_GAS');
    }
    if (this.environment.activeCatalysts.length > 0 || duelist.spellTrapZones.some(s => s?.card && s.card.def.cardType === 'EQUIP_CATALYST')) {
      activeConditions.push('CATALYST');
    }

    const evalResult = this.reactionEngine.evaluateCombination(symbols, activeConditions);

    if (evalResult.status === 'SUCCESS' && evalResult.matchedRule) {
      const dmg = evalResult.matchedRule.basePower * 10;
      opponent.lp = Math.max(0, opponent.lp - dmg);
      this.addLog(
        evalResult.matchedRule.name_vi,
        `[DCSM Phản Ứng Hóa Học] ${evalResult.equation}: Gây ${dmg} LP sát thương lên đối thủ!`,
        'CHEMICAL_REACTION',
        evalResult.equation
      );
      this.checkWinConditions();
      return {
        ...evalResult,
        success: true,
        message: `Phản ứng thành công! ${evalResult.equation}`,
        damageInflicted: dmg
      };
    } else if (evalResult.status === 'TRAP_TRIGGERED') {
      const penalty = Math.floor(duelist.mana * (evalResult.manaPenaltyPercent / 100));
      duelist.mana = Math.max(0, duelist.mana - penalty);
      this.addLog(
        'BẪY NHẬN THỨC',
        `[Bẫy Nhận Thức] ${evalResult.pedagogicalMessage} (-${penalty} Mana)`,
        'TRAP'
      );
      this.checkWinConditions();
      return {
        ...evalResult,
        success: false,
        message: evalResult.pedagogicalMessage
      };
    }

    return {
      ...evalResult,
      success: false,
      message: evalResult.pedagogicalMessage
    };
  }

  private checkTriggerEffects(triggerType: string, card: CardInstance, duelistId: string, slotIndex: number) {
    if (triggerType === 'ON_SUMMON') {
      if (card.def.effectCode === 'ELEM_NA_BURST') {
        const duelist = this.getDuelist(duelistId);
        const opponent = this.getOpponent(duelistId);
        const hasAqua = duelist.monsterZones.some(s => s && s.card && (s.card.def.attribute === 'AQUA' || s.card.def.chemicalFormula === 'H2O')) ||
                        Boolean(duelist.fieldZone && !duelist.fieldZone.isFaceDown && duelist.fieldZone.def.attribute === 'AQUA');
        const dmg = hasAqua ? 1000 : 500;
        opponent.lp = Math.max(0, opponent.lp - dmg);
        this.addLog(
          card.def.name,
          `[Nổ Kim Loại Kiềm Trong Nước] Natri phản ứng mãnh liệt giải phóng ${dmg} LP sát thương nhiệt nổ!`,
          'CHEMICAL_REACTION',
          '2Na + 2H₂O → 2NaOH + H₂↑ + Q'
        );
        if (hasAqua) {
          const weakIdx = opponent.monsterZones.findIndex(s => s && s.card && (s.card.def.def || 0) < 1500);
          if (weakIdx !== -1) {
            const destroyed = opponent.monsterZones[weakIdx]!.card!;
            opponent.monsterZones[weakIdx] = null;
            opponent.graveyard.push(destroyed);
            this.addLog(card.def.name, `Sóng xung kích từ phản ứng Natri phá hủy [${destroyed.def.name}]!`, 'DAMAGE');
          }
        }
        this.checkWinConditions();
      }

      if (card.def.effectCode === 'ELEM_BA_PRECIP') {
        const duelist = this.getDuelist(duelistId);
        const opponent = this.getOpponent(duelistId);
        opponent.trapsLockedTurn = this.currentTurn;
        this.addLog(
          card.def.name,
          `[Trầm Tích Bari BaSO₄] Ion Ba²⁺ kết tủa phong tỏa kích hoạt bẫy của ${opponent.name} trong lượt này!`,
          'CHEMICAL_REACTION',
          'Ba²⁺ + SO₄²⁻ → BaSO₄↓'
        );
      }
    }
  }

  /**
   * Cleans up and sends all attached Xyz Materials to Graveyard when host Xyz Monster leaves field
   */
  public cleanSlotXyzMaterials(duelistId: string, slotIndex: number, isEmz: boolean = false): void {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];
    if (slot && slot.xyzMaterials && slot.xyzMaterials.length > 0) {
      for (const mat of slot.xyzMaterials) {
        duelist.graveyard.push(mat);
      }
      this.addLog(
        duelist.name,
        `[Vật Liệu Xyz] ${slot.xyzMaterials.length} lá bài vật liệu xếp chồng đã được chuyển xuống Mộ Bài khi quái thú Xyz rời sân.`,
        'INFO'
      );
      slot.xyzMaterials = [];
    }
  }

  /**
   * Attach Equip Card / Catalyst to target monster (Rulebook v10 tr. 28)
   */
  public attachEquipCard(
    duelistId: string,
    equipCardUid: string,
    targetMonsterUid: string,
    sourceSlotIndex?: number
  ): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const opponent = this.getOpponent(duelistId);

    // Find equip card either from hand or already placed in spellTrapZones
    let equipCard: CardInstance | null = null;
    let fromHand = false;
    let handIndex = duelist.hand.findIndex(c => c.uid === equipCardUid);

    if (handIndex !== -1) {
      equipCard = duelist.hand[handIndex];
      fromHand = true;
    } else {
      const stSlot = duelist.spellTrapZones.find(s => s && s.card && s.card.uid === equipCardUid);
      if (stSlot && stSlot.card) {
        equipCard = stSlot.card;
      }
    }

    if (!equipCard) {
      return { success: false, message: 'Không tìm thấy thẻ bài Trang Bị / Xúc Tác!' };
    }

    // Check mana if from hand
    if (fromHand && duelist.mana < equipCard.def.manaCost) {
      return { success: false, message: `Không đủ Mana để kích hoạt! Cần ${equipCard.def.manaCost} Mana.` };
    }

    // Find target monster slot across both players (can equip to own or opponent monster)
    let targetSlot: MonsterZoneSlot | null = null;
    let targetOwner = duelist;

    for (const s of duelist.monsterZones) {
      if (s && s.card && s.card.uid === targetMonsterUid) {
        targetSlot = s;
        targetOwner = duelist;
        break;
      }
    }
    if (!targetSlot) {
      for (const s of opponent.monsterZones) {
        if (s && s.card && s.card.uid === targetMonsterUid) {
          targetSlot = s;
          targetOwner = opponent;
          break;
        }
      }
    }

    if (!targetSlot || !targetSlot.card) {
      return { success: false, message: 'Không tìm thấy quái thú mục tiêu trên sân để trang bị!' };
    }

    // Check Spell/Trap zone space if from hand
    if (fromHand) {
      const targetStIndex = duelist.spellTrapZones.findIndex(z => z === null);
      if (targetStIndex === -1) {
        return { success: false, message: 'Hàng Phép/Bẫy của bạn đã đầy, không thể đặt thẻ Trang Bị!' };
      }
      duelist.mana -= equipCard.def.manaCost;
      duelist.hand.splice(handIndex, 1);
      duelist.spellTrapZones[targetStIndex] = {
        slotIndex: targetStIndex,
        card: equipCard,
        isFaceUp: true,
        turnSet: this.currentTurn,
        equippedToMonsterUid: targetMonsterUid
      };
    } else {
      const stSlot = duelist.spellTrapZones.find(s => s && s.card && s.card.uid === equipCardUid);
      if (stSlot) {
        stSlot.isFaceUp = true;
        stSlot.equippedToMonsterUid = targetMonsterUid;
      }
    }

    // Attach to monster slot
    targetSlot.equippedCards = targetSlot.equippedCards || [];
    targetSlot.equippedCards.push(equipCard);

    // Apply stat boosts / effects based on equip card definition
    if (equipCard.def.effectCode === 'SPELL_BUNSEN_EQUIP') {
      targetSlot.tempAtkBoost += 600;
      targetSlot.card.def.attribute = 'PYRO';
    } else if (equipCard.def.cardType === 'EQUIP_CATALYST' || equipCard.def.spellTrapSubtype === 'EQUIP_SPELL') {
      targetSlot.tempAtkBoost += 400;
    }

    if (equipCard.def.piercingDamage || equipCard.def.effectCode === 'EQUIP_PIERCING_DRILL') {
      targetSlot.hasPiercingDamage = true;
    }

    this.addLog(
      duelist.name,
      `[Trang Bị / Xúc Tác] Gắn [${equipCard.def.name}] lên [${targetSlot.card.def.name}] (Ô ${targetSlot.slotIndex + 1})!`,
      'SPELL',
      `IUPAC: Phức chất xúc tác dị thể bám vào tâm hoạt tính của cơ chất ${targetSlot.card.def.chemicalFormula || targetSlot.card.def.name}.`
    );

    return {
      success: true,
      message: `Đã trang bị thành công [${equipCard.def.name}] lên [${targetSlot.card.def.name}]!`
    };
  }

  /**
   * Cleans up and destroys all attached Equip Cards when host monster leaves field (Rulebook v10 tr. 28)
   */
  public cleanSlotEquipCards(duelistId: string, slotIndex: number, isEmz: boolean = false): void {
    const duelist = this.getDuelist(duelistId);
    const slot = isEmz ? duelist.extraMonsterZone : duelist.monsterZones[slotIndex];

    if (slot && slot.equippedCards && slot.equippedCards.length > 0) {
      const monsterName = slot.card ? slot.card.def.name : 'Quái thú';
      for (const equip of slot.equippedCards) {
        // Find equip card in player's or opponent's spellTrapZones and route to graveyard
        let foundInST = false;
        for (let i = 0; i < this.player.spellTrapZones.length; i++) {
          const st = this.player.spellTrapZones[i];
          if (st && st.card && st.card.uid === equip.uid) {
            this.player.graveyard.push(st.card);
            this.player.spellTrapZones[i] = null;
            foundInST = true;
            break;
          }
        }
        if (!foundInST) {
          for (let i = 0; i < this.opponent.spellTrapZones.length; i++) {
            const st = this.opponent.spellTrapZones[i];
            if (st && st.card && st.card.uid === equip.uid) {
              this.opponent.graveyard.push(st.card);
              this.opponent.spellTrapZones[i] = null;
              break;
            }
          }
        }

        this.addLog(
          'SYSTEM',
          `[Hủy Liên Kết Trang Bị] Khi [${monsterName}] rời sân, thẻ Trang Bị [${equip.def.name}] bị phá hủy và chuyển xuống Mộ Bài!`,
          'SPELL'
        );
      }
      slot.equippedCards = [];
      // Re-evaluate host slot piercing damage: maintain if host monster inherently has piercing, otherwise reset
      slot.hasPiercingDamage = !!(slot.card && (slot.card.def.piercingDamage || slot.card.def.effectCode === 'COMP_HCL_DISSOLVE'));
    }
  }

  /**
   * FLIP Effect resolution trigger (Damage Step Substep 4 or Flip Summon)
   */
  public checkFlipEffect(duelistId: string, card: CardInstance, slotIndex: number, isEmz: boolean = false): void {
    const duelist = this.getDuelist(duelistId);
    if (this.isMonsterEffectNegated(duelistId, slotIndex, isEmz)) {
      this.recordGameEvent('EFFECT_NEGATED', card, duelistId, {
        reason: 'FLIP_EFFECT_NEGATED_ON_FIELD',
        slotIndex,
        isEmz
      });
      this.addLog(
        duelist.name,
        `[Vô Hiệu Hóa Hiệu Ứng Lật - Rulebook v10 tr. 48-49 & 54] [${card.def.name}] lật ngửa nhưng hiệu ứng Lật (FLIP) bị vô hiệu hóa bởi trạng thái khóa hiệu ứng trên sân (Skill Drain)!`,
        'INFO'
      );
      return;
    }

    this.addLog(
      duelist.name,
      `[HIỆU ỨNG LẬT (FLIP EFFECT)] Kích hoạt hiệu ứng của quái thú lật ngửa [${card.def.name}]!`,
      'INFO'
    );
    if (card.def.effectCode?.startsWith('FLIP_') || card.def.effectText?.includes('FLIP:') || card.def.effectText?.includes('Hiệu ứng Lật')) {
      this.drawCard(duelistId);
      this.addLog(duelist.name, `[Hiệu Ứng Lật: Rút Bài] Rút 1 lá bài từ bộ bài lên tay!`, 'INFO');
    }
  }

  /**
   * Battle Step Replay Check (Rulebook v10 tr. 39)
   */
  public checkBattleStepReplay(initialDefenderCount: number): boolean {
    const opp = this.getOpponent(this.activePlayerId);
    const currentDefenderCount = opp.monsterZones.filter(s => s && s.card).length +
      (opp.extraMonsterZone && opp.extraMonsterZone.card ? 1 : 0);
    if (currentDefenderCount !== initialDefenderCount) {
      this.addLog(
        opp.name,
        `[QUY TẮC ĐÁNH LẠI (REPLAY)] Số lượng quái thú trên sân đối phương đã biến động (${initialDefenderCount} -> ${currentDefenderCount})! Kích hoạt cơ chế Replay.`,
        'INFO'
      );
      return true;
    }
    return false;
  }

  /**
   * SEGOC Controller: Simultaneous Effects Go On Chain (Rulebook v10 tr. 50)
   * Stacks simultaneous triggers by 4 tiers:
   * 1. Turn Player Mandatory
   * 2. Opponent Mandatory
   * 3. Turn Player Optional
   * 4. Opponent Optional
   */
  public buildSegocChain(
    triggers: {
      duelistId: string;
      card: CardInstance;
      isMandatory: boolean;
      description: string;
      effectPayload?: any;
    }[]
  ): ChainItem[] {
    const turnPlayerId = this.activePlayerId;
    const getSegocRank = (t: { duelistId: string; isMandatory: boolean }) => {
      if (t.isMandatory) {
        return t.duelistId === turnPlayerId ? 0 : 1;
      } else {
        return t.duelistId === turnPlayerId ? 2 : 3;
      }
    };
    const sorted = [...triggers].sort((a, b) => getSegocRank(a) - getSegocRank(b));

    for (const t of sorted) {
      const linkIndex = this.chainStack.length + 1;
      this.chainStack.push({
        chainIndex: linkIndex,
        cardInstance: t.card,
        activatorPlayerId: t.duelistId,
        spellSpeed: 1,
        description: t.description,
        effectPayload: t.effectPayload
      });
      this.addLog(
        this.getDuelist(t.duelistId).name,
        `[SEGOC Chain Link ${linkIndex}] (${t.isMandatory ? 'Bắt buộc' : 'Tùy chọn'}): ${t.description}`,
        'CHAIN'
      );
    }

    return this.chainStack;
  }

  /**
   * Problem-Solving Card Text (PSCT) Conjunction Resolution Engine (Cẩm nang Mục 8.2)
   */
  public evaluatePsctConjunction(
    conjunction: 'THEN' | 'AND_IF_YOU_DO' | 'ALSO' | 'AND',
    doActionA: () => boolean,
    doActionB: () => boolean
  ): { successA: boolean; successB: boolean; lastEvents: ('A' | 'B')[] } {
    switch (conjunction) {
      case 'THEN': {
        const successA = doActionA();
        if (!successA) return { successA: false, successB: false, lastEvents: [] };
        const successB = doActionB();
        return { successA: true, successB, lastEvents: successB ? ['B'] : ['A'] };
      }
      case 'AND_IF_YOU_DO': {
        const successA = doActionA();
        if (!successA) return { successA: false, successB: false, lastEvents: [] };
        const successB = doActionB();
        return { successA: true, successB, lastEvents: successB ? ['A', 'B'] : ['A'] };
      }
      case 'ALSO': {
        const successA = doActionA();
        const successB = doActionB();
        const lastEvents: ('A' | 'B')[] = [];
        if (successA) lastEvents.push('A');
        if (successB) lastEvents.push('B');
        return { successA, successB, lastEvents };
      }
      case 'AND': {
        const successA = doActionA();
        if (!successA) return { successA: false, successB: false, lastEvents: [] };
        const successB = doActionB();
        if (!successB) return { successA: false, successB: false, lastEvents: [] };
        return { successA: true, successB: true, lastEvents: ['A', 'B'] };
      }
    }
  }

  /**
   * Swaps ATK and DEF for Iron (Fe) multivalent redox state transition
   */
  public swapMonsterAtkDef(duelistId: string, slotIndex: number): { success: boolean; message: string } {
    const duelist = this.getDuelist(duelistId);
    const slot = duelist.monsterZones[slotIndex];
    if (!slot || !slot.card) return { success: false, message: 'Không có quái thú tại ô này!' };
    if (slot.card.def.effectCode !== 'ELEM_FE_REDOX_VALENCE') {
      return { success: false, message: 'Chỉ quái thú có hiệu ứng chuyển đổi hóa trị Sắt mới có thể hoán đổi chỉ số!' };
    }
    const oldAtk = slot.card.def.atk || 0;
    const oldDef = slot.card.def.def || 0;
    slot.card.def.atk = oldDef;
    slot.card.def.def = oldAtk;
    this.addLog(duelist.name, `[Chuyển Hóa Trị Fe²⁺ ⇄ Fe³⁺] Hoán đổi ATK (${oldAtk} ➔ ${oldDef}) và DEF (${oldDef} ➔ ${oldAtk})!`, 'CHEMICAL_REACTION', 'Fe²⁺ ⇄ Fe³⁺ + e⁻');
    return { success: true, message: 'Hoán đổi chỉ số thành công!' };
  }

  /**
   * Multi-Element Reaction Combos Engine:
   * Detects combinations of active elements on field and awards tactical synergy bonuses
   */
  public evaluateFieldChemicalCombos(duelistId: string): { triggered: boolean; combos: string[] } {
    const duelist = this.getDuelist(duelistId);
    const opponent = this.getOpponent(duelistId);
    const activeFormulas = duelist.monsterZones
      .filter((s): s is MonsterZoneSlot => s !== null && s.card !== null)
      .map(s => s.card!.def.chemicalFormula || '');

    const combos: string[] = [];

    // 1. Sulfur Combustion Combo (O + S)
    if (activeFormulas.includes('O') && activeFormulas.includes('S')) {
      combos.push('COMBUSTION_SO2');
      duelist.lp = Math.min(duelist.maxLp, duelist.lp + 300);
      opponent.lp = Math.max(0, opponent.lp - 300);
      this.addLog(
        duelist.name,
        `[Combo Phản Ứng Cháy Lưu Huỳnh] O₂ + S → SO₂! Khí sunfurơ gây 300 LP sát thương đối thủ và hồi phục 300 LP cho bạn!`,
        'CHEMICAL_REACTION',
        'S + O₂ → SO₂ (ΔH < 0)'
      );
    }

    // 2. Salt Crystallization Combo (Na + Cl)
    if (activeFormulas.includes('Na') && activeFormulas.includes('Cl')) {
      combos.push('SALT_NACL');
      duelist.lp = Math.min(duelist.maxLp, duelist.lp + 500);
      this.addLog(
        duelist.name,
        `[Combo Tạo Tinh Thể Muối Ăn NaCl] 2Na + Cl₂ → 2NaCl! Mạng tinh thể ion bền vững hồi phục 500 LP!`,
        'CHEMICAL_REACTION',
        '2Na + Cl₂ → 2NaCl'
      );
    }

    // 3. Clean Hydrogen Fuel Cell Combo (H + O)
    if (activeFormulas.includes('H') && activeFormulas.includes('O')) {
      combos.push('WATER_SYNTHESIS');
      duelist.mana = Math.min(duelist.maxMana, duelist.mana + 1);
      this.addLog(
        duelist.name,
        `[Combo Pin Nhiên Liệu Hydro - Oxy] 2H₂ + O₂ → 2H₂O! Phản ứng tỏa năng lượng sạch nạp thêm 1 Mana!`,
        'CHEMICAL_REACTION',
        '2H₂ + O₂ → 2H₂O (ΔH = -572 kJ)'
      );
    }

    // 4. Thermite Synergy Combo (Al + Fe)
    if (activeFormulas.includes('Al') && activeFormulas.includes('Fe')) {
      combos.push('THERMITE_SYNERGY');
      opponent.lp = Math.max(0, opponent.lp - 400);
      this.addLog(
        duelist.name,
        `[Combo Tương Tác Nhiệt Nhôm] Al + Fe cộng hưởng nhiệt độ cao giáng 400 LP sát thương thiêu đốt lên ${opponent.name}!`,
        'CHEMICAL_REACTION',
        '2Al + Fe₂O₃ → Al₂O₃ + 2Fe'
      );
    }

    // 5. Haber-Bosch Ammonia Synthesis (N + H)
    if ((activeFormulas.includes('N') || activeFormulas.includes('N2')) && activeFormulas.includes('H')) {
      combos.push('HABER_BOSCH_AMMONIA');
      duelist.lp = Math.min(duelist.maxLp, duelist.lp + 200);
      duelist.monsterZones.forEach(slot => {
        if (slot && slot.card) {
          slot.tempAtkBoost = (slot.tempAtkBoost || 0) + 150;
        }
      });
      this.addLog(
        duelist.name,
        `[Combo Tháp Tổng Hợp Haber-Bosch] N₂ + 3H₂ ⇌ 2NH₃! Phản ứng tổng hợp amoniac tăng 150 ATK cho tất cả quái thú và hồi 200 LP!`,
        'CHEMICAL_REACTION',
        'N₂ + 3H₂ ⇌ 2NH₃ (ΔH = -92 kJ/mol)'
      );
    }

    // 6. Hydrocarbon Combustion Flame Combo (C + H + O)
    if (activeFormulas.includes('C') && activeFormulas.includes('H') && activeFormulas.includes('O')) {
      combos.push('HYDROCARBON_COMBUSTION');
      opponent.lp = Math.max(0, opponent.lp - 450);
      duelist.mana = Math.min(duelist.maxMana, duelist.mana + 1);
      this.addLog(
        duelist.name,
        `[Combo Nhiệt Đốt Cháy Hydrocacbon] C + H + O → CO₂ + H₂O! Phản ứng cháy thiêu đốt 450 LP đối thủ và nạp thêm 1 Mana!`,
        'CHEMICAL_REACTION',
        'CₓHᵧ + (x + y/4)O₂ → xCO₂ + (y/2)H₂O'
      );
    }

    // 7. Galvanic Redox Couple (Fe + Cu)
    if (activeFormulas.includes('Cu') && activeFormulas.includes('Fe')) {
      combos.push('GALVANIC_EMF_VOLTAGE');
      this.drawCard(duelistId, false);
      duelist.monsterZones.forEach(slot => {
        if (slot && slot.card) {
          slot.tempDefBoost = (slot.tempDefBoost || 0) + 150;
        }
      });
      this.addLog(
        duelist.name,
        `[Combo Pin Điện Hóa Galvanic Fe-Cu] Fe + Cu²⁺ → Fe²⁺ + Cu (E° = +0.78V)! Suất điện động kích hoạt rút thêm 1 lá bài và tăng 150 DEF!`,
        'CHEMICAL_REACTION',
        'Fe + Cu²⁺ → Fe²⁺ + Cu (ΔE° = 0.78V)'
      );
    }

    // 8. Fischer Organic Esterification (CH3COOH + C2H5OH)
    if (activeFormulas.includes('CH3COOH') && activeFormulas.includes('C2H5OH')) {
      combos.push('ORGANIC_FISCHER_ESTERIFICATION');
      duelist.lp = Math.min(duelist.maxLp, duelist.lp + 600);
      duelist.monsterZones.forEach(slot => {
        if (slot && slot.card && (slot.card.def.attribute === 'ACID_DARK' || slot.card.def.attribute === 'AQUA' || slot.card.def.attribute === 'TERRA')) {
          slot.tempAtkBoost = (slot.tempAtkBoost || 0) + 200;
        }
      });
      this.addLog(
        duelist.name,
        `[Combo Este Hóa Fischer] CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O! Hương thơm hoa quả làm dịu chiến trường, hồi phục 600 LP!`,
        'CHEMICAL_REACTION',
        'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O'
      );
    }

    this.checkWinConditions();
    return { triggered: combos.length > 0, combos };
  }

  // ==========================================
  // STRATEGIC OPPONENT AI (SMART PLAY)
  // ==========================================
  public runAiTurn() {
    if (this.outcome !== 'IN_PROGRESS' || this.activePlayerId !== 'opponent') return;

    // Check sportsmanship surrender condition against lethal board (Rulebook v10 tr. 33)
    if (this.aiCheckSurrenderCondition()) {
      return;
    }

    // AI Main Phase 1:
    this.aiPlayMainPhase();

    // AI Battle Phase:
    if (this.outcome === 'IN_PROGRESS') {
      this.advancePhase(); // -> BATTLE_PHASE
      this.aiPlayBattlePhase();
    }

    // AI Main Phase 2:
    if (this.outcome === 'IN_PROGRESS') {
      this.advancePhase(); // -> MAIN_PHASE_2
      if (this.aiLevel !== 'NOVICE' && this.outcome === 'IN_PROGRESS') {
        this.aiPlayChemicalReactionStrategy();
      }
      this.advancePhase(); // -> END_PHASE
    }
  }

  private aiPlayMainPhase() {
    const ai = this.opponent;

    // 0. AI Environment Strategic Play: Play Field Card if in hand to control conditions
    const fieldCardInHand = ai.hand.find(c => c.def.cardType === 'FIELD_ENVIRONMENT' && ai.mana >= c.def.manaCost);
    if (fieldCardInHand) {
      this.activateSpellFromHand('opponent', fieldCardInHand.uid);
    }

    // If pH is strongly acidic (< 4.0) and AI has neutralization, neutralize to protect metal cards
    if (this.environment.ph < 4.0) {
      const neutralizer = ai.hand.find(c => c.def.effectCode === 'SPELL_PH_NEUTRALIZE' && ai.mana >= c.def.manaCost);
      if (neutralizer) {
        this.activateSpellFromHand('opponent', neutralizer.uid);
      }
    }

    // 1. PENDULUM STRATEGY: Place Scales & Pendulum Summon (Adept, Expert, Mendeleev)
    if (this.aiLevel !== 'NOVICE') {
      this.aiPlayPendulumStrategy();
    }

    // 2. NORMAL SUMMON OR TRIBUTE STRATEGY (Prioritize Tuner / Synchro / Xyz synergy)
    this.aiPlayNormalSummonStrategy();

    // 3. EXTRA DECK MASTER RULE SUMMONS (Synchro, Xyz, Detach Boosts, Compound/Fusion, Link)
    this.aiPlayExtraDeckStrategy();

    // 4. RITUAL SUMMON STRATEGY (Fullerene C60 Buckyball Ritual)
    this.aiPlayRitualStrategy();

    // 4.5. DCSM CHEMICAL REACTION COMBINATION STRATEGY (Adept, Expert, Mendeleev, Ranked AI)
    if (this.aiLevel !== 'NOVICE' && this.outcome === 'IN_PROGRESS') {
      this.aiPlayChemicalReactionStrategy();
    }

    // 5. Play Beneficial Spells from Hand
    const playableSpells = ai.hand.filter(c => 
      (c.def.cardType === 'REACTION_SPELL' || c.def.cardType === 'EQUIP_CATALYST') &&
      c.def.spellTrapSubtype !== 'RITUAL_SPELL' &&
      c.def.id !== 'card_spell_crystallization_ritual' &&
      ai.mana >= c.def.manaCost
    );
    for (const spell of playableSpells) {
      this.activateSpellFromHand('opponent', spell.uid);
      if (ai.mana <= 1) break;
    }

    // 5.1. Activate any Spells/Traps already on field if valid ignition (excluding Pendulum Monsters in S/T zones)
    for (let stIdx = 0; stIdx < ai.spellTrapZones.length; stIdx++) {
      const st = ai.spellTrapZones[stIdx];
      if (st && st.card && st.card.def.cardType !== 'TRAP' && st.card.def.cardType !== 'PENDULUM_MONSTER') {
        this.activateSpellTrapFromField('opponent', stIdx);
      }
    }

    // 6. Tactical Position Optimization for existing monsters on field
    if (this.aiLevel !== 'NOVICE') {
      this.aiOptimizeMonsterPositions();
    }

    // 7. Set Traps face-down
    const trapCandidates = ai.hand.filter(c => c.def.cardType === 'TRAP');
    for (const trap of trapCandidates) {
      const hasEmptySlot = ai.spellTrapZones.some(s => s === null);
      if (hasEmptySlot) {
        this.setSpellTrap('opponent', trap.uid);
      }
    }
  }

  /**
   * AI Pendulum Scale Management & Pendulum Swarm Summoning
   */
  private aiPlayPendulumStrategy() {
    const ai = this.opponent;
    ai.pendulumZones = ai.pendulumZones || { left: null, right: null };

    // Find pendulum monsters in hand
    const pendCardsInHand = ai.hand.filter(c => c.def.pendulumScale !== undefined);
    if (pendCardsInHand.length > 0) {
      const sortedByScale = [...pendCardsInHand].sort((a, b) => (a.def.pendulumScale || 1) - (b.def.pendulumScale || 8));

      // Left Zone (Slot 0) prefers lower scale (Scale 1)
      if (!ai.pendulumZones.left && ai.spellTrapZones[0] === null && sortedByScale.length > 0) {
        const leftCandidate = sortedByScale.shift()!;
        this.placePendulumScale('opponent', leftCandidate.uid, 'left');
      }

      // Right Zone (Slot 4) prefers higher scale (Scale 8)
      if (!ai.pendulumZones.right && ai.spellTrapZones[4] === null && sortedByScale.length > 0) {
        const rightCandidate = sortedByScale.pop()!;
        this.placePendulumScale('opponent', rightCandidate.uid, 'right');
      }
    }

    // If both scales are active, perform Pendulum Summon
    if (ai.pendulumZones.left && ai.pendulumZones.right && !ai.hasPendulumSummonedThisTurn) {
      const scaleL = ai.pendulumZones.left.def.pendulumScale || 1;
      const scaleR = ai.pendulumZones.right.def.pendulumScale || 8;
      const minScale = Math.min(scaleL, scaleR);
      const maxScale = Math.max(scaleL, scaleR);

      if (maxScale - minScale > 1) {
        const eligibleHand = ai.hand
          .filter(c => (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER' || c.def.cardType === 'PENDULUM_MONSTER') &&
            (c.def.level || 1) > minScale && (c.def.level || 1) < maxScale)
          .map(c => c.uid);

        const eligibleExtra = ai.extraDeck
          .filter(c => c.isFaceUpInExtraDeck && (c.def.level || 1) > minScale && (c.def.level || 1) < maxScale)
          .map(c => c.uid);

        const emptySlotsCount = ai.monsterZones.filter(s => s === null).length;
        if (eligibleHand.length + eligibleExtra.length > 0 && emptySlotsCount > 0) {
          const handToSummon = eligibleHand.slice(0, emptySlotsCount);
          const remainingSlots = emptySlotsCount - handToSummon.length;
          const extraToSummon = eligibleExtra.slice(0, remainingSlots);

          this.pendulumSummon('opponent', {
            handUids: handToSummon,
            extraDeckUids: extraToSummon
          });
        }
      }
    }
  }

  /**
   * AI Normal & Tribute Summoning Strategy with Tuner / Archetype synergy
   */
  private aiPlayNormalSummonStrategy() {
    const ai = this.opponent;
    if (ai.normalSummonsRemaining <= 0) return;

    let candidateToSummon: CardInstance | null = null;
    let tributeSlots: number[] = [];

    // Prioritize Tuner if we have a non-Tuner on field that can form Synchro Catalytic Converter (Level 7)
    const hasTunerInHand = ai.hand.find(c => c.def.isTuner && ai.mana >= c.def.manaCost);
    if (hasTunerInHand) {
      const tunerLvl = hasTunerInHand.def.level || 3;
      const matchingNonTuner = ai.monsterZones.find(s => s && s.card && !s.card.def.isTuner && (s.card.def.level || 1) === (7 - tunerLvl));
      if (matchingNonTuner) {
        candidateToSummon = hasTunerInHand;
      }
    }

    // Prioritize Level 4 or 5 monster if we have one of same level on field for Xyz Summon
    if (!candidateToSummon) {
      const lvl4OnField = ai.monsterZones.find(s => s && s.card && (s.card.def.level || 1) === 4);
      const lvl4InHand = ai.hand.find(c => (c.def.level || 1) === 4 && (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') && ai.mana >= c.def.manaCost);
      if (lvl4OnField && lvl4InHand) {
        candidateToSummon = lvl4InHand;
      }
    }

    // Fallback: Pick monster with highest combat power (accounting for environmental factors)
    if (!candidateToSummon) {
      const monsterCandidates = ai.hand
        .filter(c => (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER' || c.def.cardType === 'PENDULUM_MONSTER') && ai.mana >= c.def.manaCost)
        .sort((a, b) => {
          const modA = ChemicalEnvironmentEngine.calculateCombatModifiers(this.environment, a.def.cardType, a.def.attribute, a.def.chemicalFormula).atkBoost;
          const modB = ChemicalEnvironmentEngine.calculateCombatModifiers(this.environment, b.def.cardType, b.def.attribute, b.def.chemicalFormula).atkBoost;
          return ((b.def.atk || 0) + modB) - ((a.def.atk || 0) + modA);
        });

      for (const candidate of monsterCandidates) {
        const lvl = candidate.def.level || 1;
        let tribs: number[] = [];

        if (lvl > 5 && candidate.def.effectCode !== 'ELEM_K_SUPER_BURST') {
          const eligibleSlots = ai.monsterZones
            .map((s, idx) => ({ s, idx }))
            .filter(item => item.s && item.s.card && (item.s.card.def.level || 1) < lvl)
            .sort((a, b) => (a.s!.card!.def.level || 1) - (b.s!.card!.def.level || 1));

          let accum = 0;
          for (const item of eligibleSlots) {
            accum += (item.s!.card!.def.level || 1);
            tribs.push(item.idx);
            if (accum >= lvl) break;
          }

          if (accum < lvl) continue;
        }

        candidateToSummon = candidate;
        tributeSlots = tribs;
        break;
      }
    }

    if (candidateToSummon) {
      const shouldDefend =
        this.aiLevel !== 'NOVICE' &&
        (candidateToSummon.def.def || 0) > (candidateToSummon.def.atk || 0) &&
        (candidateToSummon.def.attribute === 'NOBLE_VOID' || candidateToSummon.def.effectCode.includes('INERT') || (candidateToSummon.def.def || 0) >= 1500);

      const summonPos: MonsterBattlePosition = shouldDefend ? 'FACE_UP_DEFENSE' : 'FACE_UP_ATTACK';
      this.normalSummon('opponent', candidateToSummon.uid, summonPos, tributeSlots);
    }
  }

  /**
   * AI Extra Deck Master Rule Execution (Synchro, Xyz, Detach Ignition, Fusion, Link)
   */
  private aiPlayExtraDeckStrategy() {
    const ai = this.opponent;

    // A. Synchro Summon
    for (let eIdx = 0; eIdx < ai.extraDeck.length; eIdx++) {
      const card = ai.extraDeck[eIdx];
      if (card && card.def.cardType === 'SYNCHRO_MONSTER' && ai.mana >= card.def.manaCost) {
        const targetLevel = card.def.synchroLevel || card.def.level || 7;
        const tuners = ai.monsterZones
          .map((s, idx) => ({ s, idx }))
          .filter(item => item.s && item.s.card && item.s.card.def?.isTuner);
        const nonTuners = ai.monsterZones
          .map((s, idx) => ({ s, idx }))
          .filter(item => item.s && item.s.card && !item.s.card.def?.isTuner);

        let synchroDone = false;
        for (const tuner of tuners) {
          const tLvl = tuner.s?.card?.def?.level || 1;
          for (const nt of nonTuners) {
            const ntLvl = nt.s?.card?.def?.level || 1;
            if (tLvl + ntLvl === targetLevel) {
              const res = this.synchroSummon('opponent', eIdx, tuner.idx, tuner.idx, [nt.idx]);
              if (res.success) {
                synchroDone = true;
                break;
              }
            }
          }
          if (synchroDone) break;
        }
        if (synchroDone) break;
      }
    }

    // B. Xyz Summon
    for (let eIdx = 0; eIdx < ai.extraDeck.length; eIdx++) {
      const card = ai.extraDeck[eIdx];
      if (card && card.def.cardType === 'XYZ_MONSTER' && ai.mana >= card.def.manaCost) {
        const reqRank = card.def.xyzRank || 4;
        const reqCount = card.def.xyzMaterialsRequired?.count || 2;
        const matchingSlots = ai.monsterZones
          .map((s, idx) => ({ s, idx }))
          .filter(item => item.s && item.s.card && (item.s.card.def.level || 1) === reqRank)
          .map(item => item.idx);

        if (matchingSlots.length >= reqCount) {
          const res = this.xyzSummon('opponent', eIdx, matchingSlots[0], matchingSlots.slice(0, reqCount));
          if (res.success) break;
        }
      }
    }

    // C. Xyz Detach Tactical Ignition for existing Xyz Monsters
    ai.monsterZones.forEach((slot, idx) => {
      if (slot && slot.card && slot.card.def.cardType === 'XYZ_MONSTER') {
        if (slot.xyzMaterials && slot.xyzMaterials.length > 0) {
          if (slot.card.def.effectCode === 'XYZ_FERROCENE_DETACH_BOOST') {
            this.detachXyzMaterial('opponent', idx);
          } else if (slot.card.def.effectCode === 'XYZ_COBALT_DETACH_SHIELD' && !slot.passivationShieldUsed) {
            this.detachXyzMaterial('opponent', idx);
          }
        }
      }
    });

    // D. Compound / Fusion Synthesis Summon
    for (const compoundCard of ai.extraDeck) {
      if (compoundCard.def.cardType === 'COMPOUND_MONSTER' && ai.mana >= compoundCard.def.manaCost && compoundCard.def.synthesisRecipe) {
        const mats = compoundCard.def.synthesisRecipe.reactantFormulas;
        const availableSources: { location: 'FIELD' | 'HAND'; idOrSlot: number | string }[] = [];
        for (const req of mats) {
          ai.monsterZones.forEach((slot, idx) => {
            if (slot && slot.card && slot.card.def.chemicalFormula === req.formula) {
              availableSources.push({ location: 'FIELD', idOrSlot: idx });
            }
          });
          ai.hand.forEach(c => {
            if (c.def.chemicalFormula === req.formula) {
              availableSources.push({ location: 'HAND', idOrSlot: c.uid });
            }
          });
        }
        if (availableSources.length >= 2) {
          const res = this.compoundSynthesisSummon('opponent', compoundCard.uid, availableSources);
          if (res.success) break;
        }
      } else if (compoundCard.def.cardType === 'LINK_MONSTER' && ai.mana >= compoundCard.def.manaCost) {
        // E. Link Summon
        const rating = compoundCard.def.linkRating || 1;
        const availableSlots = ai.monsterZones
          .map((s, idx) => ({ s, idx }))
          .filter(item => {
            if (!item.s || !item.s.card) return false;
            // Tactical defense: Do not sacrifice high DEF walls, inert shields, or noble void cards for low-rating Link monsters
            if (item.s.position !== 'FACE_UP_ATTACK' || (item.s.card.def.def || 0) >= 1500 || item.s.card.def.attribute === 'NOBLE_VOID') {
              return false;
            }
            return true;
          })
          .map(item => item.idx);
        if (availableSlots.length >= rating) {
          const res = this.linkSummon('opponent', compoundCard.uid, availableSlots.slice(0, rating));
          if (res.success) break;
        }
      }
    }
  }

  /**
   * AI Ritual Summon Strategy
   */
  private aiPlayRitualStrategy() {
    const ai = this.opponent;
    const ritualMonster = ai.hand.find(c => c.def.cardType === 'RITUAL_MONSTER' || c.def.isRitualMonster);
    const ritualSpell = ai.hand.find(c => c.def.spellTrapSubtype === 'RITUAL_SPELL' || c.def.id === 'card_spell_crystallization_ritual');

    if (ritualMonster && ritualSpell && ai.mana >= ritualSpell.def.manaCost) {
      const requiredLvl = ritualMonster.def.level || 8;
      const eligibleTributes = ai.monsterZones
        .map((s, idx) => ({ s, idx }))
        .filter(item => item.s && item.s.card)
        .sort((a, b) => (a.s!.card!.def.level || 1) - (b.s!.card!.def.level || 1));

      let accum = 0;
      const tributeSlots: number[] = [];
      for (const item of eligibleTributes) {
        accum += (item.s!.card!.def.level || 1);
        tributeSlots.push(item.idx);
        if (accum >= requiredLvl) break;
      }

      if (accum >= requiredLvl) {
        this.ritualSummon('opponent', ritualMonster.uid, ritualSpell.uid, tributeSlots);
      }
    }
  }

  /**
   * AI DCSM Chemical Reaction Combination Strategy
   * Evaluates monsters on field and hand cards against 310+ GDPT 2018 chemical reaction rules.
   * Strictly avoids cognitive traps and triggers high-yield burst reactions.
   */
  private aiPlayChemicalReactionStrategy() {
    if (this.outcome !== 'IN_PROGRESS') return;
    const ai = this.opponent;
    const player = this.player;

    // Collect candidate cards from AI field monsters and playable hand
    const fieldCards: CardInstance[] = ai.monsterZones
      .filter((s): s is MonsterZoneSlot => s !== null && s.card !== null && s.position !== 'FACE_DOWN_DEFENSE')
      .map(s => s.card!)
      .filter((c): c is CardInstance => Boolean(c));

    const handCards: CardInstance[] = ai.hand.filter(c => 
      (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') &&
      ai.mana >= c.def.manaCost
    );

    const availablePool: CardInstance[] = [...fieldCards, ...handCards];
    if (availablePool.length === 0) return;

    // Build active environmental conditions matching evaluateBattlefieldReaction
    const activeConditions: EnvironmentalCondition[] = [];
    if (this.environment.solvent === 'WATER' || ai.monsterZones.some(s => s?.card?.def.chemicalFormula === 'H2O') || player.monsterZones.some(s => s?.card?.def.chemicalFormula === 'H2O')) {
      activeConditions.push('MOISTURE_H2O');
    }
    if (this.environment.temperature > 373.15 || ai.monsterZones.some(s => s?.card?.def.attribute === 'PYRO') || player.monsterZones.some(s => s?.card?.def.attribute === 'PYRO')) {
      activeConditions.push('HIGH_TEMP');
    }
    if (this.environment.ph < 6.0 || ai.monsterZones.some(s => s?.card?.def.chemicalFormula === 'HCl') || player.monsterZones.some(s => s?.card?.def.chemicalFormula === 'HCl')) {
      activeConditions.push('ACID_DILUTE');
    }
    if (this.environment.ph > 8.0 || ai.monsterZones.some(s => s?.card?.def.chemicalFormula === 'NaOH') || player.monsterZones.some(s => s?.card?.def.chemicalFormula === 'NaOH')) {
      activeConditions.push('BASE_ALKALINE');
    }
    if (ai.monsterZones.some(s => s?.card?.def.chemicalFormula === 'O2') || player.monsterZones.some(s => s?.card?.def.chemicalFormula === 'O2')) {
      activeConditions.push('OXYGEN_GAS');
    }
    if (this.environment.activeCatalysts.length > 0 || ai.spellTrapZones.some(s => s?.card && s.card.def.cardType === 'EQUIP_CATALYST')) {
      activeConditions.push('CATALYST');
    }

    interface ReactionCandidate {
      cardUids: string[];
      evalResult: ReactionEvaluationResult;
      score: number;
    }

    const candidateCombinations: ReactionCandidate[] = [];

    // 1. Single card reactions with environmental condition (e.g. Na / K with MOISTURE_H2O)
    for (const card of availablePool) {
      const sym = card.def.chemicalFormula?.replace(/[^a-zA-Z0-9]/g, '');
      if (!sym) continue;

      const evalRes = this.reactionEngine.evaluateCombination([sym], activeConditions);
      if (evalRes.status === 'SUCCESS' && evalRes.matchedRule) {
        const dmg = evalRes.matchedRule.basePower * 10;
        let score = dmg;
        if (dmg >= player.lp) score += 10000; // Lethal priority
        candidateCombinations.push({
          cardUids: [card.uid],
          evalResult: evalRes,
          score
        });
      }
    }

    // 2. Pairs of cards
    for (let i = 0; i < availablePool.length; i++) {
      for (let j = i + 1; j < availablePool.length; j++) {
        const c1 = availablePool[i];
        const c2 = availablePool[j];
        const s1 = c1.def.chemicalFormula?.replace(/[^a-zA-Z0-9]/g, '');
        const s2 = c2.def.chemicalFormula?.replace(/[^a-zA-Z0-9]/g, '');
        if (!s1 || !s2 || s1 === s2) continue;

        const evalRes = this.reactionEngine.evaluateCombination([s1, s2], activeConditions);
        if (evalRes.status === 'SUCCESS' && evalRes.matchedRule) {
          const dmg = evalRes.matchedRule.basePower * 10;
          let score = dmg * 1.2;
          if (dmg >= player.lp) score += 10000;
          candidateCombinations.push({
            cardUids: [c1.uid, c2.uid],
            evalResult: evalRes,
            score
          });
        }
      }
    }

    // 3. Pick top scoring reaction
    if (candidateCombinations.length > 0) {
      candidateCombinations.sort((a, b) => b.score - a.score);
      const best = candidateCombinations[0];

      if (this.aiLevel === 'MENDELEEV' || this.aiLevel === 'EXPERT' || this.aiLevel === 'RANKED_AI') {
        this.addLog(
          this.opponent.name,
          `[Tư Duy Chiến Thuật AI] Kích hoạt chuỗi phản ứng ${best.evalResult.matchedRule?.name_vi} (${best.evalResult.equation})!`,
          'INFO'
        );
      }

      this.evaluateBattlefieldReaction('opponent', best.cardUids);
    }
  }

  /**
   * AI Monster Position Tactical Optimization
   */
  private aiOptimizeMonsterPositions() {
    const ai = this.opponent;
    ai.monsterZones.forEach((slot, idx) => {
      if (!slot || !slot.card || slot.card.def.cardType === 'LINK_MONSTER') return;
      if (slot.turnSummoned === this.currentTurn || slot.hasChangedPositionThisTurn) return;

      const atk = (slot.card.def.atk || 0) + slot.tempAtkBoost;
      const def = (slot.card.def.def || 0) + slot.tempDefBoost;

      // If currently in Attack position, but DEF is substantially higher than ATK (or noble gas)
      if (slot.position === 'FACE_UP_ATTACK' && (def >= atk + 400 || slot.card.def.attribute === 'NOBLE_VOID' || slot.card.def.effectCode.includes('INERT'))) {
        this.changeMonsterPosition('opponent', idx);
      }
      // If currently in Defense position, but ATK is now superior and monster can deal effective combat pressure
      else if (slot.position !== 'FACE_UP_ATTACK' && atk >= def + 400 && atk >= 1500) {
        this.changeMonsterPosition('opponent', idx);
      }
    });
  }

  private aiPlayBattlePhase() {
    const ai = this.opponent;
    const player = this.player;

    // AI monsters in attack position that haven't attacked
    const attackers = ai.monsterZones.filter(s => s && s.card && s.position === 'FACE_UP_ATTACK' && !s.hasAttackedThisTurn);

    for (const attacker of attackers) {
      if (!attacker || !attacker.card) continue;
      const atkValue = (attacker.card.def.atk || 0) + attacker.tempAtkBoost;

      // Check player board
      const playerMonsters = player.monsterZones.filter(s => s && s.card);

      if (playerMonsters.length === 0) {
        // Direct attack!
        this.declareAttack(attacker.slotIndex, 'DIRECT');
      } else {
        // Fluorine direct attack override if player only has defense position monsters
        const onlyDefense = playerMonsters.every(p => p !== null && p.position !== 'FACE_UP_ATTACK');
        if (attacker.card.def.effectCode === 'ELEM_F_MAX_OX' && onlyDefense) {
          this.declareAttack(attacker.slotIndex, 'DIRECT');
          if (this.outcome !== 'IN_PROGRESS') break;
          continue;
        }

        // Find best target (either kill a monster with lower ATK or destroy defense)
        let bestTargetSlot: number | null = null;
        let maxKillValue = -9999;

        for (const pSlot of playerMonsters) {
          if (!pSlot || !pSlot.card) continue;
          if (pSlot.position === 'FACE_UP_ATTACK') {
            const pAtk = (pSlot.card.def.atk || 0) + pSlot.tempAtkBoost;
            if (atkValue > pAtk) {
              const score = atkValue - pAtk + 500;
              if (score > maxKillValue) {
                maxKillValue = score;
                bestTargetSlot = pSlot.slotIndex;
              }
            }
          } else {
            const pDef = (pSlot.card.def.def || 0) + pSlot.tempDefBoost;
            if (atkValue > pDef) {
              const score = 200;
              if (score > maxKillValue) {
                maxKillValue = score;
                bestTargetSlot = pSlot.slotIndex;
              }
            }
          }
        }

        if (bestTargetSlot !== null) {
          this.declareAttack(attacker.slotIndex, bestTargetSlot);
        }
      }

      if (this.outcome !== 'IN_PROGRESS') break;
    }
  }

  // ==========================================
  // WIN / LOSS EVALUATOR & SURRENDER
  // ==========================================
  public consecutiveTimeouts: Record<string, number> = { player: 0, opponent: 0 };

  /**
   * Resets consecutive timeout count when a duelist takes a legitimate active turn action
   */
  public resetTimeoutCounter(duelistId: string) {
    this.consecutiveTimeouts[duelistId] = 0;
  }

  /**
   * Automatically passes the active duelist's turn when the 60s turn timer expires
   */
  public autoPassTurn(duelistId: string) {
    if (this.outcome !== 'IN_PROGRESS') return;
    if (this.activePlayerId !== duelistId) return;

    const duelist = this.getDuelist(duelistId);
    this.addLog('SYSTEM', `Hết thời gian lượt đi (60 giây). Hệ thống tự động chuyển lượt cho ${duelist.name}.`, 'INFO');
    this.currentPhase = 'END_PHASE';
    this.resolveEndPhase(duelistId);
  }

  /**
   * Handles turn timer timeout with consecutive AFK forfeiture protection
   */
  public handleTurnTimeout(duelistId: string, maxConsecutiveTimeouts: number = 2) {
    if (this.outcome !== 'IN_PROGRESS') return;
    if (this.activePlayerId !== duelistId) return;

    this.consecutiveTimeouts[duelistId] = (this.consecutiveTimeouts[duelistId] || 0) + 1;
    const duelist = this.getDuelist(duelistId);

    if (this.consecutiveTimeouts[duelistId] >= maxConsecutiveTimeouts) {
      this.addLog('SYSTEM', `${duelist.name} đã quá thời gian lượt đi ${maxConsecutiveTimeouts} lần liên tiếp. Bị xử thua do bỏ cuộc (Forfeit)!`, 'VICTORY');
      this.surrender(duelistId);
    } else {
      this.autoPassTurn(duelistId);
    }
  }

  public surrender(duelistId: string) {
    if (this.outcome !== 'IN_PROGRESS') return;
    if (duelistId === 'player') {
      this.outcome = 'OPPONENT_VICTORY';
      this.addLog('SYSTEM', `${this.player.name} đã đầu hàng. Chiến thắng thuộc về ${this.opponent.name}!`, 'VICTORY');
    } else {
      this.outcome = 'PLAYER_VICTORY';
      this.addLog('SYSTEM', `${this.opponent.name} đã đầu hàng. Vinh quang thuộc về ${this.player.name}!`, 'VICTORY');
    }
  }

  public checkWinConditions(deckOutDuelistId?: string) {
    if (this.outcome !== 'IN_PROGRESS') return;

    if (deckOutDuelistId) {
      if (deckOutDuelistId === 'player') {
        this.outcome = 'OPPONENT_VICTORY';
        this.addLog('SYSTEM', `CHIẾN BẠI! ${this.player.name} không thể rút bài từ Bộ Bài Chính (Deck Out)! Chiến thắng thuộc về ${this.opponent.name}!`, 'VICTORY');
      } else {
        this.outcome = 'PLAYER_VICTORY';
        this.addLog('SYSTEM', `CHIẾN THẮNG HOÀN TOÀN! ${this.opponent.name} không thể rút bài từ Bộ Bài Chính (Deck Out)! Vinh quang thuộc về ${this.player.name}!`, 'VICTORY');
      }
      return;
    }

    if (this.player.lp <= 0 && this.opponent.lp <= 0) {
      this.outcome = 'DRAW';
      this.addLog('SYSTEM', '[KẾT QUẢ HÒA TRẬN - Rulebook v10 tr. 33] Cả hai bên đều đã cạn kiệt Life Points cùng một lúc (Double Knockout)! Trận đấu kết thúc với kết quả HÒA.', 'VICTORY');
    } else if (this.player.lp <= 0) {
      this.outcome = 'OPPONENT_VICTORY';
      this.addLog('SYSTEM', `CHIẾN BẠI! ${this.player.name} đã hết Life Points. Chiến thắng thuộc về ${this.opponent.name}!`, 'VICTORY');
    } else if (this.opponent.lp <= 0) {
      this.outcome = 'PLAYER_VICTORY';
      this.addLog('SYSTEM', `CHIẾN THẮNG HOÀN TOÀN! ${this.opponent.name} đã bị đánh bại! Vinh quang thuộc về ${this.player.name}!`, 'VICTORY');
    }
  }

  /**
   * Surrenders the duel (Rulebook v10 tr. 33)
   * "A player may surrender a Duel at any time. When a player surrenders, their opponent immediately wins the Duel."
   */
  public surrenderDuel(
    surrenderingDuelistId: string,
    reason: string = 'CONCEDED'
  ): { success: boolean; outcome: DuelOutcome; message: string } {
    if (this.outcome !== 'IN_PROGRESS') {
      return {
        success: false,
        outcome: this.outcome,
        message: 'Trận đấu đã kết thúc, không thể đầu hàng!'
      };
    }

    // Abort pending chains and active replays
    this.chainStack = [];
    this.activeReplayState = null;

    if (surrenderingDuelistId === 'player') {
      this.outcome = 'OPPONENT_VICTORY';
      const msg = `[ĐẦU HÀNG DANH DỰ - Rulebook v10 tr. 33] ${this.player.name} tuyên bố đầu hàng! Chiến thắng thuộc về ${this.opponent.name}.`;
      this.addLog('SYSTEM', msg, 'VICTORY');
      return {
        success: true,
        outcome: this.outcome,
        message: 'Bạn đã tuyên bố đầu hàng trận đấu thành công.'
      };
    } else {
      this.outcome = 'PLAYER_VICTORY';
      const msg = `[ĐỐI THỦ XIN THUA - Rulebook v10 tr. 33] ${this.opponent.name} nhận thấy sự chênh lệch lực lượng áp đảo và tuyên bố đầu hàng! ${this.player.name} giành chiến thắng vinh quang!`;
      this.addLog('SYSTEM', msg, 'VICTORY');
      return {
        success: true,
        outcome: this.outcome,
        message: `${this.opponent.name} đã tuyên bố đầu hàng!`
      };
    }
  }

  /**
   * Evaluates whether the AI should concede due to insurmountable odds (Rulebook v10 tr. 33)
   * Conditions:
   * 1. Match in progress and currentTurn >= 4 (not early game)
   * 2. AI has <= 1000 LP
   * 3. AI has 0 monsters on field
   * 4. AI has 0 face-down or defensive spells/traps on field
   * 5. AI hand has <= 1 card
   * 6. Player has combined field ATK >= 5000 (lethal overkill)
   */
  public aiCheckSurrenderCondition(): boolean {
    if (this.outcome !== 'IN_PROGRESS') return false;
    if (this.currentTurn < 4) return false;
    if (this.opponent.lp > 1000) return false;

    // AI field has no monsters
    const aiHasMonsters = this.opponent.monsterZones.some(s => s && s.card);
    if (aiHasMonsters) return false;

    // AI field has no S/T
    const aiHasST = this.opponent.spellTrapZones.some(s => s && s.card);
    if (aiHasST) return false;

    // AI hand has <= 1 card
    if (this.opponent.hand.length > 1) return false;

    // Check player field offensive power
    let playerTotalAtk = 0;
    for (const slot of this.player.monsterZones) {
      if (slot && slot.card && slot.position === 'FACE_UP_ATTACK') {
        playerTotalAtk += Math.max(0, (slot.card.def.atk || 0) + slot.tempAtkBoost);
      }
    }
    if (this.player.extraMonsterZone && this.player.extraMonsterZone.card && this.player.extraMonsterZone.position === 'FACE_UP_ATTACK') {
      playerTotalAtk += Math.max(0, (this.player.extraMonsterZone.card.def.atk || 0) + this.player.extraMonsterZone.tempAtkBoost);
    }

    if (playerTotalAtk >= 5000) {
      this.surrenderDuel('opponent', 'INSURMOUNTABLE_LETHAL');
      return true;
    }

    return false;
  }
}
