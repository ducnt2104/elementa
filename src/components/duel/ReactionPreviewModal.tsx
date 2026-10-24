// src/components/duel/ReactionPreviewModal.tsx
// Interactive Battlefield Reaction Preview & Combination Modal for ELEMENTA Tactical TCG
// Evaluates selected on-field and hand cards against the DCSM Reaction Engine under dynamic environmental conditions.

import React, { useState, useMemo } from 'react';
import { CardInstance, DuelistState } from '../../domain/cardGameTypes';
import { ChemicalEnvironmentState } from '../../domain/chemicalEnvironment';
import { ReactionEngine, ReactionEvaluationResult } from '../../domain/reactionEngine';
import { EnvironmentalCondition } from '../../domain/types';
import { sound } from '../../audio/soundEngine';
import {
  FlaskConical,
  Flame,
  Droplets,
  Zap,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldAlert,
  Thermometer,
  Layers,
  Info
} from 'lucide-react';

interface ReactionPreviewModalProps {
  playerState: DuelistState;
  environment: ChemicalEnvironmentState;
  reactionEngine: ReactionEngine;
  onClose: () => void;
  onExecuteReaction: (selectedUids: string[]) => void;
}

export const ReactionPreviewModal: React.FC<ReactionPreviewModalProps> = ({
  playerState,
  environment,
  reactionEngine,
  onClose,
  onExecuteReaction
}) => {
  // Available eligible cards on field and in hand with formulas
  const eligibleCards: CardInstance[] = useMemo(() => {
    const list: CardInstance[] = [];
    // Monster zones
    for (const slot of playerState.monsterZones) {
      if (slot && slot.card && slot.card.def.chemicalFormula) {
        list.push(slot.card);
      }
    }
    // Hand
    for (const card of playerState.hand) {
      if (card.def.chemicalFormula && (card.def.cardType === 'ELEMENT_MONSTER' || card.def.cardType === 'COMPOUND_MONSTER' || card.def.cardType === 'REACTION_SPELL')) {
        list.push(card);
      }
    }
    return list;
  }, [playerState]);

  const [selectedUids, setSelectedUids] = useState<string[]>([]);

  // Compute active environmental conditions from environment state
  const activeConditions: EnvironmentalCondition[] = useMemo(() => {
    const conds: EnvironmentalCondition[] = [];
    if (environment.solvent === 'WATER' || playerState.monsterZones.some(s => s?.card?.def.chemicalFormula === 'H2O')) {
      conds.push('MOISTURE_H2O');
    }
    if (environment.temperature > 373.15 || playerState.monsterZones.some(s => s?.card?.def.attribute === 'PYRO')) {
      conds.push('HIGH_TEMP');
    }
    if (environment.ph < 6.0 || playerState.monsterZones.some(s => s?.card?.def.chemicalFormula === 'HCl')) {
      conds.push('ACID_DILUTE');
    }
    if (environment.ph > 8.0 || playerState.monsterZones.some(s => s?.card?.def.chemicalFormula === 'NaOH')) {
      conds.push('BASE_ALKALINE');
    }
    if (playerState.monsterZones.some(s => s?.card?.def.chemicalFormula === 'O2')) {
      conds.push('OXYGEN_GAS');
    }
    if (environment.activeCatalysts.length > 0 || playerState.spellTrapZones.some(s => s?.card && s.card.def.cardType === 'EQUIP_CATALYST')) {
      conds.push('CATALYST');
    }
    return conds;
  }, [environment, playerState]);

  const toggleSelectCard = (uid: string) => {
    sound.playCardSelect();
    setSelectedUids(prev => 
      prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]
    );
  };

  // Evaluate combination when cards are selected
  const evaluation: ReactionEvaluationResult | null = useMemo(() => {
    if (selectedUids.length === 0) return null;
    const selectedCards = eligibleCards.filter(c => selectedUids.includes(c.uid));
    const symbols = selectedCards
      .map(c => c.def.chemicalFormula?.replace(/[^a-zA-Z0-9]/g, '') || '')
      .filter(Boolean);

    return reactionEngine.evaluateCombination(symbols, activeConditions);
  }, [selectedUids, eligibleCards, activeConditions, reactionEngine]);

  const handleConfirm = () => {
    if (!evaluation || evaluation.status !== 'SUCCESS') return;
    sound.playReactionSuccess();
    onExecuteReaction(selectedUids);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-navy border-2 border-emerald-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-navy-light/60 bg-gradient-to-r from-emerald-950/80 via-navy to-obsidian flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-inner">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-xl text-ivory tracking-wide">
                  TỔNG HỢP & PHẢN ỨNG HÓA HỌC TRÊN SÂN
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                  DCSM ENGINE
                </span>
              </div>
              <p className="text-xs text-ivory-muted mt-0.5">
                Chọn các chất trên sân và trên tay để kích hoạt phản ứng hóa học tương tác theo thời gian thực.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-obsidian/60 hover:bg-navy-light text-ivory-muted hover:text-ivory border border-navy-light transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Environmental Conditions HUD Strip */}
        <div className="p-3 bg-obsidian/80 border-b border-navy-light/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-ivory-muted">
            <Thermometer className="w-4 h-4 text-cyan-400" />
            <span>Môi trường hiện tại:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 rounded border text-[11px] ${
              activeConditions.includes('MOISTURE_H2O')
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 font-bold'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>
              Độ ẩm H₂O {activeConditions.includes('MOISTURE_H2O') ? '✓' : '✗'}
            </span>

            <span className={`px-2 py-0.5 rounded border text-[11px] ${
              activeConditions.includes('HIGH_TEMP')
                ? 'bg-amber-950 text-amber-300 border-amber-500/50 font-bold'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>
              Nhiệt độ cao t° {activeConditions.includes('HIGH_TEMP') ? '✓' : '✗'}
            </span>

            <span className={`px-2 py-0.5 rounded border text-[11px] ${
              activeConditions.includes('ACID_DILUTE')
                ? 'bg-purple-950 text-purple-300 border-purple-500/50 font-bold'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>
              Axit loãng H⁺ {activeConditions.includes('ACID_DILUTE') ? '✓' : '✗'}
            </span>

            <span className={`px-2 py-0.5 rounded border text-[11px] ${
              activeConditions.includes('BASE_ALKALINE')
                ? 'bg-teal-950 text-teal-300 border-teal-500/50 font-bold'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>
              Kiềm OH⁻ {activeConditions.includes('BASE_ALKALINE') ? '✓' : '✗'}
            </span>

            <span className={`px-2 py-0.5 rounded border text-[11px] ${
              activeConditions.includes('CATALYST')
                ? 'bg-fuchsia-950 text-fuchsia-300 border-fuchsia-500/50 font-bold'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>
              Xúc tác {activeConditions.includes('CATALYST') ? '✓' : '✗'}
            </span>
          </div>
        </div>

        {/* Card Selection Strip */}
        <div className="p-4 border-b border-navy-light/40 space-y-2">
          <div className="text-xs font-mono text-ivory-muted flex items-center justify-between">
            <span>Chọn các chất tham gia ({selectedUids.length} đã chọn):</span>
            <span className="text-cyan-300">Nhấn thẻ để chọn / bỏ chọn</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {eligibleCards.map(card => {
              const isSelected = selectedUids.includes(card.uid);
              return (
                <div
                  key={card.uid}
                  onClick={() => toggleSelectCard(card.uid)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer min-w-[120px] max-w-[140px] shrink-0 select-none ${
                    isSelected
                      ? 'bg-gradient-to-b from-emerald-950/80 to-navy border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105'
                      : 'bg-obsidian/70 hover:bg-navy border-navy-light/60 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-ivory">
                      {card.def.chemicalFormula || 'E'}
                    </span>
                    <span className="text-[9px] font-mono px-1 rounded bg-navy text-cyan-300">
                      {card.def.attribute}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-ivory truncate mt-1">{card.def.name}</div>
                  <div className="text-[10px] text-ivory-muted truncate mt-0.5">
                    {card.def.atk ? `${card.def.atk} ATK` : card.def.cardType}
                  </div>
                  <div className="mt-1 text-center">
                    {isSelected ? (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">✓ ĐÃ CHỌN</span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">+ Chọn</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reaction Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {evaluation ? (
            <div className="space-y-4 animate-fadeIn">
              {evaluation.status === 'SUCCESS' ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/60 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>PHẢN ỨNG HỢP LỆ — {evaluation.matchedRule?.name_vi}</span>
                  </div>

                  {/* Balanced Equation Badge */}
                  <div className="p-3 rounded-lg bg-black/70 border border-emerald-500/40 text-center font-mono font-black text-base sm:text-lg text-emerald-300 tracking-wider shadow-inner">
                    {evaluation.equation}
                  </div>

                  {/* Observable Phenomena */}
                  {evaluation.observablePhenomenaVI && (
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[10px] font-mono text-cyan-300 font-bold">HIỆN TƯỢNG QUAN SÁT THỰC NGHIỆM:</div>
                      <p className="text-xs text-ivory leading-relaxed">{evaluation.observablePhenomenaVI}</p>
                    </div>
                  )}

                  {/* Pedagogical Explanation */}
                  <div className="text-xs text-ivory-muted leading-relaxed">
                    {evaluation.pedagogicalMessage}
                  </div>
                </div>
              ) : evaluation.status === 'TRAP_TRIGGERED' ? (
                <div className="p-4 rounded-xl bg-rose-950/40 border-2 border-rose-500/60 shadow-lg space-y-2">
                  <div className="flex items-center gap-2 text-rose-300 font-mono font-bold text-sm">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span>CẢNH BÁO BẪY NHẬN THỨC!</span>
                  </div>
                  <p className="text-xs text-rose-200 leading-relaxed font-sans">{evaluation.pedagogicalMessage}</p>
                  <p className="text-[11px] text-rose-400 font-mono">
                    Hậu quả: Phạt {evaluation.manaPenaltyPercent}% Mana hiện tại do thao tác phản ứng sai nguyên lý khoa học!
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-navy/60 border border-navy-light space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-mono font-bold text-xs">
                    <Info className="w-4 h-4 text-amber-400" />
                    <span>CHƯA THỂ PHẢN ỨNG</span>
                  </div>
                  <p className="text-xs text-ivory-muted leading-relaxed">{evaluation.pedagogicalMessage}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-ivory-muted font-mono text-xs flex flex-col items-center justify-center gap-2">
              <FlaskConical className="w-10 h-10 text-emerald-500/40 animate-pulse" />
              <span>Hãy chọn ít nhất 2 lá bài trên sân / trên tay để xem trước phương trình phản ứng hóa học.</span>
            </div>
          )}
        </div>

        {/* Modal Bottom Confirm Bar */}
        <div className="p-4 bg-obsidian/90 border-t border-navy-light/60 flex items-center justify-between gap-3">
          <div className="text-xs font-mono text-ivory-muted">
            Trạng thái: <strong className={evaluation?.status === 'SUCCESS' ? 'text-emerald-400' : 'text-slate-400'}>
              {evaluation?.status === 'SUCCESS' ? 'Hợp lệ • Sẵn sàng phản ứng' : 'Đang chờ chất tham gia'}
            </strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-navy-light hover:bg-slate-700 text-ivory text-xs font-mono transition-all"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              disabled={!evaluation || evaluation.status !== 'SUCCESS'}
              className={`px-5 py-2 rounded-xl text-xs font-black font-mono transition-all shadow-lg flex items-center gap-1.5 ${
                evaluation?.status === 'SUCCESS'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-obsidian hover:from-emerald-400 hover:to-teal-500 hover:scale-105 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>KÍCH HOẠT PHẢN ỨNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
