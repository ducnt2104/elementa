// src/game/types.ts
// Comprehensive Domain Types for ELEMENTA: MOBA Arena Edition

import { ElementData, ReactionRule } from '../domain/types';

export interface Vector2D {
  x: number;
  y: number;
}

export type TeamSide = 'BLUE' | 'RED' | 'NEUTRAL';
export type LaneType = 'TOP' | 'MID' | 'BOT' | 'JUNGLE';
export type HeroRole = 'TANK' | 'FIGHTER' | 'MAGE' | 'MARKSMAN' | 'ASSASSIN' | 'SUPPORT';

export type SkillSlot = 'PASSIVE' | 'Q' | 'W' | 'E' | 'R';
export type SkillTargetType = 'INSTANT' | 'SKILLSHOT_LINE' | 'SKILLSHOT_AOE' | 'TARGETED' | 'CONE' | 'DASH';

export interface HeroSkill {
  slot: SkillSlot;
  id: string;
  name_vi: string;
  name_en: string;
  targetType: SkillTargetType;
  range: number;
  radius?: number;
  width?: number;
  cooldownSeconds: number;
  currentCooldown: number;
  manaCost: number;
  baseDamage: number;
  scalingStat: 'AD' | 'AP' | 'HP' | 'DEF';
  scalingRatio: number;
  description_vi: string;
  chemicalPrincipleVI: string;
  reactionCode?: string; // Links to REACTION_RULES_DATABASE
  projectileSpeed?: number;
  projectileRadius?: number;
  iconSvg?: string;
  elementSymbol: string;
}

export interface HeroDefinition {
  id: string;
  symbol: string;
  name_vi: string;
  name_en: string;
  title_vi: string;
  role: HeroRole;
  elementData: ElementData;
  colorTheme: string;
  secondaryColor: string;
  loreVI: string;
  chemicalFactsVI: string[];
  baseStats: {
    maxHp: number;
    hpRegen: number;
    maxMana: number;
    manaRegen: number;
    attackDamage: number;
    abilityPower: number;
    armor: number;
    magicResist: number;
    movementSpeed: number;
    attackRange: number;
    attackSpeed: number; // Attacks per second
  };
  growthStats: {
    hpPerLevel: number;
    manaPerLevel: number;
    adPerLevel: number;
    armorPerLevel: number;
  };
  skills: {
    passive: HeroSkill;
    q: HeroSkill;
    w: HeroSkill;
    e: HeroSkill;
    r: HeroSkill;
  };
  recommendedItems: string[];
  countersVI: string[];
  synergiesVI: string[];
}

export type MinionType = 'MELEE' | 'CASTER' | 'SIEGE';

export interface MinionEntity {
  id: string;
  team: TeamSide;
  lane: LaneType;
  type: MinionType;
  pos: Vector2D;
  targetPos: Vector2D;
  targetEntityId: string | null;
  hp: number;
  maxHp: number;
  attackDamage: number;
  attackRange: number;
  attackCooldown: number;
  speed: number;
  radius: number;
  waypointIndex: number;
  goldValue: number;
  xpValue: number;
  flashTime?: number;
  elementalPrimer?: ElementalPrimer;
}

export interface TurretEntity {
  id: string;
  team: TeamSide;
  lane: LaneType;
  tier: 'OUTER' | 'INNER' | 'INHIBITOR' | 'CORE';
  pos: Vector2D;
  hp: number;
  maxHp: number;
  armor: number;
  attackDamage: number;
  attackRange: number;
  attackCooldown: number;
  targetEntityId: string | null;
  targetLaserProgress: number; // 0 to 1 for charging indicator
  consecutiveShotsOnTarget: number;
  isVulnerable: boolean;
  destroyed: boolean;
  flashTime?: number;
}

export interface ElementalCoreEntity {
  id: string;
  team: TeamSide;
  pos: Vector2D;
  hp: number;
  maxHp: number;
  shield: number;
  maxShield: number;
  destroyed: boolean;
  pulseRadius: number;
}

export interface NeutralMonsterEntity {
  id: string;
  name_vi: string;
  type: 'CATALYST_GUARDIAN' | 'ACID_LIZARD' | 'CRYSTAL_GOLEM';
  pos: Vector2D;
  spawnPos?: Vector2D;
  targetEntityId?: string | null;
  hp: number;
  maxHp: number;
  attackDamage: number;
  attackRange: number;
  attackCooldown: number;
  respawnTimer: number;
  isAlive: boolean;
  buffType: 'REACTION_CATALYST' | 'ACID_AURA' | 'CRYSTAL_ARMOR';
  goldValue: number;
  xpValue: number;
  flashTime?: number;
  elementalPrimer?: ElementalPrimer;
}

export interface ProjectileEntity {
  id: string;
  sourceEntityId: string;
  team: TeamSide;
  pos: Vector2D;
  velocity: Vector2D;
  targetEntityId?: string;
  targetPos?: Vector2D;
  speed: number;
  radius: number;
  damage: number;
  damageType: 'PHYSICAL' | 'CHEMICAL' | 'TRUE';
  isHoming: boolean;
  piercing: boolean;
  maxDistance: number;
  traveledDistance: number;
  color: string;
  chemicalReactionCode?: string;
  onHitEffect?: string;
  hitEntityIds: string[];
}

export type AoEChemicalCategory = 'ACID' | 'BASE' | 'FIRE' | 'STEAM' | 'WATER' | 'ELECTROLYTE' | 'ORGANIC' | 'CRYOGENIC' | 'GENERAL';

export interface EnvironmentalZone {
  id: string;
  type: 'FROZEN_RIVER' | 'LIMEWATER_CAUSTIC' | 'ELECTRIFIED_WATER';
  pos: Vector2D;
  radius: number;
  durationSeconds: number;
  remainingSeconds: number;
  sourceHeroId: string;
  team: TeamSide;
  name_vi: string;
  equation: string;
  timeSinceLastTick?: number;
}

export interface AreaOfEffectEntity {
  id: string;
  sourceEntityId: string;
  team: TeamSide;
  pos: Vector2D;
  radius: number;
  durationSeconds: number;
  remainingSeconds: number;
  tickRateSeconds: number;
  timeSinceLastTick: number;
  damagePerTick: number;
  damageType: 'PHYSICAL' | 'CHEMICAL';
  color: string;
  chemicalEffectType: string;
  slowPercentage?: number;
  equationVI?: string;
  chemicalCategory?: AoEChemicalCategory;
  elementSymbol?: string;
  isNeutralized?: boolean;
}

export interface StatusEffectInstance {
  id: string;
  type: 'STUN' | 'SLOW' | 'BURN_OXIDATION' | 'ACID_CORROSION' | 'ALKALI_WEAKEN' | 'SHIELD' | 'HASTE' | 'CATALYST_BUFF' | 'CRYSTAL_ARMOR' | 'ACID_AURA' | 'ROOT' | 'BLIND';
  name_vi: string;
  durationSeconds: number;
  remainingSeconds: number;
  potency: number;
  tickTimer?: number;
}

export interface ElementalPrimer {
  symbol: string;
  sourceHeroId: string;
  team: TeamSide;
  appliedAt: number;
  durationSeconds: number;
}

export interface FloatingCombatText {
  id: string;
  pos: Vector2D;
  text: string;
  color: string;
  isCritical: boolean;
  isReaction: boolean;
  equation?: string;
  lifeTimeSeconds: number;
  maxLifeTimeSeconds: number;
  velocityY: number;
}

export interface ChemicalItem {
  id: string;
  name_vi: string;
  name_en: string;
  chemicalFormula: string;
  cost: number;
  icon: string;
  category: 'ATTACK' | 'MAGIC' | 'DEFENSE' | 'UTILITY';
  stats: {
    hp?: number;
    mana?: number;
    ad?: number;
    ap?: number;
    armor?: number;
    magicResist?: number;
    movementSpeed?: number;
    attackSpeed?: number;
    cooldownReduction?: number; // 0 to 40%
  };
  passiveVI: string;
  chemicalConceptVI: string;
}

export interface HeroRuntimeEntity {
  id: string;
  isPlayer: boolean;
  definition: HeroDefinition;
  team: TeamSide;
  lane: LaneType;
  pos: Vector2D;
  targetMovePos: Vector2D | null;
  targetEntityId: string | null;
  path: Vector2D[];
  level: number;
  xp: number;
  gold: number;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  attackDamage: number;
  abilityPower: number;
  armor: number;
  magicResist: number;
  movementSpeed: number;
  attackRange: number;
  attackCooldownRemaining: number;
  skills: {
    q: HeroSkill;
    w: HeroSkill;
    e: HeroSkill;
    r: HeroSkill;
  };
  summonerSpells: {
    d: { name: string; cooldown: number; currentCooldown: number };
    f: { name: string; cooldown: number; currentCooldown: number };
  };
  recallRemainingSeconds: number;
  isRecalling: boolean;
  statusEffects: StatusEffectInstance[];
  items: ChemicalItem[];
  kda: {
    kills: number;
    deaths: number;
    assists: number;
    minionKills: number;
    damageDealt: number;
    reactionsTriggered: number;
    turretsDestroyed: number;
  };
  shield?: number;
  maxShield?: number;
  flashTime?: number;
  killStreak?: number;
  recentKills?: number;
  lastKillTimestamp?: number;
  isDead: boolean;
  respawnTimer: number;
  respawnTimeTotal: number;
  elementalPrimer?: ElementalPrimer;
}

export interface KillAnnouncement {
  id: string;
  type: 'FIRST_BLOOD' | 'DOUBLE_KILL' | 'TRIPLE_KILL' | 'QUADRA_KILL' | 'PENTA_KILL' | 'ACE' | 'KILLING_SPREE' | 'RAMPAGE' | 'UNSTOPPABLE' | 'SHUTDOWN' | 'HERO_KILL' | 'TURRET_DESTROYED' | 'MONSTER_SLAIN' | 'TEAM_SYNERGY';
  title: string;
  subtitle: string;
  killerName: string;
  killerTeam: TeamSide;
  victimName?: string;
  victimTeam?: TeamSide;
  timestamp: number;
}

export type MobaGameMode = 'SOLO_AI_5V5' | 'SOLO_AI_3V3' | 'TUTORIAL_LAB' | 'CUSTOM_SANDBOX' | 'CHEMISTRY_CHALLENGE';

export interface ReactionCombatEvent {
  id: string;
  timestampSeconds: number;
  sourceHeroId: string;
  targetEntityId: string;
  reactionRule: ReactionRule;
  equation: string;
  observablePhenomenaVI: string;
  bonusDamage: number;
  isTrap: boolean;
  pedagogicalNoteVI: string;
  isTeamSynergy?: boolean;
  secondarySourceHeroId?: string;
  synergyPartners?: [string, string];
}

export interface MobaMatchDebrief {
  matchDurationSeconds: number;
  outcome: 'VICTORY' | 'DEFEAT';
  playerHeroId: string;
  kda: {
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    gold: number;
    damageDealt: number;
    turretsDestroyed: number;
  };
  teamScore: {
    blueKills: number;
    redKills: number;
    blueTurrets: number;
    redTurrets: number;
  };
  reactionsTriggered: ReactionCombatEvent[];
  chemicalTrapsEncountered: ReactionCombatEvent[];
  xpEarned: number;
  knowledgeTokensEarned: number;
}
