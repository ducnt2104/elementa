// src/components/visualizations/SurfacePlasmonVisualizer.tsx
// Milestone 55: Surface Plasmon Resonance (SPR), Kretschmann Configuration & Biomolecular Binding Kinetics Visualizer
// Standards: Otto Scherzer, Erich Kretschmann & Heinz Raether (1968 - Kretschmann Prism Coupling) & Biacore / GE Healthcare Standards
// Curriculum: Vietnam GDPT 2018 (Vật lý 11: Phản xạ toàn phần TIR; Hóa học 10: Tốc độ phản ứng & Hằng số tốc độ; Hóa học 12: Đại phân tử sinh học & Thuốc trúng đích)

import React, { useState, useMemo } from 'react';
import {
  SPR_INTERACTIONS_CATALOG,
  SprInteractionPair,
  simulateSprKinetics,
  calculateCriticalTirAngleDeg
} from '../../domain/surfacePlasmonEngine';
import { sound } from '../../audio/soundEngine';
import {
  Waves,
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
  Clock,
  Thermometer
} from 'lucide-react';

export interface SurfacePlasmonVisualizerProps {
  initialInteractionId?: string;
}

export const SurfacePlasmonVisualizer: React.FC<SurfacePlasmonVisualizerProps> = ({
  initialInteractionId
}) => {
  const [selectedInteractionId, setSelectedInteractionId] = useState<string>(
    initialInteractionId || 'antibody_sars_cov2_spike'
  );
  const [analyteConcentrationNm, setAnalyteConcentrationNm] = useState<number>(20);
  const [temperatureCelsius, setTemperatureCelsius] = useState<number>(25.0);
  const [activeTab, setActiveTab] = useState<'kretschmann_optics' | 'sensorgram_kinetics' | 'biomedical_drug_discovery' | 'nobel_curriculum_gdpt'>('sensorgram_kinetics');
  const [displayMode, setDisplayMode] = useState<'sensorgram' | 'reflectivity_dip'>('sensorgram');

  const simResult = useMemo(() => {
    return simulateSprKinetics(
      selectedInteractionId,
      analyteConcentrationNm,
      temperatureCelsius
    );
  }, [selectedInteractionId, analyteConcentrationNm, temperatureCelsius]);

  const {
    interaction,
    criticalTirAngleDeg,
    resonanceAngleBaselineDeg,
    resonanceAngleBoundDeg,
    resonanceAngleShiftMillidegrees,
    equilibriumKdNanomolar,
    reflectivityCurveBaseline,
    reflectivityCurveBound,
    sensorgram
  } = simResult;

  const handleInteractionChange = (id: string) => {
    setSelectedInteractionId(id);
    const item = SPR_INTERACTIONS_CATALOG[id];
    if (item) {
      setAnalyteConcentrationNm(item.recommendedConcentrationNanomolar);
    }
    sound.playUiClick();
    sound.playSprSensorgramBindingChime();
  };

  const handleConcentrationChange = (val: number) => {
    setAnalyteConcentrationNm(val);
    sound.playUiClick();
  };

  const handleModeSwitch = (mode: 'sensorgram' | 'reflectivity_dip') => {
    setDisplayMode(mode);
    sound.playUiClick();
    if (mode === 'reflectivity_dip') {
      sound.playSprResonanceDipSweep();
    } else {
      sound.playSprSensorgramBindingChime();
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

  // Sensorgram Scaling
  const maxTime = 320;
  const maxRu = Math.max(100, interaction.rMaxResponseUnits * 1.15);

  const getSensorgramX = (t: number) => padLeft + (t / maxTime) * plotWidth;
  const getSensorgramY = (ru: number) => padTop + plotHeight - (ru / maxRu) * plotHeight;

  const sensorgramPath = useMemo(() => {
    return sensorgram
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getSensorgramX(pt.timeSeconds).toFixed(1)} ${getSensorgramY(pt.responseUnits).toFixed(1)}`)
      .join(' ');
  }, [sensorgram, maxRu]);

  // Reflectivity Dip Scaling
  const minAngle = criticalTirAngleDeg - 2.0;
  const maxAngle = resonanceAngleBoundDeg + 3.5;

  const getReflectX = (ang: number) => padLeft + ((ang - minAngle) / (maxAngle - minAngle)) * plotWidth;
  const getReflectY = (r: number) => padTop + plotHeight - r * plotHeight;

  const baselineReflectPath = useMemo(() => {
    return reflectivityCurveBaseline
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getReflectX(pt.incidentAngleDeg).toFixed(1)} ${getReflectY(pt.reflectivityFraction).toFixed(1)}`)
      .join(' ');
  }, [reflectivityCurveBaseline, minAngle, maxAngle]);

  const boundReflectPath = useMemo(() => {
    return reflectivityCurveBound
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getReflectX(pt.incidentAngleDeg).toFixed(1)} ${getReflectY(pt.reflectivityFraction).toFixed(1)}`)
      .join(' ');
  }, [reflectivityCurveBound, minAngle, maxAngle]);

  return (
    <div className="bg-navy-light/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6 text-ivory">
      {/* 1. Header & Nobel Citations */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
              Milestone 55 • Surface Plasmon Resonance (SPR)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Kretschmann Configuration
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-ivory tracking-wide flex items-center gap-2 mt-1">
            <Waves className="w-6 h-6 text-cyan-400" />
            Cộng Hưởng Plasmon Bề Mặt (SPR) & Động Học Phân Tử Sinh Học (Kinetics)
          </h2>
          <p className="text-xs text-ivory-muted mt-0.5">
            Cấu hình lăng kính Kretschmann (1968) • Đo hằng số ái lực K_D (pM/nM) thời gian thực không cần đánh dấu huỳnh quang
          </p>
        </div>

        {/* Quick Instrument Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-right">
          <div className="bg-navy-dark/70 border border-cyan-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Góc Giới Hạn TIR (θ_c)</span>
            <span className="text-xs font-black text-cyan-300">{criticalTirAngleDeg}°</span>
          </div>
          <div className="bg-navy-dark/70 border border-amber-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Góc SPR Ban Đầu</span>
            <span className="text-xs font-black text-amber-300">{resonanceAngleBaselineDeg}°</span>
          </div>
          <div className="bg-navy-dark/70 border border-emerald-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Độ Dịch Góc (Δθ)</span>
            <span className="text-xs font-black text-emerald-300">+{resonanceAngleShiftMillidegrees} mDeg</span>
          </div>
          <div className="bg-navy-dark/70 border border-purple-500/20 rounded-lg p-2 text-center">
            <span className="text-[10px] text-ivory-muted block uppercase font-mono">Hằng Số Ái Lực K_D</span>
            <span className="text-xs font-black text-purple-300">
              {equilibriumKdNanomolar < 0.001
                ? `${(equilibriumKdNanomolar * 1000).toFixed(1)} pM`
                : `${equilibriumKdNanomolar} nM`}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-navy-dark/60 border border-white/5 rounded-xl p-4">
        {/* Interaction Pair Selection */}
        <div>
          <label className="text-xs font-bold text-cyan-300 block mb-1.5 flex items-center gap-1.5">
            <Atom className="w-3.5 h-3.5" />
            Cặp Tương Tác Phân Tử Sinh Học:
          </label>
          <div className="space-y-1.5">
            {Object.values(SPR_INTERACTIONS_CATALOG).map((pair) => (
              <button
                key={pair.id}
                onClick={() => handleInteractionChange(pair.id)}
                className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-all border ${
                  selectedInteractionId === pair.id
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-md'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                <div className="font-bold truncate">{pair.name.split('(')[0]}</div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  MW = {(pair.molecularWeightAnalyteDa / 1000).toFixed(0)} kDa • K_D = {pair.equilibriumKdMolar < 1e-9 ? '< 1 nM' : `${(pair.equilibriumKdMolar * 1e9).toFixed(1)} nM`}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Analyte Concentration Slider */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                Nồng Độ Chất Phân Tích (C_analyte):
              </label>
              <span className="text-xs font-mono font-bold text-amber-200">
                {analyteConcentrationNm} nM
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={interaction.recommendedConcentrationNanomolar * 3}
              step={1}
              value={analyteConcentrationNm}
              onChange={(e) => handleConcentrationChange(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-ivory-muted font-mono mt-0.5">
              <span>1 nM</span>
              <span>Khuyên dùng: {interaction.recommendedConcentrationNanomolar} nM</span>
              <span>{interaction.recommendedConcentrationNanomolar * 3} nM</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5" />
                Nhiệt Độ Thử Nghiệm:
              </label>
              <span className="text-xs font-mono font-bold text-emerald-200">
                {temperatureCelsius.toFixed(1)} °C
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={37}
              step={0.5}
              value={temperatureCelsius}
              onChange={(e) => setTemperatureCelsius(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-navy-light rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-ivory-muted font-mono mt-0.5">
              <span>15 °C (Phòng lạnh)</span>
              <span>25 °C (Chuẩn)</span>
              <span>37 °C (Thân nhiệt người)</span>
            </div>
          </div>
        </div>

        {/* Visualizer Mode Switch & Kinetic Rates Box */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-purple-300 block mb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Chế Độ Hiển Thị Đồ Thị (View):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleModeSwitch('sensorgram')}
                className={`p-2 rounded-lg text-xs font-bold border transition-all text-center ${
                  displayMode === 'sensorgram'
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                Đồ Thị Sensorgram R(t)
              </button>
              <button
                onClick={() => handleModeSwitch('reflectivity_dip')}
                className={`p-2 rounded-lg text-xs font-bold border transition-all text-center ${
                  displayMode === 'reflectivity_dip'
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow'
                    : 'bg-navy-light/40 border-white/5 text-ivory-muted hover:text-ivory'
                }`}
              >
                Hõm Phản Xạ SPR R(θ)
              </button>
            </div>
          </div>

          <div className="p-2.5 bg-navy-light/40 rounded-xl border border-white/5 space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-ivory-muted">k_on (Gắn kết):</span>
              <span className="text-cyan-300 font-bold">{interaction.associationRateKon.toExponential(2)} M⁻¹s⁻¹</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ivory-muted">k_off (Phân ly):</span>
              <span className="text-rose-300 font-bold">{interaction.dissociationRateKoff.toExponential(2)} s⁻¹</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ivory-muted">Tín hiệu cực đại R_max:</span>
              <span className="text-amber-300 font-bold">{interaction.rMaxResponseUnits} RU</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Graphical Display (Sensorgram vs Reflectivity Dip) */}
      <div className="bg-obsidian/90 border border-cyan-500/30 rounded-2xl p-4 shadow-inner relative overflow-hidden">
        {displayMode === 'sensorgram' ? (
          <div>
            {/* Sensorgram Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-bold text-cyan-200">Đồ Thị Sensorgram Động Học Thời Gian Thực (Langmuir 1:1)</span>
                <span className="text-[11px] text-ivory-muted font-mono">({interaction.nameVI})</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-cyan-300">Giai đoạn Gắn: 30s - 150s</span>
                <span className="text-rose-300">Giai đoạn Phân ly: 150s - 300s</span>
              </div>
            </div>

            {/* Sensorgram SVG Plot */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[650px] select-none">
                {/* Background Phase Zones */}
                {/* 1. Baseline Zone (0 - 30s) */}
                <rect
                  x={getSensorgramX(0)}
                  y={padTop}
                  width={getSensorgramX(30) - getSensorgramX(0)}
                  height={plotHeight}
                  fill="#94a3b8"
                  fillOpacity="0.06"
                />
                <text x={getSensorgramX(15)} y={padTop + 20} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Đệm Chuẩn (Buffer)
                </text>

                {/* 2. Association Zone (30 - 150s) */}
                <rect
                  x={getSensorgramX(30)}
                  y={padTop}
                  width={getSensorgramX(150) - getSensorgramX(30)}
                  height={plotHeight}
                  fill="#38bdf8"
                  fillOpacity="0.08"
                />
                <text x={getSensorgramX(90)} y={padTop + 20} fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Bơm Kháng Thể (Association Phase, C = {analyteConcentrationNm} nM)
                </text>

                {/* 3. Dissociation Zone (150 - 300s) */}
                <rect
                  x={getSensorgramX(150)}
                  y={padTop}
                  width={getSensorgramX(300) - getSensorgramX(150)}
                  height={plotHeight}
                  fill="#f43f5e"
                  fillOpacity="0.08"
                />
                <text x={getSensorgramX(225)} y={padTop + 20} fill="#f43f5e" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  Rửa Đệm Phân Ly (Dissociation Phase, C = 0)
                </text>

                {/* 4. Regeneration Zone (300 - 320s) */}
                <rect
                  x={getSensorgramX(300)}
                  y={padTop}
                  width={getSensorgramX(320) - getSensorgramX(300)}
                  height={plotHeight}
                  fill="#fbbf24"
                  fillOpacity="0.12"
                />
                <text x={getSensorgramX(310)} y={padTop + 20} fill="#fbbf24" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  Tái Sinh
                </text>

                {/* Grid Lines */}
                {[0.25, 0.5, 0.75, 1.0].map((frac) => {
                  const y = padTop + plotHeight * (1 - frac);
                  return (
                    <line key={frac} x1={padLeft} y1={y} x2={padLeft + plotWidth} y2={y} stroke="#ffffff" strokeOpacity="0.07" strokeDasharray="3 3" />
                  );
                })}

                {/* Sensorgram Response Curve */}
                <path
                  d={sensorgramPath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 4px rgba(56, 189, 248, 0.5))"
                />

                {/* X-Axis */}
                <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((sec) => {
                  const x = getSensorgramX(sec);
                  return (
                    <g key={sec}>
                      <line x1={x} y1={padTop + plotHeight} x2={x} y2={padTop + plotHeight + 6} stroke="#94a3b8" />
                      <text x={x} y={padTop + plotHeight + 18} fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        {sec}s
                      </text>
                    </g>
                  );
                })}
                <text x={padLeft + plotWidth / 2} y={padTop + plotHeight + 40} fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Thời Gian Tiếp Xúc Dòng Chảy t (Giây) →
                </text>

                {/* Y-Axis */}
                <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                  const val = Math.round(maxRu * frac);
                  const y = getSensorgramY(val);
                  return (
                    <g key={frac}>
                      <line x1={padLeft - 5} y1={y} x2={padLeft} y2={y} stroke="#94a3b8" />
                      <text x={padLeft - 8} y={y + 4} fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="end">
                        {val}
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
                  Đơn Vị Tín Hiệu Đáp Ứng R (Response Units - RU)
                </text>
              </svg>
            </div>
          </div>
        ) : (
          <div>
            {/* Reflectivity Dip Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-bold text-amber-200">Độ Phản Xạ Quang Học Kretschmann R(θ) & Hõm Cộng Hưởng Plasmon</span>
                <span className="text-[11px] text-ivory-muted font-mono">(Lăng kính BK7 + Màng vàng 50 nm)</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-amber-300">θ_SPR Ban đầu: {resonanceAngleBaselineDeg}°</span>
                <span className="text-cyan-300">θ_SPR Sau gắn: {resonanceAngleBoundDeg}°</span>
              </div>
            </div>

            {/* Reflectivity SVG Plot */}
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[650px] select-none">
                {/* Critical Angle Line */}
                <line
                  x1={getReflectX(criticalTirAngleDeg)}
                  y1={padTop}
                  x2={getReflectX(criticalTirAngleDeg)}
                  y2={padTop + plotHeight}
                  stroke="#ef4444"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <text x={getReflectX(criticalTirAngleDeg) + 4} y={padTop + 14} fill="#ef4444" fontSize="9" fontFamily="monospace">
                  θ_c = {criticalTirAngleDeg}° (Ngưỡng TIR)
                </text>

                {/* Baseline Dip (Gold Curve) */}
                <path
                  d={baselineReflectPath}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 0 3px rgba(251, 191, 36, 0.4))"
                />

                {/* Bound State Dip (Cyan Curve) */}
                <path
                  d={boundReflectPath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="5 2"
                  filter="drop-shadow(0 0 3px rgba(56, 189, 248, 0.4))"
                />

                {/* Shift Arrow between Dips */}
                <g>
                  <line
                    x1={getReflectX(resonanceAngleBaselineDeg)}
                    y1={getReflectY(0.1)}
                    x2={getReflectX(resonanceAngleBoundDeg)}
                    y2={getReflectY(0.1)}
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <text
                    x={(getReflectX(resonanceAngleBaselineDeg) + getReflectX(resonanceAngleBoundDeg)) / 2}
                    y={getReflectY(0.1) - 6}
                    fill="#10b981"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Δθ = +{resonanceAngleShiftMillidegrees} mDeg
                  </text>
                </g>

                {/* X-Axis */}
                <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {Array.from({ length: 8 }).map((_, idx) => {
                  const ang = minAngle + idx * ((maxAngle - minAngle) / 7);
                  const x = getReflectX(ang);
                  return (
                    <g key={idx}>
                      <line x1={x} y1={padTop + plotHeight} x2={x} y2={padTop + plotHeight + 6} stroke="#94a3b8" />
                      <text x={x} y={padTop + plotHeight + 18} fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                        {ang.toFixed(1)}°
                      </text>
                    </g>
                  );
                })}
                <text x={padLeft + plotWidth / 2} y={padTop + plotHeight + 40} fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Góc Chiếu Ánh Sáng Tới θ (Độ °) →
                </text>

                {/* Y-Axis */}
                <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="#94a3b8" strokeWidth="1.5" />
                {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
                  const y = getReflectY(frac);
                  return (
                    <g key={frac}>
                      <line x1={padLeft - 5} y1={y} x2={padLeft} y2={y} stroke="#94a3b8" />
                      <text x={padLeft - 8} y={y + 4} fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="end">
                        {(frac * 100).toFixed(0)}%
                      </text>
                    </g>
                  );
                })}
                <text
                  x={-(padTop + plotHeight / 2)}
                  y={padLeft - 45}
                  fill="#fbbf24"
                  fontSize="11"
                  fontWeight="bold"
                  transform="rotate(-90)"
                  textAnchor="middle"
                >
                  Hệ Số Phản Xạ Ánh Sáng R (Reflectivity %)
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 pt-2 border-t border-white/10 text-xs">
          {displayMode === 'sensorgram' ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-cyan-400 rounded" />
                <span className="font-bold text-cyan-300">Đường Cong Đáp Ứng Thực Nghiệm (RU)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-500/40 border border-blue-400" />
                <span className="text-ivory-muted">Gắn kết Association</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-rose-500/40 border border-rose-400" />
                <span className="text-ivory-muted">Phân ly Dissociation</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-amber-400 rounded" />
                <span className="font-bold text-amber-300">Phổ Trước Khi Gắn (Dung Dịch Đệm Chuẩn)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-cyan-400 rounded border-dashed" />
                <span className="font-bold text-cyan-300">Phổ Sau Khi Kháng Thể Bám Vào Chip Vàng</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. Tab Navigation for Deep Analysis */}
      <div className="flex border-b border-cyan-500/20 overflow-x-auto scrollbar-none gap-2">
        <button
          onClick={() => setActiveTab('sensorgram_kinetics')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'sensorgram_kinetics'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Động Học Langmuir 1:1 (k_on, k_off & K_D)
        </button>

        <button
          onClick={() => setActiveTab('kretschmann_optics')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'kretschmann_optics'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Cấu Hình Lăng Kính Kretschmann & Sóng Tắt Dần
        </button>

        <button
          onClick={() => setActiveTab('biomedical_drug_discovery')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'biomedical_drug_discovery'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Ứng Dụng Sàng Lọc Thuốc & Vaccine Y Sinh
        </button>

        <button
          onClick={() => setActiveTab('nobel_curriculum_gdpt')}
          className={`px-3 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'nobel_curriculum_gdpt'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
              : 'border-transparent text-ivory-muted hover:text-ivory'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Nobel & Tích Hợp GDPT 2018
        </button>
      </div>

      {/* 5. Tab Content Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'sensorgram_kinetics' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-cyan-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Mô Hình Tương Tác 1:1 Langmuir & Giải Nghĩa Hằng Số Ái Lực
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-navy-light/40 rounded-xl border border-cyan-500/20 space-y-1.5">
                  <span className="font-bold text-cyan-300 block">Phương Trình Vi Phân Gắn Kết:</span>
                  <div className="p-2 bg-navy-dark/80 rounded border border-cyan-500/30 font-mono text-center text-cyan-200">
                    dR/dt = k_on · C · (R_max - R) - k_off · R
                  </div>
                  <p className="text-ivory-muted">
                    Tốc độ phản ứng gắn tỉ lệ thuận với nồng độ tự do C và số thụ thể còn trống (R_max - R).
                  </p>
                </div>
                <div className="p-3 bg-navy-light/40 rounded-xl border border-purple-500/20 space-y-1.5">
                  <span className="font-bold text-purple-300 block">Hằng Số Phân Ly Cân Bằng K_D:</span>
                  <div className="p-2 bg-navy-dark/80 rounded border border-purple-500/30 font-mono text-center text-purple-200">
                    K_D = k_off / k_on = {equilibriumKdNanomolar} nM
                  </div>
                  <p className="text-ivory-muted">
                    Giá trị K_D càng nhỏ, ái lực nhiệt động càng mạnh. Kháng thể trung hòa đạt mức nanomolar/picomolar bám cực chặt vào gai virus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'kretschmann_optics' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-amber-300 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                Hiện Tượng Phản Xạ Toàn Phần TIR & Sóng Tắt Dần (Evanescent Wave)
              </h4>
              <div className="p-3.5 bg-navy-light/40 border border-amber-500/20 rounded-xl space-y-2 text-[11px] leading-relaxed">
                <div className="flex justify-between font-mono font-bold text-amber-200">
                  <span>Góc Tới Hạn: θ_c = arcsin(n_buffer / n_prism) = {criticalTirAngleDeg}°</span>
                  <span>Độ sâu thâm nhập d_p ≈ 200 nm</span>
                </div>
                <p className="text-ivory-muted">
                  Khi góc tới lớn hơn góc tới hạn θ_c, ánh sáng bị phản xạ toàn phần trở lại lăng kính nhưng sinh ra một trường điện từ dao động bề mặt gọi là <strong className="text-white">sóng tắt dần (Evanescent wave)</strong> suy giảm theo hàm mũ e^(-z/d_p). Khi xung lượng sóng này khớp với sóng plasmon trên màng vàng 50 nm, năng lượng photon bị hấp thụ triệt để tạo nên hõm cực tiểu trên đường cong phản xạ.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'biomedical_drug_discovery' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-emerald-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Ứng Dụng Trong Dược Học Trúng Đích & Công Nghệ Sinh Học
              </h4>
              <div className="p-3 bg-navy-light/40 rounded-xl border border-emerald-500/20 space-y-1 text-[11px]">
                <div className="font-bold text-emerald-300">{interaction.nameVI}</div>
                <p className="text-ivory-muted leading-relaxed">{interaction.descriptionVI}</p>
                <div className="pt-2 text-cyan-300 font-mono">
                  Ứng dụng lâm sàng: <span className="text-white font-sans">{interaction.biomedicalApplicationVI}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nobel_curriculum_gdpt' && (
            <div className="bg-navy-dark/80 border border-cyan-500/30 rounded-xl p-4 space-y-3 text-xs">
              <h4 className="font-bold text-cyan-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                Vinh Danh Các Nhà Khoa Học & Chương Trình GDPT 2018
              </h4>
              <div className="p-3 bg-navy-light/40 border border-cyan-500/30 rounded-xl space-y-1 text-[11px]">
                <div className="font-bold text-cyan-300">Otto Scherzer, Erich Kretschmann & Heinz Raether (1968)</div>
                <p className="text-ivory-muted leading-relaxed">
                  Thiết kế cấu hình ghép lăng kính Kretschmann kinh điển, mở đường cho sự phát triển của công nghệ Biacore SPR hiện đại ngày nay trong các viện nghiên cứu dược phẩm hàng đầu thế giới.
                </p>
              </div>
              <div className="p-3 bg-navy-light/40 border border-purple-500/30 rounded-xl space-y-1 text-[11px]">
                <div className="font-bold text-purple-300">Liên Kết Trực Tiếp GDPT 2018 (Vật Lý 11, Hóa Học 10 & 12):</div>
                <ul className="list-disc list-inside space-y-1 text-ivory-muted">
                  <li><strong className="text-white">Vật lý 11 (Quang hình học):</strong> Phản xạ toàn phần (TIR), góc giới hạn phản xạ toàn phần sin(i_gh) = n₂/n₁.</li>
                  <li><strong className="text-white">Hóa học 10 (Động học phản ứng):</strong> Định luật tác dụng khối lượng, hằng số tốc độ phản ứng k thuận và k nghịch.</li>
                  <li><strong className="text-white">Hóa học 12 (Protein & Kháng thể):</strong> Cấu trúc bậc bốn của kháng thể IgG, liên kết phối tử - thụ thể đặc hiệu trong liệu pháp trúng đích.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pedagogical Analysis & Report */}
        <div className="space-y-4">
          <div className="bg-navy-dark/90 border border-cyan-500/30 rounded-xl p-4 space-y-3 text-xs">
            <h4 className="font-bold text-cyan-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              Báo Cáo Phân Tích Thực Nghiệm SPR
            </h4>
            <div className="p-3 bg-obsidian/70 rounded-lg border border-white/5 font-mono text-[11px] leading-relaxed text-cyan-100/90 max-h-80 overflow-y-auto">
              {simResult.pedagogicalAnalysisVI}
            </div>
          </div>

          <div className="bg-navy-dark/90 border border-amber-500/30 rounded-xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Quy Đổi Đơn Vị RU Chuẩn Quốc Tế
            </h4>
            <p className="text-[11px] text-ivory-muted leading-relaxed">
              Theo quy ước quốc tế Biacore, <strong className="text-white">1 RU ≈ 1 pg/mm²</strong> khối lượng protein liên kết trên bề mặt chip vàng, tương ứng với sự gia tăng chiết suất <strong className="text-white">Δn ≈ 10⁻⁶ RIU</strong> và làm dịch chuyển góc cộng hưởng plasmon xấp xỉ <strong className="text-white">0.0001° (0.1 mDeg)</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
