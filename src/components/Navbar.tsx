// src/components/Navbar.tsx
// Streamlined Navigation Architecture for ELEMENTA
// Topbar Gateways: Sảnh Chính, Đấu Bài TCG, Đấu Trường MOBA, Bảng Tuần Hoàn, Xưởng AI

import React from 'react';
import { PlayerProfile } from '../domain/types';
import { sound } from '../audio/soundEngine';
import {
  Sparkles,
  BookOpen,
  Sword,
  Palette,
  Volume2,
  VolumeX,
  HelpCircle,
  Flame,
  Coins,
  Shield,
  Home,
  Cloud
} from 'lucide-react';
import { UnifiedResourceTab } from './resources/UnifiedResourcesModal';

export type ActiveTab =
  | 'MENU'
  | 'DUEL'
  | 'BATTLE'
  | 'CAMPAIGN'
  | 'COLLECTION'
  | 'DECK'
  | 'SHOP'
  | 'CODEX'
  | 'WORKSHOP'
  | 'TUTORIAL'
  | 'TEACHER'
  | 'TCG_MENU'
  | 'MOBA_MENU'
  | 'LIBRARY'
  | 'ROSTER'
  | 'SKILLS'
  | 'RANKED'
  | 'QUESTS';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  systemMode?: 'HOME' | 'TCG' | 'MOBA';
  onNavigateHome?: () => void;
  onEnterTcg?: () => void;
  onEnterMoba?: () => void;
  profile: PlayerProfile;
  isMuted: boolean;
  toggleMute: () => void;
  openTutorial: () => void;
  openCompendium: () => void;
  openCalculator: () => void;
  openBondingLab: () => void;
  openUnifiedResources?: (tab?: UnifiedResourceTab) => void;
  openMultiplayerLobby?: () => void;
  openJudgeDemo?: () => void;
  openAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  systemMode = 'HOME',
  onNavigateHome,
  onEnterTcg,
  onEnterMoba,
  profile,
  isMuted,
  toggleMute,
  openTutorial,
  openUnifiedResources,
  openAuthModal
}) => {
  const isTcgActive =
    activeTab === 'TCG_MENU' ||
    activeTab === 'DUEL' ||
    activeTab === 'CAMPAIGN' ||
    activeTab === 'COLLECTION' ||
    activeTab === 'DECK' ||
    activeTab === 'SHOP' ||
    (systemMode === 'TCG' && activeTab !== 'MENU');

  const isMobaActive =
    activeTab === 'MOBA_MENU' ||
    activeTab === 'BATTLE' ||
    activeTab === 'ROSTER' ||
    activeTab === 'SKILLS' ||
    (systemMode === 'MOBA' && activeTab !== 'MENU');

  const handleBrandClick = () => {
    sound.playUiClick();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      setActiveTab('MENU');
    }
  };

  const handleTcgClick = () => {
    sound.playUiClick();
    if (onEnterTcg) {
      onEnterTcg();
    } else {
      setActiveTab('TCG_MENU');
    }
  };

  const handleMobaClick = () => {
    sound.playUiClick();
    if (onEnterMoba) {
      onEnterMoba();
    } else {
      setActiveTab('MOBA_MENU');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-obsidian/95 backdrop-blur-md border-b border-navy-light/60 shadow-xl select-none" role="banner">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleBrandClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBrandClick();
            }
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0 focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none rounded-xl p-0.5"
          title="Về Trang Chủ Sảnh Chính"
          aria-label="Về trang chủ Sảnh chính ELEMENTA"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-ion via-navy to-coral-reaction p-0.5 shadow-md shadow-cyan-ion/20 group-hover:shadow-cyan-ion/50 transition-all">
            <div className="w-full h-full bg-obsidian rounded-[10px] flex items-center justify-center">
              <span className="font-serif font-black text-ivory text-lg tracking-wider">E</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-black tracking-widest text-ivory text-sm sm:text-base">ELEMENTA</span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-ion/20 text-cyan-ion border border-cyan-ion/40 font-bold hidden sm:inline">
                GDPT 2018
              </span>
            </div>
            <p className="text-[10px] text-ivory-muted tracking-tight font-sans">Trận Chiến Nguyên Tố</p>
          </div>
        </div>

        {/* Primary High-Level Navigation: 3 Gateways + 2 Global Learning Tools */}
        <nav aria-label="Điều hướng chính" className="hidden md:flex items-center gap-1.5 bg-navy/90 p-1 rounded-xl border border-navy-light/60 shadow-inner">
          {/* 1. Sảnh Chính */}
          <button
            onClick={handleBrandClick}
            aria-current={activeTab === 'MENU' ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none ${
              activeTab === 'MENU'
                ? 'bg-cyan-ion text-obsidian shadow-sm shadow-cyan-ion/40'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy-light/60'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Sảnh Chính</span>
          </button>

          {/* 2. Đấu Bài TCG */}
          <button
            onClick={handleTcgClick}
            aria-current={isTcgActive ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
              isTcgActive
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-obsidian shadow-md shadow-amber-500/30'
                : 'text-ivory-muted hover:text-amber-300 hover:bg-navy-light/60'
            }`}
          >
            <Sword className="w-4 h-4 text-amber-400" />
            <span>Đấu Bài TCG</span>
          </button>

          {/* 3. Đấu Trường MOBA */}
          <button
            onClick={handleMobaClick}
            aria-current={isMobaActive ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none ${
              isMobaActive
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-obsidian shadow-md shadow-cyan-500/30'
                : 'text-ivory-muted hover:text-cyan-300 hover:bg-navy-light/60'
            }`}
          >
            <Flame className="w-4 h-4 text-cyan-400" />
            <span>Đấu Trường MOBA</span>
          </button>

          <span className="w-px h-5 bg-navy-light/60 mx-1" aria-hidden="true" />

          {/* 4. Bảng Tuần Hoàn */}
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('CODEX');
            }}
            aria-current={activeTab === 'CODEX' ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:outline-none ${
              activeTab === 'CODEX'
                ? 'bg-navy-light text-yellow-300 font-bold border border-yellow-400/40'
                : 'text-ivory-muted hover:text-yellow-300 hover:bg-navy-light/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span>Bảng Tuần Hoàn</span>
          </button>

          {/* 5. Xưởng AI */}
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('WORKSHOP');
            }}
            aria-current={activeTab === 'WORKSHOP' ? 'page' : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:outline-none ${
              activeTab === 'WORKSHOP'
                ? 'bg-navy-light text-teal-300 font-bold border border-teal-400/40'
                : 'text-ivory-muted hover:text-teal-300 hover:bg-navy-light/60'
            }`}
          >
            <Palette className="w-4 h-4 text-teal-400" />
            <span>Xưởng AI</span>
          </button>
        </nav>

        {/* Right Action Widgets */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Unified Resources Modal Trigger Button (Cẩm Nang & Tài Nguyên) */}
          {openUnifiedResources && (
            <button
              data-tour="compendium-btn"
              onClick={() => {
                sound.playUiClick();
                openUnifiedResources();
              }}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy/90 hover:bg-navy-light text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all shadow-sm hover:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none"
              title="Cẩm Nang & Tài Nguyên Hóa Học Chuẩn GDPT 2018"
              aria-label="Cẩm Nang & Tài Nguyên Hóa Học Chuẩn GDPT 2018"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Cẩm Nang & Tài Nguyên</span>
            </button>
          )}

          {/* Tokens & Shards Quick Capsule */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-navy/90 border border-navy-light text-xs font-mono" aria-label={`Tài sản: ${profile.knowledgeTokens} Tokens, ${profile.elementalShards || 0} Shards`}>
            <span className="text-amber-400 font-bold">{profile.knowledgeTokens.toLocaleString()} T</span>
            <span className="text-navy-light" aria-hidden="true">|</span>
            <span className="text-cyan-300 font-bold">{(profile.elementalShards || 0).toLocaleString()} S</span>
          </div>

          {/* Level & XP Capsule */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-navy/90 border border-copper/40 text-xs shadow-inner" aria-label={`Cấp độ: Level ${profile.level}, kinh nghiệm ${profile.xp % 100}%`}>
            <span className="font-serif font-black text-copper text-xs">Lv.{profile.level}</span>
            <div className="w-14 h-1.5 bg-obsidian rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-copper to-cyan-ion transition-all duration-300"
                style={{ width: `${Math.min(100, profile.xp % 100)}%` }}
              />
            </div>
          </div>

          {/* Cloud Auth & Sync Portal Button */}
          {openAuthModal && (
            <button
              onClick={() => {
                sound.playUiClick();
                openAuthModal();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-navy hover:bg-navy-light text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none"
              title="Đăng nhập & Đồng bộ Cloud Firestore"
              aria-label="Cổng tài khoản và đồng bộ Cloud"
            >
              <Cloud className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">Cloud</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            </button>
          )}

          {/* Spotlight Tour Guided Help Button */}
          <button
            onClick={() => {
              sound.playUiClick();
              openTutorial();
            }}
            className="p-2 rounded-xl bg-navy hover:bg-navy-light text-ivory-muted hover:text-cyan-ion border border-navy-light/60 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none"
            title="Mở Spotlight Tour Hướng Dẫn"
            aria-label="Mở Spotlight Tour hướng dẫn người chơi"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-xl bg-navy hover:bg-navy-light text-ivory-muted hover:text-ivory border border-navy-light/60 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-ion focus-visible:outline-none"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            aria-label={isMuted ? 'Bật âm thanh trò chơi' : 'Tắt âm thanh trò chơi'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-coral-reaction" /> : <Volume2 className="w-4 h-4 text-cyan-ion" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Strip for Small Screens (<768px) */}
      <nav aria-label="Điều hướng di động" className="md:hidden flex items-center justify-around gap-1 px-2 py-1.5 border-t border-navy-light/40 bg-navy/80 text-[10px] font-mono">
        <button
          onClick={handleBrandClick}
          aria-current={activeTab === 'MENU' ? 'page' : undefined}
          aria-label="Về Sảnh chính"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded focus-visible:ring-1 focus-visible:ring-cyan-ion focus-visible:outline-none ${
            activeTab === 'MENU' ? 'text-cyan-ion font-bold' : 'text-ivory-muted'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Sảnh</span>
        </button>
        <button
          onClick={handleTcgClick}
          aria-current={isTcgActive ? 'page' : undefined}
          aria-label="Đấu Bài TCG"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded focus-visible:ring-1 focus-visible:ring-amber-400 focus-visible:outline-none ${
            isTcgActive ? 'text-amber-400 font-bold' : 'text-ivory-muted'
          }`}
        >
          <Sword className="w-4 h-4" />
          <span>TCG</span>
        </button>
        <button
          onClick={handleMobaClick}
          aria-current={isMobaActive ? 'page' : undefined}
          aria-label="Đấu Trường MOBA"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded focus-visible:ring-1 focus-visible:ring-cyan-ion focus-visible:outline-none ${
            isMobaActive ? 'text-cyan-400 font-bold' : 'text-ivory-muted'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>MOBA</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('CODEX');
          }}
          aria-current={activeTab === 'CODEX' ? 'page' : undefined}
          aria-label="Bảng Tuần Hoàn Hóa Học"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded focus-visible:ring-1 focus-visible:ring-yellow-400 focus-visible:outline-none ${
            activeTab === 'CODEX' ? 'text-yellow-400 font-bold' : 'text-ivory-muted'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bảng TH</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveTab('WORKSHOP');
          }}
          aria-current={activeTab === 'WORKSHOP' ? 'page' : undefined}
          aria-label="Xưởng Sáng Tạo Kỹ Năng AI"
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded focus-visible:ring-1 focus-visible:ring-teal-400 focus-visible:outline-none ${
            activeTab === 'WORKSHOP' ? 'text-teal-400 font-bold' : 'text-ivory-muted'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Xưởng AI</span>
        </button>
      </nav>
    </header>
  );
};
