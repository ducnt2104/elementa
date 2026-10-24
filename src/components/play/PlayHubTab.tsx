// src/components/play/PlayHubTab.tsx
// Central Game Mode Selection Hub for ELEMENTA
// Direct gateway into Tutorial Lab, Campaign Story, Casual TCG, Ranked TCG, MOBA Arena, Online Lobby, and AI Workshop

import React, { useState } from 'react';
import { PlayerProfile } from '../../domain/types';
import { AiLevel } from '../../domain/duelEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sword,
  Flame,
  BookOpen,
  Trophy,
  Users,
  Compass,
  Palette,
  Sparkles,
  ChevronRight,
  Shield,
  Zap,
  Globe2,
  Atom,
  HelpCircle,
  Play
} from 'lucide-react';

export interface PlayHubTabProps {
  profile: PlayerProfile;
  onSelectMode: (
    mode: 'TUTORIAL' | 'CAMPAIGN' | 'CASUAL_TCG' | 'RANKED_TCG' | 'MOBA' | 'MULTIPLAYER' | 'WORKSHOP',
    aiLevel?: AiLevel
  ) => void;
  onOpenMultiplayerLobby?: () => void;
  onBackToMenu?: () => void;
}

export const PlayHubTab: React.FC<PlayHubTabProps> = ({
  profile,
  onSelectMode,
  onOpenMultiplayerLobby,
  onBackToMenu
}) => {
  const [selectedCasualAi, setSelectedCasualAi] = useState<AiLevel>('ADEPT');

  const handleModeLaunch = (
    mode: 'TUTORIAL' | 'CAMPAIGN' | 'CASUAL_TCG' | 'RANKED_TCG' | 'MOBA' | 'MULTIPLAYER' | 'WORKSHOP',
    aiLevel?: AiLevel
  ) => {
    sound.playUiClick();
    if (mode === 'MULTIPLAYER' && onOpenMultiplayerLobby) {
      onOpenMultiplayerLobby();
    } else {
      onSelectMode(mode, aiLevel);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-950 via-navy to-slate-900 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(6,182,212,0.15),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 tracking-wider uppercase">
              <Atom className="w-3.5 h-3.5 text-cyan-400" />
              Trung Tâm Đấu Trường Đa Chế Độ
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-300">
              CHỌN CHẾ ĐỘ CHƠI
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
              Trải nghiệm các chế độ thi đấu phong phú: từ Đấu Bài Thẻ TCG chuẩn quốc tế, Chiến Dịch Cốt Truyện Lịch Sử, Đấu Trường MOBA thời gian thực, cho đến Ghép Trận Online P2P.
            </p>
          </div>

          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold uppercase tracking-wider transition-all"
            >
              ← Về Sảnh Chính
            </button>
          )}
        </div>
      </div>

      {/* Primary Game Modes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. TCG CASUAL DUEL */}
        <div className="relative group rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 to-amber-950/20 p-6 flex flex-col justify-between hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
              <Sword className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  TCG Đấu Bài
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Tùy Chọn AI</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Đấu Thường TCG (Luyện Tập)
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                So tài chiến thuật với AI mô phỏng học máy. Thử nghiệm bộ bài hóa học, kích hoạt phản ứng oxi hóa - khử và tổng hợp các hợp chất huyền thoại.
              </p>
            </div>

            {/* AI Level Selector */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Cấp Độ Đối Thủ AI:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {(['NOVICE', 'ADEPT', 'EXPERT'] as AiLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedCasualAi(lvl);
                    }}
                    className={`py-1.5 px-2 rounded-lg font-bold text-[10px] transition-all ${
                      selectedCasualAi === lvl
                        ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    {lvl === 'NOVICE' ? 'Thực Tập' : lvl === 'ADEPT' ? 'Chuyên Gia' : 'Bậc Thầy'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleModeLaunch('CASUAL_TCG', selectedCasualAi)}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all group-hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-current" />
            Vào Trận Ngay
          </button>
        </div>

        {/* 2. TCG RANKED DUEL */}
        <div className="relative group rounded-3xl border border-rose-500/30 bg-gradient-to-b from-slate-900/90 to-rose-950/20 p-6 flex flex-col justify-between hover:border-rose-500/70 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-slate-950 shadow-lg shadow-rose-500/30">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase">
                  Leo Rank Mùa Giải
                </span>
                <span className="text-[10px] font-semibold text-rose-400">Ranked Elo</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                Xếp Hạng Đấu Thần
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Thi đấu căng thẳng tranh hạng mùa giải. Thu thập điểm Elo, nhận danh hiệu Đấu Thần Nguyên Tố và rương quà Shards siêu cấp sau mỗi tuần thi đấu.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs flex items-center justify-between text-rose-200">
              <span className="font-semibold">Hạng Hiện Tại:</span>
              <span className="font-bold text-rose-300">
                {profile.tcgBotRank?.tier || 'Đồng'} • {profile.tcgBotRank?.mmr || 1000} RP
              </span>
            </div>
          </div>

          <button
            onClick={() => handleModeLaunch('RANKED_TCG', 'RANKED_AI')}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all group-hover:scale-[1.02]"
          >
            <Trophy className="w-4 h-4" />
            Thi Đấu Xếp Hạng
          </button>
        </div>

        {/* 3. CAMPAIGN STORY */}
        <div className="relative group rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-slate-900/90 to-indigo-950/20 p-6 flex flex-col justify-between hover:border-indigo-500/70 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-slate-950 shadow-lg shadow-indigo-500/30">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                  Cốt Truyện GDPT 2018
                </span>
                <span className="text-[10px] font-semibold text-indigo-400">10 Màn Chơi</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                Chiến Dịch Lịch Sử Hóa Học
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Hành trình xuyên thời gian từ thuyết Bốn Nguyên Tố cổ đại, thuyết Nhiệt Tố, bảng tuần hoàn Mendeleev tới cơ học lượng tử hiện đại.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs flex items-center justify-between text-indigo-200">
              <span className="font-semibold">Tiến Độ:</span>
              <span className="font-bold text-indigo-300">
                Màn {profile.completedCampaignStages?.length || 1}/10
              </span>
            </div>
          </div>

          <button
            onClick={() => handleModeLaunch('CAMPAIGN')}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all group-hover:scale-[1.02]"
          >
            <Compass className="w-4 h-4" />
            Khám Phá Cốt Truyện
          </button>
        </div>

        {/* 4. MOBA 3v3 / 5v5 ARENA */}
        <div className="relative group rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-cyan-950/20 p-6 flex flex-col justify-between hover:border-cyan-500/70 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/30">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                  Thời Gian Thực
                </span>
                <span className="text-[10px] font-semibold text-cyan-400">Chiến Trường MOBA</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                Đấu Trường MOBA Nguyên Tố
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Điều khiển trực tiếp các Anh Hùng Nguyên Tố (Hydro, Oxi, Sắt, Clo...) với bộ chiêu thức hóa học, trụ phòng ngự và bùa lợi rừng.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-cyan-300/80">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Chuyển động 60FPS mượt mà, đồ họa Canvas 2D/2.5D</span>
            </div>
          </div>

          <button
            onClick={() => handleModeLaunch('MOBA')}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 hover:from-cyan-300 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all group-hover:scale-[1.02]"
          >
            <Flame className="w-4 h-4" />
            Vào Đấu Trường MOBA
          </button>
        </div>

        {/* 5. MULTIPLAYER ONLINE LOBBY */}
        <div className="relative group rounded-3xl border border-sky-500/30 bg-gradient-to-b from-slate-900/90 to-sky-950/20 p-6 flex flex-col justify-between hover:border-sky-500/70 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg shadow-sky-500/30">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 uppercase">
                  Firebase / P2P Realtime
                </span>
                <span className="text-[10px] font-semibold text-sky-400">Trực Tuyến</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                Sảnh Đấu Online (PvP)
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Tạo phòng đấu riêng, gửi mã phòng cho bạn bè hoặc ghép trận trực tuyến ngẫu nhiên qua hạ tầng mạng WebRTC / Firebase đồng bộ thời gian thực.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-sky-300/80">
              <Globe2 className="w-4 h-4 text-sky-400" />
              <span>Đồng bộ trạng thái trận đấu tự động, độ trễ thấp</span>
            </div>
          </div>

          <button
            onClick={() => handleModeLaunch('MULTIPLAYER')}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all group-hover:scale-[1.02]"
          >
            <Users className="w-4 h-4" />
            Vào Sảnh Ghép Đấu
          </button>
        </div>

        {/* 6. TUTORIAL LAB */}
        <div className="relative group rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-emerald-950/20 p-6 flex flex-col justify-between hover:border-emerald-500/70 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                  Dành Cho Tân Thủ
                </span>
                <span className="text-[10px] font-semibold text-emerald-400">Hướng Dẫn Từng Bước</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Phòng Thí Nghiệm Tân Thủ
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Làm quen với luật chơi, 5 khu vực bài trên sân đấu, quy tắc số oxi hóa, liên kết hóa học và nhận ngay bộ bài khởi đầu miễn phí.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-300/80">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Nhận 500 Tokens + Bộ Bài Cơ Bản khi hoàn thành</span>
            </div>
          </div>

          <button
            onClick={() => handleModeLaunch('TUTORIAL')}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all group-hover:scale-[1.02]"
          >
            <BookOpen className="w-4 h-4" />
            Học Luật Chơi
          </button>
        </div>
      </div>
    </div>
  );
};
