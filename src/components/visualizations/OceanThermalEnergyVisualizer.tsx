// src/components/visualizations/OceanThermalEnergyVisualizer.tsx
// Interactive Visualizer: Ocean Thermal Energy Conversion (OTEC) & Deep-Sea Ammonia Thermochemical Engine
// Conforms to: IUPAC Physical Chemistry, IEA Ocean Energy Systems & Vietnam GDPT 2018 Chemistry & Physics

import React, { useState, useMemo } from 'react';
import {
  Waves,
  Zap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  TrendingUp,
  Droplets,
  ArrowRight,
  Anchor,
  Compass,
  Fish,
  ThermometerSnowflake,
  Wind,
  Flame,
  Globe2,
  Cpu
} from 'lucide-react';
import {
  OtecTechnologyType,
  OtecWorkingFluid,
  OtecOperatingParameters,
  OTEC_FLUID_CATALOG,
  VIETNAM_OTEC_RESOURCES,
  calculateOtecPerformance
} from '../../domain/oceanThermalEnergyEngine';
import { sound } from '../../audio/soundEngine';

type OtecTabMode = 'RANKINE_CYCLE_AND_AMMONIA_ORC' | 'CWIP_HYDRODYNAMICS_AND_PUMPING' | 'BLUE_ECONOMY_AND_VIETNAM_POTENTIAL';

export const OceanThermalEnergyVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OtecTabMode>('RANKINE_CYCLE_AND_AMMONIA_ORC');
  const [selectedTech, setSelectedTech] = useState<OtecTechnologyType>('CLOSED_CYCLE_AMMONIA');
  const [selectedFluid, setSelectedFluid] = useState<OtecWorkingFluid>('ANHYDROUS_AMMONIA_NH3');
  const [selectedSiteIndex, setSelectedSiteIndex] = useState<number>(0); // Default: Cà Ná Ninh Thuận

  // Sliders
  const [warmSurfaceWaterTempC, setWarmSurfaceWaterTempC] = useState<number>(28.5);
  const [coldDeepWaterTempC, setColdDeepWaterTempC] = useState<number>(4.5);
  const [coldWaterPipeDepthM, setColdWaterPipeDepthM] = useState<number>(1000);
  const [coldWaterPipeDiameterM, setColdWaterPipeDiameterM] = useState<number>(2.8);
  const [warmWaterFlowRateM3s, setWarmWaterFlowRateM3s] = useState<number>(25.0);
  const [coldWaterFlowRateM3s, setColdWaterFlowRateM3s] = useState<number>(15.0);
  const [turbineIsentropicEfficiencyPct, setTurbineIsentropicEfficiencyPct] = useState<number>(85);

  const selectedSite = VIETNAM_OTEC_RESOURCES[selectedSiteIndex];

  // Recalculate OTEC simulation
  const result = useMemo(() => {
    const params: OtecOperatingParameters = {
      technology: selectedTech,
      workingFluid: selectedFluid,
      warmSurfaceWaterTempC,
      coldDeepWaterTempC,
      coldWaterPipeDepthM,
      coldWaterPipeDiameterM,
      warmWaterFlowRateM3s,
      coldWaterFlowRateM3s,
      evaporatorPinchPointDeltaC: 2.0,
      condenserPinchPointDeltaC: 2.0,
      turbineIsentropicEfficiencyPct,
      pumpEfficiencyPct: 82.0
    };
    return calculateOtecPerformance(params);
  }, [
    selectedTech,
    selectedFluid,
    warmSurfaceWaterTempC,
    coldDeepWaterTempC,
    coldWaterPipeDepthM,
    coldWaterPipeDiameterM,
    warmWaterFlowRateM3s,
    coldWaterFlowRateM3s,
    turbineIsentropicEfficiencyPct
  ]);

  const handleSiteSelect = (index: number) => {
    sound.playUiClick();
    setSelectedSiteIndex(index);
    const site = VIETNAM_OTEC_RESOURCES[index];
    setWarmSurfaceWaterTempC(site.surfaceTempMeanC);
    setColdDeepWaterTempC(site.deepTemp1000mC);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-cyan-950 to-blue-950 border border-cyan-800/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Ocean Thermal Energy Conversion (OTEC) & Deep-Sea Ammonia Engine</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
              Chuyển Hóa Nhiệt Năng Đại Dương & Chu Trình Nhiệt Biển Sâu
            </h2>
            <p className="text-cyan-200/80 text-sm mt-1 max-w-3xl leading-relaxed">
              Khai thác chênh lệch nhiệt độ giữa nước biển bề mặt nhiệt đới (28°C) và nước biển sâu 1,000m (4.5°C) bằng chu trình
              Rankine amoniac khan (NH₃), tạo nguồn điện nền sạch 24/7/365, nước ngọt khử mặn, điều hòa SWAC và dinh dưỡng nuôi biển sâu.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-cyan-900/60 border border-cyan-500/40 rounded-lg text-cyan-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Carnot: ~{result.carnotEfficiencyPct}%</span>
            </span>
            <span className="px-3 py-1 bg-blue-900/60 border border-blue-500/40 rounded-lg text-blue-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>P_net: {result.netExportPowerMw} MW</span>
            </span>
            <span className="px-3 py-1 bg-emerald-900/60 border border-emerald-500/40 rounded-lg text-emerald-300 font-mono text-xs flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Baseload: 94% CF</span>
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-cyan-900/50">
          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('RANKINE_CYCLE_AND_AMMONIA_ORC');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'RANKINE_CYCLE_AND_AMMONIA_ORC'
                ? 'bg-cyan-500 text-obsidian shadow-lg shadow-cyan-500/30 font-extrabold ring-2 ring-cyan-300'
                : 'bg-obsidian/40 text-cyan-200/80 hover:bg-cyan-950/60 hover:text-white border border-cyan-800/40'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>1. Chu Trình OTEC & Bay Hơi Amoniac (Rankine ORC)</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('CWIP_HYDRODYNAMICS_AND_PUMPING');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'CWIP_HYDRODYNAMICS_AND_PUMPING'
                ? 'bg-cyan-500 text-obsidian shadow-lg shadow-cyan-500/30 font-extrabold ring-2 ring-cyan-300'
                : 'bg-obsidian/40 text-cyan-200/80 hover:bg-cyan-950/60 hover:text-white border border-cyan-800/40'
            }`}
          >
            <Anchor className="w-4 h-4" />
            <span>2. Ống Hút Nước Biển Sâu CWIP 1000m & Thủy Động Lực</span>
          </button>

          <button
            onClick={() => {
              sound.playUiClick();
              setActiveTab('BLUE_ECONOMY_AND_VIETNAM_POTENTIAL');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'BLUE_ECONOMY_AND_VIETNAM_POTENTIAL'
                ? 'bg-cyan-500 text-obsidian shadow-lg shadow-cyan-500/30 font-extrabold ring-2 ring-cyan-300'
                : 'bg-obsidian/40 text-cyan-200/80 hover:bg-cyan-950/60 hover:text-white border border-cyan-800/40'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>3. Hệ Sinh Thái Biển Xanh & Tiềm Năng Biển Đông</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RANKINE CYCLE & AMMONIA ORC */}
      {activeTab === 'RANKINE_CYCLE_AND_AMMONIA_ORC' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Controls Column */}
          <div className="bg-slate-900/80 border border-cyan-900/40 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 border-b border-cyan-900/40 pb-3">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span>Thông Số Vận Hành OTEC</span>
            </h3>

            {/* Architecture Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Kiến Trúc Chu Trình (OTEC Architecture):</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedTech('CLOSED_CYCLE_AMMONIA');
                    setSelectedFluid('ANHYDROUS_AMMONIA_NH3');
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedTech === 'CLOSED_CYCLE_AMMONIA'
                      ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Chu Trình Kín (CC-OTEC NH3)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedTech('KALINA_CYCLE_ZEOTROPIC');
                    setSelectedFluid('ZEOTROPIC_NH3_H2O');
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedTech === 'KALINA_CYCLE_ZEOTROPIC'
                      ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Chu Trình Kalina (NH3/H2O)
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedTech('OPEN_CYCLE_FLASH_STEAM');
                    setSelectedFluid('PURE_WATER_STEAM');
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedTech === 'OPEN_CYCLE_FLASH_STEAM'
                      ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Chu Trình Mở Claude
                </button>
                <button
                  onClick={() => {
                    sound.playUiClick();
                    setSelectedTech('HYBRID_POWER_DESALINATION');
                    setSelectedFluid('ANHYDROUS_AMMONIA_NH3');
                  }}
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                    selectedTech === 'HYBRID_POWER_DESALINATION'
                      ? 'bg-cyan-600 text-white font-bold ring-2 ring-cyan-400'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Hỗn Hợp Điện & Nước Ngọt
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Nhiệt Độ Bề Mặt (T_warm):</span>
                  <span className="font-mono text-amber-400 font-bold">{warmSurfaceWaterTempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="24.0"
                  max="32.0"
                  step="0.1"
                  value={warmSurfaceWaterTempC}
                  onChange={e => setWarmSurfaceWaterTempC(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Nhiệt Độ Biển Sâu (T_cold):</span>
                  <span className="font-mono text-cyan-400 font-bold">{coldDeepWaterTempC.toFixed(1)} °C</span>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="7.0"
                  step="0.1"
                  value={coldDeepWaterTempC}
                  onChange={e => setColdDeepWaterTempC(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Lưu Lượng Nước Ấm (Warm Seawater):</span>
                  <span className="font-mono text-amber-400 font-bold">{warmWaterFlowRateM3s} m³/s</span>
                </div>
                <input
                  type="range"
                  min="10.0"
                  max="50.0"
                  step="1.0"
                  value={warmWaterFlowRateM3s}
                  onChange={e => setWarmWaterFlowRateM3s(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Lưu Lượng Nước Sâu (Cold Seawater):</span>
                  <span className="font-mono text-cyan-400 font-bold">{coldWaterFlowRateM3s} m³/s</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="35.0"
                  step="1.0"
                  value={coldWaterFlowRateM3s}
                  onChange={e => setColdWaterFlowRateM3s(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Hiệu Suất Đẳng Én-trô-pi Tuabin:</span>
                  <span className="font-mono text-emerald-400 font-bold">{turbineIsentropicEfficiencyPct} %</span>
                </div>
                <input
                  type="range"
                  min="75"
                  max="92"
                  step="1"
                  value={turbineIsentropicEfficiencyPct}
                  onChange={e => setTurbineIsentropicEfficiencyPct(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>

            {/* Selected Fluid Info */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <Info className="w-3.5 h-3.5" />
                <span>{result.workingFluid.name}</span>
              </div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                {result.workingFluid.description}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] text-slate-300">
                <div>ΔH_vap: <span className="text-cyan-400">{result.workingFluid.latentHeatVaporizationKjKg} kJ/kg</span></div>
                <div>GWP / ODP: <span className="text-emerald-400">{result.workingFluid.globalWarmingPotentialGwp} / {result.workingFluid.ozoneDepletionPotentialOdp}</span></div>
              </div>
            </div>
          </div>

          {/* Center Column: Animated Thermodynamic Flow Diagram */}
          <div className="bg-slate-900/80 border border-cyan-900/40 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 border-b border-cyan-900/40 pb-3">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Sơ Đồ Chu Trình OTEC Khép Kín (Rankine ORC)</span>
              </h3>

              {/* Interactive SVG Diagram */}
              <div className="mt-4 bg-slate-950/90 border border-cyan-950 rounded-xl p-4 flex items-center justify-center">
                <svg viewBox="0 0 460 300" className="w-full max-w-md h-auto">
                  <defs>
                    <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <linearGradient id="coldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Surface warm water inlet */}
                  <rect x="20" y="20" width="130" height="45" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="85" y="38" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">Nước Biển Mặt</text>
                  <text x="85" y="53" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">
                    {warmSurfaceWaterTempC.toFixed(1)}°C (Ấm)
                  </text>

                  {/* Warm water pipe into Evaporator */}
                  <path d="M 150 42 L 195 42" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6 3" />

                  {/* Evaporator Unit */}
                  <rect x="195" y="15" width="80" height="75" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="235" y="38" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Bộ Bay Hơi</text>
                  <text x="235" y="52" fill="#94a3b8" fontSize="8" textAnchor="middle">Evaporator</text>
                  <text x="235" y="68" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {result.evaporatorPressureBar} bar
                  </text>

                  {/* High pressure vapor line to Turbine */}
                  <path d="M 275 42 L 350 42 L 350 100" stroke="#38bdf8" strokeWidth="4" filter="url(#glow)" />
                  <polygon points="350,105 345,95 355,95" fill="#38bdf8" />

                  {/* Turbine and Generator */}
                  <circle cx="350" cy="130" r="28" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                  <text x="350" y="126" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">Tuabin NH₃</text>
                  <text x="350" y="139" fill="#a7f3d0" fontSize="10" fontWeight="extrabold" textAnchor="middle">
                    +{result.grossGeneratorPowerMw} MW
                  </text>

                  {/* Low pressure vapor to Condenser */}
                  <path d="M 350 160 L 350 215 L 275 215" stroke="#0284c7" strokeWidth="3.5" />
                  <polygon points="275,215 285,210 285,220" fill="#0284c7" />

                  {/* Condenser Unit */}
                  <rect x="195" y="180" width="80" height="75" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="235" y="203" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Bộ Ngưng Tụ</text>
                  <text x="235" y="217" fill="#94a3b8" fontSize="8" textAnchor="middle">Condenser</text>
                  <text x="235" y="233" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                    {result.condenserPressureBar} bar
                  </text>

                  {/* Cold deep water inlet */}
                  <rect x="20" y="195" width="130" height="45" rx="8" fill="#1e3a8a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="85" y="213" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">Nước Biển Sâu 1000m</text>
                  <text x="85" y="228" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">
                    {coldDeepWaterTempC.toFixed(1)}°C (Lạnh)
                  </text>

                  {/* Cold water into condenser */}
                  <path d="M 150 217 L 195 217" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6 3" />

                  {/* Ammonia liquid return line through pump */}
                  <path d="M 195 235 L 140 235 L 140 85 L 195 85" stroke="#0284c7" strokeWidth="2.5" fill="none" />
                  <circle cx="140" cy="160" r="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <text x="140" y="163" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">Bơm</text>

                  {/* Water discharges */}
                  <path d="M 235 90 L 235 110 L 260 110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="270" y="113" fill="#f59e0b" fontSize="8">Xả bề mặt ~25°C</text>

                  <path d="M 235 180 L 235 160 L 260 160" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="270" y="163" fill="#38bdf8" fontSize="8">Xả biển sâu ~8°C</text>
                </svg>
              </div>
            </div>

            {/* Quick Physical Chemistry Callout */}
            <div className="bg-cyan-950/40 border border-cyan-800/40 rounded-xl p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <ThermometerSnowflake className="w-3.5 h-3.5" />
                <span>Nhiệt Động Học Chênh Lệch Nhỏ (Low-ΔT Carnot):</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Với ΔT = {result.thermalGradientDeltaC}°C, giới hạn Carnot lý tưởng chỉ đạt{' '}
                <span className="font-mono text-cyan-300 font-bold">{result.carnotEfficiencyPct}%</span>. Tuy nhiên vì nguồn nhiệt đại dương
                là vô hạn và miễn phí từ năng lượng mặt trời tích lũy, hiệu suất thuần{' '}
                <span className="font-mono text-emerald-400 font-bold">{result.netCycleEfficiencyPct}%</span> vẫn tạo ra{' '}
                <span className="font-mono text-white font-bold">{result.netExportPowerMw} MW</span> điện thương phẩm liên tục 24/7!
              </p>
            </div>
          </div>

          {/* Right Column: Performance & Economics Metrics */}
          <div className="bg-slate-900/80 border border-cyan-900/40 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 border-b border-cyan-900/40 pb-3">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Cân Bằng Năng Lượng OTEC</span>
            </h3>

            <div className="space-y-3">
              {/* Gross Generator */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-400">Công Suất Phát Gộp (Gross Power):</div>
                  <div className="text-lg font-black text-amber-400 font-mono">+{result.grossGeneratorPowerMw} MW</div>
                </div>
                <Zap className="w-6 h-6 text-amber-400" />
              </div>

              {/* Parasitic Losses Breakdown */}
              <div className="bg-slate-950/70 border border-rose-900/30 rounded-xl p-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tổn Thất Bơm Tự Dùng (Parasitic):</span>
                  <span className="font-mono text-rose-400 font-bold">
                    -{result.parasiticLosses.totalParasiticPowerMw} MW ({result.parasiticLosses.parasiticShareOfGrossPct}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, result.parasiticLosses.parasiticShareOfGrossPct)}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-400 font-mono pt-1">
                  <div>Bơm Lạnh: <span className="text-cyan-400">{result.parasiticLosses.coldWaterPumpingPowerMw}M</span></div>
                  <div>Bơm Ấm: <span className="text-amber-400">{result.parasiticLosses.warmWaterPumpingPowerMw}M</span></div>
                  <div>Bơm NH₃: <span className="text-indigo-400">{result.parasiticLosses.workingFluidCirculationPowerMw}M</span></div>
                </div>
              </div>

              {/* Net Power Export */}
              <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-xl p-4 flex justify-between items-center shadow-lg shadow-emerald-950/40">
                <div>
                  <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
                    Công Suất Xuất Lưới Thuần (Net Export):
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {result.netExportPowerMw} MW
                  </div>
                  <div className="text-[11px] text-emerald-200/70 mt-0.5">
                    Sản lượng hàng năm: <span className="font-mono font-bold text-white">{result.annualNetGenerationGwh} GWh</span>/năm
                  </div>
                </div>
                <Sparkles className="w-8 h-8 text-emerald-400" />
              </div>

              {/* Pressure Ratios & Temperature Drops */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Áp Suất Bay Hơi (P_evap):</span>
                  <span className="font-mono text-cyan-300">{result.evaporatorPressureBar} bar ({result.evaporatorTemperatureC}°C)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Áp Suất Ngưng Tụ (P_cond):</span>
                  <span className="font-mono text-cyan-300">{result.condenserPressureBar} bar ({result.condenserTemperatureC}°C)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tỷ Số Giãn Nở (Expansion Ratio):</span>
                  <span className="font-mono text-white font-bold">{result.expansionPressureRatio}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Giá Thành Điện San Bằng (LCOE):</span>
                  <span className="font-mono text-amber-300 font-bold">${result.environmentalEconomics.levelizedCostOfElectricityUsdPerMwh} / MWh</span>
                </div>
              </div>

              {/* Reliability Banner */}
              <div className="bg-blue-950/40 border border-blue-900/50 rounded-xl p-3 flex items-start gap-2.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  <span className="font-bold text-cyan-200">Điện Nền Tuyệt Đối (Baseload 94%):</span> Không bị gián đoạn do mây mù hay ban đêm như điện mặt trời, không phụ thuộc gió lặng. Cung cấp năng lượng ổn định cho đảo và vùng ven biển.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CWIP HYDRODYNAMICS & PUMPING */}
      {activeTab === 'CWIP_HYDRODYNAMICS_AND_PUMPING' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* Hydrodynamic Calculation Column */}
          <div className="bg-slate-900/80 border border-cyan-900/40 rounded-2xl p-5 space-y-5">
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 border-b border-cyan-900/40 pb-3">
              <Anchor className="w-4 h-4 text-cyan-400" />
              <span>Thủy Động Lực Ống Hút Nước Biển Sâu (CWIP)</span>
            </h3>

            {/* Sliders for Pipe */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Chiều Dài / Độ Sâu Ống Hút (Pipe Depth L):</span>
                  <span className="font-mono text-cyan-400 font-bold">{coldWaterPipeDepthM} mét</span>
                </div>
                <input
                  type="range"
                  min="600"
                  max="1200"
                  step="50"
                  value={coldWaterPipeDepthM}
                  onChange={e => setColdWaterPipeDepthM(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Đường Kính Trong Ống HDPE (Diameter D):</span>
                  <span className="font-mono text-cyan-400 font-bold">{coldWaterPipeDiameterM.toFixed(1)} mét</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="4.5"
                  step="0.1"
                  value={coldWaterPipeDiameterM}
                  onChange={e => setColdWaterPipeDiameterM(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Lưu Lượng Nước Sâu Bơm Lên (Q_cold):</span>
                  <span className="font-mono text-cyan-400 font-bold">{coldWaterFlowRateM3s} m³/s</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="35.0"
                  step="1.0"
                  value={coldWaterFlowRateM3s}
                  onChange={e => setColdWaterFlowRateM3s(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            {/* Detailed Head Loss Readout */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="text-xs font-bold text-cyan-300 border-b border-slate-800 pb-2">
                Phương Trình Thủy Lực Darcy-Weisbach & Cột Áp Tổng (TDH):
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Vận Tốc Dòng Chảy (v):</div>
                  <div className="text-base font-black text-cyan-400 font-mono">
                    {result.coldWaterPipeHydrodynamics.flowVelocityMPerS} m/s
                  </div>
                  <div className="text-[10px] text-slate-500">Mức tối ưu: 2.0 - 2.5 m/s</div>
                </div>

                <div className="bg-slate-900/60 p-2.5 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Tổn Thất Ma Sát (h_friction):</div>
                  <div className="text-base font-black text-rose-400 font-mono">
                    {result.coldWaterPipeHydrodynamics.darcyFrictionalHeadLossM} mét
                  </div>
                  <div className="text-[10px] text-slate-500">HDPE smooth (f ~ 0.0135)</div>
                </div>

                <div className="bg-slate-900/60 p-2.5 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Cột Áp Chênh Khối Lượng Riêng:</div>
                  <div className="text-base font-black text-amber-400 font-mono">
                    {result.coldWaterPipeHydrodynamics.densityDifferenceHeadM} mét
                  </div>
                  <div className="text-[10px] text-slate-500">Δρ ~ 5 kg/m³ (4°C vs 28°C)</div>
                </div>

                <div className="bg-slate-900/60 p-2.5 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Cột Áp Tổng Động Lực (TDH):</div>
                  <div className="text-base font-black text-emerald-400 font-mono">
                    {result.coldWaterPipeHydrodynamics.totalDynamicHeadM} mét
                  </div>
                  <div className="text-[10px] text-slate-500">Bao gồm tổn thất cục bộ</div>
                </div>
              </div>

              {/* Pump Work Metric */}
              <div className="bg-cyan-950/40 border border-cyan-800/40 rounded-lg p-3 flex justify-between items-center text-xs">
                <span className="text-cyan-200">Điện Năng Bơm Nước Sâu Tiêu Thụ:</span>
                <span className="font-mono text-cyan-300 font-bold text-sm">
                  {result.parasiticLosses.coldWaterPumpingPowerMw} MW
                </span>
              </div>
            </div>
          </div>

          {/* Ocean Column & Thermocline Schematic */}
          <div className="bg-slate-900/80 border border-cyan-900/40 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2 border-b border-cyan-900/40 pb-3">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Trắc Diện Đại Dương & Tầng Nhảy Nhiệt (Thermocline)</span>
              </h3>

              {/* Ocean Profile Graphic */}
              <div className="mt-4 bg-slate-950/90 border border-cyan-950 rounded-xl p-4 flex items-center justify-center">
                <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto font-sans">
                  <defs>
                    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                      <stop offset="25%" stopColor="#0369a1" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#0c4a6e" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#082f49" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  {/* Ocean Water Body */}
                  <rect x="50" y="30" width="300" height="260" rx="8" fill="url(#oceanGrad)" />

                  {/* Surface Level */}
                  <line x1="45" y1="30" x2="355" y2="30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="60" y="24" fill="#38bdf8" fontSize="9" fontWeight="bold">0m (Mặt Biển: 28°C)</text>

                  {/* OTEC Floating Platform */}
                  <rect x="160" y="15" width="80" height="25" rx="4" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="200" y="31" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle">Giàn OTEC</text>

                  {/* Mixed Epipelagic Layer */}
                  <text x="60" y="60" fill="#bae6fd" fontSize="8">Tầng Hòa Trộn Nắng (0 - 100m)</text>
                  <text x="60" y="72" fill="#7dd3fc" fontSize="7">Quang hợp mạnh, nghèo dinh dưỡng</text>

                  {/* Thermocline (Tầng Nhảy Nhiệt) */}
                  <rect x="50" y="85" width="300" height="60" fill="#38bdf8" fillOpacity="0.08" />
                  <line x1="50" y1="85" x2="350" y2="85" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="50" y1="145" x2="350" y2="145" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="60" y="110" fill="#93c5fd" fontSize="9" fontWeight="bold">TẦNG NHẢY NHIỆT (Thermocline 100-500m)</text>
                  <text x="60" y="124" fill="#bfdbfe" fontSize="8">Nhiệt độ giảm đột ngột từ 26°C xuống 8°C</text>

                  {/* Deep Cold Ocean */}
                  <text x="60" y="200" fill="#67e8f9" fontSize="8">Tầng Biển Sâu (Bathypelagic 500-1000m+)</text>
                  <text x="60" y="215" fill="#a5f3fc" fontSize="9" fontWeight="bold">1000m: 4.5°C | Tối đen, Áp suất ~100 bar</text>
                  <text x="60" y="228" fill="#e0f2fe" fontSize="7">Giàu NO3-, PO4^3-, SiO4^4-, Không vi khuẩn gây bệnh</text>

                  {/* Suspended CWIP Pipe */}
                  <line x1="195" y1="40" x2="195" y2="270" stroke="#0f172a" strokeWidth="10" />
                  <line x1="195" y1="40" x2="195" y2="270" stroke="#38bdf8" strokeWidth="6" />

                  {/* Flow Arrows inside pipe */}
                  <polygon points="195,230 192,238 198,238" fill="#ffffff" />
                  <polygon points="195,160 192,168 198,168" fill="#ffffff" />
                  <polygon points="195,90 192,98 198,98" fill="#ffffff" />

                  {/* Depth Markers on Right */}
                  <text x="310" y="45" fill="#94a3b8" fontSize="8">0m</text>
                  <text x="300" y="115" fill="#94a3b8" fontSize="8">200m</text>
                  <text x="300" y="180" fill="#94a3b8" fontSize="8">500m</text>
                  <text x="290" y="275" fill="#38bdf8" fontSize="9" fontWeight="bold">1,000m (Đáy Ống)</text>

                  {/* Pipe Intake Screen */}
                  <rect x="185" y="265" width="20" height="15" rx="3" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs space-y-1.5">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Vật Liệu Chế Tạo Ống HDPE Cường Lực:</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ống CWIP đường kính {coldWaterPipeDiameterM}m dài 1,000m được đúc từ nhựa Polyethylene mật độ cao (HDPE PE100)
                hoặc sợi carbon composite chịu ăn mòn biển tuyệt đối, độ dẻo cao giúp hấp thụ xung lực sóng bão đại dương.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BLUE ECONOMY & VIETNAM POTENTIAL */}
      {activeTab === 'BLUE_ECONOMY_AND_VIETNAM_POTENTIAL' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top: 4 Key Co-Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Potable Water Desalination */}
            <div className="bg-slate-900/80 border border-cyan-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300 uppercase">Nước Ngọt Khử Mặn</span>
                <Droplets className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {result.byproductsAndBlueEconomy.potableWaterProductionM3PerDay.toLocaleString()} m³
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Nước ngọt tinh khiết chưng cất tự nhiên từ chu trình mở Claude / Hybrid, giải quyết triệt để vấn đề nước uống cho huyện đảo.
              </div>
            </div>

            {/* 2. Deep Sea Nutrients & Aquaculture */}
            <div className="bg-slate-900/80 border border-emerald-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase">Dinh Dưỡng Nuôi Biển Sâu</span>
                <Fish className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                +{result.byproductsAndBlueEconomy.deepOceanWaterNutrients.aquacultureYieldBoostFactor}x Năng Suất
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Nước sâu vô trùng giàu NO₃⁻ ({result.byproductsAndBlueEconomy.deepOceanWaterNutrients.nitrateConcentrationUmolL} µM) và PO₄³⁻ nuôi tảo spirulina, rong nho, cá hồi biển ấm.
              </div>
            </div>

            {/* 3. SWAC Seawater Air Conditioning */}
            <div className="bg-slate-900/80 border border-blue-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300 uppercase">Điều Hòa SWAC</span>
                <ThermometerSnowflake className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-black text-blue-300 font-mono">
                {result.byproductsAndBlueEconomy.swacElectricitySavedMw} MW
              </div>
              <div className="text-[10px] text-cyan-300 font-mono">
                Công suất lạnh: {result.byproductsAndBlueEconomy.swacCoolingCapacityMwTh} MWth
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Nước lạnh 4.5°C làm mát trực tiếp các khu nghỉ dưỡng ven biển và trung tâm dữ liệu AI biển sâu, tiết kiệm {'>'} 85% điện làm lạnh.
              </div>
            </div>

            {/* 4. Green H2 & Green NH3 Fuel */}
            <div className="bg-slate-900/80 border border-amber-800/50 rounded-2xl p-4 space-y-2 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">Hydro & Amoniac Xanh</span>
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {result.byproductsAndBlueEconomy.greenAmmoniaProductionTonsPerDay} tấn/ngày
              </div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Điện nền 24/7 chạy điện phân AEMWE sản xuất {result.byproductsAndBlueEconomy.greenHydrogenProductionKgPerDay.toLocaleString()} kg H₂/ngày và tổng hợp NH₃ lỏng làm nhiên liệu tàu biển không carbon.
              </div>
            </div>
          </div>

          {/* Bottom: Vietnam Offshore OTEC Sites Selector & Geological Analysis */}
          <div className="bg-slate-900/80 border border-cyan-900/40 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-cyan-900/40 pb-3">
              <div>
                <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  <span>Tiềm Năng Năng Lượng Nhiệt Biển Việt Nam (Hơn 100,000 MW Công Suất Nền)</span>
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Vùng biển Việt Nam có thềm lục địa hẹp, vực sâu 1,000m tiếp cận sát bờ biển Nam Trung Bộ và các đảo tiền tiêu.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-lg">
                Vùng Đặc Quyền Kinh Tế {'>'} 1,000,000 km²
              </span>
            </div>

            {/* Site Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {VIETNAM_OTEC_RESOURCES.map((site, idx) => (
                <button
                  key={site.siteId}
                  onClick={() => handleSiteSelect(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedSiteIndex === idx
                      ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white mb-1">{site.name}</div>
                    <div className="text-[10px] text-slate-400">{site.region}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Chênh Lệch ΔT:</span>
                      <span className="font-mono text-amber-400 font-bold">{site.deltaTC}°C</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Cách Vực Sâu:</span>
                      <span className="font-mono text-cyan-400 font-bold">{site.distanceTo1000mDepthKm} km</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Tiềm Năng Nền:</span>
                      <span className="font-mono text-emerald-400 font-bold">{site.theoreticalBaseloadPotentialMw} MW</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Site Analysis Box */}
            <div className="bg-slate-950/70 border border-cyan-900/50 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{selectedSite.name}</span>
                  <span className="text-xs font-mono text-cyan-300">
                    ({selectedSite.latitude.toFixed(2)}°N, {selectedSite.longitude.toFixed(2)}°E)
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
                  {selectedSite.notes}
                </p>
              </div>

              <div className="bg-cyan-900/30 border border-cyan-700/40 px-4 py-2.5 rounded-xl text-center shrink-0">
                <div className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">Ước Tính Giảm Phát Thải CO₂</div>
                <div className="text-lg font-black text-emerald-400 font-mono">
                  {result.environmentalEconomics.co2EmissionsAvoidedTonsPerYear.toLocaleString()} tấn/năm
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
