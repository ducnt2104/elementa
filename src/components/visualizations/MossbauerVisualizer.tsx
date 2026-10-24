// src/components/visualizations/MossbauerVisualizer.tsx
// Milestone 72: Mössbauer Spectroscopy, Recoilless Nuclear Gamma Resonance & Hyperfine Interactions Visualizer
// Standards: Rudolf L. Mössbauer (Nobel Prize in Physics 1961) & 57Fe Nuclear Hyperfine Metrology
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 12: Cấu hình electron nguyên tử sắt [Ar]3d6 4s2, trạng thái oxy hóa Fe2+ và Fe3+, phức chất phối trí của sắt trong hemoglobin và ferrocene; Vật lý 12: Phản ứng hạt nhân, bức xạ gamma, hiệu ứng Doppler, từ trường trong vật liệu sắt từ)

import React, { useState, useMemo } from 'react';
import {
  MOSSBAUER_SPECIMEN_CATALOG,
  MossbauerStandard,
  simulateMossbauerSpectrum,
  calculateDopplerEnergyShiftNanoEv
} from '../../domain/mossbauerEngine';
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
  Target,
  Magnet,
  Radio
} from 'lucide-react';

export interface MossbauerVisualizerProps {
  initialStandardId?: string;
}

export const MossbauerVisualizer: React.FC<MossbauerVisualizerProps> = ({
  initialStandardId
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialStandardId || 'alpha_iron_metal_foil'
  );
  const [dopplerVelocityMmPerSec, setDopplerVelocityMmPerSec] = useState<number>(0.0);
  const [isDriveRunning, setIsDriveRunning] = useState<boolean>(false);

  // Selected Standard
  const standard: MossbauerStandard = useMemo(() => {
    return (
      MOSSBAUER_SPECIMEN_CATALOG.find((s) => s.id === selectedStandardId) ||
      MOSSBAUER_SPECIMEN_CATALOG[0]
    );
  }, [selectedStandardId]);

  // Simulation Results
  const simResult = useMemo(() => {
    return simulateMossbauerSpectrum(selectedStandardId, dopplerVelocityMmPerSec);
  }, [selectedStandardId, dopplerVelocityMmPerSec]);

  const currentPt = simResult.currentSpectrumPoint;

  // Handle Doppler velocity slider change
  const handleVelocityChange = (newVelocity: number) => {
    setDopplerVelocityMmPerSec(newVelocity);
    if (Math.abs(newVelocity * 10) % 15 < 1) {
      sound.playMossbauerDopplerDriveHum?.(newVelocity);
    }
  };

  // Auto-tune to closest resonant peak
  const handleAutoTuneResonance = () => {
    const allPeaks = standard.subspectra.flatMap((s) => s.resonancePeaks);
    if (allPeaks.length === 0) return;

    const closest = allPeaks.reduce((prev, curr) => {
      return Math.abs(curr.velocityMmPerSec - dopplerVelocityMmPerSec) < Math.abs(prev.velocityMmPerSec - dopplerVelocityMmPerSec)
        ? curr
        : prev;
    });

    setDopplerVelocityMmPerSec(closest.velocityMmPerSec);
    sound.playUiClick();
    sound.playMossbauerResonantAbsorptionDipChime?.(true);
  };

  // Run Doppler Sweep Animation
  const handleRunDopplerSweep = () => {
    sound.playUiClick();
    sound.playMossbauerDopplerDriveHum?.(5.0);
    setIsDriveRunning(true);
    setTimeout(() => {
      setIsDriveRunning(false);
      sound.playMossbauerResonantAbsorptionDipChime?.(simResult.isResonanceAchieved);
    }, 400);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-6 text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 border border-violet-500/40 rounded-xl shadow-lg">
            <Radio className={`w-6 h-6 text-violet-400 ${isDriveRunning ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                Quang Phổ Mössbauer & Cộng Hưởng Hạt Nhân Không Giật Lùi
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-violet-950/80 text-violet-300 border border-violet-500/40 rounded-full">
                Nobel 1961 • ⁵⁷Fe 14.41 keV
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Đo độ dịch đồng phân (δ), tách tứ cực (ΔE_Q) và tách Zeeman siêu tinh vi (B_hf = 33 Tesla) • Độ phân giải năng lượng 10⁻¹²
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoTuneResonance}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-950/80 border border-violet-500/60 text-violet-200 font-mono text-xs font-bold hover:bg-violet-900 transition-all shadow-md active:scale-95"
            title="Tự động dịch bàn trượt Doppler đến đỉnh cộng hưởng gần nhất"
          >
            <Crosshair className="w-3.5 h-3.5 text-violet-300" />
            <span>Khóa Đỉnh Hấp Thụ</span>
          </button>
          <button
            onClick={handleRunDopplerSweep}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md ${
              isDriveRunning
                ? 'bg-violet-400 text-slate-950 scale-105 shadow-violet-500/50'
                : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:brightness-110 active:scale-95'
            }`}
          >
            <Zap className="w-4 h-4 text-violet-200" />
            <span>Chạy Quét Doppler ±10 mm/s</span>
          </button>
        </div>
      </div>

      {/* Standard Selector Tabs */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-violet-400" /> Chọn Chuẩn Mực Quang Phổ Mössbauer ⁵⁷Fe:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {MOSSBAUER_SPECIMEN_CATALOG.map((item) => {
            const isSelected = item.id === selectedStandardId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playUiClick();
                  sound.playMossbauerDopplerDriveHum?.(0.0);
                  setSelectedStandardId(item.id);
                  setDopplerVelocityMmPerSec(0.0);
                }}
                className={`flex flex-col text-left p-2.5 rounded-xl border transition-all text-xs ${
                  isSelected
                    ? 'bg-violet-950/50 border-violet-500/80 shadow-lg shadow-violet-950/40 text-violet-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="font-bold truncate text-white">{item.vietnameseName.split('(')[0]}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 ml-1" />}
                </div>
                <span className="text-[10px] text-slate-400 truncate">{item.coordinationGeometry}</span>
                <span className="text-[9px] font-mono text-fuchsia-400 mt-1">
                  {item.ironOxidationState} | f: {item.recoillessFractionPercent}% | T_D: {item.debyeTemperatureKelvin} K
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual Scientific Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Nuclear Hyperfine Diagram & Gamma Transmission Curve */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Section 1: Nuclear Gamma Transmission Mössbauer Spectrum Curve */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-violet-300">
                <Activity className="w-4 h-4 text-violet-400" /> Phổ Truyền Qua Hạt Nhân Mössbauer T(v) (%)
              </span>
              <span className="font-mono text-[11px] text-sky-400">
                Vận tốc Doppler v = {simResult.currentDopplerVelocityMmPerSec > 0 ? `+${simResult.currentDopplerVelocityMmPerSec.toFixed(2)}` : simResult.currentDopplerVelocityMmPerSec.toFixed(2)} mm/s • ΔE = {simResult.gammaEnergyShiftNanoEv} neV
              </span>
            </div>

            {/* SVG Mössbauer Transmission Spectrum */}
            <div className="relative w-full h-[220px] bg-slate-900/90 rounded-lg p-2 border border-slate-800">
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Axes and Grid Lines */}
                <line x1="40" y1="175" x2="480" y2="175" stroke="#334155" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="175" stroke="#334155" strokeWidth="1" />
                <text x="440" y="190" fill="#94a3b8" fontSize="9" fontFamily="monospace">v (mm/s)</text>
                <text x="10" y="25" fill="#94a3b8" fontSize="9" fontFamily="monospace">T (%)</text>

                {/* Y-Axis Ticks (70%, 80%, 90%, 100%) */}
                {[70, 80, 90, 100].map((tVal) => {
                  const yPos = 175 - ((tVal - 70) / 30) * 150;
                  return (
                    <g key={tVal}>
                      <line x1="36" y1={yPos} x2="480" y2={yPos} stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />
                      <text x="12" y={yPos + 3} fill="#64748b" fontSize="7" fontFamily="monospace">{tVal}%</text>
                    </g>
                  );
                })}

                {/* X-Axis Zero Velocity Center Line */}
                <line x1="260" y1="20" x2="260" y2="175" stroke="#475569" strokeWidth="1" strokeDasharray="3,3" />
                <text x="263" y="32" fill="#64748b" fontSize="7" fontFamily="monospace">v = 0.0 (α-Fe)</text>

                {/* Mössbauer Lorentzian Transmission Curve */}
                <path
                  d={simResult.spectrumCurve
                    .map((pt, i) => {
                      const sx = 40 + ((pt.dopplerVelocityMmPerSec + 10.0) / 20.0) * 440;
                      const sy = 175 - ((pt.relativeTransmissionPercent - 70.0) / 30.0) * 150;
                      return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="2"
                />

                {/* Current Velocity Cursor */}
                {(() => {
                  const curX = 40 + ((simResult.currentDopplerVelocityMmPerSec + 10.0) / 20.0) * 440;
                  const curY = 175 - ((currentPt.relativeTransmissionPercent - 70.0) / 30.0) * 150;
                  return (
                    <g>
                      <line x1={curX} y1="20" x2={curX} y2="175" stroke="#f43f5e" strokeWidth="1.8" />
                      <circle cx={curX} cy={curY} r="4.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5">
                        {simResult.isResonanceAchieved && (
                          <animate attributeName="r" values="4;7;4" dur="0.8s" repeatCount="indefinite" />
                        )}
                      </circle>
                      <text x={Math.min(420, curX + 4)} y="45" fill="#f43f5e" fontSize="8" fontFamily="monospace">
                        T = {currentPt.relativeTransmissionPercent.toFixed(1)}%
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Sub-spectra Component Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400">Các Thành Phần Phổ Siêu Tinh Vi:</span>
              <div className="flex items-center gap-3">
                {standard.subspectra.map((sub) => (
                  <span key={sub.label} className="text-violet-300 font-bold flex items-center gap-1 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-violet-400 inline-block"></span>
                    {sub.label} ({sub.fractionPercent}%)
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Nuclear Energy Level Hyperfine Splitting Diagram */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-purple-300">
                <Atom className="w-4 h-4 text-purple-400" /> Sơ Đồ Phân Tách Mức Năng Lượng Hạt Nhân ⁵⁷Fe (I=1/2 → I=3/2)
              </span>
              <span className="font-mono text-[10px] text-fuchsia-400">
                Bức xạ hạt nhân E_γ = 14.4125 keV • Độ rộng tự nhiên Γ_0 = 4.665 neV
              </span>
            </div>

            {/* Energy Levels Schematic */}
            <div className="relative w-full h-[150px] bg-slate-900/90 rounded-lg p-3 border border-slate-800 flex flex-col justify-between text-[11px] font-mono">
              {/* Excited State I = 3/2 (14.4 keV) */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-fuchsia-300 font-bold">Trạng thái kích thích (I = 3/2):</span>
                  <span className="text-[10px] text-slate-400">Tách thành 4 mức con m_I = ±3/2, ±1/2 khi có B_hf</span>
                </div>
                <span className="text-sky-300 font-bold">14.4125 keV</span>
              </div>

              {/* Gamma Dipole Transitions Arrow */}
              <div className="flex items-center justify-center gap-8 py-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dịch đồng phân δ: Tương tác mật độ điện tử s tại tâm hạt nhân |ψ(0)|²</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                  <Magnet className="w-3.5 h-3.5 text-violet-400" />
                  <span>Tách Zeeman hạt nhân: 6 vạch lưỡng cực từ (Δm_I = 0, ±1)</span>
                </div>
              </div>

              {/* Ground State I = 1/2 (0.0 keV) */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-300 font-bold">Trạng thái cơ bản (I = 1/2):</span>
                  <span className="text-[10px] text-slate-400">Tách thành 2 mức con m_I = ±1/2</span>
                </div>
                <span className="text-sky-300 font-bold">0.0000 keV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Doppler Controls, Hyperfine Metrics & Curriculum */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Doppler Drive Velocity Transducer */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-violet-300 font-mono flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-violet-400" /> Điều Khiển Đầu Dò Cơ Học Doppler
              </span>
              <button
                onClick={() => handleVelocityChange(0.0)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                title="Khôi phục vận tốc 0.0 mm/s"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Velocity Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Vận Tốc Nguồn Phát (v):</span>
                <span className="text-violet-300 font-bold">
                  {dopplerVelocityMmPerSec > 0 ? `+${dopplerVelocityMmPerSec.toFixed(2)}` : dopplerVelocityMmPerSec.toFixed(2)} mm/s
                </span>
              </div>
              <input
                type="range"
                min="-10.0"
                max="10.0"
                step="0.05"
                value={dopplerVelocityMmPerSec}
                onChange={(e) => handleVelocityChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>-10 mm/s (Nén)</span>
                <span>0 mm/s (Đứng yên)</span>
                <span>+10 mm/s (Giãn)</span>
              </div>
            </div>

            {/* Hyperfine Parameters Readout Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Độ Dịch Đồng Phân (δ):</span>
                <span className="text-sm font-bold text-violet-300">
                  {standard.subspectra[0].isomerShiftDeltaMmPerSec} mm/s
                </span>
                <span className="text-[9px] text-slate-500">Mật độ electron s tại hạt nhân</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Tách Tứ Cực (ΔE_Q):</span>
                <span className="text-sm font-bold text-fuchsia-300">
                  {standard.subspectra[0].quadrupoleSplittingDeltaEqMmPerSec} mm/s
                </span>
                <span className="text-[9px] text-slate-500">Gradient điện trường V_zz</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Từ Trường Siêu Tinh Vi (B_hf):</span>
                <span className="text-sm font-bold text-emerald-300">
                  {standard.subspectra[0].magneticHyperfineFieldTesla} Tesla
                </span>
                <span className="text-[9px] text-slate-500">
                  {(standard.subspectra[0].magneticHyperfineFieldTesla * 10).toFixed(0)} kOe nội tại
                </span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Phần Không Giật Lùi (f):</span>
                <span className="text-sm font-bold text-sky-300">
                  {standard.recoillessFractionPercent}%
                </span>
                <span className="text-[9px] text-slate-500">Hệ số Lamb-Mössbauer</span>
              </div>
            </div>

            {/* Resonance Alert */}
            {simResult.isResonanceAchieved && (
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/60 text-xs font-mono text-emerald-200 flex items-center gap-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cộng hưởng hạt nhân đạt cực đại! Độ truyền qua suy giảm xuống {currentPt.relativeTransmissionPercent.toFixed(1)}%.</span>
              </div>
            )}
          </div>

          {/* Chemical Description */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2.5 shadow-inner">
            <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-violet-400" /> Bản Chất Hóa Học & Tinh Thể Học Của Sắt:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{standard.description}</p>
          </div>

          {/* Nobel Citation & GDPT 2018 Curriculum Integration */}
          <div className="p-4 bg-gradient-to-br from-violet-950/40 via-slate-950 to-slate-900 rounded-xl border border-violet-500/30 flex flex-col gap-2 shadow-inner">
            <span className="text-xs font-bold text-violet-300 font-mono flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-violet-400" /> Tích Hợp Giáo Dục GDPT 2018 & Giải Nobel Vật Lý 1961:
            </span>
            <div className="p-2 bg-violet-950/30 rounded border border-violet-500/20 text-[11px] font-serif text-violet-100 italic">
              {standard.nobelCitation}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{standard.curriculumNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
