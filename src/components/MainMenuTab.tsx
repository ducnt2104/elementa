// src/components/MainMenuTab.tsx
// Redesigned Homepage with 4 Clear Functional Zones, Direct CTAs, Dynamic Card Counts & Online Platform Vision

import React, { useState, useEffect } from 'react';
import { PlayerProfile } from '../domain/types';
import { ActiveTab } from './Navbar';
import { sound } from '../audio/soundEngine';
import {
  Sword,
  BookOpen,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Cpu,
  FlaskConical,
  Compass,
  ShoppingBag,
  Flame,
  Globe2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  GraduationCap
} from 'lucide-react';
import { RankedDashboardSection } from './ranked/RankedDashboardSection';
import { PLAYABLE_CARDS } from '../data/playableCardsData';

interface MainMenuTabProps {
  profile: PlayerProfile;
  setActiveTab: (tab: ActiveTab) => void;
  onEnterTcg?: () => void;
  onEnterMoba?: () => void;
  onUpdateProfile?: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
  onOpenCompendium?: () => void;
  onOpenMultiplayerLobby?: () => void;
  onOpenJudgeDemo?: () => void;
}

export const MainMenuTab: React.FC<MainMenuTabProps> = ({
  profile,
  setActiveTab,
  onEnterTcg,
  onEnterMoba,
  onUpdateProfile,
  onOpenCompendium,
  onOpenMultiplayerLobby,
  onOpenJudgeDemo
}) => {
  const totalCardsCount = PLAYABLE_CARDS.length.toLocaleString('vi-VN');
  const ownedCount = Object.values(profile.cardCollection || {}).reduce((s, c) => s + (Number(c) || 0), 0);
  const unlockedHeroes = profile.unlockedHeroes || ['hero_na_brawler', 'hero_fe_warden', 'hero_h_scout'];
  const tcgBotRank = profile.tcgBotRank || { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };
  const mobaBotRank = profile.mobaBotRank || { tier: 'BRONZE', division: 4, mmr: 100, wins: 0, losses: 0 };

  // Real-time Golden Hour Detection (14:00-16:00 & 19:00-21:00 ICT)
  const [isGoldenHour, setIsGoldenHour] = useState<boolean>(() => {
    const currentHour = new Date().getHours();
    return (currentHour >= 14 && currentHour < 16) || (currentHour >= 19 && currentHour < 21);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const currentHour = new Date().getHours();
      setIsGoldenHour((currentHour >= 14 && currentHour < 16) || (currentHour >= 19 && currentHour < 21));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = (tab: ActiveTab) => {
    sound.playUiClick();
    setActiveTab(tab);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12 select-none">
      {/* =========================================================================
          KHU VỰC 1 — HERO / PLAY CENTER (Cổng Vào Trận Đấu & Nhận Diện ELEMENTA)
          ========================================================================= */}
      <section
        data-tour="play-center"
        className="relative rounded-2xl overflow-hidden border border-navy-light/80 bg-gradient-to-br from-navy via-obsidian to-navy-dark p-6 sm:p-10 shadow-2xl"
      >
        {/* Subtle Crystallographic Lattice Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#57C8C8_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-ion/10 border border-cyan-ion/30 text-cyan-ion text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HỆ SINH THÁI CHIẾN THUẬT HÓA HỌC TCG & MOBA — CHUẨN GDPT 2018</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Đồng Bộ Trực Tuyến</span>
            </div>

            {isGoldenHour && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold animate-pulse">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>KHUNG GIỜ VÀNG (X2 XP & TOKEN)</span>
              </div>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-ivory tracking-wide leading-tight">
            ELEMENTA
            <span className="block text-xl sm:text-2xl text-copper font-sans font-semibold mt-1">
              Trận Chiến Nguyên Tố
            </span>
          </h1>

          <p className="text-sm sm:text-base text-ivory-muted leading-relaxed">
            Học tập và làm chủ hóa học thông qua chiến thuật đỉnh cao. Mỗi nguyên tố sở hữu chỉ số chuẩn hóa từ dữ liệu{' '}
            <strong className="text-cyan-ion font-mono">IUPAC</strong> (độ âm điện χ, năng lượng ion hóa I₁), và{' '}
            <strong className="text-copper">phương trình phản ứng kèm điều kiện môi trường thật</strong> chính là chuỗi Combo tối thượng trong kho dữ liệu hơn {totalCardsCount} lá bài!
          </p>

          {/* Two Distinct Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
            {/* PILLAR 1: ELEMENTA TCG */}
            <div
              data-tour="duel-cta"
              onClick={() => {
                sound.playUiClick();
                if (onEnterTcg) onEnterTcg();
                else handleAction('DUEL');
              }}
              className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/90 via-navy to-obsidian border-2 border-amber-500/60 hover:border-amber-400 cursor-pointer shadow-xl hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30 transition-colors">
                    <Sword className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    SẢNH THẺ BÀI (10 CHỨC NĂNG)
                  </span>
                </div>
                <h2 className="font-serif font-black text-xl text-ivory mt-4 group-hover:text-amber-300 transition-colors">
                  ELEMENTA TCG — ĐẤU TRƯỜNG THẺ BÀI
                </h2>
                <p className="text-xs text-ivory-muted mt-2 leading-relaxed">
                  Sưu tập thẻ, xây dựng bộ bài, chiến đấu theo lượt Yu-Gi-Oh! 8000 LP, trải nghiệm chiến dịch 5 ải Boss và chinh phục thứ hạng.
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-obsidian/70 text-cyan-300 border border-white/5">
                    Kho bài: {ownedCount} lá ({totalCardsCount} Catalog)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-obsidian/70 text-emerald-300 border border-white/5">
                    Bot Rank: {tcgBotRank.tier} {tcgBotRank.division}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-400 font-bold">
                <span>VÀO SẢNH TCG</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>

            {/* PILLAR 2: ELEMENTA MOBA */}
            <div
              onClick={() => {
                sound.playUiClick();
                if (onEnterMoba) onEnterMoba();
                else handleAction('BATTLE');
              }}
              className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/90 via-navy to-obsidian border-2 border-cyan-500/60 hover:border-cyan-400 cursor-pointer shadow-xl hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                    <Flame className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                    ĐẤU TRƯỜNG 60 FPS (8 CHỨC NĂNG)
                  </span>
                </div>
                <h2 className="font-serif font-black text-xl text-ivory mt-4 group-hover:text-cyan-300 transition-colors">
                  ELEMENTA MOBA — ĐẤU TRƯỜNG NGUYÊN TỐ
                </h2>
                <p className="text-xs text-ivory-muted mt-2 leading-relaxed">
                  Mở khóa nguyên tố, lựa chọn nhân vật, chiến đấu thời gian thực 60 FPS trên Thung Lũng Liên Kết, phối hợp kỹ năng và leo hạng.
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-obsidian/70 text-cyan-300 border border-white/5">
                    Đội hình: {unlockedHeroes.length}/12 Tướng mở khóa
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-obsidian/70 text-amber-300 border border-white/5">
                    MOBA Rank: {mobaBotRank.tier} {mobaBotRank.division}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-cyan-500/30 flex items-center justify-between text-xs text-cyan-400 font-bold">
                <span>VÀO ĐẤU TRƯỜNG MOBA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KHU VỰC 2 — NHIỆM VỤ & TIẾN TRÌNH HỌC TẬP (Quests & CA-SRS Spaced Repetition)
          ========================================================================= */}
      <section data-tour="quests-section" className="space-y-4">
        <div className="flex items-center justify-between border-b border-navy-light/60 pb-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h2 className="font-serif font-black text-lg text-ivory tracking-wide">
              NHIỆM VỤ & TIẾN TRÌNH HỌC TẬP
            </h2>
          </div>
          <span className="text-xs font-mono text-ivory-muted">
            10-15 Phút Ôn Tập Mỗi Ngày • Chuẩn GDPT 2018
          </span>
        </div>

        {/* Ranked Ladder & Curriculum Quests Dashboard */}
        <RankedDashboardSection
          onStartRankedDuel={() => handleAction('DUEL')}
          onRewardClaimed={(xp, shards) => {
            onUpdateProfile?.((prev) => ({
              ...prev,
              xp: prev.xp + xp,
              elementalShards: (prev.elementalShards || 0) + shards
            }));
          }}
        />
      </section>

      {/* =========================================================================
          KHU VỰC 3 — BỘ SƯU TẬP & XÂY DỰNG BỘ BÀI CHIẾN THUẬT (Decks & Catalog)
          ========================================================================= */}
      <section data-tour="collection-zone" className="space-y-4">
        <div className="flex items-center justify-between border-b border-navy-light/60 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-ion" />
            <h2 className="font-serif font-black text-lg text-ivory tracking-wide">
              KHO THẺ BÀI & XÂY DỰNG BỘ BÀI
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-ion font-bold">
            Tổng cộng: {totalCardsCount} lá bài hợp lệ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card Catalog Quick Access */}
          <div
            onClick={() => handleAction('COLLECTION')}
            className="p-5 rounded-xl border border-navy-light/60 bg-navy/60 hover:bg-navy p-5 cursor-pointer transition-all hover:border-cyan-ion/50 hover:shadow-xl hover:shadow-cyan-ion/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-cyan-ion/15 text-cyan-ion">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-ion/20 text-cyan-ion font-bold">
                  {totalCardsCount} THẺ
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-ivory mt-3">
                Tra Cứu Kho Thẻ Toàn Diện
              </h3>
              <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                Khám phá kho thẻ phân bổ khoa học: Quái thú nguyên tố, hợp chất, xúc tác, môi trường và bẫy phản ứng.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-cyan-300 font-semibold font-mono">
              <span>Mở Kho Thẻ</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Deck Builder Quick Access */}
          <div
            onClick={() => handleAction('DECK')}
            className="p-5 rounded-xl border border-navy-light/60 bg-navy/60 hover:bg-navy p-5 cursor-pointer transition-all hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  9 BỘ BÀI LƯU TRỮ
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-ivory mt-3">
                Xây Dựng Bộ Bài Chiến Thuật
              </h3>
              <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                Tự do cấu hình Main Deck (40-60 lá) và Extra Deck (15 lá) tối ưu hóa tỷ lệ kích hoạt chuỗi phản ứng combo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-emerald-300 font-semibold font-mono">
              <span>Chỉnh Sửa Bộ Bài</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Booster Shop Quick Access */}
          <div
            onClick={() => handleAction('SHOP')}
            className="p-5 rounded-xl border border-navy-light/60 bg-navy/60 hover:bg-navy p-5 cursor-pointer transition-all hover:border-fuchsia-500/50 hover:shadow-xl hover:shadow-fuchsia-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-fuchsia-500/15 text-fuchsia-400">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-bold">
                  TIẾP CẬN DỄ DÀNG
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-ivory mt-3">
                Cửa Hàng Gói Thẻ Tri Thức
              </h3>
              <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                Mở khóa các gói bài phân chia theo Khối Lớp (10, 11, 12) và Loại Hợp Chất hoàn toàn bằng điểm Knowledge Token.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-fuchsia-300 font-semibold font-mono">
              <span>Ghé Cửa Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KHU VỰC 4 — PHÒNG THÍ NGHIỆM TRI THỨC & CẨM NANG (Knowledge Lab & Lore)
          ========================================================================= */}
      <section data-tour="knowledge-lab" className="space-y-4">
        <div className="flex items-center justify-between border-b border-navy-light/60 pb-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-teal-400" />
            <h2 className="font-serif font-black text-lg text-ivory tracking-wide">
              PHÒNG THÍ NGHIỆM TRI THỨC & TÀI NGUYÊN
            </h2>
          </div>
          <span className="text-xs font-mono text-ivory-muted">
            Bảng Tuần Hoàn • Xưởng Sáng Tạo AI • Cẩm Nang Toàn Tập
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Periodic Codex */}
          <div
            onClick={() => handleAction('CODEX')}
            className="p-5 rounded-xl border border-navy-light/60 bg-navy/60 hover:bg-navy p-5 cursor-pointer transition-all hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-yellow-400/15 text-yellow-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 font-bold">
                  118 NGUYÊN TỐ
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-ivory mt-3">
                Bảng Tuần Hoàn Tương Tác
              </h3>
              <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                Tra cứu đầy đủ 118 nguyên tố theo phân lớp nhóm, chu kỳ, độ âm điện χ, năng lượng ion hóa I₁ và cấu hình orbital electron.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-yellow-300 font-semibold font-mono">
              <span>Mở Bảng Tuần Hoàn</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Creative Workshop AI */}
          <div
            onClick={() => handleAction('WORKSHOP')}
            className="p-5 rounded-xl border border-navy-light/60 bg-navy/60 hover:bg-navy p-5 cursor-pointer transition-all hover:border-teal-400/50 hover:shadow-xl hover:shadow-teal-400/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-teal-400/15 text-teal-400">
                  <Palette className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-400/20 text-teal-300 font-bold">
                  RAG + JSON GUARDRAILS
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-ivory mt-3">
                Xưởng Sáng Tạo Kỹ Năng
              </h3>
              <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                Học sinh tự thiết kế kỹ năng nguyên tố dựa trên dữ liệu hóa lý thật, được hội đồng AI 3 lớp thẩm định khoa học an toàn.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-teal-300 font-semibold font-mono">
              <span>Vào Xưởng Sáng Tạo</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Unified Chemistry Compendium & VSEPR Lab */}
          <div
            onClick={() => {
              sound.playUiClick();
              if (onOpenCompendium) onOpenCompendium();
            }}
            className="p-5 rounded-xl border border-navy-light/60 bg-navy/60 hover:bg-navy p-5 cursor-pointer transition-all hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-400/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-amber-400/15 text-amber-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                  CẨM NANG HỢP NHẤT
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-ivory mt-3">
                Cẩm Nang Phản Ứng & VSEPR
              </h3>
              <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                Tra cứu 100+ phản ứng kinh điển, cấu trúc hình học phân tử 3D, máy tính dung dịch pH và tài liệu chuẩn GDPT 2018.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-amber-300 font-semibold font-mono">
              <span>Tra Cứu Cẩm Nang</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Campaign 5 Chapters */}
          <div
            onClick={() => handleAction('CAMPAIGN')}
            className="p-5 rounded-xl border border-navy-light/60 bg-navy/60 hover:bg-navy p-5 cursor-pointer transition-all hover:border-rose-400/50 hover:shadow-xl hover:shadow-rose-400/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-lg bg-rose-400/15 text-rose-400">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-400/20 text-rose-300 font-bold">
                  5 ẢI BOSS CỐT TRUYỆN
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-ivory mt-3">
                Chiến Dịch 5 Vùng Cực Đoan
              </h3>
              <p className="text-xs text-ivory-muted mt-1 leading-relaxed">
                Vượt qua các thử thách môi trường: Mưa Axit, Núi Lửa Nhiệt Nhôm, Hầm Băng Cryo, Tháp Áp Suất 200 atm để nhận thẻ bài hiếm.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-navy-light/40 flex items-center justify-between text-xs text-rose-300 font-semibold font-mono">
              <span>Chinh Phục Ải Boss</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
