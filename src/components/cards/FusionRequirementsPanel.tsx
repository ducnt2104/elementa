// src/components/cards/FusionRequirementsPanel.tsx
// High-Fidelity Fusion, Synthesis & Chemical Reaction Requirements Inspector for ELEMENTA
// Shows precise reactant cards, stoichiometric quantities, environmental conditions, and readiness states

import React, { useMemo } from 'react';
import { PlayableCardDef } from '../../domain/cardGameTypes';
import { PLAYABLE_CARDS } from '../../data/playableCardsData';
import { ChemicalCardView } from './ChemicalCardView';
import {
  Flame,
  Droplets,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowDown,
  Sparkles,
  Zap,
  Atom,
  Thermometer,
  Gauge
} from 'lucide-react';

export interface MaterialStatus {
  card: PlayableCardDef;
  requiredCount: number;
  availableCount: number;
  isReady: boolean;
  missingCount: number;
  location?: 'FIELD' | 'HAND' | 'GRAVEYARD' | 'COLLECTION' | 'NONE';
}

export interface FusionRequirementsPanelProps {
  card: PlayableCardDef;
  availableCards?: PlayableCardDef[]; // From current duel hand/field or player collection
  onSelectMaterialCard?: (card: PlayableCardDef) => void;
  compact?: boolean;
}

export const FusionRequirementsPanel: React.FC<FusionRequirementsPanelProps> = ({
  card,
  availableCards = [],
  onSelectMaterialCard,
  compact = false
}) => {
  // Analyze card synthesis/fusion recipe
  const recipeData = useMemo(() => {
    // 1. Explicit synthesisRecipe on Compound Monster
    if (card.synthesisRecipe && card.synthesisRecipe.reactantFormulas.length > 0) {
      const materials: MaterialStatus[] = [];
      let allReady = true;

      for (const item of card.synthesisRecipe.reactantFormulas) {
        // Find matching cards in playable cards catalog
        const matchingCard =
          PLAYABLE_CARDS.find(
            (c) =>
              c.chemicalFormula?.toLowerCase() === item.formula.toLowerCase() ||
              c.id.toLowerCase().includes(item.formula.toLowerCase()) ||
              c.name.toLowerCase().includes(item.formula.toLowerCase())
          ) || {
            id: `mat_${item.formula.toLowerCase()}`,
            name: `Nguyên Liệu [${item.formula}]`,
            name_en: `Reactant [${item.formula}]`,
            cardType: 'ELEMENT_MONSTER',
            rarity: 'COMMON',
            attribute: 'TERRA',
            manaCost: 2,
            chemicalFormula: item.formula,
            effectCode: 'MATERIAL_PLACEHOLDER',
            effectText: `Nguyên liệu tham gia phản ứng tổng hợp ${card.name}`,
            scientificLore: `Chất phản ứng cơ sở cho ${card.chemicalFormula || card.name}`
          } as PlayableCardDef;

        // Count how many are available in the provided context
        const availableCount = availableCards.filter(
          (c) => c.chemicalFormula?.toLowerCase() === item.formula.toLowerCase() || c.id === matchingCard.id
        ).length;

        const isReady = availableCount >= item.count;
        if (!isReady) allReady = false;

        materials.push({
          card: matchingCard,
          requiredCount: item.count,
          availableCount,
          isReady,
          missingCount: Math.max(0, item.count - availableCount)
        });
      }

      return {
        type: 'COMPOUND_SYNTHESIS',
        title: 'CÔNG THỨC TỔNG HỢP HỢP CHẤT (COMPOUND SYNTHESIS)',
        equation: card.synthesisRecipe.pedagogicalEquation || card.relatedEquation || `${card.chemicalFormula} Synthesis`,
        condition: card.synthesisRecipe.requiredCondition || 'Nhiệt độ phòng & Xúc tác tiêu chuẩn',
        materials,
        allReady
      };
    }

    // 2. Link Monster Covalent Valence Link
    if (card.cardType === 'LINK_MONSTER') {
      const minCount = card.linkRating || card.linkMaterialsRequired?.minCount || 2;
      return {
        type: 'VALENCE_LINK',
        title: 'ĐIỀU KIỆN LIÊN KẾT HÓA TRỊ (VALENCE LINK SUMMON)',
        equation: card.relatedEquation || `Covalent Link-${card.linkRating || 2} Formation`,
        condition: 'Quái thú nguyên tố có số electron độc thân tương thích trên sân',
        materials: [
          {
            card: {
              id: 'generic_link_material',
              name: 'Quái Thú Hóa Trị Tương Thích',
              name_en: 'Compatible Valence Monster',
              cardType: 'ELEMENT_MONSTER',
              rarity: 'COMMON',
              attribute: card.attribute,
              manaCost: 2,
              chemicalFormula: 'Valence-e⁻',
              effectCode: 'LINK_MAT',
              effectText: 'Bất kỳ quái thú nguyên tố nào có hóa trị phù hợp',
              scientificLore: 'Đóng góp orbital phân tử để tạo liên kết σ hoặc π'
            } as PlayableCardDef,
            requiredCount: minCount,
            availableCount: availableCards.length,
            isReady: availableCards.length >= minCount,
            missingCount: Math.max(0, minCount - availableCards.length)
          }
        ],
        allReady: availableCards.length >= minCount
      };
    }

    // 3. Fallback for reaction spells with equations
    if (card.relatedEquation) {
      return {
        type: 'CHEMICAL_REACTION',
        title: 'PHƯƠNG TRÌNH PHẢN ỨNG HÓA HỌC (REACTION EQUATION)',
        equation: card.relatedEquation,
        condition: 'Kích hoạt trong pha thích hợp (Spells / Quick-Play)',
        materials: [],
        allReady: true
      };
    }

    return null;
  }, [card, availableCards]);

  if (!recipeData) {
    return null;
  }

  return (
    <div className={`w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-cyan-500/30 p-4 shadow-xl ${compact ? 'text-xs' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-900/40 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-serif font-black text-sm text-cyan-200 tracking-wide">
              {recipeData.title}
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Kiểm tra nguyên liệu và điều kiện xúc tác phản ứng
            </span>
          </div>
        </div>

        {/* Global Ready Badge */}
        {recipeData.materials.length > 0 && (
          <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 border ${
            recipeData.allReady
              ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400/80'
              : 'bg-amber-950/90 text-amber-300 border-amber-400/80'
          }`}>
            {recipeData.allReady ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ĐỦ NGUYÊN LIỆU</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>THIẾU NGUYÊN LIỆU</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Chemical Equation Bar */}
      <div className="rounded-xl bg-slate-950/90 border border-cyan-400/20 p-3 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-inner">
        <div>
          <span className="text-[9px] font-mono text-cyan-400/80 uppercase font-bold tracking-wider">
            Phương trình nhiệt động học:
          </span>
          <div className="font-mono text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-200 to-sky-300">
            {recipeData.equation}
          </div>
        </div>

        {recipeData.condition && (
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-[10px] font-mono text-cyan-300 shrink-0">
            <Thermometer className="w-3 h-3 text-amber-400" />
            <span>{recipeData.condition}</span>
          </div>
        )}
      </div>

      {/* Materials Grid / Flow */}
      {recipeData.materials.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
            DANH SÁCH NGUYÊN LIỆU CẦN THIẾT (REQUIRED MATERIALS):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {recipeData.materials.map((mat, idx) => (
              <div
                key={idx}
                onClick={() => onSelectMaterialCard && onSelectMaterialCard(mat.card)}
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                  onSelectMaterialCard ? 'cursor-pointer hover:scale-[1.02]' : ''
                } ${
                  mat.isReady
                    ? 'bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-rose-950/30 border-rose-500/40 hover:border-rose-400'
                }`}
              >
                <div className="shrink-0 pointer-events-none">
                  <ChemicalCardView card={mat.card} size="xs" disableHoverZoom={true} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs text-ivory truncate">{mat.card.name}</div>
                  <div className="font-mono text-[10px] text-cyan-400 font-bold">
                    Công thức: {mat.card.chemicalFormula || 'N/A'}
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Yêu cầu: <b className="text-amber-300">×{mat.requiredCount}</b></span>
                    <span className={mat.isReady ? 'text-emerald-300 font-bold' : 'text-rose-400 font-bold'}>
                      {mat.isReady ? `Đủ (${mat.availableCount})` : `Thiếu ×${mat.missingCount}`}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full transition-all ${
                        mat.isReady ? 'bg-emerald-400' : 'bg-rose-500'
                      }`}
                      style={{
                        width: `${Math.min(100, (mat.availableCount / mat.requiredCount) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fusion Arrow & Result */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              <span>HỢP NHẤT LIÊN KẾT HÓA HỌC</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
            </div>
            <div className="text-xs font-bold text-emerald-300 mt-1">
              → Triệu hồi thành công: <span className="underline">{card.name}</span> ({card.chemicalFormula})
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
