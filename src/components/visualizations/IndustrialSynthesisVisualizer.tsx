// src/components/visualizations/IndustrialSynthesisVisualizer.tsx
// Interactive Industrial Gas Synthesis Reactor & Le Chatelier Compromise Visualizer
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Grade 10 Kinetics, Grade 11 Equilibrium, Grade 12 Applied Chemistry) & IUPAC Standards

import React, { useState, useMemo, useEffect } from 'react';
import {
  Factory,
  Flame,
  Gauge,
  RotateCcw,
  Sparkles,
  Zap,
  Info,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Thermometer,
  Activity,
  Wind
} from 'lucide-react';
import {
  INDUSTRIAL_PROCESSES,
  IndustrialProcessDef,
  IndustrialReactorEngine,
  ReactorSimulationResult
} from '../../domain/industrialReactorEngine';
import { sound } from '../../audio/soundEngine';

export interface IndustrialSynthesisVisualizerProps {
  initialProcessId?: string;
  className?: string;
  onSimulationChange?: (result: ReactorSimulationResult) => void;
}

export const IndustrialSynthesisVisualizer: React.FC<IndustrialSynthesisVisualizerProps> = ({
  initialProcessId = 'haber_bosch',
  className = '',
  onSimulationChange
}) => {
  const [selectedProcessId, setSelectedProcessId] = useState<string>(initialProcessId);

  // Active process definition
  const currentProcess = useMemo<IndustrialProcessDef>(() => {
    return (
      INDUSTRIAL_PROCESSES.find(p => p.id === selectedProcessId) || INDUSTRIAL_PROCESSES[0]
    );
  }, [selectedProcessId]);

  // Operational Control Parameters
  const [temperatureC, setTemperatureC] = useState<number>(() => {
    return Math.round(
      (currentProcess.optimalTempRangeC[0] + currentProcess.optimalTempRangeC[1]) / 2
    );
  });
  const [pressureAtm, setPressureAtm] = useState<number>(() => {
    return Math.round(
      (currentProcess.optimalPressureRangeAtm[0] + currentProcess.optimalPressureRangeAtm[1]) / 2
    );
  });
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(true);
  const [recycleRatio, setRecycleRatio] = useState<number>(0.85); // 85% default recycle
  const [coolingEfficiency, setCoolingEfficiency] = useState<number>(0.95); // 95% condenser efficiency
  const [activeTab, setActiveTab] = useState<'SIMULATION' | 'PEDAGOGY' | 'TACTICAL'>('SIMULATION');

  // Animation cycle tick for gas stream particles
  const [streamTick, setStreamTick] = useState<number>(0);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      setStreamTick(prev => (prev + dt * 1.2) % 1);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Compute simulation result
  const simulationResult = useMemo<ReactorSimulationResult>(() => {
    return IndustrialReactorEngine.simulate({
      processId: selectedProcessId,
      temperatureCelsius: temperatureC,
      pressureAtm,
      hasCatalyst,
      recycleRatio,
      coolingEfficiency
    });
  }, [selectedProcessId, temperatureC, pressureAtm, hasCatalyst, recycleRatio, coolingEfficiency]);

  useEffect(() => {
    if (onSimulationChange) {
      onSimulationChange(simulationResult);
    }
  }, [simulationResult, onSimulationChange]);

  // Handle process switch
  const handleSelectProcess = (id: string) => {
    setSelectedProcessId(id);
    const proc = INDUSTRIAL_PROCESSES.find(p => p.id === id) || INDUSTRIAL_PROCESSES[0];
    const avgTemp = Math.round((proc.optimalTempRangeC[0] + proc.optimalTempRangeC[1]) / 2);
    const avgP = Math.round((proc.optimalPressureRangeAtm[0] + proc.optimalPressureRangeAtm[1]) / 2);
    setTemperatureC(avgTemp);
    setPressureAtm(avgP);
    setHasCatalyst(true);
    setRecycleRatio(0.85);
    setCoolingEfficiency(0.95);
    try {
      sound.playUiClick();
      sound.playCatalyticTurbineHum(50);
    } catch {}
  };

  // Reset to Industrial Optimal Standard
  const handleResetToStandard = () => {
    const avgTemp = Math.round(
      (currentProcess.optimalTempRangeC[0] + currentProcess.optimalTempRangeC[1]) / 2
    );
    const avgP = Math.round(
      (currentProcess.optimalPressureRangeAtm[0] + currentProcess.optimalPressureRangeAtm[1]) / 2
    );
    setTemperatureC(avgTemp);
    setPressureAtm(avgP);
    setHasCatalyst(true);
    setRecycleRatio(0.85);
    setCoolingEfficiency(0.95);
    try {
      sound.playCatalyticTurbineHum(75);
    } catch {}
  };

  // Temperature color scale
  const tempHeatColor = useMemo(() => {
    if (temperatureC < 300) return '#60a5fa'; // Blue
    if (temperatureC < 450) return '#fbbf24'; // Amber
    if (temperatureC < 700) return '#f97316'; // Orange
    return '#ef4444'; // Glowing Red
  }, [temperatureC]);

  // Pressure gauge angle (-120 deg to +120 deg)
  const pressureAngle = useMemo(() => {
    const fraction = Math.min(1.0, Math.max(0, (pressureAtm - 1) / 249));
    return -120 + fraction * 240;
  }, [pressureAtm]);

  return (
    <div
      className={`industrial-synthesis-visualizer bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-5 text-slate-100 flex flex-col gap-5 ${className}`}
      data-testid="industrial-synthesis-visualizer"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-500/40 text-amber-400 shadow-inner">
            <Factory className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-wide text-white flex items-center gap-2">
              <span>MÔ PHỎNG LÒ PHẢN ỨNG TỔNG HỢP KHÍ CÔNG NGHIỆP</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                GDPT 2018
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Nguyên lý Le Chatelier, Động học Xúc tác & Bài toán Thỏa hiệp Công nghiệp (Haber-Bosch, Tiếp xúc, Syngas, Ostwald)
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setActiveTab('SIMULATION');
              sound.playUiClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'SIMULATION'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>Mô Phỏng Lò Phản Ứng</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('PEDAGOGY');
              sound.playUiClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'PEDAGOGY'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sư Phạm & Bài Toán Thỏa Hiệp</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('TACTICAL');
              sound.playUiClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'TACTICAL'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Hiệu Ứng Chiến Thuật</span>
          </button>
        </div>
      </div>

      {/* Process Selection Selector Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {INDUSTRIAL_PROCESSES.map(proc => {
          const isSelected = proc.id === selectedProcessId;
          return (
            <button
              key={proc.id}
              onClick={() => handleSelectProcess(proc.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-1 relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/80 shadow-md shadow-amber-500/10 ring-1 ring-amber-500/50'
                  : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-bold tracking-wide uppercase ${
                    isSelected ? 'text-amber-300' : 'text-slate-300'
                  }`}
                >
                  {proc.category.replace('_', ' ')}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
              </div>
              <div className="text-xs font-mono font-semibold text-white truncate">
                {proc.equation}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-1">
                {proc.name_vi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'SIMULATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Industrial Plant SVG Schematic Diagram (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative bg-slate-950/80 rounded-xl border border-slate-800 p-3 overflow-hidden shadow-inner flex flex-col">
              {/* Diagram Title & Status Badge */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-slate-200">
                    Sơ Đồ Dây Chuyền Sản Xuất: {currentProcess.name_vi}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      simulationResult.safetyWarning
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {simulationResult.safetyWarning ? 'CẢNH BÁO QUÁ TẢI' : 'VẬN HÀNH ỔN ĐỊNH'}
                  </span>
                </div>
              </div>

              {/* Chemical Equation Badge */}
              <div className="flex items-center justify-center p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-sm font-mono text-center font-bold text-amber-300 mb-3 shadow">
                {currentProcess.equation} &nbsp;
                <span className="text-xs text-slate-400 font-normal">
                  (ΔᵣH°₂₉₈ = {currentProcess.standardDeltaH_kJ > 0 ? '+' : ''}
                  {currentProcess.standardDeltaH_kJ} kJ/mol, Δn_g = {currentProcess.delta_n_gas})
                </span>
              </div>

              {/* SVG Schematic Plant Apparatus */}
              <div className="w-full flex items-center justify-center">
                <svg
                  viewBox="0 0 640 380"
                  className="w-full max-h-[380px] drop-shadow-xl select-none"
                  style={{ background: '#0b1120', borderRadius: '12px' }}
                >
                  <defs>
                    {/* Metal Reactor Wall Gradient */}
                    <linearGradient id="reactorSteel" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="25%" stopColor="#64748b" />
                      <stop offset="50%" stopColor="#94a3b8" />
                      <stop offset="75%" stopColor="#475569" />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>

                    {/* Thermal Core Glow Gradient */}
                    <radialGradient id="thermalGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={tempHeatColor} stopOpacity="0.85" />
                      <stop offset="60%" stopColor={tempHeatColor} stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
                    </radialGradient>

                    {/* Catalyst Trays Pattern */}
                    <pattern id="catalystPattern" width="12" height="12" patternUnits="userSpaceOnUse">
                      <circle cx="6" cy="6" r="2.5" fill="#e2e8f0" fillOpacity="0.7" />
                    </pattern>

                    {/* Pipe Flow Gradient */}
                    <linearGradient id="feedFlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>

                    <linearGradient id="condenserChamber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Background Grid Lines */}
                  <g stroke="#1e293b" strokeWidth="0.7" strokeDasharray="3 3">
                    <line x1="20" y1="60" x2="620" y2="60" />
                    <line x1="20" y1="120" x2="620" y2="120" />
                    <line x1="20" y1="180" x2="620" y2="180" />
                    <line x1="20" y1="240" x2="620" y2="240" />
                    <line x1="20" y1="300" x2="620" y2="300" />
                  </g>

                  {/* 1. INLET FEED PIPE (Khí Nguyên Liệu Vào) */}
                  <path
                    d="M 20 180 L 110 180"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Inlet animated dots */}
                  <circle
                    cx={20 + ((streamTick * 90) % 90)}
                    cy="180"
                    r="3.5"
                    fill="#ffffff"
                    filter="drop-shadow(0 0 4px #38bdf8)"
                  />
                  <text x="30" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold">
                    Khí Nạp ({currentProcess.reactants.map(r => r.formula).join(' + ')})
                  </text>

                  {/* 2. HEAT EXCHANGER / TIẾT KIỆM NHIỆT (110, 140 -> 170, 220) */}
                  <rect
                    x="110"
                    y="135"
                    width="60"
                    height="90"
                    rx="8"
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  {/* Heat coils */}
                  <path
                    d="M 120 155 Q 140 145 160 155 Q 140 165 120 175 Q 140 185 160 195 Q 140 205 120 215"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2.5"
                  />
                  <text x="115" y="128" fill="#94a3b8" fontSize="9" fontWeight="bold">
                    Bộ Trao Đổi Nhiệt
                  </text>

                  {/* Pipe from Heat Exchanger to Top of Reactor Vessel */}
                  <path
                    d="M 170 180 L 220 180 L 220 80 L 260 80"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="8"
                  />

                  {/* 3. MAIN CATALYTIC HIGH-PRESSURE REACTOR VESSEL (THÁP PHẢN ỨNG CHỊU ÁP) */}
                  {/* Outer Steel Vessel Walls */}
                  <rect
                    x="260"
                    y="40"
                    width="140"
                    height="270"
                    rx="25"
                    fill="url(#reactorSteel)"
                    stroke="#64748b"
                    strokeWidth="4"
                  />
                  {/* Inner Reaction Core Chamber */}
                  <rect
                    x="272"
                    y="55"
                    width="116"
                    height="240"
                    rx="18"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />

                  {/* Core Thermal Radiation Glow */}
                  <rect
                    x="274"
                    y="57"
                    width="112"
                    height="236"
                    rx="16"
                    fill="url(#thermalGlow)"
                  />

                  {/* Catalytic Multi-Bed Trays (Lớp Xúc Tác) */}
                  {hasCatalyst ? (
                    <g>
                      {/* Tray 1 */}
                      <rect
                        x="280"
                        y="95"
                        width="100"
                        height="26"
                        rx="4"
                        fill="#334155"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <rect x="280" y="95" width="100" height="26" fill="url(#catalystPattern)" />
                      <text x="290" y="112" fill="#f8fafc" fontSize="10" fontWeight="bold">
                        {currentProcess.catalystComposition} (Tầng 1)
                      </text>

                      {/* Tray 2 */}
                      <rect
                        x="280"
                        y="150"
                        width="100"
                        height="26"
                        rx="4"
                        fill="#334155"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <rect x="280" y="150" width="100" height="26" fill="url(#catalystPattern)" />
                      <text x="290" y="167" fill="#f8fafc" fontSize="10" fontWeight="bold">
                        {currentProcess.catalystComposition} (Tầng 2)
                      </text>

                      {/* Tray 3 */}
                      <rect
                        x="280"
                        y="205"
                        width="100"
                        height="26"
                        rx="4"
                        fill="#334155"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                      />
                      <rect x="280" y="205" width="100" height="26" fill="url(#catalystPattern)" />
                      <text x="290" y="222" fill="#f8fafc" fontSize="10" fontWeight="bold">
                        {currentProcess.catalystComposition} (Tầng 3)
                      </text>
                    </g>
                  ) : (
                    <g>
                      <rect
                        x="280"
                        y="110"
                        width="100"
                        height="120"
                        rx="6"
                        fill="#1e293b"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                      <text x="288" y="165" fill="#ef4444" fontSize="11" fontWeight="bold">
                        KHÔNG XÚC TÁC
                      </text>
                      <text x="292" y="180" fill="#f87171" fontSize="9">
                        Ea = {currentProcess.activationEnergyUncat_kJ} kJ
                      </text>
                    </g>
                  )}

                  {/* Flow Gas Particles Inside Reactor */}
                  <circle
                    cx="330"
                    cy={65 + ((streamTick * 220) % 220)}
                    r="4"
                    fill="#fbbf24"
                    filter="drop-shadow(0 0 6px #f59e0b)"
                  />
                  <circle
                    cx="310"
                    cy={80 + (((streamTick + 0.33) * 200) % 200)}
                    r="3.5"
                    fill="#38bdf8"
                  />
                  <circle
                    cx="350"
                    cy={90 + (((streamTick + 0.66) * 190) % 190)}
                    r="3.5"
                    fill="#10b981"
                  />

                  {/* Safety Valve at Top of Reactor */}
                  <g transform="translate(320, 20)">
                    <rect x="-8" y="0" width="16" height="20" fill="#475569" stroke="#64748b" />
                    <polygon points="-12,0 12,0 0,-14" fill={pressureAtm > 240 ? '#ef4444' : '#64748b'} />
                    {pressureAtm > 240 && (
                      <g>
                        <path
                          d="M -5 -16 Q -15 -30 -5 -40 Q 5 -30 -5 -16"
                          fill="#fca5a5"
                          opacity="0.8"
                        />
                        <text x="8" y="-22" fill="#ef4444" fontSize="9" fontWeight="bold">
                          XẢ ÁP!
                        </text>
                      </g>
                    )}
                  </g>

                  {/* Reactor Core Label */}
                  <text x="280" y="270" fill="#f8fafc" fontSize="11" fontWeight="bold">
                    Tháp Chịu Áp
                  </text>
                  <text x="280" y="284" fill={tempHeatColor} fontSize="10" fontWeight="bold">
                    {temperatureC} °C | {pressureAtm} atm
                  </text>

                  {/* Pipe from Reactor Bottom to Heat Exchanger Return */}
                  <path
                    d="M 330 310 L 330 335 L 430 335 L 430 180 L 460 180"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* 4. CONDENSER & SEPARATOR (BỘ LÀM LẠNH & TÁCH KHÍ LỎNG) (460, 100 -> 540, 260) */}
                  <rect
                    x="460"
                    y="110"
                    width="70"
                    height="160"
                    rx="12"
                    fill="#0f172a"
                    stroke="#0284c7"
                    strokeWidth="3"
                  />
                  {/* Liquid Pool at Bottom of Condenser */}
                  <rect
                    x="464"
                    y="220"
                    width="62"
                    height="46"
                    rx="6"
                    fill="url(#condenserChamber)"
                  />
                  {/* Liquid surface wave */}
                  <path
                    d="M 464 220 Q 480 216 495 220 Q 510 224 526 220 L 526 266 L 464 266 Z"
                    fill="#38bdf8"
                    opacity="0.8"
                  />
                  <text x="470" y="246" fill="#ffffff" fontSize="9" fontWeight="bold">
                    {currentProcess.products.map(p => p.formula).join(', ')} Lỏng
                  </text>

                  {/* Cooling Coils Inside Condenser */}
                  <path
                    d="M 475 130 Q 495 120 515 130 Q 495 140 475 150 Q 495 160 515 170 Q 495 180 475 190 Q 495 200 515 210"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  <text x="468" y="102" fill="#38bdf8" fontSize="9" fontWeight="bold">
                    Ngưng Tụ / Tách
                  </text>

                  {/* Falling product liquid droplets */}
                  <circle
                    cx="495"
                    cy={150 + ((streamTick * 60) % 60)}
                    r="2.5"
                    fill="#67e8f9"
                  />

                  {/* Product Liquid Drain Tap */}
                  <path
                    d="M 495 270 L 495 340 L 560 340"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <text x="540" y="360" fill="#38bdf8" fontSize="11" fontWeight="bold">
                    Sản Phẩm Đích ({simulationResult.overallConversionPct}%)
                  </text>

                  {/* 5. GAS RECYCLE LOOP PIPE (ỐNG TUẦN HOÀN KHÍ CHƯA PHẢN ỨNG) */}
                  {/* Gas rises from top of condenser (500, 110) back across top to inlet (110, 180) */}
                  <path
                    d="M 495 110 L 495 50 L 140 50 L 140 135"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="5"
                    strokeDasharray={recycleRatio > 0 ? '6 4' : 'none'}
                    opacity={recycleRatio > 0 ? 0.9 : 0.2}
                  />
                  {/* Compressor Turbine Icon on Recycle Loop */}
                  <circle cx="310" cy="50" r="14" fill="#047857" stroke="#10b981" strokeWidth="2" />
                  <text x="303" y="54" fill="#ecfdf5" fontSize="11" fontWeight="bold">
                    P
                  </text>
                  <text x="250" y="35" fill="#10b981" fontSize="9" fontWeight="bold">
                    Máy Nén Tuần Hoàn ({Math.round(recycleRatio * 100)}%)
                  </text>
                  {/* Animated recycle particle */}
                  {recycleRatio > 0 && (
                    <circle
                      cx={495 - ((streamTick * 355) % 355)}
                      cy="50"
                      r="3"
                      fill="#34d399"
                    />
                  )}
                </svg>
              </div>

              {/* Assessment Banner */}
              <div
                className={`mt-3 p-3 rounded-xl border text-xs flex flex-col gap-1.5 ${
                  simulationResult.safetyWarning
                    ? 'bg-rose-950/40 border-rose-600/60 text-rose-200'
                    : 'bg-slate-900/90 border-slate-700/80 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {simulationResult.safetyWarning ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span className="text-amber-300">
                    {simulationResult.compromiseAssessmentVI.split(':')[0]}:
                  </span>
                </div>
                <p className="leading-relaxed pl-6">
                  {simulationResult.compromiseAssessmentVI}
                </p>
                <p className="text-[11px] text-slate-400 pl-6 border-t border-slate-800/80 pt-1">
                  <strong>Nguyên lý Le Chatelier:</strong> {simulationResult.leChatelierAssessmentVI}
                </p>
              </div>
            </div>

            {/* Performance Gauges Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-center">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Hiệu Suất 1 Lần</span>
                <span className="text-lg font-bold font-mono text-cyan-400">
                  {simulationResult.singlePassConversionPct}%
                </span>
                <span className="text-[9px] text-slate-500">Qua Tháp Phản Ứng</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Hiệu Suất Toàn Bộ</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {simulationResult.overallConversionPct}%
                </span>
                <span className="text-[9px] text-slate-500">Kèm Vòng Tuần Hoàn</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Tốc Độ Động Học</span>
                <span className="text-lg font-bold font-mono text-amber-400">
                  {simulationResult.reactionRateIndex} / 100
                </span>
                <span className="text-[9px] text-slate-500">Thang Arrhenius</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Điểm Kinh Tế</span>
                <span className="text-lg font-bold font-mono text-indigo-400">
                  {simulationResult.economicEfficiencyScore} / 100
                </span>
                <span className="text-[9px] text-slate-500">Hiệu Năng vs Chi Phí</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Parameter Sliders & Engineering Controls (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-950/90 rounded-xl border border-slate-800 p-4 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">BẢNG ĐIỀU KHIỂN THÔNG SỐ VẬN HÀNH</h3>
                </div>
                <button
                  onClick={handleResetToStandard}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-amber-300 border border-slate-700 flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Chuẩn Công Nghiệp</span>
                </button>
              </div>

              {/* 1. Temperature Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                    <strong>Nhiệt Độ Lò (T):</strong>
                  </span>
                  <span className="font-mono font-bold text-amber-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {temperatureC} °C ({temperatureC + 273.15} K)
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="5"
                  value={temperatureC}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setTemperatureC(val);
                    if (val % 50 === 0) sound.playUiClick();
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>100 °C</span>
                  <span className="text-amber-400/90">
                    Khuyến nghị: {currentProcess.optimalTempRangeC[0]} - {currentProcess.optimalTempRangeC[1]} °C
                  </span>
                  <span>1000 °C</span>
                </div>
              </div>

              {/* 2. Pressure Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    <strong>Áp Suất Vận Hành (P):</strong>
                  </span>
                  <span className="font-mono font-bold text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {pressureAtm} atm ({Math.round(pressureAtm * 0.101325 * 10) / 10} MPa)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="250"
                  step="1"
                  value={pressureAtm}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setPressureAtm(val);
                    if (val % 25 === 0) {
                      sound.playReactorPressureVent(val);
                    }
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 atm (Áp suất thường)</span>
                  <span className="text-cyan-400/90">
                    Khuyến nghị: {currentProcess.optimalPressureRangeAtm[0]} - {currentProcess.optimalPressureRangeAtm[1]} atm
                  </span>
                  <span>250 atm</span>
                </div>
              </div>

              {/* 3. Catalyst Toggle */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Chất Xúc Tác: {currentProcess.catalystName_vi}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {currentProcess.promoters_vi} (Giảm Ea từ {currentProcess.activationEnergyUncat_kJ} kJ → {currentProcess.activationEnergyCat_kJ} kJ)
                  </span>
                </div>
                <button
                  onClick={() => {
                    setHasCatalyst(!hasCatalyst);
                    sound.playUiClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    hasCatalyst
                      ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/60 shadow-inner'
                      : 'bg-rose-950/40 text-rose-300 border-rose-600/60'
                  }`}
                >
                  {hasCatalyst ? 'BẬT (HOẠT TÍNH)' : 'TẮT (KHÔNG DÙNG)'}
                </button>
              </div>

              {/* 4. Gas Recycle Ratio Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                    <strong>Tỉ Lệ Tuần Hoàn Khí:</strong>
                  </span>
                  <span className="font-mono font-bold text-emerald-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {Math.round(recycleRatio * 100)} %
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.95"
                  step="0.05"
                  value={recycleRatio}
                  onChange={e => setRecycleRatio(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0% (Không tuần hoàn)</span>
                  <span>Tiêu chuẩn công nghiệp: 80% - 90%</span>
                  <span>95%</span>
                </div>
              </div>

              {/* 5. Condenser Separator Efficiency */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-400" />
                    <strong>Hiệu Suất Làm Lạnh Tách Khí Lỏng:</strong>
                  </span>
                  <span className="font-mono font-bold text-indigo-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {Math.round(coolingEfficiency * 100)} %
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.0"
                  step="0.01"
                  value={coolingEfficiency}
                  onChange={e => setCoolingEfficiency(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Industrial Compromise Chart (SVG Conflict Curve) */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
                <span className="text-xs font-bold text-slate-200 flex items-center justify-between">
                  <span>Đồ Thị Xung Đột Thỏa Hiệp: Nhiệt Động vs Động Học</span>
                  <span className="text-[10px] text-amber-400 font-normal">T (100°C - 1000°C)</span>
                </span>
                <svg viewBox="0 0 320 120" className="w-full h-28 bg-slate-950 rounded-lg border border-slate-800">
                  {/* Grid Lines */}
                  <line x1="30" y1="20" x2="310" y2="20" stroke="#1e293b" strokeDasharray="2 2" />
                  <line x1="30" y1="60" x2="310" y2="60" stroke="#1e293b" strokeDasharray="2 2" />
                  <line x1="30" y1="100" x2="310" y2="100" stroke="#334155" />
                  <line x1="30" y1="10" x2="30" y2="100" stroke="#334155" />

                  {/* Optimal Zone Shading */}
                  <rect
                    x={30 + ((currentProcess.optimalTempRangeC[0] - 100) / 900) * 280}
                    y="10"
                    width={((currentProcess.optimalTempRangeC[1] - currentProcess.optimalTempRangeC[0]) / 900) * 280}
                    height="90"
                    fill="#f59e0b"
                    fillOpacity="0.15"
                  />

                  {/* Curve 1: Thermodynamic Yield alpha_eq (Cyan) */}
                  <path
                    d={
                      currentProcess.isExothermic
                        ? 'M 30 25 Q 120 30 180 55 T 310 95'
                        : 'M 30 95 Q 120 85 180 55 T 310 25'
                    }
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />

                  {/* Curve 2: Kinetic Reaction Rate r (Orange) */}
                  <path
                    d="M 30 98 Q 140 96 220 70 T 310 20"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeDasharray={hasCatalyst ? 'none' : '4 3'}
                  />

                  {/* Current Operating Point Vertical Marker */}
                  <line
                    x1={30 + ((temperatureC - 100) / 900) * 280}
                    y1="10"
                    x2={30 + ((temperatureC - 100) / 900) * 280}
                    y2="100"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={30 + ((temperatureC - 100) / 900) * 280}
                    cy="60"
                    r="4"
                    fill="#fbbf24"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />

                  {/* Legend Labels */}
                  <text x="35" y="18" fill="#38bdf8" fontSize="8" fontWeight="bold">
                    Cân Bằng (Kp)
                  </text>
                  <text x="210" y="18" fill="#f97316" fontSize="8" fontWeight="bold">
                    Tốc Độ (k)
                  </text>
                  <text
                    x={30 + ((currentProcess.optimalTempRangeC[0] - 100) / 900) * 280}
                    y="112"
                    fill="#fbbf24"
                    fontSize="7"
                    fontWeight="bold"
                  >
                    Vùng Thỏa Hiệp
                  </text>
                </svg>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                    Hiệu Suất Cân Bằng (giảm khi T tăng)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-orange-400 inline-block"></span>
                    Tốc Độ Động Học (tăng khi T tăng)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: PEDAGOGY (GDPT 2018 Sư Phạm & Bài Toán Thỏa Hiệp) */}
      {activeTab === 'PEDAGOGY' && (
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-5 flex flex-col gap-5">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>CHỦ ĐỀ DẠY HỌC GDPT 2018: NGUYÊN LÝ THỎA HIỆP TRONG HÓA HỌC CÔNG NGHIỆP</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Phân tích đối chứng giữa Nhiệt Động Học (Cân bằng Le Chatelier) và Động Học Hóa Học (Tốc độ phản ứng Arrhenius)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Nhiệt độ thỏa hiệp */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                <span>1. Tại sao không chọn nhiệt độ quá thấp hoặc quá cao?</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentProcess.compromiseExplanationVI.split('\n')[0]}
              </p>
              <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 mt-1 font-mono">
                Quy luật: Nhiệt độ thấp → Kp cao nhưng v → 0 (chờ đợi vô tận). Nhiệt độ cao → v cực nhanh nhưng Kp giảm sút (hiệu suất tụt dốc). Khoảng nhiệt độ 400 - 450 °C là điểm giao hòa kinh tế tối ưu!
              </div>
            </div>

            {/* Card 2: Áp suất thỏa hiệp */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
              <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                <span>2. Tại sao không chọn áp suất 1000 atm?</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentProcess.compromiseExplanationVI.split('\n')[1] || currentProcess.compromiseExplanationVI}
              </p>
              <div className="p-2.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300 mt-1 font-mono">
                Rào cản cơ khí: Áp suất quá cao đòi hỏi hợp kim dày đắt đỏ, tiêu tốn năng lượng máy nén khổng lồ và tiềm ẩn nguy cơ nổ bình phản ứng. 150 - 200 atm là giới hạn công nghệ an toàn.
              </div>
            </div>

            {/* Card 3: Vai trò xúc tác */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>3. Vai trò của Chất Xúc Tác ({currentProcess.catalystName_vi})</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chất xúc tác làm giảm năng lượng hoạt hóa (Ea) từ <strong>{currentProcess.activationEnergyUncat_kJ} kJ/mol</strong> xuống <strong>{currentProcess.activationEnergyCat_kJ} kJ/mol</strong>.
                Điều quan trọng cốt lõi: <em>Xúc tác làm tăng tốc độ phản ứng thuận và nghịch với cùng một tỉ lệ, do đó KHÔNG làm chuyển dịch vị trí cân bằng và KHÔNG làm thay đổi hằng số cân bằng Kp.</em> Nó chỉ giúp hệ đạt đến trạng thái cân bằng nhanh hơn!
              </p>
            </div>

            {/* Card 4: Bí quyết Vòng Tuần Hoàn Khí */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
              <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>4. Bí quyết Vòng Tuần Hoàn Khí & Tách Sản Phẩm</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentProcess.recyclingPrincipleVI}
              </p>
              <div className="p-2.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 mt-1 font-mono">
                Bảo toàn nguyên tố: Hiệu suất 1 lần qua tháp chỉ 15-20%, nhưng nhờ ngưng tụ tách sản phẩm và tuần hoàn khí dư, tổng hiệu suất nhà máy đạt trên 97%!
              </div>
            </div>
          </div>

          {/* Historical Significance Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-300">
              <strong className="text-amber-300">Ý nghĩa Lịch Sử & Nhân Loại:</strong> {currentProcess.historicalContextVI}
            </div>
          </div>
        </div>
      )}

      {/* Tab: TACTICAL (Hiệu Ứng Chiến Thuật Trong Game ELEMENTA) */}
      {activeTab === 'TACTICAL' && (
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-5 flex flex-col gap-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>HIỆU ỨNG LIÊN MINH CÔNG NGHIỆP TRONG ĐẤU BÀI & MOBA</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Khi triển khai các thẻ bài nguyên tố liên quan đến chuỗi tổng hợp khí ({currentProcess.reactants.map(r => r.formula).join(', ')} và {currentProcess.products.map(p => p.formula).join(', ')})
            </p>
          </div>

          {/* Active Tactical Status Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Zap className="w-6 h-6 animate-bounce" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Trạng Thái Kích Hoạt Hiện Tại
                </span>
                <h4 className="text-base font-bold text-white">
                  {simulationResult.tacticalGameplayBonus.nameVI}
                </h4>
                <p className="text-xs text-slate-300">
                  {simulationResult.tacticalGameplayBonus.descriptionVI}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4 shrink-0">
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Tăng Sức Mạnh</div>
                <div className="text-base font-mono font-bold text-amber-400">
                  x{simulationResult.tacticalGameplayBonus.powerMultiplier}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Hoàn Trả Mana</div>
                <div className="text-base font-mono font-bold text-cyan-400">
                  +{simulationResult.tacticalGameplayBonus.manaRefundPct}%
                </div>
              </div>
            </div>
          </div>

          {/* Catalog of 4 Industrial Synergies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-1.5">
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5" />
                Quá Áp Khí Động (P ≥ 180 atm)
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tăng 35% sát thương kỹ năng nguyên tố Khí trong 2 lượt tới.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-1.5">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Bùng Nổ Xúc Tác (k ≥ 70)
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Giảm 1 Mana cost cho toàn bộ thẻ bài phản ứng hóa học trên tay.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-1.5">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                Vòng Tuần Hoàn Khí (R ≥ 70%)
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Thu hồi 1 lá bài nguyên tố Khí vừa dùng từ Mộ bài về Tay bài.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustrialSynthesisVisualizer;
