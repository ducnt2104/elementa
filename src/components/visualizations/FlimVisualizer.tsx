import React, { useState, useMemo, useEffect } from 'react';
import {
  FLIM_STANDARD_CATALOG,
  FlimStandard,
  simulateFlimExperiment,
  calculateFlimFretEfficiencyPercent,
  calculateFlimIntermolecularDistanceNm,
  calculateFlimPhasorCoordinates,
} from '../../domain/flimEngine';
import { sound } from '../../audio/soundEngine';
import {
  Clock,
  Activity,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Eye,
  Award,
  TrendingUp,
  BarChart2,
  Sliders,
  Scale,
  Gauge,
  Compass,
  ArrowRight,
  Maximize2,
  Focus,
  PieChart,
} from 'lucide-react';

interface FlimVisualizerProps {
  initialStandardId?: string;
}

export const FlimVisualizer: React.FC<FlimVisualizerProps> = ({
  initialStandardId = 'fluorescein_basic_primary_calibrant',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'TCSPC_DECAY' | 'PHASOR_PLOT' | 'FRET_RULER_LIFETIME' | 'THEORY_CURRICULUM'
  >('TCSPC_DECAY');

  const standard: FlimStandard = useMemo(() => {
    return (
      FLIM_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || FLIM_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [hoveredTimeNs, setHoveredTimeNs] = useState<number | null>(null);

  // Trigger audio on standard switch
  useEffect(() => {
    sound.playNanosecondDecayPhasorChime?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateFlimExperiment(standard, 120);
  }, [standard]);

  // SVG plot settings for TCSPC Decay Curve
  const svgWidth = 840;
  const svgHeight = 320;
  const padding = { top: 30, right: 45, bottom: 50, left: 65 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxTime = simulation.laserPeriodNanoseconds; // e.g. 25.0 ns
  // Semi-logarithmic Y-axis: 1 count to 15,000 counts (log10 = 0 to 4.2)
  const minLogCounts = 0.0;
  const maxLogCounts = 4.2;

  const getX = (t: number) => padding.left + (t / maxTime) * plotWidth;
  const getY = (counts: number) => {
    const logVal = Math.log10(Math.max(1, counts));
    return padding.top + plotHeight - (logVal / maxLogCounts) * plotHeight;
  };

  // Paths
  const decayPath = useMemo(() => {
    return simulation.decayPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.timeNanoseconds);
      const y = getY(pt.intensityCounts);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxTime]);

  const irfPath = useMemo(() => {
    return simulation.decayPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.timeNanoseconds);
      const y = getY(pt.irfIntensityCounts);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxTime]);

  const hoveredPoint = useMemo(() => {
    if (hoveredTimeNs === null) return null;
    return simulation.decayPoints.reduce((prev, curr) => {
      return Math.abs(curr.timeNanoseconds - hoveredTimeNs) < Math.abs(prev.timeNanoseconds - hoveredTimeNs)
        ? curr
        : prev;
    }, simulation.decayPoints[0]);
  }, [hoveredTimeNs, simulation]);

  // SVG Phasor Plot Settings (Universal Semicircle: g in [0, 1], s in [0, 0.6])
  const phasorSvgWidth = 600;
  const phasorSvgHeight = 300;
  const phasorPad = { top: 30, right: 40, bottom: 40, left: 50 };
  const phasorPlotW = phasorSvgWidth - phasorPad.left - phasorPad.right;
  const phasorPlotH = phasorSvgHeight - phasorPad.top - phasorPad.bottom;

  const getPhasorX = (g: number) => phasorPad.left + g * phasorPlotW;
  const getPhasorY = (s: number) => phasorPad.top + phasorPlotH - (s / 0.6) * phasorPlotH;

  // Generate Universal Semicircle Path: (g - 0.5)^2 + s^2 = 0.25 (radius 0.5, center at (0.5, 0))
  const universalSemicirclePath = useMemo(() => {
    let p = '';
    for (let i = 0; i <= 60; i++) {
      const theta = (i / 60) * Math.PI; // 0 to pi
      const g = 0.5 + 0.5 * Math.cos(Math.PI - theta); // from 0 to 1
      const s = 0.5 * Math.sin(Math.PI - theta); // from 0 to 0.5 to 0
      const x = getPhasorX(g);
      const y = getPhasorY(s);
      p += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }
    return p;
  }, []);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-navy-dark/90 border border-amber-500/30 rounded-2xl text-ivory shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Kính Hiển Vi Đo Thời Gian Sống Huỳnh Quang FLIM & TCSPC
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-950/80 text-amber-300 border border-amber-500/40 font-bold">
                Đếm Photon Đơn Lẻ (TCSPC) / Đồ Thị Pha Phasor Plot
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5 font-mono">
              Thời gian sống phân rã nanosecond (τ) · Thước đo phân tử FLIM-FRET · Cảm biến pH nội bào & Bè lipid màng tế bào
            </p>
          </div>
        </div>

        {/* Global Key Metrics Pill */}
        <div className="flex items-center gap-2 sm:gap-4 bg-navy-base/80 px-4 py-2 rounded-xl border border-amber-500/30">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-amber-400/80">Thời Gian Sống Trung Bình (⟨τ⟩)</div>
            <div className="text-sm font-black text-amber-300 font-mono">
              {simulation.amplitudeWeightedLifetimeNs.toFixed(2)} ns
            </div>
          </div>
          <div className="w-px h-6 bg-navy-light/60" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-cyan-400/80">Tần Số Xung Laser</div>
            <div className="text-sm font-black text-cyan-300 font-mono">
              {standard.laserRepetitionRateMhz} MHz ({simulation.laserPeriodNanoseconds} ns)
            </div>
          </div>
          <div className="w-px h-6 bg-navy-light/60" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-fuchsia-400/80">
              {standard.applicationCategory === 'FLIM_FRET' ? 'Hiệu Suất FRET' : 'Tọa Độ Phasor (g, s)'}
            </div>
            <div className="text-sm font-black text-fuchsia-300 font-mono">
              {standard.applicationCategory === 'FLIM_FRET'
                ? `${simulation.fretEfficiencyPercent}% (r=${simulation.apparentIntermolecularDistanceNm}nm)`
                : `(${simulation.phasorCoordinates.g.toFixed(2)}, ${simulation.phasorCoordinates.s.toFixed(2)})`}
            </div>
          </div>
        </div>
      </div>

      {/* Standard Selector Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {FLIM_STANDARD_CATALOG.map((st) => {
          const isSelected = st.id === selectedStandardId;
          return (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStandardId(st.id);
                sound.playNanosecondDecayPhasorChime?.();
              }}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-950/50 border-amber-400 shadow-lg shadow-amber-500/10'
                  : 'bg-navy-base/60 border-navy-light/40 hover:border-amber-500/40 hover:bg-navy-base/80 text-ivory-muted'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-amber-400 animate-ping" />
              )}
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-bold mb-1">
                {st.applicationCategory}
              </div>
              <div className="text-xs font-bold text-white line-clamp-1 mb-1">{st.vietnameseName}</div>
              <div className="text-[11px] text-ivory-muted line-clamp-2 leading-relaxed">
                {st.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Subtab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-light/30 pb-2">
        <button
          onClick={() => {
            setActiveSubTab('TCSPC_DECAY');
            sound.playNanosecondDecayPhasorChime?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'TCSPC_DECAY'
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Phân Rã Huỳnh Quang TCSPC (Hàm Mũ & Xung IRF)
        </button>
        <button
          onClick={() => {
            setActiveSubTab('PHASOR_PLOT');
            sound.playNanosecondDecayPhasorChime?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'PHASOR_PLOT'
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <PieChart className="w-3.5 h-3.5" />
          Đồ Thị Pha Phasor Plot (Bán Cầu Vạn Năng)
        </button>
        <button
          onClick={() => {
            setActiveSubTab('FRET_RULER_LIFETIME');
            sound.playFlimPicoLaserPulseClick?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'FRET_RULER_LIFETIME'
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Thước Đo FRET (E%) & Các Thành Phần Phân Rã (τᵢ)
        </button>
        <button
          onClick={() => {
            setActiveSubTab('THEORY_CURRICULUM');
            sound.playNanosecondDecayPhasorChime?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'THEORY_CURRICULUM'
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Lý Thuyết FLIM/FRET & Kết Nối GDPT 2018
        </button>
      </div>

      {/* Subtab 1: TCSPC Decay Curve */}
      {activeSubTab === 'TCSPC_DECAY' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-4 rounded-xl border border-navy-light/50">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Phổ Phân Rã Photon TCSPC [Trục Tung Logarit: 1 → 10,000 Counts]
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-amber-400 rounded-full" />
                  <span className="text-amber-300">Tín Hiệu Phân Rã I(t)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-cyan-400 rounded-full border-b border-dashed" />
                  <span className="text-cyan-300">Hàm Đáp Ứng Thiết Bị IRF ({standard.irfFwhmPicoseconds} ps)</span>
                </div>
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative overflow-x-auto">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto select-none font-mono"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const svgX = (mouseX / rect.width) * svgWidth;
                  if (svgX >= padding.left && svgX <= padding.left + plotWidth) {
                    const t = ((svgX - padding.left) / plotWidth) * maxTime;
                    setHoveredTimeNs(t);
                  }
                }}
                onMouseLeave={() => setHoveredTimeNs(null)}
              >
                {/* Logarithmic Decade Markers on Y-axis (1, 10, 100, 1000, 10000) */}
                {[1, 10, 100, 1000, 10000].map((c) => {
                  const y = getY(c);
                  return (
                    <g key={`tcspc-grid-y-${c}`}>
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={padding.left + plotWidth}
                        y2={y}
                        stroke="rgba(255,255,255,0.06)"
                      />
                      <text
                        x={padding.left - 8}
                        y={y + 3}
                        fill="#94a3b8"
                        fontSize="9"
                        textAnchor="end"
                      >
                        10^{Math.round(Math.log10(c))}
                      </text>
                    </g>
                  );
                })}

                {/* Time Axis Grid (0, 5, 10, 15, 20, 25 ns) */}
                {[0, 5, 10, 15, 20, 25].filter((t) => t <= maxTime).map((t) => {
                  const x = getX(t);
                  return (
                    <g key={`tcspc-grid-x-${t}`}>
                      <line
                        x1={x}
                        y1={padding.top}
                        x2={x}
                        y2={padding.top + plotHeight}
                        stroke="rgba(255,255,255,0.08)"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={x}
                        y={padding.top + plotHeight + 18}
                        fill="#94a3b8"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        {t} ns
                      </text>
                    </g>
                  );
                })}

                {/* Primary Curves */}
                <path d={irfPath} fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeDasharray="3 2" />
                <path d={decayPath} fill="none" stroke="#fbbf24" strokeWidth="2.5" />

                {/* Lifetime Component Annotations */}
                {standard.components.map((c, idx) => {
                  const x = getX(1.8 + c.lifetimeNanoseconds);
                  return (
                    <g key={`comp-tau-tag-${idx}`}>
                      <line
                        x1={x}
                        y1={padding.top + 20 + idx * 24}
                        x2={x}
                        y2={padding.top + plotHeight}
                        stroke="#f59e0b"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <rect
                        x={x - 40}
                        y={padding.top + 10 + idx * 24}
                        width="80"
                        height="16"
                        rx="4"
                        fill="#451a03"
                        stroke="#f59e0b"
                        strokeWidth="0.8"
                      />
                      <text
                        x={x}
                        y={padding.top + 21 + idx * 24}
                        fill="#fde68a"
                        fontSize="8.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        τ_{idx + 1} = {c.lifetimeNanoseconds} ns ({c.amplitudeFractionPercent}%)
                      </text>
                    </g>
                  );
                })}

                {/* Interactive Scrub Cursor */}
                {hoveredPoint && (
                  <g>
                    <line
                      x1={getX(hoveredPoint.timeNanoseconds)}
                      y1={padding.top}
                      x2={getX(hoveredPoint.timeNanoseconds)}
                      y2={padding.top + plotHeight}
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={getX(hoveredPoint.timeNanoseconds)}
                      cy={getY(hoveredPoint.intensityCounts)}
                      r="4.5"
                      fill="#fbbf24"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Live Hover Readout Panel */}
            {hoveredPoint ? (
              <div className="mt-3 p-3 rounded-lg bg-navy-dark/90 border border-amber-500/40 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div>
                  <span className="text-ivory-muted text-[10px] block">Thời Gian Sau Xung Laser</span>
                  <span className="text-amber-300 font-bold">{hoveredPoint.timeNanoseconds} ns</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Số Lượng Photon Đếm Được</span>
                  <span className="text-white font-bold">{hoveredPoint.intensityCounts} photons</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Cường Độ Xung Kích Thích IRF</span>
                  <span className="text-cyan-300 font-bold">{hoveredPoint.irfIntensityCounts}</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Thời Gian Sống Trung Bình</span>
                  <span className="text-purple-300 font-bold">{simulation.amplitudeWeightedLifetimeNs} ns</span>
                </div>
              </div>
            ) : (
              <div className="mt-3 p-2 text-center text-xs text-ivory-muted font-mono italic">
                Di chuột trên đồ thị phân rã TCSPC để kiểm tra số đếm photon ở từng thời điểm sau xung kích thích
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtab 2: Phasor Plot Analysis */}
      {activeSubTab === 'PHASOR_PLOT' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-5 rounded-xl border border-navy-light/50">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-400" />
              Đồ Thị Pha Phasor Plot (Mô Hình Không Cần Khớp Hàm - Model-Free Frequency Transformation)
            </h3>
            <p className="text-xs text-ivory-muted leading-relaxed mb-4">
              Biến đổi Fourier của hàm phân rã huỳnh quang đưa tín hiệu về hai tọa độ không gian tần số g (thực) và s (ảo).
              Mọi phân tử có phân rã đơn hàm mũ (như Fluorescein chuẩn sơ cấp) bắt buộc phải nằm trên đường cong Bán Cầu Vạn Năng (Universal Semicircle).
              Khi xảy ra trao đổi năng lượng FRET hoặc hỗn hợp đa thành phần, điểm pha dịch chuyển vào phía trong đường cong theo quy tắc tổ hợp tuyến tính.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-4 rounded-xl bg-navy-dark/90 border border-amber-500/30">
              {/* Phasor SVG Canvas */}
              <div className="relative overflow-x-auto w-full lg:w-2/3">
                <svg viewBox={`0 0 ${phasorSvgWidth} ${phasorSvgHeight}`} className="w-full h-auto select-none font-mono">
                  {/* Axes */}
                  <line
                    x1={phasorPad.left}
                    y1={phasorPad.top + phasorPlotH}
                    x2={phasorPad.left + phasorPlotW}
                    y2={phasorPad.top + phasorPlotH}
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={phasorPad.left}
                    y1={phasorPad.top}
                    x2={phasorPad.left}
                    y2={phasorPad.top + phasorPlotH}
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />

                  {/* g-axis ticks [0, 0.2, 0.4, 0.6, 0.8, 1.0] */}
                  {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => (
                    <g key={`phasor-g-${val}`}>
                      <line
                        x1={getPhasorX(val)}
                        y1={phasorPad.top + phasorPlotH}
                        x2={getPhasorX(val)}
                        y2={phasorPad.top + phasorPlotH + 5}
                        stroke="#64748b"
                      />
                      <text
                        x={getPhasorX(val)}
                        y={phasorPad.top + phasorPlotH + 16}
                        fill="#94a3b8"
                        fontSize="9"
                        textAnchor="middle"
                      >
                        {val.toFixed(1)}
                      </text>
                    </g>
                  ))}

                  {/* s-axis ticks [0, 0.1, 0.2, 0.3, 0.4, 0.5] */}
                  {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((val) => (
                    <g key={`phasor-s-${val}`}>
                      <line
                        x1={phasorPad.left - 5}
                        y1={getPhasorY(val)}
                        x2={phasorPad.left}
                        y2={getPhasorY(val)}
                        stroke="#64748b"
                      />
                      <text
                        x={phasorPad.left - 8}
                        y={getPhasorY(val) + 3}
                        fill="#94a3b8"
                        fontSize="9"
                        textAnchor="end"
                      >
                        {val.toFixed(1)}
                      </text>
                    </g>
                  ))}

                  {/* Universal Semicircle */}
                  <path d={universalSemicirclePath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                  <text
                    x={getPhasorX(0.5)}
                    y={getPhasorY(0.52)}
                    fill="#38bdf8"
                    fontSize="9.5"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Bán Cầu Vạn Năng (Universal Semicircle)
                  </text>

                  {/* Mono-exponential lifetime markers along semicircle */}
                  {[0.5, 1.0, 2.0, 4.0, 8.0].map((tau) => {
                    const omega = 2.0 * Math.PI * (standard.laserRepetitionRateMhz * 1e6) * 1e-9;
                    const denom = 1.0 + Math.pow(omega * tau, 2);
                    const g = 1.0 / denom;
                    const s = (omega * tau) / denom;
                    return (
                      <g key={`semicircle-marker-${tau}`}>
                        <circle cx={getPhasorX(g)} cy={getPhasorY(s)} r="3" fill="#38bdf8" />
                        <text
                          x={getPhasorX(g) + 6}
                          y={getPhasorY(s) - 5}
                          fill="#7dd3fc"
                          fontSize="8"
                          fontWeight="bold"
                        >
                          {tau}ns
                        </text>
                      </g>
                    );
                  })}

                  {/* Current Sample Phasor Position */}
                  <circle
                    cx={getPhasorX(simulation.phasorCoordinates.g)}
                    cy={getPhasorY(simulation.phasorCoordinates.s)}
                    r="6.5"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <line
                    x1={phasorPad.left}
                    y1={phasorPad.top + phasorPlotH}
                    x2={getPhasorX(simulation.phasorCoordinates.g)}
                    y2={getPhasorY(simulation.phasorCoordinates.s)}
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                </svg>
              </div>

              {/* Phasor Analysis Details */}
              <div className="w-full lg:w-1/3 flex flex-col gap-3 font-mono text-xs bg-navy-base/60 p-4 rounded-xl border border-amber-500/20">
                <div className="border-b border-navy-light/40 pb-2">
                  <span className="text-amber-400 font-bold block mb-1">Tọa Độ Pha Đo Được:</span>
                  <div className="flex justify-between">
                    <span className="text-ivory-muted">Thực g:</span>
                    <span className="text-white font-bold">{simulation.phasorCoordinates.g}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ivory-muted">Ảo s:</span>
                    <span className="text-white font-bold">{simulation.phasorCoordinates.s}</span>
                  </div>
                </div>

                <div className="border-b border-navy-light/40 pb-2">
                  <span className="text-cyan-400 font-bold block mb-1">Thời Gian Sống Pha (τ_ϕ):</span>
                  <div className="text-cyan-300 font-bold text-sm">
                    {simulation.phasorCoordinates.apparentLifetimeNanoseconds} ns
                  </div>
                </div>

                <div>
                  <span className="text-fuchsia-400 font-bold block mb-1">Đánh Giá Vị Trí Phasor:</span>
                  <div className="text-[11px] text-ivory-muted leading-relaxed">
                    {Math.abs(Math.pow(simulation.phasorCoordinates.g - 0.5, 2) + Math.pow(simulation.phasorCoordinates.s, 2) - 0.25) < 0.015
                      ? 'Nằm trực tiếp trên bán cầu vạn năng → Phân rã đơn hàm mũ thuần khiết (Mono-exponential).'
                      : 'Nằm bên trong bán cầu vạn năng → Tín hiệu đa thành phần hoặc xảy ra trao đổi năng lượng FRET.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: FRET Ruler & Lifetimes */}
      {activeSubTab === 'FRET_RULER_LIFETIME' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-5 rounded-xl border border-navy-light/50">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-400" />
              Bảng Thành Phần Thời Gian Sống & Thước Đo Phân Tử FRET ({standard.vietnameseName})
            </h3>

            {/* FRET Card Banner if applicable */}
            {standard.applicationCategory === 'FLIM_FRET' && (
              <div className="p-3.5 mb-4 rounded-xl bg-fuchsia-950/40 border border-fuchsia-500/40 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div>
                  <span className="text-ivory-muted text-[10px] block">Hiệu Suất FRET (E_FRET)</span>
                  <span className="text-fuchsia-300 font-bold text-sm">{simulation.fretEfficiencyPercent}%</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Khoảng Cách Phân Tử Đo Được (r)</span>
                  <span className="text-emerald-300 font-bold text-sm">{simulation.apparentIntermolecularDistanceNm} nm</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Bán Kính Förster Chuẩn (R₀)</span>
                  <span className="text-cyan-300 font-bold text-sm">{standard.forsterRadiusR0Nm} nm</span>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-navy-light/50 text-ivory-muted bg-navy-dark/40">
                    <th className="py-2.5 px-3">Trạng Thái / Phân Tử</th>
                    <th className="py-2.5 px-3">Thời Gian Sống (τ)</th>
                    <th className="py-2.5 px-3">Tỉ Trọng Biên Độ (α)</th>
                    <th className="py-2.5 px-3">Đóng Góp Cường Độ</th>
                    <th className="py-2.5 px-3">Ý Nghĩa Cơ Chế Vi Môi Trường</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/30">
                  {standard.components.map((c, idx) => {
                    const intFrac = (c.amplitudeFractionPercent * c.lifetimeNanoseconds) /
                      standard.components.reduce((acc, comp) => acc + comp.amplitudeFractionPercent * comp.lifetimeNanoseconds, 0) * 100;
                    return (
                      <tr
                        key={`comp-row-${idx}`}
                        className="hover:bg-amber-950/30 transition-colors cursor-pointer"
                        onClick={() => sound.playFlimPicoLaserPulseClick?.()}
                      >
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          {c.name}
                        </td>
                        <td className="py-2.5 px-3 text-amber-300 font-bold">
                          {c.lifetimeNanoseconds.toFixed(2)} ns
                        </td>
                        <td className="py-2.5 px-3 text-cyan-300">
                          {c.amplitudeFractionPercent}%
                        </td>
                        <td className="py-2.5 px-3 text-purple-300 font-bold">
                          {intFrac.toFixed(1)}%
                        </td>
                        <td className="py-2.5 px-3 text-ivory-muted text-[11px]">
                          {c.biologicalRole}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Theory & Curriculum */}
      {activeSubTab === 'THEORY_CURRICULUM' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scientific Foundation */}
          <div className="p-5 rounded-xl bg-navy-base/80 border border-amber-500/30 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Nguyên Lý Kính Hiển Vi Đo Thời Gian Sống FLIM
              </h3>
            </div>
            <div className="text-xs text-ivory-muted leading-relaxed space-y-2 font-mono">
              <p>
                <strong className="text-white">1. Kỹ Thuật TCSPC:</strong> Đếm photon tương quan thời gian đạt độ phân giải picosecond (10⁻¹² s), cho phép lập biểu đồ phân rã xác suất của từng photon đơn lẻ phát ra sau mỗi xung laser.
              </p>
              <p>
                <strong className="text-white">2. Thước Đo Phân Tử FLIM-FRET:</strong>
                <br />
                <span className="text-amber-300 font-bold block my-1">
                  E_FRET = 1 - (τ_DA / τ_D) = R₀⁶ / (R₀⁶ + r⁶)
                </span>
                Xác định chính xác khoảng cách giữa hai protein ở thang đo nanomet (1 - 10 nm) ngay trong tế bào sống mà kính hiển vi quang học thông thường không thể thấy.
              </p>
              <p>
                <strong className="text-white">3. Miễn Nhiễm Với Biến Động Nồng Độ:</strong> Thời gian sống huỳnh quang là một đại lượng nội tại (intensive property), không bị ảnh hưởng bởi thuốc nhuộm không đều hay hiện tượng quang phân hủy (photobleaching).
              </p>
            </div>
          </div>

          {/* Curriculum Integration */}
          <div className="p-5 rounded-xl bg-navy-base/80 border border-cyan-500/30 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Tích Hợp Sách Giáo Khoa GDPT 2018 (Vật Lý 12 & Hóa Học 12)
              </h3>
            </div>
            <div className="text-xs text-ivory-muted leading-relaxed space-y-2 font-mono">
              <p>
                <strong className="text-white">Vật Lý 12 (Lượng Tử Ánh Sáng & Trạng Thái Kích Thích):</strong>
                <br />
                - Thời gian sống trung bình của trạng thái dừng kích thích trước khi phát xạ tự phát photon (τ ~ 10⁻⁹ s).
                <br />
                - Định luật dịch chuyển bước sóng Stokes và hiện tượng dập tắt huỳnh quang không bức xạ.
              </p>
              <p>
                <strong className="text-white">Hóa Học 12 & Sinh Học 10 (Chuyển Hóa Tế Bào & Màng Sinh Chất):</strong>
                <br />
                - Coenzyme NADH tự do và dạng liên kết enzyme trong chuyển hóa đường phân (Hiệu ứng Warburg ung thư).
                <br />
                - Độ nhớt màng sinh học và cấu trúc bè lipid (Lipid Raft) giàu cholesterol.
                <br />
                - Cân bằng pH cục bộ trong tiêu thể lysosome.
              </p>
              <div className="p-2.5 rounded-lg bg-navy-dark/90 border border-cyan-500/40 text-[11px] text-cyan-300">
                <strong>Tiêu Chuẩn Quốc Tế:</strong> {standard.isoStandardRef}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
