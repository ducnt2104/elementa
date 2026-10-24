// src/components/visualizations/DualPolarizationVisualizer.tsx
// Milestone 63: Dual-Polarization Interferometry (DPI), Evanescent Wave Waveguide & Molecular Layer Dimensions Visualizer
// Standards: Cross et al. (Farfield Group / Manchester 2003) & De Feijter Analytical Inversion (1978)
// Curriculum: Vietnam GDPT 2018 (Vật lý 12: Giao thoa ánh sáng, sóng evanescent, phân cực TM/TE; Hóa học 12: Màng sinh học kép, biến tính protein)

import React, { useState, useMemo } from 'react';
import {
  DPI_CATALOG,
  DpiSpecimenStandard,
  simulateDpiExperiment,
  LASER_WAVELENGTH_NM
} from '../../domain/dualPolarizationEngine';
import { sound } from '../../audio/soundEngine';
import {
  Waves,
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
  Maximize2
} from 'lucide-react';

export interface DualPolarizationVisualizerProps {
  initialSpecimenId?: string;
}

export const DualPolarizationVisualizer: React.FC<DualPolarizationVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'bsa_adsorption_orientation'
  );
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25.0);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(300);
  const [viewMode, setViewMode] = useState<'thickness_refractive_index' | 'phase_shifts_tm_te' | 'mass_molecular_area' | 'waveguide_optics_diagram'>('thickness_refractive_index');
  const [activeTab, setActiveTab] = useState<'dpi_principles' | 'de_feijter_math' | 'conformation_vs_mass' | 'curriculum_gdpt'>('dpi_principles');

  const simResult = useMemo(() => {
    return simulateDpiExperiment(selectedSpecimenId, temperatureCelsius);
  }, [selectedSpecimenId, temperatureCelsius]);

  const {
    specimen,
    bulkRefractiveIndex,
    finalThicknessNm,
    finalRefractiveIndex,
    finalMassDensityNgPerMm2,
    finalAreaPerMoleculeNm2,
    thicknessResolutionAngstroms,
    timePoints
  } = simResult;

  // Current interpolated state at scrubber time
  const currentPoint = useMemo(() => {
    if (timePoints.length === 0) return null;
    let closest = timePoints[0];
    let minDiff = 9999;
    timePoints.forEach((pt) => {
      const diff = Math.abs(pt.timeSec - currentTimeSec);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    });
    return closest;
  }, [timePoints, currentTimeSec]);

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    sound.playDeFeijterMassResolvedChime();
  };

  const handleTriggerScan = () => {
    sound.playDpiLaserInterferenceTone();
    setTimeout(() => {
      sound.playDeFeijterMassResolvedChime();
    }, 280);
  };

  const handleTempChange = (val: number) => {
    setTemperatureCelsius(val);
    sound.playUiClick();
  };

  const handleTimeChange = (val: number) => {
    setCurrentTimeSec(val);
  };

  // SVG Coordinate mapping
  const svgW = 600;
  const svgH = 280;
  const pad = { top: 30, right: 60, bottom: 45, left: 60 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  const totalTime = 600;
  const toX = (t: number) => pad.left + (t / totalTime) * plotW;

  // Bounds for Thickness (0 to 30 nm) and Refractive Index (1.33 to 1.52)
  const maxD = useMemo(() => {
    let m = 5.0;
    timePoints.forEach((pt) => {
      if (pt.thicknessNm > m) m = pt.thicknessNm;
    });
    return m * 1.25;
  }, [timePoints]);

  const minN = bulkRefractiveIndex * 0.998;
  const maxN = 1.52;

  const toThickY = (d: number) => pad.top + plotH - (d / maxD) * plotH;
  const toNiY = (n: number) => pad.top + plotH - ((n - minN) / (maxN - minN)) * plotH;

  const thicknessPath = useMemo(() => {
    return timePoints.reduce((acc, pt, idx) => {
      const x = toX(pt.timeSec);
      const y = toThickY(pt.thicknessNm);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [timePoints, maxD]);

  const refractiveIndexPath = useMemo(() => {
    return timePoints.reduce((acc, pt, idx) => {
      const x = toX(pt.timeSec);
      const y = toNiY(pt.refractiveIndex);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [timePoints, minN, maxN]);

  // Phase Shifts bounds (0 to 120 deg)
  const maxPhaseDeg = useMemo(() => {
    let m = 10.0;
    timePoints.forEach((pt) => {
      if (pt.phaseShiftTmDeg > m) m = pt.phaseShiftTmDeg;
      if (pt.phaseShiftTeDeg > m) m = pt.phaseShiftTeDeg;
    });
    return m * 1.2;
  }, [timePoints]);

  const toPhaseY = (p: number) => pad.top + plotH - (p / maxPhaseDeg) * plotH;

  const tmPath = useMemo(() => {
    return timePoints.reduce((acc, pt, idx) => {
      const x = toX(pt.timeSec);
      const y = toPhaseY(pt.phaseShiftTmDeg);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [timePoints, maxPhaseDeg]);

  const tePath = useMemo(() => {
    return timePoints.reduce((acc, pt, idx) => {
      const x = toX(pt.timeSec);
      const y = toPhaseY(pt.phaseShiftTeDeg);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [timePoints, maxPhaseDeg]);

  // Mass bounds (0 to 10 ng/mm2)
  const maxMass = useMemo(() => {
    let m = 1.0;
    timePoints.forEach((pt) => {
      if (pt.surfaceMassDensityNgPerMm2 > m) m = pt.surfaceMassDensityNgPerMm2;
    });
    return m * 1.25;
  }, [timePoints]);

  const toMassY = (g: number) => pad.top + plotH - (g / maxMass) * plotH;

  const massPath = useMemo(() => {
    return timePoints.reduce((acc, pt, idx) => {
      const x = toX(pt.timeSec);
      const y = toMassY(pt.surfaceMassDensityNgPerMm2);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [timePoints, maxMass]);

  return (
    <div className="bg-obsidian/90 border border-teal-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-6 text-ivory">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-950/80 text-teal-300 border border-teal-500/50 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Công Nghệ Giao Thoa Phân Cực Kép (DPI) & Nghịch Đảo De Feijter (1978)
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 flex items-center gap-1.5 shadow-sm">
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              Độ Phân Giải Bề Dày: {thicknessResolutionAngstroms} Å (0.01 nm)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1.5 flex items-center gap-2">
            <Waves className="w-6 h-6 text-teal-400 animate-pulse" />
            Giao Thoa Phân Cực Kép (DPI) & Kích Thước Lớp Phân Tử Sóng Evanescent
          </h2>
          <p className="text-xs sm:text-sm text-ivory-muted mt-1">
            Đo đồng thời và độc lập bề dày vật lý d (Å) và chiết suất n (10⁻⁷ RIU) qua hai mode phân cực trực giao TM₀ & TE₀.
          </p>
        </div>

        {/* Trigger Scan Button */}
        <button
          onClick={handleTriggerScan}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white border border-teal-400/50 shadow-lg shadow-teal-900/40 hover:scale-105 active:scale-95"
        >
          <Play className="w-4 h-4 text-white fill-white" />
          <span>Quét Giao Thoa Phân Cực Kép ⚡</span>
        </button>
      </div>

      {/* Systems Standards Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Hệ Thống Mẫu Chuẩn Lớp Phân Tử & Màng Sinh Học (DPI Adlayer Standards):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {DPI_CATALOG.map((item) => {
            const isSelected = item.id === selectedSpecimenId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectSpecimen(item.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-950/70 border-teal-400 text-white shadow-lg shadow-teal-950/50 ring-1 ring-teal-400'
                    : 'bg-navy/40 border-navy-light/60 text-ivory-muted hover:text-ivory hover:border-teal-500/40 hover:bg-navy/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-teal-400 font-bold">{item.transitionType.replace(/_/g, ' ')}</span>
                    <span className="text-ivory-muted">{item.molecularWeightKDa} kDa</span>
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{item.vietnameseName.split('(')[0]}</div>
                  <div className="text-[10px] text-ivory-muted line-clamp-1 mt-0.5">{item.name}</div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-teal-300">d: {item.nativeThicknessNm} → {item.postTransitionThicknessNm} nm</span>
                  <span className="text-cyan-300">t: {item.transitionTimeSec}s</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls & Live Metrics Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-navy/60 border border-teal-500/30 rounded-xl p-4">
        {/* Slider 1: Temperature & Water Refractive Index */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Nhiệt Độ Buồng Đo (Chiết Suất Nước n_bulk):
            </span>
            <span className="font-mono text-rose-300 font-bold">
              {temperatureCelsius.toFixed(1)} °C (n_bulk = {bulkRefractiveIndex.toFixed(4)})
            </span>
          </div>
          <input
            type="range"
            min="15.0"
            max="40.0"
            step="0.5"
            value={temperatureCelsius}
            onChange={(e) => handleTempChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-rose-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>15 °C (1.3340)</span>
            <span>25 °C (1.3330)</span>
            <span>40 °C (1.3315)</span>
          </div>
        </div>

        {/* Slider 2: Time Scrubber */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-400" />
              Thời Gian Quét Tiến Trình (Time Scrubber):
            </span>
            <span className="font-mono text-teal-300 font-bold">
              {currentTimeSec} s / {totalTime} s
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="600"
            step="5"
            value={currentTimeSec}
            onChange={(e) => handleTimeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-teal-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>0 s (Bắt đầu)</span>
            <span className="text-teal-400">Chuyển pha ({specimen.transitionTimeSec}s)</span>
            <span>600 s (Hoàn tất)</span>
          </div>
        </div>
      </div>

      {/* Live Physical Metrics Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy/50 border border-teal-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Bề Dày Lớp Phân Tử d</span>
          <div className="text-lg font-black font-mono text-teal-300 mt-1">
            {currentPoint ? currentPoint.thicknessNm.toFixed(2) : finalThicknessNm} nm
          </div>
          <span className="text-[10px] text-ivory-muted">
            = {currentPoint ? (currentPoint.thicknessNm * 10).toFixed(1) : (finalThicknessNm * 10).toFixed(1)} Å
          </span>
        </div>

        <div className="bg-navy/50 border border-amber-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Chiết Suất Lớp Hấp Phụ n</span>
          <div className="text-lg font-black font-mono text-amber-300 mt-1">
            {currentPoint ? currentPoint.refractiveIndex.toFixed(4) : finalRefractiveIndex} RIU
          </div>
          <span className="text-[10px] text-ivory-muted">
            Δn = +{currentPoint ? (currentPoint.refractiveIndex - bulkRefractiveIndex).toFixed(4) : (finalRefractiveIndex - bulkRefractiveIndex).toFixed(4)}
          </span>
        </div>

        <div className="bg-navy/50 border border-cyan-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Mật Độ Khối Lượng De Feijter Γ</span>
          <div className="text-lg font-black font-mono text-cyan-300 mt-1">
            {currentPoint ? currentPoint.surfaceMassDensityNgPerMm2.toFixed(2) : finalMassDensityNgPerMm2} ng/mm²
          </div>
          <span className="text-[10px] text-ivory-muted">dn/dc = {specimen.dnDcMlPerG} mL/g</span>
        </div>

        <div className="bg-navy/50 border border-purple-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Diện Tích Mỗi Phân Tử A_mol</span>
          <div className="text-lg font-black font-mono text-purple-300 mt-1">
            {currentPoint ? currentPoint.areaPerMoleculeNm2.toFixed(1) : finalAreaPerMoleculeNm2} nm²
          </div>
          <span className="text-[10px] text-ivory-muted">M_w = {specimen.molecularWeightKDa} kDa</span>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-light/40 pb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setViewMode('thickness_refractive_index')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'thickness_refractive_index'
                ? 'bg-teal-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-teal-300" />
            <span>Bề Dày d (nm) & Chiết Suất n (DPI Dual Plot)</span>
          </button>
          <button
            onClick={() => setViewMode('phase_shifts_tm_te')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'phase_shifts_tm_te'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-300" />
            <span>Độ Lệch Pha Trực Giao ΔΦ_TM & ΔΦ_TE</span>
          </button>
          <button
            onClick={() => setViewMode('mass_molecular_area')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'mass_molecular_area'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Atom className="w-3.5 h-3.5 text-purple-300" />
            <span>Mật Độ Khối Lượng Γ & Dấu Chân Phân Tử A_mol</span>
          </button>
          <button
            onClick={() => setViewMode('waveguide_optics_diagram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'waveguide_optics_diagram'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>Sơ Đồ Ống Dẫn Quang & Sóng Evanescent</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Display Area */}
      <div className="bg-obsidian/95 border border-navy-light/60 rounded-xl p-4 flex flex-col items-center justify-center min-h-[320px]">
        {/* VIEW 1: DUAL PLOT (THICKNESS & REFRACTIVE INDEX) */}
        {viewMode === 'thickness_refractive_index' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block"></span>
                <strong className="text-teal-300">Bề dày d (nm)</strong>
                <span className="text-ivory-muted">|</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <strong className="text-amber-300">Chiết suất n_adlayer</strong>
              </span>
              <span className="font-mono text-[11px] text-teal-300">
                Độc lập tách rời: d = {currentPoint?.thicknessNm.toFixed(2)} nm | n = {currentPoint?.refractiveIndex.toFixed(4)}
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                const x = pad.left + frac * plotW;
                const timeVal = (frac * totalTime).toFixed(0);
                return (
                  <g key={idx}>
                    <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#1e293b" strokeDasharray="3 3" />
                    <text x={x} y={pad.top + plotH + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {timeVal} s
                    </text>
                  </g>
                );
              })}

              {/* Scrubber Vertical Line */}
              <line
                x1={toX(currentTimeSec)}
                y1={pad.top}
                x2={toX(currentTimeSec)}
                y2={pad.top + plotH}
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Thickness Curve (Teal) */}
              <path d={thicknessPath} fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />

              {/* Refractive Index Curve (Amber) */}
              <path d={refractiveIndexPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />

              {/* Marker Circles */}
              {currentPoint && (
                <>
                  <circle
                    cx={toX(currentPoint.timeSec)}
                    cy={toThickY(currentPoint.thicknessNm)}
                    r="5"
                    fill="#14b8a6"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={toX(currentPoint.timeSec)}
                    cy={toNiY(currentPoint.refractiveIndex)}
                    r="5"
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </>
              )}

              {/* Left Y-axis Label: Thickness */}
              <text x={pad.left - 30} y={pad.top + plotH / 2} fill="#14b8a6" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 ${pad.left - 30} ${pad.top + plotH / 2})`}>
                Bề dày d (nm)
              </text>

              {/* Right Y-axis Label: Refractive Index */}
              <text x={pad.left + plotW + 35} y={pad.top + plotH / 2} fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(90 ${pad.left + plotW + 35} ${pad.top + plotH / 2})`}>
                Chiết suất n_adlayer
              </text>

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Thời gian t (giây)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 2: TM & TE PHASE SHIFTS */}
        {viewMode === 'phase_shifts_tm_te' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                <strong className="text-cyan-300">ΔΦ_TM (Transverse Magnetic, Điện trường vuông góc bề mặt)</strong>
                <span className="text-ivory-muted">|</span>
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block"></span>
                <strong className="text-purple-300">ΔΦ_TE (Transverse Electric, Điện trường song song)</strong>
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Grid */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                const x = pad.left + frac * plotW;
                const timeVal = (frac * totalTime).toFixed(0);
                return (
                  <g key={idx}>
                    <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#1e293b" strokeDasharray="3 3" />
                    <text x={x} y={pad.top + plotH + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {timeVal} s
                    </text>
                  </g>
                );
              })}

              {/* TM Phase Curve */}
              <path d={tmPath} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

              {/* TE Phase Curve */}
              <path d={tePath} fill="none" stroke="#c084fc" strokeWidth="2.5" />

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Thời gian t (giây)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Độ lệch pha vân giao thoa (độ - degrees)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 3: SURFACE MASS DENSITY & MOLECULAR AREA */}
        {viewMode === 'mass_molecular_area' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                <strong className="text-white">Mật độ khối lượng De Feijter: Γ = d · (n - n_bulk) / (dn/dc)</strong>
              </span>
              <span className="font-mono text-[11px] text-cyan-300">
                A_mol = {currentPoint?.areaPerMoleculeNm2} nm² / phân tử
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Grid */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                const x = pad.left + frac * plotW;
                const timeVal = (frac * totalTime).toFixed(0);
                return (
                  <g key={idx}>
                    <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#1e293b" strokeDasharray="3 3" />
                    <text x={x} y={pad.top + plotH + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {timeVal} s
                    </text>
                  </g>
                );
              })}

              {/* Mass Curve */}
              <path d={massPath} fill="none" stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" />

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Thời gian t (giây)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Mật độ khối lượng bề mặt Γ (ng/mm²)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 4: WAVEGUIDE OPTICS DIAGRAM */}
        {viewMode === 'waveguide_optics_diagram' && (
          <div className="w-full p-4 space-y-4 text-xs font-mono">
            <div className="text-teal-300 font-bold text-sm">
              Cấu Trúc Lớp Ống Dẫn Quang Phiến Mỏng Si₃N₄ / SiO₂ & Sóng Tắt Dần Evanescent:
            </div>
            <div className="bg-navy/70 p-4 rounded-xl border border-teal-500/30 space-y-3">
              <div className="relative w-full h-36 bg-obsidian/80 rounded-lg border border-navy-light overflow-hidden flex flex-col justify-end p-2">
                {/* Bulk solution */}
                <div className="h-10 bg-cyan-950/40 border-b border-cyan-500/30 flex items-center justify-between px-3 text-[10px] text-cyan-200">
                  <span>Dung dịch đệm (Bulk Solution, n_bulk = {bulkRefractiveIndex.toFixed(4)})</span>
                  <span>Sóng tắt dần (Evanescent Field d_p ≈ 100 nm)</span>
                </div>
                {/* Molecular adlayer */}
                <div className="h-6 bg-teal-500/30 border-b border-teal-400 flex items-center justify-between px-3 text-[10px] font-bold text-teal-300">
                  <span>Lớp phân tử hấp phụ: d = {currentPoint?.thicknessNm.toFixed(2)} nm | n = {currentPoint?.refractiveIndex.toFixed(4)}</span>
                  <span>ΔΦ_TM & ΔΦ_TE</span>
                </div>
                {/* Sensing waveguide */}
                <div className="h-6 bg-blue-900/60 border-b border-blue-500 flex items-center justify-between px-3 text-[10px] text-blue-200">
                  <span>Ống dẫn quang cảm biến (Sensing Waveguide Si₃N₄, n = 2.01)</span>
                  <span>Laser He-Ne 632.8 nm</span>
                </div>
                {/* Cladding */}
                <div className="h-4 bg-slate-900 flex items-center px-3 text-[9px] text-slate-400">
                  <span>Lớp đệm cách ly (SiO₂ Cladding Layer, n = 1.46)</span>
                </div>
              </div>
              <p className="text-ivory-muted text-xs leading-normal">
                Ánh sáng laser He-Ne kết hợp truyền qua hai ống dẫn quang song song. Khi phân tử hấp phụ hoặc thay đổi cấu hình trên bề mặt cảm biến, độ lệch pha của mode TM (điện trường vuông góc) và mode TE (điện trường song song) phản ứng với tỷ lệ khác nhau, giải mã chính xác bề dày d và chiết suất n theo định luật điện từ học Maxwell.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Biological & Material Significance Callout */}
      <div className="bg-navy/40 border border-teal-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <div className="font-bold text-white flex items-center gap-2">
            <span>Ý Nghĩa Quang Học & Sinh Lý Của Mẫu: {specimen.vietnameseName}</span>
          </div>
          <p className="text-ivory-muted leading-relaxed">
            {specimen.description}
          </p>
          <div className="text-[11px] font-mono text-teal-300 mt-1">
            {specimen.curriculumNotes}
          </div>
        </div>
      </div>

      {/* Educational Pedagogy Tabs */}
      <div className="space-y-3 pt-2 border-t border-navy-light/50">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('dpi_principles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'dpi_principles'
                ? 'bg-teal-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-teal-300" />
            <span>Nguyên Lý Quang Học Ống Dẫn Sóng DPI</span>
          </button>
          <button
            onClick={() => setActiveTab('de_feijter_math')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'de_feijter_math'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-300" />
            <span>Công Thức Nghịch Đảo De Feijter (1978)</span>
          </button>
          <button
            onClick={() => setActiveTab('conformation_vs_mass')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'conformation_vs_mass'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-amber-300" />
            <span>Phân Biệt Biến Đổi Cấu Hình vs Gắn Kết Khối Lượng</span>
          </button>
          <button
            onClick={() => setActiveTab('curriculum_gdpt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'curriculum_gdpt'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-300" />
            <span>Liên Hệ Chương Trình GDPT 2018</span>
          </button>
        </div>

        <div className="bg-navy/30 border border-navy-light/40 rounded-xl p-4 text-xs leading-relaxed text-ivory-muted">
          {activeTab === 'dpi_principles' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal-400" />
                Vật Lý Quang Học Sóng Tắt Dần & Hai Mode Phân Cực Trực Giao
              </h4>
              <p>
                Kỹ thuật giao thoa phân cực kép sử dụng cấu trúc ống dẫn sóng phiến mỏng silicon nitride (Si₃N₄) với hai mode phân cực trực giao:
              </p>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <strong className="text-teal-300">Mode TM (Transverse Magnetic):</strong> Vectơ điện trường vuông góc với mặt phẳng cảm biến. Mode này tương tác mạnh mẽ với bề dày thẳng đứng d của lớp phân tử.
                </li>
                <li>
                  <strong className="text-cyan-300">Mode TE (Transverse Electric):</strong> Vectơ điện trường song song với bề mặt cảm biến, đo chủ yếu tổng lượng vật chất quang học hấp phụ.
                </li>
              </ul>
              <p>
                Nhờ có 2 phương trình độc lập cho 2 ẩn số, phương pháp DPI giải quyết hoàn toàn hạn chế "chập chênh" của SPR (chỉ đo được tích số n · d) và QCM-D (đo khối lượng kèm nước liên kết thủy động học).
              </p>
            </div>
          )}

          {activeTab === 'de_feijter_math' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                Toán Học Định Lượng Mật Độ Khối Lượng Bề Mặt De Feijter
              </h4>
              <p>
                Mật độ khối lượng lớp hấp phụ Γ (ng/mm² hoặc mg/m²) được xác định theo phương trình De Feijter:
              </p>
              <div className="bg-obsidian/60 p-3 rounded-lg font-mono text-[11px] text-cyan-300 space-y-1 border border-cyan-500/30">
                <div>Γ = d · [ (n_adlayer - n_bulk) / (dn/dc) ]</div>
                <div>A_mol = M_w / (Γ · N_A) [nm² / phân tử]</div>
              </div>
              <p>
                Trong đó <span className="font-mono text-white">dn/dc</span> là độ biến thiên chiết suất theo nồng độ (khoảng 0.182 mL/g đối với protein hình cầu). Từ diện tích phân tử A_mol, các nhà khoa học có thể xác định trực tiếp tư thế nằm (side-on) hay dựng đứng (end-on) của kháng thể và thụ thể màng.
              </p>
            </div>
          )}

          {activeTab === 'conformation_vs_mass' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                Dấu Hiệu Nhận Diện: Biến Đổi Cấu Trúc Khác Gắn Kết Khối Lượng Thế Nào?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-navy/70 p-3 rounded-xl border border-teal-500/30 space-y-1">
                  <span className="text-teal-300 font-bold">1. Gắn Kết Khối Lượng (Mass Binding):</span>
                  <p className="text-ivory-muted text-[11px]">
                    Cả bề dày d và chiết suất n (hoặc tổng khối lượng Γ) đều tăng đồng thời khi phối tử hoặc kháng nguyên bám thêm vào cảm biến.
                  </p>
                </div>
                <div className="bg-navy/70 p-3 rounded-xl border border-amber-500/30 space-y-1">
                  <span className="text-amber-300 font-bold">2. Biến Đổi Cấu Trúc / Biến Tính (Unfolding):</span>
                  <p className="text-ivory-muted text-[11px]">
                    Bề dày d tăng mạnh (chuỗi peptide bung rộng phồng to) nhưng chiết suất n lại giảm tương ứng (nước đệm tràn vào chiếm chỗ), trong khi tổng khối lượng Γ được bảo toàn gần như tuyệt đối!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum_gdpt' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                Tích Hợp Sâu Sắc Với Chương Trình GDPT 2018 Việt Nam
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong className="text-purple-300">Vật Lý 12:</strong> Sóng ánh sáng: Hiện tượng tán sắc và giao thoa sóng ánh sáng, hiệu quang trình, góc Brewster, sóng phân cực ngang TM và TE, hiện tượng phản xạ toàn phần và trường sóng tắt dần.
                </li>
                <li>
                  <strong className="text-teal-300">Hóa Học 12:</strong> Hợp chất Polyme và Protein: Hiện tượng hấp phụ màng đơn phân tử, tương tác liên kết hydro và lực van der Waals giữa các đại phân tử sinh học và bề mặt rắn silicat.
                </li>
                <li>
                  <strong className="text-cyan-300">Sinh Học 10 & 11:</strong> Màng sinh chất và tính thấm chọn lọc: Cấu trúc màng kép phospholipid tự lắp ráp (túi liposome vỡ tạo màng phẳng 4.2 nm).
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
