// src/components/events/EventsTab.tsx
// Comprehensive Events & Timed Community Campaigns Tab for ELEMENTA
// Interactive UI for Community Events, Seasonal Competitions, and 7-Day Login Milestone

import React, { useState, useMemo, useEffect } from 'react';
import { PlayerProfile } from '../../domain/types';
import { EventsEngine, TimedEventDefinition, DAILY_LOGIN_CALENDAR } from '../../domain/eventsEngine';
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
  Award,
  ArrowRight,
  Flame,
  Calendar,
  AlertCircle,
  BookOpen
} from 'lucide-react';

export interface EventsTabProps {
  profile: PlayerProfile;
  updateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenDailyLogin?: () => void;
}

export const EventsTab: React.FC<EventsTabProps> = ({
  profile,
  updateProfile,
  onNavigateTab,
  onOpenDailyLogin
}) => {
  const [notification, setNotification] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Update timer tick every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const evaluatedEvents = useMemo(() => {
    return EventsEngine.getEvaluatedEvents(profile);
  }, [profile, currentTime]);

  const loginState = useMemo(() => {
    return EventsEngine.getDailyLoginState();
  }, [profile, currentTime]);

  const handleClaimReward = (eventId: string) => {
    sound.playUiClick();
    const result = EventsEngine.claimEventReward(eventId, profile, updateProfile);
    if (result.success) {
      sound.playVictory();
      setNotification(result.message);
      setTimeout(() => setNotification(null), 5000);
    } else {
      sound.playErrorFizzle();
      setNotification(result.message);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const formatRemainingTime = (endDateStr: string) => {
    const endMs = new Date(endDateStr).getTime();
    const diffMs = Math.max(0, endMs - currentTime);
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} ngày ${hours} giờ còn lại`;
    return `${hours} giờ ${minutes} phút còn lại`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border border-emerald-500/50 text-emerald-200 shadow-2xl backdrop-blur-md animate-slideDown">
          <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
          <span className="text-sm font-semibold tracking-wide">{notification}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-900 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Sự Kiện Đặc Biệt Toàn Máy Chủ
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300">
              TRUNG TÂM SỰ KIỆN & MÙA GIẢI
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
              Hoàn thành các chiến dịch học thuật và thử thách đấu trường giới hạn thời gian để sở hữu thẻ quái thú hiếm, rương Thạch Năng Lượng và huy hiệu danh giá.
            </p>
          </div>

          {/* Daily Login Card Banner */}
          <div className="shrink-0 bg-slate-900/80 border border-cyan-500/40 rounded-2xl p-5 backdrop-blur-md flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-300" />
                Điểm Danh 7 Ngày
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Ngày {loginState.currentDay}/7
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {loginState.canClaimToday
                ? '🎁 Bạn có quà điểm danh hôm nay đang chờ!'
                : '✅ Đã nhận quà hôm nay. Điểm danh tiếp vào ngày mai.'}
            </p>
            <button
              onClick={() => {
                if (onOpenDailyLogin) {
                  onOpenDailyLogin();
                } else {
                  const res = EventsEngine.claimDailyLogin(profile, updateProfile);
                  setNotification(res.message);
                  if (res.success) sound.playVictory();
                }
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                loginState.canClaimToday
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold shadow-cyan-500/25 animate-pulse'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700'
              }`}
            >
              <Gift className="w-4 h-4" />
              {loginState.canClaimToday ? 'Nhận Quà Điểm Danh Ngay' : 'Xem Lịch Điểm Danh'}
            </button>
          </div>
        </div>
      </div>

      {/* Active Events List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">
              Chiến Dịch Đang Diễn Ra ({evaluatedEvents.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" /> Cập nhật thời gian thực
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {evaluatedEvents.map(({ definition: evt, isFullyCompleted, isClaimed }) => {
            const timeRemainingText = formatRemainingTime(evt.endDate);
            const totalObj = evt.objectives.length;
            const completedObj = evt.objectives.filter((o) => o.isCompleted).length;
            const overallPercent = Math.round((completedObj / totalObj) * 100);

            return (
              <div
                key={evt.id}
                className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Event Card Header with Gradient */}
                <div className={`p-6 bg-gradient-to-r ${evt.themeColor} text-white relative`}>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider bg-black/40 backdrop-blur-md border border-white/20 uppercase">
                      {evt.badge}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      {timeRemainingText}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">{evt.title}</h3>
                  <p className="text-xs md:text-sm text-white/80 font-medium mt-1">{evt.subtitle}</p>
                </div>

                {/* Event Body */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  {/* Description */}
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Objectives Checklist */}
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <span>Mục Tiêu Thử Thách ({completedObj}/{totalObj})</span>
                      <span className="text-amber-400">{overallPercent}%</span>
                    </div>

                    {/* Overall Progress Bar */}
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${overallPercent}%` }}
                      />
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {evt.objectives.map((obj) => (
                        <div key={obj.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className={`flex items-center gap-2 ${obj.isCompleted ? 'text-emerald-300 line-through' : 'text-slate-300'}`}>
                              {obj.isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                              )}
                              {obj.title}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400">
                              {obj.currentCount}/{obj.targetCount}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rewards Showcase */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                      🎁 Phần Thưởng Độc Quyền:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      {evt.rewards.elementalShards > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-950/50 border border-cyan-800/50 text-cyan-300 font-semibold">
                          <Coins className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>+{evt.rewards.elementalShards} Shards</span>
                        </div>
                      )}
                      {evt.rewards.knowledgeTokens > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-950/50 border border-purple-800/50 text-purple-300 font-semibold">
                          <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>+{evt.rewards.knowledgeTokens} Tokens</span>
                        </div>
                      )}
                      {evt.rewards.xp > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/50 text-emerald-300 font-semibold">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>+{evt.rewards.xp} XP</span>
                        </div>
                      )}
                      {evt.rewards.exclusiveCardName && (
                        <div className="col-span-2 sm:col-span-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-950/40 border border-amber-600/50 text-amber-200 font-semibold">
                          <Award className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Thẻ Foil: {evt.rewards.exclusiveCardName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action / Claim Button */}
                  <div className="pt-2">
                    {isClaimed ? (
                      <button
                        disabled
                        className="w-full py-3 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-500 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Đã Hoàn Thành & Nhận Thưởng
                      </button>
                    ) : isFullyCompleted ? (
                      <button
                        onClick={() => handleClaimReward(evt.id)}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 animate-pulse transition-all"
                      >
                        <Gift className="w-4 h-4" />
                        Nhận Toàn Bộ Phần Thưởng Sự Kiện
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          disabled
                          className="flex-1 py-3 px-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-slate-400 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                        >
                          <AlertCircle className="w-4 h-4 text-slate-500" />
                          Chưa Đủ Điều Kiện ({completedObj}/{totalObj})
                        </button>
                        {onNavigateTab && (
                          <button
                            onClick={() => onNavigateTab('DUEL')}
                            className="py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                            title="Đến Đấu Trường để hoàn thành"
                          >
                            <span>Thi Đấu</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
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
