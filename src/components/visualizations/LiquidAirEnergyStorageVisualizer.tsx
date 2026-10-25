// src/components/visualizations/LiquidAirEnergyStorageVisualizer.tsx
// Interactive Visualizer: Liquid-Air Energy Storage (LAES) & Cryogenic Thermal Integration
// Standards: IUPAC Cryogenic Physical Chemistry, Modified Claude Cycle, GDPT 2018 Physics & LDES Grid Balancing

import React, { useState, useMemo } from 'react';
import {
  Snowflake,
  Wind,
  Gauge,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  DollarSign,
  Factory,
  Zap,
  Globe2,
  Boxes,
  ArrowRight
} from 'lucide-react';
import {
  LAES_SCALES,
  LaesScaleType,
  calculateLaesCyclePerformance,
  calculateLaesEconomicsAndEmissions
} from '../../domain/liquidAirEnergyStorageEngine';
import { sound } from '../../audio/soundEngine';

type LaesTabMode =
  | 'CRYOGENIC_CYCLE_FLOW'
  | 'COLD_RECYCLE_RTE_OPTIMIZATION'
  | 'GIGA_SCALE_ECONOMICS';

export const LiquidAirEnergyStorageVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<LaesTabMode>('CRYOGENIC_CYCLE_FLOW');

  // Controls for Scale & Cycle
  const [scaleType, setScaleType] = useState<LaesScaleType>('REGIONAL_SUBSTATION');
  const [coldRecycleEffectiveness, setColdRecycleEffectiveness] = useState<number>(0.92);
  const [includeWasteHeatReheat, setIncludeWasteHeatReheat] = useState<boolean>(true);

  const currentScale = LAES_SCALES[scaleType];

  // Calculations
  const cyclePerf = useMemo(() => {
    return calculateLaesCyclePerformance(scaleType, coldRecycleEffectiveness, includeWasteHeatReheat);
  }, [scaleType, coldRecycleEffectiveness, includeWasteHeatReheat]);

  const economics = useMemo(() => {
    return calculateLaesEconomicsAndEmissions(scaleType, cyclePerf.roundTripEfficiencyPercent);
  }, [scaleType, cyclePerf.roundTripEfficiencyPercent]);

  const handleModeChange = (mode: LaesTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setScaleType('REGIONAL_SUBSTATION');
    setColdRecycleEffectiveness(0.92);
    setIncludeWasteHeatReheat(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-sky-600/30 rounded-2xl border border-cyan-500/40 text-cyan-400">
            <Wind className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/30">
                Lưu Trữ Năng Lượng Không Khí Lỏng (LAES - Liquid Air)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                -194°C Siêu Lạnh • Giãn Nở 714x • 35 Năm Không Chai Pin
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Liquid-Air Cryogenic Energy Storage &amp; Thermal Integration
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Chu trình hóa lỏng không khí Claude cải tiến &amp; Tái sinh nhiệt lạnh CTES • Lưu trữ năng lượng lưới điện đa giờ 100% sử dụng không khí tự nhiên
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('CRYOGENIC_CYCLE_FLOW')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'CRYOGENIC_CYCLE_FLOW'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Sơ Đồ Chu Trình Lạnh Khép Kín</span>
          </button>

          <button
            onClick={() => handleModeChange('COLD_RECYCLE_RTE_OPTIMIZATION')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'COLD_RECYCLE_RTE_OPTIMIZATION'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/25 ring-1 ring-sky-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Tối Ưu Hiệu Suất Lưới (RTE)</span>
          </button>

          <button
            onClick={() => handleModeChange('GIGA_SCALE_ECONOMICS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'GIGA_SCALE_ECONOMICS'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Kinh Tế Lưới Điện (LDES vs BESS)</span>
          </button>
        </div>
      </div>

      {/* MODE 1: CRYOGENIC CYCLE FLOW SCHEMATIC */}
      {activeMode === 'CRYOGENIC_CYCLE_FLOW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scale Selector & Operational Parameters */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <Factory className="w-4 h-4 text-cyan-400" />
                Cấu Hình Nhà Máy LAES
              </h3>
              <button
                onClick={resetDefaults}
                className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Khôi phục mặc định"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Scale Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 font-semibold">Quy mô hệ thống:</label>
              <select
                value={scaleType}
                onChange={(e) => setScaleType(e.target.value as LaesScaleType)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {Object.values(LAES_SCALES).map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nominalDischargePowerMW} MW / {s.totalEnergyMWh} MWh)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                {currentScale.vietnameseFeature}
              </p>
            </div>

            {/* Physical State Summary */}
            <div className="p-4 bg-cyan-950/20 rounded-xl border border-cyan-500/20 flex flex-col gap-3 text-xs">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[11px]">
                Đặc Tính Nhiệt Động Không Khí Hóa Lỏng
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Nhiệt độ sôi hóa lỏng:</span>
                  <span className="font-mono text-cyan-300 font-bold text-sm">-194 °C (79 K)</span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Tỉ lệ giãn nở thể tích:</span>
                  <span className="font-mono text-emerald-300 font-bold text-sm">
                    {cyclePerf.expansionRatioLiquidToGas} lần
                  </span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Mật độ không khí lỏng:</span>
                  <span className="font-mono text-blue-300 font-bold text-sm">875 kg/m³</span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Áp suất nạp turbine:</span>
                  <span className="font-mono text-purple-300 font-bold text-sm">
                    {cyclePerf.turbineInletPressureBar} bar
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-semibold text-cyan-400 block mb-1">Cơ Chế Bơm Lỏng Tiết Kiệm Năng Lượng:</span>
              Để đưa chất khí lên áp suất 160 bar tốn hàng chục MW điện máy nén khí; nhưng với không khí hóa lỏng ở thể lỏng không thể nén ép (incompressible fluid), bơm cao áp cryogenic chỉ tiêu tốn &lt; 2% điện năng để đẩy áp suất lên 160 bar trước khi gia nhiệt bay hơi, tạo động lực đẩy tuabin cực đại!
            </div>
          </div>

          {/* Dynamic SVG Flow Schematic */}
          <div className="lg:col-span-2 flex flex-col gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 justify-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-cyan-400" />
                Sơ Đồ Quy Trình Tích Nạp &amp; Phát Điện Cryogenic
              </span>
              <span className="text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 font-bold">
                RTE Lưới Điện: {cyclePerf.roundTripEfficiencyPercent.toFixed(1)}%
              </span>
            </div>

            {/* SVG Schematic */}
            <div className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 720 340" className="w-full h-auto max-h-[320px]">
                <defs>
                  <linearGradient id="gradCompress" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradTank" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0e7490" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="gradTurbine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradCtes" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* --- CHARGE LOOP (TOP) --- */}
                {/* 1. Ambient Air to Compressor */}
                <path d="M 40 80 L 100 80" fill="none" stroke="#94a3b8" strokeWidth="3" />
                <polygon points="100,80 90,75 90,85" fill="#94a3b8" />
                <text x="35" y="65" fill="#cbd5e1" fontSize="10">Không khí 20°C</text>

                {/* Compressor Box */}
                <polygon points="100,60 160,70 160,90 100,100" fill="url(#gradCompress)" stroke="#f59e0b" strokeWidth="2" />
                <text x="130" y="83" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Máy Nén</text>

                {/* Waste Heat Recovery HTES */}
                <path d="M 160 80 L 230 80" fill="none" stroke="#f97316" strokeWidth="3" />
                <rect x="230" y="60" width="70" height="40" rx="6" fill="#1e293b" stroke="#f97316" strokeWidth="2" />
                <text x="265" y="80" fill="#fdba74" fontSize="9" textAnchor="middle">Nhiệt HTES</text>
                <text x="265" y="93" fill="#ffffff" fontSize="8" textAnchor="middle">+220°C</text>

                {/* Pre-cooling through CTES */}
                <path d="M 300 80 L 370 80" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4,3" />
                <rect x="370" y="55" width="80" height="50" rx="8" fill="url(#gradCtes)" stroke="#0284c7" strokeWidth="2" />
                <text x="410" y="78" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CTES Lạnh</text>
                <text x="410" y="93" fill="#e0f2fe" fontSize="8" textAnchor="middle">-150°C Tái Sinh</text>

                {/* Cryogenic Throttle Valve to Liquid Tank */}
                <path d="M 450 80 L 530 80 L 530 130" fill="none" stroke="#06b6d4" strokeWidth="3" />
                <polygon points="530,135 525,125 535,125" fill="#06b6d4" />
                <text x="490" y="70" fill="#67e8f9" fontSize="8">Van J-T</text>

                {/* --- STORAGE TANK (CENTER) --- */}
                <rect x="480" y="140" width="100" height="110" rx="14" fill="url(#gradTank)" stroke="#22d3ee" strokeWidth="2.5" />
                <text x="530" y="170" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">BÌNH LIQUID AIR</text>
                <text x="530" y="190" fill="#cffafe" fontSize="10" textAnchor="middle">-194 °C (79 K)</text>
                <text x="530" y="210" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  {currentScale.liquidAirTankVolumeM3} m³ Lỏng
                </text>
                <text x="530" y="230" fill="#a5f3fc" fontSize="9" textAnchor="middle">Chân không cách nhiệt</text>

                {/* --- DISCHARGE LOOP (BOTTOM) --- */}
                {/* Cryo Pump */}
                <path d="M 480 220 L 400 220" fill="none" stroke="#06b6d4" strokeWidth="3" />
                <circle cx="390" cy="220" r="14" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
                <polygon points="385,213 397,220 385,227" fill="#06b6d4" />
                <text x="390" y="246" fill="#38bdf8" fontSize="9" textAnchor="middle">Bơm Cryo 160 bar</text>

                {/* Evaporator & Reheat from HTES */}
                <path d="M 376 220 L 290 220" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <rect x="220" y="200" width="70" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="255" y="220" fill="#e0f2fe" fontSize="9" textAnchor="middle">Bay Hơi &amp;</text>
                <text x="255" y="233" fill="#fdba74" fontSize="8" textAnchor="middle">Gia Nhiệt Lại</text>

                {/* Expander Turbines to Generator */}
                <path d="M 220 220 L 160 220" fill="none" stroke="#10b981" strokeWidth="4" />
                <polygon points="160,205 100,215 100,225 160,235" fill="url(#gradTurbine)" stroke="#10b981" strokeWidth="2" />
                <text x="130" y="224" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Tuabin</text>

                {/* Generator */}
                <circle cx="60" cy="220" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                <text x="60" y="224" fill="#86efac" fontSize="10" fontWeight="bold" textAnchor="middle">GEN</text>
                <text x="60" y="250" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {currentScale.nominalDischargePowerMW} MW Điện
                </text>

                {/* Cold Return from Evaporator to CTES */}
                <path d="M 255 200 L 255 150 L 410 150 L 410 105" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />
                <text x="330" y="142" fill="#7dd3fc" fontSize="9" textAnchor="middle">Thu Hồi Nhiệt Lạnh (-194°C) vào CTES</text>
              </svg>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Công suất nạp (Nén):</span>
                <span className="font-bold text-amber-400">{cyclePerf.chargePowerMW} MW</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Công suất phát (Tuabin):</span>
                <span className="font-bold text-emerald-400">{cyclePerf.dischargePowerMW} MW</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Tổng năng lượng lưu trữ:</span>
                <span className="font-bold text-cyan-400">{economics.totalStoredEnergyMWh} MWh</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: COLD RECYCLE RTE OPTIMIZATION */}
      {activeMode === 'COLD_RECYCLE_RTE_OPTIMIZATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Optimization Controls */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-sky-400" />
              Thông Số Tối Ưu Hóa Chu Trình
            </h3>

            {/* Cold Recycle Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Hiệu quả tái sinh lạnh CTES:</span>
                <span className="font-mono text-cyan-400 font-bold">{(coldRecycleEffectiveness * 100).toFixed(0)} %</span>
              </div>
              <input
                type="range"
                min="0.80"
                max="0.98"
                step="0.01"
                value={coldRecycleEffectiveness}
                onChange={(e) => setColdRecycleEffectiveness(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>80% (Cát thạch anh)</span>
                <span>92% (Gravel bed)</span>
                <span>98% (Phase change)</span>
              </div>
            </div>

            {/* Waste Heat Reheat Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-950/50 rounded-xl border border-slate-800">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">Gia nhiệt khí xả bằng nhiệt nén HTES:</span>
                <span className="text-[10px] text-slate-400">Tăng thêm +6.5% điểm RTE</span>
              </div>
              <button
                onClick={() => setIncludeWasteHeatReheat(!includeWasteHeatReheat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  includeWasteHeatReheat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {includeWasteHeatReheat ? 'ĐANG BẬT' : 'TẮT'}
              </button>
            </div>

            <div className="p-4 bg-sky-950/20 rounded-xl border border-sky-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-sky-400 block mb-1">
                Tại Sao Tái Sinh Lạnh Đẩy RTE Lên &gt; 60%?
              </span>
              Nếu xả bỏ nhiệt lạnh -194°C ra môi trường, chu trình Claude chỉ đạt RTE khoảng 38-42%. Bằng cách giữ nhiệt lạnh trong khối sỏi CTES và truyền ngược lại làm lạnh trước dòng khí nạp nén từ nhiệt độ phòng xuống -150°C, khối lượng khí cần nén giảm tới 65%, giúp nhà máy đạt hiệu suất khứ hồi vượt trội tương đương thủy điện tích năng!
            </div>
          </div>

          {/* Efficiency Breakdown Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              Cơ Cấu Hiệu Suất &amp; Phân Bổ Năng Lượng
            </h3>

            {/* Big RTE Gauge Card */}
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-200">Hiệu Suất Khứ Hồi Điện-Điện (Round-Trip Efficiency)</span>
                <span className="text-2xl font-black font-mono text-cyan-400">
                  {cyclePerf.roundTripEfficiencyPercent.toFixed(1)} %
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${cyclePerf.roundTripEfficiencyPercent}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Chu trình cơ bản không tái sinh: ~40%</span>
                <span className="text-cyan-400 font-bold">Mục tiêu lưới điện: &gt; 60%</span>
                <span>Thủy điện tích năng: ~70%</span>
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Tốc Độ Hóa Lỏng Không Khí</span>
                <div className="text-2xl font-black text-cyan-400 font-mono my-1">
                  {cyclePerf.liquidAirProductionRateKgPerSec.toFixed(1)} <span className="text-xs font-normal text-slate-400">kg/giây</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Tương đương ~ 280 tấn không khí lỏng/giờ
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Thu Hồi Nhiệt Nén (HTES)</span>
                <div className="text-2xl font-black text-amber-400 font-mono my-1">
                  {cyclePerf.wasteHeatRecoveryTempC.toFixed(0)} <span className="text-xs font-normal text-slate-400">°C</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Tái cấp cho tuabin giãn nở đa tầng
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Thời Gian Lưu Trữ Liên Tục</span>
                <div className="text-2xl font-black text-emerald-400 font-mono my-1">
                  {cyclePerf.storageDurationHours} <span className="text-xs font-normal text-slate-400">giờ</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">
                  Dự trữ điện đa giờ (LDES)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: GIGA SCALE ECONOMICS (LAES VS BESS) */}
      {activeMode === 'GIGA_SCALE_ECONOMICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Key Metrics */}
          <div className="flex flex-col gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Chỉ Số Đầu Tư &amp; Kinh Tế LCOE
            </h3>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Tổng Suất Đầu Tư (CapEx)</span>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ${economics.capitalCostTotalMillionUSD.toFixed(1)}M
              </div>
              <span className="text-xs font-mono text-slate-300">
                ${economics.capitalCostPerKWhUSD.toFixed(1)} / kWh
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Chi Phí Lưu Trữ Điện Bình Quân (LCOS)</span>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                ${economics.levelizedCostOfStoragePerMWh.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ MWh</span>
              </div>
              <span className="text-[10px] text-slate-500">
                Bao gồm nạp điện giá rẻ $26/MWh &amp; O&amp;M 35 năm
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Giảm Phát Thải CO₂</span>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {economics.annualAvoidedCO2Tons.toFixed(0)} <span className="text-xs font-normal text-slate-400">tấn/năm</span>
              </div>
              <span className="text-[10px] text-slate-500">
                Thay thế nhà máy tuabin khí chạy đỉnh OCGT
              </span>
            </div>
          </div>

          {/* Direct Comparison vs Lithium-Ion BESS */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              So Sánh Trực Tiếp: LAES Không Khí Lỏng vs. Pin Pin Lithium-Ion (10h LDES)
            </h3>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 px-3 font-semibold">Tiêu Chí Đánh Giá</th>
                    <th className="py-2.5 px-3 font-bold text-cyan-400">LAES Không Khí Lỏng (Elementa)</th>
                    <th className="py-2.5 px-3 font-semibold text-slate-400">Pin Lithium-ion BESS (LFP/NMC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[11px]">
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-300">Tuổi thọ vận hành</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">&gt; 35 năm (không suy giảm)</td>
                    <td className="py-2.5 px-3 text-red-400">8 - 12 năm (chai pin, cần thay mới)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-300">Khoáng sản hiểm trở</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">0 kg (100% không khí tự nhiên)</td>
                    <td className="py-2.5 px-3 text-red-400">Phụ thuộc khai thác Lithium, Cobalt, Niken</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-300">Nguy cơ cháy nổ</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">Tuyệt đối không cháy (khí lạnh trơ)</td>
                    <td className="py-2.5 px-3 text-amber-400">Nguy cơ thoát nhiệt (Thermal Runaway)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-300">Ràng buộc địa hình</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">Tự do đặt ở bất kỳ đâu (Không cần hang/đồi)</td>
                    <td className="py-2.5 px-3 text-slate-300">Lắp đặt linh hoạt theo module container</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-300">Sản phẩm phụ giá trị cao</td>
                    <td className="py-2.5 px-3 font-bold text-cyan-400">Cung cấp Oxy y tế &amp; Nitơ lỏng công nghiệp</td>
                    <td className="py-2.5 px-3 text-slate-400">Không có (phát sinh rác thải điện tử)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-emerald-400 block mb-1">
                Tương Lai Năng Lượng Sạch Bền Vững (Zero Critical Mineral Dependency):
              </span>
              Khi hệ thống lưới điện toàn cầu tiến tới 80-100% năng lượng tái tạo, nhu cầu lưu trữ năng lượng đa giờ (8-24 giờ) sẽ bùng nổ lên hàng Terawatt-giờ. Nếu chỉ dựa vào pin hóa học lithium-ion, chuỗi cung ứng khoáng sản sẽ bị tê liệt và chi phí tái chế khổng lồ. LAES mở ra con đường lưu trữ xanh vô tận, tận dụng chính bầu khí quyển Trái Đất làm &ldquo;thùng chứa năng lượng&rdquo; vĩnh cửu.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
