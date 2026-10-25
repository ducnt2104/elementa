// src/components/visualizations/MicrochannelFischerTropschVisualizer.tsx
// Interactive Visualizer: Microchannel Fischer-Tropsch Catalytic Synthesis & Sustainable Aviation Fuel (SAF)
// Conforms to: ASTM D7566 Annex A2 (FT-SPK), ICAO CORSIA, EU ReFuelEU Aviation & Vietnam GDPT 2018 Chemistry

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Droplets,
  Plane,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  Gauge,
  Sliders,
  BarChart3,
  Factory,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import {
  FtCatalystType,
  ReactorArchitectureType,
  FT_CATALYST_CATALOG,
  REACTOR_ARCHITECTURE_CATALOG,
  calculateAsfDistribution,
  calculateMicrochannelHeatTransfer,
  calculatePlantMassEnergyBalance,
  evaluateAstmD7566Compliance,
  AVIATION_FUEL_BENCHMARKS
} from '../../domain/microchannelFischerTropschEngine';
import { sound } from '../../audio/soundEngine';

type FtTabMode =
  | 'ASF_DISTRIBUTION_AND_REACTOR_FLOW'
  | 'PLANT_MASS_ENERGY_SIMULATOR'
  | 'ASTM_D7566_SAF_CERTIFICATION_AND_BENCHMARK';

export const MicrochannelFischerTropschVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<FtTabMode>('ASF_DISTRIBUTION_AND_REACTOR_FLOW');

  // Mode 1: ASF & Reactor Flow state
  const [alphaChainGrowth, setAlphaChainGrowth] = useState<number>(0.90);
  const [selectedCatalyst, setSelectedCatalyst] = useState<FtCatalystType>('COBALT_RE_AL2O3');
  const [selectedReactor, setSelectedReactor] = useState<ReactorArchitectureType>('MICROCHANNEL_MODULAR');
  const [channelDiaMm, setChannelDiaMm] = useState<number>(1.5);

  // Mode 2: Mass & Energy Simulator state
  const [syngasFeedNm3PerHour, setSyngasFeedNm3PerHour] = useState<number>(12000);
  const [h2CoRatio, setH2CoRatio] = useState<number>(2.1);
  const [operatingTempC, setOperatingTempC] = useState<number>(220);
  const [enableWaxHydrocracking, setEnableWaxHydrocracking] = useState<boolean>(true);

  // Mode 3: ASTM D7566 Certification state
  const [isomerizationRatio, setIsomerizationRatio] = useState<number>(3.8);
  const [isGreenH2, setIsGreenH2] = useState<boolean>(true);
  const [isDacCo2, setIsDacCo2] = useState<boolean>(true);

  // Calculations
  const asf = useMemo(() => {
    return calculateAsfDistribution(alphaChainGrowth);
  }, [alphaChainGrowth]);

  const heatTransfer = useMemo(() => {
    return calculateMicrochannelHeatTransfer(selectedReactor, channelDiaMm);
  }, [selectedReactor, channelDiaMm]);

  const plantBalance = useMemo(() => {
    return calculatePlantMassEnergyBalance({
      syngasFeedNm3PerHour,
      h2CoRatio,
      operatingTempC,
      alpha: alphaChainGrowth,
      catalystType: selectedCatalyst,
      reactorType: selectedReactor,
      hydrocrackingWaxToSaf: enableWaxHydrocracking
    });
  }, [
    syngasFeedNm3PerHour,
    h2CoRatio,
    operatingTempC,
    alphaChainGrowth,
    selectedCatalyst,
    selectedReactor,
    enableWaxHydrocracking
  ]);

  const compliance = useMemo(() => {
    return evaluateAstmD7566Compliance({
      isomerizationIsoToNormalRatio: isomerizationRatio,
      greenHydrogenSource: isGreenH2,
      dacCarbonSource: isDacCo2
    });
  }, [isomerizationRatio, isGreenH2, isDacCo2]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* HEADER BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 shadow-inner">
            <Plane className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Tổng Hợp Fischer-Tropsch Vi Kênh & Nhiên Liệu Máy Bay Bền Vững (SAF)
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ASTM D7566 FT-SPK
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Công nghệ vi kênh tăng cường truyền nhiệt (U &gt; 7,500 W/m²K), phân bố Anderson-Schulz-Flory (ASF) và sản xuất dầu phản lực xanh Power-to-Liquid
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('ASF_DISTRIBUTION_AND_REACTOR_FLOW');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'ASF_DISTRIBUTION_AND_REACTOR_FLOW'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Sơ Đồ Vi Kênh & Phân Bố ASF
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('PLANT_MASS_ENERGY_SIMULATOR');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'PLANT_MASS_ENERGY_SIMULATOR'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            Cân Bằng Vật Chất Nhà Máy
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveMode('ASTM_D7566_SAF_CERTIFICATION_AND_BENCHMARK');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'ASTM_D7566_SAF_CERTIFICATION_AND_BENCHMARK'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Chứng Nhận ASTM D7566 & So Sánh
          </button>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* MODE 1: ASF DISTRIBUTION & REACTOR FLOW */}
        {activeMode === 'ASF_DISTRIBUTION_AND_REACTOR_FLOW' && (
          <div className="space-y-6">
            {/* Interactive SVG Diagram of Microchannel FT Reactor */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  Sơ Đồ Lò Phản Ứng Vi Kênh Fischer-Tropsch (Tăng Cường Truyền Nhiệt U = {heatTransfer.heatTransferCoefficientWPerM2K} W/m²·K)
                </span>
                <span className="text-[11px] text-slate-400">
                  Phản ứng tỏa nhiệt: n CO + (2n+1) H₂ → CₙH₂ₙ₊₂ + n H₂O (ΔH = -165 kJ/mol CO)
                </span>
              </div>

              <div className="w-full bg-slate-950 rounded-lg p-2 border border-slate-800 flex items-center justify-center">
                <svg viewBox="0 0 900 280" className="w-full max-w-4xl h-auto select-none">
                  <defs>
                    <linearGradient id="syngasGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="coolantGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                    <linearGradient id="productGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>

                  {/* Feed Section: Syngas Inlet */}
                  <rect x="20" y="110" width="130" height="60" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="85" y="135" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Khí Tổng Hợp Syngas</text>
                  <text x="85" y="153" fill="#94a3b8" fontSize="10" textAnchor="middle">H₂ + CO (Tỷ lệ 2.1:1)</text>

                  {/* Flow Arrow to Reactor */}
                  <line x1="150" y1="140" x2="220" y2="140" stroke="url(#syngasGrad)" strokeWidth="4" markerEnd="url(#arrow)" />

                  {/* Microchannel Reactor Block */}
                  <rect x="220" y="40" width="300" height="200" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                  <text x="370" y="65" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Lõi Lò Phản Ứng Vi Kênh (D_h = {heatTransfer.hydraulicDiameterMm} mm)
                  </text>

                  {/* Microchannel fins and slits */}
                  {[0, 1, 2, 3, 4, 5, 6].map(i => (
                    <g key={i}>
                      {/* Reactant channel */}
                      <rect x="240" y={80 + i * 20} width="260" height="8" rx="2" fill="#134e4a" stroke="#14b8a6" strokeWidth="1" />
                      {/* Boiling water cooling slit */}
                      <rect x="240" y={90 + i * 20} width="260" height="4" rx="1" fill="#0284c7" opacity="0.8" />
                    </g>
                  ))}

                  <text x="370" y="228" fill="#38bdf8" fontSize="10" textAnchor="middle">
                    Kênh Xúc Tác Co-Re xen kẽ Lớp Nước Sôi Làm Mát (ΔT &lt; {heatTransfer.radialDeltaTMaxDegC}°C)
                  </text>

                  {/* Steam Outlet on top of Reactor */}
                  <line x1="370" y1="40" x2="370" y2="15" stroke="#f59e0b" strokeWidth="3" />
                  <circle cx="370" cy="15" r="4" fill="#f59e0b" />
                  <text x="370" y="8" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Hơi Nước Bão Hòa 20 bar (Thu Hồi Nhiệt -165 kJ/mol)
                  </text>

                  {/* Arrow from Reactor to 3-Phase Separator */}
                  <line x1="520" y1="140" x2="580" y2="140" stroke="url(#productGrad)" strokeWidth="4" />

                  {/* 3-Phase High-Pressure Separator */}
                  <rect x="580" y="60" width="110" height="160" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                  <text x="635" y="85" fill="#f1f5f9" fontSize="11" fontWeight="bold" textAnchor="middle">Bộ Tách 3 Pha</text>
                  <text x="635" y="102" fill="#94a3b8" fontSize="9" textAnchor="middle">Khí / Nước / Syncrude</text>

                  {/* Separator exits */}
                  {/* Top: Tail Gas */}
                  <line x1="635" y1="60" x2="635" y2="35" stroke="#94a3b8" strokeWidth="2" />
                  <text x="635" y="28" fill="#94a3b8" fontSize="9" textAnchor="middle">Khí Đốt Hồi Lưu (C₁-C₄)</text>

                  {/* Bottom: Reaction Water */}
                  <line x1="635" y1="220" x2="635" y2="245" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="635" y="258" fill="#38bdf8" fontSize="9" textAnchor="middle">Nước Phản Ứng (H₂O)</text>

                  {/* Middle to Hydrocracker */}
                  <line x1="690" y1="140" x2="740" y2="140" stroke="#f59e0b" strokeWidth="3" />

                  {/* Hydrocracker & Isomerization Skid */}
                  <rect x="740" y="90" width="140" height="100" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                  <text x="810" y="115" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Cracking Sáp &amp;</text>
                  <text x="810" y="132" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Đồng Phân Hóa Iso</text>
                  <text x="810" y="152" fill="#e2e8f0" fontSize="10" fontWeight="black" textAnchor="middle">
                    ✈ XUẤT SAF KEROSENE
                  </text>
                  <text x="810" y="170" fill="#94a3b8" fontSize="9" textAnchor="middle">ASTM D7566 FT-SPK</text>
                </svg>
              </div>
            </div>

            {/* Controls for ASF and Catalyst/Reactor */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Alpha Chain Growth Slider */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Xác Suất Phát Triển Mạch (alpha - ASF):</span>
                  <span className="text-emerald-400 font-bold">{alphaChainGrowth.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.65"
                  max="0.95"
                  step="0.01"
                  value={alphaChainGrowth}
                  onChange={e => {
                    sound.playUiClick();
                    setAlphaChainGrowth(parseFloat(e.target.value));
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400 leading-relaxed">
                  Công thức ASF: <span className="text-emerald-300 font-mono">W_n = n·(1-α)²·α^(n-1)</span>. Khi α = 0.90, tối ưu phân đoạn dầu phản lực (C₉-C₁₆) và sinh ra lượng sáp C₂₃⁺ để bẻ gãy xúc tác.
                </div>
              </div>

              {/* Catalyst Selector */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Hệ Xúc Tác Fischer-Tropsch:</label>
                <select
                  value={selectedCatalyst}
                  onChange={e => {
                    sound.playUiClick();
                    const cat = e.target.value as FtCatalystType;
                    setSelectedCatalyst(cat);
                    setAlphaChainGrowth(FT_CATALYST_CATALOG[cat].typicalAlpha);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
                >
                  {Object.values(FT_CATALYST_CATALOG).map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} (T: {c.optimalTemperatureRangeC[0]}-{c.optimalTemperatureRangeC[1]}°C, α ~ {c.typicalAlpha})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  {FT_CATALYST_CATALOG[selectedCatalyst].description}
                </div>
              </div>

              {/* Reactor Architecture Selector */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="text-xs font-semibold text-slate-300">Kiến Trúc Lò Phản Ứng:</label>
                <select
                  value={selectedReactor}
                  onChange={e => {
                    sound.playUiClick();
                    const r = e.target.value as ReactorArchitectureType;
                    setSelectedReactor(r);
                    setChannelDiaMm(REACTOR_ARCHITECTURE_CATALOG[r].hydraulicDiameterMm);
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-emerald-300 focus:outline-none focus:border-emerald-500"
                >
                  {Object.values(REACTOR_ARCHITECTURE_CATALOG).map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  {REACTOR_ARCHITECTURE_CATALOG[selectedReactor].description}
                </div>
              </div>
            </div>

            {/* ASF Fractions Breakdown Table */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  Phổ Phân Bố Trọng Lượng Sản Phẩm ASF (Tổng C₅⁺ = {asf.totalC5PlusSelectivityPct}%)
                </h3>
                <span className="text-xs text-emerald-300 font-bold">
                  SAF Kerosene (C₉ - C₁₆): {asf.c9C16KeroseneSafPct}%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {asf.fractions.map(f => {
                  const isSaf = f.carbonRange === 'C₉ - C₁₆';
                  const isWax = f.carbonRange === 'C₂₃⁺';
                  return (
                    <div
                      key={f.carbonRange}
                      className={`p-3 rounded-lg border text-xs space-y-1.5 transition-all ${
                        isSaf
                          ? 'bg-emerald-950/50 border-emerald-500/60 shadow-lg'
                          : isWax
                          ? 'bg-amber-950/40 border-amber-600/50'
                          : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200">{f.name}</span>
                        <span className={`font-black ${isSaf ? 'text-emerald-400' : isWax ? 'text-amber-400' : 'text-slate-400'}`}>
                          {f.weightFractionPct}%
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Khoảng Carbon: <span className="text-slate-200 font-semibold">{f.carbonRange}</span></span>
                        <span>Đại diện: <span className="font-mono text-cyan-300">{f.formulaRepresentative}</span></span>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Nhiệt độ sôi: {f.boilingPointRangeC}</span>
                        <span>Tỷ trọng: {f.densityKgPerL} kg/L</span>
                      </div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                        Ứng dụng: {f.primaryApplication}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: PLANT MASS & ENERGY BALANCE SIMULATOR */}
        {activeMode === 'PLANT_MASS_ENERGY_SIMULATOR' && (
          <div className="space-y-6">
            {/* Input Controls */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Thông Số Vận Hành Nhà Máy Power-to-Liquid (PtL) Fischer-Tropsch
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Syngas Feed */}
                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Lưu lượng khí Syngas:</span>
                    <span className="font-bold text-emerald-400">{syngasFeedNm3PerHour.toLocaleString()} Nm³/h</span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="50000"
                    step="1000"
                    value={syngasFeedNm3PerHour}
                    onChange={e => {
                      sound.playUiClick();
                      setSyngasFeedNm3PerHour(parseInt(e.target.value));
                    }}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* H2/CO Ratio */}
                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tỷ lệ mol H₂ / CO:</span>
                    <span className="font-bold text-cyan-400">{h2CoRatio.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="2.5"
                    step="0.05"
                    value={h2CoRatio}
                    onChange={e => {
                      sound.playUiClick();
                      setH2CoRatio(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                {/* Operating Temp */}
                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Nhiệt độ phản ứng:</span>
                    <span className="font-bold text-amber-400">{operatingTempC}°C</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="260"
                    step="2"
                    value={operatingTempC}
                    onChange={e => {
                      sound.playUiClick();
                      setOperatingTempC(parseInt(e.target.value));
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Hydrocracking Toggle */}
                <div className="flex flex-col justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400">Bẻ gãy Hydrocracking Sáp C₂₃⁺:</span>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setEnableWaxHydrocracking(!enableWaxHydrocracking);
                    }}
                    className={`mt-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      enableWaxHydrocracking
                        ? 'bg-emerald-600/80 text-white border border-emerald-400'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {enableWaxHydrocracking ? '✓ Bật Chuyển 80% Sáp thành SAF' : '✕ Chỉ Lấy SAF Trực Tiếp'}
                  </button>
                </div>
              </div>
            </div>

            {/* Key Output Performance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Dầu Thô Tổng Hợp (Syncrude)</span>
                  <Droplets className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-cyan-300">
                  {plantBalance.syncrudeProductionKgPerHour.toLocaleString()} <span className="text-sm font-normal text-cyan-400">kg/h</span>
                </div>
                <div className="text-xs text-slate-400">
                  Tương đương <span className="font-semibold text-slate-200">{plantBalance.syncrudeProductionBpd.toLocaleString()} thùng dầu/ngày</span> (BPD)
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-emerald-500/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Sản Lượng SAF Hàng Không</span>
                  <Plane className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black text-emerald-300">
                  {plantBalance.totalSafWithHydrocrackingKgPerHour.toLocaleString()} <span className="text-sm font-normal text-emerald-400">kg/h</span>
                </div>
                <div className="text-xs text-slate-400">
                  Tổng cộng <span className="font-semibold text-emerald-400">{plantBalance.totalSafAnnualMetricTons.toLocaleString()} tấn/năm</span>
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Chuyến Bay Được Tiếp Nhiên Liệu</span>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-black text-purple-300">
                  {plantBalance.flightsPoweredPerYear.toLocaleString()} <span className="text-sm font-normal text-purple-400">chuyến/năm</span>
                </div>
                <div className="text-xs text-slate-400">
                  Đường bay Hà Nội - TP.HCM (Airbus A321 / B737)
                </div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs">
                  <span>Khí Thải CO₂ Giảm Thiểu</span>
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl font-black text-teal-300">
                  {plantBalance.co2EquivalentAvoidedTonsPerYear.toLocaleString()} <span className="text-sm font-normal text-teal-400">tấn CO₂/năm</span>
                </div>
                <div className="text-xs text-slate-400">
                  Cắt giảm 91.5% phát thải vòng đời so với Jet A-1
                </div>
              </div>
            </div>

            {/* Heat Integration & Exothermic Cogeneration */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Tích Hợp Nhiệt Tỏa &amp; Sản Xuất Hơi Nước Bão Hòa (Cogeneration)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-400">Nhiệt phản ứng giải phóng (ΔH = -165 kJ/mol):</span>
                  <div className="text-lg font-bold text-amber-400">{plantBalance.reactionHeatGeneratedMwTh} MWth</div>
                  <span className="text-[11px] text-slate-500">Phản ứng tổng hợp hydrocacbon tỏa nhiệt cực lớn</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-400">Hơi nước 20 bar đồng phát (Steam Cogenerated):</span>
                  <div className="text-lg font-bold text-cyan-400">{plantBalance.mediumPressureSteamGeneratedTonsPerHour} tấn/giờ</div>
                  <span className="text-[11px] text-slate-500">Cung cấp nhiệt cho tháp chưng cất và Reforming</span>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-400">Độ chuyển hóa CO một lần (Single-pass):</span>
                  <div className="text-lg font-bold text-emerald-400">{plantBalance.coConversionPct}%</div>
                  <span className="text-[11px] text-slate-500">Lò vi kênh đạt độ chuyển hóa cao hơn cố định (68%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: ASTM D7566 CERTIFICATION & BENCHMARKS */}
        {activeMode === 'ASTM_D7566_SAF_CERTIFICATION_AND_BENCHMARK' && (
          <div className="space-y-6">
            {/* Certification Simulator */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Mô Phỏng Kiểm Định Tiêu Chuẩn Hàng Không ASTM D7566 Annex A2 (FT-SPK)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Isomerization Slider */}
                <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Tỷ lệ Đồng phân hóa Iso / Normal:</span>
                    <span className="text-emerald-400 font-bold">{isomerizationRatio.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="5.0"
                    step="0.1"
                    value={isomerizationRatio}
                    onChange={e => {
                      sound.playUiClick();
                      setIsomerizationRatio(parseFloat(e.target.value));
                    }}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-slate-400">
                    Target ≥ 3.2 để hạ điểm đông đặc dưới -47.0°C (chuẩn Jet A-1)
                  </div>
                </div>

                {/* Green H2 Toggle */}
                <div className="flex flex-col justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-300">Nguồn Hydro:</span>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setIsGreenH2(!isGreenH2);
                    }}
                    className={`mt-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isGreenH2
                        ? 'bg-emerald-600/80 text-white border border-emerald-400'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isGreenH2 ? '✓ Hydro Xanh Điện Phân Nước' : '✕ Hydro Xám Hóa Thạch'}
                  </button>
                </div>

                {/* DAC CO2 Toggle */}
                <div className="flex flex-col justify-between bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-300">Nguồn Carbon:</span>
                  <button
                    onClick={() => {
                      sound.playUiClick();
                      setIsDacCo2(!isDacCo2);
                    }}
                    className={`mt-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isDacCo2
                        ? 'bg-emerald-600/80 text-white border border-emerald-400'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isDacCo2 ? '✓ Thu Hút Khí Quyển Trực Tiếp (DAC CO₂)' : '✕ Khí Thải Công Nghiệp Hóa Thạch'}
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-xl border flex items-start gap-3.5 text-xs ${
                compliance.isCompliant
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                {compliance.isCompliant ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-sm">
                    {compliance.isCompliant ? 'ĐẠT CHUẨN ASTM D7566 ANNEX A2 (FT-SPK)' : 'CHƯA ĐẠT CHUẨN JET A-1'}
                  </div>
                  <div className="leading-relaxed">{compliance.technicalAssessment}</div>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                      Điểm đông đặc: <span className="font-bold text-white">{compliance.freezingPointDegC}°C</span> (Tiêu chuẩn: ≤ -47°C)
                    </span>
                    <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                      Mật độ năng lượng: <span className="font-bold text-white">{compliance.energyDensityMjPerKg} MJ/kg</span> (&gt; 42.8)
                    </span>
                    <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                      Tỷ lệ phối trộn: <span className="font-bold text-white">Tối đa {compliance.blendRatioMaxPct}% Drop-in</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Aviation Fuel Benchmark Matrix */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-cyan-400" />
                Ma Trận So Sánh Kỹ Thuật 4 Loại Nhiên Liệu Hàng Không Quốc Tế
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300 border-collapse">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Loại Nhiên Liệu</th>
                      <th className="py-2.5 px-3">Mật Độ Năng Lượng</th>
                      <th className="py-2.5 px-3">Điểm Đông Đặc</th>
                      <th className="py-2.5 px-3">Lưu Huỳnh (S)</th>
                      <th className="py-2.5 px-3">Giảm Bụi Mịn (Soot)</th>
                      <th className="py-2.5 px-3">Giảm CO₂ Vòng Đời</th>
                      <th className="py-2.5 px-3">Tỷ Lệ Drop-in</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {AVIATION_FUEL_BENCHMARKS.map((b, idx) => (
                      <tr key={idx} className={b.fuelTypeName.includes('FT-SPK') ? 'bg-emerald-950/20 font-semibold' : 'hover:bg-slate-900/50'}>
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-100">{b.fuelTypeName}</div>
                          <div className="text-[10px] text-slate-500">{b.sourceFeedstock}</div>
                        </td>
                        <td className="py-2.5 px-3 text-cyan-300 font-mono">{b.energyDensityMjPerKg} MJ/kg</td>
                        <td className="py-2.5 px-3 text-slate-200 font-mono">{b.freezingPointLimitC}°C</td>
                        <td className="py-2.5 px-3 text-slate-300">{b.sulfurContentPpm}</td>
                        <td className="py-2.5 px-3 text-emerald-400">-{b.sootParticulateReductionPct}%</td>
                        <td className="py-2.5 px-3 text-emerald-400 font-bold">-{b.lifeCycleGhgReductionPct}%</td>
                        <td className="py-2.5 px-3 text-amber-300">{b.maxDropInBlendPct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER BAR */}
      <div className="bg-slate-900/90 p-3 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-emerald-400" />
          <span>
            Chuẩn ASTM D7566 Annex A2 • ICAO CORSIA Certified • ReFuelEU Aviation • Lò Vi Kênh Modular Skid
          </span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          U = {heatTransfer.heatTransferCoefficientWPerM2K} W/(m²K) • Single-pass CO: {plantBalance.coConversionPct}%
        </div>
      </div>
    </div>
  );
};
