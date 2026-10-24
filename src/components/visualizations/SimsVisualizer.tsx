// src/components/visualizations/SimsVisualizer.tsx
// Milestone 71: Secondary Ion Mass Spectrometry (SIMS), Sputtering Cascades & Depth Profiling Isotopic Visualizer
// Standards: Peter Sigmund (Linear Collision Cascade Theory 1969) & Dynamic/Static SIMS Metrology
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Cấu tạo vỏ electron nguyên tử, đồng vị bền và đồng vị phóng xạ, khối phổ; Hóa học 12: Hợp kim titan, pin Lithium-ion, màng phospholipid; Vật lý 12: Động lượng va chạm, bức xạ ion)

import React, { useState, useMemo } from 'react';
import {
  SIMS_SPECIMEN_CATALOG,
  SimsStandard,
  simulateSimsAnalysis,
  calculateSputterErosionRate
} from '../../domain/simsEngine';
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
  ShieldAlert,
  ArrowDown
} from 'lucide-react';

export interface SimsVisualizerProps {
  initialStandardId?: string;
}

export const SimsVisualizer: React.FC<SimsVisualizerProps> = ({
  initialStandardId
}) => {
  const [selectedStandardId, setSelectedStandardId] = useState<string>(
    initialStandardId || 'semiconductor_boron_delta_doping'
  );
  const [targetDepthNm, setTargetDepthNm] = useState<number>(12.5); // Boron peak
  const [isSputtering, setIsSputtering] = useState<boolean>(false);

  // Selected Standard
  const standard: SimsStandard = useMemo(() => {
    return (
      SIMS_SPECIMEN_CATALOG.find((s) => s.id === selectedStandardId) ||
      SIMS_SPECIMEN_CATALOG[0]
    );
  }, [selectedStandardId]);

  // Simulation Results
  const simResult = useMemo(() => {
    return simulateSimsAnalysis(selectedStandardId, targetDepthNm);
  }, [selectedStandardId, targetDepthNm]);

  const currentPt = simResult.currentProfilePoint;

  // Handle depth slider change
  const handleDepthChange = (newDepth: number) => {
    setTargetDepthNm(newDepth);
    const sampleCount = Object.values(currentPt.speciesCounts)[0] || 50000;
    if (Math.floor(newDepth * 2) % 10 === 0) {
      sound.playSimsSecondaryIonDetectorChime?.(sampleCount);
    }
  };

  // Handle Sputter Beam Pulse
  const handleFireSputterBeam = () => {
    sound.playUiClick();
    sound.playSimsPrimaryIonSputterTone?.();
    setIsSputtering(true);
    setTimeout(() => {
      setIsSputtering(false);
      sound.playSimsSecondaryIonDetectorChime?.(80000);
    }, 300);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-6 text-slate-100">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-sky-500/20 border border-emerald-500/40 rounded-xl shadow-lg">
            <Atom className={`w-6 h-6 text-emerald-400 ${isSputtering ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                Khối Phổ Ion Thứ Cấp (SIMS) & Phân Tích Độ Sâu Đồng Vị
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-full">
                Sigmund 1969 • ToF-SIMS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Bóc tách nguyên tử từng lớp (0.1 nm) bằng chùm ion sơ cấp năng lượng cao • Độ nhạy phân tích cực đại ppm - ppb
            </p>
          </div>
        </div>

        {/* Primary Beam Pulse Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleFireSputterBeam}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md ${
              isSputtering
                ? 'bg-emerald-400 text-slate-950 scale-105 shadow-emerald-500/50'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-110 active:scale-95'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-200" />
            <span>Bắn Chùm Ion {standard.primaryIonSpecies} ({standard.primaryBeamEnergyKev} keV)</span>
          </button>
        </div>
      </div>

      {/* Standard Selector Tabs */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-emerald-400" /> Chọn Chuẩn Mực Bóc Mòn & Khối Phổ Ion Thứ Cấp:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {SIMS_SPECIMEN_CATALOG.map((item) => {
            const isSelected = item.id === selectedStandardId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playUiClick();
                  sound.playSimsPrimaryIonSputterTone?.();
                  setSelectedStandardId(item.id);
                  setTargetDepthNm(item.id === 'semiconductor_boron_delta_doping' ? 12.5 : item.maximumDepthNm * 0.4);
                }}
                className={`flex flex-col text-left p-2.5 rounded-xl border transition-all text-xs ${
                  isSelected
                    ? 'bg-emerald-950/50 border-emerald-500/80 shadow-lg shadow-emerald-950/40 text-emerald-200'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                  <span className="font-bold truncate text-white">{item.vietnameseName.split('(')[0]}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />}
                </div>
                <span className="text-[10px] text-slate-400 truncate">{item.targetMatrix}</span>
                <span className="text-[9px] font-mono text-teal-400 mt-1">
                  {item.primaryIonSpecies} | {item.primaryBeamEnergyKev} keV | Sâu: {item.maximumDepthNm} nm
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual Scientific Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Sputter Crater Diagram & Depth Profile Graph */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Section 1: Sputter Crater Cross-Section & Atomic Collision Cascade */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-emerald-300">
                <Layers className="w-4 h-4 text-emerald-400" /> Mặt Cắt Miệng Hố Bóc Mòn & Va Chạm Dây Chuyền Sigmund
              </span>
              <span className="font-mono text-[11px] text-sky-400">
                Độ sâu hố z = {simResult.currentDepthNm.toFixed(1)} nm / {standard.maximumDepthNm} nm
              </span>
            </div>

            {/* SVG Sputter Crater Visualization */}
            <div className="relative w-full h-[180px] bg-slate-900/90 rounded-lg p-2 border border-slate-800 overflow-hidden">
              <svg viewBox="0 0 500 160" className="w-full h-full">
                {/* Surface Substrate Base */}
                <rect x="30" y="40" width="440" height="110" fill="#1e293b" stroke="#334155" strokeWidth="1" rx="4" />

                {/* Sputter Crater Cutout */}
                {(() => {
                  const depthPx = Math.min(80, (simResult.currentDepthNm / standard.maximumDepthNm) * 75);
                  return (
                    <g>
                      {/* Crater Floor & Walls */}
                      <polygon
                        points={`170,40 210,${40 + depthPx} 290,${40 + depthPx} 330,40`}
                        fill="#0f172a"
                        stroke="#10b981"
                        strokeWidth="1.5"
                      />
                      {/* Grid Lines inside crater */}
                      <line x1="210" y1={40 + depthPx} x2="290" y2={40 + depthPx} stroke="#34d399" strokeWidth="2" strokeDasharray="3,2" />
                      {/* Primary Ion Beam Column */}
                      <line x1="250" y1="10" x2="250" y2={38 + depthPx} stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4,2">
                        {isSputtering && <animate attributeName="strokeWidth" values="2;5;2" dur="0.2s" repeatCount="indefinite" />}
                      </line>
                      {/* Primary Ion Label */}
                      <text x="255" y="22" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">
                        Chùm {standard.primaryIonSpecies} ({standard.primaryBeamEnergyKev} keV)
                      </text>

                      {/* Ejected Secondary Ions Spray */}
                      <path
                        d={`M 245,${38 + depthPx} L 220,15 M 255,${38 + depthPx} L 280,15`}
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        strokeDasharray="2,2"
                      />
                      <text x="285" y="18" fill="#f59e0b" fontSize="8" fontFamily="monospace">
                        Ion thứ cấp M⁺ / X⁻
                      </text>
                    </g>
                  );
                })()}

                {/* Sub-surface Delta Doping Layer Lines (for Semiconductor) */}
                {standard.id === 'semiconductor_boron_delta_doping' && (
                  <g>
                    <line x1="30" y1="58" x2="470" y2="58" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="35" y="55" fill="#f59e0b" fontSize="7" fontFamily="monospace">Delta 1 (12.5 nm)</text>
                    <line x1="30" y1="77" x2="470" y2="77" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
                    <text x="35" y="74" fill="#f59e0b" fontSize="7" fontFamily="monospace">Delta 2 (25.0 nm)</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Current Sub-surface Layer Badge */}
            <div className="flex items-center justify-between text-xs font-mono p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400">Pha Cấu Trúc Tại Độ Sâu Này:</span>
              <span className="text-emerald-300 font-bold">{currentPt.layerPhaseDescription}</span>
            </div>
          </div>

          {/* Section 2: Secondary Ion Intensity Depth Profile Graph */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-teal-300">
                <Activity className="w-4 h-4 text-teal-400" /> Phổ Cường Độ Ion Thứ Cấp Theo Độ Sâu (Logarithmic Counts/s)
              </span>
              <div className="flex items-center gap-3">
                {standard.monitoredSpecies.map((sp) => (
                  <span key={sp.label} className="flex items-center gap-1 text-[10px] font-mono" style={{ color: sp.colorHex }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: sp.colorHex }}></span>
                    {sp.label}
                  </span>
                ))}
              </div>
            </div>

            {/* SVG Depth Profile Graph */}
            <div className="relative w-full h-[210px] bg-slate-900/90 rounded-lg p-2 border border-slate-800">
              <svg viewBox="0 0 500 180" className="w-full h-full">
                {/* Axes */}
                <line x1="45" y1="160" x2="480" y2="160" stroke="#334155" strokeWidth="1" />
                <line x1="45" y1="20" x2="45" y2="160" stroke="#334155" strokeWidth="1" />
                <text x="440" y="174" fill="#94a3b8" fontSize="9" fontFamily="monospace">Độ Sâu (nm)</text>
                <text x="10" y="25" fill="#94a3b8" fontSize="9" fontFamily="monospace">Log I (c/s)</text>

                {/* Y-Axis Log Ticks (10^1 to 10^6) */}
                {[2, 3, 4, 5, 6].map((logVal) => {
                  const yPos = 160 - ((logVal - 1) / 5) * 135;
                  return (
                    <g key={logVal}>
                      <line x1="40" y1={yPos} x2="480" y2={yPos} stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />
                      <text x="18" y={yPos + 3} fill="#64748b" fontSize="7" fontFamily="monospace">10^{logVal}</text>
                    </g>
                  );
                })}

                {/* Monitored Species Traces */}
                {standard.monitoredSpecies.map((sp) => {
                  const pathData = simResult.depthProfileData
                    .map((pt, i) => {
                      const sx = 45 + (pt.depthNanometers / standard.maximumDepthNm) * 435;
                      const rawCount = pt.speciesCounts[sp.label] || 10;
                      const logCount = Math.log10(Math.max(10, rawCount));
                      const sy = 160 - ((logCount - 1) / 5) * 135;
                      return `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
                    })
                    .join(' ');

                  return (
                    <path
                      key={sp.label}
                      d={pathData}
                      fill="none"
                      stroke={sp.colorHex}
                      strokeWidth="1.8"
                    />
                  );
                })}

                {/* Current Depth Cursor */}
                {(() => {
                  const curX = 45 + (simResult.currentDepthNm / standard.maximumDepthNm) * 435;
                  return (
                    <g>
                      <line x1={curX} y1="20" x2={curX} y2="160" stroke="#f43f5e" strokeWidth="1.6" strokeDasharray="3,2" />
                      <circle cx={curX} cy="30" r="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
                      <text x={Math.min(420, curX + 4)} y="34" fill="#f43f5e" fontSize="8" fontFamily="monospace">
                        z = {simResult.currentDepthNm.toFixed(1)} nm
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Ion Beam Controls, Sputter Metrics & Curriculum */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Depth Profiling Controller */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-400" /> Điều Khiển Độ Sâu Bóc Mòn (Crater Depth)
              </span>
              <button
                onClick={() => handleDepthChange(12.5)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                title="Khôi phục độ sâu chuẩn"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Depth Slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Độ Sâu Miệng Hố (z):</span>
                <span className="text-emerald-300 font-bold">{simResult.currentDepthNm.toFixed(1)} nm</span>
              </div>
              <input
                type="range"
                min="0.5"
                max={standard.maximumDepthNm}
                step="0.5"
                value={simResult.currentDepthNm}
                onChange={(e) => handleDepthChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>0 nm (Bề mặt)</span>
                <span>{(standard.maximumDepthNm / 2).toFixed(0)} nm</span>
                <span>{standard.maximumDepthNm} nm (Cốt nền)</span>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Tốc Độ Bóc Mòn (dz/dt):</span>
                <span className="text-sm font-bold text-emerald-300">{standard.sputterErosionRateNmPerSec} nm/s</span>
                <span className="text-[9px] text-slate-500">{(standard.sputterErosionRateNmPerSec * 60).toFixed(1)} nm/phút</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Thời Gian Bóc Mòn:</span>
                <span className="text-sm font-bold text-teal-300">{simResult.currentSputterTimeSeconds} s</span>
                <span className="text-[9px] text-slate-500">{(simResult.currentSputterTimeSeconds / 60).toFixed(1)} phút</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Hiệu Suất Sputter (Y):</span>
                <span className="text-sm font-bold text-sky-300">{standard.sputterYieldAtomsPerIon}</span>
                <span className="text-[9px] text-slate-500">nguyên tử / ion tới</span>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Liều Lượng Ion Tới:</span>
                <span className="text-sm font-bold text-purple-300">
                  {simResult.totalIonDoseIonsCm2.toExponential(2)}
                </span>
                <span className="text-[9px] text-slate-500">ions / cm²</span>
              </div>
            </div>

            {/* Static Limit Warning Badge */}
            {standard.simsMode === 'STATIC_SURFACE_SPECTROMETRY' && simResult.isStaticLimitExceeded && (
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/60 text-xs font-mono text-amber-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cảnh báo: Liều lượng ion vượt ngưỡng Static SIMS (10¹² ions/cm²)! Lớp đơn phân tử bị phá hủy.</span>
              </div>
            )}
          </div>

          {/* Current Monitored Species Readout Table */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-2.5 shadow-inner">
            <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
              <Crosshair className="w-4 h-4 text-emerald-400" /> Tín Hiệu Đầu Dò Tại Độ Sâu Hiện Tại:
            </span>
            <div className="flex flex-col gap-1.5">
              {standard.monitoredSpecies.map((sp) => {
                const count = currentPt.speciesCounts[sp.label] || 0;
                return (
                  <div key={sp.label} className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-2" style={{ color: sp.colorHex }}>
                      <span className="font-bold">{sp.label}</span>
                      <span className="text-[10px] text-slate-500">m/z = {sp.massOverChargeDa}</span>
                    </span>
                    <span className="font-bold text-white">{count.toLocaleString()} c/s</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Theoretical & Curriculum Notes */}
          <div className="p-4 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 rounded-xl border border-emerald-500/30 flex flex-col gap-2 shadow-inner">
            <span className="text-xs font-bold text-emerald-300 font-mono flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" /> Tích Hợp Giáo Dục GDPT 2018 & Chuẩn Mực Sigmund:
            </span>
            <div className="p-2 bg-emerald-950/30 rounded border border-emerald-500/20 text-[11px] font-serif text-emerald-100 italic">
              {standard.scientificCitation}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{standard.curriculumNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
