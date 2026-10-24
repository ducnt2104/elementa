// src/components/moba/MobaMainMenu.tsx
// Dedicated MOBA Main Menu & Mode Selector for ELEMENTA: Multiplayer Online Battle Arena Pillar
// Features 8 Essential Navigation Sections & 3 MOBA Combat Modes

import React, { useState } from 'react';
import { PlayerProfile } from '../../domain/types';
import { HEROES_CATALOG } from '../../game/data/heroesData';
import { sound } from '../../audio/soundEngine';
import {
  Flame,
  ShoppingBag,
  Users,
  BookOpen,
  Trophy,
  Award,
  Settings,
  Home,
  Play,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Lock,
  Bot,
  Swords,
  Info
} from 'lucide-react';

export type MobaActiveSection =
  | 'MODES'
  | 'HERO_SHOP'
  | 'ROSTER'
  | 'SKILLS'
  | 'RANKED'
  | 'QUESTS'
  | 'SETTINGS'
  | 'HOME';

interface MobaMainMenuProps {
  profile: PlayerProfile;
  onSelectSection: (section: MobaActiveSection) => void;
  onLaunchCasualBot: (heroId?: string) => void;
  onLaunchRankedAi: (heroId?: string) => void;
  onLaunchPvpQueue: () => void;
  onOpenHeroShop: () => void;
  onReturnHome: () => void;
  onOpenSettings: () => void;
}

export const MobaMainMenu: React.FC<MobaMainMenuProps> = ({
  profile,
  onSelectSection,
  onLaunchCasualBot,
  onLaunchRankedAi,
  onLaunchPvpQueue,
  onOpenHeroShop,
  onReturnHome,
  onOpenSettings
}) => {
  const [showModesModal, setShowModesModal] = useState<boolean>(false);
  const [activeRosterFilter, setActiveRosterFilter] = useState<'ALL' | 'OWNED' | 'LOCKED'>('ALL');

  const unlockedHeroes = profile.unlockedHeroes || ['hero_na_brawler', 'hero_fe_warden', 'hero_h_scout'];
  const totalHeroes = HEROES_CATALOG.length;
  const mobaBotRank = profile.mobaBotRank || { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
  const mobaPvpRank = profile.mobaPvpRank || { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };

  return (
    <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Top Banner & Profile Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-navy to-obsidian border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-obsidian/80 hover:bg-navy-light/80 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all hover:scale-105"
            title="Quay về Home Hub"
          >
            <Home className="w-4 h-4" />
            <span>Về Home Hub</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-xl sm:text-2xl text-cyan-400 tracking-wider">
                ELEMENTA MOBA
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                ĐẤU TRƯỜNG 60 FPS
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5">
              Thung Lũng Liên Kết • 12 Tướng Nguyên Tố IUPAC • Phản ứng hóa học thời gian thực
            </p>
          </div>
        </div>

        {/* Quick Stats Capsule */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-obsidian/70 border border-cyan-500/30 flex items-center gap-2">
            <span className="text-cyan-400">Tokens:</span>
            <span className="text-ivory font-bold">{profile.knowledgeTokens.toLocaleString()}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-obsidian/70 border border-cyan-500/30 flex items-center gap-2">
            <span className="text-emerald-400">Tướng:</span>
            <span className="text-ivory font-bold">{unlockedHeroes.length}/{totalHeroes} Đã Mở Khóa</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-obsidian/70 border border-cyan-500/30 flex items-center gap-2">
            <span className="text-amber-400">MOBA Bot Rank:</span>
            <span className="text-ivory font-bold">{mobaBotRank.tier} {mobaBotRank.division} ({mobaBotRank.mmr} MMR)</span>
          </div>
        </div>
      </div>

      {/* Primary Big Call-to-Action: ENTER ARENA */}
      <div
        onClick={() => {
          sound.playUiClick();
          setShowModesModal(true);
        }}
        className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-cyan-600/30 via-navy to-obsidian border-2 border-cyan-500/60 hover:border-cyan-400 cursor-pointer shadow-xl hover:shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-700 flex items-center justify-center text-obsidian shadow-lg group-hover:rotate-6 transition-transform">
            <Play className="w-9 h-9 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-black text-2xl text-ivory group-hover:text-cyan-300 transition-colors">
                CHƠI / CHỌN CHẾ ĐỘ ĐẤU TRƯỜNG MOBA
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                3 CHẾ ĐỘ
              </span>
            </div>
            <p className="text-sm text-ivory-muted mt-1 leading-relaxed">
              Chiến đấu thời gian thực trên bản đồ Thung Lũng Liên Kết: Đấu Thường Bot, Đấu Hạng Bot & Hạng Người Chơi.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-obsidian font-black text-sm tracking-wide shadow-lg group-hover:shadow-cyan-500/40 transition-all">
          <span>VÀO ĐẤU TRƯỜNG</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 8 Core Navigation Cards Grid (Mandatory Sections) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 2. Shop Nguyên Tố (Hero Shop) */}
        <div
          onClick={() => {
            sound.playUiClick();
            onOpenHeroShop();
          }}
          className="p-5 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-cyan-400/50 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                MỞ KHÓA TƯỚNG
              </span>
            </div>
            <h3 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-cyan-300 transition-colors">
              Shop Nguyên Tố
            </h3>
            <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
              Mở khóa các Tướng Nguyên Tố mới (500 Tokens/tướng). Tách biệt hoàn toàn khỏi kho thẻ TCG.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-cyan-400 font-bold">
            <span>Mở Cửa Hàng Tướng</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 3. Nguyên Tố Của Tôi (Roster) */}
        <div
          onClick={() => {
            sound.playUiClick();
            onSelectSection('ROSTER');
          }}
          className="p-5 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-emerald-500/50 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                {unlockedHeroes.length}/{totalHeroes} SỞ HỮU
              </span>
            </div>
            <h3 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-emerald-300 transition-colors">
              Nguyên Tố Của Tôi
            </h3>
            <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
              Quản lý danh sách các tướng đã mở khóa, độ thông thạo, bảng ngọc bổ trợ và vai trò chiến đấu.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-emerald-400 font-bold">
            <span>Xem Đội Hình Tướng</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 4. Thông Tin Kỹ Năng & Lore */}
        <div
          onClick={() => {
            sound.playUiClick();
            onSelectSection('SKILLS');
          }}
          className="p-5 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-purple-500/50 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                COMBO & PHẢN ỨNG
              </span>
            </div>
            <h3 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-purple-300 transition-colors">
              Kỹ Năng & Thông Tin
            </h3>
            <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
              Chi tiết bộ chiêu thức Passive, Q, W, E, R, hướng dẫn combo giao tranh và cơ sở hóa học IUPAC.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-purple-400 font-bold">
            <span>Tra Cứu Kỹ Năng</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 5. Hạng & Lịch Sử Đấu */}
        <div
          onClick={() => {
            sound.playUiClick();
            onSelectSection('RANKED');
          }}
          className="p-5 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-amber-500/50 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30 transition-colors">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                RANK MOBA
              </span>
            </div>
            <h3 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-amber-300 transition-colors">
              Hạng & Lịch Sử Đấu
            </h3>
            <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
              Theo dõi bậc xếp hạng MOBA Bot và MOBA PvP riêng biệt. Tỉ lệ thắng, KDA và chuỗi thăng hạng.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-amber-400 font-bold">
            <span>Xem Xếp Hạng MOBA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 6. Nhiệm Vụ & Tiến Trình */}
        <div
          onClick={() => {
            sound.playUiClick();
            onSelectSection('QUESTS');
          }}
          className="p-5 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-rose-500/50 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400 group-hover:bg-rose-500/30 transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                PHÚC LỢI CHIẾN ĐẤU
              </span>
            </div>
            <h3 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-rose-300 transition-colors">
              Nhiệm Vụ & Tiến Trình
            </h3>
            <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
              Nhiệm vụ hạ gục đối thủ, phá hủy trụ hóa học và kích nổ chuỗi phản ứng trên đấu trường nhận Token.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-rose-400 font-bold">
            <span>Xem Nhiệm Vụ MOBA</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 7. Cài Đặt Điều Khiển */}
        <div
          onClick={() => {
            sound.playUiClick();
            onOpenSettings();
          }}
          className="p-5 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-slate-400/50 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-slate-500/20 text-slate-300 group-hover:bg-slate-500/30 transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-500/20 text-slate-300 font-bold">
                JOYSTICK & CHUỘT
              </span>
            </div>
            <h3 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-slate-200 transition-colors">
              Cài Đặt Điều Khiển
            </h3>
            <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
              Chỉnh độ nhạy cần ảo Virtual Joystick, chế độ Quick-Cast tung chiêu nhanh và đồ họa 60 FPS.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-slate-400 font-bold">
            <span>Mở Bảng Điều Khiển</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 8. Quay Về Home Hub */}
        <div
          onClick={() => {
            sound.playUiClick();
            onReturnHome();
          }}
          className="p-5 rounded-xl bg-navy/80 hover:bg-navy border border-navy-light/60 hover:border-cyan-400/50 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                SẢNH CHÍNH
              </span>
            </div>
            <h3 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-cyan-300 transition-colors">
              Quay Về Home Hub
            </h3>
            <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
              Trở về trung tâm sảnh chính ELEMENTA để chuyển sang Đấu Bài Chiến Thuật TCG hoặc tra cứu học tập.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-cyan-400 font-bold">
            <span>Về Home</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBA MODE SELECTOR MODAL (3 MODES)
          ========================================================================= */}
      {showModesModal && (
        <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-navy border-2 border-cyan-500/50 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-navy-light/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-xl text-ivory">CHỌN CHẾ ĐỘ ĐẤU TRƯỜNG MOBA</h3>
                  <p className="text-xs text-ivory-muted">Chiến đấu thời gian thực 60 FPS trên bản đồ Thung Lũng Liên Kết</p>
                </div>
              </div>
              <button
                onClick={() => setShowModesModal(false)}
                className="px-3 py-1.5 rounded-lg bg-navy-light/60 hover:bg-navy-light text-ivory-muted hover:text-ivory text-xs font-bold transition-all"
              >
                Đóng
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mode 1: Casual vs AI */}
              <div
                onClick={() => {
                  sound.playUiClick();
                  setShowModesModal(false);
                  onLaunchCasualBot();
                }}
                className="p-5 rounded-xl bg-obsidian/70 hover:bg-obsidian border border-cyan-500/40 hover:border-cyan-400 cursor-pointer shadow-md hover:scale-[1.02] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 w-fit">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-cyan-300 transition-colors">
                    1. Chơi Bot (Casual vs AI)
                  </h4>
                  <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                    Luyện tập kỹ năng, thử nghiệm tướng mới và cảm nhận nhịp độ 60 FPS không ảnh hưởng thứ hạng.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-cyan-400 font-bold">
                  <span>Vào Luyện Tập</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Mode 2: Ranked vs AI */}
              <div
                onClick={() => {
                  sound.playUiClick();
                  setShowModesModal(false);
                  onLaunchRankedAi();
                }}
                className="p-5 rounded-xl bg-gradient-to-br from-amber-950/60 to-obsidian border-2 border-amber-500 hover:border-amber-300 cursor-pointer shadow-lg hover:scale-[1.02] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400 w-fit">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-amber-300 transition-colors">
                    2. Đấu Hạng Bot (Ranked vs AI)
                  </h4>
                  <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                    Thi đấu leo hạng với đối thủ bot thông minh tăng tiến theo bậc rank. Tích lũy MMR MOBA.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-400 font-bold">
                  <span>Leo Hạng Bot</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Mode 3: Ranked PvP */}
              <div
                onClick={() => {
                  sound.playUiClick();
                  setShowModesModal(false);
                  onLaunchPvpQueue();
                }}
                className="p-5 rounded-xl bg-obsidian/70 hover:bg-obsidian border border-emerald-500/40 hover:border-emerald-400 cursor-pointer shadow-md hover:scale-[1.02] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 w-fit">
                    <Swords className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-black text-base text-ivory mt-3 group-hover:text-emerald-300 transition-colors">
                    3. Đấu Hạng Người Chơi (PvP)
                  </h4>
                  <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                    Hàng đợi ghép trận trực tuyến đối đầu người chơi thật trên đấu trường thời gian thực.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span>Tìm Trận PvP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
