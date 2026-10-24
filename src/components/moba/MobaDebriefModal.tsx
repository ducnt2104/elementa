// src/components/moba/MobaDebriefModal.tsx
// Comprehensive Post-Match Chemistry Debrief & CA-SRS Feedback Modal for MOBA

import React, { useState } from 'react';
import { MobaMatchDebrief } from '../../game/types';
import { HEROES_CATALOG } from '../../game/data/heroesData';
import { sound } from '../../audio/soundEngine';
import {
  Trophy,
  Skull,
  RotateCcw,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  Swords,
  FlaskConical,
  Flame,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';

interface MobaDebriefModalProps {
  debrief: MobaMatchDebrief | null;
  onClose: () => void;
  onRematch: () => void;
  onGoToSrs?: () => void;
}

export const MobaDebriefModal: React.FC<MobaDebriefModalProps> = ({
  debrief,
  onClose,
  onRematch,
  onGoToSrs
}) => {
  if (!debrief) return null;

  const isVictory = debrief.outcome === 'VICTORY';
  const hero = HEROES_CATALOG.find(h => h.id === debrief.playerHeroId) || HEROES_CATALOG[0];

  const minutes = Math.floor(debrief.matchDurationSeconds / 60).toString().padStart(2, '0');
  const seconds = Math.floor(debrief.matchDurationSeconds % 60).toString().padStart(2, '0');

  const [reactionFilter, setReactionFilter] = useState<'ALL' | 'COMBAT' | 'ENVIRONMENT'>('ALL');

  const isEnvironmentalReaction = (rx: any) => {
    return (
      rx.targetEntityId === 'river_h2o' ||
      (typeof rx.targetEntityId === 'string' && rx.targetEntityId.startsWith('brush_')) ||
      rx.id.startsWith('rx_steam_') ||
      rx.id.startsWith('rx_alkali_river_') ||
      rx.id.startsWith('rx_slaking_river_') ||
      rx.id.startsWith('rx_freeze_river_') ||
      rx.id.startsWith('rx_shock_river_') ||
      rx.id.startsWith('rx_bush_burn_') ||
      rx.id.startsWith('rx_aoe_neutral_') ||
      rx.reactionRule?.id?.includes('neutral') ||
      rx.reactionRule?.id?.includes('steam') ||
      rx.reactionRule?.id?.includes('bush') ||
      rx.reactionRule?.id?.includes('hydro') ||
      rx.reactionRule?.id?.includes('slaking') ||
      rx.reactionRule?.id?.includes('freeze') ||
      rx.reactionRule?.id?.includes('shock') ||
      rx.reactionRule?.ruleCode?.includes('RIVER') ||
      rx.reactionRule?.ruleCode?.includes('NEUTRALIZATION') ||
      rx.reactionRule?.ruleCode?.includes('BIOMASS')
    );
  };

  const envReactions = debrief.reactionsTriggered.filter(isEnvironmentalReaction);
  const combatReactions = debrief.reactionsTriggered.filter(rx => !isEnvironmentalReaction(rx));
  const displayedReactions = reactionFilter === 'ALL'
    ? debrief.reactionsTriggered
    : reactionFilter === 'ENVIRONMENT'
      ? envReactions
      : combatReactions;

  const getReactionCategoryMeta = (rx: any) => {
    if (rx.id.startsWith('rx_aoe_neutral_') || rx.reactionRule.id.includes('neutral')) {
      return {
        badge: '🧪 TRUNG HÒA BỀ MẶT (AXIT - BAZƠ)',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        tactical: 'Hồi phục +40 HP & Tẩy sạch độc Axit / Bỏng toàn vùng'
      };
    }
    if (rx.id.startsWith('rx_steam_') || rx.reactionRule.id.includes('steam')) {
      return {
        badge: '💨 ĐỊA HÌNH SÔNG: HƠI NƯỚC BÙNG NỔ',
        badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
        tactical: 'Dập tắt lửa, tạo khói mù & Làm chậm 40% (2.0s)'
      };
    }
    if (rx.id.startsWith('rx_alkali_river_') || rx.reactionRule.id.includes('hydro')) {
      return {
        badge: '💥 ĐỊA HÌNH SÔNG: NỔ KHÍ HYDRO (Na)',
        badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        tactical: 'Sóng xung kích nổ khí Hydro & Rung chấn màn hình (Trauma Shake)'
      };
    }
    if (rx.id.startsWith('rx_freeze_river_') || rx.reactionRule?.id?.includes('freeze') || rx.reactionRule?.ruleCode === 'RX_NITROGEN_RIVER_FREEZE') {
      return {
        badge: '❄️ ĐỊA HÌNH SÔNG: CẦU BĂNG NITƠ LỎNG (N₂)',
        badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
        tactical: 'Hóa rắn sông thành cầu băng (+30% tốc độ chạy đồng minh) & Đóng băng mục tiêu 1.5s'
      };
    }
    if (rx.id.startsWith('rx_slaking_river_') || rx.reactionRule?.id?.includes('slaking') || rx.reactionRule?.ruleCode === 'RX_CaO_RIVER_SLAKING') {
      return {
        badge: '♨️ ĐỊA HÌNH SÔNG: TÔI VÔI TỎA NHIỆT (CaO)',
        badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        tactical: 'Phản ứng tỏa nhiệt đun sôi nước (+45 sát thương), bỏng scalding & Xói mòn 20% kháng phép'
      };
    }
    if (rx.id.startsWith('rx_shock_river_') || rx.reactionRule?.id?.includes('shock') || rx.reactionRule?.ruleCode === 'RX_ELECTROLYTIC_RIVER_CONDUCTION') {
      return {
        badge: '⚡ ĐỊA HÌNH SÔNG: SỐC ĐIỆN PHÂN BỀ MẶT',
        badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
        tactical: 'Dòng điện ion dẫn truyền trong nước gây choáng 1.2s & 50 sát thương điện phân'
      };
    }
    if (rx.id.startsWith('rx_bush_burn_') || rx.reactionRule?.id?.includes('bush')) {
      return {
        badge: '🔥 ĐỊA HÌNH CỎ: HỎA HOẠN BỤI RẬM BIOMASS',
        badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40',
        tactical: 'Thiêu đốt bụi rậm 4.5s & Phá tan khả năng tàng hình / ẩn nấp'
      };
    }
    return {
      badge: '⚔️ GIAO TRANH TƯỚNG (NGUYÊN TỐ)',
      badgeClass: 'bg-cyan-ion/20 text-cyan-ion border-cyan-ion/40',
      tactical: `+${rx.bonusDamage} Sát thương phản ứng hóa học`
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-navy border-2 border-navy-light/80 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 overflow-hidden">
        {/* Header with Victory/Defeat Banner */}
        <div className="flex items-center justify-between border-b border-navy-light/60 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                isVictory ? 'bg-amber-500/20 text-yellow-400 border border-yellow-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}
            >
              {isVictory ? <Trophy className="w-6 h-6" /> : <Skull className="w-6 h-6" />}
            </div>
            <div>
              <h2 className={`font-serif font-black text-2xl tracking-wider ${isVictory ? 'text-yellow-400' : 'text-red-400'}`}>
                {isVictory ? 'CHIẾN THẮNG HOÀN TOÀN (VICTORY)' : 'THẤT BẠI (DEFEAT)'}
              </h2>
              <p className="text-xs text-ivory-muted">
                Thời gian trận đấu: <span className="font-mono text-ivory font-bold">{minutes}:{seconds}</span> | Tướng: <span className="text-cyan-ion font-bold">{hero.name_vi}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-ion/20 text-cyan-ion font-mono text-xs border border-cyan-ion/40">
              +{debrief.xpEarned} XP
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-yellow-300 font-mono text-xs border border-amber-500/40">
              +{debrief.knowledgeTokensEarned} Tri Thức
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-5 pr-1">
          {/* Match Scoreboard Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-obsidian/60 p-4 rounded-xl border border-navy-light/60 text-center font-mono">
            <div>
              <span className="text-[10px] text-ivory-muted uppercase block">KDA Trận Đấu</span>
              <span className="text-base font-bold text-ivory">
                {debrief.kda.kills} / <span className="text-red-400">{debrief.kda.deaths}</span> / {debrief.kda.assists}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-ivory-muted uppercase block">Chỉ Số Lính (CS)</span>
              <span className="text-base font-bold text-cyan-ion">{debrief.kda.cs} Lính</span>
            </div>
            <div>
              <span className="text-[10px] text-ivory-muted uppercase block">Tổng Vàng Kiếm Được</span>
              <span className="text-base font-bold text-yellow-400">{debrief.kda.gold}g</span>
            </div>
            <div>
              <span className="text-[10px] text-ivory-muted uppercase block">Sát Thương Đóng Góp</span>
              <span className="text-base font-bold text-emerald-400">{Math.round(debrief.kda.damageDealt)}</span>
            </div>
          </div>

          {/* Chemical Reactions Triggered in Match */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-ion flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" />
                Các Phản Ứng Hóa Học Đã Kích Hoạt ({debrief.reactionsTriggered.length})
              </h3>

              {/* Reaction Filter Buttons */}
              <div className="flex items-center gap-1 bg-obsidian p-1 rounded-xl border border-navy-light text-[10px] font-mono">
                <button
                  onClick={() => setReactionFilter('ALL')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    reactionFilter === 'ALL'
                      ? 'bg-cyan-ion text-obsidian shadow'
                      : 'text-ivory-muted hover:text-ivory'
                  }`}
                >
                  Tất Cả ({debrief.reactionsTriggered.length})
                </button>
                <button
                  onClick={() => setReactionFilter('COMBAT')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    reactionFilter === 'COMBAT'
                      ? 'bg-cyan-ion text-obsidian shadow'
                      : 'text-ivory-muted hover:text-ivory'
                  }`}
                >
                  Giao Tranh Tướng ({combatReactions.length})
                </button>
                <button
                  onClick={() => setReactionFilter('ENVIRONMENT')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    reactionFilter === 'ENVIRONMENT'
                      ? 'bg-emerald-400 text-obsidian shadow'
                      : 'text-ivory-muted hover:text-ivory'
                  }`}
                >
                  Địa Hình &amp; Môi Trường ({envReactions.length})
                </button>
              </div>
            </div>

            {displayedReactions.length === 0 ? (
              <div className="p-4 rounded-xl bg-obsidian/40 border border-navy-light/40 text-center text-xs text-ivory-muted">
                {reactionFilter === 'ENVIRONMENT'
                  ? 'Không có phản ứng địa hình nào trong trận này. Hãy thử tung kỹ năng Lửa/Kiềm vào dòng sông H₂O hoặc đốt các bụi cỏ rậm!'
                  : 'Chưa có phản ứng hóa học nào được kích hoạt.'}
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {displayedReactions.map((rx, idx) => {
                  const meta = getReactionCategoryMeta(rx);
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-obsidian/70 border border-cyan-ion/40 flex flex-col gap-2 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-ivory flex items-center gap-1.5 font-serif">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            {rx.reactionRule.name_vi}
                          </span>
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${meta.badgeClass}`}>
                            {meta.badge}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy text-cyan-ion border border-cyan-ion/30">
                          {meta.tactical}
                        </span>
                      </div>

                      <div className="px-2.5 py-1.5 rounded bg-navy font-mono text-xs font-bold text-cyan-300 border border-navy-light tracking-wide">
                        {rx.equation}
                      </div>

                      <p className="text-[11px] text-ivory-muted italic">
                        Hiện tượng: "{rx.observablePhenomenaVI}"
                      </p>

                      <p className="text-[11px] text-cyan-ion/90 font-mono">
                        Bản chất: {rx.pedagogicalNoteVI}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Chemical Cognitive Traps Encountered */}
          {debrief.chemicalTrapsEncountered && debrief.chemicalTrapsEncountered.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Bẫy Nhận Thức Đã Gặp ({debrief.chemicalTrapsEncountered.length})
              </h3>
              <div className="flex flex-col gap-2.5">
                {debrief.chemicalTrapsEncountered.map((trap, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-obsidian/70 border border-amber-500/40 flex flex-col gap-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        {trap.reactionRule.name_vi}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        Kháng Điện Hóa E° &gt; 0 (-80% sát thương)
                      </span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded bg-navy font-mono text-xs font-bold text-amber-300 border border-navy-light tracking-wide">
                      {trap.equation} (KHÔNG XẢY RA)
                    </div>
                    <p className="text-[11px] text-ivory-muted italic">
                      Hiện tượng: "{trap.observablePhenomenaVI}"
                    </p>
                    <p className="text-[11px] text-amber-200/90 font-mono">
                      Giải thích: {trap.pedagogicalNoteVI}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spaced Repetition (CA-SRS) Synchronization Notice */}
          <div className="p-3.5 rounded-xl bg-cyan-ion/10 border border-cyan-ion/30 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-ion shrink-0" />
            <div className="text-xs text-ivory-muted">
              <strong className="text-ivory">Hệ thống Ôn Tập Ngắt Quãng (CA-SRS) Đã Đồng Bộ:</strong> Tất cả phản ứng trong trận đã được nạp vào ngân hàng ôn tập 1–3–7–14 ngày của bạn để củng cố trí nhớ dài hạn.
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy-light/60">
          {onGoToSrs && (
            <button
              onClick={() => {
                sound.playUiClick();
                onGoToSrs();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition-all mr-auto"
              title="Mở ngân hàng ôn tập ngắt quãng CA-SRS"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ôn Tập CA-SRS
            </button>
          )}
          <button
            onClick={() => {
              sound.playUiClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-navy hover:bg-navy-light text-xs font-medium text-ivory border border-navy-light/60 transition-all"
          >
            Về Sảnh Chính
          </button>
          <button
            onClick={() => {
              sound.playVictory();
              onRematch();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-ion to-coral-reaction text-obsidian font-serif font-black text-xs tracking-wider shadow-lg shadow-cyan-ion/30 hover:scale-105 active:scale-95 transition-all"
            title="Khởi tạo lại toàn bộ đấu trường MOBA để bắt đầu một trận chiến mới"
          >
            <RotateCcw className="w-4 h-4" />
            TÁI TẠO LẠI TRẬN ĐẤU
          </button>
        </div>
      </div>
    </div>
  );
};
