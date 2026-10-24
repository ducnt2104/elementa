// src/domain/cardGameTypes.ts
// Comprehensive Yu-Gi-Oh! Inspired Tactical Chemical Card Game Types

export type CardRarity = 'COMMON' | 'RARE' | 'SUPER_RARE' | 'ULTRA_RARE' | 'SECRET_RARE';

export type CardType =
  | 'ELEMENT_MONSTER'     // Quái thú Nguyên tố hóa học (Normal / Effect)
  | 'COMPOUND_MONSTER'    // Quái thú Hợp chất (Synthesis / Fusion)
  | 'LINK_MONSTER'        // Quái thú Liên Kết Hóa Học (Covalent / Coordination Link)
  | 'SYNCHRO_MONSTER'     // Quái thú Đồng Bộ (Catalytic Synchro Resonance)
  | 'XYZ_MONSTER'         // Quái thú Phức Chất Xyz (Multi-nuclear Valence Overlay)
  | 'PENDULUM_MONSTER'    // Quái thú Lưỡng Tính Dao Động (Zwitterion Amphoteric Scale)
  | 'RITUAL_MONSTER'      // Quái thú Tinh Thể Nghi Thức (Allotropic Crystal Lattice)
  | 'TOKEN_MONSTER'       // Quái thú Token (Rulebook v10 tr. 48-49: Gốc tự do / Phân tử trung gian)
  | 'REACTION_SPELL'      // Phép Phản ứng Hóa học (Normal / Quick-Play)
  | 'EQUIP_CATALYST'      // Phép Xúc tác / Trang bị
  | 'FIELD_ENVIRONMENT'   // Phép Môi trường / Địa bàn
  | 'TRAP';               // Bẫy Chiến thuật (Normal / Counter / Continuous)

export type ChemicalAttribute =
  | 'PYRO'      // Lửa / Phản ứng Tỏa nhiệt / Kim loại kiềm rực cháy
  | 'AQUA'      // Nước / Dung dịch lỏng / Thủy phân
  | 'TERRA'     // Đất / Kết tủa / Kim loại chuyển tiếp nặng
  | 'AERO'      // Khí / Halogen / Phi kim bay hơi
  | 'ELECTRO'   // Điện thế / Oxi hóa - Khử / Dòng electron
  | 'ACID_DARK' // Ăn mòn acid / Độc tính / Phân hủy
  | 'NOBLE_VOID';// Khí hiếm / Bền trơ / Khiên năng lượng tuyệt đối

export type SpellTrapSubtype =
  | 'NORMAL_SPELL'
  | 'CONTINUOUS_SPELL'
  | 'QUICK_PLAY_SPELL'
  | 'FIELD_SPELL'
  | 'EQUIP_SPELL'
  | 'RITUAL_SPELL'
  | 'NORMAL_TRAP'
  | 'COUNTER_TRAP'
  | 'CONTINUOUS_TRAP';

export type ActivationWindow =
  | 'IGNITION'          // Chủ động trong lượt của mình (Main Phase)
  | 'QUICK'             // Bất kỳ lúc nào hợp lệ (Quick-Play, Trap)
  | 'ON_ATTACK'         // Khi tấn công (viết tắt)
  | 'ON_ATTACK_DECLARE' // Khi quái thú tuyên bố tấn công
  | 'ON_SUMMON'         // Khi quái thú được triệu hồi
  | 'ON_MONSTER_SUMMON' // Khi quái thú đối phương được triệu hồi (Trap trigger)
  | 'ON_SPELL_CAST'     // Khi đối thủ kích hoạt thẻ Phép
  | 'ON_DESTROY'        // Khi quái thú bị tiêu diệt
  | 'ON_DESTROY_MONSTER'// Khi tiêu diệt quái thú
  | 'ON_BATTLE_DESTROYED' // Khi bị tiêu diệt bởi chiến đấu (Damage Step Substep 5 - Rulebook v10 tr. 43)
  | 'DAMAGE_STEP'       // Chỉ định kích hoạt trong Damage Step (Rulebook v10 tr. 43)
  | 'ON_LP_CHANGE'      // Khi điểm sinh mệnh thay đổi
  | 'ON_REACTION'       // Khi phản ứng hóa học xảy ra
  | 'FAST_EFFECT_RESPONSE'; // Phản ứng Fast Effect theo biểu đồ Fast Effect Timing (Rulebook v10 tr. 44-47)

export type FastEffectTimingBox =
  | 'BOX_A_OPEN_GAME_STATE'      // Turn player priority to perform normal actions (Rulebook v10 tr. 44)
  | 'BOX_B_ACTION_TRIGGER_CHECK' // Trigger check after action that does not start a chain (Rulebook v10 tr. 45)
  | 'BOX_C_TURN_PLAYER_FAST'     // Turn player priority to activate a Fast Effect (Rulebook v10 tr. 45)
  | 'BOX_D_OPPONENT_FAST'        // Opponent priority to activate a Fast Effect (Rulebook v10 tr. 45)
  | 'BOX_E_CHAIN_RESOLUTION';    // Chain is active / resolving (Rulebook v10 tr. 46)

export type TriggerTimingType =
  | 'MANDATORY'      // "When... :" or "If... :" without "you can" -> Never misses timing (Rulebook v10 tr. 52-53)
  | 'OPTIONAL_WHEN'  // "When...: you can..." -> Can MISS TIMING if trigger event was not the last action (Rulebook v10 tr. 52)
  | 'OPTIONAL_IF';   // "If...: you can..." -> NEVER misses timing even if followed by other actions (Rulebook v10 tr. 53)

export interface GameEventRecord {
  eventType: string; // e.g. 'SENT_TO_GRAVEYARD', 'TRIBUTE_SUMMON_COMPLETED', 'MONSTER_DESTROYED', 'CARD_EFFECT_RESOLVED'
  cardUid?: string;
  cardName?: string;
  duelistId?: string;
  chainIndex?: number;
  timestamp: number;
  payload?: any;
}

export type MonsterBattlePosition = 'FACE_UP_ATTACK' | 'FACE_UP_DEFENSE' | 'FACE_DOWN_DEFENSE';

export interface ChemicalSynthesisRecipe {
  reactantFormulas: { formula: string; count: number }[]; // e.g., [{ formula: 'H2', count: 2 }, { formula: 'O2', count: 1 }]
  requiredCondition?: string; // e.g. 'HIGH_TEMP', 'CATALYST', 'ACID'
  pedagogicalEquation: string; // e.g. '2H₂ + O₂ → 2H₂O'
}

export type EffectOpcode =
  | 'DRAW_CARD'
  | 'SEARCH_CARD'
  | 'MODIFY_STATS'
  | 'DESTROY_CARD'
  | 'NEGATE_EFFECT'
  | 'BURN_DAMAGE'
  | 'HEAL_LP'
  | 'SUMMON_TOKEN'
  | 'BANISH_CARD'
  | 'APPLY_STATUS'
  | 'RETURN_TO_HAND'
  | 'BOUNCE_TO_DECK'
  | 'SWAP_ATK_DEF'
  | 'RECOVER_RESOURCE';

export interface EffectOperation {
  op: EffectOpcode;
  params: {
    amount?: number;
    stat?: 'ATK' | 'DEF' | 'BOTH';
    statTarget?: 'ATK' | 'DEF' | 'BOTH';
    targetScope?: 'SELF' | 'TARGET' | 'ALL_ALLIES' | 'ALL_ENEMIES' | 'FIELD' | 'OPPONENT_LP' | 'PLAYER_LP' | 'OPPONENT_HAND' | 'OPPONENT_MONSTERS' | 'PLAYER_MONSTERS';
    cardTypeFilter?: CardType;
    attributeFilter?: ChemicalAttribute;
    archetypeFilter?: string;
    turns?: number;
    tokenDef?: {
      name: string;
      name_en: string;
      atk: number;
      def: number;
      level: number;
      attribute: ChemicalAttribute;
      chemicalFormula: string;
      scientificLore: string;
    };
    statusType?: 'PASSIVATION' | 'INERT_OCTET' | 'POSITION_LOCKED' | 'ATTACK_LOCKED' | 'EFFECT_IMMUNE';
  };
}

export interface StructuredEffectDefinition {
  effectId: string;
  activationWindow: ActivationWindow;
  cost?: {
    lp?: number;
    mana?: number;
    tributeCount?: number;
    banishCount?: number;
    discardCount?: number;
  };
  condition?: {
    requiredAttributeOnField?: ChemicalAttribute;
    requiredArchetypeOnField?: string;
    minMonstersOnField?: number;
    minOpponentMonsters?: number;
  };
  operations: EffectOperation[];
  description: string;
}

export interface PlayableCardDef {
  id: string;
  name: string;
  name_en: string;
  cardType: CardType;
  rarity: CardRarity;
  attribute: ChemicalAttribute;
  manaCost: number; // 1 to 10
  
  // Monster specific
  level?: number;   // 1 to 10 (1-4: no tribute, 5-6: 1 tribute, 7+: 2 tributes)
  atk?: number;     // e.g. 300 to 4500
  def?: number;     // e.g. 200 to 4500 (undefined for Link monsters)
  chemicalFormula?: string; // e.g. 'Na', 'Fe', 'H2O', 'NaCl'
  atomicNumber?: number;    // Z for elements
  synthesisRecipe?: ChemicalSynthesisRecipe; // For Compound monsters

  // Link Monster specific (Covalent / Coordination Bonds)
  linkRating?: number; // 1 to 6
  linkArrows?: ('TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT')[];
  linkMaterialsRequired?: { minCount: number; maxCount: number; materialType: string };

  // Synchro Monster specific (Tuner + Non-Tuner Exact Sum)
  isTuner?: boolean;
  synchroLevel?: number;
  synchroMaterialsRequired?: { tunerCount: number; nonTunerMinCount: number; nonTunerLevelSum?: number };

  // Xyz Monster specific (Multi-nuclear Valence Overlay)
  xyzRank?: number;
  xyzMaterialsRequired?: { count: number; level: number; materialRequirement?: string };

  // Pendulum Monster specific (Zwitterion Amphoteric Scales)
  pendulumScale?: number; // 0 to 13
  pendulumEffectText?: string;

  // Ritual Monster & Ritual Spell specific
  isRitualMonster?: boolean;
  ritualSpellId?: string;

  // Master Rule Card Immunity / Protection Flags (Rulebook v10 tr. 52-55)
  cannotBeDestroyedByCardEffects?: boolean;
  cannotBeDestroyedByBattle?: boolean; // Protected from battle destruction (Rulebook v10 tr. 40-43)
  piercingDamage?: boolean; // Inflicts Piercing Battle Damage when attacking a Defense Position monster (Rulebook v10 tr. 42)
  triggerTimingType?: TriggerTimingType; // Missing the Timing classification (Rulebook v10 tr. 52-53)
  isToken?: boolean; // Monster Token identifier (Rulebook v10 tr. 48-49)

  // Spell / Trap specific
  spellTrapSubtype?: SpellTrapSubtype;
  spellSpeed?: 1 | 2 | 3; // 1 = Normal/Equip/Field, 2 = Quick-Play/Normal Trap, 3 = Counter Trap
  activationWindow?: ActivationWindow;
  archetype?: string;
  
  // Effect details
  effectCode: string;
  effectText: string;
  scientificLore: string;
  relatedEquation?: string;
  iupacName?: string;
  // Master Rule: Maintenance Cost & Radioactive Depletion (Rulebook v10 tr. 32)
  maintenanceCost?: { lp?: number; mana?: number; isOptional?: boolean };
  decayCounters?: number; // Initial half-life decay counters

  // Master Rule: Targeting & Multi-Target Invariants (Rulebook v10 tr. 48-49 & 54)
  targetCount?: number; // Required target count at activation (e.g. 1, 2)
  requiresAllTargets?: boolean; // If true, all designated targets must remain valid at resolution; otherwise resolves without effect (Rulebook v10 tr. 48-49 & 54)

  // Master Rule: Damage Step Restrictions (Rulebook v10 tr. 43)
  modifiesAtkDef?: boolean; // Directly increases or decreases ATK and/or DEF (activatable in Damage Step Substeps 1-2 only)

  // Machine-Readable Structured Effect Definitions
  structuredEffects?: StructuredEffectDefinition[];
}

export interface CardInstance {
  uid: string; // Unique instance id in duel
  def: PlayableCardDef;
  ownerId: string;
  originalOwnerId?: string;       // Master Rule (Rulebook v10 tr. 47 & 55): Original deck owner for GY/banished routing
  properlySummoned?: boolean;     // Master Rule: Must be properly Special Summoned first to be revived from GY/Banished
  isFaceUpInExtraDeck?: boolean;  // Master Rule: Face-up Pendulum in Extra Deck
  cannotBeDestroyedByCardEffects?: boolean; // Master Rule: Protection against effect destruction (Rulebook v10 tr. 52)
  cannotBeDestroyedByBattle?: boolean;      // Master Rule: Protection against battle destruction (Rulebook v10 tr. 40-43)
  isFaceDown?: boolean;           // Master Rule: Set cards on field / in Field Zone (Rulebook v10 tr. 28)
  turnSet?: number;               // Turn number when Set onto field
  isToken?: boolean;              // Monster Token identifier (Rulebook v10 tr. 48-49)
  maintenanceCost?: { lp?: number; mana?: number; isOptional?: boolean }; // Active maintenance cost on card instance
  voluntaryMaintenanceCeased?: boolean; // Master Rule: Controller volition to abandon maintenance on optional cost card (Rulebook v10 tr. 32)
  decayCounters?: number;         // Current remaining half-life decay counters (Rulebook v10 tr. 32)
}

export interface MonsterZoneSlot {
  slotIndex: number;
  card: CardInstance | null;
  position: MonsterBattlePosition;
  hasAttackedThisTurn: boolean;
  hasChangedPositionThisTurn: boolean;
  turnSummoned: number;
  tempAtkBoost: number;
  tempDefBoost: number;
  passivationShieldUsed?: boolean;
  inertShieldUsed?: boolean;
  xyzMaterials?: CardInstance[];  // Attached Xyz materials underneath (Rulebook v10 tr. 18-19, 51)
  isExtraMonsterZone?: boolean;   // True if this slot is the Extra Monster Zone (EMZ)
  equippedCards?: CardInstance[]; // Equip Spell Cards / Catalysts bound to this monster (Rulebook v10 tr. 28)
  hasPiercingDamage?: boolean;    // Temporary or effect-granted piercing battle damage (Rulebook v10 tr. 42)
  positionLockedUntilTurn?: number; // Monster position locked until the specified turn boundary
  isEffectNegated?: boolean;        // Individual monster effect negation (Rulebook v10 tr. 48-49)
  effectsNegatedUntilTurn?: number; // Expiration turn for individual negation
  cannotBeDestroyedByBattle?: boolean;        // Protected from battle destruction (Rulebook v10 tr. 40-43)
  cannotBeDestroyedByCardEffects?: boolean;   // Protected from card effect destruction (Rulebook v10 tr. 52)
  battleDestructionImmunityUntilTurn?: number; // Expiration turn for battle destruction immunity
  effectDestructionImmunityUntilTurn?: number; // Expiration turn for effect destruction immunity
}

export interface SpellTrapZoneSlot {
  slotIndex: number;
  card: CardInstance | null;
  isFaceUp: boolean;
  turnSet: number;
  equippedToMonsterUid?: string; // UID of monster this Equip Spell is attached to
}

export type DuelPhase =
  | 'DRAW_PHASE'
  | 'STANDBY_PHASE'
  | 'MAIN_PHASE_1'
  | 'BATTLE_PHASE'
  | 'MAIN_PHASE_2'
  | 'END_PHASE';

export interface ChainTargetRef {
  playerId: string;
  zone: 'MONSTER' | 'SPELL_TRAP' | 'FIELD' | 'GRAVEYARD' | 'BANISHED';
  slotIndex?: number;
  cardUid: string;
  cardName?: string;
}

export interface ChainTargetValidationResult {
  canResolve: boolean;
  validTargets: ChainTargetRef[];
  missingTargets: ChainTargetRef[];
  isFullFizzle: boolean;
  message?: string;
}

export interface ChainItem {
  chainIndex: number;
  cardInstance: CardInstance;
  activatorPlayerId: string;
  spellSpeed: 1 | 2 | 3;
  targetSlotIndex?: number;
  targetSlotIndices?: number[];
  targetRefs?: ChainTargetRef[];
  requiresAllTargets?: boolean;
  targetPlayerId?: string;
  description: string;
  effectPayload?: any;
  isNegated?: boolean;
  wasOnField?: boolean; // Master Rule (Rulebook v10 tr. 29): Tracks if continuous card was on field when chained
  isReturnedToDeck?: boolean; // Le Chatelier Counter Trap or similar bounce-to-deck effect (Rulebook v10 tr. 44-47)
}

export interface ResolvedChainItem {
  chainIndex: number;
  cardName: string;
  chemicalFormula?: string;
  activatorPlayerId: string;
  activatorName: string;
  spellSpeed: 1 | 2 | 3;
  isNegated: boolean;
  description: string;
}

export interface ResolvedChainSummary {
  items: ResolvedChainItem[];
  timestamp: number;
}

export interface DeckSearchFilter {
  cardType?: CardType;
  cardTypes?: CardType[];
  category?: 'MONSTER' | 'COMPOUND' | 'SPELL' | 'TRAP' | 'EXTRA';
  attribute?: ChemicalAttribute;
  elementalGroup?: string;
  chemicalFormula?: string;
  chemicalFormulaContains?: string;
  maxLevel?: number;
  minLevel?: number;
  exactLevel?: number;
  isTuner?: boolean;
  isPendulum?: boolean;
  searchQuery?: string;
}

export interface DeckTutorResult {
  success: boolean;
  card?: CardInstance;
  destination: 'HAND' | 'GRAVEYARD' | 'FIELD';
  shuffled: boolean;
  message: string;
}

export interface BattleReplayState {
  isActive: boolean;
  attackerSlotIndex: number;
  attackerCardUid: string;
  attackerCardName: string;
  attackerAtk: number;
  initialDefenderCount: number;
  currentDefenderCount: number;
  eligibleTargetSlots: number[]; // Slot indices of opponent monsters available to attack
  canDirectAttack: boolean;
  triggerReason: string;
}

export interface LingeringTurnEffect {
  id: string;
  sourceCardUid: string;
  sourceCardName: string;
  targetPlayerId: string;
  effectType: 'LOCK_TRAPS' | 'FREEZE_MANA' | 'DAMAGE_IMMUNITY' | 'ATTACK_PROHIBITION' | 'STAT_MODIFIER';
  durationTurns: number; // remaining turns countdown
  turnActivated: number;
  expiresAt: 'END_OF_TURN' | 'STANDBY_PHASE' | 'CUSTOM_TURNS';
  description: string;
  payload?: any;
}

export interface TemporaryControlTransferRecord {
  cardUid: string;
  originalOwnerId: string;
  currentControllerId: string;
  originalSlotIndex?: number;
  transferredAtTurn: number;
  duration: 'UNTIL_END_OF_TURN' | 'PERMANENT';
  canAttack?: boolean;
  canTribute?: boolean;
  preservedPosition?: MonsterBattlePosition;
  reason?: string;
}

/**
 * Master Rule 2020 / Rulebook v10 tr. 4-5, 22-23:
 * Battlefield 5-Column Placement & Adjacency System
 */
export type BattlefieldColumnIndex = 0 | 1 | 2 | 3 | 4;

export interface ColumnCardRef {
  duelistId: 'player' | 'opponent';
  zoneType: 'MONSTER' | 'SPELL_TRAP' | 'EXTRA_MONSTER';
  slotIndex: number; // 0..4 for MMZ and S/T, 0/1 for EMZ
  card: CardInstance;
  columnIndex: BattlefieldColumnIndex;
}

export interface BattlefieldColumnSummary {
  columnIndex: BattlefieldColumnIndex;
  playerCards: ColumnCardRef[];
  opponentCards: ColumnCardRef[];
  allCards: ColumnCardRef[];
  totalCardCount: number;
  hasMonster: boolean;
  hasSpellTrap: boolean;
}

export interface DuelistState {
  id: string;
  name: string;
  isPlayer: boolean;
  lp: number;
  maxLp: number;
  mana: number;
  maxMana: number;
  deck: CardInstance[];
  extraDeck: CardInstance[];
  sideDeck?: CardInstance[]; // Master Rule 15-Card Side Deck (Rulebook v10 tr. 6)
  hand: CardInstance[];
  monsterZones: (MonsterZoneSlot | null)[]; // length 5 (Main Monster Zones)
  extraMonsterZone?: MonsterZoneSlot | null; // 1 Extra Monster Zone on this player's active command side (Rulebook v10 tr. 4-5)
  spellTrapZones: (SpellTrapZoneSlot | null)[]; // length 5
  pendulumZones?: { left: CardInstance | null; right: CardInstance | null }; // Slots 0 and 4 double as Pendulum Zones
  hasPendulumSummonedThisTurn?: boolean;
  properlySummonedUids?: string[];
  fieldZone: CardInstance | null;
  graveyard: CardInstance[];
  banished: CardInstance[];
  trapsLockedTurn?: number;
  bonusManaNextTurn?: number;
  normalSummonsRemaining: number;
  frozenMana?: number; // Mana locked from previous endothermic effects
  lingeringEffects?: LingeringTurnEffect[]; // Rulebook v10 tr. 31 & 54: Lingering turn effects with explicit expiration
}

export interface DuelLogEntry {
  id: string;
  turn: number;
  phase: DuelPhase;
  actor: string;
  message: string;
  type: 'INFO' | 'SUMMON' | 'SPELL' | 'TRAP' | 'ATTACK' | 'DAMAGE' | 'CHAIN' | 'CHEMICAL_REACTION' | 'VICTORY';
  scientificNote?: string;
}

export type DuelOutcome = 'IN_PROGRESS' | 'PLAYER_VICTORY' | 'OPPONENT_VICTORY' | 'DRAW';
