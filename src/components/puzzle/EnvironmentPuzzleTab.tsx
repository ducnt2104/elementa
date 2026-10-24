// src/components/puzzle/EnvironmentPuzzleTab.tsx
// Chemical Environment Tactical Puzzle Challenges (GDPT 2018 & IUPAC Compliant)

import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  XCircle,
  Flame,
  Droplets,
  Gauge,
  Sparkles,
  Award,
  ChevronRight,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  Coins
} from 'lucide-react';
import { sound } from '../../audio/soundEngine';
import { PUZZLES, ChemicalPuzzle, validatePuzzleSolution } from '../../data/puzzlesData';
import { PlayerProfile } from '../../domain/types';

export interface EnvironmentPuzzleTabProps {
  profile?: PlayerProfile;
  onPuzzleSolved?: (puzzleId: string, reward: { knowledgeTokens: number; elementalShards: number }) => void;
  onBackToMenu?: () => void;
}

export const EnvironmentPuzzleTab: React.FC<EnvironmentPuzzleTabProps> = ({
  profile,
  onPuzzleSolved,
  onBackToMenu
}) => {
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<string[]>(
    profile?.solvedPuzzleIds || []
  );
  const [lastRewardClaimed, setLastRewardClaimed] = useState<{ knowledgeTokens: number; elementalShards: number } | null>(null);

  const puzzle = PUZZLES[currentPuzzleIdx] || PUZZLES[0];
  const selectedOption = puzzle.options.find((o) => o.id === selectedOptionId);

  const handleSelectOption = (optId: string) => {
    if (hasSubmitted) return;
    sound.playUiClick();
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);
    const result = validatePuzzleSolution(puzzle.id, selectedOption.id);
    if (result.isCorrect) {
      sound.playVictory();
      if (!solvedPuzzleIds.includes(puzzle.id)) {
        const nextSolved = [...solvedPuzzleIds, puzzle.id];
        setSolvedPuzzleIds(nextSolved);
        if (result.reward) {
          setLastRewardClaimed(result.reward);
          onPuzzleSolved?.(puzzle.id, result.reward);
        }
      }
    } else {
      sound.playErrorFizzle();
      setLastRewardClaimed(null);
    }
  };

  const handleNextPuzzle = () => {
    sound.playUiClick();
    const nextIdx = (currentPuzzleIdx + 1) % PUZZLES.length;
    setCurrentPuzzleIdx(nextIdx);
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setLastRewardClaimed(null);
  };

  const handleResetCurrent = () => {
    sound.playUiClick();
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setLastRewardClaimed(null);
  };

  return (
    <div className="min-h-screen bg-obsidian text-ivory p-4 max-w-5xl mx-auto flex flex-col gap-4 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-navy/80 via-slate-900 to-navy/80 border border-purple-500/30 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          {onBackToMenu && (
            <button
              onClick={() => {
                sound.playUiClick();
                onBackToMenu();
              }}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="Quay lại Menu"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Quay Lại</span>
            </button>
          )}

          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Brain className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-white">
              CÂU ĐỐ MÔI TRƯỜNG CHIẾN THUẬT (CHEMICAL PUZZLES)
            </h1>
            <p className="text-xs text-slate-400">
              Vận dụng nhiệt động học, pH, Le Chatelier & thế khử IUPAC để giải cứu hệ sinh thái
            </p>
          </div>
        </div>

        {/* Score & Progress */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-purple-500/40">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300">Đã Hoàn Thành:</span>
            <span className="text-sm font-black font-mono text-purple-300">
              {solvedPuzzleIds.length} / {PUZZLES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Puzzle Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {PUZZLES.map((p, idx) => {
          const isCurrent = idx === currentPuzzleIdx;
          const isSolved = solvedPuzzleIds.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => {
                sound.playUiClick();
                setCurrentPuzzleIdx(idx);
                setSelectedOptionId(null);
                setHasSubmitted(false);
                setLastRewardClaimed(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                isCurrent
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/40 scale-105'
                  : isSolved
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {isSolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{p.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Puzzle Card */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col gap-4">
        {/* Title, Difficulty & Rewards */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-black text-white">{puzzle.title}</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/80 border border-amber-500/40 text-amber-300">
              <Coins className="w-3 h-3 text-amber-400" />
              <span>+{puzzle.reward.knowledgeTokens} Tokens</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>+{puzzle.reward.elementalShards} Shards</span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                puzzle.difficulty === 'CƠ BẢN'
                  ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                  : puzzle.difficulty === 'TRUNG CẤP'
                  ? 'bg-amber-950 border-amber-500/60 text-amber-300'
                  : 'bg-rose-950 border-rose-500/60 text-rose-300'
              }`}
            >
              {puzzle.difficulty}
            </span>
          </div>
        </div>

        {/* Environmental Telemetry Panel */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-rose-400">
              <Droplets className="w-4 h-4" />
              <span>pH Ban Đầu: <strong className="font-mono text-white">{puzzle.environmentContext.initialPh}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <Flame className="w-4 h-4" />
              <span>Nhiệt Độ: <strong className="font-mono text-white">{puzzle.environmentContext.initialTemp}°C</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-400">
              <Gauge className="w-4 h-4" />
              <span>Áp Suất: <strong className="font-mono text-white">{puzzle.environmentContext.initialPressure} atm</strong></span>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Chuẩn Đo Lường IUPAC / GDPT 2018</span>
        </div>

        {/* Scenario & Goal */}
        <div className="flex flex-col gap-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-300 leading-relaxed">
            <span className="text-slate-400 font-bold block mb-1">Tình huống thực địa:</span>
            {puzzle.environmentContext.scenarioVI}
          </div>
          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/40 text-purple-200 font-medium">
            <span className="text-purple-300 font-bold block mb-0.5">Mục tiêu giải pháp:</span>
            {puzzle.goalVI}
          </div>
        </div>

        {/* Options Picker */}
        <div className="flex flex-col gap-2.5 mt-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Chọn Phương Án Hóa Học:</span>
          {puzzle.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            let optStyle = 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300';
            if (isSelected) {
              optStyle = 'bg-purple-950/50 border-purple-500 text-white shadow-md shadow-purple-900/30';
            }
            if (hasSubmitted) {
              if (opt.isCorrect) {
                optStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30';
              } else if (isSelected && !opt.isCorrect) {
                optStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 shadow-md shadow-rose-900/30';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${optStyle}`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{opt.label}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 border border-white/10 text-cyan-300">
                      {opt.reagentFormula}
                    </span>
                  </div>
                  {hasSubmitted && (
                    <p className="text-[11px] opacity-90 leading-relaxed mt-1 font-sans">
                      {opt.scientificOutcomeVI}
                    </p>
                  )}
                </div>
                {hasSubmitted && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                )}
                {hasSubmitted && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Reward celebration toast */}
        {hasSubmitted && lastRewardClaimed && (
          <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-900/50 via-teal-900/40 to-slate-900 border border-emerald-500/50 flex items-center justify-between text-xs animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>GIẢI MÃ THÀNH CÔNG! Đã cộng phần thưởng vào tài khoản:</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-amber-300">+{lastRewardClaimed.knowledgeTokens} Tokens</span>
              <span className="font-mono font-bold text-cyan-300">+{lastRewardClaimed.elementalShards} Shards</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={handleResetCurrent}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Chọn Lại
          </button>

          {!hasSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOptionId}
              className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                selectedOptionId
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Xác Nhận Giải Pháp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNextPuzzle}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-obsidian font-black text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 transition-all"
            >
              <span>Câu Đố Kế Tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Educational Curriculum Standards Breakdown */}
        {hasSubmitted && (
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Giải Thích Khoa Học & Chuẩn Giáo Dục (GDPT 2018)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{puzzle.explanationVI}</p>
            <span className="text-[11px] font-mono text-slate-500">{puzzle.iupacCurriculumStandard}</span>
          </div>
        )}
      </div>
    </div>
  );
};
