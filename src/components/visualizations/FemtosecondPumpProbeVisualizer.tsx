// src/components/visualizations/FemtosecondPumpProbeVisualizer.tsx
// Milestone 70: Ultrafast Femtosecond Pump-Probe Spectroscopy & Zewail Transition-State Chemical Dynamics Visualizer
// Standards: Ahmed H. Zewail (Nobel Prize in Chemistry 1999) & Landau-Zener Nonadiabatic Wavepacket Dynamics
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 11: Tốc độ phản ứng, năng lượng hoạt hóa Ea, trạng thái chuyển tiếp [A...B]‡, liên kết hóa học; Vật lý 12: Thuyết lượng tử ánh sáng, giao thoa sóng de Broglie, dao động điều hòa)

import React, { useState, useMemo } from 'react';
import {
  FEMTOSECOND_PUMP_PROBE_CATALOG,
  PumpProbeStandard,
  simulatePumpProbeDynamics,
  calculateMichelsonDelayFs,
  calculateStageDisplacementMicrons,
  MICHELSON_DELAY_FACTOR_FS_PER_MICRON
} from '../../domain/femtosecondPumpProbeEngine';
import { sound } from '../../audio/soundEngine';
import {
  Zap,
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
  Clock,
  Sparkles,
  Target
} from 'lucide-react';

export interface FemtosecondPumpProbeVisualizerProps {
  initialStandardId?: string;
}

export const FemtosecondPumpProbeVisualizer: React.FC<FemtosecondPumpProbeVisualizerProps> = ({
  initialStandardId
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialStandardId || 'nai_photodissociation_avoided_crossing'
  );
  // Translation stage displacement in microns (0 to 600 um -> 0 to 4000 fs)
  const [stageDisplacementMicrons, setStageDisplacementMicrons] = useState<number>(93.7); // ~625 fs (half period)
  const [probeMode, setProbeMode] = useState<'TRANSITION_STATE' | 'FREE_PRODUCT'>('TRANSITION_STATE');
  const [isLaserPulsing, setIsLaserPulsing] = useState<boolean>(false);

  // Selected Standard
  const standard: PumpProbeStandard = useMemo(() => {
    return (
      FEMTOSECOND_PUMP_PROBE_CATALOG.find((s) => s.id === selectedStandardId) ||
      FEMTOSECOND_PUMP_PROBE_CATALOG[0]
    );
  }, [selectedStandardId]);

  // Simulation Results
  const simResult = useMemo(() => {
    return simulatePumpProbeDynamics(selectedStandardId, stageDisplacementMicrons, probeMode);
  }, [selectedStandardId, stageDisplacementMicrons, probeMode]);

  const currentDelayFs = simResult.currentDelayTimeFs;
  const currentPt = simResult.currentTransientPoint;

  // Handle stage displacement change
  const handleStageChange = (newMicrons: number) => {
    setStageDisplacementMicrons(newMicrons);
    const delay = calculateMichelsonDelayFs(newMicrons);
    if (delay > 0 && Math.floor(delay) % 300 < 25) {
      sound.playWavepacketCoherentBeatChime?.(550 + (delay / 4000) * 300);
    }
  };

  // Handle Laser Fire
  const handleFireLaser = () => {
    sound.playUiClick();
    sound.playFemtosecondPumpLaserTone?.();
    setIsLaserPulsing(true);
    setTimeout(() => setIsLaserPulsing(false), 350);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-6 text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-rose-500/20 border border-amber-500/40 rounded-xl shadow-lg">
            <Zap className={`w-6 h-6 text-amber-400 ${isLaserPulsing ? 'animate-ping' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent">
                Quang Phổ Bơm - Dò Siêu Nhanh Femtosecond & Động Học Trạng Thái Chuyển Tiếp
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950/80 text-amber-300 border border-amber-500/40 rounded-full">
                Zewail 1999 • Landau-Zener
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Quan sát trực tiếp sự hình thành & bẻ gãy liên kết hóa học trong thời gian thực (10⁻¹⁵ s) • Bàn trượt trễ quang học Michelson
            </p>
          </div>
        </div>

        {/* Laser Fire Quick Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleFireLaser}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md ${
              isLaserPulsing
                ? 'bg-amber-400 text-slate-950 scale-105 shadow-amber-500/50'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:brightness-110 active:scale-95'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Phát Xung Pump {standard.pumpWavelengthNm} nm</span>
          </button>
        </div>
      </div>

      {/* Standard Selector Tabs */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-amber-400" /> Chọn Chuẩn Mực Phản Ứng Quang Hóa Femtosecond (Zewail Standards):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {FEMTOSECOND_PUMP_PROBE_CATALOG.map((item) => {
            const isSelected = item.id === selectedStandardId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playUiClick();
                  sound.playFemtosecondPumpLaserTone?.();
                  setSelectedStandardId(item.id);
                }}
                className={`flex flex-col text-left p-2.5 rounded-xl border transition-all text-xs ${
                  isSelected
                    ? 'bg-amber-950/50 border-amber-500/80 shadow-lg shadow-amber-950/40 text-amber-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="font-bold truncate text-white">{item.vietnameseName.split('(')[0]}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                </div>
                <span className="text-[10px] text-slate-400 truncate">{item.name}</span>
                <span className="text-[9px] font-mono text-orange-400 mt-1">
                  λ_pump: {item.pumpWavelengthNm} nm | λ_probe: {item.probeWavelengthNm} nm
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual Scientific Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Born-Oppenheimer Potential Curves & Transient Signal */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Section 1: Potential Energy Curves & Wavepacket Internuclear Position */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-amber-300">
                <Activity className="w-4 h-4 text-amber-400" /> Đường Thế Năng Born-Oppenheimer & Chuyển Động Gói Sóng
              </span>
              <span className="font-mono text-[11px] text-sky-400">
                Khoảng cách R(t) = {currentPt.wavepacketPositionAngstroms} Å • R_c = {standard.crossingDistanceAngstroms} Å
              </span>
            </div>

            {/* SVG Plot for Potential Energy Surfaces */}
            <div className="relative w-full h-[220px] bg-slate-900/90 rounded-lg p-2 border border-slate-800">
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Axes and Grid Lines */}
                <line x1="40" y1="180" x2="480" y2="180" stroke="#334155" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" strokeWidth="1" />
                <text x="460" y="195" fill="#94a3b8" fontSize="9" fontFamily="monospace">R (Å)</text>
                <text x="15" y="25" fill="#94a3b8" fontSize="9" fontFamily="monospace">E (eV)</text>

                {/* Ground State Curve (Cyan) */}
                <path
                  d={simResult.potentialEnergyCurves
                    .map((pt, i) => {
                      const sx = 40 + ((pt.internuclearDistanceAngstroms - 2.0) / 10.0) * 440;
                      const sy = 180 - (pt.groundStateEnergyEv / 6.0) * 150;
                      return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.8"
                  strokeDasharray="3,3"
                />

                {/* Covalent Excited Surface (Orange) */}
                <path
                  d={simResult.potentialEnergyCurves
                    .map((pt, i) => {
                      const sx = 40 + ((pt.internuclearDistanceAngstroms - 2.0) / 10.0) * 440;
                      const sy = 180 - (pt.covalentStateEnergyEv / 6.0) * 150;
                      return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="2"
                />

                {/* Ionic Coulomb Curve (Violet) */}
                <path
                  d={simResult.potentialEnergyCurves
                    .map((pt, i) => {
                      const sx = 40 + ((pt.internuclearDistanceAngstroms - 2.0) / 10.0) * 440;
                      const sy = 180 - (pt.ionicStateEnergyEv / 6.0) * 150;
                      return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="1.5"
                  strokeDasharray="4,2"
                />

                {/* Avoided Crossing Vertical Line at R_c */}
                {(() => {
                  const rcX = 40 + ((standard.crossingDistanceAngstroms - 2.0) / 10.0) * 440;
                  return (
                    <g>
                      <line x1={rcX} y1="30" x2={rcX} y2="180" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2,2" />
                      <text x={rcX + 4} y="45" fill="#f43f5e" fontSize="8" fontFamily="monospace">
                        Giao Nhau Tránh R_c={standard.crossingDistanceAngstroms} Å
                      </text>
                    </g>
                  );
                })()}

                {/* Wavepacket Position Indicator */}
                {(() => {
                  const wpX = 40 + ((currentPt.wavepacketPositionAngstroms - 2.0) / 10.0) * 440;
                  const wpY = 85; // Midpoint of covalent well
                  return (
                    <g>
                      <circle cx={wpX} cy={wpY} r="7" fill="#fbbf24" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5">
                        <animate attributeName="r" values="6;9;6" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                      <text x={wpX} y={wpY - 10} textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">
                        |Ψ(R,t)|²
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Legend Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-sky-400 inline-block"></span> V_0 Trạng thái cơ bản
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-orange-400 inline-block"></span> V_cov Cộng hóa trị
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-purple-400 inline-block"></span> V_ion Liên kết ion
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-0.5 bg-rose-500 inline-block"></span> R_c Landau-Zener
              </span>
            </div>
          </div>

          {/* Section 2: Time-Resolved Transient Absorption / Fluorescence Signal Curve */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-orange-300">
                <Clock className="w-4 h-4 text-orange-400" /> Tín Hiệu Quang Phổ Phân Giải Thời Gian ΔA(Δt)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProbeMode('TRANSITION_STATE')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    probeMode === 'TRANSITION_STATE'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Dò Trạng Thái [A···B]‡ ({standard.transitionStateWavelengthNm} nm)
                </button>
                <button
                  onClick={() => setProbeMode('FREE_PRODUCT')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    probeMode === 'FREE_PRODUCT'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Dò Sản Phẩm Tự Do ({standard.probeWavelengthNm} nm)
                </button>
              </div>
            </div>

            {/* SVG Plot for Transient Signal */}
            <div className="relative w-full h-[200px] bg-slate-900/90 rounded-lg p-2 border border-slate-800">
              <svg viewBox="0 0 500 180" className="w-full h-full">
                {/* Axes */}
                <line x1="40" y1="160" x2="480" y2="160" stroke="#334155" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="160" stroke="#334155" strokeWidth="1" />
                <text x="450" y="174" fill="#94a3b8" fontSize="9" fontFamily="monospace">Δt (fs)</text>
                <text x="10" y="25" fill="#94a3b8" fontSize="9" fontFamily="monospace">ΔA (mOD)</text>

                {/* Zero Time Line */}
                <line x1="62" y1="20" x2="62" y2="160" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
                <text x="65" y="32" fill="#64748b" fontSize="8" fontFamily="monospace">t = 0 (Pump)</text>

                {/* Transient Signal Curve */}
                <path
                  d={simResult.timeResolvedTransientCurve
                    .map((pt, i) => {
                      const sx = 40 + ((pt.delayTimeFs + 200) / 4200) * 440;
                      const sy = 160 - (pt.transientAbsorbanceMilliOd / 160) * 135;
                      return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={probeMode === 'TRANSITION_STATE' ? '#fbbf24' : '#34d399'}
                  strokeWidth="2"
                />

                {/* Current Time Cursor Line */}
                {(() => {
                  const curX = 40 + ((currentDelayFs + 200) / 4200) * 440;
                  return (
                    <g>
                      <line x1={curX} y1="20" x2={curX} y2="160" stroke="#f43f5e" strokeWidth="1.8" />
                      <circle cx={curX} cy={160 - (currentPt.transientAbsorbanceMilliOd / 160) * 135} r="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                      <text x={Math.min(430, curX + 4)} y="50" fill="#f43f5e" fontSize="8" fontFamily="monospace">
                        Δt = {Math.round(currentDelayFs)} fs
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Interactive Translation Stage, Kinetics & Curriculum */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Translation Stage Controller */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" /> Bàn Trượt Trễ Quang Học Michelson
              </span>
              <button
                onClick={() => handleStageChange(93.7)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                title="Khôi phục vị trí mặc định"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Stage Displacement Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Độ Dời Bàn Trượt (Δx):</span>
                <span className="text-sky-300 font-bold">{stageDisplacementMicrons.toFixed(1)} μm</span>
              </div>
              <input
                type="range"
                min="0"
                max="600"
                step="0.5"
                value={stageDisplacementMicrons}
                onChange={(e) => handleStageChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>0 μm (t = 0 fs)</span>
                <span>300 μm (2000 fs)</span>
                <span>600 μm (4000 fs)</span>
              </div>
            </div>

            {/* Readouts Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Thời Gian Trễ (Δt):</span>
                <span className="text-sm font-bold text-amber-300">{Math.round(currentDelayFs)} fs</span>
                <span className="text-[9px] text-slate-500">{(currentDelayFs / 1000).toFixed(3)} picoseconds</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Độ Hấp Thụ (ΔA):</span>
                <span className="text-sm font-bold text-orange-300">{currentPt.transientAbsorbanceMilliOd} mOD</span>
                <span className="text-[9px] text-slate-500">Tín hiệu hấp thụ vi sai</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Hiệu Suất Sản Phẩm:</span>
                <span className="text-sm font-bold text-emerald-300">
                  {(currentPt.freeProductYieldFraction * 100).toFixed(1)}%
                </span>
                <span className="text-[9px] text-slate-500">Phân ly thành nguyên tử tự do</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Độ Giảm Kết Hợp:</span>
                <span className="text-sm font-bold text-purple-300">
                  {(simResult.coherenceDampingRatio * 100).toFixed(1)}%
                </span>
                <span className="text-[9px] text-slate-500">Tắt dần dao động lượng tử</span>
              </div>
            </div>

            {/* Avoided Crossing Status Alert */}
            {currentPt.isTransitionStateWindow && (
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/60 text-xs font-mono text-rose-200 flex items-center gap-2 animate-pulse">
                <Zap className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Bắt được trạng thái chuyển tiếp [Na···I]‡ tại R = {currentPt.wavepacketPositionAngstroms} Å!</span>
              </div>
            )}
          </div>

          {/* Reaction Chemistry Card */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2.5 shadow-inner">
            <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
              <Atom className="w-4 h-4 text-amber-400" /> Phương Trình Động Học Quang Phổ:
            </span>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-amber-200">
              {standard.reactionEquation}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{standard.description}</p>
          </div>

          {/* Nobel Citation & GDPT 2018 Curriculum Integration */}
          <div className="p-4 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-900 rounded-xl border border-amber-500/30 flex flex-col gap-2 shadow-inner">
            <span className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-400" /> Tích Hợp Giáo Dục GDPT 2018 & Giải Nobel 1999:
            </span>
            <div className="p-2 bg-amber-950/30 rounded border border-amber-500/20 text-[11px] font-serif text-amber-100 italic">
              {standard.nobelCitation}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{standard.curriculumNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
