// src/game/ai/mobaBotAi.ts
// Utility & State Machine AI for ELEMENTA MOBA Bots
// Controls Lane Navigation, Minion Farming, Skillshot Aiming, Turret Aggro Awareness, and Teamfighting

import { HeroRuntimeEntity, Vector2D, TurretEntity, MinionEntity, ProjectileEntity, TeamSide, NeutralMonsterEntity, ElementalCoreEntity } from '../types';
import { LANE_WAYPOINTS, MAP_CONFIG } from '../maps/periodicRiftMap';

export type BotDifficulty = 'NOVICE' | 'STANDARD' | 'ADVANCED' | 'CHALLENGER';

export class MobaBotAi {
  static updateBot(
    bot: HeroRuntimeEntity,
    allHeroes: HeroRuntimeEntity[],
    allTurrets: TurretEntity[],
    allMinions: MinionEntity[],
    dt: number,
    difficulty: BotDifficulty = 'STANDARD',
    onCastSkill: (bot: HeroRuntimeEntity, slot: 'Q' | 'W' | 'E' | 'R', targetPos: Vector2D) => void,
    visibilityChecker?: (pos: Vector2D, targetTeam: TeamSide) => boolean,
    allMonsters: NeutralMonsterEntity[] = [],
    cores?: Record<TeamSide, ElementalCoreEntity>
  ) {
    if (bot.isDead) return;

    const botPos = bot.pos;
    const enemyTeam = bot.team === 'BLUE' ? 'RED' : 'BLUE';

    // 1. Check for immediate turret danger
    const enemyTurrets = allTurrets.filter(t => t.team === enemyTeam && !t.destroyed);
    const nearestEnemyTurret = enemyTurrets.reduce<TurretEntity | null>((closest, t) => {
      const d = Math.hypot(t.pos.x - botPos.x, t.pos.y - botPos.y);
      if (!closest) return d < MAP_CONFIG.TURRET_RANGE + 80 ? t : null;
      const cd = Math.hypot(closest.pos.x - botPos.x, closest.pos.y - botPos.y);
      return d < cd ? t : closest;
    }, null);

    // Friendly minions tanking the turret?
    const friendlyMinionsNearTurret = nearestEnemyTurret
      ? allMinions.filter(m => m.team === bot.team && Math.hypot(m.pos.x - nearestEnemyTurret.pos.x, m.pos.y - nearestEnemyTurret.pos.y) < MAP_CONFIG.TURRET_RANGE)
      : [];

    const isTurretDangerous = nearestEnemyTurret && friendlyMinionsNearTurret.length === 0;

    // 2. Health check: Retreat if low HP
    const hpRatio = bot.hp / bot.maxHp;
    const isCriticalHp = hpRatio < 0.28;

    const friendlyTurrets = allTurrets.filter(t => t.team === bot.team && !t.destroyed);
    const nearestSafeTurret = friendlyTurrets.reduce<TurretEntity | null>((closest, t) => {
      const d = Math.hypot(t.pos.x - botPos.x, t.pos.y - botPos.y);
      if (!closest) return t;
      const cd = Math.hypot(closest.pos.x - botPos.x, closest.pos.y - botPos.y);
      return d < cd ? t : closest;
    }, null);

    const basePos: Vector2D = bot.team === 'BLUE' ? { x: 260, y: 2140 } : { x: 2140, y: 260 };

    if (isCriticalHp || (isTurretDangerous && Math.hypot(nearestEnemyTurret!.pos.x - botPos.x, nearestEnemyTurret!.pos.y - botPos.y) < MAP_CONFIG.TURRET_RANGE)) {
      // Flee to safety
      const retreatTarget = nearestSafeTurret ? nearestSafeTurret.pos : basePos;
      bot.targetMovePos = { ...retreatTarget };

      // Cast defensive spell (Shield/Dash/Stun) if available
      if (bot.skills.e.currentCooldown <= 0) {
        onCastSkill(bot, 'E', retreatTarget);
      } else if (bot.skills.w.currentCooldown <= 0) {
        onCastSkill(bot, 'W', botPos);
      }
      return;
    }

    // 3. Scan for nearby enemy heroes (respecting vision & brush concealment)
    const enemyHeroes = allHeroes.filter(h => {
      if (h.team !== enemyTeam || h.isDead) return false;
      if (visibilityChecker && !visibilityChecker(h.pos, h.team)) return false;
      return true;
    });
    let targetEnemyHero: HeroRuntimeEntity | null = null;
    let closestHeroDist = 9999;

    // Tactical Target Selection with Chemical Synergy & Role Prioritization:
    if (enemyHeroes.length > 0) {
      if (bot.definition.role === 'ASSASSIN' && difficulty !== 'NOVICE') {
        const squishies = enemyHeroes.filter(h => h.definition.role === 'MARKSMAN' || h.definition.role === 'MAGE');
        const candidates = squishies.length > 0 ? squishies : enemyHeroes;
        targetEnemyHero = candidates.reduce((prev, curr) => (curr.hp < prev.hp ? curr : prev), candidates[0]);
        closestHeroDist = Math.hypot(targetEnemyHero.pos.x - botPos.x, targetEnemyHero.pos.y - botPos.y);
        if (closestHeroDist > 900) {
          targetEnemyHero = null;
          closestHeroDist = 9999;
        }
      } else if (difficulty === 'ADVANCED' || difficulty === 'CHALLENGER') {
        // Advanced Team Synergy: Score enemies by distance, low HP, and active Chemical Debuffs
        let bestScore = 99999;
        for (const enemy of enemyHeroes) {
          const dist = Math.hypot(enemy.pos.x - botPos.x, enemy.pos.y - botPos.y);
          if (dist > 900) continue;

          let score = dist;
          // Priority to squishy targets
          if (enemy.definition.role === 'MARKSMAN' || enemy.definition.role === 'MAGE') {
            score -= 200;
          }
          // Priority to low HP enemies (kill execute)
          const enemyHpRatio = enemy.hp / enemy.maxHp;
          score -= (1 - enemyHpRatio) * 250;

          // Priority to chemically afflicted enemies (Oxidation, Acid Corrosion, Stun) for multi-hero chemical combos
          const hasOxidationOrAcid = enemy.statusEffects && enemy.statusEffects.some(
            eff => eff.type === 'BURN_OXIDATION' || eff.type === 'ACID_CORROSION' || eff.type === 'ALKALI_WEAKEN'
          );
          if (hasOxidationOrAcid) {
            score -= 180; // Elemental combo synergy!
          }

          const isStunnedOrSlowed = enemy.statusEffects && enemy.statusEffects.some(eff => eff.type === 'STUN' || eff.type === 'SLOW');
          if (isStunnedOrSlowed) {
            score -= 120; // Easy CC follow-up!
          }

          // Ally focus fire coordination: bonus if an ally is already attacking this target
          const allyFocusing = allHeroes.some(h => h.team === bot.team && !h.isDead && h.id !== bot.id && h.targetEntityId === enemy.id);
          if (allyFocusing) {
            score -= 150;
          }

          if (score < bestScore) {
            bestScore = score;
            targetEnemyHero = enemy;
            closestHeroDist = dist;
          }
        }
      }

      // Fallback for STANDARD / NOVICE or when no candidate met criteria
      if (!targetEnemyHero) {
        for (const enemy of enemyHeroes) {
          const dist = Math.hypot(enemy.pos.x - botPos.x, enemy.pos.y - botPos.y);
          if (dist < 800 && dist < closestHeroDist) {
            closestHeroDist = dist;
            targetEnemyHero = enemy;
          }
        }
      }
    }

    // 4. Combat behavior against enemy heroes
    if (targetEnemyHero) {
      const enemyDist = closestHeroDist;
      const enemyPos = targetEnemyHero.pos;

      // Predict target location based on difficulty
      let aimPos = { ...enemyPos };
      const isTargetImmobilized = targetEnemyHero.statusEffects && targetEnemyHero.statusEffects.some(eff => eff.type === 'STUN');
      if (!isTargetImmobilized && difficulty !== 'NOVICE' && targetEnemyHero.targetMovePos) {
        const leadFactor = difficulty === 'CHALLENGER' ? 0.38 : difficulty === 'ADVANCED' ? 0.28 : 0.18;
        aimPos = {
          x: enemyPos.x + (targetEnemyHero.targetMovePos.x - enemyPos.x) * leadFactor,
          y: enemyPos.y + (targetEnemyHero.targetMovePos.y - enemyPos.y) * leadFactor
        };
      }

      // Champion-Specific Tactical Combo Execution
      const heroId = bot.definition.id;
      if (heroId === 'hero_s_assassin') {
        // S8 Assassin: E dash in -> Q poison burst -> R finisher -> W defensive
        if (bot.skills.e.currentCooldown <= 0 && enemyDist <= bot.skills.e.range) {
          onCastSkill(bot, 'E', aimPos);
        } else if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        } else if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (bot.skills.w.currentCooldown <= 0 && enemyDist <= 250) {
          onCastSkill(bot, 'W', botPos);
        }
      } else if (heroId === 'hero_c_mage') {
        // Carbon Mage: Q root -> E pyrolysis blast -> R allotropic wave -> W shield
        if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        } else if (bot.skills.e.currentCooldown <= 0 && enemyDist <= bot.skills.e.range) {
          onCastSkill(bot, 'E', aimPos);
        } else if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (bot.skills.w.currentCooldown <= 0 && (enemyDist < 350 || bot.hp < bot.maxHp * 0.7)) {
          onCastSkill(bot, 'W', botPos);
        }
      } else if (heroId === 'hero_ca_tank') {
        // Calcium Tank: E charge in -> Q slaking stun -> R stalactite cage -> W fortification
        if (bot.skills.e.currentCooldown <= 0 && enemyDist <= bot.skills.e.range) {
          onCastSkill(bot, 'E', aimPos);
        } else if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        } else if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (bot.skills.w.currentCooldown <= 0 && enemyDist <= 300) {
          onCastSkill(bot, 'W', botPos);
        }
      } else if (heroId === 'hero_n_marksman') {
        // Nitrogen Marksman: Q cryo slow -> R artillery strike -> E tactical reposition
        if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        } else if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (enemyDist < 250 && bot.skills.e.currentCooldown <= 0) {
          // Dash away from melee threat
          const awayAngle = Math.atan2(botPos.y - enemyPos.y, botPos.x - enemyPos.x);
          onCastSkill(bot, 'E', { x: botPos.x + Math.cos(awayAngle) * 300, y: botPos.y + Math.sin(awayAngle) * 300 });
        } else if (bot.skills.w.currentCooldown <= 0 && enemyDist <= (bot.skills.w.range || 350)) {
          onCastSkill(bot, 'W', aimPos);
        }
      } else if (heroId === 'hero_cl_toxic') {
        // Chlorine Assassin/Mage: Dash away if enemy in face -> R execute -> W acid jet -> Q toxic cloud
        if (enemyDist < 260 && bot.skills.e.currentCooldown <= 0) {
          const awayAngle = Math.atan2(botPos.y - enemyPos.y, botPos.x - enemyPos.x);
          onCastSkill(bot, 'E', { x: botPos.x + Math.cos(awayAngle) * 350, y: botPos.y + Math.sin(awayAngle) * 350 });
        } else if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (bot.skills.w.currentCooldown <= 0 && enemyDist <= bot.skills.w.range) {
          onCastSkill(bot, 'W', aimPos);
        } else if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        }
      } else if (heroId === 'hero_o_arsonist') {
        // Oxygen Pyromancer: E push away if close -> R firestorm -> W ozone zone -> Q fireball
        if (enemyDist < 300 && bot.skills.e.currentCooldown <= 0) {
          onCastSkill(bot, 'E', aimPos);
        } else if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (bot.skills.w.currentCooldown <= 0 && enemyDist <= (bot.skills.w.range || 750)) {
          onCastSkill(bot, 'W', aimPos);
        } else if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        }
      } else if (heroId === 'hero_cu_striker') {
        // Copper Marksman: Dash away with E if enemy too close -> R thunder -> W root trap -> Q sniper shot
        if (enemyDist < 260 && bot.skills.e.currentCooldown <= 0) {
          const awayAngle = Math.atan2(botPos.y - enemyPos.y, botPos.x - enemyPos.x);
          onCastSkill(bot, 'E', { x: botPos.x + Math.cos(awayAngle) * 350, y: botPos.y + Math.sin(awayAngle) * 350 });
        } else if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (bot.skills.w.currentCooldown <= 0 && enemyDist <= bot.skills.w.range) {
          onCastSkill(bot, 'W', aimPos);
        } else if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        }
      } else if (heroId === 'hero_h_scout') {
        // Hydrogen Scout: Dash away with E if enemy too close -> W heal if hurt -> R explosive water -> Q bolt spam
        if (enemyDist < 260 && bot.skills.e.currentCooldown <= 0) {
          const awayAngle = Math.atan2(botPos.y - enemyPos.y, botPos.x - enemyPos.x);
          onCastSkill(bot, 'E', { x: botPos.x + Math.cos(awayAngle) * 350, y: botPos.y + Math.sin(awayAngle) * 350 });
        } else if (bot.hp < bot.maxHp * 0.85 && bot.skills.w.currentCooldown <= 0) {
          onCastSkill(bot, 'W', botPos);
        } else if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        }
      } else {
        // Universal combo logic: R -> Q -> W -> E
        if (bot.skills.r.currentCooldown <= 0 && enemyDist <= bot.skills.r.range) {
          onCastSkill(bot, 'R', aimPos);
        } else if (bot.skills.q.currentCooldown <= 0 && enemyDist <= bot.skills.q.range) {
          onCastSkill(bot, 'Q', aimPos);
        } else if (bot.skills.w.currentCooldown <= 0 && enemyDist <= (bot.skills.w.range || 300)) {
          onCastSkill(bot, 'W', aimPos);
        } else if (bot.skills.e.currentCooldown <= 0 && enemyDist <= bot.skills.e.range) {
          // If E is a DASH and bot is ranged, dash away instead of forward
          if (bot.skills.e.targetType === 'DASH' && (bot.definition.role === 'MAGE' || bot.definition.role === 'MARKSMAN' || bot.definition.role === 'SUPPORT')) {
            if (enemyDist < 300) {
              const awayAngle = Math.atan2(botPos.y - enemyPos.y, botPos.x - enemyPos.x);
              onCastSkill(bot, 'E', { x: botPos.x + Math.cos(awayAngle) * 300, y: botPos.y + Math.sin(awayAngle) * 300 });
            }
          } else {
            onCastSkill(bot, 'E', aimPos);
          }
        }
      }

      // Spacing / Kiting: If Marksman or Mage, keep distance; if Tank or Fighter, close in
      if (bot.definition.role === 'MARKSMAN' || bot.definition.role === 'MAGE') {
        if (enemyDist < bot.attackRange * 0.7) {
          // Kite backwards
          const angle = Math.atan2(botPos.y - enemyPos.y, botPos.x - enemyPos.x);
          bot.targetMovePos = {
            x: botPos.x + Math.cos(angle) * 150,
            y: botPos.y + Math.sin(angle) * 150
          };
        } else {
          bot.targetEntityId = targetEnemyHero.id;
        }
      } else {
        // Melee engages
        bot.targetMovePos = { ...enemyPos };
        bot.targetEntityId = targetEnemyHero.id;
      }
      return;
    }

    // 4.5 Turret Sieging & Core Assault
    // If friendly minions are tanking an enemy turret, siege the turret!
    if (nearestEnemyTurret && !isTurretDangerous && friendlyMinionsNearTurret.length > 0) {
      const turretDist = Math.hypot(nearestEnemyTurret.pos.x - botPos.x, nearestEnemyTurret.pos.y - botPos.y);
      if (turretDist <= bot.attackRange + 150) {
        bot.targetEntityId = nearestEnemyTurret.id;
        if (turretDist > bot.attackRange) {
          bot.targetMovePos = { ...nearestEnemyTurret.pos };
        }
        return;
      }
    }

    // Core assault: If enemy core is exposed and friendly units are near
    if (cores && cores[enemyTeam] && !cores[enemyTeam].destroyed) {
      const enemyCore = cores[enemyTeam];
      const coreDist = Math.hypot(enemyCore.pos.x - botPos.x, enemyCore.pos.y - botPos.y);
      if (coreDist <= 600) {
        bot.targetEntityId = enemyCore.id;
        if (coreDist > bot.attackRange) {
          bot.targetMovePos = { ...enemyCore.pos };
        }
        return;
      }
    }

    // 5. Neutral Objective Contesting & Jungle Farming
    if (difficulty !== 'NOVICE' && allMonsters && allMonsters.length > 0 && bot.hp > bot.maxHp * 0.4) {
      // Check Catalyst Guardian (Boss in River Pit)
      const boss = allMonsters.find(m => m.type === 'CATALYST_GUARDIAN' && m.isAlive);
      if (boss) {
        const bossDist = Math.hypot(boss.pos.x - botPos.x, boss.pos.y - botPos.y);
        const enemyAttackingBoss = allHeroes.some(h => h.team === enemyTeam && !h.isDead && Math.hypot(h.pos.x - boss.pos.x, h.pos.y - boss.pos.y) < 450);
        const allyAttackingBoss = allHeroes.some(h => h.team === bot.team && !h.isDead && Math.hypot(h.pos.x - boss.pos.x, h.pos.y - boss.pos.y) < 450);

        // If enemy is taking the boss and bot is in upper river (< 900 units), contest!
        if (enemyAttackingBoss && bossDist < 900) {
          bot.targetMovePos = { ...boss.pos };
          return;
        }

        // If ally is taking boss, rally to assist!
        if (allyAttackingBoss && bossDist < 800) {
          bot.targetEntityId = boss.id;
          if (bossDist > bot.attackRange) {
            bot.targetMovePos = { ...boss.pos };
          } else {
            if (bot.skills.q.currentCooldown <= 0) onCastSkill(bot, 'Q', boss.pos);
          }
          return;
        }

        // Mid / Jungle roaming on boss
        if ((bot.lane === 'MID' || bot.lane === 'JUNGLE') && bossDist < 550 && bot.hp > bot.maxHp * 0.65) {
          bot.targetEntityId = boss.id;
          if (bossDist > bot.attackRange) {
            bot.targetMovePos = { ...boss.pos };
          } else {
            if (bot.skills.q.currentCooldown <= 0) onCastSkill(bot, 'Q', boss.pos);
          }
          return;
        }
      }

      // Check Buff Camps (Acid Lizard & Crystal Golem)
      const nearbyCamp = allMonsters.find(m => m.isAlive && m.type !== 'CATALYST_GUARDIAN' && Math.hypot(m.pos.x - botPos.x, m.pos.y - botPos.y) < 450);
      if (nearbyCamp && bot.hp > bot.maxHp * 0.45) {
        const campDist = Math.hypot(nearbyCamp.pos.x - botPos.x, nearbyCamp.pos.y - botPos.y);
        bot.targetEntityId = nearbyCamp.id;
        if (campDist > bot.attackRange) {
          bot.targetMovePos = { ...nearbyCamp.pos };
        } else {
          if (bot.skills.q.currentCooldown <= 0) onCastSkill(bot, 'Q', nearbyCamp.pos);
        }
        return;
      }
    }

    // 6. Minion farming / Last hitting
    const enemyMinions = allMinions.filter(m => {
      if (m.team !== enemyTeam) return false;
      if (visibilityChecker && !visibilityChecker(m.pos, m.team)) return false;
      return true;
    });
    let minionToAttack: MinionEntity | null = null;
    let closestMinionDist = 9999;

    for (const minion of enemyMinions) {
      const d = Math.hypot(minion.pos.x - botPos.x, minion.pos.y - botPos.y);
      if (d < 600) {
        // Prioritize low-HP minion for last hit
        if (minion.hp < bot.attackDamage * 1.5) {
          minionToAttack = minion;
          break;
        }
        if (d < closestMinionDist) {
          closestMinionDist = d;
          minionToAttack = minion;
        }
      }
    }

    if (minionToAttack) {
      bot.targetEntityId = minionToAttack.id;
      if (closestMinionDist > bot.attackRange) {
        bot.targetMovePos = { ...minionToAttack.pos };
      }
      return;
    }

    // 7. Push Lane: Advance along lane waypoints or roam to assist
    const waypoints = LANE_WAYPOINTS[bot.team][bot.lane];
    if (waypoints && waypoints.length > 0) {
      // Find current closest waypoint index
      let closestIdx = 0;
      let closestD = 99999;
      for (let i = 0; i < waypoints.length; i++) {
        const d = Math.hypot(waypoints[i].x - botPos.x, waypoints[i].y - botPos.y);
        if (d < closestD) {
          closestD = d;
          closestIdx = i;
        }
      }

      // If at last waypoint and difficulty is ADVANCED or CHALLENGER, rotate towards ally in combat
      if (closestIdx >= waypoints.length - 1 && (difficulty === 'ADVANCED' || difficulty === 'CHALLENGER')) {
        const allyInCombat = allHeroes.find(h => h.team === bot.team && !h.isDead && h.id !== bot.id && h.targetEntityId);
        if (allyInCombat) {
          bot.targetMovePos = { ...allyInCombat.pos };
          return;
        }
      }

      // Target next waypoint ahead in the lane
      const nextIdx = Math.min(closestIdx + 1, waypoints.length - 1);
      bot.targetMovePos = { ...waypoints[nextIdx] };
    }
  }
}

