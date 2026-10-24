// src/components/BattleArenaTab.tsx
// Tactical Battle Arena with Central Sci-Fi Reaction Chamber SVG & 5 Mandatory Demo Buttons

import React, { useState, useEffect, useRef } from 'react';
import { BattleEngine, BattleDebriefData } from '../domain/battleEngine';
import { AiDifficulty } from '../domain/opponentAi';
import { ReactionChamberSVG } from './visualizations/ReactionChamberSVG';
import { sound } from '../audio/soundEngine';
import {
  Sword,
  Shield,
  Zap,
  RotateCcw,
  Sparkles,
  HelpCircle,
  History,
  FlaskConical,
  Flame,
  Droplets,
  AlertOctagon
} from 'lucide-react';

interface BattleArenaTabProps {
  playerDeckIds: string[];
  onBattleFinished: (debrief: BattleDebriefData) => void;
  openTutorial: () => void;
}

export const BattleArenaTab: React.FC<BattleArenaTabProps> = ({
  playerDeckIds,
  onBattleFinished,
  openTutorial
}) => {
  const [difficulty, setDifficulty] = useState<AiDifficulty>('STANDARD');
  const [engine, setEngine] = useState<BattleEngine>(() => new BattleEngine(playerDeckIds, difficulty));
  const [lastFeedback, setLastFeedback] = useState<{
    type: 'SUCCESS' | 'TRAP' | 'MISSING' | 'FAIL';
    message: string;
    equation?: string;
    phenomena?: string;
  } | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isChamberReacting, setIsChamberReacting] = useState(false);

  // Sync state from engine
  const [playerState, setPlayerState] = useState(engine.player);
  const [opponentState, setOpponentState] = useState(engine.opponent);
  const [phase, setPhase] = useState(engine.phase);
  const [turn, setTurn] = useState(engine.turn);
  const [logs, setLogs] = useState(engine.logs);

  const logsEndRef = useRef<HTMLDivElement>(null);

  const updateFromEngine = () => {
    setPlayerState({ ...engine.player });
    setOpponentState({ ...engine.opponent });
    setPhase(engine.phase);
    setTurn(engine.turn);
    setLogs([...engine.logs]);

    if (engine.phase === 'VICTORY' || engine.phase === 'DEFEAT') {
      if (engine.phase === 'VICTORY') sound.playVictory();
      else sound.playErrorFizzle();

      if (engine.debrief) {
        onBattleFinished(engine.debrief);
      }
    }
  };

  const handleRestartBattle = (newDiff?: AiDifficulty) => {
    sound.playUiClick();
    const diff = newDiff || difficulty;
    const newEngine = new BattleEngine(playerDeckIds, diff);
    setEngine(newEngine);
    setPlayerState(newEngine.player);
    setOpponentState(newEngine.opponent);
    setPhase(newEngine.phase);
    setTurn(newEngine.turn);
    setLogs(newEngine.logs);
    setLastFeedback(null);
  };

  const handlePlayCard = (cardUid: string) => {
    if (phase !== 'PLAYER_ACTION') return;
    const ok = engine.playCard(cardUid);
    if (ok) {
      sound.playCardSelect();
      updateFromEngine();
    } else {
      sound.playErrorFizzle();
    }
  };

  const handleTriggerCombo = () => {
    if (phase !== 'PLAYER_ACTION') return;
    setIsChamberReacting(true);
    const result = engine.triggerCombo();
    updateFromEngine();

    if (result.status === 'SUCCESS') {
      sound.playExplosion();
      setLastFeedback({
        type: 'SUCCESS',
        message: result.pedagogicalMessage,
        equation: result.equation,
        phenomena: result.observablePhenomenaVI
      });
    } else if (result.status === 'TRAP_TRIGGERED') {
      sound.playErrorFizzle();
      setLastFeedback({
        type: 'TRAP',
        message: result.pedagogicalMessage,
        equation: result.equation,
        phenomena: result.observablePhenomenaVI
      });
    } else if (result.status === 'MISSING_CONDITIONS') {
      sound.playErrorFizzle();
      setLastFeedback({
        type: 'MISSING',
        message: result.pedagogicalMessage,
        phenomena: result.observablePhenomenaVI
      });
    } else {
      sound.playErrorFizzle();
      setLastFeedback({
        type: 'FAIL',
        message: result.pedagogicalMessage
      });
    }

    setTimeout(() => {
      setIsChamberReacting(false);
    }, 600);

    setTimeout(() => {
      setLastFeedback(null);
    }, 5500);
  };

  const handleEndTurn = () => {
    if (phase !== 'PLAYER_ACTION') return;
    sound.playUiClick();
    setIsAiThinking(true);
    engine.endPlayerTurn();
    updateFromEngine();

    setTimeout(() => {
      setIsAiThinking(false);
      updateFromEngine();
    }, 1200);
  };

  // 5 Mandatory Scientific Demo Scenarios (Phần 9.9)
  const triggerDemoScenario = (demoType: 1 | 2 | 3 | 4 | 5) => {
    sound.playCardSelect();
    engine.player.boardElements = [];
    engine.player.activeConditions = [];
    engine.player.mana = 5;

    if (demoType === 1) {
      // Demo 1: Sodium + Nước
      const naCard = engine.player.hand.find(c => c.element?.symbol === 'Na');
      if (naCard) engine.player.boardElements.push(naCard);
      else engine.player.boardElements.push({ uid: 'demo_na', type: 'ELEMENT', element: { z: 11, symbol: 'Na', name_iupac: 'Sodium', name_vi: 'Natri', stats: { mana_cost: 2, atk_ox: 11, atk_red: 91, def_stab: 18 } } as any });
      engine.player.activeConditions.push('MOISTURE_H2O');
    } else if (demoType === 2) {
      // Demo 2: Gỉ sắt (Fe + O2 + H2O)
      engine.player.boardElements.push({ uid: 'demo_fe', type: 'ELEMENT', element: { z: 26, symbol: 'Fe', name_iupac: 'Iron', name_vi: 'Sắt', stats: { mana_cost: 3, atk_ox: 29, atk_red: 53, def_stab: 77 } } as any });
      engine.player.activeConditions.push('OXYGEN_GAS', 'MOISTURE_H2O');
    } else if (demoType === 3) {
      // Demo 3: Sắt cháy trong oxy (Fe + O2 + t°)
      engine.player.boardElements.push({ uid: 'demo_fe', type: 'ELEMENT', element: { z: 26, symbol: 'Fe', name_iupac: 'Iron', name_vi: 'Sắt', stats: { mana_cost: 3, atk_ox: 29, atk_red: 53, def_stab: 77 } } as any });
      engine.player.activeConditions.push('OXYGEN_GAS', 'HIGH_TEMP');
    } else if (demoType === 4) {
      // Demo 4: Trung hòa acid - base (H+ + OH-)
      engine.player.activeConditions.push('ACID_DILUTE', 'BASE_ALKALINE');
    } else if (demoType === 5) {
      // Demo 5: Bẫy hóa học (Cu + HCl loãng)
      engine.player.boardElements.push({ uid: 'demo_cu', type: 'ELEMENT', element: { z: 29, symbol: 'Cu', name_iupac: 'Copper', name_vi: 'Đồng', stats: { mana_cost: 3, atk_ox: 31, atk_red: 38, def_stab: 82 } } as any });
      engine.player.activeConditions.push('ACID_DILUTE');
    }

    updateFromEngine();
  };

  const playerBoardSymbols = playerState.boardElements
    .filter(c => c.type === 'ELEMENT' && c.element)
    .map(c => c.element!.symbol);

  return (
    <div className="space-y-4 animate-fadeIn pb-12">
      {/* 5 Mandatory Demos Bar (Section 9.9) */}
      <div className="bg-navy/90 p-3 rounded-2xl border border-navy-light/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-serif font-bold text-copper">
          <span className="flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-copper" />
            5 KỊCH BẢN THÍ NGHIỆM ĐỐI CHỨNG MẪU (PHẦN 9.9 THUYẾT MINH)
          </span>
          <span className="text-[10px] font-mono text-ivory-muted">Gọi trực tiếp Engine DCSM</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <button
            onClick={() => triggerDemoScenario(1)}
            className="p-2 rounded-xl bg-navy hover:bg-navy-light border border-coral-reaction/40 text-left text-xs transition-all hover:scale-102"
          >
            <span className="font-bold text-coral-reaction block text-[11px]">1. Na + H₂O</span>
            <span className="text-[10px] text-ivory-muted truncate block">Bùng nổ kiềm NaOH</span>
          </button>

          <button
            onClick={() => triggerDemoScenario(2)}
            className="p-2 rounded-xl bg-navy hover:bg-navy-light border border-copper/40 text-left text-xs transition-all hover:scale-102"
          >
            <span className="font-bold text-copper block text-[11px]">2. Gỉ Sắt (Fe + O₂ + Ẩm)</span>
            <span className="text-[10px] text-ivory-muted truncate block">4Fe + 3O₂ + 2xH₂O</span>
          </button>

          <button
            onClick={() => triggerDemoScenario(3)}
            className="p-2 rounded-xl bg-navy hover:bg-navy-light border border-cyan-ion/40 text-left text-xs transition-all hover:scale-102"
          >
            <span className="font-bold text-cyan-ion block text-[11px]">3. Sắt Cháy (Fe + t°)</span>
            <span className="text-[10px] text-ivory-muted truncate block">3Fe + 2O₂ → Fe₃O₄</span>
          </button>

          <button
            onClick={() => triggerDemoScenario(4)}
            className="p-2 rounded-xl bg-navy hover:bg-navy-light border border-lime-mineral/40 text-left text-xs transition-all hover:scale-102"
          >
            <span className="font-bold text-lime-mineral block text-[11px]">4. Trung Hòa Axit-Bazơ</span>
            <span className="text-[10px] text-ivory-muted truncate block">H⁺ + OH⁻ → H₂O</span>
          </button>

          <button
            onClick={() => triggerDemoScenario(5)}
            className="p-2 rounded-xl bg-coral-reaction/20 hover:bg-coral-reaction/30 border border-coral-reaction/60 text-left text-xs transition-all hover:scale-102"
          >
            <span className="font-bold text-coral-reaction block text-[11px] flex items-center gap-1">
              <AlertOctagon className="w-3 h-3" /> 5. Bẫy: Cu + HCl
            </span>
            <span className="text-[10px] text-ivory-muted truncate block">Cu đứng sau H → Không tan</span>
          </button>
        </div>
      </div>

      {/* Main Arena Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Battle Arena Stage (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Opponent Zone */}
          <div className="rounded-2xl border border-coral-reaction/40 bg-gradient-to-br from-navy via-obsidian to-navy-dark p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-coral-reaction/20 text-coral-reaction font-bold">
                  ĐỐI THỦ
                </span>
                <h3 className="font-serif font-bold text-base text-ivory mt-1">{opponentState.name}</h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1 bg-navy/80 px-2 py-1 rounded border border-cyan-ion/30 text-cyan-ion">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Giáp: {opponentState.shield}</span>
                </div>
                <div className="flex items-center gap-1 bg-navy/80 px-2 py-1 rounded border border-copper/30 text-copper">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Mana: {opponentState.mana}/{opponentState.maxMana}</span>
                </div>
              </div>
            </div>

            {/* HP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-ivory-muted">Sinh lực (HP)</span>
                <span className="font-bold text-coral-reaction">{opponentState.hp} / {opponentState.maxHp}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-obsidian overflow-hidden border border-navy-light/40">
                <div
                  className="h-full bg-gradient-to-r from-coral-reaction to-red-600 transition-all duration-300"
                  style={{ width: `${Math.max(0, (opponentState.hp / opponentState.maxHp) * 100)}%` }}
                />
              </div>
            </div>

            {/* Opponent Board Deployments */}
            <div className="min-h-[50px] rounded-xl bg-obsidian/50 border border-dashed border-navy-light/40 p-2 flex items-center gap-2 overflow-x-auto">
              {opponentState.boardElements.length === 0 && opponentState.activeConditions.length === 0 ? (
                <span className="text-[11px] font-mono text-ivory-muted/40 italic mx-auto">
                  {isAiThinking ? 'Đối thủ đang toan tính chiến thuật...' : 'Chưa có thẻ nào trên sàn đấu'}
                </span>
              ) : (
                <>
                  {opponentState.boardElements.map((card) => (
                    <div
                      key={card.uid}
                      className="px-2.5 py-1 rounded-lg bg-coral-reaction/15 border border-coral-reaction/50 text-coral-reaction text-xs font-mono font-bold flex items-center gap-1"
                    >
                      <span>{card.element?.symbol}</span>
                      <span className="text-[9px] font-normal text-ivory">({card.element?.name_iupac})</span>
                    </div>
                  ))}
                  {opponentState.activeConditions.map((cond) => (
                    <div
                      key={cond}
                      className="px-2 py-0.5 rounded-lg bg-lime-mineral/15 border border-lime-mineral/40 text-lime-mineral text-[11px] font-mono"
                    >
                      {cond === 'MOISTURE_H2O' ? 'H₂O' : cond === 'HIGH_TEMP' ? 't°' : cond === 'OXYGEN_GAS' ? 'O₂' : cond}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Central Chemical Reaction Vessel Zone */}
          <div className="relative rounded-2xl border border-cyan-ion/40 bg-gradient-to-b from-navy to-obsidian p-5 space-y-4 text-center">
            <ReactionChamberSVG
              reactants={playerBoardSymbols}
              conditions={playerState.activeConditions}
              isReacting={isChamberReacting}
              isSuccess={lastFeedback?.type === 'SUCCESS'}
              isFizzle={lastFeedback?.type === 'TRAP'}
            />

            {/* Chemical Feedback Toast Banner */}
            {lastFeedback && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-mono text-left animate-fadeIn shadow-2xl space-y-1.5 ${
                  lastFeedback.type === 'SUCCESS'
                    ? 'bg-lime-mineral/20 border-lime-mineral text-lime-mineral'
                    : lastFeedback.type === 'TRAP'
                    ? 'bg-coral-reaction/20 border-coral-reaction text-coral-reaction font-bold'
                    : 'bg-copper/20 border-copper text-copper'
                }`}
              >
                {lastFeedback.equation && (
                  <div className="font-bold text-sm text-ivory font-mono">{lastFeedback.equation}</div>
                )}
                {lastFeedback.phenomena && (
                  <div className="text-[11px] text-ivory font-sans italic opacity-95">
                    <strong>Hiện tượng quan sát: </strong>{lastFeedback.phenomena}
                  </div>
                )}
                <div className="text-[11px] font-sans border-t border-current/20 pt-1 leading-relaxed">
                  {lastFeedback.message}
                </div>
              </div>
            )}

            {/* Combo Trigger & End Turn Buttons */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                disabled={
                  phase !== 'PLAYER_ACTION' ||
                  (playerState.boardElements.length === 0 && playerState.activeConditions.length === 0)
                }
                onClick={handleTriggerCombo}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-copper via-coral-reaction to-copper text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-coral-reaction/30 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>KÍCH HOẠT COMBO PHẢN ỨNG</span>
              </button>

              <button
                disabled={phase !== 'PLAYER_ACTION'}
                onClick={handleEndTurn}
                className="px-4 py-2.5 rounded-xl bg-navy-light hover:bg-navy-light/80 text-ivory text-xs font-semibold disabled:opacity-40 transition-all"
              >
                Kết Thúc Lượt
              </button>
            </div>
          </div>

          {/* Player Zone & HUD */}
          <div className="rounded-2xl border border-cyan-ion/40 bg-gradient-to-br from-navy via-obsidian to-navy-dark p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion font-bold">
                  BẠN (NGƯỜI CHƠI)
                </span>
                <h3 className="font-serif font-bold text-base text-ivory mt-1">{playerState.name}</h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1 bg-navy/80 px-2 py-1 rounded border border-cyan-ion/30 text-cyan-ion">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Giáp: {playerState.shield}</span>
                </div>
                <div className="flex items-center gap-1 bg-navy/80 px-2.5 py-1 rounded border border-copper/40 text-copper font-bold">
                  <Zap className="w-3.5 h-3.5 text-copper" />
                  <span>Mana: {playerState.mana}/{playerState.maxMana}</span>
                </div>
              </div>
            </div>

            {/* HP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-ivory-muted">Sinh lực (HP)</span>
                <span className="font-bold text-cyan-ion">{playerState.hp} / {playerState.maxHp}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-obsidian overflow-hidden border border-navy-light/40">
                <div
                  className="h-full bg-gradient-to-r from-cyan-ion to-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.max(0, (playerState.hp / playerState.maxHp) * 100)}%` }}
                />
              </div>
            </div>

            {/* Player Hand Cards */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-ivory-muted">
                <span>BÀI TRÊN TAY ({playerState.hand.length} / 5)</span>
                <span>Nhấp thẻ để đưa vào buồng phản ứng</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {playerState.hand.map((card) => {
                  const isElem = card.type === 'ELEMENT' && card.element;
                  const cost = isElem ? card.element!.stats.mana_cost : card.environment!.mana_cost;
                  const canAfford = playerState.mana >= cost;

                  return (
                    <div
                      key={card.uid}
                      onClick={() => handlePlayCard(card.uid)}
                      className={`relative rounded-xl border p-2 flex flex-col justify-between h-28 cursor-pointer transition-all select-none shadow-md ${
                        canAfford
                          ? 'bg-gradient-to-b from-navy to-obsidian border-navy-light hover:border-cyan-ion hover:scale-105 hover:-translate-y-1'
                          : 'bg-obsidian/80 border-navy-light/40 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="font-bold text-copper">{isElem ? `Z=${card.element!.z}` : 'Môi trường'}</span>
                        <span className={`px-1 rounded font-bold ${canAfford ? 'bg-cyan-ion/20 text-cyan-ion' : 'text-ivory-muted'}`}>
                          M:{cost}
                        </span>
                      </div>

                      <div className="text-center my-0.5">
                        <span className="font-serif font-black text-xl text-ivory block">
                          {isElem ? card.element!.symbol : card.environment!.symbol}
                        </span>
                        <span className="text-[10px] font-semibold text-ivory-muted truncate block">
                          {isElem ? card.element!.name_iupac : card.environment!.name_vi}
                        </span>
                      </div>

                      <div className="text-[8px] font-mono text-center text-ivory-muted/70 truncate border-t border-navy-light/40 pt-0.5">
                        {isElem ? card.element!.name_vi : card.environment!.name_iupac}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Combat Log Column */}
        <div className="rounded-2xl border border-navy-light/60 bg-navy/80 p-4 flex flex-col h-[640px] backdrop-blur">
          <div className="flex items-center gap-2 border-b border-navy-light/40 pb-2 mb-3">
            <History className="w-4 h-4 text-cyan-ion" />
            <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-ivory">
              Nhật Ký Chiến Đấu & Phản Ứng
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs font-mono scrollbar-thin">
            {logs.map((log) => {
              const isSuccess = log.isReactionSuccess;
              const isFail = log.isReactionFail;

              return (
                <div
                  key={log.id}
                  className={`p-2.5 rounded-lg border leading-relaxed ${
                    isSuccess
                      ? 'bg-lime-mineral/15 border-lime-mineral/50 text-lime-mineral'
                      : isFail
                      ? 'bg-coral-reaction/15 border-coral-reaction/50 text-coral-reaction font-semibold'
                      : log.source === 'PLAYER'
                      ? 'bg-cyan-ion/10 border-cyan-ion/30 text-cyan-ion'
                      : log.source === 'OPPONENT'
                      ? 'bg-coral-reaction/10 border-coral-reaction/20 text-ivory'
                      : 'bg-navy/40 border-navy-light/30 text-ivory-muted'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-70 mb-0.5">
                    <span>LƯỢT {log.turn} • {log.source}</span>
                    {log.ruleCode && <span className="font-bold">{log.ruleCode}</span>}
                  </div>
                  <div>{log.message}</div>
                  {log.detail && (
                    <div className="mt-1 text-[11px] opacity-90 italic border-t border-current/20 pt-1">
                      {log.detail}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
};
