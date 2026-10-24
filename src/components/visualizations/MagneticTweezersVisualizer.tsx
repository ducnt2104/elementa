// src/components/visualizations/MagneticTweezersVisualizer.tsx
// Milestone 66: Magnetic Tweezers, Supercoiling DNA Plectoneme & Topoisomerase Catalytic Visualizer
// Standards: Strick, Allemand, Bensimon & Croquette (1996-2000) & White's Topological Theorem
// Curriculum: Vietnam GDPT 2018 (Sinh học 10 & 12: Siêu xoắn ADN, nhân đôi ADN, Topoisomerase & kháng sinh Quinolone; Vật lý 12: Từ trường, lực từ piconewton)

import React, { useState, useMemo } from 'react';
import {
  MAGNETIC_TWEEZERS_CATALOG,
  MagneticTweezersSpecimenStandard,
  simulateMagneticTweezers,
  calculateMagneticForce,
  DNA_BP_PER_TURN,
  PLECTONEME_CONTRACTION_PER_TURN_NM
} from '../../domain/magneticTweezersEngine';
import { sound } from '../../audio/soundEngine';
import {
  Compass,
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
  Play,
  Eye,
  Crosshair,
  Volume2,
  Maximize2,
  Magnet,
  ShieldAlert,
  Scissors
} from 'lucide-react';

export interface MagneticTweezersVisualizerProps {
  initialSpecimenId?: string;
}

export const MagneticTweezersVisualizer: React.FC<MagneticTweezersVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'lambda_dna_supercoiling_03pn'
  );
  const [magnetHeightMm, setMagnetHeightMm] = useState<number>(4.2);
  const [activeTurn, setActiveTurn] = useState<number>(0);
  const [viewMode, setViewMode] = useState<
    'supercoiling_rotation_curve' | 'magnetic_flow_cell' | 'topoisomerase_stepping_trace' | 'topological_linking_diagram'
  >('supercoiling_rotation_curve');
  const [activeTab, setActiveTab] = useState<
    'magnetic_trapping_force' | 'topology_whites_theorem' | 'topoisomerases_antibiotics' | 'curriculum_gdpt'
  >('magnetic_trapping_force');

  const simResult = useMemo(() => {
    return simulateMagneticTweezers(selectedSpecimenId, magnetHeightMm);
  }, [selectedSpecimenId, magnetHeightMm]);

  const {
    specimen,
    actualForcePn,
    maxExtensionMicrons,
    rotationCurve,
    topoisomeraseTrace,
    plectonemeTurnsCount
  } = simResult;

  const currentPoint = useMemo(() => {
    if (rotationCurve.length === 0) return null;
    let closest = rotationCurve[0];
    let minDiff = 999;
    rotationCurve.forEach((pt) => {
      const diff = Math.abs(pt.turns - activeTurn);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    });
    return closest;
  }, [rotationCurve, activeTurn]);

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    const spec = MAGNETIC_TWEEZERS_CATALOG.find((s) => s.id === id);
    if (spec) {
      if (spec.pullingForcePn > 1.5) {
        setMagnetHeightMm(2.2);
      } else {
        setMagnetHeightMm(4.8);
      }
    }
    sound.playMagneticBeadRotationTone(0);
  };

  const handleTurnsChange = (newTurn: number) => {
    setActiveTurn(newTurn);
    sound.playMagneticBeadRotationTone(newTurn);
  };

  const handleTriggerCatalyticStep = () => {
    const deltaLk = specimen.catalyticStepDeltaLk || 1;
    sound.playTopoisomeraseCatalyticStepChime(deltaLk);
  };

  // SVG Coordinates for Hat Curve
  const svgW = 600;
  const svgH = 300;
  const padL = 60;
  const padR = 30;
  const padT = 30;
  const padB = 45;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const minTurns = -60;
  const maxTurns = 60;
  const maxExtY = Math.max(7.5, maxExtensionMicrons * 1.15);

  return (
    <div className="bg-slate-950/95 border border-purple-800/40 rounded-xl p-5 shadow-2xl backdrop-blur-md text-slate-100 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-800/30 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-purple-950/80 text-purple-300 border border-purple-700/50 flex items-center gap-1.5 shadow-sm">
              <Magnet className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              MAGNETIC TWEEZERS • STRICK & CROQUETTE (1996)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
              WHITE'S THEOREM (ΔLk = ΔTw + ΔWr)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
              GDPT 2018 VIETNAM
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Bẫy Từ Phân Tử & Siêu Xoắn ADN Plectoneme
            <span className="text-purple-400 font-serif italic text-lg">(Magnetic Tweezers & Topoisomerase Catalysis)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Mô phỏng lực từ không đổi F = ½∇(m·B), chuyển pha uốn nếp plectoneme, độ dài co ngắn 52 nm/vòng và bước tháo xoắn xúc tác của Topoisomerase I & II/Gyrase.
          </p>
        </div>

        {/* Global Metric Badges */}
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900/90 border border-purple-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-purple-400">Lực Kéo Hút Từ (F_mag)</div>
            <div className="text-lg font-bold font-mono text-purple-200">
              {actualForcePn} <span className="text-xs text-purple-400 font-normal">pN</span>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-indigo-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-indigo-400">Chiều Dài Giãn Tối Đa</div>
            <div className="text-lg font-bold font-mono text-indigo-200">
              {maxExtensionMicrons} <span className="text-xs text-indigo-400 font-normal">µm</span>
            </div>
          </div>
          <button
            onClick={handleTriggerCatalyticStep}
            title="Kích hoạt âm thanh enzyme tháo xoắn Topoisomerase"
            className="p-2.5 bg-purple-900/40 hover:bg-purple-800/60 border border-purple-600/50 rounded-lg text-purple-300 transition-all flex items-center justify-center shadow-lg active:scale-95"
          >
            <Scissors className="w-5 h-5 text-purple-300" />
          </button>
        </div>
      </div>

      {/* Specimen Standard Selector Carousel */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          Mẫu Tiêu Chuẩn Bẫy Từ Siêu Xoắn ADN (5 Chuẩn Quốc Tế IUPAC/Biophysics):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {MAGNETIC_TWEEZERS_CATALOG.map((std) => {
            const isSelected = std.id === selectedSpecimenId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectSpecimen(std.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-950/70 border-purple-400 shadow-md shadow-purple-950/50 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-purple-300">
                      {std.experimentType.replace(/_/g, ' ')}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                  </div>
                  <div className="text-xs font-bold text-white leading-snug mb-1">{std.name}</div>
                  <div className="text-[11px] text-purple-200/80 line-clamp-2">{std.vietnameseName}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">{std.dnaLengthBp} bp</span>
                  <span className="text-purple-300">{std.pullingForcePn} pN</span>
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
                  setViewMode('supercoiling_rotation_curve');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'supercoiling_rotation_curve'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Đường Cong Quay Siêu Xoắn (Hat Curve)
              </button>
              <button
                onClick={() => {
                  setViewMode('magnetic_flow_cell');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'magnetic_flow_cell'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Magnet className="w-3.5 h-3.5" />
                Buồng Dòng Chảy & Nam Châm NdFeB
              </button>
              {topoisomeraseTrace && (
                <button
                  onClick={() => {
                    setViewMode('topoisomerase_stepping_trace');
                    sound.playUiClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    viewMode === 'topoisomerase_stepping_trace'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5" />
                  Vết Bước Xúc Tác Topo (ΔLk = {specimen.catalyticStepDeltaLk})
                </button>
              )}
              <button
                onClick={() => {
                  setViewMode('topological_linking_diagram');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'topological_linking_diagram'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Định Lý White: ΔLk = ΔTw + ΔWr
              </button>
            </div>

            <div className="text-[11px] font-mono text-purple-300 px-2 hidden sm:block">
              {DNA_BP_PER_TURN} bp/turn • ~{PLECTONEME_CONTRACTION_PER_TURN_NM} nm/vòng
            </div>
          </div>

          {/* Render Active View Mode */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[340px]">
            {viewMode === 'supercoiling_rotation_curve' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-purple-400 inline-block"></span> Đường cong quay thực nghiệm (Rotation Hat Curve)
                  </span>
                  <span className="font-mono text-purple-300">
                    Ngưỡng uốn nếp: n_c = ±{specimen.criticalBucklingTurns} vòng
                  </span>
                </div>

                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((tickFrac) => {
                    const y = padT + plotH * (1 - tickFrac);
                    const extVal = (maxExtY * tickFrac).toFixed(1);
                    return (
                      <g key={`y-grid-${tickFrac}`}>
                        <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={padL - 10} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                          {extVal} µm
                        </text>
                      </g>
                    );
                  })}

                  {[-60, -40, -20, 0, 20, 40, 60].map((turnVal) => {
                    const x = padL + ((turnVal - minTurns) / (maxTurns - minTurns)) * plotW;
                    return (
                      <g key={`x-grid-${turnVal}`}>
                        <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={x} y={padT + plotH + 18} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {turnVal > 0 ? `+${turnVal}` : turnVal}
                        </text>
                      </g>
                    );
                  })}

                  {/* Axis lines */}
                  <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />
                  <line x1={padL} y1={padT + plotH} x2={svgW - padR} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />

                  {/* Center zero-turn axis */}
                  <line
                    x1={padL + plotW * 0.5}
                    y1={padT}
                    x2={padL + plotW * 0.5}
                    y2={padT + plotH}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                    opacity="0.4"
                  />

                  {/* Rotation Curve Polyline */}
                  <polyline
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2.8"
                    points={rotationCurve
                      .map((p) => {
                        const px = padL + ((p.turns - minTurns) / (maxTurns - minTurns)) * plotW;
                        const py = padT + plotH * (1 - Math.min(maxExtY, p.extensionMicrons) / maxExtY);
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  {/* Current Active Turn Scrubber Marker */}
                  {currentPoint && (
                    <g>
                      {(() => {
                        const cx = padL + ((currentPoint.turns - minTurns) / (maxTurns - minTurns)) * plotW;
                        const cy = padT + plotH * (1 - Math.min(maxExtY, currentPoint.extensionMicrons) / maxExtY);
                        return (
                          <>
                            <circle cx={cx} cy={cy} r="6" fill="#c084fc" stroke="#ffffff" strokeWidth="2" className="animate-ping" opacity="0.4" />
                            <circle cx={cx} cy={cy} r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
                            <line x1={cx} y1={padT} x2={cx} y2={padT + plotH} stroke="#a855f7" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                          </>
                        );
                      })()}
                    </g>
                  )}
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-3">
                  <span>Trục Hoành: Số vòng quay nam châm (Turns n, âm = tháo xoắn, dương = xoắn thêm)</span>
                  <span>Trục Tung: Chiều dài phân tử z (µm)</span>
                </div>
              </div>
            )}

            {viewMode === 'magnetic_flow_cell' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-purple-300">
                    Sơ Đồ Bẫy Từ Vi Lưu & Nam Châm Vĩnh Cửu Neodymium (NdFeB)
                  </span>
                  <span className="font-mono text-indigo-300">
                    Khoảng cách nam châm: {magnetHeightMm} mm → F = {actualForcePn} pN
                  </span>
                </div>

                <svg viewBox="0 0 600 240" className="w-full h-auto max-h-[260px]">
                  {/* Flow Cell Chamber Glass */}
                  <rect x="50" y="30" width="500" height="180" rx="8" fill="#020617" stroke="#1e293b" />
                  <rect x="50" y="195" width="500" height="15" fill="#334155" />
                  <text x="300" y="206" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    Bề Mặt Đáy Kính Lam Kính (Anti-Digoxigenin / Biotin Surface)
                  </text>

                  {/* Neodymium Magnet Pair at Top (N & S poles) */}
                  {(() => {
                    const magnetY = 40 + Math.min(45, (magnetHeightMm - 1) * 6);
                    return (
                      <g>
                        {/* Magnet N */}
                        <rect x="230" y={magnetY - 25} width="65" height="22" rx="4" fill="#ef4444" stroke="#b91c1c" />
                        <text x="262" y={magnetY - 10} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          N
                        </text>

                        {/* Magnet S */}
                        <rect x="305" y={magnetY - 25} width="65" height="22" rx="4" fill="#3b82f6" stroke="#1d4ed8" />
                        <text x="337" y={magnetY - 10} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                          S
                        </text>

                        {/* Magnetic Field Lines */}
                        <path
                          d={`M 262,${magnetY} C 262,${magnetY + 25} 337,${magnetY + 25} 337,${magnetY}`}
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="1.5"
                          strokeDasharray="3,3"
                        />
                      </g>
                    );
                  })()}

                  {/* Superparamagnetic Bead (Dynabeads M-280, 2.8 µm diameter) */}
                  {(() => {
                    const beadY = currentPoint ? 195 - (currentPoint.extensionMicrons / maxExtY) * 125 : 120;
                    return (
                      <g>
                        {/* Tethered DNA (Showing supercoiled loops if plectonemic) */}
                        {currentPoint && currentPoint.state === 'PLECTONEME_BUCKLING' ? (
                          <path
                            d={`M 300,195 Q 285,${(195 + beadY) / 2} 300,${(195 + beadY) / 2 - 8} Q 315,${(195 + beadY) / 2} 300,${beadY + 16}`}
                            fill="none"
                            stroke="#ec4899"
                            strokeWidth="3"
                          />
                        ) : (
                          <line x1="300" y1="195" x2="300" y2={beadY + 16} stroke="#a855f7" strokeWidth="2.5" />
                        )}

                        {/* Bead Circle */}
                        <circle cx="300" cy={beadY} r="16" fill="#8b5cf6" stroke="#ede9fe" strokeWidth="2" opacity="0.9" />
                        <text x="300" y={beadY + 4} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                          Bead
                        </text>

                        {/* Constant Magnetic Force Vector */}
                        <line x1="300" y1={beadY - 18} x2="300" y2={beadY - 38} stroke="#c084fc" strokeWidth="2" />
                        <polygon points={`297,${beadY - 38} 300,${beadY - 45} 303,${beadY - 38}`} fill="#c084fc" />
                        <text x="315" y={beadY - 26} fill="#e9d5ff" fontSize="10" fontFamily="monospace">
                          F = {actualForcePn} pN
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            )}

            {viewMode === 'topoisomerase_stepping_trace' && topoisomeraseTrace && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-purple-300">
                    Vết Bước Xúc Tác Thời Gian Thực Enzyme Topoisomerase
                  </span>
                  <span className="font-mono text-emerald-300">
                    Độ biến thiên số liên kết: ΔLk = {specimen.catalyticStepDeltaLk} / chu kỳ
                  </span>
                </div>

                <svg viewBox="0 0 600 240" className="w-full h-auto max-h-[260px]">
                  {/* Grid */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                    const y = 200 - frac * 160;
                    const val = (maxExtY * frac).toFixed(1);
                    return (
                      <g key={`step-grid-${frac}`}>
                        <line x1="50" y1={y} x2="560" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x="42" y={y + 4} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                          {val} µm
                        </text>
                      </g>
                    );
                  })}

                  {/* Step Trace Line */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    points={topoisomeraseTrace
                      .map((pt) => {
                        const px = 50 + (pt.timeSec / 120) * 510;
                        const py = 200 - (pt.extensionMicrons / maxExtY) * 160;
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  <text x="540" y="45" fill="#34d399" fontSize="10" textAnchor="end" fontFamily="monospace">
                    Tháo siêu xoắn giải phóng nếp plectoneme
                  </text>
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1 px-3">
                  <span>Trục Hoành: Thời gian quan sát (0 - 120 giây)</span>
                  <span>Trục Tung: Chiều dài ADN hồi phục (µm)</span>
                </div>
              </div>
            )}

            {viewMode === 'topological_linking_diagram' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-purple-300">
                    Phân Tích Cấu Trúc Topo: Đẳng Thức Călugăreanu-White-Fuller
                  </span>
                  <span className="font-mono text-indigo-300">
                    Mật độ siêu xoắn: σ = {currentPoint ? currentPoint.supercoilingDensitySigma : 0}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full p-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-purple-800/50 flex flex-col items-center text-center">
                    <div className="text-[11px] font-mono text-purple-400 uppercase">Biến Thiên Số Liên Kết (ΔLk)</div>
                    <div className="text-2xl font-black text-white font-mono my-1">
                      {activeTurn > 0 ? `+${activeTurn}` : activeTurn}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Tổng số vòng xoắn được đưa vào bởi cặp nam châm quay ngoài
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-indigo-800/50 flex flex-col items-center text-center">
                    <div className="text-[11px] font-mono text-indigo-400 uppercase">Độ Xoắn Phân Tử (ΔTw)</div>
                    <div className="text-2xl font-black text-indigo-300 font-mono my-1">
                      {currentPoint && currentPoint.state === 'TWIST_ELASTIC' ? activeTurn : specimen.criticalBucklingTurns}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Gia tăng góc xoắn cục bộ giữa các cặp base (10.5 bp/turn)
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-pink-800/50 flex flex-col items-center text-center">
                    <div className="text-[11px] font-mono text-pink-400 uppercase">Độ Uốn Nếp Cuộn (ΔWr)</div>
                    <div className="text-2xl font-black text-pink-300 font-mono my-1">
                      {currentPoint && currentPoint.state === 'PLECTONEME_BUCKLING'
                        ? activeTurn > 0
                          ? activeTurn - specimen.criticalBucklingTurns
                          : activeTurn + specimen.criticalBucklingTurns
                        : 0}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Số vòng cuộn plectoneme trong không gian 3 chiều làm co ngắn sợi
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
                    <Sliders className="w-3.5 h-3.5 text-purple-400" /> Độ Cao Nam Châm (z_mag):
                  </span>
                  <span className="font-mono text-purple-300 font-bold">
                    {magnetHeightMm} mm <span className="text-slate-400 font-normal">({actualForcePn} pN)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.2"
                  value={magnetHeightMm}
                  onChange={(e) => setMagnetHeightMm(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-indigo-400" /> Vòng Quay Nam Châm (Turns n):
                  </span>
                  <span className="font-mono text-indigo-300 font-bold">
                    {activeTurn > 0 ? `+${activeTurn}` : activeTurn} vòng
                  </span>
                </div>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  step="2"
                  value={activeTurn}
                  onChange={(e) => handleTurnsChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Diagnostics & Realtime Data (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Active Data Readout Card */}
          <div className="bg-slate-900/90 border border-purple-800/40 rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-purple-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Magnet className="w-4 h-4 text-purple-400" />
              Thông Số Siêu Xoắn Thời Gian Thực
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Chiều Dài Giãn (z)</div>
                <div className="text-base font-bold font-mono text-purple-300">
                  {currentPoint ? currentPoint.extensionMicrons : 0} <span className="text-[10px] font-normal text-slate-400">µm</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Mật Độ Siêu Xoắn (σ)</div>
                <div className="text-base font-bold font-mono text-indigo-300">
                  {currentPoint ? currentPoint.supercoilingDensitySigma : 0}
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Lực Không Đổi (F)</div>
                <div className="text-base font-bold font-mono text-emerald-300">
                  {actualForcePn} <span className="text-[10px] font-normal text-slate-400">pN</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Trạng Thái Phân Tử</div>
                <div className="text-[11px] font-bold font-mono text-amber-300 truncate">
                  {currentPoint ? currentPoint.state : 'TWIST_ELASTIC'}
                </div>
              </div>
            </div>

            {/* State Diagnostic Badge */}
            <div className={`p-3 rounded-lg border flex items-center gap-2.5 text-xs ${
              currentPoint?.state === 'PLECTONEME_BUCKLING'
                ? 'bg-pink-950/40 border-pink-500/50 text-pink-200'
                : currentPoint?.state === 'MELTED_BUBBLE'
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                : 'bg-purple-950/40 border-purple-500/50 text-purple-200'
            }`}>
              <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
              <div>
                <div className="font-bold">
                  {currentPoint?.state === 'PLECTONEME_BUCKLING'
                    ? 'Chế Độ: Uốn Nếp Plectoneme (Writhing)'
                    : currentPoint?.state === 'MELTED_BUBBLE'
                    ? 'Chế Độ: Nóng Chảy Bong Bóng ADN'
                    : 'Chế Độ: Biến Dạng Xoắn Đàn Hồi (Twisting)'}
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  {currentPoint?.state === 'PLECTONEME_BUCKLING'
                    ? 'Sợi ADN uốn cong tạo thành các vòng xoắn kép quấn quanh nhau, chiều dài co ngắn ~52 nm/vòng.'
                    : currentPoint?.state === 'MELTED_BUBBLE'
                    ? 'Lực kéo cao kết hợp xoắn âm tháo dỡ liên kết hydro, tạo các bong bóng biến tính cục bộ.'
                    : 'Năng lượng đưa vào tích lũy dưới dạng nội biến dạng xoắn đàn hồi giữa các cặp bazơ lân cận.'}
                </div>
              </div>
            </div>

            {/* Inhibitor Drug Notice if present */}
            {specimen.inhibitorDrug && (
              <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/40 text-[11px] text-red-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  <strong>Ức Chế Dược Lý:</strong> {specimen.inhibitorDrug}
                </span>
              </div>
            )}
          </div>

          {/* Specimen Description */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-purple-400" />
              Chi Tiết Mẫu Vật Chuẩn
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed">{specimen.description}</div>
            <div className="text-[11px] text-purple-300/90 bg-purple-950/50 p-2.5 rounded-lg border border-purple-800/40 mt-1">
              <strong>Liên hệ chương trình GDPT 2018:</strong> {specimen.curriculumNotes}
            </div>
          </div>
        </div>
      </div>

      {/* Educational & Academic Reference Tabs */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('magnetic_trapping_force')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'magnetic_trapping_force'
                ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Nguyên Lý Bẫy Từ Lực Không Đổi
          </button>
          <button
            onClick={() => setActiveTab('topology_whites_theorem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'topology_whites_theorem'
                ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Định Lý Tôpô Călugăreanu-White
          </button>
          <button
            onClick={() => setActiveTab('topoisomerases_antibiotics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'topoisomerases_antibiotics'
                ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Cơ Chế Topoisomerase & Kháng Sinh Quinolone
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Tích Hợp GDPT 2018 Sinh Học & Vật Lý
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
          {activeTab === 'magnetic_trapping_force' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Nguyên Lý Hoạt Động Của Bẫy Từ Phân Tử (Magnetic Tweezers)
              </h4>
              <p>
                Khác với bẫy quang học (phụ thuộc vào vị trí hạt theo định luật Hooke), bẫy từ vi lưu tạo ra một lực kéo hoàn toàn không đổi trong suốt quá trình phân tử ADN biến dạng kéo dài hàng chục micromet:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-purple-300 rounded border border-slate-800 text-center my-2">
                F_mag = ½ · ∇(m · B) ≈ F₀ · exp(-z_mag / z₀)
              </div>
              <p>
                Cặp nam châm vĩnh cửu NdFeB đặt phía trên buồng vi lưu tạo ra gradient từ trường đồng nhất ∇B. Khi xoay cặp nam châm bằng động cơ bước, hạt siêu thuận từ (superparamagnetic bead) quay theo góc quay chính xác mà không gặp bất kỳ mômen phản hồi nào lên thiết bị, cho phép kiểm soát độc lập cả lực kéo (F) và mômen xoắn (torque).
              </p>
            </div>
          )}

          {activeTab === 'topology_whites_theorem' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Định Lý Călugăreanu-White-Fuller Về Cấu Trúc Tôpô ADN
              </h4>
              <p>
                Đối với một phân tử ADN mạch kép khép kín hoặc bị cố định hai đầu, số liên kết Lk là một bất biến tôpô bảo toàn:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-purple-300 rounded border border-slate-800 text-center my-2">
                ΔLk = ΔTw + ΔWr
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>
                  <strong className="text-purple-300">Độ xoắn nội tại (Twist Tw):</strong> Số vòng xoắn của hai mạch đơn quanh trục chuỗi xoắn kép (ở trạng thái B-DNA thư giãn là 10.5 cặp base/vòng).
                </li>
                <li>
                  <strong className="text-pink-300">Độ uốn nếp không gian (Writhe Wr):</strong> Số lần trục phân tử ADN tự vắt chéo qua chính nó trong không gian 3 chiều tạo thành các vòng plectoneme.
                </li>
              </ul>
              <p>
                Khi lực kéo nhỏ (F &lt; 0.5 pN), số vòng quay đưa vào vượt quá ngưỡng uốn nếp tới hạn n_c sẽ chuyển hóa thành uốn nếp plectoneme (Wr), làm chiều dài phân tử giảm tuyến tính với tốc độ ~52 nm/vòng xoắn.
              </p>
            </div>
          )}

          {activeTab === 'topoisomerases_antibiotics' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Enzyme Tháo Siêu Xoắn Topoisomerase & Cơ Chế Kháng Sinh Quinolone
              </h4>
              <p>
                <strong>Topoisomerase I:</strong> Cắt tạm thời 1 sợi đơn ADN, cho phép sợi kia quay tự do giải tỏa ứng suất xoắn trước chạc nhân đôi với bước giải phóng <code>ΔLk = +1</code> mỗi chu kỳ xúc tác mà không cần ATP.
              </p>
              <p>
                <strong>ADN Gyrase & Topoisomerase II:</strong> Cắt tạm thời cả 2 mạch đơn, mở cổng vận chuyển một đoạn kép ADN thứ hai đi xuyên qua khe hở rồi hàn kín lại, tiêu tốn năng lượng của 2 phân tử ATP để thay đổi <code>ΔLk = ±2</code>.
              </p>
              <p>
                <strong>Kháng sinh Fluoroquinolone (Ciprofloxacin):</strong> Ức chế đặc hiệu ADN Gyrase của vi khuẩn, bẫy phức hệ Gyrase-ADN ở trạng thái cắt đứt làm ngưng trệ quá trình nhân đôi và gây chết tế bào vi khuẩn. Thuốc ung thư Etoposide có cơ chế bẫy tương tự trên Topoisomerase II người.
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
                  <strong>Sinh học 10 & 12 (Chủ đề Cơ sở phân tử & Di truyền học):</strong> Cấu trúc không gian bậc 3 của ADN, áp lực siêu xoắn phía trước chạc nhân đôi ADN, vai trò của Topoisomerase tháo xoắn để ADN polymerase tổng hợp mạch mới.
                </li>
                <li>
                  <strong>Sinh học 12 (Chủ đề Ứng dụng di truyền & Dược lý):</strong> Cơ chế tác động của kháng sinh nhóm quinolone, hiện tượng đột biến gen kháng thuốc ở vi khuẩn.
                </li>
                <li>
                  <strong>Vật lý 12 (Chủ đề Từ trường & Tương tác từ):</strong> Lực từ tác dụng lên hạt mang từ tính trong từ trường không đều, mômen ngẫu lực từ và ứng dụng trong thiết bị vi lưu sinh học.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
