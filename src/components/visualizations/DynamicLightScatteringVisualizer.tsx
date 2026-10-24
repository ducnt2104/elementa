// src/components/visualizations/DynamicLightScatteringVisualizer.tsx
// Milestone 56: Dynamic Light Scattering (DLS), Stokes-Einstein Particle Size Distribution & Zeta Potential Visualizer
// Standards: Nobel Prize in Physics 1926 (Jean Baptiste Perrin - Brownian Motion) & ISO 22412 / ASTM E2490 DLS Standards
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Hạt nano; Hóa học 11: Sự điện ly & pH; Hóa học 12: Keo tụ Protein & Điểm đẳng điện pI; Vật lý 11: Chuyển động Brown & Tán xạ ánh sáng)

import React, { useState, useMemo } from 'react';
import {
  DLS_CATALOG,
  DlsSampleStandard,
  simulateDlsMeasurement,
  calculateWaterViscosity
} from '../../domain/dynamicLightScatteringEngine';
import { sound } from '../../audio/soundEngine';
import {
  Sun,
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
  Compass,
  Zap,
  Thermometer,
  Droplets
} from 'lucide-react';

export interface DynamicLightScatteringVisualizerProps {
  initialSampleId?: string;
}

export const DynamicLightScatteringVisualizer: React.FC<DynamicLightScatteringVisualizerProps> = ({
  initialSampleId
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(
    initialSampleId || 'gold_nanoparticles_citrate'
  );
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25.0);
  const [samplePh, setSamplePh] = useState<number>(7.0);
  const [activeTab, setActiveTab] = useState<'stokes_einstein_brownian' | 'rayleigh_d6_distribution' | 'zeta_potential_edl' | 'nobel_curriculum_gdpt'>('rayleigh_d6_distribution');
  const [plotMode, setPlotMode] = useState<'size_distribution' | 'autocorrelation' | 'zeta_titration'>('size_distribution');

  const simResult = useMemo(() => {
    return simulateDlsMeasurement(selectedSampleId, temperatureCelsius, samplePh);
  }, [selectedSampleId, temperatureCelsius, samplePh]);

  const {
    sample,
    solventViscosityPaS,
    diffusionCoefficientM2PerS,
    hydrodynamicDiameterNm,
    polydispersityIndexPdi,
    measuredZetaPotentialMv,
    stabilityStatusVI,
    autocorrelationCurve,
    sizeDistribution,
    zetaTitrationCurve
  } = simResult;

  const handleSampleChange = (id: string) => {
    setSelectedSampleId(id);
    sound.playUiClick();
    sound.playDlsLaserScatteringPulse();
  };

  const handlePhChange = (val: number) => {
    setSamplePh(val);
    // Alert tone if near Isoelectric Point (IEP)
    if (Math.abs(val - sample.isoelectricPointIep) < 0.6) {
      sound.playZetaIsoelectricAlertTone();
    } else {
      sound.playUiClick();
    }
  };

  const handlePlotModeSwitch = (mode: 'size_distribution' | 'autocorrelation' | 'zeta_titration') => {
    setPlotMode(mode);
    sound.playUiClick();
    if (mode === 'zeta_titration') {
      sound.playZetaIsoelectricAlertTone();
    } else {
      sound.playDlsLaserScatteringPulse();
    }
  };

  // Dimensions for Plots
  const svgWidth = 840;
  const svgHeight = 360;
  const padLeft = 70;
  const padRight = 45;
  const padTop = 40;
  const padBottom = 55;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  // 1. Size Distribution Plot Scaling (Log scale diameter)
  const minD = Math.min(...sizeDistribution.map((b) => b.diameterNm));
  const maxD = Math.max(...sizeDistribution.map((b) => b.diameterNm));
  const maxPercent = Math.max(...sizeDistribution.map((b) => b.intensityPercentage)) * 1.15;

  const getSizeX = (d: number) => {
    const logMin = Math.log10(minD);
    const logMax = Math.log10(maxD);
    const frac = (Math.log10(d) - logMin) / (logMax - logMin);
    return padLeft + frac * plotWidth;
  };
  const getSizeY = (pct: number) => padTop + plotHeight - (pct / maxPercent) * plotHeight;

  const intensityPath = useMemo(() => {
    return sizeDistribution
      .map((b, i) => `${i === 0 ? 'M' : 'L'} ${getSizeX(b.diameterNm).toFixed(1)} ${getSizeY(b.intensityPercentage).toFixed(1)}`)
      .join(' ');
  }, [sizeDistribution, maxPercent, minD, maxD]);

  const volumePath = useMemo(() => {
    return sizeDistribution
      .map((b, i) => `${i === 0 ? 'M' : 'L'} ${getSizeX(b.diameterNm).toFixed(1)} ${getSizeY(b.volumePercentage).toFixed(1)}`)
      .join(' ');
  }, [sizeDistribution, maxPercent, minD, maxD]);

  const numberPath = useMemo(() => {
    return sizeDistribution
      .map((b, i) => `${i === 0 ? 'M' : 'L'} ${getSizeX(b.diameterNm).toFixed(1)} ${getSizeY(b.numberPercentage).toFixed(1)}`)
      .join(' ');
  }, [sizeDistribution, maxPercent, minD, maxD]);

  // 2. Autocorrelation Curve Scaling
  const minTau = autocorrelationCurve[0].delayTimeMicroseconds;
  const maxTau = autocorrelationCurve[autocorrelationCurve.length - 1].delayTimeMicroseconds;
  const getTauX = (tau: number) => {
    const logMin = Math.log10(minTau);
    const logMax = Math.log10(maxTau);
    const frac = (Math.log10(tau) - logMin) / (logMax - logMin);
    return padLeft + frac * plotWidth;
  };
  const getG2Y = (g2: number) => padTop + plotHeight - (g2 / 1.0) * plotHeight;

  const autoPath = useMemo(() => {
    return autocorrelationCurve
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getTauX(pt.delayTimeMicroseconds).toFixed(1)} ${getG2Y(pt.g2MinusOne).toFixed(1)}`)
      .join(' ');
  }, [autocorrelationCurve]);

  // 3. Zeta Titration Curve Scaling
  const getZetaX = (pH: number) => padLeft + ((pH - 2.0) / 10.0) * plotWidth;
  const getZetaY = (z: number) => padTop + plotHeight / 2 - (z / 60.0) * (plotHeight / 2);

  const zetaPath = useMemo(() => {
    return zetaTitrationCurve
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getZetaX(pt.pH).toFixed(1)} ${getZetaY(pt.zetaPotentialMv).toFixed(1)}`)
      .join(' ');
  }, [zetaTitrationCurve]);

  return (
    <div className="bg-navy-light/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header & Nobel Citations */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
              Milestone 56 • Dynamic Light Scattering & Zeta
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Stokes-Einstein Relation
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-ivory tracking-wide flex items-center gap-2 mt-1">
            <Sun className="w-6 h-6 text-amber-400" />
            Tán Xạ Ánh Sáng Động (DLS) & Đo Điện Thế Zeta (Zeta Potential)
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Nobel Vật Lý 1926 (Jean Baptiste Perrin - Chuyển động Brown) • Kích thước hạt nano d_h, độ đa phân tán PDI & độ bền hệ keo
          </p>
        </div>

        {/* Quick Instrument Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-right">
          <div className="bg-navy-dark/70 border border-amber-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Đường Kính Thủy Động d_h</span>
            <span className="text-xs font-black text-amber-300">{hydrodynamicDiameterNm} nm</span>
          </div>
          <div className="bg-navy-dark/70 border border-cyan-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Hệ Số Khuếch Tán D</span>
            <span className="text-xs font-black text-cyan-300">{diffusionCoefficientM2PerS.toExponential(2)} m²/s</span>
          </div>
          <div className="bg-navy-dark/70 border border-emerald-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Chỉ Số PDI</span>
            <span className="text-xs font-black text-emerald-300">{polydispersityIndexPdi}</span>
          </div>
          <div className="bg-navy-dark/70 border border-purple-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Điện Thế Zeta (ζ)</span>
            <span className={`text-xs font-black ${Math.abs(measuredZetaPotentialMv) >= 30 ? 'text-emerald-300' : Math.abs(measuredZetaPotentialMv) < 15 ? 'text-rose-400' : 'text-amber-300'}`}>
              {measuredZetaPotentialMv} mV
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-navy-dark/60 border border-white/5 rounded-xl p-4">
        {/* Sample Selection */}
        <div>
          <label className="text-xs font-bold text-amber-300 block mb-1.5 flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5" />
            Mẫu Chuẩn Kích Thước & Hệ Keo:
          </label>
          <div className="space-y-1.5">
            {Object.values(DLS_CATALOG).map((item) => (
              <button
                key={item.id}
                onClick={() => handleSampleChange(item.id)}
                className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all border ${
                  selectedSampleId === item.id
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-md'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                <div className="font-bold truncate">{item.name.split('(')[0]}</div>
                <div className="text-[10px] text-amber-300 font-mono">
                  d_h = {item.hydrodynamicDiameterNm} nm • IEP = pH {item.isoelectricPointIep}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Temperature & pH Sliders */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5" />
                Nhiệt Độ T (°C) → Độ Nhớt Dung Môi:
              </label>
              <span className="text-xs font-mono font-bold text-cyan-200">
                {temperatureCelsius.toFixed(1)} °C (η = {(solventViscosityPaS * 1000).toFixed(3)} mPa·s)
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={45}
              step={0.5}
              value={temperatureCelsius}
              onChange={(e) => setTemperatureCelsius(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-ivory-muted font-mono mt-0.5">
              <span>15 °C (η cao)</span>
              <span>25 °C (Chuẩn)</span>
              <span>45 °C (Khuếch tán nhanh)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5" />
                pH Dung Dịch (Điểm Đẳng Điện IEP = {sample.isoelectricPointIep}):
              </label>
              <span className="text-xs font-mono font-bold text-emerald-200">
                pH {samplePh.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={2.0}
              max={12.0}
              step={0.2}
              value={samplePh}
              onChange={(e) => handlePhChange(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-ivory-muted font-mono mt-0.5">
              <span>pH 2 (Acid)</span>
              <span>IEP: {sample.isoelectricPointIep}</span>
              <span>pH 12 (Base)</span>
            </div>
            <p className="text-[10px] mt-1 italic font-mono text-emerald-200">
              Trạng thái: <strong className={Math.abs(measuredZetaPotentialMv) >= 30 ? 'text-emerald-300' : 'text-rose-400'}>{stabilityStatusVI.split('(')[0]}</strong>
            </p>
          </div>
        </div>

        {/* Plot Mode Selector & Quick Summary */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-purple-300 block mb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Chế Độ Hiển Thị Đồ Thị (View):
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => handlePlotModeSwitch('size_distribution')}
                className={`p-1.5 rounded-lg text-[11px] font-bold border transition-all text-center ${
                  plotMode === 'size_distribution'
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                Phân Bố Cỡ Hạt
              </button>
              <button
                onClick={() => handlePlotModeSwitch('autocorrelation')}
                className={`p-1.5 rounded-lg text-[11px] font-bold border transition-all text-center ${
                  plotMode === 'autocorrelation'
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                Hàm Tự Tương Quan
              </button>
              <button
                onClick={() => handlePlotModeSwitch('zeta_titration')}
                className={`p-1.5 rounded-lg text-[11px] font-bold border transition-all text-center ${
                  plotMode === 'zeta_titration'
                    ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                Đường Chuẩn Zeta
              </button>
            </div>
          </div>

          <div className="p-2.5 bg-navy-light/40 rounded-xl border border-white/5 space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-ivory-muted">Góc tán xạ NIBS:</span>
              <span className="text-amber-300 font-bold">173° (Backscatter)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ivory-muted">Bước sóng laser He-Ne:</span>
              <span className="text-rose-300 font-bold">632.8 nm (Đỏ)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ivory-muted">Độ phân tán PDI:</span>
              <span className="text-emerald-300 font-bold">{polydispersityIndexPdi} ({polydispersityIndexPdi < 0.1 ? 'Đơn phân tán' : 'Đa phân tán'})</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Graphical Display (Size Distribution vs Autocorrelation vs Zeta) */}
      <div className="bg-obsidian/90 border border-emerald-500/30 rounded-2xl p-4 shadow-inner relative overflow-hidden">
        {plotMode === 'size_distribution' && (
          <div>
            {/* Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-bold text-amber-200">Phổ Phân Bố Kích Thước Hạt DLS (Độ Nhạy Lũy Thừa 6 Rayleigh I ~ d⁶)</span>
                <span className="text-[11px] text-ivory-muted font-mono">({sample.nameVI.split('(')[0]})</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-amber-300">d_h = {hydrodynamicDiameterNm} nm</span>
                <span className="text-emerald-300">PDI = {polydispersityIndexPdi}</span>
              </div>
            </div>

            {/* Size SVG */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[650px] select-none">
                {/* Grid Lines */}
                {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                  const y = padTop + plotHeight * (1 - frac);
                  return (
                    <line key={frac} x1={padLeft} y1={y} x2={padLeft + plotWidth} y2={y} stroke="#ffffff" strokeOpacity="0.07" strokeDasharray="3 3" />
                  );
                })}

                {/* 1. Intensity Distribution (Cyan) */}
                <path d={intensityPath} fill="none" stroke="#38bdf8" strokeWidth="2.8" filter="drop-shadow(0 0 3px rgba(56, 189, 248, 0.4))" />

                {/* 2. Volume Distribution (Emerald) */}
                <path d={volumePath} fill="none" stroke="#10b981" strokeWidth="2.0" strokeDasharray="5 2" />

                {/* 3. Number Distribution (Purple) */}
                <path d={numberPath} fill="none" stroke="#c084fc" strokeWidth="1.8" strokeDasharray="2 2" />

                {/* Mean Diameter Line */}
                <line
                  x1={getSizeX(hydrodynamicDiameterNm)}
                  y1={padTop}
                  x2={getSizeX(hydrodynamicDiameterNm)}
                  y2={padTop + plotHeight}
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text x={getSizeX(hydrodynamicDiameterNm)} y={padTop + 14} fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Z-Average = {hydrodynamicDiameterNm} nm
                </text>

                {/* X-Axis */}
                <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {[1, 5, 10, 50, 100, 500, 1000].map((dVal) => {
                  if (dVal < minD || dVal > maxD) return null;
                  const x = getSizeX(dVal);
                  return (
                    <g key={dVal}>
                      <line x1={x} y1={padTop + plotHeight} x2={x} y2={padTop + plotHeight + 6} stroke="#94a3b8" />
                      <text x={x} y={padTop + plotHeight + 18} fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        {dVal} nm
                      </text>
                    </g>
                  );
                })}
                <text x={padLeft + plotWidth / 2} y={padTop + plotHeight + 40} fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Đường Kính Thủy Động d_h (nm) → Thang Đo Logarithmic
                </text>

                {/* Y-Axis */}
                <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                <text
                  x={-(padTop + plotHeight / 2)}
                  y={padLeft - 45}
                  fill="#38bdf8"
                  fontSize="11"
                  fontWeight="bold"
                  transform="rotate(-90)"
                  textAnchor="middle"
                >
                  Tỉ Lệ Phần Trăm (%)
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-cyan-400 rounded" />
                <span className="font-bold text-cyan-300">Phân Bố Cường Độ Tán Xạ Intensity (I ~ d⁶)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-emerald-400 rounded border-dashed" />
                <span className="font-bold text-emerald-300">Phân Bố Thể Tích Volume (V ~ d³)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-purple-400 rounded border-dotted" />
                <span className="font-bold text-purple-300">Phân Bố Số Lượng Hạt Number (N ~ d⁰)</span>
              </div>
            </div>
          </div>
        )}

        {plotMode === 'autocorrelation' && (
          <div>
            {/* Autocorrelation Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold text-cyan-200">Hàm Tự Tương Quan Cường Độ Bậc Hai g₂(τ) - 1 (Định Luật Siegert)</span>
                <span className="text-[11px] text-ivory-muted font-mono">(Photon Correlation Spectroscopy)</span>
              </div>
              <span className="text-cyan-300 font-mono text-[11px]">D = {diffusionCoefficientM2PerS.toExponential(2)} m²/s</span>
            </div>

            {/* Autocorrelation SVG */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[650px] select-none">
                {/* Grid Lines */}
                {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                  const y = padTop + plotHeight * (1 - frac);
                  return (
                    <line key={frac} x1={padLeft} y1={y} x2={padLeft + plotWidth} y2={y} stroke="#ffffff" strokeOpacity="0.07" strokeDasharray="3 3" />
                  );
                })}

                {/* Autocorrelation Curve */}
                <path d={autoPath} fill="none" stroke="#38bdf8" strokeWidth="2.8" filter="drop-shadow(0 0 4px rgba(56, 189, 248, 0.5))" />

                {/* Baseline 0 */}
                <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 4" />

                {/* X-Axis */}
                <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {[1, 10, 100, 1000, 10000, 100000].map((tau) => {
                  const x = getTauX(tau);
                  return (
                    <g key={tau}>
                      <line x1={x} y1={padTop + plotHeight} x2={x} y2={padTop + plotHeight + 6} stroke="#94a3b8" />
                      <text x={x} y={padTop + plotHeight + 18} fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        {tau >= 1000 ? `${tau / 1000} ms` : `${tau} μs`}
                      </text>
                    </g>
                  );
                })}
                <text x={padLeft + plotWidth / 2} y={padTop + plotHeight + 40} fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Thời Gian Trễ τ (Microseconds μs) → Thang Đo Logarithmic
                </text>

                {/* Y-Axis */}
                <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val) => {
                  const y = getG2Y(val);
                  return (
                    <g key={val}>
                      <line x1={padLeft - 5} y1={y} x2={padLeft} y2={y} stroke="#94a3b8" />
                      <text x={padLeft - 8} y={y + 4} fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="end">
                        {val.toFixed(1)}
                      </text>
                    </g>
                  );
                })}
                <text
                  x={-(padTop + plotHeight / 2)}
                  y={padLeft - 45}
                  fill="#38bdf8"
                  fontSize="11"
                  fontWeight="bold"
                  transform="rotate(-90)"
                  textAnchor="middle"
                >
                  g₂(τ) - 1 (Hệ Số Coherence)
                </text>
              </svg>
            </div>
          </div>
        )}

        {plotMode === 'zeta_titration' && (
          <div>
            {/* Zeta Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-emerald-200">Đường Chuẩn Độ Thế Zeta Theo pH (Điểm Đẳng Điện IEP = {sample.isoelectricPointIep})</span>
                <span className="text-[11px] text-ivory-muted font-mono">(Phương trình Smoluchowski μ_e = ε·ζ / η)</span>
              </div>
              <span className={`font-mono text-[11px] font-bold ${Math.abs(measuredZetaPotentialMv) >= 30 ? 'text-emerald-300' : 'text-rose-400'}`}>
                pH {samplePh}: ζ = {measuredZetaPotentialMv} mV
              </span>
            </div>

            {/* Zeta SVG */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[650px] select-none">
                {/* Safe Repulsion Zone (Top: > +30 mV) */}
                <rect x={padLeft} y={padTop} width={plotWidth} height={getZetaY(30) - padTop} fill="#10b981" fillOpacity="0.08" />
                {/* Safe Repulsion Zone (Bottom: < -30 mV) */}
                <rect x={padLeft} y={getZetaY(-30)} width={plotWidth} height={padTop + plotHeight - getZetaY(-30)} fill="#10b981" fillOpacity="0.08" />
                {/* Coagulation Danger Zone (-15 to +15 mV) */}
                <rect x={padLeft} y={getZetaY(15)} width={plotWidth} height={getZetaY(-15) - getZetaY(15)} fill="#ef4444" fillOpacity="0.10" />

                {/* Zero Zeta Line */}
                <line x1={padLeft} y1={getZetaY(0)} x2={padLeft + plotWidth} y2={getZetaY(0)} stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x={padLeft + plotWidth - 10} y={getZetaY(0) - 5} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                  ζ = 0 mV (Điểm Đẳng Điện IEP)
                </text>

                {/* +30 mV and -30 mV Stability Threshold Lines */}
                <line x1={padLeft} y1={getZetaY(30)} x2={padLeft + plotWidth} y2={getZetaY(30)} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                <line x1={padLeft} y1={getZetaY(-30)} x2={padLeft + plotWidth} y2={getZetaY(-30)} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />

                {/* Zeta Titration Curve */}
                <path d={zetaPath} fill="none" stroke="#10b981" strokeWidth="2.8" filter="drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))" />

                {/* Current pH Cursor Marker */}
                <g transform={`translate(${getZetaX(samplePh)}, ${getZetaY(measuredZetaPotentialMv)})`}>
                  <circle r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
                  <line x1="0" y1="0" x2="0" y2={padTop + plotHeight - getZetaY(measuredZetaPotentialMv)} stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 2" />
                </g>

                {/* X-Axis (pH) */}
                <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((pHVal) => {
                  const x = getZetaX(pHVal);
                  return (
                    <g key={pHVal}>
                      <line x1={x} y1={padTop + plotHeight} x2={x} y2={padTop + plotHeight + 6} stroke="#94a3b8" />
                      <text x={x} y={padTop + plotHeight + 18} fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        {pHVal}
                      </text>
                    </g>
                  );
                })}
                <text x={padLeft + plotWidth / 2} y={padTop + plotHeight + 40} fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
                  pH Dung Dịch (Acid ← | → Base)
                </text>

                {/* Y-Axis */}
                <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {[-60, -40, -20, 0, 20, 40, 60].map((zVal) => {
                  const y = getZetaY(zVal);
                  return (
                    <g key={zVal}>
                      <line x1={padLeft - 5} y1={y} x2={padLeft} y2={y} stroke="#94a3b8" />
                      <text x={padLeft - 8} y={y + 4} fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="end">
                        {zVal}
                      </text>
                    </g>
                  );
                })}
                <text
                  x={-(padTop + plotHeight / 2)}
                  y={padLeft - 45}
                  fill="#10b981"
                  fontSize="11"
                  fontWeight="bold"
                  transform="rotate(-90)"
                  textAnchor="middle"
                >
                  Điện Thế Zeta ζ (mV)
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-emerald-400 rounded" />
                <span className="font-bold text-emerald-300">Đường Chuẩn Độ Điện Thế Zeta</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/30 border border-emerald-400" />
                <span className="text-ivory-muted">Vùng Keo Ổn Định (|ζ| ≥ 30 mV)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-400" />
                <span className="text-ivory-muted">Vùng Keo Tụ Không Ổn Định (|ζ| &lt; 15 mV)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Tab Navigation for Deep Analysis */}
      <div className="flex border-b border-emerald-500/20 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('rayleigh_d6_distribution')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'rayleigh_d6_distribution'
              ? 'border-amber-400 text-amber-300 bg-amber-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Quy Luật Rayleigh Lũy Thừa 6 (I ~ d⁶) & PDI
        </button>

        <button
          onClick={() => setActiveTab('stokes_einstein_brownian')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'stokes_einstein_brownian'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Chuyển Động Brown & Hệ Thức Stokes-Einstein
        </button>

        <button
          onClick={() => setActiveTab('zeta_potential_edl')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'zeta_potential_edl'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Lớp Kép Điện Học (EDL) & Điện Thế Zeta
        </button>

        <button
          onClick={() => setActiveTab('nobel_curriculum_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'nobel_curriculum_gdpt'
              ? 'border-purple-400 text-purple-300 bg-purple-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Nobel Vật Lý 1926 & Tích Hợp GDPT 2018
        </button>
      </div>

      {/* 5. Tab Content Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'rayleigh_d6_distribution' && (
            <div className="bg-navy-dark/80 border border-amber-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-amber-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                Tại Sao 1% Hạt Lớn 100 nm Lại &quot;Nuốt Chửng&quot; 99% Hạt Nhỏ 10 nm?
              </h4>
              <div className="p-3.5 bg-navy-light/40 border border-amber-500/20 rounded-xl space-y-2 text-[11px] leading-relaxed">
                <div className="p-2 bg-navy-dark/80 rounded border border-amber-500/30 font-mono text-center text-amber-200">
                  Cường độ tán xạ: I_Rayleigh ∝ d⁶ / λ⁴
                </div>
                <p className="text-ivory-muted">
                  Vì cường độ tán xạ ánh sáng tỉ lệ với <strong className="text-white">lũy thừa 6 của đường kính (d⁶)</strong>, một hạt kết tụ kích thước 100 nm sẽ phát tán lượng photon gấp <strong className="text-amber-300">(100/10)⁶ = 1,000,000 lần (1 triệu lần)</strong> so với một hạt đơn phân tử 10 nm! Do đó, phổ cường độ (Intensity Distribution) luôn lệch về phía hạt lớn, đòi hỏi thuật toán chuyển đổi sang phân bố Thể tích (Volume ~ d³) và Số lượng (Number ~ d⁰) để phản ánh trung thực số hạt thực tế trong dung dịch.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'stokes_einstein_brownian' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-cyan-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                Chuyển Động Nhiệt Brown & Hệ Thức Stokes-Einstein
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-navy-light/40 rounded-xl border border-cyan-500/20 space-y-1.5">
                  <span className="font-bold text-cyan-300 block">Phương Trình Stokes-Einstein:</span>
                  <div className="p-2 bg-navy-dark/80 rounded border border-cyan-500/30 font-mono text-center text-cyan-200">
                    d_h = (k_B · T) / (3 · π · η · D)
                  </div>
                  <p className="text-ivory-muted">
                    Hạt càng nhỏ, chuyển động nhiệt Brown càng hỗn loạn và nhanh, hệ số khuếch tán D càng lớn, hàm tự tương quan phân rã càng dốc.
                  </p>
                </div>
                <div className="p-3 bg-navy-light/40 rounded-xl border border-purple-500/20 space-y-1.5">
                  <span className="font-bold text-purple-300 block">Đường Kính Thủy Động (Hydrodynamic):</span>
                  <div className="p-2 bg-navy-dark/80 rounded border border-purple-500/30 font-mono text-center text-purple-200">
                    d_h = Lõi vật lý + Vỏ hydrate hóa + Lớp ion đối
                  </div>
                  <p className="text-ivory-muted">
                    DLS đo kích thước của hạt kèm theo toàn bộ lớp vỏ dung môi chuyển động cùng hạt, do đó d_h luôn lớn hơn kích thước lõi khô đo bằng TEM.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'zeta_potential_edl' && (
            <div className="bg-navy-dark/80 border border-emerald-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-emerald-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Cấu Trúc Lớp Kép Điện Học (EDL) & Tiêu Chuẩn Ổn Định ASTM/ISO
              </h4>
              <div className="p-3.5 bg-navy-light/40 border border-emerald-500/20 rounded-xl space-y-2 text-[11px] leading-relaxed">
                <div className="p-2 bg-navy-dark/80 rounded border border-emerald-500/30 font-mono text-center text-emerald-200">
                  Phương trình Smoluchowski: ζ = (μ_e · η) / (ε_r · ε_0)
                </div>
                <p className="text-ivory-muted">
                  Thế Zeta là điện thế tại <strong className="text-white">mặt trượt thủy động (Slipping plane)</strong> giữa lớp ion liên kết chặt (Stern layer) và khối dung môi khuếch tán. Theo lý thuyết DLVO:
                </p>
                <ul className="list-disc list-inside space-y-1 text-ivory-muted">
                  <li><strong className="text-emerald-300">|ζ| ≥ 30 mV:</strong> Lực đẩy tĩnh điện cực mạnh, hệ keo bền vững hàng năm không bị lắng tụ.</li>
                  <li><strong className="text-amber-300">15 mV &lt; |ζ| &lt; 30 mV:</strong> Độ ổn định vừa phải, có thể xuất hiện lắng đọng chậm.</li>
                  <li><strong className="text-rose-400">|ζ| &lt; 15 mV:</strong> Lực hút Van der Waals thắng thế, các hạt va chạm dính chặt vào nhau và keo tụ tức thì.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'nobel_curriculum_gdpt' && (
            <div className="bg-navy-dark/80 border border-purple-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-purple-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                Vinh Danh Nobel Vật Lý 1926 & Tích Hợp GDPT 2018
              </h4>
              <div className="p-3 bg-navy-light/40 border border-purple-500/30 rounded-xl space-y-1 text-[11px]">
                <div className="font-bold text-purple-300">Nobel Vật Lý 1926 - Jean Baptiste Perrin (Sorbonne, Pháp)</div>
                <p className="text-ivory-muted leading-relaxed">
                  Được trao giải nhờ các thí nghiệm chuẩn mực về chuyển động Brown và cân bằng lắng tụ của các hạt keo, chứng minh dứt khoát sự tồn tại thực tế của nguyên tử và phân tử, đồng thời tính toán chính xác hằng số Avogadro N_A.
                </p>
              </div>
              <div className="p-3 bg-navy-light/40 border border-cyan-500/30 rounded-xl space-y-1 text-[11px]">
                <div className="font-bold text-cyan-300">Tích Hợp Trực Tiếp Chương Trình GDPT 2018:</div>
                <ul className="list-disc list-inside space-y-1 text-ivory-muted">
                  <li><strong className="text-white">Hóa học 10:</strong> Khái niệm hệ keo, kích thước hạt nano và tính chất quang học Tyndall.</li>
                  <li><strong className="text-white">Hóa học 11:</strong> Độ pH, cân bằng ion và điện tích bề mặt hạt keo.</li>
                  <li><strong className="text-white">Hóa học 12:</strong> Hiện tượng đông tụ protein (albumin trứng), điểm đẳng điện pI và cấu trúc lipid màng tế bào.</li>
                  <li><strong className="text-white">Vật lý 11:</strong> Tán xạ ánh sáng trong môi trường vẩn đục, quang phổ và định luật khúc xạ.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pedagogical Report */}
        <div className="space-y-4">
          <div className="bg-navy-dark/90 border border-emerald-500/30 rounded-xl p-4 space-y-3 text-xs">
            <h4 className="font-bold text-emerald-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              Báo Cáo Phân Tích Thực Nghiệm DLS / Zeta
            </h4>
            <div className="p-3 bg-obsidian/70 rounded-lg border border-white/5 font-mono text-[11px] leading-relaxed text-emerald-100/90 max-h-80 overflow-y-auto">
              {simResult.pedagogicalAnalysisVI}
            </div>
          </div>

          <div className="bg-navy-dark/90 border border-amber-500/30 rounded-xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Quy Chuẩn PDI (Polydispersity Index)
            </h4>
            <p className="text-[11px] text-ivory-muted leading-relaxed">
              Theo tiêu chuẩn ISO 22412, chỉ số PDI phản ánh độ đồng đều kích thước: <strong className="text-white">PDI &lt; 0.05</strong> là đơn phân tán hoàn hảo (monodisperse); <strong className="text-white">0.05 - 0.2</strong> là phân bố hẹp lý tưởng cho hạt nano dược phẩm và vaccine mRNA; còn <strong className="text-white">PDI &gt; 0.4</strong> cảnh báo hiện tượng đa phân tán và tạo cụm kết tụ nguy hiểm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
