// src/components/shop/DailyMarketplaceSection.tsx
// Daily Free Rewards & Rotating Individual Singles Marketplace for ELEMENTA Booster Shop
// Includes Daily Free 100 Shards, Daily Free Pack, and 4 Rotating Daily Elemental/Compound Cards

import React, { useState, useEffect, useMemo } from 'react';
import { PlayerProfile } from '../../domain/types';
import { PlayableCardDef } from '../../domain/cardGameTypes';
import { PLAYABLE_CARDS } from '../../data/playableCardsData';
import { sound } from '../../audio/soundEngine';
import {
  Gift,
  Coins,
  Sparkles,
  Clock,
  CheckCircle2,
  Package,
  ShoppingBag,
  Award,
  Zap,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export interface DailyMarketplaceProps {
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
  onOpenFreePack: () => void;
  onInspectCard?: (card: PlayableCardDef) => void;
}

interface DailyCardOffering {
  card: PlayableCardDef;
  priceTokens: number;
  priceShards?: number;
  discountPercent?: number;
}

export const DailyMarketplaceSection: React.FC<DailyMarketplaceProps> = ({
  profile,
  onUpdateProfile,
  onOpenFreePack,
  onInspectCard
}) => {
  const [notification, setNotification] = useState<string | null>(null);
  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  // Daily Free Gifts State
  const [freeClaims, setFreeClaims] = useState<{
    freePackClaimed: boolean;
    freeShardsClaimed: boolean;
    purchasedCardIds: string[];
  }>(() => {
    try {
      const raw = localStorage.getItem(`elementa_shop_daily_${todayStr}`);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn('[DailyMarketplace] Failed to read daily storage:', e);
    }
    return { freePackClaimed: false, freeShardsClaimed: false, purchasedCardIds: [] };
  });

  const saveDailyState = (newState: typeof freeClaims) => {
    setFreeClaims(newState);
    try {
      localStorage.setItem(`elementa_shop_daily_${todayStr}`, JSON.stringify(newState));
    } catch (e) {
      console.warn('[DailyMarketplace] Failed to save daily storage:', e);
    }
  };

  // Remaining time to midnight ICT/UTC
  const [timeToReset, setTimeToReset] = useState<string>('');
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diffMs = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
      setTimeToReset(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Select 4 daily rotating cards deterministically by date hash
  const dailyOfferings = useMemo<DailyCardOffering[]>(() => {
    const dayOfYear = Math.floor(
      (new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );

    const commonCandidates = PLAYABLE_CARDS.filter((c) => c.rarity === 'COMMON');
    const rareCandidates = PLAYABLE_CARDS.filter((c) => c.rarity === 'RARE');
    const superRareCandidates = PLAYABLE_CARDS.filter((c) => c.rarity === 'SUPER_RARE');
    const ultraRareCandidates = PLAYABLE_CARDS.filter((c) => c.rarity === 'ULTRA_RARE' || c.rarity === 'SECRET_RARE');

    const commonCard = commonCandidates[(dayOfYear * 7) % commonCandidates.length] || PLAYABLE_CARDS[0];
    const rareCard = rareCandidates[(dayOfYear * 13) % (rareCandidates.length || 1)] || PLAYABLE_CARDS[1];
    const superRareCard = superRareCandidates[(dayOfYear * 17) % (superRareCandidates.length || 1)] || PLAYABLE_CARDS[2];
    const ultraRareCard = ultraRareCandidates[(dayOfYear * 23) % (ultraRareCandidates.length || 1)] || PLAYABLE_CARDS[3];

    return [
      { card: commonCard, priceTokens: 60, discountPercent: 20 },
      { card: rareCard, priceTokens: 180, discountPercent: 15 },
      { card: superRareCard, priceTokens: 420, priceShards: 150, discountPercent: 25 },
      { card: ultraRareCard, priceTokens: 900, priceShards: 350, discountPercent: 30 }
    ];
  }, []);

  const handleClaimFreeShards = () => {
    if (freeClaims.freeShardsClaimed) return;
    sound.playVictory();
    onUpdateProfile((prev) => ({
      ...prev,
      elementalShards: (prev.elementalShards || 0) + 100
    }));
    const next = { ...freeClaims, freeShardsClaimed: true };
    saveDailyState(next);
    setNotification('Nhận thành công +100 Elemental Shards miễn phí hôm nay!');
    setTimeout(() => setNotification(null), 4000);
  };

  const handleClaimFreePack = () => {
    if (freeClaims.freePackClaimed) return;
    const next = { ...freeClaims, freePackClaimed: true };
    saveDailyState(next);
    onOpenFreePack();
  };

  const handleBuySingleCard = (offer: DailyCardOffering) => {
    if (freeClaims.purchasedCardIds.includes(offer.card.id)) return;

    if (profile.knowledgeTokens < offer.priceTokens) {
      sound.playErrorFizzle();
      setNotification(`Không đủ Knowledge Tokens! Cần ${offer.priceTokens} Tokens (Bạn có: ${profile.knowledgeTokens}).`);
      setTimeout(() => setNotification(null), 4000);
      return;
    }

    sound.playVictory();
    onUpdateProfile((prev) => {
      const nextCollection = { ...(prev.cardCollection || {}) };
      nextCollection[offer.card.id] = (nextCollection[offer.card.id] || 0) + 1;
      return {
        ...prev,
        knowledgeTokens: prev.knowledgeTokens - offer.priceTokens,
        cardCollection: nextCollection
      };
    });

    const next = {
      ...freeClaims,
      purchasedCardIds: [...freeClaims.purchasedCardIds, offer.card.id]
    };
    saveDailyState(next);
    setNotification(`Mua thành công thẻ bài: ${offer.card.name}!`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border border-emerald-500/50 text-emerald-200 shadow-2xl backdrop-blur-md animate-slideDown">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{notification}</span>
        </div>
      )}

      {/* Header Countdown Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Phúc Lợi Hàng Ngày & Chợ Thẻ Luân Phiên (Daily Market)
            </h2>
            <p className="text-xs text-slate-400">
              Nhận quà miễn phí mỗi 24 giờ và săn các thẻ nguyên tố/hợp chất với giá ưu đãi đặc biệt.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-indigo-500/40 text-xs font-mono">
          <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-slate-400">Làm mới sau:</span>
          <strong className="text-amber-300 text-sm font-bold tracking-widest">{timeToReset}</strong>
        </div>
      </div>

      {/* 1. Daily Free Welfare Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Free 100 Shards */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                  Miễn Phí Mỗi Ngày
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">100 Elemental Shards</h3>
              <p className="text-xs text-slate-400">Dùng để ghép và rèn thẻ bài trong Xưởng</p>
            </div>
          </div>

          <button
            onClick={handleClaimFreeShards}
            disabled={freeClaims.freeShardsClaimed}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shrink-0 ${
              freeClaims.freeShardsClaimed
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black shadow-cyan-500/25 animate-pulse'
            }`}
          >
            {freeClaims.freeShardsClaimed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Đã Nhận</span>
              </>
            ) : (
              <>
                <Gift className="w-4 h-4" />
                <span>Nhận +100 Shards</span>
              </>
            )}
          </button>
        </div>

        {/* Free Booster Pack */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
              <Package className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  Miễn Phí Mỗi Ngày
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1">1 Gói Bài Hóa Học (5 Lá)</h3>
              <p className="text-xs text-slate-400">Bảo đảm nhận ít nhất 1 lá bài độ hiếm Rare</p>
            </div>
          </div>

          <button
            onClick={handleClaimFreePack}
            disabled={freeClaims.freePackClaimed}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shrink-0 ${
              freeClaims.freePackClaimed
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black shadow-amber-500/25 animate-pulse'
            }`}
          >
            {freeClaims.freePackClaimed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Đã Mở Hôm Nay</span>
              </>
            ) : (
              <>
                <Package className="w-4 h-4" />
                <span>Mở Gói Miễn Phí</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Daily Rotating Singles Marketplace */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Thẻ Bài Đơn Lẻ Luân Phiên (Mua Trực Tiếp)
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Mỗi thẻ chỉ mua được 1 lần / ngày
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyOfferings.map((offer) => {
            const isPurchased = freeClaims.purchasedCardIds.includes(offer.card.id);
            const inInventoryCount = (profile.cardCollection || {})[offer.card.id] || 0;

            const rarityColor =
              offer.card.rarity === 'ULTRA_RARE' || offer.card.rarity === 'SECRET_RARE'
                ? 'border-amber-500/60 bg-amber-950/20'
                : offer.card.rarity === 'SUPER_RARE'
                ? 'border-purple-500/60 bg-purple-950/20'
                : offer.card.rarity === 'RARE'
                ? 'border-cyan-500/60 bg-cyan-950/20'
                : 'border-slate-700 bg-slate-900/60';

            return (
              <div
                key={offer.card.id}
                className={`rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] shadow-lg ${rarityColor}`}
              >
                <div className="space-y-3">
                  {/* Badge & Discount */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono bg-black/40 text-slate-300 border border-white/10">
                      {offer.card.rarity}
                    </span>
                    {offer.discountPercent && (
                      <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-rose-500 text-white shadow-sm">
                        -{offer.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Card Formula & Name */}
                  <div>
                    <span className="text-2xl font-black font-mono text-cyan-300">
                      {offer.card.chemicalFormula || offer.card.name}
                    </span>
                    <h4 className="text-sm font-bold text-white truncate mt-0.5">
                      {offer.card.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {offer.card.effectText || offer.card.scientificLore || 'Thẻ bài chiến thuật'}
                    </p>
                  </div>

                  {/* Stats & Ownership */}
                  <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400 border-t border-white/5">
                    {offer.card.atk !== undefined && (
                      <span className="font-mono text-emerald-400 font-bold">
                        ATK {offer.card.atk} / DEF {offer.card.def}
                      </span>
                    )}
                    <span className="font-mono text-slate-400">
                      Sở hữu: <strong className="text-slate-200">{inInventoryCount}</strong>
                    </span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Giá Bán:</span>
                    <div className="flex items-center gap-1 font-bold text-amber-300 font-mono">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      <span>{offer.priceTokens} Tokens</span>
                    </div>
                  </div>

                  <div className="flex gap-1.5">
                    {onInspectCard && (
                      <button
                        onClick={() => onInspectCard(offer.card)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                        title="Xem chi tiết thẻ"
                      >
                        👁️
                      </button>
                    )}
                    <button
                      onClick={() => handleBuySingleCard(offer)}
                      disabled={isPurchased}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                        isPurchased
                          ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {isPurchased ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Đã Mua</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Mua Ngay</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
