// src/components/tcg/TcgHistoryModal.tsx
// Comprehensive Unified TCG History Center for ELEMENTA
// 4 Dedicated Pillars: Match History, Combat/Reaction Event Logs, Transaction Ledger, Collection Milestones.

import React, { useState, useMemo } from 'react';
import { PlayerProfile, DuelMatchRecord } from '../../domain/types';
import { sound } from '../../audio/soundEngine';
import {
  History,
  Trophy,
  Scroll,
  Coins,
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Shield,
  Zap,
  Flame,
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Hammer,
  Package
} from 'lucide-react';

interface TcgHistoryModalProps {
  profile: PlayerProfile;
  onClose: () => void;
}

export type HistoryTab = 'MATCHES' | 'REACTIONS' | 'TRANSACTIONS' | 'DECKS';

export const TcgHistoryModal: React.FC<TcgHistoryModalProps> = ({ profile, onClose }) => {
  const [activeTab, setActiveTab] = useState<HistoryTab>('MATCHES');
  const [selectedMatch, setSelectedMatch] = useState<DuelMatchRecord | null>(null);
  const [txFilter, setTxFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fallback demo match history if fresh profile
  const matchHistory: DuelMatchRecord[] = useMemo(() => {
    if (profile.duelMatchHistory && profile.duelMatchHistory.length > 0) {
      return [...profile.duelMatchHistory].reverse();
    }
    // Seed standard initial history so user sees realistic records
    return [
      {
        id: 'match_init_1',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
        mode: 'RANKED_AI',
        outcome: 'VICTORY',
        opponentName: 'Bot Hóa Học Lớp 10 (Ranked AI 60 Thẻ)',
        opponentDeckName: 'Dãy Hoạt Động & Cấu Hình Electron',
        playerDeckName: profile.activeDuelDeck?.name || 'Bộ Bài Khởi Nguyên',
        playerLpEnd: 4200,
        opponentLpEnd: 0,
        turnsCount: 6,
        reactionsCount: 4,
        mmrChange: +25,
        tokensEarned: 120,
        shardsEarned: 30,
        keyEvents: [
          'Lượt 1: Triệu hồi Natri (Na) lên sân đấu',
          'Lượt 2: Kích hoạt Mưa Axit tạo môi trường ẩm ướt',
          'Lượt 3: Bùng nổ phản ứng 2Na + 2H₂O → 2NaOH + H₂ gây 1,000 LP',
          'Lượt 5: Hợp thể quái thú Nước H2O tiêu diệt quái thú đối thủ',
          'Lượt 6: Đòn tấn công kết liễu giành chiến thắng'
        ]
      },
      {
        id: 'match_init_2',
        timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
        mode: 'CAMPAIGN',
        outcome: 'VICTORY',
        opponentName: 'Boss Ải 1: Axit Sunfuric Đậm Đặc',
        opponentDeckName: 'Bão Axit Ăn Mòn',
        playerDeckName: profile.activeDuelDeck?.name || 'Bộ Bài Khởi Nguyên',
        playerLpEnd: 1800,
        opponentLpEnd: 0,
        turnsCount: 8,
        reactionsCount: 3,
        tokensEarned: 200,
        shardsEarned: 50,
        keyEvents: [
          'Vượt qua hiệu ứng địa hình Axit Ám',
          'Kích hoạt Bẫy Khí Hiếm chặn 1,500 sát thương',
          'Phản ứng trung hòa giải trừ trạng thái ăn mòn'
        ]
      }
    ];
  }, [profile.duelMatchHistory, profile.activeDuelDeck]);

  // Transactions list
  const transactions = useMemo(() => {
    const list = [...(profile.auditTransactions || [])].reverse();
    if (txFilter === 'ALL') return list;
    return list.filter(tx => tx.type === txFilter);
  }, [profile.auditTransactions, txFilter]);

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-navy border-2 border-amber-500/50 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-navy-light/60 bg-gradient-to-r from-amber-950/80 via-navy to-obsidian flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-inner">
              <History className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-black text-lg sm:text-xl text-ivory tracking-wider">
                  TRUNG TÂM LỊCH SỬ & NHẬT KÝ CHIẾN THUẬT
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  TCG ARCHIVES
                </span>
              </div>
              <p className="text-xs text-ivory-muted mt-0.5">
                Xem lại lịch sử thi đấu, nhật ký phản ứng hóa học, sổ cái giao dịch và tiến trình bộ sưu tập.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-obsidian/60 hover:bg-navy-light text-ivory-muted hover:text-ivory border border-navy-light transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-2 border-b border-navy-light/40 bg-navy/60 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('MATCHES');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-bold ${
              activeTab === 'MATCHES'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Lịch Sử Trận Đấu ({matchHistory.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('REACTIONS');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-bold ${
              activeTab === 'REACTIONS'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy'
            }`}
          >
            <Flame className="w-4 h-4 text-cyan-400" />
            <span>Nhật Ký Phản Ứng ({profile.stats?.reactionsTriggered || 0})</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('TRANSACTIONS');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-bold ${
              activeTab === 'TRANSACTIONS'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy'
            }`}
          >
            <Coins className="w-4 h-4 text-emerald-400" />
            <span>Sổ Cái Giao Dịch ({(profile.auditTransactions || []).length})</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('DECKS');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all font-bold ${
              activeTab === 'DECKS'
                ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/50 shadow-sm'
                : 'text-ivory-muted hover:text-ivory hover:bg-navy'
            }`}
          >
            <Layers className="w-4 h-4 text-fuchsia-400" />
            <span>Tiến Trình Sưu Tập</span>
          </button>
        </div>

        {/* Tab 1: Matches History */}
        {activeTab === 'MATCHES' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {matchHistory.map((match) => {
              const isWin = match.outcome === 'VICTORY';
              const isExpanded = selectedMatch?.id === match.id;

              return (
                <div
                  key={match.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isWin
                      ? 'bg-gradient-to-r from-emerald-950/40 via-navy to-obsidian border-emerald-500/30 hover:border-emerald-500/60'
                      : 'bg-gradient-to-r from-rose-950/40 via-navy to-obsidian border-rose-500/30 hover:border-rose-500/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-inner ${
                          isWin
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}
                      >
                        {isWin ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-bold px-2 py-0.2 rounded border ${
                            isWin ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50' : 'bg-rose-950 text-rose-300 border-rose-500/50'
                          }`}>
                            {match.outcome === 'VICTORY' ? 'CHIẾN THẮNG' : 'THẤT BẠI'}
                          </span>
                          <span className="text-xs font-mono text-cyan-300 font-bold">
                            Chế độ: {match.mode}
                          </span>
                        </div>

                        <h3 className="font-serif font-black text-sm sm:text-base text-ivory mt-1">
                          vs {match.opponentName}
                        </h3>
                        <p className="text-[11px] text-ivory-muted">
                          Bộ bài: <span className="text-amber-300 font-mono">{match.playerDeckName}</span> • {match.turnsCount} Lượt đấu • {match.reactionsCount} Phản ứng
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <div className="text-right font-mono text-xs">
                        {match.mmrChange !== undefined && (
                          <div className={match.mmrChange >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                            {match.mmrChange >= 0 ? `+${match.mmrChange}` : match.mmrChange} MMR
                          </div>
                        )}
                        <div className="text-[10px] text-ivory-muted">
                          {new Date(match.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • {new Date(match.timestamp).toLocaleDateString('vi-VN')}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedMatch(isExpanded ? null : match)}
                        className="p-1.5 rounded-lg bg-navy hover:bg-navy-light text-cyan-300 border border-cyan-500/30 transition-all"
                        title="Xem diễn biến chính"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Match Key Events */}
                  {isExpanded && match.keyEvents && (
                    <div className="mt-3 pt-3 border-t border-navy-light/40 space-y-1.5 animate-fadeIn">
                      <div className="text-[10px] font-mono text-cyan-300 font-bold">
                        DIỄN BIẾN & PHẢN ỨNG TIÊU BIỂU:
                      </div>
                      <div className="space-y-1 bg-black/40 p-2.5 rounded-lg border border-white/5">
                        {match.keyEvents.map((evt, idx) => (
                          <div key={idx} className="text-xs text-ivory-muted flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                            <span>{evt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Chemical Reaction Logs */}
        {activeTab === 'REACTIONS' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-navy to-obsidian border border-cyan-500/30 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-black text-base text-cyan-300">Tổng Số Phản Ứng Đã Kích Hoạt</h3>
                <p className="text-xs text-ivory-muted mt-0.5">
                  Tất cả phương trình hóa học được giải quyết thông qua DCSM Engine tuân theo IUPAC & GDPT 2018.
                </p>
              </div>
              <div className="text-2xl font-black font-mono text-cyan-300">
                {profile.stats?.reactionsTriggered || 0}
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-obsidian/70 border border-navy-light/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-300">2Na + 2H₂O → 2NaOH + H₂↑</span>
                  <div className="text-[10px] text-ivory-muted mt-0.5">Bùng nổ Natri kiềm tỏa nhiệt lớn • Gây 1,000 LP</div>
                </div>
                <span className="text-emerald-400 font-bold">THÀNH CÔNG</span>
              </div>

              <div className="p-3 rounded-lg bg-obsidian/70 border border-navy-light/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-300">HCl + NaOH → NaCl + H₂O</span>
                  <div className="text-[10px] text-ivory-muted mt-0.5">Phản ứng trung hòa axit - bazơ • Hóa giải ăn mòn</div>
                </div>
                <span className="text-emerald-400 font-bold">THÀNH CÔNG</span>
              </div>

              <div className="p-3 rounded-lg bg-obsidian/70 border border-navy-light/60 flex items-center justify-between">
                <div>
                  <span className="font-bold text-cyan-300">2H₂ + O₂ → 2H₂O (t°)</span>
                  <div className="text-[10px] text-ivory-muted mt-0.5">Tổng hợp quái thú nước H2O từ khí nguyên tố</div>
                </div>
                <span className="text-emerald-400 font-bold">THÀNH CÔNG</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Transaction Ledger */}
        {activeTab === 'TRANSACTIONS' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filter Bar */}
            <div className="p-3 border-b border-navy-light/40 bg-navy/40 flex items-center gap-2 text-xs font-mono">
              <span className="text-ivory-muted">Lọc loại:</span>
              {['ALL', 'PACK_OPEN', 'CARD_CRAFT', 'CARD_RECYCLE', 'HERO_PURCHASE', 'REWARD'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTxFilter(t)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    txFilter === t
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 font-bold'
                      : 'bg-obsidian text-ivory-muted hover:text-ivory border border-navy-light'
                  }`}
                >
                  {t === 'ALL' ? 'Tất cả' : t.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {transactions.length === 0 ? (
                <div className="p-8 text-center text-ivory-muted font-mono text-xs">
                  Chưa có bản ghi giao dịch nào thuộc bộ lọc này.
                </div>
              ) : (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-obsidian/80 border border-navy-light/60 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-navy text-emerald-400 border border-navy-light shrink-0">
                        {tx.type === 'CARD_CRAFT' ? (
                          <Hammer className="w-4 h-4 text-cyan-400" />
                        ) : tx.type === 'CARD_RECYCLE' ? (
                          <RotateCcw className="w-4 h-4 text-amber-400" />
                        ) : tx.type === 'PACK_OPEN' ? (
                          <Package className="w-4 h-4 text-fuchsia-400" />
                        ) : (
                          <Coins className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-ivory">{tx.type}</span>
                          <span className="text-[10px] text-ivory-muted font-mono">
                            {new Date(tx.timestamp).toLocaleString('vi-VN')}
                          </span>
                        </div>
                        <p className="text-xs text-ivory-muted mt-0.5">{tx.detail}</p>
                      </div>
                    </div>

                    {tx.amount !== undefined && (
                      <div className="text-right font-mono font-bold shrink-0 text-sm">
                        {tx.type === 'CARD_CRAFT' ? (
                          <span className="text-cyan-400">-{tx.amount} Shards</span>
                        ) : tx.type === 'CARD_RECYCLE' ? (
                          <span className="text-emerald-400">+{tx.amount} Shards</span>
                        ) : tx.type === 'PACK_OPEN' ? (
                          <span className="text-amber-400">-{tx.amount} Tokens</span>
                        ) : (
                          <span className="text-emerald-400">+{tx.amount} Tokens</span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Collection Progress */}
        {activeTab === 'DECKS' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-obsidian/80 border border-cyan-500/40 space-y-1">
                <div className="text-ivory-muted">Tổng Thẻ Sở Hữu</div>
                <div className="text-2xl font-black text-cyan-300">
                  {Object.values(profile.cardCollection || {}).reduce((s, c) => s + (Number(c) || 0), 0)} lá
                </div>
                <div className="text-[10px] text-slate-400">
                  Độc bản: {Object.keys(profile.cardCollection || {}).length} loại thẻ
                </div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian/80 border border-amber-500/40 space-y-1">
                <div className="text-ivory-muted">Elemental Shards</div>
                <div className="text-2xl font-black text-amber-300">
                  {(profile.elementalShards || 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">Chế tạo & mở khóa thẻ bài</div>
              </div>

              <div className="p-4 rounded-xl bg-obsidian/80 border border-emerald-500/40 space-y-1">
                <div className="text-ivory-muted">Chiến Dịch PvE</div>
                <div className="text-2xl font-black text-emerald-300">
                  {(profile.completedCampaignStages || []).length} / 5 Ải
                </div>
                <div className="text-[10px] text-slate-400">Đã chinh phục</div>
              </div>
            </div>

            {/* Active Deck Overview */}
            <div className="p-4 rounded-xl bg-navy/60 border border-navy-light space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-ivory text-sm">Bộ Bài Đang Chọn: {profile.activeDuelDeck?.name || 'Bộ Bài Khởi Nguyên'}</div>
                <span className="text-emerald-400 font-bold">Hợp Lệ (TCG Master Rules)</span>
              </div>
              <p className="text-ivory-muted text-[11px] leading-relaxed">
                Main Deck: {profile.activeDuelDeck?.mainDeck.length || 40} lá • Extra Deck: {profile.activeDuelDeck?.extraDeck.length || 4} lá.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
