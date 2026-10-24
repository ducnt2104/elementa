// src/domain/types.ts
// Comprehensive Domain Types for ELEMENTA: Trận Chiến Nguyên Tố

export type ElementCategory =
  | 'ALKALI_METAL'
  | 'ALKALINE_EARTH'
  | 'TRANSITION_METAL'
  | 'POST_TRANSITION'
  | 'METALLOID'
  | 'NONMETAL'
  | 'HALOGEN'
  | 'NOBLE_GAS'
  | 'LANTHANIDE'
  | 'ACTINIDE';

export type PhysicalState = 'SOLID' | 'LIQUID' | 'GAS';

export type TacticalRole =
  | 'BURST_REDUCTION'      // Sát thủ bùng nổ nhiệt (IA, IIA)
  | 'CORROSIVE_OXIDATION'  // Ăn mòn chiếm electron (VIIA, VIA)
  | 'INERT_SHIELD'         // Khiên trơ tuyệt đối (VIIIA)
  | 'VARIABLE_VALENCE'     // Đấu sĩ đa hóa trị bền bỉ (Kim loại chuyển tiếp)
  | 'ENVIRONMENTAL_AGENT'; // Tác nhân môi trường & Xúc tác (H2O, O2, t°, Acid, Base)

export interface ElementData {
  z: number;
  symbol: string;
  name_iupac: string;
  name_vi: string;
  atomic_weight: number;
  group: number;
  period: number;
  category: ElementCategory;
  electronegativity: number | null; // Pauling scale (null for noble gases)
  first_ionization_energy: number;  // kJ/mol
  electron_config: string;
  standard_state: PhysicalState;
  oxidation_states: number[];
  role: TacticalRole;
  unlockedByDefault: boolean;
  apps_vi: string;
  facts_vi: string[];
  
  // Tactical Normalized Stats (calculated from IUPAC ground truth)
  stats: {
    atk_ox: number;    // 5 - 100
    atk_red: number;   // 5 - 100
    def_stab: number;  // 10 - 100
    mana_cost: number; // 1 - 5
  };
}

export type EnvironmentalCondition =
  | 'MOISTURE_H2O'   // Độ ẩm / Nước H2O
  | 'HIGH_TEMP'      // Nhiệt độ cao t°
  | 'ACID_DILUTE'    // Dung dịch Acid loãng (HCl / H+)
  | 'BASE_ALKALINE'  // Dung dịch Kiềm (NaOH / OH-)
  | 'OXYGEN_GAS'     // Khí Oxygen O2
  | 'CATALYST';      // Xúc tác

export interface EnvironmentalCard {
  id: string;
  symbol: string;
  name_vi: string;
  name_iupac: string;
  conditionType: EnvironmentalCondition;
  mana_cost: number;
  description_vi: string;
  pedagogical_note: string;
}

export type ReactionEffectArchetype =
  | 'BURST_DAMAGE'     // Sát thương bùng nổ nhiệt / tỏa nhiệt lớn
  | 'CORROSION_DOT'    // Ăn mòn theo thời gian
  | 'INERT_SHIELD'     // Khiên chắn phòng thủ / Miễn nhiễm
  | 'CLEANSE_DISPEL'   // Trung hòa / Hóa giải hiệu ứng
  | 'FREEZE_STUN'      // Đóng băng / Khóa kỹ năng
  | 'BLIND_ACCURACY';  // Làm chói / Giảm độ chính xác

export interface ReactionRule {
  id: string;
  code: string; // e.g. 'R01', 'R02', 'R06_TRAP'
  name_vi: string;
  reactants: string[]; // Symbols: e.g. ['Na'], ['Fe'], ['Cu']
  requiredConditions: EnvironmentalCondition[];
  forbiddenConditions?: EnvironmentalCondition[];
  isTrap: boolean; // True for non-reactive cognitive traps (e.g. Cu + HCl)
  equation: string;
  ionicEquation?: string;
  thermodynamics: 'EXOTHERMIC' | 'ENDOTHERMIC' | 'NEUTRAL';
  effectArchetype: ReactionEffectArchetype;
  basePower: number; // 10 - 120
  durationTurns: number;
  pedagogicalExplanation: string;
  curriculumStandard: 'GDPT_2018_KHTN_7' | 'GDPT_2018_KHTN_8' | 'GDPT_2018_KHTN_9' | 'GDPT_2018_HOA_10' | 'GDPT_2018_HOA_11' | 'GDPT_2018_HOA_12';
}

export type CombatActionType = 'PLAY_ELEMENT' | 'APPLY_CONDITION' | 'TRIGGER_COMBO' | 'END_TURN';

export interface CombatCard {
  uid: string;
  type: 'ELEMENT' | 'ENVIRONMENT';
  element?: ElementData;
  environment?: EnvironmentalCard;
}

export interface ActiveStatusEffect {
  id: string;
  archetype: ReactionEffectArchetype;
  name_vi: string;
  potency: number;
  remainingTurns: number;
  description: string;
}

export interface CombatantState {
  name: string;
  isPlayer: boolean;
  hp: number;
  maxHp: number;
  shield: number;
  mana: number;
  maxMana: number;
  hand: CombatCard[];
  boardElements: CombatCard[];
  activeConditions: EnvironmentalCondition[];
  statusEffects: ActiveStatusEffect[];
}

export type BattlePhase =
  | 'TURN_START'
  | 'PLAYER_ACTION'
  | 'REACTION_RESOLVING'
  | 'AI_ACTION'
  | 'STATUS_TICK'
  | 'VICTORY'
  | 'DEFEAT';

export interface CombatLogEntry {
  id: string;
  turn: number;
  source: 'PLAYER' | 'OPPONENT' | 'SYSTEM' | 'REACTION';
  message: string;
  detail?: string;
  ruleCode?: string;
  isReactionSuccess?: boolean;
  isReactionFail?: boolean;
}

// CA-SRS Types
export type CognitiveErrorLevel = 1 | 2 | 3;
// Level 1: Nhận biết (Remember/Identify - symbol, IUPAC name) -> w_err = 1.00
// Level 2: Thông hiểu (Understand/Explain - missing environmental condition) -> w_err = 0.85
// Level 3: Vận dụng (Apply/Analyze - invalid chemistry like Cu + HCl) -> w_err = 0.70

export interface SrsItem {
  id: string;
  targetId: string; // Element symbol or Reaction code
  targetType: 'ELEMENT' | 'REACTION';
  title: string;
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  errorLevel: CognitiveErrorLevel;
  repetitionCount: number;
  intervalDays: number;
  easeFactor: number; // starts ~2.5
  dueDate: string; // ISO string
  lastReviewedDate?: string;
  consecutiveSuccesses: number;
  lapses?: number; // Total count of failed recall attempts
  isLeech?: boolean; // Flagged when lapses >= 4 (chronic misconception needing remediation)
}

export interface DuelDeckConfig {
  id: string;
  name: string;
  mainDeck: string[];
  extraDeck: string[];
  sideDeck?: string[];
  archetype?: string;
}

export interface DuelMatchRecord {
  id: string;
  timestamp: string;
  mode: string; // 'CASUAL_AI' | 'RANKED_AI' | 'CAMPAIGN' | 'ONLINE_PVP'
  outcome: 'VICTORY' | 'DEFEAT' | 'DRAW';
  opponentName: string;
  opponentDeckName?: string;
  playerDeckName: string;
  playerLpEnd: number;
  opponentLpEnd: number;
  turnsCount: number;
  reactionsCount: number;
  mmrChange?: number;
  tokensEarned?: number;
  shardsEarned?: number;
  keyEvents?: string[];
}

export interface PlayerProfile {
  name: string;
  username?: string;
  isGuest?: boolean;
  battlesPlayed?: number;
  battlesWon?: number;
  reactionsTriggered?: number;
  level: number;
  xp: number;
  knowledgeTokens: number;
  elementalShards?: number;
  unlockedElementZ: number[];
  activeDeck: string[]; // Card identifiers (up to 10 slots legacy)
  savedDecks: { id: string; name: string; cards: string[] }[];
  cardCollection?: Record<string, number>; // Card ID -> count owned
  collection?: Record<string, number>; // Alias for cardCollection in online sync
  activeDuelDeck?: DuelDeckConfig; // Standard 40-60 card TCG Deck
  savedDuelDecks?: DuelDeckConfig[];
  srsItems: SrsItem[];
  errorHistory: {
    timestamp: string;
    mistakeType: string;
    description: string;
    resolved: boolean;
  }[];
  tutorialCompleted: boolean;
  starterPackClaimed?: boolean; // Starter 50-Card Pack & 1,000 Knowledge Tokens Claimed
  initialGrantTimestamp?: string;
  auditTransactions?: {
    id: string;
    type: 'STARTER_PACK_GRANT' | 'REWARD' | 'PURCHASE' | 'PACK_OPEN' | 'HERO_PURCHASE' | 'CARD_CRAFT' | 'CARD_RECYCLE' | 'SHARD_REWARD';
    amount?: number;
    currency?: 'TOKENS' | 'SHARDS';
    timestamp: string;
    detail: string;
  }[];
  unlockedHeroes?: string[]; // IDs of unlocked MOBA champions e.g. ['hero_na_brawler', 'hero_fe_warden', 'hero_h_scout']
  tcgBotRank?: { tier: string; division: number; mmr: number; wins: number; losses: number };
  tcgPvpRank?: { tier: string; division: number; mmr: number; wins: number; losses: number };
  mobaBotRank?: { tier: string; division: number; mmr: number; wins: number; losses: number };
  mobaPvpRank?: { tier: string; division: number; mmr: number; wins: number; losses: number };
  hasClaimedFree10Pack?: boolean; // Starter Welfare: 10 Free Booster Packs in Shop (50 Cards)
  completedCampaignStages?: string[]; // IDs of conquered chemical campaign stages
  solvedPuzzleIds?: string[]; // IDs of conquered chemical environmental tactical puzzles
  duelMatchHistory?: DuelMatchRecord[]; // Verified TCG Match History Records
  stats: {
    battlesPlayed: number;
    battlesWon: number;
    reactionsTriggered: number;
    srsReviewsCompleted: number;
  };
}

export interface CreativeSkillSubmission {
  id: string;
  elementSymbol: string;
  skillName: string;
  description: string;
  iconCanvasDataUrl?: string;
  submittedAt: string;
  
  // 3-Layer AI Guardrails Output
  validation: {
    isSchoolSafe: boolean;
    isScientificallyValid: boolean;
    accuracyScore: number;
    effectArchetype: ReactionEffectArchetype;
    basePower: number; // hard capped <= 120
    cooldownSeconds: number; // hard capped >= 8s
    pedagogicalFeedbackVi: string;
    groundTruthReference: string;
  };
}
