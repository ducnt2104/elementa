// src/components/visualizations/QcmdVisualizer.tsx
// Milestone 64: Quartz Crystal Microbalance with Dissipation (QCM-D) & Viscoelastic Voigt Visualizer
// Standards: Sauerbrey Equation (1959), Rodahl-Kasemo Dissipation Monitoring (1996) & Voigt-Voinova Model
// Curriculum: Vietnam GDPT 2018 (Vật lý 12: Dao động cơ học, dao động tắt dần, cộng hưởng áp điện; Sinh học 11: Đông máu; Hóa học 12: Gel protein & màng lipid)

import React, { useState, useMemo } from 'react';
import {
  QCMD_CATALOG,
  QcmdSpecimenStandard,
  simulateQcmdExperiment,
  SAUERBREY_CONSTANT_NG_PER_MM2_HZ
} from '../../domain/qcmdEngine';
import { sound } from '../../audio/soundEngine';
import {
  Gauge,
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
  ShieldAlert,
  Droplets,
  Volume2
} from 'lucide-react';

export interface QcmdVisualizerProps {
  initialSpecimenId?: string;
}

export const QcmdVisualizer: React.FC<QcmdVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'blood_fibrin_gelation'
  );
  const [selectedOvertones, setSelectedOvertones] = useState<number[]>([3, 5, 7]);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(300);
  const [viewMode, setViewMode] = useState<'frequency_dissipation_dual' | 'ring_down_decay_curve' | 'hydration_water_breakdown' | 'voigt_viscoelastic_scheme'>('frequency_dissipation_dual');
  const [activeTab, setActiveTab] = useState<'sauerbrey_principles' | 'dissipation_ring_down' | 'voigt_hydration_physics' | 'curriculum_gdpt'>('sauerbrey_principles');

  const simResult = useMemo(() => {
    return simulateQcmdExperiment(selectedSpecimenId);
  }, [selectedSpecimenId]);

  const {
    specimen,
    finalSauerbreyMassNgPerMm2,
    finalDissipationE6,
    finalHydrationPercentage,
    filmRigidityStatus,
    timePoints
  } = simResult;

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
    sound.playQcmdQuartzResonancePing(3);
  };

  const handleTriggerRingDown = () => {
    sound.playQcmdQuartzResonancePing(5);
    setTimeout(() => {
      sound.playViscoelasticDampingTone();
    }, 250);
  };

  const toggleOvertone = (n: number) => {
    if (selectedOvertones.includes(n)) {
      if (selectedOvertones.length > 1) {
        setSelectedOvertones(selectedOvertones.filter((o) => o !== n));
      }
    } else {
      setSelectedOvertones([...selectedOvertones, n].sort((a, b) => a - b));
    }
    sound.playUiClick();
  };

  // SVG Coordinates for Dual Frequency & Dissipation Plot
  const svgW = 600;
  const svgH = 280;
  const pad = { top: 30, right: 65, bottom: 45, left: 65 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  const totalTime = 600;
  const toX = (t: number) => pad.left + (t / totalTime) * plotW;

  // Bounds for Frequency shift Δf/n (-200 Hz to +10 Hz)
  const minF = useMemo(() => {
    let m = -20;
    timePoints.forEach((pt) => {
      pt.overtones.forEach((ov) => {
        if (ov.deltaFOverNHz < m) m = ov.deltaFOverNHz;
      });
    });
    return m * 1.15;
  }, [timePoints]);
  const maxF = 5;

  const toFY = (f: number) => pad.top + ((maxF - f) / (maxF - minF)) * plotH;

  // Bounds for Dissipation ΔD (0 to 25 × 10⁻⁶)
  const maxD = useMemo(() => {
    let m = 2.0;
    timePoints.forEach((pt) => {
      pt.overtones.forEach((ov) => {
        if (ov.deltaDDissipationUnits > m) m = ov.deltaDDissipationUnits;
      });
    });
    return m * 1.2;
  }, [timePoints]);

  const toDY = (d: number) => pad.top + plotH - (d / maxD) * plotH;

  // Color mapping for overtones
  const overtoneColors: Record<number, { f: string; d: string; label: string }> = {
    3: { f: '#06b6d4', d: '#f59e0b', label: 'n = 3 (15 MHz)' },
    5: { f: '#3b82f6', d: '#f97316', label: 'n = 5 (25 MHz)' },
    7: { f: '#8b5cf6', d: '#ef4444', label: 'n = 7 (35 MHz)' }
  };

  // Generate paths for each overtone
  const overtonePaths = useMemo(() => {
    return [3, 5, 7].map((n) => {
      const fPath = timePoints.reduce((acc, pt, idx) => {
        const ov = pt.overtones.find((o) => o.overtoneNumber === n);
        const fVal = ov ? ov.deltaFOverNHz : 0;
        const x = toX(pt.timeSec);
        const y = toFY(fVal);
        return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
      }, '');

      const dPath = timePoints.reduce((acc, pt, idx) => {
        const ov = pt.overtones.find((o) => o.overtoneNumber === n);
        const dVal = ov ? ov.deltaDDissipationUnits : 0;
        const x = toX(pt.timeSec);
        const y = toDY(dVal);
        return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
      }, '');

      return { n, fPath, dPath };
    });
  }, [timePoints, minF, maxF, maxD]);

  // Ring-down decay wave simulation for View 2
  const ringDownPoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const tauMicroSec = 15.0 / Math.max(0.2, (currentPoint?.overtones[0].deltaDDissipationUnits || 1.0));
    const fKHz = 50.0; // Scaled audio demonstration wave
    const totalRingDownTime = 80; // µs
    for (let i = 0; i < 200; i++) {
      const tUs = (totalRingDownTime * i) / 199;
      const decay = Math.exp(-tUs / tauMicroSec);
      const osc = Math.sin((2 * Math.PI * fKHz * tUs) / 1000);
      const amp = decay * osc;
      const x = pad.left + (i / 199) * plotW;
      const y = pad.top + plotH / 2 - amp * (plotH / 2.3);
      pts.push({ x, y });
    }
    return pts;
  }, [currentPoint]);

  const ringDownPath = useMemo(() => {
    return ringDownPoints.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }, [ringDownPoints]);

  return (
    <div className="bg-obsidian/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-6 text-ivory">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Cân Vi Lượng Thạch Anh Có Tiêu Tán Năng Lượng (QCM-D) & Phương Trình Sauerbrey (1959)
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 shadow-sm ${
              filmRigidityStatus === 'RIGID_SAUERBREY_ELASTIC'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60'
                : filmRigidityStatus === 'SOFT_VISCOELASTIC_VOIGT'
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/60'
                : 'bg-rose-950/80 text-rose-300 border-rose-500/60 animate-pulse'
            }`}>
              <Gauge className="w-3 h-3" />
              {filmRigidityStatus === 'RIGID_SAUERBREY_ELASTIC' && 'MÀNG CỨNG ĐÀN HỒI (SAUERBREY CHUẨN)'}
              {filmRigidityStatus === 'SOFT_VISCOELASTIC_VOIGT' && 'MÀNG NHỚT ĐÀN HỒI MỀM (VOIGT MODEL)'}
              {filmRigidityStatus === 'HYPER_HYDRATED_HYDROGEL' && 'HYDROGEL NGẬM NƯỚC SIÊU CAO (>85% H₂O)'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1.5 flex items-center gap-2">
            <Gauge className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            Cân Vi Lượng Thạch Anh QCM-D, Khối Lượng Sauerbrey & Mô Hình Voigt
          </h2>
          <p className="text-xs sm:text-sm text-ivory-muted mt-1">
            Đo đồng thời tần số cộng hưởng Δf_n/n và độ tiêu tán cơ học ΔD_n để bóc tách khối lượng âm học "ướt" và nước liên kết.
          </p>
        </div>

        {/* Trigger Ring-Down Pulse Button */}
        <button
          onClick={handleTriggerRingDown}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/50 shadow-lg shadow-cyan-900/40 hover:scale-105 active:scale-95"
        >
          <Play className="w-4 h-4 text-white fill-white" />
          <span>Đo Tắt Dần Ring-Down QCM-D ⚡</span>
        </button>
      </div>

      {/* Systems Standards Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Hệ Thống Mẫu Chuẩn Thạch Anh & Màng Sinh Học (QCM-D Benchmark Systems):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {QCMD_CATALOG.map((item) => {
            const isSelected = item.id === selectedSpecimenId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectSpecimen(item.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400'
                    : 'bg-navy/40 border-navy-light/60 text-ivory-muted hover:text-ivory hover:border-cyan-500/40 hover:bg-navy/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-cyan-400 font-bold">{item.sampleType.replace(/_/g, ' ')}</span>
                    <span className="text-ivory-muted">f₀=5 MHz</span>
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{item.vietnameseName.split('(')[0]}</div>
                  <div className="text-[10px] text-ivory-muted line-clamp-1 mt-0.5">{item.name}</div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-300">Δf: {item.finalDeltaF3Hz} Hz</span>
                  <span className="text-amber-300">ΔD: {item.finalDeltaD3E6}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls & Overtone Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-navy/60 border border-cyan-500/30 rounded-xl p-4">
        {/* Toggle Overtones Filter */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-ivory flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Chọn Họa Âm Overtone (n = 3, 5, 7):
          </span>
          <div className="flex items-center gap-2 pt-1">
            {[3, 5, 7].map((n) => {
              const isChecked = selectedOvertones.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => toggleOvertone(n)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    isChecked
                      ? 'bg-cyan-900/60 border-cyan-400 text-white shadow'
                      : 'bg-navy-dark/60 border-navy-light text-ivory-muted'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: overtoneColors[n].f }}></span>
                  <span>n = {n} ({n * 5} MHz)</span>
                </button>
              );
            })}
          </div>
          <span className="text-[10px] text-ivory-muted block mt-1">
            Các họa âm trùng nhau: màng cứng; các họa âm phân kỳ: màng mềm nhớt đàn hồi.
          </span>
        </div>

        {/* Slider: Time Scrubber */}
        <div className="space-y-1.5 lg:col-span-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Thời Gian Quét Tiến Trình (Time Scrubber):
            </span>
            <span className="font-mono text-cyan-300 font-bold">
              {currentTimeSec} s / {totalTime} s
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="600"
            step="5"
            value={currentTimeSec}
            onChange={(e) => setCurrentTimeSec(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>0 s (Tiêm mẫu)</span>
            <span className="text-cyan-400">Chuyển pha ({specimen.transitionTimeSec}s)</span>
            <span>600 s (Đạt cân bằng)</span>
          </div>
        </div>
      </div>

      {/* Live Physical Metrics Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy/50 border border-cyan-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Khối Lượng Âm Học Sauerbrey Γ_QCM</span>
          <div className="text-lg font-black font-mono text-cyan-300 mt-1">
            {currentPoint ? currentPoint.sauerbreyMassNgPerMm2.toFixed(2) : finalSauerbreyMassNgPerMm2.toFixed(2)} ng/mm²
          </div>
          <span className="text-[10px] text-ivory-muted">Hằng số C = 0.177 ng/(mm²·Hz)</span>
        </div>

        <div className="bg-navy/50 border border-amber-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Tiêu Tán Năng Lượng ΔD₃ (10⁻⁶)</span>
          <div className="text-lg font-black font-mono text-amber-300 mt-1">
            {currentPoint ? currentPoint.overtones[0].deltaDDissipationUnits.toFixed(2) : finalDissipationE6.toFixed(2)}
          </div>
          <span className="text-[10px] text-ivory-muted">
            {currentPoint && currentPoint.isViscoelastic ? 'Màng mềm tiêu tán năng lượng' : 'Màng cứng đàn hồi'}
          </span>
        </div>

        <div className="bg-navy/50 border border-blue-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Hàm Lượng Nước Ngậm % H₂O</span>
          <div className="text-lg font-black font-mono text-blue-300 mt-1">
            {specimen.hydrationPercentage.toFixed(1)} %
          </div>
          <span className="text-[10px] text-ivory-muted">Khối lượng khô: {specimen.opticalDryMassNgPerMm2} ng/mm²</span>
        </div>

        <div className="bg-navy/50 border border-purple-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Bề Dày Âm Học d_QCM</span>
          <div className="text-lg font-black font-mono text-purple-300 mt-1">
            {currentPoint ? currentPoint.filmThicknessNm.toFixed(1) : (finalSauerbreyMassNgPerMm2 / 1.05).toFixed(1)} nm
          </div>
          <span className="text-[10px] text-ivory-muted">Bao gồm nước liên kết thủy động</span>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-light/40 pb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setViewMode('frequency_dissipation_dual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'frequency_dissipation_dual'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span>Đồ Thị Đôi Δf_n/n & ΔD_n (Multi-Harmonic)</span>
          </button>
          <button
            onClick={() => setViewMode('ring_down_decay_curve')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'ring_down_decay_curve'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Sóng Tắt Dần Ring-Down A(t)</span>
          </button>
          <button
            onClick={() => setViewMode('hydration_water_breakdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'hydration_water_breakdown'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-blue-300" />
            <span>Phân Tích Nước Thủy Động (Wet vs Dry Mass)</span>
          </button>
          <button
            onClick={() => setViewMode('voigt_viscoelastic_scheme')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'voigt_viscoelastic_scheme'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Gauge className="w-3.5 h-3.5 text-purple-300" />
            <span>Mô Hình Voigt: Độ Đàn Hồi μ & Độ Nhớt η</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Display Area */}
      <div className="bg-obsidian/95 border border-navy-light/60 rounded-xl p-4 flex flex-col items-center justify-center min-h-[320px]">
        {/* VIEW 1: DUAL FREQUENCY & DISSIPATION MULTI-OVERTONE PLOT */}
        {viewMode === 'frequency_dissipation_dual' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                <strong className="text-cyan-300">Độ dịch chuyển tần số Δf_n/n (Hz)</strong>
                <span className="text-ivory-muted">|</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <strong className="text-amber-300">Tiêu tán năng lượng ΔD_n (10⁻⁶)</strong>
              </span>
              <span className="font-mono text-[11px] text-cyan-300">
                Đang hiển thị: {selectedOvertones.map((n) => `n=${n}`).join(', ')}
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

              {/* Zero lines */}
              <line
                x1={pad.left}
                y1={toFY(0)}
                x2={pad.left + plotW}
                y2={toFY(0)}
                stroke="#1e3a5f"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />

              {/* Scrubber Line */}
              <line
                x1={toX(currentTimeSec)}
                y1={pad.top}
                x2={toX(currentTimeSec)}
                y2={pad.top + plotH}
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Render Selected Overtones */}
              {overtonePaths.map(({ n, fPath, dPath }) => {
                if (!selectedOvertones.includes(n)) return null;
                const col = overtoneColors[n];
                return (
                  <g key={n}>
                    {/* Frequency Curve (Solid) */}
                    <path d={fPath} fill="none" stroke={col.f} strokeWidth="2.2" strokeLinecap="round" />
                    {/* Dissipation Curve (Dashed) */}
                    <path d={dPath} fill="none" stroke={col.d} strokeWidth="2.0" strokeDasharray="5 3" strokeLinecap="round" />
                  </g>
                );
              })}

              {/* Left Y-axis Label: Frequency */}
              <text x={pad.left - 35} y={pad.top + plotH / 2} fill="#06b6d4" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 ${pad.left - 35} ${pad.top + plotH / 2})`}>
                Δf_n / n (Hz)
              </text>

              {/* Right Y-axis Label: Dissipation */}
              <text x={pad.left + plotW + 35} y={pad.top + plotH / 2} fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(90 ${pad.left + plotW + 35} ${pad.top + plotH / 2})`}>
                ΔD_n (10⁻⁶)
              </text>

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Thời gian t (giây)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 2: RING-DOWN DECAY CURVE */}
        {viewMode === 'ring_down_decay_curve' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2 text-amber-300">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <strong className="text-white">Dạng Sóng Phân Rã Tắt Dần: A(t) = A₀ · exp(-t / τ) · sin(2π · f · t)</strong>
              </span>
              <span className="font-mono text-[11px] text-amber-300">
                D = 1 / (π · f · τ) = {currentPoint?.overtones[0].deltaDDissipationUnits.toFixed(2)} × 10⁻⁶
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Zero centerline */}
              <line
                x1={pad.left}
                y1={pad.top + plotH / 2}
                x2={pad.left + plotW}
                y2={pad.top + plotH / 2}
                stroke="#1e3a5f"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />

              {/* Ring-down decay wave */}
              <path d={ringDownPath} fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Thời gian phân rã tắt dần tự do t (micro-giây - µs)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Biên độ dao động tinh thể (V)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 3: HYDRATION WATER BREAKDOWN */}
        {viewMode === 'hydration_water_breakdown' && (
          <div className="w-full p-4 space-y-4 text-xs font-mono">
            <div className="text-cyan-300 font-bold text-sm">
              So Sánh Khối Lượng Âm Học "Ướt" (QCM-D) vs Khối Lượng Quang Học "Khô" (DPI/SPR):
            </div>
            <div className="bg-navy/70 p-4 rounded-xl border border-cyan-500/30 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-obsidian/60 p-3 rounded-lg border border-navy-light">
                  <span className="text-cyan-400 font-bold">Khối lượng âm học Γ_QCM</span>
                  <div className="text-xl font-black text-white mt-1">{finalSauerbreyMassNgPerMm2.toFixed(2)} ng/mm²</div>
                  <span className="text-[10px] text-ivory-muted">Bao gồm toàn bộ nước ngậm</span>
                </div>
                <div className="bg-obsidian/60 p-3 rounded-lg border border-navy-light">
                  <span className="text-purple-400 font-bold">Khối lượng quang học Γ_opt</span>
                  <div className="text-xl font-black text-white mt-1">{specimen.opticalDryMassNgPerMm2.toFixed(2)} ng/mm²</div>
                  <span className="text-[10px] text-ivory-muted">Chỉ tính khối lượng phân tử khô</span>
                </div>
                <div className="bg-obsidian/60 p-3 rounded-lg border border-navy-light">
                  <span className="text-blue-400 font-bold">Tỷ lệ nước ngậm % H₂O</span>
                  <div className="text-xl font-black text-blue-300 mt-1">{finalHydrationPercentage.toFixed(1)}%</div>
                  <span className="text-[10px] text-ivory-muted">Nước bị bẫy trong cấu trúc gel/màng</span>
                </div>
              </div>

              {/* Visual Bar Breakdown */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-purple-300">Vật chất sinh học khô: {(100 - finalHydrationPercentage).toFixed(1)}%</span>
                  <span className="text-blue-300">Nước thủy động bôi trơn: {finalHydrationPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full h-4 bg-navy-dark rounded-full overflow-hidden flex">
                  <div
                    className="bg-purple-500 h-full transition-all"
                    style={{ width: `${100 - finalHydrationPercentage}%` }}
                  ></div>
                  <div
                    className="bg-blue-400 h-full transition-all"
                    style={{ width: `${finalHydrationPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: VOIGT VISCOELASTIC SCHEME */}
        {viewMode === 'voigt_viscoelastic_scheme' && (
          <div className="w-full p-4 space-y-4 text-xs font-mono">
            <div className="text-purple-300 font-bold text-sm">
              Mô Hình Cơ Học Voigt-Voinova Cho Màng Mềm Sinh Học (Spring-Dashpot Element):
            </div>
            <div className="bg-navy/70 p-4 rounded-xl border border-purple-500/30 space-y-3 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="bg-obsidian/60 p-3 rounded-lg border border-navy-light space-y-1">
                  <span className="text-purple-400 font-bold">1. Lò xo đàn hồi (Shear Elasticity μ_f):</span>
                  <p className="text-ivory-muted">
                    Lưu trữ năng lượng cơ học thuận nghịch trong quá trình dao động cắt. Khi mạng lưới fibrin hoặc màng lipid cứng lại, μ_f tăng cao và độ tiêu tán ΔD giảm.
                  </p>
                </div>
                <div className="bg-obsidian/60 p-3 rounded-lg border border-navy-light space-y-1">
                  <span className="text-amber-400 font-bold">2. Ống giảm chấn ma sát (Shear Viscosity η_f):</span>
                  <p className="text-ivory-muted">
                    Tiêu tán năng lượng dưới dạng nhiệt do ma sát nội tại giữa các chuỗi peptide/polysaccharide ngậm nước, làm tắt dần dao động tự do của thạch anh.
                  </p>
                </div>
              </div>
              <p className="text-ivory-muted text-xs leading-normal">
                Mô hình Voigt giải đồng thời hệ phương trình sóng truyền âm qua môi trường nhiều lớp (tinh thể thạch anh + lớp màng sinh học nhớt đàn hồi + dung dịch đệm bán vô hạn), cung cấp chính xác bề dày màng d_film thực tế ngay cả khi phương trình Sauerbrey bị vô hiệu hóa do hiện tượng phân kỳ họa âm.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Biological & Material Significance Callout */}
      <div className="bg-navy/40 border border-cyan-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <div className="font-bold text-white flex items-center gap-2">
            <span>Ý Nghĩa Sinh Học & Cơ Học Của Mẫu: {specimen.vietnameseName}</span>
          </div>
          <p className="text-ivory-muted leading-relaxed">
            {specimen.description}
          </p>
          <div className="text-[11px] font-mono text-cyan-300 mt-1">
            {specimen.curriculumNotes}
          </div>
        </div>
      </div>

      {/* Educational Pedagogy Tabs */}
      <div className="space-y-3 pt-2 border-t border-navy-light/50">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('sauerbrey_principles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sauerbrey_principles'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-300" />
            <span>Nguyên Lý Cân Thạch Anh Sauerbrey (1959)</span>
          </button>
          <button
            onClick={() => setActiveTab('dissipation_ring_down')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'dissipation_ring_down'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Độ Tiêu Tán Năng Lượng & Sóng Tắt Dần</span>
          </button>
          <button
            onClick={() => setActiveTab('voigt_hydration_physics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'voigt_hydration_physics'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-blue-300" />
            <span>Mô Hình Voigt & Khối Lượng Nước Ngậm</span>
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
          {activeTab === 'sauerbrey_principles' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                Vật Lý Áp Điện & Định Luật Sauerbrey Cho Màng Cứng
              </h4>
              <p>
                Khi một phiến thạch anh cắt góc AT dao động ở chế độ sóng cắt cơ học, sự bám dính của một lớp màng mỏng cứng hoạt động như một phần kéo dài của khối lượng tinh thể, làm giảm tần số cộng hưởng:
              </p>
              <div className="bg-obsidian/60 p-3 rounded-lg font-mono text-[11px] text-cyan-300 space-y-1 border border-cyan-500/30">
                <div>Δm = - (C / n) · Δf_n = - (0.177 / n) · Δf_n  [ng/mm²]</div>
              </div>
              <p>
                Phương trình Sauerbrey áp dụng hoàn hảo cho các màng cứng, không biến dạng nội tại (ΔD &lt; 1.0 × 10⁻⁶), nơi mà tất cả các họa âm n = 3, 5, 7 chồng khít lên nhau một cách tuyệt đối (ví dụ màng đơn lớp thiol SAM trên vàng).
              </p>
            </div>
          )}

          {activeTab === 'dissipation_ring_down' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                Độ Tiêu Tán Năng Lượng Cơ Học ΔD (Rodahl &amp; Kasemo 1996)
              </h4>
              <p>
                Khi ngắt đột ngột điện áp kích thích, dao động của tinh thể thạch anh sẽ tắt dần tự do. Thời gian hằng số phân rã τ quyết định hệ số tiêu tán D:
              </p>
              <div className="bg-obsidian/60 p-3 rounded-lg font-mono text-[11px] text-amber-300 space-y-1 border border-amber-500/30">
                <div>D = E_tiêu_tán / (2π · E_lưu_trữ) = 1 / (π · f · τ)</div>
              </div>
              <p>
                Nếu màng bám dính mềm hoặc ngậm nhiều nước (như cục máu đông fibrin hoặc chổi nhầy mucin), màng sẽ hấp thụ và biến đổi năng lượng dao động thành nhiệt do lực ma sát nhớt, làm τ ngắn lại và ΔD tăng vọt lên hàng chục đơn vị!
              </p>
            </div>
          )}

          {activeTab === 'voigt_hydration_physics' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                Sự Kết Hợp Đột Phá: Bóc Tách Khối Lượng Nước Ngậm Sinh Học
              </h4>
              <p>
                Các kỹ thuật quang học (DPI, SPR) chỉ "nhìn thấy" độ chênh lệch chiết suất của các nguyên tử hữu cơ, do đó chỉ đo được khối lượng "khô". Ngược lại, QCM-D đo dao động cơ học nên rung lắc toàn bộ lượng nước bị giữ chặt bên trong các khoang xốp:
              </p>
              <div className="bg-obsidian/60 p-3 rounded-lg font-mono text-[11px] text-blue-300 space-y-1 border border-blue-500/30">
                <div>% Nước Ngậm = [ (Γ_QCM - Γ_quang_học) / Γ_QCM ] · 100%</div>
              </div>
              <p>
                Nhờ sự kết hợp này, các nhà nghiên cứu phát hiện lớp đệm nhầy bảo vệ dạ dày chứa đến 90% nước, và sự hình thành cục máu đông giữ lại gần 88% huyết tương để tạo cấu trúc gel cầm máu đàn hồi.
              </p>
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
                  <strong className="text-purple-300">Vật Lý 12:</strong> Chương 1: Dao động cơ học. Dao động điều hòa, dao động tắt dần, chu kỳ, tần số và năng lượng cơ học; Hiện tượng cộng hưởng cơ học và ứng dụng của hiệu ứng áp điện trong cảm biến sóng âm.
                </li>
                <li>
                  <strong className="text-cyan-300">Sinh Học 11:</strong> Hệ tuần hoàn và sinh lý máu: Cơ chế đông máu với sự chuyển hóa từ fibrinogen hòa tan thành mạng lưới sợi huyết fibrin không tan.
                </li>
                <li>
                  <strong className="text-amber-300">Hóa Học 12:</strong> Polyme và Đại phân tử: Cấu trúc hydrogel ngậm nước, màng sinh học phospholipid kép và tương tác hấp phụ nano.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
