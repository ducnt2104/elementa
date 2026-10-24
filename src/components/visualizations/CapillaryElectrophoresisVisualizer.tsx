// src/components/visualizations/CapillaryElectrophoresisVisualizer.tsx
// Milestone 67: Capillary Electrophoresis (CE), Electroosmotic Flow (EOF) & Chiral Resolution Visualizer
// Standards: Arne Tiselius (Nobel Prize in Chemistry 1948) & Jorgenson-Lukacs Capillary Zone Electrophoresis (1981)
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 11: Sự điện li, ion trong dung dịch, pH; Hóa học 12: Đồng phân quang học Chiral, protein; Vật lý 12: Điện trường)

import React, { useState, useMemo } from 'react';
import {
  CAPILLARY_ELECTROPHORESIS_CATALOG,
  CapillaryElectrophoresisSpecimenStandard,
  simulateCapillaryElectrophoresis,
  calculateHelmholtzSmoluchowskiEof
} from '../../domain/capillaryElectrophoresisEngine';
import { sound } from '../../audio/soundEngine';
import {
  Zap,
  Activity,
  Layers,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  Atom,
  RotateCcw,
  Flame,
  FileText,
  Compass,
  Play,
  Eye,
  Crosshair,
  Volume2,
  Maximize2,
  Pipette,
  Table,
  Filter
} from 'lucide-react';

export interface CapillaryElectrophoresisVisualizerProps {
  initialSpecimenId?: string;
}

export const CapillaryElectrophoresisVisualizer: React.FC<CapillaryElectrophoresisVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'chiral_amino_acid_dl_cd'
  );
  const [voltageKv, setVoltageKv] = useState<number>(20.0);
  const [bufferPh, setBufferPh] = useState<number>(3.2);
  const [selectedPeakId, setSelectedPeakId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<
    'electropherogram_detector_trace' | 'capillary_plug_flow_schematic' | 'peak_table_mobility_metrics' | 'chiral_cyclodextrin_host_guest'
  >('electropherogram_detector_trace');
  const [activeTab, setActiveTab] = useState<
    'tiselius_cappilary_origins' | 'helmholtz_smoluchowski_eof' | 'jorgenson_efficiency_plates' | 'curriculum_gdpt'
  >('tiselius_cappilary_origins');

  const simResult = useMemo(() => {
    return simulateCapillaryElectrophoresis(selectedSpecimenId, voltageKv, bufferPh);
  }, [selectedSpecimenId, voltageKv, bufferPh]);

  const {
    specimen,
    appliedVoltageKv,
    electricFieldVPerCm,
    actualEofMobilityE5,
    eofMarkerTimeMinutes,
    peaks,
    electropherogram,
    maxPeakPlatesN,
    enantiomerResolutionRs
  } = simResult;

  const activePeak = useMemo(() => {
    if (!selectedPeakId) return peaks[0] || null;
    return peaks.find((p) => p.id === selectedPeakId) || peaks[0] || null;
  }, [peaks, selectedPeakId]);

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    const spec = CAPILLARY_ELECTROPHORESIS_CATALOG.find((s) => s.id === id);
    if (spec) {
      setVoltageKv(spec.voltageKilovolts);
      setBufferPh(spec.bufferPh);
      setSelectedPeakId(spec.analytes[0]?.id || null);
    }
    sound.playCapillaryHighVoltageHum(spec?.voltageKilovolts || 20);
  };

  const handleVoltageChange = (newVoltage: number) => {
    setVoltageKv(newVoltage);
    sound.playCapillaryHighVoltageHum(newVoltage);
  };

  const handlePeakClick = (peakId: string) => {
    setSelectedPeakId(peakId);
    const p = peaks.find((pk) => pk.id === peakId);
    sound.playElectrophoresisPeakDetectionChime(p ? p.peakHeightMilliAu : 20);
  };

  // SVG Dimensions for Electropherogram Plot
  const svgW = 600;
  const svgH = 300;
  const padL = 60;
  const padR = 30;
  const padT = 30;
  const padB = 45;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const maxTimeMin = useMemo(() => {
    if (electropherogram.length === 0) return 20;
    return Math.max(...electropherogram.map((p) => p.timeMinutes));
  }, [electropherogram]);

  const maxAbsorbanceMau = useMemo(() => {
    if (electropherogram.length === 0) return 50;
    return Math.max(25, Math.max(...electropherogram.map((p) => p.absorbanceMilliAu)) * 1.15);
  }, [electropherogram]);

  return (
    <div className="bg-slate-950/95 border border-emerald-800/40 rounded-xl p-5 shadow-2xl backdrop-blur-md text-slate-100 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/30 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              NOBEL PRIZE IN CHEMISTRY 1948 • ARNE TISELIUS
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-teal-950/60 text-teal-300 border border-teal-800/40">
              JORGENSON & LUKACS (1981) • N &gt; 500,000 ĐĨA
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-950/60 text-amber-300 border border-amber-800/40">
              GDPT 2018 VIETNAM
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Điện Di Mao Quản & Dòng Điện Thẩm Thấu EOF
            <span className="text-emerald-400 font-serif italic text-lg">(Capillary Electrophoresis & Chiral Resolution)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Mô phỏng dòng điện thẩm thấu phẳng Helmholtz-Smoluchowski v_EOF = µ_EOF·E, hiệu năng phân giải siêu cao N &gt; 10⁶ đĩa lý thuyết, tách đối quang Chiral amino acid và giải mã trình tự ADN Sanger.
          </p>
        </div>

        {/* Global Metric Badges */}
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900/90 border border-emerald-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-emerald-400">Điện Trường Cường Độ (E)</div>
            <div className="text-lg font-bold font-mono text-emerald-200">
              {electricFieldVPerCm} <span className="text-xs text-emerald-400 font-normal">V/cm</span>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-teal-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-teal-400">Hiệu Năng Đĩa Lý Thuyết</div>
            <div className="text-lg font-bold font-mono text-teal-200">
              {maxPeakPlatesN.toLocaleString()} <span className="text-xs text-teal-400 font-normal">N</span>
            </div>
          </div>
          <button
            onClick={() => sound.playElectrophoresisPeakDetectionChime(activePeak ? activePeak.peakHeightMilliAu : 25)}
            title="Nghe âm thanh quang học detector hấp thụ UV"
            className="p-2.5 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-600/50 rounded-lg text-emerald-300 transition-all flex items-center justify-center shadow-lg active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-emerald-300" />
          </button>
        </div>
      </div>

      {/* Specimen Standard Selector Carousel */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          Mẫu Tiêu Chuẩn Điện Di Mao Quản (5 Chuẩn Quốc Tế IUPAC/Pharmacopeia):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {CAPILLARY_ELECTROPHORESIS_CATALOG.map((std) => {
            const isSelected = std.id === selectedSpecimenId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectSpecimen(std.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/70 border-emerald-400 shadow-md shadow-emerald-950/50 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-emerald-300">
                      {std.separationMode.replace(/_/g, ' ')}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-xs font-bold text-white leading-snug mb-1">{std.name}</div>
                  <div className="text-[11px] text-emerald-200/80 line-clamp-2">{std.vietnameseName}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">V: {std.voltageKilovolts} kV</span>
                  <span className="text-emerald-300">pH: {std.bufferPh}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Visualizer Canvas & Plots (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* View Mode Bar */}
          <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-1.5 rounded-xl">
            <div className="flex items-center gap-1 overflow-x-auto">
              <button
                onClick={() => {
                  setViewMode('electropherogram_detector_trace');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'electropherogram_detector_trace'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Sắc Ký Đồ Điện Di (Electropherogram)
              </button>
              <button
                onClick={() => {
                  setViewMode('capillary_plug_flow_schematic');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'capillary_plug_flow_schematic'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Pipette className="w-3.5 h-3.5" />
                Mặt Cắt Dòng Phẳng EOF Mao Quản
              </button>
              <button
                onClick={() => {
                  setViewMode('peak_table_mobility_metrics');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'peak_table_mobility_metrics'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                Bảng Thông Số Độ Linh Động (µ_app)
              </button>
              {specimen.separationMode === 'CHIRAL_CYCLODEXTRIN' && (
                <button
                  onClick={() => {
                    setViewMode('chiral_cyclodextrin_host_guest');
                    sound.playUiClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'chiral_cyclodextrin_host_guest'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Cơ Chế Khách-Chủ Chiral Cyclodextrin
                </button>
              )}
            </div>

            <div className="text-[11px] font-mono text-emerald-300 px-2 hidden sm:block">
              t_EOF = {eofMarkerTimeMinutes} min
            </div>
          </div>

          {/* Render Active View Mode */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[340px]">
            {viewMode === 'electropherogram_detector_trace' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span> Tín hiệu detector UV (mAU)
                    {enantiomerResolutionRs && (
                      <span className="text-amber-300 font-mono ml-2">
                        Độ phân giải Chiral R_s = {enantiomerResolutionRs}
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-emerald-300">
                    Capillary: {specimen.capillaryLengthTotalCm} cm (L_d = {specimen.capillaryLengthDetectorCm} cm, Ø {specimen.capillaryInternalDiameterMicrons} µm)
                  </span>
                </div>

                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((tickFrac) => {
                    const y = padT + plotH * (1 - tickFrac);
                    const absVal = (maxAbsorbanceMau * tickFrac).toFixed(1);
                    return (
                      <g key={`y-grid-${tickFrac}`}>
                        <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={padL - 10} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                          {absVal}
                        </text>
                      </g>
                    );
                  })}

                  {[0, 0.25, 0.5, 0.75, 1.0].map((tickFrac) => {
                    const x = padL + plotW * tickFrac;
                    const tVal = (maxTimeMin * tickFrac).toFixed(1);
                    return (
                      <g key={`x-grid-${tickFrac}`}>
                        <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={x} y={padT + plotH + 18} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {tVal} min
                        </text>
                      </g>
                    );
                  })}

                  {/* Axis lines */}
                  <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />
                  <line x1={padL} y1={padT + plotH} x2={svgW - padR} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />

                  {/* Electropherogram Curve */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    points={electropherogram
                      .map((p) => {
                        const px = padL + (p.timeMinutes / maxTimeMin) * plotW;
                        const py = padT + plotH * (1 - Math.min(maxAbsorbanceMau, p.absorbanceMilliAu) / maxAbsorbanceMau);
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  {/* Peak Labels & Click Targets */}
                  {peaks.map((p, idx) => {
                    const px = padL + (p.migrationTimeMinutes / maxTimeMin) * plotW;
                    const py = padT + plotH * (1 - Math.min(maxAbsorbanceMau, p.peakHeightMilliAu) / maxAbsorbanceMau);
                    const isSelected = p.id === selectedPeakId;
                    return (
                      <g key={p.id} className="cursor-pointer" onClick={() => handlePeakClick(p.id)}>
                        <line x1={px} y1={py} x2={px} y2={padT + plotH} stroke={isSelected ? '#34d399' : '#047857'} strokeWidth={isSelected ? 1.5 : 1} strokeDasharray="2,2" />
                        <circle cx={px} cy={py} r={isSelected ? 5 : 3.5} fill={isSelected ? '#34d399' : '#10b981'} stroke="#ffffff" strokeWidth="1" />
                        <text
                          x={px}
                          y={Math.max(padT + 12, py - 8)}
                          fill={isSelected ? '#34d399' : '#94a3b8'}
                          fontSize="9"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {p.name.split('(')[0]}
                        </text>
                        <text
                          x={px}
                          y={Math.max(padT + 22, py + 2)}
                          fill="#64748b"
                          fontSize="8"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {p.migrationTimeMinutes}m
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-3">
                  <span>Trục Hoành: Thời gian di chuyển (Migration Time t_m, phút)</span>
                  <span>Trục Tung: Độ hấp thụ quang học (Absorbance, mAU)</span>
                </div>
              </div>
            )}

            {viewMode === 'capillary_plug_flow_schematic' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-emerald-300">
                    Cấu Trúc Lớp Kép Điện & Dòng Điện Thẩm Thấu Dạng Phẳng (Flat Plug-Flow Profile)
                  </span>
                  <span className="font-mono text-teal-300">
                    Thế Zeta: ζ = {(specimen.zetaPotentialMilliVolts * ((bufferPh - 2) / 4.5)).toFixed(1)} mV
                  </span>
                </div>

                <svg viewBox="0 0 600 240" className="w-full h-auto max-h-[260px]">
                  {/* Capillary Outer Wall (Fused Silica) */}
                  <rect x="50" y="35" width="500" height="25" fill="#334155" stroke="#475569" />
                  <rect x="50" y="180" width="500" height="25" fill="#334155" stroke="#475569" />
                  <text x="300" y="52" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    Thành Ống Thủy Tinh Fused Silica (SiO₂ - Nhóm Silanol Si-O⁻)
                  </text>

                  {/* Surface Charges: Negative Silanol Groups (Si-O⁻) */}
                  {[80, 140, 200, 260, 320, 380, 440, 500].map((x) => (
                    <g key={`silanol-top-${x}`}>
                      <circle cx={x} cy="65" r="5" fill="#ef4444" opacity="0.9" />
                      <text x={x} y="68" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                        -
                      </text>
                    </g>
                  ))}
                  {[80, 140, 200, 260, 320, 380, 440, 500].map((x) => (
                    <g key={`silanol-bot-${x}`}>
                      <circle cx={x} cy="175" r="5" fill="#ef4444" opacity="0.9" />
                      <text x={x} y="178" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
                        -
                      </text>
                    </g>
                  ))}

                  {/* Stern Layer & Diffuse Cations (+) */}
                  {[95, 155, 215, 275, 335, 395, 455, 515].map((x) => (
                    <g key={`cation-top-${x}`}>
                      <circle cx={x} cy="78" r="4.5" fill="#3b82f6" opacity="0.9" />
                      <text x={x} y="81" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                        +
                      </text>
                    </g>
                  ))}
                  {[95, 155, 215, 275, 335, 395, 455, 515].map((x) => (
                    <g key={`cation-bot-${x}`}>
                      <circle cx={x} cy="162" r="4.5" fill="#3b82f6" opacity="0.9" />
                      <text x={x} y="165" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">
                        +
                      </text>
                    </g>
                  ))}

                  {/* Bulk Liquid Channel & Flat Plug Flow Vectors */}
                  <rect x="50" y="60" width="500" height="120" fill="#020617" opacity="0.4" />

                  {/* Flat Plug-Flow Front (In green) vs Parabolic Poiseuille (In dashed orange) */}
                  <line x1="280" y1="85" x2="280" y2="155" stroke="#10b981" strokeWidth="4" />
                  {[95, 110, 125, 140].map((y) => (
                    <g key={`vector-${y}`}>
                      <line x1="280" y1={y} x2="330" y2={y} stroke="#10b981" strokeWidth="2" />
                      <polygon points={`328,${y - 3} 336,${y} 328,${y + 3}`} fill="#10b981" />
                    </g>
                  ))}
                  <text x="345" y="123" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    Dòng Phẳng EOF (Flat Plug)
                  </text>

                  {/* High Voltage Electrodes Indicator */}
                  <rect x="15" y="90" width="30" height="60" rx="4" fill="#dc2626" opacity="0.8" />
                  <text x="30" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Anode (+)
                  </text>

                  <rect x="555" y="90" width="30" height="60" rx="4" fill="#2563eb" opacity="0.8" />
                  <text x="570" y="125" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Cathode (-)
                  </text>
                </svg>
              </div>
            )}

            {viewMode === 'peak_table_mobility_metrics' && (
              <div className="w-full flex flex-col items-center overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="text-[11px] uppercase font-mono bg-slate-950/80 text-emerald-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2 px-3">Hợp Chất / Ion</th>
                      <th className="py-2 px-3">Điện Tích (q)</th>
                      <th className="py-2 px-3">µ_ep (10⁻⁵ cm²/Vs)</th>
                      <th className="py-2 px-3">µ_app (10⁻⁵ cm²/Vs)</th>
                      <th className="py-2 px-3">Thời Gian t_m (min)</th>
                      <th className="py-2 px-3">Số Đĩa Lý Thuyết (N)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {peaks.map((p) => {
                      const isSelected = p.id === selectedPeakId;
                      return (
                        <tr
                          key={p.id}
                          onClick={() => handlePeakClick(p.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-emerald-950/60 text-white font-bold' : 'hover:bg-slate-800/40'
                          }`}
                        >
                          <td className="py-2.5 px-3 flex items-center gap-1.5 font-sans">
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            {p.name}
                          </td>
                          <td className="py-2.5 px-3">{p.charge > 0 ? `+${p.charge}` : p.charge}</td>
                          <td className="py-2.5 px-3">{p.electrophoreticMobilityE5}</td>
                          <td className="py-2.5 px-3 text-emerald-300">{p.apparentMobilityE5}</td>
                          <td className="py-2.5 px-3 text-teal-300">{p.migrationTimeMinutes}</td>
                          <td className="py-2.5 px-3 text-amber-300">{p.theoreticalPlatesN.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {viewMode === 'chiral_cyclodextrin_host_guest' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-emerald-300">
                    Mô Hình Phức Khách-Chủ Kỵ Nước Sulfated β-Cyclodextrin (CD)
                  </span>
                  <span className="font-mono text-amber-300">
                    Phân Tách D- vs L-Phenylalanine
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full p-2">
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/40 flex flex-col items-center text-center">
                    <div className="text-xs font-bold text-emerald-300 mb-1">D-Phenylalanine (R-Form)</div>
                    <div className="w-24 h-24 rounded-full border-4 border-dashed border-teal-500/50 flex items-center justify-center my-2 bg-teal-950/20">
                      <span className="text-[11px] font-mono text-teal-200">Khoang Kỵ Nước CD</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Liên kết yếu hơn với khoang cyclodextrin, di chuyển nhanh hơn ra detector (t_m = 3.65 min).
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/40 flex flex-col items-center text-center">
                    <div className="text-xs font-bold text-amber-300 mb-1">L-Phenylalanine (S-Form)</div>
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-500 flex items-center justify-center my-2 bg-emerald-950/40 shadow-lg shadow-emerald-950/50">
                      <span className="text-[11px] font-mono text-emerald-200 font-bold">Phức Khách-Chủ Bền</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Tương tác kỵ nước 3 điểm phù hợp không gian, bị lưu giữ lâu hơn và di chuyển chậm hơn (t_m = 4.22 min).
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scrubbing & Controls Bar */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" /> Điện Áp Tách (Voltage V):
                  </span>
                  <span className="font-mono text-emerald-300 font-bold">
                    {voltageKv} kV <span className="text-slate-400 font-normal">({electricFieldVPerCm} V/cm)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="30.0"
                  step="1.0"
                  value={voltageKv}
                  onChange={(e) => handleVoltageChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-teal-400" /> Độ pH Dung Dịch Đệm:
                  </span>
                  <span className="font-mono text-teal-300 font-bold">
                    pH {bufferPh} <span className="text-slate-400 font-normal">(µ_EOF = {actualEofMobilityE5})</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="2.5"
                  max="9.5"
                  step="0.1"
                  value={bufferPh}
                  onChange={(e) => setBufferPh(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Diagnostics & Realtime Data (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Active Data Readout Card */}
          <div className="bg-slate-900/90 border border-emerald-800/40 rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Thông Số Đỉnh Đang Chọn
            </h3>

            {activePeak ? (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-mono">Thời Gian (t_m)</div>
                  <div className="text-base font-bold font-mono text-emerald-300">
                    {activePeak.migrationTimeMinutes} <span className="text-[10px] font-normal text-slate-400">min</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-mono">Độ Linh Động µ_app</div>
                  <div className="text-base font-bold font-mono text-teal-300">
                    {activePeak.apparentMobilityE5}
                  </div>
                </div>

                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-mono">Số Đĩa Lý Thuyết (N)</div>
                  <div className="text-base font-bold font-mono text-amber-300">
                    {activePeak.theoreticalPlatesN.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-mono">Chiều Cao Đỉnh</div>
                  <div className="text-base font-bold font-mono text-purple-300">
                    {activePeak.peakHeightMilliAu} <span className="text-[10px] font-normal text-slate-400">mAU</span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Peak Identity & Vietnamese Name */}
            {activePeak && (
              <div className="p-3 rounded-lg border bg-emerald-950/40 border-emerald-500/50 text-xs">
                <div className="font-bold text-white">{activePeak.name}</div>
                <div className="text-[11px] text-emerald-200 mt-0.5">{activePeak.vietnameseName}</div>
              </div>
            )}
          </div>

          {/* Specimen Description */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              Chi Tiết Mẫu Vật Chuẩn
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed">{specimen.description}</div>
            <div className="text-[11px] text-emerald-300/90 bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-800/40 mt-1">
              <strong>Liên hệ chương trình GDPT 2018:</strong> {specimen.curriculumNotes}
            </div>
          </div>
        </div>
      </div>

      {/* Educational & Academic Reference Tabs */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tiselius_cappilary_origins')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'tiselius_cappilary_origins'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Giải Nobel Arne Tiselius & Lịch Sử Điện Di
          </button>
          <button
            onClick={() => setActiveTab('helmholtz_smoluchowski_eof')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'helmholtz_smoluchowski_eof'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Dòng Thẩm Thấu Điện EOF & Phương Trình Helmholtz
          </button>
          <button
            onClick={() => setActiveTab('jorgenson_efficiency_plates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'jorgenson_efficiency_plates'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Hiệu Năng Phân Tách Jorgenson-Lukacs (N &gt; 10⁶)
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Tích Hợp GDPT 2018 Hóa Học & Vật Lý
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
          {activeTab === 'tiselius_cappilary_origins' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Giải Nobel Hóa Học 1948 - Arne Tiselius: Khởi Nguồn Của Phương Pháp Điện Di
              </h4>
              <p>
                Arne Tiselius đã phát minh ra thiết bị ranh giới di động (moving boundary electrophoresis), chứng minh huyết thanh chứa nhiều phân đoạn protein riêng biệt gồm Albumin và các globulin (α, β, γ). Năm 1981, James Jorgenson và Krynn Lukacs đã thu nhỏ điện di vào các mao quản thạch anh đường kính micro (25-75 µm), khai sinh ra kỹ thuật Điện di Mao quản (Capillary Electrophoresis - CE) với khả năng tản nhiệt Joule cực nhanh và cho phép áp dụng hiệu điện thế lên tới 30,000 V.
              </p>
            </div>
          )}

          {activeTab === 'helmholtz_smoluchowski_eof' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Dòng Điện Thẩm Thấu EOF & Phương Trình Helmholtz-Smoluchowski
              </h4>
              <p>
                Thành mao quản thủy tinh thạch anh chứa các nhóm silanol (Si-OH). Ở pH &gt; 3, silanol bị phân li thành Si-O⁻ tích điện âm, tạo thành lớp điện kép hút các cation trong dung dịch đệm. Khi đặt điện áp cao, các cation linh động bị kéo về cực âm (Cathode), kéo theo toàn bộ khối chất lỏng do ma sát nhớt. Tốc độ dòng thẩm thấu điện tuân theo phương trình Helmholtz-Smoluchowski:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-emerald-300 rounded border border-slate-800 text-center my-2">
                v_EOF = µ_EOF · E = (ε_r · ε_0 · ζ / η) · (V / L_t)
              </div>
              <p>
                Dòng EOF có dạng <strong>mặt phẳng (plug-flow)</strong> gần như hoàn hảo chứ không phải dạng parabol như dòng Poiseuille trong sắc ký lỏng HPLC, loại bỏ hoàn toàn sự khuếch tán dòng Taylor và mang lại các đỉnh pic đối xứng cực hẹp.
              </p>
            </div>
          )}

          {activeTab === 'jorgenson_efficiency_plates' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Hiệu Năng Phân Tách Jorgenson-Lukacs & Số Đĩa Lý Thuyết (N &gt; 10⁶)
              </h4>
              <p>
                Trong điện di mao quản lý tưởng không có đối lưu nhiệt, nguyên nhân mở rộng dải duy nhất là sự khuếch tán dọc tự nhiên (longitudinal diffusion D). Số đĩa lý thuyết N được xác định bởi phương trình Jorgenson-Lukacs:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-emerald-300 rounded border border-slate-800 text-center my-2">
                N = (v_app · L_d) / (2 · D) = [ (µ_ep + µ_EOF) · V · (L_d / L_t) ] / (2 · D)
              </div>
              <p>
                Số đĩa N tỷ lệ thuận trực tiếp với hiệu điện thế V mà <strong>không phụ thuộc vào chiều dài mao quản</strong>! Điều này cho phép đạt tới hơn 1,000,000 đĩa lý thuyết, tách biệt chính xác các phân đoạn ADN sai khác nhau chỉ 1 bazơ trong giải mã gen Sanger và phân tách các đối quang Chiral enantiomer bằng chất mang Cyclodextrin.
              </p>
            </div>
          )}

          {activeTab === 'curriculum_gdpt' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Chuẩn Hóa Sư Phạm Chương Trình Giáo Dục Phổ Thông 2018 (Việt Nam)
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>
                  <strong>Hóa học 10 & 11 (Chủ đề Sự điện li & Cân bằng ion):</strong> Bản chất ion trong dung dịch, pH môi trường quyết định trạng thái điện tích bề mặt hạt keo và nhóm chức silanol/amino acid.
                </li>
                <li>
                  <strong>Hóa học 12 (Chủ đề Amino acid, Peptit, Protein & Đồng phân quang học):</strong> Carbon bất đối, cấu hình enantiomer D/L, tính chất lưỡng tính của amino acid và điện di phân tách protein huyết thanh.
                </li>
                <li>
                  <strong>Vật lý 12 (Chủ đề Dòng điện & Điện trường):</strong> Định luật Ohm đối với chất điện phân, chuyển động của hạt mang điện dưới tác dụng của lực tĩnh điện Lorentz.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
