// src/game/engine/mobaEngine.ts
// Real-time Deterministic MOBA Simulation Engine for ELEMENTA
// Integrates 2D Kinematics, Minion Waves, Turret AI, Collision Detection, and Chemistry Reaction Engine

import {
  HeroRuntimeEntity,
  HeroDefinition,
  MinionEntity,
  TurretEntity,
  ElementalCoreEntity,
  NeutralMonsterEntity,
  ProjectileEntity,
  AreaOfEffectEntity,
  FloatingCombatText,
  TeamSide,
  LaneType,
  Vector2D,
  MobaGameMode,
  ReactionCombatEvent,
  MobaMatchDebrief,
  KillAnnouncement,
  AoEChemicalCategory,
  EnvironmentalZone
} from '../types';
import { HEROES_CATALOG } from '../data/heroesData';
import { CHEMICAL_ITEMS_CATALOG } from '../data/itemsData';
import {
  MAP_CONFIG,
  LANE_WAYPOINTS,
  INITIAL_TURRETS,
  INITIAL_CORES,
  INITIAL_NEUTRAL_MONSTERS,
  MAP_OBSTACLES,
  MAP_BRUSHES,
  MapBrush
} from '../maps/periodicRiftMap';
import { MobaBotAi, BotDifficulty } from '../ai/mobaBotAi';
import { REACTION_RULES_DATABASE, ReactionDetail } from '../../data/reactionsData';
import { defaultReactionEngine } from '../../domain/reactionEngine';
import { EnvironmentalCondition } from '../../domain/types';
import { sound } from '../../audio/soundEngine';

export interface SandboxCheats {
  godMode: boolean;
  zeroCooldown: boolean;
  infiniteMana: boolean;
  fastMinions: boolean;
}

export class MobaEngine {
  mode: MobaGameMode;
  difficulty: BotDifficulty;
  matchTimeSeconds: number = 0;
  status: 'STARTING' | 'IN_PROGRESS' | 'PAUSED' | 'VICTORY' | 'DEFEAT' = 'IN_PROGRESS';

  // Entities
  heroes: HeroRuntimeEntity[] = [];
  playerHero!: HeroRuntimeEntity;
  minions: MinionEntity[] = [];
  turrets: TurretEntity[] = [];
  cores: Record<TeamSide, ElementalCoreEntity> = { ...INITIAL_CORES };
  monsters: NeutralMonsterEntity[] = [];
  projectiles: ProjectileEntity[] = [];
  aoeZones: AreaOfEffectEntity[] = [];
  floatingTexts: FloatingCombatText[] = [];
  screenShakeTrauma: number = 0;

  // Chemistry & Event telemetry
  reactionsTriggered: ReactionCombatEvent[] = [];
  chemicalTrapsEncountered: ReactionCombatEvent[] = [];
  dynamicReactionCooldowns: Map<string, number> = new Map();
  aoeReactionCooldowns: Map<string, number> = new Map();
  burningBushes: Map<string, number> = new Map(); // brushId -> remainingSeconds
  environmentalZones: EnvironmentalZone[] = []; // Dynamic persistent terrain modification zones
  latestReactionAlert: {
    rule: ReactionDetail;
    equation: string;
    phenomena: string;
    timestamp: number;
    pos?: { x: number; y: number };
  } | null = null;

  // Spawners & Timers
  minionWaveTimer: number = 5; // First wave at 5s, then every 25s
  waveCounter: number = 0;
  goldTickTimer: number = 0;

  // Cheats
  cheats: SandboxCheats = {
    godMode: false,
    zeroCooldown: false,
    infiniteMana: false,
    fastMinions: false
  };

  // Announcer sound queue & Kill Announcements
  recentKillTimes: { killerId: string; time: number }[] = [];
  killAnnouncements: KillAnnouncement[] = [];
  activeAnnouncement: KillAnnouncement | null = null;
  announcementTimer: number = 0;
  totalHeroKills: number = 0;

  triggerAnnouncement(ann: Omit<KillAnnouncement, 'id' | 'timestamp'>) {
    const fullAnn: KillAnnouncement = {
      ...ann,
      id: `ann_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: this.matchTimeSeconds
    };
    this.killAnnouncements.push(fullAnn);
    this.activeAnnouncement = fullAnn;
    this.announcementTimer = 4.0; // Visible for 4.0 seconds
    sound.playAnnouncerChime(fullAnn.type);
  }

  constructor(
    playerHeroId: string = 'hero_na_brawler',
    mode: MobaGameMode = 'SOLO_AI_5V5',
    difficulty: BotDifficulty = 'STANDARD',
    customDraft?: { blueTeamIds: string[]; redTeamIds: string[] }
  ) {
    this.mode = mode;
    this.difficulty = difficulty;
    this.initMatch(playerHeroId, customDraft);
  }

  initMatch(playerHeroId: string, customDraft?: { blueTeamIds: string[]; redTeamIds: string[] }) {
    this.matchTimeSeconds = 0;
    this.status = 'IN_PROGRESS';
    this.minions = [];
    this.projectiles = [];
    this.aoeZones = [];
    this.floatingTexts = [];
    this.reactionsTriggered = [];
    this.chemicalTrapsEncountered = [];
    this.dynamicReactionCooldowns.clear();
    this.aoeReactionCooldowns.clear();
    this.burningBushes.clear();
    this.environmentalZones = [];
    this.latestReactionAlert = null;
    this.killAnnouncements = [];
    this.activeAnnouncement = null;
    this.announcementTimer = 0;
    this.totalHeroKills = 0;
    this.waveCounter = 0;
    this.minionWaveTimer = 4;

    // Reset Turrets & Cores & Monsters
    this.turrets = INITIAL_TURRETS.map(t => ({ ...t, hp: t.maxHp, destroyed: false }));
    this.cores = {
      BLUE: { ...INITIAL_CORES.BLUE, hp: INITIAL_CORES.BLUE.maxHp, shield: INITIAL_CORES.BLUE.maxShield, destroyed: false },
      RED: { ...INITIAL_CORES.RED, hp: INITIAL_CORES.RED.maxHp, shield: INITIAL_CORES.RED.maxShield, destroyed: false },
      NEUTRAL: { ...INITIAL_CORES.NEUTRAL }
    };
    this.monsters = INITIAL_NEUTRAL_MONSTERS.map(m => ({
      ...m,
      hp: m.maxHp,
      isAlive: true,
      respawnTimer: 0,
      attackCooldown: 0,
      targetEntityId: null,
      spawnPos: { ...m.pos }
    }));

    // Setup Heroes Roster
    const defaultBlue = ['hero_na_brawler', 'hero_fe_warden', 'hero_cu_striker', 'hero_h_scout', 'hero_al_vanguard'];
    const defaultRed = ['hero_cl_toxic', 'hero_o_arsonist', 'hero_ba_titan', 'hero_cu_striker', 'hero_fe_warden'];

    const blueIds = customDraft ? customDraft.blueTeamIds : (this.mode === 'SOLO_AI_3V3' ? defaultBlue.slice(0, 3) : defaultBlue);
    const redIds = customDraft ? customDraft.redTeamIds : (this.mode === 'SOLO_AI_3V3' ? defaultRed.slice(0, 3) : defaultRed);

    // Make sure player's chosen hero is slot 0 of Blue team
    if (!blueIds.includes(playerHeroId)) {
      blueIds[0] = playerHeroId;
    } else {
      const idx = blueIds.indexOf(playerHeroId);
      if (idx !== 0) {
        const tmp = blueIds[0];
        blueIds[0] = playerHeroId;
        blueIds[idx] = tmp;
      }
    }

    const lanes: LaneType[] = ['MID', 'TOP', 'BOT', 'MID', 'TOP'];

    this.heroes = [];

    // Instantiate Blue Heroes
    blueIds.forEach((hid, i) => {
      const def = HEROES_CATALOG.find(h => h.id === hid) || HEROES_CATALOG[0];
      const isPlayer = i === 0;
      const spawnPos: Vector2D = { x: 260 + i * 35, y: 2140 - i * 35 };

      const hero = this.createHeroRuntime(def, 'BLUE', isPlayer, spawnPos, lanes[i % lanes.length]);
      this.heroes.push(hero);
      if (isPlayer) this.playerHero = hero;
    });

    // Instantiate Red Heroes
    redIds.forEach((hid, i) => {
      const def = HEROES_CATALOG.find(h => h.id === hid) || HEROES_CATALOG[1];
      const spawnPos: Vector2D = { x: 2140 - i * 35, y: 260 + i * 35 };

      const hero = this.createHeroRuntime(def, 'RED', false, spawnPos, lanes[i % lanes.length]);
      this.heroes.push(hero);
    });
  }

  createHeroRuntime(
    def: HeroDefinition,
    team: TeamSide,
    isPlayer: boolean,
    spawnPos: Vector2D,
    lane: LaneType
  ): HeroRuntimeEntity {
    return {
      id: `hero_${team.toLowerCase()}_${def.id}_${Math.random().toString(36).substring(2, 6)}`,
      isPlayer,
      definition: def,
      team,
      lane,
      pos: { ...spawnPos },
      targetMovePos: null,
      targetEntityId: null,
      path: [],
      level: 1,
      xp: 0,
      gold: 750, // Starting gold (+50% balanced for diverse chemical starter items)
      hp: def.baseStats.maxHp,
      maxHp: def.baseStats.maxHp,
      mana: def.baseStats.maxMana,
      maxMana: def.baseStats.maxMana,
      attackDamage: def.baseStats.attackDamage,
      abilityPower: def.baseStats.abilityPower,
      armor: def.baseStats.armor,
      magicResist: def.baseStats.magicResist,
      movementSpeed: def.baseStats.movementSpeed,
      attackRange: def.baseStats.attackRange,
      attackCooldownRemaining: 0,
      skills: {
        q: { ...def.skills.q, currentCooldown: 0 },
        w: { ...def.skills.w, currentCooldown: 0 },
        e: { ...def.skills.e, currentCooldown: 0 },
        r: { ...def.skills.r, currentCooldown: 0 }
      },
      summonerSpells: {
        d: { name: 'Tốc Biến (Flash)', cooldown: 120, currentCooldown: 0 },
        f: { name: 'Hồi Phục (Heal)', cooldown: 90, currentCooldown: 0 }
      },
      recallRemainingSeconds: 0,
      isRecalling: false,
      statusEffects: [],
      items: [],
      kda: {
        kills: 0,
        deaths: 0,
        assists: 0,
        minionKills: 0,
        damageDealt: 0,
        reactionsTriggered: 0,
        turretsDestroyed: 0
      },
      isDead: false,
      respawnTimer: 0,
      respawnTimeTotal: MAP_CONFIG.RESPAWN_BASE_SEC,
      shield: 0,
      maxShield: 0,
      flashTime: 0,
      killStreak: 0,
      lastKillTimestamp: 0
    };
  }

  // Master Step Loop called 60 times/sec
  update(dt: number) {
    if (this.status !== 'IN_PROGRESS') return;

    this.matchTimeSeconds += dt;
    this.goldTickTimer += dt;

    // Passive gold income: +2 gold every second
    if (this.goldTickTimer >= 1.0) {
      this.goldTickTimer = 0;
      this.heroes.forEach(h => {
        if (!h.isDead) h.gold += 2;
      });
    }

    // 1. Minion waves spawning
    this.minionWaveTimer -= dt;
    if (this.minionWaveTimer <= 0) {
      this.minionWaveTimer = this.cheats.fastMinions ? 8 : MAP_CONFIG.MINION_WAVE_INTERVAL_SEC;
      this.spawnMinionWave();
    }

    // 2. Update Heroes
    this.updateHeroes(dt);

    // 3. Update Minions
    this.updateMinions(dt);

    // 4. Update Turrets
    this.updateTurrets(dt);

    // 5. Update Projectiles
    this.updateProjectiles(dt);

    // 6. Update AoE Zones
    this.updateAoEZones(dt);

    // 7. Update Neutral Monsters
    this.updateMonsters(dt);

    // 8. Update Floating Text
    this.updateFloatingText(dt);

    // 9. Update Kill Announcement Banner Timer
    if (this.announcementTimer > 0) {
      this.announcementTimer -= dt;
      if (this.announcementTimer <= 0) {
        this.activeAnnouncement = null;
      }
    }

    // 10. Decrement Damage Flash Timers
    this.heroes.forEach(h => { if (h.flashTime && h.flashTime > 0) h.flashTime = Math.max(0, h.flashTime - dt); });
    this.minions.forEach(m => { if (m.flashTime && m.flashTime > 0) m.flashTime = Math.max(0, m.flashTime - dt); });
    this.turrets.forEach(t => { if (t.flashTime && t.flashTime > 0) t.flashTime = Math.max(0, t.flashTime - dt); });
    this.monsters.forEach(m => { if (m.flashTime && m.flashTime > 0) m.flashTime = Math.max(0, m.flashTime - dt); });

    // 11. Check Win/Loss conditions
    this.checkWinLoss();
  }

  spawnMinionWave() {
    this.waveCounter++;
    const lanes: LaneType[] = ['TOP', 'MID', 'BOT'];
    const isSiegeWave = this.waveCounter % 3 === 0;

    lanes.forEach(lane => {
      // Blue Wave
      this.createMinionCluster('BLUE', lane, isSiegeWave);
      // Red Wave
      this.createMinionCluster('RED', lane, isSiegeWave);
    });
  }

  createMinionCluster(team: TeamSide, lane: LaneType, hasSiege: boolean) {
    const waypoints = LANE_WAYPOINTS[team][lane];
    if (!waypoints || waypoints.length === 0) return;
    const startPos = waypoints[0];

    // 3 Melee minions
    for (let i = 0; i < 3; i++) {
      this.minions.push({
        id: `minion_${team.toLowerCase()}_${lane}_m_${Date.now()}_${i}`,
        team,
        lane,
        type: 'MELEE',
        pos: { x: startPos.x + (Math.random() - 0.5) * 40, y: startPos.y + (Math.random() - 0.5) * 40 },
        targetPos: { ...waypoints[1] },
        targetEntityId: null,
        hp: 480,
        maxHp: 480,
        attackDamage: 22,
        attackRange: 80,
        attackCooldown: 0,
        speed: 155,
        radius: 14,
        waypointIndex: 1,
        goldValue: 22,
        xpValue: 40
      });
    }

    // 3 Caster minions
    for (let i = 0; i < 3; i++) {
      this.minions.push({
        id: `minion_${team.toLowerCase()}_${lane}_c_${Date.now()}_${i}`,
        team,
        lane,
        type: 'CASTER',
        pos: { x: startPos.x + (Math.random() - 0.5) * 40, y: startPos.y + (Math.random() - 0.5) * 40 },
        targetPos: { ...waypoints[1] },
        targetEntityId: null,
        hp: 310,
        maxHp: 310,
        attackDamage: 32,
        attackRange: 280,
        attackCooldown: 0,
        speed: 150,
        radius: 12,
        waypointIndex: 1,
        goldValue: 16,
        xpValue: 30
      });
    }

    // 1 Siege cannon minion every 3 waves
    if (hasSiege) {
      this.minions.push({
        id: `minion_${team.toLowerCase()}_${lane}_s_${Date.now()}`,
        team,
        lane,
        type: 'SIEGE',
        pos: { x: startPos.x, y: startPos.y },
        targetPos: { ...waypoints[1] },
        targetEntityId: null,
        hp: 850,
        maxHp: 850,
        attackDamage: 55,
        attackRange: 320,
        attackCooldown: 0,
        speed: 140,
        radius: 18,
        waypointIndex: 1,
        goldValue: 50,
        xpValue: 75
      });
    }
  }

  updateHeroes(dt: number) {
    this.heroes.forEach(hero => {
      // Respawn timer
      if (hero.isDead) {
        hero.respawnTimer -= dt;
        if (hero.respawnTimer <= 0) {
          hero.isDead = false;
          const spawn = hero.team === 'BLUE' ? { x: 260, y: 2140 } : { x: 2140, y: 260 };
          hero.pos = { ...spawn };
          hero.hp = hero.maxHp;
          hero.mana = hero.maxMana;
          hero.statusEffects = [];
        }
        return;
      }

      // God mode cheat for player
      if (hero.isPlayer && this.cheats.godMode) {
        hero.hp = hero.maxHp;
      }
      if (hero.isPlayer && this.cheats.infiniteMana) {
        hero.mana = hero.maxMana;
      }

      // Passive HP / Mana regen
      hero.hp = Math.min(hero.maxHp, hero.hp + (hero.definition.baseStats.hpRegen / 5) * dt);
      hero.mana = Math.min(hero.maxMana, hero.mana + (hero.definition.baseStats.manaRegen / 5) * dt);

      // Decrement Cooldowns
      if (hero.isPlayer && this.cheats.zeroCooldown) {
        hero.skills.q.currentCooldown = 0;
        hero.skills.w.currentCooldown = 0;
        hero.skills.e.currentCooldown = 0;
        hero.skills.r.currentCooldown = 0;
        hero.summonerSpells.d.currentCooldown = 0;
        hero.summonerSpells.f.currentCooldown = 0;
      } else {
        hero.skills.q.currentCooldown = Math.max(0, hero.skills.q.currentCooldown - dt);
        hero.skills.w.currentCooldown = Math.max(0, hero.skills.w.currentCooldown - dt);
        hero.skills.e.currentCooldown = Math.max(0, hero.skills.e.currentCooldown - dt);
        hero.skills.r.currentCooldown = Math.max(0, hero.skills.r.currentCooldown - dt);
        hero.summonerSpells.d.currentCooldown = Math.max(0, hero.summonerSpells.d.currentCooldown - dt);
        hero.summonerSpells.f.currentCooldown = Math.max(0, hero.summonerSpells.f.currentCooldown - dt);
      }

      hero.attackCooldownRemaining = Math.max(0, hero.attackCooldownRemaining - dt);

      // Channeling recall
      if (hero.isRecalling) {
        hero.recallRemainingSeconds -= dt;
        if (hero.recallRemainingSeconds <= 0) {
          hero.isRecalling = false;
          const fountain = hero.team === 'BLUE' ? { x: 260, y: 2140 } : { x: 2140, y: 260 };
          hero.pos = { ...fountain };
          hero.hp = hero.maxHp;
          hero.mana = hero.maxMana;
          hero.targetMovePos = null;
        }
      }

      // Status effects tick & decay
      hero.statusEffects = hero.statusEffects.filter(eff => {
        eff.remainingSeconds -= dt;
        // DoT tick
        if (eff.type === 'BURN_OXIDATION' || eff.type === 'ACID_CORROSION') {
          if (!eff.tickTimer) eff.tickTimer = 0;
          eff.tickTimer += dt;
          if (eff.tickTimer >= 0.5) {
            eff.tickTimer = 0;
            const dmg = eff.potency * 0.5;
            this.applyDamageToHero(hero, dmg, 'CHEMICAL', 'Hiệu Ứng Oxi Hóa / Axit Ăn Mòn');
          }
        }
        return eff.remainingSeconds > 0;
      });

      // AI Logic for bots
      if (!hero.isPlayer) {
        MobaBotAi.updateBot(
          hero,
          this.heroes,
          this.turrets,
          this.minions,
          dt,
          this.difficulty,
          (b, slot, tpos) => this.castSkill(b, slot, tpos),
          (pos, targetTeam) => this.isEntityVisibleToTeam(pos, targetTeam, hero.team),
          this.monsters,
          this.cores
        );
      }

      // Movement Kinematics
      if (hero.targetMovePos) {
        const dx = hero.targetMovePos.x - hero.pos.x;
        const dy = hero.targetMovePos.y - hero.pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 5) {
          // Interrupt recall on movement
          if (hero.isRecalling) hero.isRecalling = false;

          let speed = hero.movementSpeed;
          let isImmobilized = false;
          // Apply slow/haste modifiers
          hero.statusEffects.forEach(eff => {
            if (eff.type === 'SLOW') speed *= 1 - eff.potency;
            if (eff.type === 'HASTE') speed *= 1 + eff.potency;
            if (eff.type === 'STUN' || eff.type === 'ROOT') isImmobilized = true;
          });
          if (isImmobilized) speed = 0;

          // Move step with obstacle collision resolution
          const step = Math.min(dist, speed * dt);
          const nextX = hero.pos.x + (dx / dist) * step;
          const nextY = hero.pos.y + (dy / dist) * step;

          const resolved = this.resolveCircleAabbCollision({ x: nextX, y: nextY }, 28);
          hero.pos.x = resolved.x;
          hero.pos.y = resolved.y;
        } else {
          hero.targetMovePos = null;
        }
      } else if (hero.targetEntityId) {
        // If hero has a targeted entity and no manual move destination, pursue into attack range
        const target = this.findEntityById(hero.targetEntityId);
        if (target && target.hp > 0) {
          const distToTarget = Math.hypot(target.pos.x - hero.pos.x, target.pos.y - hero.pos.y);
          if (distToTarget > hero.attackRange) {
            let speed = hero.movementSpeed;
            let isImmobilized = false;
            hero.statusEffects.forEach(eff => {
              if (eff.type === 'SLOW') speed *= 1 - eff.potency;
              if (eff.type === 'HASTE') speed *= 1 + eff.potency;
              if (eff.type === 'STUN' || eff.type === 'ROOT') isImmobilized = true;
            });
            if (isImmobilized) speed = 0;
            const dx = target.pos.x - hero.pos.x;
            const dy = target.pos.y - hero.pos.y;
            const step = Math.min(distToTarget, speed * dt);
            const nextX = hero.pos.x + (dx / distToTarget) * step;
            const nextY = hero.pos.y + (dy / distToTarget) * step;
            const resolved = this.resolveCircleAabbCollision({ x: nextX, y: nextY }, 28);
            hero.pos.x = resolved.x;
            hero.pos.y = resolved.y;
          }
        } else {
          hero.targetEntityId = null;
        }
      }

      // Basic Attack Execution
      if (hero.targetEntityId && hero.attackCooldownRemaining <= 0) {
        this.executeHeroBasicAttack(hero);
      }
    });
  }

  executeHeroBasicAttack(hero: HeroRuntimeEntity) {
    if (hero.statusEffects.some(eff => eff.type === 'STUN')) return;
    if (hero.statusEffects.some(eff => eff.type === 'BLIND')) {
      this.spawnFloatingText(hero.pos, 'TRƯỢT (MÙ)!', '#94a3b8');
      hero.attackCooldownRemaining = 1 / hero.definition.baseStats.attackSpeed;
      return;
    }

    const target = this.findEntityById(hero.targetEntityId!);
    if (!target) {
      hero.targetEntityId = null;
      return;
    }

    const dist = Math.hypot(target.pos.x - hero.pos.x, target.pos.y - hero.pos.y);
    if (dist <= hero.attackRange) {
      hero.attackCooldownRemaining = 1 / hero.definition.baseStats.attackSpeed;

      // Projectile or Instant Melee
      if (hero.attackRange > 200) {
        // Ranged projectile
        this.projectiles.push({
          id: `proj_ba_${Date.now()}_${Math.random()}`,
          sourceEntityId: hero.id,
          team: hero.team,
          pos: { ...hero.pos },
          velocity: { x: 0, y: 0 },
          targetEntityId: target.id,
          targetPos: { ...target.pos },
          speed: 950,
          radius: 8,
          damage: hero.attackDamage,
          damageType: 'PHYSICAL',
          isHoming: true,
          piercing: false,
          maxDistance: 800,
          traveledDistance: 0,
          color: hero.definition.colorTheme,
          hitEntityIds: []
        });
      } else {
        // Melee hit
        this.applyDirectDamage(target, hero.attackDamage, 'PHYSICAL', hero);
      }
    }
  }

  /**
   * Finds the closest valid enemy entity (Hero > Minion > Turret) for target-locking & mobile auto-attacks
   */
  public findNearestEnemy(hero: HeroRuntimeEntity, maxRange: number = 800): { id: string; pos: Vector2D } | null {
    let nearest: { id: string; pos: Vector2D } | null = null;
    let minDist = maxRange;

    // 1. Scan enemy heroes (highest tactical priority)
    for (const h of this.heroes) {
      if (h.team !== hero.team && !h.isDead) {
        const d = Math.hypot(h.pos.x - hero.pos.x, h.pos.y - hero.pos.y);
        if (d < minDist) {
          minDist = d;
          nearest = { id: h.id, pos: h.pos };
        }
      }
    }
    if (nearest) return nearest;

    // 2. Scan enemy minions
    for (const m of this.minions) {
      if (m.team !== hero.team && m.hp > 0) {
        const d = Math.hypot(m.pos.x - hero.pos.x, m.pos.y - hero.pos.y);
        if (d < minDist) {
          minDist = d;
          nearest = { id: m.id, pos: m.pos };
        }
      }
    }
    if (nearest) return nearest;

    // 3. Scan enemy turrets
    for (const t of this.turrets) {
      if (t.team !== hero.team && t.hp > 0) {
        const d = Math.hypot(t.pos.x - hero.pos.x, t.pos.y - hero.pos.y);
        if (d < minDist) {
          minDist = d;
          nearest = { id: t.id, pos: t.pos };
        }
      }
    }

    return nearest;
  }

  /**
   * One-click action for player to attack the nearest enemy (Mobile Attack Button)
   */
  public triggerPlayerAttackNearest(): boolean {
    if (!this.playerHero || this.playerHero.isDead) return false;
    const enemy = this.findNearestEnemy(this.playerHero);
    if (enemy) {
      this.playerHero.targetEntityId = enemy.id;
      this.playerHero.targetMovePos = null;
      return true;
    }
    return false;
  }

  updateMinions(dt: number) {
    this.minions = this.minions.filter(m => m.hp > 0);

    this.minions.forEach(minion => {
      minion.attackCooldown = Math.max(0, minion.attackCooldown - dt);
      const enemyTeam = minion.team === 'BLUE' ? 'RED' : 'BLUE';

      // 1. Scan for nearby enemy minion or hero to attack
      let targetEntity: { id: string; pos: Vector2D; hp: number } | null = null;
      let closestDist = minion.attackRange;

      // Check enemy heroes
      this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
        const d = Math.hypot(h.pos.x - minion.pos.x, h.pos.y - minion.pos.y);
        if (d < closestDist) {
          closestDist = d;
          targetEntity = h;
        }
      });

      // Check enemy minions
      if (!targetEntity) {
        this.minions.filter(other => other.team === enemyTeam).forEach(other => {
          const d = Math.hypot(other.pos.x - minion.pos.x, other.pos.y - minion.pos.y);
          if (d < closestDist) {
            closestDist = d;
            targetEntity = other;
          }
        });
      }

      // Check enemy turrets
      if (!targetEntity) {
        this.turrets.filter(t => t.team === enemyTeam && !t.destroyed).forEach(t => {
          const d = Math.hypot(t.pos.x - minion.pos.x, t.pos.y - minion.pos.y);
          if (d < minion.attackRange + 50) {
            closestDist = d;
            targetEntity = t;
          }
        });
      }

      // Check enemy Core
      if (!targetEntity) {
        const enemyCore = this.cores[enemyTeam];
        if (!enemyCore.destroyed) {
          const d = Math.hypot(enemyCore.pos.x - minion.pos.x, enemyCore.pos.y - minion.pos.y);
          if (d < minion.attackRange + 80) {
            targetEntity = enemyCore;
          }
        }
      }

      // If in range to attack target
      if (targetEntity) {
        if (minion.attackCooldown <= 0) {
          minion.attackCooldown = minion.type === 'CASTER' ? 1.2 : (minion.type === 'SIEGE' ? 2.0 : 1.0);

          if (minion.type === 'CASTER' || minion.type === 'SIEGE') {
            // Ranged projectile
            this.projectiles.push({
              id: `proj_m_${minion.id}_${Date.now()}`,
              sourceEntityId: minion.id,
              team: minion.team,
              pos: { ...minion.pos },
              velocity: { x: 0, y: 0 },
              targetEntityId: targetEntity.id,
              targetPos: { ...targetEntity.pos },
              speed: 700,
              radius: minion.type === 'SIEGE' ? 12 : 7,
              damage: minion.attackDamage,
              damageType: 'PHYSICAL',
              isHoming: true,
              piercing: false,
              maxDistance: 600,
              traveledDistance: 0,
              color: minion.team === 'BLUE' ? '#38bdf8' : '#f87171',
              hitEntityIds: []
            });
          } else {
            // Melee attack
            this.applyDirectDamage(targetEntity, minion.attackDamage, 'PHYSICAL', minion);
          }
        }
        return; // Engaged in combat, don't move along lane
      }

      // 2. Otherwise, march along lane waypoints
      const waypoints = LANE_WAYPOINTS[minion.team][minion.lane];
      if (waypoints && minion.waypointIndex < waypoints.length) {
        const dest = waypoints[minion.waypointIndex];
        const dx = dest.x - minion.pos.x;
        const dy = dest.y - minion.pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 15) {
          const step = minion.speed * dt;
          const nextX = minion.pos.x + (dx / dist) * step;
          const nextY = minion.pos.y + (dy / dist) * step;
          const resolved = this.resolveCircleAabbCollision({ x: nextX, y: nextY }, minion.radius);
          minion.pos.x = resolved.x;
          minion.pos.y = resolved.y;
        } else {
          minion.waypointIndex++;
        }
      }
    });
  }

  updateTurrets(dt: number) {
    this.turrets.forEach(turret => {
      if (turret.destroyed) return;

      turret.attackCooldown = Math.max(0, turret.attackCooldown - dt);
      const enemyTeam = turret.team === 'BLUE' ? 'RED' : 'BLUE';

      // 1. Verify current target validity
      if (turret.targetEntityId) {
        const currentTarget = this.findEntityById(turret.targetEntityId);
        if (!currentTarget || currentTarget.hp <= 0 || Math.hypot(currentTarget.pos.x - turret.pos.x, currentTarget.pos.y - turret.pos.y) > turret.attackRange) {
          turret.targetEntityId = null;
          turret.targetLaserProgress = 0;
          turret.consecutiveShotsOnTarget = 0;
        }
      }

      // 2. If no target, acquire new target (Priority: Enemy Minions first, then Enemy Heroes)
      if (!turret.targetEntityId) {
        // Check for enemy minions in range first
        const minionsInRange = this.minions.filter(m => m.team === enemyTeam && Math.hypot(m.pos.x - turret.pos.x, m.pos.y - turret.pos.y) <= turret.attackRange);
        if (minionsInRange.length > 0) {
          turret.targetEntityId = minionsInRange[0].id;
        } else {
          // If no minions, target enemy heroes
          const heroesInRange = this.heroes.filter(h => h.team === enemyTeam && !h.isDead && Math.hypot(h.pos.x - turret.pos.x, h.pos.y - turret.pos.y) <= turret.attackRange);
          if (heroesInRange.length > 0) {
            turret.targetEntityId = heroesInRange[0].id;
          }
        }
      }

      // 3. Fire turret beam shot
      if (turret.targetEntityId) {
        turret.targetLaserProgress = Math.min(1.0, turret.targetLaserProgress + dt * 1.5);

        if (turret.attackCooldown <= 0 && turret.targetLaserProgress >= 0.8) {
          turret.attackCooldown = 1.1; // Fire every 1.1 seconds
          turret.consecutiveShotsOnTarget++;

          // Progressive damage on consecutive hits
          const rampDmg = turret.attackDamage * (1 + (turret.consecutiveShotsOnTarget - 1) * 0.25);

          this.projectiles.push({
            id: `proj_turret_${turret.id}_${Date.now()}`,
            sourceEntityId: turret.id,
            team: turret.team,
            pos: { ...turret.pos },
            velocity: { x: 0, y: 0 },
            targetEntityId: turret.targetEntityId,
            speed: 880,
            radius: 16,
            damage: rampDmg,
            damageType: 'PHYSICAL',
            isHoming: true,
            piercing: false,
            maxDistance: 700,
            traveledDistance: 0,
            color: turret.team === 'BLUE' ? '#00f0ff' : '#ff4d4d',
            hitEntityIds: []
          });

          sound.playTurretShot();
        }
      }
    });
  }

  updateProjectiles(dt: number) {
    this.projectiles = this.projectiles.filter(p => {
      let targetPos = p.targetPos;

      // If homing, track target entity position
      if (p.isHoming && p.targetEntityId) {
        const target = this.findEntityById(p.targetEntityId);
        if (target && target.hp > 0) {
          targetPos = target.pos;
        } else {
          return false; // Target dead
        }
      }

      if (!targetPos) return false;

      const dx = targetPos.x - p.pos.x;
      const dy = targetPos.y - p.pos.y;
      const dist = Math.hypot(dx, dy);
      const step = p.speed * dt;

      if (dist <= step || (p.isHoming && dist < p.radius + 15)) {
        // Impact!
        if (p.targetEntityId) {
          const target = this.findEntityById(p.targetEntityId);
          if (target) {
            const src = this.findEntityById(p.sourceEntityId);
            this.applyDirectDamage(target, p.damage, p.damageType, src, p.chemicalReactionCode);
          }
        }
        return false;
      }

      // Move projectile
      p.pos.x += (dx / dist) * step;
      p.pos.y += (dy / dist) * step;
      p.traveledDistance += step;

      // Check collision with enemy entities if skillshot
      if (!p.isHoming) {
        const enemyTeam = p.team === 'BLUE' ? 'RED' : 'BLUE';
        const hitHero = this.heroes.find(h => h.team === enemyTeam && !h.isDead && !p.hitEntityIds.includes(h.id) && Math.hypot(h.pos.x - p.pos.x, h.pos.y - p.pos.y) < p.radius + 20);

        if (hitHero) {
          p.hitEntityIds.push(hitHero.id);
          const src = this.findEntityById(p.sourceEntityId);
          this.applyDirectDamage(hitHero, p.damage, p.damageType, src, p.chemicalReactionCode);
          if (!p.piercing) return false;
        }
      }

      return p.traveledDistance < p.maxDistance;
    });
  }

  determineAoECategory(skillName: string, heroSymbol?: string, effectType?: string): AoEChemicalCategory {
    const text = `${skillName || ''} ${effectType || ''}`.toLowerCase();
    const sym = heroSymbol || '';

    if (
      text.includes('kiềm') ||
      text.includes('naoh') ||
      text.includes('xút') ||
      text.includes('alkali') ||
      sym === 'Na' ||
      sym === 'Ba' ||
      sym === 'Ca' ||
      sym === 'K'
    ) {
      return 'BASE';
    }
    if (
      text.includes('axit') ||
      text.includes('acid') ||
      text.includes('hcl') ||
      text.includes('khí độc') ||
      text.includes('halogen') ||
      text.includes('ăn mòn') ||
      sym === 'Cl' ||
      sym === 'S'
    ) {
      return 'ACID';
    }
    if (
      text.includes('hỏa') ||
      text.includes('cháy') ||
      text.includes('nhiệt') ||
      text.includes('thermite') ||
      text.includes('lửa') ||
      text.includes('nung') ||
      text.includes('bão lửa') ||
      sym === 'O'
    ) {
      return 'FIRE';
    }
    if (text.includes('hơi nước') || text.includes('steam')) {
      return 'STEAM';
    }
    if (text.includes('nước') || text.includes('thủy') || text.includes('khí nổ') || sym === 'H') {
      return 'WATER';
    }
    if (
      text.includes('hàn băng') ||
      text.includes('đóng băng') ||
      text.includes('lạnh') ||
      text.includes('nitơ lỏng') ||
      text.includes('liquid nitrogen') ||
      text.includes('cryo') ||
      sym === 'N'
    ) {
      return 'CRYOGENIC';
    }
    if (text.includes('dẫn điện') || text.includes('kết tủa') || sym === 'Cu') {
      return 'ELECTROLYTE';
    }
    if (text.includes('hydrocarbon') || text.includes('hữu cơ') || text.includes('nhiệt phân') || sym === 'C') {
      return 'ORGANIC';
    }
    return 'GENERAL';
  }

  isCircleIntersectingRiver(pos: Vector2D, radius: number): boolean {
    const distFromRiverCenter = Math.abs((pos.x + pos.y) - 2400) / Math.SQRT2;
    return distFromRiverCenter < (MAP_CONFIG.RIVER_WIDTH / 2 + radius);
  }

  getBrushesOverlappingCircle(pos: Vector2D, radius: number): MapBrush[] {
    return MAP_BRUSHES.filter(brush => {
      const closestX = Math.max(brush.x, Math.min(pos.x, brush.x + brush.width));
      const closestY = Math.max(brush.y, Math.min(pos.y, brush.y + brush.height));
      const dx = pos.x - closestX;
      const dy = pos.y - closestY;
      return (dx * dx + dy * dy) <= (radius * radius);
    });
  }

  checkAoEEnvironmentReactions(aoe: AreaOfEffectEntity) {
    const cat = aoe.chemicalCategory || this.determineAoECategory(aoe.chemicalEffectType, aoe.elementSymbol);

    // 1. River interaction: Flash Steam Vaporization or Alkali Hydrogen Gas Detonation
    if (this.isCircleIntersectingRiver(aoe.pos, aoe.radius * 0.75)) {
      const riverKey = `river_aoe_${aoe.id}`;
      if (!this.aoeReactionCooldowns.has(riverKey)) {
        this.aoeReactionCooldowns.set(riverKey, this.matchTimeSeconds);

        // A. High-Temp / Fire AoE in River -> Flash Steam Explosion
        if (cat === 'FIRE') {
          aoe.damagePerTick *= 0.65; // Water dampens direct thermal burn
          aoe.slowPercentage = Math.max(aoe.slowPercentage || 0, 0.40); // Steam creates vision impairment & slow

          const enemyTeam = aoe.team === 'BLUE' ? 'RED' : 'BLUE';
          this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
            if (Math.hypot(h.pos.x - aoe.pos.x, h.pos.y - aoe.pos.y) <= aoe.radius) {
              h.statusEffects.push({
                id: `steam_slow_${Date.now()}`,
                type: 'SLOW',
                name_vi: 'Mù Hơi Nước Bùng Nổ',
                durationSeconds: 2.0,
                remainingSeconds: 2.0,
                potency: 0.40
              });
            }
          });

          this.spawnFloatingText(aoe.pos, '💨 HƠI NƯỚC BÙNG NỔ!', '#38bdf8', true, true);
          this.spawnFloatingText({ x: aoe.pos.x, y: aoe.pos.y - 24 }, 'H₂O(l) → H₂O(g) [Flash Vaporization]', '#7dd3fc', false, true);

          this.reactionsTriggered.push({
            id: `rx_steam_${Date.now()}_${Math.random()}`,
            timestampSeconds: this.matchTimeSeconds,
            sourceHeroId: aoe.sourceEntityId,
            targetEntityId: 'river_h2o',
            reactionRule: {
              ruleCode: 'RX_STEAM_EXPLOSION',
              name_vi: 'Bùng Nổ Hơi Nước Sông',
              name_en: 'River Flash Steam Vaporization',
              equation: 'H₂O(l) → H₂O(g) [ΔH_vap = +40.7 kJ/mol]',
              reactants: ['H2O(l)'],
              products: ['H2O(g)'],
              basePower: 30,
              thermodynamics: 'ENDOTHERMIC',
              groupCategory: 'GROUP_F_SPECIAL_REDOX',
              isTrap: false,
              observablePhenomenaVI: 'Nhiệt lượng cực đại làm sôi bùng nước sông thành màn sương hơi nước dày đặc làm giảm tầm nhìn và tốc độ di chuyển.',
              pedagogicalExplanation: 'Nước hóa hơi nhanh chóng tạo áp suất hơi bão hòa cực lớn, sinh khói sương cản trở di chuyển.'
            } as any,
            equation: 'H₂O(l) → H₂O(g)',
            observablePhenomenaVI: 'Nhiệt độ cao bốc hơi nước sông tạo màn sương dày đặc.',
            bonusDamage: 0,
            isTrap: false,
            pedagogicalNoteVI: 'Sự chuyển pha lỏng sang khí của nước hấp thụ nhiệt nhưng bành trướng thể tích hơn 1600 lần.'
          });
          sound.playChemicalDetonation(false);
        }

        // B. Quicklime Slaking Exothermic Scalding (CaO + H2O -> Ca(OH)2)
        else if (aoe.elementSymbol === 'Ca' || aoe.chemicalEffectType.toLowerCase().includes('vôi') || aoe.chemicalEffectType.toLowerCase().includes('quicklime')) {
          const enemyTeam = aoe.team === 'BLUE' ? 'RED' : 'BLUE';

          // Scalding burst damage + scalding burn
          this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
            if (Math.hypot(h.pos.x - aoe.pos.x, h.pos.y - aoe.pos.y) <= aoe.radius) {
              this.applyDirectDamage(h, 45, 'CHEMICAL', null);
              h.statusEffects.push({
                id: `scald_${Date.now()}_${Math.random()}`,
                type: 'BURN_OXIDATION',
                name_vi: 'Bỏng Nước Sôi Tỏa Nhiệt',
                durationSeconds: 3.0,
                remainingSeconds: 3.0,
                potency: 15
              });
            }
          });

          this.environmentalZones.push({
            id: `env_limewater_${Date.now()}_${Math.random()}`,
            type: 'LIMEWATER_CAUSTIC',
            pos: { ...aoe.pos },
            radius: aoe.radius,
            durationSeconds: 4.0,
            remainingSeconds: 4.0,
            sourceHeroId: aoe.sourceEntityId,
            team: aoe.team,
            name_vi: 'Vùng Nước Vôi Tôi Ca(OH)₂',
            equation: 'CaO + H₂O → Ca(OH)₂ [ΔH° = -65.2 kJ/mol]'
          });

          this.spawnFloatingText(aoe.pos, '♨️ TÔI VÔI TỎA NHIỆT TRÊN SÔNG (CaO)!', '#f97316', true, true);
          this.spawnFloatingText({ x: aoe.pos.x, y: aoe.pos.y - 24 }, 'CaO + H₂O → Ca(OH)₂ [ΔH° = -65.2 kJ/mol]', '#fb923c', false, true);

          this.reactionsTriggered.push({
            id: `rx_slaking_river_${Date.now()}_${Math.random()}`,
            timestampSeconds: this.matchTimeSeconds,
            sourceHeroId: aoe.sourceEntityId,
            targetEntityId: 'river_h2o',
            reactionRule: {
              ruleCode: 'RX_CaO_RIVER_SLAKING',
              name_vi: 'Tôi Vôi Tỏa Nhiệt Trên Sông',
              name_en: 'River Quicklime Slaking Scalding',
              equation: 'CaO(s) + H₂O(l) → Ca(OH)₂(aq) [ΔH° = -65.2 kJ/mol]',
              reactants: ['CaO', 'H2O'],
              products: ['Ca(OH)2'],
              basePower: 45,
              thermodynamics: 'EXOTHERMIC',
              groupCategory: 'GROUP_A_ACID_BASE',
              isTrap: false,
              observablePhenomenaVI: 'Vôi sống tiếp xúc nước sông sôi sục dữ dội, tỏa nhiệt lượng lớn gây bỏng sôi và sinh dung dịch nước vôi trong xói mòn kháng phép.',
              pedagogicalExplanation: 'Quá trình hidrat hóa canxi oxit là phản ứng tỏa nhiệt mạnh mẽ, chuyển canxi oxit thành canxi hidroxit có tính kiềm mạnh.'
            } as any,
            equation: 'CaO + H₂O → Ca(OH)₂',
            observablePhenomenaVI: 'Nước sông sôi sục vì phản ứng tôi vôi tỏa nhiệt.',
            bonusDamage: 45,
            isTrap: false,
            pedagogicalNoteVI: 'Phản ứng tỏa nhiệt tôi vôi CaO đạt trên 100°C làm sôi nước tại chỗ.'
          });
          sound.playChemicalDetonation(true);
        }

        // C. Cryogenic Liquid Nitrogen River Freezing (N2(l) + H2O(l) -> H2O(s))
        else if (cat === 'CRYOGENIC' || aoe.elementSymbol === 'N') {
          const enemyTeam = aoe.team === 'BLUE' ? 'RED' : 'BLUE';

          // Freeze / Root enemies in zone at trigger
          this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
            if (Math.hypot(h.pos.x - aoe.pos.x, h.pos.y - aoe.pos.y) <= aoe.radius) {
              h.statusEffects.push({
                id: `freeze_root_${Date.now()}_${Math.random()}`,
                type: 'ROOT',
                name_vi: 'Đóng Băng Tức Thời (N₂)',
                durationSeconds: 1.5,
                remainingSeconds: 1.5,
                potency: 1.0
              });
              this.applyDirectDamage(h, 35, 'CHEMICAL', null);
            }
          });

          this.environmentalZones.push({
            id: `env_frozen_${Date.now()}_${Math.random()}`,
            type: 'FROZEN_RIVER',
            pos: { ...aoe.pos },
            radius: aoe.radius,
            durationSeconds: 3.5,
            remainingSeconds: 3.5,
            sourceHeroId: aoe.sourceEntityId,
            team: aoe.team,
            name_vi: 'Cầu Băng Nitơ Lỏng H₂O(s)',
            equation: 'N₂(l) + H₂O(l) → H₂O(s) + N₂(g)'
          });

          this.spawnFloatingText(aoe.pos, '❄️ ĐÓNG BĂNG MẶT SÔNG (N₂)!', '#2dd4bf', true, true);
          this.spawnFloatingText({ x: aoe.pos.x, y: aoe.pos.y - 24 }, 'N₂(l) + H₂O(l) → H₂O(s) [Hóa Rắn Băng]', '#5eead4', false, true);

          this.reactionsTriggered.push({
            id: `rx_freeze_river_${Date.now()}_${Math.random()}`,
            timestampSeconds: this.matchTimeSeconds,
            sourceHeroId: aoe.sourceEntityId,
            targetEntityId: 'river_h2o',
            reactionRule: {
              ruleCode: 'RX_NITROGEN_RIVER_FREEZE',
              name_vi: 'Hóa Rắn Băng Cầu Nitơ Lỏng Trên Sông',
              name_en: 'River Liquid Nitrogen Cryogenic Freezing',
              equation: 'N₂(l) + H₂O(l) → H₂O(s) + N₂(g) [ΔH_fus = -6.01 kJ/mol]',
              reactants: ['N2(l)', 'H2O(l)'],
              products: ['H2O(s)', 'N2(g)'],
              basePower: 35,
              thermodynamics: 'ENDOTHERMIC',
              groupCategory: 'GROUP_F_SPECIAL_REDOX',
              isTrap: false,
              observablePhenomenaVI: 'Nitơ lỏng hấp thụ nhiệt cực nhanh làm nước sông đông cứng thành cầu băng trong suốt. Đồng minh trượt tăng tốc +30%, kẻ địch kẹt chân bất động.',
              pedagogicalExplanation: 'Nhiệt độ sôi của nitơ lỏng là -196°C, khi tiếp xúc nước lập tức làm nước hạ nhiệt độ xuống dưới 0°C và đóng băng kết tinh.'
            } as any,
            equation: 'N₂(l) + H₂O(l) → H₂O(s)',
            observablePhenomenaVI: 'Mặt nước đóng băng cứng tạo cầu băng kiên cố.',
            bonusDamage: 35,
            isTrap: false,
            pedagogicalNoteVI: 'Chuyển pha lỏng sang rắn giải phóng entanpi kết tinh, tạo bề mặt trượt băng.'
          });
          sound.playChemicalDetonation(false);
        }

        // D. Electrolytic River Shock Wave (2H2O + 2e- -> H2 + 2OH-)
        else if (cat === 'ELECTROLYTE' || (aoe.elementSymbol === 'Cu' && !aoe.chemicalEffectType.toLowerCase().includes('kết tủa')) || aoe.chemicalEffectType.toLowerCase().includes('dẫn điện') || aoe.chemicalEffectType.toLowerCase().includes('điện phân')) {
          const enemyTeam = aoe.team === 'BLUE' ? 'RED' : 'BLUE';
          const conductRadius = aoe.radius * 1.4;

          this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
            if (Math.hypot(h.pos.x - aoe.pos.x, h.pos.y - aoe.pos.y) <= conductRadius && this.isPositionInRiver(h.pos)) {
              this.applyDirectDamage(h, 50, 'CHEMICAL', null);
              h.statusEffects.push({
                id: `stun_shock_${Date.now()}_${Math.random()}`,
                type: 'STUN',
                name_vi: 'Tê Liệt Điện Phân Sông',
                durationSeconds: 1.2,
                remainingSeconds: 1.2,
                potency: 1.0
              });
            }
          });

          this.environmentalZones.push({
            id: `env_electric_${Date.now()}_${Math.random()}`,
            type: 'ELECTRIFIED_WATER',
            pos: { ...aoe.pos },
            radius: conductRadius,
            durationSeconds: 3.0,
            remainingSeconds: 3.0,
            sourceHeroId: aoe.sourceEntityId,
            team: aoe.team,
            name_vi: 'Dòng Sông Điện Phân Ion',
            equation: '2H₂O + 2e⁻ → H₂↑ + 2OH⁻'
          });

          this.spawnFloatingText(aoe.pos, '⚡ SỐC ĐIỆN BỀ MẶT SÔNG (Ion dẫn điện)!', '#facc15', true, true);
          this.spawnFloatingText({ x: aoe.pos.x, y: aoe.pos.y - 24 }, '2H₂O + 2e⁻ → H₂↑ + 2OH⁻ [Dẫn Điện Bề Mặt]', '#fde047', false, true);

          this.reactionsTriggered.push({
            id: `rx_shock_river_${Date.now()}_${Math.random()}`,
            timestampSeconds: this.matchTimeSeconds,
            sourceHeroId: aoe.sourceEntityId,
            targetEntityId: 'river_h2o',
            reactionRule: {
              ruleCode: 'RX_ELECTROLYTIC_RIVER_CONDUCTION',
              name_vi: 'Sốc Điện Phân Bề Mặt Sông',
              name_en: 'Electrolytic River Shock Wave Conduction',
              equation: '2H₂O(l) + 2e⁻ → H₂↑ + 2OH⁻ [Dẫn Điện Bề Mặt]',
              reactants: ['H2O', 'e-'],
              products: ['H2', 'OH-'],
              basePower: 50,
              thermodynamics: 'EXOTHERMIC',
              groupCategory: 'GROUP_B_REDOX',
              isTrap: false,
              observablePhenomenaVI: 'Dòng điện ion phân ly lan truyền nhanh chóng qua mặt nước sông, tạo xung điện shock làm choáng toàn bộ kẻ địch trong lòng sông.',
              pedagogicalExplanation: 'Nước sông tự nhiên chứa ion khoáng chất hòa tan có độ dẫn điện cao, cho phép dòng điện truyền đi xa hơn trên cạn.'
            } as any,
            equation: '2H₂O + 2e⁻ → H₂↑ + 2OH⁻',
            observablePhenomenaVI: 'Tia sét điện phân phóng rực sáng trên mặt nước sông.',
            bonusDamage: 50,
            isTrap: false,
            pedagogicalNoteVI: 'Độ dẫn điện của dung dịch điện ly trong nước truyền xung điện cực mạnh.'
          });
          sound.playChemicalDetonation(true);
        }

        // E. Alkali Metal AoE in River -> Hydrogen Detonation
        else if (cat === 'BASE' && (aoe.elementSymbol === 'Na' || aoe.elementSymbol === 'K' || aoe.elementSymbol === 'Ba')) {
          const sym = aoe.elementSymbol;
          const enemyTeam = aoe.team === 'BLUE' ? 'RED' : 'BLUE';

          // High explosive blast from hydrogen gas
          this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
            if (Math.hypot(h.pos.x - aoe.pos.x, h.pos.y - aoe.pos.y) <= aoe.radius) {
              this.applyDirectDamage(h, 75, 'CHEMICAL', null);
            }
          });

          this.triggerScreenShake(9);
          this.spawnFloatingText(aoe.pos, `💥 NỔ KHÍ HYDRO TRÊN SÔNG (${sym})!`, '#f59e0b', true, true);
          this.spawnFloatingText({ x: aoe.pos.x, y: aoe.pos.y - 24 }, `2${sym} + 2H₂O → 2${sym}OH + H₂↑`, '#fbbf24', false, true);

          this.reactionsTriggered.push({
            id: `rx_alkali_river_${Date.now()}_${Math.random()}`,
            timestampSeconds: this.matchTimeSeconds,
            sourceHeroId: aoe.sourceEntityId,
            targetEntityId: 'river_h2o',
            reactionRule: {
              ruleCode: `RX_${sym}_RIVER_EXPLOSION`,
              name_vi: `Bùng Nổ Kim Loại Kiềm ${sym} Trên Sông`,
              name_en: `Alkali River Hydrogen Detonation`,
              equation: `2${sym} + 2H₂O → 2${sym}OH + H₂↑`,
              reactants: [sym, 'H2O'],
              products: [`${sym}OH`, 'H2'],
              basePower: 75,
              thermodynamics: 'EXOTHERMIC',
              groupCategory: 'GROUP_A_ACID_BASE',
              isTrap: false,
              observablePhenomenaVI: `Kim loại kiềm phản ứng mãnh liệt với nước sông, bốc cháy ngọn lửa màu đặc trưng và phát nổ khí hydro.`,
              pedagogicalExplanation: `Kim loại nhóm IA/IIA có thế điện cực chuẩn rất âm, dễ dàng khử ion H+ của nước giải phóng H2 và tỏa nhiệt lượng lớn gây nổ.`
            } as any,
            equation: `2${sym} + 2H₂O → 2${sym}OH + H₂↑`,
            observablePhenomenaVI: `Kim loại kiềm nổ tung khí hydro khi chạm dòng sông.`,
            bonusDamage: 75,
            isTrap: false,
            pedagogicalNoteVI: `Thế oxi hóa - khử mạnh của kim loại kiềm giải phóng hydro cực nhanh.`
          });
          sound.playChemicalDetonation(true);
        }
      }
    }

    // 2. Bush interaction: Fire AoE ignites camouflage foliage
    if (cat === 'FIRE') {
      const overlappingBrushes = this.getBrushesOverlappingCircle(aoe.pos, aoe.radius);
      for (const brush of overlappingBrushes) {
        if (!this.burningBushes.has(brush.id)) {
          this.burningBushes.set(brush.id, 4.5); // Burns for 4.5 seconds

          this.spawnFloatingText(
            { x: brush.x + brush.width / 2, y: brush.y + brush.height / 2 },
            '🔥 THIÊU RỤI BỤI RẬM!',
            '#ef4444',
            true,
            true
          );
          this.spawnFloatingText(
            { x: brush.x + brush.width / 2, y: brush.y + brush.height / 2 - 22 },
            'C₆H₁₀O₅ + 6O₂ → 6CO₂ + 5H₂O',
            '#f87171',
            false,
            true
          );

          this.reactionsTriggered.push({
            id: `rx_bush_burn_${Date.now()}_${Math.random()}`,
            timestampSeconds: this.matchTimeSeconds,
            sourceHeroId: aoe.sourceEntityId,
            targetEntityId: brush.id,
            reactionRule: {
              ruleCode: 'RX_BIOMASS_COMBUSTION',
              name_vi: 'Cháy Rụi Sinh Khối Bụi Rậm',
              name_en: 'Biomass Foliage Combustion',
              equation: 'C₆H₁₀O₅ (Cellulose) + 6O₂ → 6CO₂ + 5H₂O',
              reactants: ['Cellulose', 'O2'],
              products: ['CO2', 'H2O'],
              basePower: 35,
              thermodynamics: 'EXOTHERMIC',
              groupCategory: 'GROUP_E_COMBUSTION',
              isTrap: false,
              observablePhenomenaVI: 'Bụi cây bị thiêu rụi bốc cháy dữ dội, tước bỏ hoàn toàn khả năng ngụy trang của bất kỳ mục tiêu nào bên trong.',
              pedagogicalExplanation: 'Quá trình cháy hoàn toàn của xenlulozơ tỏa nhiệt phá hủy cấu trúc sinh khối thực vật, làm lộ diện vị trí ngụy trang.'
            } as any,
            equation: 'C₆H₁₀O₅ + 6O₂ → 6CO₂ + 5H₂O',
            observablePhenomenaVI: 'Bụi rậm bốc cháy dữ dội, mất hoàn toàn khả năng ẩn nấp.',
            bonusDamage: 0,
            isTrap: false,
            pedagogicalNoteVI: 'Phản ứng cháy xenlulozơ giải phóng CO2 và hơi nước, triệt tiêu bụi rậm ngụy trang.'
          });
          sound.playChemicalDetonation(true);
        }
      }
    }
  }

  resolveOverlappingAoEReactions(dt: number) {
    if (this.aoeZones.length < 2) return;

    for (let i = 0; i < this.aoeZones.length; i++) {
      for (let j = i + 1; j < this.aoeZones.length; j++) {
        const aoeA = this.aoeZones[i];
        const aoeB = this.aoeZones[j];

        const dx = aoeA.pos.x - aoeB.pos.x;
        const dy = aoeA.pos.y - aoeB.pos.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= aoeA.radius + aoeB.radius) {
          const catA = aoeA.chemicalCategory || this.determineAoECategory(aoeA.chemicalEffectType, aoeA.elementSymbol);
          const catB = aoeB.chemicalCategory || this.determineAoECategory(aoeB.chemicalEffectType, aoeB.elementSymbol);

          const pairKey = [aoeA.id, aoeB.id].sort().join('_');
          const lastTrigger = this.aoeReactionCooldowns.get(pairKey);

          if (lastTrigger === undefined || this.matchTimeSeconds - lastTrigger >= 1.5) {
            // Case 1: Neutralization (Acid + Base)
            if ((catA === 'ACID' && catB === 'BASE') || (catA === 'BASE' && catB === 'ACID')) {
              this.aoeReactionCooldowns.set(pairKey, this.matchTimeSeconds);

              // Neutralization speeds up dissipation / cleanses toxicity
              aoeA.remainingSeconds = Math.max(0.5, aoeA.remainingSeconds - 1.2);
              aoeB.remainingSeconds = Math.max(0.5, aoeB.remainingSeconds - 1.2);

              const midPos: Vector2D = {
                x: (aoeA.pos.x + aoeB.pos.x) / 2,
                y: (aoeA.pos.y + aoeB.pos.y) / 2
              };
              const avgRadius = (aoeA.radius + aoeB.radius) / 2;

              // Neutral salt vapor heals friendly heroes caught inside and purges acid corrosion / burn
              this.heroes.filter(h => !h.isDead).forEach(h => {
                if (Math.hypot(h.pos.x - midPos.x, h.pos.y - midPos.y) <= avgRadius) {
                  const healAmount = 40;
                  h.hp = Math.min(h.maxHp, h.hp + healAmount);
                  // Cleanse harmful negative chemical status effects
                  h.statusEffects = h.statusEffects.filter(e => e.type !== 'ACID_CORROSION' && e.type !== 'BURN_OXIDATION');
                  this.spawnFloatingText(h.pos, `+${healAmount} HP (TRUNG HÒA)`, '#10b981', false);
                }
              });

              this.spawnFloatingText(midPos, '🧪 TRUNG HÒA AXIT - BAZƠ!', '#10b981', true, true);
              this.spawnFloatingText({ x: midPos.x, y: midPos.y - 24 }, 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)', '#34d399', false, true);

              this.reactionsTriggered.push({
                id: `rx_aoe_neutral_${Date.now()}_${Math.random()}`,
                timestampSeconds: this.matchTimeSeconds,
                sourceHeroId: aoeA.sourceEntityId,
                targetEntityId: aoeB.sourceEntityId,
                reactionRule: {
                  ruleCode: 'RX_SURFACE_NEUTRALIZATION',
                  name_vi: 'Phản Ứng Trung Hòa Bề Mặt AoE',
                  name_en: 'Acid-Base Surface Neutralization',
                  equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
                  reactants: ['HCl', 'NaOH'],
                  products: ['NaCl', 'H2O'],
                  basePower: 40,
                  thermodynamics: 'EXOTHERMIC',
                  groupCategory: 'GROUP_A_ACID_BASE',
                  isTrap: false,
                  observablePhenomenaVI: 'Dung dịch trung hòa tạo dung dịch muối ăn NaCl và nước, làm dịu hoàn toàn độ ăn mòn mô.',
                  pedagogicalExplanation: 'Ion H+ từ axit kết hợp ion OH- từ bazơ tạo thành H2O trung tính (pH ≈ 7), triệt tiêu tính ăn mòn của cả 2 vùng.'
                } as any,
                equation: 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)',
                observablePhenomenaVI: 'Dung dịch trung hòa tạo dung dịch muối ăn NaCl và nước, giải độc ăn mòn mô.',
                bonusDamage: 0,
                isTrap: false,
                pedagogicalNoteVI: 'Phản ứng trung hòa giải phóng enthalpy dịu nhẹ, cân bằng pH về ngưỡng sinh lý an toàn.'
              });
              sound.playShield();
            }

            // Case 2: Organic Pyrolysis Combustion (Fire + Organic)
            else if ((catA === 'FIRE' && catB === 'ORGANIC') || (catA === 'ORGANIC' && catB === 'FIRE')) {
              this.aoeReactionCooldowns.set(pairKey, this.matchTimeSeconds);
              const midPos: Vector2D = {
                x: (aoeA.pos.x + aoeB.pos.x) / 2,
                y: (aoeA.pos.y + aoeB.pos.y) / 2
              };
              const avgRadius = (aoeA.radius + aoeB.radius) / 2;

              // Fire blast damage to all enemies in overlap
              const fireTeam = catA === 'FIRE' ? aoeA.team : aoeB.team;
              const enemyTeam = fireTeam === 'BLUE' ? 'RED' : 'BLUE';

              this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
                if (Math.hypot(h.pos.x - midPos.x, h.pos.y - midPos.y) <= avgRadius) {
                  this.applyDirectDamage(h, 60, 'CHEMICAL', null);
                  h.statusEffects.push({
                    id: `burn_${Date.now()}`,
                    type: 'BURN_OXIDATION',
                    name_vi: 'Bỏng Hydrocarbon',
                    durationSeconds: 2.5,
                    remainingSeconds: 2.5,
                    potency: 18
                  });
                }
              });

              this.spawnFloatingText(midPos, '💥 BÙNG NỔ NHIỆT HỮU CƠ!', '#f97316', true, true);
              this.spawnFloatingText({ x: midPos.x, y: midPos.y - 24 }, 'CH₄ + 2O₂ → CO₂ + 2H₂O', '#fb923c', false, true);
              this.triggerScreenShake(7);
              sound.playChemicalDetonation(true);
            }

            // Case 3: Precipitation Entanglement (Base + Copper/Barium Electrolyte)
            else if ((catA === 'BASE' && catB === 'ELECTROLYTE') || (catA === 'ELECTROLYTE' && catB === 'BASE')) {
              this.aoeReactionCooldowns.set(pairKey, this.matchTimeSeconds);
              const midPos: Vector2D = {
                x: (aoeA.pos.x + aoeB.pos.x) / 2,
                y: (aoeA.pos.y + aoeB.pos.y) / 2
              };
              const avgRadius = (aoeA.radius + aoeB.radius) / 2;

              // Insoluble gelatinous precipitate slows and roots
              this.heroes.filter(h => !h.isDead).forEach(h => {
                if (Math.hypot(h.pos.x - midPos.x, h.pos.y - midPos.y) <= avgRadius) {
                  h.statusEffects.push({
                    id: `precip_${Date.now()}`,
                    type: 'SLOW',
                    name_vi: 'Kẹt Kết Tủa Lam Cu(OH)₂',
                    durationSeconds: 2.2,
                    remainingSeconds: 2.2,
                    potency: 0.55
                  });
                }
              });

              this.spawnFloatingText(midPos, '❄️ KẾT TỦA KẸT CHÂN Cu(OH)₂↓!', '#06b6d4', true, true);
              this.spawnFloatingText({ x: midPos.x, y: midPos.y - 24 }, 'Cu²⁺ + 2OH⁻ → Cu(OH)₂↓', '#38bdf8', false, true);
              sound.playShield();
            }
          }
        }
      }
    }
  }

  updateBurningBushes(dt: number) {
    if (this.burningBushes.size === 0) return;

    for (const [brushId, remaining] of Array.from(this.burningBushes.entries())) {
      const nextRemaining = remaining - dt;
      if (nextRemaining <= 0) {
        this.burningBushes.delete(brushId);
      } else {
        this.burningBushes.set(brushId, nextRemaining);
        const brush = MAP_BRUSHES.find(b => b.id === brushId);
        if (brush) {
          // Burn ticks on all entities inside
          this.heroes.filter(h => !h.isDead).forEach(h => {
            if (
              h.pos.x >= brush.x &&
              h.pos.x <= brush.x + brush.width &&
              h.pos.y >= brush.y &&
              h.pos.y <= brush.y + brush.height
            ) {
              this.applyDirectDamage(h, 15 * dt, 'CHEMICAL', null);
            }
          });
        }
      }
    }
  }

  updateEnvironmentalZones(dt: number) {
    if (this.environmentalZones.length === 0) return;

    this.environmentalZones = this.environmentalZones.filter(env => {
      env.remainingSeconds -= dt;
      if (!env.timeSinceLastTick) env.timeSinceLastTick = 0;
      env.timeSinceLastTick += dt;

      // Tick effects every 0.5s
      if (env.timeSinceLastTick >= 0.5) {
        env.timeSinceLastTick = 0;

        // Frozen River Bridge
        if (env.type === 'FROZEN_RIVER') {
          // Friendly heroes slide on ice with +30% haste
          this.heroes.filter(h => h.team === env.team && !h.isDead).forEach(h => {
            if (Math.hypot(h.pos.x - env.pos.x, h.pos.y - env.pos.y) <= env.radius) {
              const existingHaste = h.statusEffects.find(e => e.name_vi === 'Trượt Băng Nitơ N₂');
              if (existingHaste) {
                existingHaste.remainingSeconds = 0.8;
              } else {
                h.statusEffects.push({
                  id: `ice_slide_${Date.now()}`,
                  type: 'HASTE',
                  name_vi: 'Trượt Băng Nitơ N₂',
                  durationSeconds: 0.8,
                  remainingSeconds: 0.8,
                  potency: 0.30
                });
              }
            }
          });
        }
        // Limewater Caustic Pool
        else if (env.type === 'LIMEWATER_CAUSTIC') {
          const enemyTeam = env.team === 'BLUE' ? 'RED' : 'BLUE';
          this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
            if (Math.hypot(h.pos.x - env.pos.x, h.pos.y - env.pos.y) <= env.radius) {
              this.applyDirectDamage(h, 12, 'CHEMICAL', null);
              const existingWeaken = h.statusEffects.find(e => e.name_vi === 'Xói Mòn Kiềm Ca(OH)₂');
              if (existingWeaken) {
                existingWeaken.remainingSeconds = 1.0;
              } else {
                h.statusEffects.push({
                  id: `caustic_weaken_${Date.now()}`,
                  type: 'ALKALI_WEAKEN',
                  name_vi: 'Xói Mòn Kiềm Ca(OH)₂',
                  durationSeconds: 1.0,
                  remainingSeconds: 1.0,
                  potency: 0.20
                });
              }
            }
          });
        }
        // Electrified Water Zone
        else if (env.type === 'ELECTRIFIED_WATER') {
          const enemyTeam = env.team === 'BLUE' ? 'RED' : 'BLUE';
          this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
            if (Math.hypot(h.pos.x - env.pos.x, h.pos.y - env.pos.y) <= env.radius) {
              this.applyDirectDamage(h, 15, 'CHEMICAL', null);
              const existingSlow = h.statusEffects.find(e => e.name_vi === 'Nhiễm Điện Sông');
              if (existingSlow) {
                existingSlow.remainingSeconds = 1.0;
              } else {
                h.statusEffects.push({
                  id: `shock_slow_${Date.now()}`,
                  type: 'SLOW',
                  name_vi: 'Nhiễm Điện Sông',
                  durationSeconds: 1.0,
                  remainingSeconds: 1.0,
                  potency: 0.25
                });
              }
            }
          });
        }
      }

      return env.remainingSeconds > 0;
    });
  }

  updateAoEZones(dt: number) {
    // 1. Resolve chemical interactions between overlapping AoE zones
    this.resolveOverlappingAoEReactions(dt);

    // 2. Check AoE interactions with map environmental surfaces (River, Bushes)
    this.aoeZones.forEach(aoe => this.checkAoEEnvironmentReactions(aoe));

    // 3. Update ongoing burning brushes (damage & duration)
    this.updateBurningBushes(dt);

    // 4. Update ongoing environmental zones (ice bridges, caustic pools, electrified rivers)
    this.updateEnvironmentalZones(dt);

    // 4. Tick damage & status effects on heroes and minions inside AoE
    this.aoeZones = this.aoeZones.filter(aoe => {
      aoe.remainingSeconds -= dt;
      aoe.timeSinceLastTick += dt;

      if (aoe.timeSinceLastTick >= aoe.tickRateSeconds) {
        aoe.timeSinceLastTick = 0;
        const enemyTeam = aoe.team === 'BLUE' ? 'RED' : 'BLUE';

        // Damage heroes in zone
        this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
          if (Math.hypot(h.pos.x - aoe.pos.x, h.pos.y - aoe.pos.y) <= aoe.radius) {
            this.applyDirectDamage(h, aoe.damagePerTick, aoe.damageType, null);
            if (aoe.slowPercentage) {
              h.statusEffects.push({
                id: `slow_${Date.now()}`,
                type: 'SLOW',
                name_vi: 'Làm Chậm Vùng',
                durationSeconds: 1.0,
                remainingSeconds: 1.0,
                potency: aoe.slowPercentage
              });
            }
          }
        });

        // Damage minions in zone
        this.minions.filter(m => m.team === enemyTeam).forEach(m => {
          if (Math.hypot(m.pos.x - aoe.pos.x, m.pos.y - aoe.pos.y) <= aoe.radius) {
            this.applyDirectDamage(m, aoe.damagePerTick, aoe.damageType, null);
          }
        });
      }

      return aoe.remainingSeconds > 0;
    });
  }

  updateMonsters(dt: number) {
    this.monsters.forEach(monster => {
      if (!monster.isAlive) {
        monster.respawnTimer -= dt;
        if (monster.respawnTimer <= 0) {
          monster.isAlive = true;
          monster.hp = monster.maxHp;
          monster.pos = { ...(monster.spawnPos || monster.pos) };
          monster.targetEntityId = null;
        }
        return;
      }

      if (monster.attackCooldown > 0) {
        monster.attackCooldown -= dt;
      }

      const spawn = monster.spawnPos || monster.pos;

      // 1. Leash check: If monster strayed too far from pit (> 420 units), reset and heal
      const distFromSpawn = Math.hypot(monster.pos.x - spawn.x, monster.pos.y - spawn.y);
      if (distFromSpawn > 420) {
        monster.targetEntityId = null;
        const dx = spawn.x - monster.pos.x;
        const dy = spawn.y - monster.pos.y;
        const step = 220 * dt;
        monster.pos.x += (dx / distFromSpawn) * step;
        monster.pos.y += (dy / distFromSpawn) * step;
        monster.hp = Math.min(monster.maxHp, monster.hp + monster.maxHp * 0.3 * dt);
        return;
      }

      // 2. Target validation: Check existing target
      let targetHero: HeroRuntimeEntity | null = null;
      if (monster.targetEntityId) {
        const found = this.heroes.find(h => h.id === monster.targetEntityId && !h.isDead);
        if (found && Math.hypot(found.pos.x - spawn.x, found.pos.y - spawn.y) <= 420) {
          targetHero = found;
        } else {
          monster.targetEntityId = null;
        }
      }

      // 3. Threat detection: Scan for heroes entering aggro perimeter
      if (!targetHero) {
        const aggroPerimeter = monster.type === 'CATALYST_GUARDIAN' ? 260 : 180;
        const intruders = this.heroes
          .filter(h => !h.isDead && Math.hypot(h.pos.x - spawn.x, h.pos.y - spawn.y) <= aggroPerimeter)
          .sort((a, b) => Math.hypot(a.pos.x - spawn.x, a.pos.y - spawn.y) - Math.hypot(b.pos.x - spawn.x, b.pos.y - spawn.y));

        if (intruders.length > 0) {
          targetHero = intruders[0];
          monster.targetEntityId = targetHero.id;
        }
      }

      // 4. Combat actions
      if (targetHero) {
        const distToHero = Math.hypot(targetHero.pos.x - monster.pos.x, targetHero.pos.y - monster.pos.y);

        // Move towards target if outside attack range
        if (distToHero > monster.attackRange) {
          const moveStep = 130 * dt;
          monster.pos.x += ((targetHero.pos.x - monster.pos.x) / distToHero) * moveStep;
          monster.pos.y += ((targetHero.pos.y - monster.pos.y) / distToHero) * moveStep;
        }

        // Execute elemental monster attack
        if (distToHero <= monster.attackRange + 30 && monster.attackCooldown <= 0) {
          monster.attackCooldown = 1.35;

          if (monster.type === 'CATALYST_GUARDIAN') {
            // Boss: Catalyst Burst Attack
            this.applyDamageToHero(targetHero, monster.attackDamage, 'CHEMICAL', 'Xung Lực Xúc Tác');
            this.spawnFloatingText(targetHero.pos, `-${monster.attackDamage}`, '#f59e0b');

            // Boss AoE swipe if multiple heroes are close (180 radius)
            this.triggerScreenShake(6);
            this.heroes.forEach(other => {
              if (other.id !== targetHero!.id && !other.isDead && Math.hypot(other.pos.x - monster.pos.x, other.pos.y - monster.pos.y) <= 180) {
                this.applyDamageToHero(other, Math.round(monster.attackDamage * 0.6), 'CHEMICAL', 'Quét Xúc Tác');
                this.spawnFloatingText(other.pos, `-${Math.round(monster.attackDamage * 0.6)}`, '#f59e0b');
              }
            });
          } else if (monster.type === 'ACID_LIZARD') {
            // Acid lizard applies corrosive acid DoT
            this.applyDamageToHero(targetHero, monster.attackDamage, 'PHYSICAL', 'Cắn Axit');
            targetHero.statusEffects.push({
              id: `acid_dot_${Date.now()}`,
              type: 'ACID_CORROSION',
              name_vi: 'Ăn Mòn Axit Cl⁻',
              durationSeconds: 3.0,
              remainingSeconds: 3.0,
              potency: 16
            });
            this.spawnFloatingText(targetHero.pos, `-${monster.attackDamage} (Axit)`, '#84cc16');
          } else if (monster.type === 'CRYSTAL_GOLEM') {
            // Crystal golem applies BaSO4 crystal slow
            this.applyDamageToHero(targetHero, monster.attackDamage, 'PHYSICAL', 'Đập Tinh Thể');
            targetHero.statusEffects.push({
              id: `crystal_slow_${Date.now()}`,
              type: 'SLOW',
              name_vi: 'Lắng Đọng BaSO₄',
              durationSeconds: 2.0,
              remainingSeconds: 2.0,
              potency: 0.25
            });
            this.spawnFloatingText(targetHero.pos, `-${monster.attackDamage} (Làm chậm)`, '#38bdf8');
          }
        }
      } else {
        // Return to spawn if displaced
        if (distFromSpawn > 10) {
          const dx = spawn.x - monster.pos.x;
          const dy = spawn.y - monster.pos.y;
          const step = 90 * dt;
          monster.pos.x += (dx / distFromSpawn) * step;
          monster.pos.y += (dy / distFromSpawn) * step;
        }
      }
    });
  }

  updateFloatingText(dt: number) {
    this.floatingTexts = this.floatingTexts.filter(txt => {
      txt.lifeTimeSeconds += dt;
      txt.pos.y += txt.velocityY * dt;
      return txt.lifeTimeSeconds < txt.maxLifeTimeSeconds;
    });
  }

  // Cast Player / Bot Skill
  castSkill(hero: HeroRuntimeEntity, slot: 'Q' | 'W' | 'E' | 'R', targetPos: Vector2D) {
    if (hero.isDead) return;
    if (hero.statusEffects.some(eff => eff.type === 'STUN')) return;
    const skill = hero.skills[slot.toLowerCase() as 'q' | 'w' | 'e' | 'r'];
    if (!skill || skill.currentCooldown > 0) return;

    if (hero.mana < skill.manaCost && !(hero.isPlayer && this.cheats.infiniteMana)) {
      if (hero.isPlayer) {
        this.spawnFloatingText(hero.pos, 'Không đủ Năng Lượng!', '#fbbf24');
        sound.playErrorFizzle();
      }
      return;
    }

    // Deduct Mana & Set Cooldown
    hero.mana -= skill.manaCost;
    skill.currentCooldown = (hero.isPlayer && this.cheats.zeroCooldown) ? 0 : skill.cooldownSeconds;

    sound.playSpellCast();

    // Calculate total damage with scaling
    let dmg = skill.baseDamage;
    if (skill.scalingStat === 'AD') dmg += hero.attackDamage * skill.scalingRatio;
    if (skill.scalingStat === 'AP') dmg += hero.abilityPower * skill.scalingRatio;
    if (skill.scalingStat === 'HP') dmg += hero.maxHp * skill.scalingRatio;

    // Check Chemical Reaction Synergy with Environment (e.g. River Water H2O)
    const inRiver = this.isPositionInRiver(hero.pos) || this.isPositionInRiver(targetPos);
    let reactionCode = skill.reactionCode;

    // Water reaction synergy: If Sodium or Potassium uses skill in River
    if (inRiver && (hero.definition.symbol === 'Na' || hero.definition.symbol === 'K')) {
      reactionCode = hero.definition.symbol === 'Na' ? 'rx_groupA_na_water' : 'rx_groupA_k_water';
    }

    // Skill Execution based on Target Type
    switch (skill.targetType) {
      case 'SKILLSHOT_LINE': {
        const dx = targetPos.x - hero.pos.x;
        const dy = targetPos.y - hero.pos.y;
        const dist = Math.hypot(dx, dy) || 1;
        const range = skill.range;
        const dest: Vector2D = {
          x: hero.pos.x + (dx / dist) * range,
          y: hero.pos.y + (dy / dist) * range
        };

        this.projectiles.push({
          id: `proj_skill_${hero.id}_${slot}_${Date.now()}`,
          sourceEntityId: hero.id,
          team: hero.team,
          pos: { ...hero.pos },
          velocity: { x: 0, y: 0 },
          targetPos: dest,
          speed: skill.projectileSpeed || 1000,
          radius: skill.projectileRadius || 30,
          damage: dmg,
          damageType: 'CHEMICAL',
          isHoming: false,
          piercing: true,
          maxDistance: range,
          traveledDistance: 0,
          color: hero.definition.colorTheme,
          chemicalReactionCode: reactionCode,
          hitEntityIds: []
        });
        break;
      }

      case 'SKILLSHOT_AOE': {
        const radius = skill.radius || 200;
        const chemicalCategory = this.determineAoECategory(skill.name_vi, hero.definition.symbol, skill.chemicalPrincipleVI);
        const aoeEntity: AreaOfEffectEntity = {
          id: `aoe_${hero.id}_${slot}_${Date.now()}`,
          sourceEntityId: hero.id,
          team: hero.team,
          pos: { ...targetPos },
          radius,
          durationSeconds: 3.5,
          remainingSeconds: 3.5,
          tickRateSeconds: 0.5,
          timeSinceLastTick: 0,
          damagePerTick: dmg * 0.35,
          damageType: 'CHEMICAL',
          color: hero.definition.colorTheme,
          chemicalEffectType: skill.name_vi,
          slowPercentage: 0.3,
          equationVI: skill.chemicalPrincipleVI,
          chemicalCategory,
          elementSymbol: hero.definition.symbol
        };
        this.aoeZones.push(aoeEntity);
        this.checkAoEEnvironmentReactions(aoeEntity);

        // Trigger instant impact damage
        const enemyTeam = hero.team === 'BLUE' ? 'RED' : 'BLUE';
        this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
          if (Math.hypot(h.pos.x - targetPos.x, h.pos.y - targetPos.y) <= radius) {
            this.applyDirectDamage(h, dmg, 'CHEMICAL', hero, reactionCode);
          }
        });
        break;
      }

      case 'DASH': {
        const dx = targetPos.x - hero.pos.x;
        const dy = targetPos.y - hero.pos.y;
        const dist = Math.hypot(dx, dy) || 1;
        const dashDist = Math.min(dist, skill.range);
        hero.pos.x += (dx / dist) * dashDist;
        hero.pos.y += (dy / dist) * dashDist;

        // Apply shield or buff
        hero.statusEffects.push({
          id: `shield_${Date.now()}`,
          type: 'SHIELD',
          name_vi: 'Khiên Hóa Trị',
          durationSeconds: 3.0,
          remainingSeconds: 3.0,
          potency: 120 + hero.maxHp * 0.08
        });
        break;
      }

      case 'CONE':
      case 'INSTANT': {
        const radius = skill.radius || skill.range || 250;
        const enemyTeam = hero.team === 'BLUE' ? 'RED' : 'BLUE';

        // Heal caster and allies if healing skill (e.g. h_w Proton Mist Aura)
        if (skill.id === 'h_w' || skill.description_vi.includes('hồi')) {
          const healVal = 85 + hero.abilityPower * 0.5;
          const allyTeam = hero.team;
          this.heroes.filter(h => h.team === allyTeam && !h.isDead).forEach(ally => {
            if (Math.hypot(ally.pos.x - hero.pos.x, ally.pos.y - hero.pos.y) <= radius) {
              ally.hp = Math.min(ally.maxHp, ally.hp + healVal);
              this.spawnFloatingText(ally.pos, `+${Math.round(healVal)} HP`, '#34d399');
            }
          });
        }

        this.heroes.filter(h => h.team === enemyTeam && !h.isDead).forEach(h => {
          if (Math.hypot(h.pos.x - hero.pos.x, h.pos.y - hero.pos.y) <= radius) {
            this.applyDirectDamage(h, dmg, 'CHEMICAL', hero, reactionCode);
          }
        });
        break;
      }
    }
  }

  // Flash Summoner Spell (D)
  castFlash(hero: HeroRuntimeEntity, targetPos: Vector2D) {
    if (hero.isDead || hero.summonerSpells.d.currentCooldown > 0) return;
    const dx = targetPos.x - hero.pos.x;
    const dy = targetPos.y - hero.pos.y;
    const dist = Math.hypot(dx, dy) || 1;
    const flashDist = Math.min(260, dist);

    hero.pos.x += (dx / dist) * flashDist;
    hero.pos.y += (dy / dist) * flashDist;
    hero.summonerSpells.d.currentCooldown = (hero.isPlayer && this.cheats.zeroCooldown) ? 0 : hero.summonerSpells.d.cooldown;
    hero.targetMovePos = null;

    sound.playSpellCast();
    this.spawnFloatingText(hero.pos, 'TỐC BIẾN!', '#38bdf8');
  }

  // Heal Summoner Spell (F)
  castHeal(hero: HeroRuntimeEntity) {
    if (hero.isDead || hero.summonerSpells.f.currentCooldown > 0) return;
    const healAmount = hero.maxHp * 0.25;
    hero.hp = Math.min(hero.maxHp, hero.hp + healAmount);
    hero.statusEffects.push({
      id: `haste_${Date.now()}`,
      type: 'HASTE',
      name_vi: 'Tăng Tốc Hồi Phục',
      durationSeconds: 2.0,
      remainingSeconds: 2.0,
      potency: 0.3
    });
    hero.summonerSpells.f.currentCooldown = (hero.isPlayer && this.cheats.zeroCooldown) ? 0 : hero.summonerSpells.f.cooldown;

    sound.playReactionSuccess();
    this.spawnFloatingText(hero.pos, `+${Math.round(healAmount)} HP`, '#10b981');
  }

  // Channel Recall to Base (B)
  startRecall(hero: HeroRuntimeEntity) {
    if (hero.isDead || hero.isRecalling) return;
    hero.isRecalling = true;
    hero.recallRemainingSeconds = 4.0;
    hero.targetMovePos = null;
    if (hero.isPlayer) sound.playRecall();
    this.spawnFloatingText(hero.pos, 'ĐANG BIẾN VỀ...', '#60a5fa');
  }

  // Damage pipeline with chemical reaction detection
  applyDirectDamage(
    target: any,
    amount: number,
    type: 'PHYSICAL' | 'CHEMICAL' | 'TRUE',
    source: any = null,
    chemicalReactionCode?: string
  ) {
    if (target.hp <= 0) return;

    // Check if target is Hero, Minion, Turret, or Core
    let finalDmg = amount;

    // Armor / Magic resist calculation with shred / debuffs
    if (type === 'PHYSICAL' && target.armor) {
      let effectiveArmor = target.armor;
      const weakenEffect = target.statusEffects?.find((e: any) => e.type === 'ALKALI_WEAKEN' || e.name_vi?.includes('Nhiệt Nhôm') || e.name_vi?.includes('Xói Mòn'));
      if (weakenEffect) {
        effectiveArmor = Math.max(0, effectiveArmor * (1 - weakenEffect.potency));
      }
      finalDmg = amount * (100 / (100 + effectiveArmor));
    } else if (type === 'CHEMICAL' && target.magicResist) {
      let effectiveMr = target.magicResist;
      const acidEffect = target.statusEffects?.find((e: any) => e.type === 'ACID_CORROSION');
      if (acidEffect) {
        effectiveMr = Math.max(0, effectiveMr * (1 - (acidEffect.potency / 100)));
      }
      finalDmg = amount * (100 / (100 + effectiveMr));
    }

    finalDmg = Math.max(1, Math.round(finalDmg));

    // Chemical Reaction Detection
    let rxRule: ReactionDetail | undefined = undefined;
    let isTeamSynergy = false;
    let primerPartnerHero: HeroRuntimeEntity | undefined = undefined;

    const srcHero = (source && 'definition' in source) ? (source as HeroRuntimeEntity) : null;
    const srcSymbol = srcHero?.definition?.symbol;

    if (chemicalReactionCode) {
      rxRule = REACTION_RULES_DATABASE.find(r => r.id === chemicalReactionCode || r.code === chemicalReactionCode);
    }

    // 1. Ally Teamwork Primer Synergy (Teammates combining elements on the same enemy)
    if (!rxRule && srcHero && srcSymbol && target.elementalPrimer) {
      const p = target.elementalPrimer;
      const isExpired = (this.matchTimeSeconds - p.appliedAt) > p.durationSeconds;
      if (!isExpired && p.team === srcHero.team && p.sourceHeroId !== srcHero.id && p.symbol !== srcSymbol) {
        const pairKey = `synergy_${p.sourceHeroId}_${srcHero.id}_${target.id}`;
        const lastSynergy = this.dynamicReactionCooldowns.get(pairKey);
        if (lastSynergy === undefined || this.matchTimeSeconds - lastSynergy >= 2.0) {
          const activeConditions: EnvironmentalCondition[] = ['OXYGEN_GAS'];
          if (type === 'CHEMICAL') activeConditions.push('HIGH_TEMP');
          if (this.isPositionInRiver(target.pos)) activeConditions.push('MOISTURE_H2O');
          if (srcHero.statusEffects?.some(e => e.type === 'CATALYST_BUFF')) activeConditions.push('CATALYST');
          if (srcHero.statusEffects?.some(e => e.type === 'ACID_AURA')) activeConditions.push('ACID_DILUTE');

          const evalRes = defaultReactionEngine.evaluateCombination([p.symbol, srcSymbol], activeConditions);
          if (evalRes.matchedRule) {
            rxRule = evalRes.matchedRule;
            isTeamSynergy = true;
            primerPartnerHero = this.heroes.find(h => h.id === p.sourceHeroId);
            this.dynamicReactionCooldowns.set(pairKey, this.matchTimeSeconds);
            target.elementalPrimer = undefined; // Consumed by synergy
          }
        }
      }
    }

    // 2. Opponent Champion Collision Reaction (Direct elemental clash between two champions)
    if (!rxRule && srcHero && srcSymbol && target && 'definition' in target && source.id !== target.id) {
      const targetHero = target as HeroRuntimeEntity;
      const targetSymbol = targetHero.definition?.symbol;

      if (targetSymbol && srcSymbol !== targetSymbol) {
        const pairKey = `${source.id}_${target.id}`;
        const lastTrigger = this.dynamicReactionCooldowns.get(pairKey);

        if (lastTrigger === undefined || this.matchTimeSeconds - lastTrigger >= 2.0) {
          const activeConditions: EnvironmentalCondition[] = ['OXYGEN_GAS'];
          if (type === 'CHEMICAL') {
            activeConditions.push('HIGH_TEMP');
          }
          if (this.isPositionInRiver(target.pos)) {
            activeConditions.push('MOISTURE_H2O');
          }
          for (const aoe of this.aoeZones) {
            if (Math.hypot(aoe.pos.x - target.pos.x, aoe.pos.y - target.pos.y) <= aoe.radius) {
              if (aoe.color === '#f97316' || aoe.chemicalEffectType?.includes('Hỏa') || aoe.chemicalEffectType?.includes('Cháy')) {
                activeConditions.push('HIGH_TEMP');
                activeConditions.push('OXYGEN_GAS');
              }
              if (aoe.chemicalEffectType?.includes('Axit') || aoe.chemicalEffectType?.includes('HCl')) {
                activeConditions.push('ACID_DILUTE');
              }
              if (aoe.chemicalEffectType?.includes('Kiềm') || aoe.chemicalEffectType?.includes('NaOH')) {
                activeConditions.push('BASE_ALKALINE');
              }
            }
          }
          if (srcHero.statusEffects?.some(e => e.type === 'CATALYST_BUFF') || targetHero.statusEffects?.some(e => e.type === 'CATALYST_BUFF')) {
            activeConditions.push('CATALYST');
          }
          if (srcHero.statusEffects?.some(e => e.type === 'ACID_AURA') || targetHero.statusEffects?.some(e => e.type === 'ACID_CORROSION')) {
            activeConditions.push('ACID_DILUTE');
          }

          const evalRes = defaultReactionEngine.evaluateCombination([srcSymbol, targetSymbol], activeConditions);
          if (evalRes.matchedRule) {
            rxRule = evalRes.matchedRule;
            this.dynamicReactionCooldowns.set(pairKey, this.matchTimeSeconds);
          }
        }
      }
    } else if (!rxRule && source && 'definition' in source && this.isPositionInRiver(target.pos)) {
      // Dynamic Single-Element River Interaction (e.g. Alkali metals Na / K / Ba / Ca reacting with water)
      if (srcSymbol && (srcSymbol === 'Na' || srcSymbol === 'K' || srcSymbol === 'Ba' || srcSymbol === 'Ca')) {
        const soloKey = `river_${source.id}_${target.id || 'target'}`;
        const lastSolo = this.dynamicReactionCooldowns.get(soloKey);
        if (lastSolo === undefined || this.matchTimeSeconds - lastSolo >= 2.5) {
          const evalRes = defaultReactionEngine.evaluateCombination([srcSymbol], ['MOISTURE_H2O']);
          if (evalRes.matchedRule) {
            rxRule = evalRes.matchedRule;
            this.dynamicReactionCooldowns.set(soloKey, this.matchTimeSeconds);
          }
        }
      }
    }

    if (rxRule) {
        // DCSM Electrochemical Reactivity series check: Cu and Au are post-Hydrogen (E° > 0)
        // Non-oxidizing dilute acids fail to corrode Cu / Au!
        const targetSymbol = target.definition?.symbol;
        const isAcidReaction = rxRule.groupCategory === 'GROUP_C_ACID_BASE' || rxRule.id.includes('acid') || rxRule.equation.includes('HCl');

        if ((targetSymbol === 'Cu' || targetSymbol === 'Au') && isAcidReaction) {
          // Trigger Resistance Feedback!
          finalDmg = Math.max(1, Math.round(amount * 0.2)); // 80% reduction
          this.spawnFloatingText(target.pos, `🛡️ ${targetSymbol} KHÁNG AXIT LOÃNG (E° > 0)!`, '#eab308', true, true);
          this.spawnFloatingText({ x: target.pos.x, y: target.pos.y - 20 }, `${targetSymbol} đứng sau H trong dãy điện hóa`, '#94a3b8', false, true);
          sound.playShield();
          // Record cognitive trap in telemetry
          this.chemicalTrapsEncountered.push({
            id: `trap_${Date.now()}`,
            timestampSeconds: this.matchTimeSeconds,
            sourceHeroId: source ? source.id : 'unknown',
            targetEntityId: target.id,
            reactionRule: rxRule,
            equation: rxRule.equation,
            observablePhenomenaVI: `${targetSymbol} không tan trong acid loãng do thế điện cực dương (E° = +0.34V).`,
            bonusDamage: 0,
            isTrap: true,
            pedagogicalNoteVI: 'Cu đứng sau Hydro trong dãy hoạt động hóa học kim loại, không đẩy được H+ ra khỏi dung dịch axit loãng.'
          });
        } else {
          // Normal Reaction Trigger!
          const bonusDmg = isTeamSynergy ? rxRule.basePower * 1.5 : rxRule.basePower * 1.2;
          finalDmg += bonusDmg;

          if (srcHero?.kda) srcHero.kda.reactionsTriggered++;
          if (primerPartnerHero?.kda) primerPartnerHero.kda.reactionsTriggered++;

          this.latestReactionAlert = {
            rule: rxRule,
            equation: rxRule.equation,
            phenomena: rxRule.observablePhenomenaVI,
            timestamp: this.matchTimeSeconds,
            pos: { x: target.pos.x, y: target.pos.y }
          };

          this.reactionsTriggered.push({
            id: `rx_event_${Date.now()}`,
            timestampSeconds: this.matchTimeSeconds,
            sourceHeroId: source ? source.id : 'unknown',
            targetEntityId: target.id,
            reactionRule: rxRule,
            equation: rxRule.equation,
            observablePhenomenaVI: rxRule.observablePhenomenaVI,
            bonusDamage: bonusDmg,
            isTrap: rxRule.isTrap,
            pedagogicalNoteVI: rxRule.pedagogicalExplanation,
            isTeamSynergy,
            secondarySourceHeroId: primerPartnerHero?.id,
            synergyPartners: (isTeamSynergy && primerPartnerHero && srcHero) ? [primerPartnerHero.definition.symbol, srcHero.definition.symbol] : undefined
          });

          sound.playChemicalDetonation(rxRule.thermodynamics !== 'ENDOTHERMIC');

          if (isTeamSynergy) {
            this.triggerAnnouncement({
              type: 'TEAM_SYNERGY',
              title: `🤝 COMBO ĐỒNG ĐỘI: ${rxRule.name_vi.toUpperCase()}`,
              subtitle: `${primerPartnerHero?.definition.name_vi || 'Đồng đội'} + ${srcHero?.definition.name_vi || 'Bạn'} ➔ ${rxRule.equation}`,
              killerName: `${primerPartnerHero?.definition.name_vi || 'Ally'} & ${srcHero?.definition.name_vi || 'Hero'}`,
              killerTeam: srcHero?.team || 'BLUE'
            });
            this.spawnFloatingText(target.pos, `🤝 COMBO: ${rxRule.name_vi.toUpperCase()}!`, '#10b981', true, true);
          } else {
            this.spawnFloatingText(target.pos, `⚡ ${rxRule.name_vi.toUpperCase()}!`, '#f59e0b', true, true);
          }

          this.spawnFloatingText(
            { x: target.pos.x, y: target.pos.y - 25 },
            rxRule.equation,
            '#00f0ff',
            false,
            true
          );

          // Apply chemical status effects to heroes based on reaction group and specific reaction characteristics
          if (target.statusEffects && Array.isArray(target.statusEffects)) {
            const ruleId = rxRule.id.toLowerCase();
            const r = rxRule.reactants || [];

            // 1. Thermite Reaction (Fe + Al)
            if ((r.includes('Al') && r.includes('Fe')) || ruleId.includes('fe_al') || ruleId === 'rx_exp_14' || ruleId.includes('thermite')) {
              target.statusEffects.push({
                id: `thermite_shred_${Date.now()}_${Math.random()}`,
                type: 'ALKALI_WEAKEN',
                name_vi: 'Nhiệt Nhôm Nóng Chảy Giáp',
                durationSeconds: 4.0,
                remainingSeconds: 4.0,
                potency: 0.40
              });
              target.statusEffects.push({
                id: `thermite_burn_${Date.now()}_${Math.random()}`,
                type: 'BURN_OXIDATION',
                name_vi: 'Lửa Nhiệt Nhôm 2500°C',
                durationSeconds: 3.5,
                remainingSeconds: 3.5,
                potency: 35
              });
              this.spawnFloatingText(target.pos, '💥 NHIỆT NHÔM (NÓNG CHẢY GIÁP -40%)!', '#ff4500', true);
              this.triggerScreenShake(12);
            }
            // 2. Table Salt Synthesis (Na + Cl)
            else if ((r.includes('Na') && r.includes('Cl')) || ruleId === 'rx_groupe_combustion_na_cl2' || ruleId.includes('cl_na')) {
              target.statusEffects.push({
                id: `salt_stun_${Date.now()}_${Math.random()}`,
                type: 'STUN',
                name_vi: 'Muối Ăn Bùng Sáng',
                durationSeconds: 0.8,
                remainingSeconds: 0.8,
                potency: 1.0
              });
              target.statusEffects.push({
                id: `salt_blind_${Date.now()}_${Math.random()}`,
                type: 'BLIND',
                name_vi: 'Lóa Mắt Quang Phổ Na',
                durationSeconds: 2.0,
                remainingSeconds: 2.0,
                potency: 1.0
              });
              this.spawnFloatingText(target.pos, '✨ TINH THỂ NaCl BÙNG SÁNG (CHOÁNG 0.8s)!', '#fef08a', true);
              this.triggerScreenShake(8);
            }
            // 3. Ammonia Synthesis (N + H)
            else if ((r.includes('N') && r.includes('H')) || ruleId.includes('h_n') || ruleId.includes('haber')) {
              target.statusEffects.push({
                id: `ammonia_slow_${Date.now()}_${Math.random()}`,
                type: 'SLOW',
                name_vi: 'Khí Amoniac Cay Nồng',
                durationSeconds: 3.0,
                remainingSeconds: 3.0,
                potency: 0.50
              });
              this.spawnFloatingText(target.pos, '☁️ KHÍ AMONIAC CAY NỒNG (CHẬM 50%)!', '#a7f3d0', true);
              this.triggerScreenShake(6);
            }
            // 4. Hydrogen Sulfide (H + S)
            else if ((r.includes('H') && r.includes('S')) || ruleId.includes('h_s')) {
              target.statusEffects.push({
                id: `h2s_toxic_${Date.now()}_${Math.random()}`,
                type: 'ACID_CORROSION',
                name_vi: 'Khí Độc H₂S Mùi Trứng Thối',
                durationSeconds: 4.0,
                remainingSeconds: 4.0,
                potency: 25
              });
              this.spawnFloatingText(target.pos, '☠️ KHÍ H₂S MÙI TRỨNG THỐI (ĐỘC TÍNH CAO)!', '#bef264', true);
              this.triggerScreenShake(6);
            }
            // 5. Hydrochloric Acid Cloud (H + Cl)
            else if ((r.includes('H') && r.includes('Cl') && !r.includes('Na')) || ruleId.includes('cl_h')) {
              target.statusEffects.push({
                id: `hcl_mist_${Date.now()}_${Math.random()}`,
                type: 'ACID_CORROSION',
                name_vi: 'Sương Mù Axit Clohiđric',
                durationSeconds: 3.5,
                remainingSeconds: 3.5,
                potency: 30
              });
              this.spawnFloatingText(target.pos, '🧪 SƯƠNG MÙ AXIT CLOHIĐRIC!', '#34d399', true);
              this.triggerScreenShake(7);
            }
            // 6. Oxyhydrogen Detonation (H + O)
            else if (((r.includes('H') && r.includes('O')) && !r.includes('Na') && !r.includes('Fe') && !r.includes('C') && !r.includes('Al')) || ruleId === 'rx_sys_h_o' || ruleId === 'rx_h2_o2_explosion') {
              const blastRadius = 220;
              const blastDmg = 100;
              const hitTeam = target.team;
              this.heroes.filter(h => h.team === hitTeam && h.id !== target.id && !h.isDead).forEach(enemy => {
                if (Math.hypot(enemy.pos.x - target.pos.x, enemy.pos.y - target.pos.y) <= blastRadius) {
                  this.applyDirectDamage(enemy, blastDmg, 'CHEMICAL', source);
                }
              });
              this.spawnFloatingText(target.pos, '💥 VỤ NỔ HỖN HỢP NỔ H₂/O₂ (+100 NỔ LAN)!', '#ef4444', true);
              this.triggerScreenShake(14);
            }
            // 7. Generic Fallbacks based on Group Category
            else if (rxRule.groupCategory === 'GROUP_E_COMBUSTION') {
              target.statusEffects.push({
                id: `burn_${Date.now()}_${Math.random()}`,
                type: 'BURN_OXIDATION',
                name_vi: 'Bỏng Oxi Hóa',
                durationSeconds: 3.0,
                remainingSeconds: 3.0,
                potency: 25
              });
              this.spawnFloatingText(target.pos, '🔥 BỎNG OXI HÓA!', '#f97316', true);
              this.triggerScreenShake(8);
            } else if (rxRule.groupCategory === 'GROUP_D_PRECIPITATION_DISPLACEMENT') {
              target.statusEffects.push({
                id: `slow_precip_${Date.now()}_${Math.random()}`,
                type: 'SLOW',
                name_vi: 'Lắng Đọng Kết Tủa',
                durationSeconds: 2.5,
                remainingSeconds: 2.5,
                potency: 0.35
              });
              this.spawnFloatingText(target.pos, '❄️ LẮNG ĐỌNG KẾT TỦA (CHẬM)!', '#38bdf8', true);
              this.triggerScreenShake(6);
            } else if (rxRule.groupCategory === 'GROUP_C_ACID_BASE') {
              target.statusEffects.push({
                id: `acid_corrode_${Date.now()}_${Math.random()}`,
                type: 'ACID_CORROSION',
                name_vi: 'Ăn Mòn Axit',
                durationSeconds: 3.0,
                remainingSeconds: 3.0,
                potency: 20
              });
              this.spawnFloatingText(target.pos, '🧪 ĂN MÒN AXIT!', '#a855f7', true);
              this.triggerScreenShake(6);
            } else if (rxRule.groupCategory === 'GROUP_A_WATER') {
              target.statusEffects.push({
                id: `water_surge_${Date.now()}_${Math.random()}`,
                type: 'SLOW',
                name_vi: 'Sóng Nước Bùng Nổ',
                durationSeconds: 1.5,
                remainingSeconds: 1.5,
                potency: 0.40
              });
              this.spawnFloatingText(target.pos, '🌊 SÓNG NƯỚC (CHẬM)!', '#06b6d4', true);
              this.triggerScreenShake(6);
            } else {
              this.triggerScreenShake(8);
            }
          }
        }
      }

    // Shield absorption calculation
    if (target.shield && target.shield > 0) {
      if (target.shield >= finalDmg) {
        target.shield -= finalDmg;
        this.spawnFloatingText(target.pos, `🛡️ -${finalDmg}`, '#e2e8f0');
        finalDmg = 0;
      } else {
        finalDmg -= target.shield;
        this.spawnFloatingText(target.pos, `🛡️ -${target.shield}`, '#e2e8f0');
        target.shield = 0;
      }
    }

    target.hp -= finalDmg;
    target.flashTime = 0.08;

    // Neutral monster aggro onto attacker
    if (target.buffType && source && source.definition && !target.targetEntityId) {
      target.targetEntityId = source.id;
    }

    // Spawn floating damage text
    const color = type === 'PHYSICAL' ? '#f87171' : (type === 'CHEMICAL' ? '#38bdf8' : '#ffffff');
    this.spawnFloatingText(target.pos, `-${finalDmg}`, color);

    // If source is hero, log damage dealt
    if (source && source.kda) {
      source.kda.damageDealt += finalDmg;
    }

    // Apply / Refresh Elemental Primer on enemy target for team synergy combos (consumed if synergy just detonated)
    if (!isTeamSynergy && srcHero && srcSymbol && target.hp > 0 && target.team !== srcHero.team) {
      target.elementalPrimer = {
        symbol: srcSymbol,
        sourceHeroId: srcHero.id,
        team: srcHero.team,
        appliedAt: this.matchTimeSeconds,
        durationSeconds: 4.5
      };
    }

    // Death check
    if (target.hp <= 0) {
      target.hp = 0;
      this.handleEntityDeath(target, source);
    }
  }

  applyDamageToHero(hero: HeroRuntimeEntity, amount: number, type: 'PHYSICAL' | 'CHEMICAL', desc: string) {
    if (hero.isDead) return;
    hero.hp -= amount;
    this.spawnFloatingText(hero.pos, `-${Math.round(amount)}`, '#f87171');
    if (hero.hp <= 0) {
      hero.hp = 0;
      this.handleEntityDeath(hero, null);
    }
  }

  handleEntityDeath(target: any, killer: any) {
    // 1. Minion death
    if (target.type && (target.type === 'MELEE' || target.type === 'CASTER' || target.type === 'SIEGE')) {
      if (killer && killer.kda) {
        killer.kda.minionKills++;
        killer.gold += target.goldValue;
        this.addXpToHero(killer, target.xpValue);
        this.spawnFloatingText(killer.pos, `+${target.goldValue}g`, '#fbbf24');
      }
      return;
    }

    // 2. Turret death
    if (target.tier) {
      target.destroyed = true;
      sound.playExplosion();
      this.triggerScreenShake(14);
      const killerTeam = target.team === 'BLUE' ? 'RED' : 'BLUE';

      // Team gold reward
      this.heroes.filter(h => h.team === killerTeam).forEach(h => {
        h.gold += 250;
        this.addXpToHero(h, 200);
      });

      if (killer && killer.kda) {
        killer.kda.turretsDestroyed++;
      }

      this.triggerAnnouncement({
        type: 'TURRET_DESTROYED',
        title: 'TRỤ THÁP ĐÃ BỊ CÔNG PHÁ!',
        subtitle: `Phe ${killerTeam === 'BLUE' ? 'Xanh (Cation)' : 'Đỏ (Anion)'} đã phá hủy một công trình phòng thủ! (+250g toàn đội)`,
        killerName: killerTeam === 'BLUE' ? 'Phe Xanh' : 'Phe Đỏ',
        killerTeam
      });

      this.spawnFloatingText(target.pos, 'TRỤ THÁP ĐÃ BỊ PHÁ HỦY!', '#f59e0b', true);
      return;
    }

    // 3. Hero death
    if (target.definition) {
      const hero = target as HeroRuntimeEntity;
      hero.isDead = true;
      hero.kda.deaths++;
      hero.respawnTimer = MAP_CONFIG.RESPAWN_BASE_SEC + hero.level * 2;
      hero.respawnTimeTotal = hero.respawnTimer;
      hero.targetMovePos = null;

      sound.playErrorFizzle();
      this.totalHeroKills++;

      const killerHero = killer && killer.definition ? (killer as HeroRuntimeEntity) : null;

      if (killerHero) {
        killerHero.kda.kills++;
        killerHero.gold += 300;
        this.addXpToHero(killerHero, 300);
        this.spawnFloatingText(killerHero.pos, '+300 Vàng (Hạ Gục!)', '#fbbf24', true);
        sound.playVictory();

        // Streak & multi-kill tracking
        killerHero.killStreak = (killerHero.killStreak || 0) + 1;
        const now = this.matchTimeSeconds;
        const lastKill = killerHero.lastKillTimestamp || 0;
        if (now - lastKill <= 10.0) {
          killerHero.recentKills = (killerHero.recentKills || 1) + 1;
        } else {
          killerHero.recentKills = 1;
        }
        killerHero.lastKillTimestamp = now;

        const killerName = killerHero.definition.name_vi.split('—')[0].trim();
        const victimName = hero.definition.name_vi.split('—')[0].trim();

        // 1. First Blood
        if (this.totalHeroKills === 1) {
          killerHero.gold += 100; // First Blood bonus!
          this.triggerAnnouncement({
            type: 'FIRST_BLOOD',
            title: 'CHIẾN CÔNG ĐẦU! (FIRST BLOOD)',
            subtitle: `${killerName} đã hạ gục ${victimName} mở màn chiến trường! (+100g)`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        }
        // 2. Multi-kill checks
        else if (killerHero.recentKills === 2) {
          this.triggerAnnouncement({
            type: 'DOUBLE_KILL',
            title: 'HẠ GỤC KÉP! (DOUBLE KILL)',
            subtitle: `${killerName} liên tiếp tiêu diệt kẻ địch!`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        } else if (killerHero.recentKills === 3) {
          this.triggerAnnouncement({
            type: 'TRIPLE_KILL',
            title: 'TAM SÁT! (TRIPLE KILL)',
            subtitle: `${killerName} càn quét đối thủ!`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        } else if (killerHero.recentKills === 4) {
          this.triggerAnnouncement({
            type: 'QUADRA_KILL',
            title: 'TỨ SÁT! (QUADRA KILL)',
            subtitle: `${killerName} áp đảo toàn diện!`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        } else if (killerHero.recentKills >= 5) {
          this.triggerAnnouncement({
            type: 'PENTA_KILL',
            title: 'NGŨ SÁT THẦN THÁNH! (PENTA KILL)',
            subtitle: `${killerName} quét sạch toàn bộ đội hình đối phương!`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        }
        // 3. Shut down if target had streak >= 3
        else if (hero.killStreak && hero.killStreak >= 3) {
          const shutdownBounty = 150;
          killerHero.gold += shutdownBounty;
          this.triggerAnnouncement({
            type: 'SHUTDOWN',
            title: 'CHẤM DỨT! (SHUT DOWN)',
            subtitle: `${killerName} đã chấm dứt chuỗi hạ gục của ${victimName}! (+${shutdownBounty}g)`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        }
        // 4. Streaks
        else if (killerHero.killStreak === 3) {
          this.triggerAnnouncement({
            type: 'KILLING_SPREE',
            title: 'ĐANG TUNG HOÀNH! (KILLING SPREE)',
            subtitle: `${killerName} đã hạ gục liên tiếp 3 tướng địch!`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        } else if (killerHero.killStreak === 4) {
          this.triggerAnnouncement({
            type: 'RAMPAGE',
            title: 'KHÔNG THỂ CẢN PHÁ! (RAMPAGE)',
            subtitle: `${killerName} đang áp đảo tuyệt đối!`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        } else if (killerHero.killStreak >= 5) {
          this.triggerAnnouncement({
            type: 'UNSTOPPABLE',
            title: 'HUYỀN THOẠI GIÁNG TRẦN! (UNSTOPPABLE)',
            subtitle: `${killerName} không ai có thể ngăn cản!`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        } else {
          this.triggerAnnouncement({
            type: 'HERO_KILL',
            title: `${killerName} ĐÃ HẠ GỤC ${victimName}!`,
            subtitle: `Đòn kết liễu hóa học chuẩn xác`,
            killerName,
            killerTeam: killerHero.team,
            victimName,
            victimTeam: hero.team
          });
        }

        // Award assists to nearby teammates of the killer within assist range (800 units)
        const ASSIST_RANGE = 800;
        const assistAllies = this.heroes.filter(h =>
          h.team === killerHero.team &&
          h.id !== killerHero.id &&
          !h.isDead &&
          Math.hypot(h.pos.x - hero.pos.x, h.pos.y - hero.pos.y) <= ASSIST_RANGE
        );

        const assistGold = assistAllies.length > 0 ? Math.floor(150 / assistAllies.length) : 0;
        assistAllies.forEach(ally => {
          ally.kda.assists++;
          ally.gold += assistGold;
          this.addXpToHero(ally, 100);
          this.spawnFloatingText(ally.pos, `+${assistGold}g (Hỗ Trợ)`, '#38bdf8');
        });
      } else {
        // Killed by turret/minion
        this.triggerAnnouncement({
          type: 'HERO_KILL',
          title: `${hero.definition.name_vi.split('—')[0].trim()} ĐÃ BỊ HẠ GỤC!`,
          subtitle: `Bị tiêu diệt bởi công trình phòng thủ / lính`,
          killerName: 'Chiến trường Rift',
          killerTeam: hero.team === 'BLUE' ? 'RED' : 'BLUE',
          victimName: hero.definition.name_vi.split('—')[0].trim(),
          victimTeam: hero.team
        });
      }

      // Check for ACE: Did this kill wipe out the entire enemy team?
      const enemyTeamRemainingAlive = this.heroes.filter(h => h.team === hero.team && !h.isDead).length;
      if (enemyTeamRemainingAlive === 0) {
        this.triggerAnnouncement({
          type: 'ACE',
          title: 'QUÉT SẠCH! (ACE)',
          subtitle: `Toàn bộ đội hình phe ${hero.team === 'BLUE' ? 'Xanh (Cation)' : 'Đỏ (Anion)'} đã bị quét sạch!`,
          killerName: killer && killer.definition ? killer.definition.name_vi.split('—')[0].trim() : 'Đội',
          killerTeam: killer && killer.team ? killer.team : (hero.team === 'BLUE' ? 'RED' : 'BLUE'),
          victimTeam: hero.team
        });
      }

      hero.killStreak = 0;
      this.spawnFloatingText(hero.pos, `${hero.definition.name_vi} ĐÃ BỊ HẠ GỤC!`, '#ef4444', true);
      return;
    }

    // 4. Neutral Monster death
    if (target.buffType) {
      target.isAlive = false;
      target.targetEntityId = null;
      target.respawnTimer = target.type === 'CATALYST_GUARDIAN' ? 240 : 120;

      if (killer && killer.team) {
        if (target.type === 'CATALYST_GUARDIAN') {
          // Team-wide Catalyst Buff
          this.heroes.filter(h => h.team === killer.team).forEach(h => {
            h.statusEffects.push({
              id: `buff_${target.buffType}_${Date.now()}`,
              type: 'CATALYST_BUFF',
              name_vi: 'Xúc Tác Phản Ứng Bạch Kim Pt',
              durationSeconds: 90,
              remainingSeconds: 90,
              potency: 0.30
            });
            h.gold += target.goldValue;
            this.addXpToHero(h, target.xpValue);
          });
          sound.playNeutralMonsterRoar();
          sound.playVictory();
          this.triggerScreenShake(12);

          this.triggerAnnouncement({
            type: 'MONSTER_SLAIN',
            title: 'CHIẾM ĐƯỢC GIÁM HỘ XÚC TÁC BẠCH KIM Pt!',
            subtitle: `Phe ${killer.team === 'BLUE' ? 'Xanh' : 'Đỏ'} nhận được bùa lợi tăng 30% tốc độ & sức mạnh phản ứng toàn đội!`,
            killerName: killer.definition ? killer.definition.name_vi.split('—')[0].trim() : (killer.team === 'BLUE' ? 'Phe Xanh' : 'Phe Đỏ'),
            killerTeam: killer.team
          });

          this.spawnFloatingText(killer.pos, 'CHIẾM ĐƯỢC GIÁM HỘ XÚC TÁC BẠCH KIM!', '#10b981', true);
        } else if (target.type === 'ACID_LIZARD') {
          sound.playNeutralMonsterRoar();
          // Acid Aura buff to killer
          killer.statusEffects.push({
            id: `buff_acid_${Date.now()}`,
            type: 'ACID_AURA',
            name_vi: 'Hào Quang Axit Clo Cl⁻',
            durationSeconds: 75,
            remainingSeconds: 75,
            potency: 20
          });
          killer.gold += target.goldValue;
          this.addXpToHero(killer, target.xpValue);

          this.triggerAnnouncement({
            type: 'MONSTER_SLAIN',
            title: 'HẠ GỤC THẰN LẰN AXIT Cl⁻!',
            subtitle: `${killer.definition ? killer.definition.name_vi.split('—')[0].trim() : 'Tướng'} nhận hào quang axit ăn mòn diện rộng!`,
            killerName: killer.definition ? killer.definition.name_vi.split('—')[0].trim() : 'Tướng',
            killerTeam: killer.team
          });
          this.spawnFloatingText(killer.pos, '+ HÀO QUANG AXIT CLO!', '#84cc16', true);
        } else if (target.type === 'CRYSTAL_GOLEM') {
          // Crystal Armor buff to killer
          killer.statusEffects.push({
            id: `buff_crystal_${Date.now()}`,
            type: 'CRYSTAL_ARMOR',
            name_vi: 'Giáp Tinh Thể BaSO₄',
            durationSeconds: 75,
            remainingSeconds: 75,
            potency: 250
          });
          killer.gold += target.goldValue;
          this.addXpToHero(killer, target.xpValue);

          this.triggerAnnouncement({
            type: 'MONSTER_SLAIN',
            title: 'HẠ GỤC KHỔNG LỒ TINH THỂ BaSO₄!',
            subtitle: `${killer.definition ? killer.definition.name_vi.split('—')[0].trim() : 'Tướng'} nhận lớp giáp tinh thể siêu kiên cố!`,
            killerName: killer.definition ? killer.definition.name_vi.split('—')[0].trim() : 'Tướng',
            killerTeam: killer.team
          });
          this.spawnFloatingText(killer.pos, '+ GIÁP TINH THỂ BaSO₄!', '#38bdf8', true);
        }
      }
    }
  }

  addXpToHero(hero: HeroRuntimeEntity, xpAmount: number) {
    hero.xp += xpAmount;
    const xpNeeded = hero.level * 180;
    if (hero.xp >= xpNeeded && hero.level < 18) {
      hero.xp -= xpNeeded;
      hero.level++;
      hero.maxHp += hero.definition.growthStats.hpPerLevel;
      hero.hp = hero.maxHp;
      hero.maxMana += hero.definition.growthStats.manaPerLevel;
      hero.mana = hero.maxMana;
      hero.attackDamage += hero.definition.growthStats.adPerLevel;
      hero.armor += hero.definition.growthStats.armorPerLevel;

      if (hero.isPlayer) {
        sound.playLevelUp();
        this.spawnFloatingText(hero.pos, `LÊN CẤP ${hero.level}!`, '#f59e0b', true);
      }
    }
  }

  // Shop item purchase
  buyItem(hero: HeroRuntimeEntity, itemId: string): boolean {
    const item = CHEMICAL_ITEMS_CATALOG.find(i => i.id === itemId);
    if (!item || hero.gold < item.cost || hero.items.length >= 6) {
      sound.playErrorFizzle();
      return false;
    }

    hero.gold -= item.cost;
    hero.items.push(item);

    // Apply item stats
    if (item.stats.hp) { hero.maxHp += item.stats.hp; hero.hp += item.stats.hp; }
    if (item.stats.mana) { hero.maxMana += item.stats.mana; hero.mana += item.stats.mana; }
    if (item.stats.ad) hero.attackDamage += item.stats.ad;
    if (item.stats.ap) hero.abilityPower += item.stats.ap;
    if (item.stats.armor) hero.armor += item.stats.armor;
    if (item.stats.magicResist) hero.magicResist += item.stats.magicResist;
    if (item.stats.movementSpeed) hero.movementSpeed += item.stats.movementSpeed;

    sound.playCardSelect();
    this.spawnFloatingText(hero.pos, `Đã mua: ${item.name_vi}`, '#10b981');
    return true;
  }

  checkWinLoss() {
    if (this.cores.RED.hp <= 0 || this.cores.RED.destroyed) {
      this.status = 'VICTORY';
      sound.playVictory();
    } else if (this.cores.BLUE.hp <= 0 || this.cores.BLUE.destroyed) {
      this.status = 'DEFEAT';
      sound.playErrorFizzle();
    }
  }

  spawnFloatingText(
    pos: Vector2D,
    text: string,
    color: string = '#ffffff',
    isCritical: boolean = false,
    isReaction: boolean = false
  ) {
    this.floatingTexts.push({
      id: `ftext_${Date.now()}_${Math.random()}`,
      pos: { x: pos.x + (Math.random() - 0.5) * 30, y: pos.y - 15 },
      text,
      color,
      isCritical,
      isReaction,
      lifeTimeSeconds: 0,
      maxLifeTimeSeconds: isReaction ? 3.0 : 1.5,
      velocityY: -35
    });
  }

  isPositionInRiver(pos: Vector2D): boolean {
    // Diagonal river zone passing across center (1200, 1200)
    // Line: x + y ≈ 2400 with thickness MAP_CONFIG.RIVER_WIDTH
    const distFromRiverCenter = Math.abs((pos.x + pos.y) - 2400) / Math.SQRT2;
    return distFromRiverCenter < MAP_CONFIG.RIVER_WIDTH / 2;
  }

  resolveCircleAabbCollision(pos: Vector2D, radius: number): Vector2D {
    let resolvedX = pos.x;
    let resolvedY = pos.y;

    for (const obs of MAP_OBSTACLES) {
      // Find closest point on AABB to circle center
      const closestX = Math.max(obs.x, Math.min(obs.x + obs.width, resolvedX));
      const closestY = Math.max(obs.y, Math.min(obs.y + obs.height, resolvedY));

      const dx = resolvedX - closestX;
      const dy = resolvedY - closestY;
      const distSq = dx * dx + dy * dy;

      if (distSq < radius * radius) {
        if (distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const overlap = radius - dist;
          resolvedX += (dx / dist) * overlap;
          resolvedY += (dy / dist) * overlap;
        } else {
          // Circle center is inside the AABB obstacle - push out to closest edge
          const distLeft = resolvedX - obs.x;
          const distRight = (obs.x + obs.width) - resolvedX;
          const distTop = resolvedY - obs.y;
          const distBottom = (obs.y + obs.height) - resolvedY;
          const minDist = Math.min(distLeft, distRight, distTop, distBottom);

          if (minDist === distLeft) {
            resolvedX = obs.x - radius;
          } else if (minDist === distRight) {
            resolvedX = obs.x + obs.width + radius;
          } else if (minDist === distTop) {
            resolvedY = obs.y - radius;
          } else {
            resolvedY = obs.y + obs.height + radius;
          }
        }
      }
    }

    // Clamp to map boundary
    resolvedX = Math.max(radius + 20, Math.min(MAP_CONFIG.WIDTH - radius - 20, resolvedX));
    resolvedY = Math.max(radius + 20, Math.min(MAP_CONFIG.HEIGHT - radius - 20, resolvedY));

    return { x: resolvedX, y: resolvedY };
  }

  getBrushAt(pos: Vector2D): MapBrush | null {
    for (const brush of MAP_BRUSHES) {
      if (
        pos.x >= brush.x &&
        pos.x <= brush.x + brush.width &&
        pos.y >= brush.y &&
        pos.y <= brush.y + brush.height
      ) {
        return brush;
      }
    }
    return null;
  }

  isEntityVisibleToTeam(pos: Vector2D, targetTeam: TeamSide, observerTeam: TeamSide): boolean {
    if (targetTeam === observerTeam) return true;

    const brush = this.getBrushAt(pos);

    if (brush) {
      // 0. If brush is currently on fire, combustion reveals all units inside!
      if (this.burningBushes.has(brush.id)) {
        return true;
      }

      // 1. Observer Hero inside the exact same brush
      const heroInBrush = this.heroes.some(
        h => h.team === observerTeam && !h.isDead && this.getBrushAt(h.pos)?.id === brush.id
      );
      if (heroInBrush) return true;

      // 2. Observer Minion inside the exact same brush
      const minionInBrush = this.minions.some(
        m => m.team === observerTeam && this.getBrushAt(m.pos)?.id === brush.id
      );
      if (minionInBrush) return true;

      // 3. Turret True Sight (immediate defense range <= 350 reveals brush)
      const turretTrueSight = this.turrets.some(
        t => t.team === observerTeam && !t.destroyed && Math.hypot(t.pos.x - pos.x, t.pos.y - pos.y) <= 350
      );
      if (turretTrueSight) return true;

      // 4. Melee proximity reveal (<= 110 units)
      const meleeProximity = this.heroes.some(
        h => h.team === observerTeam && !h.isDead && Math.hypot(h.pos.x - pos.x, h.pos.y - pos.y) <= 110
      );
      if (meleeProximity) return true;

      // Otherwise concealed by brush
      return false;
    }

    // Outside brush: check vision radius from any observer entity
    // Observer Heroes
    for (const h of this.heroes) {
      if (h.team === observerTeam && !h.isDead) {
        const visionRange = h.definition.id === 'hero_h_scout' ? 820 : 650;
        if (Math.hypot(h.pos.x - pos.x, h.pos.y - pos.y) <= visionRange) {
          return true;
        }
      }
    }

    // Observer Turrets
    for (const t of this.turrets) {
      if (t.team === observerTeam && !t.destroyed) {
        if (Math.hypot(t.pos.x - pos.x, t.pos.y - pos.y) <= 750) {
          return true;
        }
      }
    }

    // Observer Minions
    for (const m of this.minions) {
      if (m.team === observerTeam) {
        if (Math.hypot(m.pos.x - pos.x, m.pos.y - pos.y) <= 420) {
          return true;
        }
      }
    }

    // Observer Core
    const core = this.cores[observerTeam];
    if (core && !core.destroyed) {
      if (Math.hypot(core.pos.x - pos.x, core.pos.y - pos.y) <= 850) {
        return true;
      }
    }

    return false;
  }

  findEntityById(id: string): any {
    const hero = this.heroes.find(h => h.id === id);
    if (hero) return hero;
    const minion = this.minions.find(m => m.id === id);
    if (minion) return minion;
    const turret = this.turrets.find(t => t.id === id);
    if (turret) return turret;
    const core = Object.values(this.cores).find(c => c.id === id);
    if (core) return core;
    const monster = this.monsters.find(m => m.id === id);
    if (monster) return monster;
    return null;
  }

  triggerScreenShake(amount: number) {
    this.screenShakeTrauma = Math.min(25, this.screenShakeTrauma + amount);
  }

  consumeScreenShake(): number {
    const val = this.screenShakeTrauma;
    this.screenShakeTrauma = 0;
    return val;
  }

  generateMatchDebrief(): MobaMatchDebrief {
    const playerKda = this.playerHero.kda;
    const blueKills = this.heroes.filter(h => h.team === 'BLUE').reduce((acc, h) => acc + h.kda.kills, 0);
    const redKills = this.heroes.filter(h => h.team === 'RED').reduce((acc, h) => acc + h.kda.kills, 0);
    const blueTurrets = this.turrets.filter(t => t.team === 'RED' && t.destroyed).length;
    const redTurrets = this.turrets.filter(t => t.team === 'BLUE' && t.destroyed).length;

    return {
      matchDurationSeconds: Math.round(this.matchTimeSeconds),
      outcome: this.status === 'VICTORY' ? 'VICTORY' : 'DEFEAT',
      playerHeroId: this.playerHero.definition.id,
      kda: {
        kills: playerKda.kills,
        deaths: playerKda.deaths,
        assists: playerKda.assists,
        cs: playerKda.minionKills,
        gold: this.playerHero.gold,
        damageDealt: playerKda.damageDealt,
        turretsDestroyed: playerKda.turretsDestroyed
      },
      teamScore: {
        blueKills,
        redKills,
        blueTurrets,
        redTurrets
      },
      reactionsTriggered: this.reactionsTriggered,
      chemicalTrapsEncountered: this.chemicalTrapsEncountered,
      xpEarned: this.status === 'VICTORY' ? 350 : 150,
      knowledgeTokensEarned: this.reactionsTriggered.length * 15 + (this.status === 'VICTORY' ? 50 : 20)
    };
  }
}
