import React, { useState, useMemo, useEffect } from 'react';
import {
  FCS_STANDARD_CATALOG,
  FcsStandard,
  simulateFcsExperiment,
  calculateFcsConfocalVolumeFemtoliters,
  calculateFcsDiffusionCoeffM2PerS,
  calculateFcsDiffusionTimeMicrosec,
} from '../../domain/fcsEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sparkles,
  Activity,
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
} from 'lucide-react';

interface FcsVisualizerProps {
  initialStandardId?: string;
}

export const FcsVisualizer: React.FC<FcsVisualizerProps> = ({
  initialStandardId = 'rhodamine_6g_primary_calibrant',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'CORRELATION_G_TAU' | 'CONFOCAL_VOLUME_3D' | 'MOLECULAR_BRIGHTNESS' | 'THEORY_CURRICULUM'
  >('CORRELATION_G_TAU');

  const standard: FcsStandard = useMemo(() => {
    return (
      FCS_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || FCS_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [hoveredTau, setHoveredTau] = useState<number | null>(null);

  // Trigger audio on standard switch
  useEffect(() => {
    sound.playAutocorrelationDiffusionChime?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateFcsExperiment(standard, 110);
  }, [standard]);

  // SVG plot settings for Semi-Logarithmic G(tau) Curve
  const svgWidth = 840;
  const svgHeight = 320;
  const padding = { top: 30, right: 45, bottom: 50, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Logarithmic axis: 0.2 us (log = -0.7) to 1,000,000 us (log = 6.0)
  const minLog = Math.log10(0.2);
  const maxLog = Math.log10(1000000);
  const maxG = Math.max(0.9, ...simulation.correlationCurvePoints.map((p) => p.correlationG)) * 1.15;

  const getX = (tauUs: number) => {
    const logTau = Math.log10(Math.max(0.2, tauUs));
    return padding.left + ((logTau - minLog) / (maxLog - minLog)) * plotWidth;
  };

  const getY = (g: number) => {
    return padding.top + plotHeight - (Math.max(0, g) / maxG) * plotHeight;
  };

  // Paths
  const gPath = useMemo(() => {
    return simulation.correlationCurvePoints.reduce((acc, pt, idx) => {
      const x = getX(pt.lagTimeMicrosec);
      const y = getY(pt.correlationG);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxG]);

  const pureDiffPath = useMemo(() => {
    return simulation.correlationCurvePoints.reduce((acc, pt, idx) => {
      const x = getX(pt.lagTimeMicrosec);
      const y = getY(pt.tripletFreeCorrelationG);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxG]);

  const hoveredPoint = useMemo(() => {
    if (hoveredTau === null) return null;
    return simulation.correlationCurvePoints.reduce((prev, curr) => {
      return Math.abs(curr.lagTimeMicrosec - hoveredTau) < Math.abs(prev.lagTimeMicrosec - hoveredTau)
        ? curr
        : prev;
    }, simulation.correlationCurvePoints[0]);
  }, [hoveredTau, simulation]);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-navy-dark/90 border border-fuchsia-500/30 rounded-2xl text-ivory shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-300">
            <Focus className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Quang Phổ Tương Quan Huỳnh Quang FCS (Magde, Elson & Webb 1972)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-500/40 font-bold">
                Kính Hiển Vi Đồng Tiêu Confocal / Femtoliter V_eff
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5 font-mono">
              Dao động huỳnh quang đơn phân tử · Thời gian lưu tau_D · Độ sáng đơn phân tử (kHz/phân tử) · Nồng độ tuyệt đối picomolar
            </p>
          </div>
        </div>

        {/* Global Key Metrics Pill */}
        <div className="flex items-center gap-2 sm:gap-4 bg-navy-base/80 px-4 py-2 rounded-xl border border-fuchsia-500/30">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-fuchsia-400/80">Thể Tích Tiêu Điểm (V_eff)</div>
            <div className="text-sm font-black text-fuchsia-300 font-mono">
              {simulation.confocalVolumeFemtoliters} fL
            </div>
          </div>
          <div className="w-px h-6 bg-navy-light/60" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-cyan-400/80">Số Hạt Trung Bình (N)</div>
            <div className="text-sm font-black text-cyan-300 font-mono">
              {simulation.meanParticleNumberN} hạt
            </div>
          </div>
          <div className="w-px h-6 bg-navy-light/60" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-amber-400/80">Độ Sáng Đơn Phân Tử</div>
            <div className="text-sm font-black text-amber-300 font-mono">
              {simulation.apparentMolecularBrightnessKhz} kHz/hạt
            </div>
          </div>
        </div>
      </div>

      {/* Standard Selector Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {FCS_STANDARD_CATALOG.map((st) => {
          const isSelected = st.id === selectedStandardId;
          return (
            <button
              key={st.id}
              onClick={() => {
                setSelectedStandardId(st.id);
                sound.playAutocorrelationDiffusionChime?.();
              }}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-fuchsia-950/50 border-fuchsia-400 shadow-lg shadow-fuchsia-500/10'
                  : 'bg-navy-base/60 border-navy-light/40 hover:border-fuchsia-500/40 hover:bg-navy-base/80 text-ivory-muted'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-2 h-2 rounded-bl bg-fuchsia-400 animate-ping" />
              )}
              <div className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-400/90 font-bold mb-1">
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
            setActiveSubTab('CORRELATION_G_TAU');
            sound.playAutocorrelationDiffusionChime?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'CORRELATION_G_TAU'
              ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Đường Cong Tự Tương Quan G(τ) & Trạng Thái Triplet
        </button>
        <button
          onClick={() => {
            setActiveSubTab('CONFOCAL_VOLUME_3D');
            sound.playAutocorrelationDiffusionChime?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'CONFOCAL_VOLUME_3D'
              ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Focus className="w-3.5 h-3.5" />
          Thể Tích Tiêu Điểm Đồng Tiêu (Confocal Volume 3D)
        </button>
        <button
          onClick={() => {
            setActiveSubTab('MOLECULAR_BRIGHTNESS');
            sound.playFcsConfocalSinglePhotonClick?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'MOLECULAR_BRIGHTNESS'
              ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Độ Sáng Đơn Phân Tử (η) & Phân Tích Dimer Hóa
        </button>
        <button
          onClick={() => {
            setActiveSubTab('THEORY_CURRICULUM');
            sound.playAutocorrelationDiffusionChime?.();
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
            activeSubTab === 'THEORY_CURRICULUM'
              ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/60 shadow-sm'
              : 'text-ivory-muted border-transparent hover:text-ivory hover:bg-navy-light/30'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Nguyên Lý Magde-Elson-Webb & GDPT 2018
        </button>
      </div>

      {/* Subtab 1: Correlation Curve G(tau) */}
      {activeSubTab === 'CORRELATION_G_TAU' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-4 rounded-xl border border-navy-light/50">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Đường Cong Tự Tương Quan G(τ) [Trục Hoành Logarit: 0.2 µs → 1,000,000 µs]
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-fuchsia-400 rounded-full" />
                  <span className="text-fuchsia-300">Tổng Tương Quan G(τ) (Triplet + Khuếch Tán)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-cyan-400 rounded-full border-b border-dashed" />
                  <span className="text-cyan-300">Chỉ Khuếch Tán Thuần Túy 3D Brownian</span>
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
                    const frac = (svgX - padding.left) / plotWidth;
                    const logT = minLog + frac * (maxLog - minLog);
                    setHoveredTau(Math.pow(10, logT));
                  }
                }}
                onMouseLeave={() => setHoveredTau(null)}
              >
                {/* Horizontal Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((frac) => {
                  const y = padding.top + plotHeight - frac * plotHeight;
                  return (
                    <g key={`fcs-grid-y-${frac}`}>
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
                        {(frac * maxG).toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Logarithmic Decade Markers */}
                {[1, 10, 100, 1000, 10000, 100000].map((val) => {
                  const x = getX(val);
                  return (
                    <g key={`fcs-log-x-${val}`}>
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
                        fontSize="9"
                        textAnchor="middle"
                      >
                        {val >= 1000 ? `${val / 1000} ms` : `${val} µs`}
                      </text>
                    </g>
                  );
                })}

                {/* G(0) = 1/N line */}
                <line
                  x1={padding.left}
                  y1={getY(1.0 / simulation.meanParticleNumberN)}
                  x2={padding.left + 50}
                  y2={getY(1.0 / simulation.meanParticleNumberN)}
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <text
                  x={padding.left + 55}
                  y={getY(1.0 / simulation.meanParticleNumberN) + 3}
                  fill="#fbbf24"
                  fontSize="8.5"
                  fontWeight="bold"
                >
                  G(0) = 1/N = {(1.0 / simulation.meanParticleNumberN).toFixed(2)}
                </text>

                {/* Diffusion Time tau_D Inflection Markers */}
                {standard.speciesList.map((sp, idx) => {
                  const tauD = sp.characteristicDiffusionTimeMicrosec;
                  const x = getX(tauD);
                  return (
                    <g key={`tauD-marker-${idx}`}>
                      <line
                        x1={x}
                        y1={padding.top + 30}
                        x2={x}
                        y2={padding.top + plotHeight}
                        stroke="#f472b6"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                      <text
                        x={x}
                        y={padding.top + 26}
                        fill="#f472b6"
                        fontSize="8.5"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        τ_D = {tauD.toFixed(1)} µs
                      </text>
                    </g>
                  );
                })}

                {/* Primary Curves */}
                <path d={pureDiffPath} fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />
                <path d={gPath} fill="none" stroke="#e879f9" strokeWidth="2.5" />

                {/* Interactive Scrub Cursor */}
                {hoveredPoint && (
                  <g>
                    <line
                      x1={getX(hoveredPoint.lagTimeMicrosec)}
                      y1={padding.top}
                      x2={getX(hoveredPoint.lagTimeMicrosec)}
                      y2={padding.top + plotHeight}
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={getX(hoveredPoint.lagTimeMicrosec)}
                      cy={getY(hoveredPoint.correlationG)}
                      r="4.5"
                      fill="#e879f9"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Live Hover Readout Panel */}
            {hoveredPoint ? (
              <div className="mt-3 p-3 rounded-lg bg-navy-dark/90 border border-fuchsia-500/40 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div>
                  <span className="text-ivory-muted text-[10px] block">Thời Gian Trễ (τ)</span>
                  <span className="text-fuchsia-300 font-bold">
                    {hoveredPoint.lagTimeMicrosec >= 1000
                      ? `${(hoveredPoint.lagTimeMicrosec / 1000).toFixed(2)} ms`
                      : `${hoveredPoint.lagTimeMicrosec} µs`}
                  </span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Hàm Tương Quan G(τ)</span>
                  <span className="text-white font-bold">{hoveredPoint.correlationG.toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Thành Phần Khuếch Tán Thuần</span>
                  <span className="text-cyan-300 font-bold">{hoveredPoint.tripletFreeCorrelationG.toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-ivory-muted text-[10px] block">Nồng Độ Dung Dịch Tuyệt Đối</span>
                  <span className="text-amber-300 font-bold">{simulation.absoluteConcentrationNanomolar} nM</span>
                </div>
              </div>
            ) : (
              <div className="mt-3 p-2 text-center text-xs text-ivory-muted font-mono italic">
                Di chuột trên đồ thị tương quan để xem phân tích trạng thái Triplet và động học khuếch tán tức thời
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtab 2: Confocal Volume 3D */}
      {activeSubTab === 'CONFOCAL_VOLUME_3D' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-5 rounded-xl border border-navy-light/50">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Focus className="w-4 h-4 text-fuchsia-400" />
              Hình Học Tiêu Điểm Đồng Tiêu 3D Gaussian (w₀ = {standard.confocalWaistNm} nm, z₀ = {standard.confocalAxialRadiusNm} nm)
            </h3>
            <p className="text-xs text-ivory-muted leading-relaxed mb-4">
              Chùm tia laser hội tụ qua vật kính kính hiển vi ngâm dầu (NA ≥ 1.2) tạo thành một khối elip 3D siêu nhỏ (thể tích chỉ ~0.29 femtoliter, tương đương 0.29 × 10⁻¹⁵ L).
              Tại bất kỳ thời điểm nào, chỉ có trung bình N ≈ {simulation.meanParticleNumberN} phân tử huỳnh quang hiện diện trong tiêu điểm.
              Khi một phân tử bơi qua, nó phát ra một chuỗi photon cường độ cao (photon burst) trước khi khuếch tán ra ngoài.
            </p>

            {/* 3D Focal Volume Representation */}
            <div className="p-4 rounded-xl bg-navy-dark/90 border border-fuchsia-500/30 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono border-b border-navy-light/40 pb-2">
                <span className="text-fuchsia-300 font-bold">Chùm Tia Kích Thích Laser: λ = {standard.laserExcitationWavelengthNm} nm</span>
                <span className="text-cyan-300 font-bold">Công Suất P = {standard.laserPowerMicroWatts} µW</span>
              </div>

              {/* Ellipsoid Diagram */}
              <div className="relative h-48 bg-gradient-to-b from-navy-base via-fuchsia-950/20 to-navy-base border border-fuchsia-500/20 rounded-lg overflow-hidden flex items-center justify-center p-3">
                {/* Laser Cones */}
                <div className="absolute inset-x-0 h-full flex justify-between pointer-events-none opacity-20">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-fuchsia-500 clip-cone" />
                  <div className="w-1/2 h-full bg-gradient-to-l from-transparent to-fuchsia-500 clip-cone" />
                </div>

                {/* 3D Gaussian Confocal Ellipse */}
                <div className="relative w-36 h-40 rounded-[50%/60%] bg-gradient-to-r from-fuchsia-500/40 via-cyan-400/30 to-fuchsia-500/40 border-2 border-fuchsia-400 shadow-2xl shadow-fuchsia-500/30 flex items-center justify-center">
                  <div className="w-20 h-28 rounded-[50%/60%] bg-fuchsia-400/20 border border-cyan-300 flex items-center justify-center animate-pulse">
                    <div className="w-6 h-6 rounded-full bg-white shadow-lg shadow-white animate-ping" />
                  </div>

                  {/* Waist dimension label */}
                  <span className="absolute -bottom-5 text-[9px] font-mono text-cyan-300 font-bold">
                    2w₀ = {(standard.confocalWaistNm * 2).toFixed(0)} nm
                  </span>
                  {/* Axial dimension label */}
                  <span className="absolute -left-14 text-[9px] font-mono text-fuchsia-300 font-bold rotate-[-90deg]">
                    2z₀ = {(standard.confocalAxialRadiusNm * 2).toFixed(0)} nm
                  </span>
                </div>

                {/* Moving Fluorophore Trajectory */}
                <div className="absolute right-10 top-8 text-xs font-mono text-ivory-muted flex flex-col gap-1 z-10 bg-navy-dark/90 p-2.5 rounded-lg border border-fuchsia-500/30">
                  <span className="text-fuchsia-300 font-bold">Thông Số Tiêu Điểm:</span>
                  <span>• Bán kính ngang: w₀ = {standard.confocalWaistNm} nm</span>
                  <span>• Bán kính trục: z₀ = {standard.confocalAxialRadiusNm} nm</span>
                  <span>• Tham số cấu trúc: S = {(standard.confocalAxialRadiusNm / standard.confocalWaistNm).toFixed(1)}</span>
                  <span>• Thể tích V_eff = {simulation.confocalVolumeFemtoliters} fL</span>
                </div>
              </div>

              {/* Physical Comparison Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-navy-base/60 border border-fuchsia-500/30">
                  <div className="text-fuchsia-400 font-bold mb-1">
                    Thời Gian Lưu Trong Tiêu Điểm:
                  </div>
                  <div className="text-ivory-muted text-[11px] leading-relaxed">
                    τ_D = w₀² / (4 · D) = (3 · π · η · w₀² · R_h) / (2 · k_B · T)
                    <br />
                    Thời gian khuếch tán τ_D tỷ lệ thuận trực tiếp với bán kính hydrodynamic R_h. Phân tử càng to khuếch tán càng chậm và lưu lại trong tiêu điểm càng lâu!
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-navy-base/60 border border-cyan-500/30">
                  <div className="text-cyan-400 font-bold mb-1">
                    Độ Nhạy Phân Tích Cấp Độ Picomolar:
                  </div>
                  <div className="text-ivory-muted text-[11px] leading-relaxed">
                    Nhờ giới hạn thể tích hội tụ ở mức femtoliter (10⁻¹⁵ L), nồng độ chỉ 1 nM tương ứng đúng 0.6 phân tử trong thể tích quan sát, cho phép khảo sát chính xác tương tác sinh học ở nồng độ sinh lý cực loãng.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Molecular Brightness */}
      {activeSubTab === 'MOLECULAR_BRIGHTNESS' && (
        <div className="flex flex-col gap-4">
          <div className="bg-navy-base/80 p-5 rounded-xl border border-navy-light/50">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-fuchsia-400" />
              Bảng Động Học & Độ Sáng Đơn Phân Tử ({standard.vietnameseName})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-navy-light/50 text-ivory-muted bg-navy-dark/40">
                    <th className="py-2.5 px-3">Thành Phần Phân Tử</th>
                    <th className="py-2.5 px-3">Bán Kính Thủy Động (R_h)</th>
                    <th className="py-2.5 px-3">Hệ Số Khuếch Tán (D)</th>
                    <th className="py-2.5 px-3">Thời Gian Lưu (τ_D)</th>
                    <th className="py-2.5 px-3">Độ Sáng (η)</th>
                    <th className="py-2.5 px-3">Tỉ Lệ (%)</th>
                    <th className="py-2.5 px-3">Ý Nghĩa Cơ Chế Sinh Học</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/30">
                  {standard.speciesList.map((sp, idx) => {
                    return (
                      <tr
                        key={`fcs-sp-${idx}`}
                        className="hover:bg-fuchsia-950/30 transition-colors cursor-pointer"
                        onClick={() => sound.playFcsConfocalSinglePhotonClick?.()}
                      >
                        <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
                          {sp.name}
                        </td>
                        <td className="py-2.5 px-3 text-fuchsia-300 font-bold">
                          {sp.nominalHydrodynamicRadiusNm.toFixed(2)} nm
                        </td>
                        <td className="py-2.5 px-3 text-cyan-300">
                          {sp.apparentDiffusionCoeffM2PerS.toExponential(2)} m²/s
                        </td>
                        <td className="py-2.5 px-3 text-amber-300 font-bold">
                          {sp.characteristicDiffusionTimeMicrosec.toFixed(1)} µs
                        </td>
                        <td className="py-2.5 px-3 text-emerald-300 font-bold">
                          {sp.molecularBrightnessKhz.toFixed(1)} kHz/hạt
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{sp.fractionPercent}%</span>
                            <div className="w-16 h-2 rounded-full bg-navy-dark overflow-hidden">
                              <div
                                className="h-full bg-fuchsia-400 rounded-full"
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
          <div className="p-5 rounded-xl bg-navy-base/80 border border-fuchsia-500/30 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-fuchsia-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Nguyên Lý FCS (Douglas Magde, Elliot Elson & Watt Webb 1972)
              </h3>
            </div>
            <div className="text-xs text-ivory-muted leading-relaxed space-y-2 font-mono">
              <p>
                <strong className="text-white">1. Dao Động Huỳnh Quang Tự Phát:</strong> Thay vì đo tín hiệu trung bình của hàng tỷ phân tử, FCS phân tích thời gian thực các thăng giáng thô sơ delta F(t) sinh ra khi từng phân tử đơn lẻ bơi qua tiêu điểm quang học.
              </p>
              <p>
                <strong className="text-white">2. Phương Trình Tự Tương Quan 3D:</strong>
                <br />
                <span className="text-fuchsia-300 font-bold block my-1">
                  G(τ) = (1/N) · [1 / (1 + τ/τ_D)] · [1 / √(1 + (w₀/z₀)² · τ/τ_D)]
                </span>
                Tung độ gốc G(0) tỉ lệ nghịch với số hạt N, cho phép xác định nồng độ tuyệt đối mà không cần đường chuẩn.
              </p>
              <p>
                <strong className="text-white">3. Độ Sáng Đơn Phân Tử (Molecular Brightness):</strong> Cho phép xác định trạng thái oligomer hóa (đơn phân, nhị phân, tứ phân) độc lập hoàn toàn với hình dạng phân tử.
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
                <strong className="text-white">Vật Lý 12 (Lượng Tử Ánh Sáng & Quang Học Hiện Đại):</strong>
                <br />
                - Photon, năng lượng lượng tử ánh sáng E = h·f và hiện tượng huỳnh quang.
                <br />
                - Định luật Stokes: Bước sóng ánh sáng huỳnh quang phát xạ luôn lớn hơn bước sóng ánh sáng kích thích (λ_em {'>'} λ_ex).
                <br />
                - Giới hạn nhiễu xạ quang học Abbe và nguyên lý kính hiển vi đồng tiêu confocal.
              </p>
              <p>
                <strong className="text-white">Hóa Học 12 & Sinh Học 10 (Chất Đánh Dấu Huỳnh Quang):</strong>
                <br />
                - Thuốc nhuộm hữu cơ (Rhodamine, Cy5) và protein phát quang (GFP - Giải Nobel Hóa học 2008).
                <br />
                - Chấm lượng tử bán dẫn (Quantum Dots - Giải Nobel Hóa học 2023).
                <br />
                - Cơ chế dimer hóa thụ thể màng tế bào kích hoạt tín hiệu nội bào.
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
