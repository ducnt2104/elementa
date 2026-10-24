import React, { useState, useMemo, useEffect } from 'react';
import {
  AUC_STANDARD_CATALOG,
  AucStandard,
  simulateAucExperiment,
  calculateRelativeCentrifugalFieldG,
  calculateMolarMassFromSvedbergEquation,
} from '../../domain/aucEngine';
import { sound } from '../../audio/soundEngine';
import {
  RotateCcw,
  Activity,
  Layers,
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
} from 'lucide-react';

interface AucVisualizerProps {
  initialStandardId?: string;
}

export const AucVisualizer: React.FC<AucVisualizerProps> = ({
  initialStandardId = 'lysozyme_hewl_monomer_calibrant',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'RADIAL_SCANS' | 'CS_DISTRIBUTION' | 'SVEDBERG_EQUATION' | 'NOBEL_CURRICULUM'
  >('RADIAL_SCANS');

  const standard: AucStandard = useMemo(() => {
    return (
      AUC_STANDARD_CATALOG.find((s) => s.id === selectedStandardId) || AUC_STANDARD_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [hoveredRadius, setHoveredRadius] = useState<number | null>(null);

  // Play audio on standard selection
  useEffect(() => {
    sound.playSvedbergBoundaryMovementChirp?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateAucExperiment(standard, 5, 100);
  }, [standard]);

  // SVG plot settings for Radial Scans
  const svgWidth = 840;
  const svgHeight = 320;
  const padding = { top: 30, right: 35, bottom: 50, left: 65 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const rMin = simulation.meniscusRadiusCm; // 5.9 cm
  const rMax = simulation.bottomRadiusCm; // 7.2 cm
  const maxAbs = 1.15;

  const getX_Radius = (r: number) => {
    return padding.left + ((r - rMin) / (rMax - rMin)) * plotWidth;
  };

  const getY_Abs = (abs: number) => {
    return padding.top + plotHeight - (abs / maxAbs) * plotHeight;
  };

  // Color palette for time series scans
  const scanColors = ['#38bdf8', '#34d399', '#fbbf24', '#f97316', '#a855f7'];

  // Svedberg distribution plot settings
  const maxS = Math.max(...simulation.distributionCsPoints.map((p) => p.svedbergS));
  const maxCs = Math.max(...simulation.distributionCsPoints.map((p) => p.distributionCs)) * 1.15;

  const getX_S = (s: number) => {
    return padding.left + (s / maxS) * plotWidth;
  };

  const getY_Cs = (cs: number) => {
    return padding.top + plotHeight - (cs / maxCs) * plotHeight;
  };

  const csPath = useMemo(() => {
    return simulation.distributionCsPoints.reduce((acc, pt, idx) => {
      const x = getX_S(pt.svedbergS);
      const y = getY_Cs(pt.distributionCs);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxS, maxCs]);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-navy-dark/90 border border-blue-500/30 rounded-2xl text-ivory shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-300">
            <RotateCcw className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Siêu Ly Tâm Phân Tích AUC & Phương Trình Svedberg (1926 - 2026)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-950/80 text-blue-300 border border-blue-500/40 font-bold">
                Nobel Hóa Học Svedberg / SEDFIT
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5 font-mono">
              Tốc độ sa lắng SV-AUC · Cân bằng sa lắng SE-AUC · Phương trình vi phân Lamm · Phân bố c(s)
            </p>
          </div>
        </div>

        {/* Audio Test Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playUltracentrifugeRotorHum?.();
              sound.playSvedbergBoundaryMovementChirp?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/50 hover:bg-blue-900/60 border border-blue-500/40 text-blue-200 text-xs font-mono transition-colors shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Rotor Siêu Ly Tâm 60,000 RPM ⚡</span>
          </button>
        </div>
      </div>

      {/* Standard Selector Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-ivory-muted font-mono flex items-center gap-1 mr-1">
          <Target className="w-3.5 h-3.5 text-blue-400" /> Hệ Mẫu Sa Lắng AUC:
        </span>
        {AUC_STANDARD_CATALOG.map((std) => (
          <button
            key={std.id}
            onClick={() => {
              sound.playUiClick();
              setSelectedStandardId(std.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              selectedStandardId === std.id
                ? 'bg-blue-500 text-obsidian border-blue-300 font-extrabold shadow-md scale-105'
                : 'bg-navy-light/40 text-ivory hover:text-white border-navy-light/60 hover:border-blue-400/50'
            }`}
          >
            {std.name.split('(')[0].trim()}
          </button>
        ))}
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy-light/30 pb-2">
        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('RADIAL_SCANS');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'RADIAL_SCANS'
              ? 'bg-blue-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-4 h-4 text-blue-300" />
          <span>Quét Biên Sa Lắng Bán Kính (Radial Scans A280)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('CS_DISTRIBUTION');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'CS_DISTRIBUTION'
              ? 'bg-blue-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-blue-300" />
          <span>Phân Bố Hệ Số Sa Lắng c(s) SEDFIT</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('SVEDBERG_EQUATION');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'SVEDBERG_EQUATION'
              ? 'bg-blue-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Scale className="w-4 h-4 text-blue-300" />
          <span>Phương Trình Svedberg (Molar Mass M & f/f₀)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('NOBEL_CURRICULUM');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'NOBEL_CURRICULUM'
              ? 'bg-blue-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-4 h-4 text-blue-300" />
          <span>Kỷ Niệm 100 Năm Nobel & GDPT 2018</span>
        </button>
      </div>

      {/* TAB 1: RADIAL SCANS */}
      {activeSubTab === 'RADIAL_SCANS' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="relative w-full bg-navy/90 rounded-2xl border border-blue-500/30 p-4 shadow-inner overflow-hidden">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-ivory-muted mb-2">
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                Rotor: <strong className="text-white">{standard.rotorSpeedRpm.toLocaleString()} RPM</strong> ({simulation.centrifugalFieldMaxG.toLocaleString()} × g)
              </span>
              <span className="text-blue-300 font-bold">
                Bán Kính Sa Lắng: <strong className="text-white">{rMin} cm (Mặt khum Meniscus) → {rMax} cm (Đáy ống)</strong>
              </span>
            </div>

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const svgX = (mouseX / rect.width) * svgWidth;
                const ratio = Math.max(0, Math.min(1, (svgX - padding.left) / plotWidth));
                const r = rMin + ratio * (rMax - rMin);
                setHoveredRadius(Math.round(r * 1000) / 1000);
              }}
              onMouseLeave={() => setHoveredRadius(null)}
            >
              {/* Radial Grid lines */}
              {[6.0, 6.3, 6.6, 6.9, 7.2].map((rVal) => {
                const x = getX_Radius(rVal);
                return (
                  <g key={`r-grid-${rVal}`}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + plotHeight}
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={x}
                      y={padding.top + plotHeight + 18}
                      fill="#94a3b8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {rVal.toFixed(1)} cm
                    </text>
                  </g>
                );
              })}

              {/* Meniscus Line (Left Boundary) */}
              <line
                x1={getX_Radius(rMin)}
                y1={padding.top}
                x2={getX_Radius(rMin)}
                y2={padding.top + plotHeight}
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <text
                x={getX_Radius(rMin) + 4}
                y={padding.top + 16}
                fill="#38bdf8"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                Mặt khum (Meniscus)
              </text>

              {/* Cell Bottom Line (Right Boundary) */}
              <line
                x1={getX_Radius(rMax)}
                y1={padding.top}
                x2={getX_Radius(rMax)}
                y2={padding.top + plotHeight}
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <text
                x={getX_Radius(rMax) - 65}
                y={padding.top + 16}
                fill="#f43f5e"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                Đáy cuvette
              </text>

              {/* Radial scan curves for each time point */}
              {simulation.radialScans.map((scan, sIdx) => {
                const pathStr = scan.points.reduce((acc, pt, idx) => {
                  const x = getX_Radius(pt.radiusCm);
                  const y = getY_Abs(pt.concentrationAbs);
                  return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
                }, '');

                return (
                  <path
                    key={`scan-path-${sIdx}`}
                    d={pathStr}
                    fill="none"
                    stroke={scanColors[sIdx % scanColors.length]}
                    strokeWidth="2.0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              })}

              {/* Hover Cursor */}
              {hoveredRadius && (
                <line
                  x1={getX_Radius(hoveredRadius)}
                  y1={padding.top}
                  x2={getX_Radius(hoveredRadius)}
                  y2={padding.top + plotHeight}
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                />
              )}
            </svg>

            {/* Scans Time Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-ivory-muted px-2 mt-2">
              <div className="flex items-center gap-3">
                {simulation.radialScans.map((scan, sIdx) => (
                  <span key={`legend-time-${sIdx}`} className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-0.5 inline-block"
                      style={{ backgroundColor: scanColors[sIdx % scanColors.length] }}
                    />
                    <span>{scan.scanTimeMinutes} phút</span>
                  </span>
                ))}
              </div>
              <span className="text-blue-300 font-bold">Phương trình vi phân Lamm (dc/dt)</span>
            </div>
          </div>

          {/* Readout Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-navy/70 border border-blue-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Hệ Số Sa Lắng Trung Bình s</span>
              <span className="text-base font-bold text-white font-mono">
                {simulation.weightedAverageSvedberg} S (Svedberg)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-blue-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Khối Lượng Phân Tử Mw</span>
              <span className="text-base font-bold text-blue-300 font-mono">
                {simulation.overallMolarMassDa.toLocaleString()} Da
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-blue-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Tỷ Số Ma Sát f / f₀</span>
              <span className="text-base font-bold text-emerald-300 font-mono">
                {simulation.overallFrictionalRatio} (Hình học)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-blue-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Trường Ly Tâm Cực Đại</span>
              <span className="text-base font-bold text-amber-300 font-mono">
                {simulation.centrifugalFieldMaxG.toLocaleString()} × g
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: C(S) DISTRIBUTION */}
      {activeSubTab === 'CS_DISTRIBUTION' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-navy/80 rounded-2xl border border-blue-500/30 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-400" />
                Phổ Phân Bố Hệ Số Sa Lắng c(s) SEDFIT (Continuous Distribution)
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/40">
                1 S = 10⁻¹³ s
              </span>
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto select-none">
              {/* Axes lines */}
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <line
                x1={padding.left}
                y1={padding.top + plotHeight}
                x2={padding.left + plotWidth}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1.5"
              />

              {/* c(s) Distribution Path */}
              <path
                d={csPath}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Peak labels for species */}
              {standard.speciesList.map((sp, idx) => {
                const x = getX_S(sp.sedimentationCoeffSvedberg);
                return (
                  <g key={`cs-peak-${idx}`}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + plotHeight}
                      stroke="#fbbf24"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <circle cx={x} cy={padding.top + 35} r="4" fill="#fbbf24" />
                    <text
                      x={x + 5}
                      y={padding.top + 38}
                      fill="#fef08a"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {sp.name}: {sp.sedimentationCoeffSvedberg} S ({sp.peakFractionPercent}%)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Species table */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {standard.speciesList.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-navy-light/40 border border-blue-500/30 space-y-1 text-xs font-mono"
                >
                  <div className="font-bold text-white text-sm">{sp.name}</div>
                  <div className="flex justify-between text-ivory-muted">
                    <span>Hệ số sa lắng s:</span>
                    <strong className="text-blue-300">{sp.sedimentationCoeffSvedberg} S</strong>
                  </div>
                  <div className="flex justify-between text-ivory-muted">
                    <span>Khối lượng Mw:</span>
                    <strong className="text-white">{sp.molecularWeightDa.toLocaleString()} Da</strong>
                  </div>
                  <div className="flex justify-between text-ivory-muted">
                    <span>Tỷ số ma sát f/f₀:</span>
                    <strong className="text-emerald-300">{sp.frictionalRatioFOverF0}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SVEDBERG EQUATION */}
      {activeSubTab === 'SVEDBERG_EQUATION' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-navy/80 rounded-2xl border border-blue-500/30 p-4 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-400" />
              Phương Trình Svedberg (Theodor Svedberg 1926)
            </h3>

            <div className="p-3 bg-navy rounded-xl border border-navy-light/40 font-mono text-xs text-blue-200">
              M = (s · R · T) / [ D · (1 - v̄_p · ρ_dung_môi) ]
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              Phương trình Svedberg liên kết hệ số sa lắng thực nghiệm s, hệ số khuếch tán tịnh tiến D, và hệ số đẩy nổi
              Ác-si-mét (1 - v̄_p · ρ) để tính toán khối lượng phân tử tuyệt đối của protein mà không cần bất kỳ đường chuẩn nào.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-navy-light/40 border border-blue-500/20">
                <span className="text-ivory-muted block">Thể Tích Riêng v̄_p</span>
                <span className="text-base font-bold text-white">
                  {standard.partialSpecificVolumeCm3PerG} cm³/g
                </span>
              </div>
              <div className="p-3 rounded-xl bg-navy-light/40 border border-blue-500/20">
                <span className="text-ivory-muted block">Hệ Số Đẩy Nổi (1 - v̄·ρ)</span>
                <span className="text-base font-bold text-emerald-300">
                  {(1.0 - standard.partialSpecificVolumeCm3PerG * 0.9982).toFixed(4)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-navy-light/40 border border-blue-500/20">
                <span className="text-ivory-muted block">Tốc Độ Góc ω</span>
                <span className="text-base font-bold text-amber-300">
                  {simulation.angularVelocityRadPerSec} rad/s
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: NOBEL & CURRICULUM */}
      {activeSubTab === 'NOBEL_CURRICULUM' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy/80 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-300">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Giải Nobel Hóa Học 1926 (Theodor Svedberg Centenary)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {standard.description}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-light/40 border border-navy-light text-[11px] font-mono text-ivory-muted">
                <strong>Quy chuẩn & tài liệu:</strong> {standard.nobelIupacReference}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy/80 border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                <Award className="w-4 h-4 text-cyan-400" />
                Tích Hợp Chương Trình GDPT 2018 (Vật Lý & Hóa Học)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {standard.curriculumNotes}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-light/40 border border-navy-light text-[11px] font-mono text-ivory-muted">
                <strong>Hệ đệm phân tích:</strong> {standard.carrierBuffer}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
