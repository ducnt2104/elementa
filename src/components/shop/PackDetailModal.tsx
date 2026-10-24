// src/components/shop/PackDetailModal.tsx
// Transparent Pack Details & Card Pool Preview Modal for ELEMENTA Tactical TCG
// Displays exact RNG drop odds, guaranteed slot mechanics, and inspectable card pool gallery.

import React, { useState, useMemo } from 'react';
import { BoosterSubPackDef } from './BoosterShopTab';
import { PLAYABLE_CARDS, getPlayableCardById } from '../../data/playableCardsData';
import { PlayableCardDef } from '../../domain/cardGameTypes';
import { sound } from '../../audio/soundEngine';
import {
  Package,
  Sparkles,
  Info,
  ShieldCheck,
  Percent,
  Layers,
  X,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

interface PackDetailModalProps {
  subPack: BoosterSubPackDef;
  playerTokens: number;
  collectionOwned: Record<string, number>;
  onClose: () => void;
  onBuyPack: (subPack: BoosterSubPackDef, count: 1 | 10) => void;
  onInspectCard?: (card: PlayableCardDef) => void;
}

export const PackDetailModal: React.FC<PackDetailModalProps> = ({
  subPack,
  playerTokens,
  collectionOwned,
  onClose,
  onBuyPack,
  onInspectCard
}) => {
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Determine card pool for this pack
  const poolCards = useMemo(() => {
    // Collect featured cards first
    const featured = subPack.featuredCardIds
      .map(id => getPlayableCardById(id))
      .filter((c): c is PlayableCardDef => c !== undefined);

    // If pack is thematic, collect matching thematic cards
    let pool: PlayableCardDef[] = [...featured];
    if (subPack.targetArchetype) {
      const archetypeCards = PLAYABLE_CARDS.filter(c => c.archetype === subPack.targetArchetype);
      pool = Array.from(new Set([...pool, ...archetypeCards]));
    } else if (subPack.gradeLevel) {
      const gradeKeywords: Record<string, string[]> = {
        LOP_10: ['lớp 10', 'nguyên tử', 'bảng tuần hoàn', 'oxi hóa', 'liên kết'],
        LOP_11: ['lớp 11', 'cân bằng', 'nitrogen', 'sulfur', 'hữu cơ', 'alkane'],
        LOP_12: ['lớp 12', 'este', 'lipid', 'polymer', 'kim loại', 'phức chất', 'pin']
      };
      const kw = gradeKeywords[subPack.gradeLevel] || [];
      const gradeCards = PLAYABLE_CARDS.filter(c => 
        kw.some(k => c.scientificLore?.toLowerCase().includes(k) || c.effectText?.toLowerCase().includes(k))
      );
      pool = Array.from(new Set([...pool, ...gradeCards.slice(0, 40)]));
    }

    // Fallback to core cards if pool is small
    if (pool.length < 15) {
      pool = Array.from(new Set([...pool, ...PLAYABLE_CARDS.slice(0, 30)]));
    }

    return pool;
  }, [subPack]);

  const filteredPool = useMemo(() => {
    return poolCards.filter(card => {
      if (selectedRarity !== 'ALL' && card.rarity !== selectedRarity) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          card.name.toLowerCase().includes(q) ||
          card.chemicalFormula?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [poolCards, selectedRarity, searchQuery]);

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-navy border-2 border-amber-500/50 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header with Banner */}
        <div className={`p-5 bg-gradient-to-r ${subPack.bannerGradient || 'from-amber-600 to-navy'} border-b border-navy-light/60 flex items-center justify-between text-ivory`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-obsidian/50 border border-white/20">
              <Package className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-black text-xl text-ivory tracking-wide">{subPack.name}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-obsidian/60 text-amber-300 border border-amber-400/40 font-bold">
                  {subPack.badge}
                </span>
              </div>
              <p className="text-xs text-ivory/80 mt-0.5">{subPack.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-obsidian/50 hover:bg-obsidian/80 text-ivory-muted hover:text-ivory border border-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Odds & Guaranteed Slot Info Bar */}
        <div className="p-4 bg-obsidian/70 border-b border-navy-light/40 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Guaranteed Slot */}
          <div className="p-3 rounded-xl bg-navy/80 border border-amber-500/30 space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Ô 4: BẢO ĐẢM FOIL
            </div>
            <p className="text-[11px] text-ivory-muted leading-relaxed">
              Mỗi gói 5 lá luôn bảo đảm ít nhất <strong>1 lá Rare hoặc cao hơn</strong> tại Ô số 4.
            </p>
          </div>

          {/* Rarity Drop Rates */}
          <div className="p-3 rounded-xl bg-navy/80 border border-cyan-500/30 space-y-1">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5 font-mono">
              <Percent className="w-4 h-4 text-cyan-400" /> TỈ LỆ RƠI THẺ CHUẨN
            </div>
            <div className="text-[10px] font-mono text-ivory-muted grid grid-cols-2 gap-x-2">
              <span>Common: ~60%</span>
              <span>Rare: ~25%</span>
              <span>Super Rare: ~10%</span>
              <span>Ultra/Secret: ~5%</span>
            </div>
          </div>

          {/* Pity Counter */}
          <div className="p-3 rounded-xl bg-navy/80 border border-emerald-500/30 space-y-1">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-4 h-4 text-emerald-400" /> BẢO HIỂM 10 GÓI (PITY)
            </div>
            <p className="text-[11px] text-ivory-muted leading-relaxed">
              Mở 10 gói liên tiếp kích hoạt bảo hiểm, cam kết ít nhất <strong>1 lá Ultra Rare</strong>!
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 border-b border-navy-light/40 bg-navy/40 flex items-center justify-between gap-3 text-xs flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ivory-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm thẻ trong gói..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-obsidian border border-navy-light text-xs text-ivory focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono">
            {['ALL', 'COMMON', 'RARE', 'SUPER_RARE', 'ULTRA_RARE'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRarity(r)}
                className={`px-2 py-1 rounded-lg transition-all ${
                  selectedRarity === r
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold'
                    : 'bg-obsidian text-ivory-muted hover:text-ivory border border-navy-light'
                }`}
              >
                {r === 'ALL' ? 'Tất cả' : r.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Card Pool Gallery */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-ivory-muted font-mono">
            <span>Danh sách {filteredPool.length} thẻ có thể nhận từ gói này:</span>
            <span>Giá: {subPack.priceTokens} Tokens / gói</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredPool.map(card => {
              const ownedCount = collectionOwned[card.id] || 0;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    sound.playCardSelect();
                    if (onInspectCard) onInspectCard(card);
                  }}
                  className="p-2.5 rounded-xl bg-obsidian/80 hover:bg-navy border border-navy-light hover:border-amber-400/60 transition-all cursor-pointer flex flex-col justify-between group shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-mono font-black text-amber-300">
                        {card.chemicalFormula || 'E'}
                      </span>
                      <span className="text-[8px] font-mono px-1 rounded bg-navy text-ivory-muted">
                        {card.rarity.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-ivory mt-1 line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {card.name}
                    </div>
                    <div className="text-[10px] text-ivory-muted line-clamp-1 mt-0.5">
                      {card.cardType.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[10px] font-mono">
                    {ownedCount > 0 ? (
                      <span className="text-emerald-400 font-bold">Đã có x{ownedCount}</span>
                    ) : (
                      <span className="text-slate-500">Chưa có</span>
                    )}
                    <span className="text-cyan-300 group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight className="w-3 h-3 inline" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Purchase Bar */}
        <div className="p-4 bg-obsidian/90 border-t border-navy-light/60 flex items-center justify-between gap-3">
          <div className="text-xs font-mono">
            <span className="text-ivory-muted">Số dư: </span>
            <span className="text-amber-400 font-bold">{playerTokens.toLocaleString()} Tokens</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onBuyPack(subPack, 1);
              }}
              disabled={playerTokens < subPack.priceTokens}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                playerTokens >= subPack.priceTokens
                  ? 'bg-navy-light hover:bg-slate-700 text-ivory border border-amber-500/40 hover:scale-105 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Mở 1 Gói ({subPack.priceTokens} Tokens)
            </button>

            <button
              onClick={() => {
                onClose();
                onBuyPack(subPack, 10);
              }}
              disabled={playerTokens < subPack.priceTokens * 9}
              className={`px-5 py-2 rounded-xl text-xs font-black font-mono transition-all shadow-lg ${
                playerTokens >= subPack.priceTokens * 9
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-obsidian hover:from-amber-400 hover:to-amber-500 hover:scale-105 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Mở 10 Gói ({subPack.priceTokens * 9} Tokens • -10%)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
