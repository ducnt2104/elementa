// src/components/visualizations/HydrocarbonVisualizer.tsx
/**
 * ELEMENTA — Hydrocarbons (Alkanes, Alkenes, Alkynes & Arenes) Visualizer
 * Conforms to GDPT 2018 Chemistry Grade 11 (Chủ đề 4: Hydrocarbon) & IUPAC standards.
 * 
 * Modes:
 * 1. MARKOVNIKOV_BAYER_ADDITION: Alkene addition (Markovnikov vs Kharasch peroxide effect) and Bayer KMnO4 test tube.
 * 2. TERMINAL_ALKYNE_TOLLENS_LAB: Terminal alkyne AgNO3/NH3 silver acetylide precipitate simulation and Kucherov hydration.
 * 3. ARENE_TOLUENE_BENZENE_LAB: Benzene stability vs Toluene activating ortho/para directing effect, TNT synthesis, and alkane halogenation.
 */

import React, { useState, useMemo } from 'react';
import {
  HYDROCARBON_CATALOG,
  simulateMarkovnikovAddition,
  simulateTerminalAlkyneSilverTest,
  simulateAlkaneHalogenation,
  simulateAromaticReaction,
  HydrocarbonCompound
} from '../../domain/hydrocarbonEngine';
import { sound } from '../../audio/soundEngine';

export type HydrocarbonVisualizerMode =
  | 'MARKOVNIKOV_BAYER_ADDITION'
  | 'TERMINAL_ALKYNE_TOLLENS_LAB'
  | 'ARENE_TOLUENE_BENZENE_LAB';

export const HydrocarbonVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<HydrocarbonVisualizerMode>('MARKOVNIKOV_BAYER_ADDITION');

  // Mode 1: Markovnikov
  const [selectedAlkeneId, setSelectedAlkeneId] = useState<string>('propene');
  const [selectedReagent, setSelectedReagent] = useState<'HBr' | 'HCl' | 'H2O'>('HBr');
  const [hasPeroxide, setHasPeroxide] = useState<boolean>(false);

  // Mode 2: Alkyne Tollens
  const [selectedAlkyneId, setSelectedAlkyneId] = useState<string>('ethyne');
  const [alkyneMoles, setAlkyneMoles] = useState<number>(0.05);

  // Mode 3: Arene & Alkane Lab
  const [selectedAreneId, setSelectedAreneId] = useState<'benzene' | 'toluene'>('toluene');
  const [areneReactionType, setAreneReactionType] = useState<
    'KMNO4_HEAT' | 'NITRATION_HNO3_H2SO4' | 'BROMINATION_FEBR3' | 'BROMINE_WATER'
  >('KMNO4_HEAT');
  const [selectedAlkaneId, setSelectedAlkaneId] = useState<string>('propane');
  const [selectedHalogen, setSelectedHalogen] = useState<'Cl2' | 'Br2'>('Br2');
  const [uvLightOn, setUvLightOn] = useState<boolean>(true);

  // Computed results
  const markovnikovResult = useMemo(() => {
    return simulateMarkovnikovAddition(selectedAlkeneId, selectedReagent, hasPeroxide);
  }, [selectedAlkeneId, selectedReagent, hasPeroxide]);

  const alkyneResult = useMemo(() => {
    return simulateTerminalAlkyneSilverTest(selectedAlkyneId, alkyneMoles);
  }, [selectedAlkyneId, alkyneMoles]);

  const areneResult = useMemo(() => {
    return simulateAromaticReaction(selectedAreneId, areneReactionType);
  }, [selectedAreneId, areneReactionType]);

  const alkaneResult = useMemo(() => {
    return simulateAlkaneHalogenation(selectedAlkaneId, selectedHalogen, uvLightOn);
  }, [selectedAlkaneId, selectedHalogen, uvLightOn]);

  const handleModeChange = (mode: HydrocarbonVisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  return (
    <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              GDPT 2018 Hóa Học 11 — Chủ Đề 4
            </span>
            <span className="text-xs text-slate-400">IUPAC Nomenclature & Organic Mechanisms</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-amber-400 tracking-wide mt-1">
            Phòng Thí Nghiệm Cơ Chế Phản Ứng Hydrocarbon
          </h2>
          <p className="text-sm text-slate-300">
            Mô phỏng quy tắc Markovnikov, hiệu ứng Kharasch, nhận biết liên kết ba đầu mạch bằng AgNO3/NH3 và tính chất vòng Arenes
          </p>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeChange('MARKOVNIKOV_BAYER_ADDITION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'MARKOVNIKOV_BAYER_ADDITION'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Cộng Markovnikov & Thuốc Thử Bayer
          </button>
          <button
            onClick={() => handleModeChange('TERMINAL_ALKYNE_TOLLENS_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'TERMINAL_ALKYNE_TOLLENS_LAB'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Ankin Đầu Mạch (AgNO3/NH3) & Kucherov
          </button>
          <button
            onClick={() => handleModeChange('ARENE_TOLUENE_BENZENE_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'ARENE_TOLUENE_BENZENE_LAB'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. Arene (Toluen vs Benzen) & Thế Ankan
          </button>
        </div>
      </div>

      {/* MODE 1: MARKOVNIKOV ADDITION & BAYER TEST */}
      {activeMode === 'MARKOVNIKOV_BAYER_ADDITION' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {/* Alkene Select */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Chọn Anken (Alkene)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'ethene', label: 'Ethene (CH2=CH2)' },
                  { id: 'propene', label: 'Propene (CH3-CH=CH2)' },
                  { id: 'but-2-ene', label: 'But-2-ene (CH3-CH=CH-CH3)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedAlkeneId(item.id);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-medium border ${
                      selectedAlkeneId === item.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reagent Select */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Tác Nhân Phản Ứng (HX / H2O)
              </label>
              <div className="flex gap-2">
                {(['HBr', 'HCl', 'H2O'] as const).map(reagent => (
                  <button
                    key={reagent}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedReagent(reagent);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                      selectedReagent === reagent
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {reagent === 'H2O' ? 'H2O (H+/t°)' : reagent}
                  </button>
                ))}
              </div>
            </div>

            {/* Kharasch Peroxide Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Chất Xúc Tác Peroxide (ROOR)
              </label>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setHasPeroxide(!hasPeroxide);
                }}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-between ${
                  hasPeroxide
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-700/40 border-slate-600 text-slate-400'
                }`}
              >
                <span>Hiệu ứng Kharasch (Anti-Markovnikov):</span>
                <span className={`px-2 py-0.5 rounded text-[10px] ${hasPeroxide ? 'bg-rose-500 text-white' : 'bg-slate-600 text-slate-300'}`}>
                  {hasPeroxide ? 'ĐANG BẬT' : 'TẮT'}
                </span>
              </button>
            </div>
          </div>

          {/* Visualization Grid: Products & Bayer Test */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Electrophilic Addition Outcome */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                  Cơ Chế Phản Ứng Cộng {markovnikovResult.ruleAppliedVi}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                  {markovnikovResult.reagent}
                </span>
              </div>

              {/* Chemical Equation Box */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-700/70 font-mono text-xs text-amber-200 overflow-x-auto">
                {markovnikovResult.chemicalEquation}
              </div>

              {/* Major Product Card */}
              <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    Sản Phẩm Chính ({markovnikovResult.majorProduct.percentage}%)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    {markovnikovResult.majorProduct.formula}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-100 mt-1">
                  {markovnikovResult.majorProduct.nameIupac}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {markovnikovResult.majorProduct.reasonVi}
                </p>
              </div>

              {/* Minor Product Card (if exists) */}
              {markovnikovResult.minorProduct && (
                <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                      Sản Phẩm Phụ ({markovnikovResult.minorProduct.percentage}%)
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {markovnikovResult.minorProduct.formula}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-slate-200 mt-1">
                    {markovnikovResult.minorProduct.nameIupac}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {markovnikovResult.minorProduct.reasonVi}
                  </p>
                </div>
              )}

              {/* Carbocation Stability Analysis */}
              <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-200 space-y-1">
                <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <span>⚛️ Độ Bền Tiểu Phân Trung Gian (Carbocation / Radical):</span>
                </div>
                <p>{markovnikovResult.carbocationStabilityVi}</p>
              </div>
            </div>

            {/* Right: Bayer Test Tube (KMnO4) Decolorization */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <span>🧪 Thuốc Thử Bayer (Oxy Hóa Không Hoàn Toàn Bằng KMnO4)</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Nhận biết liên kết đôi C=C: Làm mất màu dung dịch tím KMnO4 và xuất hiện kết tủa nâu đen MnO2 ở nhiệt độ phòng.
                </p>
              </div>

              {/* Animated SVG Test Tube */}
              <div className="flex justify-center items-center py-4">
                <svg width="180" height="220" viewBox="0 0 180 220" className="overflow-visible">
                  {/* Test Tube Glass Outline */}
                  <path
                    d="M 60 20 L 60 160 A 30 30 0 0 0 120 160 L 120 20 Z"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Test tube rim */}
                  <ellipse cx="90" cy="20" rx="33" ry="6" fill="none" stroke="#94a3b8" strokeWidth="3" />

                  {/* Liquid inside test tube */}
                  <path
                    d="M 62 80 L 62 160 A 28 28 0 0 0 118 160 L 118 80 Z"
                    fill="url(#bayerLiquidGrad)"
                    opacity="0.85"
                  />

                  {/* MnO2 Brown Precipitate at the bottom */}
                  <ellipse cx="90" cy="178" rx="22" ry="10" fill="#582900" />
                  <ellipse cx="90" cy="175" rx="18" ry="6" fill="#3d1b00" opacity="0.9" />

                  {/* Bubbles or precipitate particles */}
                  <circle cx="85" cy="165" r="2.5" fill="#582900" opacity="0.7" />
                  <circle cx="98" cy="170" r="2" fill="#78350f" opacity="0.8" />
                  <circle cx="78" cy="172" r="2.2" fill="#451a03" opacity="0.75" />

                  <defs>
                    <linearGradient id="bayerLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#c084fc" stopOpacity="0.2" />
                      <stop offset="60%" stopColor="#e9d5ff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#78350f" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Phenomenon Alert */}
              <div className="bg-slate-900 p-3 rounded-lg border border-purple-500/30 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-purple-300 font-semibold">
                  <span>Hiện tượng thực nghiệm:</span>
                  <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-200 rounded border border-purple-500/30">
                    Phản ứng dương tính (+)
                  </span>
                </div>
                <p className="text-slate-200">{markovnikovResult.bayerDecolorization.colorChange}</p>
                <p className="text-amber-300 font-mono text-[11px]">{markovnikovResult.bayerDecolorization.precipitate}</p>
                <div className="pt-1 border-t border-slate-800 text-[11px] font-mono text-purple-200">
                  {markovnikovResult.bayerDecolorization.reactionEquation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: TERMINAL ALKYNE TOLLENS REAGENT (AgNO3/NH3) */}
      {activeMode === 'TERMINAL_ALKYNE_TOLLENS_LAB' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {/* Alkyne Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Chọn Ankin Thử Nghiệm Với AgNO3/NH3
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'ethyne', label: 'Axetilen (CH≡CH)' },
                  { id: 'propyne', label: 'Propin (CH3-C≡CH)' },
                  { id: 'but-2-yne', label: 'But-2-in (CH3-C≡C-CH3)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedAlkyneId(item.id);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                      selectedAlkyneId === item.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Moles Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Số Mol Ankin Dẫn Vào:
                </label>
                <span className="text-xs font-bold text-amber-400 font-mono">{alkyneMoles} mol</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.20"
                step="0.01"
                value={alkyneMoles}
                onChange={e => setAlkyneMoles(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Test Tube Visualization & Diagnostic Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SVG Silver Acetylide Test Tube */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Ống Nghiệm Thuốc Thử Tollens (AgNO3 trong dung dịch NH3 dư)
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

                {/* Solution */}
                <path
                  d="M 62 80 L 62 170 A 28 28 0 0 0 118 170 L 118 80 Z"
                  fill={alkyneResult.reactsWithAgNO3NH3 ? '#fef08a' : '#94a3b8'}
                  opacity={alkyneResult.reactsWithAgNO3NH3 ? '0.4' : '0.15'}
                />

                {/* Precipitate at bottom if reacts */}
                {alkyneResult.reactsWithAgNO3NH3 ? (
                  <g>
                    <ellipse cx="90" cy="188" rx="24" ry="10" fill="#facc15" />
                    <ellipse cx="90" cy="185" rx="20" ry="7" fill="#eab308" />
                    <ellipse cx="90" cy="181" rx="15" ry="4" fill="#ca8a04" />
                    <circle cx="84" cy="172" r="3" fill="#facc15" />
                    <circle cx="96" cy="174" r="2.5" fill="#facc15" />
                    <circle cx="76" cy="179" r="2" fill="#eab308" />
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
                  alkyneResult.reactsWithAgNO3NH3
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-rose-500/20 border-rose-500 text-rose-300'
                }`}
              >
                {alkyneResult.reactsWithAgNO3NH3
                  ? `Xuất hiện kết tủa ${alkyneResult.precipitateColor}`
                  : 'Dung dịch trong suốt — Không xảy ra phản ứng'}
              </div>
            </div>

            {/* Diagnostic Information */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Chẩn Đoán Cấu Trúc Ankin
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                    alkyneResult.isTerminal
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {alkyneResult.isTerminal ? 'ANKIN ĐẦU MẠCH (Alk-1-yne)' : 'ANKIN GIỮA MẠCH (Không đầu mạch)'}
                </span>
              </div>

              {/* Equation */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-700/70 font-mono text-xs text-amber-200 overflow-x-auto">
                {alkyneResult.reactionEquation}
              </div>

              {/* Metrics */}
              {alkyneResult.reactsWithAgNO3NH3 && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Khối Lượng Mol Kết Tủa</span>
                    <span className="text-base font-bold text-amber-300 font-mono">
                      {alkyneResult.precipitateMolarMassGmol} g/mol
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{alkyneResult.precipitateFormula}</span>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Khối Lượng Kết Tủa Thu Được</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">
                      {alkyneResult.calculatedPrecipitateMassG} g
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">ứng với {alkyneMoles} mol ankin</span>
                  </div>
                </div>
              )}

              {/* Diagnostic Alert Box */}
              <div
                className={`p-3 rounded-lg text-xs space-y-1 border ${
                  alkyneResult.isTerminal
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span>{alkyneResult.isTerminal ? '💡 Nguyên Lý Hóa Học:' : '⚠️ BẪY THI ĐẠI HỌC CẦN LƯU Ý:'}</span>
                </div>
                <p>{alkyneResult.diagnosticNoteVi}</p>
              </div>

              {/* Kucherov Hydration Note */}
              <div className="bg-slate-900/60 border border-slate-700 p-3 rounded-lg text-xs space-y-1.5">
                <span className="font-bold text-cyan-300 block">💧 Phản Ứng Hidrat Hóa Kucherov & Trùng Hợp:</span>
                <p className="font-mono text-[11px] text-cyan-200">
                  {alkyneResult.polymerizationOrHydrationInfo.kucherovEquation}
                </p>
                <p className="text-slate-300 text-[11px]">
                  {alkyneResult.polymerizationOrHydrationInfo.kucherovProductVi}
                </p>
                <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                  {alkyneResult.polymerizationOrHydrationInfo.polymerizationReactionVi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: ARENE (BENZENE VS TOLUENE) & ALKANE HALOGENATION */}
      {activeMode === 'ARENE_TOLUENE_BENZENE_LAB' && (
        <div className="space-y-6">
          {/* Section A: Arene Comparison */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Phần A: Thử Nghiệm Phân Biệt Toluen vs Benzen
            </h3>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Chọn Arene Thử Nghiệm
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedAreneId('benzene');
                    }}
                    className={`px-4 py-2 rounded text-xs font-bold border transition-all ${
                      selectedAreneId === 'benzene'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300'
                    }`}
                  >
                    Benzen (C6H6)
                  </button>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedAreneId('toluene');
                    }}
                    className={`px-4 py-2 rounded text-xs font-bold border transition-all ${
                      selectedAreneId === 'toluene'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300'
                    }`}
                  >
                    Toluen (C6H5-CH3)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Chọn Tác Nhân Thử Nghiệm
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'KMNO4_HEAT', label: 'KMnO4 (đun nóng 100°C)' },
                    { id: 'NITRATION_HNO3_H2SO4', label: 'HNO3 đ / H2SO4 đ (TNT)' },
                    { id: 'BROMINATION_FEBR3', label: 'Brom khan (FeBr3)' },
                    { id: 'BROMINE_WATER', label: 'Nước Brom (H2O)' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        sound.playUiClick();
                        setAreneReactionType(item.id as any);
                      }}
                      className={`px-2.5 py-1.5 rounded text-xs font-medium border ${
                        areneReactionType === item.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Arene Outcome Card */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-200">
                  {areneResult.areneNameVi} + {areneResult.reagentVi}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold border ${
                    areneResult.reactionOccurs
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-slate-700 border-slate-600 text-slate-400'
                  }`}
                >
                  {areneResult.reactionOccurs ? 'Xảy Ra Phản Ứng' : 'Không Phản Ứng (Bền Trơ)'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-700 font-mono text-xs text-amber-200 overflow-x-auto">
                {areneResult.chemicalEquation}
              </div>

              <p className="text-xs text-slate-300">{areneResult.productsSummaryVi}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="font-semibold text-amber-400 block mb-1">Hoạt Tính Vòng Thơm:</span>
                  <p className="text-slate-300">{areneResult.ringActivationVi}</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <span className="font-semibold text-cyan-400 block mb-1">Quy Tắc Định Hướng Nhóm Thế:</span>
                  <p className="text-slate-300">{areneResult.directingEffectVi}</p>
                </div>
              </div>

              {/* TNT Alert */}
              {areneResult.tntFormation?.isFormed && (
                <div className="bg-amber-950/40 border border-amber-500/50 p-3 rounded-lg text-xs space-y-1 text-amber-200">
                  <div className="font-bold flex items-center gap-1.5">
                    <span>💥 Tổng Hợp Thuốc Nổ TNT (2,4,6-Trinitrotoluen):</span>
                  </div>
                  <p className="font-mono text-amber-300">{areneResult.tntFormation.tntFormula}</p>
                  <p className="text-slate-300">{areneResult.tntFormation.hazardNoteVi}</p>
                </div>
              )}
            </div>
          </div>

          {/* Section B: Alkane Free-Radical Halogenation */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Phần B: Cơ Chế Thế Gốc Tự Do (SR) Của Ankan (Quy Tắc Thế Bậc 3 &gt; Bậc 2 &gt; Bậc 1)
            </h3>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Chọn Ankan
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'methane', label: 'Metan' },
                    { id: 'propane', label: 'Propan' },
                    { id: 'isobutane', label: 'Isobutan' }
                  ].map(a => (
                    <button
                      key={a.id}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedAlkaneId(a.id);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                        selectedAlkaneId === a.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Halogen (X2)
                </label>
                <div className="flex gap-2">
                  {(['Cl2', 'Br2'] as const).map(x => (
                    <button
                      key={x}
                      onClick={() => {
                        sound.playUiClick();
                        setSelectedHalogen(x);
                      }}
                      className={`px-4 py-1.5 rounded text-xs font-bold border ${
                        selectedHalogen === x
                          ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                          : 'bg-slate-700/50 border-slate-600 text-slate-300'
                      }`}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Ánh Sáng Khơi Mào Quang Hóa (as / hν)
                </label>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setUvLightOn(!uvLightOn);
                  }}
                  className={`w-full py-1.5 px-3 rounded text-xs font-bold border flex items-center justify-between ${
                    uvLightOn
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-700/40 border-slate-600 text-slate-400'
                  }`}
                >
                  <span>Chiếu sáng tử ngoại (as / hν):</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${uvLightOn ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-600 text-slate-300'}`}>
                    {uvLightOn ? 'BẬT' : 'BÓNG TỐI'}
                  </span>
                </button>
              </div>
            </div>

            {/* Halogenation Products Output */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-3">
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-amber-400">Độ chọn lọc phản ứng: </span>
                {alkaneResult.selectivityExplanationVi}
              </div>

              {alkaneResult.products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {alkaneResult.products.map((prod, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-xs space-y-1 ${
                        prod.isMajor
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{prod.productNameVi}</span>
                        <span className="font-mono text-sm">{prod.yieldPercentage}%</span>
                      </div>
                      <div className="font-mono text-[11px] text-amber-300">{prod.productFormula}</div>
                      <p className="text-[11px] text-slate-300">{prod.reasonVi}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-950 rounded-lg text-center text-xs text-slate-400 border border-slate-800">
                  Không có sản phẩm tạo thành do thiếu ánh sáng kích thích đứt liên kết halogen.
                </div>
              )}

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 font-mono">
                {alkaneResult.mechanismVi}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
