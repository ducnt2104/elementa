// src/components/moba/MobaArenaTab.tsx
// Real-Time MOBA Battlefield Tab for ELEMENTA
// Integrates 60 FPS Canvas Simulation, HUD, Minimap, In-Game Chemical Shop, and Reaction Engine

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MobaEngine } from '../../game/engine/mobaEngine';
import { MobaRenderer } from '../../game/rendering/mobaRenderer';
import { HeroDefinition, MobaGameMode, ChemicalItem, MobaMatchDebrief, KillAnnouncement } from '../../game/types';
import { BotDifficulty } from '../../game/ai/mobaBotAi';
import { CHEMICAL_ITEMS_CATALOG } from '../../game/data/itemsData';
import { HeroSelectModal } from './HeroSelectModal';
import { sound } from '../../audio/soundEngine';
import { UserSettings, GraphicsQuality } from '../../storage/localStore';
import { ElementalCrest } from '../../assets/svg/ElementalCrests';
import {
  WaterBurstGlyph,
  AlkalineShieldGlyph,
  RustCorrosionGlyph,
  ToxicGasGlyph,
  ThermiteBlastGlyph,
  GalvanicSparkGlyph,
  FlashSpellGlyph,
  HealSpellGlyph,
  RecallSpellGlyph,
  StatusBadge
} from '../../assets/svg/SkillGlyphs';
import { TargetFrame, TargetEntityData } from './TargetFrame';
import { computeJoystickInput, computePinchZoom } from '../../game/controls/virtualJoystick';
import {
  Shield,
  Zap,
  Sword,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Award,
  Layers,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
  Plus,
  Flame,
  Droplets,
  FlaskConical,
  HelpCircle
} from 'lucide-react';

interface MobaArenaTabProps {
  onMatchFinished: (debrief: MobaMatchDebrief) => void;
  openTutorial: () => void;
  settings?: UserSettings;
  onUpdateSettings?: (settings: UserSettings) => void;
  onRestartMatch?: () => void;
  unlockedHeroIds?: string[];
  onOpenShop?: () => void;
}

function resolveTargetData(targetId: string | null | undefined, engine: MobaEngine): TargetEntityData | null {
  if (!targetId) return null;
  const entity = engine.findEntityById(targetId);
  if (!entity) return null;

  if (entity.definition) {
    // Hero
    return {
      id: entity.id,
      name: entity.definition.name_vi,
      title: `${entity.definition.title_vi} (${entity.definition.chemicalClassification})`,
      type: 'HERO',
      team: entity.team,
      hp: entity.hp,
      maxHp: entity.maxHp,
      mana: entity.mana,
      maxMana: entity.maxMana,
      symbol: entity.definition.symbol,
      chemicalFormula: entity.definition.symbol,
      reactionVulnerability: entity.definition.facts?.[0] || 'Phản ứng oxi hóa - khử trao đổi electron',
      attackDamage: entity.attackDamage,
      armor: entity.armor
    };
  }

  if (entity.type === 'MELEE' || entity.type === 'CASTER' || entity.type === 'SIEGE') {
    // Minion
    const names = {
      MELEE: 'Lính Cơ Giới Tiên Phong',
      CASTER: 'Drone Năng Lượng Xúc Tác',
      SIEGE: 'Cỗ Máy Công Thành Hạng Nặng'
    };
    return {
      id: entity.id,
      name: names[entity.type as 'MELEE' | 'CASTER' | 'SIEGE'],
      title: `Lính Làn ${entity.team === 'BLUE' ? 'Đồng Minh' : 'Kẻ Địch'}`,
      type: 'MINION',
      team: entity.team,
      hp: entity.hp,
      maxHp: entity.maxHp,
      attackDamage: entity.attackDamage,
      armor: entity.armor
    };
  }

  if (entity.type === 'ACID_LIZARD' || entity.type === 'CRYSTAL_GOLEM' || entity.type === 'CATALYST_BOSS') {
    // Monster
    const info = {
      ACID_LIZARD: {
        name: 'Thằn Lằn Axít (Acid Lizard)',
        title: 'Quái Rừng Dung Dịch Cl⁻',
        formula: 'HCl (aq) / Cl⁻',
        vuln: 'Bốc cháy khi gặp kim loại kiềm Na: 2Na + 2HCl → 2NaCl + H₂↑'
      },
      CRYSTAL_GOLEM: {
        name: 'Golem Tinh Thể (Crystal Golem)',
        title: 'Thạch Quái Kết Tủa BaSO₄',
        formula: 'BaSO₄ (s) / Lưới Tinh Thể',
        vuln: 'Cấu trúc kết tủa bền vững, kháng acid mạnh'
      },
      CATALYST_BOSS: {
        name: 'Thần Thú Xúc Tác (Catalyst Guardian)',
        title: 'Sinh Vật Giả Kim Bạch Kim (Pt)',
        formula: 'Pt (s) / Trung Tâm Hoạt Hóa',
        vuln: 'Hạ thấp năng lượng hoạt hóa, cung cấp bùa lợi tăng 25% sát thương toàn đội'
      }
    }[entity.type as 'ACID_LIZARD' | 'CRYSTAL_GOLEM' | 'CATALYST_BOSS'];

    return {
      id: entity.id,
      name: info.name,
      title: info.title,
      type: 'MONSTER',
      team: 'NEUTRAL',
      hp: entity.hp,
      maxHp: entity.maxHp,
      chemicalFormula: info.formula,
      reactionVulnerability: info.vuln,
      attackDamage: entity.attackDamage,
      armor: entity.armor
    };
  }

  if (entity.lane !== undefined && entity.tier !== undefined) {
    // Turret
    return {
      id: entity.id,
      name: `Trụ ${entity.lane} (Bậc ${entity.tier})`,
      title: `Công Trình Phòng Ngự ${entity.team === 'BLUE' ? 'Xanh' : 'Đỏ'}`,
      type: 'TURRET',
      team: entity.team,
      hp: entity.hp,
      maxHp: entity.maxHp,
      chemicalFormula: 'Fe₂O₃ / SiO₂ Cực Tinh Khiết',
      reactionVulnerability: 'Nhận thêm sát thương chuẩn từ phản ứng nhiệt nhôm 2Al + Fe₂O₃',
      attackDamage: entity.attackDamage,
      armor: entity.armor
    };
  }

  return null;
}

export const MobaArenaTab: React.FC<MobaArenaTabProps> = ({
  onMatchFinished,
  openTutorial,
  settings,
  onUpdateSettings,
  onRestartMatch,
  unlockedHeroIds,
  onOpenShop
}) => {
  // Engine & Renderer refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const minimapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<MobaEngine | null>(null);
  const rendererRef = useRef<MobaRenderer | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const lastHudSyncRef = useRef<number>(0);
  const matchFinishedRef = useRef<boolean>(false);

  // UI state synchronized with engine
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSandboxCheats, setShowSandboxCheats] = useState(false);
  const [targetData, setTargetData] = useState<TargetEntityData | null>(null);

  // Tactical & Announcer states
  const [isAttackMoveMode, setIsAttackMoveMode] = useState(false);
  const [quickCast, setQuickCast] = useState(false);
  const [isControlsModalOpen, setIsControlsModalOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState<KillAnnouncement | null>(null);

  // Reaction alert popup state
  const [reactionAlert, setReactionAlert] = useState<{
    equation: string;
    name: string;
    phenomena: string;
    note: string;
  } | null>(null);
  const lastReactionAlertTimestampRef = useRef<number>(-1);
  const reactionAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile Touch & Virtual Joystick state
  const [joystickThumbOffset, setJoystickThumbOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isJoystickActive, setIsJoystickActive] = useState<boolean>(false);
  const joystickBaseRef = useRef<HTMLDivElement | null>(null);
  const joystickTouchIdRef = useRef<number | null>(null);
  const touchPinchInitialDistRef = useRef<number | null>(null);
  const touchPinchInitialZoomRef = useRef<number>(1.0);

  // Sync player stats for HUD
  const [hudState, setHudState] = useState({
    matchTime: '00:00',
    blueKills: 0,
    redKills: 0,
    playerKda: { kills: 0, deaths: 0, assists: 0, cs: 0 },
    playerGold: 750,
    playerLevel: 1,
    playerHp: 850,
    playerMaxHp: 850,
    playerMana: 320,
    playerMaxMana: 320,
    playerItems: [] as ChemicalItem[],
    skills: {
      q: { cd: 0, maxCd: 7, mana: 45, name: 'Thủy Kích' },
      w: { cd: 0, maxCd: 10, mana: 55, name: 'Xút NaOH' },
      e: { cd: 0, maxCd: 11, mana: 50, name: 'Đột Kích' },
      r: { cd: 0, maxCd: 65, mana: 100, name: 'Đại Bùng Nổ' }
    },
    spells: {
      d: { cd: 0, maxCd: 120, name: 'Tốc Biến' },
      f: { cd: 0, maxCd: 90, name: 'Hồi Phục' }
    },
    isRecalling: false,
    recallProgress: 0,
    isDead: false,
    respawnTimer: 0
  });

  // Initialize engine with default hero
  useEffect(() => {
    const engine = new MobaEngine('hero_na_brawler', 'SOLO_AI_5V5', 'STANDARD');
    engineRef.current = engine;

    if (canvasRef.current && minimapCanvasRef.current) {
      const renderer = new MobaRenderer(canvasRef.current, minimapCanvasRef.current);
      if (settings) {
        renderer.setQuality(settings.graphicsQuality || 'BALANCED', settings.reducedMotion || false);
      }
      rendererRef.current = renderer;
    }

    const handleResize = () => {
      rendererRef.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // Synchronize graphics settings with renderer
  useEffect(() => {
    if (rendererRef.current && settings) {
      rendererRef.current.setQuality(settings.graphicsQuality || 'BALANCED', settings.reducedMotion || false);
    }
  }, [settings?.graphicsQuality, settings?.reducedMotion]);

  // Main 60 FPS Game Loop
  useEffect(() => {
    const loop = (currentTime: number) => {
      const dt = Math.min(0.1, (currentTime - lastTimeRef.current) / 1000);
      lastTimeRef.current = currentTime;

      const engine = engineRef.current;
      const renderer = rendererRef.current;

      // Viewport Culling: Skip heavy canvas rendering if tab is hidden (e.g. user on Shop / Codex)
      if (canvasRef.current && canvasRef.current.offsetParent === null) {
        animFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      if (engine && renderer && !isPaused) {
        engine.update(dt);
        renderer.render(engine, dt);

        // Sync Reaction Alert
        if (
          engine.latestReactionAlert &&
          engine.latestReactionAlert.timestamp !== lastReactionAlertTimestampRef.current
        ) {
          lastReactionAlertTimestampRef.current = engine.latestReactionAlert.timestamp;
          if (reactionAlertTimeoutRef.current) {
            clearTimeout(reactionAlertTimeoutRef.current);
          }
          setReactionAlert({
            equation: engine.latestReactionAlert.equation,
            name: engine.latestReactionAlert.rule.name_vi,
            phenomena: engine.latestReactionAlert.phenomena,
            note: engine.latestReactionAlert.rule.pedagogicalExplanation
          });

          // Auto clear reaction alert after 4.5s
          reactionAlertTimeoutRef.current = setTimeout(() => {
            setReactionAlert(null);
          }, 4500);
        }

        // Sync Kill Announcement
        if (engine.activeAnnouncement !== activeAnnouncement) {
          setActiveAnnouncement(engine.activeAnnouncement);
        }

        // Check Match End
        if ((engine.status === 'VICTORY' || engine.status === 'DEFEAT') && !matchFinishedRef.current) {
          matchFinishedRef.current = true;
          const debrief = engine.generateMatchDebrief();
          onMatchFinished(debrief);
          return;
        }

        // Sync HUD data periodically (throttled to 10 Hz / 100ms to eliminate 60 FPS React re-render thrashing)
        const now = performance.now();
        if (now - lastHudSyncRef.current >= 100) {
          lastHudSyncRef.current = now;
          const pHero = engine.playerHero;
          if (pHero) {
            const minutes = Math.floor(engine.matchTimeSeconds / 60).toString().padStart(2, '0');
            const seconds = Math.floor(engine.matchTimeSeconds % 60).toString().padStart(2, '0');
            const blueK = engine.heroes.filter(h => h.team === 'BLUE').reduce((acc, h) => acc + h.kda.kills, 0);
            const redK = engine.heroes.filter(h => h.team === 'RED').reduce((acc, h) => acc + h.kda.kills, 0);

            setHudState({
              matchTime: `${minutes}:${seconds}`,
              blueKills: blueK,
              redKills: redK,
              playerKda: { ...pHero.kda, cs: pHero.kda.minionKills },
              playerGold: pHero.gold,
              playerLevel: pHero.level,
              playerHp: Math.round(pHero.hp),
              playerMaxHp: Math.round(pHero.maxHp),
              playerMana: Math.round(pHero.mana),
              playerMaxMana: Math.round(pHero.maxMana),
              playerItems: [...pHero.items],
              skills: {
                q: { cd: Math.ceil(pHero.skills.q.currentCooldown), maxCd: pHero.skills.q.cooldownSeconds, mana: pHero.skills.q.manaCost, name: pHero.skills.q.name_vi },
                w: { cd: Math.ceil(pHero.skills.w.currentCooldown), maxCd: pHero.skills.w.cooldownSeconds, mana: pHero.skills.w.manaCost, name: pHero.skills.w.name_vi },
                e: { cd: Math.ceil(pHero.skills.e.currentCooldown), maxCd: pHero.skills.e.cooldownSeconds, mana: pHero.skills.e.manaCost, name: pHero.skills.e.name_vi },
                r: { cd: Math.ceil(pHero.skills.r.currentCooldown), maxCd: pHero.skills.r.cooldownSeconds, mana: pHero.skills.r.manaCost, name: pHero.skills.r.name_vi }
              },
              spells: {
                d: { cd: Math.ceil(pHero.summonerSpells.d.currentCooldown), maxCd: pHero.summonerSpells.d.cooldown, name: 'Tốc Biến' },
                f: { cd: Math.ceil(pHero.summonerSpells.f.currentCooldown), maxCd: pHero.summonerSpells.f.cooldown, name: 'Hồi Phục' }
              },
              isRecalling: pHero.isRecalling,
              recallProgress: pHero.isRecalling ? (4.0 - pHero.recallRemainingSeconds) / 4.0 : 0,
              isDead: pHero.isDead,
              respawnTimer: Math.ceil(pHero.respawnTimer)
            });

            // Sync Target Frame data
            setTargetData(resolveTargetData(pHero.targetEntityId, engine));
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (reactionAlertTimeoutRef.current) clearTimeout(reactionAlertTimeoutRef.current);
    };
  }, [isPaused, onMatchFinished]);

  // Restart & Custom Match Handlers
  const handleStartCustomMatch = (heroId: string, mode: MobaGameMode, difficulty: BotDifficulty) => {
    setIsDraftOpen(false);
    matchFinishedRef.current = false;
    const engine = new MobaEngine(heroId, mode, difficulty);
    engineRef.current = engine;
    lastTimeRef.current = performance.now();
    lastHudSyncRef.current = 0;
    setReactionAlert(null);
    setActiveAnnouncement(null);
    setTargetData(null);
    setIsPaused(false);
    sound.playVictory();
  };

  const handleRestartMatch = useCallback(() => {
    sound.playVictory();
    matchFinishedRef.current = false;
    if (onRestartMatch) {
      onRestartMatch();
    } else {
      const currentHeroId = engineRef.current?.playerHero?.definition.id || 'hero_na_brawler';
      const currentMode = engineRef.current?.mode || 'SOLO_AI_5V5';
      const currentDifficulty = engineRef.current?.difficulty || 'STANDARD';
      const newEngine = new MobaEngine(currentHeroId, currentMode, currentDifficulty);
      engineRef.current = newEngine;
      lastTimeRef.current = performance.now();
      lastHudSyncRef.current = 0;
      setReactionAlert(null);
      setActiveAnnouncement(null);
      setTargetData(null);
      setIsPaused(false);
    }
  }, [onRestartMatch]);

  // Tactical refs for input handlers
  const quickCastRef = useRef(quickCast);
  quickCastRef.current = quickCast;

  const isAttackMoveModeRef = useRef(isAttackMoveMode);
  isAttackMoveModeRef.current = isAttackMoveMode;

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const engine = engineRef.current;
      const renderer = rendererRef.current;
      if (!engine || !renderer || !engine.playerHero || engine.playerHero.isDead) return;

      const pHero = engine.playerHero;
      const mouseWorld = renderer.mouseWorldPos;

      switch (e.key.toLowerCase()) {
        case 'a':
          setIsAttackMoveMode(prev => {
            const next = !prev;
            if (renderer) renderer.showAttackRangeCircle = next;
            if (next) {
              engine.spawnFloatingText(pHero.pos, 'TẤN CÔNG (A)', '#f59e0b');
              sound.playUiClick();
            }
            return next;
          });
          break;

        case 's': // Stop command: cancel movement & auto-attacks
          pHero.targetMovePos = null;
          pHero.targetEntityId = null;
          pHero.path = [];
          if (renderer.activeAimDecal) renderer.activeAimDecal = null;
          setIsAttackMoveMode(false);
          renderer.showAttackRangeCircle = false;
          engine.spawnFloatingText(pHero.pos, 'DỪNG LẠI (S)', '#94a3b8');
          sound.playUiClick();
          break;

        case 'h': // Toggle controls cheat sheet modal
          setIsControlsModalOpen(prev => !prev);
          sound.playUiClick();
          break;

        case 'q':
          if (quickCastRef.current) {
            engine.castSkill(pHero, 'Q', mouseWorld);
          } else if (pHero.skills.q.targetType === 'SKILLSHOT_LINE' || pHero.skills.q.targetType === 'SKILLSHOT_AOE') {
            renderer.activeAimDecal = {
              type: pHero.skills.q.targetType === 'SKILLSHOT_LINE' ? 'LINE' : 'AOE',
              range: pHero.skills.q.range,
              radius: pHero.skills.q.radius,
              slot: 'Q',
              color: pHero.definition.colorTheme
            };
          } else {
            engine.castSkill(pHero, 'Q', mouseWorld);
          }
          break;

        case 'w':
          if (quickCastRef.current) {
            engine.castSkill(pHero, 'W', mouseWorld);
          } else if (pHero.skills.w.targetType === 'SKILLSHOT_LINE' || pHero.skills.w.targetType === 'SKILLSHOT_AOE') {
            renderer.activeAimDecal = {
              type: pHero.skills.w.targetType === 'SKILLSHOT_LINE' ? 'LINE' : 'AOE',
              range: pHero.skills.w.range,
              radius: pHero.skills.w.radius,
              slot: 'W',
              color: pHero.definition.colorTheme
            };
          } else {
            engine.castSkill(pHero, 'W', mouseWorld);
          }
          break;

        case 'e':
          if (quickCastRef.current) {
            engine.castSkill(pHero, 'E', mouseWorld);
          } else if (pHero.skills.e.targetType === 'SKILLSHOT_LINE' || pHero.skills.e.targetType === 'SKILLSHOT_AOE') {
            renderer.activeAimDecal = {
              type: pHero.skills.e.targetType === 'SKILLSHOT_LINE' ? 'LINE' : 'AOE',
              range: pHero.skills.e.range,
              radius: pHero.skills.e.radius,
              slot: 'E',
              color: pHero.definition.colorTheme
            };
          } else {
            engine.castSkill(pHero, 'E', mouseWorld);
          }
          break;

        case 'r':
          if (quickCastRef.current) {
            engine.castSkill(pHero, 'R', mouseWorld);
          } else if (pHero.skills.r.targetType === 'SKILLSHOT_LINE' || pHero.skills.r.targetType === 'SKILLSHOT_AOE') {
            renderer.activeAimDecal = {
              type: pHero.skills.r.targetType === 'SKILLSHOT_LINE' ? 'LINE' : 'AOE',
              range: pHero.skills.r.range,
              radius: pHero.skills.r.radius,
              slot: 'R',
              color: pHero.definition.colorTheme
            };
          } else {
            engine.castSkill(pHero, 'R', mouseWorld);
          }
          break;

        case 'd':
          engine.castFlash(pHero, mouseWorld);
          break;

        case 'f':
          engine.castHeal(pHero);
          break;

        case 'b':
          engine.startRecall(pHero);
          break;

        case 'p':
          setIsShopOpen(prev => !prev);
          break;

        case 'tab':
          e.preventDefault();
          setIsScoreboardOpen(prev => !prev);
          break;

        case 'escape':
          setIsPaused(prev => !prev);
          break;

        case ' ': // Space bar center camera
          renderer.camera = { ...pHero.pos };
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Unified Pointer & Touch Action Handler
  const processCanvasAction = (
    screenX: number,
    screenY: number,
    actionType: 'PRIMARY_CLICK' | 'SECONDARY_CLICK' | 'TOUCH_TAP'
  ) => {
    const engine = engineRef.current;
    const renderer = rendererRef.current;
    if (!engine || !renderer || !engine.playerHero || engine.playerHero.isDead) return;

    const pHero = engine.playerHero;
    const clickWorld = renderer.screenToWorld(screenX, screenY);

    // If skill aiming decal is active, firing it takes absolute priority
    if (renderer.activeAimDecal && (actionType === 'PRIMARY_CLICK' || actionType === 'TOUCH_TAP')) {
      const slot = renderer.activeAimDecal.slot;
      renderer.activeAimDecal = null;
      engine.castSkill(pHero, slot as 'Q' | 'W' | 'E' | 'R', clickWorld);
      return;
    }

    // Cancel aiming on right click
    if (renderer.activeAimDecal && actionType === 'SECONDARY_CLICK') {
      renderer.activeAimDecal = null;
    }

    // Attack-Move execution
    if (isAttackMoveModeRef.current) {
      setIsAttackMoveMode(false);
      renderer.showAttackRangeCircle = false;

      // 1. Direct click on enemy
      const enemyTarget = engine.findEntityById(
        engine.heroes.find(h => h.team !== pHero.team && !h.isDead && Math.hypot(h.pos.x - clickWorld.x, h.pos.y - clickWorld.y) < 55)?.id ||
        engine.minions.find(m => m.team !== pHero.team && Math.hypot(m.pos.x - clickWorld.x, m.pos.y - clickWorld.y) < 35)?.id ||
        engine.turrets.find(t => t.team !== pHero.team && !t.destroyed && Math.hypot(t.pos.x - clickWorld.x, t.pos.y - clickWorld.y) < 60)?.id ||
        engine.monsters.find(nm => nm.isAlive && Math.hypot(nm.pos.x - clickWorld.x, nm.pos.y - clickWorld.y) < 55)?.id ||
        ''
      );

      if (enemyTarget) {
        pHero.targetEntityId = enemyTarget.id;
        pHero.targetMovePos = null;
        renderer.triggerMovePing(enemyTarget.pos.x, enemyTarget.pos.y, 'ATTACK');
        engine.spawnFloatingText(enemyTarget.pos, 'TẤN CÔNG (A)!', '#ef4444', false);
      } else {
        // 2. Click on ground: auto-target closest enemy in attack range if exists, else move to click
        const closestEnemy =
          engine.heroes.find(h => h.team !== pHero.team && !h.isDead && Math.hypot(h.pos.x - pHero.pos.x, h.pos.y - pHero.pos.y) <= pHero.attackRange + 30) ||
          engine.minions.find(m => m.team !== pHero.team && Math.hypot(m.pos.x - pHero.pos.x, m.pos.y - pHero.pos.y) <= pHero.attackRange + 30);

        if (closestEnemy) {
          pHero.targetEntityId = closestEnemy.id;
          pHero.targetMovePos = null;
          renderer.triggerMovePing(closestEnemy.pos.x, closestEnemy.pos.y, 'ATTACK');
          engine.spawnFloatingText(closestEnemy.pos, 'TẤN CÔNG (A)!', '#ef4444', false);
        } else {
          pHero.targetMovePos = { ...clickWorld };
          pHero.targetEntityId = null;
          renderer.triggerMovePing(clickWorld.x, clickWorld.y, 'MOVE');
        }
      }
      sound.playUiClick();
      return;
    }

    // Touch tap or Right Click: Attack enemy if clicked on enemy, otherwise Move to point
    if (actionType === 'SECONDARY_CLICK' || actionType === 'TOUCH_TAP') {
      const enemyTarget = engine.findEntityById(
        engine.heroes.find(h => h.team !== pHero.team && !h.isDead && Math.hypot(h.pos.x - clickWorld.x, h.pos.y - clickWorld.y) < 45)?.id ||
        engine.minions.find(m => m.team !== pHero.team && Math.hypot(m.pos.x - clickWorld.x, m.pos.y - clickWorld.y) < 25)?.id ||
        engine.turrets.find(t => t.team !== pHero.team && !t.destroyed && Math.hypot(t.pos.x - clickWorld.x, t.pos.y - clickWorld.y) < 50)?.id ||
        engine.monsters.find(nm => nm.isAlive && Math.hypot(nm.pos.x - clickWorld.x, nm.pos.y - clickWorld.y) < 45)?.id ||
        ''
      );

      if (enemyTarget) {
        pHero.targetEntityId = enemyTarget.id;
        pHero.targetMovePos = null;
        engine.spawnFloatingText(enemyTarget.pos, 'TẤN CÔNG!', '#ef4444', false);
        renderer.triggerMovePing(enemyTarget.pos.x, enemyTarget.pos.y, 'ATTACK');
      } else {
        pHero.targetMovePos = { ...clickWorld };
        pHero.targetEntityId = null;
        renderer.triggerMovePing(clickWorld.x, clickWorld.y, 'MOVE');
      }
      sound.playUiClick();
      return;
    }

    // Primary Left Click: Try selecting enemy target
    if (actionType === 'PRIMARY_CLICK') {
      const target = engine.findEntityById(
        engine.heroes.find(h => h.team !== pHero.team && !h.isDead && Math.hypot(h.pos.x - clickWorld.x, h.pos.y - clickWorld.y) < 45)?.id ||
        engine.minions.find(m => m.team !== pHero.team && Math.hypot(m.pos.x - clickWorld.x, m.pos.y - clickWorld.y) < 25)?.id ||
        engine.turrets.find(t => t.team !== pHero.team && !t.destroyed && Math.hypot(t.pos.x - clickWorld.x, t.pos.y - clickWorld.y) < 50)?.id ||
        engine.monsters.find(nm => nm.isAlive && Math.hypot(nm.pos.x - clickWorld.x, nm.pos.y - clickWorld.y) < 45)?.id ||
        ''
      );
      if (target) {
        pHero.targetEntityId = target.id;
        renderer.triggerMovePing(target.pos.x, target.pos.y, 'ATTACK');
        sound.playUiClick();
      }
    }
  };

  // Mouse Handlers on Arena Canvas
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseWorld = renderer.screenToWorld(e.clientX - rect.left, e.clientY - rect.top);
    renderer.mouseWorldPos = mouseWorld;
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    processCanvasAction(screenX, screenY, e.button === 2 ? 'SECONDARY_CLICK' : 'PRIMARY_CLICK');
  };

  // Virtual Joystick Handlers for Mobile & Tablet
  const updateJoystickPosition = (clientX: number, clientY: number) => {
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const joy = computeJoystickInput(clientX, clientY, centerX, centerY, 10, 52);
    if (joy.isActive) {
      setJoystickThumbOffset({ x: joy.x * 40, y: joy.y * 40 });
      const engine = engineRef.current;
      if (engine && engine.playerHero && !engine.playerHero.isDead) {
        const moveDist = 200;
        engine.playerHero.targetMovePos = {
          x: engine.playerHero.pos.x + joy.x * moveDist,
          y: engine.playerHero.pos.y + joy.y * moveDist
        };
        engine.playerHero.targetEntityId = null;
      }
    } else {
      setJoystickThumbOffset({ x: 0, y: 0 });
    }
  };

  const handleJoystickTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    joystickTouchIdRef.current = touch.identifier;
    setIsJoystickActive(true);
    updateJoystickPosition(touch.clientX, touch.clientY);
  };

  const handleJoystickTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isJoystickActive || !joystickBaseRef.current) return;
    let touch: React.Touch | undefined;
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === joystickTouchIdRef.current) {
        touch = e.touches[i];
        break;
      }
    }
    if (!touch && e.touches.length > 0) touch = e.touches[0];
    if (touch) {
      updateJoystickPosition(touch.clientX, touch.clientY);
    }
  };

  const handleJoystickTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsJoystickActive(false);
    joystickTouchIdRef.current = null;
    setJoystickThumbOffset({ x: 0, y: 0 });
    const engine = engineRef.current;
    if (engine && engine.playerHero && !engine.playerHero.isDead) {
      engine.playerHero.targetMovePos = null;
    }
  };

  const handleJoystickMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsJoystickActive(true);
    updateJoystickPosition(e.clientX, e.clientY);

    const onMouseMove = (moveEvent: MouseEvent) => {
      updateJoystickPosition(moveEvent.clientX, moveEvent.clientY);
    };

    const onMouseUp = () => {
      setIsJoystickActive(false);
      setJoystickThumbOffset({ x: 0, y: 0 });
      const engine = engineRef.current;
      if (engine && engine.playerHero && !engine.playerHero.isDead) {
        engine.playerHero.targetMovePos = null;
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleTriggerAttack = () => {
    const engine = engineRef.current;
    const renderer = rendererRef.current;
    if (!engine || !renderer || !engine.playerHero || engine.playerHero.isDead) return;

    const success = engine.triggerPlayerAttackNearest();
    if (success) {
      sound.playUiClick();
      const target = engine.findEntityById(engine.playerHero.targetEntityId!);
      if (target) {
        renderer.triggerMovePing(target.pos.x, target.pos.y, 'ATTACK');
        engine.spawnFloatingText(target.pos, 'TẤN CÔNG!', '#ef4444', false);
      }
    } else {
      renderer.showAttackRangeCircle = true;
      setTimeout(() => {
        if (renderer) renderer.showAttackRangeCircle = false;
      }, 700);
      engine.spawnFloatingText(engine.playerHero.pos, 'Không có mục tiêu trong tầm!', '#94a3b8', false);
    }
  };

  // Touch Handlers with Pinch-to-Zoom on Arena Canvas
  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2) {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      touchPinchInitialDistRef.current = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      touchPinchInitialZoomRef.current = rendererRef.current?.zoom || 1.0;
      return;
    }
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const screenX = touch.clientX - rect.left;
    const screenY = touch.clientY - rect.top;

    const renderer = rendererRef.current;
    if (renderer) {
      renderer.mouseWorldPos = renderer.screenToWorld(screenX, screenY);
    }

    processCanvasAction(screenX, screenY, 'TOUCH_TAP');
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 2 && touchPinchInitialDistRef.current && rendererRef.current) {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const newZoom = computePinchZoom(
        t0,
        t1,
        touchPinchInitialDistRef.current,
        touchPinchInitialZoomRef.current,
        0.6,
        1.8
      );
      rendererRef.current.zoom = newZoom;
      return;
    }
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const renderer = rendererRef.current;
    if (!renderer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseWorld = renderer.screenToWorld(touch.clientX - rect.left, touch.clientY - rect.top);
    renderer.mouseWorldPos = mouseWorld;
  };

  const handleCanvasTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length < 2) {
      touchPinchInitialDistRef.current = null;
    }
  };

  // Minimap Click & Touch Navigation
  const handleMinimapClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const engine = engineRef.current;
    if (!engine || !engine.playerHero || engine.playerHero.isDead) return;

    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const worldX = Math.max(0, Math.min(2400, (clickX / rect.width) * 2400));
    const worldY = Math.max(0, Math.min(2400, (clickY / rect.height) * 2400));

    engine.playerHero.targetMovePos = { x: worldX, y: worldY };
    sound.playUiClick();
  };

  const handleMinimapTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const engine = engineRef.current;
    if (!engine || !engine.playerHero || engine.playerHero.isDead) return;

    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const clickX = touch.clientX - rect.left;
    const clickY = touch.clientY - rect.top;

    const worldX = Math.max(0, Math.min(2400, (clickX / rect.width) * 2400));
    const worldY = Math.max(0, Math.min(2400, (clickY / rect.height) * 2400));

    engine.playerHero.targetMovePos = { x: worldX, y: worldY };
    sound.playUiClick();
  };

  // Buy Shop Item
  const handleBuyItem = (itemId: string) => {
    const engine = engineRef.current;
    if (engine && engine.playerHero) {
      engine.buyItem(engine.playerHero, itemId);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4.5rem)] bg-obsidian overflow-hidden select-none flex flex-col">
      {/* 1. TOP BAR HUD */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-2 bg-obsidian/85 backdrop-blur-md border-b border-navy-light/60">
        {/* Left: Mode Title & Draft button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-black text-ivory text-sm tracking-widest">ELEMENTA</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/30">
              MOBA ARENA
            </span>
          </div>

          <button
            onClick={() => setIsDraftOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-navy hover:bg-navy-light text-xs font-bold text-ivory border border-navy-light/60 transition-all shadow-sm"
          >
            <Sword className="w-3.5 h-3.5 text-coral-reaction" />
            <span>Chọn Tướng / Đổi Chế Độ</span>
          </button>

          <button
            onClick={handleRestartMatch}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/70 hover:bg-red-900/90 text-xs font-bold text-red-200 border border-red-500/50 transition-all shadow-sm hover:scale-105 active:scale-95"
            title="Tái tạo lại trận đấu (Làm mới toàn bộ đấu trường, quái rừng, lính và trụ)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Tái Tạo Trận Đấu</span>
          </button>
        </div>

        {/* Center: Match Timer & Team Kills Score */}
        <div className="flex items-center gap-4 bg-navy/90 px-4 py-1 rounded-xl border border-navy-light/60 shadow-md">
          <div className="flex items-center gap-1.5 font-mono font-black text-cyan-400 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{hudState.blueKills}</span>
          </div>
          <div className="font-mono font-bold text-ivory text-sm tracking-wider">
            {hudState.matchTime}
          </div>
          <div className="flex items-center gap-1.5 font-mono font-black text-red-400 text-sm">
            <span>{hudState.redKills}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></span>
          </div>
        </div>

        {/* Right: Player KDA, Gold, Shop & Settings Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-ivory-muted bg-navy/80 px-2.5 py-1 rounded-lg border border-navy-light/40">
            <span>KDA: <strong className="text-ivory">{hudState.playerKda.kills}/{hudState.playerKda.deaths}/{hudState.playerKda.assists}</strong></span>
            <span>CS: <strong className="text-ivory">{hudState.playerKda.cs}</strong></span>
            <span>Vàng: <strong className="text-yellow-400">{hudState.playerGold}g</strong></span>
          </div>

          {/* Quick Graphics Quality Toggle */}
          <button
            onClick={() => {
              if (onUpdateSettings && settings) {
                const nextQ: GraphicsQuality =
                  settings.graphicsQuality === 'PERFORMANCE'
                    ? 'BALANCED'
                    : settings.graphicsQuality === 'BALANCED'
                    ? 'ULTRA'
                    : 'PERFORMANCE';
                onUpdateSettings({ ...settings, graphicsQuality: nextQ });
                sound.playUiClick();
              }
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-navy hover:bg-navy-light text-xs font-mono font-bold text-cyan-ion border border-cyan-ion/40 transition-all shadow-sm"
            title="Chuyển đổi chất lượng đồ họa (VFX & Particle Budget)"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-ion" />
            <span>VFX: {settings?.graphicsQuality || 'BALANCED'}</span>
          </button>

          {/* Quick Cast Toggle */}
          <button
            onClick={() => {
              setQuickCast(prev => !prev);
              sound.playUiClick();
            }}
            className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold border transition-all shadow-sm ${
              quickCast
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'bg-navy border-navy-light/60 text-ivory-muted hover:text-ivory'
            }`}
            title="Bật/Tắt Quick Cast (Tung chiêu tức thì theo chuột)"
          >
            <Zap className={`w-3.5 h-3.5 ${quickCast ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span>Cast: {quickCast ? 'QUICK' : 'NORMAL'}</span>
          </button>

          {/* Controls Cheat Sheet [H] Button */}
          <button
            onClick={() => {
              setIsControlsModalOpen(prev => !prev);
              sound.playUiClick();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-navy hover:bg-navy-light text-xs font-bold text-cyan-ion border border-cyan-500/40 transition-all shadow-sm"
            title="Mở hướng dẫn điều khiển & phím tắt [H]"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-ion" />
            <span className="hidden sm:inline">Phím [H]</span>
          </button>

          <button
            onClick={() => setIsShopOpen(prev => !prev)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-yellow-300 border border-amber-500/40 transition-all shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cửa Hàng [P]</span>
          </button>

          <button
            onClick={() => setShowSandboxCheats(prev => !prev)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-navy hover:bg-navy-light text-xs font-mono text-ivory-muted border border-navy-light/60 transition-all"
            title="Công Cụ Thử Nghiệm Sandbox"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-ion" />
          </button>

          <button
            onClick={() => setIsPaused(prev => !prev)}
            className="p-1 rounded bg-navy hover:bg-navy-light text-ivory-muted hover:text-ivory border border-navy-light/60"
            title="Tạm Dừng"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Target Inspection Frame */}
      <TargetFrame
        target={targetData}
        onClearTarget={() => {
          if (engineRef.current?.playerHero) {
            engineRef.current.playerHero.targetEntityId = null;
            setTargetData(null);
          }
        }}
      />

      {/* 1.5 KILL ANNOUNCEMENT BANNER */}
      {activeAnnouncement && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none animate-slideDown">
          {activeAnnouncement.type === 'TEAM_SYNERGY' ? (
            <div className="relative px-6 py-2.5 rounded-2xl bg-slate-950/95 backdrop-blur-xl border-2 border-emerald-400/80 shadow-[0_0_35px_rgba(16,185,129,0.5)] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-300 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg border border-emerald-200">
                🤝
              </div>
              <div className="flex flex-col items-center">
                <span className="font-black text-sm sm:text-base tracking-widest uppercase bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(16,185,129,0.6)]">
                  {activeAnnouncement.title}
                </span>
                <span className="text-xs text-emerald-200 font-medium tracking-wide">
                  {activeAnnouncement.subtitle}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative px-6 py-2.5 rounded-2xl bg-slate-950/95 backdrop-blur-xl border-2 border-amber-500/80 shadow-[0_0_35px_rgba(245,158,11,0.5)] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg border border-yellow-200">
                👑
              </div>
              <div className="flex flex-col items-center">
                <span className="font-black text-sm sm:text-base tracking-widest uppercase bg-gradient-to-r from-yellow-200 via-amber-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(245,158,11,0.6)]">
                  {activeAnnouncement.title}
                </span>
                <span className="text-xs text-slate-300 font-medium tracking-wide">
                  {activeAnnouncement.subtitle}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. CHEMICAL REACTION ALERT BANNER (TOP-CENTER POPUP) */}
      {reactionAlert && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] bg-obsidian/95 border-2 border-cyan-ion/80 rounded-2xl p-3.5 shadow-2xl shadow-cyan-ion/40 animate-slideDown flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-ion to-coral-reaction flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-obsidian" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-coral-reaction uppercase tracking-wider">
                ⚡ PHẢN ỨNG HÓA HỌC KÍCH HOẠT TRONG GIAO TRANH
              </span>
              <button onClick={() => setReactionAlert(null)} className="text-ivory-muted hover:text-ivory">
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-ivory mt-0.5">{reactionAlert.name}</h4>
            <div className="px-2 py-1 my-1.5 rounded bg-navy font-mono text-xs font-bold text-cyan-ion border border-cyan-ion/40 tracking-wider">
              {reactionAlert.equation}
            </div>
            <p className="text-[11px] text-ivory-muted italic">"{reactionAlert.phenomena}"</p>
          </div>
        </div>
      )}

      {/* 3. MAIN ARENA VIEWPORT CANVAS */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleCanvasMouseMove}
        onMouseDown={handleCanvasMouseDown}
        onTouchStart={handleCanvasTouchStart}
        onTouchMove={handleCanvasTouchMove}
        onTouchEnd={handleCanvasTouchEnd}
        onTouchCancel={handleCanvasTouchEnd}
        onContextMenu={(e) => e.preventDefault()}
        className="w-full flex-1 cursor-crosshair block touch-none"
      />

      {/* 3.5 VIRTUAL JOYSTICK FOR TOUCH & MOBILE */}
      <div
        ref={joystickBaseRef}
        onMouseDown={handleJoystickMouseDown}
        onTouchStart={handleJoystickTouchStart}
        onTouchMove={handleJoystickTouchMove}
        onTouchEnd={handleJoystickTouchEnd}
        onTouchCancel={handleJoystickTouchEnd}
        className="absolute bottom-6 left-6 z-30 w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-cyan-500/40 bg-slate-950/60 backdrop-blur-md flex items-center justify-center touch-none select-none shadow-[0_0_20px_rgba(6,182,212,0.25)] pointer-events-auto"
        title="Cần Điều Khiển Cảm Ứng (Virtual Joystick)"
      >
        {/* Cardinal Direction Ticks */}
        <span className="absolute top-1 text-[9px] font-mono text-cyan-400/50 font-bold">▲</span>
        <span className="absolute bottom-1 text-[9px] font-mono text-cyan-400/50 font-bold">▼</span>
        <span className="absolute left-1 text-[9px] font-mono text-cyan-400/50 font-bold">◄</span>
        <span className="absolute right-1 text-[9px] font-mono text-cyan-400/50 font-bold">►</span>

        {/* Joystick Center Thumb Nub */}
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 via-teal-500 to-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.8)] border-2 border-cyan-100 flex items-center justify-center transition-transform duration-75 pointer-events-none ${
            isJoystickActive ? 'scale-110 shadow-cyan-400/90' : 'opacity-80'
          }`}
          style={{
            transform: `translate(${joystickThumbOffset.x}px, ${joystickThumbOffset.y}px)`
          }}
        >
          <div className="w-4 h-4 rounded-full bg-slate-950/60 border border-cyan-200/60" />
        </div>
      </div>

      {/* 4. BOTTOM HERO ABILITY HUD */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-end gap-3 bg-obsidian/90 backdrop-blur-md p-3 rounded-2xl border-2 border-navy-light/80 shadow-2xl">
        {/* Hero Avatar & Level */}
        <div className="relative w-15 h-15 rounded-2xl bg-obsidian p-1 shadow-lg flex items-center justify-center border-2 border-cyan-ion/70 overflow-hidden shrink-0">
          <ElementalCrest
            heroIdOrSymbol={engineRef.current?.playerHero?.definition.symbol || 'Na'}
            size={48}
            glow={true}
          />
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-obsidian text-[10px] font-black flex items-center justify-center shadow-md border border-obsidian">
            {hudState.playerLevel}
          </span>
        </div>

        {/* HP, Mana, Buffs & Skills Container */}
        <div className="flex flex-col gap-1.5 min-w-[300px] sm:min-w-[400px]">
          {/* Active Chemical Status Buffs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            <StatusBadge type="SHIELD" label="Màng Kiềm NaOH" />
            <StatusBadge type="REDUCTION" label="Tính Khử 3s¹" />
            {hudState.playerHp < hudState.playerMaxHp * 0.4 && (
              <StatusBadge type="CORROSION" label="Cảnh Báo HP Thấp" />
            )}
          </div>

          {/* Health Bar */}
          <div className="relative w-full h-4 bg-navy-light/60 rounded-full overflow-hidden border border-navy-light">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-150"
              style={{ width: `${Math.max(0, (hudState.playerHp / hudState.playerMaxHp) * 100)}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white drop-shadow">
              {hudState.playerHp} / {hudState.playerMaxHp} HP
            </span>
          </div>

          {/* Mana Bar */}
          <div className="relative w-full h-2.5 bg-navy-light/60 rounded-full overflow-hidden border border-navy-light">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-150"
              style={{ width: `${Math.max(0, (hudState.playerMana / hudState.playerMaxMana) * 100)}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-white drop-shadow">
              {hudState.playerMana} / {hudState.playerMaxMana}
            </span>
          </div>

          {/* Skill Buttons (Q, W, E, R) */}
          <div className="flex items-center gap-2 mt-1">
            {(['q', 'w', 'e', 'r'] as const).map(slotKey => {
              const skill = hudState.skills[slotKey];
              const isCooling = skill.cd > 0;
              const sym = engineRef.current?.playerHero?.definition.symbol || 'Na';

              // Bespoke skill glyph picker
              const renderSkillGlyph = () => {
                if (slotKey === 'q') return <WaterBurstGlyph size={24} />;
                if (slotKey === 'w') return <AlkalineShieldGlyph size={24} />;
                if (slotKey === 'e') return sym === 'Cl' ? <ToxicGasGlyph size={24} /> : <RustCorrosionGlyph size={24} />;
                return <ThermiteBlastGlyph size={24} />;
              };

              return (
                <div
                  key={slotKey}
                  className={`relative w-14 h-14 rounded-xl flex flex-col items-center justify-between p-1 border transition-all ${
                    isCooling
                      ? 'bg-navy/50 border-navy-light/40 opacity-70'
                      : 'bg-navy/90 hover:bg-navy-light/80 border-cyan-ion/60 shadow-lg shadow-cyan-ion/20 hover:scale-105 cursor-pointer'
                  }`}
                  onClick={() => {
                    const engine = engineRef.current;
                    const renderer = rendererRef.current;
                    if (engine && renderer && engine.playerHero) {
                      engine.castSkill(engine.playerHero, slotKey.toUpperCase() as 'Q' | 'W' | 'E' | 'R', renderer.mouseWorldPos);
                    }
                  }}
                >
                  {/* Top Bar: Hotkey & Mana */}
                  <div className="w-full flex items-center justify-between pointer-events-none z-10 px-0.5">
                    <span className="text-[10px] font-mono font-black text-cyan-ion uppercase">
                      [{slotKey.toUpperCase()}]
                    </span>
                    <span className="text-[8px] font-mono px-1 rounded bg-blue-950 text-cyan-300 border border-cyan-500/30">
                      {skill.mana}
                    </span>
                  </div>

                  {/* Center Skill SVG Glyph */}
                  <div className="my-auto drop-shadow pointer-events-none">
                    {renderSkillGlyph()}
                  </div>

                  {/* Bottom Title */}
                  <span className="text-[8px] text-ivory font-bold truncate max-w-full z-10 pointer-events-none">
                    {skill.name}
                  </span>

                  {/* Cooldown SVG Radial Sweep Overlay */}
                  {isCooling && (
                    <div className="absolute inset-0 bg-obsidian/85 backdrop-blur-xs rounded-xl flex items-center justify-center font-mono font-bold text-sm text-yellow-400 z-20">
                      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 48 48">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="transparent"
                          stroke="#facc15"
                          strokeWidth="3.5"
                          strokeDasharray={2 * Math.PI * 20}
                          strokeDashoffset={2 * Math.PI * 20 * (1 - skill.cd / (skill.maxCd || 1))}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="drop-shadow-md z-10 font-black text-xs">{skill.cd}s</span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Dedicated Attack Button [A / Space] */}
            <div
              className="relative w-14 h-14 rounded-xl flex flex-col items-center justify-between p-1 border transition-all bg-gradient-to-br from-amber-600/90 via-orange-600/80 to-amber-700/90 border-amber-400/80 hover:border-amber-300 shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 cursor-pointer select-none shrink-0"
              onClick={handleTriggerAttack}
              title="Tấn Công Mục Tiêu Gần Nhất (Phím A / Click)"
            >
              <div className="w-full flex items-center justify-between pointer-events-none z-10 px-0.5">
                <span className="text-[10px] font-mono font-black text-amber-200 uppercase">[A]</span>
                <span className="text-[8px] font-mono px-1 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                  {engineRef.current?.playerHero?.attackDamage || 85}
                </span>
              </div>
              <div className="my-auto drop-shadow pointer-events-none text-amber-100">
                <Sword className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-[8px] text-ivory font-bold truncate max-w-full z-10 pointer-events-none">
                ĐÁNH
              </span>
            </div>

            {/* Summoner Spells (D, F, B) */}
            <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-navy-light/60">
              {/* D: Flash */}
              <div
                className="relative w-11 h-11 rounded-xl bg-navy/90 hover:bg-navy-light border border-amber-400/50 flex flex-col items-center justify-center cursor-pointer shadow-md"
                onClick={() => {
                  const engine = engineRef.current;
                  const renderer = rendererRef.current;
                  if (engine && renderer && engine.playerHero) {
                    engine.castFlash(engine.playerHero, renderer.mouseWorldPos);
                  }
                }}
                title="Tốc Biến (Flash)"
              >
                <FlashSpellGlyph size={22} />
                <span className="text-[9px] font-mono font-bold text-amber-300">[D]</span>
                {hudState.spells.d.cd > 0 && (
                  <div className="absolute inset-0 bg-obsidian/85 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-yellow-400 z-20">
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="transparent"
                        stroke="#facc15"
                        strokeWidth="3"
                        strokeDasharray={2 * Math.PI * 15}
                        strokeDashoffset={2 * Math.PI * 15 * (1 - hudState.spells.d.cd / (hudState.spells.d.maxCd || 1))}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="z-10 text-[10px]">{hudState.spells.d.cd}s</span>
                  </div>
                )}
              </div>

              {/* F: Heal */}
              <div
                className="relative w-11 h-11 rounded-xl bg-navy/90 hover:bg-navy-light border border-emerald-400/50 flex flex-col items-center justify-center cursor-pointer shadow-md"
                onClick={() => {
                  const engine = engineRef.current;
                  if (engine && engine.playerHero) {
                    engine.castHeal(engine.playerHero);
                  }
                }}
                title="Hồi Phục (Heal)"
              >
                <HealSpellGlyph size={22} />
                <span className="text-[9px] font-mono font-bold text-emerald-300">[F]</span>
                {hudState.spells.f.cd > 0 && (
                  <div className="absolute inset-0 bg-obsidian/85 rounded-xl flex items-center justify-center font-mono text-xs font-bold text-yellow-400 z-20">
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray={2 * Math.PI * 15}
                        strokeDashoffset={2 * Math.PI * 15 * (1 - hudState.spells.f.cd / (hudState.spells.f.maxCd || 1))}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="z-10 text-[10px]">{hudState.spells.f.cd}s</span>
                  </div>
                )}
              </div>

              {/* B: Recall */}
              <div
                className="relative w-11 h-11 rounded-xl bg-navy/90 hover:bg-navy-light border border-cyan-400/50 flex flex-col items-center justify-center cursor-pointer shadow-md"
                onClick={() => {
                  const engine = engineRef.current;
                  if (engine && engine.playerHero) {
                    engine.startRecall(engine.playerHero);
                  }
                }}
                title="Biến Về Căn Cứ (Recall)"
              >
                <RecallSpellGlyph size={22} />
                <span className="text-[9px] font-mono font-bold text-cyan-300">[B]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Items (up to 6 slots) */}
        <div className="hidden sm:grid grid-cols-3 gap-1 pl-2 border-l border-navy-light/60">
          {Array.from({ length: 6 }).map((_, i) => {
            const item = hudState.playerItems[i];
            return (
              <div
                key={i}
                className="w-8 h-8 rounded-lg bg-navy border border-navy-light/50 flex items-center justify-center text-[10px] text-ivory-muted"
                title={item ? `${item.name_vi} (${item.chemicalFormula})` : 'Trống'}
              >
                {item ? (
                  <span className="font-mono font-bold text-yellow-300 text-[9px] truncate px-0.5">
                    {item.name_vi.split(' ')[0]}
                  </span>
                ) : (
                  <span>·</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. MINIMAP CANVAS (BOTTOM-RIGHT) */}
      <div className="absolute bottom-3 right-3 z-30 flex flex-col items-end gap-1">
        <div className="relative rounded-xl overflow-hidden border-2 border-navy-light/80 shadow-2xl bg-obsidian">
          <canvas
            ref={minimapCanvasRef}
            onClick={handleMinimapClick}
            onTouchStart={handleMinimapTouch}
            className="w-44 h-44 cursor-pointer block touch-none"
          />
          <span className="absolute top-1 left-2 text-[9px] font-mono text-ivory-muted">
            THUNG LŨNG LIÊN KẾT
          </span>
        </div>
      </div>

      {/* 6. RECALL CHANNELING OVERLAY */}
      {hudState.isRecalling && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 bg-obsidian/90 p-4 rounded-xl border border-blue-400 shadow-2xl">
          <span className="font-mono font-bold text-cyan-ion text-sm animate-pulse">
            ĐANG TRUYỀN TẢI VỀ CĂN CỨ...
          </span>
          <div className="w-48 h-2.5 bg-navy rounded-full overflow-hidden border border-blue-400/40">
            <div
              className="h-full bg-blue-400 transition-all duration-75"
              style={{ width: `${hudState.recallProgress * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* 7. RESPAWN TIMER OVERLAY (IF DEAD) */}
      {hudState.isDead && (
        <div className="absolute inset-0 z-40 bg-obsidian/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
          <h2 className="text-2xl font-serif font-black text-red-500 tracking-wider">BẠN ĐÃ BỊ HẠ GỤC</h2>
          <p className="text-sm text-ivory-muted">Đang tái tạo liên kết nguyên tử trong căn cứ...</p>
          <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center font-mono font-black text-2xl text-ivory animate-pulse">
            {hudState.respawnTimer}s
          </div>
        </div>
      )}

      {/* 8. IN-GAME CHEMICAL ITEM SHOP MODAL */}
      {isShopOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-4xl max-h-[85vh] bg-navy border border-navy-light/80 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 overflow-hidden">
            <div className="flex items-center justify-between border-b border-navy-light/60 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-yellow-400" />
                <h3 className="font-serif font-bold text-ivory text-base">CỬA HÀNG VẬT PHẨM HÓA HỌC</h3>
                <span className="text-xs font-mono text-yellow-400 ml-3">Vàng hiện có: {hudState.playerGold}g</span>
              </div>
              <button onClick={() => setIsShopOpen(false)} className="text-ivory-muted hover:text-ivory">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CHEMICAL_ITEMS_CATALOG.map(item => {
                const canAfford = hudState.playerGold >= item.cost;
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-obsidian/60 border border-navy-light/50 flex flex-col justify-between gap-2 hover:border-cyan-ion/60 transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-ivory">{item.name_vi}</h4>
                        <span className="text-xs font-mono font-bold text-yellow-400">{item.cost}g</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-ion block mt-0.5">
                        CTHH: {item.chemicalFormula}
                      </span>
                      <p className="text-[11px] text-ivory-muted mt-1 leading-snug">{item.passiveVI}</p>
                    </div>

                    <div className="pt-2 border-t border-navy-light/40 flex items-center justify-between">
                      <span className="text-[9px] text-ivory-muted font-mono">{item.category}</span>
                      <button
                        onClick={() => handleBuyItem(item.id)}
                        disabled={!canAfford}
                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                          canAfford
                            ? 'bg-gradient-to-r from-cyan-ion to-coral-reaction text-obsidian shadow hover:scale-105'
                            : 'bg-navy-light/40 text-ivory-muted cursor-not-allowed'
                        }`}
                      >
                        Mua
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 9. SANDBOX CHEAT DRAWER */}
      {showSandboxCheats && (
        <div className="absolute top-12 right-4 z-40 w-72 bg-obsidian/95 border border-cyan-ion/60 rounded-xl p-4 shadow-2xl flex flex-col gap-2.5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-navy-light/60 pb-1.5">
            <span className="text-xs font-mono font-bold text-cyan-ion">CÔNG CỤ SANDBOX</span>
            <button onClick={() => setShowSandboxCheats(false)} className="text-ivory-muted hover:text-ivory">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              const engine = engineRef.current;
              if (engine) engine.cheats.godMode = !engine.cheats.godMode;
              sound.playUiClick();
            }}
            className="px-2.5 py-1.5 rounded bg-navy text-xs text-ivory flex items-center justify-between border border-navy-light"
          >
            <span>Vô Hạn Máu (God Mode)</span>
            <span className="font-mono text-cyan-ion">{engineRef.current?.cheats.godMode ? 'BẬT' : 'TẮT'}</span>
          </button>

          <button
            onClick={() => {
              const engine = engineRef.current;
              if (engine) engine.cheats.zeroCooldown = !engine.cheats.zeroCooldown;
              sound.playUiClick();
            }}
            className="px-2.5 py-1.5 rounded bg-navy text-xs text-ivory flex items-center justify-between border border-navy-light"
          >
            <span>Không Hồi Chiêu (No CD)</span>
            <span className="font-mono text-cyan-ion">{engineRef.current?.cheats.zeroCooldown ? 'BẬT' : 'TẮT'}</span>
          </button>

          <button
            onClick={() => {
              const engine = engineRef.current;
              if (engine && engine.playerHero) {
                engine.playerHero.gold += 5000;
                sound.playVictory();
              }
            }}
            className="px-2.5 py-1.5 rounded bg-navy text-xs text-yellow-400 font-bold border border-yellow-500/30"
          >
            +5,000 Vàng
          </button>

          <button
            onClick={() => {
              const engine = engineRef.current;
              if (engine && engine.playerHero) {
                engine.playerHero.level = 18;
                sound.playVictory();
              }
            }}
            className="px-2.5 py-1.5 rounded bg-navy text-xs text-emerald-400 font-bold border border-emerald-500/30"
          >
            Lên Cấp 18 Tức Thời
          </button>

          <button
            onClick={() => {
              const engine = engineRef.current;
              if (engine) engine.spawnMinionWave();
              sound.playUiClick();
            }}
            className="px-2.5 py-1.5 rounded bg-navy text-xs text-cyan-ion border border-cyan-500/30"
          >
            Xuất Đợt Lính Ngay
          </button>
        </div>
      )}

      {/* 9.5 CONTROLS CHEAT SHEET MODAL (H KEY) */}
      {isControlsModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-950 border-2 border-cyan-500/50 rounded-2xl shadow-2xl p-6 text-white space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎮</span>
                <h3 className="font-bold text-base md:text-lg text-cyan-400 uppercase tracking-wide">
                  HỆ THỐNG PHÍM TẮT & ĐIỀU KHIỂN CHIẾN THUẬT (MOBA)
                </h3>
              </div>
              <button
                onClick={() => setIsControlsModalOpen(false)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-all text-xs font-mono font-bold"
              >
                ✕ Đóng [Esc / H]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-cyan-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  ⚡ KỸ NĂNG & PHÉP BỔ TRỢ
                </h4>
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between items-center"><span className="text-amber-400 font-bold">[Q] [W] [E] [R]</span> <span className="text-slate-300">4 Kỹ năng nguyên tố & Chiêu cuối</span></div>
                  <div className="flex justify-between items-center"><span className="text-cyan-400 font-bold">[D]</span> <span className="text-slate-300">Tốc Biến (Flash - Phân hạch ion)</span></div>
                  <div className="flex justify-between items-center"><span className="text-emerald-400 font-bold">[F]</span> <span className="text-slate-300">Hồi Máu (Heal - Dung môi phục hồi)</span></div>
                  <div className="flex justify-between items-center"><span className="text-blue-400 font-bold">[B]</span> <span className="text-slate-300">Biến Về Căn Cứ (Recall 4s)</span></div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  🎯 ĐIỀU KHIỂN CHIẾN ĐẤU (PRO MOBA)
                </h4>
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between items-center"><span className="text-emerald-400 font-bold">[Chuột Phải]</span> <span className="text-slate-300">Di chuyển / Tấn công mục tiêu</span></div>
                  <div className="flex justify-between items-center"><span className="text-amber-400 font-bold">[A] + Chuột Trái</span> <span className="text-slate-300">Di chuyển tấn công (Attack-Move)</span></div>
                  <div className="flex justify-between items-center"><span className="text-red-400 font-bold">[S]</span> <span className="text-slate-300">Dừng khẩn cấp (Stop Command)</span></div>
                  <div className="flex justify-between items-center"><span className="text-purple-400 font-bold">[Phím Cách]</span> <span className="text-slate-300">Căn giữa camera vào tướng</span></div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  🛍️ GIAO DIỆN & TÍNH NĂNG
                </h4>
                <div className="space-y-1.5 font-mono">
                  <div className="flex justify-between items-center"><span className="text-yellow-400 font-bold">[P]</span> <span className="text-slate-300">Mở / Đóng Cửa Hàng Trang Bị</span></div>
                  <div className="flex justify-between items-center"><span className="text-blue-400 font-bold">[Tab]</span> <span className="text-slate-300">Bảng Điểm KDA & Chỉ Số Toàn Trận</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-400 font-bold">[Esc]</span> <span className="text-slate-300">Tạm dừng trận đấu</span></div>
                  <div className="flex justify-between items-center"><span className="text-cyan-400 font-bold">[H]</span> <span className="text-slate-300">Mở / Đóng Bảng Hướng Dẫn Này</span></div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-rose-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  💡 CHỈ DẪN KHOA HỌC THỰC CHIẾN
                </h4>
                <div className="text-slate-300 leading-relaxed font-sans space-y-1">
                  <p>• <strong>Last-Hit Lính</strong>: Khi lính địch có HP dưới mức sát thương của bạn, thanh máu sẽ <strong>phát sáng vàng</strong> với mũi tên tam giác ngược. Đánh 1 đòn để nhận vàng kết liễu!</p>
                  <p>• <strong>Phản Ứng Hóa Học</strong>: Tận dụng các nguyên tố đối nghịch (Axit + Bazơ, Kim loại kiềm + Nước) để bộc phát lượng sát thương cực đại.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsControlsModalOpen(false)}
                className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Đã Rõ, Vào Trận Ngay!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. DRAFT MODAL */}
      <HeroSelectModal
        isOpen={isDraftOpen}
        onClose={() => setIsDraftOpen(false)}
        onStartMatch={handleStartCustomMatch}
        unlockedHeroIds={unlockedHeroIds}
        onOpenShop={onOpenShop}
      />
    </div>
  );
};
