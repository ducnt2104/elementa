// src/components/visualizations/TournamentChampionshipVisualizer.tsx
// Interactive 16-Player Chemistry Championship, Bracket Tree & Dynamic Elo Tournament Visualizer
// Fully integrated with TournamentEngine & Canonical IUPAC Scientist Personas

import React, { useState } from 'react';
import {
  TournamentEngine,
  CANONICAL_CHEMIST_ROSTER,
  TournamentMatch,
  TournamentCompetitor
} from '../../domain/tournamentEngine';
import { sound } from '../../audio/soundEngine';
import {
  Trophy,
  Swords,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  Layers,
  Activity,
  Flame,
  Shield,
  Zap,
  TrendingUp,
  Info
} from 'lucide-react';

export type TournamentVisualizerMode = 'BRACKET_TREE' | 'LIVE_SIMULATION' | 'ARCHETYPE_META_STANDINGS';

export const TournamentChampionshipVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<TournamentVisualizerMode>('BRACKET_TREE');

  // Championship state
  const [tournamentState, setTournamentState] = useState(() =>
    TournamentEngine.simulateFullChampionship(CANONICAL_CHEMIST_ROSTER)
  );

  const [selectedMatch, setSelectedMatch] = useState<TournamentMatch | null>(null);

  const handleRunFullChampionship = () => {
    sound.playUiClick();
    const result = TournamentEngine.simulateFullChampionship(CANONICAL_CHEMIST_ROSTER);
    setTournamentState(result);
    if (result.gfMatches.length > 0) {
      setSelectedMatch(result.gfMatches[0]);
    }
  };

  const { competitors, r16Matches, qfMatches, sfMatches, gfMatches, champion } = tournamentState;

  // Calculate archetype stats
  const archetypeStats = ['NITRO_LEGION', 'SULFUR_FORGE', 'ALKALI_HALOGEN', 'ORGANIC_SYNTHESIS'].map(arch => {
    const archCompetitors = competitors.filter(c => c.archetype === arch);
    const totalWins = archCompetitors.reduce((acc, c) => acc + c.matchesWon, 0);
    const totalLosses = archCompetitors.reduce((acc, c) => acc + c.matchesLost, 0);
    const totalPlayed = totalWins + totalLosses;
    const winRate = totalPlayed > 0 ? Math.round((totalWins / totalPlayed) * 100) : 0;
    return {
      archetype: arch,
      competitorsCount: archCompetitors.length,
      wins: totalWins,
      losses: totalLosses,
      winRate
    };
  });

  return (
    <div className="bg-obsidian-surface border border-yellow-500/30 rounded-2xl p-6 text-ivory shadow-2xl space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-yellow-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
              ELEMENTA World Championship • 16 Tuyển Thủ
            </span>
            <span className="text-xs text-ivory-muted">Canonical IUPAC Chemistry Personas & Elo Engine</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 mt-1">
            Giải Đấu Vô Địch Hóa Học 16 Tuyển Thủ
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Mô phỏng nhánh đấu loại trực tiếp, đối đầu hệ nguyên tố, cập nhật Elo và vinh danh Nhà Vô Địch
          </p>
        </div>

        {/* MODE NAVIGATION TABS */}
        <div className="flex items-center bg-obsidian-deep/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('BRACKET_TREE');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'BRACKET_TREE'
                ? 'bg-yellow-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>1. Nhánh Đấu (Bracket)</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('LIVE_SIMULATION');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'LIVE_SIMULATION'
                ? 'bg-yellow-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>2. Mô Phỏng Đấu Trí</span>
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('ARCHETYPE_META_STANDINGS');
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'ARCHETYPE_META_STANDINGS'
                ? 'bg-yellow-500 text-obsidian shadow-md font-extrabold'
                : 'text-ivory-muted hover:text-ivory'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>3. Bảng Xếp Hạng & Meta</span>
          </button>
        </div>
      </div>

      {/* CHAMPION BANNER */}
      {champion && (
        <div className="bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-transparent border border-yellow-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-yellow-300 shadow-lg shadow-yellow-500/20 shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-widest block">
                Đương Kim Vô Địch ELEMENTA Cup
              </span>
              <h3 className="text-xl font-black text-ivory flex items-center gap-2 mt-0.5">
                <span>{champion.name}</span>
                <span className="text-xs font-mono text-yellow-300 bg-yellow-500/20 px-2 py-0.5 rounded border border-yellow-500/30">
                  Elo {champion.rating}
                </span>
              </h3>
              <p className="text-xs text-ivory-muted italic">{champion.titleVI} • Hệ: {champion.archetype}</p>
            </div>
          </div>

          <button
            onClick={handleRunFullChampionship}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-yellow-500 text-obsidian hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition-all font-mono"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mô Phỏng Giải Đấu Mới</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: 16-PLAYER ELIMINATION BRACKET TREE                               */}
      {/* ========================================================================= */}
      {activeMode === 'BRACKET_TREE' && (
        <div className="space-y-6 animate-fadeIn">
          {/* 4-Round Columns Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
            {/* Column 1: Round of 16 */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider text-center border-b border-white/10 pb-2">
                Vòng 1/8 (Round of 16)
              </div>
              <div className="space-y-2.5">
                {r16Matches.map(m => (
                  <div
                    key={m.matchId}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMatch(m);
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedMatch?.matchId === m.matchId
                        ? 'bg-yellow-500/20 border-yellow-400 shadow-lg'
                        : 'bg-obsidian-deep/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-ivory-muted mb-1 font-mono">
                      <span>{m.matchId}</span>
                      <span>{m.turns} hiệp</span>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex justify-between items-center ${m.winner?.id === m.competitorA.id ? 'font-bold text-yellow-300' : 'text-ivory-muted'}`}>
                        <span className="truncate">#{m.competitorA.seed} {m.competitorA.name}</span>
                        <span className="font-mono">{m.finalScoreA} LP</span>
                      </div>
                      <div className={`flex justify-between items-center ${m.winner?.id === m.competitorB.id ? 'font-bold text-yellow-300' : 'text-ivory-muted'}`}>
                        <span className="truncate">#{m.competitorB.seed} {m.competitorB.name}</span>
                        <span className="font-mono">{m.finalScoreB} LP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Quarter Finals */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider text-center border-b border-white/10 pb-2">
                Tứ Kết (Quarter Finals)
              </div>
              <div className="space-y-6 pt-3">
                {qfMatches.map(m => (
                  <div
                    key={m.matchId}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMatch(m);
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedMatch?.matchId === m.matchId
                        ? 'bg-yellow-500/20 border-yellow-400 shadow-lg'
                        : 'bg-obsidian-deep/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-ivory-muted mb-1 font-mono">
                      <span>{m.matchId}</span>
                      <span>{m.turns} hiệp</span>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex justify-between items-center ${m.winner?.id === m.competitorA.id ? 'font-bold text-yellow-300' : 'text-ivory-muted'}`}>
                        <span className="truncate">{m.competitorA.name}</span>
                        <span className="font-mono">{m.finalScoreA} LP</span>
                      </div>
                      <div className={`flex justify-between items-center ${m.winner?.id === m.competitorB.id ? 'font-bold text-yellow-300' : 'text-ivory-muted'}`}>
                        <span className="truncate">{m.competitorB.name}</span>
                        <span className="font-mono">{m.finalScoreB} LP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Semi Finals */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-orange-400 uppercase tracking-wider text-center border-b border-white/10 pb-2">
                Bán Kết (Semi Finals)
              </div>
              <div className="space-y-14 pt-8">
                {sfMatches.map(m => (
                  <div
                    key={m.matchId}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMatch(m);
                    }}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedMatch?.matchId === m.matchId
                        ? 'bg-yellow-500/20 border-yellow-400 shadow-lg'
                        : 'bg-obsidian-deep/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-ivory-muted mb-1 font-mono">
                      <span>{m.matchId}</span>
                      <span>{m.turns} hiệp</span>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex justify-between items-center ${m.winner?.id === m.competitorA.id ? 'font-bold text-yellow-300' : 'text-ivory-muted'}`}>
                        <span className="truncate">{m.competitorA.name}</span>
                        <span className="font-mono">{m.finalScoreA} LP</span>
                      </div>
                      <div className={`flex justify-between items-center ${m.winner?.id === m.competitorB.id ? 'font-bold text-yellow-300' : 'text-ivory-muted'}`}>
                        <span className="truncate">{m.competitorB.name}</span>
                        <span className="font-mono">{m.finalScoreB} LP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 4: Grand Finals */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold text-yellow-400 uppercase tracking-wider text-center border-b border-white/10 pb-2">
                Chung Kết (Grand Finals)
              </div>
              <div className="pt-24">
                {gfMatches.map(m => (
                  <div
                    key={m.matchId}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedMatch(m);
                    }}
                    className={`p-4 rounded-xl border-2 text-xs cursor-pointer transition-all ${
                      selectedMatch?.matchId === m.matchId
                        ? 'bg-yellow-500/30 border-yellow-400 shadow-xl scale-105'
                        : 'bg-obsidian-deep/90 border-yellow-500/40 hover:border-yellow-400'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] text-yellow-300 font-extrabold mb-1.5 font-mono">
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-yellow-400" />
                        CHUNG KẾT
                      </span>
                      <span>{m.turns} hiệp</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className={`flex justify-between items-center ${m.winner?.id === m.competitorA.id ? 'font-black text-yellow-300 text-sm' : 'text-ivory-muted'}`}>
                        <span className="truncate">{m.competitorA.name}</span>
                        <span className="font-mono">{m.finalScoreA} LP</span>
                      </div>
                      <div className={`flex justify-between items-center ${m.winner?.id === m.competitorB.id ? 'font-black text-yellow-300 text-sm' : 'text-ivory-muted'}`}>
                        <span className="truncate">{m.competitorB.name}</span>
                        <span className="font-mono">{m.finalScoreB} LP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Match Details Inspector Drawer */}
          {selectedMatch && (
            <div className="bg-obsidian-deep/90 rounded-2xl border border-yellow-500/30 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Chi tiết trận đấu: {selectedMatch.matchId} ({selectedMatch.round})
                </span>
                <span className="text-xs font-mono text-ivory-muted">
                  Thời lượng: {selectedMatch.turns} lượt • {selectedMatch.tieBreakerUsed ? 'Dùng Tie-breaker ATK' : 'Quyết định bằng LP'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Competitor A */}
                <div className={`p-4 rounded-xl border ${selectedMatch.winner?.id === selectedMatch.competitorA.id ? 'bg-yellow-500/10 border-yellow-400' : 'bg-obsidian-surface border-white/5'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-ivory-muted">Hạt giống #{selectedMatch.competitorA.seed}</span>
                      <h4 className="text-base font-bold text-ivory">{selectedMatch.competitorA.name}</h4>
                      <p className="text-xs text-ivory-muted italic">{selectedMatch.competitorA.titleVI}</p>
                    </div>
                    <span className="text-lg font-mono font-black text-yellow-300">{selectedMatch.finalScoreA} LP</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-between text-xs font-mono">
                    <span className="text-ivory-muted">Hệ: <strong className="text-ivory">{selectedMatch.competitorA.archetype}</strong></span>
                    <span className={selectedMatch.eloChangeA >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      Elo: {selectedMatch.competitorA.rating} ({selectedMatch.eloChangeA >= 0 ? `+${selectedMatch.eloChangeA}` : selectedMatch.eloChangeA})
                    </span>
                  </div>
                </div>

                {/* Competitor B */}
                <div className={`p-4 rounded-xl border ${selectedMatch.winner?.id === selectedMatch.competitorB.id ? 'bg-yellow-500/10 border-yellow-400' : 'bg-obsidian-surface border-white/5'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-ivory-muted">Hạt giống #{selectedMatch.competitorB.seed}</span>
                      <h4 className="text-base font-bold text-ivory">{selectedMatch.competitorB.name}</h4>
                      <p className="text-xs text-ivory-muted italic">{selectedMatch.competitorB.titleVI}</p>
                    </div>
                    <span className="text-lg font-mono font-black text-yellow-300">{selectedMatch.finalScoreB} LP</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 flex justify-between text-xs font-mono">
                    <span className="text-ivory-muted">Hệ: <strong className="text-ivory">{selectedMatch.competitorB.archetype}</strong></span>
                    <span className={selectedMatch.eloChangeB >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      Elo: {selectedMatch.competitorB.rating} ({selectedMatch.eloChangeB >= 0 ? `+${selectedMatch.eloChangeB}` : selectedMatch.eloChangeB})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: LIVE SIMULATION CONTROLS                                         */}
      {/* ========================================================================= */}
      {activeMode === 'LIVE_SIMULATION' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-obsidian-deep/90 rounded-2xl border border-white/10 p-6 space-y-4">
            <h3 className="text-base font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
              <Swords className="w-5 h-5" />
              Bàn Điều Khiển Mô Phỏng Giải Đấu Đấu Trí TCG
            </h3>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Mỗi trận đấu được tính toán dựa trên chỉ số xếp hạng Elo của hai tuyển thủ, tương tác khắc chế giữa các hệ hóa học (Nitrogen, Sulfur, Kim loại kiềm/Halogen, Hóa hữu cơ), và độ dài trận đấu ngẫu nhiên từ 7 đến 15 lượt.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleRunFullChampionship}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-yellow-500 to-amber-500 text-obsidian shadow-lg hover:brightness-110 transition-all font-mono"
              >
                <Play className="w-4 h-4 fill-obsidian" />
                <span>Mô Phỏng Lại Toàn Bộ 15 Trận Đấu</span>
              </button>
            </div>
          </div>

          {/* Quick Round Summaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-obsidian-deep/80 rounded-xl border border-white/10 p-4 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                Kết Quả Vòng 1/8 (8 Trận Đấu)
              </span>
              <div className="space-y-1.5 text-xs">
                {r16Matches.map(m => (
                  <div key={m.matchId} className="flex justify-between items-center text-ivory-muted border-b border-white/5 pb-1">
                    <span>{m.matchId}: <strong className="text-yellow-300">{m.winner?.name}</strong> thắng {m.loser?.name}</span>
                    <span className="font-mono text-[10px] text-ivory-muted">({m.turns} lượt)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-obsidian-deep/80 rounded-xl border border-white/10 p-4 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Kết Quả Vòng Tứ Kết & Bán Kết
              </span>
              <div className="space-y-1.5 text-xs">
                {qfMatches.concat(sfMatches).map(m => (
                  <div key={m.matchId} className="flex justify-between items-center text-ivory-muted border-b border-white/5 pb-1">
                    <span>{m.matchId}: <strong className="text-yellow-300">{m.winner?.name}</strong> thắng {m.loser?.name}</span>
                    <span className="font-mono text-[10px] text-ivory-muted">({m.turns} lượt)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: ARCHETYPE META & STANDINGS                                       */}
      {/* ========================================================================= */}
      {activeMode === 'ARCHETYPE_META_STANDINGS' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Archetype Win Rates */}
          <div>
            <h3 className="text-xs font-bold text-ivory-muted uppercase tracking-wider block mb-3">
              Thống Kê Tỷ Lệ Thắng Của 4 Hệ Nguyên Tố (Archetype Meta):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {archetypeStats.map(stat => (
                <div key={stat.archetype} className="bg-obsidian-deep/80 rounded-xl border border-white/10 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-yellow-400">{stat.archetype}</span>
                    <span className="text-xs font-mono font-bold text-ivory">{stat.winRate}% WR</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${stat.winRate}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-ivory-muted flex justify-between font-mono">
                    <span>{stat.wins} Thắng - {stat.losses} Thua</span>
                    <span>{stat.competitorsCount} Tuyển thủ</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 16 Competitor Standings Table */}
          <div className="bg-obsidian-deep/90 rounded-2xl border border-white/10 p-5 space-y-3">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">
              Bảng Xếp Hạng 16 Tuyển Thủ Sau Giải Đấu (Xếp Theo Elo & Thành Tích):
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-ivory-muted text-[10px] uppercase">
                    <th className="p-2">Hạng</th>
                    <th className="p-2">Tuyển Thủ</th>
                    <th className="p-2">Hệ Hóa Học</th>
                    <th className="p-2">Điểm Elo</th>
                    <th className="p-2">Thắng/Thua</th>
                    <th className="p-2">Vòng Đấu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[...competitors]
                    .sort((a, b) => b.rating - a.rating || b.matchesWon - a.matchesWon)
                    .map((comp, idx) => (
                      <tr key={comp.id} className={comp.isChampion ? 'bg-yellow-500/10 font-bold text-yellow-300' : 'text-ivory'}>
                        <td className="p-2 font-bold">#{idx + 1}</td>
                        <td className="p-2 font-bold text-ivory flex items-center gap-1.5">
                          {comp.isChampion && <Trophy className="w-3.5 h-3.5 text-yellow-400 inline" />}
                          <span>{comp.name}</span>
                          <span className="text-[10px] text-ivory-muted font-normal">({comp.titleVI})</span>
                        </td>
                        <td className="p-2 text-ivory-muted">{comp.archetype}</td>
                        <td className="p-2 text-yellow-300 font-bold">{comp.rating}</td>
                        <td className="p-2 text-emerald-400">{comp.matchesWon}W - {comp.matchesLost}L</td>
                        <td className="p-2 text-ivory-muted">
                          {comp.isChampion ? 'QUÁN QUÂN' : `Bị loại ở ${comp.eliminatedInRound}`}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
