import React, { useState, useMemo, useEffect } from 'react';
import {
  AF4_STANDARD_CATALOG,
  Af4Standard,
  simulateAf4Experiment,
  calculateAf4DiffusionCoeffM2PerS,
  calculateAf4RetentionTimeMinutes,
} from '../../domain/af4Engine';
import { sound } from '../../audio/soundEngine';
import {
  Layers,
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
} from 'lucide-react';

interface Af4VisualizerProps {
  initialStandardId?: string;
}

export const Af4Visualizer: React.FC<Af4VisualizerProps> = ({
  initialStandardId = 'nist_latex_nanobead_ladder',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'FRACTOGRAM_RUN' | 'CHANNEL_DYNAMICS' | 'SPECIES_SIZING' | 'THEORY_CURRICULUM'
  >('FRACTOGRAM_RUN');

  const standard: Af4Standard = useMemo(() => {
    return (
      AF4_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || AF4_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [hoveredTime, setHoveredTime] = useState<number | null>(null);

  // Trigger audio on standard change
  useEffect(() => {
    sound.playAf4CrossFlowChannelHiss?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateAf4Experiment(standard, 140);
  }, [standard]);

  // SVG plot settings for Fractogram
  const svgWidth = 840;
  const svgHeight = 320;
  const padding = { top: 30, right: 65, bottom: 50, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxTime = 25.0; // minutes
  const maxUV = Math.max(1.1, ...simulation.fractogramPoints.map((p) => p.uvAbsorbance280)) * 1.15;
  const maxLS = Math.max(1.1, ...simulation.fractogramPoints.map((p) => p.multiAngleLs90Deg)) * 1.15;
  const maxCrossFlow = Math.max(1.6, standard.crossFlowRateMlPerMin * 1.2);

  const getX = (t: number) => padding.left + (t / maxTime) * plotWidth;
  const getY_UV = (uv: number) => padding.top + plotHeight - (uv / maxUV) * plotHeight;
  const getY_LS = (ls: number) => padding.top + plotHeight - (ls / maxLS) * plotHeight;
  const getY_CrossFlow = (cf: number) => padding.top + plotHeight - (cf / maxCrossFlow) * plotHeight;

  // Path generators
  const uvPath = useMemo(() => {
    return simulation.fractogramPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.timeMinutes);
      const y = getY_UV(pt.uvAbsorbance280);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxUV]);

  const lsPath = useMemo(() => {
    return simulation.fractogramPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.timeMinutes);
      const y = getY_LS(pt.multiAngleLs90Deg);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxLS]);

  const crossFlowPath = useMemo(() => {
    return simulation.fractogramPoints.reduce((acc, pt, idx) => {
      const x = getX(pt.timeMinutes);
      const y = getY_CrossFlow(pt.crossFlowRateMlPerMin);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxCrossFlow]);

  const hoveredPoint = useMemo(() => {
    if (hoveredTime === null) return null;
    return simulation.fractogramPoints.reduce((prev, curr) => {
      return Math.abs(curr.timeMinutes - hoveredTime) < Math.abs(prev.timeMinutes - hoveredTime)
        ? curr
        : prev;
    }, simulation.fractogramPoints[0]);
  }, [hoveredTime, simulation]);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-navy-dark/90 border border-emerald-500/30 rounded-2xl text-ivory shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
            <Layers className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Sắc Ký Dòng Chảy Trường Bất Đối Xứng (AF4) & Phân Tách Nano (J. Calvin Giddings)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold">
                Kênh Mở Siêu Cắt Thấp / ISO 13321
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5 font-mono">
              Phân tách hạt nano lipid mRNA · Kháng thể đa tụ · Exosome · Cầu nối Vật lý 10 Dòng chảy tầng & Hóa học 12 Hệ phân tán keo
            </p>
          </div>
        </div>

        {/* Global Key Stats Pill */}
        <div className="flex items-center gap-2 sm:gap-4 bg-navy-base/80 px-4 py-2 rounded-xl border border-emerald-500/30">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-emerald-400/80">Kênh Dòng Chảy (w)</div>
            <div className="text-sm font-black text-emerald-300 font-mono">
              {standard.channelThicknessMicrons} µm
            </div>
          </div>
          <div className="w-px h-6 bg-navy-light/60" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-cyan-400/80">Dòng Chéo (V_c)</div>
            <div className="text-sm font-black text-cyan-300 font-mono">
              {standard.crossFlowRateMlPerMin} mL/phút
            </div>
          </div>
          <div className="w-px h-6 bg-navy-light/60" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-amber-400/80">Hiệu Suất Thu Hồi</div>
            <div className="text-sm font-black text-amber-300 font-mono">
              {simulation.hydrodynamicRecoveryPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Standard Selector Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {AF4_STANDARD_CATALOG.map((st) => {
          const isSelected = st.id === selectedStandardId;
          return (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStandardId(st.id);
                sound.playAf4CrossFlowChannelHiss?.();
              }}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-emerald-950/50 border-emerald-400 shadow-lg shadow-emerald-500/10'
                  : 'bg-navy-base/60 border-navy-light/40 hover:border-emerald-500/40 hover:bg-navy-base/80 text-ivory-muted'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-emerald-400 animate-ping" />
              )}
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/90 font-bold mb-1">
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
            setActiveSubTab('FRACTOGRAM_RUN');
            sound.playAf4CrossFlowChannelHiss?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'FRACTOGRAM_RUN'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Biểu Đồ Sắc Phổ Fractogram (UV / LS90 / Dòng Chéo)
        </button>
        <button
          onClick={() => {
            setActiveSubTab('CHANNEL_DYNAMICS');
            sound.playAf4CrossFlowChannelHiss?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'CHANNEL_DYNAMICS'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Động Học Kênh Dòng Parabol & Màng Bán Thấm
        </button>
        <button
          onClick={() => {
            setActiveSubTab('SPECIES_SIZING');
            sound.playHydrodynamicRadiusPeakChime?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'SPECIES_SIZING'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Phân Tách Hạt Nano & Bán Kính Thủy Động (R_h)
        </button>
        <button
          onClick={() => {
            setActiveSubTab('THEORY_CURRICULUM');
            sound.playAf4CrossFlowChannelHiss?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'THEORY_CURRICULUM'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Nguyên Lý Giddings FFF & Chuẩn GDPT 2018
        </button>
      </div>

      {/* Subtab 1: Fractogram Run */}
      {activeSubTab === 'FRACTOGRAM_RUN' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-4 rounded-xl border border-navy-light/50">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Sắc Ký Dòng Kênh AF4 (Lưu Giữ: Hạt Nhỏ Rửa Giải Trước, Hạt Lớn Rửa Giải Sau)
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-300">Độ Hấp Thụ UV 280 nm</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-cyan-400 rounded-full" />
                  <span className="text-cyan-300">Tán Xạ Ánh Sáng 90° (MALS)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-amber-400 border-b border-dashed" />
                  <span className="text-amber-300">Giảm Dòng Chéo V_c (mL/min)</span>
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
                <defs>
                  <linearGradient id="uvFillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="lsFillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[0, 5, 10, 15, 20, 25].map((t) => (
                  <g key={`grid-x-${t}`}>
                    <line
                      x1={getX(t)}
                      y1={padding.top}
                      x2={getX(t)}
                      y2={padding.top + plotHeight}
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={getX(t)}
                      y={padding.top + plotHeight + 18}
                      fill="#94a3b8"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {t} min
                    </text>
                  </g>
                ))}

                {[0.2, 0.4, 0.6, 0.8, 1.0].map((frac) => {
                  const y = padding.top + plotHeight - frac * plotHeight;
                  return (
                    <g key={`grid-y-${frac}`}>
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
                        {(frac * maxUV).toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Focusing Zone Shading */}
                <rect
                  x={padding.left}
                  y={padding.top}
                  width={getX(standard.focusingTimeMinutes) - padding.left}
                  height={plotHeight}
                  fill="rgba(56, 189, 248, 0.08)"
                />
                <text
                  x={padding.left + (getX(standard.focusingTimeMinutes) - padding.left) / 2}
                  y={padding.top + 20}
                  fill="#38bdf8"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Hội Tụ ({standard.focusingTimeMinutes}m)
                </text>

                {/* Primary Curves */}
                <path d={uvPath} fill="none" stroke="#10b981" strokeWidth="2.5" />
                <path d={lsPath} fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
                <path
                  d={crossFlowPath}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.8"
                  strokeDasharray="2 2"
                />

                {/* Peak Label Tags */}
                {standard.speciesList.map((sp, idx) => {
                  const tr = calculateAf4RetentionTimeMinutes(
                    sp.nominalHydrodynamicRadiusNm,
                    standard.crossFlowRateMlPerMin,
                    standard.detectorFlowRateMlPerMin,
                    standard.channelThicknessMicrons
                  );
                  if (tr > maxTime) return null;
                  const x = getX(tr);
                  const y = getY_UV(sp.peakFractionPercent / 100.0);
                  return (
                    <g key={`peak-tag-${idx}`}>
                      <circle cx={x} cy={y} r="4" fill="#10b981" stroke="#042f2e" strokeWidth="1.5" />
                      <line
                        x1={x}
                        y1={y - 5}
                        x2={x}
                        y2={y - 22}
                        stroke="#10b981"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <rect
                        x={x - 45}
                        y={y - 36}
                        width="90"
                        height="16"
                        rx="4"
                        fill="#064e3b"
                        stroke="#10b981"
                        strokeWidth="0.8"
                      />
                      <text
                        x={x}
                        y={y - 25}
                        fill="#6ee7b7"
                        fontSize="8.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {sp.name} ({sp.nominalDiameterNm} nm)
                      </text>
                    </g>
                  );
                })}

                {/* Interactive Scrub Cursor */}
                {hoveredPoint && (
                  <g>
                    <line
                      x1={getX(hoveredPoint.timeMinutes)}
                      y1={padding.top}
                      x2={getX(hoveredPoint.timeMinutes)}
                      y2={padding.top + plotHeight}
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={getX(hoveredPoint.timeMinutes)}
                      cy={getY_UV(hoveredPoint.uvAbsorbance280)}
                      r="4.5"
                      fill="#f43f5e"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Live Hover Readout Panel */}
            {hoveredPoint ? (
              <div className="mt-3 p-3 rounded-lg bg-navy-dark/90 border border-emerald-500/40 grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
                <div>
                  <span className="text-ivory-muted text-[10px] block">Thời Gian Lưu (t)</span>
                  <span className="text-emerald-300 font-bold">{hoveredPoint.timeMinutes} phút</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Độ Hấp Thụ UV 280</span>
                  <span className="text-white font-bold">{hoveredPoint.uvAbsorbance280.toFixed(3)} AU</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Tín Hiệu MALS 90°</span>
                  <span className="text-cyan-300 font-bold">{hoveredPoint.multiAngleLs90Deg.toFixed(3)} V</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Dòng Chéo Tức Thời (V_c)</span>
                  <span className="text-amber-300 font-bold">{hoveredPoint.crossFlowRateMlPerMin} mL/phút</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Bán Kính Thủy Động (R_h)</span>
                  <span className="text-purple-300 font-bold">
                    {hoveredPoint.instantaneousRhNm > 0 ? `${hoveredPoint.instantaneousRhNm} nm` : 'Đệm/Vùng Hội Tụ'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-3 p-2 text-center text-xs text-ivory-muted font-mono italic">
                Di chuột trên biểu đồ để xem thông số phân tách tức thời (UV / MALS / V_c / R_h)
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtab 2: Channel Dynamics */}
      {activeSubTab === 'CHANNEL_DYNAMICS' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-5 rounded-xl border border-navy-light/50">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              Sơ Đồ Kênh Phân Tách AF4: Dòng Chảy Tầng Parabol & Độ Nâng Độ Cao Khuếch Tán (l = D / U)
            </h3>
            <p className="text-xs text-ivory-muted leading-relaxed mb-4">
              Khác với sắc ký cột (SEC) có hạt nhồi gây ma sát cắt đứt RNA hay bọng lipid, AF4 diễn ra trong kênh phẳng mở hẹp (w ~ 350 µm).
              Dòng chảy mang vận tốc cực đại ở giữa kênh và bằng 0 ở thành (phân bố parabol Poiseuille). Lực đẩy của dòng chéo (V_c) ép hạt về màng tích lũy,
              trong khi khuếch tán nhiệt Brown đẩy hạt ngược lại vào dòng chảy nhanh hơn. Hạt nhỏ khuếch tán mạnh hơn, trôi nhanh hơn và rửa giải sớm!
            </p>

            {/* Visual Cross-Section Diagram of AF4 Channel */}
            <div className="p-4 rounded-xl bg-navy-dark/90 border border-emerald-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono border-b border-navy-light/40 pb-2">
                <span className="text-blue-300 font-bold">Thành Trên Không Thấm Nước (Upper Impermeable Wall)</span>
                <span className="text-ivory-muted">Độ Dày Kênh w = {standard.channelThicknessMicrons} µm</span>
              </div>

              {/* Dynamic Channel Representation */}
              <div className="relative h-44 bg-gradient-to-b from-navy-base to-emerald-950/20 border-x border-emerald-500/20 rounded-lg overflow-hidden flex flex-col justify-between p-3">
                {/* Parabolic Velocity Profile Streamlines */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-full flex flex-col justify-between h-full py-2">
                    <div className="h-0.5 bg-cyan-400 w-1/4 rounded-full ml-2" />
                    <div className="h-0.5 bg-cyan-400 w-2/3 rounded-full ml-2" />
                    <div className="h-1 bg-cyan-300 w-11/12 rounded-full ml-2 shadow-sm" />
                    <div className="h-0.5 bg-cyan-400 w-2/3 rounded-full ml-2" />
                    <div className="h-0.5 bg-cyan-400 w-1/4 rounded-full ml-2" />
                  </div>
                </div>

                {/* Top Flow Vector */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 z-10">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Dòng Kênh Parabol (Laminar Channel Flow v(x) = 6⟨v⟩(x/w)(1 - x/w))</span>
                </div>

                {/* Particle Elevation Layers Simulation */}
                <div className="flex items-center justify-around z-10 my-auto">
                  {standard.speciesList.map((sp, idx) => {
                    // Elevation l is inversely proportional to radius
                    const normElev = Math.max(12, Math.min(85, 120 / (sp.nominalHydrodynamicRadiusNm * 0.4 + 1)));
                    return (
                      <div
                        key={`channel-sp-${idx}`}
                        className="flex flex-col items-center group relative cursor-pointer"
                        style={{ transform: `translateY(${-normElev * 0.3}px)` }}
                        onClick={() => sound.playHydrodynamicRadiusPeakChime?.()}
                      >
                        <div
                          className="rounded-full shadow-lg border flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                          style={{
                            width: `${Math.max(16, Math.min(48, sp.nominalDiameterNm * 0.35))}px`,
                            height: `${Math.max(16, Math.min(48, sp.nominalDiameterNm * 0.35))}px`,
                            backgroundColor: idx === 0 ? '#10b981' : idx === 1 ? '#06b6d4' : '#a855f7',
                            borderColor: '#ffffff',
                          }}
                        />
                        <span className="text-[10px] font-mono font-bold text-white mt-1 bg-navy-dark/80 px-1.5 py-0.5 rounded border border-white/20">
                          {sp.name}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-300">
                          R_h = {sp.nominalHydrodynamicRadiusNm} nm
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Membrane Barrier */}
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-300/90 border-t border-dashed border-amber-500/50 pt-1 z-10">
                  <span>Màng Siêu Lọc Tích Lũy (Accumulation Wall Membrane 10 kDa MWCO - RC/PES)</span>
                  <span>Dòng Chéo Thấm Ra Ngoài ↓ V_c = {standard.crossFlowRateMlPerMin} mL/phút</span>
                </div>
              </div>

              {/* Physical Comparison Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-navy-base/60 border border-emerald-500/30">
                  <div className="text-emerald-400 font-bold mb-1">
                    Định Luật Lưu Giữ FFF (Normal Mode):
                  </div>
                  <div className="text-ivory-muted text-[11px] leading-relaxed">
                    t_r = (π · η · w² · L / k_B·T) · (V_c / V_out) · R_h
                    <br />
                    Thời gian lưu t_r tỉ lệ THUẬN TUYỆT ĐỐI với bán kính thủy động R_h. Hạt nhỏ khuếch tán cao hơn (l lớn hơn) nên trôi nhanh hơn!
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-navy-base/60 border border-cyan-500/30">
                  <div className="text-cyan-400 font-bold mb-1">
                    Ưu Thế Vượt Trội So Với Cột Sắc Ký Rây Kích Thước SEC:
                  </div>
                  <div className="text-ivory-muted text-[11px] leading-relaxed">
                    Không có giá thể hạt nhồi (stationary phase-free) → Ứng suất cắt gần như bằng 0, không gây vỡ hạt mRNA LNP, không làm biến dạng túi màng sinh học Exosome.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Species Sizing */}
      {activeSubTab === 'SPECIES_SIZING' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-5 rounded-xl border border-navy-light/50">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              Bảng Phân Bố Thành Phần Hạt Nano Trong Mẫu ({standard.vietnameseName})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-navy-light/50 text-ivory-muted bg-navy-dark/40">
                    <th className="py-2.5 px-3">Phân Tử / Hạt Nano</th>
                    <th className="py-2.5 px-3">Bán Kính Thủy Động (R_h)</th>
                    <th className="py-2.5 px-3">Đường Kính Thủy Động</th>
                    <th className="py-2.5 px-3">Hệ Số Khuếch Tán (D)</th>
                    <th className="py-2.5 px-3">Thời Gian Lưu (t_r)</th>
                    <th className="py-2.5 px-3">Tỉ Lệ Đỉnh (%)</th>
                    <th className="py-2.5 px-3">Ý Nghĩa Sinh Học / Kiểm Nghiệm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/30">
                  {standard.speciesList.map((sp, idx) => {
                    const tr = calculateAf4RetentionTimeMinutes(
                      sp.nominalHydrodynamicRadiusNm,
                      standard.crossFlowRateMlPerMin,
                      standard.detectorFlowRateMlPerMin,
                      standard.channelThicknessMicrons
                    );
                    return (
                      <tr
                        key={`sp-row-${idx}`}
                        className="hover:bg-emerald-950/30 transition-colors cursor-pointer"
                        onClick={() => sound.playHydrodynamicRadiusPeakChime?.()}
                      >
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          {sp.name}
                        </td>
                        <td className="py-2.5 px-3 text-emerald-300 font-bold">
                          {sp.nominalHydrodynamicRadiusNm.toFixed(1)} nm
                        </td>
                        <td className="py-2.5 px-3 text-cyan-300">
                          {sp.nominalDiameterNm.toFixed(1)} nm
                        </td>
                        <td className="py-2.5 px-3 text-purple-300">
                          {sp.apparentDiffusionCoeffM2PerS.toExponential(2)} m²/s
                        </td>
                        <td className="py-2.5 px-3 text-amber-300 font-bold">
                          {tr.toFixed(2)} phút
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{sp.peakFractionPercent}%</span>
                            <div className="w-16 h-2 rounded-full bg-navy-dark overflow-hidden">
                              <div
                                className="h-full bg-emerald-400 rounded-full"
                                style={{ width: `${sp.peakFractionPercent}%` }}
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
          <div className="p-5 rounded-xl bg-navy-base/80 border border-emerald-500/30 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Nguyên Lý FFF Của J. Calvin Giddings (1966 - Hiện Đại)
              </h3>
            </div>
            <div className="text-xs text-ivory-muted leading-relaxed space-y-2 font-mono">
              <p>
                <strong className="text-white">1. Kênh Phẳng Hở Ribbon:</strong> AF4 loại bỏ hoàn toàn ma sát và lực cắt cơ học của các cột nhồi sắc ký (SEC/GPC). Nhờ đó, các hạt nano lipid mRNA, virus vector (AAV), protein siêu lớn (vWF) và túi ngoại bào (exosome) được giữ nguyên vẹn 100%.
              </p>
              <p>
                <strong className="text-white">2. Phương Trình Stokes-Einstein:</strong> Hệ số khuếch tán tịnh tiến:
                <br />
                <span className="text-emerald-300 font-bold block my-1">
                  D = (k_B · T) / (6 · π · η · R_h)
                </span>
                Hạt nano càng nhỏ có D càng lớn, vươn cao hơn vào luồng dòng chảy nhanh ở tâm kênh ribbon.
              </p>
              <p>
                <strong className="text-white">3. Độ Lưu Giữ Tỷ Lệ:</strong> Khác biệt cốt lõi với SEC (vốn rửa giải hạt lớn trước): Trong chế độ AF4 thông thường (Normal FFF), thời gian lưu t_r tỷ lệ thuận trực tiếp với bán kính thủy động:
                <br />
                <span className="text-cyan-300 font-bold block my-1">
                  t_r ∝ R_h
                </span>
                Cho phép xác định phân bố kích thước tuyệt đối khi ghép nối với đầu dò tán xạ ánh sáng đa góc (MALS).
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
                <strong className="text-white">Vật Lý 10 (Chương Động Lực Học Chất Lưu):</strong>
                <br />
                - Dòng chảy tầng (laminar flow) tuân theo định luật Poiseuille với phân bố vận tốc dạng parabol đối xứng.
                <br />
                - Chuyển động Brown của hạt vi mô chịu lực cản nhớt Stokes F = 6πηrv.
              </p>
              <p>
                <strong className="text-white">Hóa Học 12 (Chương Hệ Phân Tán Keo & Lipid):</strong>
                <br />
                - Bản chất hệ keo nano (nanocolloid) với kích thước từ 1 nm đến 100 nm.
                <br />
                - Cấu trúc hạt nano lipid (LNP) màng kép phospholipid bọc vật liệu di truyền mRNA.
                <br />
                - Hiện tượng khuếch tán qua màng siêu lọc bán thấm (ultrafiltration membrane).
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
