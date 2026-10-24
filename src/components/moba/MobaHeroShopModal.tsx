// src/components/moba/MobaHeroShopModal.tsx
// Dedicated Elemental Champion Shop for ELEMENTA: MOBA Arena
// Allows purchasing and unlocking champions with Knowledge Tokens (Decoupled from TCG cards)

import React, { useState } from 'react';
import { PlayerProfile } from '../../domain/types';
import { HeroDefinition } from '../../game/types';
import { HEROES_CATALOG } from '../../game/data/heroesData';
import { sound } from '../../audio/soundEngine';
import {
  ShoppingBag,
  Shield,
  Sword,
  Sparkles,
  Zap,
  Flame,
  Droplets,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  Layers,
  AlertCircle
} from 'lucide-react';

interface MobaHeroShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onUpdateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

const HERO_UNLOCK_COST = 500; // Knowledge Tokens per champion

export const MobaHeroShopModal: React.FC<MobaHeroShopModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile
}) => {
  const [selectedHero, setSelectedHero] = useState<HeroDefinition>(HEROES_CATALOG[0]);
  const [purchaseFeedback, setPurchaseFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const unlockedHeroes = profile.unlockedHeroes || ['hero_na_brawler', 'hero_fe_warden', 'hero_h_scout'];
  const isSelectedOwned = unlockedHeroes.includes(selectedHero.id);

  const handlePurchaseHero = (hero: HeroDefinition) => {
    sound.playUiClick();

    if (unlockedHeroes.includes(hero.id)) {
      setPurchaseFeedback({ success: false, message: `Bạn đã sở hữu tướng ${hero.name_vi}!` });
      return;
    }

    if (profile.knowledgeTokens < HERO_UNLOCK_COST) {
      setPurchaseFeedback({
        success: false,
        message: `Không đủ Knowledge Tokens! Cần ${HERO_UNLOCK_COST} Tokens (Hiện có: ${profile.knowledgeTokens} Tokens). Hãy hoàn thành thêm nhiệm vụ hóa học.`
      });
      return;
    }

    // Execute atomic purchase
    onUpdateProfile((prev) => {
      const currentUnlocked = prev.unlockedHeroes || ['hero_na_brawler', 'hero_fe_warden', 'hero_h_scout'];
      const nextUnlocked = [...currentUnlocked, hero.id];
      const nextTokens = prev.knowledgeTokens - HERO_UNLOCK_COST;

      const newTx = {
        id: `tx_hero_${hero.id}_${Date.now()}`,
        type: 'HERO_PURCHASE' as const,
        amount: -HERO_UNLOCK_COST,
        timestamp: new Date().toISOString(),
        detail: `Mở khóa Tướng Nguyên Tố [${hero.name_vi} (${hero.symbol})] trong MOBA Hero Shop.`
      };

      return {
        ...prev,
        knowledgeTokens: nextTokens,
        unlockedHeroes: nextUnlocked,
        auditTransactions: [...(prev.auditTransactions || []), newTx]
      };
    });

    setPurchaseFeedback({
      success: true,
      message: `Chúc mừng! Đã mở khóa thành công Tướng [${hero.name_vi}]. Bạn có thể chọn tướng này trong mọi chế độ MOBA.`
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-navy border-2 border-cyan-500/50 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-light/60 bg-obsidian/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg sm:text-xl text-ivory">
                CỬA HÀNG NGUYÊN TỐ — MOBA HERO SHOP
              </h3>
              <p className="text-xs text-ivory-muted">
                Mở khóa Tướng Nguyên Tố để điều khiển trong Đấu Trường MOBA 60 FPS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-obsidian border border-cyan-500/30 text-xs font-mono">
              <span className="text-cyan-400">Tokens:</span>
              <span className="text-ivory font-bold">{profile.knowledgeTokens.toLocaleString()}</span>
            </div>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-navy-light/60 hover:bg-navy-light text-ivory text-xs font-bold transition-all"
            >
              Đóng
            </button>
          </div>
        </div>

        {/* Purchase Notification Banner */}
        {purchaseFeedback && (
          <div
            className={`px-6 py-2.5 text-xs font-semibold flex items-center gap-2 ${
              purchaseFeedback.success
                ? 'bg-emerald-950/80 border-b border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/80 border-b border-rose-500/40 text-rose-300'
            }`}
          >
            {purchaseFeedback.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{purchaseFeedback.message}</span>
          </div>
        )}

        {/* Content: Champions Grid (Left) + Details & Purchase (Right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-light/60">
          {/* Champions Catalog List (7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-5 overflow-y-auto max-h-[400px] lg:max-h-[600px] space-y-3">
            <div className="flex items-center justify-between text-xs text-ivory-muted mb-2 font-mono">
              <span>DANH SÁCH 12 NGUYÊN TỐ ({unlockedHeroes.length}/12 ĐÃ MỞ KHÓA)</span>
              <span>GIÁ: {HERO_UNLOCK_COST} TOKENS / TƯỚNG</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HEROES_CATALOG.map((hero) => {
                const isOwned = unlockedHeroes.includes(hero.id);
                const isSelected = selectedHero.id === hero.id;

                return (
                  <div
                    key={hero.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedHero(hero);
                      setPurchaseFeedback(null);
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/70 border-cyan-400 shadow-md shadow-cyan-500/20'
                        : isOwned
                        ? 'bg-obsidian/70 border-navy-light/60 hover:border-cyan-500/40'
                        : 'bg-obsidian/40 border-navy-light/40 hover:border-amber-500/40 opacity-90'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-serif font-black text-lg text-obsidian shadow"
                        style={{ backgroundColor: hero.colorTheme }}
                      >
                        {hero.symbol}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif font-bold text-xs text-ivory">{hero.name_vi}</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-300 block">{hero.role}</span>
                      </div>
                    </div>

                    <div>
                      {isOwned ? (
                        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Đã Có</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          <Lock className="w-3 h-3" />
                          <span>{HERO_UNLOCK_COST} T</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Champion Detail & Action Panel (5 cols) */}
          <div className="lg:col-span-5 p-5 flex flex-col justify-between space-y-4 bg-obsidian/40">
            <div className="space-y-4">
              {/* Champion Visual Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-serif font-black text-2xl text-obsidian shadow-lg"
                  style={{ backgroundColor: selectedHero.colorTheme }}
                >
                  {selectedHero.symbol}
                </div>
                <div>
                  <h4 className="font-serif font-black text-lg text-ivory">{selectedHero.name_vi}</h4>
                  <p className="text-xs text-cyan-300 font-mono">{selectedHero.title_vi}</p>
                  <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-navy text-ivory-muted border border-navy-light/60">
                    Vai Trò: {selectedHero.role} • Z = {selectedHero.elementData?.z}
                  </span>
                </div>
              </div>

              {/* Chemical Lore & IUPAC Ground Truth */}
              <div className="p-3 rounded-xl bg-navy/60 border border-navy-light/40 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-copper">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Cơ Sở Khoa Học IUPAC</span>
                </div>
                <p className="text-[11px] text-ivory-muted leading-relaxed">
                  {selectedHero.loreVI}
                </p>
              </div>

              {/* In-Game Gameplay Stats */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-ivory font-mono uppercase tracking-wider">
                  Chỉ Số Khởi Điểm Gameplay
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-navy/80 border border-navy-light/40 flex justify-between">
                    <span className="text-rose-400">Máu (HP):</span>
                    <span className="text-ivory font-bold">{selectedHero.baseStats.maxHp}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy/80 border border-navy-light/40 flex justify-between">
                    <span className="text-blue-400">Năng Lượng:</span>
                    <span className="text-ivory font-bold">{selectedHero.baseStats.maxMana}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy/80 border border-navy-light/40 flex justify-between">
                    <span className="text-amber-400">Sức Mạnh (AD):</span>
                    <span className="text-ivory font-bold">{selectedHero.baseStats.attackDamage}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy/80 border border-navy-light/40 flex justify-between">
                    <span className="text-emerald-400">Giáp Hóa Học:</span>
                    <span className="text-ivory font-bold">{selectedHero.baseStats.armor}</span>
                  </div>
                </div>
              </div>

              {/* Skills Overview */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-ivory font-mono uppercase tracking-wider">
                  Bộ Kỹ Năng Nguyên Tố
                </span>
                <div className="space-y-1 text-xs">
                  <div className="p-2 rounded-lg bg-navy/70 border border-navy-light/30">
                    <strong className="text-cyan-300 font-mono mr-1">[P] {selectedHero.skills.passive.name_vi}:</strong>
                    <span className="text-ivory-muted text-[11px]">{selectedHero.skills.passive.description_vi}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy/70 border border-navy-light/30">
                    <strong className="text-amber-300 font-mono mr-1">[Q] {selectedHero.skills.q.name_vi}:</strong>
                    <span className="text-ivory-muted text-[11px]">{selectedHero.skills.q.description_vi}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-navy/70 border border-navy-light/30">
                    <strong className="text-rose-300 font-mono mr-1">[R] {selectedHero.skills.r?.name_vi || 'Chiêu Cuối'}:</strong>
                    <span className="text-ivory-muted text-[11px]">{selectedHero.skills.r?.description_vi || 'Kích nổ phản ứng tối thượng.'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action / Buy Button */}
            <div className="pt-3 border-t border-navy-light/60">
              {isSelectedOwned ? (
                <div className="w-full py-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ĐÃ SỞ HỮU — SẴN SÀNG THAM GIA ĐẤU TRƯỜNG MOBA</span>
                </div>
              ) : (
                <button
                  onClick={() => handlePurchaseHero(selectedHero)}
                  disabled={profile.knowledgeTokens < HERO_UNLOCK_COST}
                  className={`w-full py-3 rounded-xl font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all ${
                    profile.knowledgeTokens >= HERO_UNLOCK_COST
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-obsidian shadow-cyan-500/30 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-navy-light/40 text-ivory-muted border border-white/10 cursor-not-allowed opacity-60'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>MỞ KHÓA TƯỚNG ({HERO_UNLOCK_COST} TOKENS)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
