// src/components/ranked/RankedDashboardSection.tsx
// High-Fidelity Ranked Ladder, Match History & Curriculum Quests UI for ELEMENTA

import React, { useState, useEffect } from 'react';
import { rankedEngine, RankedProfile, Quest } from '../../domain/rankedSystem';
import { sound } from '../../audio/soundEngine';
import {
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Shield,
  Sword,
  BookOpen,
  Atom,
  TrendingUp,
  History,
  Gift
} from 'lucide-react';

interface RankedDashboardSectionProps {
  onStartRankedDuel: () => void;
  onRewardClaimed?: (xp: number, shards: number) => void;
}

export const RankedDashboardSection: React.FC<RankedDashboardSectionProps> = ({
  onStartRankedDuel,
  onRewardClaimed
}) => {
  const [profile, setProfile] = useState<RankedProfile>(() => rankedEngine.getProfile());
  const [activeQuestTab, setActiveQuestTab] = useState<'DAILY' | 'CURRICULUM'>('DAILY');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setProfile(rankedEngine.getProfile());
  }, []);

  const currentTier = rankedEngine.getTierConfig(profile.currentTierId);
  const tierProgress = rankedEngine.calculateTier(profile.mmr);

  const totalMatches = profile.wins + profile.losses;
  const winRate = totalMatches > 0 ? Math.round((profile.wins / totalMatches) * 100) : 0;

  const handleClaim = (questId: string) => {
    sound.playUiClick();
    const res = rankedEngine.claimQuest(questId);
    if (res.success) {
      sound.playLevelUp();
      setFeedback(res.message);
      setProfile(rankedEngine.getProfile());
      if (onRewardClaimed) {
        onRewardClaimed(res.xp, res.shards);
      }
      setTimeout(() => setFeedback(null), 3000);
    } else {
      sound.playErrorFizzle();
      setFeedback(res.message);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const filteredQuests = profile.quests.filter(q => q.category === activeQuestTab);
  const pendingClaimsCount = profile.quests.filter(q => q.isCompleted && !q.isClaimed).length;

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {feedback && (
        <div className="p-2.5 rounded-lg bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center gap-2 shadow-lg animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Grid: Left Tier Showcase, Right Quests Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Player Ranked Tier Card */}
        <div className={`rounded-xl border-2 ${currentTier.borderClass} bg-gradient-to-br ${currentTier.bgGradient} p-5 shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/5 rounded-full pointer-events-none blur-2xl" />

          {/* Tier Header */}
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                {currentTier.icon}
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-wider uppercase text-slate-300">
                  XẾP HẠNG MÙA 1: BÌNH MINH NGUYÊN TỬ
                </div>
                <h3 className="font-serif font-black text-xl text-white flex items-center gap-1.5">
                  <span>{currentTier.name}</span>
                  <span className="text-amber-300 font-mono text-base font-bold">
                    {profile.division === 1 ? 'I' : profile.division === 2 ? 'II' : profile.division === 3 ? 'III' : 'IV'}
                  </span>
                </h3>
                <div className="text-xs font-mono text-slate-300">
                  {profile.mmr} MMR • Đỉnh cao: <span className="text-amber-400 font-bold">{profile.peakMmr}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHistoryModal(true)}
              className="p-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white border border-white/10 transition-all text-xs flex items-center gap-1"
              title="Xem lịch sử đấu"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lịch Sử</span>
            </button>
          </div>

          {/* MMR Progress to next tier */}
          <div className="space-y-1.5 relative z-10">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span>Tiến Trình Bậc</span>
              <span>{profile.mmr} / {currentTier.maxMmr} MMR</span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                style={{
                  width: `${Math.max(5, Math.min(100, ((profile.mmr - currentTier.minMmr) / Math.max(1, currentTier.maxMmr - currentTier.minMmr)) * 100))}%`
                }}
              />
            </div>
          </div>

          {/* Quick Combat Stats */}
          <div className="grid grid-cols-3 gap-2 bg-black/50 p-2.5 rounded-lg border border-white/10 text-center font-mono relative z-10">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Thắng / Bại</div>
              <div className="text-xs font-bold text-white mt-0.5">
                <span className="text-emerald-400">{profile.wins}W</span> - <span className="text-red-400">{profile.losses}L</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Tỉ Lệ Thắng</div>
              <div className="text-xs font-bold text-amber-300 mt-0.5">{winRate}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Chuỗi Thắng</div>
              <div className="text-xs font-bold text-cyan-300 flex items-center justify-center gap-0.5 mt-0.5">
                <Flame className="w-3 h-3 text-orange-500 fill-current" />
                {profile.currentWinStreak}
              </div>
            </div>
          </div>

          {/* Action Button: Start Duel */}
          <button
            onClick={onStartRankedDuel}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-coral-reaction to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-coral-reaction/40 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer uppercase"
          >
            <Sword className="w-4 h-4" />
            <span>Vào Đấu Xếp Hạng Ngay</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right 2 Columns: Quests & Curriculum Missions */}
        <div className="lg:col-span-2 rounded-xl border border-navy-light/60 bg-navy/60 p-4 flex flex-col justify-between gap-3 shadow-xl">
          {/* Header & Tabs */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif font-black text-base text-ivory">
                Nhiệm Vụ Chiến Thuật & Sư Phạm GDPT 2018
              </h3>
              {pendingClaimsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-obsidian text-[10px] font-mono font-black animate-pulse">
                  {pendingClaimsCount} Sẵn Sàng Nhận
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveQuestTab('DAILY')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  activeQuestTab === 'DAILY'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-white bg-black/30'
                }`}
              >
                <Clock className="w-3 h-3" />
                Hằng Ngày
              </button>
              <button
                onClick={() => setActiveQuestTab('CURRICULUM')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  activeQuestTab === 'CURRICULUM'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-white bg-black/30'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                Chương Trình GDPT
              </button>
            </div>
          </div>

          {/* Quests List */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-cyan-ion/40">
            {filteredQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-3 rounded-lg bg-black/50 border border-white/5 hover:border-white/10 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-ivory truncate">{quest.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-white/10">
                      +{quest.rewardXp} XP • +{quest.rewardShards} Mảnh
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1">{quest.description}</p>
                  <p className="text-[10px] font-mono text-emerald-400/90 truncate">
                    💡 {quest.scientificContext}
                  </p>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="w-36 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                        style={{ width: `${Math.min(100, (quest.currentProgress / quest.targetCount) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {quest.currentProgress} / {quest.targetCount}
                    </span>
                  </div>
                </div>

                {/* Claim Button / State */}
                <div className="shrink-0">
                  {quest.isClaimed ? (
                    <span className="px-2.5 py-1 rounded bg-slate-800/80 text-slate-500 text-xs font-mono flex items-center gap-1 border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                      Đã Nhận
                    </span>
                  ) : quest.isCompleted ? (
                    <button
                      onClick={() => handleClaim(quest.id)}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-obsidian font-mono font-black text-xs shadow-md shadow-emerald-500/30 flex items-center gap-1.5 animate-pulse cursor-pointer"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      Nhận Thưởng
                    </button>
                  ) : (
                    <span className="px-2 py-1 rounded bg-black/40 text-slate-500 text-[10px] font-mono">
                      Đang Tiến Hành
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-mono text-slate-400 text-right pt-1 border-t border-white/5">
            Hoàn thành nhiệm vụ giúp mở khóa kiến thức và gia tăng sức mạnh bộ bài TCG.
          </div>
        </div>
      </div>

      {/* Match History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border-2 border-cyan-ion/60 rounded-xl p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-serif font-black text-base text-cyan-200 flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-ion" />
                Lịch Sử Đấu Bài Xếp Hạng ({profile.matchHistory.length} trận gần nhất)
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-white font-mono font-bold text-xs"
              >
                ✕ ĐÓNG
              </button>
            </div>

            {profile.matchHistory.length === 0 ? (
              <div className="py-12 text-center text-slate-500 font-mono text-xs">
                Chưa có lịch sử đấu xếp hạng nào. Hãy nhấn "Vào Đấu Xếp Hạng Ngay" để khởi đầu hành trình!
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1 font-mono text-xs scrollbar-thin scrollbar-thumb-cyan-ion/40">
                {profile.matchHistory.map((m) => (
                  <div
                    key={m.id}
                    className="p-2.5 rounded-lg bg-black/50 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.outcome === 'VICTORY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}>
                        {m.outcome === 'VICTORY' ? 'CHIẾN THẮNG' : 'THẤT BẠI'}
                      </span>
                      <div>
                        <div className="font-bold text-slate-200">vs {m.opponentName}</div>
                        <div className="text-[10px] text-slate-400">
                          {m.turns} lượt • Còn {m.playerLpRemaining} LP • {m.reactionsTriggered} phản ứng
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-bold ${m.mmrDelta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {m.mmrDelta >= 0 ? `+${m.mmrDelta}` : m.mmrDelta} MMR
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {new Date(m.timestamp).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
