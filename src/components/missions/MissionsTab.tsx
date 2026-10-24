// src/components/missions/MissionsTab.tsx
// Comprehensive Missions & Learning Quests Tab for ELEMENTA
// Interactive UI for Daily, Weekly, Chemistry Specialized, Collection, and Beginner Missions

import React, { useState, useMemo } from 'react';
import { PlayerProfile } from '../../domain/types';
import { MissionsEngine, MissionCategory, CANONICAL_MISSIONS } from '../../domain/missionsEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Gift,
  Coins,
  Shield,
  Layers,
  FlaskConical,
  BookOpen,
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';

export interface MissionsTabProps {
  profile: PlayerProfile;
  updateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({
  profile,
  updateProfile,
  onNavigateTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MissionCategory | 'ALL'>('ALL');
  const [notification, setNotification] = useState<string | null>(null);

  const evaluatedMissions = useMemo(() => {
    return MissionsEngine.getEvaluatedMissions(profile);
  }, [profile]);

  const filteredMissions = useMemo(() => {
    if (selectedCategory === 'ALL') return evaluatedMissions;
    return evaluatedMissions.filter((m) => m.definition.category === selectedCategory);
  }, [evaluatedMissions, selectedCategory]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; completed: number; claimed: number }> = {
      ALL: { total: evaluatedMissions.length, completed: 0, claimed: 0 },
      DAILY: { total: 0, completed: 0, claimed: 0 },
      WEEKLY: { total: 0, completed: 0, claimed: 0 },
      CHEMISTRY: { total: 0, completed: 0, claimed: 0 },
      COLLECTION: { total: 0, completed: 0, claimed: 0 },
      BEGINNER: { total: 0, completed: 0, claimed: 0 }
    };

    evaluatedMissions.forEach((m) => {
      const cat = m.definition.category;
      if (!stats[cat]) stats[cat] = { total: 0, completed: 0, claimed: 0 };
      stats[cat].total++;
      if (m.progress.isCompleted) {
        stats[cat].completed++;
        stats.ALL.completed++;
      }
      if (m.progress.isClaimed) {
        stats[cat].claimed++;
        stats.ALL.claimed++;
      }
    });

    return stats;
  }, [evaluatedMissions]);

  const handleClaim = (missionId: string) => {
    sound.playUiClick();
    const result = MissionsEngine.claimReward(missionId, profile, updateProfile);
    if (result.success) {
      sound.playVictory();
      setNotification(result.message);
      setTimeout(() => setNotification(null), 4000);
    } else {
      setNotification(result.message);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 animate-fadeIn text-ivory">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-950/80 via-navy-dark to-slate-950 border border-purple-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold mb-2">
              <Award className="w-3.5 h-3.5" /> HỆ THỐNG NHIỆM VỤ & PHÚC LỢI HỌC TẬP TOÀN DIỆN
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-cyan-300">
              NHIỆM VỤ CHIẾN THUẬT & HÓA HỌC
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              Thực hiện các phản ứng hóa học, tích lũy chiến thắng và thu thập thẻ bài để nhận thưởng Mảnh Nguyên Tố (Shards), Túi Bài và Điểm Tri Thức.
            </p>
          </div>

          {/* Overall Progress Widget */}
          <div className="flex items-center gap-4 bg-black/50 p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center">
              <div className="text-2xl font-black font-mono text-cyan-300">
                {categoryStats.ALL.completed} / {categoryStats.ALL.total}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Đã Hoàn Thành</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-black font-mono text-emerald-400">
                {categoryStats.ALL.claimed}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Đã Nhận Thưởng</div>
            </div>
          </div>
        </div>

        {/* Decorative backdrop glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-400 text-emerald-200 text-xs font-mono font-bold flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 text-xs font-mono">
        {[
          { key: 'ALL', label: 'TẤT CẢ' },
          { key: 'DAILY', label: 'HÀNG NGÀY' },
          { key: 'WEEKLY', label: 'HÀNG TUẦN' },
          { key: 'CHEMISTRY', label: 'CHUYÊN ĐỀ HÓA HỌC' },
          { key: 'COLLECTION', label: 'BỘ SƯU TẬP' },
          { key: 'BEGINNER', label: 'TÂN THỦ' }
        ].map((tab) => {
          const stats = categoryStats[tab.key] || { total: 0, completed: 0, claimed: 0 };
          const isSelected = selectedCategory === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                sound.playUiClick();
                setSelectedCategory(tab.key as any);
              }}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30'
                  : 'bg-navy-light/40 text-slate-400 hover:text-white border-white/5 hover:bg-navy-light'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isSelected ? 'bg-black/40 text-purple-200' : 'bg-black/30 text-slate-500'
              }`}>
                {stats.completed}/{stats.total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map(({ definition, progress }) => {
          const percent = Math.min(100, Math.round((progress.currentCount / definition.targetCount) * 100));
          const canClaim = progress.isCompleted && !progress.isClaimed;

          return (
            <div
              key={definition.id}
              className={`relative rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                progress.isClaimed
                  ? 'bg-slate-950/40 border-white/5 opacity-70'
                  : canClaim
                  ? 'bg-gradient-to-br from-purple-950/60 to-slate-900 border-purple-400/80 shadow-xl shadow-purple-950/40'
                  : 'bg-navy-dark/70 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Mission Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${
                      definition.category === 'DAILY' ? 'bg-amber-950/80 text-amber-300 border-amber-600' :
                      definition.category === 'WEEKLY' ? 'bg-blue-950/80 text-blue-300 border-blue-600' :
                      definition.category === 'CHEMISTRY' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600' :
                      definition.category === 'COLLECTION' ? 'bg-cyan-950/80 text-cyan-300 border-cyan-600' :
                      'bg-purple-950/80 text-purple-300 border-purple-600'
                    }`}>
                      {definition.category}
                    </span>
                    <h3 className="font-bold text-sm text-ivory">{definition.title}</h3>
                  </div>

                  {/* Status Badge */}
                  {progress.isClaimed ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 bg-black/40 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Đã Nhận
                    </span>
                  ) : canClaim ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/60 animate-pulse">
                      Sẵn Sàng Nhận!
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">
                      {progress.currentCount} / {definition.targetCount}
                    </span>
                  )}
                </div>

                {/* Description & Pedagogical Note */}
                <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
                  {definition.description}
                </p>
                {definition.pedagogicalNote && (
                  <div className="text-[10px] text-cyan-400 font-mono italic mb-3">
                    💡 {definition.pedagogicalNote}
                  </div>
                )}
              </div>

              {/* Progress & Reward Footer */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Tiến độ hoàn thành:</span>
                    <span className={percent === 100 ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                      {progress.currentCount} / {definition.targetCount} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full transition-all duration-300 ${
                        percent === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-purple-500 to-cyan-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Rewards and Action Button */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  {/* Rewards preview */}
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[10px] text-slate-400">Thưởng:</span>
                    {definition.reward.knowledgeTokens > 0 && (
                      <span className="text-amber-300 font-bold flex items-center gap-0.5">
                        <Coins className="w-3 h-3 text-amber-400" /> +{definition.reward.knowledgeTokens}
                      </span>
                    )}
                    {definition.reward.elementalShards > 0 && (
                      <span className="text-cyan-300 font-bold flex items-center gap-0.5">
                        <Shield className="w-3 h-3 text-cyan-400" /> +{definition.reward.elementalShards}
                      </span>
                    )}
                    {definition.reward.cardPackType && (
                      <span className="text-purple-300 font-bold flex items-center gap-0.5">
                        <Gift className="w-3 h-3 text-purple-400" /> Gói {definition.reward.cardPackType}
                      </span>
                    )}
                    {definition.reward.cardRewardName && (
                      <span className="text-emerald-300 font-bold truncate max-w-[120px]">
                        Thẻ {definition.reward.cardRewardName}
                      </span>
                    )}
                  </div>

                  {/* Claim Button */}
                  <button
                    onClick={() => handleClaim(definition.id)}
                    disabled={!canClaim}
                    className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow ${
                      canClaim
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-obsidian active:scale-95 shadow-emerald-500/30'
                        : progress.isClaimed
                        ? 'bg-white/5 text-slate-500 cursor-default'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {progress.isClaimed ? 'Đã Nhận' : canClaim ? 'Nhận Thưởng' : 'Đang Làm'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
