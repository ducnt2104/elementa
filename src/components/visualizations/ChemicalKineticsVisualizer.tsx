// src/components/visualizations/ChemicalKineticsVisualizer.tsx
/**
 * ELEMENTA — Chemical Reaction Kinetics & Reaction Rates Visualizer
 * Conforms strictly to GDPT 2018 Chemistry Grade 10 (Chủ đề 6: Tốc độ phản ứng hóa học) & IUPAC standards.
 * 
 * Modes:
 * 1. THIOSULFATE_CROSS_OBSCURATION_LAB: Classic sodium thiosulfate acid decomposition with black cross obscuration under conical flask.
 * 2. VAN_T_HOFF_PRESERVATION_SIM: Van 't Hoff rule v2/v1 = γ^((T2-T1)/10) with refrigerator and pressure cooker presets.
 * 3. FACTORS_AND_ARRHENIUS_LAB: 5 factors (concentration, temperature, surface area, catalyst, pressure) & Arrhenius collision theory.
 */

import React, { useState, useMemo } from 'react';
import {
  KINETIC_REACTION_CATALOG,
  calculateVanTHoffEffect,
  simulateKineticFactors,
  calculateArrheniusCollision,
  KineticReaction
} from '../../domain/chemicalKineticsEngine';
import { sound } from '../../audio/soundEngine';

export type KineticsVisualizerMode =
  | 'THIOSULFATE_CROSS_OBSCURATION_LAB'
  | 'VAN_T_HOFF_PRESERVATION_SIM'
  | 'FACTORS_AND_ARRHENIUS_LAB';

export const ChemicalKineticsVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<KineticsVisualizerMode>('THIOSULFATE_CROSS_OBSCURATION_LAB');

  // Mode 1: Thiosulfate
  const [thiosulfateConc, setThiosulfateConc] = useState<number>(1.0);
  const [thiosulfateTemp, setThiosulfateTemp] = useState<number>(25);

  // Mode 2: Van 't Hoff
  const [vT1, setVT1] = useState<number>(20);
  const [vT2, setVT2] = useState<number>(50);
  const [vGamma, setVGamma] = useState<number>(2.5);

  // Mode 3: 5 Factors & Arrhenius
  const [selectedFactorRxn, setSelectedFactorRxn] = useState<string>('caco3-hcl');
  const [surfaceAreaState, setSurfaceAreaState] = useState<'CHUNKS' | 'GRANULES' | 'FINE_POWDER'>('FINE_POWDER');
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(true);
  const [factorConc, setFactorConc] = useState<number>(1.0);
  const [factorTemp, setFactorTemp] = useState<number>(25);

  // Computed results
  const thiosulfateResult = useMemo(() => {
    return simulateKineticFactors({
      reactionId: 'thiosulfate-acid',
      concentrationMolar: thiosulfateConc,
      temperatureCelsius: thiosulfateTemp,
      surfaceAreaState: 'GRANULES',
      hasCatalyst: false
    });
  }, [thiosulfateConc, thiosulfateTemp]);

  const vanTHoffResult = useMemo(() => {
    return calculateVanTHoffEffect(vT1, vT2, vGamma);
  }, [vT1, vT2, vGamma]);

  const factorsResult = useMemo(() => {
    return simulateKineticFactors({
      reactionId: selectedFactorRxn,
      concentrationMolar: factorConc,
      temperatureCelsius: factorTemp,
      surfaceAreaState,
      hasCatalyst
    });
  }, [selectedFactorRxn, factorConc, factorTemp, surfaceAreaState, hasCatalyst]);

  const arrheniusResult = useMemo(() => {
    return calculateArrheniusCollision(factorTemp, factorsResult.effectiveActivationEnergyEa);
  }, [factorTemp, factorsResult.effectiveActivationEnergyEa]);

  const handleModeChange = (mode: KineticsVisualizerMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const applyPreset = (t1: number, t2: number, gamma: number) => {
    sound.playUiClick();
    setVT1(t1);
    setVT2(t2);
    setVGamma(gamma);
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-5 text-slate-100 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              GDPT 2018 Hóa Học 10 — Chủ Đề 6
            </span>
            <span className="text-xs text-slate-400">Chemical Kinetics & Reaction Rates</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-emerald-400 tracking-wide mt-1">
            Phòng Thí Nghiệm Tốc Độ Phản Ứng & Động Hóa Học
          </h2>
          <p className="text-sm text-slate-300">
            Khám phá định luật tốc độ phản ứng, quy tắc nhiệt độ Van &apos;t Hoff, 5 yếu tố ảnh hưởng và lý thuyết va chạm Arrhenius
          </p>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleModeChange('THIOSULFATE_CROSS_OBSCURATION_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'THIOSULFATE_CROSS_OBSCURATION_LAB'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            1. Thí Nghiệm Che Khuất Dấu Thập (Na2S2O3)
          </button>
          <button
            onClick={() => handleModeChange('VAN_T_HOFF_PRESERVATION_SIM')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'VAN_T_HOFF_PRESERVATION_SIM'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            2. Quy Tắc Nhiệt Độ Van &apos;t Hoff (γ)
          </button>
          <button
            onClick={() => handleModeChange('FACTORS_AND_ARRHENIUS_LAB')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'FACTORS_AND_ARRHENIUS_LAB'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            3. 5 Yếu Tố Tốc Độ & Thuyết Va Chạm Arrhenius
          </button>
        </div>
      </div>

      {/* MODE 1: THIOSULFATE CROSS OBSCURATION LAB */}
      {activeMode === 'THIOSULFATE_CROSS_OBSCURATION_LAB' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {/* Concentration Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nồng Độ Natri Thiosunfat [Na2S2O3]:
                </label>
                <span className="text-xs font-bold text-emerald-400 font-mono">{thiosulfateConc} M</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.1"
                value={thiosulfateConc}
                onChange={e => setThiosulfateConc(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Nồng độ càng cao, mật độ tiểu phân va chạm càng lớn, lưu huỳnh kết tủa càng nhanh.
              </span>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Nhiệt Độ Phản Ứng (T):
                </label>
                <span className="text-xs font-bold text-amber-400 font-mono">{thiosulfateTemp} °C</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="2"
                value={thiosulfateTemp}
                onChange={e => setThiosulfateTemp(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Nhiệt độ tăng làm tăng động năng hạt và số va chạm hiệu quả vượt qua Ea.
              </span>
            </div>
          </div>

          {/* Visualization Grid: Conical Flask & Obscuration Stopwatch */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: SVG Flask & Fading Black Cross */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Bình Tam Giác Đặt Trên Tờ Giấy Kẻ Dấu Thập Đen (+) (Thí nghiệm dấu thập đen)
              </h3>

              <div className="relative">
                <svg width="240" height="220" viewBox="0 0 240 220" className="overflow-visible">
                  {/* Paper sheet beneath the flask */}
                  <rect x="30" y="170" width="180" height="40" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

                  {/* Black Cross (+) drawn on paper */}
                  <line
                    x1="120"
                    y1="178"
                    x2="120"
                    y2="202"
                    stroke="#020617"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity={Math.max(0.08, 1.0 - (thiosulfateResult.relativeRateMultiplier / 4.0))}
                  />
                  <line
                    x1="108"
                    y1="190"
                    x2="132"
                    y2="190"
                    stroke="#020617"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity={Math.max(0.08, 1.0 - (thiosulfateResult.relativeRateMultiplier / 4.0))}
                  />

                  {/* Conical Flask outline */}
                  <path
                    d="M 105 30 L 105 70 L 45 175 A 15 15 0 0 0 58 185 L 182 185 A 15 15 0 0 0 195 175 L 135 70 L 135 30 Z"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="3"
                  />
                  {/* Flask neck rim */}
                  <ellipse cx="120" cy="30" rx="18" ry="4" fill="none" stroke="#94a3b8" strokeWidth="2" />

                  {/* Yellow sulfur cloudiness liquid */}
                  <path
                    d="M 100 85 L 50 174 A 12 12 0 0 0 60 182 L 180 182 A 12 12 0 0 0 190 174 L 140 85 Z"
                    fill="#facc15"
                    opacity={Math.min(0.92, 0.35 + (thiosulfateResult.relativeRateMultiplier * 0.12))}
                  />

                  {/* Turbid sulfur precipitate particles */}
                  <circle cx="95" cy="150" r="3" fill="#eab308" opacity="0.8" />
                  <circle cx="140" cy="140" r="2.5" fill="#ca8a04" opacity="0.75" />
                  <circle cx="110" cy="165" r="4" fill="#a16207" opacity="0.9" />
                  <circle cx="155" cy="160" r="3.2" fill="#eab308" opacity="0.85" />
                  <circle cx="75" cy="168" r="2.8" fill="#ca8a04" opacity="0.8" />
                </svg>
              </div>

              {/* Status Badge */}
              <div className="px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-400 text-amber-300">
                {thiosulfateResult.cloudinessTimeSeconds < 10
                  ? '⚡ Vẩn đục lưu huỳnh cực nhanh — Dấu thập biến mất gần như tức thì!'
                  : `Thời gian che khuất dấu thập: ~${thiosulfateResult.cloudinessTimeSeconds} giây`}
              </div>
            </div>

            {/* Right: Rate Metrics & Chemical Kinetics Breakdown */}
            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Phương Trình & Động Học
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Tốc độ = {thiosulfateResult.relativeRateMultiplier}x chuẩn
                </span>
              </div>

              {/* Equation */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-700/70 font-mono text-xs text-emerald-200 overflow-x-auto">
                {thiosulfateResult.equation}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-semibold">Thời Gian Vẩn Đục Che Khuất:</span>
                  <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                    {thiosulfateResult.cloudinessTimeSeconds} s
                  </div>
                  <span className="text-[10px] text-slate-400">càng ngắn thì tốc độ phản ứng càng lớn</span>
                </div>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 block font-semibold">Hằng Số Tốc Độ Tương Đối:</span>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                    {thiosulfateResult.calculatedRate}
                  </div>
                  <span className="text-[10px] text-slate-400">v = k[Na2S2O3][H2SO4]</span>
                </div>
              </div>

              {/* Contributions */}
              <div className="space-y-1.5 text-xs">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                  {thiosulfateResult.factorBreakdown.concentrationContributionVi}
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                  {thiosulfateResult.factorBreakdown.temperatureContributionVi}
                </div>
              </div>

              <p className="text-xs text-slate-400 italic">
                {thiosulfateResult.summaryVi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: VAN 'T HOFF TEMPERATURE SIMULATOR */}
      {activeMode === 'VAN_T_HOFF_PRESERVATION_SIM' && (
        <div className="space-y-6">
          {/* Preset Buttons */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Các Ứng Dụng Thực Tế Tiêu Biểu Trong Cuộc Sống
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPreset(4, 25, 2.2)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30"
              >
                ❄️ Ngăn mát tủ lạnh (4°C vs 25°C) — Bảo quản thực phẩm
              </button>
              <button
                onClick={() => applyPreset(100, 120, 2.5)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-500/20 border border-orange-400 text-orange-300 hover:bg-orange-500/30"
              >
                🍲 Nồi áp suất (100°C vs 120°C) — Nấu chín nhanh
              </button>
              <button
                onClick={() => applyPreset(37, 40, 2.3)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 border border-rose-400 text-rose-300 hover:bg-rose-500/30"
              >
                🌡️ Cơ thể bị sốt (37°C vs 40°C) — Tăng tốc miễn dịch
              </button>
            </div>
          </div>

          {/* Temperature & Gamma Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Nhiệt Độ Đầu (T1):</label>
                <span className="text-xs font-bold text-cyan-400 font-mono">{vT1} °C</span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="1"
                value={vT1}
                onChange={e => setVT1(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Nhiệt Độ Cuối (T2):</label>
                <span className="text-xs font-bold text-orange-400 font-mono">{vT2} °C</span>
              </div>
              <input
                type="range"
                min="0"
                max="140"
                step="1"
                value={vT2}
                onChange={e => setVT2(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hệ Số Van &apos;t Hoff (γ):</label>
                <span className="text-xs font-bold text-emerald-400 font-mono">γ = {vGamma}</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="4.0"
                step="0.1"
                value={vGamma}
                onChange={e => setVGamma(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-[10px] text-slate-400 block mt-1">Thông thường γ nằm trong khoảng 2.0 đến 4.0</span>
            </div>
          </div>

          {/* Outcome Result Card */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-200">
                Công Thức Van &apos;t Hoff: v(T2) / v(T1) = γ^((T2 - T1) / 10)
              </span>
              <span className="px-4 py-1 rounded-full text-sm font-extrabold bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono">
                Tăng gấp {vanTHoffResult.rateRatio}x lần (+{vanTHoffResult.percentageIncrease}%)
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-700 font-mono text-xs text-amber-200">
              v({vT2}°C) / v({vT1}°C) = {vGamma}^(({vT2} - {vT1}) / 10) = {vGamma}^({(vanTHoffResult.deltaT / 10).toFixed(2)}) = {vanTHoffResult.rateRatio}
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-lg text-xs space-y-2 text-emerald-200">
              <span className="font-bold text-sm block">💡 Ý Nghĩa Khoa Học & Đời Sống:</span>
              <p>{vanTHoffResult.realWorldApplicationVi}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: 5 KINETIC FACTORS & ARRHENIUS COLLISION THEORY */}
      {activeMode === 'FACTORS_AND_ARRHENIUS_LAB' && (
        <div className="space-y-6">
          {/* Reaction Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            {/* Reaction */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Chọn Phản Ứng Khảo Sát
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'caco3-hcl', label: 'CaCO3 + HCl (Diện tích bề mặt)' },
                  { id: 'h2o2-decomposition', label: '2H2O2 --(MnO2)--> 2H2O + O2 (Xúc tác)' },
                  { id: 'haber-bosch-kinetics', label: 'N2 + 3H2 (Áp suất & Xúc tác Fe)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSelectedFactorRxn(item.id);
                    }}
                    className={`px-3 py-2 rounded text-xs text-left font-medium border ${
                      selectedFactorRxn === item.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface Area Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Trạng Thái Bề Mặt Tiếp Xúc
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'FINE_POWDER', label: 'Bột siêu mịn (Diện tích tối đa x8.5)' },
                  { id: 'GRANULES', label: 'Hạt nhỏ (Trung bình x3.0)' },
                  { id: 'CHUNKS', label: 'Khối đặc lớn (Tối thiểu x1.0)' }
                ].map(sa => (
                  <button
                    key={sa.id}
                    onClick={() => {
                      sound.playUiClick();
                      setSurfaceAreaState(sa.id as any);
                    }}
                    className={`px-3 py-1.5 rounded text-xs text-left font-medium border ${
                      surfaceAreaState === sa.id
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300'
                    }`}
                  >
                    {sa.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalyst Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Chất Xúc Tác (Catalyst)
              </label>
              <button
                onClick={() => {
                  sound.playUiClick();
                  setHasCatalyst(!hasCatalyst);
                }}
                className={`w-full py-3 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-between ${
                  hasCatalyst
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-slate-700/40 border-slate-600 text-slate-400'
                }`}
              >
                <span>Chất xúc tác hóa học:</span>
                <span className={`px-2.5 py-1 rounded text-[11px] ${hasCatalyst ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-600 text-slate-300'}`}>
                  {hasCatalyst ? 'ĐANG SỬ DỤNG' : 'KHÔNG CÓ'}
                </span>
              </button>
              <span className="text-[10px] text-slate-400 block mt-2">
                Xúc tác làm giảm năng lượng hoạt hóa Ea mà không bị tiêu hao sau phản ứng.
              </span>
            </div>
          </div>

          {/* Arrhenius Maxwell-Boltzmann Collision Theory Panel */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                Thuyết Va Chạm Hoạt Động & Phương Trình Arrhenius (k = A · e^(-Ea/RT))
              </h3>
              <span className="text-xs px-3 py-1 rounded-full font-bold bg-cyan-500/20 border border-cyan-400 text-cyan-300">
                Ea hiệu dụng = {factorsResult.effectiveActivationEnergyEa} kJ/mol
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block font-semibold">Tỷ Lệ Va Chạm Hiệu Quả:</span>
                <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                  {arrheniusResult.effectiveCollisionsPerMillion} / 1 triệu
                </div>
                <span className="text-[10px] text-slate-400">f = exp(-Ea / RT)</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block font-semibold">Tốc Độ Biến Thiên Tổng Thể:</span>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                  x{factorsResult.relativeRateMultiplier} lần
                </div>
                <span className="text-[10px] text-slate-400">kết hợp 5 yếu tố động học</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block font-semibold">Hằng Số Tốc Độ k:</span>
                <div className="text-lg font-bold font-mono text-amber-300 mt-1">
                  {arrheniusResult.rateConstantK.toExponential(3)}
                </div>
                <span className="text-[10px] text-slate-400">theo phương trình Arrhenius</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-emerald-400">Phân tích yếu tố:</span>
              <p>{factorsResult.factorBreakdown.surfaceAreaContributionVi}</p>
              <p>{factorsResult.factorBreakdown.catalystContributionVi}</p>
            </div>

            <p className="text-xs text-cyan-200 italic">
              {arrheniusResult.explanationVi}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
