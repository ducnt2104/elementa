import React, { useState, useMemo, useEffect } from 'react';
import {
  SEC_MALS_CATALOG,
  SecMalsStandard,
  simulateSecMalsExperiment,
  LASER_WAVELENGTH_NM,
  WATER_REFRACTIVE_INDEX,
} from '../../domain/secMalsEngine';
import { sound } from '../../audio/soundEngine';
import {
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
  Compass,
} from 'lucide-react';

interface SecMalsVisualizerProps {
  initialStandardId?: string;
}

export const SecMalsVisualizer: React.FC<SecMalsVisualizerProps> = ({
  initialStandardId = 'bsa_oligomeric_ladder',
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const [activeSubTab, setActiveSubTab] = useState<
    'CHROMATOGRAM_SLICES' | 'ZIMM_PLOT' | 'SPECIES_DISTRIBUTION' | 'CURRICULUM_STANDARDS'
  >('CHROMATOGRAM_SLICES');

  const standard: SecMalsStandard = useMemo(() => {
    return (
      SEC_MALS_CATALOG.find((s) => s.id === selectedStandardId) || SEC_MALS_CATALOG[0]
    );
  }, [selectedStandardId]);

  const [hoveredSliceIndex, setHoveredSliceIndex] = useState<number | null>(null);

  // Play audio on standard selection
  useEffect(() => {
    sound.playZimmPlotMolarMassChime?.();
  }, [standard]);

  const simulation = useMemo(() => {
    return simulateSecMalsExperiment(standard, 130);
  }, [standard]);

  const hoveredSlice =
    hoveredSliceIndex !== null && simulation.slices[hoveredSliceIndex]
      ? simulation.slices[hoveredSliceIndex]
      : simulation.slices[Math.floor(simulation.slices.length / 2)];

  // SVG plot settings
  const svgWidth = 840;
  const svgHeight = 320;
  const padding = { top: 30, right: 75, bottom: 50, left: 65 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const minVol = 5.5;
  const maxVol = 11.5;

  const maxUV = Math.max(...simulation.slices.map((s) => s.uvAbsorbance280)) * 1.15;
  const maxLS = Math.max(...simulation.slices.map((s) => s.lightScattering90Deg)) * 1.15;

  const getX = (vol: number) => {
    return padding.left + ((vol - minVol) / (maxVol - minVol)) * plotWidth;
  };

  const getY_UV = (uv: number) => {
    return padding.top + plotHeight - (uv / maxUV) * plotHeight;
  };

  const getY_LS = (ls: number) => {
    return padding.top + plotHeight - (ls / maxLS) * plotHeight;
  };

  // Paths
  const uvPath = useMemo(() => {
    return simulation.slices.reduce((acc, pt, idx) => {
      const x = getX(pt.elutionVolumeMl);
      const y = getY_UV(pt.uvAbsorbance280);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxUV]);

  const lsPath = useMemo(() => {
    return simulation.slices.reduce((acc, pt, idx) => {
      const x = getX(pt.elutionVolumeMl);
      const y = getY_LS(pt.lightScattering90Deg);
      return `${acc} ${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }, '');
  }, [simulation, maxLS]);

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-navy-dark/90 border border-violet-500/30 rounded-2xl text-ivory shadow-2xl backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-light/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-500/20 border border-violet-400/40 text-violet-300">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white tracking-wide">
                Sắc Ký Loại Trừ Kích Thước & Tán Xạ Ánh Sáng SEC-MALS (Zimm Plot)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-violet-950/80 text-violet-300 border border-violet-500/40 font-bold">
                USP &lt;129&gt; / NIST RM 8671
              </span>
            </div>
            <p className="text-xs text-ivory-muted mt-0.5 font-mono">
              Đo tuyệt đối khối lượng mol phân tử Mw (Da) · Bán kính hồi chuyển Rg · Tán xạ đa góc MALS
            </p>
          </div>
        </div>

        {/* Audio Test Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playSecMalsLaserScatteringSweep?.();
              sound.playZimmPlotMolarMassChime?.();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-950/50 hover:bg-violet-900/60 border border-violet-500/40 text-violet-200 text-xs font-mono transition-colors shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span>Quét Laser Đa Góc MALS ⚡</span>
          </button>
        </div>
      </div>

      {/* Standard Selector Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-ivory-muted font-mono flex items-center gap-1 mr-1">
          <Target className="w-3.5 h-3.5 text-violet-400" /> Chuẩn Mẫu SEC-MALS:
        </span>
        {SEC_MALS_CATALOG.map((std) => (
          <button
            key={std.id}
            onClick={() => {
              sound.playUiClick();
              setSelectedStandardId(std.id);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              selectedStandardId === std.id
                ? 'bg-violet-500 text-obsidian border-violet-300 font-extrabold shadow-md scale-105'
                : 'bg-navy-light/40 text-ivory hover:text-white border-navy-light/60 hover:border-violet-400/50'
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
            setActiveSubTab('CHROMATOGRAM_SLICES');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'CHROMATOGRAM_SLICES'
              ? 'bg-violet-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-4 h-4 text-violet-300" />
          <span>Sắc Ký Đồ & Khối Lượng Từng Lát Cắt (Mw Slices)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('ZIMM_PLOT');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'ZIMM_PLOT'
              ? 'bg-violet-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-violet-300" />
          <span>Đồ Thị Zimm Plot (Kc/R vs sin²(θ/2))</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('SPECIES_DISTRIBUTION');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'SPECIES_DISTRIBUTION'
              ? 'bg-violet-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-4 h-4 text-violet-300" />
          <span>Phân Bố Tiểu Phần & Độ Đa Phân Tán (PDI)</span>
        </button>

        <button
          onClick={() => {
            sound.playUiClick();
            setActiveSubTab('CURRICULUM_STANDARDS');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeSubTab === 'CURRICULUM_STANDARDS'
              ? 'bg-violet-600/90 text-white shadow font-extrabold'
              : 'text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-4 h-4 text-violet-300" />
          <span>Chuẩn USP & GDPT 2018</span>
        </button>
      </div>

      {/* TAB 1: CHROMATOGRAM SLICES */}
      {activeSubTab === 'CHROMATOGRAM_SLICES' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="relative w-full bg-navy/90 rounded-2xl border border-violet-500/30 p-4 shadow-inner overflow-hidden">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-ivory-muted mb-2">
              <span className="flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-violet-400" />
                Thể Tích Rửa Giải: <strong className="text-white">{minVol} mL → {maxVol} mL</strong>
              </span>
              <span className="text-violet-300 font-bold">
                Khối Lượng Trung Bình Mw: <strong className="text-white font-mono">{simulation.measuredWeightAverageMwDa.toLocaleString()} Da</strong> (PDI: {simulation.overallPdi})
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
                const index = Math.round(ratio * (simulation.slices.length - 1));
                setHoveredSliceIndex(index);
              }}
              onMouseLeave={() => setHoveredSliceIndex(null)}
            >
              {/* Grid Lines */}
              {[6, 7, 8, 9, 10, 11].map((volVal) => {
                const x = getX(volVal);
                return (
                  <g key={`vol-grid-${volVal}`}>
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
                      {volVal} mL
                    </text>
                  </g>
                );
              })}

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
              <line
                x1={padding.left + plotWidth}
                y1={padding.top}
                x2={padding.left + plotWidth}
                y2={padding.top + plotHeight}
                stroke="#64748b"
                strokeWidth="1.5"
              />

              {/* UV Trace Path (Blue/Cyan) */}
              <path
                d={uvPath}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 90° Light Scattering Path (Amber/Orange) */}
              <path
                d={lsPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Slice Molar Mass Plateau Markers across peaks */}
              {standard.speciesList.map((sp, sIdx) => {
                const peakX = getX(sp.elutionVolumeMl);
                return (
                  <g key={`species-mw-tag-${sIdx}`}>
                    <circle cx={peakX} cy={padding.top + 25 + sIdx * 20} r="3.5" fill="#a855f7" />
                    <text
                      x={peakX + 6}
                      y={padding.top + 29 + sIdx * 20}
                      fill="#d8b4fe"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {sp.name}: {sp.nominalMwDa.toLocaleString()} Da
                    </text>
                  </g>
                );
              })}

              {/* Interactive Hover Cursor */}
              {hoveredSlice && (
                <g>
                  <line
                    x1={getX(hoveredSlice.elutionVolumeMl)}
                    y1={padding.top}
                    x2={getX(hoveredSlice.elutionVolumeMl)}
                    y2={padding.top + plotHeight}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={getX(hoveredSlice.elutionVolumeMl)}
                    cy={getY_UV(hoveredSlice.uvAbsorbance280)}
                    r="4"
                    fill="#38bdf8"
                  />
                  <circle
                    cx={getX(hoveredSlice.elutionVolumeMl)}
                    cy={getY_LS(hoveredSlice.lightScattering90Deg)}
                    r="4"
                    fill="#f59e0b"
                  />
                </g>
              )}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-ivory-muted px-2 mt-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-sky-400 inline-block" />
                  <strong className="text-sky-300">Độ Hấp Thụ UV 280 nm</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-amber-400 inline-block" />
                  <strong className="text-amber-300">Tán Xạ Ánh Sáng 90° LS</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
                  <strong className="text-purple-300">Khối Lượng Mw Từng Lát</strong>
                </span>
              </div>
              <span className="text-violet-300 font-bold">Trục hoành: Thể tích rửa giải SEC (mL)</span>
            </div>
          </div>

          {/* Cursor Readout Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-navy/70 border border-violet-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Thể Tích Lát Cắt Ve</span>
              <span className="text-base font-bold text-white font-mono">
                {hoveredSlice.elutionVolumeMl} mL
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-violet-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Khối Lượng Tuyệt Đối Mw</span>
              <span className="text-base font-bold text-violet-300 font-mono">
                {hoveredSlice.calculatedMwDa > 0 ? `${hoveredSlice.calculatedMwDa.toLocaleString()} Da` : 'Chưa có mẫu'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-violet-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Tín Hiệu Tán Xạ LS 90°</span>
              <span className="text-base font-bold text-amber-300 font-mono">
                {hoveredSlice.lightScattering90Deg} V
              </span>
            </div>
            <div className="p-3 rounded-xl bg-navy/70 border border-violet-500/20">
              <span className="text-[10px] font-mono text-ivory-muted block">Bán Kính Hồi Chuyển Rg</span>
              <span className="text-base font-bold text-emerald-300 font-mono">
                {hoveredSlice.calculatedRgNm > 0 ? `${hoveredSlice.calculatedRgNm} nm` : 'Dưới giới hạn'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ZIMM PLOT */}
      {activeSubTab === 'ZIMM_PLOT' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-navy/80 rounded-2xl border border-violet-500/30 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                Đồ Thị Ngoại Suy Đa Góc Zimm Plot (Rayleigh-Gans-Debye Formalism)
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-500/40">
                dn/dc = {standard.dnDcMlPerG} mL/g
              </span>
            </div>

            <div className="p-3 bg-navy rounded-xl border border-navy-light/40 font-mono text-xs text-violet-200">
              (K* · c) / R(θ) = 1 / [Mw · P(θ)] + 2 · A₂ · c
            </div>

            <p className="text-xs text-ivory-muted leading-relaxed">
              Bằng cách đo tỷ số Rayleigh R(θ) tại 7 góc tán xạ khác nhau và ngoại suy kép về{' '}
              <strong className="text-white">θ → 0</strong>, hệ số chặn trục tung bằng đúng{' '}
              <strong className="text-violet-300 font-mono">1 / Mw</strong>.
              Độ dốc ban đầu theo sin²(θ/2) cho phép xác định trực tiếp bán kính hồi chuyển{' '}
              <strong className="text-emerald-300 font-mono">Rg = {simulation.measuredRgNm} nm</strong> mà không cần giả định
              về hình học cầu hay que của phân tử.
            </p>

            {/* Zimm Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-navy-light/60 text-ivory-muted">
                    <th className="py-2 px-3">Góc Tán Xạ (θ)</th>
                    <th className="py-2 px-3">Hàm Số sin²(θ/2)</th>
                    <th className="py-2 px-3">Tỷ Số Tán Xạ (K* c / R(θ))</th>
                    <th className="py-2 px-3">Khối Lượng Ngoại Suy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-light/30">
                  {simulation.zimmPlotPoints.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-navy-light/20 transition-colors">
                      <td className="py-2 px-3 font-bold text-white">{pt.angleDegrees}°</td>
                      <td className="py-2 px-3 text-cyan-300">{pt.sin2HalfAngle}</td>
                      <td className="py-2 px-3 font-mono text-amber-300">
                        {pt.kcOverRTheta.toExponential(4)} mol/g
                      </td>
                      <td className="py-2 px-3 text-violet-300 font-bold">
                        {(1.0 / pt.kcOverRTheta).toFixed(0)} Da
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPECIES DISTRIBUTION */}
      {activeSubTab === 'SPECIES_DISTRIBUTION' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="bg-navy/80 rounded-2xl border border-violet-500/30 p-4 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              Thành Phần Oligomer & Chỉ Số Đa Phân Tán (PDI = Mw / Mn)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {standard.speciesList.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-navy-light/40 border border-violet-500/30 space-y-2 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>{sp.name}</span>
                    <span className="text-violet-400 font-mono">{sp.peakFractionPercent}% Hàm Lượng</span>
                  </div>

                  <div className="w-full bg-navy rounded-full h-1.5 overflow-hidden my-2">
                    <div
                      className="bg-gradient-to-r from-violet-500 to-indigo-400 h-1.5 rounded-full"
                      style={{ width: `${sp.peakFractionPercent}%` }}
                    />
                  </div>

                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-ivory-muted">
                      <span>Khối lượng Mw:</span>
                      <strong className="text-violet-300">{sp.nominalMwDa.toLocaleString()} Da</strong>
                    </div>
                    <div className="flex justify-between text-ivory-muted">
                      <span>Bán kính Rg:</span>
                      <strong className="text-emerald-300">{sp.apparentRgNm} nm</strong>
                    </div>
                    <div className="flex justify-between text-ivory-muted">
                      <span>Độ đa phân tán PDI:</span>
                      <strong className="text-amber-300">{sp.polydispersityIndexPdi}</strong>
                    </div>
                    <div className="flex justify-between text-ivory-muted">
                      <span>Cấu hình:</span>
                      <strong className="text-white">{sp.stoichiometry}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CURRICULUM & STANDARDS */}
      {activeSubTab === 'CURRICULUM_STANDARDS' && (
        <div className="flex flex-col gap-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy/80 border border-violet-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-violet-300">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                Chuẩn Đo Lường Quốc Tế USP &lt;129&gt; & NIST RM 8671
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {standard.description}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-light/40 border border-navy-light text-[11px] font-mono text-ivory-muted">
                <strong>Quy chuẩn:</strong> {standard.uspPharmacopeiaRef}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy/80 border border-violet-500/30 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                <Award className="w-4 h-4 text-cyan-400" />
                Tích Hợp Chương Trình GDPT 2018 (Hóa Học & Vật Lý)
              </div>
              <p className="text-xs text-ivory-muted leading-relaxed">
                {standard.curriculumNotes}
              </p>
              <div className="p-2.5 rounded-lg bg-navy-light/40 border border-navy-light text-[11px] font-mono text-ivory-muted">
                <strong>Hệ đệm rửa giải SEC:</strong> {standard.carrierBuffer}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
