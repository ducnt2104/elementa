// src/components/duel/CardScientificInspector.tsx
// Comprehensive Scientific & Master Rule Card Inspector Component for ELEMENTA

import React, { useMemo, useState } from 'react';
import { PlayableCardDef, CardInstance, MonsterZoneSlot } from '../../domain/cardGameTypes';
import { FusionRequirementsPanel } from '../cards/FusionRequirementsPanel';
import { getShellElectrons, computeElectronStructure, ElementElectronStructure } from '../../domain/orbitalEngine';
import { getRelatedCards, RelatedCardLink, CardRelationType } from '../../domain/relatedCardsService';
import {
  Atom,
  Flame,
  Zap,
  Sparkles,
  Shield,
  Sword,
  Layers,
  Compass,
  BookOpen,
  FlaskConical,
  Activity,
  CheckCircle2,
  Gem,
  Link2,
  Plus,
  ArrowRight,
  Hammer
} from 'lucide-react';

export interface CardScientificInspectorProps {
  card: PlayableCardDef;
  instance?: CardInstance | null;
  slot?: MonsterZoneSlot | null;
  compact?: boolean;
  cardCollection?: Record<string, number>;
  onSelectCard?: (card: PlayableCardDef) => void;
  onAddCardToDeck?: (card: PlayableCardDef) => void;
  onOpenCrafting?: (card: PlayableCardDef) => void;
}

export const CardScientificInspector: React.FC<CardScientificInspectorProps> = ({
  card,
  instance,
  slot,
  compact = false,
  cardCollection = {},
  onSelectCard,
  onAddCardToDeck,
  onOpenCrafting
}) => {
  const [selectedRelationFilter, setSelectedRelationFilter] = useState<string>('ALL');

  // Compute related cards dynamically from chemistry and tactical rules
  const relatedLinks: RelatedCardLink[] = useMemo(() => {
    return getRelatedCards(card, cardCollection);
  }, [card, cardCollection]);

  const filteredLinks = useMemo(() => {
    if (selectedRelationFilter === 'ALL') return relatedLinks;
    return relatedLinks.filter(l => l.relationType === selectedRelationFilter);
  }, [relatedLinks, selectedRelationFilter]);
  // Compute electron structure if card has atomic number
  const electronStructure: ElementElectronStructure | null = useMemo(() => {
    if (card.atomicNumber && card.atomicNumber > 0) {
      try {
        return computeElectronStructure(card.atomicNumber, card.chemicalFormula || 'X');
      } catch {
        return null;
      }
    }
    return null;
  }, [card.atomicNumber, card.chemicalFormula]);

  const shellElectrons: number[] = useMemo(() => {
    if (card.atomicNumber && card.atomicNumber > 0) {
      try {
        return getShellElectrons(card.atomicNumber, card.chemicalFormula);
      } catch {
        return [];
      }
    }
    return [];
  }, [card.atomicNumber, card.chemicalFormula]);

  // Determine Master Rule category badge
  const masterRuleCategory = useMemo(() => {
    if (card.cardType === 'SYNCHRO_MONSTER') {
      return {
        label: 'TRIỆU HỒI ĐỒNG BỘ (SYNCHRO)',
        color: 'bg-slate-100 text-slate-900 border-white',
        borderGlow: 'border-white/50 shadow-white/20'
      };
    }
    if (card.cardType === 'XYZ_MONSTER') {
      return {
        label: 'TRIỆU HỒI PHỨC CHẤT (XYZ)',
        color: 'bg-zinc-950 text-amber-300 border-amber-500/60',
        borderGlow: 'border-amber-500/40 shadow-amber-500/20'
      };
    }
    if (card.cardType === 'PENDULUM_MONSTER') {
      return {
        label: 'TRIỆU HỒI DAO ĐỘNG (PENDULUM)',
        color: 'bg-gradient-to-r from-emerald-900 to-teal-950 text-teal-200 border-teal-400/50',
        borderGlow: 'border-teal-500/40 shadow-teal-500/20'
      };
    }
    if (card.cardType === 'LINK_MONSTER') {
      return {
        label: 'TRIỆU HỒI LIÊN KẾT (LINK)',
        color: 'bg-blue-950 text-cyan-300 border-cyan-400/60',
        borderGlow: 'border-cyan-500/40 shadow-cyan-500/20'
      };
    }
    if (card.cardType === 'RITUAL_MONSTER' || card.isRitualMonster) {
      return {
        label: 'TRIỆU HỒI NGHI THỨC (RITUAL)',
        color: 'bg-sky-950 text-sky-200 border-sky-400/60',
        borderGlow: 'border-sky-500/40 shadow-sky-500/20'
      };
    }
    if (card.cardType === 'COMPOUND_MONSTER') {
      return {
        label: 'TỔNG HỢP HỢP CHẤT (FUSION)',
        color: 'bg-violet-950 text-purple-200 border-purple-400/60',
        borderGlow: 'border-purple-500/40 shadow-purple-500/20'
      };
    }
    if (card.isTuner) {
      return {
        label: 'QUÁI THÚ TUNER (KHỞI XÚC ĐỒNG BỘ)',
        color: 'bg-amber-950 text-amber-200 border-amber-400/60',
        borderGlow: 'border-amber-500/40 shadow-amber-500/20'
      };
    }
    if (card.cardType === 'ELEMENT_MONSTER') {
      return {
        label: 'QUÁI THÚ NGUYÊN TỐ (ELEMENTAL)',
        color: 'bg-slate-900 text-slate-200 border-slate-700',
        borderGlow: 'border-slate-600/40'
      };
    }
    return null;
  }, [card]);

  // Attribute styling
  const attributeStyle = useMemo(() => {
    switch (card.attribute) {
      case 'PYRO': return { name: 'HỎA (PYRO)', color: 'text-orange-400 border-orange-500/40 bg-orange-950/40' };
      case 'AQUA': return { name: 'THỦY (AQUA)', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' };
      case 'TERRA': return { name: 'ĐỊA (TERRA)', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40' };
      case 'AERO': return { name: 'PHONG (AERO)', color: 'text-sky-300 border-sky-500/40 bg-sky-950/40' };
      case 'ELECTRO': return { name: 'ĐIỆN (ELECTRO)', color: 'text-amber-300 border-amber-500/40 bg-amber-950/40' };
      case 'ACID_DARK': return { name: 'AXIT ÁM (ACID)', color: 'text-purple-400 border-purple-500/40 bg-purple-950/40' };
      case 'NOBLE_VOID': return { name: 'KHÍ HIẾM TRƠ (NOBLE)', color: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/40' };
      default: return { name: 'VÔ CƠ', color: 'text-slate-400 border-slate-600 bg-slate-900' };
    }
  }, [card.attribute]);

  // Attached materials count if slot has xyzMaterials
  const overlayMaterialsCount = slot?.xyzMaterials?.length ?? 0;

  return (
    <div className="flex flex-col gap-2.5 font-sans text-xs">
      {/* 1. Header & Badges */}
      <div className="p-2.5 rounded-xl bg-slate-950/90 border border-white/10 shadow-lg space-y-1.5">
        <div className="flex items-start justify-between gap-1.5">
          <div>
            <h3 className="font-bold text-sm text-cyan-200 flex items-center gap-1.5">
              <span>{card.name}</span>
            </h3>
            {card.name_en && (
              <div className="text-[11px] text-slate-400 italic">{card.name_en}</div>
            )}
            {card.iupacName && (
              <div className="text-[10px] text-teal-400 font-mono">IUPAC: {card.iupacName}</div>
            )}
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${attributeStyle.color}`}>
            {attributeStyle.name}
          </span>
        </div>

        {/* Master Rule Mechanics Badge */}
        {masterRuleCategory && (
          <div className="pt-1">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold border shadow-sm ${masterRuleCategory.color} ${masterRuleCategory.borderGlow}`}>
              <Sparkles className="w-3 h-3" />
              {masterRuleCategory.label}
            </span>
          </div>
        )}
      </div>

      {/* 2. Combat Attributes & Master Rule Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-2 rounded-lg bg-navy/60 border border-navy-light/40 font-mono text-center">
        {card.atk !== undefined && (
          <div className="p-1 rounded bg-black/40 border border-red-500/20">
            <div className="text-[9px] text-red-400 flex items-center justify-center gap-1">
              <Sword className="w-3 h-3" /> ATK
            </div>
            <div className="text-sm font-bold text-red-200">{card.atk}</div>
          </div>
        )}
        {card.def !== undefined && (
          <div className="p-1 rounded bg-black/40 border border-blue-500/20">
            <div className="text-[9px] text-blue-400 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> DEF
            </div>
            <div className="text-sm font-bold text-blue-200">{card.def}</div>
          </div>
        )}
        {card.level !== undefined && card.cardType !== 'XYZ_MONSTER' && card.cardType !== 'LINK_MONSTER' && (
          <div className="p-1 rounded bg-black/40 border border-amber-500/20">
            <div className="text-[9px] text-amber-400">CẤP ĐỘ</div>
            <div className="text-sm font-bold text-amber-300">⭐ {card.level}★</div>
          </div>
        )}
        {card.xyzRank !== undefined && (
          <div className="p-1 rounded bg-black/40 border border-amber-500/40">
            <div className="text-[9px] text-amber-400">XYZ RANK</div>
            <div className="text-sm font-bold text-amber-200">⯁ {card.xyzRank}</div>
          </div>
        )}
        {card.linkRating !== undefined && (
          <div className="p-1 rounded bg-black/40 border border-cyan-500/40">
            <div className="text-[9px] text-cyan-400">LINK RATING</div>
            <div className="text-sm font-bold text-cyan-300">LINK-{card.linkRating}</div>
          </div>
        )}
        {card.pendulumScale !== undefined && (
          <div className="p-1 rounded bg-black/40 border border-teal-500/40">
            <div className="text-[9px] text-teal-400">PENDULUM</div>
            <div className="text-sm font-bold text-teal-300">💎 Scale {card.pendulumScale}</div>
          </div>
        )}
        <div className="p-1 rounded bg-black/40 border border-purple-500/20">
          <div className="text-[9px] text-purple-300 flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" /> MANA
          </div>
          <div className="text-sm font-bold text-purple-200">{card.manaCost}</div>
        </div>
      </div>

      {/* 2B. Explicit Fusion & Chemical Synthesis Requirements */}
      <FusionRequirementsPanel card={card} compact={compact} />

      {/* 3. Master Rule Mechanics Specific Visualizers */}
      {/* 3A. Synchro Requirements */}
      {card.cardType === 'SYNCHRO_MONSTER' && (
        <div className="p-2.5 rounded-lg bg-slate-900 border border-white/20 space-y-1">
          <div className="text-[10px] text-slate-400 font-mono font-bold flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-white" /> ĐIỀU KIỆN ĐỒNG BỘ (SYNCHRO REQUIREMENTS)
          </div>
          <div className="text-[11px] text-slate-200 font-mono bg-black/50 p-2 rounded border border-white/10">
            1 Quái thú Tuner + 1+ Quái thú Non-Tuner = Cấp {card.synchroLevel || 7}
          </div>
        </div>
      )}

      {/* 3B. Xyz Materials & Overlay Indicator */}
      {card.cardType === 'XYZ_MONSTER' && (
        <div className="p-2.5 rounded-lg bg-zinc-950 border border-amber-500/30 space-y-1.5">
          <div className="text-[10px] text-amber-400 font-mono font-bold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Gem className="w-3.5 h-3.5 text-amber-400" /> VẬT LIỆU XYZ (OVERLAY UNITS)
            </span>
            {slot && (
              <span className="px-1.5 py-0.5 rounded bg-amber-950 border border-amber-600 text-amber-300 text-[10px] font-bold">
                Đang gắn: {overlayMaterialsCount} vật liệu
              </span>
            )}
          </div>
          <div className="text-[11px] text-amber-200 font-mono bg-black/50 p-2 rounded border border-amber-500/20">
            Yêu cầu: {card.xyzMaterialsRequired?.materialRequirement || '2 quái thú cùng Cấp'}
          </div>
          {slot && slot.xyzMaterials && slot.xyzMaterials.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono">Danh sách vật liệu bên dưới:</span>
              <div className="flex flex-wrap gap-1">
                {slot.xyzMaterials.map((mat, mIdx) => (
                  <span key={mIdx} className="px-1.5 py-0.5 rounded bg-slate-800 border border-amber-500/30 text-amber-200 text-[10px] font-mono">
                    [{mIdx + 1}] {mat.def.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3C. Pendulum Scale Dual Indicators */}
      {card.cardType === 'PENDULUM_MONSTER' && (
        <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-teal-500/40 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-teal-300 font-mono font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-teal-400" /> THANG ĐO DAO ĐỘNG (PENDULUM SCALE)
            </span>
            <span className="px-2 py-0.5 rounded bg-teal-900 border border-teal-500 text-teal-200 font-mono font-bold">
              💎 Scale {card.pendulumScale}
            </span>
          </div>
          {card.pendulumEffectText && (
            <div className="bg-black/50 p-2 rounded border border-teal-500/30 text-[11px] text-teal-100 font-sans leading-relaxed">
              <span className="text-teal-400 font-bold font-mono">[Hiệu Ứng Thang Đo]: </span>
              {card.pendulumEffectText}
            </div>
          )}
        </div>
      )}

      {/* 3D. Link Arrows Matrix */}
      {card.cardType === 'LINK_MONSTER' && (
        <div className="p-2.5 rounded-lg bg-blue-950/60 border border-cyan-500/40 space-y-1.5">
          <div className="text-[10px] text-cyan-300 font-mono font-bold flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> MŨI TÊN LIÊN KẾT (LINK ARROWS)
          </div>
          <div className="flex items-center justify-center p-2 bg-black/50 rounded border border-cyan-500/20">
            <div className="grid grid-cols-3 gap-1 w-24 h-24">
              {['TOP_LEFT', 'TOP', 'TOP_RIGHT', 'LEFT', 'CENTER', 'RIGHT', 'BOTTOM_LEFT', 'BOTTOM', 'BOTTOM_RIGHT'].map((dir, dIdx) => {
                if (dir === 'CENTER') {
                  return (
                    <div key={dIdx} className="rounded bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                      L-{card.linkRating || 1}
                    </div>
                  );
                }
                const isArrowActive = card.linkArrows?.includes(dir as any);
                return (
                  <div
                    key={dIdx}
                    className={`rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                      isArrowActive
                        ? 'bg-red-600 text-white shadow-sm shadow-red-500 animate-pulse'
                        : 'bg-slate-900/40 border border-white/5 text-slate-600'
                    }`}
                  >
                    {isArrowActive ? '▲' : '·'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. Interactive Bohr-Rutherford SVG Atomic Shells (For Element Cards) */}
      {card.atomicNumber && card.atomicNumber > 0 && shellElectrons.length > 0 && (
        <div className="p-2.5 rounded-xl bg-black/70 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-1">
            <span className="text-[10px] font-mono font-bold text-cyan-300 flex items-center gap-1">
              <Atom className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
              MÔ HÌNH NGUYÊN TỬ BOHR-RUTHERFORD
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Z = {card.atomicNumber} ({card.chemicalFormula})
            </span>
          </div>

          {/* SVG Concentric Electron Orbits */}
          <div className="flex justify-center items-center py-1">
            <svg viewBox="-90 -90 180 180" className="w-44 h-44 drop-shadow-md">
              {/* Central Nucleus */}
              <circle cx="0" cy="0" r="16" fill="url(#nucleusGrad)" stroke="#38bdf8" strokeWidth="1.5" />
              <text cx="0" cy="-2" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                {card.chemicalFormula}
              </text>
              <text cx="0" cy="8" textAnchor="middle" dominantBaseline="middle" fill="#38bdf8" fontSize="6" fontFamily="monospace">
                +{card.atomicNumber}
              </text>

              {/* Radial Gradients */}
              <defs>
                <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0c4a6e" />
                </radialGradient>
              </defs>

              {/* Shell Orbit Rings & Electrons */}
              {shellElectrons.map((electronCount, shellIdx) => {
                const radius = 26 + shellIdx * 14;
                const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
                const shellName = shellNames[shellIdx] || `n=${shellIdx + 1}`;

                return (
                  <g key={shellIdx}>
                    {/* Concentric orbit track */}
                    <circle
                      cx="0"
                      cy="0"
                      r={radius}
                      fill="none"
                      stroke="rgba(56, 189, 248, 0.25)"
                      strokeWidth="0.8"
                      strokeDasharray="2,2"
                    />

                    {/* Shell label */}
                    <text
                      x={radius}
                      y="-2"
                      fill="rgba(148, 163, 184, 0.6)"
                      fontSize="5"
                      fontFamily="monospace"
                    >
                      {shellName}
                    </text>

                    {/* Electrons distributed evenly on ring */}
                    {Array.from({ length: electronCount }).map((_, eIdx) => {
                      const angle = (2 * Math.PI * eIdx) / electronCount;
                      const ex = radius * Math.cos(angle);
                      const ey = radius * Math.sin(angle);

                      return (
                        <circle
                          key={eIdx}
                          cx={ex}
                          cy={ey}
                          r="2.5"
                          fill="#38bdf8"
                          stroke="#ffffff"
                          strokeWidth="0.6"
                          className="drop-shadow-sm"
                        />
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Atomic Telemetry Data (GDPT 2018 Standards) */}
          {electronStructure && (
            <div className="space-y-1 text-[10px] font-mono bg-slate-900/80 p-2 rounded border border-white/5">
              <div className="flex items-center justify-between text-slate-300">
                <span>Cấu hình electron:</span>
                <span className="font-bold text-amber-300">{electronStructure.nobleGasConfigString}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Electron hóa trị:</span>
                <span className="font-bold text-cyan-300">{electronStructure.valenceElectrons} e⁻</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Từ tính:</span>
                <span className="font-bold text-emerald-300">
                  {electronStructure.magneticProperty.magneticTypeVI}
                </span>
              </div>
              {electronStructure.chemicalTendencyVI && (
                <div className="pt-1 border-t border-white/5 text-[9px] text-slate-400 font-sans italic leading-relaxed">
                  🔬 {electronStructure.chemicalTendencyVI}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. Balanced Stoichiometric Reaction Formula */}
      {card.relatedEquation && (
        <div className="p-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-1">
          <div className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-400" /> PHƯƠNG TRÌNH PHẢN ỨNG HÓA HỌC (IUPAC)
          </div>
          <div className="p-2 rounded bg-black/60 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-200">
            {card.relatedEquation}
          </div>
        </div>
      )}

      {/* 6. Card Effect Text (PSCT Formatted) */}
      <div className="p-2.5 rounded-xl bg-slate-950/90 border border-white/10 space-y-1">
        <div className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-cyan-400" /> HIỆU ỨNG THẺ BÀI (PSCT GRAMMAR)
        </div>
        <div className="text-[11px] text-slate-200 font-sans leading-relaxed p-2 rounded bg-black/40 border border-white/5">
          {card.effectText}
        </div>
      </div>

      {/* 7. Scientific Lore & Pedagogical Context */}
      {card.scientificLore && (
        <div className="p-2.5 rounded-xl bg-slate-950/90 border border-white/10 space-y-1">
          <div className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" /> BỐI CẢNH KHOA HỌC & LỊCH SỬ HÓA HỌC
          </div>
          <p className="text-[10px] text-slate-300 font-sans italic leading-relaxed p-2 rounded bg-black/40 border border-white/5">
            {card.scientificLore}
          </p>
        </div>
      )}

      {/* 8. Dynamic Related Cards Section (Chemistry & Tactical Relations) */}
      <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono font-bold text-cyan-300 flex items-center gap-1.5">
            <Link2 className="w-4 h-4 text-cyan-400" /> THẺ BÀI LIÊN QUAN ({relatedLinks.length})
          </div>
          <span className="text-[10px] text-slate-400 font-mono">DCSM Verified</span>
        </div>

        {/* Filter Pills for Relation Types */}
        {relatedLinks.length > 0 && (
          <div className="flex flex-wrap gap-1 text-[10px] font-mono">
            {['ALL', 'REACTANT', 'PRODUCT', 'CONDITION', 'COUNTER', 'SYNERGY'].map((type) => {
              const count = type === 'ALL' ? relatedLinks.length : relatedLinks.filter(l => l.relationType === type).length;
              if (type !== 'ALL' && count === 0) return null;
              const labels: Record<string, string> = {
                ALL: 'Tất cả',
                REACTANT: 'Cần kết hợp',
                PRODUCT: 'Sản phẩm',
                CONDITION: 'Điều kiện',
                COUNTER: 'Khắc chế',
                SYNERGY: 'Đồng bộ'
              };
              return (
                <button
                  key={type}
                  onClick={() => setSelectedRelationFilter(type)}
                  className={`px-2 py-0.5 rounded-full transition-all ${
                    selectedRelationFilter === type
                      ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/60 font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {labels[type]} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Related Cards List */}
        {filteredLinks.length === 0 ? (
          <div className="text-[11px] text-slate-500 italic p-3 text-center bg-black/30 rounded-lg">
            Không có thẻ liên quan nào trong bộ lọc này.
          </div>
        ) : (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {filteredLinks.map((link) => {
              const relBadgeColor =
                link.relationType === 'REACTANT'
                  ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                  : link.relationType === 'PRODUCT'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : link.relationType === 'CONDITION'
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
                  : link.relationType === 'COUNTER'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                  : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/50';

              return (
                <div
                  key={link.targetCard.id}
                  className="p-2 rounded-lg bg-black/50 border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-11 rounded bg-slate-900 border border-white/20 flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <span className="text-[11px] font-mono font-black text-ivory">
                        {link.targetCard.chemicalFormula || 'E'}
                      </span>
                      <span className="text-[8px] font-mono text-cyan-300">
                        {link.targetCard.manaCost ? `${link.targetCard.manaCost}M` : link.targetCard.cardType.slice(0, 3)}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-ivory truncate group-hover:text-cyan-300 transition-colors">
                          {link.targetCard.name}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border font-bold ${relBadgeColor}`}>
                          {link.relationLabel}
                        </span>
                        {link.isOwned ? (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/40">
                            Sở hữu x{link.ownedCount}
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            Chưa có
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
                        {link.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                    {onSelectCard && (
                      <button
                        onClick={() => onSelectCard(link.targetCard)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-cyan-900/40 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/30 transition-all flex items-center gap-1 hover:scale-105"
                        title="Xem chi tiết thẻ bài này"
                      >
                        <span>Xem</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    {onAddCardToDeck && link.isOwned && (
                      <button
                        onClick={() => onAddCardToDeck(link.targetCard)}
                        className="px-2 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/40 transition-all flex items-center gap-1 hover:scale-105"
                        title="Thêm thẻ này vào bộ bài hiện tại"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Thêm</span>
                      </button>
                    )}

                    {onOpenCrafting && !link.isOwned && (
                      <button
                        onClick={() => onOpenCrafting(link.targetCard)}
                        className="px-2 py-1 rounded bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40 transition-all flex items-center gap-1 hover:scale-105"
                        title="Chế tạo thẻ này bằng Elemental Shards"
                      >
                        <Hammer className="w-3 h-3" />
                        <span>Chế Tạo</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
