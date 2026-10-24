// src/components/visualizations/GreenChemistryVisualizer.tsx
// Interactive Green Chemistry, Atmospheric Cycles, Acid Rain & Carbon Neutrality Visualizer
// Conforming to Vietnam GDPT 2018 (Hóa 11 Chương 2 & Chương 4; Hóa 12 Chương 8) & IUPAC Standards

import React, { useState, useMemo } from 'react';
import {
  Sprout,
  Scale,
  CloudRain,
  Flame,
  ShieldAlert,
  Zap,
  Activity,
  Droplet,
  Recycle,
  Sparkles,
  Info,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Volume2
} from 'lucide-react';
import {
  GREEN_CHEMISTRY_PRINCIPLES,
  GreenPrincipleDef,
  SYNTHESIS_BENCHMARKS,
  SynthesisRouteComparison,
  ACID_RAIN_STEPS,
  ACID_RAIN_TARGETS,
  GREENHOUSE_GASES,
  CARBON_CAPTURE_METHODS,
  calculateAtomEconomy,
  calculateEFactor,
  calculateCO2Equivalent,
  calculateLimestoneDissolution
} from '../../domain/greenChemistryEngine';
import { sound } from '../../audio/soundEngine';

export interface GreenChemistryVisualizerProps {
  initialTab?: 'PRINCIPLES' | 'SYNTHESIS' | 'ACID_RAIN' | 'CCUS';
  className?: string;
}

export const GreenChemistryVisualizer: React.FC<GreenChemistryVisualizerProps> = ({
  initialTab = 'PRINCIPLES',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'PRINCIPLES' | 'SYNTHESIS' | 'ACID_RAIN' | 'CCUS'>(initialTab);
  
  // Tab 1 state
  const [selectedPrincipleNum, setSelectedPrincipleNum] = useState<number>(1);

  // Tab 2 state
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('ethylene_oxide');
  const [customProductMw, setCustomProductMw] = useState<number>(44.05);
  const [customReactantsMw, setCustomReactantsMw] = useState<number>(44.05);

  // Tab 3 state
  const [rainPH, setRainPH] = useState<number>(4.2);
  const [rainVolumeLiters, setRainVolumeLiters] = useState<number>(2500);

  // Tab 4 state
  const [emissionCO2, setEmissionCO2] = useState<number>(100);
  const [emissionCH4, setEmissionCH4] = useState<number>(5);
  const [emissionN2O, setEmissionN2O] = useState<number>(1);
  const [emissionSF6, setEmissionSF6] = useState<number>(0.001);
  const [selectedCaptureId, setSelectedCaptureId] = useState<string>('catalytic_emethanol');

  // Selected principle
  const currentPrinciple: GreenPrincipleDef = useMemo(() => {
    return GREEN_CHEMISTRY_PRINCIPLES.find(p => p.number === selectedPrincipleNum) || GREEN_CHEMISTRY_PRINCIPLES[0];
  }, [selectedPrincipleNum]);

  // Selected benchmark
  const currentBenchmark: SynthesisRouteComparison = useMemo(() => {
    return SYNTHESIS_BENCHMARKS[selectedBenchmarkId] || SYNTHESIS_BENCHMARKS.ethylene_oxide;
  }, [selectedBenchmarkId]);

  // Tab 2 custom calculation
  const customAeResult = useMemo(() => {
    try {
      return calculateAtomEconomy(customProductMw, customReactantsMw);
    } catch {
      return {
        atomEconomyPercent: 0,
        isGreen: false,
        ratingVI: 'KÉM_DƯỚI_50%' as const,
        explanationVI: 'Khối lượng không hợp lệ'
      };
    }
  }, [customProductMw, customReactantsMw]);

  // Tab 3 acid rain calculation
  const acidRainCalc = useMemo(() => {
    try {
      return calculateLimestoneDissolution(rainVolumeLiters, rainPH);
    } catch {
      return {
        hPlusMoles: 0,
        calciumCarbonateDissolvedGrams: 0,
        co2GasReleasedLitersSTP: 0,
        rainClassificationVI: 'MƯA_TỰ_NHIÊN_CHUẨN' as const
      };
    }
  }, [rainVolumeLiters, rainPH]);

  // Tab 4 CO2 equivalent calculation
  const co2EqCalc = useMemo(() => {
    return calculateCO2Equivalent({
      carbon_dioxide: emissionCO2,
      methane: emissionCH4,
      nitrous_oxide: emissionN2O,
      sulfur_hexafluoride: emissionSF6
    });
  }, [emissionCO2, emissionCH4, emissionN2O, emissionSF6]);

  const selectedCapture = useMemo(() => {
    return CARBON_CAPTURE_METHODS[selectedCaptureId] || CARBON_CAPTURE_METHODS.catalytic_emethanol;
  }, [selectedCaptureId]);

  return (
    <div className={`bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-2xl flex flex-col gap-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl shadow-lg">
            <Sprout className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Hóa Học Xanh & Môi Trường Bền Vững
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                GDPT 2018 · IUPAC · 12 Principles
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              12 Nguyên lý Hóa học Xanh, Kinh tế nguyên tử (AE), E-factor, Mưa axit & Công nghệ Bắt giữ Carbon (CCUS)
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('PRINCIPLES')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'PRINCIPLES'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            12 Nguyên Lý
          </button>
          <button
            onClick={() => setActiveTab('SYNTHESIS')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'SYNTHESIS'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Kinh Tế Nguyên Tử & E-Factor
          </button>
          <button
            onClick={() => setActiveTab('ACID_RAIN')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'ACID_RAIN'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            Mưa Axit & Khí Quyển
          </button>
          <button
            onClick={() => setActiveTab('CCUS')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'CCUS'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Khí Nhà Kính & CCUS
          </button>
        </div>
      </div>

      {/* TAB 1: 12 NGUYÊN LÝ HÓA HỌC XANH */}
      {activeTab === 'PRINCIPLES' && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Principles 1-12 Selector Grid */}
          <div className="lg:w-5/12 flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Danh mục 12 Nguyên lý (Anastas & Warner)</span>
              <span className="text-emerald-400 font-mono">12/12</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[520px] overflow-y-auto pr-1">
              {GREEN_CHEMISTRY_PRINCIPLES.map(p => {
                const isSelected = p.number === selectedPrincipleNum;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPrincipleNum(p.number);
                      sound.playEcoSynthesisChime();
                    }}
                    className={`text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-emerald-950/70 border-emerald-500 shadow-md shadow-emerald-950/40'
                        : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {p.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-semibold truncate ${isSelected ? 'text-emerald-300' : 'text-slate-200'}`}>
                        {p.titleVI}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {p.titleEN}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Principle Detail Card */}
          <div className="lg:w-7/12 bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    Nguyên lý #{currentPrinciple.number}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentPrinciple.titleEN}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  {currentPrinciple.titleVI}
                </h3>
              </div>
              <button
                onClick={() => sound.playEcoSynthesisChime()}
                className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all border border-emerald-500/30 flex items-center gap-1.5 text-xs font-semibold"
                title="Nghe âm thanh chuyển hóa xanh"
              >
                <Volume2 className="w-4 h-4" />
                Âm vang Xanh
              </button>
            </div>

            {/* Tagline callout */}
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-emerald-200 italic">
                "{currentPrinciple.taglineVI}"
              </p>
            </div>

            {/* Description & Strategy */}
            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <span className="text-slate-400 font-semibold block mb-1">Mục tiêu & Bản chất khoa học:</span>
                <p className="text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  {currentPrinciple.descriptionVI}
                </p>
              </div>

              <div>
                <span className="text-emerald-400 font-semibold block mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Chiến lược hóa học cụ thể:
                </span>
                <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px]">
                  {currentPrinciple.chemicalStrategyVI}
                </p>
              </div>

              <div>
                <span className="text-cyan-400 font-semibold block mb-1 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  Ứng dụng thực tiễn công nghiệp:
                </span>
                <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  {currentPrinciple.industrialExampleVI}
                </p>
              </div>

              <div>
                <span className="text-amber-400 font-semibold block mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Liên hệ chương trình GDPT 2018:
                </span>
                <p className="text-amber-200/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-800/30">
                  {currentPrinciple.relevantCurriculumVI}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KINH TẾ NGUYÊN TỬ & E-FACTOR */}
      {activeTab === 'SYNTHESIS' && (
        <div className="flex flex-col gap-6">
          {/* Benchmark selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              Chọn Điển Hình Công Nghiệp:
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.values(SYNTHESIS_BENCHMARKS).map(bm => (
                <button
                  key={bm.id}
                  onClick={() => setSelectedBenchmarkId(bm.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                    selectedBenchmarkId === bm.id
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {bm.nameVI}
                </button>
              ))}
            </div>
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Traditional Route */}
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-4 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Quy Trình Cổ Điển / Lượng Hóa
                  </span>
                  <span className="text-xs bg-rose-900/40 text-rose-300 px-2 py-0.5 rounded font-mono">
                    {currentBenchmark.traditionalRoute.stepsCount} bước
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">
                  {currentBenchmark.traditionalRoute.nameVI}
                </h4>
                <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-xs text-rose-300 mt-2">
                  {currentBenchmark.traditionalRoute.reactionEquationVI}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Kinh tế nguyên tử (%AE lý thuyết):</span>
                    <span className="font-bold text-rose-400 font-mono">
                      {currentBenchmark.traditionalRoute.theoreticalAtomEconomyPercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, currentBenchmark.traditionalRoute.theoreticalAtomEconomyPercent)}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Hệ số môi trường E-factor:</span>
                  <span className="font-mono font-bold text-rose-300">
                    {currentBenchmark.traditionalRoute.typicalEFactor} kg thải / kg SP
                  </span>
                </div>

                <p className="text-[11px] text-rose-200/90 italic bg-rose-950/40 p-2 rounded border border-rose-900/30">
                  ⚠️ {currentBenchmark.traditionalRoute.majorHazardOrWasteVI}
                </p>
              </div>
            </div>

            {/* Green Catalytic Route */}
            <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-4 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Quy Trình Xanh / Xúc Tác Hiện Đại
                  </span>
                  <span className="text-xs bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    {currentBenchmark.greenRoute.stepsCount} bước
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-1">
                  {currentBenchmark.greenRoute.nameVI}
                </h4>
                <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 mt-2">
                  {currentBenchmark.greenRoute.reactionEquationVI}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Kinh tế nguyên tử (%AE lý thuyết):</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {currentBenchmark.greenRoute.theoreticalAtomEconomyPercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, currentBenchmark.greenRoute.theoreticalAtomEconomyPercent)}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400">Hệ số môi trường E-factor:</span>
                  <span className="font-mono font-bold text-emerald-300">
                    {currentBenchmark.greenRoute.typicalEFactor} kg thải / kg SP
                  </span>
                </div>

                <p className="text-[11px] text-emerald-200/90 italic bg-emerald-950/40 p-2 rounded border border-emerald-900/30">
                  🌱 {currentBenchmark.greenRoute.majorGreenAdvantageVI}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Atom Economy Calculator */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Máy Tính Kinh Tế Nguyên Tử Tùy Biến (Custom Atom Economy Simulator)</span>
              <span className="font-mono text-emerald-400">%AE = (Msp / ∑Mtham_gia) × 100</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Khối lượng mol sản phẩm mong muốn (g/mol):</span>
                  <span className="font-mono font-bold text-emerald-300">{customProductMw}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="0.5"
                  value={customProductMw}
                  onChange={e => setCustomProductMw(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Tổng khối lượng mol tất cả chất phản ứng (g/mol):</span>
                  <span className="font-mono font-bold text-cyan-300">{customReactantsMw}</span>
                </label>
                <input
                  type="range"
                  min={customProductMw}
                  max="600"
                  step="0.5"
                  value={Math.max(customProductMw, customReactantsMw)}
                  onChange={e => setCustomReactantsMw(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Kết Quả Đạt Được:</span>
                <span className={`text-base font-bold font-mono px-2 py-0.5 rounded ${
                  customAeResult.isGreen ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {customAeResult.atomEconomyPercent}%
                </span>
                <span className="text-slate-300">{customAeResult.explanationVI}</span>
              </div>
              <button
                onClick={() => sound.playEcoSynthesisChime()}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition"
              >
                Xác Thực Chuẩn Xanh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MƯA AXIT & PHÁ HỦY MÔI TRƯỜNG */}
      {activeTab === 'ACID_RAIN' && (
        <div className="flex flex-col gap-6">
          {/* Controls: pH and Volume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-cyan-400" />
                  Độ Chua Nước Mưa (pH):
                </label>
                <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                  rainPH < 4.0 ? 'bg-rose-500/30 text-rose-300' : rainPH < 5.6 ? 'bg-amber-500/30 text-amber-300' : 'bg-emerald-500/30 text-emerald-300'
                }`}>
                  pH = {rainPH.toFixed(1)} ({acidRainCalc.rainClassificationVI})
                </span>
              </div>
              <input
                type="range"
                min="2.0"
                max="7.0"
                step="0.1"
                value={rainPH}
                onChange={e => {
                  setRainPH(Number(e.target.value));
                  if (Number(e.target.value) < 4.5) sound.playAcidRainHiss();
                }}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>2.0 (Cực chua)</span>
                <span>4.0 (Mưa axit nặng)</span>
                <span>5.6 (Mưa tự nhiên unpolluted)</span>
                <span>7.0 (Nước tinh khiết)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-blue-400" />
                  Thể Tích Đợt Mưa Axit:
                </label>
                <span className="text-xs font-mono font-bold text-blue-300">
                  {rainVolumeLiters.toLocaleString()} Lít
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="20000"
                step="500"
                value={rainVolumeLiters}
                onChange={e => setRainVolumeLiters(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>500 L (Mưa rào nhẹ)</span>
                <span>10,000 L</span>
                <span>20,000 L (Mưa lũ kéo dài)</span>
              </div>
            </div>
          </div>

          {/* Dissolution Metrics Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
            <div className="flex flex-col gap-1 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400">Nồng độ & Lượng Ion H+:</span>
              <span className="text-base font-bold font-mono text-cyan-300">
                {acidRainCalc.hPlusMoles} mol
              </span>
              <span className="text-[10px] text-slate-500 font-mono">[H+] = 10^(-pH) M</span>
            </div>

            <div className="flex flex-col gap-1 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[11px] text-rose-400 font-semibold">Đá Cẩm Thạch CaCO3 Bị Ăn Mòn:</span>
              <span className="text-base font-bold font-mono text-rose-300">
                {acidRainCalc.calciumCarbonateDissolvedGrams} gam
              </span>
              <span className="text-[10px] text-slate-500 font-mono">CaCO3 + 2H+ → Ca2+ + CO2 + H2O</span>
            </div>

            <div className="flex flex-col gap-1 p-3 bg-slate-950/60 rounded-lg border border-slate-800">
              <span className="text-[11px] text-amber-400 font-semibold">Khí CO2 Thoát Ra Vào Khí Quyển:</span>
              <span className="text-base font-bold font-mono text-amber-300">
                {acidRainCalc.co2GasReleasedLitersSTP} Lít
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Thể tích mol chuẩn 25°C, 1 bar</span>
            </div>
          </div>

          {/* Atmospheric cycle steps */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Các Giai Đoạn Hình Thành Trong Khí Quyển (Chu trình S & N)</span>
              <button
                onClick={() => sound.playAcidRainHiss()}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Mô phỏng tiếng xèo ăn mòn
              </button>
            </h4>
            <div className="space-y-2">
              {ACID_RAIN_STEPS.map(step => (
                <div
                  key={step.stepOrder}
                  className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-[10px] shrink-0">
                      {step.stepOrder}
                    </div>
                    <div>
                      <span className="text-slate-300 font-medium block">{step.pollutantSourceVI}</span>
                      <span className="text-cyan-300 font-mono text-[11px]">{step.atmosphericReactionVI}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {step.productAcidVI}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Damage Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACID_RAIN_TARGETS.map(target => (
              <div
                key={target.id}
                className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{target.targetNameVI}</span>
                  <span className="text-[10px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/30">
                    {target.materialTypeVI}
                  </span>
                </div>
                <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-[11px] text-rose-300">
                  {target.chemicalEquationVI}
                </div>
                <p className="text-slate-400 text-[11px]">{target.mechanismDescriptionVI}</p>
                <div className="mt-auto pt-2 border-t border-slate-800/80 text-[11px] text-emerald-300">
                  🛡️ <span className="font-semibold">Giải pháp khắc phục:</span> {target.preventionMeasureVI}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: KHÍ NHÀ KÍNH & CCUS */}
      {activeTab === 'CCUS' && (
        <div className="flex flex-col gap-6">
          {/* Greenhouse Gas Footprint Calculator */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  Quy Đổi Phát Thải Khí Nhà Kính Tương Đương (CO2-eq)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dựa trên Tiềm năng Làm nóng Toàn cầu 100 năm (GWP100 - IPCC AR6)
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Tổng CO2 Tương Đương:</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  {co2EqCalc.totalCO2EquivalentTonnes.toLocaleString()} tấn CO2-eq
                </span>
              </div>
            </div>

            {/* Inputs for 4 gases */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200">CO2 (Cacbon đioxit)</span>
                  <span className="text-[10px] text-slate-400 font-mono">GWP = 1</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={emissionCO2}
                  onChange={e => setEmissionCO2(Math.max(0, Number(e.target.value)))}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-white"
                />
                <span className="text-[10px] text-slate-400">Tấn phát thải</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-amber-300">CH4 (Metan)</span>
                  <span className="text-[10px] text-amber-400 font-mono">GWP = 28</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={emissionCH4}
                  onChange={e => setEmissionCH4(Math.max(0, Number(e.target.value)))}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-white"
                />
                <span className="text-[10px] text-slate-400">Tấn phát thải</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-rose-300">N2O (Đinitơ oxit)</span>
                  <span className="text-[10px] text-rose-400 font-mono">GWP = 273</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={emissionN2O}
                  onChange={e => setEmissionN2O(Math.max(0, Number(e.target.value)))}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-white"
                />
                <span className="text-[10px] text-slate-400">Tấn phát thải</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-purple-300">SF6 (Khí cách điện)</span>
                  <span className="text-[10px] text-purple-400 font-mono">GWP = 25,200</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.001"
                  value={emissionSF6}
                  onChange={e => setEmissionSF6(Math.max(0, Number(e.target.value)))}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-white"
                />
                <span className="text-[10px] text-slate-400">Tấn phát thải</span>
              </div>
            </div>

            {/* Breakdown bars */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 font-semibold block">Tỉ Trọng Tác Động Gây Hiệu Ứng Nhà Kính (%):</span>
              <div className="w-full bg-slate-900 rounded-full h-3 flex overflow-hidden border border-slate-800">
                {co2EqCalc.breakdown.map((item, idx) => {
                  const colors = ['bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-purple-500'];
                  return (
                    <div
                      key={item.gasId}
                      className={`${colors[idx % colors.length]} h-full transition-all`}
                      style={{ width: `${item.sharePercent}%` }}
                      title={`${item.gasNameVI}: ${item.sharePercent}% (${item.co2EqTonnes} tấn)`}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 mt-1">
                {co2EqCalc.breakdown.map((item, idx) => {
                  const dotColors = ['text-emerald-400', 'text-amber-400', 'text-rose-400', 'text-purple-400'];
                  return (
                    <span key={item.gasId} className="flex items-center gap-1 font-mono">
                      <span className={dotColors[idx % dotColors.length]}>●</span>
                      {item.gasNameVI}: {item.sharePercent}% ({item.co2EqTonnes} tấn)
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CCUS Technologies */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Công Nghệ Bắt Giữ, Tận Dụng & Lưu Trữ Carbon (CCUS)</span>
              <span className="text-emerald-400 font-mono">Net-Zero 2050</span>
            </h4>

            {/* Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.values(CARBON_CAPTURE_METHODS).map(cc => (
                <button
                  key={cc.id}
                  onClick={() => {
                    setSelectedCaptureId(cc.id);
                    sound.playEcoSynthesisChime();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCaptureId === cc.id
                      ? 'bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] text-emerald-400 font-mono block uppercase">
                    {cc.captureCategory}
                  </span>
                  <span className="text-xs font-bold text-white block mt-0.5">
                    {cc.methodNameVI}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected CCUS Showcase */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-sm font-bold text-emerald-300">
                  {selectedCapture.methodNameVI}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                  Tiêu tốn năng lượng: {selectedCapture.regenerationEnergyMJperKgCO2} MJ / kg CO2
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Phương trình phản ứng then chốt:</span>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300">
                  {selectedCapture.keyReactionEquationVI}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-2.5 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
                  <span className="text-emerald-400 font-semibold block mb-0.5">Ưu điểm vượt trội:</span>
                  <p className="text-slate-300 text-[11px]">{selectedCapture.advantagesVI}</p>
                </div>
                <div className="p-2.5 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                  <span className="text-amber-400 font-semibold block mb-0.5">Thách thức kỹ thuật:</span>
                  <p className="text-slate-300 text-[11px]">{selectedCapture.engineeringChallengesVI}</p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Sản phẩm tận dụng / Lưu trữ:</span>
                <span className="text-cyan-300 font-semibold">{selectedCapture.utilizationProductVI}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Curriculum Note */}
      <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          Bộ Giáo Dục & Đào Tạo Việt Nam — GDPT 2018 Hóa học 11 (Chương 2, 4) & Hóa học 12 (Chương 8: Hóa học và Môi trường)
        </span>
        <span className="font-mono text-slate-500">IUPAC Green Chemistry Division · EPA 12 Principles</span>
      </div>
    </div>
  );
};
