// src/components/visualizations/StmVisualizer.tsx
// Milestone 69: Scanning Tunneling Microscopy (STM), Quantum Tunneling & Tersoff-Hamann LDOS Visualizer
// Standards: Gerd Binnig & Heinrich Rohrer (Nobel Prize in Physics 1986) & Tersoff-Hamann Theory (1983)
// Curriculum: Vietnam GDPT 2018 (Vật lý 12: Hiệu ứng xuyên ngầm lượng tử, hàm sóng, vật liệu nano; Hóa học 10 & 12: Orbital nguyên tử, than chì HOPG)

import React, { useState, useMemo } from 'react';
import {
  STM_SPECIMEN_CATALOG,
  StmSpecimenStandard,
  simulateStmExperiment,
  calculateTunnelingDecayConstant,
  calculateTunnelingCurrent
} from '../../domain/stmEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sparkles,
  Activity,
  Layers,
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
  Zap,
  ShieldAlert,
  Clock,
  Target,
  Maximize,
  Grid
} from 'lucide-react';

export interface StmVisualizerProps {
  initialSpecimenId?: string;
}

export const StmVisualizer: React.FC<StmVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'si111_7x7_reconstruction'
  );
  const [tipDistanceAngstroms, setTipDistanceAngstroms] = useState<number>(5.0);
  const [biasVoltageVolts, setBiasVoltageVolts] = useState<number>(1.5);
  const [viewMode, setViewMode] = useState<
    'topography_atomic_lattice' | 'quantum_barrier_tunneling_gap' | 'sts_differential_conductance' | 'tersoff_hamann_ldos_theory'
  >('topography_atomic_lattice');
  const [activeTab, setActiveTab] = useState<
    'binnig_rohrer_quantum_origins' | 'tersoff_hamann_ldos' | 'sts_bandgap_spectroscopy' | 'curriculum_gdpt'
  >('binnig_rohrer_quantum_origins');

  const simResult = useMemo(() => {
    return simulateStmExperiment(selectedSpecimenId, tipDistanceAngstroms, biasVoltageVolts);
  }, [selectedSpecimenId, tipDistanceAngstroms, biasVoltageVolts]);

  const {
    specimen,
    decayConstantKappaAngstromInv,
    tunnelingCurrentNanoAmps,
    topographyGrid,
    spectroscopyCurve,
    subAngstromSensitivityRatio
  } = simResult;

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    const spec = STM_SPECIMEN_CATALOG.find((s) => s.id === id);
    if (spec) {
      setBiasVoltageVolts(spec.typicalBiasVoltageVolts);
    }
    sound.playStmQuantumTunnelingHum(spec?.setpointCurrentNanoAmps || 1.0);
  };

  const handleDistanceChange = (newDistance: number) => {
    setTipDistanceAngstroms(newDistance);
    const newCurrent = calculateTunnelingCurrent(biasVoltageVolts, newDistance, specimen.workFunctionEv);
    sound.playStmQuantumTunnelingHum(newCurrent);
  };

  const handleBiasChange = (newBias: number) => {
    setBiasVoltageVolts(newBias);
    const isGap = specimen.bandGapEv ? Math.abs(newBias) < (specimen.bandGapEv / 2) : false;
    sound.playStsBandGapEdgePing(isGap);
  };

  // SVG dimensions for STS plot
  const svgW = 600;
  const svgH = 300;
  const padL = 60;
  const padR = 30;
  const padT = 30;
  const padB = 45;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const maxDidv = useMemo(() => {
    if (spectroscopyCurve.length === 0) return 3.0;
    return Math.max(2.0, Math.max(...spectroscopyCurve.map((p) => p.differentialConductanceDiDv)) * 1.15);
  }, [spectroscopyCurve]);

  return (
    <div className="bg-slate-950/95 border border-sky-800/40 rounded-xl p-5 shadow-2xl backdrop-blur-md text-slate-100 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-800/30 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-sky-950/80 text-sky-300 border border-sky-700/50 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              NOBEL PRIZE IN PHYSICS 1986 • BINNIG &amp; ROHRER
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
              QUANTUM TUNNELING (0.01 Å / 1 pm RESOLUTION)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
              GDPT 2018 VIETNAM
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Kính Hiển Vi Quét Xuyên Ngầm Lượng Tử STM
            <span className="text-sky-400 font-serif italic text-lg">(Scanning Tunneling Microscopy &amp; Tersoff-Hamann LDOS)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Mô phỏng dòng điện xuyên ngầm lượng tử I_t ∝ V·exp(-2κd), độ nhạy hàm mũ gấp 10 lần mỗi 1 Å, quang phổ dẫn vi phân dI/dV giải mã khe năng lượng band gap và tái cấu trúc mạng nguyên tử Si(111)-7×7, than chì HOPG.
          </p>
        </div>

        {/* Global Metric Badges */}
        <div className="flex items-center gap-2.5">
          <div className="bg-slate-900/90 border border-sky-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-sky-400">Dòng Xuyên Ngầm (I_t)</div>
            <div className="text-lg font-bold font-mono text-sky-200">
              {tunnelingCurrentNanoAmps} <span className="text-xs text-sky-400 font-normal">nA</span>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-indigo-600/40 rounded-lg px-3 py-2 text-right">
            <div className="text-[10px] uppercase font-mono text-indigo-400">Độ Nhạy Lượng Tử (ΔI/1Å)</div>
            <div className="text-lg font-bold font-mono text-indigo-200">
              {subAngstromSensitivityRatio}× <span className="text-xs text-indigo-400 font-normal">/ Å</span>
            </div>
          </div>
          <button
            onClick={() => sound.playStmQuantumTunnelingHum(tunnelingCurrentNanoAmps)}
            title="Nghe âm thanh dòng điện xuyên ngầm lượng tử"
            className="p-2.5 bg-sky-900/40 hover:bg-sky-800/60 border border-sky-600/50 rounded-lg text-sky-300 transition-all flex items-center justify-center shadow-lg active:scale-95"
          >
            <Volume2 className="w-5 h-5 text-sky-300" />
          </button>
        </div>
      </div>

      {/* Specimen Standard Selector Carousel */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          Mẫu Tiêu Chuẩn Hiển Vi Quét Xuyên Ngầm STM (5 Chuẩn Quốc Tế IUPAP/Nanotech):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {STM_SPECIMEN_CATALOG.map((std) => {
            const isSelected = std.id === selectedSpecimenId;
            return (
              <button
                key={std.id}
                onClick={() => handleSelectSpecimen(std.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-950/70 border-sky-400 shadow-md shadow-sky-950/50 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-sky-300">
                      {std.materialType.replace(/_/g, ' ')}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                  </div>
                  <div className="text-xs font-bold text-white leading-snug mb-1">{std.name}</div>
                  <div className="text-[11px] text-sky-200/80 line-clamp-2">{std.vietnameseName}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400">Φ: {std.workFunctionEv} eV</span>
                  <span className="text-amber-400">{std.bandGapEv ? `${std.bandGapEv} eV` : 'Kim loại'}</span>
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
                  setViewMode('topography_atomic_lattice');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'topography_atomic_lattice'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                Ảnh Địa Hình Mạng Nguyên Tử (LDOS Map)
              </button>
              <button
                onClick={() => {
                  setViewMode('quantum_barrier_tunneling_gap');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'quantum_barrier_tunneling_gap'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Hàng Rào Thế Chân Không &amp; Hàm Sóng
              </button>
              <button
                onClick={() => {
                  setViewMode('sts_differential_conductance');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'sts_differential_conductance'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Quang Phổ Dẫn Vi Phân dI/dV (STS)
              </button>
              <button
                onClick={() => {
                  setViewMode('tersoff_hamann_ldos_theory');
                  sound.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  viewMode === 'tersoff_hamann_ldos_theory'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                Lý Thuyết Tersoff-Hamann LDOS
              </button>
            </div>

            <div className="text-[11px] font-mono text-sky-300 px-2 hidden sm:block">
              κ = {decayConstantKappaAngstromInv} Å⁻¹
            </div>
          </div>

          {/* Render Active View Mode */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[340px]">
            {viewMode === 'topography_atomic_lattice' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-sky-300">
                    Bản Đồ Mật Độ Trạng Thái Cục Bộ (LDOS) • Kích Thước Quét: {specimen.gridSizeAngstroms} Å × {specimen.gridSizeAngstroms} Å
                  </span>
                  <span className="font-mono text-amber-300">
                    Điện thế phân cực V_bias = {biasVoltageVolts > 0 ? `+${biasVoltageVolts}` : biasVoltageVolts} V
                  </span>
                </div>

                <div className="relative p-2 bg-slate-950 rounded-lg border border-slate-800 shadow-inner flex items-center justify-center">
                  <svg viewBox="0 0 288 288" className="w-[280px] h-[280px]">
                    {topographyGrid.map((row, iy) =>
                      row.map((cell, ix) => {
                        const cellW = 288 / 24;
                        const cellH = 288 / 24;
                        // Intensity based on LDOS value
                        const hue = 195; // Sky/Cyan hue
                        const lightness = Math.floor(10 + cell.localDosValue * 65);
                        return (
                          <rect
                            key={`cell-${ix}-${iy}`}
                            x={ix * cellW}
                            y={iy * cellH}
                            width={cellW + 0.5}
                            height={cellH + 0.5}
                            fill={`hsl(${hue}, 85%, ${lightness}%)`}
                          />
                        );
                      })
                    )}
                  </svg>
                </div>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-3">
                  <span>Trục X, Y: Tọa độ bề mặt mạng tinh thể (Ångström, 1 Å = 0.1 nm = 100 pm)</span>
                  <span className="text-sky-300">Độ sáng: Mật độ orbital điện tử tại mức Fermi</span>
                </div>
              </div>
            )}

            {viewMode === 'quantum_barrier_tunneling_gap' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-sky-300">
                    Hàng Rào Thế Chân Không &amp; Sự Suy Giảm Hàm Sóng Lượng Tử ψ(z) ~ e^(-κz)
                  </span>
                  <span className="font-mono text-amber-300">
                    Khoảng cách mũi nhọn - mẫu: d = {tipDistanceAngstroms} Å
                  </span>
                </div>

                <svg viewBox="0 0 600 240" className="w-full h-auto max-h-[260px]">
                  {/* Tip Apex Metal (Tungsten W or Pt-Ir) */}
                  <polygon points="260,20 340,20 305,95 295,95" fill="#475569" stroke="#64748b" strokeWidth="2" />
                  {/* Apex Single Atom */}
                  <circle cx="300" cy="100" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="300" y="45" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    Mũi Nhọn Kim Loại (Đơn Nguyên Tử Đỉnh)
                  </text>

                  {/* Sample Surface at Bottom */}
                  {(() => {
                    const sampleY = 100 + tipDistanceAngstroms * 14;
                    return (
                      <g>
                        {/* Sample Surface Slab */}
                        <rect x="50" y={sampleY} width="500" height="40" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                        <text x="300" y={sampleY + 24} fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                          Bề Mặt Mẫu Dẫn Điện ({specimen.name.split('(')[0]})
                        </text>

                        {/* Vacuum Tunneling Barrier Gap Zone */}
                        <rect x="250" y="108" width="100" height={sampleY - 108} fill="#38bdf8" opacity="0.08" />

                        {/* Quantum Tunneling Exponential Wavefunction Line ψ(z) */}
                        <path
                          d={`M 300,108 Q 300,${108 + (sampleY - 108) * 0.75} 300,${sampleY}`}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="3"
                          strokeDasharray="4,2"
                        />

                        {/* Dimension Arrow for d */}
                        <line x1="230" y1="108" x2="230" y2={sampleY} stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="220" y={(108 + sampleY) / 2 + 4} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                          d = {tipDistanceAngstroms} Å
                        </text>
                      </g>
                    );
                  })()}

                  {/* Bias voltage indicator */}
                  <text x="540" y="45" fill="#f59e0b" fontSize="10" textAnchor="end" fontFamily="monospace">
                    V_bias = {biasVoltageVolts} V
                  </text>
                  <text x="540" y="60" fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="monospace">
                    I_t = {tunnelingCurrentNanoAmps} nA
                  </text>
                </svg>
              </div>
            )}

            {viewMode === 'sts_differential_conductance' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-sky-300">
                    Phổ Dẫn Vi Phân STS: (dI/dV) ~ Mật Độ Trạng Thái LDOS ρ(E)
                  </span>
                  <span className="font-mono text-amber-300">
                    {specimen.bandGapEv ? `Khe Vùng Band Gap: ${specimen.bandGapEv} eV` : 'Bán kim loại / Kim loại (Zero Gap)'}
                  </span>
                </div>

                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((tickFrac) => {
                    const y = padT + plotH * (1 - tickFrac);
                    const didvVal = (maxDidv * tickFrac).toFixed(1);
                    return (
                      <g key={`y-grid-${tickFrac}`}>
                        <line x1={padL} y1={y} x2={svgW - padR} y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={padL - 10} y={y + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
                          {didvVal}
                        </text>
                      </g>
                    );
                  })}

                  {[-2.0, -1.0, 0.0, 1.0, 2.0].map((vVal) => {
                    const x = padL + ((vVal + 2.0) / 4.0) * plotW;
                    return (
                      <g key={`x-grid-${vVal}`}>
                        <line x1={x} y1={padT} x2={x} y2={padT + plotH} stroke="#1e293b" strokeDasharray="3,3" />
                        <text x={x} y={padT + plotH + 18} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {vVal > 0 ? `+${vVal}` : vVal} V
                        </text>
                      </g>
                    );
                  })}

                  {/* Fermi Level Center Line (V = 0 V) */}
                  <line
                    x1={padL + plotW * 0.5}
                    y1={padT}
                    x2={padL + plotW * 0.5}
                    y2={padT + plotH}
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    strokeDasharray="4,4"
                  />
                  <text x={padL + plotW * 0.5} y={padT - 6} fill="#38bdf8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    Mức Fermi (E_F = 0 eV)
                  </text>

                  {/* Band Gap Shaded Region if exists */}
                  {specimen.bandGapEv && specimen.bandGapEv > 0 && (
                    <rect
                      x={padL + ((2.0 - specimen.bandGapEv / 2.0) / 4.0) * plotW}
                      y={padT}
                      width={(specimen.bandGapEv / 4.0) * plotW}
                      height={plotH}
                      fill="#ef4444"
                      opacity="0.12"
                    />
                  )}

                  {/* Axis lines */}
                  <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />
                  <line x1={padL} y1={padT + plotH} x2={svgW - padR} y2={padT + plotH} stroke="#475569" strokeWidth="1.5" />

                  {/* dI/dV Curve */}
                  <polyline
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.8"
                    points={spectroscopyCurve
                      .map((p) => {
                        const px = padL + ((p.biasVoltageVolts + 2.0) / 4.0) * plotW;
                        const py = padT + plotH * (1 - Math.min(maxDidv, p.differentialConductanceDiDv) / maxDidv);
                        return `${px},${py}`;
                      })
                      .join(' ')}
                  />

                  {/* Current Active Bias Voltage Marker */}
                  {(() => {
                    const px = padL + ((biasVoltageVolts + 2.0) / 4.0) * plotW;
                    const curPt = spectroscopyCurve.find((p) => Math.abs(p.biasVoltageVolts - biasVoltageVolts) < 0.04);
                    const py = curPt
                      ? padT + plotH * (1 - Math.min(maxDidv, curPt.differentialConductanceDiDv) / maxDidv)
                      : padT + plotH * 0.5;
                    return (
                      <g>
                        <circle cx={px} cy={py} r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" className="animate-ping" opacity="0.4" />
                        <circle cx={px} cy={py} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                        <line x1={px} y1={padT} x2={px} y2={padT + plotH} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                      </g>
                    );
                  })()}
                </svg>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-3">
                  <span>Trục Hoành: Điện thế phân cực V_bias (Volts, âm = vùng hóa trị, dương = vùng dẫn)</span>
                  <span>Trục Tung: Độ dẫn vi phân dI/dV ~ Mật độ trạng thái LDOS</span>
                </div>
              </div>
            )}

            {viewMode === 'tersoff_hamann_ldos_theory' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
                  <span className="font-mono text-sky-300">
                    Bản Chất Lượng Tử: STM Không Chụp Hạt Nhân Mà Chụp Mây Điện Tử Orbital
                  </span>
                  <span className="font-mono text-amber-300">
                    Tersoff &amp; Hamann (Phys. Rev. B 1985)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full p-2">
                  <div className="bg-slate-950 p-4 rounded-xl border border-sky-800/40 flex flex-col items-center text-center">
                    <div className="text-xs font-bold text-sky-300 mb-1">Điện Thế Âm (V_bias &lt; 0): Trạng Thái Chiếm (Filled)</div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Electron chui hầm từ <strong>vùng hóa trị của mẫu</strong> sang các trạng thái trống của mũi kim. Cho phép quan sát các cặp electron tự do (lone pairs) hoặc liên kết hóa trị.
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-sky-800/40 flex flex-col items-center text-center">
                    <div className="text-xs font-bold text-amber-300 mb-1">Điện Thế Dương (V_bias &gt; 0): Trạng Thái Trống (Empty)</div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Electron chui hầm từ <strong>mũi kim sang vùng dẫn của mẫu</strong>. Hình ảnh phản ánh mật độ orbital phản liên kết và orbital chưa chiếm ở bề mặt (như adatom trên Si(111)).
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
                    <Sliders className="w-3.5 h-3.5 text-sky-400" /> Khoảng Cách Đầu Dò (d):
                  </span>
                  <span className="font-mono text-sky-300 font-bold">
                    {tipDistanceAngstroms} Å <span className="text-slate-400 font-normal">({tunnelingCurrentNanoAmps} nA)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="8.0"
                  step="0.1"
                  value={tipDistanceAngstroms}
                  onChange={(e) => handleDistanceChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> Điện Thế Phân Cực (V_bias):
                  </span>
                  <span className="font-mono text-amber-300 font-bold">
                    {biasVoltageVolts > 0 ? `+${biasVoltageVolts}` : biasVoltageVolts} V
                  </span>
                </div>
                <input
                  type="range"
                  min="-2.0"
                  max="2.0"
                  step="0.1"
                  value={biasVoltageVolts}
                  onChange={(e) => handleBiasChange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Physical Diagnostics & Realtime Data (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Active Data Readout Card */}
          <div className="bg-slate-900/90 border border-sky-800/40 rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-sky-400 flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Thông Số Xuyên Ngầm Thời Gian Thực
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Công Thoát (Φ)</div>
                <div className="text-base font-bold font-mono text-sky-300">
                  {specimen.workFunctionEv} <span className="text-[10px] font-normal text-slate-400">eV</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Hệ Số Suy Giảm (κ)</div>
                <div className="text-base font-bold font-mono text-amber-300">
                  {decayConstantKappaAngstromInv} <span className="text-[10px] font-normal text-slate-400">Å⁻¹</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Độ Nhạy Lượng Tử</div>
                <div className="text-base font-bold font-mono text-emerald-300">
                  {subAngstromSensitivityRatio}× <span className="text-[10px] font-normal text-slate-400">/ Å</span>
                </div>
              </div>

              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono">Khe Năng Lượng (E_g)</div>
                <div className="text-base font-bold font-mono text-purple-300">
                  {specimen.bandGapEv ? `${specimen.bandGapEv} eV` : '0 eV'}
                </div>
              </div>
            </div>

            {/* Atomic features */}
            <div className="p-3 rounded-lg border bg-sky-950/40 border-sky-500/50 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5 text-sky-400" /> Đặc Điểm Bề Mặt Nguyên Tử:
              </div>
              <div className="text-[11px] text-sky-200 mt-0.5">{specimen.atomicFeaturesDescription}</div>
            </div>
          </div>

          {/* Specimen Description */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              Chi Tiết Mẫu Vật Chuẩn
            </h4>
            <div className="text-xs text-slate-300 leading-relaxed">{specimen.description}</div>
            <div className="text-[11px] text-sky-300/90 bg-sky-950/50 p-2.5 rounded-lg border border-sky-800/40 mt-1">
              <strong>Liên hệ chương trình GDPT 2018:</strong> {specimen.curriculumNotes}
            </div>
          </div>
        </div>
      </div>

      {/* Educational & Academic Reference Tabs */}
      <div className="flex flex-col gap-3 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('binnig_rohrer_quantum_origins')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'binnig_rohrer_quantum_origins'
                ? 'bg-sky-950 text-sky-300 border border-sky-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Giải Nobel Binnig-Rohrer &amp; Hiệu Ứng Xuyên Ngầm
          </button>
          <button
            onClick={() => setActiveTab('tersoff_hamann_ldos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'tersoff_hamann_ldos'
                ? 'bg-sky-950 text-sky-300 border border-sky-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Lý Thuyết Tersoff-Hamann Về Mật Độ Trạng Thái
          </button>
          <button
            onClick={() => setActiveTab('sts_bandgap_spectroscopy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'sts_bandgap_spectroscopy'
                ? 'bg-sky-950 text-sky-300 border border-sky-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Quang Phổ Dẫn Vi Phân dI/dV &amp; Khe Vùng
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-sky-950 text-sky-300 border border-sky-700/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Tích Hợp GDPT 2018 Vật Lý &amp; Hóa Học
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
          {activeTab === 'binnig_rohrer_quantum_origins' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Giải Nobel Vật Lý 1986 - Gerd Binnig &amp; Heinrich Rohrer: Kính Hiển Vi Quét Xuyên Ngầm
              </h4>
              <p>
                Trong cơ học cổ điển, electron không thể vượt qua hàng rào thế năng có độ cao lớn hơn động năng của nó. Nhưng theo cơ học lượng tử, hàm sóng Schrödinger của electron xuyên ngấm qua hàng rào chân không và suy giảm theo hàm mũ:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-sky-300 rounded border border-slate-800 text-center my-2">
                I_t ∝ V_bias · exp(-2 κ d)   với   κ = √(2m·Φ) / ℏ ≈ 0.512·√(Φ) Å⁻¹
              </div>
              <p>
                Với công thoát trung bình Φ ≈ 4.5 eV, hệ số 2κ ≈ 2.2 Å⁻¹. Do đó, khi khoảng cách đầu dò tăng thêm chỉ 1 Å (0.1 nm), dòng điện xuyên ngầm giảm đi xấp xỉ 10 lần (một bậc độ lớn!). Nhờ độ nhạy hàm mũ cực đại này, STM có thể định vị bề mặt với độ phân giải thẳng đứng đạt 0.01 Å (1 picomet).
              </p>
            </div>
          )}

          {activeTab === 'tersoff_hamann_ldos' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Lý Thuyết Tersoff-Hamann: Bản Chất Ảnh STM Không Phải Hạt Nhân Nguyên Tử
              </h4>
              <p>
                Jerry Tersoff và Don Hamann đã chứng minh rằng dòng điện xuyên ngầm ở giới hạn điện thế phân cực nhỏ tỷ lệ thuận với Mật độ Trạng thái Cục bộ (Local Density of States - LDOS) của mẫu tại vị trí tâm của nguyên tử đỉnh mũi nhọn r₀ và tại mức năng lượng Fermi E_F:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-sky-300 rounded border border-slate-800 text-center my-2">
                I_t(r₀, V) ∝ ρ_sample(r₀, E_F) · V_bias
              </div>
              <p>
                Điều này giải thích tại sao trên bề mặt than chì HOPG, mạng tinh thể có 2 loại nguyên tử carbon (α và β), nhưng ảnh STM chỉ nhìn thấy một nửa số nguyên tử (mạng con β), vì các nguyên tử α liên kết với lớp bên dưới có LDOS tại mức Fermi thấp hơn nhiều!
              </p>
            </div>
          )}

          {activeTab === 'sts_bandgap_spectroscopy' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">
                Quang Phổ Xuyên Ngầm Quét (STS) &amp; Đo Trực Tiếp Khe Vùng Năng Lượng
              </h4>
              <p>
                Bằng cách tắt mạch hồi tiếp giữ khoảng cách cố định và quét điện thế V_bias từ âm sang dương, đạo hàm vi phân của dòng điện theo hiệu điện thế dI/dV phản ánh trực tiếp mật độ trạng thái điện tử ở mức năng lượng E = E_F + e·V:
              </p>
              <div className="p-2.5 bg-slate-950 font-mono text-sky-300 rounded border border-slate-800 text-center my-2">
                (dI / dV) / (I / V) ∝ ρ(E_F + e·V_bias)
              </div>
              <p>
                Kỹ thuật này cho phép đo trực tiếp khe vùng năng lượng band gap của chất bán dẫn (vùng có dI/dV ≈ 0), phát hiện các kỳ dị van Hove trong ống nano carbon 1 chiều và các sóng điện tử đứng trong chuồng lượng tử (Quantum Corral).
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
                  <strong>Vật lý 12 (Chủ đề Lượng tử ánh sáng &amp; Sóng vật chất):</strong> Bản chất lưỡng tính sóng-hạt của electron, hệ thức de Broglie, hiện tượng xuyên ngầm lượng tử qua hàng rào thế năng và công nghệ nano hiện đại.
                </li>
                <li>
                  <strong>Hóa học 10 &amp; 12 (Chủ đề Cấu tạo nguyên tử &amp; Mạng tinh thể):</strong> Khái niệm orbital nguyên tử (xác suất tìm thấy electron), cấu trúc tinh thể kim cương và than chì (graphite), liên kết cộng hóa trị của silic.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
