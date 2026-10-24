// src/components/visualizations/StoppedFlowVisualizer.tsx
// Milestone 62: Stopped-Flow Pre-Steady-State Chemical Kinetics & Flash Photolysis Visualizer
// Standards: Nobel Prize in Chemistry 1967 (Manfred Eigen, Ronald Norrish, George Porter) & Chance-Gibson Rapid Mixing Dead-Time Standards
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Tốc độ phản ứng hóa học, hằng số tốc độ k, năng lượng hoạt hóa; Sinh học 10: Động học enzym, trung tâm hoạt động protease)

import React, { useState, useMemo } from 'react';
import {
  STOPPED_FLOW_CATALOG,
  StoppedFlowSpecimenStandard,
  simulateStoppedFlowKinetics
} from '../../domain/stoppedFlowEngine';
import { sound } from '../../audio/soundEngine';
import {
  Timer,
  Activity,
  Zap,
  Award,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  Atom,
  RotateCcw,
  Flame,
  Layers,
  FileText,
  Play,
  Scissors
} from 'lucide-react';

export interface StoppedFlowVisualizerProps {
  initialSpecimenId?: string;
}

export const StoppedFlowVisualizer: React.FC<StoppedFlowVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'chymotrypsin_pnpa'
  );
  const [deadTimeMs, setDeadTimeMs] = useState<number>(1.0);
  const [substrateConcMicroM, setSubstrateConcMicroM] = useState<number>(250.0);
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25.0);
  const [viewMode, setViewMode] = useState<'stopped_flow_progress' | 'k_obs_concentration_plot' | 'residual_analysis' | 'chemical_mechanism_scheme'>('stopped_flow_progress');
  const [activeTab, setActiveTab] = useState<'nobel_pioneers' | 'burst_kinetics_theory' | 'dead_time_physics' | 'curriculum_gdpt'>('nobel_pioneers');

  const simResult = useMemo(() => {
    return simulateStoppedFlowKinetics(
      selectedSpecimenId,
      deadTimeMs,
      substrateConcMicroM,
      temperatureCelsius
    );
  }, [selectedSpecimenId, deadTimeMs, substrateConcMicroM, temperatureCelsius]);

  const {
    specimen,
    kObsPerSec,
    burstAmplitudeDeltaA,
    steadyStateRatePerSec,
    apparentKdMicroM,
    dataPoints,
    concentrationSeries
  } = simResult;

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    const chosen = STOPPED_FLOW_CATALOG.find((s) => s.id === id);
    if (chosen) {
      setDeadTimeMs(chosen.defaultDeadTimeMs);
      setSubstrateConcMicroM(chosen.substrateConcentrationMicroM || 100.0);
    }
    sound.playKineticBurstDetectionTone();
  };

  const handleTriggerPlunge = () => {
    sound.playStoppedFlowPistonPlunge();
    setTimeout(() => {
      sound.playKineticBurstDetectionTone();
    }, 240);
  };

  const handleDeadTimeChange = (val: number) => {
    setDeadTimeMs(val);
    sound.playUiClick();
  };

  const handleSubstrateChange = (val: number) => {
    setSubstrateConcMicroM(val);
    sound.playUiClick();
  };

  const handleTempChange = (val: number) => {
    setTemperatureCelsius(val);
    sound.playUiClick();
  };

  // SVG Coordinates for Stopped-Flow Progress Curve
  const svgW = 600;
  const svgH = 280;
  const pad = { top: 30, right: 30, bottom: 45, left: 60 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  const tMax = specimen.timeWindowMs;
  const maxAbs = useMemo(() => {
    let m = 0.1;
    dataPoints.forEach((pt) => {
      if (pt.rawAbsorbance > m) m = pt.rawAbsorbance;
      if (pt.fittedAbsorbance > m) m = pt.fittedAbsorbance;
    });
    return m * 1.15;
  }, [dataPoints]);

  const toProgX = (t: number) => pad.left + (t / tMax) * plotW;
  const toProgY = (abs: number) => pad.top + plotH - (abs / maxAbs) * plotH;

  const fittedCurvePath = useMemo(() => {
    return dataPoints.reduce((acc, pt, idx) => {
      const x = toProgX(pt.timeMs);
      const y = toProgY(pt.fittedAbsorbance);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [dataPoints, maxAbs]);

  // Coordinates for k_obs vs [Substrate] diagnostic plot
  const maxConcPlot = concentrationSeries.length > 0 ? concentrationSeries[concentrationSeries.length - 1].substrateConcentrationMicroM * 1.1 : 1000;
  const maxKObsPlot = concentrationSeries.length > 0 ? concentrationSeries[concentrationSeries.length - 1].kObsPerSec * 1.25 : 50;

  const toKobsX = (conc: number) => pad.left + (conc / maxConcPlot) * plotW;
  const toKobsY = (k: number) => pad.top + plotH - (k / maxKObsPlot) * plotH;

  const kObsLinePath = useMemo(() => {
    return concentrationSeries.reduce((acc, pt, idx) => {
      const x = toKobsX(pt.substrateConcentrationMicroM);
      const y = toKobsY(pt.kObsPerSec);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [concentrationSeries, maxConcPlot, maxKObsPlot]);

  // Coordinates for Residuals Plot (-0.015 to +0.015)
  const toResY = (res: number) => pad.top + plotH / 2 - (res / 0.012) * (plotH / 2);

  const halfLifeMs = kObsPerSec > 0 ? ((Math.LN2 / kObsPerSec) * 1000).toFixed(1) : '∞';

  return (
    <div className="bg-obsidian/90 border border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-6 text-ivory">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/50 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Nobel Hóa Học 1967 (Eigen, Norrish & Porter - Phản Ứng Siêu Tốc)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 flex items-center gap-1.5 shadow-sm">
              <Timer className="w-3.5 h-3.5 text-cyan-400" />
              Thời Gian Chết Instrument t_dead: {deadTimeMs.toFixed(1)} ms
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1.5 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
            Động Học Hóa Học Tiền Ổn Định (Stopped-Flow) & Quang Phân Laser (Flash Photolysis)
          </h2>
          <p className="text-xs sm:text-sm text-ivory-muted mt-1">
            Ghi nhận biến đổi quang phổ mili-giây, phân tách pha nổ ban đầu (burst phase) và trạng thái dừng (steady-state).
          </p>
        </div>

        {/* Trigger Piston Plunge Button */}
        <button
          onClick={handleTriggerPlunge}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white border border-amber-400/50 shadow-lg shadow-amber-900/40 hover:scale-105 active:scale-95"
        >
          <Play className="w-4 h-4 text-white fill-white" />
          <span>Bơm Trộn Nhanh Stopped-Flow ⚡</span>
        </button>
      </div>

      {/* Reaction Standards Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Hệ Thống Phản Ứng Nhanh Chuẩn (Rapid Pre-Steady-State Systems):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {STOPPED_FLOW_CATALOG.map((item) => {
            const isSelected = item.id === selectedSpecimenId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectSpecimen(item.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/70 border-amber-400 text-white shadow-lg shadow-amber-950/50 ring-1 ring-amber-400'
                    : 'bg-navy/40 border-navy-light/60 text-ivory-muted hover:text-ivory hover:border-amber-500/40 hover:bg-navy/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-amber-400 font-bold">{item.reactionType.replace('_', ' ')}</span>
                    <span className="text-ivory-muted">λ={item.probeWavelengthNm} nm</span>
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{item.vietnameseName.split('(')[0]}</div>
                  <div className="text-[10px] text-ivory-muted line-clamp-1 mt-0.5">{item.name}</div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-amber-300">Cửa sổ: {item.timeWindowMs} ms</span>
                  <span className="text-cyan-300">t_dead: {item.defaultDeadTimeMs} ms</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls & Parameters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-navy/60 border border-amber-500/30 rounded-xl p-4">
        {/* Slider 1: Substrate / Reactant Concentration */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <Atom className="w-3.5 h-3.5 text-amber-400" />
              Nồng Độ Cơ Chất / Phối Tử [S]:
            </span>
            <span className="font-mono text-amber-300 font-bold">
              {substrateConcMicroM.toFixed(1)} µM
            </span>
          </div>
          <input
            type="range"
            min="10.0"
            max="1500.0"
            step="10.0"
            value={substrateConcMicroM}
            onChange={(e) => handleSubstrateChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>10 µM (Thấp)</span>
            <span>250 µM (Chuẩn)</span>
            <span>1500 µM (Bão hòa)</span>
          </div>
        </div>

        {/* Slider 2: Instrument Dead Time t_dead */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-cyan-400" />
              Thời Gian Chết Thiết Bị t_dead:
            </span>
            <span className="font-mono text-cyan-300 font-bold">
              {deadTimeMs.toFixed(2)} ms
            </span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={deadTimeMs}
            onChange={(e) => handleDeadTimeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>0.2 ms (Flash Laser)</span>
            <span>1.0 ms (Micro-mixer)</span>
            <span>3.0 ms (Bơm truyền thống)</span>
          </div>
        </div>

        {/* Slider 3: Reaction Temperature T */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Nhiệt Độ Phản Ứng (Arrhenius Q₁₀):
            </span>
            <span className="font-mono text-rose-300 font-bold">
              {temperatureCelsius.toFixed(1)} °C
            </span>
          </div>
          <input
            type="range"
            min="10.0"
            max="45.0"
            step="1.0"
            value={temperatureCelsius}
            onChange={(e) => handleTempChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-rose-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>10 °C (Lạnh)</span>
            <span>25 °C (Tiêu chuẩn)</span>
            <span>37 °C (Sinh lý)</span>
          </div>
        </div>
      </div>

      {/* Live Physical Metrics Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy/50 border border-amber-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Hằng Số Tốc Độ Biểu Kiến k_obs</span>
          <div className="text-lg font-black font-mono text-amber-300 mt-1">
            {kObsPerSec} s⁻¹
          </div>
          <span className="text-[10px] text-ivory-muted">Thời gian bán hủy t₁/₂ = {halfLifeMs} ms</span>
        </div>

        <div className="bg-navy/50 border border-cyan-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Biên Độ Nổ Pha Đầu (Burst π)</span>
          <div className="text-lg font-black font-mono text-cyan-300 mt-1">
            {burstAmplitudeDeltaA > 0 ? `+${burstAmplitudeDeltaA} AU` : '0 AU'}
          </div>
          <span className="text-[10px] text-ivory-muted">Tương đương [E]₀ giải phóng P₁</span>
        </div>

        <div className="bg-navy/50 border border-emerald-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Tốc Độ Trạng Thái Dừng v_ss</span>
          <div className="text-lg font-black font-mono text-emerald-300 mt-1">
            {steadyStateRatePerSec > 0 ? `${(steadyStateRatePerSec * 1000).toFixed(2)} × 10⁻³ s⁻¹` : 'Hoàn thành 1 lần'}
          </div>
          <span className="text-[10px] text-ivory-muted">Giai đoạn khử acyl k₃ giới hạn</span>
        </div>

        <div className="bg-navy/50 border border-purple-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Hằng Số Phân Ly Ái Lực K_D</span>
          <div className="text-lg font-black font-mono text-purple-300 mt-1">
            {apparentKdMicroM} µM
          </div>
          <span className="text-[10px] text-ivory-muted">K_D = k_off / k_on (Cân bằng)</span>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-light/40 pb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setViewMode('stopped_flow_progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'stopped_flow_progress'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-amber-300" />
            <span>Đường Động Học Stopped-Flow A(t)</span>
          </button>
          <button
            onClick={() => setViewMode('k_obs_concentration_plot')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'k_obs_concentration_plot'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-300" />
            <span>Đồ Thị Chuẩn k_obs vs [Cơ Chất]</span>
          </button>
          <button
            onClick={() => setViewMode('residual_analysis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'residual_analysis'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-300" />
            <span>Phân Tích Phần Dư Mô Hình (Residuals)</span>
          </button>
          <button
            onClick={() => setViewMode('chemical_mechanism_scheme')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'chemical_mechanism_scheme'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-300" />
            <span>Cơ Chế Phản Ứng & Bậc Động Học</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Display Area */}
      <div className="bg-obsidian/95 border border-navy-light/60 rounded-xl p-4 flex flex-col items-center justify-center min-h-[320px]">
        {/* VIEW 1: TIME COURSE A(t) WITH SHADED DEAD-TIME REGION */}
        {viewMode === 'stopped_flow_progress' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <strong className="text-white">Độ hấp thụ A{specimen.probeWavelengthNm} theo thời gian (ms)</strong>
                <span className="text-ivory-muted">|</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/40 inline-block"></span>
                <span>Vùng thời gian chết (t &lt; {deadTimeMs} ms)</span>
              </span>
              <span className="font-mono text-[11px] text-amber-300">
                k_obs = {kObsPerSec} s⁻¹ | t₁/₂ = {halfLifeMs} ms
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Shaded Dead Time Box */}
              <rect
                x={pad.left}
                y={pad.top}
                width={Math.min(plotW, (deadTimeMs / tMax) * plotW)}
                height={plotH}
                fill="#f43f5e"
                opacity="0.25"
              />
              <line
                x1={toProgX(deadTimeMs)}
                y1={pad.top}
                x2={toProgX(deadTimeMs)}
                y2={pad.top + plotH}
                stroke="#f43f5e"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text x={toProgX(deadTimeMs) + 4} y={pad.top + 16} fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace">
                t_dead={deadTimeMs}ms
              </text>

              {/* Time grid lines */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                const x = pad.left + frac * plotW;
                const timeVal = (frac * tMax).toFixed(0);
                return (
                  <g key={idx}>
                    <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#1e293b" strokeDasharray="3 3" />
                    <text x={x} y={pad.top + plotH + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {timeVal} ms
                    </text>
                  </g>
                );
              })}

              {/* Raw optical scatter points */}
              {dataPoints.filter((_, idx) => idx % 3 === 0).map((pt, idx) => (
                <circle
                  key={idx}
                  cx={toProgX(pt.timeMs)}
                  cy={toProgY(pt.rawAbsorbance)}
                  r={pt.isDeadTimeRegion ? '1.5' : '2.2'}
                  fill={pt.isDeadTimeRegion ? '#94a3b8' : '#fbbf24'}
                  opacity={pt.isDeadTimeRegion ? '0.4' : '0.85'}
                />
              ))}

              {/* Fitted Kinetic Curve */}
              <path
                d={fittedCurvePath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Axes labels */}
              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Thời gian phản ứng t (mili-giây - ms)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Độ hấp thụ quang học A ({specimen.probeWavelengthNm} nm)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 2: k_obs vs [SUBSTRATE] PSEUDO-FIRST-ORDER DIAGNOSTIC PLOT */}
        {viewMode === 'k_obs_concentration_plot' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2 text-cyan-300">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <strong className="text-white">Đồ Thị Tuyến Tính: k_obs = k_on · [S] + k_off</strong>
              </span>
              <span className="font-mono text-[11px] text-cyan-300">
                Độ dốc k_on = {specimen.kOnOrK2.toExponential(2)} M⁻¹s⁻¹ | Tung độ k_off = {specimen.kOffOrK3} s⁻¹
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Grid */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                const x = pad.left + frac * plotW;
                const concVal = (frac * maxConcPlot).toFixed(0);
                return (
                  <g key={idx}>
                    <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#1e293b" strokeDasharray="3 3" />
                    <text x={x} y={pad.top + plotH + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {concVal} µM
                    </text>
                  </g>
                );
              })}

              {/* k_obs fitted line */}
              <path d={kObsLinePath} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

              {/* Concentration series discrete points */}
              {concentrationSeries.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={toKobsX(pt.substrateConcentrationMicroM)}
                  cy={toKobsY(pt.kObsPerSec)}
                  r="5"
                  fill="#06b6d4"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}

              {/* Current operating point marker */}
              <circle
                cx={toKobsX(substrateConcMicroM)}
                cy={toKobsY(kObsPerSec)}
                r="7"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="2.5"
                className="animate-pulse"
              />
              <text
                x={toKobsX(substrateConcMicroM) + 10}
                y={toKobsY(kObsPerSec) - 8}
                fill="#f59e0b"
                fontSize="10"
                fontWeight="bold"
                fontFamily="monospace"
              >
                Hiện tại: {substrateConcMicroM.toFixed(0)} µM (k={kObsPerSec}s⁻¹)
              </text>

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Nồng độ cơ chất [S] (µM)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Hằng số tốc độ quan sát k_obs (s⁻¹)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 3: OPTICAL RESIDUALS ANALYSIS */}
        {viewMode === 'residual_analysis' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2 text-rose-300">
                <CheckCircle2 className="w-4 h-4 text-rose-400" />
                <strong className="text-white">Phần Dư Quang Học (Residuals = Raw - Fit)</strong>
              </span>
              <span className="font-mono text-[11px] text-emerald-300">
                Phân bố ngẫu nhiên chuẩn Gauss: Chi² &lt; 1.05 × 10⁻⁴ (Mô hình hội tụ chuẩn)
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Zero residual horizontal line */}
              <line
                x1={pad.left}
                y1={toResY(0)}
                x2={pad.left + plotW}
                y2={toResY(0)}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Residual data points */}
              {dataPoints.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={toProgX(pt.timeMs)}
                  cy={toResY(pt.residual)}
                  r="2"
                  fill={Math.abs(pt.residual) < 0.002 ? '#10b981' : '#f43f5e'}
                  opacity="0.8"
                />
              ))}

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Thời gian t (ms)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Phần dư ΔA (AU)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 4: CHEMICAL MECHANISM SCHEME */}
        {viewMode === 'chemical_mechanism_scheme' && (
          <div className="w-full p-4 space-y-4 text-xs font-mono">
            <div className="text-amber-300 font-bold text-sm">
              Sơ Đồ Cơ Chế Động Học & Các Bước Trung Gian Của Phản Ứng:
            </div>
            <div className="bg-navy/70 p-4 rounded-xl border border-amber-500/30 space-y-3 leading-relaxed">
              <div className="text-white text-sm font-bold flex items-center gap-2">
                <Scissors className="w-4 h-4 text-amber-400" />
                <span>{specimen.vietnameseName}</span>
              </div>
              <p className="text-ivory-muted text-xs leading-normal">
                {specimen.chemicalDescription}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                <div className="bg-obsidian/60 p-2.5 rounded-lg border border-navy-light">
                  <span className="text-amber-400 font-bold">Hằng số tạo phức k_on / k₂:</span>
                  <div className="text-white text-xs mt-0.5">{specimen.kOnOrK2} {specimen.reactionType === 'BURST_KINETICS' ? 's⁻¹ (Acylation)' : 'M⁻¹ s⁻¹'}</div>
                </div>
                <div className="bg-obsidian/60 p-2.5 rounded-lg border border-navy-light">
                  <span className="text-cyan-400 font-bold">Hằng số phân ly k_off / k₃:</span>
                  <div className="text-white text-xs mt-0.5">{specimen.kOffOrK3} s⁻¹ (Rate-limiting step)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chemical Significance Callout */}
      <div className="bg-navy/40 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <div className="font-bold text-white flex items-center gap-2">
            <span>Ý Nghĩa Hóa Lý Của Hệ Phản Ứng: {specimen.vietnameseName}</span>
          </div>
          <p className="text-ivory-muted leading-relaxed">
            {specimen.chemicalDescription}
          </p>
          <div className="text-[11px] font-mono text-amber-300 mt-1">
            {specimen.curriculumNotes}
          </div>
        </div>
      </div>

      {/* Educational Pedagogy Tabs */}
      <div className="space-y-3 pt-2 border-t border-navy-light/50">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('nobel_pioneers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'nobel_pioneers'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Các Nhà Tiên Phong Nobel Động Học Nhanh</span>
          </button>
          <button
            onClick={() => setActiveTab('burst_kinetics_theory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'burst_kinetics_theory'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-300" />
            <span>Toán Học Động Học Pha Nổ (Burst Kinetics)</span>
          </button>
          <button
            onClick={() => setActiveTab('dead_time_physics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'dead_time_physics'
                ? 'bg-rose-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Timer className="w-3.5 h-3.5 text-rose-300" />
            <span>Vật Lý Thời Gian Chết t_dead Thiết Bị</span>
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-300" />
            <span>Liên Hệ Chương Trình GDPT 2018</span>
          </button>
        </div>

        <div className="bg-navy/30 border border-navy-light/40 rounded-xl p-4 text-xs leading-relaxed text-ivory-muted">
          {activeTab === 'nobel_pioneers' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Giải Nobel Hóa Học 1967: Đột Phá Đo Phản Ứng Siêu Tốc
              </h4>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <strong className="text-amber-300">Manfred Eigen (Nobel Hóa Học 1967):</strong> Phát minh phương pháp nhiễu loạn cân bằng hóa học (Temperature-Jump / T-Jump và Pressure-Jump), cho phép đo các phản ứng trao đổi proton nhanh đến nanogiây.
                </li>
                <li>
                  <strong className="text-cyan-300">Ronald Norrish & George Porter (Nobel Hóa Học 1967):</strong> Phát minh kỹ thuật quang phân hủy chớp nhoáng (Flash Photolysis), dùng xung bức xạ năng lượng cao để kích hoạt và bắt giữ các gốc tự do và trạng thái kích thích tồn tại trong micro-giây.
                </li>
                <li>
                  <strong className="text-emerald-300">Britton Chance & Quentin Gibson:</strong> Hoàn thiện thiết bị Stopped-Flow hiện đại với hệ thống xi lanh dừng cơ điện, mở ra kỷ nguyên nghiên cứu động học tiền ổn định của enzyme và hemoglobin.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'burst_kinetics_theory' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                Phương Trình Hartley-Kilby Về Pha Nổ Tiền Ổn Định
              </h4>
              <p>
                Đối với enzym có cơ chế hai bước qua trung gian acyl-enzym:
              </p>
              <div className="bg-obsidian/60 p-3 rounded-lg font-mono text-[11px] text-cyan-300 space-y-1 border border-cyan-500/30">
                <div>E + S ⇌ ES —k₂→ E-Acyl + P₁ (nhanh) —k₃→ E + P₂ (chậm, giới hạn tốc độ)</div>
                <div>[P₁](t) = π · (1 - exp(-k_obs · t)) + v_ss · t</div>
              </div>
              <p>
                Khi nồng độ cơ chất bão hòa ([S] ≫ K_S) và k₂ ≫ k₃, biên độ pha nổ <span className="font-mono text-amber-300">π ≈ [E]₀</span> tương đương đúng số mol trung tâm hoạt động hoạt động của enzym, cho phép chuẩn độ chính xác nồng độ enzym nguyên vẹn mà không cần biết độ tinh khiết mẫu!
              </p>
            </div>
          )}

          {activeTab === 'dead_time_physics' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Timer className="w-4 h-4 text-rose-400" />
                Vật Lý & Giới Hạn Của Thời Gian Chết Thiết Bị (Instrument Dead Time)
              </h4>
              <p>
                Thời gian chết thiết bị t_dead là khoảng thời gian từ khi hai dòng dung dịch gặp nhau trong buồng trộn vi lưu (micro-mixer) đến khi dung dịch đến trung tâm chùm tia quang học trong cuvet:
              </p>
              <div className="bg-obsidian/60 p-3 rounded-lg font-mono text-[11px] text-rose-300 space-y-1 border border-rose-500/30">
                <div>t_dead = V_dead / u_flow = (Thể tích ống dẫn) / (Lưu lượng dòng chảy)</div>
              </div>
              <p>
                Các thiết bị Stopped-Flow hiện đại đạt t_dead từ 0.5 đến 1.2 ms. Nếu phản ứng có t₁/₂ &lt; t_dead, tín hiệu sẽ hoàn thành gần hết trước khi bắt đầu đo; đối với các phản ứng cực nhanh cỡ pico-giây, kỹ thuật quang phân laser (Flash Photolysis) được sử dụng để vượt qua giới hạn dòng chảy thủy động học.
              </p>
            </div>
          )}

          {activeTab === 'curriculum_gdpt' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                Tích Hợp Sâu Sắc Với Chương Trình GDPT 2018 Việt Nam
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong className="text-purple-300">Hóa Học 10:</strong> Chương 6: Tốc độ phản ứng hóa học. Khái niệm tốc độ phản ứng trung bình và tức thời, biểu thức định luật tác dụng khối lượng, hằng số tốc độ k, ảnh hưởng của nồng độ, nhiệt độ và chất xúc tác.
                </li>
                <li>
                  <strong className="text-amber-300">Hóa Học 12:</strong> Este - Lipit: Phản ứng thủy phân este xúc tác bazo và enzym protease sinh học; Độc tính của khí CO và khả năng cạnh tranh liên kết với phức chất heme của hemoglobin/myoglobin.
                </li>
                <li>
                  <strong className="text-cyan-300">Sinh Học 10:</strong> Cơ chế xúc tác của enzym, tương tác đặc hiệu giữa cơ chất và trung tâm hoạt động theo mô hình cảm ứng (induced fit).
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
