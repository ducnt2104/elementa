import React, { useState, useMemo, useEffect } from 'react';
import {
  SFC_STANDARD_CATALOG,
  SfcStandard,
  simulateSfcChromatogram,
  CO2_CRITICAL_TEMP_CELSIUS,
  CO2_CRITICAL_PRESSURE_BAR,
  CO2_CRITICAL_DENSITY_G_CM3,
} from '../../domain/sfcEngine';
import { sound } from '../../audio/soundEngine';
import {
  Leaf,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Gauge,
  Thermometer,
  Wind,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FlaskConical,
  Award,
} from 'lucide-react';

interface SfcVisualizerProps {
  initialStandardId?: string;
}

export const SfcVisualizer: React.FC<SfcVisualizerProps> = ({
  initialStandardId = 'thalidomide_chiral_enantiomers',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'CHROMATOGRAM' | 'PHASE_DIAGRAM' | 'CHIRAL_MECHANISM' | 'GREEN_CURRICULUM'
  >('CHROMATOGRAM');

  const standard: SfcStandard = useMemo(() => {
    return (
      SFC_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || SFC_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  // Interactive chromatography control parameters
  const [modifierPercent, setModifierPercent] = useState<number>(standard.defaultModifierPercent);
  const [backPressureBar, setBackPressureBar] = useState<number>(standard.defaultBackPressureBar);
  const [ovenTempCelsius, setOvenTempCelsius] = useState<number>(standard.defaultOvenTempCelsius);
  const [flowRateMlMin, setFlowRateMlMin] = useState<number>(standard.defaultFlowRateMlMin);

  // Synchronize defaults on standard switch
  useEffect(() => {
    setModifierPercent(standard.defaultModifierPercent);
    setBackPressureBar(standard.defaultBackPressureBar);
    setOvenTempCelsius(standard.defaultOvenTempCelsius);
    setFlowRateMlMin(standard.defaultFlowRateMlMin);
  }, [standard]);

  // Compute simulation
  const simulation = useMemo(() => {
    return simulateSfcChromatogram(
      standard,
      modifierPercent,
      backPressureBar,
      ovenTempCelsius,
      flowRateMlMin
    );
  }, [standard, modifierPercent, backPressureBar, ovenTempCelsius, flowRateMlMin]);

  // Play audio on baseline resolution change
  useEffect(() => {
    if (simulation.isBaselineResolved) {
      sound.playChiralPeakDetectorPing?.(simulation.resolutionRs);
    }
  }, [simulation.isBaselineResolved, simulation.resolutionRs]);

  return (
    <div className="space-y-6 text-ivory">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-navy to-teal-950/80 p-5 rounded-2xl border border-emerald-500/30 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-400/30 text-emerald-400">
              <Leaf className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Green Analytical Chemistry
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  IUPAC Physical & Analytical
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                Sắc Ký Chất Lỏng Siêu Tới Hạn SFC & Tách Chiết Chiral (Supercritical CO₂)
              </h2>
              <p className="text-xs text-ivory-muted mt-0.5">
                Dung môi xanh CO₂ siêu tới hạn (T_c = 31.1°C, P_c = 73.8 bar) · Tách đối quang dược phẩm
                (R/S) · Loại bỏ 95% dung môi độc hại
              </p>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-emerald-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Độ Phân Giải R_s</div>
              <div
                className={`text-sm font-mono font-bold ${
                  simulation.isBaselineResolved ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {simulation.resolutionRs >= 1.5 ? '✓ ' : '⚠ '}
                {simulation.resolutionRs.toFixed(2)}
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-cyan-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Mật Độ CO₂ (ρ)</div>
              <div className="text-sm font-mono font-bold text-cyan-300">
                {simulation.densityCo2GPerCm3.toFixed(3)} g/cm³
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-navy-light/60 border border-teal-500/40 text-right">
              <div className="text-[10px] text-ivory-muted uppercase font-mono">Dung Môi Tiết Kiệm</div>
              <div className="text-sm font-mono font-bold text-teal-300">
                +{simulation.solventWasteSavedKgPerDay.toFixed(1)} kg/ngày
              </div>
            </div>
          </div>
        </div>

        {/* Standard Selector Pills */}
        <div className="mt-4 pt-4 border-t border-navy-light/40 flex flex-wrap gap-2">
          {SFC_STANDARD_CATALOG.map((std) => (
            <button
              key={std.id}
              onClick={() => {
                sound.playUiClick();
                setSelectedStandardId(std.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedStandardId === std.id
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/40 border border-emerald-400'
                  : 'bg-navy-light/40 text-ivory-muted hover:text-white hover:bg-navy-light/80 border border-navy-light/30'
              }`}
            >
              {std.vietnameseName.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Control Sliders Panel */}
      <div className="bg-navy/70 p-4 rounded-2xl border border-navy-light/40 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 1. Back-Pressure Regulator (BPR) */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" /> Áp Suất BPR:
            </span>
            <span className="font-mono font-bold text-cyan-300">{backPressureBar} bar</span>
          </div>
          <input
            type="range"
            min="80"
            max="250"
            step="5"
            value={backPressureBar}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBackPressureBar(val);
              sound.playSupercriticalFluidBprPressureHiss?.(val);
            }}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
            <span>80 bar (P_c = 73.8)</span>
            <span>250 bar</span>
          </div>
        </div>

        {/* 2. Oven Temperature */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Nhiệt Độ Cột:
            </span>
            <span className="font-mono font-bold text-rose-300">{ovenTempCelsius} °C</span>
          </div>
          <input
            type="range"
            min="30"
            max="65"
            step="1"
            value={ovenTempCelsius}
            onChange={(e) => setOvenTempCelsius(Number(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
            <span>30°C (T_c = 31.1)</span>
            <span>65°C</span>
          </div>
        </div>

        {/* 3. Modifier % */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-400" /> Chất Biến Tính ({standard.preferredModifier}):
            </span>
            <span className="font-mono font-bold text-emerald-300">{modifierPercent}%</span>
          </div>
          <input
            type="range"
            min="2"
            max="40"
            step="1"
            value={modifierPercent}
            onChange={(e) => setModifierPercent(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
            <span>2%</span>
            <span>40%</span>
          </div>
        </div>

        {/* 4. Flow Rate */}
        <div className="space-y-1.5 bg-navy-light/20 p-3 rounded-xl border border-navy-light/30">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-ivory-muted flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-amber-400" /> Tốc Độ Dòng:
            </span>
            <span className="font-mono font-bold text-amber-300">{flowRateMlMin.toFixed(1)} mL/phút</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="5.0"
            step="0.2"
            value={flowRateMlMin}
            onChange={(e) => setFlowRateMlMin(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-ivory-muted font-mono">
            <span>1.0 mL/min</span>
            <span>5.0 mL/min</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-light/40 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('CHROMATOGRAM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'CHROMATOGRAM'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-300" />
          <span>Sắc Ký Đồ & Đỉnh Enantiomer</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('PHASE_DIAGRAM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'PHASE_DIAGRAM'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Gauge className="w-4 h-4 text-cyan-300" />
          <span>Giản Đồ Pha CO₂ Siêu Tới Hạn (P-T)</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('CHIRAL_MECHANISM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'CHIRAL_MECHANISM'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-300" />
          <span>Cơ Chế Nhận Diện Chiral 3 Điểm</span>
        </button>
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('GREEN_CURRICULUM');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'GREEN_CURRICULUM'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-950/50'
              : 'bg-navy-light/30 text-ivory-muted hover:text-white'
          }`}
        >
          <Award className="w-4 h-4 text-teal-300" />
          <span>Hóa Học Xanh & GDPT 2018</span>
        </button>
      </div>

      {/* Sub-Tab 1: Chromatogram View */}
      {activeSubTab === 'CHROMATOGRAM' && (
        <div className="space-y-4">
          <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 relative">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Sắc Ký Đồ Siêu Tới Hạn (Thời Gian Lưu t_R & Tín Hiệu UV/mAU)
                </h3>
                <span className="text-[11px] font-mono text-ivory-muted">
                  Pha tĩnh: {standard.stationaryPhaseName} · Pha động: CO₂ + {modifierPercent}% {standard.preferredModifier}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-cyan-300">t_0 = {simulation.deadTimeT0Minutes.toFixed(2)} min</span>
                <span className="text-emerald-300">N = {simulation.theoreticalPlateCountN.toLocaleString()} đĩa</span>
                <span className="text-purple-300">α = {simulation.separationFactorAlpha.toFixed(2)}</span>
              </div>
            </div>

            {/* SVG Chromatogram Canvas */}
            <div className="w-full h-72 bg-obsidian/90 rounded-xl border border-navy-light/60 p-2 relative overflow-hidden">
              <svg viewBox="0 0 800 260" className="w-full h-full">
                {/* Grid Lines */}
                <line x1="50" y1="20" x2="50" y2="230" stroke="#334155" strokeDasharray="3 3" />
                <line x1="50" y1="230" x2="780" y2="230" stroke="#475569" strokeWidth="1.5" />
                <line x1="50" y1="20" x2="780" y2="20" stroke="#1e293b" strokeDasharray="2 2" />
                <line x1="50" y1="125" x2="780" y2="125" stroke="#1e293b" strokeDasharray="2 2" />

                {/* Dead Time Indicator Line */}
                {(() => {
                  const maxT = simulation.chromatogramPoints[simulation.chromatogramPoints.length - 1]?.timeMinutes || 8;
                  const xT0 = 50 + (simulation.deadTimeT0Minutes / maxT) * 730;
                  return (
                    <g>
                      <line x1={xT0} y1="30" x2={xT0} y2="230" stroke="#06b6d4" strokeDasharray="4 2" strokeWidth="1" />
                      <text x={xT0 + 4} y="42" fill="#06b6d4" fontSize="9" fontFamily="monospace">
                        t₀ ({simulation.deadTimeT0Minutes}m)
                      </text>
                    </g>
                  );
                })()}

                {/* Chromatogram Absorbance Curve */}
                {(() => {
                  const pts = simulation.chromatogramPoints;
                  if (pts.length < 2) return null;
                  const maxT = pts[pts.length - 1].timeMinutes;
                  const maxMau = Math.max(10, ...pts.map((p) => p.absorbanceMau));

                  const pathD = pts
                    .map((p, idx) => {
                      const x = 50 + (p.timeMinutes / maxT) * 730;
                      const y = 230 - (p.absorbanceMau / maxMau) * 190;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ');

                  return (
                    <g>
                      <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" />
                      {/* Gradient Fill under Curve */}
                      <path
                        d={`${pathD} L 780 230 L 50 230 Z`}
                        fill="url(#sfcCurveGradient)"
                        opacity="0.25"
                      />
                    </g>
                  );
                })()}

                {/* Peak Labels & Arrows */}
                {(() => {
                  const pts = simulation.chromatogramPoints;
                  const maxT = pts[pts.length - 1]?.timeMinutes || 8;
                  const maxMau = Math.max(10, ...pts.map((p) => p.absorbanceMau));

                  return simulation.peaks.map((pk, idx) => {
                    const x = 50 + (pk.retentionTimeMinutes / maxT) * 730;
                    const y = 230 - (pk.peakHeightMau / maxMau) * 190;
                    const isLeft = idx % 2 === 0;

                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="3.5" fill="#34d399" />
                        <line x1={x} y1={y - 4} x2={x} y2={y - 20} stroke="#a7f3d0" strokeWidth="1" />
                        <rect
                          x={x - 45}
                          y={y - 36}
                          width="90"
                          height="14"
                          rx="3"
                          fill="#064e3b"
                          stroke="#10b981"
                          strokeWidth="0.8"
                        />
                        <text
                          x={x}
                          y={y - 26}
                          fill="#ecfdf5"
                          fontSize="8.5"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {pk.analyteName.split('(')[0]} ({pk.retentionTimeMinutes}m)
                        </text>
                      </g>
                    );
                  });
                })()}

                {/* SVG Definitions */}
                <defs>
                  <linearGradient id="sfcCurveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Peak Quantitative Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-navy-light text-ivory-muted font-mono">
                    <th className="py-2 px-3">Cấu hình / Đối quang</th>
                    <th className="py-2 px-3">Thời gian lưu t_R (min)</th>
                    <th className="py-2 px-3">Hệ số dung lượng k'</th>
                    <th className="py-2 px-3">Chiều rộng w_0.5 (min)</th>
                    <th className="py-2 px-3">Diện tích %</th>
                    <th className="py-2 px-3">Vai trò dược lý / Độc tính</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/40 font-mono">
                  {simulation.peaks.map((p, idx) => (
                    <tr key={idx} className="hover:bg-navy-light/30">
                      <td className="py-2 px-3 font-bold text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        {p.analyteName}
                      </td>
                      <td className="py-2 px-3 text-cyan-300 font-bold">{p.retentionTimeMinutes.toFixed(2)}</td>
                      <td className="py-2 px-3 text-teal-300">{p.retentionFactorK.toFixed(2)}</td>
                      <td className="py-2 px-3 text-ivory-muted">{p.peakWidthAtHalfMaxMinutes.toFixed(3)}</td>
                      <td className="py-2 px-3 text-amber-300 font-bold">{p.areaPercent.toFixed(1)}%</td>
                      <td className="py-2 px-3 font-sans text-xs text-ivory-muted">{p.pharmacologicalRole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: CO2 Supercritical Phase Diagram View */}
      {activeSubTab === 'PHASE_DIAGRAM' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                Giản Đồ Pha P-T & Vùng Trạng Thái Siêu Tới Hạn (Supercritical Region)
              </h3>
              <p className="text-xs text-ivory-muted mt-0.5">
                Vượt qua điểm tới hạn (Critical Point: 31.1°C, 73.8 bar), chất lỏng và chất khí hợp nhất thành
                một pha duy nhất không còn ranh giới sức căng bề mặt.
              </p>
            </div>
            <div className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/50 rounded-xl text-xs font-mono text-cyan-300">
              Điểm hoạt động hiện tại: {backPressureBar} bar, {ovenTempCelsius}°C (ρ = {simulation.densityCo2GPerCm3} g/cm³)
            </div>
          </div>

          {/* SVG Phase Diagram */}
          <div className="w-full h-72 bg-obsidian/90 rounded-xl border border-navy-light/60 p-3 relative overflow-hidden">
            <svg viewBox="0 0 800 260" className="w-full h-full">
              {/* Regions Shading */}
              {/* Solid region */}
              <polygon points="50,230 50,20 180,20 220,175" fill="#1e1b4b" opacity="0.6" />
              {/* Liquid region */}
              <polygon points="180,20 220,175 420,130 420,20" fill="#0f766e" opacity="0.3" />
              {/* Gas region */}
              <polygon points="220,175 420,130 780,130 780,230 50,230" fill="#78350f" opacity="0.2" />
              {/* Supercritical Fluid Region (T > Tc, P > Pc) */}
              <polygon points="420,20 780,20 780,130 420,130" fill="#065f46" opacity="0.5" />

              {/* Boundary Lines */}
              {/* Solid-Gas Sublimation line */}
              <path d="M 50 230 Q 140 215 220 175" stroke="#818cf8" strokeWidth="2" fill="none" />
              {/* Solid-Liquid Melting line */}
              <path d="M 220 175 L 180 20" stroke="#38bdf8" strokeWidth="2" fill="none" />
              {/* Liquid-Gas Boiling curve ending at Critical Point */}
              <path d="M 220 175 Q 320 150 420 130" stroke="#f59e0b" strokeWidth="2.5" fill="none" />

              {/* Dotted Lines to Axis for Critical Point */}
              <line x1="420" y1="130" x2="420" y2="230" stroke="#6ee7b7" strokeDasharray="3 3" />
              <line x1="50" y1="130" x2="420" y2="130" stroke="#6ee7b7" strokeDasharray="3 3" />

              {/* Triple Point Marker */}
              <circle cx="220" cy="175" r="4.5" fill="#c084fc" />
              <text x="230" y="180" fill="#e9d5ff" fontSize="9" fontFamily="monospace">
                Triple Point (-56.6°C, 5.18 bar)
              </text>

              {/* Critical Point Marker */}
              <circle cx="420" cy="130" r="6" fill="#10b981" stroke="#ecfdf5" strokeWidth="1.5" />
              <text x="432" y="125" fill="#34d399" fontSize="10.5" fontFamily="sans-serif" fontWeight="bold">
                Critical Point (31.1°C, 73.8 bar)
              </text>

              {/* Supercritical Region Watermark */}
              <text x="560" y="70" fill="#34d399" opacity="0.8" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
                SUPERCRITICAL CO₂
              </text>
              <text x="560" y="90" fill="#a7f3d0" opacity="0.7" fontSize="10" fontFamily="monospace">
                Độ nhớt khí thấp + Độ hòa tan lỏng cao
              </text>

              {/* Current Operating Coordinate Marker */}
              {(() => {
                // Map Temp 0 - 80°C to x (50 - 780), Pressure 0 - 250 bar to y (230 - 20)
                const normX = Math.max(0, Math.min(1, ovenTempCelsius / 80));
                const normY = Math.max(0, Math.min(1, backPressureBar / 250));
                const curX = 50 + normX * 730;
                const curY = 230 - normY * 210;

                return (
                  <g>
                    <circle cx={curX} cy={curY} r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" className="animate-ping" opacity="0.75" />
                    <circle cx={curX} cy={curY} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                    <rect x={curX - 50} y={curY - 26} width="100" height="15" rx="3" fill="#7f1d1d" stroke="#f87171" strokeWidth="0.8" />
                    <text x={curX} y={curY - 16} fill="#fef2f2" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      {backPressureBar} bar | {ovenTempCelsius}°C
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Chiral Mechanism View */}
      {activeSubTab === 'CHIRAL_MECHANISM' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Mô Hình Tương Tác 3 Điểm Dalgliesh & Pha Tĩnh Bất Đối Amylose/Cellulose
            </h3>
            <p className="text-xs text-ivory-muted mt-0.5">
              Phân biệt 2 đối quang (R) và (S) đòi hỏi tối thiểu 3 điểm tiếp xúc không gian lập thể
              (Stereochemical Three-Point Interaction) giữa phân tử và rãnh xoắn polysaccharide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Card: (R)-enantiomer fit */}
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">
                  {standard.peaks[0]?.analyteName || 'Đối Quang Khớp Chặt'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-200">
                  3/3 Điểm Tương Tác Khớp
                </span>
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Tâm chiral của đối quang khớp hoàn hảo với 3 vị trí trên pha tĩnh:
                <br />1. Liên kết hydro giữa nhóm C=O carbamate và proton NH/OH.
                <br />2. Tương tác xếp chồng π-π giữa vòng thơm phenyl và nhân thơm chất phân tích.
                <br />3. Tương tác không gian kỵ nước (inclusion complex) vừa khít hốc rãnh xoắn.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 font-bold">
                → Bị lưu giữ lâu hơn trên cột (k' cao hơn)
              </div>
            </div>

            {/* Right Card: (S)-enantiomer mismatch */}
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-300">
                  {standard.peaks[1]?.analyteName || 'Đối Quang Thoát Nhanh'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-500/20 text-teal-200">
                  Chỉ 2/3 Điểm Tương Tác
                </span>
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                Do cấu hình đối ảnh trong không gian (enantiomeric reflection), một nhóm chức bị hướng ra
                ngoài hoặc gặp lực cản trở không gian (steric clash):
                <br />• Không thể tạo đồng thời liên kết hydro và xếp chồng nhân thơm.
                <br />• Ái lực với pha tĩnh thấp hơn, phân tử bị dòng CO₂ siêu tới hạn cuốn trôi nhanh hơn.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 font-bold">
                → Rửa giải sớm hơn (k' thấp hơn, t_R ngắn)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Green Analytical Chemistry & Curriculum Notes */}
      {activeSubTab === 'GREEN_CURRICULUM' && (
        <div className="bg-navy/80 p-5 rounded-2xl border border-navy-light/40 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/20 rounded-xl border border-teal-500/30 text-teal-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Ý Nghĩa Dược Học, Tiêu Chuẩn Hóa Học Xanh & Chương Trình GDPT 2018
              </h3>
              <p className="text-xs text-ivory-muted">
                12 Nguyên tắc Hóa học Xanh (Paul Anastas & John Warner) và bài học chirality trong SGK Hóa học 12.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 12 Nguyên Tắc Hóa Xanh
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Nguyên tắc 5 (Dung môi an toàn hơn) & Nguyên tắc 7 (Nguyên liệu tái tạo): CO₂ thu hồi từ khí
                thải công nghiệp, không cháy nổ, không độc hại và tự bay hơi hoàn toàn sau khi hạ áp.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> An Toàn Dược Phẩm FDA
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                Quy định FDA 1992: Mọi thuốc có tâm chiral phải được thử nghiệm riêng biệt độc lập từng enantiomer.
                SFC cho phép định lượng enantiomeric excess (ee%) với giới hạn phát hiện dưới 0.1%.
              </p>
            </div>

            <div className="p-3 bg-navy-light/30 rounded-xl border border-navy-light/40 space-y-1">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> GDPT 2018 Hóa Học 12
              </div>
              <p className="text-[11px] text-ivory-muted leading-relaxed">
                {standard.curriculumNotes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
