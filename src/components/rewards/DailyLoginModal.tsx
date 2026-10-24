// src/components/rewards/DailyLoginModal.tsx
// High-Impact 7-Day Daily Login Rewards Calendar Modal for ELEMENTA

import React, { useState } from 'react';
import { PlayerProfile } from '../../domain/types';
import { EventsEngine, DAILY_LOGIN_CALENDAR } from '../../domain/eventsEngine';
import { sound } from '../../audio/soundEngine';
import {
  Calendar,
  Gift,
  CheckCircle2,
  Sparkles,
  X,
  Coins,
  Shield,
  Star,
  Clock
} from 'lucide-react';

export interface DailyLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  updateProfile: (updater: (prev: PlayerProfile) => PlayerProfile) => void;
}

export const DailyLoginModal: React.FC<DailyLoginModalProps> = ({
  isOpen,
  onClose,
  profile,
  updateProfile
}) => {
  const [claimFeedback, setClaimFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const loginState = EventsEngine.getDailyLoginState();

  const handleClaim = () => {
    sound.playUiClick();
    const result = EventsEngine.claimDailyLogin(profile, updateProfile);
    if (result.success) {
      sound.playVictory();
      setClaimFeedback(result.message);
    } else {
      setClaimFeedback(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-slate-900 via-navy-dark to-slate-950 border border-amber-400/40 p-6 shadow-2xl shadow-amber-500/20 text-ivory">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-obsidian shadow-lg shadow-amber-500/30">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200">
              ĐIỂM DANH 7 NGÀY — PHÚC LỢI HỌC TẬP
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Đăng nhập mỗi ngày để tích lũy Mảnh Nguyên Tố, Túi Bài & Thẻ Độc Quyền!
            </p>
          </div>
        </div>

        {/* Feedback Alert if claimed */}
        {claimFeedback && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-400/80 text-emerald-200 text-xs font-mono font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{claimFeedback}</span>
          </div>
        )}

        {/* 7-Day Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-6">
          {DAILY_LOGIN_CALENDAR.map((day) => {
            const isClaimed = loginState.claimedDays.includes(day.day);
            const isCurrent = loginState.currentDay === day.day;
            const isUpcoming = day.day > loginState.currentDay;

            return (
              <div
                key={day.day}
                className={`relative rounded-2xl p-3 flex flex-col items-center justify-between text-center transition-all border ${
                  isClaimed
                    ? 'bg-emerald-950/30 border-emerald-500/40 opacity-75'
                    : isCurrent
                    ? 'bg-amber-950/50 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-black/40 border-white/10 opacity-80'
                }`}
              >
                {/* Day Header */}
                <div className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Ngày {day.day}
                </div>

                {/* Big Reward Icon */}
                <div className="my-2 text-2xl filter drop-shadow">
                  {day.icon}
                </div>

                {/* Reward Summary */}
                <div className="text-[11px] font-bold text-amber-200 truncate w-full">
                  {day.shards ? `+${day.shards} Shards` : day.tokens ? `+${day.tokens} Tokens` : day.packType || 'Thẻ Bài'}
                </div>

                {/* Status Badge */}
                <div className="mt-2 w-full">
                  {isClaimed ? (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" /> Đã Nhận
                    </span>
                  ) : isCurrent ? (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-mono font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-600 animate-pulse">
                      Hôm Nay
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-500">
                      Chưa Mở
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Claim Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Làm mới phần thưởng mỗi ngày lúc 00:00 (ICT)</span>
          </div>

          <button
            onClick={handleClaim}
            disabled={!loginState.canClaimToday}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-serif font-black text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all ${
              loginState.canClaimToday
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-obsidian hover:brightness-110 active:scale-95 shadow-amber-500/40'
                : 'bg-slate-800 text-slate-500 border border-white/10 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{loginState.canClaimToday ? 'ĐIỂM DANH & NHẬN QUÀ NGAY' : 'HÔM NAY ĐÃ ĐIỂM DANH'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
