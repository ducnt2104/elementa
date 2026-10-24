// src/components/duel/TacticalDuelArenaTab.tsx
// High-Fidelity Tactical Chemical Duel Arena Tab (Yu-Gi-Oh! Inspired 5x2 Arena)

import React, { useState, useEffect, useRef } from 'react';
import { DuelEngine, AiLevel } from '../../domain/duelEngine';
import {
  MonsterZoneSlot,
  SpellTrapZoneSlot,
  CardInstance,
  DuelPhase,
  MonsterBattlePosition,
  PlayableCardDef,
  ResolvedChainSummary,
  BattleReplayState
} from '../../domain/cardGameTypes';
import { ChemicalCardView } from '../cards/ChemicalCardView';
import { sound } from '../../audio/soundEngine';
import {
  Trophy,
  Sword,
  Shield,
  Zap,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Flame,
  Droplets,
  AlertOctagon,
  BookOpen,
  Atom,
  HelpCircle,
  Eye,
  CheckCircle,
  XCircle,
  Layers,
  Share2,
  Trash2,
  Skull,
  MoveUpRight,
  Clock,
  Search,
  Settings,
  Heart,
  Flag,
  FastForward,
  FlaskConical
} from 'lucide-react';
import { ChemicalEnvironmentHud } from './ChemicalEnvironmentHud';
import { CardScientificInspector } from './CardScientificInspector';
import { ReactionPreviewModal } from './ReactionPreviewModal';
import { CharacterQuipEngine, CharacterQuip, ChemistPersona, QuipTriggerEvent, QuipQueueManager } from '../../domain/characterQuips';
import { rankedEngine } from '../../domain/rankedSystem';
import { CampaignStage } from '../campaign/CampaignStoryTab';

export interface TacticalDuelArenaTabProps {
  playerMainDeckIds: string[];
  playerExtraDeckIds: string[];
  initialAiLevel?: AiLevel;
  campaignStage?: CampaignStage | null;
  onDuelFinished?: (outcome: string) => void;
  onCampaignStageWon?: (stageId: string, rewardCardId: string) => void;
  onExitCampaignDuel?: () => void;
  openTutorial?: () => void;
  onOpenDeckBuilder?: () => void;
  onReturnToLobby?: () => void;
}

export const TacticalDuelArenaTab: React.FC<TacticalDuelArenaTabProps> = ({
  playerMainDeckIds,
  playerExtraDeckIds,
  initialAiLevel,
  campaignStage,
  onDuelFinished,
  onCampaignStageWon,
  onExitCampaignDuel,
  openTutorial,
  onOpenDeckBuilder,
  onReturnToLobby
}) => {
  const [aiLevel, setAiLevel] = useState<AiLevel>(initialAiLevel || 'ADEPT');
  const [matchLpSetting, setMatchLpSetting] = useState<number>(8000);
  const [turnTimerSetting, setTurnTimerSetting] = useState<number>(60);
  const [isMatchSettingsModalOpen, setIsMatchSettingsModalOpen] = useState<boolean>(false);
  const [selectedEnvPreset, setSelectedEnvPreset] = useState<string>('DEFAULT');
  const [showEndgameLogs, setShowEndgameLogs] = useState<boolean>(false);

  // In-Duel Deck Tutor & Chemical Search States (Rulebook v10 tr. 33)
  const [isDeckTutorModalOpen, setIsDeckTutorModalOpen] = useState<boolean>(false);
  const [tutorCategoryFilter, setTutorCategoryFilter] = useState<'ALL' | 'MONSTER' | 'COMPOUND' | 'SPELL' | 'TRAP'>('ALL');
  const [tutorSearchQuery, setTutorSearchQuery] = useState<string>('');
  const [selectedTutorCardUid, setSelectedTutorCardUid] = useState<string | null>(null);
  const [tutorDestination, setTutorDestination] = useState<'HAND' | 'GRAVEYARD' | 'FIELD'>('HAND');
  const [showSurrenderModal, setShowSurrenderModal] = useState<boolean>(false);
  const [showReactionModal, setShowReactionModal] = useState<boolean>(false);
  const [showHandDiscardModal, setShowHandDiscardModal] = useState<boolean>(false);
  const [selectedDiscardUids, setSelectedDiscardUids] = useState<string[]>([]);
  const [engine, setEngine] = useState<DuelEngine>(() => new DuelEngine(playerMainDeckIds, playerExtraDeckIds, initialAiLevel || 'ADEPT', undefined, undefined, 8000));
  
  // Selection & Inspector states
  const [selectedHandUid, setSelectedHandUid] = useState<string | null>(null);
  const [selectedMonsterSlot, setSelectedMonsterSlot] = useState<number | null>(null);
  const [selectedSpellTrapSlot, setSelectedSpellTrapSlot] = useState<number | null>(null);
  const [inspectCard, setInspectCard] = useState<CardInstance | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [combatVfx, setCombatVfx] = useState<{ active: boolean; text: string; substeps?: string[] } | null>(null);
  
  // Modals
  const [showSynthesisModal, setShowSynthesisModal] = useState<boolean>(false);
  const [synthesisTab, setSynthesisTab] = useState<'FUSION' | 'SYNCHRO' | 'XYZ' | 'LINK' | 'PENDULUM' | 'RITUAL'>('FUSION');
  const [selectedLinkMaterials, setSelectedLinkMaterials] = useState<number[]>([]);
  const [selectedSynchroTuner, setSelectedSynchroTuner] = useState<number | null>(null);
  const [selectedSynchroNonTuners, setSelectedSynchroNonTuners] = useState<number[]>([]);
  const [selectedXyzMaterials, setSelectedXyzMaterials] = useState<number[]>([]);
  const [selectedRitualTributes, setSelectedRitualTributes] = useState<number[]>([]);
  const [graveModal, setGraveModal] = useState<{
    isOpen: boolean;
    activeZone?: 'PLAYER_GRAVE' | 'PLAYER_BANISHED' | 'OPPONENT_GRAVE' | 'OPPONENT_BANISHED';
    title?: string;
    cards?: CardInstance[];
    selectedCard?: CardInstance | null;
    searchQuery?: string;
    filterType?: 'ALL' | 'MONSTER' | 'COMPOUND' | 'EXTRA' | 'SPELL' | 'TRAP';
    showScientificBohr?: boolean;
  } | null>(null);
  const [showTributeModal, setShowTributeModal] = useState<boolean>(false);
  const [tributeTargetCard, setTributeTargetCard] = useState<CardInstance | null>(null);
  const [selectedTributeSlots, setSelectedTributeSlots] = useState<number[]>([]);
  const [summonCutIn, setSummonCutIn] = useState<{
    card: PlayableCardDef;
    type: 'COMPOUND' | 'LINK' | 'REACTION_SPELL' | 'SYNCHRO' | 'XYZ' | 'PENDULUM' | 'RITUAL';
    equation?: string;
  } | null>(null);

  // Turn Timer & Card Inspector Panel States
  const [showInspectorPanel, setShowInspectorPanel] = useState<boolean>(true);
  const [turnSecondsRemaining, setTurnSecondsRemaining] = useState<number>(60);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [trapReveal, setTrapReveal] = useState<{ card: CardInstance; message: string; actor: string } | null>(null);
  const [activeChain, setActiveChain] = useState<ResolvedChainSummary | null>(engine.lastResolvedChain);
  const [showChainOverlay, setShowChainOverlay] = useState<boolean>(true);

  // Pedagogical Combat Character Quips State & Auto-Dismiss with Priority Queue
  const [activeQuip, setActiveQuip] = useState<CharacterQuip | null>(null);
  const quipQueueRef = useRef<QuipQueueManager>(new QuipQueueManager());
  const quipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lowLpQuipTriggeredRef = useRef<boolean>(false);

  const triggerQuip = (event: QuipTriggerEvent, personaOverride?: ChemistPersona) => {
    const persona = personaOverride || CharacterQuipEngine.mapAiLevelToPersona(aiLevel, opponentState.name);
    const result = quipQueueRef.current.requestQuip(persona, event);

    if (result.action === 'DISPATCH' && result.quip) {
      sound.playCharacterPersonaChime(persona);
      setActiveQuip(result.quip);
      if (quipTimeoutRef.current) clearTimeout(quipTimeoutRef.current);
      quipTimeoutRef.current = setTimeout(() => {
        const nextQuip = quipQueueRef.current.advanceQueue();
        if (nextQuip) {
          sound.playCharacterPersonaChime(nextQuip.persona);
          setActiveQuip(nextQuip);
          quipTimeoutRef.current = setTimeout(() => {
            setActiveQuip(null);
          }, 4500);
        } else {
          setActiveQuip(null);
        }
      }, 4500);
    }
  };

  // Trigger Match Start Greeting on Mount
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerQuip('MATCH_START');
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Drag & drop state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragHoverTarget, setDragHoverTarget] = useState<string | null>(null);

  // Sync states from engine
  const [playerState, setPlayerState] = useState(engine.player);
  const [opponentState, setOpponentState] = useState(engine.opponent);
  const [environment, setEnvironment] = useState(engine.environment);
  const [phase, setPhase] = useState<DuelPhase>(engine.currentPhase);
  const [turn, setTurn] = useState<number>(engine.currentTurn);
  const [activePlayerId, setActivePlayerId] = useState<string>(engine.activePlayerId);
  const [logs, setLogs] = useState(engine.logs);
  const [outcome, setOutcome] = useState(engine.outcome);
  const [activeReplay, setActiveReplay] = useState<BattleReplayState | null>(engine.activeBattleReplay);

  const logsContainerRef = useRef<HTMLDivElement>(null);
  const matchRecordedRef = useRef<boolean>(false);

  const updateFromEngine = () => {
    setPlayerState({ ...engine.player });
    setOpponentState({ ...engine.opponent });
    setEnvironment({ ...engine.environment });
    setPhase(engine.currentPhase);
    setTurn(engine.currentTurn);
    setActivePlayerId(engine.activePlayerId);
    setLogs([...engine.logs]);
    setOutcome(engine.outcome);
    setActiveReplay(engine.activeBattleReplay ? { ...engine.activeBattleReplay } : null);
    setActiveChain(engine.lastResolvedChain ? { ...engine.lastResolvedChain } : null);
    if (engine.lastResolvedChain && engine.lastResolvedChain.items.length > 0) {
      setShowChainOverlay(true);
    }

    if (engine.outcome !== 'IN_PROGRESS' && !matchRecordedRef.current) {
      matchRecordedRef.current = true;
      if (engine.outcome === 'PLAYER_VICTORY') {
        sound.playVictory();
        triggerQuip('VICTORY');
        if (campaignStage && onCampaignStageWon) {
          onCampaignStageWon(campaignStage.id, campaignStage.rewardCardId);
        }
      } else if (engine.outcome === 'DRAW') {
        sound.playChemicalDetonation(true);
      } else {
        sound.playErrorFizzle();
        triggerQuip('DEFEAT');
      }

      // Record to Ranked Ladder & Progress Quests
      rankedEngine.recordDuelResult({
        opponentName: engine.opponent.name,
        outcome: engine.outcome === 'PLAYER_VICTORY' ? 'VICTORY' : 'DEFEAT',
        playerLpRemaining: engine.player.lp,
        opponentLpRemaining: engine.opponent.lp,
        turns: engine.currentTurn,
        reactionsTriggered: engine.logs.filter(l => l.message.includes('Phản ứng') || l.message.includes('Tổng Hợp')).length
      });

      if (onDuelFinished) {
        onDuelFinished(engine.outcome);
      }
    }

    // Check for Low LP trigger (<= 2000) during match
    if (!lowLpQuipTriggeredRef.current && (engine.player.lp <= 2000 || engine.opponent.lp <= 2000) && engine.outcome === 'IN_PROGRESS') {
      lowLpQuipTriggeredRef.current = true;
      triggerQuip('LOW_LIFE_POINTS');
    }
  };

  // Safe inner-container scrolling that NEVER scrolls the browser window
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = 0;
    }
  }, [logs]);

  // Turn Countdown Timer (30s, 60s, 90s, or 0 = Unlimited)
  useEffect(() => {
    setTurnSecondsRemaining(turnTimerSetting === 0 ? 999 : turnTimerSetting);
  }, [turn, activePlayerId, turnTimerSetting]);

  useEffect(() => {
    if (outcome !== 'IN_PROGRESS' || isTimerPaused || turnTimerSetting === 0) return;

    const timer = setInterval(() => {
      setTurnSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (activePlayerId === 'player') {
            sound.playErrorFizzle();
            setActionFeedback(`Hết ${turnTimerSetting} giây lượt đấu! Tự động chuyển Phase.`);
            setTimeout(() => {
              engine.advancePhase();
              updateFromEngine();
            }, 0);
          } else {
            setTimeout(() => {
              engine.runAiTurn();
              updateFromEngine();
            }, 0);
          }
          return turnTimerSetting;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [outcome, isTimerPaused, activePlayerId, turn, turnTimerSetting]);

  // Initialize campaign boss stage environment and opponent
  useEffect(() => {
    if (campaignStage) {
      matchRecordedRef.current = false;
      const stageAiLevel: AiLevel = campaignStage.chapterNumber <= 1 ? 'ADEPT' : (campaignStage.chapterNumber <= 3 ? 'EXPERT' : 'MENDELEEV');
      setAiLevel(stageAiLevel);
      const newEngine = new DuelEngine(playerMainDeckIds, playerExtraDeckIds, stageAiLevel, undefined, undefined, matchLpSetting);
      
      // Override boss details & environment hazard
      newEngine.opponent.name = campaignStage.bossName;
      newEngine.setEnvironment({
        ph: campaignStage.environmentHazard.ph,
        temperature: campaignStage.environmentHazard.temperatureK,
        pressure: campaignStage.environmentHazard.pressureAtm
      }, campaignStage.title);

      setEngine(newEngine);
      setPlayerState({ ...newEngine.player });
      setOpponentState({ ...newEngine.opponent });
      setEnvironment({ ...newEngine.environment });
      setPhase(newEngine.currentPhase);
      setTurn(newEngine.currentTurn);
      setActivePlayerId(newEngine.activePlayerId);
      setLogs([...newEngine.logs]);
      setOutcome(newEngine.outcome);
      setSelectedHandUid(null);
      setSelectedMonsterSlot(null);
      setSelectedLinkMaterials([]);
      setInspectCard(null);
      setActionFeedback(`Tiến vào trận chiến Boss: ${campaignStage.bossName}! Môi trường: ${campaignStage.environmentHazard.descriptionVI}`);
    }
  }, [campaignStage, playerMainDeckIds, playerExtraDeckIds, matchLpSetting]);

  const handleRestartDuel = (newAi?: AiLevel, newLp?: number, newEnv?: string) => {
    sound.playUiClick();
    matchRecordedRef.current = false;
    const lvl = newAi || aiLevel;
    const lp = newLp || matchLpSetting;
    const newEngine = new DuelEngine(playerMainDeckIds, playerExtraDeckIds, lvl, undefined, undefined, lp);
    
    // Apply environmental preset if selected
    const envChoice = newEnv || selectedEnvPreset;
    if (campaignStage) {
      newEngine.opponent.name = campaignStage.bossName;
      newEngine.setEnvironment({
        ph: campaignStage.environmentHazard.ph,
        temperature: campaignStage.environmentHazard.temperatureK,
        pressure: campaignStage.environmentHazard.pressureAtm
      }, campaignStage.title);
    } else if (envChoice === 'ACID_RAIN') {
      newEngine.setEnvironment({ ph: 2.8, temperature: 298, pressure: 1.0 }, 'Khí Quyển Mưa Axit pH 2.8');
    } else if (envChoice === 'HABER') {
      newEngine.setEnvironment({ ph: 7.0, temperature: 723, pressure: 200.0 }, 'Lò Áp Suất Cao Haber-Bosch 200 atm');
    } else if (envChoice === 'CRYO') {
      newEngine.setEnvironment({ ph: 7.0, temperature: 253, pressure: 1.0 }, 'Phòng Thí Nghiệm Siêu Lạnh -20°C');
    } else if (envChoice === 'VOLCANO') {
      newEngine.setEnvironment({ ph: 4.5, temperature: 343, pressure: 1.2 }, 'Miệng Núi Lửa Hoạt Động 70°C');
    }

    setEngine(newEngine);
    setPlayerState(newEngine.player);
    setOpponentState(newEngine.opponent);
    setEnvironment(newEngine.environment);
    setPhase(newEngine.currentPhase);
    setTurn(newEngine.currentTurn);
    setActivePlayerId(newEngine.activePlayerId);
    setLogs(newEngine.logs);
    setOutcome(newEngine.outcome);
    setActiveChain(null);
    setSelectedHandUid(null);
    setSelectedMonsterSlot(null);
    setSelectedSpellTrapSlot(null);
    setSelectedLinkMaterials([]);
    setSelectedSynchroTuner(null);
    setSelectedSynchroNonTuners([]);
    setSelectedXyzMaterials([]);
    setSelectedRitualTributes([]);
    setShowSynthesisModal(false);
    setShowTributeModal(false);
    setTributeTargetCard(null);
    setSelectedTributeSlots([]);
    setSummonCutIn(null);
    setTrapReveal(null);
    setInspectCard(null);
    setShowSurrenderModal(false);
    setShowReactionModal(false);
    setShowHandDiscardModal(false);
    setIsTimerPaused(false);
    setTurnSecondsRemaining(turnTimerSetting === 0 ? 999 : turnTimerSetting);
    setActionFeedback(`Bắt đầu trận đấu mới (${lp.toLocaleString()} LP, AI: ${lvl})!`);
    setGraveModal(null);
  };

  // Surrender Match Handler (Rulebook v10 tr. 33)
  const handleConfirmSurrender = () => {
    sound.playCrystalShatter();
    const res = engine.surrenderDuel('player');
    setShowSurrenderModal(false);
    setActionFeedback(res.message);
    triggerQuip('DEFEAT');
    updateFromEngine();
  };

  const handleAdvancePhase = () => {
    if (activePlayerId !== 'player') return;
    sound.playUiClick();
    if (phase === 'MAIN_PHASE_2' && engine.isHandSizeLimitExceeded('player')) {
      setSelectedDiscardUids([]);
      setShowHandDiscardModal(true);
      return;
    }
    engine.advancePhase();
    updateFromEngine();
    setSelectedMonsterSlot(null);
  };

  // Interactive DCSM Battlefield Chemical Reaction Executor
  const handleExecuteBattlefieldReaction = (selectedUids: string[]) => {
    sound.playUiClick();
    const result = engine.evaluateBattlefieldReaction('player', selectedUids);
    if (result.success) {
      sound.playExplosion();
      setActionFeedback(result.message);
      triggerQuip('REACTION');
    } else {
      sound.playErrorFizzle();
      setActionFeedback(result.message);
    }
    setShowReactionModal(false);
    updateFromEngine();
  };

  // Normal Summon Hand Card
  const handleSummonSelected = (position: MonsterBattlePosition) => {
    if (!selectedHandUid) return;
    const card = playerState.hand.find(c => c.uid === selectedHandUid);
    if (!card) return;

    // Check if Level > 5: opens ELEMENTA Custom Tribute Selector!
    if (card.def.level && card.def.level > 5 && card.def.effectCode !== 'ELEM_K_SUPER_BURST') {
      setTributeTargetCard(card);
      setSelectedTributeSlots([]);
      setShowTributeModal(true);
      return;
    }

    sound.playUiClick();
    const res = engine.normalSummon('player', selectedHandUid, position);
    if (res.success) {
      sound.playExplosion();
      setSelectedHandUid(null);
      setActionFeedback(res.message);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Confirm Tribute Summon with Selected Sacrifices
  const handleExecuteTributeSummon = (position: MonsterBattlePosition = 'FACE_UP_ATTACK') => {
    if (!tributeTargetCard) return;
    sound.playUiClick();
    const res = engine.normalSummon('player', tributeTargetCard.uid, position, selectedTributeSlots);
    if (res.success) {
      sound.playExplosion();
      setShowTributeModal(false);
      setTributeTargetCard(null);
      setSelectedTributeSlots([]);
      setSelectedHandUid(null);
      setActionFeedback(res.message);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Activate Spell / Trap directly from Spell/Trap Zone on Field
  const handleActivateSpellTrapFromField = (slotIndex: number) => {
    const slot = playerState.spellTrapZones[slotIndex];
    if (slot && slot.card && slot.card.def.cardType === 'TRAP') {
      setTrapReveal({
        card: slot.card,
        message: 'Bạn đã kích hoạt Bẫy Hóa Học từ sân đấu!',
        actor: 'player'
      });
      setIsTimerPaused(true);
      setTimeout(() => {
        setTrapReveal(null);
        setIsTimerPaused(false);
      }, 3000);
    }

    sound.playUiClick();
    const res = engine.activateSpellTrapFromField('player', slotIndex);
    if (res.success) {
      sound.playExplosion();
      setActionFeedback(res.message);
      setSelectedSpellTrapSlot(null);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Set Spell/Trap Face-Down
  const handleSetSpellTrap = () => {
    if (!selectedHandUid) return;
    sound.playUiClick();
    const res = engine.setSpellTrap('player', selectedHandUid);
    if (res.success) {
      sound.playCardSelect();
      setSelectedHandUid(null);
      setActionFeedback(res.message);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Activate Spell from Hand
  const handleActivateSpell = () => {
    if (!selectedHandUid) return;
    sound.playUiClick();
    const selectedCard = playerState.hand.find(c => c.uid === selectedHandUid);
    const res = engine.activateSpellFromHand('player', selectedHandUid);
    if (res.success) {
      sound.playExplosion();
      if (selectedCard?.def.id.includes('haber') || selectedCard?.def.name.includes('Haber')) {
        triggerQuip('HABER_ACTIVATION');
      } else if (selectedCard?.def.id.includes('thermite') || selectedCard?.def.name.includes('Thermite')) {
        triggerQuip('THERMITE_ACTIVATION');
      }
      if (selectedCard && (selectedCard.def.cardType === 'REACTION_SPELL' || selectedCard.def.cardType === 'FIELD_ENVIRONMENT')) {
        setSummonCutIn({
          card: selectedCard.def,
          type: 'REACTION_SPELL',
          equation: selectedCard.def.relatedEquation || selectedCard.def.effectText
        });
        setTimeout(() => setSummonCutIn(null), 2400);
      }
      setSelectedHandUid(null);
      setActionFeedback(res.message);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Change Monster Position (Rulebook v10 tr. 24)
  const handleChangePosition = (slotIdx: number, isEmz: boolean = false) => {
    sound.playUiClick();
    const res = engine.changeMonsterPosition('player', slotIdx, isEmz);
    if (res.success) {
      sound.playCardSelect();
      setActionFeedback(res.message);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Swap Iron ATK/DEF (Multivalent Redox Transition)
  const handleSwapMonsterAtkDef = (slotIdx: number) => {
    sound.playUiClick();
    const res = engine.swapMonsterAtkDef('player', slotIdx);
    if (res.success) {
      sound.playExplosion();
      setActionFeedback(res.message);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Attack Target with Visual Combat Feedback & 5-Substep Dynamic Audio
  const executeAttack = (sourceSlot: number, targetSlot: number | 'DIRECT') => {
    sound.playCardSelect();
    const res = engine.declareAttack(sourceSlot, targetSlot);
    if (res.replayTriggered) {
      sound.playUiClick();
      setSelectedMonsterSlot(null);
      setActionFeedback(res.message);
      updateFromEngine();
      return;
    }
    if (res.success) {
      sound.playExplosion();
      setSelectedMonsterSlot(null);
      setActionFeedback(res.message);

      // Section 8: Play 5 Damage Substep Acoustic Progression
      if (res.damageSubsteps && res.damageSubsteps.length > 0) {
        res.damageSubsteps.forEach((step, idx) => {
          const subNum = (idx + 1) as 1 | 2 | 3 | 4 | 5;
          setTimeout(() => {
            sound.playDamageStepSubstep(subNum);
          }, idx * 180);
        });
      }

      // Section 13.2: Check if a trap was triggered during attack declaration and present for 3 seconds
      if (res.message.includes('Bẫy') || res.message.includes('TRAP') || res.message.includes('Khói') || res.message.includes('Khiên')) {
        const oppTrap = opponentState.spellTrapZones.find(s => s && s.card && res.message.includes(s.card.def.name))?.card ||
                        opponentState.graveyard.find(c => res.message.includes(c.def.name));
        if (oppTrap) {
          setTrapReveal({
            card: oppTrap,
            message: 'Bẫy Hóa Học của Đối Thủ kích hoạt phản hồi đòn tấn công!',
            actor: 'opponent'
          });
          setIsTimerPaused(true);
          setTimeout(() => {
            setTrapReveal(null);
            setIsTimerPaused(false);
          }, 3000);
        }
      }

      if (res.damageDealt > 0 || res.damageSubsteps) {
        let vfxText = res.damageDealt > 0 ? `-${res.damageDealt} LP!` : 'HÒA SÁT THƯƠNG (0 ATK)!';
        if (res.isPiercingDamage) {
          vfxText = `⚡ XUYÊN GIÁP: -${res.piercingDamageDealt} LP!`;
        } else if (res.reflectionDamageDealt && res.reflectionDamageDealt > 0) {
          vfxText = `🛡️ PHẢN KÍCH PHÒNG THỦ: -${res.reflectionDamageDealt} LP!`;
        }
        setCombatVfx({
          active: true,
          text: vfxText,
          substeps: res.damageSubsteps
        });
        setTimeout(() => setCombatVfx(null), 2200);
      }

      // Quip on High Damage Direct Attack
      if (targetSlot === 'DIRECT' && res.damageDealt >= 1000) {
        triggerQuip('DIRECT_ATTACK');
      }
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Master Rule Battle Step Replay Execution (Rulebook v10 tr. 40)
  const handleExecuteBattleReplay = (decision: 'RETARGET' | 'DIRECT' | 'CANCEL', targetSlotIndex?: number) => {
    sound.playUiClick();
    const res = engine.executeBattleReplay(decision, targetSlotIndex);
    if (res.success) {
      if (decision !== 'CANCEL') {
        sound.playExplosion();
        if (res.damageSubsteps && res.damageSubsteps.length > 0) {
          res.damageSubsteps.forEach((step, idx) => {
            const subNum = (idx + 1) as 1 | 2 | 3 | 4 | 5;
            setTimeout(() => {
              sound.playDamageStepSubstep(subNum);
            }, idx * 180);
          });
        }
        if (res.damageDealt > 0 || res.damageSubsteps) {
          let vfxText = res.damageDealt > 0 ? `-${res.damageDealt} LP!` : 'HÒA SÁT THƯƠNG (0 ATK)!';
          if (res.isPiercingDamage) {
            vfxText = `⚡ XUYÊN GIÁP: -${res.piercingDamageDealt} LP!`;
          } else if (res.reflectionDamageDealt && res.reflectionDamageDealt > 0) {
            vfxText = `🛡️ PHẢN KÍCH PHÒNG THỦ: -${res.reflectionDamageDealt} LP!`;
          }
          setCombatVfx({
            active: true,
            text: vfxText,
            substeps: res.damageSubsteps
          });
          setTimeout(() => setCombatVfx(null), 2200);
        }
      }
      setActionFeedback(res.message);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  const handleDeclareAttack = (targetSlot: number | 'DIRECT') => {
    if (selectedMonsterSlot === null) return;
    executeAttack(selectedMonsterSlot, targetSlot);
  };

  // Compound Synthesis Execution
  const handleCompoundSynthesis = (compoundCard: CardInstance) => {
    if (!compoundCard.def.synthesisRecipe) return;
    sound.playUiClick();
    const reqs = compoundCard.def.synthesisRecipe.reactantFormulas;
    
    // Gather sources from field and hand
    const sources: { location: 'FIELD' | 'HAND'; idOrSlot: number | string }[] = [];
    for (const req of reqs) {
      for (let count = 0; count < req.count; count++) {
        // Find in player monster zones
        const fieldIdx = playerState.monsterZones.findIndex(
          (s, idx) => s && s.card && s.card.def.chemicalFormula === req.formula && !sources.some(src => src.location === 'FIELD' && src.idOrSlot === idx)
        );
        if (fieldIdx !== -1) {
          sources.push({ location: 'FIELD', idOrSlot: fieldIdx });
        } else {
          // Find in hand
          const handCard = playerState.hand.find(
            c => c.def.chemicalFormula === req.formula && !sources.some(src => src.location === 'HAND' && src.idOrSlot === c.uid)
          );
          if (handCard) {
            sources.push({ location: 'HAND', idOrSlot: handCard.uid });
          }
        }
      }
    }

    const res = engine.compoundSynthesisSummon('player', compoundCard.uid, sources);
    if (res.success) {
      sound.playExplosion();
      sound.playReactionSuccess();
      sound.triggerHaptic([60, 40, 120]);
      triggerQuip('FUSION_SUMMON');
      setShowSynthesisModal(false);
      setActionFeedback(res.message);
      setSummonCutIn({
        card: compoundCard.def,
        type: 'COMPOUND',
        equation: compoundCard.def.synthesisRecipe?.pedagogicalEquation
      });
      setTimeout(() => setSummonCutIn(null), 2400);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Link Summon Execution
  const handleExecuteLinkSummon = (linkCard: CardInstance) => {
    if (selectedLinkMaterials.length === 0) {
      setActionFeedback('Hãy chọn ít nhất 1 quái thú trên sân làm nguyên liệu Liên Kết!');
      return;
    }
    sound.playUiClick();
    const res = engine.linkSummon('player', linkCard.uid, selectedLinkMaterials);
    if (res.success) {
      sound.playExplosion();
      sound.playCrystalShatter();
      sound.playLinkSummonNetwork();
      sound.triggerHaptic([40, 30, 80]);
      triggerQuip('LINK_SUMMON');
      setShowSynthesisModal(false);
      setSelectedLinkMaterials([]);
      setActionFeedback(res.message);
      setSummonCutIn({
        card: linkCard.def,
        type: 'LINK',
        equation: `LINK-${linkCard.def.linkRating || 1} ◆ ${linkCard.def.linkMaterialsRequired?.materialType || 'Chemical Link'}`
      });
      setTimeout(() => setSummonCutIn(null), 2400);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Toggle monster selection for Link summon material
  const toggleLinkMaterial = (slotIndex: number) => {
    sound.playCardSelect();
    setSelectedLinkMaterials(prev =>
      prev.includes(slotIndex) ? prev.filter(s => s !== slotIndex) : [...prev, slotIndex]
    );
  };

  // Synchro Summon Execution
  const handleExecuteSynchroSummon = (synchroCard: CardInstance) => {
    if (selectedSynchroTuner === null || selectedSynchroNonTuners.length === 0) {
      setActionFeedback('Hãy chọn 1 Quái Thú Điều Nhịp (Tuner) và ít nhất 1 Quái Thú Phi Điều Nhịp (Non-Tuner)!');
      return;
    }
    const extraIndex = playerState.extraDeck.findIndex(c => c.uid === synchroCard.uid);
    if (extraIndex === -1) return;

    const emptySlot = playerState.monsterZones.findIndex(s => s === null || s.card === null);
    if (emptySlot === -1 && playerState.extraMonsterZone?.card !== null) {
      setActionFeedback('Không còn ô quái thú trống!');
      return;
    }
    const targetSlot = emptySlot !== -1 ? emptySlot : 0;
    const useEmz = emptySlot === -1;

    sound.playUiClick();
    const res = engine.synchroSummon(
      'player',
      extraIndex,
      targetSlot,
      selectedSynchroTuner,
      selectedSynchroNonTuners,
      useEmz
    );
    if (res.success) {
      sound.playExplosion();
      sound.playSynchroSummonFanfare();
      sound.triggerHaptic([50, 40, 100]);
      triggerQuip('SYNCHRO_SUMMON');
      setShowSynthesisModal(false);
      setSelectedSynchroTuner(null);
      setSelectedSynchroNonTuners([]);
      setActionFeedback(res.message);
      setSummonCutIn({
        card: synchroCard.def,
        type: 'SYNCHRO',
        equation: `★${synchroCard.def.synchroLevel || synchroCard.def.level} SYNCHRO ◆ Tuner + Non-Tuner`
      });
      setTimeout(() => setSummonCutIn(null), 2500);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Xyz Summon Execution
  const handleExecuteXyzSummon = (xyzCard: CardInstance) => {
    if (selectedXyzMaterials.length < 2) {
      setActionFeedback('Hãy chọn ít nhất 2 quái thú cùng Cấp trên sân làm nguyên liệu Chồng Lớp (Overlay)!');
      return;
    }
    const extraIndex = playerState.extraDeck.findIndex(c => c.uid === xyzCard.uid);
    if (extraIndex === -1) return;

    const emptySlot = playerState.monsterZones.findIndex(s => s === null || s.card === null);
    if (emptySlot === -1 && playerState.extraMonsterZone?.card !== null) {
      setActionFeedback('Không còn ô quái thú trống!');
      return;
    }
    const targetSlot = emptySlot !== -1 ? emptySlot : 0;
    const useEmz = emptySlot === -1;

    sound.playUiClick();
    const res = engine.xyzSummon(
      'player',
      extraIndex,
      targetSlot,
      selectedXyzMaterials,
      useEmz
    );
    if (res.success) {
      sound.playExplosion();
      sound.playXyzSummonGalaxy();
      sound.triggerHaptic([60, 30, 90]);
      triggerQuip('XYZ_SUMMON');
      setShowSynthesisModal(false);
      setSelectedXyzMaterials([]);
      setActionFeedback(res.message);
      setSummonCutIn({
        card: xyzCard.def,
        type: 'XYZ',
        equation: `⬡ RANK ${xyzCard.def.xyzRank || 4} XYZ ◆ ${selectedXyzMaterials.length} Materials Overlay`
      });
      setTimeout(() => setSummonCutIn(null), 2500);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Ritual Summon Execution
  const handleExecuteRitualSummon = (ritualMonsterCard: CardInstance) => {
    const ritualSpell = playerState.hand.find(
      c => c.def.spellTrapSubtype === 'RITUAL_SPELL' || c.def.id === 'card_spell_crystallization_ritual'
    );
    if (!ritualSpell) {
      setActionFeedback('Cần có Thẻ Phép Nghi Thức (Ritual Spell) trên tay để tiến hành!');
      return;
    }

    if (selectedRitualTributes.length === 0) {
      setActionFeedback('Hãy chọn quái thú trên sân để Hiến Tế làm lễ vật!');
      return;
    }
    const emptySlot = playerState.monsterZones.findIndex(s => s === null || s.card === null);
    if (emptySlot === -1) {
      setActionFeedback('Không còn ô quái thú trống trên sân!');
      return;
    }

    sound.playUiClick();
    const res = engine.ritualSummon(
      'player',
      ritualMonsterCard.uid,
      ritualSpell.uid,
      selectedRitualTributes,
      emptySlot
    );
    if (res.success) {
      sound.playExplosion();
      sound.playRitualAltarChant();
      sound.triggerHaptic([50, 50, 120]);
      triggerQuip('RITUAL_SUMMON');
      setShowSynthesisModal(false);
      setSelectedRitualTributes([]);
      setActionFeedback(res.message);
      setSummonCutIn({
        card: ritualMonsterCard.def,
        type: 'RITUAL',
        equation: `🕯️ RITUAL SUMMON ◆ Cấp ${ritualMonsterCard.def.level}★`
      });
      setTimeout(() => setSummonCutIn(null), 2500);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Place Pendulum Scale from Hand
  const handlePlacePendulumScale = (card: CardInstance, zone: 'left' | 'right') => {
    sound.playUiClick();
    const res = engine.placePendulumScale('player', card.uid, zone);
    if (res.success) {
      sound.playCrystalShatter();
      setSelectedHandUid(null);
      setActionFeedback(res.message);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Execute Pendulum Summon
  const handleExecutePendulumSummon = () => {
    if (!playerState.pendulumZones?.left || !playerState.pendulumZones?.right) {
      setActionFeedback('Cần thiết lập cả 2 Thang Đo Dao Động (Left & Right) trước!');
      return;
    }
    if (playerState.hasPendulumSummonedThisTurn) {
      setActionFeedback('Mỗi lượt chỉ được Triệu Hồi Dao Động 1 lần!');
      return;
    }
    const leftScale = playerState.pendulumZones.left.def.pendulumScale || 1;
    const rightScale = playerState.pendulumZones.right.def.pendulumScale || 1;
    const low = Math.min(leftScale, rightScale);
    const high = Math.max(leftScale, rightScale);

    // Collect eligible monsters from Hand and face-up Extra Deck
    const eligibleHand = playerState.hand
      .filter(c => {
        const lvl = c.def.level || 0;
        return (c.def.cardType === 'ELEMENT_MONSTER' || c.def.cardType === 'PENDULUM_MONSTER' || c.def.cardType === 'COMPOUND_MONSTER') && lvl > low && lvl < high;
      });

    const eligibleExtra = playerState.extraDeck
      .filter(c => {
        const lvl = c.def.level || 0;
        return c.isFaceUpInExtraDeck && lvl > low && lvl < high;
      });

    if (eligibleHand.length === 0 && eligibleExtra.length === 0) {
      setActionFeedback(`Không có quái thú nào có Cấp giữa Thang Đo ${low} và ${high}!`);
      return;
    }

    sound.playUiClick();
    const res = engine.pendulumSummon('player', {
      handUids: eligibleHand.map(c => c.uid),
      extraDeckUids: eligibleExtra.map(c => c.uid)
    });
    if (res.success) {
      sound.playExplosion();
      sound.playPendulumSwarmChord();
      sound.triggerHaptic([50, 40, 100]);
      triggerQuip('PENDULUM_SUMMON');
      setActionFeedback(res.message);
      const firstCard = eligibleHand[0]?.def || eligibleExtra[0]?.def;
      if (firstCard) {
        setSummonCutIn({
          card: firstCard,
          type: 'PENDULUM',
          equation: `⬡ PENDULUM SUMMON ◆ Thang Đo [${low} ↔ ${high}]`
        });
        setTimeout(() => setSummonCutIn(null), 2500);
      }
    } else {
      sound.playErrorFizzle();
      setActionFeedback(res.message);
    }
    updateFromEngine();
  };

  // Drag & Drop Handlers
  const handleHandCardDragStart = (uid: string, e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'HAND_CARD', uid }));
    setSelectedHandUid(uid);
  };

  const handleMonsterDragStart = (slotIndex: number, e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'MONSTER_SLOT', slotIndex }));
    setSelectedMonsterSlot(slotIndex);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragHoverTarget(null);
  };

  const handleDropOnPlayerMonsterZone = (slotIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragHoverTarget(null);
    const dataStr = e.dataTransfer.getData('text/plain');
    if (!dataStr) return;
    try {
      const data = JSON.parse(dataStr);
      if (data.type === 'HAND_CARD') {
        const handCard = playerState.hand.find(c => c.uid === data.uid);
        if (!handCard) return;
        if (handCard.def.cardType === 'ELEMENT_MONSTER' || handCard.def.cardType === 'COMPOUND_MONSTER') {
          sound.playUiClick();
          const res = engine.normalSummon('player', handCard.uid, 'FACE_UP_ATTACK');
          if (res.success) sound.playExplosion();
          else sound.playErrorFizzle();
          setActionFeedback(res.message);
          setSelectedHandUid(null);
          updateFromEngine();
        }
      } else if (data.type === 'MONSTER_SLOT') {
        const sourceSlot = typeof data.slotIndex === 'number' ? data.slotIndex : parseInt(data.slotIndex, 10);
        if (sourceSlot === slotIndex) return; // Same slot, ignore
        
        // DRAG TO COMBINE / FUSE (Ghép/Dung hợp 2 quái thú trên sân)
        const srcSlot = playerState.monsterZones[sourceSlot];
        const tgtSlot = playerState.monsterZones[slotIndex];
        if (srcSlot && srcSlot.card && tgtSlot && tgtSlot.card) {
          const srcFormula = srcSlot.card.def.chemicalFormula || '';
          const tgtFormula = tgtSlot.card.def.chemicalFormula || '';
          sound.playCardSelect();

          // 1. Kiểm tra xem có Hợp Chất nào khớp với 2 nguyên tố này không
          const matchingCompound = playerState.extraDeck.find(compound => {
            if (compound.def.cardType !== 'COMPOUND_MONSTER' || !compound.def.synthesisRecipe) return false;
            const reqFormulas = compound.def.synthesisRecipe.reactantFormulas.map(r => r.formula);
            return reqFormulas.includes(srcFormula) && reqFormulas.includes(tgtFormula);
          });

          if (matchingCompound && playerState.mana >= matchingCompound.def.manaCost) {
            handleCompoundSynthesis(matchingCompound);
            return;
          }

          // 2. Kiểm tra xem có thể triệu hồi Link-2 từ 2 quái thú này không
          const link2 = playerState.extraDeck.find(c => c.def.cardType === 'LINK_MONSTER' && c.def.linkRating === 2);
          if (link2 && playerState.mana >= link2.def.manaCost) {
            const res = engine.linkSummon('player', link2.uid, [sourceSlot, slotIndex]);
            if (res.success) {
              sound.playExplosion();
              setActionFeedback(`[Dung Hợp Liên Kết] Ghép ${srcSlot.card.def.name} + ${tgtSlot.card.def.name} → ${link2.def.name}!`);
            } else {
              sound.playErrorFizzle();
              setActionFeedback(res.message);
            }
            updateFromEngine();
            return;
          }

          // 3. Mở Lò Phản Ứng với 2 quái thú được chọn sẵn
          setSelectedLinkMaterials([sourceSlot, slotIndex]);
          setShowSynthesisModal(true);
          setActionFeedback(`Đã kết hợp Ô ${sourceSlot + 1} (${srcFormula}) và Ô ${slotIndex + 1} (${tgtFormula})! Hãy chọn sản phẩm tổng hợp.`);
        }
      }
    } catch (err) {}
  };

  const handleDropOnPlayerSpellTrapZone = (slotIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragHoverTarget(null);
    const dataStr = e.dataTransfer.getData('text/plain');
    if (!dataStr) return;
    try {
      const data = JSON.parse(dataStr);
      if (data.type === 'HAND_CARD') {
        const handCard = playerState.hand.find(c => c.uid === data.uid);
        if (!handCard) return;
        if (handCard.def.cardType === 'TRAP') {
          const res = engine.setSpellTrap('player', handCard.uid);
          if (res.success) sound.playCardSelect();
          else sound.playErrorFizzle();
          setActionFeedback(res.message);
          setSelectedHandUid(null);
          updateFromEngine();
        } else if (handCard.def.cardType === 'REACTION_SPELL' || handCard.def.cardType === 'EQUIP_CATALYST' || handCard.def.cardType === 'FIELD_ENVIRONMENT') {
          const res = engine.activateSpellFromHand('player', handCard.uid);
          if (res.success) {
            sound.playExplosion();
            if (handCard.def.id.includes('haber') || handCard.def.name.includes('Haber')) {
              triggerQuip('HABER_ACTIVATION');
            } else if (handCard.def.id.includes('thermite') || handCard.def.name.includes('Thermite')) {
              triggerQuip('THERMITE_ACTIVATION');
            }
            if (handCard.def.cardType === 'REACTION_SPELL' || handCard.def.cardType === 'FIELD_ENVIRONMENT') {
              setSummonCutIn({
                card: handCard.def,
                type: 'REACTION_SPELL',
                equation: handCard.def.relatedEquation || handCard.def.effectText
              });
              setTimeout(() => setSummonCutIn(null), 2400);
            }
          } else {
            sound.playErrorFizzle();
          }
          setActionFeedback(res.message);
          setSelectedHandUid(null);
          updateFromEngine();
        }
      }
    } catch (err) {}
  };

  const handleDropOnOpponentMonsterZone = (targetIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragHoverTarget(null);
    const dataStr = e.dataTransfer.getData('text/plain');
    if (!dataStr) return;
    try {
      const data = JSON.parse(dataStr);
      if (data.type === 'MONSTER_SLOT') {
        const sourceIndex = typeof data.slotIndex === 'number' ? data.slotIndex : parseInt(data.slotIndex, 10);
        executeAttack(sourceIndex, targetIndex);
      }
    } catch (err) {}
  };

  const handleDropOnOpponentField = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragHoverTarget(null);
    const dataStr = e.dataTransfer.getData('text/plain');
    if (!dataStr) return;
    try {
      const data = JSON.parse(dataStr);
      if (data.type === 'MONSTER_SLOT') {
        const sourceIndex = typeof data.slotIndex === 'number' ? data.slotIndex : parseInt(data.slotIndex, 10);
        executeAttack(sourceIndex, 'DIRECT');
      }
    } catch (err) {}
  };

  // Selected hand card reference
  const selectedCard = selectedHandUid ? playerState.hand.find(c => c.uid === selectedHandUid) : null;

  return (
    <div className="min-h-screen bg-obsidian text-ivory flex flex-col p-2 max-w-7xl mx-auto select-none">
      {/* Top Banner: Duel Status, Turn, Phase Machine & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-navy/60 border border-navy-light/40 backdrop-blur-md mb-2">
        {/* Opponent Profile & LP */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-amber-700 flex items-center justify-center font-bold text-white shadow-md border border-red-400/40">
            AI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-200">{opponentState.name}</span>
              <select
                value={aiLevel}
                onChange={(e) => handleRestartDuel(e.target.value as AiLevel)}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 border border-red-500/40 cursor-pointer focus:outline-none hover:border-red-400"
                title="Chọn độ khó của AI Đối Thủ"
              >
                <option value="NOVICE">Novice (Tân Thủ)</option>
                <option value="ADEPT">Adept (Tiêu Chuẩn)</option>
                <option value="EXPERT">Expert (Chuyên Gia)</option>
                <option value="MENDELEEV">Mendeleev (Đại Sư)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-black text-red-400">
                {opponentState.lp.toLocaleString()} LP
              </span>
              <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${Math.max(0, Math.min(100, (opponentState.lp / 8000) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center: Phase Flow Indicator */}
        <div className="flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono font-bold">
          {(['DRAW_PHASE', 'STANDBY_PHASE', 'MAIN_PHASE_1', 'BATTLE_PHASE', 'MAIN_PHASE_2', 'END_PHASE'] as DuelPhase[]).map((p) => {
            const isCurrent = phase === p;
            const label = p.replace('_PHASE', '').replace('_', ' ');
            return (
              <div
                key={p}
                className={`px-2 py-0.5 rounded transition-all ${
                  isCurrent
                    ? 'bg-cyan-ion text-obsidian font-black shadow-md shadow-cyan-ion/40 scale-105'
                    : 'text-slate-400'
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* Fast Effect Timing Box Badge (Rulebook v10 tr. 44-47) */}
        {engine.fastEffectTimingBox && (
          <div
            className={`hidden md:flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-all ${
              engine.fastEffectTimingBox === 'BOX_A_OPEN_GAME_STATE'
                ? 'bg-slate-800/80 text-slate-300 border-white/10'
                : engine.fastEffectTimingBox === 'BOX_E_CHAIN_RESOLUTION'
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/50 animate-pulse'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40 animate-pulse'
            }`}
            title={`Trạng thái kích hoạt hiệu ứng nhanh: ${engine.fastEffectTimingBox}`}
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>
              {engine.fastEffectTimingBox === 'BOX_A_OPEN_GAME_STATE'
                ? 'Box A: Open State'
                : engine.fastEffectTimingBox === 'BOX_C_TURN_PLAYER_FAST'
                ? 'Box C: Player Fast'
                : engine.fastEffectTimingBox === 'BOX_D_OPPONENT_FAST'
                ? 'Box D: AI Fast'
                : engine.fastEffectTimingBox === 'BOX_E_CHAIN_RESOLUTION'
                ? 'Box E: Chuỗi LIFO'
                : 'Box B: Trigger'}
            </span>
          </div>
        )}

        {/* Player LP & Controls */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="font-bold text-sm text-cyan-200">{playerState.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-ion border border-cyan-500/30">
                Lượt {turn}
              </span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                  style={{ width: `${Math.max(0, Math.min(100, (playerState.lp / 8000) * 100))}%` }}
                />
              </div>
              <span className="font-mono text-lg font-black text-cyan-ion">
                {playerState.lp.toLocaleString()} LP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Section 6: 60-Second Turn Countdown Timer */}
            <div className="flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-lg border border-white/10 font-mono">
              <Clock className={`w-3.5 h-3.5 ${
                turnSecondsRemaining > 30
                  ? 'text-emerald-400'
                  : turnSecondsRemaining > 15
                  ? 'text-amber-400 animate-pulse'
                  : 'text-red-500 animate-bounce'
              }`} />
              <div className="flex flex-col">
                <div className="flex items-center justify-between text-[9px] text-slate-400 leading-none">
                  <span>{activePlayerId === 'player' ? 'Lượt bạn' : 'Lượt AI'}:</span>
                  <span className={`font-bold ml-1 ${
                    turnSecondsRemaining > 30 ? 'text-emerald-400' : turnSecondsRemaining > 15 ? 'text-amber-400' : 'text-red-500 font-black'
                  }`}>
                    {turnSecondsRemaining}s
                  </span>
                </div>
                <div className="w-16 h-1 rounded-full bg-slate-800 overflow-hidden mt-0.5">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      turnSecondsRemaining > 30
                        ? 'bg-emerald-400'
                        : turnSecondsRemaining > 15
                        ? 'bg-amber-400'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(turnSecondsRemaining / 60) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Section 4.3: Toggle Card Inspector Button */}
            <button
              onClick={() => {
                sound.playUiClick();
                setShowInspectorPanel(!showInspectorPanel);
              }}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1 transition-all ${
                showInspectorPanel
                  ? 'bg-cyan-950/80 border-cyan-ion text-cyan-200 shadow-sm shadow-cyan-ion/30'
                  : 'bg-slate-800 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Bật/Tắt panel chi tiết lá bài để tối ưu không gian bàn đấu"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Thông Tin Thẻ: {showInspectorPanel ? 'BẬT' : 'TẮT'}</span>
            </button>

            {/* Visual Chain Overlay Toggle Button */}
            {activeChain && activeChain.items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  sound.playUiClick();
                  setShowChainOverlay(!showChainOverlay);
                }}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  showChainOverlay
                    ? 'bg-amber-950/80 border-amber-400 text-amber-200 shadow-sm shadow-amber-400/30 ring-1 ring-amber-400/50'
                    : 'bg-slate-800 border-white/10 text-amber-400/80 hover:text-amber-300'
                }`}
                title="Bật/Tắt Lịch Sử Chuỗi Phản Ứng (LIFO Chain Stack)"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Chuỗi ({activeChain.items.length})</span>
              </button>
            )}

            {/* Duel Room Match Settings Button */}
            <button
              type="button"
              onClick={() => {
                sound.playUiClick();
                setIsMatchSettingsModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow"
              title="Cài đặt phòng đấu: LP (4000/8000), Thời gian lượt, Cấp độ AI và Môi trường"
            >
              <Settings className="w-3.5 h-3.5 text-cyan-400" />
              <span>Thiết Lập</span>
            </button>

            {/* Deck Tutor / Card Extraction Search Button */}
            <button
              type="button"
              onClick={() => {
                sound.playUiClick();
                setIsDeckTutorModalOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/60 text-purple-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow"
              title="Chiết tách & Tìm kiếm thẻ bài từ Bộ Bài chính"
            >
              <Search className="w-3.5 h-3.5 text-purple-400" />
              <span>Chiết Tách ({playerState.deck.length})</span>
            </button>

            {/* Interactive DCSM Battlefield Chemical Reaction Button */}
            {activePlayerId === 'player' && outcome === 'IN_PROGRESS' && (phase === 'MAIN_PHASE_1' || phase === 'MAIN_PHASE_2') && (
              <button
                type="button"
                onClick={() => {
                  sound.playUiClick();
                  setShowReactionModal(true);
                }}
                className="px-2.5 py-1.5 rounded-lg border border-teal-400/50 bg-gradient-to-r from-teal-950/70 to-cyan-950/70 hover:from-teal-900/80 hover:to-cyan-900/80 text-teal-200 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md hover:scale-105 active:scale-95"
                title="Kích hoạt Phản ứng Hóa học trực tiếp giữa các nguyên tố trên sân và bài trên tay theo động học DCSM"
              >
                <FlaskConical className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                <span>Phản Ứng (DCSM)</span>
              </button>
            )}

            {activePlayerId === 'player' && outcome === 'IN_PROGRESS' && (
              <button
                onClick={handleAdvancePhase}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-obsidian font-black text-xs shadow-md transition-all flex items-center gap-1"
              >
                <span>{phase === 'MAIN_PHASE_2' ? 'Kết Thúc Lượt' : 'Tiếp Theo'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* Fast Effect Priority Pass Button */}
            {outcome === 'IN_PROGRESS' && engine.priorityPlayerId === 'player' && (engine.fastEffectTimingBox !== 'BOX_A_OPEN_GAME_STATE' || engine.chainStack.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  sound.playUiClick();
                  const passRes = engine.passPriority('player');
                  if (!passRes.chainResolved && engine.priorityPlayerId === 'opponent') {
                    engine.aiEvaluateAndRespondPriority();
                  }
                  updateFromEngine();
                }}
                className="px-2.5 py-1.5 rounded-lg border border-amber-500/50 bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow animate-pulse"
                title="Nhường Quyền Ưu Tiên (Pass Priority) khi đối thủ hoặc bạn có thể kích hoạt hiệu ứng nhanh"
              >
                <FastForward className="w-3.5 h-3.5 text-amber-400" />
                <span>Nhường Ưu Tiên</span>
              </button>
            )}

            {/* Surrender / Concede Duel Button */}
            {outcome === 'IN_PROGRESS' && (
              <button
                type="button"
                onClick={() => {
                  sound.playUiClick();
                  setShowSurrenderModal(true);
                }}
                className="px-2.5 py-1.5 rounded-lg border border-red-500/30 bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow"
                title="Đầu hàng trận đấu hiện tại"
              >
                <Flag className="w-3.5 h-3.5 text-red-400" />
                <span>Đầu Hàng</span>
              </button>
            )}

            <button
              onClick={() => handleRestartDuel()}
              title="Tái tạo lại trận đấu (Làm mới toàn bộ điểm gốc LP, xáo lại bộ bài và bắt đầu ván mới)"
              className="px-2.5 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/90 text-red-200 hover:text-white border border-red-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Tái Tạo Trận Đấu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 8.3: Deck Validation Warning if deck < 30 cards */}
      {playerMainDeckIds.length < 30 && (
        <div className="p-3 mb-2 rounded-xl bg-red-950/80 border-2 border-red-500 text-red-200 text-xs font-mono flex items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <div className="font-bold text-red-300">CẢNH BÁO QUẢN TRỊ BỘ BÀI: CHƯA ĐẠT CHUẨN 30 LÁ!</div>
              <div className="text-[11px] text-red-400">
                Main Deck hiện tại chỉ có {playerMainDeckIds.length}/30 lá. Đang tự động sử dụng cấu hình bài dự phòng chuẩn của Quân Đoàn Nitơ để tiến hành trận đấu.
              </div>
            </div>
          </div>
          {openTutorial && (
            <button
              onClick={openTutorial}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-black text-xs shrink-0 shadow-md transition-all"
            >
              Xem Huấn Luyện Deck
            </button>
          )}
        </div>
      )}

      {/* Section 8.4: Campaign Boss Encounter Banner */}
      {campaignStage && (
        <div className="mb-2 p-3 rounded-xl bg-gradient-to-r from-red-950/80 via-purple-950/70 to-slate-900 border border-red-500/40 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center font-black text-white shadow-lg border border-red-400/50">
              CH{campaignStage.chapterNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-red-400 font-bold">CHIẾN DỊCH TRÙM CUỐI</span>
                <span className="text-white font-black text-sm">{campaignStage.title}</span>
                <span className="px-1.5 py-0.5 rounded bg-red-900/60 border border-red-500/40 text-red-200 text-[10px] font-mono">
                  {campaignStage.bossName} ({campaignStage.bossTitle})
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-300 text-[11px] mt-0.5">
                <span className="text-amber-300">⚠️ {campaignStage.environmentHazard.combatModifierVI}</span>
                <span className="text-slate-400">| Phần thưởng vượt ải: {campaignStage.rewardCardName}</span>
              </div>
            </div>
          </div>

          {onExitCampaignDuel && (
            <button
              onClick={() => {
                sound.playUiClick();
                onExitCampaignDuel();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all flex items-center gap-1.5"
            >
              <span>Về Bản Đồ Chiến Dịch</span>
            </button>
          )}
        </div>
      )}

      {/* Live Chemical Environment Telemetry HUD */}
      <div className="mb-2">
        <ChemicalEnvironmentHud environment={environment} />
      </div>

      {/* Interactive Fast Effect / Chain Timing Window Banner (Yu-Gi-Oh! Rulebook v10 tr. 44-47) */}
      {outcome === 'IN_PROGRESS' && (engine.fastEffectTimingBox !== 'BOX_A_OPEN_GAME_STATE' || engine.chainStack.length > 0) && (
        <div className={`mb-2 p-3 rounded-xl border backdrop-blur-md shadow-xl transition-all flex flex-col gap-2 ${
          engine.chainStack.length > 0
            ? 'bg-gradient-to-r from-amber-950/90 via-slate-900/95 to-slate-900/95 border-amber-400/80 ring-1 ring-amber-400/40'
            : 'bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-slate-900/95 border-cyan-400/80 ring-1 ring-cyan-400/30'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${engine.chainStack.length > 0 ? 'text-amber-400 animate-bounce' : 'text-cyan-400 animate-pulse'}`} />
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
                  {engine.chainStack.length > 0
                    ? `CHUỖI HIỆU ỨNG (ACTIVE CHAIN) — LINK ${engine.chainStack.length}`
                    : 'THỜI ĐIỂM HIỆU ỨNG NHANH (FAST EFFECT TIMING)'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                  engine.priorityPlayerId === 'player'
                    ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-300 animate-pulse'
                    : 'bg-amber-950/90 border-amber-500/60 text-amber-300'
                }`}>
                  {engine.priorityPlayerId === 'player' ? '★ LƯỢT ƯU TIÊN CỦA BẠN' : '⏳ ĐỐI THỦ ĐANG GIỮ ƯU TIÊN'}
                </span>
              </div>
            </div>

            {/* Quick Action Button for Priority Player */}
            {engine.priorityPlayerId === 'player' && (
              <button
                type="button"
                onClick={() => {
                  sound.playUiClick();
                  const passRes = engine.passPriority('player');
                  if (!passRes.chainResolved && engine.priorityPlayerId === 'opponent') {
                    engine.aiEvaluateAndRespondPriority();
                  }
                  updateFromEngine();
                }}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-obsidian font-mono font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>{engine.chainStack.length > 0 ? 'Nhường Ưu Tiên ➔ Giải Quyết Chuỗi' : 'Nhường Ưu Tiên (Pass Priority)'}</span>
              </button>
            )}
          </div>

          {/* Active Chain Details or Timing Box Context */}
          {engine.chainStack.length > 0 ? (
            <div className="flex flex-col gap-1.5 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-2 text-slate-300">
                <span className="text-amber-400 font-bold">
                  Mắt xích Link {engine.chainStack.length}:
                </span>
                <span className="text-white font-bold">
                  {engine.chainStack[engine.chainStack.length - 1].cardInstance.def.name}
                  {engine.chainStack[engine.chainStack.length - 1].cardInstance.def.chemicalFormula && ` (${engine.chainStack[engine.chainStack.length - 1].cardInstance.def.chemicalFormula})`}
                </span>
                <span className="text-slate-400">
                  bởi {engine.chainStack[engine.chainStack.length - 1].activatorPlayerId === 'player' ? 'Bản Thân' : opponentState.name}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-950 border border-amber-500/40 text-amber-300 text-[10px]">
                  Tốc độ SS{engine.chainStack[engine.chainStack.length - 1].spellSpeed}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 italic">
                "{engine.chainStack[engine.chainStack.length - 1].description}"
              </div>
            </div>
          ) : (
            <div className="text-[11px] font-mono text-slate-300">
              {engine.fastEffectTimingBox === 'BOX_C_TURN_PLAYER_FAST' && 'Box C: Bạn có thể kích hoạt thẻ Phép Nhanh hoặc Cạm Bẫy (Tốc độ SS2/SS3) trước khi đối thủ hành động.'}
              {engine.fastEffectTimingBox === 'BOX_D_OPPONENT_FAST' && 'Box D: Lượt ưu tiên chuyển sang Đối Thủ để kích hoạt Fast Effect.'}
              {engine.fastEffectTimingBox === 'BOX_B_ACTION_TRIGGER_CHECK' && 'Box B: Đang kiểm tra các hiệu ứng tự kích hoạt (Trigger Effects) sau hành động vừa xảy ra.'}
            </div>
          )}

          {/* Eligible Responding Cards Quick Bar */}
          {engine.priorityPlayerId === 'player' && (() => {
            const eligible = engine.getEligibleFastEffects('player');
            if (eligible.length === 0) return null;
            return (
              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-white/10">
                <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Lá bài có thể kích hoạt phản ứng ({eligible.length}):
                </span>
                {eligible.map(card => {
                  const isHand = playerState.hand.some(h => h.uid === card.uid);
                  const fieldSlotIdx = playerState.spellTrapZones.findIndex(s => s && s.card && s.card.uid === card.uid);
                  return (
                    <button
                      key={card.uid}
                      type="button"
                      onClick={() => {
                        sound.playUiClick();
                        if (isHand) {
                          const res = engine.activateSpellFromHand('player', card.uid);
                          if (res.success) {
                            sound.playExplosion();
                            setActionFeedback(res.message);
                          } else {
                            sound.playErrorFizzle();
                            setActionFeedback(res.message);
                          }
                        } else if (fieldSlotIdx >= 0) {
                          handleActivateSpellTrapFromField(fieldSlotIdx);
                        }
                        updateFromEngine();
                      }}
                      className="px-2 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-200 text-[11px] font-mono font-bold flex items-center gap-1 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>⚡ {card.def.name}</span>
                      <span className="text-[9px] text-emerald-400 opacity-75">
                        ({isHand ? 'Tay' : `Sân ô ${fieldSlotIdx + 1}`})
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* Main Duel Field Layout: Adaptable based on Inspector Toggle */}
      <div className={`grid grid-cols-1 ${showInspectorPanel ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-2 flex-1`}>
        {/* Arena Boards (Opponent + Player) */}
        <div className={`${showInspectorPanel ? 'lg:col-span-3' : 'lg:col-span-2'} flex flex-col gap-2 overflow-x-auto pb-1`}>
          {/* ========================================= */}
          {/* OPPONENT BOARD (TOP)                      */}
          {/* ========================================= */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragHoverTarget('opp_direct');
            }}
            onDragLeave={() => setDragHoverTarget(null)}
            onDrop={handleDropOnOpponentField}
            className={`p-3 rounded-xl bg-gradient-to-b from-red-950/20 to-slate-900/60 border transition-all flex flex-col gap-2 relative min-w-[520px] ${
              dragHoverTarget === 'opp_direct' ? 'ring-2 ring-red-500 border-red-500 bg-red-950/30' : 'border-red-900/30'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-red-400" />
                SÂN ĐẤU ĐỐI THỦ: {opponentState.name}
              </span>
              <div className="flex items-center gap-2">
                <span>Mana: {opponentState.mana}/{opponentState.maxMana}</span>
                {opponentState.frozenMana && opponentState.frozenMana > 0 && (
                  <span className="px-1.5 py-0.2 rounded bg-sky-950/80 border border-sky-500/50 text-sky-300 text-[10px]">
                    ❄️ Đóng Băng: {opponentState.frozenMana}
                  </span>
                )}
                {/* Opponent Grave & Banished Badges */}
                <button
                  onClick={() => setGraveModal({
                    isOpen: true,
                    activeZone: 'OPPONENT_GRAVE',
                    title: 'Mộ Bài Đối Thủ (Opponent Graveyard)',
                    cards: opponentState.graveyard,
                    filterType: 'ALL',
                    searchQuery: ''
                  })}
                  className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 border border-white/10 text-[10px] flex items-center gap-1"
                >
                  <Skull className="w-3 h-3 text-slate-500" />
                  Mộ ({opponentState.graveyard.length})
                </button>
                <button
                  onClick={() => setGraveModal({
                    isOpen: true,
                    activeZone: 'OPPONENT_BANISHED',
                    title: 'Vùng Bị Loại Của Đối Thủ (Opponent Banished)',
                    cards: opponentState.banished,
                    filterType: 'ALL',
                    searchQuery: ''
                  })}
                  className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 border border-white/10 text-[10px] flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3 text-purple-400" />
                  Loại ({opponentState.banished.length})
                </button>
                {/* Opponent Field Zone (Rulebook v10 tr. 28) */}
                {opponentState.fieldZone ? (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-950/80 border border-rose-500/50 shadow-sm shadow-rose-500/20">
                    <span className="text-[10px] font-mono text-rose-300 font-bold flex items-center gap-1">
                      🌐 {opponentState.fieldZone.isFaceDown ? 'ĐỊA BÀN ĐỐI THỦ: [ÚP]' : `ĐỊA BÀN: ${opponentState.fieldZone.def.name}`}
                    </span>
                  </div>
                ) : (
                  <div className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/40 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <span>🌐 Field Zone: Trống</span>
                  </div>
                )}
                {/* Opponent Lingering Effects (Rulebook v10 tr. 31, 54) */}
                {opponentState.lingeringEffects && opponentState.lingeringEffects.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {opponentState.lingeringEffects.map(effect => (
                      <div
                        key={effect.id}
                        className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1 shadow-sm shadow-amber-500/20"
                        title={effect.description}
                      >
                        <span>⏳ {effect.sourceCardName}: {effect.durationTurns} lượt</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Opponent Spell/Trap Zones (Row 1) */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {opponentState.spellTrapZones.map((slot, idx) => {
                const isLeftScale = idx === 0;
                const isRightScale = idx === 4;
                const pendCard = isLeftScale ? opponentState.pendulumZones?.left : isRightScale ? opponentState.pendulumZones?.right : null;
                return (
                  <div
                    key={`opp_st_${idx}`}
                    className={`h-28 rounded-lg border flex flex-col items-center justify-center p-1 relative ${
                      pendCard
                        ? 'border-emerald-500/80 bg-emerald-950/40 shadow-sm shadow-emerald-500/20'
                        : slot && slot.card
                        ? 'border-red-900/60 bg-black/50'
                        : 'border-dashed border-red-900/40 bg-black/40'
                    }`}
                  >
                    {slot && slot.card ? (
                      <div className="w-full h-full flex flex-col items-center justify-between">
                        <ChemicalCardView card={slot.card.def} size="sm" isFaceDown={!slot.isFaceUp} />
                        {slot.isFaceUp && (
                          <div className="w-full flex items-center justify-center gap-0.5">
                            {slot.card.def.spellTrapSubtype === 'CONTINUOUS_SPELL' ? (
                              <span className="px-1 py-0.5 rounded bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-[7px] font-mono font-bold tracking-wider">
                                ∞ Phép Duy Trì
                              </span>
                            ) : slot.card.def.spellTrapSubtype === 'CONTINUOUS_TRAP' ? (
                              <span className="px-1 py-0.5 rounded bg-fuchsia-950/90 border border-fuchsia-400 text-fuchsia-300 text-[7px] font-mono font-bold tracking-wider">
                                ∞ Bẫy Duy Trì
                              </span>
                            ) : slot.card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL' ? (
                              <span className="px-1 py-0.5 rounded bg-amber-950/90 border border-amber-400 text-amber-300 text-[7px] font-mono font-bold tracking-wider">
                                ⚡ Phép Tốc Độ
                              </span>
                            ) : slot.card.def.spellTrapSubtype === 'EQUIP_SPELL' || slot.card.def.cardType === 'EQUIP_CATALYST' ? (
                              <span className="px-1 py-0.5 rounded bg-purple-950/90 border border-purple-400 text-purple-300 text-[7px] font-mono font-bold tracking-wider">
                                ⚔️ Trang Bị
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ) : pendCard ? (
                      <div className="flex flex-col items-center justify-center text-center p-0.5">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-0.5">
                          💎 Scale {pendCard.def.pendulumScale}
                        </span>
                        <span className="text-[8px] font-mono text-slate-300 truncate max-w-[5rem]">{pendCard.def.name}</span>
                        <span className="text-[7px] text-emerald-500 font-mono uppercase">{isLeftScale ? 'Scale Trái' : 'Scale Phải'}</span>
                      </div>
                    ) : (
                      <span className="text-[9px] font-mono text-red-900/70 uppercase text-center">
                        {isLeftScale ? 'P-Scale L (Ô 1)' : isRightScale ? 'P-Scale R (Ô 5)' : `Trap ${idx + 1}`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Opponent Monster Zones (Row 2) */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {opponentState.monsterZones.map((slot, idx) => {
                const isReplayTarget = !!(activeReplay?.isActive && activeReplay.eligibleTargetSlots.includes(idx));
                const canBeAttacked = (phase === 'BATTLE_PHASE' && selectedMonsterSlot !== null && slot && slot.card) || isReplayTarget;
                const isHovered = dragHoverTarget === `opp_mon_${idx}`;
                return (
                  <div
                    key={`opp_mon_${idx}`}
                    onClick={() => {
                      if (isReplayTarget) {
                        handleExecuteBattleReplay('RETARGET', idx);
                      } else if (canBeAttacked) {
                        handleDeclareAttack(idx);
                      }
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragHoverTarget(`opp_mon_${idx}`);
                    }}
                    onDragLeave={() => setDragHoverTarget(null)}
                    onDrop={(e) => handleDropOnOpponentMonsterZone(idx, e)}
                    className={`h-44 rounded-lg border-2 flex items-center justify-center p-1 transition-all ${
                      slot && slot.card
                        ? isReplayTarget
                          ? 'border-amber-400 bg-amber-950/60 cursor-pointer ring-2 ring-amber-300 shadow-xl shadow-amber-500/50 animate-pulse'
                          : canBeAttacked || isHovered
                            ? 'border-red-500 bg-red-950/50 cursor-pointer ring-2 ring-red-400 shadow-lg shadow-red-500/40'
                            : 'border-red-900/60 bg-black/50'
                        : 'border-dashed border-red-900/30 bg-black/30'
                    }`}
                  >
                    {slot && slot.card ? (
                      <div className="relative group w-full h-full flex items-center justify-center">
                        {slot.equippedCards && slot.equippedCards.length > 0 && (
                          <div 
                            className="absolute -top-1 -left-1 z-10 px-1 py-0.2 rounded bg-purple-950/90 border border-purple-400 text-[8px] font-mono font-bold text-purple-300 shadow flex items-center gap-0.5 animate-pulse"
                            title={`Trang bị: ${slot.equippedCards.map(c => c.def.name).join(', ')}`}
                          >
                            <Zap className="w-2.5 h-2.5 text-amber-400" />
                            <span>XÚC TÁC ({slot.equippedCards.length})</span>
                          </div>
                        )}
                        <ChemicalCardView
                          card={slot.card.def}
                          size="sm"
                          disableHoverZoom={true}
                          isDefensePosition={slot.position !== 'FACE_UP_ATTACK'}
                          isFaceDown={slot.position === 'FACE_DOWN_DEFENSE'}
                          atkModifier={slot.tempAtkBoost}
                          defModifier={slot.tempDefBoost}
                          currentAtk={(slot.card.def.atk ?? 0) + (slot.tempAtkBoost || 0)}
                          currentDef={(slot.card.def.def ?? 0) + (slot.tempDefBoost || 0)}
                          statusEffects={[
                            ...(slot.tempAtkBoost > 0 ? ['BOOST'] : slot.tempAtkBoost < 0 ? ['WEAKEN'] : []),
                            ...(slot.passivationShieldUsed || slot.inertShieldUsed ? ['SHIELD'] : []),
                            ...(slot.isEffectNegated ? ['STUN'] : [])
                          ]}
                          onClick={() => setInspectCard(slot.card)}
                        />
                        {canBeAttacked && (
                          <div className="absolute inset-0 bg-red-600/30 rounded flex flex-col items-center justify-center text-white font-bold text-xs pointer-events-none">
                            <Sword className="w-5 h-5 animate-bounce mb-0.5 text-amber-300" />
                            TẤN CÔNG
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-red-900/50 uppercase">Ô {idx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Dividing Field Line: Direct Attack Button & Compound Synthesis Prompt */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-black/70 rounded-lg border border-navy-light/40 text-xs font-mono min-w-[520px]">
            <div className="flex items-center gap-2">
              <span className="text-cyan-ion font-bold">MANA BẠN:</span>
              <div className="flex items-center gap-1">
                {Array.from({ length: playerState.maxMana }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      i < playerState.mana ? 'bg-cyan-ion shadow-sm shadow-cyan-ion/80 animate-pulse' : 'bg-slate-800 border border-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-300 font-bold ml-1">({playerState.mana}/{playerState.maxMana})</span>
              {playerState.frozenMana && playerState.frozenMana > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-400 text-sky-200 text-[10px] flex items-center gap-1 animate-pulse">
                  ❄️ Đóng Băng: {playerState.frozenMana} Mana
                </span>
              )}
            </div>

            {/* Master Rule Battle Step Replay Banner (Rulebook v10 tr. 40) */}
            {activeReplay && activeReplay.isActive && (
              <div className="w-full my-2 p-3 rounded-xl bg-gradient-to-r from-amber-950/95 via-red-950/95 to-amber-950/95 border-2 border-amber-500 shadow-xl shadow-amber-500/30 animate-pulse flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center shrink-0">
                    <RotateCcw className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-amber-300 uppercase tracking-wider font-mono flex items-center gap-1">
                        <Sword className="w-3.5 h-3.5" />
                        QUY TẮC ĐÁNH LẠI (BATTLE REPLAY)
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 border border-amber-400/50 font-mono">
                        Rulebook v10 tr. 40
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-100/90 leading-tight mt-0.5">
                      Quái thú <strong className="text-white font-mono">[{activeReplay.attackerCardName}]</strong> (ATK {activeReplay.attackerAtk}): {activeReplay.triggerReason}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                  {activeReplay.canDirectAttack && (
                    <button
                      onClick={() => handleExecuteBattleReplay('DIRECT')}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-red-500/30 transition-all hover:scale-105"
                    >
                      <Sword className="w-3.5 h-3.5" />
                      <span>Tấn Công Trực Tiếp!</span>
                    </button>
                  )}

                  {activeReplay.eligibleTargetSlots.map(slotIdx => {
                    const mon = opponentState.monsterZones[slotIdx]?.card;
                    if (!mon) return null;
                    return (
                      <button
                        key={`replay_target_${slotIdx}`}
                        onClick={() => handleExecuteBattleReplay('RETARGET', slotIdx)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-900/70 hover:bg-red-800 border border-red-400 text-red-200 text-xs font-bold flex items-center gap-1 shadow-sm transition-all hover:scale-105"
                      >
                        <Sword className="w-3 h-3 text-red-400" />
                        <span>Đánh [{mon.def.name}]</span>
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handleExecuteBattleReplay('CANCEL')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                  >
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>Hủy Tấn Công (An Toàn)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Actions: Direct attack, Pendulum Summon, or Compound Synthesis */}
            <div className="flex items-center gap-2">
              {phase === 'BATTLE_PHASE' && selectedMonsterSlot !== null && !opponentState.monsterZones.some(s => s && s.card) && (
                <button
                  onClick={() => handleDeclareAttack('DIRECT')}
                  className="px-3 py-1 rounded bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs animate-pulse shadow-lg flex items-center gap-1"
                >
                  <Sword className="w-3.5 h-3.5" />
                  TẤN CÔNG TRỰC TIẾP!
                </button>
              )}

              {/* Pendulum Summon Execution Trigger */}
              {playerState.pendulumZones?.left && playerState.pendulumZones?.right && !playerState.hasPendulumSummonedThisTurn && (phase === 'MAIN_PHASE_1' || phase === 'MAIN_PHASE_2') && activePlayerId === 'player' && (
                <button
                  onClick={handleExecutePendulumSummon}
                  className="px-3 py-1 rounded bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-xs animate-pulse shadow-lg shadow-teal-500/40 flex items-center gap-1 border border-teal-300"
                  title="Triệu hồi Dao Động đồng loạt quái thú có Cấp nằm giữa 2 Thang Đo"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Triệu Hồi Dao Động [{playerState.pendulumZones.left.def.pendulumScale} ↔ {playerState.pendulumZones.right.def.pendulumScale}]
                </button>
              )}

              {playerState.extraDeck.length > 0 && (
                <button
                  onClick={() => setShowSynthesisModal(true)}
                  className="px-3 py-1 rounded bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 text-purple-200 border border-purple-400/50 text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-purple-900/40"
                >
                  <Atom className="w-3.5 h-3.5 text-purple-300" />
                  Extra Deck & Triệu Hồi ({playerState.extraDeck.length})
                </button>
              )}
            </div>
          </div>

          {/* ========================================= */}
          {/* EXTRA MONSTER ZONES (EMZ - MASTER RULE)   */}
          {/* ========================================= */}
          <div className="flex items-center justify-center gap-8 py-1.5 px-4 bg-purple-950/20 border-y border-purple-900/30 rounded-lg">
            {/* EMZ 1 */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono text-purple-300 tracking-wider mb-1">EXTRA MONSTER ZONE 1</span>
              <div className={`w-28 h-36 rounded-lg border flex flex-col items-center justify-center p-1 transition-all ${
                playerState.extraMonsterZone?.card
                  ? 'border-purple-400 bg-purple-950/50 ring-1 ring-purple-400 shadow-md shadow-purple-500/30'
                  : 'border-dashed border-purple-500/40 bg-purple-950/20'
              }`}>
                {playerState.extraMonsterZone?.card ? (
                  <div className="flex flex-col items-center">
                    <ChemicalCardView
                      card={playerState.extraMonsterZone.card.def}
                      size="sm"
                      disableHoverZoom={true}
                      isDefensePosition={playerState.extraMonsterZone.position !== 'FACE_UP_ATTACK'}
                      atkModifier={playerState.extraMonsterZone.tempAtkBoost}
                      defModifier={playerState.extraMonsterZone.tempDefBoost}
                      currentAtk={(playerState.extraMonsterZone.card.def.atk ?? 0) + (playerState.extraMonsterZone.tempAtkBoost || 0)}
                      currentDef={(playerState.extraMonsterZone.card.def.def ?? 0) + (playerState.extraMonsterZone.tempDefBoost || 0)}
                      statusEffects={[
                        ...(playerState.extraMonsterZone.tempAtkBoost > 0 ? ['BOOST'] : playerState.extraMonsterZone.tempAtkBoost < 0 ? ['WEAKEN'] : []),
                        ...(playerState.extraMonsterZone.passivationShieldUsed || playerState.extraMonsterZone.inertShieldUsed ? ['SHIELD'] : [])
                      ]}
                    />
                    {playerState.extraMonsterZone.card.def.cardType !== 'LINK_MONSTER' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChangePosition(0, true);
                        }}
                        className="px-1.5 py-0.5 mt-1 rounded bg-slate-800 hover:bg-slate-700 text-[9px] font-mono text-slate-300 border border-white/10"
                        title="Đổi tư thế quái thú trong EMZ (Rulebook v10 tr. 24)"
                      >
                        {playerState.extraMonsterZone.position === 'FACE_UP_ATTACK' ? '🛡️ Thủ' : '⚔️ Công'}
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] text-purple-400/60 font-mono text-center">EMZ 1<br/>(Link / Extra)</span>
                )}
              </div>
            </div>

            {/* EMZ 2 */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-mono text-purple-300 tracking-wider mb-1">EXTRA MONSTER ZONE 2</span>
              <div className={`w-28 h-36 rounded-lg border flex flex-col items-center justify-center p-1 transition-all ${
                opponentState.extraMonsterZone?.card
                  ? 'border-rose-400 bg-rose-950/50 ring-1 ring-rose-400 shadow-md shadow-rose-500/30'
                  : 'border-dashed border-purple-500/40 bg-purple-950/20'
              }`}>
                {opponentState.extraMonsterZone?.card ? (
                  <ChemicalCardView
                    card={opponentState.extraMonsterZone.card.def}
                    size="sm"
                    disableHoverZoom={true}
                    atkModifier={opponentState.extraMonsterZone.tempAtkBoost}
                    defModifier={opponentState.extraMonsterZone.tempDefBoost}
                    currentAtk={(opponentState.extraMonsterZone.card.def.atk ?? 0) + (opponentState.extraMonsterZone.tempAtkBoost || 0)}
                    currentDef={(opponentState.extraMonsterZone.card.def.def ?? 0) + (opponentState.extraMonsterZone.tempDefBoost || 0)}
                    statusEffects={[
                      ...(opponentState.extraMonsterZone.tempAtkBoost > 0 ? ['BOOST'] : opponentState.extraMonsterZone.tempAtkBoost < 0 ? ['WEAKEN'] : []),
                      ...(opponentState.extraMonsterZone.passivationShieldUsed || opponentState.extraMonsterZone.inertShieldUsed ? ['SHIELD'] : [])
                    ]}
                  />
                ) : (
                  <span className="text-[10px] text-purple-400/60 font-mono text-center">EMZ 2<br/>(Link / Extra)</span>
                )}
              </div>
            </div>
          </div>

          {/* ========================================= */}
          {/* PLAYER BOARD (BOTTOM)                     */}
          {/* ========================================= */}
          <div className="p-3 rounded-xl bg-gradient-to-t from-cyan-950/20 to-slate-900/60 border border-cyan-900/30 flex flex-col gap-2 relative min-w-[520px]">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                SÂN ĐẤU CỦA BẠN: {playerState.name}
              </span>
              <div className="flex items-center gap-2">
                <span>Triệu Hồi Còn: {playerState.normalSummonsRemaining}</span>
                {/* Player Grave & Banished Badges */}
                <button
                  onClick={() => setGraveModal({
                    isOpen: true,
                    activeZone: 'PLAYER_GRAVE',
                    title: 'Mộ Bài Của Bạn (Graveyard)',
                    cards: playerState.graveyard,
                    filterType: 'ALL',
                    searchQuery: ''
                  })}
                  className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-[10px] flex items-center gap-1"
                >
                  <Skull className="w-3 h-3 text-cyan-400" />
                  Mộ ({playerState.graveyard.length})
                </button>
                <button
                  onClick={() => setGraveModal({
                    isOpen: true,
                    activeZone: 'PLAYER_BANISHED',
                    title: 'Vùng Bị Loại Khỏi Trận Đấu (Banished)',
                    cards: playerState.banished,
                    filterType: 'ALL',
                    searchQuery: ''
                  })}
                  className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 text-[10px] flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3 text-purple-400" />
                  Loại ({playerState.banished.length})
                </button>
                {/* Player Field Zone (Rulebook v10 tr. 28) */}
                {playerState.fieldZone ? (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 shadow-sm shadow-emerald-500/20">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                      🌐 {playerState.fieldZone.isFaceDown ? 'ĐỊA BÀN: [ÚP - CHƯA KÍCH HOẠT]' : `ĐỊA BÀN: ${playerState.fieldZone.def.name}`}
                    </span>
                    {playerState.fieldZone.isFaceDown && activePlayerId === 'player' && (phase === 'MAIN_PHASE_1' || phase === 'MAIN_PHASE_2') && (
                      <button
                        onClick={() => {
                          const res = engine.activateFieldSpellFromField('player');
                          if (res.success) {
                            sound.playReactionSuccess();
                            setActionFeedback(res.message);
                            updateFromEngine();
                          } else {
                            sound.playErrorFizzle();
                            setActionFeedback(res.message);
                          }
                        }}
                        className="px-1.5 py-0.2 text-[9px] rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold animate-pulse"
                        title="Lật ngửa kích hoạt Thẻ Địa Bàn (Rulebook v10 tr. 28)"
                      >
                        ⚡ Lật Kích Hoạt
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="px-2 py-0.5 rounded bg-slate-900/60 border border-slate-700/40 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <span>🌐 Field Zone: Trống</span>
                  </div>
                )}
                {/* Player Lingering Effects (Rulebook v10 tr. 31, 54) */}
                {playerState.lingeringEffects && playerState.lingeringEffects.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    {playerState.lingeringEffects.map(effect => (
                      <div
                        key={effect.id}
                        className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/50 text-[10px] font-mono text-amber-300 font-bold flex items-center gap-1 shadow-sm shadow-amber-500/20"
                        title={effect.description}
                      >
                        <span>⏳ {effect.sourceCardName}: {effect.durationTurns} lượt</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Player Monster Zones (Row 1) */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {playerState.monsterZones.map((slot, idx) => {
                const isSelected = selectedMonsterSlot === idx;
                const isTargetHovered = dragHoverTarget === `ply_mon_${idx}`;
                const canDrag = slot && slot.card && slot.position === 'FACE_UP_ATTACK';
                return (
                  <div
                    key={`ply_mon_${idx}`}
                    draggable={canDrag || false}
                    onDragStart={(e) => canDrag && handleMonsterDragStart(idx, e)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragHoverTarget(`ply_mon_${idx}`);
                    }}
                    onDragLeave={() => setDragHoverTarget(null)}
                    onDrop={(e) => handleDropOnPlayerMonsterZone(idx, e)}
                    onClick={() => {
                      if (slot && slot.card) {
                        setSelectedMonsterSlot(isSelected ? null : idx);
                        setInspectCard(slot.card);
                      }
                    }}
                    className={`h-44 rounded-lg border-2 flex flex-col items-center justify-center p-1 transition-all ${
                      slot && slot.card
                        ? isSelected
                          ? 'border-cyan-ion bg-cyan-950/60 ring-2 ring-cyan-ion shadow-lg shadow-cyan-ion/40'
                          : 'border-cyan-900/60 bg-black/50 hover:border-cyan-400 cursor-pointer'
                        : isTargetHovered
                        ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-400'
                        : 'border-dashed border-cyan-900/30 bg-black/30'
                    }`}
                  >
                    {slot && slot.card ? (
                      <div className="w-full h-full flex flex-col items-center justify-between relative">
                        {slot.card.def.cardType === 'LINK_MONSTER' && (
                          <div className="absolute -top-1 -right-1 z-10 px-1 py-0.2 rounded bg-blue-950/90 border border-cyan-400 text-[8px] font-mono font-bold text-cyan-300 shadow">
                            🔗 LINK-{slot.card.def.linkRating || 1}
                          </div>
                        )}
                        {slot.equippedCards && slot.equippedCards.length > 0 && (
                          <div 
                            className="absolute -top-1 -left-1 z-10 px-1 py-0.2 rounded bg-purple-950/90 border border-purple-400 text-[8px] font-mono font-bold text-purple-300 shadow flex items-center gap-0.5 animate-pulse"
                            title={`Trang bị: ${slot.equippedCards.map(c => c.def.name).join(', ')}`}
                          >
                            <Zap className="w-2.5 h-2.5 text-amber-400" />
                            <span>XÚC TÁC ({slot.equippedCards.length})</span>
                          </div>
                        )}
                        <ChemicalCardView
                          card={slot.card.def}
                          size="sm"
                          disableHoverZoom={true}
                          isDefensePosition={slot.position !== 'FACE_UP_ATTACK'}
                          isFaceDown={slot.position === 'FACE_DOWN_DEFENSE'}
                          atkModifier={slot.tempAtkBoost}
                          defModifier={slot.tempDefBoost}
                          currentAtk={(slot.card.def.atk ?? 0) + (slot.tempAtkBoost || 0)}
                          currentDef={(slot.card.def.def ?? 0) + (slot.tempDefBoost || 0)}
                          statusEffects={[
                            ...(slot.tempAtkBoost > 0 ? ['BOOST'] : slot.tempAtkBoost < 0 ? ['WEAKEN'] : []),
                            ...(slot.passivationShieldUsed || slot.inertShieldUsed ? ['SHIELD'] : []),
                            ...(slot.isEffectNegated ? ['STUN'] : [])
                          ]}
                        />
                        {/* Monster control buttons */}
                        <div className="flex items-center gap-1 mt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChangePosition(idx);
                            }}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono border transition-all ${
                              slot.position === 'FACE_DOWN_DEFENSE'
                                ? 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border-amber-500/40'
                                : slot.position === 'FACE_UP_ATTACK'
                                ? 'bg-blue-900/60 hover:bg-blue-800 text-blue-200 border-blue-500/40'
                                : 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border-rose-500/40'
                            }`}
                            title={
                              slot.position === 'FACE_DOWN_DEFENSE'
                                ? 'Triệu Hồi Lật sang tư thế Tấn Công Ngửa Mặt (Rulebook v10 tr. 25)'
                                : slot.position === 'FACE_UP_ATTACK'
                                ? 'Chuyển sang tư thế Phòng Thủ Ngửa Mặt (Rulebook v10 tr. 24)'
                                : 'Chuyển sang tư thế Tấn Công Ngửa Mặt (Rulebook v10 tr. 24)'
                            }
                          >
                            {slot.position === 'FACE_DOWN_DEFENSE' ? '⚡ Lật Mặt' : slot.position === 'FACE_UP_ATTACK' ? '🛡️ Thủ' : '⚔️ Công'}
                          </button>
                          {slot.card.def.effectCode === 'ELEM_FE_REDOX_VALENCE' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSwapMonsterAtkDef(idx);
                              }}
                              className="px-1.5 py-0.5 rounded bg-amber-900/60 hover:bg-amber-800 text-[9px] font-mono text-amber-200 border border-amber-500/30"
                              title="Hoán đổi ATK/DEF (Hóa trị Fe²⁺ ⇄ Fe³⁺)"
                            >
                              Fe²⁺⇄Fe³⁺
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-1 text-[10px] font-mono text-cyan-900/60 uppercase">
                        <span>Ô {idx + 1}</span>
                        {isDragging && <span className="text-[8px] text-emerald-400 lowercase">Thả để triệu hồi</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Player Spell/Trap Zones (Row 2) */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {playerState.spellTrapZones.map((slot, idx) => {
                const isTargetHovered = dragHoverTarget === `ply_st_${idx}`;
                const isSelected = selectedSpellTrapSlot === idx;
                const isLeftScale = idx === 0;
                const isRightScale = idx === 4;
                const pendCard = isLeftScale ? playerState.pendulumZones?.left : isRightScale ? playerState.pendulumZones?.right : null;
                return (
                  <div
                    key={`ply_st_${idx}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragHoverTarget(`ply_st_${idx}`);
                    }}
                    onDragLeave={() => setDragHoverTarget(null)}
                    onDrop={(e) => handleDropOnPlayerSpellTrapZone(idx, e)}
                    onClick={() => {
                      if (slot && slot.card) {
                        setSelectedSpellTrapSlot(isSelected ? null : idx);
                        setInspectCard(slot.card);
                      }
                    }}
                    className={`h-44 rounded-lg border flex flex-col items-center justify-between p-1 transition-all relative ${
                      pendCard
                        ? 'border-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-400 shadow-md shadow-emerald-500/20'
                        : slot && slot.card
                        ? isSelected
                          ? 'border-amber-400 bg-amber-950/40 ring-2 ring-amber-400 shadow-lg shadow-amber-500/30'
                          : 'border-cyan-900/60 bg-black/50 hover:border-cyan-400 cursor-pointer'
                        : isTargetHovered
                        ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-400'
                        : 'border-dashed border-cyan-900/40 bg-black/40'
                    }`}
                  >
                    {slot && slot.card ? (
                      <div className="w-full h-full flex flex-col items-center justify-between">
                        {pendCard && (
                          <div className="w-full px-1 py-0.5 rounded bg-emerald-950 border border-emerald-400 text-emerald-300 text-[9px] font-mono font-bold text-center flex items-center justify-center gap-1 shadow">
                            <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                            <span>Scale: {pendCard.def.pendulumScale}</span>
                          </div>
                        )}
                        <ChemicalCardView
                          card={slot.card.def}
                          size="sm"
                          disableHoverZoom={true}
                          isFaceDown={!slot.isFaceUp}
                          isSelected={isSelected}
                        />
                        {/* Instant Activation Button on Field or Face-Up Status Badge */}
                        {!slot.isFaceUp ? (
                          <div className="w-full flex items-center justify-center gap-1 mt-1">
                            {((slot.card.def.cardType === 'TRAP' || slot.card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL') && slot.turnSet >= turn) ? (
                              <span
                                className="px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-slate-400 font-mono text-[8px] font-bold tracking-tight text-center shadow-sm"
                                title="Không thể kích hoạt trong lượt vừa Úp (Rulebook v10 tr. 29)"
                              >
                                ⏳ Úp Lượt Này
                              </span>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleActivateSpellTrapFromField(idx);
                                }}
                                className={`px-2 py-0.5 rounded font-mono font-black text-[9px] shadow-md flex items-center gap-0.5 tracking-wider uppercase border ${
                                  slot.card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL'
                                    ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-300 animate-pulse'
                                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-obsidian border-amber-300 animate-pulse'
                                }`}
                                title={slot.card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL' ? 'Kích hoạt Phép Tốc Độ từ sân (Spell Speed 2)' : 'Kích hoạt lá bài này từ sân đấu'}
                              >
                                <Zap className="w-2.5 h-2.5 fill-current" />
                                {slot.card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL' ? 'Lật Nhanh' : 'Kích Hoạt'}
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="w-full flex items-center justify-center gap-1 mt-1">
                            {slot.card.def.spellTrapSubtype === 'CONTINUOUS_SPELL' ? (
                              <span className="px-1.5 py-0.5 rounded bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-[8px] font-mono font-bold tracking-wider flex items-center gap-0.5 shadow-sm">
                                <span>∞</span> Phép Duy Trì
                              </span>
                            ) : slot.card.def.spellTrapSubtype === 'CONTINUOUS_TRAP' ? (
                              <span className="px-1.5 py-0.5 rounded bg-fuchsia-950/90 border border-fuchsia-400 text-fuchsia-300 text-[8px] font-mono font-bold tracking-wider flex items-center gap-0.5 shadow-sm">
                                <span>∞</span> Bẫy Duy Trì
                              </span>
                            ) : slot.card.def.spellTrapSubtype === 'QUICK_PLAY_SPELL' ? (
                              <span className="px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-400 text-amber-300 text-[8px] font-mono font-bold tracking-wider flex items-center gap-0.5 shadow-sm">
                                <span>⚡</span> Phép Tốc Độ
                              </span>
                            ) : slot.card.def.spellTrapSubtype === 'EQUIP_SPELL' || slot.card.def.cardType === 'EQUIP_CATALYST' ? (
                              <span className="px-1.5 py-0.5 rounded bg-purple-950/90 border border-purple-400 text-purple-300 text-[8px] font-mono font-bold tracking-wider flex items-center gap-0.5 shadow-sm">
                                <span>⚔️</span> Trang Bị
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center text-[10px] font-mono text-cyan-900/60 uppercase p-1">
                        {pendCard ? (
                          <div className="flex flex-col items-center justify-center text-center">
                            <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                              💎 Scale {pendCard.def.pendulumScale}
                            </span>
                            <span className="text-[9px] font-mono text-emerald-300 truncate max-w-[5.5rem]">{pendCard.def.name}</span>
                            <span className="text-[8px] text-emerald-500/80 font-mono mt-0.5">{isLeftScale ? 'Scale Trái' : 'Scale Phải'}</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-[9px]">
                              {isLeftScale ? 'P-Scale L (Ô 1)' : isRightScale ? 'P-Scale R (Ô 5)' : `Phép/Bẫy ${idx + 1}`}
                            </span>
                            {isDragging && <span className="text-[8px] text-cyan-400 lowercase">Thả để đặt</span>}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================= */}
          {/* PLAYER HAND AREA                          */}
          {/* ========================================= */}
          <div className="p-2 rounded-xl bg-black/75 border border-white/10 flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1 font-bold text-slate-300">
                <Layers className="w-3.5 h-3.5 text-cyan-ion" />
                BÀI TRÊN TAY ({playerState.hand.length}/7) — <span className="text-[10px] text-cyan-300 hidden sm:inline">Kéo thả thẻ lên sân để hành động!</span>
              </span>

              {/* Action buttons if a card is selected */}
              {selectedCard && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-cyan-ion font-bold truncate max-w-xs">{selectedCard.def.name}:</span>
                  {selectedCard.def.cardType === 'PENDULUM_MONSTER' ? (
                    <>
                      <button
                        onClick={() => handleSummonSelected('FACE_UP_ATTACK')}
                        className="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-obsidian font-bold text-xs"
                      >
                        Triệu Hồi Tấn Công
                      </button>
                      <button
                        onClick={() => handleSummonSelected('FACE_DOWN_DEFENSE')}
                        className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs"
                      >
                        Úp Phòng Thủ
                      </button>
                      <button
                        onClick={() => handlePlacePendulumScale(selectedCard, 'left')}
                        className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                        title="Đặt vào Ô Phép/Bẫy 1 làm Thang Đo Trái"
                      >
                        <span>Thang Trái (Scale {selectedCard.def.pendulumScale})</span>
                      </button>
                      <button
                        onClick={() => handlePlacePendulumScale(selectedCard, 'right')}
                        className="px-2 py-0.5 rounded bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                        title="Đặt vào Ô Phép/Bẫy 5 làm Thang Đo Phải"
                      >
                        <span>Thang Phải (Scale {selectedCard.def.pendulumScale})</span>
                      </button>
                    </>
                  ) : (selectedCard.def.cardType === 'ELEMENT_MONSTER' || selectedCard.def.cardType === 'COMPOUND_MONSTER') ? (
                    <>
                      <button
                        onClick={() => handleSummonSelected('FACE_UP_ATTACK')}
                        className="px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-obsidian font-bold text-xs"
                      >
                        Triệu Hồi Tấn Công
                      </button>
                      <button
                        onClick={() => handleSummonSelected('FACE_DOWN_DEFENSE')}
                        className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs"
                      >
                        Úp Phòng Thủ
                      </button>
                    </>
                  ) : selectedCard.def.cardType === 'RITUAL_MONSTER' ? (
                    <button
                      onClick={() => {
                        setSynthesisTab('RITUAL');
                        setShowSynthesisModal(true);
                      }}
                      className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <Flame className="w-3 h-3 text-indigo-300" />
                      Triệu Hồi Nghi Thức (Mở Lò)
                    </button>
                  ) : (selectedCard.def.spellTrapSubtype === 'RITUAL_SPELL' || selectedCard.def.id === 'card_spell_crystallization_ritual') ? (
                    <>
                      <button
                        onClick={() => {
                          setSynthesisTab('RITUAL');
                          setShowSynthesisModal(true);
                        }}
                        className="px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Flame className="w-3 h-3 text-indigo-300" />
                        Kích Hoạt Phép Nghi Thức
                      </button>
                      <button
                        onClick={handleSetSpellTrap}
                        className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs"
                      >
                        Đặt Phép Úp
                      </button>
                    </>
                  ) : selectedCard.def.cardType === 'TRAP' ? (
                    <button
                      onClick={handleSetSpellTrap}
                      className="px-2 py-0.5 rounded bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs"
                    >
                      Đặt Bẫy Úp
                    </button>
                  ) : selectedCard.def.spellTrapSubtype === 'QUICK_PLAY_SPELL' ? (
                    <>
                      <button
                        onClick={handleActivateSpell}
                        className="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm shadow-amber-500/30"
                        title="Kích hoạt Phép Tốc Độ (Spell Speed 2) từ trên tay"
                      >
                        <Zap className="w-3 h-3 text-amber-200 animate-pulse" />
                        Kích Hoạt Tốc Độ (⚡ SS2)
                      </button>
                      <button
                        onClick={handleSetSpellTrap}
                        className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs flex items-center gap-1"
                        title="Úp xuống sân để kích hoạt trong lượt đối thủ hoặc Battle Phase"
                      >
                        Đặt Phép Úp (Set)
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleActivateSpell}
                        className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                      >
                        Kích Hoạt Phép
                      </button>
                      <button
                        onClick={handleSetSpellTrap}
                        className="px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs"
                      >
                        Đặt Phép Úp
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hand cards row with HTML5 Drag & Drop */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-thin scrollbar-thumb-cyan-ion/40">
              {playerState.hand.map((card) => {
                const isSelected = selectedHandUid === card.uid;
                return (
                  <div
                    key={card.uid}
                    draggable={true}
                    onDragStart={(e) => handleHandCardDragStart(card.uid, e)}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                      setSelectedHandUid(isSelected ? null : card.uid);
                      setInspectCard(card);
                    }}
                    className="shrink-0 cursor-grab active:cursor-grabbing transition-transform hover:-translate-y-1"
                  >
                    <ChemicalCardView
                      card={card.def}
                      size="sm"
                      isSelected={isSelected}
                    />
                  </div>
                );
              })}
              {playerState.hand.length === 0 && (
                <div className="text-xs text-slate-500 italic py-4 w-full text-center font-mono">
                  Hết bài trên tay! Rút thêm bài ở lượt tiếp theo hoặc dùng phép sắc ký để rút bài!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Card Inspector Dossier & Live Duel Logs */}
        <div className="flex flex-col gap-2">
          {/* Card Inspector Card Preview (Class C Detailed Dossier) */}
          <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                HỒ SƠ THẺ BÀI CHI TIẾT (LỚP C)
              </span>
              <button
                onClick={() => setShowInspectorPanel(!showInspectorPanel)}
                className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/20 bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                {showInspectorPanel ? 'Thu gọn ▲' : 'Mở rộng ▼'}
              </button>
            </div>

            {showInspectorPanel && (
              inspectCard ? (
                <div className="flex flex-col gap-2 max-h-[720px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cyan-ion/40">
                  <div className="flex justify-center">
                    <ChemicalCardView card={inspectCard.def} size="md" />
                  </div>
                  <CardScientificInspector
                    card={inspectCard.def}
                    instance={inspectCard}
                    slot={
                      playerState.monsterZones.find(s => s && s.card?.uid === inspectCard.uid) ||
                      opponentState.monsterZones.find(s => s && s.card?.uid === inspectCard.uid)
                    }
                    onSelectCard={(c) => setInspectCard({ uid: 'inspect_' + c.id, def: c, ownerId: 'player' })}
                  />
                </div>
              ) : (
                <div className="h-44 flex flex-col items-center justify-center text-center text-xs text-slate-500 p-4 border border-dashed border-navy-light/30 rounded-lg">
                  <Atom className="w-8 h-8 text-slate-600 mb-2" />
                  Nhấp hoặc kéo thả bất kỳ lá bài nào trên sân hoặc trên tay để mở hồ sơ khoa học chi tiết!
                </div>
              )
            )}
          </div>

          {/* Real-Time Action & Combat Logs (Newest on Top) */}
          <div className="flex-1 p-3 rounded-xl bg-black/80 border border-white/10 flex flex-col h-72 overflow-hidden">
            <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-1">
              <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-cyan-ion" />
                NHẬT KÝ CHIẾN ĐẤU (MỚI NHẤT Ở TRÊN)
              </span>
              <span className="text-[10px] font-mono text-cyan-ion/70">
                {logs.length} bản ghi
              </span>
            </div>
            <div
              ref={logsContainerRef}
              className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono text-[11px] scrollbar-thin scrollbar-thumb-cyan-ion/40"
            >
              {[...logs].reverse().map((log) => (
                <div key={log.id} className="p-2 rounded bg-slate-900/90 border border-white/5 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="text-cyan-ion font-bold">[{log.actor === 'player' ? 'Người chơi' : log.actor === 'opponent' ? 'Đối thủ' : log.actor}]</span>
                    <span>Lượt {log.turn} • {log.phase}</span>
                  </div>
                  <div className="text-slate-200 mt-0.5 leading-snug">{log.message}</div>
                  {log.scientificNote && (
                    <div className="mt-1 text-[10px] text-emerald-400 bg-emerald-950/40 p-1 rounded border border-emerald-900/50">
                      💡 {log.scientificNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extra Deck: Compound Synthesis & Link Summon Modal */}
      {showSynthesisModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border-2 border-purple-500 rounded-xl p-4 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
              <div className="flex items-center gap-3">
                <Atom className="w-5 h-5 text-purple-400" />
                <h3 className="font-serif font-black text-lg text-purple-200">
                  Lò Phản Ứng & Triệu Hồi Liên Kết (Extra Deck)
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowSynthesisModal(false);
                  setSelectedLinkMaterials([]);
                }}
                className="text-slate-400 hover:text-white font-mono font-bold"
              >
                ✕ ĐÓNG
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 overflow-x-auto">
              <button
                onClick={() => setSynthesisTab('FUSION')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  synthesisTab === 'FUSION'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Atom className="w-3.5 h-3.5 text-purple-300" />
                HỢP CHẤT (Fusion)
              </button>
              <button
                onClick={() => setSynthesisTab('SYNCHRO')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  synthesisTab === 'SYNCHRO'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                ĐỒNG BỘ (Synchro)
              </button>
              <button
                onClick={() => setSynthesisTab('XYZ')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  synthesisTab === 'XYZ'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                PHỨC CHẤT (Xyz)
              </button>
              <button
                onClick={() => setSynthesisTab('LINK')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  synthesisTab === 'LINK'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-300" />
                LIÊN KẾT (Link)
              </button>
              <button
                onClick={() => setSynthesisTab('PENDULUM')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  synthesisTab === 'PENDULUM'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5 text-teal-300" />
                DAO ĐỘNG (Pendulum)
              </button>
              <button
                onClick={() => setSynthesisTab('RITUAL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  synthesisTab === 'RITUAL'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-indigo-300" />
                NGHI THỨC (Ritual)
              </button>
            </div>

            {/* FUSION TAB */}
            {synthesisTab === 'FUSION' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-purple-500/40">
                {playerState.extraDeck
                  .filter((c) => c.def.cardType === 'COMPOUND_MONSTER')
                  .map((compoundCard) => {
                    const recipe = compoundCard.def.synthesisRecipe;
                    const canAffordMana = playerState.mana >= compoundCard.def.manaCost;
                    return (
                      <div
                        key={compoundCard.uid}
                        className="p-3 rounded-lg bg-black/60 border border-purple-500/40 flex flex-col justify-between gap-2"
                      >
                        <div className="flex items-start gap-2">
                          <ChemicalCardView card={compoundCard.def} size="xs" />
                          <div className="flex-1">
                            <div className="font-bold text-sm text-purple-200">{compoundCard.def.name}</div>
                            <div className="text-xs text-amber-300">Mana: {compoundCard.def.manaCost} (Bạn có: {playerState.mana})</div>
                            {recipe && (
                              <div className="text-xs font-mono text-emerald-300 mt-1 bg-emerald-950/40 p-1 rounded border border-emerald-900/50">
                                {recipe.pedagogicalEquation}
                              </div>
                            )}
                            <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                              {compoundCard.def.effectText}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCompoundSynthesis(compoundCard)}
                          disabled={!canAffordMana}
                          className={`w-full py-1.5 rounded font-bold text-xs transition-all shadow ${
                            canAffordMana
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {canAffordMana ? 'Tiến Hành Tổng Hợp' : 'Không đủ Mana'}
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* SYNCHRO TAB */}
            {synthesisTab === 'SYNCHRO' && (
              <div className="flex flex-col gap-3">
                <div className="p-2.5 rounded-lg bg-black/60 border border-emerald-500/40 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-emerald-300">
                      1. CHỌN NGUYÊN LIỆU ĐỒNG BỘ TRÊN SÂN:
                    </span>
                    <span className="text-amber-300">
                      Tổng Cấp: {(selectedSynchroTuner !== null ? playerState.monsterZones[selectedSynchroTuner]?.card?.def.level || 0 : 0) +
                        selectedSynchroNonTuners.reduce((acc, idx) => acc + (playerState.monsterZones[idx]?.card?.def.level || 0), 0)}★
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-300 font-mono">
                    {/* Tuner selection */}
                    <div className="mb-1.5">
                      <span className="text-emerald-400 font-bold">Quái Thú Điều Nhịp (Tuner - chọn 1): </span>
                      {playerState.monsterZones.map((slot, idx) => {
                        if (!slot || !slot.card || !slot.card.def.isTuner) return null;
                        const isPicked = selectedSynchroTuner === idx;
                        return (
                          <button
                            key={`syn_tuner_${idx}`}
                            onClick={() => setSelectedSynchroTuner(isPicked ? null : idx)}
                            className={`px-2 py-1 rounded text-xs font-mono mr-1.5 transition-all ${
                              isPicked
                                ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400'
                                : 'bg-slate-800 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400'
                            }`}
                          >
                            Ô {idx + 1}: {slot.card.def.name} ({slot.card.def.level}★ Tuner)
                          </button>
                        );
                      })}
                      {!playerState.monsterZones.some(s => s && s.card && s.card.def.isTuner) && (
                        <span className="text-slate-500 italic">Không có Tuner nào trên sân (VD: Bạch Kim Pt)!</span>
                      )}
                    </div>

                    {/* Non-Tuner selection */}
                    <div>
                      <span className="text-cyan-400 font-bold">Phi Điều Nhịp (Non-Tuner - chọn 1+): </span>
                      {playerState.monsterZones.map((slot, idx) => {
                        if (!slot || !slot.card || slot.card.def.isTuner) return null;
                        const isPicked = selectedSynchroNonTuners.includes(idx);
                        return (
                          <button
                            key={`syn_nontuner_${idx}`}
                            onClick={() =>
                              setSelectedSynchroNonTuners(prev =>
                                prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                              )
                            }
                            className={`px-2 py-1 rounded text-xs font-mono mr-1.5 transition-all ${
                              isPicked
                                ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-400'
                                : 'bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400'
                            }`}
                          >
                            Ô {idx + 1}: {slot.card.def.name} ({slot.card.def.level}★)
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Synchro Cards List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-emerald-500/40">
                  {playerState.extraDeck
                    .filter((c) => c.def.cardType === 'SYNCHRO_MONSTER')
                    .map((synchroCard) => {
                      const canAffordMana = playerState.mana >= synchroCard.def.manaCost;
                      const reqLevel = synchroCard.def.synchroLevel || synchroCard.def.level || 7;
                      const curLevel =
                        (selectedSynchroTuner !== null ? playerState.monsterZones[selectedSynchroTuner]?.card?.def.level || 0 : 0) +
                        selectedSynchroNonTuners.reduce((acc, idx) => acc + (playerState.monsterZones[idx]?.card?.def.level || 0), 0);
                      const levelMatches = curLevel === reqLevel;
                      const hasMaterials = selectedSynchroTuner !== null && selectedSynchroNonTuners.length > 0;

                      return (
                        <div
                          key={synchroCard.uid}
                          className="p-3 rounded-lg bg-black/60 border border-emerald-500/40 flex flex-col justify-between gap-2"
                        >
                          <div className="flex items-start gap-2">
                            <ChemicalCardView card={synchroCard.def} size="xs" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-emerald-200">{synchroCard.def.name}</span>
                                <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-400 text-emerald-300 text-[10px] font-mono font-bold">
                                  ★{reqLevel} SYNCHRO
                                </span>
                              </div>
                              <div className="text-xs text-amber-300 mt-0.5">Mana: {synchroCard.def.manaCost} (Bạn có: {playerState.mana})</div>
                              <div className="text-[11px] font-mono text-emerald-400 mt-1">
                                Yêu cầu: 1 Tuner + 1+ Non-Tuner = Đúng {reqLevel}★
                              </div>
                              <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                                {synchroCard.def.effectText}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleExecuteSynchroSummon(synchroCard)}
                            disabled={!canAffordMana || !hasMaterials || !levelMatches}
                            className={`w-full py-1.5 rounded font-bold text-xs transition-all shadow ${
                              canAffordMana && hasMaterials && levelMatches
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-obsidian'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {!canAffordMana
                              ? 'Không đủ Mana'
                              : !hasMaterials
                              ? 'Chọn Tuner & Non-Tuner'
                              : !levelMatches
                              ? `Cần đúng ${reqLevel}★ (Hiện tại: ${curLevel}★)`
                              : `Triệu Hồi Đồng Bộ (${reqLevel}★)`}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* XYZ TAB */}
            {synthesisTab === 'XYZ' && (
              <div className="flex flex-col gap-3">
                <div className="p-2.5 rounded-lg bg-black/60 border border-amber-500/40 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-amber-300">
                      1. CHỌN NGUYÊN LIỆU CHỒNG LỚP (OVERLAY) CÙNG CẤP TRÊN SÂN:
                    </span>
                    <span className="text-amber-400">Đã chọn: {selectedXyzMaterials.length} quái thú</span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {playerState.monsterZones.map((slot, idx) => {
                      if (!slot || !slot.card) return null;
                      const isPicked = selectedXyzMaterials.includes(idx);
                      return (
                        <button
                          key={`xyz_mat_${idx}`}
                          onClick={() =>
                            setSelectedXyzMaterials(prev =>
                              prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                            )
                          }
                          className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                            isPicked
                              ? 'border-amber-400 bg-amber-950 text-amber-200 ring-2 ring-amber-400'
                              : 'border-white/10 bg-slate-800 text-slate-300 hover:border-amber-400'
                          }`}
                        >
                          <span>Ô {idx + 1}: {slot.card.def.name} ({slot.card.def.level}★)</span>
                          {isPicked && <CheckCircle className="w-3.5 h-3.5 text-amber-400" />}
                        </button>
                      );
                    })}
                    {!playerState.monsterZones.some(s => s && s.card) && (
                      <span className="text-xs text-slate-500 italic">Không có quái thú nào trên sân để làm nguyên liệu!</span>
                    )}
                  </div>
                </div>

                {/* Xyz Cards List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-amber-500/40">
                  {playerState.extraDeck
                    .filter((c) => c.def.cardType === 'XYZ_MONSTER')
                    .map((xyzCard) => {
                      const canAffordMana = playerState.mana >= xyzCard.def.manaCost;
                      const reqRank = xyzCard.def.xyzRank || 4;
                      const reqCount = xyzCard.def.xyzMaterialsRequired?.count || 2;
                      const reqLevel = xyzCard.def.xyzMaterialsRequired?.level || reqRank;

                      const selectedLevels = selectedXyzMaterials.map(
                        idx => playerState.monsterZones[idx]?.card?.def.level
                      );
                      const countMatches = selectedXyzMaterials.length === reqCount;
                      const allSameLevel =
                        selectedLevels.length > 0 && selectedLevels.every(lvl => lvl === reqLevel);
                      const canSummon = canAffordMana && countMatches && allSameLevel;

                      return (
                        <div
                          key={xyzCard.uid}
                          className="p-3 rounded-lg bg-black/60 border border-amber-500/40 flex flex-col justify-between gap-2"
                        >
                          <div className="flex items-start gap-2">
                            <ChemicalCardView card={xyzCard.def} size="xs" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-amber-200">{xyzCard.def.name}</span>
                                <span className="px-1.5 py-0.5 rounded bg-black border border-amber-400 text-amber-300 text-[10px] font-mono font-bold">
                                  ⬡ RANK {reqRank} XYZ
                                </span>
                              </div>
                              <div className="text-xs text-amber-300 mt-0.5">Mana: {xyzCard.def.manaCost} (Bạn có: {playerState.mana})</div>
                              <div className="text-[11px] font-mono text-amber-400 mt-1">
                                Yêu cầu: {reqCount} quái thú Cấp {reqLevel}★
                              </div>
                              <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                                {xyzCard.def.effectText}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleExecuteXyzSummon(xyzCard)}
                            disabled={!canSummon}
                            className={`w-full py-1.5 rounded font-bold text-xs transition-all shadow ${
                              canSummon
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-obsidian'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {!canAffordMana
                              ? 'Không đủ Mana'
                              : !countMatches
                              ? `Cần chọn đúng ${reqCount} quái thú Cấp ${reqLevel}★`
                              : !allSameLevel
                              ? `Mọi nguyên liệu phải có Cấp ${reqLevel}★`
                              : `Triệu Hồi Xyz (Rank ${reqRank})`}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* PENDULUM TAB */}
            {synthesisTab === 'PENDULUM' && (
              <div className="flex flex-col gap-3">
                {/* Active Scales Telemetry */}
                <div className="p-3 rounded-lg bg-black/60 border border-teal-500/40 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-teal-300">TRẠNG THÁI THANG ĐO DAO ĐỘNG HIỆN TẠI:</span>
                    <span className="text-slate-400">
                      Lượt này: {playerState.hasPendulumSummonedThisTurn ? 'Đã Triệu Hồi (Hết)' : 'Khả dụng'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2 rounded bg-slate-900 border border-emerald-500/40">
                      <div className="text-[10px] text-emerald-400 font-mono font-bold">THANG ĐO TRÁI (LEFT SCALE)</div>
                      <div className="text-lg font-black text-emerald-300 font-mono">
                        {playerState.pendulumZones?.left
                          ? `Scale ${playerState.pendulumZones.left.def.pendulumScale} (${playerState.pendulumZones.left.def.name})`
                          : 'Chưa đặt'}
                      </div>
                    </div>

                    <div className="p-2 rounded bg-slate-900 border border-teal-500/40">
                      <div className="text-[10px] text-teal-400 font-mono font-bold">THANG ĐO PHẢI (RIGHT SCALE)</div>
                      <div className="text-lg font-black text-teal-300 font-mono">
                        {playerState.pendulumZones?.right
                          ? `Scale ${playerState.pendulumZones.right.def.pendulumScale} (${playerState.pendulumZones.right.def.name})`
                          : 'Chưa đặt'}
                      </div>
                    </div>
                  </div>

                  {playerState.pendulumZones?.left && playerState.pendulumZones?.right && (
                    <button
                      onClick={handleExecutePendulumSummon}
                      disabled={playerState.hasPendulumSummonedThisTurn}
                      className={`w-full py-2 rounded-lg font-black text-xs transition-all shadow ${
                        !playerState.hasPendulumSummonedThisTurn
                          ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-obsidian shadow-teal-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Triệu Hồi Dao Động Đồng Loạt [Thang Đo {playerState.pendulumZones.left.def.pendulumScale} ↔ {playerState.pendulumZones.right.def.pendulumScale}]
                    </button>
                  )}
                </div>

                {/* Extra Deck Face-Up Pendulum Cards */}
                <div className="p-2 rounded-lg bg-black/40 border border-white/10 flex flex-col gap-1.5">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    Quái Thú Dao Động Ngửa Trong Extra Deck ({playerState.extraDeck.filter(c => c.isFaceUpInExtraDeck).length} lá):
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {playerState.extraDeck
                      .filter(c => c.isFaceUpInExtraDeck)
                      .map((card) => (
                        <div key={card.uid} className="flex flex-col items-center gap-1 shrink-0">
                          <ChemicalCardView card={card.def} size="xs" />
                          <span className="text-[10px] text-emerald-300 font-mono">Scale {card.def.pendulumScale}</span>
                        </div>
                      ))}
                    {!playerState.extraDeck.some(c => c.isFaceUpInExtraDeck) && (
                      <span className="text-xs text-slate-500 italic py-2">
                        Chưa có quái thú dao động nào bị tiêu diệt và chuyển ngửa vào Extra Deck.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* RITUAL TAB */}
            {synthesisTab === 'RITUAL' && (
              <div className="flex flex-col gap-3">
                <div className="p-2.5 rounded-lg bg-black/60 border border-indigo-500/40 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-indigo-300">
                      1. CHỌN QUÁI THÚ TRÊN SÂN ĐỂ HIẾN TẾ LÀM LỄ VẬT NGHI THỨC:
                    </span>
                    <span className="text-amber-300">
                      Tổng Cấp Hiến Tế: {selectedRitualTributes.reduce((acc, idx) => acc + (playerState.monsterZones[idx]?.card?.def.level || 0), 0)}★
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {playerState.monsterZones.map((slot, idx) => {
                      if (!slot || !slot.card) return null;
                      const isPicked = selectedRitualTributes.includes(idx);
                      return (
                        <button
                          key={`ritual_mat_${idx}`}
                          onClick={() =>
                            setSelectedRitualTributes(prev =>
                              prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                            )
                          }
                          className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                            isPicked
                              ? 'border-indigo-400 bg-indigo-950 text-indigo-200 ring-2 ring-indigo-400'
                              : 'border-white/10 bg-slate-800 text-slate-300 hover:border-indigo-400'
                          }`}
                        >
                          <span>Ô {idx + 1}: {slot.card.def.name} ({slot.card.def.level}★)</span>
                          {isPicked && <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Ritual Monsters on Hand List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-indigo-500/40">
                  {playerState.hand
                    .filter((c) => c.def.cardType === 'RITUAL_MONSTER')
                    .map((ritualCard) => {
                      const hasRitualSpell = playerState.hand.some(
                        c => c.def.spellTrapSubtype === 'RITUAL_SPELL' || c.def.id === 'card_spell_crystallization_ritual'
                      );
                      const reqLevel = ritualCard.def.level || 8;
                      const currentTributeLevel = selectedRitualTributes.reduce(
                        (acc, idx) => acc + (playerState.monsterZones[idx]?.card?.def.level || 0),
                        0
                      );
                      const levelSufficient = currentTributeLevel >= reqLevel;
                      const canSummon = hasRitualSpell && levelSufficient;

                      return (
                        <div
                          key={ritualCard.uid}
                          className="p-3 rounded-lg bg-black/60 border border-indigo-500/40 flex flex-col justify-between gap-2"
                        >
                          <div className="flex items-start gap-2">
                            <ChemicalCardView card={ritualCard.def} size="xs" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-indigo-200">{ritualCard.def.name}</span>
                                <span className="px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-400 text-indigo-300 text-[10px] font-mono font-bold">
                                  🕯️ RITUAL {reqLevel}★
                                </span>
                              </div>
                              <div className="text-xs text-amber-300 mt-0.5">Trên Tay: Cần Thẻ Phép Nghi Thức</div>
                              <div className="text-[11px] font-mono text-indigo-300 mt-1">
                                Yêu cầu: Hiến tế quái thú có tổng Cấp &gt;= {reqLevel}★ (Hiện có: {currentTributeLevel}★)
                              </div>
                              <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                                {ritualCard.def.effectText}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleExecuteRitualSummon(ritualCard)}
                            disabled={!canSummon}
                            className={`w-full py-1.5 rounded font-bold text-xs transition-all shadow ${
                              canSummon
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {!hasRitualSpell
                              ? 'Cần Thẻ Phép Nghi Thức trên tay'
                              : !levelSufficient
                              ? `Cần hiến tế thêm (${currentTributeLevel}/${reqLevel}★)`
                              : `Triệu Hồi Nghi Thức (${reqLevel}★)`}
                          </button>
                        </div>
                      );
                    })}
                  {!playerState.hand.some(c => c.def.cardType === 'RITUAL_MONSTER') && (
                    <div className="col-span-2 py-8 text-center text-slate-500 font-mono text-xs">
                      Không có Quái Thú Nghi Thức nào trên tay! (VD: Đại Cầu Buckyball C₆₀ Fullerene)
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Pedagogical Character Quip Balloon */}
      {activeQuip && (
        <div 
          onClick={() => setActiveQuip(null)}
          className="fixed top-16 right-6 z-40 max-w-sm cursor-pointer select-none animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="relative rounded-2xl bg-slate-950/95 border-2 border-amber-400/80 p-3.5 shadow-2xl shadow-amber-950/60 backdrop-blur-md">
            {/* Persona Avatar Badge & Speaker Info */}
            <div className="flex items-center gap-2.5 mb-2 border-b border-amber-500/20 pb-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-black text-xs shadow-md ${
                activeQuip.persona === 'MENDELEEV'
                  ? 'bg-gradient-to-tr from-amber-600 to-yellow-400 text-slate-950'
                  : activeQuip.persona === 'CURIE'
                  ? 'bg-gradient-to-tr from-fuchsia-600 to-purple-400 text-white'
                  : activeQuip.persona === 'LAVOISIER'
                  ? 'bg-gradient-to-tr from-cyan-600 to-teal-400 text-slate-950'
                  : 'bg-gradient-to-tr from-indigo-600 to-blue-400 text-white'
              }`}>
                {activeQuip.persona === 'MENDELEEV' ? 'Dm' : activeQuip.persona === 'CURIE' ? 'Ra' : activeQuip.persona === 'LAVOISIER' ? 'Al' : 'El'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-amber-200 truncate">{activeQuip.speaker}</div>
                <div className="text-[10px] text-amber-400/80 font-mono truncate">{activeQuip.title}</div>
              </div>
              <span className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">✕</span>
            </div>

            {/* Quote VI */}
            <p className="text-xs font-medium text-slate-100 leading-relaxed mb-1 italic">
              "{activeQuip.quoteVI}"
            </p>

            {/* Quote EN */}
            <p className="text-[11px] text-slate-400/90 leading-tight mb-2 italic">
              "{activeQuip.quoteEN}"
            </p>

            {/* Scientific Context GDPT 2018 / IUPAC */}
            <div className="rounded-lg bg-amber-950/40 border border-amber-500/30 p-2 text-[10.5px] text-amber-200/90 leading-tight">
              <span className="font-bold text-amber-300 font-mono block mb-0.5">💡 Luận Cứ GDPT 2018 &amp; IUPAC:</span>
              {activeQuip.scientificContextVI}
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Extra Deck Summon Cut-In Overlay */}
      {summonCutIn && (
        <div 
          onClick={() => setSummonCutIn(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer select-none"
        >
          {/* Radial Elemental Light Burst */}
          <div className={`absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse ${
            summonCutIn.type === 'COMPOUND'
              ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600'
              : summonCutIn.type === 'SYNCHRO'
              ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-white'
              : summonCutIn.type === 'XYZ'
              ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-slate-900'
              : summonCutIn.type === 'PENDULUM'
              ? 'bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-400'
              : summonCutIn.type === 'RITUAL'
              ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600'
              : summonCutIn.type === 'LINK'
              ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500'
              : 'bg-gradient-to-r from-amber-500 via-rose-600 to-orange-500'
          }`} />

          <div className="relative z-10 flex flex-col items-center gap-4 max-w-md text-center transform scale-100">
            {/* Header Badge */}
            <div className={`px-4 py-1.5 rounded-full text-xs font-mono font-black tracking-widest uppercase border shadow-xl flex items-center gap-2 ${
              summonCutIn.type === 'COMPOUND'
                ? 'bg-purple-950/90 text-purple-200 border-purple-400 shadow-purple-900/60'
                : summonCutIn.type === 'SYNCHRO'
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-400 shadow-emerald-900/60'
                : summonCutIn.type === 'XYZ'
                ? 'bg-black/90 text-amber-300 border-amber-400 shadow-amber-900/60'
                : summonCutIn.type === 'PENDULUM'
                ? 'bg-teal-950/90 text-teal-200 border-teal-400 shadow-teal-900/60'
                : summonCutIn.type === 'RITUAL'
                ? 'bg-indigo-950/90 text-indigo-200 border-indigo-400 shadow-indigo-900/60'
                : summonCutIn.type === 'LINK'
                ? 'bg-cyan-950/90 text-cyan-200 border-cyan-400 shadow-cyan-900/60'
                : 'bg-amber-950/90 text-amber-200 border-amber-400 shadow-amber-900/60'
            }`}>
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>
                {summonCutIn.type === 'COMPOUND'
                  ? 'TỔNG HỢP HỢP CHẤT THÀNH CÔNG!'
                  : summonCutIn.type === 'SYNCHRO'
                  ? 'TRIỆU HỒI ĐỒNG BỘ (SYNCHRO) XÚC TÁC!'
                  : summonCutIn.type === 'XYZ'
                  ? 'TRIỆU HỒI PHỨC CHẤT CHỒNG LỚP (XYZ)!'
                  : summonCutIn.type === 'PENDULUM'
                  ? 'TRIỆU HỒI DAO ĐỘNG LƯỠNG TÍNH (PENDULUM)!'
                  : summonCutIn.type === 'RITUAL'
                  ? 'TRIỆU HỒI NGHI THỨC KẾT TINH (RITUAL)!'
                  : summonCutIn.type === 'LINK'
                  ? 'TRIỆU HỒI LIÊN KẾT ĐẶC BIỆT!'
                  : 'KÍCH HOẠT PHÉP PHẢN ỨNG HÓA HỌC!'}
              </span>
            </div>

            {/* Glowing Card Frame */}
            <div className={`p-2 rounded-2xl border-2 shadow-2xl transition-all ${
              summonCutIn.type === 'COMPOUND'
                ? 'border-purple-400/80 shadow-purple-500/50 bg-purple-950/40'
                : summonCutIn.type === 'SYNCHRO'
                ? 'border-emerald-400/80 shadow-emerald-500/50 bg-emerald-950/40'
                : summonCutIn.type === 'XYZ'
                ? 'border-amber-400/80 shadow-amber-500/50 bg-black/70'
                : summonCutIn.type === 'PENDULUM'
                ? 'border-teal-400/80 shadow-teal-500/50 bg-teal-950/40'
                : summonCutIn.type === 'RITUAL'
                ? 'border-indigo-400/80 shadow-indigo-500/50 bg-indigo-950/40'
                : summonCutIn.type === 'LINK'
                ? 'border-cyan-400/80 shadow-cyan-500/50 bg-cyan-950/40'
                : 'border-amber-400/80 shadow-amber-500/50 bg-amber-950/40'
            }`}>
              <ChemicalCardView card={summonCutIn.card} size="lg" />
            </div>

            {/* Equation / Materials Subtitle */}
            {summonCutIn.equation && (
              <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-white/20 font-mono text-xs font-bold text-emerald-300 shadow-lg">
                {summonCutIn.equation}
              </div>
            )}

            <span className="text-[11px] font-mono text-slate-400 animate-pulse">
              (Nhấp bất kỳ đâu để tiếp tục trận đấu)
            </span>
          </div>
        </div>
      )}

      {/* Graveyard & Banished Zone Modal */}
      {graveModal && (() => {
        const activeZone = graveModal.activeZone || 'PLAYER_GRAVE';
        let displayCards: CardInstance[] = [];
        let defaultTitle = '';
        let isBanished = false;

        switch (activeZone) {
          case 'PLAYER_GRAVE':
            displayCards = playerState.graveyard;
            defaultTitle = 'Mộ Bài Của Bạn (Graveyard)';
            isBanished = false;
            break;
          case 'PLAYER_BANISHED':
            displayCards = playerState.banished;
            defaultTitle = 'Vùng Bị Loại Của Bạn (Banished)';
            isBanished = true;
            break;
          case 'OPPONENT_GRAVE':
            displayCards = opponentState.graveyard;
            defaultTitle = 'Mộ Bài Đối Thủ (Opponent Graveyard)';
            isBanished = false;
            break;
          case 'OPPONENT_BANISHED':
            displayCards = opponentState.banished;
            defaultTitle = 'Vùng Bị Loại Của Đối Thủ (Opponent Banished)';
            isBanished = true;
            break;
          default:
            displayCards = graveModal.cards || [];
            defaultTitle = graveModal.title || 'Vùng Thẻ Bài';
            isBanished = defaultTitle.includes('Loại') || defaultTitle.includes('Banished');
        }

        const filterType = graveModal.filterType || 'ALL';
        const searchQuery = (graveModal.searchQuery || '').trim().toLowerCase();

        // Breakdown counts
        const monsterCount = displayCards.filter(c => c.def.cardType === 'ELEMENT_MONSTER').length;
        const compoundCount = displayCards.filter(c => c.def.cardType === 'COMPOUND_MONSTER').length;
        const extraCount = displayCards.filter(c => c.def.cardType === 'LINK_MONSTER' || c.def.cardType === 'SYNCHRO_MONSTER' || c.def.cardType === 'XYZ_MONSTER' || Boolean(c.def.synchroLevel) || Boolean(c.def.xyzRank)).length;
        const spellCount = displayCards.filter(c => c.def.cardType === 'REACTION_SPELL' || c.def.cardType === 'EQUIP_CATALYST' || c.def.cardType === 'FIELD_ENVIRONMENT').length;
        const trapCount = displayCards.filter(c => c.def.cardType === 'TRAP').length;

        // Filtered cards
        const filteredCards = displayCards.filter(c => {
          if (filterType === 'MONSTER' && c.def.cardType !== 'ELEMENT_MONSTER') return false;
          if (filterType === 'COMPOUND' && c.def.cardType !== 'COMPOUND_MONSTER') return false;
          if (filterType === 'EXTRA' && c.def.cardType !== 'LINK_MONSTER' && c.def.cardType !== 'SYNCHRO_MONSTER' && c.def.cardType !== 'XYZ_MONSTER' && !c.def.synchroLevel && !c.def.xyzRank) return false;
          if (filterType === 'SPELL' && c.def.cardType !== 'REACTION_SPELL' && c.def.cardType !== 'EQUIP_CATALYST' && c.def.cardType !== 'FIELD_ENVIRONMENT') return false;
          if (filterType === 'TRAP' && c.def.cardType !== 'TRAP') return false;

          if (searchQuery) {
            const nameVi = (c.def.name || '').toLowerCase();
            const nameEn = (c.def.name_en || '').toLowerCase();
            const formula = (c.def.chemicalFormula || '').toLowerCase();
            const effect = (c.def.effectText || '').toLowerCase();
            return nameVi.includes(searchQuery) || nameEn.includes(searchQuery) || formula.includes(searchQuery) || effect.includes(searchQuery);
          }
          return true;
        });

        const selected = graveModal.selectedCard || null;

        return (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
            <div className={`w-full max-w-4xl max-h-[90vh] rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3.5 border-2 overflow-hidden ${
              isBanished
                ? 'bg-gradient-to-b from-purple-950/95 via-slate-900 to-black border-fuchsia-500/70 shadow-fuchsia-950/60'
                : 'bg-gradient-to-b from-slate-900 via-zinc-950 to-black border-zinc-600 shadow-zinc-950/80'
            }`}>
              {/* Modal Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  {isBanished ? (
                    <Trash2 className="w-5 h-5 text-fuchsia-400" />
                  ) : (
                    <Skull className="w-5 h-5 text-zinc-300" />
                  )}
                  <h3 className={`font-serif font-black text-lg ${isBanished ? 'text-fuchsia-300' : 'text-zinc-200'}`}>
                    {defaultTitle} ({displayCards.length} lá)
                  </h3>
                </div>

                {/* 4 Quick Switch Zone Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setGraveModal(prev => prev ? { ...prev, activeZone: 'PLAYER_GRAVE', selectedCard: null } : null)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all ${
                      activeZone === 'PLAYER_GRAVE'
                        ? 'bg-cyan-500 text-obsidian shadow'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10'
                    }`}
                  >
                    <Skull className="w-3 h-3 text-cyan-400" />
                    Mộ Bạn ({playerState.graveyard.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setGraveModal(prev => prev ? { ...prev, activeZone: 'PLAYER_BANISHED', selectedCard: null } : null)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all ${
                      activeZone === 'PLAYER_BANISHED'
                        ? 'bg-fuchsia-500 text-obsidian shadow'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10'
                    }`}
                  >
                    <Trash2 className="w-3 h-3 text-fuchsia-400" />
                    Loại Bạn ({playerState.banished.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setGraveModal(prev => prev ? { ...prev, activeZone: 'OPPONENT_GRAVE', selectedCard: null } : null)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all ${
                      activeZone === 'OPPONENT_GRAVE'
                        ? 'bg-amber-400 text-obsidian shadow'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10'
                    }`}
                  >
                    <Skull className="w-3 h-3 text-amber-400" />
                    Mộ Đ.Thủ ({opponentState.graveyard.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setGraveModal(prev => prev ? { ...prev, activeZone: 'OPPONENT_BANISHED', selectedCard: null } : null)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all ${
                      activeZone === 'OPPONENT_BANISHED'
                        ? 'bg-purple-500 text-obsidian shadow'
                        : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-white/10'
                    }`}
                  >
                    <Trash2 className="w-3 h-3 text-purple-400" />
                    Loại Đ.Thủ ({opponentState.banished.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setGraveModal(null)}
                    className="ml-2 text-slate-400 hover:text-white px-2 py-1 text-xs font-mono font-bold rounded bg-slate-800 hover:bg-slate-700 border border-white/10"
                  >
                    ✕ ĐÓNG
                  </button>
                </div>
              </div>

              {/* Context Banner */}
              <div className="text-[11px] font-mono p-2 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-slate-400">
                <span>
                  {isBanished
                    ? '🌌 Vùng Hư Vô (Banished): Thẻ bài phân hủy hoàn toàn, giải phóng photon và hạt cơ bản. Không thể hồi sinh bằng phép nghĩa địa thông thường.'
                    : '⚰️ Nghĩa Địa (Graveyard): Tro tàn hóa học & ion tự do. Có thể tái sinh qua phản ứng thế hoặc tái tổng hợp hợp chất.'}
                </span>
                <span className="text-cyan-ion font-bold shrink-0 ml-2">
                  Hiển thị: {filteredCards.length}/{displayCards.length}
                </span>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 min-w-[180px]">
                  <input
                    type="text"
                    value={graveModal.searchQuery || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setGraveModal(prev => prev ? { ...prev, searchQuery: val } : null);
                    }}
                    placeholder="Tìm theo tên, công thức (H2O, Fe), hiệu ứng..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-ion"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 flex-wrap">
                  {[
                    { id: 'ALL', label: `Tất cả (${displayCards.length})` },
                    { id: 'MONSTER', label: `Quái (${monsterCount})` },
                    { id: 'COMPOUND', label: `Hợp chất (${compoundCount})` },
                    { id: 'EXTRA', label: `Extra (${extraCount})` },
                    { id: 'SPELL', label: `Phép (${spellCount})` },
                    { id: 'TRAP', label: `Bẫy (${trapCount})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setGraveModal(prev => prev ? { ...prev, filterType: tab.id as any } : null)}
                      className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                        filterType === tab.id
                          ? 'bg-cyan-ion text-obsidian shadow'
                          : 'bg-slate-800/70 hover:bg-slate-700 text-slate-400 border border-white/5'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area: Cards Grid & Inspection Dossier */}
              <div className="flex-1 overflow-y-auto min-h-0 flex flex-col md:flex-row gap-3 scrollbar-thin scrollbar-thumb-cyan-ion/40">
                {/* Cards Grid */}
                <div className={`flex-1 overflow-y-auto max-h-[50vh] p-1 ${
                  selected ? 'md:max-w-[55%]' : 'w-full'
                }`}>
                  {filteredCards.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 font-mono text-xs flex flex-col items-center gap-2">
                      <Skull className="w-8 h-8 opacity-40 text-slate-600" />
                      <span>{displayCards.length === 0 ? 'Vùng này hiện chưa có lá bài nào.' : 'Không tìm thấy lá bài nào khớp bộ lọc.'}</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {filteredCards.map((c, i) => {
                        const isCardSelected = selected?.uid === c.uid;
                        const isOpponentFaceDown = graveModal.activeZone === 'OPPONENT_BANISHED' && c.isFaceDown;
                        const isPlayerFaceDown = graveModal.activeZone === 'PLAYER_BANISHED' && c.isFaceDown;

                        return (
                          <div
                            key={`${c.uid}_${i}`}
                            onClick={() => {
                              if (isOpponentFaceDown) {
                                setActionFeedback('Không thể xem thông tin thẻ bị trục xuất úp mặt của đối thủ (Rulebook v10 tr. 55)!');
                                return;
                              }
                              setGraveModal(prev => prev ? { ...prev, selectedCard: c, showScientificBohr: false } : null);
                              setInspectCard(c);
                            }}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                              isOpponentFaceDown
                                ? 'bg-purple-950/40 border-purple-900/60 cursor-not-allowed opacity-80'
                                : isCardSelected
                                  ? 'bg-cyan-950/70 border-cyan-ion shadow-lg shadow-cyan-950/60 ring-1 ring-cyan-ion cursor-pointer'
                                  : 'bg-black/50 hover:bg-slate-800/70 border-white/10 hover:border-cyan-ion/40 cursor-pointer'
                            }`}
                          >
                            <ChemicalCardView card={c.def} size="xs" isFaceDown={isOpponentFaceDown} />
                            <span className="text-[11px] font-mono font-bold text-center truncate w-full text-slate-200">
                              {isOpponentFaceDown ? '??? (Úp Mặt)' : c.def.name}
                            </span>
                            {isOpponentFaceDown ? (
                              <span className="text-[8px] font-mono text-purple-400 font-bold px-1 py-0.2 rounded bg-purple-950 border border-purple-800">
                                🔒 BẢO MẬT (R.55)
                              </span>
                            ) : (
                              <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                                {isPlayerFaceDown && (
                                  <span className="px-1 rounded bg-amber-950 border border-amber-600/60 text-amber-300 font-bold text-[8px]">
                                    🔒 ÚP MẶT
                                  </span>
                                )}
                                {c.def.chemicalFormula && <span className="px-1 rounded bg-black/60 text-cyan-300 font-bold">{c.def.chemicalFormula}</span>}
                                {c.def.level && <span>★{c.def.level}</span>}
                                {c.def.atk !== undefined && <span>{c.def.atk}/{c.def.def}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Inspection Dossier Panel */}
                {selected && (
                  <div className="md:w-[45%] flex flex-col gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-cyan-ion/40 overflow-y-auto max-h-[50vh] text-slate-200">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <Atom className="w-4 h-4 text-cyan-ion" />
                        <h4 className="font-serif font-black text-sm text-cyan-300 truncate">
                          {selected.def.name}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGraveModal(prev => prev ? { ...prev, selectedCard: null, showScientificBohr: false } : null)}
                        className="text-slate-400 hover:text-white text-xs font-mono px-1.5 py-0.5 rounded bg-slate-800"
                      >
                        ✕ Đóng
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-ion text-cyan-300 font-bold">
                        {selected.def.chemicalFormula || selected.def.name_en || selected.def.cardType}
                      </span>
                      <span className="text-[11px] text-amber-300 font-bold">
                        {selected.def.rarity}
                      </span>
                      {selected.def.level && <span>Cấp {selected.def.level}★</span>}
                      {selected.def.atk !== undefined && (
                        <span className="text-red-400 font-bold">
                          ⚔️ {selected.def.atk} / 🛡️ {selected.def.def}
                        </span>
                      )}
                    </div>

                    {selected.isFaceDown && (
                      <div className="p-2 rounded bg-amber-950/70 border border-amber-500/50 text-[10px] text-amber-200 font-mono flex flex-col gap-0.5">
                        <span className="font-bold text-amber-300 flex items-center gap-1">
                          🔒 QUY TẮC TRỤC XUẤT ÚP MẶT (RULEBOOK V10 TR. 55)
                        </span>
                        <span>
                          Thẻ này bị trục xuất Úp Mặt: được coi như không có tên, hệ, cấp hay thuộc tính công khai. Không thể kích hoạt hiệu ứng hay chọn làm mục tiêu theo thuộc tính.
                        </span>
                      </div>
                    )}

                    <p className="text-xs font-mono text-slate-300 leading-relaxed bg-black/40 p-2 rounded border border-white/5">
                      {selected.def.effectText}
                    </p>

                    {selected.def.scientificLore && (
                      <p className="text-[11px] italic text-slate-400 leading-snug">
                        "{selected.def.scientificLore}"
                      </p>
                    )}

                    {/* Scientific Bohr / Orbital Toggle */}
                    <button
                      type="button"
                      onClick={() => setGraveModal(prev => prev ? { ...prev, showScientificBohr: !prev.showScientificBohr } : null)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-ion/60 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow"
                    >
                      <Atom className="w-3.5 h-3.5 text-cyan-ion animate-spin" style={{ animationDuration: '6s' }} />
                      {graveModal.showScientificBohr ? 'Thu Gọn Kính Hiển Vi' : '🔬 Kính Hiển Vi Nguyên Tử Bohr & Orbital'}
                    </button>

                    {/* Expanded Scientific Inspector */}
                    {graveModal.showScientificBohr && (
                      <div className="mt-1 pt-2 border-t border-cyan-ion/30">
                        <CardScientificInspector
                          card={selected.def}
                          onSelectCard={(c: PlayableCardDef) => {
                            const found = displayCards.find(dc => dc.def.id === c.id);
                            if (found) {
                              setGraveModal(prev => prev ? { ...prev, selectedCard: found } : null);
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Tribute Summon Modal */}
      {showTributeModal && tributeTargetCard && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500 rounded-xl p-5 shadow-2xl flex flex-col gap-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
              <div className="flex items-center gap-2 text-amber-300 font-serif font-black text-lg">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Triệu Hồi Hiến Tế — Cấp {tributeTargetCard.def.level}★</span>
              </div>
              <button
                onClick={() => {
                  setShowTributeModal(false);
                  setTributeTargetCard(null);
                  setSelectedTributeSlots([]);
                }}
                className="text-slate-400 hover:text-white font-mono font-bold text-sm"
              >
                ✕ HỦY
              </button>
            </div>

            <div className="flex items-center gap-4 bg-black/50 p-3 rounded-lg border border-white/10">
              <ChemicalCardView card={tributeTargetCard.def} size="sm" />
              <div className="flex-1 text-xs font-mono space-y-1">
                <div className="font-bold text-amber-300 text-sm">{tributeTargetCard.def.name} ({tributeTargetCard.def.chemicalFormula})</div>
                <div className="text-slate-300">Cấp sao yêu cầu: <span className="text-amber-400 font-bold">{tributeTargetCard.def.level}★</span></div>
                <div className="text-[11px] text-cyan-300 bg-cyan-950/40 p-1.5 rounded border border-cyan-800/40">
                  ⚖️ <span className="font-bold">Luật ELEMENTA:</span> Chỉ hiến tế quái thú có số sao nhỏ hơn (&lt; {tributeTargetCard.def.level}★). Tổng sao hiến tế phải ≥ {tributeTargetCard.def.level}★.
                </div>
              </div>
            </div>

            {/* Field monster sacrifice selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-slate-300 font-bold">
                Chọn quái thú trên sân của bạn để hiến tế:
              </span>
              <div className="grid grid-cols-5 gap-2">
                {playerState.monsterZones.map((slot, idx) => {
                  if (!slot || !slot.card) {
                    return (
                      <div key={`trib_slot_${idx}`} className="h-24 rounded border border-dashed border-slate-700/60 bg-black/30 flex items-center justify-center text-[10px] text-slate-600 font-mono text-center p-1">
                        Ô {idx + 1}<br/>Trống
                      </div>
                    );
                  }
                  const isInvalidLevel = (slot.card.def.level || 0) >= (tributeTargetCard.def.level || 0);
                  const isSelected = selectedTributeSlots.includes(idx);
                  return (
                    <button
                      key={`trib_slot_${idx}`}
                      type="button"
                      disabled={isInvalidLevel}
                      onClick={() => {
                        setSelectedTributeSlots(prev =>
                          prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                        );
                      }}
                      className={`h-24 rounded border flex flex-col items-center justify-between p-1 transition-all ${
                        isInvalidLevel
                          ? 'border-red-900/40 bg-red-950/20 opacity-40 cursor-not-allowed'
                          : isSelected
                          ? 'border-amber-400 bg-amber-950/60 ring-2 ring-amber-400 scale-102 shadow-lg shadow-amber-500/30'
                          : 'border-white/10 bg-slate-800 hover:border-amber-400 cursor-pointer'
                      }`}
                    >
                      <span className="text-[9px] font-mono text-slate-400">Ô {idx + 1}</span>
                      <span className="text-[10px] font-bold text-center truncate w-full text-slate-200">
                        {slot.card.def.chemicalFormula || slot.card.def.name}
                      </span>
                      <span className="text-[10px] font-mono text-amber-300 font-bold">
                        {slot.card.def.level || 1}★
                      </span>
                      {isSelected ? (
                        <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-slate-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total stars counter & summary */}
            {(() => {
              const totalStars = selectedTributeSlots.reduce((acc, idx) => acc + (playerState.monsterZones[idx]?.card?.def.level || 0), 0);
              const requiredStars = tributeTargetCard.def.level || 0;
              const isSufficient = totalStars >= requiredStars;
              return (
                <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300">Tổng số sao hiến tế:</span>
                    <span className={`font-bold ${isSufficient ? 'text-emerald-400' : 'text-red-400'}`}>
                      {totalStars} / {requiredStars}★ {isSufficient ? '✓ Đủ điều kiện!' : '✕ Chưa đủ sao'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={!isSufficient}
                      onClick={() => handleExecuteTributeSummon('FACE_UP_ATTACK')}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                        isSufficient
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-obsidian font-black cursor-pointer'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Sword className="w-3.5 h-3.5" />
                      Hiến Tế & Triệu Hồi Tấn Công
                    </button>
                    <button
                      disabled={!isSufficient}
                      onClick={() => handleExecuteTributeSummon('FACE_DOWN_DEFENSE')}
                      className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        isSufficient
                          ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-white/10 cursor-pointer'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Úp Thủ
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Floating Combat VFX Overlay with 5-Substep Damage Step Progress */}
      {combatVfx && combatVfx.active && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center p-4">
          <div className="transform scale-125 font-serif font-black text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 drop-shadow-[0_0_25px_rgba(239,68,68,0.9)] tracking-widest uppercase animate-bounce mb-3">
            {combatVfx.text}
          </div>

          {/* Visual 5-Substep Damage Step Progress Pipeline (Rulebook v10 tr. 41; Cẩm nang §6) */}
          {combatVfx.substeps && combatVfx.substeps.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-2 rounded-xl bg-black/90 border border-amber-500/50 shadow-2xl backdrop-blur-md max-w-xl animate-fade-in">
              <span className="text-[10px] font-mono text-amber-300 font-bold uppercase w-full text-center tracking-wider mb-1">
                TIẾN TRÌNH DAMAGE STEP (5 MỐC THỜI GIAN MASTER RULE)
              </span>
              {combatVfx.substeps.map((step, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 rounded bg-slate-900 border border-amber-400/40 text-[10px] font-mono text-amber-200 flex items-center gap-1 shadow"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-obsidian font-black flex items-center justify-center text-[9px]">
                    {idx + 1}
                  </span>
                  <span>{step.split(':')[1]?.trim() || step}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Trap 3-Second Reveal Modal Overlay */}
      {trapReveal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in pointer-events-none">
          <div className="max-w-md w-full bg-gradient-to-b from-purple-950/90 to-slate-950 border-2 border-purple-400 rounded-2xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.5)] text-center flex flex-col items-center gap-4 animate-scale-in">
            <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs uppercase tracking-wider border border-purple-400/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              KÍCH HOẠT BẪY HÓA HỌC (3 GIÂY)
            </div>
            <div className="transform scale-110 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
              <ChemicalCardView card={trapReveal.card.def} size="sm" />
            </div>
            <div className="space-y-1">
              <div className="font-serif font-black text-xl text-purple-200">
                {trapReveal.card.def.name}
              </div>
              <p className="text-xs font-mono text-slate-300">
                {trapReveal.message}
              </p>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-purple-500 animate-[pulse_1s_infinite] w-full" />
            </div>
          </div>
        </div>
      )}

      {/* FLOATING VISUAL CHAIN LINK STACK OVERLAY (Yu-Gi-Oh! Rulebook v10 tr. 42-45) */}
      {showChainOverlay && activeChain && activeChain.items.length > 0 && (
        <div className="fixed top-20 right-4 z-40 max-w-sm w-full bg-slate-900/95 backdrop-blur-md border-2 border-amber-400/80 rounded-2xl p-3.5 shadow-2xl flex flex-col gap-2.5 animate-slide-down text-slate-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <h4 className="font-serif font-black text-xs text-amber-300">
                CHUỖI HIỆU ỨNG (CHAIN STACK)
              </h4>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/50 text-amber-300 font-mono text-[10px] font-bold">
                {activeChain.items.length} Link
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowChainOverlay(false)}
              className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono border border-white/10"
            >
              ✕ Ẩn
            </button>
          </div>

          <p className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Thứ tự giải quyết: LIFO (Đảo ngược)</span>
            <span className="text-emerald-400 font-bold">Link {activeChain.items.length} ➔ Link 1</span>
          </p>

          {/* Chain Links Stack: Highest Chain Link at top (resolves first in LIFO) */}
          <div className="flex flex-col gap-1.5 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400/30 p-0.5">
            {[...activeChain.items].reverse().map((item, idx) => {
              const isFirstToResolve = idx === 0;
              const isPlayer = item.activatorPlayerId === 'player';
              const ssBadgeColor = item.spellSpeed === 3
                ? 'bg-red-950 border-red-500 text-red-300'
                : item.spellSpeed === 2
                ? 'bg-amber-950 border-amber-500 text-amber-300'
                : 'bg-cyan-950 border-cyan-500 text-cyan-300';

              return (
                <div
                  key={`${item.chainIndex}_${idx}`}
                  className={`p-2 rounded-xl border flex flex-col gap-1 transition-all ${
                    isFirstToResolve
                      ? 'bg-amber-950/40 border-amber-400 shadow-md shadow-amber-950/40 ring-1 ring-amber-400/60'
                      : 'bg-black/60 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-black border ${
                        isFirstToResolve ? 'bg-amber-400 text-obsidian' : 'bg-slate-800 text-slate-300'
                      }`}>
                        Link {item.chainIndex}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded font-mono text-[9px] border ${ssBadgeColor}`}>
                        Tốc độ {item.spellSpeed} (SS{item.spellSpeed})
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${
                      isPlayer ? 'text-cyan-400' : 'text-amber-400'
                    }`}>
                      {isPlayer ? 'Bản Thân' : 'Đối Thủ'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-200 truncate">
                      {item.cardName}
                    </span>
                    {item.chemicalFormula && (
                      <span className="px-1 py-0.2 rounded bg-black/70 text-cyan-300 font-mono text-[9px] font-bold">
                        {item.chemicalFormula}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="truncate">{item.description || 'Kích hoạt hiệu ứng'}</span>
                    {item.isNegated ? (
                      <span className="text-red-400 font-bold shrink-0">✕ Vô Hiệu Hóa</span>
                    ) : (
                      <span className="text-emerald-400 font-bold shrink-0">✓ Thực Thi LIFO</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DUEL ROOM MATCH SETTINGS MODAL */}
      {isMatchSettingsModalOpen && (
        <div
          onClick={() => setIsMatchSettingsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-slate-900 border-2 border-cyan-ion rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-ion" />
                <h3 className="font-serif font-black text-lg text-cyan-300">
                  THIẾT LẬP PHÒNG ĐẤU (DUEL CONFIGURATION)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMatchSettingsModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Section 1: Life Points Setting */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                <span>ĐIỂM SINH MỆNH KHỞI ĐẦU (STARTING LIFE POINTS)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMatchLpSetting(8000)}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    matchLpSetting === 8000
                      ? 'bg-cyan-950/80 border-cyan-ion ring-1 ring-cyan-ion shadow-lg shadow-cyan-950/60'
                      : 'bg-black/50 border-white/10 hover:border-white/30 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-cyan-200">8,000 LP</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300">Chuẩn TCG</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Chuẩn thi đấu Master Rule 2020 / Rulebook v10 tr. 4. Phù hợp các trận chiến toàn diện, chuỗi phản ứng sâu.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setMatchLpSetting(4000)}
                  className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                    matchLpSetting === 4000
                      ? 'bg-amber-950/80 border-amber-400 ring-1 ring-amber-400 shadow-lg shadow-amber-950/60'
                      : 'bg-black/50 border-white/10 hover:border-white/30 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-amber-200">4,000 LP</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-900/60 text-amber-300">Speed Duel</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Đấu tốc độ nhanh gọn cho tiết học 45 phút, ôn tập nhanh hoặc thực hành chuỗi phản ứng cấp tốc.
                  </p>
                </button>
              </div>
            </div>

            {/* Section 2: Turn Timer */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>THỜI GIAN ĐẾM NGƯỢC LƯỢT ĐẤU (TURN TIMER)</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { value: 30, label: '30 Giây', desc: 'Chớp nhoáng' },
                  { value: 60, label: '60 Giây', desc: 'Tiêu chuẩn' },
                  { value: 90, label: '90 Giây', desc: 'Chiến thuật' },
                  { value: 0, label: 'Vô Hạn (∞)', desc: 'Học tập' }
                ].map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTurnTimerSetting(t.value)}
                    className={`p-2 rounded-xl border text-center flex flex-col items-center gap-0.5 transition-all ${
                      turnTimerSetting === t.value
                        ? 'bg-cyan-950/80 border-cyan-ion ring-1 ring-cyan-ion text-cyan-200'
                        : 'bg-black/50 border-white/10 hover:border-white/30 text-slate-400'
                    }`}
                  >
                    <span className="font-bold text-xs">{t.label}</span>
                    <span className="text-[10px] text-slate-500">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 3: AI Opponent Persona & Difficulty */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>CẤP ĐỘ ĐỐI THỦ AI & NHÂN CÁCH (AI PERSONA)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { id: 'NOVICE', name: 'Alpha', title: 'Học Viên', desc: 'Đấu đơn giản' },
                  { id: 'ADEPT', name: 'Beta', title: 'Chiến Binh', desc: 'Phản ứng cơ bản' },
                  { id: 'EXPERT', name: 'Gamma', title: 'Bậc Thầy', desc: 'Combo Extra Deck' },
                  { id: 'MENDELEEV', name: 'Mendeleev', title: 'Đại Sư', desc: 'Master Rule đỉnh cao' }
                ].map((ai) => (
                  <button
                    key={ai.id}
                    type="button"
                    onClick={() => setAiLevel(ai.id as AiLevel)}
                    className={`p-2 rounded-xl border text-center flex flex-col items-center gap-0.5 transition-all ${
                      aiLevel === ai.id
                        ? 'bg-amber-950/80 border-amber-400 ring-1 ring-amber-400 text-amber-200'
                        : 'bg-black/50 border-white/10 hover:border-white/30 text-slate-400'
                    }`}
                  >
                    <span className="font-bold text-xs">{ai.name}</span>
                    <span className="text-[10px] text-slate-400">{ai.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 4: Initial Environment Hazard Preset */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                <span>MÔI TRƯỜNG PHẢN ỨNG KHỞI ĐẦU (ENVIRONMENT HAZARD)</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {[
                  { id: 'DEFAULT', label: 'Chuẩn', desc: 'pH 7.0 • 298K' },
                  { id: 'ACID_RAIN', label: 'Mưa Axit', desc: 'pH 2.8' },
                  { id: 'HABER', label: 'Lò Haber', desc: '200 atm' },
                  { id: 'CRYO', label: 'Siêu Lạnh', desc: '-20°C' },
                  { id: 'VOLCANO', label: 'Núi Lửa', desc: '343K • Axit' }
                ].map((env) => (
                  <button
                    key={env.id}
                    type="button"
                    onClick={() => setSelectedEnvPreset(env.id)}
                    className={`p-1.5 rounded-lg border text-center flex flex-col items-center gap-0.5 transition-all ${
                      selectedEnvPreset === env.id
                        ? 'bg-emerald-950/80 border-emerald-400 ring-1 ring-emerald-400 text-emerald-200'
                        : 'bg-black/50 border-white/10 hover:border-white/30 text-slate-400'
                    }`}
                  >
                    <span className="font-bold text-[11px]">{env.label}</span>
                    <span className="text-[9px] text-slate-500">{env.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  handleRestartDuel(aiLevel, matchLpSetting, selectedEnvPreset);
                  setIsMatchSettingsModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-ion to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-obsidian font-black text-xs flex items-center gap-1.5 shadow-lg"
              >
                <CheckCircle className="w-4 h-4" />
                Áp Dụng & Tái Đấu Ngay
              </button>
              <button
                type="button"
                onClick={() => setIsMatchSettingsModalOpen(false)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IN-DUEL DECK TUTOR & CARD SEARCH MODAL (Rulebook v10 tr. 33) */}
      {isDeckTutorModalOpen && (
        <div
          onClick={() => setIsDeckTutorModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full bg-slate-900 border-2 border-purple-500 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-slate-200 max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300">
                    CHIẾT TÁCH & TÌM KIẾM BỘ BÀI (SEARCH DECK)
                  </h3>
                  <div className="text-[11px] font-mono text-purple-400/80">
                    Yu-Gi-Oh! Rulebook v10 tr. 33 & Phương pháp Tách chất Chọn lọc IUPAC
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDeckTutorModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Scientific & Master Rule Guidance Banner */}
            <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-mono flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="font-bold text-purple-300">Quy tắc Thi đấu Chính thức:</span> Người chơi được quyền tìm kiếm lá bài mục tiêu từ Bộ Bài chính, công khai cho đối thủ xác thực và <span className="text-cyan-300 font-bold">bắt buộc xáo trộn lại Bộ Bài</span> sau khi hoàn tất.
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'MONSTER', 'COMPOUND', 'SPELL', 'TRAP'] as const).map(cat => {
                  const labelMap = {
                    ALL: 'Tất Cả',
                    MONSTER: 'Quái Tố',
                    COMPOUND: 'Hợp Chất',
                    SPELL: 'Phép Phản Ứng',
                    TRAP: 'Bẫy Chiến Thuật'
                  };
                  const count = engine.getSearchableDeckCards('player', cat === 'ALL' ? undefined : { category: cat }).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setTutorCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                        tutorCategoryFilter === cat
                          ? 'bg-purple-600 border-purple-400 text-white shadow'
                          : 'bg-slate-800/80 border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {labelMap[cat]} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Destination Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/10 text-xs font-mono">
                <span className="text-[11px] text-slate-400 px-1 font-bold">Đích:</span>
                {(['HAND', 'FIELD', 'GRAVEYARD'] as const).map(dest => {
                  const destNames = {
                    HAND: 'Tay',
                    FIELD: 'Sân',
                    GRAVEYARD: 'Mộ'
                  };
                  return (
                    <button
                      key={dest}
                      type="button"
                      onClick={() => setTutorDestination(dest)}
                      className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                        tutorDestination === dest
                          ? 'bg-purple-500 text-obsidian shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {destNames[dest]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={tutorSearchQuery}
                onChange={(e) => setTutorSearchQuery(e.target.value)}
                placeholder="Tìm theo tên, công thức hóa học (Na, HCl, H2O, Pt...), hiệu ứng..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-purple-500/30 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Search Results Grid */}
            {(() => {
              const eligibleCards = engine.getSearchableDeckCards('player', {
                category: tutorCategoryFilter === 'ALL' ? undefined : tutorCategoryFilter,
                searchQuery: tutorSearchQuery
              });

              const selectedCard = eligibleCards.find(c => c.uid === selectedTutorCardUid) || (eligibleCards.length > 0 && selectedTutorCardUid === null ? eligibleCards[0] : null);

              return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 min-h-0 overflow-hidden">
                  {/* Cards Scrollable List */}
                  <div className="sm:col-span-2 overflow-y-auto max-h-64 sm:max-h-80 pr-1 space-y-1.5 custom-scrollbar">
                    {eligibleCards.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 font-mono text-xs border border-dashed border-white/10 rounded-xl">
                        Không tìm thấy thẻ bài phù hợp trong {engine.player.deck.length} lá còn lại của Bộ Bài.
                      </div>
                    ) : (
                      eligibleCards.map(c => {
                        const isSelected = (selectedCard?.uid === c.uid);
                        return (
                          <div
                            key={c.uid}
                            onClick={() => setSelectedTutorCardUid(c.uid)}
                            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isSelected
                                ? 'bg-purple-950/80 border-purple-400 shadow-lg ring-1 ring-purple-400/50'
                                : 'bg-slate-800/60 hover:bg-slate-800 border-white/10 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-9 h-9 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-purple-300 shrink-0">
                                {c.def.chemicalFormula || c.def.name.slice(0, 2)}
                              </span>
                              <div className="min-w-0">
                                <div className="font-bold text-xs text-slate-200 truncate flex items-center gap-1.5">
                                  <span>{c.def.name}</span>
                                  {c.def.isTuner && (
                                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-mono">
                                      TUNER
                                    </span>
                                  )}
                                  {c.def.pendulumScale !== undefined && (
                                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono">
                                      SCALE {c.def.pendulumScale}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 truncate">
                                  {c.def.cardType} {c.def.level ? `• Cấp ${c.def.level}` : ''} {c.def.atk !== undefined ? `• ${c.def.atk}/${c.def.def}` : ''}
                                </div>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900/80 border border-white/10 text-slate-400 shrink-0">
                              {c.def.attribute}
                            </span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Selected Card Dossier & Action */}
                  <div className="bg-slate-950/70 border border-purple-500/30 rounded-xl p-3.5 flex flex-col justify-between gap-3 overflow-y-auto max-h-64 sm:max-h-80">
                    {selectedCard ? (
                      <>
                        <div className="space-y-2">
                          <div className="border-b border-white/10 pb-2">
                            <div className="font-bold text-xs text-purple-300 flex items-center gap-1.5">
                              <span>{selectedCard.def.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">({selectedCard.def.chemicalFormula || 'CTHH'})</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {selectedCard.def.name_en} • {selectedCard.def.cardType}
                            </div>
                          </div>

                          <div className="text-[11px] text-slate-300 leading-relaxed font-sans">
                            <span className="text-purple-400 font-bold font-mono">Hiệu ứng: </span>
                            {selectedCard.def.effectText || 'Quái thú nguyên tố hóa học cơ bản.'}
                          </div>

                          {selectedCard.def.scientificLore && (
                            <div className="text-[10px] text-slate-400 leading-relaxed font-mono bg-purple-950/30 p-2 rounded-lg border border-purple-500/20">
                              <span className="text-cyan-400 font-bold">Hóa học: </span>
                              {selectedCard.def.scientificLore}
                            </div>
                          )}
                        </div>

                        {/* Confirmation Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const res = engine.tutorCardFromDeck('player', selectedCard.uid, tutorDestination, 'Chiết Tách Chủ Động');
                            if (res.success) {
                              sound.playUiClick();
                              updateFromEngine();
                              setActionFeedback(res.message);
                              setIsDeckTutorModalOpen(false);
                              setSelectedTutorCardUid(null);
                            } else {
                              setActionFeedback(res.message);
                            }
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Chiết Tách & Xáo Trộn Bộ Bài</span>
                        </button>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center text-slate-500 font-mono text-xs">
                        Chọn một thẻ bài để xem hồ sơ và thực thi chiết tách.
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Duel Victory / Defeat Modal */}
      {outcome !== 'IN_PROGRESS' && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in overflow-y-auto">
          <div className="max-w-2xl w-full bg-slate-900/95 border-2 border-slate-700 rounded-2xl p-5 sm:p-7 shadow-2xl flex flex-col gap-4 text-slate-200 animate-scale-in relative overflow-hidden my-auto max-h-[92vh] overflow-y-auto">
            {/* Header Banner */}
            {outcome === 'PLAYER_VICTORY' ? (
              <div className="flex flex-col items-center text-center gap-2 border-b border-amber-500/30 pb-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/30">
                  <Trophy className="w-9 h-9 animate-bounce" />
                </div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-400 tracking-wider">
                  CHIẾN THẮNG QUANH LIỆT! (VICTORY)
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
                  Bạn đã làm chủ định luật tuần hoàn, liên kết hóa học và chuỗi phản ứng DCSM để hạ gục <strong className="text-cyan-300">{opponentState.name}</strong> ở Lượt {turn}!
                </p>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 font-mono text-xs shadow-sm mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Phần thưởng: +250 XP • +100 Knowledge Tokens • +50 Elemental Shards</span>
                </div>
                {campaignStage && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/90 to-slate-900 border border-amber-500/50 text-xs font-mono text-amber-200 w-full flex flex-col gap-1 text-left shadow-lg mt-2">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>CHIẾN DỊCH CHINH PHỤC THÀNH CÔNG: {campaignStage.title}</span>
                    </div>
                    <div className="text-slate-300">Đã phong ấn thành công {campaignStage.bossName} ({campaignStage.bossTitle})</div>
                    <div className="text-emerald-300 font-bold">🎁 Mở khóa Thẻ bài độc quyền: {campaignStage.rewardCardName}</div>
                  </div>
                )}
              </div>
            ) : outcome === 'DRAW' ? (
              <div className="flex flex-col items-center text-center gap-2 border-b border-amber-500/30 pb-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/30">
                  <Flame className="w-9 h-9 animate-pulse" />
                </div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-purple-400 tracking-wider">
                  HÒA TRẬN! (DOUBLE KNOCKOUT)
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
                  Cả hai Duellist cùng cạn kiệt Life Points trong cùng một thời điểm! Theo Luật Yu-Gi-Oh! Chuẩn Quốc Tế (Rulebook v10 tr. 33), trận đấu phân định là HÒA.
                </p>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 font-mono text-xs mt-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tinh thần Bất khuất: +120 XP • +50 Knowledge Tokens • +25 Shards</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-2 border-b border-rose-500/30 pb-4">
                <div className="w-16 h-16 rounded-full bg-rose-950/60 border-2 border-rose-500 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-950/60">
                  <Skull className="w-9 h-9 animate-pulse" />
                </div>
                <h2 className="font-serif font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-300 to-orange-400 tracking-wider">
                  THẤT BẠI TRẬN ĐẤU (DEFEAT)
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
                  Điểm gốc (Life Points) của bạn đã bị đối thủ <strong className="text-red-300">{opponentState.name}</strong> dồn ép về 0 ở Lượt {turn}. Trận đấu chính thức kết thúc!
                </p>
              </div>
            )}

            {/* Combat Scoreboard: Side-by-Side Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {/* Player Side */}
              <div className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                outcome === 'PLAYER_VICTORY'
                  ? 'bg-emerald-950/40 border-emerald-500/40 shadow-sm'
                  : 'bg-rose-950/30 border-rose-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    BẠN (DUELLIST)
                  </span>
                  <span className={`font-black text-sm ${playerState.lp > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {playerState.lp.toLocaleString()} LP
                  </span>
                </div>
                {/* LP Bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all ${playerState.lp > 0 ? 'bg-gradient-to-r from-emerald-500 to-cyan-400' : 'bg-rose-600'}`}
                    style={{ width: `${Math.min(100, Math.max(0, (playerState.lp / matchLpSetting) * 100))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                  <span>Sân đấu: {playerState.monsterZones.filter(s => s && s.card !== null).length} Quái • {playerState.spellTrapZones.filter(s => s && s.card !== null).length} Phép/Bẫy</span>
                  <span>Mộ bài: {playerState.graveyard.length}</span>
                </div>
              </div>

              {/* Opponent Side */}
              <div className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                outcome === 'OPPONENT_VICTORY'
                  ? 'bg-rose-950/40 border-rose-500/40 shadow-sm'
                  : 'bg-slate-900 border-slate-700/60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Sword className="w-3.5 h-3.5 text-rose-400" />
                    {opponentState.name.toUpperCase()} ({aiLevel})
                  </span>
                  <span className={`font-black text-sm ${opponentState.lp > 0 ? 'text-cyan-300' : 'text-rose-400'}`}>
                    {opponentState.lp.toLocaleString()} LP
                  </span>
                </div>
                {/* LP Bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all"
                    style={{ width: `${Math.min(100, Math.max(0, (opponentState.lp / matchLpSetting) * 100))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                  <span>Sân đấu: {opponentState.monsterZones.filter(s => s && s.card !== null).length} Quái • {opponentState.spellTrapZones.filter(s => s && s.card !== null).length} Phép/Bẫy</span>
                  <span>Mộ bài: {opponentState.graveyard.length}</span>
                </div>
              </div>
            </div>

            {/* Tactical Breakdown & Recommendations */}
            {outcome !== 'PLAYER_VICTORY' && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-red-500/30 text-xs font-mono space-y-2 text-left">
                <div className="flex items-center gap-1.5 font-bold text-rose-400 uppercase tracking-wider text-[11px]">
                  <HelpCircle className="w-4 h-4 text-rose-400" />
                  <span>PHÂN TÍCH THẤT BẠI & CHIẾN LƯỢC KHẮC CHẾ ĐỀ XUẤT:</span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed space-y-1">
                  <p>
                    ⚡ <strong className="text-red-300">Nguyên nhân:</strong> Đối thủ đã triển khai chuỗi bài tấn công nhanh hơn và triệt tiêu toàn bộ {matchLpSetting.toLocaleString()} LP của bạn trước khi bạn kịp ổn định bàn cờ hóa học.
                  </p>
                  <p>
                    🛡️ <strong className="text-amber-300">Gợi ý 1 — Cài Thẻ Cạm Bẫy (Trap Cards):</strong> Hãy úp các thẻ bẫy ở Main Phase để kích hoạt ngay trong Battle Phase của đối thủ, ngắt đòn tấn công bất ngờ.
                  </p>
                  <p>
                    🛡️ <strong className="text-cyan-300">Gợi ý 2 — Quái Thú Thủ Cao (DEF):</strong> Tận dụng các quái thú kim loại nhóm kiềm thổ hoặc chuyển tiếp có DEF_stab cao (Fe, Ba, Cu, Au) đặt ở thế Phòng Thủ để bảo vệ LP.
                  </p>
                  <p>
                    ⚖️ <strong className="text-emerald-300">Gợi ý 3 — Tỉ Lệ Vàng GDPT 2018:</strong> Cân đối deck theo tỉ lệ 5 Quái thú : 3 Phép thuật : 2 Cạm bẫy để tránh tình trạng kẹt bài không có quái thú khởi đầu.
                  </p>
                </div>

                {campaignStage && (
                  <div className="mt-2 pt-2 border-t border-red-500/20 text-[11px] text-amber-200">
                    <span className="font-bold text-amber-300">Mẹo riêng ải {campaignStage.title}: </span>
                    {campaignStage.tacticalTipVI}
                  </div>
                )}
              </div>
            )}

            {/* Match Telemetry Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-700/60 text-[11px] font-mono text-slate-400">
              <span>Trận đấu kéo dài: <strong className="text-slate-200">{turn} Lượt</strong></span>
              <span>Chuỗi phản ứng DCSM đã kích hoạt: <strong className="text-cyan-300">{engine.logs.filter(l => l.message.includes('Phản ứng') || l.message.includes('DCSM') || l.message.includes('Tổng Hợp')).length}</strong></span>
              <span>Thẻ bài trong Mộ bài: <strong className="text-amber-300">{playerState.graveyard.length} Thẻ</strong></span>
            </div>

            {/* Toggle Endgame Logs Drawer */}
            {showEndgameLogs && (
              <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-xs font-mono space-y-2 text-left max-h-48 overflow-y-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-1 text-slate-300 font-bold">
                  <span>📜 Nhật Ký Chi Tiết Toàn Bộ Trận Đấu ({logs.length} sự kiện):</span>
                  <button
                    onClick={() => setShowEndgameLogs(false)}
                    className="text-slate-400 hover:text-white text-[10px]"
                  >
                    Đóng
                  </button>
                </div>
                <div className="space-y-1 text-[11px]">
                  {[...logs].reverse().map((log) => (
                    <div key={log.id} className="p-1 rounded bg-black/40 border border-white/5 text-slate-300">
                      <span className="text-slate-500 mr-2">[{log.type}]</span>
                      <span>{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comprehensive Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-white/10 w-full justify-between">
              {/* Rematch CTA */}
              <button
                onClick={() => {
                  sound.playVictory();
                  handleRestartDuel();
                }}
                className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-ion via-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-obsidian font-serif font-black text-sm tracking-wide shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4 fill-obsidian" />
                <span>TÁI ĐẤU NGAY (REMATCH)</span>
              </button>

              {/* Edit Deck CTA */}
              {onOpenDeckBuilder && (
                <button
                  onClick={() => {
                    sound.playUiClick();
                    onOpenDeckBuilder();
                  }}
                  className="py-3 px-3.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/50 hover:border-indigo-400 text-indigo-200 hover:text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  title="Chuyển sang màn hình Xây Deck để tối ưu lại bộ bài"
                >
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">Tối Ưu</span> Bộ Bài
                </button>
              )}

              {/* View Match Logs */}
              <button
                onClick={() => {
                  sound.playUiClick();
                  setShowEndgameLogs(!showEndgameLogs);
                }}
                className={`py-3 px-3.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                  showEndgameLogs
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                    : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-600'
                }`}
                title="Xem lại từng nước đi và phản ứng hóa học trong trận"
              >
                <BookOpen className="w-4 h-4" />
                <span>{showEndgameLogs ? 'Ẩn Logs' : 'Xem Logs'}</span>
              </button>

              {/* Return to Lobby / Campaign */}
              {(onReturnToLobby || onExitCampaignDuel) && (
                <button
                  onClick={() => {
                    sound.playUiClick();
                    if (campaignStage && onExitCampaignDuel) {
                      onExitCampaignDuel();
                    } else if (onReturnToLobby) {
                      onReturnToLobby();
                    }
                  }}
                  className="py-3 px-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all"
                  title="Rời khỏi sàn đấu và quay lại sảnh"
                >
                  <Flag className="w-4 h-4 text-slate-400" />
                  <span>{campaignStage ? 'Về Bản Đồ' : 'Về Sảnh'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SURRENDER CONFIRMATION MODAL (Rulebook v10 tr. 33) */}
      {showSurrenderModal && (
        <div
          onClick={() => setShowSurrenderModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-slate-900 border-2 border-red-500/60 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-400" />
                <h3 className="font-mono font-bold text-red-300 text-sm tracking-wider uppercase">
                  Xác Nhận Đầu Hàng Trận Đấu
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSurrenderModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-slate-300 space-y-2">
              <p className="font-bold text-red-200">
                Bạn có chắc chắn muốn tuyên bố đầu hàng trận đấu này?
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Khi tuyên bố đầu hàng, trận đấu sẽ kết thúc ngay lập tức và đối thủ sẽ giành chiến thắng chung cuộc.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
              <button
                type="button"
                onClick={() => setShowSurrenderModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold"
              >
                Tiếp Tục Thi Đấu
              </button>
              <button
                type="button"
                onClick={handleConfirmSurrender}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-950/50"
              >
                <Flag className="w-3.5 h-3.5" />
                Đồng Ý Đầu Hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hand Size Limit Discard Modal */}
      {showHandDiscardModal && outcome === 'IN_PROGRESS' && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowHandDiscardModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-slate-900 border-2 border-amber-500/60 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-slate-200 animate-scale-in"
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-amber-400" />
                <h3 className="font-mono font-bold text-amber-300 text-sm tracking-wider uppercase">
                  Luật Đấu Bài Nguyên Tố: Giới Hạn Bài Trên Tay
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHandDiscardModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-amber-200 flex items-center gap-2">
                <span>Số lượng bài trên tay: {playerState.hand.length} / 6 lá tối đa</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[11px]">
                  Cần bỏ {engine.getHandSizeLimitExcess('player')} lá
                </span>
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Theo <strong className="text-amber-300">Quy tắc Đấu Bài Chiến Thuật ELEMENTA</strong>, khi kết thúc lượt (End Phase), nếu đấu sĩ có nhiều hơn 6 lá bài trên tay, đấu sĩ phải chọn và chuyển các lá bài xuống Mộ Bài cho đến khi chỉ còn lại đúng 6 lá.
              </p>
            </div>

            {/* Selectable Hand Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto p-1">
              {playerState.hand.map((card) => {
                const isSelected = selectedDiscardUids.includes(card.uid);
                return (
                  <div
                    key={card.uid}
                    onClick={() => {
                      sound.playCardSelect();
                      if (isSelected) {
                        setSelectedDiscardUids(selectedDiscardUids.filter(uid => uid !== card.uid));
                      } else {
                        const excess = engine.getHandSizeLimitExcess('player');
                        if (selectedDiscardUids.length < excess) {
                          setSelectedDiscardUids([...selectedDiscardUids, card.uid]);
                        }
                      }
                    }}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between text-xs relative ${
                      isSelected
                        ? 'border-red-500 bg-red-950/60 shadow-lg shadow-red-950/50 scale-[0.98]'
                        : 'border-slate-700 bg-slate-800/80 hover:border-amber-400/50 hover:bg-slate-800'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-red-600 text-white font-mono font-bold text-[10px] flex items-center gap-0.5">
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>BỎ</span>
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-slate-100 truncate pr-6">{card.def.name}</div>
                      <div className="text-[10px] font-mono text-cyan-300">{card.def.chemicalFormula || card.def.cardType}</div>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-400 font-mono">
                      {card.def.atk !== undefined
                        ? `ATK ${card.def.atk} / DEF ${card.def.def ?? 0}`
                        : `Phép/Bẫy (Mana: ${card.def.manaCost})`}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playUiClick();
                    const optimal = engine.aiSelectHandDiscardCards('player');
                    setSelectedDiscardUids(optimal.map(c => c.uid));
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all"
                >
                  ⚡ Tự Động Chọn
                </button>
                <button
                  type="button"
                  onClick={() => setShowHandDiscardModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-mono"
                >
                  Quay Lại Main 2
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  Đã chọn: <strong className="text-amber-300">{selectedDiscardUids.length}</strong> / {engine.getHandSizeLimitExcess('player')}
                </span>
                <button
                  type="button"
                  disabled={selectedDiscardUids.length !== engine.getHandSizeLimitExcess('player')}
                  onClick={() => {
                    sound.playCardSelect();
                    engine.advancePhase(selectedDiscardUids);
                    setShowHandDiscardModal(false);
                    setSelectedDiscardUids([]);
                    updateFromEngine();
                  }}
                  className={`px-4 py-2 rounded-xl font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all ${
                    selectedDiscardUids.length === engine.getHandSizeLimitExcess('player')
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-950/50 cursor-pointer animate-pulse'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xác Nhận Chuyển Xuống Mộ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive DCSM Chemical Reaction Combination Modal */}
      {showReactionModal && (
        <ReactionPreviewModal
          playerState={playerState}
          environment={engine.environment}
          reactionEngine={engine.reactionEngine}
          onClose={() => setShowReactionModal(false)}
          onExecuteReaction={handleExecuteBattlefieldReaction}
        />
      )}
    </div>
  );
};
