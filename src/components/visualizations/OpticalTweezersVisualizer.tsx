// src/components/visualizations/OpticalTweezersVisualizer.tsx
// Milestone 65: Optical Tweezers, Photonic Momentum & Single-Molecule Force Spectroscopy Visualizer
// Standards: Arthur Ashkin (Nobel Prize in Physics 2018) & Marko-Siggia Worm-Like Chain (1995)
// Curriculum: Vietnam GDPT 2018 (Vật lý 12: Động lượng photon, áp suất ánh sáng, thế năng đàn hồi; Sinh học 10-12: Cấu trúc cơ học ADN, động cơ phân tử ATP)

import React, { useState, useMemo } from 'react';
import {
  OPTICAL_TWEEZERS_CATALOG,
  OpticalTweezersSpecimenStandard,
  simulateOpticalTweezers,
  calculateTrapStiffness,
  BOLTZMANN_KT_PN_NM,
  LASER_TRAP_WAVELENGTH_NM
} from '../../domain/opticalTweezersEngine';
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
  Maximize2
} from 'lucide-react';

export interface OpticalTweezersVisualizerProps {
  initialSpecimenId?: string;
}

export const OpticalTweezersVisualizer: React.FC<OpticalTweezersVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'lambda_dna_wlc'
  );
  const [laserPowerMw, setLaserPowerMw] = useState<number>(100);
  const [extensionIndex, setExtensionIndex] = useState<number>(75);
  const [viewMode, setViewMode] = useState<
    'force_extension_curve' | 'optical_trap_chamber' | 'kinesin_stepping_trace' | 'titin_sawtooth_unfolding'
  >('force_extension_curve');
  const [activeTab, setActiveTab] = useState<
    'ashkin_trap_physics' | 'marko_siggia_wlc' | 'molecular_motors_titin' | 'curriculum_gdpt'
  >('ashkin_trap_physics');

  const simResult = useMemo(() => {
    return simulateOpticalTweezers(selectedSpecimenId, laserPowerMw);
  }, [selectedSpecimenId, laserPowerMw]);

  const {
    specimen,
    trapStiffnessPnPerNm,
    maxForcePn,
    isStalledOrOverstretched,
    dataPoints,
    steppingTrace
  } = simResult;

  const currentPoint = useMemo(() => {
    if (dataPoints.length === 0) return null;
    const idx = Math.min(dataPoints.length - 1, Math.max(0, extensionIndex));
    return dataPoints[idx];
  }, [dataPoints, extensionIndex]);

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    sound.playOpticalTrapCaptureTone(laserPowerMw);
  };

  const handleTriggerSnap = () => {
    sound.playDnaOverstretchingSnapTone();
  };

  const handleLaserPowerChange = (newPower: number) => {
    setLaserPowerMw(newPower);
    sound.playOpticalTrapCaptureTone(newPower);
  };

  // SVG dimensions for plots
  const svgW = 600;
  const svgH = 300;
  const padL = 60;
  const padR = 30;
  const padT = 30;
  const padB = 45;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  // Max bounds for plotting
  const maxExt = useMemo(() => {
    if (dataPoints.length === 0) return 1000;
    return Math.max(...dataPoints.map((p) => p.extensionNm)) * 1.05;
  }, [dataPoints]);

  const maxForceAxis = useMemo(() => {
    if (dataPoints.length === 0) return 80;
    return Math.max(75, Math.max(...dataPoints.map((p) => p.forcePicoNewtons)) * 1.15);
  }, [dataPoints]);

  return (
    <div className="bg-slate-950/95 border border-cyan-800/40 rounded-xl p-5 shadow-2xl backdrop-blur-md text-slate-100 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-800/30 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-700/50 flex items-center gap-1.5 shadow-sm">
              <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              NOBEL PRIZE IN PHYSICS 2018 • ARTHUR ASHKIN
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-950/60 text-amber-300 border border-amber-800/40">
              MARKO-SIGGIA WLC • 65 pN PLATEAU
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
              GDPT 2018 VIETNAM
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Bẫy Quang Học & Phổ Lực Đơn Phân Tử
            <span className="text-cyan-400 font-serif italic text-lg">(Optical Tweezers & Photonic Momentum)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Mô phỏng bẫy gradient laser {LASER_TRAP_WAVELENGTH_NM} nm, thế năng điều hòa Hooke F = -κ·Δx, mô hình chuỗi sâu bướm Marko-Siggia WLC và các bước cơ học nano của Kinesin & Titin.
          </p>
        </div>

        {/* Global Metric Badges */}
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900/90 border border-cyan-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-cyan-400">Độ Cứng Bẫy (κ_trap)</div>
            <div className="text-lg font-bold font-mono text-cyan-200">
              {trapStiffnessPnPerNm} <span className="text-xs text-cyan-400 font-normal">pN/nm</span>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-amber-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-amber-400">Lực Đỉnh Tối Đa</div>
            <div className="text-lg font-bold font-mono text-amber-200">
              {maxForcePn} <span className="text-xs text-amber-400 font-normal">pN</span>
            </div>
          </div>
          <button
            onClick={handleTriggerSnap}
            title="Nghe âm thanh đứt gãy kéo giãn đàn hồi"
            className="p-2.5 bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-600/50 rounded-lg text-cyan-300 transition-all flex items-center justify-center shadow-lg active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-cyan-300" />
          </button>
        </div>
      </div>

      {/* Specimen Standard Selector Carousel */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          Mẫu Tiêu Chuẩn Phổ Lực Đơn Phân Tử (5 Chuẩn Quốc Tế IUPAC/Biophysics):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {OPTICAL_TWEEZERS_CATALOG.map((std) => {
            const isSelected = std.id === selectedSpecimenId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectSpecimen(std.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 shadow-md shadow-cyan-950/50 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300">
                      {std.experimentType.replace(/_/g, ' ')}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div className="text-xs font-bold text-white leading-snug mb-1">{std.name}</div>
                  <div className="text-[11px] text-cyan-200/80 line-clamp-2">{std.vietnameseName}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">L₀: {std.contourLengthNm} nm</span>
                  <span className="text-amber-400">P: {std.persistenceLengthNm} nm</span>
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
                  setViewMode('force_extension_curve');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'force_extension_curve'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Đường Cong Lực - Kéo Giãn (F-x WLC)
              </button>
              <button
                onClick={() => {
                  setViewMode('optical_trap_chamber');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'optical_trap_chamber'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                Buồng Quang Học Bẫy Laser 3D
              </button>
              {specimen.experimentType === 'MOLECULAR_MOTOR_STEPPING' && (
                <button
                  onClick={() => {
                    setViewMode('kinesin_stepping_trace');
                    sound.playUiClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'kinesin_stepping_trace'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  Bước Kinesin 8.2 nm (Step Trace)
                </button>
              )}
              {specimen.experimentType === 'TITIN_POLYPROTEIN_UNFOLDING' && (
                <button
                  onClick={() => {
                    setViewMode('titin_sawtooth_unfolding');
                    sound.playUiClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'titin_sawtooth_unfolding'
                      ? 'bg-cyan-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Răng Cưa Giãn Ig27 (200 pN)
                </button>
              )}
            </div>

            <div className="text-[11px] font-mono text-cyan-400 px-2 hidden sm:block">
              k_B T = {BOLTZMANN_KT_PN_NM} pN·nm
            </div>
          </div>

          {/* Render Active View Mode */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[340px]">
            {viewMode === 'force_extension_curve' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span> Đo đạc thực nghiệm (Optical Tweezers)
                    <span className="w-3 h-0.5 border-t border-dashed border-amber-400 inline-block ml-2"></span> Mô hình WLC Marko-Siggia
                  </span>
                  <span className="font-mono text-cyan-300">
                    {specimen.overstretchingForcePn ? `Cao nguyên Overstretching: ${specimen.overstretchingForcePn} pN` : ''}
                  </span>
                </div>

                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((tickFrac) => {
                    const y = padT + plotH * (1 - tickFrac);
                    const forceVal = (maxForceAxis * tickFrac).toFixed(0);
                    return (
                      <g key={`y-grid-${tickFrac}`}>
                        <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={padL - 10} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                          {forceVal} pN
                        </text>
                      </g>
                    );
                  })}

                  {[0, 0.25, 0.5, 0.75, 1.0].map((tickFrac) => {
                    const x = padL + plotW * tickFrac;
                    const extVal = (maxExt * tickFrac).toFixed(0);
                    return (
                      <g key={`x-grid-${tickFrac}`}>
                        <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={x} y={padT + plotH + 18} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {extVal} nm
                        </text>
                      </g>
                    );
                  })}

                  {/* Axis lines */}
                  <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />
                  <line x1={padL} y1={padT + plotH} x2={svgW - padR} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />

                  {/* Theoretical WLC Curve */}
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    points={dataPoints
                      .map((p) => {
                        const px = padL + (p.extensionNm / maxExt) * plotW;
                        const py = padT + plotH * (1 - Math.min(maxForceAxis, p.theoreticalWlcForcePn) / maxForceAxis);
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  {/* Measured Optical Tweezers Curve */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    points={dataPoints
                      .map((p) => {
                        const px = padL + (p.extensionNm / maxExt) * plotW;
                        const py = padT + plotH * (1 - Math.min(maxForceAxis, p.forcePicoNewtons) / maxForceAxis);
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  {/* Overstretching Highlight Zone for B-to-S DNA transition */}
                  {specimen.experimentType === 'WLC_DNA_ELASTICITY' && (
                    <g>
                      <line
                        x1={padL}
                        y1={padT + plotH * (1 - 65.0 / maxForceAxis)}
                        x2={svgW - padR}
                        y2={padT + plotH * (1 - 65.0 / maxForceAxis)}
                        stroke="#ef4444"
                        strokeWidth="1.2"
                        strokeDasharray="5,3"
                      />
                      <text
                        x={svgW - padR - 8}
                        y={padT + plotH * (1 - 65.0 / maxForceAxis) - 6}
                        fill="#f87171"
                        fontSize="9"
                        textAnchor="end"
                        fontFamily="monospace"
                      >
                        B-DNA → S-DNA Overstretching (65 pN)
                      </text>
                    </g>
                  )}

                  {/* Current Active Scrubber Marker */}
                  {currentPoint && (
                    <g>
                      {(() => {
                        const cx = padL + (currentPoint.extensionNm / maxExt) * plotW;
                        const cy = padT + plotH * (1 - Math.min(maxForceAxis, currentPoint.forcePicoNewtons) / maxForceAxis);
                        return (
                          <>
                            <circle cx={cx} cy={cy} r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" className="animate-ping" opacity="0.4" />
                            <circle cx={cx} cy={cy} r="5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
                            <line x1={cx} y1={padT} x2={cx} y2={padT + plotH} stroke="#06b6d4" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                          </>
                        );
                      })()}
                    </g>
                  )}
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-3">
                  <span>Trục Hoành: Chiều dài kéo giãn (Extension x, nm)</span>
                  <span>Trục Tung: Lực phục hồi (Restoring Force F, pN)</span>
                </div>
              </div>
            )}

            {viewMode === 'optical_trap_chamber' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-cyan-300">
                    Sơ Đồ Bẫy Gradient Quang Học Song Song (Dual-Trap Optical Tweezer Setup)
                  </span>
                  <span className="font-mono text-amber-300">
                    Đường kính hạt Polystyrene: {(specimen.beadRadiusMicrons * 2).toFixed(1)} µm
                  </span>
                </div>

                <svg viewBox="0 0 600 240" className="w-full h-auto max-h-[260px]">
                  {/* Chamber Background */}
                  <rect x="20" y="20" width="560" height="200" rx="10" fill="#020617" stroke="#1e293b" />

                  {/* Immersion Objective Left & Right */}
                  <path d="M 40,50 L 100,80 L 100,160 L 40,190 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="70" y="125" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 70 125)">
                    Objective 1.2 NA
                  </text>

                  {/* Highly Focused Laser Cones (1064 nm Infrared represented in cyan/red) */}
                  <polygon points="100,80 200,120 100,160" fill="url(#laserGrad1)" opacity="0.45" />
                  <polygon points="500,80 400,120 500,160" fill="url(#laserGrad2)" opacity="0.45" />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="laserGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="laserGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  {/* Fixed Bead 1 (Trap 1) */}
                  <circle cx="200" cy="120" r="28" fill="#38bdf8" opacity="0.85" stroke="#e0f2fe" strokeWidth="2" />
                  <text x="200" y="124" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Bead 1
                  </text>

                  {/* Mobile Steered Bead 2 (Trap 2) */}
                  {(() => {
                    const beadDisplacement = currentPoint ? (currentPoint.forcePicoNewtons / trapStiffnessPnPerNm) * 0.4 : 0;
                    const beadX = 400 + Math.min(40, beadDisplacement);
                    return (
                      <g>
                        {/* Tethered Molecule (DNA Double Helix or Polyprotein) */}
                        <path
                          d={`M 228,120 Q 314,${120 + Math.sin(extensionIndex * 0.2) * 8} ${beadX - 28},120`}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <circle cx={beadX} cy="120" r="28" fill="#f43f5e" opacity="0.85" stroke="#ffe4e6" strokeWidth="2" />
                        <text x={beadX} y="124" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          Bead 2
                        </text>

                        {/* Restoring Force Vector */}
                        <line x1={beadX} y1="75" x2={beadX - 40} y2="75" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow)" />
                        <text x={beadX - 20} y="68" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                          F_trap = {currentPoint ? currentPoint.forcePicoNewtons : 0} pN
                        </text>
                      </g>
                    );
                  })()}

                  {/* Microtubule track for Kinesin */}
                  {specimen.experimentType === 'MOLECULAR_MOTOR_STEPPING' && (
                    <g>
                      <line x1="120" y1="180" x2="480" y2="180" stroke="#10b981" strokeWidth="6" strokeDasharray="8,4" />
                      <text x="300" y="196" fill="#34d399" fontSize="10" textAnchor="middle" fontFamily="monospace">
                        Microtubule Protofilament (8.2 nm Dimer Repeat)
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            )}

            {viewMode === 'kinesin_stepping_trace' && steppingTrace && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-cyan-300">
                    Vết Bước Rời Rạc Kinesin-1: 8.2 nm / bước (1 ATP / bước)
                  </span>
                  <span className="font-mono text-amber-300">
                    Lực cản quang học đạt ngưỡng Stall: 6.0 pN
                  </span>
                </div>

                <svg viewBox="0 0 600 240" className="w-full h-auto max-h-[260px]">
                  {/* Grid */}
                  {[0, 16.4, 32.8, 49.2, 65.6].map((nm) => {
                    const y = 200 - (nm / 70) * 160;
                    return (
                      <g key={`step-${nm}`}>
                        <line x1="50" y1={y} x2="560" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x="42" y={y + 4} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                          {nm.toFixed(1)} nm
                        </text>
                      </g>
                    );
                  })}

                  {/* Stepping trace line */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    points={steppingTrace
                      .map((pt) => {
                        const px = 50 + (pt.timeMs / 1000) * 510;
                        const py = 200 - (pt.beadPositionNm / 70) * 160;
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  {/* 8.2 nm increment indicator */}
                  <text x="540" y="50" fill="#34d399" fontSize="10" textAnchor="end" fontFamily="monospace">
                    Δx = 8.2 nm / step
                  </text>
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1 px-3">
                  <span>Trục Hoành: Thời gian quan sát (0 - 1000 ms)</span>
                  <span>Trục Tung: Vị trí hạt gắn đầu động cơ (nm)</span>
                </div>
              </div>
            )}

            {viewMode === 'titin_sawtooth_unfolding' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-cyan-300">
                    Phổ Răng Cưa Kéo Giãn 8 Domain Ig27 (Titin Muscle Polyprotein)
                  </span>
                  <span className="font-mono text-amber-300">
                    Độ dài giải phóng mỗi domain ΔL_c ≈ 28.4 nm
                  </span>
                </div>

                <svg viewBox="0 0 600 240" className="w-full h-auto max-h-[260px]">
                  {/* Unfolding Peaks */}
                  <polyline
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2.5"
                    points={dataPoints
                      .map((p) => {
                        const px = padL + (p.extensionNm / maxExt) * plotW;
                        const py = padT + plotH * (1 - Math.min(220, p.forcePicoNewtons) / 220);
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  {/* 200 pN Threshold Line */}
                  <line x1={padL} y1={padT + plotH * (1 - 200 / 220)} x2={svgW - padR} y2={padT + plotH * (1 - 200 / 220)} stroke="#f43f5e" strokeDasharray="4,4" />
                  <text x={svgW - padR - 8} y={padT + plotH * (1 - 200 / 220) - 6} fill="#f43f5e" fontSize="9" textAnchor="end" fontFamily="monospace">
                    Ngưỡng tháo nếp Ig27: 200 pN
                  </text>
                </svg>
              </div>
            )}
          </div>

          {/* Scrubbing & Controls Bar */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Công Suất Laser (P_laser):
                  </span>
                  <span className="font-mono text-cyan-300 font-bold">{laserPowerMw} mW</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="10"
                  value={laserPowerMw}
                  onChange={(e) => handleLaserPowerChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" /> Kéo Giãn Phân Tử (Extension x):
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    {currentPoint ? `${currentPoint.extensionNm} nm` : '0 nm'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, dataPoints.length - 1)}
                  value={extensionIndex}
                  onChange={(e) => setExtensionIndex(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Diagnostics & Realtime Data (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Active Data Readout Card */}
          <div className="bg-slate-900/90 border border-cyan-800/40 rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Thông Số Đơn Phân Tử Thời Gian Thực
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Lực Phục Hồi (F)</div>
                <div className="text-base font-bold font-mono text-cyan-300">
                  {currentPoint ? currentPoint.forcePicoNewtons : 0} <span className="text-[10px] font-normal text-slate-400">pN</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Lực Lý Thuyết WLC</div>
                <div className="text-base font-bold font-mono text-amber-300">
                  {currentPoint ? currentPoint.theoreticalWlcForcePn : 0} <span className="text-[10px] font-normal text-slate-400">pN</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Độ Dịch Chuyển Hạt (Δx)</div>
                <div className="text-base font-bold font-mono text-emerald-300">
                  {currentPoint ? ((currentPoint.forcePicoNewtons / trapStiffnessPnPerNm)).toFixed(1) : 0}{' '}
                  <span className="text-[10px] font-normal text-slate-400">nm</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Vị Trí Đáy Bẫy (x_trap)</div>
                <div className="text-base font-bold font-mono text-purple-300">
                  {currentPoint ? currentPoint.trapPositionNm : 0} <span className="text-[10px] font-normal text-slate-400">nm</span>
                </div>
              </div>
            </div>

            {/* State Diagnostic Badge */}
            <div className={`p-3 rounded-lg border flex items-center gap-2.5 text-xs ${
              isStalledOrOverstretched
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
            }`}>
              <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
              <div>
                <div className="font-bold">
                  {isStalledOrOverstretched ? 'Trạng Thái: Quá Kéo Giãn / Stall' : 'Trạng Thái: Co Giãn Đàn Hồi Hooke'}
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  {isStalledOrOverstretched
                    ? 'Lực kéo vượt ngưỡng biến dạng dẻo hoặc động cơ phân tử ngừng bước chống tải trọng.'
                    : 'Phân tử biến dạng thuận nghịch tuân theo mô hình entropic Marko-Siggia.'}
                </div>
              </div>
            </div>
          </div>

          {/* Specimen Description */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              Chi Tiết Mẫu Vật Chuẩn
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed">{specimen.description}</div>
            <div className="text-[11px] text-cyan-300/90 bg-cyan-950/50 p-2.5 rounded-lg border border-cyan-800/40 mt-1">
              <strong>Liên hệ chương trình GDPT 2018:</strong> {specimen.curriculumNotes}
            </div>
          </div>
        </div>
      </div>

      {/* Educational & Academic Reference Tabs */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('ashkin_trap_physics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'ashkin_trap_physics'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Nguyên Lý Bẫy Quang Học Ashkin
          </button>
          <button
            onClick={() => setActiveTab('marko_siggia_wlc')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'marko_siggia_wlc'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Mô Hình Chuỗi Sâu Marko-Siggia (WLC)
          </button>
          <button
            onClick={() => setActiveTab('molecular_motors_titin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'molecular_motors_titin'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Động Cơ Phân Tử Kinesin & Protein Cơ Titin
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Tích Hợp GDPT 2018 Vật Lý & Sinh Học
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
          {activeTab === 'ashkin_trap_physics' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Giải Nobel Vật lý 2018 - Arthur Ashkin: Động Lượng Photon & Bẫy Gradient Quang Học
              </h4>
              <p>
                Ánh sáng mang động lượng photon p = ℏk = h / λ. Khi một chùm tia laser hồng ngoại (λ = 1064 nm) được hội tụ cực độ qua vật kính hiển vi có khẩu độ số cao (NA ≥ 1.2), gradient cường độ điện trường ∇|E|² sinh ra hai thành phần lực tác dụng lên hạt vi cầu điện môi:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>
                  <strong className="text-cyan-300">Lực tán xạ (Scattering Force F_scat):</strong> Đẩy hạt dọc theo chiều truyền của ánh sáng do phản xạ và hấp thụ photon.
                </li>
                <li>
                  <strong className="text-cyan-300">Lực gradient (Gradient Force F_grad):</strong> Kéo hạt về phía có cường độ ánh sáng cực đại (tiêu điểm eo chùm sáng laser) do lưỡng cực điện cảm ứng trong môi trường có chiết suất cao hơn.
                </li>
              </ul>
              <p>
                Khi F_grad &gt; F_scat, hạt vi cầu bị bẫy ổn định trong không gian 3 chiều. Đối với các độ dời nhỏ quanh tâm bẫy, thế năng có dạng parabol điều hòa và lực bẫy tuân theo định luật Hooke: <code>F_trap = - κ_trap · Δx</code> với độ cứng bẫy κ_trap tỷ lệ thuận với công suất laser.
              </p>
            </div>
          )}

          {activeTab === 'marko_siggia_wlc' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Mô Hình Chuỗi Sâu Sắc Tộc (Worm-Like Chain - Marko & Siggia 1995)
              </h4>
              <p>
                Sợi ADN mạch kép là một polymer bán cứng đặc trưng bởi độ dài bền vững P ≈ 50 nm. Dưới tác dụng của nhiệt độ môi trường k_B T = 4.114 pN·nm (ở 25°C), ADN cuộn ngẫu nhiên do entropy. Lực cần thiết để kéo giãn ADN tới độ dài mở rộng x tuân theo phương trình giải tích Marko-Siggia:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-cyan-300 rounded border border-slate-800 text-center my-2">
                F(x) = (k_B·T / P) · [ 1 / (4(1 - x/L₀)²) - 1/4 + x/L₀ ]
              </div>
              <p>
                Khi lực kéo đạt ngưỡng <strong>65 pN</strong>, cấu trúc chuỗi xoắn kép B-DNA kinh điển chịu sự biến đổi đồng pha (cooperative overstretching) chuyển thành S-DNA dài hơn 70% so với độ dài viền ban đầu L₀.
              </p>
            </div>
          )}

          {activeTab === 'molecular_motors_titin' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Động Cơ Sinh Học Kinesin-1 & Phổ Lực Răng Cưa Protein Titin
              </h4>
              <p>
                <strong>Kinesin-1:</strong> Động cơ bước tay-qua-tay (hand-over-hand) dọc theo vi ống, mỗi chu kỳ thủy phân 1 phân tử ATP tương ứng với một bước cơ học chính xác 8.2 nm (khoảng cách một dị nhị phân α/β tubulin). Bẫy quang học cho phép đo lực ngắt/chết máy (stall force) đạt F_stall ≈ 6.0 pN.
              </p>
              <p>
                <strong>Titin Ig27:</strong> Protein khổng lồ chịu trách nhiệm cho độ đàn hồi thụ động của sợi cơ vân. Khi kéo giãn đa protein Ig27 octamer bằng bẫy quang học, mỗi domain miễn dịch globulin tháo nếp tuần tự sinh ra phổ lực dạng răng cưa đặc trưng với các đỉnh lực tháo nếp xấp xỉ 200 pN và độ dài viền giải phóng ΔL_c ≈ 28.4 nm mỗi domain.
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
                  <strong>Vật lý 12 (Chủ đề Thuyết lượng tử ánh sáng & Động học chất điểm):</strong> Khái niệm photon mang động lượng, áp suất ánh sáng, thế năng đàn hồi và lực cơ học ở thang vi mô (piconewton 10⁻¹² N và nanomet 10⁻⁹ m).
                </li>
                <li>
                  <strong>Sinh học 10 & 12 (Chủ đề Cơ sở phân tử của sự sống):</strong> Bản chất cơ học của chuỗi xoắn kép ADN, sự tháo xoắn trong nhân đôi và phiên mã, động cơ protein vận chuyển túi tiết nội bào dọc thoi vô sắc.
                </li>
                <li>
                  <strong>Hóa học 12 (Chủ đề Protein & Polyme):</strong> Cấu trúc bậc 3, bậc 4 của protein, lực tương tác thứ cấp (liên kết hydro, liên kết kỵ nước) và năng lượng tháo nếp phân tử.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
