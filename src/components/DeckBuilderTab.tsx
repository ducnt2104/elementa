// src/components/DeckBuilderTab.tsx
// Tactical 10-Slot Deck Builder with Real-Time Synergy Analyzer

import React, { useState, useMemo } from 'react';
import { CORE_MVP_ELEMENTS, ENVIRONMENTAL_CARDS, ALL_ELEMENTS } from '../data/elementsData';
import { REACTION_RULES_DATABASE } from '../data/reactionsData';
import { PlayerProfile, ElementData, EnvironmentalCard } from '../domain/types';
import { sound } from '../audio/soundEngine';
import {
  Layers,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Zap,
  RotateCcw,
  Sparkles,
  Search,
  Activity,
  Flame,
  Droplets,
  ShieldAlert
} from 'lucide-react';

interface DeckBuilderTabProps {
  profile: PlayerProfile;
  onUpdateDeck: (newDeckCardIds: string[]) => void;
}

export const DeckBuilderTab: React.FC<DeckBuilderTabProps> = ({
  profile,
  onUpdateDeck
}) => {
  const [activeDeck, setActiveDeck] = useState<string[]>(profile.activeDeck);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const MAX_SLOTS = 10;

  // Resolve card objects in active deck
  const deckCards = useMemo(() => {
    return activeDeck.map(id => {
      if (id.startsWith('elem_')) {
        const z = parseInt(id.replace('elem_', ''), 10);
        const elem = ALL_ELEMENTS.find(e => e.z === z);
        return { id, type: 'ELEMENT' as const, element: elem };
      } else {
        const env = ENVIRONMENTAL_CARDS.find(e => e.id === id);
        return { id, type: 'ENVIRONMENT' as const, environment: env };
      }
    });
  }, [activeDeck]);

  // Deck element symbols & active environmental conditions
  const activeSymbols = useMemo(() => {
    return deckCards.filter(c => c.type === 'ELEMENT' && c.element).map(c => c.element!.symbol);
  }, [deckCards]);

  const activeConditions = useMemo(() => {
    return deckCards.filter(c => c.type === 'ENVIRONMENT' && c.environment).map(c => c.environment!.conditionType);
  }, [deckCards]);

  // Real-time Synergy Analyzer against REACTION_RULES_DATABASE
  const synergyReport = useMemo(() => {
    const symbolSet = new Set(activeSymbols);
    const conditionSet = new Set(activeConditions);

    const readyCombos: typeof REACTION_RULES_DATABASE = [];
    const missingConditionCombos: { rule: typeof REACTION_RULES_DATABASE[0]; missing: string[] }[] = [];

    for (const rule of REACTION_RULES_DATABASE) {
      if (rule.isTrap) continue;

      if (rule.code === 'R04_HCL_NAOH') {
        if (conditionSet.has('ACID_DILUTE') && conditionSet.has('BASE_ALKALINE')) {
          readyCombos.push(rule);
        }
        continue;
      }

      const hasAllReactants = rule.reactants.length > 0 && rule.reactants.every(r => symbolSet.has(r));
      if (!hasAllReactants) continue;

      const missing = rule.requiredConditions.filter(c => !conditionSet.has(c));
      if (missing.length === 0) {
        readyCombos.push(rule);
      } else {
        missingConditionCombos.push({ rule, missing });
      }
    }

    // Dead Cards: elements that appear in 0 ready or missing combos
    const activeReactantSymbols = new Set<string>();
    for (const r of [...readyCombos, ...missingConditionCombos.map(m => m.rule)]) {
      r.reactants.forEach(s => activeReactantSymbols.add(s));
    }
    const deadCards = activeSymbols.filter(s => !activeReactantSymbols.has(s) && s !== 'He' && s !== 'Au');

    return {
      readyCombos,
      missingConditionCombos,
      deadCards
    };
  }, [activeSymbols, activeConditions]);

  const attackCount = deckCards.filter(c => c.type === 'ELEMENT' && (c.element?.role === 'BURST_REDUCTION' || c.element?.role === 'CORROSIVE_OXIDATION')).length;
  const defenseCount = deckCards.filter(c => c.type === 'ELEMENT' && (c.element?.role === 'INERT_SHIELD' || c.element?.role === 'VARIABLE_VALENCE')).length;
  const envCount = deckCards.filter(c => c.type === 'ENVIRONMENT').length;

  const totalMana = deckCards.reduce((acc, c) => {
    if (c.type === 'ELEMENT') return acc + (c.element?.stats.mana_cost || 1);
    if (c.type === 'ENVIRONMENT') return acc + (c.environment?.mana_cost || 1);
    return acc;
  }, 0);
  const avgMana = deckCards.length > 0 ? (totalMana / deckCards.length).toFixed(1) : '0';

  const handleAddCard = (id: string) => {
    if (activeDeck.length >= MAX_SLOTS) {
      sound.playErrorFizzle();
      return;
    }
    if (activeDeck.includes(id)) {
      sound.playErrorFizzle();
      return;
    }
    sound.playCardSelect();
    const next = [...activeDeck, id];
    setActiveDeck(next);
    onUpdateDeck(next);
  };

  const handleRemoveCard = (id: string) => {
    sound.playUiClick();
    const next = activeDeck.filter(cardId => cardId !== id);
    setActiveDeck(next);
    onUpdateDeck(next);
  };

  const applyPreset = (presetIds: string[]) => {
    sound.playCardSelect();
    setActiveDeck(presetIds);
    onUpdateDeck(presetIds);
    setSaveNotice('Đã áp dụng bộ bài mẫu!');
    setTimeout(() => setSaveNotice(null), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy/80 p-5 rounded-2xl border border-navy-light/60 backdrop-blur">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ivory flex items-center gap-2">
            <span>Kho Đồ Chiến Thuật 10 Ô & Synergy Analyzer</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-copper/20 text-copper border border-copper/40 font-bold">
              {activeDeck.length} / {MAX_SLOTS} Ô
            </span>
          </h2>
          <p className="text-xs text-ivory-muted mt-1">
            Bộ bài tối ưu dung lượng làm việc. Bộ phân tích Synergy kiểm tra tự động khả năng kích hoạt phản ứng hóa học thật.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => applyPreset([
              'elem_11', 'elem_26', 'elem_29', 'elem_2', 'elem_30',
              'env_h2o', 'env_o2', 'env_temp', 'env_acid', 'env_base'
            ])}
            className="px-3 py-1.5 rounded-xl bg-navy-light/70 hover:bg-navy-light text-cyan-ion border border-cyan-ion/40 text-xs font-semibold transition-all"
          >
            Mẫu Cân Bằng Chuẩn
          </button>
          <button
            onClick={() => applyPreset([
              'elem_11', 'elem_19', 'elem_12', 'elem_2', 'elem_26',
              'env_h2o', 'env_temp', 'env_o2', 'env_acid', 'env_base'
            ])}
            className="px-3 py-1.5 rounded-xl bg-navy-light/70 hover:bg-navy-light text-coral-reaction border border-coral-reaction/40 text-xs font-semibold transition-all"
          >
            Mẫu Bùng Nổ Kiềm
          </button>
        </div>
      </div>

      {/* Balance Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-navy/60 border border-coral-reaction/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-ivory-muted uppercase font-mono block">Tấn Công (IA, VIIA)</span>
            <span className="font-serif text-lg font-bold text-coral-reaction">{attackCount} Thẻ</span>
          </div>
          <Flame className="w-5 h-5 text-coral-reaction opacity-70" />
        </div>

        <div className="p-3.5 rounded-xl bg-navy/60 border border-cyan-ion/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-ivory-muted uppercase font-mono block">Phòng Thủ & Đỡ Đòn</span>
            <span className="font-serif text-lg font-bold text-cyan-ion">{defenseCount} Thẻ</span>
          </div>
          <Activity className="w-5 h-5 text-cyan-ion opacity-70" />
        </div>

        <div className="p-3.5 rounded-xl bg-navy/60 border border-lime-mineral/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-ivory-muted uppercase font-mono block">Tác Nhân Môi Trường</span>
            <span className="font-serif text-lg font-bold text-lime-mineral">{envCount} Thẻ</span>
          </div>
          <Droplets className="w-5 h-5 text-lime-mineral opacity-70" />
        </div>

        <div className="p-3.5 rounded-xl bg-navy/60 border border-copper/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-ivory-muted uppercase font-mono block">Mana Trung Bình</span>
            <span className="font-serif text-lg font-bold text-copper">{avgMana} / Thẻ</span>
          </div>
          <Zap className="w-5 h-5 text-copper opacity-70" />
        </div>
      </div>

      {/* Real-time Synergy Analyzer Panel */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-navy via-obsidian to-navy border border-navy-light space-y-3">
        <div className="flex items-center justify-between border-b border-navy-light/40 pb-2">
          <h3 className="font-serif text-xs font-bold uppercase tracking-wider text-cyan-ion flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-ion" />
            <span>Kết Quả Phân Tích Hiệp Đồng Phản Ứng (Synergy Analyzer)</span>
          </h3>
          <span className="text-[11px] font-mono text-lime-mineral font-bold">
            {synergyReport.readyCombos.length} Combo Sẵn Sàng Kích Hoạt
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Ready Combos */}
          <div className="p-3 rounded-xl bg-lime-mineral/10 border border-lime-mineral/30 space-y-1.5">
            <span className="text-[11px] font-bold text-lime-mineral uppercase font-mono block">
              ✓ Combo Đã Đủ Cả Chất Tham Gia & Điều Kiện ({synergyReport.readyCombos.length}):
            </span>
            {synergyReport.readyCombos.length === 0 ? (
              <p className="text-ivory-muted/70 italic text-[11px]">
                Chưa có combo hoàn chỉnh nào! Hãy kiểm tra thẻ điều kiện môi trường.
              </p>
            ) : (
              <ul className="space-y-1">
                {synergyReport.readyCombos.map(r => (
                  <li key={r.code} className="text-ivory font-mono text-[11px] flex items-center gap-1.5">
                    <span className="text-lime-mineral font-bold">•</span>
                    <span>{r.equation}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Missing Condition Combos */}
          <div className="p-3 rounded-xl bg-copper/10 border border-copper/30 space-y-1.5">
            <span className="text-[11px] font-bold text-copper uppercase font-mono block">
              ▲ Đã Có Nguyên Tố Nhưng Thiếu Điều Kiện ({synergyReport.missingConditionCombos.length}):
            </span>
            {synergyReport.missingConditionCombos.length === 0 ? (
              <p className="text-ivory-muted/70 italic text-[11px]">
                Không có tổ hợp nào bị nghẽn do thiếu điều kiện.
              </p>
            ) : (
              <ul className="space-y-1">
                {synergyReport.missingConditionCombos.map(m => (
                  <li key={m.rule.code} className="text-ivory font-mono text-[11px] flex items-start gap-1.5">
                    <span className="text-copper font-bold">•</span>
                    <div>
                      <span>{m.rule.name_vi}</span>
                      <span className="text-[10px] text-coral-reaction block">Thiếu: {m.missing.join(', ')}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Dead Cards Warning */}
        {synergyReport.deadCards.length > 0 && (
          <div className="p-2.5 rounded-xl bg-coral-reaction/15 border border-coral-reaction/40 flex items-center gap-2 text-xs text-coral-reaction">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Thẻ lẻ không có combo phối hợp: </strong>
              Nguyên tố [{synergyReport.deadCards.join(', ')}] hiện không có bất kỳ phản ứng tương hỗ nào với các thẻ còn lại trong bộ bài.
            </span>
          </div>
        )}
      </div>

      {/* 10 Slots Deck View */}
      <div className="bg-navy/90 rounded-2xl border border-navy-light/80 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-navy-light/50 pb-2">
          <h3 className="font-serif text-sm font-bold text-ivory uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-copper" />
            <span>10 Ô ĐÃ CHỌN TRONG KHO ĐỒ CHIẾN THUẬT</span>
          </h3>
          {saveNotice && (
            <span className="text-xs text-lime-mineral font-semibold flex items-center gap-1 animate-pulse">
              <CheckCircle className="w-3.5 h-3.5" />
              {saveNotice}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
          {Array.from({ length: MAX_SLOTS }).map((_, idx) => {
            const card = deckCards[idx];
            if (!card) {
              return (
                <div
                  key={`empty_${idx}`}
                  className="h-28 rounded-xl border border-dashed border-navy-light/50 bg-obsidian/40 flex flex-col items-center justify-center p-2 text-ivory-muted/40 select-none"
                >
                  <span className="text-xs font-mono font-bold">Ô {idx + 1}</span>
                  <span className="text-[10px]">Trống</span>
                </div>
              );
            }

            const isElem = card.type === 'ELEMENT' && card.element;
            return (
              <div
                key={card.id}
                className="relative h-28 rounded-xl border border-navy-light bg-gradient-to-b from-navy to-obsidian p-2 flex flex-col justify-between group select-none shadow-md hover:border-coral-reaction transition-all"
              >
                <button
                  onClick={() => handleRemoveCard(card.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-coral-reaction text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                  title="Xóa khỏi bộ bài"
                >
                  <Trash2 className="w-3 h-3" />
                </button>

                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-copper">{isElem ? `Z=${card.element!.z}` : 'Môi trường'}</span>
                  <span className="px-1 py-0.2 rounded bg-navy-light text-cyan-ion font-bold">
                    M:{isElem ? card.element!.stats.mana_cost : card.environment!.mana_cost}
                  </span>
                </div>

                <div className="text-center my-0.5">
                  <span className="font-serif font-black text-xl text-ivory block">
                    {isElem ? card.element!.symbol : card.environment!.symbol}
                  </span>
                  <span className="text-[9px] font-semibold text-ivory-muted truncate block">
                    {isElem ? card.element!.name_iupac : card.environment!.name_vi}
                  </span>
                </div>

                <div className="text-[8px] font-mono text-center text-ivory-muted/70 truncate border-t border-navy-light/40 pt-0.5">
                  {isElem ? card.element!.name_vi : 'Tác nhân'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Cards Catalog */}
      <div className="space-y-4">
        {/* Environmental Cards */}
        <div className="bg-navy/60 rounded-2xl border border-navy-light/60 p-5 space-y-3">
          <h3 className="font-serif text-sm font-bold text-lime-mineral uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-lime-mineral" />
            <span>Thẻ Tác Nhân Môi Trường (Bắt Buộc Cho Phản Ứng)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {ENVIRONMENTAL_CARDS.map(env => {
              const isInDeck = activeDeck.includes(env.id);
              return (
                <div
                  key={env.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isInDeck
                      ? 'bg-lime-mineral/10 border-lime-mineral/50 opacity-60'
                      : 'bg-navy/80 border-navy-light hover:border-lime-mineral/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-black text-lime-mineral text-base">{env.symbol}</span>
                    <span className="font-mono text-[10px] text-ivory-muted">Mana: {env.mana_cost}</span>
                  </div>
                  <h4 className="font-semibold text-xs text-ivory mt-1">{env.name_vi}</h4>
                  <p className="text-[10px] text-ivory-muted mt-1 line-clamp-2">{env.description_vi}</p>

                  <button
                    disabled={isInDeck || activeDeck.length >= MAX_SLOTS}
                    onClick={() => handleAddCard(env.id)}
                    className={`w-full mt-3 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      isInDeck
                        ? 'bg-navy-light text-ivory-muted cursor-not-allowed'
                        : 'bg-lime-mineral/20 text-lime-mineral hover:bg-lime-mineral/30'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isInDeck ? 'Đã Chọn' : 'Thêm Vào Ô'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 28 Core Elements */}
        <div className="bg-navy/60 rounded-2xl border border-navy-light/60 p-5 space-y-3">
          <h3 className="font-serif text-sm font-bold text-cyan-ion uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-ion" />
            <span>28 Nguyên Tố Trọng Tâm GDPT 2018 (Z=1 đến Z=20 + Fe, Cu, Zn, Br, Ag, I, Ba, Au)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {CORE_MVP_ELEMENTS.map(elem => {
              const cardId = `elem_${elem.z}`;
              const isInDeck = activeDeck.includes(cardId);
              return (
                <div
                  key={elem.z}
                  className={`p-3 rounded-xl border transition-all ${
                    isInDeck
                      ? 'bg-cyan-ion/10 border-cyan-ion/50 opacity-60'
                      : 'bg-navy/80 border-navy-light hover:border-cyan-ion/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-copper">Z={elem.z}</span>
                    <span className="px-1 rounded bg-navy-light text-cyan-ion font-bold">M:{elem.stats.mana_cost}</span>
                  </div>

                  <div className="text-center my-1">
                    <span className="font-serif font-black text-2xl text-ivory">{elem.symbol}</span>
                    <span className="text-[10px] font-semibold block text-ivory-muted truncate">{elem.name_iupac}</span>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono text-ivory-muted/70 border-t border-navy-light/40 pt-1">
                    <span>{elem.name_vi}</span>
                    <span className="text-copper">P{elem.period}•G{elem.group}</span>
                  </div>

                  <button
                    disabled={isInDeck || activeDeck.length >= MAX_SLOTS}
                    onClick={() => handleAddCard(cardId)}
                    className={`w-full mt-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      isInDeck
                        ? 'bg-navy-light text-ivory-muted cursor-not-allowed'
                        : 'bg-cyan-ion/20 text-cyan-ion hover:bg-cyan-ion/30'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isInDeck ? 'Đã Chọn' : 'Thêm Vào Ô'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
