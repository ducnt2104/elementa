// src/game/maps/periodicRiftMap.ts
// Strategic 3-Lane Battlefield Map: "The Periodic Rift" (Thung Lũng Liên Kết)
// Designed specifically for ELEMENTA MOBA Arena

import { Vector2D, LaneType, TeamSide, TurretEntity, ElementalCoreEntity, NeutralMonsterEntity } from '../types';

export const MAP_CONFIG = {
  WIDTH: 2400,
  HEIGHT: 2400,
  RIVER_WIDTH: 220,
  BASE_RADIUS: 250,
  TURRET_RANGE: 320,
  TURRET_DAMAGE: 110,
  CORE_HP: 3500,
  TURRET_HP: 1800,
  MINION_WAVE_INTERVAL_SEC: 25,
  RESPAWN_BASE_SEC: 12
};

export interface MapObstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'WALL' | 'CRYSTAL' | 'LAB_PILLAR';
}

export interface MapBrush {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Lane Waypoints for Minion Navigation & Pathfinding
export const LANE_WAYPOINTS: Record<TeamSide, Record<LaneType, Vector2D[]>> = {
  BLUE: {
    TOP: [
      { x: 300, y: 2100 },
      { x: 320, y: 1500 },
      { x: 340, y: 800 },
      { x: 420, y: 420 },
      { x: 1000, y: 350 },
      { x: 1600, y: 340 },
      { x: 2100, y: 300 }
    ],
    MID: [
      { x: 350, y: 2050 },
      { x: 750, y: 1650 },
      { x: 1200, y: 1200 },
      { x: 1650, y: 750 },
      { x: 2050, y: 350 }
    ],
    BOT: [
      { x: 350, y: 2100 },
      { x: 800, y: 2060 },
      { x: 1500, y: 2050 },
      { x: 1980, y: 1980 },
      { x: 2060, y: 1600 },
      { x: 2060, y: 900 },
      { x: 2100, y: 350 }
    ],
    JUNGLE: []
  },
  RED: {
    TOP: [
      { x: 2100, y: 300 },
      { x: 1600, y: 340 },
      { x: 1000, y: 350 },
      { x: 420, y: 420 },
      { x: 340, y: 800 },
      { x: 320, y: 1500 },
      { x: 300, y: 2100 }
    ],
    MID: [
      { x: 2050, y: 350 },
      { x: 1650, y: 750 },
      { x: 1200, y: 1200 },
      { x: 750, y: 1650 },
      { x: 350, y: 2050 }
    ],
    BOT: [
      { x: 2100, y: 350 },
      { x: 2060, y: 900 },
      { x: 2060, y: 1600 },
      { x: 1980, y: 1980 },
      { x: 1500, y: 2050 },
      { x: 800, y: 2060 },
      { x: 350, y: 2100 }
    ],
    JUNGLE: []
  },
  NEUTRAL: {
    TOP: [],
    MID: [],
    BOT: [],
    JUNGLE: []
  }
};

export const INITIAL_TURRETS: TurretEntity[] = [
  // BLUE TEAM TURRETS
  // Top Lane
  {
    id: 'turret_blue_top_outer',
    team: 'BLUE',
    lane: 'TOP',
    tier: 'OUTER',
    pos: { x: 340, y: 1350 },
    hp: MAP_CONFIG.TURRET_HP,
    maxHp: MAP_CONFIG.TURRET_HP,
    armor: 40,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: true,
    destroyed: false
  },
  {
    id: 'turret_blue_top_inner',
    team: 'BLUE',
    lane: 'TOP',
    tier: 'INNER',
    pos: { x: 330, y: 1750 },
    hp: MAP_CONFIG.TURRET_HP + 300,
    maxHp: MAP_CONFIG.TURRET_HP + 300,
    armor: 50,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE + 20,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: false,
    destroyed: false
  },
  // Mid Lane
  {
    id: 'turret_blue_mid_outer',
    team: 'BLUE',
    lane: 'MID',
    tier: 'OUTER',
    pos: { x: 920, y: 1480 },
    hp: MAP_CONFIG.TURRET_HP,
    maxHp: MAP_CONFIG.TURRET_HP,
    armor: 40,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: true,
    destroyed: false
  },
  {
    id: 'turret_blue_mid_inner',
    team: 'BLUE',
    lane: 'MID',
    tier: 'INNER',
    pos: { x: 620, y: 1780 },
    hp: MAP_CONFIG.TURRET_HP + 300,
    maxHp: MAP_CONFIG.TURRET_HP + 300,
    armor: 50,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE + 20,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: false,
    destroyed: false
  },
  // Bot Lane
  {
    id: 'turret_blue_bot_outer',
    team: 'BLUE',
    lane: 'BOT',
    tier: 'OUTER',
    pos: { x: 1350, y: 2060 },
    hp: MAP_CONFIG.TURRET_HP,
    maxHp: MAP_CONFIG.TURRET_HP,
    armor: 40,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: true,
    destroyed: false
  },
  {
    id: 'turret_blue_bot_inner',
    team: 'BLUE',
    lane: 'BOT',
    tier: 'INNER',
    pos: { x: 800, y: 2060 },
    hp: MAP_CONFIG.TURRET_HP + 300,
    maxHp: MAP_CONFIG.TURRET_HP + 300,
    armor: 50,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE + 20,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: false,
    destroyed: false
  },

  // RED TEAM TURRETS
  // Top Lane
  {
    id: 'turret_red_top_outer',
    team: 'RED',
    lane: 'TOP',
    tier: 'OUTER',
    pos: { x: 1050, y: 340 },
    hp: MAP_CONFIG.TURRET_HP,
    maxHp: MAP_CONFIG.TURRET_HP,
    armor: 40,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: true,
    destroyed: false
  },
  {
    id: 'turret_red_top_inner',
    team: 'RED',
    lane: 'TOP',
    tier: 'INNER',
    pos: { x: 1600, y: 340 },
    hp: MAP_CONFIG.TURRET_HP + 300,
    maxHp: MAP_CONFIG.TURRET_HP + 300,
    armor: 50,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE + 20,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: false,
    destroyed: false
  },
  // Mid Lane
  {
    id: 'turret_red_mid_outer',
    team: 'RED',
    lane: 'MID',
    tier: 'OUTER',
    pos: { x: 1480, y: 920 },
    hp: MAP_CONFIG.TURRET_HP,
    maxHp: MAP_CONFIG.TURRET_HP,
    armor: 40,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: true,
    destroyed: false
  },
  {
    id: 'turret_red_mid_inner',
    team: 'RED',
    lane: 'MID',
    tier: 'INNER',
    pos: { x: 1780, y: 620 },
    hp: MAP_CONFIG.TURRET_HP + 300,
    maxHp: MAP_CONFIG.TURRET_HP + 300,
    armor: 50,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE + 20,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: false,
    destroyed: false
  },
  // Bot Lane
  {
    id: 'turret_red_bot_outer',
    team: 'RED',
    lane: 'BOT',
    tier: 'OUTER',
    pos: { x: 2060, y: 1050 },
    hp: MAP_CONFIG.TURRET_HP,
    maxHp: MAP_CONFIG.TURRET_HP,
    armor: 40,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: true,
    destroyed: false
  },
  {
    id: 'turret_red_bot_inner',
    team: 'RED',
    lane: 'BOT',
    tier: 'INNER',
    pos: { x: 2060, y: 1600 },
    hp: MAP_CONFIG.TURRET_HP + 300,
    maxHp: MAP_CONFIG.TURRET_HP + 300,
    armor: 50,
    attackDamage: MAP_CONFIG.TURRET_DAMAGE + 20,
    attackRange: MAP_CONFIG.TURRET_RANGE,
    attackCooldown: 0,
    targetEntityId: null,
    targetLaserProgress: 0,
    consecutiveShotsOnTarget: 0,
    isVulnerable: false,
    destroyed: false
  }
];

export const INITIAL_CORES: Record<TeamSide, ElementalCoreEntity> = {
  BLUE: {
    id: 'core_blue',
    team: 'BLUE',
    pos: { x: 260, y: 2140 },
    hp: MAP_CONFIG.CORE_HP,
    maxHp: MAP_CONFIG.CORE_HP,
    shield: 1000,
    maxShield: 1000,
    destroyed: false,
    pulseRadius: 280
  },
  RED: {
    id: 'core_red',
    team: 'RED',
    pos: { x: 2140, y: 260 },
    hp: MAP_CONFIG.CORE_HP,
    maxHp: MAP_CONFIG.CORE_HP,
    shield: 1000,
    maxShield: 1000,
    destroyed: false,
    pulseRadius: 280
  },
  NEUTRAL: {
    id: 'core_neutral',
    team: 'NEUTRAL',
    pos: { x: 1200, y: 1200 },
    hp: 0,
    maxHp: 0,
    shield: 0,
    maxShield: 0,
    destroyed: true,
    pulseRadius: 0
  }
};

export const INITIAL_NEUTRAL_MONSTERS: NeutralMonsterEntity[] = [
  // 1. Central Boss: CATALYST GUARDIAN (Giám Hộ Xúc Tác)
  {
    id: 'monster_catalyst_guardian',
    name_vi: 'Giám Hộ Xúc Tác Bạch Kim Pt',
    type: 'CATALYST_GUARDIAN',
    pos: { x: 880, y: 880 }, // Upper river pit
    hp: 4200,
    maxHp: 4200,
    attackDamage: 90,
    attackRange: 220,
    attackCooldown: 0,
    respawnTimer: 0,
    isAlive: true,
    buffType: 'REACTION_CATALYST',
    goldValue: 250,
    xpValue: 350
  },
  // 2. ACID LIZARD (Thằn Lằn Axit Cl-)
  {
    id: 'monster_acid_lizard',
    name_vi: 'Thằn Lằn Axit Clo',
    type: 'ACID_LIZARD',
    pos: { x: 650, y: 1250 },
    hp: 1200,
    maxHp: 1200,
    attackDamage: 45,
    attackRange: 150,
    attackCooldown: 0,
    respawnTimer: 0,
    isAlive: true,
    buffType: 'ACID_AURA',
    goldValue: 90,
    xpValue: 120
  },
  // 3. CRYSTAL GOLEM (Người Đá Tinh Thể Bari)
  {
    id: 'monster_crystal_golem',
    name_vi: 'Người Đá Tinh Thể BaSO₄',
    type: 'CRYSTAL_GOLEM',
    pos: { x: 1750, y: 1150 },
    hp: 1400,
    maxHp: 1400,
    attackDamage: 55,
    attackRange: 140,
    attackCooldown: 0,
    respawnTimer: 0,
    isAlive: true,
    buffType: 'CRYSTAL_ARMOR',
    goldValue: 100,
    xpValue: 130
  }
];

// Map Terrain Obstacles (Walls, Lab machinery, Crystals)
export const MAP_OBSTACLES: MapObstacle[] = [
  // Central river rocks
  { id: 'obs_c1', x: 1050, y: 1320, width: 90, height: 90, type: 'WALL' },
  { id: 'obs_c2', x: 1320, y: 1050, width: 90, height: 90, type: 'WALL' },
  // Blue jungle walls
  { id: 'obs_bj1', x: 550, y: 1400, width: 140, height: 180, type: 'LAB_PILLAR' },
  { id: 'obs_bj2', x: 750, y: 1850, width: 220, height: 90, type: 'WALL' },
  // Red jungle walls
  { id: 'obs_rj1', x: 1700, y: 820, width: 140, height: 180, type: 'LAB_PILLAR' },
  { id: 'obs_rj2', x: 1450, y: 450, width: 220, height: 90, type: 'WALL' },
  // Boss pit boundary wall
  { id: 'obs_pit', x: 800, y: 750, width: 200, height: 60, type: 'CRYSTAL' }
];

// Strategic Brush Areas (Bụi rậm che khuất tầm nhìn)
export const MAP_BRUSHES: MapBrush[] = [
  // River brushes
  { id: 'brush_river_top', x: 980, y: 1020, width: 120, height: 70 },
  { id: 'brush_river_bot', x: 1300, y: 1310, width: 120, height: 70 },
  // Lane brushes
  { id: 'brush_top_lane', x: 340, y: 1050, width: 70, height: 130 },
  { id: 'brush_bot_lane', x: 1750, y: 2050, width: 130, height: 70 },
  // Mid jungle entry
  { id: 'brush_mid_blue', x: 820, y: 1350, width: 90, height: 80 },
  { id: 'brush_mid_red', x: 1490, y: 1050, width: 90, height: 80 }
];
