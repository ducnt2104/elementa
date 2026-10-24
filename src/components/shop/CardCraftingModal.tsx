// src/components/shop/CardCraftingModal.tsx
// Dedicated Card Crafting & Duplicate Disenchant Chamber using Elemental Shards
// Allows players to craft specific cards or recycle extra copies (>3) into Elemental Shards.

import React, { useState, useMemo } from 'react';
import { PlayerProfile } from '../../domain/types';
import { PlayableCardDef, CardRarity } from '../../domain/cardGameTypes';
import { getAllPlayableCards } from '../../data/playableCardsData';
import {
  craftCardWithShards,
  recycleDuplicates,
  scanDuplicateCards,
  getCardCraftingCost,
  getCardRecycleYield,
  SHARD_CRAFTING_COSTS
} from '../../domain/shardsEconomy';
import { ChemicalCardView } from '../cards/ChemicalCardView';
import { sound } from '../../audio/soundEngine';
import {
  Hammer,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  X,
  Layers,
  ArrowRight,
  Flame,
  Droplets,
  Zap,
  Atom,
  Shield
} from 'lucide-react';

interface CardCraftingModalProps {
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
  onClose: () => void;
  initialCardToCraft?: PlayableCardDef | null;
}

export const CardCraftingModal: React.FC<CardCraftingModalProps> = ({
  profile,
  onUpdateProfile,
  onClose,
  initialCardToCraft
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialCardToCraft?.name || '');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [selectedAttribute, setSelectedAttribute] = useState<string>('ALL');
  const [selectedCard, setSelectedCard] = useState<PlayableCardDef | null>(initialCardToCraft || null);
  const [confirmCraft, setConfirmCraft] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const currentShards = profile.elementalShards || 0;
  const collectionOwned = profile.cardCollection || {};

  // Scan duplicates in player's collection
  const dupScan = useMemo(() => {
    return scanDuplicateCards(collectionOwned);
  }, [collectionOwned]);

  // Filter cards from full catalog
  const filteredCatalog = useMemo(() => {
    return getAllPlayableCards().filter(card => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = card.name.toLowerCase().includes(q) || card.name_en.toLowerCase().includes(q);
        const matchesFormula = card.chemicalFormula?.toLowerCase().includes(q);
        const matchesEffect = card.effectText?.toLowerCase().includes(q);
        if (!matchesName && !matchesFormula && !matchesEffect) return false;
      }
      if (selectedRarity !== 'ALL' && card.rarity !== selectedRarity) return false;
      if (selectedAttribute !== 'ALL' && card.attribute !== selectedAttribute) return false;
      return true;
    });
  }, [searchQuery, selectedRarity, selectedAttribute]);

  // Handle crafting a card
  const handleExecuteCraft = (card: PlayableCardDef) => {
    sound.playUiClick();
    const result = craftCardWithShards(profile, card.id);
    if (result.success && result.updatedProfile) {
      sound.playVictory();
      onUpdateProfile(() => result.updatedProfile!);
      setActionFeedback(result.message);
      setConfirmCraft(false);
      setTimeout(() => setActionFeedback(null), 3000);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(result.message);
      setTimeout(() => setActionFeedback(null), 3500);
    }
  };

  // Handle recycling duplicate cards
  const handleExecuteRecycle = () => {
    sound.playUiClick();
    const result = recycleDuplicates(profile);
    if (result.success && result.updatedProfile) {
      sound.playVictory();
      onUpdateProfile(() => result.updatedProfile!);
      setActionFeedback(result.message);
      setTimeout(() => setActionFeedback(null), 3500);
    } else {
      sound.playErrorFizzle();
      setActionFeedback(result.message);
      setTimeout(() => setActionFeedback(null), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-navy border-2 border-cyan-500/50 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-navy-light/60 bg-gradient-to-r from-cyan-950/80 via-navy to-obsidian flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-inner">
              <Hammer className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-black text-lg sm:text-xl text-ivory tracking-wider">
                  XƯỞNG CHẾ TẠO & PHÂN RÃ THẺ BÀI
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                  ELEMENTAL SHARDS
                </span>
              </div>
              <p className="text-xs text-ivory-muted mt-0.5">
                Chế tạo trực tiếp thẻ bài mong muốn hoặc phân rã bản sao trùng lặp (&gt;3 lá) để thu hồi Shards.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Shards Balance Capsule */}
            <div className="px-3.5 py-1.5 rounded-xl bg-obsidian/80 border border-cyan-500/50 flex items-center gap-2 shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <div className="text-right">
                <div className="text-[10px] text-ivory-muted font-mono leading-none">Mảnh Nguyên Tố</div>
                <div className="text-sm font-black font-mono text-cyan-300">{currentShards.toLocaleString()}</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-obsidian/60 hover:bg-navy-light text-ivory-muted hover:text-ivory border border-navy-light transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {actionFeedback && (
          <div className="p-3 bg-cyan-900/60 border-b border-cyan-500/40 text-center text-xs font-bold text-cyan-200 animate-fadeIn flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Duplicate Recycling Banner */}
        <div className="p-3 sm:p-4 bg-obsidian/60 border-b border-navy-light/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-ivory flex items-center gap-2">
                <span>Phân rã bản sao trùng lặp</span>
                {dupScan.totalCardsToRecycle > 0 ? (
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    Có {dupScan.totalCardsToRecycle} thẻ dư thừa
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-400">
                    Không có thẻ dư thừa
                  </span>
                )}
              </div>
              <p className="text-[11px] text-ivory-muted mt-0.5">
                Quy tắc TCG: Giữ lại 3 bản sao tối đa cho mỗi lá bài. Các bản sao thứ 4 trở đi có thể phân rã thành Shards.
              </p>
            </div>
          </div>

          <button
            onClick={handleExecuteRecycle}
            disabled={dupScan.totalCardsToRecycle <= 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              dupScan.totalCardsToRecycle > 0
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-obsidian shadow-lg hover:scale-105 active:scale-95'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Phân rã (+{dupScan.totalShardsEarned} Shards)</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 border-b border-navy-light/40 bg-navy/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ivory-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, ký hiệu hóa học, công thức..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-obsidian border border-navy-light text-xs text-ivory focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-obsidian border border-navy-light text-xs text-ivory focus:border-cyan-400 focus:outline-none font-mono"
            >
              <option value="ALL">Mọi Độ Hiếm</option>
              <option value="COMMON">Common (60 Shards)</option>
              <option value="RARE">Rare (160 Shards)</option>
              <option value="SUPER_RARE">Super Rare (400 Shards)</option>
              <option value="ULTRA_RARE">Ultra Rare (1,000 Shards)</option>
              <option value="SECRET_RARE">Secret Rare (2,400 Shards)</option>
            </select>

            <select
              value={selectedAttribute}
              onChange={(e) => setSelectedAttribute(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-obsidian border border-navy-light text-xs text-ivory focus:border-cyan-400 focus:outline-none font-mono"
            >
              <option value="ALL">Mọi Thuộc Tính</option>
              <option value="PYRO">Hỏa (Pyro)</option>
              <option value="AQUA">Thủy (Aqua)</option>
              <option value="TERRA">Địa (Terra)</option>
              <option value="AERO">Phong (Aero)</option>
              <option value="ELECTRO">Điện (Electro)</option>
              <option value="ACID_DARK">Axit (Acid)</option>
              <option value="NOBLE_VOID">Khí Hiếm (Noble)</option>
            </select>
          </div>
        </div>

        {/* Main Content Area: Catalog & Selected Inspector */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left 2 Cols: Card Grid */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-xs text-ivory-muted font-mono">
              <span>Tìm thấy {filteredCatalog.length} thẻ bài</span>
              <span>Tối đa 3 bản sao / thẻ</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredCatalog.slice(0, 60).map((card) => {
                const owned = collectionOwned[card.id] || 0;
                const cost = getCardCraftingCost(card);
                const isSelected = selectedCard?.id === card.id;
                const canAfford = currentShards >= cost;
                const isMax = owned >= 3;

                return (
                  <div
                    key={card.id}
                    onClick={() => {
                      sound.playCardSelect();
                      setSelectedCard(card);
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-obsidian/70 hover:bg-navy/80 border-navy-light/60 hover:border-cyan-500/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono font-bold text-cyan-300">
                          {card.chemicalFormula || 'E'}
                        </span>
                        <span className="text-[9px] font-mono px-1 rounded bg-navy text-ivory-muted">
                          {card.rarity.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-ivory truncate mt-1" title={card.name}>
                        {card.name}
                      </div>
                      <div className="text-[10px] text-ivory-muted line-clamp-1 mt-0.5">
                        {card.cardType.replace('_', ' ')}
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[10px] font-mono">
                      <span className={owned > 0 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                        Có: {owned}/3
                      </span>
                      <span className={canAfford && !isMax ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                        {cost} Shards
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: Selected Card Crafting Station */}
          <div className="p-4 rounded-xl bg-obsidian/90 border border-cyan-500/40 flex flex-col justify-between">
            {selectedCard ? (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                    BÀN CHẾ TẠO
                  </span>
                  <h3 className="font-serif font-black text-base text-ivory mt-2">{selectedCard.name}</h3>
                  <p className="text-[11px] text-cyan-300 font-mono mt-0.5">
                    {selectedCard.chemicalFormula} • {selectedCard.rarity}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-ivory-muted font-mono">
                    <span>Đang sở hữu:</span>
                    <span className="text-ivory font-bold">{collectionOwned[selectedCard.id] || 0} / 3 lá</span>
                  </div>
                  <div className="flex items-center justify-between text-ivory-muted font-mono">
                    <span>Chi phí chế tạo:</span>
                    <span className="text-cyan-300 font-bold">{getCardCraftingCost(selectedCard)} Shards</span>
                  </div>
                  <div className="flex items-center justify-between text-ivory-muted font-mono">
                    <span>Shards hiện có:</span>
                    <span className="text-ivory font-bold">{currentShards} Shards</span>
                  </div>
                  <div className="flex items-center justify-between text-ivory-muted font-mono pt-1 border-t border-navy-light/40">
                    <span>Sau chế tạo:</span>
                    <span className={currentShards >= getCardCraftingCost(selectedCard) ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {currentShards - getCardCraftingCost(selectedCard)} Shards
                    </span>
                  </div>
                </div>

                {/* Effect Preview */}
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-[11px] text-ivory-muted leading-relaxed">
                  <span className="text-cyan-300 font-bold font-mono">[Hiệu Ứng]: </span>
                  {selectedCard.effectText || selectedCard.scientificLore}
                </div>

                {/* Craft Button */}
                {confirmCraft ? (
                  <div className="space-y-2 animate-fadeIn">
                    <p className="text-[11px] text-amber-300 text-center font-bold">
                      Xác nhận tiêu {getCardCraftingCost(selectedCard)} Shards để chế tạo lá bài này?
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExecuteCraft(selectedCard)}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-obsidian font-black text-xs font-mono shadow-lg hover:scale-105 active:scale-95 transition-all"
                      >
                        Đồng Ý Chế Tạo
                      </button>
                      <button
                        onClick={() => setConfirmCraft(false)}
                        className="px-3 py-2 rounded-xl bg-navy-light text-ivory text-xs font-mono hover:bg-slate-700 transition-all"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmCraft(true)}
                    disabled={(collectionOwned[selectedCard.id] || 0) >= 3 || currentShards < getCardCraftingCost(selectedCard)}
                    className={`w-full py-2.5 rounded-xl font-bold font-mono text-xs transition-all flex items-center justify-center gap-2 ${
                      (collectionOwned[selectedCard.id] || 0) >= 3
                        ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        : currentShards >= getCardCraftingCost(selectedCard)
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-obsidian shadow-lg hover:scale-105 active:scale-95'
                        : 'bg-slate-800 text-rose-400 border border-rose-500/30 cursor-not-allowed'
                    }`}
                  >
                    <Hammer className="w-4 h-4" />
                    <span>
                      {(collectionOwned[selectedCard.id] || 0) >= 3
                        ? 'Đã đạt tối đa 3 lá'
                        : currentShards >= getCardCraftingCost(selectedCard)
                        ? `Chế Tạo (-${getCardCraftingCost(selectedCard)} Shards)`
                        : `Thiếu ${getCardCraftingCost(selectedCard) - currentShards} Shards`}
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-ivory-muted">
                <Hammer className="w-10 h-10 text-cyan-500/40 mb-2" />
                <p className="text-xs">Chọn một lá bài từ danh sách bên trái để xem chi phí và chế tạo.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
