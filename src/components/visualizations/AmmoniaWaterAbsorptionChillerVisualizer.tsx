// src/components/visualizations/AmmoniaWaterAbsorptionChillerVisualizer.tsx
// Interactive Visualizer: Closed-Loop Thermochemical Ammonia-Water (NH3-H2O) Absorption Chiller
// Standards: IUPAC Physical Chemistry, Binary Vapor-Liquid Equilibria, GDPT 2018 Chemistry & AI Data Center Cogeneration

import React, { useState, useMemo } from 'react';
import {
  Snowflake,
  Flame,
  Gauge,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Server,
  DollarSign,
  TrendingDown,
  Droplets,
  Cpu,
  Zap,
  ArrowRight
} from 'lucide-react';
import {
  WASTE_HEAT_SOURCES,
  ABSORPTION_CYCLES,
  WasteHeatSourceType,
  AbsorptionCycleType,
  calculateAmmoniaWaterEquilibrium,
  calculateAbsorptionChillerPerformance,
  calculateDataCenterCogenerationEconomics
} from '../../domain/ammoniaWaterAbsorptionChillerEngine';
import { sound } from '../../audio/soundEngine';

type ChillerTabMode =
  | 'VAPOR_LIQUID_EQUILIBRIUM_RECTIFICATION'
  | 'THERMAL_COP_ENERGY_BALANCE'
  | 'AI_DATA_CENTER_COGENERATION';

export const AmmoniaWaterAbsorptionChillerVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ChillerTabMode>('VAPOR_LIQUID_EQUILIBRIUM_RECTIFICATION');

  // Controls for Mode 1 & 2
  const [cycleType, setCycleType] = useState<AbsorptionCycleType>('SINGLE_EFFECT_STANDARD');
  const [wasteHeatSource, setWasteHeatSource] = useState<WasteHeatSourceType>('AI_DATA_CENTER_EXHAUST');
  const [generatorTempC, setGeneratorTempC] = useState<number>(100.0);
  const [condenserTempC, setCondenserTempC] = useState<number>(35.0);
  const [evaporatorTempC, setEvaporatorTempC] = useState<number>(5.0);
  const [thermalInputKW, setThermalInputKW] = useState<number>(1000.0);

  // Controls for Mode 3 (AI Data Center)
  const [itServerLoadMW, setItServerLoadMW] = useState<number>(10.0);
  const [wasteHeatCaptureFraction, setWasteHeatCaptureFraction] = useState<number>(0.85);

  const currentCycle = ABSORPTION_CYCLES[cycleType];
  const currentHeatSource = WASTE_HEAT_SOURCES[wasteHeatSource];

  // Domain Calculations
  const equilibriumResult = useMemo(() => {
    return calculateAmmoniaWaterEquilibrium(generatorTempC, 18.0);
  }, [generatorTempC]);

  const performanceResult = useMemo(() => {
    return calculateAbsorptionChillerPerformance(
      thermalInputKW,
      generatorTempC,
      condenserTempC,
      evaporatorTempC,
      cycleType
    );
  }, [thermalInputKW, generatorTempC, condenserTempC, evaporatorTempC, cycleType]);

  const dataCenterResult = useMemo(() => {
    return calculateDataCenterCogenerationEconomics(itServerLoadMW, wasteHeatCaptureFraction);
  }, [itServerLoadMW, wasteHeatCaptureFraction]);

  const handleModeChange = (mode: ChillerTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setCycleType('SINGLE_EFFECT_STANDARD');
    setWasteHeatSource('AI_DATA_CENTER_EXHAUST');
    setGeneratorTempC(100.0);
    setCondenserTempC(35.0);
    setEvaporatorTempC(5.0);
    setThermalInputKW(1000.0);
    setItServerLoadMW(10.0);
    setWasteHeatCaptureFraction(0.85);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/30 rounded-2xl border border-cyan-500/40 text-cyan-400">
            <Snowflake className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/30">
                Lạnh Nhiệt Hóa Hấp Thụ NH₃-H₂O (Absorption Chiller)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                COP Điện Hiệu Dụng &gt; 50 • GWP = 0 • ODP = 0
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Ammonia-Water Thermochemical Absorption Refrigeration
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Cân bằng lỏng-hơi nhị phân NH₃-H₂O &amp; Chưng cất tinh cất • Tận dụng nhiệt thải làm mát GPU trung tâm dữ liệu AI &amp; Khí lò công nghiệp
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('VAPOR_LIQUID_EQUILIBRIUM_RECTIFICATION')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'VAPOR_LIQUID_EQUILIBRIUM_RECTIFICATION'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Cân Bằng Lỏng-Hơi &amp; Tinh Cất</span>
          </button>

          <button
            onClick={() => handleModeChange('THERMAL_COP_ENERGY_BALANCE')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'THERMAL_COP_ENERGY_BALANCE'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>COP Nhiệt &amp; Cân Bằng Năng Lượng</span>
          </button>

          <button
            onClick={() => handleModeChange('AI_DATA_CENTER_COGENERATION')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'AI_DATA_CENTER_COGENERATION'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Đồng Phát Nhiệt Trung Tâm AI</span>
          </button>
        </div>
      </div>

      {/* MODE 1: BINARY EQUILIBRIUM & RECTIFICATION SCHEMATIC */}
      {activeMode === 'VAPOR_LIQUID_EQUILIBRIUM_RECTIFICATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls & Metrics Panel */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <Flame className="w-4 h-4 text-cyan-400" />
                Thông Số Sinh Hơi Generator
              </h3>
              <button
                onClick={resetDefaults}
                className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Khôi phục mặc định"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Generator Temperature */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ sinh hơi (T_gen):</span>
                <span className="font-mono text-cyan-400 font-bold">{generatorTempC.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="80"
                max="140"
                step="1"
                value={generatorTempC}
                onChange={(e) => setGeneratorTempC(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>80 °C (Nhiệt nước GPU)</span>
                <span>110 °C</span>
                <span>140 °C (Khí lò)</span>
              </div>
            </div>

            {/* Waste Heat Source Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 font-semibold">Nguồn nhiệt thải đầu vào:</label>
              <select
                value={wasteHeatSource}
                onChange={(e) => setWasteHeatSource(e.target.value as WasteHeatSourceType)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {Object.values(WASTE_HEAT_SOURCES).map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                {currentHeatSource.vietnameseDescription}
              </p>
            </div>

            {/* Equilibrium Results Card */}
            <div className="flex flex-col gap-3 p-4 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Kết Quả Cân Bằng Dung Dịch NH₃-H₂O
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Nồng độ đậm (x_strong):</span>
                  <span className="font-mono text-cyan-300 font-bold text-sm">
                    {equilibriumResult.strongSolutionMassFractionPercent.toFixed(1)} %
                  </span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Nồng độ loãng (x_weak):</span>
                  <span className="font-mono text-amber-300 font-bold text-sm">
                    {equilibriumResult.weakSolutionMassFractionPercent.toFixed(1)} %
                  </span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Độ tinh khiết hơi NH₃:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    {equilibriumResult.ammoniaVaporPurityPercent.toFixed(2)} %
                  </span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Tỉ số tuần hoàn (f):</span>
                  <span className="font-mono text-purple-300 font-bold text-sm">
                    {equilibriumResult.circulationRatio.toFixed(2)} kg/kg
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
              <span className="font-semibold text-cyan-400 block mb-1">Cơ chế Tách Nước Rectifier:</span>
              Dung môi nước có nhiệt độ sôi cao hơn NH₃ nhưng vẫn có áp suất hơi riêng phần. Cột tinh cất (Rectifier) làm lạnh cục bộ hồi lưu giúp ngưng tụ hơi nước quay về bộ sinh hơi, đảm bảo hơi NH₃ vào bình ngưng đạt độ tinh khiết &gt; 99.8%, chống đông tắc van tiết lưu ở -10°C đến 5°C.
            </div>
          </div>

          {/* Interactive Flow Schematic (SVG) */}
          <div className="lg:col-span-2 flex flex-col gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 justify-center">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                Sơ Đồ Chu Trình Lạnh Hấp Thụ NH₃-H₂O Khép Kín
              </span>
              <span className="text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30">
                P_cao = 18.0 bar • P_thấp = 4.2 bar
              </span>
            </div>

            {/* SVG Schematic */}
            <div className="w-full bg-slate-950 rounded-2xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 700 380" className="w-full h-auto max-h-[360px]">
                <defs>
                  <linearGradient id="gradGen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#c2410c" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradCond" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradEvap" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradAbs" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Piping Connections */}
                {/* 1. Vapor NH3 from Generator/Rectifier to Condenser */}
                <path d="M 180 80 L 350 80 L 350 110" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6,4" />
                <polygon points="350,115 345,105 355,105" fill="#38bdf8" />

                {/* 2. Liquid NH3 from Condenser through Expansion Valve to Evaporator */}
                <path d="M 430 140 L 530 140 L 530 220" fill="none" stroke="#0284c7" strokeWidth="3" />
                <polygon points="530,225 525,215 535,215" fill="#0284c7" />

                {/* Expansion Valve Symbol */}
                <polygon points="520,175 540,175 530,185" fill="#94a3b8" />
                <polygon points="520,195 540,195 530,185" fill="#94a3b8" />
                <text x="548" y="188" fill="#cbd5e1" fontSize="10" fontFamily="sans-serif">Van tiết lưu</text>

                {/* 3. Low-pressure NH3 vapor from Evaporator to Absorber */}
                <path d="M 450 270 L 350 270 L 350 300 L 180 300" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6,4" />
                <polygon points="175,300 185,295 185,305" fill="#38bdf8" />

                {/* 4. Strong Solution from Absorber to Pump & Generator */}
                <path d="M 120 330 L 120 350 L 50 350 L 50 120 L 100 120" fill="none" stroke="#10b981" strokeWidth="3" />
                {/* Solution Pump */}
                <circle cx="50" cy="240" r="16" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
                <polygon points="45,232 58,240 45,248" fill="#10b981" />
                <text x="72" y="244" fill="#34d399" fontSize="10" fontWeight="bold">Bơm dung dịch (&lt;2 kW)</text>

                {/* Solution Heat Exchanger (SHE) */}
                <rect x="35" y="140" width="30" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="18" y="132" fill="#fbbf24" fontSize="9">Hồi nhiệt SHE</text>

                {/* Weak Solution from Generator back to Absorber */}
                <path d="M 140 160 L 140 240" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="140,245 135,235 145,235" fill="#f59e0b" />

                {/* Main Component Boxes */}
                {/* GENERATOR */}
                <rect x="100" y="50" width="80" height="110" rx="8" fill="url(#gradGen)" stroke="#ea580c" strokeWidth="2" />
                <text x="140" y="75" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">GENERATOR</text>
                <text x="140" y="95" fill="#fed7aa" fontSize="10" textAnchor="middle">Sinh hơi</text>
                <text x="140" y="115" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{generatorTempC.toFixed(0)} °C</text>
                <text x="140" y="135" fill="#ffedd5" fontSize="9" textAnchor="middle">18.0 bar</text>

                {/* Rectifier Column on top of Generator */}
                <rect x="125" y="20" width="30" height="30" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="140" y="38" fill="#e2e8f0" fontSize="8" textAnchor="middle">Rectifier</text>

                {/* CONDENSER */}
                <rect x="350" y="90" width="80" height="70" rx="8" fill="url(#gradCond)" stroke="#0284c7" strokeWidth="2" />
                <text x="390" y="115" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">CONDENSER</text>
                <text x="390" y="132" fill="#e0f2fe" fontSize="10" textAnchor="middle">Ngưng tụ</text>
                <text x="390" y="148" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">{condenserTempC.toFixed(0)} °C</text>

                {/* EVAPORATOR */}
                <rect x="450" y="230" width="90" height="75" rx="8" fill="url(#gradEvap)" stroke="#0369a1" strokeWidth="2" />
                <text x="495" y="255" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">EVAPORATOR</text>
                <text x="495" y="272" fill="#e0f2fe" fontSize="10" textAnchor="middle">Bay hơi tạo lạnh</text>
                <text x="495" y="290" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">{evaporatorTempC.toFixed(0)} °C (Nước lạnh 7°C)</text>

                {/* ABSORBER */}
                <rect x="100" y="250" width="80" height="80" rx="8" fill="url(#gradAbs)" stroke="#059669" strokeWidth="2" />
                <text x="140" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">ABSORBER</text>
                <text x="140" y="295" fill="#d1fae5" fontSize="10" textAnchor="middle">Hấp thụ</text>
                <text x="140" y="315" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">35 °C • 4.2 bar</text>

                {/* Heat In / Heat Out annotations */}
                <text x="140" y="180" fill="#fb923c" fontSize="10" textAnchor="middle">🔥 Q_in (Nhiệt thải)</text>
                <text x="390" y="75" fill="#93c5fd" fontSize="10" textAnchor="middle">❄️ Q_out (Tháp giải nhiệt)</text>
                <text x="495" y="325" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">🧊 Q_cool (Làm mát GPU/Tòa nhà)</text>
                <text x="140" y="348" fill="#a7f3d0" fontSize="10" textAnchor="middle">💧 Q_out (Nhiệt hấp thụ)</text>
              </svg>
            </div>

            {/* Quick Summary Banner */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Năng lượng cung cấp:</span>
                <span className="font-bold text-amber-400">98.5% Nhiệt thải</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Điện năng tiêu thụ:</span>
                <span className="font-bold text-emerald-400">1.5% Bơm dung dịch</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Môi chất lạnh:</span>
                <span className="font-bold text-cyan-400">R717 (NH₃ Tự Nhiên)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: THERMAL COP & ENERGY BALANCE */}
      {activeMode === 'THERMAL_COP_ENERGY_BALANCE' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-400" />
              Thiết Lập Chu Trình &amp; Nhiệt Độ
            </h3>

            {/* Cycle Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate-400 font-semibold">Cấu hình chu trình:</label>
              <select
                value={cycleType}
                onChange={(e) => setCycleType(e.target.value as AbsorptionCycleType)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {Object.values(ABSORPTION_CYCLES).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                {currentCycle.vietnameseFeature}
              </p>
            </div>

            {/* Thermal Input Heat Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Công suất nhiệt thải cấp (Q_in):</span>
                <span className="font-mono text-amber-400 font-bold">{thermalInputKW.toFixed(0)} kW</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="50"
                value={thermalInputKW}
                onChange={(e) => setThermalInputKW(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Condenser Temperature */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ ngưng tụ (T_cond):</span>
                <span className="font-mono text-cyan-400 font-bold">{condenserTempC.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="25"
                max="45"
                step="0.5"
                value={condenserTempC}
                onChange={(e) => setCondenserTempC(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Evaporator Temperature */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Nhiệt độ bay hơi (T_evap):</span>
                <span className="font-mono text-blue-400 font-bold">{evaporatorTempC.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="-15"
                max="12"
                step="1"
                value={evaporatorTempC}
                onChange={(e) => setEvaporatorTempC(parseFloat(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>-15 °C (Đông lạnh âm sâu)</span>
                <span>5 °C (Điều hòa)</span>
                <span>12 °C (Làm mát IT)</span>
              </div>
            </div>
          </div>

          {/* Performance Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Bảng Chỉ Số Năng Lượng &amp; Hiệu Suất COP
            </h3>

            {/* Big Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Công Suất Lạnh (Q_cool)</span>
                <div className="text-2xl font-black text-cyan-400 font-mono my-1">
                  {performanceResult.coolingCapacityKW.toFixed(0)} <span className="text-sm font-normal text-slate-400">kW</span>
                </div>
                <span className="text-[10px] text-slate-500">
                  Lưu lượng nước lạnh: {performanceResult.chilledWaterFlowRateLpmAt7C.toFixed(0)} L/phút
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">COP Nhiệt (Thermal COP)</span>
                <div className="text-2xl font-black text-blue-400 font-mono my-1">
                  {performanceResult.thermalCop.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-500">
                  Carnot tối đa: {performanceResult.carnotMaxThermalCop.toFixed(2)}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Điện Bơm Dung Dịch</span>
                <div className="text-2xl font-black text-emerald-400 font-mono my-1">
                  {performanceResult.pumpElectricPowerKW.toFixed(1)} <span className="text-sm font-normal text-slate-400">kW</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Tiết kiệm &gt;95% điện so với máy nén
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-[11px] text-slate-400 font-semibold uppercase">COP Điện Hiệu Dụng</span>
                <div className="text-2xl font-black text-purple-400 font-mono my-1">
                  {performanceResult.effectiveElectricCop.toFixed(1)}
                </div>
                <span className="text-[10px] text-purple-400 font-semibold">
                  Q_cool / W_bơm điện
                </span>
              </div>
            </div>

            {/* Comparison vs Mechanical Vapor Compression */}
            <div className="flex flex-col gap-3 p-5 bg-blue-950/20 rounded-2xl border border-blue-500/20">
              <span className="text-sm font-bold text-blue-300">
                So Sánh: Máy Lạnh Hấp Thụ NH₃-H₂O vs. Máy Lạnh Nén Hơi Truyền Thống (Chiller Điện)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-400 block mb-1">Máy Lạnh Hấp Thụ NH₃-H₂O (Elementa):</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                    <li>Nguồn động lực chính: Nhiệt thải 80-140°C (không tốn tiền mua điện).</li>
                    <li>Tiêu thụ điện: Chỉ cấp cho bơm dung dịch lỏng thể tích bé ({performanceResult.pumpElectricPowerKW.toFixed(1)} kW).</li>
                    <li>Môi chất: NH₃ tinh khiết tự nhiên (GWP = 0, ODP = 0).</li>
                    <li>Độ bền: &gt; 25 năm do không có máy nén quay piston cơ học phức tạp.</li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <span className="font-bold text-red-400 block mb-1">Máy Lạnh Nén Hơi Dùng Điện (Vapor-Compression):</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                    <li>Nguồn động lực: 100% điện lưới cao thế kéo máy nén hơi thể tích lớn.</li>
                    <li>Tiêu thụ điện: ~ {(performanceResult.coolingCapacityKW / 3.5).toFixed(0)} kW điện liên tục (COP điện ~ 3.5).</li>
                    <li>Môi chất: HFC R410A / R134a (GWP &gt; 1400 - 2000, nguy cơ rò rỉ khí nhà kính).</li>
                    <li>Độ rung &amp; ồn: Cao (&gt;75 dB), cần bảo trì màng van và ổ trục máy nén định kỳ.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: AI DATA CENTER COGENERATION */}
      {activeMode === 'AI_DATA_CENTER_COGENERATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="flex flex-col gap-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              Quy Mô Trung Tâm Dữ Liệu AI
            </h3>

            {/* Server Load Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Công suất máy chủ IT (IT Load):</span>
                <span className="font-mono text-emerald-400 font-bold">{itServerLoadMW.toFixed(1)} MW</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="50.0"
                step="1.0"
                value={itServerLoadMW}
                onChange={(e) => setItServerLoadMW(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>2 MW (Cụm biên Edge)</span>
                <span>10 MW (Tiêu chuẩn)</span>
                <span>50 MW (Hyperscale AI)</span>
              </div>
            </div>

            {/* Waste Heat Capture Fraction */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tỉ lệ thu hồi nhiệt thải Direct-to-Chip:</span>
                <span className="font-mono text-cyan-400 font-bold">{(wasteHeatCaptureFraction * 100).toFixed(0)} %</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={wasteHeatCaptureFraction}
                onChange={(e) => setWasteHeatCaptureFraction(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Thermal Power Produced */}
            <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20 flex flex-col gap-2 text-xs">
              <span className="text-slate-400">Nhiệt thải thu hồi được:</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {dataCenterResult.wasteHeatCapturedMW.toFixed(2)} MW nhiệt
              </span>
              <span className="text-slate-400 mt-2">Công suất lạnh hấp thụ sản xuất:</span>
              <span className="text-xl font-bold font-mono text-cyan-400">
                {dataCenterResult.coolingProducedMW.toFixed(2)} MW lạnh (7°C)
              </span>
            </div>
          </div>

          {/* Economics & PUE Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              Chỉ Số Hiệu Quả Năng Lượng PUE &amp; Lợi Ích Kinh Tế - Sinh Thái
            </h3>

            {/* PUE Reduction Gauge Visual */}
            <div className="p-5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-200">Giảm Thiểu Hệ Số PUE (Power Usage Effectiveness)</span>
                <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30 font-bold">
                  PUE: {dataCenterResult.initialDataCenterPue.toFixed(2)} ➔ {dataCenterResult.cogenerationPue.toFixed(2)}
                </span>
              </div>

              {/* Visual PUE Progress Bars */}
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Trung tâm dữ liệu tiêu chuẩn (Chiller điện cơ học):</span>
                    <span className="font-mono text-red-400 font-bold">{dataCenterResult.initialDataCenterPue.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Trung tâm dữ liệu AI tích hợp Chiller Hấp Thụ NH₃-H₂O:</span>
                    <span className="font-mono text-emerald-400 font-bold">{dataCenterResult.cogenerationPue.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Tiền Điện Tiết Kiệm</span>
                </div>
                <div className="text-2xl font-black text-amber-300 font-mono">
                  ${(dataCenterResult.annualElectricityCostSavedUSD / 1000).toFixed(0)}k
                  <span className="text-xs font-normal text-slate-400">/năm</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tiết kiệm {dataCenterResult.annualElectricitySavedMWh.toFixed(0)} MWh/năm
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Cắt Giảm Khí CO₂</span>
                </div>
                <div className="text-2xl font-black text-emerald-300 font-mono">
                  {dataCenterResult.annualAvoidedCO2Tons.toFixed(0)}
                  <span className="text-xs font-normal text-slate-400"> tấn/năm</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Tránh phát thải từ nhà máy nhiệt điện
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <Droplets className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Triệt Tiêu HFC F-Gas</span>
                </div>
                <div className="text-2xl font-black text-cyan-300 font-mono">
                  {dataCenterResult.flurocarbonRefrigerantEliminatedKg.toFixed(0)}
                  <span className="text-xs font-normal text-slate-400"> kg</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Loại bỏ hoàn toàn R410A / R134a
                </span>
              </div>
            </div>

            {/* Explanatory footer */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-emerald-400 block mb-1">
                Chiến Lược Tuần Hoàn Năng Lượng AI Bền Vững (Direct-to-Chip Liquid Cooling):
              </span>
              Các cụm máy chủ huấn luyện mô hình ngôn ngữ lớn (LLM) tiêu thụ hàng chục MW điện năng, 95% trong số đó chuyển hóa thành nhiệt tỏa ra ở các tấm tản nhiệt chất lỏng làm mát chip GPU (75-90°C). Thay vì xả bỏ nguồn nhiệt này qua tháp tản nhiệt gây lãng phí hàng triệu lít nước và điện năng, máy lạnh hấp thụ NH₃-H₂O thu hồi nguồn nhiệt này để làm lạnh ngược lại dòng nước 7°C cung cấp lại cho phòng máy, tạo thành vòng lặp khép kín cộng sinh năng lượng.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
