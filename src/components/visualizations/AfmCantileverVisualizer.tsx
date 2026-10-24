// src/components/visualizations/AfmCantileverVisualizer.tsx
// Milestone 54: Atomic Force Microscopy (AFM), Lennard-Jones Force-Distance Spectroscopy & Cantilever Mechanics Visualizer
// Standards: Nobel Prize in Physics 1986 (Gerd Binnig & Heinrich Rohrer / Christoph Gerber & Calvin Quate)
// Curriculum: Vietnam GDPT 2018 (Vật lý 10: Định luật Hooke; Vật lý 12: Dao động & Cộng hưởng; Hóa học 10: Lực Van der Waals; Hóa học 12: Cấu trúc đại phân tử sinh học)

import React, { useState, useMemo } from 'react';
import {
  CANTILEVER_CATALOG,
  AFM_SAMPLE_CATALOG,
  AfmOperationMode,
  simulateAfmForceCurve,
  calculateLennardJonesPotential,
  calculateLennardJonesForceNanoNewtons
} from '../../domain/afmCantileverEngine';
import { sound } from '../../audio/soundEngine';
import {
  Compass,
  Activity,
  Layers,
  Award,
  Sparkles,
  Info,
  Radio,
  Sliders,
  CheckCircle2,
  Atom,
  Flame,
  ShieldAlert,
  MoveVertical,
  Zap
} from 'lucide-react';

export interface AfmCantileverVisualizerProps {
  initialSampleId?: string;
}

export const AfmCantileverVisualizer: React.FC<AfmCantileverVisualizerProps> = ({
  initialSampleId
}) => {
  const [selectedCantileverId, setSelectedCantileverId] = useState<string>('soft_contact_si3n4');
  const [selectedSampleId, setSelectedSampleId] = useState<string>(initialSampleId || 'dna_double_helix_mica');
  const [operationMode, setOperationMode] = useState<AfmOperationMode>('CONTACT_MODE');
  const [piezoPositionNm, setPiezoPositionNm] = useState<number>(1.5); // Current tip-sample distance
  const [activeTab, setActiveTab] = useState<'force_distance_curve' | 'cantilever_mechanics' | 'operating_modes_tapping' | 'nobel_curriculum_gdpt'>('force_distance_curve');
  const [showPotentialCurve, setShowPotentialCurve] = useState<boolean>(true);

  const simResult = useMemo(() => {
    return simulateAfmForceCurve(selectedCantileverId, selectedSampleId, operationMode);
  }, [selectedCantileverId, selectedSampleId, operationMode]);

  const { cantilever, sample, approachCurve, retractionCurve, snapInDistanceNm, pullOffForceNanoNewtons } = simResult;

  const handleCantileverChange = (id: string) => {
    setSelectedCantileverId(id);
    const probe = CANTILEVER_CATALOG[id];
    if (probe) {
      setOperationMode(probe.recommendedMode);
    }
    sound.playUiClick();
    sound.playAfmTipApproachSnap();
  };

  const handleSampleChange = (id: string) => {
    setSelectedSampleId(id);
    sound.playUiClick();
    sound.playAfmTipApproachSnap();
  };

  const handleModeChange = (mode: AfmOperationMode) => {
    setOperationMode(mode);
    sound.playUiClick();
    if (mode === 'TAPPING_MODE') {
      sound.playAfmTappingResonanceHum(cantilever.resonantFrequencyKhz > 100 ? 660 : 440);
    } else {
      sound.playAfmTipApproachSnap();
    }
  };

  // Dimensions for Force-Distance Plot
  const svgWidth = 840;
  const svgHeight = 360;
  const padLeft = 70;
  const padRight = 45;
  const padTop = 40;
  const padBottom = 55;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  const minZ = -0.8;
  const maxZ = 4.0;
  const minF = Math.min(-6.0, pullOffForceNanoNewtons * 1.3);
  const maxF = Math.max(12.0, sample.adhesionForceNanoNewtons * 3.5);

  const getX = (z: number) => {
    const frac = (z - minZ) / (maxZ - minZ);
    return padLeft + frac * plotWidth;
  };

  const getY = (f: number) => {
    const frac = (f - minF) / (maxF - minF);
    return padTop + plotHeight - frac * plotHeight;
  };

  // SVG Paths for Approach and Retraction
  const approachPath = useMemo(() => {
    return approachCurve
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.tipSampleDistanceNm).toFixed(1)} ${getY(pt.interactionForceNanoNewtons).toFixed(1)}`)
      .join(' ');
  }, [approachCurve, minF, maxF]);

  const retractionPath = useMemo(() => {
    return retractionCurve
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.tipSampleDistanceNm).toFixed(1)} ${getY(pt.interactionForceNanoNewtons).toFixed(1)}`)
      .join(' ');
  }, [retractionCurve, minF, maxF]);

  // Current real-time force at piezoPositionNm
  const currentForceNn = useMemo(() => {
    if (piezoPositionNm > snapInDistanceNm) {
      return calculateLennardJonesForceNanoNewtons(
        piezoPositionNm,
        sample.vanDerWaalsEnergyEpsilonEv,
        sample.equilibriumDistanceSigmaNm
      );
    }
    if (piezoPositionNm > 0) {
      return -0.85 * sample.adhesionForceNanoNewtons;
    }
    const indentation = -piezoPositionNm;
    return indentation * cantilever.springConstantNPerM * 8.0 * (1 + sample.youngsModulusGpa / 50.0);
  }, [piezoPositionNm, snapInDistanceNm, sample, cantilever]);

  return (
    <div className="bg-navy-light/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header & Nobel Citations */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
              Milestone 54 • Atomic Force Microscopy (AFM)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              k_c = {cantilever.springConstantNPerM} N/m
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-ivory tracking-wide flex items-center gap-2 mt-1">
            <MoveVertical className="w-6 h-6 text-emerald-400" />
            Kính Hiển Vi Lực Nguyên Tử (AFM) & Phổ Lực Lennard-Jones (12-6)
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Nobel Vật Lý 1986 (Gerd Binnig & Christoph Gerber - Phát minh AFM) • Cảm nhận lực tương tác nguyên tử ở thang piconewton (10⁻¹² N)
          </p>
        </div>

        {/* Quick Instrument Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-right">
          <div className="bg-navy-dark/70 border border-emerald-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Độ Cứng Cần Dầm</span>
            <span className="text-xs font-black text-emerald-300">{cantilever.springConstantNPerM} N/m</span>
          </div>
          <div className="bg-navy-dark/70 border border-cyan-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Tần Số Cộng Hưởng</span>
            <span className="text-xs font-black text-cyan-300">{cantilever.resonantFrequencyKhz} kHz</span>
          </div>
          <div className="bg-navy-dark/70 border border-amber-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Bán Kính Đầu Mũi</span>
            <span className="text-xs font-black text-amber-300">R ~ {cantilever.tipRadiusNm} nm</span>
          </div>
          <div className="bg-navy-dark/70 border border-purple-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Lực Dính Kéo Rút</span>
            <span className="text-xs font-black text-purple-300">{sample.adhesionForceNanoNewtons} nN</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-navy-dark/60 border border-white/5 rounded-xl p-4">
        {/* Cantilever Probe Selection */}
        <div>
          <label className="text-xs font-bold text-emerald-300 block mb-1.5 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Đầu Dò Cần Dầm (Cantilever):
          </label>
          <div className="space-y-1.5">
            {Object.values(CANTILEVER_CATALOG).map((pr) => (
              <button
                key={pr.id}
                onClick={() => handleCantileverChange(pr.id)}
                className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all border ${
                  selectedCantileverId === pr.id
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-md'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                <div className="font-bold truncate">{pr.name.split('(')[0]}</div>
                <div className="text-[10px] text-emerald-300 font-mono">
                  k = {pr.springConstantNPerM} N/m • f₀ = {pr.resonantFrequencyKhz} kHz
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sample Selection */}
        <div>
          <label className="text-xs font-bold text-cyan-300 block mb-1.5 flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5" />
            Mẫu Bề Mặt Khảo Sát:
          </label>
          <div className="space-y-1.5">
            {Object.values(AFM_SAMPLE_CATALOG).map((sp) => (
              <button
                key={sp.id}
                onClick={() => handleSampleChange(sp.id)}
                className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all border ${
                  selectedSampleId === sp.id
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-md'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                <div className="font-bold truncate">{sp.name.split('(')[0]}</div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  E = {sp.youngsModulusGpa} GPa • F_adh = {sp.adhesionForceNanoNewtons} nN
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Operating Mode & Piezo Z Slider */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-amber-300 block mb-1.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Chế Độ Hoạt Động (Mode):
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['CONTACT_MODE', 'TAPPING_MODE', 'NON_CONTACT_MODE'] as AfmOperationMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  className={`p-1.5 rounded-lg text-[11px] font-bold border transition-all text-center ${
                    operationMode === m
                      ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow'
                      : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                  }`}
                >
                  {m === 'CONTACT_MODE' ? 'Contact' : m === 'TAPPING_MODE' ? 'Tapping' : 'Non-Contact'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <MoveVertical className="w-3.5 h-3.5" />
                Vị Trí Piezo Z (Cự Ly Đầu Dò):
              </label>
              <span className="text-xs font-mono font-bold text-purple-200">{piezoPositionNm.toFixed(2)} nm</span>
            </div>
            <input
              type="range"
              min={-0.6}
              max={3.5}
              step={0.05}
              value={piezoPositionNm}
              onChange={(e) => setPiezoPositionNm(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-ivory-muted font-mono mt-0.5">
              <span>-0.6 nm (Tiếp xúc đẩy)</span>
              <span>+3.5 nm (Tự do ở xa)</span>
            </div>
            <p className="text-[10px] text-purple-200/90 mt-1 italic">
              Lực hiện tại:{' '}
              <strong className={currentForceNn > 0 ? 'text-rose-300' : 'text-cyan-300'}>
                {currentForceNn.toFixed(2)} nN
              </strong>{' '}
              ({currentForceNn > 0 ? 'Lực đẩy Pauli' : currentForceNn < -0.1 ? 'Lực hút Van der Waals' : 'Tiệm cận 0'})
            </p>
          </div>
        </div>
      </div>

      {/* 3. Force-Distance Spectroscopy Plot & Cantilever Optic Schematic (Dual Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Spectroscopy Curve (2 Spans) */}
        <div className="lg:col-span-2 bg-obsidian/90 border border-emerald-500/30 rounded-2xl p-4 shadow-inner relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-emerald-200">{sample.nameVI}</span>
              <span className="text-[11px] text-ivory-muted font-mono">({cantilever.nameVI.split('(')[0]})</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="text-cyan-300">Snap-in: {snapInDistanceNm} nm</span>
              <span className="text-rose-300">Pull-off: {sample.adhesionForceNanoNewtons} nN</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[650px] select-none">
              {/* Zero Force Horizon */}
              <line
                x1={padLeft}
                y1={getY(0)}
                x2={padLeft + plotWidth}
                y2={getY(0)}
                stroke="#64748b"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <text x={padLeft + plotWidth - 10} y={getY(0) - 6} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                F = 0 nN (Vị trí tự do)
              </text>

              {/* Zero Distance (Surface Plane) */}
              <line
                x1={getX(0)}
                y1={padTop}
                x2={getX(0)}
                y2={padTop + plotHeight}
                stroke="#475569"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <text x={getX(0) + 6} y={padTop + 14} fill="#64748b" fontSize="10" fontFamily="monospace">
                z = 0 nm (Bề mặt mẫu)
              </text>

              {/* Approach Curve (Cyan) */}
              <path
                d={approachPath}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                filter="drop-shadow(0 0 3px rgba(56, 189, 248, 0.4))"
              />

              {/* Retraction Curve (Rose / Adhesion Hysteresis) */}
              <path
                d={retractionPath}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.2"
                strokeDasharray="5 3"
                filter="drop-shadow(0 0 3px rgba(244, 63, 94, 0.4))"
              />

              {/* Current Piezo Indicator Marker */}
              <g transform={`translate(${getX(piezoPositionNm)}, ${getY(currentForceNn)})`}>
                <circle r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                <line x1="0" y1="0" x2="0" y2={padTop + plotHeight - getY(currentForceNn)} stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
              </g>

              {/* X-Axis */}
              <line
                x1={padLeft}
                y1={padTop + plotHeight}
                x2={padLeft + plotWidth}
                y2={padTop + plotHeight}
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              {[-0.5, 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5].map((zVal) => {
                const x = getX(zVal);
                return (
                  <g key={zVal}>
                    <line x1={x} y1={padTop + plotHeight} x2={x} y2={padTop + plotHeight + 6} stroke="#94a3b8" />
                    <text x={x} y={padTop + plotHeight + 18} fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                      {zVal.toFixed(1)}
                    </text>
                  </g>
                );
              })}
              <text x={padLeft + plotWidth / 2} y={padTop + plotHeight + 40} fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                Khoảng Cách Đầu Dò - Bề Mặt z (nm) → (Tiếp cận ← | → Kéo lùi)
              </text>

              {/* Y-Axis */}
              <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
              {[-4, -2, 0, 2, 4, 6, 8, 10].map((fVal) => {
                if (fVal < minF || fVal > maxF) return null;
                const y = getY(fVal);
                return (
                  <g key={fVal}>
                    <line x1={padLeft - 5} y1={y} x2={padLeft} y2={y} stroke="#94a3b8" />
                    <text x={padLeft - 8} y={y + 4} fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="end">
                      {fVal}
                    </text>
                  </g>
                );
              })}
              <text
                x={-(padTop + plotHeight / 2)}
                y={padLeft - 45}
                fill="#34d399"
                fontSize="11"
                fontWeight="bold"
                transform="rotate(-90)"
                textAnchor="middle"
              >
                Lực Tương Tác F (nN) → (+ Đẩy Pauli / - Hút VdW)
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2 pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-cyan-400 rounded" />
              <span className="font-bold text-cyan-300">Quá Trình Tiếp Cận (Approach Curve)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-rose-400 rounded border-dashed" />
              <span className="font-bold text-rose-300">Quá Trình Kéo Rút & Trễ Lực Dính (Retraction Curve)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="font-bold text-amber-300">Vị Trí Đầu Dò Hiện Tại</span>
            </div>
          </div>
        </div>

        {/* Optical Lever & Cantilever Deflection Schematic (1 Span) */}
        <div className="bg-obsidian/90 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between text-xs space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-400" />
                Cơ Chế Đòn Bẩy Quang Học Laser
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40">
                Laser 670 nm
              </span>
            </div>

            {/* SVG Schematic */}
            <svg viewBox="0 0 280 180" className="w-full h-auto bg-navy-dark/70 rounded-xl border border-white/5">
              {/* Laser Source */}
              <rect x="20" y="20" width="30" height="18" rx="3" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
              <text x="35" y="32" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">LASER</text>

              {/* Red Laser Beam To Cantilever */}
              <line x1="50" y1="29" x2="135" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />

              {/* Reflected Laser Beam to Photodiode */}
              <line x1="135" y1="100" x2="225" y2="35" stroke="#ef4444" strokeWidth="1.8" />

              {/* Cantilever Base & Beam */}
              <rect x="70" y="92" width="25" height="16" fill="#64748b" />
              <polygon points="95,98 140,100 95,102" fill="#cbd5e1" />

              {/* Sharp Tip Apex */}
              <polygon points="135,100 140,100 137.5,122" fill="#94a3b8" />

              {/* Sample Surface */}
              <rect x="60" y="126" width="160" height="20" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="140" y="140" fill="#94a3b8" fontSize="8" textAnchor="middle">{sample.name.split(' ')[0]} Surface</text>

              {/* 4-Quadrant Photodiode Detector */}
              <rect x="220" y="20" width="40" height="40" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
              <line x1="240" y1="20" x2="240" y2="60" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="220" y1="40" x2="260" y2="40" stroke="#38bdf8" strokeWidth="0.8" />
              <circle cx="236" cy="36" r="3.5" fill="#ef4444" className="animate-pulse" />
              <text x="240" y="70" fill="#38bdf8" fontSize="8" textAnchor="middle">Photodiode (A,B,C,D)</text>
            </svg>
          </div>

          <div className="space-y-1.5 p-2.5 bg-navy-light/40 rounded-xl border border-white/5 text-[11px]">
            <div className="flex justify-between font-mono">
              <span className="text-ivory-muted">Độ khuếch đại đòn bẩy:</span>
              <span className="text-cyan-300 font-bold">~ 1,000x</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-ivory-muted">Độ võng Δz của dầm:</span>
              <span className="text-amber-300 font-bold">{(currentForceNn / cantilever.springConstantNPerM).toFixed(2)} nm</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-ivory-muted">Độ lệch tín hiệu (A-B):</span>
              <span className="text-emerald-300 font-bold">{(currentForceNn * 0.18).toFixed(2)} V</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tab Navigation for Deep Analysis */}
      <div className="flex border-b border-emerald-500/20 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('force_distance_curve')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'force_distance_curve'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Phổ Lực Lennard-Jones & Hiện Tượng Nhảy Dính Snap-in
        </button>

        <button
          onClick={() => setActiveTab('cantilever_mechanics')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'cantilever_mechanics'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Cơ Học Dầm Euler-Bernoulli & Định Luật Hooke
        </button>

        <button
          onClick={() => setActiveTab('operating_modes_tapping')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'operating_modes_tapping'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          So Sánh 3 Chế Độ (Contact • Tapping • Non-Contact)
        </button>

        <button
          onClick={() => setActiveTab('nobel_curriculum_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'nobel_curriculum_gdpt'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Nobel Vật Lý 1986 & Chương Trình GDPT 2018
        </button>
      </div>

      {/* 5. Tab Content Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'force_distance_curve' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-emerald-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Giải Mã Các Vùng Động Học Trên Đường Cong Lực - Khoảng Cách
              </h4>
              <p className="text-ivory-muted text-[11px] leading-relaxed">
                Đường cong Force-Distance là &quot;dấu vân tay cơ học&quot; của tương tác bề mặt phân tử, phân định 4 giai đoạn cốt lõi:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-navy-light/40 border border-cyan-500/20 rounded-lg space-y-1">
                  <span className="font-bold text-cyan-300 block">1. Nhảy Tiếp Xúc (Snap-in):</span>
                  <p className="text-ivory-muted">
                    Khi gradient lực hút Van der Waals |dF/dz| vượt quá độ cứng k_c của cần dầm, đầu tip đột ngột bị hút sụp vào bề mặt mẫu.
                  </p>
                </div>
                <div className="p-2.5 bg-navy-light/40 border border-rose-500/20 rounded-lg space-y-1">
                  <span className="font-bold text-rose-300 block">2. Vùng Tiếp Xúc Đẩy (Contact):</span>
                  <p className="text-ivory-muted">
                    Nguyên lý loại trừ Pauli tạo lực đẩy tĩnh điện khổng lồ. Độ uốn của cần dầm tăng tuyến tính theo định luật Hooke (slope = 1).
                  </p>
                </div>
                <div className="p-2.5 bg-navy-light/40 border border-amber-500/20 rounded-lg space-y-1">
                  <span className="font-bold text-amber-300 block">3. Lực Dính Mao Dẫn (Adhesion Meniscus):</span>
                  <p className="text-ivory-muted">
                    Khi kéo lùi, màng nước mao dẫn và liên kết phân tử giữ chặt đầu tip, tạo đường trễ (hysteresis loop) sâu xuống dưới trục hoành.
                  </p>
                </div>
                <div className="p-2.5 bg-navy-light/40 border border-purple-500/20 rounded-lg space-y-1">
                  <span className="font-bold text-purple-300 block">4. Điểm Đứt Lực Dính (Pull-off Force):</span>
                  <p className="text-ivory-muted">
                    Lực đàn hồi của cần dầm thắng lực liên kết, đầu tip bung tự do. Giá trị cực tiểu phản ánh chính xác lực bẻ gãy phân tử (F_pull-off = {sample.adhesionForceNanoNewtons} nN).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cantilever_mechanics' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-cyan-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                Cơ Học Cần Dầm Euler-Bernoulli & Định Luật Hooke
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-navy-light/40 rounded-xl border border-cyan-500/20 space-y-1.5">
                  <span className="font-bold text-cyan-300 block">Độ Cứng Cần Dầm Chữ Nhật k_c:</span>
                  <div className="p-2 bg-navy-dark/80 rounded border border-cyan-500/30 font-mono text-center text-cyan-200">
                    k_c = (E · w · t³) / (4 · L³)
                  </div>
                  <p className="text-ivory-muted">
                    Độ cứng phụ thuộc lũy thừa 3 vào độ dày t và nghịch đảo lũy thừa 3 của chiều dài L. Cần dầm mỏng hơn 2 lần sẽ mềm hơn 8 lần!
                  </p>
                </div>
                <div className="p-3 bg-navy-light/40 rounded-xl border border-emerald-500/20 space-y-1.5">
                  <span className="font-bold text-emerald-300 block">Tần Số Dao Động Riêng f₀:</span>
                  <div className="p-2 bg-navy-dark/80 rounded border border-emerald-500/30 font-mono text-center text-emerald-200">
                    f₀ = (1 / 2π) · √(k_c / m*)
                  </div>
                  <p className="text-ivory-muted">
                    Với khối lượng hiệu dụng m* ≈ 0.24·m_beam, tần số cộng hưởng đạt từ 10 kHz (đo tế bào) đến &gt;300 kHz (gõ nhanh trong không khí).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'operating_modes_tapping' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-amber-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                So Sánh 3 Chế Độ Quét AFM Hàng Đầu Thế Giới
              </h4>
              <div className="space-y-2 text-[11px]">
                <div className="p-2.5 bg-navy-light/40 rounded-lg border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-amber-300">Contact Mode (Tiếp xúc tĩnh liên tục):</span>
                    <p className="text-ivory-muted">Duy trì lực uốn không đổi. Tốc độ quét cực nhanh, lý tưởng cho mẫu cứng như kim loại hoặc đá mica phẳng.</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">F &gt; 0 (Đẩy)</span>
                </div>
                <div className="p-2.5 bg-navy-light/40 rounded-lg border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-cyan-300">Tapping Mode (Chế độ gõ dao động điều hòa):</span>
                    <p className="text-ivory-muted">Đầu tip gõ nhẹ vào mẫu ở đáy chu kỳ dao động, triệt tiêu lực xé ngang, bảo tồn 100% sợi đôi DNA và màng protein.</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">A / A₀ = {simResult.tappingAmplitudeRatio}</span>
                </div>
                <div className="p-2.5 bg-navy-light/40 rounded-lg border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-purple-300">Non-Contact Mode (Không tiếp xúc chân không cao UHV):</span>
                    <p className="text-ivory-muted">Dao động trong vùng thế hút Van der Waals cự ly 1-3 nm, cảm nhận gradient lực, đạt phân giải nguyên tử thật.</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">F &lt; 0 (Hút)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nobel_curriculum_gdpt' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-emerald-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Vinh Danh Nobel Vật Lý 1986 & Tích Hợp GDPT 2018
              </h4>
              <div className="p-3 bg-navy-light/40 border border-emerald-500/30 rounded-xl space-y-1 text-[11px]">
                <div className="font-bold text-emerald-300">Nobel Vật Lý 1986 - Gerd Binnig & Heinrich Rohrer (IBM Zurich)</div>
                <p className="text-ivory-muted leading-relaxed">
                  Được trao giải nhờ thiết kế kính hiển vi quét đầu dò SPM, mở đường cho sự ra đời của AFM (Binnig, Quate & Gerber 1986). AFM đã giải phóng giới hạn của kính hiển vi điện tử: không cần chân không, không cần mẫu dẫn điện, có thể chụp ảnh tế bào và phân tử sinh học đang hoạt động sống trong dung dịch đệm lỏng sinh lý!
                </p>
              </div>
              <div className="p-3 bg-navy-light/40 border border-cyan-500/30 rounded-xl space-y-1 text-[11px]">
                <div className="font-bold text-cyan-300">Liên Kết Trực Tiếp GDPT 2018 (Vật Lý 10, 12 & Hóa Học 10, 12):</div>
                <ul className="list-disc list-inside space-y-1 text-ivory-muted">
                  <li><strong className="text-white">Vật lý 10:</strong> Định luật Hooke F = -k·Δl và lực đàn hồi.</li>
                  <li><strong className="text-white">Vật lý 12:</strong> Dao động cơ điều hòa cưỡng bức, hiện tượng cộng hưởng và hệ số phẩm chất Q.</li>
                  <li><strong className="text-white">Hóa học 10 & 12:</strong> Lực tương tác liên phân tử Van der Waals, liên kết hydro trong chuỗi xoắn kép DNA.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (1 Span): Pedagogical Report */}
        <div className="space-y-4">
          <div className="bg-navy-dark/90 border border-emerald-500/30 rounded-xl p-4 space-y-3 text-xs">
            <h4 className="font-bold text-emerald-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              Báo Cáo Phân Tích Thực Nghiệm AFM
            </h4>
            <div className="p-3 bg-obsidian/70 rounded-lg border border-white/5 font-mono text-[11px] leading-relaxed text-emerald-100/90 max-h-80 overflow-y-auto">
              {simResult.pedagogicalAnalysisVI}
            </div>
          </div>

          <div className="bg-navy-dark/90 border border-amber-500/30 rounded-xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Ưu Thế Vượt Trội So Với SEM/TEM
            </h4>
            <p className="text-[11px] text-ivory-muted leading-relaxed">
              Trong khi kính hiển vi điện tử (SEM/TEM) đòi hỏi chân không cao và chỉ đo mẫu dẫn điện hoặc phủ mạ vàng (gây biến tính protein), AFM hoạt động trực tiếp trong không khí hoặc giọt dung dịch nước, cho phép quan sát các cỗ máy phân tử sinh học đang chuyển động theo thời gian thực.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
