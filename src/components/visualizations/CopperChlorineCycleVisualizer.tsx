// src/components/visualizations/CopperChlorineCycleVisualizer.tsx
// Interactive Visualizer: Hybrid Thermochemical Copper-Chlorine (Cu-Cl) Water-Splitting Cycle
// Standards: IUPAC Physical Chemistry & Thermodynamics, Generation-IV Nuclear / CSP Low-Temp Integration

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Sun,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  DollarSign,
  Gauge,
  Factory,
  Droplets,
  Atom,
  Wind,
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import {
  CU_CL_FOUR_STEPS,
  HEAT_SOURCE_CATALOG,
  HeatSourceType,
  calculateCuClPerformance,
  calculateElectrolysisMetrics,
  compareCuClVsOtherCycles
} from '../../domain/copperChlorineCycleEngine';
import { sound } from '../../audio/soundEngine';

type CuClTabMode =
  | 'FOUR_STEP_CLOSED_LOOP'
  | 'ELECTROCHEMICAL_SAVINGS_AND_HEAT_SOURCES'
  | 'HYDROGEN_PLANT_ECONOMICS_AND_DECARBONIZATION';

export const CopperChlorineCycleVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CuClTabMode>('FOUR_STEP_CLOSED_LOOP');

  // Interactive Controls
  const [thermalInputMWth, setThermalInputMWth] = useState<number>(35.0); // 35 MWth SMR default
  const [electrolyzerVoltageV, setElectrolyzerVoltageV] = useState<number>(0.55);
  const [heatSourceType, setHeatSourceType] = useState<HeatSourceType>('NUCLEAR_SCWR');
  const [heatExchangerRecovery, setHeatExchangerRecovery] = useState<number>(0.75);
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(1);

  // Performance calculations
  const performance = useMemo(() => {
    return calculateCuClPerformance({
      thermalInputMWth,
      electrolyzerVoltageV,
      heatSourceType,
      heatExchangerRecovery
    });
  }, [thermalInputMWth, electrolyzerVoltageV, heatSourceType, heatExchangerRecovery]);

  const electroMetrics = useMemo(() => {
    return calculateElectrolysisMetrics(electrolyzerVoltageV, 0.98);
  }, [electrolyzerVoltageV]);

  const benchmarks = useMemo(() => {
    return compareCuClVsOtherCycles();
  }, []);

  const handleModeChange = (mode: CuClTabMode) => {
    sound.playUiClick();
    setActiveMode(mode);
  };

  const resetDefaults = () => {
    sound.playUiClick();
    setThermalInputMWth(35.0);
    setElectrolyzerVoltageV(0.55);
    setHeatSourceType('NUCLEAR_SCWR');
    setHeatExchangerRecovery(0.75);
    setSelectedStepIndex(1);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400">
            <Atom className="w-8 h-8 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40">
                Chu Trình Nhiệt Hóa Hỗn Hợp Gen-IV
              </span>
              <span className="text-xs text-slate-400">Đỉnh Nhiệt 530°C (803 K)</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">
              Chu Trình Đồng - Clo (Cu-Cl) Tách Nước Sản Xuất Hydro
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Mặc Định
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        <button
          onClick={() => handleModeChange('FOUR_STEP_CLOSED_LOOP')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'FOUR_STEP_CLOSED_LOOP'
              ? 'bg-gradient-to-r from-amber-600 to-emerald-600 text-white shadow-lg shadow-amber-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          1. Sơ Đồ Khép Kín 4 Bước (530°C)
        </button>

        <button
          onClick={() => handleModeChange('ELECTROCHEMICAL_SAVINGS_AND_HEAT_SOURCES')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'ELECTROCHEMICAL_SAVINGS_AND_HEAT_SOURCES'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-blue-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          2. Tiết Kiệm Điện 71% & Nguồn Nhiệt
        </button>

        <button
          onClick={() => handleModeChange('HYDROGEN_PLANT_ECONOMICS_AND_DECARBONIZATION')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeMode === 'HYDROGEN_PLANT_ECONOMICS_AND_DECARBONIZATION'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          3. Kinh Tế Hydro ($2.2/kg) & So Sánh
        </button>
      </div>

      {/* MODE 1: FOUR STEP CLOSED LOOP */}
      {activeMode === 'FOUR_STEP_CLOSED_LOOP' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main SVG Schematic */}
          <div className="lg:col-span-8 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Vòng Tuần Hoàn Khép Kín 100% Đồng - Clo (Không Tiêu Hao Hóa Chất)
              </h3>
              <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                Peak Temp: 530°C (803 K)
              </span>
            </div>

            {/* Dynamic Chemical Loop SVG */}
            <div className="w-full bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 flex items-center justify-center">
              <svg viewBox="0 0 760 380" className="w-full h-auto max-h-[380px]">
                <defs>
                  <linearGradient id="cuStreamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <linearGradient id="hclStreamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="h2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#84cc16" />
                    <stop offset="100%" stopColor="#4d7c0f" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <rect x="10" y="10" width="740" height="360" rx="16" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />

                {/* STEP 1: Hydrolysis Reactor (Top Left) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => { sound.playUiClick(); setSelectedStepIndex(1); }}
                >
                  <rect
                    x="50"
                    y="40"
                    width="280"
                    height="110"
                    rx="12"
                    fill={selectedStepIndex === 1 ? '#1e293b' : '#0f172a'}
                    stroke={selectedStepIndex === 1 ? '#f59e0b' : '#334155'}
                    strokeWidth={selectedStepIndex === 1 ? 2.5 : 1.5}
                  />
                  <circle cx="75" cy="65" r="14" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="75" y="70" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">1</text>
                  <text x="100" y="65" fill="#ffffff" fontSize="13" fontWeight="bold">Thủy Phân CuCl₂ (380°C)</text>
                  <text x="100" y="85" fill="#94a3b8" fontSize="10">2CuCl₂ + H₂O → Cu₂OCl₂ + 2HCl</text>
                  <text x="100" y="105" fill="#f59e0b" fontSize="9" fontWeight="bold">ΔH = +116.5 kJ/mol (Thu nhiệt)</text>
                  <rect x="65" y="120" width="250" height="18" rx="4" fill="#f59e0b" fillOpacity="0.1" />
                  <text x="190" y="132" textAnchor="middle" fill="#fbbf24" fontSize="9">Nhiệt độ tương thích SCWR & Muối CSP</text>
                </g>

                {/* Feed Stream: H2O Steam in */}
                <path d="M 190 10 L 190 40" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 2" />
                <polygon points="190,40 186,32 194,32" fill="#06b6d4" />
                <text x="195" y="26" fill="#06b6d4" fontSize="10" fontWeight="bold">+ H₂O(g) Hơi nước</text>

                {/* STEP 2: Thermal Decomposition (Top Right) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => { sound.playUiClick(); setSelectedStepIndex(2); }}
                >
                  <rect
                    x="430"
                    y="40"
                    width="280"
                    height="110"
                    rx="12"
                    fill={selectedStepIndex === 2 ? '#1e293b' : '#0f172a'}
                    stroke={selectedStepIndex === 2 ? '#ef4444' : '#334155'}
                    strokeWidth={selectedStepIndex === 2 ? 2.5 : 1.5}
                  />
                  <circle cx="455" cy="65" r="14" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="455" y="70" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">2</text>
                  <text x="480" y="65" fill="#ffffff" fontSize="13" fontWeight="bold">Phân Hủy Cu₂OCl₂ (530°C)</text>
                  <text x="480" y="85" fill="#94a3b8" fontSize="10">Cu₂OCl₂ → 2CuCl(l) + 1/2 O₂</text>
                  <text x="480" y="105" fill="#ef4444" fontSize="9" fontWeight="bold">Đỉnh nhiệt cao nhất (530°C)</text>
                  <rect x="445" y="120" width="250" height="18" rx="4" fill="#ef4444" fillOpacity="0.1" />
                  <text x="570" y="132" textAnchor="middle" fill="#f87171" fontSize="9">Tạo CuCl lỏng + Thoát Oxy tinh khiết</text>
                </g>

                {/* Flow between 1 and 2: Solid Cu2OCl2 */}
                <path d="M 330 95 L 430 95" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                <polygon points="430,95 422,91 422,99" fill="#f59e0b" />
                <text x="380" y="88" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Cu₂OCl₂(s)</text>

                {/* Oxygen product out of Step 2 */}
                <path d="M 570 40 L 570 12" stroke="#38bdf8" strokeWidth="2.5" />
                <polygon points="570,12 566,20 574,20" fill="#38bdf8" />
                <text x="580" y="24" fill="#38bdf8" fontSize="10" fontWeight="bold">↑ O₂ Khí Oxy Thoát Ra</text>

                {/* STEP 3: Electrochemical Cell (Bottom Right) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => { sound.playUiClick(); setSelectedStepIndex(3); }}
                >
                  <rect
                    x="430"
                    y="220"
                    width="280"
                    height="110"
                    rx="12"
                    fill={selectedStepIndex === 3 ? '#1e293b' : '#0f172a'}
                    stroke={selectedStepIndex === 3 ? '#84cc16' : '#334155'}
                    strokeWidth={selectedStepIndex === 3 ? 2.5 : 1.5}
                  />
                  <circle cx="455" cy="245" r="14" fill="#84cc16" fillOpacity="0.2" stroke="#84cc16" strokeWidth="1.5" />
                  <text x="455" y="250" textAnchor="middle" fill="#84cc16" fontSize="13" fontWeight="bold">3</text>
                  <text x="480" y="245" fill="#ffffff" fontSize="13" fontWeight="bold">Điện Phân CuCl/HCl (80°C)</text>
                  <text x="480" y="265" fill="#94a3b8" fontSize="10">2CuCl + 2HCl → 2CuCl₂ + H₂</text>
                  <text x="480" y="285" fill="#84cc16" fontSize="9" fontWeight="bold">Điện áp: 0.55 V (Tiết kiệm 71% điện)</text>
                  <rect x="445" y="300" width="250" height="18" rx="4" fill="#84cc16" fillOpacity="0.1" />
                  <text x="570" y="312" textAnchor="middle" fill="#a3e635" fontSize="9">Sinh trực tiếp Hydro tinh khiết (H₂)</text>
                </g>

                {/* Flow between 2 and 3: Molten/Aqueous CuCl */}
                <path d="M 640 150 L 640 220" stroke="#f59e0b" strokeWidth="2.5" />
                <polygon points="640,220 636,212 644,212" fill="#f59e0b" />
                <text x="648" y="190" fill="#fbbf24" fontSize="9" fontWeight="bold">CuCl lỏng</text>

                {/* Flow from Step 1 HCl to Step 3 */}
                <path d="M 120 150 L 120 190 L 480 190 L 480 220" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />
                <polygon points="480,220 476,212 484,212" fill="#10b981" />
                <text x="300" y="184" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">HCl(g) Khí Axit Tuần Hoàn</text>

                {/* Hydrogen Product Out of Step 3 */}
                <path d="M 570 330 L 570 365" stroke="#84cc16" strokeWidth="3" />
                <polygon points="570,365 566,357 574,357" fill="#84cc16" />
                <text x="580" y="356" fill="#84cc16" fontSize="11" fontWeight="bold">↓ H₂ Hydro Xanh Sản Phẩm</text>

                {/* STEP 4: Crystallizer / Dryer (Bottom Left) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => { sound.playUiClick(); setSelectedStepIndex(4); }}
                >
                  <rect
                    x="50"
                    y="220"
                    width="280"
                    height="110"
                    rx="12"
                    fill={selectedStepIndex === 4 ? '#1e293b' : '#0f172a'}
                    stroke={selectedStepIndex === 4 ? '#06b6d4' : '#334155'}
                    strokeWidth={selectedStepIndex === 4 ? 2.5 : 1.5}
                  />
                  <circle cx="75" cy="245" r="14" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="75" y="250" textAnchor="middle" fill="#06b6d4" fontSize="13" fontWeight="bold">4</text>
                  <text x="100" y="245" fill="#ffffff" fontSize="13" fontWeight="bold">Kết Tinh CuCl₂ (110°C)</text>
                  <text x="100" y="265" fill="#94a3b8" fontSize="10">CuCl₂(aq) → CuCl₂(s) + H₂O(g)</text>
                  <text x="100" y="285" fill="#06b6d4" fontSize="9" fontWeight="bold">Thu hồi nhiệt thải sấy khô bột CuCl₂</text>
                  <rect x="65" y="300" width="250" height="18" rx="4" fill="#06b6d4" fillOpacity="0.1" />
                  <text x="190" y="312" textAnchor="middle" fill="#38bdf8" fontSize="9">Tái sinh CuCl₂ tuần hoàn khép kín 100%</text>
                </g>

                {/* Flow from Step 3 to Step 4: Aqueous CuCl2 */}
                <path d="M 430 275 L 330 275" stroke="#0ea5e9" strokeWidth="2.5" />
                <polygon points="330,275 338,271 338,279" fill="#0ea5e9" />
                <text x="380" y="268" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">CuCl₂(aq)</text>

                {/* Flow from Step 4 back to Step 1: Dried CuCl2 powder */}
                <path d="M 80 220 L 80 150" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="80,150 76,158 84,158" fill="#f59e0b" />
                <text x="88" y="185" fill="#fbbf24" fontSize="9" fontWeight="bold">CuCl₂(s) bột khô</text>
              </svg>
            </div>

            {/* Step Detail Card */}
            {(() => {
              const currentStep = CU_CL_FOUR_STEPS[selectedStepIndex - 1];
              return (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700/60 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-amber-300">
                      Bước {currentStep.stepIndex}: {currentStep.vietnameseName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {currentStep.operatingTempC}°C ({currentStep.operatingTempC + 273.15} K)
                    </span>
                  </div>
                  <div className="font-mono text-sm text-emerald-400 bg-slate-950 p-2 rounded-lg border border-slate-800">
                    {currentStep.reactionEquation}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentStep.description}
                  </p>
                  <div className="flex gap-4 text-xs text-slate-400 pt-1">
                    <span>Biến thiên enthalpy: <strong className="text-slate-100">+{currentStep.enthalpyChangeKJPerMol} kJ/mol</strong></span>
                    <span>Pha phản ứng: <strong className="text-slate-100">{currentStep.phaseType}</strong></span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Quick Metrics & Highlights Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Ưu Thế Tuyệt Đối Của Cu-Cl (530°C)
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="font-bold text-emerald-300 mb-1">Đỉnh Nhiệt 530°C (Dưới Giới Hạn 550°C)</div>
                  <p className="text-slate-300">
                    Khác với S-I (900°C) hay Kẽm (1677°C), chu trình Cu-Cl hoàn toàn tương thích với vật liệu hợp kim công nghiệp hiện hành (Hastelloy, Inconel) mà không cần gốm SiC hay gương mặt trời siêu hội tụ.
                  </p>
                </div>

                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <div className="font-bold text-blue-300 mb-1">Tiết Kiệm 71.3% Điện Năng vs Điện Phân PEM</div>
                  <p className="text-slate-300">
                    Điện phân CuCl/HCl chỉ cần thế điện cực 0.55 V (tiêu thụ ~14.9 kWh/kg H₂), trong khi điện phân nước thông thường đòi hỏi 1.8 - 2.1 V (tiêu thụ ~52 kWh/kg H₂).
                  </p>
                </div>

                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <div className="font-bold text-amber-300 mb-1">Tuần Hoàn 100% Cu & Cl Khép Kín</div>
                  <p className="text-slate-300">
                    Toàn bộ ion Đồng và Clo được tái sinh hoàn toàn trong chu trình. Nguyên liệu tiêu thụ duy nhất là nước thường và nhiệt năng sạch.
                  </p>
                </div>
              </div>
            </div>

            {/* SMR Compact Module Stats */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Thông Số Mô-đun SMR 35 MWth</span>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg font-black text-amber-400">{performance.hydrogenProductionKgPerHour}</div>
                  <div className="text-[10px] text-slate-400">kg H₂ / giờ</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-lg font-black text-emerald-400">{performance.hydrogenProductionTonsPerDay}</div>
                  <div className="text-[10px] text-slate-400">Tấn H₂ / ngày</div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300 pt-1 border-t border-slate-800/80">
                <span>Khí Oxy đồng phát:</span>
                <span className="font-bold text-cyan-400">{performance.oxygenProductionKgPerHour} kg/h</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Tuần hoàn CuCl₂:</span>
                <span className="font-bold text-amber-400">{performance.cucl2CirculationKgPerHour.toLocaleString()} kg/h</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ELECTROCHEMICAL SAVINGS & HEAT SOURCES */}
      {activeMode === 'ELECTROCHEMICAL_SAVINGS_AND_HEAT_SOURCES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Electrochemical Tuning & Physics */}
          <div className="lg:col-span-7 flex flex-col gap-5 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Động Học Điện Phân CuCl/HCl & Màng PEM Nhiệt Độ 80°C
            </h3>

            {/* Slider: Electrolyzer Voltage */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">
                  Hiệu Điện Thế Tế Bào (Cell Voltage V)
                </label>
                <span className="text-sm font-mono font-bold text-amber-400">
                  {electrolyzerVoltageV.toFixed(2)} V
                </span>
              </div>
              <input
                type="range"
                min="0.45"
                max="0.75"
                step="0.01"
                value={electrolyzerVoltageV}
                onChange={(e) => setElectrolyzerVoltageV(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.45 V (Giới hạn nhiệt động)</span>
                <span>0.55 V (Thiết kế tiêu chuẩn)</span>
                <span>0.75 V (Mật độ dòng cao 0.8 A/cm²)</span>
              </div>
            </div>

            {/* Electricity Demand vs PEM Bar Comparison */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-300">So Sánh Suất Tiêu Thụ Điện Năng:</span>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-emerald-400 font-bold">Cu-Cl Hybrid Electrochemical Cell</span>
                    <span className="font-mono font-bold text-emerald-400">{electroMetrics.specificElectricityKWhPerKg} kWh / kg H₂</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(electroMetrics.specificElectricityKWhPerKg / 52.0) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Điện phân nước PEM thương mại thông thường</span>
                    <span className="font-mono text-slate-300">52.0 kWh / kg H₂</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-600 h-full rounded-full w-full" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex items-center justify-between mt-2">
                <span className="text-xs text-emerald-300 font-semibold">Tỷ Lệ Giảm Điện Năng:</span>
                <span className="text-lg font-black text-emerald-400">-{electroMetrics.pemSavingsPercent}%</span>
              </div>
            </div>

            {/* Pinch Heat Exchanger Recovery Slider */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">
                  Hiệu Suất Thu Hồi Nhiệt Trao Đổi (Pinch Recovery)
                </label>
                <span className="text-sm font-mono font-bold text-cyan-400">
                  {(heatExchangerRecovery * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min="0.65"
                max="0.85"
                step="0.01"
                value={heatExchangerRecovery}
                onChange={(e) => setHeatExchangerRecovery(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-[10px] text-slate-400">
                Thu hồi nhiệt ngưng tụ hơi nước và làm nguội CuCl từ 530°C về 80°C để sấy CuCl₂.
              </span>
            </div>
          </div>

          {/* Heat Source Selector & Integration */}
          <div className="lg:col-span-5 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              Nguồn Nhiệt Sạch Tải Nền Tương Thích
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {Object.values(HEAT_SOURCE_CATALOG).map((source) => (
                <div
                  key={source.id}
                  onClick={() => {
                    sound.playUiClick();
                    setHeatSourceType(source.id);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    heatSourceType === source.id
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-950/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-amber-300">{source.vietnameseName}</span>
                    <span className="text-xs font-mono font-bold text-slate-300">{source.nominalTempC}°C</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {source.description}
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800/80">
                    <span>Phát thải: {source.carbonIntensityGCO2PerKWhTh} g CO₂/kWh(th)</span>
                    <span className="text-emerald-400 font-semibold">Tương thích hoàn hảo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: HYDROGEN ECONOMICS & BENCHMARKING */}
      {activeMode === 'HYDROGEN_PLANT_ECONOMICS_AND_DECARBONIZATION' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Economics & LCOH Breakdown */}
          <div className="lg:col-span-5 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              Chi Phí Quy Dẫn LCOH ($2.20/kg H₂)
            </h3>

            {/* Thermal Plant Capacity Slider */}
            <div className="flex flex-col gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">Công Suất Nhiệt Nhà Máy (MWth)</label>
                <span className="text-sm font-mono font-bold text-amber-400">{thermalInputMWth} MWth</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={thermalInputMWth}
                onChange={(e) => setThermalInputMWth(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>10 MWth (Mô-đun thí nghiệm)</span>
                <span>35 MWth (SMR hạt nhân)</span>
                <span>200 MWth (Cụm Gigawatt)</span>
              </div>
            </div>

            {/* Economic Metrics Card */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs text-slate-400">Giá thành LCOH:</span>
                <span className="text-xl font-black text-emerald-400">${performance.lcohUSDPerKg} / kg H₂</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Sản lượng H₂ năm (8,000h):</span>
                <span className="font-bold text-white">{((performance.hydrogenProductionKgPerHour * 8000) / 1000).toLocaleString()} tấn/năm</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Công suất điện cho điện phân:</span>
                <span className="font-bold text-amber-400">{performance.electrolyzerPowerMWe} MWe</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Giảm phát thải CO₂ vs SMR:</span>
                <span className="font-bold text-emerald-400">{performance.annualAvoidedCO2Tons.toLocaleString()} tấn/năm</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-xs text-slate-300 leading-relaxed">
              <strong className="text-emerald-300">Cạnh Tranh Trực Tiếp Khí Thiên Nhiên: </strong>
              Với mức giá $2.20/kg H₂, hydro từ chu trình Cu-Cl kết hợp lò SMR đã tiệm cận mức giá parity của Hydro Xám từ khí thiên nhiên ($1.80 - $2.40/kg) mà không phải gánh thuế phát thải carbon (EU CBAM).
            </div>
          </div>

          {/* Benchmark Table vs Other Cycles */}
          <div className="lg:col-span-7 flex flex-col gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyan-400" />
              So Sánh Cu-Cl Với Các Chu Trình Tách Nước Khác
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                    <th className="p-2.5 font-bold">Chu Trình</th>
                    <th className="p-2.5 font-bold">Đỉnh Nhiệt</th>
                    <th className="p-2.5 font-bold">Hiệu Suất</th>
                    <th className="p-2.5 font-bold">Điện Tiêu Thụ</th>
                    <th className="p-2.5 font-bold">Vật Liệu Kháng Ăn Mòn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {benchmarks.map((b, idx) => (
                    <tr
                      key={idx}
                      className={b.cycleName.includes('Copper') ? 'bg-amber-500/10 font-medium text-white' : 'hover:bg-slate-900/40'}
                    >
                      <td className="p-2.5 font-bold text-amber-300">{b.vietnameseName}</td>
                      <td className="p-2.5 font-mono text-cyan-400">{b.peakTempC}°C</td>
                      <td className="p-2.5 font-mono text-emerald-400">{b.thermalEfficiencyPercent}%</td>
                      <td className="p-2.5 font-mono">{b.electricityDemandKWhPerKg} kWh/kg</td>
                      <td className="p-2.5 text-[11px] text-slate-400">{b.corrosionChallenge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-300">Kết Luận Vật Liệu Học: </strong>
              Chu trình S-I đòi hỏi 900°C làm nảy sinh thách thức ăn mòn nghiêm trọng với H₂SO₄, chỉ có thể giải quyết bằng gốm SiC giá thành đắt. Chu trình Cu-Cl giới hạn nhiệt độ ở 530°C, cho phép sử dụng thép hợp kim thương mại Hastelloy C-276 và lớp lót fluoropolymer (PTFE), giảm CapEx hơn 40%.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
