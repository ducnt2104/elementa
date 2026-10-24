// src/components/visualizations/HalogenDerivativesVisualizer.tsx
/**
 * ELEMENTA — Halogen Derivatives & Mechanism ($S_N1, S_N2, E1, E2$) Visualizer
 * Conforms strictly to GDPT 2018 Chemistry Grade 11 (Chủ đề 5: Dẫn xuất Halogen) & IUPAC standards.
 * 
 * Modes:
 * 1. HYDROLYSIS_AGNO3_DIAGNOSTIC: Alkaline hydrolysis, HNO3 neutralization, and AgNO3 precipitate diagnostic (AgCl, AgBr, AgI vs inert aryl/vinyl halides).
 * 2. ZAITSEV_ELIMINATION_LAB: Ethanolic dehydrohalogenation (KOH/C2H5OH vs KOH/H2O) with Zaitsev rule β-carbon elimination.
 * 3. MECHANISM_MATRIX_AND_CFC: SN1 vs SN2 vs E1 vs E2 predictor and Freon CFC stratospheric ozone depletion cycle.
 */

import React, { useState, useMemo } from 'react';
import {
  HALOGEN_DERIVATIVE_CATALOG,
  simulateHalogenDiagnosticTest,
  simulateZaitsevElimination,
  predictMechanism,
  simulateCfcOzoneCycle,
  HalogenDerivative
} from '../../domain/halogenDerivativesEngine';
import { sound } from '../../audio/soundEngine';

export type HalogenVisualizerMode =
  | 'HYDROLYSIS_AGNO3_DIAGNOSTIC'
  | 'ZAITSEV_ELIMINATION_LAB'
  | 'MECHANISM_MATRIX_AND_CFC';

export const HalogenDerivativesVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<HalogenVisualizerMode>('HYDROLYSIS_AGNO3_DIAGNOSTIC');

  // Mode 1: Hydrolysis & AgNO3
  const [selectedCompoundId, setSelectedCompoundId] = useState<string>('ethyl-chloride');
  const [hno3Added, setHno3Added] = useState<boolean>(true);

  // Mode 2: Zaitsev Elimination
  const [selectedEliminationId, setSelectedEliminationId] = useState<string>('2-bromobutane');
  const [isEthanolicSolvent, setIsEthanolicSolvent] = useState<boolean>(true);

  // Mode 3: Mechanism Matrix
  const [substrateDegree, setSubstrateDegree] = useState<'1°' | '2°' | '3°'>('1°');
  const [nuStrength, setNuStrength] = useState<'STRONG' | 'WEAK'>('STRONG');
  const [baseStrength, setBaseStrength] = useState<'STRONG' | 'WEAK'>('WEAK');
  const [solventType, setSolventType] = useState<'POLAR_PROTIC' | 'POLAR_APROTIC'>('POLAR_APROTIC');

  // Computed results
  const diagnosticResult = useMemo(() => {
    return simulateHalogenDiagnosticTest(selectedCompoundId);
  }, [selectedCompoundId]);

  const eliminationResult = useMemo(() => {
    return simulateZaitsevElimination(selectedEliminationId);
  }, [selectedEliminationId]);

  const mechanismResult = useMemo(() => {
    return predictMechanism(substrateDegree, nuStrength, baseStrength, solventType);
  }, [substrateDegree, nuStrength, baseStrength, solventType]);

  const cfcResult = useMemo(() => {
    return simulateCfcOzoneCycle();
  }, []);

  const handleModeChange = (mode: HalogenVisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  return (
    <div className="bg-slate-900 border border-teal-500/30 rounded-xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              GDPT 2018 Hóa Học 11 — Chủ Đề 5
            </span>
            <span className="text-xs text-slate-400">Halogen Derivatives & Organic Reaction Kinetics</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-teal-400 tracking-wide mt-1">
            Phòng Thí Nghiệm Dẫn Xuất Halogen & Cơ Chế Phản Ứng (SN / E)
          </h2>
          <p className="text-sm text-slate-300">
            Khám phá quy tắc thủy phân, nhận biết bằng AgNO3, quy tắc tách Zaitsev, ma trận cơ chế SN1/SN2/E1/E2 và tác hại của CFC đối với tầng ozon
          </p>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeChange('HYDROLYSIS_AGNO3_DIAGNOSTIC')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'HYDROLYSIS_AGNO3_DIAGNOSTIC'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Thủy Phân & Nhận Biết Bằng AgNO3
          </button>
          <button
            onClick={() => handleModeChange('ZAITSEV_ELIMINATION_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'ZAITSEV_ELIMINATION_LAB'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Quy Tắc Tách Zaitsev (KOH / C2H5OH)
          </button>
          <button
            onClick={() => handleModeChange('MECHANISM_MATRIX_AND_CFC')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'MECHANISM_MATRIX_AND_CFC'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Ma Trận Cơ Chế (SN / E) & Phá Hủy Ozon
          </button>
        </div>
      </div>

      {/* MODE 1: HYDROLYSIS & AGNO3 DIAGNOSTIC */}
      {activeMode === 'HYDROLYSIS_AGNO3_DIAGNOSTIC' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {/* Halide Selector */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Chọn Dẫn Xuất Halogen Để Thí Nghiệm
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'ethyl-chloride', label: 'Etyl clorua (1° Alkyl)' },
                  { id: 'isopropyl-bromide', label: 'Isopropyl bromua (2° Alkyl)' },
                  { id: 'tert-butyl-chloride', label: 'tert-Butyl clorua (3° Alkyl)' },
                  { id: 'allyl-chloride', label: 'Anlyl clorua (Allylic)' },
                  { id: 'benzyl-chloride', label: 'Benzyl clorua (Benzylic)' },
                  { id: 'chlorobenzene', label: '⚠️ Clorobenzen (Aryl sp2 - Bẫy thi)' },
                  { id: 'vinyl-chloride', label: '⚠️ Vinyl clorua (Vinylic sp2 - Bẫy thi)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedCompoundId(item.id);
                    }}
                    className={`px-2.5 py-1.5 rounded text-xs font-medium border transition-all ${
                      selectedCompoundId === item.id
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300 font-bold'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* HNO3 Acidification Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Bước Trung Hòa Bằng Axit HNO3
              </label>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setHno3Added(!hno3Added);
                }}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-between ${
                  hno3Added
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-rose-500/20 border-rose-500 text-rose-300'
                }`}
              >
                <span>Axit hóa bằng HNO3:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${hno3Added ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-rose-500 text-white'}`}>
                  {hno3Added ? 'ĐÃ TRUNG HÒA' : 'CHƯA TRUNG HÒA'}
                </span>
              </button>
            </div>
          </div>

          {/* Test Tube Lab Visualization & Reaction Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: SVG Test Tube */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Ống Nghiệm Thủy Phân Kiềm & Thử Bằng AgNO3
              </h3>

              <svg width="180" height="230" viewBox="0 0 180 230" className="overflow-visible">
                {/* Tube glass */}
                <path
                  d="M 60 20 L 60 170 A 30 30 0 0 0 120 170 L 120 20 Z"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <ellipse cx="90" cy="20" rx="33" ry="6" fill="none" stroke="#94a3b8" strokeWidth="3" />

                {/* Liquid fill */}
                <path
                  d="M 62 80 L 62 170 A 28 28 0 0 0 118 170 L 118 80 Z"
                  fill={
                    !hno3Added && diagnosticResult.hydrolyzesUnderStandard
                      ? '#78350f' // Brown Ag2O contamination
                      : diagnosticResult.precipitateFormed
                      ? diagnosticResult.precipitateColor.includes('Trắng')
                        ? '#f1f5f9'
                        : '#fef08a'
                      : '#94a3b8'
                  }
                  opacity={diagnosticResult.precipitateFormed || !hno3Added ? '0.45' : '0.15'}
                />

                {/* Precipitates at bottom */}
                {!hno3Added && diagnosticResult.hydrolyzesUnderStandard ? (
                  // Brown Ag2O precipitate error
                  <g>
                    <ellipse cx="90" cy="188" rx="24" ry="10" fill="#451a03" />
                    <ellipse cx="90" cy="184" rx="20" ry="7" fill="#78350f" />
                    <text x="90" y="150" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">
                      KẾT TỦA Ag2O NÂU ĐEN
                    </text>
                    <text x="90" y="162" textAnchor="middle" fill="#fca5a5" fontSize="8">
                      (Nhiễu do OH- dư chưa trung hòa)
                    </text>
                  </g>
                ) : diagnosticResult.precipitateFormed ? (
                  // Real AgX precipitate
                  <g>
                    <ellipse
                      cx="90"
                      cy="188"
                      rx="24"
                      ry="10"
                      fill={diagnosticResult.precipitateColor.includes('Trắng') ? '#cbd5e1' : '#facc15'}
                    />
                    <ellipse
                      cx="90"
                      cy="184"
                      rx="20"
                      ry="7"
                      fill={diagnosticResult.precipitateColor.includes('Trắng') ? '#f8fafc' : '#eab308'}
                    />
                    <circle
                      cx="84"
                      cy="172"
                      r="3"
                      fill={diagnosticResult.precipitateColor.includes('Trắng') ? '#ffffff' : '#fef08a'}
                    />
                    <circle
                      cx="96"
                      cy="175"
                      r="2.5"
                      fill={diagnosticResult.precipitateColor.includes('Trắng') ? '#ffffff' : '#fde047'}
                    />
                  </g>
                ) : (
                  <text x="90" y="160" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">
                    KHÔNG KẾT TỦA
                  </text>
                )}
              </svg>

              {/* Status Badge */}
              <div
                className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  !hno3Added && diagnosticResult.hydrolyzesUnderStandard
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : diagnosticResult.precipitateFormed
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                    : 'bg-slate-700 border-slate-600 text-slate-400'
                }`}
              >
                {!hno3Added && diagnosticResult.hydrolyzesUnderStandard
                  ? 'BỊ NHIỄU Ag2O NÂU ĐEN (Chưa axit hóa bằng HNO3)'
                  : diagnosticResult.precipitateFormed
                  ? `Xuất hiện kết tủa ${diagnosticResult.precipitateColor} (${diagnosticResult.precipitateFormula})`
                  : 'Dung dịch trong suốt — Không tạo kết tủa'}
              </div>
            </div>

            {/* Right: Chemical Equations & Diagnostics */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Phương Trình Hóa Học & Cơ Chế
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                    diagnosticResult.hydrolyzesUnderStandard
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {diagnosticResult.hydrolyzesUnderStandard ? 'DỄ BỊ THỦY PHÂN' : 'TRƠ VỚI KIỀM Ở ĐK THƯỜNG'}
                </span>
              </div>

              {/* Equations Box */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-700/70 font-mono text-xs text-teal-200 space-y-1.5 overflow-x-auto">
                <div>{diagnosticResult.chemicalEquations.hydrolysis}</div>
                <div>{diagnosticResult.chemicalEquations.neutralization}</div>
                <div className="text-amber-300 font-bold">{diagnosticResult.chemicalEquations.precipitation}</div>
              </div>

              {/* NH3 Solubility Check */}
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-xs space-y-1">
                <span className="font-semibold text-teal-300 block">Khả năng hòa tan kết tủa trong dung dịch NH3:</span>
                <p className="text-slate-300">{diagnosticResult.ammoniaSolubilityVi}</p>
              </div>

              {/* HNO3 Role Alert */}
              <div className="bg-blue-950/30 border border-blue-500/40 p-3 rounded-lg text-xs space-y-1 text-blue-200">
                <span className="font-bold block">💡 Vai trò của axit nitric (HNO3):</span>
                <p>{diagnosticResult.hno3RoleExplanationVi}</p>
              </div>

              {/* Exam Trap Alert Box */}
              <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded-lg text-xs space-y-1 text-amber-200">
                <span className="font-bold block">⚠️ Lưu ý thi học sinh giỏi & thi tốt nghiệp THPT:</span>
                <p>{diagnosticResult.examTrapAlertVi}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ZAITSEV ELIMINATION LAB */}
      {activeMode === 'ZAITSEV_ELIMINATION_LAB' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {/* Substrate Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Chọn Dẫn Xuất Halogen Tham Gia Tách HX
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: '2-bromobutane', label: '2-Bromobutan (Bất đối xứng Zaitsev)' },
                  { id: 'isopropyl-bromide', label: '2-Bromopropan (Đối xứng)' },
                  { id: 'tert-butyl-chloride', label: 'tert-Butyl clorua (3° Alkyl)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedEliminationId(item.id);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                      selectedEliminationId === item.id
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Solvent Role Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Môi Trường Dung Môi Phản Ứng
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setIsEthanolicSolvent(true);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                    isEthanolicSolvent
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-slate-700/40 border-slate-600 text-slate-400'
                  }`}
                >
                  KOH / C2H5OH (đun nóng) → TÁCH HX
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setIsEthanolicSolvent(false);
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                    !isEthanolicSolvent
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-700/40 border-slate-600 text-slate-400'
                  }`}
                >
                  KOH / H2O (đun nóng) → THẾ (-OH)
                </button>
              </div>
            </div>
          </div>

          {/* Reaction Outcome Card */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">
                {isEthanolicSolvent
                  ? `Phản Ứng Tách Khử Hydro Halogenua (${eliminationResult.ruleAppliedVi})`
                  : 'Phản Ứng Thủy Phân Thế Nucleophin Trong Dung Dịch Nước'}
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                {isEthanolicSolvent ? 'C2H5OH, t°' : 'H2O, t°'}
              </span>
            </div>

            {/* Equation Box */}
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-700/70 font-mono text-xs text-teal-200 overflow-x-auto">
              {isEthanolicSolvent
                ? eliminationResult.chemicalEquation
                : `${eliminationResult.substrateNameVi.split(' ')[0]} + KOH --(H2O, t°)--> R-OH (Ancol) + KX`}
            </div>

            {/* Products Breakdown (if ethanolic elimination) */}
            {isEthanolicSolvent ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Major Product */}
                <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-lg p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                      Sản Phẩm Chính ({eliminationResult.majorProduct.percentage}%)
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-300">
                      {eliminationResult.majorProduct.formula}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-100">
                    {eliminationResult.majorProduct.nameIupac}
                  </div>
                  <span className="text-[11px] text-emerald-300 block font-semibold">
                    Độ thế: {eliminationResult.majorProduct.substitutionDegree}
                  </span>
                  <p className="text-xs text-slate-300">
                    {eliminationResult.majorProduct.zaitsevReasonVi}
                  </p>
                </div>

                {/* Minor Product (if exists) */}
                {eliminationResult.minorProduct ? (
                  <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                        Sản Phẩm Phụ ({eliminationResult.minorProduct.percentage}%)
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {eliminationResult.minorProduct.formula}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-slate-200">
                      {eliminationResult.minorProduct.nameIupac}
                    </div>
                    <span className="text-[11px] text-amber-300 block font-semibold">
                      Độ thế: {eliminationResult.minorProduct.substitutionDegree}
                    </span>
                    <p className="text-xs text-slate-400">
                      {eliminationResult.minorProduct.zaitsevReasonVi}
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4 flex items-center justify-center text-xs text-slate-400">
                    Chỉ tạo 1 sản phẩm duy nhất do vị trí beta hoàn toàn đối xứng.
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 bg-cyan-950/30 border border-cyan-500/40 rounded-lg text-xs text-cyan-200 space-y-2">
                <span className="font-bold text-sm block">🔄 Hiệu Ứng Dung Môi: Thế vs Tách</span>
                <p>
                  Khi sử dụng dung môi nước (KOH/H2O), ion OH- có tính nucleophin mạnh và kích thước nhỏ, dễ dàng tấn công vào carbon mang nhóm halogen để thực hiện phản ứng THẾ NUCLEOPHIN tạo thành ancol.
                </p>
                <p className="text-slate-300">
                  Chỉ khi dùng dung môi ancol (C2H5OH), ion etoxit C2H5O- có tính bazo mạnh hơn rất nhiều được tạo ra, ưu tiên giật proton H+ ở carbon beta để diễn ra phản ứng TÁCH E2 tạo anken.
                </p>
              </div>
            )}

            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="font-semibold text-teal-400">Ghi chú thực nghiệm: </span>
              {eliminationResult.solventRoleVi}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: MECHANISM MATRIX & CFC OZONE */}
      {activeMode === 'MECHANISM_MATRIX_AND_CFC' && (
        <div className="space-y-6">
          {/* Section A: Mechanism Matrix */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-300">
              Phần A: Ma Trận Dự Đoán Cơ Chế Phản Ứng (SN1, SN2, E1, E2)
            </h3>

            {/* Matrix Selectors */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              {/* Bậc Carbon */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Bậc Carbon (Substrate)
                </label>
                <div className="flex gap-1.5">
                  {(['1°', '2°', '3°'] as const).map(deg => (
                    <button
                      key={deg}
                      onClick={() => {
                        sound.playUiClick();
                        setSubstrateDegree(deg);
                      }}
                      className={`flex-1 py-1 rounded text-xs font-bold border ${
                        substrateDegree === deg
                          ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                          : 'bg-slate-700/50 border-slate-600 text-slate-400'
                      }`}
                    >
                      {deg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nucleophile Strength */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Tính Nucleophin (Nu-)
                </label>
                <div className="flex gap-1.5">
                  {(['STRONG', 'WEAK'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        sound.playUiClick();
                        setNuStrength(s);
                      }}
                      className={`flex-1 py-1 rounded text-xs font-bold border ${
                        nuStrength === s
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-700/50 border-slate-600 text-slate-400'
                      }`}
                    >
                      {s === 'STRONG' ? 'Mạnh' : 'Yếu'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Strength */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Độ Mạnh Bazơ (Base)
                </label>
                <div className="flex gap-1.5">
                  {(['STRONG', 'WEAK'] as const).map(b => (
                    <button
                      key={b}
                      onClick={() => {
                        sound.playUiClick();
                        setBaseStrength(b);
                      }}
                      className={`flex-1 py-1 rounded text-xs font-bold border ${
                        baseStrength === b
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-slate-700/50 border-slate-600 text-slate-400'
                      }`}
                    >
                      {b === 'STRONG' ? 'Mạnh' : 'Yếu'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Solvent Type */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Loại Dung Môi
                </label>
                <div className="flex gap-1.5">
                  {(['POLAR_APROTIC', 'POLAR_PROTIC'] as const).map(solv => (
                    <button
                      key={solv}
                      onClick={() => {
                        sound.playUiClick();
                        setSolventType(solv);
                      }}
                      className={`flex-1 py-1 rounded text-xs font-bold border ${
                        solventType === solv
                          ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                          : 'bg-slate-700/50 border-slate-600 text-slate-400'
                      }`}
                    >
                      {solv === 'POLAR_APROTIC' ? 'Aprotic' : 'Protic'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mechanism Prediction Result */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Cơ Chế Chiếm Ưu Thế Dự Đoán
                </span>
                <span className="text-base px-4 py-1 rounded-full font-extrabold bg-teal-500/20 border border-teal-400 text-teal-300 font-mono shadow-md">
                  Cơ Chế {mechanismResult.predominantMechanism}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold">Quy Luật Tốc Độ Động Học:</span>
                  <div className="font-mono text-teal-300 text-sm">{mechanismResult.kineticRateLaw}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold">Hóa Học Lập Thể (Stereochemistry):</span>
                  <div className="text-slate-200">{mechanismResult.stereochemicalOutcomeVi}</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 pt-1">{mechanismResult.explanationVi}</p>
            </div>
          </div>

          {/* Section B: CFC & Ozone Depletion */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
              <span>🌍 Phần B: Hợp Chất CFC & Cơ Chế Quang Hóa Phá Hủy Tầng Ozon</span>
            </h3>

            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-sm font-bold text-slate-100">{cfcResult.cfcCompoundNameVi}</span>
                  <span className="text-xs text-slate-400 block">Thời gian tồn lưu tầng đối lưu: ~{cfcResult.troposphericLifetimeYears} năm</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 border border-rose-500 text-rose-300">
                  Chỉ số ODP = {cfcResult.ozoneDepletionPotential} (Rất nguy hiểm)
                </span>
              </div>

              {/* 3 Chain Steps */}
              <div className="space-y-2">
                {cfcResult.radicalChainSteps.map((step, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                    <span className="font-bold text-amber-300 block">{step.stepNameVi}</span>
                    <div className="font-mono text-cyan-200">{step.chemicalEquation}</div>
                    <p className="text-slate-400">{step.descriptionVi}</p>
                  </div>
                ))}
              </div>

              {/* Catalytic Efficiency & Protocol */}
              <div className="p-3 bg-rose-950/30 border border-rose-500/40 rounded-lg text-xs space-y-1.5 text-rose-200">
                <span className="font-bold block">⚡ Hiệu Suất Xúc Tác Gốc Tự Do:</span>
                <p>{cfcResult.catalyticEfficiency}</p>
                <div className="pt-1.5 border-t border-rose-900/50 text-slate-300">
                  {cfcResult.montrealProtocolReplacementVi}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
