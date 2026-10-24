// src/components/tcg/TcgMainMenu.tsx
// Dedicated TCG Main Hub for ELEMENTA: Trading Card Game Pillar
// Architecture:
// 1. Two Prominent Central Gateways: CAMPAIGN PvE & BATTLE ARENA
// 2. Ergonomic Bottom Dock: Collection & Deck Builder, Shop, History Center, Quests

import React, { useState } from 'react';
import { PlayerProfile } from '../../domain/types';
import { sound } from '../../audio/soundEngine';
import { PLAYABLE_CARDS } from '../../data/playableCardsData';
import { TcgHistoryModal } from './TcgHistoryModal';
import {
  Sword,
  ShoppingBag,
  BookOpen,
  Layers,
  Sparkles,
  Compass,
  Trophy,
  Award,
  Settings,
  Home,
  Bot,
  Users,
  Shield,
  Zap,
  Play,
  ArrowRight,
  Flame,
  CheckCircle2,
  Lock,
  PlusCircle,
  LogIn,
  RotateCcw,
  Info,
  History,
  Check,
  ChevronRight,
  X
} from 'lucide-react';

export type TcgActiveSection =
  | 'MODES'
  | 'SHOP'
  | 'LIBRARY'
  | 'COLLECTION'
  | 'DECK'
  | 'CAMPAIGN'
  | 'RANKED'
  | 'QUESTS'
  | 'SETTINGS'
  | 'HOME';

interface TcgMainMenuProps {
  profile: PlayerProfile;
  onSelectSection: (section: TcgActiveSection) => void;
  onLaunchCasualBot: (difficulty?: 'NOVICE' | 'ADEPT' | 'EXPERT' | 'MENDELEEV') => void;
  onLaunchRankedAi: () => void;
  onLaunchCampaign: () => void;
  onOpenMultiplayerLobby: () => void;
  onReturnHome: () => void;
  onOpenSettings: () => void;
}

export const TcgMainMenu: React.FC<TcgMainMenuProps> = ({
  profile,
  onSelectSection,
  onLaunchCasualBot,
  onLaunchRankedAi,
  onLaunchCampaign,
  onOpenMultiplayerLobby,
  onReturnHome,
  onOpenSettings
}) => {
  const [showModesModal, setShowModesModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [joinRoomCode, setJoinRoomCode] = useState<string>('');
  const [roomError, setRoomError] = useState<string | null>(null);

  const ownedCount = Object.values(profile.cardCollection || {}).reduce((s, c) => s + (Number(c) || 0), 0);
  const uniqueOwned = Object.keys(profile.cardCollection || {}).length;
  const totalCatalog = PLAYABLE_CARDS.length;

  const tcgBotRank = profile.tcgBotRank || { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
  const completedCampaign = (profile.completedCampaignStages || []).length;
  const activeDeckName = profile.activeDuelDeck?.name || 'Bộ Bài Khởi Nguyên';
  const activeDeckCount = profile.activeDuelDeck?.mainDeck.length || 40;

  const handleJoinRoom = () => {
    sound.playUiClick();
    if (!joinRoomCode.trim()) {
      setRoomError('Vui lòng nhập mã phòng (6 ký tự)');
      return;
    }
    setRoomError(null);
    setShowModesModal(false);
    onOpenMultiplayerLobby();
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Top Banner & Profile Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-navy to-obsidian border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-obsidian/80 hover:bg-navy-light/80 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all hover:scale-105"
            title="Quay Về Home Hub"
          >
            <Home className="w-4 h-4" />
            <span>Quay Về Home Hub</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-obsidian/80 hover:bg-navy-light/80 text-slate-300 border border-slate-700 text-xs font-bold transition-all hover:scale-105"
            title="Cài Đặt Đấu Bài"
          >
            <Settings className="w-4 h-4 text-cyan-400" />
            <span>Cài Đặt Đấu Bài</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-xl sm:text-2xl text-amber-400 tracking-wider">
                ELEMENTA TCG HUB
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                SẢNH ĐẤU BÀI
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5">
              Trading Card Game Hóa Học • Luật Yu-Gi-Oh! 8000 LP • Phản ứng Hóa học Tương tác trên Sân
            </p>
          </div>
        </div>

        {/* Quick Stats Capsule */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-obsidian/70 border border-amber-500/30 flex items-center gap-2">
            <span className="text-amber-400">Tokens:</span>
            <span className="text-ivory font-bold">{profile.knowledgeTokens.toLocaleString()}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-obsidian/70 border border-cyan-500/30 flex items-center gap-2">
            <span className="text-cyan-400">Shards:</span>
            <span className="text-ivory font-bold">{(profile.elementalShards || 0).toLocaleString()}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-obsidian/70 border border-emerald-500/30 flex items-center gap-2">
            <span className="text-emerald-400">Hạng Bot:</span>
            <span className="text-ivory font-bold">{tcgBotRank.tier} {tcgBotRank.division} ({tcgBotRank.mmr} MMR)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2.1 — TWO PROMINENT CENTRAL GATEWAYS
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GATEWAY A: ĐẤU CHIẾN DỊCH — CAMPAIGN PvE */}
        <div
          onClick={() => {
            sound.playUiClick();
            onLaunchCampaign();
          }}
          className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-950/70 via-navy to-obsidian border-2 border-rose-500/40 hover:border-rose-400 cursor-pointer shadow-xl hover:shadow-rose-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div>
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-700 flex items-center justify-center text-ivory shadow-lg group-hover:rotate-6 transition-transform">
                <Compass className="w-8 h-8" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                  {completedCampaign} / 5 ẢI BOSS PVE
                </span>
              </div>
            </div>

            <h3 className="font-serif font-black text-2xl text-ivory mt-5 group-hover:text-rose-300 transition-colors tracking-wide">
              Chiến Dịch (Campaign)
            </h3>
            <p className="text-xs sm:text-sm text-ivory-muted mt-2 leading-relaxed">
              Hành trình phiêu lưu chinh phục các thử thách hóa học khắc nghiệt: Mưa Axit, Núi Lửa Nhiệt Nhôm, Hầm Băng Cryo trong các trận đấu bài TCG thực thụ.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-500/20 flex items-center justify-between">
            <div className="text-xs font-mono text-rose-300">
              Ải tiếp theo: <span className="font-bold text-ivory">{completedCampaign >= 5 ? 'Đã hoàn thành tất cả ải!' : `Ải ${completedCampaign + 1}: Thử thách môi trường`}</span>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-ivory font-black text-xs font-mono tracking-wide shadow-md group-hover:shadow-rose-500/40 transition-all">
              <span>{completedCampaign > 0 ? 'CHƠI TIẾP' : 'BẮT ĐẦU CHIẾN DỊCH'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* GATEWAY B: ĐẤU BÀI — BATTLE ARENA */}
        <div
          onClick={() => {
            sound.playUiClick();
            setShowModesModal(true);
          }}
          className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-950/70 via-navy to-obsidian border-2 border-amber-500/40 hover:border-amber-400 cursor-pointer shadow-xl hover:shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div>
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-obsidian shadow-lg group-hover:rotate-6 transition-transform">
                <Sword className="w-8 h-8" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  4 CHẾ ĐỘ THI ĐẤU
                </span>
              </div>
            </div>

            <h3 className="font-serif font-black text-2xl text-ivory mt-5 group-hover:text-amber-300 transition-colors tracking-wide">
              ĐẤU BÀI (BATTLE ARENA)
            </h3>
            <p className="text-xs sm:text-sm text-ivory-muted mt-2 leading-relaxed">
              Tranh tài chiến thuật theo chuẩn Master Rules 8000 LP: Đấu Thường Bot, Đấu Hạng Bot (Bot 60 Thẻ Max Catalog), Đấu Hạng PvP và Phòng Riêng Bạn Bè.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between">
            <div className="text-xs font-mono text-amber-300">
              Bộ bài chọn: <span className="font-bold text-ivory truncate max-w-[150px] inline-block align-bottom">{activeDeckName}</span> ({activeDeckCount} lá • Sẵn sàng)
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-obsidian font-black text-xs font-mono tracking-wide shadow-md group-hover:shadow-amber-500/40 transition-all">
              <span>VÀO CHỌN CHẾ ĐỘ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2.2 — ERGONOMIC BOTTOM DOCK & SUPPORT TOOLS
          ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* 1. Bộ Sưu Tập & Xây Dựng Deck (Unified Workspace) */}
        <div
          onClick={() => {
            sound.playUiClick();
            onSelectSection('DECK');
          }}
          className="p-4 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-cyan-400/60 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                {ownedCount} LÁ
              </span>
            </div>
            <h4 className="font-serif font-black text-sm text-ivory mt-3 group-hover:text-cyan-300 transition-colors">
              Kho Bài Sở Hữu (Collection) & Xây Dựng Bộ Bài (Deck Builder)
            </h4>
            <p className="text-[11px] text-ivory-muted mt-1 leading-relaxed">
              Không gian hợp nhất: duyệt Thư Viện Thẻ Bài (Card Library), kho bài sở hữu và quản lý 9 ô bộ bài.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[11px] text-cyan-400 font-bold">
            <span>Mở Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 2. Cửa Hàng & Chế Tạo Thẻ */}
        <div
          onClick={() => {
            sound.playUiClick();
            onSelectSection('SHOP');
          }}
          className="p-4 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-fuchsia-400/60 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 group-hover:bg-fuchsia-500/30 transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-bold">
                CỬA HÀNG
              </span>
            </div>
            <h4 className="font-serif font-black text-sm text-ivory mt-3 group-hover:text-fuchsia-300 transition-colors">
              Shop Thẻ Bài & Chế Tạo
            </h4>
            <p className="text-[11px] text-ivory-muted mt-1 leading-relaxed">
              Mở gói thẻ theo Lớp, Hộp, Chương & chế tạo thẻ trực tiếp bằng Elemental Shards.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[11px] text-fuchsia-400 font-bold">
            <span>Vào Shop Thẻ Bài</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 3. Trung Tâm Lịch Sử */}
        <div
          onClick={() => {
            sound.playUiClick();
            setShowHistoryModal(true);
          }}
          className="p-4 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-amber-400/60 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30 transition-colors">
                <History className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                ARCHIVES
              </span>
            </div>
            <h4 className="font-serif font-black text-sm text-ivory mt-3 group-hover:text-amber-300 transition-colors">
              Hạng & Lịch Sử Đấu
            </h4>
            <p className="text-[11px] text-ivory-muted mt-1 leading-relaxed">
              Nhật ký trận đấu, biến động MMR, phản ứng hóa học đã tạo và sổ cái giao dịch.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[11px] text-amber-400 font-bold">
            <span>Xem Lịch Sử</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 4. Nhiệm Vụ & Xếp Hạng */}
        <div
          onClick={() => {
            sound.playUiClick();
            onSelectSection('RANKED');
          }}
          className="p-4 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-emerald-400/60 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                BẢNG HẠNG
              </span>
            </div>
            <h4 className="font-serif font-black text-sm text-ivory mt-3 group-hover:text-emerald-300 transition-colors">
              Nhiệm Vụ & Phúc Lợi
            </h4>
            <p className="text-[11px] text-ivory-muted mt-1 leading-relaxed">
              Thang bậc xếp hạng TCG (Bronze → Thần Tượng), nhận Token và Shards theo mùa giải.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[11px] text-emerald-400 font-bold">
            <span>Xem Bảng Hạng</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          TCG MODE SELECTOR MODAL (4 MODES)
          ========================================================================= */}
      {showModesModal && (
        <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-navy border-2 border-amber-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-navy-light/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <Sword className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-xl text-ivory tracking-wide">
                    CHƠI / CHỌN CHẾ ĐỘ ĐẤU BÀI
                  </h3>
                  <p className="text-xs text-ivory-muted mt-0.5">
                    Chuẩn thi đấu Master Rules 8000 LP • Bộ bài: <span className="text-amber-300 font-bold">{activeDeckName}</span> ({activeDeckCount} lá)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModesModal(false)}
                className="p-2 rounded-xl bg-obsidian/60 hover:bg-navy-light text-ivory-muted hover:text-ivory border border-navy-light transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 6 Real Game Modes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* MODE 1: CHIẾN DỊCH (CAMPAIGN) */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-rose-950/40 via-navy to-obsidian border border-rose-500/40 hover:border-rose-400 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-300 font-serif font-black text-base">
                    <Compass className="w-5 h-5 text-rose-400" />
                    <span>1. Chiến Dịch (Campaign)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                    PVE BOSS
                  </span>
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Chinh phục các ải boss thử thách môi trường: Mưa Axit, Núi Lửa Nhiệt Nhôm, Hầm Băng Cryo.
                </p>
                <button
                  onClick={() => {
                    setShowModesModal(false);
                    onLaunchCampaign();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-ivory font-black text-xs font-mono shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>VÀO CHIẾN DỊCH (CAMPAIGN)</span>
                </button>
              </div>

              {/* MODE 2: ĐẤU BOT THƯỜNG (BOT BATTLE) */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-navy to-obsidian border border-cyan-500/40 hover:border-cyan-400 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300 font-serif font-black text-base">
                    <Bot className="w-5 h-5 text-cyan-400" />
                    <span>2. Đấu Bot Thường (Bot Battle)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                    LUYỆN TẬP
                  </span>
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Đấu tập với AI thử nghiệm chiến thuật, combo phản ứng và kiểm tra tỷ lệ rút bài trong môi trường an toàn không trừ điểm.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowModesModal(false);
                      onLaunchCasualBot('NOVICE');
                    }}
                    className="py-1.5 rounded-lg bg-navy-light/80 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold transition-all"
                  >
                    Tân Thủ (Novice)
                  </button>
                  <button
                    onClick={() => {
                      setShowModesModal(false);
                      onLaunchCasualBot('ADEPT');
                    }}
                    className="py-1.5 rounded-lg bg-navy-light/80 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold transition-all"
                  >
                    Thành Thạo (Adept)
                  </button>
                  <button
                    onClick={() => {
                      setShowModesModal(false);
                      onLaunchCasualBot('EXPERT');
                    }}
                    className="py-1.5 rounded-lg bg-navy-light/80 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold transition-all"
                  >
                    Chuyên Gia (Expert)
                  </button>
                  <button
                    onClick={() => {
                      setShowModesModal(false);
                      onLaunchCasualBot('MENDELEEV');
                    }}
                    className="py-1.5 rounded-lg bg-navy-light/80 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold transition-all"
                  >
                    Mendeleev (Boss)
                  </button>
                </div>
              </div>

              {/* MODE 3: ĐẤU HẠNG BOT (60 THẺ MAX CATALOG) */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/40 via-navy to-obsidian border-2 border-amber-500/50 hover:border-amber-400 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-300 font-serif font-black text-base">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span>3. Đấu Hạng Bot (Ranked vs AI)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    60 THẺ TỐI ĐA
                  </span>
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Thi đấu tính điểm MMR chính thức với AI trang bị bộ bài 60 thẻ tối đa từ toàn bộ kho dữ liệu. Thắng nhận +25 MMR, thua -15 MMR.
                </p>
                <button
                  onClick={() => {
                    setShowModesModal(false);
                    onLaunchRankedAi();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-obsidian font-black text-xs font-mono shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>VÀO ĐẤU HẠNG BOT ({tcgBotRank.mmr} MMR)</span>
                </button>
              </div>

              {/* MODE 4: ĐẤU HẠNG NGƯỜI CHƠI (PvP) */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-navy to-obsidian border border-fuchsia-500/40 hover:border-fuchsia-400 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-fuchsia-300 font-serif font-black text-base">
                    <Users className="w-5 h-5 text-fuchsia-400" />
                    <span>4. Đấu Hạng Người Chơi (Ranked PvP)</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 font-bold">
                    XẾP HẠNG MẠNG
                  </span>
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Tìm đối thủ trực tuyến qua hệ thống xếp trận tự động. Cạnh tranh leo bậc trên Bảng Vinh Danh toàn quốc.
                </p>
                <button
                  onClick={() => {
                    setShowModesModal(false);
                    onOpenMultiplayerLobby();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-700 text-ivory font-black text-xs font-mono shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>TÌM TRẬN XẾP HẠNG TRỰC TUYẾN</span>
                </button>
              </div>

              {/* MODE 5 & 6: TẠO PHÒNG RIÊNG & GIA NHẬP PHÒNG */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-navy to-obsidian border border-emerald-500/40 hover:border-emerald-400 shadow-md space-y-3 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-300 font-serif font-black text-base">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span>Phòng Đấu Bạn Bè 1v1</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                    PHÒNG RIÊNG
                  </span>
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed">
                  Tạo phòng riêng hoặc nhập mã 6 ký tự để so tài giao hữu cùng bạn bè và học sinh cùng lớp.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <button
                      onClick={() => {
                        setShowModesModal(false);
                        onOpenMultiplayerLobby();
                      }}
                      className="w-full py-2.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5"
                      title="5. Tạo Phòng Riêng (Create Room)"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>5. Tạo Phòng Riêng (Create Room)</span>
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={joinRoomCode}
                        onChange={(e) => setJoinRoomCode(e.target.value.toUpperCase())}
                        placeholder="MÃ PHÒNG (VD: ELEM01)"
                        className="flex-1 px-3 py-2 rounded-lg bg-obsidian border border-navy-light text-xs font-mono text-ivory text-center uppercase focus:border-emerald-400 focus:outline-none"
                      />
                      <button
                        onClick={handleJoinRoom}
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-obsidian font-black text-xs font-mono hover:bg-emerald-500 transition-all flex items-center gap-1"
                        title="6. Gia Nhập Phòng (Join Room)"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>6. Gia Nhập Phòng (Join Room)</span>
                      </button>
                    </div>
                    {roomError && <p className="text-[10px] text-rose-400 font-mono text-center mt-1">{roomError}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Center Modal */}
      {showHistoryModal && (
        <TcgHistoryModal
          profile={profile}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
};
