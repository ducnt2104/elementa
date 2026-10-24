// src/components/visualizations/AlkaliHardWaterVisualizer.tsx
// Interactive Alkali & Alkaline Earth Metals, Flame Tests & Hard Water Softening Visualizer
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 7: Nhóm IA & IIA) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Droplets,
  RotateCcw,
  BookOpen,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Thermometer,
  Shield,
  Layers,
  FlaskConical,
  Zap,
  Activity,
  Filter
} from 'lucide-react';
import {
  GROUP_IA_IIA_METALS,
  AlkaliMetalDef,
  WaterSampleIons,
  analyzeWaterHardness,
  simulateWaterSoftening,
  SofteningMethodType,
  HardWaterAnalysisResult,
  SofteningSimulationResult
} from '../../domain/alkaliHardWaterEngine';
import { sound } from '../../audio/soundEngine';

export interface AlkaliHardWaterVisualizerProps {
  initialMode?: 'METALS_AND_FLAME' | 'HARD_WATER_ANALYSIS' | 'SOFTENING_SIMULATION';
  className?: string;
}

export const AlkaliHardWaterVisualizer: React.FC<AlkaliHardWaterVisualizerProps> = ({
  initialMode = 'METALS_AND_FLAME',
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState<'METALS_AND_FLAME' | 'HARD_WATER_ANALYSIS' | 'SOFTENING_SIMULATION'>(initialMode);

  // 1. Metals and Flame Test State
  const [selectedMetalSymbol, setSelectedMetalSymbol] = useState<string>('Na');

  // 2. Hard Water Analysis State (Default: Total Hard Water)
  const [caMmol, setCaMmol] = useState<number>(1.5);
  const [mgMmol, setMgMmol] = useState<number>(1.0);
  const [hco3Mmol, setHco3Mmol] = useState<number>(2.0);
  const [clMmol, setClMmol] = useState<number>(2.0);
  const [so4Mmol, setSo4Mmol] = useState<number>(0.5);

  // 3. Softening Method State
  const [selectedSofteningMethod, setSelectedSofteningMethod] = useState<SofteningMethodType>('BOILING_NUNG_NONG');

  // Current Metal
  const currentMetal = useMemo<AlkaliMetalDef>(() => {
    return GROUP_IA_IIA_METALS.find(m => m.symbol === selectedMetalSymbol) || GROUP_IA_IIA_METALS[1];
  }, [selectedMetalSymbol]);

  // Current Water Sample
  const waterSample = useMemo<WaterSampleIons>(() => {
    return {
      ca2PlusMmolPerL: caMmol,
      mg2PlusMmolPerL: mgMmol,
      hco3MinusMmolPerL: hco3Mmol,
      clMinusMmolPerL: clMmol,
      so42MinusMmolPerL: so4Mmol
    };
  }, [caMmol, mgMmol, hco3Mmol, clMmol, so4Mmol]);

  // Calculations
  const analysisResult = useMemo<HardWaterAnalysisResult>(() => {
    return analyzeWaterHardness(waterSample);
  }, [waterSample]);

  const softeningResult = useMemo<SofteningSimulationResult>(() => {
    return simulateWaterSoftening({
      sample: waterSample,
      method: selectedSofteningMethod
    });
  }, [waterSample, selectedSofteningMethod]);

  const handleModeChange = (mode: 'METALS_AND_FLAME' | 'HARD_WATER_ANALYSIS' | 'SOFTENING_SIMULATION') => {
    setActiveMode(mode);
    sound.playUiClick();
  };

  const handleResetSampleToTemporary = () => {
    setCaMmol(1.5);
    setMgMmol(0.5);
    setHco3Mmol(4.0);
    setClMmol(0.0);
    setSo4Mmol(0.0);
    sound.playUiClick();
  };

  const handleResetSampleToPermanent = () => {
    setCaMmol(1.0);
    setMgMmol(1.0);
    setHco3Mmol(0.0);
    setClMmol(2.0);
    setSo4Mmol(1.0);
    sound.playUiClick();
  };

  const handleResetSampleToTotal = () => {
    setCaMmol(1.5);
    setMgMmol(1.0);
    setHco3Mmol(2.0);
    setClMmol(2.0);
    setSo4Mmol(0.5);
    sound.playUiClick();
  };

  return (
    <div className={`flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              Chuyên Đề Kim Loại Kiềm, Kiềm Thổ &amp; Nước Cứng
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                GDPT 2018 Lớp 12
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Đặc tính Nhóm IA/IIA &amp; Màu ngọn lửa · Phân loại nước cứng · 5 Phương pháp làm mềm nước cứng
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1">
          <button
            onClick={() => handleModeChange('METALS_AND_FLAME')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'METALS_AND_FLAME'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            1. Nhóm IA/IIA &amp; Ngọn Lửa
          </button>
          <button
            onClick={() => handleModeChange('HARD_WATER_ANALYSIS')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'HARD_WATER_ANALYSIS'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            2. Phân Loại Nước Cứng
          </button>
          <button
            onClick={() => handleModeChange('SOFTENING_SIMULATION')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeMode === 'SOFTENING_SIMULATION'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            3. Làm Mềm Nước Cứng
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ===================== MODE 1: METALS & FLAME TEST ===================== */}
        {activeMode === 'METALS_AND_FLAME' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Metals Picker (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" /> Danh Mục Kim Loại Nhóm IA &amp; IIA
                </span>

                <div className="space-y-1.5">
                  {GROUP_IA_IIA_METALS.map((m) => {
                    const isSelected = m.symbol === selectedMetalSymbol;
                    return (
                      <button
                        key={m.symbol}
                        onClick={() => {
                          setSelectedMetalSymbol(m.symbol);
                          sound.playUiClick();
                        }}
                        className={`w-full text-left p-2 rounded-lg border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0 shadow-sm"
                            style={{ backgroundColor: m.flameHexColor }}
                          ></span>
                          <div>
                            <div className="font-semibold text-xs flex items-center gap-1.5">
                              {m.nameVI} ({m.symbol})
                              <span className="text-[10px] font-mono px-1 rounded bg-slate-900 text-slate-400">
                                {m.valenceElectronConfig}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {m.group === 'GROUP_IA_ALKALI' ? 'Nhóm IA (Kiềm)' : 'Nhóm IIA (Kiềm thổ)'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-amber-300">
                            E° = {m.standardPotentialE0Volts}V
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Physical Properties Card */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> Đặc Điểm Lý Hóa: {currentMetal.nameVI}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Khối lượng riêng:</span>
                    <div className="font-mono font-bold text-slate-200">{currentMetal.densityGcm3} g/cm³ {currentMetal.densityGcm3 < 1.0 ? '(Nhẹ hơn H₂O)' : ''}</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-500">Nhiệt độ nóng chảy:</span>
                    <div className="font-mono font-bold text-amber-300">{currentMetal.meltingPointC}°C</div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 pt-1">
                  * {currentMetal.curriculumContextVI}
                </p>
              </div>
            </div>

            {/* Right Flame Simulation & Water Reactivity (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Flame Visualizer Banner */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-slate-900/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Màu Ngọn Lửa Đặc Trưng (Flame Emission Test)
                  </span>
                  <div className="text-2xl font-black text-slate-100 flex items-center gap-2.5 mt-1">
                    <span
                      className="w-6 h-6 rounded-full border border-slate-500 inline-block shrink-0 shadow-lg"
                      style={{ backgroundColor: currentMetal.flameHexColor }}
                    ></span>
                    {currentMetal.flameTestColorVI}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    Bước sóng bức xạ: {currentMetal.emissionWavelengthNm > 0 ? `${currentMetal.emissionWavelengthNm} nm` : 'Không có vạch nhìn thấy'}
                  </div>
                </div>

                {/* SVG Burner */}
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  <svg viewBox="0 0 100 110" className="w-16 h-20">
                    <polygon points="35,110 65,110 60,60 40,60" fill="#334155" />
                    {/* Flame shape */}
                    <path
                      d="M 50,15 C 65,35 70,55 50,60 C 30,55 35,35 50,15 Z"
                      fill={currentMetal.flameHexColor}
                      className="animate-pulse"
                      opacity="0.9"
                    />
                    <path
                      d="M 50,28 C 58,40 60,55 50,58 C 40,55 42,40 50,28 Z"
                      fill="#ffffff"
                      opacity="0.7"
                    />
                  </svg>
                </div>
              </div>

              {/* Water Reactivity Violence Gauge */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" /> Mức Độ Mãnh Liệt Khi Tác Dụng Với Nước
                  </span>
                  <span className="font-mono font-bold text-amber-400">{currentMetal.waterReactivityScore} / 100</span>
                </div>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
                    style={{ width: `${currentMetal.waterReactivityScore}%` }}
                  ></div>
                </div>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-amber-300 text-xs">
                  {currentMetal.waterReactionEquationVI}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODE 2: HARD WATER ANALYSIS ===================== */}
        {activeMode === 'HARD_WATER_ANALYSIS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Controls & Preset Buttons (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4" /> Nồng Độ Cation &amp; Anion (mmol/L)
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={handleResetSampleToTemporary}
                      className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-amber-300 hover:bg-slate-800"
                      title="Nước cứng tạm thời"
                    >
                      Tạm thời
                    </button>
                    <button
                      onClick={handleResetSampleToPermanent}
                      className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-rose-300 hover:bg-slate-800"
                      title="Nước cứng vĩnh cửu"
                    >
                      Vĩnh cửu
                    </button>
                    <button
                      onClick={handleResetSampleToTotal}
                      className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-cyan-300 hover:bg-slate-800"
                      title="Toàn phần"
                    >
                      Toàn phần
                    </button>
                  </div>
                </div>

                {/* Ca2+ Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Ca²⁺ (mmol/L):</span>
                    <span className="font-mono font-bold text-cyan-300">{caMmol.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="5.0"
                    step="0.1"
                    value={caMmol}
                    onChange={(e) => setCaMmol(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Mg2+ Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Mg²⁺ (mmol/L):</span>
                    <span className="font-mono font-bold text-blue-300">{mgMmol.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="5.0"
                    step="0.1"
                    value={mgMmol}
                    onChange={(e) => setMgMmol(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* HCO3- Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">HCO₃⁻ (Gây tính cứng tạm thời):</span>
                    <span className="font-mono font-bold text-amber-300">{hco3Mmol.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="8.0"
                    step="0.2"
                    value={hco3Mmol}
                    onChange={(e) => setHco3Mmol(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Cl- Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Cl⁻ (Gây tính cứng vĩnh cửu):</span>
                    <span className="font-mono font-bold text-purple-300">{clMmol.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="5.0"
                    step="0.2"
                    value={clMmol}
                    onChange={(e) => setClMmol(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Right Hard Water Diagnostic (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-slate-900/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                    Độ Cứng Toàn Phần (Quy Đổi CaCO₃)
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {analysisResult.waterCategoryVI}
                  </span>
                </div>

                <div className="text-3xl font-black font-mono text-cyan-300">
                  {analysisResult.totalHardnessCaco3MgPerL.toFixed(1)} mg/L CaCO₃
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Độ cứng tạm thời (HCO₃⁻):</span>
                    <div className="font-mono font-bold text-amber-300 text-sm">
                      {analysisResult.temporaryHardnessMgPerL.toFixed(1)} mg/L
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Độ cứng vĩnh cửu (Cl⁻/SO₄²⁻):</span>
                    <div className="font-mono font-bold text-rose-300 text-sm">
                      {analysisResult.permanentHardnessMgPerL.toFixed(1)} mg/L
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 mt-3">
                  {analysisResult.pedagogicalAnalysisVI}
                </div>
              </div>

              {/* Negative Impact Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-amber-400 font-semibold uppercase">Lãng Phí Xà Phòng Tạo Cặn:</span>
                  <div className="text-xl font-bold font-mono text-amber-300">{analysisResult.soapPrecipitationWastePercent}%</div>
                  <div className="text-[10px] text-slate-500">Tạo kết tủa (RCOO)₂Ca làm mất bọt</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-rose-400 font-semibold uppercase">Nguy Cơ Nổ Nồi Hơi Đóng Cặn:</span>
                  <div className="text-xl font-bold font-mono text-rose-300">{analysisResult.boilerScaleRiskScore} / 100</div>
                  <div className="text-[10px] text-slate-500">Cặn vôi cách nhiệt làm cháy nổ thành lò</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== MODE 3: WATER SOFTENING SIMULATION ===================== */}
        {activeMode === 'SOFTENING_SIMULATION' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Methods Picker (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Filter className="w-4 h-4" /> Chọn Phương Pháp Làm Mềm Nước
                </span>

                <div className="space-y-1.5">
                  {[
                    { id: 'BOILING_NUNG_NONG', label: '1. Đun Sôi (Nhiệt phân)', tip: 'Chỉ làm mềm tính cứng tạm thời' },
                    { id: 'LIME_CAOH2', label: '2. Nước Vôi Trong Ca(OH)₂', tip: 'Dùng lượng vừa đủ cho tạm thời' },
                    { id: 'SODA_NA2CO3', label: '3. Soda Na₂CO₃', tip: 'Chất làm mềm vạn năng cho mọi loại' },
                    { id: 'PHOSPHATE_NA3PO4', label: '4. Photphat Na₃PO₄', tip: 'Kết tủa triệt để muối photphat' },
                    { id: 'ION_EXCHANGE_RESIN', label: '5. Nhựa Trao Đổi Ion (Cationit)', tip: 'Công nghệ hiện đại lọc mềm hoàn toàn' }
                  ].map((m) => {
                    const isSelected = m.id === selectedSofteningMethod;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setSelectedSofteningMethod(m.id as any);
                          sound.playUiClick();
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-semibold text-xs">{m.label}</div>
                        <div className="text-[10px] text-slate-400">{m.tip}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Softening Output & Pedagogical Warning (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Hiệu Suất Làm Mềm Nước Cứng
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {softeningResult.softeningEfficiencyPercent.toFixed(1)}% Loại Bỏ
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Độ cứng ban đầu:</span>
                    <div className="text-lg font-bold text-slate-200 font-mono">
                      {softeningResult.initialHardnessMgPerL.toFixed(1)} mg/L
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                    <span className="text-slate-400">Độ cứng còn lại sau xử lý:</span>
                    <div className={`text-lg font-bold font-mono ${softeningResult.residualHardnessMgPerL < 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {softeningResult.residualHardnessMgPerL.toFixed(1)} mg/L
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 mt-3">
                  {softeningResult.visualPhenomenonVI}
                </div>
              </div>

              {/* Equation Box */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Phương Trình Hóa Học &amp; Cơ Chế
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-emerald-300 text-center text-xs overflow-x-auto">
                  {softeningResult.chemicalEquationVI}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  {softeningResult.pedagogicalEvaluationVI}
                </p>
              </div>

              {/* Warning Card */}
              {softeningResult.curriculumWarningVI && (
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs space-y-1">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Trọng Tâm Đề Thi Tốt Nghiệp THPT (GDPT 2018)
                  </div>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    {softeningResult.curriculumWarningVI}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
