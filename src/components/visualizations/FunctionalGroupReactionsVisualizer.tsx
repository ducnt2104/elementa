// src/components/visualizations/FunctionalGroupReactionsVisualizer.tsx
// ============================================================================
// ELEMENTA QUALITATIVE ORGANIC FUNCTIONAL GROUP IDENTIFICATION SIMULATOR
// Standards: IUPAC Analytical Chemistry & Vietnam GDPT 2018 Chemistry 11-12
// Covers: Unsaturation (Br2/KMnO4), Terminal Alkyne, Vicinal Polyols (Cu(OH)2 complex),
// Phenols (Br2 white ppt/FeCl3 purple), Aldehydes (Silver mirror/Cu2O red), Iodoform (CHI3 yellow),
// Carboxylic Acids (NaHCO3 CO2 gas), and Aniline (Br2 white ppt).
// ============================================================================

import React, { useState, useMemo } from 'react';
import {
  ORGANIC_SUBSTANCES,
  REAGENTS,
  OrganicSubstance,
  ChemicalReagent,
  simulateReagentTest,
  deduceCandidateSubstances,
} from '../../domain/functionalGroupReactionsEngine';
import { sound } from '../../audio/soundEngine';

export interface FunctionalGroupReactionsVisualizerProps {
  initialSubstanceId?: string;
}

export const FunctionalGroupReactionsVisualizer: React.FC<FunctionalGroupReactionsVisualizerProps> = ({
  initialSubstanceId,
}) => {
  const [selectedSubstanceId, setSelectedSubstanceId] = useState<string>(
    initialSubstanceId || 'acetaldehyde'
  );
  const [selectedReagentId, setSelectedReagentId] = useState<string>('tollens_silver');
  const [heatingApplied, setHeatingApplied] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'reactions' | 'deduction' | 'matrix'>('reactions');

  // Deduction quiz state
  const [quizFilterBromine, setQuizFilterBromine] = useState<'ANY' | 'POSITIVE' | 'NEGATIVE'>('ANY');
  const [quizFilterCuOH2, setQuizFilterCuOH2] = useState<'ANY' | 'POSITIVE' | 'NEGATIVE'>('ANY');
  const [quizFilterNaHCO3, setQuizFilterNaHCO3] = useState<'ANY' | 'POSITIVE' | 'NEGATIVE'>('ANY');

  const substance: OrganicSubstance =
    ORGANIC_SUBSTANCES[selectedSubstanceId] || ORGANIC_SUBSTANCES.acetaldehyde;
  const reagent: ChemicalReagent = REAGENTS[selectedReagentId] || REAGENTS.tollens_silver;

  // Run real-time simulation
  const result = useMemo(() => {
    return simulateReagentTest(selectedSubstanceId, selectedReagentId, heatingApplied);
  }, [selectedSubstanceId, selectedReagentId, heatingApplied]);

  // Candidate deduction filter
  const candidateSubstances = useMemo(() => {
    const filters: { reagentId: string; mustBePositive: boolean }[] = [];
    if (quizFilterBromine !== 'ANY') {
      filters.push({ reagentId: 'bromine_water', mustBePositive: quizFilterBromine === 'POSITIVE' });
    }
    if (quizFilterCuOH2 !== 'ANY') {
      filters.push({ reagentId: 'cuoh2_fresh', mustBePositive: quizFilterCuOH2 === 'POSITIVE' });
    }
    if (quizFilterNaHCO3 !== 'ANY') {
      filters.push({ reagentId: 'nahco3_solution', mustBePositive: quizFilterNaHCO3 === 'POSITIVE' });
    }
    return deduceCandidateSubstances(filters);
  }, [quizFilterBromine, quizFilterCuOH2, quizFilterNaHCO3]);

  // Action handlers
  const handleSelectReagent = (rId: string) => {
    sound.playUiClick();
    setSelectedReagentId(rId);
  };

  const handleSelectSubstance = (sId: string) => {
    sound.playUiClick();
    setSelectedSubstanceId(sId);
  };

  const handleToggleHeating = () => {
    sound.playUiClick();
    const nextHeating = !heatingApplied;
    setHeatingApplied(nextHeating);
    if (nextHeating && result.requiresHeating) {
      if (result.gasEvolved) {
        sound.playGasBubblingFizz?.();
      } else {
        sound.playPrecipitateFormChime?.();
      }
    }
  };

  const handleTestNow = () => {
    sound.playUiClick();
    if (result.isPositive) {
      if (result.gasEvolved) {
        sound.playGasBubblingFizz?.();
      } else {
        sound.playPrecipitateFormChime?.();
      }
    }
  };

  return (
    <div className="bg-navy/90 border border-rose-500/40 rounded-2xl p-5 sm:p-6 text-ivory shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              IUPAC ANALYTICAL & GDPT 2018 (HÓA 11-12)
            </span>
            <span className="text-xs text-ivory-muted font-mono">Nhận Biết Định Tính Nhóm Chức Hữu Cơ</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
            <span>🧪 Mô Phỏng Nhận Biết Nhóm Chức & Phản Ứng Màu Đặc Trưng</span>
          </h2>
          <p className="text-xs text-ivory-muted mt-1 max-w-3xl">
            Khảo sát các phản ứng hóa học đặc trưng dùng để phân biệt các loại nhóm chức hữu cơ:
            liên kết đôi, liên kết ba đầu mạch, ancol đa chức lân cận, phenol, anđehit, xeton, axit cacboxylic và amin thơm.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-1.5 bg-obsidian/60 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('reactions');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'reactions'
                ? 'bg-rose-500 text-white shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Thí Nghiệm Nhận Biết
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('deduction');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'deduction'
                ? 'bg-rose-500 text-white shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Giải Đoán Ẩn Số (Deduction)
          </button>
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('matrix');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'matrix'
                ? 'bg-rose-500 text-white shadow font-extrabold'
                : 'text-ivory-muted hover:text-white'
            }`}
          >
            Ma Trận Thuốc Thử Tổng Hợp
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INTERACTIVE TEST TUBE EXPERIMENTAL SIMULATOR                       */}
      {/* ========================================================================= */}
      {activeTab === 'reactions' && (
        <div className="space-y-6">
          {/* Substance & Reagent Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Substance Selector */}
            <div className="bg-obsidian/50 p-4 rounded-xl border border-navy-light/40 space-y-2">
              <span className="text-xs font-mono text-cyan-300 font-bold block">
                1. CHỌN MẪU THỬ HỮU CƠ CẦN NHẬN BIẾT:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(ORGANIC_SUBSTANCES).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSubstance(s.id)}
                    className={`p-2 rounded-lg text-xs font-bold border transition-all text-left ${
                      selectedSubstanceId === s.id
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow ring-1 ring-cyan-400'
                        : 'bg-navy/40 border-navy-light/40 text-ivory-muted hover:text-white hover:bg-navy/70'
                    }`}
                  >
                    <div className="truncate">{s.nameVI}</div>
                    <div className="text-[10px] font-mono text-cyan-400">{s.formula}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reagent Selector */}
            <div className="bg-obsidian/50 p-4 rounded-xl border border-navy-light/40 space-y-2">
              <span className="text-xs font-mono text-amber-300 font-bold block">
                2. CHỌN THUỐC THỬ PHÂN TÍCH:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(REAGENTS).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelectReagent(r.id)}
                    className={`p-2 rounded-lg text-xs font-bold border transition-all text-left flex items-center gap-2 ${
                      selectedReagentId === r.id
                        ? 'bg-amber-950/60 border-amber-400 text-amber-200 shadow ring-1 ring-amber-400'
                        : 'bg-navy/40 border-navy-light/40 text-ivory-muted hover:text-white hover:bg-navy/70'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: r.initialColorRgb }}
                    />
                    <div className="truncate text-[11px]">{r.nameVI.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Test Tube Reaction Rig & Observation Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-obsidian/70 p-5 rounded-xl border border-navy-light/40">
            {/* SVG Test Tube Visualization */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-3">
              <svg viewBox="0 0 200 280" className="w-48 h-auto select-none">
                {/* Pipette / Dropper adding sample */}
                <path d="M 95 10 L 105 10 L 102 50 L 98 50 Z" fill="#94a3b8" />
                <circle cx="100" cy="58" r="3" fill="#38bdf8" className="animate-bounce" />

                {/* Glass Test Tube Outer Wall */}
                <path
                  d="M 70 60 L 70 230 A 30 30 0 0 0 130 230 L 130 60"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3"
                />
                <ellipse cx="100" cy="60" rx="30" ry="6" fill="none" stroke="#94a3b8" strokeWidth="2" />

                {/* Liquid Level inside tube */}
                <path
                  d="M 72 140 L 72 230 A 28 28 0 0 0 128 230 L 128 140 Z"
                  fill={result.afterColorRgb}
                  opacity="0.85"
                  className="transition-colors duration-500"
                />
                <ellipse
                  cx="100"
                  cy="140"
                  rx="28"
                  ry="5"
                  fill={result.afterColorRgb}
                  opacity="0.9"
                  className="transition-colors duration-500"
                />

                {/* Silver mirror coating on inner tube wall if positive Tollens */}
                {result.isPositive && selectedReagentId === 'tollens_silver' && heatingApplied && (
                  <path
                    d="M 73 140 L 73 230 A 27 27 0 0 0 127 230 L 127 140"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="4"
                    strokeDasharray="2 2"
                    style={{ filter: 'drop-shadow(0 0 6px #ffffff)' }}
                  />
                )}

                {/* Precipitate settling at bottom */}
                {result.precipitateColorRgb && (
                  <path
                    d="M 78 238 A 22 18 0 0 0 122 238 Z"
                    fill={result.precipitateColorRgb}
                    style={{ filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.5))' }}
                  />
                )}

                {/* Rising Gas Bubbles if CO2 evolved */}
                {result.gasEvolved && (
                  <g className="animate-pulse">
                    <circle cx="92" cy="190" r="3" fill="#ffffff" opacity="0.8" />
                    <circle cx="108" cy="175" r="4" fill="#ffffff" opacity="0.8" />
                    <circle cx="98" cy="155" r="3.5" fill="#ffffff" opacity="0.8" />
                    <circle cx="104" cy="135" r="2.5" fill="#ffffff" opacity="0.8" />
                  </g>
                )}

                {/* Bunsen burner flame under tube if heatingApplied */}
                {heatingApplied && (
                  <g className="animate-pulse">
                    <ellipse cx="100" cy="275" rx="14" ry="4" fill="#3b82f6" opacity="0.6" />
                    <path
                      d="M 92 275 Q 100 248 108 275 Z"
                      fill="#f97316"
                      style={{ filter: 'drop-shadow(0 0 8px #f97316)' }}
                    />
                    <path d="M 96 275 Q 100 255 104 275 Z" fill="#facc15" />
                  </g>
                )}
              </svg>

              {/* Flame control button */}
              <button
                onClick={handleToggleHeating}
                className={`mt-3 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                  heatingApplied
                    ? 'bg-orange-600 text-white border-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.6)]'
                    : 'bg-navy border-navy-light text-ivory-muted hover:text-white'
                }`}
              >
                {heatingApplied ? '🔥 Đèn Cồn: ĐANG ĐUN NÓNG (t°)' : '❄ Nhiệt Độ Thường (Chưa đun)'}
              </button>
            </div>

            {/* Observation Verdict & Chemical Details Panel */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-ivory-muted">KẾT QUẢ PHẢN ỨNG:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                    result.isPositive
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-500/20 text-slate-300 border-slate-500/40'
                  }`}
                >
                  {result.isPositive ? '✓ PHẢN ỨNG DƯƠNG TÍNH' : '✗ ÂM TÍNH (KHÔNG PHẢN ỨNG)'}
                </span>
              </div>

              {/* Phenomenon Box */}
              <div className="p-3.5 rounded-xl bg-navy/60 border border-navy-light/40 space-y-1">
                <div className="text-xs font-bold text-amber-300">Hiện tượng quan sát được:</div>
                <div className="text-xs text-white leading-relaxed">{result.visualObservationVI}</div>
              </div>

              {/* Chemical Equation Box */}
              <div className="p-3.5 rounded-xl bg-obsidian border border-teal-500/30 space-y-1 font-mono text-xs">
                <div className="text-teal-300 font-bold">Phương trình hóa học xảy ra:</div>
                <div className="text-cyan-200 text-sm font-bold overflow-x-auto py-1">
                  {result.chemicalEquation}
                </div>
              </div>

              {/* Diagnostic Pedagogical Significance */}
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs space-y-0.5">
                <div className="font-bold text-purple-300">Ý nghĩa nhận biết & Chuẩn GDPT 2018:</div>
                <div className="text-ivory-muted">{result.diagnosticMeaningVI}</div>
              </div>

              {/* Play reaction sound trigger */}
              <button
                onClick={handleTestNow}
                className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all"
              >
                🔔 Tái Hiện Âm Thanh Phản Ứng (Sủi bọt / Kết tủa)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MULTI-STEP DEDUCTIVE DIAGNOSTIC QUIZ                               */}
      {/* ========================================================================= */}
      {activeTab === 'deduction' && (
        <div className="space-y-4 bg-obsidian/50 p-4 rounded-xl border border-navy-light/40">
          <div>
            <h3 className="text-sm font-bold text-white">
              Bài Toán Giải Đoán Chất Hữu Cơ Dựa Trên Hiện Tượng Thí Nghiệm
            </h3>
            <p className="text-xs text-ivory-muted">
              Thiết lập các điều kiện thí nghiệm thực tế để lọc ra các chất hữu cơ thỏa mãn đồng thời các hiện tượng quan sát được.
            </p>
          </div>

          {/* Filter Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40 space-y-1.5">
              <div className="text-xs font-bold text-amber-300">Nước Brom (Br2):</div>
              <div className="flex gap-1">
                {(['ANY', 'POSITIVE', 'NEGATIVE'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setQuizFilterBromine(mode)}
                    className={`flex-1 py-1 text-[10px] font-mono font-bold rounded ${
                      quizFilterBromine === mode
                        ? 'bg-amber-500 text-obsidian'
                        : 'bg-obsidian text-ivory-muted'
                    }`}
                  >
                    {mode === 'ANY' ? 'Bất kỳ' : mode === 'POSITIVE' ? 'Mất màu / Kết tủa' : 'Không pư'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40 space-y-1.5">
              <div className="text-xs font-bold text-cyan-300">Đồng(II) hiđroxit (Cu(OH)2):</div>
              <div className="flex gap-1">
                {(['ANY', 'POSITIVE', 'NEGATIVE'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setQuizFilterCuOH2(mode)}
                    className={`flex-1 py-1 text-[10px] font-mono font-bold rounded ${
                      quizFilterCuOH2 === mode
                        ? 'bg-cyan-500 text-obsidian'
                        : 'bg-obsidian text-ivory-muted'
                    }`}
                  >
                    {mode === 'ANY' ? 'Bất kỳ' : mode === 'POSITIVE' ? 'Phức xanh / Đỏ gạch' : 'Không pư'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-navy/60 border border-navy-light/40 space-y-1.5">
              <div className="text-xs font-bold text-rose-300">Natri hiđrocacbonat (NaHCO3):</div>
              <div className="flex gap-1">
                {(['ANY', 'POSITIVE', 'NEGATIVE'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setQuizFilterNaHCO3(mode)}
                    className={`flex-1 py-1 text-[10px] font-mono font-bold rounded ${
                      quizFilterNaHCO3 === mode
                        ? 'bg-rose-500 text-white'
                        : 'bg-obsidian text-ivory-muted'
                    }`}
                  >
                    {mode === 'ANY' ? 'Bất kỳ' : mode === 'POSITIVE' ? 'Sủi bọt CO2' : 'Không pư'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Candidate Results */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="text-xs font-mono text-ivory-muted">
              CÁC HỢP CHẤT PHÙ HỢP ({candidateSubstances.length} CHẤT):
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {candidateSubstances.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/40 text-xs space-y-1"
                >
                  <div className="font-bold text-white text-sm">{c.nameVI}</div>
                  <div className="font-mono text-cyan-300">{c.formula}</div>
                  <div className="text-[10px] text-ivory-muted">{c.functionalGroupVI}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: COMPLETE REAGENT MATRIX OVERVIEW                                  */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="overflow-x-auto bg-obsidian/60 p-4 rounded-xl border border-navy-light/40">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-ivory-muted font-mono">
                <th className="p-2">Chất hữu cơ</th>
                <th className="p-2">Nước Br2</th>
                <th className="p-2">KMnO4 (Baeyer)</th>
                <th className="p-2">Tollens [Ag(NH3)2]⁺</th>
                <th className="p-2">Cu(OH)2</th>
                <th className="p-2">FeCl3</th>
                <th className="p-2">Iodoform</th>
                <th className="p-2">NaHCO3</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(ORGANIC_SUBSTANCES).map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-navy/40">
                  <td className="p-2 font-bold text-white">
                    <div>{s.nameVI}</div>
                    <div className="text-[10px] font-mono text-cyan-400">{s.formula}</div>
                  </td>
                  <td className="p-2">
                    {s.reactions.bromine_water?.isPositive ? (
                      <span className="text-emerald-400 font-bold">✓ Mất màu / Tủa</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="p-2">
                    {s.reactions.baeyer_kmno4?.isPositive ? (
                      <span className="text-purple-400 font-bold">✓ Mất màu / Tủa nâu</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="p-2">
                    {s.reactions.tollens_silver?.isPositive ? (
                      <span className="text-amber-300 font-bold">✓ Tráng gương / Vàng</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="p-2">
                    {s.reactions.cuoh2_fresh?.isPositive ? (
                      <span className="text-cyan-400 font-bold">✓ Lam thẫm / Đỏ gạch</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="p-2">
                    {s.reactions.fecl3_neutral?.isPositive ? (
                      <span className="text-purple-400 font-bold">✓ Phức tím</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="p-2">
                    {s.reactions.iodoform_reagent?.isPositive ? (
                      <span className="text-yellow-400 font-bold">✓ Tủa vàng</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="p-2">
                    {s.reactions.nahco3_solution?.isPositive ? (
                      <span className="text-emerald-400 font-bold">✓ Sủi bọt CO2</span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
