// src/components/visualizations/OsmoticallyDrivenHeatEngineVisualizer.tsx
// Interactive Visualizer: Osmotically Driven Heat Engine (ODHE) Closed-Loop Salinity Power Generation
// Standards: Pressure-Retarded Osmosis (PRO), Thermolytic Draw Solutes, IUPAC & Second-Law Thermodynamics

import React, { useState, useMemo } from 'react';
import {
  Waves,
  Zap,
  Flame,
  Activity,
  Sparkles,
  RotateCcw,
  Gauge,
  Droplets,
  TrendingUp,
  Layers,
  ShieldCheck,
  ThermometerSun,
  Server,
  Factory,
  RefreshCw,
  Compass
} from 'lucide-react';
import {
  ODHE_DRAW_SOLUTES,
  ODHE_MEMBRANES,
  OdheDrawSoluteType,
  OdheMembraneType,
  OsmoticallyDrivenHeatEngineDomain
} from '../../domain/osmoticallyDrivenHeatEngine';
import { sound } from '../../audio/soundEngine';

type OdheTabMode =
  | 'PRO_MEMBRANE_POWER_DENSITY'
  | 'CLOSED_LOOP_THERMAL_CYCLE'
  | 'LOW_GRADE_WASTE_HEAT_HARVESTING';

export const OsmoticallyDrivenHeatEngineVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<OdheTabMode>('PRO_MEMBRANE_POWER_DENSITY');

  // Interactive controls
  const [soluteType, setSoluteType] = useState<OdheDrawSoluteType>('AMMONIUM_BICARBONATE');
  const [membraneType, setMembraneType] = useState<OdheMembraneType>('GRAPHENE_OXIDE');
  const [drawConcentrationMolar, setDrawConcentrationMolar] = useState<number>(2.0);
  const [appliedHydraulicPressureBar, setAppliedHydraulicPressureBar] = useState<number>(25.0);
  const [feedSalinityGPerL, setFeedSalinityGPerL] = useState<number>(0.5);
  const [wasteHeatTempC, setWasteHeatTempC] = useState<number>(65);
  const [coolingTempC, setCoolingTempC] = useState<number>(20);

  // Plant scale slider
  const [membraneAreaM2, setMembraneAreaM2] = useState<number>(1000);

  const currentSolute = ODHE_DRAW_SOLUTES[soluteType];
  const currentMembrane = ODHE_MEMBRANES[membraneType];

  // Osmotic power calculations
  const osmoticResult = useMemo(() => {
    return OsmoticallyDrivenHeatEngineDomain.calculateOsmoticPower({
      soluteType,
      membraneType,
      drawConcentrationMolar,
      feedSalinityGPerL,
      wasteHeatTempC,
      coolingTempC,
      appliedHydraulicPressureBar
    });
  }, [soluteType, membraneType, drawConcentrationMolar, feedSalinityGPerL, wasteHeatTempC, coolingTempC, appliedHydraulicPressureBar]);

  // System cycle thermodynamics calculations
  const systemResult = useMemo(() => {
    return OsmoticallyDrivenHeatEngineDomain.calculateSystemThermodynamics(
      {
        soluteType,
        membraneType,
        drawConcentrationMolar,
        feedSalinityGPerL,
        wasteHeatTempC,
        coolingTempC,
        appliedHydraulicPressureBar
      },
      membraneAreaM2
    );
  }, [soluteType, membraneType, drawConcentrationMolar, feedSalinityGPerL, wasteHeatTempC, coolingTempC, appliedHydraulicPressureBar, membraneAreaM2]);

  const handleModeChange = (mode: OdheTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setSoluteType('AMMONIUM_BICARBONATE');
    setMembraneType('GRAPHENE_OXIDE');
    setDrawConcentrationMolar(2.0);
    setAppliedHydraulicPressureBar(25.0);
    setFeedSalinityGPerL(0.5);
    setWasteHeatTempC(65);
    setCoolingTempC(20);
    setMembraneAreaM2(1000);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-600/30 rounded-2xl border border-teal-500/40 text-teal-400">
            <Waves className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase bg-teal-500/10 text-teal-400 rounded-full border border-teal-500/30">
                Chu Trình Nhiệt Thẩm Thấu Kín (ODHE)
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30">
                Thu Hồi Nhiệt Thải Thấp &lt; 70°C
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Động Cơ Nhiệt Thẩm Thấu Áp Suất Kín (Osmotically Driven Heat Engine)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Chất hút nhiệt phân NH₄HCO₃ phân rã ở 58°C • Màng thẩm thấu ngược PRO công suất &gt; 45 W/m² • Tuần hoàn nước và muối 100% không hao hụt
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleModeChange('PRO_MEMBRANE_POWER_DENSITY')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'PRO_MEMBRANE_POWER_DENSITY'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25 ring-1 ring-teal-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Màng PRO & Mật Độ Công Suất</span>
          </button>

          <button
            onClick={() => handleModeChange('CLOSED_LOOP_THERMAL_CYCLE')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'CLOSED_LOOP_THERMAL_CYCLE'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25 ring-1 ring-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Chu Trình Tái Sinh Nhiệt Kín</span>
          </button>

          <button
            onClick={() => handleModeChange('LOW_GRADE_WASTE_HEAT_HARVESTING')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
              activeMode === 'LOW_GRADE_WASTE_HEAT_HARVESTING'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 ring-1 ring-emerald-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Factory className="w-4 h-4" />
            <span>Nhà Máy Thu Hồi Nhiệt Thải</span>
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
        {/* Draw Solute Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-teal-400" />
            Chất Hút Nhiệt Phân (Draw Solute):
          </label>
          <select
            value={soluteType}
            onChange={(e) => {
              sound.playUiClick();
              setSoluteType(e.target.value as OdheDrawSoluteType);
            }}
            className="bg-slate-800 text-xs font-bold text-teal-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          >
            {Object.values(ODHE_DRAW_SOLUTES).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.decompositionTempC}°C)
              </option>
            ))}
          </select>
        </div>

        {/* Membrane Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Màng Thẩm Thấu Ngược PRO:
          </label>
          <select
            value={membraneType}
            onChange={(e) => {
              sound.playUiClick();
              setMembraneType(e.target.value as OdheMembraneType);
            }}
            className="bg-slate-800 text-xs font-bold text-cyan-300 rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            {Object.values(ODHE_MEMBRANES).map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} (A = {m.waterPermeabilityA_L_m2_h_bar} LMH/bar)
              </option>
            ))}
          </select>
        </div>

        {/* Draw Concentration Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-400" />
              Nồng Độ Chất Hút (Draw Concentration):
            </span>
            <span className="font-mono font-bold text-amber-400">{drawConcentrationMolar.toFixed(1)} M</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={currentSolute.maxSolubilityMolar}
            step={0.1}
            value={drawConcentrationMolar}
            onChange={(e) => setDrawConcentrationMolar(Number(e.target.value))}
            className="accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0.5 M</span>
            <span>Áp suất thẩm thấu: {osmoticResult.drawOsmoticPressureBar.toFixed(1)} bar</span>
          </div>
        </div>

        {/* Hydraulic Pressure Slider */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Áp Suất Thủy Tĩnh Ngược ΔP (bar):
            </span>
            <span className="font-mono font-bold text-emerald-400">{appliedHydraulicPressureBar.toFixed(1)} bar</span>
          </div>
          <input
            type="range"
            min={0.0}
            max={Math.min(currentMembrane.maxHydraulicPressureBar, 60.0)}
            step={1.0}
            value={appliedHydraulicPressureBar}
            onChange={(e) => setAppliedHydraulicPressureBar(Number(e.target.value))}
            className="accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0 bar (Max dòng chảy)</span>
            <span>Tối ưu: {osmoticResult.optimalHydraulicPressureBar.toFixed(1)} bar</span>
          </div>
        </div>
      </div>

      {/* TAB 1: PRO MEMBRANE & POWER DENSITY */}
      {activeMode === 'PRO_MEMBRANE_POWER_DENSITY' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Visualization & Metric Meters */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                Đường Cong Mật Độ Công Suất Thẩm Thấu (Power Density Curve W vs ΔP)
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/30">
                W_max = {osmoticResult.maxPowerDensityWPerM2.toFixed(1)} W/m²
              </span>
            </div>

            {/* Key Osmotic Meters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-teal-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-teal-400">Áp Suất Thẩm Thấu Π_draw</span>
                <span className="text-xl font-black font-mono text-white">
                  {osmoticResult.drawOsmoticPressureBar.toFixed(1)} <span className="text-xs font-normal text-slate-400">bar</span>
                </span>
                <span className="text-[10px] text-slate-400">van 't Hoff tại 25°C</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-cyan-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-cyan-400">Dòng Nước Thấm J_w</span>
                <span className="text-xl font-black font-mono text-white">
                  {osmoticResult.waterFluxLMH.toFixed(1)} <span className="text-xs font-normal text-slate-400">LMH</span>
                </span>
                <span className="text-[10px] text-slate-400">L / (m² · giờ)</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-emerald-400">Mật Độ Công Suất W</span>
                <span className="text-xl font-black font-mono text-white">
                  {osmoticResult.powerDensityWPerM2.toFixed(1)} <span className="text-xs font-normal text-slate-400">W/m²</span>
                </span>
                <span className="text-[10px] text-slate-400">Tại {appliedHydraulicPressureBar} bar</span>
              </div>

              <div className="p-3 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-amber-400">Hệ Số Phân Cực ICP</span>
                <span className="text-xl font-black font-mono text-white">
                  {(osmoticResult.dilutiveIcpFactor * 100).toFixed(1)} <span className="text-xs font-normal text-slate-400">%</span>
                </span>
                <span className="text-[10px] text-slate-400">Π_eff = {osmoticResult.effectiveDrawOsmoticPressureAtActiveLayerBar.toFixed(1)} bar</span>
              </div>
            </div>

            {/* Dynamic Interactive SVG Cross-Section of PRO Membrane */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Mặt Cắt Màng Thẩm Thấu Ngược PRO &amp; Dòng Nước Xuyên Lớp Chọn Lọc:
              </span>
              <svg viewBox="0 0 750 200" className="w-full h-auto rounded-lg bg-slate-950">
                <defs>
                  <linearGradient id="feedWaterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <linearGradient id="drawSolutionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <linearGradient id="activeLayerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>

                {/* FEED WATER CHANNEL (LEFT) */}
                <rect x="40" y="30" width="220" height="140" rx="8" fill="url(#feedWaterGrad)" opacity="0.85" />
                <text x="150" y="55" textAnchor="middle" fill="#e0f2fe" fontWeight="bold" fontSize="12">
                  KÊNH NƯỚC CẤP (Feed Water)
                </text>
                <text x="150" y="75" textAnchor="middle" fill="#bae6fd" fontSize="10">
                  Nước Khử Khoáng Tuần Hoàn
                </text>
                <text x="150" y="105" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace">
                  Π_feed = {osmoticResult.feedOsmoticPressureBar.toFixed(2)} bar
                </text>
                <text x="150" y="145" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="bold">
                  Áp suất khí quyển (P = 1 bar)
                </text>

                {/* POROUS SUPPORT LAYER */}
                <rect x="265" y="30" width="80" height="140" rx="4" fill="#334155" opacity="0.9" />
                <text x="305" y="75" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold" transform="rotate(-90 305 75)">
                  ĐỆM XỐP (S = {currentMembrane.structuralParameterS_um} µm)
                </text>

                {/* DENSE ACTIVE LAYER */}
                <rect x="350" y="25" width="20" height="150" rx="4" fill="url(#activeLayerGrad)" />
                <text x="360" y="90" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold" transform="rotate(-90 360 90)">
                  ACTIVE LAYER
                </text>

                {/* DRAW SOLUTION CHANNEL (RIGHT) */}
                <rect x="375" y="30" width="335" height="140" rx="8" fill="url(#drawSolutionGrad)" opacity="0.9" />
                <text x="540" y="55" textAnchor="middle" fill="#ccfbf1" fontWeight="bold" fontSize="12">
                  DUNG DỊCH HÚT (Draw Solution) - {currentSolute.name}
                </text>
                <text x="540" y="75" textAnchor="middle" fill="#99f6e4" fontSize="10">
                  {currentSolute.chemicalFormula} ({drawConcentrationMolar} M)
                </text>
                <text x="540" y="105" textAnchor="middle" fill="#fef08a" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  Π_draw = {osmoticResult.drawOsmoticPressureBar.toFixed(1)} bar | P_thủy tĩnh = {appliedHydraulicPressureBar} bar
                </text>
                <text x="540" y="145" textAnchor="middle" fill="#5eead4" fontSize="11" fontWeight="bold">
                  ➔ Dẫn tới Tua-bin Thủy Lực Phát Điện
                </text>

                {/* WATER FLUX ARROWS */}
                <path d="M 230 100 L 380 100" stroke="#fef08a" strokeWidth="3" strokeDasharray="6,4" />
                <polygon points="385,100 375,95 375,105" fill="#fef08a" />
                <text x="310" y="125" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">
                  J_w = {osmoticResult.waterFluxLMH.toFixed(1)} LMH ➔
                </text>
              </svg>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-teal-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Hiện Tượng Phân Cực Nồng Độ ICP
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Hiện tượng Pha Loãng Nội Bào:</span>
                  Khi nước khuếch tán qua lớp màng chọn lọc dày đặc vào lớp đệm xốp, nó làm loãng dung dịch muối ngay tại bề mặt hoạt tính, làm giảm áp suất thẩm thấu hữu hiệu từ {osmoticResult.drawOsmoticPressureBar.toFixed(1)} bar xuống {osmoticResult.effectiveDrawOsmoticPressureAtActiveLayerBar.toFixed(1)} bar.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-cyan-300 block mb-1">Màng Graphene Oxide Nanocomposite:</span>
                  Cấu trúc ống mao dẫn 2D của {currentMembrane.name} giảm hệ số cấu trúc S xuống chỉ {currentMembrane.structuralParameterS_um} µm (so với 420 µm ở màng TFC thông thường), nâng gấp 2.5 lần mật độ công suất đỉnh.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLOSED LOOP THERMAL CYCLE */}
      {activeMode === 'CLOSED_LOOP_THERMAL_CYCLE' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main 4-Stage Thermal Cycle Schematic */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-cyan-400" />
                Sơ Đồ 4 Giai Đoạn Chu Trình Nhiệt Thẩm Thấu Tuần Hoàn Kín
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30">
                T_thải = {wasteHeatTempC}°C | T_lạnh = {coolingTempC}°C
              </span>
            </div>

            {/* Temperature Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/60">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    Nhiệt Độ Nguồn Thải Cấp (T_hot):
                  </span>
                  <span className="font-mono font-bold text-rose-400">{wasteHeatTempC}°C</span>
                </div>
                <input
                  type="range"
                  min={45}
                  max={85}
                  step={5}
                  value={wasteHeatTempC}
                  onChange={(e) => setWasteHeatTempC(Number(e.target.value))}
                  className="accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" />
                    Nhiệt Độ Bể Làm Mát / Hấp Thụ (T_cold):
                  </span>
                  <span className="font-mono font-bold text-blue-400">{coolingTempC}°C</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={30}
                  step={1}
                  value={coolingTempC}
                  onChange={(e) => setCoolingTempC(Number(e.target.value))}
                  className="accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* 4 Stages Detailed Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-teal-500/30 flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-teal-300">GIAI ĐOẠN 1: Màng Thẩm Thấu PRO</span>
                  <span className="text-xs font-mono font-bold text-teal-400">{systemResult.grossTurbinePowerKw.toFixed(1)} kW</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Dòng nước thẩm thấu xuyên màng làm tăng thể tích chất lỏng dưới áp suất {appliedHydraulicPressureBar} bar, quay tua-bin thủy lực phát điện sạch.
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-rose-500/30 flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-rose-300">GIAI ĐOẠN 2: Tháp Tách Nhiệt Phân</span>
                  <span className="text-xs font-mono font-bold text-rose-400">{wasteHeatTempC}°C</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Dung dịch loãng đi vào tháp giải hấp. Nhiệt thải {wasteHeatTempC}°C phân rã muối {currentSolute.chemicalFormula} giải phóng hơi khí: {currentSolute.thermolyticVapors}.
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-blue-500/30 flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-blue-300">GIAI ĐOẠN 3: Bể Ngưng Tụ &amp; Tái Hấp Thụ</span>
                  <span className="text-xs font-mono font-bold text-blue-400">{coolingTempC}°C</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Khí bay hơi được làm mát ở {coolingTempC}°C, phản ứng tỏa nhiệt tái tạo dung dịch đậm đặc {drawConcentrationMolar} M với áp suất thẩm thấu {osmoticResult.drawOsmoticPressureBar.toFixed(1)} bar.
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-300">GIAI ĐOẠN 4: Hồi Lưu Nước Tinh Khiết</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{systemResult.closedLoopWaterCirculationM3PerHour.toFixed(1)} m³/h</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Nước tinh khiết đã tách hết muối được bơm tuần hoàn trở lại kênh nước cấp, tạo chu trình kín 100% không tiêu hao bất kỳ giọt nước nào ra môi trường.
                </p>
              </div>
            </div>

            {/* Carnot Limit & Second Law Meter */}
            <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1">
                  <Gauge className="w-4 h-4 text-cyan-400" />
                  Hiệu Suất Nhiệt - Điện So Với Giới Hạn Carnot:
                </span>
                <span className="font-mono font-bold text-cyan-300">
                  η_th = {systemResult.thermalEfficiencyPercent.toFixed(2)}% ({systemResult.percentOfCarnotLimit.toFixed(1)}% Carnot Limit = {systemResult.carnotEfficiencyPercent.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, systemResult.percentOfCarnotLimit * 2)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Độ Bền Vững &amp; An Toàn Hóa Học
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Không Hóa Chất Độc Hại:</span>
                  Muối Amoni Bicacbonat (NH₄HCO₃) được dùng phổ biến trong phụ gia thực phẩm (bột nở làm bánh), an toàn sinh thái tuyệt đối nếu có sự cố rò rỉ.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-emerald-300 block mb-1">Cơ Chế Tự Động Ổn Định:</span>
                  Hệ thống vận hành ở áp suất vừa phải (&lt; 40 bar) và nhiệt độ thấp (&lt; 70°C), không yêu cầu vật liệu hợp kim chịu nhiệt đắt tiền hay rủi ro nổ áp lực cao.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOW GRADE WASTE HEAT HARVESTING */}
      {activeMode === 'LOW_GRADE_WASTE_HEAT_HARVESTING' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Main Plant Performance Dashboard */}
          <div className="lg:col-span-2 flex flex-col gap-6 p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Factory className="w-5 h-5 text-emerald-400" />
                Mô Phỏng Nhà Máy Thu Hồi Điện Từ Nước Nóng Thải Công Nghiệp
              </h3>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/30">
                P_net = {systemResult.netElectricalPowerKw.toFixed(1)} kW_e
              </span>
            </div>

            {/* Plant Size Slider */}
            <div className="flex flex-col gap-1.5 p-4 bg-slate-800/50 rounded-xl border border-slate-700/60">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Quy Mô Diện Tích Màng Thẩm Thấu Tổng Cộng (m²):
                </span>
                <span className="font-mono font-bold text-emerald-400">{membraneAreaM2} m²</span>
              </div>
              <input
                type="range"
                min={200}
                max={3000}
                step={100}
                value={membraneAreaM2}
                onChange={(e) => setMembraneAreaM2(Number(e.target.value))}
                className="accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>200 m² (Mô đun thử nghiệm)</span>
                <span>1000 m² (Tiêu chuẩn công nghiệp)</span>
                <span>3000 m² (Nhà máy quy mô lớn)</span>
              </div>
            </div>

            {/* Power & Financial Output Meters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-emerald-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  Điện Lưới Phát Ra (P_net)
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {systemResult.netElectricalPowerKw.toFixed(1)} <span className="text-sm font-normal text-slate-400">kW_e</span>
                </span>
                <span className="text-xs text-emerald-300 font-mono">
                  {(systemResult.netElectricalPowerKw * 8000 / 1000).toFixed(1)} MWh / năm
                </span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-amber-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Tái Sinh Muối Tốc Độ
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {systemResult.soluteRegenerationRateKgPerHour.toFixed(0)} <span className="text-sm font-normal text-slate-400">kg/h</span>
                </span>
                <span className="text-xs text-amber-300 font-mono">
                  Tuần hoàn khép kín
                </span>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-cyan-500/30 flex flex-col gap-1">
                <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Cắt Giảm Khí CO₂
                </span>
                <span className="text-2xl font-black font-mono text-white">
                  {systemResult.co2EmissionsAvoidedTonsPerYear.toFixed(1)} <span className="text-sm font-normal text-slate-400">tấn/năm</span>
                </span>
                <span className="text-xs text-cyan-300 font-mono">
                  Năng lượng sạch 24/7
                </span>
              </div>
            </div>

            {/* Industrial Real-World Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-2">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-cyan-400" />
                  Trung Tâm Dữ Liệu AI (AI Data Center):
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Thu hồi nhiệt từ hệ thống tản nhiệt chất lỏng làm mát chip GPU (55-65°C), sản xuất điện hồi tiếp nuôi hệ thống bơm và quạt làm mát, biến nhiệt thải thành điện tự cung cấp.
                </p>
              </div>

              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col gap-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Factory className="w-4 h-4 text-amber-400" />
                  Nước Nóng Địa Nhiệt (Low-Enthalpy Geothermal):
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Các giếng nước nóng 70-85°C không đủ áp lực để quay tua-bin hơi nước truyền thống có thể dễ dàng chuyển hóa thành trạm phát điện sạch ổn định suốt ngày đêm.
                </p>
              </div>
            </div>
          </div>

          {/* Right Info Panel */}
          <div className="flex flex-col gap-4">
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Hiệu Quả Kinh Tế So Với Chu Trình ORC
              </span>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-amber-300 block mb-1">Ưu thế so với Chu Trình Hữu Cơ Rankine (ORC):</span>
                  Ở nhiệt độ &lt; 70°C, ORC chịu áp suất ngưng tụ thấp và kích thước tua-bin khổng lồ. ODHE sử dụng áp suất thẩm thấu chất lỏng, tua-bin thủy lực nhỏ gọn hơn 10 lần và chi phí CapEx giảm hơn 40%.
                </div>

                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
                  <span className="font-bold text-emerald-300 block mb-1">Thời Gian Hoàn Vốn:</span>
                  Với chi phí đầu tư màng PRO khoảng $45/m² và tận dụng nhiệt thải sẵn có miễn phí, thời gian hoàn vốn đầu tư đạt từ 3.2 đến 4.5 năm.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
