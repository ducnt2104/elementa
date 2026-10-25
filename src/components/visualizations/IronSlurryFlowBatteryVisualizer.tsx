// src/components/visualizations/IronSlurryFlowBatteryVisualizer.tsx
// Interactive Visualizer: Iron-Slurry Semi-Solid Flow Battery (SS-IFB) Ultra-Low Cost Long-Duration Grid Storage
// Standards: IUPAC Electrochemistry, Bingham-Herschel Bulkley Rheology, Electrical Percolation & LDES Grid Economics

import React, { useState, useMemo } from 'react';
import {
  Boxes,
  Zap,
  TrendingUp,
  Droplets,
  Activity,
  Sparkles,
  RotateCcw,
  Gauge,
  Layers,
  ShieldCheck,
  Factory,
  Coins,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import {
  SLURRY_COMPOSITIONS,
  SEPARATORS,
  SlurryCompositionType,
  SeparatorType,
  IronSlurryFlowBatteryEngine
} from '../../domain/ironSlurryFlowBatteryEngine';
import { sound } from '../../audio/soundEngine';

type SlurryTabMode =
  | 'SUSPENDED_PARTICLE_PERCOLATION'
  | 'ELECTROCHEMICAL_CELL_POLARIZATION'
  | 'MULTI_DAY_LDES_ECONOMICS';

export const IronSlurryFlowBatteryVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<SlurryTabMode>('SUSPENDED_PARTICLE_PERCOLATION');

  // Interactive controls
  const [slurryType, setSlurryType] = useState<SlurryCompositionType>('MICRON_FE_KETJENBLACK');
  const [separatorType, setSeparatorType] = useState<SeparatorType>('MICROPOROUS_POLYOLEFIN');
  const [stateOfChargePercent, setStateOfChargePercent] = useState<number>(50);
  const [flowRateMillilitersPerMinute, setFlowRateMillilitersPerMinute] = useState<number>(60);
  const [temperatureC, setTemperatureC] = useState<number>(25);
  const [currentDensityMaPerCm2, setCurrentDensityMaPerCm2] = useState<number>(50);

  // Economic sizing
  const [stackRatedPowerKw, setStackRatedPowerKw] = useState<number>(500);
  const [durationHours, setDurationHours] = useState<number>(48);

  const currentSlurry = SLURRY_COMPOSITIONS[slurryType];
  const currentSeparator = SEPARATORS[separatorType];

  // Slurry performance calculation
  const perfResult = useMemo(() => {
    return IronSlurryFlowBatteryEngine.calculateSlurryPerformance({
      slurryType,
      separatorType,
      stateOfChargePercent,
      flowRateMillilitersPerMinute,
      temperatureC,
      currentDensityMaPerCm2
    });
  }, [slurryType, separatorType, stateOfChargePercent, flowRateMillilitersPerMinute, temperatureC, currentDensityMaPerCm2]);

  // Economic LDES calculation
  const ldesResult = useMemo(() => {
    return IronSlurryFlowBatteryEngine.calculateLdesEconomics(
      {
        slurryType,
        separatorType,
        stateOfChargePercent,
        flowRateMillilitersPerMinute,
        temperatureC,
        currentDensityMaPerCm2
      },
      stackRatedPowerKw,
      durationHours
    );
  }, [slurryType, separatorType, stateOfChargePercent, flowRateMillilitersPerMinute, temperatureC, currentDensityMaPerCm2, stackRatedPowerKw, durationHours]);

  const handleModeChange = (mode: SlurryTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setSlurryType('MICRON_FE_KETJENBLACK');
    setSeparatorType('MICROPOROUS_POLYOLEFIN');
    setStateOfChargePercent(50);
    setFlowRateMillilitersPerMinute(60);
    setTemperatureC(25);
    setCurrentDensityMaPerCm2(50);
    setStackRatedPowerKw(500);
    setDurationHours(48);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-600/30 rounded-2xl border border-amber-500/40 text-amber-400">
            <Boxes className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/30">
                Pin Dòng Chảy Bán Rắn (Semi-Solid Flow Battery)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Tích Trữ Lưới Điện Đa Ngày &lt; $30/kWh
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Pin Dòng Chảy Bùn Sắt Bán Rắn (Iron-Slurry Semi-Solid IFB)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Hạt sắt Fe⁰ lơ lửng trong mạng dẫn điện tử Ketjenblack • Mật độ dung lượng &gt; 180 Ah/L • Màng xốp Polyolefin $3.5/m² không đắt đỏ
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('SUSPENDED_PARTICLE_PERCOLATION')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'SUSPENDED_PARTICLE_PERCOLATION'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25 ring-1 ring-amber-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Mạng Lưới Dẫn Điện & Độ Nhớt</span>
          </button>

          <button
            onClick={() => handleModeChange('ELECTROCHEMICAL_CELL_POLARIZATION')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'ELECTROCHEMICAL_CELL_POLARIZATION'
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25 ring-1 ring-orange-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Đặc Tính Điện Hóa I-V & Màng Xốp</span>
          </button>

          <button
            onClick={() => handleModeChange('MULTI_DAY_LDES_ECONOMICS')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'MULTI_DAY_LDES_ECONOMICS'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Kinh Tế Lưới Điện Đa Ngày (48-100h)</span>
          </button>

          <button
            onClick={resetDefaults}
            title="Khôi phục mặc định"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GLOBAL CONTROLS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-slate-900/60 rounded-2xl border border-slate-800/80">
        {/* Slurry Composition Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Boxes className="w-3.5 h-3.5 text-amber-400" />
            Thành Phần Bùn Hạt Hoạt Tính:
          </label>
          <select
            value={slurryType}
            onChange={(e) => {
              sound.playUiClick();
              setSlurryType(e.target.value as SlurryCompositionType);
            }}
            className="bg-slate-800 text-xs font-bold text-amber-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {Object.values(SLURRY_COMPOSITIONS).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.volumetricCapacityAhPerL} Ah/L)
              </option>
            ))}
          </select>
        </div>

        {/* Separator Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            Màng Ngăn Cách Pha (Separator):
          </label>
          <select
            value={separatorType}
            onChange={(e) => {
              sound.playUiClick();
              setSeparatorType(e.target.value as SeparatorType);
            }}
            className="bg-slate-800 text-xs font-bold text-orange-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            {Object.values(SEPARATORS).map((sep) => (
              <option key={sep.id} value={sep.id}>
                {sep.name} (${sep.costDollarsPerM2}/m²)
              </option>
            ))}
          </select>
        </div>

        {/* Flow Rate Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              Lưu Lượng Bơm Bùn Q (mL/phút):
            </span>
            <span className="font-mono font-bold text-cyan-400">{flowRateMillilitersPerMinute} mL/min</span>
          </div>
          <input
            type="range"
            min={10}
            max={200}
            step={5}
            value={flowRateMillilitersPerMinute}
            onChange={(e) => setFlowRateMillilitersPerMinute(Number(e.target.value))}
            className="accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>10 mL/min</span>
            <span>Độ nhớt: {perfResult.apparentViscosityPaS.toFixed(3)} Pa·s</span>
          </div>
        </div>

        {/* Current Density Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Mật Độ Dòng Điện j (mA/cm²):
            </span>
            <span className="font-mono font-bold text-emerald-400">{currentDensityMaPerCm2} mA/cm²</span>
          </div>
          <input
            type="range"
            min={20}
            max={120}
            step={5}
            value={currentDensityMaPerCm2}
            onChange={(e) => setCurrentDensityMaPerCm2(Number(e.target.value))}
            className="accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>20 mA/cm²</span>
            <span>120 mA/cm²</span>
          </div>
        </div>
      </div>

      {/* TAB 1: SUSPENDED PARTICLE PERCOLATION */}
      {activeMode === 'SUSPENDED_PARTICLE_PERCOLATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Visualizer & Rheology Chart */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                Động Lực Học Mạng Lưới Dẫn Điện Tử &amp; Độ Nhớt Phi-Newton (Herschel-Bulkley)
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/30">
                Độ Dẫn Điện = {currentSlurry.electronicConductivitySPerM.toFixed(2)} S/m
              </span>
            </div>

            {/* Key Rheology Output Meters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-amber-400">Dung Lượng Thể Tích</span>
                <span className="text-xl font-black font-mono text-white">
                  {currentSlurry.volumetricCapacityAhPerL} <span className="text-xs font-normal text-slate-400">Ah/L</span>
                </span>
                <span className="text-[10px] text-slate-400">Gấp 4.5x dung dịch lỏng</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-cyan-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-cyan-400">Độ Nhớt Biểu Kiến μ</span>
                <span className="text-xl font-black font-mono text-white">
                  {perfResult.apparentViscosityPaS.toFixed(3)} <span className="text-xs font-normal text-slate-400">Pa·s</span>
                </span>
                <span className="text-[10px] text-slate-400">Giảm khi tăng lưu lượng (n = {currentSlurry.flowBehaviorIndexN})</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-rose-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-rose-400">Tổn Thất Thủy Lực Bơm</span>
                <span className="text-xl font-black font-mono text-white">
                  {(perfResult.pumpingLossWattsPerCell * 1000).toFixed(1)} <span className="text-xs font-normal text-slate-400">mW/cell</span>
                </span>
                <span className="text-[10px] text-slate-400">&lt; 0.5% công suất điện</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-emerald-400">Mật Độ Năng Lượng</span>
                <span className="text-xl font-black font-mono text-white">
                  {perfResult.volumetricEnergyDensityWhPerL.toFixed(1)} <span className="text-xs font-normal text-slate-400">Wh/L</span>
                </span>
                <span className="text-[10px] text-slate-400">Chuẩn hóa tại {perfResult.dischargeVoltageV.toFixed(2)} V</span>
              </div>
            </div>

            {/* SVG Particle Percolation Simulation */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Mô Phỏng Cụm Hạt Sắt Vi Mô Phân Tán Trong Mạng Lưới Cacbon Dẫn Điện:
              </span>
              <svg viewBox="0 0 750 200" className="w-full h-auto rounded-lg bg-slate-950">
                <defs>
                  <linearGradient id="wallCollectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>
                  <radialGradient id="ironParticleGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#78350f" />
                  </radialGradient>
                </defs>

                {/* FLOW CHANNEL BOUNDARIES */}
                <rect x="30" y="20" width="30" height="160" rx="4" fill="url(#wallCollectorGrad)" />
                <text x="45" y="105" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold" transform="rotate(-90 45 105)">
                  CỰC GÓP DÒNG DẪN ĐIỆN (Graphite)
                </text>

                <rect x="690" y="20" width="20" height="160" rx="4" fill="#0284c7" opacity="0.8" />
                <text x="700" y="105" textAnchor="middle" fill="#e0f2fe" fontSize="9" fontWeight="bold" transform="rotate(-90 700 105)">
                  MÀNG XỐP {currentSeparator.thicknessUm} µm
                </text>

                {/* SLURRY CHANNEL */}
                <rect x="65" y="20" width="620" height="160" fill="#0f172a" stroke="#1e293b" strokeWidth="2" rx="6" />

                {/* PERCOLATING CARBON BLACK FILAMENTS (Black/Yellow network) */}
                <path d="M 60 40 Q 150 70 240 50 T 400 60 T 550 45 T 685 60" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
                <path d="M 60 90 Q 180 110 300 85 T 480 100 T 630 85 T 685 105" fill="none" stroke="#fbbf24" strokeWidth="2.5" opacity="0.85" />
                <path d="M 60 145 Q 160 125 280 150 T 440 135 T 580 150 T 685 140" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />

                {/* CROSS CONNECTIONS */}
                <path d="M 150 70 L 180 110 L 160 125" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
                <path d="M 300 85 L 400 60 L 440 135" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />
                <path d="M 480 100 L 550 45 L 580 150" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2" />

                {/* SUSPENDED IRON MICRO-PARTICLES (Fe0 spheres) */}
                {[
                  { cx: 120, cy: 55, r: 16, label: 'Fe⁰' },
                  { cx: 180, cy: 110, r: 18, label: 'Fe⁰' },
                  { cx: 240, cy: 50, r: 15, label: 'Fe⁰' },
                  { cx: 280, cy: 145, r: 17, label: 'Fe⁰' },
                  { cx: 350, cy: 90, r: 20, label: 'Fe⁰' },
                  { cx: 420, cy: 60, r: 16, label: 'Fe⁰' },
                  { cx: 460, cy: 125, r: 18, label: 'Fe⁰' },
                  { cx: 530, cy: 50, r: 15, label: 'Fe⁰' },
                  { cx: 560, cy: 110, r: 19, label: 'Fe⁰' },
                  { cx: 640, cy: 80, r: 17, label: 'Fe⁰' }
                ].map((p, idx) => (
                  <g key={idx}>
                    <circle cx={p.cx} cy={p.cy} r={p.r} fill="url(#ironParticleGrad)" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x={p.cx} y={p.cy + 4} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                      {p.label}
                    </text>
                  </g>
                ))}

                {/* FLOW ARROWS */}
                <text x="350" y="15" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ➔ Dòng Chảy Huyền Phù Bán Rắn Q = {flowRateMillilitersPerMinute} mL/phút ➔
                </text>
              </svg>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Cơ Chế Dẫn Điện Thấu Mạng (Percolation)
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Mạng Lưới Dẫn Điện 3D Động Học:</span>
                  Hạt sắt vi mô Fe⁰ không cần hòa tan trong dung dịch mà va chạm liên tục với các nhánh muội than dẫn điện Ketjenblack, tạo đường dẫn điện tử thông suốt đến cực góp dòng.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-cyan-300 block mb-1">Hiện Tượng Giảm Nhớt Theo Tốc Độ Trượt:</span>
                  Chất lỏng bán rắn có chỉ số dòng n = {currentSlurry.flowBehaviorIndexN} &lt; 1 (Shear-thinning). Khi bơm tăng tốc, các chuỗi hạt tái cấu trúc dọc theo dòng chảy, độ nhớt giảm tới 85%, hạn chế hao phí năng lượng bơm.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ELECTROCHEMICAL CELL POLARIZATION */}
      {activeMode === 'ELECTROCHEMICAL_CELL_POLARIZATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Electrochemical Performance Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                Đặc Tính Phóng / Sạc &amp; Hiệu Suất Năng Lượng Khứ Hồi (RTE)
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-orange-500/10 text-orange-400 rounded-lg border border-orange-500/30">
                RTE = {perfResult.roundTripEnergyEfficiencyPercent.toFixed(1)}%
              </span>
            </div>

            {/* SOC Slider */}
            <div className="flex flex-col gap-1.5 p-4 bg-slate-800/50 rounded-xl border border-slate-700/60">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Trạng Thái Sạc (State of Charge - SOC):</span>
                <span className="font-mono font-bold text-orange-400">{stateOfChargePercent}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={90}
                step={5}
                value={stateOfChargePercent}
                onChange={(e) => setStateOfChargePercent(Number(e.target.value))}
                className="accent-orange-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>10% (Cạn kiệt)</span>
                <span>OCV = {perfResult.openCircuitVoltageV.toFixed(3)} V</span>
                <span>90% (Đầy điện)</span>
              </div>
            </div>

            {/* Operating Voltage Meters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-emerald-400">Điện Áp Phóng Điện (V_dis)</span>
                <span className="text-2xl font-black font-mono text-white">
                  {perfResult.dischargeVoltageV.toFixed(3)} <span className="text-sm font-normal text-slate-400">V</span>
                </span>
                <span className="text-xs text-slate-400">Tại {currentDensityMaPerCm2} mA/cm²</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-rose-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-rose-400">Điện Áp Nạp Điện (V_chg)</span>
                <span className="text-2xl font-black font-mono text-white">
                  {perfResult.chargeVoltageV.toFixed(3)} <span className="text-sm font-normal text-slate-400">V</span>
                </span>
                <span className="text-xs text-slate-400">Quá thế sạc thấp</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-amber-400">Hiệu Suất Điện Áp (VE)</span>
                <span className="text-2xl font-black font-mono text-white">
                  {perfResult.voltageEfficiencyPercent.toFixed(1)} <span className="text-sm font-normal text-slate-400">%</span>
                </span>
                <span className="text-xs text-emerald-300 font-mono">
                  Coulombic: {perfResult.coulombicEfficiencyPercent.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Separator Comparison Box */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Đặc Tính Màng Ngăn {currentSeparator.name}:
                </span>
                <span className="font-mono font-bold text-emerald-400">${currentSeparator.costDollarsPerM2}/m²</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {currentSeparator.vietnameseFeature} Lỗ xốp vi mô cho phép ion Cl⁻/SO₄²⁻ di chuyển tự do với nội trở chỉ {currentSeparator.areaSpecificResistanceOhmCm2} Ω·cm², hoàn toàn chặn đứng các hạt sắt micron không để chập mạch.
              </p>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-orange-400 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Phản Ứng Điện Hóa Hai Chiều
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Cực Âm Bùn Sắt (Anode):</span>
                  <div className="font-mono text-[11px] text-amber-400 mb-1">
                    Fe⁰ (hạt rắn) ⇌ Fe²⁺ + 2e⁻ (E⁰ = -0.44 V)
                  </div>
                  Không có sự hình thành gai nhọn dendrite làm rách màng do các hạt rắn liên tục di chuyển trong dòng chảy bùn.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-blue-300 block mb-1">Cực Dương Oxy Hóa Khử (Cathode):</span>
                  <div className="font-mono text-[11px] text-blue-400 mb-1">
                    Fe²⁺ ⇌ Fe³⁺ + e⁻ (E⁰ = +0.77 V)
                  </div>
                  Phản ứng hòa tan thuận nghịch 100%, không bị suy giảm dung lượng theo chu kỳ.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MULTI DAY LDES ECONOMICS */}
      {activeMode === 'MULTI_DAY_LDES_ECONOMICS' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Economics Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-400" />
                Mô Hình Kinh Tế Tích Trữ Lưới Điện Đa Ngày (Multi-Day LDES &lt; $30/kWh)
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/30">
                CapEx = ${ldesResult.capitalCostDollarsPerKwh.toFixed(1)}/kWh
              </span>
            </div>

            {/* Sizing Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/60">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Thời Lượng Xả Điện Đa Ngày:
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{durationHours} Giờ ({durationHours / 24} Ngày)</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={120}
                  step={12}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>12h (Nửa ngày)</span>
                  <span>48h (2 ngày)</span>
                  <span>120h (5 ngày)</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Factory className="w-3.5 h-3.5 text-amber-400" />
                    Công Suất Trạm Biến Áp:
                  </span>
                  <span className="font-mono font-bold text-amber-400">{stackRatedPowerKw} kW</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={100}
                  value={stackRatedPowerKw}
                  onChange={(e) => setStackRatedPowerKw(Number(e.target.value))}
                  className="accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100 kW</span>
                  <span>500 kW</span>
                  <span>2,000 kW</span>
                </div>
              </div>
            </div>

            {/* Financial and Sizing Metric Meters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-emerald-400">Chi Phí Suất Vốn (CapEx)</span>
                <span className="text-2xl font-black font-mono text-white">
                  ${ldesResult.capitalCostDollarsPerKwh.toFixed(1)} <span className="text-sm font-normal text-slate-400">/ kWh</span>
                </span>
                <span className="text-xs text-emerald-300 font-mono">
                  Rẻ hơn 85% so với Li-ion
                </span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-amber-400">Khối Lượng Sắt Phế Liệu</span>
                <span className="text-2xl font-black font-mono text-white">
                  {ldesResult.rawIronMassTons.toFixed(0)} <span className="text-sm font-normal text-slate-400">tấn Fe</span>
                </span>
                <span className="text-xs text-slate-400">Giá $0.45/kg sắt thô</span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-cyan-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-cyan-400">Thể Tích Bồn Chứa HDPE</span>
                <span className="text-2xl font-black font-mono text-white">
                  {ldesResult.slurryTankVolumeM3.toFixed(0)} <span className="text-sm font-normal text-slate-400">m³</span>
                </span>
                <span className="text-xs text-slate-400">Bồn nhựa áp suất khí quyển</span>
              </div>
            </div>

            {/* Total System CapEx & Unlimited Life Badge */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300">
                  Tổng Đầu Tư Toàn Bộ Trạm Tích Trữ ({ldesResult.totalStoredEnergyKwh / 1000} MWh):
                </span>
                <span className="text-lg font-black font-mono text-emerald-400">
                  ${(ldesResult.totalSystemCapExDollars / 1e6).toFixed(2)} Triệu USD
                </span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 leading-relaxed">
                  Bảo hành tuổi thọ vượt mức <strong>25,000 chu kỳ (30 năm)</strong> không suy hao dung lượng; hạt sắt hoạt tính có thể tái chế nấu chảy 100% không để lại rác thải nguy hại.
                </span>
              </div>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Giải Pháp Cân Bằng Năng Lượng Tái Tạo
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Hiện Tượng Dunkelflaute (Lặng Gió U Ám):</span>
                  Các đợt thời tiết 3-5 ngày liên tục không có nắng và gió khiến pin Li-ion (thời lượng 2-4h) cạn kiệt. Hệ thống bùn sắt bán rắn 48-100h cung cấp điện liên tục duy trì an ninh lưới điện quốc gia.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-emerald-300 block mb-1">Chuỗi Cung Ứng Nội Địa 100%:</span>
                  Không phụ thuộc vào liti, niken, coban hay vanadi nhập khẩu. Sắt phế liệu và muối ăn có sẵn ở mọi quốc gia với trữ lượng vô tận.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
