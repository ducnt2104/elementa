import React, { useState, useMemo, useEffect } from 'react';
import {
  TDA_STANDARD_CATALOG,
  TdaStandard,
  simulateTdaExperiment,
  calculateTdaStokesEinsteinD,
  calculateTdaRadiusFromD,
  calculateTdaPeakVarianceSec2,
  extractTdaDiffusionFromDualWindows,
} from '../../domain/tdaEngine';
import { sound } from '../../audio/soundEngine';
import {
  GitCommit,
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
} from 'lucide-react';

interface TdaVisualizerProps {
  initialStandardId?: string;
}

export const TdaVisualizer: React.FC<TdaVisualizerProps> = ({
  initialStandardId = 'caffeine_paracetamol_small_molecule',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'TAYLORGRAM_RUN' | 'CAPILLARY_POISEUILLE' | 'HYDRODYNAMIC_SIZING' | 'THEORY_CURRICULUM'
  >('TAYLORGRAM_RUN');

  const standard: TdaStandard = useMemo(() => {
    return (
      TDA_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || TDA_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [hoveredTime, setHoveredTime] = useState<number | null>(null);

  // Trigger audio on standard selection
  useEffect(() => {
    sound.playTdaCapillaryFlowWhistle?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateTdaExperiment(standard, 140);
  }, [standard]);

  // SVG plot settings for Taylorgram
  const svgWidth = 840;
  const svgHeight = 320;
  const padding = { top: 30, right: 45, bottom: 50, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxTime = simulation.window2TransitTimeSec * 1.35;
  const maxUV = 1.15;

  const getX = (t: number) => padding.left + (t / maxTime) * plotWidth;
  const getY = (uv: number) => padding.top + plotHeight - (uv / maxUV) * plotHeight;

  // Path generators for Window 1 and Window 2
  const win1Path = useMemo(() => {
    return simulation.taylorgramPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.timeSeconds);
      const y = getY(pt.window1AbsorbanceUv);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxTime, maxUV]);

  const win2Path = useMemo(() => {
    return simulation.taylorgramPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.timeSeconds);
      const y = getY(pt.window2AbsorbanceUv);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxTime, maxUV]);

  const hoveredPoint = useMemo(() => {
    if (hoveredTime === null) return null;
    return simulation.taylorgramPoints.reduce((prev, curr) => {
      return Math.abs(curr.timeSeconds - hoveredTime) < Math.abs(prev.timeSeconds - hoveredTime)
        ? curr
        : prev;
    }, simulation.taylorgramPoints[0]);
  }, [hoveredTime, simulation]);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-navy-dark/90 border border-teal-500/30 rounded-2xl text-ivory shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-300">
            <GitCommit className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Phân Tích Tán Xạ Taylor (TDA) & Bán Kính Thủy Động (Sir G.I. Taylor 1953)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-teal-950/80 text-teal-300 border border-teal-500/40 font-bold">
                Mao Quản Đo Kép / Không Cần Hiệu Chuẩn
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5 font-mono">
              Đo trực tiếp bán kính R_h từ dưới nanomet đến siêu phân tử · Kháng thể · Peptid · Kháng tá dược đường & polysorbate
            </p>
          </div>
        </div>

        {/* Global Key Metrics Pill */}
        <div className="flex items-center gap-2 sm:gap-4 bg-navy-base/80 px-4 py-2 rounded-xl border border-teal-500/30">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-teal-400/80">Bán Kính Thủy Động (R_h)</div>
            <div className="text-sm font-black text-teal-300 font-mono">
              {simulation.extractedHydrodynamicRadiusNm.toFixed(2)} nm
            </div>
          </div>
          <div className="w-px h-6 bg-navy-light/60" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-cyan-400/80">Hệ Số Khuếch Tán (D)</div>
            <div className="text-sm font-black text-cyan-300 font-mono">
              {simulation.extractedDiffusionCoeffM2PerS.toExponential(2)} m²/s
            </div>
          </div>
          <div className="w-px h-6 bg-navy-light/60" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-amber-400/80">Số Péclet (Pe)</div>
            <div className="text-sm font-black text-amber-300 font-mono">
              {simulation.pecletNumber}
            </div>
          </div>
        </div>
      </div>

      {/* Standard Selector Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {TDA_STANDARD_CATALOG.map((st) => {
          const isSelected = st.id === selectedStandardId;
          return (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStandardId(st.id);
                sound.playTdaCapillaryFlowWhistle?.();
              }}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-teal-950/50 border-teal-400 shadow-lg shadow-teal-500/10'
                  : 'bg-navy-base/60 border-navy-light/40 hover:border-teal-500/40 hover:bg-navy-base/80 text-ivory-muted'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-teal-400 animate-ping" />
              )}
              <div className="text-[10px] font-mono uppercase tracking-wider text-teal-400/90 font-bold mb-1">
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
            setActiveSubTab('TAYLORGRAM_RUN');
            sound.playTdaCapillaryFlowWhistle?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'TAYLORGRAM_RUN'
              ? 'bg-teal-500/20 text-teal-300 border-teal-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Phổ Tán Xạ Taylorgram (Cửa Sổ 1 & Cửa Sổ 2)
        </button>
        <button
          onClick={() => {
            setActiveSubTab('CAPILLARY_POISEUILLE');
            sound.playTdaCapillaryFlowWhistle?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'CAPILLARY_POISEUILLE'
              ? 'bg-teal-500/20 text-teal-300 border-teal-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Dòng Chảy Tầng Poiseuille & Khuếch Tán Xuyên Tâm
        </button>
        <button
          onClick={() => {
            setActiveSubTab('HYDRODYNAMIC_SIZING');
            sound.playTaylorgramDualPeakChime?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'HYDRODYNAMIC_SIZING'
              ? 'bg-teal-500/20 text-teal-300 border-teal-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Bảng Phân Tích Kích Thước & Phương Sai Đỉnh (σ²)
        </button>
        <button
          onClick={() => {
            setActiveSubTab('THEORY_CURRICULUM');
            sound.playTdaCapillaryFlowWhistle?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'THEORY_CURRICULUM'
              ? 'bg-teal-500/20 text-teal-300 border-teal-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Định Luật Taylor-Aris & Kết Nối GDPT 2018
        </button>
      </div>

      {/* Subtab 1: Taylorgram Run */}
      {activeSubTab === 'TAYLORGRAM_RUN' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-4 rounded-xl border border-navy-light/50">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Phổ Tán Xạ Taylorgram Đo Kép (Hai Cửa Sổ UV L₁ = {standard.capillaryLengthWindow1Cm} cm, L₂ = {standard.capillaryLengthWindow2Cm} cm)
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-teal-400 rounded-full" />
                  <span className="text-teal-300">Cửa Sổ 1 (L₁, hẹp, cao)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-cyan-400 rounded-full border-b border-dashed" />
                  <span className="text-cyan-300">Cửa Sổ 2 (L₂, giãn rộng, thấp)</span>
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
                    setHoveredTime(t);
                  }
                }}
                onMouseLeave={() => setHoveredTime(null)}
              >
                {/* Horizontal Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((frac) => {
                  const y = padding.top + plotHeight - frac * plotHeight;
                  return (
                    <g key={`tda-grid-y-${frac}`}>
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
                        {(frac * maxUV).toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* Time Axis Grid */}
                {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                  const t = frac * maxTime;
                  const x = getX(t);
                  return (
                    <g key={`tda-grid-x-${frac}`}>
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
                        {Math.round(t)} s
                      </text>
                    </g>
                  );
                })}

                {/* Window 1 Peak Line */}
                <line
                  x1={getX(simulation.window1TransitTimeSec)}
                  y1={padding.top}
                  x2={getX(simulation.window1TransitTimeSec)}
                  y2={padding.top + plotHeight}
                  stroke="#14b8a6"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <text
                  x={getX(simulation.window1TransitTimeSec)}
                  y={padding.top + 16}
                  fill="#2dd4bf"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  t₁ = {simulation.window1TransitTimeSec.toFixed(1)}s
                </text>

                {/* Window 2 Peak Line */}
                <line
                  x1={getX(simulation.window2TransitTimeSec)}
                  y1={padding.top}
                  x2={getX(simulation.window2TransitTimeSec)}
                  y2={padding.top + plotHeight}
                  stroke="#06b6d4"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <text
                  x={getX(simulation.window2TransitTimeSec)}
                  y={padding.top + 16}
                  fill="#67e8f9"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  t₂ = {simulation.window2TransitTimeSec.toFixed(1)}s
                </text>

                {/* Curves */}
                <path d={win1Path} fill="none" stroke="#14b8a6" strokeWidth="2.5" />
                <path d={win2Path} fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />

                {/* Interactive Scrub Cursor */}
                {hoveredPoint && (
                  <g>
                    <line
                      x1={getX(hoveredPoint.timeSeconds)}
                      y1={padding.top}
                      x2={getX(hoveredPoint.timeSeconds)}
                      y2={padding.top + plotHeight}
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={getX(hoveredPoint.timeSeconds)}
                      cy={getY(hoveredPoint.window1AbsorbanceUv)}
                      r="4"
                      fill="#14b8a6"
                    />
                    <circle
                      cx={getX(hoveredPoint.timeSeconds)}
                      cy={getY(hoveredPoint.window2AbsorbanceUv)}
                      r="4"
                      fill="#06b6d4"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Live Hover Readout Panel */}
            {hoveredPoint ? (
              <div className="mt-3 p-3 rounded-lg bg-navy-dark/90 border border-teal-500/40 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div>
                  <span className="text-ivory-muted text-[10px] block">Thời Gian Di Chuyển (t)</span>
                  <span className="text-teal-300 font-bold">{hoveredPoint.timeSeconds} giây</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Độ Hấp Thụ Cửa Sổ 1</span>
                  <span className="text-white font-bold">{hoveredPoint.window1AbsorbanceUv.toFixed(3)} AU</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Độ Hấp Thụ Cửa Sổ 2</span>
                  <span className="text-cyan-300 font-bold">{hoveredPoint.window2AbsorbanceUv.toFixed(3)} AU</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Vận Tốc Dòng Tuyến Tính</span>
                  <span className="text-amber-300 font-bold">{hoveredPoint.instantaneousLinearFlowSpeedMmPerS} mm/s</span>
                </div>
              </div>
            ) : (
              <div className="mt-3 p-2 text-center text-xs text-ivory-muted font-mono italic">
                Di chuột trên biểu đồ để xem tín hiệu hấp thụ hai cửa sổ đo tức thời
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtab 2: Capillary Poiseuille */}
      {activeSubTab === 'CAPILLARY_POISEUILLE' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-5 rounded-xl border border-navy-light/50">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-400" />
              Động Học Mao Quản Poiseuille & Sự Giãn Rộng Đỉnh Taylor (Sir G.I. Taylor 1953)
            </h3>
            <p className="text-xs text-ivory-muted leading-relaxed mb-4">
              Dưới áp suất thủy động ΔP = {standard.drivePressureMbar} mbar, dung dịch tạo dòng chảy tầng parabol với vận tốc u(r) = 2⟨u⟩(1 - (r/R)²).
              Nếu không có khuếch tán, chất tan sẽ bị kéo dài thành hình parabol dài vô tận. Nhưng nhờ chuyển động nhiệt Brown, các phân tử khuếch tán xuyên tâm
              giữa các tầng vận tốc khác nhau, trung bình hóa vận tốc và giới hạn độ giãn rộng thành một đỉnh Gaussian đối xứng hoàn hảo!
            </p>

            {/* Capillary Cross Section Visual */}
            <div className="p-4 rounded-xl bg-navy-dark/90 border border-teal-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono border-b border-navy-light/40 pb-2">
                <span className="text-teal-300 font-bold">Thành Mao Quản Thạch Anh (Fused Silica Capillary, r = {standard.capillaryRadiusMicrons} µm)</span>
                <span className="text-cyan-300 font-bold">Chiều Dài Tổng L = {standard.capillaryLengthWindow2Cm} cm</span>
              </div>

              {/* Cylindrical Simulation Diagram */}
              <div className="relative h-44 bg-gradient-to-r from-navy-base via-teal-950/20 to-navy-base border-y-2 border-teal-500/40 rounded-lg overflow-hidden flex flex-col justify-between p-3">
                {/* Parabolic Flow Lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-2 px-4 opacity-40 pointer-events-none">
                  <div className="h-0.5 bg-teal-400 w-1/4 rounded-full" />
                  <div className="h-0.5 bg-teal-300 w-2/3 rounded-full" />
                  <div className="h-1 bg-teal-200 w-11/12 rounded-full shadow-sm" />
                  <div className="h-0.5 bg-teal-300 w-2/3 rounded-full" />
                  <div className="h-0.5 bg-teal-400 w-1/4 rounded-full" />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-teal-300 z-10">
                  <span className="flex items-center gap-1">
                    <ArrowRight className="w-3.5 h-3.5" /> Đầu Tiêm Mẫu Pulse (0 cm)
                  </span>
                  <span className="flex items-center gap-1 text-cyan-300">
                    Cửa Sổ 1 ({standard.capillaryLengthWindow1Cm} cm)
                  </span>
                  <span className="flex items-center gap-1 text-amber-300">
                    Cửa Sổ 2 ({standard.capillaryLengthWindow2Cm} cm)
                  </span>
                </div>

                {/* Simulated Dispersion Pulse moving */}
                <div className="flex items-center justify-around z-10 my-auto">
                  {/* Plug at inlet */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-20 rounded-full bg-teal-400 shadow-lg border border-white" />
                    <span className="text-[9px] font-mono text-ivory-muted mt-1">Plug ban đầu</span>
                  </div>

                  {/* Window 1 Pulse */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-16 rounded-full bg-teal-400/80 shadow-lg border border-teal-300 flex items-center justify-center">
                      <span className="text-[8px] font-mono font-bold text-obsidian">W1</span>
                    </div>
                    <span className="text-[9px] font-mono text-teal-300 mt-1">
                      σ₁² = {simulation.window1VarianceSec2.toFixed(1)} s²
                    </span>
                  </div>

                  {/* Window 2 Pulse */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-10 rounded-full bg-cyan-400/60 shadow-lg border border-cyan-300 flex items-center justify-center">
                      <span className="text-[8px] font-mono font-bold text-obsidian">W2</span>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-300 mt-1">
                      σ₂² = {simulation.window2VarianceSec2.toFixed(1)} s²
                    </span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-ivory-muted text-center z-10">
                  Công Thức Khử Sai Số Tiêm: D = r² · (t₂ - t₁) / [24 · (σ₂² - σ₁²)]
                </div>
              </div>

              {/* Physical Comparison Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-navy-base/60 border border-teal-500/30">
                  <div className="text-teal-400 font-bold mb-1">
                    Định Luật Tán Xạ Taylor-Aris:
                  </div>
                  <div className="text-ivory-muted text-[11px] leading-relaxed">
                    K = D + (r² · u²) / (48 · D)
                    <br />
                    Phân tử lớn hơn có D nhỏ hơn → Bị kéo giãn mạnh hơn trong dòng chảy parabol → Đỉnh Taylor mở rộng (σ² lớn hơn) → Đo bán kính cực nhạy!
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-navy-base/60 border border-cyan-500/30">
                  <div className="text-cyan-400 font-bold mb-1">
                    Miễn Nhiễm Với Tá Dược Nồng Độ Cao:
                  </div>
                  <div className="text-ivory-muted text-[11px] leading-relaxed">
                    Khác với DLS hay SEC-MALS (bị nhiễu nặng bởi hạt bụi hay chiết suất tá dược sucrose/polysorbate), TDA dùng đầu dò UV đo hấp thụ chất tan nên trơ hoàn toàn với tá dược không hấp thụ UV.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Hydrodynamic Sizing */}
      {activeSubTab === 'HYDRODYNAMIC_SIZING' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-5 rounded-xl border border-navy-light/50">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-teal-400" />
              Bảng Phân Tích Thông Số Thủy Động TDA ({standard.vietnameseName})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-navy-light/50 text-ivory-muted bg-navy-dark/40">
                    <th className="py-2.5 px-3">Phân Tử / Trạng Thái</th>
                    <th className="py-2.5 px-3">Bán Kính Thủy Động (R_h)</th>
                    <th className="py-2.5 px-3">Khối Lượng Phân Tử</th>
                    <th className="py-2.5 px-3">Hệ Số Khuếch Tán (D)</th>
                    <th className="py-2.5 px-3">Độ Rộng Đỉnh σ₁² (W1)</th>
                    <th className="py-2.5 px-3">Độ Rộng Đỉnh σ₂² (W2)</th>
                    <th className="py-2.5 px-3">Tỉ Lệ (%)</th>
                    <th className="py-2.5 px-3">Vai Trò Sinh Học / Dược Lý</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/30">
                  {standard.speciesList.map((sp, idx) => {
                    const spD = sp.apparentDiffusionCoeffM2PerS;
                    const sig1 = calculateTdaPeakVarianceSec2(
                      standard.capillaryRadiusMicrons,
                      simulation.window1TransitTimeSec,
                      spD
                    );
                    const sig2 = calculateTdaPeakVarianceSec2(
                      standard.capillaryRadiusMicrons,
                      simulation.window2TransitTimeSec,
                      spD
                    );
                    return (
                      <tr
                        key={`tda-sp-${idx}`}
                        className="hover:bg-teal-950/30 transition-colors cursor-pointer"
                        onClick={() => sound.playTaylorgramDualPeakChime?.()}
                      >
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-teal-400" />
                          {sp.name}
                        </td>
                        <td className="py-2.5 px-3 text-teal-300 font-bold">
                          {sp.nominalHydrodynamicRadiusNm.toFixed(2)} nm
                        </td>
                        <td className="py-2.5 px-3 text-cyan-300">
                          {sp.nominalMolecularWeightDa >= 1000
                            ? `${(sp.nominalMolecularWeightDa / 1000).toFixed(1)} kDa`
                            : `${sp.nominalMolecularWeightDa.toFixed(1)} Da`}
                        </td>
                        <td className="py-2.5 px-3 text-purple-300">
                          {spD.toExponential(2)} m²/s
                        </td>
                        <td className="py-2.5 px-3 text-amber-300">
                          {sig1.toFixed(1)} s²
                        </td>
                        <td className="py-2.5 px-3 text-amber-300 font-bold">
                          {sig2.toFixed(1)} s²
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{sp.fractionPercent}%</span>
                            <div className="w-16 h-2 rounded-full bg-navy-dark overflow-hidden">
                              <div
                                className="h-full bg-teal-400 rounded-full"
                                style={{ width: `${sp.fractionPercent}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-ivory-muted text-[11px]">
                          {sp.biologicalRole}
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
          <div className="p-5 rounded-xl bg-navy-base/80 border border-teal-500/30 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Lý Thuyết Tán Xạ Taylor (Sir Geoffrey Ingram Taylor 1953)
              </h3>
            </div>
            <div className="text-xs text-ivory-muted leading-relaxed space-y-2 font-mono">
              <p>
                <strong className="text-white">1. Nguyên Lý TDA Đo Kép:</strong> Khi xung chất tan di chuyển trong mao quản hở đường kính nhỏ (50 µm), hiện tượng tán xạ đối xứng diễn ra tuân theo phương trình Taylor-Aris. Cửa sổ đo kép cho phép triệt tiêu hoàn toàn sai số mở rộng do thể tích tiêm ban đầu.
              </p>
              <p>
                <strong className="text-white">2. Phương Trình Stokes-Einstein Tuyệt Đối:</strong>
                <br />
                <span className="text-teal-300 font-bold block my-1">
                  R_h = (k_B · T) / (6 · π · η · D)
                </span>
                Không cần bất kỳ đường chuẩn phân tử nào, giá trị bán kính thủy động được tính trực tiếp từ hằng số vật lý CODATA.
              </p>
              <p>
                <strong className="text-white">3. Độ Kháng Tá Dược Vượt Trội:</strong> Đo trực tiếp được các mẫu sinh phẩm đậm đặc trong tá dược bảo quản (10% đường sucrose, 0.1% Polysorbate 20) mà DLS hay SEC-MALS thất bại hoàn toàn.
              </p>
            </div>
          </div>

          {/* Curriculum Integration */}
          <div className="p-5 rounded-xl bg-navy-base/80 border border-cyan-500/30 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Tích Hợp Sách Giáo Khoa GDPT 2018 (Vật Lý 10 & Hóa Học 12)
              </h3>
            </div>
            <div className="text-xs text-ivory-muted leading-relaxed space-y-2 font-mono">
              <p>
                <strong className="text-white">Vật Lý 10 (Chất Lưu Chuyển Động & Định Luật Poiseuille):</strong>
                <br />
                - Lưu lượng thể tích chất lưu nhớt chảy qua ống hình trụ tròn bán kính r: Q = (π · r⁴ · ΔP) / (8 · η · L).
                <br />
                - Chuyển động Brown và sự khuếch tán phân tử tự do theo định luật Fick.
              </p>
              <p>
                <strong className="text-white">Hóa Học 12 (Peptide, Protein & Đại Phân Tử Sinh Học):</strong>
                <br />
                - Cấu trúc không gian bậc ba và bậc bốn của protein (Insulin, Kháng thể IgG1).
                <br />
                - Cân bằng phối trí ion kim loại (ion Zn2+ tạo phức lục phân insulin ổn định).
                <br />
                - Cấu trúc thứ cấp của oligonucleotide DNA (G-quadruplex).
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
