// src/components/visualizations/SolidStateNmrVisualizer.tsx
// Milestone 61: Solid-State NMR (ssNMR), Magic-Angle Spinning (MAS) & Dipolar Coupling Visualizer
// Standards: Nobel Prize in Physics 1952 (Bloch & Purcell), Chemistry 1991 (Ernst), Chemistry 2002 (Wüthrich) & Andrew-Lowe Magic Angle (54.74°)
// Curriculum: Vietnam GDPT 2018 (Vật lý 12: Hiện tượng cộng hưởng từ hạt nhân NMR, mômen từ spin, sóng RF; Hóa học 10-12: Polyme phi tinh thể, màng kép lipid, xúc tác dị thể)

import React, { useState, useMemo } from 'react';
import {
  SOLID_STATE_NMR_CATALOG,
  MAGIC_ANGLE_DEGREES,
  calculateLegendreP2,
  simulateSolidStateNmr,
  SolidStateNmrSpecimen
} from '../../domain/solidStateNmrEngine';
import { sound } from '../../audio/soundEngine';
import {
  Activity,
  Award,
  Sparkles,
  Info,
  Radio,
  Sliders,
  CheckCircle2,
  Atom,
  RotateCw,
  Compass,
  Zap,
  Flame,
  Layers,
  FileText,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

export interface SolidStateNmrVisualizerProps {
  initialSpecimenId?: string;
}

export const SolidStateNmrVisualizer: React.FC<SolidStateNmrVisualizerProps> = ({
  initialSpecimenId
}) => {
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(
    initialSpecimenId || 'amyloid_beta_42'
  );
  const [rotorAngleDegrees, setRotorAngleDegrees] = useState<number>(MAGIC_ANGLE_DEGREES);
  const [masSpinRateKHz, setMasSpinRateKHz] = useState<number>(20.0);
  const [contactTimeMs, setContactTimeMs] = useState<number>(1.5);
  const [viewMode, setViewMode] = useState<'mas_spectrum' | 'legendre_p2_geometry' | 'cross_polarization_curve' | 'peak_assignments_table'>('mas_spectrum');
  const [activeTab, setActiveTab] = useState<'nobel_pioneers' | 'mas_physics' | 'hartmann_hahn_cp' | 'curriculum_gdpt'>('nobel_pioneers');

  const simResult = useMemo(() => {
    return simulateSolidStateNmr(
      selectedSpecimenId,
      masSpinRateKHz,
      rotorAngleDegrees,
      contactTimeMs
    );
  }, [selectedSpecimenId, masSpinRateKHz, rotorAngleDegrees, contactTimeMs]);

  const {
    specimen,
    p2Value,
    isMagicAngleLocked,
    hartmannHahnEnhancement,
    apparentLinewidthHz,
    spectrum,
    cpDynamics
  } = simResult;

  const handleSelectSpecimen = (id: string) => {
    setSelectedSpecimenId(id);
    const chosen = SOLID_STATE_NMR_CATALOG.find((s) => s.id === id);
    if (chosen) {
      setMasSpinRateKHz(chosen.optimalMasRateKHz);
      setContactTimeMs(chosen.optimalContactTimeMs);
    }
    sound.playHartmannHahnResonanceLockTone();
  };

  const handleLockMagicAngle = () => {
    setRotorAngleDegrees(MAGIC_ANGLE_DEGREES);
    sound.playHartmannHahnResonanceLockTone();
  };

  const handleRotorAngleChange = (angle: number) => {
    setRotorAngleDegrees(angle);
    sound.playMasRotorSpinTone(masSpinRateKHz);
  };

  const handleMasRateChange = (rate: number) => {
    setMasSpinRateKHz(rate);
    sound.playMasRotorSpinTone(rate);
  };

  const handleContactTimeChange = (time: number) => {
    setContactTimeMs(time);
    sound.playUiClick();
  };

  // SVG Coordinates for Spectrum View
  const svgW = 600;
  const svgH = 280;
  const pad = { top: 30, right: 30, bottom: 45, left: 60 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  // Spectrum PPM coordinate mapping (reversed for NMR convention: high PPM on left, low PPM on right)
  const minPpm = spectrum.length > 0 ? spectrum[0].ppm : 0;
  const maxPpm = spectrum.length > 0 ? spectrum[spectrum.length - 1].ppm : 200;
  const maxIntensity = useMemo(() => {
    let m = 0.1;
    spectrum.forEach((pt) => {
      if (pt.masIntensity > m) m = pt.masIntensity;
      if (pt.staticIntensity > m) m = pt.staticIntensity;
    });
    return m * 1.15;
  }, [spectrum]);

  const toSpecX = (ppm: number) => pad.left + ((maxPpm - ppm) / (maxPpm - minPpm)) * plotW;
  const toSpecY = (val: number) => pad.top + plotH - (val / maxIntensity) * plotH;

  const masSpectrumPath = useMemo(() => {
    return spectrum.reduce((acc, pt, idx) => {
      const x = toSpecX(pt.ppm);
      const y = toSpecY(pt.masIntensity);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [spectrum, maxIntensity]);

  const staticSpectrumPath = useMemo(() => {
    return spectrum.reduce((acc, pt, idx) => {
      const x = toSpecX(pt.ppm);
      const y = toSpecY(pt.staticIntensity);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [spectrum, maxIntensity]);

  // Coordinates for Legendre P2(cos theta) curve
  const toP2X = (deg: number) => pad.left + (deg / 90) * plotW;
  const toP2Y = (p2: number) => pad.top + plotH / 2 - (p2 / 1.1) * (plotH / 2);

  const p2CurvePath = useMemo(() => {
    const pts: string[] = [];
    for (let deg = 0; deg <= 90; deg += 1) {
      const p = calculateLegendreP2(deg);
      const x = toP2X(deg);
      const y = toP2Y(p);
      pts.push(deg === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
    }
    return pts.join(' ');
  }, []);

  // Coordinates for Cross-Polarization Dynamics curve
  const maxCpTime = 10.0;
  const toCpX = (t: number) => pad.left + (t / maxCpTime) * plotW;
  const toCpY = (pol: number) => pad.top + plotH - (pol / 1.05) * plotH;

  const cpCurvePath = useMemo(() => {
    return cpDynamics.reduce((acc, pt, idx) => {
      const x = toCpX(pt.contactTimeMs);
      const y = toCpY(pt.transferredPolarization);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [cpDynamics]);

  return (
    <div className="bg-obsidian/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md space-y-6 text-ivory">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-light/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Nobel Vật Lý 1952 (Bloch & Purcell) & Nobel Hóa Học 1991 (Ernst) / 2002 (Wüthrich)
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 shadow-sm ${
              isMagicAngleLocked
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 animate-pulse'
                : 'bg-amber-950/80 text-amber-300 border-amber-500/60'
            }`}>
              <RotateCw className="w-3 h-3" />
              {isMagicAngleLocked ? 'GÓC MA THUẬT KHÓA CHUẨN (54.74°)' : 'GÓC LỆCH TRỤC (DIPOLAR MỞ RỘNG)'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1.5 flex items-center gap-2">
            <Radio className="w-6 h-6 text-emerald-400 animate-spin-slow" />
            Cộng Hưởng Từ Hạt Nhân Trạng Thái Rắn (ssNMR) & Quay Góc Ma Thuật (MAS)
          </h2>
          <p className="text-xs sm:text-sm text-ivory-muted mt-1">
            Triệt tiêu mở rộng lưỡng cực hạt nhân và bất đối xứng dịch chuyển hóa học (CSA) qua hàm đa thức Legendre P₂(cos θₘ) ≡ 0.
          </p>
        </div>

        {/* Quick Lock Magic Angle Button */}
        <button
          onClick={handleLockMagicAngle}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
            isMagicAngleLocked
              ? 'bg-emerald-600/80 hover:bg-emerald-500 text-white border border-emerald-400/50 shadow-emerald-900/50'
              : 'bg-amber-600/80 hover:bg-amber-500 text-white border border-amber-400/50 animate-bounce'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-200" />
          <span>Khóa Góc Ma Thuật 54.74°</span>
        </button>
      </div>

      {/* Specimen Standard Selector Grid */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          Hệ Thống Mẫu Chuẩn Chất Rắn & Màng Sinh Học (Solid-State Standards):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {SOLID_STATE_NMR_CATALOG.map((item) => {
            const isSelected = item.id === selectedSpecimenId;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectSpecimen(item.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400'
                    : 'bg-navy/40 border-navy-light/60 text-ivory-muted hover:text-ivory hover:border-emerald-500/40 hover:bg-navy/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-emerald-400 font-bold">{item.targetNucleus} ssNMR</span>
                    <span className="text-ivory-muted">{item.spectrometerFieldTesla} T ({item.spectrometerFieldTesla === 18.8 ? '800 MHz' : '600 MHz'})</span>
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{item.vietnameseName.split('(')[0]}</div>
                  <div className="text-[10px] text-ivory-muted line-clamp-1 mt-0.5">{item.name}</div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-navy-light/40 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-300">MAS: {item.optimalMasRateKHz} kHz</span>
                  <span className="text-cyan-300">CP: {item.optimalContactTimeMs} ms</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls & Live Metrics Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-navy/60 border border-emerald-500/30 rounded-xl p-4">
        {/* Slider 1: Rotor Angle θ */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Góc Nghiêng Rotor θ:
            </span>
            <span className="font-mono text-emerald-300 font-bold">
              {rotorAngleDegrees.toFixed(2)}° {isMagicAngleLocked && '✨ (θₘ)'}
            </span>
          </div>
          <input
            type="range"
            min="0.0"
            max="90.0"
            step="0.1"
            value={rotorAngleDegrees}
            onChange={(e) => handleRotorAngleChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>0° (Song song B₀)</span>
            <span className="text-emerald-400 font-bold">54.74° (Góc Ma Thuật)</span>
            <span>90° (Vuông góc)</span>
          </div>
        </div>

        {/* Slider 2: MAS Spinning Rate ν_R */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              Tốc Độ Quay MAS ν_R:
            </span>
            <span className="font-mono text-cyan-300 font-bold">
              {masSpinRateKHz.toFixed(1)} kHz
            </span>
          </div>
          <input
            type="range"
            min="0.0"
            max="60.0"
            step="1.0"
            value={masSpinRateKHz}
            onChange={(e) => handleMasRateChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>0 kHz (Bột tĩnh)</span>
            <span>20 kHz (Chuẩn)</span>
            <span className="text-cyan-400 font-bold">60 kHz (Siêu tốc)</span>
          </div>
        </div>

        {/* Slider 3: Contact Time τ_CP */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-ivory flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Thời Gian Tiếp Xúc CP τ:
            </span>
            <span className="font-mono text-amber-300 font-bold">
              {contactTimeMs.toFixed(2)} ms
            </span>
          </div>
          <input
            type="range"
            min="0.05"
            max="8.0"
            step="0.05"
            value={contactTimeMs}
            onChange={(e) => handleContactTimeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-ivory-muted">
            <span>0.05 ms (Ngắn)</span>
            <span className="text-amber-400 font-bold">1.5 - 2.0 ms (Tối ưu)</span>
            <span>8.0 ms (Thư duỗi)</span>
          </div>
        </div>
      </div>

      {/* Live Physical Metrics Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-navy/50 border border-emerald-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Đa Thức Legendre P₂(cos θ)</span>
          <div className="text-lg font-black font-mono text-emerald-300 mt-1">
            {p2Value.toFixed(4)}
          </div>
          <span className="text-[10px] text-ivory-muted">Triệt tiêu = 0 tại 54.74°</span>
        </div>

        <div className="bg-navy/50 border border-cyan-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Độ Rộng Phổ Biểu Kiến Δν</span>
          <div className="text-lg font-black font-mono text-cyan-300 mt-1">
            {apparentLinewidthHz} Hz
          </div>
          <span className="text-[10px] text-ivory-muted">Thu hẹp {apparentLinewidthHz < 60 ? 'cực nét (lỏng)' : 'bị giãn rộng'}</span>
        </div>

        <div className="bg-navy/50 border border-amber-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Khuếch Đại Hartmann-Hahn CP</span>
          <div className="text-lg font-black font-mono text-amber-300 mt-1">
            +{hartmannHahnEnhancement}×
          </div>
          <span className="text-[10px] text-ivory-muted">Truyền phân cực ¹H → {specimen.targetNucleus}</span>
        </div>

        <div className="bg-navy/50 border border-purple-500/20 rounded-xl p-3 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-mono text-ivory-muted">Hạt Nhân & Tần Số Cơ Bản</span>
          <div className="text-lg font-black font-mono text-purple-300 mt-1">
            {specimen.targetNucleus} @ {specimen.spectrometerBaseFreqMHz} MHz
          </div>
          <span className="text-[10px] text-ivory-muted">Từ trường B₀ = {specimen.spectrometerFieldTesla} Tesla</span>
        </div>
      </div>

      {/* Visualization View Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy-light/40 pb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setViewMode('mas_spectrum')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'mas_spectrum'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-emerald-300" />
            <span>Phổ ssNMR & Vạch Vệ Tinh (MAS Spectrum)</span>
          </button>
          <button
            onClick={() => setViewMode('legendre_p2_geometry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'legendre_p2_geometry'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-300" />
            <span>Hình Học Góc Ma Thuật P₂(cos θ)</span>
          </button>
          <button
            onClick={() => setViewMode('cross_polarization_curve')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'cross_polarization_curve'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Động Học Truyền Phân Cực CP (Hartmann-Hahn)</span>
          </button>
          <button
            onClick={() => setViewMode('peak_assignments_table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'peak_assignments_table'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-navy/50 text-ivory-muted hover:text-ivory'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-300" />
            <span>Gán Đỉnh & Tensor CSA ({specimen.peaks.length} vị trí)</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Display Area */}
      <div className="bg-obsidian/95 border border-navy-light/60 rounded-xl p-4 flex flex-col items-center justify-center min-h-[320px]">
        {/* VIEW 1: MAS SPECTRUM WITH CENTRAL PEAKS & SPINNING SIDEBANDS */}
        {viewMode === 'mas_spectrum' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                <strong className="text-white">Phổ MAS {specimen.targetNucleus} ({masSpinRateKHz} kHz)</strong>
                <span className="text-ivory-muted">|</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block"></span>
                <span>Phổ bột tĩnh (Static Powder Pattern)</span>
              </span>
              <span className="font-mono text-[11px] text-emerald-300">
                Quy ước NMR: Độ dịch chuyển hóa học δ (ppm) giảm dần từ trái sang phải
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              {/* Background & Grid */}
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Zero baseline */}
              <line
                x1={pad.left}
                y1={pad.top + plotH}
                x2={pad.left + plotW}
                y2={pad.top + plotH}
                stroke="#1e3a5f"
                strokeWidth="1.5"
              />

              {/* Vertical PPM grid ticks */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                const x = pad.left + frac * plotW;
                const ppmVal = (maxPpm - frac * (maxPpm - minPpm)).toFixed(0);
                return (
                  <g key={idx}>
                    <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="#1e293b" strokeDasharray="3 3" />
                    <text x={x} y={pad.top + plotH + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      {ppmVal}
                    </text>
                  </g>
                );
              })}

              {/* Static Broad Powder Pattern (Red / Dotted) */}
              <path
                d={staticSpectrumPath}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.65"
              />

              {/* Sharp Magic Angle Spinning Spectrum (Emerald Glow) */}
              <path
                d={masSpectrumPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Peak Labels for Main Assignments */}
              {isMagicAngleLocked && specimen.peaks.map((pk) => {
                const px = toSpecX(pk.chemicalShiftPpm);
                if (px < pad.left || px > pad.left + plotW) return null;
                return (
                  <g key={pk.id}>
                    <line x1={px} y1={pad.top + 10} x2={px} y2={pad.top + plotH} stroke="#34d399" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
                    <text
                      x={px}
                      y={pad.top + 8}
                      fill="#34d399"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {pk.label} ({pk.chemicalShiftPpm})
                    </text>
                  </g>
                );
              })}

              {/* Axes Labels */}
              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Độ dịch chuyển hóa học δ (ppm)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Cường độ tín hiệu NMR (a.u.)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 2: LEGENDRE POLYNOMIAL P2(cos theta) GEOMETRIC PROOF */}
        {viewMode === 'legendre_p2_geometry' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2 text-cyan-300">
                <Compass className="w-4 h-4 text-cyan-400" />
                <strong className="text-white">Đa thức Legendre cấp 2: P₂(cos θ) = (3 cos²θ - 1) / 2</strong>
              </span>
              <span className="font-mono text-[11px] text-emerald-300">
                θₘ = arccos(1/√3) ≈ 54.7356° → P₂(cos θₘ) ≡ 0.00000
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Zero horizontal axis: P2 = 0 */}
              <line
                x1={pad.left}
                y1={toP2Y(0)}
                x2={pad.left + plotW}
                y2={toP2Y(0)}
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <text x={pad.left + plotW - 10} y={toP2Y(0) - 6} fill="#38bdf8" fontSize="10" textAnchor="end" fontFamily="monospace">
                P₂(cos θ) = 0 (Góc Ma Thuật)
              </text>

              {/* Magic Angle vertical line: theta = 54.74° */}
              <line
                x1={toP2X(MAGIC_ANGLE_DEGREES)}
                y1={pad.top}
                x2={toP2X(MAGIC_ANGLE_DEGREES)}
                y2={pad.top + plotH}
                stroke="#10b981"
                strokeWidth="2.0"
                strokeDasharray="3 3"
              />
              <text x={toP2X(MAGIC_ANGLE_DEGREES) + 8} y={pad.top + 20} fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="monospace">
                θₘ = 54.74°
              </text>

              {/* Current Angle marker */}
              <line
                x1={toP2X(rotorAngleDegrees)}
                y1={pad.top}
                x2={toP2X(rotorAngleDegrees)}
                y2={pad.top + plotH}
                stroke="#f59e0b"
                strokeWidth="2.5"
              />
              <circle
                cx={toP2X(rotorAngleDegrees)}
                cy={toP2Y(p2Value)}
                r="6"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x={toP2X(rotorAngleDegrees) + 10} y={toP2Y(p2Value) - 10} fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Hiện tại: {rotorAngleDegrees.toFixed(1)}° (P₂={p2Value.toFixed(3)})
              </text>

              {/* P2 curve */}
              <path d={p2CurvePath} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

              {/* Degree ticks */}
              {[0, 30, 45, 54.74, 60, 90].map((deg) => (
                <text key={deg} x={toP2X(deg)} y={pad.top + plotH + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                  {deg}°
                </text>
              ))}

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Góc nghiêng rotor θ so với từ trường B₀ (độ)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Giá trị P₂(cos θ)
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 3: CROSS-POLARIZATION DYNAMICS CURVE */}
        {viewMode === 'cross_polarization_curve' && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-ivory-muted px-2">
              <span className="flex items-center gap-2 text-amber-300">
                <Zap className="w-4 h-4 text-amber-400" />
                <strong className="text-white">Động Học Hartmann-Hahn CP: Buildup (T_{'{IS}'}) & Decay (T_{'{1ρH}'})</strong>
              </span>
              <span className="font-mono text-[11px] text-amber-300">
                T_{'{IS}'} = {specimen.tIS_Ms} ms | T_{'{1ρH}'} = {specimen.t1RhoH_Ms} ms
              </span>
            </div>

            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto max-h-[320px]">
              <rect x={pad.left} y={pad.top} width={plotW} height={plotH} fill="#060c18" rx="8" />

              {/* Time grid */}
              {[0, 2, 4, 6, 8, 10].map((t) => (
                <g key={t}>
                  <line x1={toCpX(t)} y1={pad.top} x2={toCpX(t)} y2={pad.top + plotH} stroke="#1e293b" strokeDasharray="3 3" />
                  <text x={toCpX(t)} y={pad.top + plotH + 16} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    {t} ms
                  </text>
                </g>
              ))}

              {/* Current contact time marker */}
              <line
                x1={toCpX(contactTimeMs)}
                y1={pad.top}
                x2={toCpX(contactTimeMs)}
                y2={pad.top + plotH}
                stroke="#f59e0b"
                strokeWidth="2.0"
                strokeDasharray="4 2"
              />
              <circle
                cx={toCpX(contactTimeMs)}
                cy={toCpY(calculateLegendreP2(0) > 0 ? (simResult.hartmannHahnEnhancement - 1) / 3.0 : 0.5)}
                r="6"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x={toCpX(contactTimeMs) + 8} y={pad.top + 30} fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">
                τ = {contactTimeMs.toFixed(2)} ms (+{hartmannHahnEnhancement}× CP)
              </text>

              {/* CP buildup/decay curve */}
              <path d={cpCurvePath} fill="none" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />

              <text x={pad.left + plotW / 2} y={pad.top + plotH + 34} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                Thời gian tiếp xúc CP contact time τ (ms)
              </text>
              <text x={18} y={pad.top + plotH / 2} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 18 ${pad.top + plotH / 2})`}>
                Hiệu suất truyền phân cực chuẩn hóa I(t)/I₀
              </text>
            </svg>
          </div>
        )}

        {/* VIEW 4: PEAK ASSIGNMENTS & CSA TENSORS TABLE */}
        {viewMode === 'peak_assignments_table' && (
          <div className="w-full overflow-x-auto space-y-2">
            <div className="text-xs font-bold text-emerald-300 mb-2 flex items-center justify-between">
              <span>Bảng Phân Tích Đỉnh Dịch Chuyển Hóa Học Isotropic & Tensor CSA ({specimen.targetNucleus}):</span>
              <span className="font-mono text-ivory-muted text-[11px]">{specimen.name}</span>
            </div>
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="bg-navy/80 text-emerald-300 border-b border-navy-light">
                  <th className="p-2">Đỉnh / Nhóm Chức</th>
                  <th className="p-2">Vị Trí δ_iso (ppm)</th>
                  <th className="p-2">Độ Rộng CSA (ppm)</th>
                  <th className="p-2">Bất Đối Xứng η</th>
                  <th className="p-2">Cường Độ</th>
                  <th className="p-2">Gán Cấu Trúc & Ý Nghĩa Sinh Học/Vật Liệu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-light/40">
                {specimen.peaks.map((pk) => (
                  <tr key={pk.id} className="hover:bg-navy/50 transition-colors">
                    <td className="p-2 font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {pk.label}
                    </td>
                    <td className="p-2 text-emerald-300 font-bold">{pk.chemicalShiftPpm.toFixed(1)} ppm</td>
                    <td className="p-2 text-cyan-300">{pk.csaSpanPpm} ppm</td>
                    <td className="p-2 text-amber-300">{pk.asymmetryEta.toFixed(2)}</td>
                    <td className="p-2 text-white">{pk.intensity.toFixed(2)}</td>
                    <td className="p-2 text-ivory-muted text-[11px]">{pk.assignment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Biological & Material Significance Callout */}
      <div className="bg-navy/40 border border-emerald-500/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <div className="font-bold text-white flex items-center gap-2">
            <span>Ý Nghĩa Khoa Học Của Mẫu Chuẩn: {specimen.vietnameseName}</span>
          </div>
          <p className="text-ivory-muted leading-relaxed">
            {specimen.biologicalOrMaterialSignificance}
          </p>
          <div className="text-[11px] font-mono text-emerald-300 mt-1">
            {specimen.curriculumNotes}
          </div>
        </div>
      </div>

      {/* Educational Pedagogy Tabs */}
      <div className="space-y-3 pt-2 border-t border-navy-light/50">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('nobel_pioneers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'nobel_pioneers'
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-300" />
            <span>Các Nhà Tiên Phong Nobel NMR</span>
          </button>
          <button
            onClick={() => setActiveTab('mas_physics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'mas_physics'
                ? 'bg-cyan-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-300" />
            <span>Vật Lý & Toán Học Góc Ma Thuật (54.74°)</span>
          </button>
          <button
            onClick={() => setActiveTab('hartmann_hahn_cp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'hartmann_hahn_cp'
                ? 'bg-amber-600 text-white shadow'
                : 'bg-navy/40 text-ivory-muted hover:text-ivory'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>Cơ Chế Truyền Phân Cực Chéo CP-MAS</span>
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
          {activeTab === 'nobel_pioneers' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                Di Sản Giải Thưởng Nobel Về Cộng Hưởng Từ Hạt Nhân (NMR)
              </h4>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <strong className="text-emerald-300">Felix Bloch & Edward Mills Purcell (Nobel Vật Lý 1952):</strong> Phát hiện độc lập hiện tượng cộng hưởng từ hạt nhân trong chất rắn (paraffin) và chất lỏng (nước), đo chính xác mômen từ hạt nhân proton.
                </li>
                <li>
                  <strong className="text-cyan-300">E. Raymond Andrew & I. J. Lowe (1958-1959):</strong> Phát minh kỹ thuật quay góc ma thuật (Magic-Angle Spinning - MAS), chứng minh chuyển động quay mẫu quanh trục 54° 44' triệt tiêu tương tác lưỡng cực hạt nhân.
                </li>
                <li>
                  <strong className="text-amber-300">Richard R. Ernst (Nobel Hóa Học 1991):</strong> Phát triển kỹ thuật biến đổi Fourier (FT-NMR) và phổ cộng hưởng từ đa chiều (2D/3D NMR), tạo cuộc cách mạng trong hóa học cấu trúc.
                </li>
                <li>
                  <strong className="text-purple-300">Kurt Wüthrich (Nobel Hóa Học 2002):</strong> Xác định cấu trúc không gian 3 chiều của protein và đại phân tử sinh học trong dung dịch bằng NMR.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'mas_physics' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                Nguyên Lý Toán Lý Triệt Tiêu Mở Rộng Phổ Trạng Thái Rắn
              </h4>
              <p>
                Trong chất lỏng, chuyển động Brown ngẫu nhiên đẳng hướng trung bình hóa các tương tác bất đối xứng về 0. Nhưng trong chất rắn tĩnh, các tương tác phụ thuộc góc phương vị làm vạch phổ bị giãn rộng hàng chục kilohertz:
              </p>
              <div className="bg-obsidian/60 p-3 rounded-lg font-mono text-[11px] text-cyan-300 space-y-1 border border-cyan-500/30">
                <div>H_dipolar = - (μ₀/4π) · (γ_I · γ_S · ℏ / r³) · [ (3 cos²θ - 1) / 2 ] · (3 I_z S_z - I · S)</div>
                <div>H_CSA = γ · I_z · B₀ · δ_iso + γ · I_z · B₀ · [ (3 cos²θ - 1) / 2 ] · Δσ</div>
              </div>
              <p>
                Cả hai tương tác đều nhân với hệ số hình học bậc 2 của đa thức Legendre: <span className="font-mono text-emerald-300">P₂(cos θ) = (3 cos²θ - 1) / 2</span>.
                Đặt <span className="font-mono text-white">3 cos²θₘ - 1 = 0 ⟹ cos²θₘ = 1/3 ⟹ θₘ = arccos(1/√3) ≈ 54.7356°</span>.
                Khi rotor quay quanh trục θₘ với tốc độ nhanh hơn độ rộng tương tác (ν_R &gt; Δν), toàn bộ tương tác bất đối xứng bị trung bình hóa về đúng 0, thu lại vạch phổ isotropic siêu sắc nét!
              </p>
            </div>
          )}

          {activeTab === 'hartmann_hahn_cp' && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Cơ Chế Phân Cực Chéo CP-MAS (Pines, Gibby & Waugh 1973)
              </h4>
              <p>
                Các hạt nhân quan trọng như ¹³C (độ phổ biến tự nhiên 1.1%) và ¹⁵N (0.37%) có tỷ số từ trường nhỏ (γ thấp) và độ nhạy rất yếu. Kỹ thuật Cross-Polarization chuyển phân cực từ hạt nhân proton ¹H dồi dào sang hạt nhân hiếm:
              </p>
              <div className="bg-obsidian/60 p-3 rounded-lg font-mono text-[11px] text-amber-300 space-y-1 border border-amber-500/30">
                <div>Điều kiện Hartmann-Hahn: γ_H · B_{'{1H}'} = γ_C · B_{'{1C}'}  (ω_{'{1H}'} = ω_{'{1C}'})</div>
                <div>Hệ số khuếch đại lý thuyết: η ≈ γ_H / γ_C ≈ 3.98 (với ¹³C) và ≈ 9.87 (với ¹⁵N)</div>
              </div>
              <p>
                Không chỉ tăng cường độ tín hiệu gấp ~4 lần (tương đương tiết kiệm thời gian tích lũy phổ 16 lần), chu kỳ kích thích lặp lại còn được quyết định bởi thời gian hồi phục nhanh T₁ của ¹H thay vì thời gian T₁ cực lâu của ¹³C rắn.
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
                  <strong className="text-purple-300">Vật Lý 12:</strong> Chuyên đề Vật lý hiện đại và Ứng dụng Y học: Hiện tượng cộng hưởng từ hạt nhân (NMR), mômen từ spin hạt nhân, năng lượng tách mức Zeeman trong từ trường ngoài, bức xạ sóng vô tuyến điện từ RF.
                </li>
                <li>
                  <strong className="text-emerald-300">Hóa Học 12:</strong> Peptit, Protein và Polyme: Cấu trúc phiến gấp β không tan trong bệnh Alzheimer (Aβ42), polyme vô cơ silicat zeolit và vật liệu xúc tác dị thể.
                </li>
                <li>
                  <strong className="text-cyan-300">Sinh Học 10 & 12:</strong> Cấu trúc màng sinh học kép phospholipid và kênh protein màng vận chuyển ion (kênh dẫn proton M2 của virus cúm A).
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
