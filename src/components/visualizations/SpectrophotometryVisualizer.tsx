// src/components/visualizations/SpectrophotometryVisualizer.tsx
// Interactive Spectrophotometry, Beer-Lambert Law & Analytical Instrumentation Visualizer
// Standard: IUPAC Gold Book & Vietnam GDPT 2018 (Hóa 10, 11 & 12)

import React, { useState, useMemo } from 'react';
import {
  Sun,
  Eye,
  Sliders,
  Activity,
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Volume2,
  Layers,
  Sparkles,
  Info,
  Scale
} from 'lucide-react';
import {
  SPECTRO_STANDARDS,
  COMPLEMENTARY_COLOR_TABLE,
  SpectroStandard,
  calculateAbsorbance,
  calculateTransmittance,
  calculateApparentAbsorbance,
  calculatePhotometricRelativeError,
  getComplementaryColor,
  computeCalibrationRegression,
  quantifyUnknownSample,
  generateStandardCalibrationPoints
} from '../../domain/spectrophotometryEngine';
import { sound } from '../../audio/soundEngine';

export interface SpectrophotometryVisualizerProps {
  initialStandardId?: string;
  className?: string;
}

export const SpectrophotometryVisualizer: React.FC<SpectrophotometryVisualizerProps> = ({
  initialStandardId = 'kmno4',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'BEER_LAMBERT' | 'CALIBRATION_CURVE' | 'COMPLEMENTARY_SPECTRUM' | 'DEVIATIONS_TCG'>('BEER_LAMBERT');

  // Tab 1 & Tab 2: Standard selection
  const [selectedStandardId, setSelectedStandardId] = useState<string>(initialStandardId);
  const currentStandard: SpectroStandard = useMemo(() => {
    return SPECTRO_STANDARDS[selectedStandardId] || SPECTRO_STANDARDS.kmno4;
  }, [selectedStandardId]);

  // Tab 1: Live Cuvette Spectrophotometer Controls
  const [pathLengthCm, setPathLengthCm] = useState<number>(1.0);
  const [concentrationFactor, setConcentrationFactor] = useState<number>(0.5); // 0.0 to 1.5 fraction of typical max
  const [strayLightPercent, setStrayLightPercent] = useState<number>(0.1); // 0% to 1%

  // Tab 3: Complementary Spectrum
  const [selectedWavelengthNm, setSelectedWavelengthNm] = useState<number>(currentStandard.lambdaMaxNm);

  // Tab 2: Unknown Sample Quantification
  const [unknownAbsorbance, setUnknownAbsorbance] = useState<number>(0.45);

  // Derived concentration for Tab 1
  const activeConcentrationM = useMemo(() => {
    const range = currentStandard.typicalConcRangeM;
    return range.min + concentrationFactor * (range.max - range.min);
  }, [currentStandard, concentrationFactor]);

  // Tab 1 Calculations
  const theoreticalAbsorbance = useMemo(() => {
    return calculateAbsorbance(currentStandard.molarAbsorptivity, pathLengthCm, activeConcentrationM);
  }, [currentStandard, pathLengthCm, activeConcentrationM]);

  const apparentAbsorbance = useMemo(() => {
    return calculateApparentAbsorbance(theoreticalAbsorbance, activeConcentrationM, strayLightPercent / 100);
  }, [theoreticalAbsorbance, activeConcentrationM, strayLightPercent]);

  const transmittanceData = useMemo(() => {
    return calculateTransmittance(apparentAbsorbance);
  }, [apparentAbsorbance]);

  const photometricErrorPct = useMemo(() => {
    return calculatePhotometricRelativeError(apparentAbsorbance);
  }, [apparentAbsorbance]);

  const isOptimalRange = apparentAbsorbance >= 0.2 && apparentAbsorbance <= 0.8;

  // Tab 2 Calibration Curve
  const calibrationPoints = useMemo(() => {
    return generateStandardCalibrationPoints(currentStandard, 6, 0.003);
  }, [currentStandard]);

  const regressionResult = useMemo(() => {
    return computeCalibrationRegression(calibrationPoints);
  }, [calibrationPoints]);

  const unknownQuantification = useMemo(() => {
    return quantifyUnknownSample(unknownAbsorbance, regressionResult);
  }, [unknownAbsorbance, regressionResult]);

  // Tab 3 Complementary Color Data
  const complementaryInfo = useMemo(() => {
    return getComplementaryColor(selectedWavelengthNm);
  }, [selectedWavelengthNm]);

  // Audio actions
  const handleShutterPulse = () => {
    sound.playSpectroLampShutter();
  };

  const handleDetectorBeep = () => {
    sound.playPhotodetectorBeep();
  };

  return (
    <div className={`flex flex-col bg-slate-900 border border-slate-750 rounded-xl overflow-hidden shadow-2xl text-slate-100 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-800/90 border-b border-slate-700/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              Quang Phổ Hấp Thụ & Định Luật Beer-Lambert
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                A = ε · l · c
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Mô hình trắc quang học phân tích, đường chuẩn OLS, sai số Twyman-Lothian & màu bổ sung
            </p>
          </div>
        </div>

        {/* Audio Quick Test */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShutterPulse}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-700 hover:bg-slate-650 text-slate-200 border border-slate-600 transition"
            title="Nghe tiếng cơ học cửa trập và đèn phát quang UV-Vis"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            Cửa trập Đèn
          </button>
          <button
            onClick={handleDetectorBeep}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-700 hover:bg-indigo-650 text-white border border-indigo-500/50 transition shadow"
            title="Đọc kết quả đầu dò quang điện (Photodetector readout beep)"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            Đo Trắc Quang
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-700/70 bg-slate-850 overflow-x-auto scrollbar-none">
        <button
          onClick={() => { setActiveTab('BEER_LAMBERT'); handleShutterPulse(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'BEER_LAMBERT'
              ? 'border-indigo-500 text-indigo-300 bg-indigo-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Sun className="w-4 h-4" />
          1. Máy Đo Quang & Cuvette
        </button>

        <button
          onClick={() => { setActiveTab('CALIBRATION_CURVE'); handleDetectorBeep(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'CALIBRATION_CURVE'
              ? 'border-indigo-500 text-indigo-300 bg-indigo-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          2. Đường Chuẩn & Định Lượng OLS
        </button>

        <button
          onClick={() => { setActiveTab('COMPLEMENTARY_SPECTRUM'); handleShutterPulse(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'COMPLEMENTARY_SPECTRUM'
              ? 'border-indigo-500 text-indigo-300 bg-indigo-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Eye className="w-4 h-4" />
          3. Phổ Khả Kiến & Màu Bổ Sung
        </button>

        <button
          onClick={() => { setActiveTab('DEVIATIONS_TCG'); handleDetectorBeep(); }}
          className={`flex items-center gap-2 px-4 py-3 text-xs md:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'DEVIATIONS_TCG'
              ? 'border-indigo-500 text-indigo-300 bg-indigo-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          4. Giới Hạn Thực Tế & Chiến Thuật
        </button>
      </div>

      {/* BODY CONTENT */}
      <div className="p-4 md:p-6 space-y-6">
        {/* COMMON STANDARD PICKER */}
        <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chất Chuẩn Mẫu:</span>
            <select
              value={selectedStandardId}
              onChange={(e) => {
                setSelectedStandardId(e.target.value);
                setSelectedWavelengthNm(SPECTRO_STANDARDS[e.target.value].lambdaMaxNm);
                sound.playSpectroLampShutter();
              }}
              className="bg-slate-900 border border-slate-600 rounded-md px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {Object.values(SPECTRO_STANDARDS).map((std) => (
                <option key={std.id} value={std.id}>
                  {std.chemicalFormula} — {std.vietnameseName} ({std.curriculumGrade})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-slate-400" style={{ backgroundColor: currentStandard.solutionColorHex }} />
              <span className="text-slate-300 font-medium">Màu quan sát: {currentStandard.colorName}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-slate-400" style={{ backgroundColor: currentStandard.absorbedColorHex }} />
              <span className="text-slate-300 font-medium">Hấp thụ cực đại: λ = {currentStandard.lambdaMaxNm} nm ({currentStandard.absorbedColorName})</span>
            </span>
          </div>
        </div>

        {/* TAB 1: BEER-LAMBERT CUVETTE SIMULATOR */}
        {activeTab === 'BEER_LAMBERT' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-400" />
                    Tham Số Quang Phổ
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 border border-indigo-700/40">
                    ε = {currentStandard.molarAbsorptivity.toLocaleString()} L·mol⁻¹·cm⁻¹
                  </span>
                </h4>

                {/* Path Length Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Chiều dày cuvette (l):</span>
                    <span className="font-mono text-cyan-300 font-bold">{pathLengthCm.toFixed(1)} cm</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="5.0"
                    step="0.1"
                    value={pathLengthCm}
                    onChange={(e) => setPathLengthCm(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>0.2 cm (Micro)</span>
                    <span>1.0 cm (Chuẩn)</span>
                    <span>5.0 cm (Macro)</span>
                  </div>
                </div>

                {/* Concentration Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Nồng độ mẫu (c):</span>
                    <span className="font-mono text-amber-300 font-bold">{activeConcentrationM.toExponential(3)} M</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1.5"
                    step="0.01"
                    value={concentrationFactor}
                    onChange={(e) => setConcentrationFactor(parseFloat(e.target.value))}
                    className="w-full accent-amber-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{currentStandard.typicalConcRangeM.min.toExponential(1)} M (Loãng)</span>
                    <span>{currentStandard.typicalConcRangeM.max.toExponential(1)} M (Đậm)</span>
                  </div>
                </div>

                {/* Stray Light Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Ánh sáng lạc tán xạ (Stray light %):</span>
                    <span className="font-mono text-slate-400">{strayLightPercent.toFixed(2)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={strayLightPercent}
                    onChange={(e) => setStrayLightPercent(parseFloat(e.target.value))}
                    className="w-full accent-slate-400"
                  />
                </div>
              </div>

              {/* Physical Transition Card */}
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 text-xs space-y-2">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Bản Chất Chuyển Dịch Điện Tử:
                </div>
                <div className="text-slate-300 font-mono bg-slate-900/80 p-2 rounded border border-slate-750">
                  {currentStandard.electronicTransition}
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {currentStandard.description}
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic Optical Schematic & Reading Meters */}
            <div className="lg:col-span-7 space-y-4">
              {/* CUVETTE OPTICAL BEAM SCHEMATIC (SVG) */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                <div className="w-full flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                    <Sun className="w-3.5 h-3.5 text-amber-400" /> Nguồn sáng (I₀ = 100%)
                  </span>
                  <span className="text-xs font-mono text-indigo-400 font-bold">
                    Cuvette l = {pathLengthCm.toFixed(1)} cm
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                    Đầu dò quang (I = {transmittanceData.transmittancePct.toFixed(1)}%) <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                </div>

                <svg viewBox="0 0 540 180" className="w-full h-44 select-none">
                  <defs>
                    <linearGradient id="incidentBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor={currentStandard.absorbedColorHex} stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="cuvetteLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={currentStandard.solutionColorHex} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={currentStandard.solutionColorHex} stopOpacity={Math.min(0.95, 0.2 + apparentAbsorbance * 0.4)} />
                    </linearGradient>
                  </defs>

                  {/* Light Source Lamp Housing */}
                  <rect x="10" y="50" width="40" height="80" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <circle cx="30" cy="90" r="14" fill="#fbbf24" filter="drop-shadow(0 0 6px #f59e0b)" />
                  <text x="30" y="94" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#000">D₂/W</text>

                  {/* Incident Light Beam (I0) */}
                  <polygon
                    points="50,75 180,65 180,115 50,105"
                    fill="url(#incidentBeam)"
                    opacity="0.9"
                  />
                  <line x1="50" y1="90" x2="180" y2="90" stroke="#fef08a" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Optical Monochromator Slit */}
                  <rect x="120" y="30" width="8" height="50" fill="#334155" />
                  <rect x="120" y="100" width="8" height="50" fill="#334155" />
                  <text x="124" y="24" fontSize="8" fill="#94a3b8" textAnchor="middle">Khe λ</text>

                  {/* Cuvette Body (Width scales with pathLengthCm) */}
                  {/* Base width 40px at 1.0 cm -> range 20px to 120px */}
                  {(() => {
                    const cuvetteWidth = Math.max(25, Math.min(130, 20 + pathLengthCm * 24));
                    const cuvetteX = 260 - cuvetteWidth / 2;
                    return (
                      <g>
                        {/* Quartz Cuvette Outline */}
                        <rect
                          x={cuvetteX}
                          y="35"
                          width={cuvetteWidth}
                          height="110"
                          rx="4"
                          fill="url(#cuvetteLiquid)"
                          stroke="#94a3b8"
                          strokeWidth="2.5"
                        />
                        {/* Cuvette Glass Reflection Highlight */}
                        <line x1={cuvetteX + 3} y1="40" x2={cuvetteX + 3} y2="140" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
                        {/* Meniscus */}
                        <ellipse cx={260} cy="42" rx={cuvetteWidth / 2 - 2} ry="4" fill={currentStandard.solutionColorHex} opacity="0.4" />
                        {/* Dimension Arrow */}
                        <line x1={cuvetteX} y1="155" x2={cuvetteX + cuvetteWidth} y2="155" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x={260} y="168" fontSize="10" fill="#38bdf8" textAnchor="middle" fontWeight="bold">
                          {pathLengthCm.toFixed(1)} cm
                        </text>
                      </g>
                    );
                  })()}

                  {/* Transmitted Light Beam (I) */}
                  {(() => {
                    const cuvetteWidth = Math.max(25, Math.min(130, 20 + pathLengthCm * 24));
                    const beamStartX = 260 + cuvetteWidth / 2;
                    const transFraction = Math.max(0.02, transmittanceData.transmittance);
                    return (
                      <g>
                        <polygon
                          points={`${beamStartX},70 480,78 480,102 ${beamStartX},110`}
                          fill={currentStandard.absorbedColorHex}
                          opacity={transFraction * 0.85}
                        />
                        <line x1={beamStartX} y1="90" x2="480" y2="90" stroke="#ffffff" strokeWidth="1.5" opacity={transFraction} />
                      </g>
                    );
                  })()}

                  {/* Photodetector / Photodiode Array */}
                  <rect x="480" y="55" width="45" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="485" y="65" width="10" height="50" rx="2" fill="#0284c7" />
                  <circle cx="505" cy="90" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                  <text x="505" y="93" fontSize="8" fill="#38bdf8" textAnchor="middle" fontWeight="bold">DET</text>
                </svg>
              </div>

              {/* READOUT METERS & GAUGES */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {/* Meter 1: Absorbance A */}
                <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
                  <div className="text-[11px] text-slate-400 font-medium">Độ Hấp Thụ (A)</div>
                  <div className="text-xl font-bold font-mono text-cyan-400">
                    {apparentAbsorbance.toFixed(3)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Lý thuyết: {theoreticalAbsorbance.toFixed(3)}
                  </div>
                </div>

                {/* Meter 2: Transmittance %T */}
                <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
                  <div className="text-[11px] text-slate-400 font-medium">Độ Truyền Qua (%T)</div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {transmittanceData.transmittancePct.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    T = {transmittanceData.transmittance.toFixed(4)}
                  </div>
                </div>

                {/* Meter 3: Photometric Relative Error */}
                <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
                  <div className="text-[11px] text-slate-400 font-medium">Sai Số Tương Đối (%Δc/c)</div>
                  <div className={`text-xl font-bold font-mono ${photometricErrorPct <= 5 ? 'text-emerald-400' : photometricErrorPct <= 15 ? 'text-amber-400' : 'text-rose-400'}`}>
                    ±{photometricErrorPct.toFixed(1)}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Twyman-Lothian
                  </div>
                </div>

                {/* Meter 4: Optimal Range Assessment */}
                <div className="bg-slate-800/90 p-3 rounded-lg border border-slate-700">
                  <div className="text-[11px] text-slate-400 font-medium">Đánh Giá Phép Đo</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {isOptimalRange ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                    )}
                    <span className={`text-xs font-bold ${isOptimalRange ? 'text-emerald-300' : 'text-amber-300'}`}>
                      {isOptimalRange ? 'Tối Ưu (0.2-0.8)' : apparentAbsorbance < 0.2 ? 'Quá loãng (A<0.2)' : 'Quá đậm (A>0.8)'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {isOptimalRange ? 'Độ chính xác cao' : apparentAbsorbance < 0.2 ? 'Nhiễu nền cuvette' : 'Pha loãng mẫu'}
                  </div>
                </div>
              </div>

              {/* Twyman-Lothian Insight Banner */}
              <div className="bg-indigo-950/40 border border-indigo-800/40 rounded-lg p-3 text-xs text-indigo-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-white">Quy luật sai số quang học Twyman-Lothian:</span>
                  <p className="text-[11px] leading-relaxed text-indigo-300">
                    Sai số tương đối đo nồng độ đạt cực tiểu khi độ truyền qua <code className="text-cyan-300 font-mono">T = 1/e ≈ 36.8%</code> tương ứng độ hấp thụ <code className="text-amber-300 font-mono">A ≈ 0.434</code>.
                    Trong phân tích kiểm nghiệm tiêu chuẩn Việt Nam (TCVN), dung dịch mẫu luôn được pha loãng sao cho <code className="text-emerald-300 font-mono">0.20 ≤ A ≤ 0.80</code> để bảo đảm độ tin cậy $R^2 \ge 0.999$.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CALIBRATION CURVE & OLS REGRESSION */}
        {activeTab === 'CALIBRATION_CURVE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Regression Equation & Unknown Sample Quantifier */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Phương Trình Hồi Quy OLS
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 font-mono">
                    R² = {regressionResult.rSquared.toFixed(5)}
                  </span>
                </h4>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-750 font-mono text-center">
                  <div className="text-sm font-bold text-emerald-300">
                    A = {regressionResult.slope.toFixed(1)} · c {regressionResult.intercept >= 0 ? '+' : '-'} {Math.abs(regressionResult.intercept).toFixed(4)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex justify-center gap-4">
                    <span>Hệ số r: {regressionResult.pearsonR.toFixed(5)}</span>
                    <span>Độ lệch chuẩn Sy/x: {regressionResult.standardErrorOfEstimate.toExponential(2)}</span>
                  </div>
                </div>

                {/* Validation Limits (LOD & LOQ) */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-750">
                    <div className="text-slate-400 text-[10px]">Giới hạn phát hiện (LOD):</div>
                    <div className="font-mono text-amber-300 font-bold">{regressionResult.lodM.toExponential(2)} M</div>
                    <div className="text-[9px] text-slate-500">3.3 · Sy/x / m</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900/60 border border-slate-750">
                    <div className="text-slate-400 text-[10px]">Giới hạn định lượng (LOQ):</div>
                    <div className="font-mono text-cyan-300 font-bold">{regressionResult.loqM.toExponential(2)} M</div>
                    <div className="text-[9px] text-slate-500">10.0 · Sy/x / m</div>
                  </div>
                </div>
              </div>

              {/* UNKNOWN SAMPLE QUANTIFIER */}
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-cyan-400" />
                    Định Lượng Mẫu Cần Đo (Unknown)
                  </span>
                  <button
                    onClick={handleDetectorBeep}
                    className="text-xs px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-700/40 hover:bg-cyan-900/80 transition"
                  >
                    Bíp Đo Quang
                  </button>
                </h4>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Độ hấp thụ mẫu đo được (A_sample):</span>
                    <span className="font-mono text-cyan-300 font-bold">{unknownAbsorbance.toFixed(3)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="1.50"
                    step="0.01"
                    value={unknownAbsorbance}
                    onChange={(e) => setUnknownAbsorbance(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-750 space-y-1">
                  <div className="text-xs text-slate-400">Nồng độ tính toán từ đường chuẩn:</div>
                  <div className="text-lg font-mono font-bold text-cyan-300">
                    c = {unknownQuantification.concentrationM.toExponential(3)} M
                  </div>
                  {unknownQuantification.warning && (
                    <div className="text-[11px] text-amber-400 flex items-start gap-1.5 mt-1 bg-amber-950/30 p-2 rounded border border-amber-900/40">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{unknownQuantification.warning}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Calibration Scatter & Regression Line Plot */}
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-slate-300">Đồ thị Chuẩn Độ Hấp Thụ (A) theo Nồng Độ (M)</span>
                  <span className="font-mono text-emerald-400">OLS Linear Fit</span>
                </div>

                {/* SVG Calibration Plot */}
                <svg viewBox="0 0 520 280" className="w-full h-64 select-none">
                  {/* Grid Lines */}
                  {[0, 1, 2, 3, 4].map((i) => {
                    const y = 230 - i * 45;
                    return (
                      <g key={i}>
                        <line x1="60" y1={y} x2="490" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="50" y={y + 4} fontSize="9" fill="#64748b" textAnchor="end">
                          {(i * 0.4).toFixed(1)}
                        </text>
                      </g>
                    );
                  })}

                  {/* X Axis & Labels */}
                  <line x1="60" y1="230" x2="490" y2="230" stroke="#475569" strokeWidth="1.5" />
                  <line x1="60" y1="230" x2="60" y2="40" stroke="#475569" strokeWidth="1.5" />
                  <text x="275" y="265" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold">
                    Nồng độ mol c (mol/L)
                  </text>
                  <text x="20" y="135" fontSize="10" fill="#94a3b8" textAnchor="middle" fontWeight="bold" transform="rotate(-90 20 135)">
                    Độ hấp thụ A
                  </text>

                  {/* Optimal Zone Highlight (A = 0.2 to 0.8) */}
                  <rect
                    x="60"
                    y={230 - (0.8 / 1.6) * 180}
                    width="430"
                    height={((0.8 - 0.2) / 1.6) * 180}
                    fill="#10b981"
                    opacity="0.06"
                  />
                  <text x="480" y={230 - (0.5 / 1.6) * 180} fontSize="8" fill="#10b981" textAnchor="end" opacity="0.6">
                    Vùng tối ưu A ∈ [0.2, 0.8]
                  </text>

                  {/* Regression Fit Line */}
                  {(() => {
                    const maxC = currentStandard.typicalConcRangeM.max * 1.1;
                    const x1 = 60;
                    const y1 = 230 - (regressionResult.intercept / 1.6) * 180;
                    const endA = regressionResult.slope * maxC + regressionResult.intercept;
                    const x2 = 60 + (maxC / maxC) * 410;
                    const y2 = 230 - (endA / 1.6) * 180;

                    return (
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={Math.max(30, y2)}
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                    );
                  })()}

                  {/* Calibration Scatter Points */}
                  {calibrationPoints.map((pt, idx) => {
                    const maxC = currentStandard.typicalConcRangeM.max * 1.1;
                    const cx = 60 + (pt.concentrationM / maxC) * 410;
                    const cy = 230 - (pt.absorbance / 1.6) * 180;

                    return (
                      <g key={idx}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="5"
                          fill="#38bdf8"
                          stroke="#0284c7"
                          strokeWidth="2"
                        />
                        <text x={cx} y={cy - 8} fontSize="8" fill="#93c5fd" textAnchor="middle">
                          {pt.absorbance.toFixed(3)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Unknown Sample Point */}
                  {(() => {
                    const maxC = currentStandard.typicalConcRangeM.max * 1.1;
                    const cx = 60 + (unknownQuantification.concentrationM / maxC) * 410;
                    const cy = 230 - (unknownAbsorbance / 1.6) * 180;

                    if (cx >= 60 && cx <= 490 && cy >= 30 && cy <= 230) {
                      return (
                        <g>
                          <line x1="60" y1={cy} x2={cx} y2={cy} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1={cx} y1="230" x2={cx} y2={cy} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                          <circle cx={cx} cy={cy} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                          <text x={cx} y={cy - 10} fontSize="9" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
                            Mẫu ? ({unknownAbsorbance.toFixed(3)})
                          </text>
                        </g>
                      );
                    }
                    return null;
                  })()}
                </svg>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-lg border border-slate-700/80">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-slate-800 text-slate-300 font-semibold border-b border-slate-700">
                    <tr>
                      <th className="px-3 py-2">Điểm Chuẩn</th>
                      <th className="px-3 py-2">Nồng Độ c (M)</th>
                      <th className="px-3 py-2">Độ Hấp Thụ A</th>
                      <th className="px-3 py-2">Độ Truyền Qua %T</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-mono">
                    {calibrationPoints.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="px-3 py-1.5 text-slate-400">Chuẩn #{idx + 1}</td>
                        <td className="px-3 py-1.5 text-cyan-300">{p.concentrationM.toExponential(2)}</td>
                        <td className="px-3 py-1.5 text-emerald-300">{p.absorbance.toFixed(3)}</td>
                        <td className="px-3 py-1.5 text-slate-300">{p.transmittancePct?.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VISIBLE SPECTRUM & COMPLEMENTARY COLOR THEORY */}
        {activeTab === 'COMPLEMENTARY_SPECTRUM' && (
          <div className="space-y-6">
            {/* Interactive Color Slider & Visual Match */}
            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  Quy Luật Bổ Sung Màu Ánh Sáng (Complementary Color Wheel)
                </h4>
                <div className="text-xs font-mono font-bold text-cyan-300">
                  Bước sóng chọn: λ = {selectedWavelengthNm} nm
                </div>
              </div>

              {/* Wavelength Slider with Visible Gradient Background */}
              <div className="space-y-2">
                <div
                  className="h-6 rounded-lg w-full relative border border-slate-600"
                  style={{
                    background: 'linear-gradient(to right, #8B00FF 0%, #0000FF 16%, #00CED1 33%, #008000 50%, #FFFF00 66%, #FFA500 83%, #FF0000 100%)'
                  }}
                />
                <input
                  type="range"
                  min="380"
                  max="780"
                  step="5"
                  value={selectedWavelengthNm}
                  onChange={(e) => setSelectedWavelengthNm(parseInt(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>380 nm (Tím)</span>
                  <span>450 nm (Lam)</span>
                  <span>520 nm (Lục)</span>
                  <span>580 nm (Vàng)</span>
                  <span>620 nm (Da cam)</span>
                  <span>750 nm (Đỏ)</span>
                </div>
              </div>

              {/* Complementary Dual Swatch Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Absorbed Light Box */}
                <div className="p-4 rounded-xl border border-slate-700 bg-slate-900 flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl border-2 border-white/40 shadow-lg shrink-0 flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: complementaryInfo.absorbedHex, color: '#ffffff' }}
                  >
                    λ = {selectedWavelengthNm}
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Ánh Sáng Bị Hấp Thụ</div>
                    <div className="text-sm font-bold text-white">{complementaryInfo.absorbedColor}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Dải sóng: {complementaryInfo.minWavelengthNm} - {complementaryInfo.maxWavelengthNm} nm</div>
                  </div>
                </div>

                {/* Transmitted/Observed Color Box */}
                <div className="p-4 rounded-xl border border-slate-700 bg-slate-900 flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl border-2 border-white/40 shadow-lg shrink-0 flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: complementaryInfo.transmittedHex, color: '#000000' }}
                  >
                    Mắt Nhìn
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Màu Dung Dịch Quan Sát Thấy</div>
                    <div className="text-sm font-bold text-white">{complementaryInfo.transmittedColor}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Màu bù trừ quang học truyền qua</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complementary Color Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-700/80">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-800 text-slate-300 font-semibold border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-2.5">Khoảng Bước Sóng (nm)</th>
                    <th className="px-4 py-2.5">Ánh Sáng Hấp Thụ</th>
                    <th className="px-4 py-2.5">Màu Quan Sát (Bổ Sung)</th>
                    <th className="px-4 py-2.5">Ví Dụ Thực Tế Trong Hóa Học</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {COMPLEMENTARY_COLOR_TABLE.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="px-4 py-2 font-mono text-cyan-300">{c.minWavelengthNm} - {c.maxWavelengthNm}</td>
                      <td className="px-4 py-2 flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-400" style={{ backgroundColor: c.absorbedHex }} />
                        <span className="text-slate-200">{c.absorbedColor}</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-400" style={{ backgroundColor: c.transmittedHex }} />
                          <span className="text-slate-200 font-medium">{c.transmittedColor}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2 text-slate-400 text-[11px]">
                        {i === 4 ? 'KMnO4 (hấp thụ lục 525nm → tím đậm)' : i === 8 ? 'CuSO4 (hấp thụ đỏ 650-810nm → lam ngọc)' : i === 1 ? 'K2Cr2O7 (hấp thụ chàm 450nm → da cam)' : i === 0 ? 'Phức Ni²⁺, Fe(SCN)²⁺' : 'Các hợp chất màu phối trí / phẩm màu hữu cơ'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REAL DEVIATIONS & TCG COMBAT RECON BUFF */}
        {activeTab === 'DEVIATIONS_TCG' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Real Deviations Explanation */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700/80 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Các Giới Hạn & Độ Lệch Khỏi Định Luật Beer-Lambert
                </h4>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750 space-y-1">
                    <span className="font-bold text-amber-300">1. Giới Hạn Nồng Độ Cao (c &gt; 0.01 M):</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Ở nồng độ cao, khoảng cách giữa các hạt chất tan thu hẹp dẫn đến tương tác tĩnh điện giữa các ion liền kề. Tương tác này làm biến dạng đám mây electron của nhóm mang màu, khiến hệ số hấp thụ mol ε thay đổi không còn là hằng số.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750 space-y-1">
                    <span className="font-bold text-cyan-300">2. Độ Lệch Do Ánh Sáng Tán Xạ (Stray Light Deviation):</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Ánh sáng lạc không đơn sắc hoặc phản xạ từ gương tán xạ sẽ đi thẳng vào đầu dò mà không bị dung dịch hấp thụ. Khi đó độ hấp thụ biểu kiến đạt trần giới hạn <code className="text-cyan-400">A_max = -log10(s)</code>, khiến đồ thị chuẩn bị cong bẹp xuống ở vùng nồng độ cao.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-750 space-y-1">
                    <span className="font-bold text-emerald-300">3. Độ Lệch Hóa Học & Cân Bằng Chuyển Dịch:</span>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Khi chất tan tham gia các phản ứng phân ly, liên hợp hoặc tạo phức tùy thuộc vào nồng độ và pH dung dịch (ví dụ cân bằng <code className="text-amber-300 font-mono">Cr2O7²⁻ + H2O ⇌ 2CrO4²⁻ + 2H⁺</code>), dạng phân tử hấp thụ thay đổi khiến phổ biến đổi phức tạp.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ELEMENTA TCG / MOBA TACTICAL RECONNAISSANCE PANEL */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 p-5 rounded-xl border border-indigo-700/60 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Hiệu Ứng Thẻ Bài & Trinh Sát MOBA
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    Optical Recon
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Trong ELEMENTA, năng lực Trắc Quang Hấp Thụ (Spectrophotometric Scan) biến quang phổ hấp thụ thành công cụ trinh sát phân tử tối tân trên đấu trường:
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900/90 border border-indigo-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-300">Phát Hiện Cạm Bẫy (LOD &lt; 10⁻⁵ M):</span>
                      <p className="text-[11px] text-slate-400">Độ nhạy quang phổ cực cao phát hiện và vô hiệu hóa các lá bẫy tàng hình của đối phương.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/90 border border-indigo-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-cyan-300">Xuyên Giáp Ma Thuật (+20% Magic Penetration):</span>
                      <p className="text-[11px] text-slate-400">Bước sóng cộng hưởng photon phá vỡ cấu trúc phòng thủ của các ion kim loại chuyển tiếp.</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900/90 border border-indigo-800/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-300">Cân Bằng Phản Ứng Tức Thì:</span>
                      <p className="text-[11px] text-slate-400">Xác định chính xác nồng độ còn lại của đối thủ, kích hoạt chuỗi combo hóa học tối ưu năng lượng.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      sound.playSpectroLampShutter();
                      setTimeout(() => sound.playPhotodetectorBeep(), 180);
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-550 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Kích Hoạt Quét Quang Phổ Trận Đấu
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
