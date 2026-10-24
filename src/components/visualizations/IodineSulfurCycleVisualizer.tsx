// src/components/visualizations/IodineSulfurCycleVisualizer.tsx
// Interactive Visualizer: Iodine-Sulfur (IS / S-I) Thermochemical Water-Splitting Cycle
// Conforms to: Gen-IV Nuclear VHTR Protocols, IUPAC Thermochemistry & Vietnam GDPT 2018 (Hóa học 10 & 11: Lưu huỳnh, SO2, H2SO4, Halogen I2, HI, Cân bằng nhiệt hóa học)

import React, { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Gauge,
  TrendingUp,
  Box,
  Droplets,
  Atom,
  Cpu,
  ArrowRight,
  Clock,
  Radio,
  Factory,
  DollarSign,
  Sun,
  Filter,
  ShieldAlert
} from 'lucide-react';
import {
  IodineSulfurReactionStep,
  IodineSulfurOperatingConditions,
  getIodineSulfurCycleSteps,
  calculateCarnotLimit,
  simulateIodineSulfurPlant,
  compareThermochemicalCycles
} from '../../domain/iodineSulfurCycleEngine';
import { sound } from '../../audio/soundEngine';

type IsTabMode = 'CLOSED_LOOP_REACTIONS_AND_PHASES' | 'CARNOT_AND_PINCH_HEAT_INTEGRATION' | 'GIGAWATT_HYDROGEN_ECONOMICS';

export const IodineSulfurCycleVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<IsTabMode>('CLOSED_LOOP_REACTIONS_AND_PHASES');

  // Sliders
  const [vhtrHeatSourceTempC, setVhtrHeatSourceTempC] = useState<number>(850);
  const [thermalPowerInputMw, setThermalPowerInputMw] = useState<number>(50);
  const [bunsenTempC, setBunsenTempC] = useState<number>(100);
  const [hiDecompositionTempC, setHiDecompositionTempC] = useState<number>(450);
  const [so3DecompositionPressureBar, setSo3DecompositionPressureBar] = useState<number>(3.0);
  const [excessIodineRatio, setExcessIodineRatio] = useState<number>(6.0);
  const [thermalRecoveryEfficiency, setThermalRecoveryEfficiency] = useState<number>(0.82);
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);

  // Simulation calculations
  const sim = useMemo(() => {
    const conditions: IodineSulfurOperatingConditions = {
      vhtrHeatSourceTempC,
      thermalPowerInputMw,
      bunsenTempC,
      hiDecompositionTempC,
      so3DecompositionPressureBar,
      excessIodineRatio,
      thermalRecoveryEfficiency
    };
    return simulateIodineSulfurPlant(conditions);
  }, [
    vhtrHeatSourceTempC,
    thermalPowerInputMw,
    bunsenTempC,
    hiDecompositionTempC,
    so3DecompositionPressureBar,
    excessIodineRatio,
    thermalRecoveryEfficiency
  ]);

  const reactionSteps = useMemo(() => {
    return getIodineSulfurCycleSteps();
  }, []);

  const thermochemicalComparisons = useMemo(() => {
    return compareThermochemicalCycles();
  }, []);

  const handleTabChange = (tab: IsTabMode) => {
    sound.playUiClick();
    setActiveTab(tab);
  };

  const handleStepClick = (stepNum: number) => {
    sound.playUiClick();
    setActiveStepNumber(stepNum);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-5 text-slate-100 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-inner">
              <Atom className="w-6 h-6 animate-pulse" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-wide text-white flex items-center gap-2">
                Chu Trình Nhiệt Hóa Iod - Lưu Huỳnh (Iodine-Sulfur / S-I Cycle)
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                  Gen-IV VHTR Nuclear Heat
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Nhiệt phân nước thuần nhiệt hóa không dùng điện (850°C), Phản ứng Bunsen 2 pha lỏng & Hiệu suất Carnot &gt; 48%
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => handleTabChange('CLOSED_LOOP_REACTIONS_AND_PHASES')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'CLOSED_LOOP_REACTIONS_AND_PHASES'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            3 Phản Ứng & Phân Tách 2 Pha
          </button>
          <button
            onClick={() => handleTabChange('CARNOT_AND_PINCH_HEAT_INTEGRATION')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'CARNOT_AND_PINCH_HEAT_INTEGRATION'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Nhiệt Động Học Carnot & VHTR
          </button>
          <button
            onClick={() => handleTabChange('GIGAWATT_HYDROGEN_ECONOMICS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'GIGAWATT_HYDROGEN_ECONOMICS'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Sản Lượng & LCOH Hydro
          </button>
        </div>
      </div>

      {/* KPI Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Nhiệt độ đỉnh VHTR:</span>
            <span className="text-amber-400 font-bold">{vhtrHeatSourceTempC}°C</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Công suất nhiệt:</span>
            <span className="text-purple-400 font-bold">{thermalPowerInputMw} MWth</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Hiệu suất Nhiệt-Hydro:</span>
            <span className="text-emerald-400 font-bold">{sim.actualThermalToHydrogenEfficiencyPct}%</span>
            <span className="text-slate-500">(Carnot: {sim.carnotMaxEfficiencyPct}%)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Sản lượng H₂:</span>
            <span className="text-cyan-400 font-bold">{sim.h2ProductionRateKgH} kg/h</span>
            <span className="text-slate-500">({sim.h2ProductionRateNm3H} Nm³/h)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">LCOH:</span>
            <span className="text-emerald-400 font-bold">${sim.levelizedCostOfHydrogenUsdPerKg}</span>
            <span className="text-slate-500">/ kg H₂</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mt-4">
        {/* TAB 1: 3 Phản Ứng & Phân Tách 2 Pha */}
        {activeTab === 'CLOSED_LOOP_REACTIONS_AND_PHASES' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* SVG Visual Scheme */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Sơ đồ Chu Trình Nhiệt Hóa Tuần Hoàn 100% Khép Kín:</span>
                <span className="font-mono text-purple-400">Net: H₂O → H₂ + ½ O₂</span>
              </div>

              {/* Dynamic SVG Schematic */}
              <div className="w-full aspect-[16/10] bg-slate-900/90 rounded-lg p-2 border border-slate-800/80 relative flex items-center justify-center">
                <svg viewBox="0 0 700 420" className="w-full h-full">
                  <defs>
                    <linearGradient id="vhtrHeatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="bunsenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#eab308" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>

                  {/* Step 1: Bunsen Reactor (Center-Left) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-[1.01]"
                    onClick={() => handleStepClick(1)}
                  >
                    <rect
                      x="40"
                      y="110"
                      width="180"
                      height="200"
                      rx="14"
                      fill="url(#bunsenGrad)"
                      stroke={activeStepNumber === 1 ? '#a855f7' : '#475569'}
                      strokeWidth={activeStepNumber === 1 ? '3' : '1.5'}
                    />
                    {/* Water and Reagents Inflow */}
                    <text x="130" y="135" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                      1. Phản Ứng Bunsen (100°C)
                    </text>
                    <text x="130" y="153" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                      I₂ + SO₂ + 2 H₂O → 2 HI + H₂SO₄
                    </text>

                    {/* Phase 1 (Top Layer): Dilute H2SO4 */}
                    <rect x="55" y="170" width="150" height="45" rx="6" fill="#fef08a" fillOpacity="0.25" stroke="#eab308" strokeWidth="1" />
                    <text x="130" y="190" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Tầng Trên: Pha H₂SO₄ (~50 wt%)
                    </text>
                    <text x="130" y="205" fill="#ca8a04" fontSize="8" textAnchor="middle">
                      Tỷ trọng nhẹ ~ 1.4 g/cm³
                    </text>

                    {/* Phase 2 (Bottom Layer): Dense HIx */}
                    <rect x="55" y="225" width="150" height="55" rx="6" fill="#c084fc" fillOpacity="0.25" stroke="#a855f7" strokeWidth="1" />
                    <text x="130" y="248" fill="#e9d5ff" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Tầng Dưới: Pha HIx (HI-I₂-H₂O)
                    </text>
                    <text x="130" y="263" fill="#c084fc" fontSize="8" textAnchor="middle">
                      Tỷ trọng nặng ~ 2.8 g/cm³
                    </text>
                    <text x="130" y="295" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                      Tự Phân Tách 2 Pha Trọng Lực
                    </text>
                  </g>

                  {/* Water Inflow to Bunsen */}
                  <path d="M 130 50 L 130 110" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
                  <circle cx="130" cy="50" r="14" fill="#0284c7" />
                  <text x="130" y="54" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">H₂O</text>
                  <text x="130" y="32" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Nước cấp sạch</text>

                  {/* Flow H2SO4 to Cracker (Top Right) */}
                  <path d="M 205 190 L 320 190 L 320 80 L 420 80" stroke="#eab308" strokeWidth="2.5" strokeDasharray="4 2" />
                  <text x="270" y="180" fill="#eab308" fontSize="9" fontWeight="bold">Pha H₂SO₄</text>

                  {/* Step 2: H2SO4 Catalytic Cracker (Top Right, 850°C) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-[1.01]"
                    onClick={() => handleStepClick(2)}
                  >
                    <rect
                      x="420"
                      y="30"
                      width="190"
                      height="140"
                      rx="14"
                      fill="url(#vhtrHeatGrad)"
                      fillOpacity="0.2"
                      stroke={activeStepNumber === 2 ? '#ef4444' : '#f97316'}
                      strokeWidth={activeStepNumber === 2 ? '3' : '1.5'}
                    />
                    <rect x="440" y="45" width="150" height="28" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                    <text x="515" y="63" fill="#fee2e2" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Nhiệt Phân H₂SO₄ (850°C)
                    </text>
                    <text x="515" y="92" fill="#fed7aa" fontSize="9" textAnchor="middle">
                      H₂SO₄ → H₂O + SO₂ + ½ O₂↑
                    </text>
                    <text x="515" y="110" fill="#f87171" fontSize="9" textAnchor="middle">
                      Xúc tác: Pt/TiO₂ hoặc Fe₂O₃
                    </text>
                    <text x="515" y="130" fill="#fca5a5" fontSize="9" textAnchor="middle">
                      ΔH = +286 kJ/mol (Thu nhiệt cực mạnh)
                    </text>
                    <text x="515" y="152" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Khí O₂ Sạch Giải Phóng
                    </text>
                  </g>

                  {/* O2 Outlet */}
                  <path d="M 610 80 L 670 80" stroke="#4ade80" strokeWidth="3" />
                  <circle cx="675" cy="80" r="14" fill="#16a34a" />
                  <text x="675" y="84" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">O₂</text>
                  <text x="645" y="68" fill="#4ade80" fontSize="9" textAnchor="middle" fontWeight="bold">Khí O₂ sạch</text>

                  {/* SO2 Recirculation back to Bunsen */}
                  <path d="M 515 170 L 515 200 L 250 200 L 250 160 L 220 160" stroke="#f97316" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="360" y="215" fill="#fb923c" fontSize="9" textAnchor="middle" fontWeight="bold">
                    Tuần hoàn SO₂ (g) hồi lưu
                  </text>

                  {/* Flow HIx to HI Cracker (Bottom Right) */}
                  <path d="M 205 250 L 320 250 L 320 330 L 420 330" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="4 2" />
                  <text x="270" y="240" fill="#c084fc" fontSize="9" fontWeight="bold">Pha HIx</text>

                  {/* Step 3: HI Cracker (Bottom Right, 450°C) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-[1.01]"
                    onClick={() => handleStepClick(3)}
                  >
                    <rect
                      x="420"
                      y="250"
                      width="190"
                      height="140"
                      rx="14"
                      fill="#581c87"
                      fillOpacity="0.25"
                      stroke={activeStepNumber === 3 ? '#a855f7' : '#7e22ce'}
                      strokeWidth={activeStepNumber === 3 ? '3' : '1.5'}
                    />
                    <rect x="440" y="265" width="150" height="28" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
                    <text x="515" y="283" fill="#f3e8ff" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Nhiệt Phân HI (450°C)
                    </text>
                    <text x="515" y="312" fill="#e9d5ff" fontSize="9" textAnchor="middle">
                      2 HI → H₂↑ + I₂ (g/l)
                    </text>
                    <text x="515" y="330" fill="#c084fc" fontSize="9" textAnchor="middle">
                      Chưng cất phản ứng / Xúc tác Ru/C
                    </text>
                    <text x="515" y="350" fill="#e9d5ff" fontSize="9" textAnchor="middle">
                      ΔH = +12 kJ/mol (Thu nhiệt nhẹ)
                    </text>
                    <text x="515" y="375" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Khí Hydro H₂ Tinh Khiết
                    </text>
                  </g>

                  {/* H2 Outlet */}
                  <path d="M 610 330 L 670 330" stroke="#38bdf8" strokeWidth="3" />
                  <circle cx="675" cy="330" r="14" fill="#0284c7" />
                  <text x="675" y="334" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">H₂</text>
                  <text x="645" y="318" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Hydro H₂</text>

                  {/* I2 Recirculation back to Bunsen */}
                  <path d="M 515 390 L 515 410 L 130 410 L 130 310" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="320" y="405" fill="#c084fc" fontSize="9" textAnchor="middle" fontWeight="bold">
                    Ngưng tụ & Tuần hoàn I₂ (l) hồi lưu
                  </text>
                </svg>
              </div>
            </div>

            {/* Step Explanation & Reaction Details */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Chi Tiết Phản Ứng Công Đoạn Được Chọn:
                </span>
                {(() => {
                  const step = reactionSteps.find(s => s.stepNumber === activeStepNumber) || reactionSteps[0];
                  return (
                    <div className="mt-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                            {step.stepNumber}
                          </span>
                          {step.vietnameseName}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded font-mono font-semibold ${
                          step.deltaHKjMol > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          ΔH = {step.deltaHKjMol > 0 ? `+${step.deltaHKjMol}` : step.deltaHKjMol} kJ/mol
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700/60 font-mono text-xs text-purple-300 font-semibold">
                        {step.chemicalEquation}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-1">
                        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 block">Nhiệt độ phản ứng:</span>
                          <span className="text-amber-400 font-bold">{step.temperatureC}°C</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                          <span className="text-slate-500 block">Xúc tác phản ứng:</span>
                          <span className="text-cyan-400 font-bold text-[11px] truncate">{step.catalyst}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mt-2 p-2.5 rounded bg-slate-900/40 border border-slate-800/60">
                        {step.phaseSeparationDetail}
                      </p>

                      <div className="text-[11px] text-amber-300/90 leading-relaxed p-2 rounded bg-amber-950/20 border border-amber-800/40 mt-1">
                        <span className="font-bold text-amber-200">Động học Le Chatelier: </span>
                        {step.leChatelierBehavior}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Chemical Inventory Spotlight */}
              <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Lưu Lượng Vật Chất Tuần Hoàn Trong Chu Trình Khép Kín:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Tuần hoàn Iod (I₂):</span>
                    <span className="text-purple-400 font-bold">{sim.recirculatingInventories.iodineCirculationKgH} kg/h</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Tuần hoàn SO₂:</span>
                    <span className="text-amber-400 font-bold">{sim.recirculatingInventories.sulfurDioxideCirculationKgH} kg/h</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Tạo axit H₂SO₄:</span>
                    <span className="text-slate-300 font-bold">{sim.recirculatingInventories.sulfuricAcidProductionKgH} kg/h</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/70 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Tạo axit HI:</span>
                    <span className="text-slate-300 font-bold">{sim.recirculatingInventories.hydrogenIodideProductionKgH} kg/h</span>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-400/90 mt-2 font-mono">
                  ★ Tỷ lệ thất thoát hóa chất: &lt; 0.001% (Vật liệu kín SiC / Hastelloy C-276 chống ăn mòn)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Nhiệt Động Học Carnot & VHTR */}
        {activeTab === 'CARNOT_AND_PINCH_HEAT_INTEGRATION' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Controls */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Tham Số Lò Phản Ứng Hạt Nhân VHTR / CSP:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Khảo sát ảnh hưởng của nhiệt độ nguồn nhiệt và công nghệ thu hồi nhiệt nội bộ
                </p>
              </div>

              {/* Slider 1: VHTR Core Temp */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Nhiệt độ đỉnh nguồn nhiệt:</span>
                  <span className="font-mono text-amber-400 font-bold">{vhtrHeatSourceTempC}°C</span>
                </div>
                <input
                  type="range"
                  min="700"
                  max="950"
                  step="10"
                  value={vhtrHeatSourceTempC}
                  onChange={e => setVhtrHeatSourceTempC(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>700°C (SCWR)</span>
                  <span>850°C (HTTR Chuẩn)</span>
                  <span>950°C (VHTR Tối Đa)</span>
                </div>
              </div>

              {/* Slider 2: Thermal Power */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Công suất nhiệt phân bổ:</span>
                  <span className="font-mono text-purple-400 font-bold">{thermalPowerInputMw} MWth</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={thermalPowerInputMw}
                  onChange={e => setThermalPowerInputMw(Number(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Thermal Recovery Efficiency */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Hiệu suất bộ trao đổi nhiệt Pinch:</span>
                  <span className="font-mono text-emerald-400 font-bold">{(thermalRecoveryEfficiency * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.70"
                  max="0.90"
                  step="0.02"
                  value={thermalRecoveryEfficiency}
                  onChange={e => setThermalRecoveryEfficiency(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 4: SO3 Decomposition Pressure */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-300">Áp suất buồng nung SO₃:</span>
                  <span className="font-mono text-cyan-400 font-bold">{so3DecompositionPressureBar.toFixed(1)} bar</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  value={so3DecompositionPressureBar}
                  onChange={e => setSo3DecompositionPressureBar(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Carnot Comparison and Efficiency Curves */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  So Sánh Hiệu Suất Nhiệt Động Học (Carnot vs Thực Tế):
                </span>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Gauge className="w-4 h-4 text-purple-400" />
                      Giới Hạn Carnot Lý Thuyết
                    </span>
                    <span className="text-2xl font-bold font-mono text-purple-400 block mt-1">
                      {sim.carnotMaxEfficiencyPct}%
                    </span>
                    <span className="text-[10px] text-slate-500">
                      η_carnot = 1 - T_L / T_H (T_L = 25°C)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Hiệu Suất Nhiệt-Hydro Thực Tế
                    </span>
                    <span className="text-2xl font-bold font-mono text-emerald-400 block mt-1">
                      {sim.actualThermalToHydrogenEfficiencyPct}%
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Vượt trội điện phân kiềm/PEM (~36% LHV)
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                  <span className="text-slate-300 font-semibold block">
                    Tại Sao Chu Trình Nhiệt Hóa Đạt Hiệu Suất Vượt Trội?
                  </span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Các phương pháp điện phân nước thông thường phải chịu hao tổn kép: <strong>Nhiệt năng → Máy phát điện turbine (tổn thất Carnot ~45%) → Bình điện phân (tổn thất quá thế điện cực ~70%)</strong>, dẫn đến hiệu suất tổng chu trình Nhiệt-thành-Hydro chỉ đạt <strong>30% - 38%</strong>.
                  </p>
                  <p className="text-emerald-400/90 leading-relaxed text-[11px]">
                    Chu trình S-I đưa trực tiếp nhiệt độ cao 850°C vào phản ứng nhiệt phân hóa học, hoàn toàn không qua khâu biến đổi thành điện năng, loại bỏ toàn bộ quá thế điện hóa và đạt hiệu suất tổng tới <strong>48% - 52%</strong>!
                  </p>
                </div>
              </div>

              {/* Material Corrosion Resistance Notice */}
              <div className="mt-4 p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs text-amber-300/90 leading-relaxed">
                <span className="font-bold flex items-center gap-1.5 text-amber-200 mb-0.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Thách Thức Vật Liệu Chống Ăn Mòn Axit Nhiệt Độ Cao:
                </span>
                Axit sunfuric sôi ở 450°C và hỗn hợp HI-I₂ ăn mòn hầu hết các kim loại thông thường. Dự án JAEA và CEA sử dụng gốm tiên tiến Cacbua Silic (SiC) và hợp kim niken siêu bền Hastelloy C-276, Tantali (Ta) để đạt tuổi thọ vận hành liên tục &gt; 30 năm.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Sản Lượng & LCOH Hydro */}
        {activeTab === 'GIGAWATT_HYDROGEN_ECONOMICS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Production Dashboard */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Sản Lượng Khí & Chi Phí Sản Xuất:
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tính toán quy mô sản xuất công nghiệp Gigawatt từ tổ hợp lò VHTR
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Sản lượng Hydro (H₂):</span>
                  <span className="text-lg font-bold text-cyan-400 block mt-1">{sim.h2ProductionRateKgH} kg/h</span>
                  <span className="text-[10px] text-slate-400">{sim.h2ProductionRateNm3H} Nm³/h</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Khí Oxy Y Tế (O₂):</span>
                  <span className="text-lg font-bold text-emerald-400 block mt-1">{sim.o2ByproductRateNm3H} Nm³/h</span>
                  <span className="text-[10px] text-slate-400">Tỷ lệ chính xác 2:1</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Nước Cấp Tiêu Thụ:</span>
                  <span className="text-lg font-bold text-slate-200 block mt-1">{sim.waterFeedRateKgH} kg/h</span>
                  <span className="text-[10px] text-slate-400">8.94 kg H₂O / kg H₂</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Suất Tiêu Hao Nhiệt:</span>
                  <span className="text-lg font-bold text-amber-400 block mt-1">{sim.specificThermalEnergyKwhPerKgH2}</span>
                  <span className="text-[10px] text-slate-400">kWh-th / kg H₂</span>
                </div>
              </div>

              {/* LCOH Breakdown */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1.5">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px]">
                  Cơ Cấu Giá Thành Hydro LCOH ($ / kg H₂):
                </span>
                <div className="flex justify-between text-slate-300">
                  <span>Khấu hao thiết bị gốm SiC / Lò phản ứng:</span>
                  <span className="text-slate-200 font-bold">$1.20</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Chi phí nhiệt hạt nhân VHTR ($22/MWhth):</span>
                  <span className="text-amber-400 font-bold">${(sim.specificThermalEnergyKwhPerKgH2 * 0.022).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Bảo trì kín & bổ sung hóa chất (&lt;0.001%):</span>
                  <span className="text-slate-200 font-bold">$0.35</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-800 text-sm">
                  <span>Tổng Giá Thành LCOH:</span>
                  <span className="text-emerald-400">${sim.levelizedCostOfHydrogenUsdPerKg} / kg H₂</span>
                </div>
              </div>
            </div>

            {/* Thermochemical Comparison Matrix */}
            <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                  Bảng So Sánh Các Chu Trình Nhiệt Hóa Hàng Đầu Thế Giới (GIF Roadmap):
                </span>

                <div className="flex flex-col gap-2.5 mt-3">
                  {thermochemicalComparisons.map(item => (
                    <div
                      key={item.cycleName}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{item.cycleName}</span>
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40">
                          η = {item.overallThermalEfficiencyPct}% | {item.peakTemperatureC}°C
                        </span>
                      </div>
                      <div className="text-slate-400 font-mono text-[11px] mt-1">
                        Phản ứng: <span className="text-slate-300">{item.primaryReactions}</span>
                      </div>
                      <div className="text-amber-400/90 text-[10px] mt-1">
                        ⚠ Ăn mòn: {item.corrosionChallenge}
                      </div>
                      <div className="text-slate-400 text-[10px] mt-0.5">
                        Trạng thái: {item.commercialMaturity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Net-Zero Synergy Callout */}
              <div className="mt-4 p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Tích Hợp Liên Hoàn Với DAC (Iteration 57) & SOEC (Iteration 55):
                </span>
                <p className="text-xs text-emerald-400/90 leading-relaxed font-mono">
                  Lượng Hydro sạch khổng lồ từ chu trình S-I (723 kg/h từ 50 MWth) có thể kết hợp trực tiếp với dòng CO₂ thu gom từ Direct Air Capture (DAC) để sản xuất e-Kerosene và Amoniac xanh (Haber-Bosch) không phát thải carbon, hoàn thành bức tranh năng lượng Net-Zero toàn cầu!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default IodineSulfurCycleVisualizer;
